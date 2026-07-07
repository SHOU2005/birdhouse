import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth/session";
import { logout } from "@/lib/auth/actions";
import { hasSupabase } from "@/lib/store/supabase";
import AdminNav from "@/components/admin/AdminNav";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Secure check (proxy is only an optimistic first pass).
  if (!(await isAuthed())) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex max-w-6xl gap-6 p-4 md:p-6">
        <aside className="hidden w-56 shrink-0 flex-col justify-between md:flex">
          <div>
            <Link href="/admin" className="block px-3 py-2 text-lg font-semibold">
              Birdhouse
            </Link>
            <div className="mt-4">
              <AdminNav />
            </div>
          </div>
          <div className="space-y-1">
            <Link
              href="/"
              target="_blank"
              className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-200"
            >
              View site ↗
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-200"
              >
                Log out
              </button>
            </form>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          {/* Mobile nav */}
          <div className="mb-4 flex items-center gap-2 overflow-x-auto md:hidden">
            <AdminNav />
          </div>

          {!hasSupabase && (
            <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <strong>Supabase not connected.</strong> You&rsquo;re viewing the
              built-in seed content. Edits won&rsquo;t save until{" "}
              <code>SUPABASE_URL</code> and{" "}
              <code>SUPABASE_SERVICE_ROLE_KEY</code> are set.
            </div>
          )}

          {children}
        </main>
      </div>
    </div>
  );
}
