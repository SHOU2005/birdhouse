import Link from "next/link";
import { getProperties } from "@/lib/store/content";
import { getCategory } from "@/lib/data/categories";
import { deleteProperty } from "@/app/admin/actions";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Property listings</h1>
          <p className="mt-1 text-sm text-slate-500">
            {properties.length} listing{properties.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link
          href="/admin/properties/new"
          className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-medium text-white hover:bg-sky-800"
        >
          + New listing
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">City</th>
              <th className="px-4 py-3 font-medium">Rent</th>
              <th className="px-4 py-3 font-medium">Featured</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {properties.map((p) => (
              <tr key={p.slug} className="border-b border-slate-50 last:border-0">
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-900">{p.name}</div>
                  <div className="text-xs text-slate-400">{p.location}</div>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {getCategory(p.type)?.name ?? p.type}
                </td>
                <td className="px-4 py-3 capitalize text-slate-600">{p.city}</td>
                <td className="px-4 py-3 text-slate-600">
                  ₹{p.rentFrom.toLocaleString("en-IN")}
                </td>
                <td className="px-4 py-3">
                  {p.featured ? (
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                      Yes
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">No</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/properties/${p.slug}`}
                      className="text-sm font-medium text-sky-700 hover:text-sky-900"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      action={deleteProperty}
                      hidden={{ slug: p.slug }}
                      confirmMessage={`Delete “${p.name}”? This can't be undone.`}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {properties.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-slate-400">
                  No listings yet. Create your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
