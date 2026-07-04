import BlogForm from "@/components/admin/BlogForm";

export const dynamic = "force-dynamic";

export default function NewBlogPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold">New post</h1>
      <BlogForm />
    </div>
  );
}
