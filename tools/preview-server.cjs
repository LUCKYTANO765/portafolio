'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css', '.mp4': 'video/mp4', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json', '.pdf': 'application/pdf', '.md': 'text/plain; charset=utf-8' };
const server = http.createServer((request, response) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); }
  catch { response.writeHead(400).end(); return; }
  const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!file.startsWith(root + path.sep)) { response.writeHead(403).end(); return; }
  fs.readFile(file, (error, data) => {
    if (error) { response.writeHead(404).end(); return; }
    response.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
    response.setHeader('Cache-Control', 'no-cache');
    response.setHeader('Accept-Ranges', 'bytes');
    const range = request.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    if (range) {
      const start = Number(range[1]);
      const end = range[2] ? Math.min(Number(range[2]), data.length - 1) : data.length - 1;
      if (start > end || start >= data.length) { response.writeHead(416, { 'Content-Range': `bytes */${data.length}` }).end(); return; }
      response.writeHead(206, { 'Content-Range': `bytes ${start}-${end}/${data.length}`, 'Content-Length': end - start + 1 });
      response.end(data.subarray(start, end + 1)); return;
    }
    response.writeHead(200, { 'Content-Length': data.length }); response.end(data);
  });
});
server.listen(4173, '127.0.0.1', () => console.log('Portfolio preview: http://127.0.0.1:4173/'));
