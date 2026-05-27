"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { ADS_CONVERSION, APP_STORE_URL, PATREON_URL, PLAY_STORE_URL } from "@/lib/constants";

function fireConversion() {
  window.gtag?.("event", "conversion", { send_to: ADS_CONVERSION });
}

function useSmartStoreUrl() {
  const [href, setHref] = useState<string>(APP_STORE_URL);
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (/android/i.test(navigator.userAgent)) setHref(PLAY_STORE_URL);
  }, []);
  return href;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const storeUrl = useSmartStoreUrl();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-[var(--color-border)] bg-[var(--color-bg)]/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link
          href="/"
          className="font-mono text-lg font-extrabold tracking-tight"
        >
          Apex<span className="text-[var(--color-primary)]"> Wizard</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={PATREON_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 px-3 py-2 text-sm font-semibold text-[var(--color-warning)] transition-opacity hover:opacity-80 sm:flex"
          >
            <Heart className="size-4" /> Patreon
          </a>
          <a
            href={storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={fireConversion}
            className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[var(--color-primary)] px-5 text-sm font-extrabold text-[var(--color-primary-foreground)] shadow-[0_0_24px_-8px_var(--color-primary)] transition-transform hover:scale-[1.03] active:scale-95"
          >
            <Download className="size-4" /> Download Free
          </a>
        </div>
      </div>
    </nav>
  );
}
