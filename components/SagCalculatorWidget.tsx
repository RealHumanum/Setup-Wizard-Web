"use client";

import { useState } from "react";
import { Ruler } from "lucide-react";
import { InlineMath } from "react-katex";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calcSag, sagStatus, SAG_TARGET } from "@/lib/physics";
import { cn } from "@/lib/utils";

const STATUS_COPY = {
  low: { label: "Too little sag", color: "var(--color-warning)" },
  "in-range": { label: "On target", color: "var(--color-primary)" },
  high: { label: "Too much sag", color: "var(--color-warning)" },
};

function Row({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm text-[var(--color-text-dim)]">{label}</span>
        <span className="font-mono text-sm font-bold text-[var(--color-primary)]">
          {value} <span className="text-[var(--color-text-muted)]">mm</span>
        </span>
      </div>
      <Slider value={[value]} min={min} max={max} step={1} onValueChange={([v]) => onChange(v)} />
    </div>
  );
}

export function SagCalculatorWidget() {
  const [extended, setExtended] = useState(300);
  const [bikeComp, setBikeComp] = useState(295);
  const [riderComp, setRiderComp] = useState(267);
  const [end, setEnd] = useState<"front" | "rear">("front");

  const staticSag = calcSag(extended, bikeComp);
  const riderSag = calcSag(extended, riderComp);
  const range = SAG_TARGET[end];
  const status = sagStatus(riderSag, range);
  const copy = STATUS_COPY[status];

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <Badge>Sag Logbook</Badge>
        <CardTitle className="flex items-center gap-2">
          <Ruler className="size-5 text-[var(--color-primary)]" /> Suspension Sag Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-5">
        <Tabs value={end} onValueChange={(v) => setEnd(v as "front" | "rear")}>
          <TabsList className="w-full">
            <TabsTrigger value="front" className="flex-1">
              Front ({SAG_TARGET.front.min}-{SAG_TARGET.front.max}mm)
            </TabsTrigger>
            <TabsTrigger value="rear" className="flex-1">
              Rear ({SAG_TARGET.rear.min}-{SAG_TARGET.rear.max}mm)
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Row label="Fully extended" value={extended} min={100} max={500} onChange={setExtended} />
        <Row label="Bike weight compressed" value={bikeComp} min={50} max={450} onChange={setBikeComp} />
        <Row label="Rider-on-bike compressed" value={riderComp} min={50} max={450} onChange={setRiderComp} />

        <div className="mt-auto grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]/40 p-4 text-center">
            <p className="font-mono text-2xl font-extrabold">{staticSag} mm</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
              Static sag
            </p>
            <div className="mt-1 text-[10px] text-[var(--color-text-muted)]">
              <InlineMath math={`${extended}-${bikeComp}`} />
            </div>
          </div>
          <div
            className="rounded-xl border bg-[var(--color-bg)]/40 p-4 text-center"
            style={{ borderColor: copy.color }}
          >
            <p className="font-mono text-2xl font-extrabold" style={{ color: copy.color }}>
              {riderSag} mm
            </p>
            <p className="mt-1 text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
              Rider sag
            </p>
            <div className="mt-1 text-[10px] text-[var(--color-text-muted)]">
              <InlineMath math={`${extended}-${riderComp}`} />
            </div>
          </div>
        </div>

        <div
          className={cn("rounded-lg px-4 py-2 text-center text-sm font-semibold")}
          style={{ background: "var(--color-surface-2)", color: copy.color }}
        >
          {end === "front" ? "Front" : "Rear"}: {copy.label}
        </div>
      </CardContent>
    </Card>
  );
}
