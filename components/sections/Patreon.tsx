import { Check, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    perks: ["Private Discord Role", "Behind-the-scenes dev logs", "Supporter credit in the app"],
    featured: false,
  },
  {
    badge: "Tier 2 • Most Popular",
    name: "The Pit Crew",
    price: "$5",
    desc: "Join the design room. Get early access to features and vote directly on the development roadmap.",
    perks: ["Beta app access (iOS & Android)", "Voting rights on next bike databases", "Exclusive Pit Crew Discord", "All Tier 1 benefits"],
    featured: true,
  },
  {
    badge: "Tier 3",
    name: "Factory Rider",
    price: "$15",
    desc: "Direct line to the developer. Priority updates and customized support for your specific setup needs.",
    perks: ["Priority bike requests", "Direct 1-on-1 setup reviews", "Premium credits page mention", "All Tier 1 & 2 benefits"],
    featured: false,
  },
];

export function Patreon() {
  return (
    <section id="patreon" className="relative px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          tag="Co-Develop the Future"
          title={<>Pure Performance. <span className="aw-gradient-text">Rider Owned.</span></>}
          sub="Apex Wizard is built by riders, for riders. Support our independent development to keep the project growing — no core features are paywalled."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <Card
                className={`h-full p-6 ${t.featured ? "border-[var(--color-warning)]" : ""}`}
              >
                <Badge variant={t.featured ? "warning" : "muted"}>{t.badge}</Badge>
                <h3 className="mt-3 text-xl font-bold">{t.name}</h3>
                <p className="mt-2 font-mono text-3xl font-extrabold">
                  {t.price}
                  <span className="text-sm text-[var(--color-text-muted)]"> / mo</span>
                </p>
                <p className="mt-3 text-sm text-[var(--color-text-dim)]">{t.desc}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {t.perks.map((p) => (
                    <li key={p} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-[var(--color-primary)]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button variant="warning" size="lg" asChild>
            <a href={PATREON_URL} target="_blank" rel="noopener noreferrer">
              <Heart className="size-5" /> Support Us on Patreon
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
