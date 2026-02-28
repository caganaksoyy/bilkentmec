

// Slider ve kontrol elemanlarını seç
const slider = document.getElementById('slider');
const btnLeft = document.getElementById('btn-left');
const btnRight = document.getElementById('btn-right');
const dots = document.querySelectorAll('.dot');

if (slider) {
  let currentIndex = 0;

  // Dot güncelleme fonksiyonu
  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  // Slider'ı belirli bir indekse kaydır
  function goToSlide(index) {
    const slideWidth = slider.clientWidth;
    slider.scrollTo({
      left: slideWidth * index,
      behavior: 'smooth'
    });
    currentIndex = index;
    updateDots();
  }

  // Sol buton için tıklama eventi
  if (btnLeft) {
    btnLeft.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slider.children.length) % slider.children.length;
      goToSlide(currentIndex);
    });
  }

  // Sağ buton için tıklama eventi
  if (btnRight) {
    btnRight.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slider.children.length;
      goToSlide(currentIndex);
    });
  }

  // Dot'lar için tıklama eventleri
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
  });

  // Slider otomatik kaydırma (opsiyonel)
  let autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % slider.children.length;
    goToSlide(currentIndex);
  }, 2000);

  // Slider'a hover olunca otomatik kaydırmayı durdur
  slider.addEventListener('mouseenter', () => {
    clearInterval(autoSlide);
  });

  if (btnLeft) {
    btnLeft.addEventListener('mouseenter', () => {
      clearInterval(autoSlide);
    });
  }

  if (btnRight) {
    btnRight.addEventListener('mouseenter', () => {
      clearInterval(autoSlide);
    });
  }

  slider.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
      currentIndex = (currentIndex + 1) % slider.children.length;
      goToSlide(currentIndex);
    }, 2000);
  });

  if (btnLeft) {
    btnLeft.addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => {
        currentIndex = (currentIndex + 1) % slider.children.length;
        goToSlide(currentIndex);
      }, 2000);
    });
  }

  if (btnRight) {
    btnRight.addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => {
        currentIndex = (currentIndex + 1) % slider.children.length;
        goToSlide(currentIndex);
      }, 2000);
    });
  }

  // İlk dot'u aktif yap
  updateDots();
}

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animasyonu başlatmak için show ekle
        entry.target.classList.add('show');
      } else {
        // Element görünmez olunca show'u kaldır, animasyon yeniden oynar
        entry.target.classList.remove('show');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);

  });
  document.querySelectorAll('.fade-in-right').forEach(el => {
    observer.observe(el);

  });

});

let lastScrollY = window.scrollY;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  const headerHeight = header.offsetHeight;

  if (currentScrollY > lastScrollY && currentScrollY > 50) {
    // Aşağı kaydırıyor → gizle
    header.style.top = `-${headerHeight}px`;
  } else {
    // Yukarı kaydırıyor → göster
    header.style.top = '0';
  }

  lastScrollY = currentScrollY;
});

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const duration = 2000; // animasyon süresi (ms)
  const fps = 60; // frame sayısı

  const startCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const increment = target / (duration / (1000 / fps)); // her frame artış miktarı
    const interval = setInterval(() => {
      count += increment;
      if (count >= target) {
        counter.innerText = target;
        clearInterval(interval);
      } else {
        counter.innerText = Math.ceil(count);
      }
    }, 1000 / fps);
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => startCounter(counter));
        observer.disconnect(); // sadece bir kere çalışsın
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
});

function closePopup() {
  document.getElementById("welcomepopup").style.display = "none";
}

const highlight = document.getElementById("highlight-text");
const texts = [
  "MEC",
  "Management & Economics Community"
];

if (highlight) {
  let index = 0;        // hangi metindeyiz
  let charIndex = 0;    // harf ilerleyişi
  let deleting = false; // yazıyor mu siliyor mu?

  function typeEffect() {
    const currentText = texts[index];

    if (!deleting) {
      // yazma
      highlight.innerHTML = currentText.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentText.length) {
        // yazı bittiyse biraz bekle
        deleting = true;
        setTimeout(typeEffect, 2000);
        return;
      }
    } else {
      // silme
      highlight.innerHTML = currentText.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        deleting = false;
        index = (index + 1) % texts.length; // sıradaki metne geç
      }
    }

    // hız ayarı
    const speed = deleting ? 60 : 120;
    setTimeout(typeEffect, speed);
  }

  typeEffect(); // başlat
}

