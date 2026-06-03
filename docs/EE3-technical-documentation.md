# Documentación Técnica EE3 — Lucky Air Portal v3.0

> Generada desde el código fuente real · 2026-06-03

---

## Arquitectura del proyecto (Screaming Architecture)

El proyecto organiza cada segmento de negocio en su propia carpeta. Cada carpeta contiene sus propios archivos HTML, CSS y JS. No existe carpeta `scripts/` ni `views/` ni `css/` separada.

```
yunnan-lucky-air/                   ← raíz del proyecto
│
├── main.js                         ← JS global, cargado en TODAS las vistas
├── shared/
│   ├── constants.js                ← constantes exportadas (URLs)
│   ├── styles.css
│   ├── header.css
│   ├── footer.css
│   └── variables.css
│
├── data/
│   └── site-data.json              ← datos del sitio (vuelos, paquetes, reseñas)
│
├── community/
│   ├── community.html
│   ├── community.css
│   └── community.js                ← JS de Alessandro
│
├── corporate/
│   ├── corporate.html
│   ├── corporate.css
│   ├── corporate.js                ← JS de Ivan
│   └── assets/                    ← íconos propios del segmento corporativo
│
├── self-service/
│   ├── self-service.html
│   ├── self-service.css
│   └── self-service.js             ← JS de Rachel
│
├── students/
│   ├── students.html
│   ├── students.css
│   └── students.js                 ← JS de Geraldo
│
└── auth/
    ├── login.html / login.css
    └── register.html / register.css
```

---

## Cómo se enlazan los JS en los HTML

Todos los archivos JS usan **ES6 modules** (`import/export`), por lo que el `<script>` debe tener `type="module"`. Se insertan antes del cierre `</body>`.

| Vista HTML | Línea script `main.js` | Línea script propio | Tag exacto del script propio |
|---|---|---|---|
| `community/community.html` | línea 368 | línea 369 | `<script type="module" src="community.js"></script>` |
| `self-service/self-service.html` | línea 593 | línea 594 | `<script type="module" src="self-service.js"></script>` |
| `students/students.html` | línea 334 | línea 335 | `<script type="module" src="students.js"></script>` |
| `corporate/corporate.html` | no incluido | línea 206 | `<script type="module" src="corporate.js" defer></script>` |

> `main.js` es un script normal (sin `type="module"`) porque no usa `import`. Los scripts de dominio sí usan `type="module"` porque hacen `import` desde `shared/constants.js`.

---

## shared/constants.js

**Carpeta:** `shared/`  
**Archivo:** `constants.js`  
**Propósito:** Hub de constantes exportadas que consumen todos los JS de dominio.

```js
export const API_BASE_URL   = 'http://localhost:5678/webhook';
export const ENTERPRISE_URL = `${API_BASE_URL}/enterprise`;   // usado por corporate.js
export const DATA_URL       = '../data/site-data.json';        // usado por community, self-service, students
```

| Constante | Valor | Consumida por |
|---|---|---|
| `API_BASE_URL` | `http://localhost:5678/webhook` | base del webhook n8n |
| `ENTERPRISE_URL` | `http://localhost:5678/webhook/enterprise` | `corporate/corporate.js` |
| `DATA_URL` | `../data/site-data.json` | `community.js`, `self-service.js`, `students.js` |

---

## main.js

**Carpeta:** raíz `/`  
**Archivo:** `main.js`  
**Cargado en:** todas las vistas via `<script src="../main.js"></script>`  
**No usa módulos** — es un script clásico.

### Variables globales

| Variable | Selector | Elemento HTML |
|---|---|---|
| `menuToggle` | `#menu-toggle` | Botón hamburguesa del header |
| `mainLinks` | `#main-links` | `<ul>` con los links de navegación |
| `destinationCards` | `.destination-card` | Cards de destinos en `index.html` |
| `originInput` | `#origin` | Input origen del buscador de vuelos |
| `destInput` | `#destination` | Input destino del buscador de vuelos |
| `previewOrigin` | `#preview-origin` | Span donde se muestra el origen en tiempo real |
| `previewDest` | `#preview-dest` | Span donde se muestra el destino en tiempo real |
| `featureItems` | `#why-lucky-air .feature-item` | Tarjetas de beneficios desplegables |

