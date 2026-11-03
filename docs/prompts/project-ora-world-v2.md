# ORA World v2: build prompt

Build "ORA World v2", a second, fully revamped website for ORA World: luxury, eco-conscious residences in Dorado, Puerto Rico.

**Setup**

- Use a NEW private GitHub repository named `ora-world-v2`.
- Deploy it to its own Vercel project.
- Share no code with the existing ORA World site.

**What is new and what stays**

- Layout, page structure, navigation, components, typography and motion must be completely new. Do not reuse v1's editorial section stack.
- The colour palette and the official logos stay exactly the same as v1, so the brand is unmistakably ORA.
- Every fact and every required feature carries over.

**How to work**

- Work through every phase on your own, without stopping for approval.
- Ask me only about decisions that are hard to undo.

## 0. Why v2 exists (client feedback you must design against)

The client reviewed v1 and said the following. Treat each point as a hard requirement.

1. "Sections are very simple." Every section must be an interactive, data-driven module, never a block of heading, paragraph and image.
   - Inspiration for depth (not for look): https://www.yardvida.com/
     - scroll-driven step lists with a sticky visual
     - checklists that complete as you scroll
     - tabbed panels and comparison tables
     - numbered cards and an FAQ
     - a final call to action over an image
   - Each homepage module needs at least one thing the visitor can do: drag, tab, filter, toggle, hover a hotspot, or scroll to drive it.
2. "No image cutting from the top, especially the towers."
   - Every image carries a focal point (CSS object-position) in the CMS and in the seed.
   - Architecture renders are anchored near the top.
   - Frame aspect ratios suit the 16:9 renders (16:9, 16:10, 3:2, 4:3). Never put a tower render in a 21:9 strip.
   - Any parallax travel is clamped to the image's overscan.
3. "No blurry images."
   - No blur or LQIP placeholders anywhere. Images appear only when sharp, over a travertine ground.
   - Serve WebP only (AVIF encodes too slowly on first request); next/image quality 80.
   - Every `sizes` attribute matches the real rendered width.
   - Never place a source narrower than 1.5× its displayed CSS width.
4. "Use the correct logo and assets from oraworld.com." Use only the official 2026 logo and the client's own renders (section 3).
5. No walls of giant type.
   - Statement paragraphs are at most 30px.
   - Display headlines are at most three lines on desktop.
   - No section is only text.
6. No captions or player controls on the hero film (section 7).
7. Nothing unfinished is visible.
   - No empty portrait silhouettes.
   - No "headline to be supplied" strips.
   - No staging switcher pills.
   - A module whose content is still a placeholder stays hidden until the CMS has real content.
   - Unknown numbers inside real modules read "To be confirmed".

## 1. Brand: same colours, same logos

### Palette (identical to v1, WCAG-checked)

**Grounds and text**

| Token           | Hex     | Use                                             |
| --------------- | ------- | ----------------------------------------------- |
| bone            | #F7F3EC | page ground                                     |
| bone-deep       | #EFE9DF | alternate ground, card ground                   |
| travertine      | #E3D9C8 | surfaces, image ground while loading            |
| travertine-deep | #C9B99E | strong rules, disabled                          |
| sand            | #A39174 | decorative only, never text                     |
| basalt          | #1C1B19 | dark panels, footer                             |
| basalt-soft     | #242321 | dark cards                                      |
| charcoal        | #2A2825 | body text: 13.3:1 on bone, 10.5:1 on travertine |
| charcoal-soft   | #5A5650 | secondary text: 6.6:1 on bone                   |

**Accents**

| Token             | Hex               | Use                                                    |
| ----------------- | ----------------- | ------------------------------------------------------ |
| brass             | #A8864F           | hairlines, icons, numerals 32px+ only (3.07:1 on bone) |
| brass-ink         | #684D25           | small brass text, focus ring, links on light           |
| brass-light       | #D4B987           | accent text on basalt (9.1:1)                          |
| sea / sea-ink     | #3F7F98 / #2C6A82 | map water, map labels (sea-ink 5.4:1)                  |
| palm / palm-light | #4A5A3A / #9AA685 | eco and nature tags                                    |

