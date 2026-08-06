import type { Metadata } from "next";
import { TftHeader } from "@/components/TftHeader";
import { Features } from "@/components/sections/Features";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { BikeBanner } from "@/components/sections/BikeBanner";
import { Cta } from "@/components/sections/Cta";
import { JsonLd } from "@/components/JsonLd";
import { appJsonLd } from "@/lib/schema";
import { BIKE_COUNT } from "@/lib/bikes";

export const metadata: Metadata = {
  description: `Free motorcycle suspension logbook and symptom-based setup troubleshooter. Log clickers and sag, diagnose by corner phase, ${BIKE_COUNT} factory sportbikes.`,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <JsonLd data={appJsonLd} />
      <TftHeader />
      <Features />
      <BeforeAfter />
      <HowItWorks />
      <BikeBanner />
      <Cta />
    </main>
  );
}
