(() => {
  'use strict';

  // Original neon line art: a fixed isometric processor surrounded by thirteen disciplines.
  // Animation hooks affect light and small mechanical details, never the labels.
  const icons = {
    bots: `<rect x="-30" y="-30" width="60" height="18" rx="3"/><rect x="-30" y="-5" width="60" height="18" rx="3"/><rect x="-30" y="20" width="60" height="18" rx="3"/><path d="M-17-21h2m7 0h2M-17 4h2m7 0h2M-17 29h2m7 0h2M10-21h11M10 4h11M10 29h11"/><path class="orbit-signal" d="M-36-21h-7V29h7M36-21h7V29h-7"/>`,
    ciberseguridad: `<path d="M0-34 28-23 25 7C23 23 9 33 0 38-9 33-23 23-25 7L-28-23Z"/><path d="M-11-6V-15a11 11 0 0 1 22 0v9"/><rect x="-18" y="-6" width="36" height="29" rx="4"/><circle cx="0" cy="5" r="3"/><path d="M0 8v7"/>`,
    inteligencia: `<path d="m-27-22 27-9 30 19-10 36-33 8-21-25 7-29M0-31l-13 63M-34 7 30-12M-27-22 20 24" opacity=".42"/><circle cx="-27" cy="-22" r="5"/><circle cy="-31" r="4"/><circle cx="30" cy="-12" r="5"/><circle cx="-34" cy="7" r="4"/><circle cx="-13" cy="32" r="5"/><circle cx="20" cy="24" r="4"/><circle cx="1" cy="1" r="17" fill="#020d0d"/><path d="m14 14 19 20" stroke-width="5"/><circle cx="1" cy="1" r="11" opacity=".6"/>`,
    forense: `<rect x="-28" y="-35" width="37" height="66" rx="6"/><path d="M-17-29h14M-19 24h18"/><rect x="-22" y="-22" width="24" height="35" rx="2" opacity=".55"/><path d="m-17-14 5-4 8 4v13l-8 4-5-4Z"/><circle cx="21" cy="15" r="18" fill="#020d0d"/><circle cx="21" cy="15" r="6"/><path d="m34 28 10 10M21-3V-14h-11M3 15h-13"/>`,
    radiofrecuencia: `<path d="M-24 35 0-21 24 35ZM-14 12h28M-8-2l22 30M8-2-14 28M0-34v24M-32 37h64"/><circle cy="-34" r="3" fill="#54ead9"/><path d="M-15-35a21 21 0 0 0 0 27M15-35a21 21 0 0 1 0 27M-25-44a34 34 0 0 0 0 45M25-44a34 34 0 0 1 0 45" class="orbit-core-pulse"/>`,
    web: `<path d="m-35-22 49-12 22 14v43L-13 36-35 22Z" fill="#031012"/><path d="M-35-22-13-9l49-11M-13-9v45M-35-10-13 3 36-9"/><path d="m-3 7-6 7 6 4M19 1l6 4-6 7M12-1 5 23"/><path d="m-27-19 1 1m5 2 1 1m5 2 1 1" stroke-width="3"/><path d="m-5 39 13 7 37-9" opacity=".45"/>`,
    movil: `<path d="m-22-34 35-9 15 9v67l-35 9-15-9Z" fill="#031012"/><path d="m-22-34 15 9 35-9M-7-25v67M-16-24v51l9 6M-1-17l24-6v47L-1 30ZM3-25l12-3M7 34l10-3"/><path d="m4-9 7-2v8L4-1ZM15-12l5-1v8l-5 2ZM4 5l16-4v7L4 12ZM4 18l11-3"/>`,
    qa: `<rect x="-37" y="-28" width="66" height="48" rx="4"/><path d="M-37-17h66M-29-23h1m5 0h1m5 0h1M-28-7l4 4 7-8M-10-6h26M-28 8l4 4 7-8M-10 9h18M-8 21v9M-22 31H6"/><circle cx="25" cy="23" r="18" fill="#020d0d"/><path d="m15 24 7 7 14-17" stroke-width="2.6"/>`,
    automatizacion: `<path d="m-31-15 11-6 11 6v14l-11 6-11-6ZM-7-34l11-6 11 6v14L4-14-7-20ZM15 5l11-6 11 6v14l-11 6-11-6ZM-17 20l11-6 11 6v14l-11 6-11-6Z"/><path d="M-20 5v22h3M-9-8H4v-6M4-14v19h11M26 25v9H5" class="orbit-signal"/><circle cx="-20" cy="-8" r="3"/><circle cx="4" cy="-27" r="3"/><circle cx="26" cy="12" r="3"/><circle cx="-6" cy="27" r="3"/>`,
    ia: `<rect x="-24" y="-24" width="48" height="48" rx="5"/><rect x="-17" y="-17" width="34" height="34" rx="3" opacity=".4"/><path d="M-14-35v11M0-35v11M14-35v11M-14 24v11M0 24v11M14 24v11M-35-14h11M-35 0h11M-35 14h11M24-14h11M24 0h11M24 14h11"/><path d="m-10-10 20 20M-10 10l20-20M-10-10v20h20v-20Z" opacity=".5"/><circle cx="-10" cy="-10" r="3" fill="#54ead9"/><circle cx="10" cy="-10" r="3"/><circle cx="-10" cy="10" r="3"/><circle cx="10" cy="10" r="3" fill="#54ead9"/><circle r="4" fill="#020d0d"/>`,
    drones: `<path d="m-6-7-24-13M6-7l24-13M-6 7l-24 13M6 7l24 13" stroke-width="5"/><ellipse cx="-30" cy="-20" rx="17" ry="8"/><ellipse cx="30" cy="-20" rx="17" ry="8"/><ellipse cx="-30" cy="20" rx="17" ry="8"/><ellipse cx="30" cy="20" rx="17" ry="8"/><path d="m-13-8 13-7 13 7v16L0 15-13 8Z" fill="#020d0d"/><path d="M-5 15v9h10v-9M-8-3l8-4 8 4v8L0 9-8 5Z"/><circle cx="0" cy="20" r="2"/>`,
    comunicacion: `<path d="m-33-8 21-5L21-32v55L-12 5-33 1ZM-12-13V5M-24 4l6 24 10-3-7-22M21-21l7 5v21l-7 5" fill="#031012"/><path d="M34-10h10M33-23l8-6M33 5l8 6M-33-23v-12h23M-5 34H9l7 6v-6h18V20" opacity=".6"/>`,
    proteccion: `<path d="M0-36 28-25 25 7C23 23 9 32 0 37-9 32-23 23-25 7L-28-25Z"/><rect x="-10" y="-20" width="20" height="40" rx="4"/><path d="M-4-14h8M-3 14h6M-19-1h9M10-1h9"/><circle cx="-27" cy="-1" r="7" fill="#020d0d"/><circle cx="27" cy="-1" r="7" fill="#020d0d"/><path d="m-3 1 3 3 6-7"/>
    `
  };

  const areas = [
    ['ciberseguridad', 'Ciberseguridad', ['Ciberseguridad']],
    ['inteligencia', 'Inteligencia y análisis', ['Inteligencia']],
    ['forense', 'Informática forense', ['Informática', 'forense']],
    ['radiofrecuencia', 'Radiofrecuencia', ['Radiofrecuencia']],
    ['web', 'Desarrollo web', ['Desarrollo web']],
    ['movil', 'Desarrollo móvil', ['Desarrollo móvil']],
    ['qa', 'QA y pruebas de software', ['QA y pruebas']],
    ['automatizacion', 'Automatización', ['Automatización']],
    ['bots', 'Granjas de bots y proxies', ['Bots y proxies']],
    ['ia', 'Inteligencia artificial local', ['Inteligencia', 'artificial']],
    ['drones', 'Desarrollo y manejo de drones', ['Drones']],
    ['comunicacion', 'Comunicación digital', ['Comunicación', 'digital']],
    ['proteccion', 'Protección digital', ['Protección', 'digital']]
  ];

  const nodes = areas.map(([key, name, label], i) => {
    const a = -Math.PI / 2 + i * 2 * Math.PI / areas.length;
    const x = Math.round(400 + Math.cos(a) * 303);
    const y = Math.round(348 + Math.sin(a) * 291);
    return `<a href="#${key}" class="orbit-node" data-area="${key}" aria-label="${name}" style="--orbit-delay:${(-i * .75).toFixed(2)}s" tabindex="0">
      <g transform="translate(${x} ${y})">
        <circle class="orbit-node-hit" r="47" fill="transparent" stroke="none"/>
        <ellipse class="orbit-node-halo" cy="7" rx="46" ry="35" fill="url(#skills-orbit-node-glow)" stroke="none"/>
        <g class="orbit-icon">${icons[key]}</g>
        <text class="orbit-label" y="58" fill="#b9fff4" stroke="none" font-family="system-ui, sans-serif" font-size="16" font-weight="500" text-anchor="middle">${label.map((s, j) => `<tspan x="0" dy="${j ? 19 : 0}">${s}</tspan>`).join('')}</text>
      </g>
    </a>`;
  }).join('');

  const spokes = areas.map((_, i) => {
    const a = -Math.PI / 2 + i * 2 * Math.PI / areas.length;
    const x1 = 400 + Math.cos(a) * 187, y1 = 348 + Math.sin(a) * 173;
    const x2 = 400 + Math.cos(a) * 250, y2 = 348 + Math.sin(a) * 239;
    return `<path class="orbit-signal" d="M${x1.toFixed(1)} ${y1.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}" stroke-dasharray="2 9" opacity=".35" style="--orbit-delay:${-i}s"/>`;
  }).join('');

  window.SkillsOrbitArt = `<svg class="skills-orbit-art" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 760" aria-labelledby="skills-orbit-title skills-orbit-description" role="group">
    <title id="skills-orbit-title">Tecnología conectada con cada especialidad</title>
    <desc id="skills-orbit-description">Un procesador isométrico conecta trece áreas de trabajo: ciberseguridad, inteligencia, informática forense, radiofrecuencia, web, móvil, QA, automatización, granjas de bots y proxies, inteligencia artificial, drones, comunicación y protección digital.</desc>
    <defs>
      <radialGradient id="skills-orbit-core-glow"><stop stop-color="#28cabb" stop-opacity=".14"/><stop offset=".5" stop-color="#21b8aa" stop-opacity=".04"/><stop offset="1" stop-color="#21b8aa" stop-opacity="0"/></radialGradient>
      <radialGradient id="skills-orbit-node-glow"><stop stop-color="#32ccbd" stop-opacity=".11"/><stop offset="1" stop-color="#32ccbd" stop-opacity="0"/></radialGradient>
      <linearGradient id="skills-orbit-metal" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#072d2d"/><stop offset=".5" stop-color="#021516"/><stop offset="1" stop-color="#010808"/></linearGradient>
      <filter id="skills-orbit-bloom" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3" result="glow"/><feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <g fill="none" stroke="#54ead9" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="400" cy="371" rx="240" ry="198" fill="url(#skills-orbit-core-glow)" stroke="none"/>
      <ellipse class="orbit-ring" cx="400" cy="348" rx="303" ry="291" stroke-dasharray="2 7" opacity=".32"/>
      <ellipse class="orbit-ring orbit-ring-inner" cx="400" cy="348" rx="258" ry="247" stroke-dasharray="1 18" opacity=".14"/>
      ${spokes}

      <g class="orbit-engineering-core" aria-hidden="true">
        <ellipse class="orbit-core-pulse" cx="400" cy="431" rx="174" ry="80" fill="url(#skills-orbit-core-glow)" stroke="none"/>
        <path d="M249 411 400 324 551 411v20L400 518 249 431Z" fill="#051517" stroke="#195550"/>
        <path d="M249 411 400 324 551 411 400 498Z" fill="url(#skills-orbit-metal)" stroke="#367c75"/>
        <path d="M249 411 400 498 551 411M400 498v20" stroke="#7bdcca" opacity=".55"/>
        <path d="M269 411 400 335 531 411 400 487Z" stroke="#1e4542"/>
        <path d="M280 343 400 273 520 343v23L400 436 280 366Z" fill="#061c20" stroke="#3b9e92"/>
        <path d="M280 343 400 273 520 343 400 413Z" fill="#092627" stroke="#67daca" stroke-width="2"/>
        <path d="M280 343 400 413 520 343M400 413v23" stroke="#5ae9d1" opacity=".7"/>
        <path d="M297 343 400 283 503 343 400 403Z" stroke="#174e48"/>
        <g stroke="#287b70" stroke-width="1.4">
          <path d="m322 329 20 12 19-11M308 346l29 17 24-14M333 366l22 13 25-14M357 380l22 13 21-12M478 329l-20 12-19-11M492 346l-29 17-24-14M467 366l-22 13-25-14M443 380l-22 13-21-12"/>
          <path d="M369 296v18m18-29v19m27-17v19m18-9v20"/>
        </g>
        <path d="m340 316 60-35 60 35v24l-60 35-60-35Z" fill="#07191c" stroke="#5acbbd"/>
        <path d="m340 316 60-35 60 35-60 35Z" fill="url(#skills-orbit-metal)" stroke="#a6f8e7" stroke-width="2"/>
        <path d="M340 316 400 351 460 316M400 351v24" stroke="#52b9ac"/>
        <path d="m355 316 45-26 45 26-45 26Z" stroke="#246d64"/>
        <path class="orbit-core-pulse" d="m378 316 22-13 22 13-22 13Z" fill="#175b50" stroke="#98ffeb"/>
        <g class="orbit-signal" style="--orbit-delay:-2s" stroke="#9affea"><path d="m309 346 29 17 23-14M463 363l-24-14"/><circle cx="309" cy="346" r="3" fill="#65e8cf"/><circle cx="463" cy="363" r="3" fill="#65e8cf"/></g>
        <g class="orbit-signal" style="--orbit-delay:-4s" stroke="#70d7c1"><path d="m338 438 30 17m12 7 20 11 63-36"/><circle cx="338" cy="438" r="2.5" fill="#76dec5"/><circle cx="463" cy="437" r="2.5" fill="#76dec5"/></g>
        <path class="orbit-core-pulse" d="M400 252v-19m-6 6 6-6 6 6" stroke="#81edd8"/>
        <path d="M314 392v29m172-29v29" stroke="#3b655b" stroke-dasharray="2 6"/>
      </g>
      ${nodes}
    </g>
  </svg>`;
})();
