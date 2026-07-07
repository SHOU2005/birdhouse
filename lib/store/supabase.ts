import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase access for admin-managed content, leads and photos.
 *
 * All reads and writes happen on the server (server components, server actions,
 * route handlers), so we authenticate with the service-role key, which bypasses
 * Row Level Security. The key must never reach the browser — keep imports of
 * this module behind "server-only".
 *
 * When the env vars are absent (local dev without Supabase, or a build before
 * the project is linked) everything degrades gracefully: reads fall back to the
 * in-repo seed data and writes throw a friendly error surfaced in the admin UI.
 */

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** Public Storage bucket that holds uploaded listing photos. */
export const LISTINGS_BUCKET = "listings";

export const hasSupabase = Boolean(SUPABASE_URL && SERVICE_ROLE_KEY);

export class SupabaseNotConfiguredError extends Error {
  constructor() {
    super(
      "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
    this.name = "SupabaseNotConfiguredError";
  }
}

let client: SupabaseClient | null = null;

/** Lazily-created singleton admin client. Throws if Supabase isn't configured. */
export function supabaseAdmin(): SupabaseClient {
  if (!hasSupabase) throw new SupabaseNotConfiguredError();
  if (!client) {
    client = createClient(SUPABASE_URL!, SERVICE_ROLE_KEY!, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}

/**
 * Upload a file to the listings bucket and return its public URL. A random
 * prefix keeps filenames unique (the old Blob flow used addRandomSuffix).
 */
export async function uploadFile(
  filename: string,
  body: ArrayBuffer | Blob,
  contentType?: string
): Promise<string> {
  if (!hasSupabase) throw new SupabaseNotConfiguredError();
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "-");
  const rand = Math.random().toString(36).slice(2, 10);
  const path = `${rand}-${safeName}`;

  const sb = supabaseAdmin();
  const { error } = await sb.storage
    .from(LISTINGS_BUCKET)
    .upload(path, body, { contentType, upsert: false });
  if (error) throw error;

  const { data } = sb.storage.from(LISTINGS_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Delete a listing photo given its public URL. Best-effort — never throws, so
 * removing a listing can't fail on a dangling image.
 */
export async function deleteFile(publicUrl: string): Promise<void> {
  if (!hasSupabase) return;
  const marker = `/object/public/${LISTINGS_BUCKET}/`;
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return; // not a bucket URL (e.g. a local /images/ path)
  const path = decodeURIComponent(publicUrl.slice(idx + marker.length));
  try {
    await supabaseAdmin().storage.from(LISTINGS_BUCKET).remove([path]);
  } catch (err) {
    console.error(`[supabase] failed to delete ${path}:`, err);
  }
}
