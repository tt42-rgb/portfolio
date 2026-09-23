(function(){
 var queue=[],active=0;
 function status(slot,text){if(slot.querySelector('img'))return;var small=slot.querySelector('small');if(small)small.textContent=text;else slot.textContent=text;}
 function pump(){while(active<3&&queue.length)load(queue.shift());}
 function load(slot){active++;var img=new Image(),done=false;var original=slot.dataset.artwork;
 img.alt=slot.dataset.label||'项目作品';img.decoding='async';status(slot,'图片正在加载…');
 var slow=setTimeout(function(){if(!done)status(slot,'图片加载较慢，请稍候…');},12000);
 var timeout=setTimeout(function(){if(done)return;status(slot,'图片加载超时，请刷新重试');finish();img.removeAttribute('src');},30000);
 function finish(){if(done)return;done=true;clearTimeout(slow);clearTimeout(timeout);active--;pump();}
 img.onload=function(){if(done)return;while(slot.firstChild)slot.removeChild(slot.firstChild);slot.appendChild(img);slot.classList.add('has-artwork');finish();};
 img.onerror=function(){if(done)return;status(slot,'图片未能加载，请刷新重试');finish();};
 img.src=window.portfolioImageSource?window.portfolioImageSource(original):original;
 }
 function enqueue(slot){if(slot.dataset.artRequested)return;slot.dataset.artRequested='true';status(slot,'图片等待加载…');queue.push(slot);pump();}
 var slots=document.querySelectorAll('[data-artwork]');
 if('IntersectionObserver' in window){var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){observer.unobserve(entry.target);enqueue(entry.target);}});},{rootMargin:'300px'});slots.forEach(function(slot){observer.observe(slot);});}
 else{var pending=Array.prototype.slice.call(slots);function check(){pending=pending.filter(function(slot){var r=slot.getBoundingClientRect();if(r.top<innerHeight+300&&r.bottom>-300){enqueue(slot);return false;}return true;});}addEventListener('scroll',check,{passive:true});addEventListener('resize',check);check();}
})();