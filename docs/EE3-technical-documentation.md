# Documentación Técnica EE3 — Lucky Air Portal (v3.0)

> Generado automáticamente · 2026-06-03 · Proyecto: yunnan-lucky-air

---

## 1. Integración de Archivos JavaScript y Vistas HTML

| Archivo JS | Ruta exacta | Vista HTML | Línea donde agregar `<script>` |
|---|---|---|---|
| `main.js` | `scripts/main.js` | `index.html` y todas las vistas | Antes de `</body>` — ya enlazado en index |
| `self-service.js` | `scripts/self-service.js` | `views/self-service.html` | Línea 594 (después del tag de main.js) |
| `corporate.js` | `scripts/corporate.js` | `views/corporate.html` | Línea 200 (reemplazar el `<script>` inline existente) |
| `community.js` | `scripts/community.js` | `views/community.html` | Línea 369 (después del tag de main.js) |
| `students.js` | `scripts/students.js` | `views/students.html` | Antes de `</body>` |

**Tag a usar en cada vista:**
```html
<script src="../scripts/{archivo}.js" defer></script>
```

---

## 2. Bug Fixes Pendientes — Rutas Rotas

| Archivo HTML | Línea | Estado actual (incorrecto) | Corrección |
|---|---|---|---|
| `views/self-service.html` | 593 | `<script src="../js/main.js">` | `<script src="../scripts/main.js">` |
| `views/community.html` | 368 | `<script src="../js/main.js">` | `<script src="../scripts/main.js">` |
| `views/corporate.html` | 189–200 | Script inline con `addEventListener` | Mover lógica a `scripts/corporate.js` + agregar `<script src="../scripts/corporate.js" defer>` |

> **Efecto del bug**: el menú hamburguesa no funciona en self-service ni community porque el archivo no se encuentra.

---

## 3. Funciones por Archivo JS

### `scripts/main.js` — Geraldo (ya existente)

| Función | Qué hace | Elemento HTML | Evento | Criterio EE3 |
|---|---|---|---|---|
| *(menú hamburguesa)* | Abre/cierra menú en móvil | `#menu-toggle`, `#main-links` | `click` | DOM evento ✅ |
| *(tarjetas destino)* | Marca/desmarca tarjeta seleccionada | `.destination-card` | `click` | DOM evento ✅ |
| *(vista previa vuelo)* | Actualiza preview en tiempo real | `#origin`, `#destination`, `#preview-origin`, `#preview-dest` | `input` | DOM evento ✅ |
| *(beneficios desplegables)* | Muestra/oculta descripción de beneficio | `#why-lucky-air .feature-item p` | `click` | DOM evento ✅ |
| **Pendiente** `saveLastSearch()` | Guarda última búsqueda en localStorage | Formulario búsqueda | `submit` | localStorage |
| **Pendiente** `loadDestinations()` | Carga destinos desde JSON y los renderiza | Contenedor de destinos | `DOMContentLoaded` | Fetch |

---

### `scripts/self-service.js` — Rachel (nuevo)

| Función | Qué hace | Elemento HTML | Evento | Criterio EE3 |
|---|---|---|---|---|
| `fetchFlightStatus()` | Intercepta el form, valida campo no vacío, busca en JSON y renderiza resultado (estado, hora, destino) | `#flight-status-form`, `#flight-number`, `#status-date` | `submit` | Fetch + Validación ✅ |
| `saveLastFlightNumber()` | Guarda el último número de vuelo buscado | `#flight-number` | `input` | localStorage ✅ |
| `loadLastFlightNumber()` | Al cargar la página, precarga el último número guardado | `#flight-number` | `DOMContentLoaded` | localStorage ✅ |
| `renderFlightResult(flight)` | Crea y muestra el bloque HTML con el resultado del vuelo | Div resultado (crear si no existe) | — (llamada interna) | DOM evento ✅ |

**Enlace HTML → JS:**
```html
<!-- views/self-service.html — añadir en línea 594, antes de </body> -->
<script src="../scripts/self-service.js" defer></script>
```

