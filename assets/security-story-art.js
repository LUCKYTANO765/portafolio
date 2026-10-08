/* Security services use distinct objects and work sequences, never live findings. */
(() => {
  'use strict';
  const { line: l, accent: a, circle: c, dot, text, enter, flow: f, box: b, phone, windowFrame: win, antenna } = window.DisciplineDrawing;
  const t = (x, y, value) => text(x, y, value, 'dv-process-label');
  const lens = (x, y, r = 23) => `<g class="dv-node-idle">${c(x, y, r, 'dv-accent')}${c(x, y, r - 5, 'dv-dim')}${a(`M${x + r * .7} ${y + r * .7}l16 16`)}</g>`;
  const paper = (x, y, w = 40, h = 53) => `${b(x, y, w, h, 'dv-dark', 2)}${l(`M${x + 8} ${y + 13}h${w - 16}M${x + 8} ${y + 23}h${w - 19}M${x + 8} ${y + 33}h${w - 16}`, 'dv-muted')}`;
  const folder = (x, y, w = 70, h = 47) => `<path class="dv-surface dv-accent-border" d="M${x} ${y}h${w * .35}l8 9h${w * .65 - 8}v${h - 9}H${x}Z"/>${l(`M${x + 9} ${y + 24}h${w - 18}`, 'dv-muted')}`;
  const drive = (x, y, w = 65, h = 89) => `${b(x, y, w, h, 'dv-dark', 5)}${c(x + w / 2, y + h * .43, w * .31, 'dv-muted')}${c(x + w / 2, y + h * .43, 5, 'dv-accent')}${a(`M${x + w * .78} ${y + h * .23}l${-w * .23} ${h * .2}`)}${l(`M${x + 12} ${y + h - 16}h${w - 24}`, 'dv-muted')}`;
  const lock = (x, y, open = false) => `${a(`M${x - 9} ${y}v-9a9 9 0 0 1 18 0${open ? '' : 'v9'}`)}${b(x - 14, y, 28, 24, 'dv-accent-border', 4)}${dot(x, y + 11, 'dv-accent-dot')}`;
  const rack = (x, y) => [0, 1, 2].map(i => `${b(x, y + i * 26, 74, 21)}${dot(x + 11, y + 10 + i * 26, 'dv-accent-dot')}${l(`M${x + 23} ${y + 10 + i * 26}h37`, 'dv-muted')}`).join('');
  const toggle = (x, y) => `${b(x, y, 28, 12, 'dv-accent-border', 6)}${c(x + 20, y + 6, 3, 'dv-accent dv-node-idle')}`;
  const shield = (x, y, scale = 1) => `<g transform="translate(${x} ${y}) scale(${scale})"><path class="dv-surface dv-accent-border" d="M0-29 26-20v28C26 27 0 41 0 41S-26 27-26 8v-28Z"/>${lock(0, -3)}</g>`;
  const flow = d => `${l(d, 'dv-route-base')}${f(d, 600)}`;
  const browser = (x, y, w = 140, h = 105) => win(x, y, w, h, `${b(x + 12, y + 34, w * .33, h - 49, 'dv-dark')}${l(`M${x + w * .53} ${y + 45}h${w * .34}M${x + w * .53} ${y + 61}h${w * .26}`, 'dv-muted')}`);

  function cyber(index, phase) {
    if (index === 0) {
      if (phase === 0) return `${enter(browser(48, 70, 140, 119))}${enter(rack(284, 86), 150)}${flow('M188 130h95')}${l('M38 55h156v147H38Z', 'dv-dashed dv-muted')}${t(49, 230, 'Aplicación autorizada')}${t(273, 204, 'Servicios')}${t(81, 43, 'Límites de la prueba')}`;
      if (phase === 1) return `${enter(win(66, 55, 247, 165, `${b(86, 98, 105, 26)}${b(86, 140, 105, 26)}${a('M100 187h53')}${l('M222 98h65M222 117h43M222 163h63M222 182h36', 'dv-muted')}`))}${lens(247, 130, 35)}${flow('M46 113h40')}${flow('M191 153h36')}${t(73, 248, 'Accesos y comportamiento de la aplicación')}`;
      return `${enter(browser(48, 92, 146, 125))}${[0, 1, 2].map((i) => `${b(258, 58 + i * 58, 99, 40, i === 0 ? 'dv-accent-border' : '')}${c(274, 78 + i * 58, 6, 'dv-muted')}${t(288, 82 + i * 58, ['Impacto', 'Prioridad', 'Corrección'][i])}`).join('')}${flow('M194 143h30V78h32')}${l('M224 143v51h32M224 137h32', 'dv-dim')}${t(54, 242, 'Hallazgos ubicados en el sistema')}`;
    }
    if (index === 1) {
      if (phase === 0) return `${win(50, 49, 204, 51, `${c(69, 82, 5, 'dv-accent')}${l('M73 86l5 5M88 83h144', 'dv-muted')}`)}${[72, 172, 279].map((x, i) => `${browser(x, 145, 75, 71)}${t(x, 241, ['Sitios', 'Publicaciones', 'Registros'][i])}`).join('')}${flow('M154 101v24h158v18')}${l('M154 125h-42v19M208 125v19', 'dv-dim')}${t(274, 78, 'Fuentes públicas')}`;
      if (phase === 1) return `${paper(52, 64, 69, 94)}${paper(52, 180, 69, 54)}${browser(276, 65, 87, 94)}${paper(290, 184, 57, 53)}${lens(202, 143, 34)}${flow('M121 109h43')}${flow('M237 143h18V111h20')}${l('M120 201h56l17-24M230 169l35 36h25', 'dv-dashed dv-muted')}${t(45, 43, 'Origen')}${t(276, 43, 'Contraste')}${t(147, 245, 'Fecha y contexto')}`;
      return `${win(53, 54, 303, 160, `${paper(70, 91, 56, 66)}${paper(237, 91, 100, 66)}${l('M139 105h76M139 121h61M139 141h74M71 183h251', 'dv-muted')}`)}${flow('M126 126h108')}${c(100, 184, 4, 'dv-accent dv-pulse-ring')}${t(65, 242, 'Información con sus fuentes y contexto')}`;
    }
    if (index === 2) {
      if (phase === 0) return `${phone(57, 47, 100, 183, `${b(75, 87, 64, 37, 'dv-dark')}${l('M77 148h58M77 165h47M77 188h53', 'dv-muted')}`)}${b(232, 58, 103, 72)}${[0, 1, 2, 3].map(i => l(`M${244 + i * 23} 48v10M${244 + i * 23} 130v10`, 'dv-muted')).join('')}${t(246, 101, 'Compatibilidad')}${flow('M158 106h72')}${b(231, 176, 117, 45, 'dv-dark')}${t(242, 203, 'Aplicaciones de uso')}${t(50, 251, 'Equipo y necesidades')}`;
      if (phase === 1) return `${b(121, 62, 115, 168, 'dv-back-plane', 10)}${b(138, 49, 115, 168, 'dv-back-plane', 10)}${phone(155, 38, 115, 178, `${t(175, 86, 'Permisos')}${t(170, 113, 'Cámara')}${t(170, 145, 'Ubicación')}${toggle(227, 103)}${toggle(227, 135)}${l('M172 178h72', 'dv-muted')}`)}${shield(319, 164, .85)}${flow('M271 145h22')}${t(65, 253, 'Configuración del teléfono y aislamiento')}`;
      return `${phone(48, 62, 98, 172, `${lock(97, 117)}${l('M66 181h61M66 196h42', 'dv-muted')}`)}${b(246, 52, 113, 63, 'dv-accent-border')}${t(258, 78, 'Instalar apps')}${t(258, 96, 'Revisar permisos')}${b(221, 162, 138, 59)}${t(234, 186, 'Mantener el sistema')}${t(234, 205, 'Revisar los cambios')}${flow('M147 142h37V83h61')}${flow('M184 142v51h36')}${t(50, 254, 'Protección en el uso diario')}`;
    }
    if (phase === 0) return `${browser(50, 75, 174, 124)}${phone(280, 51, 76, 150)}${lock(134, 126)}${lock(318, 102)}${l('M89 216h103M132 200v16', 'dv-muted')}${flow('M225 130h53')}${t(63, 245, 'Estado y accesos disponibles')}`;
    if (phase === 1) return `${b(55, 87, 99, 80, 'dv-dark')}${l('M55 91l50 40 49-40', 'dv-muted')}${t(62, 196, 'Cuenta de apoyo')}${c(239, 130, 31, 'dv-accent')}${c(230, 130, 8, 'dv-muted')}${a('M238 130h23M250 130v9M257 130v6')}${flow('M154 129h52')}${phone(310, 73, 65, 140)}${flow('M272 130h36')}${t(150, 235, 'Opciones de recuperación')}`;
    return `${phone(58, 63, 91, 161, `${lock(104, 129, true)}`)}${flow('M150 143h54V85h43')}${flow('M204 143v51h42')}${b(247, 59, 116, 55, 'dv-accent-border')}${t(258, 83, 'Acceso obtenido')}${l('M260 96h76', 'dv-muted')}${b(247, 168, 116, 58)}${t(258, 192, 'Límites pendientes')}${l('M260 205h66', 'dv-muted')}${t(55, 247, 'Resultado según el equipo y sus opciones')}`;
  }

  function intelligence(index, phase) {
    if (index === 0) {
      if (phase === 0) return `${folder(52, 66, 99, 70)}${t(57, 162, 'Pregunta del caso')}${lens(109, 119, 26)}${browser(261, 52, 91, 76)}${paper(281, 174, 62, 59)}${flow('M151 105h70V91h39')}${l('M221 106v96h59', 'dv-dashed dv-muted')}${t(226, 253, 'Fuentes y evidencias')}`;
      if (phase === 1) return `${paper(53, 68, 58, 81)}${browser(155, 47, 113, 84)}${paper(315, 83, 53, 71)}${flow('M81 150v45h255v-39')}${l('M211 133v62', 'dv-dim')}${[81, 211, 336].map(x => c(x, 195, 6, 'dv-accent dv-pulse-ring')).join('')}${t(53, 228, 'Origen')}${t(171, 228, 'Contexto')}${t(290, 228, 'Relación')}${t(112, 253, 'Ordenar eventos e indicios')}`;
      return `${b(55, 62, 131, 149)}${b(229, 94, 131, 117, 'dv-dark')}${t(71, 88, 'Comprobado')}${t(245, 120, 'Por aclarar')}${[0, 1, 2].map(i => `${l(`M72 ${113 + i * 28}h91`, 'dv-muted')}${c(254, 146 + i * 21, 3, 'dv-muted')}${l(`M266 ${146 + i * 21}h69`, 'dv-dashed dv-muted')}`).join('')}${flow('M187 144h40')}${t(62, 242, 'Conclusiones respaldadas y preguntas abiertas')}`;
    }
    if (index === 1) {
      if (phase === 0) return `${[56, 170, 284].map((x, i) => `${b(x, 67 + i * 17, 78, 111)}${paper(x + 14, 91 + i * 17, 45, 63)}${t(x, 215 + i * 10, ['Registros', 'Dominios', 'Eventos'][i])}`).join('')}${flow('M95 182v56h112v-29')}${t(67, 44, 'Elementos que se van a relacionar')}`;
      if (phase === 1) return `${[[81, 95], [203, 59], [331, 97], [144, 201], [298, 210]].map(([x, y]) => `${b(x - 23, y - 20, 46, 40)}${l(`M${x - 13} ${y - 5}h26M${x - 13} ${y + 7}h20`, 'dv-muted')}`).join('')}${flow('M105 89l75-23')}${flow('M227 66l80 24')}${flow('M324 119l-22 70')}${l('M85 116l47 64M167 202h107M206 81l-47 97', 'dv-dashed dv-muted')}${lens(224, 150, 23)}${t(89, 248, 'Conexiones con fechas y evidencia')}`;
      return `${c(101, 111, 29, 'dv-muted')}${c(302, 111, 29, 'dv-muted')}${c(203, 207, 23, 'dv-muted')}${flow('M131 111h140')}${l('M118 137l68 54M285 138l-65 52', 'dv-dashed dv-muted')}${paper(183, 60, 39, 46)}${t(127, 43, 'Relación con respaldo')}${t(230, 204, 'Por verificar')}${t(53, 255, 'No toda coincidencia implica una relación')}`;
    }
    if (phase === 0) return `${browser(52, 78, 128, 106)}${phone(280, 58, 76, 157)}${b(203, 56, 39, 40, 'dv-accent-border')}${a('M213 70h19M213 80h12')}${flow('M181 132h38V98')}${flow('M240 76h39')}${l('M180 159h70v41h29', 'dv-dashed dv-muted')}${t(56, 218, 'Equipos y cuentas')}${t(54, 247, 'Dónde puede exponerse la información')}`;
    if (phase === 1) return `${win(66, 53, 256, 173, `${[0, 1, 2].map(i => `${b(83, 91 + i * 37, 25, 25, 'dv-dark')}${l(`M124 ${101 + i * 37}h112M124 ${112 + i * 37}h75`, 'dv-muted')}`).join('')}`)}${lens(283, 137, 36)}${flow('M109 139h49')}${t(55, 248, 'Permisos, sesiones e indicios de software espía')}`;
    return `${b(88, 56, 243, 168, 'dv-dark', 14)}${phone(112, 75, 65, 127)}${rack(224, 101)}${shield(201, 129, .78)}${flow('M178 165h46')}${l('M42 139h44M333 139h43', 'dv-dashed dv-muted')}${t(90, 246, 'Reducir la exposición y reforzar accesos')}`;
  }

  function forensics(index, phase) {
    if (index === 0) {
      if (phase === 0) return `${phone(61, 44, 92, 181)}${b(229, 64, 123, 133, 'dv-dark')}${l('M229 64l61 49 62-49', 'dv-muted')}${lock(290, 133)}${flow('M154 137h73')}${t(49, 247, 'Dispositivo original')}${t(225, 224, 'Preservación')}`;
      if (phase === 1) return `${phone(73, 49, 95, 181, `${b(89, 82, 30, 31)}${b(128, 82, 24, 31)}${l('M89 142h61M89 160h46M89 180h56', 'dv-muted')}`)}${folder(268, 56, 73, 50)}${paper(286, 158, 54, 75)}${flow('M169 106h55V81h42')}${flow('M169 173h55v19h60')}${t(265, 129, 'Archivos')}${t(267, 253, 'Registros')}`;
      return `${phone(48, 62, 70, 141)}${flow('M119 128h45')}${[169, 241, 312].map((x, i) => `${paper(x, 96 + i * 17, 44, 65)}${l(`M${x + 22} ${163 + i * 17}v${57 - i * 17}`, 'dv-dim')}${c(x + 22, 222, 4, 'dv-accent')}`).join('')}${flow('M191 222h143')}${t(127, 247, 'Evidencias ordenadas por evento')}`;
    }
    if (index === 4) {
      if (phase === 0) return `${phone(55, 42, 103, 183, `${b(71, 79, 60, 25)}${b(82, 114, 60, 34, 'dv-accent-border')}${b(71, 160, 57, 25)}`)}${folder(254, 61, 101, 65)}${drive(277, 161, 62, 67)}${flow('M159 113h94')}${l('M210 113v79h65', 'dv-dashed dv-muted')}${t(48, 248, 'Mensajería autorizada')}${t(254, 145, 'Exportaciones y copias')}`;
      if (phase === 1) return `${win(51, 55, 314, 170, `${b(66, 87, 88, 25)}${b(101, 124, 91, 34, 'dv-accent-border')}${b(67, 174, 79, 25)}${paper(273, 110, 48, 66)}`)}${flow('M193 142h77')}${t(62, 248, 'Conversaciones')}${t(254, 248, 'Adjuntos y fechas')}`;
      return `${[70, 190, 299].map((x, i) => `${b(x, 74 + i * 31, 57, 41, i === 1 ? 'dv-accent-border' : '')}${l(`M${x + 9} ${89 + i * 31}h38M${x + 9} ${102 + i * 31}h24`, 'dv-muted')}${l(`M${x + 28} ${116 + i * 31}v${89 - i * 31}`, 'dv-dim')}`).join('')}${flow('M98 208h230')}${[98, 218, 327].map(x => c(x, 208, 5, 'dv-accent')).join('')}${t(76, 247, 'Mensajes y archivos dentro de su contexto')}`;
    }
    if (index === 5) {
      if (phase === 0) return `${drive(71, 66, 82, 132)}${drive(274, 66, 82, 132)}${flow('M155 132h117')}${lock(213, 173)}${t(67, 224, 'Almacenamiento')}${t(272, 224, 'Copia de trabajo')}${t(125, 47, 'Preservar el original')}`;
      if (phase === 1) return `${win(47, 49, 322, 181, `${b(62, 84, 79, 130, 'dv-dark')}${[0, 1, 2].map(i => folder(73, 97 + i * 36, 50, 25)).join('')}${l('M157 95h117M157 118h83M157 143h134M157 166h98M157 192h115', 'dv-muted')}`)}${lens(309, 157, 28)}${flow('M143 144h54')}${t(72, 253, 'Archivos, registros y actividad del equipo')}`;
      return `${win(48, 57, 174, 123, `${l('M65 94h138M65 114h97M65 134h122M65 154h85', 'dv-muted')}`)}${drive(301, 78, 58, 81)}${flow('M224 118h75')}${l('M134 181v37h196v-57', 'dv-dim')}${[134, 235, 330].map(x => c(x, 218, 4, 'dv-accent')).join('')}${t(68, 245, 'Actividad documentada y archivos asociados')}`;
    }
    if (index === 1) {
      if (phase === 0) return `${drive(59, 70, 100, 141)}${lens(132, 131, 31)}${b(255, 76, 107, 50)}${t(266, 99, 'Estado del equipo')}${b(255, 170, 107, 46, 'dv-dark')}${t(266, 198, 'Datos disponibles')}${flow('M162 140h56V99h35')}${l('M218 139v54h35', 'dv-dim')}${t(61, 245, 'Evaluar antes de intentar recuperar')}`;
      if (phase === 1) return `${b(79, 56, 209, 168, 'dv-dark')}${Array.from({ length: 24 }, (_, i) => `<rect class="dv-memory-cell ${[2, 8, 14, 19].includes(i) ? 'dv-memory-recover' : ''}" x="${97 + (i % 6) * 28}" y="${78 + Math.floor(i / 6) * 31}" width="17" height="20" rx="2" style="--dv-delay:${i * 80}ms"/>`).join('')}${folder(319, 121, 60, 47)}${flow('M288 144h30')}${t(92, 248, 'Examinar las partes legibles del almacenamiento')}`;
      return `${drive(47, 85, 59, 91)}${flow('M108 130h63V81h55')}${flow('M171 130v73h55')}${folder(228, 54, 107, 53)}${paper(243, 164, 35, 48)}${paper(294, 164, 35, 48)}${l('M244 165l33 46M295 165l33 46', 'dv-dashed dv-muted')}${t(225, 129, 'Datos recuperados')}${t(213, 238, 'Información no disponible')}`;
    }
    if (phase === 0) return `${phone(60, 61, 80, 155)}${antenna(327, 105, .9)}${paper(226, 151, 75, 71)}${l('M141 110h110M303 129l-28 20', 'dv-dashed dv-muted')}${flow('M140 168h83')}${t(56, 241, 'Equipo')}${t(227, 247, 'Registros autorizados')}`;
    if (phase === 1) return `${win(57, 55, 302, 171, `${l('M74 111h269M74 153h269M74 194h269', 'dv-dim')}<g class="dv-waveform">${a('M75 114h22l8-15 9 29 12-39 12 52 12-27h39l10-13 10 26 12-12h32l12-23 12 41 10-17h36')}</g>${l('M90 170h59M178 170h49M273 170h57', 'dv-muted')}`)}${flow('M106 198h216')}${t(69, 247, 'Relacionar comunicaciones, tiempos y registros')}`;
    return `${phone(53, 61, 62, 124)}${b(177, 62, 183, 144)}${[0, 1, 2].map(i => `${t(191, 94 + i * 41, ['Evento', 'Momento', 'Contexto'][i])}${l(`M254 ${90 + i * 41}h88`, 'dv-muted')}`).join('')}${flow('M116 128h58')}${antenna(100, 229, .35)}${t(157, 243, 'Registro explicable de lo observado')}`;
  }

  function radio(index, phase) {
    if (index === 0) {
      if (phase === 0) return `${b(67, 54, 281, 168, 'dv-dark')}${l('M77 66h260v143H77Z', 'dv-dashed dv-muted')}${b(102, 128, 73, 54)}${a('M116 128V94M161 128V94')}${phone(250, 89, 53, 104)}${flow('M176 154h71')}${t(86, 43, 'Laboratorio con alcance autorizado')}${t(99, 247, 'Entorno controlado y equipos de prueba')}`;
      if (phase === 1) return `${b(49, 135, 83, 57)}${a('M66 135V83M113 135V83')}${win(198, 65, 167, 137, `${l('M215 112h130M215 142h130M215 173h130', 'dv-dim')}<g class="dv-waveform">${a('M216 143h19l10-21 12 43 15-64 13 76 12-35h47')}</g>`)}${flow('M133 160h61')}${t(44, 222, 'Prueba de inhibición')}${t(214, 227, 'Comportamiento')}`;
      return `${win(54, 50, 136, 145, `${l('M66 152h111', 'dv-dim')}${a('M67 124h18l9-20 9 41 12-61 13 70 10-29h39')}`)}${win(232, 77, 133, 145, `${l('M245 181h106', 'dv-dim')}${a('M245 161h28l7-8 7 14 8-10 8 5h47')}`)}${flow('M192 129h38')}${t(68, 221, 'Referencia')}${t(246, 247, 'Durante la prueba')}`;
    }
    if (index === 1) {
      if (phase === 0) return `${l('M58 56h215v168H58ZM180 56v67h93M58 164h104v60', 'dv-muted')}${b(80, 82, 60, 40)}${b(204, 149, 40, 53)}${c(185, 158, 12, 'dv-accent dv-pulse-ring')}${antenna(329, 104, .75)}${flow('M274 146h40')}${t(53, 248, 'Área y objetos a inspeccionar')}`;
      if (phase === 1) return `${win(57, 54, 235, 156, `${l('M73 110h202M73 149h202M73 187h202', 'dv-dim')}<g class="dv-waveform">${a('M75 181h28l6-38 6 38h24l9-81 8 81h34l8-24 7 24h67')}</g>`)}${antenna(337, 149, .78)}${flow('M311 155h-18')}${lens(157, 139, 26)}${t(60, 239, 'Emisiones que requieren identificación')}`;
      return `${l('M54 64h211v161H54ZM166 64v70h99M54 162h102v63', 'dv-muted')}${[[94, 99], [219, 188]].map(([x, y]) => `${c(x, y, 15, 'dv-muted')}${c(x, y, 5, 'dv-accent dv-pulse-ring')}`).join('')}${b(307, 80, 54, 115)}${t(298, 218, 'Observaciones')}${flow('M234 188h48v-75h23')}${l('M109 99h61v-42h163v21', 'dv-dashed dv-muted')}${t(55, 251, 'Señales ubicadas dentro del área revisada')}`;
    }
    if (phase === 0) return `${b(50, 66, 166, 146)}${[0, 1, 2].map(i => `${t(64, 97 + i * 44, ['Celda', 'Momento', 'Cobertura'][i])}${l(`M125 ${93 + i * 44}h72`, 'dv-muted')}`).join('')}${antenna(316, 113, 1)}${flow('M217 141h73')}${t(53, 247, 'Registros disponibles de la red móvil')}`;
    if (phase === 1) return `${l('M54 193 105 133 174 179 250 124 358 181M67 224l79-63 69 62 87-65', 'dv-dim')}${antenna(102, 106, .8)}${antenna(312, 102, .8)}${antenna(210, 63, .6)}${c(210, 189, 39, 'dv-dashed dv-muted')}${phone(200, 168, 21, 39)}${flow('M103 88l99 92')}${flow('M310 83l-88 92')}${t(62, 252, 'Celdas relacionadas con los registros')}`;
    return `${l('M59 70h276v151H59ZM59 110h276M59 169h276M134 70v151M252 70v151', 'dv-dim')}${antenna(105, 90, .55)}${antenna(294, 197, .55)}<ellipse class="dv-line dv-muted dv-pulse-ring" cx="215" cy="143" rx="63" ry="43"/>${l('M169 110l71 67M157 126l69 55M186 104l72 66', 'dv-dashed dv-dim')}${flow('M110 91l51 31')}${t(66, 245, 'Área estimada según cobertura y datos')}`;
  }

  window.DISCIPLINE_STORY_ART = { ...window.DISCIPLINE_STORY_ART, ciberseguridad: cyber, inteligencia: intelligence, forense: forensics, radiofrecuencia: radio };
})();
