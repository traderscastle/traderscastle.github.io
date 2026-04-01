// ===== PAGE LOADER =====
window.addEventListener('load', () => {
  const loader = document.querySelector('.page-loader');
  if (loader) {
    setTimeout(() => loader.remove(), 1900);
  }
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== HEADER SCROLL EFFECT =====
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ===== SCROLL REVEAL OBSERVER =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children').forEach(el => {
  revealObserver.observe(el);
});

// ===== AUTO-ADD REVEAL CLASSES =====
// About section paragraphs
document.querySelectorAll('.about-detailed p, .about-detailed h3').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.08}s`;
  revealObserver.observe(el);
});

// Highlight boxes
document.querySelectorAll('.highlight-box').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.07}s`;
  revealObserver.observe(el);
});

// Course boxes
document.querySelectorAll('.course-box').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.08}s`;
  revealObserver.observe(el);
});

// Cards
document.querySelectorAll('.card').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.1}s`;
  revealObserver.observe(el);
});

// Join buttons
document.querySelectorAll('.join-btn').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.1}s`;
  revealObserver.observe(el);
});

// Contact items
document.querySelectorAll('.contact-item').forEach((el, i) => {
  el.classList.add('reveal-left');
  el.style.transitionDelay = `${i * 0.1}s`;
  revealObserver.observe(el);
});

// Social icons
document.querySelectorAll('.social-icons a').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.1}s`;
  revealObserver.observe(el);
});

// Section headings
document.querySelectorAll('.main-heading').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ===== CONTACT FORM (if present) =====
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
  });
}

// ===== TICKER MARQUEE BUILDER =====
function buildTicker() {
  const tickerData = [
    { symbol: 'XAUUSD', price: '2318.40', change: '+12.30', up: true },
    { symbol: 'EURUSD', price: '1.0842', change: '+0.0021', up: true },
    { symbol: 'USDJPY', price: '154.62', change: '-0.38', up: false },
    { symbol: 'GBPUSD', price: '1.2634', change: '+0.0015', up: true },
    { symbol: 'NIFTY50', price: '22,450', change: '+125', up: true },
    { symbol: 'BANKNIFTY', price: '48,320', change: '-85', up: false },
    { symbol: 'BTCUSD', price: '67,240', change: '+840', up: true },
    { symbol: 'WTI OIL', price: '82.14', change: '-0.52', up: false },
    { symbol: 'S&P 500', price: '5,240', change: '+18', up: true },
    { symbol: 'NASDAQ', price: '18,340', change: '+95', up: true },
  ];

  const bar = document.createElement('div');
  bar.className = 'ticker-bar';

  // Duplicate for infinite effect
  const track = document.createElement('div');
  track.className = 'ticker-track';

  [...tickerData, ...tickerData].forEach(item => {
    const span = document.createElement('span');
    span.className = 'ticker-item';
    const arrow = item.up ? '▲' : '▼';
    const cls = item.up ? 'up' : 'down';
    span.innerHTML = `${item.symbol} <span class="${cls}">${item.price} ${arrow}${item.change}</span>`;
    track.appendChild(span);
  });

  bar.appendChild(track);

  // Insert after header
  const header = document.querySelector('header');
  header.insertAdjacentElement('afterend', bar);
}

buildTicker();

// ===== PAGE LOADER INJECT =====
function injectLoader() {
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = `
    <div class="loader-content">
      <img src="logoo.png" alt="Traders Castle Logo" class="loader-img">
      <div class="loader-logo">Traders Castle</div>
      <div class="loader-tagline">Where Traders Build Their Empire</div>
    </div>
  `;
  document.body.insertBefore(loader, document.body.firstChild);
}

injectLoader();

