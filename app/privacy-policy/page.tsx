import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Section, Container } from "@/components/ui/Section";
import LegalContent from "@/components/LegalContent";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Birdhouse collects, uses and protects your information.",
};

const sections = [
  {
    heading: "Introduction",
    body: [
      `This Privacy Policy explains how ${site.legalName} ("Birdhouse", "we", "us") collects, uses and protects the information you provide when you use our website or services.`,
    ],
  },
  {
    heading: "Information We Collect",
    body: [
      "We collect information you provide directly — such as your name, contact number, email address, preferred location, property type and budget — when you submit an enquiry or request a call back.",
      "We may also collect limited technical data such as your browser type and pages visited to improve our website.",
    ],
  },
  {
    heading: "How We Use Your Information",
    body: [
      "We use your information to respond to your enquiries, match you with suitable accommodation, process bookings and communicate updates about our services.",
      "We do not sell your personal information to third parties.",
    ],
  },
  {
    heading: "Data Security",
    body: [
      "We take reasonable measures to protect your information against unauthorised access, alteration or disclosure.",
    ],
  },
  {
    heading: "Contact Us",
    body: [
      `If you have any questions about this Privacy Policy, please contact us at ${site.email} or call ${site.phonePrimary}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" crumbs={[{ label: "Privacy Policy" }]} />
      <Section>
        <Container>
          <LegalContent sections={sections} updated="June 2026" />
        </Container>
      </Section>
    </>
  );
}
