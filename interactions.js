document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Cursor-reactive glow (follows mouse anywhere on the page) ---------- */
  var glow = document.getElementById('cursorGlow');
  if (glow && window.matchMedia('(hover: hover)').matches) {
    var gx = -999, gy = -999, sx = -999, sy = -999;
    document.addEventListener('mousemove', function (e) {
      gx = e.clientX;
      gy = e.clientY;
      glow.classList.add('active');
    });
    document.addEventListener('mouseleave', function () {
      glow.classList.remove('active');
    });
    (function loop() {
      sx += (gx - sx) * 0.12;
      sy += (gy - sy) * 0.12;
      glow.style.transform = 'translate3d(' + sx + 'px,' + sy + 'px,0)';
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- Click color-flash on links/buttons ---------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('a, button, .btn');
    if (!el) return;
    el.classList.remove('btn-flash');
    // force reflow so the animation can restart on repeated clicks
    void el.offsetWidth;
    el.classList.add('btn-flash');
    el.addEventListener('animationend', function handler() {
      el.classList.remove('btn-flash');
      el.removeEventListener('animationend', handler);
    });
  });

  /* ---------- Tilt effect for cards ---------- */
  var tiltEls = document.querySelectorAll('.tilt');
  tiltEls.forEach(function (el) {
    el.addEventListener('mousemove', function (e) {
      var rect = el.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width - 0.5;
      var py = (e.clientY - rect.top) / rect.height - 0.5;
      var rotY = px * 8;
      var rotX = py * -8;
      el.style.transform = 'perspective(700px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) translateZ(0)';
    });
    el.addEventListener('mouseleave', function () {
      el.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    });
  });
});
