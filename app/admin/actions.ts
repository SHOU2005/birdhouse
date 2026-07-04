"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/session";
import {
  getProperties,
  saveProperties,
  getBlogs,
  saveBlogs,
  getSiteContent,
  saveSiteContent,
  TAGS,
} from "@/lib/store/content";
import { deleteLead as removeLead } from "@/lib/store/leads";
import { propertySchema, blogSchema, siteContentSchema } from "@/lib/schemas";
import type { Property } from "@/lib/data/properties";
import type { Blog } from "@/lib/data/blogs";

export type FormState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
  ok?: boolean;
};

function lines(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function paragraphs(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(/\r?\n\s*\r?\n/) // blank line separates paragraphs
    .map((s) => s.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

// ---------------------------------------------------------------- Properties

async function parseProperty(formData: FormData) {
  return propertySchema.safeParse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    type: formData.get("type"),
    city: formData.get("city"),
    location: formData.get("location"),
    rentFrom: formData.get("rentFrom"),
    occupancy: formData.get("occupancy"),
    image: formData.get("image"),
    featured: formData.get("featured") != null,
    wifi: formData.get("wifi") != null,
    housekeeping: formData.get("housekeeping") != null,
    highlights: lines(formData.get("highlights")),
  });
}

export async function saveProperty(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();

  const parsed = await parseProperty(formData);
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }
  const property = parsed.data as Property;
  const originalSlug = String(formData.get("originalSlug") ?? "").trim();
  const isEdit = originalSlug.length > 0;

  try {
    const all = await getProperties();
    const clashes = all.some(
      (p) => p.slug === property.slug && p.slug !== originalSlug
    );
    if (clashes) {
      return { fieldErrors: { slug: ["A property with this slug already exists"] } };
    }

    let next: Property[];
    if (isEdit) {
      const exists = all.some((p) => p.slug === originalSlug);
      next = exists
        ? all.map((p) => (p.slug === originalSlug ? property : p))
        : [...all, property];
    } else {
      next = [...all, property];
    }
    await saveProperties(next);
  } catch (err) {
    console.error("[admin] saveProperty failed:", err);
    return { error: "Could not save. Is the Blob store configured?" };
  }

  revalidateTag(TAGS.properties, "max");
  redirect("/admin/properties");
}

export async function deleteProperty(formData: FormData): Promise<void> {
  await requireAdmin();
  const slug = String(formData.get("slug") ?? "");
  const all = await getProperties();
  await saveProperties(all.filter((p) => p.slug !== slug));
  revalidateTag(TAGS.properties, "max");
  redirect("/admin/properties");
}

// --------------------------------------------------------------------- Blogs

export async function saveBlog(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();

  const parsed = blogSchema.safeParse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    date: formData.get("date"),
    excerpt: formData.get("excerpt"),
    readingTime: formData.get("readingTime"),
    category: formData.get("category"),
    gradient: formData.get("gradient"),
    content: paragraphs(formData.get("content")),
  });
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }
  const blog = parsed.data as Blog;
  const originalSlug = String(formData.get("originalSlug") ?? "").trim();
  const isEdit = originalSlug.length > 0;

  try {
    const all = await getBlogs();
    const clashes = all.some(
      (b) => b.slug === blog.slug && b.slug !== originalSlug
    );
    if (clashes) {
      return { fieldErrors: { slug: ["A post with this slug already exists"] } };
    }
    const next = isEdit
      ? all.map((b) => (b.slug === originalSlug ? blog : b))
      : [...all, blog];
    await saveBlogs(next);
  } catch (err) {
    console.error("[admin] saveBlog failed:", err);
    return { error: "Could not save. Is the Blob store configured?" };
  }

  revalidateTag(TAGS.blogs, "max");
  redirect("/admin/blogs");
}

export async function deleteBlog(formData: FormData): Promise<void> {
  await requireAdmin();
  const slug = String(formData.get("slug") ?? "");
  const all = await getBlogs();
  await saveBlogs(all.filter((b) => b.slug !== slug));
  revalidateTag(TAGS.blogs, "max");
  redirect("/admin/blogs");
}

// ------------------------------------------------------------- Site content

export async function saveSite(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();

  // FAQs and testimonials arrive as parallel indexed fields.
  const current = await getSiteContent();
  const faqQs = formData.getAll("faq_q").map(String);
  const faqAs = formData.getAll("faq_a").map(String);
  const faqs = faqQs
    .map((q, i) => ({ q: q.trim(), a: (faqAs[i] ?? "").trim() }))
    .filter((f) => f.q && f.a);

  const tNames = formData.getAll("t_name").map(String);
  const tRoles = formData.getAll("t_role").map(String);
  const tQuotes = formData.getAll("t_quote").map(String);
  const testimonials = tNames
    .map((name, i) => ({
      name: name.trim(),
      role: (tRoles[i] ?? "").trim(),
      quote: (tQuotes[i] ?? "").trim(),
    }))
    .filter((t) => t.name && t.role && t.quote);

  const parsed = siteContentSchema.safeParse({
    contact: {
      phonePrimary: formData.get("phonePrimary"),
      phoneSecondary: formData.get("phoneSecondary"),
      email: formData.get("email"),
      address: formData.get("address"),
      whatsapp: formData.get("whatsapp"),
      socials: {
        instagram: formData.get("instagram"),
        facebook: formData.get("facebook"),
        linkedin: formData.get("linkedin"),
        twitter: formData.get("twitter"),
      },
    },
    faqs,
    testimonials,
  });
  if (!parsed.success) {
    return {
      error: "Please check the contact fields (a valid email is required).",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await saveSiteContent({ ...current, ...parsed.data });
  } catch (err) {
    console.error("[admin] saveSite failed:", err);
    return { error: "Could not save. Is the Blob store configured?" };
  }

  revalidateTag(TAGS.site, "max");
  return { ok: true };
}

// --------------------------------------------------------------------- Leads

export async function deleteLead(formData: FormData): Promise<void> {
  await requireAdmin();
  const url = String(formData.get("url") ?? "");
  if (url) await removeLead(url);
  redirect("/admin/leads");
}