Write a contrast table into DESIGN.md and test every pair you use.

### Logos

Download the official files and use nothing else:

- Primary lockup (gold tree of life with ORA WORLD · PUERTO RICO): https://www.oraworld.com/wp-content/uploads/2026/04/ORA-WORLD-logo-scaled.png
  - Trim it.
  - Export gold-on-transparent PNG and WebP at 1200px wide.
- White lockup for imagery and dark panels: https://www.oraworld.com/wp-content/uploads/2026/04/ora_world_white_transparent.svg
- Favicon and app icon: https://www.oraworld.com/wp-content/uploads/2025/01/ORA-WORLD-favicon.png

Rules:

- Never redraw, recolour or retype the logo.
- Keep clear space equal to the tree's height.
- Minimum 44px tall in the header and 96px in the footer.

### Typography (new for v2)

- Display: Fraunces, variable. Use opsz 72–144, weight 300–400, with SOFT 50 for the warm "wonk" italics on accent words.
- UI and body: Plus Jakarta Sans 400/500/600, 16–17px, line-height 1.6.
- Numerals: Fraunces lining figures for stats; Plus Jakarta tabular figures for tables and forms.
- No Didone faces, no all-caps tracked eyebrows with rules (that was v1's signature). Labels are sentence case, 13px, 600 weight, in brass-ink.

### Shape language (new for v2)

- Soft, product-like luxury: 20–28px radius cards and media frames, pill buttons and chips, generous 8px-grid spacing.
- Subtle elevation on hover only (0 24px 48px -24px rgba(28,27,25,.25)).
- Bone page ground with a 12px inner gutter "frame". Content sits in rounded panels that alternate bone-deep, travertine and basalt.
- One ornament only: a fine brass hairline that draws under the active tab, step or chip.

## 2. Structure (completely new)

### Navigation

- A floating pill bar, centred at the top, 12px from the edge, glass over imagery (bone at 80% opacity with blur) and solid bone over content.
  - Left: the logo.
  - Centre: Residences · Living · Place · Invest · Portfolio.
  - Right: EN | ES and a brass "Book a visit" pill.
- On scroll down the pill compacts to logo, a menu icon and "Book a visit".
- Mobile: a bottom sheet menu with large rounded tiles, each with a small render, plus contact and language at the foot.
- A persistent bottom-right "Ask ORA" pill opens a slide-over with three tabs:
  - Quick questions (the FAQ, searchable)
  - Call / WhatsApp (hidden until numbers exist)
  - Book a visit

### URL map (under /en and /es)

```
/                          Home (modular, see section 4)
/residences                Residence explorer (tower stack + collections)
/residences/[collection]   Collection
/residences/plans          Floor plan library (gated detail)
/residences/plans/[plan]   Plan (gated)
/residences/compare        Compare up to 3
/living                    Amenities, family, pets, wellness, activities
/place                     Dorado + island map, Tesoro Del Mar, Dorado Waterfalls
/place/[project]           Project
/place/gallery             Gallery
/place/tour                VR tour + film
/invest                    Act 60, deposit steps, estimator, resilience (as assurance)
/portfolio                 The 12 locations
/visit                     Book a visit (booking + lead form) and contact
/brokers  /press  /press/[slug]  /careers  /hotel-development  /faq
/privacy  /terms  /accessibility  /legal-disclaimer
/studio                    Sanity Studio
```

## 3. Content (never invent facts)

Read every page of https://www.oraworld.com and save plain-text copies in docs/source/. Pages: /, /our-residences/, /our-amenities/, /activities/, /tesoro-del-mar/, /dorado-waterfalls/, /tax-incentive/, /contact-us/. Every factual statement must trace to that content.

### Confirmed facts

**Positioning**

- "Beyond expectations." "Thoughtfully crafted communities where longevity, luxury, and nature exist in perfect harmony."
- Mission: luxurious, eco-friendly developments that blend modern elegance with the island's natural beauty, with exceptional quality, innovative design and unparalleled comfort, contributing to the island's culture and economy.

**Tesoro Del Mar (Dorado, Vega Alta, PR 00692)**

- Scale: 10 acres; 335,995 sq ft of land; 129 contemporary apartments; 42 hotel suites; 65,500 sq ft of amenities.
- Setting: walking distance to Balneario Cerro Gordo Beach; 30 minutes from the airport; near a national park.
- On site: clubhouse and boutique hotel; tennis and basketball courts; fitness center; jogging paths; playgrounds; sensory gardens.
- Architecture inspired by the flight of birds: curved facades, cantilevered terraces "like wings", reflecting pools and cascades.
- Interiors: open-concept layouts, floor-to-ceiling windows, stone, wood and brushed metals.

**Dorado Waterfalls:** use the facts on its page.

**Portfolio (12):** Tesoro Del Mar, Dorado Waterfalls, The Top, Dorado Ocean View Estates, Naguabo, Loíza River City, Loíza Ocean, Loíza Countryside Estates, Guayama, Costa del Este Ceiba, AquaMaria, To Be Revealed. Use each location's tagline exactly as published.

**Resilience (9 features)**

- Category 5 hurricane design; seismic resilience; 24/7 security; smart security systems.
- Backup power (generators plus solar and battery); flood and stormwater management.
- Private safe rooms; emergency preparedness; community resilience training.

**Family, pets, amenities, activities:** as published.

**Other published material**

- The Act 60 explainer.
- The VR tour: https://kuula.co/share/collection/7Zt7D
- The contact form fields.

**Legal notice:** verbatim in every footer: "This advertisement is not an offering. It is a solicitation of interest in the advertised property. No offering of the advertised units can be made and no deposits can be accepted, or reservations, binding or non - binding, can be made until an offering plan is filed with the New York State Department of Law. This advertisement is made pursuant to Cooperative Policy Statement No. 1, issued by the New York State Department of Law. Attorney General File No.: CP25-0047. Sponsor: TRPbuildco LLC Sponsor's Address: Tesoro Del Mar Dorado, Vega Alta, Puerto Rico 00692", followed by "All images on this page are artist renderings."

### Unknown

Show "To be confirmed" inside real modules, and list every item in CONTENT-TODO.md:

- prices, unit mix, sizes, real floor plans, delivery dates
- architect and designer names, press
- phone, WhatsApp, email, sales gallery address and hours
- deposit schedule, broker terms, brochure

No lorem ipsum, no bracket codes, no invented testimonials, ratings or awards.

Write new headlines in English and native Spanish; do not reuse v1's headlines. Copy under each headline must be factual.

### Images: the client's renders only

Download from https://www.oraworld.com/wp-content/uploads/ and process with sharp into public/images. No blur placeholders. Write a manifest with width, height and focal point.

**Tesoro Del Mar** (folder 2025/07): TDM-EXTERIOR-FROM-PULL, TDM-EXTERIOR-FROM-ROAD, TDM-EXTERIOR-FROM-GOLF, TDM-AERIAL-001…004, TDM-FOYER-001/002/004/005, TDM-APT-1403 (living rooms 003/004, master bedroom, bedroom 2, master bathrooms 001/002, study), TDM-HOTEL-210-BEDROOM-001, TDM-PENTHOUSE-LIVING-001/002/003. All end in "-SMALL-scaled.jpg" or "-scaled.jpg"; find the exact URLs in the page HTML.

**Dorado Waterfalls:** DoradoWaterfalls1 and 2/3/4, plus the interior renders on its page.

**Portfolio** (2024/07): TheTop1.png, Naguabo2.png, LoizaOcean1.png, LoizaRiverCity1.png, LoizaCountryside2.png, CEIBA-001.png, GUAYAMA-50.jpg.

**Lifestyle photography** from the live site: list it in CONTENT-TODO.md for licence confirmation; one file is an iStock image.

**Focal points:** set them per image. Tower exteriors 50% 10–20%; aerials 50% 40%; interiors center.

## 4. Homepage: modular, interactive, in this order

Each module is a rounded panel with its own interaction. No two modules share a layout.

1. **Hero: split stage.**
   - Left, a basalt panel:
     - Fraunces headline (new), one factual line, "Book a visit" and "Watch the film".
     - A row of four stat chips: 10 acres · 129 residences · 42 hotel suites · 65,500 sq ft of amenities, labelled Tesoro Del Mar.
   - Right, the film in a 24px-radius 16:10 frame (not full-bleed).
   - Under the frame, four render thumbnails (Arrival, Foyer, Residence, Penthouse). Clicking one pauses the film's frame and shows that render with a crossfade; "Resume film" returns to it.
   - Mobile: the film frame first, the panel below.
2. **Tesoro Del Mar in numbers: bento grid.** Mixed card sizes:
   - an aerial render card
   - counter cards for land area, apartments, hotel suites and amenities
   - a "walking distance to Balneario Cerro Gordo" card with a beach photo
   - a "30 minutes from the airport" card with a mini route line
   - a "near a national park" card
   - Counters animate once.
3. **Residence explorer.**
   - An SVG tower stack (stylised floors of the curved tower). Hovering or tapping a band highlights a collection: Residences, Villas, Penthouses, Hotel suites.
   - A side card shows the render, three features as a checklist, and specs (bedrooms, size, from-price, each "To be confirmed" if unknown).
   - Filter chips: bedrooms, view.
   - "View plans" goes to the gated library.
   - State the floor mapping is illustrative until the client confirms it.
4. **Room by room: hotspot tour.**
   - A large render carousel: foyer, living, master bedroom, bath, study, penthouse.
   - Pulsing hotspots open small cards that only describe what is published: stone, wood and brushed metals; floor-to-ceiling windows; open-concept layout; private terrace.
   - Drag or arrow keys move between rooms; a progress rail with room names.
5. **Built to endure: dial.**
   - Pinned on desktop. A circular dial of nine segments fills one by one as the nine feature cards scroll past, with a centre counter "6 / 9".
   - Each segment is labelled.
   - Mobile: a sticky progress bar.
   - This must look nothing like a v1 grid board.
6. **Living: filterable bento.**
   - Category chips (wellness, family, pets, resort, eco, each with a count). Rounded image tiles reflow with a FLIP animation.
   - Tapping a tile opens a sheet with the description.
   - Includes a Family | Pets toggle card listing the published family and pet amenities.
7. **The island: drag rail plus proximity list.**
   - Horizontally draggable place cards: shore, El Yunque, bioluminescent bays, Old San Juan, golf, culinary.
   - Beside them, a proximity list with drive times. The site-to-airport time is confirmed; mark all others approximate.
   - "Open the map" lazy-loads MapLibre with OpenFreeMap tiles restyled to the palette.
8. **Two projects, side by side: comparison table.**
   - Tesoro Del Mar vs Dorado Waterfalls: location, scale, residences, hotel, amenities, distance facts.
   - A check where a fact applies; "To be confirmed" where unknown. Sticky first column on mobile.
9. **Invest with clarity.**
   - A three-question Act 60 orientation:
     - Are you relocating?
     - Do you run a business serving clients outside Puerto Rico?
     - Do you plan to buy a primary residence?
   - It ends with the relevant published explainer sections and "Talk to an advisor". Never tell anyone they qualify.
   - Beside it, the deposit stepper (placeholders plus the offering-plan notice) and the tax disclaimer.
10. **Portfolio: Puerto Rico map plus cards.**
    - A stylised SVG island with pins only for locations whose municipality is in the published name or tagline (Dorado, Naguabo, Loíza, Ceiba, Guayama, San Juan for AquaMaria). The others stay unpinned in the list.
    - 12 rounded render cards. "Explore" where a page exists, "Coming soon" otherwise.
    - A dark "To be revealed" card.
11. **FAQ: search plus two columns.** Search across all questions with topic chips; a 2-column accordion of eight. Add FAQPage JSON-LD.
12. **Book a visit: CTA over a render.**
    - A full-width rounded frame with the golf exterior render and a gradient.
    - A floating form card offering "Sales gallery" or "Video call", then the short lead form.
13. **Footer: basalt rounded panel.**
    - Contents: white logo, newsletter, five nav groups, language, legal notice at 11px, Equal Housing Opportunity, sponsor line.

## 5. Inner pages (same depth rule)

**Residences**

- Explorer.
- Collection pages: gallery with view toggle, features, finishes, specs table.
- Plan library: filters for collection, bedrooms, size, orientation and building; grid or list; zoomable plan; keyplan; PDF; request pricing.
- Full plan detail behind a one-step registration gate, remembered for a year. While the gate decides, show a clean locked card, not a blur.
- Shortlist of 3 and a compare page.

**Living:** category pages with bento grids, activities as tabs.

**Place:** project pages, each with a hero frame, facts bento, render carousel, location and gallery. Gallery is masonry with filters and a keyboard lightbox. Tour has a click-to-load Kuula modal plus the film lightbox.

**Invest:** Act 60 reader (tabs), deposit steps, payment estimator ("estimate only" note), resilience feature pages.

**Visit:** a booking journey:

1. choose gallery or video call
2. Calendly/Cal.com embed from the CMS, lazy-loaded (a request form when no URL is set)
3. details
4. a success panel with what happens next

**Brokers** with registration; **Press** (hidden from navigation until real articles exist); **Careers**; **Hotel development**; **FAQ** with search; **Legal pages**; **Accessibility statement**.

## 6. Motion

- Lenis smooth scroll on desktop only, off on touch and under reduced motion.
- GSAP plus ScrollTrigger for pinned modules: dial, hotspot rail, explorer.
- Card reveals: fade plus 16px rise, 600–900ms, cubic-bezier(0.22,1,0.36,1). Images scale from 1.04 to 1 inside their rounded frame.
- Page transitions: the incoming page's panel slides up 24px with a fade.
- No preloader longer than 1.2s; skip it on return visits.

**Hard lessons, follow exactly**

- Reveals use IntersectionObserver plus a 2.5s safety net. Pre-hide with opacity only, never clip-path: clipped elements never intersect and stay invisible.
- Parallax travel never exceeds the overscan.
- Read useSearchParams only after mount or inside Suspense.
- Under reduced motion: no pinning, no parallax, everything visible.

## 7. Hero film (YouTube id HkIPZ9pGezA; store the id in the CMS)

- Poster render first via next/image with priority.
- Mount the player only after window load plus an idle callback, so it never competes with hydration.
- Embed: `https://www.youtube-nocookie.com/embed/HkIPZ9pGezA?autoplay=1&mute=1&loop=1&playlist=HkIPZ9pGezA&controls=0&playsinline=1&rel=0&modestbranding=1&disablekb=1&iv_load_policy=3&fs=0&enablejsapi=1&origin={origin}`
- Fade the poster out only when the IFrame API reports playerState 1, via the postMessage "listening" handshake. If YouTube is blocked or unavailable, the poster stays.
- Captions off, because the video has burned-in text and the viewer's YouTube preference would otherwise add captions. On onReady and after play, send unloadModule("captions"), unloadModule("cc"), setOption("captions","track",{}) and mute, repeated every second for 20s.
- Hide the player chrome: oversize the iframe to 130% of the cover size inside the overflow-hidden rounded frame, with pointer-events none and aria-hidden.
- "Watch the film" opens a lightbox with sound and controls.
- Poster only under reduced motion or Save-Data.
- Support a self-hosted MP4/WebM loop field that replaces YouTube when set.

## 8. Tech

**Stack**

- Next.js 16 App Router, TypeScript strict.
- src/proxy.ts (not middleware) for locale routing, redirects and a first-touch attribution cookie (UTM, gclid, gbraid, wbraid, referrer, landing page).
- Tailwind v4 with CSS-variable tokens (the palette above).
- next-intl EN/ES with `localePrefix: "always"` and a remembered choice.
- GSAP plus Lenis, MapLibre GL, React Hook Form plus Zod.

**Sanity**

- Embedded Studio at /studio, with Presentation and draft mode.
- Prefix every env var with ORA2_ (NEXT_PUBLIC_ORA2_SANITY_PROJECT_ID and so on). The build environment already holds NEXT_PUBLIC_SANITY_* for an unrelated site; never read or write that project.
- The site must render fully from a typed local seed when no project id is set.
- Documents:
  - siteSettings (including filmYoutubeId), homePage (one object per module)
  - project, collection, floorPlan, amenity, activity, galleryImage, teamMember (shown only when not placeholder), pointOfInterest, faq, pressArticle (hidden until real), investmentStep, incentive, portfolioLocation, page
  - lead (read-only), redirect
- All fields are localized and both languages are required.
- Images require alt text plus a focal-point field and rendering and placeholder flags.
- A pnpm seed script.

**Leads**

- One form component with variants short, full, broker, gate, visit and quiz.
- Zod on client and server; a honeypot with silent success; Turnstile when keys exist; rate limiting (Upstash or in-memory).
- /api/lead posts to CRM_WEBHOOK_URL with the attribution data, saves a Sanity lead, and sends a Resend confirmation behind EMAIL_ENABLED.
- In-page success panel; lazy-load the form libraries.

**Privacy and security**

- Consent Mode v2; GTM/GA4 load only after consent.
- The consent bar is slim, never more than a fifth of a mobile screen.
- CSP allows youtube-nocookie.com and youtube.com (frame-src), i.ytimg.com (img-src), Kuula, the booking host, Turnstile, cdn.sanity.io, map tiles and GTM/GA.
- Staging sends X-Robots-Tag noindex unless NEXT_PUBLIC_SITE_ENV=production. No staging-only UI is visible on the page.

## 9. Targets

**Lighthouse** on a production build:

- Mobile: Performance 90+, Accessibility 100, Best Practices 100, SEO 100.
- Desktop: Performance 85+ (the YouTube player is the known cost; document it).
- CLS 0, LCP under 2.5s.

**Accessibility (WCAG 2.2 AA)**

- Every tab set uses roles plus arrow-key support.
- Hotspots are buttons with labels.
- Dial and progress states are announced politely.
- Focus is visible, modals trap focus, and targets are at least 24px.

**SEO**

- hreflang, sitemap, canonical URLs.
- Organization, Residence/Place, Breadcrumb and FAQPage JSON-LD.
- Dynamic OG images.

## 10. Process and report

**Phases**

1. Create the repo and the Vercel project.
2. Discovery: write DESIGN.md (palette, contrast table, type, shape language) and docs/STRUCTURE.md (the new sitemap and where every v1 content item now lives).
3. Foundation: tokens, logo, navigation pill, footer, seed, CMS.
4. Homepage modules 1–13.
5. Inner pages.
6. Leads, analytics, consent.
7. QA.

**QA**

- Typecheck, lint and build.
- Playwright at 1440 and 390:
  - nav pill, bottom sheet, language switch
  - every tab set by keyboard
  - hotspot tour, explorer, dial progress, Act 60 quiz
  - gate unlock remembered, compare, lightbox, booking flow, redirects, headers
- An image audit test that fails the build on any of these:
  - an image without a focal point
  - a rendered image whose natural width is below 1.5× its displayed width
  - any data:image blur placeholder in the HTML
- A fast-scroll visibility check on every page.
- axe with zero serious violations on twelve pages.
- Lighthouse on six pages.

**Finish**

- Commit per feature and push per phase.
- Write README.md and CONTENT-TODO.md.

**Final report**

- the staging URL
- a scores table
- screenshots of every homepage module and every page at 1440 and 390, saved in reports/screenshots/
- a v1 → v2 mapping of what changed
- open questions for the client