---

### `scripts/corporate.js` — Ivan (nuevo)

| Función | Qué hace | Elemento HTML | Evento | Criterio EE3 |
|---|---|---|---|---|
| `toggleMenu()` | Menú hamburguesa (mover aquí desde el inline script) | `#menu-toggle`, `#main-links` | `click` | DOM evento ✅ |
| `showRecommendedPlan()` | Lee el valor de empleados y muestra plan recomendado debajo del campo | `#company-employees` | `input` | DOM evento ✅ |
| `validateCorporateForm()` | Valida nombre empresa, email corporativo y empleados > 0 con mensajes de error | `.corporate-form` | `submit` | Validación ✅ |
| `saveCompanyName()` | Guarda el nombre de empresa en localStorage | `#company-name` | `input` | localStorage ✅ |
| `loadSavedCompanyName()` | Al cargar, precarga el nombre de empresa guardado | `#company-name` | `DOMContentLoaded` | localStorage ✅ |
| `fetchCorporatePlans()` | Carga planes desde `data/site-data.json` | Contenedor planes (crear si no existe) | `DOMContentLoaded` | Fetch ✅ |

**Enlace HTML → JS:**
```html
<!-- views/corporate.html — reemplazar el <script> inline (líneas 189-200) por: -->
<script src="../scripts/corporate.js" defer></script>
```

---

### `scripts/community.js` — Alessandro (nuevo)

| Función | Qué hace | Elemento HTML | Evento | Criterio EE3 |
|---|---|---|---|---|
| `filterPostsByDestination(tag)` | Muestra/oculta `.community-card` según el `.card-tag` del destino seleccionado | `.community-card`, `.card-tag`, botones filtro (crear) | `click` | DOM evento ✅ |
| `renderFilterButtons()` | Crea dinámicamente los botones Todos/Dali/Xishuangbanna/Kunming antes del muro | `#community-wall` | `DOMContentLoaded` | DOM evento ✅ |
| `validateShareForm()` | Valida que nombre, email, destino, título y mensaje no estén vacíos | `#community-share-form` | `submit` | Validación ✅ |
| `saveDraft()` | Guarda en localStorage el borrador del formulario compartir | `#nombre`, `#email`, `#titulo`, `#mensaje` | `input` | localStorage ✅ |
| `loadDraft()` | Al cargar, recupera el borrador guardado y lo pone en los campos | `#nombre`, `#email`, `#titulo`, `#mensaje` | `DOMContentLoaded` | localStorage ✅ |
| `fetchReviews()` | Carga reseñas adicionales desde JSON y las renderiza como nuevas `.community-card` | `#community-wall .community-posts` | `DOMContentLoaded` | Fetch ✅ |

**Enlace HTML → JS:**
```html
<!-- views/community.html — línea 593 corregida primero, luego línea 369: -->
<script src="../scripts/main.js"></script>      <!-- ← corregir path primero -->
<script src="../scripts/community.js" defer></script>
```

---

### `scripts/students.js` — Geraldo (nuevo)

| Función | Qué hace | Elemento HTML | Evento | Criterio EE3 |
|---|---|---|---|---|
| `filterStudentOffers()` | Filtra filas/cards de ofertas por destino | Tabla o cards de paquetes estudiantiles | `change` / `click` | DOM evento ✅ |
| `toggleGroupForm()` | Muestra/oculta campos adicionales del form grupal | Form de registro estudiantil | `click` | DOM evento ✅ |
| `validateStudentForm()` | Valida email institucional, mínimo de integrantes, campos obligatorios | Form registro estudiantil | `submit` | Validación ✅ |
| `saveDestinationFilter()` | Guarda el filtro/destino seleccionado | Select o botones filtro | `change` | localStorage ✅ |
| `loadSavedFilter()` | Al cargar, aplica el filtro guardado previamente | Select filtro | `DOMContentLoaded` | localStorage ✅ |
| `fetchStudentPackages()` | Carga paquetes estudiantiles desde JSON y los renderiza | Contenedor de paquetes | `DOMContentLoaded` | Fetch ✅ |

