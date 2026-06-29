"use client";

import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/ui/Section";
import { testimonials } from "@/lib/data/content";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const go = (dir: number) => setIndex((i) => (i + dir + total) % total);

  // show up to 3 cards starting at index
  const visible = [0, 1, 2].map((o) => testimonials[(index + o) % total]);

  return (
    <Section className="bg-surface">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Testimonials"
            title="What people say"
            subtitle="Real stories from residents who found their home at Birdhouse."
          />
          <div className="flex gap-2">
            <button
              aria-label="Previous"
              onClick={() => go(-1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink transition-colors hover:bg-primary hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next"
              onClick={() => go(1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink transition-colors hover:bg-primary hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((t, i) => (
            <figure
              key={`${t.name}-${i}`}
              className={cn(
                "flex h-full flex-col rounded-2xl bg-white p-7 shadow-[var(--shadow-card)]",
                i === 2 && "hidden lg:flex",
                i === 1 && "hidden md:flex"
              )}
            >
              <Quote className="h-8 w-8 text-accent" />
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-4">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-primary font-display font-bold text-white">
                  {initials(t.name)}
                </span>
                <span>
                  <span className="block font-semibold text-ink">{t.name}</span>
                  <span className="block text-xs text-muted">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index ? "w-6 bg-primary" : "w-2 bg-line"
              )}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
