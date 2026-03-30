# **Lineamientos de la Evidencia Evaluativa 4: Integración, Calidad y Despliegue de un Proyecto Front-End**

## **1\. Propósito:**

El propósito de la evaluación final es que demuestres las capacidades que desarrollaste durante el ciclo. Cada una presenta el nivel de desempeño esperado y te servirá de guía para elaborar tu evidencia evaluativa de manera óptima.

* **DOMINIO DE PLATAFORMAS Y HERRAMIENTAS (Desarrollo):** Implementa aplicaciones utilizando lenguajes de programación y frameworks adecuados, según los requerimientos del proyecto.
* **DOMINIO DE PLATAFORMAS Y HERRAMIENTAS (Control de versiones):** Gestiona eficientemente el código y la colaboración del equipo en entornos de cloud computing, configurando herramientas de control de versiones y entornos de desarrollo integrados.
* **PRUEBAS Y DEPURACIÓN DE SOFTWARE:** Ejecuta pruebas unitarias y de integración, diseñadas o estandarizadas, para verificar el cumplimiento de los requerimientos funcionales del software.
* **ARQUITECTURA DE SOFTWARE Y PATRONES DE DISEÑO:** Diseña la estructura y componentes del software considerando requerimientos técnicos, de negocio y criterios de escalabilidad.

## **2\. Descripción de la evidencia evaluativa:**

Elaborarás y entregarás, de manera grupal (hasta 5 integrantes), la versión final (v4.0) de un sitio web iniciado y evolucionado durante el ciclo, incorporando:

* Integración final del proyecto (HTML/CSS/JS) con funcionalidades completas y estables.
* Organización y mantenibilidad del código (estructura de carpetas, reutilización/modularización básica).
* Flujo colaborativo en GitHub (branches \+ pull requests \+ merge).
* Calidad y accesibilidad (mejoras verificables con auditoría tipo Lighthouse/DevTools).
* Despliegue del sitio (GitHub Pages) y documentación técnica (README).

El sitio web deberá estar diseñado para atender específicamente las necesidades del caso de estudio de alcance internacional que trabajaste a lo largo del ciclo.

*Importante (seguimiento): en las semanas 4, 8 y 12 el equipo presentará avances obligatorios (se detallarán en lineamientos específicos). Estos avances son requisito de continuidad para llegar a la evaluación final de la semana 16\.*

*Recuerda que esta evidencia tiene un valor del 35% de la nota final.*

## **3\. Indicaciones del/los entregable(s):**

El equipo entregará enlaces y evidencias (no archivos comprimidos), según lo siguiente:

**Entregable 1 \- Repositorio final en GitHub (obligatorio)**

Debe incluir como mínimo:

1. **Repositorio público o privado** (según política del curso) con:
   * index.html y páginas/secciones del sitio.
   * carpetas organizadas: /css, /scripts, /assets, /data (si aplica).
2. **Evidencia de flujo colaborativo:**
   * mínimo 1 branch por funcionalidad y mínimo 1 Pull Request mergeado a main.
   * evidencia de contribución por integrante (commits/PRs).
3. **README técnico con:**
   * descripción del proyecto y objetivo del sitio,
   * funcionalidades principales (por UA1-UA4),
   * instrucciones para probar (incluyendo requisitos si aplica),
   * enlaces a: repositorio, sitio publicado y PR(s) principales.

*Forma de entrega: link del repositorio en el Aula virtual en la semana 16\.*

**Entregable 2 \- Sitio publicado (GitHub Pages) (obligatorio)**

Debe evidenciar:

* navegación completa y sin enlaces rotos,
* diseño responsive,
* funcionalidades JavaScript (eventos, validación, persistencia y consumo de datos) operativas,
* contenido renderizado correctamente (incluye la sección dinámica con Fetch/JSON si aplica).

*Forma de entrega: link del sitio publicado (GitHub Pages) en el Aula virtual.*

**Entregable 3 \- Evidencia de calidad (obligatorio)**

Debe incluir en el README (o en un archivo /docs/quality.md):

