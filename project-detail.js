document.querySelectorAll('.color-text').forEach(button=>button.addEventListener('click',()=>{const active=button.classList.toggle('is-active');button.setAttribute('aria-pressed',String(active));}));
