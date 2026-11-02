# Project prompt: ORA World "Monolith"

> A complete, standalone brief for a **new, separate GitHub repository and Vercel project**. Paste everything below the line into Claude Code in an empty folder.

---

## 0. Your role and the bar

You are the design director and lead front-end architect at a studio that builds websites for the world's leading branded residences. You are building **ORA World Monolith**, the marketing website for ORA World's residences in Dorado, Puerto Rico. It must feel like a six-figure agency build: rational, silent, mineral, unmistakably expensive. It is presented the way an architect presents a building: as a **drawing set**.

This is one of two competing concepts the client will choose between. The other concept is warm, colourful and serif-led; yours is the opposite. If any part of your page could pass for a typical luxury real-estate template (serif headline with an italic word, cream background, gold buttons, three cards in a row), replace it.

Put the boldness in one place, the signature motion in section 2. Keep everything around it quiet and exact.

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

## 2. Design system: "Monolith" (mineral modernism)

### Concept

Source everything from the building itself: the vertical travertine fins, the bronze perforated lattice screens, the slim dark mullions, the monolithic stone portal over the pool, and the terrazzo floor seen in the client's film. The references are architectural monographs (Tadao Ando, Peter Zumthor), Swiss modernist catalogues and the restraint of brands like Aesop. Study, never copy.

### Palette (contrast already measured)

| Token           | Hex       | Role                                                     | Contrast                         |
| --------------- | --------- | -------------------------------------------------------- | -------------------------------- |
| `--stone`       | `#111613` | Page ground: green-black, like verde stone               | n/a                              |
| `--stone-2`     | `#1A211D` | Alternate dark band, panels, menu                        | n/a                              |
| `--chalk`       | `#ECE7DC` | Text on dark                                             | 14.8:1 on stone                  |
| `--chalk-muted` | `#A3AA9F` | Secondary text on dark                                   | 7.7:1 on stone, 6.9:1 on stone-2 |
| `--bronze`      | `#C49A5E` | Accent on dark: accent word, numerals, rules, focus ring | 7.1:1 on stone                   |
| `--verdigris`   | `#8FB5A2` | Rare secondary: map water and eco moments only           | 8.1:1 on stone                   |
| `--ground`      | `#E6E2D8` | Light "drawing paper" bands, at most two per page        | n/a                              |
| `--ink`         | `#111613` | Text on ground                                           | 14.1:1                           |
| `--ink-muted`   | `#4F5650` | Secondary text on ground                                 | 5.8:1                            |
| `--bronze-ink`  | `#7A5A2C` | Bronze for text on ground                                | 4.9:1                            |

Rules: `--bronze` on `--ground` is 2.0:1, so on light bands bronze is for hairlines and drawings only, never text. The site is dark-first (`color-scheme: dark`). No gradients except a bottom scrim on full-bleed images.

### Typography

- **Display: Archivo, variable, `wdth` 125 (expanded), weight 200 to 300, uppercase, tracking 0.04 to 0.08em.** Wide, light, engraved-feeling capitals. Never bold. Load through `next/font/google` with `axes: ["wdth"]`.
- **Body: Archivo at `wdth` 100, weight 400**, 16 to 17px, line-height 1.65, sentence case, measure 60 to 66 characters.
- **Utility: IBM Plex Mono 400** for sheet numbers, title blocks, specs, prices, coordinates, stat labels and form labels. Tabular numerals everywhere.
- **No italics anywhere.** The one-accent-word device (`*word*` in CMS headlines) renders as the word in `--bronze` at weight 300.
- Fluid scale (390 to 1440px): display-xl 44 to 112px, display-l 32 to 72px, display-m 24 to 40px, display-s 18 to 24px, body 16 to 17px, label 11px mono uppercase with 0.12em tracking.

### Layout grammar: the drawing set

- **Every homepage section is a sheet.** Each carries a title block (bottom-right on desktop, top on mobile): sheet number in mono, section title, `NTS` (not to scale) and a small north arrow. Sheet numbers follow the real order of the page: `A-001` Site, `A-002` Statement, `A-101` Residences, `S-201` Structure, `L-301` Amenities, `L-302` Family, `E-401` Incentives, `G-501` Location, `V-601` Tour, `T-701` Team, `P-801` Press, `C-901` Presentation.
- A 12-column grid drawn faintly as 1px lines at 6% opacity behind content on desktop. Content snaps to it. Text columns span 4 to 5 columns, imagery 7 to 8.
- **Spec tables replace cards.** Mono labels, hairline rows, tabular figures. Unknown values read "TO BE CONFIRMED".
- **Images** are full-bleed or sit in thin frames with **crop marks** at the four corners (short bronze lines), the way prints are marked for trimming.
- The site's approximate coordinates appear once, in the hero title block, from the env coordinates, labelled "approx." until the client confirms them.
- Radius 0 everywhere. No shadows. Spacing scale 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192px; sections 96px on mobile, 160 to 192px on desktop.

### Signature motion: fins and aperture

One orchestrated moment, then silence.

