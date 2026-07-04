import { getLeads } from "@/lib/store/leads";
import { deleteLead } from "@/app/admin/actions";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Enquiries</h1>
        <p className="mt-1 text-sm text-slate-500">
          {leads.length} enquir{leads.length === 1 ? "y" : "ies"} from the contact
          form. New enquiries are also emailed to you.
        </p>
      </div>

      <div className="space-y-3">
        {leads.map((lead) => (
          <div key={lead.id} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold text-slate-900">{lead.name}</h2>
                <p className="text-sm text-slate-500">{formatDate(lead.createdAt)}</p>
              </div>
              <div className="flex items-center gap-3">
                {!lead.delivered && (
                  <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                    email not sent
                  </span>
                )}
                <DeleteButton
                  action={deleteLead}
                  hidden={{ url: lead.url }}
                  confirmMessage="Delete this enquiry?"
                />
              </div>
            </div>

            <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              <div className="flex gap-2">
                <dt className="text-slate-400">Phone</dt>
                <dd>
                  <a href={`tel:${lead.phone}`} className="text-sky-700 hover:underline">
                    {lead.phone}
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-slate-400">Email</dt>
                <dd>
                  <a href={`mailto:${lead.email}`} className="text-sky-700 hover:underline">
                    {lead.email}
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-slate-400">Location</dt>
                <dd className="text-slate-700">{lead.location}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-slate-400">Type</dt>
                <dd className="text-slate-700">{lead.propertyType}</dd>
              </div>
              {lead.budget && (
                <div className="flex gap-2">
                  <dt className="text-slate-400">Budget</dt>
                  <dd className="text-slate-700">{lead.budget}</dd>
                </div>
              )}
            </dl>

            {lead.message && (
              <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
                {lead.message}
              </p>
            )}
          </div>
        ))}

        {leads.length === 0 && (
          <div className="rounded-2xl bg-white p-10 text-center text-slate-400 shadow-sm">
            No enquiries yet.
          </div>
        )}
      </div>
    </div>
  );
}
