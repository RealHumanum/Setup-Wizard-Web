"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useUnitStore } from "@/lib/store";

export function UnitToggleBar() {
  const { unitSystem, pressure, adjust, setUnitSystem, setPressure, setAdjust } =
    useUnitStore();

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
      <UnitGroup
        label="Units"
        value={unitSystem}
        onChange={(v) => setUnitSystem(v as "metric" | "imperial")}
        options={[
          ["metric", "Metric"],
          ["imperial", "Imperial"],
        ]}
      />
      <UnitGroup
        label="Pressure"
        value={pressure}
        onChange={(v) => setPressure(v as "psi" | "bar")}
        options={[
          ["psi", "PSI"],
          ["bar", "Bar"],
        ]}
      />
      <UnitGroup
        label="Adjust"
        value={adjust}
        onChange={(v) => setAdjust(v as "clicks" | "turns")}
        options={[
          ["clicks", "Clicks"],
          ["turns", "Turns"],
        ]}
      />
    </div>
  );
}

function UnitGroup({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="uppercase tracking-widest text-[var(--color-text-muted)]">
        {label}
      </span>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(v) => v && onChange(v)}
      >
        {options.map(([val, text]) => (
          <ToggleGroupItem key={val} value={val} className="min-h-9 px-3">
            {text}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
