import Link from "next/link";
import { getBlogs } from "@/lib/store/content";
import { deleteBlog } from "@/app/admin/actions";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Blog posts</h1>
          <p className="mt-1 text-sm text-slate-500">
            {blogs.length} post{blogs.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-medium text-white hover:bg-sky-800"
        >
          + New post
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {blogs.map((b) => (
              <tr key={b.slug} className="border-b border-slate-50 last:border-0">
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-900">{b.title}</div>
                  <div className="text-xs text-slate-400">{b.readingTime}</div>
                </td>
                <td className="px-4 py-3 text-slate-600">{b.category}</td>
                <td className="px-4 py-3 text-slate-600">{b.date}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/blogs/${b.slug}`}
                      className="text-sm font-medium text-sky-700 hover:text-sky-900"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      action={deleteBlog}
                      hidden={{ slug: b.slug }}
                      confirmMessage={`Delete “${b.title}”?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-slate-400">
                  No posts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
