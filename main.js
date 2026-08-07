// ══ HAPTICS (subtle mobile vibration on tap) ══
if('vibrate' in navigator){
  document.addEventListener('click',e=>{if(e.target.closest('button'))navigator.vibrate(8)});
}

// ══ REVEALS ══
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));

// ══ NAV STATE ══
const sentinel=document.createElement('div');
sentinel.style.cssText='position:absolute;top:80px;height:1px;width:1px';
document.body.prepend(sentinel);
new IntersectionObserver(([e])=>document.getElementById('nv').classList.toggle('on',!e.isIntersecting)).observe(sentinel);

// ══ LISTEN FAB ══
(()=>{
  const fab=document.getElementById('listenFab'),hero=document.querySelector('.hero'),footer=document.querySelector('footer');
  if(!fab||!hero)return;
  let pastHero=false,nearFooter=false;
  const sync=()=>fab.classList.toggle('show',pastHero&&!nearFooter);
  new IntersectionObserver(([e])=>{pastHero=!e.isIntersecting;sync()},{rootMargin:'-45% 0px 0px 0px'}).observe(hero);
  if(footer)new IntersectionObserver(([e])=>{nearFooter=e.isIntersecting;sync()}).observe(footer);
})();

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

// ══ HERO CAROUSEL: background + info swap ══
(()=>{
  const track=document.getElementById('heroTrack');
  if(!track)return;
  const albums=[
    {id:'3xJm2P1qHg15yLCm1PjcWr',title:'Untold <span class="au">Truths.</span>',label:'Newest album',isNew:true,year:'2026',kind:'Album',tag:'Dark Trap',mood:'“I stopped writing what sounded good and started writing what was true.”',cover:'covers/untold-truths.webp',name:'Untold Truths',apple:'https://music.apple.com/us/album/untold-truths/6786814026',youtube:'https://youtube.com/@LofiKaisos'},
    {id:'4e6gK5CEZqllYvsjWDY3Pl',title:'Quiet <span class="au">Chaos.</span>',label:'Album',year:'2025',kind:'Album',tag:'Lo-Fi',mood:'“Everything in my head was loud. This is what it sounded like once it slowed down.”',cover:'covers/quiet-chaos.webp',name:'Quiet Chaos',apple:'https://music.apple.com/us/album/quiet-chaos/6773957574',youtube:'https://youtube.com/@LofiKaisos'},
    {id:'0Vhoh9SYaNQ5IFcKuEj8s3',title:'Purple <span class="au">Gold.</span>',label:'Single',year:'2025',kind:'Single',tag:'Dark Trap',mood:'“One track, one mood, no explanation needed.”',cover:'covers/purple-gold.webp',name:'Purple Gold',apple:'https://music.apple.com/us/song/purple-gold/6772434750',youtube:'https://youtube.com/@LofiKaisos'},
    {id:'67OMy0DOFbt4Y5iTbL4lnE',title:'Lofi Kaisos <span class="au">Special.</span>',label:'Special release',year:'2024',kind:'Album',tag:'Lo-Fi',mood:'“Made for the hours when the rest of the world has already gone quiet.”',cover:'covers/special.webp',name:'Lofi Kaisos Special',apple:'https://music.apple.com/us/album/lofi-kaisos-special/1768802069',youtube:'https://www.youtube.com/watch?v=Yjr_UgeBxWE'},
    {id:'0sm4rH9Bv1VJ5r8hTaFDfz',title:'Lofi Kaisos <span class="au">Vol. 5.</span>',label:'Vol. 5',year:'2024',kind:'Album',tag:'Lo-Fi',mood:'“Steady enough to think in, quiet enough to disappear into.”',cover:'covers/vol5.webp',name:'Lofi Kaisos Vol. 5',apple:'',youtube:'https://www.youtube.com/watch?v=N02MDMs_q0Y'},
    {id:'49c8g3dFdDOS8aezK0ltDb',title:'Lofi Kaisos <span class="au">Vol. 4.</span>',label:'Vol. 4',year:'2024',kind:'Album',tag:'Lo-Fi',mood:'“I let the beat drift further than usual, and just followed it.”',cover:'covers/vol4.webp',name:'Lofi Kaisos Vol. 4',apple:'https://music.apple.com/us/album/lofi-kaisos-vol-4/1756205758',youtube:'https://www.youtube.com/watch?v=FoTLqmSQ6rU'},
    {id:'3bcGnK12xEytemEmjFGH86',title:'Lofi Kaisos <span class="au">Vol. 3.</span>',label:'Vol. 3',year:'2024',kind:'Album',tag:'Lo-Fi',mood:'“Some days ask for a sadness you can sit inside comfortably.”',cover:'covers/vol3.webp',name:'Lofi Kaisos Vol. 3',apple:'https://music.apple.com/us/album/lofi-kaisos-vol-3/1738116842',youtube:'https://www.youtube.com/watch?v=-9b__6G67_c'},
    {id:'1G9pQYYIS1hZEqu0hieCyE',title:'Lofi Kaisos <span class="au">Vol. 2.</span>',label:'Vol. 2',year:'2024',kind:'Album',tag:'Lo-Fi',mood:'“Not meant to be noticed. Just meant to be there.”',cover:'covers/vol2.webp',name:'Lofi Kaisos Vol. 2',apple:'https://music.apple.com/us/album/lofi-kaisos-vol-2/1735069982',youtube:'https://www.youtube.com/watch?v=LE8U85EA7G4'},
    {id:'0EQS01PkeiRoi9zaeVDtt7',title:'Lofi Kaisos <span class="au">Vol. 1.</span>',label:'Vol. 1 · Where it began',year:'2024',kind:'Album',tag:'Lo-Fi',mood:'“I almost deleted this one. I am glad I did not.”',cover:'covers/vol1.webp',name:'Lofi Kaisos Vol. 1',apple:'https://music.apple.com/us/album/lofi-kaisos-vol-1/1735055810',youtube:'https://www.youtube.com/watch?v=qZ1g6cxGZRw'}
  ];
  const n=albums.length,WINDOW=Math.min(3,Math.floor((n-1)/2));

  function renderTrack(){
    const items=[];
    for(let d=-WINDOW;d<=WINDOW;d++){
      const idx=((current+d)%n+n)%n;
      items.push({idx,active:d===0,dist:Math.abs(d)});
    }
    track.innerHTML=items.map(it=>{
      const a=albums[it.idx];
      return `<button type="button" class="hero-pick${it.active?' active':''}" data-i="${it.idx}" data-d="${it.dist}" aria-label="Show ${a.name}"><img src="${a.cover}" alt="" loading="lazy" decoding="async"/></button>`;
    }).join('');
  }

  const bgA=document.getElementById('heroBgA'),bgB=document.getElementById('heroBgB');
  let front=bgA,back=bgB,current=0,playBtn=document.getElementById('heroPlayBtn');
  const label=document.getElementById('heroLabel'),title=document.getElementById('heroTitle'),sub=document.getElementById('heroSub'),
        year=document.getElementById('heroYear'),kind=document.getElementById('heroKind'),tag=document.getElementById('heroTag'),
        embedSlot=document.getElementById('heroEmbedSlot'),plats=document.getElementById('heroPlats');
  renderTrack();

  function bindPlay(btn){
    btn.addEventListener('click',()=>{
      const f=document.createElement('iframe');
      f.src=btn.dataset.embed;f.height=btn.dataset.h;f.allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';f.loading='lazy';f.title='Spotify player';
      f.addEventListener('load',()=>btn.classList.add('loaded'));
      embedSlot.innerHTML='';
      embedSlot.appendChild(f);
    },{once:true});
  }
  bindPlay(playBtn);

  function alignTrack(){
    const containerWidth=track.parentElement.clientWidth;
    const slide=track.querySelector('.hero-pick.active');
    if(!slide)return;
    const target=track.offsetLeft+slide.offsetLeft+slide.offsetWidth/2;
    track.style.transform=`translateX(${containerWidth/2-target}px)`;
  }

  function show(i){
    i=((i%n)+n)%n;
    const a=albums[i];
    back.style.backgroundImage=`url('${a.cover}')`;
    back.classList.add('on');
    front.classList.remove('on');
    [front,back]=[back,front];

    label.innerHTML=(a.isNew?'<span class="new-badge">New</span> ':'')+a.label;
    title.innerHTML=a.title;
    year.textContent=a.year;
    kind.textContent=a.kind;
    tag.textContent=a.tag;
    sub.textContent=a.mood;

    embedSlot.innerHTML='';
    playBtn.replaceWith(playBtn.cloneNode(true));
    playBtn=document.getElementById('heroPlayBtn');
    playBtn.dataset.embed=`https://open.spotify.com/embed/album/${a.id}?utm_source=generator&theme=0`;
    playBtn.dataset.h='352';
    playBtn.setAttribute('aria-label',`Play ${a.name} on Spotify`);
    bindPlay(playBtn);

    let platHtml=`<a class="plat" href="https://open.spotify.com/album/${a.id}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><use href="#i-spotify"/></svg> Spotify</a>`;
    if(a.apple)platHtml+=`<a class="plat" href="${a.apple}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><use href="#i-apple"/></svg> Apple Music</a>`;
    platHtml+=`<a class="plat" href="${a.youtube}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><use href="#i-youtube"/></svg> YouTube</a>`;
    plats.innerHTML=platHtml;

    current=i;
    renderTrack();
    alignTrack();
  }

  track.addEventListener('click',e=>{
    const btn=e.target.closest('.hero-pick');
    if(!btn||+btn.dataset.i===current)return;
    show(+btn.dataset.i);
  });

  const prevBtn=document.getElementById('heroPrev'),nextBtn=document.getElementById('heroNext');
  prevBtn?.addEventListener('click',()=>show(current-1));
  nextBtn?.addEventListener('click',()=>show(current+1));

  window.addEventListener('resize',alignTrack);
  alignTrack();
  requestAnimationFrame(alignTrack);
  window.addEventListener('load',alignTrack);
})();

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

// ══ CONTACT FORM ══
(()=>{
  const form=document.getElementById('contactForm');
  if(!form)return;
  const submitBtn=document.getElementById('contactSubmit'),status=document.getElementById('contactStatus');
  form.addEventListener('submit',e=>{
    e.preventDefault();
    submitBtn.disabled=true;submitBtn.textContent='Sending…';
    status.textContent='';status.className='form-status';
    fetch('/',{method:'POST',body:new FormData(form)})
      .then(r=>{
        if(!r.ok)throw new Error();
        form.reset();
        submitBtn.textContent='Send message';submitBtn.disabled=false;
        status.textContent='Sent. Talk soon.';status.className='form-status ok';
      })
      .catch(()=>{
        submitBtn.textContent='Send message';submitBtn.disabled=false;
        status.textContent='Something went wrong — email contact@kaisos.com instead.';status.className='form-status err';
      });
  });
})();
