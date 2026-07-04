# Guía de Presentación EE4 — Lucky Air

**Proyecto:** Yunnan Lucky Air — Plataforma de Reserva de Vuelos y Paquetes Turísticos
**Versión:** v3.4.0
**Duración total:** 15 minutos (10 demo + 5 preguntas)
**Integrantes:** Ivan, Rachel, Alessandro, Geraldo

---

## 1. Objetivo del sitio y arquitectura (2.5 minutos)

**Responsable:** Ivan
**Objetivo:** Explicar qué problema resuelve el sitio y cómo está organizado.

### Archivos a abrir
- Explorador de archivos con la raíz del repositorio
- `shared/constants.js` (completo)
- `index.html` (encabezado, líneas 1–20)

### Qué explicar

"Lucky Air atiende cuatro perfiles distintos — viajero general, empresa, estudiante, autoservicio — sin cuatro sitios separados. Usamos Screaming Architecture: cada dominio de negocio tiene su propia carpeta con HTML, CSS y JS. Si necesitas el formulario corporativo, vas a `corporate/corporate.js`. Sin sorpresas escondidas."

Señala `shared/constants.js` y explica que centraliza las tres URLs (`API_BASE_URL`, `ENTERPRISE_URL`, `DATA_URL`) que usan todos los módulos — un cambio de servidor se hace en un solo lugar.

---

## 2. Flujo GitHub y versionado (2 minutos)

**Responsable:** Ivan
**Objetivo:** Mostrar el historial de GitFlow y cómo se corrigió la calidad sin romper el flujo.

### Comandos a ejecutar en terminal

```bash
git log --oneline --graph --decorate -20
git tag
git branch -a
```

### Qué explicar

"22 tags publicados desde v1.0.0 hasta v3.4.0, más de 15 Pull Requests mergeados. Cada release nace de una rama `release/vX.Y.Z` que se mergea a `main` — el nombre de la rama define la versión que publica `release.yml` automáticamente. Para EE4, los 3 hallazgos de calidad se corrigieron como commits `fix` puntuales sobre el mismo flujo: no abrimos una arquitectura nueva, corregimos problemas reales en código ya integrado."

---

## 3. Demo — Evidencia de calidad: los 3 hallazgos (3.5 minutos)

**Duración:** ~1 minuto por hallazgo
**Archivo de referencia:** `docs/quality.md`

### Hallazgo 1 — Script bloqueante sin versión fija (Geraldo)

Abre el inspector (F12) → pestaña **Elements** en `index.html` y busca el `<script>` de Lucide en el `<head>`.

```diff
- <script src="https://unpkg.com/lucide@latest"></script>
+ <script src="https://unpkg.com/lucide@1.23.0" defer></script>
```

"Sin `defer`, el navegador detenía el parseo del HTML para descargar el script antes de seguir — eso es render-blocking. Y `@latest` significa que un release nuevo de Lucide podría romper los íconos sin aviso. Verificamos la versión real en el registro de unpkg antes de fijarla."

Repetir la misma explicación es válida para `community.html`, `students.html` y `self-service.html` — los 4 archivos tenían el mismo problema.

### Hallazgo 2 — Imágenes sin `height` (Ivan)

Abre `corporate/corporate.html` en el inspector y busca los `<img>` de la sección "Beneficios para tu empresa".

```diff
- <img src="assets/cost.svg" alt="Ahorro de costos" width="25px" />
+ <img src="assets/cost.svg" alt="Ahorro de costos" width="25px" height="25px" />
```

"Sin `height`, el navegador no reserva el espacio antes de que la imagen cargue y el contenido de alrededor salta — eso es Cumulative Layout Shift, una métrica de Core Web Vitals. Verificamos que los íconos SVG son cuadrados 1:1 antes de agregar el valor, no lo adivinamos."

### Hallazgo 3 — Enlace que abre pestaña nueva (Rachel)

Ve a "Autoservicio" → sección de reembolsos, haz click en "política de reembolsos de Lucky Air".

"Antes abría una pestaña nueva idéntica en vez de bajar el scroll a la sección de preguntas frecuentes, porque tenía `target=\"_blank\"` en un ancla interna (`#faq`). Lo quitamos y ahora navega dentro de la misma página, como corresponde."

---

## 4. Demo — Despliegue en GitHub Pages (1.5 minutos)

**Responsable:** Alessandro
**Archivo:** `.github/workflows/release.yml`, sitio publicado

Abre https://ucal-systems-engineering-1st.github.io/yunnan-lucky-air/ y navega por las 5 secciones desde el header (Inicio, Autoservicio, Comunidad, Estudiantes, Corporativo) más Login/Registro.

Abre DevTools → **Console** (sin errores en rojo) y **Network** (petición a `site-data.json` con status 200).

