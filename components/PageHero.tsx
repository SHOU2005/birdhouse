import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Section";

type Crumb = { label: string; href?: string };

export default function PageHero({
  title,
  subtitle,
  crumbs = [],
}: {
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="relative overflow-hidden bg-primary-dark text-white">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      <Container className="relative py-14 sm:py-20">
        <nav className="flex flex-wrap items-center gap-1 text-sm text-white/70">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1">
              <ChevronRight className="h-4 w-4" />
              {c.href ? (
                <Link href={c.href} className="hover:text-accent">
                  {c.label}
                </Link>
              ) : (
                <span className="text-white">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-white/80">{subtitle}</p>
        )}
      </Container>
    </section>
  );
}
