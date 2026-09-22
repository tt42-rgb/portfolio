(function () {
 'use strict';
 var create = document.createElement.bind(document), active = null, savedY = 0, savedStyle = null, lastFocus = null;
 function restore() {
  if (!active) return;
  active = null;
  document.documentElement.classList.remove('portfolio-modal-open');
  Object.keys(savedStyle).forEach(function(k){document.body.style[k]=savedStyle[k];});
  if(lastFocus && document.contains(lastFocus)){try{lastFocus.focus({preventScroll:true});}catch(e){lastFocus.focus();}}
  window.scrollTo(0,savedY);
  requestAnimationFrame(function(){if(!active)window.scrollTo(0,savedY);});
 }
 function lock(d,opener) {
  active=d;savedY=window.pageYOffset;lastFocus=opener;
  savedStyle={position:document.body.style.position,top:document.body.style.top,left:document.body.style.left,width:document.body.style.width,overflow:document.body.style.overflow};
  document.documentElement.classList.add('portfolio-modal-open');
  document.body.style.position='fixed';document.body.style.top=-savedY+'px';document.body.style.left='0';document.body.style.width='100%';document.body.style.overflow='hidden';
 }
 function enhance(d) {
  if(d.__portfolioDialog)return d;d.__portfolioDialog=true;
  var nativeShow=typeof d.showModal==='function'?d.showModal:null;
  var nativeClose=typeof d.close==='function'?d.close:null;
  if(!('open' in d))Object.defineProperty(d,'open',{get:function(){return this.hasAttribute('open');},set:function(v){if(v)this.setAttribute('open','');else this.removeAttribute('open');}});
  if(!nativeShow){d.classList.add('portfolio-fallback-dialog');d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');}
  d.showModal=function(){
   if(d.hasAttribute('open'))return;
   if(active)active.close();
   var opener=document.activeElement;
   if(nativeShow)nativeShow.call(d);else d.setAttribute('open','');
   lock(d,opener);
   if(!nativeShow){var first=d.querySelector('button,[href],input,[tabindex]');if(first)first.focus();}
  };
  d.close=function(value){
   if(!d.hasAttribute('open'))return;
   if(nativeClose)nativeClose.call(d,value);else{d.removeAttribute('open');d.returnValue=value||'';d.dispatchEvent(new Event('close'));}
   if(active===d)restore();
  };
  d.addEventListener('close',function(){if(active===d)restore();});
  return d;
 }
 document.createElement=function(name,options){var el=create(name,options);return String(name).toLowerCase()==='dialog'?enhance(el):el;};
 document.querySelectorAll('dialog').forEach(enhance);
 document.addEventListener('keydown',function(e){
  if(!active||!active.classList.contains('portfolio-fallback-dialog'))return;
  if(e.key==='Escape'){e.preventDefault();var cancel=new Event('cancel',{cancelable:true});if(active.dispatchEvent(cancel))active.close();}
  if(e.key==='Tab'&&active){var items=Array.prototype.filter.call(active.querySelectorAll('button:not([disabled]),[href],input,[tabindex]:not([tabindex="-1"])'),function(el){return el.getClientRects().length;});if(!items.length){e.preventDefault();return;}var first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
 });
 // Use direct section navigation on touch screens; avoid competing smooth scrolls.
 document.addEventListener('click',function(e){
  if(!window.matchMedia('(max-width:700px)').matches)return;
  var a=e.target.closest('.station-nav a[href^="#"],#carousel a[href="#wangzai"],a.floating[href="#wangzai"]');
  if(!a||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;
  var target=document.getElementById(a.getAttribute('href').slice(1));if(!target)return;
  e.preventDefault();e.stopImmediatePropagation();
  if(active)active.close();
  history.pushState(null,'',a.getAttribute('href'));
  window.scrollTo(0,target.getBoundingClientRect().top+window.pageYOffset-16);
 },true);
})();
