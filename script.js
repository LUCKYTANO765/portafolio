'use strict';

const FULL_NAME = 'Dorian Joaquin Flores Burgoa';
const EMAIL = 'dorianjfb01@gmail.com';
const projects = window.PORTFOLIO_PROJECTS || [];
const workspace = document.querySelector('#workspace');
const dossier = document.querySelector('#project-dossier');
const sidebar = document.querySelector('#sidebar');
const menuButton = document.querySelector('#menu-toggle');
const motionButton = document.querySelector('#motion-toggle');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const mobileQuery = window.matchMedia('(max-width: 650px)');
let cleanupPage = () => {};
let motionPaused = false;
try { motionPaused = localStorage.getItem('df-motion') === 'paused'; } catch { /* Storage may be unavailable. */ }

// Each discipline owns its content. No client data or operating metrics are simulated.
const disciplines = {
  ciberseguridad: {
    number: '01', label: 'Ciberseguridad', title: 'Mirar más allá\nde la superficie.',
    summary: 'Investigo cómo se comportan los sistemas, dónde están sus límites y qué información permite entenderlos. Pentesting, investigación OSINT, protección móvil y recuperación autorizada de acceso a teléfonos y computadoras.',
    short: 'Pentesting · OSINT · GrapheneOS', stack: ['Pentesting', 'OSINT', 'Seguridad móvil', 'GrapheneOS', 'Recuperación de acceso'],
    methods: [
      { tab: 'Pentesting', title: 'Encontrar los puntos débiles.', text: 'Pruebas de seguridad para reconocer superficies de ataque, identificar vulnerabilidades y comprender su impacto dentro de un alcance autorizado.', bullets: ['Reconocimiento de aplicaciones y servicios', 'Análisis de vulnerabilidades y su contexto', 'Documentación de hallazgos y recomendaciones'], steps: ['SUPERFICIE', 'ANÁLISIS', 'HALLAZGOS'] },
      { tab: 'OSINT', title: 'Conectar información dispersa.', text: 'Investigación en fuentes abiertas para reunir información relevante, contrastarla y construir una visión más clara del objeto de estudio.', bullets: ['Búsqueda en fuentes abiertas', 'Contraste y relación de información', 'Organización de resultados'], steps: ['FUENTES', 'RELACIONES', 'CONTEXTO'] },
      { tab: 'Seguridad móvil', id: 'seguridad-movil', title: 'Reforzar la seguridad del teléfono.', text: 'Configuración y uso de GrapheneOS en dispositivos compatibles para mejorar la privacidad y la seguridad móvil, con atención a los permisos y a las prácticas de uso.', bullets: ['Configuración del sistema y sus opciones de seguridad', 'Revisión de permisos de las aplicaciones', 'Buenas prácticas de protección móvil'], steps: ['DISPOSITIVO', 'GRAPHENEOS', 'PROTECCIÓN'], reference: { label: 'Conocer GrapheneOS', url: 'https://grapheneos.org/' } },
      { tab: 'Recuperar acceso', id: 'recuperacion-acceso', visualIndex: 3, title: 'Recuperar el acceso al equipo.', text: 'Recuperación de acceso y desbloqueo de teléfonos y computadoras propios o con autorización. El alcance depende del dispositivo, el cifrado y los mecanismos de recuperación disponibles.', bullets: ['Evaluación del equipo y del acceso disponible', 'Recuperación autorizada de cuentas y dispositivos', 'Protección de la información durante el proceso'], steps: ['EQUIPO', 'RECUPERACIÓN', 'ACCESO'] },
    ],
  },
  inteligencia: {
    number: '02', label: 'Inteligencia digital', title: 'Investigar amenazas.\nProteger información.',
    summary: 'Inteligencia digital y contraespionaje técnico: investigación, análisis de vínculos y revisión de indicios de vigilancia no autorizada. Información contrastada para entender riesgos y proteger a personas y organizaciones.',
    short: 'Investigación · Vínculos · Contraespionaje', stack: ['Inteligencia digital', 'OSINT', 'Análisis de vínculos', 'Contraespionaje técnico', 'Protección de información'],
    methods: [
      { tab: 'Investigación', title: 'Convertir información en contexto.', text: 'Investigación digital a partir de fuentes abiertas y evidencias obtenidas con autorización. Contraste de información para comprender amenazas, incidentes y posibles intentos de espionaje.', bullets: ['Recopilación y contraste de fuentes', 'Análisis del contexto y las amenazas', 'Documentación de evidencias y conclusiones'], steps: ['FUENTES', 'CONTEXTO', 'INFORME'] },
      { tab: 'Vínculos', title: 'Relacionar las piezas de la investigación.', text: 'Análisis de conexiones entre dominios, infraestructura, eventos e información disponible para reconstruir relaciones y desarrollar hipótesis respaldadas por evidencias.', bullets: ['Organización de datos y relaciones', 'Correlación de eventos e infraestructura', 'Diferenciación entre hechos e hipótesis'], steps: ['DATOS', 'RELACIONES', 'HIPÓTESIS'] },
      { tab: 'Contraespionaje', title: 'Detectar indicios. Reducir la exposición.', text: 'Revisión de indicios de espionaje digital, software espía y exposición de información en equipos autorizados. Evaluación de riesgos y medidas de protección frente a vigilancia no autorizada y filtraciones.', bullets: ['Revisión de indicios de software espía', 'Evaluación de accesos y exposición de información', 'Recomendaciones de protección de dispositivos y datos'], steps: ['INDICIOS', 'EVALUACIÓN', 'PROTECCIÓN'] },
    ],
  },
  forense: {
    number: '03', label: 'Informática forense', title: 'Recuperar evidencias.\nReconstruir historias.',
    summary: 'Extracción y análisis forense de información de teléfonos y computadoras, incluidos datos de WhatsApp y otras aplicaciones. Recuperación de archivos y revisión de comunicaciones con autorización, preservando y documentando las evidencias.',
    short: 'Teléfonos · WhatsApp · Computadoras', stack: ['Forense móvil', 'WhatsApp', 'Forense de computadoras', 'Recuperación de datos', 'Evidencias digitales'],
    methods: [
      { tab: 'Forense móvil', visualIndex: 0, title: 'Entender la historia del dispositivo.', text: 'Extracción y análisis autorizado de información disponible en teléfonos: archivos, fotografías, registros y datos de aplicaciones. Organización de evidencias para reconstruir eventos y documentar la investigación.', bullets: ['Preservación de evidencias digitales', 'Análisis de información del teléfono', 'Organización y documentación de hallazgos'], steps: ['DISPOSITIVO', 'EVIDENCIA', 'ANÁLISIS'] },
      { tab: 'WhatsApp', visualIndex: 4, title: 'Analizar la información de mensajería.', text: 'Extracción y análisis forense de información de WhatsApp y otras aplicaciones de mensajería desde dispositivos, exportaciones y copias de seguridad accesibles con autorización. El análisis depende de los datos disponibles y su protección.', bullets: ['Revisión de conversaciones y archivos disponibles', 'Análisis de adjuntos, fechas y contexto', 'Preservación y documentación de evidencias'], steps: ['DATOS', 'MENSAJERÍA', 'EVIDENCIAS'] },
      { tab: 'Computadoras', visualIndex: 5, title: 'Examinar la evidencia de una computadora.', text: 'Extracción y análisis autorizado de archivos, registros y datos de aplicaciones de computadoras. Revisión de información disponible para reconstruir actividad y apoyar una investigación.', bullets: ['Extracción de información accesible del equipo', 'Análisis de archivos y registros', 'Organización y documentación de hallazgos'], steps: ['COMPUTADORA', 'EXTRACCIÓN', 'ANÁLISIS'] },
      { tab: 'Recuperación', visualIndex: 1, title: 'Recuperar información borrada.', text: 'Recuperación de información borrada de teléfonos y computadoras cuando el estado del almacenamiento, el cifrado y los datos disponibles lo permiten.', bullets: ['Evaluación del dispositivo y los datos disponibles', 'Recuperación de información accesible', 'Revisión y organización de los datos recuperados'], steps: ['EVALUACIÓN', 'RECUPERACIÓN', 'REVISIÓN'] },
      { tab: 'Comunicaciones', visualIndex: 3, title: 'Investigar las comunicaciones móviles.', text: 'Análisis e intercepción de comunicaciones móviles en entornos autorizados y con un alcance definido, como parte de trabajos de investigación y seguridad.', bullets: ['Definición del alcance autorizado', 'Análisis de comunicaciones y registros', 'Documentación de evidencias y resultados'], steps: ['ALCANCE', 'ANÁLISIS', 'EVIDENCIAS'] },
    ],
  },
  radiofrecuencia: {
    number: '04', label: 'Radiofrecuencia', title: 'Comprender el entorno\nde las señales.',
    summary: 'Análisis de señales de radiofrecuencia, detección electrónica de transmisores y localización celular mediante antenas. También realizo pruebas de inhibición de señales con jammers en entornos de laboratorio autorizados.',
    short: 'Jammers · Detección RF · Antenas', stack: ['Radiofrecuencia', 'Análisis de señales', 'Jammers', 'Detección electrónica', 'Localización celular'],
    methods: [
      { tab: 'Jammers', title: 'Evaluar la inhibición de señales.', text: 'Pruebas controladas de bloqueo e inhibición de señales con equipos tipo jammer, en entornos de laboratorio con la autorización aplicable y un alcance definido.', bullets: ['Definición del entorno y alcance de la prueba', 'Evaluación de interferencias e inhibición', 'Documentación del comportamiento observado'], steps: ['ENTORNO', 'EVALUACIÓN', 'RESULTADOS'] },
      { tab: 'Detección RF', title: 'Buscar transmisores en un área.', text: 'Detección de emisiones de radiofrecuencia para identificar posibles equipos transmisores, incluidos dispositivos de grabación con transmisión inalámbrica. La señal por sí sola no identifica quién graba ni permite detectar todos los equipos que no transmiten.', bullets: ['Inspección de emisiones en el área', 'Búsqueda de posibles transmisores activos', 'Análisis y documentación de señales detectadas'], steps: ['ÁREA', 'EMISIONES', 'ANÁLISIS'] },
      { tab: 'Antenas', title: 'Analizar la ubicación mediante antenas.', text: 'Análisis de ubicación de teléfonos a partir de información de antenas y celdas de redes móviles, utilizando registros obtenidos con autorización. La precisión depende de la cobertura y de los datos disponibles.', bullets: ['Análisis de registros de redes celulares', 'Relación entre celdas, tiempos y ubicaciones', 'Estimación de ubicación y documentación'], steps: ['REGISTROS', 'CELDAS', 'UBICACIÓN'] },
    ],
  },
  web: {
    number: '05', label: 'Desarrollo web', title: 'De la interacción\na la lógica.',
    summary: 'Desarrollo aplicaciones web que conectan interfaces, servicios y datos. Trabajo con JavaScript, Node.js y Java, y utilizo Docker para organizar entornos de ejecución.',
    short: 'JavaScript · Node.js · Docker', stack: ['JavaScript', 'Node.js', 'Java', 'Docker', 'Git'],
    methods: [
      { tab: 'Interfaces', title: 'Diseñar cómo se usa el producto.', text: 'Interfaces adaptables con atención a los recorridos del usuario, los estados de la aplicación y la integración con sus servicios.', bullets: ['Experiencias adaptadas a distintas pantallas', 'Flujos y estados de interacción', 'Consumo de APIs'], steps: ['USUARIO', 'INTERFAZ', 'SERVICIOS'] },
      { tab: 'Backend', title: 'Construir lo que sucede detrás.', text: 'Servicios y lógica de aplicación que conectan la interfaz con las reglas del negocio y la información que necesita el sistema.', bullets: ['APIs e integraciones', 'Lógica de negocio', 'Gestión de información'], steps: ['PETICIÓN', 'LÓGICA', 'RESPUESTA'] },
      { tab: 'Entornos', title: 'Dar al código un lugar para funcionar.', text: 'Uso de Docker y Git para trabajar con entornos reproducibles y mantener el desarrollo organizado.', bullets: ['Contenedores con Docker', 'Configuración de servicios', 'Control de versiones con Git'], steps: ['CÓDIGO', 'CONTENEDOR', 'ENTORNO'] },
    ],
  },
  movil: {
    number: '06', label: 'Desarrollo móvil', title: 'Software que\nva contigo.',
    summary: 'Desarrollo móvil con Flutter y Java. Interfaces, navegación y conexión con servicios, pensadas para la forma en que usamos un teléfono.',
    short: 'Flutter · Java · APIs', stack: ['Flutter', 'Java', 'APIs', 'Git'],
    methods: [
      { tab: 'Flutter', title: 'Convertir una idea en una experiencia móvil.', text: 'Desarrollo de interfaces y funcionalidades con Flutter, conectando pantallas y datos para dar forma a la aplicación.', bullets: ['Interfaces y componentes', 'Navegación entre pantallas', 'Integración de servicios'], steps: ['PANTALLAS', 'ESTADO', 'SERVICIOS'] },
      { tab: 'Java', title: 'Lógica para aplicaciones móviles.', text: 'Trabajo con Java para desarrollar funcionalidades e integrar el comportamiento de la aplicación con sus necesidades de información.', bullets: ['Lógica de aplicación', 'Organización de funcionalidades', 'Conexión con datos'], steps: ['ENTRADA', 'LÓGICA', 'RESULTADO'] },
      { tab: 'Integración', title: 'Conectar la aplicación con el sistema.', text: 'Integración con APIs para que la experiencia móvil sea parte del producto completo y pueda intercambiar información con sus servicios.', bullets: ['Peticiones a servicios', 'Estados de carga y respuesta', 'Tratamiento de errores'], steps: ['APP', 'API', 'DATOS'] },
    ],
  },
  qa: {
    number: '07', label: 'QA & Testing', title: 'Poner a prueba\nlo que construimos.',
    summary: 'Aseguramiento de calidad con pruebas funcionales y automatización. Uso Playwright para recorrer flujos y detectar problemas antes de que afecten la experiencia del usuario.',
    short: 'Playwright · E2E · Testing', stack: ['Playwright', 'Pruebas funcionales', 'E2E', 'JavaScript'],
    methods: [
      { tab: 'Playwright', title: 'Automatizar recorridos reales.', text: 'Pruebas de extremo a extremo que reproducen acciones del usuario y comprueban que el sistema responde como se espera.', bullets: ['Automatización de interacciones', 'Validación de flujos completos', 'Comprobación de resultados'], steps: ['PREPARAR', 'EJECUTAR', 'VERIFICAR'] },
      { tab: 'Pruebas funcionales', title: 'Validar el comportamiento del producto.', text: 'Revisión de funcionalidades a partir de escenarios de uso para identificar diferencias entre lo esperado y lo que hace la aplicación.', bullets: ['Diseño de escenarios de prueba', 'Exploración de casos límite', 'Registro de errores reproducibles'], steps: ['ESCENARIO', 'PRUEBA', 'EVIDENCIA'] },
      { tab: 'Regresión', title: 'Volver a comprobar después del cambio.', text: 'Validación de recorridos existentes después de una modificación, con foco en los comportamientos que deben seguir funcionando.', bullets: ['Selección de recorridos relevantes', 'Repetición de comprobaciones', 'Seguimiento de incidencias'], steps: ['CAMBIO', 'RECORRIDOS', 'REVISIÓN'] },
    ],
  },
  automatizacion: {
    number: '08', label: 'Automatización', title: 'Hacer que las\nherramientas conversen.',
    summary: 'Conecto aplicaciones y procesos con n8n, APIs y webhooks. Organizo flujos de trabajo e incorporo IA para reducir tareas repetitivas y coordinar herramientas.',
    short: 'n8n · APIs · Flujos de trabajo', stack: ['n8n', 'APIs', 'Webhooks', 'Docker', 'IA en procesos'],
    methods: [
      { tab: 'Flujos con n8n', title: 'De una tarea a un proceso conectado.', text: 'Flujos de trabajo para encadenar pasos, transformar información y conectar herramientas de acuerdo con lo que necesita el proceso.', bullets: ['Disparadores y secuencias', 'Transformación de información', 'Acciones entre servicios'], steps: ['EVENTO', 'PROCESO', 'ACCIÓN'] },
      { tab: 'Integraciones', title: 'Conectar las piezas del proceso.', text: 'Integración de servicios mediante APIs y webhooks para que las herramientas puedan intercambiar datos.', bullets: ['Conexión entre aplicaciones', 'Recepción de eventos', 'Envío y transformación de datos'], steps: ['SERVICIO A', 'n8n', 'SERVICIO B'] },
      { tab: 'IA en procesos', title: 'Incorporar inteligencia donde aporta.', text: 'Uso de modelos y agentes dentro de flujos de trabajo para apoyar tareas de procesamiento de información.', bullets: ['Entrada y preparación de información', 'Conexión con modelos', 'Uso del resultado en el flujo'], steps: ['DATOS', 'MODELO', 'FLUJO'] },
    ],
  },
  bots: {
    number: '09', label: 'Granjas de bots', title: 'Coordinar tareas.\nSupervisar cada bot.',
    summary: 'Infraestructura de bots para pruebas, procesamiento de datos y monitoreo de servicios propios o autorizados. Distribución de tareas, supervisión de instancias y proxies para controlar las conexiones de cada proceso.',
    short: 'Instancias · Tareas · Proxies', stack: ['Granjas de bots', 'Proxies', 'Docker', 'Distribución de tareas', 'Monitoreo'],
    methods: [
      { tab: 'Granjas de bots', id: 'granjas-de-bots', title: 'Coordinar varios bots desde un mismo lugar.', text: 'Una granja de bots reúne programas que ejecutan tareas automáticas. Preparo la infraestructura para repartir trabajo entre ellos, separar sus entornos y supervisar procesos como pruebas de aplicaciones, procesamiento de datos y monitoreo de servicios propios o autorizados.', bullets: ['Preparación de instancias y recursos de ejecución', 'Distribución de tareas con límites y control central', 'Seguimiento de errores, pausas y reinicios'], steps: ['INSTANCIAS', 'TAREAS', 'SUPERVISIÓN'] },
      { tab: 'Proxies', id: 'proxies', title: 'Organizar por dónde pasan las conexiones.', text: 'Un proxy es un servidor intermediario entre una aplicación y el servicio al que se conecta. Configuro estos intermediarios para separar conexiones de distintos procesos, controlar quién puede utilizarlos y comprobar su disponibilidad.', bullets: ['Configuración de proxies y rutas de conexión', 'Control de acceso, destinos permitidos y límites de uso', 'Comprobación de respuestas y detección de fallos'], steps: ['CONEXIÓN', 'CONTROL', 'COMPROBACIÓN'] },
    ],
  },
  ia: {
    number: '10', label: 'IA local', title: 'Inteligencia en\nun entorno propio.',
    summary: 'Trabajo con modelos de lenguaje locales y agentes. Configuro entornos de IA y los conecto con herramientas y procesos para convertirlos en una parte útil del trabajo.',
    short: 'LLMs · Agentes · IA local', stack: ['Modelos locales', 'LLMs', 'Agentes', 'Docker', 'n8n'],
    methods: [
      { tab: 'Modelos locales', title: 'Ejecutar los modelos en tu entorno.', text: 'Configuración y uso de modelos de lenguaje locales, considerando los recursos disponibles y la tarea que deben resolver.', bullets: ['Preparación del entorno', 'Configuración del modelo', 'Pruebas de funcionamiento'], steps: ['ENTORNO', 'MODELO', 'INFERENCIA'] },
      { tab: 'Agentes', title: 'Conectar razonamiento y herramientas.', text: 'Configuración de agentes que usan modelos y herramientas para apoyar tareas concretas dentro de un proceso.', bullets: ['Definición de la tarea', 'Conexión con herramientas', 'Revisión de resultados'], steps: ['TAREA', 'AGENTE', 'HERRAMIENTAS'] },
      { tab: 'Aplicación', title: 'Llevar el modelo al flujo de trabajo.', text: 'Integración de IA local con procesos propios para explorar usos prácticos y evaluar sus resultados.', bullets: ['Preparación de entradas', 'Integración con procesos', 'Evaluación del resultado'], steps: ['ENTRADA', 'IA LOCAL', 'REVISIÓN'] },
    ],
  },
  drones: {
    number: '11', label: 'Drones', title: 'De los componentes\nal vuelo.',
    summary: 'Operación y construcción de drones. Trabajo tanto en el manejo del equipo como en su creación, ensamblaje y puesta a punto.',
    short: 'Operación · Construcción · Pruebas', stack: ['Operación de drones', 'Diseño y ensamblaje', 'Configuración', 'Pruebas'],
    methods: [
      { tab: 'Operación', title: 'Preparar el equipo. Controlar el vuelo.', text: 'Manejo de drones con preparación del equipo y revisión de sus condiciones de funcionamiento antes de la operación.', bullets: ['Preparación y revisión del dron', 'Control y manejo durante el vuelo', 'Revisión del equipo después de su uso'], steps: ['PREPARACIÓN', 'VUELO', 'REVISIÓN'] },
      { tab: 'Construcción', title: 'Crear un dron desde sus piezas.', text: 'Diseño y ensamblaje de drones, conectando sus componentes y configurando el conjunto para llevarlo a funcionamiento.', bullets: ['Definición del diseño y los componentes', 'Ensamblaje e integración del equipo', 'Configuración inicial del dron'], steps: ['DISEÑO', 'ENSAMBLAJE', 'CONFIGURACIÓN'] },
      { tab: 'Puesta a punto', title: 'Comprobar el conjunto antes de volar.', text: 'Revisión, ajustes y pruebas para comprobar el comportamiento del dron y preparar su operación.', bullets: ['Comprobación de componentes y conexiones', 'Ajustes de configuración', 'Pruebas de funcionamiento'], steps: ['REVISIÓN', 'AJUSTES', 'PRUEBAS'] },
    ],
  },
};

