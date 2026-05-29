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
  description: "How Apex Wizard handles your data: local-first app, transparent web analytics.",
  alternates: { canonical: "/privacy" },
};

const TOC = [
  { id: "info-collected", label: "Information we collect" },
  { id: "usage-sharing", label: "How we use and share data" },
  { id: "rights", label: "Your privacy rights (GDPR & CCPA)" },
  { id: "third-party", label: "Third-party links" },
  { id: "changes", label: "Changes to this policy" },
  { id: "contact", label: "Contact us" },
];

export default function PrivacyPage() {
  return (
    <main>
      <PageHero
        eyebrow="PRIVACY"
        title="Privacy"
        accent="Policy"
        updated="March 18, 2026"
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
          ]}
        />

        <Section id="info-collected" number="01" title="Information we collect">
          <p>
            Apex Wizard (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your
            privacy and is committed to protecting your personal data. This policy outlines how
            your information is collected, processed, and safeguarded when you use the Apex
            Wizard mobile application (the &ldquo;App&rdquo;) and the Apex Wizard promotional
            website (the &ldquo;Website&rdquo;). By using the App or Website, you agree to the
            collection and use of information in accordance with this policy.
          </p>
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
              internal storage (Apple SwiftData / Android local SQLite).
            </li>
            <li>
              <strong>Backup Data:</strong> If you enable iCloud (Apple) or Google Drive
              (Android) device backups, your encrypted database is synced according to Apple and
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
            When you visit our Website, we may collect standard internet log information and
            details of visitor behavior patterns to analyze site traffic and improve conversion
            rates.
          </p>

          <Callout variant="info" title="Default denied">
            Analytics and advertising cookies are blocked under Google Consent Mode v2 until you
            explicitly accept via our consent banner. You can revoke that consent at any time.
          </Callout>

          <ul>
            <li>
              <strong>Google Ads &amp; Conversion Tracking:</strong> We use Google Ads and
              Google Tag Manager (gtag.js) to measure the effectiveness of our advertising
              campaigns.
            </li>
            <li>
              <strong>Cookies &amp; Consent:</strong> Analytics and advertising cookies are
              loaded in a denied-by-default state under Google Consent Mode v2 and are only
              activated if you accept via our consent banner. You can opt out of personalized
              advertising at any time via{" "}
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

        <Section id="usage-sharing" number="02" title="How we use and share data">
          <p>
            <strong>We do not sell, rent, or trade your personal data to third parties.</strong>
          </p>
          <p>
            The data you input into the Apex Wizard App belongs entirely to you. Your telemetry
            and suspension data are utilized exclusively by the App&rsquo;s on-device
            Troubleshooter algorithms and Performance Analytics to provide you with insights.
          </p>
          <p>
            Website analytics data is used solely in an aggregated, anonymized format to
            optimize our marketing efforts and ensure our promotional website operates
            efficiently.
          </p>
        </Section>

        <Section id="rights" number="03" title="Your privacy rights (GDPR & CCPA)">
          <p>
            You retain meaningful control over your data. Under GDPR, CCPA, and similar
            frameworks, your rights include:
          </p>
          <ul>
            <li>
              <strong>Right to Access &amp; Portability:</strong> You can view all your
              telemetry data directly within the App&rsquo;s UI.
            </li>
            <li>
              <strong>Right to Deletion:</strong> Because App Data is stored locally, you
              exercise your right to deletion simply by uninstalling the App. This immediately
              purges all local databases.
            </li>
            <li>
              <strong>Right to Opt-Out of Tracking:</strong> Decline consent in our banner or
              disable cookies in your browser settings. For app diagnostics, control crash
              reporting at the OS level.
            </li>
          </ul>
        </Section>

        <Section id="third-party" number="04" title="Third-party links">
          <p>
            Our Service may contain links to third-party websites or services that are not owned
            or controlled by Apex Wizard. We assume no responsibility for the content, privacy
            policies, or practices of any third-party sites or services.
          </p>
        </Section>

        <Section id="changes" number="05" title="Changes to this policy">
          <p>
            We reserve the right to update this Privacy Policy at any time. We will notify you
            of any material changes by posting the new Privacy Policy on this page and updating
            the &ldquo;Last updated&rdquo; date at the top.
          </p>
        </Section>

        <Section id="contact" number="06" title="Contact us">
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or
            our data practices, please reach out at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We read every message.
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
