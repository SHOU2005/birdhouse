import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { Section, Container } from "@/components/ui/Section";
import PropertyExplorer from "@/components/property/PropertyExplorer";
import CTABand from "@/components/CTABand";
import { getPropertiesByCity } from "@/lib/store/content";

const cityMap: Record<
  string,
  { name: string; key: "delhi" | "gurgaon"; blurb: string; keywords: string[] }
> = {
  gurgaon: {
    name: "Gurgaon",
    key: "gurgaon",
    blurb:
      "Premium 1RK, 1BHK, 2BHK & 3BHK rentals, co-living and co-working spaces across Gurgaon's most connected sectors.",
    keywords: [
      "pg in gurgaon",
      "hostels in gurgaon",
      "accommodation in gurgaon",
      "coliving pg in gurgaon",
      "flats for rent in gurgaon",
    ],
  },
  "new-delhi": {
    name: "New Delhi",
    key: "delhi",
    blurb:
      "Safe, comfortable PGs and student housing near DU North Campus — for girls and boys, minutes from your college.",
    keywords: [
      "pg in north campus",
      "pg in vijay nagar",
      "pg in gtb nagar for students",
      "best pg in kamla nagar",
      "pg in shakti nagar",
      "pg in mukherjee nagar",
      "hostel and pg in north campus",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(cityMap).map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const info = cityMap[city];
  if (!info) return { title: "City" };
  return {
    title: `PG, Hostels & Rentals in ${info.name}`,
    description: info.blurb,
    keywords: info.keywords,
    alternates: { canonical: `/cities/${city}` },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const info = cityMap[city];
  if (!info) notFound();

  const list = await getPropertiesByCity(info.key);

  return (
    <>
      <PageHero
        title={`Accommodation in ${info.name}`}
        subtitle={info.blurb}
        crumbs={[{ label: "Cities" }, { label: info.name }]}
      />
      <Section>
        <Container>
          <PropertyExplorer properties={list} />
        </Container>
      </Section>
      <CTABand />
    </>
  );
}
