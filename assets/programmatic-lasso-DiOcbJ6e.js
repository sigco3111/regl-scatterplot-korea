import{t as e}from"./src-CrqSMTeB.js";import{a as t,i as n,n as r,o as i}from"./d3-DBDaeblq.js";import{n as a,t as o}from"./menu-P8s-COKn.js";var s=document.querySelector(`#parent-wrapper`),c=document.querySelector(`#canvas-wrapper`),l=document.querySelector(`#canvas`),u=document.createElement(`div`);u.style.cssText=`
  position: absolute;
  top: 10px;
  left: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  max-width: 400px;
  max-height: calc(100vh - 20px);
  overflow-y: auto;
  z-index: 1000;
`,s.appendChild(u);var d=[0,100],f=[0,100],p=n().domain(d),m=n().domain(f),h=t(p),g=i(m),_=r(s).append(`svg`),v=_.append(`g`),y=_.append(`g`),b=20,x=40;_.node().style.position=`absolute`,_.node().style.top=0,_.node().style.left=0,_.node().style.width=`100%`,_.node().style.height=`100%`,_.node().style.pointerEvents=`none`,c.style.right=`${x}px`,c.style.bottom=`${b}px`;var{width:S,height:C}=c.getBoundingClientRect();v.attr(`transform`,`translate(0, ${C})`).call(h),y.attr(`transform`,`translate(${S}, 0)`).call(g),h.tickSizeInner(-C),g.tickSizeInner(-S);var w=[],T=5e3,E=4,D=.66,O=({points:e})=>{console.log(`Selected:`,e.length,`points`)},k=()=>{console.log(`Deselected`)},A=e({canvas:l,pointSize:E,opacity:D,xScale:p,yScale:m,showReticle:!0,lassoInitiator:!0,pointColor:[.33,.5,1,1],pointColorActive:[1,.5,0,1]});a(A),console.log(`Scatterplot v${A.get(`version`)}`),A.subscribe(`select`,O),A.subscribe(`deselect`,k),A.subscribe(`view`,e=>{v.call(h.scale(e.xScale)),y.call(g.scale(e.yScale))}),A.subscribe(`init`,()=>{v.call(h.scale(A.get(`xScale`))),y.call(g.scale(A.get(`yScale`)))},1);var j=()=>{({width:S,height:C}=c.getBoundingClientRect()),v.attr(`transform`,`translate(0, ${C})`).call(h),y.attr(`transform`,`translate(${S}, 0)`).call(g),h.tickSizeInner(-C),g.tickSizeInner(-S)};window.addEventListener(`resize`,j),window.addEventListener(`orientationchange`,j);var M=e=>{let t=[];for(let n=0;n<e;n++){let e=Math.random()*100,n=Math.random()*100,r=e/100*2-1,i=n/100*2-1;t.push([r,i,Math.round(Math.random()*4),Math.random(),e,n])}return t},N=e=>{w=M(e),A.draw(w)};o({scatterplot:A,setNumPoints:N}),A.set({colorBy:`category`,pointColor:[`#3a84cc`,`#56bf92`,`#eecb62`,`#c76526`,`#d192b7`]});var P=(e,t,n=!1)=>{let r=document.createElement(`button`);return r.textContent=e,r.style.cssText=`
    padding: 6px 10px;
    background: #3a84cc;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 11px;
    white-space: nowrap;
    text-align: center;
    ${n?`grid-column: 1 / -1;`:``}
  `,r.addEventListener(`mouseenter`,()=>{r.style.background=`#2a6cb0`}),r.addEventListener(`mouseleave`,()=>{r.style.background=`#3a84cc`}),r.addEventListener(`click`,t),r};u.appendChild(P(`△ Bottom-Left`,()=>{A.lassoSelect([[10,10],[40,10],[10,40]])})),u.appendChild(P(`○ Top-Right`,()=>{let e=[];for(let t=0;t<16;t++){let n=t/16*Math.PI*2;e.push([75+Math.cos(n)*20,75+Math.sin(n)*20])}A.lassoSelect(e)})),u.appendChild(P(`▭ Center`,()=>{A.lassoSelect([[30,30],[70,30],[70,70],[30,70]])})),u.appendChild(P(`+ Diagonal (Merge)`,()=>{A.lassoSelect([[0,40],[60,100],[70,100],[10,40]],{merge:!0})})),u.appendChild(P(`− Center (Remove)`,()=>{A.lassoSelect([[40,40],[60,40],[60,60],[40,60]],{remove:!0})})),u.appendChild(P(`★ Star`,()=>{let e=[];for(let t=0;t<10;t++){let n=t/10*Math.PI*2-Math.PI/2,r=t%2==0?30:15;e.push([50+Math.cos(n)*r,50+Math.sin(n)*r])}A.lassoSelect(e)})),u.appendChild(P(`✕ Deselect All`,()=>{A.deselect()},!0)),N(T);