import {
  Wrench,
  CircleDot,
  Warehouse,
  Stethoscope,
  Flag,
  Fuel,
  ChartLine,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";

const FEATURES = [
  { icon: Wrench, title: "Setup Troubleshooter", desc: "Symptom-driven diagnostics that output localized clicker and preload adjustments across all four corner sectors." },
  { icon: CircleDot, title: "Tire Manager", desc: "Log heat-cycles, wear patterns and pressure targets. Track make, model, compound and custom hot/cold baselines." },
  { icon: Warehouse, title: "Garage", desc: "Centralized multi-bike registry. Manage chassis geometry, component specs and OEM baselines for 115+ factory models." },
  { icon: Stethoscope, title: "Service Hub", desc: "Lifecycle tracking for critical components. Monitor maintenance intervals and fluid degradation by real track mileage." },
  { icon: Flag, title: "Track Log", desc: "Advanced session logbook. Record lap times, weather and setup data — high-fidelity history for every circuit." },
  { icon: Fuel, title: "Fuel Manager", desc: "Calculate exact consumption for every session. Log rates per circuit and plan race strategies." },
  { icon: ChartLine, title: "Performance Analytics", desc: "Compare setups and visualize ride feel — agility, stability and chassis-balance scores across your history." },
];

export function Features() {
  return (
    <section id="features" className="relative px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          tag="Powerful Intelligence"
          title={<>Engineering-Grade Precision.</>}
          sub="Eliminate paper notes and guesswork with a professional engineering suite built for performance."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <Card className="h-full transition-colors hover:border-[var(--color-border-bright)]">
                <CardHeader>
                  <f.icon className="size-7 text-[var(--color-primary)]" />
                  <CardTitle className="mt-2">{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[var(--color-text-dim)]">{f.desc}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
