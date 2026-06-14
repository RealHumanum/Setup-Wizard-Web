"use client";

import { motion } from "framer-motion";
import {
  Signal,
  Wifi,
  BatteryFull,
  Pencil,
  SlidersHorizontal,
  Settings,
  Home,
  Warehouse,
  Wrench,
  Wrench as WrenchFix,
  ClipboardList,
  Flag,
  LineChart,
} from "lucide-react";

type TabItem = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
};

const TABS: TabItem[] = [
  { icon: Home, label: "HOME", active: true },
  { icon: Warehouse, label: "GARAGE" },
  { icon: Wrench, label: "SERVICE" },
  { icon: ClipboardList, label: "SETUPS" },
  { icon: Flag, label: "TRACK" },
  { icon: LineChart, label: "STATS" },
];

export function PhoneMockup() {
  return (
    <div className="relative mx-auto" style={{ perspective: 1000 }}>
      <motion.div
        initial={{ rotateY: -15, rotateX: 5 }}
        whileHover={{ rotateY: -5, rotateX: 2, y: -10 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="aw-phone-case relative h-[640px] w-[320px] overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="aw-phone-notch" />

        <div className="flex h-full flex-col pt-9">
          {/* Status bar */}
          <div className="mb-3 flex items-center justify-between px-6 text-[11px] font-semibold text-white">
            <span className="font-mono tabular-nums">9:41</span>
            <div className="flex items-center gap-1.5">
              <Signal className="size-3" />
              <Wifi className="size-3" />
              <BatteryFull className="size-3.5" />
            </div>
          </div>

          {/* App nav */}
          <div className="mb-5 flex items-center justify-between px-5">
            <span className="text-[1.4rem] font-extrabold leading-none text-white">
              Apex Wizard
            </span>
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-white/10 text-[var(--color-primary)]">
                <SlidersHorizontal className="size-3.5" />
              </div>
              <div className="flex size-8 items-center justify-center rounded-full bg-white/10 text-[var(--color-primary)]">
                <Settings className="size-3.5" />
              </div>
            </div>
          </div>

          {/* Scroll content */}
          <div className="flex flex-1 flex-col gap-4 overflow-hidden px-4">
            {/* Active Setup */}
            <div className="aw-phone-active-setup rounded-2xl p-5 text-white">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[0.7rem] font-black tracking-[0.1em] opacity-90">
                  ACTIVE SETUP
                </span>
                <div className="flex size-6 items-center justify-center rounded-full bg-white/20">
                  <Pencil className="size-3" />
                </div>
              </div>
              <div className="text-[1.6rem] font-black leading-tight">
                BMW S1000RR
              </div>
              <div className="text-base font-bold opacity-90">
                Misano // Q-Run
              </div>
            </div>

            {/* Tire Pressure */}
            <div className="rounded-2xl border border-white/5 bg-[oklch(22%_0.02_258)] p-5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[0.7rem] font-black tracking-[0.1em] text-[var(--color-text-dim)]">
                  TIRE PRESSURE (PSI)
                </span>
              </div>
              <div className="mt-2 flex items-center overflow-hidden rounded-xl bg-black/25">
                <div className="flex flex-1 flex-col items-center py-3">
                  <span className="text-[0.65rem] font-extrabold text-[var(--color-primary)]">
                    FRONT
                  </span>
                  <span className="font-mono text-lg font-black text-white">
                    33.5
                  </span>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="flex flex-1 flex-col items-center py-3">
                  <span className="text-[0.65rem] font-extrabold text-[var(--color-primary)]">
                    REAR
                  </span>
                  <span className="font-mono text-lg font-black text-white">
                    29.0
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Checks */}
            <div className="rounded-2xl border border-white/5 bg-[oklch(22%_0.02_258)] p-5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[0.7rem] font-black tracking-[0.1em] text-[var(--color-text-dim)]">
                  QUICK CHECKS
                </span>
              </div>
              <div className="mt-2 flex gap-2">
                <ToggleChip active>TC // 4</ToggleChip>
                <ToggleChip active>EB // 2</ToggleChip>
                <ToggleChip>ABS // 0</ToggleChip>
              </div>
            </div>
          </div>

          {/* Tab bar */}
          <div className="relative mt-3 flex h-[70px] items-center justify-around border-t border-white/5 bg-[oklch(15%_0.02_258)]">
            {TABS.slice(0, 3).map((t) => (
              <TabIcon key={t.label} {...t} />
            ))}
            {/* Pop-out FIX button */}
            <div className="relative -mt-6 flex size-11 items-center justify-center rounded-full text-white aw-phone-tab-fix">
              <WrenchFix className="size-5" />
            </div>
            {TABS.slice(3).map((t) => (
              <TabIcon key={t.label} {...t} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ToggleChip({
  active,
  children,
}: {
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        "flex-1 rounded-[10px] py-2.5 text-center text-[0.75rem] font-extrabold " +
        (active
          ? "border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
          : "bg-white/5 text-[var(--color-text-dim)]")
      }
    >
      {children}
    </div>
  );
}

function TabIcon({
  icon: Icon,
  label,
  active,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={
        "flex flex-1 flex-col items-center justify-center gap-0.5 " +
        (active
          ? "text-[var(--color-primary)] opacity-100"
          : "text-[var(--color-text-dim)] opacity-60")
      }
    >
      <Icon className="size-4" />
      <span className="text-[0.45rem] font-extrabold tracking-wide">
        {label}
      </span>
    </div>
  );
}
