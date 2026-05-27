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
