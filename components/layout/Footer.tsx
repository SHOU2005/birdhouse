import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { Instagram, Facebook, Linkedin, XTwitter } from "@/components/SocialIcons";
import Logo from "@/components/Logo";
import { getSite } from "@/lib/store/content";

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "PG & Rentals by Locality", href: "/pg" },
  { label: "Broker Partnership Program", href: "/broker-partnership" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const locationLinks = [
  { label: "New Delhi", href: "/cities/new-delhi" },
  { label: "Gurgaon", href: "/cities/gurgaon" },
];

export default async function Footer() {
  const site = await getSite();
  const socials = [
    { Icon: Instagram, href: site.socials.instagram, label: "Instagram" },
    { Icon: Facebook, href: site.socials.facebook, label: "Facebook" },
    { Icon: Linkedin, href: site.socials.linkedin, label: "LinkedIn" },
    { Icon: XTwitter, href: site.socials.twitter, label: "X (Twitter)" },
  ];

  return (
    <footer className="bg-primary-dark text-white/80">
      <div className="container-bh py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo light />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
              Birdhouse is an organization providing accommodation and
              customizable living options — one of the fastest growing living
              space providers in India.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent-light hover:text-primary-dark"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-display text-base font-semibold text-white">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-accent-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-base font-semibold text-white">
              Locations
            </h3>
            <ul className="space-y-2.5 text-sm">
              {locationLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-accent-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-base font-semibold text-white">
              Get In Touch
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent-light" />
                <span>{site.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent-light" />
                <span>
                  <a href={`tel:${site.phonePrimary}`} className="hover:text-accent-light">
                    {site.phonePrimary}
                  </a>
                  {", "}
                  <a href={`tel:${site.phoneSecondary}`} className="hover:text-accent-light">
                    {site.phoneSecondary}
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent-light" />
                <a href={`mailto:${site.email}`} className="hover:text-accent-light">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-bh flex flex-col items-center justify-between gap-2 py-5 text-sm text-white/60 sm:flex-row">
          <p>© 2026 Birdhouse. All Rights Reserved.</p>
          <p className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-accent-light">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-accent-light">
              Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
