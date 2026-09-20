// Load optional local artwork; keep the labelled slot when no file exists yet.
document.querySelectorAll('[data-artwork]').forEach(slot => {
  const img = new Image();
  img.alt = slot.dataset.label || '项目作品';
  img.onload = () => { slot.replaceChildren(img); slot.classList.add('has-artwork'); };
  img.src = slot.dataset.artwork;
});
