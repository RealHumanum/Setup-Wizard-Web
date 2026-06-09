import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { BIKES, findBike, bikesByManufacturer } from "@/lib/bikes";
import {
  frontRows,
  rearRows,
  bikeFullName,
  bikeNameWithYears,
  bikeFaqItems,
} from "@/lib/bike-display";
import { PageHero } from "@/components/content/PageHero";
import { ContentLayout } from "@/components/content/ContentLayout";
import { TableOfContents } from "@/components/content/TableOfContents";
import { Section } from "@/components/content/Section";
import { Callout } from "@/components/content/Callout";
import { ContentCta } from "@/components/content/ContentCta";
import { FaqSection } from "@/components/content/FaqSection";
import { AdjusterColumn } from "@/components/setup/AdjusterTable";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/schema";
import { guidePath } from "@/lib/guides";

export const dynamicParams = false;

type Params = { manufacturer: string; model: string };

export function generateStaticParams(): Params[] {
  return BIKES.map((b) => ({
    manufacturer: b.manufacturerSlug,
    model: b.modelSlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { manufacturer, model } = await params;
  const bike = findBike(manufacturer, model);
  if (!bike) return {};
  const name = bikeNameWithYears(bike);
  const path = `/setup/${manufacturer}/${model}`;
  const description = `Suspension setup reference for the ${name}: which compression, rebound, preload and ride-height adjusters it has, baseline sag targets, and how to dial it in. Free with Apex Wizard.`;
  return {
    title: `${name} Suspension Setup & Adjusters | Apex Wizard`,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: `${name} Suspension Setup`,
      description,
      url: path,
      images: ["/assets/hero 2.png"],
    },
  };
}

const TOC = [
  { id: "adjusters", label: "01 — Adjusters" },
  { id: "baseline", label: "02 — Baseline setup" },
  { id: "symptoms", label: "03 — Common symptoms" },
  { id: "faq", label: "04 — FAQ" },
];

export default async function BikeSetupPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { manufacturer, model } = await params;
  const bike = findBike(manufacturer, model);
  if (!bike) notFound();

  const name = bikeFullName(bike);
  const path = `/setup/${manufacturer}/${model}`;
  const faq = bikeFaqItems(bike);
  const siblings = bikesByManufacturer(manufacturer)
    .filter((b) => b.modelSlug !== model)
    .slice(0, 6);

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Setups", path: "/setup" },
          { name: bike.manufacturer, path: `/setup/${manufacturer}` },
          { name: bike.model, path },
        ])}
      />
      <JsonLd
        data={articleJsonLd({
          title: `${bikeNameWithYears(bike)} Suspension Setup`,
          description: `Suspension adjuster reference and baseline setup for the ${bikeNameWithYears(
            bike,
          )}.`,
          path,
          datePublished: "2026-06-10",
          section: "Setup Database",
        })}
      />

      <PageHero
        eyebrow="SETUP DATABASE"
        title={name}
        accent="Setup"
        updated={bike.yearRange}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Setups", href: "/setup" },
          { label: bike.manufacturer, href: `/setup/${manufacturer}` },
          { label: bike.model },
        ]}
        intro={
          <>
            Suspension adjuster reference for the{" "}
            <strong>{bikeNameWithYears(bike)}</strong> ({bike.category}). See
            which clickers and ride-height adjusters it has, the baseline you
            should start from, and which symptom maps to which adjuster.
          </>
        }
      />

      <ContentLayout toc={<TableOfContents items={TOC} />}>
        <Section id="adjusters" number="01" title="What this bike lets you adjust">
          <p>
            Every change you can make to the {bike.model}&rsquo;s suspension
            falls into one of the circuits below. Knowing which adjusters you
            actually have is the first step &mdash; there&rsquo;s no point
            chasing a high-speed compression fix on a bike that only offers
            preload.
          </p>
          <div className="my-6 grid gap-4 sm:grid-cols-2">
            <AdjusterColumn title="Front fork" rows={frontRows(bike)} />
            <AdjusterColumn title="Rear shock" rows={rearRows(bike)} />
          </div>
          <Callout variant="info" title="Where are the exact clicker limits?">
            This page is the map of <em>which</em> adjusters the {bike.model}{" "}
            has. The <strong>factory-accurate number of clicks</strong> on each
            one &mdash; so you always know your range and never wind past a stop
            &mdash; lives in the{" "}
            <Link href="/#cta">Apex Wizard app</Link>, free.
          </Callout>
        </Section>

        <Section id="baseline" number="02" title="Where to start — the baseline">
          <p>
            Whatever the {bike.model} offers, the order of operations is always
            the same. Start from the OEM clicker baseline (count every adjuster
            from fully closed), set tyre pressures, then set sag before you
            touch a single damping clicker.
          </p>
          <ul>
            <li>
              <strong>Tyre pressure first.</strong> It moves the chassis more
              than any clicker. Start from a known cold target &mdash; see the{" "}
              <Link href={guidePath("tire-pressure-track-day")}>
                track day tyre pressure guide
              </Link>
              .
            </li>
            <li>
              <strong>Then sag.</strong> Aim for roughly 30&ndash;38 mm front
              and 25&ndash;30 mm rear rider sag on a sportbike, then verify
              against the manual. Full method in the{" "}
              <Link href={guidePath("setting-motorcycle-sag")}>sag guide</Link>.
            </li>
            <li>
              <strong>Then one clicker at a time.</strong> Change one thing, ride
              the same reference, log it. The full loop is in the{" "}
              <Link href="/tuning-guide">suspension tuning guide</Link>.
            </li>
          </ul>
        </Section>

        <Section id="symptoms" number="03" title="Match the symptom to the adjuster">
          <p>
            On the {bike.model}, as on any bike, diagnose by the corner phase
            where the problem shows up &mdash; not the symptom alone. A few of
            the most common ones:
          </p>
          <ul>
            <li>
              <Link href={guidePath("motorcycle-runs-wide")}>Running wide</Link>{" "}
              &mdash; entry is usually front dive; exit is usually rear squat.
            </li>
            <li>
              <Link href={guidePath("chatter-under-braking")}>
                Chatter under braking
              </Link>{" "}
              &mdash; tyre pressure, sag, then front compression and rebound.
            </li>
            <li>
              <Link href={guidePath("cold-tear-vs-hot-tear")}>
                Tearing tyres
              </Link>{" "}
              &mdash; read the wear pattern before you blame the suspension.
            </li>
          </ul>
        </Section>

        <Section id="faq" number="04" title={`${name} setup FAQ`}>
          <FaqSection items={faq} />
        </Section>

        {siblings.length > 0 && (
          <div className="mt-12">
            <h2 className="font-mono text-lg font-extrabold text-[var(--color-text)]">
              More {bike.manufacturer} setups
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {siblings.map((s) => (
                <Link
                  key={s.modelSlug}
                  href={`/setup/${s.manufacturerSlug}/${s.modelSlug}`}
                  className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-4 py-2 text-sm text-[var(--color-text-dim)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                >
                  {s.model}
                </Link>
              ))}
              <Link
                href={`/setup/${manufacturer}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border-bright)] px-4 py-2 text-sm font-semibold text-[var(--color-primary)]"
              >
                All {bike.manufacturer} <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        )}

        <ContentCta
          title={`Get the ${name} factory baseline.`}
          desc={`Apex Wizard ships the ${bike.model}'s exact clicker limits and a guided setup logbook — log changes, compare sessions, and get symptom-based recommendations. Free.`}
        />
      </ContentLayout>
    </main>
  );
}
