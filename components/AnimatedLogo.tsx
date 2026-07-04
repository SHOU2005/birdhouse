"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The static logo already contains the little bird (the dot of the "i" in
 * BIRD). On first page load we overlay an animated bird that flies in and
 * lands exactly on that spot, then fades into the static logo. Runs once per
 * browser session and respects prefers-reduced-motion.
 */
export default function AnimatedLogo({ className }: { className?: string }) {
  // Only animate on the first load of a session.
  const [play, setPlay] = useState(false);
  const [landed, setLanded] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("bh-bird-played")) return;
    sessionStorage.setItem("bh-bird-played", "1");
    setPlay(true);
    const t = setTimeout(() => setLanded(true), 1700);
    return () => clearTimeout(t);
  }, []);

  return (
    <Link
      href="/"
      aria-label="Birdhouse home"
      className={cn("relative inline-flex items-center", className)}
    >
      <Image
        src="/birdhouse-logo.webp"
        alt="Birdhouse"
        width={150}
        height={49}
        priority
        className="h-10 w-auto"
      />

      {play && (
        <span
          aria-hidden="true"
          className={cn("bh-bird", landed && "bh-bird--out")}
          style={{ position: "absolute", left: 6, top: -1, width: 20, height: 20 }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" className="overflow-visible">
            <g className="bh-bird__wings" fill="var(--color-primary)">
              <path d="M2 13 C 6 7 9 7 12 12 C 15 7 18 7 22 13 C 18 10 15 11 12 14 C 9 11 6 10 2 13 Z" />
            </g>
          </svg>
        </span>
      )}
    </Link>
  );
}
