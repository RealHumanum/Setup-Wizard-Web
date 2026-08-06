# Apex Wizard Web — Project Config

Marketing + interactive-sandbox site for the Apex Wizard motorcycle suspension app
(developer: Adrian Dokoza). Static-exported and served on GitHub Pages at www.apex-wizard.com.

## Tech Stack
- Next.js 16 (App Router) · React 19 · TypeScript 5
- Tailwind CSS v4 (CSS-first `@theme` in `app/globals.css`) · Shadcn UI primitives
- State: Zustand (`lib/store.ts`) · Animation: Framer Motion · Math: KaTeX

## Commands
- Build / static export: `npm run build` (outputs to `out/`)
- Type check: `npm run typecheck` (or `npx tsc --noEmit`)
- Lint: `npm run lint`
- Local dev: `npm run dev`
- No test runner is configured. `lib/physics.ts` / `lib/units.ts` are written to be
  unit-testable if one is added.

## Architecture & Guidelines
- Static export only (`output: 'export'`). No server runtime, no API routes.
- All calculators run 100% client-side. The app collects zero user data; the website
  uses Google Analytics + Ads (consent-gated, default-denied) — keep this disclosed in
  `app/privacy/page.tsx`. Do NOT claim "zero data collection" for the website.
- Use OKLCh color tokens (defined in `app/globals.css` `@theme`) for glare readability.
- Interactive controls use 48px minimum touch targets (`min-h-12`).
- Pure math lives in `lib/physics.ts` / `lib/units.ts` (unit-testable, no side effects).
- Deploy: `.github/workflows/deploy.yml` builds and publishes `out/` to GitHub Pages.
  Repo Pages source must be set to "GitHub Actions".
- Static assets live in `public/assets/`; `public/CNAME` + `public/.nojekyll` ship the domain.
- **Everything in `public/` is published.** Internal notes belong in `docs/` (see
  `docs/deep-linking.md`, `docs/photo-credits.md`) — never in `public/`.
- Photographic assets are compressed on the way in (see `docs/photo-credits.md`). Never
  re-encode an already-compressed JPEG in place; restore the original from git first,
  or artifacts compound.

## SEO & content architecture
- **Structured data:** `lib/schema.ts` is the single source of truth for the entity graph
  (Person = Adrian Dokoza, Organization, WebSite, SoftwareApplication) and JSON-LD builders
  (`breadcrumbJsonLd`, `faqJsonLd`, `articleJsonLd`, `collectionPageJsonLd`, `motorcycleNode`,
  `howToJsonLd`). Emit with `<JsonLd data={...} />`. The site graph is injected once in
  `app/layout.tsx`; `appJsonLd` on the homepage. Use `<FaqSection>` (not raw `<Faq>`) so every
  FAQ also emits `FAQPage` schema.
  Do NOT add `aggregateRating` without real, verifiable rating data.
- **Calibrate expectations before adding markup.** Google restricted FAQ rich results to
  government/health sites in 2023 and retired HowTo rich results entirely. The `FAQPage` and
  `HowTo` output here earns its place through Bing and AI answer-engine extraction, not Google
  rich results — don't add more schema expecting a visible SERP change.
- **Counts:** never hardcode a bike count. Import `BIKE_COUNT` from `lib/bikes.ts` (and
  `allManufacturers().length` for manufacturers). The site previously drifted between "115+",
  "190+" and the real figure across 11 files.
- **Per-page metadata:** every route exports `metadata` with `alternates.canonical` and pairs
  "Apex Wizard" with a motorcycle/suspension modifier (entity disambiguation vs Oracle APEX etc.).
  Titles ≤60 chars, descriptions ≤155 — enforce with `pickTitle` / `withBrand` /
  `clampDescription` from `lib/seo.ts` rather than counting by hand. The brand suffix is the
  first thing to sacrifice; the model name is the last.
- **Social image:** `SHARE_IMAGE` must stay landscape (1200×630). The portrait phone
  screenshot belongs only on `SoftwareApplication.screenshot`.
- **Bike setup pages** (`/setup`, `/setup/[manufacturer]`, `/setup/[manufacturer]/[model]`):
  data in `lib/bikes.ts`, **auto-generated** from the iOS OEM DB by `scripts/port-bikes.mjs`
  (regenerate from `bikes_kotlin.txt`; edits to `lib/bikes.ts` are overwritten). Teaser model:
  adjuster *capabilities* only — exact clicker limits stay in the app. Presentation helpers in
  `lib/bike-display.ts`.
- **Guides hub** (`/guides` + `/guides/<slug>`): registry in `lib/guides.ts`; articles reuse the
  `components/content/*` framework and mirror `app/guides/setting-motorcycle-sag/page.tsx`.
- **Sitemap** (`app/sitemap.ts`) auto-derives from `lib/bikes.ts` + `lib/guides.ts` + static routes —
  new bikes/guides appear automatically. URLs carry trailing slashes to match canonicals.
- **Bike page content** (`lib/bike-display.ts`): the dataset holds only 9 distinct adjuster
  profiles across ~190 bikes, so shared body copy produces ~21 near-identical pages per
  profile. `adjustabilityTier`, `tierGuidance`, `cannotTune`, `categoryBaseline`, `eraNote`
  and `relevantGuides` differentiate each page from real fields. Keep new per-bike copy
  derived from data, never a fixed string.
- **Deep links:** `docs/deep-linking.md` tracks status. iOS AASA is live in
  `public/.well-known/apple-app-site-association` (Team ID `SLM3HUQCXT`) but inert until the
  iOS app gets the Associated Domains entitlement. Android `assetlinks.json` still blocked on
  the Play signing fingerprint.
- **`/llms.txt`** is generated by `app/llms.txt/route.ts` from the guide and manufacturer
  registries, so it can't drift. It's an emerging convention, not a standard.
