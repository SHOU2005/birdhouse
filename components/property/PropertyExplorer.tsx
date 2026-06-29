"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import type { Property } from "@/lib/data/properties";
import { categories } from "@/lib/data/categories";
import PropertyCard from "./PropertyCard";
import { cn } from "@/lib/utils";

type SortKey = "featured" | "low" | "high";

export default function PropertyExplorer({
  properties,
  showTypeFilter = true,
}: {
  properties: Property[];
  showTypeFilter?: boolean;
}) {
  const [type, setType] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("featured");

  const availableTypes = useMemo(() => {
    const present = new Set(properties.map((p) => p.type));
    return categories.filter((c) => present.has(c.slug));
  }, [properties]);

  const visible = useMemo(() => {
    let list = type === "all" ? properties : properties.filter((p) => p.type === type);
    list = [...list];
    if (sort === "low") list.sort((a, b) => a.rentFrom - b.rentFrom);
    else if (sort === "high") list.sort((a, b) => b.rentFrom - a.rentFrom);
    else list.sort((a, b) => Number(b.featured) - Number(a.featured));
    return list;
  }, [properties, type, sort]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-center sm:justify-between">
        {showTypeFilter && availableTypes.length > 1 ? (
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            <FilterChip active={type === "all"} onClick={() => setType("all")}>
              All
            </FilterChip>
            {availableTypes.map((c) => (
              <FilterChip
                key={c.slug}
                active={type === c.slug}
                onClick={() => setType(c.slug)}
              >
                {c.name}
              </FilterChip>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">
            <span className="font-semibold text-ink">{visible.length}</span>{" "}
            propert{visible.length === 1 ? "y" : "ies"} available
          </p>
        )}

        <label className="flex items-center gap-2 text-sm text-muted">
          <SlidersHorizontal className="h-4 w-4" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
          >
            <option value="featured">Featured first</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </label>
      </div>

      {visible.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <PropertyCard key={p.slug} property={p} />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center text-muted">
          No properties available right now. Please{" "}
          <a href="/contact" className="font-semibold text-primary">
            request a call back
          </a>{" "}
          and we&apos;ll help you find one.
        </p>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-primary text-white"
          : "bg-surface text-muted hover:bg-primary-50 hover:text-primary"
      )}
    >
      {children}
    </button>
  );
}
