/**
 * POWER APPS FOUNDATION: DAY 11 PRESENTATION ENGINE
 * Topic: Design Data from the Process
 * Phase: Phase 4: Data Architecture
 * Architecture: Zero-dependency vanilla JavaScript engine with full non-destructive bilingual DOM swapping
 * Features:
 *  - 24-Slide 16:9 Stage Navigation & Morph Transitions
 *  - 90-Minute Agenda Live Activity Timer
 *  - Presenter Focus Laser Pointer & Click Shockwave Ripple Engine
 *  - 100% COMPLETE Bilingual Khmer / English Engine (Exact 1-to-1 DOM Mirroring for all 24 slides)
 *  - 4 Interactive Pedagogical Widgets:
 *      1. Process-to-Schema Architect & Field Type Workbench (Slide 12)
 *      2. Multi-Scenario Schema & Data Type Simulator (Slide 18)
 *      3. 5-Question Evaluative Knowledge Check (Slide 20)
 *      4. Capstone Benchmark Solution & 4-Level Rubric (Slide 22)
 *  - Trainer Notes Drawer (N) & Slide Overview Grid (O / G)
 */

(function () {
  'use strict';

  // ==========================================================================
  // PRESENTATION STATE
  // ==========================================================================
  const state = {
    currentSlide: 1,
    totalSlides: 24,
    isKhmer: false,
    isLaserActive: true,
    isNotesOpen: false,
    isOverviewOpen: false,
    timerSeconds: 0,
    timerRunning: false,
    timerInterval: null
  };

  // Original English Slide Contents (Stored on boot for non-destructive swap)
  const slideOriginals = [];

  // ==========================================================================
  // DOM ELEMENT REFERENCES
  // ==========================================================================
  const dom = {
    container: document.getElementById('presentation-container'),
    stage: document.getElementById('presentation-stage'),
    slides: document.querySelectorAll('.slide'),
    currentSlideNum: document.getElementById('slide-current-num') || document.getElementById('current-slide-num'),
    totalSlidesNum: document.getElementById('slide-total-count') || document.getElementById('total-slides-num'),
    slideCounter: document.getElementById('slide-counter'),
    currentSlideTitle: document.getElementById('current-slide-title'),
    progressFill: document.getElementById('progress-bar') || document.getElementById('progress-fill') || document.getElementById('progress-bar-fill'),
    btnPrev: document.getElementById('btn-prev'),
    btnNext: document.getElementById('btn-next'),
    btnRestart: document.getElementById('btn-restart'),
    
    // Timer
    timerDisplay: document.getElementById('session-timer'),
    timerSegmentName: document.getElementById('current-segment-name'),
    timerToggleBtn: document.getElementById('timer-toggle-btn'),
    timerResetBtn: document.getElementById('timer-reset-btn'),
    timerIcon: document.getElementById('timer-icon'),

    // Toggles
    langSwitchBtn: document.getElementById('lang-switch-btn'),
    langLabel: document.getElementById('lang-label'),
    laserToggleBtn: document.getElementById('laser-toggle-btn'),
    notesToggleBtn: document.getElementById('notes-toggle-btn'),
    overviewToggleBtn: document.getElementById('overview-toggle-btn'),
    fullscreenToggleBtn: document.getElementById('fullscreen-toggle-btn'),

    // Drawers & Modals
    notesDrawer: document.getElementById('notes-drawer'),
    notesCloseBtn: document.getElementById('notes-close-btn'),
    notesDrawerContent: document.getElementById('notes-content'),
    overviewModal: document.getElementById('overview-modal'),
    overviewCloseBtn: document.getElementById('overview-close-btn'),
    overviewGrid: document.getElementById('overview-grid'),

    // Pointer
    presenterPointer: document.getElementById('presenter-pointer'),
    pointerClickRipple: document.getElementById('pointer-click-ripple')
  };

  // ==========================================================================
  // 100% COMPLETE BILINGUAL KHMER SLIDES DATA (EXACT 1-TO-1 DOM MIRROR)
  // Famous Khmer Typography: Moul for Titles, Siemreap/Battambang for Body
  // ==========================================================================
  const KHMER_SLIDES = [
    // Slide 1: Hero Cover
    {
      title: "ចំណងជើង៖ រចនាទិន្នន័យចេញពីដំណើរការ",
      content: `
        <div class="hero-badge-row">
          <span class="pill pill-phase">ដំណាក់កាលទី ៤៖ ស្ថាបត្យកម្មទិន្នន័យ</span>
          <span class="pill pill-accent">ថ្ងៃទី ១១ នៃ ២៧ ថ្ងៃ</span>
          <span class="pill pill-time">វគ្គសិក្សាជាក់ស្តែង ៩០ នាទី</span>
        </div>
        <h1 class="hero-title">រចនាទិន្នន័យចេញពីដំណើរការការងារ</h1>
        <p class="hero-subtitle">គ្រប់ជួរឈរ (Column) ក្នុងតារាងរបស់អ្នក ត្រូវតែឆ្លើយសំណួរជាក់ស្តែងដែលដំណើរការការងារត្រូវការ។ កុំរចនាទិន្នន័យដោយការស្មានទទេៗ។</p>
        
        <div class="hero-connection-card">
          <span class="chain-label">ខ្សែសង្វាក់តភ្ជាប់គោលគំនិតថ្ងៃនេះ</span>
          <div class="chain-nodes">
            <span class="chain-node">តម្រូវការការងារ</span>
            <span class="chain-arrow">➔</span>
            <span class="chain-node">សំណួរក្នុងដំណើរការ</span>
            <span class="chain-arrow">➔</span>
            <span class="chain-node">ជួរឈរចាំបាច់</span>
            <span class="chain-arrow">➔</span>
            <span class="chain-node">ប្រភេទគំរូទិន្នន័យ</span>
            <span class="chain-arrow">➔</span>
            <span class="chain-node active">ស្ថានភាព &amp; លេខកូដសម្គាល់</span>
          </div>
        </div>

        <div class="hero-action-row">
          <button class="fluent-btn-primary" id="hero-start-btn">
            <span>ចាប់ផ្តើមមេរៀន (Space / ➔)</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
          <span class="hero-hint">រចនាបទ Microsoft Fluent Dark • ដំណើរការលើ Microsoft Edge • ពីរភាសាពេញលេញ</span>
        </div>
      `
    },

    // Slide 2: Curriculum Blueprint
    {
      title: "ប្លង់មេនៃកម្មវិធីសិក្សា៖ ថ្ងៃទី ១១",
      content: `
        <div class="slide-header">
          <span class="section-tag">កម្មវិធីសិក្សាតភ្ជាប់គ្នាជាវង់ (Spiral)</span>
          <h2>ទីតាំងរបស់យើងនៅក្នុងដំណើរ ២៧ ថ្ងៃ</h2>
          <p class="subtitle">គំរូផ្នត់គំនិតស្នូល៖ បញ្ហាពិត ➔ ដំណើរការ ➔ ទិន្នន័យ ➔ អេក្រង់ ➔ តក្កវិជ្ជា ➔ សកម្មភាព ➔ ផ្ទុកទិន្នន័យ ➔ ផ្តល់ដំណឹង ➔ តេស្ត</p>
        </div>

        <div class="curr-map-grid">
          <div class="curr-card passed">
            <span class="card-phase">វគ្គ ១–២៖ មូលដ្ឋានឌីជីថល &amp; តក្កវិជ្ជា</span>
            <span class="card-days">ថ្ងៃទី ១ – ៦ (បានបញ្ចប់)</span>
            <h3 class="card-title">ការណែនាំ, លក្ខខណ្ឌ &amp; ក្បួនប៊ូលីន</h3>
            <p>ឧបករណ៍កុំព្យូទ័រ, អថេរ (Variables), ច្រកសំណួរ (True/False), ការសម្រេចចិត្ត IF/THEN និងក្បួន AND/OR។</p>
            <span class="card-status">✓ ស្ទាត់ជំនាញរួចរាល់</span>
          </div>

          <div class="curr-card passed">
            <span class="card-phase">វគ្គ ៣៖ ផ្នត់គំនិតអាជីវកម្ម &amp; តារាង</span>
            <span class="card-days">ថ្ងៃទី ៧ – ១០ (បានបញ្ចប់)</span>
            <h3 class="card-title">ដំណើរការ, ស្ថានភាព, កំណត់ត្រា &amp; តារាង</h3>
            <p>ការគូសប្លង់អាជីវកម្ម, រចនាសម្ព័ន្ធ (Structure)លំហូរ, ដំណាក់កាលទាំង ៦ និងការផ្ទុកករណីច្រើនក្នុងតារាង។</p>
            <span class="card-status">✓ ស្ទាត់ជំនាញរួចរាល់</span>
          </div>

          <div class="curr-card active-card">
            <span class="card-phase">វគ្គ ៤៖ ស្ថាបត្យកម្មទិន្នន័យ (ថ្ងៃនេះ)</span>
            <span class="card-days">ថ្ងៃទី ១១ (កំពុងសិក្សា)</span>
            <h3 class="card-title">រចនាទិន្នន័យចេញពីដំណើរការ</h3>
            <p>ការទាញយកជួរឈរពីសំណួរក្នុងលំហូរ, ជ្រើសរើសប្រភេទគំរូទិន្នន័យដែលមិនងាយខូច, ស្ថានភាពមេ និងលេខកូដ ID។</p>
            <span class="card-status">★ កំពុងបន្តសកម្ម</span>
          </div>

          <div class="curr-card future">
            <span class="card-phase">វគ្គ ៥៖ ផ្ទាំងអ្នកប្រើប្រាស់ &amp; អេក្រង់</span>
            <span class="card-days">ថ្ងៃទី ១២ – ១៤ (ដំណាក់កាលបន្ទាប់)</span>
            <h3 class="card-title">បំប្លែងដំណើរការ &amp; ទិន្នន័យជាអេក្រង់</h3>
            <p>ការគូសប្លង់អេក្រង់ចេញពីទិន្នន័យ, បង្កើត Galleries, ទម្រង់ Forms, កាត Cards និងការរុករកក្នុងរោងចក្រ។</p>
            <span class="card-status">⏳ វគ្គបន្ទាប់</span>
          </div>

          <div class="curr-card future">
            <span class="card-phase">វគ្គ ៦៖ Power Fx &amp; ស្វ័យប្រវត្តិកម្ម</span>
            <span class="card-days">ថ្ងៃទី ១៥ – ២១ (ខាងមុខ)</span>
            <h3 class="card-title">តក្កវិជ្ជាអន្តរកម្ម &amp; សកម្មភាពលើ Cloud</h3>
            <p>Patch, Collect, LookUp, Filter, ការផ្ទៀងផ្ទាត់សុពលភាព, ការជូនដំណឹងស្វ័យប្រវត្តិ និង Cloud Flows។</p>
            <span class="card-status">⏳ ខាងមុខ</span>
          </div>

          <div class="curr-card future">
            <span class="card-phase">វគ្គ ៧៖ ការតេស្តក្នុងស្ថាប័ន &amp; បញ្ចេញប្រើ</span>
            <span class="card-days">ថ្ងៃទី ២២ – ២៧ (ដំណាក់កាលចុងក្រោយ)</span>
            <h3 class="card-title">ការកែលម្អកម្រិតវិជ្ជាជីវៈ &amp; គម្រោង Capstone</h3>
            <p>សិទ្ធិសុវត្ថិភាព, ការចាប់កំហុស, ការតេស្តលើទូរស័ព្ទ/Tablet, មុខងារ Offline និងគម្រោង Capstone បញ្ចប់ការសិក្សា។</p>
            <span class="card-status">⏳ Capstone</span>
          </div>
        </div>
      `
    },

    // Slide 3: Objectives
    {
      title: "គោលបំណងដែលអាចវាស់វែងបាន",
      content: `
        <div class="slide-header">
          <span class="section-tag">លទ្ធផលសិក្សា</span>
          <h2>អ្វីដែលអ្នកនឹងស្ទាត់ជំនាញក្នុងរយៈពេល ៩០ នាទីថ្ងៃនេះ</h2>
          <p class="subtitle">សមត្ថភាពអនុវត្តជាក់ស្តែង ៤ ចំណុច ដែលត្រូវបានវាយតម្លៃតាមស្តង់ដារអ្នកអភិវឌ្ឍន៍កម្មវិធីកម្រិតសហគ្រាស។</p>
        </div>

        <div class="objectives-grid">
          <div class="obj-card">
            <div class="obj-header">
              <span class="obj-badge bloom-l2">L2: យល់ដឹង</span>
              <span class="obj-num">០១</span>
            </div>
            <h3>ពន្យល់ពីគោលការណ៍ "សំណួរមុនជួរឈរ"</h3>
            <p>បញ្ជាក់ពីមូលហេតុដែលការរចនាជួរឈរចេញពីជំហានការងារ ជួយទប់ស្កាត់ការកកស្ទះទិន្នន័យ និងធានាឱ្យប្រព័ន្ធដំណើរការរលូន។</p>
          </div>

          <div class="obj-card">
            <div class="obj-header">
              <span class="obj-badge bloom-l3">L3: អនុវត្ត</span>
              <span class="obj-num">០២</span>
            </div>
            <h3>ជ្រើសរើសប្រភេទគំរូទិន្នន័យ (Data Types) ដ៏រឹងមាំ</h3>
            <p>ចាត់ថ្នាក់សំណួរអាជីវកម្មទៅជាប្រភេទគំរូទិន្នន័យពិតប្រាកដក្នុង Power Apps៖ អត្ថបទខ្លី, អត្ថបទវែង, លេខ, រូបិយប័ណ្ណ, កាលបរិច្ឆេទ, ជម្រើស Choice, Yes/No និងលេខកូដ Auto-ID។</p>
          </div>

          <div class="obj-card">
            <div class="obj-header">
              <span class="obj-badge bloom-l4">L4: វិភាគ</span>
              <span class="obj-num">០៣</span>
            </div>
            <h3>ញែកជួរឈរទប់ស្កាត់, ស្ថានភាព និងលេខកូដសម្គាល់</h3>
            <p>វិភាគដំណើរការស្នើសុំក្នុងរោងចក្រ ដើម្បីញែកឱ្យដាច់រវាងជួរឈរដែលត្រូវតែបំពេញជាដាច់ខាត, ស្ថានភាពបញ្ជាលំហូរ និងលេខកូដ ID អចិន្ត្រៃយ៍។</p>
          </div>

          <div class="obj-card">
            <div class="obj-header">
              <span class="obj-badge bloom-l5">L5: បង្កើត</span>
              <span class="obj-num">០៤</span>
            </div>
            <h3>គូសប្លង់តារាងទិន្នន័យ &amp; បង្កើតក្បួន Power Fx</h3>
            <p>បង្កើតតារាងលម្អិតនៃទិន្នន័យ ៨ ជួរ និងបំប្លែងក្បួនអាជីវកម្មទៅជាកូដ Power Fx សម្រាប់ចាក់សោប៊ូតុងផ្ញើ (Submit Gate)។</p>
          </div>
        </div>
      `
    },

    // Slide 4: Agenda
    {
      title: "កាលវិភាគ ៩០ នាទី",
      content: `
        <div class="slide-header">
          <span class="section-tag">កាលវិភាគមេរៀនច្បាស់លាស់</span>
          <h2>កាលវិភាគសិក្សាតាមលំដាប់លំដោយ ៩០ នាទី</h2>
          <p class="subtitle">គ្រប់នាទីត្រូវបានរៀបចំយ៉ាងហ្មត់ចត់សម្រាប់ការចូលរួមសកម្ម, ឧទាហរណ៍ជាក់ស្តែង, ការបង្ហាញផ្ទាល់ និងការពិសោធន៍ដៃ។</p>
        </div>

        <div class="agenda-timeline">
          <div class="time-block">
            <span class="time-stamp">00:00 – 10:00 (១០ នាទី)</span>
            <span class="time-badge">វគ្គ ១៖ រំលឹក &amp; តភ្ជាប់</span>
            <p class="time-content">រំលឹកចំណុចសំខាន់ពីថ្ងៃទី ៩ &amp; ១០, សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង និងការណែនាំគោលដៅស្ថាបត្យកម្មទិន្នន័យថ្ងៃនេះ។</p>
          </div>

          <div class="time-block">
            <span class="time-stamp">10:00 – 25:00 (១៥ នាទី)</span>
            <span class="time-badge">វគ្គ ២៖ ស្វែងយល់ពីមូលហេតុ (The Why)</span>
            <p class="time-content">មហន្តរាយ $42,000 ដោយសារ "តារាង Excel ៤៧ ជួរឈរ" នៅ Apex Plastics និងឧទាហរណ៍ក្រដាសវេជ្ជបញ្ជាពេទ្យ។</p>
          </div>

          <div class="time-block">
            <span class="time-stamp">25:00 – 45:00 (២០ នាទី)</span>
            <span class="time-badge">វគ្គ ៣៖ ទ្រឹស្តីស៊ីជម្រៅ</span>
            <p class="time-content">បំពង់បង្ហូរ ៥ ជំហានពីដំណើរការទៅទិន្នន័យ, ការជ្រើសរើស Data Types, ស្ថានភាពមេ និងភាពមិនអាចកែប្រែបាននៃលេខ ID។</p>
          </div>

          <div class="time-block highlight-block">
            <span class="time-stamp">45:00 – 60:00 (១៥ នាទី)</span>
            <span class="time-badge">វគ្គ ៤៖ បង្ហាញ &amp; ក្តារពិសោធន៍</span>
            <p class="time-content">សម្រាកខួរក្បាល (45:00), ក្តារពិសោធន៍ស្ថាបត្យករទិន្នន័យ (Widget 1) និងការបង្ហាញរចនាតារាងផ្ទាល់ដោយគ្រូ។</p>
          </div>

          <div class="time-block">
            <span class="time-stamp">60:00 – 75:00 (១៥ នាទី)</span>
            <span class="time-badge">វគ្គ ៥៖ អនុវត្តជាមួយគ្រូ</span>
            <p class="time-content">ការធ្វើសវនកម្មលើតារាងអេតចាយឃ្លាំងខូច, កម្មវិធីពិសោធន៍ ៦ ស្ថានភាព (Widget 2) និងកែតម្រូវការយល់ច្រឡំគ្រោះថ្នាក់ ៤ ចំណុច។</p>
          </div>

          <div class="time-block">
            <span class="time-stamp">75:00 – 90:00 (១៥ នាទី)</span>
            <span class="time-badge">វគ្គ ៦៖ វាយតម្លៃ &amp; ស្ពានបន្ត</span>
            <p class="time-content">តេស្ត ៥ សំណួរ (Widget 3), លំហាត់ Capstone, ចម្លើយគំរូ &amp; តារាងវាយតម្លៃ Rubric និងស្ពានទៅកាន់ថ្ងៃទី ១២។</p>
          </div>
        </div>
      `
    },

    // Slide 5: Retrieval
    {
      title: "ការរំលឹកចំណេះដឹងសកម្ម",
      content: `
        <div class="slide-header">
          <span class="section-tag">ការរំលឹកសកម្ម</span>
          <h2>ផ្ទៀងផ្ទាត់ចំណេះដឹងមូលដ្ឋាន៖ ចាក់សោចំណេះដឹងចាស់</h2>
          <p class="subtitle">ចុចលើកាតនីមួយៗ ដើម្បីផ្ទៀងផ្ទាត់គោលគំនិតគ្រឹះដែលបានរៀននៅថ្ងៃទី ៤, ៩ និង ១០។</p>
        </div>

        <div class="retrieval-deck">
          <div class="retrieval-card" id="ret-card-1">
            <div class="retrieval-q-badge">ពីថ្ងៃទី ១០៖ តារាង vs អថេរ</div>
            <div class="card-prompt">
              <h3>"ហេតុអ្វីបានជាប្រព័ន្ធស្នើសុំការងារក្នុងរោងចក្រ មិនអាចផ្ទុកសំណើក្នុងអថេរធម្មតាបាន?"</h3>
            </div>
            <button class="fluent-btn-secondary ret-reveal-btn" data-target="ret-ans-1">បង្ហាញចម្លើយ</button>
            <div class="retrieval-answer" id="ret-ans-1">
              <strong>គោលគំនិតត្រឹមត្រូវ៖</strong> អថេរ (Variable) ប្រៀបដូចជាប្រអប់ទោលមួយដែលអាចផ្ទុកតម្លៃបានតែម្តងមួយគត់។ ពេលបុគ្គលិកទីពីរចុចផ្ញើសំណើ វានឹងលុបជាន់ពីលើសំណើរបស់បុគ្គលិកទីមួយភ្លាម! យើងត្រូវការ <strong>តារាង (Table)</strong> ដើម្បីផ្ទុក <strong>កំណត់ត្រា (Records)</strong> រាប់រយឯករាជ្យពីគ្នា។
            </div>
          </div>

          <div class="retrieval-card" id="ret-card-2">
            <div class="retrieval-q-badge">ពីថ្ងៃទី ៩៖ តួនាទីនៃស្ថានភាព (Status)</div>
            <div class="card-prompt">
              <h3>"តើ 'ស្ថានភាព' (Status) ក្នុងលំហូរការងារជាអ្វី ហើយហេតុអ្វីបានជា Power Fx ត្រូវការវា?"</h3>
            </div>
            <button class="fluent-btn-secondary ret-reveal-btn" data-target="ret-ans-2">បង្ហាញចម្លើយ</button>
            <div class="retrieval-answer" id="ret-ans-2">
              <strong>គោលគំនិតត្រឹមត្រូវ៖</strong> ស្ថានភាព មិនមែនគ្រាន់តែជាពាក្យតុបតែងនោះទេ; វាជា <strong>ប៉ូលីសចរាចរណ៍ ឬកុងតាក់</strong> នៃកម្មវិធី។ Power Fx ពិនិត្យមើលស្ថានភាព (ឧ. <code>Status = "Submitted"</code>) ដើម្បីសម្រេចថា តើប៊ូតុងណាត្រូវបង្ហាញ, អ្នកណាជាម្ចាស់ការងារ និងផ្ទាំងអេក្រង់ត្រូវចាក់សោឬកែប្រែបាន។
            </div>
          </div>

          <div class="retrieval-card" id="ret-card-3">
            <div class="retrieval-q-badge">ពីថ្ងៃទី ៤៖ ប្រភេទគំរូទិន្នន័យក្នុងលក្ខខណ្ឌ</div>
            <div class="card-prompt">
              <h3>"បើរក្សាទុកតម្លៃជួសជុលជាអក្សរ '$500' តើមានអ្វីកើតឡើងពេល Power Fx គណនាលក្ខខណ្ឌ?"</h3>
            </div>
            <button class="fluent-btn-secondary ret-reveal-btn" data-target="ret-ans-3">បង្ហាញចម្លើយ</button>
            <div class="retrieval-answer" id="ret-ans-3">
              <strong>គោលគំនិតត្រឹមត្រូវ៖</strong> Power Fx នឹងខូច ឬបង្ហាញកំហុស Type Mismatch! កុំព្យូទ័រមិនអាចប្រៀបធៀបគណិតវិទ្យា (<code>&gt;</code>, <code>&lt;</code>) លើតួអក្សរដែលមាននិមិត្តសញ្ញាបានទេ។ លេខ និងរូបិយប័ណ្ណត្រូវតែរក្សាទុកជាប្រភេទ <strong>Number / Currency</strong> ដាច់ខាត!
            </div>
          </div>
        </div>
      `
    },

    // Slide 6: Crisis
    {
      title: "ករណីសិក្សារោងចក្រ៖ Apex Plastics",
      content: `
        <div class="slide-header">
          <span class="section-tag section-tag-danger">ករណីសិក្សាវិបត្តិជាក់ស្តែងក្នុងរោងចក្រ</span>
          <h2>មហន្តរាយ $42,000 ដោយសារ "តារាង Excel ៤៧ ជួរឈរ" &amp; ការលេចធ្លាយជាតិគីមី</h2>
          <p class="subtitle">ផលវិបាកធ្ងន់ធ្ងរដែលកើតឡើង នៅពេលអ្នករចនាទិន្នន័យតាមការស្មានជាជាងផ្អែកលើដំណើរការជាក់ស្តែង។</p>
        </div>

        <div class="crisis-story-grid">
          <div class="crisis-timeline-card">
            <div class="crisis-event">
              <span class="event-time">ខែទី ១</span>
              <div class="event-desc">
                <strong>ការសាងសង់ខ្វះជំនាញ៖</strong> ប្រធានរោងចក្រឱ្យអ្នកអភិវឌ្ឍន៍ថ្មីថ្មោងម្នាក់បង្កើតកម្មវិធី។ គាត់ដើរសួរគ្រប់គ្នា៖ <em>"តើបងចង់បានជួរឈរអ្វីខ្លះ?"</em> គាត់ក៏បង្កើតតារាង Excel មួយមាន <strong>៤៧ ជួរឈររញ៉េរញ៉ៃ</strong> ហើយសុទ្ធតែជាអក្សរសេរតាមចិត្ត (Free Text)!
              </div>
            </div>
            <div class="crisis-event">
              <span class="event-time">14:10 PM</span>
              <div class="event-desc">
                <strong>ការលេចធ្លាយសារធាតុគីមី៖</strong> នៅខ្សែសង្វាក់ផលិតកម្មលេខ ៤ បូមជាតិគីមីរលាយបានបែកហ្គាសគីមី។ កម្មការិនី សុធា វាយបញ្ចូល៖ <code>ម៉ាស៊ីន៖ "Line 4 Main Pump"</code>, <code>អាទិភាព៖ "EMERGENCY ASAP!!!"</code>, <code>តម្លៃ៖ "high"</code>។
              </div>
            </div>
            <div class="crisis-event">
              <span class="event-time">14:15 PM</span>
              <div class="event-desc">
                <strong>កៅអីការិយាល័យរលុង៖</strong> នៅការិយាល័យខាងមុខ បុគ្គលិកម្នាក់ទៀតវាយបញ្ចូល៖ <code>ម៉ាស៊ីន៖ "Desk Chair"</code>, <code>អាទិភាព៖ "urgent"</code>។
              </div>
            </div>
            <div class="crisis-event fatal">
              <span class="event-time">14:30 PM</span>
              <div class="event-desc">
                <strong>ភាពវឹកវរនៃទិន្នន័យ៖</strong> ប្រធានជាងបើកមើលបញ្ជី។ ការតម្រៀបតាមអក្ខរក្រមបានដាក់ពាក្យ <code>"urgent"</code> <em>នៅពីមុខ</em> ពាក្យ <code>"EMERGENCY ASAP!!!"</code>។ ដោយសារគ្មានលេខកូដសម្គាល់ស្វ័យប្រវត្តិ សំណើទាំងពីរមានលេខ "#12" ដូចគ្នា។ ជាងក៏រត់ទៅជួសជុលកៅអីការិយាល័យមុន!
              </div>
            </div>
            <div class="crisis-event fatal">
              <span class="event-time">18:00 PM</span>
              <div class="event-desc">
                <strong>មហន្តរាយ៖</strong> ម៉ាស៊ីនបូមដែលគ្មានអ្នកអើពើបានផ្ទុះធ្លាយ។ កម្មករ ២០០ នាក់ត្រូវជម្លៀសជាបន្ទាន់។ ការផាកពិន័យបរិស្ថាន និងការខាតបង់សរុប៖ <strong>$42,000!</strong>
              </div>
            </div>
          </div>

          <div class="crisis-lesson-card">
            <div class="loss-badge">ខាតបង់ $42,000</div>
            <h3>ឫសគល់នៃកំហុសស្ថាបត្យកម្មទិន្នន័យ</h3>
            <p>អ្នកអភិវឌ្ឍន៍គិតថា៖ <em>"ការមានជួរឈរច្រើន និងការអនុញ្ញាតឱ្យវាយអក្សរតាមចិត្ត ផ្តល់សេរីភាពដល់អ្នកប្រើប្រាស់។"</em></p>
            <div class="flaw-box">
              <span class="flaw-icon">⚠️</span>
              <span>អត្ថបទសេរីគ្មានការគ្រប់គ្រង និងជួរឈរដែលគ្មានទិសដៅបង្កើតបានជា <strong>ទីលានសំរាមឌីជីថល</strong> ដែលធ្វើឱ្យការតម្រៀប, ការស្វែងរក និងប្រព័ន្ធស្វ័យប្រវត្តិមិនអាចដំណើរការបាន!</span>
            </div>
            <div class="solution-preview">
              <strong>ដំណោះស្រាយស្ថាបត្យកម្មត្រឹមត្រូវ៖</strong>
              <p>កុំសួរថា <em>"តើអ្នកចង់បានជួរឈរអ្វីខ្លះ?"</em> ត្រូវសួរថា៖ <em>"តើត្រូវឆ្លើយសំណួរអ្វីខ្លះនៅជំហាននេះ?"</em> គ្រប់ជួរឈរត្រូវតែមានប្រភេទ Data Type ជាក់លាក់, តួនាទី Status ច្បាស់លាស់ និងលេខសម្គាល់ ID តែមួយគត់មិនអាចកែប្រែបាន។</p>
            </div>
          </div>
        </div>
      `
    },

    // Slide 7: Plain Concept
    {
      title: "គោលគំនិតជាភាសាសាមញ្ញ",
      content: `
        <div class="slide-header">
          <span class="section-tag">ផ្នត់គំនិតជាភាសាសាមញ្ញ</span>
          <h2>"សំណួរមុនជួរឈរ"៖ ក្រដាសពិនិត្យជំងឺរបស់វេជ្ជបណ្ឌិត</h2>
          <p class="subtitle">មុននឹងប៉ះពាល់កម្មវិធី ឬមូលដ្ឋានទិន្នន័យ ចូរយល់ដឹងពីរបៀបដែលប្រព័ន្ធក្រដាសពិនិត្យសុខភាពដំណើរការ។</p>
        </div>

        <div class="analogy-cards-trio">
          <div class="concept-trio-card">
            <div class="trio-badge">សៀវភៅទទេ (មិនល្អ)</div>
            <div class="trio-icon">📓</div>
            <h3>តារាងរញ៉េរញ៉ៃ</h3>
            <p class="trio-def">គ្រូពេទ្យកត់ត្រាអ្វីៗតាមចិត្តលើក្រដាសសៀវភៅទទេគ្មានទម្រង់។</p>
            <ul class="trio-points">
              <li>គ្រូពេទ្យម្នាក់កត់សម្ពាធឈាម; គ្រូពេទ្យម្នាក់ទៀតភ្លេចកត់។</li>
              <li>អាលែកហ្ស៊ីថ្នាំកប់បាត់នៅក្នុងកថាខណ្ឌវែងអន្លាយ។</li>
              <li>ពេលមានអាសន្ន គិលានុបដ្ឋាយិកាមើលមិនឃើញប្រភេទឈាមឡើយ។</li>
            </ul>
          </div>

          <div class="concept-trio-card active-trio">
            <div class="trio-badge highlight">ក្រដាសពិនិត្យជំងឺ (វិជ្ជាជីវៈ)</div>
            <div class="trio-icon">📋</div>
            <h3>ជួរឈរដែលផ្អែកលើដំណើរការ</h3>
            <p class="trio-def">គ្រប់សំណួរត្រូវគ្នានឹងដំណាក់កាលវេជ្ជសាស្ត្រជាក់លាក់នីមួយៗ។</p>
            <ul class="trio-points">
              <li><strong>គិលានុបដ្ឋាយិកាទទួលអ្នកជំងឺ៖</strong> កម្ដៅ (Number), សម្ពាធឈាម (Number)។</li>
              <li><strong>វេជ្ជបណ្ឌិត៖</strong> រោគវិនិច្ឆ័យ (Text), ត្រូវវះកាត់បន្ទាន់ (Yes/No)។</li>
              <li><strong>ឱសថស្ថាន៖</strong> ឈ្មោះថ្នាំ (Choice), ចំនួនដូស (Number)។</li>
            </ul>
          </div>

          <div class="concept-trio-card">
            <div class="trio-badge">ច្បាប់មាសស្នូល</div>
            <div class="trio-icon">🔑</div>
            <h3>ច្បាប់មាសនៃស្ថាបត្យកម្មទិន្នន័យ</h3>
            <p class="trio-def">ជួរឈរទិន្នន័យមានវត្តមានដើម្បីគាំទ្រដល់ការសម្រេចចិត្តប៉ុណ្ណោះ។</p>
            <ul class="trio-points">
              <li>បើទិន្នន័យនោះមិនជួយក្នុងការសម្រេចចិត្ត ឬសកម្មភាពទេ <strong>កុំរក្សាទុកវាឱ្យសោះ</strong>។</li>
              <li>គ្រប់ជួរឈរទាមទារការថែទាំ, ទីធ្លាអេក្រង់ និងពេលវេលារបស់អ្នកប្រើ។</li>
              <li>ជួរឈរតិចតែមានវិន័យ ជួយឱ្យកម្មវិធីដំណើរការលឿន និងគ្មានកំហុស។</li>
            </ul>
          </div>
        </div>
      `
    },

    // Slide 8: Pipeline
    {
      title: "បំពង់បង្ហូរ ៥ ជំហានពីដំណើរការទៅទិន្នន័យ",
      content: `
        <div class="slide-header">
          <span class="section-tag">វិធីសាស្ត្រវិស្វកម្មជាប្រព័ន្ធ</span>
          <h2>បំពង់បង្ហូរ ៥ ជំហានពីដំណើរការទៅកាន់ទិន្នន័យ</h2>
          <p class="subtitle">របៀបដែលអ្នកអភិវឌ្ឍន៍កម្រិតអាជីពទាញយកទម្រង់តារាងទិន្នន័យទាំងមូល ដោយផ្ទាល់ចេញពីជំហានការងាររបស់មនុស្ស។</p>
        </div>

        <div class="pipeline-container">
          <div class="pipeline-step">
            <div class="pipe-num">១</div>
            <h4>កំណត់ជំហានការងារ</h4>
            <p>ពិនិត្យមើលប្លង់លំហូរការងារពីថ្ងៃទី ៩ (ឧ. ជំហាន ១៖ កម្មកររាយការណ៍ឧប្បត្តិហេតុ)។</p>
            <span class="pipe-tag">ប្លង់លំហូរការងារ</span>
          </div>

          <div class="pipeline-arrow">➔</div>

          <div class="pipeline-step">
            <div class="pipe-num">២</div>
            <h4>សួរសំណួរក្នុងដំណើរការ</h4>
            <p>"តើម៉ាស៊ីនមួយណាខូច? តើមានសំឡេងរំខាន ឬរោគសញ្ញាអ្វីកើតឡើង?"</p>
            <span class="pipe-tag">ភាសាសាមញ្ញ</span>
          </div>

          <div class="pipeline-arrow">➔</div>

          <div class="pipeline-step">
            <div class="pipe-num">៣</div>
            <h4>ដាក់ឈ្មោះជួរឈរ</h4>
            <p>បង្កើតឈ្មោះជួរឈរច្បាស់លាស់បែប PascalCase៖ <code>MachineID</code>, <code>IssueDescription</code>។</p>
            <span class="pipe-tag">ឈ្មោះជួរឈរ</span>
          </div>

          <div class="pipeline-arrow">➔</div>

          <div class="pipeline-step">
            <div class="pipe-num">៤</div>
            <h4>កំណត់ប្រភេទ Data Type</h4>
            <p>កំណត់ទម្រង់ចម្លើយ៖ Choice សម្រាប់ឈ្មោះម៉ាស៊ីន, Text សម្រាប់ការពន្យល់រោគសញ្ញា។</p>
            <span class="pipe-tag">ប្រភេទគំរូទិន្នន័យ</span>
          </div>

          <div class="pipeline-arrow">➔</div>

          <div class="pipeline-step highlight-pipe">
            <div class="pipe-num">៥</div>
            <h4>កំណត់ក្បួនផ្ទៀងផ្ទាត់</h4>
            <p>តើត្រូវតែបំពេញដាច់ខាតឬទេ? បើទទេ ត្រូវចាក់សោប៊ូតុង Submit តាមកូដ Power Fx។</p>
            <span class="pipe-tag">ក្បួន Power Fx</span>
          </div>
        </div>

        <div class="pipeline-summary-box">
          <span class="box-icon">💡</span>
          <span class="box-text"><strong>គោលការណ៍សំខាន់៖</strong> អ្នកមិនត្រូវបង្កើតជួរឈរតាមការស្រមើស្រមៃឡើយ។ អ្នកគ្រាន់តែបកប្រែសំណួរការងារជាក់ស្តែង ឱ្យទៅជាទម្រង់ទិន្នន័យមានសណ្តាប់ធ្នាប់ប៉ុណ្ណោះ!</span>
        </div>
      `
    },

    // Slide 9: Data Types
    {
      title: "ប្រភេទគំរូទិន្នន័យស្នូលទាំង ៧",
      content: `
        <div class="slide-header">
          <span class="section-tag">ការជ្រើសរើសប្រភេទគំរូទិន្នន័យ</span>
          <h2>ការជ្រើសរើស Data Type ត្រឹមត្រូវ៖ ធាតុផ្សំស្នូលទាំង ៧</h2>
          <p class="subtitle">ប្រភេទគំរូទិន្នន័យកំណត់រូបរាងនៃចម្លើយ និងក្បួនគណនាតាម Power Fx ដែលត្រូវបានអនុញ្ញាតតាមច្បាប់កុំព្យូទ័រ។</p>
        </div>

        <div class="datatypes-grid">
          <div class="dt-card">
            <div class="dt-badge dt-text">Text</div>
            <h4>អត្ថបទខ្លី (Single Line of Text)</h4>
            <p class="dt-desc">អក្សរខ្លីៗក្រោម ២៥៥ តួ។ ឈ្មោះ, ចំណងជើងសង្ខេប, លេខស៊េរីសម្ភារៈ។</p>
            <div class="dt-example">ឧទាហរណ៍៖ <code>"បែកហ្គាសប្រេងធារាសាស្ត្រ"</code></div>
          </div>

          <div class="dt-card">
            <div class="dt-badge dt-multitext">Multi-Text</div>
            <h4>អត្ថបទវែង (Multiple Lines of Text)</h4>
            <p class="dt-desc">ការពន្យល់លម្អិត, កំណត់ត្រាជួសជុលរបស់ជាង, ប្រវត្តិដោះស្រាយបញ្ហា។</p>
            <div class="dt-example">ឧទាហរណ៍៖ <code>"បានរុះរើដៃយន្ត ដោះដូរប៊ូសទ្រនាប់ដែលសឹក..."</code></div>
          </div>

          <div class="dt-card">
            <div class="dt-badge dt-num">Number / Currency</div>
            <h4>លេខគត់ / លេខទសភាគ / រូបិយប័ណ្ណ</h4>
            <p class="dt-desc">ចំនួន, ម៉ោងធ្វើការ, តម្លៃ។ អនុញ្ញាតឱ្យធ្វើការគណនា (<code>+</code>, <code>Sum</code>, <code>&gt;</code>)។</p>
            <div class="dt-example">ឧទាហរណ៍៖ <code>450.00</code>, <code>3.5</code> ម៉ោង</div>
          </div>

          <div class="dt-card">
            <div class="dt-badge dt-date">Date &amp; Time</div>
            <h4>កាលបរិច្ឆេទ និងពេលវេលា</h4>
            <p class="dt-desc">ត្រាពេលវេលា, ថ្ងៃបញ្ជូនសំណើ, កំណត់ត្រាសវនកម្ម។ អាចគណនារយៈពេល (<code>DateDiff</code>)។</p>
            <div class="dt-example">ឧទាហរណ៍៖ <code>2026-10-30 14:15</code></div>
          </div>

          <div class="dt-card">
            <div class="dt-badge dt-choice">Choice (OptionSet)</div>
            <h4>ជម្រើសទម្លាក់ចុះ (Choice / Dropdown)</h4>
            <p class="dt-desc">បញ្ជីជម្រើសកំណត់ជាមុនយ៉ាងតឹងរ៉ឹង។ ការពារកំហុសអក្ខរាវិរុទ្ធ និងធានាការតម្រៀបស្មើគ្នា។</p>
            <div class="dt-example">ឧទាហរណ៍៖ <code>["ទាប", "មធ្យម", "ខ្ពស់", "បន្ទាន់ខ្លាំង"]</code></div>
          </div>

          <div class="dt-card">
            <div class="dt-badge dt-bool">Yes / No</div>
            <h4>ប៊ូលីន (ពីរស្ថានភាព True / False)</h4>
            <p class="dt-desc">ស្ថានភាពពិតឬមិនពិត។ ប្រើផ្ទាល់សម្រាប់លក្ខខណ្ឌ IF និងការចាក់សោសុវត្ថិភាព។</p>
            <div class="dt-example">ឧទាហរណ៍៖ <code>IsApproved = True</code></div>
          </div>
        </div>
      `
    },

    // Slide 10: Status
    {
      title: "ជួរឈរស្ថានភាពមេ (Master Status)",
      content: `
        <div class="slide-header">
          <span class="section-tag">ស្ថាបត្យកម្មម៉ាស៊ីនគ្រប់គ្រងស្ថានភាព</span>
          <h2>ជួរឈរស្ថានភាពមេ (Status)៖ ម៉ាស៊ីនបញ្ជានៃកម្មវិធី</h2>
          <p class="subtitle">ស្ថានភាពមិនមែនគ្រាន់តែជាពណ៌ស្លាកនោះទេ; វាជាកុងតាក់មេដែលបញ្ជាសិទ្ធិ, ភាពមើលឃើញ និងផ្ទាំងអេក្រង់។</p>
        </div>

        <div class="status-architecture-layout">
          <div class="status-flow-diagram">
            <div class="status-node node-draft">
              <span class="node-num">១</span>
              <h4>Draft (ព្រាង)</h4>
              <p>កម្មករកំពុងកែសម្រួល</p>
              <span class="node-rule">DisplayMode: Edit</span>
            </div>
            <div class="status-link">➔</div>

            <div class="status-node node-submitted">
              <span class="node-num">២</span>
              <h4>Submitted (បានផ្ញើ)</h4>
              <p>រង់ចាំប្រធានពិនិត្យ</p>
              <span class="node-rule">btnApprove.Visible = True</span>
            </div>
            <div class="status-link">➔</div>

            <div class="status-node node-progress">
              <span class="node-num">៣</span>
              <h4>In Progress (កំពុងជួសជុល)</h4>
              <p>ជាងកំពុងធ្វើការ</p>
              <span class="node-rule">អ្នកទទួលបន្ទុក៖ Dara</span>
            </div>
            <div class="status-link">➔</div>

            <div class="status-node node-closed">
              <span class="node-num">៤</span>
              <h4>Closed (បានបិទបញ្ចប់)</h4>
              <p>ចាក់សោទុកជាឯកសារ</p>
              <span class="node-rule">DisplayMode: View</span>
            </div>
          </div>

          <div class="status-powerfx-box">
            <div class="box-title">របៀបដែល Power Fx ប្រើប្រាស់ជួរឈរស្ថានភាព (Status)៖</div>
            <div class="code-snippet">
              <span class="code-comment">// ១. ចាក់សោអេក្រង់មិនឱ្យកែ នៅពេលសំណើត្រូវបានបិទបញ្ចប់</span><br>
              <code>frmRequest.DisplayMode = If(Status = "Closed", DisplayMode.View, DisplayMode.Edit)</code><br><br>
              <span class="code-comment">// ២. បង្ហាញប៊ូតុង Approve តែចំពោះ Supervisor នៅពេលសំណើស្ថិតក្នុងស្ថានភាព Submitted</span><br>
              <code>btnApprove.Visible = (UserRole = "Supervisor") &amp;&amp; (Status = "Submitted")</code>
            </div>
            <div class="box-note">
              <strong>ក្បួនសំខាន់បំផុត៖</strong> ដោយសារតែ Status បញ្ជាគ្រប់តក្កវិជ្ជានៃកម្មវិធី វាមិនត្រូវជាប្រអប់វាយអក្សរសេរតាមចិត្តឡើយ។ វាត្រូវតែជាជួរឈរ Choice កំណត់ជាមុនជានិច្ច!
            </div>
          </div>
        </div>
      `
    },

    // Slide 11: Unique ID
    {
      title: "រចនាសម្ព័ន្ធនៃលេខកូដសម្គាល់ Unique ID",
      content: `
        <div class="slide-header">
          <span class="section-tag">ស្តង់ដារសុក្រឹតភាពទិន្នន័យ</span>
          <h2>រចនាសម្ព័ន្ធនៃ Unique ID (Key Structure)៖ ស្លាកស្នាមកំណើតមិនប្រែប្រួល</h2>
          <p class="subtitle">មូលហេតុដែលគ្រប់កំណត់ត្រាសហគ្រាស ត្រូវតែមានលេខកូដសម្គាល់បង្កើតដោយប្រព័ន្ធ ដែលមិនអាចកែប្រែបានជារៀងរហូត។</p>
        </div>

        <div class="id-anatomy-grid">
          <div class="id-card id-bad">
            <div class="id-card-header">
              <span class="id-badge-danger">វិធីមិនល្អ៖ វាយបញ្ចូលដោយដៃ</span>
              <h3>"Ticket #1", "Ticket #2"</h3>
            </div>
            <ul class="id-reasons-list">
              <li>❌ កម្មករពីរនាក់បង្កើតសំបុត្រលេខ #12 ក្នុងពេលតែមួយ។</li>
              <li>❌ កម្មករវាយច្រឡំអក្សរ "Ticket 14B" ជំនួសឱ្យ "Ticket 14"។</li>
              <li>❌ អ្នកប្រើប្រាស់លួចកែកូដលេខសម្គាល់ដើម្បីបិទបាំងកំហុស។</li>
              <li>❌ ផ្នែកគណនេយ្យមិនអាចភ្ជាប់វិក្កយបត្រទៅនឹងការងារជួសជុលបាន។</li>
            </ul>
            <div class="id-verdict">លទ្ធផល៖ ជាន់លេខគ្នា, បាត់សំណើ, ធ្លាក់សវនកម្ម។</div>
          </div>

          <div class="id-card id-good">
            <div class="id-card-header">
              <span class="id-badge-success">ស្តង់ដារសហគ្រាស៖ Auto-Number</span>
              <h3>REQ-2026-0042</h3>
            </div>
            <ul class="id-reasons-list">
              <li>✓ <strong>អក្សរដើម (Prefix)៖</strong> បង្ហាញប្រភេទការងារ (<code>REQ</code> = សំណើជួសជុល)។</li>
              <li>✓ <strong>ឆ្នាំ (Year)៖</strong> ការពារកុំឱ្យលើសលេខរាប់តាមទសវត្សរ៍ (<code>2026</code>)។</li>
              <li>✓ <strong>លេខរៀង (Digits)៖</strong> លេខរាប់បន្តបន្ទាប់ធានាភាពតែមួយគត់ (<code>0042</code>)។</li>
              <li>✓ <strong>មិនអាចកែប្រែបាន (Immutable)៖</strong> ប្រព័ន្ធបង្កើតដោយស្វ័យប្រវត្តិតាំងពីកើត។</li>
            </ul>
            <div class="id-verdict">លទ្ធផល៖ តាមដានបាន ១០០%, គ្មានការជាន់លេខ, ស្របតាមស្តង់ដារ ISO។</div>
          </div>
        </div>
      `
    },

    // Slide 12: Workbench Widget
    {
      title: "ក្តារពិសោធន៍ស្ថាបត្យករទិន្នន័យ (Widget 1)",
      content: `
        <div class="slide-header">
          <span class="section-tag section-tag-accent">ក្តារពិសោធន៍អន្តរកម្ម</span>
          <h2>Widget 1៖ ស្ថាបត្យករទិន្នន័យចេញពីដំណើរការ &amp; ឧបករណ៍ពិនិត្យ Data Type</h2>
          <p class="subtitle">ជ្រើសរើសសំណួរក្នុងដំណើរការ ដើម្បីកំណត់ឈ្មោះជួរឈរ, ប្រភេទគំរូទិន្នន័យ និងបង្កើតកូដ Power Fx ដោយស្វ័យប្រវត្តិ។</p>
        </div>

        <div class="schema-workbench-layout">
          <!-- Left Panel: Process Question Picker & Field Builder -->
          <div class="workbench-form-panel">
            <div class="panel-header">
              <span class="panel-icon">⚙️</span>
              <h3>ជំហាន ១ &amp; ២៖ បញ្ចូលទិន្នន័យដំណើរការ</h3>
            </div>

            <div class="form-group">
              <label for="wb-process-step">ជ្រើសរើសជំហានដំណើរការការងារ៖</label>
              <select id="wb-process-step" class="fluent-select">
                <option value="1">ជំហាន ១៖ រាយការណ៍ឧប្បត្តិហេតុ (កម្មករ)</option>
                <option value="2">ជំហាន ២៖ ការអនុម័តរបស់ប្រធាន (Supervisor)</option>
                <option value="3">ជំហាន ៣៖ ការអនុវត្តជួសជុល (ជាងបច្ចេកទេស)</option>
                <option value="4">ជំហាន ៤៖ ការពិនិត្យគុណភាព &amp; សវនកម្ម (QA)</option>
              </select>
            </div>

            <div class="form-group">
              <label for="wb-process-question">សំណួរដែលដំណើរការត្រូវការចម្លើយ៖</label>
              <select id="wb-process-question" class="fluent-select">
                <!-- Populated dynamically by script.js -->
              </select>
            </div>

            <div class="form-row-dual">
              <div class="form-group">
                <label for="wb-field-name">ឈ្មោះជួរឈរ (PascalCase)៖</label>
                <input type="text" id="wb-field-name" class="fluent-input" readonly>
              </div>
              <div class="form-group">
                <label for="wb-data-type">ប្រភេទ Data Type ដែលណែនាំ៖</label>
                <input type="text" id="wb-data-type" class="fluent-input" readonly>
              </div>
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" id="wb-is-required" checked>
                <span><strong>ជួរឈរដែលត្រូវតែបំពេញដាច់ខាត (Required Field)</strong></span>
              </label>
            </div>
          </div>

          <!-- Right Panel: Architectural Schema Preview & Power Fx Code Generator -->
          <div class="workbench-output-panel">
            <div class="panel-header">
              <span class="panel-icon">💻</span>
              <h3>លទ្ធផលស្ថាបត្យកម្មដែលបានបង្កើត</h3>
            </div>

            <div class="schema-inspector-card">
              <div class="spec-row">
                <span class="spec-label">តារាងផ្ទុកទិន្នន័យ៖</span>
                <span class="spec-val" id="wb-spec-table">MaintenanceRequests</span>
              </div>
              <div class="spec-row">
                <span class="spec-label">ប្រភេទក្នុង Dataverse / SharePoint៖</span>
                <span class="spec-val" id="wb-spec-type">Choice (OptionSet)</span>
              </div>
              <div class="spec-row">
                <span class="spec-label">តួនាទីក្នុងដំណើរការ៖</span>
                <span class="spec-val" id="wb-spec-role">ការពារកុំឱ្យជ្រើសរើសខុសម៉ាស៊ីនដោយសារវាយខុស</span>
              </div>
            </div>

            <div class="powerfx-preview-box">
              <span class="code-title">កូដ Power Fx សម្រាប់ត្រួតពិនិត្យសុពលភាព៖</span>
              <pre><code id="wb-powerfx-code">// បង្កើតឡើងដោយស្វ័យប្រវត្តិតាមការជ្រើសរើសរបស់អ្នក</code></pre>
            </div>
          </div>
        </div>
      `
    },

    // Slide 13: Schema Matrix
    {
      title: "តារាងទិន្នន័យពេញលេញរបស់ Apex Plastics",
      content: `
        <div class="slide-header">
          <span class="section-tag">ប្លង់មេគម្រោងផលិតកម្មជាក់ស្តែង</span>
          <h2>តារាងទិន្នន័យជួសជុលពេញលេញរបស់ Apex Plastics</h2>
          <p class="subtitle">តារាងមេមាន ៨ ជួរឈរដ៏មានរបៀបរៀបរយ ដែលទាញចេញពីដំណាក់កាលការងារទាំង ៤ យ៉ាងច្បាស់លាស់។</p>
        </div>

        <div class="schema-table-container">
          <table class="capstone-table">
            <thead>
              <tr>
                <th>ឈ្មោះជួរឈរ (Field)</th>
                <th>ប្រភេទ Data Type</th>
                <th>ត្រូវតែបំពេញ?</th>
                <th>ជំហានការងារ</th>
                <th>គោលបំណងអាជីវកម្ម / ឥទ្ធិពល Power Fx</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>RequestID</code></td>
                <td>Auto-Number Text</td>
                <td><span class="badge badge-yes">បាទ/ចាស (ប្រព័ន្ធ)</span></td>
                <td>គ្រប់ដំណាក់កាល</td>
                <td>លេខសម្គាល់អចិន្ត្រៃយ៍មិនអាចកែប្រែបាន (ឧ. <code>REQ-2026-0042</code>)</td>
              </tr>
              <tr>
                <td><code>MachineID</code></td>
                <td>Choice (Asset List)</td>
                <td><span class="badge badge-yes">បាទ/ចាស</span></td>
                <td>ជំហាន ១៖ រាយការណ៍</td>
                <td>បង្ខំឱ្យកម្មករជ្រើសតែម៉ាស៊ីនណាដែលមានក្នុងបញ្ជីទ្រព្យសម្បត្តិរោងចក្រ</td>
              </tr>
              <tr>
                <td><code>IssueDescription</code></td>
                <td>Multiple Lines Text</td>
                <td><span class="badge badge-yes">បាទ/ចាស</span></td>
                <td>ជំហាន ១៖ រាយការណ៍</td>
                <td>រៀបរាប់រោគសញ្ញាលម្អិត; ប៊ូតុងផ្ញើនឹងចាក់សោរបើទុកប្រអប់នេះនៅទទេ</td>
              </tr>
              <tr>
                <td><code>UrgencyLevel</code></td>
                <td>Choice (៤ តម្លៃ)</td>
                <td><span class="badge badge-yes">បាទ/ចាស</span></td>
                <td>ជំហាន ១៖ រាយការណ៍</td>
                <td>ជួយតម្រៀបបញ្ជីការងារបន្ទាន់ និងផ្ញើសារជូនដំណឹងអាសន្នស្វ័យប្រវត្តិ</td>
              </tr>
              <tr>
                <td><code>EstimatedCost</code></td>
                <td>Currency / Number</td>
                <td><span class="badge badge-yes">បាទ/ចាស</span></td>
                <td>ជំហាន ២៖ ពិនិត្យ</td>
                <td>បញ្ជាច្រកហិរញ្ញវត្ថុ៖ <code>If(Cost &gt; 1000, Escalate, Approve)</code></td>
              </tr>
              <tr>
                <td><code>IsApproved</code></td>
                <td>Yes / No (Boolean)</td>
                <td><span class="badge badge-yes">បាទ/ចាស</span></td>
                <td>ជំហាន ២៖ ពិនិត្យ</td>
                <td>លក្ខខណ្ឌប៊ូលីនសម្រេចបញ្ជូនការងារទៅកាន់រោងជាងជួសជុល</td>
              </tr>
              <tr>
                <td><code>LaborHours</code></td>
                <td>Decimal Number</td>
                <td><span class="badge badge-no">មិនតម្រូវ</span></td>
                <td>ជំហាន ៣៖ ជួសជុល</td>
                <td>កត់ត្រាដោយជាងពេលធ្វើរួច សម្រាប់គណនាប្រាក់ខែ និងថ្លៃដើម</td>
              </tr>
              <tr>
                <td><code>Status</code></td>
                <td>Choice (State Machine)</td>
                <td><span class="badge badge-yes">បាទ/ចាស</span></td>
                <td>គ្រប់ដំណាក់កាល</td>
                <td>ប៉ូលីសចរាចរណ៍មេ៖ <code>Draft ➔ Submitted ➔ In Progress ➔ Closed</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },

    // Slide 14: Data Type Failures
    {
      title: "កំហុសប្រភេទ Data Type៖ មានអ្វីកើតឡើង?",
      content: `
        <div class="slide-header">
          <span class="section-tag section-tag-danger">ការវិភាគលើមូលហេតុ និងផលប៉ះពាល់</span>
          <h2>តើមានអ្វីកើតឡើង នៅពេលអ្នកជ្រើសរើស Data Type ខុស?</h2>
          <p class="subtitle">កំហុសបច្ចេកទេសជាក់ស្តែងដែលកើតឡើងក្នុង Power Apps នៅពេលអ្នកអភិវឌ្ឍន៍ខ្ជិលច្រអូសជ្រើសរើសប្រភេទខុស។</p>
        </div>

        <div class="failure-analysis-grid">
          <div class="failure-card">
            <div class="fail-header">
              <span class="fail-badge">កំហុសទី ១៖ អន្ទាក់តម្រៀបតាមអក្ខរក្រម</span>
              <h4>អត្ថបទ Text vs លេខ Number ក្នុងការប្រៀបធៀប</h4>
            </div>
            <p>អ្នករក្សាទុក <code>RepairCost</code> ជា Text។ សំណើមួយតម្លៃ $120 ហើយសំណើមួយទៀតតម្លៃ $80។</p>
            <div class="fail-visual">
              <div class="fail-box-bad">
                <span>បើជា Text៖</span>
                <code>"120" &lt; "80" = True!</code>
                <small>(កុំព្យូទ័រប្រៀបធៀបតួ '1' ជាមួយ '8')</small>
              </div>
              <div class="fail-box-good">
                <span>បើជា Number៖</span>
                <code>120 &lt; 80 = False!</code>
                <small>(ការប្រៀបធៀបតាមគណិតវិទ្យាត្រឹមត្រូវ)</small>
              </div>
            </div>
            <div class="fail-impact">មហន្តរាយ៖ ការចំណាយខ្ពស់ជ្រុលបែរជារំលងការអនុម័តរបស់ប្រធាន!</div>
          </div>

          <div class="failure-card">
            <div class="fail-header">
              <span class="fail-badge">កំហុសទី ២៖ អន្ទាក់ទម្រង់កាលបរិច្ឆេទសេរី</span>
              <h4>អត្ថបទ Text vs កាលបរិច្ឆេទ Date/Time</h4>
            </div>
            <p>អ្នករក្សាទុក <code>IncidentDate</code> ជាអក្សរសេរតាមចិត្ត។ មនុស្សម្នាក់ៗសរសេរខុសៗគ្នា។</p>
            <div class="fail-visual">
              <div class="fail-box-bad">
                <span>បើជា Text៖</span>
                <code>"04/05/2026" vs "05/04/2026"</code>
                <small>(តើជាថ្ងៃ ៤ ខែឧសភា ឬថ្ងៃ ៥ ខែមេសា?)</small>
              </div>
              <div class="fail-box-good">
                <span>បើជា Date/Time៖</span>
                <code>DateDiff(Now(), IncidentDate, Hours)</code>
                <small>(គណនារយៈពេលខូចម៉ាស៊ីនបានសុក្រឹត)</small>
              </div>
            </div>
            <div class="fail-impact">មហន្តរាយ៖ មិនអាចគណនារយៈពេលដែលម៉ាស៊ីនគាំង ឬតាមដាន SLA បានឡើយ!</div>
          </div>
        </div>
      `
    },

    // Slide 15: Trainer Demo
    {
      title: "ការបង្ហាញផ្ទាល់ដោយគ្រូ",
      content: `
        <div class="slide-header">
          <span class="section-tag">ពិធីការនៃការបង្ហាញផ្ទាល់</span>
          <h2>ការបង្ហាញផ្ទាល់ដោយគ្រូ៖ ការរចនាតារាងទិន្នន័យជាក់ស្តែង</h2>
          <p class="subtitle">ទស្សនាគ្រូបង្វឹកទាញយកទម្រង់ទិន្នន័យ ៤ ជួរឈរយ៉ាងស្អាត ចេញពីតម្រូវការជួសជុលពិតប្រាកដរបស់អតិថិជន។</p>
        </div>

        <div class="demo-protocol-steps">
          <div class="proto-step">
            <span class="step-num">០១</span>
            <h4>ស្តាប់តម្រូវការរបស់មនុស្ស</h4>
            <p>ប្រធានផ្នែកនិយាយថា៖ <em>"ពេលខ្លះជាងជួសជុលម៉ាស៊ីនរួចហើយ ប៉ុន្តែភ្លេចកត់ត្រាថា តើម៉ាស៊ីនបានឆ្លងកាត់ការតេស្តសាកល្បងសុវត្ថិភាពឬនៅ។"</em></p>
          </div>

          <div class="proto-step">
            <span class="step-num">០២</span>
            <h4>បង្កើតជាសំណួរច្បាស់លាស់</h4>
            <p>សួរថា៖ <em>"តើម៉ាស៊ីននេះបានឆ្លងកាត់ការរត់តេស្តសាកល្បងសុវត្ថិភាព ១៥ នាទីក្រោយជួសជុលរួចរាល់ហើយឬនៅ?"</em></p>
          </div>

          <div class="proto-step">
            <span class="step-num">០៣</span>
            <h4>ជ្រើសរើសឈ្មោះ &amp; Data Type</h4>
            <p>ឈ្មោះជួរឈរ៖ <code>SafetyRunPassed</code><br>ប្រភេទ Data Type៖ <strong>Yes/No (Boolean)</strong></p>
          </div>

          <div class="proto-step">
            <span class="step-num">០៤</span>
            <h4>អនុវត្តការចាក់សោសុវត្ថិភាព</h4>
            <p>ក្បួន Power Fx៖ ការពារមិនឱ្យបិទសំណើ ដរាបណាមិនទាន់ជាប់តេស្តសុវត្ថិភាព៖<br><code>btnComplete.DisplayMode = If(SafetyRunPassed = True, DisplayMode.Edit, DisplayMode.Disabled)</code></p>
          </div>
        </div>
      `
    },

    // Slide 16: Guided Practice Audit
    {
      title: "ការអនុវត្តជាមួយគ្រូ៖ សវនកម្មតារាង",
      content: `
        <div class="slide-header">
          <span class="section-tag">ការអនុវត្តមានការណែនាំ</span>
          <h2>ស្វែងរកកំហុសឆ្គងធ្ងន់ធ្ងរ ៤ ចំណុចក្នុងតារាងអេតចាយឃ្លាំងនេះ</h2>
          <p class="subtitle">ពិនិត្យមើលតារាងទិន្នន័យដែលបង្កើតឡើងដោយអ្នកមិនបានឆ្លងកាត់ការបណ្តុះបណ្តាល។ តើអ្នកអាចរកឃើញអន្ទាក់ទាំង ៤ បានទេ?</p>
        </div>

        <div class="audit-grid">
          <div class="audit-schema-table">
            <table>
              <thead>
                <tr>
                  <th>ឈ្មោះជួរឈរ</th>
                  <th>ប្រភេទដែលស្នើឡើង</th>
                  <th>ត្រូវតែបំពេញ?</th>
                  <th>កំហុសដែលបង្កប់ខាងក្នុង</th>
                </tr>
              </thead>
              <tbody>
                <tr class="flaw-row">
                  <td><code>PartCost</code></td>
                  <td>Text</td>
                  <td>Yes</td>
                  <td>❌ កំហុស ១៖ មិនអាចបូកសរុបតម្លៃខាតបង់ដោយប្រើ <code>Sum()</code> បានទេ!</td>
                </tr>
                <tr class="flaw-row">
                  <td><code>ScrapReason</code></td>
                  <td>Single Line Text</td>
                  <td>No</td>
                  <td>❌ កំហុស ២៖ មនុស្សនឹងទុកវាចោលទទេ; មិនអាចវិភាគមូលហេតុខូចបាន!</td>
                </tr>
                <tr class="flaw-row">
                  <td><code>ApprovalStatus</code></td>
                  <td>Text</td>
                  <td>Yes</td>
                  <td>❌ កំហុស ៣៖ អត្ថបទសេរីនឹងធ្វើឱ្យកូដ <code>Status = "Approved"</code> ខូច!</td>
                </tr>
                <tr class="flaw-row">
                  <td><code>ItemNumber</code></td>
                  <td>Manual Text</td>
                  <td>No</td>
                  <td>❌ កំហុស ៤៖ ខ្វះលេខសម្គាល់ Auto-ID; នឹងកើតមានការជាន់លេខគ្នា!</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="audit-takeaway-card">
            <h3>ការកែតម្រូវត្រឹមត្រូវទាំង ៤ ចំណុច៖</h3>
            <ul class="correction-list">
              <li><strong>១. Currency / Number៖</strong> ប្តូរ <code>PartCost</code> ដើម្បីឱ្យ Power Apps អាចគណនាផលខាតបង់ហិរញ្ញវត្ថុបាន។</li>
              <li><strong>២. Required Choice៖</strong> ដាក់ <code>ScrapReason</code> ឱ្យត្រូវតែបំពេញជាដាច់ខាត ជាមួយជម្រើសកំណត់ជាមុន (ឧ. "ពុម្ពហៀរ", "ប្រេះស្រាំ")។</li>
              <li><strong>៣. Choice State Machine៖</strong> ចាក់សោ <code>ApprovalStatus</code> ទៅជាជម្រើសកំណត់ជាមុន ("Pending", "Approved", "Rejected")។</li>
              <li><strong>៤. Auto-Number ID៖</strong> បង្កើត <code>SCRAP-2026-0001</code> ដើម្បីកំណត់អត្តសញ្ញាណគ្រឿងបន្លាស់នីមួយៗឱ្យច្បាស់លាស់។</li>
            </ul>
          </div>
        </div>
      `
    },

    // Slide 17: Mini-Task
    {
      title: "លំហាត់អនុវត្តរហ័ស ៣ នាទី",
      content: `
        <div class="slide-header">
          <span class="section-tag">លំហាត់អនុវត្តរហ័ស ៣ នាទី</span>
          <h2>លំហាត់អនុវត្តផ្ទាល់ខ្លួនខ្នាតតូច (Mini-Task) ៖ បញ្ជីត្រួតពិនិត្យប្តូរប្រេងម៉ាស៊ីន</h2>
          <p class="subtitle">ក្នុងរយៈពេល ៣ នាទី ចូរបំប្លែងសំណួរការងារទាំងពីរនេះ ឱ្យទៅជាជួរឈរទិន្នន័យកម្រិតវិជ្ជាជីវៈ។</p>
        </div>

        <div class="mini-task-grid">
          <div class="task-card">
            <div class="task-num">សំណួរទី ១</div>
            <h3>"តើបានចាក់ប្រេងធារាសាស្ត្រសំយោគចំនួនប៉ុន្មានលីត្រចូលទៅក្នុងម៉ាស៊ីនចាក់ពុម្ពលេខ ៤?"</h3>
            <div class="task-form-box">
              <div class="task-item">
                <span class="task-q">ឈ្មោះជួរឈរ៖</span>
                <span class="task-ans"><code>OilLitersAdded</code></span>
              </div>
              <div class="task-item">
                <span class="task-q">ប្រភេទ Data Type៖</span>
                <span class="task-ans"><strong>Decimal Number (លេខទសភាគ)</strong></span>
              </div>
              <div class="task-item">
                <span class="task-q">ត្រូវតែបំពេញ?</span>
                <span class="task-ans">បាទ/ចាស (Yes)</span>
              </div>
              <div class="task-item">
                <span class="task-q">ហេតុអ្វី?</span>
                <span class="task-ans">ត្រូវការសម្រាប់កាត់ស្តុកប្រេង និងតាមដានតុល្យភាពសារធាតុរាវ។</span>
              </div>
            </div>
          </div>

          <div class="task-card">
            <div class="task-num">សំណួរទី ២</div>
            <h3>"តើអ្នកណាជាអ្នកពិនិត្យ និងចុះហត្ថលេខាទទួលស្គាល់លើការផ្លាស់ប្តូរតម្រងប្រេង?"</h3>
            <div class="task-form-box">
              <div class="task-item">
                <span class="task-q">ឈ្មោះជួរឈរ៖</span>
                <span class="task-ans"><code>InspectedBy</code></span>
              </div>
              <div class="task-item">
                <span class="task-q">ប្រភេទ Data Type៖</span>
                <span class="task-ans"><strong>Person / User (ឬ Choice)</strong></span>
              </div>
              <div class="task-item">
                <span class="task-q">ត្រូវតែបំពេញ?</span>
                <span class="task-ans">បាទ/ចាស (Yes)</span>
              </div>
              <div class="task-item">
                <span class="task-q">ហេតុអ្វី?</span>
                <span class="task-ans">ផ្តល់នូវការទទួលខុសត្រូវផ្ទាល់ខ្លួនលើការថែទាំឧបករណ៍។</span>
              </div>
            </div>
          </div>
        </div>
      `
    },

    // Slide 18: Simulator Widget
    {
      title: "កម្មវិធីពិសោធន៍ ៦ ស្ថានភាព (Widget 2)",
      content: `
        <div class="slide-header">
          <span class="section-tag section-tag-accent">ការពិសោធន៍អន្តរកម្ម</span>
          <h2>Widget 2៖ កម្មវិធីពិសោធន៍រចនាតារាង &amp; ជ្រើសរើស Data Type</h2>
          <p class="subtitle">វាយតម្លៃតម្រូវការរោងចក្រជាក់ស្តែងទាំង ៦។ ជ្រើសរើសប្រភេទគំរូទិន្នន័យ និងក្បួនទប់ស្កាត់ឱ្យបានត្រឹមត្រូវ។</p>
        </div>

        <div class="sim-workbench-container">
          <div class="sim-header-row">
            <span class="sim-progress-indicator" id="sim-progress-text">ស្ថានភាពទី ១ នៃ ៦</span>
            <span class="sim-score-counter">ពិន្ទុ៖ <span id="sim-score">0</span> / 6 ដោះស្រាយបាន</span>
          </div>

          <div class="sim-card-body" id="sim-card-body">
            <div class="sim-scenario-badge" id="sim-scenario-num">ស្ថានភាព ១</div>
            <h3 class="sim-title" id="sim-scenario-title">ការទប់ស្កាត់ម៉ោងបន្ថែម (OT) គ្មានការអនុញ្ញាត</h3>
            <p class="sim-desc" id="sim-scenario-desc">ជាងរោងចក្រម្នាក់បានធ្វើការ ៣.៥ ម៉ោងនៅចុងសប្តាហ៍ដើម្បីដោះស្រាយអាសន្ន។ កម្មវិធីត្រូវរក្សាទុកម៉ោងបន្ថែម ដើម្បីឱ្យផ្នែកបើកប្រាក់ខែអាចគណនាប្រាក់ ១.៥ ដងបាន។</p>
            
            <div class="sim-choices-row">
              <button class="sim-choice-btn" data-choice="text">
                <span class="choice-icon">🔤</span>
                <span>អត្ថបទខ្លី (Text)</span>
              </button>
              <button class="sim-choice-btn" data-choice="decimal">
                <span class="choice-icon">🔢</span>
                <span>លេខទសភាគ (Decimal Number)</span>
              </button>
              <button class="sim-choice-btn" data-choice="choice">
                <span class="choice-icon">📋</span>
                <span>ជម្រើសទម្លាក់ចុះ (Choice)</span>
              </button>
            </div>

            <div class="sim-feedback-box" id="sim-feedback" style="display: none;"></div>
          </div>

          <div class="sim-nav-row">
            <button class="fluent-btn-secondary" id="sim-prev-btn" disabled>ស្ថានភាពមុន</button>
            <button class="fluent-btn-primary" id="sim-next-btn">ស្ថានភាពបន្ទាប់ ➔</button>
          </div>
        </div>
      `
    },

    // Slide 19: Misconceptions
    {
      title: "ការយល់ច្រឡំគ្រោះថ្នាក់ ៤ ចំណុច",
      content: `
        <div class="slide-header">
          <span class="section-tag section-tag-danger">អន្ទាក់ដែលត្រូវជៀសវាង</span>
          <h2>ការយល់ច្រឡំគ្រោះថ្នាក់ ៤ ចំណុច &amp; ការកែតម្រូវរបស់គ្រូ</h2>
          <p class="subtitle">ទប់ស្កាត់កំហុសឆ្គងទូទៅបំផុតក្នុងការរចនាទិន្នន័យ ដែលអ្នកអភិវឌ្ឍន៍ថ្មីថ្មោងតែងតែប្រព្រឹត្ត។</p>
        </div>

        <div class="misconceptions-grid">
          <div class="misconception-card">
            <div class="misconception-wrong">
              <span class="wrong-badge">ផ្នត់គំនិតខុស ១</span>
              <h4>"អត្ថបទ Text ល្អបំផុតព្រោះវាផ្តល់សេរីភាពអតិបរមាឱ្យអ្នកប្រើវាយអ្វីក៏បាន។"</h4>
            </div>
            <div class="misconception-right">
              <span class="right-badge">ការកែតម្រូវរបស់គ្រូ</span>
              <p>សេរីភាពរបស់អ្នកប្រើ គឺជា <strong>ភាពវឹកវររបស់ប្រព័ន្ធ</strong>។ មូលដ្ឋានទិន្នន័យគឺជាម៉ាស៊ីនគណនា។ អត្ថបទសេរីធ្វើឱ្យការតម្រៀប, ការស្វែងរក, ការបូកសរុប និងស្វ័យប្រវត្តិកម្មមិនអាចដំណើរការបាន។</p>
            </div>
          </div>

          <div class="misconception-card">
            <div class="misconception-wrong">
              <span class="wrong-badge">ផ្នត់គំនិតខុស ២</span>
              <h4>"ស្ថានភាព (Status) គ្រាន់តែជាស្លាកអក្សរដែលជាងកែតាមចិត្តពេលគាត់នឹកឃើញ។"</h4>
            </div>
            <div class="misconception-right">
              <span class="right-badge">ការកែតម្រូវរបស់គ្រូ</span>
              <p>ស្ថានភាពគឺជា <strong>ចង្កូតបញ្ជារបស់កម្មវិធី</strong>។ វាគ្រប់គ្រងប៊ូតុងណាដែលត្រូវបង្ហាញ និងអ្នកណាជាម្ចាស់ការងារ។ បើអក្ខរាវិរុទ្ធខុសគ្នាតែមួយតួអក្សរ លំហូរការងារទាំងមូលនឹងត្រូវគាំង។</p>
            </div>
          </div>

          <div class="misconception-card">
            <div class="misconception-wrong">
              <span class="wrong-badge">ផ្នត់គំនិតខុស ៣</span>
              <h4>"យើងមិនបាច់មានជួរឈរ ID ទេ; គ្រាន់តែស្វែងរកតាមឈ្មោះម៉ាស៊ីន ឬកាលបរិច្ឆេទទៅបានហើយ។"</h4>
            </div>
            <div class="misconception-right">
              <span class="right-badge">ការកែតម្រូវរបស់គ្រូ</span>
              <p>ម៉ាស៊ីនលេខ ៤ អាចខូច ៣ ដងក្នុងមួយសប្តាហ៍។ លេខសម្គាល់ <strong>Unique ID</strong> បង្កើតដោយស្វ័យប្រវត្តិគឺជាស្នាមកំណើតអចិន្ត្រៃយ៍ ដែលភ្ជាប់ការបញ្ជាទិញ, កំណត់ត្រាជាង និងប្រវត្តិសវនកម្មដោយគ្មានការច្រឡំ។</p>
            </div>
          </div>

          <div class="misconception-card">
            <div class="misconception-wrong">
              <span class="wrong-badge">ផ្នត់គំនិតខុស ៤</span>
              <h4>"ដាក់ ៥០ ជួរឈរក្នុងតារាងឥឡូវនេះតែម្តងទៅ ក្រែងលោថ្ងៃក្រោយមានអ្នកណាត្រូវការប្រើ។"</h4>
            </div>
            <div class="misconception-right">
              <span class="right-badge">ការកែតម្រូវរបស់គ្រូ</span>
              <p>គ្រប់ជួរឈរទាមទារការថែទាំ, ការផ្ទៀងផ្ទាត់ និងទីធ្លាលើអេក្រង់។ ត្រូវបង្កើតតែជួរឈរណាដែលឆ្លើយសំណួរដោយផ្ទាល់នៅក្នុង <strong>លំហូរការងារសកម្ម</strong> ប៉ុណ្ណោះ។</p>
            </div>
          </div>
        </div>
      `
    },

    // Slide 20: Quiz Widget
    {
      title: "តេស្តវាស់ស្ទង់ចំណេះដឹង (Widget 3)",
      content: `
        <div class="slide-header">
          <span class="section-tag section-tag-accent">ការត្រួតពិនិត្យចំណេះដឹង</span>
          <h2>Widget 3៖ ការវាយតម្លៃចំណេះដឹង ៥ សំណួរ</h2>
          <p class="subtitle">សាកល្បងការយល់ដឹងរបស់អ្នកលើការផ្គូផ្គងដំណើរការទៅជាទិន្នន័យ, ការជ្រើសរើស Data Type, តួនាទីរបស់ Status និងភាពមិនអាចកែប្រែនៃលេខ ID។</p>
        </div>

        <div class="quiz-container">
          <div class="quiz-header-row">
            <span class="quiz-q-counter" id="quiz-question-counter">សំណួរទី ១ នៃ ៥</span>
            <span class="quiz-score-badge">ពិន្ទុ៖ <span id="quiz-score-display">0</span> / 5</span>
          </div>

          <div class="quiz-question-box">
            <h3 class="quiz-question-title" id="quiz-title">កំពុងផ្ទុកសំណួរ...</h3>
            <div class="quiz-options-grid" id="quiz-options">
              <!-- Dynamically populated by script.js -->
            </div>
            <div class="quiz-feedback-box" id="quiz-feedback" style="display: none;"></div>
          </div>

          <div class="quiz-footer-row">
            <button class="fluent-btn-secondary" id="quiz-prev-btn" disabled>សំណួរមុន</button>
            <button class="fluent-btn-primary" id="quiz-next-btn">សំណួរបន្ទាប់ ➔</button>
          </div>
        </div>
      `
    },

    // Slide 21: Capstone Brief
    {
      title: "លំហាត់ Capstone៖ ប្លង់ស្នើសុំពុម្ពម៉ាស៊ីន",
      content: `
        <div class="slide-header">
          <span class="section-tag">ការអនុវត្តសំយោគឯករាជ្យ</span>
          <h2>លំហាត់ Capstone៖ ការរចនាតារាងស្នើសុំដោះដូរពុម្ពចាក់នៅ Apex Plastics</h2>
          <p class="subtitle">រចនាតារាងទិន្នន័យ ៨ ជួរឈរកម្រិតសហគ្រាស សម្រាប់ដំណើរការដោះដូរពុម្ពដែកដែលសឹកក្នុងរោងចក្រ។</p>
        </div>

        <div class="capstone-brief-grid">
          <div class="capstone-req-card">
            <div class="req-header">
              <span class="req-badge">លំហូរប្រតិបត្តិការ ៤ ដំណាក់កាល</span>
              <h3>ដំណើររឿងនៃដំណើរការអាជីវកម្ម៖</h3>
            </div>
            <p>ពុម្ពចាក់ជ័រតែងតែសឹកក្រោយពេលចាក់បាន ៥០,០០០ ដង។ រោងចក្រត្រូវការកម្មវិធីរៀបរយដើម្បីដោះដូរពុម្ពដែលសឹក៖</p>
            <ol class="req-steps-list">
              <li><strong>ជំហាន ១ (ស្នើសុំពីជាងពុម្ព)៖</strong> ជាងបន្ទប់ពុម្ពរាយការណ៍ថាពុម្ពនៅលើម៉ាស៊ីនលេខ ៣ បានសឹក។</li>
              <li><strong>ជំហាន ២ (ការពិនិត្យរបស់ប្រធាន)៖</strong> ប្រធានពិនិត្យមើលតម្លៃដោះដូរពុម្ពថ្មី និងជ្រើសរើសប្រភេទថវិកា។</li>
              <li><strong>ជំហាន ៣ (ផ្នែកទិញទំនិញ PO)៖</strong> ផ្នែកទិញទំនិញបញ្ចូលលេខបញ្ជាទិញ PO Number និងឈ្មោះអ្នកផ្គត់ផ្គង់។</li>
              <li><strong>ជំហាន ៤ (ដំឡើង &amp; ក្រិតខ្នាត)៖</strong> ជាងបន្ទប់ពុម្ពដំឡើងពុម្ពថ្មី និងបញ្ជាក់ការឆ្លងកាត់ការក្រិតខ្នាត។</li>
            </ol>
          </div>

          <div class="capstone-tasks-card">
            <div class="req-header">
              <span class="req-badge">ទម្រង់លទ្ធផលដែលត្រូវប្រគល់</span>
              <h3>តារាងកំណត់លក្ខណៈជាក់លាក់ដែលត្រូវគូរ៖</h3>
            </div>
            <p>គូរតារាងទិន្នន័យ ៨ ជួរលើក្រដាស ឬកុំព្យូទ័ររបស់អ្នក៖</p>
            <ul class="deliverable-list">
              <li>• <strong>ឈ្មោះជួរឈរ (Field Name)៖</strong> ឈ្មោះច្បាស់លាស់បែប PascalCase។</li>
              <li>• <strong>ប្រភេទ Data Type៖</strong> ជ្រើសរើសពីធាតុផ្សំស្នូលទាំង ៧។</li>
              <li>• <strong>ត្រូវតែបំពេញ?</strong> បញ្ជាក់ បាទ/ចាស (Yes/No) សម្រាប់ទប់ស្កាត់លំហូរ។</li>
              <li>• <strong>ជំហានការងារ៖</strong> ភ្ជាប់ទៅកាន់ជំហាន ១, ២, ៣ ឬ ៤។</li>
              <li>• <strong>ក្បួនអាជីវកម្ម៖</strong> បង្កើតលក្ខខណ្ឌ Power Fx យ៉ាងហោចណាស់មួយ។</li>
            </ul>
          </div>
        </div>
      `
    },

    // Slide 22: Benchmark Solution & Rubric (Widget 4)
    {
      title: "ចម្លើយគំរូ & តារាង Rubric (Widget 4)",
      content: `
        <div class="slide-header">
          <span class="section-tag section-tag-accent">ការវាយតម្លៃ &amp; ស្វ័យវាយតម្លៃ</span>
          <h2>Widget 4៖ ចម្លើយគំរូ Capstone &amp; តារាងវាយតម្លៃ Rubric ៤ កម្រិត</h2>
          <p class="subtitle">ប្រៀបធៀបតារាងរបស់អ្នកធៀបនឹងដំណោះស្រាយកម្រិតសហគ្រាសផ្លូវការ និងវាយតម្លៃសមត្ថភាពផ្ទាល់ខ្លួន។</p>
        </div>

        <div class="solution-rubric-container">
          <div class="solution-toggle-bar">
            <button class="fluent-btn-primary" id="btn-reveal-solution">
              <span id="solution-btn-icon">👁️</span>
              <span id="solution-btn-text">បង្ហាញតារាងចម្លើយគំរូស្តង់ដារ</span>
            </button>
            <span class="rubric-hint">ចុចដើម្បីពិនិត្យមើលតារាងទិន្នន័យកម្រិតសហគ្រាស</span>
          </div>

          <!-- Collapsible Solution Drawer -->
          <div class="solution-content-drawer collapsed" id="solution-content">
            <table class="capstone-table solution-table">
              <thead>
                <tr>
                  <th>ឈ្មោះជួរឈរ</th>
                  <th>ប្រភេទ Data Type</th>
                  <th>ត្រូវតែបំពេញ?</th>
                  <th>ជំហាន</th>
                  <th>តួនាទីក្នុងស្ថាបត្យកម្ម Power Fx</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>ToolingID</code></td>
                  <td>Auto-Number Text</td>
                  <td>Yes (ប្រព័ន្ធ)</td>
                  <td>ទាំងអស់</td>
                  <td>លេខកូដសម្គាល់មេអចិន្ត្រៃយ៍ (ឧ. <code>TOOL-2026-0012</code>)</td>
                </tr>
                <tr>
                  <td><code>PressMachine</code></td>
                  <td>Choice (Press Assets)</td>
                  <td>Yes</td>
                  <td>ជំហាន ១</td>
                  <td>កម្រិតជម្រើសឱ្យរើសតែម៉ាស៊ីនពិតប្រាកដ ("Press #1" ដល់ "#8")</td>
                </tr>
                <tr>
                  <td><code>DieSerialNumber</code></td>
                  <td>Single Line Text</td>
                  <td>Yes</td>
                  <td>ជំហាន ១</td>
                  <td>សម្គាល់លេខស៊េរីនៃពុម្ពដែកដែលសឹកត្រូវដោះដូរ</td>
                </tr>
                <tr>
                  <td><code>EstimatedCost</code></td>
                  <td>Currency / Number</td>
                  <td>Yes</td>
                  <td>ជំហាន ២</td>
                  <td>ក្បួនទប់ស្កាត់៖ <code>If(EstimatedCost &gt; 2500, RouteDirector, RouteShop)</code></td>
                </tr>
                <tr>
                  <td><code>PurchaseOrderNum</code></td>
                  <td>Single Line Text</td>
                  <td>Yes</td>
                  <td>ជំហាន ៣</td>
                  <td>លេខបញ្ជាទិញ PO; ចាក់សោមិនឱ្យបិទសំណើបើទុកប្រអប់នេះទទេ</td>
                </tr>
                <tr>
                  <td><code>SupplierName</code></td>
                  <td>Choice / Text</td>
                  <td>Yes</td>
                  <td>ជំហាន ៣</td>
                  <td>ក្រុមហ៊ុនផ្គត់ផ្គង់ដែលបានអនុម័ត (ឧ. "Siam Precision Tools")</td>
                </tr>
                <tr>
                  <td><code>CalibrationPassed</code></td>
                  <td>Yes / No (Boolean)</td>
                  <td>Yes</td>
                  <td>ជំហាន ៤</td>
                  <td>ច្រកសុវត្ថិភាព៖ <code>btnFinish.DisplayMode = If(CalibrationPassed, Edit, Disabled)</code></td>
                </tr>
                <tr>
                  <td><code>Status</code></td>
                  <td>Choice (State Machine)</td>
                  <td>Yes</td>
                  <td>ទាំងអស់</td>
                  <td><code>Requested ➔ Approved ➔ PO Issued ➔ Calibrated ➔ Closed</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 4-Level Evaluation Rubric -->
          <div class="rubric-matrix-grid">
            <div class="rubric-level-card level-4">
              <div class="rubric-badge">កម្រិត ៤៖ ស្ទាត់ជំនាញ (100%)</div>
              <h4>ស្ថាបត្យកម្មឥតខ្ចោះ</h4>
              <p>ជួរឈរទាំង ៨ ផ្គូផ្គងត្រឹមត្រូវតាមជំហាន; Data Types ត្រឹមត្រូវ ១០០%; មានហេតុផលច្បាស់លាស់សម្រាប់ Required; បង្កើតក្បួន Power Fx បានត្រឹមត្រូវ។</p>
            </div>

            <div class="rubric-level-card level-3">
              <div class="rubric-badge">កម្រិត ៣៖ ចំណាន (75–99%)</div>
              <h4>ការយល់ដឹងរឹងមាំ</h4>
              <p>៧-៨ ជួរឈរត្រឹមត្រូវ; ខុស Data Type បន្តិចបន្តួច ១ (ឧ. ប្រើ Text លើ Currency); ភ្ជាប់ជំហានត្រូវ; ខុសអក្ខរាវិរុទ្ធកូដ Power Fx បន្តិចបន្តួច។</p>
            </div>

            <div class="rubric-level-card level-2">
              <div class="rubric-badge">កម្រិត ២៖ កំពុងអភិវឌ្ឍ (50–74%)</div>
              <h4>ការយល់ដឹងផ្នែកខ្លះ</h4>
              <p>ខុស Data Type ២-៣ (ឧ. ប្រើ Free Text លើ Status ឬ Priority); ភ្លេចដាក់លេខ Unique ID; ច្រឡំសំណួរលក្ខខណ្ឌជាមួយសកម្មភាព។</p>
            </div>

            <div class="rubric-level-card level-1">
              <div class="rubric-badge">កម្រិត ១៖ ទើបចាប់ផ្តើម (&lt;50%)</div>
              <h4>ត្រូវការបង្រៀនពង្រឹងឡើងវិញ</h4>
              <p>បង្កើតជួរឈររញ៉េរញ៉ៃមិនទាក់ទងនឹងជំហានការងារ; ដាក់គ្រប់ជួរឈរជា Text ទាំងអស់; មិនអាចបង្កើតលក្ខខណ្ឌ Power Fx បានឡើយ។</p>
            </div>
          </div>
        </div>
      `
    },

    // Slide 23: Homework
    {
      title: "កិច្ចការផ្ទះ & ការឆ្លុះបញ្ចាំង ១៥ នាទី",
      content: `
        <div class="slide-header">
          <span class="section-tag">ការអនុវត្តពង្រឹងចំណេះដឹង</span>
          <h2>ការឆ្លុះបញ្ចាំងប្រចាំថ្ងៃ ១៥ នាទី &amp; កិច្ចការផ្ទះអនុវត្ត</h2>
          <p class="subtitle">ចាក់គ្រឹះគោលគំនិតថ្ងៃនេះទៅក្នុងកន្លែងធ្វើការជាក់ស្តែងរបស់អ្នក មុនពេលយើងឈានដល់ការគូសប្លង់អេក្រង់នៅថ្ងៃស្អែក។</p>
        </div>

        <div class="homework-container">
          <div class="homework-card">
            <div class="hw-icon">📝</div>
            <h3>លំហាត់ផ្គូផ្គងទិន្នន័យនៅកន្លែងធ្វើការរបស់អ្នក</h3>
            <p>ជ្រើសរើសទម្រង់ក្រដាស ឬដំណើរការអនុម័តតាមអ៊ីមែលមួយនៅក្នុងផ្នែករបស់អ្នក (ឧ. សុំច្បាប់ឈប់សម្រាក, បើកប្រាក់បុរេប្រទាន, ក្រដាសអេតចាយ, ម៉ោងបន្ថែម)៖</p>
            <div class="hw-steps">
              <div class="hw-step-item">
                <span class="hw-bullet">១</span>
                <span>កត់ត្រា <strong>ជំហានស្នូលទាំង ៤</strong> ដែលក្រដាសនោះត្រូវឆ្លងកាត់។</span>
              </div>
              <div class="hw-step-item">
                <span class="hw-bullet">២</span>
                <span>សរសេរ <strong>សំណួរជាក់លាក់</strong> ដែលត្រូវឆ្លើយនៅជំហាននីមួយៗ។</span>
              </div>
              <div class="hw-step-item">
                <span class="hw-bullet">៣</span>
                <span>កំណត់ <strong>ឈ្មោះជួរឈរ (Field Name)</strong> និង <strong>ប្រភេទ Data Type</strong> សម្រាប់សំណួរនីមួយៗ។</span>
              </div>
              <div class="hw-step-item">
                <span class="hw-bullet">៤</span>
                <span>កំណត់តម្លៃនៃ <strong>ស្ថានភាពមេ (Master Status)</strong> និងទម្រង់នៃ <strong>លេខកូដសម្គាល់ (Unique ID)</strong>។</span>
              </div>
            </div>
          </div>

          <div class="trainer-quote-card">
            <span class="quote-sparkle">✨</span>
            <p class="quote-text">"នៅពេលអ្នកស្ទាត់ជំនាញក្នុងការរចនាទិន្នន័យចេញពីសំណួរក្នុងដំណើរការ អ្នកនឹងលែងមានអារម្មណ៍ភ័យខ្លាចចំពោះផ្ទាំងតារាងទទេទៀតហើយ។ ដំណើរការការងារ តែងតែប្រាប់អ្នកយ៉ាងច្បាស់ជានិច្ច ថាត្រូវរក្សាទុកទិន្នន័យអ្វីខ្លះ។"</p>
            <span class="quote-author">— សារក្រើនរំលឹកពីគ្រូបង្វឹក Power Apps</span>
          </div>
        </div>
      `
    },

    // Slide 24: Bridge Map
    {
      title: "ផែនទីតភ្ជាប់ ៣ ថ្ងៃ & ស្ពានទៅថ្ងៃទី ១២",
      content: `
        <div class="slide-header">
          <span class="section-tag section-tag-accent">ស្ពានឆ្ពោះទៅមុខ</span>
          <h2>កន្លែងដែលយើងបានឆ្លងកាត់ &amp; អ្វីដែលនឹងមកដល់នៅថ្ងៃស្អែក</h2>
          <p class="subtitle">ថ្ងៃស្អែកនៅក្នុងថ្ងៃទី ១២ យើងនឹងប្តូរពីទិន្នន័យខាងក្រោយ ទៅកាន់ផ្ទាំងអេក្រង់ខាងមុខ៖ បំប្លែងដំណើរការ &amp; ទិន្នន័យឱ្យក្លាយជាផ្ទាំងអេក្រង់!</p>
        </div>

        <div class="three-day-bridge-grid">
          <div class="bridge-card bridge-yesterday">
            <span class="bridge-day">ម្សិលមិញ (ថ្ងៃទី ១០)</span>
            <h4>កំណត់ត្រា &amp; តារាង៖ ករណីជាច្រើន</h4>
            <p>បានរៀនថាតារាងរៀបចំករណីអាជីវកម្មដដែលៗ, ជួរដេកស្មើនឹងកំណត់ត្រា (Records), និងសំណួររួមគ្នាស្មើនឹងជួរឈរ (Columns)។</p>
            <div class="bridge-footer">គោលគំនិត៖ ប្រអប់កាតរូបវន្ត</div>
          </div>

          <div class="bridge-card bridge-today">
            <span class="bridge-day active-day">ថ្ងៃនេះ (ថ្ងៃទី ១១)</span>
            <h4>រចនាទិន្នន័យចេញពីដំណើរការ</h4>
            <p>ទាញយកជួរឈរពីសំណួរក្នុងលំហូរ, កំណត់ប្រភេទ Data Types ដ៏រឹងមាំ, ស្ទាត់ជំនាញលើម៉ាស៊ីន Status និងបង្កើតលេខកូដ ID អចិន្ត្រៃយ៍។</p>
            <div class="bridge-footer">គោលគំនិត៖ សំណួរមុនជួរឈរ</div>
          </div>

          <div class="bridge-card bridge-tomorrow">
            <span class="bridge-day">ថ្ងៃស្អែក (ថ្ងៃទី ១២)</span>
            <h4>បំប្លែងដំណើរការ &amp; ទិន្នន័យជាអេក្រង់</h4>
            <p>យើងនឹងយកជួរឈរទាំង ៨ ថ្ងៃនេះ មកគូសប្លង់អេក្រង់រូបវន្ត៖ របៀបដែលជួរឈរក្លាយជា Text Inputs, Dropdowns, Cards, និង Galleries!</p>
            <div class="bridge-footer">គោលគំនិត៖ ការគូសប្លង់ UI Wireframing</div>
          </div>
        </div>

        <div class="bridge-conclusion-banner">
          <strong>សូមអបអរសាទរចំពោះការបញ្ចប់ថ្ងៃទី ១១ ដ៏ជោគជ័យ!</strong>
          <span>គ្រឹះស្ថាបត្យកម្មទិន្នន័យរបស់អ្នកបានរឹងមាំហើយ។ ថ្ងៃស្អែក យើងនឹងសាងសង់ផ្ទាំងរូបភាពនៃកម្មវិធី!</span>
        </div>
      `
    }
  ];

  // ==========================================================================
  // WIDGET 1 DATA: PROCESS-TO-SCHEMA ARCHITECT SPECIFICATION (SLIDE 12)
  // ==========================================================================
  const WORKBENCH_DATA = {
    "1": [
      {
        questionEn: "Which physical machine/asset is experiencing the problem?",
        questionKh: "តើម៉ាស៊ីន/សម្ភារៈរូបវន្តមួយណាដែលកំពុងជួបប្រទះបញ្ហា?",
        fieldName: "MachineID",
        dataType: "Choice (Asset List)",
        table: "MaintenanceRequests",
        specType: "Choice (OptionSet) / Lookup",
        roleEn: "Restricts operator selection to verified factory assets, eliminating typo-based misrouting.",
        roleKh: "បង្ខំឱ្យកម្មករជ្រើសតែម៉ាស៊ីនណាដែលមានក្នុងបញ្ជីទ្រព្យសម្បត្តិរោងចក្រ ការពារការច្រឡំដោយសារវាយខុស។",
        powerfx: `btnSubmit.DisplayMode = If(\n    IsBlank(cmbMachine.Selected),\n    DisplayMode.Disabled,\n    DisplayMode.Edit\n)`
      },
      {
        questionEn: "What specific noise, symptom, or malfunction occurred?",
        questionKh: "តើមានសំឡេងរំខាន រោគសញ្ញា ឬបញ្ហាមិនប្រក្រតីអ្វីកើតឡើង?",
        fieldName: "IssueDescription",
        dataType: "Multiple Lines of Text",
        table: "MaintenanceRequests",
        specType: "Multiple Lines of Text (Rich Text)",
        roleEn: "Captures unconstrained human observation; gating rule blocks submission if left empty.",
        roleKh: "កត់ត្រាការសង្កេតផ្ទាល់ភ្នែករបស់កម្មករ; ប៊ូតុង Submit នឹងចាក់សោរបើទុកប្រអប់នេះទទេស្អាត។",
        powerfx: `txtDescription.BorderColor = If(\n    IsBlank(txtDescription.Text),\n    Color.Red,\n    Color.Gray\n)`
      },
      {
        questionEn: "How hazardous is this issue to human safety or line stoppage?",
        questionKh: "តើបញ្ហានេះមានគ្រោះថ្នាក់កម្រិតណាដល់សុវត្ថិភាពមនុស្ស ឬការគាំងខ្សែសង្វាក់?",
        fieldName: "UrgencyLevel",
        dataType: "Choice (Low, Med, High, Crit)",
        table: "MaintenanceRequests",
        specType: "Choice (OptionSet)",
        roleEn: "Powers queue priority sorting and triggers automated emergency supervisor notifications.",
        roleKh: "បញ្ជាការតម្រៀបអាទិភាពក្នុងបញ្ជីការងារ និងផ្ញើសារជូនដំណឹងអាសន្នទៅកាន់ប្រធានរោងចក្រភ្លាមៗ។",
        powerfx: `If(\n    cmbUrgency.Selected.Value = "Critical",\n    Office365Outlook.SendEmailV2("plantmgr@apex.com", "SAFETY EMERGENCY", "Immediate Action Required")\n)`
      }
    ],
    "2": [
      {
        questionEn: "What is the contractor or parts quote to repair this machine?",
        questionKh: "តើតម្លៃគ្រឿងបន្លាស់ ឬជាងជួសជុលម៉ាស៊ីននេះប៉ាន់ស្មានប៉ុន្មាន?",
        fieldName: "EstimatedCost",
        dataType: "Currency / Decimal Number",
        table: "MaintenanceRequests",
        specType: "Currency (Decimal 2 places)",
        roleEn: "Enables mathematical comparison gates for financial authority threshold routing.",
        roleKh: "អនុញ្ញាតឱ្យប្រៀបធៀបគណិតវិទ្យា សម្រាប់បង្វែរផ្លូវអនុម័តតាមកម្រិតថវិកាដែលបានកំណត់។",
        powerfx: `btnApproveDirect.Visible = Value(txtEstimatedCost.Text) <= 1000;\nbtnEscalateManager.Visible = Value(txtEstimatedCost.Text) > 1000;`
      },
      {
        questionEn: "Does the shift supervisor authorize this repair to proceed?",
        questionKh: "តើប្រធានវេនអនុញ្ញាតឱ្យដំណើរការជួសជុលនេះបន្តដែរឬទេ?",
        fieldName: "IsApproved",
        dataType: "Yes / No (Boolean)",
        table: "MaintenanceRequests",
        specType: "Two Options (Boolean)",
        roleEn: "Direct binary branch in the workflow advancing the ticket into the maintenance queue.",
        roleKh: "លក្ខខណ្ឌប៊ូលីនសម្រេចផ្ទាល់ ដែលរុញសំបុត្រការងារទៅកាន់ជួរការងាររបស់ជាងជួសជុល។",
        powerfx: `If(\n    chkApproved.Value = True,\n    Patch(MaintenanceRequests, varCurrentTicket, { Status: "Approved", IsApproved: true }),\n    Patch(MaintenanceRequests, varCurrentTicket, { Status: "Rejected", IsApproved: false })\n)`
      }
    ],
    "3": [
      {
        questionEn: "How many actual labor hours were spent by the repair technician?",
        questionKh: "តើជាងជួសជុលបានចំណាយពេលជាក់ស្តែងអស់ប៉ុន្មានម៉ោង?",
        fieldName: "LaborHours",
        dataType: "Decimal Number",
        table: "MaintenanceRequests",
        specType: "Decimal Number (1 decimal)",
        roleEn: "Provides operational efficiency metrics and accurate equipment maintenance costing.",
        roleKh: "ផ្តល់ទិន្នន័យវាស់ស្ទង់ប្រសិទ្ធភាពការងារ និងគណនាថ្លៃដើមថែទាំម៉ាស៊ីនបានសុក្រឹត។",
        powerfx: `lblTotalCost.Text = Text(\n    (Value(txtLaborHours.Text) * 45) + Value(txtPartsCost.Text),\n    "$#,##0.00"\n)`
      }
    ],
    "4": [
      {
        questionEn: "Did this machine pass the post-maintenance 15-minute test run?",
        questionKh: "តើម៉ាស៊ីននេះបានឆ្លងកាត់ការរត់តេស្តសាកល្បងសុវត្ថិភាព ១៥ នាទីរួចរាល់ហើយឬនៅ?",
        fieldName: "SafetyRunPassed",
        dataType: "Yes / No (Boolean)",
        table: "MaintenanceRequests",
        specType: "Two Options (Boolean)",
        roleEn: "Safety interlock gating closure to ensure ISO audit compliance before production restart.",
        roleKh: "គន្លឹះសុវត្ថិភាពទប់ស្កាត់ការបិទសំណើ ដើម្បីធានាស្តង់ដារ ISO មុនពេលចាប់ផ្តើមផលិតឡើងវិញ។",
        powerfx: `btnCompleteTicket.DisplayMode = If(\n    chkSafetyTest.Value = True,\n    DisplayMode.Edit,\n    DisplayMode.Disabled\n)`
      }
    ]
  };

  // ==========================================================================
  // WIDGET 2 DATA: 6-SCENARIO SIMULATOR (SLIDE 18)
  // ==========================================================================
  const SIMULATOR_SCENARIOS = [
    {
      num: "SCENARIO 1",
      titleEn: "Preventing Unapproved Overtime",
      titleKh: "ការទប់ស្កាត់ម៉ោងបន្ថែម (OT) គ្មានការអនុញ្ញាត",
      descEn: "A factory technician worked 3.5 hours on a weekend emergency. The app must store the overtime hours so payroll can calculate 1.5x pay.",
      descKh: "ជាងរោងចក្រម្នាក់បានធ្វើការ ៣.៥ ម៉ោងនៅចុងសប្តាហ៍ដើម្បីដោះស្រាយអាសន្ន។ កម្មវិធីត្រូវរក្សាទុកម៉ោងបន្ថែម ដើម្បីឱ្យផ្នែកបើកប្រាក់ខែអាចគណនាប្រាក់ ១.៥ ដងបាន។",
      correct: "decimal",
      explCorrectEn: "Correct! Overtime hours must be a Decimal Number (e.g. 3.5). Storing it as Text prevents mathematical multiplication for payroll!",
      explCorrectKh: "ត្រឹមត្រូវ! ម៉ោងបន្ថែមត្រូវតែជាលេខទសភាគ (Decimal Number ឧ. 3.5)។ បើដាក់ជា Text វាមិនអាចគុណគណិតវិទ្យាសម្រាប់បើកប្រាក់ខែបានឡើយ!",
      explWrongEn: "Incorrect. Text cannot be multiplied in formulas, and Choice is too restrictive for variable hours. Decimal Number is required.",
      explWrongKh: "មិនត្រឹមត្រូវទេ។ អត្ថបទ Text មិនអាចយកទៅគុណក្នុងរូបមន្តបានទេ ហើយ Choice ក៏រឹងពេកសម្រាប់ម៉ោងប្រែប្រួល។ ត្រូវតែជា Decimal Number។"
    },
    {
      num: "SCENARIO 2",
      titleEn: "Factory Asset Tag Verification",
      titleKh: "ការផ្ទៀងផ្ទាត់ស្លាកសម្គាល់ទ្រព្យសម្បត្តិរោងចក្រ",
      descEn: "An operator is logging an issue on an injection press. How should the app let them select the machine to prevent spelling typos?",
      descKh: "កម្មករកំពុងកត់ត្រាបញ្ហាម៉ាស៊ីនចាក់ពុម្ព។ តើកម្មវិធីគួរឱ្យគាត់ជ្រើសរើសម៉ាស៊ីនតាមរបៀបណា ដើម្បីកុំឱ្យវាយអក្សរខុស?",
      correct: "choice",
      explCorrectEn: "Correct! Choice (or Asset Lookup) restricts selection to verified machines, preventing catastrophic typos like 'Pres 3' vs 'Press#3'.",
      explCorrectKh: "ត្រឹមត្រូវ! ជម្រើស Choice កម្រិតឱ្យរើសតែម៉ាស៊ីនពិតប្រាកដក្នុងបញ្ជី ការពារកំហុសវាយអក្សរខុសដូចជា 'Pres 3' និង 'Press#3'។",
      explWrongEn: "Incorrect. Free Text allows spelling errors. Numbers don't display human-readable machine names. Choice is essential.",
      explWrongKh: "មិនត្រឹមត្រូវទេ។ អត្ថបទសេរីបង្កឱ្យមានកំហុសអក្ខរាវិរុទ្ធ។ Choice គឺជាដំណោះស្រាយត្រឹមត្រូវបំផុត។"
    },
    {
      num: "SCENARIO 3",
      titleEn: "Immediate Hazardous Leak Lockdown",
      titleKh: "ការចាក់សោបិទម៉ាស៊ីនលេចធ្លាយជាតិគីមីបន្ទាន់",
      descEn: "A chemical pipe is spraying solvent. The operator must flag whether the emergency shutoff valve was tripped.",
      descKh: "បំពង់គីមីកំពុងបាញ់លេចធ្លាយ។ កម្មករត្រូវបញ្ជាក់ថា តើកុងតាក់បិទបន្ទាន់ត្រូវបានទាញបិទហើយឬនៅ។",
      correct: "decimal", // choice mapped to binary
      customButtons: [
        { id: "bool", label: "Yes / No (Boolean)", icon: "🔘" },
        { id: "text", label: "Single Line Text", icon: "🔤" },
        { id: "num", label: "Whole Number", icon: "🔢" }
      ],
      correctId: "bool",
      explCorrectEn: "Correct! A binary safety question ('Was the valve shut?') has only two states: True or False. Yes/No (Boolean) is the only safe choice.",
      explCorrectKh: "ត្រឹមត្រូវ! សំណួរសុវត្ថិភាពដែលមានតែពីរជម្រើស ('តើបានបិទកុងតាក់ឬនៅ?') មានតែស្ថានភាព True ឬ False។ Yes/No (Boolean) គឺជាជម្រើសតែមួយគត់។",
      explWrongEn: "Incorrect. Text creates ambiguity ('yes', 'maybe', 'yep'). A binary Boolean guarantees absolute safety interlock logic.",
      explWrongKh: "មិនត្រឹមត្រូវទេ។ អត្ថបទ Text ធ្វើឱ្យមានភាពស្រពិចស្រពិល ('បាទ', 'ប្រហែល')។ Yes/No ប៊ូលីនធានានូវតក្កវិជ្ជាសុវត្ថិភាពដាច់ខាត។"
    },
    {
      num: "SCENARIO 4",
      titleEn: "Tooling Die Replacement Costing",
      titleKh: "ការប៉ាន់ស្មានថ្លៃដោះដូរពុម្ពម៉ាស៊ីន",
      descEn: "A quote of $4,850.50 arrives for a replacement carbide injection mold die. Which data type should hold this value?",
      descKh: "សម្រង់តម្លៃ $4,850.50 បានមកដល់សម្រាប់ការដោះដូរពុម្ពដែកថ្មី។ តើប្រភេទ Data Type ណាដែលគួរផ្ទុកតម្លៃនេះ?",
      correct: "decimal",
      explCorrectEn: "Correct! Currency / Decimal Number preserves cents and allows Power Fx comparison: If(Cost > 2000, Escalate, Approve).",
      explCorrectKh: "ត្រឹមត្រូវ! រូបិយប័ណ្ណ / Decimal Number រក្សាកាក់ទសភាគ និងអនុញ្ញាតឱ្យ Power Fx គណនា៖ If(Cost > 2000, Escalate, Approve)។",
      explWrongEn: "Incorrect. Storing prices as text breaks mathematical comparison operators (<, >) and ruins accounting calculations.",
      explWrongKh: "មិនត្រឹមត្រូវទេ។ ការផ្ទុកតម្លៃជា Text នឹងធ្វើឱ្យសញ្ញាប្រៀបធៀប (<, >) ខូច និងបំផ្លាញការគណនាគណនេយ្យ។"
    },
    {
      num: "SCENARIO 5",
      titleEn: "Preventing Ticket Collisions Across Shifts",
      titleKh: "ការការពារកុំឱ្យជាន់លេខសំណើរវាងវេនការងារ",
      descEn: "Line 2 fails during Shift A, and fails again during Shift B. How must the system distinguish these two incidents?",
      descKh: "ខ្សែសង្វាក់ទី ២ ខូចក្នុងវេន A ហើយខូចម្តងទៀតក្នុងវេន B។ តើប្រព័ន្ធត្រូវញែកឧប្បត្តិហេតុទាំងពីរនេះដោយរបៀបណា?",
      correct: "choice", // will map to custom
      customButtons: [
        { id: "autoid", label: "Auto-Number Unique ID", icon: "🆔" },
        { id: "manual", label: "Manual Ticket Number", icon: "✍️" },
        { id: "dateonly", label: "Date Stamp Only", icon: "📅" }
      ],
      correctId: "autoid",
      explCorrectEn: "Correct! An Auto-Number Unique ID (e.g. REQ-2026-0104) guarantees every single incident receives an unchanging, non-reusable birthmark.",
      explCorrectKh: "ត្រឹមត្រូវ! លេខកូដសម្គាល់ស្វ័យប្រវត្តិ (ឧ. REQ-2026-0104) ធានាថារាល់ឧប្បត្តិហេតុទាំងអស់ទទួលបានស្លាកស្នាមកំណើតតែមួយគត់មិនជាន់គ្នា។",
      explWrongEn: "Incorrect. Manual typing causes duplicates. Date alone cannot separate multiple failures on the same day. Auto-Number ID is mandatory.",
      explWrongKh: "មិនត្រឹមត្រូវទេ។ ការវាយបញ្ចូលដោយដៃបង្កឱ្យជាន់លេខគ្នា។ កាលបរិច្ឆេទតែមួយមុខមិនអាចញែកការខូចច្រើនដងក្នុងថ្ងៃតែមួយបានឡើយ។"
    },
    {
      num: "SCENARIO 6",
      titleEn: "Controlling Application Screen Lifecycle",
      titleKh: "ការគ្រប់គ្រងវដ្តជីវិតនៃផ្ទាំងអេក្រង់",
      descEn: "When a maintenance job is finished and signed off by QA, what column dictates that the form must become read-only?",
      descKh: "នៅពេលការងារជួសជុលត្រូវបានបញ្ចប់ និងចុះហត្ថលេខាដោយ QA តើជួរឈរមួយណាដែលបញ្ជាឱ្យទម្រង់អេក្រង់ក្លាយជា Read-only?",
      correct: "choice",
      customButtons: [
        { id: "status", label: "Status State Machine", icon: "🚦" },
        { id: "freetext", label: "Notes Free Text", icon: "📝" },
        { id: "operator", label: "Operator Name", icon: "👤" }
      ],
      correctId: "status",
      explCorrectEn: "Correct! The Status field (Closed) drives the Power Fx rule: frmRequest.DisplayMode = If(Status = 'Closed', View, Edit).",
      explCorrectKh: "ត្រឹមត្រូវ! ជួរឈរ Status (Closed) បញ្ជាក្បួន Power Fx៖ frmRequest.DisplayMode = If(Status = 'Closed', View, Edit)។",
      explWrongEn: "Incorrect. Notes and operator names are narrative fields. Only the controlled Status field acts as the state machine switch.",
      explWrongKh: "មិនត្រឹមត្រូវទេ។ កំណត់ត្រា និងឈ្មោះមិនមែនជាកុងតាក់បញ្ជាឡើយ។ មានតែជួរឈរ Status ទេដែលដើរតួជាកុងតាក់បញ្ជាកម្មវិធី។"
    }
  ];

  // ==========================================================================
  // WIDGET 3 DATA: 5-QUESTION EVALUATIVE ASSESSMENT (SLIDE 20)
  // ==========================================================================
  const QUIZ_QUESTIONS = [
    {
      titleEn: "1. WHY must a citizen developer derive fields starting from process questions rather than a blank table?",
      titleKh: "១. ហេតុអ្វីបានជាអ្នកអភិវឌ្ឍន៍ ត្រូវទាញយកជួរឈរចេញពីសំណួរក្នុងដំណើរការ ជាជាងចាប់ផ្តើមពីតារាងទទេ?",
      optionsEn: [
        "A) Because Power Apps crashes if you don't use a Microsoft template",
        "B) Because every field requires maintenance, validation, and storage; deriving from process guarantees every column serves a real decision",
        "C) Because Excel spreadsheets can only hold 10 columns maximum",
        "D) Because data types only exist in paper filing systems"
      ],
      optionsKh: [
        "A) ពីព្រោះ Power Apps នឹងគាំង ប្រសិនបើអ្នកមិនប្រើទម្រង់គំរូរបស់ Microsoft",
        "B) ពីព្រោះគ្រប់ជួរឈរទាំងអស់ទាមទារការថែទាំ ការផ្ទៀងផ្ទាត់ និងទំហំផ្ទុក; ការទាញចេញពីដំណើរការធានាថាគ្រប់ជួរឈរសុទ្ធតែបម្រើដល់ការសម្រេចចិត្តពិត",
        "C) ពីព្រោះតារាង Excel អាចផ្ទុកបានត្រឹមតែ ១០ ជួរឈរប៉ុណ្ណោះ",
        "D) ពីព្រោះប្រភេទគំរូទិន្នន័យមានតែនៅក្នុងប្រព័ន្ធក្រដាសប៉ុណ្ណោះ"
      ],
      correct: 1,
      explanationEn: "Correct! Deriving data from the process prevents 'data bloat' and guarantees that every field has an active owner and purpose.",
      explanationKh: "ត្រឹមត្រូវ! ការទាញយកទិន្នន័យចេញពីដំណើរការជួយទប់ស្កាត់ការកកស្ទះទិន្នន័យ និងធានាថាគ្រប់ជួរឈរទាំងអស់សុទ្ធតែមានម្ចាស់ទទួលខុសត្រូវច្បាស់លាស់។"
    },
    {
      titleEn: "2. WHAT HAPPENS IF you store an estimated repair cost as Text like '$120' instead of a Currency/Number?",
      titleKh: "២. តើមានអ្វីកើតឡើង ប្រសិនបើអ្នករក្សាទុកតម្លៃជួសជុលជា Text ដូចជា '$120' ជំនួសឱ្យ Currency/Number?",
      optionsEn: [
        "A) The text font will automatically turn green",
        "B) Power Fx cannot perform mathematical calculations, and alphabetical sorting will falsely evaluate '120' as less than '80'",
        "C) The database will double the repair cost automatically",
        "D) The user will be required to scan their fingerprint"
      ],
      optionsKh: [
        "A) ពុម្ពអក្សរនឹងប្រែទៅជាពណ៌បៃតងដោយស្វ័យប្រវត្តិ",
        "B) Power Fx មិនអាចធ្វើការគណនាគណិតវិទ្យាបានទេ ហើយការតម្រៀបតាមអក្ខរក្រមនឹងវាយតម្លៃខុសឆ្គងថា '120' តូចជាង '80'",
        "C) មូលដ្ឋានទិន្នន័យនឹងដំឡើងតម្លៃជួសជុលទ្វេដងដោយស្វ័យប្រវត្តិ",
        "D) អ្នកប្រើប្រាស់នឹងត្រូវបានតម្រូវឱ្យស្កេនស្នាមមេដៃ"
      ],
      correct: 1,
      explanationEn: "Correct! Alphabetical text comparison compares characters ('1' < '8'), causing high-cost repairs to slip past executive approval gates!",
      explanationKh: "ត្រឹមត្រូវ! ការប្រៀបធៀបតាមអក្ខរក្រមប្រៀបធៀបតួអក្សរ ('1' < '8') ដែលបណ្តាលឱ្យការជួសជុលតម្លៃថ្លៃរំលងការអនុម័តរបស់ថ្នាក់ដឹកនាំ!"
    },
    {
      titleEn: "3. WHY does Power Apps require the Value() function when comparing txtCost.Text > 1000?",
      titleKh: "៣. ហេតុអ្វីបានជា Power Apps តម្រូវឱ្យប្រើអនុគមន៍ Value() នៅពេលប្រៀបធៀប txtCost.Text > 1000?",
      optionsEn: [
        "A) Because Value() makes the text box look darker on the screen",
        "B) Because screen text input controls produce string characters, and Value() converts the string into a mathematical number",
        "C) Because 1000 is too large to fit inside a computer",
        "D) Because Value() checks if the user is an administrator"
      ],
      optionsKh: [
        "A) ពីព្រោះ Value() ធ្វើឱ្យប្រអប់អត្ថបទមើលទៅកាន់តែដិតលើអេក្រង់",
        "B) ពីព្រោះប្រអប់បញ្ចូលអត្ថបទលើអេក្រង់បង្កើតបានជាតួអក្សរ (String) ហើយ Value() បំប្លែងតួអក្សរនោះឱ្យទៅជាលេខគណិតវិទ្យា",
        "C) ពីព្រោះលេខ ១០០០ ធំពេកមិនអាចដាក់ក្នុងកុំព្យូទ័របាន",
        "D) ពីព្រោះ Value() ពិនិត្យមើលថាតើអ្នកប្រើប្រាស់ជាអ្នកគ្រប់គ្រងឬអត់"
      ],
      correct: 1,
      explanationEn: "Correct! Text inputs on screens emit text strings. Value('1000') transforms text into the number 1000 so the > operator can legally execute.",
      explanationKh: "ត្រឹមត្រូវ! ប្រអប់បញ្ចូលទិន្នន័យលើអេក្រង់បញ្ចេញតម្លៃជាអក្សរ។ Value('1000') បំប្លែងអក្សរឱ្យទៅជាលេខ ១០០០ ដើម្បីឱ្យសញ្ញា > អាចដំណើរការបាន។"
    },
    {
      titleEn: "4. An app blocks submission if MachineID is left blank. In software architecture, what is this called?",
      titleKh: "៤. កម្មវិធីមួយចាក់សោមិនឱ្យផ្ញើ ប្រសិនបើទុក MachineID នៅទទេស្អាត។ នៅក្នុងស្ថាបត្យកម្មកម្មវិធី តើគេហៅចំណុចនេះថាជាអ្វី?",
      optionsEn: [
        "A) An aesthetic animation",
        "B) A Safety Interlock (Mandatory Gating Rule)",
        "C) A database virus",
        "D) An internet connection timeout"
      ],
      optionsKh: [
        "A) ចលនារស់រវើកដើម្បីលម្អ",
        "B) គន្លឹះសុវត្ថិភាពទប់ស្កាត់ (Safety Interlock / Mandatory Gate)",
        "C) វីរុសបំផ្លាញមូលដ្ឋានទិន្នន័យ",
        "D) ការដាច់សេវាអ៊ីនធឺណិត"
      ],
      correct: 1,
      explanationEn: "Correct! A Safety Interlock prevents downstream chaos by ensuring work cannot enter the maintenance shop without identifying the machine asset.",
      explanationKh: "ត្រឹមត្រូវ! គន្លឹះសុវត្ថិភាពទប់ស្កាត់ការរញ៉េរញ៉ៃ ដោយធានាថាសំណើមិនអាចធ្លាក់ដល់រោងជាងបានឡើយ បើមិនទាន់កំណត់អត្តសញ្ញាណម៉ាស៊ីនច្បាស់លាស់។"
    },
    {
      titleEn: "5. WHY must a Ticket ID (e.g. REQ-2026-0042) be IMMUTABLE (never editable by users)?",
      titleKh: "៥. ហេតុអ្វីបានជាលេខកូដសំបុត្រ (ឧ. REQ-2026-0042) ត្រូវតែមិនអាចកែប្រែបាន (Immutable) ជាដាច់ខាត?",
      optionsEn: [
        "A) Because printers cannot print numbers that change",
        "B) To maintain absolute historical integrity, ensuring audit logs, POs, and maintenance records always point to the exact same incident",
        "C) Because Power Apps only allows numbers to be edited on Mondays",
        "D) To save space on the computer hard drive"
      ],
      optionsKh: [
        "A) ពីព្រោះម៉ាស៊ីនព្រីនមិនអាចព្រីនលេខដែលប្រែប្រួលបានឡើយ",
        "B) ដើម្បីរក្សាភាពសុក្រឹតនៃប្រវត្តិសាស្ត្រទិន្នន័យ ធានាថាកំណត់ត្រាសវនកម្ម វិក្កយបត្រ និងប្រវត្តិជួសជុលតែងតែចង្អុលទៅកាន់ឧប្បត្តិហេតុពិតដដែលជានិច្ច",
        "C) ពីព្រោះ Power Apps អនុញ្ញាតឱ្យកែលេខបានតែនៅថ្ងៃចន្ទប៉ុណ្ណោះ",
        "D) ដើម្បីសន្សំសំចៃទំហំផ្ទុកលើ Hard Drive កុំព្យូទ័រ"
      ],
      correct: 1,
      explanationEn: "Correct! Immutability guarantees that audit trails, parts invoices, and historical safety reviews can never be broken or covered up.",
      explanationKh: "ត្រឹមត្រូវ! ភាពមិនអាចកែប្រែបានធានាថា ប្រវត្តិសវនកម្ម វិក្កយបត្រគ្រឿងបន្លាស់ និងកំណត់ត្រាសុវត្ថិភាពមិនអាចត្រូវបំផ្លាញ ឬកែបិទបាំងបានឡើយ។"
    }
  ];

  // ==========================================================================
  // INITIALIZATION & EVENT BINDINGS
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    cacheOriginalEnglishSlides();
    initNavigation();
    initKeyboardShortcuts();
    initTimer();
    initLaserPointer();
    initNotesDrawer();
    initOverviewModal();
    initLanguageSwitcher();
    initFullscreenToggle();

    // Initialize Interactive Widgets
    initSchemaWorkbench();
    initSimulator();
    initQuiz();
    initSolutionReveal();

    // Sync initial slide state
    goToSlide(1);
  });

  // Store original English markup on boot
  function cacheOriginalEnglishSlides() {
    dom.slides.forEach((slide) => {
      const contentEl = slide.querySelector('.slide-content');
      slideOriginals.push({
        title: slide.getAttribute('data-title') || '',
        content: contentEl ? contentEl.innerHTML : ''
      });
    });
  }

  // ==========================================================================
  // NAVIGATION CONTROLLER
  // ==========================================================================
  function initNavigation() {
    const nextBtn = document.getElementById('btn-next') || dom.btnNext;
    const prevBtn = document.getElementById('btn-prev') || dom.btnPrev;
    if (nextBtn) {
      nextBtn.onclick = nextSlide;
      nextBtn.addEventListener('click', nextSlide);
    }
    if (prevBtn) {
      prevBtn.onclick = prevSlide;
      prevBtn.addEventListener('click', prevSlide);
    }
    if (dom.btnRestart) dom.btnRestart.addEventListener('click', () => goToSlide(1));

    const heroBtn = document.getElementById('hero-start-btn');
    if (heroBtn) heroBtn.addEventListener('click', nextSlide);

    // Prerequisite Reveal Buttons
    const revealBtns = document.querySelectorAll('.ret-reveal-btn');
    revealBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetId = e.currentTarget.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.classList.toggle('revealed');
          e.currentTarget.textContent = targetEl.classList.contains('revealed') ? 
            (state.isKhmer ? "លាក់ចម្លើយ" : "Hide Answer") : 
            (state.isKhmer ? "បង្ហាញចម្លើយ" : "Reveal Answer");
        }
      });
    });
  }

  function nextSlide() {
    if (state.currentSlide < state.totalSlides) {
      goToSlide(state.currentSlide + 1);
    }
  }

  function prevSlide() {
    if (state.currentSlide > 1) {
      goToSlide(state.currentSlide - 1);
    }
  }

  function goToSlide(slideNum) {
    if (slideNum < 1 || slideNum > state.totalSlides) return;
    state.currentSlide = slideNum;

    dom.slides.forEach((slide, idx) => {
      slide.classList.remove('active', 'prev');
      if (idx + 1 === slideNum) {
        slide.classList.add('active');
      } else if (idx + 1 < slideNum) {
        slide.classList.add('prev');
      }
    });

    updateSlideStatusUI();
    updateNotesContent();
    updateOverviewActiveState();
  }

  function updateSlideStatusUI() {
    const curNum = document.getElementById('slide-current-num') || dom.currentSlideNum;
    const totNum = document.getElementById('slide-total-count') || dom.totalSlidesNum;
    const counterEl = document.getElementById('slide-counter') || dom.slideCounter;

    if (curNum) curNum.textContent = String(state.currentSlide);
    if (totNum) totNum.textContent = String(state.totalSlides);
    if (counterEl) {
      counterEl.innerHTML = state.isKhmer 
        ? `ស្លាយទី <span id="slide-current-num">${state.currentSlide}</span> / <span id="slide-total-count">${state.totalSlides}</span>`
        : `Slide <span id="slide-current-num">${state.currentSlide}</span> / <span id="slide-total-count">${state.totalSlides}</span>`;
    }

    // Progress Bar Fill
    const progressFill = document.getElementById('progress-bar') || dom.progressFill;
    const progressPct = ((state.currentSlide) / state.totalSlides) * 100;
    if (progressFill) progressFill.style.width = `${progressPct}%`;

    // Slide Title in Header
    const activeSlide = dom.slides[state.currentSlide - 1];
    if (activeSlide && dom.currentSlideTitle) {
      const titleAttr = activeSlide.getAttribute('data-title');
      dom.currentSlideTitle.textContent = state.isKhmer && KHMER_SLIDES[state.currentSlide - 1] ? 
        KHMER_SLIDES[state.currentSlide - 1].title : titleAttr;
    }

    // Segment Pill
    if (activeSlide && dom.timerSegmentName) {
      const segAttr = activeSlide.getAttribute('data-segment');
      dom.timerSegmentName.textContent = segAttr || "Part 1: Recall & Connect";
    }

    // Nav button states
    if (dom.btnPrev) dom.btnPrev.disabled = (state.currentSlide === 1);
    if (dom.btnNext) {
      if (state.currentSlide === state.totalSlides) {
        dom.btnNext.innerHTML = `<span>Finished</span>`;
      } else {
        dom.btnNext.innerHTML = `<span>${state.isKhmer ? "បន្ទាប់" : "Next"}</span><svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>`;
      }
    }
  }

  // ==========================================================================
  // KEYBOARD ACCELERATORS
  // ==========================================================================
  function initKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Ignore when focused in text inputs
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          prevSlide();
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(1);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(state.totalSlides);
          break;
        case 'n':
        case 'N':
          e.preventDefault();
          toggleNotesDrawer();
          break;
        case 'o':
        case 'O':
        case 'g':
        case 'G':
          e.preventDefault();
          toggleOverviewModal();
          break;
        case 'l':
        case 'L':
          e.preventDefault();
          toggleLanguage();
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          toggleLaserMode();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'Escape':
          closeAllModals();
          break;
      }
    });
  }

  // ==========================================================================
  // 90-MINUTE LIVE ACTIVITY TIMER
  // ==========================================================================
  function initTimer() {
    if (dom.timerToggleBtn) dom.timerToggleBtn.addEventListener('click', toggleTimer);
    if (dom.timerResetBtn) dom.timerResetBtn.addEventListener('click', resetTimer);
  }

  function toggleTimer() {
    state.timerRunning = !state.timerRunning;
    if (state.timerRunning) {
      state.timerInterval = setInterval(tickTimer, 1000);
      if (dom.timerIcon) {
        // Pause SVG
        dom.timerIcon.innerHTML = `<rect x="4" y="3" width="3" height="10" rx="1"/><rect x="9" y="3" width="3" height="10" rx="1"/>`;
      }
    } else {
      clearInterval(state.timerInterval);
      if (dom.timerIcon) {
        // Play SVG
        dom.timerIcon.innerHTML = `<path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>`;
      }
    }
  }

  function tickTimer() {
    state.timerSeconds++;
    const mins = Math.floor(state.timerSeconds / 60);
    const secs = state.timerSeconds % 60;
    if (dom.timerDisplay) {
      dom.timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
  }

  function resetTimer() {
    state.timerRunning = false;
    clearInterval(state.timerInterval);
    state.timerSeconds = 0;
    if (dom.timerDisplay) dom.timerDisplay.textContent = "00:00";
    if (dom.timerIcon) {
      dom.timerIcon.innerHTML = `<path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>`;
    }
  }

  // ==========================================================================
  // PRESENTER LASER FOCUS POINTER ENGINE
  // ==========================================================================
  function initLaserPointer() {
    document.body.classList.add('laser-mode');
    if (dom.laserToggleBtn) {
      dom.laserToggleBtn.classList.add('active');
      dom.laserToggleBtn.addEventListener('click', toggleLaserMode);
    }

    let mouseX = -100, mouseY = -100;
    let currentX = -100, currentY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function updatePointer() {
      currentX += (mouseX - currentX) * 0.35;
      currentY += (mouseY - currentY) * 0.35;

      if (dom.presenterPointer && state.isLaserActive) {
        dom.presenterPointer.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      requestAnimationFrame(updatePointer);
    }
    requestAnimationFrame(updatePointer);

    // Click Shockwave Ripple
    window.addEventListener('mousedown', (e) => {
      if (!state.isLaserActive || !dom.pointerClickRipple) return;
      dom.pointerClickRipple.style.left = `${e.clientX}px`;
      dom.pointerClickRipple.style.top = `${e.clientY}px`;
      dom.pointerClickRipple.classList.remove('rippling');
      void dom.pointerClickRipple.offsetWidth;
      dom.pointerClickRipple.classList.add('rippling');
    });
  }

  function toggleLaserMode() {
    state.isLaserActive = !state.isLaserActive;
    document.body.classList.toggle('laser-mode', state.isLaserActive);
    if (dom.laserToggleBtn) {
      dom.laserToggleBtn.classList.toggle('active', state.isLaserActive);
    }
  }

  // ==========================================================================
  // 100% COMPLETE BILINGUAL KHMER / ENGLISH ENGINE (NON-DESTRUCTIVE DOM SWAP)
  // Swaps the entire slide content so all cards, tables, badges & forms are translated
  // ==========================================================================
  function toggleLanguage() {
    try { localStorage.setItem('powerapps_presentation_lang', !isKhmerActive ? 'km' : 'en'); } catch(e){}
    state.isKhmer = !state.isKhmer;
    document.body.classList.toggle('khmer-mode', state.isKhmer);

    if (dom.langLabel) {
      dom.langLabel.textContent = state.isKhmer ? "English (ភាសាអង់គ្លេស)" : "ភាសាខ្មែរ (Khmer)";
    }

    if (state.isKhmer) {
      // Apply full Khmer markup across all slides
      dom.slides.forEach((slide, idx) => {
        const contentEl = slide.querySelector('.slide-content');
        if (contentEl && KHMER_SLIDES[idx]) {
          contentEl.innerHTML = KHMER_SLIDES[idx].content;
        }
      });
    } else {
      // Restore original English markup across all slides
      dom.slides.forEach((slide, idx) => {
        const contentEl = slide.querySelector('.slide-content');
        if (contentEl && slideOriginals[idx]) {
          contentEl.innerHTML = slideOriginals[idx].content;
        }
      });
    }

    // Re-bind interactive widget listeners after DOM swap!
    rebindInteractiveWidgets();
    updateSlideStatusUI();
  }

  function initLanguageSwitcher() {
    if (dom.langSwitchBtn) {
      dom.langSwitchBtn.addEventListener('click', toggleLanguage);
    }
  }

  function rebindInteractiveWidgets() {
    const heroBtn = document.getElementById('hero-start-btn');
    if (heroBtn) heroBtn.addEventListener('click', nextSlide);

    // Rebind Prerequisite Reveal Buttons
    const revealBtns = document.querySelectorAll('.ret-reveal-btn');
    revealBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetId = e.currentTarget.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.classList.toggle('revealed');
          e.currentTarget.textContent = targetEl.classList.contains('revealed') ? 
            (state.isKhmer ? "លាក់ចម្លើយ" : "Hide Answer") : 
            (state.isKhmer ? "បង្ហាញចម្លើយ" : "Reveal Answer");
        }
      });
    });

    initSchemaWorkbench();
    initSimulator();
    initQuiz();
    initSolutionReveal();
  }

  // ==========================================================================
  // TRAINER NOTES DRAWER & SLIDE OVERVIEW MODAL
  // ==========================================================================
  function initNotesDrawer() {
    if (dom.notesToggleBtn) dom.notesToggleBtn.addEventListener('click', toggleNotesDrawer);
    if (dom.notesCloseBtn) dom.notesCloseBtn.addEventListener('click', closeAllModals);
  }

  function toggleNotesDrawer() {
    state.isNotesOpen = !state.isNotesOpen;
    if (dom.notesDrawer) dom.notesDrawer.classList.toggle('open', state.isNotesOpen);
    if (state.isNotesOpen) updateNotesContent();
  }

  function updateNotesContent() {
    if (!dom.notesDrawerContent) return;
    const currentSlideEl = dom.slides[state.currentSlide - 1];
    if (!currentSlideEl) return;
    const notesEl = currentSlideEl.querySelector('.trainer-notes');
    if (notesEl) {
      dom.notesDrawerContent.innerHTML = notesEl.innerHTML;
    } else {
      dom.notesDrawerContent.innerHTML = '<p><em>No trainer script recorded for this slide.</em></p>';
    }
  }

  function initOverviewModal() {
    if (dom.overviewToggleBtn) dom.overviewToggleBtn.addEventListener('click', toggleOverviewModal);
    if (dom.overviewCloseBtn) dom.overviewCloseBtn.addEventListener('click', closeAllModals);

    // Build 24 overview thumbnail cards
    if (dom.overviewGrid) {
      dom.overviewGrid.innerHTML = '';
      dom.slides.forEach((slide, idx) => {
        const card = document.createElement('div');
        card.className = `overview-card ${idx === 0 ? 'active' : ''}`;
        card.dataset.slideNum = idx + 1;
        card.innerHTML = `
          <span class="overview-card-num">Slide ${String(idx + 1).padStart(2, '0')}</span>
          <span class="overview-card-title">${slide.getAttribute('data-title') || 'Scene ' + (idx + 1)}</span>
        `;
        card.addEventListener('click', () => {
          goToSlide(idx + 1);
          closeAllModals();
        });
        dom.overviewGrid.appendChild(card);
      });
    }
  }

  function toggleOverviewModal() {
    state.isOverviewOpen = !state.isOverviewOpen;
    if (dom.overviewModal) dom.overviewModal.classList.toggle('open', state.isOverviewOpen);
    if (state.isOverviewOpen) updateOverviewActiveState();
  }

  function updateOverviewActiveState() {
    const cards = document.querySelectorAll('.overview-card');
    cards.forEach((card, idx) => {
      card.classList.toggle('active', idx + 1 === state.currentSlide);
    });
  }

  function closeAllModals() {
    state.isNotesOpen = false;
    state.isOverviewOpen = false;
    if (dom.notesDrawer) dom.notesDrawer.classList.remove('open');
    if (dom.overviewModal) dom.overviewModal.classList.remove('open');
  }

  function initFullscreenToggle() {
    if (dom.fullscreenToggleBtn) {
      dom.fullscreenToggleBtn.addEventListener('click', toggleFullscreen);
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  // ==========================================================================
  // WIDGET 1: INTERACTIVE SCHEMA ARCHITECT WORKBENCH (SLIDE 12)
  // ==========================================================================
  function initSchemaWorkbench() {
    const stepSelect = document.getElementById('wb-process-step');
    const questionSelect = document.getElementById('wb-process-question');
    const fieldNameInput = document.getElementById('wb-field-name');
    const dataTypeInput = document.getElementById('wb-data-type');
    const specTable = document.getElementById('wb-spec-table');
    const specType = document.getElementById('wb-spec-type');
    const specRole = document.getElementById('wb-spec-role');
    const powerfxCode = document.getElementById('wb-powerfx-code');
    const isRequiredCheck = document.getElementById('wb-is-required');

    if (!stepSelect || !questionSelect) return;

    function populateQuestions(stepVal) {
      questionSelect.innerHTML = '';
      const questions = WORKBENCH_DATA[stepVal] || [];
      questions.forEach((item, qIdx) => {
        const opt = document.createElement('option');
        opt.value = qIdx;
        opt.textContent = state.isKhmer ? item.questionKh : item.questionEn;
        questionSelect.appendChild(opt);
      });
      updateSpecs(stepVal, 0);
    }

    function updateSpecs(stepVal, qIdx) {
      const qList = WORKBENCH_DATA[stepVal];
      if (!qList || !qList[qIdx]) return;
      const data = qList[qIdx];

      if (fieldNameInput) fieldNameInput.value = data.fieldName;
      if (dataTypeInput) dataTypeInput.value = data.dataType;
      if (specTable) specTable.textContent = data.table;
      if (specType) specType.textContent = data.specType;
      if (specRole) specRole.textContent = state.isKhmer ? data.roleKh : data.roleEn;
      if (powerfxCode) powerfxCode.textContent = data.powerfx;
    }

    stepSelect.addEventListener('change', (e) => {
      populateQuestions(e.target.value);
    });

    questionSelect.addEventListener('change', (e) => {
      updateSpecs(stepSelect.value, parseInt(e.target.value, 10));
    });

    if (isRequiredCheck) {
      isRequiredCheck.addEventListener('change', () => {
        if (!powerfxCode) return;
        const currentData = WORKBENCH_DATA[stepSelect.value][parseInt(questionSelect.value, 10)];
        if (!currentData) return;
        if (isRequiredCheck.checked) {
          powerfxCode.textContent = currentData.powerfx;
        } else {
          powerfxCode.textContent = `// Field is optional. No safety gating required on submission.\nbtnSubmit.DisplayMode = DisplayMode.Edit;`;
        }
      });
    }

    // Initial population
    populateQuestions("1");
  }

  // ==========================================================================
  // WIDGET 2: 6-SCENARIO SIMULATOR (SLIDE 18)
  // ==========================================================================
  let simCurrentIndex = 0;
  let simSolvedCount = 0;
  const simSolvedState = [false, false, false, false, false, false];

  function initSimulator() {
    const cardBody = document.getElementById('sim-card-body');
    const prevBtn = document.getElementById('sim-prev-btn');
    const nextBtn = document.getElementById('sim-next-btn');

    if (!cardBody) return;

    function renderScenario(idx) {
      const sc = SIMULATOR_SCENARIOS[idx];
      if (!sc) return;

      const progressText = document.getElementById('sim-progress-text');
      const scoreDisplay = document.getElementById('sim-score');
      const scNum = document.getElementById('sim-scenario-num');
      const scTitle = document.getElementById('sim-scenario-title');
      const scDesc = document.getElementById('sim-scenario-desc');
      const choicesRow = cardBody.querySelector('.sim-choices-row');
      const feedbackBox = document.getElementById('sim-feedback');

      if (progressText) {
        progressText.textContent = state.isKhmer ? `ស្ថានភាពទី ${idx + 1} នៃ ៦` : `Scenario ${idx + 1} of 6`;
      }
      if (scoreDisplay) scoreDisplay.textContent = simSolvedCount;
      if (scNum) scNum.textContent = state.isKhmer ? `ស្ថានភាព ${idx + 1}` : sc.num;
      if (scTitle) scTitle.textContent = state.isKhmer ? sc.titleKh : sc.titleEn;
      if (scDesc) scDesc.textContent = state.isKhmer ? sc.descKh : sc.descEn;

      if (feedbackBox) {
        feedbackBox.style.display = 'none';
        feedbackBox.className = 'sim-feedback-box';
      }

      // Render choice buttons
      if (choicesRow) {
        choicesRow.innerHTML = '';
        const buttons = sc.customButtons || [
          { id: "text", label: state.isKhmer ? "អត្ថបទខ្លី (Text)" : "Single Line of Text", icon: "🔤" },
          { id: "decimal", label: state.isKhmer ? "លេខទសភាគ (Decimal Number)" : "Decimal Number", icon: "🔢" },
          { id: "choice", label: state.isKhmer ? "ជម្រើសទម្លាក់ចុះ (Choice)" : "Choice Dropdown", icon: "📋" }
        ];

        buttons.forEach(btnData => {
          const btn = document.createElement('button');
          btn.className = 'sim-choice-btn';
          btn.dataset.choice = btnData.id;
          btn.innerHTML = `<span class="choice-icon">${btnData.icon}</span><span>${btnData.label}</span>`;
          btn.addEventListener('click', () => evaluateSimChoice(btnData.id, sc, btn, choicesRow));
          choicesRow.appendChild(btn);
        });
      }

      if (prevBtn) prevBtn.disabled = (idx === 0);
      if (nextBtn) {
        if (idx === SIMULATOR_SCENARIOS.length - 1) {
          nextBtn.textContent = state.isKhmer ? "បានបញ្ចប់" : "Completed";
        } else {
          nextBtn.textContent = state.isKhmer ? "ស្ថានភាពបន្ទាប់ ➔" : "Next Scenario ➔";
        }
      }
    }

    function evaluateSimChoice(choiceId, sc, clickedBtn, container) {
      const targetCorrect = sc.correctId || sc.correct;
      const feedbackBox = document.getElementById('sim-feedback');
      const allBtns = container.querySelectorAll('.sim-choice-btn');

      allBtns.forEach(b => b.classList.remove('correct', 'wrong'));

      if (choiceId === targetCorrect) {
        clickedBtn.classList.add('correct');
        if (!simSolvedState[simCurrentIndex]) {
          simSolvedState[simCurrentIndex] = true;
          simSolvedCount++;
          const scoreDisplay = document.getElementById('sim-score');
          if (scoreDisplay) scoreDisplay.textContent = simSolvedCount;
        }

        if (feedbackBox) {
          feedbackBox.style.display = 'block';
          feedbackBox.style.borderLeftColor = 'var(--fluent-green-light)';
          feedbackBox.innerHTML = `<strong>${state.isKhmer ? "ត្រឹមត្រូវ!" : "Correct!"}</strong> ${state.isKhmer ? sc.explCorrectKh : sc.explCorrectEn}`;
        }
      } else {
        clickedBtn.classList.add('wrong');
        if (feedbackBox) {
          feedbackBox.style.display = 'block';
          feedbackBox.style.borderLeftColor = 'var(--fluent-red-light)';
          feedbackBox.innerHTML = `<strong>${state.isKhmer ? "មិនទាន់ត្រឹមត្រូវទេ៖" : "Incorrect:"}</strong> ${state.isKhmer ? sc.explWrongKh : sc.explWrongEn}`;
        }
      }
    }

    if (prevBtn) {
      prevBtn.onclick = () => {
        if (simCurrentIndex > 0) {
          simCurrentIndex--;
          renderScenario(simCurrentIndex);
        }
      };
    }

    if (nextBtn) {
      nextBtn.onclick = () => {
        if (simCurrentIndex < SIMULATOR_SCENARIOS.length - 1) {
          simCurrentIndex++;
          renderScenario(simCurrentIndex);
        }
      };
    }

    renderScenario(0);
  }

  // ==========================================================================
  // WIDGET 3: 5-QUESTION QUIZ (SLIDE 20)
  // ==========================================================================
  let quizCurrentIndex = 0;
  let quizScore = 0;
  const quizAnswered = [false, false, false, false, false];

  function initQuiz() {
    const titleEl = document.getElementById('quiz-title');
    const optionsGrid = document.getElementById('quiz-options');
    const prevBtn = document.getElementById('quiz-prev-btn');
    const nextBtn = document.getElementById('quiz-next-btn');

    if (!titleEl || !optionsGrid) return;

    function renderQuestion(idx) {
      const q = QUIZ_QUESTIONS[idx];
      if (!q) return;

      const counterEl = document.getElementById('quiz-question-counter');
      const scoreDisplay = document.getElementById('quiz-score-display');
      const feedbackBox = document.getElementById('quiz-feedback');

      if (counterEl) {
        counterEl.textContent = state.isKhmer ? `សំណួរទី ${idx + 1} នៃ ៥` : `Question ${idx + 1} of 5`;
      }
      if (scoreDisplay) scoreDisplay.textContent = quizScore;
      if (titleEl) titleEl.textContent = state.isKhmer ? q.titleKh : q.titleEn;

      if (feedbackBox) feedbackBox.style.display = 'none';

      optionsGrid.innerHTML = '';
      const options = state.isKhmer ? q.optionsKh : q.optionsEn;

      options.forEach((optText, optIdx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.textContent = optText;
        btn.addEventListener('click', () => evaluateQuizAnswer(optIdx, q, btn, optionsGrid));
        optionsGrid.appendChild(btn);
      });

      if (prevBtn) prevBtn.disabled = (idx === 0);
      if (nextBtn) {
        if (idx === QUIZ_QUESTIONS.length - 1) {
          nextBtn.textContent = state.isKhmer ? "បានបញ្ចប់" : "Completed";
        } else {
          nextBtn.textContent = state.isKhmer ? "សំណួរបន្ទាប់ ➔" : "Next Question ➔";
        }
      }
    }

    function evaluateQuizAnswer(selectedIdx, q, clickedBtn, container) {
      const feedbackBox = document.getElementById('quiz-feedback');
      const allBtns = container.querySelectorAll('.quiz-option-btn');
      allBtns.forEach(b => b.disabled = true);

      if (selectedIdx === q.correct) {
        clickedBtn.classList.add('correct');
        if (!quizAnswered[quizCurrentIndex]) {
          quizAnswered[quizCurrentIndex] = true;
          quizScore++;
          const scoreDisplay = document.getElementById('quiz-score-display');
          if (scoreDisplay) scoreDisplay.textContent = quizScore;
        }

        if (feedbackBox) {
          feedbackBox.style.display = 'block';
          feedbackBox.style.borderLeftColor = 'var(--fluent-green-light)';
          feedbackBox.innerHTML = `<strong>${state.isKhmer ? "ត្រឹមត្រូវ!" : "Correct!"}</strong> ${state.isKhmer ? q.explanationKh : q.explanationEn}`;
        }
      } else {
        clickedBtn.classList.add('wrong');
        if (allBtns[q.correct]) allBtns[q.correct].classList.add('correct');

        if (feedbackBox) {
          feedbackBox.style.display = 'block';
          feedbackBox.style.borderLeftColor = 'var(--fluent-red-light)';
          feedbackBox.innerHTML = `<strong>${state.isKhmer ? "មិនទាន់ត្រឹមត្រូវទេ៖" : "Incorrect:"}</strong> ${state.isKhmer ? q.explanationKh : q.explanationEn}`;
        }
      }
    }

    if (prevBtn) {
      prevBtn.onclick = () => {
        if (quizCurrentIndex > 0) {
          quizCurrentIndex--;
          renderQuestion(quizCurrentIndex);
        }
      };
    }

    if (nextBtn) {
      nextBtn.onclick = () => {
        if (quizCurrentIndex < QUIZ_QUESTIONS.length - 1) {
          quizCurrentIndex++;
          renderQuestion(quizCurrentIndex);
        }
      };
    }

    renderQuestion(0);
  }

  // ==========================================================================
  // WIDGET 4: CAPSTONE BENCHMARK SOLUTION TOGGLE (SLIDE 22)
  // ==========================================================================
  function initSolutionReveal() {
    const revealBtn = document.getElementById('btn-reveal-solution');
    const drawer = document.getElementById('solution-content');
    const btnText = document.getElementById('solution-btn-text');
    const btnIcon = document.getElementById('solution-btn-icon');

    if (!revealBtn || !drawer) return;

    revealBtn.onclick = () => {
      const isCollapsed = drawer.classList.contains('collapsed');
      drawer.classList.toggle('collapsed');
      if (btnText && btnIcon) {
        if (isCollapsed) {
          btnText.textContent = state.isKhmer ? "លាក់តារាងចម្លើយគំរូ" : "Hide Benchmark Solution Matrix";
          btnIcon.textContent = "🙈";
        } else {
          btnText.textContent = state.isKhmer ? "បង្ហាញតារាងចម្លើយគំរូស្តង់ដារ" : "Reveal Benchmark Solution Matrix";
          btnIcon.textContent = "👁️";
        }
      }
    };
  }

  // Universal Window Exports for inline HUD onclick handlers
  window.prevSlide = prevSlide;
  window.nextSlide = nextSlide;
  window.goToSlide = goToSlide;
  window.showSlide = goToSlide;
  window.toggleLanguage = toggleLanguage;
  window.toggleNotes = toggleNotesDrawer;
  window.toggleOverview = toggleOverviewModal;
  window.toggleTimer = toggleTimer;
  window.toggleFullscreen = toggleFullscreen;
  window.toggleLaser = toggleLaserMode;

})();



    window.addEventListener('mousemove', (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    }, { passive: true });


