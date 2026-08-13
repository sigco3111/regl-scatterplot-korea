import{n as e}from"./rolldown-runtime-Bh1tDfsg.js";import{A as t,C as n,D as r,E as i,F as a,I as o,L as s,M as c,N as l,O as u,P as d,R as f,S as p,T as m,_ as h,b as g,c as ee,d as te,f as ne,g as re,h as ie,j as ae,k as oe,l as se,m as ce,p as le,u as ue,v as _,w as de,x as fe,y as pe}from"./vendor-BycKLoOk.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var v=`1.16.0`,y=`
precision mediump float;

uniform sampler2D texture;

varying vec2 uv;

void main () {
  gl_FragColor = texture2D(texture, uv);
}
`,me=`
precision mediump float;

uniform mat4 modelViewProjection;

attribute vec2 position;

varying vec2 uv;

void main () {
  uv = position;
  gl_Position = modelViewProjection * vec4(-1.0 + 2.0 * uv.x, 1.0 - 2.0 * uv.y, 0, 1);
}
`,b=`auto`,he=Float32Array.BYTES_PER_ELEMENT,x=[`OES_texture_float`,`OES_element_index_uint`,`WEBGL_color_buffer_float`,`EXT_float_blend`],ge={color:[0,0,0,0],depth:1},_e=`panZoom`,S=`lasso`,C=[_e,S,`rotate`],ve=_e,ye={cubicIn:c,cubicInOut:l,cubicOut:d,linear:a,quadIn:o,quadInOut:s,quadOut:f},be=l,xe=`continuous`,Se=`categorical`,Ce=[xe,Se],we=`deselect`,Te=`lassoEnd`,Ee=[we,Te],De=[0,.666666667,1,1],Oe=Te,ke=`lasso`,Ae=`rotate`,je=`merge`,Me=`remove`,Ne=[ke,Ae,je,Me],Pe=`ctrl`,Fe=`meta`,Ie=`shift`,Le=[`alt`,`cmd`,Pe,Fe,Ie],Re={[Me]:`alt`,[Ae]:`alt`,[ke]:Ie,[je]:`cmd`},ze=b,Be=b,Ve=`asinh`,He=.66,Ue=.15,We=[.66,.66,.66,1],Ge=[0,.55,1,1],Ke=[1,1,1,1],qe=[0,0,0,1],Je=[.66,.66,.66,.2],Ye=[0,.55,1,1],Xe=[1,1,1,1],Ze=[1,1,1,.5],Qe=1e3,$e=[0,0],et=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),tt=`IMAGE_LOAD_ERROR`,nt=[1,1,1,.5],rt=1/500,it=`auto`,at=new Set([`z`,`valueZ`,`valueA`,`value1`,`category`]),ot=new Set([`w`,`valueW`,`valueB`,`value2`,`value`]),st=15e3,ct=.5,lt=`lasso`,ut=Symbol(`SKIP_DEPRECATION_VALUE_TRANSLATION`),dt=`Points have not been drawn`,ft=`The instance was already destroyed`,pt="Ignoring draw call as the previous draw call has not yet finished. To avoid this warning `await` the draw call.",mt=()=>{let e=[Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array];class t{static from(n){if(!(n instanceof ArrayBuffer))throw Error(`Data must be an instance of ArrayBuffer.`);let[r,i]=new Uint8Array(n,0,2);if(r!==219)throw Error(`Data does not appear to be in a KDBush format.`);let a=i>>4;if(a!==1)throw Error(`Got v${a} data when expected v1.`);let o=e[i&15];if(!o)throw Error(`Unrecognized array type.`);let[s]=new Uint16Array(n,2,1),[c]=new Uint32Array(n,4,1);return new t(c,s,o,n)}constructor(t,n=64,r=Float64Array,i){if(isNaN(t)||t<0)throw Error(`Unexpected numItems value: ${t}.`);this.numItems=+t,this.nodeSize=Math.min(Math.max(+n,2),65535),this.ArrayType=r,this.IndexArrayType=t<65536?Uint16Array:Uint32Array;let a=e.indexOf(this.ArrayType),o=t*2*this.ArrayType.BYTES_PER_ELEMENT,s=t*this.IndexArrayType.BYTES_PER_ELEMENT,c=(8-s%8)%8;if(a<0)throw Error(`Unexpected typed array class: ${r}.`);i&&i instanceof ArrayBuffer?(this.data=i,this.ids=new this.IndexArrayType(this.data,8,t),this.coords=new this.ArrayType(this.data,8+s+c,t*2),this._pos=t*2,this._finished=!0):(this.data=new ArrayBuffer(8+o+s+c),this.ids=new this.IndexArrayType(this.data,8,t),this.coords=new this.ArrayType(this.data,8+s+c,t*2),this._pos=0,this._finished=!1,new Uint8Array(this.data,0,2).set([219,16+a]),new Uint16Array(this.data,2,1)[0]=n,new Uint32Array(this.data,4,1)[0]=t)}add(e,t){let n=this._pos>>1;return this.ids[n]=n,this.coords[this._pos++]=e,this.coords[this._pos++]=t,n}finish(){let e=this._pos>>1;if(e!==this.numItems)throw Error(`Added ${e} items when expected ${this.numItems}.`);return n(this.ids,this.coords,this.nodeSize,0,this.numItems-1,0),this._finished=!0,this}range(e,t,n,r){if(!this._finished)throw Error(`Data not yet indexed - call index.finish().`);let{ids:i,coords:a,nodeSize:o}=this,s=[0,i.length-1,0],c=[];for(;s.length;){let l=s.pop()||0,u=s.pop()||0,d=s.pop()||0;if(u-d<=o){for(let o=d;o<=u;o++){let s=a[2*o],l=a[2*o+1];s>=e&&s<=n&&l>=t&&l<=r&&c.push(i[o])}continue}let f=d+u>>1,p=a[2*f],m=a[2*f+1];p>=e&&p<=n&&m>=t&&m<=r&&c.push(i[f]),(l===0?e<=p:t<=m)&&(s.push(d),s.push(f-1),s.push(1-l)),(l===0?n>=p:r>=m)&&(s.push(f+1),s.push(u),s.push(1-l))}return c}within(e,t,n){if(!this._finished)throw Error(`Data not yet indexed - call index.finish().`);let{ids:r,coords:i,nodeSize:a}=this,s=[0,r.length-1,0],c=[],l=n*n;for(;s.length;){let u=s.pop()||0,d=s.pop()||0,f=s.pop()||0;if(d-f<=a){for(let n=f;n<=d;n++)o(i[2*n],i[2*n+1],e,t)<=l&&c.push(r[n]);continue}let p=f+d>>1,m=i[2*p],h=i[2*p+1];o(m,h,e,t)<=l&&c.push(r[p]),(u===0?e-n<=m:t-n<=h)&&(s.push(f),s.push(p-1),s.push(1-u)),(u===0?e+n>=m:t+n>=h)&&(s.push(p+1),s.push(d),s.push(1-u))}return c}}function n(e,t,i,a,o,s){if(o-a<=i)return;let c=a+o>>1;r(e,t,c,a,o,s),n(e,t,i,a,c-1,1-s),n(e,t,i,c+1,o,1-s)}function r(e,t,n,a,o,s){for(;o>a;){if(o-a>600){let i=o-a+1,c=n-a+1,l=Math.log(i),u=.5*Math.exp(2*l/3),d=.5*Math.sqrt(l*u*(i-u)/i)*(c-i/2<0?-1:1);r(e,t,n,Math.max(a,Math.floor(n-c*u/i+d)),Math.min(o,Math.floor(n+(i-c)*u/i+d)),s)}let c=t[2*n+s],l=a,u=o;for(i(e,t,a,n),t[2*o+s]>c&&i(e,t,a,o);l<u;){for(i(e,t,l,u),l++,u--;t[2*l+s]<c;)l++;for(;t[2*u+s]>c;)u--}t[2*a+s]===c?i(e,t,a,u):(u++,i(e,t,u,o)),u<=n&&(a=u+1),n<=u&&(o=u-1)}}function i(e,t,n,r){a(e,n,r),a(t,2*n,2*r),a(t,2*n+1,2*r+1)}function a(e,t,n){let r=e[t];e[t]=e[n],e[n]=r}function o(e,t,n,r){let i=e-n,a=t-r;return i*i+a*a}return t},ht=()=>{addEventListener(`message`,e=>{let t=e.data.points;t.length===0&&self.postMessage({error:Error(`Invalid point data`)});let n=new KDBush(t.length,e.data.nodeSize);for(let[e,r]of t)n.add(e,r);n.finish(),postMessage(n.data,[n.data])})},gt=mt(),_t=1e6,vt=e=>{let t=`const createKDBushClass = ${mt.toString()};KDBush = createKDBushClass();const createWorker = ${e.toString()};createWorker();`,n=new Blob([t],{type:`text/javascript`}),r=URL.createObjectURL(n),i=new Worker(r,{name:`KDBush`});return URL.revokeObjectURL(r),i},yt=(e,t={nodeSize:16,useWorker:void 0})=>new Promise((n,r)=>{if(e instanceof ArrayBuffer)n(gt.from(e));else if((e.length<_t||t.useWorker===!1)&&t.useWorker!==!0){let r=new gt(e.length,t.nodeSize);for(let t of e)r.add(t[0],t[1]);r.finish(),n(r)}else{let i=vt(ht);i.onmessage=e=>{e.data.error?r(e.data.error):n(gt.from(e.data)),i.terminate()},i.postMessage({points:e,nodeSize:t.nodeSize})}}),bt=`freeform`,xt=2500,St=(e,t,n)=>(1-e)*t+n,w=(e,t)=>`${e}ms ease-out mainIn ${t}ms 1 normal forwards`,T=(e,t)=>`${e}ms ease-out effectIn ${t}ms 1 normal forwards`,E=(e,t)=>`${e}ms linear leftSpinIn ${t}ms 1 normal forwards`,Ct=(e,t)=>`${e}ms linear rightSpinIn ${t}ms 1 normal forwards`,D=(e,t)=>`${e}ms linear circleIn ${t}ms 1 normal forwards`,O=(e,t,n)=>`
  @keyframes mainIn {
    0% {
      color: ${t};
      opacity: 0;
    }
    0%, ${e}% {
      color: ${t};
      opacity: 1;
    }
    100% {
      color: ${n};
      opacity: 0.8;
    }
  }
`,k=(e,t,n,r)=>`
  @keyframes effectIn {
    0%, ${e}% {
      opacity: ${n};
      transform: scale(${r});
    }
    ${t}% {
      opacity: 0.66;
      transform: scale(1.5);
    }
    99% {
      opacity: 0;
      transform: scale(2);
    }
    100% {
      opacity: 0;
      transform: scale(0);
    }
  }
`,wt=(e,t,n)=>`
  @keyframes circleIn {
    0% {
      clip-path: ${t};
      opacity: ${n};
    }
    ${e}% {
      clip-path: ${t};
      opacity: 1;
    }
    ${e+.01}%, 100% {
      clip-path: inset(0);
      opacity: 1;
    }
  }
`,A=(e,t)=>`
  @keyframes leftSpinIn {
    0% {
      transform: rotate(${t}deg);
    }
    ${e}%, 100% {
      transform: rotate(360deg);
    }
  }
`,Tt=(e,t)=>`
  @keyframes rightSpinIn {
    0% {
      transform: rotate(${t}deg);
    }
    ${e}%, 100% {
      transform: rotate(180deg);
    }
  }
`,Et=({time:e=750,extraTime:t=500,delay:n=100,currentColor:r,targetColor:i,effectOpacity:a,effectScale:o,circleLeftRotation:s,circleRightRotation:c,circleClipPath:l,circleOpacity:u})=>{let d=s/360,f=St(d,e,t),p=Math.round((1-d)*e/f*100),m=Math.round(p/2),h=p+(100-p)/4;return{rules:{main:O(p,r,i),effect:k(p,h,a,o),circleRight:Tt(m,c),circleLeft:A(p,s),circle:wt(m,l,u)},names:{main:w(f,n),effect:T(f,n),circleLeft:E(f,n),circleRight:Ct(f,n),circle:D(f,n)}}},j=e=>`${e}ms linear mainOut 0s 1 normal forwards`,Dt=e=>`${e}ms linear effectOut 0s 1 normal forwards`,Ot=e=>`${e}ms linear leftSpinOut 0s 1 normal forwards`,kt=e=>`${e}ms linear rightSpinOut 0s 1 normal forwards`,At=e=>`${e}ms linear circleOut 0s 1 normal forwards`,M=(e,t)=>`
  @keyframes mainOut {
    0% {
      color: ${e};
    }
    100% {
      color: ${t};
    }
  }
`,jt=(e,t)=>`
  @keyframes effectOut {
    0% {
      opacity: ${e};
      transform: scale(${t});
    }
    99% {
      opacity: 0;
      transform: scale(${t+.5});
    }
    100% {
      opacity: 0;
      transform: scale(0);
    }
  }
