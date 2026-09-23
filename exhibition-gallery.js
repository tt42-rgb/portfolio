(() => {
 if(window.matchMedia('(max-width: 700px), (pointer: coarse)').matches)return;
  const trigger = document.querySelector('[data-exhibition-gallery]');
  if (!trigger) return;
  const titles = Array.from({length:8}, (_,i) => ['展会展销', String(i + 1).padStart(2, '0') + ' / 08', i + 1]);
  const dialog = document.createElement('dialog');
  dialog.className = 'exhibition-dialog';
  dialog.setAttribute('aria-label', '展会展销');
  dialog.innerHTML = '<button type="button" class="exhibition-close">返回封面 ×</button><div class="exhibition-track" tabindex="0" aria-label="上下滑动浏览八个图片页面"></div><nav class="exhibition-navigation" aria-label="页面导航"><button type="button" class="exhibition-prev" aria-label="上一页">↑</button><div class="exhibition-dots"></div><button type="button" class="exhibition-next" aria-label="下一页">↓</button></nav>';
  document.body.append(dialog);
  const track = dialog.querySelector('.exhibition-track');
  const dots = dialog.querySelector('.exhibition-dots');
  let current = 0;
  titles.forEach(([title, translation, imagePage], i) => {
    const page = document.createElement('section');
    page.className = 'exhibition-page';
    const header = document.createElement('header');
    const heading = document.createElement('h2');
    heading.textContent = title;
    const subtitle = document.createElement('p');
    subtitle.textContent = translation;
    header.append(heading, subtitle);
    const grid = document.createElement('div');
    grid.className = 'exhibition-matrix';
    for (let j = 1; j <= 1; j++) {
      const slot = document.createElement('figure');
      slot.className = 'exhibition-cell';
      slot.textContent = `${String(imagePage).padStart(2, '0')} · 图片待补充`;
      const img = new Image();
      img.alt = `${title} · ${imagePage}`;
      img.onload = () => slot.replaceChildren(img);
      img.src = `images/exhibition-${String(imagePage).padStart(2, '0')}.png`;
      grid.append(slot);
    }
    page.append(header, grid);
    track.append(page);
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `第${i + 1}页：${title}`);
    dot.addEventListener('click', () => go(i));
    dots.append(dot);
  });
  function highlight() {
    [...dots.children].forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
      dot.setAttribute('aria-pressed', String(i === current));
    });
    dialog.querySelector('.exhibition-prev').disabled = current === 0;
    dialog.querySelector('.exhibition-next').disabled = current === titles.length - 1;
  }
  function go(index) {
    current = Math.max(0, Math.min(titles.length - 1, index));
    track.scrollTo({top: current * track.clientHeight, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
    highlight();
  }
  track.addEventListener('scroll', () => {
    if (!track.clientHeight) return;
    current = Math.max(0, Math.min(titles.length - 1, Math.round(track.scrollTop / track.clientHeight)));
    highlight();
  }, {passive: true});
  dialog.querySelector('.exhibition-prev').onclick = () => go(current - 1);
  dialog.querySelector('.exhibition-next').onclick = () => go(current + 1);
  dialog.querySelector('.exhibition-close').onclick = () => dialog.close();
  dialog.addEventListener('keydown', e => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'].includes(e.key)) {
      e.preventDefault();
      go(current + (e.key === 'ArrowDown' || e.key === 'PageDown' ? 1 : -1));
    }
  });
  dialog.addEventListener('close', () => {
    trigger.classList.remove('exhibition-open');
    trigger.focus();
  });
  trigger.addEventListener('click', e => {
    e.preventDefault();
    trigger.classList.add('exhibition-open');
    dialog.showModal();
    current = 0;
    track.scrollTop = 0;
    highlight();
  });
  trigger.addEventListener('keydown', e => {
    if (e.key === ' ') { e.preventDefault(); trigger.click(); }
  });
  window.addEventListener('resize', () => {
    if (dialog.open) track.scrollTo({top: current * track.clientHeight, behavior: 'instant'});
  });
})();
