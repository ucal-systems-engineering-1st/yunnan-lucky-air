# Lucky Air – Portal E-commerce

Proyecto web para la aerolínea **Lucky Air**, enfocado en la venta de vuelos a destinos de la provincia de Yunnan, China (Dali, Xishuangbanna, Kunming). Desarrollado como parte del curso **Fundamentos de Frontend – UCAL**.

---

## Estructura del proyecto

```
LUCKY-AIR-ECOMMERCE/
├── .github/
│   └── workflows/
│       ├── ci.yml         # Validación automática (HTML, CSS, JS, commits, ramas)
│       └── release.yml    # Pipeline de release: versionado, CHANGELOG, GitHub Release
├── assets/
│   ├── images/        # Imágenes de destinos (Yunnan, Dali, Xishuangbanna)
│   ├── icons/         # Íconos de estrellas y puntuación para reseñas
│   └── docs/          # Guías de destinos en PDF descargables
├── css/
│   ├── layouts/       # Estilos del portal de autoservicio y estructura general
│   ├── components/    # Estilos de botones, cards y chatbot
│   └── themes/        # Paleta de colores y tipografía de marca Lucky Air
├── docs/
│   ├── lineamientos/  # Lineamientos de cada entregable (EE1–EE4)
│   ├── rubrica/       # Rúbricas de evaluación (EE1–EE4)
│   ├── case-ecommerce-at-yunnan-lucky-air.md  # Caso del proyecto
│   └── silabo-fundamentos-de-desarrollo-frontend.md
├── js/
│   ├── auth/          # Lógica de inicio de sesión para miembros de lealtad
│   ├── booking/       # Motor de búsqueda y reserva de vuelos
│   ├── community/     # Lógica para blogs y comentarios de usuarios
│   └── payment/       # Integración segura de pagos (Alipay / PayPal)
├── skills/
│   ├── frontend-html/     # HTML semántico, formularios, validación HTML5
│   ├── frontend-css/      # CSS externo, Flexbox, Grid, media queries
│   ├── frontend-js/       # DOM, eventos, localStorage, Fetch
│   ├── frontend-commit/   # Conventional commits adaptados al curso
│   ├── frontend-branch/   # GitFlow: feature/*, release/*, hotfix/*
│   ├── frontend-pr/       # Plantilla de Pull Request con checklist
│   ├── frontend-changelog/ # keepachangelog.com + semver
│   └── frontend-ci/       # GitHub Actions: CI + pipeline de release
├── views/
│   ├── corporate.html     # Herramientas de viaje para PYMES y control de gastos
│   ├── students.html      # Ofertas y paquetes grupales para jóvenes estudiantes
│   ├── self-service.html  # Check-in, validación de ticket y reembolsos
│   └── community.html     # Muro de experiencias y reseñas de viajeros
├── index.html         # Home page con motor de búsqueda y enfoque en conversión
├── AGENTS.md          # Lineamientos del repositorio para el equipo y el asistente de IA
└── README.md          # Este archivo
```

---

## Páginas disponibles

| Archivo                   | Descripción                                                    |
| ------------------------- | -------------------------------------------------------------- |
| `index.html`              | Página principal con buscador de vuelos, destinos y reseñas    |
| `views/corporate.html`    | Portal corporativo: planes, herramientas PYME y registro       |
| `views/students.html`     | Ofertas estudiantiles, paquetes grupales y registro de jóvenes |
| `views/self-service.html` | Check-in, validación de ticket, reembolsos y guías PDF         |
| `views/community.html`    | Muro de experiencias, blogs y formulario para compartir viajes |

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
- **CSS3** – organizado por capas: `themes`, `layouts`, `components` *(pendiente)*
- **JavaScript** – organizado por módulos: `auth`, `booking`, `community`, `payment` *(pendiente)*
- **Git + GitHub** – GitFlow, Conventional Commits, GitHub Actions CI/CD

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

| Entregable                  | Tecnologías                            | Estado      | Versión |
| --------------------------- | -------------------------------------- | ----------- | ------- |
| EE1 — Estructura HTML       | HTML5 + Git/GitHub                     | ✅ Completo  | v1.0.0  |
| EE2 — Layout y estilos      | + CSS3, Flexbox, Grid, Responsive      | 🔜 Pendiente | v2.0.0  |
| EE3 — Interactividad        | + JavaScript, DOM, localStorage, Fetch | 🔜 Pendiente | v3.0.0  |
| EE4 — Integración y calidad | + PRs, Lighthouse, Despliegue          | 🔜 Pendiente | v4.0.0  |

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

| Colaborador | Rama                | Página asignada           |
| ----------- | ------------------- | ------------------------- |
| Rachel      | `feat/self-service` | `views/self-service.html` |
| Ivan        | `feat/corporate`    | `views/corporate.html`    |
| Alessandro  | `feat/community`    | `views/community.html`    |
| Geraldo     | `feat/students`     | `views/students.html`     |

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
| Sílabo completo      | [docs/silabo-fundamentos-de-desarrollo-frontend.md](docs/silabo-fundamentos-de-desarrollo-frontend.md) |
| Lineamientos EE1–EE4 | [docs/lineamientos/](docs/lineamientos/)                                                               |
| Rúbrica EE1–EE4      | [docs/rubrica/](docs/rubrica/)                                                                         |
| Caso del proyecto    | [docs/case-ecommerce-at-yunnan-lucky-air.md](docs/case-ecommerce-at-yunnan-lucky-air.md)               |
