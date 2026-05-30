import { ENTERPRISE_URL } from '../constants/constants.js';

const enterpriseForm = document.querySelector('#corporateForm');
const errorMessage = document.querySelector('#errorMessage');
const successMessage = document.querySelector('#successMessage');

document.addEventListener('click', (e) => {
    const clickDentro = enterpriseForm.contains(e.target);
    if (clickDentro) {
        enterpriseForm.classList.add('active');
    } else {
        enterpriseForm.classList.remove('active');
    }
});

enterpriseForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    errorMessage.textContent = '';
    successMessage.textContent = '';

    const formData = new FormData(enterpriseForm);
    const body = {
        nombre_empresa: formData.get('company_name'),
        correo_corporativo: formData.get('company_email'),
        numero_empleados: Number(formData.get('company_employees'))
    };

    try {
        const response = await fetch(ENTERPRISE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `Error del servidor: ${response.status}`);
        }

        successMessage.textContent = data.message || 'Registro exitoso';

    } catch (error) {
        errorMessage.textContent = error.message || 'Error al registrar la empresa. Por favor, inténtalo de nuevo.';
    }
});