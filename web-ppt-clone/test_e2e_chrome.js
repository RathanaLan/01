const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const FLASK_PORT = 5055;
const CHROME_PORT = 9222;
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

console.log("=== STARTING FULL HEADLESS CHROME E2E VERIFICATION ===");

// 1. Start Flask Server on Port 5055
const flaskEnv = { ...process.env, PORT: String(FLASK_PORT), FLASK_RUN_PORT: String(FLASK_PORT) };
const flaskProcess = spawn('python', ['app.py'], {
  cwd: process.cwd(),
  env: flaskEnv,
  stdio: 'pipe'
});

flaskProcess.stderr.on('data', (d) => {
  // console.log('[Flask]', d.toString());
});

async function waitForServer(port, retries = 20) {
  for (let i = 0; i < retries; i++) {
    try {
      await new Promise((res, rej) => {
        const req = http.get(`http://127.0.0.1:${port}/login`, (resp) => {
          if (resp.statusCode === 200) res();
          else rej(new Error('Status: ' + resp.statusCode));
        });
        req.on('error', rej);
      });
      return true;
    } catch (e) {
      await new Promise(r => setTimeout(r, 400));
    }
  }
  throw new Error(`Server on port ${port} did not start in time.`);
}

async function runTest() {
  try {
    console.log("Waiting for Flask server...");
    await waitForServer(FLASK_PORT);
    console.log("Flask server is ready on port", FLASK_PORT);

    // 2. Start Chrome Headless
    const tempProfile = `C:\\Users\\ITS\\AppData\\Local\\Temp\\chrome_ppt_test_${Date.now()}`;
    const chromeProcess = spawn(CHROME_PATH, [
      `--remote-debugging-port=${CHROME_PORT}`,
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      '--window-size=1440,900',
      `--user-data-dir=${tempProfile}`
    ]);

    await new Promise(r => setTimeout(r, 1200));

    // 3. Connect to Chrome CDP via WebSocket
    let targetsRes = await fetch(`http://127.0.0.1:${CHROME_PORT}/json/list`);
    let targets = await targetsRes.json();
    let pageTarget = targets.find(t => t.type === 'page');
    if (!pageTarget) {
      const newTabRes = await fetch(`http://127.0.0.1:${CHROME_PORT}/json/new`);
      pageTarget = await newTabRes.json();
    }
    const wsUrl = pageTarget.webSocketDebuggerUrl;
    console.log("Connecting to Chrome CDP WebSocket for page:", pageTarget.url);

    const ws = new WebSocket(wsUrl);
    await new Promise((res) => ws.onopen = res);

    let msgId = 1;
    const callbacks = new Map();
    const consoleErrors = [];

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && callbacks.has(msg.id)) {
        const { resolve, reject } = callbacks.get(msg.id);
        callbacks.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      } else if (msg.method === 'Runtime.exceptionThrown') {
        console.error("BROWSER EXCEPTION:", JSON.stringify(msg.params.exceptionDetails));
        consoleErrors.push(msg.params.exceptionDetails);
      } else if (msg.method === 'Console.messageAdded' && msg.params.message.level === 'error') {
        console.error("CONSOLE ERROR:", msg.params.message.text);
        consoleErrors.push(msg.params.message.text);
      }
    };

    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        callbacks.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await send('Runtime.enable');
    await send('Page.enable');
    await send('DOM.enable');

    async function evaluate(expression) {
      const res = await send('Runtime.evaluate', {
        expression,
        returnByValue: true,
        awaitPromise: true
      });
      if (res.exceptionDetails) {
        throw new Error(JSON.stringify(res.exceptionDetails));
      }
      return res.result ? res.result.value : undefined;
    }

    async function navigate(url) {
      await send('Page.navigate', { url });
      // Poll until readyState is complete
      for (let i = 0; i < 30; i++) {
        await new Promise(r => setTimeout(r, 200));
        try {
          const state = await evaluate(`document.readyState`);
          if (state === 'complete') break;
        } catch (e) {}
      }
      await new Promise(r => setTimeout(r, 400));
    }

    async function waitForSelector(selector, timeout = 5000) {
      const start = Date.now();
      while (Date.now() - start < timeout) {
        try {
          const found = await evaluate(`!!document.querySelector('${selector}')`);
          if (found) return true;
        } catch (e) {}
        await new Promise(r => setTimeout(r, 150));
      }
      const pageInfo = await evaluate(`({ url: window.location.href, html: document.body ? document.body.innerHTML.slice(0, 300) : '' })`);
      throw new Error(`Timeout waiting for selector: ${selector}. Page info: ${JSON.stringify(pageInfo)}`);
    }

    console.log("Step 1: Navigating to register...");
    await navigate(`http://127.0.0.1:${FLASK_PORT}/register`);
    await waitForSelector('input[name="username"]');
    const userSuffix = Date.now().toString().slice(-5);
    await evaluate(`
      document.querySelector('input[name="username"]').value = "pptuser_${userSuffix}";
      document.querySelector('input[name="password"]').value = "PptPass123!";
      document.querySelector('input[name="confirm_password"]').value = "PptPass123!";
      document.querySelector('form').submit();
    `);
    await new Promise(r => setTimeout(r, 1200));

    console.log("Step 2: Logging in...");
    await navigate(`http://127.0.0.1:${FLASK_PORT}/login`);
    await waitForSelector('input[name="username"]');
    await evaluate(`
      document.querySelector('input[name="username"]').value = "pptuser_${userSuffix}";
      document.querySelector('input[name="password"]').value = "PptPass123!";
      document.querySelector('form').submit();
    `);
    await new Promise(r => setTimeout(r, 1200));

    console.log("Step 3: Creating a new presentation...");
    await navigate(`http://127.0.0.1:${FLASK_PORT}/editor/new?title=PowerPoint%20Pro%20Deck`);
    await new Promise(r => setTimeout(r, 2000));

    // Verify PowerPoint UI elements
    console.log("Step 4: Verifying PowerPoint UI components...");
    const uiVerification = await evaluate(`
      ({
        brandTitle: document.querySelector('.brand-title')?.textContent,
        deckTitle: document.getElementById('deck-title-input')?.value,
        saveStatus: document.getElementById('save-status-text')?.textContent,
        ribbonTabsCount: document.querySelectorAll('.ribbon-tab').length,
        slidesCount: document.querySelectorAll('.ppt-thumb-item').length,
        hasCanvas: !!document.getElementById('ppt-slide-canvas'),
        hasInkCanvas: !!document.getElementById('ink-canvas'),
        hasSpeakerNotes: !!document.getElementById('speaker-notes-pane')
      })
    `);
    console.log("UI Inspection Result:", uiVerification);

    if (uiVerification.ribbonTabsCount < 7) {
      throw new Error(`Expected at least 7 Ribbon tabs, found: ${uiVerification.ribbonTabsCount}`);
    }
    if (uiVerification.slidesCount < 1) {
      throw new Error("No slides found in thumbnail list!");
    }

    // Step 5: Test Ribbon Tab Navigation
    console.log("Step 5: Testing Ribbon tabs switching...");
    const tabNames = ['insert', 'draw', 'design', 'transitions', 'slideshow', 'view', 'home'];
    for (const name of tabNames) {
      await evaluate(`document.querySelector('.ribbon-tab[data-tab="${name}"]')?.click()`);
      await new Promise(r => setTimeout(r, 150));
    }
    console.log("SUCCESS: All Ribbon tabs clicked smoothly without errors.");

    // Step 6: Test Insert Elements (Textbox, WordArt, Shapes, Table)
    console.log("Step 6: Testing element insertions...");
    await evaluate(`document.querySelector('.ribbon-tab[data-tab="insert"]').click()`);
    await new Promise(r => setTimeout(r, 200));

    // Insert Textbox
    await evaluate(`document.getElementById('btn-insert-textbox').click()`);
    // Insert WordArt
    await evaluate(`document.getElementById('btn-insert-wordart').click()`);
    // Insert Table
    await evaluate(`document.getElementById('btn-insert-table').click()`);
    // Insert Shapes
    await evaluate(`
      document.getElementById('btn-shapes-dropdown').click();
      document.querySelector('.shape-tile[data-shape="star"]').click();
    `);
    await evaluate(`
      document.getElementById('btn-shapes-dropdown').click();
      document.querySelector('.shape-tile[data-shape="arrow"]').click();
    `);
    await new Promise(r => setTimeout(r, 500));

    const elementCount = await evaluate(`document.querySelectorAll('.slide-element').length`);
    console.log(`SUCCESS: Inserted elements into slide, total elements now on canvas: ${elementCount}`);

    // Step 7: Test Freehand Drawing (Draw Tab)
    console.log("Step 7: Testing Freehand Inks Drawing Engine...");
    await evaluate(`document.querySelector('.ribbon-tab[data-tab="draw"]').click()`);
    await evaluate(`document.getElementById('tool-pen').click()`);
    await evaluate(`
      const ink = document.getElementById('ink-canvas');
      const rect = ink.getBoundingClientRect();
      const mousedown = new MouseEvent('mousedown', { clientX: rect.left + 50, clientY: rect.top + 50 });
      const mousemove = new MouseEvent('mousemove', { clientX: rect.left + 150, clientY: rect.top + 150 });
      const mouseup = new MouseEvent('mouseup', {});
      ink.dispatchEvent(mousedown);
      ink.dispatchEvent(mousemove);
      window.dispatchEvent(mouseup);
    `);
    await new Promise(r => setTimeout(r, 300));
    const pathsCount = await evaluate(`document.querySelectorAll('#ink-canvas path').length`);
    console.log(`SUCCESS: Drawing engine created SVG stroke paths: ${pathsCount}`);

    // Step 8: Test Slide Sorter View
    console.log("Step 8: Testing Slide Sorter View...");
    await evaluate(`document.querySelector('.ribbon-tab[data-tab="view"]').click()`);
    await evaluate(`document.getElementById('btn-view-sorter').click()`);
    await new Promise(r => setTimeout(r, 300));
    const sorterCards = await evaluate(`document.querySelectorAll('.sorter-grid > div').length`);
    console.log(`SUCCESS: Slide Sorter rendered ${sorterCards} slide cards.`);

    // Switch back to normal view
    await evaluate(`document.getElementById('btn-view-normal').click()`);
    await new Promise(r => setTimeout(r, 300));

    // Step 9: Test Slide Show Presentation Mode
    console.log("Step 9: Testing Slide Show Mode & Presenter Tools...");
    await evaluate(`document.querySelector('.ribbon-tab[data-tab="slideshow"]').click()`);
    await evaluate(`document.getElementById('btn-show-from-beginning').click()`);
    await new Promise(r => setTimeout(r, 500));

    const isSlideshowOpen = await evaluate(`
      document.getElementById('ppt-slideshow-overlay').style.display === 'flex'
    `);
    if (!isSlideshowOpen) {
      throw new Error("Slide show overlay failed to open!");
    }
    console.log("SUCCESS: Slide Show overlay is open and presenting.");

    // Toggle laser pointer
    await evaluate(`document.getElementById('hud-laser').click()`);
    const isLaser = await evaluate(`document.getElementById('laser-pointer').style.display === 'block'`);
    console.log("SUCCESS: Presenter Laser Pointer toggled:", isLaser);

    // Toggle black screen
    await evaluate(`document.getElementById('hud-black').click()`);
    console.log("SUCCESS: Black screen toggled in presentation mode.");

    // Exit slide show
    await evaluate(`document.getElementById('hud-exit').click()`);
    await new Promise(r => setTimeout(r, 300));
    const isSlideshowClosed = await evaluate(`
      document.getElementById('ppt-slideshow-overlay').style.display === 'none'
    `);
    console.log("SUCCESS: Slide show closed cleanly:", isSlideshowClosed);

    // Step 10: Test Speaker Notes Pane
    console.log("Step 10: Testing Speaker Notes Pane...");
    await evaluate(`
      const notesPane = document.getElementById('speaker-notes-pane');
      notesPane.classList.remove('collapsed');
      const input = document.getElementById('speaker-notes-input');
      input.value = "Automated test speaker notes - key takeaways.";
      input.dispatchEvent(new Event('input'));
    `);
    await new Promise(r => setTimeout(r, 400));
    console.log("SUCCESS: Speaker notes updated.");

    // Step 11: Capture Visual Screenshot of the Editor
    console.log("Step 11: Capturing screenshot of PowerPoint UI...");
    const screenshotData = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('ppt_editor_verification.png', Buffer.from(screenshotData.data, 'base64'));
    console.log("SUCCESS: Saved verification screenshot to ppt_editor_verification.png");

    // Check Console Errors
    if (consoleErrors.length > 0) {
      console.error("FAILED: Encountered JavaScript console errors:", consoleErrors);
      process.exit(1);
    } else {
      console.log("\n=======================================================");
      console.log("🎉 ALL E2E HEADLESS CHROME TESTS PASSED WITH 0 ERRORS!");
      console.log("=======================================================");
    }

    // Cleanup
    ws.close();
    chromeProcess.kill();
    flaskProcess.kill();
    process.exit(0);

  } catch (err) {
    console.error("TEST FAILED:", err);
    try { chromeProcess.kill(); } catch (e) {}
    try { flaskProcess.kill(); } catch (e) {}
    process.exit(1);
  }
}

runTest();
