const prog = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const s = document.body.scrollHeight - window.innerHeight;
  prog.style.width = (s > 0 ? window.scrollY / s * 100 : 0) + '%';
}, { passive: true });

const ro = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); }
}), { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
