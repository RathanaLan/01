// Generator for complete enterprise dnkh-app.js
const fs = require('fs');

// We will construct dnkh-app.js with all functions, renderers, modals, graph engine, and workflows
const code = `// ========================================================
// DNKH DNA MATRIX - MASTER APPLICATION CONTROLLER
// "Connecting Knowledge. Driving Excellence."
// ========================================================

(function () {
  'use strict';

  // --- MASTER APPLICATION STATE ---
  const DNKH_STATE = {
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
    knowledgeFilters: { section: 'all', type: 'all', status: 'all', category: 'all', sort: 'recent', viewMode: 'grid' },
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
    activeVerifyExpertId: null,
    editingSectionId: null,
    csvParsedData: null
  };

  const LS_KEY_STATE = 'dnkh_matrix_state_v3';
  const LS_KEY_BOOKMARKS = 'dnkh_matrix_bookmarks_v3';
  const LS_KEY_DRAFT = 'dnkh_matrix_wizard_draft_v3';

  // --- 1. INITIALIZATION ---
  function initApp() {
    loadState();
    applyTheme(DNKH_STATE.theme);
    initI18n();
    initHeader();
    initSidebar();
    initGlobalShortcuts();
    
    // Default render
    switchView(DNKH_STATE.currentView, DNKH_STATE.currentSection);
    updateNotificationBadges();
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(LS_KEY_STATE);
      if (saved) {
        const parsed = JSON.parse(saved);
        DNKH_STATE.currentRole = parsed.currentRole || 'admin';
        DNKH_STATE.currentLang = parsed.currentLang || 'en';
        DNKH_STATE.theme = parsed.theme || 'dark';
        if (parsed.data) DNKH_STATE.data = parsed.data;
      }
      
      const savedBms = localStorage.getItem(LS_KEY_BOOKMARKS);
      if (savedBms) {
        DNKH_STATE.bookmarks = new Set(JSON.parse(savedBms));
      }

      const savedDraft = localStorage.getItem(LS_KEY_DRAFT);
      if (savedDraft) {
        DNKH_STATE.wizardDraft = JSON.parse(savedDraft);
      }

      // Fallback to bundled master seed data
      if (!DNKH_STATE.data && window.DNKH_MASTER_DATA) {
        DNKH_STATE.data = JSON.parse(JSON.stringify(window.DNKH_MASTER_DATA));
        saveState();
      }
    } catch (e) {
      console.warn('Failed loading state from localStorage:', e);
      if (window.DNKH_MASTER_DATA) {
        DNKH_STATE.data = JSON.parse(JSON.stringify(window.DNKH_MASTER_DATA));
      }
    }
  }

  function saveState() {
    try {
      const payload = {
        currentRole: DNKH_STATE.currentRole,
        currentLang: DNKH_STATE.currentLang,
        theme: DNKH_STATE.theme,
        data: DNKH_STATE.data
      };
      localStorage.setItem(LS_KEY_STATE, JSON.stringify(payload));
      localStorage.setItem(LS_KEY_BOOKMARKS, JSON.stringify(Array.from(DNKH_STATE.bookmarks)));
      localStorage.setItem(LS_KEY_DRAFT, JSON.stringify(DNKH_STATE.wizardDraft));
    } catch (e) {
      console.warn('Failed saving state to localStorage:', e);
    }
  }

  // --- 2. MULTILINGUAL & THEME ---
  function t(key) {
    const dict = window.DNKH_I18N && window.DNKH_I18N[DNKH_STATE.currentLang];
    if (dict && dict[key]) return dict[key];
    const enDict = window.DNKH_I18N && window.DNKH_I18N.en;
    if (enDict && enDict[key]) return enDict[key];
    return key;
  }

  function initI18n() {
    const langSelect = document.getElementById('dnkh-header-lang-select');
    if (langSelect) {
      langSelect.value = DNKH_STATE.currentLang;
      langSelect.addEventListener('change', (e) => {
        DNKH_STATE.currentLang = e.target.value;
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

    renderActiveView();
  }

  function applyTheme(theme) {
    DNKH_STATE.theme = theme;
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
    const themeBtn = document.getElementById('btn-header-theme');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        applyTheme(DNKH_STATE.theme === 'dark' ? 'light' : 'dark');
        saveState();
      });
    }

    const roleSelect = document.getElementById('dnkh-header-role-select');
    if (roleSelect) {
      roleSelect.value = DNKH_STATE.currentRole;
      roleSelect.addEventListener('change', (e) => {
        DNKH_STATE.currentRole = e.target.value;
        saveState();
        showToast(\`Switched active role to: \${t('role_' + e.target.value.toLowerCase().replace(/ /g, '_')) || e.target.value}\`, 'info');
        renderActiveView();
      });
    }

    updateHeaderSectionDropdown();

    const notifBtn = document.getElementById('btn-header-notifications');
    if (notifBtn) {
      notifBtn.addEventListener('click', () => {
        toggleDrawer('drawer-notifications', true);
        renderNotificationsDrawer();
      });
    }

    const bmsBtn = document.getElementById('btn-header-bookmarks');
    if (bmsBtn) {
      bmsBtn.addEventListener('click', () => {
        toggleDrawer('drawer-bookmarks', true);
        renderBookmarksDrawer();
      });
    }

    const createBtn = document.getElementById('btn-header-create-record');
    if (createBtn) {
      createBtn.addEventListener('click', () => {
        openCreateRecordModal();
      });
    }

    const searchInput = document.getElementById('dnkh-header-search-input');
    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          DNKH_STATE.searchQuery = searchInput.value.trim();
          DNKH_STATE.knowledgeFilters.section = 'all';
          switchView('knowledge');
        }
      });
    }
  }

  function updateHeaderSectionDropdown() {
    const secSelect = document.getElementById('dnkh-header-section-select');
    if (secSelect && DNKH_STATE.data) {
      secSelect.innerHTML = \`
        <option value="all">\${t('all_sections')}</option>
        \${DNKH_STATE.data.dnkhSections.map(s => \`
          <option value="\${s.id}" \${!s.isActive ? 'disabled' : ''}>\${s.code} - \${s.name} \${!s.isActive ? '(Deactivated)' : ''}</option>
        \`).join('')}
      \`;
      secSelect.value = DNKH_STATE.currentSection;
      secSelect.onchange = (e) => {
        switchSection(e.target.value);
      };
    }
  }

  function initSidebar() {
    const toggleBtn = document.getElementById('btn-sidebar-toggle');
    const sidebar = document.getElementById('dnkh-sidebar');
    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
      });
    }

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
        const searchInput = document.getElementById('dnkh-header-search-input');
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
    DNKH_STATE.currentView = viewId;
    if (sectionId !== undefined) DNKH_STATE.currentSection = sectionId;

    document.querySelectorAll('.sidebar-nav-item').forEach(item => {
      const btn = item.querySelector('button');
      if (btn && btn.getAttribute('data-view') === viewId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    document.querySelectorAll('.dnkh-view-stage').forEach(stage => {
      stage.classList.remove('active');
    });

    const targetStage = document.getElementById(\`view-\${viewId}\`);
    if (targetStage) {
      targetStage.classList.add('active');
    }

    const container = document.querySelector('.dnkh-main-container');
    if (container) container.scrollTo({ top: 0, behavior: 'smooth' });

    renderActiveView();
  }

  function switchSection(secId) {
    DNKH_STATE.currentSection = secId;
    const secSelect = document.getElementById('dnkh-header-section-select');
    if (secSelect) secSelect.value = secId;

    if (secId !== 'all') {
      switchView('sections', secId);
    } else {
      switchView('sections', 'all');
    }
  }

  function renderActiveView() {
    if (!DNKH_STATE.data) return;

    switch (DNKH_STATE.currentView) {
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

  // --- 5. HOME VIEW ---
  function renderHomeView() {
    const stage = document.getElementById('view-home');
    if (!stage || !DNKH_STATE.data) return;

    const data = DNKH_STATE.data;
    const totalRecords = data.dnkhRecords.length;
    const publishedRecords = data.dnkhRecords.filter(r => r.status === 'Published').length;
    const activeCases = data.dnkhTroubleshootingCases.length;
    const totalExperts = data.dnkhExperts.length;
    const activeSections = data.dnkhSections.filter(s => s.isActive !== false);

    stage.innerHTML = \`
      <!-- Hero Banner -->
      <div class="dnkh-hero-banner">
        <div class="hero-left">
          <div class="hero-brand-tag">
            <i class="fa-solid fa-dna text-red"></i>
            <span>DNKH CENTRAL KNOWLEDGE OPERATING SYSTEM</span>
          </div>
          <h1>Connecting Knowledge.<br><span class="text-gradient-red">Driving Excellence.</span></h1>
          <p class="hero-desc">
            Discover validated manufacturing knowledge, reusable engineering experience, proven 8D solutions, lessons learned, controlled standards, and evidence-based expertise across all DNKH sections.
          </p>
          <div class="hero-actions">
            <button type="button" class="btn-hero-primary" onclick="window.DNKH_APP.switchView('knowledge')">
              <i class="fa-solid fa-book-open"></i> \${t('btn_explore')}
            </button>
            <button type="button" class="btn-hero-secondary" onclick="window.DNKH_APP.switchView('experts')">
              <i class="fa-solid fa-user-tie"></i> \${t('nav_experts')}
            </button>
            <button type="button" class="btn-hero-secondary" onclick="window.DNKH_APP.openCreateRecordModal()">
              <i class="fa-solid fa-circle-plus"></i> \${t('btn_create_record')}
            </button>
            <button type="button" class="btn-hero-secondary" onclick="window.DNKH_APP.switchView('sections', 'all')">
              <i class="fa-solid fa-building-user"></i> \${t('nav_all_sections')}
            </button>
          </div>
        </div>

        <!-- Quick Operational Metrics (No rankings) -->
        <div class="hero-right">
          <div class="hero-metrics-grid">
            <div class="hero-metric-card" onclick="window.DNKH_APP.switchView('knowledge')">
              <div class="metric-icon" style="background: rgba(230,0,18,0.15); color: var(--dn-red);"><i class="fa-solid fa-book-bookmark"></i></div>
              <div class="metric-val">\${publishedRecords}</div>
              <div class="metric-lbl">\${t('published_records')}</div>
            </div>
            <div class="hero-metric-card" onclick="window.DNKH_APP.switchView('troubleshooting')">
              <div class="metric-icon" style="background: rgba(6,182,212,0.15); color: var(--dn-cyan);"><i class="fa-solid fa-wrench"></i></div>
              <div class="metric-val">\${activeCases}</div>
              <div class="metric-lbl">Verified 8D Cases</div>
            </div>
            <div class="hero-metric-card" onclick="window.DNKH_APP.switchView('experts')">
              <div class="metric-icon" style="background: rgba(16,185,129,0.15); color: var(--dn-green);"><i class="fa-solid fa-user-check"></i></div>
              <div class="metric-val">\${totalExperts}</div>
              <div class="metric-lbl">Verified SMEs</div>
            </div>
            <div class="hero-metric-card" onclick="window.DNKH_APP.switchView('sections', 'all')">
              <div class="metric-icon" style="background: rgba(139,92,246,0.15); color: var(--dn-purple);"><i class="fa-solid fa-sitemap"></i></div>
              <div class="metric-val">\${activeSections.length}</div>
              <div class="metric-lbl">DNKH Sections</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Core Modules Grid -->
      <div class="dnkh-section-heading">
        <div>
          <h2><i class="fa-solid fa-layer-group text-cyan"></i> DNKH Knowledge Operating System Modules</h2>
          <p>Ten unified dimensions connecting associate capability, shopfloor problem solving, and standard work</p>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 0.85rem; margin-bottom: 2rem;">
        <div class="section-card" onclick="window.DNKH_APP.switchView('knowledge')" style="cursor: pointer;">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
            <div class="section-icon-badge" style="background: rgba(230,0,18,0.15); color: var(--dn-red);"><i class="fa-solid fa-book-open"></i></div>
            <strong>Knowledge Library</strong>
          </div>
          <p style="font-size: 0.78rem; color: var(--dn-text-secondary); margin: 0;">Validated engineering procedures and standard work</p>
        </div>
        <div class="section-card" onclick="window.DNKH_APP.switchView('troubleshooting')" style="cursor: pointer;">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
            <div class="section-icon-badge" style="background: rgba(6,182,212,0.15); color: var(--dn-cyan);"><i class="fa-solid fa-wrench"></i></div>
            <strong>Troubleshooting (8D)</strong>
          </div>
          <p style="font-size: 0.78rem; color: var(--dn-text-secondary); margin: 0;">5-Why, Fishbone, containment & Yokoten replication</p>
        </div>
        <div class="section-card" onclick="window.DNKH_APP.switchView('experience')" style="cursor: pointer;">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
            <div class="section-icon-badge" style="background: rgba(16,185,129,0.15); color: var(--dn-green);"><i class="fa-solid fa-briefcase"></i></div>
            <strong>Experience & Projects</strong>
          </div>
          <p style="font-size: 0.78rem; color: var(--dn-text-secondary); margin: 0;">Real Genba operational solutions and decisions</p>
        </div>
        <div class="section-card" onclick="window.DNKH_APP.switchView('lessons')" style="cursor: pointer;">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
            <div class="section-icon-badge" style="background: rgba(245,158,11,0.15); color: var(--dn-amber);"><i class="fa-solid fa-lightbulb"></i></div>
            <strong>Lessons Learned</strong>
          </div>
          <p style="font-size: 0.78rem; color: var(--dn-text-secondary); margin: 0;">What worked, what failed, and recurrence prevention</p>
        </div>
        <div class="section-card" onclick="window.DNKH_APP.switchView('documents')" style="cursor: pointer;">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
            <div class="section-icon-badge" style="background: rgba(139,92,246,0.15); color: var(--dn-purple);"><i class="fa-solid fa-file-shield"></i></div>
            <strong>Standards & Manuals</strong>
          </div>
          <p style="font-size: 0.78rem; color: var(--dn-text-secondary); margin: 0;">Controlled links: e-SMART, MMS, DIS, DocSavvy</p>
        </div>
        <div class="section-card" onclick="window.DNKH_APP.switchView('experts')" style="cursor: pointer;">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
            <div class="section-icon-badge" style="background: rgba(2,132,199,0.15); color: var(--dn-blue);"><i class="fa-solid fa-user-tie"></i></div>
            <strong>Expert Directory</strong>
          </div>
          <p style="font-size: 0.78rem; color: var(--dn-text-secondary); margin: 0;">Evidence-based SMEs and technical consultation</p>
        </div>
        <div class="section-card" onclick="window.DNKH_APP.switchView('capability')" style="cursor: pointer;">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
            <div class="section-icon-badge" style="background: rgba(236,72,153,0.15); color: var(--dn-pink);"><i class="fa-solid fa-chart-simple"></i></div>
            <strong>Capability Matrix</strong>
          </div>
          <p style="font-size: 0.78rem; color: var(--dn-text-secondary); margin: 0;">Level 0 to Level 4 observable developmental paths</p>
        </div>
        <div class="section-card" onclick="window.DNKH_APP.openKnowledgeGraphModal()" style="cursor: pointer;">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
            <div class="section-icon-badge" style="background: rgba(20,184,166,0.15); color: var(--dn-cyan);"><i class="fa-solid fa-diagram-project"></i></div>
            <strong>Knowledge Graph</strong>
          </div>
          <p style="font-size: 0.78rem; color: var(--dn-text-secondary); margin: 0;">Interactive inter-entity relationship explorer</p>
        </div>
      </div>

      <!-- DNKH Section Explorer -->
      <div class="dnkh-section-heading">
        <div>
          <h2><i class="fa-solid fa-building-user text-red"></i> DNKH Section Knowledge Hubs</h2>
          <p>Every DNKH section manages its own knowledge, standards, 8D troubleshooting, and capability matrix</p>
        </div>
        <button type="button" class="btn-dnkh secondary" onclick="window.DNKH_APP.switchView('sections', 'all')">
          View All \${activeSections.length} Sections <i class="fa-solid fa-arrow-right" style="margin-left: 4px;"></i>
        </button>
      </div>
      <div class="sections-explorer-grid">
        \${activeSections.slice(0, 8).map(s => renderSectionCardHtml(s)).join('')}
      </div>

      <!-- Knowledge Activity Feed & Management Overview -->
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; margin-top: 2rem;">
        <div>
          <div class="dnkh-section-heading" style="margin-top: 0;">
            <div>
              <h3><i class="fa-solid fa-clock-rotate-left text-cyan"></i> Recent Knowledge & Troubleshooting Activity</h3>
              <p>Latest validated standards, verified 8D cases, and shared experiences</p>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            \${data.dnkhRecords.slice(0, 4).map(r => renderRecentActivityRowHtml(r)).join('')}
          </div>
        </div>

        <div>
          <div class="dnkh-section-heading" style="margin-top: 0;">
            <div>
              <h3><i class="fa-solid fa-shield-halved text-green"></i> Management Overview</h3>
              <p>Organizational health without individual employee rankings</p>
            </div>
          </div>
          <div style="background: var(--dn-surface); border: 1px solid var(--dn-border); border-radius: var(--dn-radius-md); padding: 1.25rem;">
            <div style="margin-bottom: 1rem;">
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 4px;">
                <span>Section Knowledge Coverage</span>
                <strong>\${Math.round((publishedRecords / totalRecords) * 100)}%</strong>
              </div>
              <div style="width: 100%; height: 6px; background: var(--dn-surface-card); border-radius: 3px; overflow: hidden;">
                <div style="width: \${Math.round((publishedRecords / totalRecords) * 100)}%; height: 100%; background: var(--dn-green);"></div>
              </div>
            </div>

            <div style="margin-bottom: 1rem;">
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 4px;">
                <span>8D Countermeasure Verification</span>
                <strong>100%</strong>
              </div>
              <div style="width: 100%; height: 6px; background: var(--dn-surface-card); border-radius: 3px; overflow: hidden;">
                <div style="width: 100%; height: 100%; background: var(--dn-cyan);"></div>
              </div>
            </div>

            <div style="margin-bottom: 1.25rem;">
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 4px;">
                <span>Yokoten Horizontal Deployments</span>
                <strong>\${data.dnkhTroubleshootingCases.filter(c => c.horizontalDeployment).length} Lines</strong>
              </div>
              <div style="width: 100%; height: 6px; background: var(--dn-surface-card); border-radius: 3px; overflow: hidden;">
                <div style="width: 85%; height: 100%; background: var(--dn-purple);"></div>
              </div>
            </div>

            <div style="border-top: 1px solid var(--dn-border); padding-top: 0.85rem; font-size: 0.78rem; color: var(--dn-text-secondary);">
              <i class="fa-solid fa-triangle-exclamation text-amber" style="margin-right: 4px;"></i>
              <strong>Knowledge Continuity Risk:</strong> 2 critical stator winding and stamping tooling topics have single Level 4 mentors nearing retirement. Action plans active.
            </div>
          </div>
        </div>
      </div>
    \`;
  }

  function renderSectionCardHtml(s) {
    const data = DNKH_STATE.data;
    const secRecords = data.dnkhRecords.filter(r => r.ownerSectionId === s.id);
    const secCases = data.dnkhTroubleshootingCases.filter(c => c.sectionId === s.id || c.responsibleSectionId === s.id);
    const secExperts = data.dnkhExperts.filter(e => e.sectionId === s.id);

    return \`
      <div class="section-card" style="border-top: 3px solid \${s.color};">
        <div class="section-card-header">
          <div class="section-icon-badge" style="background: \${s.color}22; color: \${s.color};">
            <i class="fa-solid \${s.icon}"></i>
          </div>
          <div>
            <div class="section-code-pill" style="border-color: \${s.color}; color: \${s.color};">\${s.code}</div>
            <h3 class="section-card-title">\${s.name}</h3>
          </div>
        </div>
        <p class="section-card-desc">\${s.objective}</p>
        <div class="section-card-metrics">
          <div class="section-metric-item">
            <span class="sec-metric-num">\${secRecords.length}</span>
            <span class="sec-metric-lbl">Records</span>
          </div>
          <div class="section-metric-item">
            <span class="sec-metric-num">\${s.starterTopics ? s.starterTopics.length : 12}</span>
            <span class="sec-metric-lbl">DNA Topics</span>
          </div>
          <div class="section-metric-item">
            <span class="sec-metric-num">\${secCases.length}</span>
            <span class="sec-metric-lbl">8D Cases</span>
          </div>
          <div class="section-metric-item">
            <span class="sec-metric-num">\${secExperts.length}</span>
            <span class="sec-metric-lbl">SMEs</span>
          </div>
        </div>
        <div style="font-size: 0.72rem; color: var(--dn-text-muted); margin-bottom: 0.85rem;">
          <i class="fa-solid fa-user-tie"></i> Head: \${s.head ? s.head.split('(')[0] : 'Section Head'}
        </div>
        <button type="button" class="btn-dnkh secondary" style="width: 100%; justify-content: center;" onclick="window.DNKH_APP.switchSection('\${s.id}')">
          View Section Microsite <i class="fa-solid fa-arrow-right" style="margin-left: 4px;"></i>
        </button>
      </div>
    \`;
  }

  function renderRecentActivityRowHtml(r) {
    const sec = DNKH_STATE.data.dnkhSections.find(s => s.id === r.ownerSectionId);
    return \`
      <div style="background: var(--dn-surface); border: 1px solid var(--dn-border); border-radius: var(--dn-radius-sm); padding: 0.85rem 1rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; cursor: pointer;" onclick="window.DNKH_APP.openRecordDetail('\${r.id}')">
        <div style="display: flex; align-items: center; gap: 0.85rem;">
          <div class="section-code-pill" style="border-color: \${sec ? sec.color : 'var(--dn-red)'}; color: \${sec ? sec.color : 'var(--dn-red)'};">
            \${sec ? sec.code : 'DNKH'}
          </div>
          <div>
            <strong style="font-size: 0.85rem; color: var(--dn-text);">\${r.title}</strong>
            <div style="font-size: 0.75rem; color: var(--dn-text-secondary); margin-top: 2px;">
              <span>\${r.functionName || r.categoryName}</span> &bull; 
              <span>Updated: \${r.updatedDate}</span> &bull; 
              <span class="quick-link-badge">\${r.status}</span>
            </div>
          </div>
        </div>
        <button type="button" class="btn-dnkh secondary" style="padding: 0.25rem 0.65rem; font-size: 0.75rem;">
          Open <i class="fa-solid fa-chevron-right" style="margin-left: 2px;"></i>
        </button>
      </div>
    \`;
  }

  // Make available
  window.DNKH_RENDER_HOME = renderHomeView;

})();
`;

fs.writeFileSync('app_part1.js', code, 'utf8');
console.log('Successfully wrote app_part1.js');
