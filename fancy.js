/**
 * FingerprintJS v3.0.0 - Copyright (c) FingerprintJS, Inc, 2020 (https://fingerprintjs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * This software contains code from open-source projects:
 * MurmurHash3 by Karan Lyons (https://github.com/karanlyons/murmurHash3.js)
 */

// fingerprintjs

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

async function onFingerprintJSLoad(fpAgent) {
    // The FingerprintJS agent is ready. Get a visitor identifier when you'd like to.
    var x = fpAgent.get().then(result => {
        // This is the visitor identifier:
        const visitorId = result;
        // console.log(visitorId);
        // console.log("here")
        // type_saved.value = type;
        if (localStorage.getItem("VisitorID") == null) {
            console.log("here")
            console.log(getCookie("VisitorID"))
          if (getCookie("VisitorID") == null){
                var currentDate = new Date().toLocaleDateString("en-GB", {year: "numeric",month: "numeric",day: "numeric",
                  timeZone: "Asia/Singapore",hour: "numeric",minute: "numeric",});
                localStorage.setItem(
                  "VisitorID",
                  currentDate + " || " + visitorId["visitorId"]
                );
                setCookie("VisitorID",currentDate + " || " + visitorId["visitorId"],365);
              }
          else{
          localStorage.setItem(
            "VisitorID",
            getCookie("VisitorID")
          );}
        }
        visitorId["visitorId"] = localStorage.getItem("VisitorID");
        setCookie("VisitorID",visitorId["visitorId"],365);
        
        let x = postGASData('https://script.google.com/macros/s/AKfycbwV13iBM9thqz7G5cvMvzOqCvgztvK6Tx2frmAvsAULbpRgIgY4mS0VCQ/exec', {
            "m": visitorId["components"],
            "uuid": visitorId["visitorId"],
            "url": window.location.href
        })
        return x;
        // console.log("here")
        // privacy badger blocks, one idea is to use a github url then follow redirect (will it work?)
    });
    return x;
    
}
// Example POST method implementation:

async function postGASData(url = '', data = {}) {
    // Default options are marked with *
    const response = fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        // redirect: 'follow', // manual, *follow, error
        // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    // No cors, opaque response
    console.log("Pinged");
    return response;
    // return response.json(); // parses JSON response into native JavaScript objects
}

