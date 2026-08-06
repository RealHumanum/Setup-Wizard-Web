import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { BIKE_COUNT } from "@/lib/bikes";

const STEPS = [
  {
    n: "01",
    title: "Add Your Bike",
    desc: `Pick from ${BIKE_COUNT} factory sportbikes or build a custom profile. Define every adjustment range your suspension offers.`,
  },
  {
    n: "02",
    title: "Log Your Setup",
    desc: "Record every clicker position, preload setting, sag measurement and tire pressure before you roll onto the track.",
  },
  {
    n: "03",
    title: "Diagnose & Improve",
    desc: "Use the Troubleshooter or compare sessions with analytics. Know exactly what to change and why.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          tag="How It Works"
          title={
            <>
              Three Steps to{" "}
              <span className="text-[var(--color-primary)]">Your Fastest Lap.</span>
            </>
          }
        />

        <div className="relative grid gap-6 md:grid-cols-3">
          <div className="pointer-events-none absolute inset-x-12 top-12 hidden h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/30 to-transparent md:block" />

          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-8 transition-all hover:-translate-y-1 hover:border-[var(--color-border-bright)]">
                <div className="pointer-events-none absolute -top-12 -right-8 select-none font-mono text-[7rem] font-black leading-none text-[var(--color-primary)]/[0.05]">
                  {s.n}
                </div>
                <div className="relative">
                  <span className="inline-flex size-12 items-center justify-center rounded-md border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 font-mono text-base font-extrabold text-[var(--color-primary)]">
                    {s.n}
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold leading-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-dim)]">
                    {s.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
