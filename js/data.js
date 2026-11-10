// ---- 그룹화
function nd(s){s=(s||'').trim();if(!s)return[null,'없음'];let m=/^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/.exec(s);if(!m)return[null,'형식 무효'];
 if(m[2]&&(+m[2]<1||+m[2]>12))return[null,'형식 무효'];if(m[3]){const d=new Date(Date.UTC(+m[1],+m[2]-1,+m[3]));if(d.getUTCMonth()!=+m[2]-1)return[null,'형식 무효']}return[s,'']}
function build(rows){const G=new Map(),S=new Map(),st={},ev=[];
 const F=f=>st[f]||(st[f]={rows:0,ok:0,dup:0,ex:{},conf:0,bad:0});
 rows.forEach(r=>{const s=F(r.f);s.rows++;s.bad+=r.bad.length;const al=(r.album||'').trim().normalize('NFC'),[d,why]=nd(r.date);
  const prev=r.tid&&S.get(r.tid);if(prev)M.forEach(k=>{if(prev.m[k]!==r.m[k]){s.conf++;ev.push({f:r.f,tid:r.tid,k,a:prev.m[k],b:r.m[k]})}});
  if(!al||!d){const k=!al?'Album 없음':'Album Date '+why;s.ex[k]=(s.ex[k]||0)+1}
  else{const key=JSON.stringify([al,d]);let g=G.get(key);if(!g)G.set(key,g={key,al:r.album.trim(),date:d,t:[],ids:new Set()});
   if(r.tid&&g.ids.has(r.tid))s.dup++;else{g.t.push(r);if(r.tid)g.ids.add(r.tid);s.ok++}}
  if(r.tid){if(!prev)S.set(r.tid,r)}else S.set('#'+r.f+':'+r.r,r)});
 return{G:[...G.values()],S:[...S.entries()].map(([id,r])=>({id,r})),st,ev}}
let B=build([]);
const ok=(r,x,y)=>r.m[x]!=null&&r.m[y]!=null,avg=a=>a.reduce((p,c)=>p+c,0)/a.length;
const artists=ts=>[...new Set(ts.map(t=>t.artist.trim()).filter(Boolean))];
const hit=(s,q)=>s.toLowerCase().includes(q);
function vis(){const q=A.q.trim().toLowerCase();
 if(A.view=='album')return B.G.filter(g=>!q||hit(g.al,q)||g.t.some(t=>hit(t.song,q)||hit(t.artist,q)));
 return B.S.filter(o=>!q||hit(o.r.song,q)||hit(o.r.artist,q))}
function hull(P){P=[...new Map(P.map(p=>[p+'',p])).values()].sort((a,b)=>a[0]-b[0]||a[1]-b[1]);if(P.length<3)return P;
 const X=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]),h=[];
 for(const p of P){while(h.length>1&&X(h[h.length-2],h[h.length-1],p)<=0)h.pop();h.push(p)}const n=h.length+1;
 for(let i=P.length-2;i>=0;i--){const p=P[i];while(h.length>=n&&X(h[h.length-2],h[h.length-1],p)<=0)h.pop();h.push(p)}h.pop();return h}
