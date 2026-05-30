"use client";

import { BentoCard } from "./BentoCard";

// Tire Manager card — three stacked pieces:
//   A) horizontal tread cross-section showing INSIDE / CENTER / OUTSIDE zones
//      (shoulders run hotter than the centre — real cornering thermals)
//   B) inline SVG heat-cycle line chart with operating-window band and an
//      animated "current lap" cursor sweeping the session
//   C) compact spec strip (pressure / compound / cycle)
// Pure CSS animation, no JS state, no effects.
export function TireManagerCard() {
  // --- Chart geometry (viewBox units) ---
  const W = 220;
  const H = 70;
  const PADL = 4;
  const PADR = 4;
  const PADT = 4;
  const PADB = 8;
  const chartW = W - PADL - PADR;
  const chartH = H - PADT - PADB;

  // Temperature scale: 20 °C (bottom) → 120 °C (top)
  const TMIN = 20;
  const TMAX = 120;
  const tempY = (t: number) => PADT + (1 - (t - TMIN) / (TMAX - TMIN)) * chartH;

  // 18-lap session: cold start, steep warm-up, plateau in 90–105 °C, slight cool-down
  const laps: number[] = [
    30, // L0 paddock
    58, // L1 out-lap
    82, // L2 warm-up
    93, // L3
    99, // L4 plateau start
    102, // L5
    104, // L6
    103, // L7
    105, // L8
    104, // L9
    102, // L10
    103, // L11
    101, // L12
    102, // L13
    100, // L14
    97, // L15 cool-down begins
    90, // L16
    82, // L17 in-lap
  ];
  const lapX = (i: number) => PADL + (i / (laps.length - 1)) * chartW;

  const pathD = laps
    .map((t, i) => `${i === 0 ? "M" : "L"} ${lapX(i).toFixed(2)} ${tempY(t).toFixed(2)}`)
    .join(" ");

  // Operating-window band (80–110 °C)
  const bandTop = tempY(110);
  const bandBottom = tempY(80);
  const bandH = bandBottom - bandTop;

  return (
    <BentoCard
      title="Tire Manager"
      desc="Log heat-cycles, wear patterns and pressure targets. Sync with global track databases for precise cold/hot baseline settings."
    >
      <style>{`
        @keyframes aw-tm-shoulder {
          0%, 100% { opacity: 0.85; }
          50%      { opacity: 1; }
        }
        @keyframes aw-tm-cursor {
          0%   { transform: translateX(0); }
          100% { transform: translateX(${chartW}px); }
        }
        @keyframes aw-tm-livedot {
          0%, 100% { opacity: 0.55; }
          50%      { opacity: 1; }
        }
        .aw-tm-shoulder { animation: aw-tm-shoulder 2.4s ease-in-out infinite; }
        .aw-tm-cursor   { animation: aw-tm-cursor 6s linear infinite; transform-box: fill-box; }
        .aw-tm-livedot  { animation: aw-tm-livedot 1.8s ease-in-out infinite; }
      `}</style>

      <div className="flex flex-1 flex-col gap-4">
        {/* Status strip */}
        <div className="mt-1 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="aw-tm-livedot inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]"
              style={{ boxShadow: "0 0 8px var(--color-primary)" }}
            />
            <span className="tabular-nums">Live · Corner 12</span>
          </span>
          <span className="rounded-md border border-[var(--color-border-bright)] bg-[var(--color-surface-2)] px-2 py-[3px] tabular-nums tracking-wider text-[var(--color-text-dim)]">
            REAR · SOFT
          </span>
        </div>

        {/* A. 3-zone temperature readout */}
        <div
          role="img"
          aria-label="Rear tire temperature: inside shoulder 95 degrees, center 88 degrees, outside shoulder 108 degrees"
          className="rounded-xl border border-[var(--color-border-bright)] bg-[var(--color-surface-2)] p-3"
        >
          <div className="mb-2 flex items-center justify-between font-mono text-[0.55rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            <span>Tread Section</span>
            <span className="tabular-nums text-[var(--color-text-dim)]">°C</span>
          </div>
          <div className="flex items-end gap-2" aria-hidden="true">
            <TreadZone label="INSIDE" tempC={95} />
            <TreadZone label="CENTER" tempC={88} />
            <TreadZone label="OUTSIDE" tempC={108} pulse />
          </div>
        </div>

        {/* B. Heat-cycle line chart */}
        <div className="rounded-xl border border-[var(--color-border-bright)] bg-[var(--color-surface-2)] p-3">
          <div className="mb-1 flex items-center justify-between font-mono text-[0.55rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            <span>Session Thermal Trace</span>
            <span className="tabular-nums text-[var(--color-text-dim)]">20 – 120 °C</span>
          </div>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            role="img"
            aria-label="Tire temperature across 18 laps: cold start, warm-up, plateau in operating window, cool-down"
            className="block h-[88px] w-full overflow-visible"
          >
            {/* Operating window band 80–110 °C */}
            <rect
              x={PADL}
              y={bandTop}
              width={chartW}
              height={bandH}
              fill="var(--color-primary)"
              opacity={0.12}
              aria-hidden="true"
            />
            {/* Band edge lines */}
            <line
              x1={PADL}
              x2={PADL + chartW}
              y1={bandTop}
              y2={bandTop}
              stroke="var(--color-primary)"
              strokeWidth={0.4}
              strokeDasharray="2 2"
              opacity={0.45}
              aria-hidden="true"
            />
            <line
              x1={PADL}
              x2={PADL + chartW}
              y1={bandBottom}
              y2={bandBottom}
              stroke="var(--color-primary)"
              strokeWidth={0.4}
              strokeDasharray="2 2"
              opacity={0.45}
              aria-hidden="true"
            />

            {/* Trace curve */}
            <path
              d={pathD}
              fill="none"
              stroke="var(--color-text)"
              strokeWidth={1.2}
              strokeLinejoin="round"
              strokeLinecap="round"
              aria-hidden="true"
            />

            {/* Lap dots */}
            {laps.map((t, i) => {
              const inWindow = t >= 80 && t <= 110;
              const hot = t > 105;
              const color = hot
                ? "var(--color-warning)"
                : inWindow
                  ? "var(--color-primary)"
                  : "oklch(70% 0.18 250)";
              return (
                <circle
                  key={i}
                  cx={lapX(i)}
                  cy={tempY(t)}
                  r={1.2}
                  fill={color}
                  aria-hidden="true"
                />
              );
            })}

            {/* Animated current-lap cursor */}
            <g className="aw-tm-cursor" aria-hidden="true">
              <line
                x1={PADL}
                x2={PADL}
                y1={PADT}
                y2={PADT + chartH}
                stroke="var(--color-text)"
                strokeWidth={0.8}
                opacity={0.85}
              />
              <circle
                cx={PADL}
                cy={PADT + chartH * 0.5}
                r={1.6}
                fill="var(--color-text)"
                opacity={0.9}
              />
            </g>
          </svg>
          <div className="mt-1 flex items-center justify-between font-mono text-[0.55rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            <span className="tabular-nums">HEAT CYCLE · L7 / 18</span>
            <span className="inline-flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-3 rounded-sm"
                style={{ background: "var(--color-primary)", opacity: 0.35 }}
              />
              <span className="tabular-nums">OP. 80 – 110</span>
            </span>
          </div>
        </div>

        {/* C. Spec strip */}
        <div className="mt-auto flex items-stretch gap-2 font-mono text-[0.6rem] tabular-nums uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
          <SpecCell label="Pressure" value="1.95" unit="bar" />
          <SpecCell label="Compound" value="SOFT" />
          <SpecCell label="Cycle" value="3 / 5" />
        </div>
      </div>
    </BentoCard>
  );
}

