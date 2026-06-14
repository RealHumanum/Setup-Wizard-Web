import type { ReactNode } from "react";
import { ListChecks } from "lucide-react";

// "Key Points" TL;DR summary card. Place at the top of a content page,
// directly under the hero, to give the reader the essence in 4-6 bullets.
export function SummaryCard({
  title = "Key Points",
  items,
  children,
}: {
  title?: string;
  items?: ReactNode[];
  children?: ReactNode;
}) {
  return (
    <div className="my-8 overflow-hidden rounded-lg border border-[var(--color-border)] border-l-2 border-l-[var(--color-primary)] bg-[var(--color-surface)] p-6 sm:p-8">
      <div className="mb-4 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--color-primary)]">
        <ListChecks className="size-4" />
        {title}
      </div>
      {items && (
        <ul className="space-y-2.5 text-[15px] leading-relaxed text-[var(--color-text)]">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="mt-2.5 size-1.5 shrink-0 rounded-full"
                style={{ background: "var(--color-primary)" }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
      {children}
    </div>
  );
}
