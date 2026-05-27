// Pure unit-conversion helpers. No side effects, no I/O — safe to unit test.

export const PSI_PER_BAR = 14.5037738;
export const KG_PER_LITER_GASOLINE = 0.74;

export function psiToBar(psi: number): number {
  return psi / PSI_PER_BAR;
}

export function barToPsi(bar: number): number {
  return bar * PSI_PER_BAR;
}

export function formatPressure(psi: number, unit: "psi" | "bar"): string {
  return unit === "psi"
    ? `${psi.toFixed(1)} PSI`
    : `${psiToBar(psi).toFixed(2)} bar`;
}

export function round(value: number, decimals = 2): number {
  const f = 10 ** decimals;
  return Math.round(value * f) / f;
}
