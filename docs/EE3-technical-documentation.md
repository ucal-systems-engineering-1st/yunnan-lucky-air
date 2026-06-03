# Documentación Técnica EE3 — Lucky Air Portal (v3.0)

> Actualizado: 2026-06-03 | Arquitectura: Screaming Architecture por dominio de negocio

---

## Arquitectura del proyecto

El proyecto usa **Screaming Architecture**: cada segmento de negocio tiene su propia carpeta con HTML + CSS + JS.

```
yunnan-lucky-air/
├── main.js                    ← JS global (hamburguesa, tarjetas, beneficios)
├── shared/
│   └── constants.js           ← exports: ENTERPRISE_URL, DATA_URL
├── data/
│   └── site-data.json         ← datos compartidos del sitio
├── community/
│   ├── community.html
│   ├── community.css
│   └── community.js           ← Alessandro
├── corporate/
│   ├── corporate.html
│   ├── corporate.css
│   └── corporate.js           ← Ivan
├── self-service/
│   ├── self-service.html
│   ├── self-service.css
│   └── self-service.js        ← Rachel
└── students/
    ├── students.html
    ├── students.css
    └── students.js            ← Geraldo
```

---

## 1. Cómo se enlaza cada JS a su HTML

| Archivo JS | Vista HTML | Tag a agregar (antes de `</body>`) |
|---|---|---|
| `main.js` | Todas las vistas | `<script src="../main.js"></script>` |
| `community/community.js` | `community/community.html` | `<script type="module" src="community.js"></script>` |
| `self-service/self-service.js` | `self-service/self-service.html` | `<script type="module" src="self-service.js"></script>` |
| `students/students.js` | `students/students.html` | `<script type="module" src="students.js"></script>` |
| `corporate/corporate.js` | `corporate/corporate.html` | `<script type="module" src="corporate.js" defer></script>` |

> **Importante:** `type="module"` es obligatorio porque los JS usan `import` de ES6. Sin él el navegador lanza un error.

---

## 2. Imports y constantes compartidas

**`shared/constants.js`**
```js
export const API_BASE_URL   = 'http://localhost:5678/webhook';
export const ENTERPRISE_URL = `${API_BASE_URL}/enterprise`;
export const DATA_URL       = '../data/site-data.json';
```

Cada archivo JS importa lo que necesita:
```js
// community.js, self-service.js, students.js
import { DATA_URL } from '../shared/constants.js';

// corporate.js
import { ENTERPRISE_URL } from '../shared/constants.js';
```

---

## 3. Funciones por archivo

### `main.js` — Geraldo (global, raíz del proyecto)

| Función | Elemento HTML | Evento | Criterio EE3 |
|---|---|---|---|
| Menú hamburguesa | `#menu-toggle`, `#main-links` | `click` | DOM evento ✅ |
| Tarjetas destino seleccionables | `.destination-card` | `click` | DOM evento ✅ |
| Vista previa de vuelo | `#origin`, `#destination`, `#preview-origin`, `#preview-dest` | `input` | DOM evento ✅ |
| Beneficios desplegables | `#why-lucky-air .feature-item p` | `click` | DOM evento ✅ |

---

### `community/community.js` — Alessandro

| Función | Qué hace | Elemento HTML | Evento | Criterio EE3 |
|---|---|---|---|---|
| `fetchAndRenderReviews()` | Carga reseñas de `data/site-data.json` y las agrega al muro | `.community-posts` | `DOMContentLoaded` | Fetch ✅ |
| `setupFilter()` | Crea botones Todos/Dali/Xishuangbanna/Kunming dinámicamente | `section#community-wall` | — | DOM ✅ |
| `filterByDestination(tag, btn)` | Muestra/oculta `.community-card` según `.card-tag` | `.community-card` | `click` | DOM evento ✅ |
| `saveDraft()` | Guarda borrador del form en localStorage | `#nombre`, `#email`, `#destino`, `#titulo`, `#mensaje` | `input` / `change` | localStorage ✅ |
| `loadDraft()` | Recupera borrador guardado al cargar la página | Form fields | `DOMContentLoaded` | localStorage ✅ |
| `validateShareForm(e)` | Valida campos + muestra errores por campo | `#community-share-form` | `submit` | Validación ✅ |

---

### `self-service/self-service.js` — Rachel

