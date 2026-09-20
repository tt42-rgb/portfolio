(() => {
  const layer = document.createElement('div');
  layer.className = 'paper-scatter';
  layer.setAttribute('aria-hidden', 'true');
  document.body.prepend(layer);
  let seed = [...location.pathname].reduce((n, c) => (n * 31 + c.charCodeAt(0)) >>> 0, 917);
  const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const marks = [];
  for (let i = 0; i < 45; i++) marks.push({gap:210+random()*330,x:random(),side:random()>.5,angle:random()*100-50,size:16+random()*27,patch:random()>.65,mint:random()>.5});
  function layout() {
    layer.replaceChildren();
    const height = document.body.scrollHeight;
    let y = 90;
    for (const mark of marks) {
      y += mark.gap;
      if (y > height - 100) break;
      const el = document.createElement('span');
      el.className = 'paper-mark ' + (mark.patch ? 'patch' + (mark.mint ? ' mint' : '') : 'star');
      el.style.top = y + 'px';
      el.style[mark.side ? 'left' : 'right'] = (mark.x * 9 - (mark.patch ? 5 : 0)) + '%';
      el.style.setProperty('--turn', mark.angle + 'deg');
      el.style.fontSize = mark.size + 'px';
      if (!mark.patch) el.textContent = mark.mint ? '✳' : '✧';
      layer.append(el);
    }
  }
  layout();
  window.addEventListener('load', layout);
  let timer;
  window.addEventListener('resize', () => { clearTimeout(timer); timer = setTimeout(layout, 150); });
})();
