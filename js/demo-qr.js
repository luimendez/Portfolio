// "Best on your phone" QR pop-up. Opens on hover or click, positions itself
// in the viewport (so rounded cards can't clip it), closes on Escape or outside click.
(function () {
  document.querySelectorAll('.demo-qr').forEach(function (wrap) {
    var btn = wrap.querySelector('.demo-qr-toggle');
    var pop = wrap.querySelector('.demo-qr-pop');
    if (!btn || !pop) return;
    document.body.appendChild(pop);           // escape any overflow:hidden parent
    var pinned = false, hideTimer = 0;

    function place() {
      var r = btn.getBoundingClientRect(), w = pop.offsetWidth, h = pop.offsetHeight, gap = 12;
      var left = Math.min(Math.max(8, r.left + r.width / 2 - w / 2), window.innerWidth - w - 8);
      var below = r.top - h - gap < 8;
      pop.classList.toggle('is-below', below);
      pop.style.left = left + 'px';
      pop.style.top = (below ? r.bottom + gap : r.top - h - gap) + 'px';
      pop.style.setProperty('--arrow-x', (r.left + r.width / 2 - left) + 'px');
    }
    function open() {
      clearTimeout(hideTimer);
      pop.hidden = false;
      place();
      pop.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
    }
    function close() {
      pinned = false;
      pop.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      hideTimer = setTimeout(function () { pop.hidden = true; }, 200);
    }
    function softClose() { if (!pinned) hideTimer = setTimeout(close, 180); }

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (pinned) { close(); } else { pinned = true; open(); }
    });
    if (window.matchMedia('(hover: hover)').matches) {
      btn.addEventListener('mouseenter', open);
      btn.addEventListener('mouseleave', softClose);
      pop.addEventListener('mouseenter', function () { clearTimeout(hideTimer); });
      pop.addEventListener('mouseleave', softClose);
    }
    btn.addEventListener('focus', function () { if (btn.matches(':focus-visible')) open(); });
    btn.addEventListener('blur', function () { if (!pinned) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && pop.classList.contains('is-open')) { close(); btn.focus(); } });
    document.addEventListener('click', function (e) { if (pinned && !wrap.contains(e.target) && !pop.contains(e.target)) close(); });
    window.addEventListener('scroll', function () { if (pop.classList.contains('is-open')) place(); }, { passive: true });
    window.addEventListener('resize', function () { if (pop.classList.contains('is-open')) place(); });
  });
})();
