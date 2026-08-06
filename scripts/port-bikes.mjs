// One-off porter: bikes_kotlin.txt (iOS OEM DB) -> apex-wizard-web/lib/bikes.ts
// Teaser model: we keep ONLY the adjuster capability booleans (which adjusters a
// bike has). The exact factory clicker limits (*Max) are intentionally dropped —
// they stay in the app.
import { readFileSync, writeFileSync } from "node:fs";

const SRC =
  "/Users/humanum/Documents/Apex Wizard/Backups/_root-scripts-archive_2026-05-30/bikes_kotlin.txt";
const OUT =
  "/Users/humanum/Documents/Apex Wizard/apex-wizard-web/lib/bikes.ts";

const raw = readFileSync(SRC, "utf8");

const ADJ_KEYS = [
  "frontCompression",
  "frontHighSpeedCompression",
  "frontRebound",
  "frontHighSpeedRebound",
  "frontPreload",
  "forkHeight",
  "frontSpringRate",
  "rearCompression",
  "rearHighSpeedCompression",
  "rearRebound",
  "rearHighSpeedRebound",
  "rearPreload",
  "shockLength",
  "rearSpringRate",
  "tyrePressure",
  "geometry",
];

// --- 1. Parse adjuster-capability functions -------------------------------
const fnBlocks = [
  ...raw.matchAll(/private fun (\w+)\(\)\s*:\s*Adjustments\s*\{([\s\S]*?)\n\}/g),
];
const rawFns = {};
for (const m of fnBlocks) rawFns[m[1]] = m[2];

const resolved = {};
function resolve(name, seen = new Set()) {
  if (resolved[name]) return resolved[name];
  if (seen.has(name)) throw new Error("cycle at " + name);
  seen.add(name);
  const body = rawFns[name];
  if (body === undefined) throw new Error("unknown adjuster fn: " + name);

  let caps;
  const copyBase = body.match(/(\w+)\(\)\.copy\(\)/);
  if (copyBase) {
    caps = { ...resolve(copyBase[1], seen) };
  } else {
    caps = {};
    for (const k of ADJ_KEYS) caps[k] = false;
  }
  // direct "key: true/false" pairs (inside Adjustments(...))
  for (const p of body.matchAll(/(\w+)\s*:\s*(true|false)/g)) {
    if (ADJ_KEYS.includes(p[1])) caps[p[1]] = p[2] === "true";
  }
  // mutations "adj.key = true/false"
  for (const p of body.matchAll(/adj\.(\w+)\s*=\s*(true|false)/g)) {
    if (ADJ_KEYS.includes(p[1])) caps[p[1]] = p[2] === "true";
  }
  resolved[name] = caps;
  return caps;
}
for (const name of Object.keys(rawFns)) resolve(name);

// --- 2. Parse bikes -------------------------------------------------------
const bikeRe =
  /BikeTemplate\(""\s*,\s*manufacturer:\s*"([^"]*)"\s*,\s*model:\s*"([^"]*)"\s*,\s*yearRange:\s*"([^"]*)"\s*,\s*adjustments:\s*(\w+)\(\)/g;

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/\+/g, "-plus-")
    .replace(/&/g, "-and-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");

function category(model) {
  const m = model.toLowerCase();
  if (
    /(tuono|streetfighter|brutale|monster|hornet|speed triple|duke|gsx-s|mt-|z\s?\d|naked|virtus|katana|z h2|trident|griso|dorso)/.test(
      m,
    )
  )
    return "Naked / Streetfighter";
  if (
    /(rs ?660|rs ?457|r6|r7|cbr ?6|zx-?6|zx-?4|636|daytona|panigale v2|765|rc ?390|rc ?125|ninja ?4|ninja ?5|supersport|rs ?125|cbr ?5|cbr ?3|rs ?250)/.test(
      m,
    )
  )
    return "Supersport / Middleweight";
  return "Superbike / Sportbike";
}

const startYear = (yr) => (yr.match(/\d{4}/) || [""])[0];

// First pass: collect raw records and dedupe identical (mfg|model|year).
const seenBike = new Set();
const records = [];
for (const m of raw.matchAll(bikeRe)) {
  const [, manufacturer, model, yearRange, adjFn] = m;
  const key = `${manufacturer}|${model}|${yearRange}`;
  if (seenBike.has(key)) continue;
  seenBike.add(key);
  records.push({
    manufacturer,
    manufacturerSlug: slug(manufacturer),
    model,
    baseSlug: slug(model),
    yearRange,
    category: category(model),
    adjusters: resolved[adjFn],
  });
}

