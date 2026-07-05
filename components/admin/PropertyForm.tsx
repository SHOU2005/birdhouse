"use client";

import Link from "next/link";
import { useActionState } from "react";
import { saveProperty, type FormState } from "@/app/admin/actions";
import { categories } from "@/lib/data/categories";
import ImageUpload from "@/components/admin/ImageUpload";
import type { Property } from "@/lib/data/properties";

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="mt-1 text-sm text-red-600">{errors[0]}</p>;
}

const input =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100";
const label = "text-sm font-medium text-slate-700";

export default function PropertyForm({ property }: { property?: Property }) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    saveProperty,
    {}
  );
  const fe = state.fieldErrors ?? {};

  return (
    <form action={action} className="space-y-6">
      {property && (
        <input type="hidden" name="originalSlug" value={property.slug} />
      )}

      <div className="grid gap-5 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2">
        <div className="space-y-1">
          <label className={label} htmlFor="name">Name</label>
          <input id="name" name="name" defaultValue={property?.name} className={input} />
          <FieldError errors={fe.name} />
        </div>

        <div className="space-y-1">
          <label className={label} htmlFor="slug">Slug (URL id)</label>
          <input
            id="slug"
            name="slug"
            defaultValue={property?.slug}
            placeholder="white-dove-girls-pg-vijay-nagar"
            className={input}
          />
          <FieldError errors={fe.slug} />
        </div>

        <div className="space-y-1">
          <label className={label} htmlFor="type">Type</label>
          <select id="type" name="type" defaultValue={property?.type ?? "girls-hostel"} className={input}>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
          <FieldError errors={fe.type} />
        </div>

        <div className="space-y-1">
          <label className={label} htmlFor="city">City</label>
          <select id="city" name="city" defaultValue={property?.city ?? "delhi"} className={input}>
            <option value="delhi">Delhi</option>
            <option value="gurgaon">Gurgaon</option>
          </select>
          <FieldError errors={fe.city} />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className={label} htmlFor="location">Location</label>
          <input id="location" name="location" defaultValue={property?.location} placeholder="Vijay Nagar, Delhi (North Campus)" className={input} />
          <FieldError errors={fe.location} />
        </div>

        <div className="space-y-1">
          <label className={label} htmlFor="rentFrom">Rent from (₹ / month)</label>
          <input id="rentFrom" name="rentFrom" type="number" min={0} defaultValue={property?.rentFrom} className={input} />
          <FieldError errors={fe.rentFrom} />
        </div>

        <div className="space-y-1">
          <label className={label} htmlFor="occupancy">Occupancy</label>
          <input id="occupancy" name="occupancy" defaultValue={property?.occupancy} placeholder="Single / Double sharing" className={input} />
          <FieldError errors={fe.occupancy} />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className={label} htmlFor="highlights">Highlights (one per line, up to 6)</label>
          <textarea
            id="highlights"
            name="highlights"
            rows={4}
            defaultValue={property?.highlights.join("\n")}
            placeholder={"Walking distance to DU\nPower backup\nHome-cooked meals"}
            className={input}
          />
          <FieldError errors={fe.highlights} />
        </div>

        <div className="md:col-span-2">
          <span className={label}>Images (the first is the cover)</span>
          <div className="mt-1">
            <ImageUpload
              name="images"
              defaultValue={
                property?.images ?? (property?.image ? [property.image] : [])
              }
            />
          </div>
          <FieldError errors={fe.images} />
        </div>

        <div className="flex flex-wrap gap-6 md:col-span-2">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" name="featured" defaultChecked={property?.featured} className="h-4 w-4" />
            Featured on homepage
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" name="wifi" defaultChecked={property?.wifi ?? true} className="h-4 w-4" />
            Wifi
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" name="housekeeping" defaultChecked={property?.housekeeping ?? true} className="h-4 w-4" />
            Housekeeping
          </label>
        </div>
      </div>

      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-sky-700 px-5 py-2 font-medium text-white hover:bg-sky-800 disabled:opacity-60"
        >
          {pending ? "Saving…" : property ? "Save changes" : "Create listing"}
        </button>
        <Link href="/admin/properties" className="text-sm text-slate-500 hover:text-slate-800">
          Cancel
        </Link>
      </div>
    </form>
  );
}