// Universal Day 25 HUD Global Event Bridge
(function() {
  if (typeof window.prevSlide !== 'function' && typeof prevSlide === 'function') window.prevSlide = prevSlide;
  if (typeof window.nextSlide !== 'function' && typeof nextSlide === 'function') window.nextSlide = nextSlide;
  if (typeof window.toggleLanguage !== 'function' && typeof toggleLanguage === 'function') window.toggleLanguage = toggleLanguage;
  if (typeof window.toggleLaser !== 'function') {
    if (typeof toggleLaser === 'function') window.toggleLaser = toggleLaser;
    else window.toggleLaser = function() {
      const laser = document.getElementById('laser-pointer') || document.getElementById('presenter-laser');
      const btn = document.getElementById('btn-laser');
      if (laser) {
        const isHidden = laser.style.display === 'none' || laser.classList.contains('hidden');
        if (isHidden) {
          laser.style.display = 'block';
          laser.classList.remove('hidden');
          if (btn) btn.classList.add('active');
        } else {
          laser.style.display = 'none';
          laser.classList.add('hidden');
          if (btn) btn.classList.remove('active');
        }
      }
    };
  }
  if (typeof window.toggleNotes !== 'function') {
    if (typeof togglePresenterNotes === 'function') window.toggleNotes = togglePresenterNotes;
    else if (typeof toggleNotes === 'function') window.toggleNotes = toggleNotes;
    else window.toggleNotes = function() {
      const panel = document.getElementById('notes-drawer') || document.getElementById('presenter-notes-panel') || document.getElementById('trainer-notes-modal');
      if (panel) {
        panel.classList.toggle('open');
        panel.classList.toggle('hidden');
      }
    };
  }
  if (typeof window.toggleOverview !== 'function') {
    if (typeof toggleOverviewModal === 'function') window.toggleOverview = toggleOverviewModal;
    else if (typeof toggleOverview === 'function') window.toggleOverview = toggleOverview;
    else if (typeof openOverview === 'function' && typeof closeOverview === 'function') {
      window.toggleOverview = function() {
        const modal = document.getElementById('overview-modal');
        if (modal && (modal.classList.contains('hidden') || getComputedStyle(modal).display === 'none')) {
          openOverview();
        } else if (modal) {
          closeOverview();
        }
      };
    }
  }
  if (typeof window.toggleTimer !== 'function') {
    if (typeof toggleTimer === 'function') window.toggleTimer = toggleTimer;
    else window.toggleTimer = function() {
      const timerBtn = document.getElementById('timer-toggle-btn');
      if (timerBtn) timerBtn.click();
    };
  }
  if (typeof window.toggleFullscreen !== 'function') {
    if (typeof toggleFullscreen === 'function') window.toggleFullscreen = toggleFullscreen;
    else window.toggleFullscreen = function() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    };
  }
})();
