// ══ ANALYTICS — outbound + interaction events (Plausible, cookieless) ══
// One delegated listener for the whole site. No per-link markup needed.
// Events: "Outbound" (props: platform, location, url),
//         "Embed Switch" (props: platform, location),
//         "Hero Play".
(function () {
  // Plausible loads async; queue calls so none are dropped before it arrives.
  window.plausible = window.plausible || function () {
    (window.plausible.q = window.plausible.q || []).push(arguments);
  };

  // ── platform classification ──
  const PLATFORMS = [
    [/open\.spotify\.com|spotify:/i, 'spotify'],
    [/music\.apple\.com/i, 'apple'],
    [/youtube\.com|youtu\.be/i, 'youtube'],
    [/ko-fi\.com/i, 'kofi'],
    [/fourthwall\.com/i, 'merch'],
    [/instagram\.com/i, 'instagram'],
    [/tiktok\.com/i, 'tiktok'],
    [/amzn\.to|amazon\./i, 'amazon'],
    [/image-line\.com/i, 'fl-studio'],
  ];
  const platformOf = (url) => {
    for (const [re, name] of PLATFORMS) if (re.test(url)) return name;
    return 'other';
  };
  const platformOfText = (t) => {
    const s = (t || '').toLowerCase();
    if (s.includes('spotify')) return 'spotify';
    if (s.includes('apple')) return 'apple';
    if (s.includes('youtube') || s.includes('yt')) return 'youtube';
    return 'other';
  };
  const platformOfBtn = (b) =>
    b.dataset.p || b.dataset.platform || platformOfText(b.getAttribute('aria-label') || b.textContent);
  // Nearest ancestor with an id → e.g. "home", "music", "connect", "footer".
  const locOf = (el) => {
    const sec = el.closest('[id]');
    if (sec && sec.id) return sec.id;
    if (el.closest('footer')) return 'footer';
    if (el.closest('nav')) return 'nav';
    return 'page';
  };

  document.addEventListener('click', (e) => {
    // ── outbound links (the real funnel exits) ──
    const a = e.target.closest('a[href]');
    if (a) {
      let host = '';
      try { host = new URL(a.href, location.href).host; } catch (_) {}
      if (host && host !== location.host) {
        plausible('Outbound', {
          props: { platform: platformOf(a.href), location: locOf(a), url: a.href },
        });
      }
      return;
    }
    // ── hero play button ──
    if (e.target.closest('#hero-play-btn')) {
      plausible('Hero Play', { props: { location: 'home' } });
      return;
    }
    // ── platform toggle buttons (switch the embedded player, stay on-site) ──
    const tog = e.target.closest('.ptog-btn, .platform-toggle button, [data-p]');
    if (tog) {
      plausible('Embed Switch', { props: { platform: platformOfBtn(tog), location: locOf(tog) } });
    }
  }, { capture: true });
})();
