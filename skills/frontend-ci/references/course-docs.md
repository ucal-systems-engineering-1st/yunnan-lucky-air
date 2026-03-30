# Referencias: frontend-ci

## Fuentes del curso

- **Lineamientos EE4** — Requisitos de ramas, PR, despliegue y documentación:
  [`docs/lineamientos/lineamientos-ee4.md`](../../../docs/lineamientos/lineamientos-ee4.md)

- **Rúbrica EE4** — Capacidades evaluadas (Dominio de plataformas × 5 niveles):
  [`docs/rubrica/rubrica-ee4.md`](../../../docs/rubrica/rubrica-ee4.md)

- **Sílabo completo** (UA4, semanas 13–16):
  [`docs/silabo-fundamentos-de-desarrollo-frontend.md`](../../../docs/silabo-fundamentos-de-desarrollo-frontend.md)

## Archivos de configuración CI/CD

| Archivo | Propósito |
|---------|-----------|
| [`.github/workflows/ci.yml`](../../../.github/workflows/ci.yml) | Validación CI: requisitos del sitio (EE1–EE4) + seguridad de ramas |
| [`.github/workflows/release.yml`](../../../.github/workflows/release.yml) | Pipeline de release: versionado, CHANGELOG, GitHub Release |

## Recursos externos

- **softprops/action-gh-release**: https://github.com/softprops/action-gh-release
- **Conventional Commits spec**: https://www.conventionalcommits.org/en/v1.0.0/
- **Semantic Versioning**: https://semver.org/
- **Keep a Changelog**: https://keepachangelog.com/
