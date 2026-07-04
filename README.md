# Lucky Air – Portal E-commerce

Proyecto web para la aerolínea **Lucky Air**, enfocado en la venta de vuelos a destinos de la provincia de Yunnan, China (Dali, Xishuangbanna, Kunming). Desarrollado como parte del curso **Fundamentos de Frontend – UCAL**.

---

## Estructura del proyecto

```
yunnan-lucky-air/
├── .github/
│   └── workflows/
│       ├── ci.yml         # Validación automática (HTML, CSS, JS, commits, ramas)
│       └── release.yml    # Pipeline de release: versionado, CHANGELOG, GitHub Release
├── assets/
│   ├── images/        # Imágenes de destinos (Yunnan, Dali, Xishuangbanna)
│   ├── icons/         # Íconos de estrellas y puntuación para reseñas
│   └── docs/          # Lineamientos, rúbricas, sílabo y caso del proyecto
├── shared/
│   ├── constants.js   # URLs compartidas (API_BASE_URL, ENTERPRISE_URL, DATA_URL)
│   ├── styles.css     # Estilos base y variables de marca
│   ├── header.css     # Header y navegación responsive
│   ├── footer.css
│   └── variables.css  # Paleta de colores y tipografía
├── data/
│   └── site-data.json     # Datos del sitio: vuelos, destinos, paquetes, reseñas, servicios
├── docs/
│   ├── quality.md                    # Evidencia de calidad EE4 (hallazgos y correcciones)
│   ├── EE3-technical-documentation.md
│   ├── EE3-exposicion.md
│   ├── EE3-presentacion-guia.md
│   ├── EE4-exposicion.md
│   └── EE4-presentacion-guia.md
├── skills/
│   ├── frontend-html/     # HTML semántico, formularios, validación HTML5
│   ├── frontend-css/      # CSS externo, Flexbox, Grid, media queries
│   ├── frontend-js/       # DOM, eventos, localStorage, Fetch
│   ├── frontend-commit/   # Conventional commits adaptados al curso
│   ├── frontend-branch/   # GitFlow: feature/*, release/*, hotfix/*
│   ├── frontend-pr/       # Plantilla de Pull Request con checklist
│   ├── frontend-changelog/ # keepachangelog.com + semver
│   └── frontend-ci/       # GitHub Actions: CI + pipeline de release
├── corporate/         # corporate.html + corporate.css + corporate.js — Ivan
├── self-service/      # self-service.html + self-service.css + self-service.js — Rachel
├── community/          # community.html + community.css + community.js — Alessandro
├── students/           # students.html + students.css + students.js — Geraldo
├── auth/               # login.html + register.html + sus estilos
├── index.html         # Home page con motor de búsqueda y enfoque en conversión
├── index.js           # Interacciones propias del home
├── main.js            # Menú hamburguesa global, cargado en todas las vistas
├── AGENTS.md          # Lineamientos del repositorio para el equipo y el asistente de IA
└── README.md          # Este archivo
```

> El proyecto usa **Screaming Architecture**: cada dominio de negocio (`corporate/`, `self-service/`, `community/`, `students/`) tiene su propio HTML, CSS y JS. El nombre de la carpeta dice exactamente qué hace, sin sorpresas. Ver `docs/EE3-technical-documentation.md` para el detalle función por función.

---

## Páginas disponibles

| Archivo                        | Descripción                                                    |
| ------------------------------ | -------------------------------------------------------------- |
| `index.html`                   | Página principal con buscador de vuelos, destinos y reseñas    |
| `corporate/corporate.html`     | Portal corporativo: planes, registro PYME y recomendación dinámica |
| `students/students.html`       | Ofertas estudiantiles, paquetes grupales y registro de jóvenes |
| `self-service/self-service.html` | Estado de vuelo, check-in y solicitud de reembolso           |
| `community/community.html`     | Muro de experiencias, filtro por destino y formulario para compartir viajes |
| `auth/login.html`              | Inicio de sesión (acceso a reservas e historial)               |
| `auth/register.html`           | Registro de cuenta nueva                                        |

