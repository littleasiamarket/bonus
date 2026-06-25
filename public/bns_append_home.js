(()=>{"use strict";

if(location.pathname!=="/")return;

const C={
  debug:false,
  targetSelector:".game-front-wrapper",
  insertPosition:"afterend",
  fallbackSelectors:[".game-front-menu",".index-card","main","body"],
  loginApiUrl:"/v2/api/account/login",
  registerApiUrl:"/api/account/register",
  captchaBaseUrl:"/captcha/login/",
  registerCaptchaBaseUrl:"/captcha/register/",
  referralParamKey:"gacor",
  forgotPasswordUrl:"https://direct.lc.chat/14169210",
  nativeLoginSelectors:[
    ".index-card > .btn-account",
    ".index-card .btn-account",
    "form#LoginForm",
    "form#HeaderLoginForm",
    "form#LoginPopup",
    '.login-container form[action*="/account/login"]'
  ],
  labels:{
    title:"Silahkan masuk",
    username:"Nama Pengguna",
    password:"Kata Sandi",
    captcha:"Captcha",
    login:"MASUK",
    register:"DAFTAR",
    forgotPassword:"Lupa Password?",
    loaderText:"Memproses…",
    usernameRequired:"Nama Pengguna wajib diisi.",
    usernameMinLength:"Minimal 5 karakter.",
    passwordRequired:"Password wajib diisi.",
    passwordMinLength:"Minimal 6 karakter.",
    captchaRequired:"Captcha wajib diisi.",
    captchaError:"Captcha salah. Silakan ulangi.",
    loginError:"Login gagal. Periksa username/sandi & captcha.",
    loginNetworkError:"Terjadi kesalahan saat proses login."
  },
  register:{
    labels:{
      username:"Nama Pengguna",
      email:"Email",
      password:"Kata Sandi",
      confirmPassword:"Konfirmasi Sandi",
      fullName:"Nama Lengkap",
      phone:"Nomor Telepon",
      phonePlaceholder:"81261xxx",
      referral:"Kode Referral",
      bankName:"Nama Bank",
      accountNo:"Nomor Rekening",
      accountName:"Nama Rekening",
      captcha:"Captcha",
      submit:"BUAT AKUN",
      usernameRequired:"Nama Pengguna wajib diisi.",
      usernameMinLength:"Minimal 5 karakter.",
      usernameMaxLength:"Maksimal 16 karakter.",
      passwordRequired:"Kata Sandi wajib diisi.",
      passwordMinLength:"Minimal 6 karakter.",
      passwordMaxLength:"Maksimal 16 karakter.",
      confirmPasswordRequired:"Konfirmasi Sandi wajib diisi.",
      confirmPasswordMismatch:"Konfirmasi Sandi tidak cocok.",
      fullNameRequired:"Nama Lengkap wajib diisi.",
      fullNameAlphaOnly:"Hanya huruf dan spasi yang diperbolehkan.",
      phoneRequired:"Nomor Telepon wajib diisi.",
      phoneMinLength:"Minimal 7 digit.",
      phoneMaxLength:"Maksimal 12 digit.",
      bankRequired:"Nama Bank wajib dipilih.",
      accountNoRequired:"Nomor Rekening wajib diisi.",
      accountNoLength:"Panjang nomor rekening tidak sesuai.",
      accountNameRequired:"Nama Rekening wajib diisi.",
      accountNameAlphaOnly:"Hanya huruf dan spasi yang diperbolehkan.",
      captchaRequired:"Captcha wajib diisi.",
      registerError:"Pendaftaran gagal. Silakan coba lagi.",
      registerNetworkError:"Terjadi kesalahan saat proses pendaftaran."
    },
    _banks:[]
  }
};

let T="login";
let R=false;

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));

