"use client";

import { BentoCard } from "./BentoCard";

// Tire Manager — front + rear tire heat visualisation with a realistic
// warm-up animation. Each tire starts cold (blue) and warms up: the centre
// stays cooler while the shoulders (edges) climb into orange/red when hot.
// Heat bars below each tire rise from cold to operating temp as it warms.
export function TireManagerCard() {
  return (
    <BentoCard
      title="Tire Manager"
      desc="Log heat-cycles, wear patterns and pressure targets. Sync with global track databases for precise cold/hot baseline settings."
    >
      <style>{`
        /* Warm-up cycle: cold base shows, warmed gradient fades in to operating. */
        @keyframes aw-tire-warm {
          0%   { opacity: 0; }
          40%  { opacity: 1; }
          82%  { opacity: 1; }
          100% { opacity: 0; }
        }
        /* Hot shoulders breathe in once the tire is warm. */
        @keyframes aw-tire-shoulder {
          0%, 100% { opacity: 0; }
          55%      { opacity: 0.5; }
        }
        /* Heat bar fill rises from cold (low) to operating temp (high). */
        @keyframes aw-tire-fill-front {
          0%   { width: 14%; }
          45%  { width: 78%; }
          82%  { width: 80%; }
          100% { width: 14%; }
        }
        @keyframes aw-tire-fill-rear {
          0%   { width: 16%; }
          45%  { width: 92%; }
          82%  { width: 95%; }
          100% { width: 16%; }
        }
        @keyframes aw-tire-dot {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.3; }
        }
        .aw-tm-warm       { animation: aw-tire-warm 7s ease-in-out infinite; }
        .aw-tm-warm-r     { animation: aw-tire-warm 7s ease-in-out infinite; animation-delay: -0.9s; }
        .aw-tm-shoulder   { animation: aw-tire-shoulder 7s ease-in-out infinite; }
        .aw-tm-shoulder-r { animation: aw-tire-shoulder 7s ease-in-out infinite; animation-delay: -0.9s; }
        .aw-tm-fill-front { animation: aw-tire-fill-front 7s ease-in-out infinite; }
        .aw-tm-fill-rear  { animation: aw-tire-fill-rear 7s ease-in-out infinite; animation-delay: -0.9s; }
        .aw-tm-dot        { animation: aw-tire-dot 1.8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .aw-tm-warm, .aw-tm-warm-r { animation: none; opacity: 1; }
          .aw-tm-shoulder, .aw-tm-shoulder-r { animation: none; opacity: 0.4; }
          .aw-tm-fill-front { animation: none; width: 80%; }
          .aw-tm-fill-rear  { animation: none; width: 95%; }
          .aw-tm-dot { animation: none; }
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
        <Tire label="FRONT" width={64} />
        <Tire label="REAR" width={92} rear />
      </div>

      {/* Heat bars — rise from cold to operating temp as the tire warms */}
      <div className="mt-3 flex flex-col gap-2.5">
        <HeatBar label="FRONT" tempC={88} pressureBar={1.90} />
        <HeatBar label="REAR" tempC={102} pressureBar={1.70} rear />
      </div>
    </BentoCard>
  );
}

function Tire({
  label,
  width,
  rear,
}: {
  label: string;
  width: number;
  rear?: boolean;
}) {
  // Across the tire WIDTH: cool centre, hot shoulders (edges). Rear leans
  // hotter so its shoulders push further into red.
  const warmGradient = rear
    ? "linear-gradient(90deg, var(--color-danger) 0%, var(--color-warning) 16%, var(--color-primary) 42%, var(--color-primary) 58%, var(--color-warning) 84%, var(--color-danger) 100%)"
    : "linear-gradient(90deg, var(--color-warning) 0%, var(--color-primary) 30%, oklch(72% 0.16 200) 50%, var(--color-primary) 70%, var(--color-warning) 100%)";

  const shoulderFlare =
    "linear-gradient(90deg, var(--color-danger) 0%, transparent 22%, transparent 78%, var(--color-danger) 100%)";

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
        {label}
      </span>

      <div
        role="img"
        aria-label={`${label} tire heat map`}
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
          className={(rear ? "aw-tm-warm-r" : "aw-tm-warm") + " absolute inset-0"}
          style={{ background: warmGradient }}
          aria-hidden="true"
        />

        {/* Hot-shoulder flare breathing on top */}
        <div
          className={(rear ? "aw-tm-shoulder-r" : "aw-tm-shoulder") + " absolute inset-0"}
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
      </div>
    </div>
  );
}

function HeatBar({
  label,
  tempC,
  pressureBar,
  rear,
}: {
  label: string;
  tempC: number;
  pressureBar: number;
  rear?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="w-10 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
        {label}
      </span>

      <div
        className="relative h-2 flex-1 overflow-hidden rounded-full bg-[var(--color-surface-2)]"
        role="img"
        aria-label={`${label} temperature ${tempC} degrees celsius, ${pressureBar.toFixed(2)} bar`}
      >
        <div
          className={
            (rear ? "aw-tm-fill-rear" : "aw-tm-fill-front") + " absolute inset-y-0 left-0 rounded-full"
          }
          style={{
            background:
              "linear-gradient(90deg, oklch(70% 0.18 250), var(--color-primary) 55%, var(--color-warning) 85%, var(--color-danger))",
          }}
          aria-hidden="true"
        />
      </div>

      <span className="w-12 text-right font-mono text-[0.62rem] font-semibold tabular-nums leading-none text-[var(--color-text)]">
        {tempC}
        <span className="text-[0.5rem] font-normal text-[var(--color-text-muted)]">°C</span>
      </span>
      <span className="w-14 text-right font-mono text-[0.6rem] tabular-nums leading-none text-[var(--color-text-dim)]">
        {pressureBar.toFixed(2)}
        <span className="text-[0.48rem] text-[var(--color-text-muted)]"> bar</span>
      </span>
    </div>
  );
}
