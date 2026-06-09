import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { Starfield } from "@/components/Starfield";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ConsentBanner } from "@/components/ConsentBanner";
import { StickyDownloadBar } from "@/components/StickyDownloadBar";
import { JsonLd } from "@/components/JsonLd";
import { siteJsonLd } from "@/lib/schema";

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
    description:
      "The all-in-one motorcycle suspension logbook, setup troubleshooter and track day companion. 115+ bikes. 100% free.",
    url: SITE_URL,
    siteName: "Apex Wizard",
    images: ["/assets/hero 2.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Wizard — Pro Motorcycle Suspension Logbook",
    description: "Stop guessing in the pits. 115+ bikes, 7 smart modules, 100% free.",
    images: ["/assets/hero 2.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0d12",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <JsonLd data={siteJsonLd} />
        <Starfield />
        <div
          className="aw-glow size-[500px] bg-[var(--color-primary)]"
          style={{ top: "-150px", left: "-100px" }}
        />
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
