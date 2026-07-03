// ══ PROGRESS + MOBILE SHOP CTA (one throttled scroll handler) ══
(function(){
  const prog=document.getElementById('progress');
  const cta=document.getElementById('mobile-shop-cta');
  const topNav=document.querySelector('nav');
  const hero=document.querySelector('.merch-hero');
  let threshold=hero?hero.offsetTop+hero.offsetHeight:400;
  addEventListener('resize',()=>{threshold=hero?hero.offsetTop+hero.offsetHeight:400;},{passive:true});
  addEventListener('load',()=>{threshold=hero?hero.offsetTop+hero.offsetHeight:400;},{passive:true});
  let tick=false;
  addEventListener('scroll',()=>{
    if(tick)return; tick=true;
    requestAnimationFrame(()=>{
      const s=document.body.scrollHeight-innerHeight, y=scrollY;
      prog.style.width=(s>0?y/s*100:0)+'%';
      cta.classList.toggle('visible',y>threshold);
      topNav.classList.toggle('nav-cta-hidden',y>threshold);
      tick=false;
    });
  },{passive:true});
})();

// ══ SCROLL REVEAL ══
(function(){
  const els=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('visible'));return;}
  const io=new IntersectionObserver(en=>en.forEach(x=>{if(x.isIntersecting){x.target.classList.add('visible');io.unobserve(x.target);}}),{threshold:0.1});
  els.forEach(e=>io.observe(e));
})();
