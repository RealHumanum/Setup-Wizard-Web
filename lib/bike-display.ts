// Presentation helpers for the per-bike setup pages. Turns the raw capability
// booleans in lib/bikes.ts into rider-facing copy and per-bike FAQ entries.
// Teaser only — never exposes exact clicker limits.

import type { Bike } from "@/lib/bikes";
import type { FaqItem } from "@/lib/schema";

export interface AdjusterRow {
  label: string;
  present: boolean;
}

const FRONT: { key: keyof Bike["adjusters"]; label: string }[] = [
  { key: "frontCompression", label: "Low-speed compression" },
  { key: "frontHighSpeedCompression", label: "High-speed compression" },
  { key: "frontRebound", label: "Rebound damping" },
  { key: "frontHighSpeedRebound", label: "High-speed rebound" },
  { key: "frontPreload", label: "Spring preload" },
  { key: "forkHeight", label: "Fork height (ride height)" },
  { key: "frontSpringRate", label: "Spring rate (swappable)" },
];

const REAR: { key: keyof Bike["adjusters"]; label: string }[] = [
  { key: "rearCompression", label: "Low-speed compression" },
  { key: "rearHighSpeedCompression", label: "High-speed compression" },
  { key: "rearRebound", label: "Rebound damping" },
  { key: "rearHighSpeedRebound", label: "High-speed rebound" },
  { key: "rearPreload", label: "Spring preload" },
  { key: "shockLength", label: "Ride height (shock length)" },
  { key: "rearSpringRate", label: "Spring rate (swappable)" },
];

export function frontRows(bike: Bike): AdjusterRow[] {
  return FRONT.map((a) => ({ label: a.label, present: bike.adjusters[a.key] }));
}

export function rearRows(bike: Bike): AdjusterRow[] {
  return REAR.map((a) => ({ label: a.label, present: bike.adjusters[a.key] }));
}

function presentLabels(rows: AdjusterRow[]): string[] {
  return rows.filter((r) => r.present).map((r) => r.label.toLowerCase());
}

/** Natural-language list: ["a","b","c"] -> "a, b and c". */
function joinList(items: string[]): string {
  if (items.length === 0) return "no clicker adjustment";
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export function bikeFullName(bike: Bike): string {
  return `${bike.manufacturer} ${bike.model}`;
}

export function bikeNameWithYears(bike: Bike): string {
  return `${bike.manufacturer} ${bike.model} (${bike.yearRange})`;
}

const hasFrontDamping = (b: Bike) =>
  b.adjusters.frontCompression || b.adjusters.frontRebound;
const hasHsc = (b: Bike) =>
  b.adjusters.frontHighSpeedCompression || b.adjusters.rearHighSpeedCompression;

/** Honest, data-driven FAQ — unique per bike, feeds FAQPage schema. */
export function bikeFaqItems(bike: Bike): FaqItem[] {
  const name = bikeFullName(bike);
  const front = presentLabels(frontRows(bike));
  const rear = presentLabels(rearRows(bike));

  const items: FaqItem[] = [
    {
      q: `What suspension adjustments does the ${name} have?`,
      a: `Up front the ${bike.model} offers ${joinList(front)}. At the rear it offers ${joinList(
        rear,
      )}. Tyre pressure and chassis geometry round out the picture. Apex Wizard stores the factory-accurate clicker limits for each of these so you always know how many clicks of range you actually have.`,
    },
    {
      q: `Does the ${name} have high-speed compression adjustment?`,
      a: hasHsc(bike)
        ? `Yes. The ${bike.model} splits compression damping into separate high- and low-speed circuits${
            bike.adjusters.frontHighSpeedCompression && bike.adjusters.rearHighSpeedCompression
              ? " at both ends"
              : bike.adjusters.frontHighSpeedCompression
                ? " on the front"
                : " on the rear"
          }, so you can tune sharp kerb and bump absorption separately from braking and drive pitch.`
        : `No. The ${bike.model} uses a single compression circuit (low-speed only)${
            hasFrontDamping(bike)
              ? ", so kerb harshness and braking dive share one adjuster"
              : ", and adjustment up front is limited to preload and ride height"
          }. Most riders won't miss high-speed adjustment on a road or club-level track bike.`,
    },
    {
      q: `What suspension sag should I set on the ${name}?`,
      a: `As a starting point for a sportbike, aim for roughly 30–38 mm of front rider sag and 25–30 mm at the rear, then confirm against the service manual. Always set sag before touching any clicker — it's the geometry baseline everything else depends on.`,
    },
  ];
  return items;
}
