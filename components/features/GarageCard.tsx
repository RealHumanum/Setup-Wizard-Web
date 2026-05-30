"use client";

import { BentoCard } from "./BentoCard";

type Bike = {
  year: string;
  name: string;
  code: string;
  letter: string;
  color: string;
  badge?: string;
  active?: boolean;
};

const BIKES: Bike[] = [
  {
    year: "2023",
    name: "Ducati Panigale V4",
    code: "PV4-23",
    letter: "D",
    color: "oklch(60% 0.22 25)",
  },
  {
    year: "2024",
    name: "BMW S1000RR",
    code: "S1K-24",
    letter: "B",
    color: "oklch(58% 0.18 245)",
    badge: "Misano Q-Run",
    active: true,
  },
  {
    year: "2025",
    name: "Yamaha YZF-R1M",
    code: "R1M-25",
    letter: "Y",
    color: "oklch(62% 0.18 220)",
  },
  {
    year: "2022",
    name: "Kawasaki ZX-10R",
    code: "ZX10-22",
    letter: "K",
    color: "oklch(72% 0.2 145)",
  },
  {
    year: "2024",
    name: "Aprilia RSV4 Factory",
    code: "RSV-24",
    letter: "A",
    color: "oklch(62% 0.21 28)",
  },
  {
    year: "2023",
    name: "Honda CBR1000RR-R",
    code: "CBR-23",
    letter: "H",
    color: "oklch(60% 0.23 22)",
  },
];

export function GarageCard() {
  return (
    <BentoCard
      title="Garage"
      desc="Centralized multi-bike registry. Manage chassis geometry, component specs and OEM baselines for 115+ factory models."
    >
      <div className="mt-auto flex flex-1 flex-col gap-3 pt-4">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
          <span>6 bikes in garage</span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block size-1.5 rounded-full bg-[var(--color-primary)] shadow-[0_0_6px_var(--color-primary)]"
              aria-hidden="true"
            />
            <span className="text-[var(--color-primary)]">
              active: BMW S1000RR
            </span>
          </span>
        </div>

        <ul className="flex flex-1 flex-col gap-2">
          {BIKES.map((bike) => {
            const isActive = bike.active;
            const badgeText = bike.badge
              ? `${bike.code} · ${bike.badge}`
              : bike.code;
            return (
              <li
                key={bike.code}
                className={
                  "relative flex items-center gap-3 rounded-xl border px-3 py-2 transition " +
                  (isActive
                    ? "border-[var(--color-primary)]/60 bg-[var(--color-primary)]/[0.06] shadow-[0_0_18px_-6px_var(--color-primary)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface-2)]")
                }
              >
                {isActive ? (
                  <span
                    className="absolute left-0 top-1/2 h-6 w-[2px] -translate-y-1/2 rounded-r-full bg-[var(--color-primary)]"
                    aria-hidden="true"
                  />
                ) : null}

                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1 font-mono text-sm font-bold"
                  style={{
                    backgroundColor: `color-mix(in oklch, ${bike.color} 12%, transparent)`,
                    color: bike.color,
                    boxShadow: `inset 0 0 0 1px color-mix(in oklch, ${bike.color} 40%, transparent)`,
                  }}
                  aria-hidden="true"
                >
                  {bike.letter}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
                      {bike.year}
                    </span>
                    <span
                      className={
                        "truncate text-sm font-semibold " +
                        (isActive
                          ? "text-[var(--color-text)]"
                          : "text-[var(--color-text-dim)]")
                      }
                    >
                      {bike.name}
                    </span>
                  </div>
                </div>

                <span
                  className={
                    "shrink-0 rounded-sm px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider " +
                    (isActive
                      ? "bg-[var(--color-primary)]/15 text-[var(--color-primary)]"
                      : "bg-[var(--color-border)]/40 text-[var(--color-text-muted)]")
                  }
                >
                  {badgeText}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </BentoCard>
  );
}
