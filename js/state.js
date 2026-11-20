
const AX=['Energy','Valence','Dance','Acoustic','Instrumental','Live'],M=[...AX,'Speech','BPM','Loud (Db)'];
const DD={BPM:[40,220],'Loud (Db)':[-60,0]},dd=k=>(DD[k]||[0,100]).slice();
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $=s=>document.querySelector(s),dlg=$('#dlg'),svg=$('#map');const SH=$('#hd'),SB=$('#bd');
const A0=()=>({rows:[],view:'album',x:'Energy',y:'Valence',z:'Dance',cam:{yaw:-.6,pit:.4,zm:1},hl:null,q:'',sel:null,cmp:[],flags:[],fo:false,sph:null,dom:null,pick:null,st:null,t0:0,anim:false,flash:''}),A=A0();
const GUIDE='<ol class="gd"><li><a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer">Spotify</a>에서 분석할 곡을 담은 <b>공개 플레이리스트</b>를 만듭니다.</li><li>플레이리스트 <b>링크를 복사</b>합니다.</li><li><a href="https://www.chosic.com/spotify-playlist-exporter/" target="_blank" rel="noopener noreferrer">Chosic</a>에 접속해 링크를 붙여넣고 <b>Analyze</b> 후 <b>CSV를 다운로드</b>합니다.</li><li>받은 CSV를 Tone Terrain에 <b>넣습니다</b> (파일 추가 또는 지도 위에 끌어놓기).</li></ol>';
