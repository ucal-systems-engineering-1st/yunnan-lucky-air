---
name: frontend-js
description: >
  Reglas de JavaScript para DOM, eventos, validación, localStorage y Fetch API para el curso
  Fundamentos de Desarrollo Frontend (UCAL 2026-1). Incluye requisitos mínimos de EE3
  y criterios de la rúbrica.
  Trigger: Al escribir o editar JavaScript, manipular el DOM, implementar localStorage o Fetch.
license: MIT
metadata:
  author: ucal-frontend
  version: "1.0.0"
---

## Cuándo usar

- Al crear o editar cualquier archivo `.js`
- Al implementar interacciones con el DOM
- Al validar formularios con JavaScript
- Al usar `localStorage` para persistencia
- Al consumir datos con `fetch()` y renderizar dinámicamente
- Al depurar errores en la consola del navegador

---

## Patrones críticos

### 1. Integración del script — estructura de archivos

```text
scripts/
└── main.js      ← archivo principal de JavaScript
data/
└── site-data.json   ← datos para Fetch (si aplica)
```

```html
<!-- En index.html — SIEMPRE al final del body o con defer -->
<script src="scripts/main.js" defer></script>
```

- NUNCA usar JavaScript inline (`onclick="..."`, `<script>` en head sin defer)
- SIEMPRE verificar con `console.log` que el script carga correctamente

### 2. DOM e interacciones (mínimo 2)

```javascript
// Selección de elementos
const boton = document.querySelector('#mi-boton');
const seccion = document.querySelector('.mi-seccion');
const items = document.querySelectorAll('.item');

// Interacción 1: toggle de tema
const themeBtn = document.querySelector('#toggle-theme');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  const activo = document.body.classList.contains('dark-theme');
  themeBtn.textContent = activo ? 'Modo claro' : 'Modo oscuro';
});

// Interacción 2: mostrar/ocultar sección
const verMasBtn = document.querySelector('#ver-mas');
const contenido = document.querySelector('#contenido-extra');
verMasBtn.addEventListener('click', () => {
  contenido.classList.toggle('hidden');
});
```

- SIEMPRE usar `addEventListener` — NUNCA atributos `onclick` inline
- SIEMPRE verificar que el elemento existe antes de operar (`if (elemento) { ... }`)
- SIEMPRE usar `classList.add/remove/toggle` para cambios visuales

### 3. Validación de formulario con retroalimentación

```javascript
const formulario = document.querySelector('#contact-form');

formulario.addEventListener('submit', (e) => {
  e.preventDefault();   // SIEMPRE interceptar el envío

  const nombre = document.querySelector('#nombre').value.trim();
  const email = document.querySelector('#email').value.trim();
  const mensaje = document.querySelector('#mensaje').value.trim();
  const feedback = document.querySelector('#feedback');

  // Limpiar mensajes anteriores
  feedback.textContent = '';
  feedback.className = '';

  // Validar
  if (!nombre) {
    feedback.textContent = 'Por favor ingresa tu nombre.';
    feedback.classList.add('error');
    return;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    feedback.textContent = 'Por favor ingresa un correo válido.';
    feedback.classList.add('error');
    return;
  }
  if (!mensaje) {
    feedback.textContent = 'Por favor escribe un mensaje.';
    feedback.classList.add('error');
    return;
  }

  // Éxito
  feedback.textContent = '¡Mensaje enviado exitosamente!';
  feedback.classList.add('success');
  formulario.reset();
});
```

- SIEMPRE usar `e.preventDefault()` en el submit
- SIEMPRE mostrar mensajes claros de error Y éxito
- SIEMPRE limpiar mensajes anteriores antes de una nueva validación

### 4. localStorage — persistencia (mínimo 1 caso)

```javascript
// Guardar preferencia
function guardarTema(tema) {
  localStorage.setItem('tema', tema);
}

// Recuperar al cargar la página
function cargarTema() {
  const temaGuardado = localStorage.getItem('tema');
  if (temaGuardado === 'oscuro') {
    document.body.classList.add('dark-theme');
  }
}

// Ejecutar al inicio
cargarTema();
```

