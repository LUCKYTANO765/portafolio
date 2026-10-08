/* Render original canvas scenes to deterministic, silent H.264 MP4 loops.
 * Uses Chrome WebCodecs, plus a small ISO-BMFF muxer; no runtime website dependency. */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const modules = path.join(process.env.USERPROFILE || '', '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules');
const { chromium } = require(path.join(modules, 'playwright'));
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'assets/media/area-backgrounds');
const keys = ['ciberseguridad', 'inteligencia', 'forense', 'radiofrecuencia', 'web', 'movil', 'qa', 'automatizacion', 'ia', 'drones', 'comunicacion', 'proteccion'];
const FPS = 24, DURATION = 12, WIDTH = 1920, HEIGHT = 1080;
const u16 = n => { const b = Buffer.alloc(2); b.writeUInt16BE(n); return b; };
const u32 = n => { const b = Buffer.alloc(4); b.writeUInt32BE(n >>> 0); return b; };
const zero = n => Buffer.alloc(n);
const box = (name, ...data) => { const body = Buffer.concat(data); return Buffer.concat([u32(body.length + 8), Buffer.from(name), body]); };
const full = (name, flags, ...data) => box(name, u32(flags), ...data);
const matrix = Buffer.concat([0x10000, 0, 0, 0, 0x10000, 0, 0, 0, 0x40000000].map(u32));

