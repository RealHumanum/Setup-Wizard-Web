"use client";

import { Fuel, Timer, Weight } from "lucide-react";
import { BentoCard } from "./BentoCard";

// Telemetry numbers — BMW S1000RR scale, 22 min track session at 0.65 L/min.
// Required = 22 * 0.65 + 0.2 margin ≈ 14.5 L of a 23 L tank → 63% fill.
const TANK_CAPACITY_L = 23;
const REQUIRED_L = 14.5;
const FILL_PCT = 63; // 14.5 / 23

// Needle rotation maps fill % onto the semicircle: 0% → -90deg, 100% → +90deg.
const NEEDLE_DEG = -90 + (FILL_PCT / 100) * 180; // ≈ 23.4°

export function FuelManagerCard() {
  return (
    <BentoCard
      title="Fuel Manager"
      desc="Calculate exact consumption for every session. Log rates per circuit, monitor reserve levels and plan race strategies."
    >
      <div className="aw-bento-graphic relative mt-auto flex flex-1 flex-col gap-3 pt-3">
        {/* Strategy header */}
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block size-1.5 rounded-full bg-[var(--color-primary)] shadow-[0_0_6px_var(--color-primary)] aw-fuel-pulse"
              aria-hidden="true"
            />
            Race Strategy
          </span>
          <span className="text-[var(--color-text-dim)]">S1000RR · 23L</span>
        </div>

        {/* Hero: semicircular fuel dial */}
        <div className="relative flex flex-1 items-center justify-center">
          <svg
            viewBox="0 0 220 130"
            className="h-auto w-full max-w-[280px]"
            role="img"
            aria-label={`Fuel gauge: ${REQUIRED_L} of ${TANK_CAPACITY_L} liters, ${FILL_PCT}% full`}
          >
            <defs>
              <filter id="fuelNeedleGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="fuelArcGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.4" />
              </filter>
            </defs>

            {/* Base arc — surface track */}
            <path
              d="M 20 115 A 90 90 0 0 1 200 115"
              fill="none"
              stroke="var(--color-surface-2)"
              strokeWidth="12"
              strokeLinecap="round"
              aria-hidden="true"
            />

            {/* Reserve segment (0% → 25%) */}
            <path
              d="M 20 115 A 90 90 0 0 1 46.36 51.36"
              fill="none"
              stroke="var(--color-warning)"
              strokeWidth="12"
              strokeLinecap="round"
              opacity="0.85"
              aria-hidden="true"
            />
            {/* Reserve threshold dashed outline */}
            <path
              d="M 20 115 A 90 90 0 0 1 46.36 51.36"
              fill="none"
              stroke="var(--color-warning)"
              strokeWidth="1"
              strokeDasharray="2 2"
              opacity="0.9"
              transform="translate(0 -10)"
              aria-hidden="true"
            />

            {/* Operating window (30% → 85%) */}
            <path
              d="M 57.1 42.19 A 90 90 0 0 1 190.18 74.15"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="12"
              strokeLinecap="round"
              filter="url(#fuelArcGlow)"
              opacity="0.55"
              aria-hidden="true"
            />
            <path
              d="M 57.1 42.19 A 90 90 0 0 1 190.18 74.15"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="12"
              strokeLinecap="round"
              aria-hidden="true"
            />

            {/* Tick marks */}
            <g
              stroke="var(--color-border-bright)"
              strokeWidth="1.2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="10" y1="115" x2="26" y2="115" />
              <line x1="39.29" y1="44.29" x2="50.6" y2="55.6" />
              <line x1="110" y1="15" x2="110" y2="31" />
              <line x1="180.71" y1="44.29" x2="169.4" y2="55.6" />
              <line x1="194" y1="115" x2="210" y2="115" />
            </g>

            {/* Tick labels */}
            <g
              fill="var(--color-text-muted)"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontSize="8"
              textAnchor="middle"
              aria-hidden="true"
            >
              <text x="6" y="125">0</text>
              <text x="32" y="34">1/4</text>
              <text x="110" y="9">1/2</text>
              <text x="188" y="34">3/4</text>
              <text x="214" y="125">F</text>
            </g>

            {/* Needle — rotated around pivot (110, 115) */}
            <g
              transform={`rotate(${NEEDLE_DEG} 110 115)`}
              filter="url(#fuelNeedleGlow)"
              className="aw-fuel-needle"
              style={{ transformOrigin: "110px 115px" }}
              aria-hidden="true"
            >
              <polygon
                points="110,40 106,113 114,113"
                fill="var(--color-primary)"
                stroke="var(--color-primary)"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </g>

            {/* Pivot hub */}
            <circle
              cx="110"
              cy="115"
              r="6"
              fill="var(--color-surface)"
              stroke="var(--color-primary)"
              strokeWidth="1.5"
              aria-hidden="true"
            />
            <circle
              cx="110"
              cy="115"
              r="2"
              fill="var(--color-primary)"
              aria-hidden="true"
            />
          </svg>

          {/* Center readout (overlay on gauge hollow) */}
          <div className="pointer-events-none absolute inset-x-0 bottom-1 flex flex-col items-center gap-0.5">
            <span className="font-mono text-[2rem] leading-none tabular-nums text-[var(--color-text)]">
              {REQUIRED_L.toFixed(1)}
              <span className="ml-0.5 text-base text-[var(--color-text-dim)]">L</span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--color-text-muted)] tabular-nums">
              OF {TANK_CAPACITY_L} L · {FILL_PCT}%
            </span>
          </div>
        </div>

        {/* Session plan divider */}
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
          <span className="h-px flex-1 bg-[var(--color-border)]" aria-hidden="true" />
          <span>Session Plan · Misano</span>
          <span className="h-px flex-1 bg-[var(--color-border)]" aria-hidden="true" />
        </div>

        {/* Telemetry row */}
        <div className="grid grid-cols-3 gap-2">
          <Stat
            icon={<Fuel className="size-3" aria-hidden="true" />}
            label="BURN"
            value="0.65"
            unit="L/min"
          />
          <Stat
            icon={<Timer className="size-3" aria-hidden="true" />}
            label="TIME"
            value="22"
            unit="min"
          />
          <Stat
            icon={<Weight className="size-3" aria-hidden="true" />}
            label="WEIGHT"
            value="10.7"
            unit="kg"
          />
        </div>
      </div>

      <style>{`
        @keyframes aw-fuel-needle-wobble {
          0%   { transform: rotate(${NEEDLE_DEG - 1.5}deg); }
          100% { transform: rotate(${NEEDLE_DEG + 1.5}deg); }
        }
        .aw-fuel-needle {
          transform-box: fill-box;
          transform-origin: 110px 115px;
          animation: aw-fuel-needle-wobble 2.5s ease-in-out infinite alternate;
        }
        @keyframes aw-fuel-pulse {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.35; }
        }
        .aw-fuel-pulse {
          animation: aw-fuel-pulse 1.8s ease-in-out infinite;
        }
      `}</style>
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
    <div className="flex flex-col gap-0.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-2)]/50 px-2 py-1.5">
      <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
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
