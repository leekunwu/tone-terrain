// ---- 유사도 구: 정규화 좌표(-1~1)의 유클리드 거리, 큐브 대각선(2√3)을 0%로 본다
const DM=2*Math.sqrt(3);
const sim=(a,b)=>100*(1-Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2])/DM);
const inside=(items,c,r)=>items.map(o=>({...o,s:sim(o.p,c)})).filter(o=>o.s>=r).sort((a,b)=>b.s-a.s);
if(typeof module!='undefined')module.exports={DM,sim,inside};
