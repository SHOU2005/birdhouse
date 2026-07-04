import { Phone } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { getSite } from "@/lib/store/content";

export default async function CTABand() {
  const site = await getSite();
  return (
    <section className="py-16">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-accent/20 blur-2xl" />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Find your perfect space with us!
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/85">
              Talk to our team today and let us match you with a Birdhouse that
              feels like home — zero brokerage, fully furnished, hassle-free.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/contact" variant="onDark" size="lg">
                Request A Call Back
              </Button>
              <a
                href={`tel:${site.phonePrimary}`}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-7 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Phone className="h-5 w-5" />
                {site.phonePrimary}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
