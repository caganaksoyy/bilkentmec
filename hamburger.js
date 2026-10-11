document.addEventListener('DOMContentLoaded', () => {
  const hamburgers = document.querySelectorAll('.hamburger');

  hamburgers.forEach(hamburger => {
    const header = hamburger.closest('header');
    const nav = header.querySelector('.nav-links');
    if (!nav) return;

    function setOpen(open) {
      nav.classList.toggle('show', open);
      hamburger.setAttribute('aria-expanded', String(open));
      hamburger.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
      hamburger.textContent = open ? '✕' : '☰';
    }

    hamburger.addEventListener('click', () => {
      setOpen(!nav.classList.contains('show'));
    });

    // Aynı sayfadaki #anchor linklerinde sayfa yenilenmediği için menüyü elle kapat
    nav.addEventListener('click', (e) => {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('click', (e) => {
      if (nav.classList.contains('show') && !header.contains(e.target)) setOpen(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('show')) {
        setOpen(false);
        hamburger.focus();
      }
    });
  });
});
