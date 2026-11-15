// imm.creates — ikon ringan (pengganti lucide dari CDN). Hanya berisi ikon yang dipakai situs.
// Menyediakan window.lucide.createIcons() dengan perilaku yang sama: <i data-lucide="nama"> -> <svg>.
(function () {
  var ICONS = {"arrow-right":"<path d=\"M5 12h14\" /> <path d=\"m12 5 7 7-7 7\" />","arrow-up-right":"<path d=\"M7 7h10v10\" /> <path d=\"M7 17 17 7\" />","calculator":"<rect width=\"16\" height=\"20\" x=\"4\" y=\"2\" rx=\"2\" /> <line x1=\"8\" x2=\"16\" y1=\"6\" y2=\"6\" /> <line x1=\"16\" x2=\"16\" y1=\"14\" y2=\"18\" /> <path d=\"M16 10h.01\" /> <path d=\"M12 10h.01\" /> <path d=\"M8 10h.01\" /> <path d=\"M12 14h.01\" /> <path d=\"M8 14h.01\" /> <path d=\"M12 18h.01\" /> <path d=\"M8 18h.01\" />","check":"<path d=\"M20 6 9 17l-5-5\" />","check-circle-2":"<circle cx=\"12\" cy=\"12\" r=\"10\" /> <path d=\"m9 12 2 2 4-4\" />","chevron-down":"<path d=\"m6 9 6 6 6-6\" />","clock":"<circle cx=\"12\" cy=\"12\" r=\"10\" /> <polyline points=\"12 6 12 12 16 14\" />","external-link":"<path d=\"M15 3h6v6\" /> <path d=\"M10 14 21 3\" /> <path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\" />","layers":"<path d=\"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z\" /> <path d=\"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12\" /> <path d=\"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17\" />","menu":"<line x1=\"4\" x2=\"20\" y1=\"12\" y2=\"12\" /> <line x1=\"4\" x2=\"20\" y1=\"6\" y2=\"6\" /> <line x1=\"4\" x2=\"20\" y1=\"18\" y2=\"18\" />","message-circle":"<path d=\"M7.9 20A9 9 0 1 0 4 16.1L2 22Z\" />","move-horizontal":"<path d=\"m18 8 4 4-4 4\" /> <path d=\"M2 12h20\" /> <path d=\"m6 8-4 4 4 4\" />","play":"<polygon points=\"6 3 20 12 6 21 6 3\" />","send":"<path d=\"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z\" /> <path d=\"m21.854 2.147-10.94 10.939\" />","shield-check":"<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\" /> <path d=\"m9 12 2 2 4-4\" />","sparkles":"<path d=\"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z\" /> <path d=\"M20 3v4\" /> <path d=\"M22 5h-4\" /> <path d=\"M4 17v2\" /> <path d=\"M5 18H3\" />","trending-up":"<polyline points=\"22 7 13.5 15.5 8.5 10.5 2 17\" /> <polyline points=\"16 7 22 7 22 13\" />","user":"<path d=\"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2\" /> <circle cx=\"12\" cy=\"7\" r=\"4\" />","x":"<path d=\"M18 6 6 18\" /> <path d=\"m6 6 12 12\" />","zap":"<path d=\"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z\" />"};
  function createIcons() {
    var nodes = document.querySelectorAll('[data-lucide]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var name = el.getAttribute('data-lucide');
      var inner = ICONS[name];
      if (!inner) continue;
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      var attrs = { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true', focusable: 'false' };
      for (var k in attrs) svg.setAttribute(k, attrs[k]);
      for (var a = 0; a < el.attributes.length; a++) {
        var at = el.attributes[a];
        if (at.name === 'data-lucide' || at.name === 'class') continue;
        svg.setAttribute(at.name, at.value);
      }
      svg.setAttribute('class', ('lucide lucide-' + name + ' ' + (el.getAttribute('class') || '')).trim());
      svg.innerHTML = inner;
      if (el.parentNode) el.parentNode.replaceChild(svg, el);
    }
  }
  window.lucide = { createIcons: createIcons };
})();
