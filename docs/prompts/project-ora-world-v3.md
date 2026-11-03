# ORA World v3: build prompt

Build "ORA World v3", a third, fully revamped website for ORA World: luxury, eco-conscious residences in Dorado, Puerto Rico.

**Setup**

- Use a NEW private GitHub repository named `ora-world-v3`.
- Deploy it to its own Vercel project.
- Share no code with v1 or v2.

**What is new and what stays**

- The colour palette and the official logos stay exactly the same as v1 and v2.
- Everything else must be new and must not resemble either earlier version: layout system, page structure, navigation, components, typography and motion.
  - v1 was an editorial vertical stack of square-cornered sections with Bodoni headlines.
  - v2 is rounded, app-like bento panels with a floating pill nav.
  - v3 is neither.
- Every fact and every required feature carries over.

**How to work**

- Work through every phase on your own, without stopping for approval.
- Ask me only about decisions that are hard to undo.

## 0. The idea: "The Monograph"

v3 presents ORA World the way an architecture monograph presents a building: plates, drawings, schedules, specifications and an index. It is calm, precise and confident, and every page is interactive.

**The layout system is a split stage.**

- **Desktop:** the screen is permanently divided.
  - **Left half, "the stage":** fixed and full height. It holds one large visual (a render, the film, a drawing, the map, a diagram) that changes with a vertical mask wipe as the visitor reaches each chapter.
  - **Right half, "the page":** scrolls on bone. It is set on a strict 6-column Swiss grid with thin brass rules, figure numbers and captions.
  - **Far left edge:** a 48px index rail lists the chapter numbers (01–12), with a brass progress line.
- **Mobile:** the stage becomes a sticky frame at the top, 45vh when a chapter starts, shrinking smoothly to a 22vh strip as you read it. The page scrolls below it.

**Client feedback still applies as hard rules:**

1. Every chapter is interactive, never a heading, paragraph and image alone. Depth reference (for behaviour, not look): https://www.yardvida.com/
2. No image is cut from the top.
   - Every image has a focal point.
   - The stage fits the image: renders show with `object-fit: cover` and a focal point, and tower renders sit with their tops in frame.
   - The plate viewer shows the whole image uncropped.
3. No blurry images.
   - No blur or LQIP placeholders; images appear only when sharp, over travertine.
   - WebP only, quality 80, correct `sizes`.
   - No source below 1.5× its displayed width.
   - The stage (50vw by 100vh) needs 2400px sources: use the client's full-size renders.
   - Cover crops need more pixels than the frame's width. A 16:9 render in a portrait or full-height frame needs frame height × image aspect. Compute `sizes` from the image's aspect and the frame's aspect with a helper; never write a bare `100vw` on a cropped image. This was the cause of every "blurry" complaint on v1.
4. Only the official logo and the client's renders.
5. No walls of giant type.
   - Display is at most 64px on the page side.
   - Statements are at most 28px.
   - The largest type on the site is the cover title, at most 112px.
6. The film plays with no captions and no controls.
7. Nothing unfinished is visible.
   - Placeholder-only modules stay hidden.
   - Unknown values inside real modules read "To be confirmed".
   - No staging widgets.
   - No silhouette portraits: unnamed roles appear as a text list.
8. **Mobile must be as amazing as desktop.** The client rejected a v1 build whose mobile view was the desktop layout stacked. Design each chapter's phone choreography on its own terms:
   - a sticky stage that shrinks
   - swipe rails with a progress line and counter
   - pinned mini boards and story-style progress bars
   - tap targets of at least 44px
     Review every chapter at 390px before calling it done.
9. **Every chapter is a "wow" whether you are scrolling through it, looking at it, or resting on it.** Each needs a moment of motion or interaction that rewards attention, with no static resting state that reads as a template.
10. **No pop-ups.** No exit-intent modals, interstitials, timed overlays or newsletter pop-ups. The client asked for v1's exit-intent brochure modal to be removed. Offers live inside chapters.
11. **Do not reuse v1's signature moves.** Avoid its hero "curtain" sheet, expanding-frame interludes, brand-word marquee, "Discover. Choose. Arrive." shutter, resilience 3×3 board and walkthrough story bars. v3's signatures are the split stage, drawings, plates and schedules.

