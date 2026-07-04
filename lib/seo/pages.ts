// Programmatic-SEO page generator.
//
// Combines every locality (lib/data/seoLocations.ts) with a set of search
// intents to produce 300+ keyword-targeted landing pages. This module is the
// single source of truth for routing (generateStaticParams), metadata, the
// sitemap, and internal linking — so everything stays in sync.

import { localities, getLocality, type Locality } from "@/lib/data/seoLocations";
import type { PropertyType } from "@/lib/data/categories";

type Intent = {
  /** URL segment for this intent, e.g. "girls-pg" or "1-bhk". */
  slug: string;
  /** Title-case label, e.g. "Girls PG" or "1 BHK". */
  labelPrefix: string;
  /** Appended after the label, e.g. "for Rent". */
  suffix?: string;
  /** Lowercase noun used in body copy, e.g. "girls PG". */
  noun: string;
  /** Property types used to surface matching Birdhouse listings. */
  types: PropertyType[];
};

// Delhi = student / North-Campus intent set.
const delhiIntents: Intent[] = [
  { slug: "pg", labelPrefix: "PG", noun: "PG", types: ["student-housing", "girls-hostel", "boys-hostel"] },
  { slug: "girls-pg", labelPrefix: "Girls PG", noun: "girls PG", types: ["girls-hostel", "student-housing"] },
  { slug: "boys-pg", labelPrefix: "Boys PG", noun: "boys PG", types: ["boys-hostel", "student-housing"] },
  { slug: "pg-for-students", labelPrefix: "PG for Students", noun: "student PG", types: ["student-housing", "girls-hostel", "boys-hostel"] },
  { slug: "pg-with-food", labelPrefix: "PG with Food", noun: "PG with food", types: ["student-housing", "girls-hostel", "boys-hostel"] },
  { slug: "single-room-pg", labelPrefix: "Single Room PG", noun: "single room PG", types: ["student-housing", "girls-hostel", "boys-hostel"] },
  { slug: "affordable-pg", labelPrefix: "Affordable PG", noun: "affordable PG", types: ["student-housing", "boys-hostel", "girls-hostel"] },
];

// Gurgaon = working-professional / rental intent set.
const gurgaonIntents: Intent[] = [
  { slug: "pg", labelPrefix: "PG", noun: "PG", types: ["co-living", "1rk", "1bhk"] },
  { slug: "girls-pg", labelPrefix: "Girls PG", noun: "girls PG", types: ["co-living", "girls-hostel"] },
  { slug: "boys-pg", labelPrefix: "Boys PG", noun: "boys PG", types: ["co-living", "boys-hostel"] },
  { slug: "co-living", labelPrefix: "Co-Living", noun: "co-living space", types: ["co-living"] },
  { slug: "1-rk", labelPrefix: "1 RK", suffix: "for Rent", noun: "1 RK", types: ["1rk"] },
  { slug: "1-bhk", labelPrefix: "1 BHK", suffix: "for Rent", noun: "1 BHK flat", types: ["1bhk"] },
  { slug: "2-bhk", labelPrefix: "2 BHK", suffix: "for Rent", noun: "2 BHK flat", types: ["2bhk"] },
  { slug: "flats", labelPrefix: "Flats", suffix: "for Rent", noun: "flat", types: ["1rk", "1bhk", "2bhk", "3bhk"] },
];

export type SeoPage = {
  slug: string;
  locality: Locality;
  cityLabel: "Delhi" | "Gurgaon";
  intentSlug: string;
  noun: string;
  h1: string;
  title: string;
  description: string;
  keywords: string[];
  types: PropertyType[];
};

const cityLabel = (city: Locality["city"]): "Delhi" | "Gurgaon" =>
  city === "delhi" ? "Delhi" : "Gurgaon";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function buildPage(loc: Locality, intent: Intent): SeoPage {
  const cLabel = cityLabel(loc.city);
  const label = `${intent.labelPrefix}${intent.suffix ? ` ${intent.suffix}` : ""} in ${loc.name}`;
  const h1 = `${label}, ${cLabel}`;

  const keywords = [
    `${intent.noun} in ${loc.name}`,
    `${intent.noun} in ${loc.name} ${cLabel}`,
    `best ${intent.noun} in ${loc.name}`,
    `${intent.noun} near ${loc.landmarks[0]}`,
    `${intent.labelPrefix.toLowerCase()} ${loc.name} ${cLabel}`,
  ];

  const description =
    `Looking for ${intent.noun} in ${loc.name}, ${cLabel}? Birdhouse offers ` +
    `furnished options from ${inr(loc.rentFrom)}/month with wifi, housekeeping ` +
    `and zero brokerage — close to ${loc.landmarks[0]}. Book a visit today.`;

  return {
    slug: `${intent.slug}-in-${loc.slug}-${loc.city}`,
    locality: loc,
    cityLabel: cLabel,
    intentSlug: intent.slug,
    noun: intent.noun,
    h1,
    title: `${label} — Zero Brokerage`,
    description,
    keywords,
    types: intent.types,
  };
}

/** Every generated SEO page. Memoised at module scope. */
export const seoPages: SeoPage[] = localities.flatMap((loc) => {
  const intents = loc.city === "delhi" ? delhiIntents : gurgaonIntents;
  return intents.map((intent) => buildPage(loc, intent));
});

const bySlug = new Map(seoPages.map((p) => [p.slug, p]));

export function getSeoPage(slug: string): SeoPage | undefined {
  return bySlug.get(slug);
}

/** Other intents for the same locality (for "Popular searches" interlinking). */
export function relatedIntentPages(page: SeoPage): SeoPage[] {
  return seoPages.filter(
    (p) => p.locality.slug === page.locality.slug && p.slug !== page.slug
  );
}

/** Same-intent pages in nearby localities (for "Nearby areas" interlinking). */
export function nearbyAreaPages(page: SeoPage): SeoPage[] {
  return page.locality.nearby
    .map((slug) => {
      const loc = getLocality(slug);
      if (!loc) return undefined;
      return seoPages.find(
        (p) => p.locality.slug === loc.slug && p.intentSlug === page.intentSlug
      );
    })
    .filter((p): p is SeoPage => Boolean(p));
}
