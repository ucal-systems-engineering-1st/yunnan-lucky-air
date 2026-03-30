---
name: frontend-pr
description: >
  Plantilla y convenciones de Pull Request para el curso Fundamentos de Desarrollo Frontend
  (UCAL 2026-1). Checklist alineado con rúbricas de EE4. Requerido desde EE4 en adelante.
  Trigger: Al crear un Pull Request, completar la plantilla del PR o revisar un PR.
license: MIT
metadata:
  author: ucal-frontend
  version: "1.0.0"
---

## Reglas críticas

- El título del PR DEBE seguir el formato de conventional commits
- SIEMPRE completar todas las secciones de la plantilla antes de abrir el PR
- SIEMPRE verificar que `main` esté actualizado antes de abrir el PR
- Los PRs son **obligatorios en EE4** — mínimo 1 PR mergeado por integrante del equipo
- NUNCA mergear un PR con el sitio roto o errores visibles en consola

---

## Proceso de creación del PR

1. **Verificar estado** — `git log main..HEAD --oneline` para ver los commits incluidos
2. **Asegurarse de que la rama esté actualizada** con `main`
3. **Completar la plantilla** — todas las secciones
4. **Crear el PR** con `gh pr create`
5. **Verificar el sitio** en GitHub Pages después del merge

---

## Plantilla del PR

```markdown
### Contexto

{¿Por qué se hace este cambio? ¿Qué problema resuelve o qué funcionalidad agrega?}

### Descripción

{Resumen de los cambios realizados. Mencionar qué versión del sitio representa.}

- **Versión**: v{X.Y.Z}
- **EE**: EE{N} — {nombre del entregable}
- **Integrante**: {nombre del autor}

### Pasos para revisar

{Instrucciones para que el docente o compañeros prueben los cambios:}

1. Abrir el sitio en GitHub Pages: {link}
2. Navegar a la sección {nombre}
3. Probar {funcionalidad específica}
4. Verificar en móvil con DevTools (Ctrl+Shift+M)

### Checklist

- [ ] HTML válido (sin errores críticos del W3C Validator)
- [ ] Sitio responsive — sin scroll horizontal en móvil
- [ ] Sin errores en la consola del navegador (F12 → Console)
- [ ] Los enlaces de navegación funcionan correctamente
- [ ] El formulario valida y muestra mensajes de feedback
- [ ] localStorage funciona (si aplica)
- [ ] Fetch carga datos correctamente (si aplica)
- [ ] README actualizado con las nuevas funcionalidades
- [ ] Sitio publicado y verificado en GitHub Pages
```

---

## Convenciones de título

Seguir conventional commits:

```
feat: nueva sección de galería con CSS Grid
fix: corregir validación del campo email
docs: actualizar README con instrucciones de despliegue
chore: reorganizar carpeta assets por tipo
style: ajustar tipografía y espaciado del header
refactor: extraer función de render a helpers.js
```

---

## Antes de crear el PR

```bash
# 1. Ver qué commits incluye el PR
git log main..HEAD --oneline

# 2. Ver el diff completo
git diff main...HEAD

# 3. Verificar que la rama esté actualizada con main
git fetch origin
git status
```

---

## Comandos

```bash
# ── PR de feature o fix → develop (flujo diario) ────────────────
gh pr create \
  --title "feat: implementar validación JS del formulario de contacto" \
  --body "$(cat <<'EOF'
### Contexto

Implementar validación del formulario con JavaScript para EE3.

### Descripción

- **EE**: EE3 — JavaScript + DOM + Datos
- **Integrante**: Geraldo

### Pasos para revisar

1. Abrir el sitio en GitHub Pages
2. Ir a la sección de Contacto
3. Intentar enviar el formulario vacío — debe mostrar error
4. Completar todos los campos — debe mostrar mensaje de éxito

### Checklist

- [x] HTML válido
- [x] Sitio responsive
- [x] Sin errores en consola
- [x] Formulario valida correctamente
- [x] README actualizado
EOF
)" \
  --base develop

# ── PR de release → main (cierre de EE) ─────────────────────────
gh pr create \
  --title "chore: release v2.0.0" \
  --base main \
  --head release/v2.0.0

# ── PR de hotfix → main (emergencia en producción) ───────────────
gh pr create \
  --title "fix: menú roto en móvil — hotfix" \
  --base main \
  --head hotfix/fix-menu-movil

# ── Crear PR borrador (para revisión previa) ─────────────────────
gh pr create --draft --title "feat: galería CSS Grid" --base develop

# Ver PRs abiertos
gh pr list

# Mergear PR (cuando está aprobado)
gh pr merge <número> --merge
```

---

## Recursos

- **Lineamientos EE4**: Ver [`lineamientos-ee4.md`](../../docs/lineamientos/lineamientos-ee4.md)
- **Rúbrica EE4**: Ver [`rubrica-ee4.md`](../../docs/rubrica/rubrica-ee4.md)
- **Sílabo (UA4, semanas 13–16)**: Ver [`silabo-fundamentos-de-desarrollo-frontend.md`](../../docs/silabo-fundamentos-de-desarrollo-frontend.md)
