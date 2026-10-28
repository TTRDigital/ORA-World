# ORA World — Design Direction (Checkpoint 1)

Dorado · Puerto Rico. Luxury, eco-conscious branded residences by ORA World (sponsor TRPbuildco LLC).
This document fixes the visual system for the new site: palette tokens, type pairing, layout grammar and motion
principles. Everything below becomes CSS variables in Phase 2 and is shared by all three homepage directions.

> Source inputs: oraworld.com (every public page, captured verbatim in `docs/source/oraworld-com/`), the client's
> own renders (Tesoro Del Mar exterior and foyer, Dorado Waterfalls, "Access the Extraordinary" pool terrace),
> the ORA World wordmark, and six inspiration sites (section 6).
>
> **The hero film (`assets-source/hero-video.mp4`) is not in the repository yet.** Colors in this document were
> sampled from the client's published renders instead; the brief's description of the film (warm travertine
> fins, brass perforated lattice, "888" signage, stone pool portal) was used to weight the palette. When the
> file lands, `pnpm video:build` extracts frames and the palette will be re-checked against them (section 9).

---

## 1. Positioning in one line

**Calm, slow, expensive.** Editorial restraint over resort noise. The site should read like a large-format
architecture monograph: stone, bone paper, brass hairlines, one italic word per headline, and photography
that is allowed to breathe.

---

## 2. Palette

### 2.1 What was sampled

| Source | Dominant values (ffmpeg palettegen, 12 colors) |
|---|---|
| Tesoro Del Mar exterior render | `#ded8cc` `#c2b397` `#a39574` `#7a6f49` `#564c1f` `#2b2918` (stone, limestone deck, bronze-olive shadows) · `#a3b7c6` `#8098ab` `#547690` (sea/sky glass) |
| Pool terrace render ("Access the Extraordinary") | `#f6f9f8` `#c8c0ae` `#acac97` `#90916e` `#5b5b27` `#393611` (bone, travertine, palm greens) |
| "The Place" beach photo | `#8bc6e6` `#569ec0` `#3f7f98` (Caribbean water) · `#393d30` `#1b2317` (palm shade) |
| Current brand sheet (theme CSS) | `#a59228` gold, `#292929` charcoal, `#faf5ef` / `#f6eee3` cream |

The current site's gold (`#a59228`) reads olive on screen. It is warmed and darkened into a true brass for
the new system; the client should approve the shift (open question 4).

### 2.2 Design tokens — Direction A, "Travertine Editorial" (default theme)

| Token | Hex | Role |
|---|---|---|
| `--color-bone` | `#F7F3EC` | Page paper. Default background. |
| `--color-bone-deep` | `#EFE9DF` | Alternating light band, form fields. |
| `--color-travertine` | `#E3D9C8` | Primary light surface: cards without shadows, stat bars, menu panel. |
| `--color-travertine-deep` | `#C9B99E` | Hairlines on light, image placeholders, blur-up tint. |
| `--color-sand` | `#A39174` | Decorative only: image placeholders, disabled states, hairline tints. Never for text on bone (2.8:1). Captions use charcoal-soft. |
| `--color-basalt` | `#1C1B19` | Dark section background (CTA, film, footer). |
| `--color-charcoal` | `#2A2825` | Body text on light. |
| `--color-charcoal-soft` | `#5A5650` | Secondary text on light. |
| `--color-brass` | `#A8864F` | Accent: hairline rules, numerals, italic accent word on dark, hover states. |
| `--color-brass-ink` | `#7A5C2E` | Brass for text and focus rings on light (AA-safe). |
| `--color-brass-light` | `#D4B987` | Brass for text and rules on dark. |
| `--color-sea` | `#3F7F98` | Rare secondary accent: location/map, water moments. |
| `--color-sea-light` | `#9ED1E6` | Map water fill, sea tint on dark. |
| `--color-palm` | `#4A5A3A` | Very sparing: eco/nature eyebrows and icons. |
| `--color-palm-light` | `#9AA685` | Palm tint on dark. |
| `--color-white` | `#FFFFFF` | Text on dark, video UI. |
| `--color-scrim` | `rgb(28 27 25 / 0.55)` | Only allowed gradient: bottom scrim on hero and full-bleed images. |

