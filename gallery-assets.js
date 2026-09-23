(function(){
 var queue=[],active=0;
 function status(slot,text){var small=slot.querySelector('small');if(small)small.textContent=text;else slot.textContent=text;}
 function pump(){while(active<3&&queue.length)load(queue.shift());}
 function load(slot){active++;var img=new Image(),original=slot.dataset.artwork,retried=false,done=false;
 var source=window.portfolioImageSource?window.portfolioImageSource(original):original;
 img.alt=slot.dataset.label||'项目作品';img.decoding='async';status(slot,'图片正在加载…');
 var timer=setTimeout(function(){if(!done)status(slot,'图片加载较慢，请稍候…');},12000);
 function finish(){done=true;clearTimeout(timer);active--;pump();}
 img.onload=function(){while(slot.firstChild)slot.removeChild(slot.firstChild);slot.appendChild(img);slot.classList.add('has-artwork');finish();};
 img.onerror=function(){if(!retried&&source!==original){retried=true;img.src=original;return;}status(slot,'图片未能加载，请刷新后重试');finish();};
 img.src=source;
 }
 function enqueue(slot){if(slot.dataset.artRequested)return;slot.dataset.artRequested='true';status(slot,'图片等待加载…');queue.push(slot);pump();}
 var slots=document.querySelectorAll('[data-artwork]');
 if('IntersectionObserver' in window){var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){observer.unobserve(entry.target);enqueue(entry.target);}});},{rootMargin:'150px'});slots.forEach(function(slot){observer.observe(slot);});}
 else{var pending=Array.prototype.slice.call(slots);function check(){pending=pending.filter(function(slot){var r=slot.getBoundingClientRect();if(r.top<innerHeight+150&&r.bottom>-150){enqueue(slot);return false;}return true;});}addEventListener('scroll',check,{passive:true});addEventListener('resize',check);check();}
})();