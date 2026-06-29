import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const points = [
  "Designed spaces with modern amenities",
  "Inclusive utilities — no hidden charges",
  "Secure environments with 24/7 surveillance",
  "A warm, welcoming community",
];

export default function Benefits() {
  return (
    <Section>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[var(--shadow-card)]">
                <Image
                  src="/images/1745160121_680507b905493.jpg"
                  alt="Comfortable, fully-furnished Birdhouse living space"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 rounded-2xl bg-primary p-5 text-white shadow-xl sm:-right-6">
                <p className="font-display text-3xl font-bold">100%</p>
                <p className="text-sm font-medium">Hassle-free move-in</p>
              </div>
              <div className="absolute -left-4 top-8 hidden rounded-2xl bg-white p-4 shadow-xl sm:block">
                <p className="font-display text-2xl font-bold text-primary">
                  ₹0
                </p>
                <p className="text-xs font-medium text-muted">Brokerage</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="inline-block rounded-full bg-primary-50 px-4 py-1 text-sm font-semibold text-primary">
              Our Benefit
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
              Your requirement ends here!
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              We have a range of staycation options including PGs and
              accommodation for working professionals and students that ensure
              the perfect home away from home. Our spaces define modern living
              and focus on your well-being — a hassle-free experience with
              secure environments, inclusive utilities and a great community.
            </p>
            <ul className="mt-6 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-ink">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">{p}</span>
                </li>
              ))}
            </ul>
            <Button href="/about" className="mt-8">
              Learn More About Us
            </Button>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
