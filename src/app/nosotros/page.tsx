import type { Metadata } from "next";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { AboutHero } from "@/components/about/about-hero";
import { AboutManifesto } from "@/components/about/about-manifesto";
import { AboutMaxims } from "@/components/about/about-maxims";
import { AboutPrinciples } from "@/components/about/about-principles";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Quiénes somos y en qué creemos: un diario sobre moda lenta, materiales con criterio y una forma de vestir más consciente.",
};

export default function NosotrosPage() {
  return (
    <>
      <SiteHeader overlay tone="dark" />

      <main className="flex-1 bg-cream">
        <AboutHero />
        <AboutManifesto />
        <AboutMaxims />
        <AboutPrinciples />
        {/*<AboutPillars />*/}
        {/*<AboutHistory />*/}
        {/*<AboutStats />
        <AboutTeam />
        <AboutCta />*/}
      </main>

      <SiteFooter />
    </>
  );
}
