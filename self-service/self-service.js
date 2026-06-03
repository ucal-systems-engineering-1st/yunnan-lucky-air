import { DATA_URL } from '../shared/constants.js';

const flightStatusForm = document.getElementById('flight-status-form');
const flightNumberInput = document.getElementById('flight-number');

/* ─────────────────────────────────────────────
   1. LOCALSTORAGE — recordar último vuelo buscado
   ───────────────────────────────────────────── */
function saveLastFlight(number) {
  localStorage.setItem('luckyair_last_flight', number);
}

function loadLastFlight() {
  const saved = localStorage.getItem('luckyair_last_flight');
  if (saved && flightNumberInput) flightNumberInput.value = saved;
}

/* ─────────────────────────────────────────────
   2. FETCH + RENDER — consulta de estado de vuelo
   ───────────────────────────────────────────── */
async function searchFlightStatus(e) {
  e.preventDefault();
  clearResult();

  const raw = flightNumberInput.value.trim().toUpperCase();

  if (!raw) {
    showFieldError(flightNumberInput, 'Ingresa el número de vuelo (ej. LK 203).');
    return;
  }

  saveLastFlight(raw);
  renderLoading();

  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const normalize = str => str.replace(/\s+/g, '').toUpperCase();
    const match = data.flights.find(f => normalize(f.number) === normalize(raw));

    clearResult();
    if (match) {
      renderFlightResult(match);
    } else {
      renderNotFound(raw);
    }
  } catch (err) {
    clearResult();
    renderError();
    console.error('Error consultando estado del vuelo:', err);
  }
}

/* ─────────────────────────────────────────────
   3. DOM EVENTO — render dinámico del resultado
   ───────────────────────────────────────────── */
function renderFlightResult(flight) {
  const statusClass = {
    'A tiempo':  'flight-result__status--ontime',
    'Demorado':  'flight-result__status--delayed',
    'Cancelado': 'flight-result__status--cancelled',
  }[flight.status] ?? 'flight-result__status--unknown';

  const div = document.createElement('div');
  div.id = 'flight-result';
  div.className = 'flight-result';
  div.setAttribute('role', 'region');
  div.setAttribute('aria-label', `Resultado vuelo ${flight.number}`);
  div.innerHTML = `
    <h3>Vuelo ${flight.number}</h3>
    <p class="flight-result__status ${statusClass}" aria-live="polite">${flight.status}</p>
    <ul class="flight-result__details">
      <li><strong>Origen:</strong> ${flight.origin}</li>
      <li><strong>Destino:</strong> ${flight.destination}</li>
      <li><strong>Salida:</strong> ${flight.departure}</li>
      <li><strong>Llegada:</strong> ${flight.arrival}</li>
      <li><strong>Fecha:</strong> ${flight.date}</li>
    </ul>
  `;
  flightStatusForm.after(div);
}

function renderNotFound(number) {
  const div = document.createElement('div');
  div.id = 'flight-result';
  div.className = 'flight-result flight-result--empty';
  div.innerHTML = `<p>No encontramos el vuelo <strong>${number}</strong>. Verifica el número e inténtalo nuevamente.</p>`;
  flightStatusForm.after(div);
}

function renderError() {
  const div = document.createElement('div');
  div.id = 'flight-result';
  div.className = 'flight-result flight-result--error';
  div.innerHTML = `<p>No pudimos consultar el estado en este momento. Inténtalo en unos instantes.</p>`;
  flightStatusForm.after(div);
}

function renderLoading() {
  const div = document.createElement('div');
  div.id = 'flight-result';
  div.className = 'flight-result flight-result--loading';
  div.setAttribute('aria-live', 'polite');
  div.innerHTML = `<p>Consultando vuelo…</p>`;
  flightStatusForm.after(div);
}

/* ─────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────── */
function clearResult() {
  document.getElementById('flight-result')?.remove();
  flightStatusForm.querySelectorAll('.field-error').forEach(e => e.remove());
  flightNumberInput.classList.remove('input-error');
}

function showFieldError(input, msg) {
  const span = document.createElement('span');
  span.className = 'field-error';
  span.setAttribute('role', 'alert');
  span.textContent = msg;
  input.parentElement.appendChild(span);
  input.classList.add('input-error');
}

/* ─────────────────────────────────────────────
   Init
   ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadLastFlight();
  flightStatusForm?.addEventListener('submit', searchFlightStatus);
});
