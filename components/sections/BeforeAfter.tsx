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
              From Chaos to <span className="aw-gradient-text">Precision.</span>
            </>
          }
        />
        <div className="grid gap-6 md:grid-cols-2">
          {/* Without — red glow */}
          <Reveal>
            <div className="group relative h-full overflow-hidden rounded-3xl border border-[var(--color-danger)]/40 bg-[var(--color-surface)] p-8 shadow-[0_0_40px_-12px_var(--color-danger)] backdrop-blur transition-colors">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_60%_at_0%_0%,oklch(63%_0.22_25/0.08),transparent_60%)]" />
              <div className="relative">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[var(--color-danger)]">
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

          {/* With — green glow */}
          <Reveal delay={0.1}>
            <div className="group relative h-full overflow-hidden rounded-3xl border border-[var(--color-border-bright)] bg-[var(--color-surface)] p-8 shadow-[0_0_40px_-12px_var(--color-primary)] backdrop-blur transition-colors">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_60%_at_0%_0%,oklch(78%_0.2_152/0.08),transparent_60%)]" />
              <div className="relative">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[var(--color-primary)]">
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
