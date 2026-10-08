/* Narrative illustrations for the portfolio. All scenes describe a review process,
   never a real finding or a guarantee of protection. No animation runtime required. */
(() => {
  'use strict';

  let serial = 0;
  const path = (d, extra = '') => `<path class="ps-line ${extra}" d="${d}"/>`;
  const rect = (x, y, width, height, extra = '', radius = 10) => `<rect class="ps-surface ${extra}" x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}"/>`;
  const circle = (x, y, radius, extra = '') => `<circle class="ps-line ${extra}" cx="${x}" cy="${y}" r="${radius}"/>`;
  const label = (x, y, value, extra = '') => `<text class="ps-label ${extra}" x="${x}" y="${y}">${value}</text>`;
  const group = (content, extra = '', delay = 0) => `<g class="ps-enter ${extra}" style="--ps-delay:${delay}ms">${content}</g>`;
  const route = (d, delay = 0) => `${path(d, 'ps-route')}<path class="ps-route-review" d="${d}" pathLength="100" style="--ps-delay:${delay}ms"/>`;

  function lock(x, y, scale = 1) {
    return `<g transform="translate(${x} ${y}) scale(${scale})">${path('M-12-1v-9a12 12 0 0 1 24 0v9', 'ps-amber')}${rect(-19, -1, 38, 31, 'ps-lock', 7)}${circle(0, 11, 3, 'ps-amber')}${path('M0 14v5', 'ps-amber')}</g>`;
  }

  function phone(x, y, width = 90, height = 155, content = '') {
    return `${rect(x, y, width, height, 'ps-device', 15)}${rect(x + 7, y + 8, width - 14, height - 16, 'ps-screen', 10)}
      ${path(`M${x + width * .39} ${y + 15}h${width * .22}`, 'ps-device-detail')}
      ${path(`M${x + width * .38} ${y + height - 10}h${width * .24}`, 'ps-device-detail')}${content}`;
  }

  function document(x, y, width = 95, height = 117, extra = '') {
    const fold = Math.min(23, width * .2);
    return `<g class="${extra}"><path class="ps-paper" d="M${x} ${y}h${width - fold}l${fold} ${fold}v${height - fold}H${x}Z"/>
      ${path(`M${x + width - fold} ${y}v${fold}h${fold}`, 'ps-paper-line')}
      ${path(`M${x + 15} ${y + 36}h${width - 31}M${x + 15} ${y + 50}h${width - 40}M${x + 15} ${y + 64}h${width - 31}`, 'ps-paper-line')}
      ${path(`M${x + 15} ${y + height - 24}h${Math.max(14, width - 56)}`, 'ps-paper-accent')}</g>`;
  }

  function laptop(x, y, width = 209, height = 139, content = '') {
    return `${rect(x, y, width, height, 'ps-device', 11)}${rect(x + 8, y + 9, width - 16, height - 22, 'ps-screen', 5)}
      <circle class="ps-device-camera" cx="${x + width / 2}" cy="${y + 4.5}" r="1.5"/>
      ${content}<path class="ps-laptop-base" d="M${x} ${y + height}h${width}l16 12q0 6-11 6H${x - 5}q-11 0-11-6Z"/>
      ${path(`M${x + width / 2 - 19} ${y + height + 3}h38`, 'ps-device-detail')}`;
  }

  function lens(x, y, radius = 35, extra = '', reverseHandle = false) {
    const direction = reverseHandle ? -1 : 1;
    return `<g class="${extra}"><circle class="ps-lens-glass" cx="${x}" cy="${y}" r="${radius}"/>
      ${circle(x, y, radius - 6, 'ps-lens-inner')}${path(`M${x + direction * radius * .69} ${y + radius * .69}l${26 * direction} 27`, 'ps-lens-handle')}
      ${path(`M${x - radius * .54} ${y - radius * .06}a${radius * .6} ${radius * .6} 0 0 1 ${radius * .4} ${-radius * .47}`, 'ps-glass-glint')}</g>`;
  }

  function bubble(x, y, width, extra = '', reverse = false) {
    const tailStart = reverse ? x + width - 37 : x + 35;
    const tailEnd = reverse ? x + width - 21 : x + 21;
    return `<g class="${extra}"><path class="ps-message" d="M${x + 10} ${y}H${x + width - 10}q10 0 10 10v27q0 10-10 10H${tailStart}L${tailEnd} ${y + 60}V${y + 47}H${x + 10}q-10 0-10-10V${y + 10}q0-10 10-10Z"/>
      ${path(`M${x + 14} ${y + 18}h${width - 28}M${x + 14} ${y + 30}h${width - 45}`, 'ps-message-line')}</g>`;
  }

  const scenes = {
    equipos(uid) {
      return `${group(path('M77 346h562', 'ps-ground'))}
        ${group(laptop(96, 114, 298, 198, `${rect(119, 141, 94, 127, 'ps-panel', 5)}${lock(166, 193, 1.1)}${path('M234 152h132M234 172h96M234 209h116M234 229h83M234 265h105', 'ps-interface-line')}`), '', 180)}
        ${group(phone(515, 88, 99, 190, `${rect(531, 123, 67, 34, 'ps-panel', 5)}${circle(545, 139, 5, 'ps-teal')}${path('M558 136h28M558 144h20', 'ps-interface-line')}${rect(531, 169, 67, 77, 'ps-panel', 5)}${[186, 207, 228].map((y, i) => `${path(`M540 ${y}h22`, 'ps-interface-line')}${rect(575, y - 5, 14, 9, i === 1 ? 'ps-toggle-muted' : 'ps-toggle', 4)}`).join('')}`), '', 290)}
        ${route('M394 213h58V168h62', 500)}
        <g clip-path="url(#${uid}-phone-screen)"><g class="ps-device-review"><rect class="ps-review-band" x="527" y="144" width="75" height="22"/>${path('M529 166h72', 'ps-amber')}</g></g>
        ${group(lens(565, 183, 31, 'ps-device-lens'), '', 450)}
        ${label(98, 77, 'Computadora')}${label(507, 56, 'Teléfono')}${label(116, 387, 'Blindaje y cifrado')}${label(472, 387, 'Anti-extracción')}`;
    },

    conversaciones() {
      return `${group(`${phone(87, 96, 126, 240, `${rect(105, 137, 90, 54, 'ps-panel', 4)}${path('M117 154h64M117 167h44M110 246h80M110 260h55', 'ps-interface-line')}`)}${phone(507, 96, 126, 240, `${rect(525, 235, 90, 54, 'ps-panel', 4)}${path('M537 252h64M537 265h44M530 148h80M530 162h55', 'ps-interface-line')}`)}`)}
        ${route('M214 181H505', 600)}${route('M505 260H214', 2000)}
        ${group(bubble(252, 120, 110, 'ps-message-outgoing'), '', 240)}${group(bubble(370, 280, 108, 'ps-message-incoming', true), '', 370)}
        ${group(`${circle(360, 220, 44, 'ps-channel-seal')}${lock(360, 209, .95)}`, '', 450)}
        ${label(89, 63, 'Tu dispositivo')}${label(508, 63, 'Tu contacto')}${label(184, 392, 'Canal blindado y anti-intercepción')}`;
    },

    ubicacion(uid) {
      return `${group(`${path('M72 349h576', 'ps-ground')}${rect(294, 100, 329, 220, 'ps-map', 16)}
        <g clip-path="url(#${uid}-map)">${path('M294 151h94l48 47h187M365 100v104l49 45v71M294 278h77l83-80V100M543 100v62l-47 47v111M294 221h89M551 232h72', 'ps-map-street')}${path('M579 99q-27 77-3 131t-13 90', 'ps-map-river')}</g>
        ${rect(309, 117, 41, 21, 'ps-map-block', 4)}${rect(457, 115, 64, 29, 'ps-map-block', 4)}${rect(432, 267, 45, 36, 'ps-map-block', 4)}${rect(558, 246, 46, 35, 'ps-map-block', 4)}`)}
        ${group(phone(85, 93, 150, 242, `${rect(101, 129, 118, 85, 'ps-photo-frame', 4)}<path class="ps-photo-mountain" d="M102 202 133 160 163 188 191 168 218 199v14H102Z"/><circle class="ps-photo-sun" cx="195" cy="148" r="7"/>${path('M106 239h101M106 256h73M106 287h89', 'ps-interface-line')}`), '', 190)}
        ${route('M235 250h38v-29h154', 600)}
        ${group(`<g class="ps-location-clue"><path class="ps-pin" d="M448 163a23 23 0 0 0-23 23c0 18 23 42 23 42s23-24 23-42a23 23 0 0 0-23-23Z"/>${circle(448, 186, 7, 'ps-pin-center')}</g>`, '', 300)}
        ${group(lens(500, 240, 42, 'ps-location-lens'), '', 440)}
        ${label(86, 63, 'Publicaciones')}${label(99, 388, 'Fotos y aplicaciones')}${label(383, 388, 'Rastreo neutralizado')}`;
    },

    reuniones() {
      return `${group(`${path('M605 258V89H95v254h510v-20', 'ps-floorplan')}${path('M605 323h-65a65 65 0 0 1 65-65', 'ps-door-swing')}${path('M141 89h119M422 89h122', 'ps-window-line')}`)}
        ${group(`${[220, 330, 440].map(x => `${rect(x, 130, 54, 29, 'ps-chair', 5)}${rect(x, 275, 54, 29, 'ps-chair', 5)}`).join('')}${rect(196, 168, 324, 100, 'ps-meeting-table', 10)}${rect(220, 193, 54, 47, 'ps-paper', 3)}${path('M228 204h36M228 217h29M228 230h34', 'ps-paper-line')}${rect(431, 190, 28, 53, 'ps-handset', 5)}${circle(359, 218, 15, 'ps-microphone')}${circle(359, 218, 6, 'ps-teal')}`, '', 150)}
        ${group(lens(520, 207, 39, 'ps-room-inspection'), '', 450)}
        ${label(97, 56, 'Sala de reuniones')}${label(113, 389, 'Barrido y micrófonos')}${label(494, 389, 'Espacio seguro')}`;
    },

    filtraciones() {
      return `${group(`${path('M66 351h589', 'ps-ground')}${route('M285 166h-51v61h-27', 900)}${route('M424 166h62v-9h49', 2200)}`)}
        ${group(laptop(78, 204, 133, 94, `${path('M94 226h99M94 244h72M94 265h87', 'ps-interface-line')}`), '', 110)}${group(phone(535, 100, 95, 180, `${path('M551 145h61M551 165h44M551 204h61M551 224h44', 'ps-interface-line')}`), '', 200)}
        ${group(document(285, 93, 139, 166), '', 200)}
        ${group(lens(402, 254, 37, 'ps-document-inspection', true), '', 480)}
        ${label(286, 64, 'Documento')}${label(81, 387, 'Accesos')}${label(470, 387, 'Registros de actividad')}`;
    },

    incidentes() {
      return `${group(`${path('M77 350h570', 'ps-ground')}<path class="ps-folder-back" d="M83 136v-23q0-9 10-9h49l16 17h86q11 0 11 10v111H83Z"/><path class="ps-folder" d="M87 143h51l8 9 10-14 11 19 9-14h85l-13 100H98Z"/>${path('M152 174l12 12-11 14 17 13', 'ps-folder-tear')}`)}
        ${group(`${rect(92, 274, 150, 53, 'ps-panel', 4)}${path('M108 289h117M108 304h81M108 317h98', 'ps-interface-line')}`, '', 120)}
        ${group(laptop(429, 105, 207, 139, `${rect(449, 127, 63, 87, 'ps-panel', 6)}${path('M461 143h38M461 156h25M461 171h35M461 186h27', 'ps-interface-line')}${path('M527 141h85M527 157h65M527 185h77M527 201h54', 'ps-interface-line')}${circle(535, 220, 3, 'ps-teal')}${circle(547, 220, 3, 'ps-teal')}`), '', 200)}
        ${route('M252 183h165', 1000)}
        ${group(document(284, 133, 66, 94, 'ps-evidence-sheet ps-evidence-one'), '', 280)}
        ${group(document(335, 201, 66, 94, 'ps-evidence-sheet ps-evidence-two'), '', 370)}
        ${group(`<path class="ps-archive-back" d="M457 285h149v-10h-30l-8-12h-41l-8 12h-62Z"/>${[0, 1, 2].map(i => rect(469 + i * 33, 276 + i * 3, 39, 43, 'ps-evidence-tab', 4)).join('')}<path class="ps-archive-front" d="M449 301h165l-9 53H458Z"/>${rect(500, 319, 64, 18, 'ps-archive-label', 3)}${path('M511 328h42', 'ps-paper-line')}`, '', 480)}
        ${label(85, 76, 'Archivos afectados')}${label(435, 79, 'Análisis del equipo')}${label(410, 395, 'Evidencias ordenadas')}`;
    },
  };

  // Enlarged details explain a different part of the service at each selected step.
  function accountReview() {
    const rows = ['Sesiones abiertas', 'Equipos vinculados', 'Recuperación de cuenta'];
    return `${group(laptop(77, 101, 350, 222, rows.map((row, i) => `${circle(103, 155 + i * 54, 5, 'ps-teal')}${label(121, 163 + i * 54, row, 'ps-detail-label')}${path(`M99 ${177 + i * 54}h295`, 'ps-ground')}`).join('')))}
      ${group(phone(527, 107, 112, 208, `${lock(583, 174, 1)}${path('M548 244h68M548 260h45', 'ps-interface-line')}`), '', 150)}
      ${route('M427 210h98', 700)}${group(lens(374, 182, 33, 'ps-device-lens'), '', 200)}
      ${label(79, 64, 'Revisión de accesos')}${label(481, 374, 'Cuenta y dispositivo')}`;
  }

  function permissionReview() {
    const rows = ['Cámara y micrófono', 'Ubicación', 'Archivos y contactos'];
    return `${group(phone(80, 87, 160, 262, `${circle(160, 176, 37, 'ps-teal')}${lock(160, 164, .9)}${path('M107 246h106M107 266h77M107 288h92', 'ps-interface-line')}`))}
      ${group(rect(300, 111, 349, 211, 'ps-panel', 5), '', 100)}
      ${rows.map((row, i) => `${label(318, 154 + i * 62, row, 'ps-detail-label')}${path(`M318 ${170 + i * 62}h222`, 'ps-ground')}${rect(578, 136 + i * 62, 48, 24, 'ps-toggle-muted', 12)}<circle class="ps-permission-choice" cx="${i === 1 ? 591 : 612}" cy="${148 + i * 62}" r="7" style="--ps-delay:${i * 350}ms"/>`).join('')}
      ${route('M241 223h57', 700)}${label(84, 62, 'Tu teléfono')}${label(311, 78, 'Permisos que revisamos')}${label(290, 377, 'Ajustes acordados según tu uso')}`;
  }

  function conversationAccess() {
    return `${group(phone(289, 99, 139, 243, `${bubble(307, 148, 95)}${path('M312 240h94M312 263h63', 'ps-interface-line')}`))}
      ${group(laptop(69, 112, 137, 97, `${path('M88 146h97M88 162h65M88 182h81', 'ps-interface-line')}`), '', 120)}
      ${group(`${rect(513, 117, 132, 174, 'ps-device', 9)}${rect(524, 130, 110, 145, 'ps-screen', 5)}${bubble(538, 162, 81)}${circle(579, 282, 2, 'ps-teal')}`, '', 220)}
      ${route('M206 164h81', 400)}${route('M429 209h82', 1400)}
      ${group(`${circle(201, 306, 27, 'ps-channel-seal')}${path('M186 306h30M201 291v30', 'ps-amber')}${path('M227 306h34v-56h27', 'ps-route')}`, '', 300)}
      ${label(70, 83, 'Sesión de escritorio', 'ps-detail-label')}${label(289, 69, 'Mensajería')}${label(499, 86, 'Otro equipo vinculado', 'ps-detail-label')}
      ${label(70, 354, 'Confirmar cada acceso', 'ps-detail-label')}${label(387, 397, 'Revisar y desvincular contigo', 'ps-detail-label')}`;
  }

  function locationSharing() {
    return `${group(`${rect(244, 88, 219, 271, 'ps-map', 12)}${path('M259 137h80l39 42h70M294 105v101l74 70v65M259 296l64-64h124M431 104v70l-40 42v126', 'ps-map-street')}
      <path class="ps-pin ps-location-clue" d="M354 169a24 24 0 0 0-24 24c0 19 24 44 24 44s24-25 24-44a24 24 0 0 0-24-24Z"/>${circle(354, 193, 7, 'ps-pin-center')}`)}
      ${group(phone(68, 138, 109, 190, `${rect(87, 177, 70, 40, 'ps-panel', 5)}${path('M103 189h37M103 203h24', 'ps-interface-line')}${rect(87, 239, 70, 40, 'ps-panel', 5)}${path('M103 252h37M103 266h24', 'ps-interface-line')}`), '', 100)}
      ${group(`${rect(523, 119, 127, 78, 'ps-panel', 8)}${label(539, 149, 'Al usar la app', 'ps-detail-label')}${rect(568, 164, 46, 17, 'ps-toggle', 8)}${circle(600, 172, 5, 'ps-teal')}
        ${rect(523, 256, 127, 78, 'ps-panel', 8)}${label(539, 285, 'Compartir con', 'ps-detail-label')}${circle(548, 310, 7, 'ps-teal')}${circle(574, 310, 7, 'ps-teal')}${path('M595 310h34', 'ps-amber')}`, '', 240)}
      ${route('M177 230h65', 300)}${route('M464 161h57', 1000)}${route('M464 293h57', 1900)}
      ${label(70, 101, 'Aplicaciones', 'ps-detail-label')}${label(248, 60, 'Ubicación compartida')}${label(520, 90, 'Cuándo y con quién', 'ps-detail-label')}${label(131, 401, 'Limitar permisos sin perder funciones necesarias', 'ps-detail-label')}`;
  }

  function roomInspection() {
    return `${group(`${rect(70, 113, 230, 217, 'ps-room', 7)}${path('M71 273h228M115 113v160M249 113v160', 'ps-room-line')}${rect(135, 239, 103, 20, 'ps-meeting-table', 4)}${path('M150 259v49M223 259v49', 'ps-device-detail')}
      ${rect(92, 136, 37, 58, 'ps-panel', 4)}${circle(110, 155, 5, 'ps-teal')}${circle(110, 175, 5, 'ps-teal')}${rect(233, 146, 41, 27, 'ps-device', 4)}${circle(254, 159, 7, 'ps-teal')}`)}
      ${group(`${rect(390, 98, 246, 134, 'ps-device', 10)}${rect(406, 113, 214, 90, 'ps-screen', 5)}${path('M415 177h28l9-28 10 40 12-54 12 42h20l11-16 8 16h24l12-35 11 35h37', 'ps-amber')}${circle(607, 218, 4, 'ps-teal')}${path('M416 217h84', 'ps-device-detail')}`, '', 150)}
      ${route('M301 161h87', 700)}${group(lens(227, 230, 35, 'ps-device-lens'), '', 250)}
      ${group(`${rect(404, 273, 46, 61, 'ps-panel', 6)}${circle(427, 295, 10, 'ps-teal')}${path('M470 283h149M470 303h125M470 323h137', 'ps-interface-line')}`, '', 350)}
      ${label(71, 78, 'Inspección física')}${label(389, 66, 'Revisión de emisiones')}${label(408, 371, 'Comprobar los dispositivos', 'ps-detail-label')}${label(83, 408, 'Una señal observada requiere comprobación', 'ps-detail-label')}`;
  }

  function documentAccess() {
    return `${group(document(84, 98, 147, 213))}${group(rect(324, 115, 314, 189, 'ps-panel', 5), '', 100)}
      ${['Quién puede abrirlo', 'Quién puede compartirlo', 'Dónde se guardan copias'].map((row, i) => `${circle(347, 151 + i * 58, 5, 'ps-teal')}${label(365, 158 + i * 58, row, 'ps-detail-label')}`).join('')}
      ${route('M232 202h90', 1000)}${group(lens(206, 230, 35, 'ps-document-inspection'), '', 250)}
      ${label(82, 64, 'Documento o copia')}${label(323, 79, 'Acceso a la información')}${label(195, 387, 'Revisar permisos y destinatarios')}`;
  }

  function publicationReview() {
    return `${group(phone(81, 95, 147, 239, `${rect(98, 130, 113, 82, 'ps-photo-frame', 4)}<path class="ps-photo-mountain" d="M99 200 125 154 158 189 181 165 210 201v10H99Z"/>${path('M102 239h106M102 258h85M102 284h64', 'ps-interface-line')}`))}
      ${group(rect(319, 108, 328, 220, 'ps-panel', 5), '', 100)}
      ${['Lugares visibles en la foto', 'Datos que guarda el archivo', 'Horarios y rutinas publicados'].map((row, i) => `${label(336, 152 + i * 65, row, 'ps-detail-label')}${path(`M338 ${169 + i * 65}h274`, 'ps-ground')}`).join('')}
      ${route('M230 221h87', 700)}${group(lens(192, 187, 31, 'ps-location-lens'), '', 200)}
      ${label(83, 63, 'Foto o publicación')}${label(321, 72, 'Pistas que pueden revelar')}${label(145, 388, 'Decidir qué compartir y qué limitar')}`;
  }

  function roomAccess() {
    return `${group(`${path('M308 127V91H81v245h227V240', 'ps-floorplan')}${path('M308 240h-88a88 88 0 0 1 88-88', 'ps-door-swing')}${rect(117, 148, 75, 139, 'ps-meeting-table', 7)}${rect(215, 110, 53, 24, 'ps-chair', 5)}`)}
      ${group(rect(395, 110, 244, 222, 'ps-panel', 5), '', 100)}${['Entrada a la sala', 'Uso de los equipos', 'Acceso a documentos'].map((row, i) => `${label(413, 156 + i * 65, row, 'ps-detail-label')}${path(`M413 ${174 + i * 65}h196`, 'ps-ground')}`).join('')}
      ${route('M309 195h83', 900)}${group(lens(290, 239, 34, 'ps-device-lens'), '', 220)}
      ${label(80, 60, 'Accesos al espacio')}${label(394, 73, 'Condiciones de uso')}${label(122, 390, 'Espacio, equipos e información sensible')}`;
  }

  function eventReview() {
    const labels = ['Documento de origen', 'Accesos registrados', 'Actividad posterior'];
    const starts = [75, 274, 480];
    return `${path('M125 297H592', 'ps-route')}${route('M125 297H592', 400)}${starts.map((x, i) => `${group(document(x + 24, 108, 97, 131), '', i * 100)}${path(`M${x + 72} 240v49`, 'ps-route')}${circle(x + 72, 297, 9, 'ps-teal')}${label(x, 349, labels[i], 'ps-detail-label')}`).join('')}
      ${group(lens(390, 171, 34, 'ps-document-inspection'), '', 330)}
      ${label(82, 65, 'Reconstruir los eventos disponibles')}${label(162, 402, 'Las conclusiones dependen de la evidencia', 'ps-detail-label')}`;
  }

  function evidenceContrast() {
    return `${group(`${rect(80, 90, 194, 112, 'ps-panel', 6)}${label(96, 120, 'Registro de acceso', 'ps-detail-label')}${path('M99 141h152M99 160h110M99 179h132', 'ps-interface-line')}
      ${rect(80, 251, 194, 112, 'ps-panel', 6)}${label(96, 282, 'Otra fuente', 'ps-detail-label')}${path('M99 302h152M99 322h110M99 342h132', 'ps-interface-line')}`)}
      ${route('M275 147h62l58 76', 300)}${route('M275 307h62l58-76', 1400)}
      ${group(lens(399, 226, 43, 'ps-document-inspection'), '', 130)}
      ${group(`${rect(496, 139, 152, 66, 'ps-panel', 6)}${label(511, 169, 'Coincidencias', 'ps-detail-label')}${path('M514 184h106', 'ps-teal')}
        ${rect(496, 280, 152, 66, 'ps-panel', 6)}${label(511, 309, 'Por comprobar', 'ps-detail-label')}${path('M514 327h57m12 0h17m12 0h7', 'ps-amber')}`, '', 270)}
      ${path('M444 224h30v-54h20M474 224v89h20', 'ps-route')}${label(82, 57, 'Contrastar antes de concluir')}${label(195, 409, 'Relacionar pruebas no equivale a atribuir culpabilidad', 'ps-detail-label')}`;
  }

  function incidentAnalysis() {
    return `${group(laptop(75, 89, 342, 206, `${rect(93, 111, 132, 150, 'ps-panel', 5)}${path('M109 133h98M109 153h72M109 174h88M109 214h89M109 234h66', 'ps-interface-line')}
      ${path('M263 130v114', 'ps-route')}${[136, 184, 232].map((y, i) => `${circle(263, y, 5, i === 1 ? 'ps-amber' : 'ps-teal')}${path(`M281 ${y}h${i === 1 ? 72 : 105}`, 'ps-interface-line')}`).join('')}`))}
      ${group(`${rect(498, 115, 139, 93, 'ps-panel', 7)}${path('M516 139h91M516 159h65M516 179h82', 'ps-interface-line')}${label(499, 241, 'Archivos disponibles', 'ps-detail-label')}`, '', 150)}
      ${route('M418 166h78', 600)}${path('M247 316v42h250', 'ps-route')}
      ${group(`${circle(500, 358, 18, 'ps-channel-seal')}${path('M492 358h16M500 350v16', 'ps-amber')}${path('M530 349h99M530 366h71', 'ps-interface-line')}`, '', 300)}
      ${label(75, 58, 'Leer registros y relacionar eventos')}${label(81, 398, 'Equipo analizado')}${label(459, 407, 'Información afectada', 'ps-detail-label')}`;
  }

  function recoveryReview() {
    return `${group(document(92, 108, 132, 186))}${group(`${circle(157, 307, 33, 'ps-channel-seal')}${lock(157, 298, .72)}`, '', 120)}
      ${group(laptop(410, 113, 235, 166, `${path('M432 150h189M432 173h150M432 214h170M432 239h116', 'ps-interface-line')}`), '', 140)}
      ${route('M226 199h181', 650)}${group(lens(354, 196, 38, 'ps-device-lens'), '', 230)}
      ${label(82, 64, 'Preservar originales')}${label(411, 77, 'Evaluar las opciones')}${label(419, 333, 'Archivos · Copias · Cuentas', 'ps-detail-label')}${label(99, 397, 'La recuperación depende de los datos disponibles', 'ps-detail-label')}`;
  }

  const deliveries = {
    equipos() {
      return `${group(phone(282, 88, 149, 269, `${lock(356, 151, 1.25)}${[215, 249, 283].map(y => `${path(`M304 ${y}h61`, 'ps-interface-line')}${rect(380, y - 9, 28, 15, 'ps-toggle', 7)}${circle(400, y - 1, 4, 'ps-teal')}`).join('')}`))}
        ${group(`${circle(138, 150, 40, 'ps-channel-seal')}${path('M121 150l10 11 25-26', 'ps-teal')}${label(75, 221, 'Bloqueo de pantalla', 'ps-detail-label')}`, '', 100)}
        ${group(`${circle(566, 150, 40, 'ps-channel-seal')}${path('M544 144h44M550 157h32M557 170h18', 'ps-amber')}${label(499, 221, 'Permisos ajustados', 'ps-detail-label')}`, '', 170)}
        ${route('M179 150h101', 500)}${route('M432 150h92', 1700)}
        ${group(`${rect(83, 275, 126, 67, 'ps-panel', 7)}${circle(104, 297, 5, 'ps-teal')}${path('M120 297h70M102 321h89', 'ps-interface-line')}${label(76, 374, 'Cambios registrados', 'ps-detail-label')}`, '', 230)}
        ${group(`${rect(508, 275, 126, 67, 'ps-panel', 7)}${path('M531 297h81M531 313h62', 'ps-interface-line')}${circle(525, 322, 3, 'ps-amber')}${label(512, 374, 'Revisión periódica', 'ps-detail-label')}`, '', 300)}
        ${label(187, 53, 'Configuración y cuidado de tus equipos')}`;
    },
    conversaciones() {
      return `${group(`${phone(86, 114, 112, 213, `${bubble(102, 156, 80)}${lock(141, 254, .65)}`)}${phone(523, 114, 112, 213, `${bubble(539, 224, 80, '', true)}${lock(579, 161, .65)}`)}`)}
        ${route('M200 198h119', 350)}${route('M404 246h117', 1500)}
        ${group(`${rect(301, 114, 118, 84, 'ps-panel', 8)}${circle(329, 139, 8, 'ps-teal')}${path('M348 138h49M319 160h77M319 177h56', 'ps-interface-line')}${label(290, 90, 'Confirmar destinatario', 'ps-detail-label')}`, '', 100)}
        ${group(`${circle(358, 253, 31, 'ps-channel-seal')}${circle(348, 250, 9, 'ps-amber')}${path('M357 250h22v10M368 250v8', 'ps-amber')}`, '', 180)}
        ${group(`${rect(247, 320, 229, 52, 'ps-panel', 8)}${label(266, 352, 'Compartir con cuidado', 'ps-detail-label')}`, '', 290)}
        ${label(88, 82, 'Tu canal', 'ps-detail-label')}${label(533, 82, 'Tu contacto', 'ps-detail-label')}${label(241, 411, 'Pautas para el equipo de confianza', 'ps-detail-label')}`;
    },
    ubicacion() {
      return `${group(`${rect(72, 115, 271, 230, 'ps-map', 12)}${path('M88 170h88l44 51h105M125 131v98l69 96M88 292l85-70h153M286 132v64l-39 40v93', 'ps-map-street')}
        ${circle(199, 231, 52, 'ps-route')}${circle(199, 231, 15, 'ps-teal')}${label(90, 372, 'Fuentes de exposición', 'ps-detail-label')}`)}
        ${group(`${rect(446, 96, 176, 162, 'ps-panel', 6)}${rect(459, 110, 150, 82, 'ps-photo-frame', 4)}<path class="ps-photo-mountain" d="M460 182 492 134 530 167 574 134 608 181v10H460Z"/>
          ${path('M472 218h70M472 236h101', 'ps-interface-line')}${rect(552, 208, 45, 17, 'ps-toggle-muted', 8)}${circle(563, 216, 5, 'ps-teal')}`, '', 140)}
        ${route('M344 223h53v-65h47', 600)}
        ${group(`${rect(447, 302, 175, 51, 'ps-panel', 6)}${path('M465 316h139M491 306v40M544 306v40M597 306v40', 'ps-ground')}${circle(570, 334, 6, 'ps-teal')}`, '', 250)}
        ${label(448, 71, 'Publicación revisada', 'ps-detail-label')}${label(456, 284, 'Revisar con el tiempo', 'ps-detail-label')}${label(165, 413, 'Plan de privacidad para ubicación y rutinas', 'ps-detail-label')}`;
    },
    reuniones() {
      return `${group(`${path('M561 272V104H149v223h412v-12', 'ps-floorplan')}${path('M561 315h-44a44 44 0 0 1 44-44', 'ps-door-swing')}
        ${rect(242, 169, 216, 95, 'ps-meeting-table', 9)}${[265, 364].map(x => `${rect(x, 132, 54, 24, 'ps-chair', 4)}${rect(x, 278, 54, 24, 'ps-chair', 4)}`).join('')}
        ${rect(174, 127, 39, 94, 'ps-panel', 4)}${path('M193 142v22M193 184v22', 'ps-device-detail')}${lock(194, 246, .55)}${rect(377, 193, 32, 51, 'ps-handset', 5)}${rect(283, 193, 50, 36, 'ps-paper', 3)}`)}
        ${route('M195 104V78h-69', 300)}${route('M408 193v-39h82V78h92', 1300)}${route('M562 294h77v69', 1900)}
        ${label(75, 53, 'Guardar documentos', 'ps-detail-label')}${label(456, 53, 'Acordar uso de equipos', 'ps-detail-label')}${label(480, 393, 'Control de entrada', 'ps-detail-label')}
        ${group(`${circle(113, 373, 14, 'ps-channel-seal')}${path('M107 373h12', 'ps-amber')}${label(138, 380, 'Pendientes señalados', 'ps-detail-label')}`, '', 230)}`;
    },
    filtraciones() {
      return `${group(`${path('M104 223h182M391 223h222', 'ps-teal')}${path('M286 223h105', 'ps-route')}${[114, 240, 445, 598].map((x, i) => `${circle(x, 223, 10, i < 2 ? 'ps-teal' : 'ps-amber')}${path(`M${x} 205v-32`, 'ps-ground')}`).join('')}`)}
        ${group(`${rect(77, 98, 171, 71, 'ps-panel', 6)}${label(95, 128, 'Hechos registrados', 'ps-detail-label')}${path('M95 149h130', 'ps-teal')}`, '', 100)}
        ${group(`${rect(408, 98, 213, 71, 'ps-panel', 6)}${label(426, 128, 'Por contrastar', 'ps-detail-label')}${path('M426 149h173', 'ps-amber')}`, '', 230)}
        ${group(`${circle(339, 223, 28, 'ps-channel-seal')}${label(332, 231, '?')}${label(270, 279, 'Datos que faltan', 'ps-detail-label')}`, '', 170)}
        ${route('M114 234v94h80', 500)}${route('M598 234v94h-74', 1700)}${group(`${rect(195, 306, 329, 65, 'ps-panel', 6)}${label(216, 333, 'Fuentes · Límites · Cambios de acceso', 'ps-detail-label')}${path('M218 350h271', 'ps-ground')}`, '', 300)}
        ${label(145, 55, 'Conclusiones con su evidencia y sus límites')}${label(218, 409, 'Sin atribuciones sin respaldo', 'ps-detail-label')}`;
    },
    incidentes() {
      return `${group(`${[0, 1, 2].map(i => `${rect(81, 115 + i * 37, 156, 32, 'ps-device', 5)}${circle(217, 131 + i * 37, 3, 'ps-teal')}${path(`M97 ${131 + i * 37}h84`, 'ps-device-detail')}`).join('')}${label(84, 93, 'Copias disponibles', 'ps-detail-label')}`)}
        ${group(laptop(433, 118, 206, 135, `${rect(454, 141, 60, 79, 'ps-panel', 5)}${path('M466 158h35M466 174h27M466 190h34', 'ps-interface-line')}${path('M530 152h83M530 173h55M530 194h74', 'ps-interface-line')}`), '', 140)}
        ${route('M239 170h191', 650)}${group(`${circle(334, 170, 29, 'ps-channel-seal')}${path('M318 174a17 17 0 1 0 3-17M320 147v12h13', 'ps-amber')}`, '', 200)}
        ${label(426, 93, 'Recuperación acordada', 'ps-detail-label')}
        ${group(`${path('M126 330H596', 'ps-route')}${[126, 361, 596].map((x, i) => `${circle(x, 330, 17, 'ps-channel-seal')}${label(x - 5, 337, String(i + 1), 'ps-detail-label')}`).join('')}`, '', 250)}
        ${label(73, 378, 'Qué se preservó', 'ps-detail-label')}${label(300, 378, 'Qué se recupera', 'ps-detail-label')}${label(531, 378, 'Qué sigue', 'ps-detail-label')}${label(163, 419, 'Plan adaptado al estado de los equipos y datos', 'ps-detail-label')}`;
    },
  };

  function detailScene(key, phase, uid) {
    if (phase === 3) return deliveries[key]();
    if (key === 'equipos') return phase === 1 ? accountReview() : permissionReview();
    if (key === 'conversaciones') return phase === 1 ? conversationAccess() : documentAccess();
    if (key === 'ubicacion') return phase === 1 ? locationSharing() : publicationReview();
    if (key === 'reuniones') return phase === 1 ? roomInspection() : roomAccess();
    if (key === 'filtraciones') return phase === 1 ? eventReview() : evidenceContrast();
    return phase === 1 ? incidentAnalysis() : recoveryReview();
  }

  const descriptions = {
    equipos: ['Revisión de equipos y accesos', 'Una computadora conectada a un teléfono. Una lupa recorre los permisos del móvil durante la revisión de dispositivos y configuraciones.'],
    conversaciones: ['Privacidad de las conversaciones', 'Dos teléfonos intercambian mensajes a través de un canal con cifrado. Se revisan tanto la comunicación como los accesos a los dispositivos.'],
    ubicacion: ['Revisión de la exposición de ubicación', 'Un teléfono con una publicación conectado a un mapa. Una lupa examina pistas que podrían compartir información sobre ubicación y rutinas.'],
    reuniones: ['Revisión de espacios de reunión', 'Plano de una sala con mesa, documentos y dispositivos. Una lupa recorre el espacio y los accesos como parte de una inspección.'],
    filtraciones: ['Investigación del recorrido de la información', 'Un documento conectado a una computadora y un teléfono. Una lupa revisa sus registros de acceso para reconstruir el recorrido de la información.'],
    incidentes: ['Organizar evidencias de un incidente', 'Una carpeta afectada, documentos, una computadora y un archivo organizado. Las hojas se ordenan para explicar la preservación de evidencias y la reconstrucción de contexto.'],
  };

  function render(key, phase = 0) {
    const safeKey = Object.prototype.hasOwnProperty.call(scenes, key) ? key : 'equipos';
    const uid = `protection-scene-${++serial}`;
    const [title, description] = descriptions[safeKey];
    const selectedPhase = Math.max(0, Math.min(3, Number.isFinite(Number(phase)) ? Math.trunc(Number(phase)) : 0));
    const artwork = selectedPhase === 0 ? scenes[safeKey](uid) : detailScene(safeKey, selectedPhase, uid);
    return `<div class="protection-scene"><svg class="ps-illustration" viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="${uid}-title ${uid}-description" focusable="false">
      <title id="${uid}-title">${title} — paso ${selectedPhase + 1}</title><desc id="${uid}-description">${selectedPhase === 0 ? description : 'Detalle del paso seleccionado. La explicación de las acciones y los resultados de esta etapa se encuentra junto al diagrama.'}</desc>
      <defs><clipPath id="${uid}-phone-screen"><rect x="524" y="109" width="81" height="147" rx="7"/></clipPath><clipPath id="${uid}-map"><rect x="294" y="100" width="329" height="220" rx="16"/></clipPath></defs>
      <ellipse class="ps-backdrop" cx="364" cy="234" rx="290" ry="169"/>
      ${artwork}
    </svg></div>`;
  }

  window.ProtectionVisuals = Object.freeze({ render });
})();
