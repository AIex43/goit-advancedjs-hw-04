/* empty css                      */import{S as m,i}from"./assets/vendor-Bhe4NhaX.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const g="ВАШ_PIXABAY_API_KEY",p="https://pixabay.com/api/";async function y(n){const r=new URLSearchParams({key:g,q:n,image_type:"photo",orientation:"horizontal",safesearch:"true"}),o=await fetch(`${p}?${r}`);if(!o.ok)throw new Error("Failed to fetch images");return(await o.json()).hits}let l;function h(n){const r=document.getElementById("gallery"),o=n.map(({webformatURL:s,largeImageURL:e,tags:t,likes:a,views:d,comments:u,downloads:f})=>`
    <li class="photo-card">
      <a href="${e}">
        <img src="${s}" alt="${t}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${a}</p>
        <p><b>Views:</b> ${d}</p>
        <p><b>Comments:</b> ${u}</p>
        <p><b>Downloads:</b> ${f}</p>
      </div>
    </li>
  `).join("");r.insertAdjacentHTML("beforeend",o),l?l.refresh():l=new m("#gallery a")}function b(){document.getElementById("gallery").innerHTML=""}function c(n){document.getElementById("loader").classList.toggle("hidden",!n)}const L=document.getElementById("search-form");L.addEventListener("submit",E);async function E(n){n.preventDefault();const r=n.currentTarget.query.value.trim();if(!r){i.warning({title:"Warning",message:"Please enter a search term."});return}b(),c(!0);try{const o=await y(r);o.length===0?i.error({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!"}):h(o)}catch(o){i.error({title:"Error",message:o.message})}finally{c(!1)}}
//# sourceMappingURL=index.js.map
