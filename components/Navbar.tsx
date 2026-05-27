"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { PATREON_URL } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all",
        scrolled
          ? "border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-lg"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-mono text-lg font-extrabold tracking-tight">
          Apex<span className="text-[var(--color-primary)]"> Wizard</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={PATREON_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 text-sm font-semibold text-[var(--color-warning)] hover:brightness-110 sm:flex"
          >
            <Heart className="size-4" /> Patreon
          </a>
          <Button size="sm" asChild>
            <a href="#cta">Download Free</a>
          </Button>
        </div>
      </div>
    </nav>
  );
}
