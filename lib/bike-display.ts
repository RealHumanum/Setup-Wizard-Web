// Presentation helpers for the per-bike setup pages. Turns the raw capability
// booleans in lib/bikes.ts into rider-facing copy and per-bike FAQ entries.
// Teaser only — never exposes exact clicker limits.

import { BIKES, type Bike } from "@/lib/bikes";
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

// ---------------------------------------------------------------------------
// Adjustability tier
//
// The dataset holds only 9 distinct adjuster profiles across ~190 bikes, so
// rendering the same body copy for every one produces ~21 near-identical pages
// per profile. Tiering the profiles lets each page carry guidance that actually
// applies to the hardware it has. Derived from the booleans rather than matched
// against known profiles, so a database regeneration can't silently break it.
// ---------------------------------------------------------------------------

/** race: high-speed circuits · full: comp+rebound both ends · partial: some
 *  damping · preload: no damping clickers at all. */
export type AdjustabilityTier = "race" | "full" | "partial" | "preload";

const anyHighSpeed = (b: Bike) =>
  b.adjusters.frontHighSpeedCompression ||
  b.adjusters.frontHighSpeedRebound ||
  b.adjusters.rearHighSpeedCompression ||
  b.adjusters.rearHighSpeedRebound;

const fullDamping = (b: Bike) =>
  b.adjusters.frontCompression &&
  b.adjusters.frontRebound &&
  b.adjusters.rearCompression &&
  b.adjusters.rearRebound;

const anyDamping = (b: Bike) =>
  b.adjusters.frontCompression ||
  b.adjusters.frontRebound ||
  b.adjusters.rearCompression ||
  b.adjusters.rearRebound;

export function adjustabilityTier(b: Bike): AdjustabilityTier {
  if (fullDamping(b) && anyHighSpeed(b)) return "race";
  if (fullDamping(b)) return "full";
  if (anyDamping(b)) return "partial";
  return "preload";
}

/** Compact phrase for meta descriptions — must stay short enough that the bike
 *  name plus this still fits the 155-char description budget. */
export function tierSummary(b: Bike): string {
  switch (adjustabilityTier(b)) {
    case "race":
      return "high- and low-speed damping, preload and ride height";
    case "full":
      return "compression, rebound and preload front and rear";
    case "partial": {
      const present = [
        b.adjusters.frontCompression && "front compression",
        b.adjusters.frontRebound && "front rebound",
        b.adjusters.rearCompression && "rear compression",
        b.adjusters.rearRebound && "rear rebound",
      ].filter(Boolean) as string[];
      return `${joinList(present)} plus preload`;
    }
    case "preload":
      return "preload and ride height only, no damping clickers";
  }
}

// ---------------------------------------------------------------------------
// Per-bike page content
//
// Everything below varies with real fields (tier, category, year range), so no
// two adjuster/category combinations read the same. Nothing here invents a spec
// the dataset doesn't contain — the teaser rule still holds: capabilities yes,
// exact clicker counts no.
// ---------------------------------------------------------------------------

/** Tier-specific setup guidance. Genuinely different advice, not a reworded
 *  template — a preload-only bike and a high-speed-adjustable bike have almost
 *  nothing in common in how you approach them. */
export function tierGuidance(bike: Bike): { lead: string; points: string[] } {
  const model = bike.model;
  switch (adjustabilityTier(bike)) {
    case "race":
      return {
        lead: `The ${model} splits damping into separate high- and low-speed circuits, which is the most adjustment you'll find on a production bike — and the easiest to get lost in.`,
        points: [
          "Low-speed circuits control what the rider does: braking dive, throttle squat, weight transfer. Start here — this is where lap time lives.",
          "High-speed circuits control what the track does: kerbs, ripples, sharp bumps. Only touch these once low-speed is settled and you can name the bump that's upsetting you.",
          "Because the circuits interact, change one at a time and re-ride the same reference corner. Two changes at once on this bike tells you nothing.",
        ],
      };
    case "full":
      return {
        lead: `The ${model} gives you compression and rebound at both ends — enough to fix almost any handling complaint without touching springs.`,
        points: [
          "Compression controls how fast the suspension collapses under load; rebound controls how fast it returns. Most riders over-damp rebound chasing a compression problem.",
          "There's no high-speed circuit here, so kerb harshness and braking dive share one adjuster at each end. If a bump fix ruins your braking feel, the fix is usually pressure or sag, not the clicker.",
          "Work front and rear as a pair. Changing only one end moves the bike's balance as much as it changes the symptom.",
        ],
      };
    case "partial":
      return {
        lead: `The ${model} offers ${tierSummary(bike)} — a partial set, so some fixes have to come from somewhere other than a clicker.`,
        points: [
          "Use the damping you do have for its primary job, and don't try to make it compensate for the circuit that's missing.",
          "With limited damping adjustment, tyre pressure and sag carry proportionally more of the setup. Get both exact before you touch anything else.",
          "If you keep running out of adjustment in one direction, that's a spring rate or oil condition signal — not a reason to wind the clicker to its stop.",
        ],
      };
    case "preload":
      return {
        lead: `The ${model} has no damping clickers. That isn't a dead end — it means your setup levers are geometry, springs and pressure, and they're powerful ones.`,
        points: [
          "Preload and ride height are your primary tools. Setting sag correctly is not a preliminary step on this bike, it is the setup.",
          "Tyre pressure has more effect here than on any adjustable bike, because it's the only damping-adjacent variable you control. Log it every session.",
          "If the bike is still wrong with sag and pressure correct, the honest next step is springs matched to your weight, or a cartridge/shock upgrade — not more fiddling.",
        ],
      };
  }
}

