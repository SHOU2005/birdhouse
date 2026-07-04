export type PropertyType =
  | "student-housing"
  | "girls-hostel"
  | "boys-hostel"
  | "1rk"
  | "1bhk"
  | "2bhk"
  | "3bhk"
  | "co-living"
  | "co-working";

export type Category = {
  slug: PropertyType;
  name: string;
  tagline: string;
  description: string;
  city: "delhi" | "gurgaon" | "both";
  gradient: string;
  image: string;
};

export const categories: Category[] = [
  {
    slug: "student-housing",
    name: "Student Housing",
    tagline: "Best PG in North Campus, Delhi",
    description:
      "Comfortable living spaces designed for students near DU North Campus — study-ready, secure and social.",
    city: "delhi",
    gradient: "from-[#0f4a68] to-[#2f86b3]",
    image: "/images/1746197306_1.webp",
  },
  {
    slug: "girls-hostel",
    name: "Girls Hostel",
    tagline: "Safe & comfortable living for girls",
    description:
      "Girls PG in North Campus, Delhi with 24/7 security, CCTV, housekeeping and a warm community.",
    city: "delhi",
    gradient: "from-[#15658d] to-[#3f9ac4]",
    image: "/images/1746197008_2.webp",
  },
  {
    slug: "boys-hostel",
    name: "Boys Hostel",
    tagline: "Your home away from home",
    description:
      "Boys PG in North Campus, Delhi — fully furnished rooms, high-speed wifi and zero brokerage.",
    city: "delhi",
    gradient: "from-[#134f73] to-[#2f86b3]",
    image: "/images/1746196784_2.webp",
  },
  {
    slug: "1rk",
    name: "1 RK",
    tagline: "Big dreams, small space",
    description:
      "One RK for rent in Gurgaon — compact, fully-furnished homes perfect for solo living.",
    city: "gurgaon",
    gradient: "from-[#0d425e] to-[#256f97]",
    image: "/images/1745160120_680507b8f12c6.jpg",
  },
  {
    slug: "1bhk",
    name: "1 BHK",
    tagline: "Luxury living, Birdhouse",
    description:
      "1BHK flat in Gurgaon for rent with modern interiors, amenities and a hassle-free move-in.",
    city: "gurgaon",
    gradient: "from-[#15658d] to-[#4a97bf]",
    image: "/images/1746078949_1BHK.webp",
  },
  {
    slug: "2bhk",
    name: "2 BHK",
    tagline: "Luxury living",
    description:
      "2BHK for rent in Gurgaon — spacious homes for families and working professionals.",
    city: "gurgaon",
    gradient: "from-[#114f70] to-[#2f86b3]",
    image: "/images/1745160120_680507b8e0f6d.jpg",
  },
  {
    slug: "3bhk",
    name: "3 BHK",
    tagline: "Your next home sweet home",
    description:
      "3BHK flats for rent in Gurgaon with premium finishes and prime connectivity.",
    city: "gurgaon",
    gradient: "from-[#0f4a68] to-[#3f9ac4]",
    image: "/images/1746079034_3BHK.webp",
  },
  {
    slug: "co-living",
    name: "Co-Living",
    tagline: "Live, share, belong",
    description:
      "Fully-managed co-living spaces with private rooms, shared lounges and a vibrant community.",
    city: "both",
    gradient: "from-[#15658d] to-[#2f86b3]",
    image: "/images/1745160120_680507b8f31e2.jpg",
  },
  {
    slug: "co-working",
    name: "Co-Working Space",
    tagline: "Work where you live",
    description:
      "Productive co-working spaces with high-speed internet, meeting rooms and great coffee.",
    city: "both",
    gradient: "from-[#123f5a] to-[#2c7ba6]",
    image: "/images/1746079021_2BHK.webp",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

// Target keywords per category (from SEO keyword research) — surfaced in each
// property-type page's <meta keywords> and reinforced in copy.
export const categoryKeywords: Record<PropertyType, string[]> = {
  "student-housing": [
    "pg in north campus",
    "north campus pg delhi",
    "pg in north campus delhi",
    "student housing in north campus",
    "best pg in north campus delhi",
  ],
  "girls-hostel": [
    "girls pg in north campus",
    "hostels for girls in north campus",
    "best pg for girls in delhi university",
    "girls pg in delhi",
    "girls hostel in north campus delhi",
  ],
  "boys-hostel": [
    "pg in north campus for boys",
    "boys pg in north campus delhi",
    "boys pg in delhi university",
    "boys hostel in north campus",
  ],
  "1rk": [
    "1rk in gurgaon",
    "1rk fully furnished in gurgaon",
    "1rk flat in gurgaon",
    "1 rk for rent in gurgaon",
  ],
  "1bhk": [
    "1 bhk flat on rent in gurgaon",
    "1bhk flat in gurgaon for rent",
    "affordable 1 bhk in gurgaon for rent",
    "1 bhk in gurgaon",
  ],
  "2bhk": [
    "2 bhk fully furnished flat for rent in gurgaon",
    "2 bhk flat for rent in gurgaon in society",
    "2 bhk rent in gurgaon",
    "2 bhk in gurgaon for rent",
  ],
  "3bhk": [
    "3bhk for rent in gurgaon",
    "3 bhk flats in gurgaon for rent",
    "3 bhk flat in gurgaon rent",
    "3 bhk in gurgaon",
  ],
  "co-living": [
    "coliving pg in gurgaon",
    "colive pg in gurgaon",
    "co-living in gurgaon",
    "co living space gurgaon",
  ],
  "co-working": [
    "coworking space in gurgaon",
    "co-working space in gurgaon",
    "office space for rent in gurgaon",
  ],
};
