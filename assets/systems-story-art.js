/* Service-specific SVG stories for automation, local AI and drones.
 * Illustrations show conceptual steps, never live measurements or case results. */
(() => {
  'use strict';

  const label = (d, x, y, value) => d.text(x, y, value, 'dv-process-label');
  const group = (x, y, content, scale = 1) => `<g transform="translate(${x} ${y}) scale(${scale})">${content}</g>`;
  const route = (d, path, delay = 0) => d.line(path, 'dv-route-base') + d.flow(path, delay);
  const check = (d, x, y) => d.accent(`M${x - 6} ${y}l4 4 9-10`);
  const cursor = (d, x, y) => `<g class="dv-ui-cursor">${d.accent(`M${x} ${y}v21l6-6 8 3Z`)}</g>`;
  const envelope = (d, x, y, w = 42, h = 29) => `${d.box(x, y, w, h, '', 3)}${d.line(`M${x} ${y + 2}l${w / 2} ${h / 2} ${w / 2}-${h / 2}M${x} ${y + h}l${w / 3}-${h / 2}M${x + w} ${y + h}l-${w / 3}-${h / 2}`, 'dv-muted')}`;
  const clock = (d, x, y, r = 19) => `${d.circle(x, y, r)}${d.accent(`M${x} ${y - r + 6}v${r - 6}l${r - 8} 6`)}${d.dot(x, y, 'dv-accent-dot')}`;
  const storage = (d, x, y, w = 56, h = 62) => `<ellipse class="dv-surface" cx="${x + w / 2}" cy="${y + 8}" rx="${w / 2}" ry="8"/>${d.line(`M${x} ${y + 8}v${h - 16}a${w / 2} 8 0 0 0 ${w} 0V${y + 8}M${x} ${y + h / 2}a${w / 2} 8 0 0 0 ${w} 0`)}<ellipse class="dv-line dv-muted" cx="${x + w / 2}" cy="${y + 8}" rx="${w / 2}" ry="8"/>`;
  const chip = (d, x, y, size = 62) => {
    const pins = [12, 24, 36, 48].filter(n => n < size - 5).map(n => d.line(`M${x + n} ${y - 6}v6M${x + n} ${y + size}v6M${x - 6} ${y + n}h6M${x + size} ${y + n}h6`, 'dv-muted')).join('');
    return `${pins}${d.box(x, y, size, size, 'dv-accent-border', 4)}${d.box(x + 10, y + 10, size - 20, size - 20, 'dv-dark', 2)}`;
  };
  const model = (d, x, y, radius = 30) => `${d.circle(x, y, radius, 'dv-accent')}${d.line(`M${x - 14} ${y - 9}l29 2-17 22-12-24M${x - 14} ${y - 9}l12 24`, 'dv-muted')}${d.circle(x - 14, y - 9, 4)}${d.circle(x + 15, y - 7, 4)}${d.circle(x - 2, y + 15, 4, 'dv-accent dv-node-idle')}`;
  const lens = (d, x, y, r = 24) => `${d.circle(x, y, r, 'dv-accent')}${d.accent(`M${x + r * .7} ${y + r * .7}l17 17`)}${d.circle(x, y, r - 7, 'dv-dim')}`;
  const branch = (d, x, y) => `${d.line(`M${x - 10} ${y}h9l12-12M${x - 1} ${y}l12 12`, 'dv-muted')}${d.circle(x - 14, y, 4, 'dv-accent')}${d.circle(x + 14, y - 14, 4)}${d.circle(x + 14, y + 14, 4)}`;
  const calendar = (d, x, y, w = 84, h = 79) => `${d.box(x, y, w, h)}${d.line(`M${x} ${y + 21}h${w}M${x + 18} ${y - 5}v13M${x + w - 18} ${y - 5}v13`, 'dv-muted')}${[0, 1, 2].map(row => [0, 1, 2, 3].map(col => d.box(x + 11 + col * 17, y + 32 + row * 14, 8, 7, row === 1 && col === 2 ? 'dv-accent-border dv-node-idle' : 'dv-dark', 1)).join('')).join('')}`;
  const grid = (d, x, y, w = 92, h = 84) => `${d.box(x, y, w, h)}${d.line(`M${x} ${y + 19}h${w}M${x + 29} ${y}v${h}M${x + 62} ${y}v${h}M${x} ${y + 41}h${w}M${x} ${y + 62}h${w}`, 'dv-dim')}${d.box(x + 33, y + 24, 24, 12, 'dv-accent-border', 1)}${d.line(`M${x + 7} ${y + 31}h14M${x + 69} ${y + 51}h15M${x + 36} ${y + 72}h18`, 'dv-muted')}`;
  const waveform = (d, x, y, w = 103) => `<g class="dv-waveform">${d.accent(`M${x} ${y}h${w * .13}l${w * .09}-12 ${w * .09} 22 ${w * .09}-28 ${w * .1} 35 ${w * .1}-25 ${w * .09} 12 ${w * .11}-4h${w * .2}`)}</g>`;

  function workflows(d, phase) {
    if (phase === 0) {
      return `${d.enter(calendar(d, 52, 66))}${d.enter(envelope(d, 187, 89, 48, 34), 120)}${d.enter(grid(d, 284, 66, 83, 88), 230)}
        ${label(d, 52, 177, 'Agenda')}${label(d, 180, 146, 'Mensajes')}${label(d, 284, 177, 'Registro')}
        ${d.line('M137 108h46M238 108h43', 'dv-dashed dv-muted')}${cursor(d, 206, 123)}
        ${route(d, 'M325 185v26H92v-24', 400)}${d.accent('M86 194l6-7 6 7')}
        ${label(d, 131, 238, 'Tareas que se repiten')}`;
    }
    if (phase === 1) {
      return `${route(d, 'M96 139h80', 0)}${route(d, 'M228 139h36V85h43', 650)}${route(d, 'M264 139v55h43', 1200)}
        ${d.enter(`${d.box(42, 112, 54, 54, '', 10)}${d.accent('M71 120 55 142h12l-4 17 19-27H70Z')}`)}
        ${d.enter(`${d.box(176, 106, 52, 66, 'dv-accent-border', 10)}${branch(d, 202, 139)}`, 100)}
        ${d.enter(envelope(d, 307, 70, 57, 35), 200)}${d.enter(storage(d, 307, 167, 57, 57), 300)}
        ${label(d, 44, 190, 'Inicio')}${label(d, 186, 195, 'n8n')}${label(d, 298, 54, 'Notificación')}${label(d, 299, 244, 'Guardar datos')}`;
    }
    return `${d.enter(d.windowFrame(44, 49, 330, 155, `${clock(d, 90, 127)}${d.box(184, 103, 50, 50, 'dv-accent-border', 9)}${branch(d, 209, 129)}${envelope(d, 302, 111, 45, 32)}${label(d, 67, 181, 'Evento')}${label(d, 174, 181, 'Transformar')}${label(d, 292, 181, 'Resultado')}`))}
      ${route(d, 'M110 128h73', 0)}${route(d, 'M235 128h64', 1100)}${d.circle(355, 80, 8, 'dv-accent dv-pulse-ring')}
      ${d.line('M89 205v20h235v-20', 'dv-muted')}${label(d, 119, 245, 'Revisar el recorrido completo')}`;
  }

  function integrations(d, phase) {
    if (phase === 0) {
      return `${d.enter(d.windowFrame(44, 55, 132, 138, `${calendar(d, 63, 94, 89, 78)}`))}
        ${d.enter(d.windowFrame(248, 55, 128, 138, `${grid(d, 266, 91, 90, 80)}`), 140)}
        ${d.circle(211, 120, 18, 'dv-accent dv-pulse-ring')}${d.accent('M203 120h16M211 112v16')}
        ${d.line('M178 120h14M230 120h16', 'dv-dashed dv-muted')}
        ${d.line('M108 194v24h204v-24', 'dv-dim')}${route(d, 'M164 218h94', 600)}
        ${label(d, 59, 43, 'Aplicación A')}${label(d, 260, 43, 'Aplicación B')}${label(d, 93, 244, 'Qué comparten y cuándo')}`;
    }
    if (phase === 1) {
      return `${d.enter(`${d.box(47, 91, 76, 93, '', 9)}${calendar(d, 59, 107, 51, 58)}`)}
        ${d.enter(`${d.box(175, 83, 70, 112, 'dv-accent-border', 6)}${d.accent('M189 105l-6 8 6 8M231 105l6 8-6 8')}${d.line('M205 103l-8 21', 'dv-muted')}${d.circle(210, 163, 12)}${d.accent('M206 156l10 7-10 7Z')}`, 150)}
        ${d.enter(storage(d, 305, 108, 60, 67), 280)}
        ${route(d, 'M123 118h50', 0)}${route(d, 'M247 118h57', 800)}${route(d, 'M305 165h-43v58H146v-57h-21', 1400)}
        ${label(d, 57, 78, 'Origen')}${label(d, 190, 69, 'Conexión')}${label(d, 312, 94, 'Destino')}${label(d, 185, 144, 'API')}${label(d, 114, 246, 'Eventos y respuestas')}`;
    }
    return `${d.enter(d.windowFrame(40, 49, 142, 170, `${label(d, 57, 95, 'Nombre')}${label(d, 57, 144, 'Fecha')}${label(d, 57, 193, 'Estado')}${d.box(54, 103, 104, 20, 'dv-dark', 2)}${d.box(54, 152, 104, 20, 'dv-dark', 2)}${d.line('M65 114h54M65 163h39', 'dv-muted')}`))}
      ${d.enter(d.windowFrame(244, 49, 135, 170, `${label(d, 259, 95, 'Contacto')}${label(d, 259, 144, 'Agenda')}${label(d, 259, 193, 'Acción')}${d.box(258, 103, 103, 20, 'dv-dark', 2)}${d.box(258, 152, 103, 20, 'dv-dark', 2)}${check(d, 344, 114)}${check(d, 344, 163)}`), 150)}
      ${route(d, 'M181 114h62', 0)}${route(d, 'M181 163h62', 1000)}${route(d, 'M181 195h62', 1900)}
      ${label(d, 66, 241, 'Datos de origen')}${label(d, 248, 241, 'Datos recibidos')}`;
  }

  function aiProcesses(d, phase) {
    if (phase === 0) {
      return `${d.enter(`${envelope(d, 48, 78, 52, 33)}${envelope(d, 61, 126, 52, 33)}${envelope(d, 45, 176, 52, 33)}`)}
        ${d.enter(d.windowFrame(183, 60, 188, 150, `${d.box(200, 98, 69, 83, 'dv-accent-border', 5)}${d.box(283, 98, 71, 83, '', 5)}${d.circle(218, 120, 5)}${d.circle(250, 133, 5)}${d.circle(218, 153, 5)}${d.line('M223 120h27v8M218 125v23', 'dv-muted')}${d.line('M296 116h41M296 129h41M296 142h27', 'dv-muted')}${label(d, 202, 198, 'Clasificar')}${label(d, 285, 198, 'Resumir')}`), 140)}
        ${route(d, 'M115 143h67', 500)}${cursor(d, 255, 152)}
        ${label(d, 41, 241, 'Información de entrada')}${label(d, 226, 241, 'Tarea elegida')}`;
    }
    if (phase === 1) {
      return `${d.enter(`${d.box(42, 103, 72, 89, '', 5)}${envelope(d, 54, 121, 47, 32)}${d.line('M54 169h46', 'dv-muted')}`)}
        ${d.enter(model(d, 210, 112, 39), 130)}
        ${d.enter(d.windowFrame(306, 78, 72, 98, `${d.box(318, 112, 47, 16, 'dv-dark', 3)}${d.box(318, 137, 35, 16, 'dv-accent-border', 3)}`), 260)}
        ${route(d, 'M115 140h31V113h24', 0)}${route(d, 'M250 112h55', 1000)}
        ${d.line('M211 154v52h96', 'dv-dashed dv-muted')}${d.box(307, 192, 71, 35, '', 4)}${branch(d, 342, 209)}
        ${label(d, 45, 218, 'Preparar datos')}${label(d, 186, 59, 'Modelo')}${label(d, 298, 61, 'Respuesta')}${label(d, 174, 243, 'Incorporar al flujo')}`;
    }
    return `${d.enter(d.windowFrame(47, 64, 143, 132, `${d.box(61, 102, 111, 45, 'dv-dark', 4)}${d.line('M72 115h78M72 129h58', 'dv-muted')}${label(d, 63, 178, 'Respuesta de IA')}`))}
      ${d.enter(lens(d, 238, 122, 27), 100)}${route(d, 'M190 122h20', 0)}
      ${d.enter(`${d.box(298, 63, 79, 52, 'dv-accent-border', 5)}${check(d, 337, 84)}${label(d, 316, 103, 'Utilizar')}${d.box(298, 156, 79, 52, '', 5)}${d.accent('M327 173h18m-7-6 7 6-7 6')}${label(d, 315, 195, 'Ajustar')}`, 230)}
      ${d.line('M266 123h16V88h15M282 123v60h15', 'dv-dashed dv-muted')}${cursor(d, 356, 101)}
      ${label(d, 112, 238, 'Revisión antes de utilizarla')}`;
  }

  function localModels(d, phase) {
    if (phase === 0) {
      return `${d.enter(`${d.box(58, 56, 111, 156, '', 7)}${d.line('M72 73h84M72 87h84', 'dv-muted')}${d.circle(114, 139, 30)}${d.circle(114, 139, 21, 'dv-dim')}${d.circle(114, 139, 7, 'dv-accent dv-pulse-ring')}${d.circle(149, 194, 4, 'dv-accent')}`)}
        ${d.enter(`${chip(d, 225, 64, 56)}${d.line('M246 87h14M246 96h14', 'dv-muted')}`, 100)}
        ${d.enter(`${d.box(217, 163, 142, 43, 'dv-dark', 3)}${[0, 1, 2, 3].map(i => d.box(226 + i * 33, 172, 23, 19, '', 1)).join('')}${d.line('M232 207v5M248 207v5M265 207v5M281 207v5M298 207v5M314 207v5M331 207v5', 'dv-muted')}`, 220)}
        ${route(d, 'M169 132h22V92h27', 0)}${route(d, 'M191 132v52h25', 1200)}
        ${label(d, 68, 239, 'Equipo local')}${label(d, 222, 144, 'Procesamiento')}${label(d, 239, 237, 'Memoria disponible')}`;
    }
    if (phase === 1) {
      return `${d.enter(`${d.box(42, 50, 335, 181, 'dv-back-plane', 8)}${label(d, 64, 75, 'Ejecución dentro del equipo')}`)}
        ${d.enter(`${chip(d, 176, 110, 65)}${model(d, 208, 142, 20)}`, 120)}
        ${d.enter(`${d.box(58, 112, 88, 61, '', 5)}${label(d, 73, 137, 'Entrada')}${d.line('M73 151h56', 'dv-muted')}${d.box(279, 112, 79, 61, 'dv-accent-border', 5)}${label(d, 289, 137, 'Respuesta')}${d.line('M291 151h51', 'dv-muted')}`, 200)}
        ${route(d, 'M146 142h24', 0)}${route(d, 'M247 142h30', 1700)}
        ${d.line('M169 196h78', 'dv-dim')}${waveform(d, 171, 196, 72)}${label(d, 160, 248, 'Modelo configurado')}`;
    }
    return `${d.enter(d.windowFrame(46, 47, 246, 158, `${d.box(63, 82, 132, 33, 'dv-dark', 8)}${label(d, 76, 103, 'Tu consulta')}${d.box(109, 130, 163, 52, 'dv-accent-border', 8)}${d.line('M124 145h126M124 158h104M124 171h63', 'dv-muted')}`))}
      ${d.line('M152 205v18M122 224h62', 'dv-muted')}
      ${d.enter(`${d.box(319, 78, 55, 132, '', 6)}${d.circle(346, 117, 12)}${d.circle(346, 159, 12)}${d.circle(346, 192, 3, 'dv-accent dv-node-idle')}${d.line('M330 93h31', 'dv-muted')}`, 200)}
      ${route(d, 'M318 149h-15v41h-10', 0)}${cursor(d, 252, 164)}${label(d, 75, 245, 'Usar, revisar y conocer sus límites')}`;
  }

  function agents(d, phase) {
    if (phase === 0) {
      return `${d.enter(`${d.line('M157 55h105v160H157Z', 'dv-dashed dv-muted')}${d.box(174, 114, 72, 58, 'dv-accent-border', 8)}${branch(d, 210, 143)}${label(d, 184, 99, 'Tarea')}`)}
        ${d.enter(d.windowFrame(44, 67, 79, 67, `${d.circle(84, 110, 13)}${d.line('M71 110h26M84 97v26', 'dv-muted')}`), 100)}
        ${d.enter(storage(d, 305, 91, 54, 66), 230)}
        ${d.line('M122 112h33M264 123h40', 'dv-dashed dv-muted')}${d.circle(157, 112, 6, 'dv-accent dv-pulse-ring')}
        ${label(d, 44, 157, 'Herramientas')}${label(d, 293, 181, 'Información')}${label(d, 140, 240, 'Límites acordados')}`;
    }
    if (phase === 1) {
      return `${route(d, 'M87 99l88 28', 0)}${route(d, 'M242 124l68-40', 900)}${route(d, 'M238 165l66 37', 1700)}${route(d, 'M180 167l-79 39', 2500)}
        ${d.enter(model(d, 210, 145, 37))}
        ${d.enter(`${d.box(44, 52, 83, 56, '', 6)}${d.accent('M58 69l8 8-8 8')}${d.line('M76 79h33', 'dv-muted')}`, 90)}
        ${d.enter(`${d.box(306, 51, 65, 60, '', 4)}${d.box(317, 61, 42, 14, 'dv-dark', 2)}${[0, 1, 2].map(i => d.circle(323 + i * 14, 91, 3)).join('')}`, 160)}
        ${d.enter(d.windowFrame(297, 177, 84, 56, `${d.line('M310 207h55M310 219h31', 'dv-muted')}`), 230)}
        ${d.enter(storage(d, 48, 178, 57, 54), 300)}
        ${label(d, 44, 42, 'Petición')}${label(d, 296, 42, 'Herramienta')}${label(d, 46, 251, 'Datos')}${label(d, 172, 211, 'Agente')}`;
    }
    return `${d.enter(`${d.box(48, 62, 86, 54, '', 8)}${d.accent('M64 79l8 8-8 8')}${d.line('M82 88h36', 'dv-muted')}${label(d, 52, 141, 'Tarea enviada')}`)}
      ${d.enter(`${d.box(163, 110, 88, 58, 'dv-accent-border', 8)}${branch(d, 205, 139)}${label(d, 163, 192, 'Herramientas')}`, 120)}
      ${d.enter(`${d.box(294, 164, 79, 48, '', 6)}${d.line('M307 178h53M307 191h35', 'dv-muted')}`, 220)}
      ${route(d, 'M134 90h18v49h10', 0)}${route(d, 'M251 139h18v47h24', 1000)}
      ${lens(d, 333, 182, 33)}${d.line('M333 140V61H168', 'dv-dashed dv-muted')}${d.accent('M176 55l-8 6 8 6')}
      ${label(d, 200, 48, 'Supervisar el recorrido')}${label(d, 293, 244, 'Resultado')}`;
  }

  function aiApplication(d, phase) {
    if (phase === 0) {
      return `${d.enter(d.windowFrame(49, 53, 320, 166, `${label(d, 67, 97, 'Por revisar')}${label(d, 181, 97, 'Con apoyo de IA')}${d.line('M165 83v119', 'dv-dim')}${[0, 1, 2].map(i => `${d.box(65, 110 + i * 29, 80, 20, 'dv-dark', 3)}${d.line(`M77 ${121 + i * 29}h43`, 'dv-muted')}`).join('')}${d.box(186, 114, 156, 73, 'dv-accent-border', 5)}${d.circle(212, 143, 10)}${d.line('M228 138h89M228 151h71', 'dv-muted')}${label(d, 199, 174, 'Caso seleccionado')}`))}
        ${route(d, 'M144 120h24v30h17', 0)}${cursor(d, 319, 168)}${label(d, 83, 243, 'Elegir una tarea del trabajo diario')}`;
    }
    if (phase === 1) {
      return `${d.enter(d.windowFrame(43, 48, 334, 182, `${d.line('M59 85h87M59 91h60', 'dv-muted')}${d.box(61, 109, 72, 88, 'dv-dark', 4)}${label(d, 70, 130, 'Datos')}${d.line('M73 145h45M73 157h32M73 171h45M73 183h25', 'dv-muted')}${d.box(287, 109, 72, 88, 'dv-accent-border', 4)}${label(d, 295, 131, 'Vista')}${d.box(298, 144, 49, 29, 'dv-dark', 3)}${d.line('M299 183h39', 'dv-muted')}`))}
        ${d.enter(`${chip(d, 178, 122, 63)}${model(d, 209, 153, 19)}`, 150)}
        ${route(d, 'M134 154h38', 0)}${route(d, 'M247 154h39', 1100)}${label(d, 150, 216, 'IA local integrada')}${label(d, 89, 248, 'La aplicación recibe la respuesta')}`;
    }
    return `${d.enter(d.windowFrame(41, 69, 145, 130, `${d.line('M58 172v-55M58 172h111', 'dv-dim')}${d.box(69, 147, 18, 25, 'dv-dark', 1)}${d.box(101, 129, 18, 43, 'dv-dark', 1)}${d.box(133, 112, 18, 60, 'dv-dark', 1)}`))}
      ${d.enter(d.windowFrame(236, 69, 145, 130, `${d.line('M253 172v-55M253 172h111', 'dv-dim')}${d.box(264, 147, 18, 25, 'dv-accent-border', 1)}${d.box(296, 135, 18, 37, '', 1)}${d.box(328, 122, 18, 50, '', 1)}`), 130)}
      ${d.line('M187 133h48', 'dv-dim')}${d.circle(210, 133, 13, 'dv-accent dv-pulse-ring')}${d.accent('M206 128h9M206 138h9')}
      ${label(d, 45, 53, 'Lo que se necesita')}${label(d, 242, 53, 'Lo que devuelve')}${d.line('M109 205v18h202v-18', 'dv-muted')}${label(d, 91, 244, 'Comparación conceptual · ajustar')}`;
  }

  function propeller(d, x, y, spin = false, reverse = false, radius = 21) {
    const blade = '<path class="dv-rotor-blade" d="M-3-2C-17-13-21-11-21-5c0 5 8 7 18 8M3 2C17 13 21 11 21 5c0-5-8-7-18-8Z"/>';
    return group(x, y, `${d.circle(0, 0, radius, 'dv-dim')}<g${spin ? ` class="dv-rotor${reverse ? ' dv-rotor-reverse' : ''}"` : ''}>${blade}</g>${d.circle(0, 0, 4, 'dv-accent')}`);
  }
  function quad(d, x, y, scale = 1, spin = false) {
    return group(x, y, `${d.line('M-10-9-57-38M10-9 57-38M-10 9-57 38M10 9 57 38', 'dv-drone-arm')}${d.line('M-10-9-57-38M10-9 57-38M-10 9-57 38M10 9 57 38', 'dv-muted')}${propeller(d, -61, -41, spin)}${propeller(d, 61, -41, spin, true)}${propeller(d, -61, 41, spin, true)}${propeller(d, 61, 41, spin)}${d.box(-19, -28, 38, 56, 'dv-accent-border', 9)}${d.accent('M-8-17h16M-8-6h16M-8 5h16')}${d.circle(0, 18, 4)}`, scale);
  }
  const battery = (d, x, y, w = 47, h = 67) => `${d.box(x, y, w, h, '', 4)}${d.line(`M${x + w * .3} ${y}v-6h${w * .4}v6`, 'dv-muted')}${d.accent(`M${x + w * .5} ${y + 13}l-8 18h10l-7 18`)}${d.line(`M${x + 9} ${y + h - 8}h${w - 18}`, 'dv-muted')}`;
  const controller = (d, x, y, w = 100, h = 66) => `${d.box(x, y, w, h, '', 11)}${d.line(`M${x + 15} ${y}l-7-15M${x + w - 15} ${y}l7-15`, 'dv-muted')}${d.circle(x + 24, y + 32, 12)}${d.circle(x + w - 24, y + 32, 12)}${d.dot(x + 24, y + 28, 'dv-accent-dot')}${d.dot(x + w - 20, y + 32, 'dv-accent-dot')}${d.box(x + w / 2 - 13, y + h - 21, 26, 12, 'dv-dark', 2)}`;

  function flight(d, phase) {
    if (phase === 0) {
      return `${d.enter(quad(d, 137, 132, .86))}${d.enter(controller(d, 271, 104, 106, 77), 130)}
        ${d.circle(137, 132, 28, 'dv-accent dv-pulse-ring')}${d.line('M205 132h44M251 104v79', 'dv-dashed dv-muted')}
        ${d.enter(battery(d, 111, 212, 46, 20), 220)}${d.line('M159 221h34', 'dv-muted')}${check(d, 207, 220)}
        ${label(d, 66, 48, 'Revisión previa')}${label(d, 277, 208, 'Control')}${label(d, 56, 255, 'Equipo, batería y funcionamiento')}`;
    }
    if (phase === 1) {
      return `${d.line('M43 202l61-19 51 19 44-13 62 16 33-9 81 6M43 216h332', 'dv-dim')}
        ${d.line('M62 176c22-71 84-85 136-61s105 5 151-50', 'dv-dashed dv-muted')}${d.flow('M62 176c22-71 84-85 136-61s105 5 151-50', 0)}
        ${d.enter(`<g class="dv-drone-float">${quad(d, 213, 107, .68, true)}</g>`)}
        ${d.enter(controller(d, 288, 191, 79, 48), 180)}
        <g class="dv-radio-wave">${d.accent('M299 161q-22-3-26-22M290 177q-32-3-40-30')}</g>
        ${label(d, 49, 64, 'Recorrido acordado')}${label(d, 49, 244, 'Manejo y respuesta del dron')}`;
    }
    return `${d.enter(`${d.circle(137, 136, 77, 'dv-dim')}<ellipse class="dv-line dv-muted" cx="137" cy="208" rx="93" ry="13"/>${quad(d, 137, 137, .82)}${d.line('M97 212h80', 'dv-muted')}`)}
      ${d.enter(battery(d, 313, 93, 48, 76), 120)}${d.enter(lens(d, 286, 183, 24), 220)}
      ${d.line('M181 167l73 8', 'dv-dashed dv-muted')}${d.circle(179, 166, 8, 'dv-accent dv-pulse-ring')}
      ${label(d, 56, 45, 'Después de la operación')}${label(d, 282, 73, 'Estado del equipo')}${label(d, 75, 247, 'Revisar antes del siguiente uso')}`;
  }

  function construction(d, phase) {
    if (phase === 0) {
      return `${d.enter(`${d.line('M47 48h326v177H47Z', 'dv-dashed dv-dim')}${d.line('M52 235h315M53 229v12M367 229v12', 'dv-muted')}`)}
        ${d.enter(`${d.box(180, 102, 61, 74, 'dv-accent-border', 10)}${d.circle(192, 115, 3)}${d.circle(230, 115, 3)}${d.circle(192, 161, 3)}${d.circle(230, 161, 3)}`)}
        ${d.enter(`${propeller(d, 98, 84)}${propeller(d, 320, 84, false, true)}${battery(d, 77, 163, 44, 34)}${chip(d, 291, 157, 45)}`, 140)}
        ${d.line('M117 98l49 25M300 97l-47 26M123 179h42M255 175h27', 'dv-dashed dv-muted')}${d.flow('M255 175h27', 0)}
        ${label(d, 62, 39, 'Componentes del diseño')}${label(d, 151, 257, 'Definir el conjunto')}`;
    }
    if (phase === 1) {
      return `${d.enter(`${d.box(183, 110, 53, 66, 'dv-accent-border', 9)}${d.circle(195, 124, 3)}${d.circle(224, 163, 3)}`)}
        ${d.enter(`${d.line('M165 116 108 80M254 116l58-36M165 168l-57 34M254 168l58 34', 'dv-drone-arm')}${d.line('M165 116 108 80M254 116l58-36M165 168l-57 34M254 168l58 34', 'dv-muted')}${propeller(d, 94, 72)}${propeller(d, 327, 72, false, true)}${propeller(d, 94, 211, false, true)}${propeller(d, 327, 211)}`, 180)}
        ${route(d, 'M139 100l41 26', 0)}${route(d, 'M282 98l-43 28', 600)}${route(d, 'M139 185l40-24', 1200)}${route(d, 'M282 186l-43-24', 1800)}
        ${d.enter(`${battery(d, 192, 51, 35, 26)}${d.line('M209 78v30', 'dv-dashed dv-muted')}`, 300)}
        ${label(d, 144, 242, 'Ensamblar y conectar')}`;
    }
    return `${d.enter(quad(d, 126, 132, .84))}${d.enter(d.windowFrame(259, 74, 119, 115, `${d.line('M275 112h84M275 139h84M275 166h84', 'dv-muted')}${d.circle(294, 112, 5, 'dv-accent')}${d.circle(333, 139, 5, 'dv-accent')}${d.circle(311, 166, 5, 'dv-accent')}`), 140)}
      ${d.line('M268 190l-15 16h133l-13-16', 'dv-muted')}${route(d, 'M146 160v58h172v-12', 0)}
      ${label(d, 48, 52, 'Dron ensamblado')}${label(d, 259, 57, 'Configuración')}${label(d, 91, 246, 'Preparar la siguiente comprobación')}`;
  }

  function tuning(d, phase) {
    if (phase === 0) {
      return `${d.enter(`${d.line('M47 211h327M69 212v19M351 212v19', 'dv-muted')}${quad(d, 144, 131, .83)}`)}
        ${d.enter(`${d.box(287, 82, 79, 91, '', 7)}${d.box(299, 95, 55, 32, 'dv-dark', 3)}${d.line('M308 111h37', 'dv-muted')}${d.circle(312, 148, 5)}${d.circle(342, 148, 5)}`, 120)}
        ${d.line('M302 174v27h-66v-61h-21', 'dv-muted')}${route(d, 'M215 140h21v60h65', 0)}${lens(d, 207, 139, 24)}
        ${label(d, 56, 47, 'Revisar piezas y conexiones')}${label(d, 97, 247, 'Comprobación inicial del equipo')}`;
    }
    if (phase === 1) {
      return `${d.enter(`${d.circle(148, 133, 74, 'dv-dim')}${d.circle(148, 133, 52, 'dv-muted')}${d.line('M66 133h164M148 51v164', 'dv-dashed dv-dim')}${quad(d, 148, 133, .58)}`)}
        ${d.enter(`${d.box(272, 59, 100, 153, '', 6)}${label(d, 286, 84, 'Ajustes')}${d.line('M289 109h67M289 148h67M289 185h67', 'dv-muted')}${d.circle(310, 109, 6, 'dv-accent')}${d.circle(337, 148, 6, 'dv-accent')}${d.circle(322, 185, 6, 'dv-accent')}`, 160)}
        ${route(d, 'M272 150h-35v-17h-17', 0)}${d.circle(148, 133, 33, 'dv-accent dv-pulse-ring')}
        ${d.line('M89 221h119M89 217v8M208 217v8', 'dv-muted')}${label(d, 102, 246, 'Ajustar y observar la respuesta')}`;
    }
    return `${d.enter(`${d.box(75, 138, 67, 44, '', 6)}${d.line('M108 115v23M91 181v37M128 181v37M71 218h78', 'dv-muted')}${propeller(d, 108, 105, true, false, 34)}`)}
      ${d.enter(d.windowFrame(211, 59, 167, 138, `${d.line('M227 118h135M227 146h135M227 173h135', 'dv-dim')}${waveform(d, 228, 143, 131)}`), 150)}
      ${route(d, 'M143 160h35V128h32', 0)}${d.line('M279 198v19M250 219h59', 'dv-muted')}
      ${label(d, 58, 54, 'Prueba del conjunto')}${label(d, 58, 245, 'Respuesta observada')}${label(d, 239, 245, 'Resultados y límites')}`;
  }

  // Bots are represented as executable processes, not human accounts or mascots.
  const worker = (d, x, y, state = 'run') => `${d.box(x, y, 56, 39, 'dv-accent-border', 4)}${d.line(`M${x + 10} ${y + 12}l6 6-6 6M${x + 25} ${y + 25}h10`, 'dv-muted')}${d.circle(x + 45, y + 12, 3, state === 'run' ? 'dv-accent dv-node-idle' : 'dv-muted')}`;
  const gateway = (d, x, y) => `${d.box(x, y, 66, 86, '', 7)}${d.box(x + 10, y + 12, 46, 19, 'dv-dark', 2)}${d.line(`M${x + 18} ${y + 21}h29M${x + 12} ${y + 45}h42M${x + 12} ${y + 53}h42`, 'dv-muted')}${d.circle(x + 19, y + 69, 3, 'dv-accent dv-node-idle')}${d.line(`M${x + 32} ${y + 69}h19`, 'dv-muted')}`;

  function botFarms(d, phase) {
    if (phase === 0) {
      return `${d.enter(`${d.box(42, 67, 108, 151, '', 7)}${[0, 1, 2].map(i => `${d.box(54, 80 + i * 42, 84, 30, 'dv-dark', 3)}${d.circle(67, 95 + i * 42, 3, 'dv-accent dv-node-idle')}${d.line(`M80 ${91 + i * 42}h44M80 ${100 + i * 42}h31`, 'dv-muted')}`).join('')}`)}
        ${d.enter(`${d.box(233, 64, 145, 160, 'dv-dashed', 6)}${worker(d, 246, 80)}${worker(d, 309, 80)}${worker(d, 246, 130)}${worker(d, 309, 130)}${d.line('M247 188h115M247 201h74', 'dv-muted')}`, 180)}
        ${route(d, 'M151 104h40v-7h42', 0)}${route(d, 'M151 177h40v-26h42', 900)}
        ${label(d, 44, 50, 'Servidor y recursos')}${label(d, 236, 48, 'Instancias de bots')}
        ${label(d, 62, 243, 'CPU · Memoria')}${label(d, 240, 246, 'Entornos separados')}`;
    }
    if (phase === 1) {
      return `${d.enter(`${d.box(38, 94, 126, 96, 'dv-dark', 5)}${[0, 1, 2].map(i => `${d.box(49 + i * 34, 110, 25, 49, '', 2)}${d.line(`M${55 + i * 34} 123h12M${55 + i * 34} 132h8`, 'dv-muted')}`).join('')}${d.accent('M50 176h100m-7-5 7 5-7 5')}`)}
        ${d.enter(`${d.circle(220, 142, 20, 'dv-accent')}${branch(d, 220, 142)}`, 140)}
        ${route(d, 'M164 142h35', 0)}${route(d, 'M240 142h27V79h38', 300)}${route(d, 'M240 142h65', 1000)}${route(d, 'M267 142v63h38', 1700)}
        ${d.enter(`${worker(d, 305, 59)}${worker(d, 305, 122)}${worker(d, 305, 185)}`, 250)}
        ${label(d, 40, 78, 'Tareas pendientes')}${label(d, 176, 48, 'Distribuir trabajo')}${label(d, 307, 43, 'Bots')}
        ${clock(d, 90, 225, 13)}${label(d, 112, 230, 'Horarios y límites')}`;
    }
    return `${d.enter(d.windowFrame(42, 46, 218, 190, `${label(d, 58, 90, 'Instancia')}${label(d, 158, 90, 'Estado')}${[0, 1, 2].map(i => d.line(`M55 ${102 + i * 40}h191`, 'dv-dim')).join('')}${label(d, 59, 121, 'Bot A')}${label(d, 157, 121, 'En marcha')}${label(d, 59, 161, 'Bot B')}${label(d, 157, 161, 'Pausado')}${label(d, 59, 201, 'Bot C')}${label(d, 157, 201, 'Revisar')}${d.circle(233, 116, 3, 'dv-accent dv-node-idle')}${d.accent('M231 151v11M237 151v11M232 190l-6 11h12Z')}`))}
      ${d.enter(`${d.circle(320, 111, 24, 'dv-accent')}${d.accent('M306 110a14 14 0 1 1 9 14M306 103v9h9')}${d.box(288, 178, 83, 44, 'dv-dark', 4)}${d.line('M300 190h56M300 201h39M300 212h48', 'dv-muted')}`, 160)}
      ${route(d, 'M261 159h16v-48h18', 0)}${route(d, 'M261 204h26', 1200)}
      ${label(d, 290, 152, 'Reiniciar')}${label(d, 290, 244, 'Registros')}${label(d, 56, 259, 'Ejemplo de estados y controles')}`;
  }

  function proxies(d, phase) {
    if (phase === 0) {
      return `${d.enter(d.windowFrame(39, 71, 91, 110, `${d.accent('M60 117l-9 9 9 9M107 117l9 9-9 9')}${d.line('M91 111l-12 29', 'dv-muted')}`))}
        ${d.enter(gateway(d, 181, 83), 140)}${d.enter(storage(d, 305, 103, 66, 65), 250)}
        ${route(d, 'M130 117h50', 0)}${route(d, 'M248 117h56', 850)}${route(d, 'M305 162h-31v42H155v-47h-24', 1500)}
        ${label(d, 40, 54, 'Aplicación')}${label(d, 194, 66, 'Proxy')}${label(d, 308, 82, 'Servicio')}
        ${label(d, 50, 247, 'Solicitud')}${d.accent('M112 243h34m-6-4 6 4-6 4')}${label(d, 228, 247, 'Respuesta')}`;
    }
    if (phase === 1) {
      return `${d.enter(`${d.box(40, 110, 95, 80, '', 5)}${d.circle(64, 140, 8)}${d.accent('M72 140h35m-9 0v8m7-8v6')}${label(d, 49, 172, 'Credenciales')}`)}
        ${route(d, 'M135 143h38', 0)}${d.enter(`${d.box(174, 77, 82, 139, 'dv-accent-border', 6)}${d.line('M188 99h53M188 126h53M188 153h53M188 180h53', 'dv-muted')}${check(d, 195, 98)}${check(d, 195, 125)}${label(d, 186, 202, 'Reglas')}`, 140)}
        ${route(d, 'M257 110h27V88h24', 700)}${d.enter(d.windowFrame(308, 61, 72, 69, `${check(d, 341, 106)}`), 200)}
        ${d.line('M257 175h28v29h22', 'dv-dashed dv-muted')}${d.circle(333, 204, 21, 'dv-muted')}${d.accent('M319 190l28 28')}
        ${label(d, 38, 84, 'Acceso')}${label(d, 172, 57, 'Control del proxy')}${label(d, 302, 150, 'Permitido')}${label(d, 303, 245, 'Detenido')}`;
    }
    return `${d.enter(d.windowFrame(42, 51, 177, 116, `${label(d, 58, 92, 'Probar conexión')}${d.line('M57 140h142M57 111v29', 'dv-dim')}${waveform(d, 62, 128, 126)}`))}
      ${d.enter(`${gateway(d, 295, 50)}${gateway(d, 295, 164)}${d.accent('M313 197l29 26M342 197l-29 26')}`, 180)}
      ${route(d, 'M220 94h74', 0)}${route(d, 'M295 121h-42v66H134v-20', 800)}${d.line('M253 150v57h40', 'dv-dashed dv-muted')}
      ${d.enter(`${clock(d, 85, 222, 20)}${label(d, 116, 216, 'Tiempo de respuesta')}${label(d, 116, 238, 'Revisar fallos')}`, 240)}
      ${label(d, 280, 37, 'Proxy disponible')}${label(d, 285, 156, 'Fuera de servicio')}`;
  }

  const phaseIndex = value => Math.max(0, Math.min(2, Number.isFinite(Number(value)) ? Math.trunc(Number(value)) : 0));
  const draw = (stories, index, phase) => {
    const d = window.DisciplineDrawing;
    const storyIndex = Math.max(0, Math.min(stories.length - 1, Number.isFinite(Number(index)) ? Math.trunc(Number(index)) : 0));
    const story = stories[storyIndex];
    return story(d, phaseIndex(phase));
  };

  window.DISCIPLINE_STORY_ART = {
    ...window.DISCIPLINE_STORY_ART,
    automatizacion: (index, phase, uid) => draw([workflows, integrations, aiProcesses], index, phase),
    bots: (index, phase, uid) => draw([botFarms, proxies], index, phase),
    ia: (index, phase, uid) => draw([localModels, agents, aiApplication], index, phase),
    drones: (index, phase, uid) => draw([flight, construction, tuning], index, phase),
  };
})();