// COUNTDOWN TIMER
function initCountdown() {
  const countdownElement = document.getElementById('countdown-welcome');
  if (!countdownElement) {
    console.warn('Countdown element not found');
    return;
  }

  let countdownInterval; // Declare in outer scope so clearInterval works

  function updateCountdown() {
    // Hedef tarihi belirle: 15 Şubat 2026, Saat 10:00:00
    // Safari ve mobil uyumluluğu için ISO formatı (YYYY-MM-DDTHH:mm:ss) kullanıyoruz
    const targetDate = new Date('2026-02-15T10:00:00').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    // Zaman hesaplamaları
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    // DOM'u güncelle
    const dElem = document.getElementById('days-welcome');
    if (dElem) dElem.innerText = days < 10 ? '0' + days : days;

    const hElem = document.getElementById('hours-welcome');
    if (hElem) hElem.innerText = hours < 10 ? '0' + hours : hours;

    const mElem = document.getElementById('minutes-welcome');
    if (mElem) mElem.innerText = minutes < 10 ? '0' + minutes : minutes;

    const sElem = document.getElementById('seconds-welcome');
    if (sElem) sElem.innerText = seconds < 10 ? '0' + seconds : seconds;

    // Eğer zaman bitirse
    if (difference < 0) {
      if (dElem) dElem.innerText = '00';
      if (hElem) hElem.innerText = '00';
      if (mElem) mElem.innerText = '00';
      if (sElem) sElem.innerText = '00';
      if (countdownInterval) clearInterval(countdownInterval);
    }
  }

  updateCountdown(); // Sayfayı yüklediğinde hemen çalıştır
  countdownInterval = setInterval(updateCountdown, 1000); // Her saniyede güncelle
  console.log('✅ Countdown timer initialized for 2026-02-15T10:00:00');
}

// Sayfa yüklendiğinde countdown'ı başlat
document.addEventListener('DOMContentLoaded', initCountdown);



// Sayfa yüklendikten sonra etkinlikleri göster (Firebase'nin başlatılmasını bekle)
document.addEventListener('DOMContentLoaded', function () {
  console.log('📍 DOMContentLoaded fired, checking Firebase...');
  setTimeout(loadEventsFromStorage, 100);
  setTimeout(loadAllEventsPage, 100);
  setTimeout(loadSponsorsFromStorage, 100);
});

// Helper: Get local ISO string for comparison (YYYY-MM-DDTHH:mm)
function getLocalISOString() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000; // Offset in milliseconds
  const localISOTime = (new Date(now - offset)).toISOString().slice(0, 16);
  return localISOTime;
}

// ETKINLIK YÖNETİMİ (ANASAYFA) - Son 3 etkinliği yükle
function loadEventsFromStorage() {
  const eventsGrid = document.getElementById('eventsGrid');
  if (!eventsGrid) return; // Eğer anasayfada değilsek çalışma

  if (typeof window.db === 'undefined') {
    setTimeout(loadEventsFromStorage, 500);
    return;
  }

  try {
    console.log('📂 Loading latest 3 events from Firebase...');

    window.db.collection('events')
      .orderBy('date', 'desc')   // En son tarihli en başta
      .limit(3)
      .onSnapshot((snapshot) => {
        const events = [];
        snapshot.forEach((doc) => {
          events.push({ id: doc.id, ...doc.data() });
        });

        if (events.length === 0) {
          eventsGrid.innerHTML = '<p style="color: #666; grid-column: 1/-1; text-align: center; padding: 2rem;">Etkinlik bulunmuyor.</p>';
          return;
        }

        const eventsHTML = events.map(event => `
          <div class="event-card">
            ${event.image ? `<img src="${event.image}" loading="lazy" alt="${event.title}">` : '<div style="background: #ddd; height: 300px; display: flex; align-items: center; justify-content: center;">Resim Yok</div>'}
            <div class="event-content">
              <h3>${event.title}</h3>
              <p>${event.description.substring(0, 100)}...</p>
              <span class="event-date">${new Date(event.date).toLocaleString('tr-TR')}</span>
              <a href="${event.link || '#'}" class="event-btn">Detaylar</a>
            </div>
          </div>
        `).join('');

        eventsGrid.innerHTML = eventsHTML;
      });
  } catch (err) {
    console.error('❌ Homepage Event error:', err);
  }
}

