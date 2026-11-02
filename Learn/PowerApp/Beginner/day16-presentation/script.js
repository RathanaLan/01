/* ============================================================================
   POWER APPS FOUNDATION: DAY 16 PRESENTATION ENGINE
   Topic: Properties & Formulas: How Controls Behave
   Phase: Phase 6: Power Fx Fundamentals
   Theme: Microsoft Fluent 2 Dark Mode (Industrial Neon / Precision Glass)
   Bilingual: English + Khmer (100% Exact 1-to-1 DOM Mirroring - Lesson 14 Architecture)
   ============================================================================ */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. STATE MANAGEMENT
  // --------------------------------------------------------------------------
  let currentSlideIndex = 0;
  const slides = Array.from(document.querySelectorAll('.slide'));
  const totalSlides = slides.length;

  let isKhmerActive = false;
  let isLaserActive = true;
  let isNotesOpen = false;
  let isOverviewOpen = false;

  // 90-minute Countdown Timer (90 minutes = 5400 seconds)
  const TOTAL_TIMER_SECONDS = 90 * 60;
  let remainingSeconds = TOTAL_TIMER_SECONDS;
  let timerInterval = null;
  let isTimerRunning = false;

  // --------------------------------------------------------------------------
  // 2. KHMER SLIDES DATA STORE (100% Exact DOM Mirroring - Inner Content Only)
  // --------------------------------------------------------------------------
  const KHMER_SLIDES = [
    {
      "title": "លក្ខណៈសម្បត្តិ និងរូបមន្ត៖ របៀបដែល Controls ដំណើរការ",
      "segment": "ដំណាក់កាលទី ៦៖ មូលដ្ឋានគ្រឹះ Power Fx",
      "subtitle": "Controls គឺជាតួអង្គទទេ; Properties គឺជាចរិតលក្ខណៈរបស់វា; Formulas គឺជាខួរក្បាលគណនាអាកប្បកិរិយារបស់វា។",
      "content": `<div class="hero-badge">
            <span>គ្រឹះវិជ្ជាជីវៈ Microsoft Power Apps</span>
            <span>&bull;</span>
            <span>ថ្ងៃទី ១៦ នៃ ២៧</span>
          </div>
          <h1 class="hero-title">លក្ខណៈសម្បត្តិ និងរូបមន្ត៖ របៀបដែល Controls ដំណើរការ</h1>
          <p class="hero-subtitle">
            រូបមន្ត (Formula) គណនានូវអ្វីដែល Property ត្រូវបង្ហាញ ឬសកម្មភាពដែលត្រូវអនុវត្ត។ ស្វែងយល់ពីភាពរស់រវើកនៃ Power Apps៖ ពេលអ្នកប្រើប្រាស់វាយទិន្នន័យថ្មី Properties ដែលពាក់ព័ន្ធនឹងគណនាឡើងវិញភ្លាមៗដូចសន្លឹកកិច្ចការ Excel។
          </p>

          <div class="model-chain">
            <span class="chain-item">បញ្ហាជាក់ស្តែង</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ដំណើរការ</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ទិន្នន័យ</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item active">UI / Controls</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item active">តក្កវិជ្ជា / រូបមន្ត</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">សកម្មភាព</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ការផ្ទុក</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ការឆ្លើយតប</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ការធ្វើតេស្ត</span>
          </div>`
    },
    {
      "title": "របៀបវារៈ ៩០ នាទី និងគោលបំណងច្បាស់លាស់",
      "segment": "ផ្នែកទី ១៖ ការណែនាំ និងលទ្ធផលរំពឹងទុក",
      "subtitle": "រចនាសម្ព័ន្ធបង្រៀនជាវង់តំរៀប (Spiral Learning) តភ្ជាប់ Controls ទៅនឹងការគណនាស្វ័យប្រវត្តិ។",
      "content": `<div class="card">
            <h3 class="card-title">៤ គោលបំណងរំពឹងទុកជាក់ស្តែង</h3>
            <div class="objective-item">
              <span class="obj-num">1</span>
              <div>
                <strong>យល់ច្បាស់ពី Control-Property-Formula៖</strong>
                <p>ពន្យល់ដោយពាក្យសាមញ្ញថាហេតុអ្វី Controls ត្រូវការ Properties ហើយរូបមន្តកំណត់តម្លៃរបស់វាដូចសន្លឹក Excel។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">2</span>
              <div>
                <strong>ការប្រើប្រាស់ Dot Operator (.) យ៉ាងស្ទាត់ជំនាញ៖</strong>
                <p>ទាញយកតម្លៃចេញពី Control នីមួយៗដោយប្រើចំណុចចុច (ឧ. <code>ControlName.PropertyName</code>)។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">3</span>
              <div>
                <strong>ការតភ្ជាប់អត្ថបទដោយប្រើសញ្ញា &amp; (Ampersand)៖</strong>
                <p>ផ្គុំអត្ថបទថេរជាមួយតម្លៃបញ្ចូលដើម្បីបង្កើតកូដសម្គាល់ស្វ័យប្រវត្តិ (ឧ. <code>"REQ-" &amp; txtDept.Text</code>)។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">4</span>
              <div>
                <strong>ការបង្កើតកម្មវិធីរាប់ចំនួនតួអក្សរ (Live Counter)៖</strong>
                <p>ប្រើប្រាស់អនុគមន៍ <code>Len()</code> ដើម្បីរាប់ប្រវែងអក្សរផ្ទាល់ និងផ្តល់ដំណឹងភ្លាមៗដល់អ្នកប្រើប្រាស់។</p>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">កាលវិភាគ ៩០ នាទីជាក់លាក់</h3>
            <div class="agenda-timeline">
              <div class="agenda-block">
                <span class="agenda-time">00 - 10m</span>
                <span class="agenda-name">វគ្គទី ១៖ រំលឹកមេរៀនចាស់</span>
                <span class="agenda-desc">គ្រឹះនៃថ្ងៃទី ១៤-១៥</span>
              </div>
              <div class="agenda-block">
                <span class="agenda-time">10 - 20m</span>
                <span class="agenda-name">វគ្គទី ២៖ មូលហេតុចាំបាច់</span>
                <span class="agenda-desc">វិបត្តិដឹកជញ្ជូនខាត $18,000</span>
              </div>
              <div class="agenda-block">
                <span class="agenda-time">20 - 35m</span>
                <span class="agenda-name">វគ្គទី ៣៖ ការវិភាគកូដ Power Fx លម្អិត (Code Breakdown)</span>
                <span class="agenda-desc">សញ្ញា Dot (.) និង &amp;</span>
              </div>
              <div class="agenda-block">
                <span class="agenda-time">35 - 50m</span>
                <span class="agenda-name">វគ្គទី ៤៖ ការបង្ហាញផ្ទាល់ពីគ្រូ</span>
                <span class="agenda-desc">បង្កើត Dynamic Banner</span>
              </div>
              <div class="agenda-block">
                <span class="agenda-time">50 - 65m</span>
                <span class="agenda-name">វគ្គទី ៥៖ អនុវត្តរួមគ្នា</span>
                <span class="agenda-desc">កាត Preview សំណើសុំជំនួយ</span>
              </div>
              <div class="agenda-block">
                <span class="agenda-time">65 - 78m</span>
                <span class="agenda-name">វគ្គទី ៦៖ កិច្ចការស្វ័យគ្រប់គ្រង</span>
                <span class="agenda-desc">ម៉ាស៊ីនបង្កើត Asset Tag</span>
              </div>
              <div class="agenda-block">
                <span class="agenda-time">78 - 86m</span>
                <span class="agenda-name">វគ្គទី ៧៖ តេស្ត និងការវាយតម្លៃ</span>
                <span class="agenda-desc">សំណួរ ៥ + រង្វាស់ Rubric</span>
              </div>
              <div class="agenda-block">
                <span class="agenda-time">86 - 90m</span>
                <span class="agenda-name">វគ្គទី ៨៖ ស្ពានភ្ជាប់ទៅថ្ងៃស្អែក</span>
                <span class="agenda-desc">ត្រៀមខ្លួនសម្រាប់ IF() ថ្ងៃទី ១៧</span>
              </div>
            </div>
          </div>`
    },
    {
      "title": "ផែនទីស្ថាបត្យកម្ម៖ ទីតាំងនៃមេរៀនថ្ងៃនេះក្នុងចំណោម ២៧ ថ្ងៃ",
      "segment": "ផ្នែកទី ១៖ ការណែនាំ និងលទ្ធផលរំពឹងទុក",
      "subtitle": "តភ្ជាប់គំរូផ្នត់គំនិតចម្បង៖ បំប្លែងផ្ទាំងគំនូរស្ងៀមស្តូក ទៅជាប្រព័ន្ធរស់រវើកឆ្លើយតបភ្លាមៗ។",
      "content": `<div class="card">
            <span class="card-badge" style="background: rgba(59, 130, 246, 0.15); color: #60a5fa;">គ្រឹះដំបូង (ថ្ងៃទី ១–១៣)</span>
            <h3 class="card-title">រចនាសម្ព័ន្ធ និងប្លង់</h3>
            <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">
              យើងបានសិក្សាពីលំហូរការងារ តារាងទិន្នន័យ SharePoint និងការរៀបចំ Studio ដោយប្រើ Hungarian naming (<code>lbl</code>, <code>txt</code>, <code>btn</code>)។
            </p>
            <div style="margin-top: auto; padding: 0.75rem; background: rgba(255,255,255,0.04); border-radius: 0.5rem; font-size: 0.8rem; color: #94a3b8;">
              ស្ថានភាព៖ គ្រោងរចនាសម្ព័ន្ធរូបវន្តត្រូវបានបង្កើត។
            </div>
          </div>

          <div class="card" style="border-color: rgba(59, 130, 246, 0.4); background: rgba(30, 41, 59, 0.85);">
            <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">បរិបទមុននេះ (ថ្ងៃទី ១៤–១៥)</span>
            <h3 class="card-title">Controls និងការរុករក (Navigation)</h3>
            <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">
              <strong>ថ្ងៃទី ១៤៖</strong> បែងចែកតួនាទី៖ Label, Input, Dropdown, Button។<br>
              <strong>ថ្ងៃទី ១៥៖</strong> ភ្ជាប់អេក្រង់ច្រើនចូលគ្នាដោយប្រើ <code>Navigate()</code> និង <code>Back()</code>។
            </p>
            <div style="margin-top: auto; padding: 0.75rem; background: rgba(59, 130, 246, 0.15); border-radius: 0.5rem; font-size: 0.8rem; color: #60a5fa;">
              លទ្ធផល៖ អេក្រង់អាចចុចបាន ប៉ុន្តែអក្សរទាំងអស់នៅស្ងៀមស្តូក!
            </div>
          </div>

          <div class="card" style="border-color: var(--color-cyan); box-shadow: 0 0 20px rgba(6, 182, 212, 0.2);">
            <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">ថ្ងៃនេះ (ថ្ងៃ ១៦) &rarr; ថ្ងៃស្អែក (ថ្ងៃ ១៧)</span>
            <h3 class="card-title">Properties, Formulas &amp; Logic</h3>
            <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">
              <strong>ថ្ងៃទី ១៦៖</strong> បញ្ចូលរូបមន្តទៅក្នុង Properties ធ្វើឲ្យ Canvas មានជីវិតដូច Excel។<br>
              <strong>ថ្ងៃទី ១៧៖</strong> បន្ថែមសំណួរ True/False និងលក្ខខណ្ឌ <code>IF()</code> ដើម្បីធ្វើការសម្រេចចិត្ត។
            </p>
            <div style="margin-top: auto; padding: 0.75rem; background: rgba(6, 182, 212, 0.15); border-radius: 0.5rem; font-size: 0.8rem; color: #67e8f9;">
              ការផ្លាស់ប្តូរ៖ ពីផ្ទាំងគំនូរស្ងៀមស្តូក ទៅជាប្រព័ន្ធឆ្លាតវៃកម្រិតសហគ្រាស!
            </div>
          </div>`
    },
    {
      "title": "រំលឹកចំណេះដឹងគ្រឹះ៖ សំណួរបញ្ជាក់ការចងចាំ ៤ ចំណុច",
      "segment": "ផ្នែកទី ២៖ ការរំលឹក និងគ្រឹះចំណេះដឹង",
      "subtitle": "ដាស់ការចងចាំពីថ្ងៃទី ១៤ និង ១៥ មុននឹងឈានទៅកាន់រូបមន្ត Power Fx។",
      "content": `<div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-inner">
              <div class="flip-front">
                <span class="card-badge">រំលឹក ១ &bull; ថ្ងៃទី ១៤</span>
                <h4 style="margin: 0.75rem 0; font-size: 1.05rem;">តើ Control មួយណាសម្រាប់បង្ហាញអត្ថបទដោយមិនបាច់វាយបញ្ចូល?</h4>
                <p style="font-size: 0.82rem; color: var(--text-muted);">គិតអំពីប្រភេទ Controls ទាំង ៤។</p>
                <div class="flip-prompt">ចុចដើម្បីមើលចម្លើយ &circlearrowright;</div>
              </div>
              <div class="flip-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #6ee7b7;">ចម្លើយត្រឹមត្រូវ</span>
                <h4 style="color: #6ee7b7; margin: 0.5rem 0;">Text Label (lbl)</h4>
                <p style="font-size: 0.82rem; color: #cbd5e1; line-height: 1.5;">Label គឺជា Output control សម្រាប់បង្ហាញទិន្នន័យ ឬលទ្ធផលគណនា។ អ្នកប្រើប្រាស់មិនអាចវាយអក្សរចូលបានទេ។</p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-inner">
              <div class="flip-front">
                <span class="card-badge">រំលឹក ២ &bull; ថ្ងៃទី ១៤</span>
                <h4 style="margin: 0.75rem 0; font-size: 1.05rem;">ហេតុអ្វីត្រូវប្រើ Dropdown ជាជាង Text Input សម្រាប់ផ្នែក ឬម៉ាស៊ីន?</h4>
                <p style="font-size: 0.82rem; color: var(--text-muted);">គិតអំពីភាពត្រឹមត្រូវនៃទិន្នន័យ។</p>
                <div class="flip-prompt">ចុចដើម្បីមើលចម្លើយ &circlearrowright;</div>
              </div>
              <div class="flip-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #6ee7b7;">ចម្លើយត្រឹមត្រូវ</span>
                <h4 style="color: #6ee7b7; margin: 0.5rem 0;">ការពារកំហុសអក្ខរាវិរុទ្ធ</h4>
                <p style="font-size: 0.82rem; color: #cbd5e1; line-height: 1.5;">Dropdown កំណត់ជម្រើសជាក់លាក់ ការពារការវាយខុសដែលធ្វើឲ្យខូច Database និងរបាយការណ៍។</p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-inner">
              <div class="flip-front">
                <span class="card-badge">រំលឹក ៣ &bull; ថ្ងៃទី ១៥</span>
                <h4 style="margin: 0.75rem 0; font-size: 1.05rem;">តើអនុគមន៍ណាផ្លាស់ប្តូរអ្នកប្រើប្រាស់ទៅកាន់អេក្រង់ផ្សេង?</h4>
                <p style="font-size: 0.82rem; color: var(--text-muted);">គិតអំពីការរុករក (Navigation)។</p>
                <div class="flip-prompt">ចុចដើម្បីមើលចម្លើយ &circlearrowright;</div>
              </div>
              <div class="flip-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #6ee7b7;">ចម្លើយត្រឹមត្រូវ</span>
                <h4 style="color: #6ee7b7; margin: 0.5rem 0;">Navigate()</h4>
                <p style="font-size: 0.82rem; color: #cbd5e1; line-height: 1.5;"><code>Navigate(ScreenName, Transition)</code> ផ្លាស់ប្តូរផ្ទាំងអេក្រង់ដោយរលូន នាំអ្នកប្រើប្រាស់ទៅជំហានបន្ទាប់។</p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-inner">
              <div class="flip-front">
                <span class="card-badge">រំលឹក ៤ &bull; ថ្ងៃទី ១៥</span>
                <h4 style="margin: 0.75rem 0; font-size: 1.05rem;">តើមានបញ្ហាអ្វីកើតឡើងបើកំណត់ Hardcode អេក្រង់ត្រឡប់ក្រោយជំនួស Back()?</h4>
                <p style="font-size: 0.82rem; color: var(--text-muted);">គិតអំពីផ្លូវដើរច្រើនច្រក។</p>
                <div class="flip-prompt">ចុចដើម្បីមើលចម្លើយ &circlearrowright;</div>
              </div>
              <div class="flip-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #6ee7b7;">ចម្លើយត្រឹមត្រូវ</span>
                <h4 style="color: #6ee7b7; margin: 0.5rem 0;">ជាប់គាំងក្នុងផ្លូវខុស</h4>
                <p style="font-size: 0.82rem; color: #cbd5e1; line-height: 1.5;">អ្នកប្រើប្រាស់នឹងត្រឡប់ទៅអេក្រង់ខុសពីកន្លែងដែលគេមក។ <code>Back()</code> ធានាការថយក្រោយតាមប្រវត្តិជាក់ស្តែង។</p>
              </div>
            </div>
          </div>`
    },
    {
      "title": "វិបត្តិខាតបង់ $18,000៖ គ្រោះថ្នាក់នៃកម្មវិធីគាំងស្តូក (Static Software)",
      "segment": "ផ្នែកទី ២៖ បញ្ហាជាក់ស្តែងចម្បង",
      "subtitle": "របៀបដែល Controls អត់មានរូបមន្តស្វ័យប្រវត្តិនាំឲ្យខ្សែសង្វាក់ផលិតកម្មរោងចក្រត្រូវគាំង។",
      "content": `<div class="card">
            <div class="crisis-banner">
              <span class="crisis-icon">&triangle;</span>
              <div>
                <strong style="color: #fca5a5; font-size: 1.05rem;">មហន្តរាយដឹកជញ្ជូននៅរោងចក្រ Apex Plastics</strong>
                <p style="font-size: 0.82rem; color: #cbd5e1; margin-top: 0.25rem;">អត្ថបទគាំងស្តូកលើអេក្រង់បណ្តាលឲ្យទំនិញបាក់បែកត្រូវបញ្ជូនចេញដោយគ្មានការត្រួតពិនិត្យ។</p>
              </div>
            </div>

            <div class="consequence-row">
              <span class="consequence-badge">ឫសគល់ទី ១</span>
              <div>
                <strong>ការកំណត់ Label បែប Hardcoded៖</strong>
                <p style="font-size: 0.85rem; color: var(--text-muted);">អត្ថបទ Label ត្រូវបានវាយស្លាប់ថា <code>"Status: Standard Inspection"</code> ដោយមិនបានគណនាកម្រិតគ្រោះថ្នាក់ពិតប្រាកដ។</p>
              </div>
            </div>

            <div class="consequence-row">
              <span class="consequence-badge">ឫសគល់ទី ២</span>
              <div>
                <strong>គ្មានការគណនាទិន្នន័យជាក់ស្តែង៖</strong>
                <p style="font-size: 0.85rem; color: var(--text-muted);">ពេលបុគ្គលិករើស "Critical Breakdown" អេក្រង់មិនមានសញ្ញាព្រមានអ្វីទាំងអស់ ព្រោះ Properties មិនទាន់ភ្ជាប់រូបមន្ត។</p>
              </div>
            </div>

            <div class="consequence-row">
              <span class="consequence-badge">ឫសគល់ទី ៣</span>
              <div>
                <strong>ការបញ្ជូនសំណើទាំងងងឹតងងល់៖</strong>
                <p style="font-size: 0.85rem; color: var(--text-muted);">កម្មករចុចបញ្ជូនទិន្នន័យដោយគ្មានសារបញ្ជាក់ច្បាស់លាស់ ឬការគណនាសង្ខេបឡើយ។</p>
              </div>
            </div>
          </div>

          <div class="card" style="border-color: rgba(239, 68, 68, 0.4); background: rgba(30, 41, 59, 0.9);">
            <h3 class="card-title" style="color: #fca5a5;">ផលប៉ះពាល់ហិរញ្ញវត្ថុសរុប</h3>
            <div style="font-size: 2.8rem; font-weight: 800; color: #ef4444; margin: 0.75rem 0;">$18,400</div>
            <p style="font-size: 0.95rem; line-height: 1.6; color: #cbd5e1;">
              គ្រឿងបន្លាស់ខូចជាង ៤០០ ដុំត្រូវបានដឹកជញ្ជូនទៅកាន់រោងចក្រដំឡើងនៅខេត្តចំនួនពីរ។ ការផ្អាកផលិតកម្ម ៤៨ ម៉ោង និងថ្លៃដឹកជញ្ជូនជំនួសបន្ទាន់បានធ្វើឲ្យក្រុមហ៊ុនខាតបង់ប្រាក់ផ្ទាល់ $18,400។
            </p>
            <div style="margin-top: auto; padding: 0.85rem; background: rgba(239, 68, 68, 0.15); border-radius: 0.5rem; font-weight: 600; color: #fca5a5; font-size: 0.85rem;">
              មេរៀនសំខាន់៖ អេក្រង់ដែល Controls មិនចេះគណនាស្វ័យប្រវត្តិនោះ មិនមែនជា App ទេ—វាគឺជាហានិភ័យការងារដែលអាចបង្កគ្រោះថ្នាក់គ្រប់ពេល!
            </div>
          </div>`
    },
    {
      "title": "ដ្យាក្រាមហេតុ និងផល៖ ខ្សែចរន្តឆ្លើយតប ៥ ជំហាន (Reactive Circuit)",
      "segment": "ផ្នែកទី ២៖ បញ្ហាជាក់ស្តែងចម្បង",
      "subtitle": "របៀបដែល Power Apps ឆ្លើយតបនឹងសកម្មភាពមនុស្សដោយស្វ័យប្រវត្តិដោយមិនចាំបាច់ចុចប៊ូតុងរក្សាទុក។",
      "content": `<div class="circuit-flow">
            <div class="circuit-step">
              <span class="circuit-badge" style="background: rgba(59, 130, 246, 0.2); color: #60a5fa;">ជំហាន ១</span>
              <strong style="font-size: 0.88rem; margin-top: 0.3rem;">សកម្មភាពមនុស្ស</strong>
              <span style="font-size: 0.75rem; color: var(--text-muted);">កម្មករវាយអក្សរបញ្ចូល</span>
            </div>
            <span class="circuit-arrow">&rarr;</span>
            <div class="circuit-step">
              <span class="circuit-badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc;">ជំហាន ២</span>
              <strong style="font-size: 0.88rem; margin-top: 0.3rem;">Property ផ្លាស់ប្តូរ</strong>
              <span style="font-size: 0.75rem; color: var(--text-muted);"><code>txtInput.Text</code> ផ្លាស់ប្តូរតម្លៃ</span>
            </div>
            <span class="circuit-arrow">&rarr;</span>
            <div class="circuit-step">
              <span class="circuit-badge" style="background: rgba(245, 158, 11, 0.2); color: #fbbf24;">ជំហាន ៣</span>
              <strong style="font-size: 0.88rem; margin-top: 0.3rem;">រូបមន្តដំណើរការ</strong>
              <span style="font-size: 0.75rem; color: var(--text-muted);">Power Fx គណនាឡើងវិញ</span>
            </div>
            <span class="circuit-arrow">&rarr;</span>
            <div class="circuit-step">
              <span class="circuit-badge" style="background: rgba(16, 185, 129, 0.2); color: #34d399;">ជំហាន ៤</span>
              <strong style="font-size: 0.88rem; margin-top: 0.3rem;">លទ្ធផលបង្ហាញថ្មី</strong>
              <span style="font-size: 0.75rem; color: var(--text-muted);"><code>lblNotice.Text</code> ប្តូរភ្លាមៗ</span>
            </div>
            <span class="circuit-arrow">&rarr;</span>
            <div class="circuit-step">
              <span class="circuit-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">ជំហាន ៥</span>
              <strong style="font-size: 0.88rem; margin-top: 0.3rem;">ការឆ្លើយតបផ្ទាល់</strong>
              <span style="font-size: 0.75rem; color: var(--text-muted);">រហ័សទាន់ចិត្ត គ្មានការពន្យារ</span>
            </div>
          </div>

          <div class="grid-2">
            <div class="card">
              <h3 class="card-title">ភាពរស់រវើកដូចសន្លឹកកិច្ចការ Excel</h3>
              <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
                នៅក្នុង Microsoft Excel ប្រសិនបើក្រឡា <code>C1 = A1 + B1</code> អ្នកមិនដែលចុចប៊ូតុង "គណនា" ឡើយ។ ឲ្យតែអ្នកវាយលេខថ្មីក្នុង <code>A1</code> នោះ <code>C1</code> នឹងផ្លាស់ប្តូរតម្លៃភ្លាមៗ។
              </p>
              <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; margin-top: 0.5rem;">
                Power Apps ដំណើរការលើគោលការណ៍ដូចគ្នាបេះបិទ។ Controls ប្រៀបដូចជាក្រឡា, Properties ប្រៀបដូចជាតម្លៃក្នុងក្រឡា ហើយ Formulas កំណត់ទំនាក់ទំនងរវាងពួកវា!
              </p>
            </div>

            <div class="card">
              <h3 class="card-title">ការយល់ដឹងគន្លឹះសម្រាប់អ្នកចាប់ផ្តើម</h3>
              <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
                សិស្សថ្មីៗតែងតែសួរថា៖ <em>"តើខ្ញុំត្រូវសរសេរកូដនៅឯណាដើម្បីបញ្ជាឲ្យ Label ផ្លាស់ប្តូរ?"</em>
              </p>
              <div style="margin-top: 0.5rem; padding: 0.75rem; background: rgba(59, 130, 246, 0.15); border-radius: 0.5rem; font-size: 0.85rem; color: #93c5fd;">
                <strong>ច្បាប់មាស៖</strong> អ្នកមិនត្រូវរុញទិន្នន័យទៅ Label ទេ។ ផ្ទុយទៅវិញ អ្នកត្រូវចុចលើ Label នោះ បើក Property <code>Text</code> ហើយប្រាប់វាឲ្យ<strong>ស្រង់ទាញ</strong>ទិន្នន័យពី Input មកវិញ!
              </div>
            </div>
          </div>`
    },
    {
      "title": "ឧទាហរណ៍ជីវិតប្រចាំថ្ងៃ៖ ឧបករណ៍វាស់កម្តៅឆ្លាតវៃ ទល់នឹង ផ្ទាំងគំនូរគាំងស្តូក",
      "segment": "ផ្នែកទី ៣៖ គោលគំនិត និងផ្នត់គំនិតសំខាន់",
      "subtitle": "ស្វែងយល់ពីភាពខុសគ្នារវាងរូបភាពដែលគាំងស្តូក និងប្រព័ន្ធកម្មវិធីឆ្លាតវៃរស់រវើក។",
      "content": `<div class="card">
            <span class="card-badge" style="background: rgba(239, 68, 68, 0.15); color: #fca5a5;">ផ្នត់គំនិតខុស</span>
            <h3 class="card-title" style="color: #fca5a5;">ឧបករណ៍វាស់កម្តៅគូរលើជញ្ជាំង</h3>
            <div style="padding: 1.5rem; background: rgba(15, 23, 42, 0.8); border: 2px dashed rgba(239, 68, 68, 0.3); border-radius: 0.75rem; text-align: center; margin: 1rem 0;">
              <div style="font-size: 2.2rem; font-weight: 800; color: #cbd5e1;">25&deg;C</div>
              <span style="font-size: 0.8rem; color: #fca5a5;">(អក្សរគូរលើជញ្ជាំង &bull; មិនដែលប្រែប្រួល)</span>
            </div>
            <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
              ប្រសិនបើអ្នកយកថ្នាំពណ៌ទៅគូររូប "25&deg;C" លើជញ្ជាំងបន្ទប់ ទោះបីជាខែមេសាក្តៅដល់ ៤០ អង្សា ឬខែធ្នូត្រជាក់ដល់ ១៨ អង្សាក៏វានៅតែបង្ហាញ ២៥ ដដែល ព្រោះវាគ្មានឧបករណ៍ចាប់សញ្ញា និងគ្មានខួរក្បាលគណនា។
            </p>
            <div style="margin-top: auto; padding: 0.75rem; background: rgba(255,255,255,0.04); border-radius: 0.5rem; font-size: 0.82rem; color: #94a3b8;">
              នេះជាអ្វីដែលកើតឡើងចំពោះ Label ពេលអ្នកវាយអត្ថបទ Hardcoded ចូលទៅក្នុងវា!
            </div>
          </div>

          <div class="card" style="border-color: rgba(16, 185, 129, 0.4); background: rgba(30, 41, 59, 0.85);">
            <span class="card-badge" style="background: rgba(16, 185, 129, 0.15); color: #86efac;">គំរូពិតប្រាកដនៃ Power Apps</span>
            <h3 class="card-title" style="color: #86efac;">ឧបករណ៍វាស់កម្តៅឌីជីថលឆ្លាតវៃ</h3>
            <div style="padding: 1.5rem; background: rgba(15, 23, 42, 0.8); border: 2px solid #10b981; border-radius: 0.75rem; text-align: center; margin: 1rem 0;">
              <div style="font-size: 2.2rem; font-weight: 800; color: #4ade80;">lblTemp.Text = Sensor.Value</div>
              <span style="font-size: 0.8rem; color: #86efac;">(តម្លៃគណនាបន្តផ្ទាល់ &bull; ចាប់សញ្ញាគ្រប់វិនាទី)</span>
            </div>
            <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
              ឧបករណ៍ឆ្លាតវៃពិតប្រាកដមាន Sensor ភ្ជាប់ជាមួយអេក្រង់ឌីជីថល។ ពេលសីតុណ្ហភាពបន្ទប់ឡើងកម្តៅ Sensor ចាប់បានទិន្នន័យថ្មីភ្លាម ហើយអេក្រង់គណនាតម្លៃបង្ហាញឡើងវិញដោយស្វ័យប្រវត្តិ។
            </p>
            <div style="margin-top: auto; padding: 0.75rem; background: rgba(16, 185, 129, 0.15); border-radius: 0.5rem; font-size: 0.82rem; color: #86efac;">
              នៅក្នុង Power Apps រូបមន្តរបស់អ្នកប្រៀបដូចជាខ្សែភ្លើងបញ្ជូនសញ្ញា ធ្វើឲ្យ Controls ទាំងអស់ក្លាយជាប្រព័ន្ធឆ្លាតវៃមានជីវិត!
            </div>
          </div>`
    },
    {
      "title": "រចនាសម្ព័ន្ធនៃឧបករណ៍បញ្ជា Control៖ ធាតុផ្សំគ្រឹះទាំង ៤",
      "segment": "ផ្នែកទី ៣៖ គោលគំនិត និងផ្នត់គំនិតសំខាន់",
      "subtitle": "ស្វែងយល់ពីរបៀបដែលគ្រប់ផ្នែកលើ Canvas ត្រូវបានផ្គុំឡើងក្នុង Power Apps Studio។",
      "content": `<div class="anatomy-box">
            <h3 class="card-title">ធាតុផ្សំ ៤ យ៉ាងដែលមិនអាចខ្វះបាន</h3>
            <div class="consequence-row" style="background: rgba(59, 130, 246, 0.1); border-color: rgba(59, 130, 246, 0.3);">
              <span class="obj-num">1</span>
              <div>
                <strong>អត្តសញ្ញាណ Control (ឈ្មោះ Name)៖</strong>
                <p style="font-size: 0.85rem; color: var(--text-muted);">ឈ្មោះសម្គាល់បែប Hungarian (ឧ. <code>lblTicketSummary</code>) សម្រាប់ឲ្យរូបមន្តផ្សេងទៀតហៅប្រើ។</p>
              </div>
            </div>
            <div class="consequence-row" style="background: rgba(139, 92, 246, 0.1); border-color: rgba(139, 92, 246, 0.3);">
              <span class="obj-num" style="background: #8b5cf6;">2</span>
              <div>
                <strong>ថតផ្ទុកលក្ខណៈសម្បត្តិ (Property)៖</strong>
                <p style="font-size: 0.85rem; color: var(--text-muted);">ចរិតលក្ខណៈជាក់លាក់ដែលត្រូវកំណត់៖ <code>Text</code>, <code>Color</code>, <code>Visible</code>, <code>DisplayMode</code>។</p>
              </div>
            </div>
            <div class="consequence-row" style="background: rgba(245, 158, 11, 0.1); border-color: rgba(245, 158, 11, 0.3);">
              <span class="obj-num" style="background: #f59e0b;">3</span>
              <div>
                <strong>របាររូបមន្ត (Formula Bar)៖</strong>
                <p style="font-size: 0.85rem; color: var(--text-muted);">កន្សោមរូបមន្តដែលអ្នកបង្កើតសរសេរចូល ដោយផ្តើមដោយសញ្ញាស្មើ (ឧ. <code>="Status: " &amp; drpSeverity.Selected.Value</code>)។</p>
              </div>
            </div>
            <div class="consequence-row" style="background: rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.3);">
              <span class="obj-num" style="background: #10b981;">4</span>
              <div>
                <strong>លទ្ធផលគណនាផ្ទាល់ (Evaluated Output)៖</strong>
                <p style="font-size: 0.85rem; color: var(--text-muted);">តម្លៃចុងក្រោយដែលបង្ហាញលើអេក្រង់ជាក់ស្តែង៖ <code>"Status: CRITICAL"</code>។</p>
              </div>
            </div>
          </div>

          <div class="anatomy-box" style="background: #070a12; justify-content: center; align-items: center;">
            <div style="width: 100%; border: 1px solid var(--border-subtle); border-radius: 0.75rem; padding: 1.25rem; background: rgba(15, 23, 42, 0.9);">
              <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.5rem; margin-bottom: 0.75rem;">
                <span style="font-size: 0.78rem; font-weight: 700; color: #60a5fa;">ប្រអប់ជ្រើសរើស Property ក្នុង Studio</span>
                <span style="font-size: 0.75rem; font-family: var(--font-code); color: #fbbf24;">Property: Text</span>
              </div>
              <div style="background: #0b101b; padding: 0.75rem 1rem; border-radius: 0.4rem; font-family: var(--font-code); font-size: 0.9rem; color: #e2e8f0; border: 1px solid rgba(59, 130, 246, 0.3);">
                <span style="color: #60a5fa;">lblTicketSummary</span>.<span style="color: #34d399;">Text</span> = <span style="color: #c084fc;">"REQ-"</span> &amp; <span style="color: #60a5fa;">txtDept</span>.<span style="color: #34d399;">Text</span> &amp; <span style="color: #c084fc;">"-2026"</span>
              </div>
              <div style="margin-top: 1rem; padding: 1rem; background: rgba(16, 185, 129, 0.1); border: 1px solid #10b981; border-radius: 0.5rem; text-align: center;">
                <span style="font-size: 0.72rem; text-transform: uppercase; color: #86efac; font-weight: 700;">លទ្ធផលបង្ហាញជាក់ស្តែងលើអេក្រង់៖</span>
                <div style="font-size: 1.25rem; font-weight: 700; color: #ffffff; margin-top: 0.35rem;">REQ-MAINTENANCE-2026</div>
              </div>
            </div>
          </div>`
    },
    {
      "title": "ការបកប្រែពាក្យសាមញ្ញ៖ ពីតម្រូវការអាជីវកម្មទៅកាន់ Power Fx",
      "segment": "ផ្នែកទី ៤៖ ស្ពានបច្ចេកទេស",
      "subtitle": "របៀបបកប្រែការគិតរបស់មនុស្សនៅកន្លែងធ្វើការ ទៅជារូបមន្ត Power Apps ជាក់លាក់។",
      "content": `<div class="card">
            <h3 class="card-title">ផ្លូវល្បឿនលឿន ៤ ជំហាននៃការបកប្រែ</h3>
            <div class="consequence-row" style="background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.1);">
              <span class="obj-num">1</span>
              <div>
                <strong>តម្រូវការមនុស្ស៖</strong>
                <p style="font-size: 0.85rem; color: var(--text-muted);">"ខ្ញុំចង់ឲ្យអេក្រង់ស្វាគមន៍ឈ្មោះជាងបច្ចេកទេស និងបង្ហាញវេនការងាររបស់គាត់។"</p>
              </div>
            </div>
            <div class="consequence-row" style="background: rgba(59, 130, 246, 0.1); border-color: rgba(59, 130, 246, 0.3);">
              <span class="obj-num">2</span>
              <div>
                <strong>ច្បាប់ភាសាសាមញ្ញ៖</strong>
                <p style="font-size: 0.85rem; color: var(--text-muted);">ផ្គុំពាក្យ "Welcome " យកឈ្មោះពីប្រអប់បញ្ចូល បន្ថែមសញ្ញាខណ្ឌ រួចបន្ថែមវេនពី Dropdown។</p>
              </div>
            </div>
            <div class="consequence-row" style="background: rgba(139, 92, 246, 0.1); border-color: rgba(139, 92, 246, 0.3);">
              <span class="obj-num" style="background: #8b5cf6;">3</span>
              <div>
                <strong>កំណត់ Property គោលដៅ៖</strong>
                <p style="font-size: 0.85rem; color: var(--text-muted);">ជ្រើសរើស <code>lblGreeting</code> លើ Canvas ហើយបើក Property <code>Text</code>។</p>
              </div>
            </div>
            <div class="consequence-row" style="background: rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.3);">
              <span class="obj-num" style="background: #10b981;">4</span>
              <div>
                <strong>រូបមន្ត Power Fx៖</strong>
                <p style="font-size: 0.85rem; color: #86efac; font-family: var(--font-code); font-weight: 600;">="Welcome " &amp; txtTechnician.Text &amp; " | " &amp; drpShift.Selected.Value</p>
              </div>
            </div>
          </div>

          <div class="card" style="background: #070a12;">
            <h3 class="card-title" style="color: var(--color-cyan);">ហេតុអ្វីអ្នកចាប់ផ្តើមដំបូងងាយយល់រូបមន្តនេះ</h3>
            <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
              សូមសង្កេតមើល គ្មានអ្វីស្មុគស្មាញឡើយ៖
            </p>
            <ul style="margin: 0.75rem 0 0.75rem 1.25rem; font-size: 0.85rem; color: #cbd5e1; line-height: 1.8;">
              <li>ពាក្យណាដែលចង់បង្ហាញត្រង់ៗ ត្រូវដាក់ក្នុងសញ្ញាសម្រង់ពីរ (<code>"Welcome "</code>)។</li>
              <li>ទិន្នន័យដែលចង់ទាញពី Control ត្រូវហៅឈ្មោះពិតរបស់វា (<code>txtTechnician.Text</code>)។</li>
              <li>សញ្ញា &amp; (Ampersand) ដើរតួជាកាវបិទភ្ជាប់អត្ថបទទាំងអស់បញ្ចូលគ្នា។</li>
            </ul>
            <div style="margin-top: auto; padding: 0.85rem; background: rgba(6, 182, 212, 0.15); border-radius: 0.5rem; font-size: 0.82rem; color: #67e8f9;">
              បើអ្នកធ្លាប់វាយ <code>="Total: " &amp; SUM(A1:A5)</code> ក្នុង Excel មានន័យថាអ្នកយល់ Power Fx ៩០% រួចទៅហើយ!
            </div>
          </div>`
    },
    {
      "title": "ចំណាត់ថ្នាក់ Properties ទាំង ៣ ក្រុម៖ រូបរាង តម្លៃ និងអាកប្បកិរិយា",
      "segment": "ផ្នែកទី ៤៖ ស្ពានបច្ចេកទេស",
      "subtitle": "បែងចែក Properties របស់ Controls ជា ៣ គ្រួសារមុខងារដាច់ដោយឡែកពីគ្នា។",
      "content": `<div class="card">
            <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc;">ក្រុមទី ១</span>
            <h3 class="card-title" style="color: #c084fc;">រូបរាងខាងក្រៅ (Appearance)</h3>
            <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
              កំណត់របៀបដែល Control បង្ហាញចំពោះភ្នែកមនុស្ស។
            </p>
            <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem; font-family: var(--font-code); font-size: 0.82rem;">
              <div style="padding: 0.4rem 0.6rem; background: rgba(255,255,255,0.04); border-radius: 0.3rem;">Color (ពណ៌អក្សរ)</div>
              <div style="padding: 0.4rem 0.6rem; background: rgba(255,255,255,0.04); border-radius: 0.3rem;">Fill (ពណ៌ផ្ទៃខាងក្រោយ)</div>
              <div style="padding: 0.4rem 0.6rem; background: rgba(255,255,255,0.04); border-radius: 0.3rem;">Size / Font (ទំហំ និងប្រភេទអក្សរ)</div>
              <div style="padding: 0.4rem 0.6rem; background: rgba(255,255,255,0.04); border-radius: 0.3rem;">BorderThickness / Radius (កម្រាស់គែម)</div>
            </div>
          </div>

          <div class="card" style="border-color: rgba(59, 130, 246, 0.4); background: rgba(30, 41, 59, 0.85);">
            <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #60a5fa;">ក្រុមទី ២</span>
            <h3 class="card-title" style="color: #60a5fa;">តម្លៃ និងមាតិកា (Value &amp; Content)</h3>
            <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
              ផ្ទុកទិន្នន័យប្រតិបត្តិការជាក់ស្តែង។
            </p>
            <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem; font-family: var(--font-code); font-size: 0.82rem;">
              <div style="padding: 0.4rem 0.6rem; background: rgba(59, 130, 246, 0.15); border-radius: 0.3rem; color: #93c5fd;">Text (អត្ថបទបច្ចុប្បន្ន)</div>
              <div style="padding: 0.4rem 0.6rem; background: rgba(59, 130, 246, 0.15); border-radius: 0.3rem; color: #93c5fd;">Default (តម្លៃដើមដំបូង)</div>
              <div style="padding: 0.4rem 0.6rem; background: rgba(59, 130, 246, 0.15); border-radius: 0.3rem; color: #93c5fd;">Items (បញ្ជីទិន្នន័យជម្រើស)</div>
              <div style="padding: 0.4rem 0.6rem; background: rgba(59, 130, 246, 0.15); border-radius: 0.3rem; color: #93c5fd;">Selected (ជម្រើសដែលកំពុងរើស)</div>
            </div>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #34d399;">ក្រុមទី ៣</span>
            <h3 class="card-title" style="color: #34d399;">អាកប្បកិរិយា និងស្ថានភាព (Behavior)</h3>
            <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
              កំណត់អន្តរកម្ម និងបញ្ជាឲ្យធ្វើសកម្មភាព។
            </p>
            <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem; font-family: var(--font-code); font-size: 0.82rem;">
              <div style="padding: 0.4rem 0.6rem; background: rgba(16, 185, 129, 0.15); border-radius: 0.3rem; color: #86efac;">Visible (True/False បង្ហាញ ឬលាក់)</div>
              <div style="padding: 0.4rem 0.6rem; background: rgba(16, 185, 129, 0.15); border-radius: 0.3rem; color: #86efac;">DisplayMode (Edit / Disabled / View)</div>
              <div style="padding: 0.4rem 0.6rem; background: rgba(16, 185, 129, 0.15); border-radius: 0.3rem; color: #86efac;">OnSelect (រូបមន្តសកម្មភាពពេលចុច)</div>
              <div style="padding: 0.4rem 0.6rem; background: rgba(16, 185, 129, 0.15); border-radius: 0.3rem; color: #86efac;">OnChange (ដំណើរការពេលទិន្នន័យប្តូរ)</div>
            </div>
          </div>`
    },
    {
      "title": "ការវិភាគកូដទី ១ (Deep Dive 1)៖ សញ្ញាចំណុច Dot Operator (.)",
      "segment": "ផ្នែកទី ៥៖ ការការវិភាគកូដ Power Fx លម្អិត (Code Breakdown)",
      "subtitle": "ឧបករណ៍គ្រឹះសម្រាប់លូកដៃចូលទៅក្នុង Control ដើម្បីទាញយកលក្ខណៈសម្បត្តិខាងក្នុង។",
      "content": `<div class="syntax-visual-chain">
            <div class="syntax-token-pill token-control">
              <span>txtMachineCode</span>
              <span class="token-desc">ប្រអប់ Control ខាងក្រៅ</span>
            </div>
            <div class="syntax-token-pill token-operator">
              <span>.</span>
              <span class="token-desc">កូនសោលូកចូលខាងក្នុង</span>
            </div>
            <div class="syntax-token-pill token-property">
              <span>Text</span>
              <span class="token-desc">តម្លៃលក្ខណៈសម្បត្តិខាងក្នុង</span>
            </div>
          </div>

          <div class="grid-2" style="margin-top: 0.5rem;">
            <div class="card" style="background: rgba(15, 23, 42, 0.6);">
              <h4 style="color: var(--color-cyan); margin-bottom: 0.5rem;">ឧទាហរណ៍ប្រអប់សំបុត្រមុខផ្ទះ</h4>
              <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
                ស្រមៃថាមានផ្ទះជាច្រើនតាមដងផ្លូវ។ អ្នកមិនអាចគ្រាន់តែស្រែកថា "សំបុត្រ!" នោះទេ។ អ្នកត្រូវបញ្ជាក់ថា៖ <code>ផ្ទះលេខ៤២.ប្រអប់សំបុត្រ</code>។
              </p>
              <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; margin-top: 0.4rem;">
                ក្នុង Power Apps មាន Controls រាប់សិបលើអេក្រង់។ សញ្ញាចុច (<code>.</code>) គឺជាអ្នកបើកទ្វារ Control ដើម្បីអានតម្លៃដែលនៅក្នុងថត <code>.Text</code> របស់វា!
              </p>
            </div>

            <div class="card" style="background: rgba(15, 23, 42, 0.6);">
              <h4 style="color: #fca5a5; margin-bottom: 0.5rem;">អន្ទាក់កូដដែលអ្នកថ្មីតែងតែជួប</h4>
              <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
                អ្នករៀនដំបូងច្រើនសរសេរ៖ <code>="Machine: " &amp; txtMachineCode</code> (ភ្លេចចុចចំណុច)។
              </p>
              <div style="margin-top: 0.5rem; padding: 0.65rem; background: rgba(239, 68, 68, 0.15); border-radius: 0.4rem; font-size: 0.82rem; color: #fca5a5;">
                <strong>កំហុស៖</strong> Power Apps នឹងប្រាប់ថា៖ <em>"មិនអាចយក Control ទាំងមូលមកធ្វើជាអក្សរបានទេ"</em>។ ចងចាំជានិច្ច៖ Control គឺជាប្រអប់ ចំណែកចំណុចចុចគឺជាអ្នកលូកយក <code>.Text</code>!
              </div>
            </div>
          </div>`
    },
    {
      "title": "ការវិភាគកូដទី ២ (Deep Dive 2)៖ កាវតភ្ជាប់អត្ថបទ Ampersand (&)",
      "segment": "ផ្នែកទី ៥៖ ការការវិភាគកូដ Power Fx លម្អិត (Code Breakdown)",
      "subtitle": "ការផ្គុំអត្ថបទថេរ ជាមួយតម្លៃប្រែប្រួលចេញពី Controls ដើម្បីបង្កើតកូដសម្គាល់អាជីវកម្ម។",
      "content": `<div class="syntax-visual-chain">
            <div class="syntax-token-pill token-literal">
              <span>"REQ-"</span>
              <span class="token-desc">អត្ថបទថេរក្នុងសម្រង់</span>
            </div>
            <div class="syntax-token-pill token-operator">
              <span>&amp;</span>
              <span class="token-desc">កាវបិទអត្ថបទ</span>
            </div>
            <div class="syntax-token-pill token-control">
              <span>drpDept.Selected.Value</span>
              <span class="token-desc">តម្លៃជ្រើសរើសជាក់ស្តែង</span>
            </div>
            <div class="syntax-token-pill token-operator">
              <span>&amp;</span>
              <span class="token-desc">កាវបិទអត្ថបទ</span>
            </div>
            <div class="syntax-token-pill token-literal">
              <span>"-2026"</span>
              <span class="token-desc">អត្ថបទថេរក្នុងសម្រង់</span>
            </div>
          </div>

          <div class="grid-2" style="margin-top: 0.5rem;">
            <div class="card" style="background: rgba(15, 23, 42, 0.6);">
              <h4 style="color: var(--color-cyan); margin-bottom: 0.5rem;">ច្បាប់មាសនៃសញ្ញាសម្រង់ (Quotes)</h4>
              <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
                <strong>មានសញ្ញាសម្រង់៖</strong> <code>"Text"</code> មានន័យថា៖ <em>"បង្ហាញតួអក្សរទាំងនេះត្រង់ៗតាមអ្វីដែលឃើញ។"</em>
              </p>
              <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; margin-top: 0.4rem;">
                <strong>គ្មានសញ្ញាសម្រង់៖</strong> <code>txtInput.Text</code> មានន័យថា៖ <em>"ទៅរក Control ឈ្មោះ txtInput ហើយទាញយកតម្លៃបច្ចុប្បន្នរបស់វា។"</em>
              </p>
            </div>

            <div class="card" style="background: rgba(15, 23, 42, 0.6);">
              <h4 style="color: #6ee7b7; margin-bottom: 0.5rem;">លទ្ធផលដែលទទួលបានជាក់ស្តែង</h4>
              <div style="padding: 1rem; background: #070a12; border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 0.5rem; text-align: center;">
                <span style="font-size: 0.75rem; color: #86efac; text-transform: uppercase; font-weight: 700;">ពេលបុគ្គលិករើសផ្នែក "ELEC"៖</span>
                <div style="font-size: 1.4rem; font-weight: 700; color: #ffffff; font-family: var(--font-code); margin-top: 0.4rem;">REQ-ELEC-2026</div>
              </div>
            </div>
          </div>`
    },
    {
      "title": "បន្ទប់ពិសោធន៍ទី ១៖ ផ្ទាំងត្រួតពិនិត្យលក្ខណៈសម្បត្តិ Control",
      "segment": "ផ្នែកទី ៦៖ ការបង្ហាញអន្តរកម្មជាក់ស្តែង",
      "subtitle": "ចុចលើផ្ទាំងនីមួយៗខាងក្រោមដើម្បីពិនិត្យមើលរបៀបដែល Properties និង Formulas បង្កើតអាកប្បកិរិយារបស់ Control។",
      "content": `<div class="inspector-menu">
            <div class="inspector-tab active" data-control-key="label">
              <span class="tab-icon">&blk14;</span>
              <div class="tab-info">
                <h4>Text Label (lbl)</h4>
                <span>Output &bull; បង្ហាញអត្ថបទគណនា</span>
              </div>
            </div>
            <div class="inspector-tab" data-control-key="textinput">
              <span class="tab-icon">&equiv;</span>
              <div class="tab-info">
                <h4>Text Input (txt)</h4>
                <span>Input &bull; ប្រមូលអក្សរពីក្តារចុច</span>
              </div>
            </div>
            <div class="inspector-tab" data-control-key="button">
              <span class="tab-icon">&blacktriangleright;</span>
              <div class="tab-info">
                <h4>Action Button (btn)</h4>
                <span>Action &bull; អនុវត្ត OnSelect</span>
              </div>
            </div>
          </div>

          <div class="inspector-display">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
              <span id="inspector-role-badge" class="role-badge-pill pill-output">Output Control</span>
              <span id="inspector-hungarian-tag" style="font-family: var(--font-code); font-size: 0.8rem; color: var(--color-cyan);">Prefix: lbl</span>
            </div>
            <h3 id="inspector-control-title" style="margin-bottom: 0.5rem;">Text Label &bull; lblStatusBanner</h3>
            <p id="inspector-control-desc" style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1rem;">
              បង្ហាញព័ត៌មានប្រព័ន្ធ សារគណនាស្វ័យប្រវត្ត ឬស្ថានភាពសង្ខេប។ ជាប្រភេទ Read-only មិនអាចវាយបញ្ចូលបានទេ។
            </p>

            <div class="live-control-box" id="inspector-live-preview">
              <div style="background: rgba(15, 23, 42, 0.9); border: 1px solid #38bdf8; border-radius: 4px; padding: 0.75rem 1.25rem; color: #38bdf8; font-weight: 700; font-size: 1.05rem;">
                &bull; Status: PENDING INSPECTION
              </div>
            </div>

            <div style="margin-top: auto; padding: 0.75rem 1rem; background: #070a12; border: 1px solid var(--border-subtle); border-radius: 0.5rem; font-family: var(--font-code); font-size: 0.85rem; color: #e2e8f0;">
              <span style="color: var(--text-muted);">រូបមន្ត៖</span> <span id="inspector-formula" style="color: #60a5fa;">lblStatusBanner.Text = "Status: " &amp; drpSeverity.Selected.Value</span>
            </div>
          </div>`
    },
    {
      "title": "ការបង្ហាញផ្ទាល់ពីគ្រូ៖ ការបង្កើតផ្ទាំងស្វាគមន៍ Dynamic Banner",
      "segment": "ផ្នែកទី ៦៖ ការអនុវត្តផ្ទាល់",
      "subtitle": "ទស្សនាជំហានអនុវត្តជាក់ស្តែងក្នុង Power Apps Studio ដើម្បីភ្ជាប់រូបមន្តទៅនឹង Properties។",
      "content": `<div class="card">
            <h3 class="card-title">លំហូរការងារ ៤ ជំហានក្នុង Studio</h3>
            <div class="objective-item">
              <span class="obj-num">1</span>
              <div>
                <strong>បញ្ចូល Controls និងដាក់ឈ្មោះ Hungarian៖</strong>
                <p>បញ្ចូល Text Input ឈ្មោះ <code>txtRequester</code> និង Label ឈ្មោះ <code>lblDynamicGreeting</code>។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">2</span>
              <div>
                <strong>ជ្រើសរើស Property គោលដៅ៖</strong>
                <p>ចុចលើ <code>lblDynamicGreeting</code> ហើយនៅខាងឆ្វេងលើរបាររូបមន្ត រើសយក Property <code>Text</code>។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">3</span>
              <div>
                <strong>បញ្ចូលរូបមន្តឆ្លើយតប៖</strong>
                <p>ជំនួសអក្សរចាស់ដោយសរសេរ៖ <code>="Welcome to Factory floor, " &amp; txtRequester.Text &amp; "!"</code></p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">4</span>
              <div>
                <strong>ធ្វើតេស្តក្នុង Studio Preview (F5)៖</strong>
                <p>សង្កត់គ្រាប់ចុច Alt ឬចុច F5 រួចវាយអក្សរក្នុង Input អ្នកនឹងឃើញអក្សរស្វាគមន៍ផ្លាស់ប្តូរតួតាមតួភ្លាមៗ!</p>
              </div>
            </div>
          </div>

          <div class="card" style="background: #070a12; justify-content: center; align-items: center;">
            <div style="width: 100%; border: 1px solid var(--border-subtle); border-radius: 0.75rem; padding: 1.5rem; background: rgba(15, 23, 42, 0.85);">
              <span class="card-badge" style="background: rgba(16, 185, 129, 0.15); color: #86efac;">ផ្ទាំងសាកល្បង Studio Simulator</span>
              <div style="margin: 1.25rem 0; display: flex; flex-direction: column; gap: 0.75rem;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">ប្រអប់បញ្ចូលឈ្មោះបុគ្គលិក (txtRequester)៖</label>
                <input type="text" class="sample-input-control" value="Sokha Chea" readonly style="background: rgba(255,255,255,0.05); color: #60a5fa; border-color: rgba(59, 130, 246, 0.4);">
              </div>
              <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">ផ្ទាំងស្វាគមន៍គណនាស្វ័យប្រវត្ត (lblDynamicGreeting)៖</label>
                <div style="padding: 1rem; background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; border-radius: 0.5rem; color: #86efac; font-weight: 700; font-size: 1.1rem; text-align: center;">
                  Welcome to Factory floor, Sokha Chea!
                </div>
              </div>
            </div>
          </div>`
    },
    {
      "title": "ការអនុវត្តរួមគ្នា៖ បង្កើតកាតសង្ខេបបញ្ហា Ticket Summary",
      "segment": "ផ្នែកទី ៦៖ ការអនុវត្តផ្ទាល់",
      "subtitle": "លំហាត់អនុវត្តជាដៃគូ៖ ផ្គុំកម្រិតគ្រោះថ្នាក់ពី Dropdown ជាមួយកូដម៉ាស៊ីនចូលគ្នាក្នុងស្លាកសង្ខេប។",
      "content": `<div class="card">
            <h3 class="card-title">បេសកកម្ម ៤ ជំហានរបស់អ្នក</h3>
            <div class="agenda-timeline" style="gap: 0.5rem;">
              <div class="agenda-block">
                <span class="agenda-time">ជំហាន ១</span>
                <span class="agenda-name">បន្ថែម Dropdown ឈ្មោះ <code>drpSeverity</code></span>
                <span class="agenda-desc">Items = ["Low", "High", "Critical"]</span>
              </div>
              <div class="agenda-block">
                <span class="agenda-time">ជំហាន ២</span>
                <span class="agenda-name">បន្ថែម Text Input ឈ្មោះ <code>txtAssetID</code></span>
                <span class="agenda-desc">HintText = "e.g. PRESS-02"</span>
              </div>
              <div class="agenda-block">
                <span class="agenda-time">ជំហាន ៣</span>
                <span class="agenda-name">បន្ថែម Label ឈ្មោះ <code>lblSummary</code></span>
                <span class="agenda-desc">ជ្រើសរើស Property: <code>Text</code></span>
              </div>
              <div class="agenda-block">
                <span class="agenda-time">ជំហាន ៤</span>
                <span class="agenda-name">សរសេររូបមន្តផ្គុំទិន្នន័យ</span>
                <span class="agenda-desc">តភ្ជាប់កូដម៉ាស៊ីន + កម្រិតគ្រោះថ្នាក់</span>
              </div>
            </div>

            <div style="margin-top: auto; padding: 0.75rem; background: rgba(59, 130, 246, 0.1); border-radius: 0.5rem; font-size: 0.82rem; color: #93c5fd;">
              គន្លឹះគ្រូ៖ ពិនិត្យមើលថាតើសញ្ញា &amp; ទាំងអស់ត្រូវបានដាក់ត្រឹមត្រូវហើយឬនៅ!
            </div>
          </div>

          <div class="card" style="background: #070a12;">
            <h3 class="card-title" style="color: var(--color-cyan);">រូបមន្តគោលដៅ និងលទ្ធផលរំពឹងទុក</h3>
            <div style="padding: 1rem; background: #0f172a; border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 0.5rem; font-family: var(--font-code); font-size: 0.85rem; color: #f8fafc; margin-bottom: 1rem;">
              <span style="color: #60a5fa;">lblSummary</span>.<span style="color: #34d399;">Text</span> = <span style="color: #c084fc;">"INCIDENT: "</span> &amp; <span style="color: #60a5fa;">txtAssetID</span>.<span style="color: #34d399;">Text</span> &amp; <span style="color: #c084fc;">" ["</span> &amp; <span style="color: #60a5fa;">drpSeverity</span>.<span style="color: #34d399;">Selected</span>.<span style="color: #34d399;">Value</span> &amp; <span style="color: #c084fc;">"]"</span>
            </div>

            <div style="border: 2px dashed rgba(16, 185, 129, 0.4); border-radius: 0.75rem; padding: 1.5rem; text-align: center;">
              <span style="font-size: 0.75rem; color: #86efac; text-transform: uppercase; font-weight: 700;">លទ្ធផលបង្ហាញជាក់ស្តែងលើអេក្រង់សិស្ស៖</span>
              <div style="font-size: 1.25rem; font-weight: 700; color: #ffffff; margin-top: 0.5rem; font-family: var(--font-code);">
                INCIDENT: PRESS-02 [Critical]
              </div>
            </div>
          </div>`
    },
    {
      "title": "កិច្ចការស្វ័យគ្រប់គ្រង៖ កម្មវិធីរាប់ប្រវែងអក្សរផ្ទាល់ (Len Function)",
      "segment": "ផ្នែកទី ៦៖ ការអនុវត្តផ្ទាល់",
      "subtitle": "ការពារបញ្ហាលើសកំណត់ក្នុង Database ដោយគណនា Len(txtNotes.Text) ផ្ទាល់គ្រប់វិនាទី។",
      "content": `<div class="dials-panel">
            <h3 class="card-title" style="font-size: 1.05rem;">តម្រូវការបច្ចេកទេសក្នុងរោងចក្រ</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
              ការពិពណ៌នាអំពីបញ្ហាម៉ាស៊ីនក្នុង SQL Database អនុញ្ញាតឲ្យវាយត្រឹមតែ ១០០ តួអក្សរប៉ុណ្ណោះ។ ចូរបង្កើតស្លាករាប់ចំនួនតួអក្សរដែលកម្មករបានវាយជាក់ស្តែង។
            </p>

            <div style="margin-top: auto; padding: 0.85rem; background: rgba(15, 23, 42, 0.9); border: 1px solid var(--border-subtle); border-radius: 0.5rem;">
              <span style="font-size: 0.75rem; color: var(--color-cyan); font-weight: 700; text-transform: uppercase;">រូបមន្តដែលត្រូវប្រើ៖</span>
              <div style="font-family: var(--font-code); font-size: 0.85rem; color: #86efac; margin-top: 0.35rem;">
                lblCounter.Text = "Characters: " &amp; Len(txtNotes.Text) &amp; " / 100"
              </div>
            </div>
          </div>

          <div class="counter-demo-box">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <label style="font-size: 0.82rem; font-weight: 700; color: #60a5fa;">សាកល្បងវាយអក្សរផ្ទាល់ក្នុងប្រអប់ខាងក្រោម</label>
              <span id="live-char-badge" class="char-counter-badge">0 / 100 Characters</span>
            </div>

            <textarea id="lab-notes-input" class="sample-input-control" rows="4" style="width: 100%; max-width: 100%; height: 110px; resize: none; font-family: var(--font-body);" placeholder="សរសេររៀបរាប់ពីបញ្ហាម៉ាស៊ីននៅទីនេះ ដើម្បីឃើញ Len() គណនាឡើងភ្លាមៗ..."></textarea>

            <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
              <span style="font-size: 0.78rem; color: var(--text-muted);">ស្ថានភាពសុវត្ថិភាព៖</span>
              <span id="live-counter-status" style="font-size: 0.82rem; font-weight: 600; color: #86efac;">សុវត្ថិភាព &bull; មិនទាន់លើសកំណត់</span>
            </div>
          </div>`
    },
    {
      "title": "អន្ទាក់ផ្នត់គំនិតគ្រោះថ្នាក់ទាំង ៥ ទល់នឹង ការពិតនៃ Power Fx",
      "segment": "ផ្នែកទី ៧៖ ការវិភាគ និងកំហុសទូទៅ",
      "subtitle": "លុបបំបាត់ការសន្មត់ខុសឆ្គងរបស់អ្នកចាប់ផ្តើមដំបូង មុនពេលវាក្លាយជាកំហុសប្រព័ន្ធជាក់ស្តែង។",
      "content": `<div class="misconception-card">
            <div class="trap-side">
              <strong style="color: #fca5a5; font-size: 0.85rem;">អន្ទាក់ ១៖ "រូបមន្តដំណើរការតែម្តងគត់ពេលបើក App"</strong>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">គិតថារូបមន្តដំណើរការដូចម៉ាស៊ីនគិតលេខ គិតចេញលទ្ធផលរួចឈប់។</p>
            </div>
            <div class="truth-side">
              <strong style="color: #86efac; font-size: 0.85rem;">ការពិត៖ ការស្តាប់ និងឆ្លើយតបបន្តផ្ទាល់</strong>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">រូបមន្ត Power Fx ប្រៀបដូចសមីការ Excel ដែលគណនាឡើងវិញគ្រប់ពេលទិន្នន័យដើមប្រែប្រួល។</p>
            </div>
          </div>

          <div class="misconception-card">
            <div class="trap-side">
              <strong style="color: #fca5a5; font-size: 0.85rem;">អន្ទាក់ ២៖ "Label សម្រាប់តែដាក់អក្សរចំណងជើងស្ងៀមស្តូក"</strong>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">ជឿថា Label ប្រើបានតែដាក់អក្សរស្លាប់ដូចជា "Company Portal"។</p>
            </div>
            <div class="truth-side">
              <strong style="color: #86efac; font-size: 0.85rem;">ការពិត៖ Label ជាផ្ទាំងបង្ហាញទិន្នន័យរស់រវើក</strong>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">Label អាចគណនាតម្លៃសរុប រាប់ប្រវែងអក្សរ និងផ្គុំសារឆ្លើយតបយ៉ាងឆ្លាតវៃ។</p>
            </div>
          </div>

          <div class="misconception-card">
            <div class="trap-side">
              <strong style="color: #fca5a5; font-size: 0.85rem;">អន្ទាក់ ៣៖ "សញ្ញាចំណុច Dot គឺជាសញ្ញាគុណក្នុងគណិតវិទ្យា"</strong>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">ច្រឡំសញ្ញាចុចក្នុងកូដ ទៅនឹងសញ្ញាគុណលេខ។</p>
            </div>
            <div class="truth-side">
              <strong style="color: #86efac; font-size: 0.85rem;">ការពិត៖ សញ្ញាចុចលូកចូលខាងក្នុង Property</strong>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">សញ្ញាចុចលូកចូលទៅក្នុង Control (<code>ControlName.Property</code>) ដើម្បីទាញយកតម្លៃខាងក្នុង។</p>
            </div>
          </div>

          <div class="misconception-card">
            <div class="trap-side">
              <strong style="color: #fca5a5; font-size: 0.85rem;">អន្ទាក់ ៤៖ "លេខត្រូវតែដាក់ក្នុងសញ្ញាសម្រង់ Quotes"</strong>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">សរសេរ <code>"5" + "10"</code> ដោយរំពឹងថានឹងបូកចេញជាលេខ។</p>
            </div>
            <div class="truth-side">
              <strong style="color: #86efac; font-size: 0.85rem;">ការពិត៖ សញ្ញាសម្រង់បំប្លែងលេខទៅជាអក្សរ</strong>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">លេខក្នុងសម្រង់ក្លាយជាអត្ថបទ។ ដើម្បីគណនាលេខ ត្រូវសរសេរលេខសុទ្ធ៖ <code>5 + 10</code>។</p>
            </div>
          </div>

          <div class="misconception-card">
            <div class="trap-side">
              <strong style="color: #fca5a5; font-size: 0.85rem;">អន្ទាក់ ៥៖ "រូបមន្ត Text អាចរក្សាទុកទិន្នន័យទៅ SharePoint"</strong>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">សង្ឃឹមថារូបមន្តគណនាលើអេក្រង់នឹងសរសេរទិន្នន័យចូល Database ដោយស្វ័យប្រវត្តិ។</p>
            </div>
            <div class="truth-side">
              <strong style="color: #86efac; font-size: 0.85rem;">ការពិត៖ រូបមន្តគណនា; Action ទើបរក្សាទុក</strong>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">រូបមន្តបង្ហាញគ្រាន់តែគណនាមើលលើអេក្រង់។ ការរក្សាទុកត្រូវប្រើ Action ដូចជា <code>SubmitForm()</code>។</p>
            </div>
          </div>`
    },
    {
      "title": "សំណួរត្រួតពិនិត្យទី 1៖ ការយល់ដឹងអំពីរូបមន្ត និងភាពរស់រវើក",
      "segment": "ផ្នែកទី ៧៖ សំណួរត្រួតពិនិត្យ 1/៥",
      "subtitle": "សាកល្បងការយល់ដឹងរបស់អ្នកអំពីក្បួនច្បាប់ និងប្រតិកម្មរបស់ Power Fx។",
      "content": `<div class="quiz-card">
            <span class="card-badge" style="background: rgba(59, 130, 246, 0.15); color: #60a5fa;">សំណួរត្រួតពិនិត្យទី 1 នៃ ៥</span>
            <h3 style="margin-top: 0.75rem; font-size: 1.15rem; line-height: 1.5; color: var(--text-main);">ហេតុអ្វីបានជា lblWelcome.Text = "Hello " &amp; txtName.Text ផ្លាស់ប្តូរភ្លាមៗពេលវាយអក្សរដោយមិនបាច់ចុចប៊ូតុង?</h3>
            <div class="quiz-options">
              <button class="quiz-option-btn" data-correct="false" onclick="handleQuizAnswer(this)"><span>A.</span> <span>Power Apps ដំណើរការ Timer សម្ងាត់ដែល Refresh ទំព័ររៀងរាល់មួយវិនាទីម្តង។</span></button>
              <button class="quiz-option-btn" data-correct="true" onclick="handleQuizAnswer(this)"><span>B.</span> <span>Power Fx ឆ្លើយតបផ្ទាល់៖ ពេល txtName.Text ប្តូរ រូបមន្តដែលពាក់ព័ន្ធនឹងគណនាឡើងវិញដោយស្វ័យប្រវត្តិដូច Excel។</span></button>
              <button class="quiz-option-btn" data-correct="false" onclick="handleQuizAnswer(this)"><span>C.</span> <span>មកពី Browser Cache បង្ខំឲ្យ Save Form ដោយស្វ័យប្រវត្តិតាមគ្រាប់ចុចនីមួយៗ។</span></button>
              <button class="quiz-option-btn" data-correct="false" onclick="handleQuizAnswer(this)"><span>D.</span> <span>វាផ្លាស់ប្តូរបាន លុះត្រាតែអ្នកបង្កើតបានដាក់ Timer Control លើ Canvas ជាមុន។</span></button>
            </div>
          </div>

          <div class="quiz-card" style="background: #070a12; justify-content: center;">
            <div id="quiz-feedback-box-1" class="quiz-feedback">
              <span id="quiz-badge-1" class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #6ee7b7;">ត្រឹមត្រូវ!</span>
              <h4 id="quiz-status-title-1" style="margin: 0.5rem 0; color: #86efac;">ចម្លើយពិតជាត្រឹមត្រូវ!</h4>
              <p id="quiz-expl-1" style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.6;">Power Fx ដំណើរការលើប្រព័ន្ធ Dependency Graph ដូច Excel។ រូបមន្តទាំងអស់ស្តាប់ការផ្លាស់ប្តូរនៃទិន្នន័យដើម ហើយគណនាឡើងវិញភ្លាមៗ។</p>
            </div>
            <div id="quiz-prompt-placeholder-1" style="text-align: center; color: var(--text-muted); font-size: 0.9rem;">
              &larr; សូមជ្រើសរើសចម្លើយមួយនៅខាងឆ្វេងដើម្បីពិនិត្យការយល់ដឹងរបស់អ្នក។
            </div>
          </div>`
    },
    {
      "title": "សំណួរត្រួតពិនិត្យទី 2៖ ការយល់ដឹងអំពីរូបមន្ត និងភាពរស់រវើក",
      "segment": "ផ្នែកទី ៧៖ សំណួរត្រួតពិនិត្យ 2/៥",
      "subtitle": "សាកល្បងការយល់ដឹងរបស់អ្នកអំពីក្បួនច្បាប់ និងប្រតិកម្មរបស់ Power Fx។",
      "content": `<div class="quiz-card">
            <span class="card-badge" style="background: rgba(59, 130, 246, 0.15); color: #60a5fa;">សំណួរត្រួតពិនិត្យទី 2 នៃ ៥</span>
            <h3 style="margin-top: 0.75rem; font-size: 1.15rem; line-height: 1.5; color: var(--text-main);">តើមានអ្វីកើតឡើងបើកម្មករវាយ "25" ចូល txtQuantity ហើយអ្នកសរសេររូបមន្ត៖ txtQuantity.Text * 2?</h3>
            <div class="quiz-options">
              <button class="quiz-option-btn" data-correct="false" onclick="handleQuizAnswer(this)"><span>A.</span> <span>Power Apps នឹងបង្ហាញលេខ 50 ដោយសុវត្ថិភាពដោយមិនបាច់បំប្លែងប្រភេទទេ។</span></button>
              <button class="quiz-option-btn" data-correct="true" onclick="handleQuizAnswer(this)"><span>B.</span> <span>Power Fx បង្ហាញកំហុសប្រភេទទិន្នន័យ (Type Error) ព្រោះ Text ជាអក្សរ ហើយត្រូវការ Value(txtQuantity.Text) ដើម្បីគណនាលេខ។</span></button>
              <button class="quiz-option-btn" data-correct="false" onclick="handleQuizAnswer(this)"><span>C.</span> <span>អេក្រង់នឹងបង្ហាញអក្សរតគ្នាថា "2525"។</span></button>
              <button class="quiz-option-btn" data-correct="false" onclick="handleQuizAnswer(this)"><span>D.</span> <span>កម្មវិធីនឹងគាំង ហើយបិទបើកទូរស័ព្ទឡើងវិញ។</span></button>
            </div>
          </div>

          <div class="quiz-card" style="background: #070a12; justify-content: center;">
            <div id="quiz-feedback-box-2" class="quiz-feedback">
              <span id="quiz-badge-2" class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #6ee7b7;">ត្រឹមត្រូវ!</span>
              <h4 id="quiz-status-title-2" style="margin: 0.5rem 0; color: #86efac;">ចម្លើយពិតជាត្រឹមត្រូវ!</h4>
              <p id="quiz-expl-2" style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.6;">ប្រអប់ Text Input ផ្ទុកទិន្នន័យជាប្រភេទអក្សរ (String)។ ដើម្បីធ្វើប្រមាណវិធីគណិតវិទ្យា អ្នកត្រូវប្រើ Value() ដើម្បីបំប្លែងវាទៅជាលេខសិន។</p>
            </div>
            <div id="quiz-prompt-placeholder-2" style="text-align: center; color: var(--text-muted); font-size: 0.9rem;">
              &larr; សូមជ្រើសរើសចម្លើយមួយនៅខាងឆ្វេងដើម្បីពិនិត្យការយល់ដឹងរបស់អ្នក។
            </div>
          </div>`
    },
    {
      "title": "សំណួរត្រួតពិនិត្យទី 3៖ ការយល់ដឹងអំពីរូបមន្ត និងភាពរស់រវើក",
      "segment": "ផ្នែកទី ៧៖ សំណួរត្រួតពិនិត្យ 3/៥",
      "subtitle": "សាកល្បងការយល់ដឹងរបស់អ្នកអំពីក្បួនច្បាប់ និងប្រតិកម្មរបស់ Power Fx។",
      "content": `<div class="quiz-card">
            <span class="card-badge" style="background: rgba(59, 130, 246, 0.15); color: #60a5fa;">សំណួរត្រួតពិនិត្យទី 3 នៃ ៥</span>
            <h3 style="margin-top: 0.75rem; font-size: 1.15rem; line-height: 1.5; color: var(--text-main);">តើ Property ណាដែលកំណត់ថាប៊ូតុងមួយអាចចុចបាន ត្រូវប្រែជាពណ៌ប្រផេះ ឬលាក់បាត់ពីអេក្រង់?</h3>
            <div class="quiz-options">
              <button class="quiz-option-btn" data-correct="false" onclick="handleQuizAnswer(this)"><span>A.</span> <span>Property ពណ៌ Color និង Fill។</span></button>
              <button class="quiz-option-btn" data-correct="true" onclick="handleQuizAnswer(this)"><span>B.</span> <span>DisplayMode (Edit / Disabled / View) និង Visible (True / False)។</span></button>
              <button class="quiz-option-btn" data-correct="false" onclick="handleQuizAnswer(this)"><span>C.</span> <span>រូបមន្តសកម្មភាព OnSelect។</span></button>
              <button class="quiz-option-btn" data-correct="false" onclick="handleQuizAnswer(this)"><span>D.</span> <span>Property Default និង Text។</span></button>
            </div>
          </div>

          <div class="quiz-card" style="background: #070a12; justify-content: center;">
            <div id="quiz-feedback-box-3" class="quiz-feedback">
              <span id="quiz-badge-3" class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #6ee7b7;">ត្រឹមត្រូវ!</span>
              <h4 id="quiz-status-title-3" style="margin: 0.5rem 0; color: #86efac;">ចម្លើយពិតជាត្រឹមត្រូវ!</h4>
              <p id="quiz-expl-3" style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.6;">Visible កំណត់ការបង្ហាញលើអេក្រង់ (True/False) ចំណែក DisplayMode កំណត់ស្ថានភាព៖ Edit (អាចចុចបាន), Disabled (ប្រផេះមិនអាចចុចបាន) ឬ View (សម្រាប់តែមើល)។</p>
            </div>
            <div id="quiz-prompt-placeholder-3" style="text-align: center; color: var(--text-muted); font-size: 0.9rem;">
              &larr; សូមជ្រើសរើសចម្លើយមួយនៅខាងឆ្វេងដើម្បីពិនិត្យការយល់ដឹងរបស់អ្នក។
            </div>
          </div>`
    },
    {
      "title": "សំណួរត្រួតពិនិត្យទី 4៖ ការយល់ដឹងអំពីរូបមន្ត និងភាពរស់រវើក",
      "segment": "ផ្នែកទី ៧៖ សំណួរត្រួតពិនិត្យ 4/៥",
      "subtitle": "សាកល្បងការយល់ដឹងរបស់អ្នកអំពីក្បួនច្បាប់ និងប្រតិកម្មរបស់ Power Fx។",
      "content": `<div class="quiz-card">
            <span class="card-badge" style="background: rgba(59, 130, 246, 0.15); color: #60a5fa;">សំណួរត្រួតពិនិត្យទី 4 នៃ ៥</span>
            <h3 style="margin-top: 0.75rem; font-size: 1.15rem; line-height: 1.5; color: var(--text-main);">តើសញ្ញាចុច (.) ក្នុងរូបមន្ត drpDepartment.Selected.Value មានតួនាទីអ្វីជាក់ស្តែង?</h3>
            <div class="quiz-options">
              <button class="quiz-option-btn" data-correct="false" onclick="handleQuizAnswer(this)"><span>A.</span> <span>ដើរតួជាសញ្ញាចុចបញ្ចប់ប្រយោគ។</span></button>
              <button class="quiz-option-btn" data-correct="true" onclick="handleQuizAnswer(this)"><span>B.</span> <span>លូកដៃចូលក្នុង drpDepartment យកជួរទិន្នន័យ Selected រួចលូកចូលជួរនោះដើម្បីទាញយកអត្ថបទ Value។</span></button>
              <button class="quiz-option-btn" data-correct="false" onclick="handleQuizAnswer(this)"><span>C.</span> <span>ធ្វើប្រមាណវិធីគុណជម្រើសនៃដេប៉ាតឺម៉ង់។</span></button>
              <button class="quiz-option-btn" data-correct="false" onclick="handleQuizAnswer(this)"><span>D.</span> <span>ប្រាប់ Power Apps ឲ្យរក្សាទុកជម្រើសទៅកាន់ Server Database។</span></button>
            </div>
          </div>

          <div class="quiz-card" style="background: #070a12; justify-content: center;">
            <div id="quiz-feedback-box-4" class="quiz-feedback">
              <span id="quiz-badge-4" class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #6ee7b7;">ត្រឹមត្រូវ!</span>
              <h4 id="quiz-status-title-4" style="margin: 0.5rem 0; color: #86efac;">ចម្លើយពិតជាត្រឹមត្រូវ!</h4>
              <p id="quiz-expl-4" style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.6;">សញ្ញាចុចប្រើសម្រាប់លូកយកទិន្នន័យតាមឋានានុក្រម៖ ពី Control ចូលទៅ Record ដែលបានរើស (Selected) រួចទាញយកអត្ថបទក្នុងប្រអប់ (Value)។</p>
            </div>
            <div id="quiz-prompt-placeholder-4" style="text-align: center; color: var(--text-muted); font-size: 0.9rem;">
              &larr; សូមជ្រើសរើសចម្លើយមួយនៅខាងឆ្វេងដើម្បីពិនិត្យការយល់ដឹងរបស់អ្នក។
            </div>
          </div>`
    },
    {
      "title": "សំណួរត្រួតពិនិត្យទី 5៖ ការយល់ដឹងអំពីរូបមន្ត និងភាពរស់រវើក",
      "segment": "ផ្នែកទី ៧៖ សំណួរត្រួតពិនិត្យ 5/៥",
      "subtitle": "សាកល្បងការយល់ដឹងរបស់អ្នកអំពីក្បួនច្បាប់ និងប្រតិកម្មរបស់ Power Fx។",
      "content": `<div class="quiz-card">
            <span class="card-badge" style="background: rgba(59, 130, 246, 0.15); color: #60a5fa;">សំណួរត្រួតពិនិត្យទី 5 នៃ ៥</span>
            <h3 style="margin-top: 0.75rem; font-size: 1.15rem; line-height: 1.5; color: var(--text-main);">តើអ្វីជាភាពខុសគ្នាសំខាន់រវាង Behavior property (OnSelect) និង Value property (Text)?</h3>
            <div class="quiz-options">
              <button class="quiz-option-btn" data-correct="true" onclick="handleQuizAnswer(this)"><span>A.</span> <span>Behavior properties អនុវត្តសកម្មភាពតាមលំដាប់ពេលមានគេចុចលើវា; ចំណែក Value properties គណនាតម្លៃជាប់ជាប្រចាំ។</span></button>
              <button class="quiz-option-btn" data-correct="false" onclick="handleQuizAnswer(this)"><span>B.</span> <span>Behavior properties ដំណើរការតែលើ Tablet ប៉ុណ្ណោះ មិនដំណើរការលើទូរស័ព្ទទេ។</span></button>
              <button class="quiz-option-btn" data-correct="false" onclick="handleQuizAnswer(this)"><span>C.</span> <span>Value properties មិនអាចសរសេររូបមន្ត ឬហៅ Control ផ្សេងបានឡើយ។</span></button>
              <button class="quiz-option-btn" data-correct="false" onclick="handleQuizAnswer(this)"><span>D.</span> <span>គ្មានអ្វីខុសគ្នាទេ អ្នកអាចប្រើប្រាស់ជំនួសគ្នាបានគ្រប់ពេល។</span></button>
            </div>
          </div>

          <div class="quiz-card" style="background: #070a12; justify-content: center;">
            <div id="quiz-feedback-box-5" class="quiz-feedback">
              <span id="quiz-badge-5" class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #6ee7b7;">ត្រឹមត្រូវ!</span>
              <h4 id="quiz-status-title-5" style="margin: 0.5rem 0; color: #86efac;">ចម្លើយពិតជាត្រឹមត្រូវ!</h4>
              <p id="quiz-expl-5" style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.6;">Value properties (Text, Color, Visible) កំណត់ថា Control ត្រូវមានសភាពបែបណាឥឡូវនេះ។ រីឯ Behavior properties (OnSelect, OnChange) បញ្ជាឲ្យធ្វើសកម្មភាព (Navigate, Notify, SubmitForm) ពេលមានព្រឹត្តិការណ៍កើតឡើង។</p>
            </div>
            <div id="quiz-prompt-placeholder-5" style="text-align: center; color: var(--text-muted); font-size: 0.9rem;">
              &larr; សូមជ្រើសរើសចម្លើយមួយនៅខាងឆ្វេងដើម្បីពិនិត្យការយល់ដឹងរបស់អ្នក។
            </div>
          </div>`
    },
    {
      "title": "បញ្ហាប្រឈមចុងក្រោយ៖ ម៉ាស៊ីនបង្កើត Asset Tag គ្រឿងចក្រ",
      "segment": "ផ្នែកទី ៨៖ ស្ពានចម្លង និងកិច្ចការផ្ទះ",
      "subtitle": "បង្កើតស្លាកសម្គាល់គ្រឿងចក្រស្វ័យប្រវត្ត ដោយផ្គុំតំបន់រោងចក្រ លេខម៉ាស៊ីន និង Len()។",
      "content": `<div class="card">
            <h3 class="card-title">លំហាត់អនុវត្តកម្រិតវិជ្ជាជីវៈ</h3>
            <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
              រោងចក្រ Apex Plastics តម្រូវឲ្យគ្រឿងចក្រទាំងអស់ត្រូវមាន Asset Tag ស្វ័យប្រវត្ត មុនពេលជាងចុះទៅត្រួតពិនិត្យ៖
            </p>
            <ol style="margin: 0.75rem 0 0.75rem 1.25rem; font-size: 0.85rem; color: #cbd5e1; line-height: 1.8;">
              <li>Dropdown ឈ្មោះ <code>drpPlantArea</code> មានជម្រើស <code>["STAMPING", "ASSEMBLY", "MOLDING"]</code>។</li>
              <li>Text Input ឈ្មោះ <code>txtMachineNum</code> មាន Hint <code>"e.g. M-104"</code>។</li>
              <li>Label ឈ្មោះ <code>lblAssetTag</code> រូបមន្ត៖ <code>"TAG-" &amp; drpPlantArea.Selected.Value &amp; "-" &amp; txtMachineNum.Text &amp; "-2026"</code>។</li>
              <li>ស្លាករាប់ប្រវែង <code>lblTagLength</code> រូបមន្ត៖ <code>"Tag Length: " &amp; Len(lblAssetTag.Text) &amp; " chars"</code>។</li>
            </ol>

            <div style="margin-top: auto; padding: 0.75rem; background: rgba(59, 130, 246, 0.15); border-radius: 0.5rem; font-size: 0.82rem; color: #93c5fd;">
              លទ្ធផលរំពឹងទុក៖ <strong>TAG-MOLDING-M-104-2026</strong> (២២ តួអក្សរ)
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">រង្វាស់វាយតម្លៃសមត្ថភាព (Rubric)</h3>
            <div class="agenda-timeline" style="gap: 0.5rem;">
              <div class="agenda-block" style="border-color: rgba(16, 185, 129, 0.4);">
                <span class="agenda-time" style="background: rgba(16, 185, 129, 0.15); color: #86efac;">៤ &bull; ល្អឥតខ្ចោះ</span>
                <span class="agenda-name" style="font-size: 0.85rem;">ឈ្មោះ Hungarian ត្រឹមត្រូវ រូបមន្តឆ្លើយតបភ្លាមៗ និង Len() ដំណើរការឥតខ្ចោះ។</span>
              </div>
              <div class="agenda-block">
                <span class="agenda-time">៣ &bull; កម្រិតមធ្យម</span>
                <span class="agenda-name" style="font-size: 0.85rem;">Asset Tag បង្កើតបានត្រឹមត្រូវ ប៉ុន្តែខ្វះការរាប់ប្រវែងអក្សរ ឬខ្វះ Hungarian prefix។</span>
              </div>
              <div class="agenda-block" style="border-color: rgba(245, 158, 11, 0.4);">
                <span class="agenda-time" style="color: #fbbf24;">២ &bull; កំពុងអភិវឌ្ឍ</span>
                <span class="agenda-name" style="font-size: 0.85rem;">មានកំហុសលើ Dropdown (ភ្លេច .Value) ឬភ្លេចសញ្ញាសម្រង់លើ &amp;។</span>
              </div>
              <div class="agenda-block" style="border-color: rgba(239, 68, 68, 0.4);">
                <span class="agenda-time" style="background: rgba(239, 68, 68, 0.15); color: #fca5a5;">១ &bull; មិនទាន់សម្រេច</span>
                <span class="agenda-name" style="font-size: 0.85rem;">សរសេរអក្សរ Hardcoded ជំនួសឲ្យការប្រើប្រាស់រូបមន្ត Power Fx។</span>
              </div>
            </div>
          </div>`
    },
    {
      "title": "ផែនទីស្ពានចម្លង៖ ពីថ្ងៃទី ១៦ ឈានទៅកាន់ ថ្ងៃទី ១៧",
      "segment": "ផ្នែកទី ៨៖ ស្ពានចម្លង និងកិច្ចការផ្ទះ",
      "subtitle": "តភ្ជាប់ Properties រស់រវើកនៃថ្ងៃនេះ ទៅកាន់ការសម្រេចចិត្តបែបលក្ខខណ្ឌនៃថ្ងៃស្អែក។",
      "content": `<div class="card">
            <span class="card-badge">ម្សិលមិញ (ថ្ងៃទី ១៥)</span>
            <h3 class="card-title">ការរុករកអេក្រង់ (Navigation)</h3>
            <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
              យើងបានតភ្ជាប់អេក្រង់ច្រើនចូលគ្នាដោយប្រើ <code>Navigate()</code> និង <code>Back()</code> បង្កើតជាដំណើរការងារពី Home ទៅកាន់ Success Screen។
            </p>
          </div>

          <div class="card" style="border-color: rgba(59, 130, 246, 0.4); background: rgba(30, 41, 59, 0.85);">
            <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">ថ្ងៃនេះ (ថ្ងៃទី ១៦)</span>
            <h3 class="card-title">លក្ខណៈសម្បត្តិ និងរូបមន្ត</h3>
            <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
              យើងបានបញ្ចូលភាពឆ្លាតវៃទៅក្នុង Controls ដោយប្រើ Dot operator (<code>.</code>), ការផ្គុំអត្ថបទ (<code>&amp;</code>) និង <code>Len()</code> សម្រាប់ឆ្លើយតបភ្លាមៗ។
            </p>
          </div>

          <div class="card" style="border-color: var(--color-cyan); box-shadow: 0 0 20px rgba(6, 182, 212, 0.2);">
            <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">ថ្ងៃស្អែក (ថ្ងៃទី ១៧)</span>
            <h3 class="card-title">តក្កវិជ្ជា ការសម្រេចចិត្ត និង IF()</h3>
            <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
              យើងនឹងបង្រៀន App ឲ្យចេះគិត! លក្ខខណ្ឌសួរសំណួរដែលឆ្លើយចេញជា <strong>True ឬ False</strong> ហើយ <code>IF()</code> ធ្វើការជ្រើសរើសសកម្មភាពដោយស្វ័យប្រវត្តិ!
            </p>
          </div>`
    }
  ];

  // --------------------------------------------------------------------------
  // 3. ENGLISH SLIDES DATA STORE (Dynamic Cache captured from DOM on boot)
  // --------------------------------------------------------------------------
  let ENGLISH_SLIDES = [];

  function captureEnglishOriginals() {
    ENGLISH_SLIDES = slides.map((slide, idx) => {
      const title = slide.getAttribute('data-title') || ('Slide ' + (idx + 1));
      const segment = slide.getAttribute('data-segment') || '';
      const subtitleEl = slide.querySelector('.slide-header .subtitle');
      const contentEl = slide.querySelector('.slide-content');
      return {
        title: title,
        segment: segment,
        subtitle: subtitleEl ? subtitleEl.textContent.trim() : '',
        content: contentEl ? contentEl.innerHTML : ''
      };
    });
  }

  // --------------------------------------------------------------------------
  // 4. INTERACTIVE WIDGET DATA STORES
  // --------------------------------------------------------------------------
  const INSPECTOR_DATA = {
    label: {
      roleEn: "Output Control",
      roleKh: "ឧបករណ៍បញ្ចេញទិន្នន័យ (Output)",
      roleClass: "pill-output",
      prefix: "lbl",
      titleEn: "Text Label • lblStatusBanner",
      titleKh: "Text Label • lblStatusBanner",
      descEn: "Displays system facts, calculated messages, or status banners. Read-only by nature.",
      descKh: "បង្ហាញព័ត៌មានប្រព័ន្ធ សារគណនាស្វ័យប្រវត្ត ឬស្ថានភាពសង្ខេប។ ជាប្រភេទ Read-only មិនអាចវាយបញ្ចូលបានទេ។",
      formula: 'lblStatusBanner.Text = "Status: " & drpSeverity.Selected.Value',
      html: '<div style="background: rgba(15, 23, 42, 0.9); border: 1px solid #38bdf8; border-radius: 4px; padding: 0.75rem 1.25rem; color: #38bdf8; font-weight: 700; font-size: 1.05rem;">&bull; Status: PENDING INSPECTION</div>'
    },
    textinput: {
      roleEn: "Freeform Input Control",
      roleKh: "ឧបករណ៍បញ្ចូលទិន្នន័យ (Input)",
      roleClass: "pill-input",
      prefix: "txt",
      titleEn: "Text Input • txtRequester",
      titleKh: "Text Input • txtRequester",
      descEn: "Collects unrestricted text from user keyboard. Emits changes dynamically to reactive listeners.",
      descKh: "ប្រមូលទិន្នន័យអក្សរពីក្តារចុចរបស់អ្នកប្រើប្រាស់។ បញ្ជូនតម្លៃថ្មីភ្លាមៗទៅកាន់រូបមន្តដែលស្តាប់វា។",
      formula: 'txtRequester.HintText = "Enter technician name..."',
      html: '<input type="text" class="sample-input-control" placeholder="Enter technician name..." style="width: 380px;">'
    },
    button: {
      roleEn: "Action Trigger Control",
      roleKh: "ឧបករណ៍បញ្ជាសកម្មភាព (Action)",
      roleClass: "pill-action",
      prefix: "btn",
      titleEn: "Action Button • btnSubmitTicket",
      titleKh: "Action Button • btnSubmitTicket",
      descEn: "Mechanical electrical trigger. Evaluates OnSelect action formula: validates inputs and commits to storage.",
      descKh: "កុងតាក់បញ្ជាសកម្មភាព។ ដំណើរការរូបមន្ត OnSelect៖ ត្រួតពិនិត្យទិន្នន័យ និងរក្សាទុកចូល Database។",
      formula: 'btnSubmitTicket.OnSelect = SubmitForm(frmMaintenance); Navigate(scrSuccess)',
      html: '<button class="sample-button-control" style="width: 380px;" onclick="alert(document.body.classList.contains(\'khmer-mode\') ? \'បានចុច SubmitForm(frmMaintenance) រួចរាល់! (OnSelect Action Executed)\' : \'Ticket Submitted Successfully! (OnSelect Action Executed)\')">SUBMIT REPAIR TICKET</button>'
    }
  };

  // --------------------------------------------------------------------------
  // 5. SLIDE NAVIGATION ENGINE
  // --------------------------------------------------------------------------
  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;

    slides[currentSlideIndex].classList.remove('active');
    currentSlideIndex = index;
    slides[currentSlideIndex].classList.add('active');

    updateProgress();
    updateNotesDrawer();
    updateOverviewModal();

    bindInteractiveWidgets();
  }

  function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
      goToSlide(currentSlideIndex + 1);
    }
  }

  function prevSlide() {
    if (currentSlideIndex > 0) {
      goToSlide(currentSlideIndex - 1);
    }
  }

  function updateProgress() {
    const progressBar = document.getElementById('progress-bar');
    const slideCounter = document.getElementById('slide-counter');

    const pct = ((currentSlideIndex + 1) / totalSlides) * 100;
    if (progressBar) progressBar.style.width = pct + '%';

    if (slideCounter) {
      slideCounter.textContent = isKhmerActive
        ? ('ស្លាយទី ' + (currentSlideIndex + 1) + ' / ' + totalSlides)
        : ('Slide ' + (currentSlideIndex + 1) + ' / ' + totalSlides);
    }
  }

  // --------------------------------------------------------------------------
  // 6. BILINGUAL LANGUAGE ENGINE (ENGLISH / KHMER)
  // --------------------------------------------------------------------------
  function toggleLanguage() {
    try { localStorage.setItem('powerapps_presentation_lang', !isKhmerActive ? 'km' : 'en'); } catch(e){}
    isKhmerActive = !isKhmerActive;
    document.body.classList.toggle('khmer-mode', isKhmerActive);

    const langBtn = document.getElementById('btn-lang');
    const langLabel = document.getElementById('lang-label');
    if (langLabel) langLabel.textContent = isKhmerActive ? 'EN' : 'KH';
    if (langBtn) langBtn.title = isKhmerActive ? 'Switch to English (L)' : 'ប្តូរទៅភាសាខ្មែរ (L)';

    // Swap slide contents and headers without nesting
    slides.forEach((slide, idx) => {
      const contentEl = slide.querySelector('.slide-content');
      const headerTitle = slide.querySelector('.slide-header h2');
      const headerSubtitle = slide.querySelector('.slide-header .subtitle');
      const headerTag = slide.querySelector('.slide-header .section-tag');

      if (isKhmerActive && KHMER_SLIDES[idx]) {
        if (contentEl) contentEl.innerHTML = KHMER_SLIDES[idx].content;
        if (headerTitle) headerTitle.textContent = KHMER_SLIDES[idx].title;
        if (headerTag) headerTag.textContent = KHMER_SLIDES[idx].segment;
        if (headerSubtitle) headerSubtitle.textContent = KHMER_SLIDES[idx].subtitle || '';
      } else if (ENGLISH_SLIDES[idx]) {
        if (contentEl) contentEl.innerHTML = ENGLISH_SLIDES[idx].content;
        if (headerTitle) headerTitle.textContent = ENGLISH_SLIDES[idx].title;
        if (headerTag) headerTag.textContent = ENGLISH_SLIDES[idx].segment;
        if (headerSubtitle) headerSubtitle.textContent = ENGLISH_SLIDES[idx].subtitle || '';
      }
    });

    bindInteractiveWidgets();
    updateProgress();
    updateNotesDrawer();
    updateOverviewModal();
  }

  // --------------------------------------------------------------------------
  // 7. 90-MINUTE AGENDA TIMER
  // --------------------------------------------------------------------------
  function formatTimer(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) {
      timerDisplay.textContent = formatTimer(remainingSeconds);
    }
  }

  function toggleTimer() {
    if (isTimerRunning) {
      clearInterval(timerInterval);
      isTimerRunning = false;
      const btn = document.getElementById('btn-timer');
      if (btn) btn.classList.remove('active');
    } else {
      isTimerRunning = true;
      const btn = document.getElementById('btn-timer');
      if (btn) btn.classList.add('active');

      timerInterval = setInterval(() => {
        if (remainingSeconds > 0) {
          remainingSeconds--;
          updateTimerDisplay();
        } else {
          clearInterval(timerInterval);
          isTimerRunning = false;
          alert('90-Minute Training Session Complete!');
        }
      }, 1000);
    }
  }

  // --------------------------------------------------------------------------
  // 8. PRESENTER LASER POINTER & SPOTLIGHT
  // --------------------------------------------------------------------------
  function toggleLaser() {
    isLaserActive = !isLaserActive;
    const laserDot = document.getElementById('presenter-laser');
    const laserBtn = document.getElementById('btn-laser');

    if (laserDot) laserDot.classList.toggle('active', isLaserActive);
    if (laserBtn) laserBtn.classList.toggle('active', isLaserActive);
  }

  function initPointerAndSpotlight() {
    const laserDot = document.getElementById('presenter-laser');
    const rippleEl = document.getElementById('pointer-ripple');

    window.addEventListener('mousemove', (e) => {
      document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
      document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');

      if (isLaserActive && laserDot) {
        laserDot.style.left = e.clientX + 'px';
        laserDot.style.top = e.clientY + 'px';
      }
    });

    window.addEventListener('click', (e) => {
      if (isLaserActive && rippleEl) {
        rippleEl.style.left = e.clientX + 'px';
        rippleEl.style.top = e.clientY + 'px';
        rippleEl.classList.remove('rippling');
        void rippleEl.offsetWidth;
        rippleEl.classList.add('rippling');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 9. TRAINER NOTES DRAWER (HOTKEY: N)
  // --------------------------------------------------------------------------
  function toggleNotes() {
    isNotesOpen = !isNotesOpen;
    const drawer = document.getElementById('notes-drawer');
    const btn = document.getElementById('btn-notes');

    if (drawer) drawer.classList.toggle('open', isNotesOpen);
    if (btn) btn.classList.toggle('active', isNotesOpen);

    if (isNotesOpen) updateNotesDrawer();
  }

  function updateNotesDrawer() {
    const titleEl = document.getElementById('notes-slide-title');
    const bodyEl = document.getElementById('notes-body-content');
    const activeSlide = slides[currentSlideIndex];

    if (!activeSlide) return;

    if (titleEl) {
      const title = isKhmerActive 
        ? (KHMER_SLIDES[currentSlideIndex]?.title || activeSlide.getAttribute('data-title') || 'Slide ' + (currentSlideIndex + 1))
        : (activeSlide.getAttribute('data-title') || 'Slide ' + (currentSlideIndex + 1));
      titleEl.textContent = title;
    }

    if (bodyEl) {
      const notesEl = activeSlide.querySelector('aside.trainer-notes');
      bodyEl.innerHTML = notesEl ? notesEl.innerHTML : '<p style="color: var(--text-muted);">No trainer notes for this slide.</p>';
    }
  }

  // --------------------------------------------------------------------------
  // 10. SLIDE GRID OVERVIEW MODAL (HOTKEY: O)
  // --------------------------------------------------------------------------
  function toggleOverview() {
    isOverviewOpen = !isOverviewOpen;
    const modal = document.getElementById('overview-modal');
    const btn = document.getElementById('btn-overview');

    if (modal) modal.classList.toggle('open', isOverviewOpen);
    if (btn) btn.classList.toggle('active', isOverviewOpen);

    if (isOverviewOpen) renderOverviewGrid();
  }

  function renderOverviewGrid() {
    const container = document.getElementById('overview-grid-container');
    if (!container) return;

    container.innerHTML = '';
    slides.forEach((slide, idx) => {
      const card = document.createElement('div');
      card.className = 'overview-card' + (idx === currentSlideIndex ? ' active' : '');

      const currentTitle = isKhmerActive ? KHMER_SLIDES[idx]?.title : ENGLISH_SLIDES[idx]?.title;
      const title = currentTitle || ('Slide ' + (idx + 1));

      card.innerHTML = `
        <span class="overview-card-num">${isKhmerActive ? 'ស្លាយ ' + (idx + 1) : 'Slide ' + (idx + 1)}</span>
        <span class="overview-card-title">${title}</span>
      `;

      card.onclick = () => {
        goToSlide(idx);
        toggleOverview();
      };

      container.appendChild(card);
    });
  }

  function updateOverviewModal() {
    if (isOverviewOpen) renderOverviewGrid();
  }

  // --------------------------------------------------------------------------
  // 11. INTERACTIVE WIDGET HANDLERS (SLIDES 13, 16, & QUIZZES)
  // --------------------------------------------------------------------------
  function bindInteractiveWidgets() {
    // Widget 1: Slide 13 Property Inspector
    const inspectorTabs = document.querySelectorAll('.inspector-tab');
    if (inspectorTabs.length) {
      inspectorTabs.forEach(tab => {
        tab.onclick = () => {
          inspectorTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');

          const key = tab.getAttribute('data-control-key') || 'label';
          const data = INSPECTOR_DATA[key];
          if (!data) return;

          const roleBadge = document.getElementById('inspector-role-badge');
          const hungarianTag = document.getElementById('inspector-hungarian-tag');
          const titleEl = document.getElementById('inspector-control-title');
          const descEl = document.getElementById('inspector-control-desc');
          const previewEl = document.getElementById('inspector-live-preview');
          const formulaEl = document.getElementById('inspector-formula');

          if (roleBadge) {
            roleBadge.textContent = isKhmerActive ? data.roleKh : data.roleEn;
            roleBadge.className = 'role-badge-pill ' + data.roleClass;
          }
          if (hungarianTag) hungarianTag.textContent = 'Prefix: ' + data.prefix;
          if (titleEl) titleEl.textContent = isKhmerActive ? data.titleKh : data.titleEn;
          if (descEl) descEl.textContent = isKhmerActive ? data.descKh : data.descEn;
          if (previewEl) previewEl.innerHTML = data.html;
          if (formulaEl) formulaEl.textContent = data.formula;
        };
      });

      // Synchronize currently active tab's text and controls
      const activeTab = document.querySelector('.inspector-tab.active') || inspectorTabs[0];
      if (activeTab) {
        const key = activeTab.getAttribute('data-control-key') || 'label';
        const data = INSPECTOR_DATA[key];
        if (data) {
          const roleBadge = document.getElementById('inspector-role-badge');
          const hungarianTag = document.getElementById('inspector-hungarian-tag');
          const titleEl = document.getElementById('inspector-control-title');
          const descEl = document.getElementById('inspector-control-desc');
          const previewEl = document.getElementById('inspector-live-preview');
          const formulaEl = document.getElementById('inspector-formula');

          if (roleBadge) {
            roleBadge.textContent = isKhmerActive ? data.roleKh : data.roleEn;
            roleBadge.className = 'role-badge-pill ' + data.roleClass;
          }
          if (hungarianTag) hungarianTag.textContent = 'Prefix: ' + data.prefix;
          if (titleEl) titleEl.textContent = isKhmerActive ? data.titleKh : data.titleEn;
          if (descEl) descEl.textContent = isKhmerActive ? data.descKh : data.descEn;
          if (previewEl && !previewEl.innerHTML.trim()) previewEl.innerHTML = data.html;
          if (formulaEl) formulaEl.textContent = data.formula;
        }
      }
    }

    // Widget 2: Slide 16 Live Character Counter
    const notesInput = document.getElementById('lab-notes-input');
    const charBadge = document.getElementById('live-char-badge');
    const counterStatus = document.getElementById('live-counter-status');

    if (notesInput && charBadge) {
      const updateCounter = () => {
        const len = notesInput.value.length;
        charBadge.textContent = len + ' / 100 Characters';

        if (len > 100) {
          charBadge.className = 'char-counter-badge limit';
          if (counterStatus) {
            counterStatus.textContent = isKhmerActive ? 'គ្រោះថ្នាក់ • លើសកំណត់!' : 'Limit Exceeded • Error!';
            counterStatus.style.color = '#ef4444';
          }
        } else if (len > 80) {
          charBadge.className = 'char-counter-badge warning';
          if (counterStatus) {
            counterStatus.textContent = isKhmerActive ? 'ប្រយ័ត្ន • ជិតដល់កំណត់' : 'Warning • Approaching Limit';
            counterStatus.style.color = '#f59e0b';
          }
        } else {
          charBadge.className = 'char-counter-badge';
          if (counterStatus) {
            counterStatus.textContent = isKhmerActive ? 'សុវត្ថិភាព • មិនទាន់លើសកំណត់' : 'Safe • Under Limit';
            counterStatus.style.color = '#10b981';
          }
        }
      };

      notesInput.oninput = updateCounter;
      updateCounter();
    }
  }

  // Global quiz handler attached to onclick
  window.handleQuizAnswer = function (btn) {
    const parentContainer = btn.closest('.quiz-card');
    if (!parentContainer) return;

    const allButtons = parentContainer.querySelectorAll('.quiz-option-btn');
    allButtons.forEach(b => b.classList.remove('correct', 'wrong'));

    const isCorrect = btn.getAttribute('data-correct') === 'true';
    if (isCorrect) {
      btn.classList.add('correct');
    } else {
      btn.classList.add('wrong');
    }

    const slide = btn.closest('.slide');
    if (!slide) return;

    const feedbackBox = slide.querySelector('.quiz-feedback');
    const placeholder = slide.querySelector('[id^="quiz-prompt-placeholder-"]');
    const statusTitle = slide.querySelector('[id^="quiz-status-title-"]');
    const badge = slide.querySelector('[id^="quiz-badge-"]');

    if (feedbackBox) {
      feedbackBox.classList.add('visible');
      if (placeholder) placeholder.style.display = 'none';

      if (isCorrect) {
        if (badge) {
          badge.textContent = isKhmerActive ? 'ត្រឹមត្រូវ!' : 'Correct!';
          badge.style.background = 'rgba(16, 185, 129, 0.2)';
          badge.style.color = '#6ee7b7';
        }
        if (statusTitle) {
          statusTitle.textContent = isKhmerActive ? 'ចម្លើយពិតជាត្រឹមត្រូវ!' : 'Great Job!';
          statusTitle.style.color = '#86efac';
        }
      } else {
        if (badge) {
          badge.textContent = isKhmerActive ? 'មិនទាន់ត្រឹមត្រូវ' : 'Incorrect';
          badge.style.background = 'rgba(239, 68, 68, 0.2)';
          badge.style.color = '#fca5a5';
        }
        if (statusTitle) {
          statusTitle.textContent = isKhmerActive ? 'សូមព្យាយាមម្តងទៀត!' : 'Review The Rule:';
          statusTitle.style.color = '#fca5a5';
        }
      }
    }
  };

  // --------------------------------------------------------------------------
  // 12. KEYBOARD NAVIGATION
  // --------------------------------------------------------------------------
  function initKeyboardControls() {
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;

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
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(totalSlides - 1);
          break;
        case 'l':
        case 'L':
          toggleLanguage();
          break;
        case 'p':
        case 'P':
          toggleLaser();
          break;
        case 'n':
        case 'N':
          toggleNotes();
          break;
        case 'o':
        case 'O':
          toggleOverview();
          break;
        case 't':
        case 'T':
          toggleTimer();
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'Escape':
          if (isNotesOpen) toggleNotes();
          if (isOverviewOpen) toggleOverview();
          break;
      }
    });
  }

  // --------------------------------------------------------------------------
  // 13. FULLSCREEN CONTROLLER
  // --------------------------------------------------------------------------
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }

  // --------------------------------------------------------------------------
  // 13.5 GLOBAL WINDOW EXPORTS (Ensures Instant Inline onclick Functionality)
  // --------------------------------------------------------------------------
  window.prevSlide = prevSlide;
  window.nextSlide = nextSlide;
  window.goToSlide = goToSlide;
  window.toggleLanguage = toggleLanguage;
  window.toggleLaser = toggleLaser;
  window.toggleNotes = toggleNotes;
  window.toggleOverview = toggleOverview;
  window.toggleTimer = toggleTimer;
  window.toggleFullscreen = toggleFullscreen;

  // --------------------------------------------------------------------------
  // 14. BOOTSTRAP INITIALIZATION
  // --------------------------------------------------------------------------
  function initPresentation() {
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const btnLang = document.getElementById('btn-lang');
    const btnLaser = document.getElementById('btn-laser');
    const btnNotes = document.getElementById('btn-notes');
    const btnOverview = document.getElementById('btn-overview');
    const btnTimer = document.getElementById('btn-timer');
    const btnFullscreen = document.getElementById('btn-fullscreen');
    const notesCloseBtn = document.getElementById('notes-close-btn');
    const overviewCloseBtn = document.getElementById('overview-close-btn');

    if (btnPrev) btnPrev.onclick = prevSlide;
    if (btnNext) btnNext.onclick = nextSlide;
    if (btnLang) btnLang.onclick = toggleLanguage;
    if (btnLaser) btnLaser.onclick = toggleLaser;
    if (btnNotes) btnNotes.onclick = toggleNotes;
    if (btnOverview) btnOverview.onclick = toggleOverview;
    if (btnTimer) btnTimer.onclick = toggleTimer;
    if (btnFullscreen) btnFullscreen.onclick = toggleFullscreen;
    if (notesCloseBtn) notesCloseBtn.onclick = toggleNotes;
    if (overviewCloseBtn) overviewCloseBtn.onclick = toggleOverview;

    captureEnglishOriginals();
    initPointerAndSpotlight();
    initKeyboardControls();
    updateProgress();
    updateTimerDisplay();
    bindInteractiveWidgets();

    console.log('Day 16 Presentation loaded successfully (Lesson 14 Exact DOM Architecture)!');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPresentation);
  document.addEventListener('DOMContentLoaded', function() {
    try {
      const savedLang = localStorage.getItem('powerapps_presentation_lang') || 
        (JSON.parse(localStorage.getItem('powerapps_master_curriculum_state_v1') || '{}').isKhmer ? 'km' : null);
      if (savedLang === 'km' && !isKhmerActive && typeof toggleLanguage === 'function') {
        toggleLanguage();
      }
    } catch(e) {}
  });
  } else {
    initPresentation();
  }

})();


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