### Interacciones (sin funciones nombradas — código inline)

**1. Menú hamburguesa** (líneas 15–33)
- **Evento:** `click` sobre `#menu-toggle`
- **Efecto:** Toggle de clase `header__links--open` en `#main-links` — muestra u oculta el menú en móvil
- **Accesibilidad:** actualiza `aria-expanded` y `aria-label` del botón
- **Bonus:** click en cualquier `.header__link` cierra el menú

**2. Tarjetas de destino seleccionables** (líneas 38–42)
- **Evento:** `click` sobre cada `.destination-card`
- **Efecto:** Toggle de clase `destination-card--seleccionada` — marca/desmarca visualmente la tarjeta

**3. Vista previa de vuelo en tiempo real** (líneas 51–61)
- **Evento:** `input` sobre `#origin` y `#destination`
- **Efecto:** Actualiza el contenido de `#preview-origin` y `#preview-dest` letra a letra

**4. Beneficios desplegables** (líneas 67–77)
- **Evento:** `click` sobre cada `#why-lucky-air .feature-item`
- **Efecto:** Toggle de clase `oculta` en el `<p>` hijo de cada beneficio — muestra/oculta la descripción

---

## community/community.js

**Carpeta:** `community/`  
**Archivo:** `community.js`  
**Responsable:** Alessandro  
**Vista:** `community/community.html`  
**Import:** `import { DATA_URL } from '../shared/constants.js'`

### Variables globales

| Variable | Selector | Elemento HTML en community.html |
|---|---|---|
| `postsContainer` | `.community-posts` | `<div>` que contiene los artículos del muro |
| `shareForm` | `#community-share-form` | Formulario "Comparte tu experiencia" |
| `nombreInput` | `#nombre` | Input nombre completo del form |
| `emailInput` | `#email` | Input correo electrónico del form |
| `destinoSelect` | `#destino` | Select destino visitado del form |
| `tituloInput` | `#titulo` | Input título de la experiencia |
| `mensajeTextarea` | `#mensaje` | Textarea historia del viaje |

### Funciones

---

#### `fetchAndRenderReviews()` — async
**Criterio EE3:** Fetch + render dinámico  
**Cuándo se ejecuta:** Al cargar la página (`DOMContentLoaded`)

**Qué hace paso a paso:**
1. Llama `fetch(DATA_URL)` → GET a `../data/site-data.json`
2. Parsea el JSON y accede a `data.reviews` (array de reseñas)
3. Por cada reseña crea un `<article class="community-card community-card--fetched">` con estructura:
   - `<span class="card-tag">` con el nombre del destino
   - `<h3>` con el título de la reseña
   - `<p>` con el comentario
   - `<footer>` con autor y fecha formateada
4. Agrega el artículo al final de `.community-posts`
5. Al terminar llama `setupFilter()` para incluir las nuevas cards en el filtro

**En caso de error:** `console.error('No se pudieron cargar las reseñas:', err)`

---

#### `setupFilter()`
**Criterio EE3:** DOM evento (creación dinámica de botones)  
**Cuándo se ejecuta:** Al finalizar `fetchAndRenderReviews()`

**Qué hace paso a paso:**
1. Elimina cualquier `#post-filter` existente para evitar duplicados
2. Crea un `<div id="post-filter" class="post-filter" role="group" aria-label="Filtrar por destino">`
3. Crea 4 botones: `Todos`, `Dali`, `Xishuangbanna`, `Kunming`
   - El botón "Todos" arranca con clase `filter-btn--active`
   - Cada botón tiene `addEventListener('click', () => filterByDestination(tag, btn))`
4. Inserta el `<div>` antes de `.community-posts` dentro de `section#community-wall`

