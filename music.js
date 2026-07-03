const prog = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const s = document.body.scrollHeight - window.innerHeight;
  prog.style.width = (s > 0 ? window.scrollY / s * 100 : 0) + '%';
}, { passive: true });

const ro = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); }
}), { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

const PLATFORMS = {
  spotify: { label: 'Follow on Spotify', navLabel: 'Follow on Spotify', artistUrl: 'https://open.spotify.com/artist/5luMo1wzJV2T84LVD8g66M' },
  apple:   { label: 'Listen on Apple Music', navLabel: 'Listen on Apple Music', artistUrl: 'https://music.apple.com/us/artist/kaisos/1735054792' },
  youtube: { label: 'Subscribe on YouTube', navLabel: 'Subscribe on YouTube', artistUrl: 'https://youtube.com/@LofiKaisos' }
};

const PLATFORM_ICONS = {
  spotify: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>',
  apple:   '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>'
};

const PLATFORM_BTN_LABEL = {
  spotify: 'Spotify →',
  apple:   'Apple Music →',
  youtube: 'YouTube →'
};

function detectPlatform() {
  try { const s = localStorage.getItem('kaisos-platform'); if (s in PLATFORMS) return s; } catch(e){}
  return /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent) ? 'apple' : 'spotify';
}

function applyPlatform(p) {
  if (!(p in PLATFORMS)) p = 'spotify';
  try { localStorage.setItem('kaisos-platform', p); } catch(e){}
  document.body.dataset.platform = p;
  document.querySelectorAll('.ptog-btn').forEach(b => b.classList.toggle('active', b.dataset.p === p));
  document.querySelectorAll('.js-listen').forEach(a => {
    const url = a.dataset[p];
    if (url) { a.href = url; a.style.display = ''; }
    else { a.href = PLATFORMS[p].artistUrl; }
    a.innerHTML = PLATFORM_ICONS[p] + PLATFORM_BTN_LABEL[p];
    const naTag = a.closest('.album-actions').querySelector('.js-apple-na');
    if (naTag) naTag.style.display = (p === 'apple' && !a.dataset.apple) ? '' : 'none';
  });
  const followBtn = document.getElementById('cta-follow-btn');
  if (followBtn) { followBtn.href = PLATFORMS[p].artistUrl; followBtn.textContent = PLATFORMS[p].label; }
  const navBtn = document.querySelector('.nav-cta');
  if (navBtn) { navBtn.href = PLATFORMS[p].artistUrl; navBtn.textContent = PLATFORMS[p].navLabel; }
}

document.querySelectorAll('.ptog-btn').forEach(b => b.addEventListener('click', () => applyPlatform(b.dataset.p)));
applyPlatform(detectPlatform());
