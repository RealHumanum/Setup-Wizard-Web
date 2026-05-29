"use client";

import { Apple, Play, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ADS_CONVERSION,
  APP_STORE_URL,
  PLAY_STORE_URL,
  PATREON_URL,
} from "@/lib/constants";

function fireConversion() {
  window.gtag?.("event", "conversion", { send_to: ADS_CONVERSION });
}

export function DownloadButtons({
  className,
  showPatreon = true,
}: {
  className?: string;
  showPatreon?: boolean;
}) {
  return (
    <div className={className ?? "flex flex-wrap gap-3"}>
      <Button size="lg" asChild>
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={fireConversion}
        >
          <Apple className="size-5" /> Download for iOS
        </a>
      </Button>
      <Button size="lg" variant="outline" asChild>
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={fireConversion}
        >
          <Play className="size-5" /> Download for Android
        </a>
      </Button>
      {showPatreon && (
        <Button
          size="lg"
          variant="outline"
          className="border-[var(--color-warning)] text-[var(--color-warning)] hover:bg-[var(--color-warning-dim)]"
          asChild
        >
          <a href={PATREON_URL} target="_blank" rel="noopener noreferrer">
            <Heart className="size-5" /> Support on Patreon
          </a>
        </Button>
      )}
    </div>
  );
}
