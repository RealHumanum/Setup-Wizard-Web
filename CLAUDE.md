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
- Tests: `npm test`

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

## SEO & content architecture
- **Structured data:** `lib/schema.ts` is the single source of truth for the entity graph
  (Person = Adrian Dokoza, Organization, WebSite, SoftwareApplication) and JSON-LD builders
  (`breadcrumbJsonLd`, `faqJsonLd`, `articleJsonLd`, `itemListJsonLd`). Emit with
  `<JsonLd data={...} />`. The site graph is injected once in `app/layout.tsx`; `appJsonLd` on
  the homepage. Use `<FaqSection>` (not raw `<Faq>`) so every FAQ also emits `FAQPage` schema.
  Do NOT add `aggregateRating` without real, verifiable rating data.
- **Per-page metadata:** every route exports `metadata` with `alternates.canonical` and pairs
  "Apex Wizard" with a motorcycle/suspension modifier (entity disambiguation vs Oracle APEX etc.).
- **Bike setup pages** (`/setup`, `/setup/[manufacturer]`, `/setup/[manufacturer]/[model]`):
  data in `lib/bikes.ts`, **auto-generated** from the iOS OEM DB by `scripts/port-bikes.mjs`
  (regenerate from `bikes_kotlin.txt`; edits to `lib/bikes.ts` are overwritten). Teaser model:
  adjuster *capabilities* only — exact clicker limits stay in the app. Presentation helpers in
  `lib/bike-display.ts`.
- **Guides hub** (`/guides` + `/guides/<slug>`): registry in `lib/guides.ts`; articles reuse the
  `components/content/*` framework and mirror `app/guides/setting-motorcycle-sag/page.tsx`.
- **Sitemap** (`app/sitemap.ts`) auto-derives from `lib/bikes.ts` + `lib/guides.ts` + static routes —
  new bikes/guides appear automatically. URLs carry trailing slashes to match canonicals.
- **Deep links:** `public/.well-known/README.md` has ready-to-fill AASA + assetlinks templates
  (blocked on Apple Team ID + Play signing fingerprint).
