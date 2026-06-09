import type { Metadata } from "next";
import { Mail, LifeBuoy, Clock } from "lucide-react";
import { PageHero } from "@/components/content/PageHero";
import { ContentLayout } from "@/components/content/ContentLayout";
import { TableOfContents } from "@/components/content/TableOfContents";
import { Section } from "@/components/content/Section";
import { Callout } from "@/components/content/Callout";
import { FaqSection } from "@/components/content/FaqSection";
import { ContentCta } from "@/components/content/ContentCta";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Rider Support | Apex Wizard",
  description:
    "Get help with Apex Wizard — contact support, custom bikes, backups, and clicks vs turns explained.",
  alternates: { canonical: "/support" },
};

const TOC = [
  { id: "contact", label: "Contact support" },
  { id: "faq", label: "Frequently asked questions" },
  { id: "bug", label: "Reporting a bug" },
];

const FAQ = [
  {
    q: "Can I add a custom motorcycle?",
    a: "Yes. If your specific generation or model is missing from our 115+ factory list, select “Add Custom Bike” in the Garage. You can define exact suspension geometries, clickers, turns, and electronics capabilities manually.",
  },
  {
    q: "Is my data backed up securely?",
    a: "All data lives locally on your device for absolute privacy and maximum offline speed at the track. If you upgrade your phone, your setups carry over when you use standard Apple iCloud or Google Drive system backups — we never see that data.",
  },
  {
    q: "Why do some recommendations say 'Turns' and some say 'Clicks'?",
    a: "Apex Wizard adapts to the hardware reality of your motorcycle. European superbikes typically use strictly “clicks”, while certain Japanese middleweights measure internal needle depth via 1/4 or 1/2 “turns out”. Apex Wizard computes this automatically from your bike's defined capabilities.",
  },
  {
    q: "Does Apex Wizard work offline at the track?",
    a: "Completely. Every calculation, logbook entry, and troubleshooter recommendation runs on-device, so the app is fully functional in cellular-isolated paddocks with no signal.",
  },
  {
    q: "Is the app free?",
    a: "Yes — Apex Wizard is free to download on both the App Store and Google Play, with no core features paywalled.",
  },
];

export default function SupportPage() {
  const mailto = `mailto:${CONTACT_EMAIL}`;

  return (
    <main>
      <PageHero
        eyebrow="SUPPORT"
        title="Rider"
        accent="Support"
        intro="Found a bug, need a custom bike profile, or have a feature request? We're here to help — and we read every message."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Support" }]}
      />

      <ContentLayout toc={<TableOfContents items={TOC} />}>
        <Section id="contact" number="01" title="Contact support">
          <p>
            The fastest way to reach us is email. Whether you&rsquo;ve found a bug, need help
            adding a custom bike profile, or want to request a feature, drop us a line and we
            typically respond within 24 hours.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-5">
              <Mail className="size-5 text-[var(--color-primary)]" />
              <p className="mt-3 font-mono text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                Email
              </p>
              <a
                href={mailto}
                className="mt-1 block break-all text-sm font-semibold text-[var(--color-primary)] hover:brightness-110"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-5">
              <Clock className="size-5 text-[var(--color-primary)]" />
              <p className="mt-3 font-mono text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                Response time
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--color-text)]">
                Within ~24 hours
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-5">
              <LifeBuoy className="size-5 text-[var(--color-primary)]" />
              <p className="mt-3 font-mono text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                Best for
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--color-text)]">
                Bugs, bike requests, feedback
              </p>
            </div>
          </div>

          <div className="mt-6">
            <Button asChild>
              <a href={mailto}>
                <Mail className="size-4" /> Email Support
              </a>
            </Button>
          </div>
        </Section>

        <Section id="faq" number="02" title="Frequently asked questions">
          <p>
            Quick answers to the questions we hear most. If yours isn&rsquo;t here, just email us.
          </p>
          <FaqSection items={FAQ} />
        </Section>

        <Section id="bug" number="03" title="Reporting a bug">
          <p>
            Clear reports get fixed faster. When you email us about a bug, it helps to include:
          </p>
          <ul>
            <li>Your device model and OS version (e.g. iPhone 15 Pro, iOS 18).</li>
            <li>The app version, shown on the Settings screen.</li>
            <li>What you expected to happen, and what actually happened.</li>
            <li>Steps to reproduce it, plus a screenshot if you can.</li>
          </ul>

          <Callout variant="tip" title="Privacy-friendly by default">
            Your setups and telemetry live only on your device, so they are never attached to a
            support request unless you choose to send a screenshot.
          </Callout>
        </Section>

        <ContentCta
          title="Still stuck?"
          desc="Send us the details and we'll get you dialed back in."
          primaryLabel="Email Support"
          primaryHref={mailto}
        />
      </ContentLayout>
    </main>
  );
}
