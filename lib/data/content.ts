export const amenities = [
  { name: "Wifi", icon: "Wifi" },
  { name: "Housekeeping", icon: "Sparkles" },
  { name: "Furnished Rooms", icon: "BedDouble" },
  { name: "Medical Assistance", icon: "Stethoscope" },
  { name: "CCTV Surveillance 24/7", icon: "Cctv" },
  { name: "No Brokerage", icon: "BadgeIndianRupee" },
  { name: "Hassle-Free Stay", icon: "ShieldCheck" },
  { name: "Laundry Service", icon: "Shirt" },
] as const;

export const whyChooseUs = [
  {
    title: "Prime Locations",
    icon: "MapPin",
    description:
      "Located in Gurgaon, Delhi, Punjab and Jaipur — close to major hubs, transportation and entertainment.",
  },
  {
    title: "Modern Amenities",
    icon: "Sparkles",
    description:
      "Enjoy high-speed internet, housekeeping, round-the-clock security and thoughtfully designed spaces.",
  },
  {
    title: "Affordable Living",
    icon: "Wallet",
    description:
      "Quality living spaces at pocket-friendly prices — comfort without compromise, and zero brokerage.",
  },
  {
    title: "Community Living",
    icon: "Users",
    description:
      "Connect with like-minded people in a community-focused environment and build lifelong friendships.",
  },
] as const;

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Deepali Sharma",
    role: "Tenant",
    quote:
      "Living in the Birdhouse has been an absolute delight! The cozy atmosphere and charming design make it a truly unique and enjoyable place to call home.",
  },
  {
    name: "Arun Jain",
    role: "Tenant",
    quote:
      "I appreciate the attention to detail in the Birdhouse — from the thoughtfully curated decor to the comfortable furnishings. It's more than just a place to stay; it's a haven.",
  },
  {
    name: "Gopal Verma",
    role: "Tenant",
    quote:
      "The Birdhouse offers a serene escape from the hustle and bustle of daily life. Waking up to a warm community and clean, comfortable surroundings has been truly uplifting.",
  },
  {
    name: "Sneha Kapoor",
    role: "Student, DU North Campus",
    quote:
      "As a student, finding a safe and affordable PG was my biggest worry. Birdhouse made it effortless — secure, friendly and just minutes from campus.",
  },
  {
    name: "Rahul Mehta",
    role: "Working Professional",
    quote:
      "No brokerage, fully furnished, and a move-in that actually was hassle-free. Birdhouse's co-living in Gurgaon is exactly what young professionals need.",
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What is Birdhouse Shelter?",
    a: "Birdhouse Shelter is an organization providing accommodation and facilities with unified and customizable living options across India — including PGs, hostels, co-living spaces, rental flats and co-working spaces.",
  },
  {
    q: "Are there any additional fees or deposits required when booking?",
    a: "A standard refundable security deposit applies and is clearly communicated upfront. We charge zero brokerage — there are no hidden fees.",
  },
  {
    q: "What types of accommodation does Birdhouse offer?",
    a: "We offer student housing, girls and boys hostels, 1RK, 1BHK, 2BHK and 3BHK rentals, fully-managed co-living, and co-working spaces.",
  },
  {
    q: "Are the accommodations furnished?",
    a: "Yes. Our rooms and flats come fully furnished with beds, storage, study desks and essential furniture so you can move in with ease.",
  },
  {
    q: "What amenities are included?",
    a: "High-speed wifi, daily housekeeping, furnished rooms, medical assistance, 24/7 CCTV surveillance, laundry service and a hassle-free stay are included.",
  },
  {
    q: "Is Birdhouse available for short-term stays?",
    a: "Yes, we offer flexible tenure options including short-term stays depending on availability at each property.",
  },
  {
    q: "Are the accommodations located near public transportation?",
    a: "Our properties are in prime locations close to metro stations, bus routes and major hubs for easy commuting.",
  },
  {
    q: "Is there a security system in place?",
    a: "Absolutely. All properties feature 24/7 CCTV surveillance, secure entry and on-site staff for your safety.",
  },
  {
    q: "Are the accommodations pet-friendly?",
    a: "Pet policies vary by property. Please reach out to our team and we'll help you find a pet-friendly option.",
  },
  {
    q: "What are the payment options for booking?",
    a: "We accept UPI, net banking, debit/credit cards and bank transfers. Our team will guide you through a smooth, transparent payment process.",
  },
];

export const galleryItems = [
  { title: "Comfortable Rooms", image: "/images/1745160121_680507b90321c.jpg" },
  { title: "Cozy Bedrooms", image: "/images/1745160120_680507b8e0f6d.jpg" },
  { title: "Modern Interiors", image: "/images/1745160120_680507b8f12c6.jpg" },
  { title: "Furnished Spaces", image: "/images/1745160120_680507b8f31e2.jpg" },
  { title: "Shared Living", image: "/images/1745160121_680507b901073.jpg" },
  { title: "Premium Living", image: "/images/1745160121_680507b905493.jpg" },
];
