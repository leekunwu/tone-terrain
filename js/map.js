// ---- 3D 지도
const cv=$('#map'),g2=cv.getContext('2d'),RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const AK=()=>[A.x,A.y,A.z],cs=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const nm=(k,v)=>{const d=dd(k);return(v-d[0])/(d[1]-d[0])*2-1};
// 구 중심·후보의 좌표: 지도에 찍힌 점과 같은 값(앨범은 분석된 수록곡 평균)
const okp=r=>AK().every(k=>r.m[k]!=null),pt=r=>AK().map(k=>nm(k,r.m[k]));
const posOf=x=>{if(x.t){const S=x.t.filter(okp).map(pt);return S.length?[0,1,2].map(i=>avg(S.map(q=>q[i]))):null}return okp(x.r)?pt(x.r):null};
const cen=id=>{const x=B.G.find(g=>g.key==id)||B.S.find(o=>o.id==id);return x&&posOf(x)};
const sphIn=()=>{const s=A.sph,c=s&&cen(s.id);return c?inside(vis().map(x=>({id:x.key||x.id,x,p:posOf(x)})).filter(o=>o.p&&o.id!=s.id),c,s.r):[]};
function size(){const r=cv.getBoundingClientRect();A.d=devicePixelRatio||1;cv.width=r.width*A.d;cv.height=r.height*A.d;A.w=r.width;A.h=r.height}
new ResizeObserver(()=>{size();draw3d()}).observe(cv.parentNode);
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>draw3d());
function pj(p){p=qr(A.qt,p);const{yaw,pit,zm,px=0,py=0}=A.cam,cy=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pit),sp=Math.sin(pit);
 const x=p[0]*cy+p[2]*sy,z0=-p[0]*sy+p[2]*cy,y=p[1]*cp-z0*sp,z=p[1]*sp+z0*cp,f=5/(5-z)*zm,s=Math.min(A.w,A.h)*.3;return{x:A.w/2+px+x*s*f,y:A.h/2+py-y*s*f,z,f}}
