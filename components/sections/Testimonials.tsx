import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";

const REVIEWS = [
  { text: "Finally stopped guessing and shaved 1.2 seconds off my best lap at Mugello. The troubleshooter nailed my fork issue instantly.", name: "Marco R.", bike: "2024 Aprilia RSV4 — Track Day Enthusiast" },
  { text: "I used to carry a notebook to every track day. Now everything is in one app — clickers, pressures, lap times. Can't ride without it.", name: "James K.", bike: "2023 BMW S1000RR — Club Racer" },
  { text: "The bike dynamics scores helped me understand why my R6 felt twitchy. Two clicks of rebound later — completely different bike.", name: "Lisa T.", bike: "2022 Yamaha YZF-R6 — Weekend Track Warrior" },
];

export function Testimonials() {
  return (
    <section className="relative px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          tag="Riders Love It"
          title={<>What Track Riders <span className="aw-gradient-text">Are Saying.</span></>}
        />
        <div className="grid gap-5 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <Card className="h-full p-6">
                <div className="flex gap-0.5 text-[var(--color-warning)]">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm text-[var(--color-text-dim)]">&ldquo;{r.text}&rdquo;</p>
                <div className="mt-4">
                  <p className="font-bold">{r.name}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{r.bike}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
