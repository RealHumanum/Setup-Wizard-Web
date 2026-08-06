import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Archivo } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ConsentBanner } from "@/components/ConsentBanner";
import { StickyDownloadBar } from "@/components/StickyDownloadBar";
import { JsonLd } from "@/components/JsonLd";
import { siteJsonLd } from "@/lib/schema";
import { BIKE_COUNT } from "@/lib/bikes";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

// Editorial display face for headlines (racing-grotesque). Mono is reserved for
// telemetry/spec data only.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

const SITE_URL = "https://www.apex-wizard.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Apex Wizard | Pro Motorcycle Suspension & Setup Logbook",
  description:
    "Stop guessing in the pits. Apex Wizard is the ultimate motorcycle suspension logbook and setup troubleshooter for track and street riders.",
  keywords: [
    "motorcycle suspension",
    "track day app",
    "sag calculator",
    "damping setup",
    "apex wizard",
    "motorcycle logbook",
    "suspension troubleshooter",
  ],
  authors: [{ name: "Adrian Dokoza" }],
  icons: { icon: "/assets/favicon.png", apple: "/assets/favicon.png" },
  appleWebApp: {
    capable: true,
    title: "Apex Wizard",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "website",
    title: "Apex Wizard — Pro Motorcycle Suspension Logbook",
    description: `The all-in-one motorcycle suspension logbook, setup troubleshooter and track day companion. ${BIKE_COUNT} bikes. 100% free.`,
    url: SITE_URL,
    siteName: "Apex Wizard",
    locale: "en_US",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Apex Wizard — motorcycle suspension setup logbook and troubleshooter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Wizard — Pro Motorcycle Suspension Logbook",
    description: `Stop guessing in the pits. ${BIKE_COUNT} bikes, 7 smart modules, 100% free.`,
    images: ["/assets/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${archivo.variable}`}
    >
      <body>
        <JsonLd data={siteJsonLd} />
        <Navbar />
        <div className="relative z-10">{children}</div>
        <Footer />
        <StickyDownloadBar />
        <ConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}
