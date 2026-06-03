import { DATA_URL } from '../shared/constants.js';

const postsContainer = document.querySelector('.community-posts');
const shareForm = document.getElementById('community-share-form');
const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const destinoSelect = document.getElementById('destino');
const tituloInput = document.getElementById('titulo');
const mensajeTextarea = document.getElementById('mensaje');

/* ─────────────────────────────────────────────
   1. FETCH — carga reseñas desde site-data.json
   ───────────────────────────────────────────── */
async function fetchAndRenderReviews() {
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    data.reviews.forEach(review => {
      const article = document.createElement('article');
      article.className = 'community-card community-card--fetched';
      article.dataset.destination = review.destination.toLowerCase();
      article.innerHTML = `
        <div class="card-body">
          <span class="card-tag">${review.destination}</span>
          <h3>${review.title}</h3>
          <p>${review.comment}</p>
          <footer class="card-footer">
            <span>Por <strong>${review.user}</strong></span>
            <time datetime="${review.date}">${formatDate(review.date)}</time>
          </footer>
        </div>
      `;
      postsContainer.appendChild(article);
    });

    setupFilter();
  } catch (err) {
    console.error('No se pudieron cargar las reseñas:', err);
  }
}

/* ─────────────────────────────────────────────
   2. DOM EVENTO — filtro del muro por destino
   ───────────────────────────────────────────── */
function setupFilter() {
  document.getElementById('post-filter')?.remove();

  const filterContainer = document.createElement('div');
  filterContainer.id = 'post-filter';
  filterContainer.className = 'post-filter';
  filterContainer.setAttribute('role', 'group');
  filterContainer.setAttribute('aria-label', 'Filtrar por destino');

  ['Todos', 'Dali', 'Xishuangbanna', 'Kunming'].forEach(tag => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `filter-btn${tag === 'Todos' ? ' filter-btn--active' : ''}`;
    btn.textContent = tag;
    btn.addEventListener('click', () => filterByDestination(tag, btn));
    filterContainer.appendChild(btn);
  });

  postsContainer.closest('section')?.insertBefore(filterContainer, postsContainer);
}

function filterByDestination(tag, activeBtn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('filter-btn--active'));
  activeBtn.classList.add('filter-btn--active');

  document.querySelectorAll('.community-card').forEach(card => {
    const cardTag = card.querySelector('.card-tag')?.textContent?.trim();
    card.style.display = (tag === 'Todos' || cardTag === tag) ? '' : 'none';
  });
}

/* ─────────────────────────────────────────────
   3. LOCALSTORAGE — borrador del formulario
   ───────────────────────────────────────────── */
function saveDraft() {
  localStorage.setItem('luckyair_community_draft', JSON.stringify({
    nombre: nombreInput.value,
    email: emailInput.value,
    destino: destinoSelect.value,
    titulo: tituloInput.value,
    mensaje: mensajeTextarea.value,
  }));
}

function loadDraft() {
  try {
    const saved = localStorage.getItem('luckyair_community_draft');
    if (!saved) return;
    const draft = JSON.parse(saved);
    if (draft.nombre)  nombreInput.value   = draft.nombre;
    if (draft.email)   emailInput.value    = draft.email;
    if (draft.destino) destinoSelect.value = draft.destino;
    if (draft.titulo)  tituloInput.value   = draft.titulo;
    if (draft.mensaje) mensajeTextarea.value = draft.mensaje;
  } catch (_) {}
}

/* ─────────────────────────────────────────────
   4. VALIDACIÓN — formulario compartir experiencia
   ───────────────────────────────────────────── */
function validateShareForm(e) {
  e.preventDefault();
  clearErrors();

  let valid = true;

  if (!nombreInput.value.trim()) {
    showError(nombreInput, 'El nombre es obligatorio.');
    valid = false;
  }

  if (!emailInput.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
    showError(emailInput, 'Ingresa un correo electrónico válido.');
    valid = false;
  }

  if (!destinoSelect.value) {
    showError(destinoSelect, 'Selecciona el destino que visitaste.');
    valid = false;
  }

  if (tituloInput.value.trim().length < 5) {
    showError(tituloInput, 'El título debe tener al menos 5 caracteres.');
    valid = false;
  }

  if (mensajeTextarea.value.trim().length < 20) {
    showError(mensajeTextarea, 'Cuéntanos un poco más (mínimo 20 caracteres).');
    valid = false;
  }

  if (valid) {
    localStorage.removeItem('luckyair_community_draft');
    showSuccess(shareForm, '¡Gracias! Tu experiencia ha sido publicada.');
    shareForm.reset();
  }
}

/* ─────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────── */
function showError(input, msg) {
  const span = document.createElement('span');
  span.className = 'field-error';
  span.setAttribute('role', 'alert');
  span.textContent = msg;
  input.parentElement.appendChild(span);
  input.classList.add('input-error');
}

function clearErrors() {
  shareForm.querySelectorAll('.field-error').forEach(e => e.remove());
  shareForm.querySelectorAll('.input-error').forEach(e => e.classList.remove('input-error'));
  shareForm.querySelector('.form-success')?.remove();
}

function showSuccess(form, msg) {
  const p = document.createElement('p');
  p.className = 'form-success';
  p.textContent = msg;
  form.appendChild(p);
}

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-');
  const months = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`;
}

/* ─────────────────────────────────────────────
   Init
   ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadDraft();
  fetchAndRenderReviews();

  shareForm.addEventListener('submit', validateShareForm);

  [nombreInput, emailInput, destinoSelect, tituloInput, mensajeTextarea].forEach(el => {
    el.addEventListener('input', saveDraft);
    el.addEventListener('change', saveDraft);
  });
});
