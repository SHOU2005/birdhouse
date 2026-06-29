import {
  Wifi,
  Sparkles,
  BedDouble,
  Stethoscope,
  Cctv,
  BadgeIndianRupee,
  ShieldCheck,
  Shirt,
} from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { amenities } from "@/lib/data/content";

const icons = {
  Wifi,
  Sparkles,
  BedDouble,
  Stethoscope,
  Cctv,
  BadgeIndianRupee,
  ShieldCheck,
  Shirt,
} as const;

export default function Amenities() {
  return (
    <Section className="bg-primary-dark">
      <Container>
        <SectionHeading
          light
          eyebrow="Amenities"
          title="Our Unmatched Amenities"
          subtitle="Everything you need for a comfortable, worry-free stay — included as standard."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {amenities.map((a, i) => {
            const Icon = icons[a.icon as keyof typeof icons];
            return (
              <Reveal key={a.name} delay={i * 0.05}>
                <div className="flex h-full flex-col items-center gap-3 rounded-2xl bg-white/5 p-6 text-center backdrop-blur transition-colors hover:bg-white/10">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-primary">
                    <Icon className="h-7 w-7" />
                  </span>
                  <span className="text-sm font-medium text-white">
                    {a.name}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
