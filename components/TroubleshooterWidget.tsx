"use client";

import { useState } from "react";
import { Wrench, Brain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { SYMPTOMS } from "@/lib/troubleshooter";
import { useUnitStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function TroubleshooterWidget() {
  const [selected, setSelected] = useState<string | null>(null);
  const [bypass, setBypass] = useState(false);
  const adjust = useUnitStore((s) => s.adjust);

  const symptom = SYMPTOMS.find((s) => s.id === selected);
  const adjustNoun = adjust === "clicks" ? "clicks" : "turns";

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <Badge variant="warning">The Troubleshooter</Badge>
        <CardTitle className="flex items-center gap-2">
          <Wrench className="size-5 text-[var(--color-warning)]" /> Suspension Diagnostics
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <div className="space-y-2">
          {SYMPTOMS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              className={cn(
                "flex min-h-12 w-full items-center justify-between gap-2 rounded-xl border px-4 py-2 text-left text-sm transition-colors",
                selected === s.id
                  ? "border-[var(--color-warning)] bg-[var(--color-warning-dim)] text-[var(--color-text)]"
                  : "border-[var(--color-border)] hover:bg-[var(--color-surface-2)]",
              )}
            >
              <span>{s.label}</span>
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                {s.phase}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between rounded-xl border border-[var(--color-border)] px-4 py-3">
          <span className="text-sm text-[var(--color-text-dim)]">
            Bypass valve / external knob fitted
          </span>
          <Switch checked={bypass} onCheckedChange={setBypass} />
        </div>

        <div className="mt-auto rounded-xl border border-[var(--color-border-bright)] bg-[var(--color-bg)]/40 p-4">
          {symptom ? (
            <div>
              <Badge>Likeliest Fix Identified</Badge>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text)]">
                {symptom.fix}
              </p>
              <p className="mt-3 font-mono text-xs text-[var(--color-text-muted)]">
                Adjustments shown in <strong>{adjustNoun}</strong>
                {bypass
                  ? " · route low-speed changes through the external bypass knob."
                  : "."}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center text-[var(--color-text-muted)]">
              <Brain className="size-6" />
              <p className="mt-2 text-xs font-semibold">
                Select a handling symptom to diagnose.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
