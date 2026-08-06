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
import { articleJsonLd, breadcrumbJsonLd, howToJsonLd } from "@/lib/schema";
import { getGuide, guidePath, GUIDES } from "@/lib/guides";
import { withBrand } from "@/lib/seo";

const SLUG = "track-day-fuel-calculation";
const guide = getGuide(SLUG)!;
const PATH = guidePath(SLUG);

export const metadata: Metadata = {
  title: withBrand(guide.title),
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
  { id: "why", label: "01 — Why fuel load matters" },
  { id: "formula", label: "02 — The formula" },
  { id: "burnrate", label: "03 — Finding your burn rate" },
  { id: "example", label: "04 — Worked example: 20 minutes" },
  { id: "weight", label: "05 — Fuel weight and handling" },
  { id: "logging", label: "06 — Dial it in by logging" },
];

const FAQ = [
  {
    q: "How much fuel does a 20-minute track session use?",
    a: "It depends on the bike, the track and your pace, but a sportbike on track typically burns somewhere between 0.5 and 1.0 litres per minute. At those rates a 20-minute session needs roughly 10 to 20 litres of usable fuel before any safety margin. The only reliable number is the one you measure on your own bike, so log it.",
  },
  {
    q: "Why does a bike burn more fuel on track than on the road?",
    a: "On track you spend far more time at wide throttle and high rpm, with hard acceleration out of every corner and very little coasting or cruising. That pushes average fuel flow well above what the same bike uses commuting. A litre-per-minute figure that sounds extreme on the road is normal at race pace.",
  },
  {
    q: "How much does a litre of petrol weigh?",
    a: "Petrol has a density of about 0.74 kg per litre, so a litre weighs roughly 0.74 kg. Ten litres is about 7.4 kg, and a brim-full 17-litre tank adds around 12.5 kg. That mass sits high and forward on the bike, which is exactly why carrying more than you need hurts handling.",
  },
  {
    q: "Is it bad to run a full tank on a short session?",
    a: "For a 20-minute session, yes, a brim-full tank is usually dead weight. The extra fuel sits high on the chassis, raises the centre of mass and slows direction changes without giving you anything in return. Carry enough to finish the session plus a sensible margin, not the whole tank.",
  },
  {
    q: "What safety margin should I add?",
    a: "A reserve of roughly 1 to 2 litres covers an out-lap, an in-lap, a red-flag delay on the warm-up lap, and the simple fact that you cannot drain a tank to the last drop safely. Tighten the margin only once you have logged several sessions and trust your burn-rate number. Running dry on the last lap is dangerous, so when in doubt, keep the reserve.",
  },
  {
    q: "Does fuel load affect my suspension setup?",
    a: "It does, because a full tank changes your loaded weight and shifts the balance forward. If you set sag with a full tank and then run sessions near empty, your effective ride height and balance drift over the session. It is worth knowing roughly where your fuel level sits when you set your baseline.",
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
      <JsonLd
        data={howToJsonLd({
          name: "How to calculate track day fuel load",
          description: guide.description,
          path: PATH,
          steps: [
            {
              name: "Take your session duration",
              text: "Use the scheduled session length in minutes — typically 20 minutes for a track day group.",
            },
            {
              name: "Estimate your burn rate",
              text: "A sportbike at track pace typically burns 0.5 to 1.0 litres per minute. Where you land depends on engine size, your pace and whether the circuit is a power track or a tight technical layout.",
            },
            {
              name: "Choose a deliberate safety margin",
              text: "Add a margin as an explicit input, typically 1–2 litres for a short session, rather than eyeballing a vague bit extra at the pump.",
            },
            {
              name: "Calculate the volume",
              text: "Litres = session duration in minutes × burn rate in litres per minute + safety margin in litres.",
            },
            {
              name: "Convert to weight",
              text: "Weight in kilograms = litres × 0.74, using a petrol density of about 0.74 kg per litre. This is the handling penalty you are accepting for the fuel you carry.",
            },
            {
              name: "Log actual usage and refine",
              text: "Record how much fuel each session actually consumed and adjust your burn rate figure. After a few sessions your number beats any generic estimate.",
            },
          ],
        })}
      />

      <PageHero
        eyebrow={guide.eyebrow}
        title="Track Day Fuel"
        accent="Calculation."
        updated="June 2026"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: guide.shortTitle },
        ]}
        intro="Too little fuel and you coast to a stop on the last lap &mdash; in traffic, at speed, with people behind you. Too much and you&rsquo;re hauling dead weight high on the bike all session. There&rsquo;s a right number, and it&rsquo;s easy to work out."
      />

      <ContentLayout toc={<TableOfContents items={TOC} />}>
        <SummaryCard
          title="Key takeaways"
          items={[
            <>Fuel needed = <strong>session minutes &times; burn rate (L/min) + margin</strong>.</>,
            <>A sportbike on track burns roughly <strong>0.5&ndash;1.0 L/min</strong> &mdash; far more than on the road.</>,
            <>Petrol weighs about <strong>0.74 kg/L</strong>, and it sits high on the bike.</>,
            <>Carry enough to finish plus a <strong>1&ndash;2 L</strong> reserve &mdash; not a brimmed tank.</>,
            <>Burn rate depends on bike, track and pace, so <strong>measure your own</strong>.</>,
            <>Log actual burn every session and your numbers tighten fast.</>,
          ]}
        />

        <Section id="why" number="01" title="Why fuel load matters">
          <p>
            Fuel is the one consumable on your bike that is heavy, sits high, and
            changes through the session. Get the load wrong in either direction
            and it costs you &mdash; just in opposite ways. Under-fuel and you
            risk the engine starving on the final lap, which on a fast bike in a
            group is genuinely dangerous, not just embarrassing. Over-fuel and
            you carry kilograms of <strong>dead weight</strong> perched above the
            tank, blunting every direction change for no benefit.
          </p>
          <p>
            The goal is simple: carry enough to finish the session with a sensible
            reserve, and not a drop more than you have a reason to. That means
            knowing two things &mdash; how long you&rsquo;re out, and how fast your
            bike drinks. The first you control. The second you measure. Everything
            in this guide is about turning those two numbers into a confident fuel
            level before you head out.
          </p>
          <Callout variant="danger" title="Running dry is a crash risk">
            An engine that cuts on the front straight, or a back tire that locks
            momentarily as the fuel pump gasps, puts you and the riders behind you
            at risk. Never trade your safety margin for a hundred grams of saved
            weight. When the maths is close, round up.
          </Callout>
        </Section>

        <Section id="formula" number="02" title="The formula">
          <p>
            The whole calculation is two short lines. The first gives you the
            volume of fuel to put in; the second tells you what that fuel weighs so
            you can judge the handling cost.
          </p>
          <ul>
            <li>
              <strong>Litres</strong> = session duration (min) &times; burn rate
              (L/min) + safety margin (L)
            </li>
            <li>
              <strong>Weight (kg)</strong> = litres &times; 0.74 (petrol density,
              about 0.74 kg per litre)
            </li>
          </ul>
          <p>
            That&rsquo;s it. Three inputs &mdash; duration, burn rate and margin
            &mdash; and the output is a target fuel volume plus the weight penalty
            you&rsquo;re accepting. The only one that takes any thought is burn
            rate, because it isn&rsquo;t a fixed property of the bike: it moves with
            pace, track and even temperature. The next section is about pinning it
            down. This is exactly the maths the Apex Wizard{" "}
            <Link href="/setup">Fuel Manager</Link> runs for you, but it&rsquo;s
            worth understanding by hand so the slider positions mean something.
          </p>
          <Callout variant="info" title="Margin is part of the formula, not an afterthought">
            Notice the safety margin lives inside the equation, not bolted on
            after. Treat it as a deliberate input &mdash; typically 1&ndash;2 L for
            a short session &mdash; rather than a vague &ldquo;bit extra&rdquo;
            you eyeball at the pump.
          </Callout>
        </Section>

        <Section id="burnrate" number="03" title="Finding your burn rate">
          <p>
            Burn rate is the number everyone wants a single answer for, and there
            isn&rsquo;t one. A sportbike at track pace typically burns somewhere
            around <strong>0.5 to 1.0 litres per minute</strong>, but where you
            land in that window depends on real variables:
          </p>
          <ul>
            <li>
              <strong>The bike.</strong> A 1000 cc superbike at full noise drinks
              far harder than a 400 or a middleweight twin.
            </li>
            <li>
              <strong>Your pace.</strong> A novice session at 70% throttle and a
              fast group chasing lap records are not the same draw, even on
              identical machines.
            </li>
            <li>
              <strong>The track.</strong> A power circuit with long straights at
              wide-open throttle burns more than a tight, technical layout where
              you&rsquo;re off the gas more of the lap.
            </li>
          </ul>
          <p>
            Because of all that, a generic figure is only a starting point. The
            honest method is to <em>measure your own</em>: note how much fuel you
            put in, run a known session length, then refill and record what went
            back in. Divide litres used by minutes ridden and you have a burn rate
            that&rsquo;s true for your bike, your pace and that track. Do it a few
            times and a tight, trustworthy number emerges.
          </p>
          <Callout variant="tip" title="Start conservative, then refine">
            For a first outing on an unknown bike or track, assume the high end of
            the range &mdash; nearer 1.0 L/min &mdash; and a healthy margin. It
            costs you a little dead weight for one session. After that you&rsquo;ll
            have a real measurement and can trim down with confidence.
          </Callout>
        </Section>

        <Section id="example" number="04" title="Worked example: a 20-minute session">
          <p>
            Take a typical club track-day group: 20 minutes out, on a 1000 cc
            sportbike, at a solid intermediate pace. Suppose you&rsquo;ve measured
            your burn rate at <strong>0.8 L/min</strong> on this track. Run the
            numbers:
          </p>
          <ul>
            <li>
              <strong>Fuel needed</strong> = 20 min &times; 0.8 L/min + 1.5 L
              margin = <strong>17.5 L</strong>
            </li>
            <li>
              <strong>Weight</strong> = 17.5 L &times; 0.74 = about{" "}
              <strong>13 kg</strong>
            </li>
          </ul>
          <p>
            So roughly 17.5 litres covers the session with a 1.5 L reserve, and
            it adds about 13 kg of fuel to the bike. Now flex the inputs to see how
            sensitive the answer is. Drop to a milder 0.6 L/min and the same
            20 minutes plus margin needs only 13.5 L &mdash; nearly 3 kg lighter.
            Push to a hard 1.0 L/min on a power circuit and you&rsquo;re at
            21.5 L, which may be more than a small tank holds for a single
            session.
          </p>
          <p>
            That spread is the whole point. The difference between guessing
            &ldquo;half a tank&rdquo; and calculating from a measured burn rate is
            several kilograms of fuel either carried needlessly or missing when you
            need it. The same discipline that makes your{" "}
            <Link href={guidePath("tire-pressure-track-day")}>
              tire-pressure targets
            </Link>{" "}
            repeatable applies here: measure, record, decide.
          </p>
        </Section>

        <Section id="weight" number="05" title="Fuel weight and handling">
          <p>
            Fuel isn&rsquo;t just a number on a gauge &mdash; it&rsquo;s mass, and
            mass in the wrong place changes how the bike behaves. The tank sits high
            and forward, so fuel weight raises the bike&rsquo;s centre of mass and
            shifts balance toward the front. A brimmed tank makes the bike feel
            top-heavy and lazy to flick from side to side; as it empties through the
            session, the bike gets lighter and more eager, and your braking markers
            and turn-in feel subtly shift.
          </p>
          <p>
            That&rsquo;s why a full tank on a 20-minute session is usually the wrong
            call: you&rsquo;re carrying the worst-handling state of the bike for
            longer than you need to, with litres you&rsquo;ll never burn. Carrying
            only what the session requires keeps the mass lower and the handling
            more consistent end to end.
          </p>
          <p>
            Fuel load also feeds your chassis baseline. If you set{" "}
            <Link href={guidePath("setting-motorcycle-sag")}>sag</Link> with a full
            tank and then ride sessions near empty, your effective ride height and
            front-to-rear balance drift as the fuel burns off. It&rsquo;s the same
            cause-and-effect that turns a stable bike into one that{" "}
            <Link href={guidePath("motorcycle-runs-wide")}>runs wide</Link> &mdash;
            a balance change you didn&rsquo;t consciously make. Knowing roughly
            where your fuel level sits when you set your baseline keeps the rest of
            your setup honest. The deeper picture lives in the{" "}
            <Link href="/tuning-guide">suspension tuning guide</Link>.
          </p>
          <Callout variant="warning" title="Don't brim it &lsquo;just in case&rsquo;">
            A full tank doesn&rsquo;t buy safety &mdash; a calculated reserve does.
            Topping off to the filler neck only guarantees you carry the maximum
            handling penalty for the entire session, and slosh in a near-full tank
            can upset the bike under hard braking.
          </Callout>
        </Section>

        <Section id="logging" number="06" title="Dial it in by logging">
          <p>
            The single biggest upgrade to your fuel planning is keeping a record.
            Every session, note three things: minutes ridden, litres burned, and
            how hard you pushed. Over a handful of sessions you build a personal
            burn-rate table &mdash; one number for a relaxed warm-up group, a higher
            one for the fast session, maybe a track-by-track breakdown if you ride
            several circuits.
          </p>
          <p>
            With that history, fuel planning stops being guesswork. You can trim
            your margin because you trust the measurement underneath it, and you
            arrive at each track knowing roughly what to put in before the first
            session even starts. The same logging habit that makes your suspension
            changes traceable makes your fuel load predictable.
          </p>
          <ul>
            <li>
              <strong>Log litres in and litres out</strong> per session, not per
              day &mdash; pace varies between groups.
            </li>
            <li>
              <strong>Note the track and conditions</strong>, so a hot, fast day
              and a cool, technical one don&rsquo;t get averaged together.
            </li>
            <li>
              <strong>Keep your margin until the data earns its removal</strong> &mdash;
              tighten it only when several clean sessions agree.
            </li>
          </ul>
          <p>
            Fuel is just one more setup variable worth treating with the same rigor
            as pressures and clickers. Browse the full{" "}
            <Link href="/guides">guides library</Link> for the rest, and if you ride
            a Yamaha or a Ducati, the model pages under{" "}
            <Link href="/setup/yamaha">Yamaha setup</Link> and{" "}
            <Link href="/setup/ducati">Ducati setup</Link> give you a starting point
            to log against.
          </p>
        </Section>

        <Section id="faq" number="07" title="Fuel calculation FAQ">
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
          title="Stop guessing at the pump."
          desc="The Apex Wizard Fuel Manager turns session length and your measured burn rate into an exact fuel volume and weight — and logs every session so your numbers only get sharper. Free on iOS and Android."
        />
      </ContentLayout>
    </main>
  );
}
