import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/content/PageHero";
import { ContentLayout } from "@/components/content/ContentLayout";
import { TableOfContents } from "@/components/content/TableOfContents";
import { Section } from "@/components/content/Section";
import { Callout } from "@/components/content/Callout";
import { SummaryCard } from "@/components/content/SummaryCard";
import { FaqSection } from "@/components/content/FaqSection";
import { ContentCta } from "@/components/content/ContentCta";
import { GuideCard } from "@/components/content/GuideCard";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/schema";
import { getGuide, guidePath, GUIDES } from "@/lib/guides";

const SLUG = "setting-motorcycle-sag";
const guide = getGuide(SLUG)!;
const PATH = guidePath(SLUG);

export const metadata: Metadata = {
  title: `${guide.title} | Apex Wizard`,
  description: guide.description,
  alternates: { canonical: PATH },
  openGraph: {
    type: "article",
    title: guide.title,
    description: guide.description,
    url: PATH,
    images: ["/assets/og-image.jpg"],
  },
};

const TOC = [
  { id: "what", label: "01 — What sag is" },
  { id: "numbers", label: "02 — Static vs rider sag" },
  { id: "targets", label: "03 — Target windows" },
  { id: "measure", label: "04 — How to measure" },
  { id: "adjust", label: "05 — Adjusting it" },
  { id: "mistakes", label: "06 — Common mistakes" },
];

const FAQ = [
  {
    q: "What is the difference between static sag and rider sag?",
    a: "Static sag is how far the suspension settles under the weight of the bike alone. Rider sag (also called race sag) is how far it settles with you on board in full gear. Rider sag is the number you tune to; static sag is a cross-check that tells you whether your spring rate is right for your weight.",
  },
  {
    q: "What sag should I run on a sportbike?",
    a: "As a starting point, aim for roughly 30–38 mm of front rider sag and 25–30 mm of rear rider sag on a road or track sportbike, then confirm against the manufacturer's service manual. Supermoto and off-road bikes run far more — often 100 mm or more — because they need stroke to absorb large impacts.",
  },
  {
    q: "Can I set sag with preload alone?",
    a: "Preload sets where in the spring's travel the bike sits at rest, so it moves sag up and down — but it does not change the spring rate. If you have wound preload to its limit and still cannot reach your target sag, the spring is the wrong rate for your weight and needs to be replaced, not preloaded harder.",
  },
  {
    q: "Do I set front or rear sag first?",
    a: "Set the rear first, then the front. The rear ride height has a larger influence on overall geometry (rake and trail), so establishing it first gives you a stable platform to set the front against. Re-check both after any spring or ride-height change.",
  },
  {
    q: "How often should I check sag?",
    a: "Re-verify sag at the start of every track day or whenever your loaded weight changes (different gear, luggage, a pillion). Springs settle and preload adjusters can creep over time, so a number you trusted last month may have drifted.",
  },
];

