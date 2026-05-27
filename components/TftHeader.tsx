"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DownloadButtons } from "@/components/DownloadButtons";
import { PhoneMockup } from "@/components/PhoneMockup";

function Clock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="font-mono text-xs tabular-nums text-[var(--color-primary)] sm:text-sm">
      {now
        ? now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
        : "--:--:--"}
    </span>
  );
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      setV(Math.round(to * eased));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return (
    <span className="tabular-nums">
      {v}
      {suffix}
    </span>
  );
}

export function TftHeader() {
  return (
    <header className="relative px-6 pt-28 pb-12 sm:pt-32">
      {/* Ambient glows for depth */}
      <div
        className="aw-glow size-[600px] bg-[var(--color-primary)]"
        style={{ top: "20%", right: "-200px" }}
      />
      <div
        className="aw-glow size-[400px] bg-[var(--color-warning)]"
        style={{ top: "5%", left: "10%", opacity: 0.08 }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-3xl border border-[var(--color-border-bright)] bg-[var(--color-surface)]/80 backdrop-blur-md">
          {/* instrument cluster top bar */}
          <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-bg)]/60 px-5 py-3">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-dim)] sm:text-xs">
              <span className="inline-block size-2 animate-pulse rounded-full bg-[var(--color-primary)]" />
              System Online
            </div>
            <Clock />
          </div>

          <div className="grid items-center gap-12 px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Badge>🏁 The Expert in Your Pocket</Badge>
              <h1 className="mt-6 font-mono text-[2.5rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.25rem]">
                Stop Guessing.
                <br />
                Own the <span className="aw-gradient-text">Track.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-text-dim)] sm:text-lg">
                Professional suspension logbook and expert diagnostic engine.
                Track settings, analyze telemetry, and eliminate guesswork with
                data-driven precision.
              </p>

              <div className="mt-8">
                <DownloadButtons />
              </div>

              {/* Rating badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]/60 px-3 py-1.5"
              >
                <span className="flex gap-0.5 text-[var(--color-warning)]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </span>
                <span className="text-xs font-semibold text-[var(--color-text-dim)]">
                  5.0 on the App Store
                </span>
              </motion.div>

              {/* Stats row */}
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-[var(--color-border)] pt-8">
                <Stat value={<CountUp to={115} suffix="+" />} label="Bikes in Database" />
                <Stat value={<CountUp to={7} />} label="Smart Modules" />
                <Stat value={"Free"} label="To Download" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="hidden justify-center lg:flex"
            >
              <PhoneMockup />
            </motion.div>
          </div>

          {/* Mobile phone */}
          <div className="flex justify-center px-6 pb-12 lg:hidden">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </header>
  );
}

function Stat({
  value,
  label,
}: {
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div>
      <div className="font-mono text-2xl font-black text-white sm:text-3xl">
        {value}
      </div>
      <div className="mt-1 text-[0.65rem] font-bold uppercase tracking-widest text-[var(--color-text-muted)] sm:text-xs">
        {label}
      </div>
    </div>
  );
}
