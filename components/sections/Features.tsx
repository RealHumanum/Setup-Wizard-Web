"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";

type Phase = "entry" | "mid" | "exit";

const SYMPTOMS: Record<
  Phase,
  { id: string; text: string; fix: string }[]
> = {
  entry: [
    {
      id: "1",
      text: "Front end dives too fast under braking",
      fix: "Increase Front Compression Damping (2 Clicks)",
    },
    {
      id: "2",
      text: "Bike resists leaning (wants to stand up)",
      fix: "Decrease Front Preload / Lower Front End",
    },
    {
      id: "3",
      text: "Rear wheel hops or skips",
      fix: "Decrease Rear Rebound Damping (1 Click)",
    },
  ],
  mid: [
    {
      id: "4",
      text: "Bike runs wide (understeer)",
      fix: "Increase Rear Ride Height / Add Rear Preload",
    },
    {
      id: "5",
      text: "Front end chatters / vibrates",
      fix: "Decrease Front Rebound Damping (2 Clicks)",
    },
  ],
  exit: [
    {
      id: "6",
      text: "Runs wide under heavy throttle",
      fix: "Increase Rear Compression (Low-Speed)",
    },
    {
      id: "7",
      text: "Rear spins too easily / lacks grip",
      fix: "Decrease Rear Preload / Soften Spring",
    },
  ],
};

const PHASE_LABEL: Record<Phase, string> = {
  entry: "Braking",
  mid: "Mid-Corner",
  exit: "Exit",
};

