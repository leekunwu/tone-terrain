// ---- 3D 지도
const cv=$('#map'),g2=cv.getContext('2d'),RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const AK=()=>[A.x,A.y,A.z],cs=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const nm=(k,v)=>{const d=dd(k);return(v-d[0])/(d[1]-d[0])*2-1};
function size(){const r=cv.getBoundingClientRect();A.d=devicePixelRatio||1;cv.width=r.width*A.d;cv.height=r.height*A.d;A.w=r.width;A.h=r.height}
new ResizeObserver(()=>{size();draw3d()}).observe(cv.parentNode);
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>draw3d());
function pj(p){const{yaw,pit,zm}=A.cam,cy=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pit),sp=Math.sin(pit);
 const x=p[0]*cy+p[2]*sy,z0=-p[0]*sy+p[2]*cy,y=p[1]*cp-z0*sp,z=p[1]*sp+z0*cp,f=5/(5-z)*zm,s=Math.min(A.w,A.h)*.3;return{x:A.w/2+x*s*f,y:A.h/2-y*s*f,z,f}}
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
 A.nvalid=it.length;A.pts=[];it.sort((a,b)=>a.rp.z-b.rp.z);
 const ra=Math.min(1,T/.35),sa=Math.min(1,Math.max(0,(T-.3)/.4));
 const hv=A.hl&&it.some(o=>o.id==A.hl);it.forEach(o=>{const sl=A.sel&&(A.sel.k==o.id||A.sel.s==o.id||A.sel.from==o.id),h=A.hl==o.id,ci=A.cmp.indexOf(o.id)+1,dim=hv&&!h&&!sl,col=ci?CC[ci]:sl||h?ac:dot,al=dim?.2:1;
  if(o.S.length&&(sl||h||ci)){c.strokeStyle=col;c.lineWidth=1;c.globalAlpha=.35*sa;c.beginPath();o.S.forEach(s=>{c.moveTo(o.rp.x,o.rp.y);c.lineTo(s.x,s.y)});c.stroke()}
  c.fillStyle=col;c.globalAlpha=.75*al*sa;o.S.forEach(s=>{c.beginPath();c.arc(s.x,s.y,2.6*s.f,0,7);c.fill()});
  c.globalAlpha=al*ra;const r=(alb?6.5:5)*o.rp.f;c.beginPath();c.arc(o.rp.x,o.rp.y,r,0,7);c.fill();c.strokeStyle=bg;c.lineWidth=1.5;c.stroke();
  if(sl||h){c.strokeStyle=col;c.lineWidth=2;c.globalAlpha=.5;c.beginPath();c.arc(o.rp.x,o.rp.y,r+4,0,7);c.stroke()}
  if(ci){c.globalAlpha=1;c.fillStyle=tx;c.font='700 12px '+ff;c.textAlign='left';c.fillText(ci,o.rp.x+r+4,o.rp.y-r);c.textAlign='center'}
  c.globalAlpha=1;A.pts.push({id:o.id,x:o.rp.x,y:o.rp.y})});
 if(A.sel&&A.sel.s){const o=B.S.find(x=>x.id==A.sel.s);if(o&&okk(o.r)){const p=pj(P3(o.r)),R0=24*p.f;c.fillStyle=ac;c.strokeStyle=ac;c.globalAlpha=.16;c.beginPath();c.arc(p.x,p.y,R0,0,7);c.fill();
  c.globalAlpha=.9;c.lineWidth=2;c.beginPath();c.arc(p.x,p.y,R0,0,7);c.stroke();c.globalAlpha=.4;c.lineWidth=1;c.beginPath();c.ellipse(p.x,p.y,R0,R0*.35,0,0,7);c.stroke();
  c.globalAlpha=1;c.beginPath();c.arc(p.x,p.y,4*p.f,0,7);c.fill();c.fillStyle=tx;c.font='700 12px '+ff;c.fillText(o.r.song||'제목 없음',p.x,p.y-R0-8)}}
 if(T<1)requestAnimationFrame(draw3d)}
const near=e=>{const r=cv.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;return(A.pts||[]).map(p=>({id:p.id,d:Math.hypot(p.x-x,p.y-y)})).filter(p=>p.d<10).sort((a,b)=>a.d-b.d)};
function lh(){document.querySelectorAll('#side [data-hl]').forEach(b=>b.classList.toggle('lh',b.dataset.hl==A.hl))}
function setHl(id,e){const tip=$('#tip');if(A.hl!=id){A.hl=id;draw3d();lh()}
 if(id&&e){const a=B.G.find(x=>x.key==id),o=B.S.find(x=>x.id==id);if(!a&&!o)return;const ar=a?artists(a.t):[o.r.artist];
  tip.innerHTML=`<b>${esc(a?a.al:o.r.song||'제목 없음')}</b><br>${esc(ar.slice(0,2).join(', '))}${ar.length>2?' 외 '+(ar.length-2):''}`;
  const b=cv.parentNode.getBoundingClientRect();tip.style.left=Math.min(e.clientX-b.left+14,b.width-270)+'px';tip.style.top=e.clientY-b.top+14+'px';tip.style.display='block'}else tip.style.display='none'}
let dn=null;
cv.onpointerdown=e=>{dn={x:e.clientX,y:e.clientY,m:0,c:{...A.cam}};cv.setPointerCapture(e.pointerId)};
cv.onpointermove=e=>{if(dn){const dx=e.clientX-dn.x,dy=e.clientY-dn.y;if(Math.hypot(dx,dy)>4)dn.m=1;
  if(dn.m){setHl(null);A.cam.yaw=dn.c.yaw+dx*.008;A.cam.pit=Math.max(-1.5,Math.min(1.5,dn.c.pit+dy*.008));draw3d()}return}
 const n=near(e);cv.style.cursor=n.length?'pointer':'grab';setHl(n.length?n[0].id:null,e)};
cv.onpointerleave=()=>{if(!dn)setHl(null)};
cv.onpointerup=e=>{const m=dn&&dn.m;dn=null;if(m)return;const n=near(e);
 if(n.length>1)A.pick=n.map(p=>p.id);else{A.pick=null;if(n.length)sel(n[0].id);else A.sel=null}render()};
cv.onwheel=e=>{e.preventDefault();A.cam.zm=Math.max(.5,Math.min(3,A.cam.zm*(e.deltaY<0?1.1:.9)));draw3d()};
cv.onkeydown=e=>{const k={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key];if(k){e.preventDefault();A.cam.yaw+=k[0]*.1;A.cam.pit=Math.max(-1.5,Math.min(1.5,A.cam.pit+k[1]*.1));draw3d()}};
const sd=$('#side');
sd.addEventListener('mouseover',e=>{const b=e.target.closest('[data-hl]');if(b)setHl(b.dataset.hl)});
sd.addEventListener('mouseout',e=>{if(e.target.closest('[data-hl]')&&!(e.relatedTarget&&e.relatedTarget.closest&&e.relatedTarget.closest('[data-hl]')))setHl(null)});
sd.addEventListener('focusin',e=>{const b=e.target.closest('[data-hl]');if(b)setHl(b.dataset.hl)});sd.addEventListener('focusout',()=>setHl(null));
function sel(id){A.sel=A.view=='album'?{k:id}:{s:id}}
