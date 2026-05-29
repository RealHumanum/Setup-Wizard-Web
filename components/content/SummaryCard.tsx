import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

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
    <div
      className="my-8 overflow-hidden rounded-3xl border border-[var(--color-border-bright)] bg-[var(--color-surface)] p-6 shadow-[0_0_40px_-12px_var(--color-primary)] sm:p-8"
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 px-3 py-1.5 font-mono text-xs font-extrabold uppercase tracking-widest text-[var(--color-primary)]">
        <Sparkles className="size-3.5" />
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
