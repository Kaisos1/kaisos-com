// ══ WEBGL NEBULA ATMOSPHERE (hand-written, zero dependencies) ══
(function(){
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches || matchMedia('(prefers-reduced-data: reduce)').matches;
  const cv = document.getElementById('atmos');
  if (reduce || !cv) { document.documentElement.classList.add('no-webgl'); return; }
  let gl;
  try { gl = cv.getContext('webgl', {antialias:false, alpha:false, depth:false, powerPreference:'low-power'}); } catch(e){}
  if (!gl) { document.documentElement.classList.add('no-webgl'); return; }

  const vs = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  const fs = [
    'precision mediump float;',
    'uniform vec2 u_res;uniform float u_t;uniform vec2 u_ptr;',
    'float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
    'float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);',
    ' float a=hash(i),b=hash(i+vec2(1,0)),c=hash(i+vec2(0,1)),d=hash(i+vec2(1,1));',
    ' return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}',
    'float fbm(vec2 p){float v=0.,a=.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);',
    ' for(int i=0;i<3;i++){v+=a*noise(p);p=m*p;a*=.5;}return v;}',
    'void main(){',
    ' vec2 p=(gl_FragCoord.xy-.5*u_res)/u_res.y;',
    ' p+=u_ptr*0.06;',
    ' float t=u_t*0.025;',
    ' vec2 q=vec2(fbm(p*1.4+t),fbm(p*1.4+vec2(5.2,1.3)-t));',
    ' float n=fbm(p*2.0+q*1.7+t);',
    ' vec3 bg=vec3(0.027,0.027,0.059);',
    ' vec3 purple=vec3(0.545,0.247,0.788);',
    ' vec3 deep=vec3(0.176,0.059,0.314);',
    ' vec3 gold=vec3(0.784,0.522,0.059);',
    ' vec3 col=bg;',
    ' col=mix(col,deep,smoothstep(0.2,0.85,n)*0.85);',
    ' col=mix(col,purple,smoothstep(0.5,1.05,n)*0.55);',
    ' float gm=smoothstep(0.55,0.95,n)*smoothstep(0.5,0.9,q.x+q.y);',
    ' col=mix(col,gold,gm*0.16);',
    ' float vig=smoothstep(1.35,0.25,length(p));',
    ' col*=mix(0.45,1.05,vig);',
    ' col+=(hash(gl_FragCoord.xy+t)-0.5)*0.015;',
    ' gl_FragColor=vec4(col,1.0);',
    '}'
  ].join('\n');

  function sh(type,src){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);return s;}
  const prog=gl.createProgram();
  gl.attachShader(prog,sh(gl.VERTEX_SHADER,vs));
  gl.attachShader(prog,sh(gl.FRAGMENT_SHADER,fs));
  gl.linkProgram(prog);
  if(!gl.getProgramParameter(prog,gl.LINK_STATUS)){ document.documentElement.classList.add('no-webgl'); return; }
  gl.useProgram(prog);
  const b=gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,b);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
  const loc=gl.getAttribLocation(prog,'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
  const uRes=gl.getUniformLocation(prog,'u_res'),uT=gl.getUniformLocation(prog,'u_t'),
        uPtr=gl.getUniformLocation(prog,'u_ptr');

  let W=0,H=0,DPR=1,maxDPR=1.5,scale=1,lastW=0;
  const coarse=matchMedia('(pointer:coarse)').matches;
  function resize(){
    maxDPR = innerWidth<900 ? 1.0 : 1.5;
    scale  = innerWidth<900 ? 0.75 : 1.0; // fewer fragments on small screens
    DPR = Math.min(DPR||maxDPR, maxDPR);
    W=Math.floor(innerWidth*DPR*scale); H=Math.floor(innerHeight*DPR*scale);
    cv.width=W; cv.height=H; gl.viewport(0,0,W,H);
    lastW=innerWidth;
  }
  DPR=maxDPR; resize();
  // ignore pure-height resizes (mobile URL-bar show/hide) on touch devices
  addEventListener('resize',()=>{ if(coarse && innerWidth===lastW) return; resize(); },{passive:true});

  let px=0,py=0,tx=0,ty=0;
  addEventListener('pointermove',e=>{tx=(e.clientX/innerWidth-0.5)*2;ty=-(e.clientY/innerHeight-0.5)*2;},{passive:true});

  let running=true,onScreen=true,raf=0,first=true,last=0,lastDraw=0,slow=0,clock=0;
  function frame(ts){
    if(!running) return;
    raf=requestAnimationFrame(frame);
    if(!last){last=ts;lastDraw=ts;}
    if(ts-lastDraw<33) return; // cap ~30fps
    let dt=ts-last; last=ts; lastDraw=ts;
    if(dt>100)dt=100; // clamp across pauses so the clock never jumps/rewinds
    if(dt>40 && DPR>1){ if(++slow>20){ DPR=1; resize(); slow=0; } } else slow=0;
    clock+=dt*0.001; // accumulator freezes while paused → smooth on resume
    px+=(tx-px)*0.04; py+=(ty-py)*0.04;
    gl.uniform2f(uRes,W,H); gl.uniform1f(uT,clock);
    gl.uniform2f(uPtr,px,py);
    gl.drawArrays(gl.TRIANGLES,0,3);
    if(first){ cv.style.background='none'; first=false; }
  }
  function go(){ if(!raf && running && onScreen){ last=0; raf=requestAnimationFrame(frame); } }
  function stop(){ running=false; cancelAnimationFrame(raf); raf=0; }
  ('requestIdleCallback' in window) ? requestIdleCallback(go,{timeout:1400}) : setTimeout(go,400);

  // stop rendering once the hero (where the field reads) is scrolled past
  const hero=document.querySelector('.hero');
  if(hero && 'IntersectionObserver' in window){
    new IntersectionObserver(es=>{
      onScreen=es[0].isIntersecting;
      if(onScreen){ running=true; go(); } else { stop(); }
    },{rootMargin:'200px'}).observe(hero);
  }
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){ stop(); } else if(onScreen){ running=true; go(); }
  });
})();