Semantic aliases (what components actually use): `--bg`, `--bg-alt`, `--surface`, `--fg`, `--fg-muted`,
`--accent`, `--accent-ink`, `--rule`, `--focus`. Directions B and C only remap these aliases.

### 2.3 Contrast check (WCAG 2.2 AA)

Generated below by `scripts/contrast.py` logic (appended at the end of this file). Body text and all UI text
pairs meet 4.5:1; large display text meets 3:1. Brass on bone is reserved for hairlines and ≥ 32 px numerals;
brass-ink is used whenever brass must carry small text.

### 2.4 Direction theme sets

| Alias | A · Travertine Editorial | B · Basalt Cinema | C · Caribbean Light |
|---|---|---|---|
| `--bg` | bone | basalt | `#FBFAF7` (cooler, brighter bone) |
| `--bg-alt` | travertine | `#242321` | `#EEF3F2` (sea-glass mist) |
| `--surface` | travertine | `#2E2C29` | white |
| `--fg` | charcoal | `#F2EDE4` | `#1F2A2E` (deep marine) |
| `--fg-muted` | sand | `#A39174` | `#5F7076` |
| `--accent` | brass | brass-light | sea |
| `--accent-ink` | brass-ink | brass-light | `#2C6A82` |
| `--rule` | travertine-deep | `rgb(212 185 135 / 0.35)` | `#CFE0E4` |
| Imagery | architecture, stone, detail | night renders, pool at dusk, long exposures | people, ocean, family, pets, daylight |
| Motion | slow editorial reveals | pinned chapters, longer durations, more parallax | lighter, quicker, softer ease |

---

## 3. Typography

### 3.1 The pairing

**Display: Bodoni Moda** (Google Fonts, OFL, variable weight 400–900, optical size axis 6–96, true italic).
**Text and UI: Manrope** (Google Fonts, OFL, variable weight 200–800, tabular figures via `tnum`).

Why Bodoni Moda and not Cormorant or Playfair:

- The ORA World wordmark is a Didone — hairline serifs, vertical stress, a wide-tracked "WORLD". Bodoni Moda is
  the same genre, so headlines and the logo feel cut from one stone. Cormorant is an old-style Garamond: softer,
  lower contrast, and it would argue with the mark. Playfair Display is what the current WordPress theme uses and
  is the default serif of a thousand real-estate templates; it fails the "does this look like a template" test.
- Bodoni Moda's optical-size axis keeps hairlines legible at 20 px captions and lets them go razor thin at 160 px,
  which is exactly the fashion-monograph feel the brief asks for.
- Its italic is genuinely beautiful at display sizes, which is where the one-accent-word device lives
  (*Beyond* expectations · Resilient by *design* · A legacy *evolved*).

Why Manrope and not Inter Tight: Manrope is wider and warmer, so tracked uppercase eyebrows have air without
looking technical, and it ships tabular numerals for stat rows and prices. Inter Tight is the fallback if the
client wants a cooler, more corporate voice.

Both are self-hosted with `next/font` (`display: swap`, subset latin + latin-ext for Spanish accents).
System fallbacks are size-adjusted so the layout does not shift when fonts arrive.

### 3.2 Scale (fluid, `clamp()` between 390 px and 1440 px)

| Token | Size (min → max) | Line height | Face | Use |
|---|---|---|---|---|
| `--text-display-xl` | 56 → 128 px | 0.95 | Bodoni Moda 400, opsz 96 | Hero headline, manifesto |
| `--text-display-l` | 44 → 88 px | 1.0 | Bodoni Moda 400 | Section headlines |
| `--text-display-m` | 32 → 56 px | 1.05 | Bodoni Moda 400 | Sub-sections, pull quotes (italic) |
| `--text-display-s` | 24 → 32 px | 1.15 | Bodoni Moda 400 | Card titles, FAQ questions |
| `--text-stat` | 40 → 72 px | 1.0 | Bodoni Moda 400, `tnum` | Counters, prices |
| `--text-lead` | 18 → 22 px | 1.5 | Manrope 400 | Intro paragraphs |
| `--text-body` | 16 → 17 px | 1.6 | Manrope 400 | Body |
| `--text-small` | 13 → 14 px | 1.5 | Manrope 400 | Captions, legal |
| `--text-eyebrow` | 11 → 12 px | 1.0 | Manrope 500, uppercase, tracking 0.18 em | Eyebrows, nav, buttons |

