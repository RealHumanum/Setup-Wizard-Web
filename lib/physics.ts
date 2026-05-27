// Pure suspension / fuel / gearing math. 100% client-side, no telemetry.
import { KG_PER_LITER_GASOLINE, round } from "./units";

/* ---------------------------------- Fuel ---------------------------------- */

export interface FuelResult {
  liters: number;
  weightKg: number;
}

export function calcFuel(
  durationMin: number,
  burnRateLpm: number,
  marginL: number,
): FuelResult {
  const liters = durationMin * burnRateLpm + marginL;
  return {
    liters: round(liters, 2),
    weightKg: round(liters * KG_PER_LITER_GASOLINE, 2),
  };
}

/* ----------------------------------- Sag ---------------------------------- */

export type SagStatus = "low" | "in-range" | "high";

export interface SagRange {
  min: number;
  max: number;
}

export const SAG_TARGET = {
  front: { min: 30, max: 38 } as SagRange,
  rear: { min: 25, max: 30 } as SagRange,
};

export function calcSag(extended: number, compressed: number): number {
  return round(extended - compressed, 1);
}

export function sagStatus(value: number, range: SagRange): SagStatus {
  if (value < range.min) return "low";
  if (value > range.max) return "high";
  return "in-range";
}

/* -------------------------------- Gearing --------------------------------- */

export function finalDriveRatio(front: number, rear: number): number {
  return round(rear / front, 3);
}

// Higher ratio => more acceleration / lower top speed.
export function gearingCharacter(ratio: number): {
  bias: "acceleration" | "balanced" | "top-speed";
  label: string;
} {
  if (ratio >= 3.1)
    return {
      bias: "acceleration",
      label: "Short gearing — stronger drive off corners, lower top speed.",
    };
  if (ratio <= 2.5)
    return {
      bias: "top-speed",
      label: "Tall gearing — higher top speed, softer initial acceleration.",
    };
  return {
    bias: "balanced",
    label: "Balanced gearing — even spread of drive and top speed.",
  };
}
