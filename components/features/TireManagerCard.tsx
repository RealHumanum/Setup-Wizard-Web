"use client";

import { BentoCard } from "./BentoCard";

// Tire Manager — front + rear tire heat visualisation with a realistic
// warm-up animation. Each tire starts cold (blue) and warms up: the centre
// stays cooler while the shoulders (edges) climb into orange/red when hot.
// No session trace — just the live tires.
export function TireManagerCard() {
  return (
    <BentoCard
      title="Tire Manager"
      desc="Log heat-cycles, wear patterns and pressure targets. Sync with global track databases for precise cold/hot baseline settings."
    >
      <style>{`
        /* Warm-up cycle: cold -> up to operating/hot -> cools -> repeat.
           We cross-fade a cold-blue base with a warmed shoulder gradient. */
        @keyframes aw-tire-warm {
          0%   { opacity: 0; }
          45%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { opacity: 0; }
        }
        /* Subtle breathing on the hot shoulders so the heat feels alive. */
        @keyframes aw-tire-shoulder {
          0%, 100% { opacity: 0.0; }
          50%      { opacity: 0.55; }
        }
        @keyframes aw-tire-dot {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.3; }
        }
        .aw-tm-warm     { animation: aw-tire-warm 7s ease-in-out infinite; }
        .aw-tm-warm-r   { animation: aw-tire-warm 7s ease-in-out infinite; animation-delay: -0.9s; }
        .aw-tm-shoulder { animation: aw-tire-shoulder 7s ease-in-out infinite; }
        .aw-tm-shoulder-r { animation: aw-tire-shoulder 7s ease-in-out infinite; animation-delay: -0.9s; }
        .aw-tm-dot      { animation: aw-tire-dot 1.8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .aw-tm-warm, .aw-tm-warm-r, .aw-tm-shoulder, .aw-tm-shoulder-r, .aw-tm-dot {
            animation: none;
          }
          .aw-tm-warm, .aw-tm-warm-r { opacity: 1; }
        }
      `}</style>

      {/* Status strip */}
      <div className="mt-1 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
        <span className="flex items-center gap-1.5">
          <span
            className="aw-tm-dot inline-block size-1.5 rounded-full bg-[var(--color-primary)]"
            style={{ boxShadow: "0 0 8px var(--color-primary)" }}
            aria-hidden="true"
          />
          Live · Lap 14
        </span>
        <span className="text-[var(--color-text-dim)]">SLICK · WARMERS OFF</span>
      </div>

      {/* Tires */}
      <div className="relative mt-3 flex flex-1 items-center justify-center gap-8">
        <Tire label="FRONT" width={64} tempC={86} pressureBar={1.95} />
        <Tire label="REAR" width={92} tempC={104} pressureBar={1.75} rear />
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-between gap-3 font-mono text-[0.58rem] uppercase tracking-wider text-[var(--color-text-muted)]">
        <span>Cold</span>
        <div
          className="h-1.5 flex-1 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, oklch(70% 0.18 250), var(--color-primary), var(--color-warning), var(--color-danger))",
          }}
          aria-hidden="true"
        />
        <span>Hot</span>
      </div>
    </BentoCard>
  );
}

function Tire({
  label,
  width,
  tempC,
  pressureBar,
  rear,
}: {
  label: string;
  width: number;
  tempC: number;
  pressureBar: number;
  rear?: boolean;
}) {
  // Across the tire WIDTH: cool centre, hot shoulders (edges). Rear leans
  // hotter so its shoulders push further into red.
  const warmGradient = rear
    ? "linear-gradient(90deg, var(--color-danger) 0%, var(--color-warning) 16%, var(--color-primary) 42%, var(--color-primary) 58%, var(--color-warning) 84%, var(--color-danger) 100%)"
    : "linear-gradient(90deg, var(--color-warning) 0%, var(--color-primary) 30%, oklch(72% 0.16 200) 50%, var(--color-primary) 70%, var(--color-warning) 100%)";

  // Extra hot-shoulder flare that breathes on top.
  const shoulderFlare =
    "linear-gradient(90deg, var(--color-danger) 0%, transparent 22%, transparent 78%, var(--color-danger) 100%)";

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
        {label}
      </span>

      <div
        role="img"
        aria-label={`${label} tire ${tempC} degrees celsius`}
        className="relative overflow-hidden rounded-[16px] border border-[var(--color-border-bright)]"
        style={{ width: `${width}px`, height: "168px" }}
      >
        {/* Cold base — always present underneath */}
        <div
          className="absolute inset-0"
          style={{ background: "oklch(60% 0.16 250)" }}
          aria-hidden="true"
        />

        {/* Warmed-up gradient — fades in/out to animate the heat cycle */}
        <div
          className={rear ? "aw-tm-warm-r absolute inset-0" : "aw-tm-warm absolute inset-0"}
          style={{ background: warmGradient }}
          aria-hidden="true"
        />

        {/* Hot-shoulder flare breathing on top */}
        <div
          className={
            (rear ? "aw-tm-shoulder-r" : "aw-tm-shoulder") + " absolute inset-0"
          }
          style={{ background: shoulderFlare, mixBlendMode: "screen" }}
          aria-hidden="true"
        />

        {/* Tread grooves */}
        <div
          className="absolute inset-0 flex flex-col justify-between py-4 pointer-events-none"
          aria-hidden="true"
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className="block h-px w-full"
              style={{ background: "rgba(0,0,0,0.28)" }}
            />
          ))}
        </div>

        {/* Centre temperature readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-mono text-[1.05rem] font-bold leading-none tabular-nums text-white"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.7)" }}
          >
            {tempC}
          </span>
          <span
            className="font-mono text-[0.5rem] leading-tight tracking-wider text-white/80"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}
          >
            °C
          </span>
        </div>
      </div>

      {/* Pressure */}
      <span className="font-mono text-[0.68rem] font-semibold tabular-nums leading-none text-[var(--color-text)]">
        {pressureBar.toFixed(2)}
        <span className="ml-1 text-[0.52rem] font-normal text-[var(--color-text-muted)]">
          bar
        </span>
      </span>
    </div>
  );
}
