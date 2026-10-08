'use strict';

// Situations explain the service; illustrations never represent a real investigation.
window.PROTECTION_SERVICES = [
  {
    id: 'equipos', label: 'Mi teléfono y mis cuentas', title: 'Protección de dispositivos y cuentas.',
    situation: 'En tu teléfono hay fotos, documentos, contactos y acceso a buena parte de tu vida. Quieres saber quién puede entrar y qué aplicaciones tienen permisos de más.',
    help: 'Reviso teléfonos, computadoras y cuentas con tu autorización. Compruebo permisos, sesiones abiertas e indicios de aplicaciones espía, y refuerzo la configuración de seguridad.',
    result: 'Una revisión explicada en palabras claras, ajustes de protección y pasos para cuidar tus equipos cada día.',
    caption: 'Revisión de cuentas, dispositivos vinculados y permisos de aplicaciones para reducir accesos no autorizados a tu información.',
    steps: ['Revisar tus equipos', 'Comprobar accesos', 'Reforzar la protección'],
    related: { label: 'Seguridad móvil y GrapheneOS', href: '#ciberseguridad?enfoque=seguridad-movil' },
  },
  {
    id: 'conversaciones', label: 'Mis conversaciones', title: 'Hablar con más privacidad.',
    situation: 'Intercambias conversaciones y documentos sensibles. Necesitas cuidar su contenido y revisar quién tiene acceso a tus contactos, sesiones y copias de seguridad.',
    help: 'Te ayudo a configurar comunicaciones cifradas, revisar dispositivos vinculados y limitar el acceso a documentos y copias. También acordamos hábitos sencillos para tu equipo de confianza.',
    result: 'Canales de comunicación configurados y una guía práctica para compartir información con las personas adecuadas.',
    caption: 'Configuración de comunicaciones privadas y revisión de los equipos y cuentas desde los que se puede acceder a tus conversaciones.',
    steps: ['Elegir cómo comunicarte', 'Configurar la privacidad', 'Cuidar lo que compartes'],
    related: { label: 'Protección de información y contraespionaje', href: '#inteligencia?enfoque=contraespionaje' },
  },
  {
    id: 'ubicacion', label: 'Mi ubicación y mis rutinas', title: 'Menos pistas sobre dónde estás.',
    situation: 'Una foto, una publicación o una aplicación puede revelar lugares que frecuentas. Quieres reducir la información que permite conocer tu ubicación y tus rutinas.',
    help: 'Reviso qué comparten tus aplicaciones, fotos y cuentas. Compruebo la ubicación compartida, evalúo indicios de rastreo y te ayudo a limitar la exposición de tus recorridos y agenda.',
    result: 'Un mapa de dónde se expone tu información, ajustes de privacidad y recomendaciones para publicar y compartir con cuidado.',
    caption: 'Evaluación de la información de ubicación que comparten tus fotos, publicaciones y aplicaciones, con ajustes para reducir la exposición.',
    steps: ['Encontrar las pistas', 'Revisar qué se comparte', 'Reducir la exposición'],
    related: { label: 'Investigación de información pública', href: '#ciberseguridad?enfoque=osint' },
  },
  {
    id: 'reuniones', label: 'Mis reuniones y espacios', title: 'Cuidar el lugar donde conversas.',
    situation: 'Vas a tratar información sensible en una oficina o sala de reuniones. Quieres evaluar si el entorno permite escuchar, grabar o acceder a documentos sin permiso.',
    help: 'Realizo una inspección técnica del espacio autorizado, reviso posibles transmisores y dispositivos de grabación, y evalúo accesos y prácticas de manejo de información.',
    result: 'Un informe de lo observado y medidas concretas para mejorar la privacidad del espacio. Los equipos que no emiten señales requieren otras comprobaciones.',
    caption: 'Inspección del espacio, los dispositivos y las condiciones de acceso para evaluar la privacidad de una reunión.',
    steps: ['Conocer el espacio', 'Inspeccionar el entorno', 'Mejorar la privacidad'],
    related: { label: 'Inspección de señales y transmisores', href: '#radiofrecuencia?enfoque=deteccion-rf' },
  },
  {
    id: 'filtraciones', label: 'Una posible filtración', title: 'Entender cómo salió la información.',
    situation: 'Un documento o un dato privado aparece fuera de tu círculo. Necesitas entender qué pasó y qué evidencias hay antes de sacar conclusiones sobre alguien.',
    help: 'Analizo quién podía acceder a la información y reviso registros autorizados. Contrasto información pública pertinente y verificaciones consentidas sobre el entorno para investigar posibles filtraciones.',
    result: 'Un informe de los hechos que puedan establecerse, los indicios disponibles y las dudas pendientes, con recomendaciones para limitar accesos.',
    caption: 'Análisis de accesos y registros disponibles para reconstruir el recorrido de un documento y documentar una posible filtración.',
    steps: ['Reunir los indicios', 'Reconstruir los accesos', 'Documentar los hechos'],
    related: { label: 'Análisis de relaciones y evidencias', href: '#inteligencia?enfoque=vinculos' },
  },
  {
    id: 'incidentes', label: 'Ya ocurrió un incidente', title: 'Saber qué pasó. Recuperar el control.',
    situation: 'Alguien entró en una cuenta, desaparecieron archivos o sospechas que un equipo está comprometido. Necesitas ordenar lo ocurrido y proteger la información que queda.',
    help: 'Preservo las evidencias disponibles, analizo teléfonos o computadoras autorizados y organizo los hechos. Te acompaño en la recuperación de acceso y en los ajustes de seguridad necesarios.',
    result: 'Un informe comprensible del incidente y un plan de recuperación. La recuperación de archivos y accesos depende del equipo, del cifrado y de los datos disponibles.',
    caption: 'Preservación y análisis de archivos y registros para comprender el incidente y preparar un plan de recuperación.',
    steps: ['Preservar la información', 'Reconstruir lo ocurrido', 'Planificar la recuperación'],
    related: { label: 'Informática forense y recuperación', href: '#forense' },
  },
];