function draw3d(){if(!A.w)size();const c=g2,d=A.d;c.setTransform(d,0,0,d,0,0);c.clearRect(0,0,A.w,A.h);
 const ln=cs('--ln2'),mu=cs('--mu'),ac=cs('--ac'),dot=cs('--dot'),bg=cs('--pn'),tx=cs('--tx'),CC=['',cs('--c1'),cs('--c2'),cs('--c3')],ff='"SUIT Variable",system-ui,sans-serif';
 const cr=[];for(let i=0;i<8;i++)cr.push([i&1?1:-1,i&2?1:-1,i&4?1:-1]);
 c.strokeStyle=ln;c.lineWidth=1;c.beginPath();
 for(let i=0;i<8;i++)for(let b=1;b<8;b<<=1)if(!(i&b)){const p=pj(cr[i]),q=pj(cr[i|b]);c.moveTo(p.x,p.y);c.lineTo(q.x,q.y)}c.stroke();
 c.textAlign='center';
 AK().forEach((k,i)=>{const o=[-1,-1,-1],e=[-1,-1,-1],l=[-1,-1,-1];e[i]=1;l[i]=1.25;const p=pj(o),q=pj(e),t=pj(l),dm=dd(k);
  c.strokeStyle=tx;c.globalAlpha=.45;c.lineWidth=1.5;c.beginPath();c.moveTo(p.x,p.y);c.lineTo(q.x,q.y);c.stroke();c.globalAlpha=1;
  c.fillStyle=tx;c.font='700 12px '+ff;c.fillText(['X','Y','Z'][i]+' '+k,t.x,t.y);c.fillStyle=mu;c.font='11px '+ff;c.fillText(dm[0]+'–'+dm[1],t.x,t.y+14)});
 const V=vis(),[kx,ky,kz]=AK(),T=!A.t0||RM?1:Math.min(1,(performance.now()-A.t0)/800),it=[];
 const okk=r=>r.m[kx]!=null&&r.m[ky]!=null&&r.m[kz]!=null,P3=r=>[nm(kx,r.m[kx]),nm(ky,r.m[ky]),nm(kz,r.m[kz])],alb=A.view=='album';
 if(alb)V.forEach(g=>{const S=g.t.filter(okk);if(S.length){const Q=S.map(P3);it.push({id:g.key,rp:pj([0,1,2].map(i=>avg(Q.map(q=>q[i])))),S:Q.map(pj)})}});
 else V.forEach(o=>{if(okk(o.r))it.push({id:o.id,rp:pj(P3(o.r)),S:[]})});
 A.nvalid=it.length;A.pts=[];const FS=new Set(A.flags);it.sort((a,b)=>(FS.has(a.id)-FS.has(b.id))||a.rp.z-b.rp.z); // 플래그 항목은 맨 위에 그린다
 const SC=A.sph&&cen(A.sph.id),IN=SC&&new Set(sphIn().map(o=>o.id)),inV=new Set(it.map(o=>o.id));
 if(SC){const p=pj(SC),R=(1-A.sph.r/100)*DM*Math.min(A.w,A.h)*.3*p.f;c.fillStyle=ac;c.globalAlpha=.08;c.beginPath();c.arc(p.x,p.y,R,0,7);c.fill();
  c.strokeStyle=ac;c.globalAlpha=.7;c.lineWidth=1.5;c.setLineDash([5,4]);c.stroke();c.setLineDash([]);
  c.globalAlpha=.3;c.lineWidth=1;c.beginPath();c.ellipse(p.x,p.y,R,R*Math.abs(Math.sin(A.cam.pit)),0,0,7);c.stroke();
  c.globalAlpha=1;c.fillStyle=tx;c.font='700 11px '+ff;c.textAlign='center';c.fillText('유사도 '+A.sph.r+'% 이상 · '+IN.size,p.x,p.y-R-6)}
 if(A.ax){c.strokeStyle=ac;c.lineWidth=1;c.globalAlpha=.22;c.setLineDash([3,4]);A.flags.forEach(id=>{const q=cen(id);if(q)[0,1,2].forEach(i=>{const a=[...q],b=[...q];a[i]=-1;b[i]=1;const s=pj(a),e=pj(b);c.beginPath();c.moveTo(s.x,s.y);c.lineTo(e.x,e.y);c.stroke()})});c.setLineDash([]);c.globalAlpha=1}
 const ra=Math.min(1,T/.35),sa=Math.min(1,Math.max(0,(T-.3)/.4));
 const hv=A.hl&&it.some(o=>o.id==A.hl);it.forEach(o=>{const sl=A.sel&&(A.sel.k==o.id||A.sel.s==o.id||A.sel.from==o.id),h=A.hl==o.id,ci=A.cmp.indexOf(o.id)+1,fg=A.flags.includes(o.id),dim=(hv&&!h&&!sl&&!fg)||(IN&&!IN.has(o.id)&&o.id!=A.sph.id&&!h&&!sl&&!fg),col=ci?CC[ci]:sl||h||fg?ac:dot,al=dim?.2:1;
  if(o.S.length&&(sl||h||ci)){c.strokeStyle=col;c.lineWidth=1;c.globalAlpha=.35*sa;c.beginPath();o.S.forEach(s=>{c.moveTo(o.rp.x,o.rp.y);c.lineTo(s.x,s.y)});c.stroke()}
  c.fillStyle=col;c.globalAlpha=.75*al*sa;o.S.forEach(s=>{c.beginPath();c.arc(s.x,s.y,2.6*s.f,0,7);c.fill()});
  c.globalAlpha=al*ra;const r=(alb?6.5:5)*o.rp.f;c.beginPath();c.arc(o.rp.x,o.rp.y,r,0,7);c.fill();c.strokeStyle=bg;c.lineWidth=1.5;c.stroke();
  if(sl||h){c.strokeStyle=col;c.lineWidth=2;c.globalAlpha=.5;c.beginPath();c.arc(o.rp.x,o.rp.y,r+4,0,7);c.stroke()}
  if(ci){c.globalAlpha=1;c.fillStyle=tx;c.font='700 12px '+ff;c.textAlign='left';c.fillText(ci,o.rp.x+r+4,o.rp.y-r);c.textAlign='center'}
  c.globalAlpha=1;A.pts.push({id:o.id,x:o.rp.x,y:o.rp.y})});
 if(A.sel&&A.sel.s){const o=B.S.find(x=>x.id==A.sel.s);if(o&&okk(o.r)){const p=pj(P3(o.r)),R0=24*p.f;c.fillStyle=ac;c.strokeStyle=ac;c.globalAlpha=.16;c.beginPath();c.arc(p.x,p.y,R0,0,7);c.fill();
  c.globalAlpha=.9;c.lineWidth=2;c.beginPath();c.arc(p.x,p.y,R0,0,7);c.stroke();c.globalAlpha=.4;c.lineWidth=1;c.beginPath();c.ellipse(p.x,p.y,R0,R0*.35,0,0,7);c.stroke();
  c.globalAlpha=1;c.beginPath();c.arc(p.x,p.y,4*p.f,0,7);c.fill();c.fillStyle=tx;c.font='700 12px '+ff;c.fillText(o.r.song||'제목 없음',p.x,p.y-R0-8)}}
 // 플래그: 모든 뷰에서 항상 보이는 박동 표시(CSS 애니메이션). 현재 뷰에 점이 없으면 점도 함께 그린다
 const FP=[];A.flags.forEach(id=>{const q=cen(id);if(q){const p=pj(q);FP.push({x:p.x,y:p.y,dot:!inV.has(id)})}});
 const fl=$('#fl');while(fl.children.length>FP.length)fl.lastChild.remove();while(fl.children.length<FP.length)fl.insertAdjacentHTML('beforeend','<div class="fp"><i></i><b></b></div>');
 FP.forEach((f,i)=>{const e=fl.children[i];e.style.transform=`translate(${f.x}px,${f.y}px)`;e.classList.toggle('dt',f.dot)});
 if(T<1)requestAnimationFrame(draw3d)}
