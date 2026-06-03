# Documentación Técnica EE3 — Lucky Air Portal v3.0

Actualizado el 2026-06-03. Esta documentación explica en detalle cada archivo JavaScript del proyecto, qué hace cada función, qué elementos HTML manipula y cómo se conecta todo para que el sitio funcione.

---

## Cómo está organizado el proyecto

El proyecto usa una estructura llamada Screaming Architecture, que básicamente significa que al abrir la carpeta raíz ya sabés de qué trata el sitio sin leer ni una línea de código, porque cada segmento de negocio tiene su propia carpeta con su HTML, CSS y JS adentro.

```
yunnan-lucky-air/
├── index.html          ← home del sitio (va en la raíz por convención web)
├── index.js            ← interacciones específicas del home
├── main.js             ← solo el menú hamburguesa (cargado en todas las páginas)
├── shared/
│   ├── constants.js    ← URLs y constantes compartidas entre todos los JS
│   ├── styles.css
│   ├── header.css
│   ├── footer.css
│   └── variables.css
├── data/
│   └── site-data.json  ← datos del sitio: vuelos, paquetes, reseñas y servicios
├── community/
│   ├── community.html
│   ├── community.css
│   └── community.js    ← Alessandro
├── corporate/
│   ├── corporate.html
│   ├── corporate.css
│   ├── corporate.js    ← Ivan
│   └── assets/
├── self-service/
│   ├── self-service.html
│   ├── self-service.css
│   └── self-service.js ← Rachel
└── students/
    ├── students.html
    ├── students.css
    └── students.js     ← Geraldo
```

---

## Cómo se enlazan los scripts en cada HTML

Todos los archivos JS de dominio usan `import` de ES6, por eso necesitan `type="module"` en su `<script>` — sin eso el navegador lanza un error de inmediato. El `main.js` y el `index.js` son scripts clásicos porque no importan nada.

| Vista | Script global | Script propio | Tag en el HTML |
|---|---|---|---|
| `index.html` | `main.js` línea 453 | `index.js` línea 454 | `<script src="index.js" defer></script>` |
| `community/community.html` | `../main.js` línea 368 | `community.js` línea 369 | `<script type="module" src="community.js"></script>` |
| `self-service/self-service.html` | `../main.js` línea 593 | `self-service.js` línea 594 | `<script type="module" src="self-service.js"></script>` |
| `students/students.html` | `../main.js` línea 334 | `students.js` línea 335 | `<script type="module" src="students.js"></script>` |
| `corporate/corporate.html` | no incluido | `corporate.js` línea 206 | `<script type="module" src="corporate.js" defer></script>` |

---

## shared/constants.js

Centraliza las URLs que usan los scripts, de forma que cualquier cambio de URL se hace una sola vez acá y se propaga a todos los que la importan: `ENTERPRISE_URL` la usa solo `corporate.js` para el POST a n8n, mientras que `DATA_URL` la usan los otros tres scripts de dominio para leer el JSON con los datos del sitio.

```js
export const API_BASE_URL   = 'http://localhost:5678/webhook';
export const ENTERPRISE_URL = `${API_BASE_URL}/enterprise`;
export const DATA_URL       = '../data/site-data.json';
```

---

## main.js — menú hamburguesa global

Está en la carpeta raíz y se carga en todas las vistas, pero su única responsabilidad es el menú de navegación en móvil. Cuando el usuario toca el botón `#menu-toggle` se hace toggle de la clase `header__links--open` en el `<ul id="main-links">` que contiene los links del header, y al mismo tiempo se actualizan `aria-expanded` y `aria-label` para que los lectores de pantalla sepan si el menú está abierto o cerrado. También hay un listener en cada `.header__link` para que al tocar un enlace el menú se cierre solo, en lugar de quedar abierto encima del contenido.

---

## index.js — interacciones del home

Está en la carpeta raíz junto con `index.html` y solo se carga en esa página. Contiene tres grupos de interacciones que no tienen sentido en ninguna otra vista.

