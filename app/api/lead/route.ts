import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/leadSchema";
import { sendLeadEmail } from "@/lib/email";
import { saveLead } from "@/lib/store/leads";
import { hasSupabase } from "@/lib/store/supabase";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  // Honeypot tripped — pretend success, drop silently.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  // Try to email the lead, but don't lose it if email fails — it's also
  // stored in Supabase for the admin inbox.
  let delivered = false;
  let emailFailed = false;
  try {
    const result = await sendLeadEmail(parsed.data);
    delivered = result.delivered;
  } catch (err) {
    console.error("[lead] failed to send email:", err);
    emailFailed = true;
  }

  await saveLead(parsed.data, delivered);

  // Only report failure if the lead was neither emailed nor stored anywhere.
  if (emailFailed && !hasSupabase) {
    return NextResponse.json(
      { error: "Could not submit right now. Please call us at 8448040101." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, delivered });
}
