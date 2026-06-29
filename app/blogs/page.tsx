import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Section, Container } from "@/components/ui/Section";
import BlogCard from "@/components/BlogCard";
import { Reveal } from "@/components/ui/Reveal";
import { blogs } from "@/lib/data/blogs";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Tips, guides and stories from Birdhouse — PG hunting, co-living, renting in Gurgaon & Delhi, and making the most of your new home.",
};

export default function BlogsPage() {
  const sorted = [...blogs].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <PageHero
        title="Birdhouse Blog"
        subtitle="Tips, guides and stories to help you find and settle into your perfect space."
        crumbs={[{ label: "Blogs" }]}
      />
      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sorted.map((b, i) => (
              <Reveal key={b.slug} delay={i * 0.06}>
                <BlogCard blog={b} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
