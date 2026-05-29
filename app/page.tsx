import type { Metadata } from "next";
import { TftHeader } from "@/components/TftHeader";
import { Features } from "@/components/sections/Features";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { BikeBanner } from "@/components/sections/BikeBanner";
import { Cta } from "@/components/sections/Cta";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <TftHeader />
      <Features />
      <BeforeAfter />
      <HowItWorks />
      <Testimonials />
      <BikeBanner />
      <Cta />
    </main>
  );
}
