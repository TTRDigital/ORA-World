Build "ORA World: A Day in Dorado", a completely new website for ORA World (luxury eco-conscious residences in Dorado, Puerto Rico) in a NEW private GitHub repository named ora-world-day, deployed to its own Vercel project. Nothing is shared with any existing codebase, and it must not resemble the current ORA World site in structure, navigation, colour, typography or motion. Only the facts and the required features carry over. Work autonomously through every phase without stopping for approval; ask me only for decisions that are hard to undo.

## 1. The idea

The current site is a classic stack of sections (hero, mission, residences, resilience, amenities, map, team, contact). Throw that structure away.

The new site tells ONE story: a single day at ORA World, from dawn to night. The homepage is that day. Every fact the client needs to communicate is placed at the moment of the day where a resident would feel it:

- the shore in the morning
- the residence at home
- wellness and family through the day
- the island in the afternoon
- the clubhouse at golden hour
- and at night, the reason you sleep well: the building is engineered for Category 5 hurricanes, with backup power and 24/7 security.

The colour of the whole page follows the sun: pale haze at dawn, bright white at midday, amber at golden hour, deep indigo at night.

Visitors should finish the homepage feeling they have lived there for a day, not read a brochure.

## 2. Content (never invent facts)

Read every page of https://www.oraworld.com (/, /our-residences/, /our-amenities/, /activities/, /tesoro-del-mar/, /dorado-waterfalls/, /tax-incentive/, /contact-us/) and save plain-text copies in docs/source/. Every factual statement on the new site must trace to that content.

Confirmed facts:

- Positioning: "Beyond expectations." "Thoughtfully crafted communities where longevity, luxury, and nature exist in perfect harmony." Mission: creating luxury living with timeless elegance and comfort; luxurious, eco-friendly developments that blend modern elegance with the island's natural beauty.
- Tesoro Del Mar (Dorado, Vega Alta, PR 00692):
  - Scale: 10 acres; 335,995 sq ft of land; 129 contemporary apartments; 42 hotel suites; 65,500 sq ft of amenities.
  - Setting: walking distance to Balneario Cerro Gordo Beach; 30 minutes from the airport; near a national park.
  - On site: clubhouse and boutique hotel; tennis and basketball courts; fitness center; jogging paths; playgrounds; sensory gardens.
  - Architecture inspired by the flight of birds: curved facades, cantilevered terraces "like wings", reflecting pools.
- Dorado Waterfalls: Dorado, 25–30 minutes to San Juan; Act 60 eligible; towers, villas, retail, clubhouse, hotel, helipad.
- Portfolio: Dorado Waterfalls, Tesoro Del Mar, The Top, Dorado Ocean View Estates, Naguabo, Loiza River City, Costa del Este Ceiba, Aquamaria, Guayama, Loiza Ocean, Loiza Countryside Estates, one "To Be Revealed".
- Resilience:
  - Category 5 hurricane engineering; impact-resistant windows; reinforced walls; seismic design beyond local code.
  - 24/7 on-site security; AI-enhanced surveillance; smart locks; gated parking.
  - Generators plus solar panels and battery storage; elevated foundations; stormwater management.
  - Private safe rooms; emergency shelters; resilience training.
- Family and pets:
  - Kids' adventure camps; family pools; game rooms; school and tutoring partnerships.
  - Healthcare clinics; concierge.
  - Dog parks; grooming stations; pet daycare; on-demand veterinary care; pet-friendly events.
