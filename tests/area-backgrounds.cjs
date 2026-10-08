'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require(path.join(process.env.USERPROFILE, '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
const root = path.resolve(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'assets/media/area-backgrounds/parameters.json'), 'utf8'));
const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.mp4': 'video/mp4', '.webp': 'image/webp', '.woff2': 'font/woff2', '.svg': 'image/svg+xml' };
const server = http.createServer((request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!file.startsWith(root + path.sep)) return response.writeHead(403).end();
  fs.readFile(file, (error, data) => {
    if (error) return response.writeHead(404).end();
    response.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
    response.setHeader('Accept-Ranges', 'bytes');
    const range = request.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    if (range) {
      const start = Number(range[1]), end = range[2] ? Math.min(Number(range[2]), data.length - 1) : data.length - 1;
      response.writeHead(206, { 'Content-Range': `bytes ${start}-${end}/${data.length}`, 'Content-Length': end - start + 1 });
      return response.end(data.subarray(start, end + 1));
    }
    response.writeHead(200, { 'Content-Length': data.length }); response.end(data);
  });
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ headless: true, executablePath: process.env.BROWSER_EXECUTABLE || 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  try {
    assert.equal(manifest.files.length, 12);
    assert.equal(new Set(manifest.files.map(file => file.posterSha256)).size, 12, 'Distinct artwork in every area');
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const record of manifest.files) {
      const mp4 = fs.readFileSync(path.join(root, 'assets/media/area-backgrounds', record.file));
      assert.ok(mp4.length < 6000000);
      assert.ok(mp4.indexOf(Buffer.from('moov')) < mp4.indexOf(Buffer.from('mdat')), 'Fast start');
      assert.ok(mp4.includes(Buffer.from('avc1')) && mp4.includes(Buffer.from('avcC')), 'H.264 video track');
      assert.ok(record.loopEndpointMaxPixelDelta <= 2, 'Periodic render endpoints');
      await page.goto(`${origin}/#${record.area}`);
      await page.waitForFunction(() => { const v = document.querySelector('.area-background-video'); return v?.readyState >= 2 && !v.paused && v.currentTime > 0; });
      const info = await page.locator('.area-background-video').evaluate(async video => {
        video.pause();
        const seek = time => new Promise(resolve => { video.addEventListener('seeked', resolve, { once: true }); video.currentTime = time; });
        const canvas = document.createElement('canvas'); canvas.width = 192; canvas.height = 108;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        await seek(.001); ctx.drawImage(video, 0, 0, 192, 108); const first = ctx.getImageData(0, 0, 192, 108).data;
        await seek(11.95); ctx.drawImage(video, 0, 0, 192, 108); const last = ctx.getImageData(0, 0, 192, 108).data;
        let delta = 0; for (let i = 0; i < first.length; i++) delta += Math.abs(first[i] - last[i]);
        return { duration: video.duration, width: video.videoWidth, height: video.videoHeight, muted: video.muted, loop: video.loop, inline: video.playsInline, error: video.error?.message, boundaryMeanDelta: delta / first.length };
      });
      assert.equal(info.duration, 12); assert.equal(info.width, 1920); assert.equal(info.height, 1080);
      assert.ok(info.muted && info.loop && info.inline && !info.error);
      assert.ok(info.boundaryMeanDelta < 4, `Smooth encoded boundary: ${JSON.stringify(info)}`);
      console.log(`PASS ${record.area}: H.264, 1080p, 12s, ${(mp4.length / 1e6).toFixed(2)}MB, boundary delta ${info.boundaryMeanDelta.toFixed(3)}`);
    }
    await page.goto(`${origin}/#web`);
    await page.waitForFunction(() => document.querySelector('video')?.currentTime > 0);
    await page.locator('#motion-toggle').click();
    const stoppedTime = await page.locator('video').evaluate(v => v.currentTime);
    await page.waitForTimeout(180);
    assert.equal(await page.locator('video').evaluate(v => v.currentTime), stoppedTime);
    await page.locator('#motion-toggle').click();
    await page.waitForFunction(t => document.querySelector('video').currentTime > t, stoppedTime);
    await page.locator('.workspace-footer').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector('video').paused);
    await page.evaluate(() => { window.previousAreaVideo = document.querySelector('video'); });
    await page.evaluate(() => { location.hash = 'perfil'; });
    await page.waitForFunction(() => !window.previousAreaVideo.hasAttribute('src') && !window.previousAreaVideo.isConnected);
    console.log('PASS global pause, offscreen pause and released video on navigation');

    const reduced = await browser.newPage({ reducedMotion: 'reduce', viewport: { width: 320, height: 740 } });
    const videoRequests = [];
    reduced.on('request', r => { if (/\.mp4(?:\?|$)/.test(r.url())) videoRequests.push(r.url()); });
    for (const record of manifest.files) {
      await reduced.goto(`${origin}/#${record.area}`);
      await reduced.locator('.area-background-poster').scrollIntoViewIfNeeded();
      assert.equal(await reduced.locator('video').getAttribute('src'), null);
      assert.ok(await reduced.locator('.area-background-poster').evaluate(image => image.complete && image.naturalWidth > 0));
      assert.ok(await reduced.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    }
    assert.deepEqual(videoRequests, []);
    assert.deepEqual(errors, []);
    console.log('PASS 12 mobile posters, no MP4 downloads with reduced motion, no runtime errors');
  } finally { await browser.close(); server.close(); }
})().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
