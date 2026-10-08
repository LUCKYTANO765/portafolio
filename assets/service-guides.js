'use strict';

// Three plain-language stages for every method in the portfolio.
// Keys follow script.js: `${area}:${method.id || slug(method.tab)}`.
window.SERVICE_GUIDES = {
  'ciberseguridad:pentesting': [
    {
      title: 'Acordar qué revisar',
      action: 'Definimos qué aplicaciones y servicios puedes autorizar a revisar, qué información necesitas proteger y hasta dónde llegarán las pruebas.',
      outcome: 'Un alcance claro: qué se comprobará, con qué objetivo y qué queda fuera de la revisión.',
    },
    {
      title: 'Buscar puntos débiles',
      action: 'Examino los accesos y el comportamiento de los sistemas acordados. Analizo los posibles fallos de seguridad y su impacto en el uso de la aplicación.',
      outcome: 'Una evaluación de los problemas observados y de la información o funciones que podrían afectar.',
    },
    {
      title: 'Explicar qué mejorar',
      action: 'Documento los hallazgos, las comprobaciones realizadas y sus límites. Explico qué conviene corregir y por qué, con recomendaciones para tu equipo.',
      outcome: 'Un informe comprensible para decidir qué mejoras de seguridad atender primero.',
    },
  ],
  'ciberseguridad:osint': [
    {
      title: 'Definir la pregunta',
      action: 'Acordamos qué necesitas conocer y qué información pública resulta pertinente. Delimitamos el tema para que la investigación responda a una necesidad concreta.',
      outcome: 'Una pregunta de investigación y un alcance que orientan la búsqueda.',
    },
    {
      title: 'Contrastar las fuentes',
      action: 'Busco información en fuentes abiertas, es decir, consultables públicamente. Comparo datos, fechas y contexto para distinguir coincidencias de relaciones respaldadas.',
      outcome: 'Información organizada con sus fuentes y las dudas que todavía necesitan aclararse.',
    },
    {
      title: 'Presentar el contexto',
      action: 'Reúno los resultados en una explicación clara. Separo lo comprobado de las interpretaciones y señalo dónde la información es insuficiente.',
      outcome: 'Una visión documentada del tema para tomar decisiones con una base más clara.',
    },
  ],
  'ciberseguridad:seguridad-movil': [
    {
      title: 'Conocer tu teléfono',
      action: 'Reviso qué dispositivo utilizas, qué aplicaciones necesitas y qué buscas proteger. Compruebo su compatibilidad antes de plantear una configuración con GrapheneOS.',
      outcome: 'Una propuesta de protección ajustada al equipo y a tu uso cotidiano.',
    },
    {
      title: 'Ajustar la protección',
      action: 'Configuro las opciones de seguridad acordadas y reviso los permisos de las aplicaciones. En equipos compatibles, trabajo con GrapheneOS como sistema del teléfono.',
      outcome: 'Una configuración revisada y claridad sobre a qué información puede acceder cada aplicación.',
    },
    {
      title: 'Explicar el cuidado diario',
      action: 'Repasamos los ajustes realizados y cómo usar el teléfono con ellos. Explico prácticas para mantener la protección al instalar o utilizar aplicaciones.',
      outcome: 'Indicaciones prácticas para cuidar tu privacidad y reconocer qué permisos estás concediendo.',
    },
  ],
  'ciberseguridad:recuperacion-acceso': [
    {
      title: 'Evaluar el acceso',
      action: 'Revisamos el teléfono o la computadora propios o autorizados y el acceso que conservas. Identifico los mecanismos de recuperación disponibles y sus limitaciones.',
      outcome: 'Una evaluación de las opciones posibles antes de intervenir en el equipo o la cuenta.',
    },
    {
      title: 'Intentar la recuperación',
      action: 'Trabajo con los mecanismos de recuperación disponibles dentro del alcance autorizado. Durante el proceso considero la protección de la información del dispositivo.',
      outcome: 'Un intento de recuperación ajustado al equipo, al cifrado y a las opciones accesibles.',
    },
    {
      title: 'Revisar el resultado',
      action: 'Compruebo qué acceso pudo recuperarse y explico las limitaciones encontradas. Documento el estado final y los siguientes pasos que puedan realizarse.',
      outcome: 'Claridad sobre el acceso obtenido y lo que queda pendiente; la recuperación no está garantizada.',
    },
  ],
  'inteligencia:investigacion': [
    {
      title: 'Entender la preocupación',
      action: 'Acordamos qué amenaza, incidente o exposición necesitas comprender. Definimos qué fuentes públicas y evidencias autorizadas se pueden revisar.',
      outcome: 'Una investigación delimitada alrededor de las preguntas que necesitas responder.',
    },
    {
      title: 'Relacionar la información',
      action: 'Recopilo y contrasto información de las fuentes acordadas. Reviso su contexto para valorar qué aporta a la investigación y qué necesita más comprobaciones.',
      outcome: 'Un conjunto organizado de datos e indicios, con su procedencia y sus límites.',
    },
    {
      title: 'Explicar las conclusiones',
      action: 'Documento la información relevante y las conclusiones que permite sostener. Distingo los hechos comprobados de las hipótesis y de las preguntas abiertas.',
      outcome: 'Un informe que ayuda a entender la situación sin presentar las sospechas como certezas.',
    },
  ],
  'inteligencia:vinculos': [
    {
      title: 'Ordenar las piezas',
      action: 'Definimos qué relaciones interesa estudiar y reunimos la información disponible. Organizo eventos, dominios y datos de infraestructura dentro del alcance de la investigación.',
      outcome: 'Una base ordenada de elementos que pueden compararse entre sí.',
    },
    {
      title: 'Examinar las conexiones',
      action: 'Comparo fechas y datos compartidos para encontrar relaciones posibles. Reviso qué evidencia respalda cada conexión y dónde solo existe una coincidencia.',
      outcome: 'Relaciones explicadas con su respaldo, sin atribuir responsabilidades por una coincidencia aislada.',
    },
    {
      title: 'Documentar las relaciones',
      action: 'Presento cómo se conectan los elementos analizados y qué hipótesis surgen. Indico qué relaciones están respaldadas y cuáles requieren más información.',
      outcome: 'Un mapa de relaciones y una explicación de lo que permite concluir.',
    },
  ],
  'inteligencia:contraespionaje': [
    {
      title: 'Delimitar la revisión',
      action: 'Escucho qué señales te preocupan y acordamos qué equipos e información estás autorizado a revisar. Identificamos los accesos y datos que necesitan especial atención.',
      outcome: 'Un alcance centrado en tu preocupación y en la información que quieres proteger.',
    },
    {
      title: 'Examinar los indicios',
      action: 'Reviso indicios de software espía, accesos y exposición de información en los equipos acordados. Evalúo lo observado sin dar por confirmada una vigilancia por una sospecha.',
      outcome: 'Una valoración de los indicios encontrados, su contexto y las comprobaciones pendientes.',
    },
    {
      title: 'Reducir la exposición',
      action: 'Explico los resultados y propongo medidas para proteger dispositivos y datos. Documento qué se pudo revisar y qué límites tiene la evaluación.',
      outcome: 'Recomendaciones concretas para mejorar la protección, sin prometer detectar cualquier forma de vigilancia.',
    },
  ],
  'forense:forense-movil': [
    {
      title: 'Preparar la revisión',
      action: 'Acordamos qué teléfono y qué información se pueden examinar con autorización. Reviso el estado del dispositivo y cómo preservar las evidencias disponibles.',
      outcome: 'Un alcance de análisis y un registro del estado inicial del teléfono.',
    },
    {
      title: 'Examinar los datos',
      action: 'Analizo archivos, fotografías, registros y datos de aplicaciones que resulten accesibles. Relaciono su información y contexto para estudiar los eventos acordados.',
      outcome: 'Hallazgos organizados a partir de la información que el dispositivo permite examinar.',
    },
    {
      title: 'Explicar lo encontrado',
      action: 'Documento las evidencias y la secuencia de eventos que puedan establecerse. Señalo los vacíos de información y las limitaciones del análisis.',
      outcome: 'Un informe de los hallazgos y su contexto para comprender mejor lo ocurrido.',
    },
  ],
  'forense:whatsapp': [
    {
      title: 'Revisar qué existe',
      action: 'Acordamos el alcance y revisamos los dispositivos, exportaciones o copias disponibles con autorización. Identifico qué información de mensajería es accesible y qué protección tiene.',
      outcome: 'Una evaluación de las conversaciones y archivos que pueden formar parte del análisis.',
    },
    {
      title: 'Relacionar los mensajes',
      action: 'Examino conversaciones, adjuntos y fechas disponibles. Los relaciono con su contexto para comprender la secuencia, conservando la documentación de las evidencias.',
      outcome: 'Información de mensajería organizada por los hechos y periodos que interesa estudiar.',
    },
    {
      title: 'Presentar las evidencias',
      action: 'Documento los datos examinados y los hallazgos que permiten sostener. Explico las ausencias y límites derivados de las copias, el dispositivo o el cifrado.',
      outcome: 'Un informe basado en los datos accesibles, sin garantizar recuperar mensajes que no estén disponibles.',
    },
  ],
  'forense:computadoras': [
    {
      title: 'Conocer el equipo',
      action: 'Definimos qué computadora, información y periodo se pueden analizar con autorización. Reviso los datos accesibles y preparo su preservación y documentación.',
      outcome: 'Un alcance claro y un punto de partida documentado para el análisis.',
    },
    {
      title: 'Examinar la actividad',
      action: 'Analizo archivos, registros del equipo y datos de aplicaciones disponibles. Relaciono los rastros pertinentes para reconstruir la actividad que permitan establecer.',
      outcome: 'Hallazgos vinculados con su fuente y con los eventos que se están investigando.',
    },
    {
      title: 'Organizar los hallazgos',
      action: 'Presento las evidencias relevantes y explico su significado. Documento las conclusiones respaldadas y los periodos o datos que no pudieron revisarse.',
      outcome: 'Un informe comprensible sobre la actividad examinada y los límites de la investigación.',
    },
  ],
  'forense:recuperacion': [
    {
      title: 'Evaluar lo disponible',
      action: 'Reviso el dispositivo autorizado, el estado del almacenamiento y la información que buscas recuperar. Considero el cifrado y los datos accesibles antes de definir el alcance.',
      outcome: 'Una evaluación de posibilidades y limitaciones para tu caso.',
    },
    {
      title: 'Intentar recuperar los datos',
      action: 'Realizo la recuperación de la información que resulte accesible según el estado del equipo. Registro lo obtenido para poder revisarlo de manera organizada.',
      outcome: 'Los datos que el proceso permita recuperar, sujetos a las condiciones del almacenamiento.',
    },
    {
      title: 'Revisar lo recuperado',
      action: 'Organizo y reviso los archivos obtenidos para explicar qué se pudo recuperar. Indico qué información sigue faltando y qué limitaciones se encontraron.',
      outcome: 'Una entrega ordenada de los resultados, sin garantizar que todos los archivos puedan recuperarse.',
    },
  ],
  'forense:comunicaciones': [
    {
      title: 'Acordar el alcance',
      action: 'Definimos la pregunta de investigación, las comunicaciones que pueden examinarse y la autorización aplicable. Delimitamos el entorno y la información disponible para el trabajo.',
      outcome: 'Un alcance documentado sobre qué comunicaciones y registros pueden formar parte del análisis.',
    },
    {
      title: 'Analizar los registros',
      action: 'Examino las comunicaciones y los registros disponibles dentro del entorno autorizado. Relaciono los datos pertinentes con los hechos que se busca comprender.',
      outcome: 'Observaciones organizadas sobre las comunicaciones que pudieron analizarse.',
    },
    {
      title: 'Documentar los resultados',
      action: 'Registro las evidencias revisadas y explico qué conclusiones permiten sostener. Señalo las limitaciones de los datos y los aspectos que quedan sin determinar.',
      outcome: 'Un informe de resultados y límites para apoyar la investigación acordada.',
    },
  ],
  'radiofrecuencia:jammers': [
    {
      title: 'Definir la evaluación',
      action: 'Acordamos el objetivo y el alcance de la prueba en un laboratorio autorizado. Revisamos las condiciones y la autorización aplicable antes de plantear la evaluación.',
      outcome: 'Un alcance de laboratorio definido para estudiar el comportamiento de las señales.',
    },
    {
      title: 'Observar el comportamiento',
      action: 'Evalúo los efectos de interferencia e inhibición dentro del entorno controlado acordado. Registro cómo responden los equipos incluidos en la prueba.',
      outcome: 'Observaciones sobre el comportamiento de los equipos bajo las condiciones evaluadas.',
    },
    {
      title: 'Explicar los resultados',
      action: 'Documento lo observado durante la prueba y las condiciones en que ocurrió. Explico qué puede concluirse y qué queda fuera del alcance del laboratorio.',
      outcome: 'Un informe de la evaluación, sin extrapolar sus resultados a cualquier entorno.',
    },
  ],
  'radiofrecuencia:deteccion-rf': [
    {
      title: 'Conocer el espacio',
      action: 'Acordamos qué área puede inspeccionarse y qué preocupación motiva la revisión. Delimitamos la búsqueda de emisiones de radiofrecuencia, es decir, señales inalámbricas.',
      outcome: 'Un alcance de inspección vinculado con el espacio y la necesidad de privacidad.',
    },
    {
      title: 'Revisar las emisiones',
      action: 'Inspecciono las emisiones del área y analizo posibles transmisores activos. Una señal detectada se estudia en su contexto antes de atribuirle un propósito.',
      outcome: 'Un registro de las señales observadas y de los indicios que requieren comprobación.',
    },
    {
      title: 'Explicar lo observado',
      action: 'Documento los resultados y sus límites. Explico que una señal no identifica por sí sola quién graba y que los equipos que no transmiten requieren otras comprobaciones.',
      outcome: 'Un informe claro del entorno examinado y de las verificaciones que puedan quedar pendientes.',
    },
  ],
  'radiofrecuencia:antenas': [
    {
      title: 'Revisar los registros',
      action: 'Definimos el periodo y la pregunta de ubicación que se quiere estudiar. Reviso los registros de antenas y celdas móviles obtenidos con autorización.',
      outcome: 'Una evaluación de qué información existe y qué análisis permite realizar.',
    },
    {
      title: 'Relacionar tiempos y zonas',
      action: 'Relaciono las celdas registradas, sus tiempos y la información de ubicación disponible. Analizo las zonas que esos datos permiten estimar.',
      outcome: 'Estimaciones de ubicación ligadas a registros concretos y a sus periodos.',
    },
    {
      title: 'Presentar la estimación',
      action: 'Documento las relaciones encontradas y explico su precisión y límites. Distingo la zona estimada de una posición exacta que los datos no permitan asegurar.',
      outcome: 'Un informe de ubicación estimada, condicionado por la cobertura y los registros disponibles.',
    },
  ],
  'web:interfaces': [
    {
      title: 'Entender el recorrido',
      action: 'Acordamos qué necesita hacer la persona que utilizará la aplicación. Definimos las pantallas, la información y los estados que aparecen durante ese recorrido.',
      outcome: 'Una estructura clara de la experiencia que se va a construir.',
    },
    {
      title: 'Construir las pantallas',
      action: 'Desarrollo las interfaces para distintos tamaños de pantalla. Conecto sus acciones con los servicios que proporcionan o reciben la información de la aplicación.',
      outcome: 'Pantallas que muestran información y permiten realizar las acciones acordadas.',
    },
    {
      title: 'Revisar la experiencia',
      action: 'Recorro las pantallas y compruebo cómo responden durante el uso. Presento su funcionamiento y los estados de carga, respuesta o error incluidos.',
      outcome: 'Una interfaz revisada y una explicación de los recorridos que ya están disponibles.',
    },
  ],
  'web:backend': [
    {
      title: 'Definir las reglas',
      action: 'Acordamos qué información debe manejar el sistema y qué debe ocurrir cuando recibe una solicitud. Definimos las reglas del negocio y las conexiones necesarias.',
      outcome: 'Una descripción de cómo debe responder la parte interna de la aplicación.',
    },
    {
      title: 'Conectar datos y acciones',
      action: 'Construyo la lógica y los servicios que procesan las solicitudes. Desarrollo las conexiones mediante APIs, los puntos de comunicación entre la interfaz y otros sistemas.',
      outcome: 'Servicios que gestionan la información y ejecutan las reglas acordadas.',
    },
    {
      title: 'Comprobar las respuestas',
      action: 'Reviso cómo responden los servicios ante los casos previstos. Explico las operaciones disponibles y la información que necesita enviar o recibir la interfaz.',
      outcome: 'Un funcionamiento revisado y referencias claras para conectar el resto del producto.',
    },
  ],
  'web:entornos': [
    {
      title: 'Identificar las piezas',
      action: 'Revisamos qué servicios y configuraciones necesita la aplicación para funcionar. Definimos cómo organizar su código y su entorno de ejecución.',
      outcome: 'Una relación de los componentes necesarios para preparar el proyecto.',
    },
    {
      title: 'Preparar el entorno',
      action: 'Organizo los servicios con Docker, que permite describir sus entornos en contenedores. Utilizo Git para mantener registrado el historial de cambios del código.',
      outcome: 'Un entorno configurado y un proyecto con sus cambios organizados.',
    },
    {
      title: 'Explicar cómo iniciarlo',
      action: 'Compruebo el funcionamiento de los servicios y documento su configuración acordada. Explico cómo iniciar el entorno y dónde se organiza el código.',
      outcome: 'Indicaciones para volver a preparar el entorno y continuar el desarrollo.',
    },
  ],
  'movil:flutter': [
    {
      title: 'Definir las pantallas',
      action: 'Acordamos qué hará la aplicación y cómo pasará una persona de una pantalla a otra. Identificamos los datos y las acciones de cada recorrido.',
      outcome: 'Una estructura de pantallas y funciones que orienta el desarrollo móvil.',
    },
    {
      title: 'Construir la aplicación',
      action: 'Desarrollo interfaces y componentes con Flutter. Conecto la navegación y los datos para que las pantallas respondan a las acciones de quien usa la aplicación.',
      outcome: 'Los recorridos y funciones acordados integrados en la aplicación.',
    },
    {
      title: 'Recorrer lo construido',
      action: 'Reviso las pantallas, sus cambios de estado y la conexión con servicios. Presento cómo se utilizan las funciones y qué se ha incluido en esta entrega.',
      outcome: 'Una aplicación revisada en los recorridos acordados y una explicación de su funcionamiento.',
    },
  ],
  'movil:java': [
    {
      title: 'Acordar el comportamiento',
      action: 'Definimos qué función necesita la aplicación y qué datos utiliza. Aclaramos cómo debe responder ante las acciones de la persona que la usa.',
      outcome: 'Reglas y resultados esperados para la funcionalidad móvil.',
    },
    {
      title: 'Desarrollar la lógica',
      action: 'Programo con Java el comportamiento acordado y organizo sus componentes. Conecto la función con los datos que necesita recibir o actualizar.',
      outcome: 'Una funcionalidad que integra acciones, reglas e información dentro de la aplicación.',
    },
    {
      title: 'Comprobar el resultado',
      action: 'Reviso la respuesta de la función en los escenarios previstos. Explico su uso, su relación con el resto de la aplicación y el alcance entregado.',
      outcome: 'La funcionalidad revisada y una descripción clara de lo que permite hacer.',
    },
  ],
  'movil:integracion': [
    {
      title: 'Definir el intercambio',
      action: 'Acordamos qué información necesita enviar o recibir el teléfono y qué servicio la proporciona. Revisamos las conexiones disponibles mediante APIs.',
      outcome: 'Un recorrido definido para los datos entre la aplicación y sus servicios.',
    },
    {
      title: 'Conectar la aplicación',
      action: 'Integro las peticiones y respuestas con las pantallas. Preparo los estados de carga y el tratamiento de errores para que la persona sepa qué está ocurriendo.',
      outcome: 'Una aplicación conectada que informa del estado de las operaciones.',
    },
    {
      title: 'Revisar el recorrido',
      action: 'Compruebo el intercambio de información y las respuestas previstas. Explico cómo se comporta la aplicación cuando recibe datos o encuentra un error.',
      outcome: 'Una integración revisada y claridad sobre el comportamiento visible para el usuario.',
    },
  ],
  'qa:playwright': [
    {
      title: 'Elegir qué comprobar',
      action: 'Seleccionamos los recorridos que interesa proteger y definimos sus resultados esperados. Preparo los escenarios que las pruebas deben reproducir.',
      outcome: 'Una lista de acciones y comprobaciones vinculadas con el uso de la aplicación.',
    },
    {
      title: 'Automatizar el recorrido',
      action: 'Utilizo Playwright para reproducir acciones y comprobar sus resultados de principio a fin. Las pruebas recorren los pasos acordados como parte de un mismo flujo.',
      outcome: 'Pruebas automatizadas que permiten repetir las comprobaciones de los recorridos seleccionados.',
    },
    {
      title: 'Explicar los fallos',
      action: 'Reviso qué comprobaciones se cumplen y cuáles fallan. Documento los resultados y el punto del recorrido donde se observó cada problema.',
      outcome: 'Evidencias para investigar errores y volver a comprobarlos después de una corrección.',
    },
  ],
  'qa:pruebas-funcionales': [
    {
      title: 'Definir lo esperado',
      action: 'Acordamos cómo debería funcionar cada parte del producto. Preparo escenarios de uso y situaciones límite, como entradas incompletas o resultados vacíos.',
      outcome: 'Casos de prueba con una referencia clara de la respuesta esperada.',
    },
    {
      title: 'Probar las funciones',
      action: 'Recorro los escenarios y comparo el resultado real con el esperado. Reviso las diferencias y reúno los pasos necesarios para reproducir los errores observados.',
      outcome: 'Una revisión del comportamiento del producto en los casos seleccionados.',
    },
    {
      title: 'Documentar los errores',
      action: 'Organizo los hallazgos con su contexto y los pasos para volver a observarlos. Explico qué funciones se comprobaron y cuáles quedaron fuera.',
      outcome: 'Un registro de incidencias que facilita al equipo entender y corregir los problemas.',
    },
  ],
  'qa:regresion': [
    {
      title: 'Revisar qué cambió',
      action: 'Identificamos la modificación y los recorridos existentes que podrían verse afectados. Seleccionamos qué comportamientos deben volver a comprobarse.',
      outcome: 'Un conjunto de pruebas enfocado en las funciones que deben seguir funcionando.',
    },
    {
      title: 'Repetir las comprobaciones',
      action: 'Ejecuto los recorridos seleccionados después del cambio. Comparo los resultados con lo esperado y reviso si reaparecen problemas conocidos.',
      outcome: 'Resultados actualizados sobre los recorridos incluidos en la revisión.',
    },
    {
      title: 'Informar qué sigue pendiente',
      action: 'Documento las comprobaciones realizadas y las incidencias encontradas. Explico qué se mantiene funcionando y qué necesita atención o una nueva revisión.',
      outcome: 'Información concreta para valorar el cambio y dar seguimiento a los errores.',
    },
  ],
  'automatizacion:flujos-con-n8n': [
    {
      title: 'Describir la tarea',
      action: 'Recorremos cómo realizas hoy el trabajo y qué evento lo inicia. Acordamos los pasos repetitivos, la información necesaria y el resultado que esperas obtener.',
      outcome: 'Una secuencia clara del proceso que se quiere automatizar.',
    },
    {
      title: 'Conectar los pasos',
      action: 'Construyo el flujo con n8n para encadenar acciones entre herramientas. Preparo las transformaciones que necesita la información al pasar de un paso a otro.',
      outcome: 'Un flujo que coordina las tareas y el intercambio de información acordados.',
    },
    {
      title: 'Revisar el proceso completo',
      action: 'Compruebo el recorrido desde el evento inicial hasta su resultado. Explico qué hace cada paso y qué debes revisar al utilizar el flujo.',
      outcome: 'Una automatización revisada y una explicación práctica de su funcionamiento.',
    },
  ],
  'automatizacion:integraciones': [
    {
      title: 'Definir qué compartir',
      action: 'Acordamos qué aplicaciones deben intercambiar información y cuándo. Revisamos sus conexiones disponibles y qué datos necesita cada una.',
      outcome: 'Un intercambio definido entre las herramientas que forman parte del proceso.',
    },
    {
      title: 'Preparar la conexión',
      action: 'Conecto los servicios mediante APIs y avisos automáticos llamados webhooks. Adapto la información para que la aplicación de destino pueda utilizarla.',
      outcome: 'Servicios conectados para recibir eventos y enviar los datos acordados.',
    },
    {
      title: 'Comprobar el intercambio',
      action: 'Reviso que los datos recorran la conexión y lleguen con el formato previsto. Explico qué inicia el intercambio y cuál es su resultado.',
      outcome: 'Una integración revisada y un recorrido de información comprensible para tu equipo.',
    },
  ],
  'automatizacion:ia-en-procesos': [
    {
      title: 'Elegir la tarea',
      action: 'Definimos qué parte del proceso puede apoyarse en un modelo de IA. Acordamos la información de entrada y cómo revisar si la respuesta resulta útil.',
      outcome: 'Un uso concreto para la IA y criterios para evaluar sus resultados.',
    },
    {
      title: 'Integrar el modelo',
      action: 'Conecto el modelo o agente con el flujo de trabajo y preparo la información que recibe. Organizo cómo se incorpora su respuesta al siguiente paso.',
      outcome: 'Una etapa de IA integrada en el proceso acordado.',
    },
    {
      title: 'Revisar las respuestas',
      action: 'Evalúo los resultados con los ejemplos acordados y explico sus límites. Señalo qué respuestas necesitan revisión antes de utilizarse en el trabajo.',
      outcome: 'Un flujo evaluado y pautas para revisar la información que genera el modelo.',
    },
  ],
  'ia:modelos-locales': [
    {
      title: 'Conocer el equipo',
      action: 'Acordamos qué tarea debe apoyar el modelo y revisamos los recursos disponibles. Definimos el entorno donde se configurará la IA local.',
      outcome: 'Una propuesta ajustada al equipo y al uso que quieres explorar.',
    },
    {
      title: 'Configurar el modelo',
      action: 'Preparo el entorno y configuro el modelo de lenguaje para ejecutarlo localmente. Pruebo que reciba entradas y genere respuestas dentro de esa configuración.',
      outcome: 'Un entorno de IA local configurado para las pruebas acordadas.',
    },
    {
      title: 'Explicar su funcionamiento',
      action: 'Revisamos las respuestas obtenidas y el comportamiento del entorno. Documento cómo utilizarlo y qué límites se observaron para la tarea elegida.',
      outcome: 'Indicaciones de uso y una evaluación inicial de lo que el modelo puede aportar.',
    },
  ],
  'ia:agentes': [
    {
      title: 'Definir la tarea',
      action: 'Acordamos qué trabajo debe apoyar el agente y qué herramientas necesita utilizar. Definimos el resultado esperado y los límites de su intervención.',
      outcome: 'Una tarea delimitada y una relación clara de las herramientas que se conectarán.',
    },
    {
      title: 'Conectar las herramientas',
      action: 'Configuro el agente para combinar el modelo con las herramientas acordadas. Pruebo cómo recibe la tarea, utiliza esas conexiones y presenta el resultado.',
      outcome: 'Un agente configurado para apoyar el recorrido de trabajo previsto.',
    },
    {
      title: 'Evaluar su respuesta',
      action: 'Reviso los resultados de los ejemplos probados y explico las limitaciones observadas. Documentamos qué debe comprobar una persona antes de usar la respuesta.',
      outcome: 'Una explicación del agente y criterios para supervisar sus resultados.',
    },
  ],
  'ia:aplicacion': [
    {
      title: 'Preparar un caso de uso',
      action: 'Elegimos una tarea real del proceso y acordamos qué información recibirá el modelo local. Definimos cómo comparar su respuesta con la necesidad del trabajo.',
      outcome: 'Un caso concreto y criterios para decidir si la integración resulta útil.',
    },
    {
      title: 'Conectar la IA local',
      action: 'Preparo las entradas y conecto el modelo con el proceso propio. Organizo cómo se recibe su respuesta para que pueda revisarse y utilizarse.',
      outcome: 'Un recorrido que incorpora el modelo local a la tarea acordada.',
    },
    {
      title: 'Valorar el resultado',
      action: 'Revisamos las respuestas y si aportan al caso de uso elegido. Explico los límites observados y qué conviene ajustar antes de ampliar su utilización.',
      outcome: 'Una evaluación práctica de la integración y próximos ajustes fundamentados en sus resultados.',
    },
  ],
  'bots:granjas-de-bots': [
    {
      title: 'Preparar las instancias',
      action: 'Definimos las tareas que harán los bots y los sistemas donde pueden trabajar. Configuro los servidores y los entornos separados en los que se ejecutará cada programa, ajustando sus recursos y permisos.',
      outcome: 'Una base de ejecución organizada: cada bot tiene una tarea, un entorno y recursos asignados.',
    },
    {
      title: 'Repartir el trabajo',
      action: 'Organizo una cola de tareas, es decir, una lista de trabajos pendientes. Los bots reciben trabajo conforme quedan disponibles. Configuro horarios, límites de ejecución y reintentos controlados cuando una tarea falla.',
      outcome: 'Las tareas se distribuyen entre los bots con un ritmo definido y seguimiento de lo que queda pendiente.',
    },
    {
      title: 'Supervisar los bots',
      action: 'Compruebo el estado de las instancias y sus registros de actividad. Preparo controles para pausar, reiniciar y revisar un bot con errores, y explico cómo seguir la operación desde el punto de administración.',
      outcome: 'Visibilidad del trabajo realizado, los fallos y las acciones necesarias para mantener la operación.',
    },
  ],
  'bots:proxies': [
    {
      title: 'Definir las conexiones',
      action: 'Identifico qué aplicaciones necesitan un intermediario y a qué servicios deben conectarse. Preparo los proxies y asigno las rutas de cada proceso según el entorno de trabajo.',
      outcome: 'Un recorrido definido desde cada aplicación, pasando por su proxy, hasta el servicio correspondiente.',
    },
    {
      title: 'Controlar el acceso',
      action: 'Configuro las credenciales de acceso, los destinos permitidos y los límites de uso. Compruebo que las aplicaciones autorizadas puedan conectarse y que las solicitudes fuera de las reglas se detengan.',
      outcome: 'Conexiones administradas con reglas claras sobre quién puede usarlas y para qué destinos.',
    },
    {
      title: 'Comprobar las respuestas',
      action: 'Realizo solicitudes de prueba para revisar tiempos de respuesta, disponibilidad y errores de conexión. Configuro el seguimiento de fallos y explico cómo retirar o reemplazar un proxy que deja de responder.',
      outcome: 'Un registro de las comprobaciones y una forma de identificar y atender conexiones con problemas.',
    },
  ],
  'comunicacion:comunicacion-estrategica': [
    {
      title: 'Diagnóstico y humor social',
      action: 'Analizo el escenario político, las demandas del electorado y la posición del candidato o gobernante frente a sus adversarios. Identifico qué temas generan indignación, cuáles despiertan esperanza y qué narrativa elevará su aprobación popular.',
      outcome: 'Diagnóstico estratégico de opinión pública: mapa de demandas ciudadanas, fortalezas del líder y ejes de contraste político.',
    },
    {
      title: 'Construir la narrativa de poder',
      action: 'Defino el mensaje fuerza, el posicionamiento de liderazgo y las líneas de ataque y defensa. Traduzco la visión política en discursos, spots y argumentos sólidos para conectar emocionalmente con los votantes y ganar su respaldo.',
      outcome: 'Narrativa electoral y de gobierno: mensajes clave, guiones discursivos y argumentos contundentes para el debate público.',
    },
    {
      title: 'Blindaje y disciplina del mensaje',
      action: 'Alineo la comunicación en redes, medios tradicionales y voceros para sostener una postura firme y coherente. Implemento protocolos de respuesta rápida ante guerra sucia y crisis mediáticas para proteger la reputación y blindar la aprobación.',
      outcome: 'Estrategia de blindaje y vocería: control de la agenda pública y protocolos de defensa ante crisis políticas.',
    },
  ],
  'comunicacion:estrategia-digital': [
    {
      title: 'Mapeo del electorado',
      action: 'Examino la presencia digital del político o la administración y analizo el comportamiento de los votantes. Identifico qué segmentos de la población están desencantados, qué dudas tienen y qué propuestas despiertan entusiasmo electoral.',
      outcome: 'Mapa de audiencias y segmentos electorales prioritarios para enfocar la persuasión, el voto y la legitimidad.',
    },
    {
      title: 'Articulación de campaña y gestión',
      action: 'Conecto las actividades de territorio (recorridos, mítines, obras de gobierno) con contenidos digitales de alto impacto. Defino cómo cada acción política se traduce en cercanía, confianza y aprobación ciudadana en cada canal.',
      outcome: 'Ecosistema de comunicación política articulado entre el trabajo de campo y la influencia en redes sociales.',
    },
    {
      title: 'Plan de movilización y aprobación',
      action: 'Diseño el plan de acción con metas de aprobación, fechas clave de la campaña o gestión de gobierno e indicadores de impacto en encuestas. Asigno responsabilidades para asegurar una ejecución disciplinada e impecable.',
      outcome: 'Hoja de ruta estratégica con cronograma de hitos políticos, metas de respaldo popular e indicadores de seguimiento.',
    },
  ],
  'comunicacion:campanas-en-redes': [
    {
      title: 'Plan de campaña electoral',
      action: 'Diseño la estrategia de lanzamiento y el calendario de piezas de campaña o defensa de gobierno. Defino los spots, los mensajes de contraste político, la microsegmentación territorial y la pauta publicitaria para maximizar el alcance.',
      outcome: 'Calendario táctico de campaña con piezas estratégicas, ejes temáticos y presupuesto de pauta electoral optimizado.',
    },
    {
      title: 'Despliegue y defensa activa',
      action: 'Lanzo las publicaciones y spots en los momentos de mayor impacto, monitoreo la reacción ciudadana y coordino respuestas inmediatas. Neutralizo desinformación y ataques de la oposición mientras movilizo a las bases de apoyo.',
      outcome: 'Operación activa de campaña en redes: dominio de la narrativa, defensa reputacional y movilización de simpatizantes.',
    },
    {
      title: 'Medición de aprobación y ajuste',
      action: 'Mido el alcance, la conversación social y el impacto de los mensajes en la intención de voto y los índices de aprobación. Ajusto la estrategia discursiva y táctica para mantener la ventaja en el escenario político.',
      outcome: 'Balance de impacto político: análisis de sentimiento, aprobación ganada y recomendaciones tácticas inmediatas.',
    },
  ],
  'drones:operacion': [
    {
      title: 'Preparar el equipo',
      action: 'Acordamos el objetivo de la operación y reviso las condiciones de funcionamiento del dron. Compruebo la preparación del equipo antes de su uso.',
      outcome: 'Una revisión inicial y claridad sobre las condiciones observadas antes de operar.',
    },
    {
      title: 'Realizar la operación',
      action: 'Manejo el dron durante el recorrido acordado y observo su respuesta. Mantengo la atención en el comportamiento del equipo durante la operación.',
      outcome: 'La operación prevista y observaciones sobre cómo se comportó el dron.',
    },
    {
      title: 'Revisar después del uso',
      action: 'Examino el estado del equipo al terminar y recojo las observaciones de la operación. Explico cualquier aspecto que deba revisarse antes de volver a utilizarlo.',
      outcome: 'Un resumen del uso realizado y de las revisiones que puedan quedar pendientes.',
    },
  ],
  'drones:construccion': [
    {
      title: 'Definir el conjunto',
      action: 'Acordamos qué dron se quiere construir y qué componentes formarán parte del diseño. Reviso cómo deben integrarse para el funcionamiento previsto.',
      outcome: 'Un diseño y una selección de componentes orientados al equipo que se va a construir.',
    },
    {
      title: 'Ensamblar las piezas',
      action: 'Realizo el ensamblaje y conecto los componentes del dron. Preparo la configuración inicial para que el conjunto pueda pasar a su comprobación.',
      outcome: 'Un equipo ensamblado y configurado para la siguiente etapa de revisión.',
    },
    {
      title: 'Presentar el equipo',
      action: 'Reviso la integración y explico la configuración realizada. Documento qué está preparado y qué comprobaciones necesita el conjunto antes de operar.',
      outcome: 'El equipo construido con una explicación de su estado y los pasos de puesta a punto pendientes.',
    },
  ],
  'drones:puesta-a-punto': [
    {
      title: 'Revisar las conexiones',
      action: 'Examino el estado de los componentes y sus conexiones. Acordamos qué comportamiento debe comprobarse antes de preparar la operación del dron.',
      outcome: 'Una revisión inicial de las piezas y de los puntos que necesitan atención.',
    },
    {
      title: 'Ajustar el conjunto',
      action: 'Realizo los ajustes de configuración necesarios dentro del alcance acordado. Compruebo la respuesta del equipo mediante pruebas de funcionamiento.',
      outcome: 'Un conjunto ajustado y observaciones sobre su comportamiento en las pruebas realizadas.',
    },
    {
      title: 'Explicar el estado final',
      action: 'Documento los ajustes y los resultados de las comprobaciones. Explico qué quedó preparado y qué necesita atención antes de la operación prevista.',
      outcome: 'Una descripción clara del estado del dron y de las revisiones pendientes.',
    },
  ],
};
