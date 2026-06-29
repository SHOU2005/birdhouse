"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { galleryItems } from "@/lib/data/content";
import { cn } from "@/lib/utils";

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const total = galleryItems.length;

  const close = useCallback(() => setOpen(null), []);
  const move = useCallback(
    (dir: number) => setOpen((i) => (i === null ? i : (i + dir + total) % total)),
    [total]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, move]);

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Gallery"
          title="Glimpse of Our Properties"
          subtitle="Capturing the essence of premium living — elegant interiors and finest amenities that redefine home."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {galleryItems.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <button
                onClick={() => setOpen(i)}
                aria-label={`View ${item.title}`}
                className={cn(
                  "group relative flex aspect-[4/3] w-full items-end overflow-hidden rounded-2xl p-5 text-left shadow-[var(--shadow-card)]",
                  i === 0 && "md:col-span-2 md:row-span-2 md:aspect-auto md:h-full"
                )}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/65 to-transparent transition-colors duration-300 group-hover:from-ink/75" />
                <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                  <ZoomIn className="h-4 w-4" />
                </span>
                <span className="relative font-display text-lg font-semibold text-white drop-shadow">
                  {item.title}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Lightbox */}
      {open !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            aria-label="Close"
            onClick={close}
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              move(-1);
            }}
            className="absolute left-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-8"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <figure
            className="relative max-h-[80vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl">
              <Image
                src={galleryItems[open].image}
                alt={galleryItems[open].title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <figcaption className="mt-3 text-center font-medium text-white">
              {galleryItems[open].title}{" "}
              <span className="text-white/50">
                ({open + 1}/{total})
              </span>
            </figcaption>
          </figure>
          <button
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              move(1);
            }}
            className="absolute right-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-8"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </Section>
  );
}
