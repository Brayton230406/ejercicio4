# Seguridad

Para reportar una vulnerabilidad, utiliza la opción privada «Report a vulnerability» de la pestaña Security del repositorio si está habilitada. No publiques credenciales ni datos sensibles en issues.

La aplicación es una simulación: no requiere claves, servicios externos ni almacenamiento personal. Usa `textContent` para presentar respuestas y una política CSP que restringe los recursos al propio sitio. Las dependencias son herramientas de desarrollo y se revisan con npm audit y Dependabot.

GitHub Actions ejecuta CodeQL y pruebas antes del despliegue, con permisos limitados y acciones fijadas a commits. CodeQL publica hallazgos; su ejecución correcta no implica ausencia de vulnerabilidades. Las alertas deben revisarse en Security. Las pruebas automáticas de accesibilidad no equivalen a una certificación WCAG.

GitHub Pages no permite configurar todos los encabezados HTTP desde estos archivos: la CSP se declara en HTML. Para requisitos como frame-ancestors mediante encabezados se necesita un alojamiento que permita configurarlos.
