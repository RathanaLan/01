(function() {
    'use strict';

    /* =====================================================================
     * 1. CONSTANTS & STATE
     * ===================================================================== */
    const CANVAS_WIDTH = 960;
    const CANVAS_HEIGHT = 540;

    let presentationData = {
        id: '',
        title: 'Untitled Presentation',
        theme: 'light',
        slides: []
    };

    let activeSlideIndex = 0;
    let selectedElementId = null;
    let isEditingText = false;
    let isPresentationMode = false;
    let isLaserActive = false;
    let isBlackScreen = false;
    let currentZoom = 0.85;

    let undoStack = [];
    let redoStack = [];
    const MAX_HISTORY = 50;

    let clipboardData = null;
    let activeDrawMode = 'select'; // 'select', 'pen', 'highlighter', 'eraser'
    let isDrawing = false;
    let currentPathD = '';
    let activePathElement = null;

    let activeViewMode = 'normal'; // 'normal', 'sorter'
    
    let saveDebounceTimer = null;
    let slideshowTimer = null;
    let slideshowStartTime = 0;
    let slideshowSlideIndex = 0;

    let dragState = {
        isDragging: false,
        isResizing: false,
        isRotating: false,
        startX: 0,
        startY: 0,
        startElX: 0,
        startElY: 0,
        startElWidth: 0,
        startElHeight: 0,
        startElRot: 0,
        resizeHandle: null,
        targetNode: null,
        slideStartIndex: -1 // for thumbnail reorder
    };

    /* =====================================================================
     * 2. DOM ELEMENT REFERENCES (WITH NULL CHECKS)
     * ===================================================================== */
    const DOM = {
        canvasContainer: document.getElementById('ppt-stage-area'),
        slideCanvas: document.getElementById('ppt-slide-canvas'),
        inkCanvas: document.getElementById('ink-canvas'),
        thumbnailList: document.getElementById('slides-thumbnail-list'),
        slideSorterGrid: null,
        deckTitle: document.getElementById('deck-title-input'),
        saveStatus: document.getElementById('save-status'),
        zoomSlider: document.getElementById('zoom-slider'),
        zoomLevelText: document.getElementById('zoom-percentage'),
        notesArea: document.getElementById('speaker-notes-input'),
        slideCounter: document.getElementById('status-slide-counter'),
        
        // Ribbon tabs
        ribbonTabs: document.querySelectorAll('.ribbon-tab'),
        ribbonPanels: document.querySelectorAll('.ribbon-panel'),

        // Panels
        homePanel: document.getElementById('panel-home'),
        insertPanel: document.getElementById('panel-insert'),
        drawPanel: document.getElementById('panel-draw'),
        designPanel: document.getElementById('panel-design'),
        transitionsPanel: document.getElementById('panel-transitions'),
        animationsPanel: document.getElementById('panel-animations'),
        slideshowPanel: document.getElementById('panel-slideshow'),
        viewPanel: document.getElementById('panel-view'),

        // Backstage
        backstageView: document.getElementById('backstage-overlay'),
        backstageTabHome: document.querySelector('[data-bpanel="info"]'),
        backstageTabNew: document.querySelector('[data-bpanel="new"]'),
        backstageTabOpen: null,
        btnBackstageClose: document.getElementById('btn-backstage-close'),
        
        // Buttons - Home
        btnUndo: document.getElementById('btn-qa-undo'),
        btnRedo: document.getElementById('btn-qa-redo'),
        btnNewSlide: document.getElementById('btn-new-slide'),
        btnLayout: null,
        btnDelete: document.getElementById('btn-delete-element-draw'),
        
        // Format Bar
        fontFamilySelect: document.getElementById('font-family-select'),
        fontSizeSelect: document.getElementById('font-size-select'),
        btnBold: document.getElementById('btn-font-bold'),
        btnItalic: document.getElementById('btn-font-italic'),
        btnUnderline: document.getElementById('btn-font-underline'),
        btnStrikethrough: document.getElementById('btn-font-strikethrough'),
        textColorPicker: document.getElementById('font-color-input'),
        textHighlightPicker: document.getElementById('highlight-color-input'),
        btnAlignLeft: document.getElementById('btn-align-left'),
        btnAlignCenter: document.getElementById('btn-align-center'),
        btnAlignRight: document.getElementById('btn-align-right'),
        btnAlignJustify: document.getElementById('btn-align-justify'),
        fillColorPicker: document.getElementById('shape-fill-color'),
        borderColorPicker: document.getElementById('shape-outline-color'),
        borderWidthSelect: null,

        // Insert
        btnInsertTextbox: document.getElementById('btn-insert-textbox'),
        btnInsertImage: document.getElementById('file-insert-image'),
        btnInsertShape: document.getElementById('btn-insert-shapes'),
        btnInsertTable: document.getElementById('btn-insert-table'),
        btnInsertChart: document.getElementById('btn-insert-chart'),
        shapeTiles: document.querySelectorAll('.shape-tile'),
        tableSizeGrid: document.getElementById('table-grid-selector'),
        tableGridText: null,
        chartTiles: document.querySelectorAll('.chart-tile'),

        // Draw
        btnSelectTool: document.getElementById('btn-draw-select'),
        btnPenTool: document.getElementById('btn-draw-pen'),
        btnHighlighterTool: document.getElementById('btn-draw-highlighter'),
        btnEraserTool: document.getElementById('btn-draw-eraser'),
        drawColorPicker: document.getElementById('draw-color-picker'),
        drawWidthSlider: document.getElementById('draw-width-slider'),

        // Design & Transitions
        themeCards: document.querySelectorAll('.theme-card'),
        transitionCards: document.querySelectorAll('.transition-card'),

        // Animations
        animTypeSelect: document.getElementById('animation-type-select'),
        animDurationInput: document.getElementById('animation-duration'),
        btnPreviewAnim: document.getElementById('btn-preview-animation'),
        btnRemoveAnim: null,

        // Slideshow
        btnStartStart: document.getElementById('btn-slideshow-beginning'),
        btnStartCurrent: document.getElementById('btn-slideshow-current'),
        
        // View
        btnViewNormal: document.getElementById('btn-view-normal'),
        btnViewSorter: document.getElementById('btn-view-sorter'),

        // Status bar
        btnStatusBarNormal: document.getElementById('btn-status-view-normal'),
        btnStatusBarSorter: document.getElementById('btn-status-view-sorter'),
        btnStatusBarSlideshow: document.getElementById('btn-status-view-slideshow'),
        btnFitSlide: document.getElementById('btn-zoom-fit'),
        
        // Slideshow overlay
        slideshowOverlay: document.getElementById('ppt-slideshow-overlay'),
        slideshowSlide: document.getElementById('slideshow-slide'),
        slideshowInkCanvas: null,
        hudBtnPrev: document.getElementById('btn-slideshow-prev'),
        hudBtnNext: document.getElementById('btn-slideshow-next'),
        hudBtnPen: document.getElementById('btn-slideshow-pen'),
        hudBtnLaser: document.getElementById('btn-slideshow-laser'),
        hudBtnBlack: document.getElementById('btn-slideshow-black'),
        hudBtnExit: document.getElementById('btn-slideshow-exit'),
        hudSlideCounter: document.getElementById('slideshow-index-display'),
        hudTimer: document.getElementById('slideshow-timer'),

        // Context menu
        contextMenu: document.getElementById('context-menu'),
        ctxCut: document.getElementById('cm-cut'),
        ctxCopy: document.getElementById('cm-copy'),
        ctxPaste: document.getElementById('cm-paste'),
        ctxDuplicate: document.getElementById('cm-duplicate'),
        ctxDelete: document.getElementById('cm-delete'),
        ctxBringFront: document.getElementById('cm-bring-front'),
        ctxSendBack: document.getElementById('cm-send-back'),
        ctxSelectAll: document.getElementById('cm-select-all'),

        // Find/Replace
        findDialog: document.getElementById('find-replace-dialog'),
        findInput: document.getElementById('find-input'),
        replaceInput: document.getElementById('replace-input'),
        btnFindNext: document.getElementById('btn-find-next'),
        btnFindPrev: document.getElementById('btn-find-prev'),
        btnReplaceOne: document.getElementById('btn-replace'),
        btnReplaceAll: document.getElementById('btn-replace-all'),
        btnCloseFind: document.getElementById('btn-fr-close'),
        
        layoutDropdownMenu: document.querySelector('.layout-picker'),
        shapeDropdownMenu: document.querySelector('.shapes-palette'),
        tableDropdownMenu: document.querySelector('.table-picker'),
        chartDropdownMenu: null,

        smartGuidesContainer: null
    };

    /* =====================================================================
     * 3. INITIALIZATION
     * ===================================================================== */
    function init() {
        setupEventListeners();
        loadPresentation();
        window.addEventListener('resize', fitCanvasToViewport);
        document.addEventListener('keydown', handleGlobalKeydown);
    }

    async function loadPresentation() {
        const pathParts = window.location.pathname.split('/');
        const id = pathParts[pathParts.length - 1];
        
        try {
            if (id && id !== 'new' && id !== 'editor') {
                const res = await fetch(`/api/presentations/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    presentationData = typeof data.data === 'string' ? JSON.parse(data.data) : data.data;
                    if (!presentationData.slides) presentationData.slides = [];
                }
            }
        } catch (e) {
            console.error('Failed to load presentation', e);
        }

        if (!presentationData.slides || presentationData.slides.length === 0) {
            presentationData.slides = [createSlideFromLayout('title')];
        }

        if (DOM.deckTitle) DOM.deckTitle.value = presentationData.title || 'Untitled Presentation';
        
        fitCanvasToViewport();
        renderAll();
        pushHistory();
    }

    /* =====================================================================
     * 4. UNDO/REDO HISTORY SYSTEM
     * ===================================================================== */
    function pushHistory() {
        const state = JSON.stringify({
            data: presentationData,
            activeSlideIndex: activeSlideIndex,
            selectedElementId: selectedElementId
        });
        
        if (undoStack.length > 0 && undoStack[undoStack.length - 1] === state) {
            return;
        }

        undoStack.push(state);
        if (undoStack.length > MAX_HISTORY) undoStack.shift();
        redoStack = [];
        updateHistoryButtons();
    }

    function undo() {
        if (undoStack.length > 1) {
            const current = undoStack.pop();
            redoStack.push(current);
            const prev = undoStack[undoStack.length - 1];
            restoreState(prev);
        }
    }

    function redo() {
        if (redoStack.length > 0) {
            const next = redoStack.pop();
            undoStack.push(next);
            restoreState(next);
        }
    }

    function restoreState(stateStr) {
        const state = JSON.parse(stateStr);
        presentationData = state.data;
        activeSlideIndex = state.activeSlideIndex;
        selectedElementId = state.selectedElementId;
        updateHistoryButtons();
        renderAll();
        scheduleSave();
    }

    function updateHistoryButtons() {
        if (DOM.btnUndo) DOM.btnUndo.disabled = undoStack.length <= 1;
        if (DOM.btnRedo) DOM.btnRedo.disabled = redoStack.length === 0;
    }

    /* =====================================================================
     * 5. SAVING & SYNCING
     * ===================================================================== */
    function scheduleSave() {
        clearTimeout(saveDebounceTimer);
        updateSaveStatus('Saving...');
        saveDebounceTimer = setTimeout(savePresentation, 1500);
    }

    async function savePresentation() {
        const pathParts = window.location.pathname.split('/');
        let id = pathParts[pathParts.length - 1];
        if (!id || id === 'new' || id === 'editor') id = presentationData.id || generateId('pres');
        
        presentationData.title = DOM.deckTitle ? DOM.deckTitle.value : 'Untitled';

        try {
            const res = await fetch(`/api/presentations/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: presentationData.title,
                    data: presentationData
                })
            });
            if (res.ok) {
                updateSaveStatus('Saved to cloud');
            } else {
                updateSaveStatus('Save failed');
            }
        } catch (e) {
            updateSaveStatus('Offline (Not saved)');
        }
    }

    function updateSaveStatus(msg) {
        if (DOM.saveStatus) DOM.saveStatus.textContent = msg;
    }

    /* =====================================================================
     * 6. SLIDE LAYOUT FACTORY
     * ===================================================================== */
    function createSlideFromLayout(type) {
        const slide = {
            id: generateId('slide'),
            layout: type,
            background: getThemeBackgroundColor(),
            elements: [],
            notes: '',
            transition: 'none',
            inks: []
        };

        const w = CANVAS_WIDTH;
        const h = CANVAS_HEIGHT;
        const margin = 50;

        if (type === 'title') {
            slide.elements.push(createTextElement('Title', margin, h/2 - 60, w - margin*2, 80, 48, 'center', true));
            slide.elements.push(createTextElement('Subtitle', margin, h/2 + 20, w - margin*2, 40, 24, 'center', true));
        } else if (type === 'title_content') {
            slide.elements.push(createTextElement('Title', margin, margin, w - margin*2, 60, 40, 'left', true));
            slide.elements.push(createTextElement('Content', margin, margin + 80, w - margin*2, h - margin*2 - 80, 20, 'left', true));
        } else if (type === 'section') {
            slide.elements.push(createTextElement('Section Title', margin, h/2 - 40, w - margin*2, 80, 40, 'center', true));
        } else if (type === 'two_content') {
            slide.elements.push(createTextElement('Title', margin, margin, w - margin*2, 60, 40, 'left', true));
            const halfW = (w - margin*3) / 2;
            slide.elements.push(createTextElement('Content 1', margin, margin + 80, halfW, h - margin*2 - 80, 20, 'left', true));
            slide.elements.push(createTextElement('Content 2', margin*2 + halfW, margin + 80, halfW, h - margin*2 - 80, 20, 'left', true));
        } else if (type === 'title_only') {
            slide.elements.push(createTextElement('Title', margin, margin, w - margin*2, 60, 40, 'left', true));
        } else if (type === 'blank') {
            // no elements
        }

        return slide;
    }

    function createTextElement(placeholder, x, y, width, height, fontSize, align, isPlaceholder = false) {
        return {
            id: generateId('text'),
            type: 'text',
            x, y, width, height,
            rotation: 0,
            content: isPlaceholder ? `<p>Click to add ${placeholder.toLowerCase()}</p>` : `<p>${placeholder}</p>`,
            isPlaceholder: isPlaceholder,
            fontFamily: 'Inter, sans-serif',
            fontSize: fontSize,
            fontWeight: 'normal',
            fontStyle: 'normal',
            textDecoration: 'none',
            color: '#000000',
            textAlign: align,
            opacity: 1,
            zIndex: 1,
            animation: null,
            animDuration: 1
        };
    }
    
    function createImageElement(url, x, y, width, height) {
        return {
            id: generateId('img'),
            type: 'image',
            x, y, width, height,
            rotation: 0,
            src: url,
            opacity: 1,
            zIndex: 1,
            animation: null,
            animDuration: 1
        };
    }
    
    function createShapeElement(shapeType, x, y, width, height) {
        return {
            id: generateId('shape'),
            type: 'shape',
            shapeType: shapeType,
            x, y, width, height,
            rotation: 0,
            fill: '#4285f4',
            borderColor: '#2b579a',
            borderWidth: 2,
            opacity: 1,
            zIndex: 1,
            animation: null,
            animDuration: 1
        };
    }

    function getThemeBackgroundColor() {
        return presentationData.theme === 'dark' ? '#1e1e1e' : '#ffffff';
    }

    /* =====================================================================
     * 7. RENDERING ENGINE
     * ===================================================================== */
    function renderAll() {
        if (!presentationData.slides) return;
        if (activeSlideIndex >= presentationData.slides.length) activeSlideIndex = Math.max(0, presentationData.slides.length - 1);
        
        if (activeViewMode === 'normal') {
            if (DOM.slideCanvas) DOM.slideCanvas.style.display = 'block';
            if (DOM.slideSorterGrid) DOM.slideSorterGrid.style.display = 'none';
            renderCanvas();
            renderThumbnails();
            syncNotes();
        } else {
            if (DOM.slideCanvas) DOM.slideCanvas.style.display = 'none';
            if (DOM.slideSorterGrid) DOM.slideSorterGrid.style.display = 'grid';
            renderSlideSorter();
        }
        
        renderStatusBar();
        syncFormatBar();
    }

    function renderCanvas() {
        if (!DOM.slideCanvas || presentationData.slides.length === 0) return;
        
        DOM.slideCanvas.innerHTML = '';
        const slide = presentationData.slides[activeSlideIndex];
        
        DOM.slideCanvas.style.backgroundColor = slide.background || '#fff';
        
        const sortedElements = [...slide.elements].sort((a, b) => a.zIndex - b.zIndex);
        sortedElements.forEach(el => {
            const node = createElementDOM(el, false);
            DOM.slideCanvas.appendChild(node);
        });

        renderInks(slide.inks, DOM.inkCanvas);
        
        if (DOM.smartGuidesContainer) {
            DOM.slideCanvas.appendChild(DOM.smartGuidesContainer);
        }
    }

    function renderThumbnails() {
        if (!DOM.thumbnailList) return;
        DOM.thumbnailList.innerHTML = '';
        
        presentationData.slides.forEach((slide, index) => {
            const thumbWrap = document.createElement('div');
            thumbWrap.className = 'thumbnail-wrapper' + (index === activeSlideIndex ? ' active' : '');
            thumbWrap.dataset.index = index;
            
            const number = document.createElement('div');
            number.className = 'thumbnail-number';
            number.textContent = index + 1;
            
            const thumb = document.createElement('div');
            thumb.className = 'thumbnail';
            thumb.style.backgroundColor = slide.background || '#fff';
            
            // Render a mini version
            const scale = 160 / CANVAS_WIDTH;
            const contentWrap = document.createElement('div');
            contentWrap.style.transform = `scale(${scale})`;
            contentWrap.style.transformOrigin = 'top left';
            contentWrap.style.width = CANVAS_WIDTH + 'px';
            contentWrap.style.height = CANVAS_HEIGHT + 'px';
            contentWrap.style.position = 'relative';
            
            slide.elements.forEach(el => {
                const node = createElementDOM(el, true);
                contentWrap.appendChild(node);
            });
            
            thumb.appendChild(contentWrap);
            thumbWrap.appendChild(number);
            thumbWrap.appendChild(thumb);
            
            thumbWrap.addEventListener('click', () => {
                activeSlideIndex = index;
                deselectAll();
                renderAll();
            });

            // Drag to reorder
            thumbWrap.draggable = true;
            thumbWrap.addEventListener('dragstart', (e) => {
                dragState.slideStartIndex = index;
                e.dataTransfer.effectAllowed = 'move';
            });
            thumbWrap.addEventListener('dragover', (e) => {
                e.preventDefault();
                thumbWrap.classList.add('drag-over');
            });
            thumbWrap.addEventListener('dragleave', () => {
                thumbWrap.classList.remove('drag-over');
            });
            thumbWrap.addEventListener('drop', (e) => {
                e.preventDefault();
                thumbWrap.classList.remove('drag-over');
                const dropIndex = index;
                if (dragState.slideStartIndex !== -1 && dragState.slideStartIndex !== dropIndex) {
                    pushHistory();
                    const movedSlide = presentationData.slides.splice(dragState.slideStartIndex, 1)[0];
                    presentationData.slides.splice(dropIndex, 0, movedSlide);
                    activeSlideIndex = dropIndex;
                    renderAll();
                    scheduleSave();
                }
            });
            
            DOM.thumbnailList.appendChild(thumbWrap);
        });
    }

    function renderSlideSorter() {
        if (!DOM.slideSorterGrid) return;
        DOM.slideSorterGrid.innerHTML = '';
        // Reuse thumbnail logic but scale differently
        presentationData.slides.forEach((slide, index) => {
            const card = document.createElement('div');
            card.className = 'sorter-slide' + (index === activeSlideIndex ? ' active' : '');
            card.style.backgroundColor = slide.background || '#fff';
            
            const scale = 200 / CANVAS_WIDTH;
            const contentWrap = document.createElement('div');
            contentWrap.style.transform = `scale(${scale})`;
            contentWrap.style.transformOrigin = 'top left';
            contentWrap.style.width = CANVAS_WIDTH + 'px';
            contentWrap.style.height = CANVAS_HEIGHT + 'px';
            contentWrap.style.position = 'relative';
            
            slide.elements.forEach(el => {
                contentWrap.appendChild(createElementDOM(el, true));
            });
            
            card.appendChild(contentWrap);
            
            card.addEventListener('click', () => {
                activeSlideIndex = index;
                activeViewMode = 'normal';
                renderAll();
            });
            
            DOM.slideSorterGrid.appendChild(card);
        });
    }

    function renderStatusBar() {
        if (DOM.slideCounter) {
            DOM.slideCounter.textContent = `Slide ${activeSlideIndex + 1} of ${presentationData.slides.length}`;
        }
        if (DOM.zoomLevelText) {
            DOM.zoomLevelText.textContent = Math.round(currentZoom * 100) + '%';
        }
        if (DOM.zoomSlider) DOM.zoomSlider.value = currentZoom;
    }

    function createElementDOM(el, isThumb) {
        const node = document.createElement('div');
        node.id = `el-${el.id}`;
        node.className = 'canvas-element';
        if (selectedElementId === el.id && !isThumb) node.classList.add('selected');
        
        node.style.left = el.x + 'px';
        node.style.top = el.y + 'px';
        node.style.width = el.width + 'px';
        node.style.height = el.height + 'px';
        node.style.transform = `rotate(${el.rotation || 0}deg)`;
        node.style.zIndex = el.zIndex;
        node.style.opacity = el.opacity !== undefined ? el.opacity : 1;

        if (el.type === 'text') {
            const inner = document.createElement('div');
            inner.className = 'element-content text-element';
            inner.innerHTML = el.content;
            inner.style.fontFamily = el.fontFamily;
            inner.style.fontSize = el.fontSize + 'px';
            inner.style.fontWeight = el.fontWeight;
            inner.style.fontStyle = el.fontStyle;
            inner.style.textDecoration = el.textDecoration;
            inner.style.color = el.color;
            inner.style.textAlign = el.textAlign;
            if (el.highlight) inner.style.backgroundColor = el.highlight;
            if (el.isPlaceholder && !isEditingText) inner.classList.add('placeholder-text');
            node.appendChild(inner);
            
            if (!isThumb && !isPresentationMode) {
                node.addEventListener('dblclick', (e) => {
                    e.stopPropagation();
                    startTextEditing(inner, el);
                });
            }
        } 
        else if (el.type === 'image') {
            const img = document.createElement('img');
            img.src = el.src;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'contain';
            img.draggable = false;
            node.appendChild(img);
        }
        else if (el.type === 'shape') {
            node.innerHTML = renderShapeSVG(el, el.fill, el.borderColor, el.borderWidth);
        }
        else if (el.type === 'table') {
            node.innerHTML = renderTableHTML(el, isThumb || isPresentationMode);
        }
        else if (el.type === 'chart') {
            node.innerHTML = renderChartSVG(el);
        }

        if (!isThumb && !isPresentationMode) {
            node.addEventListener('mousedown', (e) => {
                if (isEditingText && selectedElementId === el.id) return;
                e.stopPropagation();
                if (e.button === 2) return; // Right click handled by ctx menu
                
                if (selectedElementId !== el.id) {
                    selectElement(el.id);
                }
                
                if (e.target.classList.contains('resize-handle')) {
                    startResizing(e, el, node, e.target.dataset.dir);
                } else if (e.target.classList.contains('rotate-handle')) {
                    startRotating(e, el, node);
                } else {
                    startDragging(e, el, node);
                }
            });

            node.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                e.stopPropagation();
                selectElement(el.id);
                showContextMenu(e.clientX, e.clientY, true);
            });

            if (selectedElementId === el.id) {
                addTransformHandles(node);
            }
        }

        return node;
    }

    function addTransformHandles(node) {
        const dirs = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];
        dirs.forEach(dir => {
            const handle = document.createElement('div');
            handle.className = `resize-handle ${dir}`;
            handle.dataset.dir = dir;
            node.appendChild(handle);
        });
        const rot = document.createElement('div');
        rot.className = 'rotate-handle';
        node.appendChild(rot);
    }

    /* =====================================================================
     * 8. SHAPE SVG RENDERING
     * ===================================================================== */
    function renderShapeSVG(el, fill, border, width) {
        const type = el.shapeType;
        let svgContent = '';
        
        switch (type) {
            case 'rectangle':
                svgContent = `<rect x="0" y="0" width="100" height="100" />`;
                break;
            case 'rounded':
                svgContent = `<rect x="0" y="0" width="100" height="100" rx="15" ry="15" />`;
                break;
            case 'circle':
            case 'ellipse':
                svgContent = `<ellipse cx="50" cy="50" rx="48" ry="48" />`;
                break;
            case 'triangle':
                svgContent = `<polygon points="50,0 100,100 0,100" />`;
                break;
            case 'diamond':
                svgContent = `<polygon points="50,0 100,50 50,100 0,50" />`;
                break;
            case 'pentagon':
                svgContent = `<polygon points="50,0 100,38 81,100 19,100 0,38" />`;
                break;
            case 'hexagon':
                svgContent = `<polygon points="25,0 75,0 100,50 75,100 25,100 0,50" />`;
                break;
            case 'arrow':
                svgContent = `<polygon points="0,35 60,35 60,15 100,50 60,85 60,65 0,65" />`;
                break;
            case 'star':
                svgContent = `<polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" />`;
                break;
            default:
                svgContent = `<rect x="0" y="0" width="100" height="100" />`;
        }

        return `<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <g fill="${fill}" stroke="${border}" stroke-width="${width}">
                ${svgContent}
            </g>
        </svg>`;
    }

    /* =====================================================================
     * 9. TABLE RENDERING
     * ===================================================================== */
    function renderTableHTML(el, readOnly) {
        if (!el.cells) {
            el.cells = Array.from({length: el.rows || 3}, () => Array.from({length: el.cols || 3}, () => ''));
        }
        
        let html = `<table style="width:100%; height:100%; border-collapse: collapse; font-family: Inter;">`;
        el.cells.forEach((row, rIdx) => {
            html += `<tr>`;
            row.forEach((cell, cIdx) => {
                const isHeader = rIdx === 0;
                const bg = isHeader ? '#4285f4' : (rIdx % 2 === 0 ? '#f8f9fa' : '#ffffff');
                const fg = isHeader ? '#ffffff' : '#000000';
                const fw = isHeader ? 'bold' : 'normal';
                
                html += `<td style="border: 1px solid #ccc; padding: 4px; background:${bg}; color:${fg}; font-weight:${fw};">
                    <div ${!readOnly ? 'contenteditable="true"' : ''} 
                         class="table-cell-edit" 
                         data-row="${rIdx}" 
                         data-col="${cIdx}"
                         style="outline:none; min-height:1em;">${cell}</div>
                </td>`;
            });
            html += `</tr>`;
        });
        html += `</table>`;
        return html;
    }

    // Attach listener for table edits
    document.addEventListener('input', (e) => {
        if (e.target.classList.contains('table-cell-edit')) {
            const elId = selectedElementId;
            if (!elId) return;
            const slide = getActiveSlide();
            const el = slide.elements.find(x => x.id === elId);
            if (el && el.type === 'table') {
                const r = parseInt(e.target.dataset.row);
                const c = parseInt(e.target.dataset.col);
                el.cells[r][c] = e.target.innerHTML;
                scheduleSave();
            }
        }
    });

    /* =====================================================================
     * 10. CHART RENDERING
     * ===================================================================== */
    function renderChartSVG(el) {
        // Simple placeholder charts
        const data = el.chartData || { labels: ['A','B','C'], values: [30, 70, 45], colors: ['#4285f4', '#ea4335', '#fbbc04'] };
        const max = Math.max(...data.values, 1);
        let svg = `<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">`;
        
        if (el.chartType === 'bar') {
            const barW = 100 / (data.values.length * 2 + 1);
            data.values.forEach((v, i) => {
                const h = (v / max) * 80;
                const x = barW + i * (barW * 2);
                const y = 90 - h;
                svg += `<rect x="${x}" y="${y}" width="${barW}" height="${h}" fill="${data.colors[i % data.colors.length]}" />`;
            });
            svg += `<line x1="0" y1="90" x2="100" y2="90" stroke="#000" stroke-width="1" />`;
        } else {
            // Placeholder for pie/line
            svg += `<rect x="0" y="0" width="100" height="100" fill="#f1f3f4" stroke="#ccc" />`;
            svg += `<text x="50" y="50" font-family="Inter" font-size="10" text-anchor="middle" dominant-baseline="middle">Chart: ${el.chartType}</text>`;
        }
        svg += `</svg>`;
        return svg;
    }

    /* =====================================================================
     * 11. SELECTION & LIVE FORMATTING
     * ===================================================================== */
    function selectElement(id) {
        if (isEditingText && selectedElementId !== id) {
            endTextEditing();
        }
        selectedElementId = id;
        renderCanvas();
        syncFormatBar();
    }

    function deselectAll() {
        if (isEditingText) endTextEditing();
        selectedElementId = null;
        renderCanvas();
        syncFormatBar();
    }

    function getSelectedElement() {
        if (!selectedElementId) return null;
        const slide = getActiveSlide();
        return slide ? slide.elements.find(el => el.id === selectedElementId) : null;
    }

    function syncFormatBar() {
        const el = getSelectedElement();
        if (!el) {
            if(DOM.fontFamilySelect) DOM.fontFamilySelect.disabled = true;
            if(DOM.fontSizeSelect) DOM.fontSizeSelect.disabled = true;
            return;
        }

        if (el.type === 'text') {
            if(DOM.fontFamilySelect) { DOM.fontFamilySelect.disabled = false; DOM.fontFamilySelect.value = el.fontFamily || 'Inter, sans-serif'; }
            if(DOM.fontSizeSelect) { DOM.fontSizeSelect.disabled = false; DOM.fontSizeSelect.value = el.fontSize || 24; }
            if(DOM.textColorPicker) DOM.textColorPicker.value = el.color || '#000000';
            
            if(DOM.btnBold) DOM.btnBold.classList.toggle('active', el.fontWeight === 'bold');
            if(DOM.btnItalic) DOM.btnItalic.classList.toggle('active', el.fontStyle === 'italic');
            if(DOM.btnUnderline) DOM.btnUnderline.classList.toggle('active', el.textDecoration && el.textDecoration.includes('underline'));
            if(DOM.btnStrikethrough) DOM.btnStrikethrough.classList.toggle('active', el.textDecoration && el.textDecoration.includes('line-through'));
        }

        if (el.type === 'shape' || el.type === 'text') {
            if(DOM.fillColorPicker) DOM.fillColorPicker.value = el.fill || '#ffffff';
            if(DOM.borderColorPicker) DOM.borderColorPicker.value = el.borderColor || '#000000';
        }
    }

    function applyLiveFormat(prop, value) {
        const el = getSelectedElement();
        if (!el) return;
        
        pushHistory();
        el[prop] = value;
        
        // Direct DOM manipulation to avoid re-rendering and losing caret
        const node = document.getElementById(`el-${el.id}`);
        if (node) {
            const inner = node.querySelector('.element-content');
            if (inner && el.type === 'text') {
                if (prop === 'fontFamily') inner.style.fontFamily = value;
                if (prop === 'fontSize') inner.style.fontSize = value + 'px';
                if (prop === 'fontWeight') inner.style.fontWeight = value;
                if (prop === 'fontStyle') inner.style.fontStyle = value;
                if (prop === 'textDecoration') inner.style.textDecoration = value;
                if (prop === 'color') inner.style.color = value;
                if (prop === 'textAlign') inner.style.textAlign = value;
                if (prop === 'highlight') inner.style.backgroundColor = value;
            } else if (el.type === 'shape') {
                // For shapes, easiest to just re-render canvas as no caret is lost
                renderCanvas(); 
            }
        }
        
        renderThumbnails();
        scheduleSave();
    }

    /* =====================================================================
     * 12. TEXT EDITING
     * ===================================================================== */
    function startTextEditing(node, el) {
        isEditingText = true;
        node.contentEditable = 'true';
        node.focus();
        node.style.cursor = 'text';
        
        if (el.isPlaceholder && node.textContent.startsWith('Click to add')) {
            node.innerHTML = '';
            node.classList.remove('placeholder-text');
        }

        const onBlur = () => {
            endTextEditing(node, el);
            node.removeEventListener('blur', onBlur);
        };
        node.addEventListener('blur', onBlur);
    }

    function endTextEditing(node, el) {
        if (!isEditingText) return;
        isEditingText = false;
        
        if (node && el) {
            node.contentEditable = 'false';
            node.style.cursor = 'default';
            
            if (node.innerHTML.trim() === '' || node.innerHTML === '<br>') {
                el.isPlaceholder = true;
                node.classList.add('placeholder-text');
                const ph = el.height > 50 ? 'Click to add title' : 'Click to add text';
                node.innerHTML = `<p>${ph}</p>`;
                el.content = node.innerHTML;
            } else {
                el.isPlaceholder = false;
                el.content = node.innerHTML;
            }
            pushHistory();
            renderThumbnails();
            scheduleSave();
        }
    }

    /* =====================================================================
     * 13. CLIPBOARD & OPERATIONS
     * ===================================================================== */
    function copySelectedElement() {
        const el = getSelectedElement();
        if (el) {
            clipboardData = JSON.parse(JSON.stringify(el));
        }
    }

    function cutSelectedElement() {
        copySelectedElement();
        deleteSelectedElement();
    }

    function pasteElement() {
        if (!clipboardData) return;
        pushHistory();
        const slide = getActiveSlide();
        const newEl = JSON.parse(JSON.stringify(clipboardData));
        newEl.id = generateId('el');
        newEl.x += 20;
        newEl.y += 20;
        
        // update z-index
        const maxZ = slide.elements.reduce((m, e) => Math.max(m, e.zIndex || 0), 0);
        newEl.zIndex = maxZ + 1;

        slide.elements.push(newEl);
        selectedElementId = newEl.id;
        renderAll();
        scheduleSave();
    }

    function duplicateElement() {
        copySelectedElement();
        pasteElement();
    }

    function deleteSelectedElement() {
        if (!selectedElementId) return;
        pushHistory();
        const slide = getActiveSlide();
        slide.elements = slide.elements.filter(el => el.id !== selectedElementId);
        selectedElementId = null;
        renderAll();
        scheduleSave();
    }

    /* =====================================================================
     * 14. DRAG, RESIZE & ROTATE
     * ===================================================================== */
    function startDragging(e, el, node) {
        dragState.isDragging = true;
        dragState.startX = e.clientX;
        dragState.startY = e.clientY;
        dragState.startElX = el.x;
        dragState.startElY = el.y;
        dragState.targetNode = node;
        
        pushHistory();

        const onMove = (ev) => {
            if (!dragState.isDragging) return;
            const dx = (ev.clientX - dragState.startX) / currentZoom;
            const dy = (ev.clientY - dragState.startY) / currentZoom;
            el.x = Math.round(dragState.startElX + dx);
            el.y = Math.round(dragState.startElY + dy);
            
            // Smart Guides
            findSmartGuides(el);

            node.style.left = el.x + 'px';
            node.style.top = el.y + 'px';
        };

        const onUp = () => {
            dragState.isDragging = false;
            clearSmartGuides();
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
            renderThumbnails();
            scheduleSave();
        };

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    }

    function startResizing(e, el, node, dir) {
        dragState.isResizing = true;
        dragState.startX = e.clientX;
        dragState.startY = e.clientY;
        dragState.startElX = el.x;
        dragState.startElY = el.y;
        dragState.startElWidth = el.width;
        dragState.startElHeight = el.height;
        dragState.resizeHandle = dir;
        
        pushHistory();

        const onMove = (ev) => {
            if (!dragState.isResizing) return;
            const dx = (ev.clientX - dragState.startX) / currentZoom;
            const dy = (ev.clientY - dragState.startY) / currentZoom;
            
            let newX = dragState.startElX;
            let newY = dragState.startElY;
            let newW = dragState.startElWidth;
            let newH = dragState.startElHeight;

            if (dir.includes('e')) newW += dx;
            if (dir.includes('w')) { newW -= dx; newX += dx; }
            if (dir.includes('s')) newH += dy;
            if (dir.includes('n')) { newH -= dy; newY += dy; }

            if (newW < 24) { newW = 24; if(dir.includes('w')) newX = dragState.startElX + dragState.startElWidth - 24; }
            if (newH < 24) { newH = 24; if(dir.includes('n')) newY = dragState.startElY + dragState.startElHeight - 24; }

            el.x = newX;
            el.y = newY;
            el.width = newW;
            el.height = newH;

            node.style.left = el.x + 'px';
            node.style.top = el.y + 'px';
            node.style.width = el.width + 'px';
            node.style.height = el.height + 'px';
        };

        const onUp = () => {
            dragState.isResizing = false;
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
            renderCanvas(); // full re-render for SVG scaling
            renderThumbnails();
            scheduleSave();
        };

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    }

    function startRotating(e, el, node) {
        dragState.isRotating = true;
        
        const rect = node.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        pushHistory();

        const onMove = (ev) => {
            if (!dragState.isRotating) return;
            const angle = Math.atan2(ev.clientY - centerY, ev.clientX - centerX);
            let deg = angle * (180 / Math.PI) + 90;
            if (deg < 0) deg += 360;
            
            // Snap to 45 deg increments
            if (ev.shiftKey) {
                deg = Math.round(deg / 45) * 45;
            }
            
            el.rotation = Math.round(deg);
            node.style.transform = `rotate(${el.rotation}deg)`;
        };

        const onUp = () => {
            dragState.isRotating = false;
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
            renderThumbnails();
            scheduleSave();
        };

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    }

    /* =====================================================================
     * 15. SMART GUIDES
     * ===================================================================== */
    function findSmartGuides(el) {
        clearSmartGuides();
        const slide = getActiveSlide();
        const threshold = 5;
        
        const elL = el.x;
        const elR = el.x + el.width;
        const elC = el.x + el.width/2;
        const elT = el.y;
        const elB = el.y + el.height;
        const elM = el.y + el.height/2;

        slide.elements.forEach(other => {
            if (other.id === el.id) return;
            
            const oL = other.x, oR = other.x + other.width, oC = other.x + other.width/2;
            const oT = other.y, oB = other.y + other.height, oM = other.y + other.height/2;

            // Vertical guides (X-axis snap)
            if (Math.abs(elL - oL) < threshold) { el.x = oL; showSmartGuide('v', oL); }
            else if (Math.abs(elR - oR) < threshold) { el.x = oR - el.width; showSmartGuide('v', oR); }
            else if (Math.abs(elC - oC) < threshold) { el.x = oC - el.width/2; showSmartGuide('v', oC); }

            // Horizontal guides (Y-axis snap)
            if (Math.abs(elT - oT) < threshold) { el.y = oT; showSmartGuide('h', oT); }
            else if (Math.abs(elB - oB) < threshold) { el.y = oB - el.height; showSmartGuide('h', oB); }
            else if (Math.abs(elM - oM) < threshold) { el.y = oM - el.height/2; showSmartGuide('h', oM); }
        });
    }

    function showSmartGuide(orientation, pos) {
        if (!DOM.smartGuidesContainer) return;
        const guide = document.createElement('div');
        guide.style.position = 'absolute';
        guide.style.backgroundColor = '#ff0000';
        guide.style.zIndex = '9999';
        
        if (orientation === 'v') {
            guide.style.left = pos + 'px';
            guide.style.top = '0';
            guide.style.width = '1px';
            guide.style.height = CANVAS_HEIGHT + 'px';
        } else {
            guide.style.top = pos + 'px';
            guide.style.left = '0';
            guide.style.height = '1px';
            guide.style.width = CANVAS_WIDTH + 'px';
        }
        DOM.smartGuidesContainer.appendChild(guide);
    }

    function clearSmartGuides() {
        if (DOM.smartGuidesContainer) DOM.smartGuidesContainer.innerHTML = '';
    }

    /* =====================================================================
     * 16. DRAWING & INKS ENGINE
     * ===================================================================== */
    function setupDrawing(canvasNode) {
        if (!canvasNode) return;
        
        canvasNode.addEventListener('mousedown', (e) => {
            if (activeDrawMode === 'select' || activeDrawMode === 'eraser') {
                if (activeDrawMode === 'eraser') {
                    pushHistory();
                    getActiveSlide().inks = [];
                    renderCanvas();
                    scheduleSave();
                }
                return;
            }
            
            isDrawing = true;
            const rect = canvasNode.getBoundingClientRect();
            const x = (e.clientX - rect.left) / currentZoom;
            const y = (e.clientY - rect.top) / currentZoom;
            
            currentPathD = `M ${x} ${y}`;
            
            activePathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            activePathElement.setAttribute('d', currentPathD);
            activePathElement.setAttribute('fill', 'none');
            
            const color = DOM.drawColorPicker ? DOM.drawColorPicker.value : '#ff0000';
            const w = DOM.drawWidthSlider ? DOM.drawWidthSlider.value : 2;
            
            activePathElement.setAttribute('stroke', color);
            activePathElement.setAttribute('stroke-width', activeDrawMode === 'highlighter' ? w * 4 : w);
            activePathElement.setAttribute('stroke-linecap', 'round');
            activePathElement.setAttribute('stroke-linejoin', 'round');
            
            if (activeDrawMode === 'highlighter') {
                activePathElement.setAttribute('opacity', '0.5');
            }

            canvasNode.appendChild(activePathElement);
        });

        canvasNode.addEventListener('mousemove', (e) => {
            if (!isDrawing) return;
            const rect = canvasNode.getBoundingClientRect();
            const x = (e.clientX - rect.left) / (isPresentationMode ? 1 : currentZoom);
            const y = (e.clientY - rect.top) / (isPresentationMode ? 1 : currentZoom);
            currentPathD += ` L ${x} ${y}`;
            activePathElement.setAttribute('d', currentPathD);
        });

        const endDraw = () => {
            if (!isDrawing) return;
            isDrawing = false;
            pushHistory();
            
            const slide = getActiveSlide();
            if (!slide.inks) slide.inks = [];
            
            slide.inks.push({
                d: currentPathD,
                color: activePathElement.getAttribute('stroke'),
                width: activePathElement.getAttribute('stroke-width'),
                opacity: activePathElement.getAttribute('opacity') || '1'
            });
            
            activePathElement = null;
            scheduleSave();
        };

        canvasNode.addEventListener('mouseup', endDraw);
        canvasNode.addEventListener('mouseleave', endDraw);
    }

    function renderInks(inks, container) {
        if (!container) return;
        container.innerHTML = '';
        if (!inks) return;
        
        inks.forEach(ink => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', ink.d);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', ink.color);
            path.setAttribute('stroke-width', ink.width);
            path.setAttribute('stroke-linecap', 'round');
            path.setAttribute('stroke-linejoin', 'round');
            path.setAttribute('opacity', ink.opacity);
            container.appendChild(path);
        });
    }

    /* =====================================================================
     * 17. SPEAKER NOTES
     * ===================================================================== */
    function syncNotes() {
        if (!DOM.notesArea) return;
        const slide = getActiveSlide();
        DOM.notesArea.value = slide ? (slide.notes || '') : '';
    }

    if (DOM.notesArea) {
        DOM.notesArea.addEventListener('input', (e) => {
            const slide = getActiveSlide();
            if (slide) {
                slide.notes = e.target.value;
                scheduleSave();
            }
        });
    }

    /* =====================================================================
     * 18. SLIDE SHOW & PRESENTER TOOLS
     * ===================================================================== */
    function enterSlideShow(startIndex) {
        isPresentationMode = true;
        slideshowSlideIndex = startIndex;
        
        if (DOM.slideshowOverlay) DOM.slideshowOverlay.style.display = 'flex';
        
        try {
            if (DOM.slideshowOverlay.requestFullscreen) {
                DOM.slideshowOverlay.requestFullscreen();
            }
        } catch(e) {}
        
        slideshowStartTime = Date.now();
        slideshowTimer = setInterval(updateSlideshowTimer, 1000);
        updateSlideshowTimer();
        
        renderSlideShowView();
    }

    function exitSlideShow() {
        isPresentationMode = false;
        if (DOM.slideshowOverlay) DOM.slideshowOverlay.style.display = 'none';
        
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(()=>{});
        }
        
        clearInterval(slideshowTimer);
        renderAll();
    }

    function renderSlideShowView() {
        if (!DOM.slideshowSlide) return;
        
        const slide = presentationData.slides[slideshowSlideIndex];
        if (!slide) return;

        if (isBlackScreen) {
            DOM.slideshowSlide.style.backgroundColor = '#000';
            DOM.slideshowSlide.innerHTML = '';
            return;
        }

        DOM.slideshowSlide.style.backgroundColor = slide.background || '#fff';
        DOM.slideshowSlide.innerHTML = '';

        // Add Ink canvas specifically for slideshow
        const sInk = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        sInk.style.position = 'absolute';
        sInk.style.top = '0'; sInk.style.left = '0';
        sInk.style.width = '100%'; sInk.style.height = '100%';
        sInk.style.pointerEvents = 'none';
        sInk.id = 'slideshow-ink-canvas';
        DOM.slideshowSlide.appendChild(sInk);
        
        renderInks(slide.inks, sInk);

        const sortedElements = [...slide.elements].sort((a, b) => a.zIndex - b.zIndex);
        sortedElements.forEach(el => {
            const node = createElementDOM(el, true); // true = readOnly
            
            // Apply animations
            if (el.animation && el.animation !== 'none') {
                node.style.animation = `${el.animation} ${el.animDuration || 1}s ease forwards`;
            }
            
            DOM.slideshowSlide.appendChild(node);
        });

        if (DOM.hudSlideCounter) {
            DOM.hudSlideCounter.textContent = `${slideshowSlideIndex + 1} / ${presentationData.slides.length}`;
        }
        
        scaleSlideShow();
    }

    function showNextSlide() {
        if (slideshowSlideIndex < presentationData.slides.length - 1) {
            slideshowSlideIndex++;
            applySlideTransition('next');
            renderSlideShowView();
        }
    }

    function showPrevSlide() {
        if (slideshowSlideIndex > 0) {
            slideshowSlideIndex--;
            applySlideTransition('prev');
            renderSlideShowView();
        }
    }

    function applySlideTransition(dir) {
        const slide = presentationData.slides[slideshowSlideIndex];
        const t = slide.transition || 'none';
        
        if (t === 'none') return;
        
        if (DOM.slideshowSlide) {
            DOM.slideshowSlide.style.animation = 'none';
            DOM.slideshowSlide.offsetHeight; // trigger reflow
            
            let animName = t;
            if (t === 'slide-left') animName = dir === 'next' ? 'slide-in-right' : 'slide-in-left';
            if (t === 'slide-right') animName = dir === 'next' ? 'slide-in-left' : 'slide-in-right';
            
            DOM.slideshowSlide.style.animation = `${animName} 0.5s ease-out`;
        }
    }

    function updateSlideshowTimer() {
        if (!DOM.hudTimer) return;
        const diff = Math.floor((Date.now() - slideshowStartTime) / 1000);
        const m = Math.floor(diff / 60).toString().padStart(2, '0');
        const s = (diff % 60).toString().padStart(2, '0');
        DOM.hudTimer.textContent = `${m}:${s}`;
    }

    function scaleSlideShow() {
        if (!DOM.slideshowSlide) return;
        const winW = window.innerWidth;
        const winH = window.innerHeight;
        const scale = Math.min(winW / CANVAS_WIDTH, winH / CANVAS_HEIGHT);
        
        DOM.slideshowSlide.style.transform = `scale(${scale})`;
        DOM.slideshowSlide.style.transformOrigin = 'center center';
        
        // Center it
        const scaledW = CANVAS_WIDTH * scale;
        const scaledH = CANVAS_HEIGHT * scale;
        DOM.slideshowSlide.style.left = ((winW - scaledW) / 2) + 'px';
        DOM.slideshowSlide.style.top = ((winH - scaledH) / 2) + 'px';
    }

    // Fullscreen resize event
    window.addEventListener('resize', () => {
        if (isPresentationMode) scaleSlideShow();
    });

    /* =====================================================================
     * 19. ZOOM & VIEWPORT
     * ===================================================================== */
    function fitCanvasToViewport() {
        if (isPresentationMode) return;
        if (!DOM.canvasContainer || !DOM.slideCanvas) return;
        
        const rect = DOM.canvasContainer.getBoundingClientRect();
        // Leave some padding
        const pad = 60;
        const scaleX = (rect.width - pad) / CANVAS_WIDTH;
        const scaleY = (rect.height - pad) / CANVAS_HEIGHT;
        
        currentZoom = Math.min(scaleX, scaleY);
        if (currentZoom > 2) currentZoom = 2;
        if (currentZoom < 0.2) currentZoom = 0.2;
        
        setZoomLevel(currentZoom);
    }

    function setZoomLevel(z) {
        currentZoom = z;
        if (DOM.slideCanvas) {
            DOM.slideCanvas.style.transform = `scale(${currentZoom})`;
            DOM.slideCanvas.style.transformOrigin = 'center center';
        }
        renderStatusBar();
    }

    /* =====================================================================
     * 20. CONTEXT MENU
     * ===================================================================== */
    function showContextMenu(x, y, isElement) {
        if (!DOM.contextMenu) return;
        DOM.contextMenu.style.display = 'block';
        DOM.contextMenu.style.left = x + 'px';
        DOM.contextMenu.style.top = y + 'px';
        
        const elSelected = !!selectedElementId;
        if (DOM.ctxCut) DOM.ctxCut.classList.toggle('disabled', !elSelected);
        if (DOM.ctxCopy) DOM.ctxCopy.classList.toggle('disabled', !elSelected);
        if (DOM.ctxDuplicate) DOM.ctxDuplicate.classList.toggle('disabled', !elSelected);
        if (DOM.ctxDelete) DOM.ctxDelete.classList.toggle('disabled', !elSelected);
        if (DOM.ctxBringFront) DOM.ctxBringFront.classList.toggle('disabled', !elSelected);
        if (DOM.ctxSendBack) DOM.ctxSendBack.classList.toggle('disabled', !elSelected);
        if (DOM.ctxPaste) DOM.ctxPaste.classList.toggle('disabled', !clipboardData);
    }

    function hideContextMenu() {
        if (DOM.contextMenu) DOM.contextMenu.style.display = 'none';
    }

    document.addEventListener('click', hideContextMenu);
    if (DOM.canvasContainer) {
        DOM.canvasContainer.addEventListener('contextmenu', (e) => {
            if (e.target === DOM.slideCanvas || e.target === DOM.canvasContainer) {
                e.preventDefault();
                deselectAll();
                showContextMenu(e.clientX, e.clientY, false);
            }
        });
    }

    /* =====================================================================
     * 21. FIND & REPLACE
     * ===================================================================== */
    let findResults = [];
    let currentFindIndex = -1;

    function executeFind() {
        const term = DOM.findInput.value.toLowerCase();
        if (!term) return;
        
        findResults = [];
        presentationData.slides.forEach((slide, sIdx) => {
            slide.elements.forEach(el => {
                if (el.type === 'text' && el.content.toLowerCase().includes(term)) {
                    findResults.push({sIdx, elId: el.id});
                }
            });
        });
        
        if (findResults.length > 0) {
            currentFindIndex = 0;
            focusFindResult();
        } else {
            alert('No matches found.');
        }
    }

    function focusFindResult() {
        if (findResults.length === 0) return;
        const res = findResults[currentFindIndex];
        activeSlideIndex = res.sIdx;
        selectElement(res.elId);
        renderAll();
    }

    if (DOM.btnFindNext) DOM.btnFindNext.addEventListener('click', () => {
        if (findResults.length === 0) executeFind();
        else {
            currentFindIndex = (currentFindIndex + 1) % findResults.length;
            focusFindResult();
        }
    });

    if (DOM.btnFindPrev) DOM.btnFindPrev.addEventListener('click', () => {
        if (findResults.length === 0) executeFind();
        else {
            currentFindIndex = (currentFindIndex - 1 + findResults.length) % findResults.length;
            focusFindResult();
        }
    });

    if (DOM.btnReplaceOne) DOM.btnReplaceOne.addEventListener('click', () => {
        if (findResults.length === 0) return;
        const term = DOM.findInput.value;
        const repl = DOM.replaceInput.value;
        const res = findResults[currentFindIndex];
        const el = presentationData.slides[res.sIdx].elements.find(e => e.id === res.elId);
        
        if (el && el.type === 'text') {
            pushHistory();
            const regex = new RegExp(term, 'gi');
            el.content = el.content.replace(regex, repl);
            renderAll();
            scheduleSave();
            executeFind(); // Re-search
        }
    });

    if (DOM.btnReplaceAll) DOM.btnReplaceAll.addEventListener('click', () => {
        const term = DOM.findInput.value;
        if (!term) return;
        const repl = DOM.replaceInput.value;
        const regex = new RegExp(term, 'gi');
        
        pushHistory();
        presentationData.slides.forEach(slide => {
            slide.elements.forEach(el => {
                if (el.type === 'text') {
                    el.content = el.content.replace(regex, repl);
                }
            });
        });
        renderAll();
        scheduleSave();
        if (DOM.findDialog) DOM.findDialog.style.display = 'none';
    });

    if (DOM.btnCloseFind) DOM.btnCloseFind.addEventListener('click', () => {
        if (DOM.findDialog) DOM.findDialog.style.display = 'none';
    });

    /* =====================================================================
     * 25. EVENT LISTENERS SETUP
     * ===================================================================== */
    function setupEventListeners() {
        // Ribbon tabs
        DOM.ribbonTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                DOM.ribbonTabs.forEach(t => t.classList.remove('active'));
                DOM.ribbonPanels.forEach(p => p.classList.remove('active'));
                tab.classList.add('active');
                const panelId = tab.dataset.panel;
                const panel = document.getElementById(panelId);
                if (panel) panel.classList.add('active');
            });
        });

        // Background click deselect
        if (DOM.canvasContainer) {
            DOM.canvasContainer.addEventListener('mousedown', (e) => {
                if (e.target === DOM.slideCanvas || e.target === DOM.canvasContainer) {
                    deselectAll();
                }
            });
        }

        // Backstage
        const btnFile = document.querySelector('[data-panel="backstage"]');
        if (btnFile && DOM.backstageView) {
            btnFile.addEventListener('click', (e) => {
                e.stopPropagation();
                DOM.backstageView.style.display = 'flex';
            });
        }
        if (DOM.btnBackstageClose) {
            DOM.btnBackstageClose.addEventListener('click', () => {
                DOM.backstageView.style.display = 'none';
                DOM.ribbonTabs[1].click(); // Go back to Home
            });
        }

        // Home panel
        if (DOM.btnNewSlide) DOM.btnNewSlide.addEventListener('click', () => addSlide('title_content'));
        
        if (DOM.btnLayout) DOM.btnLayout.addEventListener('click', (e) => {
            e.stopPropagation();
            if (DOM.layoutDropdownMenu) {
                DOM.layoutDropdownMenu.style.display = DOM.layoutDropdownMenu.style.display === 'block' ? 'none' : 'block';
            }
        });
        
        document.querySelectorAll('.layout-option').forEach(opt => {
            opt.addEventListener('click', () => {
                const type = opt.dataset.layout;
                pushHistory();
                presentationData.slides[activeSlideIndex] = createSlideFromLayout(type);
                renderAll();
                scheduleSave();
            });
        });

        if (DOM.btnDelete) DOM.btnDelete.addEventListener('click', deleteSelectedElement);
        if (DOM.btnUndo) DOM.btnUndo.addEventListener('click', undo);
        if (DOM.btnRedo) DOM.btnRedo.addEventListener('click', redo);

        // Format Bar
        if (DOM.fontFamilySelect) DOM.fontFamilySelect.addEventListener('change', (e) => applyLiveFormat('fontFamily', e.target.value));
        if (DOM.fontSizeSelect) DOM.fontSizeSelect.addEventListener('change', (e) => applyLiveFormat('fontSize', parseInt(e.target.value)));
        if (DOM.textColorPicker) DOM.textColorPicker.addEventListener('input', (e) => applyLiveFormat('color', e.target.value));
        if (DOM.textHighlightPicker) DOM.textHighlightPicker.addEventListener('input', (e) => applyLiveFormat('highlight', e.target.value));
        
        if (DOM.btnBold) DOM.btnBold.addEventListener('click', () => toggleFormat('fontWeight', 'normal', 'bold'));
        if (DOM.btnItalic) DOM.btnItalic.addEventListener('click', () => toggleFormat('fontStyle', 'normal', 'italic'));
        if (DOM.btnUnderline) DOM.btnUnderline.addEventListener('click', () => toggleFormat('textDecoration', 'none', 'underline'));
        if (DOM.btnStrikethrough) DOM.btnStrikethrough.addEventListener('click', () => toggleFormat('textDecoration', 'none', 'line-through'));

        if (DOM.btnAlignLeft) DOM.btnAlignLeft.addEventListener('click', () => applyLiveFormat('textAlign', 'left'));
        if (DOM.btnAlignCenter) DOM.btnAlignCenter.addEventListener('click', () => applyLiveFormat('textAlign', 'center'));
        if (DOM.btnAlignRight) DOM.btnAlignRight.addEventListener('click', () => applyLiveFormat('textAlign', 'right'));

        if (DOM.fillColorPicker) DOM.fillColorPicker.addEventListener('input', (e) => applyLiveFormat('fill', e.target.value));
        if (DOM.borderColorPicker) DOM.borderColorPicker.addEventListener('input', (e) => applyLiveFormat('borderColor', e.target.value));
        if (DOM.borderWidthSelect) DOM.borderWidthSelect.addEventListener('change', (e) => applyLiveFormat('borderWidth', parseInt(e.target.value)));

        // Insert
        if (DOM.btnInsertTextbox) DOM.btnInsertTextbox.addEventListener('click', () => {
            insertElement(createTextElement('Text', 100, 100, 300, 100, 24, 'left', false));
        });
        
        if (DOM.btnInsertShape) DOM.btnInsertShape.addEventListener('click', (e) => {
            e.stopPropagation();
            if (DOM.shapeDropdownMenu) {
                DOM.shapeDropdownMenu.style.display = DOM.shapeDropdownMenu.style.display === 'block' ? 'none' : 'grid';
            }
        });
        
        DOM.shapeTiles.forEach(tile => {
            tile.addEventListener('click', () => {
                insertElement(createShapeElement(tile.dataset.shape, 100, 100, 150, 150));
            });
        });

        // Table Picker
        if (DOM.btnInsertTable) DOM.btnInsertTable.addEventListener('click', (e) => {
            e.stopPropagation();
            if (DOM.tableDropdownMenu) DOM.tableDropdownMenu.style.display = 'block';
        });

        if (DOM.tableSizeGrid) {
            DOM.tableSizeGrid.addEventListener('mousemove', (e) => {
                const cell = e.target;
                if (cell.classList.contains('grid-cell')) {
                    const r = parseInt(cell.dataset.row);
                    const c = parseInt(cell.dataset.col);
                    if (DOM.tableGridText) DOM.tableGridText.textContent = `${c} × ${r} Table`;
                    
                    DOM.tableSizeGrid.querySelectorAll('.grid-cell').forEach(cl => {
                        const cr = parseInt(cl.dataset.row);
                        const cc = parseInt(cl.dataset.col);
                        cl.classList.toggle('active', cr <= r && cc <= c);
                    });
                }
            });
            DOM.tableSizeGrid.addEventListener('click', (e) => {
                const cell = e.target;
                if (cell.classList.contains('grid-cell')) {
                    const r = parseInt(cell.dataset.row);
                    const c = parseInt(cell.dataset.col);
                    insertElement({
                        id: generateId('table'), type: 'table',
                        x: 100, y: 100, width: c * 100, height: r * 40,
                        rows: r, cols: c,
                        cells: Array.from({length: r}, () => Array.from({length: c}, () => '')),
                        zIndex: 1
                    });
                    DOM.tableDropdownMenu.style.display = 'none';
                }
            });
        }

        // Charts
        if (DOM.btnInsertChart) DOM.btnInsertChart.addEventListener('click', (e) => {
            e.stopPropagation();
            if (DOM.chartDropdownMenu) DOM.chartDropdownMenu.style.display = 'block';
        });
        DOM.chartTiles.forEach(tile => {
            tile.addEventListener('click', () => {
                insertElement({
                    id: generateId('chart'), type: 'chart', chartType: tile.dataset.chart,
                    x: 100, y: 100, width: 400, height: 300, zIndex: 1
                });
            });
        });

        // Draw Tools
        const setDrawMode = (mode) => {
            activeDrawMode = mode;
            [DOM.btnSelectTool, DOM.btnPenTool, DOM.btnHighlighterTool, DOM.btnEraserTool].forEach(b => b && b.classList.remove('active'));
            if (mode === 'select' && DOM.btnSelectTool) DOM.btnSelectTool.classList.add('active');
            if (mode === 'pen' && DOM.btnPenTool) DOM.btnPenTool.classList.add('active');
            if (mode === 'highlighter' && DOM.btnHighlighterTool) DOM.btnHighlighterTool.classList.add('active');
            if (mode === 'eraser' && DOM.btnEraserTool) DOM.btnEraserTool.classList.add('active');
            
            if (DOM.inkCanvas) {
                DOM.inkCanvas.style.pointerEvents = mode === 'select' ? 'none' : 'auto';
                DOM.inkCanvas.style.cursor = mode === 'eraser' ? 'crosshair' : (mode === 'select' ? 'default' : 'pen');
            }
        };

        if (DOM.btnSelectTool) DOM.btnSelectTool.addEventListener('click', () => setDrawMode('select'));
        if (DOM.btnPenTool) DOM.btnPenTool.addEventListener('click', () => setDrawMode('pen'));
        if (DOM.btnHighlighterTool) DOM.btnHighlighterTool.addEventListener('click', () => setDrawMode('highlighter'));
        if (DOM.btnEraserTool) DOM.btnEraserTool.addEventListener('click', () => setDrawMode('eraser'));
        
        setupDrawing(DOM.inkCanvas);

        // Design & Themes
        DOM.themeCards.forEach(card => {
            card.addEventListener('click', () => {
                pushHistory();
                presentationData.theme = card.dataset.theme;
                const bg = getThemeBackgroundColor();
                presentationData.slides.forEach(s => s.background = bg);
                renderAll();
                scheduleSave();
            });
        });

        // Transitions
        DOM.transitionCards.forEach(card => {
            card.addEventListener('click', () => {
                pushHistory();
                const slide = getActiveSlide();
                if (slide) slide.transition = card.dataset.transition;
                scheduleSave();
            });
        });

        // Animations
        if (DOM.animTypeSelect) DOM.animTypeSelect.addEventListener('change', (e) => {
            const el = getSelectedElement();
            if (el) { pushHistory(); el.animation = e.target.value; scheduleSave(); }
        });
        if (DOM.animDurationInput) DOM.animDurationInput.addEventListener('change', (e) => {
            const el = getSelectedElement();
            if (el) { pushHistory(); el.animDuration = parseFloat(e.target.value); scheduleSave(); }
        });
        if (DOM.btnPreviewAnim) DOM.btnPreviewAnim.addEventListener('click', () => {
            const el = getSelectedElement();
            if (el && el.animation !== 'none') {
                const node = document.getElementById(`el-${el.id}`);
                if (node) {
                    node.style.animation = 'none';
                    node.offsetHeight; // trigger reflow
                    node.style.animation = `${el.animation} ${el.animDuration || 1}s ease forwards`;
                }
            }
        });
        if (DOM.btnRemoveAnim) DOM.btnRemoveAnim.addEventListener('click', () => {
            const el = getSelectedElement();
            if (el) { pushHistory(); el.animation = 'none'; scheduleSave(); }
        });

        // View & Status Bar
        if (DOM.btnViewNormal) DOM.btnViewNormal.addEventListener('click', () => { activeViewMode = 'normal'; renderAll(); });
        if (DOM.btnViewSorter) DOM.btnViewSorter.addEventListener('click', () => { activeViewMode = 'sorter'; renderAll(); });
        if (DOM.btnStatusBarNormal) DOM.btnStatusBarNormal.addEventListener('click', () => { activeViewMode = 'normal'; renderAll(); });
        if (DOM.btnStatusBarSorter) DOM.btnStatusBarSorter.addEventListener('click', () => { activeViewMode = 'sorter'; renderAll(); });
        if (DOM.btnStatusBarSlideshow) DOM.btnStatusBarSlideshow.addEventListener('click', () => enterSlideShow(activeSlideIndex));

        // Slideshow Buttons
        if (DOM.btnStartStart) DOM.btnStartStart.addEventListener('click', () => enterSlideShow(0));
        if (DOM.btnStartCurrent) DOM.btnStartCurrent.addEventListener('click', () => enterSlideShow(activeSlideIndex));
        
        if (DOM.hudBtnPrev) DOM.hudBtnPrev.addEventListener('click', showPrevSlide);
        if (DOM.hudBtnNext) DOM.hudBtnNext.addEventListener('click', showNextSlide);
        if (DOM.hudBtnExit) DOM.hudBtnExit.addEventListener('click', exitSlideShow);
        if (DOM.hudBtnBlack) DOM.hudBtnBlack.addEventListener('click', () => {
            isBlackScreen = !isBlackScreen;
            renderSlideShowView();
        });

        // Zoom
        if (DOM.zoomSlider) DOM.zoomSlider.addEventListener('input', (e) => setZoomLevel(parseFloat(e.target.value)));
        if (DOM.btnFitSlide) DOM.btnFitSlide.addEventListener('click', fitCanvasToViewport);

        // Context Menu Items
        if (DOM.ctxCut) DOM.ctxCut.addEventListener('click', () => { cutSelectedElement(); hideContextMenu(); });
        if (DOM.ctxCopy) DOM.ctxCopy.addEventListener('click', () => { copySelectedElement(); hideContextMenu(); });
        if (DOM.ctxPaste) DOM.ctxPaste.addEventListener('click', () => { pasteElement(); hideContextMenu(); });
        if (DOM.ctxDuplicate) DOM.ctxDuplicate.addEventListener('click', () => { duplicateElement(); hideContextMenu(); });
        if (DOM.ctxDelete) DOM.ctxDelete.addEventListener('click', () => { deleteSelectedElement(); hideContextMenu(); });
        
        if (DOM.ctxBringFront) DOM.ctxBringFront.addEventListener('click', () => {
            const el = getSelectedElement();
            const slide = getActiveSlide();
            if (el && slide) {
                pushHistory();
                const maxZ = Math.max(...slide.elements.map(e => e.zIndex || 0));
                el.zIndex = maxZ + 1;
                renderAll(); scheduleSave();
            }
            hideContextMenu();
        });
        
        if (DOM.ctxSendBack) DOM.ctxSendBack.addEventListener('click', () => {
            const el = getSelectedElement();
            const slide = getActiveSlide();
            if (el && slide) {
                pushHistory();
                const minZ = Math.min(...slide.elements.map(e => e.zIndex || 1));
                el.zIndex = minZ - 1;
                renderAll(); scheduleSave();
            }
            hideContextMenu();
        });

        // Close dropdowns on outside click
        document.addEventListener('click', () => {
            if (DOM.layoutDropdownMenu) DOM.layoutDropdownMenu.style.display = 'none';
            if (DOM.shapeDropdownMenu) DOM.shapeDropdownMenu.style.display = 'none';
            if (DOM.tableDropdownMenu) DOM.tableDropdownMenu.style.display = 'none';
            if (DOM.chartDropdownMenu) DOM.chartDropdownMenu.style.display = 'none';
        });
    }

    function handleGlobalKeydown(e) {
        if (isPresentationMode) {
            if (e.key === 'Escape') exitSlideShow();
            if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') showNextSlide();
            if (e.key === 'ArrowLeft') showPrevSlide();
            if (e.key.toLowerCase() === 'b') { isBlackScreen = !isBlackScreen; renderSlideShowView(); }
            return;
        }

        // Don't trigger shortcuts if typing in input/textarea/contenteditable
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;

        if (e.ctrlKey || e.metaKey) {
            switch(e.key.toLowerCase()) {
                case 's': e.preventDefault(); savePresentation(); break;
                case 'z': e.preventDefault(); if (e.shiftKey) redo(); else undo(); break;
                case 'y': e.preventDefault(); redo(); break;
                case 'c': e.preventDefault(); copySelectedElement(); break;
                case 'x': e.preventDefault(); cutSelectedElement(); break;
                case 'v': e.preventDefault(); pasteElement(); break;
                case 'd': e.preventDefault(); duplicateElement(); break;
                case 'f': e.preventDefault(); if (DOM.findDialog) DOM.findDialog.style.display = 'block'; break;
            }
        } else {
            if (e.key === 'Delete' || e.key === 'Backspace') {
                deleteSelectedElement();
            }
        }
    }

    /* =====================================================================
     * 26. HELPERS
     * ===================================================================== */
    function getActiveSlide() {
        return presentationData.slides[activeSlideIndex];
    }

    function addSlide(layout) {
        pushHistory();
        const newSlide = createSlideFromLayout(layout);
        presentationData.slides.splice(activeSlideIndex + 1, 0, newSlide);
        activeSlideIndex++;
        renderAll();
        scheduleSave();
    }

    function insertElement(el) {
        pushHistory();
        const slide = getActiveSlide();
        const maxZ = slide.elements.reduce((m, e) => Math.max(m, e.zIndex || 0), 0);
        el.zIndex = maxZ + 1;
        slide.elements.push(el);
        selectElement(el.id);
        renderAll();
        scheduleSave();
    }

    function toggleFormat(prop, val1, val2) {
        const el = getSelectedElement();
        if (el) applyLiveFormat(prop, el[prop] === val2 ? val1 : val2);
    }

    function generateId(prefix) {
        return prefix + '-' + Math.random().toString(36).substr(2, 9);
    }

    // Start
    document.addEventListener('DOMContentLoaded', init);

})();
