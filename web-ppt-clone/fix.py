import re
import json

with open(r'd:\Folio-clone\01\web-ppt-clone\static\js\editor.js', 'r', encoding='utf-8') as f:
    code = f.read()

replacement = """    const DOM = {
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
    };"""

pattern = re.compile(r'    const DOM = \{.*?\n    \};', re.DOTALL)
new_code = pattern.sub(replacement, code)

with open(r'd:\Folio-clone\01\web-ppt-clone\static\js\editor.js', 'w', encoding='utf-8') as f:
    f.write(new_code)
