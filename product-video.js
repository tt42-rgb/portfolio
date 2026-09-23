(() => {
 if(window.matchMedia('(max-width: 700px), (pointer: coarse)').matches)return;
 const trigger=document.querySelector('[data-product-video]');if(!trigger)return;
 const dialog=document.createElement('dialog');dialog.className='product-video-dialog';dialog.id='product-video';dialog.setAttribute('aria-labelledby','product-video-title');
 dialog.innerHTML='<button type="button" class="product-video-close">返回封面 ×</button><header><p>PRODUCT EXPLORATION</p><h2 id="product-video-title">《晚安，小小的你》</h2></header><div class="product-video-stage"><div class="product-video-placeholder"><span aria-hidden="true">▷</span><p>产品视频 · 待补充</p></div><video controls playsinline preload="metadata" aria-label="晚安，小小的你" hidden></video></div>';
 document.body.append(dialog);const video=dialog.querySelector('video');const placeholder=dialog.querySelector('.product-video-placeholder');
 video.addEventListener('loadedmetadata',()=>{video.hidden=false;placeholder.hidden=true;});
 video.addEventListener('error',()=>{video.hidden=true;placeholder.hidden=false;});
 let loaded=false;
 trigger.addEventListener('click',e=>{e.preventDefault();trigger.classList.add('product-video-open');dialog.showModal();if(!loaded){video.src='videos/other-products.mp4';loaded=true;}});
 trigger.addEventListener('keydown',e=>{if(e.key===' '){e.preventDefault();trigger.click();}});
 dialog.querySelector('button').onclick=()=>dialog.close();
 dialog.addEventListener('close',()=>{video.pause();trigger.classList.remove('product-video-open');trigger.focus();});
})();