**Elemento creado:** `<div id="post-filter">` insertado dentro de `section#community-wall`

---

#### `filterByDestination(tag, activeBtn)`
**Criterio EE3:** DOM evento  
**Cuándo se ejecuta:** `click` en cualquier botón `.filter-btn`  
**Parámetros:**
- `tag` — string: `'Todos'`, `'Dali'`, `'Xishuangbanna'` o `'Kunming'`
- `activeBtn` — referencia al botón clickeado

**Qué hace:**
1. Quita clase `filter-btn--active` de todos los `.filter-btn`
2. Agrega `filter-btn--active` al botón clickeado
3. Recorre todos los `.community-card` y lee el texto de su `.card-tag`
4. Si `tag === 'Todos'` → muestra todas las cards (`style.display = ''`)
5. Si no → solo muestra las cards cuyo `.card-tag` coincida con `tag`

**Elementos afectados:** todos los `.community-card` del DOM (tanto los del HTML original como los creados por fetch)

---

#### `saveDraft()`
**Criterio EE3:** localStorage  
**Cuándo se ejecuta:** `input` o `change` en cualquier campo del `#community-share-form`

**Qué hace:** Lee los 5 campos del form y guarda un objeto JSON en `localStorage`:
```js
localStorage.setItem('luckyair_community_draft', JSON.stringify({
  nombre, email, destino, titulo, mensaje
}))
```
**Clave localStorage:** `luckyair_community_draft`

---

#### `loadDraft()`
**Criterio EE3:** localStorage  
**Cuándo se ejecuta:** `DOMContentLoaded`

**Qué hace:**
1. Lee `localStorage.getItem('luckyair_community_draft')`
2. Si existe, parsea el JSON y rellena cada campo con su valor guardado
3. Si no existe o hay error de parseo, no hace nada (try/catch silencioso)

**Campos que precarga:** `#nombre`, `#email`, `#destino`, `#titulo`, `#mensaje`

---

#### `validateShareForm(e)`
**Criterio EE3:** Validación con feedback  
**Cuándo se ejecuta:** `submit` de `#community-share-form`

**Qué hace:**
1. `e.preventDefault()` — intercepta el submit
2. Limpia errores anteriores con `clearErrors()`
3. Valida cada campo:

| Campo | Regla | Mensaje de error |
|---|---|---|
| `#nombre` | No vacío | `'El nombre es obligatorio.'` |
| `#email` | Regex email válido | `'Ingresa un correo electrónico válido.'` |
| `#destino` | Valor seleccionado | `'Selecciona el destino que visitaste.'` |
| `#titulo` | Mínimo 5 caracteres | `'El título debe tener al menos 5 caracteres.'` |
| `#mensaje` | Mínimo 20 caracteres | `'Cuéntanos un poco más (mínimo 20 caracteres).'` |

4. Si hay errores: llama `showError(input, msg)` por cada campo inválido → agrega `<span class="field-error">` + clase `input-error`
5. Si todo válido: elimina `'luckyair_community_draft'` de localStorage, muestra éxito, resetea form

---

## self-service/self-service.js

**Carpeta:** `self-service/`  
**Archivo:** `self-service.js`  
**Responsable:** Rachel  
**Vista:** `self-service/self-service.html`  
**Import:** `import { DATA_URL } from '../shared/constants.js'`

### Variables globales

| Variable | Selector | Elemento HTML |
|---|---|---|
| `flightStatusForm` | `#flight-status-form` | Formulario de consulta de estado de vuelo |
| `flightNumberInput` | `#flight-number` | Input número de vuelo (ej. `LK 203`) |

### Funciones

---

#### `saveLastFlight(number)`
**Criterio EE3:** localStorage  
**Cuándo se ejecuta:** Al hacer submit con un número de vuelo válido

**Qué hace:** `localStorage.setItem('luckyair_last_flight', number)`  
**Clave localStorage:** `luckyair_last_flight`

---

#### `loadLastFlight()`
**Criterio EE3:** localStorage  
**Cuándo se ejecuta:** `DOMContentLoaded`