---

## Segmentos de usuario

- **Viajero general**: Usa `index.html` para buscar y reservar vuelos.
- **Corporativo (PYMES)**: Accede a `views/corporate.html` para gestión de gastos y planes empresariales.
- **Estudiantes**: Encuentra descuentos y paquetes grupales en `views/students.html`.
- **Autoservicio**: Gestiona reservas, reembolsos y check-in en `views/self-service.html`.
- **Comunidad**: Comparte y lee experiencias de viaje en `views/community.html`.

---

## Tecnologías utilizadas

- **HTML5** semántico (estructura principal del proyecto)
- **CSS3** – organizado por dominio de negocio (`shared/` + un `.css` por sección), sin frameworks
- **JavaScript** vanilla (ES Modules) – un archivo por dominio (`corporate.js`, `self-service.js`, `community.js`, `students.js`) + `shared/constants.js` para URLs comunes. DOM, eventos, validación, `localStorage` y `fetch` (ver `docs/EE3-technical-documentation.md`)
- **Git + GitHub** – GitFlow, Conventional Commits, GitHub Actions CI/CD, despliegue a GitHub Pages

---

## Asistente de IA

Este repositorio está configurado para trabajar con asistentes de IA (Claude Code, Copilot, Cursor, etc.) mediante el archivo [AGENTS.md](AGENTS.md), que define reglas, contexto del proyecto y skills disponibles.

### Skills disponibles

Las skills son guías de contexto que el asistente carga automáticamente según la tarea:

