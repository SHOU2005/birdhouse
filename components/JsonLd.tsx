import { site } from "@/lib/data/site";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.legalName,
    url: "https://birdhouse.co.in",
    email: site.email,
    telephone: `+91${site.phonePrimary}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "UJ Tower, DLF City Phase 3, Sector 26",
      addressLocality: "Gurugram",
      addressRegion: "Haryana",
      addressCountry: "IN",
    },
    areaServed: ["Gurgaon", "New Delhi", "Punjab", "Jaipur"],
    sameAs: [
      site.socials.instagram,
      site.socials.facebook,
      site.socials.linkedin,
      site.socials.twitter,
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LodgingJsonLd({
  name,
  description,
  city,
}: {
  name: string;
  description: string;
  city: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: `${site.name} — ${name}`,
    description,
    telephone: `+91${site.phonePrimary}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressCountry: "IN",
    },
    priceRange: "₹₹",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
