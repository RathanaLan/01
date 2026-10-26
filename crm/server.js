/**
 * Chamroeun Nheat Saving Cooperative - Local Dev & Web Control Server
 * Built with native Node.js (zero external dependencies required)
 * Configured to serve across local network for cross-device testing
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 3000;
const BASE_DIR = path.resolve(__dirname);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // Normalize URL and remove leading slashes to prevent Windows drive-root jumping
  let parsedUrl = req.url.split('?')[0];
  let safePath = path.normalize(decodeURI(parsedUrl)).replace(/^[/\\]+/, '');
  if (!safePath || safePath === '.' || safePath === './') {
    safePath = 'index.html';
  }

  const filePath = path.resolve(BASE_DIR, safePath);

  // Security check: ensure path is strictly within BASE_DIR
  if (!filePath.startsWith(BASE_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

// Bind to 0.0.0.0 so phones, tablets, and computers on the local network can access
server.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`🚀 Chamroeun Nheat Saving Cooperative Web Control`);
  console.log(`📍 Local:   http://localhost:${PORT}`);

  // Display LAN IPv4 addresses for cross-device testing
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        console.log(`📱 Network: http://${iface.address}:${PORT}`);
      }
    }
  }

  console.log(`✨ Open on any phone, tablet, or PC to view and play`);
  console.log(`=======================================================`);
});
