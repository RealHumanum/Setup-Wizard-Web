import { ChevronDown } from "lucide-react";

interface FaqEntry {
  q: string;
  a: string;
}

// Accessible FAQ accordion built on native <details>/<summary> so it works
// without client JS (static export friendly). Plain string answers.
export function Faq({ items }: { items: FaqEntry[] }) {
  return (
    <div className="mt-4 space-y-3">
      {items.map((item) => (
        <details
          key={item.q}
          className="group/faq overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 transition-colors open:border-[var(--color-border-bright)]"
        >
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-[var(--color-text)] [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            <ChevronDown className="size-5 shrink-0 text-[var(--color-text-muted)] transition-transform group-open/faq:rotate-180" />
          </summary>
          <div className="px-5 pb-5 text-sm leading-relaxed text-[var(--color-text-dim)]">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}
