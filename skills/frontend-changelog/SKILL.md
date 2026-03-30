---
name: frontend-changelog
description: >
  Gestión del CHANGELOG.md siguiendo keepachangelog.com con Semantic Versioning alineado
  al curso Fundamentos de Desarrollo Frontend (UCAL 2026-1).
  Los hitos EE son versiones MAYOR. feat→MINOR, fix→PATCH.
  Trigger: Al actualizar CHANGELOG.md, registrar un nuevo hito o versión del sitio.
license: MIT
metadata:
  author: ucal-frontend
  version: "1.0.0"
---

## Reglas críticas

- SIEMPRE seguir el formato de keepachangelog.com
- SIEMPRE agregar nuevas entradas al inicio del archivo (versión más reciente primero)
- NUNCA modificar versiones ya entregadas (las entregas EE son inmutables)
- SIEMPRE enlazar el PR o commit relevante cuando esté disponible

---

## Reglas de Semantic Versioning

La versión se define por el **nombre de la rama**, no por el tipo de commit:

| Fuente | Ejemplo | Versión publicada |
|--------|---------|-------------------|
| Nombre de rama | `release/v2.0.0` | `v2.0.0` (MAYOR — hito EE) |
| Nombre de rama | `release/v1.1.0` | `v1.1.0` (MINOR) |
| Nombre de rama | `hotfix/v1.0.1` | `v1.0.1` (PATCH) |
| Commits (PATCH auto) | `hotfix/fix-navbar` con `fix:` | `v1.0.1` desde `v1.0.0` |

Los conventional commits (`feat:`, `fix:`, `docs:`, etc.) determinan las **secciones del CHANGELOG** (Added, Fixed, Changed), no el número de versión.

### Hitos EE — versiones MAYOR

| EE | Versión base | Descripción del salto |
|----|-------------|----------------------|
| EE1 | `v1.0.0` | Estructura HTML base + Git/GitHub |
| EE2 | `v2.0.0` | Adición de CSS, layout y responsive |
| EE3 | `v3.0.0` | Adición de JavaScript, DOM y datos |
| EE4 | `v4.0.0` | Integración final, calidad y despliegue |

---

## Reglas de formato (keepachangelog.com)

### Secciones en orden

```markdown
## [X.Y.Z] - YYYY-MM-DD

### 🚀 Added
### 🔄 Changed
### ❌ Removed
### 🐞 Fixed
```

### Reglas de entrada

- Agregar nuevas entradas al **final** de cada sección
- Una entrada por cambio lógico
- Sin punto al final de las entradas
- No usar verbos redundantes — el encabezado de sección ya indica la acción
- Enlazar PRs cuando estén disponibles: `[(#1)](https://github.com/org/repo/pull/1)`

---

## Ejemplo de CHANGELOG.md

```markdown
# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.
Formato basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versionado semántico según [SemVer](https://semver.org/).

---

## [Sin publicar]

### 🚀 Added
- Auditoría Lighthouse con correcciones de accesibilidad

---

## [3.1.0] - 2026-04-15

### 🚀 Added
- Carga dinámica de tarjetas desde `data/site-data.json` con Fetch API [(#4)](https://github.com/org/repo/pull/4)
- Persistencia del tema oscuro con localStorage [(#4)](https://github.com/org/repo/pull/4)

---

## [3.0.0] - 2026-04-08

### 🚀 Added
- Integración de JavaScript con archivo `scripts/main.js`
- Toggle de tema claro/oscuro con persistencia
- Validación del formulario de contacto con mensajes de feedback

---

## [2.1.0] - 2026-03-25

### 🚀 Added
- Media queries para breakpoints móvil (360px) y tablet (768px)

### 🔄 Changed
- Galería rediseñada con CSS Grid de 3 columnas

---

## [2.0.0] - 2026-03-18

### 🚀 Added
- Hoja de estilos externa `/css/styles.css`
- Layout del header con Flexbox
- Sección de tarjetas con Flexbox y flex-wrap
- Galería con CSS Grid

---

## [1.0.0] - 2026-03-04

### 🚀 Added
- Estructura HTML semántica del sitio (header, main, footer)
- Navegación con anclas internas
- Sección de servicios con lista y tabla
- Imágenes con atributo alt
- Formulario de contacto con validación HTML5
- Repositorio GitHub con README inicial
```

---

## Agregar una entrada — paso a paso

1. **Ver qué cambió:**
```bash
git log main...HEAD --oneline
git diff main...HEAD --name-only
```

2. **Determinar el tipo de cambio** (Added / Changed / Fixed).

3. **Calcular el nuevo número de versión** según la tabla de semver.

4. **Agregar la nueva sección** al inicio del archivo (después de `[Sin publicar]` si existe).

5. **Hacer commit del changelog:**
```bash
git add CHANGELOG.md
git commit -m "docs: actualizar CHANGELOG para v3.1.0"
```

---

## Las versiones entregadas son inmutables

```markdown
## [3.0.0] - 2026-04-08   ← ENTREGADO EN EE3 — NO MODIFICAR

## [Sin publicar]          ← Agregar nuevas entradas AQUÍ
```

---

## Comandos

```bash
# Ver historial para redactar entradas
git log main...HEAD --oneline

# Ver el estado actual del changelog
head -50 CHANGELOG.md

# Obtener la URL del repo para enlaces de PR
git remote get-url origin
```
