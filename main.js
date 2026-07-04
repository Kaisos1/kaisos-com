// ══ REVEALS ══
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));

// ══ NIGHT PHASES ══
const phases=new IntersectionObserver(es=>{
  es.forEach(e=>{if(e.isIntersecting)document.body.dataset.phase=e.target.dataset.phase});
},{threshold:0.4});
document.querySelectorAll('main [data-phase],header[data-phase],footer[data-phase]').forEach(s=>phases.observe(s));

// ══ NAV STATE ══
const sentinel=document.createElement('div');
sentinel.style.cssText='position:absolute;top:80px;height:1px;width:1px';
document.body.prepend(sentinel);
new IntersectionObserver(([e])=>document.getElementById('nv').classList.toggle('on',!e.isIntersecting)).observe(sentinel);

// ══ MOBILE DRAWER ══
(()=>{
  const b=document.getElementById('burger'),d=document.getElementById('drawer');
  if(!b||!d)return;
  let y=0;
  const open=()=>{y=window.scrollY;d.classList.add('open');b.setAttribute('aria-expanded','true');d.setAttribute('aria-hidden','false');document.body.style.cssText=`position:fixed;top:${-y}px;left:0;right:0;width:100%`};
  const close=()=>{d.classList.remove('open');b.setAttribute('aria-expanded','false');d.setAttribute('aria-hidden','true');document.body.style.cssText='';window.scrollTo(0,y)};
  b.addEventListener('click',()=>b.getAttribute('aria-expanded')==='true'?close():open());
  d.addEventListener('click',e=>{if(e.target===d)close()});
  d.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&d.classList.contains('open'))close()});
})();

// ══ BOKEH ══
(()=>{
  const host=document.getElementById('orbs');
  const colors=['rgba(139,63,201,0.5)','rgba(200,133,15,0.35)','rgba(201,162,236,0.3)'];
  for(let i=0;i<12;i++){
    const o=document.createElement('span');o.className='orb';
    const s=14+((i*37)%56);
    o.style.cssText=`width:${s}px;height:${s}px;left:${(i*83)%100}%;top:${(i*61)%100}%;background:${colors[i%3]};--dx:${((i%5)-2)*22}px;--dy:${-30-((i*13)%50)}px;animation-duration:${18+(i%7)*4}s;animation-delay:${-i*2.7}s`;
    host.appendChild(o);
  }
})();

// ══ FACADE EMBED ══
document.querySelectorAll('.facade').forEach(btn=>{
  btn.addEventListener('click',()=>{
    btn.classList.add('loading');
    const f=document.createElement('iframe');
    f.src=btn.dataset.embed;f.height=btn.dataset.h;f.allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';f.loading='lazy';f.title='Spotify player';
    f.addEventListener('load',()=>btn.remove());
    btn.parentElement.appendChild(f);
  },{once:true});
});

// ══ LEGAL MODALS ══
document.querySelectorAll('[data-open-modal]').forEach(b=>b.addEventListener('click',()=>{
  document.getElementById('modal-'+b.dataset.openModal).classList.add('open');
  document.body.style.overflow='hidden';
}));
document.querySelectorAll('.modal-overlay').forEach(m=>{
  const close=()=>{m.classList.remove('open');document.body.style.overflow=''};
  m.addEventListener('click',e=>{if(e.target===m)close()});
  m.querySelector('.modal-close').addEventListener('click',close);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&m.classList.contains('open'))close()});
});
