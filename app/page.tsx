import { TftHeader } from "@/components/TftHeader";
import { PitLaneChecklist } from "@/components/PitLaneChecklist";
import { Sandbox } from "@/components/sections/Sandbox";
import { Features } from "@/components/sections/Features";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { BikeBanner } from "@/components/sections/BikeBanner";
import { Patreon } from "@/components/sections/Patreon";
import { Cta } from "@/components/sections/Cta";

export default function Home() {
  return (
    <main>
      <TftHeader />
      <Sandbox />
      <PitLaneChecklist />
      <Features />
      <BeforeAfter />
      <HowItWorks />
      <Testimonials />
      <BikeBanner />
      <Patreon />
      <Cta />
    </main>
  );
}