/** Honest constraint copy: what this bike simply cannot be adjusted for.
 *  Genuinely useful — it stops riders chasing a fix their hardware can't make. */
export function cannotTune(bike: Bike): string[] {
  const a = bike.adjusters;
  const gaps: string[] = [];
  if (!a.frontCompression && !a.frontRebound)
    gaps.push(
      "No front damping adjustment — fork dive and front-end harshness have to be managed with preload, fork height, spring rate and tyre pressure.",
    );
  else {
    if (!a.frontCompression)
      gaps.push("No front compression adjuster — control dive with preload, fork height and spring rate.");
    if (!a.frontRebound)
      gaps.push("No front rebound adjuster — if the front packs down over successive bumps, look at oil condition and spring rate.");
  }
  if (!a.rearCompression && !a.rearRebound)
    gaps.push(
      "No rear damping adjustment — squat and rear grip come from preload, ride height and pressure alone.",
    );
  else {
    if (!a.rearCompression)
      gaps.push("No rear compression adjuster — manage squat under drive with ride height and preload.");
    if (!a.rearRebound)
      gaps.push("No rear rebound adjuster — a rear that pogos after kerbs is a spring rate or shock condition problem.");
  }
  if (!anyHighSpeed(bike) && anyDamping(bike))
    gaps.push(
      "Single-speed damping circuits — one adjuster covers both rider inputs and sharp bumps, so expect to compromise between the two.",
    );
  if (!a.frontPreload)
    gaps.push("No front preload adjuster — front ride height is set by fork height in the clamps.");
  return gaps;
}

/** Category-biased starting windows. Track-focused and street-focused bikes
 *  genuinely want different sag; always deferred to the service manual. */
export function categoryBaseline(bike: Bike): {
  front: string;
  rear: string;
  bias: string;
} {
  if (bike.category.startsWith("Superbike"))
    return {
      front: "30–35 mm",
      rear: "25–30 mm",
      bias: "Superbike geometry rewards a firmer, more track-biased baseline — less sag keeps the steering quick and the rear high enough to drive off the corner.",
    };
  if (bike.category.startsWith("Naked"))
    return {
      front: "35–40 mm",
      rear: "30–35 mm",
      bias: "Naked bikes carry more weight over the rear and get ridden on real roads, so a slightly softer baseline with more sag keeps them compliant without going vague.",
    };
  return {
    front: "30–38 mm",
    rear: "25–30 mm",
    bias: "Middleweight supersports are usually sprung close to right for an average rider, so the standard window is a genuinely good starting point.",
  };
}

/** First model year, used for age-dependent advice. */
function firstYear(bike: Bike): number | null {
  const m = bike.yearRange.match(/\d{4}/);
  return m ? Number(m[0]) : null;
}

// ---------------------------------------------------------------------------
// Generation context
//
// 114 of ~190 bikes belong to a multi-generation family (7 GSX-R750s, 6 ZX-10Rs,
// 5 R1s …). Those pages share manufacturer, model, category and adjuster
// profile, so before this they differed only by a year string — measurably 97%
// identical, and they are exactly the high-value long-tail pages. Naming a
// generation's position among its siblings is unique by construction, and it
// answers the question a rider actually arrives with: is this my bike?
// ---------------------------------------------------------------------------

export interface GenerationContext {
  index: number; // 1-based, oldest first
  total: number;
  previous?: Bike;
  next?: Bike;
  siblings: Bike[];
}

