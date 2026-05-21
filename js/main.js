/* =============================================================
   MAIN.JS — Lucky Air
   Archivo: js/main.js
   Interacciones globales del sitio (navegación móvil, etc.)
   ============================================================= */

console.log('✅ Lucky Air – main.js conectado');

/* -----------------------------------------------------------
   1. Menú hamburguesa (móvil)
   ----------------------------------------------------------- */
const menuToggle = document.querySelector('#menu-toggle');
const mainLinks = document.querySelector('#main-links');

if (menuToggle && mainLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainLinks.classList.toggle('header__links--open');

    // Actualizar atributos de accesibilidad
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute(
      'aria-label',
      isOpen ? 'Cerrar menú' : 'Abrir menú'
    );
  });

  // Cerrar menú al hacer clic en un enlace (mejor UX en móvil)
  mainLinks.querySelectorAll('.header__link').forEach((link) => {
    link.addEventListener('click', () => {
      mainLinks.classList.remove('header__links--open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menú');
    });
  });
}
