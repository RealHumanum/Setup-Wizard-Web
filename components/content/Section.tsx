import type { ReactNode } from "react";
import { Link as LinkIcon } from "lucide-react";

// Anchored section with hover-revealed anchor link. id MUST match the
// TableOfContents items so the in-page links resolve.
export function Section({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="group/section scroll-mt-28">
      <h2 className="mt-12 flex items-baseline gap-3 font-mono text-2xl font-extrabold leading-tight text-[var(--color-text)] sm:text-3xl">
        {number && (
          <span className="text-[var(--color-primary)] tabular-nums">
            {number}
          </span>
        )}
        <span>{title}</span>
        <a
          href={`#${id}`}
          aria-label={`Link to ${title}`}
          className="opacity-0 transition-opacity group-hover/section:opacity-60 hover:!opacity-100"
        >
          <LinkIcon className="size-4 text-[var(--color-text-muted)]" />
        </a>
      </h2>
      <div className="mt-4 space-y-4 leading-relaxed text-[var(--color-text-dim)] [&_p_a]:text-[var(--color-primary)] [&_p_a:hover]:brightness-110 [&_li_a]:text-[var(--color-primary)] [&_li_a:hover]:brightness-110 [&_h3]:mt-6 [&_h3]:font-mono [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-[var(--color-text)] [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-[var(--color-text)] [&_ul]:space-y-2.5">
        {children}
      </div>
    </section>
  );
}
