# Fondos originales por área

Cada archivo MP4 es una ilustración original inspirada en las referencias visuales aportadas. Los objetos principales conservan su posición; la animación se concentra en iluminación, conexiones y detalles decorativos. Las escenas no contienen nombres, marcas, interfaces reales ni datos de clientes.

- Salida: 1920 × 1080, 24 fps, 12 segundos, H.264/AVC, sin audio.
- Bucle periódico de 12 segundos, con variación sinusoidal suave y sin duplicar el último fotograma.
- Archivo preparado para empezar a reproducirse antes de completar la descarga (fast start).
- Cada MP4 tiene una imagen `-poster.webp` para carga inicial, movimiento reducido y ahorro de datos.
- Las formas se renderizan directamente a la resolución de salida; no se amplían las imágenes de referencia.
- Los parámetros, pesos y comprobaciones del bucle quedan registrados en `parameters.json` y en el JSON de cada área.

## Ejemplo HTML y CSS

Rutas del ejemplo relativas a la raíz del portafolio. Cambiar `ciberseguridad` por cualquier clave disponible en `parameters.json`.

```html
<section class="section-with-film">
  <video class="section-film" aria-hidden="true" tabindex="-1"
    autoplay muted loop playsinline preload="none"
    poster="assets/media/area-backgrounds/ciberseguridad-poster.webp"
    data-src="assets/media/area-backgrounds/ciberseguridad.mp4">
  </video>
  <div class="section-content">
    <h2>Ciberseguridad</h2>
    <p>El contenido de la sección permanece en HTML.</p>
  </div>
</section>
```

```css
.section-with-film { position: relative; isolation: isolate; background: #111819; }
.section-film {
  position: absolute; inset: 0; width: 100%; height: 100%;
  object-fit: contain; pointer-events: none; z-index: -1;
}
.section-content {
  min-height: 340px; padding: clamp(24px, 5vw, 72px);
  color: #e8eeea;
  background: linear-gradient(90deg, #111819f2, #11181966);
}
```

## Carga diferida y reproducción

El atributo `loading="lazy"` por sí solo no es una solución general para video. Se deja el MP4 en `data-src`, con `preload="none"`, y se asigna `src` al aproximarse la sección al área visible.

```js
const video = document.querySelector('.section-film');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let visible = false;
async function sync() {
  const allowed = visible && !document.hidden && !reduced.matches
    && !navigator.connection?.saveData;
  if (!allowed) { video.pause(); return; }
  if (!video.hasAttribute('src')) {
    video.src = video.dataset.src;
    video.load();
  }
  try { await video.play(); } catch { /* Se conserva el poster. */ }
}
const observer = new IntersectionObserver(([entry]) => {
  visible = entry.isIntersecting;
  sync();
});
video.muted = true;
observer.observe(video);
document.addEventListener('visibilitychange', sync);
reduced.addEventListener('change', sync);
// Al desmontar una sección de una aplicación:
// observer.disconnect(); video.pause(); video.removeAttribute('src'); video.load();
// document.removeEventListener('visibilitychange', sync);
// reduced.removeEventListener('change', sync);
```

El portafolio utiliza `assets/area-backgrounds.js` y `.css`, que también conectan la reproducción al botón global de movimiento, conservan la imagen de respaldo y limpian los recursos al navegar. En esta integración, texto e ilustración ocupan columnas separadas en escritorio y se apilan en móvil para preservar la legibilidad.

El navegador decodifica un MP4 únicamente en la sección visible. La generación por Canvas se usa durante la exportación y no se ejecuta al visitar el sitio.
