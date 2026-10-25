import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { MatchCycle } from "@/components/sections/match-cycle";
import { MatchResult } from "@/components/sections/match-result";
import { MatchRoom } from "@/components/sections/match-room";
import { PillarsStrip } from "@/components/sections/pillars-strip";
import { RoomRules } from "@/components/sections/room-rules";
import { SeasonSpotlight } from "@/components/sections/season-spotlight";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo">
        <Hero />
        <PillarsStrip />
        <MatchCycle />
        <MatchRoom />
        <MatchResult />
        <SeasonSpotlight />
        <RoomRules />
        <Manifesto />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