function campaignBotsAnalysisMarkup() { return window.BotAwareness.markup(); }

disciplines.comunicacion = {
  number: '12', label: 'Comunicación digital', title: 'Ganar campañas y\nsostener gobierno.',
  summary: 'Estrategia y comunicación política para campañas electorales y gestión de gobierno. Construyo la narrativa, posicionamiento y maquinaria de influencia que candidatos y autoridades necesitan para conectar con el electorado, ganar elecciones y consolidar una alta aprobación ciudadana.',
  short: 'Campañas políticas · Gobierno · Aprobación', stack: ['Estrategia política', 'Narrativa electoral', 'Aprobación de gobierno', 'Gestión de crisis', 'Guerra digital', 'Opinión pública'],
  methods: [
    { tab: 'Estrategia política', id: 'comunicacion-estrategica', title: 'Construir narrativa y ganar aprobación.', text: 'Diseño la estrategia y narrativa política para candidatos y gobernantes. Defino el mensaje fuerza, el contraste frente a adversarios y la vocería estratégica para elevar el respaldo popular, conectar con el humor social y blindar el liderazgo tanto en contienda electoral como en funciones de gobierno.', bullets: ['Narrativa de liderazgo y posicionamiento político', 'Ejes discursivos, contraste y neutralización de ataques', 'Estrategia para elevar la aprobación ciudadana y gestionar crisis'], steps: ['DIAGNÓSTICO', 'NARRATIVA', 'BLINDAJE'] },
    { tab: 'Comunicación de gobierno', id: 'estrategia-digital', title: 'Convertir la gestión en respaldo popular.', text: 'Estructuro la estrategia de comunicación tanto en campaña electoral como en la administración pública para movilizar a la ciudadanía. Traduzco obras, reformas y propuestas en mensajes contundentes que generan cercanía, confianza y legitimidad popular en cada territorio y canal.', bullets: ['Segmentación del electorado y detección del pulso social', 'Despliegue multicanal para conectar con votantes indecisos', 'Plan de comunicación de gobierno para sostener alta aprobación'], steps: ['ELECTORADO', 'DESPLIEGUE', 'APROBACIÓN'] },
    { tab: 'Campañas y guerra digital', id: 'campanas-en-redes', title: 'Dominar la conversación pública y redes.', text: 'Planificación, pauta estratégica y operación de campañas electorales en redes sociales. Conduzco la conversación pública para candidatos y equipos de gobierno: amplificación de propuestas, contraste táctico frente a la oposición, desactivación de guerra sucia y movilización activa de votantes.', bullets: ['Estrategia y calendario de campaña electoral', 'Pauta segmentada y blindaje reputacional contra guerra sucia', 'Monitoreo de opinión pública y medición de aprobación'], steps: ['OPERACIÓN', 'CONTRASTE', 'RESULTADOS'], extraHtml: campaignBotsAnalysisMarkup },
  ],
};

