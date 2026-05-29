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
  description:
    "Terms of Service, track-safety disclaimer, liability limitations and governing law for Apex Wizard.",
  alternates: { canonical: "/terms" },
};

const TOC = [
  { id: "acceptance", label: "Acceptance & eligibility" },
  { id: "educational", label: "Educational reference resource" },
  { id: "license", label: "Licence & acceptable use" },
  { id: "ip", label: "Intellectual property" },
  { id: "track-safety", label: "Track safety & assumption of risk" },
  { id: "disclaimer", label: "Disclaimer of warranties" },
  { id: "liability", label: "Limitation of liability" },
  { id: "indemnification", label: "Indemnification" },
  { id: "responsibilities", label: "User responsibilities" },
  { id: "third-party", label: "Third-party services & app stores" },
  { id: "termination", label: "Termination" },
  { id: "governing-law", label: "Governing law & disputes" },
  { id: "severability", label: "Severability & entire agreement" },
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
        updated="May 29, 2026"
        intro="Please read these Terms of Service and Legal Disclaimer carefully before using the Apex Wizard app or website. By accessing or using the App, you agree to be bound by these Terms. If you do not agree, do not use the App."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
      />

      <ContentLayout toc={<TableOfContents items={TOC} />}>
        <SummaryCard
          title="At a glance"
          items={[
            "Apex Wizard is an educational reference tool — not professional engineering, mechanical, or riding advice.",
            "Track and street riding are inherently dangerous; you assume all risk for any setup change you make.",
            "Always verify torque specs, fluids, and operating ranges in your manufacturer's factory service manual before physically changing anything.",
            "To the maximum extent permitted by law, Adrian Dokoza and Apex Wizard accept no liability for crashes, injury, mechanical failure, or data loss arising from use of the App.",
            "These Terms are governed by Swiss law, without removing any mandatory consumer rights you have where you live.",
          ]}
        />

        <Section id="acceptance" number="01" title="Acceptance & eligibility">
          <p>
            These Terms of Service (the &ldquo;Terms&rdquo;) form a binding agreement between you
            and Adrian Dokoza (&ldquo;us&rdquo;, &ldquo;we&rdquo;, or &ldquo;our&rdquo;), the
            developer and operator of the Apex Wizard mobile application (the &ldquo;App&rdquo;)
            and the website at apex-wizard.com (the &ldquo;Website&rdquo;, together the
            &ldquo;Service&rdquo;). By downloading, accessing, or using the Service, you confirm
            that you accept these Terms and agree to comply with them.
          </p>
          <p>
            You must be at least <strong>18 years of age</strong>, or the age of legal majority in
            your jurisdiction, and have the legal capacity to enter into a binding contract, in
            order to use the Service. If you are using the Service on behalf of an organisation,
            you represent that you are authorised to bind that organisation to these Terms.
          </p>
        </Section>

        <Section id="educational" number="02" title="Educational reference resource">
          <p>
            Apex Wizard is designed to serve as a digital logbook and an{" "}
            <strong>educational reference tool</strong> for physical motorcycle chassis setup
            optimisation, telemetry, and maintenance data.
          </p>
          <p>
            The information, recommendations, calculations, and troubleshooting steps provided by
            the Service are for general informational purposes only and{" "}
            <strong>
              do not constitute professional mechanical, engineering, safety, or riding advice
            </strong>
            . They are not a substitute for the judgement of a qualified motorcycle technician or
            suspension specialist, nor for your motorcycle manufacturer&rsquo;s official
            documentation.
          </p>
        </Section>

        <Section id="license" number="03" title="Licence & acceptable use">
          <p>
            Subject to your compliance with these Terms, we grant you a limited, personal,
            non-exclusive, non-transferable, revocable licence to download and use the App on
            devices you own or control, and to access the Website, solely for your own
            non-commercial use.
          </p>
          <p>You agree that you will not, and will not attempt to:</p>
          <ul>
            <li>
              copy, modify, reverse-engineer, decompile, or create derivative works of the
              Service, except to the extent this restriction is prohibited by applicable law;
            </li>
            <li>
              resell, sublicense, rent, or otherwise commercially exploit the Service or its
              content without our prior written permission;
            </li>
            <li>
              use the Service in any unlawful manner, or in any way that could damage, disable, or
              impair it or interfere with any other party&rsquo;s use; or
            </li>
            <li>
              remove, obscure, or alter any proprietary notices contained in the Service.
            </li>
          </ul>
        </Section>

        <Section id="ip" number="04" title="Intellectual property">
          <p>
            The Service, including its software, design, text, graphics, logos, the
            &ldquo;Apex Wizard&rdquo; name and brand, and all related intellectual property, is
            owned by Adrian Dokoza or licensed to us and is protected by copyright, trademark, and
            other laws. These Terms do not transfer any ownership rights to you.
          </p>
          <p>
            The data you create within the App — your bikes, setups, telemetry, and logs — remains{" "}
            <strong>yours</strong>. We claim no ownership over the content you generate.
          </p>
        </Section>

        <Section id="track-safety" number="05" title="Track safety & assumption of risk">
          <p>
            Racetrack riding is inherently dangerous. Motorcycling, track riding, and modifying
            motorcycle components — including but not limited to suspension settings, tire
            pressures, and engine mappings — carry serious risk of injury or death. Suggested
            chassis adjustments and clicker recommendations are based on general physical dynamics,
            but{" "}
            <strong>
              the rider is solely responsible for verifying the mechanical safety and structural
              integrity of the vehicle before riding.
            </strong>
          </p>

          <Callout variant="danger" title="Assumption of Risk">
            <p>
              Motorcycling is inherently dangerous. By using the Service you knowingly and
              voluntarily assume all risks associated with any adjustment, setting, or change you
              make to your machine, and with riding it. Verification of your motorcycle&rsquo;s
              mechanical condition by you or a qualified professional is mandatory before any road
              or track use.
            </p>
          </Callout>

          <ul>
            <li>
              <strong>You assume all liability.</strong> You assume all risks associated with
              adjusting your vehicle based on the Service&rsquo;s recommendations or calculations.
            </li>
            <li>
              <strong>Verification is mandatory.</strong> You must consult your motorcycle&rsquo;s
              official factory service manual to verify all torque specifications, fluid levels,
              and safe component operating ranges before making any physical changes.
            </li>
            <li>
              <strong>Tire pressures &amp; fuel.</strong> Tire pressure recommendations and fuel
              consumption calculations are baseline estimates only. Actual safe operating values
              depend on your weight, riding style, track conditions, temperature, and wear level.
            </li>
          </ul>
        </Section>

        <Section id="disclaimer" number="06" title="Disclaimer of warranties">
          <Callout variant="warning" title="Provided AS IS">
            <p>
              The Service is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo;
              basis, without warranties of any kind, whether express, implied, or statutory —
              including, without limitation, any implied warranties of merchantability, fitness for
              a particular purpose, accuracy, and non-infringement.
            </p>
          </Callout>
          <p>
            We do not warrant that the Service will be uninterrupted, error-free, secure, or that
            any calculation, recommendation, or data it produces is accurate, complete, or suitable
            for your specific motorcycle or circumstances. Some jurisdictions do not allow the
            exclusion of certain warranties, so some of the above exclusions may not apply to you.
          </p>
        </Section>

        <Section id="liability" number="07" title="Limitation of liability">
          <p>
            To the maximum extent permitted by applicable law, in no event shall Adrian Dokoza,
            Apex Wizard, or any associated developers be liable for any direct, indirect,
            incidental, consequential, special, punitive, or exemplary damages — including but not
            limited to mechanical failures, crashes, tire damage, or injuries — arising out of or
            in connection with your use of, or inability to use, the Service or any of its
            calculations or recommendations. This expressly includes:
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
          <p>
            Where liability cannot be excluded but may be limited, our total aggregate liability to
            you for all claims arising out of or relating to the Service shall not exceed the
            greater of (a) the total amount you paid us for the Service in the twelve months
            preceding the claim, or (b) CHF 50. Nothing in these Terms excludes or limits our
            liability for death or personal injury caused by our gross negligence or wilful
            misconduct, or for any liability that cannot be excluded or limited under applicable
            law.
          </p>
        </Section>

        <Section id="indemnification" number="08" title="Indemnification">
          <p>
            You agree to indemnify, defend, and hold harmless Adrian Dokoza and Apex Wizard from
            and against any claims, liabilities, damages, losses, and expenses (including
            reasonable legal fees) arising out of or in any way connected with your use or misuse
            of the Service, your violation of these Terms, or your violation of any rights of a
            third party.
          </p>
        </Section>

        <Section id="responsibilities" number="09" title="User responsibilities">
          <p>
            You alone are responsible for the safe mechanical operation of your vehicle. If you
            lack the mechanical proficiency or the specific tools required to safely alter your
            motorcycle&rsquo;s suspension or tires, you must seek the assistance of a certified
            motorcycle mechanic or suspension specialist before making any physical change. You are
            also responsible for maintaining your own backups of any data you wish to preserve.
          </p>
        </Section>

        <Section
          id="third-party"
          number="10"
          title="Third-party services & app stores"
        >
          <p>
            The App is distributed through the Apple App Store and Google Play. Your download and
            use of the App is also subject to the applicable terms of those platforms. You agree to
            comply with the relevant app-store terms, and you acknowledge that Apple Inc. and Google
            LLC are not parties to these Terms and are not responsible for the App or its content.
          </p>
          <p>
            The Service may interoperate with or link to third-party services (for example, device
            cloud backups, or external websites). We do not control and are not responsible for the
            content, policies, or practices of any third-party service.
          </p>
        </Section>

        <Section id="termination" number="11" title="Termination">
          <p>
            You may stop using the Service at any time by uninstalling the App. We may suspend or
            terminate your access to the Service at any time, with or without notice, if you breach
            these Terms or where we reasonably consider it necessary. Provisions that by their
            nature should survive termination — including intellectual property, disclaimers,
            limitation of liability, and indemnification — will survive.
          </p>
        </Section>

        <Section id="governing-law" number="12" title="Governing law & disputes">
          <p>
            These Terms, and any dispute or claim arising out of or in connection with them or the
            Service, are governed by and construed in accordance with the substantive laws of{" "}
            <strong>Switzerland</strong>, excluding its conflict-of-law rules and the United
            Nations Convention on Contracts for the International Sale of Goods (CISG).
          </p>
          <p>
            The exclusive place of jurisdiction for any disputes shall be the competent courts at
            the domicile of the developer in Switzerland.{" "}
            <strong>
              If you are a consumer, this does not deprive you of the protection of any mandatory
              provisions of the law of the country in which you reside,
            </strong>{" "}
            and you may also be entitled to bring proceedings in the courts of your country of
            residence where applicable law so provides.
          </p>
        </Section>

        <Section
          id="severability"
          number="13"
          title="Severability & entire agreement"
        >
          <p>
            If any provision of these Terms is found to be invalid or unenforceable, that provision
            will be limited or removed to the minimum extent necessary, and the remaining
            provisions will remain in full force and effect. Our failure to enforce any right or
            provision is not a waiver of that right or provision.
          </p>
          <p>
            These Terms, together with our{" "}
            <a href="/privacy/">Privacy Policy</a>, constitute the entire agreement between you and
            us regarding the Service and supersede any prior agreements.
          </p>
        </Section>

        <Section id="changes" number="14" title="Changes to these terms">
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any
            time. Where changes are material, we will update the &ldquo;Last updated&rdquo; date at
            the top of this page. By continuing to access or use the Service after revisions become
            effective, you agree to be bound by the revised Terms. If you disagree with any part of
            the Terms, you must stop using the Service.
          </p>
        </Section>

        <Section id="contact" number="15" title="Contact us">
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
