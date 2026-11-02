function go(id){document.getElementById(id).scrollIntoView({behavior:'smooth'})}
const data={
 haldi:{title:'Kshama & Aaditya — Haldi Carnival',start:'20261124T120000',end:'20261124T150000'},
 sangeet:{title:'Kshama & Aaditya — Sangeet Night',start:'20261124T200000',end:'20261125T000000'},
 wedding:{title:'Kshama & Aaditya — Marriage Ceremony',start:'20261125T190000',end:'20261125T230000'}
};
let active=null;
function calendar(k){
 active=data[k];document.getElementById('calTitle').textContent=active.title;
 const q=new URLSearchParams({action:'TEMPLATE',text:active.title,dates:active.start+'/'+active.end,location:'Hotel Jabali Palace, Jabalpur'});
 document.getElementById('googleLink').href='https://calendar.google.com/calendar/render?'+q;
 document.getElementById('calModal').classList.add('show');
}
function closeCal(){document.getElementById('calModal').classList.remove('show')}
document.getElementById('icsLink').onclick=()=>{
 const e=active;
 const s=`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:${e.start}\nDTEND:${e.end}\nSUMMARY:${e.title}\nLOCATION:Hotel Jabali Palace, Jabalpur\nEND:VEVENT\nEND:VCALENDAR`;
 const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([s],{type:'text/calendar'}));a.download='wedding-event.ics';a.click();
};
document.getElementById('rsvpForm').onsubmit=e=>{e.preventDefault();toast('Thank you — your RSVP has been received!')};
function toast(t){const x=document.getElementById('toast');x.textContent=t;x.classList.add('show');setTimeout(()=>x.classList.remove('show'),2500)}
let hindi=false;
document.getElementById('langBtn').onclick=()=>{
 hindi=!hindi;document.body.classList.toggle('hindi',hindi);
 document.getElementById('langBtn').textContent=hindi?'English':'हिंदी';
 document.querySelectorAll('[data-en]').forEach(el=>el.textContent=el.dataset[hindi?'hi':'en']);
 document.querySelectorAll('[data-placeholder-en]').forEach(el=>el.placeholder=el.dataset['placeholder'+(hindi?'Hi':'En')]);
};
const field=document.getElementById('lanterns');
for(let i=0;i<15;i++){const l=document.createElement('div');l.className='lantern';l.style.left=(5+Math.random()*90)+'%';l.style.top=(8+Math.random()*76)+'%';l.style.animationDelay=(-Math.random()*4)+'s';l.style.transform=`scale(${.6+Math.random()*.8})`;field.appendChild(l)}
let ctx,on=false,timer,n=0;
function tone(f,t,d=.3,g=.025){const o=ctx.createOscillator(),v=ctx.createGain();o.frequency.value=f;o.type='triangle';v.gain.setValueAtTime(.0001,t);v.gain.exponentialRampToValueAtTime(g,t+.02);v.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(v).connect(ctx.destination);o.start(t);o.stop(t+d+.03)}
function loop(){if(!on)return;const now=ctx.currentTime,notes=[261.6,329.6,392,440,392,329.6,293.7,261.6];for(let i=0;i<4;i++)tone(notes[(n+i)%notes.length],now+i*.42);n=(n+4)%notes.length;timer=setTimeout(loop,1650)}
document.getElementById('musicBtn').onclick=()=>{if(!on){ctx=new (AudioContext||webkitAudioContext)();on=true;loop();document.getElementById('musicBtn').textContent='❚❚'}else{on=false;clearTimeout(timer);ctx.close();document.getElementById('musicBtn').textContent='♫'}};

// Section 1: falling sparkles
const sparkleField=document.getElementById('sparkles');
if(sparkleField){
  const symbols=['✦','✧','•','✺','❋'];
  function dropSparkle(){
    const s=document.createElement('span');s.className='sparkle';
    s.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    s.style.left=Math.random()*100+'%';
    s.style.setProperty('--size',(8+Math.random()*16)+'px');
    s.style.setProperty('--duration',(4+Math.random()*5)+'s');
    s.style.setProperty('--drift',(-80+Math.random()*160)+'px');
    sparkleField.appendChild(s);
    setTimeout(()=>s.remove(),9500);
  }
  for(let i=0;i<45;i++)setTimeout(dropSparkle,i*80);
  setInterval(dropSparkle,180);
}

