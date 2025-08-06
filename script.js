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