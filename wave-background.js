// imm.creates — wave + particle canvas background (versi ringan)
// Perubahan utama vs versi lama:
// - Tanpa ctx.shadowBlur (penyebab utama long task); glow dibuat dengan stroke tebal transparan
// - Background gradient statis di-cache sekali di offscreen canvas, bukan digambar ulang tiap frame
// - Batas 30 fps, DPR 1, partikel lebih sedikit (lebih sedikit lagi di HP)
// - Frame statis langsung digambar; animasi baru mulai SETELAH halaman selesai dimuat
// - Berhenti saat tab tersembunyi; mati total jika pengguna memilih "reduce motion"
(function () {
  var canvas = document.getElementById('wave-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return;

  var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  var width = 0, height = 0, isMobile = false;
  var time = 0;
  var lastTimestamp = 0;
  var lastDraw = 0;
  var FRAME_INTERVAL = 1000 / 30;
  var rafId = null;
  var running = false;
  var pageLoaded = false;

  var particleColors = [
    'rgba(77, 142, 255, ',
    'rgba(56, 189, 248, ',
    'rgba(168, 85, 247, ',
    'rgba(236, 106, 6, ',
    'rgba(208, 188, 255, '
  ];
  var particles = [];

  // Background statis (gradient + glow) — digambar sekali, lalu di-blit tiap frame
  var bgCanvas = document.createElement('canvas');
  var bgCtx = bgCanvas.getContext('2d');

  var waveLayers = [
    { y: 0.58, freq: 0.0018, amp: 0.09,  speed: 0.45, phase: 0.0, fill: ['rgba(87, 27, 193, 0.22)', 'rgba(87, 27, 193, 0.04)'],   stroke: 'rgba(168, 85, 247, 0.65)', w: 2.5, glow: 'rgba(168, 85, 247, 0.5)', harm: true },
    { y: 0.65, freq: 0.0022, amp: 0.07,  speed: 0.55, phase: 2.8, fill: ['rgba(236, 106, 6, 0.14)', 'rgba(236, 106, 6, 0.02)'],   stroke: 'rgba(255, 182, 144, 0.75)', w: 2.0, glow: 'rgba(236, 106, 6, 0.6)',  harm: true },
    { y: 0.46, freq: 0.0026, amp: 0.085, speed: 0.65, phase: 1.2, fill: ['rgba(56, 189, 248, 0.18)', 'rgba(56, 189, 248, 0.02)'], stroke: 'rgba(56, 189, 248, 0.85)',  w: 3.0, glow: 'rgba(56, 189, 248, 0.7)', harm: true },
    { y: 0.52, freq: 0.0031, amp: 0.075, speed: 0.50, phase: 4.1, fill: ['rgba(77, 142, 255, 0.20)', 'rgba(77, 142, 255, 0.03)'], stroke: 'rgba(173, 198, 255, 0.90)', w: 3.5, glow: 'rgba(77, 142, 255, 0.8)', harm: true },
    { y: 0.38, freq: 0.0036, amp: 0.045, speed: 0.80, phase: 3.4, fill: ['rgba(208, 188, 255, 0.08)', 'rgba(208, 188, 255, 0.0)'], stroke: 'rgba(208, 188, 255, 0.65)', w: 1.5, glow: 'rgba(208, 188, 255, 0.5)', harm: false }
  ];

  function initParticles(w, h) {
    var count = isMobile ? 14 : 26;
    particles.length = 0;
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2.2 + 0.8,
        baseAlpha: Math.random() * 0.4 + 0.2,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
        color: particleColors[Math.floor(Math.random() * particleColors.length)]
      });
    }
  }

  function buildBackground() {
    bgCanvas.width = width;
    bgCanvas.height = height;

    var bgGrad = bgCtx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#0a0e1a');
    bgGrad.addColorStop(0.5, '#0f131f');
    bgGrad.addColorStop(1, '#070a12');
    bgCtx.fillStyle = bgGrad;
    bgCtx.fillRect(0, 0, width, height);

    var blueGlow = bgCtx.createRadialGradient(width * 0.75, height * 0.25, 10, width * 0.75, height * 0.25, width * 0.6);
    blueGlow.addColorStop(0, 'rgba(77, 142, 255, 0.10)');
    blueGlow.addColorStop(0.5, 'rgba(87, 27, 193, 0.05)');
    blueGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    bgCtx.fillStyle = blueGlow;
    bgCtx.fillRect(0, 0, width, height);

    var orangeGlow = bgCtx.createRadialGradient(width * 0.2, height * 0.75, 10, width * 0.2, height * 0.75, width * 0.5);
    orangeGlow.addColorStop(0, 'rgba(236, 106, 6, 0.08)');
    orangeGlow.addColorStop(0.6, 'rgba(236, 106, 6, 0.01)');
    orangeGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    bgCtx.fillStyle = orangeGlow;
    bgCtx.fillRect(0, 0, width, height);
  }

  function drawWaveLayer(L) {
    var yMid = height * L.y;
    var amp = height * L.amp;
    var step = Math.max(10, Math.floor(width / 90));
    var xs = [], ys = [];
    var x, y, i;

    for (x = 0; x <= width + step; x += step) {
      y = yMid + Math.sin(x * L.freq + time * L.speed + L.phase) * amp;
      if (L.harm) {
        y += Math.cos(x * (L.freq * 0.5) - time * (L.speed * 0.7) + L.phase * 1.3) * (amp * 0.45);
        y += Math.sin(x * (L.freq * 1.8) + time * (L.speed * 1.2) + L.phase * 0.5) * (amp * 0.18);
      }
      xs.push(x);
      ys.push(y);
    }

    // Isi gelombang
    ctx.beginPath();
    ctx.moveTo(0, height);
    for (i = 0; i < xs.length; i++) ctx.lineTo(xs[i], ys[i]);
    ctx.lineTo(width, height);
    ctx.closePath();
    var fillGrad = ctx.createLinearGradient(0, yMid - amp * 1.5, 0, height);
    fillGrad.addColorStop(0, L.fill[0]);
    fillGrad.addColorStop(0.7, L.fill[1]);
    fillGrad.addColorStop(1, 'rgba(15, 19, 31, 0.0)');
    ctx.fillStyle = fillGrad;
    ctx.fill();

    // Garis atas
    ctx.beginPath();
    ctx.moveTo(xs[0], ys[0]);
    for (i = 1; i < xs.length; i++) ctx.lineTo(xs[i], ys[i]);

    // Glow palsu: stroke tebal & transparan (jauh lebih murah dari shadowBlur)
    ctx.globalAlpha = 0.22;
    ctx.strokeStyle = L.glow;
    ctx.lineWidth = L.w + 7;
    ctx.stroke();

    ctx.globalAlpha = 1;
    ctx.strokeStyle = L.stroke;
    ctx.lineWidth = L.w;
    ctx.stroke();
  }

  function drawParticles(f) {
    var threshold = 85;
    var i, j, p, p2, dx, dy, dist, a;

    for (i = 0; i < particles.length; i++) {
      p = particles[i];
      p.x += p.vx * f;
      p.y += p.vy * f;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      p.pulsePhase += p.pulseSpeed * f;
      a = p.baseAlpha * (0.6 + 0.4 * Math.sin(p.pulsePhase));

      // glow kecil (lingkaran besar transparan) + inti
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = p.color + (a * 0.18) + ')';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color + a + ')';
      ctx.fill();

      for (j = i + 1; j < particles.length; j++) {
        p2 = particles[j];
        dx = p.x - p2.x;
        dy = p.y - p2.y;
        dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < threshold) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = 'rgba(173, 198, 255, ' + ((1 - dist / threshold) * 0.18) + ')';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function drawFrame(f) {
    ctx.drawImage(bgCanvas, 0, 0);
    // di HP, lapisan paling tipis dilewati untuk menghemat kerja
    var count = isMobile ? waveLayers.length - 1 : waveLayers.length;
    for (var i = 0; i < count; i++) drawWaveLayer(waveLayers[i]);
    drawParticles(f);
  }

  function render(now) {
    if (!running) return;
    rafId = requestAnimationFrame(render);

    if (now - lastDraw < FRAME_INTERVAL - 2) return;
    var delta = Math.min((now - lastTimestamp) / 1000, 0.1);
    lastTimestamp = now;
    lastDraw = now;
    time += delta;
    drawFrame(delta * 60);
  }

  function start() {
    if (running || reduceMotion || !pageLoaded || document.hidden) return;
    running = true;
    lastTimestamp = performance.now();
    lastDraw = 0;
    rafId = requestAnimationFrame(render);
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  }

  function handleResize() {
    var parent = canvas.parentElement;
    var w = (parent && parent.clientWidth) || window.innerWidth;
    var h = (parent && parent.clientHeight) || window.innerHeight;

    // Abaikan perubahan tinggi kecil (address bar HP yang naik-turun saat scroll)
    if (width && w === width && Math.abs(h - height) < 150) return;

    width = w;
    height = h;
    var nowMobile = width < 768;

    canvas.width = width;
    canvas.height = height;

    if (particles.length === 0 || nowMobile !== isMobile) {
      isMobile = nowMobile;
      initParticles(width, height);
    }
    isMobile = nowMobile;

    buildBackground();
    drawFrame(0); // frame statis langsung tampil, tanpa menunggu animasi
  }

  var resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 150);
  });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else start();
  });

  handleResize();

  // Mulai animasi hanya setelah halaman selesai dimuat -> tidak mengganggu FCP/LCP/TBT
  function onLoaded() {
    pageLoaded = true;
    setTimeout(start, 800);
  }
  if (document.readyState === 'complete') onLoaded();
  else window.addEventListener('load', onLoaded);
})();
