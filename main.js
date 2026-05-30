/* =============================================================
   MAIN.JS — Lucky Air
   Interacciones globales del sitio
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

const destinationCards = document.querySelectorAll('.destination-card');

destinationCards.forEach((card) => {
  card.addEventListener('click', () => {
    card.classList.toggle('destination-card--seleccionada');
  });
});



const originInput = document.querySelector('#origin');
const destInput = document.querySelector('#destination');
const previewOrigin = document.querySelector('#preview-origin');
const previewDest = document.querySelector('#preview-dest');

if (originInput && previewOrigin) {
  originInput.addEventListener('input', () => {
    previewOrigin.textContent = originInput.value || '---';
  });
}

if (destInput && previewDest) {
  destInput.addEventListener('input', () => {
    previewDest.textContent = destInput.value || '---';
  });
}

/* -----------------------------------------------------------
   4. Ej.3 — Beneficio desplegable (¿Por qué Lucky Air?)
   Concepto: classList.toggle('oculta') + display: none en CSS
   ----------------------------------------------------------- */
const featureItems = document.querySelectorAll('#why-lucky-air .feature-item');

featureItems.forEach((item) => {
  const desc = item.querySelector('p');
  if (desc) {
    desc.classList.add('oculta');
    item.addEventListener('click', () => {
      desc.classList.toggle('oculta');
    });
  }
});
