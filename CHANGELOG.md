# Kaisos.com — Change Log

---

## Session 1 — Initial changes

### Added
- TikTok link `https://www.tiktok.com/@lofikaisos` added to:
  - Desktop nav icons
  - Mobile drawer socials
  - Connect section social list
  - Schema.org `sameAs` array

### Changed
- Tab favicon → `Kaisoslogoblack.png` *(later reverted, see Session 3)*
- Nav logo text `Kaisos` → `KaisosGold.png` image *(later reverted, see Session 2)*
- Footer logo text `Kaisos` → `KaisosGold.png` image *(later reverted, see Session 2)*

---

## Session 2 — Merch + logo size

### Added
- Merch link `https://kaisos-shop.fourthwall.com/en-eur` added to:
  - Desktop nav center (gold color to stand out)
  - Mobile drawer
  - Connect section social list
  - Footer links
  - `dns-prefetch` for `kaisos-shop.fourthwall.com`

### Changed
- `KaisosGold.png` nav logo progressively enlarged: 28px → 36px → 38px → 52px → 70px
- `KaisosGold.png` footer logo progressively enlarged: 22px → 28px → 30px → 40px → 54px
- Nav height raised 68px → 84px to fit larger logo
- Mobile drawer `top` raised 68px → 84px to match
- Hero `padding-top` raised 100px → 120px; mobile 80px → 100px

### Reverted (end of Session 2)
- Nav/footer logo back to text `Kaisos` (user preference)
- Nav height back to 68px, drawer top 68px, hero padding 100px / 80px mobile

---

## Session 3 — 20 improvements

### Head / Meta
- Added `<meta name="color-scheme" content="dark light">`
- Added `og:image:width` (1200) and `og:image:height` (630)
- Added `dns-prefetch` for `www.tiktok.com`
- Added `preload` for `KaisosGold.png` *(removed later when logo reverted)*

### CSS
- `scroll-padding-top: 74px` on `html` — fixes nav covering section headings on anchor click
- Progress bar height 2px → 3px
- Removed dead `.album-embed` CSS (defined but never used)
- Added `:has(iframe:not([src]))::after` placeholder — shows "Accept cookies to load music" instead of blank grey boxes
- Nav `.nav-merch-link` style — Merch link styled gold to stand out from section links

### HTML
- `type="button"` added to all 13 `<button>` elements
- `aria-label="Kaisos — back to top"` added to nav logo link *(kept as `aria-label` on plain text link)*
- Footer logo `54px → 38px` + `loading="lazy"` *(reverted to text in this session)*
- Footer `<div>` → `<nav aria-label>` *(reverted next session due to layout break)*
- TikTok button added to platforms-row in Music section
- Merch card added to Connect section right column (above Ko-fi)
- Cookie notice: `role="region"` + `aria-label="Cookie consent"` + `aria-live="polite"`
- "Shop Merch →" ghost button added to hero CTAs

### JavaScript
- Progress bar divide-by-zero fix (`scrollable > 0` guard)
- Scroll reveal `rootMargin: '0px 0px -40px 0px'` — elements reveal earlier
- Active nav link now set on page load (`updateActiveNav()` called once)
- `about` added to sections tracking array (was missing)
- Waveform resize handler debounced (200ms)
- Waveform skips build under `prefers-reduced-motion`
- Dynamic `theme-color` meta updates when toggling dark/light mode
- `updateNav()` called on init (nav border correct on page refresh mid-scroll)
- i18n key `btn-merch` added for hero merch button

### Images optimized (bonus)
- `KaisosGold.png`: 2013KB (1536×1024) → 82KB (400×267) — 96% smaller
- `Profileimage.png`: 1949KB (1254×1254) → 752KB (760×760) — 62% smaller
- Originals backed up as `KaisosGold.bak.png` / `Profileimage.bak.png`

### Reverted (within Session 3)
- Footer `<nav>` → back to `<div class="footer-links">` (caused layout break)

---

## Session 4 — Color palette update

### Changed
- Gold: `#d4a847` → `#d4a017`
- Accent / Purple: `#9b5cff` → `#5b2a86`
- Hover accent: `#a96dff` → `#7b3ab6`
- Light mode gold: `#a07820` → `#9a7608`
- Light mode accent: `#7a3dff` → `#5b2a86`
- All 18 rgba variants updated proportionally
- Total 23 color tokens replaced across the file

---

## Session 5 — Gold color hierarchy

### Goal
Make gold feel premium and intentional. Reserve it for primary actions only; move decorative/secondary elements to accent purple or muted.

### Gold kept (primary CTAs + brand identity)
- Nav logo `Kaisos` text
- `btn-primary` (Listen on Spotify) — text + hover border
- `btn-kofi` (Support button in nav) — text + hover border
- `kofi-btn` (Buy me a coffee) — text + hover border
- `nav-merch-link` — Merch nav link
- `footer-logo` — brand text
- `mobile-spotify-cta` — mobile sticky CTA text
- Merch card button (`background:var(--gold)`)
- Cookie accept button text
- Progress bar gradient (subtle)

### Changed gold → accent or muted (27 changes)
| Element | Before | After |
|---|---|---|
| Nav drawer link hover | gold | muted2 |
| Hero badge text + border | gold | accent |
| Badge dot | gold | accent |
| Ghost buttons (YouTube/Merch hero) | gold border + text | accent border + muted2 text |
| Photo ring-2 dot | gold | accent |
| Profile photo glow | accent+gold | pure accent |
| Profile photo border ring | gold 22% | accent 30% |
| Stat values (Lo-fi, 2024, Munich, FL Studio) | gold | white |
| "View all on Spotify →" arrow | gold | accent |
| Quote blockquote text | gold | muted2 |
| Waveform gold bars | gold | accent (35% opacity) |
| Waveform text | gold | muted |
| Gear card top highlight line | gold | accent |
| Gear numbers (01, 02, 03) | gold | muted |
| Gear "View on Amazon →" links | gold | accent |
| Ko-fi card top border gradient | accent→gold | pure accent |
| Footer links hover | gold | accent |
| Theme toggle hover | gold | accent |
| Modal links | gold | accent |
| Footer button hover | gold | accent |
| Cookie notice link | gold | accent |
| Latest Release badge | gold | accent |
| Album card hover border | gold | accent |
| "Start here" eyebrow | gold | accent |
| Start path "Listen →" links | gold | accent |
| Mobile Spotify CTA hover border | gold | accent |

---

## Session 6 — Favicon revert + changelog created

### Reverted
- Tab favicon: `Kaisoslogoblack.png` → back to inline SVG "K" icon
  - SVG uses updated colors: gold `#d4a017`, accent `#5b2a86`

### Added
- This `CHANGELOG.md` file

---

## Current state summary

| Item | Value |
|---|---|
| Tab favicon | Inline SVG — italic K, dark bg, gold text, purple dot |
| Nav logo | Text `Kaisos` — Playfair Display, gold |
| Footer logo | Text `Kaisos` — Playfair Display, gold |
| Gold color | `#d4a017` |
| Accent color | `#5b2a86` |
| Nav height | 68px |
| Socials in nav | Instagram, YouTube, TikTok, Spotify |
| Merch link | `https://kaisos-shop.fourthwall.com/en-eur` |
| TikTok link | `https://www.tiktok.com/@lofikaisos` |
| Images | KaisosGold.png (82KB), Profileimage.png (752KB) |
