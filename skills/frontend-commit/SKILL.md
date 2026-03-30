---
name: frontend-commit
description: >
  Conventional commits adaptados para el curso Fundamentos de Desarrollo Frontend
  (UCAL 2026-1). Scopes específicos para HTML, CSS, JavaScript, assets, docs y config.
  Trigger: Al crear un commit, escribir un mensaje de commit o revisar el historial de Git.
license: MIT
metadata:
  author: ucal-frontend
  version: "1.0.0"
---

## Reglas críticas

- SIEMPRE usar formato conventional commits: `tipo(scope): descripción`
- SIEMPRE mantener la primera línea por debajo de 72 caracteres
- SIEMPRE presentar el mensaje propuesto al usuario antes de ejecutar el commit
- NUNCA usar `git push --force` o `git push -f`
- NUNCA hacer commit sin confirmación del usuario
- NUNCA hacer commits automáticos de forma proactiva — esperar solicitud explícita

---

## Formato del commit

```text
tipo(scope): descripción concisa

- Cambio clave 1
- Cambio clave 2
```

### Tipos

| Tipo | Cuándo usar |
|------|-------------|
| `feat` | Nueva funcionalidad, sección, componente o interacción |
| `fix` | Corrección de un error funcional, enlace roto o bug visual |
| `docs` | Cambios en README.md, comentarios o documentación |
| `chore` | Configuración, limpieza de archivos, reorganización de carpetas |
| `refactor` | Reestructuración de código sin cambiar el comportamiento |
| `style` | Solo formato — sin cambio de lógica ni comportamiento |

### Scopes

| Scope | Cuándo usar |
|-------|-------------|
| `html` | Cambios en archivos `.html`, estructura, semántica |
| `css` | Cambios en `/css/styles.css` u hojas de estilo |
| `js` | Cambios en `/scripts/*.js` |
| `assets` | Imágenes, fuentes, íconos en `/assets/` |
| `data` | Archivos JSON en `/data/` |
| `docs` | README.md, documentación del proyecto |
| `config` | `.gitignore`, configuración del proyecto |
| *(omitir)* | Cambios que afectan múltiples scopes simultáneamente |

---

## Ejemplos buenos vs malos

```bash
# BUENOS — concisos y claros
feat(html): agregar sección de servicios con lista y tabla
fix(css): corregir scroll horizontal en móvil
feat(js): implementar validación del formulario de contacto
docs: actualizar README con instrucciones de navegación
chore: organizar carpeta assets por tipo de recurso

# MALOS — demasiado específicos o demasiado vagos
feat(html): agregar sección de servicios con lista de 5 ítems y tabla 3x4
fix: fix
feat: cambios
```

---

## Árbol de decisión

```text
¿Solo cambió un archivo?
├─ Sí → Solo título (omitir cuerpo con bullets)
└─ No → Incluir bullets con cambios clave

¿Afecta múltiples scopes?
├─ Sí → Omitir scope: `feat: descripción`
└─ No → Incluir scope: `feat(html): descripción`

¿Es un error funcional?
├─ Visible para el usuario → fix(scope): descripción
└─ Interno / limpieza      → chore(scope): descripción

¿Es solo documentación?
├─ Solo README/docs    → docs: o docs(scope):
└─ Comentarios de código → parte del feat o fix
```

---

## Flujo de trabajo

1. **Revisar qué cambió**
```bash
git status
git diff --stat HEAD
git log -3 --oneline   # ver estilo de commits recientes
```

2. **Redactar el mensaje** — elegir tipo y scope, escribir un título conciso, agregar 2–4 bullets si hay múltiples cambios.

3. **Presentar al usuario** — mostrar archivos a commitear y mensaje propuesto. Esperar confirmación.

4. **Ejecutar**
```bash
git add <archivos>
git commit -m "$(cat <<'EOF'
feat(html): agregar formulario de contacto con validación HTML5

- Implementar campos nombre, correo y mensaje con labels
- Agregar atributos required y type=email
- Verificar funcionamiento en Chrome y Firefox
EOF
)"
```

---

## Hitos de commit recomendados por EE

| EE | Hito sugerido | Ejemplo de commit |
|----|--------------|-------------------|
| EE1 | Estructura base | `feat(html): crear estructura base del sitio con secciones` |
| EE1 | Navegación | `feat(html): agregar menú de navegación con anclas internas` |
| EE1 | Multimedia | `feat(html): agregar imágenes, lista y tabla en sección principal` |
| EE1 | Formulario | `feat(html): implementar formulario de contacto con validación HTML5` |
| EE2 | CSS base | `feat(css): agregar estilos base de tipografía, color y espaciado` |
| EE2 | Flexbox | `feat(css): implementar layout Flexbox en header y sección de tarjetas` |
| EE2 | Grid | `feat(css): agregar galería con CSS Grid` |
| EE2 | Responsive | `feat(css): implementar media queries para móvil y tablet` |
| EE3 | DOM/eventos | `feat(js): agregar toggle de tema e interacciones del menú móvil` |
| EE3 | Validación | `feat(js): implementar validación del formulario con feedback` |
| EE3 | localStorage | `feat(js): persistir preferencia de tema con localStorage` |
| EE3 | Fetch/render | `feat(js): cargar tarjetas dinámicamente desde site-data.json` |
