document.addEventListener('DOMContentLoaded', function () {
  var hero = document.getElementById('spotHero');
  var reveal = document.getElementById('spotReveal');
  var canvas = document.getElementById('spotCanvas');
  if (!hero || !reveal || !canvas) return;

  var navEl = document.querySelector('.nav');

  function fitHeroToScreen() {
    var navH = navEl ? navEl.offsetHeight : 0;
    hero.style.minHeight = 'calc(100vh - ' + navH + 'px)';
    hero.style.minHeight = 'calc(100dvh - ' + navH + 'px)';
  }
  fitHeroToScreen();
  window.addEventListener('resize', fitHeroToScreen);

  var ctx = canvas.getContext('2d');
  var SPOTLIGHT_R = 260;

  var mouse = { x: -999, y: -999 };
  var smooth = { x: -999, y: -999 };
  var rafId = null;

  function resizeCanvas() {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  hero.addEventListener('mousemove', function (e) {
    var rect = hero.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  hero.addEventListener('mouseleave', function () {
    mouse.x = -999;
    mouse.y = -999;
  });

  // touch support: reveal follows the first touch point
  hero.addEventListener('touchmove', function (e) {
    if (!e.touches || !e.touches[0]) return;
    var rect = hero.getBoundingClientRect();
    mouse.x = e.touches[0].clientX - rect.left;
    mouse.y = e.touches[0].clientY - rect.top;
  }, { passive: true });

  function loop() {
    smooth.x += (mouse.x - smooth.x) * 0.1;
    smooth.y += (mouse.y - smooth.y) * 0.1;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var grad = ctx.createRadialGradient(smooth.x, smooth.y, 0, smooth.x, smooth.y, SPOTLIGHT_R);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.4, 'rgba(255,255,255,1)');
    grad.addColorStop(0.6, 'rgba(255,255,255,0.75)');
    grad.addColorStop(0.75, 'rgba(255,255,255,0.4)');
    grad.addColorStop(0.88, 'rgba(255,255,255,0.12)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(smooth.x, smooth.y, SPOTLIGHT_R, 0, Math.PI * 2);
    ctx.fill();

    var mask = 'url(' + canvas.toDataURL() + ')';
    reveal.style.maskImage = mask;
    reveal.style.webkitMaskImage = mask;
    reveal.style.maskSize = '100% 100%';
    reveal.style.webkitMaskSize = '100% 100%';

    rafId = requestAnimationFrame(loop);
  }
  loop();
});
