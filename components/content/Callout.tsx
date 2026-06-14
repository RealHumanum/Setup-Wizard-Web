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
    bg: "oklch(73% 0.19 149 / 0.06)",
    border: "oklch(73% 0.19 149 / 0.30)",
  },
  tip: {
    icon: Lightbulb,
    color: "var(--color-primary)",
    bg: "oklch(73% 0.19 149 / 0.05)",
    border: "oklch(73% 0.19 149 / 0.22)",
  },
  warning: {
    icon: AlertTriangle,
    color: "var(--color-warning)",
    bg: "oklch(70% 0.19 48 / 0.07)",
    border: "oklch(70% 0.19 48 / 0.32)",
  },
  danger: {
    icon: ShieldAlert,
    color: "var(--color-danger)",
    bg: "oklch(64% 0.22 27 / 0.07)",
    border: "oklch(64% 0.22 27 / 0.32)",
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
      className="my-6 flex gap-4 rounded-lg border border-l-2 p-5"
      style={{ background: v.bg, borderColor: v.border, borderLeftColor: v.color }}
    >
      <Icon className="mt-0.5 size-5 shrink-0" style={{ color: v.color }} />
      <div className="flex-1">
        {title && (
          <div
            className="mb-1 text-xs font-extrabold uppercase tracking-[0.16em]"
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
