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
  // Dummy data berita (sesuaikan / fetch dari JSON)
  const dummyBerita = [
    {
      id: 1,
      date: '2026-04-30',
      image: 'https://res.cloudinary.com/dykoop6rv/image/upload/v1787054566/WhatsApp_Image_2026-08-06_at_09.01.37_rlzwpf.jpg',
      category: 'Kegiatan',
      title: 'Silaturahmi/Halal Bihalal Hari Jadi Kabupaten Bandung',
      excerpt: 'PJ. Kepala Desa Persiapan Giriwangi dan Kepala Desa Girimekar mengadakan acara Silaturahmi/halal bihalal dalam rangka peringatan Hari Jadi Kabupaten Bandung ke-385 tahun...',
      fullContent: 'PJ. Kepala Desa Persiapan Giriwangi dan Kepala Desa Girimekar mengadakan acara Silaturahmi/halal bihalal dalam rangka peringatan Hari Jadi Kabupaten Bandung ke-385 tahun. Kegiatan ini merupakan bentuk apresiasi kepada mitra kerja dan stakeholder dalam memajukan desa.'
    },
    {
      id: 2,
      date: '2026-04-30',
      category: 'Administrasi',
      title: 'Identifikasi dan Verifikasi Batas Desa',
      excerpt: 'Pemerintah Desa Persiapan Giriwangi bersama Dinas Pemberdayaan Masyarakat dan Desa melaksanakan kegiatan identifikasi dan verifikasi batas desa...',
      fullContent: 'Pemerintah Desa Persiapan Giriwangi bersama Dinas Pemberdayaan Masyarakat dan Desa melaksanakan kegiatan identifikasi dan verifikasi batas desa. Tujuan dari kegiatan ini adalah untuk memperjelas batas-batas wilayah desa secara administratif dan legal.'
    },
    {
      id: 3,
      date: '2026-05-21',
      category: 'Kesehatan',
      title: 'Layanan Kesehatan Bersama BAZNAS Provinsi',
      excerpt: 'Pemerintah Desa Persiapan Giriwangi bersama BAZNAS Provinsi melaksanakan kegiatan layanan kesehatan bagi masyarakat Dusun 1 Cilaja...',
      fullContent: 'Pemerintah Desa Persiapan Giriwangi bersama BAZNAS Provinsi melaksanakan kegiatan layanan kesehatan bagi masyarakat Dusun 1 Cilaja. Layanan ini meliputi pemeriksaan kesehatan gratis, edukasi kesehatan, dan pembagian obat-obatan.'
    },
    {
      id: 4,
      date: '2026-05-20',
      category: 'Monitoring',
      title: 'Kegiatan Monitoring dan Evaluasi',
      excerpt: 'Pemerintah Desa Persiapan Giriwangi menerima kunjungan kegiatan monitoring dan evaluasi dari pihak terkait...',
      fullContent: 'Pemerintah Desa Persiapan Giriwangi menerima kunjungan kegiatan monitoring dan evaluasi dari pihak terkait. Kegiatan ini bertujuan untuk mengukur pencapaian program desa dan memberikan masukan untuk perbaikan ke depan.'
    },
    {
      id: 5,
      date: '2026-05-20',
      category: 'Pelayanan',
      title: 'Budayakan 5S dalam Pelayanan Prima',
      excerpt: 'Pemerintah Desa Persiapan Giriwangi berkomitmen meningkatkan kualitas pelayanan dengan membudayakan prinsip 5S...',
      fullContent: 'Pemerintah Desa Persiapan Giriwangi berkomitmen meningkatkan kualitas pelayanan dengan membudayakan prinsip 5S (Senyum, Sapa, Salam, Santun, Solusi). Program ini ditujukan untuk meningkatkan kepuasan masyarakat terhadap layanan desa.'
    },
    {
      id: 6,
      date: '2026-05-13',
      category: 'Edukasi',
      title: 'Kunjungan TK Insan Muda ke Peternakan',
      excerpt: 'PJS Desa Persiapan Giriwangi menerima kunjungan edukasi dari TK Insan Muda dalam kegiatan pengenalan hewan kurban...',
      fullContent: 'PJS Desa Persiapan Giriwangi menerima kunjungan edukasi dari TK Insan Muda dalam kegiatan pengenalan hewan kurban. Kegiatan ini merupakan bagian dari program edukasi anak tentang tradisi dan budaya lokal.'
    },
    {
      id: 7,
      date: '2026-06-01',
      category: 'Infrastruktur',
      title: 'Perbaikan Jalan Desa Giriwangi',
      excerpt: 'Pemerintah Desa melaksanakan kegiatan perbaikan jalan Desa Giriwangi untuk meningkatkan aksesibilitas...',
      fullContent: 'Pemerintah Desa melaksanakan kegiatan perbaikan jalan Desa Giriwangi untuk meningkatkan aksesibilitas transportasi masyarakat. Pekerjaan ini difokuskan pada jalan utama yang banyak dilalui oleh kendaraan operasional.'
    },
    {
      id: 9,
      date: '2026-06-05',
      category: 'Sosial',
      title: 'Program Bantuan Sosial untuk UMKM',
      excerpt: 'Desa Persiapan Giriwangi meluncurkan program bantuan sosial untuk mendukung UMKM lokal...',
      fullContent: 'Desa Persiapan Giriwangi meluncurkan program bantuan sosial untuk mendukung UMKM lokal yang terdampak ekonomi. Program ini memberikan modal kerja dan pelatihan manajemen usaha bagi pelaku UMKM.'
    },
        {
      id: 10,
      date: '2026-06-05',
      category: 'Sosial',
      title: 'Program Bantuan Sosial untuk UMKM',
      excerpt: 'Desa Persiapan Giriwangi meluncurkan program bantuan sosial untuk mendukung UMKM lokal...',
      fullContent: 'Desa Persiapan Giriwangi meluncurkan program bantuan sosial untuk mendukung UMKM lokal yang terdampak ekonomi. Program ini memberikan modal kerja dan pelatihan manajemen usaha bagi pelaku UMKM.'
    },
        {
      id: 11,
      date: '2026-06-05',
      category: 'Sosial',
      title: 'Program Bantuan Sosial untuk UMKM',
      excerpt: 'Desa Persiapan Giriwangi meluncurkan program bantuan sosial untuk mendukung UMKM lokal...',
      fullContent: 'Desa Persiapan Giriwangi meluncurkan program bantuan sosial untuk mendukung UMKM lokal yang terdampak ekonomi. Program ini memberikan modal kerja dan pelatihan manajemen usaha bagi pelaku UMKM.'
    },
        {
      id: 12,
      date: '2026-06-05',
      category: 'Sosial',
      title: 'Program Bantuan Sosial untuk UMKM',
      excerpt: 'Desa Persiapan Giriwangi meluncurkan program bantuan sosial untuk mendukung UMKM lokal...',
      fullContent: 'Desa Persiapan Giriwangi meluncurkan program bantuan sosial untuk mendukung UMKM lokal yang terdampak ekonomi. Program ini memberikan modal kerja dan pelatihan manajemen usaha bagi pelaku UMKM.'
    },
        {
      id: 13,
      date: '2026-06-05',
      category: 'Sosial',
      title: 'Program Bantuan Sosial untuk UMKM',
      excerpt: 'Desa Persiapan Giriwangi meluncurkan program bantuan sosial untuk mendukung UMKM lokal...',
      fullContent: 'Desa Persiapan Giriwangi meluncurkan program bantuan sosial untuk mendukung UMKM lokal yang terdampak ekonomi. Program ini memberikan modal kerja dan pelatihan manajemen usaha bagi pelaku UMKM.'
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
      card.className = 'col-12 col-md-6';
      card.innerHTML = `
        <div class="card border-0 shadow-sm h-100 scroll-fade-in-up" style="transition: all 0.3s ease;">
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
    document.getElementById('modalBody').innerHTML = item.fullContent;

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

// ===== CONSOLE LOG =====
console.log('%c🌿 Desa Persiapan Giriwangi - Website Loaded Successfully', 'color: #2d5016; font-size: 14px; font-weight: bold;');
console.log('%cVisi: Giriwangi MAKMUR (Maju, Aktif, Kreatif, Mufakat, Unggul, Religius)', 'color: #d4af37; font-size: 12px;');