## 1. Brand

### Palette (identical to v1 and v2, WCAG-checked)

**Grounds and text**

| Token           | Hex     | v3 use                                                 |
| --------------- | ------- | ------------------------------------------------------ |
| bone            | #F7F3EC | the page                                               |
| bone-deep       | #EFE9DF | table stripes, hover rows                              |
| travertine      | #E3D9C8 | stage ground while loading, plate mounts               |
| travertine-deep | #C9B99E | grid rules, disabled                                   |
| sand            | #A39174 | drawing linework on bone (decorative only, never text) |
| basalt          | #1C1B19 | night chapters (resilience, colophon), stage overlays  |
| basalt-soft     | #242321 | dark rows                                              |
| charcoal        | #2A2825 | body text: 13.3:1 on bone                              |
| charcoal-soft   | #5A5650 | captions, secondary text: 6.6:1 on bone                |

**Accents**

| Token             | Hex               | v3 use                                       |
| ----------------- | ----------------- | -------------------------------------------- |
| brass             | #A8864F           | rules, progress lines, figure numerals 32px+ |
| brass-ink         | #684D25           | small accent text, links, focus ring         |
| brass-light       | #D4B987           | accent text and linework on basalt           |
| sea / sea-ink     | #3F7F98 / #2C6A82 | map water, map labels                        |
| palm / palm-light | #4A5A3A / #9AA685 | eco tags                                     |

Write the contrast table into DESIGN.md and test every pair you use.

### Logos

Download the official files and use nothing else:

- Primary gold lockup: https://www.oraworld.com/wp-content/uploads/2026/04/ORA-WORLD-logo-scaled.png
  - Trim it.
  - Export PNG and WebP at 1200px.
- White lockup: https://www.oraworld.com/wp-content/uploads/2026/04/ora_world_white_transparent.svg
- Favicon: https://www.oraworld.com/wp-content/uploads/2025/01/ORA-WORLD-favicon.png

Rules:

- Never redraw or recolour the logo.
- Clear space equals the tree's height.
- Minimum 40px tall in the corner mark and 120px on the cover and colophon.

### Typography (new for v3)

- Display: Cormorant Garamond 300/400 and italic. Light, classical, set large with generous leading. Used for chapter titles, the cover and figure numerals.
- Text and interface: Jost 400/500. Geometric and architectural. Body 16px with line-height 1.65.
- Captions and data: Jost 500, 12px, with letter-spacing 0.04em and tabular figures.
- Monograph conventions:
  - Figure labels read "Fig. 04 · Foyer, Tesoro Del Mar". Plate numbers read "Pl. 07".
  - Chapter numbers are large Cormorant numerals set in brass.
  - Footnote markers are superscript numbers linking to the chapter's notes.
- No tracked all-caps eyebrows with rules (v1), and no Fraunces or rounded chips (v2).

### Shape language (new for v3)

- Square corners throughout, but unlike v1 everything sits on a visible grid. Hairline rules: 1px travertine-deep for structure, brass for active states.
- Tables, schedules and indexes are first-class design elements.
- No cards, no shadows, no pills. Buttons are text with a 1px underline that draws on hover, or full-width ruled rows with an arrow at the right edge.
- The one signature graphic is the drawing. Line drawings (sand on bone, brass-light on basalt) appear as stage visuals and as before/after counterparts to renders.

## 2. Structure (completely new)

### Navigation

- No top bar.
- **Top-left of the stage:** the logo (white over imagery).
- **Top-right of the page:** "Index", "EN | ES" and "Book a visit" as text links.
- **"Index"** opens a full-screen table of contents laid out like a book's contents page:
  - chapter number, title, a hover thumbnail, and the destination's "page" (its section)
  - grouped as I. The Place, II. The Buildings, III. The Residences, IV. Life, V. Assurance, VI. Visit
  - type-to-filter search across pages and the FAQ
- **The index rail:**
  - On the homepage it tracks chapters.
  - On inner pages it tracks that page's sections.
  - Each number is a link with an aria-label.
