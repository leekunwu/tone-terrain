
const AX=['Energy','Valence','Dance','Acoustic','Instrumental','Live'],M=[...AX,'Speech','BPM','Loud (Db)'];
const DD={BPM:[40,220],'Loud (Db)':[-60,0]},dd=k=>(DD[k]||[0,100]).slice();
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $=s=>document.querySelector(s),dlg=$('#dlg'),svg=$('#map');
const A={rows:[],view:'album',x:'Energy',y:'Valence',z:'Dance',cam:{yaw:-.6,pit:.4,zm:1},hl:null,q:'',sel:null,cmp:[],dom:null,pick:null,anim:false,flash:''};
