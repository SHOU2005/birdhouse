import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/leadSchema";
import { sendLeadEmail } from "@/lib/email";

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

  try {
    const result = await sendLeadEmail(parsed.data);
    return NextResponse.json(result);
  } catch (err) {
    console.error("[lead] failed to send:", err);
    return NextResponse.json(
      { error: "Could not submit right now. Please call us at 8448040101." },
      { status: 500 }
    );
  }
}
