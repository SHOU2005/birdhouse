import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import type { Blog } from "@/lib/data/blogs";
import { cn } from "@/lib/utils";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
      <Link href={`/blogs/${blog.slug}`}>
        <div
          className={cn(
            "flex h-44 items-end bg-gradient-to-br p-5",
            blog.gradient
          )}
        >
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">
            {blog.category}
          </span>
        </div>
        <div className="p-5">
          <p className="flex items-center gap-1.5 text-xs text-muted">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(blog.date)} · {blog.readingTime}
          </p>
          <h3 className="mt-2 font-display text-lg font-bold leading-snug text-ink transition-colors group-hover:text-primary">
            {blog.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted">{blog.excerpt}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
            Read more
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}