const disciplineGroups = [
  { label: 'Seguridad e investigación', description: 'Proteger sistemas, analizar evidencias y estudiar señales.', keys: ['ciberseguridad', 'inteligencia', 'forense', 'radiofrecuencia'] },
  { label: 'Desarrollo y calidad', description: 'Construir productos y comprobar cómo funcionan.', keys: ['web', 'movil', 'qa'] },
  { label: 'Automatización e IA', description: 'Conectar herramientas, procesos y modelos locales.', keys: ['automatizacion', 'bots', 'ia'] },
  { label: 'Hardware y vuelo', description: 'Crear, configurar y operar drones.', keys: ['drones'] },
  { label: 'Comunicación y estrategia', description: 'Estrategia política, campañas electorales y aprobación de gobierno.', keys: ['comunicacion'] },
];
const methodId = method => method.id || method.tab.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-');

// Associations are explicit: a web project is not labeled Flutter merely because it is responsive.
const projectAreas = {
  ecommerce: ['web'], supercasino365: ['web', 'qa'], century21: ['automatizacion'],
  'parental-control': ['web', 'ciberseguridad'], mortalsoft: ['web'],
  'tower-auditoria': ['web', 'qa'], 'tower-rush-3d': ['juegos'],
  'casino-qa': ['qa'], 'local-llm': ['ia'], 'osint-pentesting': ['ciberseguridad', 'inteligencia', 'forense'],
  'pax-medica': ['web'], 'medicare-deportes': ['web'],
};
const routeLabels = { inicio: 'Vista general', ...Object.fromEntries(Object.entries(disciplines).map(([key, d]) => [key, d.label])), proteccion: 'Protección personal', proyectos: 'Archivo de proyectos', perfil: 'Sobre mí', contacto: 'Contacto' };
const esc = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const pad = value => String(value).padStart(2, '0');
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const tokens = values => `<div class="tokens">${values.map(value => `<span>${esc(value)}</span>`).join('')}</div>`;
const privacyNote = () => '<div class="privacy-note"><span aria-hidden="true">↳</span><p>Parte de mi trabajo está sujeto a contratos y acuerdos de confidencialidad y no puede publicarse. Los repositorios disponibles se enlazan en sus fichas; podemos conversar sobre mi experiencia respetando esos acuerdos.</p></div>';

