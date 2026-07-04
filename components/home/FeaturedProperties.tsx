"use client";

import { useState } from "react";
import { Section, Container, SectionHeading } from "@/components/ui/Section";
import PropertyCard from "@/components/property/PropertyCard";
import type { Property } from "@/lib/data/properties";
import { cn } from "@/lib/utils";

const tabs = [
  { key: "all", label: "All" },
  { key: "girls-hostel", label: "Girls Hostel" },
  { key: "boys-hostel", label: "Boys Hostel" },
  { key: "1rk", label: "1RK" },
  { key: "1bhk", label: "1BHK" },
  { key: "2bhk", label: "2 BHK" },
  { key: "3bhk", label: "3 BHK" },
  { key: "co-living", label: "Co-Living" },
] as const;

export default function FeaturedProperties({
  properties,
}: {
  properties: Property[];
}) {
  const [active, setActive] = useState<string>("all");
  const featured = properties;
  const visible =
    active === "all" ? featured : featured.filter((p) => p.type === active);

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Featured Properties"
          title="Recommended For You"
          subtitle="Handpicked homes loved by our residents — fully furnished, secure and ready to move in."
        />

        <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={cn(
                "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active === t.key
                  ? "bg-primary text-white"
                  : "bg-surface text-muted hover:bg-primary-50 hover:text-primary"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <PropertyCard key={p.slug} property={p} />
          ))}
        </div>

        {visible.length === 0 && (
          <p className="mt-8 text-center text-muted">
            No properties in this category yet — please check back soon.
          </p>
        )}
      </Container>
    </Section>
  );
}
