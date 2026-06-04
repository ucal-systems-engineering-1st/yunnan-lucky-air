/* =============================================================
   INDEX.JS — Lucky Air
   Interacciones específicas de index.html (home page).
   ============================================================= */

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