**Qué hace:**
1. Lee `localStorage.getItem('luckyair_last_flight')`
2. Si existe, lo pone como valor de `#flight-number`
3. Efecto visual: el campo aparece precargado con el último vuelo buscado

---

#### `searchFlightStatus(e)` — async
**Criterio EE3:** Fetch + render + validación  
**Cuándo se ejecuta:** `submit` de `#flight-status-form`

**Qué hace paso a paso:**
1. `e.preventDefault()` — intercepta el submit
2. Limpia resultado anterior con `clearResult()`
3. Lee `#flight-number`, convierte a mayúsculas y elimina espacios extra
4. Si está vacío → llama `showFieldError(flightNumberInput, 'Ingresa el número de vuelo...')` y para
5. Si hay número → llama `saveLastFlight(raw)` y muestra estado de carga con `renderLoading()`
6. Hace `fetch(DATA_URL)` → GET a `../data/site-data.json`
7. Normaliza el número: elimina espacios y convierte a mayúsculas para comparar (`LK 203` === `LK203`)
8. Busca en `data.flights` el vuelo que coincida
9. Limpia el loading y llama:
   - `renderFlightResult(match)` si encontró el vuelo
   - `renderNotFound(raw)` si no existe
   - `renderError()` si falló el fetch

---

#### `renderFlightResult(flight)`
**Criterio EE3:** DOM + render dinámico  
**Cuándo se ejecuta:** Después de encontrar el vuelo en el JSON

**Qué hace:**
1. Determina la clase CSS del estado según `flight.status`:
   - `'A tiempo'` → clase `flight-result__status--ontime`
   - `'Demorado'` → clase `flight-result__status--delayed`
   - `'Cancelado'` → clase `flight-result__status--cancelled`
2. Crea `<div id="flight-result" class="flight-result">` con:
   - `<h3>` con número de vuelo
   - `<p>` con estado y clase CSS correspondiente
   - `<ul>` con origen, destino, salida, llegada y fecha
3. Inserta el div **después de** `#flight-status-form` usando `flightStatusForm.after(div)`

---

#### `renderNotFound(number)`
**Cuándo se ejecuta:** El vuelo buscado no existe en el JSON

**Qué hace:** Inserta `<div id="flight-result" class="flight-result flight-result--empty">` con mensaje indicando que el vuelo no fue encontrado

---

#### `renderLoading()`
**Cuándo se ejecuta:** Mientras espera la respuesta del fetch

**Qué hace:** Inserta `<div id="flight-result" class="flight-result flight-result--loading" aria-live="polite">` con texto "Consultando vuelo…"

---

#### `renderError()`
**Cuándo se ejecuta:** El fetch lanzó una excepción

**Qué hace:** Inserta `<div id="flight-result" class="flight-result flight-result--error">` con mensaje de error genérico

---

#### `clearResult()`
**Cuándo se ejecuta:** Al inicio de cada búsqueda nueva

**Qué hace:**
1. Elimina `#flight-result` del DOM si existe
2. Elimina todos los `.field-error` del form
3. Quita clase `input-error` de `#flight-number`

---

## students/students.js

**Carpeta:** `students/`  
**Archivo:** `students.js`  
**Responsable:** Geraldo  
**Vista:** `students/students.html`  
**Import:** `import { DATA_URL } from '../shared/constants.js'`

### Variables globales

| Variable | Selector | Elemento HTML |
|---|---|---|
| `registerForm` | `#student-register-form` | Formulario de registro estudiantil |
| `nombreInput` | `#nombre` | Input nombre completo |
| `universidadInput` | `#universidad` | Input nombre de universidad |
| `emailInput` | `#email` | Input correo institucional |
| `grupoInput` | `#grupo` | Input número de integrantes (mínimo 5) |
| `mensajeTextarea` | `#mensaje` | Textarea consulta/comentario |

### Funciones

---

