# **Lineamientos de la Evidencia Evaluativa 3: Versión 3.0 del Sitio Web (JavaScript \+ DOM \+ Datos)**

## **1\. Propósito:**

El propósito de esta evidencia será contribuir al desarrollo de la(s) capacidad(es) que se presentan en la siguiente tabla.

| Capacidad | Descripción |
| :---- | :---- |
| **Dominio de plataformas y herramientas** | Construye fragmentos de código funcionales utilizando un lenguaje de programación, aplicando estructuras básicas y siguiendo ejemplos o guías. Aplica comandos básicos de control de versiones bajo supervisión, utilizando un repositorio en la nube para almacenar y actualizar su propio código. |
| **Pruebas y depuración de software** | Ejecuta pruebas unitarias estandarizadas sobre componentes del software, siguiendo instrucciones y guías predefinidas para verificar su funcionamiento básico. |
| **Arquitectura de software y patrones de diseño** | Diseña la estructura general del software a partir de los requerimientos técnicos y funcionales, organizando los componentes principales. |

## **2\. Descripción de la evidencia evaluativa:**

Elaborarás y entregarás, de manera grupal (hasta 5 integrantes), la versión 3.0 del sitio web, incorporando como mínimo:

**a. Integración de JavaScript en el proyecto**

* Archivo(s) JavaScript enlazado(s) correctamente (por ejemplo: /scripts/main.js).
* Uso de consola para verificación básica y depuración inicial.

**b. Interacciones con DOM y eventos (mínimo 2\)**

* Al menos dos funcionalidades que respondan a acciones del usuario (por ejemplo: toggle de tema, mostrar/ocultar sección, tabs, menú responsive, filtrado básico, etc.).
* Manipulación de contenido o clases mediante DOM (textContent, classList, etc.).

**c. Validación de formulario con retroalimentación**

* Interceptar el envío (submit) y validar campos con reglas básicas.
* Mostrar mensajes claros (error/éxito) que orienten al usuario.

**d. Persistencia con localStorage (mínimo 1 caso)**

* Guardar y recuperar una preferencia/estado del usuario (por ejemplo: tema, nombre, última selección, borrador simple).

**e. Consumo de datos con Fetch \+ render dinámico**

* Obtener datos desde un JSON local (recomendado: /data/site-data.json) o un endpoint permitido.
* Renderizar dinámicamente contenido (cards/lista) en una sección del sitio.
* Manejo básico de error o estado (mensaje alternativo / "cargando...").

**f. Evidencia de evolución en GitHub**

* Repositorio actualizado con commits verificables que demuestren los hitos de v3.0 (DOM/eventos, validación, storage, fetch/render).
* README actualizado con resumen de funcionalidades y cómo probarlas.

El sitio web deberá atender específicamente las necesidades del caso de estudio de alcance internacional proporcionado.

*Recuerda que esta evidencia tiene un valor del 25% de la nota final.*

## **3\. Indicaciones de los entregables:**

**Entregable 1 \- Link del repositorio GitHub (obligatorio)**

El repositorio debe incluir:

* Carpeta /scripts con el/los archivos JS.
* Si aplica, carpeta /data con el JSON utilizado en Fetch.
* Evidencia de:
  * 2 interacciones con DOM/eventos,
  * validación del formulario con feedback,
  * localStorage implementado,
  * Fetch \+ render dinámico funcionando.
* Historial de commits que evidencie avances (recomendación: mínimo 4 commits significativos durante semanas 9-12, idealmente uno por hito).
* README con:
  * "Funcionalidades v3.0" (lista breve),
  * "Cómo probar" (pasos claros para validar cada funcionalidad),
  * si usan JSON local: indicar ruta y finalidad de los datos.

*En EE3 no es requisito usar branches o pull requests; la evidencia principal es la trazabilidad con commits y el repositorio actualizado.*

**Entregable 2 \- Evidencia funcional del sitio (obligatorio)**

El equipo entrega una de estas dos opciones:

* **Opción A (recomendada):** link del sitio publicado en GitHub Pages (si está habilitado).
* **Opción B:** instrucciones en README para ejecutar localmente (abrir index.html) y cómo verificar funcionalidades con DevTools (Consola y Application/Storage).

## **4\. Indicaciones sobre exposición:**

La exposición será grupal (hasta 5 integrantes) y se realizará en la semana 12\.

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

* **MDN \- JavaScript Guide:** [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
* **MDN \- DOM (Introduction to the DOM):** [https://developer.mozilla.org/en-US/docs/Web/API/Document\_Object\_Model/Introduction](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
* **MDN \- addEventListener:** [https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
* **MDN \- Client-side form validation:** [https://developer.mozilla.org/en-US/docs/Learn/Forms/Form\_validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
* **MDN \- Web Storage API (localStorage):** [https://developer.mozilla.org/en-US/docs/Web/API/Web\_Storage\_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
* **MDN \- Fetch API:** [https://developer.mozilla.org/en-US/docs/Web/API/Fetch\_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
* **Chrome DevTools \- Console:** [https://developer.chrome.com/docs/devtools/console/](https://developer.chrome.com/docs/devtools/console/)
* **Chrome DevTools \- Storage (Application panel):** [https://developer.chrome.com/docs/devtools/storage/](https://developer.chrome.com/docs/devtools/storage/)
