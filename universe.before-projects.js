document.querySelectorAll('dialog .close').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
document.querySelectorAll('[data-unavailable]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();document.getElementById('notice').showModal();}));
document.querySelectorAll('dialog').forEach(dialog=>{dialog.addEventListener('close',()=>{document.body.style.overflow='';});dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});});
// Retain bookmarks from the previous exploration layout.
const aliases={explore:'works',product:'wangzai'};
if(aliases[location.hash.slice(1)]){location.replace('#'+aliases[location.hash.slice(1)]);}
const carousel=document.getElementById('carousel');
// Progressive enhancement: original text remains readable without JavaScript.
document.querySelectorAll('.time-card').forEach((card,index)=>{
  const heading=card.querySelector('h3');
  const paragraph=card.querySelector('p');
  if(!heading||!paragraph)return;
  paragraph.id='experience-detail-'+index;
  const button=document.createElement('button');
  button.type='button';button.className='experience-toggle';
  button.textContent=heading.textContent;
  button.setAttribute('aria-expanded','true');
  button.setAttribute('aria-controls',paragraph.id);
  const icon=document.createElement('span');icon.className='toggle-icon';icon.textContent='−';icon.setAttribute('aria-hidden','true');button.append(icon);
  heading.replaceChildren(button);
  button.addEventListener('click',()=>{
    const expanded=button.getAttribute('aria-expanded')==='true';
    button.setAttribute('aria-expanded',String(!expanded));
    paragraph.hidden=expanded;icon.textContent=expanded?'+':'−';
    card.classList.toggle('is-collapsed',expanded);
  });
});
const skillGroup=document.querySelector('.profile .skills');
if(skillGroup){
  const detail=document.createElement('div');detail.className='skill-detail';detail.id='skill-detail';detail.setAttribute('aria-live','polite');detail.hidden=true;skillGroup.after(detail);
  const processParagraphs=[...document.querySelectorAll('.process-item p')];
  const skillMap={'IP 企划':0,'角色设定':1,'潮玩盲盒':2,'文创衍生':4,'打样落地':3,'包装视觉':4};
  skillGroup.querySelectorAll('.skill').forEach(label=>{
    const name=label.textContent;const button=document.createElement('button');
    button.type='button';button.className='skill';button.textContent=name;button.setAttribute('aria-pressed','false');button.setAttribute('aria-controls',detail.id);label.replaceWith(button);
    button.addEventListener('click',()=>{
      const wasSelected=button.getAttribute('aria-pressed')==='true';
      skillGroup.querySelectorAll('button').forEach(item=>item.setAttribute('aria-pressed','false'));
      detail.replaceChildren();detail.hidden=wasSelected;
      if(wasSelected)return;
      button.setAttribute('aria-pressed','true');
      const title=document.createElement('strong');title.textContent=name;
      const copy=document.createElement('p');
      const source=processParagraphs[skillMap[name]];
      copy.textContent=source?source.textContent:document.querySelector('.profile>p').textContent;
      const link=document.createElement('a');link.href='#wangzai';link.textContent='查看项目中的应用 ↗';
      detail.append(title,copy,link);
    });
  });
}
if(carousel&&!matchMedia('(prefers-reduced-motion: reduce)').matches){carousel.addEventListener('wheel',event=>{const cards=carousel.querySelectorAll('.work-card');cards.forEach((card,index)=>{const angle=Math.max(-7,Math.min(7,event.deltaY*.025))*(index%2?1:-1);card.animate([{rotate:angle+'deg'},{rotate:'0deg'}],{duration:650,easing:'ease-out'});});},{passive:true});}

// Mark the last selected experience; keyboard activation bubbles from its button.
document.querySelectorAll('.time-card').forEach(card=>card.addEventListener('click',()=>{document.querySelectorAll('.time-card').forEach(item=>item.classList.toggle('is-selected',item===card));}));


const archiveStage=document.querySelector('.archive-stage');
const archiveCover=document.querySelector('.archive-cover');
const archiveDialog=document.getElementById('archive-dialog');
archiveCover.addEventListener('click',()=>{const open=archiveStage.classList.toggle('is-open');archiveCover.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('[data-archive]').forEach(card=>card.addEventListener('click',()=>{document.getElementById('archive-title').textContent=card.querySelector('strong').textContent;const content=document.getElementById('archive-content');content.replaceChildren();const source=card.querySelector('img');if(source){const image=source.cloneNode(true);content.append(image);}else{const placeholder=document.createElement('div');placeholder.className='archive-dialog-placeholder';placeholder.textContent='对应卡牌图片待补充';content.append(placeholder);}archiveDialog.showModal();}));