// ══ HERO DECK POINTER TILT (signature moment only) ══
(function(){
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!matchMedia('(hover: hover)').matches) return;
  const host=document.getElementById('hero-tilt'); if(!host) return;
  const deck=host.querySelector('.tilt-deck');
  let q=false,nx=0,ny=0;
  function apply(){ deck.style.setProperty('--ry',nx+'deg'); deck.style.setProperty('--rx',ny+'deg'); q=false; }
  host.addEventListener('pointermove',e=>{
    const b=host.getBoundingClientRect();
    nx=(((e.clientX-b.left)/b.width)-0.5)*18; ny=-((((e.clientY-b.top)/b.height)-0.5)*18);
    if(!q){q=true;requestAnimationFrame(apply);}
  },{passive:true});
  host.addEventListener('pointerleave',()=>{nx=0;ny=0;if(!q){q=true;requestAnimationFrame(apply);}});
})();

// ══ CLICK-TO-LOAD EMBED (privacy friendly) ══
document.querySelectorAll('.embed-facade').forEach(btn=>{
  btn.addEventListener('click',()=>{
    if(btn.classList.contains('loading'))return;
    btn.classList.add('loading');
    const src=btn.getAttribute('data-embed'), h=btn.getAttribute('data-h')||'352';
    const f=document.createElement('iframe');
    f.src=src; f.height=h; f.loading='lazy'; f.title='Kaisos player';
    f.setAttribute('frameborder','0');
    f.setAttribute('referrerpolicy','strict-origin-when-cross-origin');
    f.setAttribute('sandbox','allow-scripts allow-same-origin allow-presentation allow-popups');
    f.allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    f.addEventListener('load',()=>{if(btn.isConnected)btn.replaceWith(f);},{once:true});
    setTimeout(()=>{if(btn.isConnected)btn.replaceWith(f);},1600);
  });
});

// ══ SCROLL REVEAL ══
(function(){
  const els=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('visible'));return;}
  const io=new IntersectionObserver(en=>en.forEach(x=>{if(x.isIntersecting){x.target.classList.add('visible');io.unobserve(x.target);}}),{threshold:0.14,rootMargin:'0px 0px -8% 0px'});
  els.forEach(e=>io.observe(e));
})();

// ══ NAV + PROGRESS + BACK TO TOP ══
(function(){
  const nav=document.getElementById('nav'),prog=document.getElementById('progress'),back=document.getElementById('back-top');
  let tick=false;
  function onScroll(){
    if(tick)return; tick=true;
    requestAnimationFrame(()=>{
      const y=scrollY,h=document.documentElement.scrollHeight-innerHeight,p=h>0?y/h:0;
      nav.classList.toggle('scrolled',y>20);
      prog.style.width=(p*100)+'%';
      back.classList.toggle('show',y>700);
      tick=false;
    });
  }
  addEventListener('scroll',onScroll,{passive:true}); onScroll();
  back.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
})();

// ══ SCROLL-SPY NAV ══
(function(){
  const links=[...document.querySelectorAll('.nv-center a[href^="#"]')];
  const map=new Map(links.map(a=>[a.getAttribute('href').slice(1),a]));
  const secs=[...map.keys()].map(id=>document.getElementById(id)).filter(Boolean);
  if(!('IntersectionObserver' in window)||!secs.length)return;
  const io=new IntersectionObserver(en=>{en.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.remove('active'));map.get(e.target.id)?.classList.add('active');}});},{rootMargin:'-45% 0px -50% 0px'});
  secs.forEach(s=>io.observe(s));
})();

