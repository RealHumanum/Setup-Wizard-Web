"use client";

import { useState } from "react";
import { Fuel } from "lucide-react";
import { InlineMath } from "react-katex";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { calcFuel } from "@/lib/physics";

function Row({
  label,
  value,
  unit,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm text-[var(--color-text-dim)]">{label}</span>
        <span className="font-mono text-sm font-bold text-[var(--color-primary)]">
          {value} <span className="text-[var(--color-text-muted)]">{unit}</span>
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]) => onChange(v)}
      />
    </div>
  );
}

export function FuelWizardWidget() {
  const [duration, setDuration] = useState(20);
  const [burn, setBurn] = useState(0.65);
  const [margin, setMargin] = useState(1.5);

  const { liters, weightKg } = calcFuel(duration, burn, margin);

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <Badge>Fuel Wizard</Badge>
        <CardTitle className="flex items-center gap-2">
          <Fuel className="size-5 text-[var(--color-primary)]" /> Volumetric Fuel Planner
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-5">
        <Row label="Session duration" value={duration} unit="min" min={5} max={60} step={1} onChange={setDuration} />
        <Row label="Avg burn rate" value={burn} unit="L/min" min={0.2} max={1.5} step={0.05} onChange={setBurn} />
        <Row label="Safety margin" value={margin} unit="L" min={0.5} max={5} step={0.1} onChange={setMargin} />

        <div className="mt-auto grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-[var(--color-border-bright)] bg-[var(--color-bg)]/40 p-4 text-center">
            <p className="font-mono text-3xl font-extrabold text-[var(--color-primary)]">
              {liters.toFixed(2)}
            </p>
            <p className="mt-1 text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
              Liters required
            </p>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]/40 p-4 text-center">
            <p className="font-mono text-3xl font-extrabold text-[var(--color-warning)]">
              {weightKg.toFixed(2)}
            </p>
            <p className="mt-1 text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
              kg of dead weight
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg bg-[var(--color-surface-2)] px-4 py-3 text-center">
          <InlineMath math={`fuel = ${duration} \\times ${burn} + ${margin} = ${liters.toFixed(2)}\\,L`} />
        </div>
      </CardContent>
    </Card>
  );
}
