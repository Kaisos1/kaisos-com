# Kaisos.com — Change Log

---

## Session 57 — Hero is now the newest album (index)

### Changed
- Hero rebuilt to lead with the newest album (Quiet Chaos): cover + inline
  Spotify play card + platform links; `id="listen"` moved onto the hero

### Removed
- Standalone "Now Playing" section — folded entirely into the hero (killed
  duplicated cover, "newest album" line, and 55K proof); dropped dead CSS
  (.hero-ctas, .np grid, .np-txt, .np-proof)

---

## Session 56 — Fan signup form + mobile-only Spotify CTA (index)

### Added
- Netlify-backed fan signup form in the Connect section (email + optional
  message, honeypot spam guard, AJAX submit with inline success state)

### Changed
- Floating "Listen on Spotify" CTA now shows on mobile only (hidden ≥901px)

---

## Session 55 — Switch contact email to contact@kaisos.com

### Changed
- All contact/press email links now point to `contact@kaisos.com`
  (was `cengiz.adnan93@gmail.com`) across index, merch, press

---

## Session 54 — Restore stats + floating Spotify CTA, fix JS caching (index)

Brought back beneficial pieces the redesign dropped, and fixed the stale-cache
issue that made the new burger menu appear broken on already-visited devices.

### Added
- **Stats band** (restored from pre-redesign): 55K+ subscribers · 8 releases ·
  since 2024 — social proof, styled in the current serif/gold system
- **Floating "Listen on Spotify" CTA** that slides in once the hero scrolls out
  of view (IntersectionObserver, links to the artist page)

### Fixed
- `*.js` and `site.css` now `max-age=0, must-revalidate` (were `max-age=3600`),
  so a deploy is picked up immediately instead of up to an hour later — this is
  why the burger menu looked dead after the last push (phone had cached the old
  `main.js`)

### Audit note
- Reviewed everything the redesign removed vs the pre-redesign version. Kept out
  on purpose: the WebGL nebula + 3D tilt hero (heavy, hurts load speed; the
  bokeh orbs are the lighter stand-in). Everything else beneficial (social
  links, support cards, discography, legal modals) was already preserved.

---

## Session 53 — Remove ambient rain toggle (index)

Dropped the generative "rain" ambience button entirely.

### Removed
- `.rain-btn` markup, all its CSS, the `eq` equaliser keyframe, and mobile /
  reduced-motion rules for it
- The Web Audio rain generator (`RAIN` block) from `main.js`
- The "Ambient Sound" note from the privacy modal

---

## Session 52 — Mobile burger menu (index)

The homepage nav hid its links at ≤900px with nothing to replace them — mobile
had no navigation at all. Added a proper burger + full-screen drawer.

### Added
- `.nv-burger` (animates to X) + full-screen `.drawer` with centered serif links
  (Listen / Releases / Story / Merch) and a Support CTA
- Drawer JS in `main.js`: iOS-safe `position:fixed` scroll lock, closes on link
  tap, backdrop tap, or Escape

### Changed
- ≤900px: desktop Support pill moves into the drawer; top bar is now logo · rain
  · burger

---

## Session 51 — Externalize page scripts (index + merch)

Moved the inline `<script>` blocks out of `index.html` and `merch.html` into
`main.js` and `merch.js` (loaded `defer`). Markup and visuals unchanged.

### Changed
- `index.html`: inline homepage script → `<script defer src="/main.js">`
- `merch.html`: inline script → `<script defer src="/merch.js">`
- `main.js` / `merch.js`: now hold the reveal, nav-state, legal-modal (and
  homepage bokeh/facade-embed/rain) handlers verbatim — cacheable, non-blocking

### Fixed
- Restored the `album[]` JSON-LD (all 8 releases) on the `MusicArtist` schema —
  it had been dropped during the redesign; brings back rich-result eligibility
  for the discography in search

---

## Session 50 — Mobile polish pass (index + merch)

Adversarially-verified mobile-only audit across overflow, touch targets, nav,
typography, and interaction. 27 confirmed fixes; all scoped to small viewports
so desktop is untouched. Design/palette/fonts unchanged.

### Fixed
- **iOS scroll-lock:** drawer/modals now lock the body with `position:fixed` +
  saved offset (was `overflow:hidden`, which iOS Safari ignores — page used to
  rubber-band behind the drawer)
- Touch targets ≥44px: footer social icons (both pages), modal close ×, footer
  legal buttons; broadened the tap-target query to `any-pointer:coarse` (covers
  hybrid touch laptops)
- WebGL canvas no longer reallocates on every mobile address-bar height change
  (pure-height resizes ignored on touch)
- `-webkit-tap-highlight-color:transparent` kills the grey tap-flash

### Added
- Drawer focus trap; drawer auto-closes when resizing back to desktop
- merch: nav "Shop Now" fades out once the bottom shop bar appears (was a
  duplicate CTA); reduced-data hides hero blobs
- Touch fallbacks: discography play button + `.soc` rows now show affordance/
  feedback without hover; landscape-phone hero block (shorter padding + deck)

### Changed
- Readability on phones: bumped sub-14px text (eyebrows, marks, product/disc
  labels, stat labels, modal subheads), tightened wide letter-spacing, reduced
  story/connect line-height; `--fs-h2` now scales down to 1.75rem at 320px
