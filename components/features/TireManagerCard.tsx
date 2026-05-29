"use client";

import { BentoCard } from "./BentoCard";

// Tire Manager card — visualises a realistic motorcycle racing tire heat cycle.
// One central thermal-imaging readout per axle (FRONT / REAR) with operating
// window band, cycle counter and slow pulsing animation. All CSS, no JS state.
export function TireManagerCard() {
  return (
    <BentoCard
      title="Tire Manager"
      desc="Log heat-cycles, wear patterns and pressure targets. Sync with global track databases for precise cold/hot baseline settings."
    >
      <style>{`
        @keyframes aw-tire-pulse {
          0%, 100% { opacity: 0.85; filter: blur(0.5px); }
          50%      { opacity: 1;    filter: blur(0px); }
        }
        @keyframes aw-tire-sweep {
          0%   { transform: translateY(-100%); opacity: 0; }
          15%  { opacity: 0.55; }
          85%  { opacity: 0.55; }
          100% { transform: translateY(220%); opacity: 0; }
        }
        @keyframes aw-window-glow {
          0%, 100% { box-shadow: 0 0 0 1px var(--color-primary), 0 0 12px -2px var(--color-primary); }
          50%      { box-shadow: 0 0 0 1px var(--color-primary), 0 0 22px 0px var(--color-primary); }
        }
        .aw-tm-pulse { animation: aw-tire-pulse 3.6s ease-in-out infinite; }
        .aw-tm-pulse-delay { animation-delay: 1.2s; }
        .aw-tm-sweep { animation: aw-tire-sweep 5.2s ease-in-out infinite; }
        .aw-tm-sweep-delay { animation-delay: 2.1s; }
        .aw-tm-window { animation: aw-window-glow 4s ease-in-out infinite; }
      `}</style>

      {/* Status strip */}
      <div className="mt-1 flex items-center justify-between text-[0.6rem] font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
        <span className="inline-flex items-center gap-1.5">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]"
            style={{ boxShadow: "0 0 8px var(--color-primary)" }}
          />
          Live · Lap 14
        </span>
        <span className="rounded-md border border-[var(--color-border-bright)] bg-[var(--color-surface-2)] px-2 py-[3px] font-mono tabular-nums tracking-wider text-[var(--color-text-dim)]">
          CYCLE 3 / 5
        </span>
      </div>

      {/* Visualization */}
      <div className="relative mt-3 flex flex-1 items-center justify-center gap-5">
        <TireGauge
          label="FRONT"
          tempC={87}
          pressureBar={1.95}
          compound="MED"
          width={62}
        />
        <TireGauge
          label="REAR"
          tempC={104}
          pressureBar={1.75}
          compound="SOFT"
          width={88}
          delay
          hotter
        />
      </div>

      {/* Operating window legend */}
      <div className="mt-3 flex items-center justify-between gap-3 font-mono text-[0.6rem] tabular-nums text-[var(--color-text-muted)]">
        <span className="tracking-wider">OP. WINDOW</span>
        <div className="relative flex-1 overflow-hidden rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] h-2">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-[35%] right-[15%] rounded-full"
            style={{
              background:
                "linear-gradient(90deg, oklch(70% 0.18 250) 0%, var(--color-primary) 35%, var(--color-primary) 65%, var(--color-warning) 100%)",
              opacity: 0.55,
            }}
          />
          {/* Front marker */}
          <span
            className="absolute top-1/2 h-3 w-[2px] -translate-y-1/2 bg-[var(--color-text)]"
            style={{ left: "42%" }}
            aria-hidden="true"
          />
          {/* Rear marker */}
          <span
            className="absolute top-1/2 h-3 w-[2px] -translate-y-1/2 bg-[var(--color-warning)]"
            style={{ left: "70%" }}
            aria-hidden="true"
          />
        </div>
        <span className="tracking-wider">80 – 110 °C</span>
      </div>
    </BentoCard>
  );
}

function TireGauge({
  label,
  tempC,
  pressureBar,
  compound,
  width,
  delay,
  hotter,
}: {
  label: string;
  tempC: number;
  pressureBar: number;
  compound: string;
  width: number;
  delay?: boolean;
  hotter?: boolean;
}) {
  // Core thermal gradient — colder blue → green operating → warm orange.
  // Rear runs slightly hotter so its core leans further into orange.
  const coreGradient = hotter
    ? "radial-gradient(ellipse at center, var(--color-warning) 0%, var(--color-warning) 12%, var(--color-primary) 38%, oklch(70% 0.18 250) 88%, oklch(45% 0.12 250) 100%)"
    : "radial-gradient(ellipse at center, var(--color-warning) 0%, var(--color-primary) 28%, var(--color-primary) 50%, oklch(70% 0.18 250) 90%, oklch(45% 0.12 250) 100%)";

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
        {label}
      </span>

      <div
        role="img"
        aria-hidden="true"
        className="relative overflow-hidden rounded-[14px] border border-[var(--color-border-bright)]"
        style={{
          width: `${width}px`,
          height: "150px",
          background:
            "linear-gradient(180deg, var(--color-surface-2) 0%, var(--color-surface) 100%)",
        }}
      >
        {/* Heat core */}
        <div
          className={"absolute inset-[6px] rounded-[10px] aw-tm-pulse " + (delay ? "aw-tm-pulse-delay" : "")}
          style={{ background: coreGradient }}
        />

        {/* Tread grooves */}
        <div className="absolute inset-[6px] flex flex-col justify-between py-3 pointer-events-none">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="block h-px w-full"
              style={{ background: "rgba(0,0,0,0.35)" }}
            />
          ))}
        </div>

        {/* Thermal scanner sweep line */}
        <div
          className={"absolute inset-x-1 h-[2px] aw-tm-sweep " + (delay ? "aw-tm-sweep-delay" : "")}
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, var(--color-text) 50%, transparent 100%)",
            top: 0,
          }}
        />

        {/* Center temperature readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0">
          <span
            className="font-mono text-[1.05rem] font-bold leading-none tabular-nums text-[var(--color-text)]"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}
          >
            {tempC}
          </span>
          <span className="font-mono text-[0.55rem] leading-tight tracking-wider text-[var(--color-text-dim)]">
            °C
          </span>
        </div>

        {/* Edge tick marks (left side) */}
        <div className="absolute left-[2px] top-3 bottom-3 flex flex-col justify-between">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="block h-px w-1.5 bg-[var(--color-text-muted)] opacity-50"
            />
          ))}
        </div>
      </div>

      {/* Pressure + compound */}
      <div className="flex w-full flex-col items-center gap-0.5">
        <span className="font-mono text-[0.7rem] font-semibold tabular-nums leading-none text-[var(--color-text)]">
          {pressureBar.toFixed(2)}
          <span className="ml-1 text-[0.55rem] font-normal text-[var(--color-text-muted)]">
            bar
          </span>
        </span>
        <span className="font-mono text-[0.55rem] tracking-[0.18em] text-[var(--color-text-muted)]">
          {compound}
        </span>
      </div>
    </div>
  );
}
