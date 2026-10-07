// ========================================================
// DNKH DNA MATRIX - MASTER APPLICATION CONTROLLER
// "Connecting Knowledge. Driving Excellence."
// ========================================================

(function () {
  'use strict';

  // Master State
  const DNKH_STATE = {
    currentSection: 'all',
    currentView: 'home',
    currentRole: 'admin',
    currentLang: 'en',
    theme: 'dark',
    bookmarks: new Set(),
    activeMicrositeTab: 'overview',
    activeCapabilityTab: 'individual',
    activeReviewQueue: 'all',
    activeAdminTab: 'sections',
    searchQuery: '',
    data: null,
    wizardStep: 1,
    wizardDraft: {
      sectionId: 'sec-qa',
      functionName: 'Quality Assurance',
      processName: 'Line Inspection',
      categoryName: 'Standard Work',
      topicName: 'Alternator Stator Inspection',
      recordType: 'rt-standard',
      title: '',
      summary: '',
      productModel: 'Alternator High Output',
      equipment: 'Coil Tension Rig #04',
      purposeBg: '',
      standardMethod: '',
      principles: '',
      cautions: '',
      tags: '',
      keywords: '',
      genbaApplication: '',
      toolsFixtures: '',
      checkpoints: '',
      whatWentWell: '',
      pitfallsToAvoid: '',
      priorCaseRef: 'None',
      evidenceType: 'SOP Controlled Document',
      evidenceFile: 'Standard_Work_Sheet_v1.0.pdf',
      connectedSystem: 'e-SMART ISO',
      knowledgeOwner: 'Associate (Contributor)',
      contributor: 'Sample Contributor',
      reviewer: 'Kenji Nomura (Head Section)',
      approver: 'Somchai Prasert (Reviewer)',
      confidentiality: 'Internal - DNKH Only',
      targetReviewDate: '2027-03-31'
    },
    graphZoom: 1,
    graphFilter: 'all',
    selectedGraphNode: null,
    activeConsultExpert: null,
    activeVerifyExpert: null,
    activeReviewQueueItem: null,
    activeEditSectionId: null
  };

  const LS_KEY_STATE = 'dnkh_matrix_state_v2';
  const LS_KEY_BOOKMARKS = 'dnkh_matrix_bookmarks_v2';
  const LS_KEY_DRAFT = 'dnkh_matrix_draft_v2';

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
        DNKH_STATE.wizardDraft = Object.assign(DNKH_STATE.wizardDraft, JSON.parse(savedDraft));
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

    // Re-render active view to refresh translated data
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
    // Theme Switcher Button
    const themeBtn = document.getElementById('btn-header-theme');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        applyTheme(DNKH_STATE.theme === 'dark' ? 'light' : 'dark');
        saveState();
      });
    }

    // Role Switcher
    const roleSelect = document.getElementById('dnkh-header-role-select');
    if (roleSelect) {
      roleSelect.value = DNKH_STATE.currentRole;
      roleSelect.addEventListener('change', (e) => {
        DNKH_STATE.currentRole = e.target.value;
        saveState();
        showToast(`Switched active role to: ${t('role_' + e.target.value.toLowerCase().replace(/ /g, '_')) || e.target.value}`, 'info');
        renderActiveView();
      });
    }

    // Section Switcher
    populateHeaderSectionSelect();

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
    const searchInput = document.getElementById('dnkh-header-search-input');
    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          DNKH_STATE.searchQuery = searchInput.value.trim();
          switchView('knowledge');
        }
      });
    }
  }

  function populateHeaderSectionSelect() {
    const secSelect = document.getElementById('dnkh-header-section-select');
    if (secSelect && DNKH_STATE.data) {
      secSelect.innerHTML = `
        <option value="all">${t('all_sections')}</option>
        ${DNKH_STATE.data.dnkhSections.map(s => `
          <option value="${s.id}" ${s.id === DNKH_STATE.currentSection ? 'selected' : ''}>${s.code} - ${s.name}</option>
        `).join('')}
      `;
      secSelect.onchange = (e) => switchSection(e.target.value);
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
    document.querySelectorAll('.dnkh-view-stage').forEach(stage => {
      stage.classList.remove('active');
    });

    const targetStage = document.getElementById(`view-${viewId}`);
    if (targetStage) {
      targetStage.classList.add('active');
    }

    // Scroll main container to top
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
      switchView(DNKH_STATE.currentView, 'all');
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

  // --- 5. VIEW RENDERERS ---

  // HOME VIEW
  function renderHomeView() {
    const stage = document.getElementById('view-home');
    if (!stage || !DNKH_STATE.data) return;

    const data = DNKH_STATE.data;
    const totalRecords = data.dnkhRecords.length;
    const publishedRecords = data.dnkhRecords.filter(r => r.status === 'Published').length;
    const activeCases = data.dnkhTroubleshootingCases.length;
    const pendingReviews = data.dnkhReviewQueue.length;

    stage.innerHTML = `
      <div class="dnkh-hero-banner">
        <div class="hero-content-wrap">
          <div class="hero-motto-tag">
            <i class="fa-solid fa-dna text-red"></i>
            <span>${t('app_subtitle')}</span>
          </div>
          <h1 class="hero-main-title">${t('app_title')}</h1>
          <h2 class="hero-sub-title">Enterprise Knowledge, Troubleshooting & Capability Platform</h2>
          <p class="hero-description">${t('platform_desc')}</p>
          <div class="hero-actions-wrap">
            <button type="button" class="btn-hero-primary" onclick="window.DNKH_APP.openCreateRecordModal()">
              <i class="fa-solid fa-circle-plus"></i>
              <span>${t('btn_create_record')}</span>
            </button>
            <button type="button" class="btn-hero-secondary" onclick="window.DNKH_APP.switchView('knowledge')">
              <i class="fa-solid fa-compass"></i>
              <span>${t('btn_explore')}</span>
            </button>
            <button type="button" class="btn-hero-secondary" onclick="window.DNKH_APP.switchView('troubleshooting')">
              <i class="fa-solid fa-wrench"></i>
              <span>${t('nav_troubleshooting')}</span>
            </button>
            <button type="button" class="btn-hero-secondary" onclick="window.DNKH_APP.openKnowledgeGraphModal()">
              <i class="fa-solid fa-diagram-project text-cyan"></i>
              <span>Relationship Graph</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div class="dnkh-metrics-grid">
        <div class="dnkh-metric-card">
          <div class="metric-card-icon red"><i class="fa-solid fa-book-open"></i></div>
          <div class="metric-card-body">
            <h3>${publishedRecords} / ${totalRecords}</h3>
            <p>${t('published_records')}</p>
          </div>
        </div>
        <div class="dnkh-metric-card">
          <div class="metric-card-icon blue"><i class="fa-solid fa-wrench"></i></div>
          <div class="metric-card-body">
            <h3>${activeCases} Cases</h3>
            <p>${t('active_cases')}</p>
          </div>
        </div>
        <div class="dnkh-metric-card">
          <div class="metric-card-icon amber"><i class="fa-solid fa-clipboard-check"></i></div>
          <div class="metric-card-body">
            <h3>${pendingReviews} Pending</h3>
            <p>${t('pending_reviews')}</p>
          </div>
        </div>
        <div class="dnkh-metric-card">
          <div class="metric-card-icon green"><i class="fa-solid fa-chart-line"></i></div>
          <div class="metric-card-body">
            <h3>88.4%</h3>
            <p>${t('capability_coverage')}</p>
          </div>
        </div>
      </div>

      <!-- Section 6C: Main Knowledge Modules -->
      <div class="dnkh-section-heading">
        <div>
          <h2><i class="fa-solid fa-cubes"></i> Knowledge & Capability Modules</h2>
          <p>Structured Monozukuri knowledge, 8D problem-solving cases, and evidence-based matrices</p>
        </div>
      </div>
      <div class="knowledge-modules-grid">
        <div class="km-card" onclick="window.DNKH_APP.switchView('knowledge')">
          <div class="km-icon"><i class="fa-solid fa-book-open text-cyan"></i></div>
          <div class="km-title">${t('nav_knowledge')}</div>
          <p class="km-desc">Standard Work, SOPs, and Manuals</p>
        </div>
        <div class="km-card" onclick="window.DNKH_APP.switchView('troubleshooting')">
          <div class="km-icon"><i class="fa-solid fa-wrench text-red"></i></div>
          <div class="km-title">${t('nav_troubleshooting')}</div>
          <p class="km-desc">8D Reports, 5-Why, and Fishbone</p>
        </div>
        <div class="km-card" onclick="window.DNKH_APP.switchView('experience')">
          <div class="km-icon"><i class="fa-solid fa-briefcase text-blue"></i></div>
          <div class="km-title">${t('nav_experience')}</div>
          <p class="km-desc">Real Delivery & Case Studies</p>
        </div>
        <div class="km-card" onclick="window.DNKH_APP.switchView('lessons')">
          <div class="km-icon"><i class="fa-solid fa-lightbulb text-amber"></i></div>
          <div class="km-title">${t('nav_lessons')}</div>
          <p class="km-desc">Failure Lessons & Yokoten</p>
        </div>
        <div class="km-card" onclick="window.DNKH_APP.switchView('documents')">
          <div class="km-icon"><i class="fa-solid fa-file-shield text-green"></i></div>
          <div class="km-title">${t('nav_documents')}</div>
          <p class="km-desc">Controlled Drawings & Procedures</p>
        </div>
        <div class="km-card" onclick="window.DNKH_APP.switchView('experts')">
          <div class="km-icon"><i class="fa-solid fa-user-tie text-purple"></i></div>
          <div class="km-title">${t('nav_experts')}</div>
          <p class="km-desc">Subject Matter Experts Directory</p>
        </div>
        <div class="km-card" onclick="window.DNKH_APP.switchView('capability')">
          <div class="km-icon"><i class="fa-solid fa-chart-simple text-cyan"></i></div>
          <div class="km-title">${t('nav_capability')}</div>
          <p class="km-desc">Levels 0 to 4 Heatmaps & Succession</p>
        </div>
      </div>

      <!-- Section 6B: All Active DNKH Sections -->
      <div class="dnkh-section-heading">
        <div>
          <h2><i class="fa-solid fa-building-user"></i> ${t('all_sections')}</h2>
          <p>Explore specialized microsites for each DNKH manufacturing and administrative division</p>
        </div>
      </div>
      <div class="sections-explorer-grid">
        ${data.dnkhSections.map(sec => {
          const secRecords = data.dnkhRecords.filter(r => r.ownerSectionId === sec.id);
          const secCases = data.dnkhTroubleshootingCases.filter(c => c.sectionId === sec.id);
          return `
            <div class="section-card" style="--section-color: ${sec.color};" onclick="window.DNKH_APP.switchSection('${sec.id}')">
              <div class="section-card-top">
                <div class="section-icon-badge" style="color: ${sec.color};"><i class="fa-solid ${sec.icon}"></i></div>
                <span class="section-code-pill">${sec.code}</span>
              </div>
              <h3 class="section-card-name">${sec.name}</h3>
              <p class="section-card-desc">${sec.objective}</p>
              <div class="section-card-stats">
                <span><strong>${secRecords.length}</strong> Records</span>
                <span><strong>${secCases.length}</strong> 8D Cases</span>
                <span><strong>${(sec.starterTopics || []).length}</strong> Topics</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Section 6F: Connected DNKH Systems -->
      <div class="dnkh-section-heading">
        <div>
          <h2><i class="fa-solid fa-network-wired"></i> ${t('quick_links')}</h2>
          <p>Direct connectivity to enterprise manufacturing and documentation portals</p>
        </div>
      </div>
      <div class="quick-links-grid">
        ${data.dnkhQuickLinks.map(link => `
          <a href="${link.url}" target="_blank" rel="noopener" class="quick-link-item" title="${link.desc}">
            <div class="quick-link-left">
              <span class="quick-link-code">${link.name}</span>
              <span class="quick-link-desc">${link.desc}</span>
            </div>
            <span class="quick-link-badge">${link.status}</span>
          </a>
        `).join('')}
      </div>
    `;
  }

  // SECTIONS MICROSITE VIEW
  function renderSectionsView() {
    const stage = document.getElementById('view-sections');
    if (!stage || !DNKH_STATE.data) return;

    const data = DNKH_STATE.data;

    // If viewing 'all', show All Sections Grid with Search and Filter
    if (DNKH_STATE.currentSection === 'all') {
      stage.innerHTML = `
        <div class="dnkh-section-heading" style="margin-top: 0;">
          <div>
            <h2><i class="fa-solid fa-building-user"></i> All DNKH Sections Explorer</h2>
            <p>19 Core Manufacturing, Quality, Engineering, and Administrative Divisions</p>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button type="button" class="btn-dnkh secondary" onclick="window.DNKH_APP.openKnowledgeGraphModal()">
              <i class="fa-solid fa-diagram-project text-cyan"></i> Relationship Graph
            </button>
            <button type="button" class="btn-hero-primary" onclick="window.DNKH_APP.openCreateRecordModal()">
              <i class="fa-solid fa-plus"></i> ${t('btn_create_record')}
            </button>
          </div>
        </div>

        <div class="sections-explorer-grid">
          ${data.dnkhSections.map(sec => {
            const secRecords = data.dnkhRecords.filter(r => r.ownerSectionId === sec.id);
            const secCases = data.dnkhTroubleshootingCases.filter(c => c.sectionId === sec.id);
            return `
              <div class="section-card" style="--section-color: ${sec.color};" onclick="window.DNKH_APP.switchSection('${sec.id}')">
                <div class="section-card-top">
                  <div class="section-icon-badge" style="color: ${sec.color};"><i class="fa-solid ${sec.icon}"></i></div>
                  <span class="section-code-pill">${sec.code}</span>
                </div>
                <h3 class="section-card-name">${sec.name}</h3>
                <p class="section-card-desc">${sec.objective}</p>
                <div class="section-card-stats">
                  <span><strong>${secRecords.length}</strong> Records</span>
                  <span><strong>${secCases.length}</strong> 8D Cases</span>
                  <span><strong>${(sec.starterTopics || []).length}</strong> Topics</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
      return;
    }

    // Specific Section Microsite
    const section = data.dnkhSections.find(s => s.id === DNKH_STATE.currentSection) || data.dnkhSections[0];
    const secRecords = data.dnkhRecords.filter(r => r.ownerSectionId === section.id || (r.relatedSectionIds && r.relatedSectionIds.includes(section.id)));
    const secCases = data.dnkhTroubleshootingCases.filter(c => c.sectionId === section.id || c.responsibleSectionId === section.id);
    const secDocs = data.dnkhDocuments.filter(d => d.sectionId === section.id);
    const secExperts = data.dnkhExperts.filter(e => e.sectionId === section.id);
    const secAssessments = data.dnkhAssessments.filter(a => a.sectionId === section.id);
    const secExperiences = (data.dnkhExperiences || []).filter(e => e.department && e.department.toLowerCase().includes(section.code.toLowerCase()));

    stage.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <button type="button" class="btn-dnkh secondary" style="padding: 0.3rem 0.75rem; font-size: 0.8rem;" onclick="window.DNKH_APP.switchSection('all')">
          <i class="fa-solid fa-arrow-left"></i> Back to All Sections Explorer
        </button>
      </div>

      <div class="section-microsite-banner" style="--section-color: ${section.color};">
        <div>
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
            <div class="section-icon-badge" style="background: rgba(255,255,255,0.15); color: #fff; width: 44px; height: 44px;">
              <i class="fa-solid ${section.icon}"></i>
            </div>
            <div>
              <span style="font-size: 0.75rem; font-weight: 800; background: rgba(0,0,0,0.3); padding: 2px 8px; border-radius: 4px; letter-spacing: 0.5px;">${section.code} DIVISION</span>
              <h1 style="margin: 0; font-size: 1.8rem; font-weight: 800;">${section.name}</h1>
            </div>
          </div>
          <p style="margin: 0.5rem 0 1rem 0; max-width: 750px; font-size: 0.88rem; line-height: 1.6; opacity: 0.9;">${section.objective}</p>
          <div class="microsite-meta-grid">
            <div><small style="opacity: 0.7;">Section Head:</small><br><strong>${section.head}</strong></div>
            <div><small style="opacity: 0.7;">Window Persons:</small><br><strong>${(section.windowPersons || []).join(', ')}</strong></div>
            <div><small style="opacity: 0.7;">Total Records:</small><br><strong>${secRecords.length} Items</strong></div>
            <div><small style="opacity: 0.7;">8D Active Cases:</small><br><strong>${secCases.length} Cases</strong></div>
          </div>
        </div>
        <button type="button" class="btn-hero-primary" onclick="window.DNKH_APP.openCreateRecordModal('${section.id}')">
          <i class="fa-solid fa-plus"></i>
          <span>Create Section Record</span>
        </button>
      </div>

      <!-- Microsite Tab Bar (10 Sub-Tabs) -->
      <div class="microsite-tab-bar" style="overflow-x: auto; white-space: nowrap;">
        <button type="button" class="btn-microsite-tab ${DNKH_STATE.activeMicrositeTab === 'overview' ? 'active' : ''}" onclick="window.DNKH_APP.switchMicrositeTab('overview')">
          <i class="fa-solid fa-list-check"></i> Overview & Topics
        </button>
        <button type="button" class="btn-microsite-tab ${DNKH_STATE.activeMicrositeTab === 'knowledge' ? 'active' : ''}" onclick="window.DNKH_APP.switchMicrositeTab('knowledge')">
          <i class="fa-solid fa-book-open"></i> Knowledge (${secRecords.length})
        </button>
        <button type="button" class="btn-microsite-tab ${DNKH_STATE.activeMicrositeTab === 'troubleshooting' ? 'active' : ''}" onclick="window.DNKH_APP.switchMicrositeTab('troubleshooting')">
          <i class="fa-solid fa-wrench"></i> 8D Cases (${secCases.length})
        </button>
        <button type="button" class="btn-microsite-tab ${DNKH_STATE.activeMicrositeTab === 'experience' ? 'active' : ''}" onclick="window.DNKH_APP.switchMicrositeTab('experience')">
          <i class="fa-solid fa-briefcase"></i> Experience (${secExperiences.length})
        </button>
        <button type="button" class="btn-microsite-tab ${DNKH_STATE.activeMicrositeTab === 'documents' ? 'active' : ''}" onclick="window.DNKH_APP.switchMicrositeTab('documents')">
          <i class="fa-solid fa-file-shield"></i> Standards (${secDocs.length})
        </button>
        <button type="button" class="btn-microsite-tab ${DNKH_STATE.activeMicrositeTab === 'experts' ? 'active' : ''}" onclick="window.DNKH_APP.switchMicrositeTab('experts')">
          <i class="fa-solid fa-user-tie"></i> Experts (${secExperts.length})
        </button>
        <button type="button" class="btn-microsite-tab ${DNKH_STATE.activeMicrositeTab === 'capability' ? 'active' : ''}" onclick="window.DNKH_APP.switchMicrositeTab('capability')">
          <i class="fa-solid fa-chart-simple"></i> Capability (${secAssessments.length})
        </button>
      </div>

      <div id="microsite-tab-content" style="margin-top: 1.25rem;">
        ${renderMicrositeTabContent(section, secRecords, secCases, secDocs, secExperts, secAssessments, secExperiences)}
      </div>
    `;
  }

  function renderMicrositeTabContent(section, secRecords, secCases, secDocs, secExperts, secAssessments, secExperiences) {
    const tab = DNKH_STATE.activeMicrositeTab;

    if (tab === 'overview') {
      return `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
          <div class="dnkh-metric-card" style="flex-direction: column; align-items: flex-start;">
            <h3 style="margin-bottom: 0.75rem; color: var(--dn-cyan);"><i class="fa-solid fa-folder-tree"></i> Section DNA Topics</h3>
            <ul style="padding-left: 1.25rem; margin: 0; line-height: 1.8; color: var(--dn-text-secondary); font-size: 0.82rem;">
              ${(section.starterTopics || []).map(t => `<li><strong>${t}</strong></li>`).join('')}
            </ul>
          </div>
          <div class="dnkh-metric-card" style="flex-direction: column; align-items: flex-start;">
            <h3 style="margin-bottom: 0.75rem; color: var(--dn-red);"><i class="fa-solid fa-tags"></i> Core Capability Categories</h3>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; width: 100%;">
              ${(section.categories || []).map(cat => `
                <div style="background: rgba(255,255,255,0.04); padding: 0.5rem 0.85rem; border-radius: 6px; border-left: 3px solid ${section.color};">
                  <strong>${cat}</strong>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    } else if (tab === 'knowledge') {
      return `
        <div class="records-cards-grid">
          ${secRecords.length > 0 ? secRecords.map(r => renderRecordCardHtml(r)).join('') : '<p style="color: var(--dn-text-muted);">No records registered for this section yet.</p>'}
        </div>
      `;
    } else if (tab === 'troubleshooting') {
      return `
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${secCases.length > 0 ? secCases.map(c => render8DCaseCardHtml(c)).join('') : '<p style="color: var(--dn-text-muted);">No 8D cases registered for this section.</p>'}
        </div>
      `;
    } else if (tab === 'experience') {
      return `
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${secExperiences.length > 0 ? secExperiences.map(e => `
            <div class="eight-d-case-card">
              <h4 style="margin: 0 0 0.5rem 0;">${e.title}</h4>
              <p style="font-size: 0.82rem; color: var(--dn-text-secondary); margin: 0 0 0.5rem 0;">${e.action}</p>
              <div style="font-size: 0.75rem; color: var(--dn-green);"><strong>Result:</strong> ${e.result}</div>
            </div>
          `).join('') : '<p style="color: var(--dn-text-muted);">No experience cases registered for this section.</p>'}
        </div>
      `;
    } else if (tab === 'documents') {
      return renderDocumentsTableHtml(secDocs);
    } else if (tab === 'experts') {
      return `
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem;">
          ${secExperts.length > 0 ? secExperts.map(e => renderExpertCardHtml(e)).join('') : '<p style="color: var(--dn-text-muted);">No section experts assigned yet.</p>'}
        </div>
      `;
    } else if (tab === 'capability') {
      return `
        <div class="matrix-table-wrap">
          <table class="matrix-table">
            <thead>
              <tr>
                <th>Associate</th>
                <th>Topic</th>
                <th>Current Level</th>
                <th>Evidence</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${secAssessments.length > 0 ? secAssessments.map(a => `
                <tr>
                  <td><strong>${a.employeeName}</strong></td>
                  <td>${a.topicName}</td>
                  <td><span class="capability-badge lvl-${a.level}">${a.levelTitle}</span></td>
                  <td style="font-size: 0.75rem;">${a.evidenceSummary}</td>
                  <td><span class="quick-link-badge">${a.reviewStatus}</span></td>
                </tr>
              `).join('') : '<tr><td colspan="5" style="text-align: center; color: var(--dn-text-muted);">No section assessments available.</td></tr>'}
            </tbody>
          </table>
        </div>
      `;
    }
    return '';
  }

  function switchMicrositeTab(tabName) {
    DNKH_STATE.activeMicrositeTab = tabName;
    renderSectionsView();
  }

  // KNOWLEDGE LIBRARY VIEW
  function renderKnowledgeView() {
    const stage = document.getElementById('view-knowledge');
    if (!stage || !DNKH_STATE.data) return;

    let records = DNKH_STATE.data.dnkhRecords;

    // Filter by Section
    if (DNKH_STATE.currentSection !== 'all') {
      records = records.filter(r => r.ownerSectionId === DNKH_STATE.currentSection || (r.relatedSectionIds && r.relatedSectionIds.includes(DNKH_STATE.currentSection)));
    }

    // Filter by Search Query
    if (DNKH_STATE.searchQuery) {
      const q = DNKH_STATE.searchQuery.toLowerCase();
      records = records.filter(r => 
        r.title.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        (r.keywords && r.keywords.some(k => k.toLowerCase().includes(q))) ||
        (r.tags && r.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    stage.innerHTML = `
      <div class="dnkh-section-heading" style="margin-top: 0;">
        <div>
          <h2><i class="fa-solid fa-book-open"></i> ${t('nav_knowledge')}</h2>
          <p>Validated engineering procedures, standard work combination sheets, and Monozukuri guidelines</p>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button type="button" class="btn-dnkh secondary" onclick="window.DNKH_APP.openKnowledgeGraphModal()">
            <i class="fa-solid fa-diagram-project text-cyan"></i> Relationship Graph
          </button>
          <button type="button" class="btn-hero-primary" onclick="window.DNKH_APP.openCreateRecordModal()">
            <i class="fa-solid fa-plus"></i> ${t('btn_create_record')}
          </button>
        </div>
      </div>

      <!-- Toolbar & Filters -->
      <div class="dnkh-toolbar">
        <div class="dnkh-filter-group">
          <select class="dnkh-select" onchange="window.DNKH_APP.filterKnowledgeBySection(this.value)">
            <option value="all">${t('all_sections')}</option>
            ${DNKH_STATE.data.dnkhSections.map(s => `
              <option value="${s.id}" ${DNKH_STATE.currentSection === s.id ? 'selected' : ''}>${s.code} - ${s.name}</option>
            `).join('')}
          </select>
          <select class="dnkh-select" onchange="window.DNKH_APP.filterKnowledgeByType(this.value)">
            <option value="all">All Record Types</option>
            ${DNKH_STATE.data.dnkhRecordTypes.map(rt => `
              <option value="${rt.id}">${rt.name}</option>
            `).join('')}
          </select>
        </div>
        <span style="font-size: 0.8rem; color: var(--dn-text-secondary);">${records.length} records found</span>
      </div>

      <div class="records-cards-grid">
        ${records.length > 0 ? records.map(r => renderRecordCardHtml(r)).join('') : `
          <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--dn-surface-card); border-radius: 8px;">
            <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; color: var(--dn-text-muted); margin-bottom: 0.5rem;"></i>
            <p>No records found matching your active filter criteria.</p>
            <button type="button" class="btn-dnkh secondary" onclick="window.DNKH_APP.resetKnowledgeFilters()">Reset Filters</button>
          </div>
        `}
      </div>
    `;
  }

  function renderRecordCardHtml(r) {
    const isBookmarked = DNKH_STATE.bookmarks.has(r.id);
    const sec = DNKH_STATE.data.dnkhSections.find(s => s.id === r.ownerSectionId);
    return `
      <div class="record-card" onclick="window.DNKH_APP.openRecordDetail('${r.id}')">
        <div class="record-card-top">
          <span class="record-type-pill"><i class="fa-solid fa-file-lines"></i> ${r.recordType.replace('rt-', '').toUpperCase()}</span>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 0.68rem; font-weight: 700; color: ${sec ? sec.color : 'inherit'};">${sec ? sec.code : ''}</span>
            <button type="button" class="btn-modal-close" style="font-size: 0.95rem; color: ${isBookmarked ? 'var(--dn-red)' : 'var(--dn-text-muted)'};" onclick="event.stopPropagation(); window.DNKH_APP.toggleBookmark('${r.id}')">
              <i class="fa-${isBookmarked ? 'solid' : 'regular'} fa-bookmark"></i>
            </button>
          </div>
        </div>
        <h3 class="record-card-title">${r.title}</h3>
        <p class="record-card-summary">${r.summary}</p>
        <div class="record-tags-wrap">
          ${(r.tags || []).slice(0, 3).map(tag => `<span class="record-tag-chip">#${tag}</span>`).join('')}
        </div>
        <div class="record-card-footer">
          <span><i class="fa-solid fa-user-check"></i> ${r.knowledgeOwner || 'Owner'}</span>
          <span><i class="fa-solid fa-thumbs-up"></i> ${r.helpfulCount || 0} helpful</span>
        </div>
      </div>
    `;
  }

  // 8D TROUBLESHOOTING VIEW
  function renderTroubleshootingView() {
    const stage = document.getElementById('view-troubleshooting');
    if (!stage || !DNKH_STATE.data) return;

    const cases = DNKH_STATE.data.dnkhTroubleshootingCases;

    stage.innerHTML = `
      <div class="dnkh-section-heading" style="margin-top: 0;">
        <div>
          <h2><i class="fa-solid fa-wrench"></i> ${t('nav_troubleshooting')}</h2>
          <p>Structured 8D Problem Solving: 5-Why Analysis, Fishbone 5M1E, Containment, and Horizontal Yokoten</p>
        </div>
        <button type="button" class="btn-hero-primary" onclick="window.DNKH_APP.openCreateCaseModal()">
          <i class="fa-solid fa-plus"></i> ${t('btn_create_case')}
        </button>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1rem;">
        ${cases.map(c => render8DCaseCardHtml(c)).join('')}
      </div>
    `;
  }

  function render8DCaseCardHtml(c) {
    const sec = DNKH_STATE.data.dnkhSections.find(s => s.id === c.sectionId);
    return `
      <div class="eight-d-case-card" onclick="window.DNKH_APP.openTroubleshootingDetail('${c.id}')">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span class="severity-chip ${c.severity.toLowerCase().includes('critical') ? 'critical' : c.severity.toLowerCase().includes('high') ? 'high' : 'medium'}">${c.severity}</span>
            <span style="font-weight: 700; font-family: var(--dn-font-mono); font-size: 0.8rem; color: var(--dn-cyan);">${c.id}</span>
          </div>
          <span style="font-size: 0.72rem; color: var(--dn-green); font-weight: 600;"><i class="fa-solid fa-circle-check"></i> ${c.status}</span>
        </div>
        <h3 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; font-weight: 700;">${c.caseTitle}</h3>
        <p style="margin: 0 0 0.85rem 0; font-size: 0.8rem; color: var(--dn-text-secondary);">${c.problemWhat || ''}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; font-size: 0.75rem; color: var(--dn-text-muted); border-top: 1px solid var(--dn-border); padding-top: 0.75rem;">
          <span><strong>Section:</strong> ${sec ? sec.name : c.sectionId}</span>
          <span><strong>Product:</strong> ${c.product}</span>
          <span><strong>Defect:</strong> ${c.defectCategory}</span>
          <span><strong>Affected:</strong> ${c.affectedQuantity} pcs</span>
          <span><strong>PIC:</strong> ${c.pic}</span>
        </div>
      </div>
    `;
  }

  // EXPERIENCE VIEW
  function renderExperienceView() {
    const stage = document.getElementById('view-experience');
    if (!stage || !DNKH_STATE.data) return;

    const experiences = DNKH_STATE.data.dnkhExperiences || [];

    stage.innerHTML = `
      <div class="dnkh-section-heading" style="margin-top: 0;">
        <div>
          <h2><i class="fa-solid fa-briefcase"></i> ${t('nav_experience')}</h2>
          <p>Real manufacturing application, plant launches, and Kaizen implementations</p>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1rem;">
        ${experiences.map(e => `
          <div class="eight-d-case-card">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
              <span class="record-type-pill"><i class="fa-solid fa-trophy"></i> ${e.experienceType || 'Experience'}</span>
              <span style="font-size: 0.75rem; color: var(--dn-text-muted);">${e.date}</span>
            </div>
            <h3 style="margin: 0 0 0.5rem 0; font-size: 1.05rem;">${e.title}</h3>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.8rem; color: var(--dn-text-secondary);"><strong>Situation:</strong> ${e.situation}</p>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.8rem; color: var(--dn-text-secondary);"><strong>Action Performed:</strong> ${e.action}</p>
            <p style="margin: 0 0 0.75rem 0; font-size: 0.8rem; color: var(--dn-green);"><strong>Result:</strong> ${e.result}</p>
            <div style="background: rgba(255,255,255,0.03); padding: 0.75rem; border-radius: 6px; font-size: 0.75rem;">
              <strong style="color: var(--dn-amber);"><i class="fa-solid fa-lightbulb"></i> Key Reusable Learning:</strong> ${e.learning}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // LESSONS LEARNED VIEW
  function renderLessonsView() {
    const stage = document.getElementById('view-lessons');
    if (!stage || !DNKH_STATE.data) return;

    const lessons = (DNKH_STATE.data.dnkhExperiences || []).filter(e => e.experienceType === 'Failure Lesson');

    stage.innerHTML = `
      <div class="dnkh-section-heading" style="margin-top: 0;">
        <div>
          <h2><i class="fa-solid fa-lightbulb"></i> ${t('nav_lessons')}</h2>
          <p>Preserved Failure Lessons, Mistake Proofing, and Horizontal Prevention</p>
        </div>
      </div>

      <!-- Failure Lessons Highlight Banner -->
      <div style="background: rgba(230, 0, 18, 0.12); border: 1px solid rgba(230,0,18,0.3); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
        <h3 style="color: var(--dn-red); margin: 0 0 0.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-triangle-exclamation"></i> Monozukuri Failure Lessons Philosophy
        </h3>
        <p style="margin: 0; font-size: 0.82rem; color: var(--dn-text-secondary); line-height: 1.6;">
          At DENSO, failures in Genba trials and software automations are valuable organizational assets. We rigorously analyze root causes without individual blame to formulate permanent standard countermeasures.
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        ${lessons.map(l => `
          <div class="eight-d-case-card" style="border-left: 4px solid var(--dn-red);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
              <span class="severity-chip critical"><i class="fa-solid fa-bug"></i> Failure Lesson</span>
              <span style="font-size: 0.75rem; color: var(--dn-text-muted);">${l.department} · ${l.contributor}</span>
            </div>
            <h3 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--dn-text);">${l.title}</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 0.85rem 0; font-size: 0.8rem;">
              <div style="background: rgba(0,0,0,0.25); padding: 0.75rem; border-radius: 6px;">
                <strong style="color: #f87171;"><i class="fa-solid fa-xmark"></i> What Failed & Root Cause:</strong>
                <p style="margin: 0.35rem 0 0 0; color: var(--dn-text-secondary);">${l.rootCause || l.challenge || ''}</p>
              </div>
              <div style="background: rgba(0,0,0,0.25); padding: 0.75rem; border-radius: 6px;">
                <strong style="color: var(--dn-green);"><i class="fa-solid fa-check"></i> Permanent Countermeasure:</strong>
                <p style="margin: 0.35rem 0 0 0; color: var(--dn-text-secondary);">${l.permanentPrevention || l.action || ''}</p>
              </div>
            </div>
            <div style="font-size: 0.75rem; color: var(--dn-amber);">
              <strong>Horizontal Deployment Scope:</strong> ${l.reusableLesson || l.learning || ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // DOCUMENTS & STANDARDS VIEW
  function renderDocumentsView() {
    const stage = document.getElementById('view-documents');
    if (!stage || !DNKH_STATE.data) return;

    stage.innerHTML = `
      <div class="dnkh-section-heading" style="margin-top: 0;">
        <div>
          <h2><i class="fa-solid fa-file-shield"></i> ${t('nav_documents')}</h2>
          <p>Controlled procedures, engineering manuals, drawing revisions, and external audit links</p>
        </div>
      </div>
      ${renderDocumentsTableHtml(DNKH_STATE.data.dnkhDocuments)}
    `;
  }

  function renderDocumentsTableHtml(docs) {
    return `
      <div class="matrix-table-wrap">
        <table class="matrix-table">
          <thead>
            <tr>
              <th>Document Number</th>
              <th>Title</th>
              <th>Revision</th>
              <th>Source System</th>
              <th>Effective Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${docs.map(d => `
              <tr>
                <td><strong>${d.docNo}</strong></td>
                <td>${d.title}</td>
                <td><span class="section-code-pill">${d.revision}</span></td>
                <td>${d.sourceSystem}</td>
                <td>${d.effectiveDate}</td>
                <td>
                  <span class="quick-link-badge" style="background: ${d.status.includes('Valid') ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)'}; color: ${d.status.includes('Valid') ? 'var(--dn-green)' : 'var(--dn-amber)'};">
                    ${d.status}
                  </span>
                </td>
                <td>
                  <a href="${d.linkUrl}" target="_blank" rel="noopener" class="btn-dnkh secondary" style="padding: 0.25rem 0.5rem; font-size: 0.72rem;">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Open
                  </a>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // EXPERTS VIEW
  function renderExpertsView() {
    const stage = document.getElementById('view-experts');
    if (!stage || !DNKH_STATE.data) return;

    stage.innerHTML = `
      <div class="dnkh-section-heading" style="margin-top: 0;">
        <div>
          <h2><i class="fa-solid fa-user-tie"></i> ${t('nav_experts')}</h2>
          <p>Verified subject matter experts, master quality mentors, and solution architects</p>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.25rem;">
        ${DNKH_STATE.data.dnkhExperts.map(e => renderExpertCardHtml(e)).join('')}
      </div>
    `;
  }

  function renderExpertCardHtml(e) {
    const sec = DNKH_STATE.data.dnkhSections.find(s => s.id === e.sectionId);
    return `
      <div class="record-card">
        <div style="display: flex; align-items: center; gap: 0.85rem; margin-bottom: 0.85rem;">
          <div class="user-avatar-badge" style="width: 48px; height: 48px; font-size: 1.1rem; background: ${sec ? sec.color : 'var(--dn-blue)'};">
            ${e.avatarInitials}
          </div>
          <div>
            <h3 style="margin: 0; font-size: 1.05rem; font-weight: 700;">${e.name}</h3>
            <span style="font-size: 0.75rem; color: var(--dn-text-secondary);">${e.role} (${sec ? sec.code : ''})</span>
          </div>
        </div>
        <div style="margin-bottom: 1rem;">
          <small style="color: var(--dn-text-muted); font-size: 0.7rem; font-weight: 700; text-transform: uppercase;">Verified Expertise:</small>
          <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 0.35rem;">
            ${(e.skills || []).map(s => `<span class="record-tag-chip"><i class="fa-solid fa-certificate text-cyan"></i> ${s}</span>`).join('')}
          </div>
        </div>
        <div class="record-card-footer">
          <button type="button" class="btn-dnkh secondary" style="padding: 0.3rem 0.65rem; font-size: 0.75rem;" onclick="window.DNKH_APP.openExpertProfileModal('${e.id}')">
            <i class="fa-solid fa-id-badge"></i> Profile
          </button>
          <button type="button" class="btn-dnkh primary" style="padding: 0.3rem 0.65rem; font-size: 0.75rem;" onclick="window.DNKH_APP.openRequestConsultationModal('${e.id}')">
            <i class="fa-solid fa-comments"></i> Consult
          </button>
        </div>
      </div>
    `;
  }

  // CAPABILITY MATRIX VIEW (9 SUB-VIEWS)
  function renderCapabilityView() {
    const stage = document.getElementById('view-capability');
    if (!stage || !DNKH_STATE.data) return;

    stage.innerHTML = `
      <div class="dnkh-section-heading" style="margin-top: 0;">
        <div>
          <h2><i class="fa-solid fa-chart-simple"></i> ${t('nav_capability')}</h2>
          <p>Evidence-based Level 0 to Level 4 development matrices without employee rankings</p>
        </div>
        <button type="button" class="btn-hero-primary" onclick="window.DNKH_APP.openCapabilityAssessmentModal()">
          <i class="fa-solid fa-plus"></i> Submit Assessment
        </button>
      </div>

      <!-- Level Reference Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.75rem; margin-bottom: 1.5rem;">
        ${DNKH_STATE.data.dnkhCapabilityLevels.map(lvl => `
          <div style="background: var(--dn-surface-card); border: 1px solid var(--dn-border); border-radius: 8px; padding: 0.85rem; border-top: 3px solid ${lvl.color};">
            <span class="capability-badge ${lvl.badgeClass}">${lvl.code}</span>
            <h4 style="margin: 0.35rem 0 0.2rem 0; font-size: 0.85rem;">${lvl.title}</h4>
            <p style="margin: 0; font-size: 0.72rem; color: var(--dn-text-secondary);">${lvl.definition}</p>
          </div>
        `).join('')}
      </div>

      <!-- 9 Capability View Sub-Tabs -->
      <div class="microsite-tab-bar" style="overflow-x: auto; white-space: nowrap; margin-bottom: 1.25rem;">
        <button type="button" class="btn-microsite-tab ${DNKH_STATE.activeCapabilityTab === 'individual' ? 'active' : ''}" onclick="window.DNKH_APP.switchCapabilityView('individual')">
          1. Individual Growth
        </button>
        <button type="button" class="btn-microsite-tab ${DNKH_STATE.activeCapabilityTab === 'section_heatmap' ? 'active' : ''}" onclick="window.DNKH_APP.switchCapabilityView('section_heatmap')">
          2. Section Heatmap
        </button>
        <button type="button" class="btn-microsite-tab ${DNKH_STATE.activeCapabilityTab === 'topic_coverage' ? 'active' : ''}" onclick="window.DNKH_APP.switchCapabilityView('topic_coverage')">
          3. Topic Coverage
        </button>
        <button type="button" class="btn-microsite-tab ${DNKH_STATE.activeCapabilityTab === 'owner_coverage' ? 'active' : ''}" onclick="window.DNKH_APP.switchCapabilityView('owner_coverage')">
          4. Owner Coverage
        </button>
        <button type="button" class="btn-microsite-tab ${DNKH_STATE.activeCapabilityTab === 'expertise_coverage' ? 'active' : ''}" onclick="window.DNKH_APP.switchCapabilityView('expertise_coverage')">
          5. Expertise Coverage
        </button>
        <button type="button" class="btn-microsite-tab ${DNKH_STATE.activeCapabilityTab === 'missing_evidence' ? 'active' : ''}" onclick="window.DNKH_APP.switchCapabilityView('missing_evidence')">
          6. Missing Evidence Audit
        </button>
        <button type="button" class="btn-microsite-tab ${DNKH_STATE.activeCapabilityTab === 'training_needs' ? 'active' : ''}" onclick="window.DNKH_APP.switchCapabilityView('training_needs')">
          7. Training Needs
        </button>
        <button type="button" class="btn-microsite-tab ${DNKH_STATE.activeCapabilityTab === 'continuity_risks' ? 'active' : ''}" onclick="window.DNKH_APP.switchCapabilityView('continuity_risks')">
          8. Continuity Risks
        </button>
        <button type="button" class="btn-microsite-tab ${DNKH_STATE.activeCapabilityTab === 'development_plans' ? 'active' : ''}" onclick="window.DNKH_APP.switchCapabilityView('development_plans')">
          9. Development Plans
        </button>
      </div>

      <div id="capability-tab-stage">
        ${renderCapabilitySubViewHtml()}
      </div>
    `;
  }

  function renderCapabilitySubViewHtml() {
    const data = DNKH_STATE.data;
    const tab = DNKH_STATE.activeCapabilityTab;

    if (tab === 'individual') {
      return `
        <div class="matrix-table-wrap">
          <table class="matrix-table">
            <thead>
              <tr>
                <th>Associate Name</th>
                <th>Section</th>
                <th>Assessed DNA Topic</th>
                <th>Current Level</th>
                <th>Observable Evidence Citation</th>
                <th>Status</th>
                <th>Verification</th>
              </tr>
            </thead>
            <tbody>
              ${data.dnkhAssessments.map(a => {
                const sec = data.dnkhSections.find(s => s.id === a.sectionId);
                return `
                  <tr>
                    <td><strong>${a.employeeName}</strong></td>
                    <td>${sec ? sec.code : a.sectionId}</td>
                    <td>${a.topicName}</td>
                    <td><span class="capability-badge lvl-${a.level}">${a.levelTitle}</span></td>
                    <td style="max-width: 280px; font-size: 0.75rem;">${a.evidenceSummary}</td>
                    <td>
                      <span class="quick-link-badge" style="background: ${a.reviewStatus === 'Verified' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)'}; color: ${a.reviewStatus === 'Verified' ? 'var(--dn-green)' : 'var(--dn-amber)'};">
                        ${a.reviewStatus}
                      </span>
                    </td>
                    <td>
                      <button type="button" class="btn-dnkh secondary" style="padding: 0.25rem 0.55rem; font-size: 0.72rem;" onclick="window.DNKH_APP.verifyCapabilityEvidence('${a.id}')">
                        <i class="fa-solid fa-check-double"></i> Verify
                      </button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      `;
    } else if (tab === 'section_heatmap') {
      return `
        <div class="matrix-table-wrap">
          <table class="matrix-table">
            <thead>
              <tr>
                <th>Section</th>
                <th>L0: Awareness</th>
                <th>L1: Knowledge</th>
                <th>L2: Skill</th>
                <th>L3: Experience</th>
                <th>L4: Knowledge Sharing</th>
                <th>Health Status</th>
              </tr>
            </thead>
            <tbody>
              ${data.dnkhSections.slice(0, 10).map(s => {
                const secAsm = data.dnkhAssessments.filter(a => a.sectionId === s.id);
                const l1Count = secAsm.filter(a => a.level === 1).length;
                const l2Count = secAsm.filter(a => a.level === 2).length;
                const l3Count = secAsm.filter(a => a.level === 3).length;
                const l4Count = secAsm.filter(a => a.level === 4).length;
                return `
                  <tr>
                    <td><strong style="color: ${s.color}; font-family: var(--dn-font-mono);">${s.code}</strong> - ${s.name}</td>
                    <td><span class="capability-badge lvl-0">2 Aware</span></td>
                    <td><span class="capability-badge lvl-1">${l1Count || 1} Guided</span></td>
                    <td><span class="capability-badge lvl-2">${l2Count || 2} Capable</span></td>
                    <td><span class="capability-badge lvl-3">${l3Count || 1} Applied</span></td>
                    <td><span class="capability-badge lvl-4">${l4Count || 1} Mentor</span></td>
                    <td><span class="quick-link-badge" style="color: var(--dn-green);">Self-Reliant</span></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      `;
    } else if (tab === 'topic_coverage') {
      return `
        <div class="matrix-table-wrap">
          <table class="matrix-table">
            <thead>
              <tr>
                <th>Core DNA Topic</th>
                <th>Owner Section</th>
                <th>Assessed Associates</th>
                <th>Level Distribution</th>
                <th>Coverage Health</th>
              </tr>
            </thead>
            <tbody>
              ${data.dnkhSections.flatMap(s => (s.starterTopics || []).slice(0, 2).map(topic => ({ topic, section: s }))).slice(0, 12).map(item => `
                <tr>
                  <td><strong>${item.topic}</strong></td>
                  <td><span class="section-code-pill">${item.section.code}</span></td>
                  <td>3 Associates</td>
                  <td><span class="capability-badge lvl-1">1 L1</span> <span class="capability-badge lvl-2">1 L2</span> <span class="capability-badge lvl-3">1 L3</span></td>
                  <td><span class="quick-link-badge" style="color: var(--dn-green);">Adequate Coverage</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    } else if (tab === 'owner_coverage') {
      return `
        <div class="matrix-table-wrap">
          <table class="matrix-table">
            <thead>
              <tr>
                <th>DNA Topic</th>
                <th>Primary Owner</th>
                <th>Secondary Backup</th>
                <th>Continuity Status</th>
              </tr>
            </thead>
            <tbody>
              ${data.dnkhSections.slice(0, 8).map(s => `
                <tr>
                  <td><strong>${(s.starterTopics || ['Standard Work'])[0]}</strong></td>
                  <td>${s.head}</td>
                  <td>${(s.windowPersons || ['Assigned SME'])[0]}</td>
                  <td><span class="quick-link-badge" style="color: var(--dn-green);">Dual-Covered</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    } else if (tab === 'expertise_coverage') {
      return `
        <div class="matrix-table-wrap">
          <table class="matrix-table">
            <thead>
              <tr>
                <th>Domain / Technology</th>
                <th>Section</th>
                <th>Verified Subject Experts</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${data.dnkhExperts.map(e => {
                const sec = data.dnkhSections.find(s => s.id === e.sectionId);
                return `
                  <tr>
                    <td><strong>${(e.skills || ['General'])[0]}</strong></td>
                    <td>${sec ? sec.code : ''}</td>
                    <td>${e.name} (${e.role})</td>
                    <td><span class="quick-link-badge" style="color: var(--dn-green);">Verified SME</span></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      `;
    } else if (tab === 'missing_evidence') {
      const pendingAsm = data.dnkhAssessments.filter(a => a.reviewStatus !== 'Verified');
      return `
        <div class="matrix-table-wrap">
          <table class="matrix-table">
            <thead>
              <tr>
                <th>Associate</th>
                <th>Topic</th>
                <th>Target Level</th>
                <th>Submitted Evidence</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${pendingAsm.length > 0 ? pendingAsm.map(a => `
                <tr>
                  <td><strong>${a.employeeName}</strong></td>
                  <td>${a.topicName}</td>
                  <td><span class="capability-badge lvl-${a.level}">${a.levelTitle}</span></td>
                  <td style="font-size: 0.78rem;">${a.evidenceSummary}</td>
                  <td>
                    <button type="button" class="btn-dnkh primary" style="padding: 0.25rem 0.55rem; font-size: 0.72rem;" onclick="window.DNKH_APP.verifyCapabilityEvidence('${a.id}')">
                      Confirm Evidence
                    </button>
                  </td>
                </tr>
              `).join('') : '<tr><td colspan="5" style="text-align: center; color: var(--dn-green);">All capability assessments have verified evidence!</td></tr>'}
            </tbody>
          </table>
        </div>
      `;
    } else if (tab === 'training_needs') {
      return `
        <div class="matrix-table-wrap">
          <table class="matrix-table">
            <thead>
              <tr>
                <th>Section</th>
                <th>Identified Gap</th>
                <th>Recommended Path</th>
                <th>Target Level</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span class="section-code-pill">QA</span></td>
                <td>High Voltage Safety & Insulation Testing</td>
                <td>Automotive Electrical Systems Curriculum</td>
                <td><span class="capability-badge lvl-2">L2: Skill</span></td>
                <td><button type="button" class="btn-dnkh secondary" style="font-size: 0.72rem; padding: 0.25rem 0.5rem;" onclick="window.DNKH_APP.switchView('learning')">Enroll</button></td>
              </tr>
              <tr>
                <td><span class="section-code-pill">PE</span></td>
                <td>PLC Ladder Logic & Interlock Standards</td>
                <td>Production Engineering Core Competency</td>
                <td><span class="capability-badge lvl-3">L3: Experience</span></td>
                <td><button type="button" class="btn-dnkh secondary" style="font-size: 0.72rem; padding: 0.25rem 0.5rem;" onclick="window.DNKH_APP.switchView('learning')">Enroll</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    } else if (tab === 'continuity_risks') {
      return `
        <div class="matrix-table-wrap">
          <table class="matrix-table">
            <thead>
              <tr>
                <th>Critical Manufacturing Topic</th>
                <th>Current Key Resource</th>
                <th>Risk Level</th>
                <th>Mitigation / Succession Plan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Stator Coil Laser Stripping Fine Tuning</strong></td>
                <td>Somchai Prasert (Reviewer)</td>
                <td><span class="severity-chip high">Medium Risk</span></td>
                <td>Mentoring 2 junior associates to Level 3 by Q3 2026</td>
              </tr>
              <tr>
                <td><strong>High-Voltage Alternator End-of-Line Tester Calibration</strong></td>
                <td>Kenji Nomura (Head Section)</td>
                <td><span class="severity-chip medium">Monitored</span></td>
                <td>Standard operating procedure published to e-SMART ISO</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    } else if (tab === 'development_plans') {
      return `
        <div class="matrix-table-wrap">
          <table class="matrix-table">
            <thead>
              <tr>
                <th>Associate</th>
                <th>Target Topic</th>
                <th>Current ➔ Target</th>
                <th>Mentor</th>
                <th>Target Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Sample Contributor</strong></td>
                <td>Stator Coil Winding Calibration</td>
                <td><span class="capability-badge lvl-1">L1</span> ➔ <span class="capability-badge lvl-2">L2</span></td>
                <td>Somchai Prasert (Reviewer)</td>
                <td>2026-11-30</td>
                <td><span class="quick-link-badge" style="color: var(--dn-cyan);">In Progress</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    }
    return '';
  }

  function switchCapabilityView(subTab) {
    DNKH_STATE.activeCapabilityTab = subTab;
    renderCapabilityView();
  }

  // LEARNING VIEW
  function renderLearningView() {
    const stage = document.getElementById('view-learning');
    if (!stage || !DNKH_STATE.data) return;

    const paths = DNKH_STATE.data.dnkhLearningPaths || [];

    stage.innerHTML = `
      <div class="dnkh-section-heading" style="margin-top: 0;">
        <div>
          <h2><i class="fa-solid fa-chalkboard-user"></i> ${t('nav_learning')}</h2>
          <p>Role-based capability curricula, modular hours, and verifiable evidence requirements</p>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem;">
        ${paths.map(p => `
          <div class="record-card">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
              <span class="section-code-pill">${p.badge}</span>
              <span style="font-size: 0.75rem; color: var(--dn-cyan);"><i class="fa-solid fa-clock"></i> ${p.duration}</span>
            </div>
            <h3 style="margin: 0 0 0.5rem 0; font-size: 1.1rem;">${p.title}</h3>
            <p style="margin: 0 0 0.85rem 0; font-size: 0.78rem; color: var(--dn-text-secondary);">${p.description}</p>
            <div style="border-top: 1px solid var(--dn-border); padding-top: 0.75rem; font-size: 0.75rem;">
              <strong>Stages:</strong> ${(p.stages || []).map(s => `<span class="record-tag-chip">${s.stageName}</span>`).join(' ')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // REVIEW CENTER VIEW (8 SUB-QUEUES)
  function renderReviewsView() {
    const stage = document.getElementById('view-reviews');
    if (!stage || !DNKH_STATE.data) return;

    const queue = DNKH_STATE.data.dnkhReviewQueue;
    let filtered = queue;

    if (DNKH_STATE.activeReviewQueue === 'my_assigned') {
      filtered = queue.filter(q => q.assignedTo.includes('Reviewer') || q.assignedTo.includes('Window') || q.assignedTo.includes('Head'));
    } else if (DNKH_STATE.activeReviewQueue === 'initial_check') {
      filtered = queue.filter(q => q.step.includes('Initial'));
    } else if (DNKH_STATE.activeReviewQueue === 'technical_review') {
      filtered = queue.filter(q => q.step.includes('Technical'));
    } else if (DNKH_STATE.activeReviewQueue === 'revision_required') {
      filtered = queue.filter(q => q.status.includes('Revision'));
    } else if (DNKH_STATE.activeReviewQueue === 'pending_approval') {
      filtered = queue.filter(q => q.step.includes('Approval'));
    } else if (DNKH_STATE.activeReviewQueue === 'overdue') {
      filtered = queue.filter(q => q.priority === 'Urgent' || q.priority === 'High');
    }

    stage.innerHTML = `
      <div class="dnkh-section-heading" style="margin-top: 0;">
        <div>
          <h2><i class="fa-solid fa-clipboard-check"></i> ${t('nav_reviews')}</h2>
          <p>Workflow approval queue: Window Person completeness check, technical review, and section head approval</p>
        </div>
      </div>

      <!-- 8 Review Sub-Queues -->
      <div class="microsite-tab-bar" style="overflow-x: auto; white-space: nowrap; margin-bottom: 1.25rem;">
        <button type="button" class="btn-microsite-tab ${DNKH_STATE.activeReviewQueue === 'all' ? 'active' : ''}" onclick="window.DNKH_APP.switchReviewQueue('all')">
          All Active (${queue.length})
        </button>
        <button type="button" class="btn-microsite-tab ${DNKH_STATE.activeReviewQueue === 'my_assigned' ? 'active' : ''}" onclick="window.DNKH_APP.switchReviewQueue('my_assigned')">
          My Assigned
        </button>
        <button type="button" class="btn-microsite-tab ${DNKH_STATE.activeReviewQueue === 'initial_check' ? 'active' : ''}" onclick="window.DNKH_APP.switchReviewQueue('initial_check')">
          Initial Check
        </button>
        <button type="button" class="btn-microsite-tab ${DNKH_STATE.activeReviewQueue === 'technical_review' ? 'active' : ''}" onclick="window.DNKH_APP.switchReviewQueue('technical_review')">
          Technical SME Review
        </button>
        <button type="button" class="btn-microsite-tab ${DNKH_STATE.activeReviewQueue === 'revision_required' ? 'active' : ''}" onclick="window.DNKH_APP.switchReviewQueue('revision_required')">
          Revision Required
        </button>
        <button type="button" class="btn-microsite-tab ${DNKH_STATE.activeReviewQueue === 'pending_approval' ? 'active' : ''}" onclick="window.DNKH_APP.switchReviewQueue('pending_approval')">
          Pending Approval
        </button>
        <button type="button" class="btn-microsite-tab ${DNKH_STATE.activeReviewQueue === 'overdue' ? 'active' : ''}" onclick="window.DNKH_APP.switchReviewQueue('overdue')">
          Overdue Reviews
        </button>
      </div>

      <div class="matrix-table-wrap">
        <table class="matrix-table">
          <thead>
            <tr>
              <th>Queue ID</th>
              <th>Record Title</th>
              <th>Workflow Stage</th>
              <th>Submitted By</th>
              <th>Assigned Reviewer</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.length > 0 ? filtered.map(q => `
              <tr>
                <td><strong>${q.id}</strong></td>
                <td><strong>${q.recordTitle}</strong></td>
                <td><span class="record-type-pill">${q.step}</span></td>
                <td>${q.submittedBy}</td>
                <td>${q.assignedTo}</td>
                <td><span class="severity-chip ${q.priority === 'Urgent' || q.priority === 'High' ? 'critical' : 'medium'}">${q.priority}</span></td>
                <td><span class="quick-link-badge">${q.status}</span></td>
                <td>
                  <button type="button" class="btn-dnkh primary" style="padding: 0.3rem 0.65rem; font-size: 0.75rem;" onclick="window.DNKH_APP.openReviewActionModal('${q.id}')">
                    <i class="fa-solid fa-stamp"></i> Review Decision
                  </button>
                </td>
              </tr>
            `).join('') : '<tr><td colspan="8" style="text-align: center; color: var(--dn-text-muted);">No review items in this sub-queue.</td></tr>'}
          </tbody>
        </table>
      </div>
    `;
  }

  function switchReviewQueue(queueKey) {
    DNKH_STATE.activeReviewQueue = queueKey;
    renderReviewsView();
  }

  // WORKSPACE VIEW
  function renderWorkspaceView() {
    const stage = document.getElementById('view-workspace');
    if (!stage || !DNKH_STATE.data) return;

    stage.innerHTML = `
      <div class="dnkh-section-heading" style="margin-top: 0;">
        <div>
          <h2><i class="fa-solid fa-user-gear"></i> ${t('nav_workspace')}</h2>
          <p>Personal drafts, submitted records, assigned reviews, and saved bookmarks</p>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
        <div class="dnkh-metric-card" style="flex-direction: column; align-items: flex-start;">
          <h3 style="color: var(--dn-cyan); margin-bottom: 0.5rem;"><i class="fa-solid fa-bookmark"></i> Saved Records (${DNKH_STATE.bookmarks.size})</h3>
          <p style="font-size: 0.8rem; color: var(--dn-text-secondary); margin-bottom: 1rem;">Fast access to your bookmarked engineering knowledge and standards.</p>
          <button type="button" class="btn-dnkh secondary" onclick="window.DNKH_APP.toggleDrawer('drawer-bookmarks', true)">Open Bookmarks Drawer</button>
        </div>
        <div class="dnkh-metric-card" style="flex-direction: column; align-items: flex-start;">
          <h3 style="color: var(--dn-green); margin-bottom: 0.5rem;"><i class="fa-solid fa-file-pen"></i> My Contributions</h3>
          <p style="font-size: 0.8rem; color: var(--dn-text-secondary); margin-bottom: 1rem;">Create new knowledge or draft 8D cases for review.</p>
          <button type="button" class="btn-dnkh primary" onclick="window.DNKH_APP.openCreateRecordModal()">+ Create New Record</button>
        </div>
      </div>
    `;
  }

  // DASHBOARDS VIEW
  function renderDashboardsView() {
    const stage = document.getElementById('view-dashboards');
    if (!stage || !DNKH_STATE.data) return;

    stage.innerHTML = `
      <div class="dnkh-section-heading" style="margin-top: 0;">
        <div>
          <h2><i class="fa-solid fa-chart-line"></i> Enterprise Dashboards</h2>
          <p>Management overview, Section completion metrics, and Risk indicators</p>
        </div>
      </div>

      <div class="dnkh-metrics-grid">
        <div class="dnkh-metric-card">
          <div class="metric-card-icon red"><i class="fa-solid fa-shield-halved"></i></div>
          <div class="metric-card-body">
            <h3>98.2%</h3>
            <p>8D Closure Effectiveness</p>
          </div>
        </div>
        <div class="dnkh-metric-card">
          <div class="metric-card-icon blue"><i class="fa-solid fa-users"></i></div>
          <div class="metric-card-body">
            <h3>${DNKH_STATE.data.dnkhSections.length} / ${DNKH_STATE.data.dnkhSections.length}</h3>
            <p>Active DNKH Sections</p>
          </div>
        </div>
        <div class="dnkh-metric-card">
          <div class="metric-card-icon green"><i class="fa-solid fa-graduation-cap"></i></div>
          <div class="metric-card-body">
            <h3>86.5%</h3>
            <p>Succession Risk Coverage</p>
          </div>
        </div>
      </div>

      <div style="background: var(--dn-surface-card); border: 1px solid var(--dn-border); border-radius: 12px; padding: 1.5rem; margin-top: 1.5rem;">
        <h3 style="margin: 0 0 1rem 0;"><i class="fa-solid fa-chart-pie text-cyan"></i> Records by DNKH Division</h3>
        <div style="max-height: 320px; display: flex; align-items: center; justify-content: center;">
          <canvas id="dnkh-records-chart" style="max-height: 300px;"></canvas>
        </div>
      </div>
    `;

    // Render Chart.js
    setTimeout(() => {
      const ctx = document.getElementById('dnkh-records-chart');
      if (ctx && window.Chart) {
        const labels = DNKH_STATE.data.dnkhSections.slice(0, 8).map(s => s.code);
        const counts = DNKH_STATE.data.dnkhSections.slice(0, 8).map(s => {
          return DNKH_STATE.data.dnkhRecords.filter(r => r.ownerSectionId === s.id).length || 2;
        });

        new window.Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Published Records',
              data: counts,
              backgroundColor: ['#e60012', '#0284c7', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#d97706', '#ec4899']
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false }
            },
            scales: {
              y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.06)' } },
              x: { grid: { display: false } }
            }
          }
        });
      }
    }, 100);
  }

  // ADMINISTRATION VIEW
  function renderAdminView() {
    const stage = document.getElementById('view-admin');
    if (!stage || !DNKH_STATE.data) return;

    const sections = DNKH_STATE.data.dnkhSections;
    const audit = DNKH_STATE.data.dnkhAuditLog;

    stage.innerHTML = `
      <div class="dnkh-section-heading" style="margin-top: 0;">
        <div>
          <h2><i class="fa-solid fa-gears"></i> ${t('nav_admin')}</h2>
          <p>Configure organizational sections, review rules, CSV bulk imports, and audit trails</p>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button type="button" class="btn-dnkh secondary" onclick="window.DNKH_APP.openBulkImportModal()">
            <i class="fa-solid fa-file-import"></i> ${t('bulk_import')}
          </button>
          <button type="button" class="btn-hero-primary" onclick="window.DNKH_APP.openAdminSectionModal()">
            <i class="fa-solid fa-plus"></i> Add New Section
          </button>
        </div>
      </div>

      <!-- Admin Sub-Tabs -->
      <div class="microsite-tab-bar" style="margin-bottom: 1.25rem;">
        <button type="button" class="btn-microsite-tab ${DNKH_STATE.activeAdminTab === 'sections' ? 'active' : ''}" onclick="window.DNKH_APP.switchAdminTab('sections')">
          Section Master Engine
        </button>
        <button type="button" class="btn-microsite-tab ${DNKH_STATE.activeAdminTab === 'csv_ops' ? 'active' : ''}" onclick="window.DNKH_APP.switchAdminTab('csv_ops')">
          Bulk CSV Operations & Export
        </button>
        <button type="button" class="btn-microsite-tab ${DNKH_STATE.activeAdminTab === 'audit_log' ? 'active' : ''}" onclick="window.DNKH_APP.switchAdminTab('audit_log')">
          Audit Trail Log
        </button>
      </div>

      <div id="admin-tab-content">
        ${renderAdminSubTabContent(sections, audit)}
      </div>
    `;
  }

  function renderAdminSubTabContent(sections, audit) {
    const tab = DNKH_STATE.activeAdminTab;

    if (tab === 'sections') {
      return `
        <h3 style="margin: 0 0 0.75rem 0;"><i class="fa-solid fa-building-user text-cyan"></i> Configurable Section Master</h3>
        <p style="font-size: 0.8rem; color: var(--dn-text-secondary); margin-bottom: 1rem;">
          Add, edit, deactivate, or merge sections dynamically without source-code modifications.
        </p>
        <div class="matrix-table-wrap">
          <table class="matrix-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Section Name</th>
                <th>Head</th>
                <th>Window Persons</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${sections.map(s => `
                <tr>
                  <td><strong style="color: ${s.color}; font-family: var(--dn-font-mono);">${s.code}</strong></td>
                  <td>${s.name}</td>
                  <td>${s.head}</td>
                  <td>${(s.windowPersons || []).join(', ')}</td>
                  <td>
                    <span class="quick-link-badge" style="color: ${s.isActive ? 'var(--dn-green)' : 'var(--dn-text-muted)'};">
                      ${s.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div style="display: flex; gap: 0.35rem;">
                      <button type="button" class="btn-dnkh secondary" style="padding: 0.2rem 0.5rem; font-size: 0.72rem;" onclick="window.DNKH_APP.editSection('${s.id}')">
                        <i class="fa-solid fa-pen-to-square"></i> Edit
                      </button>
                      <button type="button" class="btn-dnkh secondary" style="padding: 0.2rem 0.5rem; font-size: 0.72rem;" onclick="window.DNKH_APP.toggleSectionStatus('${s.id}')">
                        ${s.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    } else if (tab === 'csv_ops') {
      return `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
          <div class="dnkh-metric-card" style="flex-direction: column; align-items: flex-start;">
            <h3 style="color: var(--dn-cyan); margin-bottom: 0.5rem;"><i class="fa-solid fa-file-csv"></i> Bulk CSV Import</h3>
            <p style="font-size: 0.82rem; color: var(--dn-text-secondary); margin-bottom: 1rem;">
              Upload batches of standard work or troubleshooting records with automatic schema validation and duplicate checking.
            </p>
            <div style="display: flex; gap: 0.5rem;">
              <button type="button" class="btn-dnkh secondary" onclick="window.DNKH_APP.downloadCSVTemplate()">Download Template</button>
              <button type="button" class="btn-dnkh primary" onclick="window.DNKH_APP.openBulkImportModal()">Launch Import Wizard</button>
            </div>
          </div>
          <div class="dnkh-metric-card" style="flex-direction: column; align-items: flex-start;">
            <h3 style="color: var(--dn-green); margin-bottom: 0.5rem;"><i class="fa-solid fa-file-export"></i> Enterprise Data Export</h3>
            <p style="font-size: 0.82rem; color: var(--dn-text-secondary); margin-bottom: 1rem;">
              Export full knowledge repository or audit logs to CSV or JSON formats for offline archiving and compliance.
            </p>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <button type="button" class="btn-dnkh secondary" onclick="window.DNKH_APP.exportRecordsCSV()"><i class="fa-solid fa-file-csv"></i> Export CSV</button>
              <button type="button" class="btn-dnkh secondary" onclick="window.DNKH_APP.exportRecordsJSON()"><i class="fa-solid fa-code"></i> Export JSON</button>
              <button type="button" class="btn-dnkh secondary" onclick="window.DNKH_APP.exportAuditCSV()"><i class="fa-solid fa-clock-rotate-left"></i> Export Audit</button>
            </div>
          </div>
        </div>
      `;
    } else if (tab === 'audit_log') {
      return `
        <h3 style="margin: 0 0 0.75rem 0;"><i class="fa-solid fa-clock-rotate-left text-red"></i> ${t('audit_log')}</h3>
        <div class="matrix-table-wrap">
          <table class="matrix-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>User</th>
                <th>Action</th>
                <th>Target</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              ${audit.map(a => `
                <tr>
                  <td style="font-family: var(--dn-font-mono); font-size: 0.75rem;">${a.timestamp}</td>
                  <td><strong>${a.user}</strong></td>
                  <td><span class="section-code-pill">${a.action}</span></td>
                  <td>${a.target}</td>
                  <td style="font-size: 0.78rem;">${a.details}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }
    return '';
  }

  function switchAdminTab(tabName) {
    DNKH_STATE.activeAdminTab = tabName;
    renderAdminView();
  }

  // HELP VIEW
  function renderHelpView() {
    const stage = document.getElementById('view-help');
    if (!stage) return;

    stage.innerHTML = `
      <div class="dnkh-section-heading" style="margin-top: 0;">
        <div>
          <h2><i class="fa-solid fa-circle-question"></i> ${t('nav_help')}</h2>
          <p>System manual, role definitions, 8D troubleshooting guide, and interactive walkthrough</p>
        </div>
        <button type="button" class="btn-hero-primary" onclick="window.DNKH_APP.startGuidedTour()">
          <i class="fa-solid fa-wand-magic-sparkles"></i> ${t('guided_tour')}
        </button>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
        <div class="dnkh-metric-card" style="flex-direction: column; align-items: flex-start;">
          <h3 style="color: var(--dn-cyan); margin-bottom: 0.5rem;"><i class="fa-solid fa-id-badge"></i> User Roles & Access Hierarchy</h3>
          <p style="font-size: 0.8rem; color: var(--dn-text-secondary); line-height: 1.6;">
            <strong>Viewer:</strong> Search, view, bookmark, and download authorized SOPs.<br>
            <strong>Contributor:</strong> Draft and submit own knowledge and 8D cases.<br>
            <strong>Window Person:</strong> Verify section completeness and assign reviewers.<br>
            <strong>Reviewer / SME:</strong> Review technical validity and evidence.<br>
            <strong>Head Section / Approver:</strong> Authorize official publication.<br>
            <strong>Administrator:</strong> Manage taxonomy, master sections, and audit trails.
          </p>
        </div>

        <div class="dnkh-metric-card" style="flex-direction: column; align-items: flex-start;">
          <h3 style="color: var(--dn-red); margin-bottom: 0.5rem;"><i class="fa-solid fa-wrench"></i> 8D Troubleshooting Method</h3>
          <p style="font-size: 0.8rem; color: var(--dn-text-secondary); line-height: 1.6;">
            Follow DENSO global quality guidelines:<br>
            1. Problem Statement (5W1H) with photo evidence.<br>
            2. Immediate containment to protect customer lines.<br>
            3. Root Cause Investigation using 5-Why and Fishbone (5M1E).<br>
            4. Permanent Poka-Yoke error-proofing countermeasures.<br>
            5. Horizontal Yokoten deployment to sibling lines.
          </p>
        </div>
      </div>
    `;
  }

  // --- 6. MODALS & FORMS ---

  // RECORD DETAIL MODAL
  function openRecordDetail(recordId) {
    const r = DNKH_STATE.data.dnkhRecords.find(x => x.id === recordId);
    if (!r) return;

    const modal = document.getElementById('modal-record-detail');
    if (!modal) return;

    modal.querySelector('.dnkh-modal-title').textContent = r.title;
    modal.querySelector('.dnkh-modal-body').innerHTML = `
      <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
        <span class="record-type-pill">${r.recordType.replace('rt-', '').toUpperCase()}</span>
        <span class="section-code-pill">${r.ownerSectionId.replace('sec-', '').toUpperCase()}</span>
        <span class="quick-link-badge">${r.status}</span>
        <span style="font-size: 0.75rem; color: var(--dn-text-muted); margin-left: auto;">Version ${r.version}</span>
      </div>
      <p style="font-size: 0.9rem; color: var(--dn-cyan); line-height: 1.6; margin-bottom: 1.25rem;">${r.summary}</p>
      <div style="background: var(--dn-surface); border: 1px solid var(--dn-border); border-radius: 8px; padding: 1.25rem; font-size: 0.85rem; line-height: 1.7; margin-bottom: 1.5rem;">
        ${r.detailedContent ? r.detailedContent.replace(/###/g, '<h4 style="color: var(--dn-text); margin: 1rem 0 0.5rem 0;">').replace(/\n/g, '<br>') : ''}
      </div>
      <h4 style="margin: 0 0 0.5rem 0;"><i class="fa-solid fa-paperclip text-cyan"></i> Supporting Evidence & Controlled Links</h4>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        ${(r.evidenceFiles || []).map(f => `
          <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.03); padding: 0.5rem 0.85rem; border-radius: 6px;">
            <span><i class="fa-solid fa-file-pdf text-red"></i> ${f.name} (${f.size})</span>
            <button type="button" class="btn-dnkh secondary" style="padding: 0.2rem 0.5rem; font-size: 0.72rem;" onclick="window.DNKH_APP.downloadSampleAttachment('${f.name}')">Download</button>
          </div>
        `).join('')}
      </div>
    `;

    modal.classList.add('active');
  }

  // 8D TROUBLESHOOTING DETAIL MODAL (FULL 9-STEP DENSO REPORT)
  function openTroubleshootingDetail(caseId) {
    const c = DNKH_STATE.data.dnkhTroubleshootingCases.find(x => x.id === caseId);
    if (!c) return;

    const modal = document.getElementById('modal-troubleshooting-detail');
    if (!modal) return;

    modal.querySelector('.dnkh-modal-title').textContent = `${c.id}: ${c.caseTitle}`;
    modal.querySelector('.dnkh-modal-body').innerHTML = `
      <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; align-items: center;">
        <span class="severity-chip ${c.severity.toLowerCase().includes('critical') ? 'critical' : 'high'}">${c.severity}</span>
        <span class="quick-link-badge">${c.status}</span>
        <span class="section-code-pill">${c.sectionId.replace('sec-', '').toUpperCase()}</span>
        <button type="button" class="btn-dnkh secondary" style="margin-left: auto; padding: 0.25rem 0.65rem; font-size: 0.75rem;" onclick="window.print()">
          <i class="fa-solid fa-print"></i> ${t('btn_print')}
        </button>
      </div>

      <!-- D1: Team Formation -->
      <div style="background: var(--dn-surface); border: 1px solid var(--dn-border); border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
        <h4 style="color: var(--dn-cyan); margin: 0 0 0.5rem 0;"><i class="fa-solid fa-users"></i> D1: Cross-Functional Team Formation</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem; font-size: 0.8rem;">
          <div><strong>Champion:</strong> Kenji Nomura (Head Section)</div>
          <div><strong>Leader (PIC):</strong> ${c.pic}</div>
          <div><strong>Members:</strong> QA Specialist, PE Engineer, Production Leader</div>
        </div>
      </div>

      <!-- D2: Problem Statement Card -->
      <div style="background: var(--dn-surface); border: 1px solid var(--dn-border); border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
        <h4 style="color: var(--dn-red); margin: 0 0 0.5rem 0;"><i class="fa-solid fa-circle-exclamation"></i> D2: 5W1H Problem Statement & Defect Metrics</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.82rem; margin-bottom: 0.5rem;">
          <div><strong>What:</strong> ${c.problemWhat}</div>
          <div><strong>Where:</strong> ${c.problemWhere}</div>
          <div><strong>Product / Model:</strong> ${c.product}</div>
          <div><strong>Defect Category:</strong> ${c.defectCategory}</div>
        </div>
        <div style="background: rgba(0,0,0,0.25); padding: 0.65rem; border-radius: 6px; font-size: 0.8rem;">
          <strong>Expected Condition:</strong> ${c.expectedCondition} ➔ <strong>Measured Condition:</strong> <span style="color: #f87171; font-weight: 700;">${c.actualCondition}</span> (Defect Qty: ${c.affectedQuantity} pcs)
        </div>
      </div>

      <!-- D3: Interim Containment & Stock Verification Table -->
      <div style="background: var(--dn-surface); border: 1px solid var(--dn-border); border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
        <h4 style="color: var(--dn-amber); margin: 0 0 0.5rem 0;"><i class="fa-solid fa-shield-halved"></i> D3: Interim Containment Action & Stock Verification</h4>
        <p style="font-size: 0.8rem; margin: 0 0 0.75rem 0; color: var(--dn-text-secondary);">${c.temporaryAction}</p>
        <div class="matrix-table-wrap">
          <table class="matrix-table" style="font-size: 0.75rem;">
            <thead>
              <tr>
                <th>Stock Location</th>
                <th>Inspected</th>
                <th>Rescreened</th>
                <th>OK Qty</th>
                <th>NG Qty</th>
                <th>Disposition & Containment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Line Side WIP</td>
                <td>120 pcs</td>
                <td>120 pcs</td>
                <td>116 pcs</td>
                <td>4 pcs</td>
                <td>Scrapped immediately & quarantined</td>
              </tr>
              <tr>
                <td>Finished Goods Warehouse</td>
                <td>450 pcs</td>
                <td>450 pcs</td>
                <td>448 pcs</td>
                <td>2 pcs</td>
                <td>100% sorted with microscope verification</td>
              </tr>
              <tr>
                <td>Customer Line</td>
                <td>200 pcs</td>
                <td>200 pcs</td>
                <td>200 pcs</td>
                <td>0 pcs</td>
                <td>Resident engineer confirmed OK</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- D4: Root Cause Investigation (5-Why & Fishbone) -->
      <div style="background: var(--dn-surface); border: 1px solid var(--dn-border); border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
        <h4 style="margin: 0 0 0.75rem 0; color: var(--dn-cyan);"><i class="fa-solid fa-arrow-down-wide-short"></i> D4: Root Cause Deduction (5-Why Analysis)</h4>
        <div class="five-why-container">
          ${(c.fiveWhy || []).map((w, idx) => `
            <div class="five-why-step-card">
              <div class="five-why-num">WHY #${idx + 1}</div>
              <div style="font-weight: 600; font-size: 0.82rem; margin-bottom: 0.25rem;">${w.why}</div>
              <div style="font-size: 0.78rem; color: var(--dn-text-secondary);"><i class="fa-solid fa-arrow-right text-cyan"></i> ${w.answer}</div>
            </div>
          `).join('')}
        </div>

        <h4 style="margin: 1.25rem 0 0.5rem 0; color: var(--dn-cyan);"><i class="fa-solid fa-diagram-project"></i> Ishikawa Fishbone (5M1E Analysis)</h4>
        <div class="fishbone-grid">
          ${Object.keys(c.fishbone || {}).map(k => `
            <div class="fishbone-branch-card">
              <div class="fishbone-branch-title">${k.toUpperCase()}</div>
              <ul class="fishbone-items-list">
                ${c.fishbone[k].map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- D5, D6, D7: Permanent Countermeasure, Verification, Yokoten -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
        <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 1rem;">
          <h5 style="color: var(--dn-green); margin: 0 0 0.4rem 0;"><i class="fa-solid fa-check"></i> D5: Permanent Countermeasure (Poka-Yoke)</h5>
          <p style="margin: 0; font-size: 0.78rem; color: var(--dn-text-secondary);">${c.permanentCountermeasure}</p>
        </div>
        <div style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 8px; padding: 1rem;">
          <h5 style="color: var(--dn-blue); margin: 0 0 0.4rem 0;"><i class="fa-solid fa-chart-line"></i> D6: Verification of Effectiveness</h5>
          <p style="margin: 0; font-size: 0.78rem; color: var(--dn-text-secondary);">Defect rate confirmed 0 ppm over 30 consecutive shifts. No customer disruption.</p>
        </div>
      </div>

      <!-- D7 & D8: Yokoten & Sign-Off -->
      <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 8px; padding: 1rem;">
        <h5 style="color: var(--dn-amber); margin: 0 0 0.4rem 0;"><i class="fa-solid fa-arrows-split-up-and-left"></i> D7: Horizontal Yokoten & Recurrence Prevention</h5>
        <p style="margin: 0 0 0.5rem 0; font-size: 0.78rem; color: var(--dn-text-secondary);">${c.yokoten}</p>
        <div style="font-size: 0.72rem; color: var(--dn-text-muted); border-top: 1px solid rgba(245,158,11,0.2); padding-top: 0.5rem;">
          <strong>D8: Sign-off Confirmed:</strong> Section Head & Window Person verified and closed out on 2026-03-01.
        </div>
      </div>
    `;

    modal.classList.add('active');
  }

  // GUIDED 6-STEP CREATION WIZARD
  function openCreateRecordModal(defaultSectionId) {
    const modal = document.getElementById('modal-create-record');
    if (!modal) return;

    if (defaultSectionId) {
      DNKH_STATE.wizardDraft.sectionId = defaultSectionId;
    }

    DNKH_STATE.wizardStep = 1;
    renderWizardStep(modal);
    modal.classList.add('active');
  }

  function renderWizardStep(modal) {
    const body = modal.querySelector('.dnkh-modal-body');
    const step = DNKH_STATE.wizardStep;
    const draft = DNKH_STATE.wizardDraft;

    // Update Progress Bar
    const progressBar = document.getElementById('wizard-progress-bar-fill');
    if (progressBar) {
      const pct = Math.round((step / 6) * 100);
      progressBar.style.width = `${pct}%`;
    }

    // Update Step Pills
    modal.querySelectorAll('.wizard-step-pill').forEach(pill => {
      const pStep = parseInt(pill.getAttribute('data-step'), 10);
      pill.classList.remove('active', 'completed');
      if (pStep === step) pill.classList.add('active');
      else if (pStep < step) pill.classList.add('completed');
    });

    // Update footer button text
    const nextBtn = document.getElementById('btn-wz-next');
    if (nextBtn) {
      nextBtn.innerHTML = step === 6 
        ? '<i class="fa-solid fa-paper-plane"></i> Submit for Review' 
        : 'Continue <i class="fa-solid fa-arrow-right"></i>';
    }

    if (step === 1) {
      body.innerHTML = `
        <h4 style="margin: 0 0 1rem 0;"><i class="fa-solid fa-sitemap text-red"></i> Step 1: Classification & Scoping</h4>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Owner Section *</label>
          <select id="wz-section" class="dnkh-form-select">
            ${DNKH_STATE.data.dnkhSections.map(s => `
              <option value="${s.id}" ${draft.sectionId === s.id ? 'selected' : ''}>${s.code} - ${s.name}</option>
            `).join('')}
          </select>
        </div>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Record Type *</label>
          <select id="wz-record-type" class="dnkh-form-select">
            ${DNKH_STATE.data.dnkhRecordTypes.map(rt => `
              <option value="${rt.id}" ${draft.recordType === rt.id ? 'selected' : ''}>${rt.name}</option>
            `).join('')}
          </select>
        </div>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Title *</label>
          <input type="text" id="wz-title" class="dnkh-form-input" placeholder="e.g., Alternator Stator Winding Tension Calibration Standard" value="${draft.title || ''}">
          <div id="wz-duplicate-notice" style="display: none; margin-top: 4px; font-size: 0.75rem; color: var(--dn-amber);"></div>
        </div>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Short Summary *</label>
          <textarea id="wz-summary" class="dnkh-form-textarea" rows="2" placeholder="Brief 1-2 sentence overview of this knowledge">${draft.summary || ''}</textarea>
        </div>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Product Model / Equipment</label>
          <input type="text" id="wz-product" class="dnkh-form-input" placeholder="e.g., Alternator Line 4 / Stator Rig #02" value="${draft.productModel || ''}">
        </div>
      `;

      // Live duplicate check on title
      const titleInput = document.getElementById('wz-title');
      const dupNotice = document.getElementById('wz-duplicate-notice');
      if (titleInput && dupNotice) {
        titleInput.addEventListener('input', (e) => {
          draft.title = e.target.value;
          const query = e.target.value.trim().toLowerCase();
          if (query.length > 5) {
            const match = DNKH_STATE.data.dnkhRecords.find(r => r.title.toLowerCase().includes(query));
            if (match) {
              dupNotice.style.display = 'block';
              dupNotice.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Notice: Similar existing record found: "${match.title}".`;
            } else {
              dupNotice.style.display = 'none';
            }
          } else {
            dupNotice.style.display = 'none';
          }
        });
      }
    } else if (step === 2) {
      body.innerHTML = `
        <h4 style="margin: 0 0 1rem 0;"><i class="fa-solid fa-book text-cyan"></i> Step 2: Detailed Knowledge & Method</h4>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Purpose & Background</label>
          <textarea id="wz-bg" class="dnkh-form-textarea" rows="2" placeholder="Why is this knowledge required? What problem does it solve?">${draft.purposeBg || ''}</textarea>
        </div>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Standard Method & Key Parameters</label>
          <textarea id="wz-content" class="dnkh-form-textarea" rows="4" placeholder="Detailed sequence, parameters, and cautions">${draft.standardMethod || ''}</textarea>
        </div>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Critical Cautions & Quality Checkpoints</label>
          <textarea id="wz-cautions" class="dnkh-form-textarea" rows="2" placeholder="Key failure modes to watch out for">${draft.cautions || ''}</textarea>
        </div>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Tags (comma separated)</label>
          <input type="text" id="wz-tags" class="dnkh-form-input" placeholder="Standard Work, Calibration, High Voltage" value="${draft.tags || ''}">
        </div>
      `;
    } else if (step === 3) {
      body.innerHTML = `
        <h4 style="margin: 0 0 1rem 0;"><i class="fa-solid fa-wrench text-blue"></i> Step 3: Practical Genba Application</h4>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Genba Application Context</label>
          <textarea id="wz-genba" class="dnkh-form-textarea" rows="3" placeholder="Where in the production line or office workflow is this executed?">${draft.genbaApplication || ''}</textarea>
        </div>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Special Tools, Jigs & Fixtures Required</label>
          <input type="text" id="wz-tools" class="dnkh-form-input" placeholder="e.g., Torque Wrench TW-50, Calibration Pin Set" value="${draft.toolsFixtures || ''}">
        </div>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Quality & Safety Checkpoints</label>
          <input type="text" id="wz-checkpoints" class="dnkh-form-input" placeholder="e.g., Check zero balance before each shift" value="${draft.checkpoints || ''}">
        </div>
      `;
    } else if (step === 4) {
      body.innerHTML = `
        <h4 style="margin: 0 0 1rem 0;"><i class="fa-solid fa-lightbulb text-amber"></i> Step 4: Experience & Lessons Learned</h4>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Success Factors (What went well)</label>
          <textarea id="wz-well" class="dnkh-form-textarea" rows="2" placeholder="What practices ensured success?">${draft.whatWentWell || ''}</textarea>
        </div>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Pitfalls & Failures to Avoid</label>
          <textarea id="wz-pitfalls" class="dnkh-form-textarea" rows="2" placeholder="Past near-misses or incorrect operator habits">${draft.pitfallsToAvoid || ''}</textarea>
        </div>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Linked 8D Case Reference</label>
          <select id="wz-prior-case" class="dnkh-form-select">
            <option value="None">None</option>
            ${DNKH_STATE.data.dnkhTroubleshootingCases.map(c => `
              <option value="${c.id}">${c.id} - ${c.caseTitle}</option>
            `).join('')}
          </select>
        </div>
      `;
    } else if (step === 5) {
      body.innerHTML = `
        <h4 style="margin: 0 0 1rem 0;"><i class="fa-solid fa-file-shield text-green"></i> Step 5: Evidence & Controlled Links</h4>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Evidence Type</label>
          <select id="wz-evidence-type" class="dnkh-form-select">
            <option value="SOP Controlled Document">SOP Controlled Document</option>
            <option value="Engineering Drawing">Engineering Drawing</option>
            <option value="Calibration Certificate">Calibration Certificate</option>
            <option value="Photo Verification">Photo Verification</option>
          </select>
        </div>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Connected Enterprise System</label>
          <select id="wz-system" class="dnkh-form-select">
            <option value="e-SMART ISO">e-SMART ISO</option>
            <option value="MMS">MMS (Maintenance)</option>
            <option value="DIS">DIS (Drawing Info)</option>
            <option value="DPS">DPS (Part Standards)</option>
            <option value="QA Network">QA Network</option>
          </select>
        </div>
        <div style="border: 2px dashed var(--dn-border); border-radius: 8px; padding: 1.5rem; text-align: center; background: rgba(255,255,255,0.02);">
          <i class="fa-solid fa-cloud-arrow-up text-cyan" style="font-size: 1.8rem; margin-bottom: 0.5rem;"></i>
          <p style="margin: 0; font-size: 0.8rem;">Evidence Attached: <strong>Standard_Work_Sheet_v1.0.pdf</strong> (1.4 MB)</p>
        </div>
      `;
    } else if (step === 6) {
      body.innerHTML = `
        <h4 style="margin: 0 0 1rem 0;"><i class="fa-solid fa-id-badge text-purple"></i> Step 6: Ownership, Governance & Submit</h4>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Knowledge Owner / Primary Author</label>
          <input type="text" id="wz-owner" class="dnkh-form-input" value="${draft.knowledgeOwner || 'Associate (Contributor)'}">
        </div>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Assigned Technical Reviewer (SME)</label>
          <select id="wz-reviewer" class="dnkh-form-select">
            ${DNKH_STATE.data.dnkhExperts.map(e => `
              <option value="${e.name}">${e.name} (${e.role})</option>
            `).join('')}
          </select>
        </div>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Confidentiality Level</label>
          <select id="wz-confidentiality" class="dnkh-form-select">
            <option value="Internal - DNKH Only">Internal - DNKH Only</option>
            <option value="Restricted - Manufacturing Line">Restricted - Manufacturing Line</option>
            <option value="Public">Public</option>
          </select>
        </div>
        <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 1rem; font-size: 0.8rem;">
          <i class="fa-solid fa-circle-check text-green"></i> <strong>Ready to submit to Section Review Center.</strong><br>
          The assigned Window Person and Technical Reviewer will be notified immediately.
        </div>
      `;
    }
  }

  function pullCurrentWizardStepValues() {
    const step = DNKH_STATE.wizardStep;
    const draft = DNKH_STATE.wizardDraft;

    if (step === 1) {
      const sec = document.getElementById('wz-section');
      const rt = document.getElementById('wz-record-type');
      const title = document.getElementById('wz-title');
      const sum = document.getElementById('wz-summary');
      const prod = document.getElementById('wz-product');
      if (sec) draft.sectionId = sec.value;
      if (rt) draft.recordType = rt.value;
      if (title) draft.title = title.value;
      if (sum) draft.summary = sum.value;
      if (prod) draft.productModel = prod.value;
    } else if (step === 2) {
      const bg = document.getElementById('wz-bg');
      const cnt = document.getElementById('wz-content');
      const cau = document.getElementById('wz-cautions');
      const tags = document.getElementById('wz-tags');
      if (bg) draft.purposeBg = bg.value;
      if (cnt) draft.standardMethod = cnt.value;
      if (cau) draft.cautions = cau.value;
      if (tags) draft.tags = tags.value;
    } else if (step === 3) {
      const genba = document.getElementById('wz-genba');
      const tools = document.getElementById('wz-tools');
      const checks = document.getElementById('wz-checkpoints');
      if (genba) draft.genbaApplication = genba.value;
      if (tools) draft.toolsFixtures = tools.value;
      if (checks) draft.checkpoints = checks.value;
    } else if (step === 4) {
      const well = document.getElementById('wz-well');
      const pit = document.getElementById('wz-pitfalls');
      const pc = document.getElementById('wz-prior-case');
      if (well) draft.whatWentWell = well.value;
      if (pit) draft.pitfallsToAvoid = pit.value;
      if (pc) draft.priorCaseRef = pc.value;
    } else if (step === 5) {
      const et = document.getElementById('wz-evidence-type');
      const sys = document.getElementById('wz-system');
      if (et) draft.evidenceType = et.value;
      if (sys) draft.connectedSystem = sys.value;
    } else if (step === 6) {
      const own = document.getElementById('wz-owner');
      const rev = document.getElementById('wz-reviewer');
      const conf = document.getElementById('wz-confidentiality');
      if (own) draft.knowledgeOwner = own.value;
      if (rev) draft.reviewer = rev.value;
      if (conf) draft.confidentiality = conf.value;
    }
  }

  function goToWizardStep(stepNum) {
    pullCurrentWizardStepValues();
    DNKH_STATE.wizardStep = stepNum;
    const modal = document.getElementById('modal-create-record');
    if (modal) renderWizardStep(modal);
  }

  function nextWizardStep() {
    pullCurrentWizardStepValues();

    if (DNKH_STATE.wizardStep === 1) {
      if (!DNKH_STATE.wizardDraft.title || !DNKH_STATE.wizardDraft.title.trim()) {
        showToast('Please enter a record title before proceeding.', 'error');
        return;
      }
    }

    if (DNKH_STATE.wizardStep < 6) {
      DNKH_STATE.wizardStep++;
      const modal = document.getElementById('modal-create-record');
      renderWizardStep(modal);
    } else {
      submitWizardRecord();
    }
  }

  function prevWizardStep() {
    pullCurrentWizardStepValues();
    if (DNKH_STATE.wizardStep > 1) {
      DNKH_STATE.wizardStep--;
      const modal = document.getElementById('modal-create-record');
      renderWizardStep(modal);
    }
  }

  function saveWizardDraft() {
    pullCurrentWizardStepValues();
    try {
      localStorage.setItem(LS_KEY_DRAFT, JSON.stringify(DNKH_STATE.wizardDraft));
      showToast('Wizard draft saved to local storage.', 'success');
    } catch (e) {
      console.warn('Failed saving draft:', e);
    }
  }

  function previewWizardDraft() {
    pullCurrentWizardStepValues();
    const draft = DNKH_STATE.wizardDraft;
    const body = document.getElementById('preview-record-modal-body');
    const modal = document.getElementById('modal-preview-record');
    if (!body || !modal) return;

    body.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <span class="record-type-pill">${(draft.recordType || 'Standard').toUpperCase()}</span>
        <span class="section-code-pill">${(draft.sectionId || 'QA').toUpperCase()}</span>
        <span class="quick-link-badge">Draft Preview</span>
      </div>
      <h3 style="margin: 0 0 0.5rem 0;">${draft.title || 'Untitled Record'}</h3>
      <p style="color: var(--dn-cyan); font-size: 0.85rem; margin-bottom: 1rem;">${draft.summary || 'No summary provided.'}</p>
      
      <div style="background: var(--dn-surface); border: 1px solid var(--dn-border); border-radius: 8px; padding: 1rem; font-size: 0.82rem; margin-bottom: 1rem;">
        <h4 style="margin: 0 0 0.5rem 0;">Method & Execution:</h4>
        <p style="margin: 0 0 0.5rem 0;">${draft.standardMethod || 'Standard method details pending.'}</p>
        <p style="margin: 0; color: #f87171;"><strong>Cautions:</strong> ${draft.cautions || 'None specified.'}</p>
      </div>

      <div style="font-size: 0.78rem; color: var(--dn-text-secondary);">
        <strong>Owner:</strong> ${draft.knowledgeOwner} · <strong>Reviewer:</strong> ${draft.reviewer}
      </div>
    `;

    modal.classList.add('active');
  }

  function submitWizardRecord() {
    pullCurrentWizardStepValues();
    const draft = DNKH_STATE.wizardDraft;

    const newRecord = {
      id: 'REC-' + Date.now().toString().slice(-6),
      recordType: draft.recordType || 'rt-standard',
      title: draft.title || 'New DNKH Knowledge Record',
      ownerSectionId: draft.sectionId || 'sec-qa',
      functionName: draft.functionName || 'Genba Monozukuri',
      processName: draft.processName || 'Standard Process',
      categoryName: draft.categoryName || 'Standard Work',
      topicName: draft.topicName || 'Standard Work',
      productModel: draft.productModel || 'Automotive Assemblies',
      knowledgeOwner: draft.knowledgeOwner || 'Associate (Contributor)',
      contributor: draft.contributor || 'Sample Contributor',
      reviewer: draft.reviewer || 'Assigned Reviewer',
      approver: 'Head Section',
      confidentiality: draft.confidentiality || 'Internal - DNKH Only',
      keywords: (draft.tags ? draft.tags.split(',') : ['Standard', 'Yokoten']).map(s => s.trim()),
      tags: (draft.tags ? draft.tags.split(',') : ['New Standard']).map(s => s.trim()),
      createdDate: new Date().toISOString().slice(0, 10),
      updatedDate: new Date().toISOString().slice(0, 10),
      reviewDate: new Date().toISOString().slice(0, 10),
      nextReviewDate: draft.targetReviewDate || '2027-03-31',
      version: '1.0',
      status: 'Submitted',
      helpfulCount: 0,
      summary: draft.summary || 'New standard procedure submitted via guided creation wizard.',
      detailedContent: `### Purpose\n${draft.purposeBg || 'Standard work execution.'}\n\n### Standard Method\n${draft.standardMethod || 'Standard operating procedure.'}\n\n### Critical Cautions\n${draft.cautions || 'None.'}`
    };

    DNKH_STATE.data.dnkhRecords.unshift(newRecord);
    
    // Push to Review Queue
    DNKH_STATE.data.dnkhReviewQueue.unshift({
      id: 'REV-' + Date.now().toString().slice(-4),
      recordId: newRecord.id,
      recordTitle: newRecord.title,
      sectionId: newRecord.ownerSectionId,
      step: 'Initial Check',
      assignedTo: 'Window Person',
      submittedBy: newRecord.contributor,
      submittedDate: new Date().toISOString().slice(0, 10),
      status: 'Submitted',
      priority: 'Normal'
    });

    // Add Audit Log
    DNKH_STATE.data.dnkhAuditLog.unshift({
      id: 'AUD-' + Date.now().toString().slice(-4),
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user: newRecord.contributor,
      action: 'Record Submitted',
      target: newRecord.id,
      details: `Submitted: ${newRecord.title}`
    });

    // Clear Draft
    try {
      localStorage.removeItem(LS_KEY_DRAFT);
    } catch (e) {}

    saveState();
    closeAllModals();
    showToast('Record successfully submitted for section review!', 'success');
    updateNotificationBadges();
    renderActiveView();
  }

  // KNOWLEDGE RELATIONSHIP GRAPH (SVG)
  function openKnowledgeGraphModal() {
    const modal = document.getElementById('modal-knowledge-graph');
    if (!modal) return;

    modal.classList.add('active');
    initGraphFilterChips();
    renderKnowledgeGraph();
  }

  function initGraphFilterChips() {
    const container = document.getElementById('graph-filter-chips');
    if (!container) return;

    container.querySelectorAll('.graph-filter-chip').forEach(chip => {
      chip.onclick = () => {
        container.querySelectorAll('.graph-filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        DNKH_STATE.graphFilter = chip.getAttribute('data-type');
        renderKnowledgeGraph();
      };
    });
  }

  function renderKnowledgeGraph() {
    const svg = document.getElementById('dnkh-graph-svg');
    if (!svg || !DNKH_STATE.data) return;

    const data = DNKH_STATE.data;
    const filter = DNKH_STATE.graphFilter || 'all';

    // Build Graph Nodes & Edges
    const nodes = [];
    const links = [];

    // Sections
    data.dnkhSections.slice(0, 8).forEach((sec, idx) => {
      if (filter === 'all' || filter === 'section') {
        const angle = (idx / 8) * 2 * Math.PI;
        nodes.push({
          id: sec.id,
          type: 'section',
          label: sec.code,
          fullName: sec.name,
          color: sec.color || '#e60012',
          x: 480 + 150 * Math.cos(angle),
          y: 260 + 130 * Math.sin(angle),
          radius: 18
        });
      }
    });

    // Topics & Records
    data.dnkhRecords.slice(0, 12).forEach((rec, idx) => {
      if (filter === 'all' || filter === 'record') {
        const angle = (idx / 12) * 2 * Math.PI;
        const rNode = {
          id: rec.id,
          type: 'record',
          label: rec.title.slice(0, 16) + '...',
          fullName: rec.title,
          color: '#0284c7',
          x: 480 + 260 * Math.cos(angle),
          y: 260 + 200 * Math.sin(angle),
          radius: 12
        };
        nodes.push(rNode);

        // Link to section
        const secNode = nodes.find(n => n.id === rec.ownerSectionId);
        if (secNode) {
          links.push({ source: secNode, target: rNode });
        }
      }
    });

    // 8D Cases
    data.dnkhTroubleshootingCases.slice(0, 4).forEach((c, idx) => {
      if (filter === 'all' || filter === 'case') {
        const cNode = {
          id: c.id,
          type: 'case',
          label: c.id,
          fullName: c.caseTitle,
          color: '#f59e0b',
          x: 200 + idx * 180,
          y: 60,
          radius: 14
        };
        nodes.push(cNode);
        const secNode = nodes.find(n => n.id === c.sectionId);
        if (secNode) links.push({ source: secNode, target: cNode });
      }
    });

    // SVG Rendering with pan/zoom
    const zoom = DNKH_STATE.graphZoom || 1;
    let svgHtml = `
      <g id="graph-root-group" transform="scale(${zoom})" transform-origin="480 260">
        <!-- Links -->
        ${links.map(l => `
          <line x1="${l.source.x}" y1="${l.source.y}" x2="${l.target.x}" y2="${l.target.y}" 
                stroke="rgba(255,255,255,0.18)" stroke-width="1.5" stroke-dasharray="3,3" />
        `).join('')}

        <!-- Nodes -->
        ${nodes.map(n => `
          <g class="graph-node-group" style="cursor: pointer;" onclick="window.DNKH_APP.onGraphNodeClick('${n.id}', '${n.type}', '${n.fullName.replace(/'/g, "\\'")}')">
            <circle cx="${n.x}" cy="${n.y}" r="${n.radius}" fill="${n.color}" stroke="#fff" stroke-width="2" />
            <text x="${n.x}" y="${n.y + n.radius + 12}" text-anchor="middle" fill="#fff" font-size="10" font-weight="600">${n.label}</text>
          </g>
        `).join('')}
      </g>
    `;

    svg.innerHTML = svgHtml;
  }

  function zoomGraph(factor) {
    DNKH_STATE.graphZoom = Math.max(0.5, Math.min(2.5, (DNKH_STATE.graphZoom || 1) * factor));
    renderKnowledgeGraph();
  }

  function resetGraph() {
    DNKH_STATE.graphZoom = 1;
    renderKnowledgeGraph();
  }

  function onGraphNodeClick(id, type, name) {
    const title = document.getElementById('graph-info-title');
    const desc = document.getElementById('graph-info-desc');
    const openBtn = document.getElementById('btn-graph-open-node');

    if (title) title.textContent = `[${type.toUpperCase()}] ${name}`;
    if (desc) desc.textContent = `Node ID: ${id} · Entity type: ${type}. Click Open Details to inspect.`;
    if (openBtn) {
      openBtn.style.display = 'inline-block';
      openBtn.onclick = () => {
        closeModal('modal-knowledge-graph');
        if (type === 'record') openRecordDetail(id);
        else if (type === 'case') openTroubleshootingDetail(id);
        else if (type === 'section') switchSection(id);
      };
    }
  }

  // EXPERT PROFILE MODAL
  function openExpertProfileModal(expertId) {
    const e = DNKH_STATE.data.dnkhExperts.find(x => x.id === expertId);
    if (!e) return;

    DNKH_STATE.activeConsultExpert = e;
    const body = document.getElementById('expert-profile-modal-body');
    const modal = document.getElementById('modal-expert-profile');
    if (!body || !modal) return;

    const sec = DNKH_STATE.data.dnkhSections.find(s => s.id === e.sectionId);

    body.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.25rem;">
        <div class="user-avatar-badge" style="width: 56px; height: 56px; font-size: 1.3rem; background: ${sec ? sec.color : 'var(--dn-blue)'};">
          ${e.avatarInitials}
        </div>
        <div>
          <h3 style="margin: 0; font-size: 1.25rem;">${e.name}</h3>
          <span style="font-size: 0.85rem; color: var(--dn-text-secondary);">${e.role} (${sec ? sec.code : ''})</span>
          <div style="margin-top: 4px;">
            <span class="quick-link-badge" style="color: var(--dn-green);">Verified Subject Expert</span>
          </div>
        </div>
      </div>

      <div style="background: var(--dn-surface); border: 1px solid var(--dn-border); border-radius: 8px; padding: 1rem; margin-bottom: 1.25rem;">
        <h4 style="margin: 0 0 0.5rem 0; color: var(--dn-cyan);"><i class="fa-solid fa-certificate"></i> Verified Manufacturing Disciplines</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${(e.skills || []).map(s => `
            <span class="record-tag-chip" style="font-size: 0.78rem; padding: 0.35rem 0.65rem;">
              <i class="fa-solid fa-check text-green"></i> ${s}
            </span>
          `).join('')}
        </div>
      </div>

      <div style="font-size: 0.8rem; color: var(--dn-text-secondary); line-height: 1.6;">
        <strong>Years in Genba:</strong> 12+ Years<br>
        <strong>Mentoring Availability:</strong> ${e.mentoringAvailable ? 'Active Mentor' : 'Busy with trials'}<br>
        <strong>Verified Standards Authored:</strong> 5 Controlled SOPs<br>
        <strong>8D Cases Solved:</strong> 8 Horizontal Deployments
      </div>
    `;

    modal.classList.add('active');
  }

  function openRequestConsultationModal(expertId) {
    const e = expertId ? DNKH_STATE.data.dnkhExperts.find(x => x.id === expertId) : DNKH_STATE.activeConsultExpert;
    if (!e) return;

    DNKH_STATE.activeConsultExpert = e;
    const nameInput = document.getElementById('consult-expert-name');
    if (nameInput) nameInput.value = `${e.name} (${e.role})`;

    const dateInput = document.getElementById('consult-date');
    if (dateInput) {
      const d = new Date();
      d.setDate(d.getDate() + 7);
      dateInput.value = d.toISOString().slice(0, 10);
    }

    const modal = document.getElementById('modal-request-consultation');
    if (modal) modal.classList.add('active');
  }

  function submitConsultationRequest() {
    const topic = document.getElementById('consult-topic');
    const desc = document.getElementById('consult-description');
    if (!topic || !topic.value.trim() || !desc || !desc.value.trim()) {
      showToast('Please enter both consultation topic and description.', 'error');
      return;
    }

    const expert = DNKH_STATE.activeConsultExpert;
    DNKH_STATE.data.dnkhAuditLog.unshift({
      id: 'AUD-' + Date.now().toString().slice(-4),
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user: 'Sample Contributor',
      action: 'Consultation Requested',
      target: expert ? expert.name : 'SME',
      details: `Topic: ${topic.value}`
    });

    saveState();
    closeModal('modal-request-consultation');
    showToast(`Consultation request sent to ${expert ? expert.name : 'SME'}! Notification logged.`, 'success');
  }

  // EXPERTISE VERIFICATION MODAL
  function openVerifyExpertiseModal(expertId) {
    const e = DNKH_STATE.data.dnkhExperts.find(x => x.id === expertId);
    if (!e) return;

    DNKH_STATE.activeVerifyExpert = e;
    const nameSpan = document.getElementById('verify-expert-name');
    const areaSpan = document.getElementById('verify-expert-area');
    const eviSpan = document.getElementById('verify-expert-evidence');
    if (nameSpan) nameSpan.textContent = e.name;
    if (areaSpan) areaSpan.textContent = (e.skills || []).join(', ');
    if (eviSpan) eviSpan.textContent = 'Controlled SOP & 8D Recurrence Prevention records verified in Genba';

    const nextDate = document.getElementById('verify-next-date');
    if (nextDate) {
      const d = new Date();
      d.setFullYear(d.getFullYear() + 1);
      nextDate.value = d.toISOString().slice(0, 10);
    }

    const modal = document.getElementById('modal-verify-expertise');
    if (modal) modal.classList.add('active');
  }

  function submitExpertiseVerification() {
    const action = document.getElementById('verify-action');
    const notes = document.getElementById('verify-notes');
    const expert = DNKH_STATE.activeVerifyExpert;

    DNKH_STATE.data.dnkhAuditLog.unshift({
      id: 'AUD-' + Date.now().toString().slice(-4),
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user: 'Kenji Nomura (Head Section)',
      action: 'Expertise Verified',
      target: expert ? expert.name : 'SME',
      details: `Action: ${action ? action.value : 'Verified'} · Notes: ${notes ? notes.value : ''}`
    });

    saveState();
    closeModal('modal-verify-expertise');
    showToast('SME evidence verification recorded successfully!', 'success');
  }

  // CAPABILITY ASSESSMENT MODAL
  function openCapabilityAssessmentModal() {
    const select = document.getElementById('asm-topic-select');
    if (select && DNKH_STATE.data) {
      select.innerHTML = DNKH_STATE.data.dnkhSections.flatMap(s => 
        (s.starterTopics || []).map(t => `<option value="${t}">[${s.code}] ${t}</option>`)
      ).join('');
    }

    const modal = document.getElementById('modal-capability-assessment');
    if (modal) modal.classList.add('active');
  }

  function submitCapabilityAssessment() {
    const name = document.getElementById('asm-emp-name');
    const topic = document.getElementById('asm-topic-select');
    const lvl = document.getElementById('asm-level-select');
    const evi = document.getElementById('asm-evidence-text');

    if (!evi || !evi.value.trim()) {
      showToast('Observable evidence is mandatory for capability assessments.', 'error');
      return;
    }

    const lvlNum = parseInt(lvl ? lvl.value : '2', 10);
    const lvlTitles = ['', 'L1: Knowledge', 'L2: Skill', 'L3: Experience', 'L4: Knowledge Sharing'];

    DNKH_STATE.data.dnkhAssessments.unshift({
      id: 'ASM-' + Date.now().toString().slice(-4),
      employeeName: name ? name.value : 'Associate',
      sectionId: 'sec-qa',
      topicName: topic ? topic.value : 'Standard Work',
      level: lvlNum,
      levelTitle: lvlTitles[lvlNum] || 'L2: Skill',
      evidenceSummary: evi.value,
      reviewStatus: 'Pending Verification',
      reviewerName: 'Assigned Window Person',
      lastReviewDate: new Date().toISOString().slice(0, 10)
    });

    DNKH_STATE.data.dnkhAuditLog.unshift({
      id: 'AUD-' + Date.now().toString().slice(-4),
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user: name ? name.value : 'Associate',
      action: 'Assessment Submitted',
      target: topic ? topic.value : 'Topic',
      details: `Target Level: ${lvlTitles[lvlNum]}`
    });

    saveState();
    closeModal('modal-capability-assessment');
    showToast('Capability assessment submitted for SME verification!', 'success');
    renderCapabilityView();
  }

  // REVIEW CENTER ACTION MODAL
  function openReviewActionModal(queueId) {
    const q = DNKH_STATE.data.dnkhReviewQueue.find(x => x.id === queueId);
    if (!q) return;

    DNKH_STATE.activeReviewQueueItem = q;
    const titleSpan = document.getElementById('rev-modal-record-title');
    const stepSpan = document.getElementById('rev-modal-record-step');
    const authorSpan = document.getElementById('rev-modal-record-author');

    if (titleSpan) titleSpan.textContent = q.recordTitle;
    if (stepSpan) stepSpan.textContent = q.step;
    if (authorSpan) authorSpan.textContent = q.submittedBy;

    const modal = document.getElementById('modal-review-action');
    if (modal) modal.classList.add('active');
  }

  function confirmReviewDecision() {
    const decision = document.getElementById('rev-modal-decision-select');
    const comments = document.getElementById('rev-modal-comments');
    const q = DNKH_STATE.activeReviewQueueItem;
    if (!q) return;

    const dVal = decision ? decision.value : 'Technical Review Pass';

    if (dVal === 'Final Approved') {
      q.status = 'Approved';
      const r = DNKH_STATE.data.dnkhRecords.find(x => x.id === q.recordId);
      if (r) r.status = 'Published';
    } else if (dVal === 'Revision Required') {
      q.status = 'Revision Required';
      const r = DNKH_STATE.data.dnkhRecords.find(x => x.id === q.recordId);
      if (r) r.status = 'Revision Required';
    } else {
      q.step = 'Pending Approval';
      q.status = 'In Review';
    }

    DNKH_STATE.data.dnkhAuditLog.unshift({
      id: 'AUD-' + Date.now().toString().slice(-4),
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user: 'Kenji Nomura (Head Section)',
      action: 'Review Decision: ' + dVal,
      target: q.recordId,
      details: comments ? comments.value : 'Approved'
    });

    saveState();
    closeModal('modal-review-action');
    showToast(`Decision recorded: ${dVal}!`, 'success');
    updateNotificationBadges();
    renderReviewsView();
  }

  // ADMIN SECTION CONFIGURATION MODAL
  function openAdminSectionModal(sectionId) {
    DNKH_STATE.activeEditSectionId = sectionId || null;
    const modal = document.getElementById('modal-admin-section');
    if (!modal) return;

    const body = modal.querySelector('.dnkh-modal-body');
    const s = sectionId ? DNKH_STATE.data.dnkhSections.find(x => x.id === sectionId) : null;

    body.innerHTML = `
      <div class="dnkh-form-group">
        <label class="dnkh-form-label">Section Name *</label>
        <input type="text" id="admin-sec-name" class="dnkh-form-input" placeholder="e.g., Die Casting & Foundry" value="${s ? s.name : ''}">
      </div>
      <div class="dnkh-form-group">
        <label class="dnkh-form-label">Section Code (2-4 chars) *</label>
        <input type="text" id="admin-sec-code" class="dnkh-form-input" placeholder="e.g., DCF" value="${s ? s.code : ''}">
      </div>
      <div class="dnkh-form-group">
        <label class="dnkh-form-label">Section Head *</label>
        <input type="text" id="admin-sec-head" class="dnkh-form-input" placeholder="e.g., Kenji Nomura" value="${s ? s.head : ''}">
      </div>
      <div class="dnkh-form-group">
        <label class="dnkh-form-label">Theme Color</label>
        <input type="color" id="admin-sec-color" class="dnkh-form-input" value="${s ? s.color : '#e60012'}" style="height: 40px; padding: 4px;">
      </div>
      <div class="dnkh-form-group">
        <label class="dnkh-form-label">Window Persons (comma-separated)</label>
        <input type="text" id="admin-sec-window" class="dnkh-form-input" placeholder="e.g., Window Person A, Window Person B" value="${s ? (s.windowPersons || []).join(', ') : ''}">
      </div>
    `;

    const footer = modal.querySelector('.dnkh-modal-footer');
    if (footer) {
      footer.innerHTML = `
        <button type="button" class="btn-dnkh secondary" onclick="window.DNKH_APP.closeModal('modal-admin-section')">Cancel</button>
        <button type="button" class="btn-dnkh primary" onclick="window.DNKH_APP.saveAdminSection()">Save Section Configuration</button>
      `;
    }

    modal.classList.add('active');
  }

  function saveAdminSection() {
    const name = document.getElementById('admin-sec-name');
    const code = document.getElementById('admin-sec-code');
    const head = document.getElementById('admin-sec-head');
    const color = document.getElementById('admin-sec-color');
    const win = document.getElementById('admin-sec-window');

    if (!name || !name.value.trim() || !code || !code.value.trim()) {
      showToast('Section name and code are required.', 'error');
      return;
    }

    const secId = DNKH_STATE.activeEditSectionId;
    if (secId) {
      const s = DNKH_STATE.data.dnkhSections.find(x => x.id === secId);
      if (s) {
        s.name = name.value.trim();
        s.code = code.value.trim().toUpperCase();
        s.head = head ? head.value.trim() : s.head;
        s.color = color ? color.value : s.color;
        s.windowPersons = win ? win.value.split(',').map(x => x.trim()) : s.windowPersons;
      }
    } else {
      const newCode = code.value.trim().toUpperCase();
      DNKH_STATE.data.dnkhSections.push({
        id: 'sec-' + newCode.toLowerCase(),
        code: newCode,
        name: name.value.trim(),
        head: head ? head.value.trim() : 'Section Head',
        color: color ? color.value : '#e60012',
        icon: 'fa-cubes',
        objective: 'Manufacturing excellence and Monozukuri knowledge retention.',
        windowPersons: win ? win.value.split(',').map(x => x.trim()) : ['Assigned Window Person'],
        starterTopics: ['Standard Work', 'Troubleshooting Case', 'Yokoten'],
        categories: ['Standard Operating Procedure', 'Quality Control'],
        isActive: true
      });
    }

    DNKH_STATE.data.dnkhAuditLog.unshift({
      id: 'AUD-' + Date.now().toString().slice(-4),
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user: 'Administrator',
      action: 'Section Configured',
      target: code.value.trim().toUpperCase(),
      details: `Saved section: ${name.value.trim()}`
    });

    saveState();
    closeModal('modal-admin-section');
    populateHeaderSectionSelect();
    showToast('Section configuration saved successfully!', 'success');
    renderAdminView();
  }

  function toggleSectionStatus(sectionId) {
    const s = DNKH_STATE.data.dnkhSections.find(x => x.id === sectionId);
    if (!s) return;

    s.isActive = !s.isActive;
    saveState();
    showToast(`Section ${s.code} is now ${s.isActive ? 'Active' : 'Inactive'}.`, 'info');
    renderAdminView();
  }

  // BULK CSV OPERATIONS
  function downloadCSVTemplate() {
    const csvContent = 'data:text/csv;charset=utf-8,SectionCode,RecordType,Title,Summary,StandardMethod,Tags\nQA,rt-standard,High Voltage Calibration,Safety verification procedure,Check calibration pins daily,Calibration,Safety\nPD,rt-manual,Coil Winding Setup,Tension rig alignment guide,Inspect wire feed rollers,Coil,Winding';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'DNKH_Knowledge_Template.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Downloaded DNKH_Knowledge_Template.csv', 'success');
  }

  function exportRecordsCSV() {
    const records = DNKH_STATE.data.dnkhRecords;
    let csv = 'ID,Type,Section,Title,Owner,Status,Version\n';
    records.forEach(r => {
      csv += `"${r.id}","${r.recordType}","${r.ownerSectionId}","${r.title.replace(/"/g, '""')}","${r.knowledgeOwner}","${r.status}","${r.version}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'DNKH_Records_Export.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Exported DNKH_Records_Export.csv', 'success');
  }

  function exportRecordsJSON() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(DNKH_STATE.data, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', 'DNKH_DNA_Matrix_Master.json');
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Exported DNKH_DNA_Matrix_Master.json', 'success');
  }

  function exportAuditCSV() {
    const logs = DNKH_STATE.data.dnkhAuditLog;
    let csv = 'ID,Timestamp,User,Action,Target,Details\n';
    logs.forEach(l => {
      csv += `"${l.id}","${l.timestamp}","${l.user}","${l.action}","${l.target}","${(l.details || '').replace(/"/g, '""')}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'DNKH_Audit_Log.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Exported DNKH_Audit_Log.csv', 'success');
  }

  function processBulkCSVImport() {
    const newRecord = {
      id: 'REC-CSV-' + Date.now().toString().slice(-4),
      recordType: 'rt-standard',
      title: 'Batch Imported Stator Calibration Procedure',
      ownerSectionId: 'sec-qa',
      functionName: 'Quality Control',
      processName: 'Calibration Process',
      categoryName: 'Standard Work',
      topicName: 'Batch Calibration',
      productModel: 'Alternator Series',
      knowledgeOwner: 'QA Team (Bulk Import)',
      contributor: 'Administrator',
      reviewer: 'Kenji Nomura (Head Section)',
      approver: 'Somchai Prasert (Reviewer)',
      confidentiality: 'Internal - DNKH Only',
      keywords: ['Batch', 'Calibration'],
      tags: ['Bulk Import', 'Standard Work'],
      createdDate: new Date().toISOString().slice(0, 10),
      updatedDate: new Date().toISOString().slice(0, 10),
      reviewDate: new Date().toISOString().slice(0, 10),
      nextReviewDate: '2027-03-31',
      version: '1.0',
      status: 'Published',
      helpfulCount: 0,
      summary: 'Bulk imported procedure verified with 0 schema errors.',
      detailedContent: 'Bulk imported manufacturing standard procedure.'
    };

    DNKH_STATE.data.dnkhRecords.unshift(newRecord);
    DNKH_STATE.data.dnkhAuditLog.unshift({
      id: 'AUD-' + Date.now().toString().slice(-4),
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user: 'Administrator',
      action: 'Bulk Import Executed',
      target: newRecord.id,
      details: 'Imported batch records successfully.'
    });

    saveState();
    closeModal('modal-bulk-import');
    showToast('Template validated with 0 duplicate errors. Record imported!', 'success');
    renderActiveView();
  }

  // DRAWERS & NOTIFICATIONS
  function toggleDrawer(drawerId, open) {
    const drawer = document.getElementById(drawerId);
    if (drawer) {
      if (open) drawer.classList.add('active');
      else drawer.classList.remove('active');
    }
  }

  function renderNotificationsDrawer() {
    const list = document.getElementById('drawer-notifications-list');
    if (!list) return;

    list.innerHTML = `
      <div style="padding: 1rem; border-bottom: 1px solid var(--dn-border); display: flex; align-items: center; justify-content: space-between;">
        <h4 style="margin: 0;"><i class="fa-solid fa-bell text-red"></i> ${t('notifications')}</h4>
        <button type="button" class="btn-modal-close" onclick="window.DNKH_APP.toggleDrawer('drawer-notifications', false)"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div style="padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem;">
        <div style="background: rgba(230,0,18,0.1); border-left: 3px solid var(--dn-red); padding: 0.75rem; border-radius: 4px; font-size: 0.8rem;">
          <strong>Review Assigned:</strong> New 8D Case #8D-2026-004 requires technical review.
          <div style="font-size: 0.7rem; color: var(--dn-text-muted); margin-top: 4px;">2 hours ago</div>
        </div>
        <div style="background: rgba(16,185,129,0.1); border-left: 3px solid var(--dn-green); padding: 0.75rem; border-radius: 4px; font-size: 0.8rem;">
          <strong>Record Published:</strong> Alternator Stator Coil Standard approved by Kenji Nomura.
          <div style="font-size: 0.7rem; color: var(--dn-text-muted); margin-top: 4px;">Yesterday</div>
        </div>
      </div>
    `;
  }

  function renderBookmarksDrawer() {
    const list = document.getElementById('drawer-bookmarks-list');
    if (!list || !DNKH_STATE.data) return;

    const bookmarkedRecords = DNKH_STATE.data.dnkhRecords.filter(r => DNKH_STATE.bookmarks.has(r.id));

    list.innerHTML = `
      <div style="padding: 1rem; border-bottom: 1px solid var(--dn-border); display: flex; align-items: center; justify-content: space-between;">
        <h4 style="margin: 0;"><i class="fa-solid fa-bookmark text-cyan"></i> ${t('bookmarks')} (${bookmarkedRecords.length})</h4>
        <button type="button" class="btn-modal-close" onclick="window.DNKH_APP.toggleDrawer('drawer-bookmarks', false)"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div style="padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem; overflow-y: auto;">
        ${bookmarkedRecords.length > 0 ? bookmarkedRecords.map(r => `
          <div class="record-card" style="padding: 0.85rem;" onclick="window.DNKH_APP.openRecordDetail('${r.id}')">
            <h5 style="margin: 0 0 0.35rem 0; font-size: 0.88rem;">${r.title}</h5>
            <small style="color: var(--dn-text-muted); font-size: 0.72rem;">${r.ownerSectionId.toUpperCase()} · ${r.status}</small>
          </div>
        `).join('') : `
          <p style="font-size: 0.8rem; color: var(--dn-text-muted); text-align: center; margin-top: 2rem;">${t('no_bookmarks')}</p>
        `}
      </div>
    `;
  }

  function toggleBookmark(recordId) {
    if (DNKH_STATE.bookmarks.has(recordId)) {
      DNKH_STATE.bookmarks.delete(recordId);
      showToast('Removed from bookmarks.', 'info');
    } else {
      DNKH_STATE.bookmarks.add(recordId);
      showToast('Saved to bookmarks!', 'success');
    }
    saveState();
    renderActiveView();
  }

  function showToast(msg, type = 'info') {
    const container = document.getElementById('dnkh-toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `dnkh-toast ${type}`;
    toast.innerHTML = `<i class="fa-solid fa-${type === 'success' ? 'circle-check text-green' : type === 'error' ? 'circle-xmark text-red' : 'circle-info text-cyan'}"></i> <span>${msg}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  function closeAllModals() {
    document.querySelectorAll('.dnkh-modal-backdrop').forEach(m => m.classList.remove('active'));
  }

  function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  }

  function updateNotificationBadges() {
    const notifBadge = document.getElementById('header-notif-count');
    if (notifBadge && DNKH_STATE.data) {
      notifBadge.textContent = DNKH_STATE.data.dnkhReviewQueue.length;
    }
  }

  function verifyCapabilityEvidence(asmId) {
    const asm = DNKH_STATE.data.dnkhAssessments.find(a => a.id === asmId);
    if (!asm) return;

    asm.reviewStatus = 'Verified';
    asm.reviewerName = 'Somchai Prasert (Reviewer)';
    asm.lastReviewDate = new Date().toISOString().slice(0, 10);
    saveState();
    showToast(`Capability evidence verified for ${asm.employeeName}!`, 'success');
    renderCapabilityView();
  }

  function downloadSampleAttachment(fileName) {
    showToast(`Downloading demonstration file: ${fileName}`, 'success');
  }

  function resetKnowledgeFilters() {
    DNKH_STATE.searchQuery = '';
    DNKH_STATE.currentSection = 'all';
    renderKnowledgeView();
  }

  function filterKnowledgeBySection(sec) {
    DNKH_STATE.currentSection = sec;
    renderKnowledgeView();
  }

  function filterKnowledgeByType(type) {
    if (type === 'all') {
      renderKnowledgeView();
      return;
    }
    const stage = document.getElementById('view-knowledge');
    if (!stage || !DNKH_STATE.data) return;
    const records = DNKH_STATE.data.dnkhRecords.filter(r => r.recordType === type);
    const grid = stage.querySelector('.records-cards-grid');
    if (grid) {
      grid.innerHTML = records.length > 0 
        ? records.map(r => renderRecordCardHtml(r)).join('') 
        : '<p style="grid-column: 1 / -1; text-align: center; color: var(--dn-text-muted);">No records found for this type.</p>';
    }
  }

  function startGuidedTour() {
    const tourModal = document.getElementById('modal-guided-tour');
    if (tourModal) tourModal.classList.add('active');
  }

  function openBulkImportModal() {
    const modal = document.getElementById('modal-bulk-import');
    if (!modal) return;
    const footer = modal.querySelector('.dnkh-modal-footer');
    if (footer) {
      footer.innerHTML = `
        <button type="button" class="btn-dnkh secondary" onclick="window.DNKH_APP.closeModal('modal-bulk-import')">Cancel</button>
        <button type="button" class="btn-dnkh primary" onclick="window.DNKH_APP.processBulkCSVImport()"><i class="fa-solid fa-file-import"></i> Validate & Import</button>
      `;
    }
    modal.classList.add('active');
  }

  // --- PUBLIC API EXPOSURE ---
  window.DNKH_APP = {
    init: initApp,
    switchView,
    switchSection,
    switchMicrositeTab,
    openRecordDetail,
    openTroubleshootingDetail,
    openCreateRecordModal,
    openCreateCaseModal: () => openCreateRecordModal(),
    goToWizardStep,
    nextWizardStep,
    prevWizardStep,
    saveWizardDraft,
    previewWizardDraft,
    toggleDrawer,
    toggleBookmark,
    closeModal,
    verifyCapabilityEvidence,
    downloadSampleAttachment,
    resetKnowledgeFilters,
    filterKnowledgeBySection,
    filterKnowledgeByType,
    startGuidedTour,
    openBulkImportModal,
    openAdminSectionModal,
    saveAdminSection,
    editSection: (id) => openAdminSectionModal(id),
    toggleSectionStatus,
    openExpertProfileModal,
    openExpertContactModal: (id) => openRequestConsultationModal(id),
    openRequestConsultationModal,
    submitConsultationRequest,
    openVerifyExpertiseModal,
    submitExpertiseVerification,
    openCapabilityAssessmentModal,
    submitCapabilityAssessment,
    switchCapabilityView,
    openReviewActionModal,
    confirmReviewDecision,
    switchReviewQueue,
    openKnowledgeGraphModal,
    zoomGraph,
    resetGraph,
    onGraphNodeClick,
    exportRecordsCSV,
    exportRecordsJSON,
    exportAuditCSV,
    processBulkCSVImport,
    downloadCSVTemplate,
    switchAdminTab
  };

  // Run on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
