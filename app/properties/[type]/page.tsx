import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { Section, Container } from "@/components/ui/Section";
import PropertyExplorer from "@/components/property/PropertyExplorer";
import CTABand from "@/components/CTABand";
import { LodgingJsonLd } from "@/components/JsonLd";
import { categories, getCategory, categoryKeywords } from "@/lib/data/categories";
import { getPropertiesByType } from "@/lib/store/content";

export function generateStaticParams() {
  return categories.map((c) => ({ type: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const cat = getCategory(type);
  if (!cat) return { title: "Properties" };
  return {
    title: `${cat.name} — ${cat.tagline}`,
    description: cat.description,
    keywords: categoryKeywords[cat.slug],
    alternates: { canonical: `/properties/${cat.slug}` },
  };
}

export default async function PropertyTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const cat = getCategory(type);
  if (!cat) notFound();

  const list = await getPropertiesByType(cat.slug);

  return (
    <>
      <LodgingJsonLd
        name={cat.name}
        description={cat.description}
        city={cat.city === "delhi" ? "New Delhi" : "Gurgaon"}
      />
      <PageHero
        title={cat.name}
        subtitle={cat.description}
        crumbs={[{ label: "Properties" }, { label: cat.name }]}
      />
      <Section>
        <Container>
          <PropertyExplorer properties={list} showTypeFilter={false} />
        </Container>
      </Section>
      <CTABand />
    </>
  );
}
