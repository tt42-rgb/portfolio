const track=document.getElementById('sliderTrack');
const slides=[...document.querySelectorAll('.slide')];
const dots=[...document.querySelectorAll('.dot')];
const slider=document.getElementById('slider');
let current=0;
function updateSlider(){
 const slide=slides[current];if(!slide)return;
 track.style.transform=`translateX(${slider.clientWidth/2-slide.offsetLeft-slide.offsetWidth/2}px)`;
 slides.forEach((item,index)=>{item.classList.toggle('active',index===current);item.classList.toggle('near',Math.abs(index-current)===1);item.setAttribute('aria-current',String(index===current));});
 dots.forEach((dot,index)=>{dot.classList.toggle('active',index===current);dot.setAttribute('aria-label',`查看角色 ${index+1}`);dot.setAttribute('aria-pressed',String(index===current));});
 document.getElementById('currentNumber').textContent=String(current+1).padStart(2,'0');
 document.querySelector('.character-kind').textContent=current===6?'隐藏款 · 07':'常规款 · '+String(current+1).padStart(2,'0');
 document.querySelector('.character-name').textContent=slide.dataset.name||'角色名称待补充';
 document.querySelector('.character-description').textContent=slide.dataset.description||'角色介绍待补充';
}
function select(index){current=(index+slides.length)%slides.length;updateSlider();}
slides.forEach((slide,index)=>{slide.tabIndex=0;slide.setAttribute('role','button');slide.setAttribute('aria-label',`查看角色 ${index+1}`);slide.addEventListener('click',()=>select(index));slide.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(index);}});});
dots.forEach((dot,index)=>dot.addEventListener('click',()=>select(index)));
document.querySelector('.prev').addEventListener('click',()=>select(current-1));document.querySelector('.next').addEventListener('click',()=>select(current+1));
slider.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();select(current+(e.key==='ArrowRight'?1:-1));}});
let touchX=0,touchY=0;
track.addEventListener('touchstart',e=>{touchX=e.touches[0].clientX;touchY=e.touches[0].clientY;},{passive:true});
track.addEventListener('touchend',e=>{const dx=touchX-e.changedTouches[0].clientX,dy=touchY-e.changedTouches[0].clientY;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))select(current+(dx>0?1:-1));},{passive:true});
document.querySelectorAll('.title-area .series-label,.title-area .big-title,.title-area .intro').forEach(line=>{
 line.tabIndex=0;
 function toggleLine(){line.classList.toggle('is-blue');}
 line.addEventListener('click',toggleLine);
 line.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggleLine();}});
});
window.addEventListener('resize',updateSlider);window.addEventListener('load',updateSlider);updateSlider();
