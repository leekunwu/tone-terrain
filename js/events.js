// ---- 이벤트
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const a=b.dataset.act,d=b.dataset;
 if(b.id=='add'||a=='pick')return $('#fi').click();
 if(a=='v'){A.view=d.v;A.sel=null;A.pick=null;render()}else if(a=='reset'){A.cam={yaw:-.6,pit:.4,zm:1};A.sel=null;A.pick=null;render()}
 else if(a=='alb'){A.pick=null;A.view='album';A.sel={k:d.k};render()}else if(a=='song'){A.pick=null;A.sel={s:d.id,from:d.from||null};render()}
 else if(a=='cmp'){const i=A.cmp.indexOf(d.k);if(i>=0)A.cmp.splice(i,1);else if(A.cmp.length<3)A.cmp.push(d.k);else modal('<p>비교는 최대 3개 앨범까지 가능합니다.</p><div class="bt"><button data-act="x">확인</button></div>');render()}
 else if(a=='clr'){A.q='';$('#q').value='';render()}else if(a=='x'){dlg.close();A.st=null}else if(a=='c')commit(d.m)
 else if(a=='help')modal(`<b>도움말</b><p class="sm"><b>CSV</b> UTF-8, 헤더 Song·Artist·Album·Album Date·Spotify Track Id·Energy·Valence 등. 추가 / 전체 교체 / 취소를 선택합니다.<br><b>앨범 묶기</b> Album과 Album Date가 같은 곡을 하나의 앨범으로 묶습니다. Artist·Label은 쓰지 않으며 둘 중 하나가 없거나 날짜가 YYYY, YYYY-MM, YYYY-MM-DD가 아니면 앨범 보기에서 제외하고 곡 보기에는 유지합니다.<br><b>지도</b> 큰 점은 대표점(분석된 수록곡 동일 가중 평균), 작은 점은 수록곡, 연결선은 대표점과 수록곡의 관계입니다(분석 범위 영역은 3D에서 표시하지 않음). 드래그 회전, 휠 확대, Esc 선택 해제. X·Y·Z가 모두 유효한 수록곡만 표시합니다.<br><b>내역</b> 같은 앨범의 같은 트랙 ID는 한 번만 반영하고, 값이 다르면 기존 값을 유지하며 충돌로 기록합니다.<br><b>제한</b> 일부 수록곡 기준이며 품질 점수가 아닙니다. BPM(40–220)·Loud(−60–0) 축 범위는 임시값입니다.</p><div class="bt"><button data-act="x">닫기</button></div>`);
 else if(a=='proj')modal(`<b>프로젝트</b><p class="sm">저장 JSON에는 카탈로그 데이터가 포함됩니다. 자동 저장은 없고, 이 페이지에서는 파일 다운로드가 막혀 있어 복사해서 .json으로 보관합니다.</p><textarea id="pj" aria-label="프로젝트 JSON"></textarea><div class="bt"><button data-act="cp">JSON 복사</button><button data-act="ld">붙여넣은 JSON 불러오기</button><button data-act="pf">파일에서 불러오기</button><button data-act="x">닫기</button></div>`),$('#pj').value=A.rows.length?save():'';
 else if(a=='cp'){$('#pj').select();try{navigator.clipboard.writeText($('#pj').value)}catch(_){document.execCommand('copy')}}
 else if(a=='ld'){const t=$('#pj').value;dlg.close();load(t)}else if(a=='pf'){const i=document.createElement('input');i.type='file';i.accept='.json,application/json';i.onchange=async()=>{dlg.close();load(await i.files[0].text())};i.click()}});
$('#fi').onchange=e=>{stage(e.target.files);e.target.value=''};
['x','y','z'].forEach(a=>$('#s'+a).onchange=e=>{A[a]=e.target.value;render()});
$('#q').oninput=e=>{A.q=e.target.value;render()};
document.addEventListener('keydown',e=>{if(e.key=='Escape'&&!dlg.open&&(A.sel||A.pick)){A.sel=null;A.pick=null;render()}});
const mw=$('#mapw');['dragover','dragenter'].forEach(n=>mw.addEventListener(n,e=>{e.preventDefault();mw.classList.add('dz')}));
['dragleave','drop'].forEach(n=>mw.addEventListener(n,e=>{e.preventDefault();mw.classList.remove('dz')}));
mw.addEventListener('drop',e=>{if(e.dataTransfer.files.length)stage(e.dataTransfer.files)});
const hxp=document.createElement('div');hxp.id='hxp';document.body.appendChild(hxp);
// Suppress restored focus/hover until the user leaves the enlarged chart.
let hxBlocked=null;
function hxShow(w){
 if(dlg.open||w===hxBlocked)return;
 hxp.innerHTML=`<b>${esc(w.dataset.t)}</b>`+hx0(JSON.parse(w.dataset.v),'big',130,1);
 hxp.style.display='block';
 const r=w.getBoundingClientRect(),h=hxp.offsetHeight,wd=hxp.offsetWidth;
 const left=r.right+8+wd<=innerWidth-8?r.right+8:r.left-wd-8;
 hxp.style.left=Math.max(8,Math.min(innerWidth-wd-8,left))+'px';
 hxp.style.top=Math.max(8,Math.min(innerHeight-h-8,r.top+r.height/2-h/2))+'px';
}
function hxHide(){hxp.style.display='none'}
function hxOpen(w,e){
 hxBlocked=w;hxHide();
 dlg.innerHTML=`<b>${esc(w.dataset.t)}</b><div style="text-align:center">${hx0(JSON.parse(w.dataset.v),'big',210,1)}</div><div class="bt"><button data-act="x">닫기</button></div>`;
 dlg.classList.remove('zin');if(!dlg.open)dlg.showModal();
 const r=dlg.getBoundingClientRect(),x=e.clientX||r.left+r.width/2,y=e.clientY||r.top+r.height/2;
 dlg.style.transformOrigin=`${x-r.left}px ${y-r.top}px`;void dlg.offsetWidth;dlg.classList.add('zin');
}
dlg.addEventListener('close',hxHide);
dlg.addEventListener('cancel',hxHide);
// Ignore bubbling between SVG children of the same chart.
sd.addEventListener('mouseover',e=>{
 const w=e.target.closest('.hxw');
 if(w&&!w.contains(e.relatedTarget))hxShow(w);
});
sd.addEventListener('mouseout',e=>{
 const w=e.target.closest('.hxw');
 if(w&&!w.contains(e.relatedTarget)){hxHide();if(!dlg.open&&hxBlocked===w)hxBlocked=null;}
});
sd.addEventListener('focusin',e=>{const w=e.target.closest('.hxw');if(w)hxShow(w)});
sd.addEventListener('focusout',e=>{
 hxHide();if(!dlg.open&&hxBlocked===e.target.closest('.hxw'))hxBlocked=null;
});
sd.addEventListener('scroll',hxHide);
window.addEventListener('resize',hxHide);
sd.addEventListener('click',e=>{const w=e.target.closest('.hxw');if(w)hxOpen(w,e)});
sd.addEventListener('keydown',e=>{const w=e.target.closest('.hxw');if(w&&(e.key=='Enter'||e.key==' ')){e.preventDefault();hxOpen(w,e)}});
render();