| Función | Qué hace | Elemento HTML | Evento | Criterio EE3 |
|---|---|---|---|---|
| `searchFlightStatus(e)` | Valida campo, busca vuelo en JSON, renderiza resultado | `#flight-status-form`, `#flight-number` | `submit` | Fetch + Validación ✅ |
| `renderFlightResult(flight)` | Crea div con estado, origen, destino, salida, llegada | Div `#flight-result` (creado dinámicamente) | — | DOM evento ✅ |
| `renderNotFound(number)` | Muestra mensaje si el vuelo no existe | Div `#flight-result` | — | DOM evento ✅ |
| `renderLoading()` | Muestra "Consultando..." mientras espera fetch | Div `#flight-result` | — | DOM evento ✅ |
| `saveLastFlight(number)` | Guarda número de vuelo en localStorage | — | `submit` | localStorage ✅ |
| `loadLastFlight()` | Precarga el último vuelo buscado en `#flight-number` | `#flight-number` | `DOMContentLoaded` | localStorage ✅ |

---

### `students/students.js` — Geraldo

| Función | Qué hace | Elemento HTML | Evento | Criterio EE3 |
|---|---|---|---|---|
| `fetchAndShowPackageNote()` | Carga paquetes de JSON y muestra nota informativa | `#student-packages .table-wrapper` | `DOMContentLoaded` | Fetch ✅ |
| `showPlanRecommendation()` | Según integrantes: muestra Básico/Estándar/Premium | `#grupo` → párrafo `#plan-recommendation` | `input` | DOM evento ✅ |
| `validateStudentForm(e)` | Valida nombre, universidad, email, grupo ≥5, mensaje | `#student-register-form` | `submit` | Validación ✅ |
| `loadSavedData()` | Precarga nombre, universidad y tamaño de grupo guardados | `#nombre`, `#universidad`, `#grupo` | `DOMContentLoaded` | localStorage ✅ |
| Guardado en localStorage | Al enviar form válido guarda nombre y universidad | — | `submit` | localStorage ✅ |

---

### `corporate/corporate.js` — Ivan

| Función | Qué hace | Elemento HTML | Evento | Criterio EE3 |
|---|---|---|---|---|
| Estado activo del form | Agrega/quita clase `active` al click dentro/fuera | `#corporateForm` | `click` (document) | DOM evento ✅ |
| `showPlanRecommendation()` | Según empleados: muestra Plan Básico/Estándar/Enterprise | `#company-employees` → párrafo `#plan-recommendation` | `input` | DOM evento ✅ |
| `validateForm()` | Valida nombre empresa, email corporativo, empleados > 0 | `#corporateForm` campos | `submit` | Validación ✅ |
| Submit con fetch | POST a n8n webhook (`localhost:5678/webhook/enterprise`) | `#corporateForm` | `submit` | Fetch ✅ |
| `loadSavedCompany()` | Precarga nombre de empresa desde localStorage | `#company-name` | `DOMContentLoaded` | localStorage ✅ |
| Guardado en localStorage | Al submit exitoso guarda `nombre_empresa` | — | `submit` | localStorage ✅ |

---

## 4. Estructura de `data/site-data.json`

```json
{
  "flights":      [ { "number", "origin", "destination", "status", "departure", "arrival", "date" } ],
  "destinations": [ { "id", "name", "description", "image" } ],
  "packages": {
    "students":  [ { "id", "name", "discount", "min_passengers", "baggage", "recommended" } ],
    "corporate": [ { "id", "name", "min_employees", "max_employees", "benefits" } ]
  },
  "reviews":  [ { "user", "destination", "date", "title", "comment", "rating" } ],
  "services": [ { "id", "name", "available", "fee" } ]
}
```

Vuelos disponibles para probar: `LK 203`, `LK 105`, `LK 317`, `LK 412`

---

## 5. Cobertura rúbrica EE3

| Criterio | Rachel | Ivan | Alessandro | Geraldo |
|---|---|---|---|---|
| DOM + eventos (≥2) | render resultado + load localStorage ✅ | form activo + plan por empleados ✅ | filtro posts + render botones ✅ | plan por grupo + form toggle ✅ |
| Validación form | `#flight-status-form` campo vacío ✅ | `#corporateForm` campos ✅ | `#community-share-form` ✅ | `#student-register-form` ✅ |
| localStorage (≥1) | último vuelo buscado ✅ | nombre de empresa ✅ | borrador form compartir ✅ | nombre + universidad + grupo ✅ |
| Fetch + render | estado vuelo desde JSON ✅ | POST a n8n webhook ✅ | reseñas desde JSON ✅ | paquetes desde JSON ✅ |

---

## 6. Cómo probar localmente

```bash
# Desde la raíz del proyecto
python -m http.server 5500
# Abrir: http://localhost:5500
```

O usar la extensión **Live Server** de VS Code (botón "Go Live" abajo a la derecha).

> El fetch no funciona con doble click en el HTML (`file://`) — siempre usar servidor local o GitHub Pages.
