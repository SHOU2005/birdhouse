import { notFound } from "next/navigation";
import PropertyForm from "@/components/admin/PropertyForm";
import { getPropertyBySlug } from "@/lib/store/content";

export const dynamic = "force-dynamic";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold">Edit listing</h1>
      <PropertyForm property={property} />
    </div>
  );
}
