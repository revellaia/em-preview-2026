// Mondadori Advocacia - rebuild. No backend calls: contact panel states the real channel status,
// never simulates a send that does not happen.
(function () {
  var INSTAGRAM_URL = 'https://www.instagram.com/edgarmondadori/';

  function initMobileNav() {
    var btn = document.getElementById('hamburger-btn');
    var nav = document.getElementById('nav-mobile');
    if (!btn || !nav) return;
    btn.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('a, button').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function initModal() {
    var overlay = document.getElementById('contact-modal');
    if (!overlay) return;
    var openers = document.querySelectorAll('[data-open-contact]');
    var closers = overlay.querySelectorAll('[data-close-contact]');

    function open() {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      var firstFocusable = overlay.querySelector('a, button, input, select, textarea');
      if (firstFocusable) firstFocusable.focus();
    }
    function close() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    openers.forEach(function (el) { el.addEventListener('click', open); });
    closers.forEach(function (el) { el.addEventListener('click', close); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) close();
    });

    // Focus trap
    overlay.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var focusables = Array.prototype.slice.call(
        overlay.querySelectorAll('a, button, input, select, textarea')
      ).filter(function (el) { return !el.hasAttribute('hidden') && el.offsetParent !== null; });
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    });

    var igLinks = overlay.querySelectorAll('[data-instagram-link]');
    igLinks.forEach(function (el) { el.href = INSTAGRAM_URL; });
  }

  function initNavShadow() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    window.addEventListener('scroll', function () {
      nav.style.backgroundColor = window.scrollY > 40 ? 'rgba(14, 14, 14, 0.95)' : 'rgba(20, 19, 20, 0.85)';
    }, { passive: true });
  }

  function initScrollProgress() {
    var bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', function () {
      var h = document.documentElement;
      var scrollable = h.scrollHeight - h.clientHeight;
      var pct = scrollable > 0 ? (h.scrollTop / scrollable) * 100 : 0;
      bar.style.width = pct + '%';
    }, { passive: true });
  }

  function initHeroVideo() {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return; // poster estatico permanece, nenhum byte de video e buscado

    var videos = document.querySelectorAll('[data-hero-video]');
    if (!videos.length) return;

    videos.forEach(function (video) {
      var isMobile = window.matchMedia('(max-width: 767px)').matches;
      var src = isMobile ? video.getAttribute('data-src-mobile') : video.getAttribute('data-src-desktop');
      if (!src) return;

      var source = document.createElement('source');
      source.src = src;
      source.type = 'video/mp4';
      video.appendChild(source);
      video.load();

      video.addEventListener('canplay', function () {
        video.classList.add('video-ready');
      }, { once: true });

      var playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(function () {
          // autoplay bloqueado pelo navegador: poster estatico permanece visivel, sem erro no console
        });
      }
    });
  }

  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in-view'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    items.forEach(function (el) { observer.observe(el); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
    initModal();
    initNavShadow();
    initScrollProgress();
    initReveal();
    initHeroVideo();
  });
})();
