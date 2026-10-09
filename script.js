const $=s=>document.querySelector(s);
const rnd=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const pick=a=>a[rnd(0,a.length-1)];
const stage=$('#stage'),btn=$('#btn');

let n=0,rot=0,flip=false,mute=false,ac;

const LV=['Calm','Curious','Nervous','Suspicious','Unhinged','Cursed','Haunted','Apocalyptic'];
const TAUNT=['That tickled.','Why are you still clicking?','Nothing happened. Probably.','Click harder. No, softer.','Your finger is now legally responsible.','The button has feelings, you know.','Congratulations, you wasted 0.3 seconds.','Stop. No wait, keep going.',"This is why we can't have nice things.",'A wild UI appeared.'];
const LABELS=['CLICK ME','DON\'T','OW','STOP','AGAIN?','WHY?','NOPE','CLICK ME (PLEASE)','HARDER','TOO LATE'];
const POP=['Your click has been registered. Unfortunately.','Update available: Click 2.0 (it is worse).','Congrats! You are visitor #1,000,000! (lie)','Your clicks are being sent to a very disappointed server.','Error 418: I am a teapot, and you are clicking me.','Warning: finger fatigue detected.'];

function toast(t){const d=document.createElement('div');d.className='toast';d.textContent=t;document.body.appendChild(d);setTimeout(()=>d.remove(),2400);}
function applyT(){stage.style.transform='rotate('+(rot+(flip?180:0))+'deg)';}

function place(el){
  const w=stage.clientWidth-el.offsetWidth,h=stage.clientHeight-el.offsetHeight;
  el.style.left=rnd(0,Math.max(0,w))+'px';
  el.style.top=rnd(110,Math.max(110,h-60))+'px';
}

function beep(){
  if(mute)return;
  try{
    ac=ac||new (window.AudioContext||window.webkitAudioContext)();
    const o=ac.createOscillator(),g=ac.createGain();
    o.type=pick(['square','sawtooth','triangle']);
    o.frequency.value=rnd(150,900)+n*3;g.gain.value=.05;
    o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+.12);
  }catch(e){}
}

function burst(){
  const x=btn.offsetLeft+btn.offsetWidth/2,y=btn.offsetTop+btn.offsetHeight/2;
  for(let i=0;i<8;i++){
    const s=document.createElement('span');s.className='fly';
    s.textContent=pick(['💥','🤡','🔥','💩','👀','🦆','🧀','😭']);
    s.style.left=x+'px';s.style.top=y+'px';
    s.style.setProperty('--dx',rnd(-200,200)+'px');s.style.setProperty('--dy',rnd(-200,200)+'px');
    stage.appendChild(s);setTimeout(()=>s.remove(),1300);
  }
}

function popup(){
  if(stage.querySelectorAll('.pop').length>=6)return;
  const d=document.createElement('div');d.className='pop';
  d.innerHTML='<div class="pt"><span>⚠ System</span><button class="px">x</button></div><p>'+pick(POP)+'</p><button class="ok">OK</button>';
  d.style.left=rnd(0,Math.max(0,stage.clientWidth-250))+'px';
  d.style.top=rnd(110,Math.max(110,stage.clientHeight-150))+'px';
  d.querySelector('.ok').onclick=()=>{d.remove();hit();};
  d.querySelector('.px').onclick=()=>{toast('Nice try.');popup();};
  stage.appendChild(d);
}

function decoy(){
  const all=stage.querySelectorAll('.decoy');if(all.length>=10)all[0].remove();
  const b=document.createElement('button');b.className='decoy';
  b.textContent=pick(['NOT THIS ONE','CLICK ME TOO','DO NOT CLICK','FREE MONEY','WRONG BUTTON','ALSO ME']);
  stage.appendChild(b);place(b);
  b.onclick=()=>{place(b);hit();};
}

function overlay(html,cls){const o=document.createElement('div');o.className='ov '+(cls||'');o.innerHTML=html;document.body.appendChild(o);return o;}

const E={
  bg(){document.body.style.background='hsl('+rnd(0,360)+' 90% 55%)';},
  move(){place(btn);},
  size(){btn.style.fontSize=rnd(14,56)+'px';place(btn);},
  shake(){try{stage.animate([{translate:'0 0'},{translate:'14px -9px'},{translate:'-14px 9px'},{translate:'0 0'}],{duration:350});}catch(e){}},
  emoji(){burst();},
  tilt(){rot=Math.max(-20,Math.min(20,rot+rnd(-6,6)));applyT();},
  font(){stage.style.fontFamily=pick(['Comic Sans MS','Courier New','Impact','Georgia','cursive']);},
  popup(){popup();},
  lie(){const f=$('#n');f.textContent=n+rnd(-9,99);setTimeout(()=>{f.textContent=n;},700);},
  flip(){flip=!flip;applyT();},
  filter(){stage.style.filter=pick(['invert(1)','hue-rotate(137deg) saturate(3)','blur(2px)','contrast(3)','none']);},
  decoy(){decoy();},
  cursor(){stage.style.cursor=pick(['wait','not-allowed','help','crosshair','progress']);}
};

function mile(){
  if(n===1)toast('Great. Now you have started.');
  if(n===2){btn.classList.add('jit');toast('LEVEL 2: The button is now nervous.');}
  if(n===4){
    const m=document.createElement('div');m.className='ban';
    m.innerHTML='<span>STOP CLICKING STOP CLICKING STOP CLICKING STOP CLICKING STOP CLICKING STOP CLICKING</span>';
    stage.appendChild(m);toast('LEVEL 3: A sign appeared.');
  }
  if(n===7)toast('LEVEL 4: We are now speaking in popups.');
  if(n===10){
    const o=overlay('<h2>Calculating your reward...</h2><h1>99%</h1>');
    setTimeout(()=>{
      o.innerHTML='<h2>Your reward:</h2><h1>🎁 nothing</h1><button class="ob">Fine.</button>';
      o.querySelector('.ob').onclick=()=>o.remove();
    },3500);
  }
  if(n===20){
    const o=overlay('<h1>:(</h1><h2>Your PC ran into a click and needs to restart.</h2><p>100% clicked</p><button class="ob">Click here 3 times to restart</button>','bsod');
    let c=3;const b=o.querySelector('.ob');
    b.onclick=()=>{c--;if(c<=0)o.remove();else b.textContent=c+' more times...';};
  }
}

function hit(){
  n++;
  $('#n').textContent=n;
  $('#lv').textContent=LV[Math.min(Math.floor(n/2),LV.length-1)];
  document.title='('+n+') Chaos Click';
  beep();
  $('#msg').textContent=pick(TAUNT);
  const pool=['bg','move','emoji','size','shake'];
  if(n>=2)pool.push('tilt','font','popup','lie');
  if(n>=4)pool.push('flip','filter','decoy','cursor');
  const k=Math.min(1+Math.floor(n/3),5);
  pool.sort(()=>Math.random()-.5).slice(0,k).forEach(f=>E[f]());
  if(n>=8)btn.textContent=pick(LABELS);
  mile();
}

btn.onclick=hit;
btn.style.left=((stage.clientWidth-btn.offsetWidth)/2)+'px';
btn.style.top=((stage.clientHeight-btn.offsetHeight)/2)+'px';
$('#mute').onclick=()=>{mute=!mute;$('#mute').textContent=mute?'🔇':'🔊';};
$('#calm').onclick=e=>{e.preventDefault();location.reload();};
document.addEventListener('keydown',e=>{if(e.key==='Escape')location.reload();});
