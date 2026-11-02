/* ============================================================================
   POWER APPS FOUNDATION: DAY 17 PRESENTATION ENGINE
   Topic: Conditions + IF in Power Fx: Validation
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
    // Slide 1: Hero
    {
      "title": "លក្ខខណ្ឌ និង IF នៅក្នុង Power Fx៖ ការផ្ទៀងផ្ទាត់ទិន្នន័យ (Validation)",
      "segment": "ដំណាក់កាលទី ៦៖ មូលដ្ឋានគ្រឹះ Power Fx",
      "subtitle": "តភ្ជាប់គ្រឹះតក្កវិជ្ជាទៅនឹងអាកប្បកិរិយាពិតនៃ Power Apps។ ស្វែងយល់ពីរបៀបដែលការសម្រេចចិត្ត ពិត/មិនពិត (True/False) ដើរតួជាឆ្មាំសន្តិសុខឆ្លាតវៃ ទប់ស្កាត់ \"សំបុត្រខ្មោចទទេ\" មិនឱ្យជ្រៀតចូលមូលដ្ឋានទិន្នន័យ។",
      "content": `<div class="hero-badge">
            <span>គ្រឹះវិជ្ជាជីវៈ Microsoft Power Apps</span>
            <span>&bull;</span>
            <span>ថ្ងៃទី ១៧ នៃ ២៧</span>
          </div>
          <h1 class="hero-title">លក្ខខណ្ឌ និង IF នៅក្នុង Power Fx៖ ការផ្ទៀងផ្ទាត់ទិន្នន័យ</h1>
          <p class="hero-subtitle">
            តភ្ជាប់គ្រឹះតក្កវិជ្ជាទៅនឹងអាកប្បកិរិយាពិតនៃ Power Apps។ ស្វែងយល់ពីរបៀបដែលការសម្រេចចិត្ត ពិត/មិនពិត (True/False) ដើរតួជាឆ្មាំសន្តិសុខឆ្លាតវៃ ទប់ស្កាត់ "សំបុត្រខ្មោចទទេ" មិនឱ្យជ្រៀតចូលមូលដ្ឋានទិន្នន័យ។
          </p>

          <div class="model-chain">
            <span class="chain-item">បញ្ហាជាក់ស្តែង</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ដំណើរការ</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ទិន្នន័យ</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">UI / អេក្រង់</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item active">តក្កវិជ្ជា / ការសម្រេចចិត្ត</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item active">សកម្មភាព (Notify)</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ការផ្ទុកទិន្នន័យ</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ការឆ្លើយតប</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ការធ្វើតេស្ត</span>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>ការបើកមេរៀន (២ នាទី)៖</strong> សូមស្វាគមន៍មកកាន់ថ្ងៃទី ១៧! កាលពីម្សិលមិញ Controls បានរៀននិយាយឆ្លើយឆ្លងគ្នាដូចសន្លឹកកិច្ចការ Excel។</p>
<p><strong>ការតភ្ជាប់សំខាន់ថ្ងៃនេះ៖</strong> ថ្ងៃនេះ Controls របស់យើងនឹងរៀនចេះគិត និងធ្វើការសម្រេចចិត្ត។ យើងតភ្ជាប់តក្កវិជ្ជា ពិត/មិនពិត (True/False) និង If ពីថ្ងៃទី ៤-៦ ទៅកាន់សកម្មភាពជាក់ស្តែង ដើម្បីការពារកុំឱ្យទិន្នន័យទទេជ្រៀតចូល SharePoint។</p>`
    },

    // Slide 2: Agenda & Objectives
    {
      "title": "របៀបវារៈ ៩០ នាទី និងគោលបំណងរំពឹងទុកជាក់ស្តែង",
      "segment": "ផ្នែកទី ១ &bull; គោលបំណង និងរចនាសម្ព័ន្ធ",
      "subtitle": "គន្លងរៀនជាវង់តំរៀប (Spiral Learning)៖ តភ្ជាប់តក្កវិជ្ជាទៅនឹងសុវត្ថិភាពទិន្នន័យ តាមរយៈការអនុវត្តផ្ទាល់ដៃ។",
      "content": `<div class="card">
            <h3 class="card-title">៤ គោលបំណងរំពឹងទុកជាក់ស្តែង</h3>
            <div class="objective-item">
              <span class="obj-num">1</span>
              <div>
                <strong>ស្វែងរកទិន្នន័យទទេដោយប្រើ <code>IsBlank()</code>៖</strong>
                <p>ត្រួតពិនិត្យប្រអប់អត្ថបទ និងវាយតម្លៃយ៉ាងត្រឹមត្រូវថាតើប្រអប់នោះមានអក្សរ ឬនៅទទេ ដែលផ្តល់លទ្ធផល ពិត ឬមិនពិត (True/False)។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">2</span>
              <div>
                <strong>បង្កើតផ្លូវសម្រេចចិត្ត ៣ ផ្នែកជាមួយ <code>If()</code>៖</strong>
                <p>សរសេររូបមន្ត Power Fx យ៉ាងរឹងមាំតាមទម្រង់ <code>If(លក្ខខណ្ឌ, សកម្មភាពបើពិត, សកម្មភាពបើមិនពិត)</code> ដោយគ្មានកំហុស Syntax។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">3</span>
              <div>
                <strong>បង្ហាញសារជូនដំណឹងភ្លាមៗតាម <code>Notify()</code>៖</strong>
                <p>បង្ហាញផ្ទាំងសារពណ៌អណ្តែតលើអេក្រង់ (Error ពណ៌ក្រហម ឬ Success ពណ៌បៃតង) ដើម្បីឱ្យអ្នកប្រើប្រាស់យល់ច្បាស់ពីមូលហេតុ។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">4</span>
              <div>
                <strong>ការពារវាលបញ្ចូលទិន្នន័យច្រើនដោយប្រើ <code>||</code> (OR)៖</strong>
                <p>រួមបញ្ចូលការត្រួតពិនិត្យប្រអប់ទិន្នន័យជាច្រើនបញ្ចូលគ្នា ដើម្បីការពារ SharePoint ពីការបញ្ជូនទិន្នន័យមិនពេញលេញ។</p>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">កាលវិភាគ ៩០ នាទីជាក់លាក់</h3>
            <div class="agenda-timeline">
              <div class="agenda-block">
                <span class="agenda-time">00 - 10m</span>
                <span class="agenda-name">១. រំលឹកមេរៀនចាស់ &amp; ផែនទីគំនិត</span>
                <span class="agenda-desc">តភ្ជាប់ថ្ងៃ ៤-៦ &amp; ១៦ មកថ្ងៃ ១៧</span>
              </div>
              <div class="agenda-block">
                <span class="agenda-time">10 - 20m</span>
                <span class="agenda-name">២. បញ្ហាជាក់ស្តែងនៅកន្លែងការងារ</span>
                <span class="agenda-desc">វិបត្តិសំបុត្រខ្មោចខាតបង់ $22,000</span>
              </div>
              <div class="agenda-block">
                <span class="agenda-time">20 - 35m</span>
                <span class="agenda-name">៣. គំរូផ្នត់គំនិត &amp; ឧទាហរណ៍ជាក់ស្តែង</span>
                <span class="agenda-desc">ហេតុនិងផល &amp; ឆ្មាំទូ ATM</span>
              </div>
              <div class="agenda-block">
                <span class="agenda-time">35 - 50m</span>
                <span class="agenda-name">៤. ការវិភាគរូបមន្ត Power Fx លម្អិត (Formula Breakdown)</span>
                <span class="agenda-desc">បំបែក IsBlank, If, &amp; Notify</span>
              </div>
              <div class="agenda-block">
                <span class="agenda-time">50 - 65m</span>
                <span class="agenda-name">៥. បង្ហាញផ្ទាល់ &amp; អនុវត្តរួមគ្នា</span>
                <span class="agenda-desc">ដំឡើងរបាំងការពារលើប៊ូតុង Submit</span>
              </div>
              <div class="agenda-block">
                <span class="agenda-time">65 - 78m</span>
                <span class="agenda-name">៦. បន្ទប់ពិសោធន៍ &amp; កំហុសយល់ច្រឡំ</span>
                <span class="agenda-desc">កម្មវិធីត្រាប់តាម &amp; កែតម្រូវផ្នត់គំនិត</span>
              </div>
              <div class="agenda-block">
                <span class="agenda-time">78 - 86m</span>
                <span class="agenda-name">៧. សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង (៥ សំណួរ)</span>
                <span class="agenda-desc">សំណួរអន្តរកម្មជាមួយចម្លើយពន្យល់ភ្លាមៗ</span>
              </div>
              <div class="agenda-block">
                <span class="agenda-time">86 - 90m</span>
                <span class="agenda-name">៨. កិច្ចការប្រឡង &amp; ស្ពានទៅថ្ងៃស្អែក</span>
                <span class="agenda-desc">រង្វាស់ ១០០ ពិន្ទុ &amp; ត្រៀមថ្ងៃទី ១៨</span>
              </div>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>កំណត់ការរំពឹងទុក៖</strong> ពន្យល់សិស្សថាត្រឹមនាទីទី ៦៥ សិស្សគ្រប់រូបនឹងអាចសរសេរកូដការពារទិន្នន័យដោយដៃផ្ទាល់បាន។</p>`
    },

    // Slide 3: Spiral Concept Map
    {
      "title": "ផែនទីគំនិត ៥ នាទី៖ កម្មវិធីសិក្សាជាវង់តំរៀប",
      "segment": "ផ្នែកទី ១ &bull; ការតភ្ជាប់ជាវង់តំរៀប",
      "subtitle": "រាល់មេរៀនថ្មីៗទាំងអស់ គឺឈរលើគ្រឹះនៃគំនិតដែលអ្នកបានយល់ដឹងកន្លងមកជានិច្ច។",
      "content": `<div class="card">
            <div class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">ថ្ងៃទី ៤ - ៦៖ គ្រឹះតក្កវិជ្ជា</div>
            <h3 class="card-title">សំណួរ &amp; True/False</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">
              អ្នកបានរៀនថាតក្កវិជ្ជាកុំព្យូទ័រមិនមែនជាគណិតវិទ្យាអាថ៌កំបាំងទេ វាគ្រាន់តែជាការចោទសួរដែលផ្តល់លទ្ធផល <strong>ពិត (TRUE)</strong> ឬ <strong>មិនពិត (FALSE)</strong>។
            </p>
            <ul style="color: var(--text-muted); font-size: 0.88rem; padding-left: 1.2rem; line-height: 1.7;">
              <li>លក្ខខណ្ឌសួរសំណួរ។</li>
              <li>សំណួរផ្តល់លទ្ធផល True ឬ False។</li>
              <li><code>If()</code> ជ្រើសរើសផ្លូវ A ឬផ្លូវ B។</li>
            </ul>
          </div>

          <div class="card">
            <div class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c4b5fd;">ថ្ងៃទី ១៦៖ Properties &amp; រូបមន្ត</div>
            <h3 class="card-title">ភាពរស់រវើកដូច Excel</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">
              កាលពីម្សិលមិញ អ្នកបានឃើញ Controls ទាញតម្លៃពីគ្នាដោយប្រើសញ្ញាចុច (<code>Control.Property</code>) និងគណនាលទ្ធផលស្វ័យប្រវត្តិ។
            </p>
            <ul style="color: var(--text-muted); font-size: 0.88rem; padding-left: 1.2rem; line-height: 1.7;">
              <li><code>txtDescription.Text</code> ទាញទិន្នន័យវាយបញ្ចូល។</li>
              <li>ស្លាកអក្សរ (Labels) គណនាឡើងវិញភ្លាមៗ។</li>
              <li>ដំណើរការដូចសន្លឹកកិច្ចការ Excel។</li>
            </ul>
          </div>

          <div class="card" style="border-color: var(--color-cyan); box-shadow: 0 0 25px rgba(6, 182, 212, 0.2);">
            <div class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">ថ្ងៃនេះ (ថ្ងៃ ១៧)៖ ការផ្ទៀងផ្ទាត់ពិត</div>
            <h3 class="card-title">ឆ្មាំទ្វារឆ្លាតវៃ</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">
              យើងបង្រួបបង្រួមតក្កវិជ្ជាថ្ងៃ ៤-៦ ជាមួយ Properties ថ្ងៃ ១៦! យើងត្រួតពិនិត្យតម្លៃ រួចសួរថាតើវាទទេឬទេ ហើយទប់ស្កាត់កុំឱ្យ Submit។
            </p>
            <ul style="color: #67e8f9; font-size: 0.88rem; padding-left: 1.2rem; line-height: 1.7;">
              <li>ត្រួតពិនិត្យ៖ <code>IsBlank(txtDescription.Text)</code></li>
              <li>វាយតម្លៃ៖ តើស្មើនឹង True ឬទេ?</li>
              <li>អនុវត្ត៖ <code>If(...) &rarr; Notify(Error)</code></li>
            </ul>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>បញ្ជាក់ពីភាពបន្តបន្ទាប់៖</strong> "យើងមិនមែនរៀនកូដផ្តេសផ្តាសទេ។ យើងយកការគិត True/False ពីថ្ងៃទី ៤ មកបញ្ចូនតម្លៃពីថ្ងៃទី ១៦ ដើម្បីការពារទិន្នន័យក្រុមហ៊ុនពិតប្រាកដ។"</p>`
    },

    // Slide 4: Prerequisite Retrieval (Flip cards)
    {
      "title": "រំលឹកចំណេះដឹងគ្រឹះ៖ ផ្ទៀងផ្ទាត់ការចងចាំ ៤ ចំណុច",
      "segment": "ផ្នែកទី ១ &bull; រំលឹកចំណេះដឹងចាស់",
      "subtitle": "ចុចលើកាតនីមួយៗដើម្បីបង្វិល និងផ្ទៀងផ្ទាត់ការយល់ដឹងរបស់អ្នក មុនពេលយើងចាប់ផ្តើមសរសេរកូដថ្ងៃនេះ។",
      "content": `<div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-inner">
              <div class="flip-front">
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ១</span>
                <h4 style="color: var(--text-main); margin-top: 1rem; font-size: 1.05rem;">តើលក្ខខណ្ឌ (Condition) នៅក្នុងតក្កវិជ្ជាតែងតែផ្តល់លទ្ធផលជាអ្វី?</h4>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.5rem;">គិតត្រឡប់ទៅថ្ងៃទី ៤ មូលដ្ឋានគ្រឹះ Boolean...</p>
                <span class="flip-prompt">ចុចដើម្បីមើលចម្លើយ &rarr;</span>
              </div>
              <div class="flip-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ចម្លើយទី ១</span>
                <p style="color: #ecfdf5; font-size: 0.95rem; margin-top: 0.8rem; line-height: 1.6;">
                  តែងតែជា <strong>TRUE (ពិត)</strong> ឬ <strong>FALSE (មិនពិត)</strong>! គ្មានពាក្យថា "ប្រហែល" គ្មានលេខ ហើយក៏គ្មានពាក់កណ្តាលពិតដែរ។
                </p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-inner">
              <div class="flip-front">
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ២</span>
                <h4 style="color: var(--text-main); margin-top: 1rem; font-size: 1.05rem;">តើអ្នកទាញយកអត្ថបទចេញពីប្រអប់ឈ្មោះ txtDept តាមរបៀបណា?</h4>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.5rem;">រំលឹកកាលពីម្សិលមិញអំពីសញ្ញាចុច Dot Operator...</p>
                <span class="flip-prompt">ចុចដើម្បីមើលចម្លើយ &rarr;</span>
              </div>
              <div class="flip-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ចម្លើយទី ២</span>
                <p style="color: #ecfdf5; font-size: 0.95rem; margin-top: 0.8rem; line-height: 1.6;">
                  <code>txtDept.Text</code><br><br>
                  ឈ្មោះ Control គឺ <code>txtDept</code>; សញ្ញាចុចទាញយក Property; ហើយ <code>Text</code> គឺជាអក្សរដែលអ្នកប្រើប្រាស់បានវាយ។
                </p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-inner">
              <div class="flip-front">
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ៣</span>
                <h4 style="color: var(--text-main); margin-top: 1rem; font-size: 1.05rem;">តើមានអ្វីកើតឡើងបើអ្នកចុចប៊ូតុងដែលគ្មានរូបមន្តលើ OnSelect?</h4>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.5rem;">រំលឹកសកម្មភាពកាលពីថ្ងៃទី ១៥...</p>
                <span class="flip-prompt">ចុចដើម្បីមើលចម្លើយ &rarr;</span>
              </div>
              <div class="flip-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ចម្លើយទី ៣</span>
                <p style="color: #ecfdf5; font-size: 0.95rem; margin-top: 0.8rem; line-height: 1.6;">
                  <strong>គ្មានអ្វីកើតឡើងទាល់តែសោះ!</strong><br><br>
                  ប៊ូតុងគឺនៅស្ងៀមរហូតទាល់តែអ្នកអភិវឌ្ឍន៍សរសេររូបមន្តសកម្មភាពលើព្រឹត្តិការណ៍ <code>OnSelect</code> របស់វា។
                </p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-inner">
              <div class="flip-front">
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ៤</span>
                <h4 style="color: var(--text-main); margin-top: 1rem; font-size: 1.05rem;">ហេតុអ្វីបានជាយើងមិនចង់ឱ្យមានទិន្នន័យទទេក្នុងតារាង SharePoint?</h4>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.5rem;">រំលឹកការរចនាទិន្នន័យថ្ងៃ ៩-១១...</p>
                <span class="flip-prompt">ចុចដើម្បីមើលចម្លើយ &rarr;</span>
              </div>
              <div class="flip-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ចម្លើយទី ៤</span>
                <p style="color: #ecfdf5; font-size: 0.95rem; margin-top: 0.8rem; line-height: 1.6;">
                  ទិន្នន័យទទេធ្វើឱ្យខូចគុណភាពរបាយការណ៍ បង្កការភាន់ច្រឡំដល់ជាងជួសជុល និងធ្វើឱ្យប្រព័ន្ធផ្ញើអ៊ីមែលស្វ័យប្រវត្តិគាំង!
                </p>
              </div>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>ចុចលើកាតម្តងមួយៗដើម្បីឱ្យសិស្សឆ្លើយ។ សង្កត់ធ្ងន់ថា៖ កុំព្យូទ័រមិនអាចសម្រេចចិត្តលើភាពស្រពិចស្រពិលបានទេ វាត្រូវការ True ឬ False យ៉ាងច្បាស់។</p>`
    },

    // Slide 5: The Why Problem (Ghost Ticket Crisis)
    {
      "title": "មូលហេតុចាំបាច់៖ វិបត្តិសំបុត្រខ្មោចខាតបង់ $22,000",
      "segment": "ផ្នែកទី ២ &bull; វិបត្តិជាក់ស្តែងនៅរោងចក្រ",
      "subtitle": "តើមានអ្វីកើតឡើងនៅពេលកម្មវិធីទុកចិត្តមនុស្សដោយគ្មានការត្រួតពិនិត្យទិន្នន័យ?",
      "content": `<div class="card">
            <div class="crisis-banner">
              <span class="crisis-icon">&iexcl;</span>
              <div>
                <strong style="color: #fca5a5; font-size: 1.1rem;">របាយការណ៍ឧបទ្ទវហេតុ៖ រោងចក្រផលិតប្លាស្ទិក Apex Plastics</strong>
                <p style="color: #fecaca; font-size: 0.88rem; margin: 0.25rem 0 0 0;">វេន B &bull; ថ្ងៃទី ១៤ តុលា &bull; កំណត់ត្រាបញ្ជូនក្រុមជាងជួសជុល</p>
              </div>
            </div>

            <p style="color: var(--text-main); font-size: 0.98rem; line-height: 1.7; margin-bottom: 1rem;">
              នៅថ្ងៃទី ១៤ ខែតុលា បុគ្គលិកបញ្ជាម៉ាស៊ីនលើខ្សែសង្វាក់ទី ៣ កំពុងប្រញាប់ប្រញាល់ផ្លាស់ប្តូរវេនការងារ។ ដើម្បីឱ្យរួចដៃលឿន បុគ្គលិកជាច្រើនបានចុចប៊ូតុង <strong style="color: #60a5fa;">Submit Request</strong> លើថេប្លេតម្តងហើយម្តងទៀត ដោយមិនបានវាយរៀបរាប់បញ្ហា ឬជ្រើសរើសផ្នែកនោះឡើយ។
            </p>

            <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.7;">
              ដោយសារតែកម្មវិធី <strong>គ្មានការផ្ទៀងផ្ទាត់ (No Validation)</strong> ប្រព័ន្ធ Power Apps បានបញ្ជូនទិន្នន័យទទេស្អាតចំនួន ៤៧ ជួរចូលទៅក្នុង SharePoint។ ប្រព័ន្ធបានបង្កើតលេខសំបុត្ររៀបរយ ប៉ុន្តែគ្មានព័ត៌មានអ្វីទាំងអស់!
            </p>
          </div>

          <div class="card">
            <h3 class="card-title" style="color: #fca5a5;">ផលវិបាកជាបន្តបន្ទាប់ក្នុងរោងចក្រ</h3>
            
            <div class="consequence-row">
              <span class="consequence-badge">ភាពច្របូកច្របល់</span>
              <div>
                <strong style="color: var(--text-main); font-size: 0.9rem;">ក្រុមជាងដើររុករកពេញរោងចក្រ៖</strong>
                <p style="color: var(--text-muted); font-size: 0.84rem; margin: 0.15rem 0 0 0;">វិស្វករជួសជុលទទួលបានសារអាសន្ន ប៉ុន្តែគ្មានលេខម៉ាស៊ីន ធ្វើឱ្យខាតពេល ៦.៥ ម៉ោងដើរសួរគេឯងតាមរោងចក្រទាំង ១២ កន្លែង។</p>
              </div>
            </div>

            <div class="consequence-row">
              <span class="consequence-badge">ខាត $22k</span>
              <div>
                <strong style="color: var(--text-main); font-size: 0.9rem;">ខាតបង់ $22,000 ដោយសារម៉ាស៊ីនឈប់ដំណើរការ៖</strong>
                <p style="color: var(--text-muted); font-size: 0.84rem; margin: 0.15rem 0 0 0;">ម៉ាស៊ីនចាក់ពុម្ពលេខ ៤ ដែលបែកប្រេងធារាសាស្ត្រពិតប្រាកដត្រូវទុកចោល ៣ ម៉ោង ដោយសារជាងរវល់តែដេញតាម "សំបុត្រខ្មោច"។</p>
              </div>
            </div>

            <div class="consequence-row">
              <span class="consequence-badge">ឬសគល់បញ្ហា</span>
              <div>
                <strong style="color: var(--text-main); font-size: 0.9rem;">កម្មវិធីគ្មានឆ្មាំចាំការពារទ្វារ៖</strong>
                <p style="color: var(--text-muted); font-size: 0.84rem; margin: 0.15rem 0 0 0;">ប៊ូតុងបានបញ្ជូនទិន្នន័យភ្លាមៗដោយងងឹតងងល់ ដោយមិនបានសួរថា៖ <em>"តើអ្នកប្រើប្រាស់បានបំពេញព័ត៌មានចាំបាច់ហើយឬនៅ?"</em></p>
              </div>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>ទាក់ទាញអារម្មណ៍សិស្ស៖</strong> បង្ហាញឱ្យសិស្សឃើញថា ការងារអ្នកបង្កើត Power Apps មិនមែនគ្រាន់តែគូរអេក្រង់ស្អាតទេ តែជាអ្នកការពារទិន្នន័យពីកំហុសអចេតនារបស់មនុស្ស។</p>`
    },

    // Slide 6: Visual Cause-and-Effect Diagram
    {
      "title": "ដ្យាក្រាមហេតុនិងផល៖ សៀគ្វីបំបែកផ្លូវនៃការផ្ទៀងផ្ទាត់",
      "segment": "ផ្នែកទី ៣ &bull; គំរូផ្នត់គំនិត",
      "subtitle": "របៀបដែលលក្ខខណ្ឌតែមួយបំបែកដំណើរការរបស់កម្មវិធីជាពីរផ្លូវដាច់ដោយឡែកពីគ្នា។",
      "content": `<div class="validation-flow">
            <div class="flow-step-box">
              <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-cyan); font-weight: 700;">ជំហានទី ១៖ ព្រឹត្តិការណ៍ចុច</span>
              <strong style="color: var(--text-main); margin-top: 0.35rem; font-size: 1rem;">អ្នកប្រើចុច "Submit"</strong>
              <span style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;"><code>btnSubmit.OnSelect</code> ដំណើរការ</span>
            </div>

            <div class="flow-arrow-indicator">&rarr;</div>

            <div class="flow-step-box" style="border-color: var(--color-warning);">
              <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-warning); font-weight: 700;">ជំហានទី ២៖ សំណួរឆ្មាំទ្វារ</span>
              <strong style="color: #fbbf24; margin-top: 0.35rem; font-size: 1rem;"><code>IsBlank(txtDescription.Text)</code></strong>
              <span style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">តើប្រអប់ពណ៌នានៅទទេមែនទេ?</span>
            </div>

            <div class="flow-arrow-indicator">&rarr;</div>

            <div class="flow-step-box" style="border-color: var(--color-primary);">
              <span style="font-size: 0.75rem; text-transform: uppercase; color: #93c5fd; font-weight: 700;">ជំហានទី ៣៖ ការបំបែកផ្លូវ</span>
              <strong style="color: var(--text-main); margin-top: 0.35rem; font-size: 1rem;">អនុគមន៍ <code>If()</code> សម្រេចចិត្ត</strong>
              <span style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">វាយតម្លៃចេញ TRUE ឬ FALSE</span>
            </div>
          </div>

          <div class="branch-fork-grid">
            <div class="branch-card branch-fail">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                <span style="font-weight: 700; color: #ef4444; font-size: 0.95rem;">ផ្លូវ A៖ លទ្ធផលគឺ TRUE (ប្រអប់នៅទទេ!)</span>
                <span class="card-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">បញ្ឈប់ &amp; ព្រមាន</span>
              </div>
              <p style="color: var(--text-main); font-size: 0.9rem; margin-bottom: 0.5rem;">
                លក្ខខណ្ឌវាយតម្លៃឃើញ <strong>TRUE</strong>។ បាត់ព័ត៌មានហើយ! ឆ្មាំទ្វារនឹងបញ្ឈប់ការបញ្ជូនទិន្នន័យជាបន្ទាន់។
              </p>
              <div style="background: rgba(0, 0, 0, 0.4); padding: 0.75rem; border-radius: 0.5rem; font-family: var(--font-code); color: #fca5a5; font-size: 0.85rem;">
                Notify("ត្រូវតែបញ្ចូលការពណ៌នា!", NotificationType.Error)
              </div>
              <p style="color: var(--text-muted); font-size: 0.8rem; margin-top: 0.5rem;">
                &bull; សារពណ៌ក្រហមអណ្តែតលើអេក្រង់។<br>
                &bull; មិនប៉ះពាល់ដល់ SharePoint ឡើយ។<br>
                &bull; អ្នកប្រើប្រាស់នៅរក្សាទំព័រដដែលដើម្បីកែតម្រូវ។
              </p>
            </div>

            <div class="branch-card branch-pass">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                <span style="font-weight: 700; color: #10b981; font-size: 0.95rem;">ផ្លូវ B៖ លទ្ធផលគឺ FALSE (បានបំពេញត្រឹមត្រូវ!)</span>
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">អនុញ្ញាត &amp; រក្សាទុក</span>
              </div>
              <p style="color: var(--text-main); font-size: 0.9rem; margin-bottom: 0.5rem;">
                លក្ខខណ្ឌវាយតម្លៃឃើញ <strong>FALSE</strong>។ ប្រអប់មិនទទេទេ! ឆ្មាំទ្វារអនុញ្ញាតឱ្យបញ្ជូនទិន្នន័យបាន។
              </p>
              <div style="background: rgba(0, 0, 0, 0.4); padding: 0.75rem; border-radius: 0.5rem; font-family: var(--font-code); color: #86efac; font-size: 0.85rem;">
                Notify("សំណើត្រូវបានបញ្ជូនដោយជោគជ័យ!", NotificationType.Success)
              </div>
              <p style="color: var(--text-muted); font-size: 0.8rem; margin-top: 0.5rem;">
                &bull; សារពណ៌បៃតងបញ្ជាក់ការជោគជ័យ។<br>
                &bull; ទិន្នន័យត្រូវបានរក្សាទុកក្នុង SharePoint។<br>
                &bull; សម្អាតទម្រង់បែបបទ ឬប្តូរទៅអេក្រង់ជោគជ័យ។
              </p>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>ប្រើ Laser Pointer (P)៖</strong> ចង្អុលបង្ហាញពីជំហាន ១ ទៅ ២ និង ៣ រួចបំបែកចង្អុលផ្លូវ A និង ផ្លូវ B។ បញ្ជាក់ថាកុំព្យូទ័រមិនអាចដើរផ្លូវទាំងពីរក្នុងពេលតែមួយបានទេ។</p>`
    },

    // Slide 7: Everyday Analogy
    {
      "title": "ឧទាហរណ៍ជាក់ស្តែងប្រចាំថ្ងៃ៖ ទូ ATM និងសន្តិសុខទ្វារ",
      "segment": "ផ្នែកទី ៣ &bull; ឧទាហរណ៍ជាក់ស្តែង",
      "subtitle": "ការតភ្ជាប់ការផ្ទៀងផ្ទាត់កូដដ៏ស្មុគស្មាញ ទៅនឹងឆ្មាំទ្វារជាក់ស្តែងក្នុងជីវិតរស់នៅ។",
      "content": `<div class="card">
            <div class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">ឧទាហរណ៍ទី ១ &bull; ទូដកប្រាក់ ATM</div>
            <h3 class="card-title">ឆ្មាំត្រួតពិនិត្យការដកប្រាក់</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">
              នៅពេលអ្នកស៊កកាតធនាគារ ហើយស្នើសុំដកប្រាក់ $500 តើមានអ្វីកើតឡើងក្នុងម៉ាស៊ីន មុនពេលទ្វារប្រាក់របើក?
            </p>

            <div style="background: rgba(15, 23, 42, 0.7); border-radius: 0.5rem; padding: 1rem; border: 1px solid var(--border-subtle); margin-bottom: 1rem;">
              <strong style="color: #60a5fa; font-size: 0.9rem;">សំណួរខាងក្នុងរបស់ទូ ATM៖</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 0.25rem 0 0 0;">
                <em>"តើសមតុល្យក្នុងកុងមានយ៉ាងហោចណាស់ $500 មែនទេ?"</em>
              </p>
            </div>

            <ul style="color: var(--text-muted); font-size: 0.88rem; padding-left: 1.2rem; line-height: 1.7;">
              <li><strong>បើ FALSE (លុយមិនគ្រប់)៖</strong> ម៉ាស៊ីនបន្លឺសំឡេងរោទ៍ មិនបើកទ្វារលុយទេ ហើយបង្ហាញសារ៖ <em>"សមតុល្យមិនគ្រប់គ្រាន់"</em>។</li>
              <li><strong>បើ TRUE (មានលុយគ្រប់)៖</strong> ម៉ាស៊ីនកាត់ប្រាក់ក្នុងកុង ហើយទ្វារលុយរបើកចេញមក។</li>
              <li><strong>មេរៀនសំខាន់៖</strong> ទូ ATM មិនដែលបើកទ្វារលុយឱ្យអ្នកសិន រួចចាំពិនិត្យកុងតាមក្រោយនោះឡើយ! ការផ្ទៀងផ្ទាត់ត្រូវតែកើតឡើងមុនជានិច្ច។</li>
            </ul>
          </div>

          <div class="card">
            <div class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ឧទាហរណ៍ទី ២ &bull; សន្តិសុខរោងចក្រ</div>
            <h3 class="card-title">ឆ្មាំត្រួតពិនិត្យកាតបុគ្គលិក</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">
              ស្រមៃថាអ្នកដើរទៅកាន់ទ្វារវិលសុវត្ថិភាពនៅច្រកចូលរោងចក្រ Apex Plastics។
            </p>

            <div style="background: rgba(15, 23, 42, 0.7); border-radius: 0.5rem; padding: 1rem; border: 1px solid var(--border-subtle); margin-bottom: 1rem;">
              <strong style="color: #34d399; font-size: 0.9rem;">សំណួររបស់សន្តិសុខ៖</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 0.25rem 0 0 0;">
                <em>"តើអ្នកមានពាក់កាតសម្គាល់បុគ្គលិកត្រឹមត្រូវដែរឬទេ?"</em>
              </p>
            </div>

            <ul style="color: var(--text-muted); font-size: 0.88rem; padding-left: 1.2rem; line-height: 1.7;">
              <li><strong>បើ FALSE (គ្មានកាត)៖</strong> សន្តិសុខឃាត់អ្នកភ្លាម ហើយប្រាប់ថា <em>"មិនអនុញ្ញាតឱ្យចូលទេ។ សូមទៅចុះឈ្មោះសិន។"</em></li>
              <li><strong>បើ TRUE (ស្កេនកាតជាប់)៖</strong> ទ្វារវិលរបើកឱ្យអ្នកចូលទៅក្នុងរោងចក្រ។</li>
              <li><strong>នៅក្នុង Power Apps៖</strong> អនុគមន៍ <code>If()</code> គឺជាសន្តិសុខឌីជីថលរបស់អ្នក។ ហើយ <code>IsBlank()</code> គឺជាសកម្មភាពត្រួតពិនិត្យកាត!</li>
            </ul>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>រំលឹកសិស្សកុំឱ្យភ័យខ្លាចការសរសេរកូដ។ មនុស្សយើងបានប្រើប្រាស់ប្រព័ន្ធផ្ទៀងផ្ទាត់បែបនេះរាប់ពាន់ឆ្នាំមកហើយ (លិខិតឆ្លងដែន សំបុត្រកុន សោទ្វារ)។</p>`
    },

    // Slide 8: Translation Ladder
    {
      "title": "កាំជណ្តើរបកប្រែពីពាក្យសាមញ្ញទៅកាន់ Power Fx",
      "segment": "ផ្នែកទី ៣ &bull; កាំជណ្តើរបកប្រែ",
      "subtitle": "កុំទន្ទេញចាំកូដ! សូមដើរតាមកាំជណ្តើរ ៥ ថ្នាក់ពីការគិតបែបមនុស្សទៅកាន់កូដ Power Fx។",
      "content": `<div class="card">
            <h3 class="card-title">កាំជណ្តើរបកប្រែ ៥ កាំ</h3>

            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <div style="background: rgba(15, 23, 42, 0.7); border-left: 4px solid #3b82f6; padding: 0.65rem 1rem; border-radius: 0.4rem;">
                <span style="font-size: 0.72rem; text-transform: uppercase; color: #93c5fd; font-weight: 700;">កាំទី ១៖ តម្រូវការអាជីវកម្ម</span>
                <p style="color: var(--text-main); font-size: 0.88rem; margin: 0.2rem 0 0 0;">"ទប់ស្កាត់កុំឱ្យបុគ្គលិកផ្ញើសំបុត្រទទេទៅកាន់ក្រុមជាង។"</p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.7); border-left: 4px solid #06b6d4; padding: 0.65rem 1rem; border-radius: 0.4rem;">
                <span style="font-size: 0.72rem; text-transform: uppercase; color: #67e8f9; font-weight: 700;">កាំទី ២៖ សំណួរជាភាសាសាមញ្ញ</span>
                <p style="color: var(--text-main); font-size: 0.88rem; margin: 0.2rem 0 0 0;">"តើប្រអប់ពណ៌នាបញ្ហានៅទទេស្អាតមែនទេ?"</p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.7); border-left: 4px solid #f59e0b; padding: 0.65rem 1rem; border-radius: 0.4rem;">
                <span style="font-size: 0.72rem; text-transform: uppercase; color: #fde68a; font-weight: 700;">កាំទី ៣៖ សំណួរជាភាសា Power Fx</span>
                <p style="color: var(--text-main); font-family: var(--font-code); font-size: 0.88rem; margin: 0.2rem 0 0 0;">IsBlank(txtDescription.Text)</p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.7); border-left: 4px solid #a855f7; padding: 0.65rem 1rem; border-radius: 0.4rem;">
                <span style="font-size: 0.72rem; text-transform: uppercase; color: #d8b4fe; font-weight: 700;">កាំទី ៤៖ តម្លៃ Boolean ដែលទទួលបាន</span>
                <p style="color: var(--text-main); font-size: 0.88rem; margin: 0.2rem 0 0 0;">ផ្តល់លទ្ធផលស្វ័យប្រវត្តិជា <strong>true</strong> ឬ <strong>false</strong></p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.7); border-left: 4px solid #10b981; padding: 0.65rem 1rem; border-radius: 0.4rem;">
                <span style="font-size: 0.72rem; text-transform: uppercase; color: #86efac; font-weight: 700;">កាំទី ៥៖ រូបមន្តសម្រេចចិត្តពេញលេញ</span>
                <p style="color: var(--text-main); font-family: var(--font-code); font-size: 0.85rem; margin: 0.2rem 0 0 0;">If(IsBlank(txtDesc.Text), Notify(Error), Notify(Success))</p>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">ច្បាប់មាសសម្រាប់អ្នករៀនពីលេខសូន្យ</h3>
            <div style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 0.75rem; padding: 1.25rem; margin-bottom: 1.25rem;">
              <strong style="color: #93c5fd; font-size: 1.05rem;">"គិតជាភាសាសាមញ្ញជាមុន សឹមសរសេរកូដជាក្រោយ!"</strong>
              <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.7; margin-top: 0.5rem;">
                អ្នករៀនថ្មីៗច្រើនតែភ័យស្លន់ស្លោ ព្រោះព្យាយាមសរសេរកូដចូលក្នុង Formula Bar ភ្លាមៗ។ វិស្វករអាជីពមិនដែលធ្វើបែបនេះទេ។ ពួកគេបង្កើតសំណួរជាពាក្យនិយាយធម្មតាជាមុនសិន រួចទើបបកប្រែពាក្យទាំងនោះទៅជា Power Fx តាមក្រោយ។
              </p>
            </div>

            <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 0.75rem; padding: 1.25rem;">
              <strong style="color: #86efac; font-size: 0.95rem;">ហេតុអ្វីបានជាវិធីនេះបំបាត់ការភ័យខ្លាច៖</strong>
              <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; margin-top: 0.4rem;">
                នៅពេលអ្នកយល់ថា <code>IsBlank()</code> គ្រាន់តែជាពាក្យនិយាយថា <em>"តើរបស់នេះនៅទទេមែនទេ?"</em> អ្នកនឹងលែងមានអារម្មណ៍ថាវាកំពុងនិយាយភាសាបរទេសដ៏ពិបាកយល់ទៀតហើយ។
              </p>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>ប្រសិនបើសិស្សគាំងមិនដឹងសរសេរអ្វី សូមឱ្យពួកគេដកដៃពីក្តារចុច ហើយសួរជាភាសាសាមញ្ញថា៖ "តើយើងចង់សួរអ្វីទៅកាន់កុំព្យូទ័រ?"។</p>`
    },

    // Slide 9: IsBlank Syntax Dissection
    {
      "title": "ការវិភាគរូបមន្តទី ១ (Formula Breakdown 1)៖ ឧបករណ៍ត្រួតពិនិត្យភាពពិត IsBlank()",
      "segment": "ផ្នែកទី ៤ &bull; វិភាគរូបមន្តលម្អិត",
      "subtitle": "រចនាសម្ព័ន្ធ (Structure)នៃអនុគមន៍ដែលត្រួតពិនិត្យថាតើប្រអប់ទិន្នន័យមានអក្សរ ឬនៅទទេស្អាត។",
      "content": `<div class="syntax-dissection-grid">
            <div class="syntax-visual-chain">
              <div class="syntax-token-pill token-keyword">
                <span>IsBlank</span>
                <span class="token-desc">ឈ្មោះអនុគមន៍</span>
              </div>
              <span style="font-size: 1.8rem; color: #94a3b8; font-weight: 300;">(</span>
              <div class="syntax-token-pill token-condition">
                <span>txtDescription.Text</span>
                <span class="token-desc">គោលដៅត្រូវពិនិត្យ</span>
              </div>
              <span style="font-size: 1.8rem; color: #94a3b8; font-weight: 300;">)</span>
              <span style="font-size: 1.5rem; color: var(--color-cyan);">&rarr;</span>
              <div class="syntax-token-pill token-false" style="min-width: 130px;">
                <span>true / false</span>
                <span class="token-desc">លទ្ធផល Boolean</span>
              </div>
            </div>

            <div class="grid-3" style="margin-top: 0.5rem;">
              <div class="card" style="padding: 1.15rem;">
                <strong style="color: #60a5fa; font-size: 0.95rem;">១. តើ <code>IsBlank</code> ជាអ្វី?</strong>
                <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6; margin-top: 0.4rem;">
                  វាជាអនុគមន៍ត្រួតពិនិត្យស្រាប់ក្នុង Power Fx។ បេសកកម្មតែមួយគត់របស់វា គឺមើលថាតើតម្លៃមួយនោះទទេ ឬអត់។
                </p>
              </div>

              <div class="card" style="padding: 1.15rem;">
                <strong style="color: #fbbf24; font-size: 0.95rem;">២. តើអ្វីនៅក្នុងវង់ក្រចក <code>( )</code>?</strong>
                <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6; margin-top: 0.4rem;">
                  ជាតម្លៃដែលអ្នកចង់ឱ្យវាពិនិត្យ! នៅទីនេះយើងដាក់ <code>txtDescription.Text</code> ដើម្បីទាញយកអក្សរដែលអ្នកប្រើបានវាយ។
                </p>
              </div>

              <div class="card" style="padding: 1.15rem;">
                <strong style="color: #86efac; font-size: 0.95rem;">៣. តើវាផ្តល់លទ្ធផលអ្វីមកវិញ?</strong>
                <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6; margin-top: 0.4rem;">
                  ផ្តល់ចម្លើយ Boolean យ៉ាងស្អាត៖ ចេញ <strong>true</strong> បើប្រអប់នោះទទេ; ចេញ <strong>false</strong> បើមានអក្សរទោះតែមួយតួក៏ដោយ។
                </p>
              </div>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>ពន្យល់ពីវង់ក្រចក <code>( )</code>៖ គិតថាវាដូចជាស្រោមសំបុត្រ ឬកញ្ចក់ពង្រីក។ IsBlank គឺជាអ្នកស៊ើបអង្កេត ហើយវង់ក្រចកផ្ទុកភស្តុតាងដែលត្រូវពិនិត្យ។</p>`
    },

    // Slide 10: If 3-Argument Syntax Dissection
    {
      "title": "ការវិភាគរូបមន្តទី ២ (Formula Breakdown 2)៖ ម៉ាស៊ីនសម្រេចចិត្ត If()",
      "segment": "ផ្នែកទី ៤ &bull; វិភាគរូបមន្តលម្អិត",
      "subtitle": "គ្រប់ការសម្រេចចិត្តក្នុង Power Apps តែងតែប្រើប្រាស់រចនាសម្ព័ន្ធ ៣ ផ្នែកដូចគ្នានេះជានិច្ច។",
      "content": `<div class="syntax-dissection-grid">
            <div class="syntax-visual-chain">
              <div class="syntax-token-pill token-keyword">
                <span>If</span>
                <span class="token-desc">ពាក្យគន្លឹះសម្រេចចិត្ត</span>
              </div>
              <span style="font-size: 1.6rem; color: #94a3b8;">(</span>
              <div class="syntax-token-pill token-condition">
                <span>IsBlank(txtDept.Text)</span>
                <span class="token-desc">ផ្នែក ១៖ លក្ខខណ្ឌ (សំណួរ)</span>
              </div>
              <span style="font-size: 1.8rem; color: #94a3b8; font-weight: 700;">,</span>
              <div class="syntax-token-pill token-true">
                <span>Notify("ជ្រើសផ្នែក!", Error)</span>
                <span class="token-desc">ផ្នែក ២៖ សកម្មភាពបើពិត (TRUE)</span>
              </div>
              <span style="font-size: 1.8rem; color: #94a3b8; font-weight: 700;">,</span>
              <div class="syntax-token-pill token-false">
                <span>Notify("ជោគជ័យ!", Success)</span>
                <span class="token-desc">ផ្នែក ៣៖ សកម្មភាពបើមិនពិត (FALSE)</span>
              </div>
              <span style="font-size: 1.6rem; color: #94a3b8;">)</span>
            </div>

            <div class="grid-3" style="margin-top: 0.5rem;">
              <div class="card" style="padding: 1.15rem; border-color: rgba(245, 158, 11, 0.4);">
                <strong style="color: #fbbf24; font-size: 0.95rem;">ផ្នែកទី ១៖ សំណួរចោទសួរ</strong>
                <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6; margin-top: 0.4rem;">
                  លក្ខខណ្ឌដែលផ្តល់លទ្ធផល ពិត ឬមិនពិត។ នៅទីនេះ៖ <em>"តើប្រអប់ផ្នែកនៅទទេមែនទេ?"</em>
                </p>
              </div>

              <div class="card" style="padding: 1.15rem; border-color: rgba(239, 68, 68, 0.4);">
                <strong style="color: #fca5a5; font-size: 0.95rem;">ផ្នែកទី ២៖ ធ្វើអ្វីបើពិត (True)</strong>
                <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6; margin-top: 0.4rem;">
                  អ្វីដែលកម្មវិធីត្រូវធ្វើបើលក្ខខណ្ឌពិត (ទទេមែន)។ នៅទីនេះ៖ បង្ហាញសារក្រហមព្រមាន និងបញ្ឈប់។
                </p>
              </div>

              <div class="card" style="padding: 1.15rem; border-color: rgba(16, 185, 129, 0.4);">
                <strong style="color: #86efac; font-size: 0.95rem;">ផ្នែកទី ៣៖ ធ្វើអ្វីបើមិនពិត (False)</strong>
                <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6; margin-top: 0.4rem;">
                  អ្វីដែលកម្មវិធីត្រូវធ្វើបើលក្ខខណ្ឌមិនពិត (មិនទទេទេ)។ នៅទីនេះ៖ អនុញ្ញាតឱ្យបញ្ជូនទិន្នន័យដោយជោគជ័យ!
                </p>
              </div>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>ច្បាប់សញ្ញាក្បៀស (Comma)៖</strong> សញ្ញាក្បៀសទីមួយមានន័យថា "បើត្រូវ ធ្វើរឿងនេះ"។ សញ្ញាក្បៀសទីពីរមានន័យថា "បើមិនត្រូវទេ ធ្វើរឿងនោះវិញ"។</p>`
    },

    // Slide 11: Notify Engine & Types
    {
      "title": "ការវិភាគរូបមន្តទី ៣ (Formula Breakdown 3)៖ ម៉ាស៊ីនជូនដំណឹង Notify()",
      "segment": "ផ្នែកទី ៤ &bull; វិភាគរូបមន្តលម្អិត",
      "subtitle": "ការប្រាស្រ័យទាក់ទងយ៉ាងច្បាស់ជាមួយអ្នកប្រើប្រាស់ តាមរយៈផ្ទាំងសារពណ៌អណ្តែតលើអេក្រង់។",
      "content": `<div class="card">
            <h3 class="card-title">រចនាសម្ព័ន្ធ (Structure)នៃអនុគមន៍ <code>Notify()</code></h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1rem;">
              អនុគមន៍ <code>Notify()</code> បង្ហាញផ្ទាំងសារបណ្តោះអាសន្ននៅផ្នែកខាងលើនៃអេក្រង់។ វាត្រូវការប៉ារ៉ាម៉ែត្រសំខាន់ ២៖
            </p>

            <div style="background: rgba(15, 23, 42, 0.85); padding: 1rem; border-radius: 0.65rem; border: 1px solid var(--border-subtle); margin-bottom: 1rem;">
              <code style="color: #93c5fd; font-size: 0.95rem;">Notify("សាររបស់អ្នកនៅទីនេះ", NotificationType.Error)</code>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.65rem;">
              <div style="background: rgba(15, 23, 42, 0.6); padding: 0.65rem; border-radius: 0.4rem; border-left: 3px solid #3b82f6;">
                <strong style="color: #93c5fd; font-size: 0.88rem;">១. អត្ថបទសារ (ក្នុងសញ្ញាសម្រង់)៖</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.2rem 0 0 0;">ពាក្យពេចន៍ដែលពន្យល់ច្បាស់អំពីអ្វីដែលបានកើតឡើង ឬរបៀបកែតម្រូវ។</p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.6); padding: 0.65rem; border-radius: 0.4rem; border-left: 3px solid #f59e0b;">
                <strong style="color: #fde68a; font-size: 0.88rem;">២. ប្រភេទជូនដំណឹង (NotificationType)៖</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.2rem 0 0 0;">កំណត់ពណ៌ រូបតំណាង និងកម្រិតអាសន្ននៃផ្ទាំងសារ។</p>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">ប្រភេទសារផ្លូវការទាំង ៤ ក្នុង Power Apps</h3>

            <div class="toast-sim-banner toast-error">
              <span>&cross;</span>
              <div>
                <strong>NotificationType.Error (ពណ៌ក្រហម)</strong>
                <p style="font-size: 0.8rem; margin: 0; font-weight: normal; opacity: 0.9;">ប្រើសម្រាប់កំហុសទិន្នន័យ ការខកខានបំពេញ និងការបញ្ឈប់ដំណើរការ។</p>
              </div>
            </div>

            <div class="toast-sim-banner toast-success">
              <span>&check;</span>
              <div>
                <strong>NotificationType.Success (ពណ៌បៃតង)</strong>
                <p style="font-size: 0.8rem; margin: 0; font-weight: normal; opacity: 0.9;">ប្រើពេលរក្សាទុកទិន្នន័យបានជោគជ័យ ឬបញ្ជូនចូល SharePoint រួចរាល់។</p>
              </div>
            </div>

            <div class="toast-sim-banner toast-warning">
              <span>&excl;</span>
              <div>
                <strong>NotificationType.Warning (ពណ៌លឿងទុំ)</strong>
                <p style="font-size: 0.8rem; margin: 0; font-weight: normal; opacity: 0.9;">ប្រើដើម្បីដាស់តឿនពីហានិភ័យមិនធ្ងន់ធ្ងរ (ឧ. ស្តុកនៅសល់តិច)។</p>
              </div>
            </div>

            <div class="toast-sim-banner toast-info">
              <span>&starf;</span>
              <div>
                <strong>NotificationType.Information (ពណ៌ខៀវ)</strong>
                <p style="font-size: 0.8rem; margin: 0; font-weight: normal; opacity: 0.9;">ផ្តល់ព័ត៌មានទូទៅ ដំណឹងធ្វើបច្ចុប្បន្នភាព និងការណែនាំ។</p>
              </div>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>បទពិសោធន៍អ្នកប្រើប្រាស់ (UX)៖</strong> បើ validation បរាជ័យហើយយើងមិនបង្ហាញពណ៌ក្រហមទេ អ្នកប្រើប្រាស់នឹងមិនដឹងថាគាត់ធ្វើខុសត្រង់ណាឡើយ។</p>`
    },

    // Slide 12: Multi-Field Validation with ||
    {
      "title": "ការផ្ទៀងផ្ទាត់វាលច្រើនជាមួយសញ្ញា || (OR)",
      "segment": "ផ្នែកទី ៤ &bull; ការផ្ទៀងផ្ទាត់វាលច្រើន",
      "subtitle": "ការពារការបញ្ជូនទិន្នន័យមិនពេញលេញ នៅពេលកម្មវិធីត្រូវការទិន្នន័យចាំបាច់ច្រើនប្រអប់។",
      "content": `<div class="card">
            <h3 class="card-title">បញ្ហាប្រឈមជាក់ស្តែងក្នុងរោងចក្រ</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1rem;">
              នៅរោងចក្រ Apex Plastics សំណើសុំជំនួយត្រូវការ <strong>ទាំងពីរ</strong> គឺផ្នែក និងការពណ៌នា។ បើបុគ្គលិកវាយតែឈ្មោះផ្នែក តែទុកការពណ៌នាចោល សំបុត្រនោះនៅតែឥតប្រយោជន៍ដដែល!
            </p>

            <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 0.65rem; padding: 1rem; margin-bottom: 1rem;">
              <strong style="color: #fbbf24; font-size: 0.95rem;">វិធានការងារ (Business Rule)៖</strong>
              <p style="color: var(--text-main); font-size: 0.88rem; margin-top: 0.35rem;">
                <em>"ប្រសិនបើផ្នែកនៅទទេ <strong>ឬ (OR)</strong> ការពណ៌នានៅទទេ ត្រូវតែបញ្ឈប់ការបញ្ជូនជាបន្ទាន់!"</em>
              </p>
            </div>

            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              នៅក្នុង Power Fx សញ្ញា "ឬ" (Logical OR) ត្រូវបានសរសេរជាសញ្ញាបន្ទាត់ឈរពីរ៖ <code>||</code> (ចុច <kbd>Shift</kbd> + សញ្ញា <kbd>\\</kbd> លើក្តារចុច)។
            </p>
          </div>

          <div class="card">
            <h3 class="card-title">រូបមន្តការពារវាលច្រើនបញ្ចូលគ្នា</h3>
            
            <div style="background: #070a12; border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 0.75rem; padding: 1.15rem; font-family: var(--font-code); font-size: 0.88rem; line-height: 1.65; margin-bottom: 1rem;">
              <span style="color: #60a5fa;">If</span>(<br>
              &nbsp;&nbsp;<span style="color: #fbbf24;">IsBlank(txtDept.Text)</span> <span style="color: #f43f5e; font-weight: bold;">||</span> <span style="color: #fbbf24;">IsBlank(txtDescription.Text)</span>,<br>
              &nbsp;&nbsp;<span style="color: #fca5a5;">Notify("ត្រូវតែបំពេញទាំងផ្នែក និងការពណ៌នា!", NotificationType.Error)</span>,<br>
              &nbsp;&nbsp;<span style="color: #86efac;">Notify("ទិន្នន័យត្រឹមត្រូវ! កំពុងបញ្ជូនសំបុត្រ...", NotificationType.Success)</span><br>
              )
            </div>

            <div style="background: rgba(15, 23, 42, 0.7); border-radius: 0.65rem; padding: 0.85rem; border: 1px solid var(--border-subtle);">
              <strong style="color: #67e8f9; font-size: 0.85rem;">របៀបដែល Power Apps គណនារូបមន្តនេះ៖</strong>
              <ul style="color: var(--text-muted); font-size: 0.82rem; padding-left: 1.2rem; margin-top: 0.35rem; line-height: 1.6;">
                <li>បើ Dept នៅទទេ &rarr; លក្ខខណ្ឌសរុបគឺ <strong>True</strong> &rarr; បង្ហាញ Error។</li>
                <li>បើ Desc នៅទទេ &rarr; លក្ខខណ្ឌសរុបគឺ <strong>True</strong> &rarr; បង្ហាញ Error។</li>
                <li>លុះត្រាតែប្រអប់ <strong>ទាំងពីរមានអក្សរ</strong> ទើបវាចេញ <strong>False</strong> &rarr; ដំណើរការ Success!</li>
              </ul>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>បង្ហាញទីតាំងសញ្ញា <code>|</code> លើក្តារចុចជូនសិស្ស។ កុំឱ្យពួកគេច្រឡំជាមួយអក្សរ I ឬសញ្ញាឧទាន !។</p>`
    },

    // Slide 13: Interactive Widget 1: Circuit Inspector
    {
      "title": "ឧបករណ៍អន្តរកម្មទី ១៖ ឧបករណ៍ពិនិត្យសៀគ្វីសម្រេចចិត្ត",
      "segment": "ផ្នែកទី ៤ &bull; សៀគ្វីអន្តរកម្ម",
      "subtitle": "ជ្រើសរើសស្ថានភាពទិន្នន័យផ្សេងៗគ្នា ដើម្បីមើលការគណនាសៀគ្វី Power Fx ផ្ទាល់ភ្នែក។",
      "content": `<div class="widget-stage">
            <div class="inspector-menu">
              <div class="inspector-tab active" data-scenario="empty-both" onclick="selectInspectorScenario('empty-both')">
                <span style="font-size: 1.2rem; color: #ef4444;">&cross;</span>
                <div>
                  <strong style="font-size: 0.88rem; color: var(--text-main);">ករណីទី ១៖ ទទេទាំងពីរ</strong>
                  <p style="font-size: 0.75rem; color: var(--text-muted); margin: 0;">Dept: "" | Desc: ""</p>
                </div>
              </div>

              <div class="inspector-tab" data-scenario="dept-only" onclick="selectInspectorScenario('dept-only')">
                <span style="font-size: 1.2rem; color: #f59e0b;">&excl;</span>
                <div>
                  <strong style="font-size: 0.88rem; color: var(--text-main);">ករណីទី ២៖ ខ្វះពណ៌នា</strong>
                  <p style="font-size: 0.75rem; color: var(--text-muted); margin: 0;">Dept: "Molding" | Desc: ""</p>
                </div>
              </div>

              <div class="inspector-tab" data-scenario="desc-only" onclick="selectInspectorScenario('desc-only')">
                <span style="font-size: 1.2rem; color: #f59e0b;">&excl;</span>
                <div>
                  <strong style="font-size: 0.88rem; color: var(--text-main);">ករណីទី ៣៖ ខ្វះឈ្មោះផ្នែក</strong>
                  <p style="font-size: 0.75rem; color: var(--text-muted); margin: 0;">Dept: "" | Desc: "Oil leak"</p>
                </div>
              </div>

              <div class="inspector-tab" data-scenario="both-valid" onclick="selectInspectorScenario('both-valid')">
                <span style="font-size: 1.2rem; color: #10b981;">&check;</span>
                <div>
                  <strong style="font-size: 0.88rem; color: var(--text-main);">ករណីទី ៤៖ បំពេញគ្រប់ទាំងពីរ</strong>
                  <p style="font-size: 0.75rem; color: var(--text-muted); margin: 0;">Dept: "Molding" | Desc: "Leak"</p>
                </div>
              </div>
            </div>

            <div class="inspector-display" id="inspector-display-panel">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                <h4 style="color: var(--color-cyan); margin: 0;" id="circuit-scenario-title">ករណីទី ១៖ ប្រអប់ទាំងពីរនៅទទេស្អាត</h4>
                <span class="card-badge" id="circuit-outcome-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">ទ្វារបិទ៖ ការបញ្ជូនត្រូវរារាំង</span>
              </div>

              <div style="background: #070a12; border-radius: 0.65rem; padding: 1.15rem; font-family: var(--font-code); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.2rem;" id="circuit-code-box">
                <span style="color: #60a5fa;">If</span>(<br>
                &nbsp;&nbsp;<span id="eval-dept" style="background: rgba(239, 68, 68, 0.3); color: #fca5a5; padding: 2px 6px; border-radius: 4px;">IsBlank(txtDept.Text) &rarr; TRUE</span><br>
                &nbsp;&nbsp;<span style="color: #f43f5e; font-weight: bold;">||</span> <span id="eval-desc" style="background: rgba(239, 68, 68, 0.3); color: #fca5a5; padding: 2px 6px; border-radius: 4px;">IsBlank(txtDescription.Text) &rarr; TRUE</span>,<br>
                &nbsp;&nbsp;<span id="eval-action-true" style="color: #f87171; font-weight: bold; text-decoration: underline;">Notify("ត្រូវតែបំពេញទាំងពីរ!", Error) &larr; [កំពុងដំណើរការ]</span>,<br>
                &nbsp;&nbsp;<span id="eval-action-false" style="color: #475569; opacity: 0.4;">Notify("ជោគជ័យ!", Success) [រំលងចោល]</span><br>
                )
              </div>

              <div id="circuit-simulated-toast" class="toast-sim-banner toast-error">
                <span>&cross;</span>
                <span id="circuit-toast-text">ត្រូវតែបំពេញទាំងឈ្មោះផ្នែក និងការពណ៌នាជាដាច់ខាត!</span>
              </div>

              <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: auto; line-height: 1.6;" id="circuit-explanation-text">
                ដោយសារប្រអប់ទាំងពីរនៅទទេ <code>IsBlank()</code> ផ្តល់តម្លៃ True ទាំងសងខាង។ លក្ខខណ្ឌ OR បញ្ជាក់ថាពិត ធ្វើឱ្យកូដដំណើរការផ្នែក Error និងការពារ SharePoint។
              </p>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>ចុចឆ្លាស់គ្នារវាងករណីទាំង ៤។ បង្ហាញសិស្សឱ្យឃើញថា នៅករណីទី ៤ ពេលប្រអប់ទាំងពីរមានអក្សរ ទើបវាចេញ False ហើយរត់ចូលផ្លូវជោគជ័យ។</p>`
    },

    // Slide 14: Trainer Demonstration
    {
      "title": "ការបង្ហាញផ្ទាល់ពីគ្រូ៖ ការដំឡើងកូដលើប៊ូតុង Submit",
      "segment": "ផ្នែកទី ៥ &bull; ការបង្ហាញផ្ទាល់ពីគ្រូ",
      "subtitle": "ទស្សនាការអនុវត្តជាក់ស្តែងជំហានម្តងមួយៗ ក្នុងការសរសេររូបមន្តលើ OnSelect ក្នុង Power Apps Studio។",
      "content": `<div class="card">
            <h3 class="card-title">៥ ជំហាននៃការបង្ហាញផ្ទាល់</h3>

            <div style="display: flex; flex-direction: column; gap: 0.8rem;">
              <div style="display: flex; gap: 0.85rem; align-items: flex-start;">
                <span class="obj-num">1</span>
                <div>
                  <strong style="color: var(--text-main); font-size: 0.9rem;">ជ្រើសរើស <code>btnSubmit</code> ក្នុង Tree View៖</strong>
                  <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.15rem 0 0 0;">ធានាថាប៊ូតុងត្រូវបានជ្រើសរើសលើផ្ទាំង Canvas ឬក្នុងបញ្ជី Tree view ខាងឆ្វេង។</p>
                </div>
              </div>

              <div style="display: flex; gap: 0.85rem; align-items: flex-start;">
                <span class="obj-num">2</span>
                <div>
                  <strong style="color: var(--text-main); font-size: 0.9rem;">ប្តូរ Property ទៅជា <code>OnSelect</code>៖</strong>
                  <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.15rem 0 0 0;">ប្រើប្រអប់ជ្រើសរើស Property ខាងលើឆ្វេង ដើម្បីកំណត់សកម្មភាពពេលចុច។</p>
                </div>
              </div>

              <div style="display: flex; gap: 0.85rem; align-items: flex-start;">
                <span class="obj-num">3</span>
                <div>
                  <strong style="color: var(--text-main); font-size: 0.9rem;">សរសេររូបមន្តផ្ទៀងផ្ទាត់ទិន្នន័យ៖</strong>
                  <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.15rem 0 0 0;">សរសេររចនាសម្ព័ន្ធ <code>If(IsBlank(...), Notify(...), Notify(...))</code> យ៉ាងប្រុងប្រយ័ត្ន។</p>
                </div>
              </div>

              <div style="display: flex; gap: 0.85rem; align-items: flex-start;">
                <span class="obj-num">4</span>
                <div>
                  <strong style="color: var(--text-main); font-size: 0.9rem;">ចុច <kbd style="background: #1e293b; padding: 2px 6px; border-radius: 4px; border: 1px solid #475569;">Alt</kbd> ជាប់ដើម្បីធ្វើតេស្តផ្ទាល់៖</strong>
                  <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.15rem 0 0 0;">ចុចគ្រាប់ចុច Alt ជាប់ដើម្បីតេស្តចុចប៊ូតុងភ្លាមៗក្នុង Studio ដោយមិនបាច់ Play។</p>
                </div>
              </div>

              <div style="display: flex; gap: 0.85rem; align-items: flex-start;">
                <span class="obj-num">5</span>
                <div>
                  <strong style="color: var(--text-main); font-size: 0.9rem;">ផ្ទៀងផ្ទាត់សារ Toast Notification៖</strong>
                  <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.15rem 0 0 0;">តេស្តមើលពេលប្រអប់ទទេ (ចេញពណ៌ក្រហម) និងពេលបំពេញរួច (ចេញពណ៌បៃតង)។</p>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">ទិដ្ឋភាព Formula Bar ក្នុង Studio</h3>

            <div style="background: #0f172a; border: 1px solid var(--border-subtle); border-radius: 0.75rem; padding: 1rem; margin-bottom: 1rem;">
              <div style="display: flex; align-items: center; gap: 0.75rem; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 0.5rem; margin-bottom: 0.75rem;">
                <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-cyan);">Property:</span>
                <span style="font-family: var(--font-code); font-size: 0.85rem; color: #93c5fd;">OnSelect</span>
              </div>
              <pre style="margin: 0; font-family: var(--font-code); font-size: 0.85rem; color: #e2e8f0; line-height: 1.6;"><code>If(
  IsBlank(txtDescription.Text),
  Notify(
    "សូមបញ្ចូលការពណ៌នាបញ្ហាមុនពេល Submit!",
    NotificationType.Error
  ),
  Notify(
    "សំបុត្រត្រូវបានបញ្ជូនដោយជោគជ័យ!",
    NotificationType.Success
  )
)</code></pre>
            </div>

            <div style="background: rgba(59, 130, 246, 0.1); border-radius: 0.5rem; padding: 0.75rem; border: 1px solid rgba(59, 130, 246, 0.25);">
              <strong style="color: #93c5fd; font-size: 0.85rem;">គន្លឹះពិសេសពីគ្រូ៖</strong>
              <p style="color: var(--text-muted); font-size: 0.8rem; margin: 0.2rem 0 0 0;">
                ចុច <kbd style="background: #0f172a; padding: 1px 4px; border-radius: 3px;">Shift + Enter</kbd> ក្នុង Formula Bar ដើម្បីចុះបន្ទាត់ថ្មី។ ការសរសេរចុះបន្ទាត់ស្អាត ជួយការពារកុំឱ្យច្រឡំសញ្ញាវង់ក្រចក!
              </p>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>បង្ហាញការប្រើប្រាស់គ្រាប់ចុច Alt ផ្ទាល់ដើម្បីតេស្តលើ Canvas។ ចុចប៊ូតុងដោយទុកប្រអប់ទទេ ដើម្បីឱ្យសិស្សឃើញសារ Error ពណ៌ក្រហមពិតប្រាកដ។</p>`
    },

    // Slide 15: Guided Practice
    {
      "title": "ការអនុវត្តរួមគ្នា៖ ការកសាងខែលការពារវាលទិន្នន័យពីរ",
      "segment": "ផ្នែកទី ៥ &bull; អនុវត្តរួមគ្នា",
      "subtitle": "ឥឡូវនេះ សូមបើក Power Apps Canvas របស់អ្នក ហើយអនុវត្តតាមគ្រូជំហានម្តងមួយៗ។",
      "content": `<div class="card">
            <h3 class="card-title">សេចក្តីណែនាំអំពីកិច្ចការ</h3>
            <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin-bottom: 1rem;">
              អ្នកនឹងបន្ថែមខែលការពារវាលទិន្នន័យពីរ ទៅលើទម្រង់ស្នើសុំជួសជុលរបស់រោងចក្រ Apex Plastics៖
            </p>

            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <div style="background: rgba(15, 23, 42, 0.7); padding: 0.75rem; border-radius: 0.5rem; border: 1px solid var(--border-subtle);">
                <strong style="color: var(--text-main); font-size: 0.88rem;">ជំហានទី ១៖ ពិនិត្យឈ្មោះ Controls</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.15rem 0 0 0;">ធានាថាប្រអប់ផ្នែកមានឈ្មោះ <code>txtDept</code> ហើយប្រអប់ពណ៌នាមានឈ្មោះ <code>txtDesc</code>។</p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.7); padding: 0.75rem; border-radius: 0.5rem; border: 1px solid var(--border-subtle);">
                <strong style="color: var(--text-main); font-size: 0.88rem;">ជំហានទី ២៖ បើក Property OnSelect</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.15rem 0 0 0;">ជ្រើសរើសប៊ូតុង Submit របស់អ្នក ហើយរុករកទៅកាន់ Property <code>OnSelect</code> របស់វា។</p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.7); padding: 0.75rem; border-radius: 0.5rem; border: 1px solid var(--border-subtle);">
                <strong style="color: var(--text-main); font-size: 0.88rem;">ជំហានទី ៣៖ បញ្ចូលខែលការពារទ្វេដង</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.15rem 0 0 0;">ប្រើប្រាស់សញ្ញា OR <code>||</code> ដើម្បីត្រួតពិនិត្យប្រអប់ទាំងពីរ។</p>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">រូបមន្តគោលដៅដែលត្រូវសរសេរ</h3>

            <div style="background: #070a12; border: 1px solid rgba(59, 130, 246, 0.35); border-radius: 0.75rem; padding: 1.15rem; font-family: var(--font-code); font-size: 0.85rem; line-height: 1.65; margin-bottom: 1rem;">
              <span style="color: #60a5fa;">If</span>(<br>
              &nbsp;&nbsp;<span style="color: #fbbf24;">IsBlank(txtDept.Text)</span> <span style="color: #f43f5e; font-weight: bold;">||</span> <span style="color: #fbbf24;">IsBlank(txtDesc.Text)</span>,<br>
              &nbsp;&nbsp;<span style="color: #fca5a5;">Notify(</span><br>
              &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #fdba74;">"ខ្វះព័ត៌មានចាំបាច់! សូមពិនិត្យផ្នែក និងការពណ៌នា។"</span>,<br>
              &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ef4444;">NotificationType.Error</span><br>
              &nbsp;&nbsp;<span style="color: #fca5a5;">)</span>,<br>
              &nbsp;&nbsp;<span style="color: #86efac;">Notify(</span><br>
              &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a7f3d0;">"ព័ត៌មានត្រឹមត្រូវ! សំបុត្រត្រូវបានផ្ញើជូនក្រុមជាង។"</span>,<br>
              &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #10b981;">NotificationType.Success</span><br>
              &nbsp;&nbsp;<span style="color: #86efac;">)</span><br>
              )
            </div>

            <div style="background: rgba(16, 185, 129, 0.1); border-radius: 0.5rem; padding: 0.75rem; border: 1px solid rgba(16, 185, 129, 0.25);">
              <strong style="color: #86efac; font-size: 0.85rem;">បញ្ជីផ្ទៀងផ្ទាត់ភាពជោគជ័យ៖</strong>
              <p style="color: var(--text-muted); font-size: 0.8rem; margin: 0.2rem 0 0 0;">
                តើសារក្រហមបង្ហាញទេពេលខ្វះប្រអប់ណាមួយ? ហើយសារបៃតងបង្ហាញតែពេលបំពេញពេញលេញមែនទេ? បើត្រូវ សូមលើកមេដៃបញ្ជាក់!
              </p>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>ទុកពេល ៥-៧ នាទីឱ្យសិស្សអនុវត្ត។ ជួយសិស្សណាដែលភ្លេចវាយ <code>.Text</code> (សរសេរតែ txtDept)។</p>`
    },

    // Slide 16: Interactive Widget 2: Live Form Lab
    {
      "title": "ឧបករណ៍អន្តរកម្មទី ២៖ បន្ទប់ពិសោធន៍ផ្ទៀងផ្ទាត់ទម្រង់ផ្ទាល់",
      "segment": "ផ្នែកទី ៦ &bull; បន្ទប់ពិសោធន៍អន្តរកម្ម",
      "subtitle": "ទទួលបទពិសោធន៍ផ្ទាល់នៃទម្រង់ Power Apps ជាមួយកម្មវិធីត្រាប់តាមជាក់ស្តែងនៅក្នុងមេរៀននេះ។",
      "content": `<div class="card">
            <h3 class="card-title">ទម្រង់ស្នើសុំជំនួយ Apex Plastics</h3>

            <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 0.5rem;">
              <div>
                <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.35rem;">
                  ឈ្មោះផ្នែក (Department)៖ <span style="color: #ef4444;">*</span>
                </label>
                <input type="text" id="sim-input-dept" class="sample-input-control" placeholder="ឧ. ខ្សែសង្វាក់ចាក់ពុម្ពទី ៣" oninput="updateSimForm()">
              </div>

              <div>
                <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.35rem;">
                  ការពណ៌នាអំពីបញ្ហា (Description)៖ <span style="color: #ef4444;">*</span>
                </label>
                <textarea id="sim-input-desc" class="sample-input-control" rows="3" placeholder="រៀបរាប់អំពីការខូចខាត ឬតម្រូវការជួសជុល..." oninput="updateSimForm()"></textarea>
              </div>

              <div style="display: flex; gap: 0.75rem; margin-top: 0.5rem;">
                <button type="button" id="sim-btn-submit" class="sample-button-control" onclick="simulateFormSubmit()" style="flex: 1;">
                  បញ្ជូនសំណើ (OnSelect)
                </button>
                <button type="button" class="hud-btn" onclick="clearSimForm()" style="padding: 0.75rem 1rem;">
                  សម្អាតទម្រង់
                </button>
              </div>
            </div>
          </div>

          <div class="card" style="position: relative; overflow: hidden; background: #070a12;">
            <h3 class="card-title" style="color: var(--color-cyan);">លទ្ធផលអេក្រង់ត្រាប់តាម Power Apps</h3>

            <div id="sim-toast-banner" class="toast-sim-banner toast-info" style="display: none;">
              <span id="sim-toast-icon">&starf;</span>
              <span id="sim-toast-msg">ត្រៀមខ្លួនសម្រាប់ការធ្វើតេស្ត</span>
            </div>

            <div style="background: rgba(15, 23, 42, 0.85); border-radius: 0.65rem; padding: 1rem; border: 1px solid var(--border-subtle); margin-top: 0.5rem; flex: 1; display: flex; flex-direction: column;">
              <strong style="color: #93c5fd; font-size: 0.85rem;">កំណត់ត្រាដំណើរការរូបមន្ត (Telemetry)៖</strong>
              
              <div id="sim-telemetry-log" style="font-family: var(--font-code); font-size: 0.82rem; color: #cbd5e1; line-height: 1.6; margin-top: 0.5rem; flex: 1; overflow-y: auto;">
                <p style="color: var(--text-dim);">&bull; កំពុងរង់ចាំអ្នកប្រើប្រាស់ចុចប៊ូតុង Submit...</p>
              </div>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>អញ្ជើញសិស្សម្នាក់ឱ្យប្រាប់ពីទិន្នន័យដែលត្រូវវាយ។ សាកល្បងបំពេញតែឈ្មោះផ្នែក ហើយទុកការពណ៌នាទទេ រួចចុច Submit ដើម្បីឱ្យឃើញសារ Error។</p>`
    },

    // Slide 17: 5 Dangerous Misconceptions
    {
      "title": "ការយល់ច្រឡំគ្រោះថ្នាក់ ៥ យ៉ាង និងការពិតក្នុង Power Fx",
      "segment": "ផ្នែកទី ៦ &bull; កែតម្រូវការយល់ច្រឡំ",
      "subtitle": "ជៀសវាងអន្ទាក់ទូទៅទាំង ៥ នេះ មុនពេលវាធ្វើឱ្យខូចខាតទិន្នន័យជាក់ស្តែងក្នុងផលិតកម្ម។",
      "content": `<div class="card">
            <div style="display: flex; flex-direction: column; gap: 0.85rem;">
              <div style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; padding: 0.75rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5; font-size: 0.88rem;">ការយល់ច្រឡំទី ១៖ "Power Apps នឹងដឹងដោយស្វ័យប្រវត្តិកន្លែងណាដែលត្រូវបំពេញ។"</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.2rem 0 0 0;">
                  <strong>ការពិត៖</strong> មិនពិតទេ! Controls ធម្មតានឹងបញ្ជូនទិន្នន័យទទេចូល database ភ្លាម បើអ្នកមិនបានសរសេរកូដការពារវា។
                </p>
              </div>

              <div style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; padding: 0.75rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5; font-size: 0.88rem;">ការយល់ច្រឡំទី ២៖ "If() ត្រូវតែដាក់ = true នៅខាងចុង។"</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.2rem 0 0 0;">
                  <strong>ការពិត៖</strong> ការសរសេរ <code>If(IsBlank(txt.Text) = true, ...)</code> គឺជាន់គ្នាឥតប្រយោជន៍! <code>IsBlank()</code> ផ្តល់ true ឬ false ស្រាប់ហើយ។
                </p>
              </div>

              <div style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; padding: 0.75rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5; font-size: 0.88rem;">ការយល់ច្រឡំទី ៣៖ "Notify() ជួយរក្សាទុកទិន្នន័យក្នុង SharePoint។"</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.2rem 0 0 0;">
                  <strong>ការពិត៖</strong> <code>Notify()</code> គ្រាន់តែនិយាយជាមួយភ្នែកមនុស្សប៉ុណ្ណោះ! វាមិនបានសរសេរទិន្នន័យចូល storage សូម្បីតែមួយបៃ។
                </p>
              </div>
            </div>
          </div>

          <div class="card">
            <div style="display: flex; flex-direction: column; gap: 0.85rem;">
              <div style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; padding: 0.75rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5; font-size: 0.88rem;">ការយល់ច្រឡំទី ៤៖ "ត្រួតពិនិត្យប្រអប់មួយ គឺការពារប្រអប់ឯទៀតស្វ័យប្រវត្តិ។"</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.2rem 0 0 0;">
                  <strong>ការពិត៖</strong> បើអ្នកត្រួតពិនិត្យតែ <code>txtDept</code> នោះប្រអប់ Description ទទេនឹងជ្រៀតចូលបាន។ អ្នកត្រូវការពារគ្រប់ប្រអប់សំខាន់ៗ!
                </p>
              </div>

              <div style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; padding: 0.75rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5; font-size: 0.88rem;">ការយល់ច្រឡំទី ៥៖ "សារព្រមានគ្រាន់តែសរសេរថា 'Error!' ទៅបានហើយ។"</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.2rem 0 0 0;">
                  <strong>ការពិត៖</strong> សារព្រមានមិនច្បាស់លាស់ធ្វើឱ្យអ្នកប្រើធុញថប់។ សារល្អត្រូវប្រាប់ថា <em>ខ្វះអ្វី</em> និង <em>ត្រូវកែដូចម្តេច</em>។
                </p>
              </div>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>បញ្ជាក់ម្តងទៀតលើចំណុចទី ៣៖ កុំច្រឡំ <code>Notify()</code> ជាមួយ <code>SubmitForm()</code> ឬ <code>Patch()</code>។ Notify គ្រាន់តែជាឧបករណ៍បំពងសំឡេងប្រាប់មនុស្សប៉ុណ្ណោះ។</p>`
    },

    // Slide 18: Knowledge Check 1
    {
      "title": "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង៖ តើ IsBlank() ផ្តល់តម្លៃអ្វី?",
      "segment": "ផ្នែកទី ៧ &bull; សំណួរផ្ទៀងផ្ទាត់ ១ នៃ ៥",
      "subtitle": "សាកល្បងការយល់ដឹងជាមូលដ្ឋានរបស់អ្នកអំពីការវាយតម្លៃភាពពិត Boolean។",
      "content": `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ១</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                បុគ្គលិកមិនបានវាយបញ្ចូលអ្វីសោះទៅក្នុងប្រអប់ឈ្មោះ <code>txtIssue</code>។ តើរូបមន្ត <code>IsBlank(txtIssue.Text)</code> នឹងផ្តល់តម្លៃអ្វីមកវិញ?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'A', false, this)">
                  <strong>A.</strong> <span>ផ្តល់តម្លៃលេខ 0 (សូន្យ)</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'B', true, this)">
                  <strong>B.</strong> <span>ផ្តល់តម្លៃ <strong>true</strong></span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'C', false, this)">
                  <strong>C.</strong> <span>លោតកំហុស syntax ពណ៌ក្រហមគាំងកម្មវិធី</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'D', false, this)">
                  <strong>D.</strong> <span>ផ្តល់តម្លៃ false</span>
                </button>
              </div>
            </div>

            <div class="quiz-feedback" id="quiz-feedback-1">
              <div class="feedback-placeholder">
                <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.85rem auto; font-size: 1.5rem; color: #60a5fa;">
                  &quest;
                </div>
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd; margin-bottom: 0.65rem;">ស្ថានភាព ៖ កំពុងរង់ចាំចម្លើយ</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-bottom: 0.5rem;">ផ្ទាំងវិភាគស្ថាបត្យកម្មផ្ទាល់</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; max-width: 380px; margin: 0 auto;">
                  សូមជ្រើសរើសចម្លើយ (A, B, C ឬ D) ខាងឆ្វេង ដើម្បីផ្ទៀងផ្ទាត់ចំណេះដឹង និងមើលការពន្យល់ស្ថាបត្យកម្ម។
                </p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-1" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-1">ពូកែណាស់!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  ដោយសារប្រអប់បញ្ចូលទិន្នន័យនៅទទេ <code>IsBlank()</code> បញ្ជាក់ថាវាពិតជាទទេមែន ដោយផ្តល់តម្លៃត្រឡប់មកវិញជា <strong>true</strong>! តម្លៃ True នេះហើយដែលបញ្ជាផ្លូវដំបូងនៃអនុគមន៍ <code>If()</code>។
                </p>
              </div>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>បញ្ជាក់ឡើងវិញ៖ ប្រអប់ទិន្នន័យទទេ មិនមែនជាកំហុស syntax គាំងកូដទេ វាគ្រាន់តែជាស្ថានភាពមួយដែលផ្តល់តម្លៃ True។</p>`
    },

    // Slide 19: Knowledge Check 2 (Why)
    {
      "title": "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង៖ ហេតុអ្វីបានជា Notify() ចាំបាច់?",
      "segment": "ផ្នែកទី ៧ &bull; សំណួរផ្ទៀងផ្ទាត់ ២ នៃ ៥",
      "subtitle": "ការវាយតម្លៃសារៈសំខាន់នៃការឆ្លើយតបភ្លាមៗចំពោះចិត្តសាស្ត្រអ្នកប្រើប្រាស់។",
      "content": `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ២ &bull; សំណួរស្វែងយល់ហេតុផល 'Why'</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                ហេតុអ្វីបានជាអ្នកអភិវឌ្ឍន៍មិនគួរគ្រាន់តែបញ្ឈប់ប៊ូតុងស្ងាត់ៗ ដោយមិនបង្ហាញសារ <code>Notify()</code> នៅពេលផ្ទៀងផ្ទាត់មិនជាប់?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'A', false, this)">
                  <strong>A.</strong> <span>ដោយសារ Power Apps Studio មិនអនុញ្ញាតឱ្យ Save កម្មវិធី</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'B', false, this)">
                  <strong>B.</strong> <span>ដោយសារ SharePoint ទាមទារកូដ Notify ទើបព្រមទទួលទិន្នន័យ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'C', true, this)">
                  <strong>C.</strong> <span>បើគ្មានសារឆ្លើយតបទេ អ្នកប្រើប្រាស់នឹងគិតថាកម្មវិធីគាំង ឬ Save រួចហើយ ដែលនាំឱ្យចុចត្រួតច្រើនដង</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'D', false, this)">
                  <strong>D.</strong> <span>ដោយសារការមិនបង្ហាញសារធ្វើឱ្យទូរស័ព្ទឆាប់អស់ថ្ម</span>
                </button>
              </div>
            </div>

            <div class="quiz-feedback" id="quiz-feedback-2">
              <div class="feedback-placeholder">
                <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.85rem auto; font-size: 1.5rem; color: #60a5fa;">
                  &quest;
                </div>
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd; margin-bottom: 0.65rem;">ស្ថានភាព ៖ កំពុងរង់ចាំចម្លើយ</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-bottom: 0.5rem;">ផ្ទាំងវិភាគស្ថាបត្យកម្មផ្ទាល់</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; max-width: 380px; margin: 0 auto;">
                  សូមជ្រើសរើសចម្លើយ (A, B, C ឬ D) ខាងឆ្វេង ដើម្បីផ្ទៀងផ្ទាត់ចំណេះដឹង និងមើលការពន្យល់ស្ថាបត្យកម្ម។
                </p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-2" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-2">គោលការណ៍ UX ត្រឹមត្រូវ!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  <strong>គោលការណ៍ឆ្លើយតប (Feedback Principle)</strong> គឺសំខាន់បំផុត! បើអ្នកប្រើចុចប៊ូតុងហើយគ្មានប្រតិកម្មអ្វីសោះ ពួកគេនឹងចុច ៥ ដងទៀត ធុញថប់ ឬច្រឡំថាទិន្នន័យត្រូវបានរក្សាទុករួចរាល់។
                </p>
              </div>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>សង្កត់ធ្ងន់លើការយល់ចិត្តអ្នកប្រើប្រាស់។ កម្មករក្នុងរោងចក្រពាក់ស្រោមដៃ បើចុចហើយស្ងាត់ គេនឹងគិតថាកម្មវិធីខូចភ្លាម។</p>`
    },

    // Slide 20: Knowledge Check 3
    {
      "title": "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង៖ ផ្នែកសំខាន់ទាំង ៣ នៃ If()",
      "segment": "ផ្នែកទី ៧ &bull; សំណួរផ្ទៀងផ្ទាត់ ៣ នៃ ៥",
      "subtitle": "ផ្ទៀងផ្ទាត់ការចងចាំរចនាសម្ព័ន្ធរូបមន្តសម្រេចចិត្តក្នុង Power Fx។",
      "content": `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ៣</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                តើផ្នែកសំខាន់ទាំង ៣ នៃអនុគមន៍ <code>If()</code> មានលំដាប់លំដោយយ៉ាងដូចម្តេច?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'A', false, this)">
                  <strong>A.</strong> <span>សកម្មភាពបើពិត, សកម្មភាពបើមិនពិត, លក្ខខណ្ឌសំណួរ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'B', true, this)">
                  <strong>B.</strong> <span>លក្ខខណ្ឌសំណួរ (Condition), សកម្មភាពបើពិត, សកម្មភាពបើមិនពិត</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'C', false, this)">
                  <strong>C.</strong> <span>ឈ្មោះ Control, ឈ្មោះ Property, អត្ថបទរូបមន្ត</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'D', false, this)">
                  <strong>D.</strong> <span>អត្ថបទសារ, ប្រភេទសារ, រយៈពេលពន្យារពេល</span>
                </button>
              </div>
            </div>

            <div class="quiz-feedback" id="quiz-feedback-3">
              <div class="feedback-placeholder">
                <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.85rem auto; font-size: 1.5rem; color: #60a5fa;">
                  &quest;
                </div>
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd; margin-bottom: 0.65rem;">ស្ថានភាព ៖ កំពុងរង់ចាំចម្លើយ</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-bottom: 0.5rem;">ផ្ទាំងវិភាគស្ថាបត្យកម្មផ្ទាល់</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; max-width: 380px; margin: 0 auto;">
                  សូមជ្រើសរើសចម្លើយ (A, B, C ឬ D) ខាងឆ្វេង ដើម្បីផ្ទៀងផ្ទាត់ចំណេះដឹង និងមើលការពន្យល់ស្ថាបត្យកម្ម។
                </p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-3" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-3">ចាំរចនាសម្ព័ន្ធបានច្បាស់!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  តែងតែជា៖ <code>If( លក្ខខណ្ឌ , ធ្វើបើពិត , ធ្វើបើមិនពិត )</code>។ ផ្នែកទី ១ សួរសំណួរ; ផ្នែកទី ២ អនុវត្តបើលទ្ធផល True; ផ្នែកទី ៣ អនុវត្តបើលទ្ធផល False។
                </p>
              </div>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>រំលឹកចង្វាក់នៃការចងចាំ៖ សំណួរ, បើត្រូវ, បើខុស។</p>`
    },

    // Slide 21: Knowledge Check 4 (What Happens If)
    {
      "title": "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង៖ ចុះបើគ្មានផ្នែកទី ៣?",
      "segment": "ផ្នែកទី ៧ &bull; សំណួរផ្ទៀងផ្ទាត់ ៤ នៃ ៥",
      "subtitle": "ស្វែងយល់ពីអាកប្បកិរិយារបស់ Power Fx នៅពេលដែលអ្នកសរសេរតែសកម្មភាព True ប៉ុណ្ណោះ។",
      "content": `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ៤ &bull; សំណួរស្វែងយល់អាកប្បកិរិយា 'What Happens If'</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                អ្នកអភិវឌ្ឍន៍សរសេរ៖ <code>If(IsBlank(txtDept.Text), Notify("Dept required!", Error))</code> ដោយ <strong>គ្មានផ្នែកទី ៣</strong>។ តើមានអ្វីកើតឡើងពេលអ្នកប្រើប្រាស់ចុច Submit ហើយប្រអប់នោះមានអក្សរពេញលេញ?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'A', false, this)">
                  <strong>A.</strong> <span>Power Apps គាំង ហើយ log out អ្នកប្រើចេញ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'B', false, this)">
                  <strong>B.</strong> <span>នៅតែបង្ហាញ Error ដដែល ព្រោះគ្មានពាក្យ else</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'C', true, this)">
                  <strong>C.</strong> <span>គ្មានអ្វីកើតឡើងទេ; Power Fx បញ្ចប់ការងារដោយសុវត្ថិភាពដោយមិនធ្វើអ្វីឡើយ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'D', false, this)">
                  <strong>D.</strong> <span>កម្មវិធីលុបអក្សរក្នុងប្រអប់នោះចោលស្វ័យប្រវត្តិ</span>
                </button>
              </div>
            </div>

            <div class="quiz-feedback" id="quiz-feedback-4">
              <div class="feedback-placeholder">
                <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.85rem auto; font-size: 1.5rem; color: #60a5fa;">
                  &quest;
                </div>
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd; margin-bottom: 0.65rem;">ស្ថានភាព ៖ កំពុងរង់ចាំចម្លើយ</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-bottom: 0.5rem;">ផ្ទាំងវិភាគស្ថាបត្យកម្មផ្ទាល់</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; max-width: 380px; margin: 0 auto;">
                  សូមជ្រើសរើសចម្លើយ (A, B, C ឬ D) ខាងឆ្វេង ដើម្បីផ្ទៀងផ្ទាត់ចំណេះដឹង និងមើលការពន្យល់ស្ថាបត្យកម្ម។
                </p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-4" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-4">យល់ដឹងស៊ីជម្រៅ!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  ក្នុងរូបមន្តសកម្មភាព Power Fx ផ្នែកទី ៣ គឺមិនបង្ខំឡើយ! បើលក្ខខណ្ឌចេញ False ហើយអ្នកមិនបានដាក់សកម្មភាព False ទេនោះ Power Fx នឹងមិនធ្វើអ្វីទាំងអស់ដោយសុវត្ថិភាព។
                </p>
              </div>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>បញ្ជាក់ប្រាប់សិស្សថានៅមេរៀនក្រោយៗ យើងនឹងរៀនតសកម្មភាពជាបន្តបន្ទាប់ដោយប្រើសញ្ញាចុចក្បៀស <code>;</code>។</p>`
    },

    // Slide 22: Knowledge Check 5
    {
      "title": "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង៖ តើសញ្ញាណាសម្រាប់តភ្ជាប់លក្ខខណ្ឌ?",
      "segment": "ផ្នែកទី ៧ &bull; សំណួរផ្ទៀងផ្ទាត់ ៥ នៃ ៥",
      "subtitle": "ផ្ទៀងផ្ទាត់ការចងចាំរបស់អ្នកអំពីសញ្ញាប្រមាណវិធីតក្កវិជ្ជារួមគ្នា។",
      "content": `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ៥</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                តើអ្នកគួរប្រើសញ្ញាមួយណា ប្រសិនបើអ្នកចង់ឱ្យសារព្រមានដំណើរការពេល <em>ផ្នែកនៅទទេ</em> <strong>ឬ (OR)</strong> <em>ការពណ៌នានៅទទេ</em>?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(5, 'A', false, this)">
                  <strong>A.</strong> <span><code>&amp;&amp;</code> (និង / Logical AND)</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(5, 'B', true, this)">
                  <strong>B.</strong> <span><code>||</code> (ឬ / Logical OR)</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(5, 'C', false, this)">
                  <strong>C.</strong> <span><code>&amp;</code> (ផ្គុំអក្សរ / Concatenation)</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(5, 'D', false, this)">
                  <strong>D.</strong> <span><code>==</code> (ស្មើទ្វេដង)</span>
                </button>
              </div>
            </div>

            <div class="quiz-feedback" id="quiz-feedback-5">
              <div class="feedback-placeholder">
                <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.85rem auto; font-size: 1.5rem; color: #60a5fa;">
                  &quest;
                </div>
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd; margin-bottom: 0.65rem;">ស្ថានភាព ៖ កំពុងរង់ចាំចម្លើយ</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-bottom: 0.5rem;">ផ្ទាំងវិភាគស្ថាបត្យកម្មផ្ទាល់</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; max-width: 380px; margin: 0 auto;">
                  សូមជ្រើសរើសចម្លើយ (A, B, C ឬ D) ខាងឆ្វេង ដើម្បីផ្ទៀងផ្ទាត់ចំណេះដឹង និងមើលការពន្យល់ស្ថាបត្យកម្ម។
                </p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-5" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-5">សម្រេចជោគជ័យ ១០០%!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  សញ្ញាបន្ទាត់ឈរពីរ <code>||</code> គឺជាសញ្ញា Logical OR។ ប្រសិនបើប្រអប់ណាមួយនៅទទេ នោះសេចក្តីថ្លែងការណ៍ទាំងមូលនឹងក្លាយជា True ដែលបញ្ឈប់ការបញ្ជូនទិន្នន័យភ្លាម។
                </p>
              </div>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>អបអរសាទរសិស្សដែលបានឆ្លើយសំណួរទាំង ៥ បានត្រឹមត្រូវ។ រំលឹកពួកគេថានេះជាជំហានដ៏ធំមួយក្នុងការក្លាយជាស្ថាបត្យករកម្មវិធី។</p>`
    },

    // Slide 23: Capstone Challenge & Rubric
    {
      "title": "កិច្ចការប្រឡងបញ្ចប់៖ ទម្រង់កត់ត្រាការខូចម៉ាស៊ីនក្នុងរោងចក្រ",
      "segment": "ផ្នែកទី ៨ &bull; កិច្ចការប្រឡង &amp; រង្វាស់ពិន្ទុ",
      "subtitle": "បង្ហាញសមត្ថភាពរបស់អ្នកដោយបង្កើតខែលការពារពេញលេញ សម្រាប់ទម្រង់កត់ត្រាការខូចម៉ាស៊ីន Extruder។",
      "content": `<div class="card">
            <h3 class="card-title">សេចក្តីសង្ខេបបេសកកម្ម</h3>
            <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin-bottom: 0.75rem;">
              អ្នកត្រូវបានចាត់តាំងឱ្យបង្កើតរបាំងការពារការបញ្ជូនទិន្នន័យ សម្រាប់កំណត់ត្រាខូចម៉ាស៊ីន Extruder ខ្សែសង្វាក់ទី ៤ នៅរោងចក្រ Apex Plastics។
            </p>

            <div style="background: rgba(15, 23, 42, 0.7); border-radius: 0.5rem; padding: 0.85rem; border: 1px solid var(--border-subtle); margin-bottom: 0.75rem;">
              <strong style="color: var(--color-cyan); font-size: 0.88rem;">លក្ខខណ្ឌតម្រូវ៖</strong>
              <ul style="color: var(--text-muted); font-size: 0.82rem; padding-left: 1.2rem; margin-top: 0.35rem; line-height: 1.6;">
                <li>ផ្ទៀងផ្ទាត់វាលពីរ៖ <code>txtMachineId</code> និង <code>txtMinutesDown</code>។</li>
                <li>បើខ្វះប្រអប់ណាមួយ បង្ហាញ Error៖ <em>"ត្រូវតែបញ្ចូលលេខកូដម៉ាស៊ីន និងចំនួននាទីដែលខូច!"</em></li>
                <li>បើបំពេញគ្រប់ទាំងពីរ បង្ហាញ Success៖ <em>"កំណត់ត្រាខូចម៉ាស៊ីនត្រូវបានកត់ត្រាជោគជ័យ!"</em></li>
              </ul>
            </div>

            <div style="background: rgba(245, 158, 11, 0.1); border-radius: 0.5rem; padding: 0.75rem; border: 1px solid rgba(245, 158, 11, 0.25);">
              <strong style="color: #fbbf24; font-size: 0.85rem;">កិច្ចការផ្ទះស្រេចចិត្ត (&le; ១៥ នាទី)៖</strong>
              <p style="color: var(--text-muted); font-size: 0.8rem; margin: 0.2rem 0 0 0;">
                បន្ថែមលក្ខខណ្ឌទីពីរ៖ ចុះបើបុគ្គលិកវាយនាទីជាលេខអវិជ្ជមាន? ប្រើ <code>Value(txtMinutesDown.Text) &lt;= 0</code> ដើម្បីការពារកុំឱ្យមាននាទីអវិជ្ជមាន!
              </p>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">តារាងរង្វាស់វាយតម្លៃ ១០០ ពិន្ទុ (Rubric)</h3>
            
            <table style="width: 100%; font-size: 0.82rem; border-collapse: collapse; margin-top: 0.25rem;">
              <thead>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.15); text-align: left; color: #93c5fd;">
                  <th style="padding: 0.5rem 0.25rem;">លក្ខណៈវិនិច្ឆ័យ</th>
                  <th style="padding: 0.5rem 0.25rem;">ពិន្ទុ</th>
                  <th style="padding: 0.5rem 0.25rem;">ស្តង់ដាររំពឹងទុក</th>
                </tr>
              </thead>
              <tbody style="color: var(--text-muted); line-height: 1.5;">
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
                  <td style="padding: 0.5rem 0.25rem; color: var(--text-main); font-weight: 600;">ភាពត្រឹមត្រូវនៃលក្ខខណ្ឌ</td>
                  <td style="padding: 0.5rem 0.25rem; font-family: var(--font-code); color: var(--color-cyan);">៣០ ពិន្ទុ</td>
                  <td style="padding: 0.5rem 0.25rem;">ប្រើប្រាស់ <code>IsBlank()</code> ជាមួយសញ្ញា <code>||</code> ត្រឹមត្រូវលើ controls ទាំងពីរ។</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
                  <td style="padding: 0.5rem 0.25rem; color: var(--text-main); font-weight: 600;">រចនាសម្ព័ន្ធ If()</td>
                  <td style="padding: 0.5rem 0.25rem; font-family: var(--font-code); color: var(--color-cyan);">៣០ ពិន្ទុ</td>
                  <td style="padding: 0.5rem 0.25rem;">មានទាំង ៣ ផ្នែកខណ្ឌដោយសញ្ញាក្បៀស និងបិទវង់ក្រចកត្រឹមត្រូវ។</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
                  <td style="padding: 0.5rem 0.25rem; color: var(--text-main); font-weight: 600;">ការឆ្លើយតបតាម Notify</td>
                  <td style="padding: 0.5rem 0.25rem; font-family: var(--font-code); color: var(--color-cyan);">២០ ពិន្ទុ</td>
                  <td style="padding: 0.5rem 0.25rem;">ចេញ Error ពេលខ្វះទិន្នន័យ; ចេញ Success ពេលត្រឹមត្រូវ។ អត្ថបទក្នុងសម្រង់។</td>
                </tr>
                <tr>
                  <td style="padding: 0.5rem 0.25rem; color: var(--text-main); font-weight: 600;">ការធ្វើតេស្តលើ Canvas</td>
                  <td style="padding: 0.5rem 0.25rem; font-family: var(--font-code); color: var(--color-cyan);">២០ ពិន្ទុ</td>
                  <td style="padding: 0.5rem 0.25rem;">បានផ្ទៀងផ្ទាត់ផ្ទាល់ក្នុង Canvas Studio ដោយចុច <kbd>Alt</kbd> គ្រប់ករណី។</td>
                </tr>
              </tbody>
            </table>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>ពន្យល់ពីតារាងពិន្ទុឱ្យបានច្បាស់លាស់។ សិស្សអាចផ្ទៀងផ្ទាត់កូដរបស់ខ្លួនធៀបនឹងតារាងនេះ មុនពេលបញ្ចប់ការអនុវត្ត។</p>`
    },

    // Slide 24: Connection Map & Bridge Forward
    {
      "title": "ផែនទីតភ្ជាប់កម្មវិធីសិក្សា៖ អតីតកាល បច្ចុប្បន្នកាល និងអនាគតកាល",
      "segment": "ផ្នែកទី ៨ &bull; ស្ពានតភ្ជាប់ទៅមុខ",
      "subtitle": "កន្លែងដែលយើងបានឆ្លងកាត់ អ្វីដែលយើងបានយកឈ្នះថ្ងៃនេះ និងដំណើរឆ្ពោះទៅកាន់ថ្ងៃស្អែក។",
      "content": `<div class="card">
            <div class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">អតីតកាល (ថ្ងៃ ៤-៦ &amp; ១៦)</div>
            <h3 class="card-title">គ្រឹះដែលបានកសាង</h3>
            <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin-bottom: 0.75rem;">
              អ្នកបានស្ទាត់ជំនាញទ្រឹស្តីលក្ខខណ្ឌ Boolean (True/False) និងបានតភ្ជាប់ Properties ដើម្បីឱ្យ controls គណនាតម្លៃរស់រវើក។
            </p>
            <ul style="color: var(--text-muted); font-size: 0.82rem; padding-left: 1.2rem; line-height: 1.6;">
              <li>សំណួរតក្កវិជ្ជា True/False។</li>
              <li>សញ្ញាចុច៖ <code>Control.Property</code>។</li>
              <li>ភាពរស់រវើកដូច Excel។</li>
            </ul>
          </div>

          <div class="card" style="border-color: var(--color-cyan); box-shadow: 0 0 25px rgba(6, 182, 212, 0.2);">
            <div class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">បច្ចុប្បន្ន (ថ្ងៃ ១៧ ថ្ងៃនេះ)</div>
            <h3 class="card-title">ឆ្មាំការពារទិន្នន័យ</h3>
            <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin-bottom: 0.75rem;">
              អ្នកបានរួមបញ្ចូលតក្កវិជ្ជាជាមួយ Properties ផ្ទាល់ដៃ ដើម្បីបង្កើតរបាំងការពារទិន្នន័យមិនល្អ មុនពេល Submit។
            </p>
            <ul style="color: #67e8f9; font-size: 0.82rem; padding-left: 1.2rem; line-height: 1.6;">
              <li><code>IsBlank()</code> ត្រួតពិនិត្យភាពទទេស្អាត។</li>
              <li><code>If()</code> សម្រេចចិត្តបំបែកផ្លូវ ៣ ផ្នែក។</li>
              <li><code>Notify()</code> ឆ្លើយតបសារពណ៌អណ្តែតលើអេក្រង់។</li>
              <li>ការពារវាលទិន្នន័យច្រើនដោយប្រើ <code>||</code>។</li>
            </ul>
          </div>

          <div class="card" style="border-color: var(--color-purple); box-shadow: 0 0 25px rgba(139, 92, 246, 0.2);">
            <div class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c4b5fd;">បន្ទាប់៖ ថ្ងៃទី ១៨</div>
            <h3 class="card-title">ការចងចាំរបស់ App៖ អថេរ (Variables)</h3>
            <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin-bottom: 0.75rem;">
              ចុះបើកម្មវិធីរបស់អ្នកត្រូវការ ចងចាំ តម្លៃឆ្លងអេក្រង់ ឬរាប់ចំនួនដងដែលកំហុសកើតឡើង?
            </p>
            <ul style="color: #c4b5fd; font-size: 0.82rem; padding-left: 1.2rem; line-height: 1.6;">
              <li>ផ្តល់ខួរក្បាលចងចាំដល់កម្មវិធីរបស់អ្នក។</li>
              <li>Context Variables៖ <code>UpdateContext()</code>។</li>
              <li>Global Variables៖ <code>Set()</code>។</li>
              <li>ចងចាំស្ថានភាពអ្នកប្រើឆ្លងកាត់អេក្រង់ច្រើន!</li>
            </ul>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>ពាក្យបិទបញ្ចប់ (១ នាទី)៖</strong> "សូមអបអរសាទរចំពោះការបញ្ចប់ថ្ងៃទី ១៧! ថ្ងៃនេះអ្នកមិនមែនគ្រាន់តែជាអ្នកដាក់ប្រអប់លើអេក្រង់ទេ អ្នកបានក្លាយជាស្ថាបត្យករកម្មវិធីដែលចេះការពារទិន្នន័យសហគ្រាស។"</p>
<p><strong>ការណែនាំថ្ងៃស្អែក៖</strong> "ថ្ងៃស្អែកលើថ្ងៃទី ១៨ យើងនឹងផ្តល់ខួរក្បាលចងចាំដល់កម្មវិធីជាមួយ Variables។ ជួបគ្នាថ្ងៃស្អែក!"</p>`
    }
  ];

  // --------------------------------------------------------------------------
  // 2.5 ENGLISH TRAINER NOTES STORE (Decoupled from DOM - Strict Drawer Rendering)
  // --------------------------------------------------------------------------
  const ENGLISH_NOTES = [
    // Slide 1
    `<h4>Trainer Speaking Script & Pedagogical Cues:</h4>
<p><strong>Opening Hook (2 min):</strong> "Welcome back to Day 17! Yesterday on Day 16, your controls learned how to speak to each other like a living Excel spreadsheet. When you typed, labels recalculated instantly."</p>
<p><strong>Today's Core Transition:</strong> "Today, our controls learn how to THINK and MAKE DECISIONS. We reconnect the logic foundations from Days 4-6 (True/False and If) to real Power Apps actions. We will build an intelligent validation gatekeeper that prevents empty submissions from reaching our database."</p>
<p><strong>Connection Chain:</strong> Emphasize: <code>input &rarr; IsBlank/comparison &rarr; True/False &rarr; If &rarr; Notify/action</code>. Reassure absolute beginners: we never write code without asking a human question first!</p>`,

    // Slide 2
    `<h4>Trainer Speaking Script & Pedagogical Cues:</h4>
<p><strong>Set Clear Expectations:</strong> Walk through the 4 objectives. Emphasize that by minute 65, every student will have built a live validation circuit with their own hands.</p>
<p><strong>Pacing Tip:</strong> Keep the first two recall sections brisk (10 min). Save the lion's share of energy for the interactive demonstration and guided practice blocks.</p>`,

    // Slide 3
    `<h4>Trainer Speaking Script & Pedagogical Cues:</h4>
<p><strong>Reinforce Continuity:</strong> "Notice this is NOT a random topic. We are not learning 'Power Fx as coding syntax'. We are taking the True/False thinking you already mastered on Day 4, feeding it the live input values you connected on Day 16, and using it to protect real company data."</p>
<p><strong>Physical Gesture:</strong> Point to card 1 (brain), card 2 (eyes/ears), card 3 (the bodyguard at the door).</p>`,

    // Slide 4
    `<h4>Trainer Speaking Script & Pedagogical Cues:</h4>
<p><strong>Interactive Cold Calling:</strong> Ask for volunteers or click the cards one by one. Praise correct answers and connect them to today's work.</p>
<p><strong>Pedagogical Check:</strong> If any student hesitates on Question 1, remind them: "Computers are binary machines. They cannot navigate ambiguity. They need a crisp True or False."</p>`,

    // Slide 5
    `<h4>Trainer Speaking Script & Pedagogical Cues:</h4>
<p><strong>Emotional Engagement:</strong> Make this visceral for the students. "Imagine you are the on-duty engineer. Your phone buzzes with 'Critical Priority Incident Ticket #892'. You open it, and the description is completely blank! Who called you? What machine is smoking? You have no idea."</p>
<p><strong>The Developer's Responsibility:</strong> "As Power Apps creators, our job is not just to make pretty screens. Our primary job is to protect people and data from honest human mistakes. Validation is our armor."</p>`,

    // Slide 6
    `<h4>Trainer Speaking Script & Pedagogical Cues:</h4>
<p><strong>Trace with Laser Pointer:</strong> Turn on your laser (<kbd>P</kbd>) and physically trace from Step 1 &rarr; Step 2 &rarr; Step 3, then dramatically split your pointer down Branch A vs. Branch B.</p>
<p><strong>Emphasize Exclusivity:</strong> "Notice that the computer CANNOT take both branches. It is physically impossible. If Branch A executes, Branch B is dead. If Branch B executes, Branch A is dead. True or False picks one train track."</p>`,

    // Slide 7
    `<h4>Trainer Speaking Script & Pedagogical Cues:</h4>
<p><strong>Relatability:</strong> "Has anyone ever had an ATM reject their card? Did the ATM steal your money anyway? No! It safely stopped the transaction. That is exactly what we are programming today."</p>
<p><strong>Zero Coding Fear:</strong> Remind them that validation is not a software invention. Humans have used validation gatekeepers for thousands of years (passports at borders, tickets at cinemas, locks on doors).</p>`,

    // Slide 8
    `<h4>Trainer Speaking Script & Pedagogical Cues:</h4>
<p><strong>Emphasize the Golden Rule:</strong> "If you ever find yourself staring at an empty formula bar feeling stuck, take your hands off the keyboard. Say out loud in plain words: 'What am I asking?' Once you say it in words, the Power Fx formula writes itself."</p>`,

    // Slide 9
    `<h4>Trainer Speaking Script & Pedagogical Cues:</h4>
<p><strong>Deconstruct the Parentheses:</strong> "Why do we have parentheses <code>( )</code>? Think of them as an envelope or a magnifying glass. The function <code>IsBlank</code> is the detective. The parentheses hold the evidence you want the detective to examine."</p>
<p><strong>Zero Assumptions:</strong> Point out that <code>IsBlank</code> does NOT delete anything and does NOT show an error. It simply inspects and reports.</p>`,

    // Slide 10
    `<h4>Trainer Speaking Script & Pedagogical Cues:</h4>
<p><strong>The Comma Rule:</strong> "Notice the commas. In Power Fx, commas separate your instructions. The first comma means 'THEN DO THIS IF YES'. The second comma means 'OTHERWISE DO THIS IF NO'."</p>
<p><strong>Memorization Anchor:</strong> <code>If( Question , TrueAction , FalseAction )</code>. Have the class repeat this cadence together twice.</p>`,

    // Slide 11
    `<h4>Trainer Speaking Script & Pedagogical Cues:</h4>
<p><strong>UX Best Practice:</strong> "Notice why red vs green matters. If your validation fails and you show a blue or grey message, the user won't know they made a mistake. Red creates immediate cognitive clarity."</p>
<p><strong>Quotes Reminder:</strong> "Remember Day 16: raw text always lives inside double quotes <code>\"...\"</code>. If you forget quotes, Power Apps thinks your message is a control name!"</p>`,

    // Slide 12
    `<h4>Trainer Speaking Script & Pedagogical Cues:</h4>
<p><strong>Keyboard Tip:</strong> Show students where the pipe symbol <code>|</code> is located (Hold <kbd>Shift</kbd> + press the backslash key <kbd>\</kbd>). Beginners often confuse pipe <code>||</code> with capital letters <code>II</code> or exclamation marks <code>!!</code>.</p>
<p><strong>Logic Connection:</strong> Connect back to Day 6 Boolean operators (AND vs OR). Remind them that OR is inclusive: if either check fails, the alarm sounds.</p>`,

    // Slide 13
    `<h4>Trainer Speaking Script & Pedagogical Cues:</h4>
<p><strong>Click Through All 4 Scenarios:</strong> Click Scenario 1, then 2, then 3, then 4. Notice how the highlighted branch instantly changes color!</p>
<p><strong>Crucial Insight on Scenario 4:</strong> "Look at Scenario 4. Both fields have text. <code>IsBlank()</code> returns FALSE for Dept, and FALSE for Desc. False OR False is False. Therefore, the If engine bypasses the error entirely and runs the green success branch!"</p>`,

    // Slide 14
    `<h4>Trainer Speaking Script & Pedagogical Cues:</h4>
<p><strong>Demonstrate the Alt Key:</strong> "Show them how holding the <kbd>Alt</kbd> key lets you interact with controls instantly right inside the canvas editor. No need to preview or publish just to test validation!"</p>
<p><strong>Intentionally Trigger the Error:</strong> Click the button with the box empty. Let them see the real Power Apps red toast appear at the top.</p>`,

    // Slide 15
    `<h4>Trainer Speaking Script & Pedagogical Cues:</h4>
<p><strong>Circulate the Room (or Virtual Chat):</strong> Give students 5-7 minutes. Watch for students who type <code>txtDept</code> instead of <code>txtDept.Text</code>. Remind them: the control is the box; <code>.Text</code> is what's inside!</p>`,

    // Slide 16
    `<h4>Trainer Speaking Script & Pedagogical Cues:</h4>
<p><strong>Interactive Invitation:</strong> Invite a student to name an input combination. Type in just the Department, leave Description blank, and hit Submit. Observe the red toast and telemetry log!</p>
<p><strong>Praise Clean Design:</strong> Notice how clear visual feedback prevents operator frustration.</p>`,

    // Slide 17
    `<h4>Trainer Speaking Script & Pedagogical Cues:</h4>
<p><strong>Highlight Misconception 3:</strong> "Make sure students don't confuse <code>Notify()</code> with <code>SubmitForm()</code> or <code>Patch()</code>. Notify is a loudspeaker to talk to the user. It is not a database write command."</p>`,

    // Slide 18
    `<h4>Trainer Speaking Script & Pedagogical Cues:</h4>
<p><strong>Check Understanding:</strong> Make sure no one picked option C. Reiterate: an empty field is not a syntax crash; it is simply a valid state that evaluates to true.</p>`,

    // Slide 19
    `<h4>Trainer Speaking Script & Pedagogical Cues:</h4>
<p><strong>Emphasize UX Empathy:</strong> "Put yourself in the shoes of a factory worker wearing gloves. If you tap a button and nothing moves on screen, what do you think? 'The app is broken!' Notify prevents this immediately."</p>`,

    // Slide 20
    `<h4>Trainer Speaking Script & Pedagogical Cues:</h4>
<p><strong>Reinforce Cadence:</strong> Remind the class of our rhythm from Slide 10: Question, If Yes, If No.</p>`,

    // Slide 21
    `<h4>Trainer Speaking Script & Pedagogical Cues:</h4>
<p><strong>Previewing Action Chaining:</strong> Mention that in upcoming lessons, we will learn how to write <code>If(IsBlank(...), Notify(...); Exit())</code>. This question proves they understand how the computer parses omitted branches.</p>`,

    // Slide 22
    `<h4>Trainer Speaking Script & Pedagogical Cues:</h4>
<p><strong>Congratulate the Class:</strong> Celebrate completing all 5 knowledge checks. Highlight how far they have traveled from Day 1 to now understanding enterprise validation logic!</p>`,

    // Slide 23
    `<h4>Trainer Speaking Script & Pedagogical Cues:</h4>
<p><strong>Rubric Clarity:</strong> Explain that grading is objective. Each student can self-assess their formula against these 4 rows before submitting their practice work.</p>`,

    // Slide 24
    `<h4>Trainer Speaking Script & Pedagogical Cues:</h4>
<p><strong>Closing Words (1 min):</strong> "Congratulations on conquering Day 17! Today you stopped being someone who just places boxes on a screen. You became an application architect who protects enterprise data."</p>
<p><strong>Forward Tease:</strong> "Tomorrow on Day 18, we give our apps a BRAIN that can REMEMBER information with Variables. See you all tomorrow!"</p>`
  ];

  // --------------------------------------------------------------------------
  // 3. CAPTURE ENGLISH ORIGINAL CONTENT FOR SEAMLESS TOGGLING
  // --------------------------------------------------------------------------
  let ENGLISH_SLIDES = [];

  function captureEnglishOriginals() {
    ENGLISH_SLIDES = slides.map((slide, idx) => {
      const headerTitle = slide.querySelector('.slide-header h2') || slide.querySelector('.hero-title');
      const headerSubtitle = slide.querySelector('.slide-header .subtitle') || slide.querySelector('.hero-subtitle');
      const sectionTag = slide.querySelector('.section-tag') || slide.querySelector('.hero-badge');
      const contentEl = slide.querySelector('.slide-content');

      return {
        title: headerTitle ? headerTitle.innerHTML : (slide.dataset.title || ''),
        subtitle: headerSubtitle ? headerSubtitle.innerHTML : '',
        segment: sectionTag ? sectionTag.innerHTML : (slide.dataset.segment || ''),
        content: contentEl ? contentEl.innerHTML : '',
        notes: ENGLISH_NOTES[idx] || ''
      };
    });
  }

  // --------------------------------------------------------------------------
  // 4. NAVIGATION LOGIC
  // --------------------------------------------------------------------------
  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;

    slides[currentSlideIndex].classList.remove('active');
    currentSlideIndex = index;
    slides[currentSlideIndex].classList.add('active');

    updateProgress();
    if (isNotesOpen) updateNotesDrawer();
    updateOverviewActiveCard();
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

    const progressPercent = ((currentSlideIndex + 1) / totalSlides) * 100;
    if (progressBar) progressBar.style.width = `${progressPercent}%`;

    if (slideCounter) {
      slideCounter.textContent = isKhmerActive
        ? `ស្លាយ ${currentSlideIndex + 1} / ${totalSlides}`
        : `Slide ${currentSlideIndex + 1} / ${totalSlides}`;
    }
  }

  // --------------------------------------------------------------------------
  // 5. BILINGUAL TOGGLE ENGINE (100% Symmetrical 1-to-1 DOM Swapping)
  // --------------------------------------------------------------------------
  function toggleLanguage() {
    try { localStorage.setItem('powerapps_presentation_lang', !isKhmerActive ? 'km' : 'en'); } catch(e){}
    isKhmerActive = !isKhmerActive;
    const body = document.body;
    const langLabel = document.getElementById('lang-label');

    if (isKhmerActive) {
      body.classList.add('khmer-mode');
      if (langLabel) langLabel.textContent = 'EN';
    } else {
      body.classList.remove('khmer-mode');
      if (langLabel) langLabel.textContent = 'KH';
    }

    const dataSource = isKhmerActive ? KHMER_SLIDES : ENGLISH_SLIDES;

    slides.forEach((slide, idx) => {
      const data = dataSource[idx];
      if (!data) return;

      const headerTitle = slide.querySelector('.slide-header h2') || slide.querySelector('.hero-title');
      const headerSubtitle = slide.querySelector('.slide-header .subtitle') || slide.querySelector('.hero-subtitle');
      const sectionTag = slide.querySelector('.section-tag') || slide.querySelector('.hero-badge');
      const contentEl = slide.querySelector('.slide-content');

      if (headerTitle && data.title) headerTitle.innerHTML = data.title;
      if (headerSubtitle && data.subtitle) headerSubtitle.innerHTML = data.subtitle;
      if (sectionTag && data.segment) sectionTag.innerHTML = data.segment;
      if (contentEl && data.content) contentEl.innerHTML = data.content;
      // Trainer notes are decoupled from the slide canvas and strictly reside in #notes-drawer
    });

    updateProgress();
    if (isNotesOpen) updateNotesDrawer();
    bindInteractiveWidgets();
    if (isOverviewOpen) renderOverviewGrid();
  }

  // --------------------------------------------------------------------------
  // 6. 90-MINUTE COUNTDOWN TIMER
  // --------------------------------------------------------------------------
  function toggleTimer() {
    const timerDisplay = document.getElementById('timer-display');
    const btnTimer = document.getElementById('btn-timer');

    if (isTimerRunning) {
      clearInterval(timerInterval);
      isTimerRunning = false;
      if (btnTimer) btnTimer.classList.remove('active');
    } else {
      isTimerRunning = true;
      if (btnTimer) btnTimer.classList.add('active');
      timerInterval = setInterval(() => {
        if (remainingSeconds > 0) {
          remainingSeconds--;
          updateTimerDisplay();
        } else {
          clearInterval(timerInterval);
          isTimerRunning = false;
          if (btnTimer) btnTimer.classList.remove('active');
        }
      }, 1000);
    }
  }

  function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timer-display');
    if (!timerDisplay) return;

    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  // --------------------------------------------------------------------------
  // 7. PRESENTER LASER & SPOTLIGHT
  // --------------------------------------------------------------------------
  function toggleLaser() {
    isLaserActive = !isLaserActive;
    const laser = document.getElementById('presenter-laser');
    const btnLaser = document.getElementById('btn-laser');

    if (laser) laser.classList.toggle('active', isLaserActive);
    if (btnLaser) btnLaser.classList.toggle('active', isLaserActive);
  }

  function initPointerAndSpotlight() {
    const laser = document.getElementById('presenter-laser');
    const ripple = document.getElementById('pointer-ripple');
    const stage = document.getElementById('presentation-stage');

    window.addEventListener('mousemove', (e) => {
      if (stage) {
        stage.style.setProperty('--mouse-x', `${e.clientX}px`);
        stage.style.setProperty('--mouse-y', `${e.clientY}px`);
      }

      if (laser && isLaserActive) {
        laser.style.left = `${e.clientX}px`;
        laser.style.top = `${e.clientY}px`;
      }
    });

    window.addEventListener('click', (e) => {
      if (isLaserActive && ripple) {
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        ripple.classList.remove('rippling');
        void ripple.offsetWidth; // Trigger reflow
        ripple.classList.add('rippling');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 8. TRAINER NOTES DRAWER
  // --------------------------------------------------------------------------
  function toggleNotes() {
    isNotesOpen = !isNotesOpen;
    const drawer = document.getElementById('notes-drawer');
    const btnNotes = document.getElementById('btn-notes');

    if (drawer) drawer.classList.toggle('open', isNotesOpen);
    if (btnNotes) btnNotes.classList.toggle('active', isNotesOpen);
    if (isNotesOpen) updateNotesDrawer();
  }

  function updateNotesDrawer() {
    const notesSlideTitle = document.getElementById('notes-slide-title');
    const notesBody = document.getElementById('notes-body-content');
    if (!notesBody) return;

    if (notesSlideTitle) {
      notesSlideTitle.textContent = isKhmerActive
        ? `កំណត់សម្គាល់គ្រូបង្វឹក • ស្លាយទី ${currentSlideIndex + 1}`
        : `Trainer Notes • Slide ${currentSlideIndex + 1}`;
    }

    const dataSource = isKhmerActive ? KHMER_SLIDES : ENGLISH_SLIDES;
    const currentNotes = (dataSource[currentSlideIndex] && dataSource[currentSlideIndex].notes)
      ? dataSource[currentSlideIndex].notes
      : (ENGLISH_NOTES[currentSlideIndex] || '<p>No specific script notes for this slide.</p>');

    notesBody.innerHTML = currentNotes;
  }

  // --------------------------------------------------------------------------
  // 9. OVERVIEW GRID MODAL
  // --------------------------------------------------------------------------
  function toggleOverview() {
    isOverviewOpen = !isOverviewOpen;
    const modal = document.getElementById('overview-modal');
    const btnOverview = document.getElementById('btn-overview');

    if (modal) modal.classList.toggle('open', isOverviewOpen);
    if (btnOverview) btnOverview.classList.toggle('active', isOverviewOpen);
    if (isOverviewOpen) renderOverviewGrid();
  }

  function renderOverviewGrid() {
    const gridContainer = document.getElementById('overview-grid-container');
    if (!gridContainer) return;

    gridContainer.innerHTML = '';
    const dataSource = isKhmerActive ? KHMER_SLIDES : ENGLISH_SLIDES;

    slides.forEach((slide, idx) => {
      const data = dataSource[idx] || {};
      const card = document.createElement('div');
      card.className = `overview-card ${idx === currentSlideIndex ? 'active' : ''}`;
      card.onclick = () => {
        goToSlide(idx);
        toggleOverview();
      };

      card.innerHTML = `
        <span class="overview-card-num">${isKhmerActive ? `ស្លាយ ${idx + 1}` : `Slide ${idx + 1}`}</span>
        <span class="overview-card-title">${data.title || slide.dataset.title || `Slide ${idx + 1}`}</span>
      `;
      gridContainer.appendChild(card);
    });
  }

  function updateOverviewActiveCard() {
    const cards = document.querySelectorAll('.overview-card');
    cards.forEach((card, idx) => {
      card.classList.toggle('active', idx === currentSlideIndex);
    });
  }

  // --------------------------------------------------------------------------
  // 10. INTERACTIVE WIDGETS
  // --------------------------------------------------------------------------
  function bindInteractiveWidgets() {
    // Re-bind Slide 13 Inspector tab events
    const tabs = document.querySelectorAll('.inspector-tab');
    tabs.forEach(tab => {
      tab.onclick = () => {
        selectInspectorScenario(tab.dataset.scenario);
      };
    });

    // Re-bind Slide 16 live form simulation inputs
    const deptInput = document.getElementById('sim-input-dept');
    const descInput = document.getElementById('sim-input-desc');
    const submitBtn = document.getElementById('sim-btn-submit');

    if (deptInput) deptInput.oninput = window.updateSimForm;
    if (descInput) descInput.oninput = window.updateSimForm;
    if (submitBtn) submitBtn.onclick = window.simulateFormSubmit;
  }

  // WIDGET 1: Slide 13 Circuit Inspector Logic
  window.selectInspectorScenario = function (scenarioKey) {
    const tabs = document.querySelectorAll('.inspector-tab');
    tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.scenario === scenarioKey));

    const titleEl = document.getElementById('circuit-scenario-title');
    const badgeEl = document.getElementById('circuit-outcome-badge');
    const codeBox = document.getElementById('circuit-code-box');
    const toastBanner = document.getElementById('circuit-simulated-toast');
    const toastText = document.getElementById('circuit-toast-text');
    const explanationEl = document.getElementById('circuit-explanation-text');

    if (!titleEl || !badgeEl || !codeBox || !toastBanner || !toastText || !explanationEl) return;

    if (scenarioKey === 'empty-both') {
      titleEl.textContent = isKhmerActive ? "ករណីទី ១៖ ប្រអប់ទាំងពីរនៅទទេស្អាត" : "Scenario 1: Both Fields Completely Blank";
      badgeEl.textContent = isKhmerActive ? "ទ្វារបិទ៖ ការបញ្ជូនត្រូវរារាំង" : "GATE CLOSED: SUBMISSION BLOCKED";
      badgeEl.style.background = "rgba(239, 68, 68, 0.2)";
      badgeEl.style.color = "#fca5a5";

      codeBox.innerHTML = `
        <span style="color: #60a5fa;">If</span>(<br>
        &nbsp;&nbsp;<span style="background: rgba(239, 68, 68, 0.3); color: #fca5a5; padding: 2px 6px; border-radius: 4px;">IsBlank(txtDept.Text) &rarr; TRUE</span><br>
        &nbsp;&nbsp;<span style="color: #f43f5e; font-weight: bold;">||</span> <span style="background: rgba(239, 68, 68, 0.3); color: #fca5a5; padding: 2px 6px; border-radius: 4px;">IsBlank(txtDescription.Text) &rarr; TRUE</span>,<br>
        &nbsp;&nbsp;<span style="color: #f87171; font-weight: bold; text-decoration: underline;">Notify("Both fields required!", Error) &larr; [EXECUTING]</span>,<br>
        &nbsp;&nbsp;<span style="color: #475569; opacity: 0.4;">Notify("Success!", Success) [BYPASSED]</span><br>
        )
      `;

      toastBanner.className = "toast-sim-banner toast-error";
      toastBanner.querySelector('span:first-child').innerHTML = '&cross;';
      toastText.textContent = isKhmerActive ? "ត្រូវតែបំពេញទាំងឈ្មោះផ្នែក និងការពណ៌នាជាដាច់ខាត!" : "Both Department and Description are mandatory!";
      explanationEl.textContent = isKhmerActive
        ? "ដោយសារប្រអប់ទាំងពីរនៅទទេ IsBlank() ផ្តល់តម្លៃ True ទាំងសងខាង។ លក្ខខណ្ឌ OR បញ្ជាក់ថាពិត ធ្វើឱ្យកូដដំណើរការផ្នែក Error និងការពារ SharePoint។"
        : "Because both inputs are empty, IsBlank() returns True for both sides. The logical OR condition succeeds on the True branch, firing the red error toast and protecting SharePoint storage.";
    } 
    else if (scenarioKey === 'dept-only') {
      titleEl.textContent = isKhmerActive ? "ករណីទី ២៖ បំពេញផ្នែក តែខ្វះការពណ៌នា" : "Scenario 2: Department Filled, Description Blank";
      badgeEl.textContent = isKhmerActive ? "ទ្វារបិទ៖ ការបញ្ជូនត្រូវរារាំង" : "GATE CLOSED: SUBMISSION BLOCKED";
      badgeEl.style.background = "rgba(239, 68, 68, 0.2)";
      badgeEl.style.color = "#fca5a5";

      codeBox.innerHTML = `
        <span style="color: #60a5fa;">If</span>(<br>
        &nbsp;&nbsp;<span style="background: rgba(16, 185, 129, 0.25); color: #86efac; padding: 2px 6px; border-radius: 4px;">IsBlank(txtDept.Text) &rarr; FALSE</span><br>
        &nbsp;&nbsp;<span style="color: #f43f5e; font-weight: bold;">||</span> <span style="background: rgba(239, 68, 68, 0.3); color: #fca5a5; padding: 2px 6px; border-radius: 4px;">IsBlank(txtDescription.Text) &rarr; TRUE</span>,<br>
        &nbsp;&nbsp;<span style="color: #f87171; font-weight: bold; text-decoration: underline;">Notify("Both fields required!", Error) &larr; [EXECUTING]</span>,<br>
        &nbsp;&nbsp;<span style="color: #475569; opacity: 0.4;">Notify("Success!", Success) [BYPASSED]</span><br>
        )
      `;

      toastBanner.className = "toast-sim-banner toast-error";
      toastBanner.querySelector('span:first-child').innerHTML = '&cross;';
      toastText.textContent = isKhmerActive ? "ខ្វះការពណ៌នាបញ្ហា! សូមបំពេញឱ្យបានលម្អិត។" : "Missing problem description! Please provide details.";
      explanationEl.textContent = isKhmerActive
        ? "ប្រអប់ផ្នែកមានអក្សរ (False) ប៉ុន្តែប្រអប់ពណ៌នានៅទទេ (True)។ ដោយសារសញ្ញា || (OR) ត្រូវការតែផ្នែកណាមួយ True នោះលក្ខខណ្ឌសរុបគឺ True ដដែល នាំឱ្យបាញ់ Error។"
        : "Department has text (False), but Description is blank (True). Under the OR (||) operator, False || True evaluates to TRUE. The guard stops submission because Description is still missing!";
    }
    else if (scenarioKey === 'desc-only') {
      titleEl.textContent = isKhmerActive ? "ករណីទី ៣៖ បំពេញការពណ៌នា តែខ្វះឈ្មោះផ្នែក" : "Scenario 3: Description Filled, Department Blank";
      badgeEl.textContent = isKhmerActive ? "ទ្វារបិទ៖ ការបញ្ជូនត្រូវរារាំង" : "GATE CLOSED: SUBMISSION BLOCKED";
      badgeEl.style.background = "rgba(239, 68, 68, 0.2)";
      badgeEl.style.color = "#fca5a5";

      codeBox.innerHTML = `
        <span style="color: #60a5fa;">If</span>(<br>
        &nbsp;&nbsp;<span style="background: rgba(239, 68, 68, 0.3); color: #fca5a5; padding: 2px 6px; border-radius: 4px;">IsBlank(txtDept.Text) &rarr; TRUE</span><br>
        &nbsp;&nbsp;<span style="color: #f43f5e; font-weight: bold;">||</span> <span style="background: rgba(16, 185, 129, 0.25); color: #86efac; padding: 2px 6px; border-radius: 4px;">IsBlank(txtDescription.Text) &rarr; FALSE</span>,<br>
        &nbsp;&nbsp;<span style="color: #f87171; font-weight: bold; text-decoration: underline;">Notify("Both fields required!", Error) &larr; [EXECUTING]</span>,<br>
        &nbsp;&nbsp;<span style="color: #475569; opacity: 0.4;">Notify("Success!", Success) [BYPASSED]</span><br>
        )
      `;

      toastBanner.className = "toast-sim-banner toast-error";
      toastBanner.querySelector('span:first-child').innerHTML = '&cross;';
      toastText.textContent = isKhmerActive ? "ខ្វះឈ្មោះផ្នែក! សូមជ្រើសរើសផ្នែកមុននឹង Submit។" : "Missing department! Please specify your department.";
      explanationEl.textContent = isKhmerActive
        ? "ប្រអប់ផ្នែកនៅទទេ (True) ខណៈប្រអប់ពណ៌នាមានអក្សរ (False)។ True || False នៅតែស្មើ True! ដូច្នេះសំបុត្រដែលគ្មានឈ្មោះផ្នែក នឹងមិនអាចចូលទៅរំខានជាងបានឡើយ។"
        : "Department is blank (True), while Description has text (False). True || False evaluates to TRUE. The ticket cannot proceed without identifying the responsible department!";
    }
    else if (scenarioKey === 'both-valid') {
      titleEl.textContent = isKhmerActive ? "ករណីទី ៤៖ បំពេញទិន្នន័យគ្រប់គ្រាន់ទាំងពីរ" : "Scenario 4: Both Fields Validly Filled";
      badgeEl.textContent = isKhmerActive ? "ទ្វាររបើក៖ ការបញ្ជូនទទួលបានជោគជ័យ" : "GATE OPEN: SUBMISSION APPROVED";
      badgeEl.style.background = "rgba(16, 185, 129, 0.2)";
      badgeEl.style.color = "#86efac";

      codeBox.innerHTML = `
        <span style="color: #60a5fa;">If</span>(<br>
        &nbsp;&nbsp;<span style="background: rgba(16, 185, 129, 0.25); color: #86efac; padding: 2px 6px; border-radius: 4px;">IsBlank(txtDept.Text) &rarr; FALSE</span><br>
        &nbsp;&nbsp;<span style="color: #f43f5e; font-weight: bold;">||</span> <span style="background: rgba(16, 185, 129, 0.25); color: #86efac; padding: 2px 6px; border-radius: 4px;">IsBlank(txtDescription.Text) &rarr; FALSE</span>,<br>
        &nbsp;&nbsp;<span style="color: #475569; opacity: 0.4;">Notify("Both fields required!", Error) [BYPASSED]</span>,<br>
        &nbsp;&nbsp;<span style="color: #86efac; font-weight: bold; text-decoration: underline;">Notify("Success!", Success) &larr; [EXECUTING]</span><br>
        )
      `;

      toastBanner.className = "toast-sim-banner toast-success";
      toastBanner.querySelector('span:first-child').innerHTML = '&check;';
      toastText.textContent = isKhmerActive ? "ការផ្ទៀងផ្ទាត់ជោគជ័យ! សំបុត្រត្រូវបានបញ្ជូនទៅ SharePoint។" : "Validation passed! Request safely transmitted to SharePoint.";
      explanationEl.textContent = isKhmerActive
        ? "ប្រអប់ទាំងពីរមានអក្សរ។ IsBlank() ផ្តល់ False ទាំងសងខាង។ False || False ស្មើនឹង FALSE! ដូច្នេះម៉ាស៊ីន If រំលង Error ហើយដំណើរការផ្លូវទី ៣ ពណ៌បៃតងយ៉ាងត្រចះត្រចង់!"
        : "Both inputs contain characters. IsBlank() evaluates to FALSE for both. False || False evaluates to FALSE! The If engine bypasses the error action and joyfully triggers the green Success branch!";
    }
  };

  // WIDGET 2: Slide 16 Live Form Validation Simulator
  window.updateSimForm = function () {
    const deptInput = document.getElementById('sim-input-dept');
    const descInput = document.getElementById('sim-input-desc');
    const log = document.getElementById('sim-telemetry-log');

    if (!deptInput || !descInput || !log) return;

    const deptVal = deptInput.value.trim();
    const descVal = descInput.value.trim();

    log.innerHTML = `
      <p style="color: #94a3b8; margin: 0 0 4px 0;">[Reactive State Inspector]</p>
      <p style="margin: 0;">&bull; txtDept.Text: <span style="color: #60a5fa;">"${deptVal}"</span> &rarr; IsBlank: <span style="color: ${deptVal === '' ? '#ef4444' : '#10b981'}; font-weight: bold;">${deptVal === '' ? 'TRUE' : 'FALSE'}</span></p>
      <p style="margin: 0;">&bull; txtDesc.Text: <span style="color: #60a5fa;">"${descVal}"</span> &rarr; IsBlank: <span style="color: ${descVal === '' ? '#ef4444' : '#10b981'}; font-weight: bold;">${descVal === '' ? 'TRUE' : 'FALSE'}</span></p>
      <p style="color: #64748b; margin-top: 6px; font-size: 0.75rem;">Ready to evaluate OnSelect formula on button click.</p>
    `;
  };

  window.simulateFormSubmit = function () {
    const deptInput = document.getElementById('sim-input-dept');
    const descInput = document.getElementById('sim-input-desc');
    const toastBanner = document.getElementById('sim-toast-banner');
    const toastIcon = document.getElementById('sim-toast-icon');
    const toastMsg = document.getElementById('sim-toast-msg');
    const log = document.getElementById('sim-telemetry-log');

    if (!deptInput || !descInput || !toastBanner || !toastIcon || !toastMsg || !log) return;

    const deptVal = deptInput.value.trim();
    const descVal = descInput.value.trim();

    const isDeptBlank = deptVal === '';
    const isDescBlank = descVal === '';
    const isConditionTrue = isDeptBlank || isDescBlank;

    toastBanner.style.display = 'flex';

    if (isConditionTrue) {
      toastBanner.className = 'toast-sim-banner toast-error';
      toastIcon.innerHTML = '&cross;';
      toastMsg.textContent = isKhmerActive
        ? "ខ្វះទិន្នន័យចាំបាច់! ត្រូវតែបំពេញទាំងផ្នែក និងការពណ៌នា!"
        : "Validation Failed: Department and Description are both mandatory!";

      log.innerHTML = `
        <p style="color: #ef4444; font-weight: bold; margin: 0 0 4px 0;">[HALTED: NotificationType.Error Fired]</p>
        <p style="margin: 0; color: #fca5a5;">&bull; Condition: IsBlank(txtDept) [${isDeptBlank}] || IsBlank(txtDesc) [${isDescBlank}] &rarr; TRUE</p>
        <p style="margin: 0; color: #fca5a5;">&bull; Action Taken: Branch A (Error Toast Triggered)</p>
        <p style="margin: 0; color: #fca5a5;">&bull; SharePoint Status: 0 records committed (Database Protected!)</p>
      `;
    } else {
      toastBanner.className = 'toast-sim-banner toast-success';
      toastIcon.innerHTML = '&check;';
      toastMsg.textContent = isKhmerActive
        ? "សំណើសុំជំនួយត្រូវបានបញ្ជូនទៅ SharePoint ដោយជោគជ័យ!"
        : "Success! Incident verified and safely transmitted to SharePoint database.";

      log.innerHTML = `
        <p style="color: #10b981; font-weight: bold; margin: 0 0 4px 0;">[APPROVED: NotificationType.Success Fired]</p>
        <p style="margin: 0; color: #86efac;">&bull; Condition: IsBlank(txtDept) [false] || IsBlank(txtDesc) [false] &rarr; FALSE</p>
        <p style="margin: 0; color: #86efac;">&bull; Action Taken: Branch B (Success Toast &amp; Record Saved)</p>
        <p style="margin: 0; color: #86efac;">&bull; SharePoint Payload: { Dept: "${deptVal}", Desc: "${descVal}", Status: "New" }</p>
      `;
    }
  };

  window.clearSimForm = function () {
    const deptInput = document.getElementById('sim-input-dept');
    const descInput = document.getElementById('sim-input-desc');
    const toastBanner = document.getElementById('sim-toast-banner');
    const log = document.getElementById('sim-telemetry-log');

    if (deptInput) deptInput.value = '';
    if (descInput) descInput.value = '';
    if (toastBanner) toastBanner.style.display = 'none';

    if (log) {
      log.innerHTML = `<p style="color: var(--text-dim);">&bull; Form reset. Awaiting user click on Submit Request button...</p>`;
    }
  };

  // QUIZZES: Slides 18 - 22 Answer Handler
  window.handleQuizAnswer = function (questionNum, optionKey, isCorrect, btnElement) {
    const parentOptions = btnElement.closest('.quiz-options');
    if (!parentOptions) return;

    const allButtons = parentOptions.querySelectorAll('.quiz-option-btn');
    allButtons.forEach(btn => {
      btn.style.pointerEvents = 'none';
      btn.classList.remove('correct', 'wrong');
    });

    if (isCorrect) {
      btnElement.classList.add('correct');
    } else {
      btnElement.classList.add('wrong');
      // Highlight the correct answer among siblings
      allButtons.forEach(btn => {
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes('true')) {
          btn.classList.add('correct');
        }
      });
    }

    const feedbackPanel = document.getElementById(`quiz-feedback-${questionNum}`);
    if (feedbackPanel) {
      feedbackPanel.classList.add('answered');
      const badge = feedbackPanel.querySelector(`#quiz-badge-${questionNum}`);
      const statusTitle = feedbackPanel.querySelector(`#quiz-status-${questionNum}`);

      if (isCorrect) {
        if (badge) {
          badge.textContent = isKhmerActive ? 'ត្រឹមត្រូវ!' : 'Correct!';
          badge.style.background = 'rgba(16, 185, 129, 0.2)';
          badge.style.color = '#86efac';
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
          statusTitle.textContent = isKhmerActive ? 'សូមពិនិត្យច្បាប់ឡើងវិញ៖' : 'Review The Rule:';
          statusTitle.style.color = '#fca5a5';
        }
      }
    }
  };

  // --------------------------------------------------------------------------
  // 11. KEYBOARD NAVIGATION
  // --------------------------------------------------------------------------
  function handleKeyDown(e) {
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
        e.preventDefault();
        toggleLanguage();
        break;
      case 'p':
      case 'P':
        e.preventDefault();
        toggleLaser();
        break;
      case 'n':
      case 'N':
        e.preventDefault();
        toggleNotes();
        break;
      case 'o':
      case 'O':
        e.preventDefault();
        toggleOverview();
        break;
      case 't':
      case 'T':
        e.preventDefault();
        toggleTimer();
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        toggleFullscreen();
        break;
      case 'Escape':
        if (isNotesOpen) toggleNotes();
        if (isOverviewOpen) toggleOverview();
        break;
    }
  }

  // --------------------------------------------------------------------------
  // 12. FULLSCREEN CONTROLLER
  // --------------------------------------------------------------------------
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }

  // --------------------------------------------------------------------------
  // 13. GLOBAL WINDOW EXPORTS (Ensures Instant Inline onclick Functionality)
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
  window.handleKeyDown = handleKeyDown;

  // Immediately attach keydown listener
  window.addEventListener('keydown', handleKeyDown);

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
    updateProgress();
    updateTimerDisplay();
    bindInteractiveWidgets();

    console.log('Day 17 Presentation loaded successfully (Lesson 14 Exact DOM Architecture)!');
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
