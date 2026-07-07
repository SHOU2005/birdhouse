import "server-only";
import { supabaseAdmin, hasSupabase } from "./supabase";
import type { LeadInput } from "@/lib/leadSchema";

/**
 * Lead submissions live one-row-per-lead in the `leads` table. The `data`
 * column holds the full record so the shape can evolve without a migration.
 */

export type LeadRecord = LeadInput & {
  id: string;
  createdAt: string; // ISO
  delivered: boolean; // whether the Resend email went out
};

export type StoredLead = LeadRecord;

/** Persist a lead. Never throws — the public form must not fail if the DB is down. */
export async function saveLead(
  lead: LeadInput,
  delivered: boolean
): Promise<void> {
  if (!hasSupabase) return;
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const record: LeadRecord = {
    ...lead,
    company: undefined, // drop honeypot field
    id,
    createdAt: new Date().toISOString(),
    delivered,
  };
  try {
    const { error } = await supabaseAdmin()
      .from("leads")
      .insert({ id, data: record, created_at: record.createdAt });
    if (error) throw error;
  } catch (err) {
    console.error("[leads] failed to persist lead:", err);
  }
}

/** All leads, newest first. */
export async function getLeads(): Promise<StoredLead[]> {
  if (!hasSupabase) return [];
  try {
    const { data, error } = await supabaseAdmin()
      .from("leads")
      .select("data")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []).map((row) => row.data as StoredLead);
  } catch (err) {
    console.error("[leads] failed to list leads:", err);
    return [];
  }
}

export async function deleteLead(id: string): Promise<void> {
  if (!hasSupabase) return;
  try {
    const { error } = await supabaseAdmin().from("leads").delete().eq("id", id);
    if (error) throw error;
  } catch (err) {
    console.error("[leads] failed to delete lead:", err);
  }
}