window.PROTECTION_DETAILS = {
  equipos: [
    { title: 'Definir qué revisar', action: 'Identifico contigo los teléfonos, computadoras y cuentas que usas, qué información contienen y quién necesita acceder. Acordamos el alcance de la revisión.', outcome: 'Un listado de equipos y cuentas, la información que se quiere proteger y las comprobaciones acordadas.' },
    { title: 'Revisar los accesos', action: 'Examino sesiones abiertas, dispositivos vinculados y opciones de recuperación de cuenta. Contrastamos los accesos que reconoces y los que requieren una revisión adicional.', outcome: 'Una relación de accesos conocidos y dudas que hay que investigar antes de realizar cambios.' },
    { title: 'Ajustar los permisos', action: 'Reviso qué aplicaciones pueden usar la cámara, el micrófono, los archivos y la ubicación. Configuro contigo los permisos necesarios y las opciones de seguridad disponibles.', outcome: 'Permisos ajustados a tu uso y un registro de los cambios realizados, incluyendo lo que no se pudo comprobar.' },
    { title: 'Entregar las recomendaciones', action: 'Explico los hallazgos y los ajustes aplicados. Priorizo las acciones pendientes y te muestro cómo revisar nuevos accesos y mantener la configuración.', outcome: 'Un resumen de la revisión, cambios documentados y una guía de mantenimiento para tus equipos y cuentas.' },
  ],
  conversaciones: [
    { title: 'Identificar los canales', action: 'Revisamos qué aplicaciones utilizas para conversar, qué información compartes y quiénes necesitan recibirla. Incluimos las copias y los archivos asociados.', outcome: 'Una lista de canales, destinatarios y tipos de información para acordar las medidas de privacidad.' },
    { title: 'Comprobar los equipos', action: 'Reviso los equipos y sesiones que pueden abrir esas conversaciones. Te ayudo a configurar las opciones de protección disponibles y a confirmar los accesos reconocidos.', outcome: 'Accesos revisados y ajustes de comunicación privada, con las limitaciones de cada aplicación explicadas.' },
    { title: 'Cuidar archivos y copias', action: 'Compruebo cómo se comparten documentos y dónde se guardan las copias. Ajustamos los destinatarios y permisos que ya no sean necesarios.', outcome: 'Una revisión de quién puede consultar la información compartida y recomendaciones para proteger sus copias.' },
    { title: 'Acordar hábitos de uso', action: 'Dejo pautas sencillas para compartir información sensible, verificar destinatarios y actuar ante una sesión desconocida o la pérdida de un equipo.', outcome: 'Una guía de comunicación para ti y tu equipo de confianza, adaptada a las herramientas que utilizáis.' },
  ],
  ubicacion: [
    { title: 'Identificar la exposición', action: 'Reviso contigo qué datos de ubicación comparten tus cuentas, aplicaciones y publicaciones. Acordamos qué rutinas e información requieren especial cuidado.', outcome: 'Un inventario de posibles fuentes de exposición y los elementos que se van a comprobar.' },
    { title: 'Revisar las aplicaciones', action: 'Compruebo los permisos de ubicación y las funciones de compartir localización con otras cuentas. Distinguimos lo que necesitas mantener y lo que se puede limitar.', outcome: 'Ajustes de ubicación acordados y un registro de las aplicaciones o cuentas que conservan acceso.' },
    { title: 'Revisar lo que publicas', action: 'Analizo las pistas visibles en fotos y publicaciones, además de los datos de ubicación que puedan acompañar a los archivos. Explico cuáles pueden revelar rutinas.', outcome: 'Ejemplos de exposición encontrados en el material revisado y recomendaciones concretas para compartirlo.' },
    { title: 'Definir las medidas', action: 'Organizo los ajustes y recomendaciones según su prioridad. Documentamos las fuentes de exposición que siguen presentes y cómo revisarlas con el tiempo.', outcome: 'Un plan para reducir la exposición de ubicación y rutinas, con límites y acciones pendientes claros.' },
  ],
  reuniones: [
    { title: 'Delimitar el espacio', action: 'Acordamos qué sala y equipos se pueden revisar, qué información se tratará y quién tiene acceso al espacio. Organizamos la inspección con la autorización correspondiente.', outcome: 'Un alcance definido: espacio, dispositivos y condiciones que se van a evaluar.' },
    { title: 'Inspeccionar el entorno', action: 'Reviso el espacio y sus dispositivos, incluidas posibles emisiones de equipos transmisores. Las señales observadas se analizan en su contexto; no identifican por sí solas a una persona.', outcome: 'Un registro de lo inspeccionado, observaciones y comprobaciones que requieran una revisión adicional.' },
    { title: 'Revisar los accesos', action: 'Evalúo quién puede entrar, utilizar los equipos o consultar documentos de la reunión. Revisamos hábitos de manejo y almacenamiento de información sensible.', outcome: 'Recomendaciones sobre accesos, dispositivos y documentación para mejorar la privacidad del espacio.' },
    { title: 'Documentar la revisión', action: 'Entrego lo observado y las medidas propuestas, indicando las zonas o equipos que no se pudieron comprobar. Explico las limitaciones de la inspección.', outcome: 'Un informe y un plan de mejoras. La ausencia de señales no descarta todos los dispositivos de grabación.' },
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
