// Locality dataset powering the programmatic-SEO landing pages under /pg.
// Each locality carries genuine, differentiating detail (landmarks, typical
// rent, nearby areas) so generated pages are useful content, not thin doorways.

export type SeoCity = "delhi" | "gurgaon";
export type LocalityKind = "student" | "professional" | "mixed";

export type Locality = {
  slug: string;
  name: string;
  city: SeoCity;
  kind: LocalityKind;
  /** Indicative starting rent (₹/month) used in copy and schema. */
  rentFrom: number;
  /** Well-known places used to make each page's copy specific. */
  landmarks: string[];
  /** Slugs of adjacent localities for internal linking. */
  nearby: string[];
  /** One locality-specific sentence woven into the intro. */
  blurb: string;
};

export const localities: Locality[] = [
  // ---------------------------------------------------------------- Delhi
  {
    slug: "vijay-nagar",
    name: "Vijay Nagar",
    city: "delhi",
    kind: "student",
    rentFrom: 14000,
    landmarks: ["DU North Campus", "Kamla Nagar Market", "GTB Nagar Metro"],
    nearby: ["kamla-nagar", "gtb-nagar", "hudson-lane"],
    blurb:
      "Vijay Nagar is the heart of DU North Campus life — walkable to lecture halls, the Kamla Nagar market and dozens of student cafés.",
  },
  {
    slug: "gtb-nagar",
    name: "GTB Nagar",
    city: "delhi",
    kind: "student",
    rentFrom: 14000,
    landmarks: ["GTB Nagar Metro", "DU North Campus", "Nirankari Colony"],
    nearby: ["vijay-nagar", "mukherjee-nagar", "nirankari-colony"],
    blurb:
      "GTB Nagar sits right on the Yellow Line, giving students a fast metro ride to campus and the rest of the city.",
  },
  {
    slug: "mukherjee-nagar",
    name: "Mukherjee Nagar",
    city: "delhi",
    kind: "student",
    rentFrom: 12000,
    landmarks: ["UPSC coaching hub", "Batra Cinema", "Nirankari Colony"],
    nearby: ["gtb-nagar", "nirankari-colony", "model-town"],
    blurb:
      "Mukherjee Nagar is Delhi's best-known coaching hub, home to thousands of UPSC and competitive-exam aspirants.",
  },
  {
    slug: "kamla-nagar",
    name: "Kamla Nagar",
    city: "delhi",
    kind: "student",
    rentFrom: 15000,
    landmarks: ["Kamla Nagar Market", "DU North Campus", "Kamla Nagar Chowk"],
    nearby: ["vijay-nagar", "roop-nagar", "shakti-nagar"],
    blurb:
      "Kamla Nagar pairs prime North Campus proximity with Delhi's favourite student shopping and food street.",
  },
  {
    slug: "hudson-lane",
    name: "Hudson Lane",
    city: "delhi",
    kind: "student",
    rentFrom: 16000,
    landmarks: ["Hudson Lane Cafés", "GTB Nagar Metro", "DU North Campus"],
    nearby: ["gtb-nagar", "vijay-nagar", "kingsway-camp"],
    blurb:
      "Hudson Lane is the trendy café strip of North Campus, loved for its buzzing student hangouts and nightlife.",
  },
  {
    slug: "kingsway-camp",
    name: "Kingsway Camp",
    city: "delhi",
    kind: "student",
    rentFrom: 13000,
    landmarks: ["GTB Nagar Metro", "Guru Tegh Bahadur Nagar", "DU North Campus"],
    nearby: ["gtb-nagar", "hudson-lane", "mukherjee-nagar"],
    blurb:
      "Kingsway Camp offers quieter, well-connected streets a short hop from campus and the metro.",
  },
  {
    slug: "roop-nagar",
    name: "Roop Nagar",
    city: "delhi",
    kind: "student",
    rentFrom: 13000,
    landmarks: ["DU North Campus", "Kamla Nagar", "Malka Ganj"],
    nearby: ["kamla-nagar", "shakti-nagar", "malka-ganj"],
    blurb:
      "Roop Nagar is a calm residential pocket favoured by students who want campus access without the crowds.",
  },
  {
    slug: "shakti-nagar",
    name: "Shakti Nagar",
    city: "delhi",
    kind: "student",
    rentFrom: 13000,
    landmarks: ["Shakti Nagar Chowk", "Kamla Nagar", "DU North Campus"],
    nearby: ["kamla-nagar", "roop-nagar", "malka-ganj"],
    blurb:
      "Shakti Nagar is a leafy, affordable neighbourhood well-liked by first-year DU students.",
  },
  {
    slug: "model-town",
    name: "Model Town",
    city: "delhi",
    kind: "mixed",
    rentFrom: 15000,
    landmarks: ["Model Town Metro", "Model Town Lake", "Mukherjee Nagar"],
    nearby: ["mukherjee-nagar", "gujranwala-town", "gtb-nagar"],
    blurb:
      "Model Town blends comfortable family neighbourhoods with easy metro access for students and young professionals alike.",
  },
  {
    slug: "outram-lines",
    name: "Outram Lines",
    city: "delhi",
    kind: "student",
    rentFrom: 13000,
    landmarks: ["GTB Nagar Metro", "DU North Campus", "Kingsway Camp"],
    nearby: ["gtb-nagar", "kingsway-camp", "vijay-nagar"],
    blurb:
      "Outram Lines is a compact student enclave minutes from GTB Nagar metro and the university.",
  },
  {
    slug: "patel-chest",
    name: "Patel Chest",
    city: "delhi",
    kind: "student",
    rentFrom: 15000,
    landmarks: ["Patel Chest Institute", "DU Arts Faculty", "Vishwavidyalaya Metro"],
    nearby: ["vijay-nagar", "kamla-nagar", "vishwavidyalaya"],
    blurb:
      "Patel Chest is as central to North Campus as it gets — steps from the Arts Faculty and major departments.",
  },
  {
    slug: "malka-ganj",
    name: "Malka Ganj",
    city: "delhi",
    kind: "student",
    rentFrom: 12000,
    landmarks: ["Malka Ganj Chowk", "Kamla Nagar", "Roop Nagar"],
    nearby: ["roop-nagar", "shakti-nagar", "kamla-nagar"],
    blurb:
      "Malka Ganj is a budget-friendly, well-connected area popular with students on North Campus.",
  },
  {
    slug: "nirankari-colony",
    name: "Nirankari Colony",
    city: "delhi",
    kind: "student",
    rentFrom: 12000,
    landmarks: ["Nirankari Sarovar", "Mukherjee Nagar", "GTB Nagar"],
    nearby: ["mukherjee-nagar", "gtb-nagar", "model-town"],
    blurb:
      "Nirankari Colony borders the Mukherjee Nagar coaching belt with quieter, affordable stays.",
  },
  {
    slug: "vishwavidyalaya",
    name: "Vishwavidyalaya",
    city: "delhi",
    kind: "student",
    rentFrom: 15000,
    landmarks: ["Vishwavidyalaya Metro", "DU North Campus", "Ridge Road"],
    nearby: ["patel-chest", "vijay-nagar", "gtb-nagar"],
    blurb:
      "Vishwavidyalaya is the metro gateway to Delhi University, ideal for students who commute across the city.",
  },
  {
    slug: "civil-lines",
    name: "Civil Lines",
    city: "delhi",
    kind: "mixed",
    rentFrom: 16000,
    landmarks: ["Civil Lines Metro", "Delhi Assembly", "Ridge"],
    nearby: ["vishwavidyalaya", "timarpur", "kamla-nagar"],
    blurb:
      "Civil Lines is a green, historic district offering upscale stays a short ride from campus and Connaught Place.",
  },
  {
    slug: "timarpur",
    name: "Timarpur",
    city: "delhi",
    kind: "student",
    rentFrom: 13000,
    landmarks: ["Vidhan Sabha Metro", "Ridge Road", "Civil Lines"],
    nearby: ["civil-lines", "gtb-nagar", "outram-lines"],
    blurb:
      "Timarpur is an affordable, well-connected strip along the Ridge, close to both campus and the metro.",
  },
  {
    slug: "gujranwala-town",
    name: "Gujranwala Town",
    city: "delhi",
    kind: "mixed",
    rentFrom: 14000,
    landmarks: ["Model Town Metro", "Derawal Nagar", "GTB Hospital"],
    nearby: ["model-town", "derawal-nagar", "mukherjee-nagar"],
    blurb:
      "Gujranwala Town is a settled residential area with roomy PGs for students and working professionals.",
  },
  {
    slug: "derawal-nagar",
    name: "Derawal Nagar",
    city: "delhi",
    kind: "mixed",
    rentFrom: 14000,
    landmarks: ["Model Town", "Gujranwala Town", "GTB Nagar"],
    nearby: ["gujranwala-town", "model-town", "gtb-nagar"],
    blurb:
      "Derawal Nagar offers quiet, family-friendly streets within easy reach of North Campus.",
  },
  {
    slug: "dhaka",
    name: "Dhaka",
    city: "delhi",
    kind: "student",
    rentFrom: 12000,
    landmarks: ["Dhaka Village", "GTB Nagar", "Mukherjee Nagar"],
    nearby: ["gtb-nagar", "mukherjee-nagar", "nirankari-colony"],
    blurb:
      "Dhaka is a pocket-friendly student neighbourhood bordering GTB Nagar and the coaching hub.",
  },
  {
    slug: "north-campus",
    name: "North Campus",
    city: "delhi",
    kind: "student",
    rentFrom: 14000,
    landmarks: ["Delhi University", "Vijay Nagar", "Kamla Nagar"],
    nearby: ["vijay-nagar", "kamla-nagar", "patel-chest"],
    blurb:
      "North Campus is the beating heart of Delhi University student life, with colleges, hostels and markets all within walking distance.",
  },

  // -------------------------------------------------------------- Gurgaon
  {
    slug: "dlf-phase-1",
    name: "DLF Phase 1",
    city: "gurgaon",
    kind: "professional",
    rentFrom: 17000,
    landmarks: ["Galleria Market", "MG Road Metro", "DLF Golf Course"],
    nearby: ["dlf-phase-2", "dlf-phase-3", "mg-road"],
    blurb:
      "DLF Phase 1 is a premium, gated neighbourhood close to Galleria Market and the MG Road metro.",
  },
  {
    slug: "dlf-phase-2",
    name: "DLF Phase 2",
    city: "gurgaon",
    kind: "professional",
    rentFrom: 17000,
    landmarks: ["Cyber Hub", "Belvedere Towers", "Sikanderpur Metro"],
    nearby: ["dlf-phase-1", "dlf-phase-3", "cyber-city"],
    blurb:
      "DLF Phase 2 puts you minutes from Cyber Hub and the Rapid Metro — a favourite of IT professionals.",
  },
  {
    slug: "dlf-phase-3",
    name: "DLF Phase 3",
    city: "gurgaon",
    kind: "professional",
    rentFrom: 16000,
    landmarks: ["Cyber City", "Moulsari Avenue", "DLF Phase 3 Rapid Metro"],
    nearby: ["dlf-phase-2", "cyber-city", "sushant-lok"],
    blurb:
      "DLF Phase 3 is the closest residential hub to Cyber City, packed with co-living and rental options for techies.",
  },
  {
    slug: "dlf-phase-4",
    name: "DLF Phase 4",
    city: "gurgaon",
    kind: "professional",
    rentFrom: 18000,
    landmarks: ["Galleria Market", "Super Mart", "Sushant Lok"],
    nearby: ["dlf-phase-5", "galleria", "sushant-lok"],
    blurb:
      "DLF Phase 4 wraps around Galleria Market, offering vibrant, walkable living for young professionals.",
  },
  {
    slug: "dlf-phase-5",
    name: "DLF Phase 5",
    city: "gurgaon",
    kind: "professional",
    rentFrom: 20000,
    landmarks: ["Golf Course Road", "One Horizon Center", "Sector 53-54 Metro"],
    nearby: ["dlf-phase-4", "golf-course-road", "sector-54"],
    blurb:
      "DLF Phase 5 lines the premium Golf Course Road corridor with upscale towers and metro access.",
  },
  {
    slug: "sushant-lok",
    name: "Sushant Lok",
    city: "gurgaon",
    kind: "professional",
    rentFrom: 16000,
    landmarks: ["Sector 29 Market", "Cyber Hub", "MG Road"],
    nearby: ["dlf-phase-3", "sector-43", "mg-road"],
    blurb:
      "Sushant Lok is central Gurgaon at its liveliest, next to Sector 29's restaurants and nightlife.",
  },
  {
    slug: "cyber-city",
    name: "Cyber City",
    city: "gurgaon",
    kind: "professional",
    rentFrom: 18000,
    landmarks: ["DLF Cyber Hub", "Rapid Metro", "Ambience Mall"],
    nearby: ["dlf-phase-2", "dlf-phase-3", "udyog-vihar"],
    blurb:
      "Cyber City is Gurgaon's corporate core — living here means a walk-to-work commute for thousands of professionals.",
  },
  {
    slug: "udyog-vihar",
    name: "Udyog Vihar",
    city: "gurgaon",
    kind: "professional",
    rentFrom: 15000,
    landmarks: ["Udyog Vihar Industrial Area", "Cyber City", "IFFCO Chowk"],
    nearby: ["cyber-city", "dlf-phase-3", "mg-road"],
    blurb:
      "Udyog Vihar is a major office and startup belt, ideal for professionals wanting a short commute and value rents.",
  },
  {
    slug: "golf-course-road",
    name: "Golf Course Road",
    city: "gurgaon",
    kind: "professional",
    rentFrom: 22000,
    landmarks: ["One Horizon Center", "Sector 54 Metro", "DLF Golf Course"],
    nearby: ["dlf-phase-5", "sector-54", "sector-56"],
    blurb:
      "Golf Course Road is Gurgaon's premium address, lined with luxury high-rises and rapid-metro stations.",
  },
  {
    slug: "sohna-road",
    name: "Sohna Road",
    city: "gurgaon",
    kind: "professional",
    rentFrom: 15000,
    landmarks: ["Omaxe Mall", "Subhash Chowk", "Vatika Chowk"],
    nearby: ["sector-49", "sector-47", "south-city"],
    blurb:
      "Sohna Road is a fast-growing corridor of affordable towers, malls and offices in south Gurgaon.",
  },
  {
    slug: "mg-road",
    name: "MG Road",
    city: "gurgaon",
    kind: "professional",
    rentFrom: 16000,
    landmarks: ["MG Road Metro", "Sahara Mall", "IFFCO Chowk"],
    nearby: ["dlf-phase-1", "sushant-lok", "sector-14"],
    blurb:
      "MG Road is one of Gurgaon's oldest arteries, with metro connectivity and malls at your doorstep.",
  },
  {
    slug: "palam-vihar",
    name: "Palam Vihar",
    city: "gurgaon",
    kind: "mixed",
    rentFrom: 14000,
    landmarks: ["Palam Vihar Chowk", "Dwarka Expressway", "Sector 23"],
    nearby: ["sector-23", "sector-22", "udyog-vihar"],
    blurb:
      "Palam Vihar is a large, well-planned township popular with families and professionals near the Dwarka Expressway.",
  },
  {
    slug: "south-city",
    name: "South City",
    city: "gurgaon",
    kind: "professional",
    rentFrom: 17000,
    landmarks: ["South City Market", "Sohna Road", "Sector 40"],
    nearby: ["sohna-road", "sector-40", "sector-47"],
    blurb:
      "South City offers established, green residential blocks with quick access to Sohna Road offices.",
  },
  {
    slug: "galleria",
    name: "Galleria Market",
    city: "gurgaon",
    kind: "professional",
    rentFrom: 18000,
    landmarks: ["Galleria Market", "DLF Phase 4", "Sushant Lok"],
    nearby: ["dlf-phase-4", "dlf-phase-5", "sushant-lok"],
    blurb:
      "Galleria Market is DLF's dining and shopping nucleus, surrounded by sought-after co-living stays.",
  },
  {
    slug: "sector-14",
    name: "Sector 14",
    city: "gurgaon",
    kind: "mixed",
    rentFrom: 15000,
    landmarks: ["Sector 14 Market", "MG Road", "Old Gurgaon"],
    nearby: ["sector-15", "mg-road", "sector-40"],
    blurb:
      "Sector 14 is a central, budget-friendly hub close to MG Road and old Gurgaon's markets.",
  },
  {
    slug: "sector-15",
    name: "Sector 15",
    city: "gurgaon",
    kind: "mixed",
    rentFrom: 15000,
    landmarks: ["Sector 15 Market", "Sector 14", "MG Road"],
    nearby: ["sector-14", "mg-road", "sector-40"],
    blurb:
      "Sector 15 offers quiet residential lanes with easy connectivity to MG Road and IFFCO Chowk.",
  },
  {
    slug: "sector-40",
    name: "Sector 40",
    city: "gurgaon",
    kind: "professional",
    rentFrom: 16000,
    landmarks: ["Sector 40 Market", "Galleria", "South City"],
    nearby: ["sector-43", "south-city", "sector-14"],
    blurb:
      "Sector 40 is a central, well-served neighbourhood within reach of Golf Course Road and Sohna Road.",
  },
  {
    slug: "sector-43",
    name: "Sector 43",
    city: "gurgaon",
    kind: "professional",
    rentFrom: 16000,
    landmarks: ["Huda City Centre Metro", "Sector 44", "Sushant Lok"],
    nearby: ["sector-45", "sushant-lok", "sector-40"],
    blurb:
      "Sector 43 sits beside Huda City Centre metro, a prime pick for professionals who commute by metro.",
  },
  {
    slug: "sector-45",
    name: "Sector 45",
    city: "gurgaon",
    kind: "professional",
    rentFrom: 15000,
    landmarks: ["Huda City Centre Metro", "Sector 44", "Sector 47"],
    nearby: ["sector-43", "sector-47", "sector-49"],
    blurb:
      "Sector 45 is a settled residential zone a short ride from Huda City Centre metro and Golf Course Extension.",
  },
  {
    slug: "sector-47",
    name: "Sector 47",
    city: "gurgaon",
    kind: "professional",
    rentFrom: 15000,
    landmarks: ["Sohna Road", "Subhash Chowk", "Sector 49"],
    nearby: ["sector-49", "sohna-road", "sector-45"],
    blurb:
      "Sector 47 offers value rentals along the Sohna Road office corridor in south Gurgaon.",
  },
  {
    slug: "sector-49",
    name: "Sector 49",
    city: "gurgaon",
    kind: "professional",
    rentFrom: 15000,
    landmarks: ["Sohna Road", "Omaxe Mall", "South City 2"],
    nearby: ["sector-47", "sohna-road", "south-city"],
    blurb:
      "Sector 49 is a popular Sohna Road pocket with modern apartments and quick office access.",
  },
  {
    slug: "sector-51",
    name: "Sector 51",
    city: "gurgaon",
    kind: "professional",
    rentFrom: 16000,
    landmarks: ["Sector 51", "Artemis Hospital", "Sector 52"],
    nearby: ["sector-54", "sector-56", "sector-49"],
    blurb:
      "Sector 51 balances quiet residential living with proximity to Golf Course Extension and hospitals.",
  },
  {
    slug: "sector-54",
    name: "Sector 54",
    city: "gurgaon",
    kind: "professional",
    rentFrom: 20000,
    landmarks: ["Sector 53-54 Rapid Metro", "Golf Course Road", "Suncity"],
    nearby: ["golf-course-road", "dlf-phase-5", "sector-56"],
    blurb:
      "Sector 54 is a premium Golf Course Road neighbourhood with rapid-metro access and upscale towers.",
  },
  {
    slug: "sector-56",
    name: "Sector 56",
    city: "gurgaon",
    kind: "professional",
    rentFrom: 17000,
    landmarks: ["Sector 56 Market", "Golf Course Road", "Hong Kong Bazaar"],
    nearby: ["sector-54", "sector-51", "golf-course-road"],
    blurb:
      "Sector 56 offers well-connected, mid-premium living near Golf Course Road and everyday markets.",
  },
  {
    slug: "sector-23",
    name: "Sector 23",
    city: "gurgaon",
    kind: "mixed",
    rentFrom: 13000,
    landmarks: ["Palam Vihar", "Dwarka Expressway", "Sector 22"],
    nearby: ["palam-vihar", "sector-22", "udyog-vihar"],
    blurb:
      "Sector 23 is an affordable, family-friendly area next to Palam Vihar and the Dwarka Expressway.",
  },
  {
    slug: "sector-22",
    name: "Sector 22",
    city: "gurgaon",
    kind: "mixed",
    rentFrom: 13000,
    landmarks: ["Palam Vihar", "Udyog Vihar", "Sector 23"],
    nearby: ["sector-23", "palam-vihar", "udyog-vihar"],
    blurb:
      "Sector 22 offers budget stays with quick links to Udyog Vihar's offices and Old Delhi–Gurgaon Road.",
  },
];

export function getLocality(slug: string): Locality | undefined {
  return localities.find((l) => l.slug === slug);
}
