"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const DEFAULT_ITEMS = [
  "Tire warmers",
  "Front & rear paddock stands",
  "Tire pressure gauge",
  "Torque wrench",
  "10mm socket set",
  "Spare clip-ons & levers",
  "Chain lube",
  "Zip ties & safety wire",
  "Fuel jug (filled)",
  "Leathers, helmet & gloves",
];

export function PitLaneChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <section className="relative px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <Badge variant="warning">Pit-Lane Checklist</Badge>
            <h2 className="mt-3 font-mono text-2xl font-bold sm:text-3xl">
              Pack the paddock.
            </h2>
          </div>
          <span className="font-mono text-sm text-[var(--color-text-dim)]">
            {done}/{DEFAULT_ITEMS.length}
          </span>
        </div>
        <Card className="p-2">
          <ul>
            {DEFAULT_ITEMS.map((item) => {
              const isOn = !!checked[item];
              return (
                <li key={item}>
                  <button
                    onClick={() => setChecked((c) => ({ ...c, [item]: !c[item] }))}
                    className="flex min-h-12 w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition-colors hover:bg-[var(--color-surface-2)]"
                  >
                    <span
                      className={cn(
                        "flex size-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
                        isOn
                          ? "border-[var(--color-primary)] bg-[var(--color-primary)]"
                          : "border-[var(--color-border-bright)]",
                      )}
                    >
                      {isOn && (
                        <Check className="size-4 text-[var(--color-primary-foreground)]" />
                      )}
                    </span>
                    <span
                      className={cn(
                        "text-sm",
                        isOn
                          ? "text-[var(--color-text-muted)] line-through"
                          : "text-[var(--color-text)]",
                      )}
                    >
                      {item}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </section>
  );
}
