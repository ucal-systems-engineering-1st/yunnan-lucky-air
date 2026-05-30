# Lucky Air Portal — Lineamientos del Repositorio

## Descripción del proyecto

**Proyecto:** Lucky Air – Portal E-commerce
**Curso:** Fundamentos de Desarrollo Frontend (Código 18612)
**Programa:** Ingeniería de Sistemas — UCAL · Semestre 2026-1 · Ciclo 1 · Virtual
**Equipo:** Rachel Duarte · Ivan · Alessandro · Geraldo

El sitio es un portal de e-commerce de vuelos para la aerolínea de la provincia de Yunnan, China (**Lucky Air**), y **evoluciona acumulativamente** a través de 4 versiones durante el ciclo:

| Unidad | Semanas | Tecnologías | Entrega | Peso |
|--------|---------|-------------|---------|------|
| UA1 | 1–4 | HTML + Git/GitHub | EE1 — v1.0.0 | 15% |
| UA2 | 5–8 | + CSS, Flexbox, Grid, Responsive | EE2 — v2.0.0 | 25% |
| UA3 | 9–12 | + JavaScript, DOM, localStorage, Fetch | EE3 — v3.0.0 | 25% |
| UA4 | 13–16 | + Branches, PRs, Lighthouse, Despliegue | EE4 — v4.0.0 | 35% |

> Cada EE es acumulativo: EE2 incluye HTML+CSS, EE3 incluye HTML+CSS+JS, EE4 incluye todo.

---

## Skills disponibles

Usa estas skills para patrones detallados y reglas bajo demanda:

