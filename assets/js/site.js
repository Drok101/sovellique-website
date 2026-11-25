{
  // Features dropdown (desktop)
  const ddBtn = document.querySelector('[data-dropdown-btn]');
  const dd = document.getElementById('features-menu');
  const closeDd = () => { if (!dd) return; dd.classList.remove('open'); ddBtn.setAttribute('aria-expanded', 'false'); };
  if (ddBtn && dd) {
    ddBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = !dd.classList.contains('open');
      dd.classList.toggle('open', open);
      ddBtn.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', (e) => { if (!dd.contains(e.target)) closeDd(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeDd(); ddBtn.focus(); } });
  }

  // Mobile menu
  const menuBtn = document.querySelector('[data-menu-btn]');
  const panel = document.getElementById('mobile-menu');
  if (menuBtn && panel) {
    const setOpen = (open) => {
      panel.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menuBtn.querySelector('.i-open').style.display = open ? 'none' : '';
      menuBtn.querySelector('.i-close').style.display = open ? '' : 'none';
    };
    menuBtn.addEventListener('click', () => setOpen(!panel.classList.contains('open')));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && panel.classList.contains('open')) setOpen(false); });
    window.addEventListener('resize', () => { if (window.innerWidth > 980) setOpen(false); });
  }

  // Blog category filters
  const filters = document.querySelector('[data-filters]');
  if (filters) {
    const posts = [...document.querySelectorAll('[data-cat]')];
    const empty = document.querySelector('[data-empty]');
    filters.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      filters.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      const cat = b.dataset.filter;
      let shown = 0;
      posts.forEach((p) => { const show = cat === 'all' || p.dataset.cat === cat; p.hidden = !show; if (show) shown++; });
      if (empty) empty.hidden = shown > 0;
    });
    const fromHash = () => {
      const b = filters.querySelector(`[data-filter="${CSS.escape(location.hash.slice(1))}"]`);
      if (b) b.click();
    };
    if (location.hash) fromHash();
    window.addEventListener('hashchange', fromHash);
  }

  // Pricing: monthly / yearly
  const toggle = document.querySelector('[data-billing]');
  if (toggle) {
    toggle.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      toggle.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      const mode = b.dataset.mode;
      document.querySelectorAll('[data-price]').forEach((el) => { el.hidden = el.dataset.price !== mode; });
    });
  }

  // Contact form: front-end demonstration only, nothing is sent
  const form = document.querySelector('[data-contact]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      form.querySelectorAll('[data-required]').forEach((field) => {
        const input = field.querySelector('input,textarea,select');
        const value = input.value.trim();
        const bad = !value || (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
        field.classList.toggle('invalid', bad);
        input.setAttribute('aria-invalid', String(bad));
        if (bad && ok) { input.focus(); ok = false; }
      });
      if (!ok) return;
      const done = document.querySelector('[data-demo-success]');
      form.hidden = true;
      done.classList.add('show');
      done.focus();
    });
    const again = document.querySelector('[data-demo-reset]');
    if (again) again.addEventListener('click', () => {
      form.reset();
      form.hidden = false;
      document.querySelector('[data-demo-success]').classList.remove('show');
    });
  }

  const y = document.querySelector('[data-year]');
  if (y) y.textContent = String(new Date().getFullYear());
}
