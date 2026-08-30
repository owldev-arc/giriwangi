// ===== PRELOADER - FIXED =====
let preloaderDone = false;

// Trigger preload saat DOM ready
function hidePreloader() {
    if (preloaderDone) return;
    preloaderDone = true;
    
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        preloader.style.pointerEvents = 'none';
    }
}

// Method 1: DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(hidePreloader, 1500);
});

// Method 2: Fallback untuk jika DOM sudah loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(hidePreloader, 1500);
    });
} else {
    setTimeout(hidePreloader, 1500);
}

// Method 3: Window load
window.addEventListener('load', function() {
    if (!preloaderDone) {
        setTimeout(hidePreloader, 1500);
    }
});

// ===== DARK MODE TOGGLE (NAVBAR + FLOATING) =====
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'light';

html.setAttribute('data-theme', savedTheme);
updateThemeIcon();

function updateThemeIcon() {
    const theme = html.getAttribute('data-theme');
    const isDark = theme === 'dark';
    
    const themeToggle = document.getElementById('themeToggle');
    const floatingThemeToggle = document.getElementById('floatingThemeToggle');
    
    if (themeToggle) {
        themeToggle.innerHTML = isDark 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    }
    
    if (floatingThemeToggle) {
        const moonIcon = floatingThemeToggle.querySelector('.fa-moon');
        const sunIcon = floatingThemeToggle.querySelector('.fa-sun');
        if (moonIcon && sunIcon) {
            moonIcon.style.display = isDark ? 'none' : 'block';
            sunIcon.style.display = isDark ? 'block' : 'none';
        }
    }
}

function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
}

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

const floatingThemeToggle = document.getElementById('floatingThemeToggle');
if (floatingThemeToggle) {
    floatingThemeToggle.addEventListener('click', toggleTheme);
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-fade-in, .scroll-slide-left, .scroll-slide-right').forEach(el => {
    observer.observe(el);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    });
});

// ===== NAVBAR COLLAPSE ON LINK CLICK =====
const navLinks = document.querySelectorAll('.nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navLinks && navbarCollapse) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                const navToggler = document.querySelector('.navbar-toggler');
                if (navToggler) navToggler.click();
            }
        });
    });
}

// ===== ACTIVE NAVBAR LINK =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== BERITA BUTTON HANDLERS =====
document.querySelectorAll('.berita-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const beritaCard = this.closest('.berita-item');
        const title = beritaCard.querySelector('.berita-title').textContent;
        alert('📰 ' + title + '\n\nFitur detail berita akan segera tersedia!');
    });
});