// TÜM ETKİNLİKLER SAYFASI - Tüm etkinlikleri yükle
function loadAllEventsPage() {
  const allEventsGrid = document.getElementById('allEventsGrid');
  if (!allEventsGrid) return; // Eğer Etkinliklerimiz.html'de değilsek çalışma

  if (typeof window.db === 'undefined') {
    setTimeout(loadAllEventsPage, 500);
    return;
  }

  try {
    console.log('📂 Loading ALL events for separate page...');
    window.db.collection('events').orderBy('date', 'desc').onSnapshot((snapshot) => {
      const events = [];
      snapshot.forEach((doc) => {
        events.push({ id: doc.id, ...doc.data() });
      });

      console.log('📄 All Events Page: fetched ' + events.length + ' events.');

      if (events.length === 0) {
        allEventsGrid.innerHTML = '<p style="text-align: center; padding: 2rem;">Henüz etkinlik eklenmedi.</p>';
        return;
      }

      // Etkinliklerimiz.html tarzı listeleme (yatay kartlar)
      const eventsHTML = events.map(event => `
        <div class="event-row">
            <div class="event-image">
                ${event.image ? `<img src="${event.image}" alt="${event.title}">` : '<div style="background:#eee;height:100%;display:flex;align-items:center;justify-content:center;">Resim Yok</div>'}
            </div>
            <div class="event-content">
                
                <h3>${event.title}</h3>
                <div class="event-meta">
                    <span><i class="fas fa-clock"></i> ${new Date(event.date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })} - ${new Date(event.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <p>${event.description}</p>
                <a href="${event.link || '#'}" class="event-btn">Detaylar ve Kayıt</a>
            </div>
        </div>
      `).join('');

      allEventsGrid.innerHTML = eventsHTML;
    }, (error) => {
      console.error("❌ Firestore Snapshot Error (All Events):", error);
      allEventsGrid.innerHTML = '<p style="text-align: center; color: red;">Veriler yüklenirken bir hata oluştu: ' + error.message + '</p>';
    });
  } catch (err) {
    console.error('❌ All Events Page error:', err);
    allEventsGrid.innerHTML = '<p style="text-align: center; color: red;">Beklenmedik bir hata oluştu.</p>';
  }
}

// SPONSOR YÖNETİMİ - Firebase'den sponsorları yükle
// SPONSOR YÖNETİMİ - Firebase'den sponsorları yükle
function loadSponsorsFromStorage() {
  const container = document.getElementById('dynamic-sponsors-container');
  // Admin panelde bu container yoksa, eski id'leri de kontrol etmemize gerek yok çünkü admin panelde liste farklı yükleniyor.
  // Ancak admin panelinde "Mevcut Sponsorlar" listesi var, o ayrı. Bu fonksiyon sadece index.html için.
  if (!container) return;

  if (typeof window.db === 'undefined') {
    setTimeout(loadSponsorsFromStorage, 500);
    return;
  }

  try {
    console.log('📂 Loading sponsors from Firebase...');
    window.db.collection('sponsors').orderBy('createdAt', 'desc').onSnapshot((snapshot) => {
      const sponsors = [];
      snapshot.forEach((doc) => {
        sponsors.push({
          id: doc.id,
          ...doc.data()
        });
      });

      console.log('📦 Indirilen sponsorlar:', sponsors);

      if (sponsors.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666;">Henüz sponsor eklenmedi.</p>';
        return;
      }

      // 1. Gruplara Ayır
      // groups = { "Ana Sponsorlar": [obj, obj], "Medya": [obj] }
      const groups = {};
      sponsors.forEach(sponsor => {
        const groupName = sponsor.group || 'Diğer'; // Grup yoksa "Diğer"
        if (!groups[groupName]) {
          groups[groupName] = [];
        }
        groups[groupName].push(sponsor);
      });

      // 2. HTML Üret
      let finalHTML = '';

      // Grupları döngüye al
      Object.keys(groups).forEach(groupName => {
        const groupSponsors = groups[groupName];

        // Başlık
        finalHTML += `<h2>${groupName}</h2>`;

        // Grid Başlangıcı
        finalHTML += `<div class="sponsors-grid">`;

        // Kartlar
        groupSponsors.forEach(sponsor => {
          finalHTML += `
            <div class="sponsor-card">
              ${sponsor.image ? `<img src="${sponsor.image}" loading="lazy" alt="${sponsor.name}">` : '<div style="display:flex;align-items:center;justify-content:center;height:100%;width:100%;color:#ccc;">Logo Yok</div>'}
            </div>
          `;
        });

        // Grid Bitişi
        finalHTML += `</div><br>`;
      });

      container.innerHTML = finalHTML;
      console.log('✅ Firebase sponsors loaded & grouped:', Object.keys(groups));
    }, (error) => {
      console.error("❌ Sponsor snapshot error:", error);
      container.innerHTML = '<p style="color:red; text-align:center">Sponsorlar yüklenirken hata oluştu.</p>';
    });
  } catch (err) {
    console.error('❌ Sponsor loading error:', err);
  }
}





