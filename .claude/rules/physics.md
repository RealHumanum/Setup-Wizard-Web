# Physics & Calculator Reference

Canonical formulas for the sandbox widgets. Implemented as pure functions in `lib/physics.ts`
and `lib/units.ts`. All client-side; no network calls.

## Fuel Wizard (`calcFuel`)
- `liters = durationMin * burnRateLpm + marginL`
- `weightKg = liters * 0.74`  (gasoline density 0.74 kg/L)
- Slider ranges: duration 5–60 (step 1), burn 0.2–1.5 L/min (step 0.05), margin 0.5–5.0 L (step 0.1)

## Suspension Sag (`calcSag`, `sagStatus`)
- `staticSag = fullyExtended - bikeWeightCompressed`
- `riderSag  = fullyExtended - riderLoadedCompressed`
- Target ranges (rider sag): front 30–38 mm, rear 25–30 mm
- Input slider ranges (mm): extended 100–500, compressed lengths 50–450

## Gearing & Geometry (`finalDriveRatio`, `gearingCharacter`)
- `finalDriveRatio = rearTeeth / frontTeeth`
- Higher ratio → more acceleration / lower top speed; lower ratio → taller gearing
- Ranges: front 13–17 T, rear 38–48 T, wheelbase 1350–1500 mm, triple-clamp offset 25–35 mm,
  rake 22.0–26.0° (step 0.1), trail 90–110 mm, fork spring rate 8.0–11.5 N/mm (step 0.25, mixed rates)

## Pressure units (`lib/units.ts`)
- `1 bar = 14.5037738 PSI`; toggle controlled by Zustand `pressure` state.

## Troubleshooter (`lib/troubleshooter.ts`)
Symptom → recommendation map across corner phases (braking, turn-in, mid-corner, acceleration).
Adjustment noun (clicks/turns) and bypass-valve toggle affect the rendered guidance only.
