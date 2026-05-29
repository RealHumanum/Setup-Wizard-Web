import type { MetadataRoute } from "next";

const SITE_URL = "https://www.apex-wizard.com";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/tuning-guide", "/support", "/privacy", "/terms"];
  const lastModified = new Date();
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
