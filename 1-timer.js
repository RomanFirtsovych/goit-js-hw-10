import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{f as h,i as y}from"./assets/vendor-A92OCY9B.js";const r=document.querySelector("#datetime-picker"),n=document.querySelector("[data-start]"),p=document.querySelector("[data-days]"),b=document.querySelector("[data-hours]"),S=document.querySelector("[data-minutes]"),C=document.querySelector("[data-seconds]");n.classList.add("btn-timer");r.classList.add("input-timer");let a,u;function s(t){return String(t).padStart(2,"0")}function D(t){const i=Math.floor(t/864e5),l=Math.floor(t%864e5/36e5),m=Math.floor(t%864e5%36e5/6e4),f=Math.floor(t%864e5%36e5%6e4/1e3);return{days:i,hours:l,minutes:m,seconds:f}}function c({days:t,hours:e,minutes:o,seconds:d}){p.textContent=s(t),b.textContent=s(e),S.textContent=s(o),C.textContent=s(d)}const q={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){const e=t[0];e<=new Date?(y.error({title:"Error",message:"Please choose a date in the future",position:"topCenter"}),n.disabled=!0,a=null):(n.disabled=!1,a=e)}};h(r,q);n.addEventListener("click",w);n.disabled=!0;function w(){if(!a)return;r.disabled=!0,n.disabled=!0;const t=()=>{const e=a-new Date;if(e<=0){clearInterval(u),c({days:0,hours:0,minutes:0,seconds:0}),r.disabled=!1,n.disabled=!0;return}const o=D(e);c(o)};t(),u=setInterval(t,1e3)}
//# sourceMappingURL=1-timer.js.map
