import { Check, X } from "lucide-react";
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
    <section id="before-after" className="relative px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          tag="Why Apex Wizard?"
          title={
            <>
              From Chaos to <span className="text-[var(--color-primary)]">Precision.</span>
            </>
          }
        />
        <div className="grid gap-6 md:grid-cols-2">
          {/* Without */}
          <Reveal>
            <div className="group relative h-full overflow-hidden rounded-lg border border-[var(--color-border)] border-l-2 border-l-[var(--color-danger)] bg-[var(--color-surface)] p-8 transition-colors">
              <div className="relative">
                <div className="mb-6 inline-flex items-center gap-2 rounded-sm text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--color-danger)]">
                  <X className="size-3.5" /> Without Apex Wizard
                </div>
                <ul className="space-y-4">
                  {BEFORE.map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--color-text-dim)]"
                    >
                      <X className="mt-1 size-4 shrink-0 text-[var(--color-danger)]" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* With */}
          <Reveal delay={0.1}>
            <div className="group relative h-full overflow-hidden rounded-lg border border-[var(--color-border)] border-l-2 border-l-[var(--color-primary)] bg-[var(--color-surface)] p-8 transition-colors">
              <div className="relative">
                <div className="mb-6 inline-flex items-center gap-2 rounded-sm text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--color-primary)]">
                  <Check className="size-3.5" /> With Apex Wizard
                </div>
                <ul className="space-y-4">
                  {AFTER.map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-3 text-[15px] leading-relaxed text-white"
                    >
                      <Check className="mt-1 size-4 shrink-0 text-[var(--color-primary)]" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
