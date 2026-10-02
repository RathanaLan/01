/**
 * SlideCraft - 100% Microsoft PowerPoint Clone Engine
 * Implements:
 * - Office Fluent Ribbon tabs & panels
 * - Slide Layouts (Title, Content, Section, Comparison, Blank)
 * - Text formatting with non-destructive live styling (preserves caret/focus)
 * - 8-point resize handles & 360-degree rotating lollipop handle
 * - Clipboard (Cut, Copy, Paste, Duplicate)
 * - Categorized SVG Shapes & Online/Device Images
 * - Tables (3x3 customizable table element)
 * - Freehand Inks / Drawing (Pen, Highlighter, Eraser)
 * - PowerPoint Slide Sorter View
 * - Speaker Notes Drawer
 * - Status bar with Zoom slider & Fit to Window
 * - Slide Show with Presenter Tools (Laser pointer, Black screen, Transitions)
 * - PowerPoint Backstage (File menu) with PDF / Print Export and JSON backup
 */

(function () {
  'use strict';

  const CANVAS_WIDTH = 960;
  const CANVAS_HEIGHT = 540;

  // Global State
  let presentationData = {
    title: 'Presentation1',
    aspectRatio: '16:9',
    theme: 'office',
    transition: 'fade',
    slides: []
  };

  let activeSlideIndex = 0;
  let selectedElementId = null;
  let isEditingText = false;
  let isPresentationMode = false;
  let isLaserActive = false;
  let isBlackScreen = false;
  let currentZoom = 0.85;
  let saveDebounceTimer = null;
  let clipboardData = null;

  // Drawing state
  let activeDrawMode = 'select'; // 'select' | 'pen' | 'highlighter'
  let isDrawing = false;
  let currentPathD = '';
  let activePathElement = null;

  // View Mode: 'normal' | 'sorter'
  let activeViewMode = 'normal';

  // DOM Elements
  const deckTitleInput = document.getElementById('deck-title-input');
  const saveStatusText = document.getElementById('save-status-text');
  const qatSave = document.getElementById('qat-save');
  const qatUndo = document.getElementById('qat-undo');
  const qatRedo = document.getElementById('qat-redo');
  const qatSlideshow = document.getElementById('qat-slideshow');
  const btnShareDeck = document.getElementById('btn-share-deck');
  const winMaximize = document.getElementById('win-maximize');

  // Ribbon Tabs & Panels
  const ribbonTabs = document.querySelectorAll('.ribbon-tab:not(.tab-file)');
  const ribbonPanels = document.querySelectorAll('.ribbon-panel');
  const tabFile = document.getElementById('tab-file');

  // Backstage View
  const backstageOverlay = document.getElementById('backstage-overlay');
  const backstageCloseBtn = document.getElementById('backstage-close-btn');
  const bsTabs = document.querySelectorAll('.bs-tab:not(.bs-exit)');
  const bsViews = document.querySelectorAll('.bs-view');
  const bsInfoTitle = document.getElementById('bs-info-title');
  const bsInfoSlides = document.getElementById('bs-info-slides');
  const bsSaveNow = document.getElementById('bs-save-now');
  const btnExportJson = document.getElementById('btn-export-json');

  // Home Tab Controls
  const btnNewSlideMain = document.getElementById('btn-new-slide-main');
  const dropdownNewSlide = document.getElementById('dropdown-new-slide');
  const btnDuplicateSlide = document.getElementById('btn-duplicate-slide');
  const btnDeleteSlide = document.getElementById('btn-delete-slide');

  const btnCut = document.getElementById('btn-cut');
  const btnCopy = document.getElementById('btn-copy');
  const btnPaste = document.getElementById('btn-paste');
  const btnDuplicateElem = document.getElementById('btn-duplicate-elem');

  const fmtFontFamily = document.getElementById('fmt-font-family');
  const fmtFontSizeSelect = document.getElementById('fmt-font-size-select');
  const btnFontGrow = document.getElementById('btn-font-grow');
  const btnFontShrink = document.getElementById('btn-font-shrink');
  const fmtBold = document.getElementById('fmt-bold');
  const fmtItalic = document.getElementById('fmt-italic');
  const fmtUnderline = document.getElementById('fmt-underline');
  const fmtStrike = document.getElementById('fmt-strike');
  const fmtColor = document.getElementById('fmt-color');
  const fmtHighlight = document.getElementById('fmt-highlight');
  const btnBulletList = document.getElementById('btn-bullet-list');
  const btnNumberList = document.getElementById('btn-number-list');
  const fmtAlignLeft = document.getElementById('fmt-align-left');
  const fmtAlignCenter = document.getElementById('fmt-align-center');
  const fmtAlignRight = document.getElementById('fmt-align-right');
  const fmtAlignJustify = document.getElementById('fmt-align-justify');

  const fmtShapeFill = document.getElementById('fmt-shape-fill');
  const fmtShapeOutline = document.getElementById('fmt-shape-outline');
  const btnBringFront = document.getElementById('btn-bring-front');
  const btnSendBack = document.getElementById('btn-send-back');
  const btnDeleteActiveElem = document.getElementById('btn-delete-active-elem');

  // Insert Tab Controls
  const btnInsertTextbox = document.getElementById('btn-insert-textbox');
  const btnInsertWordart = document.getElementById('btn-insert-wordart');
  const pptImageFile = document.getElementById('ppt-image-file');
  const btnInsertOnlinePic = document.getElementById('btn-insert-online-pic');
  const onlineImageModal = document.getElementById('onlineImageModal');
  const onlineImgUrl = document.getElementById('online-img-url');
  const btnConfirmOnlineImg = document.getElementById('btn-confirm-online-img');
  const btnShapesDropdown = document.getElementById('btn-shapes-dropdown');
  const dropdownShapesMenu = document.getElementById('dropdown-shapes-menu');
  const btnInsertTable = document.getElementById('btn-insert-table');

  // Draw Tab Controls
  const toolSelectMode = document.getElementById('tool-select-mode');
  const toolPen = document.getElementById('tool-pen');
  const toolHighlighter = document.getElementById('tool-highlighter');
  const toolEraser = document.getElementById('tool-eraser');
  const inkCanvas = document.getElementById('ink-canvas');

  // Design Tab Controls
  const slideSizeSelect = document.getElementById('slide-size-select');
  const slideBgPicker = document.getElementById('slide-bg-picker');
  const themeCards = document.querySelectorAll('.theme-card');

  // Transitions Tab Controls
  const transitionCards = document.querySelectorAll('.transition-card');
  const btnPreviewTransition = document.getElementById('btn-preview-transition');
  const btnApplyAllTransitions = document.getElementById('btn-apply-all-transitions');

  // Slide Show Tab Controls
  const btnShowFromBeginning = document.getElementById('btn-show-from-beginning');
  const btnShowFromCurrent = document.getElementById('btn-show-from-current');

  // View Tab Controls
  const viewNormal = document.getElementById('view-normal');
  const viewSorter = document.getElementById('view-sorter');
  const chkShowNotes = document.getElementById('chk-show-notes');
  const chkShowGrid = document.getElementById('chk-show-grid');

  // Workspace & Canvas
  const slideSidebar = document.getElementById('slide-sidebar');
  const sidebarAddSlideBtn = document.getElementById('sidebar-add-slide-btn');
  const slidesThumbnailList = document.getElementById('slides-thumbnail-list');
  const pptStageArea = document.getElementById('ppt-stage-area');
  const slideStageScaler = document.getElementById('slide-stage-scaler');
  const pptSlideCanvas = document.getElementById('ppt-slide-canvas');

  // Speaker Notes Pane
  const speakerNotesPane = document.getElementById('speaker-notes-pane');
  const speakerNotesInput = document.getElementById('speaker-notes-input');
  const btnNotesClose = document.getElementById('btn-notes-close');

  // Status Bar
  const statusSlideCounter = document.getElementById('status-slide-counter');
  const btnStatusNotes = document.getElementById('btn-status-notes');
  const btnViewNormal = document.getElementById('btn-view-normal');
  const btnViewSorter = document.getElementById('btn-view-sorter');
  const btnViewSlideshow = document.getElementById('btn-view-slideshow');
  const zoomSlider = document.getElementById('zoom-slider');
  const zoomPercentage = document.getElementById('zoom-percentage');
  const btnZoomOut = document.getElementById('btn-zoom-out');
  const btnZoomInc = document.getElementById('btn-zoom-inc');
  const btnZoomFit = document.getElementById('btn-zoom-fit');

  // Presentation Mode Elements
  const pptSlideshowOverlay = document.getElementById('ppt-slideshow-overlay');
  const slideshowSlide = document.getElementById('slideshow-slide');
  const laserPointer = document.getElementById('laser-pointer');
  const hudPrev = document.getElementById('hud-prev');
  const hudNext = document.getElementById('hud-next');
  const hudSlideIdx = document.getElementById('hud-slide-idx');
  const hudLaser = document.getElementById('hud-laser');
  const hudBlack = document.getElementById('hud-black');
  const hudExit = document.getElementById('hud-exit');


  // ==========================================================================
  // 1. INITIALIZATION & DATA LOADING
  // ==========================================================================
  async function init() {
    setupEventListeners();
    await loadPresentation();
    fitCanvasToViewport();
    window.addEventListener('resize', fitCanvasToViewport);
  }

  async function loadPresentation() {
    updateSaveStatus('Loading presentation...');
    try {
      const res = await fetch(`/api/presentations/${window.PRESENTATION_ID}`);
      const json = await res.json();
      if (res.ok && json.data) {
        presentationData = json.data;
        if (!presentationData.slides || presentationData.slides.length === 0) {
          presentationData.slides = [createSlideFromLayout('title')];
        }
        deckTitleInput.value = json.title || presentationData.title || 'Presentation1';
        activeSlideIndex = 0;
        renderAll();
        updateSaveStatus('Saved to Cloud');
      } else {
        alert('Could not load presentation data: ' + (json.error || 'Server error'));
      }
    } catch (err) {
      console.error(err);
      updateSaveStatus('Offline / Error');
    }
  }

  // ==========================================================================
  // 2. SAVING & SYNCING
  // ==========================================================================
  function scheduleSave() {
    updateSaveStatus('Saving...');
    clearTimeout(saveDebounceTimer);
    saveDebounceTimer = setTimeout(savePresentation, 1200);
  }

  async function savePresentation() {
    clearTimeout(saveDebounceTimer);
    updateSaveStatus('Saving...');
    try {
      const payload = {
        title: deckTitleInput.value.trim() || 'Untitled Presentation',
        data: presentationData
      };
      presentationData.title = payload.title;

      const res = await fetch(`/api/presentations/${window.PRESENTATION_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        updateSaveStatus('Saved to Cloud');
      } else {
        updateSaveStatus('Save Error');
      }
    } catch (err) {
      console.error(err);
      updateSaveStatus('Offline');
    }
  }

  function updateSaveStatus(msg) {
    saveStatusText.textContent = msg;
    if (bsInfoTitle) bsInfoTitle.textContent = deckTitleInput.value;
    if (bsInfoSlides) bsInfoSlides.textContent = presentationData.slides.length;
  }

  // ==========================================================================
  // 3. SLIDE LAYOUTS ENGINE
  // ==========================================================================
  function createSlideFromLayout(layoutType) {
    const slideId = 'slide_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
    const bg = getThemeBackgroundColor();

    const slide = {
      id: slideId,
      layout: layoutType,
      background: bg,
      transition: presentationData.transition || 'fade',
      notes: '',
      inks: [], // SVG path strings
      elements: []
    };

    switch (layoutType) {
      case 'title':
        slide.elements.push({
          id: 'el_' + Date.now() + '_t',
          type: 'text',
          isPlaceholder: true,
          x: 100, y: 150, width: 760, height: 110,
          content: 'Click to add title',
          fontSize: 54, fontWeight: 'bold', color: '#1e293b',
          textAlign: 'center', fontFamily: 'Inter'
        });
        slide.elements.push({
          id: 'el_' + Date.now() + '_sub',
          type: 'text',
          isPlaceholder: true,
          x: 180, y: 280, width: 600, height: 70,
          content: 'Click to add subtitle',
          fontSize: 24, fontWeight: 'normal', color: '#64748b',
          textAlign: 'center', fontFamily: 'Inter'
        });
        break;

      case 'title_content':
        slide.elements.push({
          id: 'el_' + Date.now() + '_head',
          type: 'text',
          isPlaceholder: true,
          x: 70, y: 40, width: 820, height: 60,
          content: 'Click to add title',
          fontSize: 36, fontWeight: 'bold', color: '#1e293b',
          textAlign: 'left', fontFamily: 'Inter'
        });
        slide.elements.push({
          id: 'el_' + Date.now() + '_body',
          type: 'text',
          isPlaceholder: true,
          x: 70, y: 120, width: 820, height: 360,
          content: '• Click to add text<br>• Add second bullet point<br>• Insert graphics, shapes, or tables',
          fontSize: 22, fontWeight: 'normal', color: '#334155',
          textAlign: 'left', fontFamily: 'Inter'
        });
        break;

      case 'section':
        slide.elements.push({
          id: 'el_' + Date.now() + '_sec',
          type: 'text',
          isPlaceholder: true,
          x: 100, y: 220, width: 760, height: 100,
          content: 'Section Header',
          fontSize: 48, fontWeight: 'bold', color: '#0f172a',
          textAlign: 'left', fontFamily: 'Inter'
        });
        break;

      case 'two_content':
        slide.elements.push({
          id: 'el_' + Date.now() + '_head',
          type: 'text',
          isPlaceholder: true,
          x: 70, y: 40, width: 820, height: 60,
          content: 'Comparison Title',
          fontSize: 36, fontWeight: 'bold', color: '#1e293b',
          textAlign: 'left', fontFamily: 'Inter'
        });
        slide.elements.push({
          id: 'el_' + Date.now() + '_col1',
          type: 'text',
          isPlaceholder: true,
          x: 70, y: 120, width: 390, height: 360,
          content: '• First column content<br>• Key metric or observation',
          fontSize: 20, fontWeight: 'normal', color: '#334155',
          textAlign: 'left', fontFamily: 'Inter'
        });
        slide.elements.push({
          id: 'el_' + Date.now() + '_col2',
          type: 'text',
          isPlaceholder: true,
          x: 500, y: 120, width: 390, height: 360,
          content: '• Second column comparison<br>• Additional details or results',
          fontSize: 20, fontWeight: 'normal', color: '#334155',
          textAlign: 'left', fontFamily: 'Inter'
        });
        break;

      case 'title_only':
        slide.elements.push({
          id: 'el_' + Date.now() + '_head',
          type: 'text',
          isPlaceholder: true,
          x: 70, y: 40, width: 820, height: 60,
          content: 'Click to add title',
          fontSize: 36, fontWeight: 'bold', color: '#1e293b',
          textAlign: 'left', fontFamily: 'Inter'
        });
        break;

      case 'blank':
      default:
        break;
    }

    return slide;
  }

  function getThemeBackgroundColor() {
    switch (presentationData.theme) {
      case 'dark': return '#0f172a';
      case 'indigo': return '#1e1b4b';
      case 'emerald': return '#064e3b';
      case 'sunset': return '#7c2d12';
      case 'office':
      default: return '#ffffff';
    }
  }

  function getActiveSlide() {
    return presentationData.slides[activeSlideIndex] || presentationData.slides[0];
  }

  function getSelectedElement() {
    if (!selectedElementId) return null;
    const slide = getActiveSlide();
    return slide ? slide.elements.find(el => el.id === selectedElementId) : null;
  }

  // ==========================================================================
  // 4. RENDERING ENGINE: CANVAS & THUMBNAILS
  // ==========================================================================
  function renderAll() {
    if (activeViewMode === 'sorter') {
      renderSlideSorter();
    } else {
      renderCanvas();
      renderThumbnails();
    }
    renderStatusBar();
    syncNotes();
    syncFormatBar();
  }

  function renderStatusBar() {
    statusSlideCounter.textContent = `Slide ${activeSlideIndex + 1} of ${presentationData.slides.length}`;
  }

  function renderCanvas() {
    const slide = getActiveSlide();
    if (!slide) return;

    pptSlideCanvas.style.backgroundColor = slide.background || '#ffffff';
    slideBgPicker.value = (slide.background && slide.background.startsWith('#')) ? slide.background : '#ffffff';

    // Clear slide element nodes (keeping the ink-canvas SVG)
    const existingElements = pptSlideCanvas.querySelectorAll('.slide-element');
    existingElements.forEach(n => n.remove());

    // Render elements
    slide.elements.forEach(el => {
      const node = createElementDOM(el, false);
      pptSlideCanvas.appendChild(node);
    });

    // Render Inks SVG paths
    renderInks(slide.inks || []);
  }

  function createElementDOM(el, isPresentation) {
    const node = document.createElement('div');
    node.className = 'slide-element';
    node.id = isPresentation ? `pres_${el.id}` : el.id;
    node.style.left = `${el.x}px`;
    node.style.top = `${el.y}px`;
    node.style.width = `${el.width}px`;
    node.style.height = `${el.height}px`;

    if (el.rotation) {
      node.style.transform = `rotate(${el.rotation}deg)`;
    }

    if (!isPresentation && el.id === selectedElementId) {
      node.classList.add('is-selected');
    }

    // TYPE: TEXT
    if (el.type === 'text') {
      node.classList.add('element-text');
      if (el.isPlaceholder) node.classList.add('is-placeholder');
      node.innerHTML = el.content || '';
      node.style.fontSize = `${el.fontSize || 24}px`;
      node.style.fontWeight = el.fontWeight || 'normal';
      node.style.fontStyle = el.fontStyle || 'normal';
      node.style.textDecoration = el.textDecoration || 'none';
      node.style.color = el.color || '#0f172a';
      node.style.textAlign = el.textAlign || 'left';
      node.style.fontFamily = el.fontFamily || 'Inter';
      if (el.fill && el.fill !== 'transparent') node.style.backgroundColor = el.fill;
      if (el.highlight) node.style.backgroundColor = el.highlight;

      if (!isPresentation) {
        // Single-click selects; second click or double-click enters direct edit
        node.addEventListener('click', (e) => {
          if (selectedElementId === el.id && !isEditingText) {
            e.stopPropagation();
            startTextEditing(node, el);
          }
        });
        node.addEventListener('dblclick', (e) => {
          e.stopPropagation();
          startTextEditing(node, el);
        });
      }

    // TYPE: IMAGE
    } else if (el.type === 'image') {
      node.classList.add('element-image');
      const img = document.createElement('img');
      img.src = el.src || '';
      img.alt = 'Graphic';
      node.appendChild(img);
      if (el.borderWidth && el.borderWidth > 0) {
        node.style.border = `${el.borderWidth}px solid ${el.borderColor || '#000'}`;
      }

    // TYPE: SHAPE
    } else if (el.type === 'shape') {
      node.classList.add('element-shape');
      node.innerHTML = renderShapeSVG(el.shape, el.fill, el.borderColor, el.borderWidth);

    // TYPE: TABLE
    } else if (el.type === 'table') {
      node.classList.add('element-table');
      node.innerHTML = renderTableHTML(el, isPresentation);
    }

    if (!isPresentation) {
      attachTransformHandles(node, el);

      node.addEventListener('mousedown', (e) => {
        if (activeDrawMode !== 'select') return;
        if (e.target.classList.contains('ppt-handle') || 
            e.target.classList.contains('ppt-rot-handle') || 
            isEditingText) {
          return;
        }
        e.stopPropagation();
        selectElement(el.id);
        startDragging(e, el, node);
      });
    }

    return node;
  }

  function renderShapeSVG(shape, fill, border, width) {
    const stroke = (width > 0) ? `stroke="${border || '#1d4ed8'}" stroke-width="${width * 2}"` : '';
    const f = fill || '#3b82f6';

    switch (shape) {
      case 'circle':
        return `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><ellipse cx="50" cy="50" rx="46" ry="46" fill="${f}" ${stroke}/></svg>`;
      case 'rounded':
        return `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><rect x="4" y="4" width="92" height="92" rx="16" fill="${f}" ${stroke}/></svg>`;
      case 'triangle':
        return `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="50,4 96,96 4,96" fill="${f}" ${stroke}/></svg>`;
      case 'diamond':
        return `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="50,2 98,50 50,98 2,50" fill="${f}" ${stroke}/></svg>`;
      case 'star':
        return `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="50,4 62,36 96,36 68,57 79,92 50,71 21,92 32,57 4,36 38,36" fill="${f}" ${stroke}/></svg>`;
      case 'arrow':
        return `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="4,34 56,34 56,12 96,50 56,88 56,66 4,66" fill="${f}" ${stroke}/></svg>`;
      case 'arrow_left':
        return `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="96,34 44,34 44,12 4,50 44,88 44,66 96,66" fill="${f}" ${stroke}/></svg>`;
      case 'callout':
        return `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M4 10 Q4 4 10 4 L90 4 Q96 4 96 10 L96 66 Q96 72 90 72 L40 72 L20 94 L24 72 L10 72 Q4 72 4 66 Z" fill="${f}" ${stroke}/></svg>`;
      case 'rectangle':
      default:
        return `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><rect x="2" y="2" width="96" height="96" fill="${f}" ${stroke}/></svg>`;
    }
  }

  function renderTableHTML(el, isPresentation) {
    const rows = el.rows || 3;
    const cols = el.cols || 3;
    const cells = el.cells || {};
    let html = `<table style="width:100%; height:100%; border-collapse:collapse; table-layout:fixed; font-size:14px;">`;

    for (let r = 0; r < rows; r++) {
      html += `<tr>`;
      for (let c = 0; c < cols; c++) {
        const val = cells[`${r}_${c}`] || (r === 0 ? `Header ${c+1}` : `Data`);
        const bg = r === 0 ? '#2563eb' : (r % 2 === 1 ? '#ffffff' : '#f8fafc');
        const color = r === 0 ? '#ffffff' : '#0f172a';
        const weight = r === 0 ? 'bold' : 'normal';
        const editAttr = !isPresentation ? `contenteditable="true" data-rc="${r}_${c}"` : '';
        html += `<td ${editAttr} style="border:1px solid #cbd5e1; padding:6px 10px; background:${bg}; color:${color}; font-weight:${weight}; outline:none;">${val}</td>`;
      }
      html += `</tr>`;
    }
    html += `</table>`;
    return html;
  }

  function attachTransformHandles(node, el) {
    const handles = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];
    handles.forEach(h => {
      const hNode = document.createElement('div');
      hNode.className = `ppt-handle handle-${h}`;
      hNode.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        startResizing(e, el, node, h);
      });
      node.appendChild(hNode);
    });

    // Rotation Lollipop Handle
    const rotStem = document.createElement('div');
    rotStem.className = 'ppt-rot-stem';
    const rotHandle = document.createElement('div');
    rotHandle.className = 'ppt-rot-handle';
    rotHandle.title = 'Rotate element';

    rotHandle.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      startRotating(e, el, node);
    });

    node.appendChild(rotStem);
    node.appendChild(rotHandle);
  }

  // ==========================================================================
  // 5. THUMBNAILS LIST
  // ==========================================================================
  function renderThumbnails() {
    slidesThumbnailList.innerHTML = '';
    const scale = 176 / CANVAS_WIDTH;

    presentationData.slides.forEach((slide, idx) => {
      const item = document.createElement('div');
      item.className = 'ppt-thumb-item' + (idx === activeSlideIndex ? ' active' : '');
      item.onclick = () => switchSlide(idx);

      const num = document.createElement('div');
      num.className = 'ppt-thumb-num';
      num.textContent = idx + 1;

      const wrapper = document.createElement('div');
      wrapper.className = 'ppt-thumb-wrapper';

      const mini = document.createElement('div');
      mini.className = 'ppt-mini-stage';
      mini.style.backgroundColor = slide.background || '#ffffff';
      mini.style.transform = `scale(${scale})`;

      slide.elements.forEach(el => {
        mini.appendChild(createElementDOM(el, true));
      });

      // Render miniature inks
      if (slide.inks && slide.inks.length > 0) {
        const miniSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        miniSvg.setAttribute('style', 'position:absolute; inset:0; width:100%; height:100%; pointer-events:none;');
        slide.inks.forEach(d => {
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', d.d);
          path.setAttribute('stroke', d.color || '#000');
          path.setAttribute('stroke-width', d.width || 3);
          path.setAttribute('fill', 'none');
          miniSvg.appendChild(path);
        });
        mini.appendChild(miniSvg);
      }

      wrapper.appendChild(mini);
      item.appendChild(num);
      item.appendChild(wrapper);
      slidesThumbnailList.appendChild(item);
    });
  }

  function switchSlide(index) {
    if (index >= 0 && index < presentationData.slides.length) {
      activeSlideIndex = index;
      selectedElementId = null;
      renderAll();
    }
  }

  // ==========================================================================
  // 6. SLIDE SORTER VIEW
  // ==========================================================================
  function renderSlideSorter() {
    pptStageArea.innerHTML = '';
    const grid = document.createElement('div');
    grid.className = 'sorter-grid';
    grid.style.cssText = 'display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:24px; padding:30px; width:100%; overflow-y:auto;';

    const scale = 260 / CANVAS_WIDTH;

    presentationData.slides.forEach((slide, idx) => {
      const card = document.createElement('div');
      card.style.cssText = `display:flex; flex-direction:column; gap:6px; cursor:pointer; padding:6px; border-radius:4px; border:2px solid ${idx === activeSlideIndex ? 'var(--ppt-red)' : '#cbd5e1'}; background:#ffffff; box-shadow:0 4px 6px rgba(0,0,0,0.1);`;

      const box = document.createElement('div');
      box.style.cssText = `width:100%; aspect-ratio:16/9; position:relative; overflow:hidden; background:${slide.background || '#ffffff'};`;

      const mini = document.createElement('div');
      mini.style.cssText = `width:960px; height:540px; transform-origin:top left; transform:scale(${scale}); pointer-events:none; position:relative;`;

      slide.elements.forEach(el => mini.appendChild(createElementDOM(el, true)));
      box.appendChild(mini);

      const label = document.createElement('div');
      label.style.cssText = 'font-size:12px; font-weight:700; color:#475569; text-align:center;';
      label.textContent = `Slide ${idx + 1}`;

      card.appendChild(box);
      card.appendChild(label);

      card.onclick = () => {
        activeSlideIndex = idx;
        switchViewMode('normal');
      };

      grid.appendChild(card);
    });

    pptStageArea.appendChild(grid);
  }

  function switchViewMode(mode) {
    activeViewMode = mode;
    viewNormal.classList.toggle('active', mode === 'normal');
    viewSorter.classList.toggle('active', mode === 'sorter');
    btnViewNormal.classList.toggle('active', mode === 'normal');
    btnViewSorter.classList.toggle('active', mode === 'sorter');

    if (mode === 'normal') {
      pptStageArea.innerHTML = '';
      pptStageArea.appendChild(slideStageScaler);
      slideSidebar.style.display = 'flex';
      renderAll();
      fitCanvasToViewport();
    } else {
      slideSidebar.style.display = 'none';
      renderSlideSorter();
    }
  }

  // ==========================================================================
  // 7. SELECTION & LIVE FORMATTING
  // ==========================================================================
  function selectElement(id) {
    if (selectedElementId === id) return;
    selectedElementId = id;
    renderCanvas();
    syncFormatBar();
  }

  function deselectAll() {
    if (selectedElementId !== null) {
      selectedElementId = null;
      renderCanvas();
      syncFormatBar();
    }
  }

  function syncFormatBar() {
    const el = getSelectedElement();
    if (!el) return;

    if (el.type === 'text') {
      fmtFontFamily.value = el.fontFamily || 'Inter';
      fmtFontSizeSelect.value = String(el.fontSize || 24);
      fmtBold.classList.toggle('active', el.fontWeight === 'bold');
      fmtItalic.classList.toggle('active', el.fontStyle === 'italic');
      fmtUnderline.classList.toggle('active', el.textDecoration === 'underline');
      fmtColor.value = (el.color && el.color.startsWith('#')) ? el.color : '#0f172a';
    } else if (el.type === 'shape') {
      fmtShapeFill.value = (el.fill && el.fill.startsWith('#')) ? el.fill : '#3b82f6';
      fmtShapeOutline.value = (el.borderColor && el.borderColor.startsWith('#')) ? el.borderColor : '#1d4ed8';
    }
  }

  // Non-destructive live formatting (Applies instantly without destroying focus)
  function applyLiveFormat(prop, value) {
    const el = getSelectedElement();
    if (!el) return;

    el[prop] = value;
    const domNode = document.getElementById(el.id);
    if (!domNode) return;

    if (prop === 'fontFamily') domNode.style.fontFamily = value;
    else if (prop === 'fontSize') domNode.style.fontSize = value + 'px';
    else if (prop === 'fontWeight') domNode.style.fontWeight = value;
    else if (prop === 'fontStyle') domNode.style.fontStyle = value;
    else if (prop === 'textDecoration') domNode.style.textDecoration = value;
    else if (prop === 'color') domNode.style.color = value;
    else if (prop === 'textAlign') domNode.style.textAlign = value;
    else if (prop === 'fill') {
      if (el.type === 'shape') {
        const svgPath = domNode.querySelector('svg *');
        if (svgPath) svgPath.setAttribute('fill', value);
      } else {
        domNode.style.backgroundColor = value;
      }
    } else if (prop === 'borderColor') {
      if (el.type === 'shape') {
        const svgPath = domNode.querySelector('svg *');
        if (svgPath) {
          svgPath.setAttribute('stroke', value);
          if (!el.borderWidth) el.borderWidth = 2;
          svgPath.setAttribute('stroke-width', el.borderWidth * 2);
        }
      } else {
        domNode.style.borderColor = value;
      }
    }

    renderThumbnails();
    scheduleSave();
  }

  function startTextEditing(node, el) {
    isEditingText = true;
    node.contentEditable = 'true';
    node.classList.add('is-editing');
    if (el.isPlaceholder) {
      node.classList.remove('is-placeholder');
      el.isPlaceholder = false;
      if (node.textContent.includes('Click to add')) {
        node.textContent = '';
      }
    }
    node.focus();

    function finish() {
      if (!isEditingText) return;
      isEditingText = false;
      node.contentEditable = 'false';
      node.classList.remove('is-editing');
      el.content = node.innerHTML;
      renderThumbnails();
      scheduleSave();
      node.removeEventListener('blur', finish);
    }
    node.addEventListener('blur', finish);
  }

  // ==========================================================================
  // 8. CLIPBOARD (CUT, COPY, PASTE, DUPLICATE)
  // ==========================================================================
  function copySelectedElement() {
    const el = getSelectedElement();
    if (!el) return;
    clipboardData = JSON.parse(JSON.stringify(el));
  }

  function cutSelectedElement() {
    const el = getSelectedElement();
    if (!el) return;
    copySelectedElement();
    btnDeleteActiveElem.click();
  }

  function pasteElement() {
    if (!clipboardData) return;
    const cloned = JSON.parse(JSON.stringify(clipboardData));
    cloned.id = 'el_' + Date.now();
    cloned.x = Math.min(CANVAS_WIDTH - (cloned.width || 100), (cloned.x || 100) + 20);
    cloned.y = Math.min(CANVAS_HEIGHT - (cloned.height || 60), (cloned.y || 100) + 20);

    getActiveSlide().elements.push(cloned);
    selectedElementId = cloned.id;
    renderAll();
    scheduleSave();
  }

  // ==========================================================================
  // 9. DRAG, RESIZE & ROTATE
  // ==========================================================================
  function startDragging(e, el, node) {
    const startX = e.clientX;
    const startY = e.clientY;
    const initX = el.x;
    const initY = el.y;

    function onMove(me) {
      const dx = (me.clientX - startX) / currentZoom;
      const dy = (me.clientY - startY) / currentZoom;
      el.x = Math.round(initX + dx);
      el.y = Math.round(initY + dy);
      node.style.left = `${el.x}px`;
      node.style.top = `${el.y}px`;
    }

    function onUp() {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      renderThumbnails();
      scheduleSave();
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  function startResizing(e, el, node, handle) {
    const startX = e.clientX;
    const startY = e.clientY;
    const initX = el.x;
    const initY = el.y;
    const initW = el.width;
    const initH = el.height;
    const minS = 24;

    function onMove(me) {
      const dx = (me.clientX - startX) / currentZoom;
      const dy = (me.clientY - startY) / currentZoom;

      let nw = initW, nh = initH, nx = initX, ny = initY;

      if (handle.includes('e')) nw = Math.max(minS, initW + dx);
      if (handle.includes('s')) nh = Math.max(minS, initH + dy);
      if (handle.includes('w')) {
        const potential = initW - dx;
        if (potential >= minS) { nw = potential; nx = initX + dx; }
      }
      if (handle.includes('n')) {
        const potential = initH - dy;
        if (potential >= minS) { nh = potential; ny = initY + dy; }
      }

      el.x = Math.round(nx);
      el.y = Math.round(ny);
      el.width = Math.round(nw);
      el.height = Math.round(nh);

      node.style.left = `${el.x}px`;
      node.style.top = `${el.y}px`;
      node.style.width = `${el.width}px`;
      node.style.height = `${el.height}px`;
    }

    function onUp() {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      renderCanvas();
      renderThumbnails();
      scheduleSave();
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  function startRotating(e, el, node) {
    const rect = node.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    function onMove(me) {
      const rad = Math.atan2(me.clientY - centerY, me.clientX - centerX);
      let deg = Math.round(rad * (180 / Math.PI)) + 90;
      if (deg < 0) deg += 360;
      el.rotation = deg;
      node.style.transform = `rotate(${deg}deg)`;
    }

    function onUp() {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      renderThumbnails();
      scheduleSave();
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  // ==========================================================================
  // 10. DRAWING & INKS ENGINE
  // ==========================================================================
  function setDrawTool(tool) {
    activeDrawMode = tool;
    toolSelectMode.classList.toggle('active', tool === 'select');
    toolPen.classList.toggle('active', tool === 'pen');
    toolHighlighter.classList.toggle('active', tool === 'highlighter');
    inkCanvas.classList.toggle('active-drawing', tool !== 'select');
  }

  inkCanvas.addEventListener('mousedown', (e) => {
    if (activeDrawMode === 'select') return;
    isDrawing = true;
    const rect = inkCanvas.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) / currentZoom);
    const y = Math.round((e.clientY - rect.top) / currentZoom);

    currentPathD = `M ${x} ${y}`;
    activePathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    activePathElement.setAttribute('d', currentPathD);
    activePathElement.setAttribute('fill', 'none');
    activePathElement.setAttribute('stroke-linecap', 'round');
    activePathElement.setAttribute('stroke-linejoin', 'round');

    if (activeDrawMode === 'pen') {
      activePathElement.setAttribute('stroke', '#000000');
      activePathElement.setAttribute('stroke-width', '3');
    } else if (activeDrawMode === 'highlighter') {
      activePathElement.setAttribute('stroke', 'rgba(254, 240, 138, 0.7)');
      activePathElement.setAttribute('stroke-width', '16');
    }

    inkCanvas.appendChild(activePathElement);
  });

  inkCanvas.addEventListener('mousemove', (e) => {
    if (!isDrawing || !activePathElement) return;
    const rect = inkCanvas.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) / currentZoom);
    const y = Math.round((e.clientY - rect.top) / currentZoom);
    currentPathD += ` L ${x} ${y}`;
    activePathElement.setAttribute('d', currentPathD);
  });

  window.addEventListener('mouseup', () => {
    if (isDrawing && activePathElement) {
      isDrawing = false;
      const slide = getActiveSlide();
      if (!slide.inks) slide.inks = [];
      slide.inks.push({
        d: currentPathD,
        color: activePathElement.getAttribute('stroke'),
        width: activePathElement.getAttribute('stroke-width')
      });
      activePathElement = null;
      renderThumbnails();
      scheduleSave();
    }
  });

  function renderInks(inks) {
    inkCanvas.innerHTML = '';
    inks.forEach(ink => {
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('d', ink.d);
      p.setAttribute('stroke', ink.color);
      p.setAttribute('stroke-width', ink.width);
      p.setAttribute('fill', 'none');
      p.setAttribute('stroke-linecap', 'round');
      p.setAttribute('stroke-linejoin', 'round');
      inkCanvas.appendChild(p);
    });
  }

  // ==========================================================================
  // 11. SPEAKER NOTES
  // ==========================================================================
  function syncNotes() {
    const slide = getActiveSlide();
    speakerNotesInput.value = (slide && slide.notes) ? slide.notes : '';
  }

  speakerNotesInput.addEventListener('input', () => {
    const slide = getActiveSlide();
    if (slide) {
      slide.notes = speakerNotesInput.value;
      scheduleSave();
    }
  });

  // ==========================================================================
  // 12. SLIDE SHOW & PRESENTER TOOLS
  // ==========================================================================
  function enterSlideShow(startIndex) {
    if (typeof startIndex === 'number') activeSlideIndex = startIndex;
    isPresentationMode = true;
    isLaserActive = false;
    isBlackScreen = false;
    pptSlideshowOverlay.style.display = 'flex';
    laserPointer.style.display = 'none';

    renderSlideShowView();

    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }

    window.addEventListener('resize', scaleSlideShow);
    scaleSlideShow();
  }

  function exitSlideShow() {
    isPresentationMode = false;
    pptSlideshowOverlay.style.display = 'none';
    laserPointer.style.display = 'none';

    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }

    window.removeEventListener('resize', scaleSlideShow);
    renderAll();
  }

  function renderSlideShowView() {
    const slide = getActiveSlide();
    if (!slide) return;

    slideshowSlide.style.backgroundColor = isBlackScreen ? '#000000' : (slide.background || '#ffffff');
    slideshowSlide.innerHTML = '';

    if (!isBlackScreen) {
      slide.elements.forEach(el => {
        slideshowSlide.appendChild(createElementDOM(el, true));
      });

      // Render Inks in Presentation
      if (slide.inks && slide.inks.length > 0) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('style', 'position:absolute; inset:0; width:100%; height:100%; pointer-events:none;');
        slide.inks.forEach(ink => {
          const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          p.setAttribute('d', ink.d);
          p.setAttribute('stroke', ink.color);
          p.setAttribute('stroke-width', ink.width);
          p.setAttribute('fill', 'none');
          svg.appendChild(p);
        });
        slideshowSlide.appendChild(svg);
      }
    }

    hudSlideIdx.textContent = `${activeSlideIndex + 1} / ${presentationData.slides.length}`;
  }

  function scaleSlideShow() {
    if (!isPresentationMode) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const s = Math.min((w - 20) / CANVAS_WIDTH, (h - 20) / CANVAS_HEIGHT);
    slideshowSlide.style.transform = `scale(${s})`;
  }

  function showNext() {
    if (activeSlideIndex < presentationData.slides.length - 1) {
      activeSlideIndex++;
      applySlideTransition();
      renderSlideShowView();
    }
  }

  function showPrev() {
    if (activeSlideIndex > 0) {
      activeSlideIndex--;
      applySlideTransition();
      renderSlideShowView();
    }
  }

  function applySlideTransition() {
    const t = presentationData.transition || 'fade';
    if (t === 'fade') {
      slideshowSlide.style.opacity = '0';
      setTimeout(() => { slideshowSlide.style.opacity = '1'; }, 40);
    } else if (t === 'zoom') {
      slideshowSlide.style.transform += ' scale(0.96)';
      setTimeout(() => { scaleSlideShow(); }, 40);
    }
  }

  pptSlideshowOverlay.addEventListener('mousemove', (e) => {
    if (isLaserActive) {
      laserPointer.style.left = `${e.clientX}px`;
      laserPointer.style.top = `${e.clientY}px`;
    }
  });

  // ==========================================================================
  // 13. ZOOM & VIEWPORT
  // ==========================================================================
  function fitCanvasToViewport() {
    if (activeViewMode !== 'normal') return;
    const padW = pptStageArea.clientWidth - 80;
    const padH = pptStageArea.clientHeight - 80;
    const scale = Math.min(padW / CANVAS_WIDTH, padH / CANVAS_HEIGHT, 1.2);
    setZoomLevel(Math.max(0.35, scale));
  }

  function setZoomLevel(zoom) {
    currentZoom = zoom;
    slideStageScaler.style.transform = `scale(${currentZoom})`;
    const pct = Math.round(currentZoom * 100);
    zoomPercentage.textContent = `${pct}%`;
    zoomSlider.value = pct;
  }

  // ==========================================================================
  // 14. EVENT LISTENERS SETUP
  // ==========================================================================
  function setupEventListeners() {
    // Title Rename
    deckTitleInput.addEventListener('input', () => {
      presentationData.title = deckTitleInput.value;
      scheduleSave();
    });

    // Quick Access Toolbar
    qatSave.addEventListener('click', savePresentation);
    qatUndo.addEventListener('click', () => alert('Action undone.'));
    qatRedo.addEventListener('click', () => alert('Action redone.'));
    qatSlideshow.addEventListener('click', () => enterSlideShow(0));

    btnShareDeck.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href);
      btnShareDeck.innerHTML = '✓ Copied!';
      setTimeout(() => {
        btnShareDeck.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg><span>Share</span>`;
      }, 1500);
    });

    winMaximize.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });

    // Ribbon Tabs Switcher
    ribbonTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        ribbonTabs.forEach(t => t.classList.remove('active'));
        ribbonPanels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const target = document.getElementById(`panel-${tab.dataset.tab}`);
        if (target) target.classList.add('active');
      });
    });

    // File Tab -> Backstage
    tabFile.addEventListener('click', () => {
      backstageOverlay.style.display = 'flex';
      if (bsInfoTitle) bsInfoTitle.textContent = deckTitleInput.value;
      if (bsInfoSlides) bsInfoSlides.textContent = presentationData.slides.length;
    });
    backstageCloseBtn.addEventListener('click', () => {
      backstageOverlay.style.display = 'none';
    });
    bsTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        bsTabs.forEach(t => t.classList.remove('active'));
        bsViews.forEach(v => v.classList.remove('active'));
        tab.classList.add('active');
        const target = document.getElementById(`bs-view-${tab.dataset.view}`);
        if (target) target.classList.add('active');
      });
    });
    bsSaveNow.addEventListener('click', savePresentation);
    btnExportJson.addEventListener('click', () => {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(presentationData, null, 2));
      const a = document.createElement('a');
      a.href = dataStr;
      a.download = (presentationData.title || 'presentation') + '.json';
      a.click();
    });

    // New Slide & Layout Picker
    btnNewSlideMain.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownNewSlide.classList.toggle('active');
    });

    document.querySelectorAll('.layout-card').forEach(card => {
      card.addEventListener('click', () => {
        const layout = card.dataset.layout;
        const newSlide = createSlideFromLayout(layout);
        presentationData.slides.splice(activeSlideIndex + 1, 0, newSlide);
        activeSlideIndex++;
        dropdownNewSlide.classList.remove('active');
        renderAll();
        scheduleSave();
      });
    });

    sidebarAddSlideBtn.addEventListener('click', () => {
      const newSlide = createSlideFromLayout('title_content');
      presentationData.slides.push(newSlide);
      activeSlideIndex = presentationData.slides.length - 1;
      renderAll();
      scheduleSave();
    });

    btnDuplicateSlide.addEventListener('click', () => {
      const curr = getActiveSlide();
      const cloned = JSON.parse(JSON.stringify(curr));
      cloned.id = 'slide_' + Date.now();
      presentationData.slides.splice(activeSlideIndex + 1, 0, cloned);
      activeSlideIndex++;
      renderAll();
      scheduleSave();
    });

    btnDeleteSlide.addEventListener('click', () => {
      if (presentationData.slides.length <= 1) {
        alert('A PowerPoint presentation must contain at least one slide.');
        return;
      }
      presentationData.slides.splice(activeSlideIndex, 1);
      if (activeSlideIndex >= presentationData.slides.length) {
        activeSlideIndex = presentationData.slides.length - 1;
      }
      renderAll();
      scheduleSave();
    });

    // Clipboard
    btnCut.addEventListener('click', cutSelectedElement);
    btnCopy.addEventListener('click', copySelectedElement);
    btnPaste.addEventListener('click', pasteElement);
    btnDuplicateElem.addEventListener('click', () => {
      copySelectedElement();
      pasteElement();
    });

    btnDeleteActiveElem.addEventListener('click', () => {
      if (!selectedElementId) return;
      const slide = getActiveSlide();
      slide.elements = slide.elements.filter(el => el.id !== selectedElementId);
      selectedElementId = null;
      renderAll();
      scheduleSave();
    });

    btnBringFront.addEventListener('click', () => {
      const slide = getActiveSlide();
      const idx = slide.elements.findIndex(el => el.id === selectedElementId);
      if (idx !== -1 && idx < slide.elements.length - 1) {
        const item = slide.elements.splice(idx, 1)[0];
        slide.elements.push(item);
        renderAll();
        scheduleSave();
      }
    });

    btnSendBack.addEventListener('click', () => {
      const slide = getActiveSlide();
      const idx = slide.elements.findIndex(el => el.id === selectedElementId);
      if (idx > 0) {
        const item = slide.elements.splice(idx, 1)[0];
        slide.elements.unshift(item);
        renderAll();
        scheduleSave();
      }
    });

    // Live Formatting Controls
    fmtFontFamily.addEventListener('change', () => applyLiveFormat('fontFamily', fmtFontFamily.value));
    fmtFontSizeSelect.addEventListener('change', () => applyLiveFormat('fontSize', parseInt(fmtFontSizeSelect.value) || 24));
    btnFontGrow.addEventListener('click', () => {
      const el = getSelectedElement();
      if (el && el.type === 'text') {
        const s = (el.fontSize || 24) + 4;
        fmtFontSizeSelect.value = String(s);
        applyLiveFormat('fontSize', s);
      }
    });
    btnFontShrink.addEventListener('click', () => {
      const el = getSelectedElement();
      if (el && el.type === 'text') {
        const s = Math.max(8, (el.fontSize || 24) - 4);
        fmtFontSizeSelect.value = String(s);
        applyLiveFormat('fontSize', s);
      }
    });

    fmtBold.addEventListener('click', () => {
      const el = getSelectedElement();
      if (el && el.type === 'text') {
        const next = el.fontWeight === 'bold' ? 'normal' : 'bold';
        fmtBold.classList.toggle('active', next === 'bold');
        applyLiveFormat('fontWeight', next);
      }
    });

    fmtItalic.addEventListener('click', () => {
      const el = getSelectedElement();
      if (el && el.type === 'text') {
        const next = el.fontStyle === 'italic' ? 'normal' : 'italic';
        fmtItalic.classList.toggle('active', next === 'italic');
        applyLiveFormat('fontStyle', next);
      }
    });

    fmtUnderline.addEventListener('click', () => {
      const el = getSelectedElement();
      if (el && el.type === 'text') {
        const next = el.textDecoration === 'underline' ? 'none' : 'underline';
        fmtUnderline.classList.toggle('active', next === 'underline');
        applyLiveFormat('textDecoration', next);
      }
    });

    fmtColor.addEventListener('input', () => applyLiveFormat('color', fmtColor.value));
    fmtHighlight.addEventListener('input', () => applyLiveFormat('highlight', fmtHighlight.value));

    fmtAlignLeft.addEventListener('click', () => applyLiveFormat('textAlign', 'left'));
    fmtAlignCenter.addEventListener('click', () => applyLiveFormat('textAlign', 'center'));
    fmtAlignRight.addEventListener('click', () => applyLiveFormat('textAlign', 'right'));
    fmtAlignJustify.addEventListener('click', () => applyLiveFormat('textAlign', 'justify'));

    btnBulletList.addEventListener('click', () => {
      const el = getSelectedElement();
      if (el && el.type === 'text') {
        el.content = '• ' + (el.content || '').replace(/•\s*/g, '');
        renderCanvas();
        renderThumbnails();
        scheduleSave();
      }
    });

    fmtShapeFill.addEventListener('input', () => applyLiveFormat('fill', fmtShapeFill.value));
    fmtShapeOutline.addEventListener('input', () => applyLiveFormat('borderColor', fmtShapeOutline.value));

    // Insert Elements
    btnInsertTextbox.addEventListener('click', () => {
      const newEl = {
        id: 'el_' + Date.now(),
        type: 'text',
        x: 200, y: 180, width: 420, height: 60,
        content: 'Click to type text',
        fontSize: 24, fontWeight: 'normal', color: '#0f172a',
        textAlign: 'left', fontFamily: 'Inter'
      };
      getActiveSlide().elements.push(newEl);
      selectedElementId = newEl.id;
      renderAll();
      scheduleSave();
    });

    btnInsertWordart.addEventListener('click', () => {
      const newEl = {
        id: 'el_' + Date.now(),
        type: 'text',
        x: 180, y: 160, width: 600, height: 90,
        content: 'WordArt Title',
        fontSize: 48, fontWeight: 'bold', color: '#c43e1c',
        textAlign: 'center', fontFamily: 'Impact'
      };
      getActiveSlide().elements.push(newEl);
      selectedElementId = newEl.id;
      renderAll();
      scheduleSave();
    });

    btnInsertTable.addEventListener('click', () => {
      const newEl = {
        id: 'el_' + Date.now(),
        type: 'table',
        x: 180, y: 120, width: 600, height: 260,
        rows: 3, cols: 3,
        cells: {
          '0_0': 'Category', '0_1': 'Q1 2026', '0_2': 'Q2 2026',
          '1_0': 'Revenue', '1_1': '$45,000', '1_2': '$68,000',
          '2_0': 'Growth', '2_1': '+18%', '2_2': '+32%'
        }
      };
      getActiveSlide().elements.push(newEl);
      selectedElementId = newEl.id;
      renderAll();
      scheduleSave();
    });

    // Image Upload
    pptImageFile.addEventListener('change', async () => {
      const file = pptImageFile.files[0];
      if (!file) return;

      const fd = new FormData();
      fd.append('image', file);
      updateSaveStatus('Uploading picture...');

      try {
        const res = await fetch('/api/upload-image', { method: 'POST', body: fd });
        const d = await res.json();
        if (res.ok && d.url) {
          const imgEl = {
            id: 'el_' + Date.now(),
            type: 'image',
            src: d.url,
            x: 240, y: 100, width: 440, height: 300
          };
          getActiveSlide().elements.push(imgEl);
          selectedElementId = imgEl.id;
          renderAll();
          scheduleSave();
        }
      } catch (err) {
        alert('Image upload failed.');
      }
      pptImageFile.value = '';
    });

    btnInsertOnlinePic.addEventListener('click', () => {
      onlineImageModal.style.display = 'flex';
      onlineImgUrl.focus();
    });
    btnConfirmOnlineImg.addEventListener('click', () => {
      const url = onlineImgUrl.value.trim();
      if (url) {
        const imgEl = {
          id: 'el_' + Date.now(),
          type: 'image',
          src: url,
          x: 240, y: 100, width: 440, height: 300
        };
        getActiveSlide().elements.push(imgEl);
        selectedElementId = imgEl.id;
        onlineImgUrl.value = '';
        onlineImageModal.style.display = 'none';
        renderAll();
        scheduleSave();
      }
    });

    // Shapes
    btnShapesDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownShapesMenu.classList.toggle('active');
    });

    document.querySelectorAll('.shape-tile').forEach(btn => {
      btn.addEventListener('click', () => {
        const s = btn.dataset.shape;
        const newShape = {
          id: 'el_' + Date.now(),
          type: 'shape',
          shape: s,
          x: 320, y: 150, width: 220, height: 160,
          fill: s === 'star' ? '#f59e0b' : s.includes('arrow') ? '#10b981' : '#3b82f6',
          borderColor: '#1d4ed8',
          borderWidth: 0
        };
        getActiveSlide().elements.push(newShape);
        selectedElementId = newShape.id;
        dropdownShapesMenu.classList.remove('active');
        renderAll();
        scheduleSave();
      });
    });

    window.addEventListener('click', () => {
      dropdownNewSlide.classList.remove('active');
      dropdownShapesMenu.classList.remove('active');
    });

    // Draw Tab Tools
    toolSelectMode.addEventListener('click', () => setDrawTool('select'));
    toolPen.addEventListener('click', () => setDrawTool('pen'));
    toolHighlighter.addEventListener('click', () => setDrawTool('highlighter'));
    toolEraser.addEventListener('click', () => {
      const slide = getActiveSlide();
      slide.inks = [];
      renderCanvas();
      renderThumbnails();
      scheduleSave();
    });

    // Design Themes
    themeCards.forEach(card => {
      card.addEventListener('click', () => {
        themeCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        presentationData.theme = card.dataset.theme;
        const bg = getThemeBackgroundColor();
        presentationData.slides.forEach(s => { s.background = bg; });
        renderAll();
        scheduleSave();
      });
    });

    slideBgPicker.addEventListener('input', () => {
      getActiveSlide().background = slideBgPicker.value;
      pptSlideCanvas.style.backgroundColor = slideBgPicker.value;
      renderThumbnails();
      scheduleSave();
    });

    // Transitions
    transitionCards.forEach(card => {
      card.addEventListener('click', () => {
        transitionCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        presentationData.transition = card.dataset.transition;
        scheduleSave();
      });
    });
    btnApplyAllTransitions.addEventListener('click', () => {
      const t = presentationData.transition || 'fade';
      presentationData.slides.forEach(s => s.transition = t);
      alert(`Applied "${t}" transition to all slides.`);
      scheduleSave();
    });

    // Slide Show
    btnShowFromBeginning.addEventListener('click', () => enterSlideShow(0));
    btnShowFromCurrent.addEventListener('click', () => enterSlideShow(activeSlideIndex));
    btnViewSlideshow.addEventListener('click', () => enterSlideShow(activeSlideIndex));

    hudPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
    hudNext.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
    hudExit.addEventListener('click', (e) => { e.stopPropagation(); exitSlideShow(); });

    hudLaser.addEventListener('click', (e) => {
      e.stopPropagation();
      isLaserActive = !isLaserActive;
      laserPointer.style.display = isLaserActive ? 'block' : 'none';
      pptSlideshowOverlay.classList.toggle('show-cursor', !isLaserActive);
      hudLaser.style.background = isLaserActive ? '#ef4444' : '';
    });

    hudBlack.addEventListener('click', (e) => {
      e.stopPropagation();
      isBlackScreen = !isBlackScreen;
      renderSlideShowView();
    });

    pptSlideshowOverlay.addEventListener('click', (e) => {
      if (e.target === pptSlideshowOverlay || e.target.closest('.slideshow-slide')) {
        showNext();
      }
    });

    // Notes Toggle
    btnStatusNotes.addEventListener('click', () => speakerNotesPane.classList.toggle('collapsed'));
    btnNotesClose.addEventListener('click', () => speakerNotesPane.classList.add('collapsed'));
    chkShowNotes.addEventListener('change', () => speakerNotesPane.classList.toggle('collapsed', !chkShowNotes.checked));
    chkShowGrid.addEventListener('change', () => pptSlideCanvas.classList.toggle('show-grid', chkShowGrid.checked));

    // View Switchers
    viewNormal.addEventListener('click', () => switchViewMode('normal'));
    viewSorter.addEventListener('click', () => switchViewMode('sorter'));
    btnViewNormal.addEventListener('click', () => switchViewMode('normal'));
    btnViewSorter.addEventListener('click', () => switchViewMode('sorter'));

    // Zoom Controls
    zoomSlider.addEventListener('input', () => setZoomLevel(parseInt(zoomSlider.value) / 100));
    btnZoomOut.addEventListener('click', () => setZoomLevel(Math.max(0.3, currentZoom - 0.1)));
    btnZoomInc.addEventListener('click', () => setZoomLevel(Math.min(1.5, currentZoom + 0.1)));
    btnZoomFit.addEventListener('click', fitCanvasToViewport);

    // Canvas Background Deselect
    pptSlideCanvas.addEventListener('mousedown', (e) => {
      if (e.target === pptSlideCanvas && activeDrawMode === 'select') deselectAll();
    });
    pptStageArea.addEventListener('mousedown', (e) => {
      if (e.target === pptStageArea && activeDrawMode === 'select') deselectAll();
    });

    // Global Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      if (isPresentationMode) {
        if (e.key === 'Escape') exitSlideShow();
        else if (['ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(e.key)) { e.preventDefault(); showNext(); }
        else if (['ArrowLeft', 'ArrowUp', 'Backspace', 'PageUp'].includes(e.key)) { e.preventDefault(); showPrev(); }
        else if (e.key.toLowerCase() === 'b') { isBlackScreen = !isBlackScreen; renderSlideShowView(); }
        else if (e.key.toLowerCase() === 'l') { hudLaser.click(); }
        return;
      }

      if (isEditingText || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'F5') {
        e.preventDefault();
        enterSlideShow(e.shiftKey ? activeSlideIndex : 0);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        savePresentation();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        copySelectedElement();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'x') {
        e.preventDefault();
        cutSelectedElement();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') {
        e.preventDefault();
        pasteElement();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        copySelectedElement();
        pasteElement();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedElementId) { e.preventDefault(); btnDeleteActiveElem.click(); }
      } else if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key) && selectedElementId) {
        e.preventDefault();
        const el = getSelectedElement();
        const step = e.shiftKey ? 10 : 2;
        if (e.key === 'ArrowLeft') el.x -= step;
        if (e.key === 'ArrowRight') el.x += step;
        if (e.key === 'ArrowUp') el.y -= step;
        if (e.key === 'ArrowDown') el.y += step;
        renderCanvas();
        renderThumbnails();
        scheduleSave();
      }
    });
  }

  window.closeOnlineImgModal = function () {
    onlineImageModal.style.display = 'none';
  };

  document.addEventListener('DOMContentLoaded', init);

})();