**Tarjetas de destino seleccionables:** se escucha `click` en cada `.destination-card` y al dispararse se hace toggle de la clase `destination-card--seleccionada`, que resalta visualmente la tarjeta para que el usuario pueda marcar los destinos que le interesan.

**Vista previa del buscador:** los inputs `#origin` y `#destination` tienen listener en `input`, de modo que cada vez que el usuario escribe algo el texto aparece inmediatamente en los spans `#preview-origin` y `#preview-dest` — si el campo queda vacío el span muestra `---` en lugar de nada.

**Beneficios desplegables:** todos los `.feature-item` dentro de `#why-lucky-air` arrancan con su `<p>` hijo con la clase `oculta`, y al hacer click en cualquier ítem se hace toggle de esa clase para mostrar u ocultar la descripción, creando el efecto acordeón sin necesidad de librerías.

---

## community/community.js — Alessandro

Está en la carpeta `community/` e importa `DATA_URL` de `shared/constants.js`. Al inicio del archivo se declaran las referencias a los elementos del DOM que se usan en varias funciones: `postsContainer` para `.community-posts`, `shareForm` para `#community-share-form`, y los cinco inputs del formulario (`#nombre`, `#email`, `#destino`, `#titulo`, `#mensaje`).

**`fetchAndRenderReviews()`** se ejecuta al cargar la página y hace un GET a `../data/site-data.json` para leer el array `reviews`. Por cada reseña crea un `<article class="community-card community-card--fetched">` con el tag del destino, el título, el comentario y el footer con el autor y la fecha formateada, que agrega al final de `.community-posts`. Cuando termina llama `setupFilter()` para que los botones de filtro incluyan también las cards recién añadidas — si el fetch falla por algún motivo muestra el error en consola pero no rompe la página.

**`setupFilter()`** crea dinámicamente los botones de filtro del muro: primero elimina cualquier `#post-filter` previo para no duplicarlos, luego crea un `<div id="post-filter" role="group">` con cuatro botones (Todos, Dali, Xishuangbanna y Kunming) donde el botón Todos arranca con la clase `filter-btn--active`, y lo inserta antes de `.community-posts` dentro de `section#community-wall`. Cada botón tiene su `click` listener que llama a `filterByDestination`.

**`filterByDestination(tag, activeBtn)`** quita `filter-btn--active` de todos los botones y se la pone solo al que recibió el click, luego recorre todos los `.community-card` del DOM y lee el texto de su `.card-tag` — si coincide con el tag seleccionado o el tag es "Todos" la card se muestra, si no coincide se oculta con `style.display = 'none'`. Funciona tanto con las cards del HTML original como con las que llegan del fetch.

**`saveDraft()` y `loadDraft()`** trabajan juntas para persistir el progreso del formulario: `saveDraft` se ejecuta con cada `input` o `change` en cualquier campo y guarda los cinco valores como JSON en `localStorage` bajo la clave `luckyair_community_draft`, mientras que `loadDraft` se ejecuta al cargar la página y si encuentra ese dato rellena cada campo del formulario para que el usuario no pierda lo que había escrito.

**`validateShareForm(e)`** intercepta el submit con `e.preventDefault()` y valida que `#nombre` no esté vacío, que `#email` tenga formato válido, que `#destino` tenga un valor seleccionado, que `#titulo` tenga al menos 5 caracteres y que `#mensaje` tenga al menos 20. Si algún campo falla agrega un `<span class="field-error" role="alert">` dentro de ese mismo `.form-group` y le pone la clase `input-error` al input, y si todo pasa borra el borrador del localStorage, muestra el mensaje de éxito y resetea el formulario.

---

## self-service/self-service.js — Rachel

Está en `self-service/` e importa `DATA_URL`. Las únicas variables que necesita al inicio son `flightStatusForm` para `#flight-status-form` y `flightNumberInput` para `#flight-number`.

**`saveLastFlight()` y `loadLastFlight()`** se complementan para que el input siempre tenga el último vuelo buscado: al hacer una búsqueda el número se guarda en `localStorage` bajo `luckyair_last_flight`, y al cargar la página `loadLastFlight()` lee esa clave y si existe la pone directamente como valor del campo.

