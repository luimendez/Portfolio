// Alphanation demo: on computers and tablets, demo buttons open a QR code to continue on a
// phone (the app is built for touch and swipe). Phones open the demo directly.
(function () {
  var links = document.querySelectorAll('[data-demo-qr]');
  if (!links.length || typeof HTMLDialogElement === 'undefined') return;
  var desktop = window.matchMedia('(min-width: 700px) and (min-height: 600px)');
  var url = links[0].href;
  var shortUrl = url.replace(/^https?:\/\//, '');

  var dlg = document.createElement('dialog');
  dlg.className = 'demo-qr-modal';
  dlg.setAttribute('aria-labelledby', 'dq-title');
  dlg.innerHTML =
    '<button type="button" class="dq-close" aria-label="Close">&times;</button>' +
    '<div class="dq-body">' +
      '<p class="dq-eyebrow">Alphanation demo</p>' +
      '<h2 class="dq-title" id="dq-title">Try it on your phone</h2>' +
      '<img class="dq-code" src="images/alphanation-demo-qr.svg" width="232" height="232" alt="QR code that opens ' + shortUrl + '">' +
      '<p class="dq-text">Built for touch and swipe, like the native app it’s becoming. Point your phone’s camera at the code.</p>' +
      '<span class="dq-url">' + shortUrl + '</span>' +
    '</div>' +
    '<a class="dq-fallback" href="' + url + '" target="_blank" rel="noopener">Open in this browser anyway &#8599;<span class="visually-hidden"> (opens in a new tab)</span></a>';
  document.body.appendChild(dlg);

  var opener = null;
  links.forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (!desktop.matches || e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      opener = a;
      dlg.showModal();
      dlg.querySelector('.dq-close').focus();
    });
  });
  dlg.querySelector('.dq-close').addEventListener('click', function () { dlg.close(); });
  dlg.querySelector('.dq-fallback').addEventListener('click', function () { dlg.close(); });
  // Click on the dimmed backdrop closes it
  dlg.addEventListener('click', function (e) {
    var r = dlg.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dlg.close();
  });
  dlg.addEventListener('close', function () { if (opener) opener.focus(); });
})();