function addStyle(){
  if($("#zappend-auth-style-bonus138"))return;

  const s=document.createElement("style");
  s.id="zappend-auth-style-bonus138";
  s.textContent=`
#inline-login-host.login-hidden,
.native-login-hidden{
  display:none!important;
  visibility:hidden!important;
  height:0!important;
  margin:0!important;
  padding:0!important;
  overflow:hidden!important;
}
#inline-login-host{
  width:100%;
  max-width:520px;
  margin:10px auto 18px;
  padding:0 10px;
  box-sizing:border-box;
  font-size:14px;
}
#inline-login-host .card{
  position:relative;
  overflow:hidden;
  color:#f4d172;
  border-radius:8px;
  padding:16px 14px 15px;
  border:1.5px solid #f4d172;
  background:radial-gradient(circle at 18% 0%,rgba(244,209,114,.18),transparent 35%),
             radial-gradient(circle at 88% 12%,rgba(240,0,24,.16),transparent 33%),
             linear-gradient(rgb(53 53 53) 0%,rgb(30 30 30) 100%);
  box-shadow:3px 4px 1px #00000054,3px 3px 4px 0 #000000a8,inset 0 0 5px 2px #000,inset 0 0 4px 3px #000;
}
#inline-login-host .card:before{
  content:"";
  position:absolute;
  inset:0;
  pointer-events:none;
  background:linear-gradient(135deg,rgba(255,255,255,.06),transparent 45%);
}
#inline-login-host .card>*{
  position:relative;
  z-index:1;
}
#inline-login-host .group{
  margin-bottom:8px;
}
#inline-login-host .group.tight{
  margin-bottom:7px;
}
#inline-login-host label,
#inline-login-host .reg-label{
  display:block;
  font-size:13px;
  color:#f4d172;
  margin:0 0 6px;
  text-shadow:0 2px 6px rgba(0,0,0,.58);
}
#inline-login-host .reg-label{
  font-size:12px;
  opacity:.92;
}
#inline-login-host input.login-form,
#inline-login-host select.login-form{
  width:100%;
  min-height:44px;
  box-sizing:border-box;
  background:#fff;
  border:1.5px solid #f4d172;
  color:#1e1e1e;
  border-radius:6px;
  padding:11px 12px;
  transition:border-color .15s,box-shadow .15s,background .15s,transform .06s;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.4),0 2px 5px rgba(0,0,0,.35);
  font-size:16px;
  font-family:inherit;
}
#inline-login-host input.login-form::placeholder{
  color:#686868;
  opacity:.88;
}
#inline-login-host input.login-form:focus,
#inline-login-host select.login-form:focus{
  outline:0;
  border-color:#fbf6bc;
  background:#fffef3;
  box-shadow:0 0 0 3px rgba(244,209,114,.3),0 0 14px rgba(244,209,114,.22),inset 0 1px 0 rgba(255,255,255,.42);
}
#inline-login-host .msg{
  font-size:12px;
  color:#fbf6bc;
  text-shadow:0 1px 3px rgba(0,0,0,.62);
  margin-top:5px;
  min-height:14px;
}
#inline-login-host .msg.hide{
  display:none;
}
#inline-login-host .field-rel{
  position:relative;
}
#inline-login-host .field-rel input.login-form{
  padding-right:42px;
}
#inline-login-host .eye{
  position:absolute;
  right:10px;
  top:50%;
  transform:translateY(-50%);
  text-decoration:none;
  opacity:.95;
  color:#1e1e1e;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  width:30px;
  height:30px;
  border-radius:999px;
}
#inline-login-host .eye:hover{
  background:rgba(244,209,114,.34);
  opacity:1;
}
#inline-login-host .eye svg{
  display:block;
  pointer-events:none;
}
#inline-login-host .forgot-wrap{
  margin-top:2px;
  text-align:right;
}
#inline-login-host .forgot-link{
  color:#f4d172;
  font-size:12px;
  font-weight:800;
  text-decoration:none;
  text-shadow:0 1px 3px rgba(0,0,0,.68);
}
#inline-login-host .forgot-link:hover{
  color:#fbf6bc;
  text-decoration:underline;
}
#inline-login-host .captcha-row{
  display:flex;
  align-items:center;
  gap:8px;
  flex-wrap:wrap;
}
#inline-login-host .captcha-row input.login-form{
  flex:1 1 118px;
  max-width:132px;
}
#inline-login-host #loginImgCaptcha,
#inline-login-host #regImgCaptcha{
  height:42px;
  max-width:112px;
  background:#000;
  padding:4px 8px;
  border:1.5px solid #f4d172;
  border-radius:6px;
  box-shadow:3px 4px 1px #00000054,3px 3px 4px 0 #000000a8,inset 0 0 3px 1px #ac6e1f,inset 0 0 3px 2px #f4d172;
  object-fit:contain;
}
#inline-login-host #loginReloadCaptcha,
#inline-login-host #regReloadCaptcha{
  width:44px;
  height:44px;
  flex:0 0 44px;
  margin-left:0;
  padding:0;
  border:1.5px solid #f4d172;
  background:linear-gradient(rgb(53 53 53) 0%,rgb(30 30 30) 100%);
  border-radius:6px;
  cursor:pointer;
  color:#f4d172;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  box-shadow:3px 4px 1px #00000054,3px 3px 4px 0 #000000a8,inset 0 0 5px 2px #000,inset 0 0 4px 3px #000;
}
#inline-login-host .actions{
  display:flex;
  gap:10px;
  margin-top:11px;
  justify-content:space-between;
}
#inline-login-host .btn{
  flex:1 1 0;
  min-height:46px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding:12px 14px;
  border-radius:6px;
  text-transform:uppercase;
  font-weight:900;
  letter-spacing:.45px;
  cursor:pointer;
  position:relative;
  overflow:hidden;
  border:1.5px solid #f4d172;
  font-family:'Bungee','Dangrek',cursive,inherit;
}
#inline-login-host .btn:disabled{
  opacity:.65;
  cursor:not-allowed;
}
#inline-login-host .btn-gold{
  color:#1e1e1e;
  background:linear-gradient(360deg,#f4d172,#f4d172,#fbf6bc);
  box-shadow:3px 4px 1px #00000054,3px 3px 4px 0 #000000a8,inset 0 0 5px 2px #ac6e1f,inset 0 0 4px 3px #f4d172;
}
#inline-login-host .btn-red{
  color:#f4d172;
  background:linear-gradient(360deg,#9d0101,#f00018,#ff6c6c);
  box-shadow:3px 4px 1px #00000054,3px 3px 4px 0 #000000a8,inset 0 0 5px 2px #b20000,inset 0 0 4px 3px #ff6c6c;
}
#inline-login-host .auth-tabs{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:8px;
  margin-bottom:12px;
}
#inline-login-host .auth-tab{
  min-height:44px;
  padding:10px 9px;
  border:1.5px solid #f4d172;
  border-radius:6px;
  cursor:pointer;
  font-weight:900;
  text-transform:uppercase;
  letter-spacing:.45px;
  font-size:14px;
  background:linear-gradient(rgb(53 53 53) 0%,rgb(30 30 30) 100%);
  color:#f4d172;
  box-shadow:3px 4px 1px #00000054,3px 3px 4px 0 #000000a8,inset 0 0 5px 2px #000,inset 0 0 4px 3px #000;
  font-family:'Bungee','Dangrek',cursive,inherit;
}
#inline-login-host .auth-tab.active{
  background:linear-gradient(360deg,#f4d172,#f4d172,#fbf6bc);
  color:#1e1e1e;
  box-shadow:3px 4px 1px #00000054,3px 3px 4px 0 #000000a8,inset 0 0 5px 2px #ac6e1f,inset 0 0 4px 3px #f4d172;
}
#inline-login-host .auth-tab[data-tab=register].active{
  background:linear-gradient(360deg,#9d0101,#f00018,#ff6c6c);
  color:#f4d172;
  box-shadow:3px 4px 1px #00000054,3px 3px 4px 0 #000000a8,inset 0 0 5px 2px #b20000,inset 0 0 4px 3px #ff6c6c;
}
#inline-login-host select.login-form{
  appearance:none;
  -webkit-appearance:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%231e1e1e' fill='none' stroke-width='2'/%3E%3C/svg%3E");
  background-repeat:no-repeat;
  background-position:right 12px center;
  padding-right:32px;
}
#inline-login-host select.login-form option{
  background:#1e1e1e;
  color:#f4d172;
}
#inline-login-host .input-group{
  display:flex;
  align-items:stretch;
}
#inline-login-host .input-prefix{
  display:flex;
  align-items:center;
  padding:0 10px;
  background:linear-gradient(rgb(53 53 53) 0%,rgb(30 30 30) 100%);
  border:1.5px solid #f4d172;
  border-right:none;
  border-radius:6px 0 0 6px;
  color:#f4d172;
  font-size:13px;
  font-weight:800;
  white-space:nowrap;
}
#inline-login-host .input-has-prefix{
  border-radius:0 6px 6px 0!important;
}
#inline-login-host .reg-section{
  font-size:12px;
  font-weight:900;
  color:#f4d172;
  text-transform:uppercase;
  letter-spacing:.5px;
  margin:10px 0 7px;
  padding-top:8px;
  border-top:1px solid rgba(244,209,114,.32);
}
#page-loader-inline{
  position:fixed;
  inset:0;
  display:none;
  z-index:99999;
  background:rgba(0,0,0,.72);
  align-items:center;
  justify-content:center;
}
#page-loader-inline .kps-loader-content{
  padding:11px 15px;
  border-radius:6px;
  background:linear-gradient(rgb(53 53 53) 0%,rgb(30 30 30) 100%);
  border:1.5px solid #f4d172;
  color:#f4d172;
  font-weight:800;
}
@media(max-width:420px){
  #inline-login-host{
    padding:0 8px;
    margin-bottom:16px;
    font-size:13px;
  }
  #inline-login-host .card{
    padding:14px 11px;
  }
  #inline-login-host .auth-tab{
    min-height:42px;
    font-size:13px;
  }
  #inline-login-host input.login-form,
  #inline-login-host select.login-form{
    min-height:42px;
    font-size:16px;
  }
}`;
  document.head.appendChild(s);
}