Rules: one italic accent per headline, never two. Eyebrows always uppercase and tracked, never bold.
Numbers in stats and prices use `font-variant-numeric: tabular-nums`. Max measure 64 ch for body, 28 ch for display.

---

## 4. Layout grammar

- **Grid:** 12 columns, 24 px gutters (16 px at 390 px), 1440 px content max with full-bleed media allowed to
  1920 px. Editorial asymmetry by default: text columns 4/12 or 5/12, imagery 7/12 or 8/12, offset vertically.
- **Spacing scale** (`--space-*`): 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192 px. Section padding is
  96 px on mobile and 160–192 px on desktop. Negative space is a feature.
- **Rules, not boxes:** cards are separated by 1 px brass hairlines at 35 % opacity, never by shadows or radii.
  Corner radius is 0 everywhere except pills in the floating action bar (full radius) and form fields (2 px).
- **Imagery:** full-bleed images alternate with narrow text columns. Every render carries an
  "Artist's conceptual rendering" micro-caption. Images reveal with a clip-path wipe plus 1.06 → 1.0 scale.
- **Mobile (390 px):** every section is designed at this width first: single column, display sizes at the
  `clamp()` minimum, horizontal chapters become snap-scroll rails, the stats bar becomes a 2 × 2 grid, and the
  floating action bar replaces the hero CTAs after the first viewport.
- **Forbidden:** drop shadows, rounded SaaS cards, gradients other than image scrims, icons in circles,
  three-equal-cards rows, centered hero with two identical buttons, emoji.

---

## 5. Motion principles

| Principle | Spec |
|---|---|
| Easing | `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)` for reveals · `--ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1)` for wipes and page transitions · `--ease-cinematic: cubic-bezier(0.22, 0.61, 0.36, 1)` for parallax catch-up |
| Durations | `--dur-fast 600 ms` (hover, UI) · `--dur-base 900 ms` (text reveals) · `--dur-slow 1200 ms` (image wipes, page transitions) |
| Text | Split by line, each line masked and translated 110 % → 0, 80 ms stagger. Headlines only; body fades. |
| Images | `clip-path: inset(0 0 100% 0)` → `inset(0)` with scale 1.06 → 1.0 over 1200 ms. |
| Parallax | ±6 % on full-bleed imagery, ±3 % on captions; GSAP ScrollTrigger with `scrub: 0.8`. |
| Pinned chapters | "The Place" horizontal rail and the Resilience diagram pin for 100–150 vh; progress drawn as a brass hairline. |
| Counters | Count up once over 1.6 s with expo-out, triggered at 60 % viewport. |
| Cursor | Magnetic pull (max 8 px) on primary CTAs, desktop pointer devices only. |
| Smooth scroll | Lenis, `lerp 0.08`, disabled on touch and under reduced motion. |
| Page transitions | Bone curtain wipe up (600 ms) on route change, content revealed with a soft fade. |
| Preloader | First visit only (cookie): wordmark draws in brass over 900 ms, curtain lifts; total under 1.5 s. |
| Reduced motion | `prefers-reduced-motion: reduce` disables Lenis, parallax, pinning, counters and reveals; content is visible immediately, hover states remain as opacity changes. |

---

## 6. What we take from the inspiration sites (and where we go further)

