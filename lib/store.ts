"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UnitSystem = "metric" | "imperial";
export type PressureUnit = "psi" | "bar";
export type AdjustUnit = "clicks" | "turns";

interface UnitState {
  unitSystem: UnitSystem;
  pressure: PressureUnit;
  adjust: AdjustUnit;
  setUnitSystem: (v: UnitSystem) => void;
  setPressure: (v: PressureUnit) => void;
  setAdjust: (v: AdjustUnit) => void;
}

export const useUnitStore = create<UnitState>()(
  persist(
    (set) => ({
      unitSystem: "metric",
      pressure: "psi",
      adjust: "clicks",
      setUnitSystem: (unitSystem) => set({ unitSystem }),
      setPressure: (pressure) => set({ pressure }),
      setAdjust: (adjust) => set({ adjust }),
    }),
    { name: "apex-wizard-units" },
  ),
);
