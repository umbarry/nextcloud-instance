const p="modulepreload",h=function(n,s){return n[0]==="."?new URL(n,s).href:n},f={},y=function(n,s,l){let e=Promise.resolve();if(s&&s.length>0){const t=document.getElementsByTagName("link"),r=document.querySelector("meta[property=csp-nonce]"),a=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));e=Promise.all(s.map(o=>{if(o=h(o,l),o in f)return;f[o]=!0;const c=o.endsWith(".css"),m=c?'[rel="stylesheet"]':"";if(l)for(let d=t.length-1;d>=0;d--){const u=t[d];if(u.href===o&&(!c||u.rel==="stylesheet"))return}else if(document.querySelector('link[href="'.concat(o,'"]').concat(m)))return;const i=document.createElement("link");if(i.rel=c?"stylesheet":p,c||(i.as="script",i.crossOrigin=""),i.href=o,a&&i.setAttribute("nonce",a),document.head.appendChild(i),c)return new Promise((d,u)=>{i.addEventListener("load",d),i.addEventListener("error",()=>u(new Error("Unable to preload CSS for ".concat(o))))})}))}return e.then(()=>n()).catch(t=>{const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=t,window.dispatchEvent(r),!r.defaultPrevented)throw t})};(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();export{y as _};