- SIEMPRE manejar el caso en que `localStorage.getItem()` retorne `null`
- SIEMPRE usar `localStorage.setItem(clave, valor)` y `localStorage.getItem(clave)`

### 5. Fetch + render dinámico

```javascript
// Estructura del JSON: /data/site-data.json
// [{ "titulo": "...", "descripcion": "...", "imagen": "..." }]

async function cargarTarjetas() {
  const contenedor = document.querySelector('#tarjetas');
  contenedor.innerHTML = '<p>Cargando...</p>';

  try {
    const respuesta = await fetch('data/site-data.json');
    if (!respuesta.ok) throw new Error('Error al cargar datos');
    const datos = await respuesta.json();

    contenedor.innerHTML = '';
    datos.forEach(item => {
      contenedor.innerHTML += `
        <article class="card">
          <img src="${item.imagen}" alt="${item.titulo}">
          <h3>${item.titulo}</h3>
          <p>${item.descripcion}</p>
        </article>
      `;
    });
  } catch (error) {
    contenedor.innerHTML = '<p class="error">No se pudieron cargar los datos.</p>';
    console.error(error);
  }
}

cargarTarjetas();
```

- SIEMPRE usar `try/catch` con `fetch`
- SIEMPRE mostrar estado de carga ("Cargando...")
- SIEMPRE mostrar mensaje alternativo si el fetch falla
- NUNCA exponer datos sensibles en el JSON público

---

## Referencia de rúbrica (EE3)

| Criterio | Sobresaliente (5) | Aprobado (3) |
|----------|------------------|--------------|
| **Implementación JS** | DOM/eventos, validación con feedback, localStorage y Fetch con render dinámico, integrado coherentemente, sin fallas visibles | Funcionalidades básicas operativas, validación/persistencia/fetch con limitaciones, producto usable |
| **Repositorio GitHub** | Commits por funcionalidad (DOM/eventos, validación, storage, fetch/render), organización `/scripts` y `/data`, README actualizado | Commits escasos pero suficientes para verificar progreso a v3.0 |
| **Verificación y depuración** | Prueba flujos clave, identifica errores en consola, corrige oportunamente, sitio estable | Pruebas básicas con correcciones parciales, errores menores que no bloquean el uso |
| **Organización del código** | Funciones reutilizables, estructura clara por responsabilidad, duplicación mínima | Organización básica con duplicación moderada, permite mantener con esfuerzo razonable |

---

## Aplicabilidad por EE

| EE | Aplica | Notas |
|----|--------|-------|
| EE1 | ❌ | No hay JavaScript en v1.0 |
| EE2 | ❌ | No hay JavaScript en v2.0 |
| EE3 | ✅ Base | JS completo — evaluado en semana 12 |
| EE4 | ✅ Persiste | El JS debe funcionar sin errores de consola en el deploy final |

---

## Comandos

```bash
# Revisar errores JS en la consola
# F12 → Console → buscar errores en rojo

# Verificar localStorage
# F12 → Application → Storage → Local Storage

# Depurar con breakpoints
# F12 → Sources → clic en número de línea → recargar

# Hacer commit de funcionalidades JS
git add scripts/main.js
git commit -m "feat(js): implementar toggle de tema con persistencia en localStorage"

git add scripts/main.js data/site-data.json
git commit -m "feat(js): agregar carga dinámica de tarjetas con Fetch"
```

---

## Recursos

- **Lineamientos EE3**: Ver [`lineamientos-ee3.md`](../../docs/lineamientos/lineamientos-ee3.md)
- **Rúbrica EE3**: Ver [`rubrica-ee3.md`](../../docs/rubrica/rubrica-ee3.md)
- **Sílabo (UA3, semanas 9–12)**: Ver [`silabo-fundamentos-de-desarrollo-frontend.md`](../../docs/silabo-fundamentos-de-desarrollo-frontend.md)
