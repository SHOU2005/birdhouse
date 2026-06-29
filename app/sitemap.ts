import type { MetadataRoute } from "next";
import { categories } from "@/lib/data/categories";
import { blogs } from "@/lib/data/blogs";

const base = "https://birdhouse.co.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/broker-partnership",
    "/blogs",
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

  return [...staticRoutes, ...propertyRoutes, ...blogRoutes];
}
