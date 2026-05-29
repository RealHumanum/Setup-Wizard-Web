"use client";

import { BentoCard } from "./BentoCard";

// Fictional circuit — a closed loop with a long start/finish straight along the
// bottom, a fast right-hander into a left-right ess, a tight 180° hairpin on the
// far left, a long parabolic sweep across the top, and a slow chicane back onto
// the straight. Not a copy of any real track.

// Centreline (we trace asphalt around it as a wide stroke).
const TRACK_CENTRELINE =
  "M70,235 L300,235 C340,235 360,225 358,200 C355,170 305,170 285,150 C265,130 290,105 268,85 C246,65 215,95 195,90 C175,85 175,55 145,55 C95,55 60,75 50,115 C40,155 80,170 75,200 C72,218 60,228 70,235 Z";

// Racing line — runs wide on entry/exit, cuts the apex of each corner. Same
// rough loop as the centreline but pulled to the inside through every turn.
const RACING_LINE =
  "M80,240 L298,240 C336,238 350,228 348,205 C344,180 298,178 280,156 C262,134 286,108 264,90 C244,72 218,100 196,96 C176,92 178,62 148,62 C100,62 70,80 60,116 C52,150 88,170 84,202 C82,220 70,230 80,240 Z";

// Apex points along the racing line — picked at the tightest part of each turn.
const APEXES = [
  { x: 348, y: 205, label: "T1", tx: 360, ty: 200 },
  { x: 280, y: 156, label: "T2", tx: 296, ty: 152 },
  { x: 264, y: 90, label: "T3", tx: 278, ty: 80 },
  { x: 196, y: 96, label: "T4", tx: 202, ty: 78 },
  { x: 60, y: 116, label: "T5", tx: 36, ty: 116 },
  { x: 84, y: 202, label: "T6", tx: 38, ty: 208 },
];

export function TrackLogCard() {
  return (
    <BentoCard
      title="Track Log"
      desc="Advanced session logbook. Record lap times, weather and setup data — high-fidelity history for every circuit."
    >
      <div className="relative mt-2 flex flex-1 flex-col">
        {/* Telemetry chrome — top row */}
        <div className="flex items-center justify-between px-1 pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
          <span className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{
                background: "var(--color-primary)",
                boxShadow: "0 0 6px var(--color-primary)",
              }}
            />
            REC · CIRCUIT-07
          </span>
          <span className="text-[var(--color-text-dim)]">LAP 7 / 14</span>
        </div>

        {/* Track diagram */}
        <div className="relative w-full flex-1 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-2)]">
          {/* subtle grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(to right, color-mix(in oklch, var(--color-border) 55%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--color-border) 55%, transparent) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <svg
            role="img"
            aria-hidden="true"
            viewBox="0 0 400 280"
            className="relative h-[240px] w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Asphalt body — wide grey stroke between curbs */}
              <filter id="track-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.2" />
              </filter>
            </defs>

            {/* Outer curb halo (soft outer edge) */}
            <path
              d={TRACK_CENTRELINE}
              fill="none"
              stroke="color-mix(in oklch, var(--color-border) 80%, transparent)"
              strokeWidth="32"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Asphalt surface */}
            <path
              d={TRACK_CENTRELINE}
              fill="none"
              stroke="var(--color-surface)"
              strokeWidth="26"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Inner curb dashes — alternating dashes along the inside edge */}
            <path
              d={TRACK_CENTRELINE}
              fill="none"
              stroke="color-mix(in oklch, var(--color-primary) 35%, transparent)"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeDasharray="6 6"
              opacity="0.85"
              transform="translate(0,0)"
            />

            {/* Outer edge thin border */}
            <path
              d={TRACK_CENTRELINE}
              fill="none"
              stroke="color-mix(in oklch, var(--color-text-dim) 50%, transparent)"
              strokeWidth="28"
              strokeLinejoin="round"
              strokeLinecap="round"
              opacity="0.0"
            />

            {/* Start / finish line */}
            <g>
              <line
                x1="160"
                y1="223"
                x2="160"
                y2="247"
                stroke="var(--color-text-dim)"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <text
                x="164"
                y="221"
                fill="var(--color-text-muted)"
                fontSize="8"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                letterSpacing="1"
              >
                S/F
              </text>
            </g>

            {/* Racing line — the hero stroke */}
            <path
              id="racing-line"
              d={RACING_LINE}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="1.75"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeDasharray="2 0"
              opacity="0.95"
              filter="url(#track-glow)"
            />
            <path
              d={RACING_LINE}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="1.1"
              strokeLinejoin="round"
              strokeLinecap="round"
              opacity="1"
            />

            {/* Apex markers — chevrons + labels */}
            {APEXES.map((a) => (
              <g key={a.label}>
                <circle
                  cx={a.x}
                  cy={a.y}
                  r="3.2"
                  fill="var(--color-warning)"
                  stroke="var(--color-surface)"
                  strokeWidth="1"
                />
                <circle
                  cx={a.x}
                  cy={a.y}
                  r="5.5"
                  fill="none"
                  stroke="var(--color-warning)"
                  strokeWidth="0.8"
                  opacity="0.45"
                />
                <text
                  x={a.tx}
                  y={a.ty}
                  fill="var(--color-warning)"
                  fontSize="8"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  letterSpacing="0.5"
                  textAnchor="middle"
                >
                  {a.label}
                </text>
              </g>
            ))}

            {/* Bike marker — animates around the racing line */}
            <g>
              <circle
                r="6"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="0.8"
                opacity="0.55"
              >
                <animateMotion dur="14s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#racing-line" />
                </animateMotion>
              </circle>
              <circle
                r="3.2"
                fill="var(--color-primary)"
                style={{
                  filter:
                    "drop-shadow(0 0 4px var(--color-primary)) drop-shadow(0 0 8px var(--color-primary))",
                }}
              >
                <animateMotion dur="14s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#racing-line" />
                </animateMotion>
              </circle>
            </g>
          </svg>
        </div>

        {/* Telemetry chrome — bottom row */}
        <div className="mt-2 grid grid-cols-3 gap-2 font-mono text-[10px]">
          <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-2)] px-2 py-1.5">
            <div className="text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              Best
            </div>
            <div className="text-[var(--color-primary)]">1:35.482</div>
          </div>
          <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-2)] px-2 py-1.5">
            <div className="text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              Last
            </div>
            <div className="text-[var(--color-text-dim)]">1:36.014</div>
          </div>
          <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-2)] px-2 py-1.5">
            <div className="text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              Sectors
            </div>
            <div className="flex items-center gap-1 pt-0.5">
              <span
                aria-hidden="true"
                className="h-1.5 w-4 rounded-sm"
                style={{ background: "var(--color-primary)" }}
              />
              <span
                aria-hidden="true"
                className="h-1.5 w-4 rounded-sm"
                style={{ background: "var(--color-warning)" }}
              />
              <span
                aria-hidden="true"
                className="h-1.5 w-4 rounded-sm"
                style={{ background: "var(--color-primary)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
