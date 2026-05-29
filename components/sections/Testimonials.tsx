import { Quote, Star } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";

const REVIEWS = [
  {
    text: "Finally stopped guessing and shaved 1.2 seconds off my best lap at Mugello. The troubleshooter nailed my fork issue instantly.",
    name: "Marco R.",
    bike: "2024 Aprilia RSV4 — Track Day Enthusiast",
  },
  {
    text: "I used to carry a notebook to every track day. Now everything is in one app — clickers, pressures, lap times. Can't ride without it.",
    name: "James K.",
    bike: "2023 BMW S1000RR — Club Racer",
  },
  {
    text: "The bike dynamics scores helped me understand why my R6 felt twitchy. Two clicks of rebound later — completely different bike.",
    name: "Lisa T.",
    bike: "2022 Yamaha YZF-R6 — Weekend Track Warrior",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          tag="Riders Love It"
          title={
            <>
              What Track Riders <span className="aw-gradient-text">Are Saying.</span>
            </>
          }
        />
        <div className="grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <figure className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)]/70 p-7 backdrop-blur transition-all hover:-translate-y-1 hover:border-[var(--color-border-bright)]">
                <Quote className="absolute -top-2 -right-2 size-20 text-[var(--color-primary)]/[0.04]" />
                <div className="relative flex gap-0.5 text-[var(--color-warning)]">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="relative mt-5 flex-1 text-[15px] leading-relaxed text-[var(--color-text)]">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <figcaption className="relative mt-6 border-t border-[var(--color-border)] pt-4">
                  <p className="font-extrabold">{r.name}</p>
                  <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                    {r.bike}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
