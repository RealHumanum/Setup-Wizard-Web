import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | Apex Wizard",
  description: "How Apex Wizard handles your data: local-first app, transparent web analytics.",
};

export default function PrivacyPage() {
  return (
    <ContentPage title="Privacy" accent="Policy" updated="March 18, 2026">
      <p>
        Apex Wizard (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your
        privacy and is committed to protecting your personal data. This Privacy Policy outlines
        how your information is collected, processed and safeguarded when you use the Apex Wizard
        mobile application (the &ldquo;App&rdquo;) and the Apex Wizard promotional website (the
        &ldquo;Website&rdquo;).
      </p>
      <p>
        By using the App or Website, you agree to the collection and use of information in
        accordance with this policy.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We classify data collection into two distinct categories: App Data and Website Data.</p>

      <h3>A. App Data (Mobile Application)</h3>
      <p>
        Apex Wizard is built on a &ldquo;Privacy-First&rdquo; architecture. The core mechanics of
        the App—including logging motorcycle suspension setups, track times and telemetry—are
        performed entirely on-device.
      </p>
      <ul>
        <li>
          <strong>Local Data Storage:</strong> The bikes you create, setups you log and track
          sessions you record are strictly saved locally to your device&rsquo;s internal storage
          (Apple SwiftData / Android local SQLite).
        </li>
        <li>
          <strong>Backup Data:</strong> If you enable iCloud (Apple) or Google Drive (Android)
          device backups, your encrypted database is synced according to Apple and Google&rsquo;s
          respective cloud privacy guidelines. We do not have access to these backups or the
          telemetry within them.
        </li>
        <li>
          <strong>Crash Reports &amp; App Diagnostics:</strong> We may collect anonymous crash
          reports and performance metrics to help identify software bugs and improve app
          stability. This data is strictly technical (e.g., device model, OS version, stack
          trace) and does not contain any Personally Identifiable Information (PII).
        </li>
      </ul>

      <h3>B. Website Data &amp; Analytics (Cookies)</h3>
      <p>
        When you visit our Website, we may collect standard internet log information and details
        of visitor behavior patterns to analyze site traffic and improve conversion rates.
      </p>
      <ul>
        <li>
          <strong>Google Ads &amp; Conversion Tracking:</strong> We use Google Ads and Google Tag
          Manager (gtag.js) to measure the effectiveness of our advertising campaigns. When you
          interact with our Website (e.g., clicking a &ldquo;Download&rdquo; button), a conversion
          event is sent to Google.
        </li>
        <li>
          <strong>Cookies &amp; Consent:</strong> Analytics and advertising cookies are loaded in
          a denied-by-default state under Google Consent Mode v2 and are only activated if you
          accept via our consent banner. You can opt out of personalized advertising at any time
          via{" "}
          <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer">
            Google&rsquo;s Ad Settings
          </a>
          .
        </li>
      </ul>

      <h2>2. Data Usage &amp; Sharing</h2>
      <p>
        <strong>We do not sell, rent or trade your personal data to third parties.</strong>
      </p>
      <p>
        The data you input into the Apex Wizard App belongs entirely to you. Your telemetry and
        suspension data are utilized exclusively by the App&rsquo;s on-device Troubleshooter
        algorithms and Performance Analytics to provide you with insights.
      </p>
      <p>
        Website analytics data is used solely in an aggregated, anonymized format to optimize our
        marketing efforts and ensure our promotional website operates efficiently.
      </p>

      <h2>3. Your Privacy Rights (GDPR &amp; CCPA)</h2>
      <ul>
        <li>
          <strong>Right to Access &amp; Portability:</strong> You can view all your telemetry data
          directly within the App&rsquo;s UI.
        </li>
        <li>
          <strong>Right to Deletion:</strong> Because App Data is stored locally, you exercise your
          right to deletion simply by uninstalling the App. This immediately purges all local
          databases.
        </li>
        <li>
          <strong>Right to Opt-Out of Tracking:</strong> Decline consent in our banner or disable
          cookies in your browser settings. For app diagnostics, control crash reporting at the OS
          level.
        </li>
      </ul>

      <h2>4. Third-Party Links</h2>
      <p>
        Our Service may contain links to third-party websites or services that are not owned or
        controlled by Apex Wizard. We assume no responsibility for the content, privacy policies
        or practices of any third-party sites or services.
      </p>

      <h2>5. Changes to This Policy</h2>
      <p>
        We reserve the right to update this Privacy Policy at any time. We will notify you of any
        material changes by posting the new Privacy Policy on this page and updating the
        &ldquo;Last updated&rdquo; date.
      </p>

      <h2>6. Contact Us</h2>
      <p>
        If you have any questions, concerns or requests regarding this Privacy Policy or our data
        practices, please contact us at <strong>{CONTACT_EMAIL}</strong>.
      </p>
    </ContentPage>
  );
}
