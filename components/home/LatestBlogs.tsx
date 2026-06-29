import { Section, Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import BlogCard from "@/components/BlogCard";
import { blogs } from "@/lib/data/blogs";

export default function LatestBlogs() {
  const latest = [...blogs]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);

  return (
    <Section className="bg-surface">
      <Container>
        <SectionHeading
          eyebrow="Latest News"
          title="The Most Recent Reads"
          subtitle="Tips, guides and stories to help you settle into your new home."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {latest.map((b, i) => (
            <Reveal key={b.slug} delay={i * 0.08}>
              <BlogCard blog={b} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/blogs" variant="outline">
            View All Blogs
          </Button>
        </div>
      </Container>
    </Section>
  );
}
