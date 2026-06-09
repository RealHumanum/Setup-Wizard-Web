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

const SLUG = "chatter-under-braking";
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
    images: ["/assets/hero 2.png"],
  },
};

const TOC = [
  { id: "what", label: "01 — What chatter is" },
  { id: "tires", label: "02 — Start with tires" },
  { id: "sag", label: "03 — Check sag next" },
  { id: "rebound", label: "04 — Rebound and packing" },
  { id: "compression", label: "05 — Compression and texture" },
  { id: "technique", label: "06 — Technique and release" },
];

const FAQ = [
  {
    q: "Is braking chatter a suspension problem or a tire problem?",
    a: "More often than not it starts with the tire, not the suspension. Pressure that is too high, a tire that is old or heat-cycled, or rubber that is simply too cold to grip will all chatter under load. Rule the tire out first, because changing clickers to mask a tire problem only moves the resonance around instead of removing it.",
  },
  {
    q: "Why does adding compression damping sometimes make chatter worse?",
    a: "Chatter is a resonance — an oscillation the system sustains at a particular frequency. Stiffening compression can push the front into a harsher part of its range and feed the very vibration you are trying to kill. The goal is to change how the system responds, not simply to make it stiffer. Sometimes opening compression a click or two helps more than closing it.",
  },
  {
    q: "How do I tell setup chatter from tire chatter on track?",
    a: "Setup chatter tends to be repeatable and tied to a specific load — it shows up every lap at the same hard braking zone regardless of tire temperature. Tire chatter changes with the tire: it eases as the tire comes up to temperature, worsens late in a worn session, or appears the moment pressures climb. Logging pressures and laps alongside the symptom is the fastest way to separate the two.",
  },
  {
    q: "Can low front sag cause braking chatter?",
    a: "Yes. If front sag is too low — too much preload — the fork sits high in its travel and works in a harsh, less compliant part of its stroke under braking. That stiffness can let small surface inputs set up an oscillation. Confirm your front sag is in the 30–38 mm window before chasing damping clickers.",
  },
  {
    q: "Does abrupt brake release cause chatter?",
    a: "It can trigger or amplify it. Snapping off the brakes lets the fork rebound suddenly and unloads the front tire, which can start an oscillation right at the point you are trying to settle the bike for turn-in. Trailing the brakes off smoothly keeps the front loaded and the contact patch planted, which usually quiets the front end through the transition.",
  },
  {
    q: "What should I change first if my bike chatters under braking?",
    a: "Work cheapest and most likely first: check tire pressure and condition, then confirm front sag, then look at rebound, then compression, and finally technique. Change one thing at a time and re-test. If you skip straight to clickers you will often chase a symptom whose real cause was the tire or the geometry baseline.",
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
        title="Chatter Under"
        accent="Braking."
        updated="June 2026"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: guide.shortTitle },
        ]}
        intro="That fast buzz through the bars as you brake into a corner is a resonance, not just a stiffness. Chase it in the wrong order and you&rsquo;ll spend a whole session turning clickers that were never the problem. Here&rsquo;s the order that actually finds it."
      />

      <ContentLayout toc={<TableOfContents items={TOC} />}>
        <SummaryCard
          title="Key takeaways"
          items={[
            <>Chatter is a <strong>resonance</strong> &mdash; the fix is changing the system&rsquo;s behaviour, not just stiffening it.</>,
            <>Diagnose cheapest-first: <strong>tires &rarr; sag &rarr; rebound &rarr; compression &rarr; technique</strong>.</>,
            <>Tires cause most braking chatter: pressure too high, too old, too cold, or wrong compound.</>,
            <>Front sag too low forces the fork into a harsh part of its travel under braking.</>,
            <>Rebound too slow lets the fork <strong>pack down</strong> over bumps and lose compliance.</>,
            <>Change one thing at a time and re-test &mdash; chatter lies to you when you stack changes.</>,
          ]}
        />

        <Section id="what" number="01" title="What chatter actually is">
          <p>
            Chatter is a fast, repeating oscillation you feel through the bars
            and the front tire as you brake hard into a corner. It is not random
            harshness over a single bump &mdash; it is a <strong>resonance</strong>,
            a vibration the front of the motorcycle sustains at a particular
            frequency because the contact patch is loading and unloading in a
            rhythmic cycle it cannot damp out.
          </p>
          <p>
            That word &mdash; resonance &mdash; is the whole key to fixing it.
            When something resonates, the answer is rarely &ldquo;make it
            stiffer.&rdquo; A stiffer system can hold the same oscillation, or a
            worse one, just at a different amplitude. The job is to <em>change
            how the system responds</em> so the vibration can no longer feed
            itself: alter the tire&rsquo;s stiffness, the geometry, or the rate
            at which the fork moves. Stiffening blindly is how riders make
            chatter worse while convinced they are fixing it.
          </p>
          <Callout variant="info" title="Why order matters">
            Because chatter is a system behaviour, several different causes
            produce the same symptom. If you change three things at once you
            learn nothing. Work from the cheapest and most likely cause to the
            rarest, changing one variable at a time. The{" "}
            <Link href="/setup">setup database</Link> and a written log turn this
            from guesswork into a process.
          </Callout>
        </Section>

        <Section id="tires" number="02" title="Start with the tires">
          <p>
            Before you touch a single clicker, rule out the tire. More braking
            chatter comes from the contact patch than from the fork, and tire
            changes are faster and cheaper to test than damping changes. Run
            through these in order:
          </p>
          <ul>
            <li>
              <strong>Pressure too high.</strong> Over-inflated, the tire&rsquo;s
              carcass goes stiff and the contact patch shrinks, so it skips
              rather than absorbs under load. Drop to your correct cold target
              and re-test before anything else.
            </li>
            <li>
              <strong>Too old or heat-cycled.</strong> A tire that has been
              through many heat cycles, or has simply aged, loses the
              elasticity that lets the contact patch deform and grip. Old rubber
              chatters where fresh rubber grips.
            </li>
            <li>
              <strong>Too cold.</strong> Below working temperature the compound
              is hard and the patch skips. If the chatter eases as the tire
              comes up to temperature, you have your answer.
            </li>
            <li>
              <strong>Wrong compound.</strong> A compound too hard for the
              conditions never reaches its grip window and will chatter all
              session.
            </li>
          </ul>
          <p>
            This is exactly why pressure comes before clickers in any session
            plan &mdash; see the full method in the{" "}
            <Link href={guidePath("tire-pressure-track-day")}>
              track day tire pressure guide
            </Link>
            . Apex Wizard&rsquo;s Tire Manager exists to keep this honest: log
            cold and hot pressures, age and heat cycles per tire, so you can see
            whether the chatter tracks the tire or the setup.
          </p>
          <Callout variant="tip" title="Test the cheap cause first">
            A two-PSI pressure drop takes thirty seconds and tells you more than
            an hour of clicker changes. If lowering pressure or warming the tire
            kills the chatter, stop &mdash; you found it, and your fork was never
            at fault.
          </Callout>
        </Section>

        <Section id="sag" number="03" title="Check sag next">
          <p>
            If the tire is good and the chatter persists, the next suspect is
            your geometry baseline &mdash; specifically, front sag that is too
            low. With too much front preload the fork sits high in its travel and
            works in a <strong>harsh, less compliant part of its stroke</strong>.
            Under braking, when load piles onto the front, that stiffness leaves
            the fork unable to swallow small surface inputs, and an oscillation
            sets up.
          </p>
          <p>
            Confirm your front rider sag sits in the <strong>30&ndash;38 mm</strong>{" "}
            window and your rear in <strong>25&ndash;30 mm</strong> before you
            blame damping. Sag is the platform every clicker reads against, and a
            front that is too high changes both where the fork operates and how
            much trail you carry into the corner. Get the full method in the{" "}
            <Link href={guidePath("setting-motorcycle-sag")}>
              setting motorcycle sag guide
            </Link>
            .
          </p>
          <Callout variant="warning" title="Don&rsquo;t fix geometry with damping">
            If front sag is wrong, no clicker setting will truly cure the
            chatter &mdash; you are using damping to paper over a geometry fault,
            and the bike will stay sensitive. Set sag correctly first, then
            re-test the braking zone. Many &ldquo;chatter&rdquo; problems vanish
            here.
          </Callout>
        </Section>

        <Section id="rebound" number="04" title="Rebound and packing down">
          <p>
            With tires and sag ruled out, look at rebound damping &mdash;
            usually the next real culprit, and the one riders most often get
            backwards. Rebound controls how fast the fork extends after it
            compresses. If rebound is <strong>too slow</strong>, the fork cannot
            recover between hits. Over a series of bumps in a braking zone it
            compresses, fails to return fully, compresses again from a lower
            point, and so on &mdash; it <strong>packs down</strong>.
          </p>
          <p>
            A packed-down fork is riding low and stiff, deep in its travel with
            almost no compliance left. That is fertile ground for chatter,
            because the front can no longer absorb the small, rhythmic inputs
            that feed the oscillation. The fix is counter-intuitive to anyone who
            assumes a buzzing front needs <em>more</em> control: try opening
            rebound a click or two so the fork can keep up and stay in a
            compliant part of its stroke.
          </p>
          <ul>
            <li>
              <strong>Symptom of packing:</strong> the front feels progressively
              harsher and lower the longer and bumpier the braking zone, and the
              chatter builds rather than appearing instantly.
            </li>
            <li>
              <strong>Direction to try first:</strong> rebound slightly faster
              (open it) so the fork recovers between bumps.
            </li>
          </ul>
          <Callout variant="tip" title="One click, one lap">
            Rebound effects are easy to feel but easy to over-correct. Change one
            click, run a lap, and note it. The{" "}
            <Link href="/tuning-guide">suspension tuning guide</Link> walks the
            full rebound-and-compression workflow if you want the broader map.
          </Callout>
        </Section>

        <Section id="compression" number="05" title="Compression and surface texture">
          <p>
            Compression damping is the next thing to examine, and it is where the
            &ldquo;resonance, not stiffness&rdquo; idea earns its keep. If front
            compression is <strong>too high</strong>, the fork resists the quick,
            small movements that surface texture demands. Over coarse or rippled
            tarmac under braking, that resistance can transmit and sustain the
            vibration instead of damping it &mdash; the fork is too busy fighting
            the surface to follow it.
          </p>
          <p>
            The instinct when the front buzzes is to add compression to
            &ldquo;control&rdquo; it. Resist that. Adding compression to a
            resonance frequently feeds it, because you are stiffening the exact
            path the oscillation travels. Try the opposite first: open
            compression a click or two so the fork can follow the surface
            texture and let the energy out, then judge whether the chatter eased
            or grew.
          </p>
          <Callout variant="danger" title="Stiffer is not safer here">
            Winding compression in until the chatter feels &ldquo;tied
            down&rdquo; can mask a tire or sag fault while making the front skip
            harder over real bumps &mdash; which costs you grip and warning right
            when you are hardest on the brakes. If opening compression helps,
            trust it over the instinct to stiffen.
          </Callout>
        </Section>

        <Section id="technique" number="06" title="Technique and brake release">
          <p>
            The last variable is the rider. Even a well-set bike can be made to
            chatter by how the brakes come off. Snapping the brakes off abruptly
            lets the fork rebound suddenly and unloads the front tire at the
            worst possible moment &mdash; right as you are trying to settle the
            bike for turn-in. That sharp unloading can start or amplify an
            oscillation the setup would otherwise have handled.
          </p>
          <p>
            The cure is smoothness. <strong>Trail the brakes off</strong>
            progressively rather than releasing them in one motion, keeping the
            front loaded and the contact patch planted through the transition. A
            front that stays loaded stays planted, and a planted front rarely
            chatters. This is also why technique sits last in the order: it is
            free to change, but it is only worth isolating once the tire,
            geometry and damping are honest &mdash; otherwise you cannot tell
            your hands from your hardware.
          </p>
          <p>
            Once you have walked the full order &mdash; tires, sag, rebound,
            compression, technique &mdash; you usually have not just stopped the
            chatter but learned <em>why</em> it happened, which is what makes the
            fix stick. If the front is still misbehaving in other phases, the{" "}
            <Link href={guidePath("motorcycle-runs-wide")}>
              running-wide guide
            </Link>{" "}
            tackles a related corner-entry problem, and Apex Wizard&rsquo;s
            Troubleshooter will walk you through symptom-to-adjustment mapping
            for your specific bike. Browse all of them from the{" "}
            <Link href="/guides">guides hub</Link>, or pull your model&rsquo;s
            baseline from the setup pages for{" "}
            <Link href="/setup/yamaha">Yamaha</Link> or{" "}
            <Link href="/setup/ducati">Ducati</Link>.
          </p>
        </Section>

        <Section id="faq" number="07" title="Braking chatter FAQ">
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
          title="Stop guessing which clicker. Log it, then narrow it."
          desc="Apex Wizard's Tire Manager and Troubleshooter track pressures, tire age and every setup change — so braking chatter becomes a diagnosis, not a mystery. Free on iOS and Android."
        />
      </ContentLayout>
    </main>
  );
}