- Amenity groups (wellness, recreation, dining, business, transportation, adventure, family, sustainability, sport) and activity groups (sport, water, culinary and cultural, entertainment, adventure, family, medical) are on the live site.
- The 13-question Act 60 explainer, the Kuula VR tour (https://kuula.co/share/collection/7Zt7D), and the contact form fields (Buyer/Broker, Name, State, Email, Country, Phone, How did you hear about us, Message) are on the live site.
- Legal notice, verbatim, in every footer: "This advertisement is not an offering. It is a solicitation of interest in the advertised property. No offering of the advertised units can be made and no deposits can be accepted, or reservations, binding or non - binding, can be made until an offering plan is filed with the New York State Department of Law. This advertisement is made pursuant to Cooperative Policy Statement No. 1, issued by the New York State Department of Law. Attorney General File No.: CP25-0047. Sponsor: TRPbuildco LLC Sponsor’s Address: Tesoro Del Mar Dorado, Vega Alta, Puerto Rico 00692" then "All images on this page are artist renderings."

Unknown, so use calm labelled placeholders and list them in CONTENT-TODO.md:

- prices, unit mix, sizes, floor plans, delivery dates
- architect and designer names, portraits, press
- phone, WhatsApp, email, sales gallery address and hours
- deposit schedule, broker terms, brochure
  Never show bracket codes or lorem ipsum. Do not state sunrise or sunset times or any clock time as fact; the chapters are named by part of day.

Headlines: write NEW editorial headlines in English and native Spanish. Do not reuse the current site's headlines, except the brand line "Beyond expectations", which may appear once. Headlines may be evocative, but the copy under each must be factual.

Images: download the client's renders and photos from oraworld.com /wp-content/uploads/ (TDM-EXTERIOR-FROM-PULL-scaled.jpg, TDM-PENTHOUSE-LIVING-003-SMALL-scaled.jpg, 049discover.png, DoradoWaterfalls1.png, NAGUABO-003.jpg, n03--scaled.jpg, R_006.jpg, 05theplace-1.png and the lifestyle images) and optimise with sharp into public/images with blur placeholders. List stock photos for licence confirmation.

## 3. New structure

### 3a. Navigation by intent, not by building part

Primary menu has five words, each a section of the site:

- **Live**: residences, collections, floor plans, compare, interiors, brochure
- **Belong**: amenities, family, pets, wellness, activities, community
- **Place**: Dorado and the island, map, Tesoro Del Mar, Dorado Waterfalls, the portfolio, gallery, VR tour
- **Assurance**: resilience, Act 60 incentives, investment and deposits, FAQ
- **Connect**: plan your visit (booking), contact, brokers, press, careers, hotel development

Header: wordmark left, the current part of day in small text (Dawn, Morning, Midday, Afternoon, Golden hour, Night) that updates as you scroll the homepage, and on the right "Plan your visit", EN | ES, Log In and Menu.

### 3b. URL map (all under /en and /es)

```
/                                        A Day in Dorado (homepage story)
/live                                    Residences overview
/live/[collection]                       Collection
/live/plans                              Floor plan library (gated details)
/live/plans/[plan]                       Floor plan (gated)
/live/compare                            Shortlist comparison
/live/finder                             Residence Finder
/belong                                  Amenities, family, pets, activities
/place                                   Dorado and the island + map
/place/tesoro-del-mar                    Project
/place/[project]                         Other projects
/place/gallery                           Gallery
/place/tour                              VR tour and film
/assurance                               Resilience, incentives, investment, FAQ (anchored chapters)
/assurance/faq                           Full searchable FAQ
/connect                                 Plan your visit: booking + contact
/connect/brokers                         Brokers
/connect/press                           Press list
/connect/press/[slug]                    Press article
/connect/careers
/connect/hotel-development
/privacy  /terms  /accessibility  /legal-disclaimer
/studio                                  Sanity Studio
```

Redirect /residences, /floor-plans, /amenities, /location, /contact and /faq to their new homes.

### 3c. Two new journeys the current site does not have

1. **Residence Finder** (/live/finder). Three calm questions, one per screen:
   - How many bedrooms?
   - Ocean, garden or mountain view?
   - When are you planning to buy?

   It returns the matching collections and plans, then asks for the one-step registration to see full plans and pricing. Answers prefill the lead form and travel to the CRM.

2. **Plan your visit** (/connect). One journey replaces separate contact and booking pages:
   - choose sales gallery or video call
   - pick a time (Calendly or Cal.com embed from the CMS, lazy-loaded; a request form when no URL is set)
   - confirm details (lead form)
   - see a confirmation panel with what happens next

## 4. Homepage: A Day in Dorado

One continuous scroll in six chapters. Each chapter has:

- a part-of-day label
- a new headline
- one to three short paragraphs of fact
- one primary image or the film
- a single quiet link into the deeper page

No chapter repeats another's layout.

1. **Dawn**
   - Hero: the brand film full-bleed (YouTube, see section 6) over a pale haze ground; "Beyond expectations" as the only reuse of the old copy, with a short line under it.
   - Two actions: "Plan your visit" and "Watch the film".
   - Fades into a quiet line of four figures: 10 acres · 129 residences · 42 hotel suites · 65,500 sq ft of amenities, labelled Tesoro Del Mar.
2. **Morning: the shore and the home**
   - Walking distance to Balneario Cerro Gordo, then into the residence: interiors, terraces "like wings", floor-to-ceiling glass.
   - The collections as a horizontal row of tall portraits you drag through, each with bedrooms, size and from-price or "To be confirmed".
   - Link: "Find your residence" to the Finder.
3. **Midday: wellness and family**
   - Spa, pools, fitness, kids' camps, family pools, school partnerships, pets.
   - Laid out as a "day planner": a vertical timeline of activities, each a small image and one line.
   - Link to Belong.
4. **Afternoon: the island**
   - El Yunque, the bioluminescent bays, Old San Juan, golf, the airport at 30 minutes.
   - Shown as an interactive map you can explore, with proximity cards.
   - Link to Place.
5. **Golden hour: the clubhouse**
   - The community hub: clubhouse, boutique hotel with 42 suites, dining, the sensory gardens.
   - The page is warmest here.
   - Link to the VR tour.
6. **Night: rest easy**
   - The page turns indigo.
   - Resilience told calmly: Category 5 engineering, seismic design, backup power with solar and battery storage, 24/7 security, safe rooms.
   - A line drawing of the building lights its windows one by one as you scroll.
   - Then Act 60 in two sentences with the tax disclaimer.
   - Close with "Plan your visit": the full lead form on the night ground, with the legal notice in the footer below.

## 5. Design system "Daylight"

Concept: Dorado's light through one day. The interface itself is quiet; the colour of the light is the design.

### Palette

Every text pair is WCAG-checked.

Chapter grounds, interpolated by scroll on the homepage:

| Chapter     | Ground         | Text             | Muted           |
| ----------- | -------------- | ---------------- | --------------- |
| Dawn        | #ECE7EE haze   | #221D33 (13.3:1) | #5C5670 (5.7:1) |
| Day         | #FBFAF6        | #13212B (15.7:1) | #4D5B63 (6.7:1) |
| Golden hour | #F0D2A4 amber  | #2E1B0C (11.3:1) | #6A4724 (5.7:1) |
| Night       | #0D1324 indigo | #E9ECF4 (15.7:1) | #9AA3BB (7.3:1) |

Accents:

- sun #D9772B: the single brand accent for the sun arc, numerals and hairlines; 3.0:1 on day, so large text and graphics only; 5.8:1 on night.
- sun-ink #9A4510: small accent text on dawn and day only; 4.47:1 on golden hour, so large only there.
- sea #0B6680: links and the map on day (6.2:1).
- moon #E7C27D: accent text at night (10.9:1).

Inner pages use the day ground. The Assurance page closes on night.

### Typography

- Display: Instrument Serif, regular and italic. Tall, condensed, editorial, set very large (up to 150px) with tight leading.
- Body: Hanken Grotesk 400/500, 17px, line-height 1.6.
- Labels: Hanken Grotesk 500 in true small caps (font-variant-caps: all-small-caps, tracking 0.08em).
- Figures: Instrument Serif oldstyle figures for stats; Hanken tabular figures in tables and forms.
- No uppercase eyebrows with rules, no Didone, no all-caps headlines.

### Layout grammar

- Generous single-column storytelling on mobile.
- Wide editorial spreads on desktop: one large image, one narrow text column, plenty of air.
- Each chapter has its own composition: full bleed, drag row, timeline, map, warm split, dark diagram.
- Corner radius 0 except the pill buttons. No shadows. No cards with borders.
- Thin sun-coloured hairlines are the only ornament.

### Signature: the sun arc

- A thin arc along the top of the viewport on the homepage traces the sun's path. A small sun dot moves along it with scroll progress, from the left horizon at dawn to the right at night, then becomes a moon.
- The page ground and text interpolate between the chapter palettes over 30vh as each chapter enters.
- The header's part-of-day label changes with it.
- This is the one big idea. Keep all other motion soft: images rise 6% inside their frames, text fades up 12px, 700–1000ms, cubic-bezier(0.22,1,0.36,1).
- Page transitions: a short colour wash in the next page's ground.
- Preloader, first visit only and under 1.5s: the sun rises over a horizon line, then the page appears.
- Reduced motion: no arc animation (the dot jumps per chapter), colours switch without interpolation, no pinning or parallax.

### Persistent elements

- **Menu:** full screen in the current chapter's colour. The five intent words huge in Instrument Serif, each revealing its sub-links on hover or tap. A small image per word. Contact and language at the foot.
- **Floating bar:** a pill with Call · Plan your visit · WhatsApp. Hidden until numbers exist.
- **Footer:** a night band with newsletter, the five sections, contact, language, legal notice in 11px, Equal Housing Opportunity and sponsor line.

## 6. Hero film (YouTube id HkIPZ9pGezA)

Store the id in the CMS.

- Show the poster render instantly and mount the player after first paint.
- Embed https://www.youtube-nocookie.com/embed/HkIPZ9pGezA?autoplay=1&mute=1&loop=1&playlist=HkIPZ9pGezA&controls=0&playsinline=1&rel=0&modestbranding=1&disablekb=1&iv_load_policy=3&fs=0&enablejsapi=1&origin={origin}.
- Fade the poster out only when the IFrame API reports playerState 1 (postMessage "listening" handshake). If YouTube is blocked, the poster stays.
- Captions off: on onReady and first play, send unloadModule("captions"), unloadModule("cc") and setOption("captions","track",{}), repeated every second for 20 seconds.
- Hide the player chrome: size the frame to calc(max(100vw,177.78vh)*1.3) by calc(max(100vh,56.25vw)*1.3), centred in an overflow-hidden box, with pointer-events none and aria-hidden.
- "Watch the film" opens a lightbox with sound.
- Show the poster only under reduced motion or Save-Data.

## 7. Features (all required, placed in the new structure)

- Floor plan library with filters (collection, bedrooms, size, orientation, building), grid and list, zoomable plan, keyplan with the unit highlighted, PDF, and request pricing. Full detail sits behind a one-step registration gate remembered by cookie for a year; show the blurred preview while it decides.
- Shortlist up to 3 plans and compare.
- Masonry gallery with filters and lightbox.
- Gated brochure viewer.
- Click-to-load VR modal.
- Booking inside Plan your visit.
- Investment: deposit stepper (placeholders and the offering-plan notice), gated pricing, payment estimator with an estimate-only note.
- Searchable FAQ with FAQPage JSON-LD.
- Press, brokers with registration, careers, hotel development.
- Newsletter; desktop exit-intent brochure offer, once per session, never in the first 20s.
- WhatsApp and click-to-call.
- Full EN/ES with remembered choice.
- Skip link and accessibility statement.

## 8. Tech

- Next.js 16 App Router, TypeScript strict; src/proxy.ts (not middleware) for locale routing, redirects and a first-touch attribution cookie.
- Sanity with embedded Studio at /studio, Presentation and draft mode.
  - Prefix Sanity env vars with DAY_; the build environment already has NEXT_PUBLIC_SANITY_* for another site.
  - The site must render from a typed local seed when no project id is set.
- Tailwind v4 with CSS-variable tokens.
- GSAP + Lenis (off on touch and reduced motion); next-intl EN/ES with localized CMS fields; MapLibre with OpenFreeMap tiles restyled to the day palette; React Hook Form + Zod; Vercel staging with noindex.

Lead capture:

- One form with variants short, full, broker, gate and finder.
- Zod on both sides; honeypot with silent success; Turnstile when keys exist; rate limiting.
- The attribution cookie carries UTM, gclid, gbraid, wbraid, referrer and landing page.
- /api/lead posts to CRM_WEBHOOK_URL, saves a Sanity lead, and sends a Resend confirmation behind EMAIL_ENABLED.
- In-page success panel; lazy-load the form libraries.

Sanity documents:

- siteSettings (including filmYoutubeId), homePage (six chapters, each with part of day, headline, body, image, link)
- project, collection, floorPlan, amenity, galleryImage, teamMember, pointOfInterest, faq, pressArticle, investmentStep, incentive, page
- lead (read-only), redirect
- Localized fields, both languages required; images need alt text and carry rendering and placeholder flags; a pnpm seed script.

Hard lessons, follow exactly:

- Start reveals with IntersectionObserver plus a 2.5s safety net. Never pre-hide with clip-path: clipped elements never intersect and stay invisible. Pre-hide with opacity only.
- Load the map only after its section is near and the visitor has interacted, or after 6s idle.
- Read useSearchParams only after mount or inside Suspense.
- CSP must allow www.youtube-nocookie.com and www.youtube.com in frame-src and i.ytimg.com in img-src, plus Kuula, the booking host, Turnstile, Sanity, map tiles and GTM/GA.
- The consent banner is a slim bar on mobile, never more than a fifth of the screen.
- No staging-only widgets visible on the page.

## 9. Targets

- Lighthouse mobile on a production build: Performance 90+, Accessibility 100, Best Practices 100, SEO 100. CLS 0, LCP under 2.5s.
- WCAG 2.2 AA in every chapter colour: visible focus, full keyboard support, focus traps in modals.
- GTM/GA4 only after consent (Consent Mode v2).
- hreflang, sitemap, canonical URLs, Organization, Breadcrumb and FAQ JSON-LD, dynamic OG images.

## 10. Process and report

1. Create the repo and the Vercel project.
2. Discovery: write DESIGN.md with the palette, type and contrast table, and docs/STRUCTURE.md with the new sitemap and how every piece of old-site content maps into it.
3. Foundation.
4. Homepage story.
5. Live, Belong, Place, Assurance and Connect pages, plus the Finder.
6. Leads and analytics.
7. QA:
   - typecheck, lint and build
   - Playwright at 1440 and 390: chapter colours change on scroll, menu, language switch, Finder flow, Plan your visit flow, gate unlock remembered, compare, lightbox, redirects, headers
   - axe with zero serious violations on ten pages
   - Lighthouse on six pages
   - a fast-scroll visibility check on every page

Commit per feature and push per phase. Write README.md and CONTENT-TODO.md.

Final report:

- the staging URL
- a scores table
- screenshots of every homepage chapter and every page at 1440 and 390, saved in reports/screenshots/
- open questions