`,Mt=(e,t)=>`
  @keyframes rightSpinOut {
    0%, ${e}% {
      transform: rotate(${t}deg);
    }
    100% {
      transform: rotate(0deg);
    }
`,Nt=e=>`
  @keyframes leftSpinOut {
    0% {
      transform: rotate(${e}deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
`,N=(e,t,n)=>`
  @keyframes circleOut {
    0%, ${e}% {
      clip-path: ${t};
      opacity: ${n};
    }
    ${e+.01}% {
      clip-path: inset(0 0 0 50%);
      opacity: ${n};
    }
    100% {
      clip-path: inset(0 0 0 50%);
      opacity: 0;
    }
  }
`,P=({time:e=250,currentColor:t,targetColor:n,effectOpacity:r,effectScale:i,circleLeftRotation:a,circleRightRotation:o,circleClipPath:s,circleOpacity:c})=>{let l=a/360,u=l*e,d=Math.min(100,l*100),f=d>50?Math.round((1-50/d)*100):0;return{rules:{main:M(t,n),effect:jt(r,i),circleRight:Mt(f,o),circleLeft:Nt(a),circle:N(f,s,c)},names:{main:j(u),effect:Dt(u),circleRight:Ot(u),circleLeft:kt(u),circle:At(u)}}},Pt=()=>{let e=document.createElement(`div`);e.id=`lasso-long-press-${Math.random().toString(36).substring(2,5)+Math.random().toString(36).substring(2,5)}`,e.style.position=`fixed`,e.style.width=`1.25rem`,e.style.height=`1.25rem`,e.style.pointerEvents=`none`,e.style.transform=`translate(-50%,-50%)`;let t=document.createElement(`div`);t.style.position=`absolute`,t.style.top=0,t.style.left=0,t.style.width=`1.25rem`,t.style.height=`1.25rem`,t.style.clipPath=`inset(0px 0px 0px 50%)`,t.style.opacity=0,e.appendChild(t);let n=document.createElement(`div`);n.style.position=`absolute`,n.style.top=0,n.style.left=0,n.style.width=`0.8rem`,n.style.height=`0.8rem`,n.style.border=`0.2rem solid currentcolor`,n.style.borderRadius=`0.8rem`,n.style.clipPath=`inset(0px 50% 0px 0px)`,n.style.transform=`rotate(0deg)`,t.appendChild(n);let r=document.createElement(`div`);r.style.position=`absolute`,r.style.top=0,r.style.left=0,r.style.width=`0.8rem`,r.style.height=`0.8rem`,r.style.border=`0.2rem solid currentcolor`,r.style.borderRadius=`0.8rem`,r.style.clipPath=`inset(0px 50% 0px 0px)`,r.style.transform=`rotate(0deg)`,t.appendChild(r);let i=document.createElement(`div`);return i.style.position=`absolute`,i.style.top=0,i.style.left=0,i.style.width=`1.25rem`,i.style.height=`1.25rem`,i.style.borderRadius=`1.25rem`,i.style.background=`currentcolor`,i.style.transform=`scale(0)`,i.style.opacity=0,e.appendChild(i),{longPress:e,longPressCircle:t,longPressCircleLeft:n,longPressCircleRight:r,longPressEffect:i}},Ft=(e,t,n)=>{if(e.length===0)return 0;if(e.length===1)return e[0];let r=2**(-1/t),i=Math.max(0,e.length-n),a=e.slice(i),o=0,s=0,c=0;for(let e=a.length-1;e>=0;e--){let t=r**(a.length-1-e);o+=a[e][0]*t,s+=a[e][1]*t,c+=t}return[o/c,s/c]},It=(e,t=null)=>e===null?t:e,Lt,Rt=()=>{if(!Lt){let e=document.createElement(`style`);document.head.appendChild(e),Lt=e.sheet}return Lt},F=e=>{let t=Rt(),n=t.rules.length;return t.insertRule(e,n),n},I=e=>{Rt().deleteRule(e)},zt=`${xt}ms ease scaleInFadeOut 0s 1 normal backwards`,Bt=(e,t,n)=>`
@keyframes scaleInFadeOut {
  0% {
    opacity: ${e};
    transform: translate(-50%,-50%) scale(${t}) rotate(${n}deg);
  }
  10% {
    opacity: 1;
    transform: translate(-50%,-50%) scale(1) rotate(${n+20}deg);
  }
  100% {
    opacity: 0;
    transform: translate(-50%,-50%) scale(0.9) rotate(${n+60}deg);
  }
}
`,Vt=null,Ht=`250ms ease fadeScaleOut 0s 1 normal backwards`,Ut=(e,t,n)=>`
@keyframes fadeScaleOut {
  0% {
    opacity: ${e};
    transform: translate(-50%,-50%) scale(${t}) rotate(${n}deg);
  }
  100% {
    opacity: 0;
    transform: translate(-50%,-50%) scale(0) rotate(${n}deg);
  }
}
`,L=null,Wt=(e,{onDraw:t=ae,onStart:r=ae,onEnd:a=ae,enableInitiator:o=!0,initiatorParentElement:s=document.body,longPressIndicatorParentElement:c=document.body,minDelay:l=8,minDist:u=2,pointNorm:d=ae,type:f=bt,brushSize:h=24}={})=>{let g=o,ee=s,te=c,ne=t,re=r,ie=a,oe=l,se=u,ce=d,le=f,ue=h,v=document.createElement(`div`);v.id=`lasso-initiator-${Math.random().toString(36).substring(2,5)+Math.random().toString(36).substring(2,5)}`,v.style.position=`fixed`,v.style.display=`flex`,v.style.justifyContent=`center`,v.style.alignItems=`center`,v.style.zIndex=99,v.style.width=`4rem`,v.style.height=`4rem`,v.style.borderRadius=`4rem`,v.style.opacity=.5,v.style.transform=`translate(-50%,-50%) scale(0) rotate(0deg)`;let{longPress:y,longPressCircle:me,longPressCircleLeft:b,longPressCircleRight:he,longPressEffect:x}=Pt(),ge=!1,_e=!1,S=[],C=[],ve=[],ye=[],be,xe=!1,Se=null,Ce=null,we=null,Te=null,Ee=null,De=null,Oe=null,ke=null,Ae=null,je=null,Me=()=>{ge=!1},Ne=t=>{let{left:n,top:r}=e.getBoundingClientRect();return[t.clientX-n,t.clientY-r]};window.addEventListener(`mouseup`,Me);let Pe=()=>{v.style.opacity=.5,v.style.transform=`translate(-50%,-50%) scale(0) rotate(0deg)`},Fe=(e,t)=>{let n=getComputedStyle(e),r=+n.opacity,i=n.transform.match(/([0-9.-]+)+/g),a=+i[0],o=+i[1],s=Math.sqrt(a*a+o*o),c=180/Math.PI*Math.atan2(o,a);return c=t&&c<=0?360+c:c,{opacity:r,scale:s,rotate:c}},Ie=e=>{if(!g||ge)return;let t=e.clientX,n=e.clientY;v.style.top=`${n}px`,v.style.left=`${t}px`;let r=Fe(v),i=r.opacity,a=r.scale,o=r.rotate;v.style.opacity=i,v.style.transform=`translate(-50%,-50%) scale(${a}) rotate(${o}deg)`,v.style.animation=`none`,_().then(()=>{Vt!==null&&I(Vt),Vt=F(Bt(i,a,o)),v.style.animation=zt,_().then(()=>{Pe()})})},Le=()=>{let{opacity:e,scale:t,rotate:n}=Fe(v);v.style.opacity=e,v.style.transform=`translate(-50%,-50%) scale(${t}) rotate(${n}deg)`,v.style.animation=`none`,_(2).then(()=>{L!==null&&I(L),L=F(Ut(e,t,n)),v.style.animation=Ht,_().then(()=>{Pe()})})},Re=(e,t,{time:n=750,extraTime:r=500,delay:i=100}={time:750,extraTime:500,delay:100})=>{xe=!0;let a=getComputedStyle(y);y.style.color=a.color,y.style.top=`${t}px`,y.style.left=`${e}px`,y.style.animation=`none`;let o=getComputedStyle(me);me.style.clipPath=o.clipPath,me.style.opacity=o.opacity,me.style.animation=`none`;let s=Fe(x);x.style.opacity=s.opacity,x.style.transform=`scale(${s.scale})`,x.style.animation=`none`;let c=Fe(b);b.style.transform=`rotate(${c.rotate}deg)`,b.style.animation=`none`;let l=Fe(he);he.style.transform=`rotate(${l.rotate}deg)`,he.style.animation=`none`,_().then(()=>{if(!xe)return;Ee!==null&&I(Ee),Te!==null&&I(Te),we!==null&&I(we),Ce!==null&&I(Ce),Se!==null&&I(Se);let{rules:e,names:t}=Et({time:n,extraTime:r,delay:i,currentColor:a.color||`currentcolor`,targetColor:y.dataset.activeColor,effectOpacity:s.opacity||0,effectScale:s.scale||0,circleLeftRotation:c.rotate||0,circleRightRotation:l.rotate||0,circleClipPath:o.clipPath||`inset(0 0 0 50%)`,circleOpacity:o.opacity||0});Se=F(e.main),Ce=F(e.effect),we=F(e.circleLeft),Te=F(e.circleRight),Ee=F(e.circle),y.style.animation=t.main,x.style.animation=t.effect,b.style.animation=t.circleLeft,he.style.animation=t.circleRight,me.style.animation=t.circle})},ze=({time:e=250}={time:250})=>{if(!xe)return;xe=!1;let t=getComputedStyle(y);y.style.color=t.color,y.style.animation=`none`;let n=getComputedStyle(me);me.style.clipPath=n.clipPath,me.style.opacity=n.opacity,me.style.animation=`none`;let r=Fe(x);x.style.opacity=r.opacity,x.style.transform=`scale(${r.scale})`,x.style.animation=`none`;let i=n.clipPath.slice(-2,-1)===`x`,a=Fe(b,i);b.style.transform=`rotate(${a.rotate}deg)`,b.style.animation=`none`;let o=Fe(he);he.style.transform=`rotate(${o.rotate}deg)`,he.style.animation=`none`,_().then(()=>{je!==null&&I(je),Ae!==null&&I(Ae),ke!==null&&I(ke),Oe!==null&&I(Oe),De!==null&&I(De);let{rules:i,names:s}=P({time:e,currentColor:t.color||`currentcolor`,targetColor:y.dataset.color,effectOpacity:r.opacity||0,effectScale:r.scale||0,circleLeftRotation:a.rotate||0,circleRightRotation:o.rotate||0,circleClipPath:n.clipPath||`inset(0px)`,circleOpacity:n.opacity||1});De=F(i.main),Oe=F(i.effect),ke=F(i.circleLeft),Ae=F(i.circleRight),je=F(i.circle),y.style.animation=s.main,x.style.animation=s.effect,b.style.animation=s.circleLeft,he.style.animation=s.circleRight,me.style.animation=s.circle})},Be=()=>{ne(S,C)},Ve=e=>{S.push(e),C.push(e[0],e[1])},He=e=>{let[t,n]=e,[r,i]=S[0];S[1]=[t,i],S[2]=[t,n],S[3]=[r,n],S[4]=[r,i],C[2]=t,C[3]=i,C[4]=t,C[5]=n,C[6]=r,C[7]=n,C[8]=r,C[9]=i},Ue=e=>{ve.push(e)},We=()=>Math.abs(ce([0,0])[0]-ce([ue/2,0])[0]),Ge=(e,t,n)=>{let[r,a]=e,[o,s]=t,c=r-o,l=a-s,u=i([c,l]);return[+l/u*n,-c/u*n]},Ke=e=>{let t=ve.at(-1),n=We(),[r,i]=Ge(e,t,n),a=ve.length;if(a===1){let e=[t[0]+r,t[1]+i],n=[t[0]-r,t[1]-i];S.push(e,n),C.push(e[0],e[1],n[0],n[1]),ye.push([r,i])}else{[r,i]=Ge(e,t,n);let o=[...ye,[r,i]];[r,i]=Ft(o,1,10);let[s,c]=ye.at(-1),l=(r+s)/2,u=(i+c)/2,d=[t[0]+l,t[1]+u],f=[t[0]-l,t[1]-u];S.splice(a-1,2,d,f),C.splice(2*(a-1),4,d[0],d[1],f[0],f[1]),ye.splice(a,1,[l,u])}let o=[e[0]+r,e[1]+i],s=[e[0]-r,e[1]-i];S.splice(a,0,o,s),C.splice(2*a,0,o[0],o[1],s[0],s[1]),ve.push(e),ye.push([r,i])},qe=Ve,Je=Ve,Ye=e=>{if(be)fe(e[0],e[1],be[0],be[1])>se&&(be=e,qe(ce(e)),S.length>1&&Be());else{_e||(_e=!0,re()),be=e;let t=ce(e);Je(t)}},Xe=pe(Ye,oe,oe),Ze=(e,t)=>{let n=Ne(e);return t?Xe(n):Ye(n)},Qe=()=>{S=[],C=[],ve=[],ye=[],be=void 0,Be()},$e=e=>{Ie(e)},et=()=>{ge=!0,_e=!0,Qe(),re()},tt=()=>{Le()},nt=({merge:e=!1,remove:t=!1}={})=>{_e=!1;let n=[...S],r=[...C];return Xe.cancel(),Qe(),n.length>0&&ie(n,r,{merge:e,remove:t}),n},rt=e=>{switch(e){case`rectangle`:le=e,qe=He,Je=Ve;break;case`brush`:le=e,qe=Ke,Je=Ue;break;default:le=`freeform`,qe=Ve,Je=Ve;break}},it=e=>{if(e===`onDraw`)return ne;if(e===`onStart`)return re;if(e===`onEnd`)return ie;if(e===`enableInitiator`)return g;if(e===`minDelay`)return oe;if(e===`minDist`)return se;if(e===`pointNorm`)return ce;if(e===`type`)return le;if(e===`brushSize`)return ue},at=({onDraw:e=null,onStart:t=null,onEnd:n=null,enableInitiator:r=null,initiatorParentElement:i=null,longPressIndicatorParentElement:a=null,minDelay:o=null,minDist:s=null,pointNorm:c=null,type:l=null,brushSize:u=null}={})=>{ne=It(e,ne),re=It(t,re),ie=It(n,ie),g=It(r,g),oe=It(o,oe),se=It(s,se),ce=It(c,ce),ue=It(u,ue),i!==null&&i!==ee&&(ee.removeChild(v),i.appendChild(v),ee=i),a!==null&&a!==te&&(te.removeChild(y),a.appendChild(y),te=a),g?(v.addEventListener(`click`,$e),v.addEventListener(`mousedown`,et),v.addEventListener(`mouseleave`,tt)):(v.removeEventListener(`mousedown`,et),v.removeEventListener(`mouseleave`,tt)),l!==null&&rt(l)},ot=()=>{ee.removeChild(v),te.removeChild(y),window.removeEventListener(`mouseup`,Me),v.removeEventListener(`click`,$e),v.removeEventListener(`mousedown`,et),v.removeEventListener(`mouseleave`,tt)};return ee.appendChild(v),te.appendChild(y),at({onDraw:ne,onStart:re,onEnd:ie,enableInitiator:g,initiatorParentElement:ee,type:le,brushSize:ue}),p(de(`initiator`,v),de(`longPressIndicator`,y),e=>m(e,{clear:Qe,destroy:ot,end:nt,extend:Ze,get:it,set:at,showInitiator:Ie,hideInitiator:Le,showLongPressIndicator:Re,hideLongPressIndicator:ze}),n(Wt))({})},Gt=`
precision highp float;

uniform float antiAliasing;

varying vec4 color;
varying float finalPointSize;

float linearstep(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

void main() {
  vec2 c = gl_PointCoord * 2.0 - 1.0;
  float sdf = length(c) * finalPointSize;
  float alpha = linearstep(finalPointSize + antiAliasing, finalPointSize - antiAliasing, sdf);

  gl_FragColor = vec4(color.rgb, alpha * color.a);
}
`,Kt=e=>`
precision highp float;

uniform sampler2D colorTex;
uniform float colorTexRes;
uniform float colorTexEps;
uniform sampler2D stateTex;
uniform float stateTexRes;
uniform float stateTexEps;
uniform float devicePixelRatio;
uniform sampler2D encodingTex;
uniform float encodingTexRes;
uniform float encodingTexEps;
uniform float pointSizeExtra;
uniform float pointOpacityMax;
uniform float pointOpacityScale;
uniform float numPoints;
uniform float globalState;
uniform float isColoredByZ;
uniform float isColoredByW;
uniform float isOpacityByZ;
uniform float isOpacityByW;
uniform float isOpacityByDensity;
uniform float isSizedByZ;
uniform float isSizedByW;
uniform float isPixelAligned;
uniform float colorMultiplicator;
uniform float opacityMultiplicator;
uniform float opacityDensity;
uniform float sizeMultiplicator;
uniform float numColorStates;
uniform float pointScale;
uniform float drawingBufferWidth;
uniform float drawingBufferHeight;
uniform mat4 modelViewProjection;

attribute vec2 stateIndex;

varying vec4 color;
varying float finalPointSize;

void main() {
  vec4 state = texture2D(stateTex, stateIndex);

  if (isPixelAligned < 0.5) {
    gl_Position = modelViewProjection * vec4(state.x, state.y, 0.0, 1.0);
  } else {
    vec4 clipSpacePosition = modelViewProjection * vec4(state.x, state.y, 0.0, 1.0);
    vec2 ndcPosition = clipSpacePosition.xy / clipSpacePosition.w;
    vec2 pixelPos = 0.5 * (ndcPosition + 1.0) * vec2(drawingBufferWidth, drawingBufferHeight);
    pixelPos = floor(pixelPos + 0.5); // Snap to nearest pixel
    vec2 snappedPosition = (pixelPos / vec2(drawingBufferWidth, drawingBufferHeight)) * 2.0 - 1.0;
    gl_Position = vec4(snappedPosition, 0.0, 1.0);
  }


  // Determine color index
  float colorIndexZ =  isColoredByZ * floor(state.z * colorMultiplicator);
  float colorIndexW =  isColoredByW * floor(state.w * colorMultiplicator);

  // Multiply by the number of color states per color
  // I.e., normal, active, hover, background, etc.
  float colorIndex = (colorIndexZ + colorIndexW) * numColorStates;

  // Half a "pixel" or "texel" in texture coordinates
  float colorLinearIndex = colorIndex + globalState;

  // Need to add cEps here to avoid floating point issue that can lead to
  // dramatic changes in which color is loaded as floor(3/2.9999) = 1 but
  // floor(3/3.0001) = 0!
  float colorRowIndex = floor((colorLinearIndex + colorTexEps) / colorTexRes);

  vec2 colorTexIndex = vec2(
    (colorLinearIndex / colorTexRes) - colorRowIndex + colorTexEps,
    colorRowIndex / colorTexRes + colorTexEps
  );

  color = texture2D(colorTex, colorTexIndex);

  // Retrieve point size
  float pointSizeIndexZ = isSizedByZ * floor(state.z * sizeMultiplicator);
  float pointSizeIndexW = isSizedByW * floor(state.w * sizeMultiplicator);
  float pointSizeIndex = pointSizeIndexZ + pointSizeIndexW;

  float pointSizeRowIndex = floor((pointSizeIndex + encodingTexEps) / encodingTexRes);
  vec2 pointSizeTexIndex = vec2(
    (pointSizeIndex / encodingTexRes) - pointSizeRowIndex + encodingTexEps,
    pointSizeRowIndex / encodingTexRes + encodingTexEps
  );
  float pointSize = texture2D(encodingTex, pointSizeTexIndex).x;

  // Retrieve opacity
  ${e===3?``:`
        if (isOpacityByDensity < 0.5) {
          float opacityIndexZ = isOpacityByZ * floor(state.z * opacityMultiplicator);
          float opacityIndexW = isOpacityByW * floor(state.w * opacityMultiplicator);
          float opacityIndex = opacityIndexZ + opacityIndexW;

          float opacityRowIndex = floor((opacityIndex + encodingTexEps) / encodingTexRes);
          vec2 opacityTexIndex = vec2(
            (opacityIndex / encodingTexRes) - opacityRowIndex + encodingTexEps,
            opacityRowIndex / encodingTexRes + encodingTexEps
          );
          color.a = texture2D(encodingTex, opacityTexIndex)[${1+e}];
        } else {
          color.a = min(1.0, opacityDensity + globalState);
        }
      `}

  color.a = min(pointOpacityMax, color.a) * pointOpacityScale;
  finalPointSize = (pointSize * pointScale) + pointSizeExtra;
  gl_PointSize = finalPointSize;
}
`,qt=`precision highp float;

varying vec4 color;

void main() {
  gl_FragColor = color;
}
`,Jt=`precision highp float;

uniform sampler2D startStateTex;
uniform sampler2D endStateTex;
uniform float t;

varying vec2 particleTextureIndex;

void main() {
  // Interpolate x, y, and value
  vec3 start = texture2D(startStateTex, particleTextureIndex).xyw;
  vec3 end = texture2D(endStateTex, particleTextureIndex).xyw;
  vec3 curr = start * (1.0 - t) + end * t;

  // The category cannot be interpolated
  float endCategory = texture2D(endStateTex, particleTextureIndex).z;

  gl_FragColor = vec4(curr.xy, endCategory, curr.z);
}`,Yt=`precision highp float;

attribute vec2 position;
varying vec2 particleTextureIndex;

void main() {
  // map normalized device coords to texture coords
  particleTextureIndex = 0.5 * (1.0 + position);

  gl_Position = vec4(position, 0, 1);
}`,Xt=e(ee(),1),Zt=(e,t)=>e?x.reduce((n,r)=>e.hasExtension(r)?n:(t||console.warn(`WebGL: ${r} extension not supported. Scatterplot might not render properly`),!1),!0):!1,Qt=e=>{let t=e.getContext(`webgl`,{antialias:!0,preserveDrawingBuffer:!0}),n=[];for(let e of x)t.getExtension(e)?n.push(e):console.warn(`WebGL: ${e} extension not supported. Scatterplot might not render properly`);return(0,Xt.default)({gl:t,extensions:n})},$t=(e,t,n,r)=>Math.sqrt((e-n)**2+(t-r)**2),en=e=>{let t=1/0,n=-1/0,r=1/0,i=-1/0;for(let a=0;a<e.length;a+=2)t=e[a]<t?e[a]:t,n=e[a]>n?e[a]:n,r=e[a+1]<r?e[a+1]:r,i=e[a+1]>i?e[a+1]:i;return[t,r,n,i]},tn=([e,t,n,r])=>Number.isFinite(e)&&Number.isFinite(t)&&Number.isFinite(n)&&Number.isFinite(r)&&n-e>0&&r-t>0,nn=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,rn=(e,t=!1)=>e.replace(nn,(e,t,n,r)=>`#${t}${t}${n}${n}${r}${r}`).substring(1).match(/.{2}/g).map(e=>Number.parseInt(e,16)/255**t),an=(e,t,{minLength:n=0}={})=>Array.isArray(e)&&e.length>=n&&e.every(t),on=e=>!Number.isNaN(+e)&&+e>=0,sn=e=>!Number.isNaN(+e)&&+e>0,cn=(e,t)=>n=>e.indexOf(n)>=0?n:t,ln=(e,t=!1,n=st)=>new Promise((r,i)=>{let a=new Image;t&&(a.crossOrigin=`anonymous`),a.src=e,a.onload=()=>{r(a)};let o=()=>{i(Error(tt))};a.onerror=o,setTimeout(o,n)}),un=(e,t,n=st)=>new Promise((r,i)=>{ln(t,t.indexOf(window.location.origin)!==0&&t.indexOf(`base64`)===-1,n).then(t=>{r(e.texture(t))}).catch(e=>{i(e)})}),dn=(e,t=!1)=>[...rn(e,t),255**!t],fn=/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i,pn=e=>fn.test(e),R=e=>e>=0&&e<=1,z=e=>Array.isArray(e)&&e.every(R);function mn(e,t,n,r,i,a){return(n-e)*(a-t)-(i-e)*(r-t)}var hn=(e,[t,n]=[])=>{let r=0;for(let i=0,a=e.length-2;i<e.length;i+=2){let o=e[i],s=e[i+1],c=e[a],l=e[a+1];s<=n?l>n&&mn(o,s,c,l,t,n)>0&&r++:l<=n&&mn(o,s,c,l,t,n)<0&&r--,a=i}return r!==0},gn=e=>typeof e==`string`||e instanceof String,_n=e=>Number.isInteger(e)&&e>=0&&e<=255,vn=e=>Array.isArray(e)&&e.every(_n),yn=e=>e.length===3&&(z(e)||vn(e)),B=e=>e.length===4&&(z(e)||vn(e)),bn=e=>Array.isArray(e)&&e.length>0&&(Array.isArray(e[0])||gn(e[0])),xn=(e,t)=>!(Array.isArray(e)&&Array.isArray(t))||e.length!==t.length?!1:e.length===0?!0:Array.isArray(e[0])&&Array.isArray(t[0])?e.every(([e,n,r,i],a)=>{let[o,s,c,l]=t[a];return e===o&&n===s&&r===c&&i===l}):!1,Sn=(e,t)=>e>t?e:t,Cn=(e,t)=>e<t?e:t,V=(e,t)=>{if(B(e)){let n=z(e);return t&&n||!(t||n)?e:t&&!n?e.map(e=>e/255):e.map(e=>e*255)}if(yn(e)){let n=255**!t,r=z(e);return t&&r||!(t||r)?[...e,n]:t&&!r?[...e.map(e=>e/255),n]:[...e.map(e=>e*255),n]}return pn(e)?dn(e,t):(console.warn(`Only HEX, RGB, and RGBA are handled by this function. Returning white instead.`),t?[1,1,1,1]:[255,255,255,255])},H=e=>Object.entries(e).reduce((e,[t,n])=>(e[n]?e[n]=[...e[n],t]:e[n]=t,e),{}),wn=e=>.21*e[0]+.72*e[1]+.07*e[2],Tn=(e,t,n)=>Math.min(n,Math.max(t,e)),En=e=>new Promise((t,n)=>{if(!e||Array.isArray(e))t(e);else{let r=Array.isArray(e.x)||ArrayBuffer.isView(e.x)?e.x.length:0,i=(Array.isArray(e.x)||ArrayBuffer.isView(e.x))&&(t=>e.x[t]),a=(Array.isArray(e.y)||ArrayBuffer.isView(e.y))&&(t=>e.y[t]),o=(Array.isArray(e.line)||ArrayBuffer.isView(e.line))&&(t=>e.line[t]),s=(Array.isArray(e.lineOrder)||ArrayBuffer.isView(e.lineOrder))&&(t=>e.lineOrder[t]),c=Object.keys(e),l=(()=>{let t=c.find(e=>at.has(e));return t&&(Array.isArray(e[t])||ArrayBuffer.isView(e[t]))&&(n=>e[t][n])})(),u=(()=>{let t=c.find(e=>ot.has(e));return t&&(Array.isArray(e[t])||ArrayBuffer.isView(e[t]))&&(n=>e[t][n])})();i&&a&&l&&u&&o&&s?t(e.x.map((e,t)=>[e,a(t),l(t),u(t),o(t),s(t)])):i&&a&&l&&u&&o?t(Array.from({length:r},(e,t)=>[i(t),a(t),l(t),u(t),o(t)])):i&&a&&l&&u?t(Array.from({length:r},(e,t)=>[i(t),a(t),l(t),u(t)])):i&&a&&l?t(Array.from({length:r},(e,t)=>[i(t),a(t),l(t)])):i&&a?t(Array.from({length:r},(e,t)=>[i(t),a(t)])):n(Error(`You need to specify at least x and y`))}}),Dn=e=>Number.isFinite(e.y)&&!(`x`in e),On=e=>Number.isFinite(e.x)&&!(`y`in e),kn=e=>Number.isFinite(e.x)&&Number.isFinite(e.y)&&Number.isFinite(e.width)&&Number.isFinite(e.height),An=e=>Number.isFinite(e.x1)&&Number.isFinite(e.y1)&&Number.isFinite(e.x2)&&Number.isFinite(e.x2),jn=e=>`vertices`in e&&e.vertices.length>1,Mn=e=>{if(!Array.isArray(e)||e.length<3)return!1;for(let t of e)if(!Array.isArray(t)||t.length!==2||typeof t[0]!=`number`||typeof t[1]!=`number`)return!1;return!0},Nn=e=>{let t=[...e],n=e.at(0),r=e.at(-1);return(n[0]!==r[0]||n[1]!==r[1])&&t.push(n),t},Pn=e=>{let t=e.length;for(let n=1;n<t;n++){let t=e[n],r=n-1;for(;r>-1&&t<e[r];)e[r+1]=e[r],r--;e[r+1]=t}return e},Fn=(e={})=>{let{regl:t,canvas:n=document.createElement(`canvas`),gamma:r=1}=e,i=!1;t||=Qt(n);let a=Zt(t),o=[n.width,n.height],s=t.framebuffer({width:o[0],height:o[1],colorFormat:`rgba`,colorType:`float`}),c=t({vert:`
      precision highp float;
      attribute vec2 xy;
      void main () {
        gl_Position = vec4(xy, 0, 1);
      }`,frag:`
      precision highp float;
      uniform vec2 srcRes;
      uniform sampler2D src;
      uniform float gamma;

      vec3 approxLinearToSRGB (vec3 rgb, float gamma) {
        return pow(clamp(rgb, vec3(0), vec3(1)), vec3(1.0 / gamma));
      }

      void main () {
        vec4 color = texture2D(src, gl_FragCoord.xy / srcRes);
        gl_FragColor = vec4(approxLinearToSRGB(color.rgb, gamma), color.a);
      }`,attributes:{xy:[-4,-4,4,-4,0,4]},uniforms:{src:()=>s,srcRes:()=>o,gamma:()=>r},count:3,depth:{enable:!1},blend:{enable:!0,func:{srcRGB:`one`,srcAlpha:`one`,dstRGB:`one minus src alpha`,dstAlpha:`one minus src alpha`}}}),l=e=>{let t=e.getContext(`2d`);t.clearRect(0,0,e.width,e.height),t.drawImage(n,(n.width-e.width)/2,(n.height-e.height)/2,e.width,e.height,0,0,e.width,e.height)},u=(e,n)=>{t.clear(ge),s.use(()=>{t.clear(ge),e()}),c(),l(n)},d=()=>{t.poll()},f=new Set,p=e=>(f.add(e),()=>{f.delete(e)}),m=t.frame(()=>{let e=f.values(),t=e.next();for(;!t.done;)t.value(),t=e.next()}),h=(e,t)=>{let r=e===void 0?Math.min(window.innerWidth,window.screen.availWidth):e,i=t===void 0?Math.min(window.innerHeight,window.screen.availHeight):t;n.width=r*window.devicePixelRatio,n.height=i*window.devicePixelRatio,o[0]=n.width,o[1]=n.height,s.resize(...o)},g=()=>{h()};return e.canvas||(window.addEventListener(`resize`,g),window.addEventListener(`orientationchange`,g),h()),{get canvas(){return n},get regl(){return t},get gamma(){return r},set gamma(e){r=+e},get isSupported(){return a},get isDestroyed(){return i},render:u,resize:h,onFrame:p,refresh:d,destroy:()=>{i=!0,window.removeEventListener(`resize`,g),window.removeEventListener(`orientationchange`,g),m.cancel(),n=void 0,t.destroy(),t=void 0}}},In=function(){let e={},t=(e,t,n,r,i)=>{let a=(r-t)*.5,o=(i-n)*.5;return(2*n-2*r+a+o)*e*e*e+(-3*n+3*r-2*a-o)*e*e+a*e+n},n=(e,n,r)=>{let i=r*e,a=Math.floor(i),o=i-a,s=n[Math.max(0,a-1)],c=n[a],l=n[Math.min(r,a+1)],u=n[Math.min(r,a+2)];return[t(o,s[0],c[0],l[0],u[0]),t(o,s[1],c[1],l[1],u[1])]},r=(e,t,n,r)=>(e-n)**2+(t-r)**2,i=(e,t,n)=>{let r=t[0],i=t[1],a=n[0]-r,o=n[1]-i;if(a!==0||o!==0){let t=((e[0]-r)*a+(e[1]-i)*o)/(a*a+o*o);t>1?(r=n[0],i=n[1]):t>0&&(r+=a*t,i+=o*t)}return a=e[0]-r,o=e[1]-i,a*a+o*o},a=(e,t,n,r,o)=>{let s=r,c;for(let r=t+1;r<n;r++){let a=i(e[r],e[t],e[n]);a>s&&(c=r,s=a)}s>r&&(c-t>1&&a(e,t,c,r,o),o.push(e[c]),n-c>1&&a(e,c,n,r,o))},o=(e,t)=>{let n=e.length-1,r=[e[0]];return a(e,0,n,t,r),r.push(e[n]),r},s=(e,{maxIntPointsPerSegment:t=100,tolerance:i=.002}={})=>{let a=e.length,s=a-1,c=s*t+1,l=i**2,u=[],d;for(let i=0;i<a-1;i++){let a=[e[i].slice(0,2)];d=e[i];for(let o=1;o<t;o++){let u=(i*t+o)/c,f=n(u,e,s);r(d[0],d[1],f[0],f[1])>l&&(a.push(f),d=f)}a.push(e[i+1]),a=o(a,l),u=u.concat(a.slice(0,a.length-1))}return u.push(e[e.length-1].slice(0,2)),u.flat()},c=e=>{let t={},n=!Number.isNaN(+e[0][5]);return e.forEach(e=>{let r=e[4];t[r]||(t[r]=[]),n?t[r][e[5]]=e:t[r].push(e)}),Object.entries(t).forEach(e=>{t[e[0]]=e[1].filter(e=>e),t[e[0]].reference=e[1][0]}),t};self.onmessage=function(t){t.data.points&&+t.data.points.length||self.postMessage({error:Error(`No points provided`)}),e.points=t.data.points;let n=c(t.data.points);self.postMessage({points:Object.entries(n).reduce((e,n)=>(e[n[0]]=s(n[1],t.data.options),e[n[0]].reference=n[1].reference,e),{})})}},Ln=(e,t={tolerance:.002,maxIntPointsPerSegment:100})=>new Promise((n,r)=>{let i=g(In);i.onmessage=e=>{e.data.error?r(e.data.error):n(e.data.points),i.terminate()},i.postMessage({points:e,options:t})}),Rn={showRecticle:{replacement:`showReticle`,removalVersion:`2`,translation:ae},recticleColor:{replacement:`reticleColor`,removalVersion:`2`,translation:ae},keyMap:{replacement:`actionKeyMap`,removalVersion:`2`,translation:H}},zn=e=>{let t=Object.keys(e).filter(e=>Rn[e]);for(let n of t){let{replacement:t,removalVersion:r,translation:i}=Rn[n];console.warn(`regl-scatterplot: the "${n}" property is deprecated and will be removed in v${r}. Please use "${t}" instead.`),e[Rn[n].replacement]=e[n]===ut?e[n]:i(e[n]),delete e[n]}return e},U=(e,t,{allowSegment:n=!1,allowDensity:r=!1,allowInherit:i=!1}={})=>at.has(e)?`valueZ`:ot.has(e)?`valueW`:e===`segment`?n?`segment`:t:e===`density`?r?`density`:t:e===`inherit`&&i?`inherit`:t,Bn=e=>{switch(e){case`valueZ`:return 2;case`valueW`:return 3;default:return null}},W=(e={})=>{let n=ue({async:!e.syncEvents,caseInsensitive:!0}),i=new Float32Array(16),a=new Float32Array(16),o=[0,0];zn(e);let{renderer:s,antiAliasing:c=ct,pixelAligned:l=!1,backgroundColor:d=qe,backgroundImage:f=null,canvas:p=document.createElement(`canvas`),colorBy:m=null,deselectOnDblClick:g=!0,deselectOnEscape:ee=!0,lassoColor:_=De,lassoLineWidth:de=2,lassoMinDelay:fe=10,lassoMinDist:x=3,lassoClearEvent:ge=Oe,lassoInitiator:we=!1,lassoInitiatorParentElement:Te=document.body,lassoLongPressIndicatorParentElement:ke=document.body,lassoOnLongPress:tt=!1,lassoLongPressTime:at=750,lassoLongPressAfterEffectTime:ot=500,lassoLongPressEffectDelay:mt=100,lassoLongPressRevertEffectTime:ht=250,lassoType:gt=lt,lassoBrushSize:_t=24,actionKeyMap:vt=Re,mouseMode:bt=ve,showReticle:xt=!1,reticleColor:St=nt,pointColor:w=We,pointColorActive:T=Ge,pointColorHover:E=Ke,showPointConnections:Ct=!1,pointConnectionColor:D=Je,pointConnectionColorActive:O=Ye,pointConnectionColorHover:k=Xe,pointConnectionColorBy:wt=null,pointConnectionOpacity:A=null,pointConnectionOpacityBy:Tt=null,pointConnectionOpacityActive:Et=He,pointConnectionSize:j=2,pointConnectionSizeActive:Dt=2,pointConnectionSizeBy:Ot=null,pointConnectionMaxIntPointsPerSegment:kt=100,pointConnectionTolerance:At=rt,pointSize:M=6,pointSizeSelected:jt=2,pointSizeMouseDetection:Mt=it,pointOutlineWidth:Nt=2,opacity:N=b,opacityBy:P=null,opacityByDensityFill:Pt=Ue,opacityInactiveMax:Ft=1,opacityInactiveScale:It=1,sizeBy:Lt=null,pointOrder:Rt=null,pointScaleMode:F=Ve,height:I=Be,width:zt=ze,annotationLineColor:Bt=Ze,annotationLineWidth:Vt=1,annotationHVLineLimit:Ht=Qe,cameraIsFixed:Ut=!1}=e,L=zt===`auto`?1:zt,Xt=I===`auto`?1:I,{performanceMode:Zt=!1,opacityByDensityDebounceTime:Qt=25,spatialIndexUseWorker:nn=void 0}=e,rn=!!(e.renderPointsAsSquares||Zt),ln=!!(e.disableAlphaBlending||Zt);bt=cn(C,_e)(bt),s||=Fn({regl:e.regl,gamma:e.gamma}),d=V(d,!0),_=V(_,!0),St=V(St,!0);let dn=!1,fn=!1,pn=wn(d),R,z,mn,_n=!1,vn=null,yn=[0,0],B=-1,H=[],In=new Set,Rn=new Set,W=!1,G=new Set,K=[],q=0,Vn=0,Hn=!1,Un=[],Wn,Gn,Kn=e.aspectRatio||1,qn,Jn,Yn,Xn,Zn,Qn,$n,er,tr,nr,rr,ir,ar=!1,J=!0,or=!1,sr;w=bn(w)?[...w]:[w],T=bn(T)?[...T]:[T],E=bn(E)?[...E]:[E],w=w.map(e=>V(e,!0)),T=T.map(e=>V(e,!0)),E=E.map(e=>V(e,!0)),N=!Array.isArray(N)&&Number.isNaN(+N)?w[0][3]:N,N=an(N,on,{minLength:1})?[...N]:[N],M=an(M,on,{minLength:1})?[...M]:[M];let cr=1/M[0];D===`inherit`?D=[...w]:(D=bn(D)?[...D]:[D],D=D.map(e=>V(e,!0))),O===`inherit`?O=[...T]:(O=bn(O)?[...O]:[O],O=O.map(e=>V(e,!0))),k===`inherit`?k=[...E]:(k=bn(k)?[...k]:[k],k=k.map(e=>V(e,!0))),A=A===`inherit`?[...N]:an(A,on,{minLength:1})?[...A]:[A],j=j===`inherit`?[...M]:an(j,on,{minLength:1})?[...j]:[j],m=U(m,null),P=U(P,null,{allowDensity:!0}),Lt=U(Lt,null),wt=U(wt,null,{allowSegment:!0,allowInherit:!0}),Tt=U(Tt,null,{allowSegment:!0}),Ot=U(Ot,null,{allowSegment:!0});let lr,ur,dr,fr,pr=0,mr=0,hr,gr,_r,vr=null,yr=null,br,xr,Sr,Cr,wr=!1,Tr=null,Er,Dr,Or=xt,kr,Ar=0,jr,Mr=0,Nr=!1,Y=!1,Pr=!1,Fr=!1,Ir=Se,Lr=Se,X,Rr=!1,Z=e.xScale||null,Q=e.yScale||null,zr=0,Br=0,Vr=0,Hr=0;Z&&(zr=Z.domain()[0],Br=Z.domain()[1]-Z.domain()[0],Z.range([0,L])),Q&&(Vr=Q.domain()[0],Hr=Q.domain()[1]-Q.domain()[0],Q.range([Xt,0]));let Ur=e=>-1+e/L*2,Wr=e=>1+e/Xt*-2,Gr=()=>[Ur(o[0]),Wr(o[1])],Kr=(e,t)=>{let n=[e,t,1,1];return le(n,n,re(i,h(i,qn,h(i,R.view,Yn)))),n.slice(0,2)},qr=(e=0)=>{let t=ba(),n=(rr[1]-ir[1])/p.height;return(tr*t+e)*n},Jr=()=>W?K.filter((e,t)=>G.has(t)):K,Yr=(e,t,n,r)=>{let i=Wn.range(e,t,n,r);return W?i.filter(e=>G.has(e)):i},Xr=()=>{let[e,t]=Gr(),[n,r]=Kr(e,t),i=qr(4),a=Yr(n-i,r-i,n+i,r+i),o=i,s=-1;for(let e of a){let[t,i]=K[e],a=$t(t,i,n,r);a<o&&(o=a,s=e)}return s},Zr=(e,t)=>{Un=e,z.setPoints(t),n.publish(`lassoExtend`,{coordinates:e})},Qr=e=>{let t=en(e);if(!tn(t))return[];let n=Yr(...t),r=[];for(let t of n)hn(e,K[t])&&r.push(t);return r},$r=()=>{Un=[],z&&z.clear()},ei=e=>e&&e.length>4,ti=(e,t)=>{if(Qn||!Ct||!ei(K[e[0]]))return;let n=t===0,r=t===1?e=>Rn.add(e):ae,i=Object.keys(e.reduce((e,t)=>{let n=K[t],r=Array.isArray(n[4])?n[4][0]:n[4];return e[r]=!0,e},{})),a=Xn.getData().opacities,o=i.filter(e=>!Rn.has(+e));for(let e of o){let t=Zn[e][0],i=Zn[e][2],o=Zn[e][3],s=t*4+o*2,c=s+i*2+4;a.__original__===void 0&&(a.__original__=a.slice());for(let e=s;e<c;e++)a[e]=n?a.__original__[e]:Et;r(e)}Xn.getBuffer().opacities.subdata(a,0)},ni=e=>[e%pr/pr+mr,Math.floor(e/pr)/pr+mr],ri=e=>W&&!G.has(e),ii=({preventEvent:e=!1}={})=>{ge===`deselect`&&$r(),H.length>0&&(e||n.publish(`deselect`),Rn.clear(),ti(H,0),H=[],In.clear(),J=!0)},ai=e=>{if(!(Z&&Q))return console.warn(`xScale and yScale must be defined for programmatic lasso selection`),null;let t=[];for(let[n,r]of e){let e=(n-zr)/Br,i=(r-Vr)/Hr,a=e*2-1,o=i*2-1,[s,c]=Kr(a,o);t.push(s,c)}return t},oi=(e,{merge:r=!1,remove:i=!1,preventEvent:a=!1}={})=>{let o=Array.isArray(e)?e:[e],s=[...H];if(r){if(H=oe(H,o),s.length===H.length){J=!0;return}}else if(i){let e=new Set(o);if(H=H.filter(t=>!e.has(t)),s.length===H.length){J=!0;return}}else{if(H?.length>0&&ti(H,0),s.length>0&&o.length===0){ii({preventEvent:a});return}H=o}if(t(s,H)){J=!0;return}let c=[];In.clear(),Rn.clear();for(let e=H.length-1;e>=0;e--){let t=H[e];if(t<0||t>=q||ri(t)){H.splice(e,1);continue}In.add(t),c.push.apply(c,ni(t))}gr({usage:`dynamic`,type:`float`,data:c}),ti(H,1),a||n.publish(`select`,{points:H}),J=!0},si=(e,{merge:t=!1,remove:n=!1,isGl:r=!1}={})=>{if(!Mn(e))throw Error(`Lasso selection requires at least 3 vertices as [x, y] coordinate pairs`);let i=Nn(e),a,o;if(r)a=i,o=i.flat();else{if(o=ai(i),!o)throw Error(`xScale and yScale must be defined to convert lasso vertices from data space to GL space`);a=[];for(let e=0;e<o.length;e+=2)a.push([o[e],o[e+1]])}di(a,o,{merge:t,remove:n})},ci=(e,{showReticleOnce:t=!1,preventEvent:r=!1}={})=>{let i=!1;if(!(W&&!G.has(e))&&e>=0&&e<q){i=!0;let t=X,a=e!==X;+t>=0&&a&&!In.has(t)&&ti([t],0),X=e,_r.subdata(ni(e)),In.has(e)||ti([e],2),a&&!r&&n.publish(`pointover`,X)}else i=+X>=0,i&&(In.has(X)||ti([X],0),r||n.publish(`pointout`,X)),X=void 0;i&&(J=!0,or=t)},li=e=>{let t=p.getBoundingClientRect();return o[0]=e.clientX-t.left,o[1]=e.clientY-t.top,[...o]},ui=()=>{R.config({isFixed:!0}),_n=!0,Hn=!0,$r(),B>=0&&(clearTimeout(B),B=-1),n.publish(`lassoStart`)},di=(e,t,{merge:r=!1,remove:i=!1}={})=>{R.config({isFixed:Ut}),Un=[...e];let a=Qr(t);oi(a,{merge:r,remove:i}),n.publish(`lassoEnd`,{coordinates:Un}),ge===`lassoEnd`&&$r()},$=Wt(p,{onStart:ui,onDraw:Zr,onEnd:di,enableInitiator:we,initiatorParentElement:Te,longPressIndicatorParentElement:ke,pointNorm:([e,t])=>Kr(Ur(e),Wr(t)),minDelay:fe,minDist:gt===`brush`?Math.max(3,x):x,type:gt}),fi=()=>bt===S,pi=(e,t)=>{switch(vt[t]){case`alt`:return e.altKey;case`cmd`:return e.metaKey;case Pe:return e.ctrlKey;case Fe:return e.metaKey;case Ie:return e.shiftKey;default:return!1}},mi=e=>document.elementsFromPoint(e.clientX,e.clientY).some(e=>e===p),hi=e=>{!Y||e.buttons!==1||(_n=!0,vn=performance.now(),yn=li(e),Hn=fi()||pi(e,`lasso`),!Hn&&tt&&($.showLongPressIndicator(e.clientX,e.clientY,{time:at,extraTime:ot,delay:mt}),B=setTimeout(()=>{B=-1,Hn=!0},at)))},gi=e=>{Y&&(_n=!1,B>=0&&(clearTimeout(B),B=-1),Hn&&(e.preventDefault(),Hn=!1,$.end({merge:pi(e,je),remove:pi(e,Me)})),tt&&$.hideLongPressIndicator({time:ht}))},_i=e=>{if(!Y||(e.preventDefault(),$t(...li(e),...yn)>=x))return;let t=performance.now()-vn;if(!we||t<500){let t=Xr();t>=0?(H.length>0&&ge===`deselect`&&$r(),oi([t],{merge:pi(e,je),remove:pi(e,Me)})):nr||=setTimeout(()=>{nr=null,$.showInitiator(e)},200)}},vi=e=>{$.hideInitiator(),nr&&=(clearTimeout(nr),null),g&&(e.preventDefault(),ii())},yi=e=>{if(Fr||=(Rr=mi(e),!0),!(Y&&(Rr||_n)))return;let t=$t(...li(e),...yn)>=x;Rr&&!Hn&&ci(Xr()),Hn?(e.preventDefault(),$.extend(e,!0)):_n&&tt&&t&&$.hideLongPressIndicator({time:ht}),B>=0&&t&&(clearTimeout(B),B=-1),_n&&(J=!0)},bi=()=>{X=void 0,Rr=!1,Fr=!1,Y&&(+X>=0&&!In.has(X)&&ti([X],0),gi(),J=!0)},xi=()=>{let e=Math.max(M.length,N.length);Mr=Math.max(2,Math.ceil(Math.sqrt(e)));let t=new Float32Array(Mr**2*4);for(let n=0;n<e;n++){t[n*4]=M[n]||0,t[n*4+1]=Math.min(1,N[n]||0);let e=Number((T[n]||T[0])[3]);t[n*4+2]=Math.min(1,Number.isNaN(e)?1:e);let r=Number((E[n]||E[0])[3]);t[n*4+3]=Math.min(1,Number.isNaN(r)?1:r)}return s.regl.texture({data:t,shape:[Mr,Mr,4],type:`float`})},Si=(e=w,t=T,n=E)=>{let r=e.length,i=t.length,a=n.length,o=[];if(r===i&&i===a)for(let i=0;i<r;i++)o.push(e[i],t[i],n[i],d);else for(let i=0;i<r;i++){let r=[e[i][0],e[i][1],e[i][2],1],a=m===null?t[0]:r,s=m===null?n[0]:r;o.push(e[i],a,s,d)}return o},Ci=()=>{let e=Si(),t=e.length;Ar=Math.max(2,Math.ceil(Math.sqrt(t)));let n=new Float32Array(Ar**2*4);return e.forEach((e,t)=>{n[t*4]=e[0],n[t*4+1]=e[1],n[t*4+2]=e[2],n[t*4+3]=e[3]}),s.regl.texture({data:n,shape:[Ar,Ar,4],type:`float`})},wi=(e,t)=>{Jn[0]=e/Gn,Jn[5]=t},Ti=()=>{Gn=L/Xt,qn=ie([],[1/Gn,1,1]),Jn=ie([],[1/Gn,1,1]),Yn=ie([],[Kn,1,1])},Ei=e=>{+e<=0||(Kn=e)},Di=(e,t)=>n=>{if(!n||n.length===0)return;let r=[...e()],i=bn(n)?n:[n];if(i=i.map(e=>V(e,!0)),!xn(r,i)){kr&&kr.destroy();try{t(i),kr=Ci()}catch{console.error(`Invalid colors. Switching back to default colors.`),t(r),kr=Ci()}}},Oi=Di(()=>w,e=>{w=e}),ki=Di(()=>T,e=>{T=e}),Ai=Di(()=>E,e=>{E=e}),ji=()=>{let e=Kr(-1,-1),t=Kr(1,1),n=(e[0]+1)/2,r=(t[0]+1)/2,i=(e[1]+1)/2,a=(t[1]+1)/2;return[[zr+n*Br,zr+r*Br],[Vr+i*Hr,Vr+a*Hr]]},Mi=()=>{if(!(Z||Q))return;let[e,t]=ji();Z&&Z.domain(e),Q&&Q.domain(t)},Ni=(e,t)=>{Xt=Math.max(1,e),p.height=Math.floor(Xt*window.devicePixelRatio),Q&&(Q.range([Xt,0]),t||Mi())},Pi=e=>{if(e===`auto`){I=e,p.style.height=`100%`,window.requestAnimationFrame(()=>{p&&Ni(p.getBoundingClientRect().height)});return}!+e||+e<=0||(I=+e,Ni(I),p.style.height=`${I}px`)},Fi=()=>{tr=Mt,Mt===`auto`&&(tr=Array.isArray(M)?r(M):M)},Ii=e=>{let n=Array.isArray(M)?[...M]:M;an(e,on,{minLength:1})?M=[...e]:sn(+e)&&(M=[+e]),!(n===M||t(n,M))&&(jr&&jr.destroy(),cr=1/M[0],jr=xi(),Fi())},Li=e=>{!+e||+e<0||(jt=+e)},Ri=e=>{!+e||+e<0||(Nt=+e)},zi=(e,t)=>{L=Math.max(1,e),p.width=Math.floor(L*window.devicePixelRatio),Z&&(Z.range([0,L]),t||Mi())},Bi=e=>{if(e===`auto`){zt=e,p.style.width=`100%`,window.requestAnimationFrame(()=>{p&&zi(p.getBoundingClientRect().width)});return}!+e||+e<=0||(zt=+e,zi(zt),p.style.width=`${L}px`)},Vi=e=>{let n=Array.isArray(N)?[...N]:N;an(e,on,{minLength:1})?N=[...e]:sn(+e)&&(N=[+e]),!(n===N||t(n,N))&&(jr&&jr.destroy(),jr=xi())},Hi=e=>{switch(e){case`valueZ`:return Ir;case`valueW`:return Lr;default:return null}},Ui=(e,t)=>{switch(e){case xe:return e=>Math.round(e*(t.length-1));default:return ae}},Wi=e=>{m=U(e,null)},Gi=e=>{P=U(e,null,{allowDensity:!0})},Ki=e=>{Lt=U(e,null)},qi=e=>{if(e==null)Rt=null;else if(Array.isArray(e))Rt=e;else return;if(Y)if(Ya(),W){let e=[];if(vr!==null)for(let t=0;t<vr.length;t++)G.has(vr[t])&&e.push.apply(e,ni(vr[t]));else{let t=Pn([...G]);for(let n of t)e.push.apply(e,ni(n))}hr.subdata(e)}else hr.subdata(Xa(q))},Ji=e=>{wt=U(e,null,{allowSegment:!0,allowInherit:!0})},Yi=e=>{Tt=U(e,null,{allowSegment:!0})},Xi=e=>{Ot=U(e,null,{allowSegment:!0})},Zi=()=>c,Qi=()=>[p.width,p.height],$i=()=>f,ea=()=>kr,ta=()=>Ar,na=()=>.5/Ar,ra=()=>window.devicePixelRatio,ia=()=>hr,aa=()=>gr,oa=()=>jr,sa=()=>Mr,ca=()=>.5/Mr,la=()=>0,ua=()=>dr||lr,da=()=>pr,fa=()=>.5/pr,pa=()=>Jn,ma=()=>R.view,ha=()=>Yn,ga=()=>h(a,Jn,h(a,R.view,Yn)),_a=()=>window.devicePixelRatio,va=()=>Sn(cr,R.scaling[0])*window.devicePixelRatio,ya=()=>R.scaling[0]>1?Math.asinh(Sn(1,R.scaling[0]))/Math.asinh(1)*window.devicePixelRatio:Sn(cr,R.scaling[0])*window.devicePixelRatio,ba=ya;F===`linear`?ba=va:F===`constant`&&(ba=_a);let xa=()=>W?G.size:q,Sa=()=>H.length,Ca=()=>Sa()>0?Ft:1,wa=()=>Sa()>0?It:1,Ta=()=>+(m===`valueZ`),Ea=()=>+(m===`valueW`),Da=()=>+(P===`valueZ`),Oa=()=>+(P===`valueW`),ka=()=>+(P===`density`),Aa=()=>+(Lt===`valueZ`),ja=()=>+(Lt===`valueW`),Ma=()=>+l,Na=()=>m===`valueZ`?Ir===`continuous`?w.length-1:1:Lr===`continuous`?w.length-1:1,Pa=()=>P===`valueZ`?Ir===`continuous`?N.length-1:1:Lr===`continuous`?N.length-1:1,Fa=()=>Lt===`valueZ`?Ir===`continuous`?M.length-1:1:Lr===`continuous`?M.length-1:1,Ia=e=>{if(P!==`density`)return 1;let t=ba(),n=M[0]*t,r=2/(2/R.view[0])*(2/(2/R.view[5])),i=e.viewportHeight,a=e.viewportWidth,o=Pt*a*i/(Vn*n*n)*Cn(1,r);o*=rn?1:1/(.25*Math.PI);let s=Sn(1,n)+.5;return o*=(n/s)**2,Cn(1,Sn(0,o))},La=s.regl({framebuffer:()=>fr,vert:Yt,frag:Jt,attributes:{position:[-4,0,4,4,4,-4]},uniforms:{startStateTex:()=>ur,endStateTex:()=>lr,t:(e,t)=>t.t},count:3}),Ra=(e,t,n,r=0,i=Ca,a=wa)=>s.regl({frag:rn?qt:Gt,vert:Kt(r),blend:{enable:!ln,func:{srcRGB:`src alpha`,srcAlpha:`one`,dstRGB:`one minus src alpha`,dstAlpha:`one minus src alpha`}},depth:{enable:!1},attributes:{stateIndex:{buffer:n,size:2}},uniforms:{antiAliasing:Zi,resolution:Qi,modelViewProjection:ga,devicePixelRatio:ra,pointScale:()=>ba(),encodingTex:oa,encodingTexRes:sa,encodingTexEps:ca,pointOpacityMax:i,pointOpacityScale:a,pointSizeExtra:e,globalState:r,colorTex:ea,colorTexRes:ta,colorTexEps:na,stateTex:ua,stateTexRes:da,stateTexEps:fa,isColoredByZ:Ta,isColoredByW:Ea,isOpacityByZ:Da,isOpacityByW:Oa,isOpacityByDensity:ka,isSizedByZ:Aa,isSizedByW:ja,isPixelAligned:Ma,colorMultiplicator:Na,opacityMultiplicator:Pa,opacityDensity:Ia,sizeMultiplicator:Fa,numColorStates:4,drawingBufferWidth:e=>e.drawingBufferWidth,drawingBufferHeight:e=>e.drawingBufferHeight},count:t,primitive:`points`}),za=Ra(la,xa,ia),Ba=Ra(la,()=>1,()=>_r,2,()=>1,()=>1),Va=Ra(()=>(jt+Nt*2)*window.devicePixelRatio,Sa,aa,1,()=>1,()=>1),Ha=Ra(()=>(jt+Nt)*window.devicePixelRatio,Sa,aa,3,()=>1,()=>1),Ua=Ra(()=>jt*window.devicePixelRatio,Sa,aa,1,()=>1,()=>1),Wa=()=>{Va(),Ha(),Ua()},Ga=s.regl({frag:y,vert:me,attributes:{position:[0,1,0,0,1,0,0,1,1,1,1,0]},uniforms:{modelViewProjection:ga,texture:$i},count:6}),Ka=s.regl({vert:`
      precision mediump float;
      uniform mat4 modelViewProjection;
      attribute vec2 position;
      void main () {
        gl_Position = modelViewProjection * vec4(position, 0, 1);
      }`,frag:`
      precision mediump float;
      uniform vec4 color;
      void main () {
        gl_FragColor = vec4(color.rgb, 0.2);
      }`,depth:{enable:!1},blend:{enable:!0,func:{srcRGB:`src alpha`,srcAlpha:`one`,dstRGB:`one minus src alpha`,dstAlpha:`one minus src alpha`}},attributes:{position:()=>Un},uniforms:{modelViewProjection:ga,color:()=>_},elements:()=>te(z.getPoints())}),qa=()=>{if(!(X>=0))return;let[e,t]=K[X].slice(0,2),n=[e,t,0,1];h(i,Jn,h(i,R.view,Yn)),le(n,n,i),$n.setPoints([-1,n[1],1,n[1]]),er.setPoints([n[0],1,n[0],-1]),$n.draw(),er.draw(),Ra(()=>(jt+Nt*2)*window.devicePixelRatio,()=>1,_r,1)(),Ra(()=>(jt+Nt)*window.devicePixelRatio,()=>1,_r,3)()},Ja=e=>{let t=new Float32Array(e*2),n=0;for(let r=0;r<e;++r){let e=ni(r);t[n]=e[0],t[n+1]=e[1],n+=2}return t},Ya=()=>{if(Rt===null){vr=null,yr=null;return}let e=new Set,t=[];for(let n=0;n<Rt.length;n++){let r=Rt[n];Number.isFinite(r)&&r>=0&&r<q&&!e.has(r)&&(t.push(r),e.add(r))}for(let n=0;n<q;n++)e.has(n)||t.push(n);vr=t,yr=new Float32Array(t.length*2);let n=0;for(let e=0;e<t.length;e++){let r=ni(t[e]);yr[n]=r[0],yr[n+1]=r[1],n+=2}},Xa=e=>yr===null?Ja(e):yr,Za=(e,t={})=>{let n=e.length;pr=Math.max(2,Math.ceil(Math.sqrt(n))),mr=.5/pr;let r=new Float32Array(pr**2*4),i=!0,a=!0,o=0,c=0,l=0;for(let t=0;t<n;++t)o=t*4,r[o]=e[t][0],r[o+1]=e[t][1],c=e[t][2]||0,l=e[t][3]||0,r[o+2]=c,r[o+3]=l,i&&=Number.isInteger(c),a&&=Number.isInteger(l);return Ir=t.z&&Ce.includes(t.z)?t.z:i?Se:xe,Lr=t.w&&Ce.includes(t.w)?t.w:a?Se:xe,s.regl.texture({data:r,shape:[pr,pr,4],type:`float`})},Qa=(e,t={})=>{if(!lr)return!1;if(wr){let e=ur;ur=dr,e.destroy()}else ur=lr;return dr=Za(e,t),fr=s.regl.framebuffer({color:dr,depth:!1,stencil:!1}),lr=void 0,!0},$a=()=>!!(ur&&dr),eo=()=>{ur&&=(ur.destroy(),void 0),dr&&=(dr.destroy(),void 0)},to=(e,t={})=>new Promise(n=>{Y=!1;let r=t?.preventFilterReset&&e.length===q,i=q;q=e.length,Vn=q,i>0&&q!==i&&(Rt=null,vr=null,yr=null),lr&&lr.destroy(),lr=Za(e,{z:t.zDataType,w:t.wDataType}),r||(Ya(),hr({usage:`static`,type:`float`,data:Xa(q)})),yt(t.spatialIndex||e,{useWorker:nn}).then(t=>{Wn=t,K=e,Y=!0}).then(n)}),no=(e,t)=>{br=R.target,xr=e,Sr=R.distance[0],Cr=t},ro=()=>br!==void 0&&xr!==void 0&&Sr!==void 0&&Cr!==void 0,io=()=>{br=void 0,xr=void 0,Sr=void 0,Cr=void 0},ao=e=>{let t=wt===`inherit`?m:wt;if(t===`segment`){let t=D.length-1;return t<1?[]:e.reduce((e,n,r)=>{let i=0,a=[];for(let e=2;e<n.length;e+=2){let t=Math.sqrt((n[e-2]-n[e])**2+(n[e-1]-n[e+1])**2);a.push(t),i+=t}e[r]=[0];let o=0;for(let s=0;s<n.length/2-1;s++)o+=a[s],e[r].push(Math.floor(o/i*t)*4);return e},[])}if(t){let e=Bn(t),n=Ui(Hi(t),wt===`inherit`?w:D);return Zn.reduce((t,[r,i])=>(t[r]=n(i[e])*4,t),[])}return Array(Zn.length).fill(0)},oo=()=>{let e=Tt===`inherit`?P:Tt;if(e===`segment`){let e=A.length-1;return e<1?[]:Zn.reduce((t,[n,r,i])=>(t[n]=u(i,t=>A[Math.floor(t/(i-1)*e)]),t),[])}if(e){let t=Bn(e),n=Tt===`inherit`?N:A,r=Ui(Hi(e),n);return Zn.reduce((e,[i,a])=>(e[i]=n[r(a[t])],e),[])}},so=()=>{let e=Ot===`inherit`?Lt:Ot;if(e===`segment`){let e=j.length-1;return e<1?[]:Zn.reduce((t,[n,r,i])=>(t[n]=u(i,t=>j[Math.floor(t/(i-1)*e)]),t),[])}if(e){let t=Bn(e),n=Ot===`inherit`?M:j,r=Ui(Hi(e),n);return Zn.reduce((e,[i,a])=>(e[i]=n[r(a[t])],e),[])}},co=e=>{Zn=[];let t=0;Object.keys(e).forEach((n,r)=>{Zn[n]=[r,e[n].reference,e[n].length/2,t],t+=e[n].length/2})},lo=e=>new Promise(t=>{Xn.setPoints([]),e?.length>0?(Qn=!0,Ln(e,{maxIntPointsPerSegment:kt,tolerance:At}).then(e=>{co(e);let n=Object.values(e);Xn.setPoints(n.length===1?n[0]:n,{colorIndices:ao(n),opacities:oo(n),widths:so(n)}),Qn=!1,t()})):t()}),uo=({preventEvent:e=!1}={})=>(W=!1,G.clear(),hr.subdata(Xa(q)),new Promise(t=>{let r=()=>{n.subscribe(`draw`,()=>{e||n.publish(`unfilter`),t()},1),J=!0};Ct||ei(K[0])?lo(Jr()).then(()=>{e||n.publish(`pointConnectionsDraw`),r()}):r()})),fo=(e,{preventEvent:t=!1}={})=>{W=!0,G.clear();let r=Array.isArray(e)?e:[e],i=[],a=[],o=[];for(let e of r)!Number.isFinite(e)||e<0||e>=q||(i.push(e),G.add(e),In.has(e)&&o.push(e));let s;if(vr!==null){s=[];for(let e=0;e<vr.length;e++)G.has(vr[e])&&s.push(vr[e])}else s=Pn([...i]);for(let e of s)a.push.apply(a,ni(e));return hr.subdata(a),oi(o,{preventEvent:t}),G.has(X)||ci(-1,{preventEvent:t}),new Promise(e=>{let r=()=>{n.subscribe(`draw`,()=>{t||n.publish(`filter`,{points:i}),e()},1),J=!0};Ct||ei(K[0])?lo(Jr()).then(()=>{t||n.publish(`pointConnectionsDraw`),oi(o,{preventEvent:t}),r()}):r()})},po=()=>Yr(ir[0],ir[1],rr[0],rr[1]),mo=pe(()=>{Vn=po().length},Qt),ho=e=>{let[t,n]=br,[r,i]=xr,a=1-e,o=t*a+r*e,s=n*a+i*e,c=Sr*a+Cr*e;R.lookAt([o,s],c)},go=()=>$a(),_o=()=>ro(),vo=(e,t)=>{Tr||=performance.now();let n=performance.now()-Tr,r=Tn(t(n/e),0,1);return go()&&La({t:r}),_o()&&ho(r),n<e},yo=()=>{wr=!1,Tr=null,Er=void 0,Dr=void 0,xt=Or,eo(),io(),n.publish(`transitionEnd`)},bo=({duration:e=500,easing:t=be})=>{wr&&n.publish(`transitionEnd`),wr=!0,Tr=null,Er=e,Dr=gn(t)?ye[t]||be:t,Or=xt,xt=!1,n.publish(`transitionStart`)},xo=(e,t={})=>fn?Promise.reject(Error(ft)):dn?Promise.reject(Error(pt)):(dn=!0,En(e).then(e=>new Promise(r=>{if(fn){r();return}let i=!1;(!t.preventFilterReset||e?.length!==q)&&(W=!1,G.clear());let a=e&&ei(e[0])&&(Ct||t.showPointConnectionsOnce),{zDataType:o,wDataType:s}=t;new Promise(c=>{e?(t.transition&&(e.length===q?i=Qa(e,{z:o,w:s}):console.warn(`Cannot transition! The number of points between the previous and current draw call must be identical.`)),to(e,{zDataType:o,wDataType:s,preventFilterReset:t.preventFilterReset,spatialIndex:t.spatialIndex}).then(()=>{t.hover!==void 0&&ci(t.hover,{preventEvent:!0}),t.select!==void 0&&oi(t.select,{preventEvent:!0}),t.filter!==void 0&&fo(t.filter,{preventEvent:!0}),a?lo(e).then(()=>{n.publish(`pointConnectionsDraw`),J=!0,or=t.showReticleOnce}).then(()=>r()):c()})):c()}).then(()=>{t.transition&&i?(a?Promise.all([new Promise(e=>{n.subscribe(`transitionEnd`,()=>{J=!0,or=t.showReticleOnce,e()},1)}),new Promise(e=>{n.subscribe(`pointConnectionsDraw`,e,1)})]).then(()=>r()):n.subscribe(`transitionEnd`,()=>{J=!0,or=t.showReticleOnce,r()},1),bo({duration:t.transitionDuration,easing:t.transitionEasing})):(a?Promise.all([new Promise(e=>{n.subscribe(`draw`,e,1)}),new Promise(e=>{n.subscribe(`pointConnectionsDraw`,e,1)})]).then(()=>r()):n.subscribe(`draw`,()=>r(),1),J=!0,or=t.showReticleOnce)})}).finally(()=>{dn=!1}))),So=e=>fn?Promise.reject(new ft):(Pr=!1,e.length===0?new Promise(e=>{mn.clear(),n.subscribe(`draw`,e,1),Pr=!0,J=!0}):new Promise(t=>{let r=[],i=new Map,a=[],o=[],s=-1,c=e=>{o.push(e.lineWidth||Vt);let t=V(e.lineColor||Bt,!0),n=`[${t.join(`,`)}]`;if(i.has(n)){let{idx:e}=i.get(n);a.push(e)}else{let e=++s;i.set(n,{idx:e,color:t}),a.push(e)}};for(let t of e){if(Dn(t)){r.push([t.x1??-Ht,t.y,t.x2??Ht,t.y]),c(t);continue}if(On(t)){r.push([t.x,t.y1??-Ht,t.x,t.y2??Ht]),c(t);continue}if(An(t)){r.push([t.x1,t.y1,t.x2,t.y1,t.x2,t.y2,t.x1,t.y2,t.x1,t.y1]),c(t);continue}if(kn(t)){r.push([t.x,t.y,t.x+t.width,t.y,t.x+t.width,t.y+t.height,t.x,t.y+t.height,t.x,t.y]),c(t);continue}jn(t)&&(r.push(t.vertices.flatMap(ae)),c(t))}mn.setStyle({color:Array.from(i.values()).sort((e,t)=>e.idx>t.idx?1:-1).map(({color:e})=>e)}),mn.setPoints(r.length===1?r.flat():r,{colorIndices:a,widths:o}),n.subscribe(`draw`,t,1),Pr=!0,J=!0})),Co=e=>(...t)=>{let r=e(...t);return J=!0,new Promise(e=>{n.subscribe(`draw`,()=>e(r),1)})},wo=e=>{let t=1/0,n=-1/0,r=1/0,i=-1/0;for(let a of e){let[e,o]=K[a];t=Math.min(t,e),n=Math.max(n,e),r=Math.min(r,o),i=Math.max(i,o)}return{x:t,y:r,width:n-t,height:i-r}},To=(e,t={})=>new Promise(r=>{let i=le([],[e.x+e.width/2,e.y+e.height/2,0,0],Yn).slice(0,2),a=2*Math.atan(1),o=Gn/Kn,s=e.height*o>=e.width?e.height/2/Math.tan(a/2):e.width/2/Math.tan(a/2)/o;t.transition?(R.config({isFixed:!0}),no(i,s),n.subscribe(`transitionEnd`,()=>{r(),R.config({isFixed:Ut})},1),bo({duration:t.transitionDuration,easing:t.transitionEasing})):(R.lookAt(i,s),n.subscribe(`draw`,r,1),J=!0)}),Eo=(e,t={})=>{if(!Y)return Promise.reject(Error(dt));let n=wo(e),r=n.x+n.width/2,i=n.y+n.height/2,a=qr(),o=1+(t.padding||0),s=Math.max(n.width,a)*o,c=Math.max(n.height,a)*o,l=r-s/2,u=i-c/2;return To({x:l,y:u,width:s,height:c},t)},Do=(e,t,r={})=>new Promise(i=>{r.transition?(R.config({isFixed:!0}),no(e,t),n.subscribe(`transitionEnd`,()=>{i(),R.config({isFixed:Ut})},1),bo({duration:r.transitionDuration,easing:r.transitionEasing})):(R.lookAt(e,t),n.subscribe(`draw`,i,1),J=!0)}),Oo=(e={})=>Do([0,0],1,e),ko=e=>{if(!Y)throw Error(dt);let t=K[e];if(!t)return;let n=[t[0],t[1],0,1];return h(i,qn,h(i,R.view,Yn)),le(n,n,i),[L*(n[0]+1)/2,Xt*(.5-n[1]/2)]},Ao=()=>{Xn.setStyle({color:Si(D,O,k),opacity:A===null?null:A[0],width:j[0]})},jo=()=>{let e=Math.round(pn)>.5?0:255;$.initiator.style.border=`1px dashed rgba(${e}, ${e}, ${e}, 0.33)`,$.initiator.style.background=`rgba(${e}, ${e}, ${e}, 0.1)`},Mo=()=>{let e=Math.round(pn)>.5?0:255;$.longPressIndicator.style.color=`rgb(${e}, ${e}, ${e})`,$.longPressIndicator.dataset.color=`rgb(${e}, ${e}, ${e})`;let t=_.map(e=>Math.round(e*255));$.longPressIndicator.dataset.activeColor=`rgb(${t[0]}, ${t[1]}, ${t[2]})`},No=e=>{e&&(d=V(e,!0),pn=wn(d),jo(),Mo())},Po=e=>{e?gn(e)?un(s.regl,e).then(e=>{f=e,J=!0,n.publish(`backgroundImageReady`)}).catch(()=>{console.error(`Count not create texture from ${e}`),f=null}):f=e._reglType===`texture2d`?e:null:f=null},Fo=e=>{e>0&&R.lookAt(R.target,e,R.rotation)},Io=e=>{e!==null&&R.lookAt(R.target,R.distance[0],e)},Lo=e=>{e&&R.lookAt(e,R.distance[0],R.rotation)},Ro=e=>{e&&R.setView(e)},zo=e=>{Ut=!!e,R.config({isFixed:Ut})},Bo=e=>{if(!e)return;_=V(e,!0),z.setStyle({color:_});let t=_.map(e=>Math.round(e*255));$.longPressIndicator.dataset.activeColor=`rgb(${t[0]}, ${t[1]}, ${t[2]})`},Vo=e=>{Number.isNaN(+e)||+e<1||(de=+e,z.setStyle({width:de}))},Ho=e=>{+e&&(fe=+e,$.set({minDelay:fe}))},Uo=e=>{+e&&(x=+e,$.set({minDist:x}))},Wo=e=>{ge=cn(Ee,ge)(e)},Go=e=>{we=!!e,$.set({enableInitiator:we})},Ko=e=>{Te=e,$.set({initiatorParentElement:Te})},qo=e=>{ke=e,$.set({longPressIndicatorParentElement:ke})},Jo=e=>{tt=!!e},Yo=e=>{at=Number(e)},Xo=e=>{ot=Number(e)},Zo=e=>{mt=Number(e)},Qo=e=>{ht=Number(e)},$o=e=>{e===`brush`?$.set({type:e,minDist:Math.max(3,x)}):$.set({type:e,minDist:x}),gt=$.get(`type`)},es=e=>{_t=Number(e)||_t,$.set({brushSize:_t})},ts=()=>{vt.rotate?R.config({isRotate:!0,mouseDownMoveModKey:vt[Ae]}):R.config({isRotate:!1})},ns=e=>{vt=Object.entries(e).reduce((e,[t,n])=>(Le.includes(n)&&Ne.includes(t)&&(e[t]=n),e),{}),ts()},rs=e=>{bt=cn(C,_e)(e),R.config({defaultMouseDownMoveAction:bt===`rotate`?`rotate`:`pan`})},is=e=>{e!==null&&(xt=e)},as=e=>{e&&(St=V(e,!0),$n.setStyle({color:St}),er.setStyle({color:St}))},os=e=>{e&&(Z=e,zr=e.domain()[0],Br=e?e.domain()[1]-e.domain()[0]:0,Z.range([0,L]),Mi())},ss=e=>{e&&(Q=e,Vr=Q.domain()[0],Hr=Q?Q.domain()[1]-Q.domain()[0]:0,Q.range([Xt,0]),Mi())},cs=e=>{g=!!e},ls=e=>{ee=!!e},us=e=>{Ct=!!e,Ct?Y&&ei(K[0])&&lo(Jr()).then(()=>{n.publish(`pointConnectionsDraw`),J=!0}):lo()},ds=(e,t)=>n=>{e(n===`inherit`?[...t()]:(bn(n)?n:[n]).map(e=>V(e,!0))),Ao()},fs=ds(e=>{D=e},()=>w),ps=ds(e=>{O=e},()=>T),ms=ds(e=>{k=e},()=>E),hs=e=>{an(e,on,{minLength:1})&&(A=[...e]),sn(+e)&&(A=[+e]),D=D.map(e=>(e[3]=Number.isNaN(+A[0])?e[3]:+A[0],e)),Ao()},gs=e=>{!Number.isNaN(+e)&&+e&&(Et=+e)},_s=e=>{an(e,on,{minLength:1})&&(j=[...e]),sn(+e)&&(j=[+e]),Ao()},vs=e=>{!Number.isNaN(+e)&&+e&&(Dt=Math.max(0,e))},ys=e=>{kt=Math.max(0,e)},bs=e=>{At=Math.max(0,e)},xs=e=>{Mt=e,Fi()},Ss=e=>{switch(e){case`linear`:F=e,ba=va;break;case`constant`:F=e,ba=_a;break;default:F=`asinh`,ba=ya;break}},Cs=e=>{Pt=+e},ws=e=>{Ft=+e},Ts=e=>{It=+e},Es=e=>{Bt=V(e)},Ds=e=>{Vt=+e},Os=e=>{Ht=+e},ks=e=>{s.gamma=e},As=e=>{c=Number(e)||.5},js=e=>{l=!!e},Ms=e=>{let[t]=Object.keys(zn({[e]:ut}));if(t===`aspectRatio`)return Kn;if(t===`background`||t===`backgroundColor`)return d;if(t===`backgroundImage`)return f;if(t===`camera`)return R;if(t===`cameraTarget`)return R.target;if(t===`cameraDistance`)return R.distance[0];if(t===`cameraRotation`)return R.rotation;if(t===`cameraView`)return R.view;if(t===`cameraIsFixed`)return Ut;if(t===`canvas`)return p;if(t===`colorBy`)return m;if(t===`sizeBy`)return Lt;if(t===`pointOrder`)return Rt===null?null:[...Rt];if(t===`deselectOnDblClick`)return g;if(t===`deselectOnEscape`)return ee;if(t===`height`)return I;if(t===`lassoColor`)return _;if(t===`lassoLineWidth`)return de;if(t===`lassoMinDelay`)return fe;if(t===`lassoMinDist`)return x;if(t===`lassoClearEvent`)return ge;if(t===`lassoInitiator`)return we;if(t===`lassoInitiatorElement`)return $.initiator;if(t===`lassoInitiatorParentElement`)return Te;if(t===`lassoLongPressIndicatorParentElement`)return ke;if(t===`lassoOnLongPress`)return tt;if(t===`lassoType`)return gt;if(t===`lassoBrushSize`)return _t;if(t===`mouseMode`)return bt;if(t===`opacity`)return N.length===1?N[0]:N;if(t===`opacityBy`)return P;if(t===`opacityByDensityFill`)return Pt;if(t===`opacityByDensityDebounceTime`)return Qt;if(t===`opacityInactiveMax`)return Ft;if(t===`opacityInactiveScale`)return It;if(t===`points`)return K;if(t===`hoveredPoint`)return X;if(t===`selectedPoints`)return[...H];if(t===`filteredPoints`)return W?Array.from(G):Array.from({length:K.length},(e,t)=>t);if(t===`pointsInView`)return po();if(t===`pointColor`)return w.length===1?w[0]:w;if(t===`pointColorActive`)return T.length===1?T[0]:T;if(t===`pointColorHover`)return E.length===1?E[0]:E;if(t===`pointOutlineWidth`)return Nt;if(t===`pointSize`)return M.length===1?M[0]:M;if(t===`pointSizeSelected`)return jt;if(t===`pointSizeMouseDetection`)return Mt;if(t===`showPointConnections`)return Ct;if(t===`pointConnectionColor`)return D.length===1?D[0]:D;if(t===`pointConnectionColorActive`)return O.length===1?O[0]:O;if(t===`pointConnectionColorHover`)return k.length===1?k[0]:k;if(t===`pointConnectionColorBy`)return wt;if(t===`pointConnectionOpacity`)return A.length===1?A[0]:A;if(t===`pointConnectionOpacityBy`)return Tt;if(t===`pointConnectionOpacityActive`)return Et;if(t===`pointConnectionSize`)return j.length===1?j[0]:j;if(t===`pointConnectionSizeActive`)return Dt;if(t===`pointConnectionSizeBy`)return Ot;if(t===`pointConnectionMaxIntPointsPerSegment`)return kt;if(t===`pointConnectionTolerance`)return At;if(t===`pointScaleMode`)return F;if(t===`reticleColor`)return St;if(t===`regl`)return s.regl;if(t===`showReticle`)return xt;if(t===`version`)return v;if(t===`width`)return zt;if(t===`xScale`)return Z;if(t===`yScale`)return Q;if(t===`performanceMode`)return Zt;if(t===`renderPointsAsSquares`)return rn;if(t===`disableAlphaBlending`)return ln;if(t===`gamma`)return s.gamma;if(t===`renderer`)return s;if(t===`isDestroyed`)return fn;if(t===`isDrawing`)return dn;if(t===`isPointsDrawn`)return Y;if(t===`isPointsFiltered`)return W;if(t===`isAnnotationsDrawn`)return Pr;if(t===`zDataType`)return Ir;if(t===`wDataType`)return Lr;if(t===`spatialIndex`)return Wn?.data;if(t===`annotationLineColor`)return Bt;if(t===`annotationLineWidth`)return Vt;if(t===`annotationHVLineLimit`)return Ht;if(t===`antiAliasing`)return c;if(t===`pixelAligned`)return l;if(t===`actionKeyMap`)return{...vt}},Ns=(e={})=>fn?Promise.reject(Error(ft)):(zn(e),(e.backgroundColor!==void 0||e.background!==void 0)&&No(e.backgroundColor||e.background),e.backgroundImage!==void 0&&Po(e.backgroundImage),e.cameraTarget!==void 0&&Lo(e.cameraTarget),e.cameraDistance!==void 0&&Fo(e.cameraDistance),e.cameraRotation!==void 0&&Io(e.cameraRotation),e.cameraView!==void 0&&Ro(e.cameraView),e.cameraIsFixed!==void 0&&zo(e.cameraIsFixed),e.colorBy!==void 0&&Wi(e.colorBy),e.pointColor!==void 0&&Oi(e.pointColor),e.pointColorActive!==void 0&&ki(e.pointColorActive),e.pointColorHover!==void 0&&Ai(e.pointColorHover),e.pointSize!==void 0&&Ii(e.pointSize),e.pointSizeSelected!==void 0&&Li(e.pointSizeSelected),e.pointSizeMouseDetection!==void 0&&xs(e.pointSizeMouseDetection),e.sizeBy!==void 0&&Ki(e.sizeBy),e.pointOrder!==void 0&&qi(e.pointOrder),e.opacity!==void 0&&Vi(e.opacity),e.showPointConnections!==void 0&&us(e.showPointConnections),e.pointConnectionColor!==void 0&&fs(e.pointConnectionColor),e.pointConnectionColorActive!==void 0&&ps(e.pointConnectionColorActive),e.pointConnectionColorHover!==void 0&&ms(e.pointConnectionColorHover),e.pointConnectionColorBy!==void 0&&Ji(e.pointConnectionColorBy),e.pointConnectionOpacityBy!==void 0&&Yi(e.pointConnectionOpacityBy),e.pointConnectionOpacity!==void 0&&hs(e.pointConnectionOpacity),e.pointConnectionOpacityActive!==void 0&&gs(e.pointConnectionOpacityActive),e.pointConnectionSize!==void 0&&_s(e.pointConnectionSize),e.pointConnectionSizeActive!==void 0&&vs(e.pointConnectionSizeActive),e.pointConnectionSizeBy!==void 0&&Xi(e.pointConnectionSizeBy),e.pointConnectionMaxIntPointsPerSegment!==void 0&&ys(e.pointConnectionMaxIntPointsPerSegment),e.pointConnectionTolerance!==void 0&&bs(e.pointConnectionTolerance),e.pointScaleMode!==void 0&&Ss(e.pointScaleMode),e.opacityBy!==void 0&&Gi(e.opacityBy),e.lassoColor!==void 0&&Bo(e.lassoColor),e.lassoLineWidth!==void 0&&Vo(e.lassoLineWidth),e.lassoMinDelay!==void 0&&Ho(e.lassoMinDelay),e.lassoMinDist!==void 0&&Uo(e.lassoMinDist),e.lassoClearEvent!==void 0&&Wo(e.lassoClearEvent),e.lassoInitiator!==void 0&&Go(e.lassoInitiator),e.lassoInitiatorParentElement!==void 0&&Ko(e.lassoInitiatorParentElement),e.lassoLongPressIndicatorParentElement!==void 0&&qo(e.lassoLongPressIndicatorParentElement),e.lassoOnLongPress!==void 0&&Jo(e.lassoOnLongPress),e.lassoLongPressTime!==void 0&&Yo(e.lassoLongPressTime),e.lassoLongPressAfterEffectTime!==void 0&&Xo(e.lassoLongPressAfterEffectTime),e.lassoLongPressEffectDelay!==void 0&&Zo(e.lassoLongPressEffectDelay),e.lassoLongPressRevertEffectTime!==void 0&&Qo(e.lassoLongPressRevertEffectTime),e.lassoType!==void 0&&$o(e.lassoType),e.lassoBrushSize!==void 0&&es(e.lassoBrushSize),e.actionKeyMap!==void 0&&ns(e.actionKeyMap),e.mouseMode!==void 0&&rs(e.mouseMode),e.showReticle!==void 0&&is(e.showReticle),e.reticleColor!==void 0&&as(e.reticleColor),e.pointOutlineWidth!==void 0&&Ri(e.pointOutlineWidth),e.height!==void 0&&Pi(e.height),e.width!==void 0&&Bi(e.width),e.aspectRatio!==void 0&&Ei(e.aspectRatio),e.xScale!==void 0&&os(e.xScale),e.yScale!==void 0&&ss(e.yScale),e.deselectOnDblClick!==void 0&&cs(e.deselectOnDblClick),e.deselectOnEscape!==void 0&&ls(e.deselectOnEscape),e.opacityByDensityFill!==void 0&&Cs(e.opacityByDensityFill),e.opacityInactiveMax!==void 0&&ws(e.opacityInactiveMax),e.opacityInactiveScale!==void 0&&Ts(e.opacityInactiveScale),e.gamma!==void 0&&ks(e.gamma),e.annotationLineColor!==void 0&&Es(e.annotationLineColor),e.annotationLineWidth!==void 0&&Ds(e.annotationLineWidth),e.annotationHVLineLimit!==void 0&&Os(e.annotationHVLineLimit),e.antiAliasing!==void 0&&As(e.antiAliasing),e.pixelAligned!==void 0&&js(e.pixelAligned),new Promise(e=>{window.requestAnimationFrame(()=>{fn||!p||(Ti(),R.refresh(),s.refresh(),Xs(),e())})})),Ps=(e,{preventEvent:t=!1}={})=>{Ro(e),J=!0,ar=t},Fs=()=>{R||=ne(p,{isFixed:Ut,isPanInverted:[!1,!0],defaultMouseDownMoveAction:bt===`rotate`?`rotate`:`pan`}),e.cameraView?R.setView(ce(e.cameraView)):e.cameraTarget||e.cameraDistance||e.cameraRotation?R.lookAt([...e.cameraTarget||$e],e.cameraDistance||1,e.cameraRotation||0):R.setView(ce(et)),rr=Kr(1,1),ir=Kr(-1,-1)},Is=({preventEvent:e=!1}={})=>{Fs(),Mi(),!e&&n.publish(`view`,{view:R.view,camera:R,xScale:Z,yScale:Q})},Ls=({key:e})=>{switch(e){case`Escape`:ee&&ii();break;default:}},Rs=()=>{Rr=!0,Fr=!0},zs=()=>{ci(),Rr=!1,Fr=!0,J=!0},Bs=()=>{J=!0},Vs=()=>{to([]),Xn.clear()},Hs=()=>{Xn.clear()},Us=()=>{So([])},Ws=()=>{Vs(),Us()},Gs=()=>{let e=zt===b,t=I===b;if(e||t){let{width:n,height:r}=p.getBoundingClientRect();e&&zi(n,!0),t&&Ni(r,!0),Ti(),Mi(),J=!0}R.refresh()},Ks=async e=>{p.style.userSelect=`none`;let t=window.devicePixelRatio,r=M,i=zt,a=I,o=s.canvas.width/t,u=s.canvas.height/t,d=l,f=c,m=e?.scale||1,h=Array.isArray(M)?M.map(e=>e*m):M*m,g=L*m,ee=Xt*m;Ii(h),Bi(g),Pi(ee),js(e?.pixelAligned||l),As(e?.antiAliasing||c),s.resize(zt,I),s.refresh(),await new Promise(e=>{n.subscribe(`draw`,e,1),Xs()});let te=p.getContext(`2d`).getImageData(0,0,p.width,p.height);return s.resize(o,u),s.refresh(),Ii(r),Bi(i),Pi(a),js(d),As(f),await new Promise(e=>{n.subscribe(`draw`,e,1),Xs()}),p.style.userSelect=null,te},qs=e=>e===void 0?p.getContext(`2d`).getImageData(0,0,p.width,p.height):Ks(e),Js=()=>{Ti(),Fs(),Mi(),z=se(s.regl,{color:_,width:de,is2d:!0}),Xn=se(s.regl,{color:Si(D,O,k),opacity:A===null?null:A[0],width:j[0],widthActive:Dt,is2d:!0}),$n=se(s.regl,{color:St,width:1,is2d:!0}),er=se(s.regl,{color:St,width:1,is2d:!0}),mn=se(s.regl,{color:Bt,width:Vt,is2d:!0}),Fi(),p.addEventListener(`wheel`,Bs),hr=s.regl.buffer(),gr=s.regl.buffer(),_r=s.regl.buffer({usage:`dynamic`,type:`float`,length:he*2}),kr=Ci(),jr=xi();let e=Ns({backgroundImage:f,width:zt,height:I,actionKeyMap:vt});jo(),Mo(),window.addEventListener(`keyup`,Ls,!1),window.addEventListener(`blur`,bi,!1),window.addEventListener(`mouseup`,gi,!1),window.addEventListener(`mousemove`,yi,!1),p.addEventListener(`mousedown`,hi,!1),p.addEventListener(`mouseenter`,Rs,!1),p.addEventListener(`mouseleave`,zs,!1),p.addEventListener(`click`,_i,!1),p.addEventListener(`dblclick`,vi,!1),`ResizeObserver`in window?(sr=new ResizeObserver(Gs),sr.observe(p)):(window.addEventListener(`resize`,Gs),window.addEventListener(`orientationchange`,Gs)),e.then(()=>{n.publish(`init`)})},Ys=s.onFrame(()=>{if(Nr=R.tick(),!((Y||Pr)&&(J||wr)))return;wr&&!vo(Er,Dr)&&yo(),Nr&&(rr=Kr(1,1),ir=Kr(-1,-1),P===`density`&&mo()),s.render(()=>{let e=p.width/s.canvas.width,t=p.height/s.canvas.height;wi(e,t),f?._reglType&&Ga(),Un.length>2&&Ka(),wr||Xn.draw({projection:pa(),model:ha(),view:ma()});let n=xa();Y&&n>0&&za(),!_n&&(xt||or)&&qa(),X>=0&&Ba(),H.length>0&&Wa(),mn.draw({projection:pa(),model:ha(),view:ma()}),z.draw({projection:pa(),model:ha(),view:ma()})},p);let e={view:R.view,isViewChanged:Nr,camera:R,xScale:Z,yScale:Q};Nr&&(Mi(),ar?ar=!1:n.publish(`view`,e)),J=!1,or=!1,n.publish(`drawing`,e,{async:!1}),n.publish(`draw`,e)}),Xs=()=>{J=!0};return Js(),{get isSupported(){return s.isSupported},clear:Co(Ws),clearPoints:Co(Vs),clearPointConnections:Co(Hs),clearAnnotations:Co(Us),createTextureFromUrl:(e,t=st)=>un(s.regl,e,t),deselect:ii,destroy:()=>{Y=!1,Pr=!1,fn=!0,Ys(),window.removeEventListener(`keyup`,Ls,!1),window.removeEventListener(`blur`,bi,!1),window.removeEventListener(`mouseup`,gi,!1),window.removeEventListener(`mousemove`,yi,!1),p.removeEventListener(`mousedown`,hi,!1),p.removeEventListener(`mouseenter`,Rs,!1),p.removeEventListener(`mouseleave`,zs,!1),p.removeEventListener(`click`,_i,!1),p.removeEventListener(`dblclick`,vi,!1),p.removeEventListener(`wheel`,Bs,!1),sr?sr.disconnect():(window.removeEventListener(`resize`,Gs),window.removeEventListener(`orientationchange`,Gs)),p=void 0,R.dispose(),R=void 0,z.destroy(),$.destroy(),Xn.destroy(),$n.destroy(),er.destroy(),kr&&kr.destroy(),jr&&jr.destroy(),e.renderer||s.isDestroyed||s.destroy(),n.publish(`destroy`),n.clear()},draw:xo,drawAnnotations:So,filter:fo,get:Ms,getScreenPosition:ko,hover:ci,lassoSelect:si,redraw:Xs,refresh:s.refresh,reset:Co(Is),select:oi,set:Ns,export:qs,subscribe:n.subscribe,unfilter:uo,unsubscribe:n.unsubscribe,view:Ps,zoomToLocation:Do,zoomToArea:To,zoomToPoints:Eo,zoomToOrigin:Oo}};export{Fn as n,W as t};