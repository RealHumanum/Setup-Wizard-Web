// Registry for the diagnostic content hub (/guides). Single source of truth for
// hub cards, sitemap entries, breadcrumbs and internal links. Article BODY lives
// in each app/guides/<slug>/page.tsx; this holds the metadata around it.

export interface Guide {
  slug: string;
  title: string; // page <title> / H1
  shortTitle: string; // hub card title
  description: string; // meta description + card excerpt
  eyebrow: string; // category label (also the schema articleSection)
  readMinutes: number;
  datePublished: string;
  dateModified?: string;
  related: string[]; // other guide slugs
}

export const GUIDE_BASE = "/guides";

export const GUIDES: Guide[] = [
  {
    slug: "setting-motorcycle-sag",
    title: "How to Set Motorcycle Sag, Step by Step",
    shortTitle: "Setting Sag",
    description:
      "Measure and set static and rider sag on a motorcycle — the geometry baseline every other suspension change depends on. Targets, method and mistakes.",
    eyebrow: "Suspension Setup",
    readMinutes: 8,
    datePublished: "2026-06-10",
    dateModified: "2026-08-06",
    related: ["motorcycle-runs-wide", "tire-pressure-track-day", "chatter-under-braking"],
  },
  {
    slug: "motorcycle-runs-wide",
    title: "Why Your Motorcycle Runs Wide — Entry vs Exit",
    shortTitle: "Running Wide",
    description:
      "A motorcycle that runs wide on entry is a different problem from one that runs wide on exit. Diagnose by corner phase and find the adjuster that fixes it.",
    eyebrow: "Troubleshooting",
    readMinutes: 9,
    datePublished: "2026-06-10",
    dateModified: "2026-08-06",
    related: ["chatter-under-braking", "setting-motorcycle-sag", "cold-tear-vs-hot-tear"],
  },
  {
    slug: "chatter-under-braking",
    title: "Chatter Under Braking — Causes and Fixes",
    shortTitle: "Braking Chatter",
    description:
      "Front-end chatter under heavy braking, diagnosed: tire pressure, sag, compression and rebound — and how to tell setup from a tire or technique problem.",
    eyebrow: "Troubleshooting",
    readMinutes: 8,
    datePublished: "2026-06-10",
    dateModified: "2026-08-06",
    related: ["motorcycle-runs-wide", "setting-motorcycle-sag", "tire-pressure-track-day"],
  },
  {
    slug: "cold-tear-vs-hot-tear",
    title: "Cold Tear vs Hot Tear — Reading Tire Wear",
    shortTitle: "Cold vs Hot Tear",
    description:
      "Cold tear and hot tear look similar but mean opposite things. Read motorcycle tire wear patterns and what each says about pressure, temperature and setup.",
    eyebrow: "Tires",
    readMinutes: 9,
    datePublished: "2026-06-10",
    dateModified: "2026-08-06",
    related: ["tire-pressure-track-day", "motorcycle-runs-wide", "setting-motorcycle-sag"],
  },
  {
    slug: "tire-pressure-track-day",
    title: "Track Day Tire Pressure: Cold and Hot Targets",
    shortTitle: "Tire Pressure",
    description:
      "How to set motorcycle track day tire pressures: cold starting targets, hot pressure gain, and why pressure comes before any clicker change.",
    eyebrow: "Tires",
    readMinutes: 8,
    datePublished: "2026-06-10",
    dateModified: "2026-08-06",
    related: ["cold-tear-vs-hot-tear", "setting-motorcycle-sag", "track-day-fuel-calculation"],
  },
  {
    slug: "track-day-fuel-calculation",
    title: "How Much Fuel for a 20-Minute Track Session",
    shortTitle: "Fuel Calculation",
    description:
      "Calculate how much fuel a track session needs, what it weighs, and how to avoid carrying dead weight — or running dry on the last lap.",
    eyebrow: "Track Day",
    readMinutes: 7,
    datePublished: "2026-06-10",
    dateModified: "2026-08-06",
    related: ["tire-pressure-track-day", "setting-motorcycle-sag", "motorcycle-runs-wide"],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function guidePath(slug: string): string {
  return `${GUIDE_BASE}/${slug}`;
}
