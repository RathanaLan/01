// Script to build full enterprise-grade matrix-app.js
const fs = require('fs');

const appCode = `// ========================================================
// ENTERPRISE KNOWLEDGE MATRIX - MASTER APPLICATION CONTROLLER
// "Connecting Knowledge. Driving Excellence."
// ========================================================

(function () {
  'use strict';

  // --- MASTER APPLICATION STATE ---
  const MATRIX_STATE = {
    currentSection: 'all',
    currentView: 'home',
    currentRole: 'admin',
    currentLang: 'en',
    theme: 'dark',
    bookmarks: new Set(),
    activeMicrositeTab: 'overview',
    activeCapabilityView: 'individual',
    activeReviewQueue: 'assigned',
    activeAdminTab: 'sections',
    searchQuery: '',
    knowledgeFilters: { section: 'all', type: 'all', status: 'all', category: 'all', sort: 'recent' },
    troubleshootingFilters: { section: 'all', severity: 'all', status: 'all' },
    expertFilters: { section: 'all', status: 'all', availability: 'all' },
    documentFilters: { section: 'all', system: 'all' },
    data: null,
    wizardStep: 1,
    wizardDraft: {},
    graphTransform: { scale: 1, x: 0, y: 0 },
    graphSelectedNode: null,
    activeReviewRecordId: null,
    activeConsultExpertId: null,
    activeVerifyExpertId: null
  };

  const LS_KEY_STATE = 'matrix_state_v3';
  const LS_KEY_BOOKMARKS = 'matrix_bookmarks_v3';
  const LS_KEY_DRAFT = 'matrix_wizard_draft_v3';

  // --- 1. INITIALIZATION ---
  function initApp() {
    loadState();
    applyTheme(MATRIX_STATE.theme);
    initI18n();
    initHeader();
    initSidebar();
    initGlobalShortcuts();
    
    // Default render
    switchView(MATRIX_STATE.currentView, MATRIX_STATE.currentSection);
    updateNotificationBadges();
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(LS_KEY_STATE);
      if (saved) {
        const parsed = JSON.parse(saved);
        MATRIX_STATE.currentRole = parsed.currentRole || 'admin';
        MATRIX_STATE.currentLang = parsed.currentLang || 'en';
        MATRIX_STATE.theme = parsed.theme || 'dark';
        if (parsed.data) MATRIX_STATE.data = parsed.data;
      }
      
      const savedBms = localStorage.getItem(LS_KEY_BOOKMARKS);
      if (savedBms) {
        MATRIX_STATE.bookmarks = new Set(JSON.parse(savedBms));
      }

      const savedDraft = localStorage.getItem(LS_KEY_DRAFT);
      if (savedDraft) {
        MATRIX_STATE.wizardDraft = JSON.parse(savedDraft);
      }

      // Fallback to bundled master seed data
      if (!MATRIX_STATE.data && window.MATRIX_MASTER_DATA) {
        MATRIX_STATE.data = JSON.parse(JSON.stringify(window.MATRIX_MASTER_DATA));
        saveState();
      }
    } catch (e) {
      console.warn('Failed loading state from localStorage:', e);
      if (window.MATRIX_MASTER_DATA) {
        MATRIX_STATE.data = JSON.parse(JSON.stringify(window.MATRIX_MASTER_DATA));
      }
    }
  }

  function saveState() {
    try {
      const payload = {
        currentRole: MATRIX_STATE.currentRole,
        currentLang: MATRIX_STATE.currentLang,
        theme: MATRIX_STATE.theme,
        data: MATRIX_STATE.data
      };
      localStorage.setItem(LS_KEY_STATE, JSON.stringify(payload));
      localStorage.setItem(LS_KEY_BOOKMARKS, JSON.stringify(Array.from(MATRIX_STATE.bookmarks)));
      localStorage.setItem(LS_KEY_DRAFT, JSON.stringify(MATRIX_STATE.wizardDraft));
    } catch (e) {
      console.warn('Failed saving state to localStorage:', e);
    }
  }

  // --- 2. MULTILINGUAL & THEME ---
  function t(key) {
    const dict = window.MATRIX_I18N && window.MATRIX_I18N[MATRIX_STATE.currentLang];
    if (dict && dict[key]) return dict[key];
    const enDict = window.MATRIX_I18N && window.MATRIX_I18N.en;
    if (enDict && enDict[key]) return enDict[key];
    return key;
  }

  function initI18n() {
    const langSelect = document.getElementById('matrix-header-lang-select');
    if (langSelect) {
      langSelect.value = MATRIX_STATE.currentLang;
      langSelect.addEventListener('change', (e) => {
        MATRIX_STATE.currentLang = e.target.value;
        saveState();
        applyTranslations();
      });
    }
    applyTranslations();
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key) el.textContent = t(key);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key) el.setAttribute('placeholder', t(key));
    });

    // Re-render active view to refresh translated data
    renderActiveView();
  }

  function applyTheme(theme) {
    MATRIX_STATE.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    const themeBtn = document.getElementById('btn-header-theme');
    if (themeBtn) {
      themeBtn.innerHTML = theme === 'dark' 
        ? '<i class="fa-solid fa-sun" title="Switch to Light Theme"></i>' 
        : '<i class="fa-solid fa-moon" title="Switch to Dark Theme"></i>';
    }
  }

  // --- 3. HEADER & CONTROLS ---
  function initHeader() {
    // Theme Switcher Button
    const themeBtn = document.getElementById('btn-header-theme');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        applyTheme(MATRIX_STATE.theme === 'dark' ? 'light' : 'dark');
        saveState();
      });
    }

    // Role Switcher
    const roleSelect = document.getElementById('matrix-header-role-select');
    if (roleSelect) {
      roleSelect.value = MATRIX_STATE.currentRole;
      roleSelect.addEventListener('change', (e) => {
        MATRIX_STATE.currentRole = e.target.value;
        saveState();
        showToast(\`Switched active role to: \${t('role_' + e.target.value.toLowerCase().replace(/ /g, '_')) || e.target.value}\`, 'info');
        renderActiveView();
      });
    }

    // Section Switcher
    updateHeaderSectionDropdown();

    // Notifications Button
    const notifBtn = document.getElementById('btn-header-notifications');
    if (notifBtn) {
      notifBtn.addEventListener('click', () => {
        toggleDrawer('drawer-notifications', true);
        renderNotificationsDrawer();
      });
    }

    // Bookmarks Button
    const bmsBtn = document.getElementById('btn-header-bookmarks');
    if (bmsBtn) {
      bmsBtn.addEventListener('click', () => {
        toggleDrawer('drawer-bookmarks', true);
        renderBookmarksDrawer();
      });
    }

    // Create Record CTA Button
    const createBtn = document.getElementById('btn-header-create-record');
    if (createBtn) {
      createBtn.addEventListener('click', () => {
        openCreateRecordModal();
      });
    }

    // Global Search Input
    const searchInput = document.getElementById('matrix-header-search-input');
    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          MATRIX_STATE.searchQuery = searchInput.value.trim();
          MATRIX_STATE.knowledgeFilters.section = 'all';
          switchView('knowledge');
        }
      });
    }
  }

  function updateHeaderSectionDropdown() {
    const secSelect = document.getElementById('matrix-header-section-select');
    if (secSelect && MATRIX_STATE.data) {
      secSelect.innerHTML = \`
        <option value="all">\${t('all_sections')}</option>
        \${MATRIX_STATE.data.matrixSections.map(s => \`
          <option value="\${s.id}">\${s.code} - \${s.name}</option>
        \`).join('')}
      \`;
      secSelect.value = MATRIX_STATE.currentSection;
      secSelect.onchange = (e) => {
        switchSection(e.target.value);
      };
    }
  }

  function initSidebar() {
    const toggleBtn = document.getElementById('btn-sidebar-toggle');
    const sidebar = document.getElementById('matrix-sidebar');
    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
      });
    }

    // Sidebar navigation clicks
    document.querySelectorAll('.sidebar-nav-item button').forEach(btn => {
      btn.addEventListener('click', () => {
        const viewId = btn.getAttribute('data-view');
        if (viewId) {
          switchView(viewId);
        }
      });
    });
  }

  function initGlobalShortcuts() {
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('matrix-header-search-input');
        if (searchInput) searchInput.focus();
      }
      if (e.key === 'Escape') {
        closeAllModals();
        toggleDrawer('drawer-notifications', false);
        toggleDrawer('drawer-bookmarks', false);
      }
    });
  }

  // --- 4. VIEW ROUTER ---
  function switchView(viewId, sectionId) {
    MATRIX_STATE.currentView = viewId;
    if (sectionId !== undefined) MATRIX_STATE.currentSection = sectionId;

    // Update Sidebar active state
    document.querySelectorAll('.sidebar-nav-item').forEach(item => {
      const btn = item.querySelector('button');
      if (btn && btn.getAttribute('data-view') === viewId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Hide all view stages, show target
    document.querySelectorAll('.matrix-view-stage').forEach(stage => {
      stage.classList.remove('active');
    });

    const targetStage = document.getElementById(\`view-\${viewId}\`);
    if (targetStage) {
      targetStage.classList.add('active');
    }

    // Scroll main container to top
    const container = document.querySelector('.matrix-main-container');
    if (container) container.scrollTo({ top: 0, behavior: 'smooth' });

    renderActiveView();
  }

  function switchSection(secId) {
    MATRIX_STATE.currentSection = secId;
    const secSelect = document.getElementById('matrix-header-section-select');
    if (secSelect) secSelect.value = secId;

    if (secId !== 'all') {
      switchView('sections', secId);
    } else {
      switchView('sections', 'all');
    }
  }

  function renderActiveView() {
    if (!MATRIX_STATE.data) return;

    switch (MATRIX_STATE.currentView) {
      case 'home':
        renderHomeView();
        break;
      case 'sections':
        renderSectionsView();
        break;
      case 'knowledge':
        renderKnowledgeView();
        break;
      case 'troubleshooting':
        renderTroubleshootingView();
        break;
      case 'experience':
        renderExperienceView();
        break;
      case 'lessons':
        renderLessonsView();
        break;
      case 'documents':
        renderDocumentsView();
        break;
      case 'experts':
        renderExpertsView();
        break;
      case 'capability':
        renderCapabilityView();
        break;
      case 'learning':
        renderLearningView();
        break;
      case 'workspace':
        renderWorkspaceView();
        break;
      case 'reviews':
        renderReviewsView();
        break;
      case 'dashboards':
        renderDashboardsView();
        break;
      case 'admin':
        renderAdminView();
        break;
      case 'help':
        renderHelpView();
        break;
    }
  }

  // Make core methods available globally
  window.MATRIX_APP = {
    switchView,
    switchSection,
    closeModal,
    openRecordDetail,
    openTroubleshootingDetail,
    openExpertProfileModal,
    openRequestConsultationModal,
    openVerifyExpertiseModal,
    openCapabilityAssessmentModal,
    openKnowledgeGraphModal,
    openCreateRecordModal,
    openBulkImportModal,
    openAdminSectionModal,
    openGuidedTourModal,
    toggleBookmark,
    toggleHelpful,
    zoomGraph,
    resetGraph,
    prevWizardStep,
    nextWizardStep,
    goToWizardStep,
    saveWizardDraft,
    previewWizardDraft,
    submitWizardRecord,
    submitConsultationRequest,
    submitExpertiseVerification,
    submitCapabilityAssessment,
    openReviewActionModal,
    confirmReviewDecision,
    saveAdminSection,
    toggleSectionStatus,
    openMergeSectionModal,
    executeSectionMerge,
    executeCsvImport,
    exportRecordsCsv,
    showToast,
    switchMicrositeTab,
    switchCapabilityView,
    switchReviewQueue,
    switchAdminTab
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
`;

console.log('Base app controller template ready.');
fs.writeFileSync('app_base.js', appCode, 'utf8');