#### `fetchAndShowPackageNote()` — async
**Criterio EE3:** Fetch + render dinámico  
**Cuándo se ejecuta:** `DOMContentLoaded`

**Qué hace:**
1. Hace `fetch(DATA_URL)` → GET a `../data/site-data.json`
2. Lee `data.packages.students.length` (cantidad de paquetes disponibles)
3. Crea `<p class="packages-fetched-note">` con el mensaje: *"Contamos con N paquetes disponibles. El Estándar es el más elegido por grupos universitarios."*
4. Lo inserta **después de** `.table-wrapper` dentro de `#student-packages`

**Elemento afectado:** Sección `#student-packages` — `<div class="table-wrapper">`

---

#### `showPlanRecommendation()`
**Criterio EE3:** DOM evento  
**Cuándo se ejecuta:** `input` sobre `#grupo`

**Qué hace:**
1. Elimina `#plan-recommendation` anterior si existe
2. Lee el valor de `#grupo` como entero
3. Según el valor determina el plan:

| Integrantes | Plan | Descripción mostrada |
|---|---|---|
| 1–4 | Advertencia | *"El mínimo para acceder al programa es 5 integrantes."* — `<span class="field-warning">` |
| 5–9 | Básico | 10% descuento · solo equipaje de mano |
| 10–19 | Estándar | 20% descuento · 23 kg · 1 cambio de fecha · cobertura básica |
| ≥20 | Premium | 30% descuento · 32 kg · seguro completo · cambios ilimitados |

4. Crea `<p id="plan-recommendation" class="plan-recommendation">` con la recomendación
5. Lo inserta al final del `.form-group` que contiene `#grupo`
6. **También guarda** el número en `localStorage.setItem('luckyair_student_group_size', count)`

---

#### `validateStudentForm(e)`
**Criterio EE3:** Validación con feedback  
**Cuándo se ejecuta:** `submit` de `#student-register-form`

**Qué hace:**
1. `e.preventDefault()` — intercepta el submit
2. Limpia errores con `clearErrors()`
3. Valida cada campo:

| Campo | Regla | Mensaje de error |
|---|---|---|
| `#nombre` | Mínimo 3 caracteres | `'El nombre debe tener al menos 3 caracteres.'` |
| `#universidad` | No vacío | `'Ingresa el nombre de tu universidad.'` |
| `#email` | Regex email válido | `'Ingresa un correo institucional válido (ej. correo@uni.edu.pe).'` |
| `#grupo` | Entero ≥ 5 | `'El grupo debe tener mínimo 5 integrantes para acceder al programa.'` |
| `#mensaje` | Mínimo 10 caracteres | `'Cuéntanos sobre tu viaje (mínimo 10 caracteres).'` |

4. Si hay errores: agrega `<span class="field-error" role="alert">` en el campo inválido + clase `input-error`
5. Si todo válido:
   - `localStorage.setItem('luckyair_student_name', nombre)`
   - `localStorage.setItem('luckyair_student_uni', universidad)`
   - Muestra `<p class="form-success" role="alert">` con mensaje de confirmación
   - Resetea el form
   - Elimina `#plan-recommendation`

---

#### `loadSavedData()`
**Criterio EE3:** localStorage  
**Cuándo se ejecuta:** `DOMContentLoaded`

**Qué hace:**
1. Lee 3 claves de localStorage:
   - `luckyair_student_name` → rellena `#nombre`
   - `luckyair_student_uni` → rellena `#universidad`
   - `luckyair_student_group_size` → rellena `#grupo` y llama `showPlanRecommendation()`
2. Si no existe ninguna, no hace nada

**Claves localStorage usadas:** `luckyair_student_name`, `luckyair_student_uni`, `luckyair_student_group_size`

---

## corporate/corporate.js

**Carpeta:** `corporate/`  
**Archivo:** `corporate.js`  
**Responsable:** Ivan  
**Vista:** `corporate/corporate.html`  
**Import:** `import { ENTERPRISE_URL } from '../shared/constants.js'`

### Variables globales

