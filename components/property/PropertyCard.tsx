import Link from "next/link";
import Image from "next/image";
import { Wifi, Sparkles, MapPin, ArrowRight } from "lucide-react";
import type { Property } from "@/lib/data/properties";
import { Badge } from "@/components/ui/Badge";
import { formatINR } from "@/lib/utils";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={property.image}
          alt={`${property.name} — ${property.location}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          {property.featured && <Badge tone="primary">Featured</Badge>}
          <Badge tone="neutral">For Rent</Badge>
        </div>
        {property.highlights[0] && (
          <span className="absolute bottom-3 left-4 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-ink backdrop-blur">
            ✦ {property.highlights[0]}
          </span>
        )}
      </div>

      <div className="p-5">
        <p className="flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="h-4 w-4 text-primary" />
          {property.location}
        </p>
        <h3 className="mt-2 font-display text-lg font-bold text-ink">
          {property.name}
        </h3>
        <p className="mt-0.5 text-sm text-muted">{property.occupancy}</p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {property.wifi && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-1 font-medium text-primary">
              <Wifi className="h-3.5 w-3.5" /> Wifi
            </span>
          )}
          {property.housekeeping && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-1 font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Housekeeping
            </span>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <div>
            <p className="text-xs text-muted">Rent Onwards</p>
            <p className="font-display text-xl font-bold text-ink">
              {formatINR(property.rentFrom)}
            </p>
          </div>
          <Link
            href={`/properties/${property.type}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
          >
            View Details
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
