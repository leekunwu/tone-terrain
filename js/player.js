// ---- Spotify 임베드 플레이어: iframe 하나를 재사용하고, 목록이 있으면 끝날 때 다음 곡으로 넘어간다
// 순수 함수(테스트 대상)
const nextIdx=(items,i)=>i+1<items.length?i+1:-1;
// 끝 판정: 일시정지 상태에서 끝까지 갔거나, 끝 근처에서 0으로 되돌아온 경우
const ended=(d,last)=>d.duration>0&&d.isPaused&&(d.position>=d.duration-500||(last>d.duration-2000&&d.position<500));
// 미리듣기는 끝에서 정지 이벤트 없이 업데이트가 끊기므로, 끝 근처에서 한동안 소식이 없으면 끝난 것으로 본다
const stalled=(d,now,ts)=>d.duration>0&&d.position>=d.duration-1500&&now-ts>1200;
// 미리듣기가 없는 곡은 재생이 시작되지 않으므로 10초 뒤에도 시작 못 했으면 다음 곡으로 넘긴다
const noStart=(ev,age)=>age>10000&&(!ev||(ev.isPaused&&ev.position===0));
// 소리 크기를 직접 잴 수 없어(교차 출처 iframe) BPM·Energy로 박동 주기·세기를 정한다. BPM이 없으면 90
const beat=(bpm,energy)=>({bt:60/(bpm>0?bpm:90),amp:.35+.65*Math.min(1,Math.max(0,(energy??60)/100))});
// 주기 p 위에서 a와 b의 부호 있는 차이(-p/2..p/2): 박동이 재생 위치에서 얼마나 벗어났는지
const circ=(a,b,p)=>{let d=(a-b)%p;if(d>p/2)d-=p;if(d<-p/2)d+=p;return d};
if(typeof module!='undefined')module.exports={nextIdx,ended,beat,stalled,noStart,circ};
let SPc=null,SPp=null,lastPos=0,lastEv=null,wd=0;
const albQ=g=>g.t.filter(sid).map(t=>({id:t.tid,sp:sid(t)}));
const spApi=()=>SPp||(SPp=new Promise((ok,no)=>{window.onSpotifyIframeApiReady=ok;const s=document.createElement('script');s.src='https://open.spotify.com/embed/iframe-api/v1';s.onerror=()=>{SPp=null;no()};document.head.appendChild(s)}));
const dock=on=>{$('#dock').hidden=!on};
function plUi(){document.querySelectorAll('.tr').forEach(li=>{const b=li.querySelector('.pl[data-id]');li.classList.toggle('now',!!(A.play&&b&&b.dataset.id==A.play.id))});
 document.querySelectorAll('.pl').forEach(b=>b.classList.toggle('np',!!(A.play&&!A.play.paused&&b.dataset.id==A.play.id)));
 const P=A.play,q=A.pq;if(!P||!q)return;const o=B.S.find(x=>x.id==P.id);$('#dnow').textContent=(q.items.length>1?(q.i+1)+'/'+q.items.length+' · ':'')+(o?sn(o.r):'')}
function pulse(pos){const pp=$('#pp'),P=A.play;if(!P){pp.hidden=true;return}
 const o=B.S.find(x=>x.id==P.id),b=beat(o&&o.r.m.BPM,o&&o.r.m.Energy);
 P.bt=b.bt;pp.style.setProperty('--bt',b.bt+'s');pp.style.setProperty('--amp',b.amp);pp.classList.toggle('pz',!!P.paused);draw3d();sync(pos||0)}
// 재생 위치에 박동 위상을 맞춘다: 80ms 넘게 벗어났을 때만 보정해 떨림을 막는다
function sync(pos){const P=A.play;if(!P||P.paused||!P.bt)return;const p=P.bt*1000,want=pos%p;
 $('#pp').getAnimations({subtree:true}).forEach(a=>{if(Math.abs(circ((a.currentTime||0)%p,want,p))>80)a.currentTime=want})}
