import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-primary-dim)] text-[var(--color-primary)] border border-[var(--color-border-bright)]",
        warning:
          "bg-[var(--color-warning-dim)] text-[var(--color-warning)] border border-[var(--color-warning)]",
        muted:
          "bg-[var(--color-surface-2)] text-[var(--color-text-dim)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
