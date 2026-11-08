'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const value = (name, fallback) => { const pos = args.indexOf(name); return pos >= 0 ? args[pos + 1] : fallback; };
const PORT = Number(value('--port', process.env.PORT || '3000'));
const HOST = value('--host', '127.0.0.1');
const MIME = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.svg':'image/svg+xml', '.ttf':'font/ttf', '.woff2':'font/woff2', '.txt':'text/plain; charset=utf-8' };
const server = http.createServer((req,res) => {
  if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405, { Allow:'GET, HEAD' }); res.end(); return; }
  let requestPath;
  try { requestPath = decodeURIComponent(new URL(req.url, 'http://local').pathname); } catch { res.writeHead(400); res.end('Bad request'); return; }
  if (requestPath === '/') { res.writeHead(302, { Location: '/dist/motodrive54/' }); res.end(); return; }
  const target = path.resolve(ROOT, '.' + requestPath);
  const relative = path.relative(ROOT, target);
  if (relative.startsWith('..') || path.isAbsolute(relative) || relative.split(/[\\/]/).some(part => part.startsWith('.'))) { res.writeHead(403); res.end('Forbidden'); return; }
  let file = target;
  try {
    if (fs.statSync(file).isDirectory()) {
      if (!requestPath.endsWith('/')) { res.writeHead(302, { Location: requestPath + '/' }); res.end(); return; }
      file = path.join(file, 'index.html');
    }
  } catch { res.writeHead(404); res.end('Not found'); return; }
  fs.readFile(file, (error,data) => {
    if (error) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control':'no-store', 'X-Content-Type-Options':'nosniff' });
    res.end(req.method === 'HEAD' ? undefined : data);
  });
});
server.on('error', error => { console.error(`Сервер не запущен: ${error.message}`); process.exitCode = 1; });
server.listen(PORT, HOST, () => console.log(`Локальный условный эталон: http://${HOST}:${PORT}/dist/motodrive54/`));