function ax(){
  if(!window.axios)return;
  axios.defaults.withCredentials=true;
  axios.defaults.headers.common["X-Requested-With"]="XMLHttpRequest";
  axios.defaults.headers.post.Accept="application/json, text/plain, */*";
}

async function sh(t){
  if(window.sha256)return window.sha256(t);
  const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(t));
  return Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,"0")).join("");
}

function lid(k){
  try{
    const s="login_"+k;
    let v=localStorage.getItem(s);
    if(!v){
      v=crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2);
      localStorage.setItem(s,v);
    }
    return v;
  }catch{
    return "";
  }
}

function ls(k){
  try{return localStorage.getItem(k)}catch{return null}
}

function ck(n){
  for(const p of document.cookie.split("; ")){
    const a=p.split("=");
    const k=a.shift();
    const v=a.join("=");
    if(k===n)return decodeURIComponent(v);
  }
  return null;
}

async function tok(){
  let t=$("input#token")?.value||"";
  if(t)return t;

  for(const u of ["/token","/api/token","/v2/api/token","/api/security/token","/v2/api/security/token"]){
    try{
      const r=await fetch(u,{credentials:"include"});
      if(!r.ok)continue;
      const j=await r.json().catch(()=>null);
      const f=j?.token||j?.data?.token||j?.data||"";
      if(f){
        let i=$("input#token");
        if(!i){
          i=document.createElement("input");
          i.type="hidden";
          i.id="token";
          i.name="token";
          document.body.appendChild(i);
        }
        i.value=f;
        return f;
      }
    }catch{}
  }

  console.warn("[login] Token tidak tersedia.");
  return "";
}

async function post(u,p){
  if(window.axios?.post){
    try{
      return await axios.post(u,p);
    }catch(e){
      const s=e?.response?.status;
      if(s!==415&&s!==406)throw e;
    }
  }

  try{
    const r=await fetch(u,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      credentials:"include",
      body:JSON.stringify(p)
    });
    const j=await r.json().catch(()=>({}));
    if(r.ok)return{status:r.status,data:j};
  }catch{}

  const r=await fetch(u,{
    method:"POST",
    headers:{"Content-Type":"application/x-www-form-urlencoded"},
    credentials:"include",
    body:new URLSearchParams(p).toString()
  });
  const j=await r.json().catch(()=>({}));
  return{status:r.status,data:j};
}

async function cap(c,t="login"){
  try{
    const r=await fetch("/api/security/checkCaptcha",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      credentials:"include",
      body:JSON.stringify({type:t,captcha:c})
    });
    if(r.status===404)return true;
    const j=await r.json().catch(()=>({success:0}));
    return!!j.success;
  }catch{
    return true;
  }
}

function loader(t="Memproses…"){
  if($("#page-loader-inline"))return;
  const d=document.createElement("div");
  d.id="page-loader-inline";
  d.innerHTML=`<div class="kps-loader-content">${t}</div>`;
  document.body.appendChild(d);
}

function loading(v){
  const l=$("#page-loader-inline");
  if(l)l.style.display=v?"flex":"none";
}

function hi(){
  const h=$("#inline-login-host");
  if(h)h.classList.add("login-hidden");
}

function si(){
  const h=$("#inline-login-host");
  if(h)h.classList.remove("login-hidden");
}