function intro(number, eyebrow, title, summary) {
  return `<header class="page-intro"><p class="eyebrow">${esc(eyebrow)}</p><span class="intro-count">[ ${esc(number)} ]</span><h1>${title.split('\n').map((line, i) => `<span class="title-line" style="--line-order:${i}"><span>${esc(line)}</span></span>`).join('')}</h1><p class="summary">${esc(summary)}</p></header>`;
}

function protectionEntry() {
  return `<a class="protection-entry" href="#proteccion"><svg viewBox="0 0 64 72" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M32 4 57 14v20c0 17-14 28-25 34C21 62 7 51 7 34V14Z"/><circle cx="32" cy="28" r="7"/><path d="M18 49c0-17 28-17 28 0M24 57h16"/></svg><div><p>PROTECCIÓN DIGITAL DE ALTO PERFIL</p><h2>Protección de tu vida privada.</h2><span>Teléfonos, conversaciones, ubicación y posibles filtraciones. Conoce cómo puedo ayudarte.</span></div><b aria-hidden="true">↗</b></a>`;
}

function renderProtection(params) {
  const services = window.PROTECTION_SERVICES;
  workspace.innerHTML = `<article class="page page-padding protection-page">
    ${intro('02+', 'PROTECCIÓN DIGITAL DE ALTO PERFIL', 'Tu vida privada.\nTu información.', 'Protección digital para personas con exposición pública, autoridades, profesionales y sus equipos de confianza. Te ayudo a cuidar tus dispositivos, conversaciones y ubicación, y a investigar posibles filtraciones.')}
    <div class="protection-choose"><h2 id="protection-choose-title">¿Qué te preocupa proteger?</h2><p>Elige una situación y descubre cómo te ayudo.</p></div>
    <div class="protection-tabs" role="tablist" aria-labelledby="protection-choose-title">${services.map((s, i) => `<button type="button" role="tab" id="protection-tab-${s.id}" data-protection="${i}" aria-controls="protection-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}"><span aria-hidden="true">${pad(i + 1)}</span>${esc(s.label)}</button>`).join('')}</div>
    <section id="protection-panel" class="protection-panel" role="tabpanel" tabindex="0"></section>
    <section class="protection-scope" aria-label="Alcance del servicio"><div><h2>Protección adaptada a tu vida.</h2><p>Primero entendemos qué información necesitas cuidar y quién debe acceder. Después acordamos qué equipos, cuentas y espacios revisar, con tu autorización y un alcance definido.</p></div><div><h2>Expectativas claras.</h2><p>El objetivo es reducir la exposición y responder con evidencias. Ningún servicio puede garantizar que una persona sea imposible de localizar o grabar. Cada conclusión depende de las comprobaciones y los datos disponibles.</p></div></section>
    <section class="protection-contact" aria-labelledby="protection-contact-title"><div><h2 id="protection-contact-title">Empecemos por lo que te preocupa.</h2><p>Cuéntame de forma general qué necesitas proteger. Acordaremos el alcance y cómo compartir la información del caso.</p></div><a class="action-button" href="mailto:${EMAIL}?subject=${encodeURIComponent('Consulta sobre protección digital personal')}">Consultar este servicio <span aria-hidden="true">↗</span></a></section>
  </article>`;
  const tabs = [...workspace.querySelectorAll('[data-protection]')];
  const panel = workspace.querySelector('#protection-panel');
  function selectService(index, focus = false, updateUrl = true) {
    const service = services[index];
    const steps = window.PROTECTION_DETAILS[service.id];
    tabs.forEach((tab, i) => { tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; });
    panel.setAttribute('aria-labelledby', tabs[index].id);
    panel.innerHTML = `<header class="protection-story-heading"><p class="eyebrow">SITUACIÓN ${pad(index + 1)} / ${pad(services.length)}</p><h2>${esc(service.title)}</h2></header>
      <p class="protection-context">${esc(service.situation)}</p>
      ${window.ServiceWalkthrough.markup(steps, `<figure class="protection-illustration"><div class="protection-scene-label"><span>ALCANCE DEL SERVICIO</span><span data-visual-step></span></div><div data-protection-art></div><figcaption></figcaption></figure>`)}
      <div class="protection-explanation"><section><h3>Cómo te ayudo</h3><p>${esc(service.help)}</p></section><section class="protection-result"><h3>Qué recibes</h3><p>${esc(service.result)}</p></section></div>
      <div class="protection-actions"><a class="protection-inquire" href="mailto:${EMAIL}?subject=${encodeURIComponent(`Protección personal: ${service.label}`)}">Consultar sobre esta situación ↗</a><button class="protection-next" type="button">${index === services.length - 1 ? 'Volver a la primera situación' : 'Ver siguiente situación'} <span aria-hidden="true">→</span></button></div><a class="method-reference" href="${esc(service.related.href)}">${esc(service.related.label)} ↗</a>`;
    if (focus) { tabs[index].focus({ preventScroll: true }); tabs[index].scrollIntoView({ block: 'nearest', behavior: 'instant' }); }
    if (updateUrl) history.replaceState(null, '', `#proteccion?servicio=${service.id}`);
    panel.querySelector('.protection-next').addEventListener('click', () => {
      selectService((index + 1) % services.length);
      panel.focus({ preventScroll: true });
      panel.scrollIntoView({ block: 'start', behavior: 'instant' });
    });
    window.ServiceWalkthrough.mount(panel, steps, (phase, step) => {
      panel.querySelector('[data-protection-art]').innerHTML = window.ProtectionVisuals.render(service.id, phase);
      panel.querySelector('[data-visual-step]').textContent = `PASO ${phase + 1} / ${steps.length}`;
      panel.querySelector('figcaption').textContent = `${step.title}. ${step.outcome}`;
    });
    window.PortfolioMotion.refresh(panel);
    window.PortfolioMotion.swap(panel);
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectService(index));
    tab.addEventListener('keydown', event => {
      const columns = getComputedStyle(tab.parentElement).gridTemplateColumns.split(' ').length;
      const destinations = { ArrowRight: (index + 1) % tabs.length, ArrowLeft: (index - 1 + tabs.length) % tabs.length, ArrowDown: (index + columns) % tabs.length, ArrowUp: (index - columns + tabs.length) % tabs.length, Home: 0, End: tabs.length - 1 };
      if (Object.hasOwn(destinations, event.key)) { event.preventDefault(); selectService(destinations[event.key], true); }
    });
  });
  const initial = services.findIndex(service => service.id === params.get('servicio'));
  selectService(initial < 0 ? 0 : initial, false, false);
}

