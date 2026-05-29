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
    background_color: "#0a0d12",
    theme_color: "#0a0d12",
    icons: [
      {
        src: "/assets/favicon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
