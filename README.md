# Dorian Joaquin Flores Burgoa — Portafolio

Archivo profesional interactivo con estética de investigación digital. HTML, CSS y JavaScript sin dependencias de producción ni compilación.

## Arquitectura nueva

- Índice lateral persistente en escritorio; menú accesible en móvil.
- Portada centrada en el nombre completo, con una órbita interactiva de especialidades en líneas turquesas.
- Once especialidades con pantallas propias: ciberseguridad, inteligencia digital, informática forense, radiofrecuencia, desarrollo web, móvil, QA, automatización, IA local, drones y comunicación digital.
- Las once especialidades se agrupan en Seguridad e investigación, Desarrollo y calidad, Automatización e IA, Hardware y vuelo, y Comunicación y estrategia. Ciberseguridad contiene pentesting, OSINT, seguridad móvil con GrapheneOS y recuperación autorizada de acceso a teléfonos y computadoras. Inteligencia digital y contraespionaje reúne investigación, análisis de vínculos y protección frente a vigilancia no autorizada. Informática forense incluye extracción y análisis de teléfonos, WhatsApp y computadoras, recuperación de datos y análisis autorizado de comunicaciones. Radiofrecuencia contiene pruebas controladas de inhibición con jammers, detección RF de transmisores y análisis de ubicación celular por antenas. Drones incluye operación, construcción y puesta a punto.
- Protección personal tiene una página propia, accesible desde la portada y Seguridad e investigación. Explica seis situaciones de protección digital de alto perfil: equipos y cuentas, conversaciones, ubicación, reuniones, posibles filtraciones e incidentes. Cada situación incluye un diagrama animado, descripción en lenguaje claro, acciones y entregables, y cuatro etapas del servicio.
- Archivo de proyectos en filas, con búsqueda por texto/tecnología y filtro de área. Los filtros se conservan en la URL y al recargar.
- Fichas en un panel lateral con contexto, tecnologías y acceso a repositorio o correo.
- Páginas de perfil y contacto con nombre completo, CV, correo, teléfono, GitHub y LinkedIn.

La navegación usa fragmentos URL (`#ciberseguridad?enfoque=seguridad-movil`, `#radiofrecuencia?enfoque=antenas`, `#proyectos?area=qa`, etc.) y funciona con enlaces directos y los botones atrás/adelante del navegador.

## Contenido

`projects.js` conserva los doce registros del catálogo anterior. `script.js` contiene las especialidades y sus asociaciones con los proyectos. Los casos sin enlace se identifican como «sin repositorio público»; la nota sobre contratos es general. La página móvil presenta Flutter y Java sin asignarles proyectos del catálogo que no documenten esas tecnologías.

## Animación y accesibilidad

La portada incluye una ilustración original de un procesador isométrico, rodeada por doce símbolos de especialidades y protección personal. Los símbolos enlazan a cada área, explican su trabajo al recibir foco o cursor y cuentan con accesos de texto en móvil. Los títulos entran por líneas, los registros aparecen de forma escalonada, los enlaces responden al puntero y los cambios de pestaña y fichas tienen transiciones breves.

Cada especialidad tiene ilustraciones SVG animadas propias: reconocimiento y relaciones OSINT, seguridad móvil, análisis de evidencias, recuperación, antenas y comunicaciones, composición de interfaces, recorridos de QA, flujos de automatización, instancias y tareas de bots, rutas y controles de proxies, capas de IA vuelo de drones, mensajes, canales y campañas en redes sociales. Son representaciones conceptuales, sin métricas ni operaciones reales. Los gráficos reaccionan al cursor con un máximo de 3° de inclinación en escritorio.

Se respeta `prefers-reduced-motion`; el control de movimiento guarda la preferencia en el navegador y muestra todas las piezas en su estado estático. Las animaciones SVG se detienen fuera de pantalla o al ocultar la pestaña. Los observadores, animaciones y eventos se limpian al cambiar de página.

- `assets/discipline-visuals.js` y `.css`: ilustraciones y secuencias por especialidad.
- `assets/motion.js` y `.css`: entradas, interacciones y gestión del movimiento.
- `assets/protection.js` y `.css`: contenido y presentación del servicio para personas sin conocimientos técnicos.
- `assets/protection-visuals.js` y `.css`: seis diagramas SVG animados y accesibles de dispositivos, comunicaciones, espacios y documentos, sin personajes caricaturizados. Las explicaciones también están disponibles como texto fuera del dibujo.
- `assets/walkthrough.js` y `.css`: explorador de etapas con selección directa, anterior/siguiente y lectura completa. La explicación y el diagrama se actualizan juntos; el visitante controla el ritmo, sin temporizadores de avance.
- `assets/service-guides.js`: 38 servicios con tres etapas cada uno (acción concreta y resultado para el cliente). Cada etapa tiene una composición propia vinculada al trabajo que describe.
- `assets/security-story-art.js`, `assets/product-story-art.js`, `assets/systems-story-art.js` y `assets/communication-story-art.js`: 114 escenas específicas de las once especialidades. Comparten primitivas gráficas, pero cambian objetos, recorridos y composición según el servicio y la etapa. La plantilla genérica de documento y lista fue retirada.
- Protección personal incorpora cuatro etapas por situación y 24 vistas: accesos, permisos, publicaciones, espacios, documentos, recuperación e informes. La información del gráfico también se explica como texto accesible.
- `script.js`: información, navegación y filtros del portafolio.

El menú móvil gestiona el foco y bloquea el contenido del fondo. Las pestañas admiten flechas, Inicio y Fin. El diálogo lateral admite Escape y devuelve el foco al proyecto seleccionado. Con JavaScript desactivado se muestran identidad y enlaces de contacto.