| Variable | Selector | Elemento HTML |
|---|---|---|
| `enterpriseForm` | `#corporateForm` | Formulario de registro corporativo |
| `errorMessage` | `#errorMessage` | `<p>` donde se muestran errores del servidor |
| `successMessage` | `#successMessage` | `<p>` donde se muestra el éxito |
| `companyNameInput` | `#company-name` | Input nombre de la empresa |
| `companyEmailInput` | `#company-email` | Input correo corporativo |
| `employeesInput` | `#company-employees` | Input número de empleados |

### Funciones / Interacciones

---

#### DOM evento #1 — Toggle clase `active` en el form (líneas 13–19)
**Criterio EE3:** DOM evento  
**Cuándo se ejecuta:** `click` en `document` (escucha global)

**Qué hace:**
- Si el click fue **dentro** de `#corporateForm` → agrega clase `active` al form
- Si el click fue **fuera** → elimina clase `active`
- Efecto visual: resalta el formulario cuando el usuario interactúa con él

---

#### `showPlanRecommendation()`
**Criterio EE3:** DOM evento  
**Cuándo se ejecuta:** `input` sobre `#company-employees`

**Qué hace:**
1. Elimina `#plan-recommendation` anterior
2. Lee el valor de `#company-employees` como entero
3. Determina el plan según cantidad:

| Empleados | Plan | Descripción |
|---|---|---|
| 1–10 | Plan Básico | Tarifas corporativas exclusivas y reservas centralizadas |
| 11–50 | Plan Estándar | Tarifas + reportes mensuales + prioridad en check-in |
| ≥51 | Plan Enterprise | Asesor dedicado + facturación consolidada + acceso API |

4. Crea `<p id="plan-recommendation" class="plan-recommendation">` con la recomendación
5. Lo inserta al final del `.form-group` que contiene `#company-employees`

---

#### `validateForm()`
**Criterio EE3:** Validación client-side  
**Cuándo se ejecuta:** Llamada desde el handler de `submit` antes de hacer fetch

**Qué hace:**
1. Limpia errores con `clearErrors()`
2. Valida:

| Campo | Regla | Mensaje de error |
|---|---|---|
| `#company-name` | No vacío | `'El nombre de la empresa es obligatorio.'` |
| `#company-email` | Regex email válido | `'Ingresa un correo corporativo válido (ej. contacto@empresa.com).'` |
| `#company-employees` | Entero ≥ 1 | `'Ingresa el número de empleados (mínimo 1).'` |

3. Retorna `true` si todo válido, `false` si hay algún error

---

#### Handler `submit` de `#corporateForm` — async (líneas 78–114)
**Criterio EE3:** Fetch + localStorage  
**Cuándo se ejecuta:** `submit` de `#corporateForm`

**Qué hace:**
1. `e.preventDefault()`
2. Llama `validateForm()` — si retorna `false`, para (no hace fetch)
3. Limpia `#errorMessage` y `#successMessage`
4. Construye el body JSON:
   ```json
   { "nombre_empresa": "...", "correo_corporativo": "...", "numero_empleados": 25 }
   ```
5. Guarda en localStorage: `localStorage.setItem('luckyair_company_name', nombre_empresa)`
6. Hace `fetch(ENTERPRISE_URL, { method: 'POST', headers: {...}, body: JSON.stringify(body) })`
   - URL: `http://localhost:5678/webhook/enterprise`
7. Si la respuesta es OK → muestra mensaje en `#successMessage`, resetea form, elimina `#plan-recommendation`
8. Si falla → muestra error en `#errorMessage`

---

#### `loadSavedCompany()`
**Criterio EE3:** localStorage  
**Cuándo se ejecuta:** `DOMContentLoaded`

**Qué hace:**
1. Lee `localStorage.getItem('luckyair_company_name')`
2. Si existe, lo pone como valor de `#company-name`

**Clave localStorage:** `luckyair_company_name`

---

## data/site-data.json