**Enlace HTML → JS:**
```html
<!-- views/students.html — agregar antes de </body> -->
<script src="../scripts/main.js"></script>
<script src="../scripts/students.js" defer></script>
```

---

## 4. Estructura de `data/site-data.json`

```json
{
  "flights": [
    {
      "number": "LK203",
      "origin": "Kunming",
      "destination": "Dali",
      "status": "A tiempo",
      "departure": "10:30",
      "arrival": "11:45",
      "date": "2026-11-02"
    },
    {
      "number": "LK105",
      "origin": "Kunming",
      "destination": "Xishuangbanna",
      "status": "Demorado",
      "departure": "14:00",
      "arrival": "15:30",
      "date": "2026-11-02"
    }
  ],
  "destinations": [
    { "id": "dali", "name": "Dali", "description": "Ciudad histórica junto al lago Erhai." },
    { "id": "xishuangbanna", "name": "Xishuangbanna", "description": "Selva tropical al sur de Yunnan." },
    { "id": "kunming", "name": "Kunming", "description": "La ciudad eterna de primavera." }
  ],
  "packages": {
    "students": [
      { "id": "stu-basic", "name": "Básico", "discount": "10%", "min_passengers": 5, "destination": "Dali" },
      { "id": "stu-plus", "name": "Plus", "discount": "20%", "min_passengers": 10, "destination": "Xishuangbanna" }
    ],
    "corporate": [
      { "id": "corp-basic", "name": "Plan Básico", "employees": "1-10", "benefits": ["Tarifas corporativas"] },
      { "id": "corp-standard", "name": "Plan Estándar", "employees": "11-50", "benefits": ["Tarifas corporativas", "Reportes mensuales"] },
      { "id": "corp-enterprise", "name": "Plan Enterprise", "employees": "51+", "benefits": ["Tarifas corporativas", "Asesor dedicado", "Facturación consolidada"] }
    ]
  },
  "reviews": [
    { "user": "María G.", "destination": "dali", "date": "2026-03-15", "title": "Una semana en Dali", "comment": "El lago Erhai al amanecer es impresionante.", "rating": 4 },
    { "user": "Carlos T.", "destination": "xishuangbanna", "date": "2026-02-28", "title": "La Amazonia de China", "comment": "La diversidad cultural es increíble.", "rating": 5 },
    { "user": "Laura M.", "destination": "kunming", "date": "2026-01-10", "title": "Kunming en primavera", "comment": "Clima perfecto todo el año.", "rating": 4 }
  ],
  "services": [
    { "id": "checkin", "name": "Check-in en línea", "available": true, "fee": 0 },
    { "id": "baggage", "name": "Equipaje adicional", "available": true, "fee_per_kg": 6 },
    { "id": "refund", "name": "Reembolso", "available": true, "processing_days": "7-14" }
  ]
}
```

---

## 5. Resumen de cobertura rúbrica EE3 por integrante

| Criterio | Rachel | Ivan | Alessandro | Geraldo |
|---|---|---|---|---|
| DOM + eventos (≥2) | `renderFlightResult` + `loadLastFlightNumber` ✅ | `showRecommendedPlan` + `toggleMenu` ✅ | `filterPostsByDestination` + `renderFilterButtons` ✅ | `filterStudentOffers` + `toggleGroupForm` ✅ |
| Validación form | `fetchFlightStatus` (campo vacío) ✅ | `validateCorporateForm` ✅ | `validateShareForm` ✅ | `validateStudentForm` ✅ |
| localStorage (≥1) | Último número de vuelo ✅ | Nombre de empresa ✅ | Borrador del form compartir ✅ | Filtro/destino seleccionado ✅ |
| Fetch + render | Estado de vuelo desde JSON ✅ | Planes corporativos desde JSON ✅ | Reseñas de viajeros desde JSON ✅ | Paquetes estudiantiles desde JSON ✅ |
