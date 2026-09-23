(function(){
 var query='(max-width: 700px), (pointer: coarse)';
 document.addEventListener('click',function(e){
  if(!window.matchMedia(query).matches||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;
  var a=e.target.closest('a[data-emoji-gallery],a[data-activity-gallery],a[data-merch-gallery],a[data-product-video],a[data-exhibition-gallery],a[data-process]');
  if(!a)return;
  // Keep the real link's default navigation; stop desktop modal handlers.
  e.stopImmediatePropagation();
 },true);
 window.addEventListener('pageshow',function(){if(window.matchMedia(query).matches){document.body.style.position='';document.body.style.top='';document.body.style.left='';document.body.style.width='';document.body.style.overflow='';document.documentElement.classList.remove('portfolio-modal-open');}});
})();