import { DATA_URL } from '../shared/constants.js';

const registerForm = document.getElementById('student-register-form');
const nombreInput = document.getElementById('nombre');
const universidadInput = document.getElementById('universidad');
const emailInput = document.getElementById('email');
const grupoInput = document.getElementById('grupo');
const mensajeTextarea = document.getElementById('mensaje');

/* ─────────────────────────────────────────────
   1. FETCH — carga paquetes y muestra recomendado
   ───────────────────────────────────────────── */
async function fetchAndShowPackageNote() {
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const tableWrapper = document.querySelector('#student-packages .table-wrapper');
    if (!tableWrapper) return;

    const note = document.createElement('p');
    note.className = 'packages-fetched-note';
    note.textContent = `Contamos con ${data.packages.students.length} paquetes disponibles. El Estándar es el más elegido por grupos universitarios.`;
    tableWrapper.after(note);
  } catch (err) {
    console.error('Error cargando paquetes:', err);
  }
}

/* ─────────────────────────────────────────────
   2. DOM EVENTO — plan recomendado por tamaño de grupo
   ───────────────────────────────────────────── */
function showPlanRecommendation() {
  document.getElementById('plan-recommendation')?.remove();

  const count = parseInt(grupoInput.value, 10);
  if (!count || count < 1) return;

  let plan, desc;
  if (count >= 20) {
    plan = 'Premium';
    desc = '30% de descuento · 32 kg equipaje · seguro completo · cambios ilimitados';
  } else if (count >= 10) {
    plan = 'Estándar';
    desc = '20% de descuento · 23 kg equipaje · 1 cambio de fecha gratis · cobertura básica';
  } else if (count >= 5) {
    plan = 'Básico';
    desc = '10% de descuento · solo equipaje de mano incluido';
  } else {
    const warn = document.createElement('span');
    warn.id = 'plan-recommendation';
    warn.className = 'field-warning';
    warn.textContent = 'El mínimo para acceder al programa es 5 integrantes.';
    grupoInput.parentElement.appendChild(warn);
    return;
  }

  const rec = document.createElement('p');
  rec.id = 'plan-recommendation';
  rec.className = 'plan-recommendation';
  rec.innerHTML = `<strong>Plan recomendado:</strong> ${plan} — ${desc}`;
  grupoInput.parentElement.appendChild(rec);

  localStorage.setItem('luckyair_student_group_size', count);
}

/* ─────────────────────────────────────────────
   3. VALIDACIÓN — formulario de registro estudiantil
   ───────────────────────────────────────────── */
function validateStudentForm(e) {
  e.preventDefault();
  clearErrors();

  let valid = true;

  if (nombreInput.value.trim().length < 3) {
    showError(nombreInput, 'El nombre debe tener al menos 3 caracteres.');
    valid = false;
  }

  if (!universidadInput.value.trim()) {
    showError(universidadInput, 'Ingresa el nombre de tu universidad.');
    valid = false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
    showError(emailInput, 'Ingresa un correo institucional válido (ej. correo@uni.edu.pe).');
    valid = false;
  }

  const groupCount = parseInt(grupoInput.value, 10);
  if (!groupCount || groupCount < 5) {
    showError(grupoInput, 'El grupo debe tener mínimo 5 integrantes para acceder al programa.');
    valid = false;
  }

  if (mensajeTextarea.value.trim().length < 10) {
    showError(mensajeTextarea, 'Cuéntanos sobre tu viaje (mínimo 10 caracteres).');
    valid = false;
  }

  if (valid) {
    localStorage.setItem('luckyair_student_name', nombreInput.value.trim());
    localStorage.setItem('luckyair_student_uni', universidadInput.value.trim());
    showSuccess('¡Solicitud enviada! Un asesor de Lucky Air te contactará en menos de 48 horas hábiles.');
    registerForm.reset();
    document.getElementById('plan-recommendation')?.remove();
  }
}

/* ─────────────────────────────────────────────
   4. LOCALSTORAGE — precarga datos guardados
   ───────────────────────────────────────────── */
function loadSavedData() {
  const savedName  = localStorage.getItem('luckyair_student_name');
  const savedUni   = localStorage.getItem('luckyair_student_uni');
  const savedGroup = localStorage.getItem('luckyair_student_group_size');

  if (savedName  && nombreInput)      nombreInput.value      = savedName;
  if (savedUni   && universidadInput) universidadInput.value = savedUni;
  if (savedGroup && grupoInput) {
    grupoInput.value = savedGroup;
    showPlanRecommendation();
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
  registerForm.querySelectorAll('.field-error, .field-warning').forEach(e => e.remove());
  registerForm.querySelectorAll('.input-error').forEach(e => e.classList.remove('input-error'));
  registerForm.querySelector('.form-success')?.remove();
}

function showSuccess(msg) {
  const p = document.createElement('p');
  p.className = 'form-success';
  p.setAttribute('role', 'alert');
  p.textContent = msg;
  registerForm.appendChild(p);
}

/* ─────────────────────────────────────────────
   Init
   ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadSavedData();
  fetchAndShowPackageNote();
  registerForm?.addEventListener('submit', validateStudentForm);
  grupoInput?.addEventListener('input', showPlanRecommendation);
});
