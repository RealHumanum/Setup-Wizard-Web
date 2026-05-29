import Link from "next/link";

interface TocItem {
  id: string;
  label: string;
}

// Server-rendered sticky table-of-contents. Sits in the left column on
// large screens; collapses into a top <details> on mobile/tablet.
export function TableOfContents({ items }: { items: TocItem[] }) {
  return (
    <>
      {/* Mobile / tablet: collapsible */}
      <details className="mb-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-4 py-3 lg:hidden">
        <summary className="cursor-pointer font-mono text-xs font-extrabold uppercase tracking-widest text-[var(--color-primary)]">
          On this page
        </summary>
        <ol className="mt-4 space-y-2 text-sm text-[var(--color-text-dim)]">
          {items.map((item, i) => (
            <li key={item.id} className="flex gap-3">
              <span className="w-5 font-mono text-xs text-[var(--color-text-muted)] tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Link
                href={`#${item.id}`}
                className="transition-colors hover:text-[var(--color-primary)]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ol>
      </details>

      {/* Desktop: sticky sidebar */}
      <aside className="sticky top-28 hidden self-start lg:block">
        <p className="mb-4 font-mono text-[10px] font-extrabold uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
          On this page
        </p>
        <ol className="space-y-2.5 border-l border-[var(--color-border)] pl-4 text-sm text-[var(--color-text-dim)]">
          {items.map((item, i) => (
            <li key={item.id} className="-ml-px border-l border-transparent pl-3 transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]">
              <Link href={`#${item.id}`} className="flex gap-2.5">
                <span className="font-mono text-[10px] text-[var(--color-text-muted)] tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ol>
      </aside>
    </>
  );
}