- merch: drop price 2.4→2rem on phones; merch back-arrow hidden ≤560px (logo
  already links home)

---

## Session 49 — Multi-agent review pass on index + merch

Adversarially-verified review across bugs, a11y, perf, SEO, and polish. 30
confirmed findings applied to `index.html`, `merch.html`, and shared `site.css`.
Design, palette, fonts unchanged.

### Fixed
- **Contrast (AA):** shared `.nav-cta` was gold-on-purple (1.87:1) — now white
  on purple (5.75:1); this also un-breaks the live CTAs on music + press pages
- `merch` LCP hoodie no longer lazy-loaded — now `fetchpriority="high"` + a
  matching `<link rel=preload as=image>` for the cross-origin CDN image
- `aria-expanded` on the mobile burger now writes the string `"true"`/`"false"`

### Added
- `merch`: `<main id="main">` landmark + skip-link retargeted to it; `<nav>`
  `aria-label`; `No. 01` index on the Drop (sequence now 01–06, matches copy)
- `merch`: hover scale on the Drop hoodie; ghost CTA variant so only the
  entry/exit buttons stay solid gold; `load` listener re-measures the shop-CTA
  threshold; `decoding="async"` on all product images
- `merch` JSON-LD `isPartOf`/`about` linking the CollectionPage to the site graph
- `--accent-hover` token (replaces hardcoded `#9a4ad8` in both pages)
- `plausible.io` preconnect; merch-specific `og:image:alt`

### Changed
- Decorative `→` arrows marked `aria-hidden` across both pages; `product-index`
  numbers hidden from the a11y tree
- Removed redundant `<picture>` wrappers (webp source == img src) on all 9
  index covers; absolute icon paths; unified `scroll-padding-top` at 76px
- `merch` reduced-motion now also stills the shop-CTA + Drop image transitions;
  Drop "+ shipping" label matches product-card typography; hero blur 80→60px

---

## Session 48 — A11y polish + working legal deep-links

Refined index + merch to newer revisions. Accessibility, micro-polish, and one
real fix: the merch footer's Privacy/Impressum links now actually open the
homepage modals instead of dead-landing. Design, palette, fonts unchanged.

### Added
- Deep-link legal modals — `/#privacy` and `/#impressum` (linked from merch)
  open the matching modal on load, then `replaceState` strips the hash
- Mobile drawer Ko-fi "Support" CTA (desktop parity)
- merch: `robots` index/follow meta, skip-link styles, `:focus-visible` ring

### Changed
- Semantic `<nav>` + `aria-label` on primary nav and mobile drawer
- `text-wrap:balance` on all headings; `:active` press states on every button;
  mobile shop CTA shadow; product footer wraps on narrow screens
- merch footer restructured into a dedicated `.footer-legal` group

### Removed
- Eyebrow `data-num` roman numerals (I–IV) on index section labels

---

## Session 47 — Distinctive pass: signature moments + chapter index

Multi-agent audit (4 design lenses → director pressure-test) into a tight,
on-brand enhancement set. One signature moment per page plus a unified
"chapter-numbering / music-metaphor" finishing system. Palette + fonts
unchanged; every effect reduced-motion gated; zero new dependencies.

### Added
- `.reveal--settle` — Cormorant display headings resolve from a soft blur as
  they enter (piggybacks the existing observer, zero new JS); applied to the
  hero h1 + every section h2 on both pages
- Sitewide chapter index: Story I–IV → eyebrow numerals (`data-num`) →
  merch catalogue "No. 0X" plate numbers → The Drop "01"
- Story drop-cap (italic Cormorant initial, violet glow)
- Discography cover scan-line sweep on hover (one-shot, GPU-cheap)
- Needle-drop embed load — Spotify facade spins up and swaps in on iframe load
  (1600ms fallback), masking load latency; all security attrs preserved
- Scroll-spy nav — the hover underline now tracks the section you're reading
- Progress bar playhead — glowing gold dot at the leading edge (both pages)
- merch **The Drop** — the Lofi Hoodie lifted out of the grid into a full-bleed
  editorial feature (violet wash + ghost-K watermark matching the homepage)

### Changed
- Copy pass killing template tells: "Listen now"→"Press play", "Buy Now"→
  "Take one home", "Shop the full collection"→"Wear the quiet", marks strip,
  brand-strip + gear-intro body rewritten in Kaisos's quiet voice

### Removed
- Dead `.product-card-featured` / `.featured-badge` rules (the only featured
  card became The Drop)
- Retired the legacy `classic.html` page, its `_redirects` rule, nav links,
  and unused `og-image.svg` source

---

## Session 46 — Premium remaster: landing page + merch page

Full editorial remaster guided by a 6-dimension audit. Governing principle:
subtraction — one atmosphere layer, one signature motion, covers sit flat.
Palette and fonts unchanged.

### merch.html (same premium pass)
- Removed the scrolling purple ticker → quiet static marks strip
  (Ships Worldwide · Independent Label · Dark Tones · Made in Munich)
- Flattened product cards (dropped `backdrop-filter:blur`); section rhythm now
  uses the shared `--space-*`/`--fs-*`/`--glow-*` scales
- Copy tightened: hero "Wear the world" → "Pieces for quiet creators."
- Head cleaned: dropped `rel=sitemap` + divergent twitter:title/description/image;
  `apple-touch-icon` → 180px icon; explicit `width`/`height` on all product imgs
