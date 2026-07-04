# Evidencia de Calidad — EE4 — Lucky Air

Requerido por el **Entregable 3** de EE4: mínimo 3 hallazgos corregidos, describiendo qué se corrigió, dónde y cómo verificarlo.

---

## Hallazgo 1 — Script de terceros bloqueando el render y sin versión fijada

**Categoría Lighthouse:** Performance / Best Practices

**Dónde:** `<script src="https://unpkg.com/lucide@latest">` en el `<head>` de `index.html`, `community/community.html`, `students/students.html` y `self-service/self-service.html`.

**Problema:** El script se cargaba de forma síncrona antes del `<body>`, bloqueando el parseo del HTML (render-blocking). Además, `@latest` no fija una versión: un release nuevo de la librería Lucide podría cambiar sin aviso y romper los íconos en producción sin que el equipo lo note.

**Corrección aplicada:** Se agregó el atributo `defer` y se fijó la versión real vigente en el registro de unpkg (`lucide@1.23.0`, verificada contra `unpkg.com/lucide/package.json`), en los 4 archivos.

```diff
- <script src="https://unpkg.com/lucide@latest"></script>
+ <script src="https://unpkg.com/lucide@1.23.0" defer></script>
```

**Cómo verificar:**
1. Abrir cualquiera de las 4 páginas y ver el `<head>` en DevTools → Elements.
2. Confirmar que el `<script>` tiene `defer` y una versión numérica explícita (no `@latest`).
3. En DevTools → Network, el script de Lucide ya no aparece en la ruta crítica de renderizado (columna *Priority*/*waterfall* antes del primer pintado).

---

## Hallazgo 2 — Imágenes sin `height` explícito (riesgo de Cumulative Layout Shift)

**Categoría Lighthouse:** Performance (Core Web Vitals — CLS)

**Dónde:** 6 elementos `<img>` en `corporate/corporate.html` (íconos de beneficios y logos de clientes, líneas ~64–79 y ~112–117).

**Problema:** Los `<img>` declaraban `width` pero no `height`. El navegador no puede reservar el espacio del elemento antes de que la imagen cargue, así que el contenido de alrededor "salta" (layout shift) cuando la imagen termina de descargar.

**Corrección aplicada:** Se agregó `height` explícito a cada imagen, verificando primero su proporción real:
- Los 4 íconos SVG (`cost.svg`, `control.svg`, `time.svg`, `report.svg`) son cuadrados 1:1 (`viewBox="0 0 512 512"`, verificado abriendo el SVG) → `height="25px"` igual al `width` existente.
- Los 2 logos (`client1.webp`, `client2.webp`) son 100×100 px reales (verificado leyendo las dimensiones del archivo) → `height="100px"`.

```diff
- <img src="assets/cost.svg" alt="Ahorro de costos" width="25px" />
+ <img src="assets/cost.svg" alt="Ahorro de costos" width="25px" height="25px" />

- <img src="../assets/images/client1.webp" alt="Globaltech" width="100px"/>
+ <img src="../assets/images/client1.webp" alt="Globaltech" width="100px" height="100px"/>
```

**Cómo verificar:**
1. Abrir `views/corporate.html` (o `corporate/corporate.html`) con la pestaña Network en modo "Slow 3G" (DevTools → Network → throttling).
2. Recargar y observar que el espacio de cada ícono/logo ya está reservado antes de que la imagen cargue (no hay salto del texto de alrededor).
3. Alternativa: correr Lighthouse (pestaña Lighthouse de DevTools) y confirmar que la auditoría "Image elements have explicit width and height" pasa en verde.

---

## Hallazgo 3 — Enlace interno que abre pestaña nueva innecesariamente

**Categoría Lighthouse:** Best Practices / UX

**Dónde:** `self-service/self-service.html`, formulario de reembolsos, enlace a la política de reembolsos (`#faq`).

**Problema:** El enlace apuntaba a un ancla dentro de la misma página (`#faq`) pero tenía `target="_blank"`, así que en vez de bajar el scroll a la sección de preguntas frecuentes, abría una pestaña nueva idéntica a la actual — un bug de navegación real, no solo un detalle cosmético.

**Corrección aplicada:** Se eliminó `target="_blank"` para que el ancla navegue dentro de la misma página, como corresponde a un enlace interno.

```diff
- <a href="#faq" target="_blank">política de reembolsos de Lucky Air</a>.
+ <a href="#faq">política de reembolsos de Lucky Air</a>.
```

**Cómo verificar:**
1. Ir a "Autoservicio" → sección de reembolsos.
2. Hacer click en "política de reembolsos de Lucky Air".
3. La misma pestaña debe desplazarse (scroll) hacia la sección `#faq`, sin abrir una pestaña nueva.

---

## Captura de auditoría Lighthouse (pendiente de equipo)

Los 3 hallazgos anteriores fueron identificados mediante revisión manual del código (equivalente a lo que reportaría DevTools → Lighthouse en las categorías Performance y Best Practices). Para completar la evidencia con el score real:

1. Abrir el sitio publicado en Chrome: `https://ucal-systems-engineering-1st.github.io/yunnan-lucky-air/`
2. DevTools (F12) → pestaña **Lighthouse** → categorías Performance, Accessibility, Best Practices, SEO → **Analyze page load**.
3. Pegar aquí la captura de pantalla con el score obtenido (antes/después si es posible).

<!-- TODO equipo: pegar captura de Lighthouse aquí antes de la entrega -->