function TreadZone({
  label,
  tempC,
  pulse,
}: {
  label: string;
  tempC: number;
  pulse?: boolean;
}) {
  // Color by temperature window
  const color =
    tempC > 105
      ? "var(--color-warning)"
      : tempC >= 80
        ? "var(--color-primary)"
        : "oklch(70% 0.18 250)";

  // Bar fill: map 60 °C → 0%, 120 °C → 100% within the cell
  const pct = Math.max(8, Math.min(100, ((tempC - 60) / (120 - 60)) * 100));

  return (
    <div className="flex flex-1 flex-col items-stretch gap-1">
      <div
        aria-hidden="true"
        className="relative h-[58px] overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-surface)]"
      >
        {/* Subtle horizontal tread groove */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
          style={{ background: "rgba(0,0,0,0.35)" }}
        />
        {/* Heat fill */}
        <span
          aria-hidden="true"
          className={"absolute inset-x-0 bottom-0 " + (pulse ? "aw-tm-shoulder" : "")}
          style={{
            height: `${pct}%`,
            background: `linear-gradient(180deg, ${color} 0%, ${color} 60%, color-mix(in oklab, ${color} 60%, transparent) 100%)`,
            boxShadow: pulse
              ? `0 0 14px -2px ${color}, inset 0 1px 0 color-mix(in oklab, ${color} 80%, white)`
              : `inset 0 1px 0 color-mix(in oklab, ${color} 80%, white)`,
          }}
        />
      </div>
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[0.52rem] tracking-[0.18em] text-[var(--color-text-muted)]">
          {label}
        </span>
        <span
          className="font-mono text-[0.72rem] font-semibold leading-none tabular-nums"
          style={{ color }}
        >
          {tempC}
        </span>
      </div>
    </div>
  );
}

function SpecCell({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit?: string;
}) {
  return (
    <div className="flex flex-1 flex-col gap-0.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-2)] px-2 py-1.5">
      <span className="text-[0.5rem] tracking-[0.22em] text-[var(--color-text-muted)]">
        {label}
      </span>
      <span className="text-[0.7rem] font-semibold tabular-nums text-[var(--color-text)]">
        {value}
        {unit ? (
          <span className="ml-1 text-[0.5rem] font-normal text-[var(--color-text-muted)]">
            {unit}
          </span>
        ) : null}
      </span>
    </div>
  );
}
