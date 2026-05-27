import { Check, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { PATREON_URL } from "@/lib/constants";

const TIERS = [
  {
    badge: "Tier 1",
    name: "Apex Supporter",
    price: "$3",
    desc: "Fuel the ongoing server costs for our global track databases and secure database hosting.",
    perks: [
      "Private Discord Role",
      "Behind-the-scenes dev logs",
      "Supporter credit in the app",
    ],
    featured: false,
  },
  {
    badge: "Tier 2 • Most Popular",
    name: "The Pit Crew",
    price: "$5",
    desc: "Join the design room. Get early access to features and vote directly on the development roadmap.",
    perks: [
      "Beta app access (iOS & Android)",
      "Voting rights on next bike databases",
      "Exclusive Pit Crew Discord",
      "All Tier 1 benefits",
    ],
    featured: true,
  },
  {
    badge: "Tier 3",
    name: "Factory Rider",
    price: "$15",
    desc: "Direct line to the developer. Priority updates and customized support for your specific setup needs.",
    perks: [
      "Priority bike requests",
      "Direct 1-on-1 setup reviews",
      "Premium credits page mention",
      "All Tier 1 & 2 benefits",
    ],
    featured: false,
  },
];

export function Patreon() {
  return (
    <section id="patreon" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          tag="Co-Develop the Future"
          title={
            <>
              Pure Performance. <span className="aw-gradient-text">Rider Owned.</span>
            </>
          }
          sub="Apex Wizard is built by riders, for riders. Support our independent development to keep the project growing — no core features are paywalled."
        />
        <div className="grid items-stretch gap-6 md:grid-cols-3">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div
                className={
                  "group relative flex h-full flex-col overflow-hidden rounded-3xl border p-7 backdrop-blur transition-all " +
                  (t.featured
                    ? "border-[var(--color-warning)]/60 bg-[var(--color-surface)] shadow-[0_0_60px_-20px_var(--color-warning)] md:-translate-y-2 md:scale-[1.02]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)]/70 hover:-translate-y-1 hover:border-[var(--color-border-bright)]")
                }
              >
                {t.featured && (
                  <div
                    className="aw-glow size-[300px] bg-[var(--color-warning)]"
                    style={{ top: "-30%", right: "-20%", opacity: 0.18 }}
                  />
                )}
                <div className="relative flex flex-1 flex-col">
                  <span
                    className={
                      "inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-widest " +
                      (t.featured
                        ? "bg-[var(--color-warning)]/15 text-[var(--color-warning)]"
                        : "bg-white/5 text-[var(--color-text-dim)]")
                    }
                  >
                    {t.badge}
                  </span>
                  <h3 className="mt-4 text-2xl font-extrabold leading-tight">
                    {t.name}
                  </h3>
                  <p className="mt-2 font-mono">
                    <span className="text-4xl font-black tracking-tight">
                      {t.price}
                    </span>
                    <span className="text-sm font-semibold text-[var(--color-text-muted)]">
                      {" "}
                      / month
                    </span>
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-dim)]">
                    {t.desc}
                  </p>
                  <ul className="mt-5 flex-1 space-y-2.5 text-sm">
                    {t.perks.map((p) => (
                      <li key={p} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 size-4 shrink-0 text-[var(--color-primary)]" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center gap-3">
          <Button variant="warning" size="lg" asChild>
            <a href={PATREON_URL} target="_blank" rel="noopener noreferrer">
              <Heart className="size-5" /> Support Us on Patreon
            </a>
          </Button>
          <p className="max-w-xl text-center text-xs text-[var(--color-text-muted)]">
            All funds go directly toward real-time server APIs, bike database
            licenses and independent project development.
          </p>
        </div>
      </div>
    </section>
  );
}
