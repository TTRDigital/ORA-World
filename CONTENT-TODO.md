# CONTENT-TODO — everything still needing real data

Every item below is either marked `[[PLACEHOLDER]]` in the CMS/seed, flagged with a `placeholder: true` field (which renders a visible "Placeholder · to be confirmed" label), or uses a stand-in image. Nothing has been invented: unit counts, prices, sizes, dates and names only appear when they come from oraworld.com.

## 1. Facts and numbers

| Item                                                                              | Where it shows                                         | Status                                                                                                                                                                                    |
| --------------------------------------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero stats (10 acres · 129 residences · 42 hotel suites · 65,500 sq ft amenities) | Homepage hero bar                                      | Real, published for **Tesoro Del Mar** on oraworld.com. Confirm these are the right project for the brand homepage.                                                                       |
| "100% backup power coverage" counter                                              | Resilient by Design                                    | Placeholder (flagged). Replace with the real figure or remove.                                                                                                                            |
| Residence collections: bedrooms, interior size ranges, "from" prices              | Residences, homepage preview, investment pricing table | All `null` → "Details to be confirmed" / "Pricing on request". Supply per collection.                                                                                                     |
| Floor plans (6 illustrative plans A1, B1, B2, C1, V1, PH1)                        | Floor plan library, detail, compare                    | Entirely illustrative SVGs labeled "Illustrative placeholder plan". Supply architect plans (PDF + image), keyplans, unit positions, sizes, orientations, floors, status.                  |
| Finishes and materials brands                                                     | Collection pages                                       | `[[PLACEHOLDER: brand]]` for cabinetry and appliances.                                                                                                                                    |
| Deposit schedule and timeline (percentages, dates, estimated delivery)            | Investment                                             | All placeholders. Also depends on the offering plan being filed.                                                                                                                          |
| Points of interest: drive/walk times                                              | Location map, homepage map                             | Estimates flagged with "approx. · to be confirmed". Only "30 minutes to the airport" and "walking distance to Balneario Cerro Gordo" are published. Medical center name is a placeholder. |
| Site coordinates (18.484, -66.335)                                                | Map pin, directions link                               | Approximate (near Cerro Gordo, Vega Alta 00692). Confirm exact parcel coordinates.                                                                                                        |
| Hotel suites ownership model                                                      | Residences > Hotel Suites                              | `[[PLACEHOLDER]]`.                                                                                                                                                                        |

## 2. People, partners, press

| Item                                                                                 | Status                                                                                                      |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| Architect, interior designer, landscape architect (names, bios, portraits, websites) | Placeholders on The Team and the homepage Collaboratory. Only ORA World / TRPbuildco LLC (sponsor) is real. |
| Press articles and outlets                                                           | Three placeholder entries so the Press Center and marquee work. Replace or delete. Media kit file missing.  |
| Careers: open positions                                                              | Placeholder paragraph.                                                                                      |
| Hotel development: operator, brand partnership, investment structure                 | Placeholder paragraph.                                                                                      |
| Broker co-op / commission terms, broker kit PDF                                      | Placeholder copy; file missing.                                                                             |

## 3. Contact and commerce

| Item                                                              | Status                                                                                                            |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Sales gallery address, opening hours                              | Sponsor address used (Tesoro Del Mar, Dorado, Vega Alta, PR 00692). Confirm the sales gallery location and hours. |
| Phone, WhatsApp, email                                            | Not published anywhere. Empty until provided (env or Sanity). Call/WhatsApp buttons hide automatically.           |
| Social links                                                      | Instagram/Facebook/X/YouTube point to the network home pages, as on the live site. Supply handles.                |
| Booking URL (Calendly / Cal.com)                                  | Empty; the contact page shows the request form fallback.                                                          |
| Client portal "Log In" URL                                        | Defaults to oraworld.com/login.                                                                                   |
| CRM webhook URL + secret, Turnstile keys, Resend key, GTM/GA4 ids | Env vars, see README.                                                                                             |

## 4. Media

| Item                                           | Status                                                                                                                                                                                                                                                    |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hero film** (`assets-source/hero-video.mp4`) | **Missing from the repository.** The pipeline (`pnpm video:build`), the poster-first hero, the loop and the "Watch the film" lightbox are built; the hero shows the Tesoro Del Mar render until the film lands. The "888" signage question is still open. |
| Brochure PDF and designed spreads              | Missing. The flipbook shows six renders as placeholder spreads.                                                                                                                                                                                           |
| Walkthrough film for the Virtual Tour page     | Missing; the Kuula 360° collection from the live site is embedded.                                                                                                                                                                                        |
| Floor plan PDFs                                | Missing.                                                                                                                                                                                                                                                  |
| Team portraits                                 | Placeholder SVG.                                                                                                                                                                                                                                          |
| Gallery "Construction" category                | One placeholder entry.                                                                                                                                                                                                                                    |
| Menu hover imagery                             | Empty in seed (`menuImages`), add one image per menu item in Site settings.                                                                                                                                                                               |

### Images in use and their provenance

Client-owned renders and photography were taken from oraworld.com (`docs/source/oraworld-com/image-urls.txt`) and optimised into `public/images/client/`. Several of the lifestyle photographs on the live site appear to be stock imagery (one file is literally `iStock-2231329012.jpg`); **confirm the client's licenses cover reuse on the new site**: `010pet-1`, `015discover`, `027entertaiment`, `030transportation`, `031cultural`, `032family`, `033sustainability`, `035sport`, `042spa`, `055fitness`, `056watersport`, `057culinary`, `058entertainment`, `059adventure`, `060family`, `062educational`, `063shopping`, `064additional`, `istock-2231329012`, `05theplace-1`.

Free-license placeholder (replace before launch):

| File                                                         | Source                                                                         | License / credit                 |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------ | -------------------------------- |
| `public/images/free/bio-bay-vieques.jpg` ("The sea" chapter) | Wikimedia Commons, "Mosquito bay, Bioluminescent bay, Vieques - panoramio.jpg" | CC BY 3.0, Panoramio contributor |

Wikimedia Commons searches for El Yunque, Old San Juan, Dorado beach and TPC Dorado golf were rate-limited during the build; candidates (all CC BY / CC BY-SA) are listed in the session notes and can be fetched later with `scripts/images-build.mjs`.

## 5. Copy to review

- Spanish translations were written in-house (neutral Latin American Spanish). A native Puerto Rican reviewer should pass over `messages/es.json` and the `es` fields in `src/content/seed/*`.
- Legal notice is verbatim from the live site and intentionally left in English on the Spanish site. Confirm with counsel whether a Spanish rendering is required.
- Privacy policy, terms and accessibility statement are drafts marked for counsel review.
- Act 60 content is reproduced from the live site with "consult your advisor" disclaimers; a tax professional should review before launch.

## 6. Open decisions

1. Which project is the flagship for the brand homepage (the film tower vs Tesoro Del Mar)?
2. Brass accent `#A8864F` (new) vs the current site gold `#A59228`.
3. Which of the three directions (A Travertine Editorial, B Basalt Cinema, C Caribbean Light) goes to production. Production serves A until changed in `src/app/(site)/[locale]/page.tsx`.
4. Sanity: create the `ora-world` dataset (or a dedicated project) so the Studio and seed can be used; see README.
