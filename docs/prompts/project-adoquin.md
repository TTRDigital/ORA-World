# Project prompt: ORA World "Adoquín"

> A complete, standalone brief for a **new, separate GitHub repository and Vercel project**. Paste everything below the line into Claude Code in an empty folder.

---

## 0. Your role and the bar

You are the creative director and lead front-end architect at a studio that builds websites for the world's most admired hotels and branded residences. You are building **ORA World Adoquín**, the marketing website for ORA World's residences in Dorado, Puerto Rico. It must feel like a six-figure agency build: warm, generous, light-filled, confident with colour, rooted in Puerto Rican heritage. Think of a Belmond or Aman hotel journal, never a resort brochure.

This is one of two competing concepts the client will choose between. The other concept is dark, monochrome and architectural; yours is the opposite. If any part of your page could pass for a typical luxury real-estate template (dark hero with a centred serif headline, cream background with terracotta accents, three cards in a row), replace it.

Put the boldness in one place, the signature motion in section 2. Keep everything around it calm and generous.

## 1. The client and the content

**Client:** ORA World, a luxury, eco-conscious residential developer in **Dorado, Puerto Rico**. Current site: https://www.oraworld.com (WordPress). Read every page of it before you start: `/`, `/our-residences/`, `/our-amenities/`, `/activities/`, `/tesoro-del-mar/`, `/dorado-waterfalls/`, `/tax-incentive/`, `/contact-us/`. Save a plain-text capture of each page in `docs/source/oraworld-com/` and treat it as the single source of truth for copy.

Facts already confirmed on oraworld.com (safe to publish):

- Positioning: "Beyond expectations." "Thoughtfully crafted communities where longevity, luxury, and nature exist in perfect harmony."
- Mission: "Creating luxury living with timeless elegance and comfort." "Our mission is to revolutionize Puerto Rico's real estate landscape by creating luxurious, eco-friendly developments that seamlessly blend modern elegance with the island's natural beauty."
- **Tesoro Del Mar** (Dorado, Vega Alta, PR 00692): 10-acre development; 335,995 sq ft of land; 129 contemporary apartments; 42 hotel suites; 65,500 sq ft amenities area; walking distance to Balneario Cerro Gordo Beach; 30 minutes from the airport; near a national park; clubhouse and boutique hotel at the community hub; tennis and basketball courts, fitness center, jogging paths, playgrounds. Architecture "draws inspiration from the graceful flight of birds": curved facades, expansive glass, cantilevered terraces "like wings", reflecting pools and cascades.
- **Dorado Waterfalls**: Dorado, PR; 25–30 minutes to San Juan; private eco-luxury residences; Act 60 eligible; residential towers, villas, retail, clubhouse, hotel, helipad; buildings that resemble cascading waterfalls with green terraces and water walls.
- Portfolio listed on the site: Dorado Waterfalls, Tesoro Del Mar, The Top, Dorado Ocean View Estates, Naguabo, Loiza River City, Costa del Este Ceiba, Aquamaria, Guayama, Loiza Ocean, Loiza Countryside Estates, and one "To Be Revealed".
- Homepage chapters on the live site: The Place · A Prosperous Environment · Access The Extraordinary · Resilient By Design · Family-Centered Living · Happy Homes For All · ORA World in VR · Contact.
- **Resilient By Design** (verbatim facts): structures engineered to withstand Category 5 hurricanes; impact-resistant windows, reinforced walls, advanced drainage; seismic engineering exceeding local codes; 24/7 on-site security, patrols, monitored access; AI-enhanced surveillance, smart locks; on-site emergency shelters; high-capacity generators plus solar panels and battery storage; gated monitored parking; elevated foundations and stormwater management; private safe rooms; community resilience training.
- Amenity groups: Wellness & Relaxation · Entertainment & Recreation · Dining & Social Spaces · Business Center · Transportation · Adventure Experiences · Family-Oriented · Sustainability & Nature · Security · Sport & Fitness. Activity groups: Sport & Fitness · Water Sport & Adventures · Culinary & Cultural · Entertainment & Leisure · Adventure & Exploration · Family-Friendly · Medical Services.
- Tax: the site carries a 13-question Act 60 explainer. Reuse it with a "general information, consult your tax advisor" note. No figures beyond what the site states.
- VR: the live site embeds Kuula collection `https://kuula.co/share/collection/7Zt7D`.
- Header: Log In · EN · INQUIRE. Footer: Contact Us · Careers · Press Center · Hotel Development · FAQ. Contact form: Buyer/Broker, Name, State, Email, Country, Phone, "How did you hear about us" (Search Engine · Magazine · Advertisement · Ambassador), Comment or Message.
- Sponsor: TRPbuildco LLC.
- **Legal notice (keep verbatim, every page footer):** "This advertisement is not an offering. It is a solicitation of interest in the advertised property. No offering of the advertised units can be made and no deposits can be accepted, or reservations, binding or non - binding, can be made until an offering plan is filed with the New York State Department of Law. This advertisement is made pursuant to Cooperative Policy Statement No. 1, issued by the New York State Department of Law. Attorney General File No.: CP25-0047. Sponsor: TRPbuildco LLC Sponsor’s Address: Tesoro Del Mar Dorado, Vega Alta, Puerto Rico 00692" followed by "All images on this page are artist renderings."

