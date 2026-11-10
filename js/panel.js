// ---- 패널
function hx0(v,cls='',z=95,lab=0){const c=z,R=z-(lab?64:24),pt=(i,r)=>{const t=-Math.PI/2+i*Math.PI/3;return[c+r*Math.cos(t),c+r*Math.sin(t)]};
 let s=`<svg class="${cls}" width="${z*2}" height="${z*2}" viewBox="0 0 ${z*2} ${z*2}" role="img" aria-label="육각형 프로필">`;
 [50,100].forEach(r=>s+=`<polygon class="g" points="${AX.map((_,i)=>pt(i,R*r/100).join(',')).join(' ')}"/>`);
 AX.forEach((a,i)=>{const[x,y]=pt(i,R),[tx,ty]=pt(i,R+12);s+=`<line class="g" x1="${c}" y1="${c}" x2="${x}" y2="${y}"/><text class="hl" x="${tx}" y="${ty+3}" text-anchor="middle">${lab?a:a.slice(0,3)}${lab?`<tspan class="vl" x="${tx}" dy="16">${f1(v[i])}</tspan>`:''}</text>`});
 const P=v.map((x,i)=>x==null?null:pt(i,R*x/100).join(',')).filter(Boolean);
 if(P.length>2)s+=`<polygon class="v" points="${P.join(' ')}"/>`;else P.forEach(p=>{const[x,y]=p.split(',');s+=`<circle class="v" cx="${x}" cy="${y}" r="3"/>`});if(lab)v.forEach((x,i)=>{if(x==null)return;const[px,py]=pt(i,R*x/100),[lx,ly]=pt(i,R+26);s+=`<circle class="v" cx="${px}" cy="${py}" r="3"/>`});return s+'</svg>'}
const hex=(v,cls,z,t)=>`<span class="hxw" tabindex="0" role="button" aria-label="${esc(t)} 육각형 크게 보기" data-t="${esc(t)}" data-v="${esc(JSON.stringify(v))}">${hx0(v,cls,z)}</span>`;
const f1=v=>v==null?'—':(Math.round(v*10)/10).toFixed(1);
function albStats(g){return M.map(k=>{const a=g.t.map(t=>t.m[k]).filter(v=>v!=null);return{k,v:a.length?avg(a):null,n:a.length}})}
const sn=r=>(r.artist.trim()?r.artist.trim()+' - ':'')+(r.song||'제목 없음');
const spl=r=>{const id=(r.tid||'').split(':').pop();return/^[A-Za-z0-9]{22}$/.test(id)?'https://open.spotify.com/track/'+id:'https://open.spotify.com/search/'+encodeURIComponent((r.artist+' '+r.song).trim())};
const spb=(u,t)=>`<a class="btn spot" href="${esc(u)}" target="_blank" rel="noopener noreferrer">${t}</a>`;
function tree(g,cur){return`<div class="dir"><div class="dh">▾ ${esc(g.al)}</div><ul>${g.t.map((t,i)=>{const id=t.tid||'#'+t.f+':'+t.r;return`<li class="tr"><button class="${id==cur?'cur':''}" data-act="song" data-id="${esc(id)}" data-from="${esc(g.key)}"><span class="mu">${i==g.t.length-1?'└':'├'}</span> ${esc(sn(t))}</button><a href="${esc(spl(t))}" target="_blank" rel="noopener noreferrer" title="Spotify에서 열기" aria-label="Spotify에서 열기">↗</a></li>`}).join('')}</ul></div>`}
function detail(){const s=A.sel;if(!s)return'';
 if(s.k){const g=B.G.find(x=>x.key==s.k);if(!g)return'';const st=albStats(g),ar=artists(g.t),has=g.t.filter(t=>AX.some(k=>t.m[k]!=null)).length,c=A.cmp.includes(g.key);
  return`<h2>앨범</h2><div class="row"><b>${esc(g.al)}</b><span class="mu">${esc(g.date)}</span></div><div class="sm mu">${esc(ar.join(', '))||'Artist 없음'}</div>
  <div class="sm">분석된 수록곡 ${has}곡 · 반영 행 ${g.t.length}</div><div style="text-align:center">${hex(st.slice(0,6).map(x=>x.v),'',95,g.al)}</div>
  <table><tr><th>지표</th><th>평균</th><th>곡 수</th></tr>${st.map(x=>`<tr><td>${esc(x.k)}</td><td>${f1(x.v)}</td><td>${x.n}</td></tr>`).join('')}</table>
  <p class="sm mu">연결선은 현재 축에서 분석된 수록곡과 대표점을 잇습니다.</p>
  <div class="bt2"><button data-act="cmp" data-k="${esc(g.key)}">${c?'비교에서 제거':'비교에 추가'}</button>${spb('https://open.spotify.com/search/'+encodeURIComponent((g.al+' '+(ar.length==1?ar[0]:'')).trim()),'Spotify에서 검색')}</div>
  <h2>수록곡</h2>${tree(g,null)}`}
 const o=B.S.find(x=>x.id==s.s);if(!o)return'';const r=o.r,al=B.G.filter(g=>r.tid&&g.ids.has(r.tid)),g0=s.from&&B.G.find(g=>g.key==s.from),on=AK().every(k=>r.m[k]!=null),u=spl(r);
 return`${g0?`<div class="path sm"><button class="lk" data-act="alb" data-k="${esc(g0.key)}">▾ ${esc(g0.al)}</button> <span class="mu">/</span> <b>${esc(r.song||'제목 없음')}</b></div>`:''}<h2>곡</h2><b>${esc(r.song||'제목 없음')}</b><div class="sm mu">${esc(r.artist)}</div>
 ${on?'':'<p class="sm mu">현재 X·Y·Z 축 값이 없어 지도에 표시되지 않습니다.</p>'}
 <div style="text-align:center">${hex(AX.map(k=>r.m[k]),'',95,r.song||'제목 없음')}</div>
 <table>${M.map(k=>`<tr><td>${esc(k)}</td><td>${r.m[k]??'—'}${r.bad.includes(k)?' (무효값)':''}</td></tr>`).join('')}</table>
 <div class="bt2">${spb(u,/\/track\//.test(u)?'Spotify에서 열기':'Spotify에서 검색')}</div>
 ${g0?'<h2>수록곡</h2>'+tree(g0,s.s):''}
 <h2>연결된 앨범</h2>${al.length?`<ul>${al.map(g=>`<li><button data-act="alb" data-k="${esc(g.key)}" data-hl="${esc(g.key)}">${esc(g.al)}<span class="dt"> · ${esc(g.date)}</span></button></li>`).join('')}</ul>`:'<div class="sm mu">앨범 없음</div>'}`}
