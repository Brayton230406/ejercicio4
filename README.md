# Laboratorio web · Servicio asíncrono

Simulador de una consulta de usuario, diseñado primero para celulares. Conserva el ejemplo de promesas y async/await, con estados de espera, éxito y error y protección ante solicitudes duplicadas.

## Desarrollo

Requiere Node.js 24 y npm.

```sh
npm ci
npm start
```

Abre http://127.0.0.1:42871. También puedes abrir index.html directamente.

## Verificación

```sh
npm run check
npm audit --audit-level=high
npm run build
npx playwright install chromium webkit
npm test
```

Playwright comprueba Chromium de escritorio, Android emulado y WebKit con iPhone emulado: éxito, error, recuperación, teclado, accesibilidad con axe, ausencia de solicitudes externas y anchos entre 320 y 1440 px. La emulación no sustituye probar dispositivos físicos. `npm run format` aplica el formato del proyecto.

## Publicación y mantenimiento

El flujo de GitHub Actions verifica calidad, dependencias y CodeQL antes de desplegar `dist` en GitHub Pages. En Settings → Pages, la fuente debe ser GitHub Actions. La URL prevista es https://brayton230406.github.io/ejercicio4/.

Los pull requests ejecutan comprobaciones sin desplegar. Dependabot propone actualizaciones semanales y una ejecución programada revisa el proyecto cada lunes. Las acciones están fijadas a commits. La aplicación publicada no incluye dependencias de terceros.

Revisa las ejecuciones en Actions y los hallazgos de CodeQL en Security. Para revertir una versión, revierte su commit mediante un nuevo commit y deja que el flujo vuelva a publicar. Configura las reglas de protección de main para exigir los controles quality y security, según las opciones disponibles en tu cuenta. No se afirma que existan reglas activas por el mero hecho de incluir este archivo.

Consulta SECURITY.md para el alcance y los límites de los controles de seguridad.
