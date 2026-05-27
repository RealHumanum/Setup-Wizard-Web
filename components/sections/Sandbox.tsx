import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { TroubleshooterWidget } from "@/components/TroubleshooterWidget";
import { FuelWizardWidget } from "@/components/FuelWizardWidget";
import { SagCalculatorWidget } from "@/components/SagCalculatorWidget";
import { GeometryWidget } from "@/components/GeometryWidget";

export function Sandbox() {
  return (
    <section id="sandbox" className="relative px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          tag="Live Sandbox"
          title={<>Test the Engines in Your <span className="aw-gradient-text">Browser.</span></>}
          sub="Every calculation runs 100% client-side — no data ever leaves your device. Set your units above, then dial in a setup."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal><TroubleshooterWidget /></Reveal>
          <Reveal delay={0.05}><FuelWizardWidget /></Reveal>
          <Reveal delay={0.1}><SagCalculatorWidget /></Reveal>
          <Reveal delay={0.15}><GeometryWidget /></Reveal>
        </div>
      </div>
    </section>
  );
}