function renderHome() {
  workspace.innerHTML = `<div class="page"><section class="cover cover-orbit" aria-labelledby="cover-title"><div class="cover-copy"><p class="eyebrow">INGENIERÍA INFORMÁTICA / DORIAN JOAQUIN FLORES BURGOA</p><h1 id="cover-title"><span class="title-line" style="--line-order:0"><span>Dorian Joaquin</span></span><span class="title-line" style="--line-order:1"><span>Flores Burgoa.</span></span></h1><p class="cover-description">Desarrollo software. Investigo dispositivos. Construyo tecnología.<br>Seguridad, código e ideas que se conectan.</p><div class="cover-links"><a href="#ciberseguridad">Explorar ciberseguridad ↗</a><a href="#proyectos">Abrir proyectos ↗</a></div></div>${window.SkillsOrbit.markup()}<div class="cover-bottom"><span>CÓDIGO / SEGURIDAD / INVESTIGACIÓN</span><span>BOLIVIA · ${new Date().getFullYear()}</span></div></section>${window.PortfolioTerrain.markup()}<section class="index-section" aria-labelledby="index-title"><div class="index-heading"><h2 id="index-title">Elige un área. Explora mi trabajo.</h2><p>${pad(Object.keys(disciplines).length)} ESPECIALIDADES ↓</p></div>${disciplineGroups.map((group, groupIndex) => `<section class="discipline-group" aria-labelledby="group-${groupIndex}"><header class="group-heading"><span>${pad(groupIndex + 1)}</span><div><h3 id="group-${groupIndex}">${group.label}</h3><p>${group.description}</p></div></header>${group.keys.map(key => { const d = disciplines[key]; return `<a class="discipline-row" href="#${key}"><span>${d.number}</span><strong>${d.label}</strong><small>${d.short}</small><span aria-hidden="true">↗</span></a>`; }).join('')}</section>`).join('')}</section></div>`;
  workspace.querySelector('.index-heading').insertAdjacentHTML('afterend', protectionEntry());
  const stopOrbit = window.SkillsOrbit.mount(workspace);
  const stopTerrain = window.PortfolioTerrain.mount(workspace);
  cleanupPage = () => { stopOrbit(); stopTerrain(); };
}

function diagram(key, method, index) {
  return `<div class="method-diagram" data-visual="${key}" aria-hidden="true"><span class="diagram-label">VISTA DEL SERVICIO / ${pad(index + 1)}</span>${window.PortfolioVisuals.render(key, method, method.visualIndex ?? index)}<div class="diagram-legend">${method.steps.map((step, i) => `<span>${pad(i + 1)} / ${esc(step)}</span>`).join('')}</div><p class="diagram-phase"></p></div>`;
}

