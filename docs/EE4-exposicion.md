# Lucky Air — Exposición EE4
### Fundamentos de Desarrollo Frontend · UCAL Perú · v3.4.0 (Integración, Calidad y Despliegue)

---

## Introducción general

EE4 es la evaluación final del ciclo y no agrega una vista nueva: integra todo lo construido en EE1-EE3 (HTML semántico, CSS con Screaming Architecture, JavaScript con DOM/validación/localStorage/Fetch) y le suma tres cosas que antes no existían — evidencia de calidad con hallazgos corregidos, verificación de despliegue sin errores, y documentación técnica al día. El sitio sigue siendo Lucky Air, la aerolínea que conecta destinos en Yunnan, China, con cinco secciones de negocio (`corporate/`, `self-service/`, `community/`, `students/`) más `auth/` para login y registro, todo servido estáticamente desde GitHub Pages.

---

## Ivan — Objetivo del sitio y arquitectura

**Archivos:** estructura completa del repositorio, `index.html`, `shared/constants.js`

Lucky Air resuelve un problema de negocio real: una aerolínea regional necesita atender cuatro perfiles de cliente distintos (viajero general, empresa, estudiante, viajero que ya reservó) sin construir cuatro sitios separados. La solución fue un sitio de una sola aplicación con **Screaming Architecture**: cada dominio de negocio vive en su propia carpeta con su HTML, CSS y JS — `corporate/corporate.js` para empresas, `self-service/self-service.js` para autoservicio, `community/community.js` para la comunidad de viajeros, `students/students.js` para grupos universitarios. El nombre de cada carpeta dice exactamente qué hace, sin sorpresas escondidas.

`shared/constants.js` centraliza las URLs que usan todos los módulos (`API_BASE_URL`, `ENTERPRISE_URL`, `DATA_URL`), así que un cambio de servidor se hace en un solo lugar y se propaga automáticamente. Esto no es un detalle menor para la rúbrica: es justo lo que la capacidad "Arquitectura de Software y Patrones de Diseño" evalúa — componentes con responsabilidades separadas y decisiones justificadas, no una carpeta con todo mezclado.

**Demo:** mostrar la estructura de carpetas en el explorador de archivos o en `git log --stat` de la migración (commit `77d870c refactor(arch): mover archivos a estructura screaming architecture por dominio`), y abrir `shared/constants.js` para señalar las tres constantes exportadas.

---

## Ivan — Flujo GitHub y versionado

**Comandos:** `git log --oneline --graph --decorate -20`, `git tag`, `git branch -a`

El equipo trabaja con **GitFlow**: cada integrante desarrolla en su rama `feat/*`, abre un Pull Request hacia `develop`, y al cerrar cada entregable se crea una rama `release/vX.Y.Z` que se mergea a `main` — el nombre de la rama define la versión que publica automáticamente `release.yml`. El proyecto lleva 22 tags publicados desde `v1.0.0` hasta `v3.4.0`, y más de 15 Pull Requests mergeados a lo largo del ciclo.

Para EE4 en particular, el trabajo de calidad se apoyó en tres commits puntuales de corrección (`fix`) sobre el mismo flujo: no se abrió una arquitectura nueva, se corrigieron problemas reales encontrados en el código ya integrado. Eso es evidencia de control de versiones aplicado a mantenimiento, no solo a features nuevas — exactamente lo que pide la capacidad "Dominio de Plataformas y Herramientas (Control de Versiones)" de la rúbrica.

**Demo:** correr `git log --oneline --graph --decorate -20` y señalar los merges de PR, luego `git tag` para mostrar la progresión de versiones desde v1.0.0 hasta v3.4.0.

---

## Evidencia de calidad — hallazgos corregidos

> Detalle completo con diffs en [docs/quality.md](quality.md).

### Geraldo — Hallazgo 1: script de terceros bloqueando el render

El ícono de Lucide se cargaba en 4 páginas (`index.html`, `community/community.html`, `students/students.html`, `self-service/self-service.html`) con `<script src="https://unpkg.com/lucide@latest">`, sin `defer` y sin versión fijada. Sin `defer`, el navegador detiene el parseo del HTML para descargar y ejecutar el script antes de seguir construyendo la página — eso es exactamente lo que Lighthouse marca como "render-blocking resource". Y `@latest` significa que si Lucide publica una versión nueva mañana, nuestro sitio la carga automáticamente sin que nadie lo revise: puede romper los íconos en producción sin aviso.

