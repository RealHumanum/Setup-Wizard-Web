import type { ReactNode } from "react";
import { AlertTriangle, Info, ShieldAlert, Lightbulb } from "lucide-react";

type Variant = "info" | "warning" | "danger" | "tip";

const VARIANTS: Record<
  Variant,
  { icon: typeof Info; color: string; bg: string; border: string }
> = {
  info: {
    icon: Info,
    color: "var(--color-primary)",
    bg: "oklch(78% 0.2 152 / 0.06)",
    border: "oklch(78% 0.2 152 / 0.35)",
  },
  tip: {
    icon: Lightbulb,
    color: "var(--color-primary)",
    bg: "oklch(78% 0.2 152 / 0.05)",
    border: "oklch(78% 0.2 152 / 0.25)",
  },
  warning: {
    icon: AlertTriangle,
    color: "var(--color-warning)",
    bg: "oklch(72% 0.19 55 / 0.06)",
    border: "oklch(72% 0.19 55 / 0.35)",
  },
  danger: {
    icon: ShieldAlert,
    color: "var(--color-danger)",
    bg: "oklch(63% 0.22 25 / 0.06)",
    border: "oklch(63% 0.22 25 / 0.35)",
  },
};

export function Callout({
  variant = "info",
  title,
  children,
}: {
  variant?: Variant;
  title?: string;
  children: ReactNode;
}) {
  const v = VARIANTS[variant];
  const Icon = v.icon;
  return (
    <div
      className="my-6 flex gap-4 rounded-2xl border p-5"
      style={{ background: v.bg, borderColor: v.border }}
    >
      <Icon className="mt-0.5 size-5 shrink-0" style={{ color: v.color }} />
      <div className="flex-1">
        {title && (
          <div
            className="mb-1 font-mono text-xs font-extrabold uppercase tracking-widest"
            style={{ color: v.color }}
          >
            {title}
          </div>
        )}
        <div className="text-sm leading-relaxed text-[var(--color-text)] [&>*+*]:mt-2 [&_a]:text-[var(--color-primary)] [&_strong]:text-[var(--color-text)]">
          {children}
        </div>
      </div>
    </div>
  );
}
