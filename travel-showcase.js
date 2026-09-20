(() => {
  const showcase = document.querySelector('.travel-showcase');
  if (!showcase) return;
  const grid = showcase.querySelector('.nine-images');
  const viewer = document.createElement('dialog');
  viewer.className = 'travel-image-viewer';
  viewer.setAttribute('aria-label', '项目图片放大展示');
  viewer.innerHTML = '<button type="button" class="travel-image-close" autofocus>关闭 ×</button><img alt="">';
  document.body.append(viewer);
  let activeImage;
  grid.querySelectorAll('.image-placeholder').forEach(card => {
    const source = card.querySelector('img');
    if (!source) return;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-haspopup', 'dialog');
    card.setAttribute('aria-label', `放大查看：${source.alt}`);
    card.addEventListener('click', () => {
      activeImage = card;
      const image = viewer.querySelector('img');
      image.src = source.src;
      image.alt = source.alt;
      viewer.showModal();
    });
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
    });
  });
  viewer.querySelector('button').onclick = () => viewer.close();
  viewer.addEventListener('click', e => { if (e.target === viewer) viewer.close(); });
  viewer.addEventListener('close', () => activeImage?.focus({preventScroll:true}));
  const rail = showcase.querySelector('.travel-rail');
  const picks = [...rail.querySelectorAll('.travel-pick')];
  function select(pick) {
    picks.forEach(button => {
      button.classList.toggle('is-selected', button === pick);
      button.setAttribute('aria-pressed', String(button === pick));
    });
  }
  picks.forEach((pick, i) => {
    const img = new Image();
    img.alt = `集安行纪补充设定 ${i + 1}`;
    img.onload = () => pick.replaceChildren(img);
    img.src = pick.dataset.travelImage;
    pick.addEventListener('click', () => select(pick));
    pick.addEventListener('keydown', e => {
      if (!['ArrowDown', 'ArrowUp'].includes(e.key)) return;
      e.preventDefault();
      const next = picks[Math.max(0, Math.min(4, i + (e.key === 'ArrowDown' ? 1 : -1)))];
      select(next);
      next.focus({preventScroll:true});
      const top = next.offsetTop - picks[0].offsetTop - (rail.clientHeight - next.clientHeight) / 2;
      rail.scrollTo({top, behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    });
  });
  let timer;
  rail.addEventListener('scroll', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const box = rail.getBoundingClientRect();
      const center = box.top + box.height / 2;
      select(picks.reduce((best, pick) => {
        const distance = el => { const r = el.getBoundingClientRect(); return Math.abs(r.top + r.height / 2 - center); };
        return distance(pick) < distance(best) ? pick : best;
      }));
    }, 120);
  }, {passive:true});
  new ResizeObserver(() => {
    showcase.style.setProperty('--rail-height', `${grid.getBoundingClientRect().height}px`);
  }).observe(grid);
})();
