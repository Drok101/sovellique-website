(function () {
  function bind() {
    if (window.__sovCleanup) window.__sovCleanup();
    const cleanups = [];
    const on = (target, type, fn) => {
      target.addEventListener(type, fn);
      cleanups.push(() => target.removeEventListener(type, fn));
    };
    window.__sovCleanup = () => {
      cleanups.forEach((fn) => fn());
      window.__sovCleanup = null;
    };

    const ddBtn = document.querySelector("[data-dropdown-btn]");
    const dd = document.getElementById("features-menu");
    const closeDd = () => {
      if (!dd || !ddBtn) return;
      dd.classList.remove("open");
      ddBtn.setAttribute("aria-expanded", "false");
    };
    if (ddBtn && dd) {
      on(ddBtn, "click", (e) => {
        e.stopPropagation();
        const open = !dd.classList.contains("open");
        dd.classList.toggle("open", open);
        ddBtn.setAttribute("aria-expanded", String(open));
      });
      on(document, "click", (e) => {
        if (!dd.contains(e.target)) closeDd();
      });
      on(document, "keydown", (e) => {
        if (e.key === "Escape") {
          closeDd();
          ddBtn.focus();
        }
      });
    }

    const menuBtn = document.querySelector("[data-menu-btn]");
    const panel = document.getElementById("mobile-menu");
    if (menuBtn && panel) {
      const setOpen = (open) => {
        panel.classList.toggle("open", open);
        document.body.classList.toggle("menu-open", open);
        menuBtn.setAttribute("aria-expanded", String(open));
        menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        menuBtn.querySelector(".i-open").style.display = open ? "none" : "";
        menuBtn.querySelector(".i-close").style.display = open ? "" : "none";
      };
      on(menuBtn, "click", () => setOpen(!panel.classList.contains("open")));
      on(document, "keydown", (e) => {
        if (e.key === "Escape" && panel.classList.contains("open")) setOpen(false);
      });
      on(window, "resize", () => {
        if (window.innerWidth > 980) setOpen(false);
      });
    }

    const filters = document.querySelector("[data-filters]");
    if (filters) {
      const posts = [...document.querySelectorAll("[data-cat]")];
      const empty = document.querySelector("[data-empty]");
      on(filters, "click", (e) => {
        const b = e.target.closest("button");
        if (!b) return;
        filters.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        const cat = b.dataset.filter;
        let shown = 0;
        posts.forEach((p) => {
          const show = cat === "all" || p.dataset.cat === cat;
          p.hidden = !show;
          if (show) shown++;
        });
        if (empty) empty.hidden = shown > 0;
      });
      const fromHash = () => {
        const b = filters.querySelector(`[data-filter="${CSS.escape(location.hash.slice(1))}"]`);
        if (b) b.click();
      };
      if (location.hash) fromHash();
      on(window, "hashchange", fromHash);
    }

    const toggle = document.querySelector("[data-billing]");
    if (toggle) {
      on(toggle, "click", (e) => {
        const b = e.target.closest("button");
        if (!b) return;
        toggle.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        const mode = b.dataset.mode;
        document.querySelectorAll("[data-price]").forEach((el) => {
          el.hidden = el.dataset.price !== mode;
        });
      });
    }

    const year = document.querySelector("[data-year]");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  window.sovelliqueBind = bind;
  bind();
})();
