"use client";

import { Fuel, Clock, Weight } from "lucide-react";
import { BentoCard } from "./BentoCard";

// Telemetry numbers — BMW S1000RR scale, 22 min track session at 0.65 L/min.
// Required = 22 * 0.65 ≈ 14.3 L; we round up to a planned 14.5 L (incl. margin).
const TANK_CAPACITY_L = 23;
const REQUIRED_L = 14.5;
const RESERVE_L = 3.5; // reserve band at the bottom of the tank
const FILL_PCT = (REQUIRED_L / TANK_CAPACITY_L) * 100;
const RESERVE_PCT = (RESERVE_L / TANK_CAPACITY_L) * 100;

// Per-lap fuel-remaining model. ~0.78 L per lap → 14.5 → 0.5 after 18 laps.
const LAP_PLAN: { lap: string; remaining: number; reserve?: boolean }[] = [
  { lap: "L1", remaining: 13.7 },
  { lap: "L5", remaining: 10.6 },
  { lap: "L10", remaining: 6.7 },
  { lap: "L15", remaining: 2.8, reserve: true },
];

export function FuelManagerCard() {
  return (
    <BentoCard
      title="Fuel Manager"
      desc="Calculate exact consumption for every session. Log rates per circuit, monitor reserve levels and plan race strategies."
    >
      <div className="aw-bento-graphic relative mt-auto flex flex-1 flex-col gap-3 pt-3">
        {/* Strategy header */}
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
          <span className="flex items-center gap-1.5">
            <Fuel className="size-3 text-[var(--color-primary)]" aria-hidden="true" />
            Race Strategy
          </span>
          <span className="text-[var(--color-text-dim)]">S1000RR · 23L</span>
        </div>

        {/* Horizontal tank-level indicator */}
        <div
          className="relative h-9 w-full overflow-hidden rounded-md border border-[var(--color-border-bright)] bg-[var(--color-surface-2)]"
          role="img"
          aria-label={`Fuel level ${REQUIRED_L} of ${TANK_CAPACITY_L} liters`}
        >
          {/* Reserve zone at left edge of tank (empty end) */}
          <div
            className="absolute inset-y-0 left-0 border-r border-dashed border-[var(--color-warning)]/40 bg-[var(--color-warning)]/10"
            style={{ width: `${RESERVE_PCT}%` }}
            aria-hidden="true"
          />
          {/* Fuel fill — anchored to the right (tank fills from the top/right) */}
          <div
            className="absolute inset-y-0 right-0 bg-gradient-to-l from-[var(--color-primary)]/70 via-[var(--color-primary)]/45 to-[var(--color-primary)]/25"
            style={{ width: `${100 - FILL_PCT}%` }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--color-primary)]/55 via-[var(--color-primary)]/35 to-transparent"
            style={{ width: `${FILL_PCT}%` }}
            aria-hidden="true"
          />
          {/* Tick marks at 25/50/75% */}
          <div className="absolute inset-0 flex" aria-hidden="true">
            <div className="h-full flex-1 border-r border-[var(--color-border)]/60" />
            <div className="h-full flex-1 border-r border-[var(--color-border)]/60" />
            <div className="h-full flex-1 border-r border-[var(--color-border)]/60" />
            <div className="h-full flex-1" />
          </div>
          {/* Readout */}
          <div className="absolute inset-0 flex items-center justify-between px-2.5 font-mono text-[11px] tabular-nums">
            <span className="text-[var(--color-warning)]">RES</span>
            <span className="text-[var(--color-text)]">
              <span className="text-[var(--color-primary)]">{REQUIRED_L.toFixed(1)}</span>
              <span className="text-[var(--color-text-muted)]"> / {TANK_CAPACITY_L} L</span>
            </span>
          </div>
        </div>

        {/* Per-lap fuel-remaining strip */}
        <div className="grid grid-cols-4 gap-1.5">
          {LAP_PLAN.map((entry) => {
            const heightPct = Math.max(8, (entry.remaining / REQUIRED_L) * 100);
            const color = entry.reserve
              ? "var(--color-warning)"
              : "var(--color-primary)";
            return (
              <div
                key={entry.lap}
                className="flex flex-col items-center gap-1 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-2)]/60 p-1.5"
              >
                <div
                  className="relative h-12 w-full overflow-hidden rounded-sm bg-[var(--color-surface)]"
                  aria-hidden="true"
                >
                  <div
                    className="absolute inset-x-0 bottom-0 transition-all"
                    style={{
                      height: `${heightPct}%`,
                      background: `linear-gradient(to top, ${color}, ${color}55)`,
                      boxShadow: `0 0 8px ${color}40`,
                    }}
                  />
                </div>
                <div className="flex w-full items-center justify-between font-mono text-[9px] tabular-nums leading-none">
                  <span className="text-[var(--color-text-muted)]">{entry.lap}</span>
                  <span style={{ color }}>{entry.remaining.toFixed(1)}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Telemetry footer */}
        <div className="mt-auto grid grid-cols-3 gap-2 border-t border-[var(--color-border)] pt-3">
          <Stat
            icon={<Clock className="size-3" aria-hidden="true" />}
            label="DURATION"
            value="22"
            unit="min"
          />
          <Stat
            icon={<Fuel className="size-3" aria-hidden="true" />}
            label="BURN"
            value="0.65"
            unit="L/min"
          />
          <Stat
            icon={<Weight className="size-3" aria-hidden="true" />}
            label="WEIGHT"
            value="10.7"
            unit="kg"
          />
        </div>
      </div>
    </BentoCard>
  );
}

function Stat({
  icon,
  label,
  value,
  unit,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
        <span className="text-[var(--color-primary)]">{icon}</span>
        {label}
      </span>
      <span className="font-mono text-sm tabular-nums text-[var(--color-text)]">
        {value}
        <span className="ml-1 text-[10px] text-[var(--color-text-dim)]">{unit}</span>
      </span>
    </div>
  );
}
