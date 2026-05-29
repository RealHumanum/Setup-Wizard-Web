import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Bottom-of-page CTA strip that ties content back to the app download.
export function ContentCta({
  title,
  desc,
  primaryHref = "/#cta",
  primaryLabel = "Get Apex Wizard",
}: {
  title: string;
  desc: string;
  primaryHref?: string;
  primaryLabel?: string;
}) {
  return (
    <div className="mt-16 overflow-hidden rounded-3xl border border-[var(--color-border-bright)] bg-[var(--color-surface)] p-8 text-center sm:p-12">
      <h3 className="font-mono text-2xl font-extrabold leading-tight sm:text-3xl">
        {title}
      </h3>
      <p className="mx-auto mt-3 max-w-xl text-[var(--color-text-dim)]">{desc}</p>
      <div className="mt-6 flex justify-center">
        <Button size="lg" asChild>
          <Link href={primaryHref}>
            {primaryLabel} <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
