"use client";

import { useState } from "react";
import { Settings2 } from "lucide-react";
import { InlineMath } from "react-katex";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { finalDriveRatio, gearingCharacter } from "@/lib/physics";

function Row({ label, value, unit, min, max, step, onChange }: { label: string; value: number; unit: string; min: number; max: number; step: number; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm text-[var(--color-text-dim)]">{label}</span>
        <span className="font-mono text-sm font-bold text-[var(--color-primary)]">
          {value} <span className="text-[var(--color-text-muted)]">{unit}</span>
        </span>
      </div>
      <Slider value={[value]} min={min} max={max} step={step} onValueChange={([v]) => onChange(v)} />
    </div>
  );
}

export function GeometryWidget() {
  const [front, setFront] = useState(16);
  const [rear, setRear] = useState(43);
  const [wheelbase, setWheelbase] = useState(1430);
  const [offset, setOffset] = useState(30);
  const [rake, setRake] = useState(24);
  const [trail, setTrail] = useState(100);
  const [springRate, setSpringRate] = useState(9.5);

  const ratio = finalDriveRatio(front, rear);
  const character = gearingCharacter(ratio);

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <Badge>Geometry Sandbox</Badge>
        <CardTitle className="flex items-center gap-2">
          <Settings2 className="size-5 text-[var(--color-primary)]" /> Gearing & Geometry
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <div className="grid grid-cols-2 gap-x-5 gap-y-4">
          <Row label="Front sprocket" value={front} unit="T" min={13} max={17} step={1} onChange={setFront} />
          <Row label="Rear sprocket" value={rear} unit="T" min={38} max={48} step={1} onChange={setRear} />
          <Row label="Wheelbase" value={wheelbase} unit="mm" min={1350} max={1500} step={1} onChange={setWheelbase} />
          <Row label="Triple clamp offset" value={offset} unit="mm" min={25} max={35} step={1} onChange={setOffset} />
          <Row label="Rake angle" value={rake} unit="°" min={22} max={26} step={0.1} onChange={setRake} />
          <Row label="Trail" value={trail} unit="mm" min={90} max={110} step={1} onChange={setTrail} />
        </div>
        <Row label="Fork spring rate (mixed)" value={springRate} unit="N/mm" min={8} max={11.5} step={0.25} onChange={setSpringRate} />

        <div className="mt-auto rounded-xl border border-[var(--color-border-bright)] bg-[var(--color-bg)]/40 p-4">
          <div className="flex items-baseline justify-between">
            <span className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
              Final drive ratio
            </span>
            <span className="font-mono text-2xl font-extrabold text-[var(--color-primary)]">
              {ratio.toFixed(3)}
            </span>
          </div>
          <div className="mt-2 text-center text-xs text-[var(--color-text-muted)]">
            <InlineMath math={`\\frac{${rear}}{${front}} = ${ratio.toFixed(3)}`} />
          </div>
          <p className="mt-3 text-sm text-[var(--color-text-dim)]">{character.label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