| Site | Pattern carried over | How ORA World goes further |
|---|---|---|
| Faena Luxury Residences | Italic accent in the hero title; four-figure stats row; aerial context image under the hero; "Collaboratory" team cards; tower toggle and expandable collections in floor plans; keyplan PDFs behind a gate; floating Call · Get Pricing · WhatsApp bar | Stats come from the CMS and count up once; gate is one-step and remembered in a cookie; the floating bar is a quiet pill on desktop, not a banner |
| Cipriani Residences Miami | Heritage-led intro; unit-type cards with size, baths and "from" price; finishes in two columns; nine-card amenity grid; "Deposits & Timeline" milestones; advisor profile; FAQ accordion | Unit cards reveal a second image on hover; amenities become a FLIP-animated mosaic with category tabs; timeline is a visual stepper with a payment estimator |
| 120 Signature Residences | Pull quote inside the building intro; animated counters; proximity list with walk and drive times; qualifying lead form with consent language and a real confirmation state | Proximity list is backed by an interactive, palette-matched map; confirmation becomes a thank-you panel with "Book a presentation" |
| Viceroy Brickell | Residence cards with view and feature detail; layouts grouped by type; register-to-view panel; resort-living amenity groups; clear "views vary by residence" disclosures | Shortlist up to three plans and compare side by side; disclosures are CMS-managed and shown wherever a view is claimed |
| CasaBella Residences | Restraint: headline-first hero, one heading and one CTA per section; quick-action row (Brochure · Layouts · Residences · Video); architect pull quote; flipbook brochure; video lightbox; "Make Your Move" form with broker toggle; sales gallery address | Brochure flipbook and film lightbox share one gated viewer; broker toggle switches the whole form variant, not one field |
| Delano Miami Residences | Lifestyle-led hero with a person; short evocative headline; rendering carousel with PREV/NEXT; English/Español toggle; one heading plus one CTA rhythm; "signature moment" section | Full bilingual routing (`/en`, `/es`) and localized CMS fields, not a translated overlay; the signature moment is "Resilient by Design" with an animated SVG structural diagram |

Shared gaps we close: an interactive map, a real 360/VR tour (the client already has a Kuula collection),
private appointment booking, true bilingual content, and motion people remember.

---

## 7. Content facts confirmed from oraworld.com (safe to publish)

- Positioning: "Beyond expectations." "Thoughtfully crafted communities where longevity, luxury, and nature exist in perfect harmony."
- Mission: "Creating luxury living with timeless elegance and comfort." Goal: revolutionize Puerto Rico's real estate landscape with luxurious, eco-friendly developments.
- Homepage chapters: The Place · A Prosperous Environment · Access The Extraordinary · Resilient By Design · Family-Centered Living · Happy Homes For All · ORA World in VR · Contact.
- **Tesoro Del Mar** (Dorado, Vega Alta, PR 00692): 10-acre development; 335,995 sq ft land; 129 contemporary apartments; 42 hotel suites; 65,500 sq ft amenities area; walking distance to Balneario Cerro Gordo Beach; 30 minutes from the airport; near a national park; clubhouse, boutique hotel, tennis and basketball courts, fitness center, playgrounds. Architecture inspired by the flight of birds: curved facades, cantilevered terraces.
- **Dorado Waterfalls**: Dorado, PR; 25–30 minutes to San Juan; private eco-luxury residences; Act 60 eligible; residential towers, villas, retail, clubhouse, hotel, helipad.
- The live site lists a portfolio of 12 locations: Dorado Waterfalls, Tesoro Del Mar, The Top, Dorado Ocean View Estates, Naguabo, Loiza River City, Ceiba (Costa del Este), Aquamaria, Guayama, Loiza Ocean, Loiza Countryside Estates, and one "To Be Revealed".
- Resilience: structures engineered to withstand Category 5 hurricanes; impact-resistant windows; seismic engineering exceeding local codes; 24/7 security; smart security; emergency shelters; generators plus solar and battery backup; flood and stormwater management; private safe rooms; resilience training.
- Amenity groups: Wellness & Relaxation · Entertainment & Recreation · Dining & Social · Business Center · Transportation · Adventure Experiences · Family-Oriented · Sustainability & Nature · Security · Sport & Fitness.
- Activity groups: Sport & Fitness · Water Sport & Adventures · Culinary & Cultural · Entertainment & Leisure · Adventure & Exploration · Family-Friendly · Medical Services (and more; see `docs/source/oraworld-com/activities.txt`).
- Tax: Act 60 explainer (13 Q&As) exists on the live site and will be carried over with a "consult your advisor" note.
- VR: Kuula collection `7Zt7D` is embedded today.
- Legal: verbatim notice and sponsor line captured in `docs/source/oraworld-com/README.md`.

Not available anywhere public (placeholders until supplied): prices, unit mix per collection, interior sizes,
floor counts, delivery dates, architect and designer names, sales gallery address, phone, WhatsApp, email,
press articles, careers, hotel development copy, broker co-op terms, deposit schedule.

---

## 8. Section-level art direction notes for Direction A

