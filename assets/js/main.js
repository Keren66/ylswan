/* YLSWAN — interactions. No dependencies. */
(function () {
  'use strict';

  var doc = document;
  var body = doc.body;

  /* ---------- year ---------- */
  var yr = doc.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- sticky header state ---------- */
  var hdr = doc.getElementById('hdr');
  function onScrollHdr() {
    if (!hdr) return;
    hdr.classList.toggle('is-stuck', window.scrollY > 12);
  }

  /* ---------- mobile menu ---------- */
  var burger = doc.getElementById('burger');
  var mnav = doc.getElementById('mnav');

  function setMenu(open) {
    body.classList.toggle('menu-open', open);
    if (burger) {
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    doc.documentElement.style.overflow = open ? 'hidden' : '';
  }

  if (burger) {
    burger.addEventListener('click', function () {
      setMenu(!body.classList.contains('menu-open'));
    });
  }
  if (mnav) {
    mnav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
  }
  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && body.classList.contains('menu-open')) {
      setMenu(false);
      if (burger) burger.focus();
    }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 860 && body.classList.contains('menu-open')) setMenu(false);
  });

  /* ---------- scroll reveal ----------
     Deliberately scroll + rAF instead of IntersectionObserver alone:
     IO never fires in some background tabs / embedded webviews, which
     leaves the whole page at opacity:0. */
  var revealables = [].slice.call(doc.querySelectorAll('.rv'));
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function revealCheck() {
    if (reduce) {
      revealables.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var trigger = window.innerHeight - 32;
    for (var i = 0; i < revealables.length; i++) {
      var el = revealables[i];
      if (el.classList.contains('is-in')) continue;
      if (el.getBoundingClientRect().top < trigger) el.classList.add('is-in');
    }
  }

  var ticking = false;
  function onScroll() {
    onScrollHdr();
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      revealCheck();
      ticking = false;
    });
  }

  if (reduce) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  window.addEventListener('load', function () { onScrollHdr(); revealCheck(); });
  onScrollHdr();
  revealCheck();

  /* ---------- FAQ: one open at a time ---------- */
  var qas = [].slice.call(doc.querySelectorAll('.qa'));
  qas.forEach(function (qa) {
    qa.addEventListener('toggle', function () {
      if (!qa.open) return;
      qas.forEach(function (other) {
        if (other !== qa && other.open) other.open = false;
      });
    });
  });

  /* ---------- contact form (no backend: animated confirmation) ---------- */
  var form = doc.getElementById('contactForm');
  var status = doc.getElementById('formStatus');

  function fieldOf(input) { return input.closest('.field'); }
  function mark(input, bad) { fieldOf(input).classList.toggle('has-error', bad); }

  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); }

  if (form) {
    var inputs = [].slice.call(form.querySelectorAll('input[required], textarea[required]'));

    inputs.forEach(function (input) {
      input.addEventListener('input', function () {
        if (input.type === 'email') {
          mark(input, input.value.trim() !== '' && !validEmail(input.value));
        } else {
          mark(input, false);
        }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      var firstBad = null;

      inputs.forEach(function (input) {
        var v = input.value.trim();
        var bad = input.type === 'email' ? !validEmail(v) : v.length < 2;
        if (input.id === 'f-msg') bad = v.length < 8;
        mark(input, bad);
        if (bad && !firstBad) firstBad = input;
        if (bad) ok = false;
      });

      if (!ok) {
        if (status) {
          status.className = 'form__status';
          status.textContent = '';
        }
        if (firstBad) firstBad.focus();
        return;
      }

      form.classList.add('is-sending');
      var label = form.querySelector('.btn__label');
      var original = label ? label.textContent : '';
      if (label) label.textContent = 'Sending';
      if (status) { status.className = 'form__status'; status.textContent = ''; }

      window.setTimeout(function () {
        form.classList.remove('is-sending');
        if (label) label.textContent = original || 'Send enquiry';
        if (status) {
          status.className = 'form__status is-ok';
          status.textContent = 'Sent. We\'ll reply within two business days.';
        }
        form.reset();
      }, 1500);
    });
  }
})();
