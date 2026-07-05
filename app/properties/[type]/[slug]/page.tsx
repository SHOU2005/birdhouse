import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Wifi, Sparkles, MapPin, Check, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Section, Container } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import CTABand from "@/components/CTABand";
import { LodgingJsonLd } from "@/components/JsonLd";
import { getCategory } from "@/lib/data/categories";
import { getProperties, getPropertyBySlug, getSite } from "@/lib/store/content";
import { formatINR } from "@/lib/utils";

export async function generateStaticParams() {
  const all = await getProperties();
  return all.map((p) => ({ type: p.type, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string; slug: string }>;
}): Promise<Metadata> {
  const { type, slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return { title: "Property" };
  const cat = getCategory(property.type);
  const title = `${property.name} — ${cat?.name ?? "Accommodation"} in ${property.location}`;
  const description = `${property.name} in ${property.location}. ${property.occupancy}, rent from ${formatINR(
    property.rentFrom
  )}/month with zero brokerage.`;
  return {
    title,
    description,
    alternates: { canonical: `/properties/${type}/${slug}` },
    openGraph: {
      title: `${property.name} | Birdhouse`,
      description,
      images: property.image ? [property.image] : undefined,
      type: "website",
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ type: string; slug: string }>;
}) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const cat = getCategory(property.type);
  const site = await getSite();
  const gallery = property.images?.length ? property.images : [property.image];
  const cityLabel = property.city === "delhi" ? "New Delhi" : "Gurgaon";
  const waText = encodeURIComponent(
    `Hi Birdhouse, I'm interested in "${property.name}" (${property.location}). Please share details.`
  );

  return (
    <>
      <LodgingJsonLd
        name={property.name}
        description={`${property.name} in ${property.location} — ${property.occupancy}, from ${formatINR(
          property.rentFrom
        )}/month.`}
        city={cityLabel}
      />

      <PageHero
        title={property.name}
        subtitle={`${property.location} · ${property.occupancy}`}
        crumbs={[
          { label: "Properties" },
          { label: cat?.name ?? "Listings", href: `/properties/${property.type}` },
          { label: property.name },
        ]}
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line">
                <Image
                  src={gallery[0]}
                  alt={`${property.name} — ${property.location}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute left-4 top-4 flex gap-2">
                  {property.featured && <Badge tone="primary">Featured</Badge>}
                  <Badge tone="neutral">For Rent</Badge>
                </div>
              </div>
              {gallery.length > 1 && (
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {gallery.slice(1).map((src) => (
                    <div
                      key={src}
                      className="relative aspect-square overflow-hidden rounded-lg border border-line"
                    >
                      <Image
                        src={src}
                        alt={property.name}
                        fill
                        sizes="(max-width: 640px) 33vw, 15vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Summary + enquiry */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)]">
                <p className="flex items-center gap-1.5 text-sm text-muted">
                  <MapPin className="h-4 w-4 text-primary" />
                  {property.location}
                </p>
                <h1 className="mt-2 font-display text-2xl font-bold text-ink">
                  {property.name}
                </h1>
                <p className="mt-1 text-sm text-muted">
                  {cat?.name} · {property.occupancy}
                </p>

                <div className="mt-5 border-t border-line pt-5">
                  <p className="text-xs text-muted">Rent Onwards</p>
                  <p className="font-display text-3xl font-bold text-ink">
                    {formatINR(property.rentFrom)}
                    <span className="text-base font-medium text-muted"> /month</span>
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  {property.wifi && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-1 font-medium text-primary">
                      <Wifi className="h-3.5 w-3.5" /> Wifi
                    </span>
                  )}
                  {property.housekeeping && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-1 font-medium text-primary">
                      <Sparkles className="h-3.5 w-3.5" /> Housekeeping
                    </span>
                  )}
                </div>

                <div className="mt-6 space-y-2">
                  <Button
                    href={`https://wa.me/${site.whatsapp}?text=${waText}`}
                    variant="primary"
                    className="w-full"
                  >
                    Enquire on WhatsApp
                  </Button>
                  <Button href="/contact" variant="outline" className="w-full">
                    Request a call back
                  </Button>
                  <a
                    href={`tel:${site.phonePrimary}`}
                    className="flex items-center justify-center gap-2 pt-1 text-sm font-medium text-muted hover:text-primary"
                  >
                    <Phone className="h-4 w-4" /> {site.phonePrimary}
                  </a>
                </div>
              </div>
            </aside>
          </div>

          {/* Highlights */}
          {property.highlights.length > 0 && (
            <div className="mt-12 max-w-2xl">
              <h2 className="font-display text-xl font-bold text-ink">
                What&rsquo;s included
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {property.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-ink/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </Section>

      <CTABand />
    </>
  );
}