- **Mobile:** "Index" and "Book a visit" sit in a slim bottom bar.

### URL map (under /en and /es)

```
/                          The Monograph (homepage chapters, section 4)
/place                     Dorado and the island + map
/place/tesoro-del-mar      Project monograph
/place/[project]           Other projects
/buildings                 Architecture and resilience (specifications)
/residences                Schedule of residences
/residences/[collection]   Collection
/residences/plans          Plan library (gated detail)
/residences/plans/[plan]   Plan sheet (gated)
/residences/compare        Compare up to 3
/life                      Amenities, family, pets, wellness, activities (index)
/plates                    All renders as numbered plates (gallery)
/plates/[n]                Single plate viewer (deep zoom)
/tour                      VR tour and film
/invest                    Act 60 notes, deposit steps, estimator
/portfolio                 Catalogue of the 12 locations
/visit                     Book a visit and contact
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
- From the client's presentation PDF ("Treasure Point / PR2030", Tesoro Del Mar's working name): total floor area 498,150 sq ft.

**Dorado Waterfalls:** use the facts on its page.

**Portfolio (12):** Tesoro Del Mar, Dorado Waterfalls, The Top, Dorado Ocean View Estates, Naguabo, Loíza River City, Loíza Ocean, Loíza Countryside Estates, Guayama, Costa del Este Ceiba, AquaMaria, To Be Revealed. Use each location's tagline exactly as published.

**Resilience (9 features)**

- Category 5 hurricane design; seismic resilience; 24/7 security; smart security systems.
- Backup power (generators plus solar and battery); flood and stormwater management.
- Private safe rooms; emergency preparedness; community resilience training.

**Family, pets, amenities, activities:** as published.

- Amenity groups (oraworld.com/our-amenities): Wellness & Relaxation; Entertainment & Recreation; Dining & Social Spaces; Business Center; Transportation; Adventure Experiences; Family-Oriented Amenities; Sustainability & Nature; Sport & Fitness.
- Activity groups (oraworld.com/activities): Sport & Fitness; Water Sport & Adventures; Culinary & Cultural; Entertainment & Leisure; Adventure & Exploration; Family-Friendly; Medical Services; Educational Services; High-End Shopping; Additional Services.
- Use each group's published items. Do not name third-party luxury brands, even though the source lists some.

**People:** Reza Sabaii, ESQ., Principal Broker at Ora World. Use the bio published under his articles: a commercial real estate company founded ten years ago with twenty associates and offices in Washington DC, Tysons VA, Bethesda MD and Miami FL; Juris Doctor from the George Washington University Law School.

- His published portrait is only 150 × 150 px. Show it as a small avatar of 72px at most, never in a large frame.
- Every other team role is "to be announced".

**Articles** (ORA World Journal): bring all three across with the text verbatim, keeping their headings and lists. Two are by Reza Sabaii, ESQ.

- https://www.oraworld.com/what-is-act-60/
- https://www.oraworld.com/puerto-rico-luxury-living-act-60-wellness/
- https://www.oraworld.com/exploring-general-luxury-and-act-60-a-guide-for-high-net-worth-individuals/

In Spanish, translate the title and summary, and note that the body is available in English.

**Documents**

- Tesoro Del Mar presentation: https://www.oraworld.com/wp-content/uploads/2023/09/004-PR2030-TREASURE-POINT.pdf (9 landscape pages)
  - Render the pages to images for an in-browser viewer that shows one slide at a time, with thumbnails, swipe and keys. Every page must be reachable on mobile.
  - Link the PDF on the client's server.
  - It has no floor plans, so never promise them.
- Guayama site plan: https://www.oraworld.com/wp-content/uploads/2024/07/GUAYAMA-50-07-03-2024.pdf

**Other published material**

- The Act 60 explainer.
- The VR tour: https://kuula.co/share/collection/7Zt7D
- The contact form fields.

**Legal notice:** verbatim in every footer: "This advertisement is not an offering. It is a solicitation of interest in the advertised property. No offering of the advertised units can be made and no deposits can be accepted, or reservations, binding or non - binding, can be made until an offering plan is filed with the New York State Department of Law. This advertisement is made pursuant to Cooperative Policy Statement No. 1, issued by the New York State Department of Law. Attorney General File No.: CP25-0047. Sponsor: TRPbuildco LLC Sponsor's Address: Tesoro Del Mar Dorado, Vega Alta, Puerto Rico 00692", followed by "All images on this page are artist renderings."

### Unknown

Show "To be confirmed" inside real chapters, and list every item in CONTENT-TODO.md:

- prices, unit mix, sizes, real floor plans, delivery dates
- architect and designer names, press
- phone, WhatsApp, email, sales gallery address and hours
- deposit schedule, broker terms, brochure

No lorem ipsum, no bracket codes, no invented testimonials, ratings or awards.

Write new headlines in English and native Spanish; do not reuse v1's headlines. Copy under each headline must be factual.

### Images: everything real, from oraworld.com

**Pull the whole media library, not a hand-picked list.**

- Call `https://www.oraworld.com/wp-json/wp/v2/media?per_page=100&page=1…6` (568 items, with source URLs, sizes and titles).
- Crawl every public page in `/page-sitemap.xml` and `/post-sitemap.xml`.
- List the images the pages actually show. YOOtheme serves them as `/wp-content/themes/yootheme/cache/xx/<name>-<hash>.webp`; strip the hash to get the name.
- Match each name to its library original and download it at full size.
- Save the inventory (file, size, title, page it appears on) to `docs/source/oraworld-com/media-library.md`.

