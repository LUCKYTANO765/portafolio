/* Original conceptual illustrations. No live data, third-party SVG or animation runtime. */
(() => {
  'use strict';

  let instance = 0;
  const line = (d, extra = '') => `<path class="dv-line ${extra}" d="${d}"/>`;
  const accent = (d, extra = '') => `<path class="dv-line dv-accent ${extra}" d="${d}"/>`;
  const circle = (x, y, r, extra = '') => `<circle class="dv-line ${extra}" cx="${x}" cy="${y}" r="${r}"/>`;
  const dot = (x, y, extra = '') => `<circle class="dv-dot ${extra}" cx="${x}" cy="${y}" r="3"/>`;
  const text = (x, y, value, extra = '') => `<text class="dv-label ${extra}" x="${x}" y="${y}">${value}</text>`;
  const enter = (content, delay = 0) => `<g class="dv-enter" style="--dv-delay:${delay}ms">${content}</g>`;
  const flow = (d, delay = 0) => `<path class="dv-flow" d="${d}" pathLength="100" style="--dv-delay:${delay}ms"/>`;
  const box = (x, y, w, h, extra = '', radius = 5) => `<rect class="dv-surface ${extra}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}"/>`;
  const tag = (x, y, label) => `${line(`M${x - 5} ${y - 7}h-12`)}${text(x, y - 4, label)}`;

  function phone(x, y, w = 88, h = 166, interior = '') {
    return `${box(x, y, w, h, 'dv-phone-frame', 14)}
      <rect class="dv-phone-screen" x="${x + 7}" y="${y + 8}" width="${w - 14}" height="${h - 16}" rx="9"/>
      ${line(`M${x + w / 2 - 10} ${y + 14}h20`, 'dv-muted')}
      ${line(`M${x + w / 2 - 10} ${y + h - 10}h20`, 'dv-muted')}${interior}`;
  }

  function windowFrame(x, y, w, h, interior, extra = '') {
    return `${box(x, y, w, h, extra)}${line(`M${x} ${y + 21}h${w}`, 'dv-dim')}
      <circle class="dv-dot dv-soft" cx="${x + 12}" cy="${y + 11}" r="1.5"/>
      <circle class="dv-dot dv-soft" cx="${x + 19}" cy="${y + 11}" r="1.5"/>
      ${line(`M${x + 31} ${y + 11}h${Math.max(18, w - 48)}`, 'dv-dim')}${interior}`;
  }

  function antenna(x, y, scale = 1, delay = 0) {
    return `<g transform="translate(${x} ${y}) scale(${scale})">
      ${line('M-15 35 0-20 15 35M-11 22h22M-7 7h14M-20 35h40')}
      ${circle(0, -24, 3, 'dv-accent')}
      <g class="dv-radio-wave" style="--dv-delay:${delay}ms">${accent('M-10-33a14 14 0 0 0 0 18M10-33a14 14 0 0 1 0 18')}</g>
      <g class="dv-radio-wave dv-wave-outer" style="--dv-delay:${delay + 500}ms">${line('M-19-42a26 26 0 0 0 0 36M19-42a26 26 0 0 1 0 36')}</g>
    </g>`;
  }

  function cyber(index, uid) {
    if (index === 3) {
      return `${enter(windowFrame(54, 62, 180, 133, `${line('M80 109h64M80 126h116M80 142h88', 'dv-muted')}`))}
        ${enter(`${line('M127 196v20M91 217h74', 'dv-muted')}${phone(264, 79, 67, 132, `${line('M278 115h39M278 128h27', 'dv-muted')}`)}`, 180)}
        ${enter(`${circle(218, 155, 33, 'dv-accent dv-pulse-ring')}${circle(209, 153, 8, 'dv-accent')}${accent('M217 153h23M231 153v8M238 153v6')}`, 350)}
        ${flow('M233 149h31', 1500)}${tag(115, 251, 'RECUPERACIÓN DE ACCESO')}`;
    }
    if (index === 1) {
      const links = ['M110 88 209 137', 'M110 88 94 198', 'M94 198 209 137', 'M209 137 309 73', 'M209 137 326 173', 'M209 137 222 219', 'M309 73 326 173'];
      const nodes = [[110, 88], [94, 198], [309, 73], [326, 173], [222, 219]];
      return `${enter(links.map(d => line(d, 'dv-dim')).join(''))}
        ${links.slice(0, 5).map((d, i) => flow(d, i * 620)).join('')}
        ${nodes.map(([x, y], i) => enter(`<g class="dv-node-idle" style="--dv-delay:${i * 350}ms">${box(x - 16, y - 16, 32, 32)}${line(`M${x - 7} ${y - 4}h14M${x - 7} ${y + 2}h10M${x - 7} ${y + 8}h6`, 'dv-muted')}</g>`, 80 + i * 80)).join('')}
        ${enter(`${circle(209, 137, 29, 'dv-accent')}${circle(209, 137, 22, 'dv-dim')}${accent('M199 135a7 7 0 1 1 14 0 7 7 0 1 1-14 0m12 6 8 8')}`, 380)}
        ${tag(82, 53, 'FUENTES ABIERTAS')}${tag(287, 230, 'RELACIONES')}`;
    }
    if (index === 2) {
      return `${enter(`${box(99, 59, 110, 164, 'dv-back-plane', 11)}${box(117, 48, 110, 164, 'dv-back-plane', 11)}`)}
        ${enter(phone(145, 41, 98, 188, `${box(160, 77, 68, 31, 'dv-dark')}${circle(174, 92, 4, 'dv-muted')}${line('M186 89h28M186 96h20', 'dv-muted')}
          ${box(160, 117, 68, 64, 'dv-dark')}${line('M171 137h45M171 147h28M171 159h35', 'dv-muted')}
          ${line('M167 197h28', 'dv-muted')}${box(204, 192, 18, 9, 'dv-accent', 4)}${dot(216, 196.5, 'dv-accent-dot')}`), 150)}
        ${enter(`${box(267, 106, 52, 56, 'dv-accent-border', 8)}${accent('M281 127v-7a12 12 0 0 1 24 0v7M279 128h28v22h-28z')}${dot(293, 137, 'dv-accent-dot')}${accent('M293 140v4')}`, 380)}
        ${line('M244 135h22', 'dv-dim')}${flow('M244 135h22', 1500)}
        ${tag(85, 252, 'AISLAMIENTO')}${tag(270, 191, 'PERMISOS')}`;
    }
    const marks = Array.from({ length: 36 }, (_, i) => `<path class="dv-line ${i % 3 === 0 ? 'dv-muted' : 'dv-dim'}" d="M210 46v${i % 3 === 0 ? 7 : 3}" transform="rotate(${i * 10} 210 140)"/>`).join('');
    return `${enter(`${circle(210, 140, 94, 'dv-dim')}${circle(210, 140, 72, 'dv-muted')}${circle(210, 140, 46, 'dv-dim')}${circle(210, 140, 20, 'dv-dim')}${line('M107 140h206M210 37v206', 'dv-dim')}${marks}`)}
      <g class="dv-radar-sweep"><path d="M210 140 210 68A72 72 0 0 1 261 89Z" fill="url(#${uid}-sweep)"/>${accent('M210 140V68')}</g>
      ${enter(`${dot(173, 103, 'dv-accent-dot')}${dot(253, 155)}${dot(183, 182)}${circle(173, 103, 8, 'dv-accent dv-pulse-ring')}${circle(253, 155, 7, 'dv-pulse-ring')}${dot(210, 140, 'dv-accent-dot')}`, 320)}
      ${line('M173 103 134 82H72M253 155l40 26h50', 'dv-dim')}${text(72, 73, 'SUPERFICIE')}${text(294, 195, 'ANÁLISIS')}`;
  }

  function forensics(index, uid) {
    if (index === 4) {
      return `${enter(phone(98, 43, 111, 193, `${box(114, 79, 69, 27, 'dv-dark')}${line('M123 89h46M123 97h32', 'dv-muted')}${box(128, 119, 65, 34, 'dv-accent-border')}${line('M137 131h44M137 140h29', 'dv-muted')}${box(114, 167, 69, 27, 'dv-dark')}${line('M123 178h43', 'dv-muted')}`))}
        ${enter(`${box(275, 100, 58, 81)}${line('M286 118h34M286 131h25M286 145h34M286 161h20', 'dv-muted')}`, 260)}
        ${line('M211 137h63', 'dv-dim')}${flow('M211 137h63', 1000)}${tag(94, 256, 'MENSAJERÍA')}${text(265, 216, 'EVIDENCIAS')}`;
    }
    if (index === 5) {
      return `${enter(windowFrame(57, 58, 240, 142, `${box(71, 93, 72, 87, 'dv-dark')}${line('M81 109h45M81 123h33M81 137h46M81 152h29', 'dv-muted')}${line('M159 105h120M159 121h92M159 137h112M159 162h72', 'dv-muted')}`))}
        ${line('M174 201v18M138 220h73', 'dv-muted')}${enter(`${box(296, 131, 67, 89, 'dv-accent-border')}${line('M308 151h43M308 165h29M308 179h40M308 196h26', 'dv-muted')}`, 260)}
        ${flow('M222 142h95', 1200)}${tag(84, 252, 'ARCHIVOS / REGISTROS')}`;
    }
    if (index === 2) {
      return `${enter(`${line('M72 225 126 163 188 218 266 151 351 204', 'dv-dim')}${line('M93 235 156 179 224 230 300 174', 'dv-dim')}${line('M62 179 133 224 198 169 269 220 343 165', 'dv-dim')}`)}
        ${enter(antenna(107, 114, 1, 0), 100)}${enter(antenna(312, 110, 1, 650), 200)}${enter(antenna(221, 78, .67, 1200), 280)}
        ${line('M107 90 210 187 312 86M221 62 210 187', 'dv-dashed dv-dim')}
        ${flow('M107 90 210 187', 1500)}${flow('M312 86 210 187', 2200)}
        ${enter(`${circle(210, 188, 20, 'dv-dim')}${circle(210, 188, 11, 'dv-accent dv-pulse-ring')}${box(201, 173, 18, 31, '', 3)}${line('M205 178h10M207 199h6', 'dv-muted')}`, 400)}
        ${tag(77, 255, 'CELDAS Y REGISTROS')}${text(303, 242, 'CONTEXTO')}`;
    }
    if (index === 3) {
      return `${enter(phone(58, 73, 72, 139, `${line('M75 114h38M75 124h28M75 134h33', 'dv-muted')}${circle(94, 169, 13, 'dv-dim')}${accent('M87 170h14M94 163v14')}`), 100)}
        ${enter(antenna(324, 123, 1.3, 200), 200)}
        ${line('M133 121h133M133 153h133', 'dv-dim')}${flow('M133 121h133', 800)}${flow('M266 153H133', 2100)}
        <g class="dv-waveform">${accent('M147 139h9l5-8 6 16 6-26 7 38 7-31 7 21 6-10h12l6-7 7 16 6-9h19')}</g>
        ${enter(`${box(157, 190, 103, 43)}${line('M170 204h76M170 213h48M170 222h63', 'dv-muted')}`, 420)}
        ${line('M209 162v26', 'dv-dashed dv-dim')}${tag(154, 70, 'COMUNICACIONES')}${text(275, 220, 'REGISTROS')}`;
    }
    if (index === 1) {
      const cells = Array.from({ length: 20 }, (_, i) => {
        const x = 151 + (i % 5) * 22, y = 90 + Math.floor(i / 5) * 23;
        return `<rect class="dv-memory-cell ${[2, 7, 11, 13, 18].includes(i) ? 'dv-memory-recover' : ''}" x="${x}" y="${y}" width="14" height="14" rx="2" style="--dv-delay:${i * 90}ms"/>`;
      }).join('');
      return `${enter(`${box(131, 62, 147, 155, 'dv-dark', 9)}${line('M145 77h32M250 202h15', 'dv-muted')}${cells}${line('M151 193h70', 'dv-muted')}`)}
        ${enter(`${box(300, 102, 54, 70)}${line('M312 120h26M312 132h26M312 144h18M312 156h22', 'dv-muted')}`, 400)}
        ${line('M278 137h21', 'dv-dim')}${flow('M252 137h48', 1200)}
        ${line('M98 90H77v101h21', 'dv-dim')}${accent('M91 134h22m-6-6 6 6-6 6', 'dv-draw')}
        ${tag(128, 245, 'RECUPERACIÓN')}${text(297, 193, 'REVISIÓN')}`;
    }
    return `${enter(phone(102, 49, 103, 186, `${box(118, 85, 70, 47, 'dv-dark')}${line('M128 99h49M128 108h35M128 117h43', 'dv-muted')}${box(118, 142, 31, 32, 'dv-dark')}${box(157, 142, 31, 32, 'dv-dark')}${line('M119 188h61M119 198h43', 'dv-muted')}`))}
      <g clip-path="url(#${uid}-phone-clip)"><g class="dv-phone-scan"><rect x="111" y="80" width="85" height="24" fill="url(#${uid}-scan)"/>${accent('M112 104h83')}</g></g>
      ${enter(`${box(265, 66, 60, 65)}${line('M276 85h35M276 94h24M276 103h32M276 116h17', 'dv-muted')}`, 280)}
      ${enter(`${box(253, 170, 71, 48)}${line('M266 184h44M266 193h31M266 202h38', 'dv-muted')}`, 420)}
      ${line('M206 110h25V98h33M206 174h25v20h21', 'dv-dim')}${flow('M206 110h25V98h33', 900)}${flow('M206 174h25v20h21', 1800)}
      ${tag(260, 150, 'EVIDENCIA')}`;
  }

  function web(index) {
    if (index === 1) {
      return `${enter(windowFrame(55, 80, 117, 130, `${line('M69 117h52M69 132h83M69 147h65M69 175h38', 'dv-muted')}${accent('M81 185h25')}`))}
        ${enter(`${box(229, 60, 124, 46)}${box(229, 117, 124, 46)}${box(229, 174, 124, 46)}
          ${[83, 140, 197].map((y, i) => `${dot(244, y, i === 1 ? 'dv-accent-dot' : '')}${line(`M258 ${y - 3}h72M258 ${y + 5}h48`, 'dv-muted')}`).join('')}`, 240)}
        ${line('M172 144h30V83h27M202 144h27M202 144v53h27', 'dv-dim')}${flow('M172 144h57', 700)}${flow('M229 197h-27V144H172', 2300)}${tag(65, 243, 'INTERFAZ')}${tag(248, 243, 'SERVICIOS')}`;
    }
    if (index === 2) {
      return `${enter(windowFrame(69, 51, 200, 145, `${accent('M86 91 94 99 86 107')}${line('M106 101h91M86 122h133M86 139h85', 'dv-muted')}`))}
        ${enter(`${box(170, 143, 172, 84, 'dv-accent-border')}${[0, 1, 2].map(i => `${box(185 + i * 47, 160, 35, 35, 'dv-dark')}${line(`M${194 + i * 47} 170h17M${194 + i * 47} 180h17`, 'dv-muted')}`).join('')}${line('M185 209h141', 'dv-dim')}`, 220)}
        ${flow('M193 177h116', 1400)}${tag(74, 245, 'ENTORNOS REPRODUCIBLES')}`;
    }
    return `${enter(windowFrame(60, 54, 221, 141, `${box(74, 91, 76, 80, 'dv-dark')}${line('M163 100h91M163 111h72M163 132h81M163 143h56', 'dv-muted')}${accent('M163 166h39')}${line('M84 109h36M84 124h52M84 139h41', 'dv-muted')}`))}
      ${enter(windowFrame(242, 107, 112, 127, `${box(255, 142, 85, 31, 'dv-dark')}${line('M255 186h83M255 197h63M255 210h72', 'dv-muted')}`, 'dv-accent-border'), 250)}
      <g class="dv-ui-cursor">${accent('M214 153v22l6-7 8 2Z')}${circle(220, 165, 14, 'dv-dim dv-pulse-ring')}</g>
      ${tag(67, 231, 'INTERACCIÓN')}`;
  }

  function mobile(index) {
    const isIntegration = index === 2;
    return `${enter(`${box(109, 68, 87, 169, 'dv-back-plane', 13)}${box(125, 55, 87, 169, 'dv-back-plane', 13)}`)}
      ${enter(phone(143, 40, 103, 193, `${circle(170, 81, 9, 'dv-muted')}${line('M188 79h40M188 87h27', 'dv-muted')}${box(158, 103, 73, 47, 'dv-dark')}${line('M168 117h48M168 127h32M168 138h39', 'dv-muted')}
        <g class="dv-ui-tile">${box(158, 160, 32, 30, 'dv-dark')}${box(198, 160, 33, 30, 'dv-dark')}${accent('M168 175h12M174 169v12')}${circle(214, 175, 6, 'dv-muted')}</g>
        ${line('M160 208h68', 'dv-dim')}${dot(170, 208, 'dv-accent-dot')}${dot(194, 208)}${dot(219, 208)}`), 140)}
      ${enter(`${box(284, 93, 57, 49, 'dv-accent-border')}${isIntegration ? `${accent('M296 117h32M303 110l-7 7 7 7M321 110l7 7-7 7')}` : `${accent('M298 109 291 117 298 125M322 109 329 117 322 125M315 106l-7 22')}`}
        ${line('M247 119h37', 'dv-dim')}${flow('M247 119h37', 1200)}`, 350)}
      ${tag(288, 166, isIntegration ? 'API' : index === 1 ? 'JAVA' : 'FLUTTER')}${tag(98, 256, 'EXPERIENCIA MÓVIL')}`;
  }

  function qa(index) {
    const route = index === 2 ? 'M92 113h114v70h108v-70H206' : 'M92 113h114v70h108';
    return `${enter(windowFrame(49, 49, 321, 185, `${line('M66 85h102', 'dv-muted')}${line(route, 'dv-route-base')}`))}
      ${[ [92, 113], [206, 113], [206, 183], [314, 183] ].map(([x, y], i) => enter(`${box(x - 18, y - 18, 36, 36, i === index % 4 ? 'dv-accent-border' : '', 7)}
        ${i === 0 ? accent(`M${x - 4} ${y - 7}l10 7-10 7z`) : i === 1 ? line(`M${x - 8} ${y - 5}h16M${x - 8} ${y + 1}h11M${x - 8} ${y + 7}h14`, 'dv-muted') : i === 2 ? `${circle(x, y, 8, 'dv-muted')}${line(`M${x} ${y - 4}v8M${x - 4} ${y}h8`, 'dv-muted')}` : `${circle(x, y, 8, 'dv-accent')}${dot(x, y, 'dv-accent-dot')}`}`, 120 + i * 110)).join('')}
      ${flow(route, 1000)}${text(68, 218, 'ESCENARIO')}${text(270, 91, 'RECORRIDO')}
      ${index === 1 ? `${line('M97 150v40h60', 'dv-dashed dv-dim')}${circle(163, 190, 6, 'dv-muted')}` : ''}`;
  }

  function automation(index) {
    const paths = ['M105 140h62', 'M220 140h24V85h50', 'M220 140h24v56h50'];
    return `${enter(paths.map(d => line(d, 'dv-route-base')).join(''))}${paths.map((d, i) => flow(d, 600 + i * 750)).join('')}
      ${enter(`${box(55, 115, 50, 50, '', 12)}${accent('M83 126 73 141h8l-4 12 13-17h-9z')}`, 80)}
      ${enter(`${box(167, 110, 54, 61, 'dv-accent-border', 12)}${index === 2 ? `${circle(184, 132, 4, 'dv-accent')}${circle(204, 131, 4, 'dv-accent')}${circle(194, 150, 4, 'dv-accent')}${accent('M184 136l10 10 10-11M188 132h12')}` : `${circle(182, 140, 4, 'dv-accent')}${circle(205, 129, 4, 'dv-accent')}${circle(205, 151, 4, 'dv-accent')}${accent('M186 140h5l10-11M191 140l10 11')}`}`, 220)}
      ${enter(`${box(294, 60, 62, 50, '', 12)}${accent('M310 76 303 85 310 94M340 76 347 85 340 94')}${line('M324 75v20', 'dv-muted')}`, 360)}
      ${enter(`${box(294, 171, 62, 50, '', 12)}${line('M310 185h29M310 193h29M310 201h20', 'dv-muted')}`, 470)}
      ${text(59, 190, 'EVENTO')}${text(183, 195, index === 2 ? 'IA' : 'n8n')}${text(283, 247, 'INTEGRACIONES')}`;
  }

  function ai(index) {
    const layers = [0, 1, 2].map((i) => {
      const y = 79 + i * 47;
      return enter(`<g class="dv-layer-idle" style="--dv-delay:${i * 450}ms">${box(162, y - 15, 98, 42, i === index ? 'dv-accent-border' : '', 6)}
        ${[181, 211, 241].map((x, j) => `${circle(x, y + 6, 5, j === i ? 'dv-accent' : 'dv-muted')}${j < 2 ? line(`M${x + 5} ${y + 6}h20`, 'dv-dim') : ''}`).join('')}</g>`, 120 + i * 140);
    }).join('');
    return `${enter(`${line('M80 142h47V85h34M127 142h34M127 142v37h34M261 85h31v57h40M261 132h31M261 179h31v-37', 'dv-dim')}${line('M181 105v19M211 105v19M241 105v19M181 152v19M211 152v19M241 152v19', 'dv-dashed dv-dim')}`)}
      ${layers}${flow('M80 142h47V85h34', 900)}${flow('M181 105v19', 1600)}${flow('M241 152v19', 2200)}${flow('M261 179h31v-37h40', 2900)}
      ${enter(`${box(51, 121, 35, 42, '', 5)}${line('M59 132h18M59 141h12M59 150h16', 'dv-muted')}${box(331, 121, 35, 42, 'dv-accent-border', 5)}${accent('M341 132h14M341 140h14M341 148h9')}`, 80)}
      ${line('M147 53V41h128v12M147 207v13h128v-13', 'dv-dim')}${text(170, 244, index === 1 ? 'AGENTE LOCAL' : 'MODELO LOCAL')}${text(48, 187, 'ENTRADA')}${text(327, 187, 'SALIDA')}`;
  }

  function drones(index) {
    const rotor = (x, y, reverse) => `<g transform="translate(${x} ${y})">${circle(0, 0, 27, 'dv-dim')}${circle(0, 0, 19, 'dv-muted')}<g class="dv-rotor ${reverse ? 'dv-rotor-reverse' : ''}"><path class="dv-rotor-blade" d="M-4-3C-21-16-24-14-25-7c-1 6 9 9 21 10M4 3C21 16 24 14 25 7c1-6-9-9-21-10Z"/></g>${circle(0, 0, 4, 'dv-accent')}</g>`;
    return `${enter(`${line('M67 225h285', 'dv-dim')}<ellipse class="dv-ground-shadow" cx="210" cy="224" rx="83" ry="8"/>${line('M80 216v17M340 216v17', 'dv-dim')}`)}
      ${enter(`<g class="dv-drone-float">${line('M197 117 146 82M223 117 274 82M197 146 146 181M223 146 274 181', 'dv-drone-arm')}${line('M197 117 146 82M223 117 274 82M197 146 146 181M223 146 274 181', 'dv-muted')}
        ${rotor(140, 78, false)}${rotor(280, 78, true)}${rotor(140, 184, true)}${rotor(280, 184, false)}
        <path class="dv-surface dv-accent-border" d="M196 105q14-8 28 0l9 29-14 25h-18l-14-25Z"/>
        ${accent('M203 116h14M201 126h18M201 134h18')}${circle(210, 145, 4, 'dv-muted')}${line('M196 112l-7-8M224 112l7-8', 'dv-muted')}
        ${index === 1 ? `${line('M99 78H65M321 184h34M211 162v36', 'dv-dashed dv-muted')}${circle(62, 78, 3, 'dv-accent')}${circle(358, 184, 3, 'dv-accent')}` : ''}
      </g>`, 120)}
      ${index === 2 ? `<g class="dv-radio-wave">${accent('M194 55q16-13 32 0M185 43q25-21 50 0')}</g>` : ''}
      ${tag(99, 254, index === 1 ? 'ENSAMBLAJE' : index === 2 ? 'PUESTA A PUNTO' : 'CONTROL DE VUELO')}`;
  }

  function radiofrequency(index, uid) {
    if (index === 2) return forensics(2, uid);
    if (index === 1) {
      return `${enter(`${circle(210, 140, 87, 'dv-dim')}${circle(210, 140, 58, 'dv-muted')}${circle(210, 140, 29, 'dv-dim')}${line('M105 140h210M210 35v210', 'dv-dashed dv-dim')}`)}
        <g class="dv-radar-sweep"><path d="M210 140V53A87 87 0 0 1 285 96Z" fill="url(#${uid}-sweep)"/>${accent('M210 140 285 96')}</g>
        ${enter(`${circle(165, 99, 6, 'dv-accent dv-pulse-ring')}${dot(165, 99, 'dv-accent-dot')}${dot(255, 173)}${circle(255, 173, 5, 'dv-muted')}`, 300)}
        ${line('M165 99H86v-26M255 173h83v23', 'dv-dim')}${text(49, 60, 'EMISOR')}${text(295, 213, 'SEÑAL RF')}${tag(155, 252, 'DETECCIÓN ELECTRÓNICA')}`;
    }
    return `${enter(windowFrame(65, 60, 288, 153, `${line('M83 116h251M83 144h251M83 172h251', 'dv-dim')}
        <g class="dv-waveform">${accent('M84 145h15l9-24 13 47 13-60 14 71 12-35h18l9-16 13 31 12-15h17l12-24 12 49 13-38 12 28 10-15h26')}</g>
        ${line('M177 88v108M241 88v108', 'dv-dashed dv-muted')}`))}
      ${enter(`${box(161, 183, 99, 43, 'dv-accent-border')}${circle(178, 204, 4, 'dv-accent dv-node-idle')}${line('M192 200h49M192 208h35', 'dv-muted')}`, 350)}
      ${tag(96, 250, 'INTERFERENCIA / LABORATORIO')}`;
  }

  function intelligence(index, uid) {
    if (index === 1) return cyber(1, uid);
    if (index === 0) {
      return `${enter(windowFrame(58, 56, 300, 170, `${box(76, 95, 58, 76, 'dv-dark')}${line('M87 111h36M87 124h27M87 137h35M87 153h20', 'dv-muted')}${box(279, 102, 56, 76, 'dv-dark')}${line('M289 119h35M289 132h25M289 145h33M289 161h18', 'dv-muted')}`))}
        ${enter(`${circle(211, 137, 33, 'dv-accent')}${circle(211, 137, 16, 'dv-muted')}${line('M135 134h42M245 139h33', 'dv-dim')}`, 160)}
        ${flow('M134 134h44', 900)}${flow('M245 139h33', 1700)}${tag(120, 251, 'FUENTES / CONTEXTO / INFORME')}`;
    }
    return `${enter(windowFrame(68, 64, 282, 146, `${line('M85 107h72M85 124h50M85 144h63M85 175h46', 'dv-muted')}`))}
      ${enter(`<path class="dv-surface dv-accent-border" d="m243 78 47 17v46c0 31-47 57-47 57s-47-26-47-57V95Z"/>${circle(243, 130, 22, 'dv-muted dv-pulse-ring')}${accent('M232 127v-6a11 11 0 0 1 22 0v6')}${box(229, 127, 28, 22, 'dv-dark')}${circle(243, 137, 2, 'dv-accent')}`, 220)}
      ${line('M169 117h26M170 146h25', 'dv-dashed dv-dim')}${tag(98, 248, 'CONTRAESPIONAJE / PROTECCIÓN')}`;
  }

  const illustrations = { ciberseguridad: cyber, inteligencia: intelligence, forense: forensics, radiofrecuencia: radiofrequency, web, movil: mobile, qa, automatizacion: automation, ia: ai, drones };

  function render(key, method, index = 0, phase = 1) {
    const draw = illustrations[key] || web;
    const safeIndex = Number.isFinite(Number(index)) ? Math.max(0, Math.trunc(Number(index))) : 0;
    const uid = `portfolio-visual-${++instance}`;
    const story = window.DISCIPLINE_STORY_ART?.[key];
    // Content labels live in the accompanying HTML. This SVG is decorative.
    return `<div class="diagram-holo" aria-hidden="true"><svg class="discipline-visual" viewBox="0 0 420 280" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false">
      <defs>
        <linearGradient id="${uid}-sweep" x1="210" y1="68" x2="261" y2="140" gradientUnits="userSpaceOnUse"><stop class="dv-gradient-accent" stop-opacity=".2"/><stop class="dv-gradient-accent" offset="1" stop-opacity="0"/></linearGradient>
        <linearGradient id="${uid}-scan" x1="0" y1="0" x2="0" y2="1"><stop class="dv-gradient-accent" stop-opacity="0"/><stop class="dv-gradient-accent" offset="1" stop-opacity=".19"/></linearGradient>
        <clipPath id="${uid}-phone-clip"><rect x="110" y="67" width="87" height="149" rx="7"/></clipPath>
      </defs>
      <g class="dv-frame">${line('M23 54V32h22M375 32h22v22M23 226v22h22M375 248h22v-22')}${line('M204 26h12M210 20v12M204 254h12M210 248v12')}</g>
      ${story ? story(safeIndex, phase, uid) : draw(safeIndex, uid, method)}
    </svg></div>`;
  }

  window.DisciplineDrawing = Object.freeze({ line, accent, circle, dot, text, enter, flow, box, tag, phone, windowFrame, antenna });
  window.PortfolioVisuals = Object.freeze({ render });
})();