// ===== ANIMATED HERO CHART =====
function initHeroChart() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position: absolute;
    bottom: 0; left: 0;
    width: 100%; height: 260px;
    pointer-events: none;
    z-index: 1;
  `;
  hero.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  const points = [
    0.85, 0.72, 0.78, 0.55, 0.65,
    0.40, 0.52, 0.28, 0.45, 0.18,
    0.35, 0.10, 0.22
  ];

  let progress = 0;
  const duration = 2200;
  let startTime = null;

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function draw(timestamp) {
    if (!startTime) startTime = timestamp;
    progress = Math.min((timestamp - startTime) / duration, 1);
    const eased = easeOut(progress);

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width;
    const H = canvas.height;

    const totalPoints = Math.max(2, Math.floor(eased * (points.length - 1)) + 1);
    const partialProgress = (eased * (points.length - 1)) % 1;

    const coords = [];
    for (let i = 0; i < totalPoints; i++) {
      const x = (i / (points.length - 1)) * W;
      let y;
      if (i < totalPoints - 1) {
        y = points[i] * H * 0.85 + H * 0.05;
      } else {
        const prev = points[i - 1] ?? points[i];
        const curr = points[i];
        y = (prev + (curr - prev) * partialProgress) * H * 0.85 + H * 0.05;
      }
      coords.push({ x, y });
    }

    const fillGrad = ctx.createLinearGradient(0, 0, 0, H);
    fillGrad.addColorStop(0, 'rgba(255,215,0,0.18)');
    fillGrad.addColorStop(1, 'rgba(255,215,0,0)');

    ctx.beginPath();
    ctx.moveTo(coords[0].x, coords[0].y);
    for (let i = 1; i < coords.length; i++) {
      const mx = (coords[i-1].x + coords[i].x) / 2;
      const my = (coords[i-1].y + coords[i].y) / 2;
      ctx.quadraticCurveTo(coords[i-1].x, coords[i-1].y, mx, my);
    }
    ctx.lineTo(coords[coords.length-1].x, coords[coords.length-1].y);
    ctx.lineTo(coords[coords.length-1].x, H);
    ctx.lineTo(coords[0].x, H);
    ctx.closePath();
    ctx.fillStyle = fillGrad;
    ctx.fill();

    const lineGrad = ctx.createLinearGradient(0, 0, W, 0);
    lineGrad.addColorStop(0,   'rgba(255,215,0,0.3)');
    lineGrad.addColorStop(0.4, 'rgba(255,215,0,1)');
    lineGrad.addColorStop(1,   'rgba(255,215,0,0.85)');

    ctx.beginPath();
    ctx.moveTo(coords[0].x, coords[0].y);
    for (let i = 1; i < coords.length; i++) {
      const mx = (coords[i-1].x + coords[i].x) / 2;
      const my = (coords[i-1].y + coords[i].y) / 2;
      ctx.quadraticCurveTo(coords[i-1].x, coords[i-1].y, mx, my);
    }
    ctx.lineTo(coords[coords.length-1].x, coords[coords.length-1].y);
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = 'rgba(255,215,0,0.6)';
    ctx.shadowBlur = 12;
    ctx.stroke();
    ctx.shadowBlur = 0;

    const tip = coords[coords.length-1];
    const pulse = Math.sin(timestamp / 400) * 0.4 + 0.6;
    ctx.beginPath();
    ctx.arc(tip.x, tip.y, 10 * pulse, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,215,0,${0.12 * pulse})`;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(tip.x, tip.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffd700';
    ctx.shadowColor = 'rgba(255,215,0,0.9)';
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.shadowBlur = 0;

    if (progress >= 0.7) {
      const peakIdx = points.indexOf(Math.min(...points));
      const peakX = (peakIdx / (points.length - 1)) * W;
      const peakY = points[peakIdx] * H * 0.85 + H * 0.05;
      const alpha = Math.min(1, (progress - 0.7) / 0.3);
      ctx.beginPath();
      ctx.arc(peakX, peakY, 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(34,197,94,${alpha})`;
      ctx.shadowColor = 'rgba(34,197,94,0.8)';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.font = 'bold 11px monospace';
      ctx.fillStyle = `rgba(34,197,94,${alpha})`;
      ctx.fillText('▲ HIGH', peakX + 8, peakY - 6);
    }

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}

initHeroChart(); 

// ===== FLOATING PARTICLES (Canvas) =====
function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particleCanvas';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  const count = 35;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      life: Math.random(),
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life += 0.003;

      if (p.y < -10) {
        p.y = window.innerHeight + 10;
        p.x = Math.random() * window.innerWidth;
        p.life = 0;
      }

      const alpha = p.alpha * Math.sin(p.life * Math.PI) * 0.8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 215, 0, ${Math.max(0, alpha)})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();
}

initParticles();

// ===== HERO SCROLL INDICATOR =====
function injectScrollIndicator() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const indicator = document.createElement('div');
  indicator.className = 'scroll-indicator';
  indicator.innerHTML = `<span>SCROLL</span><div class="scroll-line"></div>`;
  hero.appendChild(indicator);
}

injectScrollIndicator();

// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? '#ffd700' : '';
  });
});

// ===== SECTION DIVIDERS =====
document.querySelectorAll('.main-heading').forEach(h => {
  if (!h.nextElementSibling?.classList.contains('section-divider')) {
    const div = document.createElement('div');
    div.className = 'section-divider';
    h.insertAdjacentElement('afterend', div);
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mainNav.classList.toggle('open');
});

// Close menu when a nav link is clicked
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mainNav.classList.remove('open');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mainNav.contains(e.target)) {
    hamburger.classList.remove('open');
    mainNav.classList.remove('open');
  }
});


// ===== ANIMATED COUNTERS =====
// counting appear for 100+ students and 50+ live session
function animateCounter(el, target, suffix, duration) {
  let start = null;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

window.addEventListener('load', () => {
  document.querySelectorAll('.highlight-box h3').forEach(el => {
    const text = el.textContent.trim();

    // Store original value as data attribute
    if (text === '100+') {
      el.dataset.target = '100';
      el.dataset.suffix = '+';
    } else if (text === '50+') {
      el.dataset.target = '50';
      el.dataset.suffix = '+';
    }
  });

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix;

        if (!isNaN(target)) {
          animateCounter(el, target, suffix, 1800);
        }

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.highlight-box h3[data-target]').forEach(el => {
    counterObserver.observe(el);
  });
});


// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.parentElement;
    const isOpen = item.classList.contains('open');

    // Close all open items
    document.querySelectorAll('.faq-item.open').forEach(open => {
      open.classList.remove('open');
    });

    // Open clicked one if it was closed
    if (!isOpen) {
      item.classList.add('open');
    }
  });
});


// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== ACHIEVEMENTS COUNTER =====
const achObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      let start = null;

      const step = timestamp => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / 2000, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
      achObserver.unobserve(el);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.ach-count').forEach(el => {
  achObserver.observe(el);
});