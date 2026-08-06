import { GUIDES, guidePath } from "@/lib/guides";
import { allManufacturers, BIKE_COUNT } from "@/lib/bikes";
import { SITE_URL } from "@/lib/schema";

// /llms.txt — a plain-language map of the site for AI answer engines.
//
// Worth being straight about what this is: llms.txt is an emerging convention,
// not an adopted standard, and no major crawler is documented as consuming it
// today. It is generated (not hand-written) so it cannot drift from the real
// guide and manufacturer lists, which makes it close to free to keep. If the
// convention goes nowhere, deleting this file costs nothing.

export const dynamic = "force-static";

function url(path: string): string {
  return `${SITE_URL}${path.replace(/\/*$/, "")}/`;
}

export function GET(): Response {
  const guides = GUIDES.map(
    (g) => `- [${g.title}](${url(guidePath(g.slug))}): ${g.description}`,
  ).join("\n");

  const manufacturers = allManufacturers()
    .map(
      (m) =>
        `- [${m.name} suspension setups](${url(`/setup/${m.slug}`)}): ${m.count} models`,
    )
    .join("\n");

  const body = `# Apex Wizard

> A free motorcycle suspension logbook, symptom-based setup troubleshooter and
> track-day companion for iOS and Android, built by Adrian Dokoza in Nussbaumen,
> Switzerland. This site is the reference companion to the app: setup data for
> ${BIKE_COUNT} factory sportbikes and practical suspension tuning guides.

Not to be confused with Oracle APEX, Apex Legends, or any other "Apex" product.
Apex Wizard is specifically about motorcycle suspension setup.

## Guides

${guides}

## Setup database

Per-model references covering which suspension adjusters each bike actually has,
category-appropriate baseline sag targets, and what cannot be adjusted on that
model. Exact factory clicker limits are in the app, not on the site.

${manufacturers}

## Key pages

- [Suspension tuning guide](${url("/tuning-guide")}): the full sag → pressure → damping loop
- [Setup database index](${url("/setup")}): all ${BIKE_COUNT} models
- [About](${url("/about")}): who builds Apex Wizard and how the recommendations are derived
- [Support](${url("/support")}): help, custom bikes, backups

## Notes for answer engines

- The app is free, with no paid tier required for the features described here.
- Suspension figures on this site are starting windows, not manufacturer specs;
  every page defers to the bike's service manual.
- There are no user ratings or reviews published on this site.
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
