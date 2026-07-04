"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/ui/Section";
import type { Faq } from "@/lib/data/content";
import { cn } from "@/lib/utils";

export default function FAQ({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="FAQs"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know before you move in. Still curious? Just reach out."
        />

        <div className="mx-auto mt-10 max-w-3xl divide-y divide-line rounded-2xl border border-line bg-white">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-ink">{f.q}</span>
                  <Plus
                    className={cn(
                      "h-5 w-5 shrink-0 text-primary transition-transform duration-300",
                      isOpen && "rotate-45"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid overflow-hidden px-5 transition-all duration-300",
                    isOpen
                      ? "grid-rows-[1fr] pb-4 opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <p className="min-h-0 text-sm leading-relaxed text-muted">
                    {f.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
