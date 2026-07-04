import Link from "next/link";
import { getProperties, getBlogs } from "@/lib/store/content";
import { getLeads } from "@/lib/store/leads";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [properties, blogs, leads] = await Promise.all([
    getProperties(),
    getBlogs(),
    getLeads(),
  ]);

  const cards = [
    {
      label: "Property listings",
      count: properties.length,
      sub: `${properties.filter((p) => p.featured).length} featured`,
      href: "/admin/properties",
      cta: "Manage listings",
    },
    {
      label: "Blog posts",
      count: blogs.length,
      sub: "Published articles",
      href: "/admin/blogs",
      cta: "Manage posts",
    },
    {
      label: "Enquiries",
      count: leads.length,
      sub: "From the contact form",
      href: "/admin/leads",
      cta: "View enquiries",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage everything on birdhouse.co.in from here.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.href}
            className="flex flex-col justify-between rounded-2xl bg-white p-5 shadow-sm"
          >
            <div>
              <p className="text-sm font-medium text-slate-500">{c.label}</p>
              <p className="mt-2 text-4xl font-semibold text-slate-900">
                {c.count}
              </p>
              <p className="mt-1 text-sm text-slate-400">{c.sub}</p>
            </div>
            <Link
              href={c.href}
              className="mt-4 inline-block text-sm font-medium text-sky-700 hover:text-sky-900"
            >
              {c.cta} →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
