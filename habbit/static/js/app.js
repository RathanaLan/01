/**
 * Main Application Logic for Habit Routine & Success Planner
 */
(function() {
  'use strict';

  /* =========================================================================
   * 0. HERO / MASTER SCHEDULE TOP SWITCHER (5-SECOND AUTO-TRANSITION)
   * ========================================================================= */
  const btnShowHero = document.getElementById('btnShowHero');
  const btnShowSchedule = document.getElementById('btnShowSchedule');
  const heroViewContainer = document.getElementById('heroViewContainer');
  const masterScheduleTopContainer = document.getElementById('masterScheduleTopContainer');
  const autoSwitchBanner = document.getElementById('autoSwitchBanner');
  const autoSwitchCountdown = document.getElementById('autoSwitchCountdown');
  const autoSwitchProgressFill = document.getElementById('autoSwitchProgressFill');
  const btnPauseAutoSwitch = document.getElementById('btnPauseAutoSwitch');
  const btnSkipAutoSwitch = document.getElementById('btnSkipAutoSwitch');
  const liveClockDisplay = document.getElementById('liveClockDisplay');
  const currentPhaseText = document.getElementById('currentPhaseText');

  let switchTimerInterval = null;
  const TOTAL_SWITCH_MS = 5000;

  function showScheduleView() {
    if (switchTimerInterval) {
      clearInterval(switchTimerInterval);
      switchTimerInterval = null;
    }
    if (heroViewContainer) heroViewContainer.style.display = 'none';
    if (masterScheduleTopContainer) masterScheduleTopContainer.style.display = 'block';
    if (btnShowSchedule) btnShowSchedule.classList.add('active');
    if (btnShowHero) btnShowHero.classList.remove('active');
    if (autoSwitchBanner) autoSwitchBanner.style.display = 'none';
    highlightCurrentHour();
    updateLiveClock();
  }

  function showHeroView() {
    if (switchTimerInterval) {
      clearInterval(switchTimerInterval);
      switchTimerInterval = null;
    }
    if (heroViewContainer) heroViewContainer.style.display = 'block';
    if (masterScheduleTopContainer) masterScheduleTopContainer.style.display = 'none';
    if (btnShowHero) btnShowHero.classList.add('active');
    if (btnShowSchedule) btnShowSchedule.classList.remove('active');
    if (autoSwitchBanner) autoSwitchBanner.style.display = 'none';
  }

  // 5-Second Countdown Timer on Page Load
  if (autoSwitchBanner && autoSwitchCountdown && autoSwitchProgressFill) {
    const startTime = Date.now();
    switchTimerInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, TOTAL_SWITCH_MS - elapsed);
      const secondsLeft = Math.ceil(remaining / 1000);

      autoSwitchCountdown.textContent = secondsLeft + 's';
      const pct = Math.min(100, (elapsed / TOTAL_SWITCH_MS) * 100);
      autoSwitchProgressFill.style.width = pct + '%';

      if (remaining <= 0) {
        clearInterval(switchTimerInterval);
        switchTimerInterval = null;
        showScheduleView();
      }
    }, 50);
  }

  if (btnShowHero) btnShowHero.addEventListener('click', showHeroView);
  if (btnShowSchedule) btnShowSchedule.addEventListener('click', showScheduleView);
  if (btnSkipAutoSwitch) btnSkipAutoSwitch.addEventListener('click', showScheduleView);
  if (btnPauseAutoSwitch) {
    btnPauseAutoSwitch.addEventListener('click', () => {
      if (switchTimerInterval) {
        clearInterval(switchTimerInterval);
        switchTimerInterval = null;
      }
      if (autoSwitchBanner) autoSwitchBanner.style.display = 'none';
    });
  }

  // Live Clock & Current Phase Detection
  function updateLiveClock() {
    if (liveClockDisplay) {
      const now = new Date();
      liveClockDisplay.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
    if (currentPhaseText) {
      const activeRow = document.querySelector('.schedule-table tr.is-active-hour');
      if (activeRow) {
        const titleEl = activeRow.querySelector('.action-cell-title');
        currentPhaseText.textContent = titleEl ? titleEl.textContent.trim() : 'Active Routine';
      } else {
        currentPhaseText.textContent = 'Day Planning / Transition';
      }
    }
  }

  setInterval(updateLiveClock, 1000);
  updateLiveClock();

  /* =========================================================================
   * 1. THEME TOGGLE (DARK / LIGHT MODE)
   * ========================================================================= */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('habit_theme') || (prefersDark ? 'dark' : 'light');

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('habit_theme', nextTheme);
      updateThemeIcon(nextTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    themeToggleBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    themeToggleBtn.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  }

  /* =========================================================================
   * 2. SCHEDULE HOUR-BY-HOUR FILTERING
   * ========================================================================= */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const scheduleRows = document.querySelectorAll('.schedule-table tbody tr');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      scheduleRows.forEach(row => {
        if (filter === 'all' || row.dataset.phase === filter) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  /* =========================================================================
   * 3. HIGHLIGHT CURRENT HOUR
   * ========================================================================= */
  function highlightCurrentHour() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();
    const currentTimeVal = currentHour * 60 + currentMin; // minutes since midnight

    scheduleRows.forEach(row => {
      const startMinutes = parseInt(row.dataset.startMin, 10);
      const endMinutes = parseInt(row.dataset.endMin, 10);

      if (!isNaN(startMinutes) && !isNaN(endMinutes)) {
        if (currentTimeVal >= startMinutes && currentTimeVal < endMinutes) {
          row.classList.add('is-active-hour');
          // Add a subtle badge if not already present
          const actionCell = row.querySelector('.action-cell-title');
          if (actionCell && !actionCell.querySelector('.current-now-pill')) {
            const pill = document.createElement('span');
            pill.className = 'current-now-pill';
            pill.textContent = 'CURRENT';
            pill.style.cssText = 'background: #6366f1; color: #fff; font-size: 0.65rem; padding: 2px 6px; border-radius: 9999px; margin-left: 8px; vertical-align: middle; font-weight: 700;';
            actionCell.appendChild(pill);
          }
        } else {
          row.classList.remove('is-active-hour');
          const pill = row.querySelector('.current-now-pill');
          if (pill) pill.remove();
        }
      }
    });
  }

  highlightCurrentHour();
  setInterval(highlightCurrentHour, 60000); // Check every minute

  /* =========================================================================
   * 4. DAILY HABITS CHECKLIST & PROGRESS
   * ========================================================================= */
  const habitItems = document.querySelectorAll('.habit-item');
  const habitProgressFill = document.getElementById('habitProgressFill');
  const habitProgressText = document.getElementById('habitProgressText');
  const resetHabitsBtn = document.getElementById('resetHabitsBtn');
  const STORAGE_KEY = 'daily_habits_' + new Date().toISOString().slice(0, 10); // auto-resets each calendar day

  function loadHabits() {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    habitItems.forEach((item, index) => {
      const isDone = !!saved[index];
      item.classList.toggle('is-completed', isDone);
      const checkbox = item.querySelector('.custom-checkbox');
      if (checkbox) {
        checkbox.innerHTML = isDone ? '✓' : '';
      }
    });
    updateHabitProgress();
  }

  function saveHabits() {
    const state = {};
    habitItems.forEach((item, index) => {
      state[index] = item.classList.contains('is-completed');
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateHabitProgress();
  }

  function updateHabitProgress() {
    const total = habitItems.length;
    const completed = document.querySelectorAll('.habit-item.is-completed').length;
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

    if (habitProgressFill) {
      habitProgressFill.style.width = pct + '%';
    }
    if (habitProgressText) {
      habitProgressText.textContent = `${completed} / ${total} Completed (${pct}%)`;
    }
  }

  habitItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      item.classList.toggle('is-completed');
      const checkbox = item.querySelector('.custom-checkbox');
      const isDone = item.classList.contains('is-completed');
      if (checkbox) {
        checkbox.innerHTML = isDone ? '✓' : '';
      }
      saveHabits();
    });
  });

  if (resetHabitsBtn) {
    resetHabitsBtn.addEventListener('click', () => {
      if (confirm('Reset all habit checkboxes for today?')) {
        habitItems.forEach(item => {
          item.classList.remove('is-completed');
          const cb = item.querySelector('.custom-checkbox');
          if (cb) cb.innerHTML = '';
        });
        saveHabits();
      }
    });
  }

  loadHabits();

  /* =========================================================================
   * 5. PRINT SHORTCUT & BUTTON
   * ========================================================================= */
  const printBtn = document.getElementById('printScheduleBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

})();
