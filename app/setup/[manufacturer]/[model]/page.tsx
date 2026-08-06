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
  tierSummary,
  tierGuidance,
  cannotTune,
  categoryBaseline,
  eraNote,
  relevantGuides,
  generationContext,
  generationSummary,
  generationChangeNote,
} from "@/lib/bike-display";
import { pickTitle, clampDescription, BRAND_SUFFIX } from "@/lib/seo";
import { PageHero } from "@/components/content/PageHero";
import { ContentLayout } from "@/components/content/ContentLayout";
import { TableOfContents } from "@/components/content/TableOfContents";
import { Section } from "@/components/content/Section";
import { Callout } from "@/components/content/Callout";
import { ContentCta } from "@/components/content/ContentCta";
import { FaqSection } from "@/components/content/FaqSection";
import { AdjusterColumn } from "@/components/setup/AdjusterTable";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, breadcrumbJsonLd, motorcycleNode } from "@/lib/schema";
import { guidePath, getGuide } from "@/lib/guides";
import { SETUP_CONTENT_UPDATED } from "@/lib/constants";

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

  // Cascade longest-first: the model name is what distinguishes this page from
  // 189 others, so the brand suffix and then the year range get sacrificed
  // before it does.
  const title = pickTitle([
    `${name} Suspension Setup${BRAND_SUFFIX}`,
    `${name} Suspension Setup`,
    `${name} Setup`,
    `${bikeFullName(bike)} Suspension Setup`,
  ]);
  // Varies with the bike's actual adjuster profile instead of being one
  // boilerplate string repeated across every page.
  const description = clampDescription(
    `${name}: ${tierSummary(bike)}. Baseline sag, setup order and symptom fixes.`,
  );

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: `${name} Suspension Setup`,
      description,
      url: path,
      images: ["/assets/og-image.jpg"],
    },
  };
}

const TOC = [
  { id: "adjusters", label: "01 — Adjusters" },
  { id: "approach", label: "02 — How to approach it" },
  { id: "baseline", label: "03 — Baseline setup" },
  { id: "limits", label: "04 — What you can't tune" },
  { id: "symptoms", label: "05 — Common symptoms" },
  { id: "faq", label: "06 — FAQ" },
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
  const guidance = tierGuidance(bike);
  const base = categoryBaseline(bike);
  const gaps = cannotTune(bike);
  const era = eraNote(bike);
  const guides = relevantGuides(bike);
  const generation = generationContext(bike);
  const genSummary = generationSummary(bike);
  const genChange = generationChangeNote(bike);
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
          dateModified: SETUP_CONTENT_UPDATED,
          section: "Setup Database",
          // Types the page's subject as an actual vehicle entity rather than
          // leaving search engines to infer it from prose.
          about: motorcycleNode({
            manufacturer: bike.manufacturer,
            model: bike.model,
            yearRange: bike.yearRange,
            category: bike.category,
            path,
          }),
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
        {generation && genSummary && (
          <Callout variant="info" title={`Is this your ${bike.model}?`}>
            {genSummary}
            {genChange && <span className="mt-3 block">{genChange}</span>}
            <span className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
              {generation.previous && (
                <Link
                  href={`/setup/${manufacturer}/${generation.previous.modelSlug}`}
                >
                  ← Previous: {generation.previous.yearRange}
                </Link>
              )}
              {generation.next && (
                <Link href={`/setup/${manufacturer}/${generation.next.modelSlug}`}>
                  Next: {generation.next.yearRange} →
                </Link>
              )}
            </span>
          </Callout>
        )}

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

        <Section
          id="approach"
          number="02"
          title={`How to approach the ${bike.model}`}
        >
          <p>{guidance.lead}</p>
          <ul>
            {guidance.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          {era && (
            <Callout variant="warning" title="Check the hardware before the settings">
              {era}
            </Callout>
          )}
        </Section>

        <Section id="baseline" number="03" title="Where to start — the baseline">
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
              <strong>Then sag.</strong> On a {bike.category.toLowerCase()}{" "}
              machine, aim for roughly {base.front} of front rider sag and{" "}
              {base.rear} at the rear, then verify against the manual. Full
              method in the{" "}
              <Link href={guidePath("setting-motorcycle-sag")}>sag guide</Link>.
            </li>
            <li>
              <strong>Then one clicker at a time.</strong> Change one thing, ride
              the same reference, log it. The full loop is in the{" "}
              <Link href="/tuning-guide">suspension tuning guide</Link>.
            </li>
          </ul>
          <Callout variant="tip" title={`Why these numbers for a ${bike.category.split(" / ")[0].toLowerCase()}`}>
            {base.bias}
          </Callout>
        </Section>

        {gaps.length > 0 && (
          <Section
            id="limits"
            number="04"
            title={`What you can't tune on the ${bike.model}`}
          >
            <p>
              Knowing where the {bike.model} stops adjusting saves more time than
              any clicker chart. These are the fixes this bike can&rsquo;t make
              with a screwdriver &mdash; and what to reach for instead:
            </p>
            <ul>
              {gaps.map((gap) => (
                <li key={gap}>{gap}</li>
              ))}
            </ul>
          </Section>
        )}

        <Section id="symptoms" number="05" title="Match the symptom to the adjuster">
          <p>
            On the {bike.model}, as on any bike, diagnose by the corner phase
            where the problem shows up &mdash; not the symptom alone. Ordered by
            what this bike can actually act on:
          </p>
          <ul>
            {guides.map((slug) => {
              const g = getGuide(slug);
              if (!g) return null;
              return (
                <li key={slug}>
                  <Link href={guidePath(slug)}>{g.shortTitle}</Link> &mdash;{" "}
                  {g.description}
                </li>
              );
            })}
          </ul>
        </Section>

        <Section id="faq" number="06" title={`${name} setup FAQ`}>
          <FaqSection items={faq} />
        </Section>

        {siblings.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-lg font-extrabold tracking-tight text-[var(--color-text)]">
              More {bike.manufacturer} setups
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {siblings.map((s) => (
                <Link
                  key={s.modelSlug}
                  href={`/setup/${s.manufacturerSlug}/${s.modelSlug}`}
                  className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm text-[var(--color-text-dim)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                >
                  {s.model}
                </Link>
              ))}
              <Link
                href={`/setup/${manufacturer}`}
                className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border-bright)] px-4 py-2 text-sm font-semibold text-[var(--color-primary)]"
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