**Carpeta:** `data/` (raíz del proyecto)  
**Archivo:** `site-data.json`  
**Acceso desde subpáginas:** `../data/site-data.json` (exportado como `DATA_URL` en `constants.js`)

### Estructura completa

```json
{
  "flights": [
    {
      "number":      "LK 203",
      "origin":      "Kunming",
      "destination": "Dali",
      "status":      "A tiempo",
      "departure":   "10:30",
      "arrival":     "11:45",
      "date":        "2026-11-02"
    }
  ],
  "destinations": [
    { "id": "dali", "name": "Dali", "description": "...", "image": "../assets/images/dali.webp" }
  ],
  "packages": {
    "students": [
      { "id", "name", "discount", "min_passengers", "max_passengers", "baggage", "recommended" }
    ],
    "corporate": [
      { "id", "name", "min_employees", "max_employees", "benefits": [] }
    ]
  },
  "reviews": [
    { "user", "destination", "date", "title", "comment", "rating" }
  ],
  "services": [
    { "id", "name", "available", "fee" }
  ]
}
```

### Números de vuelo válidos para probar

| Número | Ruta | Estado |
|---|---|---|
| `LK 203` | Kunming → Dali | A tiempo |
| `LK 105` | Kunming → Xishuangbanna | Demorado |
| `LK 317` | Dali → Kunming | A tiempo |
| `LK 412` | Kunming → Lijiang | Cancelado |

---

## Resumen de claves localStorage por integrante

| Clave | Guardada por | Recuperada por | Valor |
|---|---|---|---|
| `luckyair_community_draft` | `saveDraft()` · community.js | `loadDraft()` | JSON con los 5 campos del form compartir |
| `luckyair_last_flight` | `saveLastFlight()` · self-service.js | `loadLastFlight()` | String con el último número de vuelo buscado |
| `luckyair_student_name` | `validateStudentForm()` · students.js | `loadSavedData()` | Nombre del estudiante |
| `luckyair_student_uni` | `validateStudentForm()` · students.js | `loadSavedData()` | Nombre de la universidad |
| `luckyair_student_group_size` | `showPlanRecommendation()` · students.js | `loadSavedData()` | Número de integrantes del grupo |
| `luckyair_company_name` | submit handler · corporate.js | `loadSavedCompany()` | Nombre de la empresa |

---

## Cobertura rúbrica EE3

| Criterio | Rachel (self-service.js) | Ivan (corporate.js) | Alessandro (community.js) | Geraldo (students.js + main.js) |
|---|---|---|---|---|
| **DOM + eventos ≥2** | `renderFlightResult()` + `loadLastFlight()` ✅ | toggle `active` form + `showPlanRecommendation()` ✅ | `setupFilter()` + `filterByDestination()` ✅ | `showPlanRecommendation()` + beneficios desplegables (main.js) ✅ |
| **Validación form** | `searchFlightStatus()` valida campo vacío ✅ | `validateForm()` valida 3 campos ✅ | `validateShareForm()` valida 5 campos ✅ | `validateStudentForm()` valida 5 campos ✅ |
| **localStorage ≥1** | `luckyair_last_flight` ✅ | `luckyair_company_name` ✅ | `luckyair_community_draft` (5 campos) ✅ | `luckyair_student_name/uni/group_size` ✅ |
| **Fetch + render** | GET JSON → render estado vuelo ✅ | POST a n8n webhook ✅ | GET JSON → render reseñas en muro ✅ | GET JSON → nota de paquetes ✅ |

---

## Cómo probar localmente

```bash
# Desde la raíz del proyecto
python -m http.server 5500
# Abrir en el navegador: http://localhost:5500
```

O usar la extensión **Live Server** de VS Code.

> El `fetch` no funciona con doble click en el HTML (`file://` protocol). Siempre usar servidor HTTP.

### Verificar en DevTools

- **Console** → no debe haber errores en rojo
- **Application → Local Storage → http://localhost:5500** → verificar claves `luckyair_*`
- **Network → Fetch/XHR** → verificar petición a `site-data.json` con status 200
