import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, MapPin, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Section, Container, SectionHeading } from "@/components/ui/Section";
import PropertyCard from "@/components/property/PropertyCard";
import CTABand from "@/components/CTABand";
import {
  seoPages,
  getSeoPage,
  relatedIntentPages,
  nearbyAreaPages,
  type SeoPage,
} from "@/lib/seo/pages";
import { getProperties } from "@/lib/store/content";
import type { Property } from "@/lib/data/properties";

export function generateStaticParams() {
  return seoPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) return { title: "Accommodation" };
  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: `/pg/${page.slug}` },
    openGraph: {
      title: `${page.h1} | Birdhouse`,
      description: page.description,
      url: `https://birdhouse.co.in/pg/${page.slug}`,
      type: "website",
    },
  };
}

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** Surface the most relevant Birdhouse listings for this page. */
async function matchListings(page: SeoPage): Promise<Property[]> {
  const all = await getProperties();
  const cityProps = all.filter((p) => p.city === page.locality.city);
  const nameLower = page.locality.name.toLowerCase();

  const typed = cityProps
    .filter((p) => page.types.includes(p.type))
    .map((p) => ({
      p,
      hit: p.location.toLowerCase().includes(nameLower),
    }))
    .sort(
      (a, b) =>
        Number(b.hit) - Number(a.hit) ||
        Number(b.p.featured) - Number(a.p.featured)
    )
    .map((s) => s.p);

  let listings = typed.slice(0, 6);
  if (listings.length < 3) {
    const extra = cityProps
      .filter((p) => !listings.includes(p))
      .slice(0, 6 - listings.length);
    listings = [...listings, ...extra];
  }
  return listings;
}

function buildFaqs(page: SeoPage) {
  const { locality: loc, noun, cityLabel } = page;
  const audience = loc.city === "delhi" ? "students" : "working professionals";
  return [
    {
      q: `What is the rent for ${noun} in ${loc.name}?`,
      a: `Birdhouse ${noun} in ${loc.name}, ${cityLabel} starts from ${inr(
        loc.rentFrom
      )} per month, depending on room type and occupancy. We charge zero brokerage — no hidden fees.`,
    },
    {
      q: `Are meals, wifi and housekeeping included?`,
      a: `Yes. Our ${noun} options in ${loc.name} come fully furnished with high-speed wifi, daily housekeeping and home-style meals available, so you can move in and settle instantly.`,
    },
    {
      q: `Is ${loc.name} a good area for ${audience}?`,
      a: `${loc.blurb} It keeps you close to ${loc.landmarks.join(
        ", "
      )} — ideal for ${audience}.`,
    },
    {
      q: `How do I book a ${noun} in ${loc.name}?`,
      a: `Just request a call back or contact the Birdhouse team. We'll shortlist the best ${noun} in ${loc.name}, arrange a visit and help you move in — hassle-free.`,
    },
  ];
}

