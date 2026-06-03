import { ENTERPRISE_URL } from '../shared/constants.js';

const enterpriseForm    = document.querySelector('#corporateForm');
const errorMessage      = document.querySelector('#errorMessage');
const successMessage    = document.querySelector('#successMessage');
const companyNameInput  = document.querySelector('#company-name');
const companyEmailInput = document.querySelector('#company-email');
const employeesInput    = document.querySelector('#company-employees');

/* ─────────────────────────────────────────────
   1. DOM EVENTO — estado activo del formulario
   ───────────────────────────────────────────── */
document.addEventListener('click', (e) => {
  if (enterpriseForm.contains(e.target)) {
    enterpriseForm.classList.add('active');
  } else {
    enterpriseForm.classList.remove('active');
  }
});

/* ─────────────────────────────────────────────
   2. DOM EVENTO — plan recomendado por empleados
   ───────────────────────────────────────────── */
function showPlanRecommendation() {
  document.getElementById('plan-recommendation')?.remove();

  const count = parseInt(employeesInput.value, 10);
  if (!count || count < 1) return;

  let plan, desc;
  if (count >= 51) {
    plan = 'Plan Enterprise';
    desc = 'Asesor dedicado, facturación consolidada y acceso API.';
  } else if (count >= 11) {
    plan = 'Plan Estándar';
    desc = 'Tarifas corporativas + reportes mensuales + prioridad en check-in.';
  } else {
    plan = 'Plan Básico';
    desc = 'Tarifas corporativas exclusivas y reservas centralizadas.';
  }

  const rec = document.createElement('p');
  rec.id = 'plan-recommendation';
  rec.className = 'plan-recommendation';
  rec.innerHTML = `<strong>Plan recomendado:</strong> ${plan} — ${desc}`;
  employeesInput.parentElement.appendChild(rec);
}

/* ─────────────────────────────────────────────
   3. VALIDACIÓN client-side
   ───────────────────────────────────────────── */
function validateForm() {
  clearErrors();
  let valid = true;

  if (!companyNameInput.value.trim()) {
    showFieldError(companyNameInput, 'El nombre de la empresa es obligatorio.');
    valid = false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(companyEmailInput.value.trim())) {
    showFieldError(companyEmailInput, 'Ingresa un correo corporativo válido (ej. contacto@empresa.com).');
    valid = false;
  }

  const employees = parseInt(employeesInput.value, 10);
  if (!employees || employees < 1) {
    showFieldError(employeesInput, 'Ingresa el número de empleados (mínimo 1).');
    valid = false;
  }

  return valid;
}

/* ─────────────────────────────────────────────
   4. FETCH — submit con POST a n8n + localStorage
   ───────────────────────────────────────────── */
enterpriseForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  errorMessage.textContent   = '';
  successMessage.textContent = '';

  const body = {
    nombre_empresa:     companyNameInput.value.trim(),
    correo_corporativo: companyEmailInput.value.trim(),
    numero_empleados:   Number(employeesInput.value),
  };

  localStorage.setItem('luckyair_company_name', body.nombre_empresa);

  try {
    const response = await fetch(ENTERPRISE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error del servidor: ${response.status}`);
    }

    successMessage.textContent = data.message || 'Registro exitoso. Un asesor se pondrá en contacto pronto.';
    enterpriseForm.reset();
    document.getElementById('plan-recommendation')?.remove();

  } catch (error) {
    errorMessage.textContent = error.message || 'Error al registrar la empresa. Por favor, inténtalo de nuevo.';
  }
});

/* ─────────────────────────────────────────────
   5. LOCALSTORAGE — precarga nombre de empresa
   ───────────────────────────────────────────── */
function loadSavedCompany() {
  const saved = localStorage.getItem('luckyair_company_name');
  if (saved && companyNameInput) companyNameInput.value = saved;
}

/* ─────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────── */
function showFieldError(input, msg) {
  const span = document.createElement('span');
  span.className = 'field-error';
  span.setAttribute('role', 'alert');
  span.textContent = msg;
  input.parentElement.appendChild(span);
  input.classList.add('input-error');
}

function clearErrors() {
  enterpriseForm.querySelectorAll('.field-error').forEach(e => e.remove());
  enterpriseForm.querySelectorAll('.input-error').forEach(e => e.classList.remove('input-error'));
}

/* ─────────────────────────────────────────────
   Init
   ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadSavedCompany();
  employeesInput?.addEventListener('input', showPlanRecommendation);
});
