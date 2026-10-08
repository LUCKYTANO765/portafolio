'use strict';

// Situations explain the service; illustrations never represent a real investigation.
window.PROTECTION_SERVICES = [
  {
    id: 'equipos', label: 'Mi teléfono y mis cuentas', title: 'Blindaje de dispositivos y anti-extracción.',
    situation: 'Tu teléfono y computadora contienen información crítica, contactos y documentos de alto valor. Necesitas la certeza total de que ningún agente extraño, software espía ni perito informático forense pueda extraer tus datos.',
    help: 'Blindo teléfonos, computadoras y cuentas para evitar cualquier extracción forzada o remota. Bloqueo puertas traseras, spyware y accesos no autorizados, estableciendo un entorno antiforense de máxima privacidad donde nadie pueda ver lo que haces.',
    result: 'Dispositivos blindados con cifrado avanzado e inmunidad ante extracciones forenses y espionaje externo.',
    caption: 'Blindaje de dispositivos y cuentas para impedir extracciones por agentes externos o análisis forenses no autorizados.',
    steps: ['Blindar los equipos', 'Bloquear accesos espía', 'Garantizar privacidad total'],
    related: { label: 'Seguridad móvil y GrapheneOS', href: '#ciberseguridad?enfoque=seguridad-movil' },
  },
  {
    id: 'conversaciones', label: 'Mis conversaciones', title: 'Comunicaciones blindadas y confidenciales.',
    situation: 'Manejas información confidencial y necesitas que tus llamadas y mensajes jamás puedan ser interceptados, grabados ni escuchados por terceros o agentes externos.',
    help: 'Configuro canales de comunicación con cifrado de grado militar de extremo a extremo, bloqueo de grabaciones de audio y protocolos para que nadie sepa con quién hablas ni qué intercambias.',
    result: 'Canales seguros e impenetrables que impiden cualquier escucha, intercepción o acceso no autorizado a tus conversaciones.',
    caption: 'Cifrado de extremo a extremo, prevención de grabaciones y control total de privacidad en llamadas y mensajes.',
    steps: ['Canales cifrados', 'Bloqueo de escuchas', 'Anonimato seguro'],
    related: { label: 'Protección de información y contraespionaje', href: '#inteligencia?enfoque=contraespionaje' },
  },
  {
    id: 'ubicacion', label: 'Mi ubicación y mis rutinas', title: 'Invisibilidad de ubicación y movimientos.',
    situation: 'Nadie debe saber dónde te encuentras, qué rutas tomas ni qué lugares frecuentas. Necesitas anular el rastreo por antenas celulares, GPS, aplicaciones y fotos.',
    help: 'Elimino el rastreo en tus dispositivos y cuentas. Bloqueo la geolocalización en segundo plano, metadatos en archivos y técnicas de triangulación para proteger tus movimientos en todo momento.',
    result: 'Blindaje contra rastreo geográfico: tus dispositivos no revelan tu paradero ni generan historiales de ubicación.',
    caption: 'Neutralización de rastreo por GPS, redes y aplicaciones para impedir que conozcan tu ubicación y recorridos.',
    steps: ['Bloqueo de geolocalización', 'Anulación de metadatos', 'Privacidad de ruta'],
    related: { label: 'Investigación de información pública', href: '#ciberseguridad?enfoque=osint' },
  },
  {
    id: 'reuniones', label: 'Mis reuniones y espacios', title: 'Protección contra escuchas y grabaciones.',
    situation: 'Vas a tratar temas delicados y necesitas asegurarte de que el entorno está libre de micrófonos ocultos, grabadoras encubiertas o dispositivos transmisores que busquen grabar lo que se habla.',
    help: 'Inspecciono técnicamente el espacio y los dispositivos del entorno para detectar micrófonos ocultos, transmisores de radiofrecuencia y grabadoras, garantizando que nadie pueda grabar tus conversaciones.',
    result: 'Un espacio verificado y seguro con contramedidas técnicas para impedir grabaciones o filtraciones de lo conversado.',
    caption: 'Inspección técnica de espacios y contramedidas contra micrófonos espía y dispositivos de grabación no autorizados.',
    steps: ['Inspección del entorno', 'Detección de grabadoras', 'Espacio protegido'],
    related: { label: 'Inspección de señales y transmisores', href: '#radiofrecuencia?enfoque=deteccion-rf' },
  },
  {
    id: 'filtraciones', label: 'Una posible filtración', title: 'Investigación y contención de fugas.',
    situation: 'Un documento o dato privado aparece fuera de tu círculo. Necesitas determinar la vía de escape, evaluar las evidencias y contener la brecha de inmediato.',
    help: 'Analizo quién pudo acceder a la información y rastreo los puntos de fuga en registros autorizados. Detecto brechas de seguridad para frenar filtraciones y blindar tus accesos.',
    result: 'Identificación precisa de vectores de exposición, aislamiento de datos y fortalecimiento del perímetro de confidencialidad.',
    caption: 'Análisis de fugas de información, reconstrucción de accesos y contención inmediata para proteger tu privacidad.',
    steps: ['Rastreo de la fuga', 'Aislamiento de brechas', 'Blindaje definitivo'],
    related: { label: 'Análisis de relaciones y evidencias', href: '#inteligencia?enfoque=vinculos' },
  },
  {
    id: 'incidentes', label: 'Ya ocurrió un incidente', title: 'Respuesta ante ataque y control total.',
    situation: 'Sufres un hackeo, intrusión en tus cuentas o sospechas de intervención de tus equipos. Necesitas expulsar al atacante y blindar la información restante.',
    help: 'Aíslo la intrusión, expulso accesos no autorizados y reconstruyo la seguridad de tus teléfonos y computadoras para que nadie vuelva a comprometer tu intimidad.',
    result: 'Recuperación del control exclusivo, expulsión de agentes externos y fortificación completa de tus sistemas.',
    caption: 'Contención de intrusiones, neutralización de accesos espía y restablecimiento seguro de dispositivos.',
    steps: ['Contención del ataque', 'Expulsión de intrusos', 'Restablecimiento seguro'],
    related: { label: 'Informática forense y recuperación', href: '#forense' },
  },
];

