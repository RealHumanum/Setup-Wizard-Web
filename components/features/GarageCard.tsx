"use client";

import { BentoCard } from "./BentoCard";

type Bike = {
  year: string;
  name: string;
  code: string;
  badge: string;
  active?: boolean;
};

const BIKES: Bike[] = [
  {
    year: "2023",
    name: "Ducati Panigale V4",
    code: "PV4-23",
    badge: "SUPERBIKE",
  },
  {
    year: "2024",
    name: "BMW S1000RR",
    code: "S1K-24",
    badge: "Misano Q-Run",
    active: true,
  },
  {
    year: "2025",
    name: "Yamaha YZF-R1",
    code: "R1M-25",
    badge: "TRACK ONLY",
  },
];

function SportbikeSilhouette() {
  return (
    <svg
      viewBox="0 0 200 80"
      className="h-8 w-16 shrink-0"
      aria-hidden="true"
    >
      <circle
        cx="40"
        cy="60"
        r="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      <circle
        cx="160"
        cy="60"
        r="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M40,60 L70,40 L120,28 L150,40 L160,60"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M150,40 L170,20 L185,28"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M70,40 L55,28"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function GarageCard() {
  return (
    <BentoCard
      title="Garage"
      desc="Centralized multi-bike registry. Manage chassis geometry, component specs and OEM baselines for 115+ factory models."
    >
      <div className="mt-auto flex flex-col gap-3 pt-4">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
          <span>3 bikes in garage</span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block size-1.5 rounded-full bg-[var(--color-primary)] shadow-[0_0_6px_var(--color-primary)]"
              aria-hidden="true"
            />
            <span className="text-[var(--color-primary)]">active</span>
          </span>
        </div>

        <ul className="flex flex-col gap-2">
          {BIKES.map((bike) => {
            const isActive = bike.active;
            return (
              <li
                key={bike.code}
                className={
                  "relative flex items-center gap-3 rounded-xl border px-3 py-2.5 transition " +
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
                  className={
                    "flex h-10 w-16 shrink-0 items-center justify-center rounded-md border " +
                    (isActive
                      ? "border-[var(--color-primary)]/40 bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                      : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-dim)]")
                  }
                >
                  <SportbikeSilhouette />
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
                  <div className="mt-0.5 flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                      {bike.code}
                    </span>
                    <span
                      className={
                        "rounded-sm px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider " +
                        (isActive
                          ? "bg-[var(--color-primary)]/15 text-[var(--color-primary)]"
                          : "bg-[var(--color-border)]/40 text-[var(--color-text-muted)]")
                      }
                    >
                      {bike.badge}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </BentoCard>
  );
}
