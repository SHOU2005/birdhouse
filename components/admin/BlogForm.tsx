"use client";

import Link from "next/link";
import { useActionState } from "react";
import { saveBlog, type FormState } from "@/app/admin/actions";
import type { Blog } from "@/lib/data/blogs";

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="mt-1 text-sm text-red-600">{errors[0]}</p>;
}

const input =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100";
const label = "text-sm font-medium text-slate-700";

export default function BlogForm({ blog }: { blog?: Blog }) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    saveBlog,
    {}
  );
  const fe = state.fieldErrors ?? {};

  return (
    <form action={action} className="space-y-6">
      {blog && <input type="hidden" name="originalSlug" value={blog.slug} />}

      <div className="grid gap-5 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2">
        <div className="space-y-1 md:col-span-2">
          <label className={label} htmlFor="title">Title</label>
          <input id="title" name="title" defaultValue={blog?.title} className={input} />
          <FieldError errors={fe.title} />
        </div>

        <div className="space-y-1">
          <label className={label} htmlFor="slug">Slug (URL id)</label>
          <input id="slug" name="slug" defaultValue={blog?.slug} placeholder="pg-near-du-north-campus" className={input} />
          <FieldError errors={fe.slug} />
        </div>

        <div className="space-y-1">
          <label className={label} htmlFor="date">Date</label>
          <input id="date" name="date" type="date" defaultValue={blog?.date} className={input} />
          <FieldError errors={fe.date} />
        </div>

        <div className="space-y-1">
          <label className={label} htmlFor="category">Category</label>
          <input id="category" name="category" defaultValue={blog?.category} placeholder="Student Living" className={input} />
          <FieldError errors={fe.category} />
        </div>

        <div className="space-y-1">
          <label className={label} htmlFor="readingTime">Reading time</label>
          <input id="readingTime" name="readingTime" defaultValue={blog?.readingTime} placeholder="4 min read" className={input} />
          <FieldError errors={fe.readingTime} />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className={label} htmlFor="gradient">
            Card gradient (Tailwind classes)
          </label>
          <input
            id="gradient"
            name="gradient"
            defaultValue={blog?.gradient ?? "from-[#0f4a68] to-[#2f86b3]"}
            className={input}
          />
          <FieldError errors={fe.gradient} />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className={label} htmlFor="excerpt">Excerpt</label>
          <textarea id="excerpt" name="excerpt" rows={2} defaultValue={blog?.excerpt} className={input} />
          <FieldError errors={fe.excerpt} />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className={label} htmlFor="content">
            Body (separate paragraphs with a blank line)
          </label>
          <textarea
            id="content"
            name="content"
            rows={12}
            defaultValue={blog?.content.join("\n\n")}
            className={input}
          />
          <FieldError errors={fe.content} />
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
          {pending ? "Saving…" : blog ? "Save changes" : "Publish post"}
        </button>
        <Link href="/admin/blogs" className="text-sm text-slate-500 hover:text-slate-800">
          Cancel
        </Link>
      </div>
    </form>
  );
}
