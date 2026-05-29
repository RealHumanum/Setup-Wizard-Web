import type { Metadata } from "next";
import { PageHero } from "@/components/content/PageHero";
import { ContentLayout } from "@/components/content/ContentLayout";
import { TableOfContents } from "@/components/content/TableOfContents";
import { Section } from "@/components/content/Section";
import { Callout } from "@/components/content/Callout";
import { SummaryCard } from "@/components/content/SummaryCard";
import { ContentCta } from "@/components/content/ContentCta";

export const metadata: Metadata = {
  title: "Motorcycle Suspension Tuning Guide | Apex Wizard",
  description:
    "Practical motorcycle suspension tuning — sag, rebound, compression, and a repeatable session protocol to drop lap times.",
  alternates: { canonical: "/tuning-guide" },
};

const TOC = [
  { id: "fundamentals", label: "01 — Fundamentals" },
  { id: "sag", label: "02 — Setting sag" },
  { id: "rebound", label: "03 — Rebound damping" },
  { id: "compression", label: "04 — Compression damping" },
  { id: "phases", label: "05 — Corner phases" },
  { id: "protocol", label: "06 — Session protocol" },
];

export default function TuningGuidePage() {
  return (
    <main>
      <PageHero
        eyebrow="SETUP GUIDE"
        title="Suspension Tuning"
        accent="Mastered."
        updated="March 2026"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Tuning Guide" }]}
        intro="Suspension tuning isn&rsquo;t a dark art. It&rsquo;s a small set of mechanical principles, applied in the right order, and logged so you can repeat what worked."
      />

      <ContentLayout toc={<TableOfContents items={TOC} />}>
        <SummaryCard
          title="Key takeaways"
          items={[
            <>Sag first, damping last &mdash; always.</>,
            <>Front rider sag belongs in the 30&ndash;38 mm window; rear in 25&ndash;30 mm.</>,
            <>Rebound controls return speed; compression controls how it absorbs.</>,
            <>Diagnose by the <strong>corner phase</strong> where the symptom shows up, not the symptom alone.</>,
            <>Change one variable at a time. Log every change.</>,
            <>Tires drive the chassis &mdash; pressure and temperature come before any clicker.</>,
          ]}
        />

        <Section id="fundamentals" number="01" title="The fundamentals: what suspension is actually doing">
          <p>
            Every fork and shock on a modern motorcycle is built around the same two elements: a spring and a damper. The spring stores energy when the wheel moves toward the chassis and releases it when the wheel moves away. The damper &mdash; a piston pushing oil through orifices &mdash; converts that motion into heat so the spring doesn&rsquo;t oscillate forever.
          </p>
          <p>
            Spring rate sets how much force is needed to compress the suspension a given distance. Get it wrong and no amount of clicker fiddling will save you: too soft and the bike bottoms or wallows under load; too stiff and the tire skips across the surface instead of tracking it. Damping then shapes <em>how</em> the spring moves &mdash; how quickly it gives under a bump, how quickly it returns afterward.
          </p>
          <p>
            On the front, compression resists fork dive under braking and turn-in; rebound resists extension as the load comes off. On the rear, compression resists squat under drive and big hits; rebound resists the shock pushing the chassis back up. Every cornering force you feel through the bars is the sum of those four behaviours acting in sequence.
          </p>
          <Callout variant="tip" title="Mental model">
            Think of the spring as the storage tank and the damper as the valve on its outlet. The spring decides how much energy goes in; the damper decides how fast it comes back out.
          </Callout>
        </Section>

        <Section id="sag" number="02" title="Setting sag — your geometry baseline">
          <p>
            Sag is the amount the suspension compresses under weight. It is the foundation of every other setting, because it sets the bike&rsquo;s ride height, and ride height sets rake, trail, and weight distribution. If sag is wrong, your chassis is the wrong shape, and damping changes will only chase the symptom.
          </p>
          <p>
            Two numbers matter. <strong>Static sag</strong> is how far the suspension settles under the bike&rsquo;s own weight. <strong>Rider sag</strong> is how far it settles with you on board in full gear. The formulas are simple:
          </p>
          <ul>
            <li><strong>Static sag</strong> = fully extended length &minus; bike-weight compressed length</li>
            <li><strong>Rider sag</strong> = fully extended length &minus; rider-loaded compressed length</li>
          </ul>
          <h3>Targets</h3>
          <p>
            For street and track sportbikes, aim for <strong>30&ndash;38 mm of front rider sag</strong> and <strong>25&ndash;30 mm of rear rider sag</strong>. Supermoto and off-road bikes run much more &mdash; often 100 mm or more &mdash; because they need stroke to absorb large impacts. Always check the OEM service manual before assuming a number.
          </p>
          <h3>How to measure</h3>
          <p>
            For the front, slide a zip-tie down the fork stanchion against the dust seal, then lift the bike on a paddock stand until the fork fully extends. Measure from the seal to the zip-tie &mdash; that&rsquo;s your reference. Drop the bike, settle the fork by gently pushing down and releasing, then measure again with the rider on board.
          </p>
          <p>
            For the rear, pick two fixed points &mdash; the rear axle and a mark on the subframe directly above it &mdash; and measure the distance between them in each state. Always release the suspension the same way before each measurement: a small lift and gentle drop is enough to break stiction.
          </p>
          <p>
            Adjust front sag with the preload caps on the forks. Adjust rear sag with the shock preload collar. Preload doesn&rsquo;t change spring rate; it changes where in the spring&rsquo;s travel the bike sits at rest. If you&rsquo;ve cranked preload to its limit and still can&rsquo;t hit target, you have the wrong spring rate for your weight.
          </p>
          <Callout variant="warning" title="Don't chase damping if sag is wrong">
            Damping changes on a bike with incorrect sag feel inconsistent because you&rsquo;re solving for two problems at once. Always re-verify sag before touching clickers.
          </Callout>
        </Section>

        <Section id="rebound" number="03" title="Rebound damping — controlling the return">
          <p>
            Rebound damping controls how fast the suspension extends after a compression. It&rsquo;s the brake on the spring&rsquo;s return stroke. Too much and the suspension can&rsquo;t recover between events; too little and it overshoots and oscillates.
          </p>
          <h3>Too slow (over-damped)</h3>
          <p>
            The classic symptom is <strong>pack-down</strong>: across a series of bumps, the suspension compresses but doesn&rsquo;t fully return before the next hit, so it rides lower and lower in the stroke. The bike feels harsh, ride height drops, and grip vanishes because the spring is barely doing its job. On the rear, slow rebound often shows up as a loss of traction over patched pavement.
          </p>
          <h3>Too fast (under-damped)</h3>
          <p>
            The bike feels like a pogo stick. After a bump or a transition, the chassis bounces and takes time to settle. On the rear, fast rebound causes the bike to push the rider forward as the shock extends; on the front, it makes the bars want to wave after a hit.
          </p>
          <h3>How to adjust</h3>
          <p>
            Move in <strong>one or two clicks at a time</strong> from the OEM baseline, and ride the same section of track or road both before and after. Note the direction (in = more damping, out = less) and the count. Resist the temptation to make a big change because the small one &ldquo;didn&rsquo;t do anything&rdquo; &mdash; sometimes the right click is the second one.
          </p>
          <h3>Fork and shock interact</h3>
          <p>
            Rebound on the two ends talks to each other. A rear shock with rebound set too soft will extend quickly under drive, lifting the rear and steepening the rake &mdash; the front tucks. A front fork with rebound too slow keeps the nose low through transitions, so the bike feels lazy turning side-to-side. Tune them as a pair, not in isolation.
          </p>
        </Section>

        <Section id="compression" number="04" title="Compression damping — high and low speed">
          <p>
            Compression damping controls how fast the suspension compresses under load. Modern forks and shocks usually split it into two adjusters because the forces you&rsquo;re managing happen at very different speeds.
          </p>
          <h3>Low-speed compression (LSCD)</h3>
          <p>
            LSCD governs slow, deliberate weight transfer: trail braking into the apex, throttle pickup off the corner, chassis pitch as you change direction. These are inputs you make with your hands and your right wrist, not events forced on you by the surface. If the bike dives too much under braking or squats too much under drive, this is the adjuster you reach for first.
          </p>
          <h3>High-speed compression (HSCD)</h3>
          <p>
            HSCD governs sudden, sharp hits: kerbs, expansion joints, paint, potholes. It only activates when the suspension shaft is moving quickly. If the bike feels harsh over kerbs but fine under braking, that&rsquo;s an HSCD signal. If it feels plush over kerbs but wallows under braking, the LSCD is the culprit.
          </p>
          <Callout variant="info" title="Speed = shaft velocity, not bike velocity">
            High and low speed refer to how fast the suspension shaft is moving, not how fast you&rsquo;re going. A slow-rolling chicane at 60 km/h is a low-speed event; a kerb at 200 km/h is high-speed. The damper can&rsquo;t tell what the bike is doing &mdash; only what its own piston is doing.
          </Callout>
          <h3>Practical advice</h3>
          <p>
            Most riders should leave HSCD alone until LSCD is dialled. The OEM HSCD baseline is usually within a click or two of correct for a wide range of bumps, while LSCD is far more sensitive to rider style and tire choice. Touch LSCD; verify; only then consider HSCD if a specific high-speed harshness remains.
          </p>
        </Section>

        <Section id="phases" number="05" title="Diagnose by corner phase, not symptom alone">
          <p>
            &ldquo;The bike runs wide&rdquo; is not a diagnosis. The same words can describe four mechanically different problems depending on <em>when</em> in the corner the bike does it. Break every lap into four phases and ask which phase produced the symptom before you reach for a tool.
          </p>
          <h3>Braking and turn-in</h3>
          <p>
            Front forks compress hard as weight transfers forward; the rear shock extends as the rear unloads. Symptoms here are usually front-end: chatter under brakes, lost contact patch, vague turn-in, or the bike refusing to fall into the corner. Suspect front LSCD, front rebound, or front rider sag.
          </p>
          <h3>Mid-corner</h3>
          <p>
            Brakes are released, throttle hasn&rsquo;t opened. The chassis is settled and the geometry &mdash; rake, trail, ride height &mdash; is doing most of the work. Symptoms here often point to spring rates, ride height, or tire pressure rather than damping. Bumps mid-corner that upset the line are usually a high-speed compression issue.
          </p>
          <h3>Acceleration and exit</h3>
          <p>
            The rear shock compresses under drive; the front fork extends as weight transfers back. Symptoms are typically rear-end: spinning, sliding, the bike running wide as the rear squats and the rake steepens. Suspect rear LSCD, rear rebound, or rear sag.
          </p>
          <h3>Worked example: &ldquo;runs wide&rdquo;</h3>
          <p>
            A bike that <strong>runs wide on entry</strong> usually has too much front dive: the rake steepens, trail shortens, and the front wants to tuck or push. Add a click of front LSCD or check that rider sag isn&rsquo;t at the slack end of the window. A bike that <strong>runs wide on exit</strong> usually has too much rear squat: the rake steepens from the back this time, and the rear tire is asking for more grip than the geometry will let it use. Add rear LSCD, or check rear sag and rebound. Same words from the rider; opposite ends of the bike.
          </p>
          <Callout variant="tip" title="Always ask: which phase?">
            Before changing anything, write down the symptom and the phase it appeared in. If you can&rsquo;t name the phase, run another session and find it. A clicker change without a phase is a guess.
          </Callout>
        </Section>

        <Section id="protocol" number="06" title="A repeatable session protocol">
          <p>
            Tuning is a loop, not a sprint. The riders who get fast quickly are the ones who run the same loop every session and log everything. Here&rsquo;s the protocol:
          </p>
          <ul>
            <li><strong>1. Set tire pressures cold to a known baseline.</strong> Tire pressure changes more between cold and hot than any clicker will move the chassis. Start from a number you trust before you change anything else.</li>
            <li><strong>2. Verify sag, front and rear.</strong> Bikes lose preload over time; springs settle; you may have ridden with a different load last weekend. Re-measure rather than assume.</li>
            <li><strong>3. Confirm the clicker baseline.</strong> Count every clicker back to fully closed, then out to the OEM or last-known-good setting. If you don&rsquo;t know where you are, you can&rsquo;t know where you&rsquo;re going.</li>
            <li><strong>4. Run a reference of three clean laps.</strong> No experiments, no overriding. Just ride. This is the lap you&rsquo;ll compare every change against.</li>
            <li><strong>5. Identify the worst symptom and the phase it appeared in.</strong> One symptom, one phase. Write both down.</li>
            <li><strong>6. Make exactly one change, one or two clicks.</strong> Note the adjuster, the direction, and the count. Resist the urge to combine changes &mdash; you won&rsquo;t know which one helped.</li>
            <li><strong>7. Re-run, compare, log.</strong> If the change helped, keep it and pick the next worst symptom. If it didn&rsquo;t, return to baseline and try something else.</li>
          </ul>
          <p>
            This loop is exactly what <strong>Apex Wizard</strong> automates: a setup logbook for clickers and sag, a side-by-side session comparator, and a troubleshooter that maps phase-specific symptoms to the adjuster most likely to fix them. The protocol stays the same whether you use paper or the app &mdash; the app just means you don&rsquo;t lose the logbook in a tank bag.
          </p>
        </Section>

        <ContentCta
          title="Stop guessing in the pits."
          desc="Apex Wizard turns this protocol into a one-screen workflow — log clickers, compare sessions, get phase-specific recommendations."
        />
      </ContentLayout>
    </main>
  );
}
