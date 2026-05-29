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
  title: "Privacy Policy | Apex Wizard",
  description:
    "How Apex Wizard handles your data: local-first app, transparent consent-gated web analytics, FADP & GDPR rights.",
  alternates: { canonical: "/privacy" },
};

const TOC = [
  { id: "controller", label: "Who we are (data controller)" },
  { id: "info-collected", label: "Information we collect" },
  { id: "legal-basis", label: "Legal bases for processing" },
  { id: "usage-sharing", label: "How we use and share data" },
  { id: "retention", label: "Data retention" },
  { id: "security", label: "Data security" },
  { id: "transfers", label: "International transfers" },
  { id: "rights", label: "Your privacy rights" },
  { id: "children", label: "Children's privacy" },
  { id: "third-party", label: "Third-party links" },
  { id: "changes", label: "Changes to this policy" },
  { id: "contact", label: "Contact us" },
];

export default function PrivacyPage() {
  const mailto = `mailto:${CONTACT_EMAIL}`;

  return (
    <main>
      <PageHero
        eyebrow="PRIVACY"
        title="Privacy"
        accent="Policy"
        updated="May 29, 2026"
        intro="How Apex Wizard collects, processes, and safeguards information across the app and the website."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />

      <ContentLayout toc={<TableOfContents items={TOC} />}>
        <SummaryCard
          title="At a glance"
          items={[
            "The app is local-first. Your bikes, setups, and track sessions live only on your device — never on our servers.",
            "We do not sell, rent, or trade your personal data, ever.",
            "The marketing website uses Google Analytics and Ads, gated behind Consent Mode v2 — denied by default until you accept.",
            "Crash reports are anonymous and contain no Personally Identifiable Information.",
            "We comply with the Swiss FADP and, where applicable, the EU/UK GDPR and California CCPA.",
          ]}
        />

        <Section id="controller" number="01" title="Who we are (data controller)">
          <p>
            Apex Wizard (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is developed and
            operated by <strong>Adrian Dokoza</strong>, based in Switzerland. For the limited
            processing described in this policy, Adrian Dokoza is the{" "}
            <strong>data controller</strong>.
          </p>
          <p>
            This policy outlines how your information is collected, processed, and safeguarded when
            you use the Apex Wizard mobile application (the &ldquo;App&rdquo;) and the Apex Wizard
            website at apex-wizard.com (the &ldquo;Website&rdquo;). By using the App or Website, you
            agree to the practices described here. If you do not agree, please discontinue use.
          </p>
          <p>
            We process personal data in accordance with the Swiss Federal Act on Data Protection
            (FADP) and, where applicable to you, the EU/UK General Data Protection Regulation
            (GDPR) and the California Consumer Privacy Act (CCPA).
          </p>
        </Section>

        <Section id="info-collected" number="02" title="Information we collect">
          <p>
            We classify data collection into two distinct categories: <strong>App Data</strong>{" "}
            and <strong>Website Data</strong>.
          </p>

          <h3>A. App data (mobile application)</h3>
          <p>
            Apex Wizard is built on a privacy-first architecture. The core mechanics of the App
            &mdash; including logging motorcycle suspension setups, track times, and telemetry
            &mdash; are performed entirely on-device.
          </p>

          <Callout variant="tip" title="Local-first by design">
            Your bikes, setups, and telemetry are stored on your device using Apple SwiftData or
            Android local SQLite. Nothing is uploaded to our servers.
          </Callout>

          <ul>
            <li>
              <strong>Local Data Storage:</strong> The bikes you create, setups you log, and
              track sessions you record are strictly saved locally to your device&rsquo;s
              internal storage (Apple SwiftData / Android local SQLite). We have no access to this
              data.
            </li>
            <li>
              <strong>Backup Data:</strong> If you enable iCloud (Apple) or Google Drive
              (Android) device backups, your database is synced according to Apple and
              Google&rsquo;s respective cloud privacy guidelines. We do not have access to these
              backups or the telemetry within them.
            </li>
            <li>
              <strong>Crash Reports &amp; App Diagnostics:</strong> We may collect anonymous
              crash reports and performance metrics to help identify software bugs and improve
              app stability. This data is strictly technical (e.g., device model, OS version,
              stack trace) and does not contain any Personally Identifiable Information (PII).
            </li>
          </ul>

          <h3>B. Website data &amp; analytics (cookies)</h3>
          <p>
            When you visit our Website, and only after you grant consent, we may collect standard
            internet log information and details of visitor behaviour patterns to analyse site
            traffic and measure advertising performance.
          </p>

          <Callout variant="info" title="Default denied">
            Analytics and advertising cookies are blocked under Google Consent Mode v2 until you
            explicitly accept via our consent banner. You can revoke that consent at any time.
          </Callout>

          <ul>
            <li>
              <strong>Google Analytics &amp; Google Ads:</strong> We use Google Analytics and
              Google Ads (via Google Tag Manager / gtag.js) to understand site traffic and measure
              the effectiveness of our advertising campaigns. These tools may set cookies and
              process data such as your IP address, device, and browsing activity once consent is
              granted.
            </li>
            <li>
              <strong>Cookies &amp; Consent:</strong> Analytics and advertising cookies load in a
              denied-by-default state under Google Consent Mode v2 and activate only if you accept
              via our consent banner. You can opt out of personalised advertising at any time via{" "}
              <a
                href="https://myadcenter.google.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google&rsquo;s Ad Settings
              </a>
              .
            </li>
          </ul>
        </Section>

        <Section id="legal-basis" number="03" title="Legal bases for processing">
          <p>
            Where the GDPR or Swiss FADP applies, we rely on the following legal bases to process
            personal data:
          </p>
          <ul>
            <li>
              <strong>Consent</strong> (Art. 6(1)(a) GDPR): for analytics and advertising cookies
              on the Website, which are only activated after you opt in. You may withdraw consent
              at any time.
            </li>
            <li>
              <strong>Legitimate interests</strong> (Art. 6(1)(f) GDPR): for anonymous,
              non-identifying crash diagnostics used solely to keep the App stable and secure, and
              to maintain the security of our Website.
            </li>
            <li>
              <strong>Performance of a contract</strong> (Art. 6(1)(b) GDPR): to provide the App
              functionality you request.
            </li>
          </ul>
        </Section>

        <Section id="usage-sharing" number="04" title="How we use and share data">
          <p>
            <strong>We do not sell, rent, or trade your personal data to third parties.</strong>
          </p>
          <p>
            The data you input into the Apex Wizard App belongs entirely to you. Your telemetry
            and suspension data are used exclusively by the App&rsquo;s on-device Troubleshooter
            algorithms and Performance Analytics to provide you with insights, and never leave your
            device except through backups you control.
          </p>
          <p>
            Website analytics data is used solely in an aggregated, anonymised format to optimise
            our marketing and ensure the Website operates efficiently. We share limited Website
            data only with the processors that provide these services (Google LLC, as our
            analytics and advertising provider) and only to the extent necessary, or where required
            by law.
          </p>
        </Section>

        <Section id="retention" number="05" title="Data retention">
          <ul>
            <li>
              <strong>App Data</strong> remains on your device for as long as the App is installed,
              under your control. Uninstalling the App permanently deletes all local databases.
            </li>
            <li>
              <strong>Anonymous diagnostics</strong> are retained only as long as needed to
              investigate stability and security issues, then discarded or aggregated.
            </li>
            <li>
              <strong>Website analytics data</strong> is retained according to Google&rsquo;s data
              retention settings (by default, up to 14 months) and then automatically deleted or
              aggregated.
            </li>
          </ul>
        </Section>

        <Section id="security" number="06" title="Data security">
          <p>
            Because the App is local-first, the most sensitive data — your setups and telemetry —
            never leaves your device, which materially reduces exposure. We apply appropriate
            technical and organisational measures to protect the limited data we do handle.
            However, no method of electronic storage or transmission is completely secure, and we
            cannot guarantee absolute security. You are responsible for securing your own device
            and any backups you enable.
          </p>
        </Section>

        <Section id="transfers" number="07" title="International transfers">
          <p>
            Where consent-gated Website analytics are processed by Google, your data may be
            transferred to and processed in countries outside your own, including the United
            States. Such transfers are carried out under appropriate safeguards (for example, the
            European Commission&rsquo;s Standard Contractual Clauses and equivalent Swiss FADP
            mechanisms). App Data is not transferred by us, because it stays on your device.
          </p>
        </Section>

        <Section id="rights" number="08" title="Your privacy rights">
          <p>
            Depending on where you live, you have rights under the Swiss FADP, the EU/UK GDPR, the
            California CCPA, and similar frameworks. These include:
          </p>
          <ul>
            <li>
              <strong>Access &amp; portability:</strong> You can view all your telemetry data
              directly within the App&rsquo;s UI, on your device.
            </li>
            <li>
              <strong>Deletion (&ldquo;right to be forgotten&rdquo;):</strong> Because App Data is
              stored locally, you exercise this right simply by uninstalling the App, which
              immediately purges all local databases.
            </li>
            <li>
              <strong>Rectification &amp; restriction:</strong> You can edit or remove any entry
              within the App at any time.
            </li>
            <li>
              <strong>Objection &amp; withdrawal of consent:</strong> Decline or revoke consent in
              our Website banner, or disable cookies in your browser. For app diagnostics, control
              reporting at the OS level.
            </li>
            <li>
              <strong>Non-discrimination (CCPA):</strong> We will never deny service or charge you
              differently for exercising your privacy rights.
            </li>
          </ul>
          <p>
            To exercise any right, or if you are in the EU/EEA and wish to lodge a complaint with
            your local supervisory authority (or, in Switzerland, the Federal Data Protection and
            Information Commissioner), contact us first at{" "}
            <a href={mailto}>{CONTACT_EMAIL}</a> and we will help.
          </p>
        </Section>

        <Section id="children" number="09" title="Children's privacy">
          <p>
            The Service is not directed to children, and we do not knowingly collect personal data
            from anyone under the age of 16. If you believe a child has provided us with personal
            data, please contact us and we will take appropriate steps to delete it.
          </p>
        </Section>

        <Section id="third-party" number="10" title="Third-party links">
          <p>
            Our Service may contain links to third-party websites or services that are not owned
            or controlled by Apex Wizard. We assume no responsibility for the content, privacy
            policies, or practices of any third-party sites or services, and we encourage you to
            review their policies.
          </p>
        </Section>

        <Section id="changes" number="11" title="Changes to this policy">
          <p>
            We reserve the right to update this Privacy Policy at any time. We will notify you of
            any material changes by posting the new policy on this page and updating the
            &ldquo;Last updated&rdquo; date at the top. Your continued use of the Service after
            changes take effect constitutes acceptance of the revised policy.
          </p>
        </Section>

        <Section id="contact" number="12" title="Contact us">
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our
            data practices, please reach out at <a href={mailto}>{CONTACT_EMAIL}</a>. We read every
            message.
          </p>
        </Section>

        <ContentCta
          title="Built for trust."
          desc="Local-first data, transparent web analytics, no PII sold or shared."
          primaryLabel="Get Apex Wizard"
          primaryHref="/#cta"
        />
      </ContentLayout>
    </main>
  );
}
