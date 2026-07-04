"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Phone } from "lucide-react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { mainNav } from "@/lib/data/nav";
import { cn } from "@/lib/utils";
import MobileNav from "./MobileNav";

export default function Header({ phone }: { phone: string }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80"
          : "bg-white"
      )}
    >
      <div className="container-bh flex h-18 items-center justify-between py-3">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            if (item.children) {
              return (
                <div key={item.label} className="group relative">
                  <button
                    className={cn(
                      "flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                      active
                        ? "text-primary"
                        : "text-ink hover:text-primary"
                    )}
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  </button>
                  <div className="invisible absolute left-1/2 top-full z-50 w-[28rem] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="grid grid-cols-2 gap-2 rounded-2xl border border-line bg-white p-4 shadow-[var(--shadow-card)]">
                      {item.children.map((group) => (
                        <div key={group.city}>
                          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-muted">
                            {group.city}
                          </p>
                          <ul className="space-y-0.5">
                            {group.links.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  className="block rounded-lg px-2 py-1.5 text-sm text-ink transition-colors hover:bg-primary-50 hover:text-primary"
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active ? "text-primary" : "text-ink hover:text-primary"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-primary"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-50 text-primary">
              <Phone className="h-4 w-4" />
            </span>
            {phone}
          </a>
          <Button href="/contact" variant="primary" size="sm">
            Request A Call Back
          </Button>
        </div>

        <MobileNav phone={phone} />
      </div>
    </header>
  );
}
