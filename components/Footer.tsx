import Link from "next/link";
import { PATREON_URL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--color-border)] px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <span className="font-mono text-lg font-extrabold">
          Apex<span className="text-[var(--color-primary)]"> Wizard</span>
        </span>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[var(--color-text-dim)]">
          <Link href="/tuning-guide" className="hover:text-[var(--color-primary)]">
            Tuning Guide
          </Link>
          <Link href="/terms" className="hover:text-[var(--color-primary)]">
            Terms & Legal
          </Link>
          <Link href="/privacy" className="hover:text-[var(--color-primary)]">
            Privacy Policy
          </Link>
          <Link href="/support" className="hover:text-[var(--color-primary)]">
            Support
          </Link>
          <a
            href={PATREON_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-warning)] hover:brightness-110"
          >
            Patreon
          </a>
        </div>
        <div className="max-w-2xl space-y-2 text-xs text-[var(--color-text-muted)]">
          <p>&copy; 2026 Adrian Dokoza. All rights reserved.</p>
          <p>
            Apex Wizard is a trademark of Adrian Dokoza. Apple and the Apple Logo are
            trademarks of Apple Inc., registered in the U.S. and other countries. Google
            Play and the Google Play logo are trademarks of Google LLC.
          </p>
        </div>
      </div>
    </footer>
  );
}
