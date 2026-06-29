import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Section, Container } from "@/components/ui/Section";
import LeadForm from "@/components/forms/LeadForm";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Birdhouse — request a call back, visit our Gurugram office, or call 8448040101 to find your perfect accommodation.",
};

const details = [
  {
    Icon: MapPin,
    label: "Visit Us",
    value: site.address,
  },
  {
    Icon: Phone,
    label: "Call Us",
    value: `${site.phonePrimary}, ${site.phoneSecondary}`,
    href: `tel:${site.phonePrimary}`,
  },
  {
    Icon: Mail,
    label: "Email Us",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    Icon: Clock,
    label: "Working Hours",
    value: "Mon – Sun, 9:00 AM – 8:00 PM",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Tell us what you're looking for and our team will help you find your perfect space."
        crumbs={[{ label: "Contact Us" }]}
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink">
                Get In Touch
              </h2>
              <p className="mt-2 text-muted">
                Reach out any way you like — we usually respond within a few
                hours.
              </p>

              <div className="mt-8 space-y-5">
                {details.map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{label}</p>
                      {href ? (
                        <a href={href} className="text-muted hover:text-primary">
                          {value}
                        </a>
                      ) : (
                        <p className="text-muted">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 overflow-hidden rounded-2xl border border-line">
                <iframe
                  title="Birdhouse location"
                  src="https://www.google.com/maps?q=DLF+City+Phase+3+Sector+26+Gurugram&output=embed"
                  className="h-64 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
              <h2 className="font-display text-2xl font-bold text-ink">
                Request A Call Back
              </h2>
              <p className="mt-1 text-sm text-muted">
                Fill in your details and we&apos;ll get back to you shortly.
              </p>
              <div className="mt-6">
                <LeadForm withMessage />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
