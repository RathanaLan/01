const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outScreenshot = path.join(__dirname, "planner_screenshot.png");
const indexPath = "file:///" + path.join(__dirname, "index.html").replace(/\\/g, "/");

console.log("Capturing headless screenshot of:", indexPath);

const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--window-size=1280,1000',
  `--screenshot=${outScreenshot}`,
  indexPath
]);

chrome.on('close', (code) => {
  console.log(`Chrome exited with code ${code}`);
  if (fs.existsSync(outScreenshot)) {
    console.log("Screenshot successfully created at:", outScreenshot);
  } else {
    console.log("Screenshot file not found");
  }
});