**What you will find (about 120 images in use)**

- **Tesoro Del Mar** (2025/07): exteriors from the pool, road and golf course; aerials 001–004; foyer 001/002/004/005; apartment 1403 (living rooms, bedrooms, bathrooms, study); hotel suite 210; penthouse living 001–003. Also R_006 (balcony detail) and the dining room under a skylight (file named `vertical-placeholder-image-2.png`, but a real render).
- **Dorado Waterfalls** (2024/06–07): DoradoWaterfalls1, 2, 3, 4, 5, 8, 10, 11, 12-1, 14-1, 15, 15-1, plus `026.jpg` and `028.jpg` (pools) and DoradoWaterfallsInterior1–20 (lobbies, restaurants, living rooms, bedroom, dressing room, bath).
- **Portfolio cards:** use exactly the pairing on oraworld.com/our-residences:

  | Location                  | Image                           |
  | ------------------------- | ------------------------------- |
  | Dorado Waterfalls         | DoradoWaterfalls1               |
  | Tesoro Del Mar            | R_006 or TDM-EXTERIOR-FROM-PULL |
  | The Top                   | home5                           |
  | Dorado Ocean View Estates | VegaAlta1                       |
  | Naguabo                   | Naguabo2                        |
  | Loíza River City          | LoizaRiverCity1                 |
  | Loíza Ocean               | LOIZA-57-003                    |
  | Loíza Countryside Estates | LoizaCountryside1cropped        |
  | Guayama                   | guayama-cropped-for-home        |
  | Costa del Este Ceiba      | Screenshot_136                  |
  | AquaMaria                 | PL-Screenshot_140               |
  | To Be Revealed            | ora-group-112                   |

  Also use the Puerto Rico locations map (`pr-island-picture-narrow`) and the "ORA World Gallery" series g2-01…06. MWC-0122 and TP_0082 appear in the residences slider.

- **Lifestyle, amenity and activity photography:** use each image on the same group it illustrates on oraworld.com, for example 042spa (Wellness), 029technology (Business Center), 061medical (Medical Services) and 06tax-1 (A Prosperous Environment). List the stock-looking ones (iStock files and the rest) in CONTENT-TODO.md for licence confirmation.
- **Do not use:** the `AdobeStock_*_Video_HD_Preview.mov` and `AdobeStock_720_medq.mp4` files (watermarked previews), screenshots of forms, or user uploads.

**Processing**

- Keep originals up to 2560px and serve WebP.
- Some lifestyle photos are only about 976px wide: never place those in frames wider than about 600 CSS px.
- Set a focal point per image: tower exteriors 50% 10–20%; aerials 50% 40%; interiors center.

