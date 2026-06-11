import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { PATREON_URL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative z-10 mt-12 border-t border-[var(--color-border)] px-6 pb-28 pt-16 lg:pb-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 font-mono text-2xl font-extrabold tracking-tight"
        >
          <Image
            src="/assets/favicon.png"
            alt="Apex Wizard app icon"
            width={36}
            height={36}
            unoptimized
            className="size-9 rounded-lg ring-1 ring-[var(--color-primary)]/30"
          />
          Apex<span className="text-[var(--color-primary)]"> Wizard</span>
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm font-semibold text-[var(--color-text-dim)]">
          <Link
            href="/setup"
            className="transition-colors hover:text-[var(--color-primary)]"
          >
            Setups
          </Link>
          <Link
            href="/guides"
            className="transition-colors hover:text-[var(--color-primary)]"
          >
            Guides
          </Link>
          <Link
            href="/tuning-guide"
            className="transition-colors hover:text-[var(--color-primary)]"
          >
            Tuning Guide
          </Link>
          <Link
            href="/about"
            className="transition-colors hover:text-[var(--color-primary)]"
          >
            About
          </Link>
          <Link
            href="/terms"
            className="transition-colors hover:text-[var(--color-primary)]"
          >
            Terms & Legal
          </Link>
          <Link
            href="/privacy"
            className="transition-colors hover:text-[var(--color-primary)]"
          >
            Privacy Policy
          </Link>
          <Link
            href="/support"
            className="transition-colors hover:text-[var(--color-primary)]"
          >
            Support
          </Link>
          <a
            href={PATREON_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[var(--color-warning)] transition-opacity hover:opacity-80"
          >
            <Heart className="size-3.5" /> Patreon
          </a>
        </nav>

        <div className="max-w-3xl space-y-2 border-t border-[var(--color-border)] pt-8 text-xs leading-relaxed text-[var(--color-text-muted)]">
          <p>&copy; 2026 Adrian Dokoza. All rights reserved.</p>
          <p>
            Apex Wizard is a trademark of Adrian Dokoza. Apple and the Apple
            Logo are trademarks of Apple Inc., registered in the U.S. and other
            countries. Google Play and the Google Play logo are trademarks of
            Google LLC.
          </p>
        </div>
      </div>
    </footer>
  );
}
