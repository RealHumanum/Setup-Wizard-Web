import { Reveal } from "@/components/Reveal";

const BRANDS = ["Yamaha", "Ducati", "Aprilia", "Kawasaki", "BMW", "Honda", "Suzuki", "KTM"];

export function BikeBanner() {
  return (
    <section className="relative px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="rounded-3xl border border-[var(--color-border-bright)] bg-[var(--color-surface)] p-8 sm:p-12">
            <h2 className="font-mono text-3xl font-extrabold sm:text-4xl">
              <span className="aw-gradient-text">115+</span> Factory Sportbikes
            </h2>
            <p className="mt-4 max-w-2xl text-[var(--color-text-dim)]">
              From the 2003 Yamaha R6 to the 2025 Ducati Panigale V4 — two decades of
              sportbike evolution at your fingertips. Every fork, every shock and every
              adjustment range pre-loaded and ready to go.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm uppercase tracking-widest text-[var(--color-text-muted)]">
              {BRANDS.map((b) => (
                <span key={b}>{b}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
