const assert=require('assert'),{DM,sim,inside}=require('../js/sphere.js');
assert.strictEqual(sim([0,0,0],[0,0,0]),100);
assert.ok(Math.abs(sim([-1,-1,-1],[1,1,1]))<1e-9);          // 정반대 모서리 = 0%
assert.ok(Math.abs(sim([0,0,0],[DM/2,0,0])-50)<1e-9);
const L=inside([{id:'a',p:[.1,0,0]},{id:'b',p:[.5,0,0]},{id:'c',p:[1,1,1]}],[0,0,0],85);
assert.deepStrictEqual(L.map(o=>o.id),['a','b']);            // 유사도 내림차순, 범위 밖 제외
assert.ok(L[0].s>L[1].s);
assert.deepStrictEqual(inside([{id:'a',p:[.5,0,0]}],[0,0,0],100),[]);
console.log('sphere ok');
