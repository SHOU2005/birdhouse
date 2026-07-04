import "server-only";
import { list, put, del } from "@vercel/blob";
import { hasBlob } from "./blob";
import { LEADS_PREFIX } from "./content";
import type { LeadInput } from "@/lib/leadSchema";

/**
 * Lead submissions are stored one-JSON-blob-per-lead under `leads/`, so
 * concurrent form submissions never clobber each other (no read-modify-write).
 */

export type LeadRecord = LeadInput & {
  id: string;
  createdAt: string; // ISO
  delivered: boolean; // whether the Resend email went out
};

export type StoredLead = LeadRecord & { url: string };

/** Persist a lead. Never throws — the public form must not fail if Blob is down. */
export async function saveLead(
  lead: LeadInput,
  delivered: boolean
): Promise<void> {
  if (!hasBlob) return;
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const record: LeadRecord = {
    ...lead,
    company: undefined, // drop honeypot field
    id,
    createdAt: new Date().toISOString(),
    delivered,
  };
  try {
    await put(`${LEADS_PREFIX}${id}.json`, JSON.stringify(record, null, 2), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 0,
    });
  } catch (err) {
    console.error("[leads] failed to persist lead:", err);
  }
}

/** All leads, newest first, each with its blob URL for deletion. */
export async function getLeads(): Promise<StoredLead[]> {
  if (!hasBlob) return [];
  try {
    const { blobs } = await list({ prefix: LEADS_PREFIX });
    const leads = await Promise.all(
      blobs.map(async (b) => {
        try {
          const res = await fetch(b.downloadUrl, { cache: "no-store" });
          if (!res.ok) return null;
          const record = (await res.json()) as LeadRecord;
          return { ...record, url: b.url } satisfies StoredLead;
        } catch {
          return null;
        }
      })
    );
    return leads
      .filter((l): l is StoredLead => l !== null)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch (err) {
    console.error("[leads] failed to list leads:", err);
    return [];
  }
}

export async function deleteLead(url: string): Promise<void> {
  if (!hasBlob) return;
  try {
    await del(url);
  } catch (err) {
    console.error("[leads] failed to delete lead:", err);
  }
}
