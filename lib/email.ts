import { Resend } from "resend";
import type { LeadInput } from "./leadSchema";
import { site } from "./data/site";

const apiKey = process.env.RESEND_API_KEY;
const fromAddress = process.env.LEAD_FROM_EMAIL || "Birdhouse <onboarding@resend.dev>";
const toAddress = process.env.LEAD_TO_EMAIL || site.email;

export async function sendLeadEmail(lead: LeadInput): Promise<{
  ok: boolean;
  delivered: boolean;
}> {
  const summary = `
New enquiry from the Birdhouse website:

Name:          ${lead.name}
Phone:         ${lead.phone}
Email:         ${lead.email}
Location:      ${lead.location}
Property Type: ${lead.propertyType}
Budget:        ${lead.budget || "—"}
Message:       ${lead.message || "—"}
`.trim();

  // No API key configured yet → log the lead so nothing is lost in dev.
  if (!apiKey) {
    console.info("[lead] RESEND_API_KEY not set — logging lead instead:\n", summary);
    return { ok: true, delivered: false };
  }

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: fromAddress,
    to: toAddress,
    replyTo: lead.email,
    subject: `New Birdhouse enquiry — ${lead.name} (${lead.propertyType})`,
    text: summary,
  });

  return { ok: true, delivered: true };
}
