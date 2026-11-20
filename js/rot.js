// ---- 자동 회전: 사원수(회전 누적이 안정적). qm(a,b)는 b를 먼저, a를 나중에 적용한다
const qm=(a,b)=>[a[0]*b[0]-a[1]*b[1]-a[2]*b[2]-a[3]*b[3],a[0]*b[1]+a[1]*b[0]+a[2]*b[3]-a[3]*b[2],a[0]*b[2]-a[1]*b[3]+a[2]*b[0]+a[3]*b[1],a[0]*b[3]+a[1]*b[2]-a[2]*b[1]+a[3]*b[0]];
const qa=(ax,th)=>{const n=Math.hypot(...ax)||1,s=Math.sin(th/2)/n;return[Math.cos(th/2),ax[0]*s,ax[1]*s,ax[2]*s]};
const qn=q=>{const n=Math.hypot(...q)||1;return q.map(v=>v/n)};
const qr=(q,p)=>{const[w,x,y,z]=q,[a,b,c]=p,tx=2*(y*c-z*b),ty=2*(z*a-x*c),tz=2*(x*b-y*a);
 return[a+w*tx+y*tz-z*ty,b+w*ty+z*tx-x*tz,c+w*tz+x*ty-y*tx]};
// 전체 회전: 같은 각속도로 돌되 회전축이 천천히 떠돌아 모든 면이 고르게 보인다
const drift=t=>[Math.sin(.31*t),Math.cos(.23*t),Math.sin(.17*t+1)];
if(typeof module!='undefined')module.exports={qm,qa,qn,qr,drift};