function compare(){const gs=A.cmp.map(k=>B.G.find(g=>g.key==k)).filter(Boolean);if(!gs.length)return'';const S=gs.map(albStats);
 return`<h2>비교 (${gs.length}/3)</h2><div class="cmp">${gs.map((g,i)=>`<div class="cm${i+1}" style="text-align:center"><div class="sm"><b>${i+1}</b> ${esc(g.al)}</div>${hex(S[i].slice(0,6).map(x=>x.v),'',60,g.al)}</div>`).join('')}</div>
 <table><tr><th>지표</th>${gs.map((_,i)=>`<th>${i+1}</th>`).join('')}</tr>${M.map((k,j)=>`<tr><td>${esc(k)}</td>${S.map(s=>`<td>${f1(s[j].v)}</td>`).join('')}</tr>`).join('')}</table>`}
function history(){const ks=Object.keys(B.st);if(!ks.length)return'';
 return`<details><summary>가져오기 내역</summary>${ks.map(f=>{const s=B.st[f],ex=Object.entries(s.ex);return`<p class="sm"><b>${esc(f)}</b><br>행 ${s.rows} · 앨범 반영 ${s.ok} · 중복 제외 ${s.dup} · 충돌 ${s.conf} · 무효 지표 ${s.bad}${ex.length?'<br>앨범 제외: '+ex.map(([k,n])=>esc(k)+' '+n).join(', '):''}</p>`}).join('')}
 ${B.ev.length?`<div class="sm"><b>충돌 (기존 값 유지)</b><table><tr><th>트랙/지표</th><th>유지</th><th>새 값</th></tr>${B.ev.slice(0,40).map(e=>`<tr><td>${esc(e.tid)} ${esc(e.k)}</td><td>${e.a??'결측'}</td><td>${e.b??'결측'}</td></tr>`).join('')}</table>${B.ev.length>40?'외 '+(B.ev.length-40)+'건':''}<div class="mu">${esc(B.ev[0].f)} 등 출처 파일 기준</div></div>`:''}</details>`}
function render(){hxHide();const has=A.rows.length>0;$('#drop').innerHTML=has?'':'<h2>Tone Terrain</h2><div class="mu">CSV 파일 놓기</div><button class="p" data-act="pick">파일 선택</button>';
 ['x','y','z'].forEach(a=>{const e=$('#s'+a);e.innerHTML=M.map(k=>`<option>${esc(k)}</option>`).join('');e.value=A[a];[...e.options].forEach(o=>o.disabled=['x','y','z'].some(b=>b!=a&&A[b]==o.value))});
 document.querySelectorAll('[data-act=v]').forEach(b=>{b.classList.toggle('on',b.dataset.v==A.view);b.setAttribute('aria-pressed',b.dataset.v==A.view)});
 if(A.hl&&!(B.G.some(g=>g.key==A.hl)||B.S.some(o=>o.id==A.hl)))A.hl=null;draw3d();const V=vis();let p='';
 if(has&&!A.nvalid)p+=`<p>현재 축(${esc(A.x)} × ${esc(A.y)} × ${esc(A.z)})에 유효 데이터가 없습니다. 축을 바꾸거나 가져오기 내역을 확인하세요.</p>`;
 if(A.pick)p+=`<h2>겹친 대상 ${A.pick.length}개</h2><ul>${A.pick.map(id=>{const g=B.G.find(x=>x.key==id),o=B.S.find(x=>x.id==id);return`<li><button data-act="${g?'alb':'song'}" data-k="${esc(id)}" data-id="${esc(id)}" data-hl="${esc(id)}">${esc(g?g.al:sn(o.r))}</button></li>`}).join('')}</ul>`;
 p+=detail()+compare();
 if(has){p+=`<h2>${A.view=='album'?'앨범':'곡'} ${V.length}</h2>`+(V.length?`<ul>${V.slice(0,100).map(x=>A.view=='album'?`<li><button data-act="alb" data-k="${esc(x.key)}" data-hl="${esc(x.key)}">${esc(x.al)}</button></li>`:`<li><button data-act="song" data-id="${esc(x.id)}" data-hl="${esc(x.id)}">${esc(sn(x.r))}</button></li>`).join('')}</ul>${V.length>100?`<div class="sm mu">외 ${V.length-100}개 (검색으로 좁히기)</div>`:''}`:`<div>조건에 맞는 ${A.view=='album'?'앨범':'곡'} 없음</div><button data-act="clr">검색 해제</button>`);
  p+=history()}
 $('#side').innerHTML=p;A.anim=false;lh()}
