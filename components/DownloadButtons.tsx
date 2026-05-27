"use client";

import { Apple, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ADS_CONVERSION, APP_STORE_URL, PLAY_STORE_URL } from "@/lib/constants";

function fireConversion() {
  window.gtag?.("event", "conversion", { send_to: ADS_CONVERSION });
}

export function DownloadButtons({ className }: { className?: string }) {
  return (
    <div className={className ?? "flex flex-wrap gap-4"}>
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
    </div>
  );
}
