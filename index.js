/* =============================================================
   INDEX.JS — Lucky Air
   Interacciones específicas de index.html (home page).
   ============================================================= */

console.log('✅ Lucky Air – index.js conectado');

/* -----------------------------------------------------------
   1. Tarjetas de destino seleccionables
   Selector: .destination-card
   Evento: click
   Efecto: toggle clase destination-card--seleccionada
   ----------------------------------------------------------- */
document.querySelectorAll('.destination-card').forEach((card) => {
  card.addEventListener('click', () => {
    card.classList.toggle('destination-card--seleccionada');
  });
});

/* -----------------------------------------------------------
   2. Vista previa de vuelo en tiempo real
   Inputs: #origin, #destination
   Outputs: #preview-origin, #preview-dest
   Evento: input
   Efecto: actualiza el texto del preview letra a letra
   ----------------------------------------------------------- */
const originInput   = document.querySelector('#origin');
const destInput     = document.querySelector('#destination');
const previewOrigin = document.querySelector('#preview-origin');
const previewDest   = document.querySelector('#preview-dest');

console.log('Preview elements:', { originInput, destInput, previewOrigin, previewDest });

if (originInput && previewOrigin) {
  originInput.addEventListener('input', () => {
    console.log('Origin input changed:', originInput.value);
    previewOrigin.textContent = originInput.value || '---';
  });
} else {
  console.warn('Origin preview listener not attached');
}

if (destInput && previewDest) {
  destInput.addEventListener('input', () => {
    console.log('Destination input changed:', destInput.value);
    previewDest.textContent = destInput.value || '---';
  });
} else {
  console.warn('Destination preview listener not attached');
}

/* -----------------------------------------------------------
   3. Beneficios desplegables (sección ¿Por qué Lucky Air?)
   Selector: #why-lucky-air .feature-item
   Evento: click
   Efecto: toggle clase oculta en el <p> de cada beneficio
   ----------------------------------------------------------- */
document.querySelectorAll('#why-lucky-air .feature-item').forEach((item) => {
  const desc = item.querySelector('p');
  if (desc) {
    desc.classList.add('oculta');
    item.addEventListener('click', () => {
      desc.classList.toggle('oculta');
    });
  }
});
