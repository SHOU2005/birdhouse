import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { Section, Container } from "@/components/ui/Section";
import PropertyExplorer from "@/components/property/PropertyExplorer";
import CTABand from "@/components/CTABand";
import { getByCity } from "@/lib/data/properties";

const cityMap: Record<
  string,
  { name: string; key: "delhi" | "gurgaon"; blurb: string }
> = {
  gurgaon: {
    name: "Gurgaon",
    key: "gurgaon",
    blurb:
      "Premium 1RK, 1BHK, 2BHK & 3BHK rentals, co-living and co-working spaces across Gurgaon's most connected sectors.",
  },
  "new-delhi": {
    name: "New Delhi",
    key: "delhi",
    blurb:
      "Safe, comfortable PGs and student housing near DU North Campus — for girls and boys, minutes from your college.",
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
    title: `Accommodation in ${info.name}`,
    description: info.blurb,
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

  const list = getByCity(info.key);

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
