import SiteForm from "@/components/admin/SiteForm";
import { getSiteContent } from "@/lib/store/content";

export const dynamic = "force-dynamic";

export default async function SitePage() {
  const content = await getSiteContent();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Site content</h1>
        <p className="mt-1 text-sm text-slate-500">
          Contact details, FAQs and testimonials shown across the public site.
        </p>
      </div>
      <SiteForm content={content} />
    </div>
  );
}
