import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import Benefits from "@/components/home/Benefits";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Amenities from "@/components/home/Amenities";
import Gallery from "@/components/home/Gallery";
import Testimonials from "@/components/home/Testimonials";
import LatestBlogs from "@/components/home/LatestBlogs";
import FAQ from "@/components/home/FAQ";
import CTABand from "@/components/CTABand";
import { OrganizationJsonLd } from "@/components/JsonLd";

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <Hero />
      <Categories />
      <FeaturedProperties />
      <Benefits />
      <WhyChooseUs />
      <Amenities />
      <Gallery />
      <Testimonials />
      <CTABand />
      <LatestBlogs />
      <FAQ />
    </>
  );
}
