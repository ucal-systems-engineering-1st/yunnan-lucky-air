# Lucky Air – Portal E-commerce

Proyecto web para la aerolínea **Lucky Air**, enfocado en la venta de vuelos a destinos de la provincia de Yunnan, China (Dali, Xishuangbanna, Kunming). Desarrollado como parte del curso **Fundamentos de Frontend – UCAL**.

---

## Estructura del proyecto

```
LUCKY-AIR-ECOMMERCE/
├── assets/
│   ├── images/        # Imágenes de destinos (Yunnan, Dali, Xishuangbanna)
│   ├── icons/         # Íconos de estrellas y puntuación para reseñas
│   └── docs/          # Guías de destinos en PDF descargables
├── css/
│   ├── layouts/       # Estilos del portal de autoservicio y estructura general
│   ├── components/    # Estilos de botones, cards y chatbot
│   └── themes/        # Paleta de colores y tipografía de marca Lucky Air
├── js/
│   ├── auth/          # Lógica de inicio de sesión para miembros de lealtad
│   ├── booking/       # Motor de búsqueda y reserva de vuelos
│   ├── community/     # Lógica para blogs y comentarios de usuarios
│   └── payment/       # Integración segura de pagos (Alipay / PayPal)
├── views/
│   ├── corporate.html     # Herramientas de viaje para PYMES y control de gastos
│   ├── students.html      # Ofertas y paquetes grupales para jóvenes estudiantes
│   ├── self-service.html  # Check-in, validación de ticket y reembolsos
│   └── community.html     # Muro de experiencias y reseñas de viajeros
├── index.html         # Home page con motor de búsqueda y enfoque en conversión
└── README.md          # Este archivo
```

---

## Páginas disponibles

| Archivo                     | Descripción                                                    |
|-----------------------------|----------------------------------------------------------------|
| `index.html`                | Página principal con buscador de vuelos, destinos y reseñas   |
| `views/corporate.html`      | Portal corporativo: planes, herramientas PYME y registro       |
| `views/students.html`       | Ofertas estudiantiles, paquetes grupales y registro de jóvenes |
| `views/self-service.html`   | Check-in, validación de ticket, reembolsos y guías PDF         |
| `views/community.html`      | Muro de experiencias, blogs y formulario para compartir viajes |

---

## Segmentos de usuario

- **Viajero general**: Usa `index.html` para buscar y reservar vuelos.
- **Corporativo (PYMES)**: Accede a `views/corporate.html` para gestión de gastos y planes empresariales.
- **Estudiantes**: Encuentra descuentos y paquetes grupales en `views/students.html`.
- **Autoservicio**: Gestiona reservas, reembolsos y check-in en `views/self-service.html`.
- **Comunidad**: Comparte y lee experiencias de viaje en `views/community.html`.

---

## Tecnologías utilizadas

- **HTML5** semántico (estructura principal del proyecto)
- **CSS3** – organizado por capas: `themes`, `layouts`, `components` *(pendiente)*
- **JavaScript** – organizado por módulos: `auth`, `booking`, `community`, `payment` *(pendiente)*

---

## Estado del proyecto

| Componente        | Estado      |
|-------------------|-------------|
| Estructura HTML   | ✅ Completa |
| Estilos CSS       | 🔜 Pendiente |
| Lógica JavaScript | 🔜 Pendiente |
| Integración de pagos | 🔜 Pendiente |

---

## Criterios de diseño

- Enfoque en **conversión**: el buscador de vuelos es el elemento central de la home page.
- **Accesibilidad**: uso de `aria-label`, `role`, `aria-live` y estructura semántica en todos los formularios.
- **IDs únicos** en todos los elementos interactivos para facilitar testing.
- **Rutas relativas** consistentes entre `index.html` y las vistas en `/views/`.

---

## Cómo puedes colaborar

¡Las contribuciones son bienvenidas! Sigue los pasos a continuación para agregar mejoras al proyecto sin romper el trabajo de los demás.

### Requisitos previos

- Tener [Git](https://git-scm.com/) instalado.
- Haber hecho **fork** del repositorio o tener acceso de colaborador.

### Pasos para contribuir

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/yunnan-lucky-air.git
   cd yunnan-lucky-air
   ```

2. **Crea una rama para tu tarea** a partir de `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/nombre-de-tu-tarea
   ```

3. **Realiza tus cambios** en la rama recién creada.

4. **Haz commit** con un mensaje descriptivo:
   ```bash
   git add .
   git commit -m "feat: descripción breve del cambio"
   ```

5. **Sube tu rama** al repositorio remoto:
   ```bash
   git push origin feature/nombre-de-tu-tarea
   ```

6. **Abre un Pull Request** hacia `develop` en GitHub y espera la revisión del equipo.

---

## Flujo de ramas (GitHub Flow)

El proyecto usa el siguiente esquema de ramas:

```
main
 └── develop
      ├── feature/html-index
      ├── feature/vista-corporate
      ├── feature/vista-students
      ├── feature/vista-self-service
      ├── feature/vista-community
      ├── feature/estilos-css
      ├── feature/logica-booking
      └── hotfix/descripcion-del-error
```

| Rama | Propósito |
|------|-----------|
| `main` | Código estable y listo para producción |
| `develop` | Integración continua del equipo; base para nuevas features |
| `feature/*` | Desarrollo de una funcionalidad o vista específica |
| `hotfix/*` | Corrección urgente de un error en `main` |

### Convención de nombres de ramas

| Prefijo | Cuándo usarlo | Ejemplo |
|---------|---------------|---------|
| `feature/` | Nueva página, sección o funcionalidad | `feature/vista-corporate` |
| `fix/` | Corrección de un bug no urgente | `fix/formulario-reembolso` |
| `hotfix/` | Bug crítico en producción (`main`) | `hotfix/menu-navegacion` |
| `chore/` | Tareas de mantenimiento o configuración | `chore/actualizar-readme` |

### Convención de mensajes de commit

Usa el formato `tipo: descripción corta en minúsculas`:

| Tipo | Uso |
|------|-----|
| `feat` | Nueva funcionalidad o vista |
| `fix` | Corrección de error |
| `style` | Cambios de estilo (CSS) sin lógica |
| `docs` | Actualización de documentación |
| `refactor` | Reorganización de código sin cambiar funcionalidad |

**Ejemplo:**
```bash
git commit -m "feat: agregar formulario de registro estudiantil"
git commit -m "fix: corregir enlace roto en self-service.html"
git commit -m "docs: actualizar README con flujo de ramas"
```

---

## Equipo

Proyecto académico – **UCAL / Fundamentos de Frontend**  
Aerolínea: Lucky Air ✈️ · Enfoque geográfico: Yunnan, China
