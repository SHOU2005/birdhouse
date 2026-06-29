import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Section, Container } from "@/components/ui/Section";
import LegalContent from "@/components/LegalContent";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms governing your use of Birdhouse's website and services.",
};

const sections = [
  {
    heading: "Acceptance of Terms",
    body: [
      `By accessing and using the ${site.legalName} website, you agree to be bound by these Terms & Conditions and our Privacy Policy.`,
    ],
  },
  {
    heading: "Use of the Website",
    body: [
      "The content on this website is for general information about our accommodation and services. Property details, availability and pricing are indicative and subject to change without notice.",
    ],
  },
  {
    heading: "Bookings & Payments",
    body: [
      "Any booking is subject to availability and confirmation by our team. Security deposits, rent and applicable charges are communicated upfront. We charge zero brokerage.",
    ],
  },
  {
    heading: "Enquiries",
    body: [
      "When you submit an enquiry, you consent to being contacted by our team via phone, email or messaging regarding your request.",
    ],
  },
  {
    heading: "Limitation of Liability",
    body: [
      "Birdhouse is not liable for any indirect or consequential loss arising from the use of this website. We strive to keep information accurate but make no warranties as to its completeness.",
    ],
  },
  {
    heading: "Contact",
    body: [
      `For questions about these Terms, contact us at ${site.email} or ${site.phonePrimary}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms & Conditions" crumbs={[{ label: "Terms & Conditions" }]} />
      <Section>
        <Container>
          <LegalContent sections={sections} updated="June 2026" />
        </Container>
      </Section>
    </>
  );
}
