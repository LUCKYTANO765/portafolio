/* Product work, illustrated by service and stage. All scenes are conceptual. */
(() => {
  'use strict';

  const { line, accent, circle, dot, text, enter, flow, box, phone, windowFrame } = window.DisciplineDrawing;
  const t = (x, y, value) => text(x, y, value, 'dv-process-label');
  const wire = (d, delay = 700) => `${line(d, 'dv-dim')}${flow(d, delay)}`;
  const pulse = (x, y, r = 10) => circle(x, y, r, 'dv-accent dv-pulse-ring');
  const field = (x, y, w, active = false) => `${box(x, y, w, 17, active ? 'dv-accent-border' : 'dv-dark', 3)}${line(`M${x + 7} ${y + 9}h${Math.max(9, w - 23)}`, 'dv-muted')}`;
  const button = (x, y, w = 48) => `${box(x, y, w, 18, 'dv-accent-border', 4)}${accent(`M${x + 9} ${y + 9}h${w - 18}`)}`;
  const cursor = (x, y) => `<g class="dv-ui-cursor">${accent(`M${x} ${y}v21l6-7 9 2Z`)}</g>`;

  function spinner(x, y) {
    return `<g transform="translate(${x} ${y})"><g class="dv-rotor">${accent('M0-10a10 10 0 1 1-10 10')}</g></g>`;
  }

  function lens(x, y, radius = 23) {
    return `${circle(x, y, radius, 'dv-accent')}${circle(x, y, radius - 5, 'dv-dim')}${accent(`M${x + radius * .7} ${y + radius * .7}l16 16`)}`;
  }

  function database(x, y, width = 62, height = 67) {
    const middle = x + width / 2;
    return `<path class="dv-surface" d="M${x} ${y + 10}v${height - 20}c0 14 ${width} 14 ${width} 0V${y + 10}Z"/>
      <ellipse class="dv-surface" cx="${middle}" cy="${y + 10}" rx="${width / 2}" ry="10"/>
      ${line(`M${x} ${y + height / 2}c0 14 ${width} 14 ${width} 0`, 'dv-dim')}`;
  }

  function server(x, y, width = 79, height = 103) {
    return `${box(x, y, width, height, '', 6)}${[0, 1, 2].map(i => `${box(x + 8, y + 10 + i * 29, width - 16, 22, 'dv-dark', 3)}${dot(x + 17, y + 21 + i * 29, i === 1 ? 'dv-accent-dot' : '')}${line(`M${x + 29} ${y + 21 + i * 29}h${width - 46}`, 'dv-muted')}`).join('')}`;
  }

  function cube(x, y, width = 70, height = 63) {
    const half = width / 2;
    return `<path class="dv-surface dv-dark" d="M${x} ${y + 15}l${half}-15 ${half} 15v${height - 30}l-${half} 15-${half}-15Z"/>
      ${line(`M${x} ${y + 15}l${half} 15 ${half}-15M${x + half} ${y + 30}v${height - 30}`, 'dv-muted')}`;
  }

  function folder(x, y, width = 81, height = 59) {
    return `<path class="dv-surface" d="M${x} ${y + height}V${y}h${width * .42}l9 10h${width * .58 - 9}v${height - 10}Z"/>
      ${accent(`M${x + 22} ${y + 27}l-8 8 8 8M${x + width - 22} ${y + 27}l8 8-8 8`)}`;
  }

  function sliders(x, y, width = 67) {
    return [0, 1, 2].map((i) => `${line(`M${x} ${y + i * 18}h${width}`, 'dv-muted')}${box(x + [13, 41, 25][i], y + i * 18 - 5, 9, 10, 'dv-accent-border', 2)}`).join('');
  }

  function appScreen(x, y, width, height, variant = 0) {
    return phone(x, y, width, height, `${line(`M${x + 15} ${y + 34}h${width - 30}`, 'dv-muted')}
      ${variant === 1 ? `${circle(x + width / 2, y + 66, 16, 'dv-muted')}${button(x + 17, y + height - 40, width - 34)}` : `${box(x + 14, y + 48, width - 28, Math.max(16, Math.min(33, height - 118)), 'dv-dark', 4)}${field(x + 14, y + height - 65, width - 28)}${button(x + 14, y + height - 38, width - 28)}`}`);
  }

  const webScenes = [
    [
      // Interfaces: plan the journey, build responsive screens, inspect states.
      () => `${windowFrame(48,  70, 96, 102, `${box(59, 101, 73, 24, 'dv-dark')}${field(59, 136, 73)}`)}
        ${windowFrame(169, 48, 99, 112, `${box(180, 80, 30, 51, 'dv-dark')}${line('M219 87h36M219 99h28M219 116h34', 'dv-muted')}${button(216, 138, 38)}`)}
        ${windowFrame(293, 106,  80, 106, `${box(305, 139, 56, 31, 'dv-dark')}${button(305, 181, 56)}`)}
        ${wire('M144 123h12V106h13')}${wire('M268 107h12v45h13', 1800)}
        ${t(58, 197, 'Inicio')}${t(177, 185, 'Acción')}${t(292, 237, 'Siguiente pantalla')}`,
      () => `${windowFrame(49, 54, 239, 157, `${box(63, 87, 70, 107, 'dv-dark')}${line('M76 106h43M76 122h36M76 138h42', 'dv-muted')}${box(146, 88, 128, 50, 'dv-dark')}${field(146, 150, 128)}${button(146, 178, 73)}`)}
        ${appScreen(294, 111, 75, 136)}${line('M140 212v16M108 229h63', 'dv-muted')}
        ${wire('M281 83h57v25')}${cursor(235, 172)}${t(54, 252, 'Adaptar el contenido a cada pantalla')}`,
      () => `${windowFrame(49, 56, 320, 167, `${box(63, 98, 84, 84, 'dv-dark')}${box(168, 98, 82, 84, 'dv-dark')}${box(271, 98, 83, 84, 'dv-dark')}`)}
        ${spinner(105, 133)}${line('M184 117h49M184 129h36M184 144h49', 'dv-muted')}${button(184, 157, 48)}
        ${circle(312, 126, 14, 'dv-muted')}${line('M312 119v9M312 134v1', 'dv-muted')}${line('M289 151h47M289 162h34', 'dv-muted')}
        ${wire('M104 197h209')}${t(81, 202, 'Carga')}${t(182, 202, 'Contenido')}${t(290, 202, 'Avisos')}${t(111, 249, 'Revisar los estados de uso')}`,
    ],
    [
      // Backend: a rule branches requests, services connect to data, exchanges are tested.
      () => `${box(49, 103, 91, 59)}${accent('M65 125h56M65 138h37')}${t(63, 182, 'Solicitud')}
        <path class="dv-surface dv-accent-border" d="M213 80 251 121 213 162 175 121Z"/>${accent('M200 121h26M213 108v26')}
        ${box(292, 62, 76, 47, 'dv-dark')}${box(292, 169, 76, 47, 'dv-dark')}${line('M309 80h42M309 92h29M309 187h42M309 199h29', 'dv-muted')}
        ${wire('M140 132h35')}${wire('M251 121h20V86h21', 1500)}${wire('M251 121h20v71h21', 2300)}
        ${t(193, 190, 'Reglas')}${t(287, 243, 'Qué debe ocurrir')}`,
      () => `${windowFrame(46, 82, 110, 124, `${field(59, 120, 83)}${button(59, 154,  62)}`)}
        ${server(186,  79)}${database(311, 102, 66, 81)}
        ${wire('M156 133h30')}${wire('M265 126h46', 1400)}${wire('M311 167h-46v35h-109', 2500)}
        ${t(63, 235, 'Aplicación')}${t(202, 225, 'Servicio')}${t(328, 214, 'Datos')}`,
      () => `${windowFrame(48, 61, 138, 166, `${t(66, 108, 'Enviar')}${field(62, 121, 108)}${field(62, 149, 108)}${button(62, 181, 64)}`)}
        ${windowFrame(234, 61, 138, 166, `${t(250, 108, 'Recibir')}${accent('M264 129q-8 0-8 9v8q0 8-7 8 7 0 7 8v9q0 9 8 9M337 129q8 0 8 9v8q0 8 7 8-7 0-7 8v9q0 9-8 9')}${line('M278 139h51M278 153h39M278 169h47', 'dv-muted')}`)}
        ${wire('M187 122h46')}${wire('M234 187h-47', 2200)}${pulse(208, 155, 13)}${t(115, 252, 'Comprobar solicitudes y respuestas')}`,
    ],
    [
      // Environments: distinct parts, a packed container group, a repeatable start.
      () => `${folder(57, 86,  90,  70)}${server(273,  60, 88, 110)}
        ${box(173, 173, 95, 63, 'dv-dark')}${sliders(187, 189,  67)}
        ${wire('M148 119h62v52')}${wire('M273 115h-51v56', 2000)}
        ${t(62, 184, 'Código')}${t(284, 197, 'Servicios')}${t(167, 259, 'Configuración')}`,
      () => `${box(114, 65, 260, 137, 'dv-back-plane', 9)}${cube(131, 91, 64, 69)}${cube(213, 91, 64, 69)}${cube(295, 91, 64, 69)}
        ${t(137, 182, 'Aplicación')}${t(225, 182, 'API')}${t(308, 182, 'Datos')}
        ${line('M65 76v131M65 112l31 25v38', 'dv-muted')}${[84, 145, 207].map(y => circle(65, y, 5, 'dv-muted')).join('')}${circle(96, 175, 5, 'dv-accent')}
        ${wire('M96 175h17')}${wire('M130 221h219', 1400)}${t(45, 242, 'Git')}${t(167, 245, 'Contenedores Docker')}`,
      () => `${windowFrame(46,  67, 166, 145, `${accent('M63 110l8 7-8 7')}${line('M82 118h82', 'dv-muted')}${button(64, 151, 92)}${t(83, 164, 'Iniciar')}`)}
        ${server(272, 87, 94, 118)}${wire('M212 163h32v-19h27')}
        ${line('M252 224h125', 'dv-muted')}${circle(255, 224, 4, 'dv-accent')}${wire('M254 224h112', 1600)}
        ${t(60, 246, 'Volver a preparar')}${t(278, 247, 'El mismo entorno')}`,
    ],
  ];

  const mobileScenes = [
    [
      // Flutter: navigation map, assembling widgets, reviewing actual app states.
      () => `${appScreen(48, 60,  80, 159)}${appScreen(171, 44,  80, 159, 1)}${appScreen(294,  80, 78, 159)}
        ${wire('M129 133h23v-10h18')}${wire('M252 124h20v35h21', 1900)}
        ${t(62, 245, 'Entrada')}${t(186, 229, 'Detalle')}${t(307, 261, 'Acción')}`,
      () => `${phone(170, 48, 106, 187, `${box(185, 83, 76, 28, 'dv-dark')}${box(185, 122, 76, 47, 'dv-dark')}${box(185, 181, 76, 27, 'dv-dark')}`)}
        ${box(51,  63, 83, 32, 'dv-accent-border')}${line('M64 78h55', 'dv-muted')}${box(56, 130, 78, 42, 'dv-dark')}${circle( 76, 151, 9, 'dv-muted')}${line('M94 146h26M94 157h18', 'dv-muted')}
        ${box(309, 164, 63, 30, 'dv-accent-border')}${accent('M324 179h34')}
        ${wire('M134 79h15v19h21')}${wire('M134 151h36', 1500)}${wire('M309 179h-17v17h-16', 2200)}
        ${t(44, 205, 'Componentes')}${t(175, 258, 'Aplicación Flutter')}`,
      () => `${appScreen(70, 57, 103, 181)}${cursor(123, 174)}${pulse(133, 188, 12)}
        ${windowFrame(235, 62, 127, 83, `${box(248, 95,  40, 36, 'dv-dark')}${line('M299 99h49M299 111h33M299 124h 40', 'dv-muted')}`)}
        ${box(235, 171, 56, 55, 'dv-dark')}${spinner(263, 199)}${box(307, 171, 55, 55, 'dv-dark')}${circle(335, 198, 11, 'dv-muted')}${line('M335 193v7M335 204v1', 'dv-muted')}
        ${wire('M174 144h29V105h31')}${wire('M203 145v54h31', 1800)}
        ${t(75, 261, 'Recorrer pantallas')}${t(253, 253, 'Estados y avisos')}`,
    ],
    [
      // Java: decide behavior, connect program modules, probe the function from the app.
      () => `${phone(48, 62, 92, 171, `${field(62, 105, 64)}${button(62, 153, 64)}`)}
        <path class="dv-surface dv-accent-border" d="M224 99 262 137 224 175 186 137Z"/>${accent('M211 137h26M224 124v26')}
        ${box(301,  80,  70, 45, 'dv-dark')}${box(301, 171,  70, 45, 'dv-dark')}${line('M315 99h42M315 111h28M315 189h42M315 202h29', 'dv-muted')}
        ${wire('M140 160h25v-23h21')}${wire('M262 137h18v-34h21', 1500)}${wire('M280 137v56h21', 2500)}
        ${t(60, 257, 'Acción')}${t(203, 211, 'Reglas')}${t(297, 242, 'Respuesta')}`,
      () => `${windowFrame(46, 59, 186, 163, `${accent('M 70 101q-8 0-8 10v20q0 9-8 9 8 0 8 9v22q0 10 8 10M209 101q8 0 8 10v20q0 9 8 9-8 0-8 9v22q0 10-8 10')}${box(81, 102, 112, 31, 'dv-dark')}${box(91, 145, 102, 38, 'dv-accent-border')}${line('M94 117h 80M105 162h 70', 'dv-muted')}`)}
        ${database(299,  79,  70, 75)}${box(299, 180,  70, 42, 'dv-dark')}${accent('M315 201h37')}
        ${wire('M232 116h66')}${wire('M299 199h-37v-33h-30', 1900)}
        ${t(74, 248, 'Componentes Java')}${t(299,  60, 'Datos')}${t(282, 248, 'Funcionalidad')}`,
      () => `${phone(175, 53, 97, 181, `${field(189, 98, 69)}${button(189, 128, 69)}${box(189, 160, 69, 44, 'dv-dark')}${line('M200 174h 46M200 187h33', 'dv-muted')}`)}
        ${[95, 139, 183].map((y, i) => `${circle( 90, y, 15, i === 1 ? 'dv-accent' : 'dv-muted')}${line(`M${83 + i} ${y}h${14 - i * 2}`, 'dv-muted')}${wire(`M105 ${y}h33v${139 - y}h36`, 700 + i * 900)}`).join('')}
        ${lens(330, 175, 30)}${line('M315 167h29M315 178h21', 'dv-muted')}${wire('M273 181h26', 2400)}
        ${t(61, 231, 'Distintas entradas')}${t(180, 256, 'Probar la función')}`,
    ],
    [
      // Integration: define a two-way exchange, connect states, review both outcomes.
      () => `${appScreen(53, 67, 98, 171)}
        <path class="dv-surface" d="M291 91c-9-34 47-47 61-13 28-5 41 33 17 44h-95c-22-8-17-34 1-36 4-1 10 1 16 5Z"/>
        ${database(290, 153, 66, 62)}${wire('M152 120h99')}${wire('M289 180h-138', 2100)}
        ${accent('M244 115l7 5-7 5M158 175l-7 5 7 5')}${t(180, 108, 'Enviar')}${t(191, 199, 'Recibir')}${t(281, 241, 'Servicio y datos')}`,
      () => `${phone(48, 51, 105, 189, `${box(63, 92,  75, 67, 'dv-dark')}${spinner(100, 121)}${box(63, 176,  75,  30, 'dv-accent-border')}${line('M 76 191h48', 'dv-muted')}`)}
        ${box(203, 91,  64, 91, 'dv-accent-border', 9)}${accent('M216 113 210 120 216 127M254 113l6 7-6 7M232 108l-5 25')}${t(223, 159, 'API')}
        ${server(312, 65, 65, 108)}${wire('M154 111h48')}${wire('M267 123h44', 1300)}${wire('M312 187h-76v14h-82', 2400)}
        ${t(54, 263, 'Carga y avisos')}${t(305, 222, 'Respuestas')}`,
      () => `${phone( 73,  70, 102, 169, `${box(88, 109, 72, 37, 'dv-dark')}${line('M100 121h48M100 133h34', 'dv-muted')}${field(88, 159, 72)}${button(88, 189, 72)}`)}
        ${phone(248,  70, 102, 169, `${circle(299, 133, 19, 'dv-muted')}${accent('M299 123v12M299 142v1')}${line('M263 168h71M263 180h54', 'dv-muted')}${button(263, 195, 71)}`)}
        ${wire('M126  60V 45h171v15')}${wire('M248 225h-72', 2300)}${pulse(299, 133,  26)}
        ${t(88, 260, 'Con información')}${t(245, 260, 'Sin respuesta')}`,
    ],
  ];

  const qaScenes = [
    [
      // Playwright: choose an actual UI journey, run it, inspect its evidence.
      () => `${windowFrame(65, 47, 290, 150, `${field(82, 86,  79)}${field(82, 115,  79)}${button(82, 147,  79)}${box(190,  84, 146, 93, 'dv-dark')}${line('M205 104h113M205 119h87M205 135h102', 'dv-muted')}`)}
        ${circle(111, 225, 11, 'dv-muted')}${circle(208, 225, 11, 'dv-muted')}${circle(307, 225, 11, 'dv-muted')}${wire('M123 225h 73')}${wire('M221 225h74', 1800)}
        ${t(95, 255, 'Abrir')}${t(181, 255, 'Completar')}${t(288, 255, 'Enviar')}${pulse(121, 156, 15)}`,
      () => `${windowFrame(49, 53, 322, 167, `${box(63, 87, 74, 116, 'dv-dark')}${line('M76 105h48M76 123h 33M76 142h42', 'dv-muted')}${field(154, 91, 198, true)}${field(154, 124, 198)}${button(254, 177, 98)}`)}
        ${wire('M145 99h 93v34h 75v44', 500)}${cursor(304, 165)}${pulse(301, 187, 17)}
        ${accent('M332 234h-244l-8-8M 80 234l8 8')}${flow('M332 234H 80', 2400)}${t(119, 260, 'Repetir acciones en el navegador')}`,
      () => `${windowFrame(48, 67,  95,  99, `${field(59, 100,  73)}${button(59, 133,  49)}`)}
        ${windowFrame(163, 67,  95,  99, `${box(175, 100,  70,  52, 'dv-dark')}${line('M184 112h51M184 126h37M184 140h47', 'dv-muted')}`)}
        ${windowFrame(278, 67,  95,  99, `${field(290, 100, 71)}${button(290, 133,  51)}`)}
        ${wire('M 60 208h296')}${[94, 209, 324].map(x => circle(x, 208, 5, 'dv-muted')).join('')}${lens(221, 145,  30)}
        ${line('M211 176v 27', 'dv-dashed dv-dim')}${t(65, 246, 'Evidencias')}${t(193, 246, 'Punto del recorrido')}`,
    ],
    [
      // Functional QA: outline normal/edge cases, compare views, document reproduction.
      () => `${windowFrame(50,  60, 174, 165, `${field(65, 102, 143)}${field(65, 133, 143)}${button(65, 177, 81)}`)}
        ${box(268, 75, 103, 56, 'dv-dark')}${field(281, 91,  77)}${t(279, 153, 'Con información')}
        ${box(268, 174, 103, 51, 'dv-dark')}${box(281, 187,  77, 17, '', 3)}${line('M288 190v11', 'dv-accent')}
        ${wire('M224 110h43')}${wire('M224 166h20v33h23', 1700)}${t(55, 250, 'Definir lo esperado')}${t(291, 247, 'Sin datos')}`,
      () => `${windowFrame(45,  65, 143, 155, `${field( 60, 105, 113)}${field( 60, 135, 113)}${button( 60, 174,  70)}`)}
        ${windowFrame(235,  65, 143, 155, `${field(250, 105, 113)}${field(250, 135, 113)}${button(250, 174,  70)}`)}
        ${wire('M189 116h45')}${wire('M235 175h-45', 2100)}${circle(212, 145, 13, 'dv-accent')}${accent('M207 143h10M207 148h10')}
        ${t(83,  50, 'Esperado')}${t(274,  50, 'Observado')}${t(124, 247, 'Comparar el comportamiento')}`,
      () => `${windowFrame(51, 51, 225, 139, `${box( 65, 84, 54,  87, 'dv-dark')}${field(132, 86, 129)}${field(132, 119, 129)}${button(132, 151,  75)}`)}
        ${accent('M126 113h10M126 113v11M267 113h-10M267 113v11M126 141h10M126 141v-11M267 141h-10M267 141v-11')}
        ${box(302, 101,  70, 89, 'dv-dark')}${t(313, 126, 'Contexto')}${line('M314 142h 45M314 154h33M314 167h 45', 'dv-muted')}${wire('M277 128h24')}
        ${[91, 180, 269].map((x, i) => `${circle(x, 222, 11, 'dv-muted')}${t(x - 3, 226, String(i + 1))}`).join('')}${wire('M103 222h 65')}${wire('M193 222h 64', 1900)}
        ${t( 60,  65, '')}${t(93, 254, 'Pasos para volver a observarlo')}`,
    ],
    [
      // Regression: inspect a change, replay dependent routes, schedule follow-up.
      () => `${windowFrame(46,  72, 141, 133, `${box( 60, 106, 113, 37, 'dv-dark')}${field( 60, 158, 113)}`)}
        ${windowFrame(235,  72, 141, 133, `${box(249, 106,  50, 37, 'dv-dark')}${box(309, 106, 53, 37, 'dv-accent-border')}${field(249, 158, 113)}`)}
        ${wire('M188 137h46')}${line('M209 138v86h 84', 'dv-dim')}${circle(209, 224, 5, 'dv-muted')}${circle(251, 224, 5, 'dv-muted')}${circle(294, 224, 5, 'dv-muted')}${flow('M209 138v86h 84', 2100)}
        ${t(96,  58, 'Antes')}${t(284,  58, 'Cambio')}${t(136, 255, 'Recorridos que pueden verse afectados')}`,
      () => `${windowFrame( 90,  69, 247, 147, `${box(104, 103, 57, 92, 'dv-dark')}${field(177, 103, 145)}${field(177, 135, 145)}${button(249, 174,  73)}`)}
        ${wire('M 85  53H 59v184h300V 53H343', 600)}${accent('M 85  53l-8-5M 85  53l-8 5')}
        ${wire('M162 113h87v29h35v 33', 1700)}${pulse(283, 183, 16)}${t(127, 264, 'Volver a ejecutar los recorridos')}`,
      () => `${windowFrame(48,  72, 201, 138, `${box(62, 105, 70, 84, 'dv-dark')}${field(147, 106, 88)}${field(147, 139, 88)}${button(147, 174,  53)}`)}
        ${lens(194, 143,  30)}${box(292, 100, 83, 111, '', 7)}${line('M293 124h81M311 94v18M356 94v18', 'dv-muted')}${circle(333, 163,  22, 'dv-accent')}${accent('M333 150v14l9 5')}
        ${wire('M250 155h 41')}${t( 60, 239, 'Qué se revisó')}${t(277, 239, 'Nueva revisión')}${t(143,  48, 'Dar seguimiento al cambio')}`,
    ],
  ];

  function stage(collection, index, phase) {
    const method = Math.max(0, Math.min(2, Number(index) || 0));
    const step = Math.max(0, Math.min(2, Number(phase) || 0));
    return enter(collection[Math.trunc(method)][Math.trunc(step)]());
  }

  window.DISCIPLINE_STORY_ART = {
    ...window.DISCIPLINE_STORY_ART,
    web: (index, phase, uid) => stage(webScenes, index, phase, uid),
    movil: (index, phase, uid) => stage(mobileScenes, index, phase, uid),
    qa: (index, phase, uid) => stage(qaScenes, index, phase, uid),
  };
})();