export default async function SeoLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) notFound();

  const { locality: loc, noun, cityLabel } = page;
  const audience = loc.city === "delhi" ? "students" : "working professionals";
  const [listings, related, nearby] = [
    await matchListings(page),
    relatedIntentPages(page),
    nearbyAreaPages(page),
  ];
  const faqs = buildFaqs(page);

  const benefits = [
    "Zero brokerage — no hidden fees",
    "Fully furnished, move-in ready rooms",
    "High-speed wifi & daily housekeeping",
    "Home-style meals available",
    "24/7 CCTV security & on-site staff",
    `Prime location near ${loc.landmarks[0]}`,
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://birdhouse.co.in" },
          { "@type": "ListItem", position: 2, name: "Localities", item: "https://birdhouse.co.in/pg" },
          {
            "@type": "ListItem",
            position: 3,
            name: page.h1,
            item: `https://birdhouse.co.in/pg/${page.slug}`,
          },
        ],
      },
      {
        "@type": "LodgingBusiness",
        name: `Birdhouse — ${page.h1}`,
        description: page.description,
        url: `https://birdhouse.co.in/pg/${page.slug}`,
        telephone: "+918448040101",
        priceRange: "₹₹",
        areaServed: `${loc.name}, ${cityLabel}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: loc.name,
          addressRegion: cityLabel === "Delhi" ? "Delhi" : "Haryana",
          addressCountry: "IN",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        title={page.h1}
        subtitle={`${loc.blurb} Furnished ${noun} from ${inr(
          loc.rentFrom
        )}/month with zero brokerage.`}
        crumbs={[
          { label: "Localities", href: "/pg" },
          { label: cityLabel },
          { label: loc.name },
        ]}
      />

      {/* Intro + benefits */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                {page.h1} with Birdhouse
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                {loc.blurb} Whether you&rsquo;re {audience === "students" ? "a student joining a nearby college" : "a professional working in the area"},
                our {noun} options in {loc.name} are fully furnished and move-in
                ready from {inr(loc.rentFrom)} a month.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                Every Birdhouse {noun} in {loc.name} comes with high-speed wifi,
                daily housekeeping, home-style meals and round-the-clock CCTV
                security — all with zero brokerage. You stay close to{" "}
                {loc.landmarks.join(", ")}, so you spend less time commuting and
                more time living.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-display text-lg font-bold text-ink">
                Why choose Birdhouse in {loc.name}
              </h3>
              <ul className="mt-4 space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-ink/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Listings */}
      <Section className="bg-surface">
        <Container>
          <SectionHeading
            eyebrow="Available Now"
            title={`${page.intentSlug === "flats" ? "Flats" : noun.replace(/^./, (c) => c.toUpperCase())} in ${loc.name}`}
            subtitle={`Handpicked, fully-furnished options in and around ${loc.name}, ${cityLabel}.`}
          />
          {listings.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((p) => (
                <PropertyCard key={p.slug} property={p} />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-center text-muted">
              New options in {loc.name} are added regularly.{" "}
              <Link href="/contact" className="font-semibold text-primary">
                Request a call back
              </Link>{" "}
              and we&rsquo;ll find one for you.
            </p>
          )}
        </Container>
      </Section>

      {/* Locality highlights */}
      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink">
                About {loc.name}, {cityLabel}
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                {loc.blurb} It&rsquo;s one of the most sought-after areas for{" "}
                {noun} in {cityLabel}, thanks to its connectivity and everyday
                conveniences.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {loc.landmarks.map((l) => (
                  <span
                    key={l}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1.5 text-sm font-medium text-primary"
                  >
                    <MapPin className="h-3.5 w-3.5" /> {l}
                  </span>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h2 className="font-display text-2xl font-bold text-ink">
                {noun.replace(/^./, (c) => c.toUpperCase())} in {loc.name} — FAQs
              </h2>
              <div className="mt-4 divide-y divide-line rounded-2xl border border-line bg-white">
                {faqs.map((f) => (
                  <details key={f.q} className="group px-5 py-4">
                    <summary className="cursor-pointer list-none font-medium text-ink marker:content-['']">
                      {f.q}
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Internal linking */}
      <Section className="bg-surface">
        <Container>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-display text-xl font-bold text-ink">
                Popular searches in {loc.name}
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/pg/${p.slug}`}
                      className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-dark"
                    >
                      <ArrowRight className="h-3.5 w-3.5" /> {p.h1}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {nearby.length > 0 && (
              <div>
                <h2 className="font-display text-xl font-bold text-ink">
                  {noun.replace(/^./, (c) => c.toUpperCase())} in nearby areas
                </h2>
                <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {nearby.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/pg/${p.slug}`}
                        className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-dark"
                      >
                        <ArrowRight className="h-3.5 w-3.5" /> {p.h1}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Container>
      </Section>

      <CTABand />
    </>
  );
}
