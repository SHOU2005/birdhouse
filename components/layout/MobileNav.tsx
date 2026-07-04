"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { mainNav } from "@/lib/data/nav";
import { Button } from "@/components/ui/Button";

export default function MobileNav({ phone }: { phone: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="grid h-10 w-10 place-items-center rounded-xl border border-line text-ink"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col overflow-y-auto bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display text-lg font-bold text-ink">Menu</span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-xl border border-line text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {mainNav.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-base font-semibold text-ink hover:bg-primary-50 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-3 border-l border-line pl-3">
                      {item.children.map((group) => (
                        <div key={group.city} className="mb-2 mt-1">
                          <p className="px-3 text-xs font-semibold uppercase tracking-wide text-muted">
                            {group.city}
                          </p>
                          {group.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => setOpen(false)}
                              className="block rounded-lg px-3 py-1.5 text-sm text-muted hover:text-primary"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="mt-6 space-y-3 border-t border-line pt-6">
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 font-semibold text-ink"
              >
                <Phone className="h-4 w-4 text-primary" />
                {phone}
              </a>
              <Button href="/contact" variant="primary" className="w-full">
                Request A Call Back
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