function renderDiscipline(key, params = new URLSearchParams()) {
  const d = disciplines[key];
  const related = projects.filter(p => (projectAreas[p.id] || []).includes(key));
  workspace.innerHTML = `<article class="page page-padding">${intro(d.number, `ÁREA DE TRABAJO / ${d.label}`, d.title, d.summary)}<div class="discipline-tabs" role="tablist" aria-label="Enfoques de ${esc(d.label)}">${d.methods.map((m, i) => `<button type="button" role="tab" id="method-tab-${i}" aria-controls="method-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-method="${i}">${esc(m.tab)}</button>`).join('')}</div><div id="method-panel" class="method-panel" role="tabpanel" tabindex="0"></div>${key === 'forense' ? '<a class="area-crosslink" href="#ciberseguridad?enfoque=seguridad-movil"><span>PROTECCIÓN Y ACCESO</span>Seguridad móvil y GrapheneOS <b>↗</b></a><a class="area-crosslink" href="#ciberseguridad?enfoque=recuperacion-acceso"><span>RECUPERACIÓN DE ACCESO</span>Desbloqueo autorizado de teléfonos y computadoras <b>↗</b></a><a class="area-crosslink" href="#radiofrecuencia?enfoque=antenas"><span>LOCALIZACIÓN CELULAR</span>Análisis de ubicación mediante antenas <b>↗</b></a>' : key === 'ciberseguridad' ? '<a class="area-crosslink" href="#forense"><span>ANÁLISIS DE EVIDENCIAS</span>Informática forense y recuperación de datos <b>↗</b></a>' : ''}<div class="stack-line"><span>HERRAMIENTAS Y ENFOQUES</span>${tokens(d.stack)}</div><section class="related" aria-labelledby="related-title"><div class="section-line"><h2 id="related-title">Trabajo relacionado</h2><a href="#proyectos?area=${key}">Abrir archivo ↗</a></div><div id="related-projects"></div></section>${privacyNote()}</article>`;
  if (key === 'comunicacion') workspace.querySelector('#method-panel').insertAdjacentHTML('afterend', window.SocialPlatforms.markup());
  if (key === 'inteligencia') workspace.querySelector('.discipline-tabs').insertAdjacentHTML('beforebegin', protectionEntry());
  if (key === 'ciberseguridad' || key === 'forense' || key === 'radiofrecuencia') {
    workspace.querySelector('.stack-line').insertAdjacentHTML('beforebegin', '<a class="area-crosslink" href="#proteccion"><span>PROTECCIÓN DE PERSONAS</span>Conoce el alcance del servicio <b>↗</b></a>');
  }
  let stopBotAwareness = () => {};
  cleanupPage = () => stopBotAwareness();
  const tabs = [...workspace.querySelectorAll('[data-method]')];
  function selectMethod(index, focus = false, updateUrl = true) {
    stopBotAwareness();
    const m = d.methods[index];
    const steps = window.SERVICE_GUIDES[`${key}:${methodId(m)}`];
    tabs.forEach((tab, i) => { tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; });
    const panel = workspace.querySelector('#method-panel');
    panel.setAttribute('aria-labelledby', `method-tab-${index}`);
    panel.innerHTML = `<div class="method-copy"><p class="eyebrow">${d.number}.${pad(index + 1)} / ${esc(m.tab)}</p><h2>${esc(m.title)}</h2><p>${esc(m.text)}</p><ul>${m.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>${m.reference ? `<a class="method-reference" href="${esc(m.reference.url)}" target="_blank" rel="noopener noreferrer">${esc(m.reference.label)} ↗</a>` : ''}</div>${window.ServiceWalkthrough.markup(steps, diagram(key, m, index))}${typeof m.extraHtml === 'function' ? m.extraHtml() : (m.extraHtml || '')}`;
    window.ServiceWalkthrough.mount(panel, steps, (phase, step) => {
      panel.querySelector('.diagram-holo').outerHTML = window.PortfolioVisuals.render(key, m, m.visualIndex ?? index, phase);
      panel.querySelector('.diagram-phase').innerHTML = `<span>PASO ${phase + 1}</span>${esc(step.title)}`;
      panel.querySelectorAll('.diagram-legend > span').forEach((label, i) => {
        label.textContent = `${pad(i + 1)} / ${steps[i].title}`;
        if (i === phase) label.setAttribute('aria-current', 'step'); else label.removeAttribute('aria-current');
      });
    });
    if (focus) tabs[index].focus({ preventScroll: true });
    const strip = tabs[index].parentElement;
    strip.scrollTo({ left: tabs[index].offsetLeft - tabs[0].offsetLeft, behavior: 'instant' });
    if (updateUrl) history.replaceState(null, '', `#${key}?enfoque=${methodId(m)}`);
    stopBotAwareness = window.BotAwareness.mount(panel);
    window.PortfolioMotion.refresh(panel);
    window.PortfolioMotion.swap(panel);
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectMethod(index));
    tab.addEventListener('keydown', event => {
      const keys = { ArrowRight: (index + 1) % tabs.length, ArrowLeft: (index - 1 + tabs.length) % tabs.length, Home: 0, End: tabs.length - 1 };
      if (Object.hasOwn(keys, event.key)) { event.preventDefault(); selectMethod(keys[event.key], true); }
    });
  });
  const initialMethod = d.methods.findIndex(method => methodId(method) === params.get('enfoque'));
  selectMethod(initialMethod < 0 ? 0 : initialMethod, false, false);
  const container = workspace.querySelector('#related-projects');
  if (related.length) renderProjectRows(container, related.slice(0, 3));
  else container.innerHTML = '<p class="empty-state">Esta especialidad forma parte de mi experiencia. Todavía no hay casos de esta especialidad documentados en este catálogo. <a href="#contacto">Conversemos sobre tu proyecto ↗</a></p>';
}

function renderProjectRows(container, list) {
  container.replaceChildren();
  list.forEach(p => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'project-row';
    button.dataset.project = p.id;
    button.setAttribute('aria-label', `Abrir ficha de ${p.title.es}`);
    button.setAttribute('aria-haspopup', 'dialog');
    button.innerHTML = `<span>${pad(projects.indexOf(p) + 1)}</span><span><strong>${esc(p.title.es)}</strong><small>${esc(p.categoryLabel.es)} · ${p.repo ? 'Repositorio público' : 'Sin repositorio público'}</small></span><span class="project-tech">${p.tags.slice(0, 2).map(esc).join(' / ')}</span><span aria-hidden="true">↗</span>`;
    button.addEventListener('click', () => openDossier(p));
    container.append(button);
  });
  window.PortfolioMotion.refresh(container);
}

function renderArchive(params) {
  const allowed = new Set(['all', ...Object.keys(disciplines), 'juegos']);
  const initialArea = allowed.has(params.get('area')) ? params.get('area') : 'all';
  workspace.innerHTML = `<section class="page page-padding">${intro('13', 'REGISTRO / TRABAJO SELECCIONADO', 'Archivo de\nproyectos.', 'Desarrollo, pruebas, investigación y automatización. Abre un registro para conocer su contexto y las herramientas utilizadas.')}<div class="archive-controls"><label for="project-search">BUSCAR EN EL ARCHIVO<input id="project-search" type="search" placeholder="Nombre, herramienta o tecnología…" autocomplete="off"></label><label for="project-area">ÁREA DE TRABAJO<select id="project-area"><option value="all">Todas las áreas</option>${disciplineGroups.map(group => `<optgroup label="${esc(group.label)}">${group.keys.map(key => `<option value="${key}">${esc(disciplines[key].label)}</option>`).join('')}</optgroup>`).join('')}<option value="juegos">Desarrollo 3D</option></select></label></div><p class="archive-count" id="archive-count" role="status"></p><div class="archive-labels" aria-hidden="true"><span>N.º</span><span>PROYECTO / ÁREA</span><span>HERRAMIENTAS</span><span>↗</span></div><div id="archive-list"></div>${privacyNote()}</section>`;
  const search = workspace.querySelector('#project-search');
  const area = workspace.querySelector('#project-area');
  area.value = initialArea;
  search.value = params.get('q') || '';
  function filterProjects(updateUrl = false) {
    const query = normalize(search.value.trim());
    const list = projects.filter(p => (area.value === 'all' || (projectAreas[p.id] || []).includes(area.value)) && normalize([p.title.es, p.description.es, p.categoryLabel.es, ...p.tags].join(' ')).includes(query));
    workspace.querySelector('#archive-count').textContent = `${pad(list.length)} DE ${pad(projects.length)} PROYECTOS · ${area.options[area.selectedIndex].text.toUpperCase()}`;
    const container = workspace.querySelector('#archive-list');
    if (list.length) renderProjectRows(container, list);
    else container.innerHTML = '<p class="empty-state">No hay proyectos que coincidan con esta selección. Prueba otra búsqueda o <a href="#contacto">conversemos sobre esta área</a>.</p>';
    if (updateUrl) {
      const next = new URLSearchParams();
      if (area.value !== 'all') next.set('area', area.value);
      if (search.value) next.set('q', search.value);
      history.replaceState(null, '', `#proyectos${next.size ? `?${next}` : ''}`);
    }
  }
  search.addEventListener('input', () => filterProjects(true));
  area.addEventListener('change', () => filterProjects(true));
  filterProjects();
}

