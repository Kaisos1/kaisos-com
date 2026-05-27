# Domain Lens — Web Dev
Think: paint/layout cost, CSS specificity conflicts, Netlify edge behavior, Core Web Vitals, canonical URL correctness.
Priorities: visual fidelity, performance, clean markup — no frameworks, no build complexity.

# Kaisos.com

Single-page static site for Kaisos (lo-fi music producer from Munich).

## Stack
- Pure HTML/CSS/JS — no build step, no framework
- No external JS libraries, no new CDN dependencies without explicit approval
- Fonts: self-hosted WOFF2 via `/fonts.css` — Inter, Cormorant Garamond (normal + italic); no Google Fonts CDN link
- Deployed on Netlify

## Key files
- `index.html` — main site (homepage)
- `links.html` — link-in-bio page
- `music.html` — music catalogue page
- `merch.html` — merch page
- `press.html` — press/EPK page
- `404.html` — custom error page
- `site.css` — shared styles (loaded by all pages)
- `fonts.css` — `@font-face` declarations for self-hosted fonts
- `netlify.toml` — Netlify build/redirect config
- `robots.txt` — allows all, points to sitemap
- `sitemap.xml` — single entry: `https://kaisos.com`
- `_redirects` — Netlify: www → non-www 301
- `CHANGELOG.md` — add new session at the **TOP** (newest-first), after the `---` separator; find the last session number and increment; format: `## Session N — description` with Added/Changed/Fixed

## Site structure (sections in `index.html`)
NAV → MOBILE DRAWER → HERO → LATEST RELEASE → STATS STRIP → BRAND WORLD → MUSIC (+ Choose Your Mood) → CTA: FOLLOW → STORY → CTA: LISTEN → GEAR → CTA: SUPPORT → CONNECT → PRE-FOOTER CTA → FOOTER → BACK TO TOP → MOBILE STICKY CTA → COOKIE NOTICE → IMPRESSUM MODAL → PRIVACY POLICY MODAL

## Design system
- Colors: gold `#c8850f`, accent purple `#8b3fc9`, bg `#07070f`
- Nav height: 68px
- Fonts: Inter (body), Cormorant Garamond (logo/headings/italic accents)

## Rules
- No comments unless asked
- No new files unless structurally necessary (e.g. a new asset)
- Canonical URL: `https://kaisos.com` (no www, no trailing slash)
- Section markers: CSS `/* ══ SECTION ══ */`, HTML `<!-- ══ SECTION ══ -->`, JS `// ══ SECTION ══`
- On significant edits: remove dead CSS, dead handlers, duplicate rules
- Before every deploy: verify canonical URL in `<head>`, sitemap, and `_redirects` are intact

## Netlify
- Netlify MCP tools available (`mcp__claude_ai_Netlify__*`) — use readers to check deploy status, logs, or redirect behavior
- **Never use updater MCP tools** without asking — they write to live production
