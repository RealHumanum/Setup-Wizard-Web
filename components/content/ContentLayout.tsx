import type { ReactNode } from "react";

// Two-column shell: sticky TOC on the left (lg+), article body on the right.
// TOC and article are passed as props so each page composes the structure.
export function ContentLayout({
  toc,
  children,
}: {
  toc: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="relative mx-auto max-w-6xl px-6 pb-24">
      <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        {toc}
        <article className="min-w-0">{children}</article>
      </div>
    </div>
  );
}
