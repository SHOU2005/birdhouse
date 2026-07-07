/**
 * One-time migration: Vercel Blob → Supabase.
 *
 * Copies admin-managed content (properties, blogs, site content) and leads from
 * Blob into Postgres, re-uploads listing photos into the Supabase `listings`
 * bucket, and rewrites the photo URLs stored on each property.
 *
 * Prerequisites:
 *   1. Run supabase/schema.sql in your Supabase project first.
 *   2. Have BOTH sets of credentials in the environment when you run this:
 *        - Blob (read):  BLOB_READ_WRITE_TOKEN   (or BLOB_STORE_ID + a Vercel
 *                        OIDC context via `vercel env pull` / `vercel dev`)
 *        - Supabase:     SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 *
 * Run:
 *   npx tsx scripts/migrate-blob-to-supabase.ts
 *
 * Idempotent: re-running upserts content and re-inserts leads (skipping ids
 * that already exist). Note: Blob must still be readable — if the store is over
 * its usage limit and blocks reads, restore access or upgrade briefly first.
 */
import { list } from "@vercel/blob";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = "listings";

const KEYS = {
  properties: "data/properties.json",
  blogs: "data/blogs.json",
  site: "data/site-content.json",
};
const LEADS_PREFIX = "leads/";

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}
if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) {
  console.error("Missing Blob credentials (BLOB_READ_WRITE_TOKEN or BLOB_STORE_ID).");
  process.exit(1);
}

const sb = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

/** Read a JSON blob at a stable pathname, or null if it doesn't exist. */
async function readBlobJson<T>(key: string): Promise<T | null> {
  const { blobs } = await list({ prefix: key, limit: 1 });
  const match = blobs.find((b) => b.pathname === key);
  if (!match) return null;
  const res = await fetch(match.downloadUrl, { cache: "no-store" });
  if (!res.ok) return null;
  return (await res.json()) as T;
}

const isBlobUrl = (u: string) =>
  typeof u === "string" && u.includes(".public.blob.vercel-storage.com");

/** Download a Blob image and re-upload it to Supabase Storage; return new URL. */
async function migrateImage(url: string): Promise<string> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`fetch ${url} → ${res.status}`);
  const contentType = res.headers.get("content-type") ?? "image/jpeg";
  const buf = Buffer.from(await res.arrayBuffer());

  const original = decodeURIComponent(url.split("/").pop() || "image");
  const safeName = original.replace(/[^a-zA-Z0-9._-]/g, "-");
  const path = `${Math.random().toString(36).slice(2, 10)}-${safeName}`;

  const { error } = await sb.storage
    .from(BUCKET)
    .upload(path, buf, { contentType, upsert: false });
  if (error) throw error;
  return sb.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

type Property = {
  slug: string;
  image?: string;
  images?: string[];
  [k: string]: unknown;
};

async function migrateProperties() {
  const props = await readBlobJson<Property[]>(KEYS.properties);
  if (!props) return console.log("• properties: none in Blob, skipping");

  const cache = new Map<string, string>();
  const remap = async (u: string) => {
    if (!isBlobUrl(u)) return u; // local /images/ paths stay as-is
    if (!cache.has(u)) cache.set(u, await migrateImage(u));
    return cache.get(u)!;
  };

  const rows = [];
  for (let i = 0; i < props.length; i++) {
    const p = { ...props[i] };
    if (Array.isArray(p.images)) {
      p.images = await Promise.all(p.images.map(remap));
    }
    if (typeof p.image === "string") p.image = await remap(p.image);
    rows.push({ slug: p.slug, data: p, position: i });
  }

  const { error } = await sb.from("properties").upsert(rows, { onConflict: "slug" });
  if (error) throw error;
  console.log(`• properties: ${rows.length} migrated (${cache.size} photos moved)`);
}

async function migrateBlogs() {
  const blogs = await readBlobJson<{ slug: string }[]>(KEYS.blogs);
  if (!blogs) return console.log("• blogs: none in Blob, skipping");
  const rows = blogs.map((b) => ({ slug: b.slug, data: b }));
  const { error } = await sb.from("blogs").upsert(rows, { onConflict: "slug" });
  if (error) throw error;
  console.log(`• blogs: ${rows.length} migrated`);
}

async function migrateSite() {
  const site = await readBlobJson<unknown>(KEYS.site);
  if (!site) return console.log("• site content: none in Blob, skipping");
  const { error } = await sb
    .from("site_content")
    .upsert({ id: 1, data: site }, { onConflict: "id" });
  if (error) throw error;
  console.log("• site content: migrated");
}

async function migrateLeads() {
  const { blobs } = await list({ prefix: LEADS_PREFIX });
  let n = 0;
  for (const b of blobs) {
    const res = await fetch(b.downloadUrl, { cache: "no-store" });
    if (!res.ok) continue;
    const record = (await res.json()) as { id: string; createdAt?: string };
    const { error } = await sb.from("leads").upsert(
      { id: record.id, data: record, created_at: record.createdAt ?? undefined },
      { onConflict: "id" }
    );
    if (error) throw error;
    n++;
  }
  console.log(`• leads: ${n} migrated`);
}

async function main() {
  console.log("Migrating Vercel Blob → Supabase…");
  await migrateProperties();
  await migrateBlogs();
  await migrateSite();
  await migrateLeads();
  console.log("Done.");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
