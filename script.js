

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

  if (currentScrollY > lastScrollY && currentScrollY > 50) {
    // Aşağı kaydırıyor ve biraz scroll olmuşsa gizle
    header.style.top = `-100px`; // header yüksekliğinden fazla bir değer ver, mesela 100px
  } else {
    // Yukarı kaydırıyor veya çok başta scroll
    header.style.top = '0';
  }

  lastScrollY = currentScrollY;
});