var FingerprintJS=function(t){"use strict";function e(t,e){t=[t[0]>>>16,65535&t[0],t[1]>>>16,65535&t[1]],e=[e[0]>>>16,65535&e[0],e[1]>>>16,65535&e[1]];var n=[0,0,0,0];return n[3]+=t[3]+e[3],n[2]+=n[3]>>>16,n[3]&=65535,n[2]+=t[2]+e[2],n[1]+=n[2]>>>16,n[2]&=65535,n[1]+=t[1]+e[1],n[0]+=n[1]>>>16,n[1]&=65535,n[0]+=t[0]+e[0],n[0]&=65535,[n[0]<<16|n[1],n[2]<<16|n[3]]}function n(t,e){t=[t[0]>>>16,65535&t[0],t[1]>>>16,65535&t[1]],e=[e[0]>>>16,65535&e[0],e[1]>>>16,65535&e[1]];var n=[0,0,0,0];return n[3]+=t[3]*e[3],n[2]+=n[3]>>>16,n[3]&=65535,n[2]+=t[2]*e[3],n[1]+=n[2]>>>16,n[2]&=65535,n[2]+=t[3]*e[2],n[1]+=n[2]>>>16,n[2]&=65535,n[1]+=t[1]*e[3],n[0]+=n[1]>>>16,n[1]&=65535,n[1]+=t[2]*e[2],n[0]+=n[1]>>>16,n[1]&=65535,n[1]+=t[3]*e[1],n[0]+=n[1]>>>16,n[1]&=65535,n[0]+=t[0]*e[3]+t[1]*e[2]+t[2]*e[1]+t[3]*e[0],n[0]&=65535,[n[0]<<16|n[1],n[2]<<16|n[3]]}function o(t,e){return 32===(e%=64)?[t[1],t[0]]:e<32?[t[0]<<e|t[1]>>>32-e,t[1]<<e|t[0]>>>32-e]:(e-=32,[t[1]<<e|t[0]>>>32-e,t[0]<<e|t[1]>>>32-e])}function r(t,e){return 0===(e%=64)?t:e<32?[t[0]<<e|t[1]>>>32-e,t[1]<<e]:[t[1]<<e-32,0]}function i(t,e){return[t[0]^e[0],t[1]^e[1]]}function a(t){return t=i(t,[0,t[0]>>>1]),t=i(t=n(t,[4283543511,3981806797]),[0,t[0]>>>1]),t=i(t=n(t,[3301882366,444984403]),[0,t[0]>>>1])}function c(t,c){c=c||0;for(var s=(t=t||"").length%16,u=t.length-s,l=[0,c],d=[0,c],f=[0,0],h=[0,0],g=[2277735313,289559509],m=[1291169091,658871167],p=0;p<u;p+=16)f=[255&t.charCodeAt(p+4)|(255&t.charCodeAt(p+5))<<8|(255&t.charCodeAt(p+6))<<16|(255&t.charCodeAt(p+7))<<24,255&t.charCodeAt(p)|(255&t.charCodeAt(p+1))<<8|(255&t.charCodeAt(p+2))<<16|(255&t.charCodeAt(p+3))<<24],h=[255&t.charCodeAt(p+12)|(255&t.charCodeAt(p+13))<<8|(255&t.charCodeAt(p+14))<<16|(255&t.charCodeAt(p+15))<<24,255&t.charCodeAt(p+8)|(255&t.charCodeAt(p+9))<<8|(255&t.charCodeAt(p+10))<<16|(255&t.charCodeAt(p+11))<<24],f=o(f=n(f,g),31),l=e(l=o(l=i(l,f=n(f,m)),27),d),l=e(n(l,[0,5]),[0,1390208809]),h=o(h=n(h,m),33),d=e(d=o(d=i(d,h=n(h,g)),31),l),d=e(n(d,[0,5]),[0,944331445]);switch(f=[0,0],h=[0,0],s){case 15:h=i(h,r([0,t.charCodeAt(p+14)],48));case 14:h=i(h,r([0,t.charCodeAt(p+13)],40));case 13:h=i(h,r([0,t.charCodeAt(p+12)],32));case 12:h=i(h,r([0,t.charCodeAt(p+11)],24));case 11:h=i(h,r([0,t.charCodeAt(p+10)],16));case 10:h=i(h,r([0,t.charCodeAt(p+9)],8));case 9:h=n(h=i(h,[0,t.charCodeAt(p+8)]),m),d=i(d,h=n(h=o(h,33),g));case 8:f=i(f,r([0,t.charCodeAt(p+7)],56));case 7:f=i(f,r([0,t.charCodeAt(p+6)],48));case 6:f=i(f,r([0,t.charCodeAt(p+5)],40));case 5:f=i(f,r([0,t.charCodeAt(p+4)],32));case 4:f=i(f,r([0,t.charCodeAt(p+3)],24));case 3:f=i(f,r([0,t.charCodeAt(p+2)],16));case 2:f=i(f,r([0,t.charCodeAt(p+1)],8));case 1:f=n(f=i(f,[0,t.charCodeAt(p)]),g),l=i(l,f=n(f=o(f,31),m))}return l=e(l=i(l,[0,t.length]),d=i(d,[0,t.length])),d=e(d,l),l=e(l=a(l),d=a(d)),d=e(d,l),("00000000"+(l[0]>>>0).toString(16)).slice(-8)+("00000000"+(l[1]>>>0).toString(16)).slice(-8)+("00000000"+(d[0]>>>0).toString(16)).slice(-8)+("00000000"+(d[1]>>>0).toString(16)).slice(-8)}function s(t,e,n,o){return new(n||(n=Promise))((function(r,i){function a(t){try{s(o.next(t))}catch(e){i(e)}}function c(t){try{s(o.throw(t))}catch(e){i(e)}}function s(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,c)}s((o=o.apply(t,e||[])).next())}))}function u(t){return"number"==typeof t?0|t:parseInt(t)}function l(t){return t.reduce(((t,e)=>t+(e?1:0)),0)}const d=navigator,f=window;const h=document,g=["monospace","sans-serif","serif"],m=["sans-serif-thin","ARNO PRO","Agency FB","Arabic Typesetting","Arial Unicode MS","AvantGarde Bk BT","BankGothic Md BT","Batang","Bitstream Vera Sans Mono","Calibri","Century","Century Gothic","Clarendon","EUROSTILE","Franklin Gothic","Futura Bk BT","Futura Md BT","GOTHAM","Gill Sans","HELV","Haettenschweiler","Helvetica Neue","Humanst521 BT","Leelawadee","Letter Gothic","Levenim MT","Lucida Bright","Lucida Sans","Menlo","MS Mincho","MS Outlook","MS Reference Specialty","MS UI Gothic","MT Extra","MYRIAD PRO","Marlett","Meiryo UI","Microsoft Uighur","Minion Pro","Monotype Corsiva","PMingLiU","Pristina","SCRIPTINA","Segoe UI Light","Serifa","SimHei","Small Fonts","Staccato222 BT","TRAJAN PRO","Univers CE 55 Medium","Vrinda","ZWAdobeF"],p={fontStyle:"normal",fontWeight:"normal",letterSpacing:"normal",lineBreak:"auto",lineHeight:"normal",textTransform:"none",textAlign:"left",textDecoration:"none",textShadow:"none",whiteSpace:"normal",wordBreak:"normal",wordSpacing:"normal"};function v(t){return t.toDataURL()}const y=navigator,C=window;const S=window,w=navigator,A=document;function b(){return l(["msWriteProfilerMark"in S,"msLaunchUri"in w,"msSaveBlob"in w])>=2}function M(){return l(["userActivation"in w,"mediaSession"in w,0===w.vendor.indexOf("Google"),"BackgroundFetchManager"in S,"BatteryManager"in S,"webkitMediaStream"in S,"webkitSpeechGrammar"in S])>=5}const T=navigator;const k=window;const O=window;const P=window;const x=document;const I={osCpu:function(){return navigator.oscpu},languages:function(){const t=[],e=T.language||T.userLanguage||T.browserLanguage||T.systemLanguage;if(void 0!==e&&t.push([e]),Array.isArray(T.languages))M()&&l([!("MediaSettingsRange"in S),!("PhotoCapabilities"in S),"RTCEncodedAudioFrame"in S,""+S.Intl=="[object Intl]"])>=2||t.push(T.languages);else if("string"==typeof T.languages){const e=T.languages;e&&t.push(e.split(","))}return t},colorDepth:function(){return window.screen.colorDepth},deviceMemory:function(){return navigator.deviceMemory},screenResolution:function(){const t=[u(k.screen.width),u(k.screen.height)];return t.sort().reverse(),t},availableScreenResolution:function(){if(O.screen.availWidth&&O.screen.availHeight){const t=[u(O.screen.availWidth),u(O.screen.availHeight)];return t.sort().reverse(),t}},hardwareConcurrency:function(){try{const t=u(navigator.hardwareConcurrency);return isNaN(t)?1:t}catch(t){return 1}},timezoneOffset:function(){return(new Date).getTimezoneOffset()},timezone:function(){var t;if(null===(t=P.Intl)||void 0===t?void 0:t.DateTimeFormat)return(new P.Intl.DateTimeFormat).resolvedOptions().timeZone},sessionStorage:function(){try{return!!window.sessionStorage}catch(t){return!0}},localStorage:function(){try{return!!window.localStorage}catch(t){return!0}},indexedDB:function(){if(!b())try{return!!window.indexedDB}catch(t){return!0}},openDatabase:function(){return!!window.openDatabase},cpuClass:function(){return navigator.cpuClass},platform:function(){return navigator.platform},plugins:function(){if(!navigator.plugins)return;const t=[];for(let e=0;e<navigator.plugins.length;++e){const n=navigator.plugins[e];if(!n)continue;const o=[];for(const t of n)o.push({type:t.type,suffixes:t.suffixes});t.push({name:n.name,description:n.description,mimeTypes:o})}return t},canvas:function(){const[t,e]=function(){const t=document.createElement("canvas");return t.width=240,t.height=140,t.style.display="inline",[t,t.getContext("2d")]}();if(!function(t,e){return!(!e||!t.toDataURL)}(t,e))return{winding:!1,data:""};e.rect(0,0,10,10),e.rect(2,2,6,6);const n=!e.isPointInPath(5,5,"evenodd");e.textBaseline="alphabetic",e.fillStyle="#f60",e.fillRect(125,1,62,20),e.fillStyle="#069",e.font="11pt no-real-font-123";const o="Cwm fjordbank 😃 gly";return e.fillText(o,2,15),e.fillStyle="rgba(102, 204, 0, 0.2)",e.font="18pt Arial",e.fillText(o,4,45),e.globalCompositeOperation="multiply",e.fillStyle="rgb(255,0,255)",e.beginPath(),e.arc(50,50,50,0,2*Math.PI,!0),e.closePath(),e.fill(),e.fillStyle="rgb(0,255,255)",e.beginPath(),e.arc(100,50,50,0,2*Math.PI,!0),e.closePath(),e.fill(),e.fillStyle="rgb(255,255,0)",e.beginPath(),e.arc(75,100,50,0,2*Math.PI,!0),e.closePath(),e.fill(),e.fillStyle="rgb(255,0,255)",e.arc(75,75,75,0,2*Math.PI,!0),e.arc(75,75,25,0,2*Math.PI,!0),e.fill("evenodd"),{winding:n,data:v(t)}},touchSupport:function(){let t,e=0;void 0!==y.maxTouchPoints?e=u(y.maxTouchPoints):void 0!==y.msMaxTouchPoints&&(e=y.msMaxTouchPoints);try{document.createEvent("TouchEvent"),t=!0}catch(n){t=!1}return{maxTouchPoints:e,touchEvent:t,touchStart:"ontouchstart"in C}},fonts:function(){const t=h.body,e=h.createElement("div"),n=h.createElement("div"),o={},r={},i=()=>{const t=h.createElement("span");return Object.assign(t.style,p,{position:"absolute",left:"-9999px",fontSize:"48px"}),t.textContent="mmMwWLliI0O&1",t},a=(t,e)=>{const n=i();return n.style.fontFamily=`'${t}',${e}`,n},c=t=>g.some(((e,n)=>t[n].offsetWidth!==o[e]||t[n].offsetHeight!==r[e])),s=g.map((t=>{const n=i();return n.style.fontFamily=t,e.appendChild(n),n}));t.appendChild(e);for(let d=0,f=g.length;d<f;d++)o[g[d]]=s[d].offsetWidth,r[g[d]]=s[d].offsetHeight;const u=(()=>{const t={};for(const e of m)t[e]=g.map((t=>{const o=a(e,t);return n.appendChild(o),o}));return t})();t.appendChild(n);const l=[];for(let d=0,f=m.length;d<f;d++)c(u[m[d]])&&l.push(m[d]);return t.removeChild(n),t.removeChild(e),l},audio:function(){return s(this,void 0,void 0,(function*(){if(d.userAgent.match(/OS 11.+Version\/11.+Safari/))return-1;const t=f.OfflineAudioContext||f.webkitOfflineAudioContext;if(!t)return-2;const e=new t(1,44100,44100),n=e.createOscillator();n.type="triangle",n.frequency.setValueAtTime(1e4,e.currentTime);const o=e.createDynamicsCompressor();for(const[r,i]of[["threshold",-50],["knee",40],["ratio",12],["reduction",-20],["attack",0],["release",.25]])"function"==typeof o[r].setValueAtTime&&o[r].setValueAtTime(i,e.currentTime);return n.connect(o),o.connect(e.destination),n.start(0),e.startRendering(),new Promise((t=>{const r=setTimeout((()=>{e.oncomplete=()=>{},t(-3)}),1e3);e.oncomplete=e=>{let i;try{clearTimeout(r),i=e.renderedBuffer.getChannelData(0).slice(4500,5e3).reduce(((t,e)=>t+Math.abs(e)),0),n.disconnect(),o.disconnect()}catch(a){return void t(-4)}t(i)}}))}))},pluginsSupport:function(){return void 0!==navigator.plugins},productSub:function(){return navigator.productSub},emptyEvalLength:function(){return eval.toString().length},errorFF:function(){try{throw"a"}catch(t){try{return t.toSource(),!0}catch(e){return!1}}},vendor:function(){return navigator.vendor},chrome:function(){return void 0!==window.chrome},cookiesEnabled:function(){try{x.cookie="cookietest=1";const t=-1!==x.cookie.indexOf("cookietest=");return x.cookie="cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT",t}catch(t){return!1}}};function B(t,e,n){return s(this,void 0,void 0,(function*(){let o=Date.now();const r={};for(const a of Object.keys(t)){if(function(t,e){for(let n=0,o=t.length;n<o;++n)if(t[n]===e)return!0;return!1}(n,a))continue;let c,s;try{c={value:yield t[a](e)}}catch(i){c=i&&"object"==typeof i&&"message"in i?{error:i}:{error:{message:i}}}s=Date.now(),r[a]=Object.assign(Object.assign({},c),{duration:s-o}),o=s}return r}))}function D(t){return JSON.stringify(t,((t,e)=>{var n;return e instanceof Error?Object.assign(Object.assign({},e),{message:e.message,stack:null===(n=e.stack)||void 0===n?void 0:n.split("\n")}):e}),2)}function E(t){return c(function(t){let e="";for(const n of Object.keys(t)){const o=t[n],r=o.error?"error":JSON.stringify(o.value);e+=`${e?"|":""}${n.replace(/([:|\\])/g,"\\$1")}:${r}`}return e}(t))}class R{get(t={}){return s(this,void 0,void 0,(function*(){const e=yield B(I,void 0,[]),n=function(t){let e;return{components:t,get visitorId(){return void 0===e&&(e=E(this.components)),e},set visitorId(t){e=t}}}(e);return t.debug&&console.log(`Copy the text below to get the debug data:\n\n\`\`\`\nversion: 3.0.0\ngetOptions: ${JSON.stringify(t,void 0,2)}\nvisitorId: ${n.visitorId}\ncomponents: ${D(e)}\n\`\`\``),n}))}}function L({delayFallback:t=50}={}){return s(this,void 0,void 0,(function*(){var e;return yield(e=t,new Promise((t=>{window.requestIdleCallback?window.requestIdleCallback((()=>t())):setTimeout(t,e)}))),new R}))}var F={load:L,hashComponents:E,componentsToDebugString:D};const G=c;return t.componentsToDebugString=D,t.default=F,t.getComponents=B,t.hashComponents=E,t.isChromium=M,t.isDesktopSafari=function(){return"safari"in S},t.isGecko=function(){var t;return l(["buildID"in w,(null===(t=A.documentElement)||void 0===t?void 0:t.style)&&"MozAppearance"in A.documentElement.style,"MediaRecorderErrorEvent"in S,"mozInnerScreenX"in S,"CSSMozDocumentRule"in S,"CanvasCaptureMediaStream"in S])>=4},t.isIEOrOldEdge=b,t.load=L,t.murmurX64Hash128=G,t}({});