function mux(chunks, avcc) {
  const samples = chunks.map(c => Buffer.from(c.data, 'base64'));
  const duration = FPS * DURATION * 1000;
  const ftyp = box('ftyp', Buffer.from('isom'), u32(512), Buffer.from('isomiso2avc1mp41'));
  const moov = offset => {
    const mvhd = full('mvhd', 0, zero(8), u32(FPS * 1000), u32(duration), u32(0x10000), u16(0), zero(10), matrix, zero(24), u32(2));
    const tkhd = full('tkhd', 7, zero(8), u32(1), zero(4), u32(duration), zero(8), zero(8), matrix, u32(WIDTH << 16), u32(HEIGHT << 16));
    const mdhd = full('mdhd', 0, zero(8), u32(FPS * 1000), u32(duration), u16(0x55c4), zero(2));
    const hdlr = full('hdlr', 0, zero(4), Buffer.from('vide'), zero(12), Buffer.from('Original portfolio animation\0'));
    const compressor = Buffer.alloc(32); compressor[0] = 5; compressor.write('H.264', 1);
    const entry = box('avc1', zero(6), u16(1), zero(16), u16(WIDTH), u16(HEIGHT), u32(0x480000), u32(0x480000), zero(4), u16(1), compressor, u16(24), u16(0xffff), box('avcC', avcc));
    const sync = chunks.flatMap((c, i) => c.type === 'key' ? [i + 1] : []);
    const stbl = box('stbl',
      full('stsd', 0, u32(1), entry),
      full('stts', 0, u32(1), u32(samples.length), u32(1000)),
      full('stsc', 0, u32(1), u32(1), u32(samples.length), u32(1)),
      full('stsz', 0, u32(0), u32(samples.length), ...samples.map(s => u32(s.length))),
      full('stco', 0, u32(1), u32(offset)),
      full('stss', 0, u32(sync.length), ...sync.map(u32)));
    const dinf = box('dinf', full('dref', 0, u32(1), full('url ', 1)));
    const minf = box('minf', full('vmhd', 1, zero(8)), dinf, stbl);
    return box('moov', mvhd, box('trak', tkhd, box('mdia', mdhd, hdlr, minf)));
  };
  const header = moov(0);
  return Buffer.concat([ftyp, moov(ftyp.length + header.length + 8), box('mdat', ...samples)]);
}

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const onlyKey = process.argv.find(arg => arg.startsWith('--key='))?.slice(6);
  if (onlyKey && !keys.includes(onlyKey)) throw new Error('Unknown area');
  const browser = await chromium.launch({ headless: true, executablePath: process.env.BROWSER_EXECUTABLE || 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const results = [];
  try {
    const page = await browser.newPage();
    await page.goto(process.env.PORTFOLIO_URL || 'http://127.0.0.1:4173/');
    const sceneSource = fs.readFileSync(path.join(__dirname, 'area-scene-art.cjs'), 'utf8');
    for (const key of onlyKey ? [onlyKey] : keys) {
      console.log(`Rendering ${key}: ${WIDTH}×${HEIGHT}, ${DURATION}s, ${FPS}fps`);
      const encoded = await page.evaluate(async ({ source, key, width, height, fps, duration }) => {
        const mod = { exports: {} };
        new Function('module', 'exports', source)(mod, mod.exports);
        const drawScene = typeof mod.exports === 'function' ? mod.exports : mod.exports.drawScene;
        const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext('2d', { alpha: false, willReadFrequently: true });
        const TAU = Math.PI * 2;
        function draw(t) {
          const phase = TAU * t / duration;
          ctx.setTransform(width / 960, 0, 0, height / 540, 0, 0);
          ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
          ctx.shadowBlur = 0; ctx.setLineDash([]);
          ctx.fillStyle = '#111819'; ctx.fillRect(0, 0, 960, 540);
          const ambient = ctx.createRadialGradient(540 + Math.sin(phase) * 9, 260, 25, 540, 270, 500);
          ambient.addColorStop(0, `rgba(26, 110, 117, ${.14 + .025 * Math.cos(phase)})`);
          ambient.addColorStop(1, 'rgba(17,24,25,0)');
          ctx.fillStyle = ambient; ctx.fillRect(0, 0, 960, 540);
          ctx.save(); ctx.strokeStyle = 'rgba(96,170,171,.035)'; ctx.lineWidth = .7;
          for (let i = -8; i < 22; i++) {
            ctx.beginPath(); ctx.moveTo(i * 60, 0); ctx.lineTo(i * 60 + 900, 540); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(i * 60, 0); ctx.lineTo(i * 60 - 900, 540); ctx.stroke();
          }
          ctx.restore();
          for (let i = 0; i < 12; i++) {
            const p = phase + i * 2.399;
            ctx.fillStyle = `rgba(117,197,198,${.035 + .04 * (1 + Math.sin(p)) / 2})`;
            ctx.beginPath(); ctx.arc(70 + i * 73 + Math.sin(p) * 5, 52 + ((i * 137) % 425) + Math.cos(p) * 4, .8, 0, TAU); ctx.fill();
          }
          ctx.save(); drawScene(ctx, key, t, {}); ctx.restore();
        }
        draw(0);
        const poster = canvas.toDataURL('image/webp', .88).split(',')[1];
        const start = ctx.getImageData(0, 0, width, height).data;
        draw(duration);
        const end = ctx.getImageData(0, 0, width, height).data;
        let seamMax = 0, seamTotal = 0;
        for (let i = 0; i < start.length; i++) { const diff = Math.abs(start[i] - end[i]); seamMax = Math.max(seamMax, diff); seamTotal += diff; }
        draw(duration / 2);
        const middle = ctx.getImageData(0, 0, width, height).data;
        let change = 0;
        for (let i = 0; i < start.length; i += 4) change += Math.abs(start[i] - middle[i]) + Math.abs(start[i + 1] - middle[i + 1]) + Math.abs(start[i + 2] - middle[i + 2]);
        const asBase64 = bytes => { let str = ''; for (let i = 0; i < bytes.length; i += 8192) str += String.fromCharCode(...bytes.subarray(i, i + 8192)); return btoa(str); };
        const chunks = []; let description, failure;
        const encoder = new VideoEncoder({
          output(chunk, metadata) {
            const bytes = new Uint8Array(chunk.byteLength); chunk.copyTo(bytes);
            chunks.push({ data: asBase64(bytes), timestamp: chunk.timestamp, type: chunk.type });
            if (metadata?.decoderConfig?.description) description = asBase64(new Uint8Array(metadata.decoderConfig.description));
          },
          error(error) { failure = error.message; },
        });
        encoder.configure({ codec: 'avc1.420028', width, height, bitrate: 2200000, framerate: fps, latencyMode: 'realtime', avc: { format: 'avc' } });
        for (let i = 0; i < fps * duration; i++) {
          draw(i / fps);
          const frame = new VideoFrame(canvas, { timestamp: Math.round(i * 1e6 / fps), duration: Math.round(1e6 / fps) });
          encoder.encode(frame, { keyFrame: i % (fps * 2) === 0 }); frame.close();
          if (encoder.encodeQueueSize > 8) await new Promise(resolve => encoder.addEventListener('dequeue', resolve, { once: true }));
          if (failure) throw new Error(failure);
        }
        await encoder.flush(); encoder.close();
        if (!description || chunks.length !== fps * duration) throw new Error('Incomplete H.264 output');
        return { chunks, description, poster, seamMax, seamMean: seamTotal / start.length, motionMean: change / (width * height * 3) };
      }, { source: sceneSource, key, width: WIDTH, height: HEIGHT, fps: FPS, duration: DURATION });
      if (encoded.seamMax > 2) throw new Error(`${key}: non-periodic scene, max delta ${encoded.seamMax}`);
      if (encoded.motionMean < .01) throw new Error(`${key}: no visible motion`);
      if (encoded.chunks.some((chunk, i) => i && chunk.timestamp <= encoded.chunks[i - 1].timestamp)) throw new Error('Encoder reordered presentation frames');
      const mp4 = mux(encoded.chunks, Buffer.from(encoded.description, 'base64'));
      if (mp4.length >= 6000000) throw new Error(`${key}: exceeds 6MB target`);
      fs.writeFileSync(path.join(output, `${key}.mp4`), mp4);
      fs.writeFileSync(path.join(output, `${key}-poster.webp`), Buffer.from(encoded.poster, 'base64'));
      const record = { area: key, file: `${key}.mp4`, bytes: mp4.length, resolution: [WIDTH, HEIGHT], durationSeconds: DURATION, fps: FPS, codec: 'H.264/AVC', audio: false, fastStart: true, loopEndpointMaxPixelDelta: encoded.seamMax, loopEndpointMeanPixelDelta: encoded.seamMean, motionMean: encoded.motionMean, posterSha256: crypto.createHash('sha256').update(encoded.poster).digest('hex') };
      fs.writeFileSync(path.join(output, `${key}.json`), JSON.stringify(record, null, 2));
      results.push(record);
      console.log(JSON.stringify(record));
    }
    if (!onlyKey) fs.writeFileSync(path.join(output, 'parameters.json'), JSON.stringify({
      style: 'Original isometric line illustrations, restrained cyan and copper on charcoal',
      durationSeconds: DURATION, fps: FPS, resolution: [WIDTH, HEIGHT], loop: 'periodic sine and cosine, no duplicated closing frame',
      speed: 'very slow, one ambient cycle per 12 seconds', easing: 'sinusoidal ease-in-out',
      motion: { ambientLight: true, routeHighlights: true, backgroundDust: '12 faint points; maximum 6.4px displacement in 960px design space', parallax: false, water: false, clouds: false, people: false, mainObjectTransform: false },
      source: 'Original programmatic illustrations; attached images used only as visual references', mask: null,
      integration: 'Lazy load with IntersectionObserver; muted, loop, playsinline; pause when hidden/offscreen; poster for reduced motion and data saving; object-fit contain',
      files: results,
    }, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error.stack); process.exitCode = 1; });