// ══ SCROLL LOCK (single source of truth: drawer OR any modal) ══
// position:fixed + saved offset so iOS Safari can't scroll the page behind
let scrollLockY=0,scrollLocked=false;
function syncScrollLock(){
  const d=document.getElementById('drawer');
  const open=!!(document.querySelector('.modal-overlay.open')||(d&&d.classList.contains('open')));
  if(open===scrollLocked)return;
  const b=document.body;
  if(open){
    scrollLockY=window.scrollY||window.pageYOffset||0;
    b.style.position='fixed';b.style.top=-scrollLockY+'px';b.style.left='0';b.style.right='0';b.style.width='100%';b.style.overflow='hidden';
    scrollLocked=true;
  }else{
    b.style.position='';b.style.top='';b.style.left='';b.style.right='';b.style.width='';b.style.overflow='';
    scrollLocked=false;
    window.scrollTo(0,scrollLockY);
  }
}

// ══ MOBILE DRAWER ══
(function(){
  const b=document.getElementById('burger'),d=document.getElementById('drawer'); if(!b||!d)return;
  function close(focusBurger){
    if(!d.classList.contains('open'))return;
    d.classList.remove('open');b.classList.remove('open');b.setAttribute('aria-expanded','false');
    syncScrollLock();
    if(focusBurger)b.focus();
  }
  b.addEventListener('click',()=>{
    const o=d.classList.toggle('open');b.classList.toggle('open',o);b.setAttribute('aria-expanded',o?'true':'false');
    syncScrollLock();
    if(o){const f=d.querySelector('a');if(f)f.focus();}
  });
  d.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>close(false)));
  d.addEventListener('keydown',e=>{
    if(e.key!=='Tab'||!d.classList.contains('open'))return;
    const f=[...d.querySelectorAll('a[href],button:not([disabled])')].filter(el=>el.offsetParent!==null);
    if(!f.length)return;
    const first=f[0],last=f[f.length-1];
    if(e.shiftKey?document.activeElement===first:document.activeElement===last){e.preventDefault();(e.shiftKey?last:first).focus();}
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close(true);});
  document.addEventListener('click',e=>{if(d.classList.contains('open')&&!d.contains(e.target)&&!b.contains(e.target))close(false);});
  matchMedia('(min-width:981px)').addEventListener('change',e=>{if(e.matches)close(false);});
})();

// ══ LEGAL MODALS ══
let modalReturnFocus=null;
document.querySelectorAll('.modal-overlay').forEach(m=>{m.setAttribute('inert','');m.setAttribute('aria-hidden','true');});
function openModal(id){
  const m=document.getElementById('modal-'+id); if(!m)return;
  modalReturnFocus=document.activeElement;
  m.removeAttribute('inert');
  m.removeAttribute('aria-hidden');
  m.classList.add('open');
  syncScrollLock();
  const f=m.querySelector('.modal-close'); if(f)f.focus();
}
function closeModal(id){
  const m=document.getElementById('modal-'+id); if(!m)return;
  m.classList.remove('open');
  m.setAttribute('inert','');
  m.setAttribute('aria-hidden','true');
  syncScrollLock();
  if(modalReturnFocus){modalReturnFocus.focus();modalReturnFocus=null;}
}
document.querySelectorAll('[data-open-modal]').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.openModal)));
document.querySelectorAll('.modal-overlay').forEach(overlay=>{
  const name=overlay.id.replace('modal-','');
  overlay.addEventListener('click',e=>{if(e.target===overlay)closeModal(name);});
  overlay.querySelectorAll('.modal-close').forEach(b=>b.addEventListener('click',()=>closeModal(name)));
  overlay.addEventListener('keydown',e=>{
    if(e.key!=='Tab')return;
    const f=overlay.querySelectorAll('.modal-panel button, .modal-panel a, .modal-panel [tabindex]:not([tabindex="-1"])');
    if(!f.length)return;
    const first=f[0],last=f[f.length-1];
    if(e.shiftKey?document.activeElement===first:document.activeElement===last){e.preventDefault();(e.shiftKey?last:first).focus();}
  });
});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape')document.querySelectorAll('.modal-overlay.open').forEach(m=>closeModal(m.id.replace('modal-','')));
});

// ══ DEEP-LINK LEGAL MODALS (/#impressum, /#privacy — linked from merch) ══
(function(){
  const h=location.hash.slice(1);
  if(h==='impressum'||h==='privacy'){
    history.replaceState(null,'',location.pathname+location.search);
    openModal(h);
  }
})();