## Ejecutar

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Abrir http://localhost:4173. Netlify publica la carpeta raíz según `netlify.toml`. El contacto usa correo y enlaces directos.

## Verificar

```sh
node --check script.js
node --check projects.js
node --check assets/motion.js
node --check assets/discipline-visuals.js
node --check assets/protection.js
node --check assets/protection-visuals.js
node --check assets/walkthrough.js
node --check assets/service-guides.js
node --check assets/security-story-art.js
node --check assets/product-story-art.js
node --check assets/systems-story-art.js
node --check assets/communication-story-art.js
node tests/smoke.cjs
```

La prueba usa Playwright instalado o el runtime de Codex en Windows. Se puede indicar otra instalación con `PLAYWRIGHT_MODULE` y otro navegador con `BROWSER_EXECUTABLE`.

Con la vista previa local activa, `node tests/illustrations.cjs` comprueba las 138 escenas: geometría distinta sin contar textos ni colores, SVG válido, etiquetas sin recortes ni colisiones, animación continua y ausencia de errores de dibujo. Se puede usar `PORTFOLIO_URL` para otra dirección de vista previa. No toma capturas.

Comprueba dieciséis páginas entre 320 y 1440 px, enlaces directos, historial, pestañas, filtros combinados, persistencia en URL, estados vacíos, fichas laterales, menú móvil, accesibilidad por teclado, pausa real de la órbita, movimiento reducido, CV y errores de ejecución. Las seis escenas de protección se verifican en móvil y escritorio, con navegación por teclado, persistencia al recargar, semántica SVG y pausa global y fuera de pantalla. No envía mensajes ni usa servicios externos.

Las nuevas capacidades de forense móvil y drones describen la experiencia declarada por el titular; no se añadieron casos ficticios al catálogo. La recuperación y la ubicación se presentan con sus límites de disponibilidad de datos. La referencia de GrapheneOS enlaza al sitio oficial: https://grapheneos.org/.

Los enlaces anteriores a `#forense?enfoque=antenas` se redirigen a la especialidad de radiofrecuencia. La detección RF se describe como búsqueda de transmisores activos, sin prometer la identificación de personas que graban ni la detección de todos los equipos sin emisión. Las capacidades nuevas no agregan casos ficticios al catálogo.

Enlaces de los nuevos apartados: `#forense?enfoque=whatsapp`, `#forense?enfoque=computadoras`, `#ciberseguridad?enfoque=recuperacion-acceso` y `#inteligencia?enfoque=contraespionaje`. La presentación no promete desbloqueo universal ni acceso a información sin autorización.

La guía de protección se abre en `#proteccion`, con enlaces directos como `#proteccion?servicio=ubicacion` y `#proteccion?servicio=filtraciones`. El visitante elige cuándo cambiar de situación; las animaciones no cambian la selección automáticamente. La investigación del entorno se basa en registros autorizados, información pública pertinente y verificaciones consentidas. Los dibujos son ejemplos conceptuales, sin datos de clientes ni resultados simulados de investigaciones.

Bots y proxies se encuentran en Automatización: `#automatizacion?enfoque=granjas-de-bots` y `#automatizacion?enfoque=proxies`. Cada servicio incorpora tres etapas ilustradas propias: preparación, operación y seguimiento.

Comunicación digital (`#comunicacion`) reúne comunicación estratégica, estrategia digital y campañas en redes. Cada enfoque tiene tres etapas con composiciones propias. Incluye un filtro de archivo, acceso desde el índice y perfil; las ilustraciones de evaluación usan datos conceptuales, sin atribuir resultados ni casos al titular.

## Fondos originales por especialidad

Las once especialidades y Protección personal incluyen una escena original diferente en el encabezado. Los doce MP4 de `assets/media/area-backgrounds/` son H.264, 1920×1080, 24 fps y 12 segundos, con bucle periódico y objetos principales fijos. La carga es diferida, el video se pausa fuera de pantalla y al ocultar la página, y se muestra un poster con movimiento reducido o ahorro de datos. El botón global de movimiento controla también los fondos.

`assets/area-backgrounds.js` y `.css` integran los videos. `tools/area-scene-art.cjs` contiene las ilustraciones originales y `tools/render-area-backgrounds.cjs` exporta los MP4 con WebCodecs y un contenedor preparado para reproducción progresiva. Canvas se utiliza al exportar, no durante la reproducción del fondo.

`assets/media/area-backgrounds/parameters.json` registra parámetros y pesos. `INTEGRACION.md` incluye el ejemplo HTML/CSS y carga diferida. Verificación adicional: `node tests/area-backgrounds.cjs` comprueba reproducción real, duración, resolución, tamaño, costura del bucle, posters, pausa y limpieza al navegar.

La portada actual se define en `assets/skills-orbit-art.js`, `assets/skills-orbit.js` y `assets/skills-orbit.css`. Los iconos se elevan y amplían al acercar el cursor; los rótulos permanecen fijos mientras circulan señales y varía el brillo. La animación respeta el movimiento reducido y la pausa global, y se detiene fuera de pantalla.

La animación topográfica ámbar de la portada se conserva debajo de la órbita en `assets/terrain.js` y `.css`, con pausa global, fuera de pantalla y movimiento reducido. Comunicación digital incorpora ocho plataformas, sus logos SVG locales y explicaciones de alcance, participación y crecimiento en `assets/social-platforms.js` y `.css`. Procedencia de logos: `assets/social-logos/sources.json`.
