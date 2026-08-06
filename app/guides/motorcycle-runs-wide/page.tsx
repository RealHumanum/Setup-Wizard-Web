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
import { withBrand } from "@/lib/seo";

const SLUG = "motorcycle-runs-wide";
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
  { id: "phase", label: "01 — Name the phase first" },
  { id: "entry", label: "02 — Wide on entry" },
  { id: "exit", label: "03 — Wide on exit" },
  { id: "mid", label: "04 — Wide mid-corner" },
  { id: "rule-out", label: "05 — Rule out the rider" },
  { id: "workflow", label: "06 — A clean diagnostic workflow" },
];

const FAQ = [
  {
    q: "What does it mean when a motorcycle runs wide?",
    a: "Running wide means the bike holds a larger radius than you asked for — it drifts toward the outside of the corner and you have to add lever or lift the throttle to hold your line. It is almost always a front grip or geometry problem, but the cause depends entirely on which part of the corner it happens in. Entry, mid-corner and exit run wide for different mechanical reasons.",
  },
  {
    q: "Is running wide on entry the same as running wide on exit?",
    a: "No — they are mechanically opposite problems. Wide on entry usually comes from too much front dive under braking, which steepens rake and shortens trail until the front tucks or pushes. Wide on exit usually comes from too much rear squat under drive, which steepens geometry from the rear and overloads the rear tire. Fixing one with the other's adjustment makes the bike worse.",
  },
  {
    q: "Should I add front or rear compression damping to stop running wide?",
    a: "Add front low-speed compression if the bike runs wide on entry under braking, because that controls fork dive and preserves trail. Add rear low-speed compression if it runs wide on exit under acceleration, because that controls squat. Diagnose the phase before you touch a clicker — the wrong end's compression will not help and may mask the real issue.",
  },
  {
    q: "Can tire pressure make a bike run wide?",
    a: "Yes, especially mid-corner. A front that is over-pressure or has gone cold loses contact-patch area and grip, so the bike pushes wide through the steady-state part of the turn even though damping and geometry are fine. Confirm cold pressures and watch hot pressure gain before chasing it with clickers.",
  },
  {
    q: "How do I know it is the setup and not my riding?",
    a: "Look at where you are looking and where you pick up the throttle. Running wide on exit is very often a rider getting on the gas too early or too hard, or staring at the outside of the track. Before you change the bike, ride a few laps deliberately holding your eyes to the apex and metering the throttle smoothly — if the wide push disappears, it was technique, not the shock.",
  },
  {
    q: "Does sag affect running wide?",
    a: "Strongly. Front sag that is too slack lets the fork dive deep on entry and steepens the front geometry, encouraging an entry push, while rear sag that is too slack lets the bike squat and run wide on drive. Set sag correctly before any damping change so you are tuning damping on top of correct geometry, not using clickers to paper over a ride-height error.",
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
        title="Why Your Motorcycle"
        accent="Runs Wide."
        updated="June 2026"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: guide.shortTitle },
        ]}
        intro="&ldquo;It runs wide&rdquo; is not a diagnosis &mdash; it&rsquo;s three different problems wearing the same coat. Wide on entry and wide on exit are mechanically opposite. Name the phase before you touch a single clicker, or you&rsquo;ll spend the day fixing the wrong end."
      />

      <ContentLayout toc={<TableOfContents items={TOC} />}>
        <SummaryCard
          title="Key takeaways"
          items={[
            <>Running wide is a front-grip or geometry problem &mdash; but the cause depends on <strong>which phase</strong> of the corner it happens in.</>,
            <><strong>Entry</strong> wide: too much front dive under braking steepens rake, shortens trail, the front pushes. Add front low-speed compression or check front sag.</>,
            <><strong>Exit</strong> wide: too much rear squat under drive overloads the rear. Add rear low-speed compression or check rear sag and rebound.</>,
            <><strong>Mid-corner</strong> wide is usually spring rate, ride height or tire pressure &mdash; not damping.</>,
            <>Entry and exit fixes are <em>opposite</em>: applying one to the other&rsquo;s symptom makes the bike worse.</>,
            <>Set <Link href={guidePath("setting-motorcycle-sag")}>sag</Link> and confirm tire pressure before any clicker change.</>,
          ]}
        />

        <Section id="phase" number="01" title="Name the phase before you touch anything">
          <p>
            &ldquo;The bike runs wide&rdquo; is the most common complaint in any
            pit lane, and the least useful sentence a rider can say. Running wide
            simply means the motorcycle is holding a larger radius than you asked
            for: it drifts toward the outside, you add lever or roll off, and you
            lose the line. That symptom can come from the front pushing, the rear
            steering the bike out, or the geometry quietly working against you
            &mdash; and the only way to tell them apart is to ask{" "}
            <strong>where in the corner it happens</strong>.
          </p>
          <p>
            A corner has three phases, and each one loads the chassis
            differently:
          </p>
          <ul>
            <li>
              <strong>Entry</strong> &mdash; trail-braking down to the apex, weight
              forward, fork compressed.
            </li>
            <li>
              <strong>Mid-corner</strong> &mdash; off the brakes, neutral throttle,
              the bike at maximum lean in steady state.
            </li>
            <li>
              <strong>Exit</strong> &mdash; picking up the throttle, weight
              transferring rearward, the shock compressing under drive.
            </li>
          </ul>
          <p>
            Wide on entry and wide on exit are not variations of one problem. They
            are <em>opposite</em> problems with opposite fixes, and the adjuster
            that cures one will make the other worse. So before you reach for a
            screwdriver, run the lap back in your head and pin the moment the bike
            started to drift.
          </p>
          <Callout variant="tip" title="One question first">
            When did you lose the line &mdash; while you were still braking, at the
            apex with the throttle neutral, or once you cracked the gas open? That
            single answer points you at the front, the chassis, or the rear. Most
            wasted clicker time comes from skipping it.
          </Callout>
        </Section>

        <Section id="entry" number="02" title="Wide on entry: the front is diving too far">
          <p>
            If the bike pushes wide while you are <strong>still on the brakes</strong>{" "}
            &mdash; the front feels light, vague, or like it wants to tuck as you
            trail toward the apex &mdash; the problem is almost always at the front,
            and it is geometric.
          </p>
          <p>
            Under braking the fork compresses. As it dives, the front of the bike
            drops, which <strong>steepens the rake</strong> and{" "}
            <strong>shortens the trail</strong>. Trail is what gives the front tire
            its self-centring stability; lose too much of it and the front goes
            nervous and starts to push or tuck. The bike is technically steering
            faster, but with less grip and less feel, so it washes toward the
            outside instead of holding the arc. You are effectively trying to corner
            on a chassis geometry the bike was never set up to use.
          </p>
          <h3>What to change</h3>
          <ul>
            <li>
              <strong>Add front low-speed compression damping.</strong> This slows
              the rate of dive under braking and keeps the fork higher in its
              stroke, preserving rake and trail when you need them most. Go a click
              or two at a time and re-test.
            </li>
            <li>
              <strong>Check that front rider sag isn&rsquo;t too slack.</strong> If
              the front sits low to begin with, it starts every entry already deep
              in its travel and runs out of geometry early. Confirm front rider sag
              is in the <strong>30&ndash;38 mm</strong> window before you blame the
              clickers.
            </li>
            <li>
              <strong>Consider a touch more fork preload or oil height</strong> if
              the fork is blowing through its stroke and bottoming, which produces
              the same trail loss in a more violent form.
            </li>
          </ul>
          <Callout variant="warning" title="Don't chase it with rebound">
            A front that tucks on entry tempts riders to slow the rebound so it
            &ldquo;stays planted.&rdquo; That is the wrong lever. Slow rebound
            packs the fork down over successive bumps and braking events, leaving
            it <em>lower</em> and the trail even <em>shorter</em> &mdash; the exact
            opposite of what you want. Control dive with compression, not rebound.
          </Callout>
        </Section>

        <Section id="exit" number="03" title="Wide on exit: the rear is squatting too far">
          <p>
            If the bike holds the apex fine but pushes wide{" "}
            <strong>the moment you open the throttle</strong> &mdash; you feel it
            stand up and drift toward the outside under drive &mdash; you have the
            mirror-image problem. This time the cause is at the rear.
          </p>
          <p>
            As you accelerate, weight transfers rearward and the shock compresses
            (squat). Some squat is good; it loads the rear tire for grip. Too much,
            and the rear of the bike drops far enough to{" "}
            <strong>steepen the geometry from the back</strong> while simultaneously
            asking the rear tire for more drive grip than the contact patch can
            deliver. The rear effectively over-steers the bike outward, the front
            goes light, and you run wide &mdash; not because the front lost grip, but
            because the rear changed the bike&rsquo;s attitude under power.
          </p>
          <h3>What to change</h3>
          <ul>
            <li>
              <strong>Add rear low-speed compression damping.</strong> This limits
              how fast and how far the shock squats as you pick up the throttle,
              holding ride height and keeping the geometry the bike was built for.
            </li>
            <li>
              <strong>Check rear rider sag.</strong> Too much rear sag
              (outside the <strong>25&ndash;30 mm</strong> window) lets the bike sit
              low at the back and squat further under drive. Tighten it before
              touching damping.
            </li>
            <li>
              <strong>Look at rear rebound.</strong> If rebound is too slow, the
              shock packs down lap after lap and never fully recovers ride height,
              so it behaves like it has too little sag even when the static number
              is right.
            </li>
          </ul>
          <Callout variant="info" title="Entry and exit fixes are opposite">
            Notice the symmetry: an entry push wants <em>more front</em> support, an
            exit push wants <em>more rear</em> support. If you add rear compression
            to cure an entry tuck, or front compression to cure an exit push, you
            are loading the wrong end and you will chase the problem all day. This
            is the whole reason naming the phase comes first &mdash; and it&rsquo;s
            exactly the logic baked into the symptom-based{" "}
            <Link href="/setup">Troubleshooter</Link>.
          </Callout>
        </Section>

        <Section id="mid" number="04" title="Wide mid-corner: usually not damping at all">
          <p>
            The third case is the trickiest, because riders reflexively reach for
            clickers and clickers are usually the wrong tool. If the bike pushes
            wide in the <strong>steady-state middle of the corner</strong> &mdash;
            off the brakes, throttle neutral or barely cracked, at full lean &mdash;
            damping has little to do with it. The suspension isn&rsquo;t moving much
            in that phase. What matters is the platform the bike is sitting on and
            the grip the front tire can make.
          </p>
          <p>
            Work through these, roughly in order of how often they&rsquo;re the
            culprit:
          </p>
          <ul>
            <li>
              <strong>Tire pressure and temperature.</strong> A front that is
              over-pressure, or that has dropped below working temperature, loses
              contact-patch area and pushes mid-corner regardless of how perfect the
              damping is. Confirm cold targets and hot gain before anything else
              &mdash; see the{" "}
              <Link href={guidePath("tire-pressure-track-day")}>
                track-day tire pressure
              </Link>{" "}
              guide.
            </li>
            <li>
              <strong>Ride height and overall geometry.</strong> A front that sits
              too high (or a rear too low) lazies the steering and makes the bike
              reluctant to hold a tight line. This is a sag and ride-height
              question, not a clicker question.
            </li>
            <li>
              <strong>Spring rate.</strong> A spring that&rsquo;s wrong for your
              weight changes how the bike carries itself at lean. If you&rsquo;ve
              wound preload to its limit to hit sag, the rate is wrong and no
              clicker will rescue mid-corner grip.
            </li>
          </ul>
          <Callout variant="danger" title="Don't damp a pressure problem">
            Adding compression or rebound to fix a mid-corner push that&rsquo;s
            actually caused by a cold or over-inflated front tire will make the bike
            feel worse everywhere else &mdash; harsh on entry, stiff on exit &mdash;
            while never touching the real cause. Read the tire first. Hot-tear or
            greasy-feeling rubber is a loud clue; learn to read it in the{" "}
            <Link href={guidePath("cold-tear-vs-hot-tear")}>
              cold tear vs hot tear
            </Link>{" "}
            guide.
          </Callout>
        </Section>

        <Section id="rule-out" number="05" title="Rule out the rider before you blame the bike">
          <p>
            A surprising share of &ldquo;running wide&rdquo; complaints &mdash;
            especially on exit &mdash; are technique, not hardware. The bike is
            honest; it does what the inputs tell it to. Before you change a setting,
            spend a session ruling out the two most common rider causes:
          </p>
          <ul>
            <li>
              <strong>Throttle timing.</strong> Picking the gas up too early, or
              too aggressively, forces squat and drive at a point in the corner
              where the bike can&rsquo;t use it &mdash; and out you go. Try metering
              the throttle on smoothly and slightly later, and see if the push
              disappears.
            </li>
            <li>
              <strong>Vision.</strong> Eyes drifting to the outside of the track
              pull the bike with them. Discipline your eyes to the apex and the exit
              point you actually want, and the line tends to tighten on its own.
            </li>
          </ul>
          <p>
            This isn&rsquo;t about blame &mdash; it&rsquo;s about not spending your
            tire allowance chasing a clicker change that can&rsquo;t fix a
            throttle-timing habit. If a few deliberate laps make the wide push go
            away, log that and move on. If it persists no matter how clean you ride,
            then it&rsquo;s the bike, and the phase you identified tells you exactly
            which end to work on.
          </p>
          <Callout variant="tip" title="Change one thing at a time">
            Whether the fix is a clicker, sag or technique, isolate it. Make one
            change, run a clean lap or three, and write down what happened before
            you touch anything else. The{" "}
            <Link href="/tuning-guide">suspension tuning guide</Link> walks through
            this one-variable discipline in detail &mdash; it&rsquo;s what turns
            guessing into diagnosis.
          </Callout>
        </Section>

        <Section id="workflow" number="06" title="A clean diagnostic workflow">
          <p>
            Put it together and the whole problem collapses into a short, repeatable
            routine. Next time the bike runs wide, work it in this order rather than
            reaching for the nearest screwdriver:
          </p>
          <ul>
            <li>
              <strong>1. Name the phase.</strong> Entry (on the brakes),
              mid-corner (neutral throttle), or exit (on the gas)? Don&rsquo;t move
              until you&rsquo;ve answered this.
            </li>
            <li>
              <strong>2. Rule out the rider.</strong> Especially on exit &mdash;
              check throttle timing and vision over a deliberate session.
            </li>
            <li>
              <strong>3. Confirm the platform.</strong> Are{" "}
              <Link href={guidePath("setting-motorcycle-sag")}>sag</Link> and tire
              pressure correct? Fix geometry and grip before damping, every time.
            </li>
            <li>
              <strong>4. Apply the phase-specific fix.</strong> Entry &rarr; front
              low-speed compression. Exit &rarr; rear low-speed compression.
              Mid-corner &rarr; pressure, ride height or spring rate.
            </li>
            <li>
              <strong>5. Change one thing, log it, re-test.</strong> A click or two,
              a clean lap, a written note. Repeat.
            </li>
          </ul>
          <p>
            That sequence is the difference between a rider who fixes the bike in a
            session and one who turns clickers all day and finishes more confused
            than they started. Browse the rest of the{" "}
            <Link href="/guides">diagnostic guides</Link> for the neighbouring
            symptoms &mdash; a front that washes on entry often shows up alongside{" "}
            <Link href={guidePath("chatter-under-braking")}>
              chatter under braking
            </Link>
            , and both are easier to read once your baseline is logged. If
            you&rsquo;re after a model-specific starting point, the{" "}
            <Link href="/setup/yamaha">Yamaha</Link> and{" "}
            <Link href="/setup/ducati">Ducati</Link> setup pages give you factory
            adjuster ranges to work from.
          </p>
          <Callout variant="info" title="Let the symptom map the fix">
            Apex Wizard&rsquo;s Troubleshooter is built on exactly this phase-first
            logic: you tell it where in the corner the bike misbehaves, and it
            returns the adjuster &mdash; and the direction &mdash; that actually
            addresses it, in clicks or turns. Start from the{" "}
            <Link href="/setup">setup tools</Link> rather than guessing.
          </Callout>
        </Section>

        <Section id="faq" number="07" title="Running-wide FAQ">
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
          title="Stop guessing. Diagnose by corner phase."
          desc="Apex Wizard's symptom-based Troubleshooter turns 'it runs wide' into the exact clicker, direction and amount — per bike, per phase. Free on iOS and Android."
        />
      </ContentLayout>
    </main>
  );
}
