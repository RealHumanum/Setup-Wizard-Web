import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found | Apex Wizard",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 py-32 text-center">
      <span className="font-mono text-7xl font-black tracking-tighter aw-gradient-text sm:text-9xl">
        404
      </span>
      <p className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
        Off the racing line
      </p>
      <h1 className="mt-6 text-2xl font-extrabold sm:text-3xl">
        This corner doesn&rsquo;t exist.
      </h1>
      <p className="mt-3 max-w-md text-[var(--color-text-dim)]">
        The page you&rsquo;re looking for ran wide and left the track. Let&rsquo;s get you
        back to the pits.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/tuning-guide">Tuning Guide</Link>
        </Button>
      </div>
    </main>
  );
}
