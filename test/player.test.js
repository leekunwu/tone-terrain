const assert=require('assert'),{nextIdx,ended,beat,stalled,noStart}=require('../js/player.js');
assert.strictEqual(nextIdx([1,2,3],0),1);assert.strictEqual(nextIdx([1,2,3],2),-1);assert.strictEqual(nextIdx([1],0),-1);
assert.ok(ended({duration:30000,isPaused:true,position:30000},29000));       // 끝까지 재생 후 정지
assert.ok(ended({duration:30000,isPaused:true,position:0},29500));           // 끝에서 0으로 되돌아옴
assert.ok(!ended({duration:30000,isPaused:true,position:12000},11000));      // 사용자가 중간에 일시정지
assert.ok(!ended({duration:30000,isPaused:false,position:29900},29000));     // 재생 중
assert.ok(!ended({duration:0,isPaused:true,position:0},0));                  // 로딩 중
const b=beat(180,100);assert.ok(Math.abs(b.bt-60/90)<1e-9&&b.amp===1);       // 빠른 BPM은 절반 박자
assert.ok(Math.abs(beat(60,0).bt-1)<1e-9&&Math.abs(beat(60,0).amp-.35)<1e-9);
assert.ok(beat(null,null).bt>0&&beat(30,50).bt<=1);                          // 결측·너무 느린 BPM도 안전
assert.ok(stalled({duration:30000,position:29713},5000,3000));        // 끝 근처에서 소식 끊김
assert.ok(!stalled({duration:30000,position:12000},5000,3000));        // 중간에 끊긴 건 끝이 아님
assert.ok(!stalled({duration:30000,position:29713},3500,3000));        // 아직 잠깐
assert.ok(noStart(null,11000)&&noStart({isPaused:true,position:0},11000));   // 10초 뒤에도 시작 못 함(미리듣기 없음)
assert.ok(!noStart(null,5000)&&!noStart({isPaused:false,position:300},20000)&&!noStart({isPaused:true,position:4000},20000));
console.log('player ok');
