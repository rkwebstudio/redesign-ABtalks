const ACHIEVEMENT_ICONS = {
  'first-commit': '🚀',
  'week-one': '🔥',
  'public-voice': '📣',
  'halfway': '🏁'
};

function renderDashboard(stateKey) {
  const s = getStudent(stateKey);
  const task = getDayTask(s.track);

  // Top bar
  document.getElementById('tb-avatar').textContent = s.hasAvatar ? s.initials : '＋';
  document.getElementById('tb-avatar').classList.toggle('empty', !s.hasAvatar);
  document.getElementById('tb-name').textContent = s.name;
  document.getElementById('tb-greeting').textContent = greetingForNow();
  document.getElementById('tb-streak').innerHTML = `🔥 ${s.currentStreak}`;

  // Banners (edge cases)
  document.getElementById('shield-banner').style.display = s.lastStatus === 'shielded' ? 'block' : 'none';
  document.getElementById('new-banner').style.display = s.joinedToday ? 'block' : 'none';
  document.getElementById('empty-profile').style.display = s.completedDays.length === 0 ? 'block' : 'none';

  // Streak card
  document.getElementById('streak-num').textContent = s.currentStreak;
  const streakSub = document.getElementById('streak-sub');
  if (s.currentStreak === 0) {
    streakSub.textContent = 'No streak yet — submit today to start one.';
  } else if (s.lastStatus === 'shielded') {
    streakSub.textContent = 'Kept alive by your Streak Shield after a missed day.';
  } else {
    streakSub.textContent = `Longest streak: ${s.longestStreak} days`;
  }

  // Progress ring
  const pct = Math.round((s.completedDays.length / s.totalDays) * 100);
  const ring = document.getElementById('progress-ring');
  const circumference = 251.2;
  ring.style.strokeDashoffset = circumference - (circumference * pct / 100);
  document.getElementById('ring-num').textContent = pct + '%';

  document.getElementById('day-index').textContent = s.dayIndex;
  document.getElementById('days-left').textContent = (s.totalDays - s.dayIndex) + ' left';

  // Heatmap — show a window of days around today, sized for a mobile screen
  const windowStart = Math.max(1, s.dayIndex - 11);
  buildHeatmapWindow('dash-heatmap', windowStart, Math.min(s.totalDays, s.dayIndex + 2), s);

  // Today's task
  document.getElementById('task-title').textContent = task.title;
  document.getElementById('task-summary').textContent = task.summary;
  document.getElementById('task-est').textContent = `~${task.estMinutes} min · ${task.focus}`;

  // Badges
  const grid = document.getElementById('badges-grid');
  grid.innerHTML = '';
  let unlockedCount = 0;
  s.achievements.forEach(a => {
    if (a.unlocked) unlockedCount++;
    const el = document.createElement('div');
    el.className = 'card';
    el.style.padding = '14px';
    el.style.opacity = a.unlocked ? '1' : '0.5';
    el.innerHTML = `
      <div style="font-size:20px;">${ACHIEVEMENT_ICONS[a.id] || '🏅'}</div>
      <div style="font-weight:600; font-size:13px; margin-top:8px;">${a.label}</div>
      <div class="text-muted" style="font-size:11.5px; margin-top:3px; line-height:1.4;">${a.unlocked ? a.desc : 'Locked — ' + a.desc.toLowerCase()}</div>
    `;
    grid.appendChild(el);
  });
  document.getElementById('badge-count').textContent = `${unlockedCount} / ${s.achievements.length}`;

  // Switcher active state
  document.querySelectorAll('.demo-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.state === stateKey);
  });
}

function greetingForNow() {
  const h = new Date().getHours();
  if (h < 5) return 'Still up?';
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  if (h < 21) return 'Good evening';
  return 'Late night session';
}

document.addEventListener('DOMContentLoaded', () => {
  let current = 'missed'; // default state shown to evaluators — demonstrates the Streak Shield idea
  renderDashboard(current);

  document.querySelectorAll('.demo-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      current = chip.dataset.state;
      renderDashboard(current);
    });
  });
});