- Consolidated two scroll listeners into one rAF-throttled handler;
  `content-visibility:auto` on brand-strip/CTA/footer
- Added Merch to the desktop nav on index.html (was drawer/footer/card only)

### index.html landing page

### Added
- Skip-to-content link (first focusable element)
- Shared token scales in `site.css`: `--space-*`, `--fs-*`, `--glow-violet/gold`
- `prefers-contrast:more` + `forced-colors:active` support in `site.css`
- `content-visibility:auto` on `#story`/`#gear`/`#connect`/footer (cheap INP win)
- `<h2>` for the Gear section (fixes heading-outline skip)
- `apple-touch-icon.png` (180×180, ~12KB) — replaces the 1.2MP Logo.png as touch icon
- Footer mobile breakpoint (`.ft-inner` stacks 1fr/1fr below 560px)
- Embed iframe now injected with `sandbox` + `referrerpolicy`

### Changed
- Hero → editorial-asymmetric (oversized Cormorant headline, cover as quiet anchor)
- "The Hall of Rooms" 3D carousel → clean responsive discography grid (now primary)
- Discography hover reduced to one quiet state (lift + caption); dropped cursor spotlight
- WebGL nebula: 3 octaves (was 4), gold derived from existing noise (dropped 2nd fbm),
  ~30fps cap, 0.75× internal resolution <900px, RAF stops when hero scrolled past
- Greys lifted for AA contrast (`--muted`/`--muted2`), `--accent-text` brightened
- Copy tightened throughout (hero, CTAs, discography, stats, connect, support);
  dropped the "rooms/worlds/doorway" metaphor pile-up
- JSON-LD: `@graph` with WebSite + MusicArtist; invalid `MusicSingle` → `MusicAlbum`
  with `albumReleaseType`; `numberOfAlbums` corrected to 7
- Nav label "The Hall" → "Releases"; mobile drawer now locks body scroll
- Section rhythm now uses the `--space-*` scale (dense Gear vs open Hero/Story)

### Removed
- Scrolling album-title marquee (hobby-coded, duplicated the grid)
- Live-canvas SVG grain overlay + WebGL scroll-warming zone + duplicate shader vignette
  (static grain retained only in reduced-motion / no-WebGL fallback)
- 3D Hall carousel JS (drag, click-swallow, arrow state, focus-centering)
- Hero "Now playing · the latest world" tag (false affordance)
- Dead `--gold-dim` token, dead `.ft-home` rule, divergent twitter:title/description,
  non-standard `rel=sitemap` link, cargo-culted apple-mobile-web-app metas
- `backdrop-filter` on `.quote`/`.support-card`/footer (kept on nav + modals only)

### Fixed
- Modal Tab-trap hardened (guards empty focusables, scoped to `.modal-panel`)
- German legal text wrapped in `lang="de"` for correct screen-reader pronunciation
- Back-to-top nudged to `bottom:1rem` on mobile (clears thumb zone / CTA buttons)
- Sitemap `lastmod` for index bumped to 2026-06-04

---

## Session 45 — Align subpage design to index + mobile nav fixes

### Added
- Shared `.nav-right`/`.nav-cta` (+`.gold`) nav-CTA system in `site.css`
- `.nav-cta` to `press.html` (Press & Booking) — page had no nav CTA before
- `-webkit-backdrop-filter` on subpage cards for iOS Safari <16

### Changed
- music/merch/press navs unified: logo + collapsible back + CTA
- Cards aligned to index glass style — translucent bg, blur(8px), 12px radius
- Buttons standardised to 4px radius; nav CTA now gold-on-purple signature
- `eyebrow-dot` given glow to match index `.hb-dot`
- Sitemap `lastmod` bumped to 2026-06-03 for music/merch/press

### Fixed
- press `.btn-ghost` recoloured purple → gold to match index
- `.nav-back` gains `aria-label` so it keeps a name when label hides ≤560px
- Buy/CTA buttons added to coarse-pointer 44px tap-target rule

---

## Session 44 — Remove intro "Enter the world" splash overlay

### Removed
- `index.html` entry-threshold splash overlay (`#enter`) — markup, CSS,
  `enter-veil`/`enter-line` keyframes, `--z-enter` token, noscript +
  reduced-motion rules, and the cleanup IIFE
- site now paints straight to the hero on load

---

## Session 43 — Scoped subpage re-audit (Web-Builder critic re-gate → SHIP)

Independent fresh audit of merch/404/music/press. Critic filed 5 tickets,
patched inline, re-gated → SHIP. 404 clean.

### Added
- `press.html` EPK now functions for media: download links (press photo,
  logo, cover PNG) + public press/booking `mailto:` contact
- `music.html` `.eyebrow-dot` styling + `pulse-dot` keyframe (hero eyebrow
  dot was an invisible zero-size span)

### Changed
- `press.html` bio reworded — removed doubled "too loud" phrase
- `press.html` caption inline `style` → scoped `.photo-note` class

### Fixed
- `merch.html` fixed mobile shop-CTA bar no longer overlays the footer
  link (footer `padding-bottom` added under ≤900px)

---

## Session 42 — Kaisos-Web-Builder 3-agent audit (critic → architect/stylist → re-gate)

