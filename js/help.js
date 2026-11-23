// ---- 온보딩(도움말): 5단계로 짧게 보여준다
const KB=k=>`<kbd>${k}</kbd>`,
 OR=(ic,t,d)=>`<div class="obr"><span class="obi">${ic}</span><div><b>${t}</b><br><span class="mu">${d}</span></div></div>`,
 ICG='<svg class="ri" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18"/></svg>',
 ICS='<svg class="ri" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><ellipse cx="12" cy="12" rx="8" ry="3" opacity=".5"/></svg>',
 ICC='<svg class="ri" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v14H3zM3 10h18M9 5v14"/></svg>',
 ICP='<span class="pl" style="display:inline-flex;width:22px;height:22px;border-radius:50%;background:#1DB954;align-items:center;justify-content:center"><svg viewBox="0 0 10 10" width="10" height="10"><path fill="#fff" d="M2.5 1.2v7.6L8.8 5z"/></svg></span>';
const OB=[
 {t:'시작하기',s:'Spotify 플레이리스트를 CSV로 받아 넣으면 바로 시작됩니다.',
  h:GUIDE+'<p class="sm mu">CSV는 UTF-8이고 Song·Artist·Album·Album Date·Spotify Track Id·Energy·Valence 열이 필요합니다.</p>'},
 {t:'지도 읽기',s:'점 하나가 앨범 또는 곡이고, 가까이 있을수록 소리가 비슷합니다.',
  h:OR('<i class="dotb"></i>','큰 점 = 앨범','앨범 보기에서 앨범 하나입니다. 위치는 수록곡의 평균입니다.')
   +OR('<i class="dots"></i>','작은 점 = 곡','곡 보기에서 곡 하나입니다.')
   +OR('XYZ','X · Y · Z 축','위에서 고른 오디오 특성(Energy, Valence…)이 점의 위치를 정합니다. 축을 바꾸면 지도도 달라집니다.')
   +OR(RI(4),'움직이기','드래그 = 회전 · 휠 = 확대 · Ctrl/⌘/Shift+드래그 = 이동 · 회전 버튼 = 자동 회전 · 중앙 정렬 = 처음 시점')},
 {t:'찾고 비교하기',s:'점을 눌러 보고, 마음에 드는 것을 표시하고, 비슷한 곡을 찾아보세요.',
  h:OR(ICC,'상세와 비교','점을 누르면 오른쪽 패널에 상세가 나옵니다. "비교에 추가"로 최대 3개를 육각형으로 겹쳐 봅니다(앨범·곡 섞어도 됩니다).')
   +OR(FI(1),'플래그','깃발을 달면 어느 뷰에서나 박동으로 보입니다. GRID를 ON으로 두면 그 항목을 지나는 X·Y·Z 축선도 그려집니다.')
   +OR(ICS,'유사도 구','"유사도 구 만들기"를 누르고 슬라이더로 반경을 정하면, 그 항목과 비슷한 곡·앨범 목록이 나옵니다.')},
 {t:'들어보기',s:'서비스 안에서 바로 재생할 수 있습니다.',
  h:OR(ICP,'▶ 재생','▶를 누르면 지도 왼쪽 아래 플레이어에서 재생됩니다. 목록에서 시작하면 끝날 때 다음 곡으로 넘어갑니다.')
   +OR(KB('Space'),'재생 · 일시정지','스페이스바로 멈추고 다시 재생합니다. 재생 전이라면 선택한 곡을 재생합니다.')
   +OR('<i class="dotg"></i>','재생 중 표시','재생 중인 점은 곡의 BPM에 맞춰 초록색으로 박동하고, 목록에서는 그 곡에 초록 테두리가 생깁니다.')
   +'<p class="sm mu">Spotify에 로그인하지 않았다면 미리듣기(약 30초)만 재생됩니다.</p>'},
 {t:'저장과 초기화',s:'작업을 보관하거나 처음부터 다시 시작할 수 있습니다.',
  h:OR('{ }','프로젝트','"프로젝트"에서 현재 작업(데이터·선택·비교·플래그·구)을 JSON으로 복사해 보관하고, 나중에 불러옵니다. 자동 저장은 없습니다.')
   +OR('↺','전체 초기화','왼쪽 위 제목 "Tone Terrain"을 누르면 모두 지웁니다. 되돌릴 수 없으니 먼저 저장하세요.')
   +`<details class="obx"><summary>자세한 설명</summary><p class="sm"><b>앨범 묶기</b> Album과 Album Date가 같은 곡을 한 앨범으로 묶습니다. 둘 중 하나가 없거나 날짜가 YYYY, YYYY-MM, YYYY-MM-DD가 아니면 앨범 보기에서는 빠지고 곡 보기에는 남습니다.<br><b>중복·충돌</b> 같은 앨범의 같은 트랙 ID는 한 번만 반영하고, 값이 다르면 기존 값을 유지하며 "가져오기 내역"에 기록합니다.<br><b>한계</b> 일부 수록곡 기준이며 품질 점수가 아닙니다. BPM(40–220)·Loud(−60–0) 축 범위는 임시값입니다.</p></details>`}
];
function onboard(i){i=Math.max(0,Math.min(OB.length-1,i));const o=OB[i],last=i==OB.length-1;
 modal(`<div class="ob" data-i="${i}"><div class="obh"><span class="obs">${i+1} / ${OB.length}</span><button data-act="x" aria-label="닫기">✕</button></div>
 <h3>${o.t}</h3><p class="obsub">${o.s}</p><div class="obb">${o.h}</div>
 <div class="obf"><div class="obd">${OB.map((_,k)=>`<button class="od${k==i?' on':''}" data-act="obg" data-i="${k}" aria-label="${k+1}단계: ${OB[k].t}"${k==i?' aria-current="step"':''}><i></i></button>`).join('')}</div>
 <div class="obn">${i?'<button data-act="obp">이전</button>':''}<button class="p" data-act="obn">${last?'시작하기':'다음'}</button></div></div></div>`)}
const obStep=d=>{const o=dlg.querySelector('.ob');return o?+o.dataset.i+d:0};
document.addEventListener('keydown',e=>{if(!dlg.open||!dlg.querySelector('.ob'))return;
 if(e.key=='ArrowRight'){e.preventDefault();const i=obStep(0);i<OB.length-1?onboard(i+1):dlg.close()}else if(e.key=='ArrowLeft'){e.preventDefault();onboard(obStep(-1))}});
