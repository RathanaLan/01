// ==========================================================================
// DX Goal 2030 | Interactive Controller & Alive Animations
// ==========================================================================

(() => {
  // 1. Pause decorative animations when tab is hidden
  document.addEventListener('visibilitychange', () => {
    document.documentElement.classList.toggle('page-hidden', document.hidden);
  });

  // 2. Animated Number Counters
  function runCounters(scope = document) {
    const counters = scope.querySelectorAll('.count-num');
    counters.forEach((el) => {
      const target = Number(el.dataset.target || 0);
      const useComma = el.dataset.comma === 'true';
      const duration = 1100;
      const startTime = performance.now();

      function tick(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const val = Math.round(target * eased);
        el.textContent = useComma ? val.toLocaleString('en-US') : String(val);
        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      }

      requestAnimationFrame(tick);
    });
  }

  // 3. Replay Bar & Counter Animations
  function replayAnimations() {
    const bars = document.querySelectorAll('.bar-pillar, .r-pillar');
    bars.forEach((bar) => {
      bar.style.animation = 'none';
      void bar.offsetHeight; // trigger reflow
      bar.style.animation = '';
    });
    runCounters(document);
  }

  // 4. Mode Switcher (Ex:1 Real-Time Attendance Control <-> Ex:1 Leave Request Application)
  const modeBtns = document.querySelectorAll('.mode-btn');
  const modePanels = document.querySelectorAll('[data-mode-panel]');
  const vdoOverlayTitle = document.getElementById('vdoOverlayTitle');
  const vdoCaptionText = document.getElementById('vdoCaptionText');

  function setMode(mode) {
    modeBtns.forEach((btn) => {
      const isMatch = btn.dataset.mode === mode;
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-selected', String(isMatch));
    });

    modePanels.forEach((panel) => {
      panel.classList.toggle('active', panel.dataset.modePanel === mode);
    });

    if (vdoOverlayTitle && vdoCaptionText) {
      if (mode === 'leave') {
        vdoOverlayTitle.innerHTML = 'Small Change<br><strong>Big Impact</strong>';
        vdoCaptionText.textContent =
          'Leave data is centralized in the app and prepared for future development.';
      } else {
        vdoOverlayTitle.innerHTML =
          'See Earlier<br>Decide Faster<br><strong>Stabilize Production</strong>';
        vdoCaptionText.textContent =
          'Real-time attendance data enables faster manpower action and stable operation.';
      }
    }

    replayAnimations();
  }

  modeBtns.forEach((btn) => {
    btn.addEventListener('click', () => setMode(btn.dataset.mode));
  });

  // 5. Interactive Video Preview Player
  const vdoPlayer = document.getElementById('vdoPlayer');
  const vdoStateIcon = document.getElementById('vdoStateIcon');
  const vdoTime = document.getElementById('vdoTime');
  const vdoProgressFill = document.getElementById('vdoProgressFill');

  let isPlaying = false;
  let videoSeconds = 0;
  let videoTimer = null;

  function formatSec(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  }

  function toggleVideo() {
    if (!vdoPlayer) return;
    isPlaying = !isPlaying;
    vdoPlayer.classList.toggle('playing', isPlaying);
    if (vdoStateIcon) vdoStateIcon.textContent = isPlaying ? '⏸' : '▶';

    if (isPlaying) {
      videoTimer = setInterval(() => {
        videoSeconds = (videoSeconds + 1) % 91;
        if (vdoTime) vdoTime.textContent = `${formatSec(videoSeconds)} / 1:30`;
        if (vdoProgressFill) {
          vdoProgressFill.style.width = `${Math.max(5, (videoSeconds / 90) * 100)}%`;
        }
      }, 1000);
    } else if (videoTimer) {
      clearInterval(videoTimer);
      videoTimer = null;
    }
  }

  if (vdoPlayer) {
    vdoPlayer.addEventListener('click', toggleVideo);
    vdoPlayer.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleVideo();
      }
    });
  }

  // 6. Replay & Fullscreen Buttons
  const replayBtn = document.getElementById('replayAnimBtn');
  if (replayBtn) {
    replayBtn.addEventListener('click', replayAnimations);
  }

  const fullscreenBtn = document.getElementById('fullscreenBtn');
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });
  }

  // 7. Subtle Background Digital Particles
  const canvas = document.getElementById('bgParticles');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    const nodes = Array.from({ length: 28 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2 + 1
    }));

    function drawParticles() {
      if (!document.hidden) {
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i];
          a.x += a.vx;
          a.y += a.vy;
          if (a.x < 0 || a.x > w) a.vx *= -1;
          if (a.y < 0 || a.y > h) a.vy *= -1;

          ctx.beginPath();
          ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(12, 135, 235, 0.28)';
          ctx.fill();

          for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 130) {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(12, 135, 235, ${(1 - dist / 130) * 0.12})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }
      requestAnimationFrame(drawParticles);
    }

    requestAnimationFrame(drawParticles);
  }

  // Run initial counter animation on load
  window.addEventListener('DOMContentLoaded', () => {
    runCounters(document);
  });
})();
