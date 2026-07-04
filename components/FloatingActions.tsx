"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { WhatsApp } from "@/components/SocialIcons";
import { cn } from "@/lib/utils";

export default function FloatingActions({ whatsapp }: { whatsapp: string }) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waText = encodeURIComponent(
    "Hi Birdhouse! I'm looking for accommodation and would like more details."
  );

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <button
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "grid h-11 w-11 place-items-center rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:bg-primary-dark",
          showTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        )}
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      <a
        href={`https://wa.me/${whatsapp}?text=${waText}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-105"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <WhatsApp className="relative h-7 w-7" />
        <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-lg bg-ink px-3 py-1.5 text-sm font-medium text-white shadow-lg group-hover:block">
          Chat with us
        </span>
      </a>
    </div>
  );
}
