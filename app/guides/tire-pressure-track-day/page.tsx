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

const SLUG = "tire-pressure-track-day";
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
  { id: "cold-vs-hot", label: "01 — Cold pressure vs hot pressure" },
  { id: "gain", label: "02 — Pressure gain explained" },
  { id: "method", label: "03 — The right method" },
  { id: "too-high", label: "04 — Too high: the cold-tear trap" },
  { id: "too-low", label: "05 — Too low: the overheat trap" },
  { id: "before-clickers", label: "06 — Pressure before clickers" },
];

const FAQ = [
  {
    q: "Should I set tire pressure cold or hot?",
    a: "You set it cold because that is the only pressure you can repeat reliably in the paddock, but the number that actually matters is the hot pressure the tire reaches on track. Work backwards: know your hot target from the tire manufacturer or track data, measure hot pressure right after a session, then adjust the cold setting so the tire lands on its hot target.",
  },
  {
    q: "What is normal pressure gain on a track day?",
    a: "For a sportbike on a warm day, hot pressure typically climbs roughly 2 to 4 psi above the cold setting once the tire is up to working temperature. Gain depends on track temperature, pace, tire construction, and load, so treat it as a range you confirm with a gauge rather than a fixed figure. Slicks and dedicated track tires often gain differently from road-legal tires, which is why you log it per tire.",
  },
  {
    q: "Why do track tires run lower pressure than road tires?",
    a: "Lower cold pressure lets the carcass flex and build heat faster, growing the contact patch and getting the tire into its grip window sooner. Road pressures are tuned for longevity, fuel economy, and load-carrying, not peak grip at lean. Always follow the tire manufacturer's track recommendation for your specific compound — never assume a road number transfers to the circuit.",
  },
  {
    q: "Do I adjust tire pressure or suspension clickers first?",
    a: "Pressure first, every time. Tire pressure changes the contact patch, the effective spring rate of the tire, and how the carcass absorbs bumps — so a wrong pressure will mimic or mask a suspension problem. Get pressure into its window before you touch a single compression or rebound clicker.",
  },
  {
    q: "How do I know if my pressure is wrong from the tire surface?",
    a: "Read the wear. A torn, grainy, or bluish-grey surface that the tire never recovered from often points to too much pressure and a tire that ran cold, while a greasy, melted, or rolled-over appearance points to too little pressure and a tire that overheated. Our cold-tear vs hot-tear guide walks through telling these apart so you can adjust in the right direction.",
  },
  {
    q: "Do I need tire warmers to use these pressure targets?",
    a: "Warmers change the starting point, not the principle. With warmers you set your cold target at warmer-off temperature; without them you set a true cold-ambient number and accept a larger gain on the out-laps. Either way, the goal is the same hot working pressure, so log which method you used alongside the reading.",
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
        title="Track Day Tire"
        accent="Pressure."
        updated="June 2026"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: guide.shortTitle },
        ]}
        intro="You set pressure cold, but the tire works at its hot pressure. The gap between the two &mdash; pressure gain &mdash; is where most track-day grip problems are won or lost. Get the cold number right so the tire lands on its hot target, and the rest of your setup finally tells the truth."
      />

      <ContentLayout toc={<TableOfContents items={TOC} />}>
        <SummaryCard
          title="Key takeaways"
          items={[
            <>You set pressure <strong>cold</strong>, but the tire actually works at its <strong>hot</strong> pressure.</>,
            <>The difference is <strong>pressure gain</strong> &mdash; commonly <strong>2&ndash;4 psi</strong> on a sportbike.</>,
            <>Tune to a <strong>hot target</strong>: measure hot, then adjust the cold setting to hit it.</>,
            <>Too high &mdash; small contact patch, cold-tear and chatter; too low &mdash; overheating, squirm and hot-tear.</>,
            <>Track tires and slicks usually run <strong>lower</strong> than road pressures &mdash; follow the tire maker&rsquo;s figures.</>,
            <>Set pressure <strong>before</strong> you touch a single damping clicker.</>,
          ]}
        />

        <Section id="cold-vs-hot" number="01" title="Cold pressure vs hot pressure">
          <p>
            There are two pressures in play on every track day, and confusing them
            is the root of most grip complaints. <strong>Cold pressure</strong> is
            what your gauge reads in the paddock before the tire has done any work.
            <strong> Hot pressure</strong> is what the tire holds once it is up to
            working temperature, leaned over and loaded. The cold number is the one
            you can set; the hot number is the one that actually grips.
          </p>
          <p>
            A tire only works properly inside a window of operating pressure and
            temperature. Set it up to live in that window when it is hot &mdash;
            not when it is cold in the pits. The cold figure is simply the dial you
            turn to land on the hot target you care about.
          </p>
          <Callout variant="tip" title="Mental model">
            Cold pressure is the setting; hot pressure is the result. You do not
            tune the setting to feel good cold &mdash; you tune it so the tire is
            correct when it is hot and doing the work.
          </Callout>
        </Section>

        <Section id="gain" number="02" title="Pressure gain explained">
          <p>
            As a tire works, the carcass flexes, friction with the track builds
            heat, and the air inside expands. That rise from cold setting to hot
            working pressure is <strong>pressure gain</strong>. On a sportbike on a
            warm day, expect roughly <strong>2&ndash;4 psi</strong> of gain by the
            time the tire is in its window &mdash; but treat that as a starting
            range, not a fixed law.
          </p>
          <p>Gain is not a constant. It rises with:</p>
          <ul>
            <li><strong>Track temperature</strong> &mdash; hotter asphalt, more heat into the tire.</li>
            <li><strong>Pace and load</strong> &mdash; harder you push, more carcass flex and friction.</li>
            <li><strong>Tire construction and compound</strong> &mdash; a road tire, a track tire and a slick all behave differently.</li>
            <li><strong>Cold starting pressure</strong> &mdash; lower cold pressure flexes more and tends to gain more.</li>
          </ul>
          <p>
            Because gain shifts with conditions, you cannot just memorise a cold
            number and trust it across a season. The only honest way to know your
            gain is to measure hot pressure right after a session and compare it to
            what you set cold. Log it per tire, per session &mdash; the pattern is
            what makes you fast at setting up, not any single reading.
          </p>
          <Callout variant="info" title="Measure within seconds of coming in">
            A tire bleeds heat fast once you stop. Take the hot reading the instant
            you are off track, in pit lane, before the carcass cools &mdash; even a
            minute of waiting can cost you a psi and skew your math.
          </Callout>
        </Section>

        <Section id="method" number="03" title="The right method">
          <p>
            The correct workflow runs backwards from the hot target, not forwards
            from a guessed cold number:
          </p>
          <ul>
            <li>
              <strong>Know your hot target.</strong> Get it from the tire
              manufacturer&rsquo;s track recommendation for your exact compound, or
              from trusted track data for your tire and circuit. This is the number
              the tire is designed to grip at.
            </li>
            <li>
              <strong>Set a sensible cold starting pressure.</strong> Use the tire
              maker&rsquo;s suggested cold figure as your first guess &mdash; for
              track tires and slicks this is usually <em>lower</em> than the
              road pressure printed near the swingarm.
            </li>
            <li>
              <strong>Run a session, then measure hot immediately.</strong> Read
              the pressure in pit lane the moment you are in.
            </li>
            <li>
              <strong>Adjust the cold setting to hit the hot target.</strong> If
              hot pressure came in above target, drop the cold setting; if it came
              in below, raise it. Re-run and re-measure until hot lands in the
              window.
            </li>
          </ul>
          <p>
            That is the whole discipline: you chase the hot number by adjusting the
            cold one. It is the same logic as{" "}
            <Link href={guidePath("setting-motorcycle-sag")}>setting sag</Link>{" "}
            &mdash; you cannot measure the thing you care about directly while
            riding, so you set a repeatable proxy and verify it against the real
            target. Keeping a written record of cold setting, hot reading and
            conditions turns guesswork into a trend you can lean on, the same way a
            logged setup baseline does in the{" "}
            <Link href="/tuning-guide">suspension tuning guide</Link>.
          </p>
          <Callout variant="warning" title="One gauge, kept honest">
            Use the same gauge for cold and hot, and trust nothing you have not
            checked against a known-good reference. A gauge that reads 2 psi high
            poisons your whole method &mdash; you will chase a hot target you never
            actually reach. Pick one accurate gauge and use it for everything.
          </Callout>
        </Section>

        <Section id="too-high" number="04" title="Too high: the cold-tear trap">
          <p>
            Over-inflate and the carcass cannot flex the way it needs to. The
            contact patch shrinks, the tire struggles to build heat, and it never
            climbs into its grip window. A cold, hard tire skating on a small patch
            gives you the classic symptoms:
          </p>
          <ul>
            <li><strong>Vague, greasy front</strong> that feels like it is on a film of oil.</li>
            <li><strong>Chatter</strong>, because an over-pressured tire is a stiffer spring with less damping of its own.</li>
            <li>
              <strong>Cold-tear</strong> &mdash; a torn, grainy, never-cleaned-up
              surface left by a tire that was sliding while still below temperature.
            </li>
          </ul>
          <p>
            That chatter is worth flagging: front-end chatter under hard braking is
            so often a pressure problem first that it is the opening suspect in our{" "}
            <Link href={guidePath("chatter-under-braking")}>
              braking-chatter guide
            </Link>
            . Before you reach for a compression clicker, confirm the front
            pressure is in its window.
          </p>
          <Callout variant="danger" title="Don&rsquo;t fix cold-tear with more heat alone">
            It is tempting to ride harder to &ldquo;get heat into it.&rdquo; If the
            cause is over-pressure, harder riding on a small, cold patch just risks
            a cold crash. Drop pressure into the window first, then build pace.
            Learn to tell this damage apart in the{" "}
            <Link href={guidePath("cold-tear-vs-hot-tear")}>
              cold-tear vs hot-tear guide
            </Link>
            .
          </Callout>
        </Section>

        <Section id="too-low" number="05" title="Too low: the overheat trap">
          <p>
            Under-inflate and you get the opposite failure. The carcass flexes too
            much, generates more heat than it can shed, and overheats. An
            overheated tire goes off &mdash; it gets greasy, the surface starts to
            melt and smear, and grip falls away as the session goes on. The feel is
            distinctive:
          </p>
          <ul>
            <li><strong>Squirm and wallow</strong> mid-corner, as the soft carcass deforms under load.</li>
            <li><strong>Vague, mushy feedback</strong> that gets worse, not better, the longer you run.</li>
            <li>
              <strong>Hot-tear</strong> &mdash; a melted, smeared, sometimes
              rolled-over surface from a tire run past its temperature window.
            </li>
          </ul>
          <p>
            Cold-tear and hot-tear can look similar at a glance but point in
            opposite directions &mdash; one says raise the temperature into the
            window, the other says you blew past it. Reading them correctly is the
            difference between adding and removing pressure, which is exactly why
            the{" "}
            <Link href={guidePath("cold-tear-vs-hot-tear")}>
              cold-tear vs hot-tear guide
            </Link>{" "}
            is the companion piece to this one.
          </p>
          <Callout variant="info" title="A too-low tire can also drift your handling">
            An overheating, squirming rear changes the line the bike wants to take
            and can make a bike feel like it{" "}
            <Link href={guidePath("motorcycle-runs-wide")}>runs wide</Link> on
            exit. Rule pressure out before you blame geometry &mdash; it is faster
            to check and undoes a lot of chassis settings.
          </Callout>
        </Section>

        <Section id="before-clickers" number="06" title="Pressure before clickers">
          <p>
            Here is the rule that ties it all together: <strong>tire pressure comes
            before any damping change.</strong> Pressure sets the size of the
            contact patch, the tire&rsquo;s own spring rate, and how the carcass
            soaks up small bumps. Get it wrong and the tire will mimic or hide a
            suspension fault &mdash; you will turn clickers all day chasing a
            problem that lives in the air, not the fork.
          </p>
          <p>The order of operations on a setup day is simple:</p>
          <ul>
            <li><strong>Sag and ride height</strong> &mdash; the geometry baseline.</li>
            <li><strong>Tire pressure</strong> &mdash; land it on its hot target.</li>
            <li><strong>Damping clickers</strong> &mdash; only now does adjusting compression and rebound behave predictably.</li>
          </ul>
          <p>
            Skip the first two and your clicker work is built on sand. Manufacturer
            track recommendations vary by model and tire fitment, so cross-check
            your bike &mdash; for example the{" "}
            <Link href="/setup/yamaha">Yamaha</Link> or{" "}
            <Link href="/setup/ducati">Ducati</Link> pages in the{" "}
            <Link href="/setup">setup database</Link> &mdash; and start from the
            documented figures, not a number a friend ran on a different tire.
            Browse the rest of the{" "}
            <Link href="/guides">diagnostic guides</Link> once pressure and sag are
            locked in, and the symptoms become diagnosable instead of mysterious.
          </p>
          <Callout variant="tip" title="Log it or lose it">
            A pressure number you did not write down is a number you will guess
            next time. Record cold setting, hot reading, track temp and pace every
            session &mdash; that record is what lets you walk up to a fresh
            track-day with a known starting point instead of a blank gauge.
          </Callout>
        </Section>

        <Section id="faq" number="07" title="Tire pressure FAQ">
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
          title="Track your pressures the way the fast guys do."
          desc="Apex Wizard's Tire Manager logs cold settings, hot readings and pressure gain per tire, per session — so you start every track day from a known number, not a guess. Free on iOS and Android."
        />
      </ContentLayout>
    </main>
  );
}
