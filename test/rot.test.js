const assert=require('assert'),{qm,qa,qn,qr,drift}=require('../js/rot.js');
const near=(a,b)=>a.every((v,i)=>Math.abs(v-b[i])<1e-9);
assert.ok(near(qr(qa([0,0,1],Math.PI/2),[1,0,0]),[0,1,0]));   // Z축 90°: X→Y
assert.ok(near(qr(qa([1,0,0],1.2),[1,0,0]),[1,0,0]));         // 회전축 위의 점은 고정
let q=[1,0,0,0];for(let i=0;i<5000;i++)q=qn(qm(q,qa(drift(i*.016),.008)));
assert.ok(Math.abs(Math.hypot(...q)-1)<1e-9);                  // 누적해도 길이 1 유지
const p=qr(q,[.3,-.5,.8]);assert.ok(Math.abs(Math.hypot(...p)-Math.hypot(.3,-.5,.8))<1e-9); // 길이 보존
// 이미 임의로 돌아간 상태에서도 데이터 X축 회전(q ⊗ r)은 X축 위의 점을 움직이지 않는다
const m=qa([0,1,1],.9),m2=qn(qm(m,qa([1,0,0],1.1)));
assert.ok(near(qr(m2,[1,0,0]),qr(m,[1,0,0])));
assert.ok(!near(qr(m2,[0,1,0]),qr(m,[0,1,0])));
console.log('rot ok');
