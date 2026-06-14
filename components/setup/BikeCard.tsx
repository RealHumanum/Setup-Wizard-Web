import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Bike } from "@/lib/bikes";
import { adjusterCount } from "@/lib/bikes";

// Compact link card used on the /setup index and manufacturer index grids.
export function BikeCard({ bike }: { bike: Bike }) {
  return (
    <Link
      href={`/setup/${bike.manufacturerSlug}/${bike.modelSlug}`}
      className="group flex items-center justify-between gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 transition-colors hover:border-[var(--color-border-bright)]"
    >
      <div className="min-w-0">
        <div className="truncate font-semibold text-[var(--color-text)]">
          {bike.manufacturer} {bike.model}
        </div>
        <div className="mt-0.5 font-mono text-xs text-[var(--color-text-muted)]">
          {bike.yearRange} · {adjusterCount(bike)} adjusters
        </div>
      </div>
      <ChevronRight className="size-4 shrink-0 text-[var(--color-text-muted)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--color-primary)]" />
    </Link>
  );
}
