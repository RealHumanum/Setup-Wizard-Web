import { Star, Flag, Smartphone } from "lucide-react";

const ITEMS = [
  { icon: Star, text: "Featured suspension logbook for sportbike riders" },
  { icon: Flag, text: "Used at tracks across Europe & North America" },
  { icon: Smartphone, text: "Available on App Store & Google Play" },
];

export function SocialProof() {
  return (
    <section className="relative border-y border-[var(--color-border)] bg-[var(--color-bg)]/30 px-6 py-5 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 text-center">
        {ITEMS.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-xs font-medium text-[var(--color-text-dim)] sm:text-sm"
          >
            <item.icon className="size-4 text-[var(--color-primary)]" />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
