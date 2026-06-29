import type { Metadata } from "next";
import { Target, Eye, Building2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Section, Container } from "@/components/ui/Section";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Amenities from "@/components/home/Amenities";
import CTABand from "@/components/CTABand";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Founded in 2016 in Gurgaon, Birdhouse Shelter redefines accommodation for students and working professionals — comfortable, affordable, community-focused living across India.",
};

const stats = [
  { value: "2016", label: "Founded" },
  { value: "4", label: "Cities" },
  { value: "500+", label: "Residents" },
  { value: "₹0", label: "Brokerage" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Welcome To Birdhouse"
        subtitle="Founded with a vision to redefine the landscape of living spaces — spaces that transcend the ordinary."
        crumbs={[{ label: "About Us" }]}
      />

      {/* Where it started */}
      <Section>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <span className="inline-block rounded-full bg-primary-50 px-4 py-1 text-sm font-semibold text-primary">
                Where It Started?
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
                Your requirement ends here!
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                Founded with a vision to redefine the landscape of living
                spaces, our real estate company emerged from a passion for
                creating spaces that transcend the ordinary. Established in
                <strong className="text-ink"> 2016</strong>, we take pride in our
                roots and the community spirit that inspired our inception. Born
                in Gurgaon, our journey began with a commitment to crafting
                spaces that embody innovation, elegance, and the unique essence
                of the locale.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                As we continue to grow, our foundation remains deeply rooted in
                the values of integrity, quality and customer satisfaction. Join
                us on this exciting journey as we shape the future of real estate
                in prime locations — where every home tells a story of quality
                craftsmanship and a commitment to a better way of living.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-line bg-surface p-6 text-center"
                  >
                    <p className="font-display text-4xl font-bold text-primary">
                      {s.value}
                    </p>
                    <p className="mt-1 text-sm text-muted">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* About Birdhouse */}
      <Section className="bg-surface">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1 text-sm font-semibold text-primary">
              <Building2 className="h-4 w-4" /> About Birdhouse
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
              Find your perfect space with us!
            </h2>
            <p className="mt-5 leading-relaxed text-muted">
              Welcome to Birdhouse Shelter, where dreams find their perfect nest!
              As a premier real estate company, Birdhouse Shelter is dedicated to
              transforming your vision of a dream home into reality. Nestled at
              the intersection of innovation and reliability, we specialize in
              crafting spaces that redefine the concept of modern living. We
              understand that a home is more than just bricks and mortar; it&apos;s
              a sanctuary where memories are created and aspirations come to life.
              With a commitment to excellence, integrity and personalized service,
              we guide you through every step of your real estate journey.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-line bg-white p-8 shadow-[var(--shadow-card)]">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-white">
                  <Target className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-ink">
                  Our Mission
                </h3>
                <p className="mt-2 leading-relaxed text-muted">
                  To redefine accommodation for working professionals and
                  students, offering a unique living experience that goes beyond
                  mere housing. We are committed to providing a supportive and
                  inclusive environment, fostering collaboration and community
                  among our residents. By creating shared spaces such as
                  communal kitchens and recreational areas, we encourage social
                  interactions and meaningful connections.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl border border-line bg-white p-8 shadow-[var(--shadow-card)]">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-white">
                  <Eye className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-ink">
                  Our Vision
                </h3>
                <p className="mt-2 leading-relaxed text-muted">
                  Our vision extends beyond affordable and budget-friendly
                  housing. Birdhouse Shelter is founded on principles of
                  sustainability and accessibility, integrating eco-friendly
                  features into our architecture. We strategically choose
                  locations with proximity to educational institutions and
                  workplaces to enhance convenience for our residents.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <WhyChooseUs />
      <Amenities />
      <CTABand />
    </>
  );
}
