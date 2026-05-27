import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service & Disclaimer | Apex Wizard",
  description: "Terms of Service, track-safety disclaimer and liability limitations for Apex Wizard.",
};

export default function TermsPage() {
  return (
    <ContentPage title="Terms of" accent="Service" updated="March 25, 2026">
      <p>
        Please read these Terms of Service and Legal Disclaimer carefully before using the Apex
        Wizard mobile application (the &ldquo;App&rdquo;) and website operated by Adrian Dokoza
        (&ldquo;us&rdquo;, &ldquo;we&rdquo;, or &ldquo;our&rdquo;).
      </p>
      <p>
        By accessing or using the App, you agree to be bound by these Terms. If you disagree with
        any part of the terms, you may not access the App.
      </p>

      <h2>1. Educational &amp; Reference Resource</h2>
      <p>
        Apex Wizard is designed to serve as a digital logbook and an{" "}
        <strong>educational reference tool</strong> for physical motorcycle chassis setup
        optimization, telemetry, and maintenance data. The information, recommendations, and
        troubleshooting steps provided by the App are for general informational purposes only and
        do not constitute professional mechanical, engineering, or riding advice.
      </p>

      <h2>2. Track Safety Disclaimer &amp; Assumption of Risk</h2>
      <p>
        Racetrack riding is inherently dangerous. Motorcycling, track riding, and modifying
        motorcycle components (including but not limited to suspension settings, tire pressures,
        and engine mappings) carry serious risk. Suggested chassis adjustments and clicker
        recommendations are based on physical dynamics, but{" "}
        <strong>
          the rider is solely responsible for verifying the mechanical safety and structural
          integrity of the vehicle before entering the track.
        </strong>
      </p>
      <ul>
        <li>
          <strong>You Assume All Liability:</strong> You assume all risks associated with adjusting
          your vehicle based on the App&rsquo;s recommendations.
        </li>
        <li>
          <strong>Verification is Mandatory:</strong> You must consult your motorcycle&rsquo;s
          official factory service manual to verify all torque specifications, fluid levels, and
          safe component operating ranges before making any physical changes.
        </li>
        <li>
          <strong>Tire Pressures &amp; Fuel:</strong> Tire pressure recommendations and fuel
          consumption calculations are baseline estimates. Actual safe operating values depend on
          your weight, riding style, track conditions, temperature, and wear level.
        </li>
      </ul>

      <h2>3. No Professional Liability / Limitation of Liability</h2>
      <p>
        In no event shall Adrian Dokoza, Apex Wizard, or any associated developers be held liable
        for any direct, indirect, incidental, consequential, special, or exemplary damages,
        including but not limited to mechanical failures, crashes, tire damage, or injuries
        resulting from the use of the application&rsquo;s calculations or setup recommendations:
      </p>
      <ul>
        <li>
          <strong>Personal Injury or Death:</strong> Resulting from crashes, loss of control, or
          mechanical failure at road or track speeds.
        </li>
        <li>
          <strong>Property Damage:</strong> Including damage to your motorcycle, tires, engine
          components, suspension internals, or third-party property.
        </li>
        <li>
          <strong>Data Loss:</strong> Any loss of local setups, telemetry logs, or maintenance
          records stored within the App.
        </li>
      </ul>
      <p>
        The App is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without
        warranties of any kind, whether express or implied.
      </p>

      <h2>4. User Responsibilities</h2>
      <p>
        You alone are responsible for the safe mechanical operation of your vehicle. If you lack
        the mechanical proficiency or specific tools required to safely alter your
        motorcycle&rsquo;s suspension or tires, you must seek the assistance of a certified
        motorcycle mechanic or suspension specialist.
      </p>

      <h2>5. Changes to Terms</h2>
      <p>
        We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
        By continuing to access or use our App after revisions become effective, you agree to be
        bound by the revised terms.
      </p>

      <h2>6. Contact Us</h2>
      <p>
        If you have any questions about these Terms, please contact us at{" "}
        <strong>{CONTACT_EMAIL}</strong>.
      </p>
    </ContentPage>
  );
}
