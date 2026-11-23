// ---- 이벤트
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const a=b.dataset.act,d=b.dataset;
 if(e.detail)b.blur();
 if(b.id=='add'||a=='pick')return $('#fi').click();
 if(a=='v'){A.view=d.v;A.sel=null;A.pick=null;render()}else if(a=='reset'){home();A.sel=null;A.pick=null;render()}
 else if(a=='alb'){A.pick=null;A.view='album';A.sel={k:d.k};render()}else if(a=='song'){A.pick=null;if(d.sv)A.view='song';A.sel={s:d.id,from:d.from||null};render()}
 else if(a=='cmp'){const i=A.cmp.indexOf(d.k);if(i>=0)A.cmp.splice(i,1);else if(A.cmp.length<3)A.cmp.push(d.k);else modal('<p>비교는 최대 3개까지 가능합니다.</p><div class="bt"><button data-act="x">확인</button></div>');render()}
 else if(a=='flag'){const i=A.flags.indexOf(d.k);if(i>=0)A.flags.splice(i,1);else A.flags.push(d.k);render()}else if(a=='fo'){A.fo=!A.fo;render()}else if(a=='play')plClick(b);else if(a=='pnext')plNext();else if(a=='pprev')plPrev();else if(a=='pclose')plStop();else if(a=='rot'){A.rot.intro=0;A.rot.mode=(A.rot.mode+1)%5;if(A.rot.mode)A.rot.ax=A.rot.mode==4?null:RA[A.rot.mode];rbtn();spinKick()}else if(a=='ax'){A.ax=d.v=='1';render()}else if(a=='sph'){A.sph=A.sph&&A.sph.id==d.k?null:{id:d.k,r:A.sph?A.sph.r:90};render()}else if(a=='sphx'){A.sph=null;render()}
 else if(a=='clr'){A.q='';A.fo=false;$('#q').value='';render()}else if(a=='rst')modal('<b>전체 초기화</b><p>불러온 CSV 데이터, 선택, 비교, 플래그, 검색, 시점이 모두 지워지고 <b>되돌릴 수 없습니다.</b></p><p class="sm mu">보관하려면 먼저 \'프로젝트\'에서 JSON을 저장하세요.</p><div class="bt"><button data-act="x">취소</button><button class="p" data-act="rst2">모두 초기화</button></div>');else if(a=='rst2')resetAll();else if(a=='x'){dlg.close();A.st=null}else if(a=='c')commit(d.m)
 else if(a=='help')onboard(0);else if(a=='obn'){const n=obStep(1);n>=OB.length?dlg.close():onboard(n)}else if(a=='obp')onboard(obStep(-1));else if(a=='obg')onboard(+d.i);
 else if(a=='proj')modal(`<b>프로젝트</b><p class="sm">저장 JSON에는 카탈로그 데이터가 포함됩니다. 자동 저장은 없고, 이 페이지에서는 파일 다운로드가 막혀 있어 복사해서 .json으로 보관합니다.</p><textarea id="pj" aria-label="프로젝트 JSON"></textarea><div class="bt"><button data-act="cp">JSON 복사</button><button data-act="ld">붙여넣은 JSON 불러오기</button><button data-act="pf">파일에서 불러오기</button><button data-act="x">닫기</button></div>`),$('#pj').value=A.rows.length?save():'';
 else if(a=='cp'){$('#pj').select();try{navigator.clipboard.writeText($('#pj').value)}catch(_){document.execCommand('copy')}}
 else if(a=='ld'){const t=$('#pj').value;dlg.close();load(t)}else if(a=='pf'){const i=document.createElement('input');i.type='file';i.accept='.json,application/json';i.onchange=async()=>{dlg.close();load(await i.files[0].text())};i.click()}});
$('#fi').onchange=e=>{stage(e.target.files);e.target.value=''};
['x','y','z'].forEach(a=>$('#s'+a).onchange=e=>{A[a]=e.target.value;e.target.blur();render()});
document.addEventListener('input',e=>{if(e.target.id=='sphr'&&A.sph){A.sph.r=+e.target.value;$('#sphv').textContent=A.sph.r+'%';sphList();draw3d();lh()}});
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
window.addEventListener('resize',hxHide);
sd.addEventListener('click',e=>{const w=e.target.closest('.hxw');if(w)hxOpen(w,e)});
sd.addEventListener('keydown',e=>{const w=e.target.closest('.hxw');if(w&&(e.key=='Enter'||e.key==' ')){e.preventDefault();hxOpen(w,e)}});
// 패널 폭: 오른쪽 끝 기준, 280px~화면 60%
const SP=$('#spl'),MN=$('main');
function setW(w){w=Math.round(Math.max(280,Math.min(innerWidth*.6,w)));MN.style.setProperty('--sw',w+'px');SP.setAttribute('aria-valuenow',w);try{localStorage.sw=w}catch(_){}}
try{if(localStorage.sw)setW(+localStorage.sw)}catch(_){}
SP.onpointerdown=e=>{SP.setPointerCapture(e.pointerId);SP.dataset.on=1};
SP.onpointermove=e=>{if(SP.dataset.on)setW(MN.getBoundingClientRect().right-e.clientX)};
SP.onpointerup=()=>delete SP.dataset.on;
SP.ondblclick=()=>setW(360);
SP.onkeydown=e=>{const d={ArrowLeft:24,ArrowRight:-24}[e.key];if(d){e.preventDefault();setW($('#side').getBoundingClientRect().width+d)}};
render();
rbtn();introOn();