**Not published anywhere (use clearly labelled placeholders, list them in `CONTENT-TODO.md`):** prices, unit mix, interior sizes, floor counts, floor plans, delivery dates, architect and designer names, team portraits, press coverage, sales gallery address and hours, phone, WhatsApp, email, deposit schedule, broker co-op terms, brochure PDF. Placeholder copy must read as calm on-brand English and Spanish ("Details to be confirmed", "Pricing on request"), never `[[BRACKET CODES]]` on the page and never lorem ipsum.

**Imagery:** the client's own renders and photography are on oraworld.com under `/wp-content/uploads/`. Key renders: `2025/07/TDM-EXTERIOR-FROM-PULL-scaled.jpg`, `TDM-PENTHOUSE-LIVING-003-SMALL-scaled.jpg`, `2025/01/049discover.png` (pool terrace), `2024/06/DoradoWaterfalls1.png`, `2024/07/NAGUABO-003.jpg`, `n03--scaled.jpg`, `R_006.jpg`, `2025/01/05theplace-1.png` (beach). Download them into `assets-source/images/client/` (gitignored), optimise with a `sharp` script into `public/images/` with blur placeholders and a JSON manifest. Several lifestyle photos on the live site are stock (one file is literally `iStock-…`): use them, but list them in `CONTENT-TODO.md` for licence confirmation. Any free-licence placeholder you add must have its source and licence recorded there too.

**Hero film:** the client's brand film is on YouTube: id `HkIPZ9pGezA` ("Live Beyond Limits | ORA World Puerto Rico", channel @ORAworldpr). Store the id in the CMS (`siteSettings.filmYoutubeId`). Requirements, all learned on the first build:

- Show the poster render instantly; mount the player after first paint; fade the poster out **only when the player reports state 1 (playing)** via the IFrame API `postMessage` handshake (`{"event":"listening"}`, then read `infoDelivery`). If YouTube is blocked, the poster simply stays.
- Embed `https://www.youtube-nocookie.com/embed/{id}?autoplay=1&mute=1&loop=1&playlist={id}&controls=0&playsinline=1&rel=0&modestbranding=1&disablekb=1&iv_load_policy=3&fs=0&enablejsapi=1&origin={origin}`.
- **Captions:** YouTube turns on auto captions for viewers whose account prefers them, and `cc_load_policy` is not reliable. Send `unloadModule` for `captions` and `cc` and `setOption("captions","track",{})` on `onReady` and on first play, repeating every second for the first 20 seconds.
- **Player chrome:** the title bar and "Watch on YouTube" appear for the first seconds even with `controls=0`. Size the 16:9 frame to `calc(max(100vw, 177.78vh) * 1.3)` by `calc(max(100vh, 56.25vw) * 1.3)`, centred, inside an `overflow: hidden` container, so the chrome falls outside the visible area. `pointer-events: none`, `aria-hidden`, `tabIndex=-1`.
- "Watch the film" opens a lightbox that plays the same video with sound and controls.
- Poster only under `prefers-reduced-motion` or Save-Data. If a self-hosted MP4 is supplied later (`assets-source/hero-video.mp4`), an ffmpeg script transcodes it (1080p and 720p MP4, WebM, a 16-second seamless loop, poster frames) and the self-hosted file takes over from YouTube automatically.

## 2. Design system: "Adoquín" (the Old San Juan salon)

### Concept