export function Features() {
  return (
    <section id="features" className="relative px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          tag="Powerful Intelligence"
          title={<>Engineering-Grade Precision.</>}
          sub="Eliminate paper notes and guesswork with a professional engineering suite built for performance."
        />

        <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal>
            <TroubleshooterCard />
          </Reveal>
          <Reveal delay={0.05}>
            <TireManagerCard />
          </Reveal>
          <Reveal delay={0.1}>
            <GarageCard />
          </Reveal>
          <Reveal delay={0.15}>
            <ServiceHubCard />
          </Reveal>
          <Reveal delay={0.2}>
            <TrackLogCard />
          </Reveal>
          <Reveal delay={0.25}>
            <FuelManagerCard />
          </Reveal>
          <div className="sm:col-span-2 lg:col-span-3">
            <Reveal delay={0.3}>
              <PerformanceAnalyticsCard />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Card chrome                                                         */
/* ------------------------------------------------------------------ */

function BentoCard({
  title,
  desc,
  children,
  className = "",
}: {
  title: string;
  desc?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "aw-bento-card relative flex h-full min-h-[420px] flex-col gap-3 overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 " +
        className
      }
    >
      <h3 className="text-xl font-extrabold leading-tight">{title}</h3>
      {desc ? (
        <p className="text-sm leading-relaxed text-[var(--color-text-dim)]">
          {desc}
        </p>
      ) : null}
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1) Setup Troubleshooter                                             */
/* ------------------------------------------------------------------ */

function TroubleshooterCard() {
  const [phase, setPhase] = useState<Phase>("entry");
  const [symptomId, setSymptomId] = useState<string | null>(null);
  const [diagnosed, setDiagnosed] = useState<string | null>(null);

  const symptoms = SYMPTOMS[phase];
  const active = useMemo(
    () => symptoms.find((s) => s.id === symptomId) ?? null,
    [symptoms, symptomId],
  );

  return (
    <BentoCard title="Setup Troubleshooter">
      <div className="mt-1 flex flex-1 flex-col gap-3">
        <div>
          <label className="mb-2 block text-[0.75rem] font-bold uppercase tracking-wider text-[var(--color-text-dim)]">
            Corner Phase
          </label>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(PHASE_LABEL) as Phase[]).map((p) => {
              const isActive = p === phase;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setPhase(p);
                    setSymptomId(null);
                    setDiagnosed(null);
                  }}
                  className={
                    "rounded-full border px-3.5 py-2 text-xs font-bold transition-colors min-h-[36px] " +
                    (isActive
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                      : "border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-dim)] hover:border-[var(--color-primary)]/40 hover:text-white")
                  }
                >
                  {PHASE_LABEL[p]}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[0.75rem] font-bold uppercase tracking-wider text-[var(--color-text-dim)]">
            Handling Symptom
          </label>
          <div className="flex flex-col gap-1.5">
            {symptoms.map((s) => {
              const isActive = s.id === symptomId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setSymptomId(s.id);
                    setDiagnosed(null);
                  }}
                  className={
                    "rounded-xl border px-4 py-3 text-left text-sm transition-colors min-h-[48px] " +
                    (isActive
                      ? "border-[var(--color-warning)] bg-[var(--color-warning)]/5 text-white"
                      : "border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-dim)] hover:border-white/20 hover:text-white")
                  }
                >
                  {s.text}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-2.5">
          <div className="flex min-h-[110px] flex-col items-center justify-center rounded-2xl border border-white/8 bg-white/[0.03] p-3 text-center">
            {diagnosed && active ? (
              <div>
                <span className="text-[0.65rem] font-extrabold uppercase tracking-widest text-[var(--color-primary)]">
                  Likeliest Cause Identified
                </span>
                <div className="mt-1.5 text-sm font-semibold text-white">
                  {active.text}
                </div>
                <div className="mt-2 text-xs text-[var(--color-text-dim)]">
                  <strong className="text-[var(--color-primary)]">
                    Recommended Fix:
                  </strong>
                  <br />
                  {diagnosed}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-[var(--color-text-dim)]">
                <Brain className="size-5 text-[var(--color-primary)]" />
                <p className="text-[0.7rem] font-bold uppercase tracking-wider">
                  Awaiting Input…
                </p>
                <div className="aw-radar-spinner" />
              </div>
            )}
          </div>
          <button
            type="button"
            disabled={!active}
            onClick={() => active && setDiagnosed(active.fix)}
            className="flex min-h-[44px] w-full items-center justify-center rounded-xl bg-[var(--color-primary)] px-4 py-2.5 text-sm font-extrabold text-[var(--color-primary-foreground)] transition-opacity disabled:opacity-40"
          >
            Diagnose Issue
          </button>
        </div>
      </div>
    </BentoCard>
  );
}

/* ------------------------------------------------------------------ */
/* 2) Tire Manager                                                     */
/* ------------------------------------------------------------------ */

function TireManagerCard() {
  return (
    <BentoCard
      title="Tire Manager"
      desc="Log heat-cycles, wear patterns and pressure targets. Sync with global track databases for precise cold/hot baseline settings."
    >
      <div className="aw-bento-graphic mt-auto flex w-full items-end justify-center gap-10 pt-8">
        <Tire label="FRONT" />
        <Tire label="REAR" rear />
      </div>
    </BentoCard>
  );
}

function Tire({ label, rear }: { label: string; rear?: boolean }) {
  return (
    <div className={"aw-tire " + (rear ? "rear" : "")}>
      <span className="absolute -top-6 left-0 w-full text-center text-[0.65rem] uppercase tracking-widest text-[var(--color-text-muted)]">
        {label}
      </span>
      <div className="flex h-full w-full flex-col items-center justify-center gap-3">
        <div className="aw-tire-tread" />
        <div className="aw-tire-tread" />
        <div className="aw-tire-tread" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3) Garage                                                           */
/* ------------------------------------------------------------------ */

function GarageCard() {
  return (
    <BentoCard
      title="Garage"
      desc="Centralized multi-bike registry. Manage chassis geometry, component specs and OEM baselines for 115+ factory models."
    >
      <div className="aw-bento-graphic mt-auto flex w-full items-center justify-center pt-6">
        <svg
          viewBox="0 0 24 24"
          className="size-36"
          aria-hidden="true"
          role="img"
        >
          <path
            d="M12,2 L22,10 L22,22 L2,22 L2,10 Z"
            fill="oklch(78% 0.2 152 / 0.05)"
            stroke="var(--color-primary)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <rect
            x="6"
            y="12"
            width="12"
            height="10"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="1.2"
            rx="1"
          />
          <line
            x1="6"
            y1="15.3"
            x2="18"
            y2="15.3"
            stroke="var(--color-primary)"
            strokeWidth="1"
          />
          <line
            x1="6"
            y1="18.6"
            x2="18"
            y2="18.6"
            stroke="var(--color-primary)"
            strokeWidth="1"
          />
        </svg>
      </div>
    </BentoCard>
  );
}

/* ------------------------------------------------------------------ */
/* 4) Service Hub                                                      */
/* ------------------------------------------------------------------ */

type Bar = {
  label: string;
  pct: number;
  color: "primary" | "warning" | "danger";
};
type ServiceItem = { name: string; status: "OK" | "DUE"; bars: Bar[] };

const SERVICE_ITEMS: ServiceItem[] = [
  {
    name: "Suspension Service",
    status: "OK",
    bars: [
      { label: "DISTANCE", pct: 85, color: "primary" },
      { label: "TIME", pct: 70, color: "primary" },
      { label: "TRACK", pct: 40, color: "warning" },
    ],
  },
  {
    name: "Brake Fluid",
    status: "DUE",
    bars: [
      { label: "TIME", pct: 15, color: "danger" },
      { label: "TRACK", pct: 10, color: "danger" },
    ],
  },
  {
    name: "Engine Oil",
    status: "OK",
    bars: [
      { label: "DISTANCE", pct: 60, color: "primary" },
      { label: "USAGE", pct: 45, color: "warning" },
    ],
  },
  {
    name: "Chain & Sprockets",
    status: "OK",
    bars: [
      { label: "DISTANCE", pct: 75, color: "primary" },
      { label: "USAGE", pct: 90, color: "primary" },
    ],
  },
];

function ServiceHubCard() {
  return (
    <BentoCard
      title="Service Hub"
      desc="Lifecycle tracking for critical components. Monitor maintenance intervals and fluid degradation based on real-world track mileage."
    >
      <div className="mt-2 flex flex-col gap-2">
        {SERVICE_ITEMS.map((item) => (
          <div
            key={item.name}
            className="rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2"
          >
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[0.85rem] font-bold text-white">
                {item.name}
              </span>
              <span
                className={
                  "rounded px-2 py-0.5 text-[0.65rem] font-extrabold uppercase " +
                  (item.status === "OK"
                    ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                    : "bg-[var(--color-warning)]/10 text-[var(--color-warning)]")
                }
              >
                {item.status}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              {item.bars.map((b) => (
                <div key={b.label} className="flex items-center gap-2">
                  <span className="w-16 text-[0.6rem] text-[var(--color-text-dim)]">
                    {b.label}
                  </span>
                  <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${b.pct}%` }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{
                        duration: 1.2,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={
                        "h-full rounded-full " +
                        (b.color === "primary"
                          ? "bg-[var(--color-primary)]"
                          : b.color === "warning"
                            ? "bg-[var(--color-warning)]"
                            : "bg-[var(--color-danger)]")
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}

/* ------------------------------------------------------------------ */
/* 5) Track Log — 3D HUD                                               */
/* ------------------------------------------------------------------ */

const TRACK_PATH =
  "M244,47 L246,78 C241,109 193,101 168,119 C144,136 122,238 64,228 C33,222 41,166 76,145 C91,136 117,133 144,115 C172,96 172,64 162,49 C153,34 233,26 244,47 Z";

function TrackLogCard() {
  return (
    <BentoCard
      title="Track Log"
      desc="Advanced session logbook. Record lap times, weather and setup data — high-fidelity history for every circuit."
    >
      <div className="relative mt-2 flex h-[260px] w-full items-center justify-center overflow-hidden">
        <div className="aw-hud-grid-floor" />
        <div
          className="flex items-center justify-center"
          style={{ perspective: "1200px" }}
        >
          <div className="aw-track-perspective">
            <svg className="aw-track-svg" viewBox="0 0 300 300">
              <defs>
                <linearGradient
                  id="aw-trace-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="oklch(78% 0.2 152 / 0)" />
                  <stop offset="50%" stopColor="oklch(78% 0.2 152 / 1)" />
                  <stop offset="100%" stopColor="oklch(78% 0.2 152 / 0)" />
                </linearGradient>
              </defs>
              <path className="aw-track-edge" d={TRACK_PATH} />
              <path className="aw-track-line" d={TRACK_PATH} />
              <path
                className="aw-track-curbing"
                d="M240,55 L242,85 C237,115 188,105 163,125 C139,145 117,235 68,225 C45,220 50,175 80,155 C95,145 120,140 148,125 C178,110 178,75 168,60 C155,45 228,38 240,55 Z"
              />
              <path
                className="aw-track-racing-base"
                d="M250,40 L250,70 C245,100 198,95 173,113 C149,130 127,243 60,233 C28,225 36,160 72,140 C86,132 112,128 140,110 C168,92 168,58 158,45 C149,30 240,20 250,40 Z"
              />
              <path
                className="aw-track-racing-trace"
                d="M250,40 L250,70 C245,100 198,95 173,113 C149,130 127,243 60,233 C28,225 36,160 72,140 C86,132 112,128 140,110 C168,92 168,58 158,45 C149,30 240,20 250,40 Z"
              />
              <path
                className="aw-track-segment active"
                d="M244,47 L246,78 C241,109 193,101 168,119"
              />
            </svg>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

/* ------------------------------------------------------------------ */
/* 6) Fuel Manager                                                     */
/* ------------------------------------------------------------------ */

function FuelManagerCard() {
  return (
    <BentoCard
      title="Fuel Manager"
      desc="Calculate exact consumption for every session. Log rates per circuit, monitor reserve levels and plan race strategies."
    >
      <div className="aw-bento-graphic relative mt-auto flex h-44 w-full items-center justify-center pt-4">
        <svg
          viewBox="0 0 100 120"
          className="size-36"
          aria-hidden="true"
          role="img"
          style={{ filter: "drop-shadow(0 0 10px oklch(78% 0.2 152 / 0.25))" }}
        >
          <rect
            x="25"
            y="20"
            width="50"
            height="85"
            rx="3"
            fill="oklch(20% 0.025 250)"
            stroke="var(--color-primary)"
            strokeWidth="2"
          />
          <rect
            x="32"
            y="30"
            width="36"
            height="15"
            rx="1"
            fill="oklch(78% 0.2 152 / 0.12)"
            stroke="var(--color-primary)"
            strokeWidth="0.5"
          />
          <path
            d="M75,50 Q95,50 95,75 L95,100"
            stroke="var(--color-primary)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />
          <rect
            x="90"
            y="100"
            width="10"
            height="8"
            rx="1"
            fill="var(--color-primary)"
          />
          <circle className="aw-fuel-drip" cx="95" cy="112" r="2.5" />
        </svg>
      </div>
    </BentoCard>
  );
}

/* ------------------------------------------------------------------ */
/* 7) Performance Analytics (full-width)                               */
/* ------------------------------------------------------------------ */

function PerformanceAnalyticsCard() {
  return (
    <div className="aw-bento-card relative flex h-full flex-col gap-3 overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
      <h3 className="text-xl font-extrabold leading-tight">
        Performance Analytics
      </h3>
      <p className="text-sm leading-relaxed text-[var(--color-text-dim)]">
        Compare setups and visualize ride feel — analyze agility, stability and
        chassis balance scores across your history.
      </p>

      <div className="mt-4 flex flex-col gap-8 md:flex-row md:gap-10">
        <ScoreRow label="Agility" value={88} color="warning" />
        <ScoreRow label="Stability" value={92} color="info" />
      </div>

      <div className="mt-6 rounded-xl border border-white/5 bg-[var(--color-primary)]/[0.02] p-4">
        <div className="mb-2 flex justify-between text-[0.65rem] font-extrabold uppercase text-[var(--color-text-dim)]">
          <span>STABLE</span>
          <span>CHASSIS BALANCE</span>
          <span>AGILE</span>
        </div>
        <div className="aw-balance-bar">
          <motion.div
            initial={{ left: "0%" }}
            whileInView={{ left: "65%" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_#fff]"
          />
        </div>
      </div>
    </div>
  );
}

function ScoreRow({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "warning" | "info";
}) {
  return (
    <div className="flex flex-1 flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <span className="text-[0.7rem] font-extrabold uppercase text-[var(--color-text-dim)]">
          {label}
        </span>
        <span className="font-mono text-sm font-black text-white tabular-nums">
          {value}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className={
            "h-full rounded-full " +
            (color === "warning"
              ? "bg-[var(--color-warning)]"
              : "bg-[oklch(70%_0.18_250)]")
          }
        />
      </div>
    </div>
  );
}
