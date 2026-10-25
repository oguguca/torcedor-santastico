import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Features } from "@/components/sections/features";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Manifesto } from "@/components/sections/manifesto";
import { RatingDemo } from "@/components/sections/rating-demo";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo">
        <Hero />
        <RatingDemo />
        <Features />
        <HowItWorks />
        <Manifesto />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
