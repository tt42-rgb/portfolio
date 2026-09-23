(() => {
 if(window.matchMedia('(max-width: 700px), (pointer: coarse)').matches)return;
  const trigger = document.querySelector('[data-merch-gallery]');
  if (!trigger) return;
  const titles = [
    ['类哑光面贴纸', '低成本获客物料，可作为活动期引流产品'],
    ['反光车贴', '核心用户购买产品，少量潜在用户消费'],
    ['亚克力冰箱贴', '']
  ];
  const dialog = document.createElement('dialog');
  dialog.className = 'merch-dialog';
  dialog.setAttribute('aria-label', '同系列衍生周边');
  dialog.innerHTML = '<button type="button" class="merch-close">返回封面 ×</button><div class="merch-track" tabindex="0" aria-label="上下滑动浏览三个页面"></div><nav class="merch-navigation" aria-label="页面导航"><button type="button" class="merch-prev" aria-label="上一页">↑</button><div class="merch-dots"></div><button type="button" class="merch-next" aria-label="下一页">↓</button></nav>';
  document.body.append(dialog);
  const track = dialog.querySelector('.merch-track');
  const dots = dialog.querySelector('.merch-dots');
  let current = 0;
  titles.forEach(([title, translation], i) => {
    const page = document.createElement('section');
    page.className = 'merch-page';
    const header = document.createElement('header');
    const heading = document.createElement('h2');
    heading.textContent = title;
    const subtitle = document.createElement('p');
    subtitle.textContent = translation;
    header.append(heading, subtitle);
    const grid = document.createElement('div');
    grid.className = i === 0 ? 'merch-matrix' : i === 1 ? 'merch-matrix merch-matrix-six' : 'merch-split';
    function slot(number, group = '') {
      const figure = document.createElement('figure');
      figure.className = 'merch-cell';
      figure.textContent = String(number).padStart(2, '0') + ' · 图片待补充';
      const img = new Image();
      img.alt = title + ' · ' + (group === 'left' ? '款式 ' : group === 'right' ? '展示 ' : '') + number;
      img.onload = () => figure.replaceChildren(img);
      img.src = 'images/merch-page-' + (i + 1) + '-' + (group ? group + '-' : '') + String(number).padStart(2, '0') + '.png';
      return figure;
    }
    if (i === 0) {
      grid.classList.add('merch-matrix-natural');
      grid.tabIndex = 0;
      grid.setAttribute('aria-label', '贴纸图片展示，可上下滚动');
      for (let j = 1; j <= 4; j++) grid.append(slot(j));
    } else if (i === 1) {
      for (let j = 1; j <= 6; j++) grid.append(slot(j));
    } else {
      const left = document.createElement('div');
      left.className = 'merch-left';
      left.tabIndex = 0;
      left.setAttribute('aria-label', title + (i === 1 ? '：四张款式图' : '：上下滑动浏览八张款式图'));
      for (let j = 1; j <= (i === 1 ? 4 : 8); j++) left.append(slot(j, 'left'));
      const right = document.createElement('div');
      right.className = 'merch-right';
      for (let j = 1; j <= 2; j++) right.append(slot(j, 'right'));
      grid.append(left, right);
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
    dialog.querySelector('.merch-prev').disabled = current === 0;
    dialog.querySelector('.merch-next').disabled = current === titles.length - 1;
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
  dialog.querySelector('.merch-prev').onclick = () => go(current - 1);
  dialog.querySelector('.merch-next').onclick = () => go(current + 1);
  dialog.querySelector('.merch-close').onclick = () => dialog.close();
  dialog.addEventListener('keydown', e => {
    if (e.target.closest('.merch-left, .merch-matrix-natural')) return;
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'].includes(e.key)) {
      e.preventDefault();
      go(current + (e.key === 'ArrowDown' || e.key === 'PageDown' ? 1 : -1));
    }
  });
  dialog.addEventListener('close', () => {
    trigger.classList.remove('merch-open');
    trigger.focus();
  });
  trigger.addEventListener('click', e => {
    e.preventDefault();
    trigger.classList.add('merch-open');
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
