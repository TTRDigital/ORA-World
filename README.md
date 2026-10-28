# ORA World — marketing website

Luxury, eco-conscious residences in Dorado, Puerto Rico. Next.js 16 (App Router, TypeScript strict), Sanity CMS with an embedded Studio, Tailwind v4 design tokens, next-intl (EN/ES), GSAP + Lenis motion, MapLibre map, React Hook Form + Zod lead capture. Built by TTR Digital.

- Design system and rationale: [`DESIGN.md`](./DESIGN.md)
- Everything still needing real data from the client: [`CONTENT-TODO.md`](./CONTENT-TODO.md)
- Source copy captured from oraworld.com: [`docs/source/oraworld-com/`](./docs/source/oraworld-com/)

## Quick start

```bash
pnpm install
cp .env.example .env.local        # fill in what you have; everything is optional for a local build
pnpm dev                           # http://localhost:3000 → redirects to /en
```

Without a Sanity project the site renders entirely from the typed seed content in `src/content/seed/` (the same content the seed script pushes to Sanity), so staging works before the CMS is populated.

## Scripts

| Command                                                                             | What it does                                                                                                                                  |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm dev` / `pnpm build` / `pnpm start`                                            | Next.js dev server, production build, production server                                                                                       |
| `pnpm lint` · `pnpm typecheck` · `pnpm format`                                      | ESLint, `tsc --noEmit`, Prettier                                                                                                              |
| `pnpm test:e2e`                                                                     | Playwright smoke + axe accessibility suite (`tests/e2e`). Builds and starts the app, or set `BASE_URL`                                        |
| `pnpm lighthouse /en /en/residences`                                                | Lighthouse mobile + desktop against `BASE_URL` (default localhost:3000); JSON reports in `reports/lighthouse/`                                |
| `pnpm images:build`                                                                 | Optimises `assets-source/images/{client,free}/*` into `public/images/*` and writes `src/content/images.json` (dimensions + blur placeholders) |
| `pnpm video:build`                                                                  | ffmpeg pipeline for `assets-source/hero-video.mp4` → 1080p/720p MP4 + WebM, 16 s seamless loop, poster frames                                 |
| `pnpm seed`                                                                         | Seeds the Sanity dataset from `src/content/seed/` (uploads images as assets, createOrReplace by stable ids)                                   |
| `node scripts/screenshot.mjs <dir> /en ...` · `node scripts/sections.mjs <dir> /en` | Desktop 1440 / mobile 390 screenshots, per page or per section                                                                                |

## Environment variables

All keys live in `.env.example`. None are required for a local build.

| Variable                                                              | Purpose                                                                                                                                                                                                                                   |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_ENV`                                                | `staging` (default: `noindex` headers, robots disallow, direction switcher) or `production`                                                                                                                                               |
| `NEXT_PUBLIC_SITE_URL`                                                | Canonical origin for metadata, sitemap and JSON-LD                                                                                                                                                                                        |
| `NEXT_PUBLIC_PORTAL_URL`                                              | Header "Log In" link (future client portal)                                                                                                                                                                                               |
| `NEXT_PUBLIC_ORA_SANITY_PROJECT_ID`, `NEXT_PUBLIC_ORA_SANITY_DATASET` | Sanity project + dataset. **ORA-prefixed on purpose**: TTR's build environment also defines `NEXT_PUBLIC_SANITY_*` for the agency's own site, and this site must never read that content. Leave the project id empty to run from the seed |
| `ORA_SANITY_WRITE_TOKEN`                                              | Server-only Editor token: saves leads, runs `pnpm seed`, enables draft mode                                                                                                                                                               |
| `ORA_SANITY_REVALIDATE_SECRET`                                        | Secret for the Sanity webhook → `POST /api/revalidate`                                                                                                                                                                                    |
| `NEXT_PUBLIC_MAPBOX_TOKEN`                                            | Optional. The map uses MapLibre GL with keyless OpenFreeMap tiles by default; a Mapbox token can be wired into `LocationMap.tsx` as an alternative tile source                                                                            |
| `NEXT_PUBLIC_SITE_LAT`, `NEXT_PUBLIC_SITE_LNG`                        | Site pin (defaults near Cerro Gordo, Vega Alta; confirm with the client)                                                                                                                                                                  |
| `NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_EMAIL`      | Contact details used by the floating bar, footer and contact page until Sanity supplies them                                                                                                                                              |
| `CRM_WEBHOOK_URL`, `CRM_WEBHOOK_SECRET`                               | Lead JSON is POSTed here with an `X-ORA-Secret` header                                                                                                                                                                                    |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`              | Cloudflare Turnstile (bypassed when empty)                                                                                                                                                                                                |
| `EMAIL_ENABLED`, `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_BCC`          | Confirmation email via Resend                                                                                                                                                                                                             |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`                  | Optional distributed rate limiting (in-memory fallback otherwise)                                                                                                                                                                         |
| `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GA4_ID`                            | Tags load only after consent (Consent Mode v2)                                                                                                                                                                                            |

## Deploy to Vercel (TTR staging)

1. Import the GitHub repository into the TTR Vercel team; framework preset Next.js (`vercel.json` pins pnpm and cache headers).
2. Add the environment variables above. Keep `NEXT_PUBLIC_SITE_ENV=staging` on the staging project so every response carries `X-Robots-Tag: noindex, nofollow` and `robots.txt` disallows crawling.
3. Deploy. The three homepage directions are reviewable at `/en?direction=a`, `/en?direction=b`, `/en?direction=c` (also `/es`), or with the small switcher at the top right.
4. For production, set `NEXT_PUBLIC_SITE_ENV=production` and the real `NEXT_PUBLIC_SITE_URL`; the direction switch and rewrite are disabled there and Direction A is served.

No Vercel token was available in the build environment, so the staging deployment itself is a manual step for the TTR team.

## Sanity CMS

- Studio: `/studio` (embedded, Presentation + Vision tools). Desk grouped by Site · Pages · Residences · Media · Location · Press · Leads.
- Schemas: `src/sanity/schemas/`. Every visible string is a localized `{ en, es }` object with both languages required. Images carry alt text (required), caption, "artist's conceptual rendering" and "placeholder" flags.
- Dataset: TTR project `y2g7jhit` only has the agency's `production` dataset, and the build token cannot create datasets. **Create a dataset named `ora-world` in sanity.io/manage (or a dedicated project), set `NEXT_PUBLIC_ORA_SANITY_PROJECT_ID`, then run `pnpm seed`.** Until then the site renders from the seed.
- Data layer: `src/lib/content.ts` tries Sanity first (GROQ in `src/sanity/queries.ts`, projected into the seed shapes) and falls back to the seed per content type, so partially populated datasets still render.
- Editing guide: Homepage sections are ordered objects on the Homepage document with "Show section" toggles. Wrap one word in `*asterisks*` in any headline for the italic accent. Collections, floor plans, amenities, gallery, team, points of interest, FAQ, press, incentives, deposit steps and generic pages are plain documents. Leads appear read-only under Leads.
- Previews: Presentation tool uses `/api/draft-mode/enable`; configure the webhook to `/api/revalidate` with `ORA_SANITY_REVALIDATE_SECRET` for instant publishes.

## Architecture notes

- `src/proxy.ts` (Next 16 "proxy", formerly middleware): locale routing, first-touch attribution cookie (UTM, click ids, referrer, landing page), staging direction rewrite.
- Tokens: `src/styles/globals.css` defines palette, semantic aliases, type scale, motion, and the `data-direction` remaps for B and C. Tailwind utilities read them through `@theme inline`.
- Motion: `src/lib/reveal.ts` drives `data-reveal`, `data-reveal-lines`, `data-counter`, `data-parallax`; everything respects `prefers-reduced-motion`. Lenis is disabled on touch and under reduced motion.
- Lead capture: `src/components/forms/LeadForm.tsx` (variants short / full / broker / gate) → `POST /api/lead` (Zod, honeypot, Turnstile, rate limit → CRM webhook, Sanity `lead`, Resend email).
- Gate: `src/components/gate/RegistrationGate.tsx` + `ora_registered` cookie. Shortlist: `src/lib/shortlist.ts` (localStorage, max 3).
- Security: CSP and other headers in `next.config.ts`; the Studio route has its own relaxed set.

## QA status (build of 2026-10-28)

- Playwright: 38/38 passing (desktop 1440 + mobile 390): navigation, root redirect, language switch, overlay menu focus/Escape, lead form validation + success panel, gated plan unlock remembered across pages, filters + shortlist + compare, lightbox keyboard navigation, direction switch, robots/sitemap/noindex/CSP, and axe WCAG 2.2 AA scans (no serious/critical violations) on ten pages in both viewports.
- Lighthouse 13 (simulated throttling, local production server). SEO reads 61 on staging only because staging deliberately sends `noindex` and the canonical points at the staging domain; the same pages score **SEO 100** when built with `NEXT_PUBLIC_SITE_ENV=production`.

| Page                           | Mobile perf | Desktop perf | A11y | Best practices | SEO (prod build) |
| ------------------------------ | ----------- | ------------ | ---- | -------------- | ---------------- |
| `/en` (home, Direction A)      | 94          | 80           | 100  | 100            | 100              |
| `/es`                          | 96          | 85           | 100  | 100            | 100              |
| `/en/residences`               | 89          | 94           | 100  | 100            | 100              |
| `/en/floor-plans/residence-b1` | 91          | 76           | 100  | 100            | 100              |
| `/en/location`                 | 90          | 74           | 100  | 100            | 100              |
| `/en/gallery`                  | 90          | 94           | 100  | 100            | 100              |
| `/en/contact`                  | 100         | 96           | 100  | 100            | 100              |
| `/en/faq`                      | 100         | 96           | 100  | 100            | 100              |

CLS is 0 on every page; LCP on the image-led inner pages is 3.5–4.5 s under Lighthouse's simulated slow 4G (the pessimistic model charges all page JavaScript against the hero image), 0.9–1.1 s on desktop. Desktop scores on the plan and location pages are held back by the same simulated LCP; TBT is under 100 ms there.

Screenshots of every direction and key page (desktop 1440 / mobile 390) are in `reports/screenshots/`.
