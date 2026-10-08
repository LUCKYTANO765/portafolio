/* Original conceptual scenes for communication, digital strategy and social campaigns. */
(() => {
  'use strict';
  const label = (d, x, y, value) => d.text(x, y, value, 'dv-process-label');
  const route = (d, path, delay = 0) => d.line(path, 'dv-route-base') + d.flow(path, delay);
  const check = (d, x, y) => d.accent(`M${x} ${y}l5 5 10-12`);
  const picture = (d, x, y, w, h) => `${d.box(x, y, w, h, 'dv-dark', 3)}${d.circle(x + w - 13, y + 12, 4, 'dv-muted')}${d.line(`M${x + 5} ${y + h - 5}l${w * .3}-${h * .5} ${w * .2} ${h * .3} ${w * .16}-${h * .2} ${w * .23} ${h * .4}`, 'dv-muted')}`;
  const speech = (d, x, y, w, h) => `<path class="dv-surface" d="M${x} ${y}h${w}v${h}h-${w - 20}l-12 10v-10h-8Z"/>${d.line(`M${x + 10} ${y + 12}h${w - 20}M${x + 10} ${y + 22}h${w - 33}`, 'dv-muted')}`;
  const post = (d, x, y, w = 75, h = 116) => `${d.box(x, y, w, h, '', 5)}${d.circle(x + 13, y + 13, 4, 'dv-accent')}${d.line(`M${x + 24} ${y + 11}h${w - 35}M${x + 24} ${y + 17}h${w - 45}`, 'dv-muted')}${picture(d, x + 8, y + 27, w - 16, h - 63)}${d.line(`M${x + 9} ${y + h - 26}h${w - 18}M${x + 9} ${y + h - 17}h${w - 30}`, 'dv-muted')}${d.circle(x + 12, y + h - 7, 2, 'dv-accent dv-node-idle')}`;
  const clock = (d, x, y, r = 14) => `${d.circle(x, y, r, 'dv-accent')}${d.accent(`M${x} ${y - r + 5}v${r - 5}l7 4`)}`;

  function communication(d, phase) {
    if (phase === 0) {
      return `${d.enter(`${d.box(46, 72, 108, 127, '', 6)}${d.accent('M66 111l33-20 35 20v44H66Z')}${d.line('M78 114h43M78 125h43M93 156v-19h15v19', 'dv-muted')}`)}
        ${d.enter(`${speech(d, 259, 61, 108, 49)}${speech(d, 274, 145, 108, 49)}`, 160)}
        ${route(d, 'M155 121h42V85h61', 0)}${route(d, 'M197 121v47h76', 1000)}${d.circle(197, 121, 7, 'dv-accent dv-pulse-ring')}
        ${label(d, 47, 55, 'Candidato o Gobierno')}${label(d, 263, 44, 'Demandas ciudadanas')}${label(d, 279, 223, 'Contraste político')}${label(d, 62, 244, 'Aprobación y respaldo')}`;
    }
    if (phase === 1) {
      return `${d.enter(`${d.box(145, 86, 129, 109, 'dv-accent-border', 6)}${label(d, 164, 116, 'Narrativa política')}${d.accent('M163 135h93M163 149h70')}${label(d, 168, 178, 'Liderazgo y tono')}`)}
        ${d.enter(`${speech(d, 34, 59, 81, 49)}${picture(d, 39, 172, 72, 55)}${d.box(313, 78, 64, 110, '', 8)}${d.accent('M336 114l23 16-23 16Z')}`, 180)}
        ${route(d, 'M145 121h-14V83h-15', 0)}${route(d, 'M145 161h-15v36h-18', 700)}${route(d, 'M274 137h38', 1400)}
        ${label(d, 44, 132, 'Discurso')}${label(d, 41, 246, 'Imagen')}${label(d, 326, 212, 'Spot')}${label(d, 166, 239, 'Mensaje de poder')}`;
    }
    return `${d.enter(d.windowFrame(34, 78, 127, 121, `${d.box(45, 111, 32, 58, 'dv-dark', 2)}${d.accent('M88 117h59M88 129h44')}${d.line('M88 148h51M88 159h36', 'dv-muted')}`))}
      ${d.enter(post(d, 185, 62, 76, 132), 140)}${d.enter(`${speech(d, 294, 112, 91, 62)}${speech(d, 313, 57, 70, 34)}`, 250)}
      ${d.line('M96 200v24h239v-38', 'dv-muted')}${route(d, 'M221 195v29h-91', 400)}${route(d, 'M223 224h111', 1200)}
      ${check(d, 88, 218)}${check(d, 215, 218)}${check(d, 326, 218)}
      ${label(d, 63, 59, 'Institución / Campaña')}${label(d, 190, 45, 'Redes')}${label(d, 297, 198, 'Vocería')}${label(d, 80, 252, 'Blindaje y coherencia política')}`;
  }

  function strategy(d, phase) {
    if (phase === 0) {
      return `${d.enter(d.windowFrame(45, 64, 185, 135, `${d.box(58, 99, 59, 83, 'dv-dark', 3)}${d.line('M130 107h82M130 122h61M130 145h75M130 158h49', 'dv-muted')}`))}
        ${d.enter(d.phone(287, 62, 79, 146, `${d.circle(326, 101, 12)}${d.line('M303 126h45M303 140h45M303 154h32M303 179h45', 'dv-muted')}`), 180)}
        ${d.circle(232, 162, 33, 'dv-accent dv-pulse-ring')}${d.accent('M255 186l22 22')}${d.line('M218 161h27M231 148v27', 'dv-muted')}
        ${route(d, 'M86 199v28h174', 1000)}${label(d, 62, 49, 'Gestión y propuestas')}${label(d, 299, 48, 'Electorado')}${label(d, 60, 252, 'Detectar rechazos y oportunidades de voto')}`;
    }
    if (phase === 1) {
      return `${d.enter(post(d, 40, 64, 74, 113))}${d.enter(d.windowFrame(170, 104, 116, 91, `${d.line('M183 143h88M183 155h69', 'dv-muted')}${d.box(183, 168, 48, 14, 'dv-accent-border', 2)}`), 150)}
        ${d.enter(`${speech(d, 320, 61, 66, 50)}${d.accent('M345 150l6 6 12-15')}`, 300)}
        ${route(d, 'M114 135h29v13h26', 0)}${route(d, 'M286 148h17V87h16', 900)}
        ${label(d, 40, 49, 'Propuesta')}${label(d, 170, 87, 'Territorio')}${label(d, 317, 44, 'Voto / Respaldo')}
        ${d.line('M75 197v24h275v-36', 'dv-dashed dv-muted')}${label(d, 80, 246, 'Conectar → convencer → movilizar')}`;
    }
    return `${d.enter(`${d.box(37, 53, 348, 150, '', 5)}${[0, 1, 2].map(i => d.line(`M51 ${91 + i * 38}h319`, 'dv-dim')).join('')}${d.line('M133 65v125M211 65v125M289 65v125', 'dv-dim')}${label(d, 54, 80, 'Prioridad')}${label(d, 149, 80, 'Inicio')}${label(d, 226, 80, 'Entrega')}${label(d, 301, 80, 'Encuestas')}${label(d, 53, 116, 'Discurso')}${label(d, 53, 153, 'Territorio')}${label(d, 53, 189, 'Campaña')}${d.box(149, 102, 96, 18, 'dv-accent-border', 3)}${d.box(179, 140, 119, 18, 'dv-dark', 3)}${d.box(249, 178, 116, 18, 'dv-accent-border', 3)}`)}
      ${route(d, 'M157 111h77', 0)}${route(d, 'M185 149h100', 800)}${route(d, 'M259 187h91', 1600)}
      ${clock(d, 63, 236)}${label(d, 87, 241, 'Tiempos')}${d.circle(193, 236, 13, 'dv-muted')}${label(d, 214, 241, 'Recursos')}${check(d, 300, 236)}${label(d, 325, 241, 'Aprobación')}`;
  }

  function campaigns(d, phase) {
    if (phase === 0) {
      return `${d.enter(`${d.box(39, 61, 227, 154, '', 5)}${d.line('M39 92h227M85 92v123M130 92v123M175 92v123M220 92v123M39 133h227M39 174h227M72 51v22M232 51v22', 'dv-muted')}${label(d, 111, 83, 'Calendario electoral')}${picture(d, 47, 101, 31, 25)}${d.box(137, 141, 31, 25, 'dv-accent-border', 2)}${d.accent('M148 147l10 6-10 6Z')}${d.box(227, 184, 31, 24, 'dv-dark', 2)}${d.line('M233 191h18M233 198h12', 'dv-muted')}`)}
        ${d.enter(`${post(d, 303, 78, 74, 113)}${clock(d, 340, 221, 15)}`, 200)}
        ${route(d, 'M267 153h17V125h18', 500)}${label(d, 310, 55, 'Spots')}${label(d, 46, 243, 'Propuesta · contraste · fechas')}${label(d, 309, 253, 'Lanzamiento')}`;
    }
    if (phase === 1) {
      return `${d.enter(`${post(d, 39, 86, 80, 120)}${check(d, 86, 76)}`)}
        ${d.enter(`${d.circle(203, 143, 28, 'dv-accent')}${d.accent('M190 143h25m-9-9 9 9-9 9')}${clock(d, 203, 73, 17)}`, 150)}
        ${d.enter(`${post(d, 296, 48, 77, 117)}${speech(d, 283, 206, 100, 36)}`, 250)}
        ${route(d, 'M120 143h54', 0)}${route(d, 'M232 143h36V104h27', 700)}${route(d, 'M333 166v26', 1400)}
        ${label(d, 39, 52, 'Pieza revisada')}${label(d, 162, 194, 'Despliegue')}${label(d, 296, 32, 'Redes y plazas')}${label(d, 291, 193, 'Debate público')}${label(d, 45, 249, 'Defensa y movilización activa')}`;
    }
    return `${d.enter(d.windowFrame(34, 49, 245, 173, `${d.line('M50 105h211M50 143h211M50 181h211', 'dv-dim')}${label(d, 49, 94, 'Alcance')}${label(d, 49, 132, 'Aprobación')}${label(d, 49, 170, 'Intención de voto')}${[0, 1, 2].map((i) => `${d.box(151, 80 + i * 38, [102, 71, 43][i], 12, 'dv-dark', 2)}${d.box(151, 96 + i * 38, [80, 91, 56][i], 5, 'dv-accent-border', 1)}`).join('')}${label(d, 52, 207, 'Ventaja frente al rival')}`))}
      ${d.enter(`${d.circle(335, 120, 26, 'dv-accent')}${d.accent('M321 118a14 14 0 1 1 9 14M321 111v9h9')}${d.line('M310 182h50M310 198h50', 'dv-muted')}${d.circle(322, 182, 4, 'dv-accent')}${d.circle(346, 198, 4, 'dv-accent')}`, 180)}
      ${route(d, 'M280 120h28', 400)}${route(d, 'M334 148v24', 1200)}
      ${label(d, 310, 75, 'Ajustar')}${label(d, 312, 224, 'Próxima')}${label(d, 312, 240, 'ofensiva')}${label(d, 48, 248, 'Métricas de aprobación e intención de voto')}`;
  }

  window.DISCIPLINE_STORY_ART = {
    ...window.DISCIPLINE_STORY_ART,
    comunicacion: (index, phase) => {
      const stories = [communication, strategy, campaigns];
      const clamp = value => Math.max(0, Math.min(2, Number.isFinite(Number(value)) ? Math.trunc(Number(value)) : 0));
      return stories[clamp(index)](window.DisciplineDrawing, clamp(phase));
    },
  };
})();