1. Preloader: wordmark drawn as a brass stroke on basalt, curtain lifts to the film.
2. Hero: film loop, bottom scrim only; eyebrow "DORADO · PUERTO RICO"; headline "*Beyond* expectations"; stats bar pinned to the hero's bottom edge, four tabular numerals separated by brass hairlines.
3. Manifesto: the mission statement at display-xl on bone, one word italic brass, signature line "ORA World · Dorado".
4. Context reveal: Tesoro Del Mar exterior render scaling from a 7/12 inset to full bleed, two pinned captions.
5. The Place: pinned horizontal rail; each panel numbered 01–05 in brass with one sentence.
6. Residences: 5/7 asymmetric pairs, second image on hover, "from" price in tabular numerals or a placeholder label.
7. Resilient by Design: split screen, left a line-drawn SVG tower that draws itself, right counters and the nine resilience features as a hairline list.
8. Amenities mosaic: five tabs, FLIP re-flow.
9. Family / Pets: two warm editorial blocks with people and pets.
10. Prosperous Environment: pure typography on travertine, no numbers unless in CMS.
11. Map: custom style in bone, travertine land, sea-light water, brass pin, hairline roads.
12. Virtual tour teaser, 13. Collaboratory, 14. Press marquee, 15. Dark CTA with the lead form, 16. Footer.

---

## 9. Open questions for the client (Checkpoint 1)

1. **Hero film:** `assets-source/hero-video.mp4` is not in the repo. Please add it; the palette will be re-verified against extracted frames.
2. **"888" signage** seen in the film: is 888 the building's name or address? It is not used in copy until confirmed.
3. **Flagship project:** the brief names "ORA World Residences" as the flagship; the live site presents a 12-location portfolio with Tesoro Del Mar and Dorado Waterfalls as the detailed pages. Which project is the tower in the film, and should the homepage lead with it?
4. **Brass vs current gold:** the current `#a59228` gold is warmed to `#A8864F` brass. Approve or keep the existing gold.
5. **Contact details:** sales gallery address, phone, WhatsApp number and email are not published anywhere. Needed for the floating bar and footer.
6. **Collections and pricing:** bedroom counts, size ranges and "from" prices for the residence collections, or confirm they stay as placeholders for launch.
7. **Branch workflow:** the brief asks for a `develop` branch with PRs to `main`; the repository has no `main` branch yet and this session is assigned to `claude/eloquent-turing-tekcnh`. Confirm whether to initialize `main` and `develop` from this branch.

---

## Appendix A. Contrast table (computed)

| Foreground | Background | Ratio | AA (4.5 normal / 3 large) | Intended use |
|---|---|---|---|---|
| charcoal `#2A2825` | bone `#F7F3EC` | 13.29:1 | pass | body text |
| charcoal-soft `#5A5650` | bone `#F7F3EC` | 6.59:1 | pass | secondary text |
| charcoal `#2A2825` | travertine `#E3D9C8` | 10.52:1 | pass | text on surface |
| brass-ink `#7A5C2E` | bone `#F7F3EC` | 5.59:1 | pass | brass text, focus ring |
| brass `#A8864F` | bone `#F7F3EC` | 3.07:1 | large only | brass hairlines / large numerals only |
| sand `#A39174` | bone `#F7F3EC` | 2.77:1 | FAIL (decorative only, never text) | placeholders, disabled |
| sea-ink `#2C6A82` | bone `#F7F3EC` | 5.44:1 | pass | map labels |
| palm `#4A5A3A` | bone `#F7F3EC` | 6.75:1 | pass | eco eyebrow |
| basalt-text `#F2EDE4` | basalt `#1C1B19` | 14.76:1 | pass | Direction B body |
| brass-light `#D4B987` | basalt `#1C1B19` | 9.09:1 | pass | Direction B accent text |
| white `#FFFFFF` | basalt `#1C1B19` | 17.21:1 | pass | text on dark |
| sea-light `#9ED1E6` | basalt `#1C1B19` | 10.42:1 | pass | sea tint on dark |
| marine `#1F2A2E` | bright-bone `#FBFAF7` | 14.08:1 | pass | Direction C body |
| sea-ink `#2C6A82` | bright-bone `#FBFAF7` | 5.76:1 | pass | Direction C accent text |
| sea `#3F7F98` | bright-bone `#FBFAF7` | 4.28:1 | large only | Direction C accent, large only |