// Count how often each (manufacturer, baseSlug) appears — collisions are
// different generations of the same model name.
const slugCounts = new Map();
for (const r of records) {
  const k = `${r.manufacturerSlug}/${r.baseSlug}`;
  slugCounts.set(k, (slugCounts.get(k) || 0) + 1);
}

// Second pass: when a model name repeats, suffix EVERY instance with its start
// year (clean, meaningful URLs); fall back to -2/-3 only on year ties.
const taken = new Map(); // manufacturerSlug -> Set(modelSlug)
const bikes = [];
for (const r of records) {
  const collides = slugCounts.get(`${r.manufacturerSlug}/${r.baseSlug}`) > 1;
  let modelSlug = collides
    ? `${r.baseSlug}-${startYear(r.yearRange) || "v"}`
    : r.baseSlug;
  if (!taken.has(r.manufacturerSlug)) taken.set(r.manufacturerSlug, new Set());
  const set = taken.get(r.manufacturerSlug);
  if (set.has(modelSlug)) {
    let i = 2;
    while (set.has(`${modelSlug}-${i}`)) i++;
    modelSlug = `${modelSlug}-${i}`;
  }
  set.add(modelSlug);
  bikes.push({
    manufacturer: r.manufacturer,
    manufacturerSlug: r.manufacturerSlug,
    model: r.model,
    modelSlug,
    yearRange: r.yearRange,
    category: r.category,
    adjusters: r.adjusters,
  });
}

bikes.sort(
  (a, b) =>
    a.manufacturer.localeCompare(b.manufacturer) ||
    a.model.localeCompare(b.model),
);

// --- 3. Emit lib/bikes.ts -------------------------------------------------
const lines = [];
lines.push("// AUTO-GENERATED from the Apex Wizard iOS OEM database. Do not edit by hand.");
lines.push("// Teaser dataset: adjuster CAPABILITIES only — exact factory clicker limits");
lines.push("// live in the app. Regenerate via port-bikes.mjs.");
lines.push("");
lines.push("export interface BikeAdjusters {");
for (const k of ADJ_KEYS) lines.push(`  ${k}: boolean;`);
lines.push("}");
lines.push("");
lines.push("export interface Bike {");
lines.push("  manufacturer: string;");
lines.push("  manufacturerSlug: string;");
lines.push("  model: string;");
lines.push("  modelSlug: string;");
lines.push("  yearRange: string;");
lines.push("  category: string;");
lines.push("  adjusters: BikeAdjusters;");
lines.push("}");
lines.push("");
lines.push("export const BIKES: Bike[] = [");
for (const b of bikes) {
  const adj = ADJ_KEYS.map((k) => `${k}: ${b.adjusters[k]}`).join(", ");
  lines.push(
    `  { manufacturer: ${JSON.stringify(b.manufacturer)}, manufacturerSlug: ${JSON.stringify(
      b.manufacturerSlug,
    )}, model: ${JSON.stringify(b.model)}, modelSlug: ${JSON.stringify(
      b.modelSlug,
    )}, yearRange: ${JSON.stringify(b.yearRange)}, category: ${JSON.stringify(
      b.category,
    )}, adjusters: { ${adj} } },`,
  );
}
lines.push("];");
lines.push("");
lines.push(`export interface Manufacturer {
  name: string;
  slug: string;
  count: number;
}

export function allManufacturers(): Manufacturer[] {
  const map = new Map<string, Manufacturer>();
  for (const b of BIKES) {
    const m = map.get(b.manufacturerSlug);
    if (m) m.count++;
    else map.set(b.manufacturerSlug, { name: b.manufacturer, slug: b.manufacturerSlug, count: 1 });
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export function bikesByManufacturer(manufacturerSlug: string): Bike[] {
  return BIKES.filter((b) => b.manufacturerSlug === manufacturerSlug);
}

export function findBike(manufacturerSlug: string, modelSlug: string): Bike | undefined {
  return BIKES.find(
    (b) => b.manufacturerSlug === manufacturerSlug && b.modelSlug === modelSlug,
  );
}

// Count of distinct, rider-facing adjusters a bike exposes (drives teaser copy).
export function adjusterCount(b: Bike): number {
  return Object.values(b.adjusters).filter(Boolean).length;
}

// Single source of truth for every rider-facing "N bikes" claim on the site and
// in the JSON-LD. Never hardcode the number anywhere else — it drifts.
export const BIKE_COUNT = BIKES.length;`);
lines.push("");

writeFileSync(OUT, lines.join("\n"));

const mfgs = new Set(bikes.map((b) => b.manufacturer));
console.log(`Parsed ${Object.keys(rawFns).length} adjuster fns.`);
console.log(`Wrote ${bikes.length} bikes across ${mfgs.size} manufacturers to lib/bikes.ts`);
console.log("Manufacturers:", [...mfgs].sort().join(", "));