const near=e=>{const r=cv.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;return(A.pts||[]).map(p=>({id:p.id,d:Math.hypot(p.x-x,p.y-y)})).filter(p=>p.d<10).sort((a,b)=>a.d-b.d)};
function lh(){document.querySelectorAll('#side [data-hl]').forEach(b=>b.classList.toggle('lh',b.dataset.hl==A.hl))}
function setHl(id,e){const tip=$('#tip');if(A.hl!=id){A.hl=id;draw3d();lh()}
 if(id&&e){const a=B.G.find(x=>x.key==id),o=B.S.find(x=>x.id==id);if(!a&&!o)return;const ar=a?artists(a.t):[o.r.artist];
  tip.innerHTML=`<b>${esc(a?a.al:o.r.song||'제목 없음')}</b><br>${esc(ar.slice(0,2).join(', '))}${ar.length>2?' 외 '+(ar.length-2):''}`;
  const b=cv.parentNode.getBoundingClientRect();tip.style.left=Math.min(e.clientX-b.left+14,b.width-270)+'px';tip.style.top=e.clientY-b.top+14+'px';tip.style.display='block'}else tip.style.display='none'}
let dn=null;
cv.oncontextmenu=e=>e.preventDefault();
cv.onpointerdown=e=>{dn={x:e.clientX,y:e.clientY,m:0,c:{...A.cam},pan:e.button==1||e.button==2||e.ctrlKey||e.metaKey||e.shiftKey};cv.setPointerCapture(e.pointerId)};
cv.onpointermove=e=>{if(dn){const dx=e.clientX-dn.x,dy=e.clientY-dn.y;if(Math.hypot(dx,dy)>4)dn.m=1;
  if(dn.m){setHl(null);cv.style.cursor=dn.pan?'move':'grabbing';if(dn.pan){A.cam.px=(dn.c.px||0)+dx;A.cam.py=(dn.c.py||0)+dy}else{A.cam.yaw=dn.c.yaw+dx*.008;A.cam.pit=Math.max(-1.5,Math.min(1.5,dn.c.pit+dy*.008))}draw3d()}return}
 const n=near(e);cv.style.cursor=n.length?'pointer':'grab';setHl(n.length?n[0].id:null,e)};
