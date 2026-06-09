import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Guide } from "@/lib/guides";
import { guidePath } from "@/lib/guides";

// Card for the /guides hub and "related guides" rails.
export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link
      href={guidePath(guide.slug)}
      className="group flex h-full flex-col rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-6 transition-colors hover:border-[var(--color-border-bright)] hover:bg-[var(--color-surface)]"
    >
      <div className="mb-3 flex items-center gap-2 font-mono text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--color-primary)]">
        {guide.eyebrow}
      </div>
      <h3 className="font-mono text-lg font-extrabold leading-snug text-[var(--color-text)]">
        {guide.shortTitle}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-text-dim)]">
        {guide.description}
      </p>
      <div className="mt-4 flex items-center justify-between font-mono text-xs text-[var(--color-text-muted)]">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-3.5" /> {guide.readMinutes} min
        </span>
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--color-primary)]" />
      </div>
    </Link>
  );
}
