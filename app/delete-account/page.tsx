import type { Metadata } from "next";

import { PageHero } from "@/components/content/PageHero";
import { ContentLayout } from "@/components/content/ContentLayout";
import { TableOfContents } from "@/components/content/TableOfContents";
import { Section } from "@/components/content/Section";
import { Callout } from "@/components/content/Callout";
import { SummaryCard } from "@/components/content/SummaryCard";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Delete Your Account | Apex Wizard",
  description:
    "How to permanently delete your Apex Wizard account and all of your data, from inside the app or from your private iCloud / Google Drive backup.",
  alternates: { canonical: "/delete-account" },
};

const TOC = [
  { id: "whats-deleted", label: "What gets deleted" },
  { id: "in-app", label: "Delete inside the app" },
  { id: "uninstalled", label: "If you've uninstalled" },
  { id: "no-access", label: "We can't access your data" },
  { id: "contact", label: "Need help" },
];

export default function DeleteAccountPage() {
  const mailto = `mailto:${CONTACT_EMAIL}`;

  return (
    <main>
      <PageHero
        eyebrow="ACCOUNT"
        title="Delete Your"
        accent="Account"
        updated="June 13, 2026"
        intro="How to permanently delete your Apex Wizard account and all of your data — from inside the app, or from your private cloud backup."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Delete Account" }]}
      />

      <ContentLayout toc={<TableOfContents items={TOC} />}>
        <SummaryCard
          title="At a glance"
          items={[
            "In the app, Settings → Delete Account permanently erases everything and signs you out.",
            "Your data lives only on your device and in your own private iCloud (iPhone) or Google Drive (Android) — never on our servers.",
            "Apex Wizard has no backend and no access to your data, so there is nothing for us to delete on our end.",
            "Already uninstalled? You can remove the leftover cloud backup yourself — steps below.",
          ]}
        />

        <Section id="whats-deleted" number="01" title="What gets deleted">
          <p>
            Deleting your account permanently removes everything you have stored in Apex Wizard:
          </p>
          <ul>
            <li>Every bike and its adjustment ranges</li>
            <li>All saved setups &mdash; clicks, sag, geometry, pressures and notes</li>
            <li>Track days and sessions, including lap times and conditions</li>
            <li>Tyre sets and mileage logs</li>
            <li>Service history and maintenance schedules</li>
            <li>Packing lists</li>
            <li>App settings and preferences</li>
          </ul>
          <Callout variant="warning" title="This cannot be undone">
            Deletion is permanent. Once you confirm, your data is removed from your device and
            from your private cloud backup, and it cannot be recovered.
          </Callout>
        </Section>

        <Section id="in-app" number="02" title="Delete inside the app (recommended)">
          <p>
            The fastest and most complete way to delete your account is from inside the app. It
            works the same on iPhone and Android:
          </p>
          <ul>
            <li>
              Open Apex Wizard and go to <strong>Settings</strong> (the gear icon).
            </li>
            <li>
              Scroll to the bottom and tap <strong>Delete Account</strong>.
            </li>
            <li>Confirm when prompted.</li>
          </ul>
          <p>
            This permanently erases all of your data from the device <strong>and</strong> from your
            cloud backup (iCloud on iPhone, Google Drive on Android), and signs you out. The app
            returns to the welcome screen, as if it were freshly installed.
          </p>
          <Callout variant="info" title="Just want to stop syncing?">
            If you only want to sign out but keep your data, use <strong>Sign Out</strong> instead
            of Delete Account. Sign Out leaves your data in place so you can sign back in later.
          </Callout>
        </Section>

        <Section id="uninstalled" number="03" title="If you've already uninstalled the app">
          <p>
            If you have already removed the app, your on-device data is gone, but a backup copy may
            still exist in your personal cloud account. You can delete it yourself:
          </p>

          <h3>iPhone &amp; iPad (iCloud)</h3>
          <ul>
            <li>
              Open <strong>Settings</strong> and tap your name at the top.
            </li>
            <li>
              Tap <strong>iCloud</strong> &rarr; <strong>Manage Account Storage</strong> (or{" "}
              <strong>Manage Storage</strong>).
            </li>
            <li>
              Select <strong>Apex Wizard</strong> and choose <strong>Delete from iCloud</strong>.
            </li>
          </ul>

          <h3>Android (Google Drive)</h3>
          <ul>
            <li>
              Open the <strong>Google Drive</strong> app (or drive.google.com).
            </li>
            <li>
              Go to <strong>Settings</strong> &rarr; <strong>Manage apps</strong>.
            </li>
            <li>
              Find <strong>Apex Wizard</strong>, open its options and choose{" "}
              <strong>Delete app data</strong>.
            </li>
          </ul>
        </Section>

        <Section id="no-access" number="04" title="We can't access your data">
          <p>
            Apex Wizard is built to be private. There is <strong>no Apex Wizard server</strong> and
            no account database on our side. Everything you create stays on your device and in your
            own private Apple or Google account, which only you can access.
          </p>
          <p>
            Because of this, we are physically unable to view, export, or delete your data for you.
            If you email us, the most we can do is walk you through the self-service steps above
            &mdash; we cannot reach into your iCloud or Google Drive ourselves.
          </p>
        </Section>

        <Section id="contact" number="05" title="Need help">
          <p>
            If you have any trouble with the steps above, email <a href={mailto}>{CONTACT_EMAIL}</a>{" "}
            and we will help you through it.
          </p>
        </Section>
      </ContentLayout>
    </main>
  );
}
