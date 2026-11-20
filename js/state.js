
const AX=['Energy','Valence','Dance','Acoustic','Instrumental','Live'],M=[...AX,'Speech','BPM','Loud (Db)'];
const DD={BPM:[40,220],'Loud (Db)':[-60,0]},dd=k=>(DD[k]||[0,100]).slice();
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $=s=>document.querySelector(s),dlg=$('#dlg'),svg=$('#map');const SH=$('#hd'),SB=$('#bd');
const A0=()=>({rows:[],view:'album',x:'Energy',y:'Valence',z:'Dance',cam:{yaw:-.6,pit:.4,zm:1},hl:null,q:'',sel:null,cmp:[],flags:[],fo:false,sph:null,ax:true,qt:[1,0,0,0],rot:{mode:0,intro:0,ax:[1,0,0]},homing:0,dom:null,pick:null,st:null,t0:0,anim:false,flash:''}),A=A0();
const GUIDE='<ol class="gd"><li><a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer">Spotify</a>에서 분석할 곡을 담은 <b>공개 플레이리스트</b>를 만듭니다.</li><li>플레이리스트 <b>링크를 복사</b>합니다.</li><li><a href="https://www.chosic.com/spotify-playlist-exporter/" target="_blank" rel="noopener noreferrer">Chosic</a>에 접속해 링크를 붙여넣고 <b>Analyze</b> 후 <b>CSV를 다운로드</b>합니다.</li><li>받은 CSV를 Tone Terrain에 <b>넣습니다</b> (파일 추가 또는 지도 위에 끌어놓기).</li></ol>';
const FI=on=>`<svg class="ic" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="${on?'currentColor':'none'}" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><path d="M3.5 1.8v12.4"/><path d="M3.5 2.8h8.4l-2 3.2 2 3.2H3.5z"/></svg>`;
// 회전 모드 아이콘(24px): 회전축 + 궤도 화살표. 0 정지, 1 X, 2 Y, 3 Z, 4 전체
const RI=m=>`<svg class="ri rot" viewBox="0 0 24 24" aria-hidden="true">${[
 '<circle cx="12" cy="12" r="8.5"/><rect class="f" x="8.6" y="8.6" width="6.8" height="6.8" rx="1.4"/>',
 '<path class="axl2" d="M1.5 12h21"/><ellipse cx="12" cy="12" rx="4.6" ry="8.8"/><path class="f" d="M15.4 3.2l-3.6-2.3v4.6z"/>',
 '<path class="axl2" d="M12 1.5v21"/><ellipse cx="12" cy="12" rx="8.8" ry="4.6"/><path class="f" d="M20.8 15.4l2.3-3.6h-4.6z"/>',
 '<circle cx="12" cy="12" r="8"/><circle class="f" cx="12" cy="12" r="2"/><path class="f" d="M20 15.4l2.3-3.6h-4.6z"/>',
 '<ellipse cx="12" cy="12" rx="9" ry="3.8"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)"/><circle class="f" cx="12" cy="12" r="1.7"/>'][m]}</svg>`;
