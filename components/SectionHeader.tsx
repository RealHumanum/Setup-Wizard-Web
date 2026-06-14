import { Badge } from "@/components/ui/badge";

export function SectionHeader({
  tag,
  title,
  sub,
}: {
  tag: string;
  title: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <Badge>{tag}</Badge>
      <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-[2.6rem] sm:leading-[1.05]">
        {title}
      </h2>
      {sub && (
        <p className="mt-4 text-[var(--color-text-dim)] leading-relaxed">{sub}</p>
      )}
    </div>
  );
}