function isBeforeLoginBtnAccount(el){
  const b=el?.matches?.(".btn-account")?el:el?.closest?.(".btn-account");
  if(!b)return false;

  const tx=(b.innerText||b.textContent||"").replace(/\s+/g," ").trim().toLowerCase();
  const hs=$$("a",b).map(a=>(a.getAttribute("href")||"").toLowerCase());

  const hasLogin=
    hs.some(h=>/\/account\/login(?:$|[?#\/])/.test(h)) ||
    /\bmasuk\b/i.test(tx);

  const hasRegister=
    hs.some(h=>/\/account\/register(?:$|[?#\/])/.test(h)) ||
    /\bdaftar\b/i.test(tx);

  const hasAfterLoginButton=
    hs.some(h=>/\/bank\/(deposit|transfer|withdraw)(?:$|[?#\/])/.test(h)) ||
    /\b(deposit|transfer|withdraw)\b/i.test(tx);

  return hasLogin&&hasRegister&&!hasAfterLoginButton;
}

function isAfterLoginBtnAccount(el){
  const b=el?.matches?.(".btn-account")?el:el?.closest?.(".btn-account");
  if(!b)return false;

  const tx=(b.innerText||b.textContent||"").replace(/\s+/g," ").trim().toLowerCase();
  const hs=$$("a",b).map(a=>(a.getAttribute("href")||"").toLowerCase());

  return (
    hs.some(h=>/\/bank\/(deposit|transfer|withdraw)(?:$|[?#\/])/.test(h)) ||
    /\b(deposit|transfer|withdraw)\b/i.test(tx)
  );
}

function cleanNativeHidden(){
  $$(".btn-account.native-login-hidden").forEach(e=>{
    if(!isBeforeLoginBtnAccount(e)){
      e.classList.remove("native-login-hidden");
      e.removeAttribute("data-native-login-hidden");
    }
  });
}

function native(sel){
  const a=[];

  sel.forEach(s=>{
    $$(s).forEach(e=>{
      let w=null;

      if(e.closest(".btn-account")){
        w=e.closest(".btn-account");

        if(!isBeforeLoginBtnAccount(w)){
          if(isAfterLoginBtnAccount(w)){
            w.classList.remove("native-login-hidden");
            w.removeAttribute("data-native-login-hidden");
          }
          return;
        }
      }else{
        w=e.closest(".login-container")||e.closest(".card,.panel,.box")||e;
      }

      if(w&&!a.includes(w))a.push(w);
    });
  });

  return a;
}

function hn(sel){
  cleanNativeHidden();

  native(sel).forEach(e=>{
    e.classList.add("native-login-hidden");
    e.setAttribute("data-native-login-hidden","1");
  });

  cleanNativeHidden();
}

function logged(){
  const s=$("#hdnLoginSession");

  if(s){
    const v=(s.value||s.getAttribute("value")||"").toString().trim().toLowerCase();
    if(v&&v!=="0"&&v!=="false"&&v!=="null"&&v!=="undefined")return true;
  }

  return !!(
    document.querySelector('a[href*="logout" i],button[data-action="logout"],a[href*="keluar" i]') ||
    document.querySelector("[data-user],[data-username],.user-name,.account-menu,.after-login") ||
    (document.body.innerText||"").match(/\bhai[,! ]/i)
  );
}

async function cf(){
  return !!(ck("_cf_tkn")||ls("_cf_X2NmX29k"));
}

async function vis(c){
  hn(c.nativeLoginSelectors);

  if(logged()||await cf()){
    hi();
  }else{
    si();
  }

  cleanNativeHidden();
}

function msg(e,m){
  if(e){
    e.textContent=m||"";
    e.classList.toggle("hide",!m);
  }
}

function parseBanks(raw){
  const p=raw?.data||raw||{};
  const d=p.defaultValue||p.defaultBank||{};
  const dc=String(d.code??d.defaultValue??"").trim();
  const l=Array.isArray(p.bank)?p.bank:
          Array.isArray(p.slBankList)?p.slBankList:
          Array.isArray(p.msbankList)?p.msbankList:
          Array.isArray(p.banks)?p.banks:
          Array.isArray(p)?p:[];

  return l.filter(b=>
    (b.eligible===undefined||+b.eligible===1) &&
    (b.st===undefined||+b.st===1)
  ).map(b=>{
    const v=String(b.code??b.defaultValue??b.value??"").trim();
    const mn=Number(b.accnomnlgth??b.min??b.minLength??0);
    const mx=Number(b.accnomxlgth??b.max??b.maxLength??0);
    return{
      id:b.id,
      code:v,
      defaultValue:v,
      name:b.name??b.label??b.bankName??b.text??v,
      min:mn||10,
      max:mx||20,
      selected:dc?v===dc:false
    };
  }).filter(b=>b.defaultValue&&b.name&&b.min>0&&b.max>=b.min);
}

function fallbackBanks(){
  return[
    {defaultValue:"bca",name:"BCA",min:10,max:10,selected:true},
    {defaultValue:"bni",name:"BNI",min:10,max:20},
    {defaultValue:"bri",name:"BRI",min:10,max:20},
    {defaultValue:"mandiri",name:"Mandiri",min:10,max:20},
    {defaultValue:"cimb",name:"CIMB Niaga",min:10,max:20},
    {defaultValue:"danamon",name:"Danamon",min:10,max:20},
    {defaultValue:"permata",name:"Permata",min:10,max:20},
    {defaultValue:"ovo",name:"OVO",min:10,max:15},
    {defaultValue:"gopay",name:"Gopay",min:10,max:15},
    {defaultValue:"dana",name:"Dana",min:10,max:15},
    {defaultValue:"panin",name:"Panin",min:10,max:20},
    {defaultValue:"linkaja",name:"LinkAja",min:10,max:15},
    {defaultValue:"sakuku",name:"Sakuku",min:10,max:15},
    {defaultValue:"bsi",name:"BSI",min:10,max:20},
    {defaultValue:"jenius",name:"Jenius",min:10,max:20},
    {defaultValue:"neo",name:"Neobank",min:10,max:20},
    {defaultValue:"jago",name:"Jago",min:10,max:20},
    {defaultValue:"allo",name:"Allobank",min:10,max:20},
    {defaultValue:"blu",name:"Blu by BCA Digital",min:10,max:20},
    {defaultValue:"seabank",name:"Seabank",min:10,max:20},
    {defaultValue:"ocbc",name:"OCBC",min:10,max:20}
  ];
}

async function banks(){
  try{
    const r=await fetch("/api/bank/list",{
      method:"POST",
      credentials:"include",
      headers:{
        Accept:"application/json, text/javascript, */*; q=0.01",
        "Content-Type":"application/json",
        "X-Requested-With":"XMLHttpRequest"
      },
      body:"{}"
    });

    if(!r.ok)throw Error("HTTP "+r.status);

    const b=parseBanks(await r.json().catch(()=>null));
    if(b.length)return b;
  }catch(e){
    console.warn("[auth] Gagal ambil bank list dari /api/bank/list",e);
  }

  return fallbackBanks();
}

async function loginPayload(h,c){
  try{
    const u=$("#loginUsername",h).value.trim();
    const cp=$("#loginCaptcha",h).value.trim();
    let t=$("input#token")?.value||"";
    if(!t)t=await tok();

    const p=$("#loginPassword",h).value;
    const h1=await sh(p);
    const h2=await sh(h1+t);

    return{
      type:"login",
      username:u,
      password:h2,
      token:t,
      captcha:cp,
      devicetoken:$("#DeviceToken")?.value||lid("devicetoken"),
      deviceid:$("#DeviceID")?.value||lid("deviceid"),
      lang:document.documentElement.getAttribute("lang")||"id"
    };
  }catch{
    return null;
  }
}

function vUser(h,l){
  const v=($("#loginUsername",h).value||"").trim();
  const m=$("#loginMsgUser",h);

  if(!v)return msg(m,l.usernameRequired),false;
  if(v.length<5)return msg(m,l.usernameMinLength),false;

  msg(m,"");
  return true;
}

function vPass(h,l){
  const v=$("#loginPassword",h).value||"";
  const m=$("#loginMsgPass",h);

  if(!v)return msg(m,l.passwordRequired),false;
  if(v.length<6)return msg(m,l.passwordMinLength),false;

  msg(m,"");
  return true;
}

function bindLogin(h,c){
  const l=c.labels;
  const f=$("#InlineLoginForm",h);
  const ci=$("#loginImgCaptcha",h);
  const cx=$("#loginCaptcha",h);

  $("#loginPwdToggle",h)?.addEventListener("click",e=>{
    e.preventDefault();
    const p=$("#loginPassword",h);
    if(p){
      p.type=p.type==="password"?"text":"password";
      p.focus();
    }
  });

  $("#loginReloadCaptcha",h)?.addEventListener("click",()=>{
    if(ci)ci.src=c.captchaBaseUrl+Date.now();
    if(cx){
      cx.value="";
      cx.focus();
    }
  });

  const u=$("#loginUsername",h);
  const p=$("#loginPassword",h);

  if(u){
    u.addEventListener("blur",()=>vUser(h,l));
    u.addEventListener("input",()=>{
      const m=$("#loginMsgUser",h);
      if(m&&!m.classList.contains("hide"))vUser(h,l);
    });
  }

  if(p){
    p.addEventListener("blur",()=>vPass(h,l));
    p.addEventListener("input",()=>{
      const m=$("#loginMsgPass",h);
      if(m&&!m.classList.contains("hide"))vPass(h,l);
    });
  }

  f?.addEventListener("submit",async e=>{
    e.preventDefault();

    if(!vUser(h,l)||!vPass(h,l))return;

    const sb=$("#AuthSubmitBtn",h);
    if(sb)sb.disabled=true;

    loading(true);

    try{
      const pl=await loginPayload(h,c);
      if(!pl)return alert(l.loginError);

      if(!await cap(pl.captcha,"login")){
        alert(l.captchaError);
        if(ci)ci.src=c.captchaBaseUrl+Date.now();
        if(cx){
          cx.value="";
          cx.focus();
        }
        return;
      }

      const r=await post(c.loginApiUrl,pl);
      const ok=r?.data?.success===1||r?.data?.success===true||r?.data?.success==="1";

      if(ok){
        const d=r.data.data||{};
        alert((d.message||"Login berhasil")+(d.lastLogin?`\n${d.lastLogin}`:""));
        hi();
        hn(c.nativeLoginSelectors);
        if(d.redirect){
          location.href=d.redirect;
        }else{
          location.reload();
        }
      }else{
        alert(r?.data?.data?.message||r?.data?.message||l.loginError);
        if(p)p.value="";
        if(cx)cx.value="";
        if(ci)ci.src=c.captchaBaseUrl+Date.now();
        u?.focus();
      }
    }catch{
      alert(l.loginNetworkError);
    }finally{
      if(sb)sb.disabled=false;
      loading(false);
    }
  });
}

function vf(h,id,mid,rules){
  const i=$("#"+id,h);
  const m=$("#"+mid,h);
  const v=i?.value||"";

  for(const r of rules){
    if(!r[0](v,i)){
      msg(m,r[1]);
      return false;
    }
  }

  msg(m,"");
  return true;
}

function regRules(h,c){
  const l=c.register.labels;
  const b=c.register._banks;

  return[
    {
      id:"regUsername",
      msg:"regMsgUsername",
      ev:"input",
      rules:()=>[
        [v=>v.trim().length>0,l.usernameRequired],
        [v=>v.trim().length>=5,l.usernameMinLength],
        [v=>v.trim().length<=16,l.usernameMaxLength]
      ]
    },
    {
      id:"regPassword",
      msg:"regMsgPassword",
      ev:"input",
      rules:()=>[
        [v=>v.length>0,l.passwordRequired],
        [v=>v.length>=6,l.passwordMinLength],
        [v=>v.length<=16,l.passwordMaxLength]
      ]
    },
    {
      id:"regCPassword",
      msg:"regMsgCPassword",
      ev:"input",
      rules:()=>[
        [v=>v.length>0,l.confirmPasswordRequired],
        [v=>v===($("#regPassword",h)?.value||""),l.confirmPasswordMismatch]
      ]
    },
    {
      id:"regFirstName",
      msg:"regMsgFirstName",
      ev:"input",
      rules:()=>[
        [v=>v.trim().length>0,l.fullNameRequired],
        [v=>/^[a-zA-Z\s]+$/.test(v.trim()),l.fullNameAlphaOnly]
      ]
    },
    {
      id:"regMobileNumber",
      msg:"regMsgPhone",
      ev:"input",
      rules:()=>[
        [v=>v.trim().length>0,l.phoneRequired],
        [v=>v.trim().length>=7,l.phoneMinLength],
        [v=>v.trim().length<=12,l.phoneMaxLength]
      ]
    },
    {
      id:"regBankName",
      msg:"regMsgBank",
      ev:"change",
      rules:()=>[
        [v=>v.length>0,l.bankRequired]
      ]
    },
    {
      id:"regAccountNo",
      msg:"regMsgAccountNo",
      ev:"input",
      rules:()=>{
        const bv=$("#regBankName",h)?.value;
        const s=b.find(x=>String(x.defaultValue)===String(bv));

        return[
          [v=>v.trim().length>0,l.accountNoRequired],
          [v=>s?v.trim().length>=s.min&&v.trim().length<=s.max:false,s?`${l.accountNoLength} (${s.min}-${s.max} digit)`:l.bankRequired]
        ];
      }
    },
    {
      id:"regAccountName",
      msg:"regMsgAccountName",
      ev:"input",
      rules:()=>[
        [v=>v.trim().length>0,l.accountNameRequired],
        [v=>/^[a-zA-Z\s]+$/.test(v.trim()),l.accountNameAlphaOnly]
      ]
    },
    {
      id:"regCaptcha",
      msg:"regMsgCaptcha",
      ev:"input",
      rules:()=>[
        [v=>v.trim().length>0,l.captchaRequired]
      ]
    }
  ];
}

function bindRegVal(h,c){
  const rules=regRules(h,c);

  for(const it of rules){
    const i=$("#"+it.id,h);
    if(!i)continue;

    const v=()=>vf(h,it.id,it.msg,it.rules());

    i.addEventListener("blur",v);
    i.addEventListener(it.ev,()=>{
      const m=$("#"+it.msg,h);
      if(m&&!m.classList.contains("hide"))v();
    });
  }

  $("#regPassword",h)?.addEventListener("input",()=>{
    const m=$("#regMsgCPassword",h);
    const r=rules.find(x=>x.id==="regCPassword");
    if(m&&!m.classList.contains("hide")&&r)vf(h,r.id,r.msg,r.rules());
  });

  $("#regBankName",h)?.addEventListener("change",()=>{
    const m=$("#regMsgAccountNo",h);
    const r=rules.find(x=>x.id==="regAccountNo");
    if(m&&!m.classList.contains("hide")&&r)vf(h,r.id,r.msg,r.rules());
  });

  return()=>{
    let ok=true;
    for(const it of rules){
      if(!vf(h,it.id,it.msg,it.rules()))ok=false;
    }
    return ok;
  };
}

function bindRegister(h,c){
  const rc=c.register;
  const l=rc.labels;
  const f=$("#InlineRegisterForm",h);
  const ci=$("#regImgCaptcha",h);
  const cx=$("#regCaptcha",h);
  const valid=bindRegVal(h,c);

  if(f){
    f.method="post";
    f.action=c.registerApiUrl;
  }

  $("#regReloadCaptcha",h)?.addEventListener("click",()=>{
    if(ci)ci.src=c.registerCaptchaBaseUrl+Date.now();
    if(cx){
      cx.value="";
      cx.focus();
    }
  });

  const bs=$("#regBankName",h);
  const an=$("#regAccountNo",h);

  function lim(){
    if(!an)return;

    const s=rc._banks.find(b=>String(b.defaultValue)===String(bs?.value||""));

    if(!s){
      an.removeAttribute("minlength");
      an.removeAttribute("maxlength");
      an.placeholder=l.accountNo;
      return;
    }

    an.setAttribute("minlength",s.min);
    an.setAttribute("maxlength",s.max);
    an.placeholder=`${s.min}-${s.max} digit`;

    if(an.value.length>s.max)an.value=an.value.slice(0,s.max);
  }

  bs?.addEventListener("change",()=>{
    lim();
    const m=$("#regMsgAccountNo",h);
    if(m){
      m.textContent="";
      m.classList.add("hide");
    }
  });

  lim();

  an?.addEventListener("input",function(){
    const s=rc._banks.find(b=>String(b.defaultValue)===String(bs?.value||""));
    this.value=this.value.replace(/\D/g,"");
    if(s&&this.value.length>s.max)this.value=this.value.slice(0,s.max);
  });

  $("#regMobileNumber",h)?.addEventListener("input",function(){
    this.value=this.value.replace(/\D/g,"");
  });

  $("#regFirstName",h)?.addEventListener("input",function(){
    this.value=this.value.replace(/[^a-zA-Z\s]/g,"");
  });

  $("#regAccountName",h)?.addEventListener("input",function(){
    this.value=this.value.replace(/[^a-zA-Z\s]/g,"");
  });

  const ref=$("#regReferral",h);

  if(ref){
    try{
      let r=new URLSearchParams(location.search).get(c.referralParamKey)||"";
      if(r){
        localStorage.setItem("referral_code",r);
      }else{
        r=localStorage.getItem("referral_code")||"";
      }
      if(r)ref.value=r;
    }catch{}
  }

  f?.addEventListener("submit",async e=>{
    e.preventDefault();

    if(!valid())return;

    const sb=$("#AuthSubmitBtn",h);
    if(sb)sb.disabled=true;

    loading(true);

    try{
      let t=$("input#token")?.value||"";
      if(!t)t=await tok();

      const p={
        username:$("#regUsername",h).value.trim(),
        email:$("#regEmail",h)?.value.trim()||"",
        password:$("#regPassword",h).value,
        cpassword:$("#regCPassword",h).value,
        firstname:$("#regFirstName",h).value.trim(),
        countrycode:$("#regCountryCode",h).value,
        mobilenumber:$("#regMobileNumber",h).value.trim(),
        referral:$("#regReferral",h)?.value.trim()||"",
        bankCode:$("#regBankName",h).value,
        accountNo:$("#regAccountNo",h).value.trim(),
        accountName:$("#regAccountName",h).value.trim(),
        captcha:$("#regCaptcha",h).value.trim(),
        token:t,
        devicetoken:"",
        deviceid:"",
        lang:document.documentElement.getAttribute("lang")||"id"
      };

      const r=await(
        window.axios?.post
          ? ((u,d)=>axios.post(u,d))
          : (async(u,d)=>{
              const fr=await fetch(u,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                credentials:"include",
                body:JSON.stringify(d)
              });
              return{status:fr.status,data:await fr.json().catch(()=>({}))};
            })
      )(c.registerApiUrl,p);

      const ok=r.data?.code===0||r.data?.success===1||r.data?.success===true;

      if(ok){
        const to=r.data?.data?.redirect;
        if(to){
          location.href=to;
        }else{
          location.reload();
        }
      }else{
        alert(r.data?.data?.message||r.data?.message||l.registerError);
        if(ci)ci.src=c.registerCaptchaBaseUrl+Date.now();
        if(cx)cx.value="";
      }
    }catch(e){
      alert(e?.response?.data?.data?.message||e?.response?.data?.message||l.registerNetworkError);
      if(ci)ci.src=c.registerCaptchaBaseUrl+Date.now();
      if(cx)cx.value="";
    }finally{
      if(sb)sb.disabled=false;
      loading(false);
    }
  });
}

function bindTabs(h,c){
  const tabs=$$(".auth-tab",h);
  const lp=$("#login-panel",h);
  const rp=$("#register-panel",h);
  const sb=$("#AuthSubmitBtn",h);

  tabs.forEach(t=>t.addEventListener("click",()=>{
    const n=t.dataset.tab;
    T=n;

    tabs.forEach(x=>x.classList.toggle("active",x.dataset.tab===n));

    lp.style.display=n==="login"?"":"none";
    rp.style.display=n==="register"?"":"none";

    sb.textContent=n==="login"?c.labels.login:c.register.labels.submit;
    sb.classList.toggle("btn-gold",n==="login");
    sb.classList.toggle("btn-red",n==="register");
  }));

  sb.addEventListener("click",()=>{
    const f=$(T==="login"?"#InlineLoginForm":"#InlineRegisterForm",h);
    if(f){
      if(f.requestSubmit){
        f.requestSubmit();
      }else{
        f.dispatchEvent(new Event("submit",{cancelable:true}));
      }
    }
  });
}

function bankOpts(b){
  return b.map(x=>`<option value="${x.defaultValue}"${x.selected?" selected":""}>${x.name}</option>`).join("");
}

function toggle(b,i){
  b?.addEventListener("click",e=>{
    e.preventDefault();
    if(i){
      i.type=i.type==="password"?"text":"password";
      i.focus();
    }
  });
}

function target(c){
  for(const s of [c.targetSelector].concat(c.fallbackSelectors||[])){
    const e=$(s);
    if(e)return e;
  }

  return null;
}

function place(t,h,c){
  if(!t)return false;

  if(t.matches("body")){
    t.insertAdjacentHTML("afterbegin",h);
    return true;
  }

  if(t.matches(".index-card")||t.matches("main")){
    t.insertAdjacentHTML("afterbegin",h);
    return true;
  }

  t.insertAdjacentHTML(c.insertPosition||"afterend",h);
  return true;
}

function wait(c,ms=12000){
  return new Promise(res=>{
    const e=target(c);
    if(e)return res(e);

    const st=Date.now();

    const ob=new MutationObserver(()=>{
      const f=target(c);
      if(f){
        ob.disconnect();
        res(f);
        return;
      }

      if(Date.now()-st>ms){
        ob.disconnect();
        res(document.body||null);
      }
    });

    ob.observe(document.documentElement,{childList:true,subtree:true});

    setTimeout(()=>{
      const f=target(c);
      ob.disconnect();
      res(f||document.body||null);
    },ms);
  });
}

function inlineHtml(c,token){
  return `<div id="inline-login-host" class="login-embed">
    <div class="card">
      <div class="auth-tabs">
        <button class="auth-tab active" type="button" data-tab="login">${c.labels.login}</button>
        <button class="auth-tab" type="button" data-tab="register">${c.labels.register}</button>
      </div>

      <div class="auth-panel" id="login-panel">
        <form id="InlineLoginForm" autocomplete="off" novalidate>
          <div class="group tight">
            <input class="login-form" name="username" id="loginUsername" type="text" minlength="5" maxlength="16" required placeholder="${c.labels.username}">
            <div class="msg hide" id="loginMsgUser"></div>
          </div>

          <div class="group tight">
            <div class="field-rel">
              <input class="login-form" name="password" id="loginPassword" type="password" minlength="6" maxlength="64" required placeholder="${c.labels.password}">
              <a href="#" id="loginPwdToggle" class="eye" aria-label="Toggle password visibility" title="Show / hide password">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </a>
            </div>
            <div class="msg hide" id="loginMsgPass"></div>
            <div class="forgot-wrap">
              <a class="forgot-link" href="${c.forgotPasswordUrl}" target="_blank" rel="noopener noreferrer">${c.labels.forgotPassword}</a>
            </div>
          </div>

          <div class="group tight">
            <div class="captcha-row">
              <input class="login-form" type="text" name="captcha" id="loginCaptcha" maxlength="4" required placeholder="${c.labels.captcha}" style="width:120px">
              <img loading="lazy" src="${c.captchaBaseUrl}${Date.now()}" alt="captcha" id="loginImgCaptcha">
              <button type="button" id="loginReloadCaptcha" class="btn-reload" title="Reload captcha" aria-label="Reload captcha">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.64-6.36"></path><path d="M21 3v6h-6"></path></svg>
              </button>
            </div>
          </div>

          <input type="hidden" id="token" name="token" value="${token}">
          <button type="submit" hidden></button>
        </form>
      </div>

      <div class="auth-panel" id="register-panel" style="display:none">
        <form id="InlineRegisterForm" action="${c.registerApiUrl}" method="post" autocomplete="off" novalidate>
          <div class="group tight">
            <input class="login-form" name="username" id="regUsername" type="text" minlength="5" maxlength="16" required placeholder="${c.register.labels.username}">
            <div class="msg hide" id="regMsgUsername"></div>
          </div>

          <div class="group tight">
            <input class="login-form" name="email" id="regEmail" type="email" placeholder="${c.register.labels.email}">
          </div>

          <div class="group tight">
            <div class="field-rel">
              <input class="login-form" name="password" id="regPassword" type="password" minlength="6" maxlength="16" required placeholder="${c.register.labels.password}">
              <a href="#" id="regPwdToggle" class="eye" aria-label="Toggle password visibility" title="Show / hide password">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </a>
            </div>
            <div class="msg hide" id="regMsgPassword"></div>
          </div>

          <div class="group tight">
            <div class="field-rel">
              <input class="login-form" name="cpassword" id="regCPassword" type="password" minlength="6" maxlength="16" required placeholder="${c.register.labels.confirmPassword}">
              <a href="#" id="regCPwdToggle" class="eye" aria-label="Toggle confirm password visibility" title="Show / hide password">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </a>
            </div>
            <div class="msg hide" id="regMsgCPassword"></div>
          </div>

          <div class="group tight">
            <input class="login-form" name="firstName" id="regFirstName" type="text" required placeholder="${c.register.labels.fullName}">
            <div class="msg hide" id="regMsgFirstName"></div>
          </div>

          <div class="group tight">
            <div class="input-group">
              <span class="input-prefix">+62</span>
              <input class="login-form input-has-prefix" name="mobileNumber" id="regMobileNumber" type="tel" minlength="7" maxlength="12" required placeholder="${c.register.labels.phonePlaceholder}">
            </div>
            <input type="hidden" id="regCountryCode" name="countryCode" value="62">
            <div class="msg hide" id="regMsgPhone"></div>
          </div>

          <div class="group tight">
            <input class="login-form" name="referral" id="regReferral" type="text" placeholder="${c.register.labels.referral}">
          </div>

          <div class="reg-section">Rekening Bank</div>

          <div class="group tight">
            <label class="reg-label" for="regBankName">${c.register.labels.bankName}</label>
            <select class="login-form" name="BankName" id="regBankName" required>
              <option value="" disabled ${c.register._banks.some(b=>b.selected)?"":"selected"}>-- Pilih Bank --</option>
              ${bankOpts(c.register._banks)}
            </select>
            <div class="msg hide" id="regMsgBank"></div>
          </div>

          <div class="group tight">
            <label class="reg-label" for="regAccountNo">${c.register.labels.accountNo}</label>
            <input class="login-form" name="AccountNo" id="regAccountNo" type="text" inputmode="numeric" required placeholder="${c.register.labels.accountNo}">
            <div class="msg hide" id="regMsgAccountNo"></div>
          </div>

          <div class="group tight">
            <label class="reg-label" for="regAccountName">${c.register.labels.accountName}</label>
            <input class="login-form" name="AccountName" id="regAccountName" type="text" required placeholder="${c.register.labels.accountName}">
            <div class="msg hide" id="regMsgAccountName"></div>
          </div>

          <div class="group tight">
            <div class="captcha-row">
              <input class="login-form" type="text" name="captcha" id="regCaptcha" maxlength="4" required placeholder="${c.register.labels.captcha}" style="width:120px">
              <img loading="lazy" src="${c.registerCaptchaBaseUrl}${Date.now()}" alt="captcha" id="regImgCaptcha">
              <button type="button" id="regReloadCaptcha" class="btn-reload" title="Reload captcha" aria-label="Reload captcha">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.64-6.36"></path><path d="M21 3v6h-6"></path></svg>
              </button>
            </div>
            <div class="msg hide" id="regMsgCaptcha"></div>
          </div>

          <button type="submit" hidden></button>
        </form>
      </div>

      <div class="actions">
        <button class="btn btn-gold" type="button" id="AuthSubmitBtn">${c.labels.login}</button>
      </div>
    </div>
  </div>`;
}

async function render(c){
  if(R||$("#inline-login-host")){
    hn(c.nativeLoginSelectors);
    return;
  }

  const t=await wait(c);

  if(!t){
    console.warn("[auth] Target homepage Bonus138 tidak ditemukan.");
    return;
  }

  c.register._banks=await banks();

  const token=$("input#token")?.value||"";
  const html=inlineHtml(c,token);

  if(!place(t,html,c))return;

  R=true;

  hn(c.nativeLoginSelectors);

  const h=$("#inline-login-host");

  toggle($("#regPwdToggle",h),$("#regPassword",h));
  toggle($("#regCPwdToggle",h),$("#regCPassword",h));

  bindTabs(h,c);
  bindLogin(h,c);
  bindRegister(h,c);

  document.addEventListener("click",e=>{
    const b=e.target.closest("a,button");
    if(!b)return;

    const href=b.getAttribute("href")||"";
    const txt=(b.innerText||"").toLowerCase();

    if(/logout/i.test(href)||/logout|keluar/i.test(txt)||b.dataset.action==="logout"){
      setTimeout(()=>vis(c),1200);
    }
  },true);

  vis(c);

  setTimeout(()=>vis(c),800);

  document.addEventListener("visibilitychange",()=>{
    if(!document.hidden)vis(c);
  });
}

function social(){
  window.loginWithSocial=function(p){
    const b=typeof window.baseUrl==="function"?window.baseUrl():location.origin;
    location.href="/v2/api/account/login/"+encodeURIComponent(p)+"?d="+encodeURIComponent(b);
  };
}

function init(){
  addStyle();
  ax();
  loader(C.labels.loaderText);
  social();
  render(C);
}

if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded",init);
}else{
  init();
}

})();
