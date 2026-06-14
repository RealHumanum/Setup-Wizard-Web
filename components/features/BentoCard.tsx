// Shared bento card chrome used by every feature card.
// Standardises the rounded-3xl surface, hover lift behaviour, header
// title + description and the body slot.
export function BentoCard({
  title,
  desc,
  children,
  className = "",
}: {
  title: string;
  desc?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "aw-bento-card relative flex h-full min-h-[420px] flex-col gap-3 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 " +
        className
      }
    >
      <h3 className="font-display text-xl font-extrabold leading-tight tracking-tight">
        {title}
      </h3>
      {desc ? (
        <p className="text-sm leading-relaxed text-[var(--color-text-dim)]">
          {desc}
        </p>
      ) : null}
      {children}
    </div>
  );
}
