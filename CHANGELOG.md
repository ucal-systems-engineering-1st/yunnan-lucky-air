# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.
Formato basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versionado semántico según [SemVer](https://semver.org/).

---

## [4.0.1] - 2026-07-04

### 🐞 Fixed

- eliminar entrada [4.0.0] duplicada generada por release.yml

---

## [4.0.0] - 2026-07-04

### 🚀 Added

- evidencia de calidad EE4 (`docs/quality.md`) con 3 hallazgos corregidos y verificables
- guión de exposición y guía de presentación EE4 (`docs/EE4-exposicion.md`, `docs/EE4-presentacion-guia.md`)

### 🐞 Fixed

- fijar `lucide@1.23.0` con `defer` en 4 páginas (antes `@latest` sin `defer`, bloqueaba el render)
- agregar `height` explícito a 6 imágenes de `corporate.html` sin dimensiones (riesgo de CLS)
- quitar `target="_blank"` de un enlace interno (`#faq`) en `self-service.html`
- corregir bug preexistente en `ci.yml`: `grep -lq` nunca detectaba `localStorage`/`fetch`/`preventDefault`
- agregar segundo breakpoint responsive (`480px`) en `corporate.css`, que solo tenía uno

### 📝 Docs

- README actualizado: estructura real, funcionalidades EE3 completas, entregables EE4, enlaces corregidos

---

## [3.4.0] - 2026-06-13

### 🚀 Added

- validación manual de nombre y actualización de URL de backend en el registro corporativo (Ivan)

### 🐞 Fixed

- interceptar submit de `checkin-form` en self-service para evitar error 405 en GitHub Pages
- quitar `novalidate` de `checkin-form` para activar la validación nativa del navegador
- agregar `index.js` al paso de copia de `deploy.yml` (faltaba en el despliegue)
- limpiar `console.log` de depuración en `index.js`

---

## [3.3.0] - 2026-06-03

### 📝 Docs

- agregar guía visual de dónde ver cada cambio en el sitio publicado

---

## [3.2.0] - 2026-06-03

### 🚀 Added

- migración completa a Screaming Architecture por dominio de negocio (`corporate/`, `self-service/`, `community/`, `students/`, `shared/`)
- implementar JavaScript EE3 completo — DOM, validación, localStorage y Fetch en los 4 dominios
- separar `main.js` (menú global) de `index.js` (interacciones propias del home)
- adaptar CI (`ci.yml`) y CODEOWNERS a la nueva estructura por dominio

### 🐞 Fixed

- corregir ruta de import de `shared/constants.js` en `corporate.js`

### 📝 Docs

- documentación técnica completa de EE3 con rutas reales, funciones, elementos HTML, eventos y localStorage
- actualizar README y AGENTS.md para EE3 — asignación de ramas y estructura JS

---

## [3.1.0] - 2026-05-28

### 🚀 Added

- agregar ejercicios DOM — tarjeta seleccionable, vista previa de vuelo y beneficio desplegable

---

## [3.0.1] - 2026-05-21

### 🐞 Fixed

- mover main.js de js/ a scripts/ para corregir 404 en GitHub Pages

---

## [3.0.0] - 2026-05-21

### 🚀 Added

- conectar main.js con defer y verificar con console.log
- implement responsive header component with navigation, actions, and mobile menu styles

---

## [2.4.1] - 2026-05-16

### 🔄 Changed

- Maintenance and internal improvements

---

## [2.4.1] - 2026-05-16

### 🔧 Fixed

- include missing Rachel's features from develop: self-service portal, students and community views, responsive header navigation
- ensure main.js is properly loaded in all HTML files for mobile hamburger menu functionality

---

## [2.4.0] - 2026-05-16

### 🚀 Added

- implement self-service portal page with layout styles and service forms
- add students and community views along with necessary component styles
- implement responsive header navigation with mobile toggle functionality

---

## [2.3.1] - 2026-05-16

### 🐞 Fixed

- ref style table rates and routes

---

## [2.3.0] - 2026-05-07

### 🚀 Added

- homogenizar header y footer en todas las páginas

---

## [2.2.0] - 2026-05-07

### 🚀 Added

- agregar theme-color corporativo a todas las vistas
- implement self-service page with layout components, forms, and global styles
- implementar vistas corporate, login y register con estilos responsivos y modales
- implementar página Community con CSS EE2

### 🔄 Changed

- mover community.css a css/views/ para unificar convención

### 🐞 Fixed

- fixed student page apply

---

## [2.1.0] - 2026-05-02

### 🚀 Added

- refactorizar estilos Home al diseño Figma
- alinear contenido Home al diseño Figma

---

## [2.0.0] - 2026-04-30

### 🚀 Added

- add Flexbox layout to hero, cards, features and reviews sections

### 🐞 Fixed

- use CSS Grid on hamburger toggle to satisfy EE2 CI check
- replace Flexbox with CSS Grid on card grids to meet EE2 requirements

---

## [1.5.0] - 2026-04-25

### 🚀 Added

- add footer component styling with responsive grid and social links
- redesign site footer with global design tokens and Lucide icons
- initialize global CSS framework with design tokens and base styles
- upload design md
- initialize project directory structure and add footer component stylesheet

### 🔄 Changed

- add header styles apply

---

## [1.4.0] - 2026-04-18

### 🐞 Fixed

- change png to webp
- missing main in index.html

---

## [1.3.0] - 2026-04-11

### 🚀 Added

- add GitHub Pages deployment workflow

---

## [1.2.3] - 2026-04-11

### 🐞 Fixed

- replace blank destination images with actual photos

---

## [1.2.2] - 2026-04-11

### 🐞 Fixed

- add contact form with type=email to satisfy EE1 CI check

---

## [1.2.1] - 2026-04-11

### 🐞 Fixed

- correct broken image paths, add login/register pages and labels

---

## [1.2.0] - 2026-04-11

### 🚀 Added

- add self-service page with check-in, flight status, and baggage policy sections
- implementar sección corporativa con hero, beneficios y formulario
- add complete community.html structure with sections, tabla and form - EE1 guideline

---

## [] - 2026-04-11

### 🚀 Added

- add self-service page with check-in, flight status, and baggage policy sections
- add complete community.html structure with sections, tabla and form - EE1 guideline
- add complete EE1 page structure
- add routes and fares table section
- add branch ownership validation and CODEOWNERS
- initialize project structure with core HTML pages, assets, and documentation

### 🐞 Fixed

- add language identifiers to all code fences
- include LICENSE file in release zip package

---

## [1.1.0] - 2026-03-30

### 🚀 Added

- add complete EE1 page structure

---

## [1.0.0] - 2026-03-30

### 🚀 Added

- add routes and fares table section
- add branch ownership validation and CODEOWNERS
- initialize project structure with core HTML pages, assets, and documentation

### 🐞 Fixed

- add language identifiers to all code fences
- include LICENSE file in release zip package

---