

// Slider ve kontrol elemanlarını seç
const slider = document.getElementById('slider');
const btnLeft = document.getElementById('btn-left');
const btnRight = document.getElementById('btn-right');
const dots = document.querySelectorAll('.dot');

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
btnLeft.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slider.children.length) % slider.children.length;
  goToSlide(currentIndex);
});

// Sağ buton için tıklama eventi
btnRight.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slider.children.length;
  goToSlide(currentIndex);
});

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

btnLeft.addEventListener('mouseenter', () => {
  clearInterval(autoSlide);
});

btnRight.addEventListener('mouseenter', () => {
  clearInterval(autoSlide);
});

slider.addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % slider.children.length;
    goToSlide(currentIndex);
  }, 2000);
});

btnLeft.addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % slider.children.length;
    goToSlide(currentIndex);
  }, 2000);
});

btnRight.addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % slider.children.length;
    goToSlide(currentIndex);
  }, 2000);
});

// İlk dot'u aktif yap
updateDots();

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

// COUNTDOWN TIMER
function initCountdown() {
  const countdownElement = document.getElementById('countdown-welcome');
  if (!countdownElement) {
    console.warn('Countdown element not found');
    return;
  }

  let countdownInterval; // Declare in outer scope so clearInterval works

  function updateCountdown() {
    // Hedef tarihi belirle: 7 Aralık 2025, Saat 11:00
    const targetDate = new Date('February 15, 2026 10:00:00').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    // Zaman hesaplamaları
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    // DOM'u güncelle
    document.getElementById('days-welcome').innerText = days < 10 ? '0' + days : days;
    document.getElementById('hours-welcome').innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes-welcome').innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds-welcome').innerText = seconds < 10 ? '0' + seconds : seconds;

    // Eğer zaman bitirse
    if (difference < 0) {
      document.getElementById('days-welcome').innerText = '00';
      document.getElementById('hours-welcome').innerText = '00';
      document.getElementById('minutes-welcome').innerText = '00';
      document.getElementById('seconds-welcome').innerText = '00';
      if (countdownInterval) clearInterval(countdownInterval);
    }
  }

  updateCountdown(); // Sayfayı yüklediğinde hemen çalıştır
  countdownInterval = setInterval(updateCountdown, 1000); // Her saniyede güncelle
  console.log('✅ Countdown timer initialized');
}

// Sayfa yüklendiğinde countdown'ı başlat
document.addEventListener('DOMContentLoaded', initCountdown);

// ETKINLIK YÖNETİMİ - Firebase'den etkinlikleri yükle
function loadEventsFromStorage() {
  // Defensive check: wait for db to be defined (check window.db since we make it global in index.html)
  if (typeof window.db === 'undefined') {
    console.warn('⚠️ Firebase db not initialized yet, retrying in 500ms...');
    setTimeout(loadEventsFromStorage, 500);
    return;
  }

  try {
    console.log('📂 Loading events from Firebase...');
    // Firebase'den etkinlikleri oku
    window.db.collection('events').orderBy('date', 'asc').limit(3).onSnapshot((snapshot) => {
      const events = [];
      snapshot.forEach((doc) => {
        events.push({
          id: doc.id,
          ...doc.data()
        });
      });

      const eventsGrid = document.getElementById('eventsGrid');

      // Eğer etkinlik yoksa hiç bir şey gösterme
      if (events.length === 0) {
        eventsGrid.innerHTML = '<p style="color: #666; grid-column: 1/-1; text-align: center; padding: 2rem;">Henüz etkinlik eklenmedi.</p>';
        console.log('ℹ️ No events found in Firebase');
        return;
      }

      // Firebase'daki etkinlikleri HTML'e çevir
      const eventsHTML = events.map(event => `
        <div class="event-card">
          ${event.image ? `<img src="${event.image}" loading="lazy" alt="${event.title}">` : '<div style="background: #ddd; height: 300px; display: flex; align-items: center; justify-content: center;">Resim Yok</div>'}
          <div class="event-content">
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <span class="event-date">${new Date(event.date).toLocaleString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}</span>
            <a href="${event.link || 'https://instagram.com/bilkentmec'}" class="event-btn">Detaylar</a>
          </div>
        </div>
      `).join('');

      eventsGrid.innerHTML = eventsHTML;
      console.log('✅ Firebase events loaded:', events.length);
    });
  } catch (err) {
    console.error('❌ Event loading error:', err);
  }
}

// Sayfa yüklendikten sonra etkinlikleri göster (Firebase'nin başlatılmasını bekle)
document.addEventListener('DOMContentLoaded', function () {
  console.log('📍 DOMContentLoaded fired, checking Firebase...');
  setTimeout(loadEventsFromStorage, 100);
  setTimeout(loadSponsorsFromStorage, 100);
});

// SPONSOR YÖNETİMİ - Firebase'den sponsorları yükle
function loadSponsorsFromStorage() {
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

      const mbsGrid = document.getElementById('mbs-sponsors');
      const stepGrid = document.getElementById('stepforward-sponsors');

      let mbsHTML = '';
      let stepHTML = '';

      // Gruplara ayır
      sponsors.forEach(sponsor => {
        const cardHTML = `
          <div class="sponsor-card">
            ${sponsor.image ? `<img src="${sponsor.image}" loading="lazy" alt="${sponsor.name}">` : '<div style="display:flex;align-items:center;justify-content:center;height:100%;width:100%;color:#ccc;">Logo Yok</div>'}
          </div>
        `;

        if (sponsor.group === 'MBS') {
          mbsHTML += cardHTML;
        } else if (sponsor.group === 'StepForward') {
          stepHTML += cardHTML;
        }
      });

      // HTML'e bas
      if (mbsGrid) mbsGrid.innerHTML = mbsHTML || '<p style="grid-column: 1/-1; text-align: center; color: #666;">Henüz MBS sponsoru eklenmedi.</p>';
      if (stepGrid) stepGrid.innerHTML = stepHTML || '<p style="grid-column: 1/-1; text-align: center; color: #666;">Henüz StepForward sponsoru eklenmedi.</p>';

      console.log('✅ Firebase sponsors loaded:', sponsors.length);
    });
  } catch (err) {
    console.error('❌ Sponsor loading error:', err);
  }
}








