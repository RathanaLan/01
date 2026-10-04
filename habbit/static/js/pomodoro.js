/**
 * Interactive Pomodoro Timer using Web Audio API for zero-dependency sound
 */
(function() {
  const display = document.getElementById('timerDisplay');
  const startBtn = document.getElementById('timerStartBtn');
  const resetBtn = document.getElementById('timerResetBtn');
  const modeBtns = document.querySelectorAll('.timer-mode-btn');

  if (!display || !startBtn || !resetBtn) return;

  const MODES = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
  };

  let currentMode = 'pomodoro';
  let timeLeft = MODES[currentMode];
  let timerInterval = null;
  let isRunning = false;

  // Synthesize gentle notification chime with Web Audio API
  function playChime() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5

      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {
      console.log('Audio notification skipped');
    }
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function updateDisplay() {
    display.textContent = formatTime(timeLeft);
  }

  function switchMode(newMode) {
    clearInterval(timerInterval);
    isRunning = false;
    currentMode = newMode;
    timeLeft = MODES[newMode];
    startBtn.innerHTML = '<span>▶</span> Start';
    startBtn.classList.remove('btn-secondary');
    startBtn.classList.add('btn-primary');

    modeBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === newMode);
    });

    updateDisplay();
  }

  function tick() {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timerInterval);
      isRunning = false;
      playChime();
      startBtn.innerHTML = '<span>▶</span> Start';
      
      const modeNames = {
        pomodoro: 'Deep Work Session Finished! Take a well-deserved break.',
        shortBreak: 'Break Over! Time to lock back in.',
        longBreak: 'Long Break Finished! Ready for another sprint?'
      };

      alert(modeNames[currentMode] || 'Time is up!');
      switchMode(currentMode === 'pomodoro' ? 'shortBreak' : 'pomodoro');
    }
  }

  startBtn.addEventListener('click', () => {
    if (isRunning) {
      clearInterval(timerInterval);
      isRunning = false;
      startBtn.innerHTML = '<span>▶</span> Resume';
    } else {
      isRunning = true;
      startBtn.innerHTML = '<span>⏸</span> Pause';
      timerInterval = setInterval(tick, 1000);
    }
  });

  resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = MODES[currentMode];
    startBtn.innerHTML = '<span>▶</span> Start';
    updateDisplay();
  });

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchMode(btn.dataset.mode);
    });
  });

  updateDisplay();
})();