Ran the `Kaisos-Web-Builder` audit protocol: critic diagnosed + filed 9 tickets into `build.contract.json`, architect/stylist patched by ownership, critic re-gated → **SHIP** (checklist passed, all tickets fixed). No blockers found — mature site; these close real a11y/security/cohesion gaps.

### Added
- **Shared subpage atmosphere** (`site.css` `.tex-bg`/`.tex-grain`/`.tex-vig`) — CSS-only static nebula + film grain + vignette, ported from the homepage's WebGL look, wired into all 5 subpages (music/merch/press/404/links). Layers are `position:fixed;z-index:-1;pointer-events:none` (above the base bg, below all content — never washes out text); grain gated under `prefers-reduced-data`. Closes the premium-cohesion gap where subpages looked like a cheaper template next to the immersive home
- **Content-Security-Policy** in `netlify.toml` — scoped `script/style/img/frame/connect-src` (allows inline + Plausible + the three embed origins + Fourthwall CDN; blocks nothing the site uses)
- **≥44px touch tap targets** (`site.css`, coarse-pointer media query) — `.nav-back`/`.footer-back`/`.plat-btn`/`.disco-link`/`.ptog-btn`/`.btn-listen`/`.release-plat-btn`; desktop untouched
- `index.html` `preconnect` for `embed.music.apple.com` (parity with music.html)

### Changed
- `index.html` legal modals now toggle `inert`+`aria-hidden` (closed dialogs leave the tab order / SR tree; focus-trap + Escape preserved)
- `index.html` mobile drawer: Escape-to-close (returns focus to burger), outside-click close, focus moves into drawer on open
- `index.html` releases framing standardized — "Eight self-released titles — seven albums and a single" (was "Self-released Records"); `music.html` hero "seven albums and a single" (was "six lo-fi albums and a new single"). 8 releases = 7 albums + 1 single, consistent across home/music/press/JSON-LD
- `links.html` Merch icon → single clean fill path (was mixed fill+stroke, rendered inconsistently)

---

## Session 41 — Deep audit: consistency + perf cleanups

Full-folder critical pass over every page and config. The site is mature (post-tribunal); this fixes the small consistency/perf gaps that remained, no churn on the polished homepage.

