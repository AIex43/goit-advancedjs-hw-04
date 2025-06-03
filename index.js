/* empty css                      */import{S as m,i}from"./assets/vendor-Bhe4NhaX.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const g="50667452-1c0751a5fadad2372abc27daa",p="https://pixabay.com/api/";async function y(a){const r=new URLSearchParams({key:g,q:a,image_type:"photo",orientation:"horizontal",safesearch:"true"}),o=await fetch(`${p}?${r}`);if(!o.ok)throw new Error("Failed to fetch images");return(await o.json()).hits}let c;function h(a){const r=document.getElementById("gallery"),o=a.map(({webformatURL:n,largeImageURL:e,tags:t,likes:s,views:d,comments:f,downloads:u})=>`
    <li class="photo-card">
      <a href="${e}">
        <img src="${n}" alt="${t}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${s}</p>
        <p><b>Views:</b> ${d}</p>
        <p><b>Comments:</b> ${f}</p>
        <p><b>Downloads:</b> ${u}</p>
      </div>
    </li>
  `).join("");r.insertAdjacentHTML("beforeend",o),c?c.refresh():c=new m("#gallery a")}function b(){document.getElementById("gallery").innerHTML=""}function l(a){document.getElementById("loader").classList.toggle("hidden",!a)}const L=document.getElementById("search-form");L.addEventListener("submit",w);async function w(a){a.preventDefault();const r=a.currentTarget.query.value.trim();if(!r){i.warning({title:"Warning",message:"Please enter a search term."});return}b(),l(!0);try{const o=await y(r);o.length===0?i.error({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!"}):h(o)}catch(o){i.error({title:"Error",message:o.message})}finally{l(!1)}}
//# sourceMappingURL=index.js.map
