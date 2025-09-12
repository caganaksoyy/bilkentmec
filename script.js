

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

    