### Changed
- `color-scheme` unified to `dark` across all pages (`music`, `merch`, `press`, `links`, `404`, `classic`). They declared `dark light` despite the site being dark-only — on a light-mode OS that lets native scrollbars/UI render light against the dark design. `index.html` was already correct
- `merch.html` brand-strip "stream now" link `index.html#music` → `/#music` (clean-URL convention used everywhere else; `index.html` isn't covered by the `*.html → pretty` redirects)
- `links.html` social-profile links (Spotify, YouTube, Apple, Instagram, TikTok) now carry `rel="me"` — identity consistency with the rest of the site, and rel-me matters most on the link-in-bio page

### Added
- `merch.html` `dns-prefetch` + `preconnect` to `https://cdn.fourthwall.com` — every product image (LCP once scrolled) loads from there; warms TLS before the grid enters view

---

## Session 40 — Tribunal design pass: accessible Hall + cleanup

Ran an adversarial design review (Defender vs Challenger vs Judge) over the homepage. Shipped the unanimous verdict: fix the Hall's scroll-trap + keyboard inaccessibility, dedup CTAs, clean dead/duplicate CSS, harden motion/data fallbacks. Rejected as churn: any motion lib, font swap, bento re-layout, or gutting the WebGL nebula.

### Changed
- **Hall of Rooms** no longer hijacks vertical mouse-wheel scroll (was trapping readers mid-page). Horizontal walk is now via native sideways scroll/trackpad, drag, or the new arrow buttons — vertical page scroll always passes through
- `index.html` Latest section: removed the standalone green "Listen Now" button (redundant with the inline player below it); Spotify now sits in the platform row alongside Apple Music / YouTube
- `--muted` token `#837c96` → `#8f88a0` (site.css) — better legibility on the smallest uppercase labels, hierarchy with `--muted2` preserved
- `#progress` bar reconciled to 2px in `site.css` (removed the duplicate inline rule in `index.html`)

### Added
- **Hall arrow controls + hint** (`.hall-nav`) — visible "drag / scroll / arrows" affordance, shown only when the 3D carousel is active; left/right arrows scroll by ~one viewport, auto-disable at each end
- **Keyboard access to the Hall** — `focusin` centers any tabbed-to card (off-center cards were dimmed to 0.42 opacity but still focusable links with no way to reach them)
- `prefers-reduced-data` now short-circuits the WebGL nebula (CSS gradient fallback stays), alongside `prefers-reduced-motion`

### Removed
- Dead `.hall-hint{display:none}` rule (the hint was never built — now it is)
- Dead `.btn-fill` / `.btn-fill:hover` CSS (only the removed Listen Now button used it)
- Duplicate `#progress` rule from `index.html` inline styles

---

## Session 39 — Promote immersive page to homepage

Compared the three homepage candidates (old `index.html`, `experience.html`, `kaisos3d.html`). `experience.html` was the best-crafted (WebGL atmosphere, 3D tilt deck, "Hall of Rooms" horizontal walk, cleanest code) but was `noindex`. Promoted it to the canonical homepage; retired the other two.

### Changed
- `index.html` is now the former `experience.html` content (WebGL nebula, tilt deck, hall of rooms, click-to-load embeds), promoted from `noindex` to the canonical, indexed homepage
- Ported the full homepage SEO head onto it: `robots: index,follow`, `canonical https://kaisos.com`, MusicArtist JSON-LD (8 albums), OG + Twitter cards w/ image dims + alt, sitemap link, apple-mobile metas, dns-prefetch/preconnect for Apple/YouTube
- `sitemap.xml`: homepage `lastmod` → 2026-06-03

### Added
- Ported the legally-required **Impressum** + **Datenschutzerklärung** modals (with CSS + open/close/ESC/focus-trap JS) and footer Privacy/Impressum links onto the new homepage — these only existed on the old index and would otherwise have been lost
- Plausible + `/analytics.js` script tags onto the new homepage (parity with the rest of the site)
- `classic.html` — the old homepage preserved at `/classic` (set `noindex`, canonical → `/classic`) as a fallback
- `_redirects`: `/classic.html → /classic`; `/experience` and `/kaisos3d` (+ `.html`) → `/` 301

### Removed
- `experience.html` (became `index.html`), `kaisos3d.html` (weakest candidate — reused a frozen snapshot of the old index's CSS)

### Note
- No cookie-consent banner on the new homepage: its embeds are click-to-load (the click *is* the consent), which is cleaner than the old consent-gated auto-loader. Privacy modal wording updated to match.

---

## Session 38 — Analytics & conversion instrumentation

Site was strategically blind: 37 sessions of optimization with no way to know which of the ~11 listen/follow CTAs anyone uses. This adds measurement before any data-driven CTA cuts.

### Added
- `analytics.js` (new) — one delegated, capture-phase click listener for the whole site, no per-link markup. Fires Plausible custom events:
  - **Outbound** `{platform, location, url}` — every external link (spotify/apple/youtube/kofi/merch/instagram/tiktok/amazon/fl-studio/other), labelled by nearest section id (`home`, `latest`, `music`, `story`, `gear`, `connect`, `footer`)
  - **Hero Play** — `#hero-play-btn`
  - **Embed Switch** `{platform, location}` — `.ptog-btn[data-p]` player toggles (also on `music.html`)
- Plausible Analytics (`script.js`, cookieless, GDPR-clean) + `analytics.js` loaded on all 6 pages: index, links, music, merch, press, 404
- `netlify.toml`: 1h cache header for `analytics.js`

### Changed
- `index.html`: Privacy policy modal — added transparency line on Plausible (cookieless, aggregate-only, no cross-site tracking) with link to their policy

### Note
- Inbound UTM tagging of social bio links is done on the platforms (Instagram/TikTok/YouTube), not in the repo — see session handoff for the ready-to-paste URLs
- CTA cuts deferred until ~1 week of click data confirms which prompts are dead weight (per council verdict: instrument first, cut second)

---

## Session 37 — Trim & optimize: CTA, stats, hero image

### Changed
- `ProfileImg.webp` 189 KB → **66 KB** (1254px → 800px, q82) — this is the asset that actually loads in the hero; display max is 380px so 800px covers @2x
- `ProfileImg.png` 2.1 MB → **196 KB** (1254px → 760px, 256-color) — the `<picture>`/schema fallback was 11× heavier than the WebP; dark palette quantizes cleanly with no visible banding
- `index.html`: Stats strip third stat "Munich / Based in Germany" → **"2024 / Active Since"** — a real metric; Munich is already stated in the hero, footer, and schema

### Removed
- `index.html`: Pre-footer "Choose where you want to listen" CTA bar — duplicated the platform pills already shown in the hero, music section, and connect (cut one of ~11 listen/follow prompts)
- `index.html`: Now-dead CSS for that block — `.section-cta-bar--center` (+ descendants), `.platform-btns-row`, `.platform-btn--lg`

### Fixed
- `press.html`: Bio-fact release count "7 (6 albums + 1 single)" → **"8 (7 albums + 1 single)"** — stale after Quiet Chaos was added; the stat strip and discography on the same page already said 8

---

## Session 36 — Dead-code cleanup

Audited every CSS class and JS symbol against actual usage.

### Removed
- `index.html`: `.btn-ghost` + `.btn-ghost:hover` — orphaned after the hero switched to `.btn-outline-gold`
- `index.html`: `PENDING_ICON` const — byte-identical to `MUSIC_ICON`; deduped (the embed-pending placeholder now reuses `MUSIC_ICON`)
- `press.html`: `.photo-dl` + `.photo-dl:hover` — no matching markup

### Verified clean
- All JS functions and module constants have live references; full script re-executes with no errors
- No other dead classes across any page (`album-tile-close` is set via `className` in JS — live)
- `og-image.svg` left in place: it's the editable source for `og-image.png`, not a stray

---

## Session 35 — New release: Quiet Chaos (album)

New album **Quiet Chaos** (Spotify `4e6gK5CEZqllYvsjWDY3Pl`, Apple `6773957574`) added as the latest release across the whole site; Purple Gold demoted from "latest" to a standard single. Release count 7 → 8 everywhere.

### Added
- `covers/quiet-chaos.webp`: Album cover (600px WebP, 32 KB)
- `index.html`: Quiet Chaos as the new Latest Release strip (title, tagline, listen button + platform links + embed) and the first discography tile ("Latest · Album"); added to JSON-LD `album[]`
- `music.html` / `press.html`: Quiet Chaos added as the featured/latest discography entry; Purple Gold relabeled "Single"
- `links.html`: Featured release block now Quiet Chaos ("New Album")

### Changed
- All pages: release count 7 → 8 (hero trust line, stats strips, headings, story copy, profile tag, disco CTAs), `numberOfAlbums` 7 → 8, Purple Gold label "Latest · Single" → "Single"
- `index.html` / `music.html`: meta description, og:description, twitter:description, and JSON-LD now lead with Quiet Chaos
- Hero badge "New single — Purple Gold" → "New album — Quiet Chaos"

---

## Session 34 — WCAG AA contrast pass (all pages)

Audited every text/background color combo against WCAG. All text now meets AA; the two brand colors keep all their fill/border/glow uses unchanged.

### Changed
- `site.css`: `--muted` `#6b647e` → `#837c96` — was 3.58:1 (small-text FAIL), now **5.05:1 AA**. Cascades to every page (stat labels, handles, captions, footer copy, tags)
- `site.css`: Added `--accent-text` `#a45fe0` (**5.06:1 AA**) — a lighter purple for *small text only* (eyebrows, small links, labels). `--accent` `#8b3fc9` (3.49:1) stays for fills/borders/glows where contrast rules don't apply
- All pages: `color:var(--accent)` on text → `color:var(--accent-text)` (negative-lookbehind swap; `border-color`/`background-color` untouched)

### Fixed
- Removed compounding `opacity` on small muted/accent text that pushed it below AA even after the token bump: `.footer-copy`, `.section-credit`, `.hero-trust`, `.embed-pending-text`, `.chapter-num`, `.scroll-cue` (index), `.footer-copy` (404), `.merch-card-eyebrow` (index), `.links-footer` (links), `.na-tag` (music)
- `--gold` `#c8850f` verified at 6.52:1 (AA) — no change needed

---

## Session 33 — Discography cover facade + UX/a11y polish

### Added
- `covers/*.webp`: Self-hosted 600px album artwork for all 7 releases (WebP, 228 KB total) — pulled from Spotify and converted locally, no runtime CDN dependency
- `index.html`: **Discography rebuilt as a cover-art facade** — the music grid now shows real album artwork (hover reveals a play badge + mood line) instead of seven gray players. Clicking a cover expands it inline into a full-width tracklist player (Spotify/Apple/YouTube per the active platform); only one album iframe ever loads, on demand, and switching platform or clicking again collapses it. Falls back to a new-tab link when the chosen platform has no embed (e.g. Vol. 5 on Apple)
- `index.html`: Hero scroll cue — minimal "Scroll" label + bobbing chevron anchored to the latest release; signals there's content below the full-viewport hero. Fades out after 120px of scroll, hidden on mobile, motion respected
- `index.html`: Brand-gradient on the hero headline accent ("lo-fi worlds.") — gold→purple `background-clip:text`, wrapped in `@supports` so unsupported browsers keep the solid accent color

### Changed
- `index.html`: Music section no longer spins up ~9 iframes on consent — only the featured artist + latest-release players load up front; the 7 album players are click-to-load facades. Removes the mobile "show all 7" toggle (covers are cheap, all 7 show in a 2-col mobile grid)
- `index.html`: YouTube subscriber counter now respects `prefers-reduced-motion` — reduced-motion users see the final `55K+` immediately instead of an animated count

### Fixed
- `index.html`: Stat value renders `55K+` in markup (was `0K+`) so no-JS visitors see the real number; JS resets to `0K+` only when it will animate
- `index.html`: `.lr-flash` glow animation now disabled under `prefers-reduced-motion`

### Removed
- `index.html`: Dead CSS/JS from the old album grid — `.album-card*`, `.album-apple-na`, `.album-card-mood*`, `.mob-hide`, `.albums-show-more` and their handlers

---

## Session 32 — Design polish: hover consistency, contrast, refinement

### Fixed
- `index.html`: Platform-colored CTAs no longer flash purple on hover — `.btn-primary` and `.mobile-spotify-cta a` now stay in their platform color (Spotify green / Apple / YouTube) via `filter:brightness` + matching glow, instead of hardcoded `#a050d8`

### Changed
- `index.html`: Body paragraphs (`.chapter p`, `.gear-card p`, `.gear-featured-body p`, `.mood-card-desc`) moved from `--muted` to `--muted2` — lifts reading copy above WCAG AA contrast (was ~3.4:1)
- `index.html`: `.gear-featured-body p` max-width 56ch → 64ch to reduce the empty gap in the FL Studio callout

### Added
- `site.css`: Branded `::selection` styling (purple highlight, white text)

---

## Session 31 — SEO, structured data, and performance pass

### Added
- `index.html`: Full `album` array in MusicArtist JSON-LD (all 7 releases with types + datePublished)
- `index.html`: `numberOfAlbums: 7` to MusicArtist schema
- `index.html`: `<link rel="sitemap">` added to `<head>`
- `index.html`: Apple PWA meta tags (`apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style`)
- `index.html`: Preconnect hints for Apple Music and YouTube embeds
- `index.html`: BreadcrumbList JSON-LD schema (already in music/press/merch via previous sessions)
- `music.html`: `<link rel="sitemap">`, preconnect hints for Spotify/Apple/YouTube, BreadcrumbList
- `music.html`: `Purple Gold` corrected to `@type: MusicSingle` (was incorrectly MusicAlbum)
- `press.html`: Purple Gold added to discography; `<link rel="sitemap">`; preconnect hints
- `merch.html`: `<link rel="sitemap">`, BreadcrumbList

### Changed
- `index.html`: Hero badge → "Munich · 55K+ YouTube · 7 releases" (real numbers instead of generic labels)
- `index.html`: YouTube subscriber count now animates on scroll (count-up from 0→55K+)
- `index.html`: Scroll progress bar and active nav now rAF-throttled
- `press.html`: All "Six albums" → "Seven releases" fixes; stat strip corrected; bio paragraph updated

---

## Session 30 — Copy consistency and professionalism pass

### Changed
- `index.html`: hero badge → "Munich · Lo-fi Producer · Active since 2024"
- `index.html`: hero sub "Six self-released albums" → "Seven self-released records" with improved copy
- `index.html`: hero-trust "6 albums" → "7 releases"
- `index.html`: chapter 04 "Six volumes in" → "Seven releases in"
- `music.html`: twitter:description "Six self-released lo-fi albums" → "Seven self-released records"
- `press.html`: hero description, stats strip value (6→7), bio paragraph, bio-fact — all updated to 7 releases
- `links.html`: Spotify sub-label "Stream all albums" → "Stream all releases"
- `press.html`: Added Purple Gold to discography as "Latest · Single"; Lofi Kaisos Special label fixed to just "Special"
- `sitemap.xml`: Updated all lastmod dates to 2026-05-28
- `index.html`: YouTube subscriber count now animates (count-up from 0→55K+ on scroll into view)
- `index.html`: Scroll progress bar and active nav detection now rAF-throttled (prevents >1 update per frame)
- `index.html`: Hero badge updated to show real stats ("Munich · 55K+ YouTube · 7 releases")
- `index.html`: MusicArtist JSON-LD expanded with full album list (all 7 releases) + numberOfAlbums
- `index.html`: Added preconnect hints for Apple Music and YouTube embeds
- `netlify.toml`: Added Permissions-Policy and X-DNS-Prefetch-Control security/perf headers

---

## Session 29 — Purple Gold single release

### Added
- New single **Purple Gold** (Spotify `0Vhoh9SYaNQ5IFcKuEj8s3`, Apple Music `6772434750`) added to all pages
- `index.html` LATEST RELEASE strip: updated to Purple Gold; added `.lr-plat-row` with Spotify, Apple Music, YouTube icon buttons
- `links.html`: new featured "Purple Gold — New Single" release card at top with Spotify/Apple Music/YouTube platform icon buttons; CSS for `.link-release`, `.release-plat-btns`, `.release-plat-btn`

### Changed
- `music.html`: featured album card → Purple Gold (dark trap · hip-hop); Lofi Kaisos Special demoted to second card; delay classes shifted (d2–d5); hero "Six albums" → "Seven releases"; CTA text updated; meta/OG descriptions updated; JSON-LD album list updated
- `index.html`: album grid card 1 → Purple Gold; Lofi Kaisos Special added as card 2; show-more "6 albums" → "7 releases"; stats strip "6 / Self-Released Albums" → "7 / Releases"; MUSIC h2 updated; meta/JSON-LD descriptions updated
- `links.html`: profile tag "6 albums" → "7 releases"

---

## Session 28 — Analytics, link-in-bio, cookie UX

### Added
- Plausible analytics script (`data-domain="kaisos.com"`) added to all 4 pages — sign up at plausible.io and add kaisos.com to activate
- `links.html` — link-in-bio page at `/links`; Spotify, YouTube, Apple Music, Instagram, TikTok, Merch (gold), Ko-fi; mobile-first, noindex, branded
- `/links.html → /links 301!` redirect in `_redirects`
- `.embed-ph-btn` CSS — "Load player →" button on every Spotify placeholder

### Changed
- `initPlaceholders()` — each placeholder now has an inline "Load player →" button; clicking it accepts consent + loads all embeds immediately (no need to find the bottom bar)
- Cookie notice: smaller, less prominent; text simplified from alarming to factual
- Cookie notice text: "We embed Spotify players for your music experience. Accepting loads Spotify and may set third-party cookies." → "This site embeds Spotify players. Loading them may set third-party cookies."

---

## Session 27 — Polish pass + 404 page

### Added
- `404.html` — branded 404 page ("Lost in the lo-fi world") with back-to-home and browse-music CTAs; Netlify serves it automatically
- `Logo.webp` — 285KB → 27KB (91% smaller); used via `<picture>` in world-logo and merch brand-strip
- `og:site_name` and `og:locale` added to merch.html and music.html
- `fonts.css` immutable cache header added to netlify.toml

### Changed
- `href="index.html"` → `href="/"` on all back links in merch.html and music.html (6 occurrences)
- Logo preload in index.html updated to prefer Logo.webp
- Both `<img src="Logo.png">` content usages wrapped in `<picture>` with WebP source

---

## Session 26 — Performance, SEO, new discography page

### Added
- `fonts.css` — self-hosted Cormorant Garamond + Inter (6 WOFF2 files, latin + latin-ext only); removes Google Fonts external request (GDPR + performance)
- `fonts/` directory with 6 WOFF2 files (278KB total)
- `ProfileImg.webp` — WebP version of hero image (2.2MB → 189KB, 91% smaller); `<picture>` element with PNG fallback
- `music.html` — dedicated discography page at `/music`; all 6 albums, platform toggle (Spotify/Apple/YouTube), scroll reveal, progress bar, JSON-LD MusicArtist schema
- `music.html` linked in footer Explore nav on `index.html`
- `/music` added to `sitemap.xml` (priority 0.8)
- `/music.html → /music 301!` redirect in `_redirects`
- `merch.html` Twitter card meta tags + `<meta name="author">`
- `merch.html` JSON-LD `CollectionPage` + `ItemList`/`Product` schema for all 6 products
- TikTok icon added to merch footer social links
- Progress bar (`#progress`) added to merch.html
- Mobile sticky "Shop Now" CTA added to merch.html (appears after scrolling past hero on mobile)
- `.woff2` and `.webp` cache headers added to `netlify.toml`

### Changed
- Both HTML files now load fonts via `<link rel="stylesheet" href="/fonts.css"/>` instead of Google Fonts
- `sitemap.xml` main page `lastmod` updated to `2026-05-17`

---

## Session 25 — 10-point audit fixes

### Fixed
- Copy link button fallback referenced undefined `label` variable — replaced with literal `'Copy artist link'`
- `'about'` removed from nav sections array (no corresponding nav link caused blank active state while scrolling bio)
- OG + Twitter image changed from `og-image.svg` to `og-image.png` (generated PNG via rsvg-convert — SVG has poor Twitter/LinkedIn support)
- Brand World section given `id="world"` — hero "Enter the World →" CTA now correctly targets it instead of `#music`
- Both Amazon affiliate links given `rel="noopener sponsored"` (only FL Studio had `sponsored` before)
- Merch card CTA replaced inline `style="background:var(--gold)"` with `.kofi-btn--gold` CSS class
- Latest Release title corrected: "Special Release" → "Lofi Kaisos Special" (matches actual album name)
- Pre-footer inner platform buttons div inline style replaced with `.platform-btns-row` class

### Removed
- `.drawer-controls` CSS rule (orphaned after HTML removal in Session 24)
- YouTube subscriber count-up animation — replaced with static render; hardcoded `data-target` value will be easier to update manually

---

## Session 24 — Main site cleanup + fixes

### Fixed
- Broken `#listen` anchor in merch.html → corrected to `#music`
- All `merch.html` hrefs in nav, drawer, and footer → canonical `/merch`
- Removed empty `<div class="drawer-controls">` (dead code)

### Changed
- Stats strip: "100% Independent" → "Munich / Based in Germany" (more brand-specific)
- Removed redundant `.hero-tagline` element (duplicated `.hero-sub` content)
- Removed redundant artist bio prose from `#about` section (repeated the Story section verbatim)
- Pre-footer CTA inline styles extracted to `.section-cta-bar--center` CSS class

### Removed
- `.hero-tagline` and `.hero-text h1+.hero-tagline` CSS rules (dead after HTML removal)
- `.bio-grid` and `.artist-bio` CSS rules (dead after HTML removal)

---

## Session 23 — Merch page improvements (two passes)

### Added
- `<link rel="canonical" href="https://kaisos.com/merch"/>` in merch.html head
- `/merch.html → /merch 301!` redirect in `_redirects`
- `https://kaisos.com/merch` entry in `sitemap.xml`
- Instagram, YouTube, Spotify icon links in merch footer
- "Signature" badge on Lofi Hoodie Vol. 1 (featured card, gold border + gold buy button)
- Pulsing dot on hero eyebrow (matches main site badge style)
- Image scale-up on product card hover (`scale(1.05)`)
- Music connection link ("stream now →") in brand strip section

### Changed
- `merch.html` `og:url` corrected to canonical `/merch` (was `merch.html`)
- Ticker: replaced "Print on Demand" with "Independent Label"
- Hoodie Vol. 1 description: "Loft" → "Lofi" (typo fix)
- Hoodie Vol. 2 + Vol. 3 descriptions rewritten to differentiate them clearly
- Mug description reframed (removed "white glossy", leaned into ritual angle)
- Mug price: "From $14" → "$14"
- Footer restructured: socials + back link grouped on right side

### Fixed
- `CLAUDE.md` font and color values updated to match actual codebase (Cormorant Garamond, `#c8850f`, `#8b3fc9`)

---

## Session 22 — Netlify hardening + GitHub cleanup

### Added
- `netlify.toml` with security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`) on all routes
- Long-term cache headers (`max-age=31536000, immutable`) for `.png`, `.svg`, `.jpg` assets
- Explicit `publish = "."` so Netlify correctly identifies the static root

### Changed
- Site renamed from `celebrated-dragon-2aff3e` to `kaisos-com` — preview URL is now `main--kaisos-com.netlify.app`
- `merch.html` OG image fixed — was pointing to deleted `KaisosGold.png`, now uses `og-image.svg`

### Removed
- `KaisosGold.png`, `KaisosGold.bak.png`, `KaisosPurpleGold.png`, `KaisosWhite.png`, `Kaisoslack.png` — unused old logo variants

---

## Session 21 — Stock photo for gear section via Unsplash CDN

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