"El despliegue es automático: al mergear una rama `release/*` a `main`, el pipeline publica la nueva versión, actualiza el CHANGELOG y crea el GitHub Release. Lo que ven aquí es exactamente lo que corre en producción."

---

## 5. Cierre — Conclusiones (0.5 minutos por persona)

Cada integrante cierra con una frase sobre su aporte (ver `docs/EE4-exposicion.md`, sección "Conclusiones").

---

## 6. Preguntas Frecuentes del Docente y Respuestas

### Pregunta 1: ¿Por qué `defer` y no `async` en el script de Lucide?

**Respuesta (Geraldo):** "`async` ejecuta el script apenas termina de descargar, sin garantizar orden ni esperar al DOM. `defer` espera a que el HTML termine de parsearse y respeta el orden de los scripts. Como Lucide necesita que los elementos `<i data-lucide>` ya existan en el DOM para reemplazarlos por SVG, `defer` es la opción correcta."

### Pregunta 2: ¿Qué es Cumulative Layout Shift y por qué importa?

**Respuesta (Ivan):** "Es una de las tres métricas de Core Web Vitals que mide Lighthouse. Mide cuánto se mueve el contenido visible mientras la página carga. Si una imagen no tiene `width` y `height` declarados, el navegador no sabe cuánto espacio reservarle y el texto de alrededor salta cuando la imagen termina de descargar — una mala experiencia, sobre todo en conexiones lentas."

### Pregunta 3: ¿Cómo verificaron que los íconos SVG eran realmente cuadrados antes de agregar `height`?

**Respuesta (Ivan):** "Abrimos el archivo SVG y miramos su atributo `viewBox`. Los 4 íconos tienen `viewBox=\"0 0 512 512\"`, que es 512×512 — proporción 1:1. Para los logos webp verificamos las dimensiones reales del archivo. No adivinamos ningún valor."

### Pregunta 4: ¿Por qué no corrieron Lighthouse directamente en vez de revisar el código a mano?

**Respuesta (Rachel):** "Los 3 hallazgos que corregimos son justamente los que Lighthouse marca en sus categorías Performance y Best Practices, así que la revisión manual del código llega al mismo resultado. Dejamos en `docs/quality.md` la instrucción para que el equipo corra Lighthouse real en Chrome sobre el sitio publicado y agregue la captura con el score antes de la entrega final."

### Pregunta 5: ¿Por qué el enlace `#faq` tenía `target=\"_blank\"` si apunta a la misma página?

**Respuesta (Rachel):** "Fue un descuido al copiar el patrón de otros enlaces externos del formulario. `target=\"_blank\"` tiene sentido para un enlace que sale del sitio, pero no para un ancla interna — ahí solo genera una pestaña duplicada en vez de mover el scroll."

### Pregunta 6: ¿Cómo se aseguran de que la próxima persona no reintroduzca `@latest` en un script nuevo?

**Respuesta (Geraldo):** "Por ahora es una convención documentada en `docs/quality.md`. No tenemos un lint automatizado que lo bloquee — sería una mejora futura agregar una regla a `ci.yml` que rechace URLs de CDN con `@latest`."

---

## 7. Orden Sugerido para la Demo

1. **Objetivo y arquitectura (Ivan, 2.5 min):** estructura del repo, `shared/constants.js`.
2. **Flujo GitHub (Ivan, 2 min):** `git log`, `git tag`, `git branch -a`.
3. **Hallazgo 1 — script bloqueante (Geraldo, 1 min):** inspector en `index.html`.
4. **Hallazgo 2 — imágenes sin height (Ivan, 1 min):** inspector en `corporate.html`.
5. **Hallazgo 3 — target=_blank (Rachel, 1 min):** click en el enlace de reembolsos.
6. **Despliegue (Alessandro, 1.5 min):** sitio publicado, Network tab.
7. **Conclusiones (todos, 2 min):** una frase cada uno.
8. **Preguntas del docente (todos, 5 min).**

---

## 8. Checklist Antes de Presentar

- [ ] Conexión a internet estable para acceder a https://ucal-systems-engineering-1st.github.io/yunnan-lucky-air/
- [ ] Navegador con DevTools habilitado (F12)
- [ ] Terminal lista para mostrar `git log`, `git tag`, `git branch -a`
- [ ] Pruebas rápidas antes de presentar:
  - [ ] Abrir `index.html` y confirmar que el `<script>` de Lucide tiene `defer` y versión fija
  - [ ] Abrir `corporate.html` y confirmar `height` en los 6 `<img>`
  - [ ] Click en el enlace de reembolsos en self-service y confirmar que navega en la misma pestaña
  - [ ] Revisar Network tab del sitio publicado — `site-data.json` con status 200
- [ ] Captura real de Lighthouse pegada en `docs/quality.md`
- [ ] Cada integrante conoce su bloque y puede responder preguntas específicas

---

**Fin de Guía de Presentación**
