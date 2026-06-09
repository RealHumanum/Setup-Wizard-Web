import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/content/PageHero";
import { ContentLayout } from "@/components/content/ContentLayout";
import { TableOfContents } from "@/components/content/TableOfContents";
import { Section } from "@/components/content/Section";
import { Callout } from "@/components/content/Callout";
import { ContentCta } from "@/components/content/ContentCta";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, SITE_URL } from "@/lib/schema";

const PATH = "/about";

export const metadata: Metadata = {
  title: "About Apex Wizard & Adrian Dokoza | Apex Wizard",
  description:
    "Apex Wizard is an independent motorcycle suspension app built by Adrian Dokoza in Nussbaumen, Switzerland — a data-driven setup logbook and troubleshooter for track riders.",
  alternates: { canonical: PATH },
  openGraph: {
    type: "profile",
    title: "About Apex Wizard & Adrian Dokoza",
    description:
      "The story and methodology behind Apex Wizard — an independent motorcycle suspension logbook and troubleshooter.",
    url: PATH,
    images: ["/assets/hero 2.png"],
  },
};

const TOC = [
  { id: "who", label: "01 — Who builds it" },
  { id: "why", label: "02 — Why it exists" },
  { id: "how", label: "03 — How it thinks" },
  { id: "independent", label: "04 — Independent" },
];

export default function AboutPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: PATH },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url: `${SITE_URL}${PATH}`,
          mainEntity: { "@id": `${SITE_URL}/#adrian-dokoza` },
        }}
      />

      <PageHero
        eyebrow="ABOUT"
        title="The Crew Chief"
        accent="Behind the App."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
        intro="Apex Wizard is an independent project &mdash; built by a rider, for riders, to replace the messy paddock notebook with something that actually thinks."
      />

      <ContentLayout toc={<TableOfContents items={TOC} />}>
        <Section id="who" number="01" title="Who builds Apex Wizard">
          <p>
            Apex Wizard is designed and developed by{" "}
            <strong>Adrian Dokoza</strong>, based in Nussbaumen, Switzerland. It
            is an independent app &mdash; not the product of a hardware vendor or
            a marketing team &mdash; built around one frustration every track
            rider knows: the setup that worked last weekend is a scribble in a
            notebook you can&rsquo;t find, in handwriting you can&rsquo;t read.
          </p>
          <p>
            The goal was never to replace a professional suspension technician.
            It was to give the rest of us &mdash; club racers, track-day
            regulars, fast-road riders &mdash; the same disciplined, written,
            repeatable process the fast people use, in a tool that fits in a tank
            bag.
          </p>
        </Section>

        <Section id="why" number="02" title="Why it exists">
          <p>
            Most riders don&rsquo;t get slower because they lack talent. They get
            stuck because they change three things at once, forget what they
            changed, and can&rsquo;t tell which one helped. Suspension tuning
            rewards exactly one habit: change one variable, ride a reference, and
            write it down. Everything in Apex Wizard is built to make that habit
            effortless.
          </p>
          <p>
            That means a real{" "}
            <Link href="/setup">setup logbook</Link> for clickers and sag, a
            side-by-side session comparator, and a{" "}
            <Link href="/guides">library of guides</Link> that explain the
            mechanical <em>why</em> behind each adjustment &mdash; from{" "}
            <Link href="/guides/setting-motorcycle-sag">setting sag</Link> to{" "}
            <Link href="/tuning-guide">the full tuning workflow</Link>.
          </p>
        </Section>

        <Section id="how" number="03" title="How the app thinks">
          <p>
            Apex Wizard isn&rsquo;t a magic answer box. It encodes the same
            physical principles a good technician uses: it knows which adjusters
            your specific bike has, the factory clicker limits for each, and how
            a given symptom maps to a corner phase and an adjustment. When you
            tell it the bike runs wide on exit, it reasons the way a crew chief
            does &mdash; rear squat, steepening rake &mdash; rather than handing
            you a random number.
          </p>
          <Callout variant="info" title="Grounded in your bike, not a generic template">
            The database covers 190+ models across nine manufacturers, each with
            its real adjuster set and clicker range. The recommendations are only
            as good as that grounding &mdash; so the grounding is the part we
            obsess over.
          </Callout>
        </Section>

        <Section id="independent" number="04" title="Independent and privacy-first">
          <p>
            The app is free, and it is built independently. Your setups,
            telemetry and logbook live on your device &mdash; the app is designed
            to work completely offline in a cellular-dead paddock, and your
            tuning data never leaves your phone.
          </p>
          <p>
            This website uses privacy-respecting analytics that are gated behind
            consent and denied by default. You can read exactly what that means
            in the{" "}
            <Link href="/privacy">privacy policy</Link>. If you want to support
            independent development, the best ways are to{" "}
            <Link href="/#cta">download the app</Link> and tell a riding buddy.
          </p>
        </Section>

        <ContentCta
          title="Built for the paddock. Free for everyone."
          desc="Download Apex Wizard and turn your setup notes into a repeatable, data-driven process — on iOS and Android."
        />
      </ContentLayout>
    </main>
  );
}
