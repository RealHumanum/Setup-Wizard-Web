"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { ADS_CONVERSION, APP_STORE_URL, PLAY_STORE_URL } from "@/lib/constants";

function fireConversion() {
  window.gtag?.("event", "conversion", { send_to: ADS_CONVERSION });
}

// Detect iOS vs Android client-side to pick the right store deep-link.
function useSmartStoreUrl() {
  const [href, setHref] = useState<string>(APP_STORE_URL);
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const ua = navigator.userAgent;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (/android/i.test(ua)) setHref(PLAY_STORE_URL);
    // initial state already matches APP_STORE_URL on iOS / unknown UAs
  }, []);
  return href;
}

export function StickyDownloadBar() {
  const [visible, setVisible] = useState(false);
  const href = useSmartStoreUrl();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={
        "fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 transition-transform duration-300 lg:hidden " +
        (visible ? "translate-y-0" : "translate-y-full")
      }
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex max-w-md items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-sm font-extrabold leading-tight">Apex Wizard</span>
          <span className="flex items-center gap-1 text-[10px] font-semibold text-[var(--color-text-dim)]">
            Free to Download
            <span className="flex gap-0.5 text-[var(--color-warning)]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-2.5 fill-current" />
              ))}
            </span>
          </span>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={fireConversion}
          className="flex min-h-11 items-center justify-center rounded-md bg-[var(--color-primary)] px-7 text-sm font-bold uppercase tracking-wider text-[var(--color-primary-foreground)] transition-all hover:brightness-105 active:scale-[0.98]"
        >
          Get
        </a>
      </div>
    </div>
  );
}
