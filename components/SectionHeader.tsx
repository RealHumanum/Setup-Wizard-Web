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
    <div className="mx-auto mb-8 max-w-2xl text-center">
      <Badge>{tag}</Badge>
      <h2 className="mt-4 font-mono text-3xl font-extrabold sm:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-[var(--color-text-dim)]">{sub}</p>}
    </div>
  );
}
