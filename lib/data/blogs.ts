export type Blog = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readingTime: string;
  category: string;
  gradient: string;
  content: string[];
};

export const blogs: Blog[] = [
  {
    slug: "pg-near-du-north-campus",
    title: "PG near DU North Campus – Birdhouse",
    date: "2025-04-19",
    excerpt:
      "Ready to begin your college journey? Discover what makes a PG near DU North Campus the perfect launchpad for student life.",
    readingTime: "4 min read",
    category: "Student Living",
    gradient: "from-[#0f4a68] to-[#2f86b3]",
    content: [
      "Starting college at Delhi University is exciting — but finding the right place to stay shouldn't add to the stress. A PG near DU North Campus puts you minutes away from your classes, the library and the buzzing student life of Vijay Nagar and GTB Nagar.",
      "At Birdhouse, our girls and boys PGs are fully furnished, secured with 24/7 CCTV, and come with high-speed wifi, daily housekeeping and home-style meals. You focus on your studies and your new friendships — we handle the rest.",
      "With zero brokerage and flexible tenure, moving in is genuinely hassle-free. Whether you prefer a quiet single room or the camaraderie of a shared space, there's a Birdhouse for you.",
    ],
  },
  {
    slug: "co-living-vs-traditional-pg",
    title: "Co-Living vs Traditional PG: Which is right for you?",
    date: "2026-03-21",
    excerpt:
      "Co-living and traditional PGs both promise community and convenience — here's how to choose the one that fits your lifestyle.",
    readingTime: "5 min read",
    category: "Guides",
    gradient: "from-[#15658d] to-[#4a97bf]",
    content: [
      "Co-living spaces blend the privacy of your own room with beautifully designed shared lounges, events and an all-inclusive bill. Traditional PGs offer a simpler, often more budget-friendly setup with meals and housekeeping.",
      "If you value community, flexibility and a move-in-ready experience, co-living is hard to beat. If you want maximum affordability close to campus, a PG may suit you better.",
      "Birdhouse offers both across Gurgaon and Delhi — so you can pick what matches your stage of life, with the same promise of comfort, safety and zero brokerage.",
    ],
  },
  {
    slug: "moving-to-gurgaon-renting-guide",
    title: "Moving to Gurgaon? A Renter's Guide to 1RK, 1BHK & Beyond",
    date: "2026-05-10",
    excerpt:
      "From Cyber Hub commutes to choosing between a 1RK and a 1BHK — everything you need to rent smart in Gurgaon.",
    readingTime: "6 min read",
    category: "City Guides",
    gradient: "from-[#0d425e] to-[#256f97]",
    content: [
      "Gurgaon's rental market moves fast. Knowing your budget, preferred sector and commute upfront saves you weeks of searching.",
      "A 1RK is ideal for solo professionals who want a compact, affordable base near work. A 1BHK gives you a separate bedroom and living area — great if you work from home or value extra space.",
      "Birdhouse's furnished rentals across DLF, Sector 43, Sector 54 and Golf Course Road come with modern amenities and no brokerage, so you can move in and settle without the usual headaches.",
    ],
  },
];

export function getBlog(slug: string): Blog | undefined {
  return blogs.find((b) => b.slug === slug);
}
