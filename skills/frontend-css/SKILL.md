---
name: frontend-css
description: >
  Reglas de CSS externo, Flexbox, Grid, media queries y diseño responsive para el curso
  Fundamentos de Desarrollo Frontend (UCAL 2026-1). Incluye requisitos mínimos de EE2
  y criterios de la rúbrica.
  Trigger: Al escribir o editar CSS, implementar Flexbox/Grid o trabajar con diseño responsive.
license: MIT
metadata:
  author: ucal-frontend
  version: "1.0.0"
---

## Cuándo usar

- Al crear o editar cualquier archivo `.css`
- Al implementar layout con Flexbox o CSS Grid
- Al agregar media queries o trabajar con diseño responsive
- Al verificar la visualización en DevTools (modo responsive)
- Al revisar la calidad visual del proyecto (EE2, EE3, EE4)

---

## Patrones críticos

### 1. Hoja de estilos externa — enlace requerido

```html
<!-- En <head> — SIEMPRE externo, NUNCA estilos inline para layout -->
<link rel="stylesheet" href="css/styles.css">
```

```
css/
└── styles.css   ← archivo base de estilos
```

### 2. Estilos base del sitio

```css
/* Reset mínimo */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Tipografía y legibilidad */
body {
  font-family: 'Segoe UI', Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
}

/* Variables de color (recomendado) */
:root {
  --color-primary: #2563eb;
  --color-bg: #f9fafb;
  --color-text: #1f2937;
}
```

### 3. Flexbox — layout 1D (header + tarjetas)

```css
/* Header / navbar */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

nav ul {
  display: flex;
  gap: 1.5rem;
  list-style: none;
}

/* Sección de tarjetas/cards */
.cards-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

.card {
  flex: 1 1 280px;   /* crece, encoge, base mínima */
  max-width: 340px;
}
```

- SIEMPRE usar `gap` en lugar de `margin` entre items flex
- SIEMPRE incluir `flex-wrap: wrap` en secciones de tarjetas
- NUNCA usar `float` para layout — usar Flexbox o Grid

### 4. CSS Grid — layout 2D (galería / sección destacada)

```css
/* Galería o grilla de contenido */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

/* Grid fijo de 3 columnas */
.featured {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
}
```

### 5. Responsive — media queries (mínimo 2 breakpoints)

```css
/* Mobile first: estilos base para móvil */

/* Tablet — 768px */
@media (min-width: 768px) {
  .cards-grid {
    justify-content: flex-start;
  }
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop — 1024px */
@media (min-width: 1024px) {
  .gallery {
    grid-template-columns: repeat(3, 1fr);
  }
  nav ul {
    gap: 2rem;
  }
}
```

- SIEMPRE verificar en DevTools que no haya scroll horizontal innecesario
- SIEMPRE probar en breakpoints: 360px (móvil), 768px (tablet), 1280px (desktop)
- NUNCA usar anchos fijos en píxeles para contenedores principales

---

## Referencia de rúbrica (EE2)

| Criterio | Sobresaliente (5) | Aprobado (3) |
|----------|------------------|--------------|
| **Implementación CSS/Layout** | Sistema visual consistente (tipografía, colores, espaciados), Flexbox y Grid correctos en secciones clave, interfaz ordenada sin afectar navegación | Estilos básicos y layout con Flexbox o Grid parcialmente aplicado, inconsistencias moderadas pero presentación aceptable |
| **Repositorio GitHub** | Commits por hito (css-base, Flexbox, Grid, responsive), README actualizado con evidencia | Commits escasos pero suficientes para verificar progreso a v2.0 |
| **Verificación responsive** | Verifica sistemáticamente en múltiples resoluciones, corrige quiebres, sin scroll horizontal, consistencia visual | Pruebas guiadas con DevTools, corrige problemas básicos para funcionalidad aceptable |
| **Organización CSS** | CSS por secciones/componentes, clases consistentes y reutilizables, duplicación mínima | Organización básica con duplicación moderada, permite mantener el sitio con esfuerzo razonable |

---

## Aplicabilidad por EE

| EE | Aplica | Notas |
|----|--------|-------|
| EE1 | ❌ | No hay CSS en v1.0 |
| EE2 | ✅ Base | CSS + Flexbox + Grid + Responsive — evaluado en semana 8 |
| EE3 | ✅ Persiste | Los estilos se mantienen; JS puede agregar/quitar clases |
| EE4 | ✅ Persiste | Lighthouse revisará Performance y accesibilidad visual |

---

## Comandos

```bash
# Verificar responsive en DevTools
# F12 → Toggle Device Toolbar (Ctrl+Shift+M)
# Probar en: 360px, 768px, 1280px

# Detectar scroll horizontal
# DevTools → Console → document.documentElement.scrollWidth > window.innerWidth

# Hacer commit de cambios CSS
git add css/styles.css
git commit -m "feat(css): implementar layout Flexbox en header y sección de tarjetas"

git add css/styles.css
git commit -m "feat(css): agregar media queries para móvil y tablet"
```

---

## Recursos

- **Lineamientos EE2**: Ver [`lineamientos-ee2.md`](../../docs/lineamientos/lineamientos-ee2.md)
- **Rúbrica EE2**: Ver [`rubrica-ee2.md`](../../docs/rubrica/rubrica-ee2.md)
- **Sílabo (UA2, semanas 5–8)**: Ver [`silabo-fundamentos-de-desarrollo-frontend.md`](../../docs/silabo-fundamentos-de-desarrollo-frontend.md)
