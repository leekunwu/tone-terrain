// ---- 가져오기
function modal(h){dlg.classList.remove('zin');dlg.style.transformOrigin='';dlg.innerHTML=h;if(!dlg.open)dlg.showModal()}
async function stage(files,proj){const R=proj?[proj]:await Promise.all([...files].map(readFile)),good=R.filter(r=>r.ok),bad=R.filter(r=>!r.ok),n=good.reduce((s,r)=>s+r.rows.length,0);
 const list=R.map(r=>`<li class="sm">${esc(r.name)} — ${r.ok?r.rows.length+'행 반영 대상':'<span class="err">실패: '+esc(r.err)+'</span>'}</li>`).join('');
 if(!good.length){modal(`<b>가져올 수 없음</b><ul>${list}</ul><p class="sm">기존 데이터는 그대로 유지됩니다. 지원 형식: UTF-8 CSV, Energy·Valence 열 포함, 중복 헤더 없음.</p><div class="bt"><button data-act="x">확인</button></div>`);return}
 const cur=A.rows.length;A.st={good,proj};
 if(!cur&&!bad.length){commit('replace');return}
 modal(`<b>${proj?'프로젝트 불러오기':'가져오기'}</b><ul>${list}</ul><p class="sm">반영 대상 ${n}행${cur?` · 전체 교체 시 현재 ${A.rows.length}행·앨범 ${B.G.length}개 제거`:''}</p>
 <div class="bt"><button data-act="x">취소</button>${cur&&!proj?'<button data-act="c" data-m="add">추가</button>':''}<button class="p" data-act="c" data-m="replace">${cur?'전체 교체':'반영'}</button></div>`)}
function commit(m){const s=A.st;if(!s)return;const rows=s.good.flatMap(r=>r.rows);
 if(s.proj){Object.assign(A,s.proj.view);A.rows=rows}else{if(m=='replace'){A.rows=rows;A.sel=null;A.cmp=[];A.dom=null}else A.rows=A.rows.concat(rows)}
 A.pick=null;A.st=null;B=build(A.rows);A.anim=true;A.t0=performance.now();if(dlg.open)dlg.close();$('#q').value=A.q;render()}
