// imm.creates — wave + particle canvas background
// Port of the React WaveBackground component to vanilla JS.
(function () {
  var canvas = document.getElementById('wave-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return;

  var speedMultiplier = 1.0; // 'balanced' intensity
  var width = 0, height = 0, dpr = 1;

  var particleColors = [
    'rgba(77, 142, 255, ',
    'rgba(56, 189, 248, ',
    'rgba(168, 85, 247, ',
    'rgba(236, 106, 6, ',
    'rgba(208, 188, 255, '
  ];

  var particleCount = 45;
  var particles = [];

  function initParticles(w, h) {
    particles.length = 0;
    for (var i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4 * speedMultiplier,
        vy: (Math.random() - 0.5) * 0.3 * speedMultiplier,
        size: Math.random() * 2.2 + 0.8,
        baseAlpha: Math.random() * 0.4 + 0.2,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
        color: particleColors[Math.floor(Math.random() * particleColors.length)]
      });
    }
  }

  function handleResize() {
    var parent = canvas.parentElement;
    width = (parent && parent.clientWidth) || window.innerWidth;
    height = (parent && parent.clientHeight) || window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.scale(dpr, dpr);

    if (particles.length === 0) initParticles(width, height);
  }

  handleResize();
  window.addEventListener('resize', handleResize);

  var time = 0;
  var lastTimestamp = performance.now();

  function drawWaveLayer(baseYRatio, freq, amp, speed, phase, fillColors, strokeColor, strokeWidth, glowColor, harmonics) {
    if (harmonics === undefined) harmonics = true;
    var yMid = height * baseYRatio;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, height);

    var step = Math.max(6, Math.floor(width / 180));
    var x, y;
    for (x = 0; x <= width + step; x += step) {
      y = yMid + Math.sin(x * freq + time * speed + phase) * amp;
      if (harmonics) {
        y += Math.cos(x * (freq * 0.5) - time * (speed * 0.7) + phase * 1.3) * (amp * 0.45);
        y += Math.sin(x * (freq * 1.8) + time * (speed * 1.2) + phase * 0.5) * (amp * 0.18);
      }
      ctx.lineTo(x, y);
    }

    ctx.lineTo(width, height);
    ctx.closePath();

    var fillGrad = ctx.createLinearGradient(0, yMid - amp * 1.5, 0, height);
    fillGrad.addColorStop(0, fillColors[0]);
    fillGrad.addColorStop(0.7, fillColors[1]);
    fillGrad.addColorStop(1, 'rgba(15, 19, 31, 0.0)');
    ctx.fillStyle = fillGrad;
    ctx.fill();

    ctx.beginPath();
    for (x = 0; x <= width + step; x += step) {
      y = yMid + Math.sin(x * freq + time * speed + phase) * amp;
      if (harmonics) {
        y += Math.cos(x * (freq * 0.5) - time * (speed * 0.7) + phase * 1.3) * (amp * 0.45);
        y += Math.sin(x * (freq * 1.8) + time * (speed * 1.2) + phase * 0.5) * (amp * 0.18);
      }
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 18;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
    ctx.restore();
  }

  function render(now) {
    var delta = Math.min((now - lastTimestamp) / 1000, 0.1);
    lastTimestamp = now;
    time += delta * speedMultiplier;

    var bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#0a0e1a');
    bgGrad.addColorStop(0.5, '#0f131f');
    bgGrad.addColorStop(1, '#070a12');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    var blueGlow = ctx.createRadialGradient(width * 0.75, height * 0.25, 10, width * 0.75, height * 0.25, width * 0.6);
    blueGlow.addColorStop(0, 'rgba(77, 142, 255, 0.10)');
    blueGlow.addColorStop(0.5, 'rgba(87, 27, 193, 0.05)');
    blueGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = blueGlow;
    ctx.fillRect(0, 0, width, height);

    var orangeGlow = ctx.createRadialGradient(width * 0.2, height * 0.75, 10, width * 0.2, height * 0.75, width * 0.5);
    orangeGlow.addColorStop(0, 'rgba(236, 106, 6, 0.08)');
    orangeGlow.addColorStop(0.6, 'rgba(236, 106, 6, 0.01)');
    orangeGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = orangeGlow;
    ctx.fillRect(0, 0, width, height);

    drawWaveLayer(0.58, 0.0018, height * 0.09, 0.45, 0.0,
      ['rgba(87, 27, 193, 0.22)', 'rgba(87, 27, 193, 0.04)'],
      'rgba(168, 85, 247, 0.65)', 2.5, 'rgba(168, 85, 247, 0.5)');

    drawWaveLayer(0.65, 0.0022, height * 0.07, 0.55, 2.8,
      ['rgba(236, 106, 6, 0.14)', 'rgba(236, 106, 6, 0.02)'],
      'rgba(255, 182, 144, 0.75)', 2.0, 'rgba(236, 106, 6, 0.6)');

    drawWaveLayer(0.46, 0.0026, height * 0.085, 0.65, 1.2,
      ['rgba(56, 189, 248, 0.18)', 'rgba(56, 189, 248, 0.02)'],
      'rgba(56, 189, 248, 0.85)', 3.0, 'rgba(56, 189, 248, 0.7)');

    drawWaveLayer(0.52, 0.0031, height * 0.075, 0.50, 4.1,
      ['rgba(77, 142, 255, 0.20)', 'rgba(77, 142, 255, 0.03)'],
      'rgba(173, 198, 255, 0.90)', 3.5, 'rgba(77, 142, 255, 0.8)');

    drawWaveLayer(0.38, 0.0036, height * 0.045, 0.80, 3.4,
      ['rgba(208, 188, 255, 0.08)', 'rgba(208, 188, 255, 0.0)'],
      'rgba(208, 188, 255, 0.65)', 1.5, 'rgba(208, 188, 255, 0.5)', false);

    var particleDistanceThreshold = 85;
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      p.pulsePhase += p.pulseSpeed;
      var currentAlpha = p.baseAlpha * (0.6 + 0.4 * Math.sin(p.pulsePhase));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color + currentAlpha + ')';
      ctx.shadowColor = p.color + '0.8)';
      ctx.shadowBlur = 8;
      ctx.fill();

      for (var j = i + 1; j < particles.length; j++) {
        var p2 = particles[j];
        var dx = p.x - p2.x;
        var dy = p.y - p2.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < particleDistanceThreshold) {
          var lineAlpha = (1 - dist / particleDistanceThreshold) * 0.18;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = 'rgba(173, 198, 255, ' + lineAlpha + ')';
          ctx.lineWidth = 0.8;
          ctx.shadowBlur = 0;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
})();
