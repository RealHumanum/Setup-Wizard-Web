import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { allManufacturers, BIKES } from "@/lib/bikes";
import { PageHero } from "@/components/content/PageHero";
import { ContentCta } from "@/components/content/ContentCta";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, itemListJsonLd } from "@/lib/schema";

const PATH = "/setup";

export const metadata: Metadata = {
  title: "Motorcycle Suspension Setup Database | Apex Wizard",
  description:
    "Suspension setup references for 190+ sportbikes across 9 manufacturers — which adjusters each bike has, baseline sag, and how to tune it. Free with Apex Wizard.",
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    title: "Motorcycle Suspension Setup Database",
    description:
      "Suspension setup references for 190+ sportbikes — adjusters, baseline sag, and tuning, model by model.",
    url: PATH,
    images: ["/assets/og-image.jpg"],
  },
};

export default function SetupIndexPage() {
  const manufacturers = allManufacturers();

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Setups", path: PATH },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          manufacturers.map((m) => ({
            name: m.name,
            path: `/setup/${m.slug}`,
          })),
        )}
      />

      <PageHero
        eyebrow="SETUP DATABASE"
        title="Find Your Bike's"
        accent="Setup"
        updated={`${BIKES.length} models`}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Setups" }]}
        intro={
          <>
            Pick your manufacturer to see every model&rsquo;s suspension
            adjusters, baseline sag, and tuning notes &mdash; {BIKES.length}{" "}
            sportbikes and counting. Exact factory clicker limits ship in the
            free Apex Wizard app.
          </>
        }
      />

      <div className="mx-auto max-w-4xl px-6 pb-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {manufacturers.map((m) => (
            <Link
              key={m.slug}
              href={`/setup/${m.slug}`}
              className="group flex items-center justify-between gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-5 transition-colors hover:border-[var(--color-border-bright)]"
            >
              <div>
                <div className="font-mono text-lg font-extrabold text-[var(--color-text)]">
                  {m.name}
                </div>
                <div className="mt-0.5 font-mono text-xs text-[var(--color-text-muted)]">
                  {m.count} models
                </div>
              </div>
              <ArrowRight className="size-4 shrink-0 text-[var(--color-text-muted)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--color-primary)]" />
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 pb-24">
        <ContentCta
          title="Your exact clicker baseline, in your pocket."
          desc="Apex Wizard ships factory-accurate clicker limits for every bike here, plus a setup logbook and symptom-based troubleshooter. Free on iOS and Android."
        />
      </div>
    </main>
  );
}
