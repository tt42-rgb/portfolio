(() => {
  const trigger = document.querySelector('[data-activity-gallery]');
  if (!trigger) return;
  const titles = [
    ['限定活动视觉化', 'Limited-Edition Event Visuals', 1],
    ['世界观-产品迭代视觉化', 'Worldbuilding & Product Evolution Visuals', 3]
  ];
  const dialog = document.createElement('dialog');
  dialog.className = 'activity-dialog';
  dialog.setAttribute('aria-label', '活动视觉设定集');
  dialog.innerHTML = '<button type="button" class="activity-close">返回封面 ×</button><div class="activity-track" tabindex="0" aria-label="上下滑动浏览两个页面"></div><nav class="activity-navigation" aria-label="页面导航"><button type="button" class="activity-prev" aria-label="上一页">↑</button><div class="activity-dots"></div><button type="button" class="activity-next" aria-label="下一页">↓</button></nav>';
  document.body.append(dialog);
  const track = dialog.querySelector('.activity-track');
  const dots = dialog.querySelector('.activity-dots');
  let current = 0;
  titles.forEach(([title, translation, imagePage], i) => {
    const page = document.createElement('section');
    page.className = 'activity-page';
    if (imagePage === 3) page.classList.add('activity-page-natural');
    const header = document.createElement('header');
    const heading = document.createElement('h2');
    heading.textContent = title;
    const subtitle = document.createElement('p');
    subtitle.textContent = translation;
    header.append(heading, subtitle);
    const grid = document.createElement('div');
    grid.className = 'activity-matrix';
    if (imagePage === 3) { grid.tabIndex = 0; grid.setAttribute('aria-label', '世界观图片展示，可上下滚动'); }
    for (let j = 1; j <= 4; j++) {
      const slot = document.createElement('figure');
      slot.className = 'activity-cell';
      slot.textContent = `${String(j).padStart(2, '0')} · 图片待补充`;
      const img = new Image();
      img.alt = `${title} · ${j}`;
      img.onload = () => slot.replaceChildren(img);
      img.src = `images/activity-page-${imagePage}-${String(j).padStart(2, '0')}.png`;
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
    dialog.querySelector('.activity-prev').disabled = current === 0;
    dialog.querySelector('.activity-next').disabled = current === titles.length - 1;
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
  dialog.querySelector('.activity-prev').onclick = () => go(current - 1);
  dialog.querySelector('.activity-next').onclick = () => go(current + 1);
  dialog.querySelector('.activity-close').onclick = () => dialog.close();
  dialog.addEventListener('keydown', e => {
    if (e.target.closest('.activity-page-natural .activity-matrix')) return;
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'].includes(e.key)) {
      e.preventDefault();
      go(current + (e.key === 'ArrowDown' || e.key === 'PageDown' ? 1 : -1));
    }
  });
  dialog.addEventListener('close', () => {
    trigger.classList.remove('activity-open');
    trigger.focus();
  });
  trigger.addEventListener('click', e => {
    e.preventDefault();
    trigger.classList.add('activity-open');
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
