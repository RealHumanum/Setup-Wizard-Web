import type { ReactNode } from "react";

export function ContentPage({
  title,
  accent,
  updated,
  children,
}: {
  title: string;
  accent: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <main className="relative px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 text-center">
          <h1 className="font-mono text-4xl font-extrabold sm:text-5xl">
            {title} <span className="aw-gradient-text">{accent}</span>
          </h1>
          {updated && (
            <p className="mt-3 text-sm text-[var(--color-text-muted)]">
              Last updated: {updated}
            </p>
          )}
        </header>
        <article
          className="space-y-5 leading-relaxed text-[var(--color-text-dim)] [&_a]:text-[var(--color-primary)] [&_a:hover]:brightness-110 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[var(--color-text)] [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-[var(--color-text)] [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-[var(--color-text)] [&_ul]:space-y-2"
        >
          {children}
        </article>
      </div>
    </main>
  );
}
