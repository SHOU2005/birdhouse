import type { PropertyType } from "./categories";

export type Property = {
  slug: string;
  name: string;
  type: PropertyType;
  city: "delhi" | "gurgaon";
  location: string;
  rentFrom: number;
  featured: boolean;
  wifi: boolean;
  housekeeping: boolean;
  occupancy: string;
  image: string; // cover image (kept for backward compatibility)
  images?: string[]; // full gallery; images[0] mirrors `image`
  highlights: string[];
};

export const properties: Property[] = [
  {
    slug: "white-dove-girls-pg-vijay-nagar",
    name: "White Dove",
    type: "girls-hostel",
    city: "delhi",
    location: "Vijay Nagar, Delhi (North Campus)",
    rentFrom: 18000,
    featured: true,
    wifi: true,
    housekeeping: true,
    occupancy: "Single / Double sharing",
    image: "/images/1746197008_2.webp",
    highlights: ["Walking distance to DU", "Power backup", "Home-cooked meals"],
  },
  {
    slug: "peacock-house-girls-pg-vijay-nagar",
    name: "Peacock House",
    type: "girls-hostel",
    city: "delhi",
    location: "C Block, Vijay Nagar, Delhi (North Campus)",
    rentFrom: 18000,
    featured: true,
    wifi: true,
    housekeeping: true,
    occupancy: "Double / Triple sharing",
    image: "/images/1746197306_1.webp",
    highlights: ["CCTV secured", "RO water", "Laundry service"],
  },
  {
    slug: "penguin-house-girls-pg-vijay-nagar",
    name: "Penguin House",
    type: "girls-hostel",
    city: "delhi",
    location: "C Block, Vijay Nagar, Delhi (North Campus)",
    rentFrom: 18000,
    featured: true,
    wifi: true,
    housekeeping: true,
    occupancy: "Single / Double sharing",
    image: "/images/1746197779_1.webp",
    highlights: ["AC rooms available", "24/7 security", "Study desk"],
  },
  {
    slug: "pelican-house-girls-pg-vijay-nagar",
    name: "Pelican House",
    type: "girls-hostel",
    city: "delhi",
    location: "C Block, Vijay Nagar, Delhi (North Campus)",
    rentFrom: 15000,
    featured: true,
    wifi: true,
    housekeeping: true,
    occupancy: "Double / Triple sharing",
    image: "/images/1746197952_1.webp",
    highlights: ["Budget friendly", "Daily housekeeping", "Common lounge"],
  },
  {
    slug: "kiwi-house-girls-pg-gtb-nagar",
    name: "Kiwi House",
    type: "girls-hostel",
    city: "delhi",
    location: "GTB Nagar, Delhi (North Campus)",
    rentFrom: 18000,
    featured: true,
    wifi: true,
    housekeeping: true,
    occupancy: "Single / Double sharing",
    image: "/images/1746198147_1.webp",
    highlights: ["Metro nearby", "Hot meals", "Fully furnished"],
  },
  {
    slug: "eagle-house-girls-pg-vijay-nagar",
    name: "Eagle House",
    type: "girls-hostel",
    city: "delhi",
    location: "C Block, Vijay Nagar, Delhi (North Campus)",
    rentFrom: 14000,
    featured: true,
    wifi: true,
    housekeeping: true,
    occupancy: "Triple sharing",
    image: "/images/1746197541_1.webp",
    highlights: ["Most affordable", "Wifi included", "Near market"],
  },
  {
    slug: "sparrow-house-girls-pg-vijay-nagar",
    name: "Sparrow House",
    type: "girls-hostel",
    city: "delhi",
    location: "A Block, Vijay Nagar, Delhi (North Campus)",
    rentFrom: 15000,
    featured: true,
    wifi: true,
    housekeeping: true,
    occupancy: "Double sharing",
    image: "/images/1746196403_2.webp",
    highlights: ["Quiet street", "Balcony rooms", "Housekeeping"],
  },
  {
    slug: "robin-house-boys-pg-mukherjee-nagar",
    name: "Robin House",
    type: "boys-hostel",
    city: "delhi",
    location: "Mukherjee Nagar, Delhi (North Campus)",
    rentFrom: 13000,
    featured: true,
    wifi: true,
    housekeeping: true,
    occupancy: "Double / Triple sharing",
    image: "/images/1746196784_2.webp",
    highlights: ["Study-friendly", "Power backup", "Mess facility"],
  },
  {
    slug: "falcon-house-boys-pg-vijay-nagar",
    name: "Falcon House",
    type: "boys-hostel",
    city: "delhi",
    location: "Vijay Nagar, Delhi (North Campus)",
    rentFrom: 14000,
    featured: false,
    wifi: true,
    housekeeping: true,
    occupancy: "Single / Double sharing",
    image: "/images/1745160120_680507b8e0f6d.jpg",
    highlights: ["Near DU gate", "CCTV", "Wifi included"],
  },
  {
    slug: "heron-1rk-sector-43-gurgaon",
    name: "Heron Studio",
    type: "1rk",
    city: "gurgaon",
    location: "Sector 43, Gurgaon",
    rentFrom: 16000,
    featured: true,
    wifi: true,
    housekeeping: true,
    occupancy: "Single occupancy",
    image: "/images/1745160120_680507b8f12c6.jpg",
    highlights: ["Fully furnished", "Modular kitchen", "Near Huda City Metro"],
  },
  {
    slug: "swan-1bhk-dlf-phase-3-gurgaon",
    name: "Swan Residency",
    type: "1bhk",
    city: "gurgaon",
    location: "DLF Phase 3, Gurgaon",
    rentFrom: 24000,
    featured: true,
    wifi: true,
    housekeeping: true,
    occupancy: "Couple / Single",
    image: "/images/1746078949_1BHK.webp",
    highlights: ["Premium interiors", "Gated society", "Gym & pool"],
  },
  {
    slug: "crane-2bhk-sector-54-gurgaon",
    name: "Crane Heights",
    type: "2bhk",
    city: "gurgaon",
    location: "Sector 54, Gurgaon",
    rentFrom: 38000,
    featured: true,
    wifi: true,
    housekeeping: true,
    occupancy: "Family / Sharing",
    image: "/images/1746079021_2BHK.webp",
    highlights: ["Spacious", "Covered parking", "Near Cyber Hub"],
  },
  {
    slug: "flamingo-3bhk-golf-course-road-gurgaon",
    name: "Flamingo Towers",
    type: "3bhk",
    city: "gurgaon",
    location: "Golf Course Road, Gurgaon",
    rentFrom: 55000,
    featured: true,
    wifi: true,
    housekeeping: true,
    occupancy: "Family",
    image: "/images/1746079034_3BHK.webp",
    highlights: ["Luxury finishes", "Club access", "Prime location"],
  },
  {
    slug: "oriole-co-living-cyber-city-gurgaon",
    name: "Oriole Co-Living",
    type: "co-living",
    city: "gurgaon",
    location: "Cyber City, Gurgaon",
    rentFrom: 17000,
    featured: true,
    wifi: true,
    housekeeping: true,
    occupancy: "Private / Shared rooms",
    image: "/images/1745160120_680507b8f31e2.jpg",
    highlights: ["Community events", "All-inclusive", "Shared lounges"],
  },
  {
    slug: "wren-co-working-udyog-vihar-gurgaon",
    name: "Wren Workspace",
    type: "co-working",
    city: "gurgaon",
    location: "Udyog Vihar, Gurgaon",
    rentFrom: 8000,
    featured: false,
    wifi: true,
    housekeeping: true,
    occupancy: "Hot desk / Cabin",
    image: "/images/1746079021_2BHK.webp",
    highlights: ["High-speed internet", "Meeting rooms", "24/7 access"],
  },
];

export function getFeatured(): Property[] {
  return properties.filter((p) => p.featured);
}

export function getByType(type: PropertyType): Property[] {
  return properties.filter((p) => p.type === type);
}

export function getByCity(city: "delhi" | "gurgaon"): Property[] {
  return properties.filter((p) => p.city === city);
}

export function getProperty(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}
