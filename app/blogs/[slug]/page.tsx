import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Section, Container } from "@/components/ui/Section";
import BlogCard from "@/components/BlogCard";
import CTABand from "@/components/CTABand";
import { getBlogs, getBlogBySlug } from "@/lib/store/content";

export async function generateStaticParams() {
  return (await getBlogs()).map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return { title: "Blog" };
  return { title: blog.title, description: blog.excerpt };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  const allBlogs = await getBlogs();
  const related = allBlogs.filter((b) => b.slug !== blog.slug).slice(0, 3);

  return (
    <>
      <PageHero
        title={blog.title}
        crumbs={[{ label: "Blogs", href: "/blogs" }, { label: blog.category }]}
      />

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {formatDate(blog.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {blog.readingTime}
              </span>
              <span className="rounded-full bg-primary-50 px-3 py-1 font-medium text-primary">
                {blog.category}
              </span>
            </div>

            <div className="prose mt-8 max-w-none">
              {blog.content.map((p, i) => (
                <p key={i} className="mt-5 text-lg leading-relaxed text-ink/80">
                  {p}
                </p>
              ))}
            </div>

            <Link
              href="/blogs"
              className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark"
            >
              <ArrowLeft className="h-4 w-4" /> Back to all blogs
            </Link>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section className="bg-surface">
          <Container>
            <h2 className="font-display text-2xl font-bold text-ink">
              Related Reads
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((b) => (
                <BlogCard key={b.slug} blog={b} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CTABand />
    </>
  );
}
