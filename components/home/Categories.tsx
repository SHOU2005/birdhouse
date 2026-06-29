import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { categories } from "@/lib/data/categories";

export default function Categories() {
  return (
    <Section className="bg-surface">
      <Container>
        <SectionHeading
          eyebrow="Explore Properties"
          title="Cozy corners across cities!"
          subtitle="From student PGs near North Campus to luxury rentals in Gurgaon — find the space that fits your life."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <Reveal key={cat.slug} delay={i * 0.05}>
              <Link
                href={`/properties/${cat.slug}`}
                className="group relative flex h-52 flex-col justify-end overflow-hidden rounded-2xl p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
              >
                <Image
                  src={cat.image}
                  alt={`${cat.name} — ${cat.tagline}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* readable bottom gradient + subtle brand tint */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/5" />
                <div className="absolute inset-0 bg-primary/15 transition-colors duration-300 group-hover:bg-primary/25" />
                <ArrowUpRight className="absolute right-4 top-4 h-6 w-6 text-white/90 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <div className="relative">
                  <h3 className="font-display text-xl font-bold text-white drop-shadow">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-sm text-white/90">{cat.tagline}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
