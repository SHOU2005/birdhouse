import type { Metadata } from "next";
import { Handshake, TrendingUp, Wallet, Headphones, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Section, Container, SectionHeading } from "@/components/ui/Section";
import LeadForm from "@/components/forms/LeadForm";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Broker Partnership Program",
  description:
    "Partner with Birdhouse and grow your real-estate business. Earn attractive commissions, access verified inventory and get dedicated support.",
};

const benefits = [
  {
    Icon: Wallet,
    title: "Attractive Commissions",
    text: "Earn competitive, on-time payouts for every successful referral and closing.",
  },
  {
    Icon: TrendingUp,
    title: "Verified Inventory",
    text: "Access a growing portfolio of ready-to-move properties across 4 cities.",
  },
  {
    Icon: Headphones,
    title: "Dedicated Support",
    text: "A relationship manager to help you close faster and serve clients better.",
  },
  {
    Icon: Handshake,
    title: "Trusted Brand",
    text: "Represent Birdhouse — a name residents and owners already trust.",
  },
];

const steps = [
  "Register using the form",
  "Get verified by our partnerships team",
  "Access live inventory & marketing kit",
  "Refer clients and earn commissions",
];

export default function BrokerPage() {
  return (
    <>
      <PageHero
        title="Broker Partnership Program"
        subtitle="Grow your business with Birdhouse. Join our network of partners and unlock new earning opportunities."
        crumbs={[{ label: "Broker Partnership" }]}
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Why Partner With Us"
            title="A partnership that pays off"
            subtitle="We make it simple and rewarding to work with Birdhouse."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)]">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-bold text-ink">
                How it works
              </h2>
              <ol className="mt-6 space-y-4">
                {steps.map((s, i) => (
                  <li key={s} className="flex items-start gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary font-display font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="pt-1.5 text-ink">{s}</span>
                  </li>
                ))}
              </ol>
              <ul className="mt-8 space-y-3">
                {[
                  "No registration fee",
                  "Transparent commission structure",
                  "Marketing materials provided",
                ].map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm text-muted">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
              <h3 className="font-display text-2xl font-bold text-ink">
                Become a Partner
              </h3>
              <p className="mt-1 text-sm text-muted">
                Register your interest and our team will reach out.
              </p>
              <div className="mt-6">
                <LeadForm withMessage />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
