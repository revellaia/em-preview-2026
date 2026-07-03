// Mondadori Advocacia - Modelo B (Editorial Legal Boutique). No backend calls.
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
      var f = overlay.querySelector('a, button, input, select, textarea');
      if (f) f.focus();
    }
    function close() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
    openers.forEach(function (el) { el.addEventListener('click', open); });
    closers.forEach(function (el) { el.addEventListener('click', close); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && overlay.classList.contains('open')) close(); });
    overlay.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var focusables = Array.prototype.slice.call(overlay.querySelectorAll('a, button, input, select, textarea'))
        .filter(function (el) { return !el.hasAttribute('hidden') && el.offsetParent !== null; });
      if (!focusables.length) return;
      var first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    overlay.querySelectorAll('[data-instagram-link]').forEach(function (el) { el.href = INSTAGRAM_URL; });
  }

  // Reveal por IntersectionObserver - a classe 'reveal-ready' ja foi aplicada
  // ao <html> inline no <head> (antes do primeiro paint), entao nao ha flash.
  function initReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in-view'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -10% 0px' });
    items.forEach(function (el) { observer.observe(el); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
    initModal();
    initReveal();
  });
})();
