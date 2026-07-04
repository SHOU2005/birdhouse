import type { MetadataRoute } from "next";
import { categories } from "@/lib/data/categories";
import { getBlogs } from "@/lib/store/content";
import { seoPages } from "@/lib/seo/pages";

const base = "https://birdhouse.co.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getBlogs();
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/broker-partnership",
    "/blogs",
    "/pg",
    "/cities/gurgaon",
    "/cities/new-delhi",
    "/privacy-policy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const propertyRoutes = categories.map((c) => ({
    url: `${base}/properties/${c.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogRoutes = blogs.map((b) => ({
    url: `${base}/blogs/${b.slug}`,
    lastModified: new Date(b.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const seoRoutes = seoPages.map((p) => ({
    url: `${base}/pg/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...propertyRoutes, ...blogRoutes, ...seoRoutes];
}
