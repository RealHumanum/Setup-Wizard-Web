import { Reveal } from "@/components/Reveal";

const BRANDS = [
  "Yamaha",
  "Ducati",
  "Aprilia",
  "Kawasaki",
  "BMW",
  "Honda",
  "Suzuki",
  "KTM",
];

export function BikeBanner() {
  return (
    <section className="relative px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border-bright)] bg-[var(--color-surface)] p-10 sm:p-14">
            <div
              className="aw-glow size-[420px] bg-[var(--color-primary)]"
              style={{ top: "-40%", right: "-10%", opacity: 0.12 }}
            />
            <div className="relative">
              <h2 className="font-mono text-4xl font-black leading-tight tracking-tight sm:text-5xl">
                <span className="aw-gradient-text">115+</span> Factory Sportbikes
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-text-dim)] sm:text-lg">
                From the 2003 Yamaha R6 to the 2025 Ducati Panigale V4 — two
                decades of sportbike evolution at your fingertips. Every fork,
                every shock and every adjustment range pre-loaded and ready to
                go.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
                {BRANDS.map((b) => (
                  <div
                    key={b}
                    className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]/40 px-4 py-3 text-center font-mono text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--color-text-dim)] transition-colors hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)]"
                  >
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
