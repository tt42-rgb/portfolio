(() => {
 const trigger=document.querySelector('[data-emoji-gallery]');if(!trigger)return;
 const titles=['表情包-已上线微信','风格化表情包','风格化组合群像'];
 const dialog=document.createElement('dialog');dialog.className='emoji-dialog';dialog.setAttribute('aria-label','表情包设定集');
 dialog.innerHTML='<button class="emoji-close" type="button">返回封面 ×</button><div class="emoji-track"></div><div class="emoji-navigation"><button type="button" class="emoji-prev" aria-label="上一页">←</button><div class="emoji-dots"></div><button type="button" class="emoji-next" aria-label="下一页">→</button></div>';
 document.body.append(dialog);const track=dialog.querySelector('.emoji-track'),dots=dialog.querySelector('.emoji-dots');let current=0;
 titles.forEach((title,i)=>{
 const page=document.createElement('section');page.className='emoji-page';const heading=document.createElement('h2');heading.textContent=title;
 const subtitle=document.createElement('p');subtitle.className='emoji-subtitle';subtitle.textContent=['Stickers — Available on WeChat','Stylized Stickers','Stylized Ensemble Illustrations'][i];
 const art=document.createElement('div');art.className='emoji-art emoji-matrix';
 if(i===1)art.classList.add('emoji-matrix-twelve');
 if(i===2)art.classList.add('emoji-matrix-four');
 for(let j=1;j<=(i===1?12:i===2?4:9);j++){const slot=document.createElement('div');slot.className='emoji-cell';slot.textContent=String(j).padStart(2,'0')+' · 图片待补充';const img=new Image();img.alt=title+' '+j;img.onload=()=>slot.replaceChildren(img);img.src=`images/emoji-page-${i+1}-${String(j).padStart(2,'0')}.png`;art.append(slot);}
 page.append(heading,subtitle,art);track.append(page);
 const dot=document.createElement('button');dot.type='button';dot.setAttribute('aria-label',`第${i+1}页：${title}`);dot.onclick=()=>go(i);dots.append(dot);
 });
 ['prev','next'].forEach(direction=>{const button=dialog.querySelector('.emoji-'+direction);const icon=new Image();icon.alt='';icon.onload=()=>{button.replaceChildren(icon);button.classList.add('has-icon');};icon.src=`images/emoji-${direction}.png`;});
 function highlight(){[...dots.children].forEach((dot,i)=>{dot.classList.toggle('is-active',i===current);dot.setAttribute('aria-pressed',String(i===current));});}
 function go(i){current=Math.max(0,Math.min(2,i));track.scrollTo({left:track.clientWidth*current,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});highlight();}
 track.addEventListener('scroll',()=>{current=Math.round(track.scrollLeft/track.clientWidth);highlight();},{passive:true});
 dialog.querySelector('.emoji-prev').onclick=()=>go(current-1);dialog.querySelector('.emoji-next').onclick=()=>go(current+1);
 dialog.querySelector('.emoji-close').onclick=()=>dialog.close();dialog.addEventListener('close',()=>{trigger.classList.remove('emoji-open');trigger.focus();});
 dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();go(current+(e.key==='ArrowRight'?1:-1));}});
 trigger.addEventListener('click',e=>{e.preventDefault();trigger.classList.add('emoji-open');dialog.showModal();track.scrollLeft=0;current=0;highlight();});
 trigger.addEventListener('keydown',e=>{if(e.key===' '){e.preventDefault();trigger.click();}});
 window.addEventListener('resize',()=>{if(dialog.open)track.scrollTo({left:current*track.clientWidth,behavior:'instant'});});
})();
