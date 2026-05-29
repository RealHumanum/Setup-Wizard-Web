import { Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";

const BEFORE = [
  "Scribbled notes on paper that get lost",
  "Forgetting which clicker changes you made last session",
  "Guessing which setup was your fastest",
  "No idea if your sag is actually right",
  "Missed service intervals on forks and shocks",
];

const AFTER = [
  "Every clicker, every preload — saved digitally forever",
  "Instant comparison of any two setups",
  "Expert logic engine tells you exactly what to change",
  "Auto-calculated sag and dynamics scores",
  "Service health bars warn you before it's too late",
];

export function BeforeAfter() {
  return (
    <section className="relative px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          tag="Why Apex Wizard?"
          title={<>From Chaos to <span className="aw-gradient-text">Precision.</span></>}
        />
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <Card
              className="h-full p-6 border-[var(--color-danger)]"
              style={{ boxShadow: "0 0 40px -12px var(--color-danger)" }}
            >
              <p className="mb-4 flex items-center gap-2 font-bold text-[var(--color-danger)]">
                <X className="size-5" /> Without Apex Wizard
              </p>
              <ul className="space-y-3 text-sm text-[var(--color-text-dim)]">
                {BEFORE.map((t) => (
                  <li key={t} className="flex gap-2">
                    <X className="mt-0.5 size-4 shrink-0 text-[var(--color-danger)]" />
                    {t}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card
              className="h-full p-6 border-[var(--color-border-bright)]"
              style={{ boxShadow: "0 0 40px -12px var(--color-primary)" }}
            >
              <p className="mb-4 flex items-center gap-2 font-bold text-[var(--color-primary)]">
                <Check className="size-5" /> With Apex Wizard
              </p>
              <ul className="space-y-3 text-sm text-[var(--color-text)]">
                {AFTER.map((t) => (
                  <li key={t} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-[var(--color-primary)]" />
                    {t}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
