document.addEventListener('DOMContentLoaded', () => {
  const hamburgers = document.querySelectorAll('.hamburger');

  hamburgers.forEach(hamburger => {
    const nav = hamburger.closest('header').querySelector('nav ul');

    if (nav) {
      hamburger.addEventListener('click', () => {
        nav.classList.toggle('show');
      });
    }
  });
});