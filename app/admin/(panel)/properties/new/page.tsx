import PropertyForm from "@/components/admin/PropertyForm";

export const dynamic = "force-dynamic";

export default function NewPropertyPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold">New listing</h1>
      <PropertyForm />
    </div>
  );
}