La corrección fue agregar `defer` y fijar la versión real vigente (`lucide@1.23.0`, verificada contra el registro de unpkg antes de escribirla, no adivinada) en los 4 archivos.

### Ivan — Hallazgo 2: imágenes sin dimensiones explícitas

En `corporate/corporate.html` hay 6 `<img>` (4 íconos de beneficios y 2 logos de empresas clientes) que declaraban `width` pero no `height`. Sin ambas dimensiones, el navegador no puede reservar el espacio del elemento antes de que la imagen termine de cargar, así que el contenido de alrededor salta — eso es Cumulative Layout Shift, una de las tres métricas de Core Web Vitals que mide Lighthouse. Antes de corregirlo verifiqué las proporciones reales: los 4 SVG de íconos son cuadrados 1:1 (`viewBox="0 0 512 512"`), y los 2 logos webp son 100×100 px reales. Con esa base agregué el `height` correcto a cada uno, en vez de adivinar un valor.

### Rachel — Hallazgo 3: enlace interno que abre pestaña nueva

En el formulario de reembolsos de `self-service/self-service.html`, el enlace a "política de reembolsos de Lucky Air" apuntaba a `#faq` — un ancla dentro de la misma página — pero tenía `target="_blank"`. En vez de bajar el scroll a la sección de preguntas frecuentes, abría una pestaña nueva idéntica a la actual. Es un bug de navegación real, no cosmético: quité el `target="_blank"` para que el enlace se comporte como corresponde a un ancla interna.

**Síntesis de calidad:** los tres hallazgos se identificaron con revisión manual del código (equivalente a lo que reportaría Lighthouse en Performance y Best Practices) y se corrigieron con diffs mínimos y verificables. Queda pendiente que el equipo corra Lighthouse real en Chrome sobre el sitio publicado y pegue la captura en `docs/quality.md` antes de la entrega final.

---

## Alessandro — Despliegue en GitHub Pages

**Archivo:** `.github/workflows/release.yml`, sitio publicado

El sitio está desplegado en `https://ucal-systems-engineering-1st.github.io/yunnan-lucky-air/` y se actualiza automáticamente cuando se mergea una rama `release/*` a `main` — el pipeline calcula la versión desde el nombre de la rama, actualiza el `CHANGELOG.md` y crea el GitHub Release. Como GitHub Pages sirve los archivos sobre HTTPS, el `fetch()` a `data/site-data.json` funciona directo ahí, sin necesidad de un servidor local (algo que sí hace falta si alguien quiere probar el sitio abriendo `index.html` con doble click, porque `file://` no permite `fetch`).

Verificamos que la navegación entre las 6 vistas (home, corporativo, autoservicio, comunidad, estudiantes, login/registro) no tiene enlaces rotos, y que la consola no muestra errores en el flujo normal de uso.

**Demo:** abrir el sitio publicado, navegar por las 5 secciones desde el header, abrir DevTools → Network y mostrar la petición a `site-data.json` con status 200.

---

## Conclusiones (todos)

- **Geraldo:** "La arquitectura por dominio nos permitió que cada uno trabajara su sección sin pisarse, y facilitó encontrar y corregir el hallazgo del script bloqueante porque sabíamos exactamente en qué 4 archivos buscar."
- **Ivan:** "El flujo GitFlow que usamos desde EE1 se mantuvo intacto en EE4 — corregir errores de calidad no rompió el proceso de branches y PRs que ya teníamos."
- **Rachel:** "Encontrar el bug del `target=\"_blank\"` nos recordó que la validación de calidad no es solo performance, también es UX: un enlace que se comporta distinto a lo esperado es un defecto real."
- **Alessandro:** "El despliegue automático a GitHub Pages nos dio la confianza de que lo que mostramos en la demo es exactamente lo que corre en producción, sin pasos manuales que se nos puedan olvidar."

---

*Ivan · Rachel · Alessandro · Geraldo*
*github.com/ucal-systems-engineering-1st/yunnan-lucky-air*