/** All generations of the same model, oldest first. */
export function modelGenerations(bike: Bike): Bike[] {
  return BIKES.filter(
    (b) => b.manufacturerSlug === bike.manufacturerSlug && b.model === bike.model,
  ).sort((a, b) => (firstYear(a) ?? 0) - (firstYear(b) ?? 0));
}

export function generationContext(bike: Bike): GenerationContext | null {
  const siblings = modelGenerations(bike);
  if (siblings.length < 2) return null;
  const index = siblings.findIndex((b) => b.modelSlug === bike.modelSlug);
  return {
    index: index + 1,
    total: siblings.length,
    previous: index > 0 ? siblings[index - 1] : undefined,
    next: index < siblings.length - 1 ? siblings[index + 1] : undefined,
    siblings,
  };
}

const ORDINALS = [
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
  "eighth",
  "ninth",
  "tenth",
];

/** Prose describing where this generation sits in the model's run. */
export function generationSummary(bike: Bike): string | null {
  const ctx = generationContext(bike);
  if (!ctx) return null;
  const ordinal = ORDINALS[ctx.index - 1] ?? `${ctx.index}th`;
  const span =
    ctx.total > 1
      ? `${firstYear(ctx.siblings[0]) ?? "?"}–${
          ctx.siblings[ctx.total - 1].yearRange.match(/\d{4}\s*$/)?.[0] ??
          ctx.siblings[ctx.total - 1].yearRange
        }`
      : bike.yearRange;
  return `The ${bike.yearRange} ${bike.model} is the ${ordinal} of ${ctx.total} generations covered here, spanning ${span}. Suspension hardware changed between generations, so make sure the year range above matches your bike before you copy any setting across.`;
}

const ADJUSTER_LABELS: Record<keyof Bike["adjusters"], string> = {
  frontCompression: "front compression",
  frontHighSpeedCompression: "front high-speed compression",
  frontRebound: "front rebound",
  frontHighSpeedRebound: "front high-speed rebound",
  frontPreload: "front preload",
  forkHeight: "fork height",
  frontSpringRate: "front spring rate",
  rearCompression: "rear compression",
  rearHighSpeedCompression: "rear high-speed compression",
  rearRebound: "rear rebound",
  rearHighSpeedRebound: "rear high-speed rebound",
  rearPreload: "rear preload",
  shockLength: "rear ride height",
  rearSpringRate: "rear spring rate",
  tyrePressure: "tyre pressure",
  geometry: "chassis geometry",
};

/**
 * What changed in the adjuster set versus the previous generation.
 *
 * Only 10 of 78 generation transitions in the dataset actually change the
 * adjuster set — but "did anything change?" is precisely the question a rider
 * has when deciding whether an older generation's settings transfer, so the
 * "no" answer is as useful as the "yes" one.
 */
export function generationChangeNote(bike: Bike): string | null {
  const ctx = generationContext(bike);
  if (!ctx?.previous) return null;
  const prev = ctx.previous;
  const keys = Object.keys(bike.adjusters) as (keyof Bike["adjusters"])[];
  const added = keys
    .filter((k) => bike.adjusters[k] && !prev.adjusters[k])
    .map((k) => ADJUSTER_LABELS[k]);
  const removed = keys
    .filter((k) => !bike.adjusters[k] && prev.adjusters[k])
    .map((k) => ADJUSTER_LABELS[k]);

  if (added.length === 0 && removed.length === 0)
    return `The adjuster set carried over unchanged from the ${prev.yearRange} bike, so the two generations tune the same way in principle. The number of clicks on each adjuster did not necessarily carry over — check yours rather than assuming.`;

  const parts: string[] = [];
  if (added.length > 0) parts.push(`gains ${joinList(added)}`);
  if (removed.length > 0) parts.push(`loses ${joinList(removed)}`);
  return `Against the ${prev.yearRange} bike, this generation ${joinList(
    parts,
  )}. That is a real hardware change, so settings from the earlier model don't transfer directly.`;
}

/** Age note. Deliberately about service condition rather than invented specs —
 *  on an older bike, fluid and seal condition dominates clicker position, and
 *  that is the most useful honest thing we can say from a year range alone. */
export function eraNote(bike: Bike): string | null {
  const year = firstYear(bike);
  if (year === null) return null;
  // Phrased around the specific year range rather than a bucket label, so two
  // generations of the same model don't render byte-identical advice.
  if (year <= 2000)
    return `A ${bike.yearRange} ${bike.model} is old enough that the shock is very likely original and long past its service life. Emulsion-era shocks fade quietly rather than failing outright, so if the rear feels vague no clicker will recover it — the honest fix is a rebuild or a replacement unit.`;
  if (year <= 2007)
    return `On a ${bike.yearRange} ${bike.model}, fork oil and shock service intervals have almost certainly been exceeded several times over. Faded damping doesn't respond honestly to clicker changes, so service the suspension before you spend a season chasing settings.`;
  if (year <= 2015)
    return `A ${bike.yearRange} ${bike.model} is usually well past one fork service by now. If small clicker changes produce no clear difference, suspect tired oil and worn seals before you suspect the setting.`;
  return null;
}