* resultados de auditoría (ej.: Lighthouse/DevTools) con capturas o registro.
* mínimo 3 hallazgos corregidos, describiendo:
  * qué se corrigió,
  * dónde (archivo/sección),
  * cómo verificarlo.

*Forma de entrega: link directo a la sección del README o documento en el repo.*

## **4\. Indicaciones sobre exposición (si corresponde):**

La exposición será grupal (hasta 5 integrantes) y se realizará en la semana 16\.

* **Duración total:** máximo 15 minutos
  *
    1. 10 minutos: demo del sitio (recorrido \+ prueba de funcionalidades)
  *
    2. 5 minutos: preguntas del docente y retroalimentación
* **Participación obligatoria:** cada integrante debe intervenir (mínimo 1 minuto) y señalar su aporte (PR/branch/commits o componente trabajado).
* **Apoyo visual:** Canva o PPT (máximo 8 diapositivas) con:
  1. objetivo del sitio,
  2. estructura/arquitectura del proyecto,
  3. flujo GitHub (branches/PR),
  4. calidad (hallazgos y correcciones),
  5. despliegue (Pages),
  6. conclusiones.

## **5\. Recursos o materiales:**

Deberás revisar y/o utilizar los siguientes recursos para elaborar tu evidencia:

* **MDN Web Docs \- JavaScript modules:** [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
* **GitHub Docs \- About branches:** [https://docs.github.com/articles/about-branches](https://docs.github.com/articles/about-branches)
* **GitHub Docs \- About pull requests:** [https://docs.github.com/articles/about-pull-requests](https://docs.github.com/articles/about-pull-requests)
* **Chrome for Developers \- Lighthouse overview:** [https://developer.chrome.com/docs/lighthouse/overview](https://developer.chrome.com/docs/lighthouse/overview)
* **MDN Web Docs \- Web Accessibility:** [https://developer.mozilla.org/en-US/docs/Web/Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
* **GitHub Docs \- GitHub Pages troubleshooting:** [https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages)

## **6\. Matriz de evaluación de capacidades (solo aplica para EE4)**

| Siglas de la evaluación | Dominio de Plataformas y Herramientas | Dominio de Plataformas y Herramientas | Pruebas y Depuración de Software | Arquitectura de Software y Patrones de Diseño |
| :---- | :---- | :---- | :---- | :---- |
| **EE4 \- Repositorio final (GitHub) \+ PR(s)** | Esta capacidad será evaluada mediante la implementación funcional del sitio y la integración estable de funcionalidades. | Esta capacidad será evaluada mediante el uso de control de versiones y evidencia de contribución por integrante. | Esta capacidad será evaluada mediante verificación funcional (pruebas de interacción, validación y corrección de fallos evidenciables en commits). | Esta capacidad será evaluada mediante la organización del proyecto (estructura de carpetas, reutilización/modularización y separación de responsabilidades). |
| **EE4 \- Sitio publicado (GitHub Pages)** | Esta capacidad será evaluada mediante el correcto funcionamiento del sitio desplegado y la experiencia completa. | Esta capacidad será evaluada mediante la consistencia entre lo publicado y el repositorio. | Esta capacidad será evaluada mediante la estabilidad del producto en ejecución (sin errores visibles en consola en flujo normal y con manejo básico de fallos). | Esta capacidad será evaluada mediante la coherencia de la arquitectura para despliegue (rutas correctas, assets organizados, dependencias claras). |
| **EE4 \- Evidencia de calidad (Lighthouse/Accesibilidad) \+ Documentación** | Esta capacidad será evaluada mediante la mejora visible del producto a nivel de UI/UX básica, consistencia y correcciones aplicadas. | Esta capacidad será evaluada mediante la documentación trazable de cambios. | Esta capacidad será evaluada mediante la identificación y corrección de hallazgos, y la explicación de cómo verificar cada corrección. | Esta capacidad será evaluada mediante la documentación técnica del proyecto y justificación de decisiones de organización y mejoras. |

