/* ===================================================================
   AKTAR BHAI — ART STUDIO  |  Interactions & Animations
=================================================================== */
(function () {
  "use strict";

  /* ----------  IMAGE FALLBACK (elegant camel gradient if a photo fails)  ---------- */
  const camelPairs = [
    ["#E4D2B8", "#B08D63"], ["#F1E7D7", "#C8A57E"], ["#D8C3A2", "#9A7B52"],
    ["#EADBC4", "#B5683F"], ["#E0CDAE", "#A9802B"], ["#F3EADC", "#B08D63"]
  ];
  function placeholder(img) {
    if (img.dataset.fbk) return;
    img.dataset.fbk = "1";
    const pair = camelPairs[Math.abs(hashStr(img.alt || img.src)) % camelPairs.length];
    const label = (img.alt || "Art").slice(0, 22);
    const svg =
      `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='1000'>` +
      `<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>` +
      `<stop offset='0' stop-color='${pair[0]}'/><stop offset='1' stop-color='${pair[1]}'/>` +
      `</linearGradient></defs><rect width='800' height='1000' fill='url(%23g)'/>` +
      `<text x='50%' y='50%' font-family='Georgia,serif' font-style='italic' font-size='46' fill='rgba(255,255,255,.9)' text-anchor='middle' dominant-baseline='middle'>${escapeXml(label)}</text>` +
      `<text x='50%' y='57%' font-family='Arial' font-size='15' letter-spacing='4' fill='rgba(255,255,255,.65)' text-anchor='middle'>AKTAR BHAI</text></svg>`;
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg).replace(/%23/g, "%23");
  }
  function hashStr(s) { let h = 0; for (let i = 0; i < s.length; i++) { h = (h << 5) - h + s.charCodeAt(i); h |= 0; } return h; }
  function escapeXml(s) { return s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c])); }
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => placeholder(img), { once: true });
    if (img.complete && img.naturalWidth === 0 && img.src) placeholder(img);
  });

  /* ----------  PRELOADER  ---------- */
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    const bar = preloader.querySelector(".preloader-bar span");
    const count = preloader.querySelector(".preloader-count");
    let p = 0;
    const tick = setInterval(() => {
      p += Math.random() * 16;
      if (p >= 100) { p = 100; clearInterval(tick); finish(); }
      if (bar) bar.style.width = p + "%";
      if (count) count.textContent = Math.floor(p) + "%";
    }, 130);
    function finish() {
      setTimeout(() => {
        preloader.classList.add("done");
        document.body.classList.add("loaded");
        const hero = document.querySelector(".hero");
        if (hero) hero.classList.add("loaded");
      }, 350);
    }
  } else {
    document.body.classList.add("loaded");
    const hero = document.querySelector(".hero");
    if (hero) requestAnimationFrame(() => hero.classList.add("loaded"));
  }

  /* ----------  CUSTOM CURSOR  ---------- */
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  if (dot && ring && window.matchMedia("(hover: hover)").matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    });
    (function render() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(render);
    })();
    const hov = "a, button, .work-card, .cat-card, .acc-q, [data-cursor]";
    document.querySelectorAll(hov).forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
    });
  }

  /* ----------  NAVBAR scroll state  ---------- */
  const nav = document.querySelector(".nav");
  const topbar = document.querySelector(".topbar");
  const progress = document.querySelector(".scroll-progress");
  const toTop = document.querySelector(".to-top");
  function onScroll() {
    const y = window.scrollY;
    if (nav) nav.classList.toggle("scrolled", y > 40);
    if (topbar) topbar.classList.toggle("hide", y > 40);
    if (toTop) toTop.classList.toggle("show", y > 600);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ----------  MOBILE MENU  ---------- */
  const burger = document.querySelector(".burger");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (burger && mobileMenu) {
    const toggle = () => {
      const open = mobileMenu.classList.toggle("open");
      burger.classList.toggle("open", open);
      document.body.style.overflow = open ? "hidden" : "";
    };
    burger.addEventListener("click", toggle);
    mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      burger.classList.remove("open");
      document.body.style.overflow = "";
    }));
  }

  /* ----------  SCROLL REVEAL  ---------- */
  const revealEls = document.querySelectorAll("[data-reveal], .img-reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ----------  COUNTERS  ---------- */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const dur = 1600;
        const start = performance.now();
        const suffix = el.dataset.suffix || "";
        function step(now) {
          const t = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          const val = target * eased;
          el.textContent = (target % 1 === 0 ? Math.floor(val) : val.toFixed(1)).toLocaleString();
          if (t < 1) requestAnimationFrame(step);
          else el.textContent = target.toLocaleString() + "";
          el.innerHTML = (target % 1 === 0 ? Math.floor(val).toLocaleString() : val.toFixed(1)) + (t >= 1 ? `<span class="plus">${suffix}</span>` : "");
        }
        requestAnimationFrame(step);
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach((el) => cio.observe(el));
  }

  /* ----------  MAGNETIC BUTTONS  ---------- */
  if (window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.28}px, ${y * 0.4}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* ----------  PARALLAX (data-speed)  ---------- */
  const parallaxEls = document.querySelectorAll("[data-speed]");
  if (parallaxEls.length) {
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const vh = window.innerHeight;
        parallaxEls.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.bottom < 0 || r.top > vh) return;
          const speed = parseFloat(el.dataset.speed);
          const offset = (r.top + r.height / 2 - vh / 2) * speed;
          el.style.transform = `translateY(${offset}px)`;
        });
        ticking = false;
      });
    }, { passive: true });
  }

  /* ----------  HERO bg subtle parallax / scale  ---------- */
  const heroBg = document.querySelector(".hero-bg img");
  if (heroBg) {
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (y < window.innerHeight) heroBg.style.transform = `scale(1.12) translateY(${y * 0.18}px)`;
    }, { passive: true });
  }

  /* ----------  GALLERY FILTERS  ---------- */
  const filterBar = document.querySelector(".filter-bar");
  if (filterBar) {
    const cards = document.querySelectorAll("[data-cat]");
    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      filterBar.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      cards.forEach((card, i) => {
        const match = f === "all" || card.dataset.cat === f;
        if (match) {
          card.style.display = "";
          card.style.opacity = "0";
          card.style.transform = "translateY(24px)";
          setTimeout(() => {
            card.style.transition = "opacity .5s var(--ease), transform .5s var(--ease)";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 40 + i * 35);
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  /* ----------  ACCORDION  ---------- */
  document.querySelectorAll(".acc-q").forEach((q) => {
    q.addEventListener("click", () => {
      const item = q.closest(".acc-item");
      const ans = item.querySelector(".acc-a");
      const open = item.classList.contains("open");
      item.parentElement.querySelectorAll(".acc-item.open").forEach((o) => {
        if (o !== item) { o.classList.remove("open"); o.querySelector(".acc-a").style.maxHeight = null; }
      });
      item.classList.toggle("open", !open);
      ans.style.maxHeight = open ? null : ans.scrollHeight + "px";
    });
  });

  /* ----------  QUICK-VIEW MODAL  ---------- */
  const modal = document.querySelector("[data-modal]");
  if (modal) {
    const mImg = modal.querySelector("[data-m-img]");
    const mTitle = modal.querySelector("[data-m-title]");
    const mArtist = modal.querySelector("[data-m-artist]");
    const mPrice = modal.querySelector("[data-m-price]");
    const mTag = modal.querySelector("[data-m-tag]");
    const mDesc = modal.querySelector("[data-m-desc]");
    const open = (data) => {
      if (mImg) mImg.src = data.img;
      if (mTitle) mTitle.textContent = data.title;
      if (mArtist) mArtist.textContent = data.artist;
      if (mPrice) mPrice.textContent = data.price;
      if (mTag) mTag.textContent = data.tag;
      if (mDesc) mDesc.textContent = data.desc;
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    };
    const close = () => { modal.classList.remove("open"); document.body.style.overflow = ""; };
    document.querySelectorAll("[data-view]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const card = el.closest(".work-card") || el;
        open({
          img: card.dataset.img || card.querySelector("img")?.src,
          title: card.dataset.title || "Untitled",
          artist: card.dataset.artist || "Aktar Bhai",
          price: card.dataset.price || "",
          tag: card.dataset.tag || "Artwork",
          desc: card.dataset.desc || "A signature piece from the Aktar Bhai studio collection."
        });
      });
    });
    modal.querySelectorAll("[data-close], .modal-overlay").forEach((el) => el.addEventListener("click", close));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }

  /* ----------  TOAST helper  ---------- */
  const toast = document.querySelector(".toast");
  let toastTimer;
  window.showToast = (msg) => {
    if (!toast) return;
    toast.querySelector(".toast-msg").textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
  };

  /* ----------  Newsletter + Contact form (demo)  ---------- */
  document.querySelectorAll("[data-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = form.dataset.form === "news" ? "Thanks! You're on the list ✦" : "Message sent — we'll be in touch soon ✦";
      window.showToast(msg);
      form.reset();
    });
  });

  /* ----------  Favourite toggle  ---------- */
  document.querySelectorAll(".work-fav").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault(); e.stopPropagation();
      btn.classList.toggle("active");
      const on = btn.classList.contains("active");
      btn.innerHTML = on ? "♥" : "♡";
      btn.style.color = on ? "#fff" : "";
      btn.style.background = on ? "var(--terra)" : "";
      window.showToast(on ? "Added to favourites" : "Removed from favourites");
    });
  });

  /* ----------  Footer year  ---------- */
  const yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();

})();
