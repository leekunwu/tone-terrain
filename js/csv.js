// ---- CSV
function csv(t){const R=[];let r=[],c='',q=false;for(let i=0;i<t.length;i++){const h=t[i];if(q){if(h=='"'){if(t[i+1]=='"'){c+='"';i++}else q=false}else c+=h}else if(h=='"')q=true;else if(h==','){r.push(c);c=''}else if(h=='\n'||h=='\r'){if(h=='\r'&&t[i+1]=='\n')i++;r.push(c);c='';R.push(r);r=[]}else c+=h}
 if(c!==''||r.length){r.push(c);R.push(r)}return R.filter(x=>x.some(v=>v.trim()!==''))}
function num(k,s){s=(s??'').trim();if(s==='')return[null,0];const n=Number(s);if(!isFinite(n))return[null,1];
 if(k=='BPM'?n<=0:k=='Loud (Db)'?false:(n<0||n>100))return[null,1];return[n,0]}
async function readFile(f){try{const t=new TextDecoder('utf-8',{fatal:true}).decode(await f.arrayBuffer());const R=csv(t);if(!R.length)throw'빈 파일';
 const H=R[0].map(h=>h.replace(/^\uFEFF/,'').trim()),seen=new Set();for(const h of H){if(seen.has(h))throw'중복 헤더: '+h;seen.add(h)}
 if(!H.includes('Energy')&&!H.includes('Valence'))throw'Energy·Valence 열이 없음';
 const ix=n=>H.indexOf(n),g=(r,n)=>ix(n)<0?'':(r[ix(n)]??'');
 const rows=R.slice(1).map((r,i)=>{const m={},bad=[];M.forEach(k=>{const[v,b]=num(k,g(r,k));m[k]=v;if(b)bad.push(k)});
  return{f:f.name,r:i+2,tid:g(r,'Spotify Track Id').trim(),song:g(r,'Song'),artist:g(r,'Artist'),album:g(r,'Album'),date:g(r,'Album Date'),m,bad,label:g(r,'Label'),genres:g(r,'Genres')}});
 return{name:f.name,ok:1,rows}}catch(e){return{name:f.name,ok:0,err:e instanceof TypeError||(e&&e.name=='TypeError')?'UTF-8로 읽을 수 없음':String(e)}}}
