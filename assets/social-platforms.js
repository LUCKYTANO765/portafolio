'use strict';
(() => {
  const platforms = [
    ['facebook', 'Facebook', 'Publicaciones, videos y comunidades para mantener la conversación con tus seguidores.'],
    ['instagram', 'Instagram', 'Reels, historias y contenido visual para presentar tu propuesta y fortalecer tu presencia.'],
    ['tiktok', 'TikTok', 'Videos cortos para explicar ideas de forma directa y facilitar que nuevas personas las descubran.'],
    ['youtube', 'YouTube', 'Videos y Shorts para explicar temas, ampliar información y construir una biblioteca de contenido.'],
    ['linkedin', 'LinkedIn', 'Contenido profesional para mostrar experiencia y conectar con personas y organizaciones.'],
    ['x', 'X', 'Actualizaciones y conversación pública alrededor de tus mensajes y temas de interés.'],
    ['whatsapp', 'WhatsApp', 'Canales y atención a consultas para mantener informada a una comunidad que elige seguirte.'],
    ['threads', 'Threads', 'Publicaciones breves y conversaciones para acompañar a tus seguidores y conocer sus inquietudes.'],
  ];
  function markup() {
    return `<section class="social-platforms" aria-labelledby="social-platforms-title">
      <header class="social-platforms-heading"><p class="eyebrow">REDES SOCIALES / ALCANCE Y COMUNIDAD</p><h2 id="social-platforms-title">Que tu mensaje llegue más lejos.</h2><p>Estrategia, contenido y campañas para llegar a más personas, fortalecer la relación con tus seguidores y generar mayor participación. Cada canal se trabaja según el mensaje y el objetivo del proyecto.</p></header>
      <div class="social-platform-grid">${platforms.map(([id, name, description]) => `<article class="social-platform" data-platform="${id}"><div class="social-platform-name"><img src="assets/social-logos/${id}.svg" width="30" height="30" alt="" loading="lazy" decoding="async"><h3>${name}</h3></div><p>${description}</p></article>`).join('')}</div>
      <div class="social-impact"><div><span>01 / VISIBILIDAD</span><h3>Llegar a más personas.</h3><p>Contenidos que presentan tu propuesta y ayudan a que nuevas personas la conozcan.</p></div><div><span>02 / PARTICIPACIÓN</span><h3>Conectar con tu comunidad.</h3><p>Mensajes claros, conversaciones y atención a las preguntas de tus seguidores.</p></div><div><span>03 / CRECIMIENTO</span><h3>Medir para mejorar.</h3><p>Seguimiento de alcance, interacciones, seguidores y consultas para ajustar las próximas acciones.</p></div></div>
      <a class="method-reference" href="#contacto">Conversemos sobre tu presencia en redes ↗</a>
    </section>`;
  }
  window.SocialPlatforms = Object.freeze({ markup });
})();
