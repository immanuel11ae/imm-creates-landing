// imm.creates — shared portfolio project data (real showcase demos only)
var PORTFOLIO_PROJECTS = [
  {
    id: 'cruzo-rental',
    title: 'Cruzo Rental',
    category: 'Landing Page',
    tagline: '1 halaman, fokus konversi untuk bisnis rental kendaraan.',
    image: 'cruzo-rental-hero.webp',
    liveUrl: 'https://immanuel11ae.github.io/cruzo-rental/',
    brief: 'Butuh 1 halaman buat iklan Instagram.',
    process: 'Struktur + copywriting fokus CTA.',
    result: 'Live, terhubung langsung ke WhatsApp.',
    caseStudy: 'Brief awal cuma "butuh halaman buat iklan Instagram". Disusun jadi 1 halaman dengan hierarki jelas: hero, keunggulan, dan CTA WhatsApp yang selalu terlihat.'
  },
  {
    id: 'kopi-ranting',
    title: 'Kopi Ranting',
    category: 'Company Profile',
    tagline: 'Multi-halaman untuk brand kopi lokal — profil, produk, dan cerita brand.',
    image: 'kopi-ranting-hero.webp',
    liveUrl: 'https://immanuel11ae.github.io/kopi-ranting/index.html',
    brief: 'Butuh profil brand yang lengkap.',
    process: 'Multi-halaman + copywriting cerita brand.',
    result: 'Live, siap dipakai jualan.',
    caseStudy: 'Brand kopi lokal butuh lebih dari 1 halaman buat cerita brand + produk. Disusun jadi beberapa halaman dengan alur navigasi yang gak bikin bingung pengunjung.'
  },
  {
    id: 'siakad-cakrawala-bangsa',
    title: 'SIAKAD Cakrawala Bangsa',
    category: 'Sistem Informasi Akademik',
    tagline: 'Portal digital sekolah untuk nilai, jadwal, dan perkembangan siswa.',
    image: 'siakad-cakrawala-bangsa-hero.webp',
    liveUrl: 'https://immanuel11ae.github.io/siakad-cakrawala-bangsa/',
    brief: 'Butuh 1 portal terpusat buat siswa & wali murid pantau nilai/jadwal.',
    process: 'Custom web app + dashboard ringkasan real-time.',
    result: 'Live, siap dipakai sekolah.',
    caseStudy: 'Sekolah butuh 1 portal yang menyatukan akses nilai, jadwal pelajaran, dan info ekstrakurikuler buat siswa & wali murid, tanpa perlu tanya manual ke pihak sekolah.'
  }
];

function openProjectModal(id) {
  var project = PORTFOLIO_PROJECTS.filter(function (p) { return p.id === id; })[0];
  if (!project) return;
  var modal = document.getElementById('project-modal');
  var body = document.getElementById('project-modal-body');
  body.innerHTML =
    '<img src="' + project.image + '" alt="' + project.title + '" class="w-full rounded-t-2xl object-cover" style="max-height:340px;">' +
    '<div class="p-6 sm:p-8 flex flex-col gap-4">' +
      '<div>' +
        '<span class="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded" style="background:rgba(77,142,255,0.15);color:#adc6ff;">' + project.category + '</span>' +
        '<h3 class="text-2xl font-bold text-white mt-2" style="font-family:\'Outfit\',sans-serif;">' + project.title + '</h3>' +
        '<p class="text-xs text-[#94A3B8] mt-1">' + project.tagline + '</p>' +
      '</div>' +
      '<div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">' +
        '<div class="p-3 rounded-xl border border-white/10" style="background:#171b28;"><span class="font-bold text-white block mb-1">Brief</span><span class="text-[#94A3B8]">' + project.brief + '</span></div>' +
        '<div class="p-3 rounded-xl border border-white/10" style="background:#171b28;"><span class="font-bold text-white block mb-1">Proses</span><span class="text-[#94A3B8]">' + project.process + '</span></div>' +
        '<div class="p-3 rounded-xl border border-white/10" style="background:#171b28;"><span class="font-bold text-white block mb-1">Hasil</span><span class="text-[#94A3B8]">' + project.result + '</span></div>' +
      '</div>' +
      '<p class="text-xs text-[#94A3B8] leading-relaxed">' + project.caseStudy + '</p>' +
      '<p class="text-[10px] text-[#8c909f] italic">*Project ini adalah demo/showcase untuk menunjukkan kualitas kerja, bukan project klien berbayar.</p>' +
      '<a href="' + project.liveUrl + '" target="_blank" rel="noopener noreferrer" class="btn-3d btn-primary-3d w-full py-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 mt-2">' +
        '<i data-lucide="external-link" class="w-4 h-4"></i><span>Lihat Live</span>' +
      '</a>' +
    '</div>';
  modal.style.display = 'flex';
  if (window.lucide) lucide.createIcons();
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  document.getElementById('project-modal').style.display = 'none';
  document.body.style.overflow = '';
}
