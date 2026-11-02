# Full prompt: ORA World Directions D "Monolith" and E "Adoquín"

> Paste everything below the line into Claude Code at the root of the ORA World repository.
> Work on branch `claude/eloquent-turing-tekcnh` (Vercel staging: https://ora-world-5sx6.vercel.app).

---

## 0. Role and the bar

You are the design director and lead front-end engineer at a studio that builds sites for the world's top branded residences. ORA World already has three homepage directions on staging: A Travertine Editorial, B Basalt Cinema and C Caribbean Light. All three are serif-led, and A and B share one type system. The client has asked for **two more directions that are more luxurious and completely different**: different typefaces, different palette, different layout grammar, different signature motion. Put them next to A, B and C and they must read as work from two other studios, not as recolours.

Each new direction gets **one bold idea executed with precision**; everything around it stays quiet. No templates, no three-equal-card rows, no glassmorphism, no purple gradients, no emoji, no icons in circles, no bounce easing. If a choice feels default, replace it.

## 1. What already exists (reuse, don't rebuild)

Read these first: `DESIGN.md`, `README.md`, `CONTENT-TODO.md`, `src/styles/globals.css`, `src/lib/fonts.ts`, `src/proxy.ts`, `src/app/(site)/[locale]/preview/[direction]/page.tsx`, `src/components/home/**`, `src/components/layout/**`.

- Next.js 16 App Router, TypeScript strict, Tailwind v4 with CSS-variable tokens, next-intl (`/en`, `/es`), Sanity (seed fallback in `src/content/seed`), GSAP + Lenis, MapLibre, React Hook Form + Zod.
- Directions are theme tokens on `html[data-direction]` plus alternate homepage components. Staging switches with `/[locale]?direction=a|b|c` (cookie) and a proxy rewrite to `/[locale]/preview/[direction]`; production always serves A.
- The hero film is the client's YouTube video (`siteSettings.filmYoutubeId = "HkIPZ9pGezA"`), played muted and looped by `HeroVideo` with captions switched off through the player API and the player chrome cropped away. The poster shows until YouTube reports playback. Keep that behaviour in both new heroes.
- Shared features that must keep working in D and E: lead form variants and `/api/lead`, registration gate, shortlist and compare, gallery lightbox, map, VR tour modal, film lightbox, consent banner, floating Call · Get Pricing · WhatsApp bar, page transitions, reduced-motion handling, all inner pages.

**Content rules (unchanged):** use only content in the seed or on oraworld.com. Never invent numbers, names, prices, dates or claims. Placeholders stay labelled as placeholders. Every rendering keeps the "Artist's conceptual rendering" label. The legal notice in the footer stays verbatim.

## 2. Direction D · "Monolith" (mineral modernism)

### Concept

The building as an object of architecture, presented the way an architect presents it: a drawing set. Cool, rational, quiet, expensive, in the lineage of Tadao Ando monographs, Aesop interiors and Swiss modernist catalogues. The source is in the film: vertical travertine fins, bronze perforated lattice, slim dark mullions, the monolithic stone portal over the pool.

### Palette (tokens; contrast measured)

| Token             | Hex       | Role                                                     | Contrast                         |
| ----------------- | --------- | -------------------------------------------------------- | -------------------------------- |
| `--d-stone`       | `#111613` | Page ground (green-black, like verde stone)              | n/a                              |
| `--d-stone-2`     | `#1A211D` | Alternate dark band, panels                              | n/a                              |
| `--d-chalk`       | `#ECE7DC` | Text on dark                                             | 14.8:1 on stone                  |
| `--d-chalk-muted` | `#A3AA9F` | Secondary text on dark                                   | 7.7:1 on stone, 6.9:1 on stone-2 |
| `--d-bronze`      | `#C49A5E` | Accent on dark: accent word, numerals, rules, focus ring | 7.1:1 on stone                   |
| `--d-verdigris`   | `#8FB5A2` | Rare secondary: map water, eco moments only              | 8.1:1 on stone                   |
| `--d-ground`      | `#E6E2D8` | Light "drawing paper" bands (at most 2 per page)         | n/a                              |
| `--d-ink`         | `#111613` | Text on ground                                           | 14.1:1                           |
| `--d-ink-muted`   | `#4F5650` | Secondary text on ground                                 | 5.8:1                            |
| `--d-bronze-ink`  | `#7A5A2C` | Bronze for text on ground                                | 4.9:1                            |

Rule: `--d-bronze` on `--d-ground` is 2.0:1, so on light bands it is hairlines and drawings only, never text. Map the semantic aliases (`--bg`, `--fg`, `--accent`, `--rule`, `--focus`, `--dark-*`) for `[data-direction="d"]`; `color-scheme: dark`.

### Typography

- **Display: Archivo, variable, `wdth` 125 (expanded), weight 200 to 300, uppercase, tracking 0.04 to 0.08em.** The architecture of the letters is the luxury: wide, light, engraved-feeling caps. Never bold. Use `font-variation-settings` through `next/font` axes `["wdth"]`.
- **Body: Archivo at `wdth` 100, weight 400**, 16 to 17px, line-height 1.65, sentence case.
- **Utility: IBM Plex Mono 400** for spec tables, sheet numbers, coordinates, prices, stat labels, form labels. Tabular numerals everywhere.
- **No italics in D.** The one-accent-word device becomes a colour shift: the `*word*` renders in `--d-bronze` with weight 300. Implement by scoping `Accent`'s `em` styles for `[data-direction="d"]`.
- Scale (fluid 390 to 1440): display-xl 44 to 112px, display-l 32 to 72px, display-m 24 to 40px, label 11px mono uppercase 0.12em.

### Layout grammar: the drawing set

- Every homepage section is a **sheet**. Each has a title block in its bottom-right (top on mobile): sheet number in mono (`A-001` Site, `A-101` Residences, `S-201` Structure, `L-301` Landscape and amenities, `G-401` Location, and so on), the section title, `NTS` (not to scale) and a small north arrow. Sheet numbers encode the real sequence of the page; they are not decoration.
- 12-column grid drawn faintly as 1px hairlines at 6% opacity behind content on desktop; content snaps to it. Generous margins, text columns of 4 to 5 columns, images on 7 to 8.
- Spec tables in mono with hairline rows replace cards (collections, stats, resilience features).
- Images are full-bleed or sit inside thin frames with crop marks at the corners (4 short bronze lines), the way prints are marked for trimming.
- Coordinates appear once, in the hero title block: the site's approximate coordinates from `NEXT_PUBLIC_SITE_LAT/LNG`, labelled "approx." until confirmed.

### Signature motion: fins and aperture (one orchestrated moment)

1. **Load:** the hero is covered by 7 vertical stone-coloured fins (full height, equal widths, hairline gaps). After the poster paints, the fins rotate open on their Y axis like louvres (900ms, 60ms stagger, `cubic-bezier(0.76,0,0.24,1)`), revealing the film behind. On mobile use 5 fins.
2. **Scroll, first 120vh (pinned):** the word **BEYOND** in Archivo Expanded spans the full width with the film playing _inside the letters_ (SVG mask or `mix-blend-mode: multiply` over a stone field). As you scroll the type scales up from its centre until the counters of the letters open into the full-screen film, then the tagline and CTAs fade in over a bottom scrim. This replaces the split-line headline used in A.
3. Elsewhere motion is minimal: drawings stroke themselves in, spec rows slide 8px with 40ms stagger, images reveal with a vertical louvre wipe (7 strips) instead of A's clip-path wipe.
4. **Reduced motion:** fins start open, BEYOND renders statically over the poster, no pinning.

### Homepage D, section by section

1. **A-001 Hero:** fins → film; BEYOND aperture; title block with "Dorado · Puerto Rico", coordinates (approx.), sheet number. CTAs: "Request private presentation" (bronze hairline) and "Watch the film". Stats as a mono spec strip under the fold: ACRES 10 · RESIDENCES 129 · HOTEL SUITES 42 · AMENITIES 65,500 SQ FT (source: Tesoro Del Mar facts).
2. **A-002 Manifesto:** the mission set in display-m expanded caps on stone, max 22 characters per line, the accent word in bronze.
3. **A-101 Residences:** collections as a spec table (name · bedrooms · interior · from) where empty values read "TO BE CONFIRMED" in mono; hovering a row swaps a large render on the right inside crop-marked frame.
4. **S-201 Resilient by Design:** reuse the self-drawing tower SVG, restyled in bronze on stone with dimension lines and leader labels in mono; counters as mono figures.
5. **L-301 Amenities:** a light `--d-ground` sheet. The five categories as a vertical index on the left; selecting one swaps a stacked set of 3 images on the right with the louvre wipe.
6. **L-302 Family and pets:** two narrow columns of text with one tall image each, crop-marked.
7. **E-401 A Prosperous Environment:** text only, mono footnote with the tax disclaimer.
8. **G-501 Location:** the map restyled: stone land, `--d-verdigris` water, bronze pin, chalk labels in Plex Mono; proximity list as a mono table.
9. **V-601 Virtual tour:** one wide frame with crop marks and a centred "OPEN 360° TOUR" label.
10. **T-701 The Collaboratory:** a credits table in the manner of a drawing set (Developer, Architect, Interiors, Landscape) with "to be announced" where unconfirmed.
11. **P-801 Press:** a mono ticker.
12. **C-901 Private presentation:** the lead form on a light sheet with mono labels and underline fields.
13. Footer: stone, the legal notice in mono 11px, sheet index of the whole site.

### Inner pages in D

Shared components follow the tokens. Add a `PageHero` variant for D: no background image; a title block layout (sheet number derived from the route, title in expanded caps, intro in a 4-column text block, a hairline grid). Floor plan pages lean into the drawing language: plan on `--d-ground` with crop marks, specs in mono.

## 3. Direction E · "Adoquín" (the Old San Juan salon)

### Concept

Puerto Rican heritage made couture: the arcades of Old San Juan, limewash plaster walls, hand-painted azulejo tile, and the blue adoquín cobblestones of the old city. Warm, generous, light-filled and confident with colour, in the spirit of a Belmond or Aman hotel journal, not a resort brochure. It answers C's brightness with heritage and saturation instead of sea-glass.

### Palette (tokens; contrast measured)

| Token            | Hex       | Role                                                           | Contrast                          |
| ---------------- | --------- | -------------------------------------------------------------- | --------------------------------- |
| `--e-plaster`    | `#FAF7F3` | Main ground (cool limewash white)                              | n/a                               |
| `--e-rose`       | `#EED8CF` | Sun-faded rose limewash colour field                           | n/a                               |
| `--e-cobalt`     | `#1D3B8C` | Azulejo cobalt: colour-field sections, primary accent on light | 9.6:1 on plaster, 7.5:1 on rose   |
| `--e-adoquin`    | `#55657F` | Cobblestone blue-grey: secondary text and rules                | 5.5:1 on plaster                  |
| `--e-ink`        | `#18203A` | Text                                                           | 15.1:1 on plaster, 11.8:1 on rose |
| `--e-ink-muted`  | `#4A5168` | Secondary text                                                 | 7.4:1 on plaster, 5.8:1 on rose   |
| `--e-gold-ink`   | `#7D5F22` | Gold for small text on plaster only                            | 5.6:1 on plaster                  |
| `--e-gold`       | `#B08A3E` | Gilded hairlines, numerals 32px and above                      | 3.0:1 (large only)                |
| `--e-gold-light` | `#E2C27E` | Gold on cobalt                                                 | 6.0:1 on cobalt                   |
| `--e-white`      | `#FFFFFF` | Text on cobalt                                                 | 10.2:1                            |

Rules: small text on rose uses ink or cobalt, never gold-ink (4.35:1). White and gold-light only on cobalt. `color-scheme: light`.

### Typography

- **Display: Instrument Serif, regular and italic.** Condensed, tall, editorial, the opposite of A's wide Didone. Set large (up to 160px) with tight leading (0.9) and the italic for the accent word. Lowercase-first headlines where it reads naturally ("beyond _expectations_").
- **Body: Hanken Grotesk 400/500**, 17px, line-height 1.6.
- **Labels: Hanken Grotesk 500 small caps** (`font-variant-caps: all-small-caps`, tracking 0.08em) instead of uppercase eyebrows. A visible difference from A to D.
- Numerals in Instrument Serif oldstyle for stats; tabular lining in tables and forms.

### Layout grammar: arcades and colour fields

- **Arches.** The key image of each section sits in an arch (semicircular top, `border-radius: 50% 50% 0 0 / 30% 30% 0 0` or an SVG `clipPath`), echoing the arcades of Calle Fortaleza and the film's stone portal. Use arches for at most one image per section; the rest are straight-edged.
- **Colour-field scrolling.** The page ground transitions between plaster, rose and cobalt as sections enter (GSAP ScrollTrigger interpolating `--bg` and `--fg` on the `main` element over 30vh). Sequence: plaster (hero) → rose (manifesto) → plaster → cobalt (resilience) → plaster → rose (family) → cobalt (CTA).
- **Azulejo ornament.** Draw one original 8-fold tile motif as an inline SVG in cobalt line work. Use it at most three times: as a 1-tile divider between chapters, as the map pin, and as a faint 4% watermark behind the CTA. Never as a full-page pattern.
- **Asymmetric two-column rhythm** with wide gutters; images bleed off one edge, text sits in 5 columns.

### Signature motion: the arcade

1. **Hero:** split layout. Headline left ("beyond _expectations_", Instrument Serif, up to 160px). On the right, the YouTube film plays inside a tall arch (70vh). On scroll (pinned 100vh) the arch widens and its top flattens until the film is full bleed, while the headline slides left and fades. On mobile the arch sits under the headline at full width and widens to full screen.
2. Section transitions are the colour fields. Images reveal by **rising from inside their arch** (the arch mask stays still and the image translates up 8% with a 1.1s ease-out), not by wipes.
3. Softer timing than A: 700 to 1000ms, `cubic-bezier(0.22, 1, 0.36, 1)`.
4. **Reduced motion:** arch full-width, colours switch without interpolation, no pin.

### Homepage E, section by section

1. **Hero:** arcade film (above), small-caps eyebrow "Dorado · Puerto Rico", tagline, CTAs, stats in a row of four with Instrument Serif oldstyle figures and small-caps labels.
2. **Manifesto (rose):** the mission in display-l italic Instrument Serif, centred column of 18ch, with one azulejo tile above it.
3. **The Place (plaster):** a horizontal "promenade" rail of five arched portraits (beach, rainforest, sea, table, horizon) with numbers in gold oldstyle and one sentence each; drag on touch.
4. **Residences (plaster):** each collection as an alternating pair, arched image on one side and an editorial text block with bedrooms, interior and from-price (or "to be confirmed") on the other.
5. **Resilient by Design (cobalt):** white text, gold-light rules; the tower drawing in gold-light line work; feature list in two columns.
6. **Family-Centered Living and Happy Homes For All (rose):** people and pets, warm portrait crops, one arched.
7. **Amenities (plaster):** tabs rendered as small-caps words separated by gold dots; the mosaic as a 3-column staggered grid, one arched hero tile.
8. **A Prosperous Environment (plaster):** typographic, disclaimer in small caps.
9. **Location:** the map restyled in plaster land and `--e-adoquin` water with cobalt roads and an azulejo pin; proximity list with gold oldstyle minutes.
10. **Virtual tour:** arched poster with a cobalt play disc.
11. **The Collaboratory:** portrait cards with arched tops and italic pull quotes.
12. **Press:** a slow marquee of italic headlines.
13. **Private presentation (cobalt):** form fields with white underlines, gold-light focus, the azulejo watermark.
14. **Footer:** ink on plaster, legal notice in 11px Hanken.

### Inner pages in E

Tokens restyle every page. Add a `PageHero` variant for E: headline left in Instrument Serif, arched image right (or a colour field when there is no image). Floor plans sit on plaster with cobalt line work; the gallery uses a mix of arched and straight frames (every fourth item arched).

## 4. Implementation

1. **Tokens.** Add `:root[data-direction="d"]` and `:root[data-direction="e"]` blocks in `src/styles/globals.css` that remap every semantic alias, plus new type tokens all directions get: `--display-transform` (none / uppercase), `--display-tracking`, `--display-weight`, `--display-leading`, `--display-stretch`, `--label-transform`, `--label-variant-caps`. Update the `display-*`, `eyebrow` and `stat` utilities to read them. A, B and C keep their current values.
2. **Fonts.** In `src/lib/fonts.ts` add Archivo (axes `["wdth"]`), IBM Plex Mono, Instrument Serif (normal + italic) and Hanken Grotesk via `next/font/google`, each with its own CSS variable and `preload: false`. Map `--font-display`, `--font-sans` and a new `--font-mono` per direction. Production (A only) must not download the new faces; verify in the network panel.
3. **Routing.** Add `d` and `e` to `DIRECTIONS`, `DIRECTION_NAMES`, the proxy rewrite, the switcher, and `generateStaticParams` in `preview/[direction]`. Create `src/components/home/directions/HomeD.tsx` and `HomeE.tsx` and their section components under `directions/d/` and `directions/e/`. Reuse data getters, `HeroVideo`, `LeadForm`, `LocationMap`, `Modal` and `Lightbox`.
4. **Map styles.** Extend `LocationMap` with a per-direction palette read from tokens (land, water, roads, labels, pin element).
5. **No CMS schema changes are required.** Everything comes from existing documents.
6. **Accessibility.** WCAG 2.2 AA with the contrast rules above, visible focus in each direction's accent, keyboard access for the fins and arcade (pinned sections must not trap focus), alt text unchanged, `prefers-reduced-motion` fallbacks described in each section.
7. **Performance.** Lighthouse mobile 90 or better on `/en?direction=d` and `/en?direction=e`, CLS 0, no layout shift from late font swaps (size-adjusted fallbacks). The pinned hero sequences must run on transforms and opacity only.

## 5. Process and checkpoints

1. **Direction D.** Tokens, fonts, hero, all sections, inner-page variant. Screenshot every section at 1440 and 390 with `node scripts/sections.mjs`. Commit: "Direction D: Monolith".
2. **Direction E.** Same steps. Commit: "Direction E: Adoquín".
3. **QA.** `pnpm typecheck`, `pnpm lint`, `pnpm build`. Extend `tests/e2e/smoke.spec.ts`: the direction test covers d and e, and axe runs on `/en?direction=d` and `/en?direction=e`. Run the full suite and Lighthouse on both. Fix anything below target.
4. **Push** to `claude/eloquent-turing-tekcnh` (Vercel redeploys). Verify on the live staging URL with a fast-scroll check that no section stays hidden.
5. **Report:** what was built, live links for D and E, Lighthouse and test results, screenshots of every section on desktop and mobile, and any open questions. Update `DESIGN.md` with the two new token tables and `CONTENT-TODO.md` if anything new is needed.

## 6. Rules

- Different means different: if a D or E section could be mistaken for A, B or C with a new colour, redesign it.
- One signature moment per direction, executed perfectly. Everything else stays calm.
- Never invent facts. Labelled placeholders only.
- Mobile is designed, not shrunk: every section at 390px gets its own composition.
- Keep A, B and C exactly as they are, and keep production serving A.