| Skill | Descripción | URL |
|-------|-------------|-----|
| `frontend-html` | HTML semántico, estructura, formularios, validación HTML5 (EE1+) | [SKILL.md](skills/frontend-html/SKILL.md) |
| `frontend-css` | CSS externo, Flexbox, Grid, media queries, responsive (EE2+) | [SKILL.md](skills/frontend-css/SKILL.md) |
| `frontend-js` | DOM, eventos, localStorage, Fetch, render dinámico (EE3+) | [SKILL.md](skills/frontend-js/SKILL.md) |
| `frontend-commit` | Conventional commits adaptados al curso (html/css/js/assets/docs/config) | [SKILL.md](skills/frontend-commit/SKILL.md) |
| `frontend-branch` | GitFlow completo: feature/*, release/*, hotfix/*, develop, main | [SKILL.md](skills/frontend-branch/SKILL.md) |
| `frontend-pr` | Plantilla de Pull Request con checklist basado en rúbricas del curso | [SKILL.md](skills/frontend-pr/SKILL.md) |
| `frontend-changelog` | keepachangelog.com + semver alineado a hitos EE | [SKILL.md](skills/frontend-changelog/SKILL.md) |
| `frontend-ci` | GitHub Actions: validación CI (EE1–EE4) + pipeline de release en bash | [SKILL.md](skills/frontend-ci/SKILL.md) |

---

## Auto-invoke

Al realizar estas acciones, SIEMPRE invocar la skill correspondiente PRIMERO:

| Acción | Skill |
|--------|-------|
| Escribir o editar estructura HTML, head, body, secciones | `frontend-html` |
| Agregar elementos semánticos, nav, formularios, multimedia | `frontend-html` |
| Escribir o editar CSS, estilos base, selectores | `frontend-css` |
| Implementar Flexbox, Grid o media queries | `frontend-css` |
| Verificar layout responsive o probar en DevTools | `frontend-css` |
| Escribir o editar JavaScript, main.js | `frontend-js` |
| Implementar DOM, eventos, classList, querySelector | `frontend-js` |
| Implementar localStorage, Fetch o render dinámico | `frontend-js` |
| Crear un commit | `frontend-commit` |
| Escribir un mensaje de commit | `frontend-commit` |
| Crear o nombrar una rama | `frontend-branch` |
| Crear una rama release/*, hotfix/*, o develop | `frontend-branch` |
| Crear un Pull Request | `frontend-pr` |
| Completar la plantilla del PR | `frontend-pr` |
| Actualizar CHANGELOG.md | `frontend-changelog` |
| Registrar un nuevo hito o versión | `frontend-changelog` |
| Editar .github/workflows/ | `frontend-ci` |
| Configurar CI/CD, pipeline de release o workflows | `frontend-ci` |

---

## Versionado

El proyecto usa **Semantic Versioning (semver)** gestionado por `.github/workflows/release.yml`.

La versión se resuelve en este orden:

| Fuente | Rama | Versión |
|--------|------|---------|
| Nombre explícito de rama | `release/v2.0.0` | `2.0.0` |
| Nombre explícito de rama | `hotfix/v1.0.1` | `1.0.1` |
| Commits — MINOR | `hotfix/fix-*` con `feat:` | último MINOR + 1 |
| Commits — PATCH | `hotfix/fix-*` con `fix:` / `docs:` | último PATCH + 1 |

### Hitos del curso (versiones MAJOR)

| EE | Versión base | Rama release | Descripción |
|----|-------------|--------------|-------------|
| EE1 | `v1.0.0` | `release/v1.0.0` | Sitio HTML + Git |
| EE2 | `v2.0.0` | `release/v2.0.0` | + CSS, layout, responsive |
| EE3 | `v3.0.0` | `release/v3.0.0` | + JavaScript, interactividad, datos |
| EE4 | `v4.0.0` | `release/v4.0.0` | + Integración, calidad, despliegue |

> Los saltos MAJOR se logran creando una rama con la versión en el nombre: `release/v2.0.0` → publica `v2.0.0`.

---

## Flujo Git — GitFlow

```
main ──────────────────────────────────────────► (v1.0.0, v2.0.0, v3.0.0, v4.0.0)
  ▲                                     ▲
  │ merge release/* → release.yml       │ merge hotfix/*
  │ calcula versión, genera             │
  │ CHANGELOG y crea GitHub             │
  │ Release automáticamente             │
  │                                     │
release/v2.0.0 ────────────────────────►┘
  ▲
  │ branch desde develop
  │
develop ──────────────────────────────────────► (integración continua del equipo)
  ▲          ▲
  │          │ merge vía PR
  │          │
feat/*     fix/*     docs/*
```

### Asignación de ramas por integrante

#### EE1 / EE2 — HTML + CSS (referencia histórica)

| Integrante | Rama | Página asignada |
|------------|------|-----------------|
| Rachel | `feat/self-service` | `views/self-service.html` |
| Ivan | `feat/corporate` | `views/corporate.html` |
| Alessandro | `feat/community` | `views/community.html` |
| Geraldo | `feat/students` | `views/students.html` |

#### EE3 — JavaScript + DOM + Datos (v3.0 — en proceso)

| Integrante | Rama EE3 | Archivo JS | Vista |
|------------|----------|-----------|-------|
| Rachel | `feat/self-service-js` | `scripts/self-service.js` | `views/self-service.html` |
| Ivan | `feat/corporate-js` | `scripts/corporate.js` | `views/corporate.html` |
| Alessandro | `feat/community-js` | `scripts/community.js` | `views/community.html` |
| Geraldo | `feat/students-js` | `scripts/students.js` | `views/students.html` |

> Geraldo también mantiene `scripts/main.js` para `index.html` y crea `data/site-data.json` como merge master.
> **Estado actual `scripts/main.js` (v3.1.0):** menú hamburguesa ✅ · tarjetas destino seleccionables ✅ · vista previa de vuelo ✅ · beneficios desplegables ✅ — Pendiente: localStorage + Fetch + `scripts/students.js`

##### Implementaciones requeridas por integrante (rúbrica EE3)

| Criterio | Rachel — self-service | Ivan — corporate | Alessandro — community | Geraldo — students |
|----------|-----------------------|-----------------|------------------------|-------------------|
| **DOM + eventos (≥2)** | Toggle pasos check-in · mostrar resultado validación de ticket | Toggle comparación de planes · accordion de preguntas frecuentes | Filtro de reseñas por destino · modal "Compartir viaje" | Filtro de ofertas estudiantiles · toggle formulario grupal |
| **Validación form** | Formulario de validación de ticket / check-in | Formulario de registro corporativo | Formulario "Compartir mi viaje" | Formulario de registro estudiantil |
| **localStorage (≥1)** | Último número de ticket ingresado | Plan corporativo seleccionado | Borrador del formulario compartir | Destino/filtro de búsqueda seleccionado |
| **Fetch + render** | Estado de vuelo desde `data/site-data.json` | Planes disponibles desde `data/site-data.json` | Reseñas de viajeros desde `data/site-data.json` | Paquetes estudiantiles desde `data/site-data.json` |

##### Hitos de commit recomendados (mínimo 4 por integrante — semanas 9–12)

```bash
feat(js): dom-eventos-{vista}    # toggles, listeners, classList
feat(js): validacion-{vista}     # form submit interceptado + feedback
feat(js): localstorage-{vista}   # guardar/recuperar preferencia
feat(js): fetch-render-{vista}   # fetch + render dinámico desde JSON
```

##### Flujo diario EE3 (feature-js → develop)

```bash
# 1. Partir desde develop actualizado
git checkout develop && git pull origin develop

# 2. Crear rama EE3
git checkout -b feat/{vista}-js

# 3. Enlazar JS en tu vista (antes de </body>)
# <script src="../scripts/{vista}.js" defer></script>

# 4. Crear archivo JS
# touch scripts/{vista}.js

# 5. Desarrollar — 4 commits por hito
git commit -m "feat(js): dom-eventos para {vista}"

# 6. PR a develop
git push -u origin feat/{vista}-js
gh pr create --title "feat(js): interactividad {vista} v3.0" --base develop
```

##### Datos compartidos — `data/site-data.json`

Geraldo crea el archivo `data/site-data.json` con la estructura base. Cada integrante consume la sección correspondiente:

| Sección JSON | Consumida por |
|-------------|---------------|
| `flights` | Geraldo (`scripts/main.js` — index.html) |
| `destinations` | Geraldo (`scripts/main.js`) |
| `packages.students` | Geraldo (`scripts/students.js`) |
| `packages.corporate` | Ivan (`scripts/corporate.js`) |
| `reviews` | Alessandro (`scripts/community.js`) |
| `services` | Rachel (`scripts/self-service.js`) |

### Flujo diario (feature → develop)

```bash
# 1. Partir desde un develop actualizado
git checkout develop && git pull origin develop

# 2. Crear rama feature
git checkout -b feat/seccion-galeria

# 3. Desarrollar y commitear (ver frontend-commit)
git add <archivos>
git commit -m "feat(css): implementar CSS Grid para galería"

# 4. PR a develop (ver frontend-pr)
git push -u origin feat/seccion-galeria
gh pr create --title "feat: sección galería con CSS Grid" --base develop

# 5. Después del merge, limpiar
git checkout develop && git pull origin develop
git branch -d feat/seccion-galeria
```

### Flujo de release (cuando el EE está listo)

```bash
# 1. Crear rama release desde develop
git checkout develop && git pull origin develop
git checkout -b release/v2.0.0   # el nombre de la rama define la versión
git push -u origin release/v2.0.0

# 2. PR a main
gh pr create --title "chore: release v2.0.0" --base main

# 3. Después del merge → release.yml lee "v2.0.0" del nombre de la rama,
#    actualiza CHANGELOG.md y crea GitHub Release v2.0.0 con site-v2.0.0.zip ✅

# 4. Sincronizar release → develop
gh pr create --title "chore: sync v2.0.0 → develop" --base develop --head release/v2.0.0
```

### Estructura de commits recomendada por EE

| EE | Mínimo recomendado | Hitos de ejemplo |
|----|--------------------|--------------------|
| EE1 | 4 commits | base-structure, navegación, multimedia, formulario |
| EE2 | 4 commits | css-base, flexbox, grid, responsive |
| EE3 | 4 commits | dom-eventos, validación, localstorage, fetch-render |
| EE4 | 1 PR mergeado por integrante | — |

### Protección de ramas

| Rama | Reglas |
|------|--------|
| `main` | Requiere PR, 1 aprobación, ramas actualizadas — sin bypass |
| `develop` | Requiere PR, 1 aprobación |

### Referencias

- GitFlow detallado: [skills/frontend-branch/SKILL.md](skills/frontend-branch/SKILL.md)
- GitHub Actions CI/Release: [skills/frontend-ci/SKILL.md](skills/frontend-ci/SKILL.md)
- Caso del proyecto: [docs/case-ecommerce-at-yunnan-lucky-air.md](docs/case-ecommerce-at-yunnan-lucky-air.md)