## 4. Homepage: twelve chapters and a colophon

Each chapter sets the stage, then fills the page. Each has an interaction. No two chapters share a page layout.

1. **Cover.**
   - Stage: the film (section 7).
   - Page: a title page.
     - The gold logo at 120px, a new Cormorant title (at most 112px, at most two lines), and one factual line.
     - A small "specification" table: Site 10 acres · Land 335,995 sq ft · Residences 129 · Hotel suites 42 · Amenities 65,500 sq ft. Values count up once.
     - "Book a visit" and "Watch the film" as ruled text links.
     - A caption: "Fig. 01 · Tesoro Del Mar, artist's conceptual rendering".
2. **The site: render and drawing.**
   - Stage: the TDM aerial render with a draggable vertical divider. Left of the divider is the render; right of it is a line drawing generated from the same render, so the two align exactly.
   - Generate each drawing at build time with sharp: grayscale, Sobel edges, negate, threshold, tint sand. Caption it "Drawing derived from the rendering".
   - Page: walking distance to Balneario Cerro Gordo; 30 minutes from the airport; near a national park. Each fact is a ruled row with a footnote to the source.
3. **Architecture: the flight of birds.**
   - Stage: the exterior from the road. An SVG overlay draws a single wing-like curve tracing the facade as you scroll; it is a decorative stroke, not a technical claim.
   - Page: three principles from the source as numbered paragraphs: curved aerodynamic facades; cantilevered terraces like wings; reflecting pools and gentle cascades.
   - A small toggle switches the stage between the three exterior renders (road, pool, golf).
4. **Plates: room by room.**
   - Page: a plate index table with columns Pl. · Room · Building · Materials.
     - Rows: foyer ×4, living ×2, master bedroom, bedroom 2, bath ×2, study, hotel suite, penthouse ×3.
     - Materials only as published: stone, wood, brushed metals, floor-to-ceiling glass.
   - Hovering or focusing a row swaps the stage image with the mask wipe.
   - Enter or click opens /plates/[n]: a full-screen viewer with the image uncropped (contain), pinch and scroll zoom to 3× from the full-resolution file, arrow keys, and a caption.
5. **Schedule of residences.**
   - Page: an architectural schedule table with columns Collection · Type · Bedrooms · Size · From · Plans · Compare.
     - Unknown values read "To be confirmed".
     - Each row expands to show the published features and finishes.
     - Compare checkboxes (up to three) build a tray at the bottom of the page.
   - Stage: the selected collection's render, with a two-image toggle.
6. **Specifications: built to endure.**
   - Stage, which turns basalt: a tower elevation line drawing (brass-light) with nine numbered leader-line callouts.
   - Page, also basalt: the nine resilience features as "Spec. 01 … Spec. 09", each with its published points.
   - As each spec reaches the reading line, its callout draws on the stage and its numeral turns brass.
   - Mobile: the callouts sit beside the elevation, which stays in the strip.
7. **Life: an index.**
   - Page: an alphabetical index of every amenity and activity, with category filter tabs (Wellness, Family, Pets, Resort, Eco, Activities). Each entry has a thin rule and a category tag.
   - Hovering an entry shows its photo on the stage.
   - A Family | Pets switch reveals each group's published paragraph.
