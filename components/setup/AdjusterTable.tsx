import { Check, Minus } from "lucide-react";
import type { AdjusterRow } from "@/lib/bike-display";

// Front/rear adjuster capability column: present adjusters get a green check,
// absent ones a muted dash. Pure presentation — no clicker numbers.
export function AdjusterColumn({
  title,
  rows,
}: {
  title: string;
  rows: AdjusterRow[];
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-5">
      <h3 className="mb-3 font-mono text-sm font-extrabold uppercase tracking-widest text-[var(--color-primary)]">
        {title}
      </h3>
      <ul className="space-y-2">
        {rows.map((row) => (
          <li
            key={row.label}
            className="flex items-center gap-3 text-sm"
          >
            {row.present ? (
              <Check className="size-4 shrink-0 text-[var(--color-primary)]" />
            ) : (
              <Minus className="size-4 shrink-0 text-[var(--color-text-muted)]" />
            )}
            <span
              className={
                row.present
                  ? "text-[var(--color-text)]"
                  : "text-[var(--color-text-muted)] line-through decoration-[var(--color-border-bright)]"
              }
            >
              {row.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
