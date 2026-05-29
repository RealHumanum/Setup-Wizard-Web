import type { Metadata } from "next";
import { PageHero } from "@/components/content/PageHero";
import { ContentLayout } from "@/components/content/ContentLayout";
import { TableOfContents } from "@/components/content/TableOfContents";
import { Section } from "@/components/content/Section";
import { Callout } from "@/components/content/Callout";
import { SummaryCard } from "@/components/content/SummaryCard";
import { ContentCta } from "@/components/content/ContentCta";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service & Disclaimer | Apex Wizard",
  description: "Terms of Service, track-safety disclaimer and liability limitations for Apex Wizard.",
  alternates: { canonical: "/terms" },
};

const TOC = [
  { id: "educational", label: "Educational reference resource" },
  { id: "track-safety", label: "Track safety & assumption of risk" },
  { id: "liability", label: "Limitation of liability" },
  { id: "responsibilities", label: "User responsibilities" },
  { id: "changes", label: "Changes to these terms" },
  { id: "contact", label: "Contact us" },
];

export default function TermsPage() {
  const mailto = `mailto:${CONTACT_EMAIL}`;

  return (
    <main>
      <PageHero
        eyebrow="LEGAL"
        title="Terms of"
        accent="Service"
        updated="March 25, 2026"
        intro="Please read these Terms of Service and Legal Disclaimer carefully before using the Apex Wizard app or website. By accessing or using the App, you agree to be bound by these Terms."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
      />

      <ContentLayout toc={<TableOfContents items={TOC} />}>
        <SummaryCard
          title="At a glance"
          items={[
            "Apex Wizard is an educational reference tool — not professional engineering advice.",
            "Track and street riding are inherently dangerous; you assume all risk for any setup change you make.",
            "Always verify torque specs, fluids, and operating ranges in your manufacturer's factory service manual before physically changing anything.",
            "Adrian Dokoza and Apex Wizard accept no liability for crashes, injury, mechanical failure, or data loss arising from use of the App.",
          ]}
        />

        <Section id="educational" number="01" title="Educational reference resource">
          <p>
            Apex Wizard (the &ldquo;App&rdquo;), operated by Adrian Dokoza (&ldquo;us&rdquo;,
            &ldquo;we&rdquo;, or &ldquo;our&rdquo;), is designed to serve as a digital logbook and
            an <strong>educational reference tool</strong> for physical motorcycle chassis setup
            optimisation, telemetry, and maintenance data.
          </p>
          <p>
            The information, recommendations, and troubleshooting steps provided by the App are
            for general informational purposes only and do not constitute professional mechanical,
            engineering, or riding advice.
          </p>
        </Section>

        <Section id="track-safety" number="02" title="Track safety & assumption of risk">
          <p>
            Racetrack riding is inherently dangerous. Motorcycling, track riding, and modifying
            motorcycle components — including but not limited to suspension settings, tire
            pressures, and engine mappings — carry serious risk. Suggested chassis adjustments and
            clicker recommendations are based on physical dynamics, but{" "}
            <strong>
              the rider is solely responsible for verifying the mechanical safety and structural
              integrity of the vehicle before entering the track.
            </strong>
          </p>

          <Callout variant="danger" title="Assumption of Risk">
            <p>
              Motorcycling is inherently dangerous. By using the App you assume all liability for
              any adjustment, setting, or change you make to your machine. Verification of your
              motorcycle&rsquo;s mechanical condition is mandatory before any track use.
            </p>
          </Callout>

          <ul>
            <li>
              <strong>You assume all liability.</strong> You assume all risks associated with
              adjusting your vehicle based on the App&rsquo;s recommendations.
            </li>
            <li>
              <strong>Verification is mandatory.</strong> You must consult your motorcycle&rsquo;s
              official factory service manual to verify all torque specifications, fluid levels,
              and safe component operating ranges before making any physical changes.
            </li>
            <li>
              <strong>Tire pressures &amp; fuel.</strong> Tire pressure recommendations and fuel
              consumption calculations are baseline estimates. Actual safe operating values depend
              on your weight, riding style, track conditions, temperature, and wear level.
            </li>
          </ul>
        </Section>

        <Section id="liability" number="03" title="Limitation of liability">
          <p>
            In no event shall Adrian Dokoza, Apex Wizard, or any associated developers be held
            liable for any direct, indirect, incidental, consequential, special, or exemplary
            damages — including but not limited to mechanical failures, crashes, tire damage, or
            injuries resulting from the use of the App&rsquo;s calculations or setup
            recommendations. This expressly includes:
          </p>
          <ul>
            <li>
              <strong>Personal injury or death</strong> resulting from crashes, loss of control,
              or mechanical failure at road or track speeds.
            </li>
            <li>
              <strong>Property damage</strong>, including damage to your motorcycle, tires, engine
              components, suspension internals, or third-party property.
            </li>
            <li>
              <strong>Data loss</strong>, including any loss of local setups, telemetry logs, or
              maintenance records stored within the App.
            </li>
          </ul>

          <Callout variant="warning" title="Provided AS IS">
            <p>
              The App is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis
              without warranties of any kind, whether express or implied — including, without
              limitation, any implied warranties of merchantability, fitness for a particular
              purpose, or non-infringement.
            </p>
          </Callout>
        </Section>

        <Section id="responsibilities" number="04" title="User responsibilities">
          <p>
            You alone are responsible for the safe mechanical operation of your vehicle. If you
            lack the mechanical proficiency or the specific tools required to safely alter your
            motorcycle&rsquo;s suspension or tires, you must seek the assistance of a certified
            motorcycle mechanic or suspension specialist before making any physical change.
          </p>
        </Section>

        <Section id="changes" number="05" title="Changes to these terms">
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any
            time. By continuing to access or use the App after revisions become effective, you
            agree to be bound by the revised terms. If you disagree with any part of the Terms,
            you may not access the App.
          </p>
        </Section>

        <Section id="contact" number="06" title="Contact us">
          <p>
            If you have any questions about these Terms, please contact us at{" "}
            <a href={mailto}>{CONTACT_EMAIL}</a>.
          </p>
        </Section>

        <ContentCta
          title="Questions about these terms?"
          desc="Drop us a line — we read every message."
          primaryLabel="Email Support"
          primaryHref={mailto}
        />
      </ContentLayout>
    </main>
  );
}
