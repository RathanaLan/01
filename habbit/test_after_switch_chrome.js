const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const screenAfter5s = path.join(__dirname, "screen_after_switch.png");

// Start a tiny local server to serve index.html with accurate timing
const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  if (fs.existsSync(filePath)) {
    let contentType = 'text/html';
    if (filePath.endsWith('.css')) contentType = 'text/css';
    if (filePath.endsWith('.js')) contentType = 'application/javascript';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(fs.readFileSync(filePath));
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(5151, () => {
  console.log("Serving at http://localhost:5151 for 5.5s delay screenshot...");

  // Launch Chrome with virtual time budget of 6000ms
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--window-size=1280,1100',
    '--virtual-time-budget=6000',
    `--screenshot=${screenAfter5s}`,
    'http://localhost:5151/'
  ]);

  chrome.on('close', (code) => {
    console.log(`Chrome closed with code: ${code}`);
    server.close();
    if (fs.existsSync(screenAfter5s)) {
      console.log("SUCCESS: After-switch screenshot captured at:", screenAfter5s);
    }
  });
});