| Skill                                                    | Descripción                                           | Cuándo se activa                |
| -------------------------------------------------------- | ----------------------------------------------------- | ------------------------------- |
| [frontend-html](skills/frontend-html/SKILL.md)           | HTML semántico, formularios, validación HTML5         | Al escribir o editar HTML       |
| [frontend-css](skills/frontend-css/SKILL.md)             | CSS externo, Flexbox, Grid, media queries, responsive | Al escribir o editar CSS        |
| [frontend-js](skills/frontend-js/SKILL.md)               | DOM, eventos, localStorage, Fetch, render dinámico    | Al escribir o editar JavaScript |
| [frontend-commit](skills/frontend-commit/SKILL.md)       | Conventional commits adaptados al curso               | Al crear un commit              |
| [frontend-branch](skills/frontend-branch/SKILL.md)       | GitFlow completo: feature/*, release/*, hotfix/*      | Al crear o nombrar una rama     |
| [frontend-pr](skills/frontend-pr/SKILL.md)               | Plantilla de Pull Request con checklist de rúbrica    | Al crear un PR                  |
| [frontend-changelog](skills/frontend-changelog/SKILL.md) | keepachangelog.com + semver alineado a hitos EE       | Al actualizar el CHANGELOG      |
| [frontend-ci](skills/frontend-ci/SKILL.md)               | GitHub Actions: CI (EE1–EE4) + pipeline de release    | Al editar workflows             |

> El asistente carga la skill correspondiente **antes** de escribir cualquier código. Consulta [AGENTS.md](AGENTS.md) para ver las reglas de auto-invocación.

---

## Estado del proyecto

| Entregable                  | Tecnologías                            | Estado        | Versión |
| --------------------------- | -------------------------------------- | ------------- | ------- |
| EE1 — Estructura HTML       | HTML5 + Git/GitHub                     | ✅ Completo   | v1.0.0  |
| EE2 — Layout y estilos      | + CSS3, Flexbox, Grid, Responsive      | ✅ Completo   | v2.0.0  |
| EE3 — Interactividad        | + JavaScript, DOM, localStorage, Fetch | ✅ Completo   | v3.4.0  |
| EE4 — Integración y calidad | + PRs, evidencia de calidad, despliegue | ✅ Completo  | v3.4.0  |

---

## Funcionalidades v3.4 (EE3 — completo)

> Detalle función por función en [docs/EE3-technical-documentation.md](docs/EE3-technical-documentation.md).

### Home — `index.js` + `main.js` (Geraldo)
- [x] Menú hamburguesa global con toggle responsive + `aria-expanded` (`main.js`)
- [x] Tarjetas de destino seleccionables con `classList.toggle` (`index.js`, líneas 12–16)
- [x] Vista previa de vuelo en tiempo real, inputs origin/destination (`index.js`, líneas 25–40)
- [x] Beneficios desplegables con toggle `oculta` (`index.js`, líneas 48–56)

### Self-Service — `self-service/self-service.js` (Rachel)
- [x] localStorage: recordar último número de vuelo buscado (líneas 10–17)
- [x] Fetch + render dinámico del estado del vuelo desde `data/site-data.json` (líneas 22–84)
- [x] Validación de check-in con regex — código de reserva, apellido, documento, fecha (líneas 135–170)
- [x] Botón de check-in cambia de texto y se deshabilita tras envío exitoso

### Corporate — `corporate/corporate.js` (Ivan)
- [x] Estado activo del formulario (toggle de clase al hacer click dentro/fuera)
- [x] Plan recomendado dinámico según número de empleados (líneas 24–47)
- [x] Validación de formulario con errores inline (líneas 52–73)
- [x] localStorage + POST real a webhook n8n en producción (líneas 78–122)

### Community — `community/community.js` (Alessandro)
- [x] Fetch + render dinámico de reseñas desde `data/site-data.json` (líneas 14–42)
- [x] Filtro de reseñas por destino (líneas 47–76)
- [x] localStorage: autoguardado de borrador del formulario "Compartir mi viaje" (líneas 81–102)
- [x] Validación del formulario con feedback inline (líneas 107–143)

### Students — `students/students.js` (Geraldo)
- [x] Fetch + nota dinámica de paquetes disponibles (líneas 13–29)
- [x] Plan recomendado según tamaño de grupo (líneas 32–60)
- [x] Validación de formulario de registro estudiantil (líneas 71–110)
- [x] localStorage: nombre, universidad y tamaño de grupo (líneas 115–126)

---

## Entregables EE4

| Entregable | Contenido | Enlace |
| ---------- | --------- | ------ |
| 1. Repositorio final | Código + flujo GitFlow con PRs mergeados por integrante | Este repositorio, rama `main` |
| 2. Sitio publicado | GitHub Pages — navegación completa, responsive, sin errores en consola | https://ucal-systems-engineering-1st.github.io/yunnan-lucky-air/ |
| 3. Evidencia de calidad | 3 hallazgos identificados y corregidos (performance, CLS, UX de navegación) | [docs/quality.md](docs/quality.md) |
| Exposición | Guión por integrante + guía de demo | [docs/EE4-exposicion.md](docs/EE4-exposicion.md) · [docs/EE4-presentacion-guia.md](docs/EE4-presentacion-guia.md) |

---

## Cómo probar

> El sitio está desplegado en GitHub Pages, donde el `fetch` a `site-data.json` funciona directo sobre HTTPS. Es la forma más simple de probar todo sin instalar nada.

### Opción recomendada — sitio publicado
1. Abrir https://ucal-systems-engineering-1st.github.io/yunnan-lucky-air/
2. Navegar entre Home, Autoservicio, Comunidad, Estudiantes, Corporativo y Login/Registro desde el header.
3. Abrir DevTools (`F12`) → pestañas **Console** (sin errores en rojo), **Network** (fetch a `site-data.json` con status 200) y **Application → Local Storage** (claves `luckyair_*` tras interactuar con los formularios).

### Requisitos para correr localmente
- Navegador moderno (Chrome recomendado)
- Servidor local, porque el `fetch()` no funciona con `file://`:
  ```bash
  python -m http.server 5500
  # Luego abrir: http://localhost:5500
  ```

### 1. DOM + Eventos
1. Abrir la vista correspondiente (`index.html` o `{dominio}/{dominio}.html`)
2. Interactuar con los elementos interactivos (toggles, filtros, acordeones)
3. Verificar en **Console** que no aparezcan errores en rojo

### 2. Validación de formulario
1. Intentar enviar el formulario con campos vacíos o con datos inválidos
2. Verificar que aparecen mensajes de error claros debajo de cada campo
3. Completar el formulario correctamente y verificar mensaje de éxito

### 3. localStorage
1. Interactuar con la funcionalidad que guarda preferencias (búsqueda, selección, borrador)
2. Abrir **DevTools → Application → Local Storage**
3. Verificar que aparece la clave guardada con su valor
4. Recargar la página (`F5`) y confirmar que el valor persiste

### 4. Fetch + render dinámico
1. Abrir la vista y esperar que la sección de datos cargue automáticamente
2. Verificar en **Console** que no hay errores de red (`Failed to fetch`)
3. Confirmar que las cards/lista se renderizan correctamente

---

## Criterios de diseño

- Enfoque en **conversión**: el buscador de vuelos es el elemento central de la home page.
- **Accesibilidad**: uso de `aria-label`, `role`, `aria-live` y estructura semántica en todos los formularios.
- **IDs únicos** en todos los elementos interactivos para facilitar testing.
- **Rutas relativas** consistentes entre `index.html` y las vistas en `/views/`.

---

## Flujo de trabajo

Seguimos **GitFlow**. Toda nueva funcionalidad parte desde `develop`, se desarrolla en una rama `feat/*` y llega a `main` únicamente a través de una rama `release/*` al cierre de cada EE.

### Requisitos previos

- Tener [Git](https://git-scm.com/) instalado.
- Tener acceso de colaborador al repositorio.

### Flujo diario (feature → develop)

```bash
# 1. Partir desde un develop actualizado
git checkout develop && git pull origin develop

# 2. Crear tu rama
git checkout -b feat/nombre-de-tu-tarea

# 3. Desarrollar y commitear
git add <archivos>
git commit -m "feat(html): descripción breve del cambio"

# 4. Abrir PR hacia develop
git push -u origin feat/nombre-de-tu-tarea
gh pr create --title "feat: descripción" --base develop

# 5. Después del merge, limpiar
git checkout develop && git pull origin develop
git branch -d feat/nombre-de-tu-tarea
```

### Flujo de release (al cierre de cada EE)

```bash
# 1. Crear rama release desde develop
git checkout develop && git pull origin develop
git checkout -b release/v2.0.0
git push -u origin release/v2.0.0

# 2. PR a main — el nombre de la rama define la versión
gh pr create --title "chore: release v2.0.0" --base main

# 3. Al mergear → release.yml publica v2.0.0 automáticamente ✅
```

> Para la plantilla completa del PR y el checklist de rúbrica, consulta la skill [frontend-pr](skills/frontend-pr/SKILL.md).

---

## Flujo de ramas (GitFlow)

El proyecto usa **GitFlow** con integración continua en `develop` y releases automáticos al mergear a `main`.

```
main ──────────────────────────────────► (v1.0.0, v2.0.0, v3.0.0, v4.0.0)
  ▲                                ▲
  │ release.yml calcula versión,   │ merge hotfix/*
  │ genera CHANGELOG y crea        │
  │ GitHub Release automáticamente │
  │                                │
release/v2.0.0 ─────────────────►─┘
  ▲
  │ branch desde develop
  │
develop ────────────────────────────► (integración continua del equipo)
  ▲        ▲         ▲
  │        │         │ merge vía PR
feat/*   fix/*    chore/*
```

| Rama             | Propósito                                                         |
| ---------------- | ----------------------------------------------------------------- |
| `main`           | Código estable; solo recibe merges desde `release/*` o `hotfix/*` |
| `develop`        | Integración continua del equipo; base para nuevas features        |
| `feat/*`         | Desarrollo de una funcionalidad o vista específica                |
| `fix/*`          | Corrección de un bug no urgente                                   |
| `chore/*`        | Tareas de mantenimiento o configuración                           |
| `release/vX.Y.Z` | Rama de cierre de EE; su nombre define la versión publicada       |
| `hotfix/vX.Y.Z`  | Corrección urgente de un error en `main`                          |

### Asignación de ramas por colaborador

#### EE1 / EE2 (referencia histórica)

| Colaborador | Rama | Página asignada |
| ----------- | ---- | --------------- |
| Rachel      | `feat/self-service` | `views/self-service.html` |
| Ivan        | `feat/corporate`    | `views/corporate.html`    |
| Alessandro  | `feat/community`    | `views/community.html`    |
| Geraldo     | `feat/students`     | `views/students.html`     |

#### EE3 — JavaScript (v3.0 — semanas 9–12)

| Colaborador | Rama EE3 | Archivo JS | Vista |
| ----------- | -------- | ---------- | ----- |
| Rachel      | `feat/self-service-js` | `scripts/self-service.js` | `views/self-service.html` |
| Ivan        | `feat/corporate-js`    | `scripts/corporate.js`    | `views/corporate.html`    |
| Alessandro  | `feat/community-js`    | `scripts/community.js`    | `views/community.html`    |
| Geraldo     | `feat/students-js`     | `scripts/students.js`     | `views/students.html`     |

### Convención de mensajes de commit

Usa el formato **Conventional Commits**: `tipo(scope): descripción corta`

| Tipo       | Scope sugerido        | Uso                                                |
| ---------- | --------------------- | -------------------------------------------------- |
| `feat`     | `html`, `css`, `js`   | Nueva funcionalidad o vista                        |
| `fix`      | `html`, `css`, `js`   | Corrección de error                                |
| `style`    | `css`                 | Cambios de estilo sin afectar lógica               |
| `docs`     | `readme`, `changelog` | Actualización de documentación                     |
| `refactor` | `js`, `css`           | Reorganización de código sin cambiar funcionalidad |
| `chore`    | `config`, `ci`        | Tareas de mantenimiento o configuración            |
| `assets`   | `images`, `icons`     | Agregar o modificar recursos estáticos             |

**Ejemplos:**
```bash
git commit -m "feat(html): agregar formulario de registro estudiantil"
git commit -m "fix(css): corregir overflow en mobile del hero"
git commit -m "docs(readme): actualizar tabla de entregas semanales"
git commit -m "feat(js): implementar localStorage para historial de búsqueda"
```

> Para más detalle sobre tipos, scopes y el árbol de decisión, consulta la skill [frontend-commit](skills/frontend-commit/SKILL.md).

---

## Equipo
| Integrante                                                                           | GitHub                                           | Rol                |
| :----------------------------------------------------------------------------------- | :----------------------------------------------- | :----------------- |
| <img src="https://github.com/Rachelduarte.png" width="40" style="border-radius:50%"> | [@Rachelduarte](https://github.com/Rachelduarte) | Software Developer |
| <img src="https://github.com/1v4nz2023.png" width="40" style="border-radius:50%">    | [@1v4nz2023](https://github.com/1v4nz2023)       | Software Developer |
| <img src="https://github.com/alemarquina.png" width="40" style="border-radius:50%">  | [@alemarquina](https://github.com/alemarquina)   | Software Developer |
| <img src="https://github.com/Geraldow.png" width="40" style="border-radius:50%">     | [@Geraldow](https://github.com/Geraldow)         | Software Developer |

---

## Recursos del curso

| Recurso              | Archivo                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| Sílabo completo      | [assets/docs/silabo-fundamentos-de-desarrollo-frontend.md](assets/docs/silabo-fundamentos-de-desarrollo-frontend.md) |
| Lineamientos EE1–EE4 | [assets/docs/lineamientos/](assets/docs/lineamientos/)                                                 |
| Rúbrica EE1–EE4      | [assets/docs/rubrica/](assets/docs/rubrica/)                                                           |
| Caso del proyecto    | [assets/docs/case-ecommerce-at-yunnan-lucky-air.md](assets/docs/case-ecommerce-at-yunnan-lucky-air.md) |
| Evidencia de calidad EE4 | [docs/quality.md](docs/quality.md)                                                                 |
