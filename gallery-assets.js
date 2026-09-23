// Only request artwork near the reader, rather than all full-size files at startup.
(function(){
 function load(slot){
  if(slot.dataset.artRequested)return;slot.dataset.artRequested='true';
  var img=new Image();img.alt=slot.dataset.label||'项目作品';img.decoding='async';
  img.onload=function(){while(slot.firstChild)slot.removeChild(slot.firstChild);slot.appendChild(img);slot.classList.add('has-artwork');};
  img.onerror=function(){slot.textContent='图片暂时未能加载，点击重试';slot.addEventListener('click',function retry(e){e.preventDefault();e.stopPropagation();slot.removeEventListener('click',retry);delete slot.dataset.artRequested;load(slot);});};
  img.src=slot.dataset.artwork;
 }
 var slots=document.querySelectorAll('[data-artwork]');
 if('IntersectionObserver' in window){var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){observer.unobserve(entry.target);load(entry.target);}});},{rootMargin:'250px'});slots.forEach(function(slot){observer.observe(slot);});}
 else{var pending=Array.prototype.slice.call(slots);function check(){pending=pending.filter(function(slot){var r=slot.getBoundingClientRect();if(r.top<window.innerHeight+250&&r.bottom>-250){load(slot);return false;}return true;});}window.addEventListener('scroll',check,{passive:true});window.addEventListener('resize',check);check();}
})();