cv.onpointerleave=()=>{if(!dn)setHl(null)};
cv.onpointerup=e=>{const m=dn&&(dn.m||dn.pan);dn=null;if(m)return;const n=near(e);
 if(n.length>1)A.pick=n.map(p=>p.id);else{A.pick=null;if(n.length)sel(n[0].id);else A.sel=null}render()};
cv.onwheel=e=>{e.preventDefault();A.cam.zm=Math.max(.5,Math.min(3,A.cam.zm*(e.deltaY<0?1.1:.9)));draw3d()};
cv.onkeydown=e=>{const k={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key];if(k){e.preventDefault();if(e.shiftKey){A.cam.px=(A.cam.px||0)+k[0]*30;A.cam.py=(A.cam.py||0)+k[1]*30}else{A.cam.yaw+=k[0]*.1;A.cam.pit=Math.max(-1.5,Math.min(1.5,A.cam.pit+k[1]*.1))}draw3d()}};
const sd=$('#side');
sd.addEventListener('mouseover',e=>{const b=e.target.closest('[data-hl]');if(b)setHl(b.dataset.hl)});
sd.addEventListener('mouseout',e=>{if(e.target.closest('[data-hl]')&&!(e.relatedTarget&&e.relatedTarget.closest&&e.relatedTarget.closest('[data-hl]')))setHl(null)});
sd.addEventListener('focusin',e=>{const b=e.target.closest('[data-hl]');if(b)setHl(b.dataset.hl)});sd.addEventListener('focusout',()=>setHl(null));
function sel(id){A.sel=A.view=='album'?{k:id}:{s:id}}

// ---- 자동 회전 / 기본 시점 복귀
const RL=['정지','X축','Y축','Z축','전체'],RA=[null,[1,0,0],[0,1,0],[0,0,1]];
let rt=0,rv=0,rraf=0;
function rbtn(){const b=$('#rot'),m=A.rot.mode;b.innerHTML=RI(m)+'<span>'+RL[m]+'</span>';b.classList.toggle('on',m>0);b.setAttribute('aria-label','자동 회전: '+RL[m]+' (누르면 '+RL[(m+1)%5]+')')}
// 가속·감속(rv)을 두어 시작과 정지가 부드럽다. 회전은 데이터 축 기준(q ⊗ r)이고 드래그 중에는 멈춘다
function spin(now){rraf=0;const dt=Math.min(.05,(now-(rt||now))/1000);rt=now;rv+=((A.rot.mode?1:0)-rv)*Math.min(1,dt*5);
 if(!(dn&&dn.m)&&!A.homing)A.qt=qn(qm(A.qt,qa(A.rot.ax||drift(now/1000),(A.rot.intro?.16:.5)*rv*dt)));
 draw3d();if(A.rot.mode||rv>.01)rraf=requestAnimationFrame(spin);else rt=0}
const spinKick=()=>{if(!rraf){rt=0;rraf=requestAnimationFrame(spin)}};
function introOn(){if(A.rows.length)return;A.rot={mode:4,intro:1,ax:null};rbtn();if(!RM)spinKick()}
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
function home(ms=900){A.rot.mode=0;A.rot.intro=0;rv=0;rbtn();
 if(RM){A.cam={yaw:-.6,pit:.4,zm:1,px:0,py:0};A.qt=[1,0,0,0];draw3d();return}
 const c0={...A.cam},q0=A.qt.slice(),sg=q0[0]<0?-1:1,t0=performance.now(),TP=2*Math.PI;A.homing=1;
 const f=now=>{const k=Math.min(1,(now-t0)/ms),e=ease(k),L=(a,b)=>a+(b-a)*e,dy=(((-.6-c0.yaw+Math.PI)%TP)+TP)%TP-Math.PI;
  A.cam={yaw:c0.yaw+dy*e,pit:L(c0.pit,.4),zm:L(c0.zm,1),px:L(c0.px||0,0),py:L(c0.py||0,0)};
  A.qt=qn([L(sg*q0[0],1),L(sg*q0[1],0),L(sg*q0[2],0),L(sg*q0[3],0)]);draw3d();
  if(k<1)requestAnimationFrame(f);else A.homing=0};requestAnimationFrame(f)}
