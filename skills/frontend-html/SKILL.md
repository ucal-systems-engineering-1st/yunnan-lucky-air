---
name: frontend-html
description: >
  Reglas de HTML semántico, estructura, formularios y validación HTML5 para el curso
  Fundamentos de Desarrollo Frontend (UCAL 2026-1). Incluye requisitos mínimos de EE1
  y criterios de la rúbrica.
  Trigger: Al escribir o editar HTML, estructura del sitio, navegación, formularios o multimedia.
license: MIT
metadata:
  author: ucal-frontend
  version: "1.0.0"
---

## Cuándo usar

- Al crear o editar cualquier archivo `.html`
- Al definir la estructura de las secciones del sitio
- Al implementar navegación, formularios o contenido multimedia
- Al revisar la calidad del HTML del proyecto (EE1, EE2, EE3, EE4)

---

## Patrones críticos

### 1. Estructura mínima del documento

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nombre del sitio</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <!-- contenido -->
  <script src="scripts/main.js" defer></script>
</body>
</html>
```

### 2. Elementos semánticos requeridos

```html
<header>        <!-- encabezado del sitio -->
  <nav>         <!-- menú de navegación -->
    <ul>
      <li><a href="#inicio">Inicio</a></li>
      <li><a href="#servicios">Servicios</a></li>
      <li><a href="#contacto">Contacto</a></li>
    </ul>
  </nav>
</header>

<main>
  <section id="inicio">...</section>
  <section id="servicios">...</section>
</main>

<footer>...</footer>
```

### 3. Navegación — reglas críticas

- SIEMPRE usar anclas internas (`href="#id"`) para secciones del mismo documento
- SIEMPRE verificar que existan los atributos `id` de destino
- SIEMPRE verificar que los enlaces externos abran correctamente (sin 404)
- NUNCA dejar enlaces rotos

### 4. Multimedia y contenido estructurado (mínimos EE1)

```html
<!-- Imagen: SIEMPRE con alt descriptivo -->
<img src="assets/img/foto.jpg" alt="Descripción clara de la imagen">

<!-- Lista: mínimo 5 ítems -->
<ul>
  <li>Ítem 1</li>
  <li>Ítem 2</li>
  <li>Ítem 3</li>
  <li>Ítem 4</li>
  <li>Ítem 5</li>
</ul>

<!-- Tabla: mínimo 3 columnas × 4 filas -->
<table>
  <thead>
    <tr>
      <th>Col 1</th><th>Col 2</th><th>Col 3</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>...</td><td>...</td><td>...</td></tr>
    <tr><td>...</td><td>...</td><td>...</td></tr>
    <tr><td>...</td><td>...</td><td>...</td></tr>
  </tbody>
</table>
```

### 5. Formulario de contacto (mínimo EE1)

```html
<form id="contact-form" novalidate>

  <label for="nombre">Nombre completo</label>
  <input type="text" id="nombre" name="nombre" required>

  <label for="email">Correo electrónico</label>
  <input type="email" id="email" name="email" required>

  <label for="mensaje">Mensaje</label>
  <textarea id="mensaje" name="mensaje" required></textarea>

  <button type="submit">Enviar</button>

</form>
```

- SIEMPRE relacionar `<label for="x">` con `<input id="x">`
- SIEMPRE usar `type="email"` para el campo de correo
- SIEMPRE usar `required` en los campos obligatorios
- NUNCA omitir el atributo `name` en los campos del formulario

---

## Referencia de rúbrica (EE1)

| Criterio | Sobresaliente (5) | Aprobado (3) |
|----------|------------------|--------------|
| **Implementación HTML** | Sitio completo, semántica consistente, navegación funcional, multimedia+lista+tabla, formulario con validación HTML5 | Sitio parcialmente funcional, contenido mínimo, errores menores que no impiden el uso |
| **Repositorio GitHub** | Commits frecuentes y claros por hito, README completo, trazabilidad sin supervisión | Commits escasos pero suficientes para verificar el avance general |
| **Verificación funcional** | Verifica sistemáticamente en distintos escenarios, corrige oportunamente, sitio estable | Pruebas básicas con apoyo, errores menores sin resolver |
| **Estructura y organización** | Jerarquía clara, ids/clases iniciales, archivos organizados consistentemente | Estructura básica con secciones principales, organización parcialmente consistente |

---

## Aplicabilidad por EE

| EE | Aplica | Notas |
|----|--------|-------|
| EE1 | ✅ Base | Requisitos mínimos de HTML — evaluado en semana 4 |
| EE2 | ✅ Persiste | El HTML de v1.0 se mantiene y puede refinarse |
| EE3 | ✅ Persiste | Se agregan atributos `id` para manipulación con JS |
| EE4 | ✅ Persiste | Accesibilidad: `alt`, `label`, encabezados, enlaces descriptivos |

---

## Comandos

```bash
# Validar HTML con W3C (online)
# https://validator.w3.org/ — pegar URL de GitHub Pages o subir archivo

# Abrir DevTools para revisar estructura
# F12 → Elements → verificar jerarquía semántica

# Hacer commit de cambios HTML
git add index.html
git commit -m "feat(html): agregar sección de servicios con lista y tabla"
```

---

## Recursos

- **Lineamientos EE1**: Ver [`lineamientos-ee1.md`](../../docs/lineamientos/lineamientos-ee1.md)
- **Rúbrica EE1**: Ver [`rubrica-ee1.md`](../../docs/rubrica/rubrica-ee1.md)
- **Sílabo**: Ver [`silabo-fundamentos-de-desarrollo-frontend.md`](../../docs/silabo-fundamentos-de-desarrollo-frontend.md)
