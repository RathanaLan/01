const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const indexPath = "file:///" + path.join(__dirname, "index.html").replace(/\\/g, "/");
const screenAtLoad = path.join(__dirname, "screen_initial_hero.png");

console.log("Capturing initial screenshot at load (showing item from image)...");
const chrome1 = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--window-size=1280,1000',
  `--screenshot=${screenAtLoad}`,
  indexPath
]);

chrome1.on('close', (code) => {
  console.log(`Initial screenshot code: ${code}`);
  if (fs.existsSync(screenAtLoad)) {
    console.log("SUCCESS: Initial hero screenshot created at:", screenAtLoad);
  }
});