function renderProfile() {
  const experience = {
    ciberseguridad: ['Ciberseguridad y seguridad móvil', 'Busco puntos débiles mediante pentesting autorizado e investigo información pública con OSINT. Refuerzo la seguridad de teléfonos compatibles con GrapheneOS, reviso permisos y cuentas, y ayudo a recuperar el acceso a equipos propios o autorizados según sus mecanismos de protección.'],
    inteligencia: ['Inteligencia digital y contraespionaje', 'Investigo amenazas, contrasto fuentes y relaciono eventos, dominios e infraestructura para entender qué ocurrió. Reviso indicios de software espía, accesos no autorizados y posibles filtraciones, separando los hechos comprobados de las hipótesis.'],
    proteccion: ['Protección digital personal', 'Ayudo a personas con exposición pública y a sus equipos a proteger dispositivos, cuentas y conversaciones. Reviso la exposición de su ubicación y sus rutinas, la privacidad de reuniones y espacios, y posibles filtraciones. Preparo medidas de prevención, copias de seguridad y recuperación ante incidentes.'],
    forense: ['Informática forense y recuperación de datos', 'Extraigo y analizo información de teléfonos, computadoras, WhatsApp y otras aplicaciones de mensajería con autorización. Preservo evidencias, organizo archivos y registros, reconstruyo eventos e investigo comunicaciones dentro del alcance acordado. Recupero información borrada cuando el almacenamiento, el cifrado y los datos disponibles lo permiten.'],
    radiofrecuencia: ['Radiofrecuencia y análisis de señales', 'Busco transmisores activos mediante detección de emisiones y analizo registros autorizados de antenas celulares para estimar ubicaciones. Realizo pruebas controladas de inhibición con jammers en laboratorios autorizados. Documento los resultados y sus límites: una señal no identifica por sí sola quién graba y la precisión de ubicación depende de los registros disponibles.'],
    web: ['Desarrollo web y servicios', 'Construyo interfaces adaptables a distintas pantallas y la lógica que conecta un producto con sus datos. Trabajo con JavaScript, Node.js y Java, integro APIs y organizo entornos de desarrollo con Docker y control de versiones con Git.'],
    movil: ['Aplicaciones móviles', 'Desarrollo aplicaciones con Flutter y Java: pantallas, navegación, componentes y lógica de funcionamiento. Las conecto con servicios y APIs, cuidando los estados de carga, las respuestas y el tratamiento de errores.'],
    qa: ['QA y pruebas de software', 'Compruebo que una aplicación haga lo que necesita su usuario. Automatizo recorridos completos con Playwright, diseño pruebas funcionales, exploro casos límite y documento errores reproducibles. Después de un cambio, realizo pruebas de regresión para verificar que lo existente siga funcionando.'],
    automatizacion: ['Automatización de procesos', 'Conecto herramientas con n8n, APIs y webhooks. Organizo disparadores, secuencias y transformación de datos, e incorporo IA para apoyar tareas dentro de los procesos.'],
    bots: ['Granjas de bots y proxies', 'Preparo instancias para ejecutar pruebas, procesar datos y monitorear servicios propios o autorizados. Distribuyo tareas y superviso errores, pausas y reinicios. Configuro proxies como parte de esta infraestructura para organizar conexiones, controlar accesos y comprobar su disponibilidad.'],
    ia: ['Inteligencia artificial local', 'Configuro modelos de lenguaje que funcionan en equipos e infraestructura propios, considerando los recursos disponibles. Conecto agentes con herramientas y procesos, preparo las entradas y evalúo sus resultados para que la IA apoye tareas concretas.'],
    drones: ['Diseño, construcción y operación de drones', 'Diseño y ensamblo drones desde sus componentes, integro sus sistemas y ajusto su configuración. Preparo y reviso el equipo antes del vuelo, realizo pruebas de funcionamiento, opero el dron y compruebo su estado después de utilizarlo.'],
    comunicacion: ['Estrategia política, campañas y gobierno', 'Diseño la estrategia de comunicación y narrativa política para candidatos, autoridades y equipos de gobierno. Construyo campañas electorales, discursos de alto impacto y despliegues digitales en redes sociales para elevar la aprobación ciudadana, ganar elecciones, neutralizar crisis y blindar la gestión pública frente a ataques de la oposición.']
  };
  const groups = disciplineGroups.map(group => ({ ...group, keys: group.keys.flatMap(key => key === 'inteligencia' ? [key, 'proteccion'] : [key]) }));
  const capability = key => {
    const [title, text] = experience[key];
    const links = key === 'proteccion'
      ? window.PROTECTION_SERVICES.map(service => ({ label: service.label, href: '#proteccion?servicio=' + service.id }))
      : disciplines[key].methods.map(method => ({ label: method.tab, href: '#' + key + '?enfoque=' + methodId(method) }));
    return '<article class="profile-capability" data-profile-area="' + key + '"><h4><a href="#' + key + '">' + esc(title) + ' <span aria-hidden="true">↗</span></a></h4><p>' + esc(text) + '</p><ul class="profile-service-links" aria-label="Servicios de ' + esc(title) + '">' + links.map(link => '<li><a href="' + esc(link.href) + '">' + esc(link.label) + ' <span aria-hidden="true">↗</span></a></li>').join('') + '</ul></article>';
  };
  workspace.innerHTML = '<article class="page page-padding profile-page">' +
    intro('14', 'PERFIL / DETRÁS DEL TRABAJO', 'Dorian Joaquin\nFlores Burgoa.', 'Ingeniero informático en Bolivia. Desarrollo software, investigo y protejo información, automatizo procesos y conecto tecnología con comunicación digital.') +
    '<div class="profile-layout"><div class="profile-copy">' +
      '<p>Construir, comprobar y proteger. Así conecto mis áreas de trabajo.</p>' +
      '<p>Trabajo en desarrollo web y móvil, calidad de software, ciberseguridad e investigación digital. Combino estas capacidades con automatización, inteligencia artificial local, radiofrecuencia, drones y estrategia de comunicación.</p>' +
      '<p>Me interesa entender el problema completo: cómo se usa una aplicación, qué información necesita proteger una persona o qué proceso puede funcionar mejor. A partir de ahí, desarrollo la solución, compruebo su comportamiento y explico los resultados de forma clara.</p>' +
      '<div class="profile-actions"><a href="resume.pdf" download="CV_Dorian_Joaquin_Flores_Burgoa.pdf" class="action-button">Descargar currículum <span aria-hidden="true">↓</span></a><a class="profile-whatsapp" href="https://wa.me/59178310899" target="_blank" rel="noopener noreferrer"><img src="assets/social-logos/whatsapp.svg" width="20" height="20" alt="">Conversemos por WhatsApp <span aria-hidden="true">↗</span></a></div>' +
    '</div><dl class="profile-facts">' +
      '<div><dt>Nombre completo</dt><dd>' + FULL_NAME + '</dd></div>' +
      '<div><dt>Profesión / Ubicación</dt><dd>Ingeniero informático / Bolivia</dd></div>' +
      '<div><dt>Desarrollo y calidad</dt><dd>JavaScript, Node.js, Java, Flutter, Docker, Git y Playwright.</dd></div>' +
      '<div><dt>Automatización y protección</dt><dd>n8n, APIs, webhooks, modelos y agentes de IA local, proxies y GrapheneOS.</dd></div>' +
      '<div><dt>Mi código</dt><dd><a href="https://github.com/LUCKYTANO765" target="_blank" rel="noopener noreferrer">github.com/LUCKYTANO765 ↗</a></dd></div>' +
    '</dl></div>' +
    '<section class="profile-capabilities" aria-labelledby="profile-capabilities-title"><header class="profile-capabilities-heading"><p class="eyebrow">CAPACIDADES / ÁREAS DE TRABAJO</p><h2 id="profile-capabilities-title">Lo que puedo aportar a tu proyecto.</h2><p>Explora cada área para conocer el proceso, las herramientas y el alcance de cada servicio.</p></header>' +
      groups.map((group, index) => '<section class="profile-area-group" aria-labelledby="profile-group-' + index + '"><header><span aria-hidden="true">' + pad(index + 1) + '</span><h3 id="profile-group-' + index + '">' + esc(group.label) + '</h3></header><div class="profile-capability-grid">' + group.keys.map(capability).join('') + '</div></section>').join('') +
    '</section><div class="profile-work"><h2>Proyectos públicos y trabajo confidencial.</h2><p>En mi GitHub comparto los proyectos que puedo publicar. Otros trabajos están sujetos a contratos y acuerdos de confidencialidad.</p><a class="method-reference" href="#proyectos">Explorar mis proyectos ↗</a></div>' + privacyNote() + '</article>';
}

