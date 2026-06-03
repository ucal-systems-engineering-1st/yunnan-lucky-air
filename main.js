/* =============================================================
   MAIN.JS — Lucky Air
   Interacciones globales: cargado en TODAS las vistas.
   Solo contiene lógica que aplica a todos los headers.
   ============================================================= */

console.log('✅ Lucky Air – main.js conectado');

/* -----------------------------------------------------------
   Menú hamburguesa (móvil)
   Aplica a cualquier vista que tenga #menu-toggle / #main-links
   ----------------------------------------------------------- */
const menuToggle = document.querySelector('#menu-toggle');
const mainLinks  = document.querySelector('#main-links');

if (menuToggle && mainLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainLinks.classList.toggle('header__links--open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  mainLinks.querySelectorAll('.header__link').forEach((link) => {
    link.addEventListener('click', () => {
      mainLinks.classList.remove('header__links--open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menú');
    });
  });
}
