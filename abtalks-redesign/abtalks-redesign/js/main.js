// Section content is always visible (see CSS) — no scroll-gated reveal,
// since automated screenshots of this app may be taken before any scroll
// or IntersectionObserver callback runs.
function initScrollReveal() { /* intentionally a no-op; kept for clarity */ }

// ---------- Count-up numbers ----------
function initCountUp() {
  const items = document.querySelectorAll('[data-countup]');
  if (!items.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.countup, 10);
      const suffix = el.dataset.suffix || '';
      const dur = 1200;
      const start = performance.now();
      function tick(now) {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString('en-IN') + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.4 });
  items.forEach(el => io.observe(el));

  // Safety net: same reasoning as scroll reveal — never leave a stat at 0.
  setTimeout(() => {
    items.forEach(el => {
      if (el.textContent.trim() === '0') {
        const target = parseInt(el.dataset.countup, 10);
        el.textContent = target.toLocaleString('en-IN') + (el.dataset.suffix || '');
      }
    });
  }, 2000);
}

// ---------- Build a streak heatmap grid ----------
// completed: array of day numbers done, missed: array missed, shielded: array covered by shield
// totalCells: how many day-cells to render, currentDay: which one is "today"
function buildHeatmap(el, { totalCells, completed = [], missed = [], shielded = [], currentDay, reveal = false }) {
  el.innerHTML = '';
  if (reveal) el.classList.add('reveal');
  for (let i = 1; i <= totalCells; i++) {
    const cell = document.createElement('div');
    cell.className = 'heat-cell';
    let state = 'locked';
    if (i === currentDay) state = 'today';
    else if (shielded.includes(i)) state = 'shield';
    else if (missed.includes(i)) state = 'missed';
    else if (completed.includes(i)) state = 'done';
    else if (i < currentDay) state = 'locked';
    cell.dataset.state = state;
    cell.style.animationDelay = (i * 8) + 'ms';
    cell.title = `Day ${i}` + (state === 'today' ? ' · today' : state === 'done' ? ' · complete' : state === 'shield' ? ' · covered by Streak Shield' : state === 'missed' ? ' · missed' : '');
    el.appendChild(cell);
  }
}

// ---------- Build a windowed strip of the heatmap (used by dashboard + day page) ----------
function buildHeatmapWindow(elId, start, end, s) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.innerHTML = '';
  el.style.gridTemplateColumns = `repeat(${Math.min(14, end - start + 1)}, 1fr)`;
  for (let i = start; i <= end; i++) {
    const cell = document.createElement('div');
    cell.className = 'heat-cell';
    let state = 'locked';
    if (i === s.dayIndex) state = 'today';
    else if (s.shieldDays.includes(i)) state = 'shield';
    else if (s.missedDays.includes(i)) state = 'missed';
    else if (s.completedDays.includes(i)) state = 'done';
    else if (i > s.dayIndex) state = 'locked';
    cell.dataset.state = state;
    cell.title = `Day ${i}`;
    el.appendChild(cell);
  }
}

// ---------- Toast ----------
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.58l7.3-7.3a1 1 0 011.4 0z" clip-rule="evenodd"/></svg><span></span>`;
    document.body.appendChild(toast);
  }
  toast.querySelector('span').textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 3200);
}

// ---------- Mobile nav toggle (landing page) ----------
function initNavToggle() {
  const btn = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-nav-menu]');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCountUp();
  initNavToggle();
});
