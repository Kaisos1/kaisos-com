# Kaisos.com — Change Log

---

## Session 22 — Netlify config hardening

### Added
- `netlify.toml` with security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`) on all routes
- Long-term cache headers (`max-age=31536000, immutable`) for `.png`, `.svg`, `.jpg` assets
- Explicit `publish = "."` so Netlify correctly identifies the static root

### Changed
- Site renamed from `celebrated-dragon-2aff3e` to `kaisos-com` — preview URL is now `main--kaisos-com.netlify.app`

---

## Session 21 — Stock photo for gear section via Unsplash CDN

### Added
- Gear section photo: headphones + MIDI keyboard + speaker flat-lay (James Stamler / Unsplash) loaded directly from Unsplash CDN — no file to download or host
- Photo credit line below image (Unsplash license requirement)

### Changed
- `gear-setup.jpg` placeholder replaced with real CDN URL; `onerror` handler removed
- Gear photo wrapped in `<figure>` with `<figcaption>` for semantic correctness

---

## Session 20 — Mobile brand world centering + OG description update

### Fixed
- Brand world section on mobile: logo now centered, text centered, logo shrinks to 100px — previously left-aligned and looked off
- Item 8 (gear-intro i18n drift) was a false alarm — HTML and T key were already identical, no change needed

### Changed
- `og:description` and `twitter:description` updated: replaced generic lo-fi boilerplate with "Six self-released lo-fi albums from Munich. 55K+ YouTube subscribers." — credential now appears in link previews on Discord, LinkedIn, Slack, WhatsApp

---

## Session 19 — Gear spacing fix + preload KaisosPurpleGold

### Fixed
- `.gear-intro` margin-bottom restored to `3rem` — was incorrectly reduced to `2rem` last session; spacing is now correct whether `gear-setup.jpg` is present or absent
- Items 7/8 (album-card-header align-items) were already correct — no change needed

### Changed
- Added `<link rel="preload">` for `KaisosPurpleGold.png` — now used above the fold in the brand world section

---

## Session 18 — 7 improvements: brand world visual, gear photo, hero tagline, i18n fixes, OG image, Vol.5 label, copy button

### Added
- `og-image.svg` — branded 1200×630 OG card with dark background, purple blobs, Kaisos headline, tagline, stats line (55K+ · 6 albums)
- Gear photo slot: `<img src="gear-setup.jpg" onerror="this.style.display='none'"/>` — drop the file in the folder to activate; silently hidden if not present
- Vol. 5 "Not on Apple Music" badge — appears only when Apple Music is selected (`body[data-platform="apple"]`), invisible otherwise
- `hero-tagline`, `copy-link`, `copy-link-done` i18n keys added to T with EN/DE

### Changed
- Brand world section: now a split layout with `KaisosPurpleGold.png` logo left and text right — no longer a floating text block
- Hero tagline rewritten: "Ambient beats, soft melancholy, and chill hip-hop." → "Slow tempos, warm imperfection — six albums of honest lo-fi."
- Hero tagline now wired to i18n system (`data-i18n="hero-tagline"`)
- Copy-link button now wired to i18n + handler uses translated "Copied." / "Kopiert."
- OG image updated to `og-image.svg`; `twitter:image` kept as `ProfileImg.png` (Twitter doesn't support SVG)

---

## Session 17 — Fix German h1 translation, rewrite hero subtext

### Fixed
- H1 German translation was silently broken — had `data-i18n-html` but no `data-i18n` key, so switching to DE left the headline in English. Added `data-i18n="hero-h1"` and the key to T with proper DE translation

### Changed
- Hero subtext rewritten: "Made for late nights, focus, and escape." → "Six self-released albums from Munich — made in private, for the hours when everything else gets too loud." — specific, personal, not generic lo-fi boilerplate
- Both `hero-h1` and `hero-sub` now fully wired to the i18n system with EN/DE translations

---

## Session 16 — Hero credential, featured embed fix, gear copy rewrite

### Added
- 55K+ YouTube subscribers added to hero trust line — credential now visible above the fold on first impression

### Fixed
- Featured embed (music section) now has `data-apple` and `data-youtube` — no longer shows a dead empty zone when Apple Music or YouTube is selected

### Changed
- All 4 gear card descriptions rewritten from Amazon-copy language to first-person specific sentences

---

## Session 15 — YouTube subscriber count-up in stats strip

### Added
- Animated count-up counter in stats strip: counts from 0 → 55K+ when the element scrolls into view (cubic ease-out, 1.8s, respects prefers-reduced-motion)

### Changed
- Replaced generic "Lo-fi / Genre" stat with "55K+ / YouTube Subscribers"
- Removed orphaned `stat-genre` i18n key

---

## Session 14 — Footer redesign + mood card visual fix

### Changed
- Footer completely rebuilt: now has 3-column grid (brand/socials | Listen nav | Explore nav), with a clean base strip for copyright and legal — replaced the sparse single-row layout
- Footer social icons row added (Instagram, YouTube, TikTok, Spotify) using the shared `<defs>` icon system
- Mood card top-border gradients now always visible at 0.35 opacity (up from 0 — invisible) — each card now has a distinct colour identity at rest, brightens on hover
- Removed dead `.footer-left` and `.footer-links` CSS classes

---

## Session 13 — Platform toggle audit: fix all hardcoded Spotify links

### Fixed
- Latest Release "Listen Now" button now updates to the correct Apple Music / YouTube album link when platform is switched
- All 3 Mood cards (Focus, Night, Escape) now update their href on platform switch — Vol. 5 (Escape) falls back to Apple Music artist page since it has no Apple album
- Section CTA button ("Follow Kaisos on Spotify") now updates text AND href on platform switch: "Listen on Apple Music" / "Watch on YouTube"
- Latest Release button icon now also swaps with platform (Spotify → Apple note → YouTube)

---

## Session 12 — Full improvement pass: SVG dedup, mobile album grid, bio rewrite, brand world

### Added
- SVG `<defs>` block: all 7 icon paths (Spotify, YouTube, TikTok, Instagram, Apple, Apple note, Ko-fi) defined once and referenced via `<use href="#ico-..."/>` — removed ~250 lines of repeated markup
- Mobile album grid: Vol. 3–1 hidden by default, "Show all 6 albums" button reveals them — eliminates the wall of 6 stacked iframes on phones
- `.album-card-mood-row` CSS class replaces 6 identical inline `style=""` attributes

### Changed
- Artist bio: rewritten from a generic spec line to a personal 3-sentence narrative
- Brand World section: copy is now specific ("No labels, no team — just one producer in Munich…"), CTA updated to "Explore the discography →"
- `PLATFORM_CFG.svgPath` replaced by `iconId` — hero and mobile sticky CTA icons now use `<use href>` in sync with defs
- Removed hardcoded `<p class="updated-line">Updated 2026</p>` from the latest release strip

### Fixed
- Pre-footer platform picker and all platform toggle buttons now pull from defs instead of repeating full path strings

---

## Session 11 — Theme toggle in burger menu, mobile nav cleanup, dead code removal

### Added
- Theme toggle (dark/light) inside the mobile burger drawer, grouped with the EN/DE language toggle in a `drawer-controls` row

### Changed
- Mobile nav-right: hid `btn-kofi` and `#lang-toggle-desktop` at ≤900px — both were redundant with drawer versions and cluttering the mobile header
- Theme toggle now uses class-based icon selectors (`.icon-moon-svg` / `.icon-sun-svg`) so desktop and drawer toggles always stay in sync

