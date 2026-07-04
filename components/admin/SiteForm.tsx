"use client";

import { useActionState, useState } from "react";
import { saveSite, type FormState } from "@/app/admin/actions";
import type { SiteContent } from "@/lib/store/content";

const input =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100";
const label = "text-sm font-medium text-slate-700";
const card = "space-y-4 rounded-2xl bg-white p-6 shadow-sm";

export default function SiteForm({ content }: { content: SiteContent }) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    saveSite,
    {}
  );
  const [faqs, setFaqs] = useState(content.faqs);
  const [testimonials, setTestimonials] = useState(content.testimonials);

  return (
    <form action={action} className="space-y-6">
      {/* Contact details */}
      <section className={card}>
        <h2 className="text-lg font-semibold">Contact details</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className={label} htmlFor="phonePrimary">Primary phone</label>
            <input id="phonePrimary" name="phonePrimary" defaultValue={content.contact.phonePrimary} className={input} />
          </div>
          <div className="space-y-1">
            <label className={label} htmlFor="phoneSecondary">Secondary phone</label>
            <input id="phoneSecondary" name="phoneSecondary" defaultValue={content.contact.phoneSecondary} className={input} />
          </div>
          <div className="space-y-1">
            <label className={label} htmlFor="email">Email</label>
            <input id="email" name="email" type="email" defaultValue={content.contact.email} className={input} />
          </div>
          <div className="space-y-1">
            <label className={label} htmlFor="whatsapp">WhatsApp number</label>
            <input id="whatsapp" name="whatsapp" defaultValue={content.contact.whatsapp} className={input} />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className={label} htmlFor="address">Address</label>
            <input id="address" name="address" defaultValue={content.contact.address} className={input} />
          </div>
          <div className="space-y-1">
            <label className={label} htmlFor="instagram">Instagram URL</label>
            <input id="instagram" name="instagram" defaultValue={content.contact.socials.instagram} className={input} />
          </div>
          <div className="space-y-1">
            <label className={label} htmlFor="facebook">Facebook URL</label>
            <input id="facebook" name="facebook" defaultValue={content.contact.socials.facebook} className={input} />
          </div>
          <div className="space-y-1">
            <label className={label} htmlFor="linkedin">LinkedIn URL</label>
            <input id="linkedin" name="linkedin" defaultValue={content.contact.socials.linkedin} className={input} />
          </div>
          <div className="space-y-1">
            <label className={label} htmlFor="twitter">Twitter/X URL</label>
            <input id="twitter" name="twitter" defaultValue={content.contact.socials.twitter} className={input} />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className={card}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">FAQs</h2>
          <button
            type="button"
            onClick={() => setFaqs([...faqs, { q: "", a: "" }])}
            className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-900"
          >
            + Add FAQ
          </button>
        </div>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="space-y-2 rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">
                  FAQ #{i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => setFaqs(faqs.filter((_, j) => j !== i))}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
              <input
                name="faq_q"
                defaultValue={f.q}
                placeholder="Question"
                className={input}
              />
              <textarea
                name="faq_a"
                defaultValue={f.a}
                rows={2}
                placeholder="Answer"
                className={input}
              />
            </div>
          ))}
          {faqs.length === 0 && (
            <p className="text-sm text-slate-400">No FAQs. Add one above.</p>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className={card}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Testimonials</h2>
          <button
            type="button"
            onClick={() =>
              setTestimonials([...testimonials, { name: "", role: "", quote: "" }])
            }
            className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-900"
          >
            + Add testimonial
          </button>
        </div>
        <div className="space-y-4">
          {testimonials.map((t, i) => (
            <div key={i} className="space-y-2 rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">
                  Testimonial #{i + 1}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setTestimonials(testimonials.filter((_, j) => j !== i))
                  }
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
              <div className="grid gap-2 md:grid-cols-2">
                <input name="t_name" defaultValue={t.name} placeholder="Name" className={input} />
                <input name="t_role" defaultValue={t.role} placeholder="Role (e.g. Tenant)" className={input} />
              </div>
              <textarea name="t_quote" defaultValue={t.quote} rows={2} placeholder="Quote" className={input} />
            </div>
          ))}
          {testimonials.length === 0 && (
            <p className="text-sm text-slate-400">No testimonials. Add one above.</p>
          )}
        </div>
      </section>

      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      )}
      {state.ok && (
        <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Saved. Changes are live on the site.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-sky-700 px-5 py-2 font-medium text-white hover:bg-sky-800 disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save site content"}
      </button>
    </form>
  );
}
