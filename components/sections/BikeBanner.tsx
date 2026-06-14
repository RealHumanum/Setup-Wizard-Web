import Image from "next/image";
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
          <div className="relative grid overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] md:grid-cols-[1.35fr_1fr]">
            <div className="order-2 p-10 sm:p-14 md:order-1">
              <h2 className="font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl">
                <span className="text-[var(--color-primary)]">115+</span> Factory
                Sportbikes
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
                    className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg)]/40 px-4 py-3 text-center font-mono text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--color-text-dim)] transition-colors hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)]"
                  >
                    {b}
                  </div>
                ))}
              </div>
            </div>

            {/* Photo side — green sportbike ties to the brand accent */}
            <div className="relative order-1 min-h-[240px] md:order-2 md:min-h-0">
              <Image
                src="/assets/sportbike-green.jpg"
                alt="Kawasaki Ninja sportbike on a back road"
                fill
                unoptimized
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-center"
              />
              {/* Soft seam blend into the surface (left on desktop, top on mobile) */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-transparent to-[var(--color-surface)] md:bg-gradient-to-r"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