Puerto Rican heritage made couture: the arcades of Old San Juan, limewash plaster walls, hand-painted azulejo tile, and the blue **adoquines**, the cobblestones of the old city. Pair them with the film's stone portal and the warm light of Dorado. Generous, sunlit, unhurried. References to study, never copy: Belmond and Aman journals, Mediterranean and Caribbean colonial architecture, mid-century hotel graphics.

### Palette (contrast already measured)

| Token          | Hex       | Role                                                    | Contrast                          |
| -------------- | --------- | ------------------------------------------------------- | --------------------------------- |
| `--plaster`    | `#FAF7F3` | Main ground: cool limewash white                        | n/a                               |
| `--rose`       | `#EED8CF` | Sun-faded rose limewash colour field                    | n/a                               |
| `--cobalt`     | `#1D3B8C` | Azulejo cobalt: colour fields, primary accent on light  | 9.6:1 on plaster, 7.5:1 on rose   |
| `--adoquin`    | `#55657F` | Cobblestone blue-grey: secondary text, rules, map water | 5.5:1 on plaster                  |
| `--ink`        | `#18203A` | Text                                                    | 15.1:1 on plaster, 11.8:1 on rose |
| `--ink-muted`  | `#4A5168` | Secondary text                                          | 7.4:1 on plaster, 5.8:1 on rose   |
| `--gold-ink`   | `#7D5F22` | Gold for small text, on plaster only                    | 5.6:1 on plaster                  |
| `--gold`       | `#B08A3E` | Gilded hairlines, numerals 32px and above               | 3.0:1, large only                 |
| `--gold-light` | `#E2C27E` | Gold on cobalt                                          | 6.0:1 on cobalt                   |
| `--white`      | `#FFFFFF` | Text on cobalt                                          | 10.2:1                            |

Rules: small text on rose uses ink or cobalt, never gold-ink (4.35:1). White and gold-light only on cobalt. Light-first (`color-scheme: light`). No gradients except a soft scrim on full-bleed images.

### Typography

- **Display: Instrument Serif, regular and italic.** Tall, condensed, editorial. Set large (up to 160px on desktop) with tight leading (0.9). Headlines are lowercase-first where it reads naturally ("beyond _expectations_"). The accent word (`*word*` in CMS headlines) is the italic.
- **Body: Hanken Grotesk 400 and 500**, 17px, line-height 1.6, measure 60 to 66 characters.
- **Labels: Hanken Grotesk 500 in true small caps** (`font-variant-caps: all-small-caps`, tracking 0.08em), never shouty uppercase eyebrows.
- Stats and prices in Instrument Serif oldstyle figures; tables and forms in Hanken tabular lining figures.
- Fluid scale (390 to 1440px): display-xl 56 to 160px, display-l 40 to 96px, display-m 30 to 56px, display-s 22 to 30px, body 16 to 17px, label 13px small caps.

### Layout grammar: arcades and colour fields

- **Arches.** The key image of each section sits in an arch (an SVG `clipPath` with a semicircular top), echoing the arcades of Calle Fortaleza and the film's stone portal. At most one arched image per section; the rest are straight-edged.
- **Colour-field scrolling.** The page ground moves between plaster, rose and cobalt as sections enter, by interpolating the `--bg` and `--fg` tokens on `main` over 30vh with ScrollTrigger. Sequence: plaster (hero) → rose (manifesto) → plaster → cobalt (resilience) → plaster → rose (family) → plaster → cobalt (presentation).
- **Azulejo ornament.** Draw one original eight-fold tile motif as an inline SVG in cobalt line work. Use it at most three times on the homepage: a single-tile divider between chapters, the map pin, and a 4% watermark behind the final form. Never a full-page pattern.
- **Asymmetric two-column rhythm** with wide gutters; images bleed off one edge, text sits in five columns. Radius 0 except arches and the floating pill. No shadows.
- Spacing scale 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192px; sections 96px on mobile, 160 to 200px on desktop.

### Signature motion: the arcade

One orchestrated moment, then calm.

1. **Hero:** split composition. The headline sits on the left on plaster. On the right the YouTube film plays inside a tall arch (70vh). **Scroll, pinned 100vh:** the arch widens and its crown flattens until the film fills the screen, while the headline slides left and fades; then the tagline and CTAs settle over a soft bottom scrim. On mobile the arch sits under the headline at full width and widens to full screen.
2. **Section transitions** are the colour fields.
3. **Image reveals:** the arch or frame stays still while the image rises 8% inside it (1.1s, `cubic-bezier(0.22, 1, 0.36, 1)`). No wipes.
4. **Page transitions:** a cobalt field rises and falls (600ms) with the azulejo tile at its centre.
5. **Preloader** (first visit only, under 1.5s): the azulejo tile draws itself in cobalt, rotates a quarter turn and resolves into the wordmark.
6. Timing overall: 700 to 1000ms, soft ease-out. No bounce.
7. **Reduced motion:** the arch shows full width, colours switch without interpolation, no pinning, no transitions.

