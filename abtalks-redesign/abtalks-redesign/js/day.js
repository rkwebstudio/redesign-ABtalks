document.addEventListener('DOMContentLoaded', () => {
  // This day page represents "today" for a student mid-challenge —
  // consistent with the dashboard's default "missed" (Rohan, Data Science, day 12) state.
  const student = getStudent('missed');
  const task = getDayTask(student.track);

  document.getElementById('dy-streak').innerHTML = `🔥 ${student.currentStreak}`;
  document.getElementById('dy-track').textContent = student.track;
  document.getElementById('dy-time').textContent = `~${task.estMinutes} min`;
  document.getElementById('dy-title').textContent = task.title;
  document.getElementById('dy-summary').textContent = task.summary;

  const reqList = document.getElementById('dy-requirements');
  task.requirements.forEach(r => {
    const li = document.createElement('li');
    li.className = 'flex gap-3';
    li.style.alignItems = 'flex-start';
    li.innerHTML = `
      <span style="width:18px;height:18px;border-radius:5px;border:1.5px solid var(--border-strong);flex-shrink:0;margin-top:2px;"></span>
      <span class="text-sm text-secondary" style="line-height:1.5;">${r}</span>
    `;
    reqList.appendChild(li);
  });

  // Week heatmap centered on today
  buildHeatmapWindow('week-heatmap', 8, 14, student);

  // Submission demo — no real backend; validates and shows a confirmation state
  const form = document.getElementById('submit-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const gh = document.getElementById('gh-url').value.trim();
    const li = document.getElementById('li-url').value.trim();
    if (!gh || !li) return;

    document.getElementById('submit-form').style.display = 'none';
    document.getElementById('submit-success').style.display = 'block';
    document.getElementById('success-streak').textContent = student.currentStreak + 1;
    showToast('Day 12 submitted — streak updated 🔥');
  });
});
