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

const SLUG = "cold-tear-vs-hot-tear";
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
  { id: "why", label: "01 — Why it matters" },
  { id: "cold", label: "02 — Cold tear" },
  { id: "hot", label: "03 — Hot tear" },
  { id: "tell", label: "04 — Telling them apart" },
  { id: "fixes", label: "05 — What to change" },
  { id: "order", label: "06 — Pressure & temp first" },
];

const FAQ = [
  {
    q: "How do I tell cold tear from hot tear if both look torn?",
    a: "Look at the surface texture, not just the fact that it is ragged. Cold tear leaves a dry, grainy, matte surface with small lifted flecks of rubber that have torn away before melting. Hot tear leaves a shiny, smeared, greasy-looking surface, often with a blue or brown tint and sometimes small blisters. Cold tear feels rough and dusty; hot tear feels slick and almost polished.",
  },
  {
    q: "Does cold tear mean my tire pressure is too high or too low?",
    a: "Cold tear usually means the tire is not making enough heat, and excessive cold pressure is a common cause because it reduces the contact patch and the flex that generates heat. Dropping cold pressure a little, within the manufacturer's safe range, lets the carcass work harder and warm up. Tire warmers and a softer compound attack the same problem from the heat side.",
  },
  {
    q: "Can a fresh, properly warmed tire still tear?",
    a: "Yes. A tire that is up to temperature and at the right pressure can still hot-tear if the chassis or your inputs are overworking one part of it — for example, spinning the rear on corner exit or overloading the front on entry. In that case the tear is a setup or technique symptom, not a tire-choice problem, and the fix lives in geometry, damping, or throttle control rather than pressure.",
  },
  {
    q: "Is tearing the same as graining?",
    a: "They are related but not identical. Graining is the early, milder stage where the surface develops a rippled, orange-peel texture as cold rubber rolls and lifts. Cold tear is essentially graining taken further, where the lifted rubber actually breaks away in flecks. Both point to a tire being asked for more grip than its current temperature can give.",
  },
  {
    q: "Which compound should I switch to if I keep cold-tearing?",
    a: "Counterintuitively, a softer compound often helps a cold-tearing tire because it reaches working temperature faster and at lower load. Only move harder if the tire is overheating. Confirm which problem you actually have before changing compound, because guessing wrong makes it worse — a harder tire on a cold-tear problem will simply never come in.",
  },
  {
    q: "Should I trust tear marks over a single session?",
    a: "Read tear against the conditions that produced it. A cold, damp morning session that cold-tears tells you little about how the same tire behaves at midday. Log track temperature, ambient, cold and hot pressures, and compound alongside the wear photo so the pattern means something across the day instead of in isolation.",
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
        title="Cold Tear vs"
        accent="Hot Tear."
        updated="June 2026"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: guide.shortTitle },
        ]}
        intro="A torn, ragged tire surface can mean two opposite things. Cold tear says the tire is too cold for the grip you&rsquo;re demanding; hot tear says it&rsquo;s overheating and giving up. Read it wrong and you&rsquo;ll change exactly the thing that makes it worse."
      />

      <ContentLayout toc={<TableOfContents items={TOC} />}>
        <SummaryCard
          title="Key takeaways"
          items={[
            <>Cold and hot tear look similar but point to <strong>opposite</strong> causes.</>,
            <><strong>Cold tear:</strong> dry, grainy, small lifted flecks &mdash; the tire is too cold.</>,
            <><strong>Hot tear:</strong> shiny, smeared, discoloured, sometimes blistered &mdash; the tire is overheating.</>,
            <>Cold-tear fixes <strong>add heat</strong>; hot-tear fixes <strong>remove heat or load</strong>.</>,
            <>Get pressure and temperature right <strong>before</strong> you blame suspension.</>,
            <>Log conditions with every wear photo or the pattern means nothing.</>,
          ]}
        />

        <Section id="why" number="01" title="Why reading tear matters">
          <p>
            A tire is the only honest witness on the bike. It records exactly how
            much grip you asked for and how the rubber answered, lap after lap. The
            problem is that two of the most common distress patterns &mdash;{" "}
            <strong>cold tear</strong> and <strong>hot tear</strong> &mdash; look
            almost identical at a glance. Both leave a torn, ragged surface that
            makes a rider wince. But they are caused by opposite conditions, and
            the correct fix for one is the wrong fix for the other.
          </p>
          <p>
            Misread the tear and you compound the problem. Drop pressure to chase
            heat into a tire that is already overheating, and you push it further
            into the greasy zone. Add pressure to a tire that never came up to
            temperature, and you starve it of the flex it needs to warm up. The
            stakes are real: a tire reading the symptom backwards can cost you a
            full set of rubber and a confidence-destroying session.
          </p>
          <Callout variant="info" title="One pattern, two stories">
            Ragged rubber is the headline, not the story. The story is in the
            <em> texture</em> of the torn surface &mdash; dry and grainy, or
            smeared and shiny &mdash; and in what the rest of the tire and the day
            were doing. Read the texture, not just the damage.
          </Callout>
        </Section>

        <Section id="cold" number="02" title="Cold tear: too cold for the grip">
          <p>
            Cold tear happens when the tire is asked for more grip than its current
            temperature can supply. Rubber generates grip partly through molecular
            adhesion that only works in a temperature window. Below that window the
            surface is too hard and brittle to deform and key into the track, so
            instead of gripping and releasing cleanly, small pieces of the top
            layer tear away before they ever reach working temperature.
          </p>
          <h3>What it looks like</h3>
          <ul>
            <li>A <strong>dry, matte, grainy</strong> surface &mdash; no sheen.</li>
            <li>
              Small <strong>torn flecks and lifted scabs</strong> of rubber, often
              rolled toward the edge of the contact patch.
            </li>
            <li>
              A texture that can shade from light <em>graining</em> (orange-peel
              ripples) into outright tearing as it worsens.
            </li>
            <li>
              It feels <strong>rough and dusty</strong> to the fingertip, not
              slick.
            </li>
          </ul>
          <p>
            Cold tear shows up most on cold, damp mornings, on the first session of
            the day, on the side of the tire you use least (so it never builds
            heat), or after fitting a compound that is simply too hard for the
            ambient conditions. It is the tire telling you: <em>I am not warm
            enough to do what you&rsquo;re asking.</em>
          </p>
          <Callout variant="tip" title="Cold tear loves the unused edge">
            On a track with one dominant direction, the lazy side of the tire stays
            cold and cold-tears while the worked side is fine. That is normal &mdash;
            judge the side you actually load, and don&rsquo;t over-react to a cold
            edge that simply never got used.
          </Callout>
        </Section>

        <Section id="hot" number="03" title="Hot tear: overworked and greasy">
          <p>
            Hot tear &mdash; sometimes called overheating, blistering, or simply
            &ldquo;going off&rdquo; &mdash; is the opposite failure. Here the tire
            is <strong>too hot</strong>. The surface rubber has been worked past its
            ideal temperature, gone soft and greasy, and starts to smear and
            redeposit rather than wear cleanly. In the worst case the heat builds
            faster than it can escape, the surface reaches its limit, and you get
            blistering as gases and softened rubber lift the top layer.
          </p>
          <h3>What it looks like</h3>
          <ul>
            <li>
              A <strong>shiny, smeared, almost polished</strong> surface where torn
              rubber has melted back down.
            </li>
            <li>
              <strong>Discolouration</strong> &mdash; a blue, brown or grey tint
              from heat, especially on the most-loaded part of the tire.
            </li>
            <li>
              <strong>Blisters</strong> &mdash; raised, often circular lifted spots,
              the signature of localised overheating.
            </li>
            <li>
              It feels <strong>greasy and slick</strong>, and the tire often goes
              vague and slides progressively as the session wears on.
            </li>
          </ul>
          <p>
            Hot tear concentrates where the tire does the most work: the rear under
            hard drive out of corners, or the front under repeated heavy braking. It
            is the tire telling you: <em>I am being overloaded and I can&rsquo;t
            shed the heat fast enough.</em>
          </p>
          <Callout variant="warning" title="Blistering is a stop sign">
            Light hot tear is a tuning signal; hard blistering is a warning. A
            blistered tire has compromised its structure and consistency, and grip
            will fall off a cliff without much notice. If you see real blisters,
            treat the tire as suspect and address the cause before you trust it at
            full lean again.
          </Callout>
        </Section>

        <Section id="tell" number="04" title="Telling them apart in the pits">
          <p>
            When you peel off your gloves and crouch by the bike, run this quick
            read before you touch a single adjuster:
          </p>
          <ul>
            <li>
              <strong>Texture:</strong> dry, grainy, matte &rarr; cold. Shiny,
              smeared, polished &rarr; hot.
            </li>
            <li>
              <strong>Colour:</strong> uniform tread colour &rarr; cold. Blue,
              brown or grey tint on the worked zone &rarr; hot.
            </li>
            <li>
              <strong>Feel:</strong> rough and dusty &rarr; cold. Greasy and slick
              &rarr; hot.
            </li>
            <li>
              <strong>Blisters:</strong> present &rarr; hot, full stop. Cold tear
              never blisters.
            </li>
            <li>
              <strong>Pressure gain:</strong> very little hot-pressure rise &rarr;
              the tire never made heat (cold). A big rise above target &rarr;
              overheating (hot).
            </li>
          </ul>
          <p>
            That last point is why hot-to-cold pressure data is so valuable. A tire
            that barely gains pressure across a session is not reaching its working
            temperature, which lines up with cold tear; a tire that blows well past
            its target hot pressure is running too hot. Set and read those numbers
            properly with the{" "}
            <Link href={guidePath("tire-pressure-track-day")}>
              track day tire pressure guide
            </Link>{" "}
            before you draw any conclusion from the surface alone.
          </p>
          <Callout variant="info" title="Read both ends, not just one">
            The front and rear can tell different stories at once &mdash; a cold,
            grainy front and a smeared, hot rear in the same session is common and
            entirely diagnosable. Read each tire on its own terms rather than
            assuming the whole bike is doing one thing.
          </Callout>
        </Section>

        <Section id="fixes" number="05" title="What to actually change">
          <p>
            The two patterns demand opposite responses. Once you are confident which
            one you have, the menu is short.
          </p>
          <h3>If it&rsquo;s cold tear &mdash; add heat</h3>
          <ul>
            <li>
              <strong>Lower cold pressure</strong> a little within the safe range,
              so the carcass flexes more and generates heat.
            </li>
            <li>
              <strong>Use tire warmers</strong> and get the tire to working
              temperature before you go out, not three laps in.
            </li>
            <li>
              <strong>Run a softer compound</strong> that reaches temperature
              sooner and at lower load.
            </li>
            <li>
              <strong>Build heat more gently early</strong> &mdash; progressive,
              deliberate laps rather than cold heroics that flake the surface.
            </li>
          </ul>
          <h3>If it&rsquo;s hot tear &mdash; remove heat or load</h3>
          <ul>
            <li>
              <strong>Raise pressure</strong> toward or slightly above target to
              cut squirm and the heat it generates.
            </li>
            <li>
              <strong>Run a harder compound</strong> better suited to the load and
              ambient temperature.
            </li>
            <li>
              <strong>Fix the setup or input overworking that tire</strong> &mdash;
              for the rear, that often means spinning on exit; for the front, a
              chassis that overloads it on entry.
            </li>
          </ul>
          <Callout variant="danger" title="Don't change two things at once">
            If you drop pressure, switch compound and re-time your warm-up in the
            same session, you&rsquo;ll never know which one worked &mdash; or which
            one masked a real problem. Change one variable, log it, read the next
            tear, then decide. Guessing in bulk is how a tear problem becomes a
            mystery.
          </Callout>
        </Section>

        <Section id="order" number="06" title="Pressure and temperature come first">
          <p>
            Here is the rule that saves the most wasted clicker turns: <strong>a
            tire must be at the right pressure and temperature before you blame the
            suspension.</strong> Tearing caused by a cold tire or a wrong pressure
            will not be cured by compression and rebound changes &mdash; you&rsquo;ll
            just be tuning damping around a tire that was never in its window. Fix
            the tire&rsquo;s operating conditions first, then judge the chassis on a
            tire that is actually working.
          </p>
          <p>
            Only once pressure and temperature are right, and tear is still
            concentrated where one part of the tire is overworked, does the trail
            lead to setup. A rear that hot-tears on exit despite correct pressure
            points at drive and traction &mdash; the same territory as a bike
            that&rsquo;s{" "}
            <Link href={guidePath("motorcycle-runs-wide")}>running wide on exit</Link>{" "}
            &mdash; and that usually traces back to ride height and weight transfer,
            which is why{" "}
            <Link href={guidePath("setting-motorcycle-sag")}>setting sag correctly</Link>{" "}
            is the real starting line. Work the rest of the chassis from the{" "}
            <Link href="/tuning-guide">suspension tuning guide</Link>, browse the
            full diagnostic library in the{" "}
            <Link href="/guides">guides hub</Link>, and confirm what your bike
            actually offers in the{" "}
            <Link href="/setup">setup database</Link> &mdash; the adjusters on a{" "}
            <Link href="/setup/yamaha">Yamaha</Link> or{" "}
            <Link href="/setup/ducati">Ducati</Link> dictate which of these moves
            you can even make.
          </p>
          <p>
            Whichever pattern you read, log it. A tear photo means nothing without
            the track temperature, ambient, cold and hot pressures, and compound
            that produced it. Capture those in the Tire Manager and a single
            session&rsquo;s ragged rubber becomes a trend you can actually tune
            against across the day.
          </p>
        </Section>

        <Section id="faq" number="07" title="Tire tear FAQ">
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
          title="Read your tires with the data to back it up."
          desc="Apex Wizard's Tire Manager logs compound, cold and hot pressures, track temperature and wear notes per session — so cold tear and hot tear stop being a guess. Free on iOS and Android."
        />
      </ContentLayout>
    </main>
  );
}
