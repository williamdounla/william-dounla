/* ═══════════════════════════════════════════════════════
   WILLIAM DOUNLA — Global JavaScript
   ═══════════════════════════════════════════════════════ */

// ── Language Data ──────────────────────────────────────
const i18n = {
  fr: {
    nav: {
      accueil: "Accueil", livre: "Livres", harmonie: "Harmonie",
      apropos: "À propos", contact: "Contact",
      commander: "Commander"
    },
    footer: {
      tagline: "Auteur · Compositeur · Stratège humain · Homme de conviction",
      nav: "Navigation", social: "Réseaux",
      links: { accueil: "Accueil", livre: "Livres", apropos: "À propos", contact: "Contact" },
      rights: "© 2026 William Dounla. Tous droits réservés.",
      made: "Fait avec conviction depuis Yaoundé, Cameroun"
    }
  },
  en: {
    nav: {
      accueil: "Home", livre: "Books", harmonie: "Harmony",
      apropos: "About", contact: "Contact",
      commander: "Order Now"
    },
    footer: {
      tagline: "Author · Composer · Human Strategist · Man of Conviction",
      nav: "Navigation", social: "Social",
      links: { accueil: "Home", livre: "Books", apropos: "About", contact: "Contact" },
      rights: "© 2026 William Dounla. All rights reserved.",
      made: "Made with conviction from Yaoundé, Cameroon"
    }
  }
};

// ── State ──────────────────────────────────────────────
let currentLang = localStorage.getItem('wd-lang') || 'fr';

// ── Init ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initNav();
  initLang();
  initReveal();
  initMobileMenu();
  updateNav();
});

// ── Custom Cursor ──────────────────────────────────────
function initCursor() {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();
}

// ── Navbar ─────────────────────────────────────────────
function initNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

function updateNav() {
  const t = i18n[currentLang];
  const links = {
    'nav-accueil': t.nav.accueil,
    'nav-livre': t.nav.livre,
    'nav-harmonie': t.nav.harmonie,
    'nav-apropos': t.nav.apropos,
    'nav-contact': t.nav.contact,
    'nav-cta': t.nav.commander,
    'mob-accueil': t.nav.accueil,
    'mob-livre': t.nav.livre,
    'mob-harmonie': t.nav.harmonie,
    'mob-apropos': t.nav.apropos,
    'mob-contact': t.nav.contact,
  };
  Object.entries(links).forEach(([id, text]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  });

  // Footer
  const ft = t.footer;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('footer-tagline', ft.tagline);
  set('footer-nav-title', ft.nav);
  set('footer-social-title', ft.social);
  set('footer-link-accueil', ft.links.accueil);
  set('footer-link-livre', ft.links.livre);
  set('footer-link-apropos', ft.links.apropos);
  set('footer-link-contact', ft.links.contact);
  set('footer-rights', ft.rights);
  set('footer-made', ft.made);

  // Page-specific translations
  if (typeof updatePageLang === 'function') updatePageLang(currentLang);
}

// ── Language Switch ────────────────────────────────────
function initLang() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentLang = btn.dataset.lang;
      localStorage.setItem('wd-lang', currentLang);
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateNav();
    });
    if (btn.dataset.lang === currentLang) btn.classList.add('active');
  });
}

// ── Reveal on Scroll ───────────────────────────────────
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}

// ── Mobile Menu ────────────────────────────────────────
function initMobileMenu() {
  const burger = document.querySelector('.hamburger');
  const menu = document.querySelector('.mobile-menu');
  const close = document.querySelector('.mobile-close');
  if (!burger || !menu) return;
  burger.addEventListener('click', () => menu.classList.add('open'));
  if (close) close.addEventListener('click', () => menu.classList.remove('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}

// ── Active nav link ────────────────────────────────────
(function setActiveLink() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
})();
