// imm.creates — shared pricing/services data used by layanan.html
var WHATSAPP_NUMBER = '6287888865680';

var SERVICE_PACKAGES = [
  {
    id: 'landing-page',
    name: 'Landing Page Sales Turbo',
    tagline: 'Fokus 100% pada konversi penjualan & chat WhatsApp',
    badge: 'Paling Cepat Siap',
    price: 999000,
    originalPrice: 1500000,
    duration: '3 - 4 Hari Kerja',
    popular: false,
    features: [
      { text: '1 Halaman Responsif Custom (Desktop & Mobile)', included: true, highlight: true },
      { text: 'Struktur Copywriting Persuasif & Hook Jualan', included: true, highlight: true },
      { text: 'Tombol 1-Click WhatsApp Booking / Order Otomatis', included: true, highlight: true },
      { text: 'Optimasi Speed Super Cepat (< 1.5 detik)', included: true },
      { text: 'Gratis Domain .my.id + SSL & Hosting 1 Tahun', included: true, highlight: true },
      { text: 'Integrasi Meta Pixel & Google Analytics', included: true },
      { text: 'Halaman Tambahan / Blog Multi-halaman', included: false },
      { text: 'Sistem Pembayaran Payment Gateway Otomatis', included: false }
    ]
  },
  {
    id: 'company-profile',
    name: 'Company Profile Bisnis PRO',
    tagline: 'Tingkatkan kredibilitas & trust brand perusahaan',
    badge: 'Terpopuler & Recommended',
    price: 1850000,
    originalPrice: 2800000,
    duration: '5 - 7 Hari Kerja',
    popular: true,
    features: [
      { text: 'Hingga 5 Halaman Custom (Home, About, Layanan, Portofolio, Kontak)', included: true, highlight: true },
      { text: 'Desain UI/UX Eksklusif sesuai Brand Identity', included: true, highlight: true },
      { text: 'Struktur SEO On-Page Lengkap untuk Google Rank', included: true, highlight: true },
      { text: 'Gratis Domain .com (1 Tahun) + SSL & Hosting', included: true, highlight: true },
      { text: 'Katalog Layanan & Showcase Galeri Dinamis', included: true },
      { text: 'Formulir Kontak & Permintaan Penawaran Terhubung ke Email/WA', included: true },
      { text: 'Integrasi Google Maps, FAQ Interaktif, & Testimonial Slider', included: true },
      { text: 'Gratis Email Bisnis (nama@perusahaan.com)', included: true }
    ]
  },
  {
    id: 'ecommerce-catalog',
    name: 'E-Commerce & Katalog Digital',
    tagline: 'Katalog produk modern dengan alur belanja anti-ribet',
    badge: 'Fitur Paling Lengkap',
    price: 2950000,
    originalPrice: 4200000,
    duration: '7 - 10 Hari Kerja',
    popular: false,
    features: [
      { text: 'Katalog Produk Multi-Kategori (Hingga 50 Produk Awal Diinputkan)', included: true, highlight: true },
      { text: 'Filter Produk (Harga, Varian Ukuran, Warna, Kategori)', included: true, highlight: true },
      { text: 'Sistem Keranjang Belanja & Checkout WhatsApp Otomatis', included: true, highlight: true },
      { text: 'Gratis Domain .com + SSL & Hosting Server Aktif 1 Tahun', included: true, highlight: true },
      { text: 'Opsi Integrasi Payment Gateway (QRIS, VA Bank, E-Wallet)', included: true },
      { text: 'Kalkulator Ongkos Kirim Otomatis (JNE, J&T, SiCepat)', included: true },
      { text: 'Panel Dashboard Admin untuk Kelola Stok & Pesanan', included: true }
    ]
  },
  {
    id: 'custom-webapp',
    name: 'Custom Web Application',
    tagline: 'Solusi sistem & aplikasi kustom untuk alur kerja unik',
    badge: 'Enterprise / Custom',
    price: 6000000,
    originalPrice: 8500000,
    duration: '10 - 18 Hari Kerja',
    popular: false,
    features: [
      { text: 'Fullstack Custom Development (React/Next.js + Node/Database)', included: true, highlight: true },
      { text: 'Gratis Domain .com + SSL & Hosting Cloud/VPS 1 Tahun', included: true, highlight: true },
      { text: 'Sistem Autentikasi Pengguna & Role Based Access', included: true },
      { text: 'Integrasi Database Cloud Real-time & API Eksternal', included: true, highlight: true },
      { text: 'Dasbor Analitik & Laporan Interaktif', included: true },
      { text: 'Arsitektur Scalable & Keamanan Data Enkripsi', included: true }
    ]
  }
];

var SERVICE_ADDONS = [
  {
    id: 'addon-hosting-upgrade',
    name: 'Upgrade Hosting Cloud SSD NVMe Premium (per Tahun)',
    price: 1800000,
    description: 'Server dedicated resource + SSD NVMe untuk traffic tinggi & toko online aktif. Biaya ini berlaku per tahun mengikuti biaya hosting cloud, bukan biaya sekali bayar.'
  },
  {
    id: 'addon-domain-upgrade',
    name: 'Ganti Ekstensi Domain ke .ID / .CO.ID (per Tahun)',
    price: 380000,
    description: 'Upgrade dari domain default ke ekstensi lokal .ID atau .CO.ID yang lebih premium & terpercaya untuk badan usaha resmi. Biaya ini berlaku per tahun mengikuti biaya perpanjangan domain, bukan biaya sekali bayar.'
  },
  {
    id: 'addon-copywriting',
    name: 'Copywriting Persuasif & Storytelling Brand',
    price: 350000,
    description: 'Penulisan headline, deskripsi produk, benefit points, dan CTA persuasif oleh copywriter profesional.'
  },
  {
    id: 'addon-ai-ugc-pack',
    name: 'Paket 3 Video AI-UGC Ads Iklan TikTok/Reels',
    price: 600000,
    description: '3 variasi video iklan pendek gaya UGC dengan AI avatar natural, hook jualan kuat, dan background musik trending.'
  },
  {
    id: 'addon-seo-pro',
    name: 'Paket SEO Pro & Google Search Console Setup',
    price: 400000,
    description: 'Riset kata kunci lokal, metadata schema JSON-LD, sitemap indexing, dan setup Google Profil Bisnis.'
  },
  {
    id: 'addon-maintenance',
    name: 'Maintenance Bulanan & Update Konten (3 Bulan)',
    price: 450000,
    description: 'Backup rutin mingguan, update plugin & keamanan, serta pergantian teks/foto banner hingga 4x per bulan.'
  }
];
