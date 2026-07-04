import "server-only";
import { list, put, del } from "@vercel/blob";

/**
 * Low-level JSON object storage on Vercel Blob.
 *
 * Vercel's filesystem is read-only at runtime, so admin-managed content lives
 * in Blob object storage instead of on disk. Each "collection" is a single JSON
 * blob at a stable pathname (addRandomSuffix: false + allowOverwrite: true), so
 * overwriting keeps the same URL.
 *
 * When BLOB_READ_WRITE_TOKEN is absent (local dev without Blob, or a build
 * before the store is linked) every operation degrades gracefully: reads return
 * null so callers fall back to their seed data, and writes throw a friendly
 * error surfaced in the admin UI.
 */

export const hasBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

/**
 * Public base URL of the Blob store, derived from the token
 * (`vercel_blob_rw_<storeId>_<secret>`). Lets us fetch a known pathname with
 * Next.js cache tags — so public pages stay statically cached and only
 * re-render when an admin edit calls revalidateTag. Returns null if it can't be
 * derived, in which case readJson falls back to an uncached list() lookup.
 */
function publicBase(): string | null {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return null;
  const storeId = token.split("_")[3];
  return storeId
    ? `https://${storeId}.public.blob.vercel-storage.com`
    : null;
}

export class BlobNotConfiguredError extends Error {
  constructor() {
    super(
      "Vercel Blob is not configured. Add a Blob store to the project and set BLOB_READ_WRITE_TOKEN."
    );
    this.name = "BlobNotConfiguredError";
  }
}

/**
 * Read and parse a JSON blob. Returns null if missing, unconfigured, or
 * invalid. When `tag` is given and the store URL is derivable, the fetch is
 * cached and tagged so public pages prerender and revalidate on demand;
 * otherwise it falls back to an uncached list() lookup (renders dynamically).
 */
export async function readJson<T>(key: string, tag?: string): Promise<T | null> {
  if (!hasBlob) return null;
  const base = publicBase();
  try {
    if (base && tag) {
      const res = await fetch(`${base}/${key}`, { next: { tags: [tag] } });
      if (res.status === 404) return null;
      if (res.ok) return (await res.json()) as T;
      // any other status: fall through to the list-based lookup
    }
    const { blobs } = await list({ prefix: key, limit: 1 });
    const match = blobs.find((b) => b.pathname === key);
    if (!match) return null;
    const res = await fetch(match.downloadUrl, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (err) {
    console.error(`[blob] failed to read ${key}:`, err);
    return null;
  }
}

/** Overwrite a JSON blob at a stable pathname. */
export async function writeJson<T>(key: string, data: T): Promise<void> {
  if (!hasBlob) throw new BlobNotConfiguredError();
  await put(key, JSON.stringify(data, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });
}

/** Upload an arbitrary file (e.g. a listing photo) and return its public URL. */
export async function uploadFile(
  pathname: string,
  body: ArrayBuffer | Blob,
  contentType?: string
): Promise<string> {
  if (!hasBlob) throw new BlobNotConfiguredError();
  const { url } = await put(pathname, body, {
    access: "public",
    addRandomSuffix: true,
    contentType,
  });
  return url;
}

/** Delete a blob by its full URL (used to remove a lead). */
export async function deleteBlob(url: string): Promise<void> {
  if (!hasBlob) return;
  try {
    await del(url);
  } catch (err) {
    console.error(`[blob] failed to delete ${url}:`, err);
  }
}
