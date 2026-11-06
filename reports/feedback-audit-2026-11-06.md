# Client feedback round (ORA World feedback thread) and audit

## Feedback points and what changed

| # | Feedback | Change |
| --- | --- | --- |
| 1 | "Make ORA World logo bigger and visible, so small" | Header logo enlarged from 56px to 76px tall on desktop (44px to 56px on mobile); header is now 96px tall on desktop to fit it. Logo files unchanged (gold on light, white over imagery). |
| 2 | "So much going on … less text … remove those numbers on the banner … move it down after banner … first impression, too busy" | Hero now shows only the headline and the two buttons. The eyebrow line and the tagline paragraph are removed from the banner. The four figures (10 acres, 129 residences, 42 hotel suites, 65,500 sq ft) moved out of the banner into their own dark band directly below it, where they count up. |
| 3 | "Can't scroll to the left and right, not working. Or just replace with the Virtual tour … this is what people want to see" | The "See the design, line by line" drag slider is removed from the homepage. The virtual tour section ("Step inside", 360° · VR) now sits in its place, higher up the page, with a clear "Open the virtual tour" button as well as the clickable image. Both open the Kuula 360° tour full screen (checked; Escape closes it). |
| 4 | "You can't see the image, take it out of the iPhone, or maybe show in like iPad … need to see the full image … more showing images, less text … restructure this" | The walkthrough is rebuilt: no phone. The renders show on a large landscape tablet whose screen is 16:9, the same shape as the renders, so every image is seen whole. Below it is a strip of six room thumbnails (Arrival, The foyer, The residence, The private suite, The terraces, The penthouse) with prev/next arrows on the image. The long paragraph per room is gone; each room keeps only its short name and one-line title. It advances on its own while on screen and stops when the visitor picks a room. No pinning. Sized so the tablet fits on a laptop screen. |
| 5 | "Overall very good, much better, but check it and look at details" | Audit below; every issue found in our code was fixed. |

## Audit

All checks ran on a production build (`next build` + `next start`).

| Check | Scope | Result |
| --- | --- | --- |
| Typecheck, lint, build | Whole project | Pass |
| Playwright suite | 38 tests, desktop and mobile (smoke flows + axe on 6 pages) | 38 passed |
| Page crawl | All 37 sitemap pages in EN and ES (74 pages) at 1440px and 390px | No issues: every page 200, no console errors or failed requests, no broken images, no missing alt text, no horizontal overflow, one h1 per page, titles present, all 78 internal links resolve |
| Accessibility sweep (axe, WCAG 2.2 AA, serious/critical) | All 74 pages at both sizes | Findings fixed (below); only YouTube's own player remains |
| Image sharpness | Home, residences, gallery, Tesoro Del Mar, amenities, ES home | 0 under-resolved, except the two source-limited photos below |

### Fixed during the audit

- Walkthrough room counter (01 / 06) was too light against the bone ground: now brass-ink.
- Portfolio "Explore" chips: white on light gold failed contrast; now white on dark brass.
- "Artist's conceptual rendering" labels on photos were hard to read on light images: now on a dark translucent pill, sitewide.
- Location map site pin: its accessible name ("Map marker") did not match its visible label; now named after the label.
- Location map place dots overlapped (too small a target when places are close). The place list beside the map is the accessible control for each place; the dots are now a mouse-only shortcut.
- Homepage gallery carousel dots were 8px targets; now 24px hit areas (dot looks the same).
- Virtual tour page poster button: its name did not include its visible caption; fixed.

### Not fixable on our side

- `/virtual-tour`: two axe findings are inside YouTube's embedded player (its own markup).
- `/amenities`: two photos are slightly under-resolved on high-density laptop screens because the client's source files are small: `060family.jpg` (1024px wide) and `010pet-1.jpg` (1920px wide). Larger originals from the client would fix this.
