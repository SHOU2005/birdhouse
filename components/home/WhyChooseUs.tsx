import { MapPin, Sparkles, Wallet, Users } from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { whyChooseUs } from "@/lib/data/content";

const icons = { MapPin, Sparkles, Wallet, Users } as const;

export default function WhyChooseUs() {
  return (
    <Section className="bg-surface">
      <Container>
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Why settle for less? Elevate your stay."
          subtitle="Nestled comfort, tailored for you — Birdhouse is your perfect home away from home."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item, i) => {
            const Icon = icons[item.icon as keyof typeof icons];
            return (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
