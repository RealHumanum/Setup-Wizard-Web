"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { DownloadButtons } from "@/components/DownloadButtons";
import { UnitToggleBar } from "@/components/UnitToggleBar";

function Clock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    // Mount-only: render a placeholder on the server, then start the clock
    // client-side to avoid a hydration mismatch on the live time string.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="font-mono text-sm tabular-nums text-[var(--color-primary)]">
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

export function TftHeader() {
  return (
    <header className="relative px-6 pt-28 pb-12">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-3xl border border-[var(--color-border-bright)] bg-[var(--color-surface)] backdrop-blur-md">
          {/* instrument cluster top bar */}
          <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-bg)]/40 px-5 py-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--color-text-dim)]">
              <span className="inline-block size-2 animate-pulse rounded-full bg-[var(--color-primary)]" />
              System Online
            </div>
            <Clock />
          </div>

          <div className="px-6 py-10 sm:px-10 sm:py-14">
            <Badge>The Expert in Your Pocket</Badge>
            <h1 className="mt-5 font-mono text-4xl font-extrabold leading-tight sm:text-6xl">
              Stop Guessing.
              <br />
              Own the <span className="aw-gradient-text">Track.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base text-[var(--color-text-dim)] sm:text-lg">
              Professional suspension logbook and expert diagnostic engine. Track settings,
              analyze telemetry, and eliminate guesswork with data-driven precision.
            </p>

            <div className="mt-8">
              <DownloadButtons />
            </div>

            <div className="mt-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]/40 p-4">
              <p className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                Sandbox Unit System
              </p>
              <UnitToggleBar />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
