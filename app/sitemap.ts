import type { MetadataRoute } from "next";
import { BIKES, allManufacturers } from "@/lib/bikes";
import { GUIDES, guidePath } from "@/lib/guides";
import { SETUP_CONTENT_UPDATED } from "@/lib/constants";

const SITE_URL = "https://www.apex-wizard.com";

export const dynamic = "force-static";

type Entry = MetadataRoute.Sitemap[number];
type Freq = Entry["changeFrequency"];

// Canonical URLs use a trailing slash (next.config trailingSlash: true), so the
// sitemap matches that exactly to avoid duplicate-URL signals.
function url(path: string): string {
  if (path === "/" || path === "") return `${SITE_URL}/`;
  return `${SITE_URL}/${path.replace(/^\/+|\/+$/g, "")}/`;
}

// Real last-modified dates, not build time.
//
// Stamping `new Date()` on every static entry told crawlers the whole site
// changed on every deploy, which makes lastmod worthless as a signal — a
// sitemap that cries wolf gets its dates ignored. These are the dates the pages
// actually last changed; update an entry when you change that page.
const STATIC_PAGES: [path: string, priority: number, freq: Freq, lastMod: string][] = [
  ["/", 1, "weekly", SETUP_CONTENT_UPDATED],
  ["/setup", 0.8, "weekly", SETUP_CONTENT_UPDATED],
  ["/guides", 0.8, "weekly", SETUP_CONTENT_UPDATED],
  ["/tuning-guide", 0.7, "monthly", "2026-05-30"],
  ["/about", 0.5, "yearly", SETUP_CONTENT_UPDATED],
  ["/support", 0.4, "yearly", SETUP_CONTENT_UPDATED],
  ["/privacy", 0.3, "yearly", "2026-05-30"],
  ["/terms", 0.3, "yearly", "2026-05-30"],
  ["/delete-account", 0.3, "yearly", "2026-06-13"],
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (
    path: string,
    priority: number,
    changeFrequency: Freq,
    lastModified: string,
  ): Entry => ({
    url: url(path),
    lastModified: new Date(lastModified),
    changeFrequency,
    priority,
  });

  const staticPages: Entry[] = STATIC_PAGES.map(([p, pr, f, lm]) =>
    entry(p, pr, f, lm),
  );

  const guidePages: Entry[] = GUIDES.map((g) =>
    entry(guidePath(g.slug), 0.7, "monthly", g.dateModified ?? g.datePublished),
  );

  const manufacturerPages: Entry[] = allManufacturers().map((m) =>
    entry(`/setup/${m.slug}`, 0.6, "monthly", SETUP_CONTENT_UPDATED),
  );

  const bikePages: Entry[] = BIKES.map((b) =>
    entry(
      `/setup/${b.manufacturerSlug}/${b.modelSlug}`,
      0.5,
      "monthly",
      SETUP_CONTENT_UPDATED,
    ),
  );

  return [...staticPages, ...guidePages, ...manufacturerPages, ...bikePages];
}