/** Guides ordered by what this bike can actually act on — a preload-only bike
 *  should not be led to a high-speed compression article. */
export function relevantGuides(bike: Bike): string[] {
  const tier = adjustabilityTier(bike);
  if (tier === "preload")
    return [
      "setting-motorcycle-sag",
      "tire-pressure-track-day",
      "cold-tear-vs-hot-tear",
      "motorcycle-runs-wide",
    ];
  if (tier === "partial")
    return [
      "setting-motorcycle-sag",
      "tire-pressure-track-day",
      "motorcycle-runs-wide",
      "chatter-under-braking",
    ];
  return [
    "motorcycle-runs-wide",
    "chatter-under-braking",
    "setting-motorcycle-sag",
    "cold-tear-vs-hot-tear",
  ];
}

/** One-line "where to start" per tier, for the FAQ. Deliberately distinct from
 *  tierGuidance().lead so the FAQ doesn't echo the body copy word for word. */
function firstMove(bike: Bike): string {
  switch (adjustabilityTier(bike)) {
    case "race":
      return "Settle the low-speed circuits before you touch a high-speed one.";
    case "full":
      return "Work the front and rear as a pair so you don't shift the balance while chasing a symptom.";
    case "partial":
      return "Lean harder on sag and pressure — they carry more of the setup when damping adjustment is limited.";
    case "preload":
      return "With no damping clickers, sag and pressure aren't preliminaries here — they are the setup.";
  }
}

/** Condensed version of cannotTune() for the FAQ. */
function gapSummary(bike: Bike): string {
  const a = bike.adjusters;
  const missing: string[] = [];
  if (!a.frontCompression) missing.push("front compression");
  if (!a.frontRebound) missing.push("front rebound");
  if (!a.rearCompression) missing.push("rear compression");
  if (!a.rearRebound) missing.push("rear rebound");
  if (missing.length === 0)
    return `The ${bike.model} has compression and rebound at both ends, so the only hard limits are spring rate and the single-speed damping circuits.`;
  return `The ${bike.model} has no ${joinList(missing)} adjuster${
    missing.length > 1 ? "s" : ""
  }, so those corrections have to come from preload, ride height, spring rate or tyre pressure instead.`;
}

/** Honest, data-driven FAQ — unique per bike, feeds FAQPage schema. */
export function bikeFaqItems(bike: Bike): FaqItem[] {
  const name = bikeFullName(bike);
  const front = presentLabels(frontRows(bike));
  const rear = presentLabels(rearRows(bike));
  const base = categoryBaseline(bike);

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
      a: `As a starting point on a ${bike.category.toLowerCase()} machine, aim for roughly ${base.front} of front rider sag and ${base.rear} at the rear, then confirm against the service manual. ${base.bias} Always set sag before touching any clicker — it's the geometry baseline everything else depends on.`,
    },
    {
      q: `What should I adjust first on the ${name}?`,
      a: `Tyre pressure, then sag, then one damping change at a time — in that order. ${firstMove(bike)} Changing two things between sessions means you learn nothing from either.`,
    },
  ];

  // Summarised rather than repeating the on-page list verbatim: the FAQ should
  // restate the answer, not duplicate a whole section of body copy.
  const gaps = cannotTune(bike);
  if (gaps.length > 0) {
    items.push({
      q: `What can't I adjust on the ${name}?`,
      a: `${gapSummary(bike)} Most wasted setup time goes into chasing a fix the hardware can't make, so it pays to know the limits before you start.`,
    });
  }

  const era = eraNote(bike);
  if (era) {
    items.push({
      q: `Does the ${name} need a suspension service before I change settings?`,
      a: era,
    });
  }

  const gen = generationContext(bike);
  if (gen) {
    const others = gen.siblings
      .filter((b) => b.modelSlug !== bike.modelSlug)
      .map((b) => b.yearRange)
      .join(", ");
    items.push({
      q: `Which ${bike.model} generation is this?`,
      a: `This page covers the ${bike.yearRange} ${name} — generation ${gen.index} of ${gen.total} in the database. The other generations covered are ${others}. Suspension hardware and adjuster ranges changed between them, so settings don't transfer directly.`,
    });
  }

  return items;
}
