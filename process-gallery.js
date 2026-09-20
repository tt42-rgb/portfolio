(() => {
 const dialog=document.createElement('dialog');dialog.className='process-viewer';dialog.setAttribute('aria-label','过程图片详情');
 dialog.innerHTML='<button type="button" class="process-close">返回封面 ×</button><h3>过程图片</h3><div class="process-large-track"></div><div class="process-controls"><button type="button" class="process-prev" aria-label="上一张">←</button><span>左右滑动查看三张图片</span><button type="button" class="process-next" aria-label="下一张">→</button></div>';
 document.body.append(dialog);const track=dialog.querySelector('.process-large-track');let source;
 const subjectBounds=[[1780,1560,1435,1835],[210,0,4155,3015],[360,2525,1970,1250]];
 const fitSubject=frame=>{const img=frame.querySelector('img');if(!img||!frame.subjectBounds)return;const [x,y,w,h]=frame.subjectBounds;const scale=Math.min(frame.clientWidth*.86/w,frame.clientHeight*.86/h);Object.assign(img.style,{position:'absolute',width:img.naturalWidth*scale+'px',height:img.naturalHeight*scale+'px',maxWidth:'none',left:(frame.clientWidth-w*scale)/2-x*scale+'px',top:(frame.clientHeight-h*scale)/2-y*scale+'px'});};
 const observer=new ResizeObserver(entries=>entries.forEach(({target})=>fitSubject(target)));
 function move(dir){track.scrollBy({left:dir*track.clientWidth,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}
 dialog.querySelector('.process-close').onclick=()=>dialog.close();
 dialog.querySelector('.process-prev').onclick=()=>move(-1);dialog.querySelector('.process-next').onclick=()=>move(1);
 dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();move(e.key==='ArrowLeft'?-1:1);}});
 dialog.addEventListener('close',()=>{source?.classList.remove('is-viewing');source?.focus();});
 document.querySelectorAll('[data-process]').forEach(tile=>{
 function open(){source=tile;tile.classList.add('is-viewing');observer.disconnect();track.replaceChildren();dialog.querySelector('h3').textContent=tile.dataset.process==='2-3'?'附加属性-迭代':tile.dataset.label+' · 细节';
 for(let i=1;i<=3;i++){const frame=document.createElement('div');frame.className='process-large-frame';frame.textContent=`细节图片 ${i} · 待补充`;const img=new Image();img.alt=`${tile.dataset.label} 细节 ${i}`;img.onload=()=>{frame.replaceChildren(img);if(tile.dataset.process==='2-3'){frame.subjectBounds=subjectBounds[i-1];frame.style.position='relative';frame.style.overflow='hidden';observer.observe(frame);fitSubject(frame);}};img.src=`images/process-${tile.dataset.process}-detail-${i}.png`;track.append(frame);}
 dialog.showModal();track.scrollLeft=0;
 }
 tile.addEventListener('click',open);tile.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});
 });
})();
