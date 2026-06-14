import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { PATREON_URL } from "@/lib/constants";

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "Setups", href: "/setup" },
      { label: "Guides", href: "/guides" },
      { label: "Tuning Guide", href: "/tuning-guide" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Support", href: "/support" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms & Legal", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Delete Account", href: "/delete-account" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative z-10 mt-16 border-t border-[var(--color-border)] px-6 pb-28 pt-16 lg:pb-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          {/* Brand block */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-display text-2xl font-extrabold tracking-tight"
            >
              <Image
                src="/assets/favicon.png"
                alt="Apex Wizard app icon"
                width={36}
                height={36}
                unoptimized
                className="size-9 rounded-md ring-1 ring-[var(--color-border-bright)]"
              />
              Apex<span className="text-[var(--color-primary)]"> Wizard</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-dim)]">
              The professional suspension logbook and setup troubleshooter for
              track and street riders.
            </p>
            <a
              href={PATREON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-warning)] transition-opacity hover:opacity-80"
            >
              <Heart className="size-4" /> Support on Patreon
            </a>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-3 lg:gap-x-16">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                  {col.heading}
                </h3>
                <ul className="mt-4 space-y-3 text-sm font-medium text-[var(--color-text-dim)]">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="transition-colors hover:text-[var(--color-primary)]"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[var(--color-border)] pt-8 text-xs leading-relaxed text-[var(--color-text-muted)] sm:flex-row sm:items-start sm:justify-between">
          <p>&copy; 2026 Adrian Dokoza. All rights reserved.</p>
          <p className="max-w-md sm:text-right">
            Apex Wizard is a trademark of Adrian Dokoza. Apple and the Apple Logo
            are trademarks of Apple Inc. Google Play and the Google Play logo are
            trademarks of Google LLC.
          </p>
        </div>
      </div>
    </footer>
  );
}
