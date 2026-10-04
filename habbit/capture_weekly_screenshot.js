const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outScreenshot = path.join(__dirname, "weekly_screenshot.png");
const weeklyPath = "file:///" + path.join(__dirname, "templates", "weekly.html").replace(/\\/g, "/");

console.log("Capturing headless screenshot of:", weeklyPath);

const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--window-size=1280,1000',
  `--screenshot=${outScreenshot}`,
  weeklyPath
]);

chrome.on('close', (code) => {
  console.log(`Chrome exited with code ${code}`);
  if (fs.existsSync(outScreenshot)) {
    console.log("Weekly screenshot successfully created at:", outScreenshot);
  } else {
    console.log("Weekly screenshot file not found");
  }
});