function playQ(items,i){if(!items[i])return;A.pq={items,i};A.play={id:items[i].id,paused:false,t:Date.now()};lastPos=0;lastEv=null;if(!wd)wd=setInterval(()=>{const P=A.play;if(P&&!P.adv&&((!P.paused&&lastEv&&stalled(lastEv.d,Date.now(),lastEv.ts))||noStart(lastEv&&lastEv.d,Date.now()-P.t))){P.adv=1;plNext()}},700);dock(true);plUi();pulse(0);
 spApi().then(api=>{const u='spotify:track:'+items[i].sp;
  if(SPc){SPc.loadUri(u);SPc.play();return}
  api.createController($('#dpl'),{uri:u,width:'100%',height:80},c=>{SPc=c;c.addListener('ready',()=>c.play());c.addListener('playback_update',onPb)})
 }).catch(()=>{plStop();modal('<p>Spotify 플레이어를 불러오지 못했습니다. 네트워크나 차단 설정을 확인하세요.</p><div class="bt"><button data-act="x">확인</button></div>')})}
function onPb(e){const d=e.data,P=A.play;if(!P)return;lastEv={d,ts:Date.now()};const was=P.paused;P.paused=d.isPaused;
 if(was!==d.isPaused){pulse(d.position);plUi()}else if(!d.isPaused)sync(d.position);
 if(ended(d,lastPos)&&!P.adv){P.adv=1;plNext()}lastPos=d.position}
function plNext(){const q=A.pq;if(!q)return;const n=nextIdx(q.items,q.i);if(n<0){A.play.paused=true;plUi();pulse(0);return}playQ(q.items,n)}
function plPrev(){const q=A.pq;if(q&&q.i>0)playQ(q.items,q.i-1)}
function plStop(){if(SPc){try{SPc.pause()}catch(_){}}A.play=null;A.pq=null;dock(false);plUi();pulse()}
function plClick(b){const d=b.dataset;let items,i;
 if(d.alb){const g=B.G.find(x=>x.key==d.alb);items=g?albQ(g):[];i=0}
 else if(d.ctx){const g=B.G.find(x=>x.key==d.ctx);items=g?albQ(g):[];i=items.findIndex(x=>x.id==d.id)}
 else{const L=b.closest('ul');items=L?[...L.querySelectorAll('.pl[data-sp]')].map(x=>({id:x.dataset.id,sp:x.dataset.sp})):[];i=items.findIndex(x=>x.id==d.id)}
 if(i<0||!items.length){items=[{id:d.id,sp:d.sp}];i=0}
 if(A.play&&items[i]&&A.play.id==items[i].id&&SPc){SPc.togglePlay();return}
 playQ(items,i)}
// Space = 재생/일시정지. 입력창·선택창·버튼·링크에 포커스가 있을 때는 기본 동작을 존중한다
function plToggle(){if(A.play){if(SPc)SPc.togglePlay();return}
 const s=A.sel;if(!s)return;let items,i=0;
 if(s.k){const g=B.G.find(x=>x.key==s.k);items=g?albQ(g):[]}
 else{const o=B.S.find(x=>x.id==s.s);if(!o||!sid(o.r))return;const g=s.from&&B.G.find(x=>x.key==s.from);items=g?albQ(g):[{id:o.id,sp:sid(o.r)}];i=Math.max(0,items.findIndex(x=>x.id==o.id))}
 if(items.length)playQ(items,i)}
if(typeof document!='undefined')document.addEventListener('keydown',e=>{if(e.code!='Space'||e.repeat||e.ctrlKey||e.metaKey||e.altKey||dlg.open)return;
 const t=e.target;if(t.closest&&t.closest('input,textarea,select,button,a,summary,iframe,[contenteditable]'))return;
 if(A.play||A.sel){e.preventDefault();plToggle()}});