// ===== HUBUNGI KAMI FORM =====
document.querySelectorAll('.hubungi-link').forEach(link => {
    if (link.getAttribute('href') === '#' || link.textContent.includes('Form')) {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                alert('✉️ Form pengaduan akan segera tersedia.\n\nTerima kasih atas perhatian Anda!');
            }
        });
    }
});
// ===== KEPENDUDUKAN (DUMMY) + CHART JS =====
(() => {
  const dummyTotal = 6120; // sesuai data Anda: 6.120 jiwa

  const dataDummy = {
    usia: {
      labels: ['0–4', '5–9', '10-14', '15–19', '20–24', '25–29', '30–34', '35–39', '40–44', '45–49', '50–54', '55–59'],
      values: [414, 491,443,480,486,473,494,385,425,376,405,259,232,181,110,85]
    },
    agama: {
      labels: ['Islam', 'Kristen', 'Katolik'],
      values: [5833, 9, 2]
    },
    pendidikan: {
      labels: ['SD', 'SMP', 'SMA/SMK', 'Diploma I/II','Diploma III' ,'D IV/S1', 'S2'],
      values: [1764, 958, 931, 34,8, 29,0]
    },
    kelamin: {
      labels: ['Laki-laki', 'Perempuan'],
      values: [2859, 2982]
    }
    // pekerjaan: {
    //   labels: ['Petani', 'Wiraswasta', 'Buruh', 'Karyawan', 'TNI/Polri', 'Lainnya'],
    //   values: [2100, 1400, 850, 650, 90, 1030]
    // }
  };

  function formatNumber(n) {
    return new Intl.NumberFormat('id-ID').format(n);
  }

  function pct(part, total) {
    return total > 0 ? (part / total) * 100 : 0;
  }

  // Tabs
  const tabButtons = document.querySelectorAll('.kependudukan-tab');
  const panels = document.querySelectorAll('.kependudukan-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      panels.forEach(p => p.classList.remove('active'));
      const target = btn.getAttribute('data-target');
      const el = document.getElementById(target);
      if (el) el.classList.add('active');
    });
  });

  // Theme (supaya warna chart ikut dark/light)
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#f0f0f0' : '#1a1a1a';
  const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';

  function renderSummary(containerId, labels, values, totalForPct) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    labels.forEach((lab, i) => {
      const v = values[i] || 0;
      const p = pct(v, totalForPct);
      const item = document.createElement('div');
      item.className = 'kep-summary-item';
      item.innerHTML = `<b>${formatNumber(v)}</b><span>${lab} • ${p.toFixed(1)}%</span>`;
      container.appendChild(item);
    });
  }

  const colors1 = ['#66bb6a', '#2d5016', '#d4af37'];
  const colorsAgama = ['#66bb6a', '#3498db', '#e74c3c', '#f39c12', '#8e44ad', '#2ecc71'];
  const colorsPendidikan = ['#2d5016','#66bb6a','#d4af37','#3498db','#9b59b6','#e74c3c'];
  const colorsKelamin = ['#66bb6a', '#3498db'];
  const colorsPekerjaan = ['#d4af37','#66bb6a','#3498db','#e74c3c','#9b59b6','#2d5016'];

  const chartOptionsBase = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: textColor } },
      tooltip: { enabled: true }
    }
  };

  function makeBarHorizontal(canvasId, labels, values, colors) {
    const c = document.getElementById(canvasId);
    if (!c) return null;

    return new Chart(c, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Jumlah',
          data: values,
          backgroundColor: colors,
          borderWidth: 0
        }]
      },
      options: {
        ...chartOptionsBase,
        indexAxis: 'y',
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: { color: textColor }
          },
          y: {
            grid: { display: false },
            ticks: { color: textColor }
          }
        }
      }
    });
  }

  // Usia
  renderSummary('sumUsia', dataDummy.usia.labels, dataDummy.usia.values, dummyTotal);
  makeBarHorizontal('chartUsia', dataDummy.usia.labels, dataDummy.usia.values, colors1);

  // Agama (donut)
  renderSummary('sumAgama', dataDummy.agama.labels, dataDummy.agama.values, dummyTotal);
  (function () {
    const c = document.getElementById('chartAgama');
    if (!c) return;
    new Chart(c, {
      type: 'doughnut',
      data: {
        labels: dataDummy.agama.labels,
        datasets: [{ data: dataDummy.agama.values, backgroundColor: colorsAgama, borderWidth: 0 }]
      },
      options: {
        ...chartOptionsBase,
        cutout: '60%',
        plugins: {
          ...chartOptionsBase.plugins,
          legend: { position: 'bottom', labels: { color: textColor } }
        }
      }
    });
  })();

  // Pendidikan
  renderSummary('sumPendidikan', dataDummy.pendidikan.labels, dataDummy.pendidikan.values, dummyTotal);
  makeBarHorizontal('chartPendidikan', dataDummy.pendidikan.labels, dataDummy.pendidikan.values, colorsPendidikan);

  // Kelamin (donut)
  renderSummary('sumKelamin', dataDummy.kelamin.labels, dataDummy.kelamin.values, dummyTotal);
  (function () {
    const c = document.getElementById('chartKelamin');
    if (!c) return;
    new Chart(c, {
      type: 'doughnut',
      data: {
        labels: dataDummy.kelamin.labels,
        datasets: [{ data: dataDummy.kelamin.values, backgroundColor: colorsKelamin, borderWidth: 0 }]
      },
      options: {
        ...chartOptionsBase,
        cutout: '60%',
        plugins: {
          ...chartOptionsBase.plugins,
          legend: { position: 'bottom', labels: { color: textColor } }
        }
      }
    });
  })();
  // ===== Weather Bar Clock + Weather (DUMMY) =====