### Persistent elements

- **Header:** the classic hotel arrangement. Wordmark centred; navigation split left (Residences, Amenities, Location) and right (Log In, EN | ES, Inquire, Menu). Transparent over the hero, plaster after 40px, hides on scroll down and returns on scroll up.
- **Menu:** a full-screen cobalt field. Large Instrument Serif links in white with italic hover; an arched image on the right changes per link; secondary links in small caps; contact and the azulejo tile at the foot. Focus trap, Escape to close.
- **Floating bar:** a rose pill with Call · Get Pricing · WhatsApp, full-width on mobile after the hero, bottom-right on desktop.
- **Footer:** plaster, a cobalt band with the newsletter, nav columns in Hanken, contact in small caps, language toggle, the legal notice in 11px Hanken, Equal Housing Opportunity, sponsor line.

## 3. Homepage, section by section

1. **Hero:** the arcade film; small-caps eyebrow "Dorado · Puerto Rico"; headline "beyond _expectations_"; tagline; CTAs "Request a private presentation" (cobalt underline) and "Watch the film". Below the fold, four stats with Instrument Serif oldstyle figures and small-caps labels: 10 acres · 129 residences · 42 hotel suites · 65,500 sq ft of amenities, labelled "Tesoro Del Mar".
2. **Manifesto (rose):** the mission in display-l Instrument Serif italic, a centred column of 18 characters, one azulejo tile above it, a small-caps signature line.
3. **The Place (plaster):** a horizontal "promenade" rail of five arched portraits (beach, rainforest, sea, table, horizon) with gold oldstyle numbers and one sentence each, drag on touch, pinned horizontal scroll on desktop.
4. **Residences (plaster):** each collection as an alternating pair: an arched or straight image on one side, an editorial text block with bedrooms, interior size and from-price (or "Details to be confirmed", "Pricing on request") on the other.
5. **Resilient By Design (cobalt):** white text and gold-light rules; the tower as a gold-light line drawing that strokes itself in; the confirmed features in two columns.
6. **Family-Centered Living and Happy Homes For All (rose):** people and pets, warm portrait crops, one arched.
7. **Amenities (plaster):** category tabs as small-caps words separated by gold dots; a three-column staggered mosaic with one arched hero tile; re-flow with a FLIP animation.
8. **A Prosperous Environment (plaster):** typographic, the tax disclaimer in small caps.
9. **Location:** the map restyled: plaster land, adoquín water, cobalt roads, the azulejo tile as the site pin, at least 24px markers; the proximity list with gold oldstyle minutes, flagged "approx." until confirmed.
10. **Virtual tour:** an arched poster with a cobalt play disc.
11. **The Collaboratory:** portrait cards with arched tops and italic pull quotes; "to be announced" where unconfirmed; ORA World / TRPbuildco LLC as developer.
12. **Press:** a slow marquee of italic headlines.
13. **Private presentation (cobalt):** the full lead form with white underline fields, gold-light focus, the azulejo watermark.
14. **Footer.**

## 4. Inner pages

- **Page hero:** headline left in Instrument Serif with the italic accent word, an arched image right; when a page has no image, a rose or cobalt colour field instead.
- **Floor plans** sit on plaster with cobalt line work; specs in Hanken tabular figures; the keyplan with the unit filled in rose and outlined in cobalt.
- **Gallery:** masonry mixing arched and straight frames (every fourth item arched); lightbox on cobalt with italic captions.
- **FAQ:** small-caps topic labels, Instrument Serif questions, generous accordions.
- Every inner page keeps the colour-field rhythm, the arches and the calm.

## 5. Tech stack (required)

