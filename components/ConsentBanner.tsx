"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("apex_wizard_consent")) {
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  function decide(granted: boolean) {
    const status = granted ? "granted" : "denied";
    window.gtag?.("consent", "update", {
      ad_storage: status,
      ad_user_data: status,
      ad_personalization: status,
      analytics_storage: status,
    });
    localStorage.setItem("apex_wizard_consent", status);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded-2xl border border-[var(--color-border-bright)] bg-[var(--color-surface)] p-5 backdrop-blur-lg shadow-2xl">
      <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">
        CONSENT_REQUIRED // v2.0
      </h4>
      <p className="mt-2 text-sm text-[var(--color-text-dim)]">
        We use cookies to analyze site traffic and optimize your experience. Choose your
        data preference below.
      </p>
      <div className="mt-4 flex gap-3">
        <Button variant="ghost" size="sm" onClick={() => decide(false)}>
          Decline All
        </Button>
        <Button size="sm" onClick={() => decide(true)}>
          Accept All
        </Button>
      </div>
    </div>
  );
}