### Fixed
- Merged duplicate hamburger `aria-expanded` listener — was wired twice, with the capture-phase one reading stale class state

### Removed
- Dead T keys with no matching `data-i18n` elements: `hero-badge`, `hero-h1`, `hero-tagline`, `hero-sub`, `btn-youtube`, `btn-merch`, `bio-text`
- Dead CSS rule `.hero-availability` (no element ever used this class)
- Stale `@media(max-width:380px){.lang-toggle{display:none}}` rule — desktop lang toggle already hidden at 900px; hiding the drawer one at 380px was wrong

---

## Session 10 — Full redesign: platform toggle, mood cards, brand world, all embeds wired

### Added
- 3-way platform toggle (Spotify / Apple Music / YouTube) in nav and mobile drawer — preference saved to localStorage, UA-detected on first visit
- Apple Music embeds for Special Release, Vol. 1–4 (Vol. 5 not on Apple Music — falls back to direct link)
- YouTube embeds for all 6 albums
- "Choose Your Mood" section with 3 cards: Focus, Night, Escape
- "Not just tracks. A quiet world." brand section between bio and music
- Section CTAs after Story, Music, Gear, and a platform picker before footer
- Merch card rewrite: "Minimal pieces for quiet creators"
- Hero rewrite: new headline, subheadline, trust line, gold outline secondary CTA

### Changed
- Hero headline → "Kaisos turns quiet moments into lo-fi worlds."
- Latest release copy → more emotional and specific
- Album cards now show mood labels (Late-night focus, Calm study beats, etc.)
- Removed "Start here" section — replaced by "Choose Your Mood"
- Removed fake listener counter and toast popup
- Platform colors only affect buttons/CTAs — purple/gold identity kept for all atmosphere
- Twitter meta tags now match OG title/description
- Iframe attributes swap correctly per platform (allow, sandbox, referrerpolicy, height)

---

## Session 9 — Smart platform detection for Listen button

### Added
- Platform auto-detection: iOS/macOS visitors default to Apple Music, others default to Spotify
- "Switch to Apple Music / Switch to Spotify" link below hero CTAs so users can override
- Preference saved to localStorage — persists on return visits
- Apple Music i18n strings (`btn-play-apple`) for EN and DE

### Changed
- Hero listen button and mobile sticky CTA now update dynamically based on detected platform

---

## Session 8 — Mobile performance + live social proof

### Changed
- Removed `saturate()` from all `backdrop-filter` rules (nav, drawer, mobile CTA) — was the main compositor cost on mobile
- Added `will-change: transform` to blobs, rings, and hero image — triggers GPU layer promotion
- Reduced blob sizes on mobile: blob-1 700px→380px, blob-2 500px→280px, blur 90px→55px
- Disabled blob-3 entirely on mobile (`display:none`)
- Disabled `ring-spin` and `glow-pulse` animations on mobile — both are decorative and expensive (glow-pulse uses `filter:blur`)

### Added
- **Listening toast** (bottom-left): pops up every ~16–26s showing a fake user + city listening to a specific album. First fires at 5s. Slides in with spring animation. Matches site design system (purple/gold, Inter).
- **Live listener counter** (bottom-right, above back-to-top): shows "X listening now" with a green pulse dot. Starts at a random number between 90–180, fluctuates ±4 every 5–9s. Hidden on mobile (conflicts with Spotify CTA bar).

---

## Session 7 — FL Studio affiliate card

### Added
- Featured affiliate card in the Gear section for FL Studio (Image-Line affiliate link)
- `.gear-featured` CSS component: full-width card with gold top gradient, responsive flex layout, gold CTA button

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
