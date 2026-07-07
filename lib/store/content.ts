import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import {
  supabaseAdmin,
  hasSupabase,
  SupabaseNotConfiguredError,
} from "./supabase";
import { properties as seedProperties, type Property } from "@/lib/data/properties";
import { blogs as seedBlogs, type Blog } from "@/lib/data/blogs";
import {
  faqs as seedFaqs,
  testimonials as seedTestimonials,
  type Faq,
  type Testimonial,
} from "@/lib/data/content";
import { site as seedSite } from "@/lib/data/site";
import type { PropertyType } from "@/lib/data/categories";

/**
 * Typed content store. Each collection lives in its own Postgres table on
 * Supabase; the row `data` column holds the full object so the shape can evolve
 * without migrations. Getters fall back to the in-repo seed data when Supabase
 * is empty or unconfigured — so the public site renders identically until the
 * admin makes edits.
 *
 * Reads are wrapped in `unstable_cache` with a tag so public pages stay cached
 * and only re-render when an admin write calls `updateTag`; the outer React
 * `cache()` dedupes reads within a single request.
 */

/** Cache tags — public reads are tagged; admin writes call updateTag. */
export const TAGS = {
  properties: "bh:properties",
  blogs: "bh:blogs",
  site: "bh:site",
} as const;

// ---------------------------------------------------------------- Properties

const readProperties = unstable_cache(
  async (): Promise<Property[]> => {
    if (!hasSupabase) return seedProperties;
    try {
      const { data, error } = await supabaseAdmin()
        .from("properties")
        .select("data")
        .order("position", { ascending: true });
      if (error) throw error;
      if (!data || data.length === 0) return seedProperties;
      return data.map((row) => row.data as Property);
    } catch (err) {
      console.error("[content] failed to read properties:", err);
      return seedProperties;
    }
  },
  ["bh:properties"],
  { tags: [TAGS.properties] }
);

export const getProperties = cache(readProperties);

export async function getFeaturedProperties(): Promise<Property[]> {
  return (await getProperties()).filter((p) => p.featured);
}

export async function getPropertiesByType(type: PropertyType): Promise<Property[]> {
  return (await getProperties()).filter((p) => p.type === type);
}

export async function getPropertiesByCity(
  city: "delhi" | "gurgaon"
): Promise<Property[]> {
  return (await getProperties()).filter((p) => p.city === city);
}

export async function getPropertyBySlug(slug: string): Promise<Property | undefined> {
  return (await getProperties()).find((p) => p.slug === slug);
}

/** Replace the full properties collection, preserving list order via `position`. */
export async function saveProperties(list: Property[]): Promise<void> {
  if (!hasSupabase) throw new SupabaseNotConfiguredError();
  const sb = supabaseAdmin();
  const rows = list.map((p, i) => ({ slug: p.slug, data: p, position: i }));
  if (rows.length) {
    const { error } = await sb
      .from("properties")
      .upsert(rows, { onConflict: "slug" });
    if (error) throw error;
  }
  await deleteMissing("properties", list.map((p) => p.slug));
}

// --------------------------------------------------------------------- Blogs

const readBlogs = unstable_cache(
  async (): Promise<Blog[]> => {
    if (!hasSupabase) return seedBlogs;
    try {
      const { data, error } = await supabaseAdmin().from("blogs").select("data");
      if (error) throw error;
      if (!data || data.length === 0) return seedBlogs;
      return data.map((row) => row.data as Blog);
    } catch (err) {
      console.error("[content] failed to read blogs:", err);
      return seedBlogs;
    }
  },
  ["bh:blogs"],
  { tags: [TAGS.blogs] }
);

export const getBlogs = cache(async (): Promise<Blog[]> => {
  const list = await readBlogs();
  // Newest first, matching the public blog listing.
  return [...list].sort((a, b) => b.date.localeCompare(a.date));
});

export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  return (await getBlogs()).find((b) => b.slug === slug);
}

/** Replace the full blogs collection. */
export async function saveBlogs(list: Blog[]): Promise<void> {
  if (!hasSupabase) throw new SupabaseNotConfiguredError();
  const sb = supabaseAdmin();
  const rows = list.map((b) => ({ slug: b.slug, data: b }));
  if (rows.length) {
    const { error } = await sb.from("blogs").upsert(rows, { onConflict: "slug" });
    if (error) throw error;
  }
  await deleteMissing("blogs", list.map((b) => b.slug));
}

// ------------------------------------------------------------- Site content

export type SiteContact = {
  phonePrimary: string;
  phoneSecondary: string;
  email: string;
  address: string;
  whatsapp: string;
  socials: {
    instagram: string;
    facebook: string;
    linkedin: string;
    twitter: string;
  };
};

export type SiteContent = {
  contact: SiteContact;
  faqs: Faq[];
  testimonials: Testimonial[];
};

const seedSiteContent: SiteContent = {
  contact: {
    phonePrimary: seedSite.phonePrimary,
    phoneSecondary: seedSite.phoneSecondary,
    email: seedSite.email,
    address: seedSite.address,
    whatsapp: seedSite.whatsapp,
    socials: { ...seedSite.socials },
  },
  faqs: seedFaqs,
  testimonials: seedTestimonials,
};

const readSiteContent = unstable_cache(
  async (): Promise<SiteContent> => {
    if (!hasSupabase) return seedSiteContent;
    try {
      const { data, error } = await supabaseAdmin()
        .from("site_content")
        .select("data")
        .eq("id", 1)
        .maybeSingle();
      if (error) throw error;
      return (data?.data as SiteContent) ?? seedSiteContent;
    } catch (err) {
      console.error("[content] failed to read site content:", err);
      return seedSiteContent;
    }
  },
  ["bh:site"],
  { tags: [TAGS.site] }
);

export const getSiteContent = cache(readSiteContent);

/** Site config merged with editable contact overrides (matches the old `site` shape). */
export const getSite = cache(async () => {
  const { contact } = await getSiteContent();
  return {
    name: seedSite.name,
    legalName: seedSite.legalName,
    tagline: seedSite.tagline,
    ...contact,
  };
});

export async function saveSiteContent(content: SiteContent): Promise<void> {
  if (!hasSupabase) throw new SupabaseNotConfiguredError();
  const { error } = await supabaseAdmin()
    .from("site_content")
    .upsert({ id: 1, data: content }, { onConflict: "id" });
  if (error) throw error;
}

// ------------------------------------------------------------------- Helpers

/** Delete rows of `table` whose slug isn't in `keepSlugs` (full-collection replace). */
async function deleteMissing(
  table: "properties" | "blogs",
  keepSlugs: string[]
): Promise<void> {
  const sb = supabaseAdmin();
  const { data: existing, error } = await sb.from(table).select("slug");
  if (error) throw error;
  const keep = new Set(keepSlugs);
  const toDelete = (existing ?? [])
    .map((r) => r.slug as string)
    .filter((s) => !keep.has(s));
  if (toDelete.length) {
    const { error: delErr } = await sb.from(table).delete().in("slug", toDelete);
    if (delErr) throw delErr;
  }
}
