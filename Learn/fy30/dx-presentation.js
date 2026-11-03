/* ===== 2030 DX GOAL — ALIVE PRESENTATION SCRIPTS ===== */

const totalSlides = 8;
let current = 1;

// --- Slide navigation ---
function updateSlide() {
  document.querySelectorAll('.slide').forEach((el, i) => {
    const num = i + 1;
    el.classList.remove('active', 'prev');
    if (num === current) el.classList.add('active');
    else if (num < current) el.classList.add('prev');
  });

  const pad = (n) => String(n).padStart(2, '0');
  document.getElementById('slideCounter').textContent = pad(current);
  document.getElementById('totalCounter').textContent = pad(totalSlides);

  document.getElementById('prevBtn').disabled = current === 1;
  document.getElementById('nextBtn').disabled = current === totalSlides;

  const n = notesData[current];
  if (n) {
    document.getElementById('notesTitle').textContent = n.title;
    document.getElementById('notesContent').textContent = n.content;
  }

  // Trigger animations per slide
  if (current === 4) setTimeout(animateBars, 400);
  if (current === 1) setTimeout(animateCounters, 600);
  if (current === 6) setTimeout(animateMiniCharts, 400);
}

document.getElementById('nextBtn').addEventListener('click', () => {
  if (current < totalSlides) { current++; updateSlide(); }
});

document.getElementById('prevBtn').addEventListener('click', () => {
  if (current > 1) { current--; updateSlide(); }
});

// Keyboard navigation
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
    e.preventDefault();
    if (current < totalSlides) { current++; updateSlide(); }
  }
  if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
    if (current > 1) { current--; updateSlide(); }
  }
  if (e.key === 'n' || e.key === 'N') toggleNotesFn();
  if (e.key === 'Escape') closeNotes();
});

// --- Notes toggle ---
let notesVisible = false;

function toggleNotesFn() {
  notesVisible = !notesVisible;
  const panel = document.getElementById('notes');
  const btn = document.getElementById('toggleNotes');
  if (notesVisible) {
    panel.classList.add('show');
    btn.textContent = '✕ Hide Notes';
  } else {
    panel.classList.remove('show');
    btn.textContent = '📝 Notes';
  }
}

function closeNotes() {
  notesVisible = false;
  document.getElementById('notes').classList.remove('show');
  document.getElementById('toggleNotes').textContent = '📝 Notes';
}

document.getElementById('toggleNotes').addEventListener('click', toggleNotesFn);
document.getElementById('notesClose').addEventListener('click', closeNotes);

// --- Timer (5 minutes) ---
let timeLeft = 300;
function updateTimer() {
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  const el = document.getElementById('timer-value');
  el.textContent = m + ':' + s.toString().padStart(2, '0');
  if (m < 1) el.style.color = '#ff0055';
  if (timeLeft > 0) timeLeft--;
}
setInterval(updateTimer, 1000);

// --- Alive Background Particles ---
function initParticles() {
  const container = document.getElementById('particles');
  const particleCount = 55;
  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 5 + 2;
    const delay = Math.random() * 6;
    const duration = Math.random() * 12 + 12;
    p.style.left = x + '%';
    p.style.top = y + '%';
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.opacity = Math.random() * 0.4 + 0.1;
    p.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite`;
    const colors = ['#00f3ff', '#bc13fe', '#00ff88', '#ffaa00', '#ff0055'];
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.boxShadow = `0 0 ${size * 5}px ${p.style.background}`;
    container.appendChild(p);
  }
}

initParticles();

// --- Bar chart animations ---
function animateBars() {
  const bf = document.querySelector('.bf-fill');
  const af = document.querySelector('.af-fill');
  if (bf) bf.style.height = '85%';
  if (af) af.style.height = '25%';
}

// --- Mini chart animations ---
function animateMiniCharts() {
  // Mini charts use CSS transitions already, but we can trigger a reflow
  document.querySelectorAll('.mini-chart-card').forEach(card => {
    card.style.opacity = '0';
    setTimeout(() => { card.style.opacity = '1'; }, 100);
  });
}

// --- Counter animations ---
function animateCounters() {
  const stats = document.querySelectorAll('.stat-value');
  const targets = [36, 1440, '170→50'];
  stats.forEach((stat, i) => {
    if (typeof targets[i] === 'number') {
      animateValue(stat, 0, targets[i], 1800);
    } else {
      stat.textContent = targets[i];
      stat.style.color = '#ff0055';
      stat.style.textShadow = '0 0 20px rgba(255, 0, 85, 0.5)';
    }
  });
}

function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.textContent = Math.floor(progress * (end - start) + start);
    if (progress < 1) window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
}

// --- Initialize ---
updateSlide();

// Add particle CSS dynamically
const style = document.createElement('style');
style.textContent = `
  .particle {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    z-index: -1;
    transition: opacity 0.5s ease;
  }
  @keyframes floatParticle {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
    33% { transform: translate(25px, -30px) scale(1.3); opacity: 0.6; }
    66% { transform: translate(-20px, 20px) scale(0.8); opacity: 0.4; }
  }
`;
document.head.appendChild(style);