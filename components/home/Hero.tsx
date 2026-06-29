import Image from "next/image";
import { ShieldCheck, BadgeIndianRupee, Users } from "lucide-react";
import LeadForm from "@/components/forms/LeadForm";

const stats = [
  { value: "500+", label: "Happy Residents" },
  { value: "50+", label: "Properties" },
  { value: "4 Cities", label: "Across India" },
];

const trustItems = [
  { Icon: BadgeIndianRupee, label: "Zero Brokerage" },
  { Icon: ShieldCheck, label: "24/7 Security" },
  { Icon: Users, label: "Community Living" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary-dark text-white">
      {/* background photo */}
      <Image
        src="/images/1745160121_680507b90321c.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/95 via-primary-dark/90 to-primary/80" />
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />

      <div className="container-bh relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur">
            🪶 Cozy corners across cities
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
            Explore Accommodation in{" "}
            <span className="text-accent-light">Gurgaon</span> &{" "}
            <span className="text-accent-light">New Delhi</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/80">
            Embrace a world of co-ed living: Judgement not included, EVER!
            Premium PGs, co-living, rentals &amp; co-working spaces designed for
            students and working professionals.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {trustItems.map(({ Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur"
              >
                <Icon className="h-4 w-4 text-accent-light" />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-10 flex gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-bold text-white">
                  {s.value}
                </p>
                <p className="text-sm text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Callback form card */}
        <div className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
          <div className="mb-5 text-center">
            <h2 className="font-display text-2xl font-bold text-ink">
              Request A Call Back
            </h2>
            <p className="mt-1 text-sm text-muted">
              Tell us what you need — we&apos;ll find your perfect space.
            </p>
          </div>
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