8. **The island: an itinerary.**
   - Stage: MapLibre (OpenFreeMap tiles restyled to bone, travertine and sea, with brass pins). Lazy-load it on approach plus interaction, or after 6s idle.
   - Page: an itinerary list: shore, El Yunque, bioluminescent bays, Old San Juan, golf, airport. Each row gives the drive time (the airport's is confirmed; others are marked approximate).
   - Clicking a row flies the map to it.
   - Before the map loads, the stage shows a static drawing of the north coast.
9. **Notes on prosperity: Act 60.**
   - Page: the published explainer as numbered notes (1–13) in two columns, each a disclosure with a footnote-style number.
   - A three-question orientation:
     - Relocating?
     - Serving clients outside Puerto Rico?
     - Buying a primary residence?
   - The orientation highlights the relevant notes. It never says anyone qualifies.
   - Then the deposit steps (placeholders plus the offering-plan notice) and the tax disclaimer.
   - Stage: a quiet lifestyle photograph.
10. **Catalogue: the portfolio.**
    - Stage: a line drawing of Puerto Rico with pins only for locations whose municipality appears in the published name or tagline.
    - Page: a catalogue list of the 12, each row with plate thumbnail · name · tagline · status (Explore / Coming soon). Hovering a row lights its pin and swaps the stage to that location's render.
    - "To be revealed" is the last row, set in italics.
11. **Questions.**
    - Page: eight FAQs as numbered Q&A with disclosure, a search field, and a link to /faq.
    - Stage: the penthouse render.
    - Add FAQPage JSON-LD.
12. **Book a visit.**
    - Stage: the golf exterior.
    - Page: the visit journey inline:
      1. choose sales gallery or video call
      2. the booking embed (or a request form when no URL is set)
      3. the short lead form
      4. a success panel
13. **Colophon (footer).**
    - The page turns basalt.
    - Contents: white logo at 120px, newsletter, the index groups as columns, language, legal notice at 11px, Equal Housing Opportunity, sponsor line.
    - Footer tagline: "All images are artist's conceptual renderings unless noted."

## 5. Inner pages (same split stage, same depth)

**Project monograph** (/place/tesoro-del-mar and others):

- cover
- facts specification table
- architecture chapter
- plate index for that project
- location
- an enquiry chapter

**Buildings:**

- the specifications chapter in full
- a resilience before/after drawing slider
- a page of construction notes (placeholders hidden until real)

**Residences:**

- the schedule
- collection pages (plates, features, finishes, specs)
- plan library:
  - filters: collection, bedrooms, size, orientation, building
  - grid or list view
  - a plan sheet styled like a drawing sheet, with title block, keyplan with the unit highlighted, zoom, PDF and request pricing
- full plan detail behind a one-step registration gate remembered for a year; show a clean locked title block while it decides
- compare

**Other pages:**

- **Plates:** every render as a numbered plate; a filter by building and room; the deep-zoom viewer.
- **Life:** the index in full, activities grouped as tabs.
- **Tour:** a click-to-load Kuula modal and the film lightbox.
- **Invest:** the notes, the payment estimator ("estimate only"), deposit steps.
- **Visit:** the booking journey.
- **Portfolio:** the catalogue with the island drawing.
- **Brokers** with registration; **Press** (hidden from the index until real articles exist); **Careers**; **Hotel development**; **FAQ** with search; **Legal pages**; **Accessibility statement**.

## 6. Motion

- **Stage transitions:** a vertical mask wipe (inset clip-path animated on the incoming image layer only) over 900ms with cubic-bezier(0.65,0,0.35,1). The outgoing image scales 1 → 1.03 underneath.
- **Page reveals:**
  - rules draw left to right
  - text fades up 10px
  - table rows stagger by 40ms
- **Drawings:** strokes draw with stroke-dashoffset, scrubbed to scroll.
- **Index rail:** the brass line grows with progress.
- **Smooth scroll:** Lenis on desktop only.
- **No preloader.** The cover is ready on first paint.
- **Reduced motion:** cuts instead of wipes, drawings fully drawn, no scrub, no pinning; the stage swaps instantly.

**Hard lessons, follow exactly**

- Reveals use IntersectionObserver plus a 2.5s safety net. Pre-hide with opacity only. Never pre-hide an element you observe with clip-path, because clipped elements never intersect. The stage wipe is safe only because it animates a layer that is not observed.
- Read useSearchParams only after mount or inside Suspense.
- The split stage must not break the browser's back and forward cache, anchor links, or Ctrl+F. The page side is normal document flow.

## 7. Cover film (YouTube id HkIPZ9pGezA; store the id in the CMS)

- Poster render first via next/image with priority.
- Mount the player only after window load plus an idle callback, so it never competes with hydration.
- Embed: `https://www.youtube-nocookie.com/embed/HkIPZ9pGezA?autoplay=1&mute=1&loop=1&playlist=HkIPZ9pGezA&controls=0&playsinline=1&rel=0&modestbranding=1&disablekb=1&iv_load_policy=3&fs=0&enablejsapi=1&origin={origin}`
- Fade the poster out only when the IFrame API reports playerState 1, via the postMessage "listening" handshake. If YouTube is blocked or unavailable, the poster stays.
- Captions off, because the video has burned-in text and the viewer's YouTube preference would otherwise add captions. On onReady and after play, send unloadModule("captions"), unloadModule("cc"), setOption("captions","track",{}) and mute, repeated every second for 20s.
- Hide the player chrome: oversize the iframe to 130% of the cover size inside the overflow-hidden stage, with pointer-events none and aria-hidden.
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
- Prefix every env var with ORA3_ (NEXT_PUBLIC_ORA3_SANITY_PROJECT_ID and so on). The build environment already holds NEXT_PUBLIC_SANITY_* for an unrelated site; never read or write that project.
- The site must render fully from a typed local seed when no project id is set.
- Documents:
  - siteSettings (including filmYoutubeId), homePage (one object per chapter, including the stage visual and its focal point)
  - project, collection, floorPlan, amenity, activity, galleryImage, teamMember (shown only when not placeholder), pointOfInterest, faq, pressArticle (hidden until real), investmentStep, incentive, portfolioLocation, page
  - lead (read-only), redirect
- All fields are localized and both languages are required.
- Images require alt text plus a focal-point field and rendering and placeholder flags.
- A pnpm seed script.

**Leads**

- One form component with variants short, full, broker, gate, visit and orientation.
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
- Desktop: Performance 85+; document the YouTube player cost.
- CLS 0, LCP under 2.5s.

**Accessibility (WCAG 2.2 AA)**

- Tables use real `<table>` markup with headers and captions.
- Disclosures use aria-expanded.
- Tab sets use roles plus arrow keys.
- The before/after divider is a slider with a keyboard handle and aria-valuenow.
- The stage image always has alt text matching the active row. Stage changes are announced politely.
- Focus is visible, modals trap focus, targets are at least 24px.

**SEO**

- hreflang, sitemap, canonical URLs.
- Organization, Place, Breadcrumb, FAQPage and ImageGallery JSON-LD.
- Dynamic OG images in the monograph style.

## 10. Process and report

**Phases**

1. Create the repo and the Vercel project.
2. Discovery: write DESIGN.md (palette, contrast table, type, grid, shape language, figure and plate conventions) and docs/STRUCTURE.md (the new sitemap and where every v1 and v2 content item now lives).
3. Foundation: tokens, logo, split stage and index rail, the Index overlay, colophon, seed, CMS, and the drawing-generation script.
4. Homepage chapters 1–13.
5. Inner pages.
6. Leads, analytics, consent.
7. QA.

**QA**

- Typecheck, lint and build.
- Playwright at 1440 and 390:
  - the stage swaps per chapter and per hovered row
  - Index overlay and search
  - language switch
  - render/drawing slider by keyboard
  - plate viewer zoom and arrows
  - schedule expand and compare
  - spec callouts
  - map lazy load
  - Act 60 orientation
  - gate unlock remembered, booking flow, redirects, headers
- An image audit test that fails on any of these:
  - a missing focal point
  - a natural width below 1.5× the displayed width
  - any data:image placeholder in the HTML
  - any stage image narrower than 2000px
- A fast-scroll visibility check on every page.
- An image audit run on every page at 390px wide (DPR 3) and 1440px (DPR 2). Fail when an image's downloaded width is below 80% of the pixels it covers, counting the cover crop as max(frame width, frame height × image aspect).
- A no-pop-up test: move the pointer out of the window top, wait 30 seconds, and assert that no dialog opened.
- A mobile walk: screenshots every 0.6 screens at 390px, reviewed chapter by chapter before sign-off.
- axe with zero serious violations on twelve pages.
- Lighthouse on six pages.

**Finish**

- Commit per feature and push per phase.
- Write README.md and CONTENT-TODO.md.

**Final report**

- the staging URL
- a scores table
- screenshots of every chapter and every page at 1440 and 390, saved in reports/screenshots/
- a table of how v3 differs from v1 and v2
- open questions for the client
