/* ===== Canvas Background Particles ===== */
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 3 + 1;
    this.alpha = Math.random() * 0.4 + 0.1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(13, 110, 253, ${this.alpha})`;
    ctx.fill();
  }
}

for (let i = 0; i < 60; i++) particles.push(new Particle());

function animateBg() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(13, 110, 253, ${0.1 - dist / 1500})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateBg);
}
animateBg();

/* ===== Scroll Reveal ===== */
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ===== Animated Counters ===== */
function animateValue(id, start, end, duration) {
  const obj = document.getElementById(id);
  if (!obj) return;
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    obj.innerHTML = value;
    if (progress < 1) window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      const end = parseInt(entry.target.getAttribute('data-end'));
      animateValue(entry.target.id, 0, end, 1500);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

/* ===== Bar Chart Animations on Scroll ===== */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.filled, .b.filled').forEach(bar => {
        bar.style.height = bar.getAttribute('data-height') || bar.style.height;
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.impact-bar, .result-bar, .mini-chart').forEach(el => barObserver.observe(el));

/* Initialize bar heights as data attributes for animation */
document.querySelectorAll('.impact-bar .filled, .result-bar .filled, .mini-bar .b.filled').forEach(bar => {
  const h = bar.style.height;
  bar.setAttribute('data-height', h);
  bar.style.height = '0%';
});

/* ===== Interactive Hover Effects ===== */
document.querySelectorAll('.kadai-item, .team-member, .pillar').forEach(el => {
  el.addEventListener('mouseenter', () => el.style.transform = 'scale(1.05) rotate(-1deg)');
  el.addEventListener('mouseleave', () => el.style.transform = 'scale(1) rotate(0deg)');
});

/* ===== VDO Play Button Interaction ===== */
const playBtn = document.querySelector('.vdo-play');
playBtn.addEventListener('click', () => {
  playBtn.innerHTML = '';
  const triangle = document.createElement('div');
  triangle.style.width = '0';
  triangle.style.height = '0';
  triangle.style.borderLeft = '25px solid #0d6efd';
  triangle.style.borderTop = '15px solid transparent';
  triangle.style.borderBottom = '15px solid transparent';
  triangle.style.marginLeft = '5px';
  playBtn.appendChild(triangle);
  playBtn.style.background = 'white';
  playBtn.style.boxShadow = '0 0 0 30px rgba(255,255,255,0)';
  setTimeout(() => {
    playBtn.style.opacity = '0';
    setTimeout(() => playBtn.style.display = 'none', 500);
  }, 800);
});

/* ===== Header Play Button ===== */
document.querySelector('.dev-header .play-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const btn = e.currentTarget;
  const original = btn.innerHTML;
  btn.innerHTML = 'Playing...';
  btn.style.background = '#198754';
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '#0d6efd';
  }, 1500);
});