**`searchFlightStatus(e)`** es la función central de la página — intercepta el submit, convierte el texto a mayúsculas para normalizar el formato (así `lk 203` y `LK203` dan el mismo resultado), y si el campo está vacío muestra un error de validación y para. Si hay un número válido llama `saveLastFlight()`, muestra el estado de carga con `renderLoading()`, hace GET al JSON y busca en el array `flights` el vuelo que coincida también normalizando el número del JSON. Según lo que encuentre llama `renderFlightResult()` si hay match, `renderNotFound()` si no existe, o `renderError()` si el fetch falló.

**`renderFlightResult(flight)`** crea el div `#flight-result` con clase `flight-result` y lo inserta inmediatamente después del formulario usando `flightStatusForm.after(div)`, con un `<h3>` para el número, un `<p>` con el estado y la clase CSS correcta (`--ontime`, `--delayed` o `--cancelled`) y una `<ul>` con origen, destino, horarios y fecha. Las funciones `renderNotFound()`, `renderError()` y `renderLoading()` insertan el mismo div pero con clases y mensajes distintos según la situación, mientras que `clearResult()` lo elimina del DOM antes de cada nueva búsqueda para evitar que se acumulen.

---

## students/students.js — Geraldo

Está en `students/` e importa `DATA_URL`. Las variables del inicio referencian `#student-register-form` como `registerForm`, y los cinco inputs del formulario: `#nombre`, `#universidad`, `#email`, `#grupo` y `#mensaje`.

**`fetchAndShowPackageNote()`** hace GET al JSON, lee cuántos paquetes estudiantiles hay en `data.packages.students` y crea un `<p class="packages-fetched-note">` con ese dato que inserta después del `.table-wrapper` dentro de `#student-packages` — es un render dinámico sencillo que demuestra que la información viene de un JSON externo.

**`showPlanRecommendation()`** se activa con cada `input` en `#grupo` y muestra debajo del campo un `<p id="plan-recommendation">` con la recomendación correspondiente: menos de 5 muestra una advertencia en naranja diciendo que el mínimo son 5 integrantes, de 5 a 9 recomienda el Plan Básico con 10% de descuento, de 10 a 19 recomienda el Estándar con 20% y 23 kg de equipaje, y con 20 o más recomienda el Premium con 30% y 32 kg. También guarda el número en `localStorage` bajo `luckyair_student_group_size`.

**`validateStudentForm(e)`** intercepta el submit y valida que `#nombre` tenga al menos 3 caracteres, que `#universidad` no esté vacío, que `#email` tenga formato válido, que `#grupo` sea un entero mayor o igual a 5 y que `#mensaje` tenga al menos 10 caracteres — si hay errores agrega `<span class="field-error">` en cada campo fallido, y si todo pasa guarda el nombre en `luckyair_student_name` y la universidad en `luckyair_student_uni`, muestra la confirmación y resetea el formulario.

**`loadSavedData()`** al cargar lee las tres claves de localStorage y rellena los campos correspondientes, y si había tamaño de grupo guardado también llama `showPlanRecommendation()` para que la recomendación aparezca desde el inicio sin que el usuario tenga que volver a escribir el número.

---

## corporate/corporate.js — Ivan

Está en `corporate/` e importa `ENTERPRISE_URL`. Las variables del inicio apuntan a `#corporateForm`, `#errorMessage`, `#successMessage`, `#company-name`, `#company-email` y `#company-employees`.

**Toggle activo del formulario:** hay un listener de `click` en `document` que agrega la clase `active` a `#corporateForm` si el click fue dentro, o la quita si fue fuera, lo que permite aplicar un estilo visual diferente cuando el usuario está interactuando con el formulario.

**`showPlanRecommendation()`** se activa con `input` en `#company-employees` y muestra debajo del campo un `<p id="plan-recommendation">` con el plan que corresponde: 1 a 10 empleados es Plan Básico con tarifas corporativas y reservas centralizadas, de 11 a 50 es Plan Estándar que suma reportes mensuales y prioridad en check-in, y con 51 o más es Plan Enterprise con asesor dedicado, facturación consolidada y acceso API.

