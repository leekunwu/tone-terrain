// ---- 프로젝트
function save(){return JSON.stringify({format:'tone-terrain-project',version:1,rows:A.rows,view:{view:A.view,x:A.x,y:A.y,z:A.z,q:A.q,sel:A.sel,cmp:A.cmp}})}
function load(t){try{const o=JSON.parse(t);if(o.format!='tone-terrain-project')throw'프로젝트 파일이 아님';if(o.version!==1)throw'지원하지 않는 버전: '+esc(o.version);
 const S=v=>typeof v=='string'?v:'',rows=(Array.isArray(o.rows)?o.rows:(()=>{throw'rows 형식 오류'})()).map(r=>{const m={},bad=Array.isArray(r.bad)?r.bad.filter(k=>M.includes(k)):[];M.forEach(k=>m[k]=typeof r.m?.[k]=='number'&&isFinite(r.m[k])?r.m[k]:null);
  return{f:S(r.f),r:+r.r||0,tid:S(r.tid),song:S(r.song),artist:S(r.artist),album:S(r.album),date:S(r.date),m,bad,label:S(r.label),genres:S(r.genres)}}),v=o.view||{};
 const x=M.includes(v.x)?v.x:'Energy',y=M.includes(v.y)&&v.y!=x?v.y:x=='Valence'?'Energy':'Valence';
 stage(null,{name:'프로젝트 파일',ok:1,rows,view:{view:v.view=='song'?'song':'album',x,y,z:M.includes(v.z)&&v.z!=x&&v.z!=y?v.z:M.find(k=>k!=x&&k!=y),q:S(v.q),sel:null,cmp:[],dom:null}})}catch(e){modal(`<b class="err">불러오기 실패</b><p class="sm">${esc(e)}</p><p class="sm">기존 프로젝트는 유지됩니다.</p><div class="bt"><button data-act="x">확인</button></div>`)}}
