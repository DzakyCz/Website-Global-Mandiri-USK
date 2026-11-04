export const businessUnits = [
  { name: 'Perdagangan Minyak Nilam', category: 'Nilam', image: '/Images/bidang/nilam.jpeg' },
  { name: 'Produk Turunan Nilam', category: 'Nilam', image: '/Images/bidang/produk.png' },
  { name: 'Digital Printing', category: 'Kreatif & Pemasaran', image: '/Images/bidang/print.png' },
  { name: 'Layanan Konsultasi', category: 'Layanan & Jasa', image: '/Images/bidang/layanan-konsultasi.jpg' },
  { name: 'Event Organizer', category: 'Layanan & Jasa', image: '/Images/bidang/event-organizer.jpg' },
  { name: 'Distribusi Internet FWA', category: 'Layanan & Jasa', image: '/Images/bidang/distribusi-internet-fwa.jpg' },
  { name: 'Convention Hall', category: 'Layanan & Jasa', image: '/Images/bidang/convention-hall.jpg' },
  { name: 'USK Travel', category: 'Layanan & Jasa', image: '/Images/bidang/usk-travel.jpg' },
  { name: 'Layanan Industri USK', category: 'Layanan & Jasa', image: '/Images/bidang/layanan-industri-usk.jpg' },
];

export const businessCategories = [
  'Nilam',
  'Kreatif & Pemasaran',
  'Layanan & Jasa',
];

// Katalog halaman PDF yang tampil sebagai popup saat kartu bidang usaha diklik.
// Gambar halaman ada di /public/Images/bidang/<folder>/halaman-NN.jpg
export const businessCatalogs = {
  'Produk Turunan Nilam': {
    folder: 'produk-nilam',
    pages: 10,
    description: 'Menghadirkan rangkaian parfum dan perawatan kulit berbasis minyak nilam dengan kualitas alami yang murni, aman, dan berstandar tinggi untuk menunjang kecantikan dan kepercayaan diri.',
  },
  'Digital Printing': {
    folder: 'digital-printing',
    pages: 4,
    description: 'Menyediakan layanan percetakan dan finishing produk cetak yang mendukung kebutuhan promosi, publikasi, dan administrasi, dengan hasil yang presisi, menarik, dan profesional.',
  },
  'Layanan Konsultasi': {
    folder: 'layanan-konsultasi',
    pages: 3,
    description: 'Panduan strategis untuk keputusan yang lebih tepat, membantu perusahaan memahami tantangan, mengidentifikasi peluang, dan menentukan langkah yang sesuai kebutuhan organisasi.',
  },
  'Event Organizer': {
    folder: 'event-organizer',
    pages: 3,
    description: 'Mewujudkan acara yang terencana, terkoordinasi, dan berkesan, mulai dari perencanaan konsep dan program, koordinasi lokasi dan perlengkapan, hingga pengelolaan peserta dan pelaksanaan kegiatan.',
  },
  'Distribusi Internet FWA': {
    folder: 'distribusi-internet-fwa',
    pages: 3,
    description: 'Solusi konektivitas internet nirkabel berbasis Fixed Wireless Access (FWA) yang menghubungkan lokasi pelanggan dengan jaringan penyedia layanan tanpa kabel fisik ke lokasi akhir.',
  },
  'Convention Hall': {
    folder: 'convention-hall',
    pages: 4,
    description: 'Ruang untuk bertemu, berbagi ide, dan merayakan momen penting, dengan pengaturan ruangan yang disesuaikan mulai dari pertemuan bisnis dan seminar hingga acara seremonial.',
  },
  'USK Travel': {
    folder: 'usk-travel',
    pages: 3,
    description: 'Layanan manajemen wisata profesional dan terpercaya yang mengutamakan kenyamanan, keamanan, dan efisiensi perjalanan, dengan pendampingan 24/7 dan perencanaan yang terorganisir.',
  },
  'Layanan Industri USK': {
    folder: 'layanan-industri-usk',
    pages: 7,
    description: 'Penyedia intelijen teknis dan manajemen proyek terpadu, dengan solusi komprehensif untuk evaluasi, eksplorasi, dan eksekusi lapangan yang berpegang pada efisiensi, keselamatan, dan tata kelola berkelanjutan.',
  },
};
