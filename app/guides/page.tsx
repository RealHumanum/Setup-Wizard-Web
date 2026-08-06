import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GUIDES, guidePath } from "@/lib/guides";
import { PageHero } from "@/components/content/PageHero";
import { GuideCard } from "@/components/content/GuideCard";
import { ContentCta } from "@/components/content/ContentCta";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/schema";
import { BIKE_COUNT } from "@/lib/bikes";

const PATH = "/guides";
const GUIDES_DESCRIPTION =
  "Practical, data-driven guides to motorcycle suspension tuning, tire wear and track day setup — diagnose symptoms by corner phase and fix them.";

export const metadata: Metadata = {
  title: "Motorcycle Suspension & Track Day Guides | Apex Wizard",
  description: GUIDES_DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    title: "Motorcycle Suspension & Track Day Guides",
    description:
      "Practical, data-driven guides to motorcycle suspension tuning, tire wear, and track day setup.",
    url: PATH,
    images: ["/assets/og-image.jpg"],
  },
};

export default function GuidesHubPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Guides", path: PATH },
        ])}
      />
      <JsonLd
        data={collectionPageJsonLd(
          {
            name: "Motorcycle Suspension & Track Day Guides",
            description: GUIDES_DESCRIPTION,
            path: PATH,
          },
          [
            { name: "Suspension Tuning Guide", path: "/tuning-guide" },
            ...GUIDES.map((g) => ({ name: g.title, path: guidePath(g.slug) })),
          ],
        )}
      />

      <PageHero
        eyebrow="GUIDES"
        title="Suspension, Tires &"
        accent="Track Days."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Guides" }]}
        intro="No dark art, no marketing fluff — just the mechanical principles behind a fast, predictable motorcycle, and how to diagnose and fix what yours is doing wrong."
      />

      <div className="mx-auto max-w-5xl px-6 pb-8">
        {/* Pillar */}
        <Link
          href="/tuning-guide"
          className="group block overflow-hidden rounded-lg border border-[var(--color-border)] border-t-2 border-t-[var(--color-primary)] bg-[var(--color-surface)] p-8 transition-colors hover:border-[var(--color-border-bright)] sm:p-10"
        >
          <div className="mb-3 font-mono text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--color-primary)]">
            Start here · The pillar guide
          </div>
          <h2 className="font-display text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
            The Complete Motorcycle Suspension Tuning Guide
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--color-text-dim)]">
            Sag, rebound, compression, corner phases, and a repeatable session
            protocol — the full framework every other guide here builds on.
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-[var(--color-primary)]">
            Read the guide <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 pb-24">
        <ContentCta
          title="Turn the theory into laps."
          desc={`Apex Wizard puts this whole workflow in your pocket — logbook, troubleshooter, and ${BIKE_COUNT} bike setups. Free on iOS and Android.`}
        />
      </div>
    </main>
  );
}