export default function Page() {
  const related = guide.related
    .map((s) => GUIDES.find((g) => g.slug === s))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: guide.shortTitle, path: PATH },
        ])}
      />
      <JsonLd
        data={articleJsonLd({
          title: guide.title,
          description: guide.description,
          path: PATH,
          datePublished: guide.datePublished,
          dateModified: guide.dateModified,
          section: guide.eyebrow,
        })}
      />

      <PageHero
        eyebrow={guide.eyebrow}
        title="Setting Motorcycle"
        accent="Sag."
        updated="June 2026"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: guide.shortTitle },
        ]}
        intro="Sag is the single most important suspension setting on your motorcycle, and the one most often skipped. Get it right and every clicker change after it makes sense. Get it wrong and you&rsquo;ll chase your tail all day."
      />

      <ContentLayout toc={<TableOfContents items={TOC} />}>
        <SummaryCard
          title="Key takeaways"
          items={[
            <>Sag sets ride height, and ride height sets rake, trail and weight distribution.</>,
            <>Tune to <strong>rider sag</strong>; use <strong>static sag</strong> to check your spring rate.</>,
            <>Sportbike targets: front <strong>30&ndash;38 mm</strong>, rear <strong>25&ndash;30 mm</strong> rider sag.</>,
            <>Set the rear first, then the front.</>,
            <>If preload runs out before you hit target, the spring rate is wrong &mdash; not the preload.</>,
            <>Always set sag before touching a single damping clicker.</>,
          ]}
        />

        <Section id="what" number="01" title="What sag actually is">
          <p>
            Sag is the amount your suspension compresses from fully extended once
            weight is on it. It sounds trivial, but it is the foundation of every
            other setting on the bike, because sag determines <strong>ride
            height</strong> &mdash; and ride height determines the bike&rsquo;s
            rake, trail and how weight is shared between the two tires.
          </p>
          <p>
            Change sag and you change the entire geometry the chassis was
            designed around. That is why a bike with the wrong sag feels vague no
            matter how many clickers you turn: you are trying to fix a geometry
            problem with damping, and damping cannot move ride height. Sag can.
          </p>
          <Callout variant="tip" title="Mental model">
            Think of sag as the bike&rsquo;s posture. Damping controls how it
            moves; sag controls the shape it holds while it&rsquo;s moving. Fix
            the posture first.
          </Callout>
        </Section>

        <Section id="numbers" number="02" title="Static sag vs rider sag">
          <p>
            Two numbers matter, and people constantly confuse them.
          </p>
          <ul>
            <li>
              <strong>Static sag</strong> = fully extended length &minus; the
              length under the bike&rsquo;s own weight. This is a diagnostic
              number.
            </li>
            <li>
              <strong>Rider sag</strong> (race sag) = fully extended length
              &minus; the length with you on board in full gear. This is the
              number you tune to.
            </li>
          </ul>
          <p>
            You set rider sag with preload, then check static sag to confirm the
            spring is right for your weight. If rider sag is correct but static
            sag is very small (near zero), your spring is too soft and you have
            masked it with preload. If static sag is large with rider sag
            correct, the spring is too stiff. The two numbers together tell you
            something neither can alone.
          </p>
        </Section>

        <Section id="targets" number="03" title="Target windows">
          <p>
            For a road or track <strong>sportbike</strong>, start here and then
            confirm against your service manual:
          </p>
          <ul>
            <li><strong>Front rider sag:</strong> 30&ndash;38 mm</li>
            <li><strong>Rear rider sag:</strong> 25&ndash;30 mm</li>
          </ul>
          <p>
            These are starting windows, not laws. A bike that needs more front
            grip on entry often likes a touch more front sag (lower front, more
            trail); a bike that runs wide on exit may want a touch less rear sag
            (higher rear). But move from the middle of the window, and only after
            the baseline is set. Supermoto, adventure and off-road bikes run far
            more sag &mdash; often 100 mm or more &mdash; because they trade
            geometry precision for stroke.
          </p>
          <Callout variant="info" title="Your bike's adjusters set the menu">
            Whether you can chase these numbers depends on what your bike offers.
            Check your model in the{" "}
            <Link href="/setup">setup database</Link> &mdash; some bikes give you
            full preload and ride-height adjustment at both ends, others only
            preload up front.
          </Callout>
        </Section>

        <Section id="measure" number="04" title="How to measure sag">
          <p>
            You need a tape measure, a zip-tie, and ideally a friend to hold the
            bike upright while you sit on it. Measure in three states for each
            end: fully extended, bike-weight, and rider-loaded.
          </p>
          <h3>Front</h3>
          <p>
            Slide a zip-tie down the fork stanchion against the dust seal. Put the
            bike on a paddock stand so the fork fully extends and measure from the
            seal to the zip-tie &mdash; that is your extended reference. Drop the
            bike to the ground, settle the fork with a gentle push and release,
            and measure again for static sag. Then sit on the bike in full gear,
            feet on the pegs, and have your friend read rider sag.
          </p>
          <h3>Rear</h3>
          <p>
            Pick two fixed points &mdash; the rear axle and a mark on the
            subframe directly above it &mdash; and measure between them in each
            state. The arithmetic is the same: extended minus loaded.
          </p>
          <Callout variant="warning" title="Break stiction every time">
            Suspension has friction (stiction) that can hide 5&ndash;10 mm of
            travel. Before every measurement, lift the end slightly and let it
            settle, or push down gently and release. Take the measurement the
            same way each time or your numbers will scatter.
          </Callout>
        </Section>

        <Section id="adjust" number="05" title="Adjusting sag">
          <p>
            Adjust front sag with the preload caps on top of the fork legs, and
            rear sag with the shock&rsquo;s preload collar (or the remote
            adjuster, if fitted). More preload raises the bike and reduces sag;
            less preload lowers it and increases sag.
          </p>
          <p>
            Set the rear first. Rear ride height has the bigger influence on
            overall geometry, so lock it in before you set the front against it.
            Make a change, re-measure, and write down the number of turns &mdash;
            preload is measured in turns or millimetres of thread, not clicks.
          </p>
          <Callout variant="danger" title="When preload runs out">
            If you reach the preload limit and still cannot hit your target sag,
            stop. The spring rate is wrong for your weight. No amount of extra
            preload fixes that &mdash; it only pushes the spring into a harsher
            part of its range. Fit the correct rate spring instead.
          </Callout>
        </Section>

        <Section id="mistakes" number="06" title="Common mistakes">
          <ul>
            <li>
              <strong>Skipping it entirely</strong> and going straight to
              clickers. The most common error, and the reason damping changes
              feel inconsistent.
            </li>
            <li>
              <strong>Measuring without breaking stiction</strong>, so the
              numbers scatter by a centimetre between attempts.
            </li>
            <li>
              <strong>Using preload to fix a spring-rate problem</strong>, which
              just relocates the harshness.
            </li>
            <li>
              <strong>Setting front before rear</strong>, so the geometry shifts
              under you as you go.
            </li>
            <li>
              <strong>Never re-checking</strong>, then wondering why the bike
              feels different a month later.
            </li>
          </ul>
          <p>
            Once sag is set and logged, you have a stable platform. Now the
            damping work in the{" "}
            <Link href="/tuning-guide">suspension tuning guide</Link> will
            actually behave predictably &mdash; and symptoms like{" "}
            <Link href={guidePath("motorcycle-runs-wide")}>running wide</Link> or{" "}
            <Link href={guidePath("chatter-under-braking")}>
              chatter under braking
            </Link>{" "}
            become diagnosable instead of mysterious.
          </p>
        </Section>

        <Section id="faq" number="07" title="Sag FAQ">
          <FaqSection items={FAQ} />
        </Section>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-4 font-mono text-lg font-extrabold text-[var(--color-text)]">
              Keep reading
            </h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {related.map((g) => (
                <GuideCard key={g.slug} guide={g} />
              ))}
            </div>
          </div>
        )}

        <ContentCta
          title="Log your sag once. Never re-measure blind again."
          desc="Apex Wizard stores your sag, clicker baselines and every change you make — per bike, per session. Free on iOS and Android."
        />
      </ContentLayout>
    </main>
  );
}
