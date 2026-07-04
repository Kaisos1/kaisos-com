// ══ REVEALS ══
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));

// ══ NAV STATE ══
const sentinel=document.createElement('div');
sentinel.style.cssText='position:absolute;top:80px;height:1px;width:1px';
document.body.prepend(sentinel);
new IntersectionObserver(([e])=>document.getElementById('nv').classList.toggle('on',!e.isIntersecting)).observe(sentinel);

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
