document.querySelectorAll('dialog .close').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
document.querySelectorAll('[data-unavailable]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();document.getElementById('notice').showModal();}));
document.querySelectorAll('.series-card').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();document.getElementById('series-title').textContent=link.querySelector('b').textContent;document.getElementById('series-link').href=link.getAttribute('href');document.getElementById('series-dialog').showModal();}));
document.querySelectorAll('dialog').forEach(dialog=>{dialog.addEventListener('close',()=>{document.body.style.overflow='';});dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});});
// Retain bookmarks from the previous exploration layout.
const aliases={explore:'works',product:'wangzai'};
if(aliases[location.hash.slice(1)]){location.replace('#'+aliases[location.hash.slice(1)]);}
const carousel=document.getElementById('carousel');
if(carousel&&!matchMedia('(prefers-reduced-motion: reduce)').matches){carousel.addEventListener('wheel',event=>{const cards=carousel.querySelectorAll('.work-card');cards.forEach((card,index)=>{const angle=Math.max(-7,Math.min(7,event.deltaY*.025))*(index%2?1:-1);card.animate([{rotate:angle+'deg'},{rotate:'0deg'}],{duration:650,easing:'ease-out'});});},{passive:true});}
