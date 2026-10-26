/**
 * Weekly Plan & Budget Calculator Script
 */
(function() {
  'use strict';

  /* =========================================================================
   * 1. THEME INITIALIZATION & SYNC
   * ========================================================================= */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('habit_theme') || 'dark';
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
   * 2. WEEKLY GOALS CHECKLIST WITH LOCALSTORAGE
   * ========================================================================= */
  const goalItems = document.querySelectorAll('.weekly-goal-item');
  const goalProgressFill = document.getElementById('weeklyGoalProgressFill');
  const goalProgressText = document.getElementById('weeklyGoalProgressText');
  const WEEKLY_STORAGE_KEY = 'weekly_goals_v1';

  function loadWeeklyGoals() {
    const saved = JSON.parse(localStorage.getItem(WEEKLY_STORAGE_KEY) || '{}');
    goalItems.forEach((item, index) => {
      const isDone = !!saved[index];
      item.classList.toggle('is-completed', isDone);
      const cb = item.querySelector('.custom-checkbox');
      if (cb) cb.innerHTML = isDone ? '✓' : '';
    });
    updateWeeklyGoalProgress();
  }

  function saveWeeklyGoals() {
    const state = {};
    goalItems.forEach((item, index) => {
      state[index] = item.classList.contains('is-completed');
    });
    localStorage.setItem(WEEKLY_STORAGE_KEY, JSON.stringify(state));
    updateWeeklyGoalProgress();
  }

  function updateWeeklyGoalProgress() {
    const total = goalItems.length;
    const completed = document.querySelectorAll('.weekly-goal-item.is-completed').length;
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

    if (goalProgressFill) {
      goalProgressFill.style.width = pct + '%';
    }
    if (goalProgressText) {
      goalProgressText.textContent = `${completed} / ${total} Targets Reached (${pct}%)`;
    }
  }

  goalItems.forEach((item) => {
    item.addEventListener('click', () => {
      item.classList.toggle('is-completed');
      const cb = item.querySelector('.custom-checkbox');
      const isDone = item.classList.contains('is-completed');
      if (cb) cb.innerHTML = isDone ? '✓' : '';
      saveWeeklyGoals();
    });
  });

  const resetGoalsBtn = document.getElementById('resetWeeklyGoalsBtn');
  if (resetGoalsBtn) {
    resetGoalsBtn.addEventListener('click', () => {
      if (confirm('Reset your weekly targets checklist?')) {
        goalItems.forEach(item => {
          item.classList.remove('is-completed');
          const cb = item.querySelector('.custom-checkbox');
          if (cb) cb.innerHTML = '';
        });
        saveWeeklyGoals();
      }
    });
  }

  loadWeeklyGoals();

  /* =========================================================================
   * 3. INTERACTIVE BUDGET CALCULATOR
   * ========================================================================= */
  const incomeInput = document.getElementById('calcIncomeInput');
  const currencySelect = document.getElementById('calcCurrencySelect');
  const budgetPresetBtns = document.querySelectorAll('.budget-preset-btn');
  
  // Output elements
  const valFood = document.getElementById('valFood');
  const valLearning = document.getElementById('valLearning');
  const valLeisure = document.getElementById('valLeisure');
  const valSavings = document.getElementById('valSavings');
  
  const pctFood = document.getElementById('pctFood');
  const pctLearning = document.getElementById('pctLearning');
  const pctLeisure = document.getElementById('pctLeisure');
  const pctSavings = document.getElementById('pctSavings');

  // Allocation ratios: { food, learning, leisure, savings } in percentage
  const PRESETS = {
    standard: { food: 22, learning: 6, leisure: 12, savings: 60 },
    balanced: { food: 25, learning: 8, leisure: 17, savings: 50 },
    growth:   { food: 20, learning: 15, leisure: 10, savings: 55 }
  };

  let activePreset = 'standard';

  function formatCurrency(amount, symbol) {
    return `${symbol}${Math.round(amount).toLocaleString()}`;
  }

  function calculateBudget() {
    const income = parseFloat(incomeInput.value) || 650;
    const symbol = currencySelect.value || '$';
    const preset = PRESETS[activePreset] || PRESETS.standard;

    const amtFood = (income * preset.food) / 100;
    const amtLearning = (income * preset.learning) / 100;
    const amtLeisure = (income * preset.leisure) / 100;
    const amtSavings = (income * preset.savings) / 100;

    if (valFood) valFood.textContent = formatCurrency(amtFood, symbol);
    if (valLearning) valLearning.textContent = formatCurrency(amtLearning, symbol);
    if (valLeisure) valLeisure.textContent = formatCurrency(amtLeisure, symbol);
    if (valSavings) valSavings.textContent = formatCurrency(amtSavings, symbol);

    if (pctFood) pctFood.textContent = `${preset.food}% of budget`;
    if (pctLearning) pctLearning.textContent = `${preset.learning}% of budget`;
    if (pctLeisure) pctLeisure.textContent = `${preset.leisure}% of budget`;
    if (pctSavings) pctSavings.textContent = `${preset.savings}% of budget`;

    // Save preferences
    localStorage.setItem('budget_income', income);
    localStorage.setItem('budget_curr', symbol);
    localStorage.setItem('budget_preset', activePreset);
  }

  if (incomeInput) {
    const savedIncome = localStorage.getItem('budget_income');
    if (savedIncome) incomeInput.value = savedIncome;
    incomeInput.addEventListener('input', calculateBudget);
  }

  if (currencySelect) {
    const savedCurr = localStorage.getItem('budget_curr');
    if (savedCurr) currencySelect.value = savedCurr;
    currencySelect.addEventListener('change', calculateBudget);
  }

  budgetPresetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      budgetPresetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activePreset = btn.dataset.preset;
      calculateBudget();
    });
  });

  const savedPreset = localStorage.getItem('budget_preset');
  if (savedPreset && PRESETS[savedPreset]) {
    activePreset = savedPreset;
    budgetPresetBtns.forEach(b => b.classList.toggle('active', b.dataset.preset === savedPreset));
  }

  calculateBudget();

  /* =========================================================================
   * 4. PRINT HELPER
   * ========================================================================= */
  const printWeeklyBtn = document.getElementById('printWeeklyBtn');
  if (printWeeklyBtn) {
    printWeeklyBtn.addEventListener('click', () => {
      window.print();
    });
  }

})();
