  // ========================================================
  // DIGITAL TRANSFORMATION (DX) DNA MODULE CONTROLLER
  // ========================================================
  
  // DX State Management
  const DX_SCHEMA_VERSION = '1.0.0';
  const LS_KEY_DX_STATE = 'dna_matrix_dx_state_v1';
  const LS_KEY_DX_ROLE = 'dna_matrix_dx_role_v1';
  const LS_KEY_DX_BOOKMARKS = 'dna_matrix_dx_bookmarks_v1';

  let DXState = {
    currentRole: 'Contributor', // Viewer, Contributor, Reviewer, Admin
    activeView: 'dx-overview',
    currentDimensionFilter: 'ALL',
    bookmarks: new Set(),
    data: null,
    charts: {}
  };

  function initDXModule() {
    loadDXState();
    initDXNavigation();
    initDXRoleSwitcher();
    initDXGlobalSearch();
    initDXActionForm();
    initDXProjectModalTabs();

    // Render Home Page Screen 1 DX section stats
    updateScreen1DXStats();
  }

  function loadDXState() {
    try {
      const savedRole = localStorage.getItem(LS_KEY_DX_ROLE);
      if (savedRole) DXState.currentRole = savedRole;

      const roleSelector = document.getElementById('dx-role-selector');
      if (roleSelector) roleSelector.value = DXState.currentRole;

      const savedBookmarks = localStorage.getItem(LS_KEY_DX_BOOKMARKS);
      if (savedBookmarks) {
        DXState.bookmarks = new Set(JSON.parse(savedBookmarks));
      }

      const savedData = localStorage.getItem(LS_KEY_DX_STATE);
      if (savedData) {
        DXState.data = JSON.parse(savedData);
      } else if (window.DX_SEED_DATA) {
        DXState.data = JSON.parse(JSON.stringify(window.DX_SEED_DATA));
        saveDXState();
      }
    } catch (e) {
      console.warn('Failed to load DX state from localStorage, falling back to seed data:', e);
      if (window.DX_SEED_DATA) {
        DXState.data = JSON.parse(JSON.stringify(window.DX_SEED_DATA));
      }
    }
  }

  function saveDXState() {
    try {
      if (DXState.data) {
        localStorage.setItem(LS_KEY_DX_STATE, JSON.stringify(DXState.data));
      }
      localStorage.setItem(LS_KEY_DX_ROLE, DXState.currentRole);
      localStorage.setItem(LS_KEY_DX_BOOKMARKS, JSON.stringify(Array.from(DXState.bookmarks)));
    } catch (e) {
      console.warn('Failed to save DX state:', e);
    }
  }

  function resetDemoData() {
    if (confirm('Are you sure you want to reset all DX demonstration data back to default factory state?')) {
      if (window.DX_SEED_DATA) {
        DXState.data = JSON.parse(JSON.stringify(window.DX_SEED_DATA));
        DXState.bookmarks.clear();
        saveDXState();
        showToast('DX demonstration data reset to original factory state.', 'success');
        switchDXView(DXState.activeView);
        updateScreen1DXStats();
      }
    }
  }

  function updateScreen1DXStats() {
    if (!DXState.data) return;
    const knoEl = document.getElementById('sc1-stat-kno');
    const prjEl = document.getElementById('sc1-stat-prj');
    const astEl = document.getElementById('sc1-stat-ast');
    const lpEl = document.getElementById('sc1-stat-lp');
    const topEl = document.getElementById('sc1-stat-top');
    const eviEl = document.getElementById('sc1-stat-evi');

    if (knoEl) knoEl.textContent = (DXState.data.dxKnowledge || []).length;
    if (prjEl) prjEl.textContent = (DXState.data.dxProjects || []).length;
    if (astEl) astEl.textContent = (DXState.data.dxReusableAssets || []).length;
    if (lpEl) lpEl.textContent = (DXState.data.dxLearningPaths || []).length;
    if (topEl) topEl.textContent = (DXState.data.dxTopics || []).length;
    if (eviEl) eviEl.textContent = (DXState.data.dxAssessments || []).filter(a => a.reviewStatus === 'Verified').length * 2 + 16;
  }

  // ========================================================
  // DX WORKSPACE NAVIGATION
  // ========================================================
  function initDXNavigation() {
    // Workspace switcher buttons (Quality DNA vs DX DNA)
    const btnWsQuality = document.getElementById('btn-ws-quality');
    const btnWsDx = document.getElementById('btn-ws-dx');

    if (btnWsQuality) {
      btnWsQuality.addEventListener('click', () => {
        switchToWorkspace('quality');
      });
    }

    if (btnWsDx) {
      btnWsDx.addEventListener('click', () => {
        switchToWorkspace('dx');
      });
    }

    // Launch DX from Screen 1
    const btnLaunchSc1 = document.getElementById('btn-sc1-launch-dx');
    if (btnLaunchSc1) {
      btnLaunchSc1.addEventListener('click', () => {
        switchToWorkspace('dx');
        switchDXView('dx-overview');
      });
    }

    // 4-Dimension Panels on Screen 1
    document.querySelectorAll('.dx-4d-panel[data-jump-dim]').forEach(panel => {
      panel.addEventListener('click', () => {
        const dim = panel.dataset.jumpDim;
        switchToWorkspace('dx');
        if (dim === 'knowledge') switchDXView('dx-knowledge');
        else if (dim === 'skill') switchDXView('dx-learning');
        else if (dim === 'experience') switchDXView('dx-experience');
        else if (dim === 'sharing') switchDXView('dx-governance');
      });
    });

    // DX Sub-View Navigation Tabs
    const dxTabs = document.querySelectorAll('.btn-dx-tab');
    dxTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const viewId = tab.dataset.dxView;
        switchDXView(viewId);
      });
    });

    // Reset demo data button in Governance view
    const btnResetData = document.getElementById('btn-reset-demo-data');
    if (btnResetData) {
      btnResetData.addEventListener('click', resetDemoData);
    }

    // Export full JSON in Governance view
    const btnExportJson = document.getElementById('btn-export-full-dx-json');
    if (btnExportJson) {
      btnExportJson.addEventListener('click', () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(DXState.data, null, 2));
        const dlAnchor = document.createElement('a');
        dlAnchor.setAttribute("href", dataStr);
        dlAnchor.setAttribute("download", "dnkh_dx_dna_backup_" + new Date().toISOString().slice(0,10) + ".json");
        document.body.appendChild(dlAnchor);
        dlAnchor.click();
        dlAnchor.remove();
        showToast('DX data exported successfully as JSON', 'success');
      });
    }

    // Export CSV from Capability Matrix
    const btnExportCsv = document.getElementById('btn-export-matrix-csv');
    if (btnExportCsv) {
      btnExportCsv.addEventListener('click', exportMatrixToCSV);
    }
  }

  function switchToWorkspace(ws) {
    const btnWsQuality = document.getElementById('btn-ws-quality');
    const btnWsDx = document.getElementById('btn-ws-dx');
    const exactStage = document.getElementById('exact-photo-stage');
    const entStage = document.getElementById('enterprise-app-stage');
    const dxStage = document.getElementById('dx-app-stage');
    const screenTabs = document.getElementById('screen-tabs-nav');
    const entNav = document.getElementById('enterprise-nav');
    const dxNav = document.getElementById('dx-nav-bar');

    if (ws === 'dx') {
      if (btnWsQuality) btnWsQuality.classList.remove('active');
      if (btnWsDx) btnWsDx.classList.add('active');

      if (exactStage) exactStage.style.display = 'none';
      if (entStage) entStage.style.display = 'none';
      if (dxStage) dxStage.style.display = 'block';

      if (screenTabs) screenTabs.style.display = 'none';
      if (entNav) entNav.style.display = 'none';
      if (dxNav) dxNav.style.display = 'flex';

      showToast('Switched to Digital Transformation (DX) DNA Workspace', 'info');
      switchDXView(DXState.activeView || 'dx-overview');
    } else {
      if (btnWsQuality) btnWsQuality.classList.add('active');
      if (btnWsDx) btnWsDx.classList.remove('active');

      if (dxStage) dxStage.style.display = 'none';
      if (dxNav) dxNav.style.display = 'none';

      if (AppState.mode === 'enterprise') {
        if (entStage) entStage.style.display = 'block';
        if (entNav) entNav.style.display = 'flex';
      } else {
        if (exactStage) exactStage.style.display = 'flex';
        if (screenTabs) screenTabs.style.display = 'flex';
      }

      showToast('Switched to Quality DNA Workspace', 'info');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function switchDXView(viewId) {
    DXState.activeView = viewId;

    // Update active nav tab
    document.querySelectorAll('.btn-dx-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.dxView === viewId);
    });

    // Update active section
    document.querySelectorAll('.dx-section-view').forEach(sec => {
      sec.classList.remove('active');
    });

    const activeSec = document.getElementById('view-' + viewId);
    if (activeSec) {
      activeSec.classList.add('active');
    }

    // Trigger render function for specific view
    if (viewId === 'dx-overview') renderDXOverview();
    else if (viewId === 'dx-knowledge') renderDXKnowledge();
    else if (viewId === 'dx-matrix') renderDXMatrix();
    else if (viewId === 'dx-projects') renderDXProjects();
    else if (viewId === 'dx-experience') renderDXExperience();
    else if (viewId === 'dx-learning') renderDXLearning();
    else if (viewId === 'dx-experts') renderDXExperts();
    else if (viewId === 'dx-assessment') renderDXAssessment();
    else if (viewId === 'dx-analytics') renderDXAnalytics();
    else if (viewId === 'dx-governance') renderDXGovernance();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ========================================================
  // PROTOTYPE ROLE SWITCHER & PERMISSION ENFORCEMENT
  // ========================================================
  function initDXRoleSwitcher() {
    const selector = document.getElementById('dx-role-selector');
    if (!selector) return;

    selector.addEventListener('change', () => {
      DXState.currentRole = selector.value;
      saveDXState();
      showToast('Simulation role changed to: ' + DXState.currentRole + ' (Prototype Simulation)', 'info');
      // Refresh current view to update permissions
      switchDXView(DXState.activeView);
    });
  }

  function hasDXPermission(action) {
    const role = DXState.currentRole;
    if (role === 'Admin') return true;
    if (role === 'Reviewer') {
      return ['READ', 'BOOKMARK', 'ADD_RECORD', 'SUBMIT_EVIDENCE', 'VERIFY_EVIDENCE', 'REVIEW'].includes(action);
    }
    if (role === 'Contributor') {
      return ['READ', 'BOOKMARK', 'ADD_RECORD', 'SUBMIT_EVIDENCE'].includes(action);
    }
    // Viewer
    return ['READ', 'BOOKMARK'].includes(action);
  }

  // ========================================================
  // RENDER: DX OVERVIEW
  // ========================================================
  function renderDXOverview() {
    if (!DXState.data) return;

    // 1. Render Summary KPIs
    const kpiWrap = document.getElementById('dx-overview-kpis');
    if (kpiWrap) {
      const knoCount = (DXState.data.dxKnowledge || []).length;
      const prjCount = (DXState.data.dxProjects || []).length;
      const astCount = (DXState.data.dxReusableAssets || []).length;
      const lpCount = (DXState.data.dxLearningPaths || []).length;
      const topCount = (DXState.data.dxTopics || []).length;
      const pendingEvi = (DXState.data.dxAssessments || []).filter(a => a.reviewStatus !== 'Verified').length;

      kpiWrap.innerHTML = `
        <div class="dx-metric-tile">
          <div class="metric-tile-header"><span>Total Knowledge</span><i class="fa-solid fa-book-bookmark"></i></div>
          <div class="metric-tile-value">${knoCount}</div>
          <div class="metric-tile-sub">SOPs, Standards & Patterns</div>
        </div>
        <div class="dx-metric-tile">
          <div class="metric-tile-header"><span>Total Projects</span><i class="fa-solid fa-diagram-project"></i></div>
          <div class="metric-tile-value">${prjCount}</div>
          <div class="metric-tile-sub">Production Plant Automations</div>
        </div>
        <div class="dx-metric-tile">
          <div class="metric-tile-header"><span>Reusable Assets</span><i class="fa-solid fa-cubes"></i></div>
          <div class="metric-tile-value">${astCount}</div>
          <div class="metric-tile-sub">Components, Flows & Prompts</div>
        </div>
        <div class="dx-metric-tile">
          <div class="metric-tile-header"><span>Learning Assets</span><i class="fa-solid fa-graduation-cap"></i></div>
          <div class="metric-tile-value">${lpCount}</div>
          <div class="metric-tile-sub">Across 6 Persona Tracks</div>
        </div>
        <div class="dx-metric-tile">
          <div class="metric-tile-header"><span>Capability Topics</span><i class="fa-solid fa-list-check"></i></div>
          <div class="metric-tile-value">${topCount}</div>
          <div class="metric-tile-sub">Across 8 DX Categories</div>
        </div>
        <div class="dx-metric-tile">
          <div class="metric-tile-header"><span>Pending Review</span><i class="fa-solid fa-clock"></i></div>
          <div class="metric-tile-value text-amber">${pendingEvi}</div>
          <div class="metric-tile-sub">Evidence Items Awaiting Audit</div>
        </div>
      `;
    }

    // 2. Render 4D Interactive Panels
    const panelsWrap = document.getElementById('dx-overview-4d-panels');
    if (panelsWrap) {
      panelsWrap.innerHTML = `
        <div class="dx-4d-panel ${DXState.currentDimensionFilter === 'Knowledge' ? 'active' : ''}" onclick="filterDXOverviewByDim('Knowledge')">
          <div class="dx-4d-badge-row"><span class="dx-4d-num-badge">DIMENSION 1</span><i class="fa-solid fa-brain text-cyan"></i></div>
          <h4>1. KNOWLEDGE</h4>
          <span class="dx-4d-meaning">What you understand</span>
          <p class="dx-4d-desc">Understanding principles, architectural boundaries, and standard operating procedures.</p>
          <div class="dx-4d-footer-stat"><span>18 Verified Standards</span><i class="fa-solid fa-arrow-right"></i></div>
        </div>
        <div class="dx-4d-panel ${DXState.currentDimensionFilter === 'Skill' ? 'active' : ''}" onclick="filterDXOverviewByDim('Skill')">
          <div class="dx-4d-badge-row"><span class="dx-4d-num-badge">DIMENSION 2</span><i class="fa-solid fa-code text-blue"></i></div>
          <h4>2. SKILL</h4>
          <span class="dx-4d-meaning">What you can perform hands-on</span>
          <p class="dx-4d-desc">Configuring canvas containers, writing DAX expressions, and connecting IoT gateways.</p>
          <div class="dx-4d-footer-stat"><span>24 Practical Exercises</span><i class="fa-solid fa-arrow-right"></i></div>
        </div>
        <div class="dx-4d-panel ${DXState.currentDimensionFilter === 'Experience' ? 'active' : ''}" onclick="filterDXOverviewByDim('Experience')">
          <div class="dx-4d-badge-row"><span class="dx-4d-num-badge">DIMENSION 3</span><i class="fa-solid fa-briefcase text-green"></i></div>
          <h4>3. EXPERIENCE</h4>
          <span class="dx-4d-meaning">What you applied & delivered</span>
          <p class="dx-4d-desc">Delivering real Genba solutions, managing production cutovers, and solving shopfloor bugs.</p>
          <div class="dx-4d-footer-stat"><span>14 Production Case Studies</span><i class="fa-solid fa-arrow-right"></i></div>
        </div>
        <div class="dx-4d-panel ${DXState.currentDimensionFilter === 'Sharing' ? 'active' : ''}" onclick="filterDXOverviewByDim('Sharing')">
          <div class="dx-4d-badge-row"><span class="dx-4d-num-badge">DIMENSION 4</span><i class="fa-solid fa-people-arrows text-coral"></i></div>
          <h4>4. KNOWLEDGE SHARING</h4>
          <span class="dx-4d-meaning">What you standardize & mentor</span>
          <p class="dx-4d-desc">Authoring SOPs, mentoring junior citizen developers, and conducting architecture reviews.</p>
          <div class="dx-4d-footer-stat"><span>9 Corporate Standards</span><i class="fa-solid fa-arrow-right"></i></div>
        </div>
      `;
    }

    // 3. Render 8 Category Cards
    const catsWrap = document.getElementById('dx-categories-grid');
    if (catsWrap && DXState.data.dxCategories) {
      catsWrap.innerHTML = DXState.data.dxCategories.map(cat => `
        <div class="dx-category-card" onclick="filterDXKnowledgeByCategory('${cat.id}')">
          <div class="cat-card-header">
            <div class="cat-card-icon" style="background: ${cat.color};">
              <i class="fa-solid ${cat.icon}"></i>
            </div>
            <div class="cat-card-title">
              <span class="cat-card-code">${cat.code}</span>
              <h3>${cat.name}</h3>
            </div>
          </div>
          <p class="cat-card-desc">${cat.description}</p>
          <div class="cat-card-stats-row">
            <span>${cat.topicsCount} Topics · ${cat.knowledgeCount} Standards</span>
            <span class="coverage-pill">${cat.coverage} Coverage</span>
          </div>
        </div>
      `).join('');
    }

    // 4. Render Live Activity Stream
    const actWrap = document.getElementById('dx-activity-stream');
    if (actWrap && DXState.data.dxAuditLog) {
      actWrap.innerHTML = DXState.data.dxAuditLog.slice(0, 5).map(act => `
        <div class="activity-item-row">
          <span class="act-type-badge act-type-${act.entity.toLowerCase().slice(0,3)}">${act.entity}</span>
          <div class="act-text">
            <strong>${act.user}:</strong> ${act.details}
          </div>
          <span class="act-time">${act.timestamp}</span>
        </div>
      `).join('');
    }
  }

  function filterDXOverviewByDim(dim) {
    DXState.currentDimensionFilter = dim;
    showToast('Filtered view by Dimension: ' + dim, 'info');
    if (dim === 'Knowledge') switchDXView('dx-knowledge');
    else if (dim === 'Skill') switchDXView('dx-learning');
    else if (dim === 'Experience') switchDXView('dx-experience');
    else if (dim === 'Sharing') switchDXView('dx-governance');
  }

  function filterDXKnowledgeByCategory(catId) {
    switchDXView('dx-knowledge');
    const select = document.getElementById('dx-kno-filter-cat');
    if (select) {
      select.value = catId;
      renderDXKnowledge();
    }
  }

  // ========================================================
  // RENDER: DX KNOWLEDGE LIBRARY
  // ========================================================
  function renderDXKnowledge() {
    if (!DXState.data) return;

    // Populate category dropdown
    const catSelect = document.getElementById('dx-kno-filter-cat');
    if (catSelect && catSelect.options.length <= 1) {
      (DXState.data.dxCategories || []).forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat.id;
        opt.textContent = `${cat.code}: ${cat.name}`;
        catSelect.appendChild(opt);
      });
      catSelect.addEventListener('change', renderDXKnowledgeCards);
    }

    // Populate type dropdown
    const typeSelect = document.getElementById('dx-kno-filter-type');
    if (typeSelect && typeSelect.options.length <= 1) {
      const types = ['Concept', 'Best Practice', 'SOP', 'Work Instruction', 'Standard', 'Checklist', 'Architecture Pattern', 'Coding Guideline', 'Reusable Component', 'Formula', 'Prompt', 'Training Material', 'Governance Rule'];
      types.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t;
        opt.textContent = t;
        typeSelect.appendChild(opt);
      });
      typeSelect.addEventListener('change', renderDXKnowledgeCards);
    }

    // Populate maturity dropdown
    const matSelect = document.getElementById('dx-kno-filter-maturity');
    if (matSelect && matSelect.options.length <= 1) {
      const levels = ['Aware', 'Practitioner', 'Applied', 'Delivered', 'Share & Sustain'];
      levels.forEach(lvl => {
        const opt = document.createElement('option');
        opt.value = lvl;
        opt.textContent = lvl;
        matSelect.appendChild(opt);
      });
      matSelect.addEventListener('change', renderDXKnowledgeCards);
    }

    // Populate dept dropdown
    const deptSelect = document.getElementById('dx-kno-filter-dept');
    if (deptSelect && deptSelect.options.length <= 1) {
      ['TIE & DX', 'QA & QC', 'PE', 'PC', 'PD', 'WH'].forEach(d => {
        const opt = document.createElement('option');
        opt.value = d;
        opt.textContent = d;
        deptSelect.appendChild(opt);
      });
      deptSelect.addEventListener('change', renderDXKnowledgeCards);
    }

    const searchInput = document.getElementById('dx-kno-search-input');
    if (searchInput && !searchInput.dataset.bound) {
      searchInput.dataset.bound = 'true';
      searchInput.addEventListener('input', debounce(renderDXKnowledgeCards, 200));
    }

    const resetBtn = document.getElementById('btn-reset-kno-filters');
    if (resetBtn && !resetBtn.dataset.bound) {
      resetBtn.dataset.bound = 'true';
      resetBtn.addEventListener('click', () => {
        if (catSelect) catSelect.value = 'ALL';
        if (typeSelect) typeSelect.value = 'ALL';
        if (matSelect) matSelect.value = 'ALL';
        if (deptSelect) deptSelect.value = 'ALL';
        if (searchInput) searchInput.value = '';
        renderDXKnowledgeCards();
      });
    }

    renderDXKnowledgeCards();
  }

  function renderDXKnowledgeCards() {
    const container = document.getElementById('dx-knowledge-cards-container');
    if (!container || !DXState.data) return;

    const query = (document.getElementById('dx-kno-search-input')?.value || '').toLowerCase().trim();
    const catVal = document.getElementById('dx-kno-filter-cat')?.value || 'ALL';
    const typeVal = document.getElementById('dx-kno-filter-type')?.value || 'ALL';
    const matVal = document.getElementById('dx-kno-filter-maturity')?.value || 'ALL';
    const deptVal = document.getElementById('dx-kno-filter-dept')?.value || 'ALL';

    const records = (DXState.data.dxKnowledge || []).filter(k => {
      if (catVal !== 'ALL' && k.categoryId !== catVal) return false;
      if (typeVal !== 'ALL' && k.knowledgeType !== typeVal) return false;
      if (matVal !== 'ALL' && k.maturityLevel !== matVal) return false;
      if (deptVal !== 'ALL' && k.department !== deptVal) return false;
      if (query) {
        const matchText = (k.title + ' ' + k.shortDescription + ' ' + (k.technologies || []).join(' ')).toLowerCase();
        if (!matchText.includes(query)) return false;
      }
      return true;
    });

    if (records.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: rgba(13, 30, 68, 0.5); border-radius: 12px; border: 1px dashed rgba(255,255,255,0.15);">
          <i class="fa-solid fa-folder-open fa-3x" style="color: #64748b; margin-bottom: 1rem;"></i>
          <h4 style="color: #ffffff; margin-bottom: 0.5rem;">No DX Knowledge Records Found</h4>
          <p style="color: #94a3b8; font-size: 0.85rem;">Try adjusting your search criteria or resetting filters.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = records.map(item => {
      const isBookmarked = DXState.bookmarks.has(item.id);
      return `
        <div class="dx-kno-card" id="kno-card-${item.id}">
          <div class="kno-card-top-badges">
            <span class="kno-type-badge">${item.knowledgeType}</span>
            <span class="kno-maturity-badge">${item.maturityLevel}</span>
          </div>
          <h3 class="kno-card-title">${item.title}</h3>
          <p class="kno-card-desc">${item.shortDescription}</p>
          <div class="kno-tech-tags-list">
            ${(item.technologies || []).map(t => `<span class="tech-tag-chip">${t}</span>`).join('')}
          </div>
          <div class="kno-card-footer">
            <div>
              <span style="color: #f1f5f9; font-weight: 700;">${item.owner}</span><br>
              <small style="color: #64748b;">${item.department} · Rev: ${item.updatedDate}</small>
            </div>
            <div class="kno-card-actions">
              <button type="button" class="btn-card-icon ${isBookmarked ? 'bookmarked' : ''}" onclick="toggleDXBookmark('${item.id}')" title="Save Bookmark">
                <i class="fa-solid fa-bookmark"></i>
              </button>
              <button type="button" class="btn-dx-action" onclick="openDXKnowledgeDetailModal('${item.id}')" style="padding: 0.35rem 0.7rem; font-size: 0.75rem;">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> Open
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function toggleDXBookmark(id) {
    if (DXState.bookmarks.has(id)) {
      DXState.bookmarks.delete(id);
      showToast('Bookmark removed', 'info');
    } else {
      DXState.bookmarks.add(id);
      showToast('Record bookmarked successfully', 'success');
    }
    saveDXState();
    renderDXKnowledgeCards();
  }

  function openDXKnowledgeDetailModal(id) {
    const item = (DXState.data.dxKnowledge || []).find(k => k.id === id);
    if (!item) return;

    const modal = document.getElementById('modal-dx-knowledge-detail');
    const titleEl = document.getElementById('dx-kno-modal-title');
    const subEl = document.getElementById('dx-kno-modal-sub');
    const bodyEl = document.getElementById('dx-kno-modal-body');

    if (titleEl) titleEl.textContent = item.title;
    if (subEl) subEl.textContent = `${item.knowledgeType} · ${item.department} · Owner: ${item.owner} · Last Review: ${item.reviewDate}`;

    if (bodyEl) {
      bodyEl.innerHTML = `
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.25rem;">
          <span class="sample-data-badge">${item.verificationStatus}</span>
          <span class="kno-type-badge">${item.knowledgeType}</span>
          <span class="kno-maturity-badge">${item.maturityLevel}</span>
          <span class="coverage-pill">Confidentiality: ${item.confidentiality || 'Internal'}</span>
        </div>

        <div class="detail-section-block">
          <h4><i class="fa-solid fa-briefcase text-cyan"></i> 1. Business Context & Problem Addressed</h4>
          <p><strong>Context:</strong> ${item.businessContext || 'N/A'}</p>
          <p><strong>Problem Addressed:</strong> ${item.problemAddressed || 'N/A'}</p>
        </div>

        <div class="detail-section-block">
          <h4><i class="fa-solid fa-circle-info text-blue"></i> 2. Core Knowledge & Principles</h4>
          <p>${item.explanation || item.shortDescription}</p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 0.75rem;">
            <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); padding: 0.75rem; border-radius: 8px;">
              <strong style="color: #34d399;">✓ When To Use:</strong>
              <p style="margin: 0.25rem 0 0 0; font-size: 0.8rem;">${item.whenToUse || 'Standard production applications.'}</p>
            </div>
            <div style="background: rgba(230, 0, 18, 0.1); border: 1px solid rgba(230, 0, 18, 0.3); padding: 0.75rem; border-radius: 8px;">
              <strong style="color: #ff6b6b;">✗ When NOT To Use:</strong>
              <p style="margin: 0.25rem 0 0 0; font-size: 0.8rem;">${item.whenNotToUse || 'Unapproved rogue environments.'}</p>
            </div>
          </div>
        </div>

        <div class="detail-section-block">
          <h4><i class="fa-solid fa-list-ol text-green"></i> 3. Step-by-Step Implementation Guidance</h4>
          <ol style="margin-left: 1.25rem; line-height: 1.6;">
            ${(item.stepStepGuidance || item.stepByStepGuidance || []).map(step => `<li>${step}</li>`).join('')}
          </ol>
        </div>

        <div class="detail-section-block">
          <h4><i class="fa-solid fa-code text-purple"></i> 4. Technical Details & Reusable Snippets</h4>
          <pre style="background: #080f1e; border: 1px solid rgba(255,255,255,0.1); padding: 0.85rem; border-radius: 8px; color: #00f2fe; font-family: monospace; font-size: 0.78rem; overflow-x: auto;"><code>${item.technicalDetails || '// No code snippet attached'}</code></pre>
        </div>

        <div class="detail-section-block">
          <h4><i class="fa-solid fa-triangle-exclamation text-amber"></i> 5. Lessons Learned & Operational Risks</h4>
          <p><strong>Lessons Learned:</strong> ${item.lessonsLearned || 'N/A'}</p>
          <p><strong>Operational Risks:</strong> ${item.risks || 'N/A'}</p>
          <p><strong>Security & Confidentiality:</strong> ${item.securityNotes || 'N/A'}</p>
        </div>

        <div class="detail-section-block">
          <h4><i class="fa-solid fa-paperclip text-cyan"></i> 6. Associated Files, Projects & Standards</h4>
          <p><strong>Related Standards:</strong> ${item.relatedStandards || 'DNKH Corporate Standard'}</p>
          <p><strong>Related Files:</strong> ${item.filesMeta || 'Technical documentation on SharePoint'}</p>
          <p><strong>Version History:</strong> ${item.versionHistory || 'v1.0'}</p>
        </div>
      `;
    }

    if (modal) {
      modal.hidden = false;
      const closeBtn = document.getElementById('btn-close-dx-kno-modal');
      if (closeBtn) closeBtn.onclick = () => modal.hidden = true;
    }
  }

  // ========================================================
  // RENDER: DX CAPABILITY MATRIX (HEATMAP)
  // ========================================================
  function renderDXMatrix() {
    const tbody = document.getElementById('dx-matrix-tbody');
    if (!tbody || !DXState.data) return;

    const viewSelect = document.getElementById('dx-matrix-filter-view');
    const empSelect = document.getElementById('dx-matrix-filter-emp');
    const catSelect = document.getElementById('dx-matrix-filter-cat');
    const deptSelect = document.getElementById('dx-matrix-filter-dept');

    if (catSelect && catSelect.options.length <= 1) {
      (DXState.data.dxCategories || []).forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat.id;
        opt.textContent = `${cat.code}: ${cat.name}`;
        catSelect.appendChild(opt);
      });
      catSelect.addEventListener('change', renderDXMatrix);
      if (viewSelect) viewSelect.addEventListener('change', renderDXMatrix);
      if (empSelect) empSelect.addEventListener('change', renderDXMatrix);
      if (deptSelect) deptSelect.addEventListener('change', renderDXMatrix);
    }

    const catVal = catSelect?.value || 'ALL';
    const isDeptView = viewSelect?.value === 'department';
    const empVal = empSelect?.value || 'EMP-4821';

    let topics = DXState.data.dxTopics || [];
    if (catVal !== 'ALL') {
      topics = topics.filter(t => t.categoryId === catVal);
    }

    tbody.innerHTML = topics.map(topic => {
      // Find matching assessment if any
      const asm = (DXState.data.dxAssessments || []).find(a => a.topicId === topic.id);
      
      const kLvl = asm ? asm.knowledgeLevel : (isDeptView ? 3 : 1);
      const sLvl = asm ? asm.skillLevel : (isDeptView ? 2 : 1);
      const eLvl = asm ? asm.experienceLevel : (isDeptView ? 3 : 0);
      const shLvl = asm ? asm.sharingLevel : (isDeptView ? 2 : 0);
      const targetLvl = asm ? asm.targetLevel : 4;
      const gap = Math.max(0, targetLvl - Math.round((kLvl + sLvl + eLvl + shLvl) / 4));

      return `
        <tr>
          <td>
            <div class="matrix-topic-cell">
              <i class="fa-solid fa-microchip text-cyan"></i>
              <div>
                <strong>${topic.name}</strong><br>
                <small style="color: #64748b;">${topic.difficulty} · ${(topic.technologies || []).slice(0, 2).join(', ')}</small>
              </div>
            </div>
          </td>
          <td>
            <button type="button" class="heatmap-cell-badge lvl-${kLvl}" onclick="openDXMatrixCellModal('${topic.id}', 'Knowledge', ${kLvl})" title="Level ${kLvl}">
              <span>L${kLvl}: ${getLvlName(kLvl)}</span>
            </button>
          </td>
          <td>
            <button type="button" class="heatmap-cell-badge lvl-${sLvl}" onclick="openDXMatrixCellModal('${topic.id}', 'Skill', ${sLvl})" title="Level ${sLvl}">
              <span>L${sLvl}: ${getLvlName(sLvl)}</span>
            </button>
          </td>
          <td>
            <button type="button" class="heatmap-cell-badge lvl-${eLvl}" onclick="openDXMatrixCellModal('${topic.id}', 'Experience', ${eLvl})" title="Level ${eLvl}">
              <span>L${eLvl}: ${getLvlName(eLvl)}</span>
            </button>
          </td>
          <td>
            <button type="button" class="heatmap-cell-badge lvl-${shLvl}" onclick="openDXMatrixCellModal('${topic.id}', 'Sharing', ${shLvl})" title="Level ${shLvl}">
              <span>L${shLvl}: ${getLvlName(shLvl)}</span>
            </button>
          </td>
          <td style="text-align: center;">
            <span style="font-weight: 800; color: ${gap === 0 ? '#34d399' : '#fbbf24'};">
              Target: L${targetLvl} (${gap === 0 ? '✓ Met' : '-' + gap + ' Gap'})
            </span>
          </td>
        </tr>
      `;
    }).join('');
  }

  function getLvlName(lvl) {
    const names = ['Not Started', 'Aware', 'Practitioner', 'Applied', 'Delivered', 'Share & Sustain'];
    return names[lvl] || 'L' + lvl;
  }

  function openDXMatrixCellModal(topicId, dimension, level) {
    const topic = (DXState.data.dxTopics || []).find(t => t.id === topicId);
    if (!topic) return;

    const modal = document.getElementById('modal-dx-matrix-cell');
    const titleEl = document.getElementById('dx-cell-modal-title');
    const subEl = document.getElementById('dx-cell-modal-sub');
    const bodyEl = document.getElementById('dx-cell-modal-body');

    if (titleEl) titleEl.textContent = `${topic.name} — ${dimension} Dimension`;
    if (subEl) subEl.textContent = `Current Evaluation: Level ${level} (${getLvlName(level)})`;

    const lvlObj = (DXState.data.dxCapabilityLevels || []).find(l => l.level === level) || {};

    if (bodyEl) {
      bodyEl.innerHTML = `
        <div style="margin-bottom: 1rem;">
          <span class="heatmap-cell-badge lvl-${level}" style="display: inline-flex; width: auto;">
            Level ${level}: ${lvlObj.name || getLvlName(level)}
          </span>
        </div>

        <div class="detail-section-block">
          <h4><i class="fa-solid fa-bullseye text-cyan"></i> Behavioral Definition</h4>
          <p><strong>Definition:</strong> ${lvlObj.definition || 'Demonstrated understanding of concepts.'}</p>
          <p><strong>Expected Behaviors:</strong> ${lvlObj.behaviors || 'Performs guided tasks.'}</p>
        </div>

        <div class="detail-section-block">
          <h4><i class="fa-solid fa-certificate text-green"></i> Required Verification Evidence</h4>
          <p>${lvlObj.requiredEvidence || 'Practical project demonstration or peer reviewed code.'}</p>
          <p><strong>Example Action:</strong> ${lvlObj.exampleActions || 'Complete training challenge.'}</p>
        </div>

        <div class="detail-section-block">
          <h4><i class="fa-solid fa-graduation-cap text-blue"></i> Suggested Next Development Action</h4>
          <p>${lvlObj.suggestedLearning || 'Advance to next hands-on lab in DX Learning Hub.'}</p>
          <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
            <button type="button" class="btn-dx-action primary" onclick="modal.hidden = true; switchDXView('dx-learning');">
              <i class="fa-solid fa-graduation-cap"></i> Open Learning Path
            </button>
            <button type="button" class="btn-dx-action" onclick="modal.hidden = true; openDXActionModal('assessment');">
              <i class="fa-solid fa-upload"></i> Submit New Evidence
            </button>
          </div>
        </div>
      `;
    }

    if (modal) {
      modal.hidden = false;
      const closeBtn = document.getElementById('btn-close-dx-cell-modal');
      if (closeBtn) closeBtn.onclick = () => modal.hidden = true;
    }
  }

  function exportMatrixToCSV() {
    if (!DXState.data || !DXState.data.dxTopics) return;
    let csv = "Topic ID,Topic Name,Category,Difficulty,Knowledge Level,Skill Level,Experience Level,Sharing Level,Target Level\n";
    
    DXState.data.dxTopics.forEach(t => {
      const asm = (DXState.data.dxAssessments || []).find(a => a.topicId === t.id);
      const k = asm ? asm.knowledgeLevel : 1;
      const s = asm ? asm.skillLevel : 1;
      const e = asm ? asm.experienceLevel : 0;
      const sh = asm ? asm.sharingLevel : 0;
      const tgt = asm ? asm.targetLevel : 4;
      csv += `"${t.id}","${t.name.replace(/"/g, '""')}","${t.categoryId}","${t.difficulty}",${k},${s},${e},${sh},${tgt}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "dx_capability_matrix_" + new Date().toISOString().slice(0,10) + ".csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Capability Matrix downloaded as CSV file', 'success');
  }

  // ========================================================
  // RENDER: DX PROJECTS (PROJECT DNA)
  // ========================================================
  function renderDXProjects() {
    const container = document.getElementById('dx-projects-cards-container');
    if (!container || !DXState.data) return;

    const deptVal = document.getElementById('dx-prj-filter-dept')?.value || 'ALL';
    const statusVal = document.getElementById('dx-prj-filter-status')?.value || 'ALL';

    const projects = (DXState.data.dxProjects || []).filter(p => {
      if (deptVal !== 'ALL' && p.department !== deptVal) return false;
      if (statusVal !== 'ALL' && p.status !== statusVal) return false;
      return true;
    });

    container.innerHTML = projects.map(prj => `
      <div class="dx-prj-card" id="prj-card-${prj.id}">
        <div class="prj-card-header">
          <div>
            <span class="sample-data-badge">[Sample Data]</span>
            <h3 class="prj-card-title">${prj.name}</h3>
          </div>
          <span class="prj-status-pill prj-status-${prj.status === 'Production' ? 'prod' : 'prog'}">${prj.status}</span>
        </div>
        <div class="prj-dept-tag"><i class="fa-solid fa-building"></i> ${prj.department} · Plant Area: ${prj.plantArea || 'AP Plant'}</div>
        <p class="prj-card-summary">${prj.summary}</p>
        
        <div class="prj-impact-box">
          <div>
            <span style="color: #94a3b8;">Hours Saved:</span>
            <strong class="impact-hours-saved"> ${prj.hoursSaved || 0} hrs/mo</strong>
          </div>
          <div>
            <span style="color: #94a3b8;">Doc Completeness:</span>
            <strong style="color: #00f2fe;"> ${prj.docCompleteness || '100%'}</strong>
          </div>
        </div>

        <div class="kno-tech-tags-list">
          ${(prj.techUsed || []).map(t => `<span class="tech-tag-chip">${t}</span>`).join('')}
        </div>

        <div class="kno-card-footer">
          <div>
            <span style="color: #ffffff; font-weight: 700;">Owner: ${prj.owner}</span><br>
            <small style="color: #64748b;">Deployed: ${prj.deploymentDate || 'Active'}</small>
          </div>
          <button type="button" class="btn-dx-action" onclick="openDXProjectDetailModal('${prj.id}')" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;">
            <i class="fa-solid fa-folder-open"></i> Full Story
          </button>
        </div>
      </div>
    `).join('');
  }

  function initDXProjectModalTabs() {
    const tabs = document.querySelectorAll('.btn-prj-modal-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const tabId = tab.dataset.tab;
        document.querySelectorAll('.prj-tab-panel').forEach(p => p.classList.remove('active'));
        const panel = document.getElementById(tabId);
        if (panel) panel.classList.add('active');
      });
    });
  }

  function openDXProjectDetailModal(id) {
    const prj = (DXState.data.dxProjects || []).find(p => p.id === id);
    if (!prj) return;

    const modal = document.getElementById('modal-dx-project-detail');
    const titleEl = document.getElementById('dx-prj-modal-title');
    const subEl = document.getElementById('dx-prj-modal-sub');
    const bodyEl = document.getElementById('dx-prj-modal-body');

    if (titleEl) titleEl.textContent = prj.name;
    if (subEl) subEl.textContent = `${prj.department} · Status: ${prj.status} · Owner: ${prj.owner} · Deployed: ${prj.deploymentDate || '2025'}`;

    if (bodyEl) {
      bodyEl.innerHTML = `
        <!-- Tab 1: Overview -->
        <div id="tab-overview" class="prj-tab-panel active">
          <div class="detail-section-block">
            <h4><i class="fa-solid fa-id-card text-cyan"></i> Project Identity & Stakeholders</h4>
            <p><strong>Project ID:</strong> ${prj.id}</p>
            <p><strong>Process Area:</strong> ${prj.process || 'Plant Assembly'}</p>
            <p><strong>Plant Area:</strong> ${prj.plantArea || 'AP Plant'}</p>
            <p><strong>Project Owner:</strong> ${prj.owner}</p>
            <p><strong>Executive Sponsor:</strong> ${prj.sponsor || 'Plant Director'}</p>
            <p><strong>Project Members:</strong> ${(prj.members || []).join(', ') || 'Cross-functional team'}</p>
            <p><strong>Timeline:</strong> Started ${prj.startDate || '2025-01-01'} · Deployed ${prj.deploymentDate || '2025-06-01'}</p>
          </div>
          <div class="detail-section-block">
            <h4><i class="fa-solid fa-bullseye text-blue"></i> Executive Summary</h4>
            <p>${prj.summary}</p>
          </div>
        </div>

        <!-- Tab 2: Current Problem -->
        <div id="tab-problem" class="prj-tab-panel">
          <div class="detail-section-block">
            <h4><i class="fa-solid fa-triangle-exclamation text-amber"></i> Genba Situation & Pain Points</h4>
            <p><strong>Current Situation:</strong> ${prj.currentSituation || prj.beforeState}</p>
            <p><strong>Business Problem:</strong> ${prj.businessProblem || 'Manual operational latency.'}</p>
            <p><strong>Risk if Not Improved:</strong> ${prj.riskIfNotImproved || 'Operational bottleneck.'}</p>
            <p><strong>Manhours Consumed Before:</strong> ${prj.hoursBefore || 0} hrs / month [Sample Data]</p>
          </div>
        </div>

        <!-- Tab 3: Analysis -->
        <div id="tab-analysis" class="prj-tab-panel">
          <div class="detail-section-block">
            <h4><i class="fa-solid fa-magnifying-glass-chart text-green"></i> Genba Observations & Root Cause</h4>
            <p><strong>Observations:</strong> ${prj.genbaObservations || 'Manual paperwork inspection observed at line.'}</p>
            <p><strong>Root Cause Analysis:</strong> ${prj.rootCause || 'Absence of centralized digital intake.'}</p>
            <p><strong>Technology Selection Rationale:</strong> ${prj.techSelectionReason || 'Zero incremental license cost with existing M365.'}</p>
          </div>
        </div>

        <!-- Tab 4: Solution -->
        <div id="tab-solution" class="prj-tab-panel">
          <div class="detail-section-block">
            <h4><i class="fa-solid fa-lightbulb text-purple"></i> Solution Design & Future Process</h4>
            <p><strong>Solution Summary:</strong> ${prj.solutionSummary || prj.afterState}</p>
            <p><strong>Future Process Flow:</strong> ${prj.futureProcess || 'Operator inputs on mobile -> Automated flow -> Instant dashboard.'}</p>
            <p><strong>Validation Logic:</strong> ${prj.validationLogic || 'Prevents quota over-allocation.'}</p>
          </div>
        </div>

        <!-- Tab 5: Architecture -->
        <div id="tab-architecture" class="prj-tab-panel">
          <div class="detail-section-block">
            <h4><i class="fa-solid fa-network-wired text-cyan"></i> System Architecture & Integrations</h4>
            <p><strong>Architecture Topology:</strong> ${prj.architecture || 'Power Apps Mobile UI -> Power Automate -> SharePoint Lists'}</p>
            <p><strong>Data Sources:</strong> ${(prj.dataSources || []).join(', ') || 'SharePoint Online Lists'}</p>
            <p><strong>Permission Model:</strong> ${prj.permissionModel || 'Item-Level Security via M365 Groups'}</p>
            <p><strong>Error Handling:</strong> ${prj.errorHandling || 'Scope Try-Catch with Teams alert'}</p>
          </div>
        </div>

        <!-- Tab 6: Results -->
        <div id="tab-results" class="prj-tab-panel">
          <div class="detail-section-block">
            <h4><i class="fa-solid fa-chart-line text-green"></i> Operational & Quality Impact [Sample Data]</h4>
            <p><strong>Before State:</strong> ${prj.beforeState}</p>
            <p><strong>After State:</strong> ${prj.afterState}</p>
            <p><strong>Hours Saved:</strong> <strong style="color: #34d399;">${prj.hoursSaved || 0} manhours/month</strong></p>
            <p><strong>Cost Saving:</strong> ${prj.costSaving || 'Sample: ~$3,000/mo'}</p>
            <p><strong>Adoption Rate:</strong> ${prj.userAdoption || '99.4% active user adoption'}</p>
          </div>
        </div>

        <!-- Tab 7: Lessons -->
        <div id="tab-lessons" class="prj-tab-panel">
          <div class="detail-section-block">
            <h4><i class="fa-solid fa-book-open text-gold"></i> Lessons Learned & Failure Prevention</h4>
            <p><strong>What Worked:</strong> ${prj.whatWorked || 'Early operator involvement in mockup design.'}</p>
            <p><strong>What Did Not Work:</strong> ${prj.whatDidNotWork || 'Email notifications (operators preferred Teams).'}</p>
            <p><strong>Key Organizational Learning:</strong> ${prj.lessonsLearned || 'Standardize container layouts early.'}</p>
          </div>
        </div>

        <!-- Tab 8: Assets -->
        <div id="tab-assets" class="prj-tab-panel">
          <div class="detail-section-block">
            <h4><i class="fa-solid fa-cubes text-purple"></i> Reusable Components & Formulas</h4>
            <p><strong>Components:</strong> ${(prj.reusableComponents || []).join(', ') || 'Fluent Header Component'}</p>
            <p><strong>Formulas:</strong> ${prj.reusableFormulas || 'Filter expressions'}</p>
            <p><strong>Related SOP:</strong> ${prj.relatedSOP || 'DNKH Standard'}</p>
          </div>
        </div>

        <!-- Tab 9: Governance -->
        <div id="tab-governance" class="prj-tab-panel">
          <div class="detail-section-block">
            <h4><i class="fa-solid fa-shield-halved text-coral"></i> Ownership & Sustainment SLA</h4>
            <p><strong>Primary App Owner:</strong> ${prj.appOwner || prj.owner}</p>
            <p><strong>Secondary Backup Owner:</strong> ${prj.backupOwner || 'Assigned peer'}</p>
            <p><strong>Maintenance Cadence:</strong> ${prj.maintenanceFrequency || 'Quarterly review'}</p>
            <p><strong>BCP Rollback Plan:</strong> ${prj.bcpNotes || 'Emergency paper forms at Genba post'}</p>
          </div>
        </div>

        <!-- Tab 10: Timeline -->
        <div id="tab-timeline" class="prj-tab-panel">
          <div class="detail-section-block">
            <h4><i class="fa-solid fa-clock-rotate-left text-blue"></i> Project Milestones</h4>
            <p><strong>Kickoff & Requirement Scoping:</strong> ${prj.startDate || '2025-01-01'}</p>
            <p><strong>Genba Pilot & User Testing:</strong> 4 weeks post-kickoff</p>
            <p><strong>Production Launch:</strong> ${prj.deploymentDate || '2025-06-01'}</p>
            <p><strong>Latest Health Check:</strong> ${prj.lastReview || '2026-01-15'}</p>
          </div>
        </div>
      `;

      // Reset to first tab
      const firstTab = document.querySelector('.btn-prj-modal-tab[data-tab="tab-overview"]');
      if (firstTab) {
        document.querySelectorAll('.btn-prj-modal-tab').forEach(t => t.classList.remove('active'));
        firstTab.classList.add('active');
      }
    }

    if (modal) {
      modal.hidden = false;
      const closeBtn = document.getElementById('btn-close-dx-prj-modal');
      if (closeBtn) closeBtn.onclick = () => modal.hidden = true;
    }
  }

  // ========================================================
  // RENDER: DX EXPERIENCE & FAILURE LESSONS
  // ========================================================
  function renderDXExperience() {
    const container = document.getElementById('dx-experience-cards-container');
    if (!container || !DXState.data) return;

    const filterBar = document.getElementById('dx-exp-type-filter-bar');
    if (filterBar && !filterBar.dataset.bound) {
      filterBar.dataset.bound = 'true';
      filterBar.querySelectorAll('.btn-learning-role').forEach(btn => {
        btn.addEventListener('click', () => {
          filterBar.querySelectorAll('.btn-learning-role').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          renderDXExperienceCards(btn.dataset.expType);
        });
      });
    }

    renderDXExperienceCards('ALL');
  }

  function renderDXExperienceCards(filterType = 'ALL') {
    const container = document.getElementById('dx-experience-cards-container');
    if (!container || !DXState.data) return;

    const experiences = (DXState.data.dxExperiences || []).filter(e => {
      if (filterType !== 'ALL' && e.experienceType !== filterType) return false;
      return true;
    });

    container.innerHTML = experiences.map(exp => {
      const isFailure = exp.experienceType === 'Failure Lesson';
      return `
        <div class="dx-exp-card ${isFailure ? 'is-failure' : ''}" id="exp-card-${exp.id}">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
            <span class="sample-data-badge" style="background: ${isFailure ? 'rgba(230,0,18,0.2)' : 'rgba(10,132,255,0.2)'}; color: ${isFailure ? '#ff6b6b' : '#38bdf8'};">
              ${exp.experienceType}
            </span>
            <span style="font-size: 0.72rem; color: #64748b;">${exp.date}</span>
          </div>
          <h3 style="font-size: 1.05rem; font-weight: 800; color: #ffffff; margin-bottom: 0.45rem;">${exp.title}</h3>
          <p style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.45; margin-bottom: 0.75rem; flex: 1;">
            <strong>Situation:</strong> ${exp.situation}
          </p>
          <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; padding: 0.6rem; font-size: 0.75rem; color: #94a3b8; margin-bottom: 0.85rem;">
            <strong style="color: ${isFailure ? '#fbbf24' : '#34d399'};">Learning:</strong> ${exp.learning}
          </div>
          <div class="kno-card-footer">
            <div>
              <span style="color: #ffffff; font-weight: 700;">${exp.contributor}</span><br>
              <small style="color: #64748b;">${exp.department} · Project: ${exp.project}</small>
            </div>
            <button type="button" class="btn-dx-action" onclick="openDXExperienceDetailModal('${exp.id}')" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;">
              <i class="fa-solid fa-expand"></i> Details
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  function openDXExperienceDetailModal(id) {
    const exp = (DXState.data.dxExperiences || []).find(e => e.id === id);
    if (!exp) return;

    const modal = document.getElementById('modal-dx-experience-detail');
    const titleEl = document.getElementById('dx-exp-modal-title');
    const bodyEl = document.getElementById('dx-exp-modal-body');

    if (titleEl) titleEl.textContent = exp.title;

    if (bodyEl) {
      const isFailure = exp.experienceType === 'Failure Lesson';
      bodyEl.innerHTML = `
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
          <span class="sample-data-badge">${exp.experienceType}</span>
          <span class="coverage-pill">Contributor: ${exp.contributor} (${exp.department})</span>
          <span class="coverage-pill">Project: ${exp.project}</span>
        </div>

        <div class="detail-section-block">
          <h4><i class="fa-solid fa-circle-question text-cyan"></i> Situation & Challenge</h4>
          <p><strong>Situation:</strong> ${exp.situation}</p>
          <p><strong>Challenge:</strong> ${exp.challenge}</p>
        </div>

        <div class="detail-section-block">
          <h4><i class="fa-solid fa-wrench text-blue"></i> Action Taken & Result</h4>
          <p><strong>Action:</strong> ${exp.action}</p>
          <p><strong>Result:</strong> ${exp.result}</p>
        </div>

        ${isFailure ? `
        <div class="detail-section-block" style="background: rgba(230, 0, 18, 0.08); border: 1px solid rgba(230, 0, 18, 0.3); padding: 1rem; border-radius: 8px;">
          <h4 style="color: #ff6b6b;"><i class="fa-solid fa-triangle-exclamation"></i> Failure Lesson Breakdown (Blameless Kaizen)</h4>
          <p><strong>Original Assumption:</strong> ${exp.originalAssumption || 'N/A'}</p>
          <p><strong>What Was Attempted:</strong> ${exp.whatWasAttempted || 'N/A'}</p>
          <p><strong>What Failed & Symptoms:</strong> ${exp.whatFailed || 'N/A'} - ${exp.symptoms || ''}</p>
          <p><strong>Root Cause:</strong> ${exp.rootCause || 'N/A'}</p>
          <p><strong>Business Impact:</strong> ${exp.businessImpact || 'N/A'}</p>
          <p><strong>Permanent Prevention Poka-Yoke:</strong> ${exp.permanentPrevention || 'N/A'}</p>
        </div>
        ` : ''}

        <div class="detail-section-block">
          <h4><i class="fa-solid fa-graduation-cap text-green"></i> Key Learnings & Recommendations</h4>
          <p><strong>Organizational Learning:</strong> ${exp.learning}</p>
          <p><strong>What Should Be Repeated:</strong> ${exp.whatShouldBeRepeated || 'N/A'}</p>
          <p><strong>What Should Be Avoided:</strong> ${exp.whatShouldBeAvoided || 'N/A'}</p>
        </div>
      `;
    }

    if (modal) {
      modal.hidden = false;
      const closeBtn = document.getElementById('btn-close-dx-exp-modal');
      if (closeBtn) closeBtn.onclick = () => modal.hidden = true;
    }
  }

  // ========================================================
  // RENDER: DX LEARNING HUB
  // ========================================================
  function renderDXLearning() {
    const container = document.getElementById('dx-learning-cards-container');
    if (!container || !DXState.data) return;

    const roleBar = document.getElementById('dx-lp-role-bar');
    if (roleBar && !roleBar.dataset.bound) {
      roleBar.dataset.bound = 'true';
      roleBar.querySelectorAll('.btn-learning-role').forEach(btn => {
        btn.addEventListener('click', () => {
          roleBar.querySelectorAll('.btn-learning-role').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          renderDXLearningCards(btn.dataset.roleFilter);
        });
      });
    }

    renderDXLearningCards('ALL');
  }

  function renderDXLearningCards(roleFilter = 'ALL') {
    const container = document.getElementById('dx-learning-cards-container');
    if (!container || !DXState.data) return;

    const paths = (DXState.data.dxLearningPaths || []).filter(lp => {
      if (roleFilter !== 'ALL' && lp.role !== roleFilter) return false;
      return true;
    });

    container.innerHTML = paths.map(lp => `
      <div class="dx-lp-card" id="lp-card-${lp.id}">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
          <span class="sample-data-badge">${lp.role}</span>
          <span style="font-size: 0.75rem; color: #38bdf8; font-weight: 700;">Est: ${lp.estimatedHours} Hours</span>
        </div>
        <h3 style="font-size: 1.15rem; font-weight: 800; color: #ffffff; margin-bottom: 0.35rem;">${lp.title}</h3>
        <p style="font-size: 0.8rem; color: #cbd5e1; margin-bottom: 0.75rem;">${lp.description}</p>
        
        <div class="lp-stages-timeline">
          ${(lp.stages || []).map(st => `
            <div class="lp-stage-node">
              <strong style="color: #00f2fe;">Level ${st.level}: ${st.stageName}</strong>
              <div style="font-size: 0.75rem; color: #94a3b8; margin-top: 0.25rem;">
                ${(st.modules || []).map(m => `• ${m.code}: ${m.title}`).join('<br>')}
              </div>
            </div>
          `).join('')}
        </div>

        <div class="kno-card-footer">
          <small style="color: #34d399; font-weight: 700;"><i class="fa-solid fa-award"></i> ${lp.badgeAwarded}</small>
          <button type="button" class="btn-dx-action primary" onclick="enrollLearningPath('${lp.id}')" style="padding: 0.35rem 0.8rem; font-size: 0.75rem;">
            <i class="fa-solid fa-play"></i> Enroll Track
          </button>
        </div>
      </div>
    `).join('');
  }

  function enrollLearningPath(id) {
    showToast('Enrolled in learning track. Modules added to your personal development plan.', 'success');
  }

  // ========================================================
  // RENDER: DX EXPERT FINDER
  // ========================================================
  function renderDXExperts() {
    const container = document.getElementById('dx-experts-cards-container');
    if (!container || !DXState.data) return;

    document.querySelectorAll('.btn-expert-chip').forEach(chip => {
      if (!chip.dataset.bound) {
        chip.dataset.bound = 'true';
        chip.addEventListener('click', () => {
          const query = chip.dataset.searchExp.toLowerCase();
          filterExpertsByQuery(query);
        });
      }
    });

    renderDXExpertCards((DXState.data.dxExperts || []));
  }

  function filterExpertsByQuery(query) {
    if (!DXState.data) return;
    const filtered = (DXState.data.dxExperts || []).filter(exp => {
      const text = (exp.name + ' ' + exp.role + ' ' + (exp.verifiedCapabilityTopics || []).join(' ')).toLowerCase();
      return text.includes(query);
    });
    renderDXExpertCards(filtered);
    showToast(`Found ${filtered.length} experts matching "${query}"`, 'info');
  }

  function renderDXExpertCards(experts) {
    const container = document.getElementById('dx-experts-cards-container');
    if (!container) return;

    container.innerHTML = experts.map(exp => `
      <div class="expert-profile-card" id="exp-card-${exp.id}">
        <div class="expert-header-row">
          <div class="expert-avatar-wrap">${exp.avatarInitials || exp.name.slice(0, 2)}</div>
          <div>
            <div class="expert-name">${exp.name}</div>
            <div class="expert-role">${exp.role}</div>
            <div class="expert-dept-tag">${exp.department} · ${(exp.languages || []).join(', ')}</div>
          </div>
        </div>
        <p style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.45; margin-bottom: 0.85rem;">${exp.bio || ''}</p>
        
        <div style="font-size: 0.75rem; color: #94a3b8; font-weight: 700; margin-bottom: 0.4rem;">Verified Capabilities:</div>
        <div class="expert-skills-list">
          ${(exp.verifiedCapabilityTopics || []).map(t => `<span class="skill-badge">${t}</span>`).join('')}
        </div>

        <div class="expert-footer-row">
          <span style="font-size: 0.75rem; color: ${exp.availabilityStatus.includes('Available') ? '#34d399' : '#fbbf24'}; font-weight: 700;">
            ● ${exp.availabilityStatus}
          </span>
          <button type="button" class="btn-dx-action primary" onclick="openDXExpertContactModal('${exp.id}')" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;">
            <i class="fa-solid fa-handshake"></i> Consult
          </button>
        </div>
      </div>
    `).join('');
  }

  function openDXExpertContactModal(id) {
    const exp = (DXState.data.dxExperts || []).find(e => e.id === id);
    if (!exp) return;

    const modal = document.getElementById('modal-dx-expert-contact');
    const nameEl = document.getElementById('dx-expert-contact-name');
    if (nameEl) nameEl.textContent = `Consult with ${exp.name} (${exp.role})`;

    if (modal) {
      modal.hidden = false;
      const closeBtn = document.getElementById('btn-close-dx-expert-contact');
      if (closeBtn) closeBtn.onclick = () => modal.hidden = true;
      const cancelBtn = document.getElementById('btn-cancel-dx-expert-req');
      if (cancelBtn) cancelBtn.onclick = () => modal.hidden = true;
    }
  }

  function submitExpertRequest() {
    const modal = document.getElementById('modal-dx-expert-contact');
    if (modal) modal.hidden = true;
    showToast('Consultation request dispatched to expert. You will receive an MS Teams notification.', 'success');
  }
  window.submitExpertRequest = submitExpertRequest;

  // ========================================================
  // RENDER: DX ASSESSMENT & EVIDENCE WORKFLOW
  // ========================================================
  function renderDXAssessment() {
    const container = document.getElementById('dx-assessments-table-container');
    if (!container || !DXState.data) return;

    const assessments = DXState.data.dxAssessments || [];

    container.innerHTML = `
      <div class="dx-matrix-table-wrap">
        <table class="dx-matrix-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Capability Topic</th>
              <th style="text-align: center;">K-S-E-KS</th>
              <th style="text-align: center;">Current / Target</th>
              <th>Evidence Summary</th>
              <th style="text-align: center;">Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${assessments.map(asm => `
              <tr>
                <td><strong>${asm.employeeName}</strong><br><small style="color: #64748b;">${asm.department} · ${asm.role}</small></td>
                <td><strong>${asm.topicName}</strong></td>
                <td style="text-align: center;">${asm.knowledgeLevel}-${asm.skillLevel}-${asm.experienceLevel}-${asm.sharingLevel}</td>
                <td style="text-align: center;">
                  <span class="heatmap-cell-badge lvl-${asm.currentOverallLevel}">L${asm.currentOverallLevel}</span> ➔ 
                  <strong style="color: #00f2fe;">L${asm.targetLevel}</strong>
                </td>
                <td style="font-size: 0.78rem; max-width: 240px;">${asm.evidenceDescription}</td>
                <td style="text-align: center;">
                  <span class="sample-data-badge" style="background: ${asm.reviewStatus === 'Verified' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}; color: ${asm.reviewStatus === 'Verified' ? '#34d399' : '#fbbf24'};">
                    ${asm.reviewStatus}
                  </span>
                </td>
                <td>
                  ${hasDXPermission('VERIFY_EVIDENCE') && asm.reviewStatus !== 'Verified' ? `
                    <button type="button" class="btn-dx-action primary" onclick="verifyDXEvidence('${asm.id}')" style="padding: 0.25rem 0.55rem; font-size: 0.72rem;">
                      <i class="fa-solid fa-check-double"></i> Verify
                    </button>
                  ` : `
                    <span style="font-size: 0.72rem; color: #94a3b8;">${asm.reviewStatus === 'Verified' ? 'Verified by ' + asm.reviewerName : 'Awaiting Reviewer'}</span>
                  `}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function verifyDXEvidence(asmId) {
    const asm = (DXState.data.dxAssessments || []).find(a => a.id === asmId);
    if (!asm) return;

    asm.reviewStatus = 'Verified';
    asm.reviewerName = DXState.currentRole === 'Admin' ? 'DX Administrator' : 'Somchai Prasert (Reviewer)';
    asm.lastReviewDate = new Date().toISOString().slice(0, 10);

    // Record in audit log
    if (DXState.data.dxAuditLog) {
      DXState.data.dxAuditLog.unshift({
        id: 'aud-' + Date.now(),
        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
        user: asm.reviewerName,
        action: 'VERIFY_EVIDENCE',
        entity: 'Assessment',
        targetId: asmId,
        details: `Verified evidence for ${asm.employeeName} on ${asm.topicName}`
      });
    }

    saveDXState();
    showToast(`Assessment for ${asm.employeeName} verified successfully!`, 'success');
    renderDXAssessment();
    updateScreen1DXStats();
  }

  // ========================================================
  // RENDER: DX ANALYTICS
  // ========================================================
  function renderDXAnalytics() {
    if (typeof Chart === 'undefined') return;

    // Destroy existing DX charts to prevent duplicates
    if (DXState.charts.dept) DXState.charts.dept.destroy();
    if (DXState.charts.tech) DXState.charts.tech.destroy();
    if (DXState.charts.radar) DXState.charts.radar.destroy();
    if (DXState.charts.trend) DXState.charts.trend.destroy();

    const ctxDept = document.getElementById('chart-dx-dept');
    if (ctxDept) {
      DXState.charts.dept = new Chart(ctxDept, {
        type: 'bar',
        data: {
          labels: ['PC', 'PE', 'TIE/DX', 'QA/QC', 'WH', 'PD', 'Safety'],
          datasets: [{
            label: 'Projects',
            data: [2, 1, 2, 1, 1, 1, 0],
            backgroundColor: 'rgba(230, 0, 18, 0.75)',
            borderColor: '#ff4d4d',
            borderWidth: 1.5,
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#94a3b8' } },
            y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#94a3b8', stepSize: 1 } }
          }
        }
      });
    }

    const ctxTech = document.getElementById('chart-dx-tech');
    if (ctxTech) {
      DXState.charts.tech = new Chart(ctxTech, {
        type: 'doughnut',
        data: {
          labels: ['Power Apps', 'Power Automate', 'SharePoint', 'Power BI', 'IoT & Edge', 'Copilot AI'],
          datasets: [{
            data: [7, 6, 6, 4, 2, 2],
            backgroundColor: ['#e60012', '#0a84ff', '#00f2fe', '#10b981', '#f59e0b', '#8b5cf6'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'right', labels: { color: '#cbd5e1', font: { size: 10 } } } }
        }
      });
    }

    const ctxRadar = document.getElementById('chart-dx-radar');
    if (ctxRadar) {
      DXState.charts.radar = new Chart(ctxRadar, {
        type: 'radar',
        data: {
          labels: ['1. Knowledge', '2. Hands-on Skill', '3. Real Delivery', '4. Knowledge Sharing'],
          datasets: [
            { label: 'Plant Target', data: [90, 85, 80, 75], borderColor: '#00f2fe', backgroundColor: 'rgba(0, 242, 254, 0.2)' },
            { label: 'Current Verified', data: [82, 78, 72, 64], borderColor: '#e60012', backgroundColor: 'rgba(230, 0, 18, 0.2)' }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: { color: 'rgba(255,255,255,0.1)' },
              grid: { color: 'rgba(255,255,255,0.1)' },
              pointLabels: { color: '#94a3b8', font: { size: 9 } },
              ticks: { display: false }
            }
          },
          plugins: { legend: { position: 'bottom', labels: { color: '#cbd5e1', font: { size: 10 } } } }
        }
      });
    }

    const ctxTrend = document.getElementById('chart-dx-trend');
    if (ctxTrend) {
      DXState.charts.trend = new Chart(ctxTrend, {
        type: 'line',
        data: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q1-26', 'Q2-26'],
          datasets: [{
            data: [4, 7, 11, 14, 16, 18],
            borderColor: '#34d399',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            fill: true,
            tension: 0.35,
            pointBackgroundColor: '#10b981',
            pointRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#94a3b8' } },
            y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#94a3b8' } }
          }
        }
      });
    }
  }

  // ========================================================
  // RENDER: DX GOVERNANCE & FUTURE DATA ARCHITECTURE
  // ========================================================
  function renderDXGovernance() {
    if (!DXState.data) return;

    // Render future entities
    const entWrap = document.getElementById('dx-future-entities-grid');
    if (entWrap && DXState.data.dxFutureEntities) {
      entWrap.innerHTML = DXState.data.dxFutureEntities.map(ent => `
        <div class="dx-category-card">
          <div class="cat-card-header">
            <div class="cat-card-icon" style="background: #003ea8;"><i class="fa-solid fa-table"></i></div>
            <div class="cat-card-title">
              <span class="cat-card-code">FUTURE ENTITY</span>
              <h3>${ent.entityName}</h3>
            </div>
          </div>
          <p class="cat-card-desc">
            <strong>SharePoint:</strong> ${ent.sharePointType}<br>
            <strong>Dataverse:</strong> ${ent.dataverseType}<br>
            <strong>Primary Key:</strong> ${ent.primaryKey}
          </p>
          <div style="font-size: 0.75rem; color: #cbd5e1; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.65rem;">
            <strong>Permissions:</strong> ${ent.permissionConsiderations}
          </div>
        </div>
      `).join('');
    }

    // Render audit log
    const auditTbody = document.getElementById('dx-audit-log-tbody');
    if (auditTbody && DXState.data.dxAuditLog) {
      auditTbody.innerHTML = DXState.data.dxAuditLog.map(log => `
        <tr>
          <td style="font-family: monospace; color: #00f2fe;">${log.timestamp}</td>
          <td><strong>${log.user}</strong></td>
          <td><span class="sample-data-badge">${log.action}</span></td>
          <td>${log.entity}</td>
          <td>${log.details}</td>
        </tr>
      `).join('');
    }
  }

  // ========================================================
  // UNIFIED CREATE & EDIT FORM MODAL
  // ========================================================
  let currentActionType = 'knowledge';

  function openDXActionModal(actionType = 'knowledge') {
    if (!hasDXPermission('ADD_RECORD')) {
      showToast('Viewer role cannot create records. Please switch to Contributor or Reviewer role.', 'error');
      return;
    }

    currentActionType = actionType;
    const modal = document.getElementById('modal-dx-action-form');
    const heading = document.getElementById('dx-form-heading');
    const fieldsWrap = document.getElementById('dx-form-dynamic-fields');

    const titles = {
      'knowledge': 'Add DX Knowledge Record',
      'project': 'Register DX Project',
      'experience': 'Add Project Experience',
      'failure': 'Record Failure Lesson (Blameless Kaizen)',
      'assessment': 'Start Capability Self-Assessment',
      'plan': 'Create Learning Plan'
    };

    if (heading) heading.textContent = titles[actionType] || 'Create DX Record';

    if (fieldsWrap) {
      if (actionType === 'knowledge') {
        fieldsWrap.innerHTML = `
          <div class="form-grid-2">
            <div class="f-group">
              <label>Knowledge Title *</label>
              <input type="text" id="inp-dx-title" required placeholder="e.g. Power Apps Responsive Container Standard" />
            </div>
            <div class="f-group">
              <label>Category *</label>
              <select id="inp-dx-cat" required>
                ${(DXState.data.dxCategories || []).map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="form-grid-2">
            <div class="f-group">
              <label>Knowledge Type *</label>
              <select id="inp-dx-type">
                <option value="SOP">SOP</option>
                <option value="Architecture Pattern">Architecture Pattern</option>
                <option value="Best Practice">Best Practice</option>
                <option value="Standard">Standard</option>
                <option value="Coding Guideline">Coding Guideline</option>
                <option value="Prompt">Prompt</option>
              </select>
            </div>
            <div class="f-group">
              <label>Maturity Level *</label>
              <select id="inp-dx-maturity">
                <option value="Aware">Aware</option>
                <option value="Practitioner">Practitioner</option>
                <option value="Applied">Applied</option>
                <option value="Delivered">Delivered</option>
                <option value="Share & Sustain" selected>Share & Sustain</option>
              </select>
            </div>
          </div>
          <div class="f-group">
            <label>Short Description *</label>
            <textarea id="inp-dx-desc" rows="2" required placeholder="Provide clear summary of this knowledge asset..."></textarea>
          </div>
          <div class="f-group">
            <label>Technical Guidance / Code Snippet</label>
            <textarea id="inp-dx-tech" rows="3" placeholder="Step-by-step instructions or formula syntax..."></textarea>
          </div>
        `;
      } else if (actionType === 'project') {
        fieldsWrap.innerHTML = `
          <div class="form-grid-2">
            <div class="f-group">
              <label>Project Name *</label>
              <input type="text" id="inp-dx-title" required placeholder="e.g. Radiator Line 2 QR Tracking" />
            </div>
            <div class="f-group">
              <label>Department *</label>
              <select id="inp-dx-dept">
                <option value="PC">Production Control (PC)</option>
                <option value="PE">Production Engineering (PE)</option>
                <option value="TIE & DX">TIE & DX</option>
                <option value="QA & QC">QA & QC</option>
                <option value="WH">Warehouse (WH)</option>
                <option value="PD">Production (PD)</option>
              </select>
            </div>
          </div>
          <div class="f-group">
            <label>Project Summary & Business Background *</label>
            <textarea id="inp-dx-desc" rows="2" required placeholder="Describe pain points, manual manhours, and digital solution..."></textarea>
          </div>
          <div class="form-grid-2">
            <div class="f-group">
              <label>Estimated Hours Saved / Month [Sample Data]</label>
              <input type="number" id="inp-dx-hours" value="45" />
            </div>
            <div class="f-group">
              <label>Status *</label>
              <select id="inp-dx-status">
                <option value="In Progress">In Progress</option>
                <option value="Production" selected>Production</option>
              </select>
            </div>
          </div>
        `;
      } else if (actionType === 'experience' || actionType === 'failure') {
        fieldsWrap.innerHTML = `
          <div class="form-grid-2">
            <div class="f-group">
              <label>Title *</label>
              <input type="text" id="inp-dx-title" required placeholder="e.g. Resolving Flow Delegation Glitch" />
            </div>
            <div class="f-group">
              <label>Experience Type *</label>
              <select id="inp-dx-exp-type">
                <option value="Problem-Solving Experience" ${actionType === 'experience' ? 'selected' : ''}>Problem-Solving</option>
                <option value="Failure Lesson" ${actionType === 'failure' ? 'selected' : ''}>Failure Lesson (Blameless Kaizen)</option>
                <option value="Implementation Experience">Implementation</option>
                <option value="Integration Experience">Integration</option>
              </select>
            </div>
          </div>
          <div class="f-group">
            <label>Situation & What Was Attempted *</label>
            <textarea id="inp-dx-desc" rows="2" required placeholder="Describe what you were trying to accomplish..."></textarea>
          </div>
          <div class="f-group">
            <label>Root Cause & Permanent Prevention Lesson *</label>
            <textarea id="inp-dx-tech" rows="2" required placeholder="What was the underlying systemic issue and what should be standardized?"></textarea>
          </div>
        `;
      } else if (actionType === 'assessment') {
        fieldsWrap.innerHTML = `
          <div class="form-grid-2">
            <div class="f-group">
              <label>Your Name & Department *</label>
              <input type="text" id="inp-dx-user" required value="Ananya Kasem (TIE & DX)" />
            </div>
            <div class="f-group">
              <label>Select Capability Topic *</label>
              <select id="inp-dx-topic">
                ${(DXState.data.dxTopics || []).map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
              </select>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin-bottom: 1rem;">
            <div><label style="font-size: 0.72rem;">1. Knowledge</label><input type="number" id="inp-lvl-k" min="0" max="5" value="3" class="dx-select-control" style="width: 100%;" /></div>
            <div><label style="font-size: 0.72rem;">2. Skill</label><input type="number" id="inp-lvl-s" min="0" max="5" value="3" class="dx-select-control" style="width: 100%;" /></div>
            <div><label style="font-size: 0.72rem;">3. Experience</label><input type="number" id="inp-lvl-e" min="0" max="5" value="2" class="dx-select-control" style="width: 100%;" /></div>
            <div><label style="font-size: 0.72rem;">4. Sharing</label><input type="number" id="inp-lvl-sh" min="0" max="5" value="2" class="dx-select-control" style="width: 100%;" /></div>
          </div>
          <div class="f-group">
            <label>Attached Evidence Summary & Project Artifact *</label>
            <textarea id="inp-dx-desc" rows="2" required placeholder="Reference production solution, training completion, or SOP link..."></textarea>
          </div>
        `;
      } else {
        fieldsWrap.innerHTML = `
          <div class="f-group">
            <label>Plan Title *</label>
            <input type="text" id="inp-dx-title" required placeholder="e.g. Citizen Developer Level 4 Development Plan" />
          </div>
          <div class="f-group">
            <label>Target Capability Goals *</label>
            <textarea id="inp-dx-desc" rows="3" required placeholder="Outline target learning modules and real-work challenge..."></textarea>
          </div>
        `;
      }
    }

    if (modal) {
      modal.hidden = false;
      const closeBtn = document.getElementById('btn-close-dx-action-form');
      if (closeBtn) closeBtn.onclick = () => modal.hidden = true;
      const cancelBtn = document.getElementById('btn-cancel-dx-form');
      if (cancelBtn) cancelBtn.onclick = () => modal.hidden = true;
    }
  }
  window.openDXActionModal = openDXActionModal;

  function initDXActionForm() {
    const form = document.getElementById('dx-record-management-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      saveDXFormData();
    });

    const topAddBtn = document.getElementById('btn-top-add-dx');
    if (topAddBtn) {
      topAddBtn.addEventListener('click', () => {
        openDXActionModal('knowledge');
      });
    }
  }

  function saveDXFormData() {
    const modal = document.getElementById('modal-dx-action-form');
    const title = document.getElementById('inp-dx-title')?.value || 'New Submission';
    const desc = document.getElementById('inp-dx-desc')?.value || '';
    const tech = document.getElementById('inp-dx-tech')?.value || '';

    const newId = 'rec-' + Date.now();
    const today = new Date().toISOString().slice(0, 10);

    if (currentActionType === 'knowledge') {
      const cat = document.getElementById('inp-dx-cat')?.value || 'cat-b';
      const type = document.getElementById('inp-dx-type')?.value || 'SOP';
      const maturity = document.getElementById('inp-dx-maturity')?.value || 'Applied';

      DXState.data.dxKnowledge.unshift({
        id: newId,
        title,
        categoryId: cat,
        knowledgeType: type,
        maturityLevel: maturity,
        shortDescription: desc,
        explanation: desc,
        technicalDetails: tech,
        owner: 'Current User',
        department: 'TIE & DX',
        updatedDate: today,
        verified: true,
        verificationStatus: 'Submitted Draft',
        technologies: ['Power Platform', 'Citizen Development']
      });

      showToast(`Knowledge "${title}" registered successfully!`, 'success');
      switchDXView('dx-knowledge');
    } else if (currentActionType === 'project') {
      const dept = document.getElementById('inp-dx-dept')?.value || 'PE';
      const hours = parseInt(document.getElementById('inp-dx-hours')?.value || '40', 10);

      DXState.data.dxProjects.unshift({
        id: newId,
        name: title,
        department: dept,
        summary: desc,
        hoursSaved: hours,
        status: 'Production',
        owner: 'Current User',
        deploymentDate: today,
        docCompleteness: '90%',
        techUsed: ['Power Apps', 'Power Automate']
      });

      showToast(`Project "${title}" registered successfully!`, 'success');
      switchDXView('dx-projects');
    } else if (currentActionType === 'experience' || currentActionType === 'failure') {
      const expType = document.getElementById('inp-dx-exp-type')?.value || 'Problem-Solving Experience';

      DXState.data.dxExperiences.unshift({
        id: newId,
        title,
        experienceType: expType,
        situation: desc,
        learning: tech,
        contributor: 'Current User',
        department: 'TIE & DX',
        project: 'Genba Kaizen',
        date: today
      });

      showToast(`Experience "${title}" added successfully!`, 'success');
      switchDXView('dx-experience');
    } else if (currentActionType === 'assessment') {
      const topicId = document.getElementById('inp-dx-topic')?.value || 'top-pa-canvas';
      const topic = (DXState.data.dxTopics || []).find(t => t.id === topicId);
      const k = parseInt(document.getElementById('inp-lvl-k')?.value || '3', 10);
      const s = parseInt(document.getElementById('inp-lvl-s')?.value || '3', 10);
      const e = parseInt(document.getElementById('inp-lvl-e')?.value || '2', 10);
      const sh = parseInt(document.getElementById('inp-lvl-sh')?.value || '2', 10);

      DXState.data.dxAssessments.unshift({
        id: 'asm-' + Date.now(),
        employeeId: 'EMP-CURRENT',
        employeeName: 'Current User',
        role: 'Citizen Developer',
        department: 'TIE & DX',
        topicId: topicId,
        topicName: topic ? topic.name : 'Capability Topic',
        knowledgeLevel: k,
        skillLevel: s,
        experienceLevel: e,
        sharingLevel: sh,
        currentOverallLevel: Math.round((k + s + e + sh) / 4),
        targetLevel: 4,
        evidenceDescription: desc,
        reviewStatus: 'Submitted',
        reviewerName: 'Pending Review'
      });

      showToast('Capability assessment submitted for review!', 'success');
      switchDXView('dx-assessment');
    }

    // Record audit log
    if (DXState.data.dxAuditLog) {
      DXState.data.dxAuditLog.unshift({
        id: 'aud-' + Date.now(),
        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
        user: 'Current User',
        action: 'CREATE_RECORD',
        entity: currentActionType.toUpperCase(),
        targetId: newId,
        details: `Created ${currentActionType}: ${title}`
      });
    }

    saveDXState();
    updateScreen1DXStats();
    if (modal) modal.hidden = true;
  }

  // ========================================================
  // UNIFIED GLOBAL SEARCH
  // ========================================================
  function initDXGlobalSearch() {
    const topBtn = document.getElementById('btn-top-global-search');
    const modal = document.getElementById('modal-dx-global-search');
    const input = document.getElementById('dx-global-search-input');
    const closeBtn = document.getElementById('btn-close-dx-search-modal');

    if (topBtn && modal) {
      topBtn.addEventListener('click', () => {
        modal.hidden = false;
        if (input) {
          input.value = '';
          input.focus();
        }
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => modal.hidden = true);
    }

    if (input) {
      input.addEventListener('input', debounce(performGlobalUnifiedSearch, 200));
    }
  }

  function performGlobalUnifiedSearch() {
    const input = document.getElementById('dx-global-search-input');
    const panel = document.getElementById('dx-global-search-results-panel');
    if (!input || !panel) return;

    const q = input.value.toLowerCase().trim();
    if (!q || q.length < 2) {
      panel.innerHTML = '<p style="color: #94a3b8; font-size: 0.85rem; text-align: center;">Type at least 2 characters to search across Quality and DX repositories...</p>';
      return;
    }

    // 1. Search Quality Defects
    const defects = (AppState.defects || []).filter(d => 
      (d.title + ' ' + d.product + ' ' + d.occurrence + ' ' + (d.countermeasure || '')).toLowerCase().includes(q)
    );

    // 2. Search Quality Knowledge
    const qKnowledge = (AppState.knowledge || []).filter(k => 
      (k.title + ' ' + k.category + ' ' + k.desc).toLowerCase().includes(q)
    );

    // 3. Search DX Knowledge
    const dxKno = (DXState.data?.dxKnowledge || []).filter(k => 
      (k.title + ' ' + k.shortDescription + ' ' + (k.technologies || []).join(' ')).toLowerCase().includes(q)
    );

    // 4. Search DX Projects
    const dxPrj = (DXState.data?.dxProjects || []).filter(p => 
      (p.name + ' ' + p.summary + ' ' + p.department).toLowerCase().includes(q)
    );

    // 5. Search DX Experiences
    const dxExp = (DXState.data?.dxExperiences || []).filter(e => 
      (e.title + ' ' + e.situation + ' ' + e.learning).toLowerCase().includes(q)
    );

    // 6. Search DX Experts
    const dxExpList = (DXState.data?.dxExperts || []).filter(e => 
      (e.name + ' ' + e.role + ' ' + (e.verifiedCapabilityTopics || []).join(' ')).toLowerCase().includes(q)
    );

    const totalMatches = defects.length + qKnowledge.length + dxKno.length + dxPrj.length + dxExp.length + dxExpList.length;

    if (totalMatches === 0) {
      panel.innerHTML = `<p style="color: #94a3b8; font-size: 0.85rem; text-align: center;">No matching records found for "<strong style="color: #ffffff;">${q}</strong>". Try a broader keyword.</p>`;
      return;
    }

    let out = `<p style="color: #38bdf8; font-size: 0.78rem; font-weight: 700; margin-bottom: 0.75rem;">Found ${totalMatches} result(s) across corporate repositories:</p>`;

    // Group 1: DX Knowledge
    if (dxKno.length > 0) {
      out += '<div class="search-results-group-title"><i class="fa-solid fa-book-bookmark"></i> DX Knowledge Standards (' + dxKno.length + ')</div>';
      dxKno.forEach(k => {
        out += `
          <div class="activity-item-row" style="cursor: pointer; margin-bottom: 0.4rem;" onclick="document.getElementById('modal-dx-global-search').hidden=true; switchToWorkspace('dx'); openDXKnowledgeDetailModal('${k.id}');">
            <span class="act-type-badge act-type-kno">${k.knowledgeType}</span>
            <div class="act-text">
              <strong style="color: #ffffff;">${highlightMatch(k.title, q)}</strong><br>
              <small style="color: #94a3b8;">${highlightMatch(k.shortDescription.slice(0, 100), q)}...</small>
            </div>
            <i class="fa-solid fa-arrow-right text-cyan"></i>
          </div>
        `;
      });
    }

    // Group 2: DX Projects
    if (dxPrj.length > 0) {
      out += '<div class="search-results-group-title"><i class="fa-solid fa-diagram-project"></i> Production Projects (' + dxPrj.length + ')</div>';
      dxPrj.forEach(p => {
        out += `
          <div class="activity-item-row" style="cursor: pointer; margin-bottom: 0.4rem;" onclick="document.getElementById('modal-dx-global-search').hidden=true; switchToWorkspace('dx'); openDXProjectDetailModal('${p.id}');">
            <span class="act-type-badge act-type-prj">${p.department}</span>
            <div class="act-text">
              <strong style="color: #ffffff;">${highlightMatch(p.name, q)}</strong><br>
              <small style="color: #94a3b8;">${highlightMatch(p.summary.slice(0, 100), q)}...</small>
            </div>
            <i class="fa-solid fa-arrow-right text-red"></i>
          </div>
        `;
      });
    }

    // Group 3: Quality Defect Cases
    if (defects.length > 0) {
      out += '<div class="search-results-group-title"><i class="fa-solid fa-screwdriver-wrench"></i> Quality Troubleshooting Cases (' + defects.length + ')</div>';
      defects.forEach(d => {
        out += `
          <div class="activity-item-row" style="cursor: pointer; margin-bottom: 0.4rem;" onclick="document.getElementById('modal-dx-global-search').hidden=true; switchToWorkspace('quality'); switchScreen('screen-2'); openPdfModal('${d.id}');">
            <span class="act-type-badge act-type-prj">${d.product}</span>
            <div class="act-text">
              <strong style="color: #ffffff;">${highlightMatch(d.title, q)}</strong><br>
              <small style="color: #94a3b8;">${highlightMatch((d.occurrence || '').slice(0, 100), q)}...</small>
            </div>
            <i class="fa-solid fa-file-pdf text-red"></i>
          </div>
        `;
      });
    }

    // Group 4: Experts
    if (dxExpList.length > 0) {
      out += '<div class="search-results-group-title"><i class="fa-solid fa-user-tie"></i> Domain Experts (' + dxExpList.length + ')</div>';
      dxExpList.forEach(e => {
        out += `
          <div class="activity-item-row" style="cursor: pointer; margin-bottom: 0.4rem;" onclick="document.getElementById('modal-dx-global-search').hidden=true; switchToWorkspace('dx'); switchDXView('dx-experts');">
            <span class="act-type-badge act-type-asm">${e.department}</span>
            <div class="act-text">
              <strong style="color: #ffffff;">${highlightMatch(e.name, q)}</strong> — ${e.role}
            </div>
            <i class="fa-solid fa-handshake text-blue"></i>
          </div>
        `;
      });
    }

    panel.innerHTML = out;
  }

  function highlightMatch(text, query) {
    if (!text) return '';
    const idx = text.toLowerCase().indexOf(query);
    if (idx === -1) return text;
    return text.substring(0, idx) + '<span class="search-match-highlight">' + text.substring(idx, idx + query.length) + '</span>' + text.substring(idx + query.length);
  }

  function debounce(fn, wait) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  // Bind to DOM ready
  const existingDomReady = document.readyState;
  if (existingDomReady === 'complete' || existingDomReady === 'interactive') {
    initDXModule();
  } else {
    document.addEventListener('DOMContentLoaded', initDXModule);
  }

  // Global Exports
  window.switchToWorkspace = switchToWorkspace;
  window.switchDXView = switchDXView;
  window.filterDXOverviewByDim = filterDXOverviewByDim;
  window.filterDXKnowledgeByCategory = filterDXKnowledgeByCategory;
  window.openDXKnowledgeDetailModal = openDXKnowledgeDetailModal;
  window.openDXProjectDetailModal = openDXProjectDetailModal;
  window.openDXExperienceDetailModal = openDXExperienceDetailModal;
  window.openDXMatrixCellModal = openDXMatrixCellModal;
  window.openDXExpertContactModal = openDXExpertContactModal;
  window.verifyDXEvidence = verifyDXEvidence;
  window.toggleDXBookmark = toggleDXBookmark;
  window.enrollLearningPath = enrollLearningPath;
  window.resetDemoData = resetDemoData;
  window.exportMatrixToCSV = exportMatrixToCSV;

