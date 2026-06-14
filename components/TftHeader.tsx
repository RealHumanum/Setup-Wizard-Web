import Image from "next/image";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DownloadButtons } from "@/components/DownloadButtons";
import { PhoneMockup } from "@/components/PhoneMockup";

export function TftHeader() {
  return (
    <header className="relative overflow-hidden px-6 pt-32 pb-16 sm:pt-40 sm:pb-20">
      {/* Full-bleed track photo, heavily darkened so the headline + phone stay crisp. */}
      <Image
        src="/assets/hero-track.jpg"
        alt=""
        aria-hidden
        fill
        priority
        unoptimized
        sizes="100vw"
        className="absolute inset-0 -z-10 object-cover object-center opacity-45 sm:opacity-40"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-0"
        style={{
          background:
            "linear-gradient(100deg, var(--color-bg) 12%, oklch(17% 0.04 262 / 0.66) 46%, oklch(17% 0.04 262 / 0.30) 100%)," +
            "linear-gradient(to bottom, transparent 58%, var(--color-bg) 97%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div>
          <Badge>The Expert in Your Pocket</Badge>
          <h1 className="mt-6 font-display text-[2.75rem] font-extrabold leading-[0.98] tracking-tight sm:text-6xl lg:text-[4.5rem]">
            Stop Guessing.
            <br />
            Own the <span className="text-[var(--color-primary)]">Track.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-text-dim)] sm:text-lg">
            A professional suspension logbook and expert diagnostic engine. Track
            your settings, read the telemetry, and turn guesswork into data-driven
            precision.
          </p>

          <div className="mt-8">
            <DownloadButtons />
          </div>

          {/* Rating */}
          <div className="mt-6 inline-flex items-center gap-2.5 border-l-2 border-[var(--color-primary)] pl-3">
            <span className="flex gap-0.5 text-[var(--color-warning)]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </span>
            <span className="text-xs font-semibold text-[var(--color-text-dim)]">
              5.0 on the App Store
            </span>
          </div>

          {/* Spec-strip stats */}
          <div className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-[var(--color-border)] pt-8">
            <Stat value="115+" label="Bikes in Database" />
            <Stat value="7" label="Smart Modules" />
            <Stat value="Free" label="To Download" />
          </div>
        </div>

        <div className="hidden justify-center lg:flex">
          <PhoneMockup />
        </div>

        {/* Mobile phone */}
        <div className="flex justify-center lg:hidden">
          <PhoneMockup />
        </div>
      </div>
    </header>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-mono text-2xl font-black tabular-nums text-[var(--color-text)] sm:text-3xl">
        {value}
      </div>
      <div className="mt-1.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--color-text-muted)] sm:text-xs">
        {label}
      </div>
    </div>
  );
}
