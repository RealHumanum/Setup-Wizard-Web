import type { MetadataRoute } from "next";
import { BIKES, allManufacturers } from "@/lib/bikes";
import { GUIDES, guidePath } from "@/lib/guides";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (
    path: string,
    priority: number,
    changeFrequency: Freq,
    lastModified: Date = now,
  ): Entry => ({ url: url(path), lastModified, changeFrequency, priority });

  const staticPages: Entry[] = [
    entry("/", 1, "weekly"),
    entry("/setup", 0.8, "weekly"),
    entry("/guides", 0.8, "weekly"),
    entry("/tuning-guide", 0.7, "monthly"),
    entry("/about", 0.5, "yearly"),
    entry("/support", 0.4, "yearly"),
    entry("/privacy", 0.3, "yearly"),
    entry("/terms", 0.3, "yearly"),
  ];

  const guidePages: Entry[] = GUIDES.map((g) =>
    entry(
      guidePath(g.slug),
      0.7,
      "monthly",
      new Date(g.dateModified ?? g.datePublished),
    ),
  );

  const manufacturerPages: Entry[] = allManufacturers().map((m) =>
    entry(`/setup/${m.slug}`, 0.6, "monthly"),
  );

  const bikePages: Entry[] = BIKES.map((b) =>
    entry(`/setup/${b.manufacturerSlug}/${b.modelSlug}`, 0.5, "monthly"),
  );

  return [...staticPages, ...guidePages, ...manufacturerPages, ...bikePages];
}
