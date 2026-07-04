import { notFound } from "next/navigation";
import BlogForm from "@/components/admin/BlogForm";
import { getBlogBySlug } from "@/lib/store/content";

export const dynamic = "force-dynamic";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold">Edit post</h1>
      <BlogForm blog={blog} />
    </div>
  );
}
