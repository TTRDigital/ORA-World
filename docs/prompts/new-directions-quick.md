# Quick prompt: two new homepage directions (D and E)

Paste into Claude Code at the root of this repo.

---

Build two new homepage directions for ORA World, D "Monolith" and E "Adoquín", alongside A, B and C. They must look like different agencies made them: new fonts, new palette, new layout grammar, new signature motion. Same Sanity content, same lead form, same YouTube hero film (`filmYoutubeId`), same inner pages restyled by tokens. Read DESIGN.md, README.md and CONTENT-TODO.md first, and never invent facts.

**D · Monolith (mineral modernism).** Inspired by the film's stone fins, bronze lattice and monolithic pool portal.

- Palette: stone `#111613`, stone-2 `#1A211D`, chalk `#ECE7DC`, chalk-muted `#A3AA9F`, bronze `#C49A5E`, rare verdigris `#8FB5A2`. Light bands use ground `#E6E2D8` with ink `#111613` and bronze-ink `#7A5A2C`.
- Type: Archivo Expanded (wdth 125, weight 200 to 300, uppercase, wide tracking) for display, Archivo for body, IBM Plex Mono for specs and labels. No italics; the accent word turns bronze.
- Layout: an architectural drawing set. Each section is a "sheet" with a title block (sheet number, title, NTS, north arrow), hairline grids, mono spec tables.
- Signature: the hero film seen through 7 vertical stone fins that rotate open like louvres. Then BEYOND in extended caps with the film playing inside the letters, scaling up until the film fills the screen.

**E · Adoquín (Old San Juan salon).** Colonial arcades, limewash plaster, azulejo tile, blue cobblestones.

- Palette: plaster `#FAF7F3`, rose limewash `#EED8CF`, azulejo cobalt `#1D3B8C`, adoquín blue-grey `#55657F`, ink `#18203A`, gold-ink `#7D5F22` (plaster only), gold-light `#E2C27E` (on cobalt).
- Type: Instrument Serif with its italic for display, Hanken Grotesk for body.
- Layout: arch-masked imagery, colour-field scrolling where the page ground moves plaster, rose, cobalt section by section, and a single SVG azulejo tile as a sparing ornament.
- Signature: the hero film inside a tall arch that widens to full bleed on scroll.

Wire both into `?direction=d|e`, the staging switcher, the proxy rewrite and `preview/[direction]`. Make fonts per direction (`next/font`, `preload: false` for non-active faces). Respect reduced motion. Hit WCAG 2.2 AA, Lighthouse mobile 90 or better, CLS 0. Extend the Playwright direction test and axe scans to D and E.

Commit each direction separately and push to `claude/eloquent-turing-tekcnh`. Report with desktop 1440 and mobile 390 screenshots of every section.