// Section 2: floating balloons
const balloonField=document.getElementById('balloons');
if(balloonField){
  const palettes=[['#ee7797','#b34b84'],['#f5c07d','#e5886f'],['#b37cc4','#785aa7'],['#f4d5a6','#e79b86']];
  for(let i=0;i<14;i++){
    const b=document.createElement('div');b.className='balloon';
    const p=palettes[i%palettes.length], w=38+Math.random()*55;
    b.style.left=(Math.random()*96)+'%';
    b.style.top=(5+Math.random()*78)+'%';
    b.style.setProperty('--w',w+'px');
    b.style.setProperty('--c1',p[0]);b.style.setProperty('--c2',p[1]);
    b.style.setProperty('--float',(3+Math.random()*4)+'s');
    b.style.setProperty('--x',(-30+Math.random()*60)+'px');
    b.style.setProperty('--string',(40+Math.random()*90)+'px');
    b.style.opacity=.55+Math.random()*.4;
    balloonField.appendChild(b);
  }
}


/* =========================================================
   PREMIUM INTERACTION & CINEMATIC MOTION CONTROLLER
   ========================================================= */

// Add ambient cinematic light orbs to major visual sections
document.querySelectorAll('.intro-screen,.events-screen,.city-screen,.lantern-screen').forEach(section=>{
  if(!section.querySelector('.ambient-orb')){
    const a=document.createElement('div');
    a.className='ambient-orb orb-one';
    const b=document.createElement('div');
    b.className='ambient-orb orb-two';
    section.prepend(a,b);
  }
});

// Elegant reveal animations
const revealTargets=[
  '.story-center','.timeline-shell','.cream-couple','.city-title',
  '.lantern-copy','.form-panel','.hosts-content','.wedding-footer'
];
revealTargets.forEach((selector)=>{
  const el=document.querySelector(selector);
  if(el) el.classList.add('motion-reveal');
});

const revealObserver=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('in-view');
  });
},{threshold:.16});
document.querySelectorAll('.motion-reveal').forEach(el=>revealObserver.observe(el));

// Timeline event choreography
const timelineObserver=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('timeline-visible');
  });
},{threshold:.28});
document.querySelectorAll('.timeline-item').forEach(el=>timelineObserver.observe(el));

// Mouse / pointer parallax for desktop scenes
const premiumScenes=['.intro-screen','.city-screen','.lantern-screen'];
premiumScenes.forEach(selector=>{
  const scene=document.querySelector(selector);
  if(!scene) return;
  scene.addEventListener('pointermove',(e)=>{
    if(window.innerWidth<701) return;
    const rect=scene.getBoundingClientRect();
    const x=(e.clientX-rect.left)/rect.width-.5;
    const y=(e.clientY-rect.top)/rect.height-.5;
    const content=scene.querySelector('.intro-center,.city-title,.lantern-copy');
    if(content) content.style.transform=`translate3d(${x*10}px,${y*8}px,0)`;
    const orbs=scene.querySelectorAll('.ambient-orb');
    orbs.forEach((orb,i)=>orb.style.translate=`${x*(i?28:-28)}px ${y*(i?20:-20)}px`);
  });
  scene.addEventListener('pointerleave',()=>{
    const content=scene.querySelector('.intro-center,.city-title,.lantern-copy');
    if(content) content.style.transform='';
    scene.querySelectorAll('.ambient-orb').forEach(o=>o.style.translate='');
  });
});

// Premium 3D tilt for cards on desktop
document.querySelectorAll('.timeline-card,.host-family').forEach(card=>{
  card.addEventListener('pointermove',(e)=>{
    if(window.innerWidth<701) return;
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(900px) rotateX(${-y*5}deg) rotateY(${x*6}deg) translateY(-5px)`;
  });
  card.addEventListener('pointerleave',()=>card.style.transform='');
});

// Touch-friendly button ripple
document.querySelectorAll('.pill-btn,.submit-btn,.venue-button').forEach(btn=>{
  btn.addEventListener('click',(e)=>{
    const ripple=document.createElement('span');
    ripple.style.cssText='position:absolute;width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.7);left:50%;top:50%;transform:translate(-50%,-50%) scale(1);pointer-events:none;transition:transform .65s ease,opacity .65s ease;';
    btn.appendChild(ripple);
    requestAnimationFrame(()=>{ripple.style.transform='translate(-50%,-50%) scale(25)';ripple.style.opacity='0'});
    setTimeout(()=>ripple.remove(),700);
  });
});