(() => {
  const elTime = document.getElementById('wbTime');
  const elDate = document.getElementById('wbDate');
  const elIcon = document.getElementById('wbIcon');
  const elDesc = document.getElementById('wbDesc');
  const elTemp = document.getElementById('wbTemp');
  const elLoc = document.getElementById('wbLoc');
  const elRefresh = document.getElementById('wbRefresh');

  if (!elTime || !elDate || !elIcon || !elDesc || !elTemp || !elLoc || !elRefresh) return;

  function pad2(n){ return String(n).padStart(2, '0'); }

  function updateClock(){
    const now = new Date();
    elTime.textContent = `${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}`;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    elDate.textContent = new Intl.DateTimeFormat('id-ID', options).format(now);
  }

  updateClock();
  setInterval(updateClock, 1000);

  const conditions = [
    { icon: '☀️', desc: 'Cerah', base: 28 },
    { icon: '⛅', desc: 'Cerah Berawan', base: 27 },
    { icon: '🌤️', desc: 'Sedikit Berawan', base: 26 },
    { icon: '🌦️', desc: 'Hujan Ringan', base: 25 },
    { icon: '⛈️', desc: 'Hujan Petir', base: 24 },
    { icon: '🌫️', desc: 'Berkabut', base: 23 }
  ];

  function seededIndex(seed, mod){ return Math.abs(seed) % mod; }

  function renderDummyWeather(){
    const now = new Date();
    const seed = now.getFullYear()*1e4 + (now.getMonth()+1)*1e2 + now.getDate()*10 + now.getHours();
    const idx = seededIndex(seed, conditions.length);
    const c = conditions[idx];

    const jitter = (idx % 3) - 1;
    const temp = c.base + jitter;

    elIcon.textContent = c.icon;
    elDesc.textContent = c.desc;
    elTemp.textContent = `${temp}°C`;
    elLoc.textContent = 'Cilengkrang';
  }

  renderDummyWeather();
  elRefresh.addEventListener('click', renderDummyWeather);
  setInterval(renderDummyWeather, 10 * 60 * 1000);
})();
// ===== Weatherbar sticky top mengikuti tinggi navbar (FIX mobile & desktop) =====
(() => {
  const weatherBar = document.getElementById('weatherBar');
  const navbar = document.querySelector('.navbar');

  if (!weatherBar || !navbar) return;

  const root = document.documentElement;

  function sync() {
    const navH = Math.ceil(navbar.getBoundingClientRect().height);
    const barH = Math.ceil(weatherBar.getBoundingClientRect().height);

    root.style.setProperty('--weatherbar-top', (navH + 2) + 'px');
    root.style.setProperty('--weatherbar-height-mobile', barH + 'px');
  }

  window.addEventListener('load', sync);
  window.addEventListener('resize', sync);

  new ResizeObserver(sync).observe(navbar);
  new ResizeObserver(sync).observe(weatherBar);
})();
// ===== BERITA SECTION (BOOTSTRAP) =====
(() => {
  // berita list 
  const dummyBerita = [
                {
      id: 1,
      date: '2026-08-30',
      category: 'Kegiatan',
      image:'https://res.cloudinary.com/dykoop6rv/image/upload/v1788103030/WhatsApp_Image_2026-08-30_at_21.58.00_v4qeew.jpg',
      title: 'Desa Persiapan Giriwangi Hadiri Peringatan Maulid Nabi dan Syukuran HUT RI ke-81 di RW 03',
      excerpt: 'Pemerintah Desa Persiapan Giriwangi menghadiri peringatan Maulid Nabi Muhammad SAW sekaligus syukuran HUT RI ke-81 yang diselenggarakan oleh warga RW 03. Kehadiran jajaran pemerintah desa ini menjadi momentum penting untuk mempererat ukhuwah islamiyah dan mengokohkan semangat persatuan antarwarga di wilayah tersebut.',
      fullContent:'Pemerintah Desa Persiapan Giriwangi menghadiri peringatan Maulid Nabi Muhammad SAW yang diintegrasikan dengan syukuran HUT RI ke-81 di lingkungan RW 03. Kehadiran jajaran aparatur desa menjadi bentuk dukungan atas inisiatif warga dalam menyatukan momen keagamaan dan kebangsaan. Acara diawali dengan pembacaan ayat suci Al-Qur an dan salawat bersama, dilanjutkan dengan tausiyah yang mengulas pentingnya meneladani akhlak Rasulullah SAW dalam kehidupan bermasyarakat. Selain itu, Pemerintah Desa menyampaikan apresiasi atas kekompakan warga RW 03, serta mengajak seluruh masyarakat untuk terus memelihara rasa persatuan dan kebersamaan. Kegiatan ini diakhiri dengan doa bersama untuk keselamatan bangsa dan kemajuan Desa Persiapan Giriwangi.',
},
                {
      id: 2,
      date: '2026-08-29',
      category: 'Kegiatan',
      image:'https://res.cloudinary.com/dykoop6rv/image/upload/v1788022219/rw11_s9of9k.jpg',
      title: 'Semarakkan HUT RI Ke-81, Pjs Kepala Desa Persiapan Giriwangi dan Jajaran Hadiri Perayaan di RW 11',
      excerpt: 'Pjs Kepala Desa Persiapan Giriwangi beserta jajarannya menghadiri peringatan HUT ke-81 Kemerdekaan Republik Indonesia yang digelar meriah oleh warga RW 11. Kehadiran pemerintah desa ini menjadi momentum untuk mempererat kebersamaan dan mengapresiasi gotong royong warga setempat.',
      fullContent: "Pjs Kepala Desa Persiapan Giriwangi beserta jajaran perangkat desa menghadiri peringatan Hari Ulang Tahun (HUT) ke-81 Kemerdekaan Republik Indonesia yang diselenggarakan oleh warga RW 11. Kehadiran jajaran pemerintah desa disambut hangat oleh pengurus RT/RW, tokoh masyarakat, dan warga setempat.\n\nAcara diisi dengan beragam kegiatan, mulai dari perlombaan tradisional hingga pertunjukan seni lokal. Dalam sambutannya, Pjs Kades Giriwangi menyampaikan apresiasi atas kekompakan panitia dan antusiasme masyarakat RW 11, seraya menekankan pentingnya menjaga persatuan dan semangat gotong royong dalam mengisi kemerdekaan. Selain memantau jalannya acara, momen ini juga dimanfaatkan untuk berdialog langsung dan menyerap aspirasi warga sebelum diakhiri dengan pembagian hadiah dan ramah tamah."
},
    {
              
      id: 2,
      date: '2026-08-24',
      category: 'Kegiatan',
      image:'https://res.cloudinary.com/dykoop6rv/image/upload/v1787677836/WhatsApp_Image_2026-08-24_at_09.12.33_1_cfeveg.jpg',
      title: 'Pjs Kades Giriwangi Tinjau Lokasi Kebakaran di Jatiendah',
      excerpt: 'Pjs Kepala Desa Giriwangi mengunjungi langsung lokasi musibah kebakaran di wilayah Jatiendah guna menyampaikan rasa prihatin sekaligus berkoordinasi terkait bantuan darurat untuk warga terdampak.',
      fullContent: 'GIRIWANGI – Merespons musibah kebakaran yang melanda kawasan Jatiendah baru-baru ini, Pejabat Sementara (Pjs) Kepala Desa Giriwangi langsung turun ke lapangan untuk meninjau lokasi kejadian. Kunjungan darurat ini dilakukan sebagai bentuk solidaritas, kepedulian, sekaligus aksi tanggap cepat terhadap bencana yang menimpa warga sekitar.Begitu tiba di lokasi, Pjs Kepala Desa Giriwangi segera memantau area yang terdampak oleh kobaran api. Dalam peninjauan tersebut, beliau melihat langsung kondisi kerusakan bangunan serta memastikan bahwa situasi di sekitar tempat kejadian perkara (TKP) sudah sepenuhnya aman dan terkendali setelah penanganan oleh petugas pemadam kebakaran.Selain memantau kondisi fisik lingkungan, Pjs Kepala Desa Giriwangi juga menyempatkan diri untuk berinteraksi langsung dengan para korban dan warga setempat. Kehadiran beliau di tengah situasi sulit ini bertujuan untuk memberikan dukungan moril serta mendengarkan langsung kebutuhan mendesak yang diperlukan oleh warga terdampak."Kehadiran kami di sini adalah bentuk empati dan kebersamaan. Musibah ini adalah duka kita bersama, dan kami ingin memastikan bahwa koordinasi penanganan pasca-kebakaran dapat berjalan dengan baik agar warga yang terdampak bisa segera mendapatkan bantuan yang dibutuhkan," ujar Pjs Kepala Desa Giriwangi di sela-sela kunjungannya.Dalam agenda kunjungan ini, pihak Pemerintah Desa Giriwangi juga melakukan koordinasi dengan jajaran pengurus lingkungan setempat, mulai dari Ketua RT, RW, hingga tokoh masyarakat. Koordinasi ini difokuskan pada pendataan kerugian, pemetaan kebutuhan logistik darurat, serta perencanaan penyaluran bantuan sosial guna meringankan beban para korban kebakaran.Melalui aksi tanggap darurat ini, diharapkan sinergi antara pemerintah desa, petugas, dan masyarakat dapat mempercepat proses pemulihan situasi di Jatiendah, baik dari segi infrastruktur maupun kondisi psikologis warga yang tertimpa musibah.'
    },
  
      {
      id: 3,
      date: '2026-08-22',
      category: 'Kegiatan',
      image:'https://res.cloudinary.com/dykoop6rv/image/upload/v1787677734/malam_cmyr0s.jpg',
      title: 'Apresiasi Bakat Warga, Pjs Desa Giriwangi Hadiri Malam Kreasi Seni',
      excerpt: 'intip keseruan malam panggung kreasi seni di lingkungan RW Desa Giriwangi. Acara ini menjadi wadah kreativitas warga sekaligus ajang silaturahmi bersama Pjs Kades.',
      fullContent: 'intip keseruan malam panggung kreasi seni di lingkungan RW Desa Giriwangi. Acara ini menjadi wadah kreativitas warga sekaligus ajang silaturahmi bersama Pjs Kades.'
    },
    {
      id: 3,
      date: '2026-08-20',
      category: 'Kegiatan',
      image:'https://res.cloudinary.com/dykoop6rv/image/upload/v1787676520/WhatsApp_Image_2026-08-20_at_11.29.30_2_jgvhc6.jpg',
      title: 'Silaturahmi & Koordinasi Persiapan Kompetisi Gulat Desa Cilengkrang',
      excerpt: 'Pertemuan silaturahmi sekaligus pemantapan teknis bagi para atlet, pelatih, dan pengurus gulat Desa Cilengkrang untuk persiapan pertandingan besok...',
      fullContent: 'Pertemuan silaturahmi sekaligus pemantapan teknis bagi para atlet, pelatih, dan pengurus gulat Desa Cilengkrang untuk persiapan pertandingan besok. Harap hadir tepat waktu demi kelancaran kompetisi.'
    },
  
    {
      id: 4,
      date: '2026-08-17',
      category: 'Kegiatan',
      image: 'https://res.cloudinary.com/dykoop6rv/image/upload/v1787386521/IMG_6623_zlfkdb.jpg',
      title: 'Parade Kolosal Giriwangi: Gelombang Kreativitas RW 01\u201311 Menuju Girimekar',
      excerpt: 'Unjuk kekompakan akbar 11 RW Dusun Giriwangi dalam satu barisan seni, kostum, dan budaya lokal...',
      fullContent: 'Unjuk kekompakan akbar 11 RW Dusun Giriwangi dalam satu barisan seni, kostum, dan budaya lokal. Bersiap menyemarakkan pusat Desa Induk Girimekar dengan energi gotong royong yang meriah!'
    },
       {
      id: 3,
      date: '2026-08-17',
      category: 'Kegiatan',
      image: 'https://res.cloudinary.com/dykoop6rv/image/upload/v1787676831/bendera_bpz7ad.jpg',
      title: 'Pjs Desa Giriwangi Hadiri Upacara Penurunan Bendera HUT RI',
      excerpt: 'Hadiri upacara penurunan bendera merah putih, Pjs Kepala Desa Giriwangi sampaikan apresiasi kepada seluruh masyarakat dan perangkat desa yang terlibat.',
      fullContent: 'Hadiri upacara penurunan bendera merah putih, Pjs Kepala Desa Giriwangi sampaikan apresiasi kepada seluruh masyarakat dan perangkat desa yang terlibat.'
    },
    {
      id: 5,
      date: '2026-08-15',
      category: 'Kegiatan',
      image:'https://res.cloudinary.com/dykoop6rv/image/upload/v1787676336/WhatsApp_Image_2026-08-15_at_21.05.28_k5ygyh.jpg',
      title: 'Peringatan Maulid Nabi Muhammad SAW 1448 H \u2013 Masjid Al-Manan RW 8',
      excerpt: 'Undangan menghadiri tablig akbar peringatan Maulid Nabi Muhammad SAW di Masjid Al-Manan RW 8, Cilengkrang...',
      fullContent: 'Undangan menghadiri tablig akbar peringatan Maulid Nabi Muhammad SAW di Masjid Al-Manan RW 8, Cilengkrang. Mari bersama-sama meneladani akhlak Rasulullah SAW dan mempererat silaturahmi antarwarga.'
    },
    {
      id: 6,
      date: '2026-08-13',
      category: 'Kegiatan',
      image:'https://res.cloudinary.com/dykoop6rv/image/upload/v1787677010/musyahutri_zteyee.jpg',
      title: 'Musyawarah Warga: Gotong Royong Menyambut HUT RI ke-81',
      excerpt: 'Undangan rapat kerja dan musyawarah mufakat seluruh warga untuk menyusun rangkaian kegiatan, kepanitiaan, dan perlombaan HUT RI...',
      fullContent: 'Undangan rapat kerja dan musyawarah mufakat seluruh warga untuk menyusun rangkaian kegiatan, kepanitiaan, dan perlombaan dalam rangka memeriahkan Hari Kemerdekaan Republik Indonesia ke-81. Kehadiran dan ide kreatif Anda adalah kunci kemeriahan Desa kita!'
    },
    {
      id: 7,
      date: '2026-06-05',
      category: 'Sosial',
      title: 'Program Bantuan Sosial untuk UMKM',
      excerpt: 'Desa Persiapan Giriwangi meluncurkan program bantuan sosial untuk mendukung UMKM lokal...',
      fullContent: 'Desa Persiapan Giriwangi meluncurkan program bantuan sosial untuk mendukung UMKM lokal yang terdampak ekonomi. Program ini memberikan modal kerja dan pelatihan manajemen usaha bagi pelaku UMKM.'
    },
    {
      id: 8,
      date: '2026-06-01',
      category: 'Infrastruktur',
      title: 'Perbaikan Jalan Desa Giriwangi',
      excerpt: 'Pemerintah Desa melaksanakan kegiatan perbaikan jalan Desa Giriwangi untuk meningkatkan aksesibilitas...',
      fullContent: 'Pemerintah Desa melaksanakan kegiatan perbaikan jalan Desa Giriwangi untuk meningkatkan aksesibilitas transportasi masyarakat. Pekerjaan ini difokuskan pada jalan utama yang banyak dilalui oleh kendaraan operasional.'
    },
    {
      id: 9,
      date: '2026-05-21',
      category: 'Kesehatan',
      title: 'Layanan Kesehatan Bersama BAZNAS Provinsi',
      excerpt: 'Pemerintah Desa Persiapan Giriwangi bersama BAZNAS Provinsi melaksanakan kegiatan layanan kesehatan bagi masyarakat Dusun 1 Cilaja...',
      fullContent: 'Pemerintah Desa Persiapan Giriwangi bersama BAZNAS Provinsi melaksanakan kegiatan layanan kesehatan bagi masyarakat Dusun 1 Cilaja. Layanan ini meliputi pemeriksaan kesehatan gratis, edukasi kesehatan, dan pembagian obat-obatan.'
    },
    {
      id: 10,
      date: '2026-05-20',
      category: 'Monitoring',
      title: 'Kegiatan Monitoring dan Evaluasi',
      excerpt: 'Pemerintah Desa Persiapan Giriwangi menerima kunjungan kegiatan monitoring dan evaluasi dari pihak terkait...',
      fullContent: 'Pemerintah Desa Persiapan Giriwangi menerima kunjungan kegiatan monitoring dan evaluasi dari pihak terkait. Kegiatan ini bertujuan untuk mengukur pencapaian program desa dan memberikan masukan untuk perbaikan ke depan.'
    },
    {
      id: 11,
      date: '2026-05-20',
      category: 'Pelayanan',
      title: 'Budayakan 5S dalam Pelayanan Prima',
      excerpt: 'Pemerintah Desa Persiapan Giriwangi berkomitmen meningkatkan kualitas pelayanan dengan membudayakan prinsip 5S...',
      fullContent: 'Pemerintah Desa Persiapan Giriwangi berkomitmen meningkatkan kualitas pelayanan dengan membudayakan prinsip 5S (Senyum, Sapa, Salam, Santun, Solusi). Program ini ditujukan untuk meningkatkan kepuasan masyarakat terhadap layanan desa.'
    },
    {
      id: 12,
      date: '2026-05-13',
      category: 'Edukasi',
      title: 'Kunjungan TK Insan Muda ke Peternakan',
      excerpt: 'PJS Desa Persiapan Giriwangi menerima kunjungan edukasi dari TK Insan Muda dalam kegiatan pengenalan hewan kurban...',
      fullContent: 'PJS Desa Persiapan Giriwangi menerima kunjungan edukasi dari TK Insan Muda dalam kegiatan pengenalan hewan kurban. Kegiatan ini merupakan bagian dari program edukasi anak tentang tradisi dan budaya lokal.'
    },
    {
      id: 13,
      date: '2026-04-30',
      category: 'Administrasi',
      title: 'Identifikasi dan Verifikasi Batas Desa',
      excerpt: 'Pemerintah Desa Persiapan Giriwangi bersama Dinas Pemberdayaan Masyarakat dan Desa melaksanakan kegiatan identifikasi dan verifikasi batas desa...',
      fullContent: 'Pemerintah Desa Persiapan Giriwangi bersama Dinas Pemberdayaan Masyarakat dan Desa melaksanakan kegiatan identifikasi dan verifikasi batas desa. Tujuan dari kegiatan ini adalah untuk memperjelas batas-batas wilayah desa secara administratif dan legal.'
    },
    {
      id: 14,
      date: '2026-04-30',
      image: 'https://res.cloudinary.com/dykoop6rv/image/upload/v1787054566/WhatsApp_Image_2026-08-06_at_09.01.37_rlzwpf.jpg',
      category: 'Kegiatan',
      title: 'Silaturahmi/Halal Bihalal Hari Jadi Kabupaten Bandung',
      excerpt: 'PJ. Kepala Desa Persiapan Giriwangi dan Kepala Desa Girimekar mengadakan acara Silaturahmi/halal bihalal dalam rangka peringatan Hari Jadi Kabupaten Bandung ke-385 tahun...',
      fullContent: 'PJ. Kepala Desa Persiapan Giriwangi dan Kepala Desa Girimekar mengadakan acara Silaturahmi/halal bihalal dalam rangka peringatan Hari Jadi Kabupaten Bandung ke-385 tahun. Kegiatan ini merupakan bentuk apresiasi kepada mitra kerja dan stakeholder dalam memajukan desa.'
    }
  ];

  const PER_PAGE = 6;
  let allBerita = [...dummyBerita];
  let filteredBerita = [...dummyBerita];
  let currentPage = 1;

  const listContainer = document.getElementById('beritaList');
  const paginationContainer = document.getElementById('paginationContainer');
  const pageInfoEl = document.getElementById('pageInfo');
  const filterFromEl = document.getElementById('filterFrom');
  const filterToEl = document.getElementById('filterTo');
  const filterApplyBtn = document.getElementById('filterApply');
  const filterClearBtn = document.getElementById('filterClear');
  const filterInfoEl = document.getElementById('filterInfo');
  const filterInfoText = document.getElementById('filterInfoText');

  // Render berita cards
  function renderBerita() {
    const start = (currentPage - 1) * PER_PAGE;
    const end = start + PER_PAGE;
    const pageItems = filteredBerita.slice(start, end);

    listContainer.innerHTML = '';
    pageItems.forEach(item => {
      const dateObj = new Date(item.date);
      const dateStr = dateObj.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      
      const card = document.createElement('div');
      card.className = 'col-12 col-sm-6 col-lg-4';
      const imageHtml = item.image
        ? `<img src="${item.image}" alt="${item.title}" style="width:100%; height:180px; object-fit:cover; border-radius: 12px 12px 0 0;" loading="lazy">`
        : `<div style="width:100%; height:180px; border-radius:12px 12px 0 0; background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%); display:flex; align-items:center; justify-content:center;">
             <i class="fas fa-newspaper" style="font-size:2.2rem; color:rgba(255,255,255,0.35);"></i>
           </div>`;
      card.innerHTML = `
        <div class="card border-0 shadow-sm h-100 scroll-fade-in-up" style="transition: all 0.3s ease; overflow:hidden;">
          ${imageHtml}
          <div class="card-body d-flex flex-column">
            <div class="mb-2">
              <small class="text-muted d-flex align-items-center gap-2">
                <i class="fas fa-calendar" style="color: var(--secondary);"></i>
                ${dateStr}
              </small>
              <span class="badge mt-2" style="background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%); color: white; font-size: 0.75rem;">
                ${item.category}
              </span>
            </div>
            <h6 class="card-title fw-700 mt-3 mb-2" style="color: var(--primary); min-height: 50px;">
              ${item.title}
            </h6>
            <p class="card-text text-muted small mb-3 flex-grow-1">
              ${item.excerpt}
            </p>
            <button class="btn btn-sm btn-outline-primary open-modal-btn" data-id="${item.id}" style="border-color: var(--secondary); color: var(--primary);">
              Selengkapnya <i class="fas fa-arrow-right ms-2"></i>
            </button>
          </div>
        </div>
      `;
      listContainer.appendChild(card);

      // Trigger scroll-reveal animation (tanpa ini card stuck di opacity:0)
      const cardEl = card.querySelector('.scroll-fade-in-up');
      if (cardEl) {
        if (typeof observer !== 'undefined' && observer.observe) {
          observer.observe(cardEl);
        } else {
          requestAnimationFrame(() => cardEl.classList.add('visible'));
        }
      }
    });

    // Attach modal handlers
    document.querySelectorAll('.open-modal-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        openBeritaModal(id);
      });
    });

    renderPagination();
    updatePageInfo();
  }

  // Render pagination
  function renderPagination() {
    const totalPages = Math.ceil(filteredBerita.length / PER_PAGE);
    paginationContainer.innerHTML = '';

    // Prev button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'btn btn-sm btn-outline-secondary';
    prevBtn.textContent = '← Sebelumnya';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderBerita();
      }
    });
    paginationContainer.appendChild(prevBtn);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.className = 'btn btn-sm';
      btn.textContent = i;
      if (i === currentPage) {
        btn.style.background = 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)';
        btn.style.color = 'white';
        btn.style.border = '0';
      } else {
        btn.className += ' btn-outline-secondary';
      }
      btn.addEventListener('click', () => {
        currentPage = i;
        renderBerita();
        window.scrollTo({ top: document.getElementById('publikasi').offsetTop - 100, behavior: 'smooth' });
      });
      paginationContainer.appendChild(btn);
    }

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn btn-sm btn-outline-secondary';
    nextBtn.textContent = 'Selanjutnya →';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderBerita();
      }
    });
    paginationContainer.appendChild(nextBtn);
  }

  // Update page info
  function updatePageInfo() {
    const start = (currentPage - 1) * PER_PAGE + 1;
    const end = Math.min(currentPage * PER_PAGE, filteredBerita.length);
    pageInfoEl.textContent = `Menampilkan ${start} - ${end} dari ${filteredBerita.length} berita`;
  }

  // Open modal
  function openBeritaModal(id) {
    const item = allBerita.find(b => b.id === id);
    if (!item) return;

    document.getElementById('modalTitle').textContent = item.title;
    document.getElementById('modalDate').textContent = new Date(item.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('modalCategory').textContent = item.category;
    const imageBlock = item.image
      ? `<img src="${item.image}" alt="${item.title}" style="width:100%; max-height:280px; object-fit:cover; border-radius:12px; margin-bottom:16px;">`
      : '';
    document.getElementById('modalBody').innerHTML = imageBlock + item.fullContent;

    const modal = new bootstrap.Modal(document.getElementById('beritaModal'));
    modal.show();
  }

  // Filter buttons
  filterApplyBtn.addEventListener('click', applyFilter);
  filterClearBtn.addEventListener('click', clearFilter);

  function applyFilter() {
    const from = filterFromEl.value ? new Date(filterFromEl.value) : null;
    const to = filterToEl.value ? new Date(filterToEl.value + 'T23:59:59') : null;

    filteredBerita = allBerita.filter(item => {
      const itemDate = new Date(item.date);
      if (from && itemDate < from) return false;
      if (to && itemDate > to) return false;
      return true;
    });

    currentPage = 1;
    renderBerita();

    // Show filter info
    let infoText = 'Filter aktif: ';
    if (from) infoText += ` Dari ${filterFromEl.value}`;
    if (to) infoText += ` Sampai ${filterToEl.value}`;
    if (from || to) {
      filterInfoEl.classList.remove('d-none');
      filterInfoText.textContent = infoText;
    }
  }

  function clearFilter() {
    filterFromEl.value = '';
    filterToEl.value = '';
    filteredBerita = [...allBerita];
    currentPage = 1;
    renderBerita();
    filterInfoEl.classList.add('d-none');
  }

  // Initial render
  renderBerita();
})();
})();
// ===== GALERI FOTO (CAROUSEL OTOMATIS) =====
(() => {
  const carouselEl = document.getElementById('galeriCarousel');
  const inner = document.getElementById('galeriInner');
  const indicators = document.getElementById('galeriIndicators');
  const filterWrap = document.getElementById('galeriFilter');
  if (!carouselEl || !inner || !indicators || !filterWrap) return;

  const dummyGaleri = [
    { title: 'Karnaval ', category: 'kegiatan', src: 'https://res.cloudinary.com/dykoop6rv/image/upload/v1787376669/giriwangiwa_b9udqr.jpg' },
    { title: 'Kebun Kopi Warga Dusun 1', category: 'pertanian', src: '' },
    { title: 'Panorama Desa 748 MDPL', category: 'alam', src: '' },
    { title: 'Perbaikan Jalan Desa', category: 'infrastruktur', src: '' },
    { title: 'Panen Sayuran Dusun 2', category: 'pertanian', src: '' },
    { title: 'Kegiatan Posyandu', category: 'kegiatan', src: '' },
    { title: 'Sungai di Kaki Bukit', category: 'alam', src: '' },
    { title: 'Pembangunan Balai Desa', category: 'infrastruktur', src: '' },
    { title: 'Gotong Royong Warga', category: 'kegiatan', src: '' },
  ];

  const categoryLabel = { kegiatan: 'Kegiatan', pertanian: 'Pertanian', alam: 'Alam', infrastruktur: 'Infrastruktur' };

  let currentList = [...dummyGaleri];
  let currentIndex = 0;
  let bsCarousel = null;

  function renderCarousel(filter) {
    currentList = filter === 'all' ? [...dummyGaleri] : dummyGaleri.filter(g => g.category === filter);
    if (currentList.length === 0) currentList = [...dummyGaleri];

    // Bangun indicators
    indicators.innerHTML = currentList.map((_, idx) => `
      <button type="button" data-bs-target="#galeriCarousel" data-bs-slide-to="${idx}"
        class="${idx === 0 ? 'active' : ''}" aria-current="${idx === 0 ? 'true' : 'false'}"
        aria-label="Slide ${idx + 1}"></button>
    `).join('');

    // Bangun slides
    inner.innerHTML = currentList.map((item, idx) => `
      <div class="carousel-item ${idx === 0 ? 'active' : ''}" data-idx="${idx}">
        <img src="${item.src}" alt="${item.title}" loading="lazy">
        <div class="galeri-carousel-caption">
          <span class="cat">${categoryLabel[item.category] || item.category}</span>
          <h5>${item.title}</h5>
        </div>
      </div>
    `).join('');

    // Klik gambar -> buka lightbox
    inner.querySelectorAll('.carousel-item img').forEach((img, idx) => {
      img.addEventListener('click', () => openLightbox(idx));
    });

    // Reinit instance Bootstrap Carousel biar auto-slide jalan dari slide baru
    if (bsCarousel) bsCarousel.dispose();
    bsCarousel = new bootstrap.Carousel(carouselEl, {
      interval: 3500,
      ride: 'carousel',
      wrap: true,
      touch: true
    });
  }

  filterWrap.querySelectorAll('.galeri-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterWrap.querySelectorAll('.galeri-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCarousel(btn.dataset.filter);
    });
  });

  // ===== LIGHTBOX (tetap ada, klik foto di carousel utk lihat penuh) =====
  const lightbox = document.getElementById('galeriLightbox');
  const lbImg = document.getElementById('galeriLightboxImg');
  const lbTitle = document.getElementById('galeriLightboxTitle');
  const lbCategory = document.getElementById('galeriLightboxCategory');
  const lbClose = document.getElementById('galeriLightboxClose');
  const lbPrev = document.getElementById('galeriLightboxPrev');
  const lbNext = document.getElementById('galeriLightboxNext');

  function openLightbox(idx) {
    currentIndex = idx;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (bsCarousel) bsCarousel.pause();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    if (bsCarousel) bsCarousel.cycle();
  }

  function updateLightbox() {
    const item = currentList[currentIndex];
    if (!item) return;
    lbImg.src = item.src;
    lbImg.alt = item.title;
    lbTitle.textContent = item.title;
    lbCategory.textContent = categoryLabel[item.category] || item.category;
  }

  function showPrev() { currentIndex = (currentIndex - 1 + currentList.length) % currentList.length; updateLightbox(); }
  function showNext() { currentIndex = (currentIndex + 1) % currentList.length; updateLightbox(); }

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', showPrev);
  lbNext.addEventListener('click', showNext);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  renderCarousel('all');
})();
// ===== CONSOLE LOG =====
console.log('%c🌿 Desa Persiapan Giriwangi - Website Loaded Successfully', 'color: #2d5016; font-size: 14px; font-weight: bold;');
console.log('%cVisi: Giriwangi MAKMUR (Maju, Aktif, Kreatif, Mufakat, Unggul, Religius)', 'color: #d4af37; font-size: 12px;');