function renderContact() {
  workspace.innerHTML = `<section class="page page-padding contact-page">${intro('15', 'CONTACTO / CONVERSEMOS', 'El siguiente\nproyecto empieza\ncon una idea.', 'Software, protección digital personal, investigación forense, calidad, automatización, drones o campañas en redes sociales. Cuéntame qué necesitas resolver.')}<div class="contact-address"><a href="mailto:${EMAIL}">${EMAIL} ↗</a><button type="button" id="copy-email" aria-label="Copiar correo electrónico">Copiar correo</button></div><p id="copy-status" class="copy-status" role="status"></p><div class="contact-links"><a href="https://github.com/LUCKYTANO765" target="_blank" rel="noopener noreferrer">GitHub <span>↗</span></a><a href="https://www.linkedin.com/in/dorian-joaquin-flores-burgoa-2b2559273/" target="_blank" rel="noopener noreferrer">LinkedIn <span>↗</span></a><a class="contact-whatsapp" href="https://wa.me/59178310899" target="_blank" rel="noopener noreferrer" aria-label="Escríbeme por WhatsApp al +591 78310899"><img src="assets/social-logos/whatsapp.svg" width="20" height="20" alt="">Escríbeme por WhatsApp <span aria-hidden="true">↗</span></a></div><p class="contact-note">${FULL_NAME.toUpperCase()}<br>INGENIERO INFORMÁTICO / BOLIVIA</p></section>`;
  workspace.querySelector('#copy-email').addEventListener('click', async () => {
    const status = workspace.querySelector('#copy-status');
    try { await navigator.clipboard.writeText(EMAIL); status.textContent = 'Correo copiado.'; }
    catch { status.textContent = `Puedes copiarlo directamente: ${EMAIL}`; }
  });
}

function openDossier(p) {
  document.querySelector('#dossier-index').textContent = `PROYECTO ${pad(projects.indexOf(p) + 1)} / ${pad(projects.length)}`;
  document.querySelector('#dossier-title').textContent = p.title.es;
  document.querySelector('#dossier-category').textContent = p.categoryLabel.es;
  document.querySelector('#dossier-description').textContent = p.detail.es;
  document.querySelector('#dossier-stack').innerHTML = p.tags.map(tag => `<span>${esc(tag)}</span>`).join('');
  document.querySelector('#dossier-access-label').textContent = p.repo ? 'REPOSITORIO PÚBLICO' : 'SIN REPOSITORIO PÚBLICO';
  document.querySelector('#dossier-note').textContent = p.repo ? 'Puedes consultar el código de este proyecto en GitHub.' : 'El catálogo no incluye un enlace público para este proyecto. Podemos conversar sobre mi experiencia y el contexto que sea posible compartir.';
  const link = document.querySelector('#dossier-link');
  link.href = p.repo || `mailto:${EMAIL}?subject=${encodeURIComponent(`Consulta sobre ${p.title.es}`)}`;
  link.textContent = p.repo ? 'Ver código en GitHub ↗' : 'Consultar por correo ↗';
  if (p.repo) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
  else { link.removeAttribute('target'); link.removeAttribute('rel'); }
  dossier.showModal();
  dossier.scrollTop = 0;
  document.body.classList.add('dossier-open');
}
document.querySelector('#close-dossier').addEventListener('click', () => dossier.close());
dossier.addEventListener('close', () => document.body.classList.remove('dossier-open'));
dossier.addEventListener('click', event => {
  if (event.target !== dossier) return;
  const bounds = dossier.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dossier.close();
});

function setMenu(open, returnFocus = false) {
  sidebar.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.innerHTML = open ? 'Cerrar <span>×</span>' : 'Explorar <span>+</span>';
  document.querySelector('#menu-backdrop').hidden = !open;
  document.body.classList.toggle('menu-open', open);
  document.querySelector('.main-shell').inert = open;
  if (open) sidebar.querySelector('[aria-current=page]')?.focus();
  else if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => setMenu(!sidebar.classList.contains('open'), true));
document.querySelector('#menu-backdrop').addEventListener('click', () => setMenu(false, true));
mobileQuery.addEventListener('change', () => setMenu(false));
document.addEventListener('keydown', event => {
  if (!sidebar.classList.contains('open')) return;
  if (event.key === 'Escape') { event.preventDefault(); setMenu(false, true); }
  if (event.key === 'Tab') {
    const focusable = [menuButton, ...[...sidebar.querySelectorAll('a')].filter(el => el.getClientRects().length)];
    const current = focusable.indexOf(document.activeElement);
    if (event.shiftKey && current <= 0) { event.preventDefault(); focusable.at(-1).focus(); }
    else if (!event.shiftKey && current === focusable.length - 1) { event.preventDefault(); menuButton.focus(); }
  }
});
document.querySelector('.skip-link').addEventListener('click', event => { event.preventDefault(); workspace.focus(); });
sidebar.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (link) { setMenu(false); if (link.hash === location.hash) workspace.focus(); }
});

function applyMotion() {
  const stopped = motionPaused || motionPreference.matches;
  document.documentElement.classList.toggle('motion-paused', stopped);
  motionButton.setAttribute('aria-pressed', String(stopped));
  motionButton.querySelector('span').textContent = stopped ? 'OFF' : 'ON';
  motionButton.disabled = motionPreference.matches;
  motionButton.setAttribute('aria-label', motionPreference.matches ? 'Movimiento reducido por preferencia del sistema' : (stopped ? 'Activar animaciones' : 'Pausar animaciones'));
  window.dispatchEvent(new Event('portfolio-motion'));
}
motionButton.addEventListener('click', () => {
  motionPaused = !motionPaused;
  try { localStorage.setItem('df-motion', motionPaused ? 'paused' : 'active'); } catch { /* Keep the preference in memory. */ }
  applyMotion();
});
motionPreference.addEventListener('change', applyMotion);

function route(firstLoad = false) {
  const [requested, query = ''] = location.hash.slice(1).split('?');
  let key = Object.hasOwn(routeLabels, requested) ? requested : 'inicio';
  const params = new URLSearchParams(query);
  if (requested && !Object.hasOwn(routeLabels, requested)) history.replaceState(null, '', '#inicio');
  if (key === 'forense' && params.get('enfoque') === 'antenas') {
    key = 'radiofrecuencia';
    history.replaceState(null, '', '#radiofrecuencia?enfoque=antenas');
  }
  if (key === 'automatizacion' && ['granjas-de-bots', 'proxies'].includes(params.get('enfoque'))) {
    key = 'bots';
    history.replaceState(null, '', '#bots?enfoque=' + params.get('enfoque'));
  }
  window.PortfolioMotion.unmount();
  cleanupPage(); cleanupPage = () => {};
  if (dossier.open) dossier.close();
  setMenu(false);
  document.title = `${key === 'inicio' ? 'Ingeniero informático' : routeLabels[key]} — ${FULL_NAME}`;
  document.querySelector('#breadcrumb').textContent = routeLabels[key];
  document.querySelectorAll('[data-page]').forEach(link => {
    if (link.dataset.page === key) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
  });
  if (key === 'inicio') renderHome();
  else if (key === 'proteccion') renderProtection(params);
  else if (disciplines[key]) renderDiscipline(key, params);
  else if (key === 'proyectos') renderArchive(params);
  else if (key === 'perfil') renderProfile();
  else renderContact();
  const areaFilm = window.AreaBackgrounds.markup(key);
  if (areaFilm) {
    workspace.querySelector('.page-intro')?.insertAdjacentHTML('beforeend', areaFilm);
    const previousCleanup = cleanupPage;
    const stopAreaFilm = window.AreaBackgrounds.mount(workspace);
    cleanupPage = () => { stopAreaFilm(); previousCleanup(); };
  }
  window.PortfolioMotion.mount(workspace);
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (!firstLoad) workspace.focus({ preventScroll: true });
}
window.addEventListener('hashchange', () => route());
document.querySelector('#year').textContent = new Date().getFullYear();
applyMotion();
route(true);