- **Next.js 16** (App Router, TypeScript strict, Turbopack). Next 16 renamed middleware: use `src/proxy.ts`.
- **Sanity** with an embedded Studio at `/studio`, Presentation tool and draft mode, Vision.
- **Tailwind CSS v4** with a CSS-variable token layer (`@theme inline`) for palette, type scale, spacing and motion.
- **GSAP** (ScrollTrigger, Flip) and **Lenis** smooth scroll (off for touch and reduced motion).
- **next-intl** for **English and Spanish** with `/en` and `/es` routes, localized metadata and localized CMS fields (`{ en, es }` objects, both required).
- **MapLibre GL** with keyless OpenFreeMap tiles, restyled at runtime to the palette; an optional Mapbox token can swap the tile source.
- **React Hook Form + Zod** on client and server.
- **Vercel** hosting (TTR staging project, never the client's hosting). Staging sends `X-Robots-Tag: noindex, nofollow` and `robots.txt` disallows everything; production flips both with one env var.
- ESLint, Prettier (with the Tailwind plugin), Playwright with `@axe-core/playwright`, Lighthouse via a script.

**Environment variables.** Put every key in `.env.example`. **Prefix the Sanity variables with the project name** (for example `NEXT_PUBLIC_{PROJECT}_SANITY_PROJECT_ID`, `{PROJECT}_SANITY_WRITE_TOKEN`): the TTR build environment already defines `NEXT_PUBLIC_SANITY_*` for the agency's own website, and this site must never read or write that content. Without a Sanity project id the site must render fully from a typed local seed (`src/content/seed/`) that has exactly the same shapes as the GROQ projections, so staging works before the CMS is populated. Also: site env (`staging`/`production`), site URL, portal (Log In) URL, map token (optional), site latitude/longitude, phone, WhatsApp, email, CRM webhook URL and secret, Turnstile keys, Resend key and `EMAIL_ENABLED`, Upstash Redis (optional rate limiting), GTM and GA4 ids. Never hard-code secrets.

## 6. Site map

```
/[locale]
  /                       Home
  /residences             Collections + portfolio
  /residences/[slug]      Collection detail (finishes, plans in this collection, request pricing)
  /floor-plans            Filterable plan library (gated details)
  /floor-plans/[slug]     Single plan (gated)
  /floor-plans/compare    Shortlist comparison
  /amenities              Amenity groups (wellness, family, pets, resort, eco)
  /lifestyle              Activities, family-centered living, pets
  /tesoro-del-mar         Project page
  /projects/[slug]        Other projects (Dorado Waterfalls first)
  /location               The Place + interactive map + proximity
  /resilience             Resilient By Design
  /incentives             A Prosperous Environment (Act 60 explainer)
  /gallery                Masonry gallery + lightbox
  /virtual-tour           360°/VR embed + walkthrough film
  /the-team               Developer, architects, designers, partners
  /investment             Pricing overview (gated), deposits and timeline, payment estimator
  /press  /press/[slug]   Press Center + media kit
  /brokers                Co-op information, broker registration, broker kit
  /contact                Contact + private appointment booking
  /hotel-development  /careers  /faq  /privacy  /terms  /accessibility  /legal-disclaimer
/studio                   Sanity Studio
```

Keep the header "Log In" link pointing to `NEXT_PUBLIC_PORTAL_URL`.

## 7. Features (all required)

- **Floor plan library:** filter by collection, bedrooms, size range, orientation and building; grid and list views; plan pages with a zoomable plan (wheel, pinch, drag, buttons), specs table, keyplan with the unit highlighted, PDF download, "Request pricing for this plan". Full detail sits behind a **one-step registration gate** (name, email, phone, consent) remembered by cookie for a year, so a visitor registers once for plans, pricing and brochure. While the gate decides, render the blurred preview, not an empty box, so the LCP image paints once.
- **Shortlist and compare:** heart up to three plans (localStorage), a compare bar, a side-by-side table.
- **Gallery:** masonry with category filters (Exteriors, Interiors, Amenities, Lifestyle, Construction), full-screen lightbox with swipe, arrow keys, captions and the rendering label.
- **Brochure:** gated in-browser viewer with page turns plus PDF download (placeholder spreads until the PDF exists).
- **Virtual tour:** click-to-load Kuula embed in a full-screen modal; walkthrough film below.
- **Booking:** Calendly or Cal.com embed (URL from CMS), lazy-loaded, styled to the palette, with a request form fallback when no URL is set.
- **Investment:** deposit and timeline stepper (all placeholders until the offering plan is filed, with the "no deposits can be accepted" notice), pricing by collection behind the gate, and a payment estimator with an "estimate only" disclaimer.
- **FAQ:** searchable, grouped by topic, with FAQPage JSON-LD. Seed it from the confirmed facts and the Act 60 explainer.
- **Press Center:** list, article pages, media kit download.
- **Brokers:** co-op copy (placeholder), broker registration form, broker kit.
- **Newsletter** in the footer; a soft **exit-intent** brochure offer (desktop only, once per session, never in the first 20 seconds, dismissible).
- **WhatsApp click-to-chat and click-to-call** in the floating bar, footer and contact page; both hide automatically while no number is configured.
- **Bilingual EN/ES** for every page, menu, form, error, metadata and CMS document; language toggle in header, menu and footer; the choice is remembered.
- **Accessibility statement** page and a skip-to-content link.

## 8. Lead capture and CRM hooks

- One lead form component with variants: **short** (name, email, phone), **full** (plus buyer/broker, preferred residence, budget range, timeline, how did you hear about us, message), **broker** (plus brokerage, licence number) and **gate**.
- Zod validation on both sides; honeypot field (a filled honeypot gets a silent success); Cloudflare Turnstile when keys exist; rate limiting (Upstash when configured, in-memory fallback).
- A first-touch attribution cookie set in `proxy.ts`: UTM parameters, gclid, gbraid, wbraid, fbclid, referrer, landing page, timestamp. Attach it, the locale and the source page or plan to every submission.
- `POST /api/lead`: (1) POST JSON to `CRM_WEBHOOK_URL` with an `X-…-Secret` header and an 8-second timeout, (2) save a read-only `lead` document in Sanity with the CRM status, (3) send a bilingual confirmation email through Resend behind `EMAIL_ENABLED`. Never block the visitor on (2) or (3).
- Success is an in-page panel with next steps and "Book a presentation", never an alert. Fire analytics events on start and submit.
- Consent checkbox with TCPA-style text consent wording, editable in the CMS.
- Lazy-load the form libraries with the form section (`next/dynamic`, `ssr: false`, a sized skeleton) so they stay out of the initial bundle.

## 9. Sanity CMS

Documents: `siteSettings` (contact, social, phone, WhatsApp, film YouTube id, film file, brochure file and pages, broker kit, media kit, legal notice, rendering notice, sponsor, consent text, portal and booking and VR URLs, menu imagery, site coordinates), `homePage` (ordered sections with "show section" toggles), `project`, `collection`, `floorPlan` (specs, images, PDF, keyplan and unit position, orientation, status available/reserved/sold), `amenity`, `galleryImage`, `teamMember`, `pointOfInterest` (category, coordinates, drive and walk minutes, placeholder flag), `faq`, `pressArticle`, `investmentStep`, `incentive`, `page` (generic sections), `lead` (read-only), `redirect`.

Objects: `localeString`, `localeText`, `localeParagraphs`, `figure` (image with required localized alt text, caption, "artist's conceptual rendering" flag, "placeholder" flag, credit), `stat`, `fact`, `contentSection`, `seo`.

Desk structure grouped Site · Pages · Residences · Media · Location · Press · Leads, singletons for settings and homepage, field descriptions and validation so a non-technical editor cannot break the layout. A `pnpm seed` script uploads images and pushes the typed seed into the dataset with stable ids. A webhook route revalidates on publish. One headline convention: wrap one word in `*asterisks*` for the accent treatment.

## 10. Performance, SEO, accessibility (non-negotiable)

- **Lighthouse mobile:** Performance 90 or better, Accessibility 100, Best Practices 100, SEO 100 on a production build. LCP under 2.5 s, CLS under 0.05 (aim for 0), INP under 200 ms.
- `next/image` with AVIF/WebP, correct `sizes`, blur placeholders, `priority` plus `fetchPriority="high"` on each page's LCP image. Fonts through `next/font` with `display: swap` and size-adjusted fallbacks, Latin and Latin Extended subsets for Spanish.
- Code-split heavy libraries. **Load the map only when its section is near the viewport and the visitor has interacted** (scroll, pointer, key) or after a 6-second idle fallback; on the first build eager map loading cost 3 seconds of main-thread time.
- **Reveal animations must never leave content invisible.** Use IntersectionObserver (not ScrollTrigger enter callbacks) to start reveals, with a 2.5-second safety net that shows anything already in the viewport. **Never pre-hide with `clip-path`**: Chromium uses the clipped box for intersection, so a fully clipped element never intersects and stays hidden forever. Pre-hide with opacity only, set the clip start state in JavaScript at reveal time, then clear the inline styles when the tween ends. Test a fast scroll to the bottom and back up on every page.
- Read `useSearchParams` only inside a Suspense boundary or after mount, or static prerendering fails.
- SEO: localized titles and descriptions from CMS, dynamic Open Graph images in the brand style, `hreflang` pairs with x-default, XML sitemap with alternates, canonical URLs, JSON-LD for Organization, BreadcrumbList, FAQPage, NewsArticle.
- **WCAG 2.2 AA:** semantic landmarks, visible focus in the brand accent, full keyboard support (menu, lightbox, carousels, accordions, map, gate), focus trap and Escape in every modal, `role="dialog"` only while a dialog is open, alt text required in the CMS, target sizes at least 24px (map markers included), descriptive link text (add visually hidden context to "Learn more"), captions for the film lightbox where available.
- Analytics: GTM and GA4 loaded only after consent, Consent Mode v2 defaults to denied, a bilingual consent banner that is a slim bar on mobile and a small card on desktop, never covering more than a fifth of a phone screen. Events: form_start, form_submit, plan_view, gate_unlock, brochure_download, whatsapp_click, call_click, booking_click, film_play, tour_open, newsletter_subscribe.
- Security headers with a CSP that allows only the origins in use: YouTube (`www.youtube-nocookie.com`, `www.youtube.com` in `frame-src`, `i.ytimg.com` in `img-src`), Kuula, Calendly or Cal.com, Turnstile, Sanity, OpenFreeMap or Mapbox, Google Tag Manager and Analytics.

## 11. How to work

Work autonomously through every phase without stopping for approval. Ask the user only for a decision that is hard to undo. Commit in small, descriptive commits per feature and push after each phase.

1. **Setup.** Create the new repository on GitHub (`ora-world-adoquin`, private, default branch `main`), clone it, and develop on a `develop` branch with a pull request to `main` per phase. Import it into Vercel as its own project.
2. **Discovery.** Read oraworld.com fully, capture the copy, download and optimise the imagery, and write `DESIGN.md` with the final token tables, type scale, layout grammar and motion principles from section 2, including a computed WCAG contrast table for every text and background pair you use.
3. **Foundation.** Next.js, Tailwind tokens, fonts, i18n, Sanity schemas and Studio, seed, data layer, header, menu, footer, floating bar, consent, page transitions, motion engine.
4. **Homepage.** Every section in section 3 with real or placeholder content and the signature motion.
5. **Inner pages and features.** Everything in sections 6 and 7.
6. **Lead capture, analytics, consent.** Section 8 plus the analytics in section 10.
7. **QA and launch on staging.** `pnpm typecheck`, `pnpm lint`, `pnpm build`; a Playwright suite at 1440 and 390 covering navigation, root redirect, language switch, menu focus and Escape, form validation and success panel, gate unlock remembered across pages, filters plus shortlist plus compare, lightbox keyboard navigation, film button, sitemap, robots, noindex and CSP headers; axe scans with zero serious or critical violations on ten key pages in both viewports; Lighthouse on the homepage and five inner pages; a fast-scroll visibility check on every page. Fix everything below target. Deploy to the Vercel staging project.
8. **Docs.** `README.md` (setup, env vars, scripts, deploy, CMS editing guide, QA scores) and `CONTENT-TODO.md` (every placeholder, missing asset, image licence to confirm, and open decision).

**Final report:** the staging URL, Lighthouse and test results in a table, desktop 1440 and mobile 390 screenshots of every homepage section and every inner page (save them under `reports/screenshots/`), and the open questions.

## 12. Rules

- Use only real content from oraworld.com. Never invent numbers, names, prices, dates or claims. Placeholders are labelled on the page and listed in `CONTENT-TODO.md`.
- No lorem ipsum. Placeholder copy reads as on-brand English and Spanish.
- No generic "AI look": no purple gradients, glassmorphism, emoji, icons in circles, rounded SaaS cards, three-equal-card rows, bounce easing, or default centred hero with two identical buttons.
- Only licensed imagery: the client's renders and film, or free-licence placeholders recorded with their licence.
- Mobile is designed, not shrunk: every section gets its own 390px composition.
- Respect `prefers-reduced-motion` everywhere: no smooth scroll, no pinning, no parallax, content visible immediately.
- If something is ambiguous, make the most premium reasonable choice, note it in `CONTENT-TODO.md`, and keep going.
