import "server-only";
import { cache } from "react";
import { readJson, writeJson } from "./blob";
import { properties as seedProperties, type Property } from "@/lib/data/properties";
import { blogs as seedBlogs, type Blog } from "@/lib/data/blogs";
import {
  faqs as seedFaqs,
  testimonials as seedTestimonials,
  type Faq,
  type Testimonial,
} from "@/lib/data/content";
import { site as seedSite } from "@/lib/data/site";
import type { PropertyType } from "@/lib/data/categories";

/**
 * Typed content store. Each getter reads its collection from Blob and falls
 * back to the in-repo seed data when Blob is empty or unconfigured — so the
 * public site renders identically to before until the admin makes edits.
 *
 * Getters are wrapped in React `cache()` to dedupe reads within a single
 * request (many components read `properties` on one page render).
 */

export const KEYS = {
  properties: "data/properties.json",
  blogs: "data/blogs.json",
  site: "data/site-content.json",
} as const;

/** Cache tags — public reads are tagged; admin writes call revalidateTag. */
export const TAGS = {
  properties: "bh:properties",
  blogs: "bh:blogs",
  site: "bh:site",
} as const;

export const LEADS_PREFIX = "leads/";

// ---------------------------------------------------------------- Properties

export const getProperties = cache(async (): Promise<Property[]> => {
  return (await readJson<Property[]>(KEYS.properties, TAGS.properties)) ?? seedProperties;
});

export async function getFeaturedProperties(): Promise<Property[]> {
  return (await getProperties()).filter((p) => p.featured);
}

export async function getPropertiesByType(type: PropertyType): Promise<Property[]> {
  return (await getProperties()).filter((p) => p.type === type);
}

export async function getPropertiesByCity(
  city: "delhi" | "gurgaon"
): Promise<Property[]> {
  return (await getProperties()).filter((p) => p.city === city);
}

export async function getPropertyBySlug(slug: string): Promise<Property | undefined> {
  return (await getProperties()).find((p) => p.slug === slug);
}

export async function saveProperties(list: Property[]): Promise<void> {
  await writeJson(KEYS.properties, list);
}

// --------------------------------------------------------------------- Blogs

export const getBlogs = cache(async (): Promise<Blog[]> => {
  const list = (await readJson<Blog[]>(KEYS.blogs, TAGS.blogs)) ?? seedBlogs;
  // Newest first, matching the public blog listing.
  return [...list].sort((a, b) => b.date.localeCompare(a.date));
});

export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  return (await getBlogs()).find((b) => b.slug === slug);
}

export async function saveBlogs(list: Blog[]): Promise<void> {
  await writeJson(KEYS.blogs, list);
}

// ------------------------------------------------------------- Site content

export type SiteContact = {
  phonePrimary: string;
  phoneSecondary: string;
  email: string;
  address: string;
  whatsapp: string;
  socials: {
    instagram: string;
    facebook: string;
    linkedin: string;
    twitter: string;
  };
};

export type SiteContent = {
  contact: SiteContact;
  faqs: Faq[];
  testimonials: Testimonial[];
};

const seedSiteContent: SiteContent = {
  contact: {
    phonePrimary: seedSite.phonePrimary,
    phoneSecondary: seedSite.phoneSecondary,
    email: seedSite.email,
    address: seedSite.address,
    whatsapp: seedSite.whatsapp,
    socials: { ...seedSite.socials },
  },
  faqs: seedFaqs,
  testimonials: seedTestimonials,
};

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  return (await readJson<SiteContent>(KEYS.site, TAGS.site)) ?? seedSiteContent;
});

/** Site config merged with editable contact overrides (matches the old `site` shape). */
export const getSite = cache(async () => {
  const { contact } = await getSiteContent();
  return {
    name: seedSite.name,
    legalName: seedSite.legalName,
    tagline: seedSite.tagline,
    ...contact,
  };
});

export async function saveSiteContent(content: SiteContent): Promise<void> {
  await writeJson(KEYS.site, content);
}
