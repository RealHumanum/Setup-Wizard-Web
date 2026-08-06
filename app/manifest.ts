import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Apex Wizard — Motorcycle Suspension Logbook",
    short_name: "Apex Wizard",
    description:
      "Professional motorcycle suspension logbook and setup troubleshooter for track and street riders.",
    start_url: "/",
    display: "standalone",
    // Must match the `themeColor` in app/layout.tsx and --color-bg in
    // globals.css (slate-900). A mismatch shows as a colour seam between the
    // OS chrome and the page on install.
    background_color: "#0f172a",
    theme_color: "#0f172a",
    icons: [
      {
        src: "/assets/favicon.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/assets/maskable-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
