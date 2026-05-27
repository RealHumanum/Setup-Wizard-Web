import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";

const STEPS = [
  { n: "01", title: "Add Your Bike", desc: "Pick from 115+ factory sportbikes or build a custom profile. Define every adjustment range your suspension offers." },
  { n: "02", title: "Log Your Setup", desc: "Record every clicker position, preload setting, sag measurement and tire pressure before you roll onto the track." },
  { n: "03", title: "Diagnose & Improve", desc: "Use the Troubleshooter or compare sessions with analytics. Know exactly what to change and why." },
];

export function HowItWorks() {
  return (
    <section className="relative px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          tag="How It Works"
          title={<>Three Steps to <span className="aw-gradient-text">Your Fastest Lap.</span></>}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <span className="font-mono text-4xl font-extrabold text-[var(--color-primary-dim)]">
                  {s.n}
                </span>
                <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-text-dim)]">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
