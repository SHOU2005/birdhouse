import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Section, Container } from "@/components/ui/Section";
import CTABand from "@/components/CTABand";
import { localities } from "@/lib/data/seoLocations";
import { seoPages } from "@/lib/seo/pages";

export const metadata: Metadata = {
  title: "PG, Co-Living & Rentals by Locality in Delhi & Gurgaon",
  description:
    "Browse Birdhouse PGs, hostels, co-living and rental flats by locality across Delhi (DU North Campus) and Gurgaon. Furnished, zero brokerage, move-in ready.",
  alternates: { canonical: "/pg" },
};

export default function PgHubPage() {
  const cities: { key: "delhi" | "gurgaon"; label: string }[] = [
    { key: "delhi", label: "Delhi" },
    { key: "gurgaon", label: "Gurgaon" },
  ];

  return (
    <>
      <PageHero
        title="Find PGs & Rentals by Locality"
        subtitle={`Explore ${seoPages.length}+ furnished PG, co-living and rental options across Delhi and Gurgaon — search by your exact area.`}
        crumbs={[{ label: "Localities" }]}
      />

      {cities.map((city) => {
        const cityLocalities = localities.filter((l) => l.city === city.key);
        return (
          <Section key={city.key} className={city.key === "gurgaon" ? "bg-surface" : ""}>
            <Container>
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                {city.label}
              </h2>
              <p className="mt-2 text-muted">
                {cityLocalities.length} localities across {city.label}.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cityLocalities.map((loc) => {
                  const pages = seoPages.filter(
                    (p) => p.locality.slug === loc.slug
                  );
                  return (
                    <div
                      key={loc.slug}
                      className="rounded-2xl border border-line bg-white p-5"
                    >
                      <h3 className="font-display text-lg font-bold text-ink">
                        {loc.name}
                      </h3>
                      <ul className="mt-3 space-y-1.5">
                        {pages.map((p) => (
                          <li key={p.slug}>
                            <Link
                              href={`/pg/${p.slug}`}
                              className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-dark"
                            >
                              <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                              {p.h1}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </Container>
          </Section>
        );
      })}

      <CTABand />
    </>
  );
}
