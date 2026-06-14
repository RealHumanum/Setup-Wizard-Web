import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PageHero({
  eyebrow,
  title,
  accent,
  updated,
  intro,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  updated?: string;
  intro?: ReactNode;
  breadcrumb?: { label: string; href?: string }[];
}) {
  return (
    <header className="relative px-6 pt-28 pb-10 sm:pt-32">
      <div className="relative mx-auto max-w-4xl">
        {breadcrumb && (
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-1.5 font-mono text-xs text-[var(--color-text-muted)]"
          >
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="inline-flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="size-3" />}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-[var(--color-primary)]"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[var(--color-text-dim)]">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <Badge>{eyebrow}</Badge>
        <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          {title} <span className="text-[var(--color-primary)]">{accent}</span>
        </h1>

        {intro && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-dim)]">
            {intro}
          </p>
        )}

        {updated && (
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]/60 px-3 py-1.5 font-mono text-xs text-[var(--color-text-muted)]">
            <Clock className="size-3.5" />
            Last updated: <span className="text-[var(--color-text-dim)]">{updated}</span>
          </div>
        )}
      </div>
    </header>
  );
}
