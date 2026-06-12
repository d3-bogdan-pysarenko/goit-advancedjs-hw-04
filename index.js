import{a as S,S as C,i as u}from"./assets/vendor-DcHCnVjq.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const M="42438077-634a4b32cfcaa96ebaa8c4719",O="https://pixabay.com/api/",f=15;async function m(t,o){return(await S.get(O,{params:{key:M,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:f}})).data}const s={gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadMoreButton:document.querySelector(".load-more"),form:document.querySelector(".form")},P=new C(".gallery a",{captionsData:"alt",captionDelay:250,captionPosition:"bottom"});function h(t){const o=t.map(({webformatURL:i,largeImageURL:l,tags:e,likes:r,views:a,comments:b,downloads:E})=>`
        <li class="gallery-item">
            <a class="gallery-link" href="${l}">
                <img
                    class="gallery-image"
                    src="${i}"
                    alt="${e}"
                />
            </a>
            <div class="gallery-info">
                <div class="column">
                    <h2>Likes</h2>
                    <p>${r}</p>
                </div>
                <div class="column">
                    <h2>Views</h2>
                    <p>${a}</p>
                </div>
                <div class="column">
                    <h2>Comments</h2>
                    <p>${b}</p>
                </div>
                <div class="column">
                    <h2>Downloads</h2>
                    <p>${E}</p>
                </div>
            </div>
        </li>`).join("");s.gallery.insertAdjacentHTML("beforeend",o),P.refresh()}function R(){s.gallery.innerHTML=""}function g(){s.loader.classList.add("is-active")}function p(){s.loader.classList.remove("is-active")}function y(){s.loadMoreButton.classList.remove("is-hidden")}function v(){s.loadMoreButton.classList.add("is-hidden")}const q="There are no more items to show on set query!";let d="",n=1,c=0;function L(){u.info({message:q,position:"topRight",messageColor:"#fff",backgroundColor:"#6366f1",timeout:3e3})}function B(t){u.warning({message:t,position:"topRight",messageColor:"#fff",backgroundColor:"#cfc127",timeout:3e3})}function w(t){u.error({message:t,position:"topRight",messageColor:"#fff",backgroundColor:"#EF4040",timeout:3e3})}s.form.addEventListener("submit",async t=>{t.preventDefault();const o=t.target.elements["search-text"].value.trim();if(!o){window.alert("Please, provide non-empty key to search");return}d=o,n=1,c=0,R(),v(),g();try{const i=await m(d,n);if(c=i.totalHits,i.hits.length===0){B("There are no images matching your search query. Try search with different key!");return}h(i.hits),n*f<c?y():L()}catch(i){w("Ooops, something went wrong...."),console.log(i)}finally{p(),s.form.reset()}});s.loadMoreButton.addEventListener("click",async()=>{n+=1,v(),g();try{const t=await m(d,n);h(t.hits);const o=s.gallery.firstElementChild;if(o){const{height:i}=o.getBoundingClientRect();window.scrollBy({top:i*2,behavior:"smooth"})}n*f>=c?L():y()}catch{w("Ooops, something went wrong....")}finally{p()}});
//# sourceMappingURL=index.js.map