1. **On load,** after the poster paints, the hero is covered by 7 vertical stone fins (5 on mobile) with hairline gaps. They rotate open on their Y axis like louvres (900ms each, 60ms stagger, `cubic-bezier(0.76, 0, 0.24, 1)`), revealing the film.
2. **Scroll, first 120vh, pinned:** the word **BEYOND** in Archivo Expanded spans the full width with the film playing _inside the letterforms_ (an SVG `<mask>` of the text over the video container, or the video under a stone layer with the text knocked out). As you scroll, the word scales from its centre until the letter counters open into a full-screen film. Then the tagline and the two CTAs fade in over a bottom scrim.
3. **Elsewhere:** drawings stroke themselves in on scroll, spec rows slide 8px with a 40ms stagger, and images reveal with a **louvre wipe** (7 vertical strips opening), not a fade.
4. **Page transitions:** the fins close across the screen (500ms) and open on the new page.
5. **Preloader** (first visit only, under 1.5s): a single bronze line draws the building's elevation, then the fins open.
6. **Reduced motion:** fins start open, BEYOND sits static over the poster, no pinning, no transitions.

### Persistent elements

- **Header:** a thin title-block bar. Wordmark left; centre: current sheet number and title in mono, updating as you scroll; right: Log In, EN | ES, Inquire (bronze hairline), Menu. Transparent over the hero, `--stone-2` after 40px, hides on scroll down and returns on scroll up.
- **Menu:** a full-screen **drawing index**. Left: the sheet list (number, title) in Archivo Expanded; right: a simplified site plan in line work where the area linked to the hovered item fills with bronze. Secondary links and contact in mono below. Focus trap, Escape to close.
- **Floating bar:** a rectangular mono tab, Call · Get Pricing · WhatsApp, full-width on mobile after the hero, bottom-right on desktop.
- **Footer:** stone, the complete sheet index of the site, contact block in mono, newsletter, language toggle, the legal notice in 11px mono, Equal Housing Opportunity, sponsor line.
- **Cursor (desktop only):** over drawings and plans, a thin crosshair. Nowhere else.

## 3. Homepage, section by section

1. **A-001 Hero:** fins, then the BEYOND aperture over the YouTube film. Title block: "Dorado · Puerto Rico", coordinates (approx.), sheet number. CTAs: "Request private presentation" and "Watch the film". Under the fold, a mono spec strip: ACRES 10 · RESIDENCES 129 · HOTEL SUITES 42 · AMENITIES 65,500 SQ FT, labelled "Tesoro Del Mar".
2. **A-002 Statement:** the mission in display-m expanded caps on stone, at most 22 characters per line, the accent word in bronze.
3. **A-101 Residences:** collections as a spec table (name · bedrooms · interior · from price); empty values read "TO BE CONFIRMED". Hovering or focusing a row swaps a large crop-marked render beside it.
4. **S-201 Resilient By Design:** a line drawing of the tower that strokes itself in bronze on stone, with dimension lines and mono leader labels for hurricane glazing, seismic base, backup power and the secured perimeter; the confirmed features as a two-column mono list.
5. **L-301 Amenities:** a light `--ground` sheet. The five categories as a vertical index on the left; selecting one swaps a stacked set of three images on the right with the louvre wipe.
6. **L-302 Family and pets:** two narrow text columns, each with one tall crop-marked image.
7. **E-401 A Prosperous Environment:** text only, the tax disclaimer as a mono footnote.
8. **G-501 Location:** the map restyled: stone land, verdigris water, chalk roads, bronze site pin, chalk labels in Plex Mono, at least 24px markers; the proximity list as a mono table with drive and walk minutes, flagged "approx." until confirmed.
9. **V-601 Virtual tour:** one wide crop-marked frame and the label "OPEN 360° TOUR".
10. **T-701 The Collaboratory:** a credits table in the manner of a drawing set (Developer, Design architect, Interiors, Landscape), "to be announced" where unconfirmed, ORA World / TRPbuildco LLC as developer.
11. **P-801 Press:** a slow mono ticker of headlines.
12. **C-901 Private presentation:** the full lead form on a light sheet with mono labels and underline fields.
13. **Footer.**

## 4. Inner pages

- **Page hero:** no image by default. A title block layout: sheet number derived from the route, title in expanded caps, intro in a four-column text block, faint grid. Project pages may open with a full-bleed crop-marked render.
- **Floor plans** live naturally in this design: plan on `--ground` with crop marks and a crosshair cursor, specs in mono, keyplan as a small drawing with the unit filled in bronze.
- **Gallery:** strict masonry with hairline gutters; lightbox on stone with mono captions.
- **FAQ:** mono question numbers, Archivo answers, hairline accordions.
- Every inner page keeps the title-block header, the sheet logic and the same restraint.

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

1. **Setup.** Create the new repository on GitHub (`ora-world-monolith`, private, default branch `main`), clone it, and develop on a `develop` branch with a pull request to `main` per phase. Import it into Vercel as its own project.
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
