// ---- Spotify 임베드 플레이어: iframe 하나를 재사용하고, 목록이 있으면 끝날 때 다음 곡으로 넘어간다
// 순수 함수(테스트 대상)
const nextIdx=(items,i)=>i+1<items.length?i+1:-1;
// 끝 판정: 일시정지 상태에서 끝까지 갔거나, 끝 근처에서 0으로 되돌아온 경우
const ended=(d,last)=>d.duration>0&&d.isPaused&&(d.position>=d.duration-500||(last>d.duration-2000&&d.position<500));
// 미리듣기는 끝에서 정지 이벤트 없이 업데이트가 끊기므로, 끝 근처에서 한동안 소식이 없으면 끝난 것으로 본다
const stalled=(d,now,ts)=>d.duration>0&&d.position>=d.duration-1500&&now-ts>1200;
// 미리듣기가 없는 곡은 재생이 시작되지 않으므로 10초 뒤에도 시작 못 했으면 다음 곡으로 넘긴다
const noStart=(ev,age)=>age>10000&&(!ev||(ev.isPaused&&ev.position===0));
// 소리 크기를 직접 잴 수 없어(교차 출처 iframe) BPM·Energy로 박동 주기·세기를 정한다
const beat=(bpm,energy)=>{let b=bpm>0?bpm:90;while(b>140)b/=2;while(b<60)b*=2;return{bt:60/b,amp:.35+.65*Math.min(1,Math.max(0,(energy??60)/100))}};
if(typeof module!='undefined')module.exports={nextIdx,ended,beat,stalled,noStart};
let SPc=null,SPp=null,lastPos=0,lastEv=null,wd=0;
const albQ=g=>g.t.filter(sid).map(t=>({id:t.tid,sp:sid(t)}));
const spApi=()=>SPp||(SPp=new Promise((ok,no)=>{window.onSpotifyIframeApiReady=ok;const s=document.createElement('script');s.src='https://open.spotify.com/embed/iframe-api/v1';s.onerror=()=>{SPp=null;no()};document.head.appendChild(s)}));
const dock=on=>{$('#dock').hidden=!on};
function plUi(){document.querySelectorAll('.pl').forEach(b=>b.classList.toggle('np',!!(A.play&&!A.play.paused&&b.dataset.id==A.play.id)));
 const P=A.play,q=A.pq;if(!P||!q)return;const o=B.S.find(x=>x.id==P.id);$('#dnow').textContent=(q.items.length>1?(q.i+1)+'/'+q.items.length+' · ':'')+(o?sn(o.r):'')}
function pulse(pos){const pp=$('#pp'),P=A.play;if(!P){pp.hidden=true;return}
 const o=B.S.find(x=>x.id==P.id),b=beat(o&&o.r.m.BPM,o&&o.r.m.Energy);
 pp.style.setProperty('--bt',b.bt+'s');pp.style.setProperty('--amp',b.amp);pp.style.setProperty('--ph',-((pos||0)/1000%b.bt)+'s');pp.classList.toggle('pz',!!P.paused);draw3d()}
function playQ(items,i){if(!items[i])return;A.pq={items,i};A.play={id:items[i].id,paused:false,t:Date.now()};lastPos=0;lastEv=null;if(!wd)wd=setInterval(()=>{const P=A.play;if(P&&!P.adv&&((!P.paused&&lastEv&&stalled(lastEv.d,Date.now(),lastEv.ts))||noStart(lastEv&&lastEv.d,Date.now()-P.t))){P.adv=1;plNext()}},700);dock(true);plUi();pulse(0);
 spApi().then(api=>{const u='spotify:track:'+items[i].sp;
  if(SPc){SPc.loadUri(u);SPc.play();return}
  api.createController($('#dpl'),{uri:u,width:'100%',height:80},c=>{SPc=c;c.addListener('ready',()=>c.play());c.addListener('playback_update',onPb)})
 }).catch(()=>{plStop();modal('<p>Spotify 플레이어를 불러오지 못했습니다. 네트워크나 차단 설정을 확인하세요.</p><div class="bt"><button data-act="x">확인</button></div>')})}
function onPb(e){const d=e.data,P=A.play;if(!P)return;lastEv={d,ts:Date.now()};const was=P.paused;P.paused=d.isPaused;
 if(was!==d.isPaused){pulse(d.position);plUi()}
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
