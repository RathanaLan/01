/**
 * POWER APPS FOUNDATION: DAY 10 PRESENTATION ENGINE
 * Topic: Records and Tables: Storing Many Cases
 * Phase: Phase 4: Data Architecture
 * Architecture: Zero-dependency vanilla JavaScript engine with full non-destructive bilingual DOM swapping
 * Features:
 *  - 24-Slide 16:9 Stage Navigation & Morph Transitions
 *  - 90-Minute Agenda Live Activity Timer
 *  - Presenter Focus Laser Pointer & Click Shockwave Ripple Engine
 *  - 100% COMPLETE Bilingual Khmer / English Engine (Exact 1-to-1 DOM Mirroring for all 24 slides)
 *  - 4 Interactive Pedagogical Widgets:
 *      1. Records & Tables Constructor (Slide 12)
 *      2. Multi-Scenario Data Structure Simulator (Slide 18)
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
    fullscreenBtn: document.getElementById('fullscreen-btn'),

    // Drawers & Modals
    notesDrawer: document.getElementById('notes-drawer'),
    notesContent: document.getElementById('notes-content'),
    notesCloseBtn: document.getElementById('notes-close-btn'),
    overviewModal: document.getElementById('overview-modal'),
    overviewGrid: document.getElementById('overview-grid'),
    overviewCloseBtn: document.getElementById('overview-close-btn'),

    // Laser & Pointer
    presenterPointer: document.getElementById('presenter-pointer'),
    pointerClickRipple: document.getElementById('pointer-click-ripple')
  };

  // ==========================================================================
  // COMPLETE KHMER SLIDES DICTIONARY (24 SLIDES - EXACT 1-TO-1 DOM REPLACEMENT)
  // High-standard, beautiful Khmer with famous fonts (Moul, Siemreap, Battambang)
  // ==========================================================================
  const KHMER_SLIDES = [
    // Slide 1: Welcome & Hero
    {
      title: "ស្វាគមន៍ & គោលដៅមេរៀន",
      segment: "វគ្គ ១៖ ស្វាគមន៍ & រំលឹកចំណេះដឹងចាស់",
      content: `
        <div class="hero-badge-row">
          <span class="pill pill-phase">ដំណាក់កាលទី ៤៖ ស្ថាបត្យកម្មទិន្នន័យ</span>
          <span class="pill pill-accent">មូលដ្ឋានគ្រឹះ Citizen Developer</span>
          <span class="pill pill-time">⏱️ ៩០ នាទីគត់</span>
        </div>
        
        <h1 class="hero-title">កំណត់ត្រា និងតារាង៖ ការផ្ទុកទិន្នន័យច្រើនករណី</h1>
        <p class="hero-subtitle">
          របៀបដែលកម្មវិធីរៀបចំករណីការងារជាច្រើនឱ្យមានរបៀបរៀបរយ អាចស្វែងរកបាន ដោយមិនបាត់បង់ប្រវត្តិទិន្នន័យចាស់ៗ។
        </p>

        <div class="hero-connection-card">
          <span class="chain-label">ខ្សែសង្វាក់តភ្ជាប់ស្នូលថ្ងៃនេះ (CONNECTION CHAIN)</span>
          <div class="chain-nodes">
            <span class="chain-node">១ ករណីការងារ = ១ Record</span>
            <span class="chain-arrow">➔</span>
            <span class="chain-node">ជួរឈររួមគ្នា = Columns</span>
            <span class="chain-arrow">➔</span>
            <span class="chain-node active">កំណត់ត្រាច្រើន = Table</span>
          </div>
        </div>

        <div class="hero-action-row">
          <button class="fluent-btn-primary" id="btn-start-presentation">
            <span>ចាប់ផ្តើមមេរៀន (Space / ➔)</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
          <span class="hero-hint">ចុច <strong>L</strong> សម្រាប់ភាសាខ្មែរ • <strong>P</strong> សម្រាប់ Laser Pointer • <strong>N</strong> សម្រាប់កំណត់ត្រាគ្រូ</span>
        </div>
      `
    },

    // Slide 2: Curriculum Blueprint
    {
      title: "ដំណើរកម្មវិធីសិក្សា ២៧ ថ្ងៃ",
      segment: "វគ្គ ១៖ ស្វាគមន៍ & រំលឹកចំណេះដឹងចាស់",
      content: `
        <div class="slide-header">
          <span class="section-tag">ដំណើរកម្មវិធីសិក្សា ២៧ ថ្ងៃ</span>
          <h2>ទីតាំងបច្ចុប្បន្ន៖ ឈានចូលដំណាក់កាលទី ៤ (ទិន្នន័យ)</h2>
          <p class="subtitle">ពីការគិតបែបអាជីវកម្ម ឈានទៅរកស្ថាបត្យកម្មទិន្នន័យសហគ្រាស។</p>
        </div>

        <div class="curr-map-grid">
          <div class="curr-card passed">
            <div class="card-phase">វគ្គ ១៖ មូលដ្ឋានគ្រឹះ</div>
            <div class="card-days">ថ្ងៃ ១ – ៣</div>
            <div class="card-title">បញ្ហាពិត, លំដាប់ &amp; ប្រភេទទិន្នន័យ</div>
            <div class="card-status">✓ បានបញ្ចប់</div>
          </div>
          <div class="curr-card passed">
            <div class="card-phase">វគ្គ ២៖ តក្កវិជ្ជា &amp; ការសម្រេចចិត្ត</div>
            <div class="card-days">ថ្ងៃ ៤ – ៦</div>
            <div class="card-title">លក្ខខណ្ឌ, IF ទោល &amp; ទ្វារ AND/OR</div>
            <div class="card-status">✓ បានបញ្ចប់</div>
          </div>
          <div class="curr-card passed">
            <div class="card-phase">វគ្គ ៣៖ ការគិតបែបអាជីវកម្ម</div>
            <div class="card-days">ថ្ងៃ ៧ – ៩</div>
            <div class="card-title">ឱកាស, ស្ថានភាព &amp; លំហូរទាំងមូល</div>
            <div class="card-status">✓ បានបញ្ចប់</div>
          </div>
          <div class="curr-card active-card">
            <div class="card-phase">វគ្គ ៤៖ ទិន្នន័យ (ថ្ងៃនេះ!)</div>
            <div class="card-days">ថ្ងៃ ១០ – ១២</div>
            <div class="card-title">កំណត់ត្រា &amp; តារាង៖ ការផ្ទុកទិន្នន័យច្រើនករណី</div>
            <div class="card-status">▶ កំពុងរៀនថ្ងៃនេះ</div>
          </div>
          <div class="curr-card future">
            <div class="card-phase">វគ្គ ៥៖ UI &amp; Galleries</div>
            <div class="card-days">ថ្ងៃ ១៣ – ១៦</div>
            <div class="card-title">ការបង្ហាញតារាងជាមួយ Galleries &amp; Forms</div>
            <div class="card-status">🔒 សប្តាហ៍ក្រោយ</div>
          </div>
          <div class="curr-card future">
            <div class="card-phase">វគ្គ ៦ &amp; ៧៖ កម្មវិធីពេញលេញ</div>
            <div class="card-days">ថ្ងៃ ១៧ – ២៧</div>
            <div class="card-title">តក្កវិជ្ជា Power Fx, ការផ្ទុកទិន្នន័យ &amp; ដាក់ឱ្យប្រើប្រាស់</div>
            <div class="card-status">🔒 គម្រោងបញ្ចប់</div>
          </div>
        </div>
      `
    },

    // Slide 3: 4 Learning Objectives
    {
      title: "គោលបំណងសិក្សាទាំង ៤",
      segment: "វគ្គ ១៖ ស្វាគមន៍ & រំលឹកចំណេះដឹងចាស់",
      content: `
        <div class="slide-header">
          <span class="section-tag">Bloom's Revised Taxonomy</span>
          <h2>គោលបំណងសិក្សាទាំង ៤ នៃថ្ងៃទី ១០</h2>
          <p class="subtitle">អ្វីដែលសិក្ខាកាមចាប់ផ្តើមពីសូន្យនឹងអាចធ្វើបានដោយឯករាជ្យនៅនាទីទី ៩០:០០។</p>
        </div>

        <div class="objectives-grid">
          <div class="obj-card">
            <div class="obj-header">
              <span class="obj-badge bloom-l4">Bloom L4: ការវិភាគ</span>
              <span class="obj-num">01</span>
            </div>
            <h3>ការបែងចែករចនាសម្ព័ន្ធ</h3>
            <p>បែងចែកបានត្រឹមត្រូវ ១០០% រវាង <strong>Single Value</strong>, <strong>Single Record</strong> (១ ករណី), និង <strong>Table</strong> (បណ្តុំនៃករណីជាច្រើន)។</p>
          </div>

          <div class="obj-card">
            <div class="obj-header">
              <span class="obj-badge bloom-l3">Bloom L3: ការអនុវត្ត</span>
              <span class="obj-num">02</span>
            </div>
            <h3>ការបំប្លែងទម្រង់ទៅជា Record</h3>
            <p>បំប្លែងទម្រង់ក្រដាសក្នុងរោងចក្រ (សំបុត្រជួសជុល, ប័ណ្ណស្នើទិញ, ប័ណ្ណភ្ញៀវ) ទៅជា <strong>Record</strong> ដែលមានជួរឈរ និងប្រភេទច្បាស់លាស់។</p>
          </div>

          <div class="obj-card">
            <div class="obj-header">
              <span class="obj-badge bloom-l3">Bloom L3: ការអនុវត្ត</span>
              <span class="obj-num">03</span>
            </div>
            <h3>វេយ្យាករណ៍ Power Fx</h3>
            <p>អាន និងសរសេររូបមន្ត Power Fx ដោយប្រើវង់ក្រចកទម្រង់ <code>{ }</code> សម្រាប់ Record, <code>[ ]</code> សម្រាប់ Table, និងសញ្ញាចុច <code>.</code> សម្រាប់ទាញយកជួរឈរ។</p>
          </div>

          <div class="obj-card">
            <div class="obj-header">
              <span class="obj-badge bloom-l5">Bloom L5: ការវាយតម្លៃ</span>
              <span class="obj-num">04</span>
            </div>
            <h3>ស្ថាបត្យកម្មតារាងផ្ទុកច្រើនករណី</h3>
            <p>រចនាប្លង់តារាង Dataverse ៥ ជួរឈរសម្រាប់ Apex Plastics ដែលអាចផ្ទុកសំណើជួសជុលរាប់រយក្នុងពេលតែមួយដោយមិនបាត់បង់ទិន្នន័យ។</p>
          </div>
        </div>
      `
    },

    // Slide 4: 90-Minute Agenda
    {
      title: "កាលវិភាគបង្រៀន ៩០ នាទី",
      segment: "វគ្គ ១៖ ស្វាគមន៍ & រំលឹកចំណេះដឹងចាស់",
      content: `
        <div class="slide-header">
          <span class="section-tag">កាលវិភាគបង្រៀន ៩០ នាទី</span>
          <h2>របៀបវារៈបង្រៀនតាមលំដាប់លំដោយ ៩០ នាទី</h2>
          <p class="subtitle">រចនាសម្ព័ន្ធបង្រៀនច្បាស់លាស់ មានពេលសម្រាកបន្ធូរអារម្មណ៍ និងការអនុវត្តផ្ទាល់។</p>
        </div>

        <div class="agenda-timeline">
          <div class="time-block">
            <div class="time-stamp">០០:០០ – ១០:០០ (១០ នាទី)</div>
            <div class="time-badge phase-recall">វគ្គ ១៖ រំលឹក &amp; តភ្ជាប់</div>
            <div class="time-content">
              <strong>ការរំលឹកចំណេះដឹងចាស់៖</strong> ភ្ជាប់តម្លៃទិន្នន័យថ្ងៃទី ៣ និងលំហូរការងារថ្ងៃទី ៩ ឆ្ពោះទៅរកតម្រូវការផ្ទុកទិន្នន័យអចិន្ត្រៃយ៍។
            </div>
          </div>

          <div class="time-block">
            <div class="time-stamp">១០:០០ – ២៥:០០ (១៥ នាទី)</div>
            <div class="time-badge phase-discover">វគ្គ ២៖ ស្វែងយល់ (មូលហេតុ)</div>
            <div class="time-content">
              <strong>មហន្តរាយ $64,000៖</strong> មូលហេតុដែល Variable តែមួយមិនអាចប្រើបាន។ ឧទាហរណ៍របារព្យួរក្រដាសកុម្ម៉ង់ម្ហូប &amp; ប្រអប់ដាក់កាត។
            </div>
          </div>

          <div class="time-block">
            <div class="time-stamp">២៥:០០ – ៤៥:០០ (២០ នាទី)</div>
            <div class="time-badge phase-theory">វគ្គ ៣៖ ទ្រឹស្តីស៊ីជម្រៅ</div>
            <div class="time-content">
              <strong>រចនាសម្ព័ន្ធទិន្នន័យ (Data Structure) &amp; វេយ្យាករណ៍ Power Fx៖</strong> Cells ➔ Columns ➔ Records ➔ Tables។ វង់ក្រចកទម្រង់ <code>{ }</code> និងសញ្ញាចុច (.)។
            </div>
          </div>

          <div class="time-block">
            <div class="time-stamp">៤៥:០០ – ៦០:០០ (១៥ នាទី)</div>
            <div class="time-badge phase-demo">វគ្គ ៤៖ បង្ហាញ &amp; អនុវត្តជាក់ស្តែង</div>
            <div class="time-content">
              <strong>សម្រាកបន្ធូរអារម្មណ៍ &amp; បង្ហាញឧបករណ៍ផ្ទាល់៖</strong> ការបញ្ចូល Record ទៅក្នុងតារាងផ្ទាល់ និងការប្រើ <code>Filter()</code> ព្រមទាំង <code>CountRows()</code>។
            </div>
          </div>

          <div class="time-block">
            <div class="time-stamp">៦០:០០ – ៧៥:០០ (១៥ នាទី)</div>
            <div class="time-badge phase-practice">វគ្គ ៥៖ អនុវត្តរួមគ្នា</div>
            <div class="time-content">
              <strong>ការវិភាគ ៦ ស្ថានភាព៖</strong> ការអនុវត្តរួមគ្នាក្នុងថ្នាក់ដើម្បីបែងចែក Values, Records និង Tables។ ការយល់ច្រឡំគ្រោះថ្នាក់ទាំង ៤។
            </div>
          </div>

          <div class="time-block">
            <div class="time-stamp">៧៥:០០ – ៩០:០០ (១៥ នាទី)</div>
            <div class="time-badge phase-assess">វគ្គ ៦៖ វាយតម្លៃ &amp; តភ្ជាប់ទៅមុខ</div>
            <div class="time-content">
              <strong>សំណួរវាស់ស្ទង់ ៥ សំណួរ &amp; លំហាត់ប្រឈម៖</strong> ការរចនាតារាងសម្រាប់ Apex Plastics, ដំណោះស្រាយគំរូ &amp; ស្ពានឆ្ពោះទៅថ្ងៃទី ១១។
            </div>
          </div>
        </div>
      `
    },

    // Slide 5: Prerequisite Retrieval
    {
      title: "ការរំលឹកចំណេះដឹងចាស់",
      segment: "វគ្គ ១៖ ស្វាគមន៍ & រំលឹកចំណេះដឹងចាស់",
      content: `
        <div class="slide-header">
          <span class="section-tag">ការរំលឹកចំណេះដឹងចាស់</span>
          <h2>រំលឹកអ្វីដែលអ្នកបានដឹងរួចមកហើយ (ថ្ងៃទី ៣ &amp; ៩)</h2>
          <p class="subtitle">ឆ្លើយសំណួរទាំង ៣ នេះដើម្បីភ្ជាប់ការចងចាំរបស់អ្នកមកកាន់មេរៀនថ្ងៃនេះ។</p>
        </div>

        <div class="retrieval-deck">
          <div class="retrieval-card">
            <div class="card-prompt">
              <span class="retrieval-q-badge">សំណួរទី ១ (រំលឹកថ្ងៃទី ៣)</span>
              <h3>តើតម្លៃទិន្នន័យទោល (Value) គឺជាអ្វី ហើយវាមានប្រភេទស្តង់ដារអ្វីខ្លះ?</h3>
            </div>
            <button class="fluent-btn-secondary btn-reveal-answer" data-target="ret-ans-1">បង្ហាញចម្លើយគំរូ</button>
            <div class="retrieval-answer" id="ret-ans-1">
              <p><strong>ចម្លើយ៖</strong> គឺជា <strong>Value</strong>។ វាអាចជា អក្សរ (<code>"Press #6"</code>), លេខ (<code>42</code>), កាលបរិច្ឆេទ (<code>2026-10-30</code>), ប៊ូលីន (<code>True/False</code>), ឬ ជម្រើស (<code>Submitted</code>)។ វាជាព័ត៌មានទោលមួយដាច់ដោយឡែក។</p>
            </div>
          </div>

          <div class="retrieval-card">
            <div class="card-prompt">
              <span class="retrieval-q-badge">សំណួរទី ២ (រំលឹកថ្ងៃទី ៩)</span>
              <h3>ក្នុងលំហូរការងារកាលពីម្សិលមិញ តើបុគ្គលិកត្រូវកត់ត្រាព័ត៌មានអ្វីខ្លះពេលស្នើសុំជួសជុល?</h3>
            </div>
            <button class="fluent-btn-secondary btn-reveal-answer" data-target="ret-ans-2">បង្ហាញចម្លើយគំរូ</button>
            <div class="retrieval-answer" id="ret-ans-2">
              <p><strong>ចម្លើយ៖</strong> លេខសម្គាល់ម៉ាស៊ីន, ការពិពណ៌នាបញ្ហា, រូបថតខូចខាត, កម្រិតអាទិភាព, ការប៉ាន់ស្មានតម្លៃ, និងស្ថានភាពដំបូង (<code>Submitted</code>)។ ព័ត៌មានទាំងអស់នេះត្រូវនៅជាមួយគ្នា!</p>
            </div>
          </div>

          <div class="retrieval-card">
            <div class="card-prompt">
              <span class="retrieval-q-badge">សំណួរទី ៣ (ស្ពានតភ្ជាប់សំខាន់)</span>
              <h3>ប្រសិនបើកម្មវិធីរក្សាទុកម៉ាស៊ីនក្នុង Variable តែមួយ <code>varMachine</code> តើមានអ្វីកើតឡើងនៅពេលបុគ្គលិកទី ២ ផ្ញើសំណើថ្មី?</h3>
            </div>
            <button class="fluent-btn-secondary btn-reveal-answer" data-target="ret-ans-3">បង្ហាញចម្លើយគំរូ</button>
            <div class="retrieval-answer" id="ret-ans-3">
              <p><strong>ចម្លើយ៖</strong> <strong>មហន្តរាយកត់ត្រាជាន់គ្នា!</strong> សំណើទី ២ នឹងលុបសំណើទី ១ ចេញពីអង្គចងចាំភ្លាមៗ។ ព័ត៌មានម៉ាស៊ីនទី ១ នឹងត្រូវបាត់បង់ជារៀងរហូត!</p>
            </div>
          </div>
        </div>
      `
    },

    // Slide 6: The $64,000 Crisis
    {
      title: "មហន្តរាយ $64,000",
      segment: "វគ្គ ២៖ ស្វែងយល់ (មូលហេតុ)",
      content: `
        <div class="slide-header">
          <span class="section-tag section-tag-danger">ករណីសិក្សាជាក់ស្តែងក្នុងរោងចក្រ</span>
          <h2>មហន្តរាយ $64,000 ដោយសារ "ការកត់ត្រាជាន់គ្នា" នៅ Apex Plastics</h2>
          <p class="subtitle">អ្វីដែលកើតឡើងនៅពេលកម្មវិធីសាមញ្ញព្យាយាមគ្រប់គ្រងរោងចក្រដោយប្រើ Variable តែមួយ។</p>
        </div>

        <div class="crisis-story-grid">
          <div class="crisis-timeline-card">
            <div class="crisis-event">
              <span class="event-time">០៨:១៥ ព្រឹក</span>
              <div class="event-desc">
                <strong>អាសន្នសុវត្ថិភាពបន្ទាន់៖</strong> បុគ្គលិក Sothea នៅខ្សែសង្វាក់លេខ ១ ឃើញទឹកត្រជាក់បាញ់ចេញពីប៉ម Chiller Alpha។ គាត់បញ្ចូល <code>Tool: "Chiller Alpha"</code>, <code>Issue: "ស្នប់បូមទឹកខូច - បន្ទាន់"</code> ហើយចុច Submit។ កម្មវិធីរក្សាទុកក្នុង <code>varMachine</code> និង <code>varIssue</code>។
              </div>
            </div>
            <div class="crisis-event">
              <span class="event-time">០៨:២៥ ព្រឹក</span>
              <div class="event-desc">
                <strong>សំណើតូចតាច៖</strong> ១០ នាទីក្រោយមក បុគ្គលិក Chan នៅខ្សែសង្វាក់លេខ ១៤ ឃើញអំពូលភ្លើងតម្លៃ $15 ដាច់។ គាត់បញ្ចូល <code>Tool: "Station 14"</code>, <code>Issue: "ប្តូរអំពូល LED 12V"</code> ហើយចុច Submit។
              </div>
            </div>
            <div class="crisis-event fatal">
              <span class="event-time">០៨:២៦ ព្រឹក</span>
              <div class="event-desc">
                <strong>មហន្តរាយទិន្នន័យ៖</strong> ដោយសារកម្មវិធីប្រើ Variable តែមួយ មិនមែនជា <strong>Table of Records</strong> នោះទេ សំណើអំពូលភ្លើងរបស់ Chan បាន<strong>លុបជាន់លើ</strong>សំណើប៉មត្រជាក់របស់ Sothea ទាំងស្រុង!
              </div>
            </div>
            <div class="crisis-event fatal">
              <span class="event-time">១១:៣០ ព្រឹក</span>
              <div class="event-desc">
                <strong>គ្រោះមហន្តរាយ៖</strong> ប៉មត្រជាក់ឡើងកម្តៅខ្លាំង ធ្វើឱ្យម៉ាស៊ីនឆេះបែកបាក់។ រោងចក្រត្រូវបិទទ្វារបន្ទាន់។ ថ្លៃជួសជុល៖ $28,000។ ថ្លៃផាកពិន័យដឹកជញ្ជូនយឺត៖ $36,000។ <strong>ការខាតបង់សរុប៖ $64,000!</strong>
              </div>
            </div>
          </div>

          <div class="crisis-lesson-card">
            <div class="loss-badge">ខាតបង់ $64,000</div>
            <h3>មូលហេតុឫសគល់នៃស្ថាបត្យកម្ម</h3>
            <p>អ្នកបង្កើតកម្មវិធីគិតថា៖ <em>"Variable អាចផ្ទុកអក្សរបាន ដូច្នេះខ្ញុំគ្រាន់តែដាក់ឈ្មោះម៉ាស៊ីនក្នុង Variable ទៅបានហើយ"។</em></p>
            <div class="flaw-box">
              <span class="flaw-icon">⚠️</span>
              <span>Variable មួយអាចផ្ទុកទិន្នន័យបានតែ <strong>១ ករណីក្នុងពេលតែមួយប៉ុណ្ណោះ</strong>។ អាជីវកម្មជាក់ស្តែងមានករណីរាប់រយក្នុងពេលតែមួយ!</span>
            </div>
            <div class="solution-preview">
              <strong>ដំណោះស្រាយស្ថាបត្យកម្ម៖</strong>
              <p>មិនត្រូវរក្សាទុកសំណើអាជីវកម្មក្នុង Variable នោះទេ។ រាល់សំណើនីមួយៗត្រូវរក្សាទុកជាជួរដាច់ដោយឡែកក្នុង <strong>Table of Records</strong>។</p>
            </div>
          </div>
        </div>
      `
    },

    // Slide 7: Plain-Language Concept Trio
    {
      title: "គំនិតងាយយល់ជាភាសាសាមញ្ញ",
      segment: "វគ្គ ២៖ ស្វែងយល់ (មូលហេតុ)",
      content: `
        <div class="slide-header">
          <span class="section-tag">គំនិតងាយយល់ជាភាសាសាមញ្ញ</span>
          <h2>Record vs. Column vs. Table៖ ប្រៀបដូចប្រអប់ដាក់កាត</h2>
          <p class="subtitle">មុននឹងមើលកុំព្យូទ័រ ឬកូដ ចូរស្វែងយល់ពីរបៀបរៀបចំឯកសារក្នុងជីវិតពិតសិន។</p>
        </div>

        <div class="analogy-cards-trio">
          <div class="concept-trio-card">
            <div class="trio-badge">ចន្លោះសំណួរ (The Slot)</div>
            <div class="trio-icon">🏷️</div>
            <h3>ជួរឈរ Column (Field)</h3>
            <p class="trio-def">ជា <strong>ចន្លោះប្រអប់មានឈ្មោះសម្គាល់</strong> នៅលើកាត។</p>
            <ul class="trio-points">
              <li>កំណត់សំណួរដែលត្រូវសួរ។</li>
              <li>កំណត់ប្រភេទចម្លើយដែលអនុញ្ញាត (អក្សរ, លេខ, កាលបរិច្ឆេទ)។</li>
              <li>ឧទាហរណ៍៖ <code>EstimatedCost</code> (ត្រូវតែជាចំនួនទឹកប្រាក់)។</li>
            </ul>
          </div>

          <div class="concept-trio-card active-trio">
            <div class="trio-badge highlight">កាតនីមួយៗ (The Card)</div>
            <div class="trio-icon">🪪</div>
            <h3>កំណត់ត្រា Record (១ ករណី)</h3>
            <p class="trio-def">ជា <strong>កាតទម្រង់មួយសន្លឹក</strong> ឬប័ណ្ណបើកបរផ្ទាល់ខ្លួន។</p>
            <ul class="trio-points">
              <li>ផ្ទុកនូវរាល់អង្គហេតុទាំងអស់អំពី <strong>ករណីជាក់លាក់តែមួយ</strong>។</li>
              <li>ធ្វើដំណើរជាមួយគ្នាជាកញ្ចប់តែមួយ។</li>
              <li>ឧទាហរណ៍៖ <code>{ Machine: "Press 6", Cost: 850, Status: "Submitted" }</code>។</li>
            </ul>
          </div>

          <div class="concept-trio-card">
            <div class="trio-badge">ប្រអប់ដាក់កាត (The Box)</div>
            <div class="trio-icon">🗃️</div>
            <h3>តារាង Table (បណ្តុំកាត)</h3>
            <p class="trio-def">ជា <strong>ប្រអប់ដាក់កាត ឬសៀវភៅកាតាឡុក</strong> ដែលផ្ទុកកាតទាំងអស់។</p>
            <ul class="trio-points">
              <li>រាល់កាតទាំងអស់នៅក្នុងប្រអប់មានប្រអប់សំណួរដូចៗគ្នា។</li>
              <li>ផ្ទុកកំណត់ត្រានីមួយៗដាច់ដោយឡែកពីគ្នា (Independent Records) រាប់រយដោយសុវត្ថិភាព។</li>
              <li>អាចតម្រៀប រាប់ចំនួន ឬចម្រាញ់យកទិន្នន័យបាន។</li>
            </ul>
          </div>
        </div>
      `
    },

    // Slide 8: Restaurant Ticket Rail
    {
      title: "របារព្យួរក្រដាសកុម្ម៉ង់ម្ហូប",
      segment: "វគ្គ ២៖ ស្វែងយល់ (មូលហេតុ)",
      content: `
        <div class="slide-header">
          <span class="section-tag">ឧទាហរណ៍ជាក់ស្តែងក្នុងជីវិតប្រចាំថ្ងៃ</span>
          <h2>របារព្យួរក្រដាសកុម្ម៉ង់ម្ហូបក្នុងផ្ទះបាយ</h2>
          <p class="subtitle">របៀបដែលផ្ទះបាយដ៏រវល់អាចគ្រប់គ្រងម្ហូប ៥០ មុខក្នុងពេលតែមួយដោយមិនបាត់បង់ការកុម្ម៉ង់ណាមួយ។</p>
        </div>

        <div class="kitchen-analogy-layout">
          <div class="kitchen-stage-visual">
            <div class="ticket-rail-bar">
              <span class="rail-label">របារដែកព្យួរក្រដាសកុម្ម៉ង់ (តារាង / THE TABLE)</span>
              <div class="rail-clips">
                <div class="paper-ticket">
                  <div class="ticket-head">Order #101 • តុលេខ ៤</div>
                  <div class="ticket-body">
                    <span>• ប៊ឺហ្គឺ (ឆ្អិនល្មម)</span>
                    <span>• ដំឡូងបារាំងបំពង</span>
                    <span class="ticket-price">$16.50</span>
                  </div>
                  <div class="ticket-status-pill status-cooking">កំពុងចម្អិន</div>
                </div>
                <div class="paper-ticket urgent-ticket">
                  <div class="ticket-head">Order #102 • តុលេខ ១២</div>
                  <div class="ticket-body">
                    <span>• សាច់គោស្តេក</span>
                    <span>• ស្រាក្រហម</span>
                    <span class="ticket-price">$45.00</span>
                  </div>
                  <div class="ticket-status-pill status-urgent">VIP បន្ទាន់</div>
                </div>
                <div class="paper-ticket">
                  <div class="ticket-head">Order #103 • តុលេខ ២</div>
                  <div class="ticket-body">
                    <span>• សាឡាត់បន្លែ</span>
                    <span>• តែទឹកកក</span>
                    <span class="ticket-price">$12.00</span>
                  </div>
                  <div class="ticket-status-pill status-ready">រួចរាល់</div>
                </div>
              </div>
            </div>
          </div>

          <div class="kitchen-takeaways-grid">
            <div class="relay-card">
              <span class="relay-num">១</span>
              <h4>ក្រដាស ១ សន្លឹក = ១ Record</h4>
              <p>តំណាងឱ្យការកុម្ម៉ង់របស់អតិថិជនម្នាក់។ ប្រសិនបើតុ ១២ ប្តូរស្រា វាមិនប៉ះពាល់ដល់ប៊ឺហ្គឺតុ ៤ ឡើយ។</p>
            </div>
            <div class="relay-card">
              <span class="relay-num">២</span>
              <h4>ចន្លោះដែលបានបោះពុម្ព = Columns</h4>
              <p>ក្រដាសនីមួយៗមានកន្លែងកត់ត្រាដូចគ្នា៖ លេខតុ, អ្នករត់តុ, មុខម្ហូប, តម្លៃ និងចំណាំ។</p>
            </div>
            <div class="relay-card">
              <span class="relay-num">៣</span>
              <h4>របារព្យួរ = Table</h4>
              <p>ចុងភៅក្រឡេកមើលរបារព្យួរ ហើយអាចដឹងភ្លាមៗ៖ <code>CountRows(Orders) = 3</code> និង <code>Filter(Orders, Priority = "VIP")</code>។</p>
            </div>
          </div>
        </div>
      `
    },

    // Slide 9: Anatomy of Data
    {
      title: "រចនាសម្ព័ន្ធទិន្នន័យ (Data Structure)",
      segment: "វគ្គ ៣៖ ទ្រឹស្តីស៊ីជម្រៅ",
      content: `
        <div class="slide-header">
          <span class="section-tag">ស្ថាបត្យកម្មទិន្នន័យ</span>
          <h2>រចនាសម្ព័ន្ធទិន្នន័យ (Data Structure)៖ Cell ➔ Column ➔ Record ➔ Table</h2>
          <p class="subtitle">របៀបដែលតម្លៃទោលតូចៗរួមបញ្ចូលគ្នាបង្កើតបានជាគំរូទិន្នន័យកម្រិតសហគ្រាស។</p>
        </div>

        <div class="anatomy-hierarchy-grid">
          <div class="anatomy-step">
            <div class="step-badge">កម្រិតទី ១</div>
            <h3>១. តម្លៃទោល (Cell)</h3>
            <div class="anatomy-box box-value">
              <code>"Press #6"</code>
            </div>
            <p>ទិន្នន័យដើមសុទ្ធសាធគ្មានបរិបទ។ វាគ្រាន់តែជាអក្សរធម្មតា។</p>
          </div>

          <div class="anatomy-arrow">➔</div>

          <div class="anatomy-step">
            <div class="step-badge">កម្រិតទី ២</div>
            <h3>២. ជួរឈរ (Column)</h3>
            <div class="anatomy-box box-column">
              <div class="col-header">MachineName : Text</div>
              <div class="col-cell">Press #6</div>
              <div class="col-cell">Press #2</div>
            </div>
            <p>ប្រភេទជួរឈរដែលកំណត់សំណួរ និងប្រភេទព័ត៌មានដែលអនុញ្ញាត។</p>
          </div>

          <div class="anatomy-arrow">➔</div>

          <div class="anatomy-step">
            <div class="step-badge">កម្រិតទី ៣</div>
            <h3>៣. កំណត់ត្រា (Record)</h3>
            <div class="anatomy-box box-record">
              <div class="rec-field">ID: <span>WO-101</span></div>
              <div class="rec-field">Machine: <span>Press #6</span></div>
              <div class="rec-field">Cost: <span>$850</span></div>
              <div class="rec-field">Status: <span>Submitted</span></div>
            </div>
            <p>បណ្តុំព័ត៌មានផ្ដេកនៃអង្គហេតុទាំងអស់អំពី <strong>ករណីអាជីវកម្មតែមួយ</strong>។</p>
          </div>

          <div class="anatomy-arrow">➔</div>

          <div class="anatomy-step">
            <div class="step-badge">កម្រិតទី ៤</div>
            <h3>៤. តារាង (Table)</h3>
            <div class="anatomy-box box-table">
              <table>
                <tr><th>ID</th><th>Machine</th><th>Cost</th><th>Status</th></tr>
                <tr><td>WO-101</td><td>Press #6</td><td>$850</td><td>Submitted</td></tr>
                <tr><td>WO-102</td><td>Press #2</td><td>$2,400</td><td>Approved</td></tr>
                <tr><td>WO-103</td><td>Cooling</td><td>$12,000</td><td>Submitted</td></tr>
              </table>
            </div>
            <p>បណ្តុំទិន្នន័យដែលមានរចនាសម្ព័ន្ធផ្ទុកករណីឯករាជ្យរាប់រយ។</p>
          </div>
        </div>
      `
    },

    // Slide 10: Variables vs Tables
    {
      title: "Variable vs. Table",
      segment: "វគ្គ ៣៖ ទ្រឹស្តីស៊ីជម្រៅ",
      content: `
        <div class="slide-header">
          <span class="section-tag section-tag-danger">ការប្រៀបធៀបស្ថាបត្យកម្ម</span>
          <h2>មូលហេតុដែល Variable មិនអាចគ្រប់គ្រងអាជីវកម្មបាន៖ បញ្ហា Concurrency</h2>
          <p class="subtitle">ការប្រៀបធៀបដោយផ្ទាល់រវាង Variable មួយ និងតារាងផ្ទុកទិន្នន័យច្រើនជួរ។</p>
        </div>

        <div class="comparison-dual-grid">
          <div class="comp-card card-fail">
            <div class="comp-header">
              <span class="comp-icon">❌</span>
              <h3>ការផ្ទុកទិន្នន័យក្នុង Variable តែមួយ</h3>
            </div>
            <div class="comp-code-snippet">
              <code>Set(varMachine, "Press #6");</code>
              <code>Set(varMachine, "Station 14"); // លុបជាន់លើ!</code>
            </div>
            <ul class="comp-list">
              <li><strong>ចំណុះ៖</strong> ផ្ទុកបានតែ ១ តម្លៃប៉ុណ្ណោះក្នុងពេលតែមួយ។</li>
              <li><strong>Concurrency៖</strong> ពេលអ្នកប្រើ B រក្សាទុកទិន្នន័យ ទិន្នន័យរបស់អ្នកប្រើ A នឹងត្រូវលុបបាត់ជារៀងរហូត។</li>
              <li><strong>ការស្វែងរកប្រវត្តិ៖</strong> មិនអាចប្រើ <code>Filter()</code> ឬ <code>Sort()</code> បានទេ។</li>
              <li><strong>ការគណនា៖</strong> មិនអាចគណនា <code>Sum()</code> ឬ <code>CountRows()</code> បានទេ។</li>
              <li><strong>ការប្រើប្រាស់ល្អបំផុត៖</strong> ស្ថានភាពបណ្តោះអាសន្នលើអេក្រង់ (ឧ. <code>varIsMenuOpen</code>)។</li>
            </ul>
          </div>

          <div class="comp-card card-success">
            <div class="comp-header">
              <span class="comp-icon">✅</span>
              <h3>ការផ្ទុកទិន្នន័យក្នុង Table (Dataverse / SharePoint)</h3>
            </div>
            <div class="comp-code-snippet">
              <code>Collect(WorkOrders, { Machine: "Press #6" });</code>
              <code>Collect(WorkOrders, { Machine: "Station 14" }); // បន្ថែមជួរថ្មី!</code>
            </div>
            <ul class="comp-list">
              <li><strong>ចំណុះ៖</strong> ផ្ទុកកំណត់ត្រានីមួយៗដាច់ដោយឡែកពីគ្នា (Independent Records) រាប់លាន។</li>
              <li><strong>Concurrency៖</strong> បុគ្គលិក ៥០០ នាក់អាចផ្ញើសំណើក្នុងពេលតែមួយដោយគ្មានការរំខានគ្នា។</li>
              <li><strong>ការស្វែងរកប្រវត្តិ៖</strong> ស្វែងរក ចម្រាញ់ទិន្នន័យ និងធ្វើរបាយការណ៍បានភ្លាមៗ។</li>
              <li><strong>ការគណនា៖</strong> គណនាតួលេខសរុបបានភ្លាមៗ៖ <code>Sum(WorkOrders, Cost)</code>។</li>
              <li><strong>ការប្រើប្រាស់ល្អបំផុត៖</strong> ដំណើរការអាជីវកម្មពិតប្រាកដ, សំបុត្រជួសជុល, វិក្កយបត្រ, ស្តុកទំនិញ។</li>
            </ul>
          </div>
        </div>
      `
    },

    // Slide 11: Power Fx Grammar
    {
      title: "វេយ្យាករណ៍ Power Fx",
      segment: "វគ្គ ៣៖ ទ្រឹស្តីស៊ីជម្រៅ",
      content: `
        <div class="slide-header">
          <span class="section-tag section-tag-accent">វេយ្យាករណ៍រូបមន្ត Power Fx</span>
          <h2>វេយ្យាករណ៍ Power Fx៖ វង់ក្រចកទម្រង់ {} [] និងសញ្ញាចុច (.)</h2>
          <p class="subtitle">សញ្ញាសម្គាល់ទាំង ៣ ដែលគ្រប់គ្រងកំណត់ត្រា តារាង និងការទាញយកជួរឈរ។</p>
        </div>

        <div class="grammar-trio-grid">
          <div class="grammar-card">
            <div class="grammar-symbol">{ }</div>
            <h3>វង់ក្រចកទម្រង់ { }៖ Record</h3>
            <p>ប្រមូលផ្តុំជួរឈរជាច្រើនទៅជា <strong>ករណីអាជីវកម្មតែមួយ</strong>។</p>
            <div class="fx-code-box">
              <code>{ TicketID: "WO-101", Machine: "Press #6", Cost: 850 }</code>
            </div>
            <span class="grammar-note">សម្គាល់៖ <code>Field: Value</code> ខណ្ឌដោយសញ្ញាក្បៀស។</span>
          </div>

          <div class="grammar-card">
            <div class="grammar-symbol">[ ]</div>
            <h3>វង់ក្រចកទម្រង់ [ ]៖ Table</h3>
            <p>ផ្ទុកបណ្តុំ ឬបញ្ជីនៃកំណត់ត្រាជាច្រើន។</p>
            <div class="fx-code-box">
              <code>[ "High", "Medium", "Low" ] // បញ្ជីជម្រើស</code>
              <code>[ { ID: 1 }, { ID: 2 } ] // តារាងច្រើនជួរ</code>
            </div>
            <span class="grammar-note">តំណាងឱ្យបញ្ជី ឬក្រឡាតារាងនៃធាតុជាច្រើន។</span>
          </div>

          <div class="grammar-card highlight-card">
            <div class="grammar-symbol">.</div>
            <h3>សញ្ញាចុច (.)៖ ទាញយកតម្លៃជួរឈរ</h3>
            <p>ចង្អុលចូលទៅក្នុង Record ហើយទាញយកតម្លៃជួរឈរជាក់លាក់ណាមួយមកប្រើ។</p>
            <div class="fx-code-box">
              <code>ThisItem.Status // ផ្តល់លទ្ធផល "Submitted"</code>
              <code>ThisItem.Cost // ផ្តល់លទ្ធផល 850</code>
            </div>
            <span class="grammar-note">អានថា៖ "យកធាតុនេះ ហើយទាញយកតម្លៃ Status របស់វា"។</span>
          </div>
        </div>
      `
    },

    // Slide 12: Constructor Workbench (Widget 1)
    {
      title: "ឧបករណ៍បង្កើត Records & Tables",
      segment: "វគ្គ ៤៖ បង្ហាញ & អនុវត្តជាក់ស្តែង",
      content: `
        <div class="slide-header">
          <span class="section-tag">កន្លែងអនុវត្តអន្តរកម្មទី ១</span>
          <h2>ឧបករណ៍បង្កើត Records &amp; Tables ជាក់ស្តែង</h2>
          <p class="subtitle">បង្កើតកំណត់ត្រាម្តងមួយៗ បញ្ចូលទៅក្នុងតារាងផ្ទាល់ និងសង្កេតមើលរូបមន្ត Power Fx។</p>
        </div>

        <div class="constructor-workbench-layout">
          <!-- Left: Record Creator Form -->
          <div class="creator-panel">
            <div class="panel-header">
              <span class="panel-icon">📝</span>
              <h3>បង្កើត Record មួយ <code>{ }</code></h3>
            </div>
            
            <div class="form-group">
              <label for="wb-machine">ឈ្មោះម៉ាស៊ីន៖</label>
              <input type="text" id="wb-machine" class="fluent-input" value="Press #6">
            </div>

            <div class="form-group">
              <label for="wb-issue">ការពិពណ៌នាបញ្ហា៖</label>
              <input type="text" id="wb-issue" class="fluent-input" value="លេចធ្លាយប្រេងធារាសាស្ត្រ">
            </div>

            <div class="form-row-dual">
              <div class="form-group">
                <label for="wb-cost">ការប៉ាន់ស្មានតម្លៃ ($)៖</label>
                <input type="number" id="wb-cost" class="fluent-input" value="850">
              </div>
              <div class="form-group">
                <label for="wb-priority">កម្រិតអាទិភាព៖</label>
                <select id="wb-priority" class="fluent-select">
                  <option value="High">ខ្ពស់ (High)</option>
                  <option value="Critical Safety">សុវត្ថិភាពបន្ទាន់ (Critical Safety)</option>
                  <option value="Medium">មធ្យម (Medium)</option>
                  <option value="Low">ទាប (Low)</option>
                </select>
              </div>
            </div>

            <button id="wb-btn-add-record" class="fluent-btn-primary full-width">
              <span>➕ បញ្ចូល Record ទៅក្នុងតារាង</span>
            </button>

            <div class="record-preview-box">
              <span class="preview-title">គំរូ Record ក្នុងអង្គចងចាំ (Power Fx):</span>
              <pre id="wb-record-json"><code>{ Machine: "Press #6", Cost: 850, Priority: "High", Status: "Submitted" }</code></pre>
            </div>
          </div>

          <!-- Right: Live Table Grid & Operations -->
          <div class="table-view-panel">
            <div class="table-panel-header">
              <div class="table-stats">
                <span class="stat-badge">តារាង៖ <code>WorkOrders</code></span>
                <span class="stat-badge" id="wb-row-count">CountRows: 3</span>
                <span class="stat-badge highlight-stat" id="wb-sum-cost">Sum(Cost): $15,250</span>
              </div>
              <div class="table-filter-controls">
                <button class="filter-btn active" data-filter="All">ទាំងអស់</button>
                <button class="filter-btn" data-filter="Submitted">Submitted</button>
                <button class="filter-btn" data-filter="Critical Safety">Critical Safety</button>
                <button class="filter-btn" data-filter="Approved">Approved</button>
              </div>
            </div>

            <div class="table-scroll-container">
              <table class="live-power-table" id="wb-live-table">
                <thead>
                  <tr>
                    <th>លេខសំបុត្រ</th>
                    <th>ម៉ាស៊ីន</th>
                    <th>បញ្ហា</th>
                    <th>តម្លៃ</th>
                    <th>អាទិភាព</th>
                    <th>ស្ថានភាព</th>
                  </tr>
                </thead>
                <tbody id="wb-table-body">
                  <!-- Rows rendered by script.js -->
                </tbody>
              </table>
            </div>

            <div class="table-operation-fx">
              <span class="fx-label">រូបមន្ត Power Fx សកម្ម៖</span>
              <code id="wb-active-formula">Filter(WorkOrders, true)</code>
            </div>
          </div>
        </div>
      `
    },

    // Slide 13: Galleries & Forms UI
    {
      title: "Galleries & Forms",
      segment: "វគ្គ ៤៖ បង្ហាញ & អនុវត្តជាក់ស្តែង",
      content: `
        <div class="slide-header">
          <span class="section-tag">ស្ថាបត្យកម្មចំណុចប្រទាក់អ្នកប្រើ (UI)</span>
          <h2>ការភ្ជាប់តារាងទៅអេក្រង់៖ Gallery និង Form</h2>
          <p class="subtitle">របៀបដែល Power Apps បង្ហាញតារាងច្រើនជួរ និងកំណត់ត្រាតែមួយនៅលើអេក្រង់។</p>
        </div>

        <div class="gallery-form-preview-grid">
          <div class="ui-arch-card">
            <div class="ui-arch-header">
              <span class="ui-icon">🖼️</span>
              <h3>Gallery៖ បង្ហាញតារាង (TABLE)</h3>
            </div>
            <p>បញ្ជីរមូរដែល <strong>ជួរនីមួយៗនៃតារាងក្លាយជាកាតមួយនៅលើអេក្រង់</strong>។</p>
            <div class="ui-mockup-box gallery-mock">
              <div class="mock-card selected">
                <strong>WO-101 • Press #6</strong>
                <span>តម្លៃ៖ $850 • ស្ថានភាព៖ Submitted</span>
              </div>
              <div class="mock-card">
                <strong>WO-102 • Press #2</strong>
                <span>តម្លៃ៖ $2,400 • ស្ថានភាព៖ Approved</span>
              </div>
              <div class="mock-card">
                <strong>WO-103 • Cooling Tower</strong>
                <span>តម្លៃ៖ $12,000 • ស្ថានភាព៖ Submitted</span>
              </div>
            </div>
            <div class="ui-fx-binding">
              <code>Gallery.Items = WorkOrders</code>
            </div>
          </div>

          <div class="ui-arch-arrow">
            <span>អ្នកប្រើចុចលើកាត ➔</span>
          </div>

          <div class="ui-arch-card">
            <div class="ui-arch-header">
              <span class="ui-icon">📋</span>
              <h3>Form៖ បង្ហាញ RECORD តែមួយ</h3>
            </div>
            <p>ទម្រង់លម្អិតបង្ហាញជួរឈរទាំងអស់សម្រាប់ <strong>ករណីតែមួយដែលបានជ្រើសរើស</strong>។</p>
            <div class="ui-mockup-box form-mock">
              <div class="form-field-row">
                <label>ម៉ាស៊ីន៖</label>
                <span>Press #6</span>
              </div>
              <div class="form-field-row">
                <label>ការប៉ាន់ស្មានតម្លៃ៖</label>
                <span>$850.00</span>
              </div>
              <div class="form-field-row">
                <label>ស្ថានភាព៖</label>
                <span class="status-pill status-submitted">Submitted</span>
              </div>
            </div>
            <div class="ui-fx-binding">
              <code>Form.Item = Gallery.Selected</code>
            </div>
          </div>
        </div>
      `
    },

    // Slide 14: Four Table Operations
    {
      title: "ប្រតិបត្តិការតារាងទាំង ៤",
      segment: "វគ្គ ៤៖ បង្ហាញ & អនុវត្តជាក់ស្តែង",
      content: `
        <div class="slide-header">
          <span class="section-tag section-tag-accent">រូបមន្តសំខាន់ៗ</span>
          <h2>ប្រតិបត្តិការតារាងសំខាន់ៗទាំង ៤ ក្នុង Power Fx</h2>
          <p class="subtitle">អនុគមន៍ស្នូលដែលប្រើប្រាស់ក្នុងគ្រប់កម្មវិធី Power Apps ដើម្បីស្វែងរក និងវិភាគទិន្នន័យ។</p>
        </div>

        <div class="table-ops-grid">
          <div class="op-card">
            <div class="op-badge op-filter">Filter()</div>
            <h3>Filter៖ ស្វែងរក &amp; ចម្រាញ់</h3>
            <p>ពិនិត្យលក្ខខណ្ឌលើគ្រប់ជួរ ហើយផ្តល់មកវិញនូវកំណត់ត្រាដែលត្រូវនឹងលក្ខខណ្ឌ។</p>
            <div class="op-code">
              <code>Filter(WorkOrders, Status = "Submitted")</code>
            </div>
            <span class="op-expl">"បង្ហាញតែសំបុត្រការងារដែលកំពុងរង់ចាំប៉ុណ្ណោះ។"</span>
          </div>

          <div class="op-card">
            <div class="op-badge op-count">CountRows()</div>
            <h3>CountRows៖ វាស់ស្ទង់ទំហំ</h3>
            <p>រាប់ចំនួនកំណត់ត្រាសរុបដែលមានក្នុងតារាង ឬក្នុងក្រុមដែលបាន Filter។</p>
            <div class="op-code">
              <code>CountRows(Filter(WorkOrders, Priority = "High"))</code>
            </div>
            <span class="op-expl">"តើមានសំបុត្រអាទិភាពខ្ពស់ប៉ុន្មាននៅពេលនេះ?"</span>
          </div>

          <div class="op-card">
            <div class="op-badge op-sort">Sort()</div>
            <h3>Sort៖ តម្រៀបលំដាប់</h3>
            <p>រៀបចំកំណត់ត្រាឡើងវិញតាមជួរឈរជាក់លាក់ណាមួយពីតូចទៅធំ ឬពីធំទៅតូច។</p>
            <div class="op-code">
              <code>Sort(WorkOrders, EstimatedCost, SortOrder.Descending)</code>
            </div>
            <span class="op-expl">"ដាក់សំបុត្រជួសជុលដែលថ្លៃជាងគេនៅខាងលើបង្អស់។"</span>
          </div>

          <div class="op-card">
            <div class="op-badge op-lookup">LookUp()</div>
            <h3>LookUp៖ រកតែមួយគត់</h3>
            <p>ស្វែងរក និងទាញយកកំណត់ត្រាដំបូងបង្អស់ដែលត្រូវនឹងលក្ខខណ្ឌជាក់លាក់។</p>
            <div class="op-code">
              <code>LookUp(WorkOrders, TicketID = "WO-101")</code>
            </div>
            <span class="op-expl">"ទាញយកកំណត់ត្រាសម្រាប់សំបុត្រ WO-101 មកបង្ហាញ។"</span>
          </div>
        </div>
      `
    },

    // Slide 15: Schema Matrix
    {
      title: "តារាង Schema Matrix",
      segment: "វគ្គ ៥៖ អនុវត្តរួមគ្នា",
      content: `
        <div class="slide-header">
          <span class="section-tag">រចនាសម្ព័ន្ធតារាងសហគ្រាស</span>
          <h2>តារាង Schema Matrix សម្រាប់ Apex Plastics</h2>
          <p class="subtitle">របៀបដែលជួរឈរទាំង ៥ ការពារការបាត់បង់ទិន្នន័យលើម៉ាស៊ីនចាក់ជ័រទាំង ១៦ គ្រឿង។</p>
        </div>

        <div class="schema-table-container">
          <table class="capstone-table">
            <thead>
              <tr>
                <th>ឈ្មោះជួរឈរ (Column)</th>
                <th>ប្រភេទទិន្នន័យ</th>
                <th>ចាំបាច់?</th>
                <th>គោលបំណងក្នុងលំហូរអាជីវកម្ម</th>
                <th>តម្លៃគំរូ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>WorkOrderID</code></td>
                <td>Text (កូដសម្គាល់តែមួយ)</td>
                <td><span class="badge badge-yes">បាទ/ចាស</span></td>
                <td>សម្គាល់ករណីនីមួយៗឱ្យដាច់ដោយឡែកជារៀងរហូត</td>
                <td><code>"WO-1004"</code></td>
              </tr>
              <tr>
                <td><code>MachineName</code></td>
                <td>Choice / Text</td>
                <td><span class="badge badge-yes">បាទ/ចាស</span></td>
                <td>បញ្ជាក់ថាម៉ាស៊ីនមួយណាក្នុងចំណោម ១៦ គ្រឿងកំពុងខូច</td>
                <td><code>"Press #6"</code></td>
              </tr>
              <tr>
                <td><code>EstimatedCost</code></td>
                <td>Currency / Number</td>
                <td><span class="badge badge-yes">បាទ/ចាស</span></td>
                <td>សម្រាប់ផ្ទៀងផ្ទាត់របាំងអនុម័តថវិកា $2,000</td>
                <td><code>$850.00</code></td>
              </tr>
              <tr>
                <td><code>Priority</code></td>
                <td>Choice</td>
                <td><span class="badge badge-yes">បាទ/ចាស</span></td>
                <td>បញ្ជូនករណីអាសន្នសុវត្ថិភាពទៅជាងភ្លាមៗ</td>
                <td><code>"High"</code></td>
              </tr>
              <tr>
                <td><code>Status</code></td>
                <td>Choice</td>
                <td><span class="badge badge-yes">បាទ/ចាស</span></td>
                <td>គ្រប់គ្រងស្ថានភាពសកម្មនៅទូទាំង ៦ ដំណាក់កាល</td>
                <td><code>"Submitted"</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },

    // Slide 16: Demo Protocol
    {
      title: "វិធីសាស្ត្រផ្លាស់ប្តូរទម្រង់ក្រដាស",
      segment: "វគ្គ ៥៖ អនុវត្តរួមគ្នា",
      content: `
        <div class="slide-header">
          <span class="section-tag">ការបង្ហាញផ្ទាល់ដោយគ្រូ</span>
          <h2>វិធីសាស្ត្រផ្លាស់ប្តូរក្រដាសកត់ត្រារញ៉េរញ៉ៃទៅជាតារាង Dataverse</h2>
          <p class="subtitle">ជំហានទាំង ៤ ក្នុងការបំលែងទម្រង់ក្រដាសទៅជាតារាងដែលមានរចនាសម្ព័ន្ធរឹងមាំ។</p>
        </div>

        <div class="demo-protocol-steps">
          <div class="proto-step">
            <span class="step-num">១</span>
            <h4>កំណត់ព្រំដែននៃករណីមួយ</h4>
            <p>ពិនិត្យមើលក្រដាសកត់ត្រា។ កំណត់កន្លែងដែលករណីទី ១ ចាប់ផ្តើម និងបញ្ចប់។ ព្រំដែននោះគឺជា <strong>Record</strong>។</p>
          </div>
          <div class="proto-step">
            <span class="step-num">២</span>
            <h4>កត់ត្រាសំណួររួមគ្នា (Columns)</h4>
            <p>មើលក្រដាសទាំង ១០ សន្លឹក។ តើសំណួរអ្វីខ្លះដែលបោះពុម្ពនៅលើគ្រប់សន្លឹក? ម៉ាស៊ីន? កាលបរិច្ឆេទ? តម្លៃ? ទាំងនោះគឺជា <strong>Columns</strong>។</p>
          </div>
          <div class="proto-step">
            <span class="step-num">៣</span>
            <h4>កំណត់ប្រភេទទិន្នន័យឱ្យតឹងរ៉ឹង</h4>
            <p>ការពារភាពត្រឹមត្រូវនៃទិន្នន័យ៖ មិនអនុញ្ញាតឱ្យសរសេរអក្សរក្នុងជួរឈរតម្លៃឡើយ; មិនអនុញ្ញាតឱ្យសរសេរពាក្យផ្តេសផ្តាសក្នុងជួរ Status ឡើយ។</p>
          </div>
          <div class="proto-step">
            <span class="step-num">៤</span>
            <h4>រក្សាទុកក្នុងតារាងតែមួយ</h4>
            <p>រួមបញ្ចូលរាល់ Record ទាំងអស់ទៅក្នុងតារាង Dataverse តែមួយ ដើម្បីឱ្យ Power Apps អាចស្វែងរក និងត្រួតពិនិត្យបានភ្លាមៗ។</p>
          </div>
        </div>
      `
    },

    // Slide 17: Guided Practice
    {
      title: "ការអនុវត្តរួមគ្នាក្នុងថ្នាក់",
      segment: "វគ្គ ៥៖ អនុវត្តរួមគ្នា",
      content: `
        <div class="slide-header">
          <span class="section-tag">ការអនុវត្តរួមគ្នាក្នុងថ្នាក់</span>
          <h2>ការអនុវត្តរួមគ្នា៖ បែងចែក Single Value, Record និង Table</h2>
          <p class="subtitle">ការវិភាគក្នុងថ្នាក់៖ ពិនិត្យមើលធាតុទាំង ៤ នេះក្នុងរោងចក្រ ហើយកំណត់រចនាសម្ព័ន្ធទិន្នន័យរបស់វា។</p>
        </div>

        <div class="practice-items-grid">
          <div class="practice-item-card">
            <span class="item-tag">ធាតុទី ១ (Item A)</span>
            <div class="item-icon">🏷️</div>
            <h3>បាកូដដែកលើម៉ាស៊ីន</h3>
            <p>បាកូដដែលបោះត្រាលើម៉ាស៊ីនលេខ ៦ សរសេរថា <code>"APX-MCH-06"</code>។</p>
            <div class="practice-result val-result">
              <span>រចនាសម្ព័ន្ធទិន្នន័យ៖ <strong>Single Value (Text)</strong></span>
            </div>
          </div>

          <div class="practice-item-card">
            <span class="item-tag">ធាតុទី ២ (Item B)</span>
            <div class="item-icon">📋</div>
            <h3>ទម្រង់ត្រួតពិនិត្យសុវត្ថិភាពមួយសន្លឹក</h3>
            <p>ទម្រង់ពិនិត្យពេលព្រឹករបស់ Sothea សម្រាប់ម៉ាស៊ីនលេខ ៦ មាន ៨ ចំណុច និងកាលបរិច្ឆេទ។</p>
            <div class="practice-result rec-result">
              <span>រចនាសម្ព័ន្ធទិន្នន័យ៖ <strong>Single Record</strong></span>
            </div>
          </div>

          <div class="practice-item-card">
            <span class="item-tag">ធាតុទី ៣ (Item C)</span>
            <div class="item-icon">🗃️</div>
            <h3>រាល់សំណើជួសជុលទាំង ៤២ ក្នុងខែនេះ</h3>
            <p>ប្រវត្តិសំបុត្រជួសជុលទាំងអស់ដែលបានផ្ញើមកនៅទូទាំងរោងចក្រ Hall A។</p>
            <div class="practice-result tab-result">
              <span>រចនាសម្ព័ន្ធទិន្នន័យ៖ <strong>Table of Records</strong></span>
            </div>
          </div>

          <div class="practice-item-card">
            <span class="item-tag">ធាតុទី ៤ (Item D)</span>
            <div class="item-icon">🔢</div>
            <h3>ចំនួនទឹកប្រាក់សរុបដែលបានចំណាយក្នុងឆ្នាំនេះ</h3>
            <p>ចំនួនទឹកប្រាក់ដុល្លារទោលមួយគណនាចេញពីសំបុត្រទាំងអស់៖ <code>$48,500</code>។</p>
            <div class="practice-result val-result">
              <span>រចនាសម្ព័ន្ធទិន្នន័យ៖ <strong>Single Value (Currency Aggregate)</strong></span>
            </div>
          </div>
        </div>
      `
    },

    // Slide 18: Simulator Workbench (Widget 2)
    {
      title: "ឧបករណ៍សាកល្បងវិនិច្ឆ័យទិន្នន័យ",
      segment: "វគ្គ ៥៖ អនុវត្តរួមគ្នា",
      content: `
        <div class="slide-header">
          <span class="section-tag">កន្លែងអនុវត្តអន្តរកម្មទី ២</span>
          <h2>ឧបករណ៍សាកល្បងវិនិច្ឆ័យរចនាសម្ព័ន្ធទិន្នន័យ (៦ ស្ថានភាព)</h2>
          <p class="subtitle">សាកល្បងការវិនិច្ឆ័យរបស់អ្នកលើស្ថានភាពជាក់ស្តែងចំនួន ៦ ក្នុងរោងចក្រ។</p>
        </div>

        <div class="sim-workbench-container">
          <div class="sim-header-row">
            <div class="sim-progress-indicator">
              ស្ថានភាពទី <span id="sim-current-num">1</span> នៃ ៦
            </div>
            <div class="sim-score-counter">
              ត្រឹមត្រូវ៖ <span id="sim-score">0</span> / ៦
            </div>
          </div>

          <div class="sim-card-body" id="sim-card-body">
            <div class="sim-scenario-badge" id="sim-badge">ស្ថានភាពទី ១៖ អត្តសញ្ញាណអ្នកប្រើ</div>
            <h3 id="sim-title" class="sim-title">តើយើងត្រូវរក្សាទុកឈ្មោះពេញរបស់បុគ្គលិកដែលកំពុងប្រើប្រាស់កម្មវិធីនៅឯណា?</h3>
            <p id="sim-desc" class="sim-desc">កម្មវិធីទូរស័ព្ទត្រូវបង្ហាញពាក្យ "សូមស្វាគមន៍, Bopha!" នៅផ្នែកខាងលើនៃអេក្រង់។</p>
            
            <div class="sim-choices-row">
              <button class="sim-choice-btn" data-choice="value">
                <span class="choice-icon">🏷️</span>
                <span>Single Value (តម្លៃទោល)</span>
              </button>
              <button class="sim-choice-btn" data-choice="record">
                <span class="choice-icon">🪪</span>
                <span>Single Record (កំណត់ត្រា)</span>
              </button>
              <button class="sim-choice-btn" data-choice="table">
                <span class="choice-icon">🗃️</span>
                <span>Table of Records (តារាង)</span>
              </button>
            </div>

            <div class="sim-feedback-box" id="sim-feedback" style="display: none;"></div>
          </div>

          <div class="sim-footer-controls">
            <button id="sim-btn-prev" class="fluent-btn-secondary" disabled>ស្ថានភាពមុន</button>
            <button id="sim-btn-next" class="fluent-btn-primary" disabled>ស្ថានភាពបន្ទាប់ ➔</button>
          </div>
        </div>
      `
    },

    // Slide 19: Four Misconceptions
    {
      title: "ការយល់ច្រឡំគ្រោះថ្នាក់ទាំង ៤",
      segment: "វគ្គ ៥៖ អនុវត្តរួមគ្នា",
      content: `
        <div class="slide-header">
          <span class="section-tag section-tag-danger">ការការពារកំហុសឆ្គង</span>
          <h2>ការយល់ច្រឡំគ្រោះថ្នាក់ទាំង ៤ របស់អ្នកចាប់ផ្តើមដំបូង និងការកែតម្រូវ</h2>
          <p class="subtitle">ជៀសវាងកំហុសឆ្គងធ្ងន់ធ្ងរដែលបណ្តាលឱ្យកម្មវិធីគាំង ឬបាត់បង់ទិន្នន័យសំខាន់ៗ។</p>
        </div>

        <div class="misconceptions-deck">
          <div class="misconception-card">
            <div class="misconception-wrong">
              <span class="status-cross">❌</span>
              <div>
                <strong>ការយល់ច្រឡំ៖</strong> "Table គ្រាន់តែជាសន្លឹកកិច្ចការ Excel ធម្មតា ដែលខ្ញុំអាចបញ្ចូលក្រឡា (merge) និងកត់ត្រាផ្តេសផ្តាសបាន។"
              </div>
            </div>
            <div class="misconception-right">
              <span class="status-check">✓</span>
              <div>
                <strong>ការកែតម្រូវដោយគ្រូ៖</strong> តារាងទិន្នន័យទាមទារ <strong>រចនាសម្ព័ន្ធតឹងរ៉ឹងបំផុត</strong>។ គ្រប់ជួរមានជួរឈរដូចគ្នា; ប្រភេទជួរឈរ (លេខ, អក្សរ) មិនអាចផ្លាស់ប្តូរបានទេ។
              </div>
            </div>
          </div>

          <div class="misconception-card">
            <div class="misconception-wrong">
              <span class="status-cross">❌</span>
              <div>
                <strong>ការយល់ច្រឡំ៖</strong> "យើងអាចរក្សាទុកលេខសំបុត្រការងារច្រើនក្នុង Variable តែមួយដោយប្រើសញ្ញាក្បៀស: <code>varTickets = 'WO-101, WO-102'</code>។"
              </div>
            </div>
            <div class="misconception-right">
              <span class="status-check">✓</span>
              <div>
                <strong>ការកែតម្រូវដោយគ្រូ៖</strong> Power Apps មិនអាចប្រើ <code>Filter()</code> ឬ <code>Sum()</code> លើប្រយោគអក្សរបានទេ។ ត្រូវរក្សាទុកករណីនីមួយៗជា <strong>Record ក្នុង Table</strong>!
              </div>
            </div>
          </div>

          <div class="misconception-card">
            <div class="misconception-wrong">
              <span class="status-cross">❌</span>
              <div>
                <strong>ការយល់ច្រឡំ៖</strong> "Record និង Column គឺជាវត្ថុតែមួយដូចគ្នា។"
              </div>
            </div>
            <div class="misconception-right">
              <span class="status-check">✓</span>
              <div>
                <strong>ការកែតម្រូវដោយគ្រូ៖</strong> <strong>Column</strong> គឺជាជួរឈរបញ្ឈរ (ប្រភេទដូចជា <code>Status</code>)។ <strong>Record</strong> គឺជាជួរផ្ដេក (ករណីជាក់លាក់មួយដែលមានគ្រប់ជួរឈររបស់វា)។
              </div>
            </div>
          </div>

          <div class="misconception-card">
            <div class="misconception-wrong">
              <span class="status-cross">❌</span>
              <div>
                <strong>ការយល់ច្រឡំ៖</strong> "យើងមិនចាំបាច់មានតារាងទេ យើងគ្រាន់តែផ្ញើឯកសារ PDF តាម Email សម្រាប់រាល់សំណើគឺបានហើយ។"
              </div>
            </div>
            <div class="misconception-right">
              <span class="status-check">✓</span>
              <div>
                <strong>ការកែតម្រូវដោយគ្រូ៖</strong> Email គឺជាកន្លែងកប់ទិន្នន័យ។ អ្នកមិនអាចស្វែងរក រាប់ចំនួន ឬចម្រាញ់ Email ៥០០ ដើម្បីដឹងថាម៉ាស៊ីនណាខូចញឹកញាប់ជាងគេបានឡើយ។
              </div>
            </div>
          </div>
        </div>
      `
    },

    // Slide 20: 5-Question Quiz (Widget 3)
    {
      title: "សំណួរវាស់ស្ទង់ចំណេះដឹងទាំង ៥",
      segment: "វគ្គ ៦៖ វាយតម្លៃ & តភ្ជាប់ទៅមុខ",
      content: `
        <div class="slide-header">
          <span class="section-tag">ការវាយតម្លៃអន្តរកម្ម</span>
          <h2>សំណួរវាស់ស្ទង់ចំណេះដឹងទាំង ៥ (Knowledge Check)</h2>
          <p class="subtitle">ការវាយតម្លៃភ្លាមៗជាមួយការពន្យល់ស៊ីជម្រៅ និងសំណួរហេតុផល 'Why'។</p>
        </div>

        <div class="quiz-container-card" id="quiz-container">
          <div class="quiz-nav-row">
            <span class="quiz-step-label">សំណួរទី <span id="quiz-current-num">1</span> នៃ ៥</span>
            <div class="quiz-progress-dots">
              <span class="dot active" data-q="0"></span>
              <span class="dot" data-q="1"></span>
              <span class="dot" data-q="2"></span>
              <span class="dot" data-q="3"></span>
              <span class="dot" data-q="4"></span>
            </div>
          </div>

          <div class="quiz-question-box">
            <h3 id="quiz-question-title" class="quiz-question-title">តើអ្វីជាទំនាក់ទំនងរចនាសម្ព័ន្ធរវាង Record, Column, និង Table?</h3>
            <div class="quiz-options-grid" id="quiz-options-container"></div>
            <div class="quiz-feedback-box" id="quiz-feedback" style="display: none;"></div>
          </div>

          <div class="quiz-footer-row">
            <button id="quiz-btn-prev" class="fluent-btn-secondary" disabled>សំណួរមុន</button>
            <button id="quiz-btn-next" class="fluent-btn-primary" disabled>សំណួរបន្ទាប់ ➔</button>
          </div>
        </div>
      `
    },

    // Slide 21: Capstone Challenge
    {
      title: "លំហាត់ប្រឈមចុងក្រោយ",
      segment: "វគ្គ ៦៖ វាយតម្លៃ & តភ្ជាប់ទៅមុខ",
      content: `
        <div class="slide-header">
          <span class="section-tag section-tag-accent">លំហាត់ប្រឈមចុងក្រោយ</span>
          <h2>ស្ថាបត្យកម្មតារាងសម្រាប់ Apex Plastics</h2>
          <p class="subtitle">រចនារចនាសម្ព័ន្ធតារាងដើម្បីគ្រប់គ្រងសំណើសុំជួសជុលរាប់រយក្នុងពេលតែមួយដោយសុវត្ថិភាព។</p>
        </div>

        <div class="capstone-brief-grid">
          <div class="capstone-req-card">
            <h3>គោលដៅនៃបេសកកម្ម</h3>
            <p>ប្រធានរោងចក្រ Dave បានជ្រើសរើសអ្នកឱ្យដឹកនាំការធ្វើទំនើបកម្ម Power Apps។ អ្នកត្រូវរចនា <strong>ជួរឈរស្នូលទាំង ៥</strong> សម្រាប់តារាង <code>MaintenanceWorkOrders</code> ថ្មី ដើម្បីកុំឱ្យមានការកត់ត្រាជាន់គ្នាជាថ្មីម្តងទៀត។</p>
            
            <div class="req-checklist">
              <h4>តម្រូវការស្ថាបត្យកម្ម៖</h4>
              <ul>
                <li>✓ <strong>កូដសម្គាល់ករណីតែមួយគត់៖</strong> រាល់ករណីត្រូវតែមានកូដគន្លឹះដែលមិនផ្លាស់ប្តូរ។</li>
                <li>✓ <strong>កំណត់ម៉ាស៊ីន៖</strong> ដឹងច្បាស់ថាម៉ាស៊ីនមួយណាក្នុងចំណោម ១៦ គ្រឿងកំពុងខូច។</li>
                <li>✓ <strong>របាំងត្រួតពិនិត្យតម្លៃ៖</strong> រក្សាទុកតម្លៃប៉ាន់ស្មានសម្រាប់របាំងអនុម័ត $2,000។</li>
                <li>✓ <strong>បញ្ជូនករណីអាសន្ន៖</strong> បញ្ជូនករណីអាសន្នសុវត្ថិភាពទៅជាងភ្លាមៗ។</li>
                <li>✓ <strong>ស្ថានភាពលំហូរការងារ៖</strong> តាមដានវឌ្ឍនភាពនៅទូទាំង ៦ ដំណាក់កាល។</li>
              </ul>
            </div>
          </div>

          <div class="capstone-instructions-card">
            <h3>ភារកិច្ចរបស់អ្នក (លើក្រដាស ឬអេក្រង់)</h3>
            <p>សរសេរតារាង Schema របស់អ្នកដែលមានជួរឈរទាំង ៥ ប្រភេទទិន្នន័យច្បាស់លាស់ និងពន្យល់ពីរូបមន្ត Power Fx ដែលប្រធានរបស់អ្នកនឹងប្រើដើម្បីមើលសំបុត្រ <strong>High Priority</strong> ទាំងអស់។</p>
            <div class="time-limit-box">
              <span class="clock-icon">⏱️</span>
              <span>រយៈពេលអនុញ្ញាត៖ <strong>៦ នាទី</strong> (នាទី ៨២:០០ – ៨៨:០០)</span>
            </div>
            <button class="fluent-btn-primary full-width" id="btn-reveal-solution">
              <span>មើលដំណោះស្រាយគំរូ &amp; តារាងវាយតម្លៃ (Slide 22) ➔</span>
            </button>
          </div>
        </div>
      `
    },

    // Slide 22: Benchmark & Rubric
    {
      title: "ដំណោះស្រាយគំរូ និងតារាងវាយតម្លៃ",
      segment: "វគ្គ ៦៖ វាយតម្លៃ & តភ្ជាប់ទៅមុខ",
      content: `
        <div class="slide-header">
          <span class="section-tag">ការវាយតម្លៃ &amp; ពិនិត្យផ្ទាល់ខ្លួន</span>
          <h2>ដំណោះស្រាយគំរូ និងបន្ទាត់វិនិច្ឆ័យ ៤ កម្រិត (Rubric)</h2>
          <p class="subtitle">ប្រៀបធៀបការរចនារបស់អ្នកជាមួយស្តង់ដារសហគ្រាស និងវាយតម្លៃសមត្ថភាពផ្ទាល់ខ្លួន។</p>
        </div>

        <div class="rubric-solution-grid">
          <div class="benchmark-table-box">
            <div class="benchmark-header">
              <h3>តារាងគំរូកម្រិតសហគ្រាស៖ <code>MaintenanceWorkOrders</code></h3>
            </div>
            <table class="capstone-table small-table">
              <thead>
                <tr><th>ជួរឈរ</th><th>ប្រភេទ</th><th>គោលបំណង</th><th>រូបមន្ត</th></tr>
              </thead>
              <tbody>
                <tr><td><code>WorkOrderID</code></td><td>Text</td><td>កូដសម្គាល់តែមួយ</td><td><code>"WO-" &amp; ID</code></td></tr>
                <tr><td><code>MachineName</code></td><td>Choice</td><td>ទ្រព្យសម្បត្តិម៉ាស៊ីន</td><td><code>ThisItem.MachineName</code></td></tr>
                <tr><td><code>EstimatedCost</code></td><td>Currency</td><td>របាំង $2,000</td><td><code>Sum(WorkOrders, Cost)</code></td></tr>
                <tr><td><code>Priority</code></td><td>Choice</td><td>ផ្លូវអាសន្ន</td><td><code>Filter(WorkOrders, Priority="High")</code></td></tr>
                <tr><td><code>Status</code></td><td>Choice</td><td>ស្ថានភាពលំហូរ</td><td><code>ThisItem.Status</code></td></tr>
              </tbody>
            </table>
          </div>

          <div class="rubric-levels-card">
            <h3>បន្ទាត់វិនិច្ឆ័យ ៤ កម្រិតសម្រាប់ Citizen Developer</h3>
            <div class="rubric-tier tier-4">
              <span class="rubric-badge badge-mastery">កម្រិត ៤៖ ស្ទាត់ជំនាញ (Mastery)</span>
              <p>កំណត់ជួរឈរទាំង ៥ បានត្រឹមត្រូវជាមួយប្រភេទសមស្រប; បែងចែក Primary ID ច្បាស់លាស់; សរសេររូបមន្ត <code>Filter()</code> និង <code>ThisItem.</code> បានយ៉ាងត្រឹមត្រូវ។</p>
            </div>
            <div class="rubric-tier tier-3">
              <span class="rubric-badge badge-proficient">កម្រិត ៣៖ កម្រិតបង្គួរ (Proficient)</span>
              <p>កំណត់ជួរឈរទាំង ៥ និងប្រភេទបានល្អ; មានភាពមិនច្បាស់បន្តិចរវាង Choice និង Text; យល់ច្បាស់ពីមូលហេតុដែល Table ការពារការបាត់ទិន្នន័យ។</p>
            </div>
            <div class="rubric-tier tier-2">
              <span class="rubric-badge badge-developing">កម្រិត ២៖ កំពុងអភិវឌ្ឍ (Developing)</span>
              <p>ចាត់ទុកជួរឈរជាស្លាកធម្មតា; ច្រឡំ Record ជាមួយ Table; ស្នើឱ្យដាក់សញ្ញាក្បៀសដើម្បីផ្ទុកទិន្នន័យច្រើនក្នុងអក្សរតែមួយ។</p>
            </div>
            <div class="rubric-tier tier-1">
              <span class="rubric-badge badge-novice">កម្រិត ១៖ កម្រិតដំបូង (Novice)</span>
              <p>មិនអាចបែងចែកតម្លៃទោលពីតារាងបាន; ជឿជាក់ថា Global Variable គឺគ្រប់គ្រាន់ក្នុងការតាមដានច្រើនករណី។</p>
            </div>
          </div>
        </div>
      `
    },

    // Slide 23: Workplace Homework
    {
      title: "កិច្ចការផ្ទះផ្ទេរចំណេះដឹង",
      segment: "វគ្គ ៦៖ វាយតម្លៃ & តភ្ជាប់ទៅមុខ",
      content: `
        <div class="slide-header">
          <span class="section-tag">កិច្ចការផ្ទះផ្ទេរចំណេះដឹង</span>
          <h2>ការពិនិត្យឡើងវិញ ១៥ នាទី និងកិច្ចការផ្ទះក្នុងរោងចក្រ</h2>
          <p class="subtitle">ភ្ជាប់មេរៀនថ្ងៃនេះទៅកាន់ការងារជាក់ស្តែងរបស់អ្នកនៅព្រឹកស្អែក។</p>
        </div>

        <div class="homework-dual-grid">
          <div class="homework-card">
            <div class="homework-badge">កិច្ចការ ១៥ នាទីសម្រាប់ថ្ងៃស្អែក</div>
            <h3>ការពិនិត្យទម្រង់ក្រដាសក្នុងរោងចក្រ</h3>
            <p>ស្វែងរក <strong>ក្រដាសកត់ត្រា ឬសៀវភៅតាមដានពិតប្រាកដចំនួន ១</strong> ក្នុងកន្លែងធ្វើការរបស់អ្នក (ឧ. ការពិនិត្យឡានលើកមុនបើកបរ, បញ្ជីភ្ញៀវ, សៀវភៅកត់ត្រាផលិតផលខូច, ប័ណ្ណខ្ចីឧបករណ៍)។</p>
            
            <div class="homework-steps">
              <div class="hw-step">
                <span class="hw-num">១</span>
                <span>ដាក់ឈ្មោះតារាងរបស់អ្នក (ឧ. <code>ForkliftInspections</code>)។</span>
              </div>
              <div class="hw-step">
                <span class="hw-num">២</span>
                <span>កំណត់ <strong>ជួរឈរទាំង ៤</strong> ដែលលេចឡើងនៅលើគ្រប់ជួរ។</span>
              </div>
              <div class="hw-step">
                <span class="hw-num">៣</span>
                <span>សរសេរ <strong>គំរូ Record ចំនួន ២</strong> ដោយប្រើវង់ក្រចកទម្រង់ <code>{ }</code>៖</span>
                <div class="hw-code-snippet">
                  <code>{ Equipment: "Forklift #3", Inspector: "Visal", BatteryPct: 88, Status: "Passed" }</code>
                </div>
              </div>
            </div>
          </div>

          <div class="homework-self-audit">
            <h3>ការត្រួតពិនិត្យផ្ទាល់ខ្លួន ៣ នាទីយប់នេះ</h3>
            <div class="audit-check-row">
              <span class="audit-icon">✅</span>
              <span>តើខ្ញុំអាចពន្យល់មិត្តរួមការងារបានទេថាហេតុអ្វីក្រដាសកុម្ម៉ង់ជា Record ហើយរបារព្យួរជា Table?</span>
            </div>
            <div class="audit-check-row">
              <span class="audit-icon">✅</span>
              <span>តើខ្ញុំអាចសរសេរ Record ជាមួយ <code>{ }</code> និងទាញយកជួរឈរជាមួយសញ្ញាចុច <code>.</code> បានទេ?</span>
            </div>
            <div class="audit-check-row">
              <span class="audit-icon">✅</span>
              <span>តើខ្ញុំយល់ច្បាស់ទេថាហេតុអ្វី Global Variable លុបបាត់សំណើជួសជុលចាស់ៗ?</span>
            </div>
            <div class="audit-footer">
              <strong>សូមយកក្រដាសកិច្ចការផ្ទះនេះមកកាន់ថ្ងៃទី ១១!</strong> យើងនឹងរៀបចំកំណត់ប្រភេទជួរឈរ Dataverse និងលក្ខខណ្ឌជាក់ស្តែងសម្រាប់វា។
            </div>
          </div>
        </div>
      `
    },

    // Slide 24: 3-Day Bridge
    {
      title: "ផែនទីតភ្ជាប់ ៣ ថ្ងៃ & ស្ពានឆ្ពោះទៅមុខ",
      segment: "វគ្គ ៦៖ វាយតម្លៃ & តភ្ជាប់ទៅមុខ",
      content: `
        <div class="slide-header">
          <span class="section-tag section-tag-accent">ការតភ្ជាប់កម្មវិធីសិក្សា</span>
          <h2>ផែនទីតភ្ជាប់ ៣ ថ្ងៃ និងស្ពានឆ្ពោះទៅមុខ</h2>
          <p class="subtitle">កន្លែងដែលយើងបានឆ្លងកាត់ អ្វីដែលយើងសម្រេចបានថ្ងៃនេះ និងអ្វីដែលរង់ចាំនៅថ្ងៃស្អែក។</p>
        </div>

        <div class="bridge-three-grid">
          <div class="bridge-card past-bridge">
            <div class="bridge-tag">ម្សិលមិញ (ថ្ងៃទី ៩)</div>
            <h3>បង្កើតគំរូលំហូរអាជីវកម្ម</h3>
            <ul class="bridge-list">
              <li>• ៦ ដំណាក់កាលអាជីវកម្មសកល</li>
              <li>• Swimlanes, អ្នកទទួលខុសត្រូវ &amp; ការផ្ទេរ</li>
              <li>• ផ្លូវរលូន (Happy Paths) &amp; Rework Loops</li>
              <li>• របាំងសុវត្ថិភាពតាមតួនាទី</li>
            </ul>
            <div class="bridge-footer">លទ្ធផល៖ ដំណើរការអាជីវកម្ម</div>
          </div>

          <div class="bridge-card active-bridge">
            <div class="bridge-tag">ថ្ងៃនេះ (ថ្ងៃទី ១០)</div>
            <h3>កំណត់ត្រា &amp; តារាង (Records &amp; Tables)</h3>
            <ul class="bridge-list">
              <li>• ១ ករណី = ១ Record <code>{ }</code></li>
              <li>• ជួរឈររួមគ្នា = Columns</li>
              <li>• បណ្តុំករណី = Table <code>[ ]</code></li>
              <li>• ទាញយកទិន្នន័យដោយសញ្ញាចុច <code>ThisItem.</code></li>
            </ul>
            <div class="bridge-footer">លទ្ធផល៖ ការផ្ទុកទិន្នន័យច្រើនករណី</div>
          </div>

          <div class="bridge-card next-bridge">
            <div class="bridge-tag">ស្អែក (ថ្ងៃទី ១១)</div>
            <h3>ការរចនាប្រភេទជួរឈរ (Field Types)</h3>
            <ul class="bridge-list">
              <li>• Choice Sets vs. អក្សរវាយសេរី</li>
              <li>• ចំនួនគត់ vs. ចំនួនទឹកប្រាក់ (Currency)</li>
              <li>• ថ្ងៃខែសុទ្ធ vs. ថ្ងៃខែនិងម៉ោង</li>
              <li>• ក្បួនច្បាប់បង្ខំ vs. ស្រេចចិត្ត</li>
            </ul>
            <div class="bridge-footer">បន្ទាប់៖ ភាពសុក្រឹតនៃរចនាសម្ព័ន្ធ</div>
          </div>
        </div>

        <div class="bridge-conclusion-banner">
          <strong>បានបញ្ចប់មេរៀន! រយៈពេល ៩០ នាទីគត់។</strong>
          <span>ចុច <strong>R</strong> ដើម្បីចាប់ផ្តើមឡើងវិញ • <strong>O</strong> សម្រាប់ប្លង់រួម • <strong>L</strong> សម្រាប់ពិនិត្យពីរភាសា</span>
        </div>
      `
    }
  ];

  // ==========================================================================
  // INITIALIZATION
  // ==========================================================================
  function init() {
    // 1. Snapshot English slides content for non-destructive swapping
    dom.slides.forEach((slide) => {
      const contentEl = slide.querySelector('.slide-content');
      slideOriginals.push({
        title: slide.getAttribute('data-title'),
        segment: slide.getAttribute('data-segment'),
        content: contentEl ? contentEl.innerHTML : ''
      });
    });

    setupLaserPointer();
    setupEventListeners();
    setupTimer();
    renderOverviewGrid();
    initConstructorWorkbench();
    initSimulatorWorkbench();
    initQuizWorkbench();
    initAnswerReveals();
    showSlide(state.currentSlide);
  }

  // ==========================================================================
  // SLIDE NAVIGATION ENGINE
  // ==========================================================================
  function showSlide(index) {
    if (index < 1) index = 1;
    if (index > state.totalSlides) index = state.totalSlides;
    state.currentSlide = index;

    dom.slides.forEach((slide, idx) => {
      slide.classList.remove('active', 'prev');
      if (idx + 1 === index) {
        slide.classList.add('active');
      } else if (idx + 1 < index) {
        slide.classList.add('prev');
      }
    });

    // Update Header & Footer
    const activeSlide = document.getElementById(`slide-${index}`);
    const slideTitle = activeSlide ? activeSlide.getAttribute('data-title') : '';
    const segmentName = activeSlide ? activeSlide.getAttribute('data-segment') : '';
    
    const curNum = document.getElementById('slide-current-num') || document.getElementById('current-slide-num');
    const totNum = document.getElementById('slide-total-count') || document.getElementById('total-slides-num');
    const counterEl = document.getElementById('slide-counter');

    if (curNum) curNum.textContent = String(index);
    if (totNum) totNum.textContent = String(state.totalSlides);
    if (counterEl) {
      counterEl.innerHTML = state.isKhmer 
        ? `ស្លាយទី <span id="slide-current-num">${index}</span> / <span id="slide-total-count">${state.totalSlides}</span>`
        : `Slide <span id="slide-current-num">${index}</span> / <span id="slide-total-count">${state.totalSlides}</span>`;
    }
    if (dom.currentSlideTitle) {
      if (state.isKhmer && KHMER_SLIDES[index - 1]) {
        dom.currentSlideTitle.textContent = KHMER_SLIDES[index - 1].title;
      } else {
        dom.currentSlideTitle.textContent = slideTitle;
      }
    }
    if (dom.timerSegmentName) {
      if (state.isKhmer && KHMER_SLIDES[index - 1]) {
        dom.timerSegmentName.textContent = KHMER_SLIDES[index - 1].segment;
      } else {
        dom.timerSegmentName.textContent = segmentName;
      }
    }

    // Update Progress Bar
    const progressFill = document.getElementById('progress-bar') || document.getElementById('progress-fill') || document.getElementById('progress-bar-fill');
    const percent = ((index) / state.totalSlides) * 100;
    if (progressFill) progressFill.style.width = `${percent}%`;

    // Update Nav Buttons
    if (dom.btnPrev) dom.btnPrev.disabled = index === 1;
    if (dom.btnNext) {
      if (index === state.totalSlides) {
        dom.btnNext.innerHTML = state.isKhmer ? `<span>បញ្ចប់</span>` : `<span>Finish</span>`;
      } else {
        const nextText = state.isKhmer ? 'បន្ទាប់' : 'Next';
        dom.btnNext.innerHTML = `<span>${nextText}</span><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>`;
      }
    }

    // Update Trainer Notes Content
    updateNotesContent();

    // Update Overview Cards Active State
    updateOverviewActiveCard();
  }

  function nextSlide() {
    if (state.currentSlide < state.totalSlides) {
      showSlide(state.currentSlide + 1);
    }
  }

  function prevSlide() {
    if (state.currentSlide > 1) {
      showSlide(state.currentSlide - 1);
    }
  }

  function restartPresentation() {
    showSlide(1);
  }

  // ==========================================================================
  // TRAINER NOTES DRAWER
  // Notes are strictly hidden on slide canvas and rendered inside the drawer
  // ==========================================================================
  function updateNotesContent() {
    const activeSlide = document.getElementById(`slide-${state.currentSlide}`);
    if (!activeSlide || !dom.notesContent) return;
    
    const noteEl = activeSlide.querySelector('aside.trainer-notes');
    if (noteEl) {
      dom.notesContent.innerHTML = noteEl.innerHTML;
    } else {
      dom.notesContent.innerHTML = '<p>No specific script notes for this slide.</p>';
    }
  }

  function toggleNotesDrawer() {
    state.isNotesOpen = !state.isNotesOpen;
    if (dom.notesDrawer) {
      dom.notesDrawer.classList.toggle('open', state.isNotesOpen);
    }
    if (dom.notesToggleBtn) {
      dom.notesToggleBtn.classList.toggle('active', state.isNotesOpen);
    }
  }

  // ==========================================================================
  // SLIDE OVERVIEW GRID (O / G)
  // ==========================================================================
  function renderOverviewGrid() {
    if (!dom.overviewGrid) return;
    dom.overviewGrid.innerHTML = '';

    dom.slides.forEach((slide, idx) => {
      const slideNum = idx + 1;
      const title = state.isKhmer && KHMER_SLIDES[idx]
        ? KHMER_SLIDES[idx].title
        : (slide.getAttribute('data-title') || `Slide ${slideNum}`);
      const card = document.createElement('div');
      card.className = `overview-card ${slideNum === state.currentSlide ? 'active' : ''}`;
      card.setAttribute('data-slide', slideNum);
      card.innerHTML = `
        <span class="overview-card-num">#${String(slideNum).padStart(2, '0')}</span>
        <span class="overview-card-title">${title}</span>
      `;
      card.addEventListener('click', () => {
        showSlide(slideNum);
        toggleOverviewModal(false);
      });
      dom.overviewGrid.appendChild(card);
    });
  }

  function updateOverviewActiveCard() {
    if (!dom.overviewGrid) return;
    const cards = dom.overviewGrid.querySelectorAll('.overview-card');
    cards.forEach((card, idx) => {
      card.classList.toggle('active', idx + 1 === state.currentSlide);
    });
  }

  function toggleOverviewModal(forceState) {
    state.isOverviewOpen = typeof forceState === 'boolean' ? forceState : !state.isOverviewOpen;
    if (dom.overviewModal) {
      dom.overviewModal.classList.toggle('open', state.isOverviewOpen);
    }
  }

  // ==========================================================================
  // PRESENTER FOCUS LASER POINTER & CLICK SHOCKWAVE RIPPLE
  // ==========================================================================
  function setupLaserPointer() {
    if (state.isLaserActive) {
      document.body.classList.add('laser-mode');
    }

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;

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
    initConstructorWorkbench();
    initSimulatorWorkbench();
    initQuizWorkbench();
    initAnswerReveals();
    renderOverviewGrid();
    showSlide(state.currentSlide);
  }

  // ==========================================================================
  // 90-MINUTE LIVE ACTIVITY TIMER
  // ==========================================================================
  function setupTimer() {
    if (dom.timerToggleBtn) {
      dom.timerToggleBtn.addEventListener('click', toggleTimer);
    }
    if (dom.timerResetBtn) {
      dom.timerResetBtn.addEventListener('click', resetTimer);
    }
  }

  function toggleTimer() {
    state.timerRunning = !state.timerRunning;
    if (state.timerRunning) {
      state.timerInterval = setInterval(() => {
        state.timerSeconds++;
        updateTimerDisplay();
      }, 1000);
      if (dom.timerIcon) {
        dom.timerIcon.innerHTML = `<path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>`;
      }
    } else {
      clearInterval(state.timerInterval);
      if (dom.timerIcon) {
        dom.timerIcon.innerHTML = `<path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>`;
      }
    }
  }

  function resetTimer() {
    clearInterval(state.timerInterval);
    state.timerRunning = false;
    state.timerSeconds = 0;
    updateTimerDisplay();
    if (dom.timerIcon) {
      dom.timerIcon.innerHTML = `<path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>`;
    }
  }

  function updateTimerDisplay() {
    if (!dom.timerDisplay) return;
    const mins = Math.floor(state.timerSeconds / 60);
    const secs = state.timerSeconds % 60;
    dom.timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  // ==========================================================================
  // WIDGET 1: INTERACTIVE CONSTRUCTOR WORKBENCH (SLIDE 12)
  // ==========================================================================
  let workOrdersData = [
    { id: "WO-101", machine: "Press #6", issue: "Hydraulic cylinder jitter", cost: 850, priority: "High", status: "Submitted" },
    { id: "WO-102", machine: "Press #2", issue: "Hydraulic oil seal leak", cost: 2400, priority: "Critical Safety", status: "Approved" },
    { id: "WO-103", machine: "Cooling Tower", issue: "Chiller pump cavitation", cost: 12000, priority: "Critical Safety", status: "Submitted" }
  ];
  let activeTableFilter = "All";
  let ticketIdCounter = 104;

  function initConstructorWorkbench() {
    const btnAdd = document.getElementById('wb-btn-add-record');
    const inputMachine = document.getElementById('wb-machine');
    const inputIssue = document.getElementById('wb-issue');
    const inputCost = document.getElementById('wb-cost');
    const inputPriority = document.getElementById('wb-priority');
    const previewJson = document.getElementById('wb-record-json');

    function updatePreview() {
      if (!previewJson) return;
      const m = inputMachine ? inputMachine.value : 'Press #6';
      const c = inputCost ? Number(inputCost.value) || 0 : 850;
      const p = inputPriority ? inputPriority.value : 'High';
      previewJson.innerHTML = `<code>{ Machine: "${m}", Cost: ${c}, Priority: "${p}", Status: "Submitted" }</code>`;
    }

    if (inputMachine) inputMachine.addEventListener('input', updatePreview);
    if (inputCost) inputCost.addEventListener('input', updatePreview);
    if (inputPriority) inputPriority.addEventListener('change', updatePreview);

    if (btnAdd) {
      btnAdd.onclick = () => {
        const machine = inputMachine ? inputMachine.value.trim() || 'Machine Alpha' : 'Press #6';
        const issue = inputIssue ? inputIssue.value.trim() || 'General maintenance check' : 'Issue';
        const cost = inputCost ? Number(inputCost.value) || 500 : 500;
        const priority = inputPriority ? inputPriority.value : 'High';

        const newRecord = {
          id: `WO-${ticketIdCounter++}`,
          machine,
          issue,
          cost,
          priority,
          status: "Submitted"
        };

        workOrdersData.push(newRecord);
        renderConstructorTable();
      };
    }

    // Filter Buttons
    const filterBtns = document.querySelectorAll('.table-filter-controls .filter-btn');
    filterBtns.forEach(btn => {
      btn.onclick = () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeTableFilter = btn.getAttribute('data-filter') || "All";
        renderConstructorTable();
      };
    });

    renderConstructorTable();
  }

  function renderConstructorTable() {
    const tbody = document.getElementById('wb-table-body');
    const rowCountEl = document.getElementById('wb-row-count');
    const sumCostEl = document.getElementById('wb-sum-cost');
    const formulaEl = document.getElementById('wb-active-formula');
    if (!tbody) return;

    tbody.innerHTML = '';

    const filtered = workOrdersData.filter(row => {
      if (activeTableFilter === "All") return true;
      if (activeTableFilter === "Submitted") return row.status === "Submitted";
      if (activeTableFilter === "Approved") return row.status === "Approved";
      if (activeTableFilter === "Critical Safety") return row.priority === "Critical Safety";
      return true;
    });

    filtered.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${row.id}</strong></td>
        <td>${row.machine}</td>
        <td>${row.issue}</td>
        <td>$${row.cost.toLocaleString()}</td>
        <td><span class="badge ${row.priority === 'Critical Safety' ? 'badge-yes' : ''}">${row.priority}</span></td>
        <td><span class="status-pill status-submitted">${row.status}</span></td>
      `;
      tbody.appendChild(tr);
    });

    // Update Metrics
    if (rowCountEl) rowCountEl.textContent = `CountRows: ${filtered.length}`;
    const totalCost = filtered.reduce((sum, r) => sum + r.cost, 0);
    if (sumCostEl) sumCostEl.textContent = `Sum(Cost): $${totalCost.toLocaleString()}`;

    // Update Formula Bar
    if (formulaEl) {
      if (activeTableFilter === "All") {
        formulaEl.textContent = `WorkOrders // Entire Table (${workOrdersData.length} records)`;
      } else if (activeTableFilter === "Submitted") {
        formulaEl.textContent = `Filter(WorkOrders, Status = "Submitted")`;
      } else if (activeTableFilter === "Critical Safety") {
        formulaEl.textContent = `Filter(WorkOrders, Priority = "Critical Safety")`;
      } else if (activeTableFilter === "Approved") {
        formulaEl.textContent = `Filter(WorkOrders, Status = "Approved")`;
      }
    }
  }

  // ==========================================================================
  // WIDGET 2: MULTI-SCENARIO DATA STRUCTURE SIMULATOR (SLIDE 18)
  // ==========================================================================
  const SIM_SCENARIOS = [
    {
      num: 1,
      badgeEn: "Scenario 1: User Identity",
      badgeKh: "ស្ថានភាពទី ១៖ អត្តសញ្ញាណអ្នកប្រើ",
      titleEn: "Where do we store the full name of the employee currently logged into the app?",
      titleKh: "តើយើងត្រូវរក្សាទុកឈ្មោះពេញរបស់បុគ្គលិកដែលកំពុងប្រើប្រាស់កម្មវិធីនៅឯណា?",
      descEn: "The mobile app displays 'Welcome, Bopha!' at the top of the header.",
      descKh: "កម្មវិធីទូរស័ព្ទត្រូវបង្ហាញពាក្យ 'សូមស្វាគមន៍, Bopha!' នៅផ្នែកខាងលើនៃអេក្រង់។",
      correct: "value",
      feedbackEn: "Correct! This is a Single Value (Text). It represents exactly one person's name extracted via User().FullName.",
      feedbackKh: "ត្រឹមត្រូវ! នេះគឺជា Single Value (Text)។ វាជាឈ្មោះមនុស្សតែម្នាក់ដែលទាញយកតាមរយៈ User().FullName ដោយមិនបាច់ប្រើតារាងឡើយ។"
    },
    {
      num: 2,
      badgeEn: "Scenario 2: Single Tooling Die Repair Form",
      badgeKh: "ស្ថានភាពទី ២៖ ទម្រង់ជួសជុលពុម្ពម៉ាស៊ីនមួយ",
      titleEn: "When a technician opens Ticket WO-103 to inspect its parts, hours, and photos, what is the screen displaying?",
      titleKh: "នៅពេលជាងជួសជុលបើកមើលសំបុត្រ WO-103 ដើម្បីពិនិត្យគ្រឿងបន្លាស់ ម៉ោង និងរូបថត តើអេក្រង់កំពុងបង្ហាញអ្វី?",
      descEn: "The screen shows all the specific facts and details belonging to that one broken machine.",
      descKh: "អេក្រង់បង្ហាញព័ត៌មានលម្អិតទាំងអស់ដែលជាកម្មសិទ្ធិនៃម៉ាស៊ីនខូចមួយនោះ។",
      correct: "record",
      feedbackEn: "Correct! This is a Single Record. In Power Apps, it is bound to Form.Item = Gallery.Selected. All fields belong to that ONE case.",
      feedbackKh: "ត្រឹមត្រូវ! នេះគឺជា Single Record។ ក្នុង Power Apps វាភ្ជាប់ទៅកាន់ Form.Item = Gallery.Selected ដែលជួរឈរទាំងអស់នៅលើអេក្រង់ជាកម្មសិទ្ធិនៃករណីតែមួយ។"
    },
    {
      num: 3,
      badgeEn: "Scenario 3: Supervisor Morning Work Queue",
      badgeKh: "ស្ថានភាពទី ៣៖ បញ្ជីការងារពេលព្រឹករបស់ Supervisor",
      titleEn: "The supervisor opens an iPad to view all 14 broken machines waiting for triage today. What is the screen displaying?",
      titleKh: "Supervisor បើក iPad មើលបញ្ជីម៉ាស៊ីនខូចទាំង ១៤ គ្រឿងដែលកំពុងរង់ចាំការពិនិត្យថ្ងៃនេះ។ តើអេក្រង់កំពុងបង្ហាញអ្វី?",
      descEn: "A scrollable list of multiple machine requests waiting for review.",
      descKh: "បញ្ជីរមូរនៃសំណើសុំជួសជុលម៉ាស៊ីនជាច្រើនដែលកំពុងរង់ចាំការត្រួតពិនិត្យ។",
      correct: "table",
      feedbackEn: "Correct! This is a Table of Records. In Power Apps, a Gallery binds to Gallery.Items = WorkOrders to show all 14 independent rows.",
      feedbackKh: "ត្រឹមត្រូវ! នេះគឺជា Table of Records។ ក្នុង Power Apps Gallery ភ្ជាប់ទៅកាន់ Gallery.Items = WorkOrders ដើម្បីបង្ហាញជួរទិន្នន័យទាំង ១៤ ដាច់ដោយឡែកពីគ្នា។"
    },
    {
      num: 4,
      badgeEn: "Scenario 4: Calculating Total Spare Parts Cost",
      badgeKh: "ស្ថានភាពទី ៤៖ គណនាតម្លៃគ្រឿងបន្លាស់សរុប",
      titleEn: "The plant manager wants to know the single total dollar figure spent on spare parts across the entire factory this month.",
      titleKh: "ប្រធានរោងចក្រចង់ដឹងពីចំនួនទឹកប្រាក់សរុបទោលមួយដែលបានចំណាយលើគ្រឿងបន្លាស់ក្នុងរោងចក្រទាំងមូលក្នុងខែនេះ។",
      descEn: "A dashboard card displaying the single sum number: '$34,250'.",
      descKh: "កាតសង្ខេបបង្ហាញតួលេខសរុបតែមួយគត់៖ '$34,250'។",
      correct: "value",
      feedbackEn: "Correct! Although calculated from a table using Sum(WorkOrders, Cost), the final result is a Single Value (Currency)!",
      feedbackKh: "ត្រឹមត្រូវ! ទោះបីជាវាត្រូវបានគណនាចេញពីតារាងតាមរយៈ Sum(WorkOrders, Cost) ក៏ដោយ ក៏លទ្ធផលចុងក្រោយរបស់វាគឺជា Single Value (ចំនួនទឹកប្រាក់ទោល)!"
    },
    {
      num: 5,
      badgeEn: "Scenario 5: 30-Day Defect History for Machine #6",
      badgeKh: "ស្ថានភាពទី ៥៖ ប្រវត្តិខូច ៣០ ថ្ងៃនៃម៉ាស៊ីនលេខ ៦",
      titleEn: "The reliability engineer wants to see every failure log recorded for Injection Press #6 over the past 30 days.",
      titleKh: "វិស្វករចង់មើលប្រវត្តិខូចទាំងអស់ដែលបានកត់ត្រាទុកសម្រាប់ម៉ាស៊ីន Press #6 ក្នុងរយៈពេល ៣០ ថ្ងៃកន្លងមក។",
      descEn: "A historical grid showing 12 previous breakdowns and technician notes.",
      descKh: "តារាងប្រវត្តិកត់ត្រាដែលបង្ហាញពីការខូចខាតចំនួន ១២ លើកកន្លងមក និងកំណត់ត្រារបស់ជាង។",
      correct: "table",
      feedbackEn: "Correct! This is a Table. Specifically, it is created using Filter(WorkOrders, MachineName = 'Press #6') to yield 12 records.",
      feedbackKh: "ត្រឹមត្រូវ! នេះគឺជា Table។ វាត្រូវបានបង្កើតឡើងដោយប្រើ Filter(WorkOrders, MachineName = 'Press #6') ដើម្បីទាញយក ១២ Records។"
    },
    {
      num: 6,
      badgeEn: "Scenario 6: Reading an Equipment Barcode",
      badgeKh: "ស្ថានភាពទី ៦៖ ការស្កេនបាកូដលើគ្រឿងចក្រ",
      titleEn: "A worker scans a metal QR code label on a forklift reading 'FL-402'. What kind of data was captured?",
      titleKh: "កម្មករស្កេនបាកូដដែកលើឡានលើកដែលអានឃើញកូដ 'FL-402'។ តើទិន្នន័យដែលចាប់បានជាអ្វី?",
      descEn: "A raw serial string read by the camera scanner.",
      descKh: "កូដសម្គាល់ដើមដែលម៉ាស៊ីនស្កេនចាប់បាន។",
      correct: "value",
      feedbackEn: "Correct! That is a Single Value (Text). It identifies the forklift, but has no other attributes until you use it in LookUp.",
      feedbackKh: "ត្រឹមត្រូវ! នោះគឺជា Single Value (Text)។ វាគ្រាន់តែជាកូដសម្គាល់ឡានលើកប៉ុណ្ណោះ គ្មានព័ត៌មានផ្សេងទៀតទេរហូតដល់អ្នកយកវាទៅប្រើក្នុង LookUp។"
    }
  ];

  let currentSimIndex = 0;
  let simScore = 0;
  let simAnswered = new Array(SIM_SCENARIOS.length).fill(false);

  function initSimulatorWorkbench() {
    const btnPrev = document.getElementById('sim-btn-prev');
    const btnNext = document.getElementById('sim-btn-next');
    const choiceBtns = document.querySelectorAll('.sim-choice-btn');

    if (btnPrev) {
      btnPrev.onclick = () => {
        if (currentSimIndex > 0) {
          currentSimIndex--;
          renderSimScenario();
        }
      };
    }

    if (btnNext) {
      btnNext.onclick = () => {
        if (currentSimIndex < SIM_SCENARIOS.length - 1) {
          currentSimIndex++;
          renderSimScenario();
        }
      };
    }

    choiceBtns.forEach(btn => {
      btn.onclick = () => {
        const choice = btn.getAttribute('data-choice');
        handleSimChoice(choice, btn);
      };
    });

    renderSimScenario();
  }

  function renderSimScenario() {
    const s = SIM_SCENARIOS[currentSimIndex];
    const badgeEl = document.getElementById('sim-badge');
    const titleEl = document.getElementById('sim-title');
    const descEl = document.getElementById('sim-desc');
    const numEl = document.getElementById('sim-current-num');
    const feedbackEl = document.getElementById('sim-feedback');
    const btnPrev = document.getElementById('sim-btn-prev');
    const btnNext = document.getElementById('sim-btn-next');
    const choiceBtns = document.querySelectorAll('.sim-choice-btn');

    if (badgeEl) badgeEl.textContent = state.isKhmer ? s.badgeKh : s.badgeEn;
    if (titleEl) titleEl.textContent = state.isKhmer ? s.titleKh : s.titleEn;
    if (descEl) descEl.textContent = state.isKhmer ? s.descKh : s.descEn;
    if (numEl) numEl.textContent = String(s.num);

    if (btnPrev) {
      btnPrev.disabled = currentSimIndex === 0;
      btnPrev.textContent = state.isKhmer ? 'ស្ថានភាពមុន' : 'Previous Scenario';
    }
    if (btnNext) {
      btnNext.disabled = currentSimIndex === SIM_SCENARIOS.length - 1;
      btnNext.textContent = state.isKhmer ? 'ស្ថានភាពបន្ទាប់ ➔' : 'Next Scenario ➔';
    }

    // Reset buttons and feedback
    choiceBtns.forEach(b => {
      b.classList.remove('correct', 'wrong');
      b.disabled = simAnswered[currentSimIndex];
    });

    if (simAnswered[currentSimIndex]) {
      if (feedbackEl) {
        feedbackEl.style.display = 'block';
        feedbackEl.textContent = state.isKhmer ? s.feedbackKh : s.feedbackEn;
      }
    } else {
      if (feedbackEl) feedbackEl.style.display = 'none';
    }
  }

  function handleSimChoice(choice, btn) {
    const s = SIM_SCENARIOS[currentSimIndex];
    const feedbackEl = document.getElementById('sim-feedback');
    const scoreEl = document.getElementById('sim-score');
    const choiceBtns = document.querySelectorAll('.sim-choice-btn');

    simAnswered[currentSimIndex] = true;
    choiceBtns.forEach(b => b.disabled = true);

    const feedbackText = state.isKhmer ? s.feedbackKh : s.feedbackEn;
    const correctLabel = state.isKhmer ? 'ត្រឹមត្រូវ!' : 'Correct!';
    const wrongLabel = state.isKhmer ? 'មិនទាន់ត្រឹមត្រូវទេ៖' : 'Not quite:';

    if (choice === s.correct) {
      btn.classList.add('correct');
      simScore++;
      if (scoreEl) scoreEl.textContent = String(simScore);
      if (feedbackEl) {
        feedbackEl.style.display = 'block';
        feedbackEl.style.borderColor = 'var(--fluent-green-light)';
        feedbackEl.innerHTML = `<strong>${correctLabel}</strong> ${feedbackText}`;
      }
    } else {
      btn.classList.add('wrong');
      const correctBtn = document.querySelector(`.sim-choice-btn[data-choice="${s.correct}"]`);
      if (correctBtn) correctBtn.classList.add('correct');
      if (feedbackEl) {
        feedbackEl.style.display = 'block';
        feedbackEl.style.borderColor = 'var(--fluent-red-light)';
        feedbackEl.innerHTML = `<strong>${wrongLabel}</strong> ${feedbackText}`;
      }
    }
  }

  // ==========================================================================
  // WIDGET 3: 5-QUESTION EVALUATIVE KNOWLEDGE CHECK (SLIDE 20)
  // ==========================================================================
  const QUIZ_QUESTIONS = [
    {
      num: 1,
      titleEn: "What is the structural relationship between a Record, a Column, and a Table?",
      titleKh: "តើអ្វីជាទំនាក់ទំនងរចនាសម្ព័ន្ធរវាង Record, Column, និង Table?",
      optionsEn: [
        "A Column is a category; a Record is one complete case; a Table is a collection of records sharing the same columns.",
        "A Record and a Column are identical; a Table is just a single global variable.",
        "A Table is a loose Excel file; Columns hold only text sentences; Records are created by emailing PDFs.",
        "A Record is an entire database; a Column is a screen in Power Apps; a Table is a button."
      ],
      optionsKh: [
        "Column ជាប្រភេទសំណួរ; Record ជាករណីមួយពេញលេញ; Table ជាបណ្តុំ Record ដែលមាន Column ដូចៗគ្នា។",
        "Record និង Column គឺដូចគ្នាទាំងស្រុង; Table គ្រាន់តែជា Global Variable តែមួយប៉ុណ្ណោះ។",
        "Table ជាឯកសារ Excel រញ៉េរញ៉ៃ; Columns ផ្ទុកតែអក្សរ; Records បង្កើតឡើងដោយការផ្ញើ Email PDF។",
        "Record ជាមូលដ្ឋានទិន្នន័យទាំងមូល; Column ជាអេក្រង់ក្នុង Power Apps; Table គឺជាប៊ូតុងមួយ។"
      ],
      correctIndex: 0,
      feedbackEn: "Mastery! A Column defines a named category and type (e.g. Cost: Currency); a Record bundles all facts about one case { }; and a Table collects many records [ ].",
      feedbackKh: "ស្ទាត់ជំនាញ! Column កំណត់ឈ្មោះប្រភេទនិងលក្ខខណ្ឌ (ឧ. Cost: Currency); Record ប្រមូលអង្គហេតុទាំងអស់អំពីករណីមួយ { }; ហើយ Table ប្រមូល Record ជាច្រើន [ ]។"
    },
    {
      num: 2,
      titleEn: "WHY did Apex Plastics lose $64,000 when they managed work orders with single variables?",
      titleKh: "ហេតុអ្វីបានជា Apex Plastics ខាតបង់ $64,000 នៅពេលពួកគេគ្រប់គ្រងការងារដោយប្រើ Variable តែមួយ?",
      optionsEn: [
        "Because single variables can only hold ONE case at a time, so Operator Chan's $15 lightbulb ticket completely overwrote the critical cooling tower pump failure in memory.",
        "Because variables are too expensive to purchase on the Microsoft 365 licensing portal.",
        "Because the cooling tower was not connected to Wi-Fi on Monday morning.",
        "Because Power Apps only allows 3 variables per application."
      ],
      optionsKh: [
        "ពីព្រោះ Variable អាចផ្ទុកបានតែ ១ ករណីក្នុងពេលតែមួយ ដូច្នេះសំបុត្រអំពូលភ្លើង $15 របស់ Chan បានលុបជាន់លើសំណើប៉មត្រជាក់បន្ទាន់ក្នុងអង្គចងចាំ។",
        "ពីព្រោះ Variable មានតម្លៃថ្លៃពេកមិនអាចទិញបាននៅលើ Microsoft 365 Licensing Portal។",
        "ពីព្រោះប៉មត្រជាក់មិនបានភ្ជាប់ Wi-Fi នៅព្រឹកថ្ងៃចន្ទ។",
        "ពីព្រោះ Power Apps អនុញ្ញាតឱ្យប្រើប្រាស់ Variable ត្រឹមតែ ៣ ប៉ុណ្ណោះក្នុងកម្មវិធីមួយ។"
      ],
      correctIndex: 0,
      feedbackEn: "Essential Why Insight! Variables hold exactly one memory slot. When multiple employees submit requests, each new submission erases the previous submission. Real apps need Tables!",
      feedbackKh: "ការយល់ដឹងស៊ីជម្រៅ! Variable មានកន្លែងចងចាំតែមួយគត់។ ពេលបុគ្គលិកជាច្រើនផ្ញើសំណើ សំណើថ្មីនឹងលុបសំណើចាស់ចោល។ កម្មវិធីពិតប្រាកដត្រូវតែប្រើ Tables!"
    },
    {
      num: 3,
      titleEn: "WHAT HAPPENS IF you write 'WorkOrders.Status' instead of 'ThisItem.Status' in a gallery row label?",
      titleKh: "តើមានអ្វីកើតឡើងប្រសិនបើអ្នកសរសេរ 'WorkOrders.Status' ជំនួសឱ្យ 'ThisItem.Status' ក្នុង Gallery?",
      optionsEn: [
        "Power Apps displays an error because 'WorkOrders.Status' returns an entire column of many values (a Table), while the row label expects only ONE specific value.",
        "The entire computer screen turns black and shuts down.",
        "The formula works fine, but changes the font color to purple.",
        "Power Apps automatically deletes the entire database."
      ],
      optionsKh: [
        "Power Apps នឹងបង្ហាញកំហុសព្រោះ 'WorkOrders.Status' ផ្តល់មកវិញនូវជួរឈរទាំងមូលដែលមានតម្លៃរាប់រយ (Table) ខណៈដែល Label រង់ចាំតែតម្លៃ ១ គត់។",
        "អេក្រង់កុំព្យូទ័រទាំងមូលនឹងងងឹត ហើយបិទដំណើរការ។",
        "រូបមន្តដំណើរការធម្មតា ប៉ុន្តែវាប្តូរពណ៌អក្សរទៅជាពណ៌ស្វាយ។",
        "Power Apps នឹងលុបមូលដ្ឋានទិន្នន័យទាំងមូលដោយស្វ័យប្រវត្តិ។"
      ],
      correctIndex: 0,
      feedbackEn: "Critical Syntax Rule! WorkOrders.Status is a column of 500 status words. A single card label cannot display 500 words at once. It only wants ThisItem.Status (one record's value).",
      feedbackKh: "ក្បួនវេយ្យាករណ៍សំខាន់! WorkOrders.Status ជាជួរឈរដែលមានពាក្យ Status ៥០០។ Label មួយមិនអាចបង្ហាញពាក្យ ៥០០ ក្នុងពេលតែមួយបានទេ។ វាត្រូវការតែ ThisItem.Status ប៉ុណ្ណោះ!"
    },
    {
      num: 4,
      titleEn: "Which punctuation marks wrap a single Record and access a column in Power Fx?",
      titleKh: "តើសញ្ញាសម្គាល់ណាខ្លះដែលក្តោបព័ទ្ធ Record មួយ និងទាញយកជួរឈរក្នុង Power Fx?",
      optionsEn: [
        "Curly braces { } wrap a record, and the dot (.) accesses a column (e.g. ThisItem.Status).",
        "Parentheses ( ) wrap a record, and a comma (,) accesses a column.",
        "Square brackets [ ] wrap a record, and an exclamation mark (!) accesses a column.",
        "Quotation marks \" \" wrap a record, and a hashtag (#) accesses a column."
      ],
      optionsKh: [
        "វង់ក្រចកទម្រង់ { } ក្តោប Record មួយ ហើយសញ្ញាចុច (.) ទាញយកជួរឈរ (ឧ. ThisItem.Status)។",
        "វង់ក្រចកធម្មតា ( ) ក្តោប Record ហើយសញ្ញាក្បៀស (,) ទាញយកជួរឈរ។",
        "វង់ក្រចកទម្រង់ [ ] ក្តោប Record ហើយសញ្ញាឧទាន (!) ទាញយកជួរឈរ។",
        "សញ្ញាសម្រង់ \" \" ក្តោប Record ហើយសញ្ញាទ្រុងជ្រូក (#) ទាញយកជួរឈរ។"
      ],
      correctIndex: 0,
      feedbackEn: "Grammar Perfection! In Power Fx: { } hugs a single record; [ ] encloses a table; and the dot (.) is your pointer finger pointing inside the record!",
      feedbackKh: "វេយ្យាករណ៍ឥតខ្ចោះ! ក្នុង Power Fx: { } ក្តោប Record មួយ; [ ] ក្តោប Table មួយ; ហើយសញ្ញាចុច (.) គឺជាម្រាមដៃចង្អុលចូលទៅក្នុង Record!"
    },
    {
      num: 5,
      titleEn: "What Power Fx formula returns ONLY the work orders that currently need supervisor triage?",
      titleKh: "តើរូបមន្ត Power Fx ណាដែលផ្តល់មកវិញតែសំបុត្រការងារដែលកំពុងរង់ចាំការពិនិត្យរបស់ Supervisor?",
      optionsEn: [
        "Filter(WorkOrders, Status = \"Submitted\")",
        "Sum(WorkOrders, Status = \"Submitted\")",
        "LookUp(WorkOrders, true)",
        "CountRows(WorkOrders)"
      ],
      optionsKh: [
        "Filter(WorkOrders, Status = \"Submitted\")",
        "Sum(WorkOrders, Status = \"Submitted\")",
        "LookUp(WorkOrders, true)",
        "CountRows(WorkOrders)"
      ],
      correctIndex: 0,
      feedbackEn: "Table Query Mastered! Filter(Table, Condition) scans all rows and returns a subset table containing only the records where the condition evaluates to True!",
      feedbackKh: "ស្ទាត់ជំនាញលើតារាង! Filter(Table, Condition) ពិនិត្យលើគ្រប់ជួរ ហើយផ្តល់មកវិញនូវតារាងរងដែលផ្ទុកតែ Record ណាដែលលក្ខខណ្ឌចេញ True ប៉ុណ្ណោះ!"
    }
  ];

  let currentQuizIndex = 0;
  let quizAnswered = new Array(QUIZ_QUESTIONS.length).fill(false);

  function initQuizWorkbench() {
    const btnPrev = document.getElementById('quiz-btn-prev');
    const btnNext = document.getElementById('quiz-btn-next');

    if (btnPrev) {
      btnPrev.onclick = () => {
        if (currentQuizIndex > 0) {
          currentQuizIndex--;
          renderQuizQuestion();
        }
      };
    }

    if (btnNext) {
      btnNext.onclick = () => {
        if (currentQuizIndex < QUIZ_QUESTIONS.length - 1) {
          currentQuizIndex++;
          renderQuizQuestion();
        }
      };
    }

    renderQuizQuestion();
  }

  function renderQuizQuestion() {
    const q = QUIZ_QUESTIONS[currentQuizIndex];
    const numEl = document.getElementById('quiz-current-num');
    const titleEl = document.getElementById('quiz-question-title');
    const optionsContainer = document.getElementById('quiz-options-container');
    const feedbackEl = document.getElementById('quiz-feedback');
    const btnPrev = document.getElementById('quiz-btn-prev');
    const btnNext = document.getElementById('quiz-btn-next');
    const dots = document.querySelectorAll('.quiz-progress-dots .dot');

    if (numEl) numEl.textContent = String(q.num);
    if (titleEl) titleEl.textContent = state.isKhmer ? q.titleKh : q.titleEn;

    if (btnPrev) {
      btnPrev.disabled = currentQuizIndex === 0;
      btnPrev.textContent = state.isKhmer ? 'សំណួរមុន' : 'Previous';
    }
    if (btnNext) {
      btnNext.disabled = currentQuizIndex === QUIZ_QUESTIONS.length - 1;
      btnNext.textContent = state.isKhmer ? 'សំណួរបន្ទាប់ ➔' : 'Next Question ➔';
    }

    // Update Dots
    dots.forEach((dot, idx) => {
      dot.classList.remove('active', 'completed');
      if (idx === currentQuizIndex) dot.classList.add('active');
      if (quizAnswered[idx]) dot.classList.add('completed');
    });

    if (!optionsContainer) return;
    optionsContainer.innerHTML = '';

    const opts = state.isKhmer ? q.optionsKh : q.optionsEn;
    opts.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.textContent = `${String.fromCharCode(65 + optIdx)}. ${optText}`;
      btn.disabled = quizAnswered[currentQuizIndex];

      btn.onclick = () => {
        handleQuizAnswer(optIdx, btn);
      };

      optionsContainer.appendChild(btn);
    });

    if (feedbackEl) {
      feedbackEl.style.display = quizAnswered[currentQuizIndex] ? 'block' : 'none';
      if (quizAnswered[currentQuizIndex]) {
        const explText = state.isKhmer ? q.feedbackKh : q.feedbackEn;
        feedbackEl.innerHTML = `<strong>${state.isKhmer ? 'ការពន្យល់ស៊ីជម្រៅ៖' : 'Mastery Explanation:'}</strong> ${explText}`;
      }
    }
  }

  function handleQuizAnswer(selectedIdx, btn) {
    const q = QUIZ_QUESTIONS[currentQuizIndex];
    const feedbackEl = document.getElementById('quiz-feedback');
    const options = document.querySelectorAll('.quiz-option-btn');

    quizAnswered[currentQuizIndex] = true;
    options.forEach(b => b.disabled = true);

    const feedbackText = state.isKhmer ? q.feedbackKh : q.feedbackEn;
    const correctLabel = state.isKhmer ? 'ត្រឹមត្រូវ!' : 'Correct!';
    const wrongLabel = state.isKhmer ? 'ការកែតម្រូវស្ថាបត្យកម្ម៖' : 'Architectural Correction:';

    if (selectedIdx === q.correctIndex) {
      btn.classList.add('correct');
      if (feedbackEl) {
        feedbackEl.style.display = 'block';
        feedbackEl.style.borderColor = 'var(--fluent-green-light)';
        feedbackEl.innerHTML = `<strong>${correctLabel}</strong> ${feedbackText}`;
      }
    } else {
      btn.classList.add('wrong');
      if (options[q.correctIndex]) {
        options[q.correctIndex].classList.add('correct');
      }
      if (feedbackEl) {
        feedbackEl.style.display = 'block';
        feedbackEl.style.borderColor = 'var(--fluent-red-light)';
        feedbackEl.innerHTML = `<strong>${wrongLabel}</strong> ${feedbackText}`;
      }
    }

    const dots = document.querySelectorAll('.quiz-progress-dots .dot');
    if (dots[currentQuizIndex]) dots[currentQuizIndex].classList.add('completed');
  }

  // ==========================================================================
  // RETRIEVAL ANSWER REVEALS (SLIDE 5) & BENCHMARK REVEAL (SLIDE 21)
  // ==========================================================================
  function initAnswerReveals() {
    const revealBtns = document.querySelectorAll('.btn-reveal-answer');
    revealBtns.forEach(btn => {
      btn.onclick = () => {
        const targetId = btn.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.classList.toggle('revealed');
          if (state.isKhmer) {
            btn.textContent = targetEl.classList.contains('revealed') ? 'បិទបាំងចម្លើយវិញ' : 'បង្ហាញចម្លើយគំរូ';
          } else {
            btn.textContent = targetEl.classList.contains('revealed') ? 'Hide Answer' : 'Reveal Master Answer';
          }
        }
      };
    });

    const btnRevealSolution = document.getElementById('btn-reveal-solution');
    if (btnRevealSolution) {
      btnRevealSolution.onclick = () => {
        showSlide(22);
      };
    }

    const btnStartHero = document.getElementById('btn-start-presentation');
    if (btnStartHero) {
      btnStartHero.onclick = () => {
        showSlide(2);
      };
    }
  }

  // ==========================================================================
  // GLOBAL KEYBOARD & EVENT LISTENERS
  // ==========================================================================
  function setupEventListeners() {
    const prevBtn = document.getElementById('btn-prev') || dom.btnPrev;
    const nextBtn = document.getElementById('btn-next') || dom.btnNext;
    if (prevBtn) {
      prevBtn.onclick = prevSlide;
      prevBtn.addEventListener('click', prevSlide);
    }
    if (nextBtn) {
      nextBtn.onclick = nextSlide;
      nextBtn.addEventListener('click', nextSlide);
    }
    if (dom.btnRestart) dom.btnRestart.addEventListener('click', restartPresentation);

    if (dom.notesToggleBtn) dom.notesToggleBtn.addEventListener('click', toggleNotesDrawer);
    if (dom.notesCloseBtn) dom.notesCloseBtn.addEventListener('click', toggleNotesDrawer);
    if (dom.overviewToggleBtn) dom.overviewToggleBtn.addEventListener('click', () => toggleOverviewModal());
    if (dom.overviewCloseBtn) dom.overviewCloseBtn.addEventListener('click', () => toggleOverviewModal(false));

    if (dom.langSwitchBtn) dom.langSwitchBtn.addEventListener('click', toggleLanguage);
    if (dom.laserToggleBtn) dom.laserToggleBtn.addEventListener('click', toggleLaserMode);
    if (dom.fullscreenBtn) dom.fullscreenBtn.addEventListener('click', toggleFullscreen);

    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'Space':
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
          showSlide(1);
          break;
        case 'End':
          e.preventDefault();
          showSlide(state.totalSlides);
          break;
        case 'r':
        case 'R':
          restartPresentation();
          break;
        case 'l':
        case 'L':
          toggleLanguage();
          break;
        case 'p':
        case 'P':
          toggleLaserMode();
          break;
        case 'n':
        case 'N':
          toggleNotesDrawer();
          break;
        case 'o':
        case 'O':
        case 'g':
        case 'G':
          toggleOverviewModal();
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'Escape':
          if (state.isOverviewOpen) toggleOverviewModal(false);
          if (state.isNotesOpen) toggleNotesDrawer();
          break;
      }
    });
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  // Boot Application Engine
  document.addEventListener('DOMContentLoaded', init);
  document.addEventListener('DOMContentLoaded', function() {
    try {
      const savedLang = localStorage.getItem('powerapps_presentation_lang') || 
        (JSON.parse(localStorage.getItem('powerapps_master_curriculum_state_v1') || '{}').isKhmer ? 'km' : null);
      if (savedLang === 'km' && !isKhmerActive && typeof toggleLanguage === 'function') {
        toggleLanguage();
      }
    } catch(e) {}
  });

  // Universal Window Exports for inline HUD onclick handlers
  window.prevSlide = prevSlide;
  window.nextSlide = nextSlide;
  window.goToSlide = showSlide;
  window.showSlide = showSlide;
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
  // Universal Window Exports for inline HUD onclick handlers
  window.prevSlide = prevSlide;
  window.nextSlide = nextSlide;
  window.goToSlide = showSlide;
  window.showSlide = showSlide;
  window.toggleLanguage = toggleLanguage;
  window.toggleNotes = toggleNotesDrawer;
  window.toggleOverview = toggleOverviewModal;
  window.toggleTimer = toggleTimer;
  window.toggleFullscreen = toggleFullscreen;
  window.toggleLaser = toggleLaserMode;

})();
