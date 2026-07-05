import { z } from "zod";

/** Property types match the taxonomy in lib/data/categories.ts. */
export const PROPERTY_TYPES = [
  "student-housing",
  "girls-hostel",
  "boys-hostel",
  "1rk",
  "1bhk",
  "2bhk",
  "3bhk",
  "co-living",
  "co-working",
] as const;

const slug = z
  .string()
  .trim()
  .min(1, "Slug is required")
  .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and dashes only");

export const propertySchema = z.object({
  slug,
  name: z.string().trim().min(1, "Name is required"),
  type: z.enum(PROPERTY_TYPES),
  city: z.enum(["delhi", "gurgaon"]),
  location: z.string().trim().min(1, "Location is required"),
  rentFrom: z.coerce.number().int().nonnegative("Rent must be 0 or more"),
  occupancy: z.string().trim().min(1, "Occupancy is required"),
  images: z
    .array(z.string().trim().min(1))
    .min(1, "Add at least one image"),
  featured: z.boolean(),
  wifi: z.boolean(),
  housekeeping: z.boolean(),
  highlights: z.array(z.string().trim().min(1)).max(6),
});

export type PropertyInput = z.infer<typeof propertySchema>;

export const blogSchema = z.object({
  slug,
  title: z.string().trim().min(1, "Title is required"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use the date picker (YYYY-MM-DD)"),
  excerpt: z.string().trim().min(1, "Excerpt is required"),
  readingTime: z.string().trim().min(1, "e.g. “4 min read”"),
  category: z.string().trim().min(1, "Category is required"),
  gradient: z.string().trim().min(1, "Gradient is required"),
  content: z.array(z.string().trim().min(1)).min(1, "Add at least one paragraph"),
});

export type BlogInput = z.infer<typeof blogSchema>;

export const siteContentSchema = z.object({
  contact: z.object({
    phonePrimary: z.string().trim().min(1),
    phoneSecondary: z.string().trim(),
    email: z.string().trim().email(),
    address: z.string().trim().min(1),
    whatsapp: z.string().trim().min(1),
    socials: z.object({
      instagram: z.string().trim(),
      facebook: z.string().trim(),
      linkedin: z.string().trim(),
      twitter: z.string().trim(),
    }),
  }),
  faqs: z
    .array(z.object({ q: z.string().trim().min(1), a: z.string().trim().min(1) }))
    .default([]),
  testimonials: z
    .array(
      z.object({
        name: z.string().trim().min(1),
        role: z.string().trim().min(1),
        quote: z.string().trim().min(1),
      })
    )
    .default([]),
});