**`validateForm()`** valida los tres campos antes de hacer el fetch: `#company-name` no puede estar vacío, `#company-email` necesita formato válido y `#company-employees` debe ser un entero mayor que cero. Si hay error agrega `<span class="field-error">` en el campo y retorna `false`, y si todo está bien retorna `true`.

**Submit con fetch a n8n:** el listener de `submit` primero llama `validateForm()` y si retorna `false` para sin hacer nada más, y si pasa construye el body con `nombre_empresa`, `correo_corporativo` y `numero_empleados`, guarda el nombre de empresa en `luckyair_company_name`, y hace POST a `http://localhost:5678/webhook/enterprise` con `Content-Type: application/json` — si la respuesta es ok muestra el mensaje en `#successMessage` y resetea el form, y si falla muestra el error en `#errorMessage`.

**`loadSavedCompany()`** al cargar lee `luckyair_company_name` de localStorage y si existe lo pone en `#company-name` para que la empresa no tenga que escribir su nombre cada vez.

---

## data/site-data.json

Está en la carpeta `data/` en la raíz y se accede con la ruta `../data/site-data.json`, que está exportada como `DATA_URL` en `shared/constants.js`. El archivo tiene cinco secciones: `flights` con los vuelos disponibles (número, ruta, estado y horarios), `destinations` con los tres destinos principales y sus imágenes, `packages` con los planes estudiantiles y corporativos, `reviews` con las reseñas que se renderizan dinámicamente en el muro de community, y `services` con los trámites disponibles en autoservicio.

Los números de vuelo para probar en self-service son `LK 203` (Kunming → Dali, a tiempo), `LK 105` (Kunming → Xishuangbanna, demorado), `LK 317` (Dali → Kunming, a tiempo) y `LK 412` (Kunming → Lijiang, cancelado).

---

## Claves de localStorage por integrante

| Clave | La guarda | La recupera | Qué contiene |
|---|---|---|---|
| `luckyair_community_draft` | `saveDraft()` al escribir | `loadDraft()` al cargar | JSON con los 5 campos del form compartir |
| `luckyair_last_flight` | `saveLastFlight()` al buscar | `loadLastFlight()` al cargar | Último número de vuelo consultado |
| `luckyair_student_name` | `validateStudentForm()` al enviar | `loadSavedData()` al cargar | Nombre del estudiante |
| `luckyair_student_uni` | `validateStudentForm()` al enviar | `loadSavedData()` al cargar | Nombre de la universidad |
| `luckyair_student_group_size` | `showPlanRecommendation()` al tipear | `loadSavedData()` al cargar | Número de integrantes del grupo |
| `luckyair_company_name` | Submit handler al enviar con éxito | `loadSavedCompany()` al cargar | Nombre de la empresa registrada |

---

## Criterios EE3 cubiertos por cada integrante

| Criterio | Rachel | Ivan | Alessandro | Geraldo |
|---|---|---|---|---|
| DOM + eventos | render resultado del vuelo + precarga localStorage | toggle activo del form + plan por empleados | botones de filtro + ocultar/mostrar cards | plan por grupo (students.js) + beneficios desplegables (index.js) |
| Validación form | campo vacío antes del fetch | tres campos del form corporativo | cinco campos del form compartir | cinco campos del form estudiantil |
| localStorage | último vuelo buscado | nombre de empresa | borrador completo del formulario | nombre + universidad + tamaño de grupo |
| Fetch + render | GET JSON → render estado del vuelo | POST a webhook n8n | GET JSON → render reseñas en el muro | GET JSON → nota de paquetes disponibles |

---

## Cómo probar

El sitio está desplegado en GitHub Pages en `https://ucal-systems-engineering-1st.github.io/yunnan-lucky-air/` y ahí funciona todo directo, incluyendo el fetch al JSON, porque GitHub Pages sirve los archivos sobre HTTPS.

Para verificar que todo esté bien abrir DevTools con F12: en Console no debe haber errores en rojo, en Application → Local Storage se pueden ver las claves `luckyair_*` después de interactuar con los formularios, y en Network → Fetch/XHR se puede ver la petición a `site-data.json` con status 200.