window.PROTECTION_DETAILS = {
  equipos: [
    { title: 'Blindaje contra extracción', action: 'Audito tus teléfonos, computadoras y cuentas para blindarlos contra intentos de extracción física o digital por parte de agentes extraños, herramientas de espionaje y otros informáticos forenses. Garantizo que nadie pueda sustraer tu información ni romper tu privacidad.', outcome: 'Equipos identificados y configurados bajo protocolos antiforense: datos blindados, inaccesibles para terceros y cero puntos de fuga.' },
    { title: 'Bloquear accesos espía', action: 'Examino y erradico sesiones abiertas, dispositivos vinculados no reconocidos, spyware y puertas traseras. Me aseguro de que nadie pueda monitorizar tus actividades ni saber con quién interactúas.', outcome: 'Cierre definitivo de accesos encubiertos, eliminación de herramientas de espionaje y control exclusivo en tus manos.' },
    { title: 'Anulación de micrófonos y rastreo', action: 'Bloqueo los permisos de aplicaciones y la telemetría del sistema para impedir que enciendan silenciosamente el micrófono para grabar tus conversaciones, activen la cámara o rastreen tu ubicación en segundo plano.', outcome: 'Permisos y sensores blindados: micrófonos, cámaras y geolocalización neutralizados para evitar cualquier grabación o seguimiento encubierto.' },
    { title: 'Protocolo de confidencialidad total', action: 'Implemento configuraciones de máxima seguridad, almacenamiento cifrado y técnicas antiforense. Te entrego protocolos y hábitos defensivos para mantener la privacidad total de tus equipos y asegurar que tu información permanezca inviolable.', outcome: 'Entorno digital blindado y protocolos de operación segura: total privacidad y tranquilidad de que nadie puede saber lo que haces ni extraer tus datos.' },
  ],
  conversaciones: [
    { title: 'Blindaje de canales y llamadas', action: 'Configuro herramientas de mensajería y voz con cifrado extremo para que tus chats, audios y llamadas jamás puedan ser interceptados, intervenidos o escuchados por terceros ni agentes externos.', outcome: 'Canales blindados de alta confidencialidad donde tus conversaciones son completamente privadas e imposibles de descifrar.' },
    { title: 'Protección de chats y contactos', action: 'Reviso las sesiones activas y blindo las copias de seguridad para que nadie pueda vincular tu cuenta a otros dispositivos ni averiguar con quién hablas ni qué documentos intercambias.', outcome: 'Historiales y listas de contactos blindados contra duplicación de sesión, espionaje o revisiones no autorizadas.' },
    { title: 'Impedir grabaciones y copias', action: 'Ajusto las configuraciones para evitar capturas, descargas no autorizadas o grabaciones encubiertas de tus conversaciones, asegurando que los archivos sensibles no salgan de tus manos.', outcome: 'Archivos y mensajes protegidos contra difusión, copias externas y herramientas de monitoreo.' },
    { title: 'Protocolo de comunicación reservada', action: 'Establezco pautas de comunicación estricta para ti y tus contactos clave: verificación de canales, mensajes autodestructibles y protocolos de reacción ante sospechas de intervención.', outcome: 'Guía operativa de comunicación confidencial para hablar con absoluta tranquilidad y cero filtraciones.' },
  ],
  ubicacion: [
    { title: 'Detección de puntos de rastreo', action: 'Identifico todas las vías por las que se puede triangular o rastrear tu posición: GPS del teléfono, conexiones Wi-Fi, antenas celulares, aplicaciones en segundo plano y metadatos en fotos compartidas.', outcome: 'Inventario completo de posibles fugas de ubicación para neutralizar el rastreo de tus movimientos.' },
    { title: 'Bloqueo de geolocalización', action: 'Desactivo servicios de ubicación compartida, rastreo de operadoras y permisos de aplicaciones para que nadie pueda monitorear dónde estás ni seguir tus desplazamientos.', outcome: 'Dispositivos blindados contra rastreo geográfico: sin coordenadas emitidas ni historiales de localización.' },
    { title: 'Limpieza de fotos y archivos', action: 'Elimino metadatos EXIF, coordenadas GPS incrustadas y marcas de tiempo de fotos y documentos antes de su envío para que no revelen tus ubicaciones ni rutinas frecuentes.', outcome: 'Archivos despojados de metadatos de ubicación para impedir que reconstruyan tus rutas o lugares frecuentados.' },
    { title: 'Rutas y movimientos protegidos', action: 'Defino medidas de seguridad para tus traslados diarios y viajes: desconexión táctica, perfiles seguros y eliminación de historiales para una privacidad de movimiento completa.', outcome: 'Protocolo de movilidad reservada: libertad de desplazamiento sin temor a rastreos o vigilancia geográfica.' },
  ],
  reuniones: [
    { title: 'Perímetro del espacio privado', action: 'Delimito la sala y los dispositivos que estarán presentes antes de una reunión crítica, evaluando los puntos vulnerables donde se podrían ocultar micrófonos o grabadoras.', outcome: 'Delimitación del espacio confidencial y parámetros de seguridad para garantizar una conversación privada.' },
    { title: 'Detección de micrófonos y grabadoras', action: 'Inspecciono el entorno en busca de transmisores ocultos, cámaras espía y grabadoras de audio activas o pasivas, evitando que agentes externos graben tus conversaciones.', outcome: 'Espacio analizado técnicamente para certificar la ausencia de dispositivos de escucha o grabación no autorizados.' },
    { title: 'Control de dispositivos en la sala', action: 'Establezco medidas de contención para teléfonos y equipos electrónicos durante la reunión, como aislamiento en bolsas Faraday o apagado seguro para anular micrófonos remotos.', outcome: 'Entorno blindado contra micrófonos activos y transmisiones silenciosas durante las reuniones.' },
    { title: 'Protocolo de reuniones confidenciales', action: 'Entrego medidas concretas de seguridad física y digital para mantener la reserva absoluta de lo que se hable en cada encuentro.', outcome: 'Protocolo para reuniones de alta seguridad donde nadie pueda escuchar ni grabar lo conversado.' },
  ],
  filtraciones: [
    { title: 'Preservar los indicios', action: 'Identificamos qué información apareció fuera de su ámbito y qué evidencias están disponibles. Acordamos los registros y equipos que pueden analizarse con autorización.', outcome: 'Una relación de evidencias disponibles y un alcance de investigación, sin atribuir responsabilidades de antemano.' },
    { title: 'Reconstruir los accesos', action: 'Organizo los accesos y eventos registrados por fecha. Compruebo quién podía consultar la información y qué actividad puede documentarse con los datos disponibles.', outcome: 'Una cronología de los eventos que se pueden establecer y de los intervalos para los que faltan datos.' },
    { title: 'Contrastar la información', action: 'Relaciono los registros con información pública pertinente y verificaciones consentidas. Distingo los hechos observados de las explicaciones que aún necesitan pruebas.', outcome: 'Hallazgos contrastados, posibles explicaciones y preguntas pendientes, con sus fuentes documentadas.' },
    { title: 'Presentar las conclusiones', action: 'Explico qué permite concluir la evidencia y qué no puede determinarse. Propongo cambios de acceso y manejo de información para reducir nuevas filtraciones.', outcome: 'Un informe de hechos, indicios y limitaciones, junto con recomendaciones priorizadas.' },
  ],
  incidentes: [
    { title: 'Preservar la información', action: 'Acordamos los equipos y cuentas afectados y documentamos la información disponible. Defino qué preservar antes de los cambios que puedan alterar evidencias.', outcome: 'Un registro inicial del incidente, alcance y evidencias disponibles para la revisión.' },
    { title: 'Analizar lo ocurrido', action: 'Examino archivos y registros accesibles con autorización. Relaciono los eventos para comprender el incidente e identificar qué información pudo verse afectada.', outcome: 'Una explicación respaldada por los datos encontrados, con incertidumbres y límites señalados.' },
    { title: 'Evaluar la recuperación', action: 'Compruebo las opciones de recuperación de cuentas, archivos y copias. Acordamos los cambios necesarios para recuperar acceso y reforzar los equipos.', outcome: 'Opciones de recuperación según los datos, el cifrado y el estado del equipo, con acciones acordadas.' },
    { title: 'Entregar el plan de respuesta', action: 'Organizo los hallazgos, las acciones realizadas y las pendientes. Explico qué revisar después para mantener el control de cuentas y dispositivos.', outcome: 'Un informe del incidente y un plan de recuperación y seguimiento adaptado al caso.' },
  ],
};
