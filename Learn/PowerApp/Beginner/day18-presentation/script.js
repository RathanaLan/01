/* ============================================================================
   POWER APPS FOUNDATION: DAY 18 PRESENTATION ENGINE
   Topic: Variables: Let the App Remember
   Phase: Phase 6: Power Fx Fundamentals
   Theme: Microsoft Fluent 2 Dark Mode (Memory Amber & Neon Cyan Glass)
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

  // Memory Widget Live State (Slide 13 & Slide 16)
  let liveMemoryBank = {
    varShift: "Morning",
    varCount: 0,
    varDept: "Line 1"
  };

  // --------------------------------------------------------------------------
  // 2. KHMER SLIDES DATA STORE (100% Exact DOM Mirroring - Inner Content Only)
  // --------------------------------------------------------------------------
  const KHMER_SLIDES = [
    // Slide 1: Hero
    {
      "title": "អថេរ (Variables)៖ ផ្តល់ការចងចាំដល់កម្មវិធី",
      "segment": "ដំណាក់កាលទី ៦៖ មូលដ្ឋានគ្រឹះ Power Fx",
      "subtitle": "ផ្តល់ការចងចាំរយៈពេលខ្លីដល់ Power Apps របស់អ្នក! ស្វែងយល់ពីរបៀបដែលអថេរ (Variables) កត់ត្រាតម្លៃចេញពីសកម្មភាពរបស់អ្នកប្រើ រក្សាទុកក្នុងអង្គចងចាំបណ្តោះអាសន្ន និងយកទៅប្រើប្រាស់ឡើងវិញឆ្លងកាត់អេក្រង់ផ្សេងៗ។",
      "content": `<div class="hero-badge">
            <span>គ្រឹះវិជ្ជាជីវៈ Microsoft Power Apps</span>
            <span>&bull;</span>
            <span>ថ្ងៃទី ១៨ នៃ ២៧</span>
          </div>
          <h1 class="hero-title">អថេរ (Variables)៖ ផ្តល់ការចងចាំដល់កម្មវិធី</h1>
          <p class="hero-subtitle">
            ផ្តល់ការចងចាំរយៈពេលខ្លីដល់ Power Apps របស់អ្នក! ស្វែងយល់ពីរបៀបដែលអថេរ (Variables) កត់ត្រាតម្លៃចេញពីសកម្មភាពរបស់អ្នកប្រើ រក្សាទុកក្នុងអង្គចងចាំបណ្តោះអាសន្ន និងយកទៅប្រើប្រាស់ឡើងវិញឆ្លងកាត់អេក្រង់ផ្សេងៗ។
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
            <span class="chain-item">តក្កវិជ្ជា / ការសម្រេចចិត្ត</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item active">សកម្មភាព (Set)</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item active">ការចងចាំរបស់ App</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ការផ្ទុកទិន្នន័យ</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ការឆ្លើយតប</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ការធ្វើតេស្ត</span>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>ការបើកមេរៀន (២ នាទី)៖</strong> សូមស្វាគមន៍មកកាន់ថ្ងៃទី ១៨! រហូតមកដល់ពេលនេះ កម្មវិធីរបស់អ្នកឆ្លាតវៃអាចគណនាដូច Excel (ថ្ងៃ ១៦) និងចេះធ្វើការសម្រេចចិត្តការពារទិន្នន័យ (ថ្ងៃ ១៧)។ ប៉ុន្តែកម្មវិធីរបស់អ្នកមានបញ្ហាធំមួយ៖ វាភ្លេចភ្លាំងគ្រប់យ៉ាងពេលប្តូរអេក្រង់!</p>
<p><strong>គំនិតស្នូលថ្ងៃនេះ៖</strong> ថ្ងៃនេះយើងនឹងបំពាក់ខួរក្បាល និងក្រដាសកត់ចំណាំ (Scratchpad) ដល់កម្មវិធីដោយប្រើ អថេរ (Variables)។</p>`
    },

    // Slide 2: Agenda & Objectives
    {
      "title": "របៀបវារៈ ៩០ នាទី និងគោលបំណងរំពឹងទុកជាក់ស្តែង",
      "segment": "ផ្នែកទី ១ &bull; គោលបំណង និងរចនាសម្ព័ន្ធ",
      "subtitle": "គន្លងរៀនជាវង់តំរៀប (Spiral Learning)៖ បំពាក់ការចងចាំបណ្តោះអាសន្នដល់កម្មវិធី តាមរយៈការអនុវត្តផ្ទាល់ដៃ។",
      "content": `<div class="card">
            <h3 class="card-title">៤ គោលបំណងរំពឹងទុកជាក់ស្តែង</h3>
            <div class="objective-item">
              <span class="obj-num">1</span>
              <div>
                <strong>កំណត់និយមន័យអថេរជាភាសាសាមញ្ញ៖</strong>
                <p>ពន្យល់ពីមូលហេតុដែលកម្មវិធីត្រូវការក្រដាសកត់ចំណាំបណ្តោះអាសន្ន (Variables) ជាជាងការបាត់បង់ទិន្នន័យរាល់ពេលប្តូរអេក្រង់។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">2</span>
              <div>
                <strong>សរសេររូបមន្ត Global Variable ជាមួយ <code>Set()</code>៖</strong>
                <p>សរសេរកូដ <code>Set(ឈ្មោះអថេរ, តម្លៃ)</code> យ៉ាងត្រឹមត្រូវដើម្បីកត់ត្រាអត្ថបទ លេខ និងស្ថានភាពដោយគ្មានកំហុស Syntax។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">3</span>
              <div>
                <strong>ទាញយក និងបង្ហាញតម្លៃចងចាំឆ្លងអេក្រង់៖</strong>
                <p>បង្ហាញតម្លៃអថេរនៅលើស្លាកអក្សរ (Labels) ក្បាលទំព័រ និងរូបមន្តនានានៅលើអេក្រង់ផ្សេងៗគ្នាដោយរលូន។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">4</span>
              <div>
                <strong>អនុវត្តស្តង់ដារដាក់ឈ្មោះវិជ្ជាជីវៈ <code>var</code>៖</strong>
                <p>ប្រើប្រាស់បុព្វបទស្តង់ដារ (ឧ. <code>varCurrentShift</code>, <code>varOperatorName</code>) ដើម្បីបែងចែកអថេរដាច់ពី Controls លើអេក្រង់។</p>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">កាលវិភាគ ៩០ នាទីជាក់លាក់</h3>
            <div class="agenda-timeline">
              <div class="agenda-block">
                <span class="agenda-time">00 - 10m</span>
                <span class="agenda-name">១. រំលឹកមេរៀនចាស់ &amp; ផែនទីគំនិត</span>
                <span class="agenda-desc">តភ្ជាប់ថ្ងៃ ៤-៦, ១៦, &amp; ១៧ មកថ្ងៃ ១៨</span>
              </div>
              <div class="agenda-block">
                <span class="agenda-time">10 - 20m</span>
                <span class="agenda-name">២. បញ្ហាជាក់ស្តែងនៅកន្លែងការងារ</span>
                <span class="agenda-desc">វិបត្តិភ្លេចភ្លាំងរបស់ App ខាតបង់ $34,000</span>
              </div>
              <div class="agenda-block">
                <span class="agenda-time">20 - 35m</span>
                <span class="agenda-name">៣. គំរូផ្នត់គំនិត &amp; ឧទាហរណ៍ជាក់ស្តែង</span>
                <span class="agenda-desc">សៀគ្វីក្រដាសស្អិត &amp; សៀវភៅកត់របស់អ្នករត់តុ</span>
              </div>
              <div class="agenda-block">
                <span class="agenda-time">35 - 50m</span>
                <span class="agenda-name">៤. ការវិភាគរូបមន្ត Power Fx លម្អិត (Formula Breakdown)</span>
                <span class="agenda-desc">បំបែក Set(), ការដាក់ឈ្មោះ, &amp; Scopes</span>
              </div>
              <div class="agenda-block">
                <span class="agenda-time">50 - 65m</span>
                <span class="agenda-name">៥. បង្ហាញផ្ទាល់ &amp; អនុវត្តរួមគ្នា</span>
                <span class="agenda-desc">កសាងស្លាកសម្គាល់វេនការងាររបស់បុគ្គលិក</span>
              </div>
              <div class="agenda-block">
                <span class="agenda-time">65 - 78m</span>
                <span class="agenda-name">៦. បន្ទប់ពិសោធន៍ &amp; កំហុសយល់ច្រឡំ</span>
                <span class="agenda-desc">កម្មវិធីត្រាប់តាមចងចាំច្រើនអេក្រង់ &amp; ដំណោះស្រាយ</span>
              </div>
              <div class="agenda-block">
                <span class="agenda-time">78 - 86m</span>
                <span class="agenda-name">៧. សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង (៥ សំណួរ)</span>
                <span class="agenda-desc">សំណួរអន្តរកម្មជាមួយចម្លើយពន្យល់ភ្លាមៗ</span>
              </div>
              <div class="agenda-block">
                <span class="agenda-time">86 - 90m</span>
                <span class="agenda-name">៨. កិច្ចការប្រឡង &amp; ស្ពានទៅថ្ងៃស្អែក</span>
                <span class="agenda-desc">រង្វាស់ ១០០ ពិន្ទុ &amp; ត្រៀមថ្ងៃទី ១៩ (Storage)</span>
              </div>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>ដើរតាមគោលបំណងទាំង ៤។ បញ្ជាក់ប្រាប់សិស្សថានៅនាទីទី ៦៥ សិស្សគ្រប់រូបនឹងអាចបង្កើត App ចងចាំឆ្លងអេក្រង់បានដោយជោគជ័យ។</p>`
    },

    // Slide 3: Concept Map Recap
    {
      "title": "ផែនទីគំនិត ៥ នាទី៖ កម្មវិធីសិក្សាជាវង់តំរៀប",
      "segment": "ផ្នែកទី ១ &bull; ការតភ្ជាប់ជាវង់តំរៀប",
      "subtitle": "រាល់មេរៀនថ្មីៗទាំងអស់ គឺឈរលើគ្រឹះនៃគំនិតដែលអ្នកបានយល់ដឹងកន្លងមកជានិច្ច។",
      "content": `<div class="card">
            <div class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">ថ្ងៃទី ១៤ - ១៦៖ Properties &amp; Controls</div>
            <h3 class="card-title">តម្លៃទិន្នន័យលើអេក្រង់ផ្ទាល់</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">
              អ្នកបានរៀនពីរបៀបដែល controls កាន់កាប់ទិន្នន័យនៅលើអេក្រង់សកម្មដោយប្រើសញ្ញាចុច (<code>txtDept.Text</code>)។
            </p>
            <ul style="color: var(--text-muted); font-size: 0.88rem; padding-left: 1.2rem; line-height: 1.7;">
              <li>Controls ទទួលទិន្នន័យភ្លាមៗ។</li>
              <li>រូបមន្តគណនាលទ្ធផលស្វ័យប្រវត្តិ។</li>
              <li><em>កម្រិតកំណត់៖</em> ជាប់គាំងតែលើអេក្រង់នោះមួយប៉ុណ្ណោះ!</li>
            </ul>
          </div>

          <div class="card">
            <div class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ថ្ងៃទី ១៧៖ តក្កវិជ្ជាផ្ទៀងផ្ទាត់ (Validation)</div>
            <h3 class="card-title">ឆ្មាំទ្វារសម្រេចចិត្ត</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">
              កាលពីម្សិលមិញ អ្នកបានបង្កើតខែលការពារដ៏ឆ្លាតវៃដោយប្រើ <code>If()</code>, <code>IsBlank()</code>, និង <code>Notify()</code> ដើម្បីទប់ស្កាត់ការបញ្ជូនទិន្នន័យទទេស្អាត។
            </p>
            <ul style="color: var(--text-muted); font-size: 0.88rem; padding-left: 1.2rem; line-height: 1.7;">
              <li>លក្ខខណ្ឌផ្តល់ True ឬ False។</li>
              <li><code>If()</code> ជ្រើសរើសផ្លូវសកម្មភាព។</li>
              <li>ផ្ទាំងសារ Toast ផ្តល់ដំណឹងដល់មនុស្ស។</li>
            </ul>
          </div>

          <div class="card" style="border-color: var(--color-memory); box-shadow: 0 0 25px rgba(245, 158, 11, 0.2);">
            <div class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fde68a;">ថ្ងៃនេះ (ថ្ងៃ ១៨)៖ ការចងចាំរបស់ App</div>
            <h3 class="card-title">អថេរជួយចងចាំ (Variables)</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">
              ឥឡូវនេះយើងបំពាក់ក្រដាសកត់ចំណាំដល់ App! ពេលមានសកម្មភាពកើតឡើង យើងរក្សាទុកតម្លៃក្នុងអង្គចងចាំ ដើម្បីឱ្យគ្រប់អេក្រង់អាចយកទៅប្រើបាន។
            </p>
            <ul style="color: #fde68a; font-size: 0.88rem; padding-left: 1.2rem; line-height: 1.7;">
              <li>កត់ត្រា៖ <code>Set(varShift, "Shift B")</code></li>
              <li>រក្សាទុក៖ តម្លៃស្ថិតនៅក្នុង RAM ជានិច្ច។</li>
              <li>ប្រើឡើងវិញ៖ អេក្រង់ទី ២ &amp; ៣ អាន <code>varShift</code> បានភ្លាម!</li>
            </ul>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>បញ្ជាក់ពីការវិវត្តនៃកម្មវិធី៖ កាលពីដំបូង App មានភ្នែកនិងត្រចៀក (controls)។ បន្ទាប់មកចេះគណនា (ថ្ងៃ ១៦)។ បន្ទាប់មកចេះបែងចែកខុសត្រូវ (ថ្ងៃ ១៧)។ ថ្ងៃនេះយើងផ្តល់ខួរក្បាលចងចាំដល់វា!</p>`
    },

    // Slide 4: Prerequisite Retrieval (Flip cards)
    {
      "title": "រំលឹកចំណេះដឹងគ្រឹះ៖ ផ្ទៀងផ្ទាត់ការចងចាំ ៤ ចំណុច",
      "segment": "ផ្នែកទី ១ &bull; រំលឹកចំណេះដឹងចាស់",
      "subtitle": "ចុចលើកាតនីមួយៗដើម្បីបង្វិល និងផ្ទៀងផ្ទាត់ការយល់ដឹងរបស់អ្នក មុនពេលយើងចាប់ផ្តើមសរសេរកូដថ្ងៃនេះ។",
      "content": `<div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-inner">
              <div class="flip-front">
                <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fde68a;">សំណួរទី ១</span>
                <h4 style="color: var(--text-main); margin-top: 1rem; font-size: 1.05rem;">តើអ្វីជាអ្នកបញ្ជាឱ្យរូបមន្តសកម្មភាពដំណើរការក្នុង Power Apps?</h4>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.5rem;">គិតត្រឡប់ទៅសកម្មភាពប៊ូតុងថ្ងៃ ១៥ &amp; ១៧...</p>
                <span class="flip-prompt">ចុចដើម្បីមើលចម្លើយ &rarr;</span>
              </div>
              <div class="flip-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ចម្លើយទី ១</span>
                <p style="color: #ecfdf5; font-size: 0.95rem; margin-top: 0.8rem; line-height: 1.6;">
                  <strong>ព្រឹត្តិការណ៍ (Event)</strong>! ភាគច្រើនគឺព្រឹត្តិការណ៍ <code>OnSelect</code> នៅពេលអ្នកប្រើចុចលើប៊ូតុង ឬរូបតំណាងណាមួយ។
                </p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-inner">
              <div class="flip-front">
                <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fde68a;">សំណួរទី ២</span>
                <h4 style="color: var(--text-main); margin-top: 1rem; font-size: 1.05rem;">តើមានអ្វីកើតឡើងចំពោះតម្លៃក្នុង TextInput ពេលអ្នកចាកចេញពីអេក្រង់?</h4>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.5rem;">ការប្រៀបធៀប controls និងអាយុកាលអេក្រង់...</p>
                <span class="flip-prompt">ចុចដើម្បីមើលចម្លើយ &rarr;</span>
              </div>
              <div class="flip-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ចម្លើយទី ២</span>
                <p style="color: #ecfdf5; font-size: 0.95rem; margin-top: 0.8rem; line-height: 1.6;">
                  វាស្ថិតនៅលើអេក្រង់នោះដដែល ប៉ុន្តែអេក្រង់ផ្សេងពិបាកទាញយកវាណាស់ ហើយបើសិនជាអេក្រង់នោះ Reset គឺទិន្នន័យនឹងត្រូវបាត់បង់ទាំងស្រុង!
                </p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-inner">
              <div class="flip-front">
                <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fde68a;">សំណួរទី ៣</span>
                <h4 style="color: var(--text-main); margin-top: 1rem; font-size: 1.05rem;">តើអ្នកតភ្ជាប់អត្ថបទជាមួយតម្លៃប្រែប្រួលក្នុង Power Fx តាមរបៀបណា?</h4>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.5rem;">រំលឹករូបមន្តអត្ថបទកាលពីថ្ងៃទី ១៦...</p>
                <span class="flip-prompt">ចុចដើម្បីមើលចម្លើយ &rarr;</span>
              </div>
              <div class="flip-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ចម្លើយទី ៣</span>
                <p style="color: #ecfdf5; font-size: 0.95rem; margin-top: 0.8rem; line-height: 1.6;">
                  ប្រើប្រាស់សញ្ញាតភ្ជាប់ <strong>Ampersand (<code>&amp;</code>)</strong>! (ឧទាហរណ៍៖ <code>"វេនសកម្ម៖ " &amp; varShift</code>)។
                </p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-inner">
              <div class="flip-front">
                <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fde68a;">សំណួរទី ៤</span>
                <h4 style="color: var(--text-main); margin-top: 1rem; font-size: 1.05rem;">តើ Notify() ជួយចងចាំទិន្នន័យសម្រាប់គណនានៅពេលក្រោយដែរឬទេ?</h4>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.5rem;">រំលឹកមុខងារ Notify ថ្ងៃទី ១៧...</p>
                <span class="flip-prompt">ចុចដើម្បីមើលចម្លើយ &rarr;</span>
              </div>
              <div class="flip-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ចម្លើយទី ៤</span>
                <p style="color: #ecfdf5; font-size: 0.95rem; margin-top: 0.8rem; line-height: 1.6;">
                  <strong>អត់ទេ!</strong> <code>Notify()</code> គ្រាន់តែបង្ហាញផ្ទាំងសារបណ្តោះអាសន្នឱ្យភ្នែកមនុស្សមើលប៉ុណ្ណោះ។ វាមិនបានកត់ត្រាតម្លៃទុកឱ្យ App ប្រើឡើងវិញឡើយ។
                </p>
              </div>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>សង្កត់ធ្ងន់លើសំណួរទី ៤៖ Notify គ្រាន់តែជាមេក្រូស្រែកប្រាប់មនុស្ស។ វាមិនមានការចងចាំទេ។ ថ្ងៃនេះយើងនឹងជួបជាមួយធនាគារចងចាំពិតប្រាកដរបស់ App!</p>`
    },

    // Slide 5: The Why Problem (Amnesia App Crisis)
    {
      "title": "មូលហេតុចាំបាច់៖ វិបត្តិភ្លេចភ្លាំងរបស់ App ខាតបង់ $34,000",
      "segment": "ផ្នែកទី ២ &bull; វិបត្តិជាក់ស្តែងនៅរោងចក្រ",
      "subtitle": "តើមានអ្វីកើតឡើងនៅពេលកម្មវិធីក្នុងរោងចក្រកើតជំងឺភ្លេចភ្លាំងរាល់ពេលប្តូរអេក្រង់?",
      "content": `<div class="card">
            <div class="crisis-banner">
              <span class="crisis-icon">&iexcl;</span>
              <div>
                <strong style="color: #fca5a5; font-size: 1.1rem;">របាយការណ៍ឧបទ្ទវហេតុ៖ ការផ្លាស់ប្តូរវេននៅ Apex Plastics</strong>
                <p style="color: #fecaca; font-size: 0.88rem; margin: 0.25rem 0 0 0;">ខ្សែសង្វាក់ផលិតកម្ម Extruder ទី ៤ &bull; ដំណើរការការងារលើ Tablet</p>
              </div>
            </div>

            <p style="color: var(--text-main); font-size: 0.98rem; line-height: 1.7; margin-bottom: 1rem;">
              នៅរោងចក្រ Apex Plastics បុគ្គលិកបញ្ជាម៉ាស៊ីនចាប់ផ្តើមការងារលើ <strong>អេក្រង់ស្វាគមន៍ (Welcome Screen)</strong>។ ពួកគេចូលប្រើប្រព័ន្ធ ហើយជ្រើសរើសទីតាំងម៉ាស៊ីន៖ <em>"Line 4 - Extruder Bay"</em> និងវេនការងារ៖ <em>"Shift B - វេនយប់"</em>។
            </p>

            <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.7;">
              បន្ទាប់មកពួកគេចុច <strong style="color: var(--color-memory);">ទៅកាន់ទម្រង់ជួសជុល</strong>។ ប៉ុន្តែបញ្ហាកើតឡើងភ្លាម៖ អេក្រង់ទី ២ ភ្លេចអស់រលីងថាពួកគេជានរណា! វាទាមទារឱ្យពួកគេជ្រើសរើសផ្នែក និងវេនការងារម្តងទៀត។ ពេលទៅដល់បញ្ជីសុវត្ថិភាព វាសួរជាលើកទី ៣ ទៀត!
            </p>
          </div>

          <div class="card">
            <h3 class="card-title" style="color: #fca5a5;">ភាពធុញថប់ និងការខាតបង់ផលិតភាព</h3>
            
            <div class="consequence-row">
              <span class="consequence-badge">ជំងឺភ្លេច</span>
              <div>
                <strong style="color: var(--text-main); font-size: 0.9rem;">"ហេតុអ្វីបានជា App នេះមិនចេះចាំអ្វីសោះ?":</strong>
                <p style="color: var(--text-muted); font-size: 0.84rem; margin: 0.15rem 0 0 0;">បុគ្គលិកមានអារម្មណ៍ធុញទ្រាន់ដែលត្រូវវាយឈ្មោះ និងរើសវេនការងារដដែលៗលើគ្រប់អេក្រង់ រហូតធ្វើឱ្យអ្នកខ្លះឈប់ចង់ប្រើ App។</p>
              </div>
            </div>

            <div class="consequence-row">
              <span class="consequence-badge">ខាត $34k</span>
              <div>
                <strong style="color: var(--text-main); font-size: 0.9rem;">ខាតបង់កម្លាំងពលកម្ម $34,000 ជារៀងរាល់ឆ្នាំ៖</strong>
                <p style="color: var(--text-muted); font-size: 0.84rem; margin: 0.15rem 0 0 0;">បុគ្គលិក ៣៥ នាក់ចំណាយពេល ១៤ នាទីក្នុងមួយថ្ងៃដើម្បីបំពេញព័ត៌មានដដែលៗលើ ៤ អេក្រង់ ធ្វើឱ្យខាតបង់រាប់រយម៉ោងផលិតកម្ម។</p>
              </div>
            </div>

            <div class="consequence-row">
              <span class="consequence-badge">ដំណោះស្រាយ</span>
              <div>
                <strong style="color: var(--text-main); font-size: 0.9rem;">កត់ត្រាម្តង ប្រើប្រាស់បានគ្រប់ទីកន្លែង៖</strong>
                <p style="color: var(--text-muted); font-size: 0.84rem; margin: 0.15rem 0 0 0;">កម្មវិធីត្រូវការធនាគារចងចាំបណ្តោះអាសន្ន ដើម្បីកត់ត្រាវេនការងារតែម្តងគត់ ហើយបញ្ជូនវាទៅកាន់គ្រប់អេក្រង់ក្នុងប្រព័ន្ធ។</p>
              </div>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>បង្កើតការយល់ចិត្ត៖ "ស្រមៃថាពេលអ្នកដើរចូលបន្ទប់នីមួយៗក្នុងផ្ទះ គ្រួសាររបស់អ្នកសួរថា 'តើឯងជានរណា?' App ដែលគ្មានអថេរគឺបែបហ្នឹងឯង! អថេរគឺជាវិធីដែល App បង្ហាញការគោរពចំពោះពេលវេលារបស់អ្នកប្រើ។"</p>`
    },

    // Slide 6: Visual Cause-and-Effect Diagram
    {
      "title": "ដ្យាក្រាមហេតុនិងផល៖ សៀគ្វីចងចាំក្រដាសស្អិត",
      "segment": "ផ្នែកទី ៣ &bull; គំរូផ្នត់គំនិត",
      "subtitle": "របៀបដែលព្រឹត្តិការណ៍ចុចប៊ូតុងតែមួយកត់ត្រាតម្លៃចូល RAM ដើម្បីឱ្យអេក្រង់ផ្សេងៗអានបានដោយងាយ។",
      "content": `<div class="memory-flow">
            <div class="memory-step-box">
              <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-cyan); font-weight: 700;">ជំហានទី ១៖ សកម្មភាពចុច</span>
              <strong style="color: var(--text-main); margin-top: 0.35rem; font-size: 1rem;">បុគ្គលិកចុច "Shift B"</strong>
              <span style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;"><code>btnShiftB.OnSelect</code> ដំណើរការ</span>
            </div>

            <div class="memory-arrow-indicator">&rarr;</div>

            <div class="memory-step-box" style="border-color: var(--color-memory);">
              <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-memory); font-weight: 700;">ជំហានទី ២៖ បញ្ជាឱ្យកត់ត្រា</span>
              <strong style="color: #fbbf24; margin-top: 0.35rem; font-size: 1rem;"><code>Set(varCurrentShift, "Shift B")</code></strong>
              <span style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">កត់ត្រាតម្លៃចូលក្នុង RAM Scratchpad</span>
            </div>

            <div class="memory-arrow-indicator">&rarr;</div>

            <div class="memory-step-box" style="border-color: var(--color-success);">
              <span style="font-size: 0.75rem; text-transform: uppercase; color: #86efac; font-weight: 700;">ជំហានទី ៣៖ ការចងចាំក្នុង RAM</span>
              <strong style="color: #86efac; margin-top: 0.35rem; font-size: 1rem;"><code>varCurrentShift</code> = "Shift B"</strong>
              <span style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">តម្លៃត្រូវបានរក្សាទុកដោយសុវត្ថិភាព</span>
            </div>
          </div>

          <div class="grid-2" style="margin-top: 0.5rem;">
            <div class="card" style="border-color: rgba(59, 130, 246, 0.4);">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                <strong style="color: #93c5fd; font-size: 1rem;">អេក្រង់ទី ២៖ អេក្រង់រាយការណ៍បញ្ហា</strong>
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">ប្រើឡើងវិញ ១</span>
              </div>
              <p style="color: var(--text-main); font-size: 0.9rem; margin-bottom: 0.5rem;">
                ក្បាលទំព័រអេក្រង់បង្ហាញវេនការងារសកម្មស្វ័យប្រវត្តិដោយមិនចាំបាច់សួរ៖
              </p>
              <div style="background: #070a12; padding: 0.75rem; border-radius: 0.5rem; font-family: var(--font-code); color: #93c5fd; font-size: 0.85rem;">
                lblHeader.Text = "កត់ត្រាបញ្ហាសម្រាប់៖ " &amp; varCurrentShift
              </div>
            </div>

            <div class="card" style="border-color: rgba(16, 185, 129, 0.4);">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                <strong style="color: #86efac; font-size: 1rem;">អេក្រង់ទី ៣៖ ពិនិត្យសំបុត្រ &amp; បញ្ជូន</strong>
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ប្រើឡើងវិញ ២</span>
              </div>
              <p style="color: var(--text-main); font-size: 0.9rem; margin-bottom: 0.5rem;">
                ពេលវេចខ្ចប់សំបុត្រផ្ញើចូល SharePoint អថេរ <code>varCurrentShift</code> ភ្ជាប់ចូល database ស្វ័យប្រវត្តិ៖
              </p>
              <div style="background: #070a12; padding: 0.75rem; border-radius: 0.5rem; font-family: var(--font-code); color: #86efac; font-size: 0.85rem;">
                Patch(SharePointList, Defaults(...), { Shift: varCurrentShift, ... })
              </div>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>បើក Laser (<kbd>P</kbd>) រួចចង្អុលពីជំហាន ១ ទៅ ២ និង ៣។ បន្ទាប់មកចង្អុលមកអេក្រង់ ២ និង ៣។ សង្កត់ធ្ងន់ថា៖ អ្នកប្រើចុចតែម្តងគត់លើអេក្រង់ទី ១ ប៉ុន្តែយើងប្រើវាបានទាំងលើអេក្រង់ ២ និង ៣។</p>`
    },

    // Slide 7: Everyday Analogy
    {
      "title": "ឧទាហរណ៍ជាក់ស្តែងប្រចាំថ្ងៃ៖ សៀវភៅកត់អ្នករត់តុ និងក្តារខៀន",
      "segment": "ផ្នែកទី ៣ &bull; ឧទាហរណ៍ជាក់ស្តែង",
      "subtitle": "ការតភ្ជាប់ការចងចាំកុំព្យូទ័រដ៏ស្មុគស្មាញ ទៅនឹងក្រដាសកត់ចំណាំក្នុងជីវិតរស់នៅជាក់ស្តែង។",
      "content": `<div class="card">
            <div class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fde68a;">ឧទាហរណ៍ទី ១ &bull; អ្នករត់តុកាហ្វេ</div>
            <h3 class="card-title">សៀវភៅកត់ត្រាក្នុងហោប៉ៅ</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">
              អ្នកអង្គុយនៅតុលេខ ៤។ អ្នកប្រាប់អ្នករត់តុថា៖ <em>"សុំកាហ្វេ Espresso មួយកែវដាក់ទឹកដោះគោ Oat milk។"</em>
            </p>

            <div class="sticky-note-box" style="margin-bottom: 1rem;">
              <strong>ក្រដាសកត់ចំណាំ (អថេរ / Variable)៖</strong><br>
              តុលេខ៖ ៤<br>
              ភេសជ្ជៈ៖ Espresso (ទឹកដោះគោ Oat milk)
            </div>

            <ul style="color: var(--text-muted); font-size: 0.88rem; padding-left: 1.2rem; line-height: 1.7;">
              <li>ពេលអ្នករត់តុដើរចូលទៅក្នុងផ្ទះបាយ (អេក្រង់ទី ២) គាត់មិនបាច់ដើរត្រឡប់មកសួរអ្នកម្តងទៀតទេ។</li>
              <li>គាត់ដកសៀវភៅកត់ចេញពីហោប៉ៅ មើលការកត់ត្រា រួចប្រាប់ទៅអ្នកឆុងកាហ្វេ។</li>
              <li>ពេលអ្នកញ៉ាំរួចចេញពីហាង (បិទ App) អ្នករត់តុក៏ហែកក្រដាសនោះបោះចោលក្នុងធុងសំរាម!</li>
            </ul>
          </div>

          <div class="card">
            <div class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">ឧទាហរណ៍ទី ២ &bull; ក្តារព័ត៌មានរោងចក្រ</div>
            <h3 class="card-title">ក្រដាសស្អិត vs. ទូដែកដាក់ឯកសារ</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">
              ហេតុអ្វីបានជាយើងត្រូវការទាំង អថេរ (Variables) និង មូលដ្ឋានទិន្នន័យ (SharePoint)?
            </p>

            <div style="background: rgba(15, 23, 42, 0.7); border-radius: 0.5rem; padding: 1rem; border: 1px solid var(--border-subtle); margin-bottom: 1rem;">
              <div style="display: flex; gap: 0.75rem; margin-bottom: 0.75rem;">
                <span style="color: #fbbf24; font-weight: bold;">ក្រដាសស្អិតពណ៌លឿង (Variable)៖</span>
                <span style="color: var(--text-muted); font-size: 0.88rem;">កត់ត្រារហ័ស បណ្តោះអាសន្ន។ បាត់ពេលបិទ App។ ដំណើរការលើ RAM លឿនបំផុត។</span>
              </div>
              <div style="display: flex; gap: 0.75rem;">
                <span style="color: #60a5fa; font-weight: bold;">ទូដែកឯកសារ (SharePoint)៖</span>
                <span style="color: var(--text-muted); font-size: 0.88rem;">ឯកសារអចិន្ត្រៃយ៍។ សុវត្ថិភាពរាប់ឆ្នាំ។ មនុស្សគ្រប់គ្នាមើលឃើញរួមគ្នា (ថ្ងៃទី ១៩!)។</span>
              </div>
            </div>

            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              <strong>ច្បាប់មាស៖</strong> អថេរគឺសម្រាប់ពេលកំពុងប្រើ App ឥឡូវនេះ; មូលដ្ឋានទិន្នន័យគឺសម្រាប់ប្រវត្តិសាស្រ្តយូរអង្វែងថ្ងៃស្អែក។
            </p>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>ការប្រៀបធៀបគឺជាគន្លឹះ៖ ត្រូវប្រាកដថាសិស្សយល់ដាច់រវាង RAM បណ្តោះអាសន្ន និង SharePoint អចិន្ត្រៃយ៍។ បើដាច់ភ្លើង ឬបិទទូរស័ព្ទ ក្រដាសស្អិតហើរចោល។ ទូដែកនៅជាប់សោជានិច្ច។</p>`
    },

    // Slide 8: Translation Ladder
    {
      "title": "កាំជណ្តើរបកប្រែពីពាក្យសាមញ្ញទៅកាន់ Power Fx",
      "segment": "ផ្នែកទី ៣ &bull; កាំជណ្តើរបកប្រែ",
      "subtitle": "ការបកប្រែការគិតបែបមនុស្សអំពីការចងចាំ ទៅជារូបមន្ត Set() ដ៏ច្បាស់លាស់។",
      "content": `<div class="card">
            <h3 class="card-title">កាំជណ្តើរបកប្រែ ៥ កាំ</h3>

            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <div style="background: rgba(15, 23, 42, 0.7); border-left: 4px solid #3b82f6; padding: 0.65rem 1rem; border-radius: 0.4rem;">
                <span style="font-size: 0.72rem; text-transform: uppercase; color: #93c5fd; font-weight: 700;">កាំទី ១៖ តម្រូវការអាជីវកម្ម</span>
                <p style="color: var(--text-main); font-size: 0.88rem; margin: 0.2rem 0 0 0;">"ចងចាំវេនការងារដែលបុគ្គលិកបានរើស ឱ្យនៅជាប់រហូតលើគ្រប់អេក្រង់។"</p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.7); border-left: 4px solid #06b6d4; padding: 0.65rem 1rem; border-radius: 0.4rem;">
                <span style="font-size: 0.72rem; text-transform: uppercase; color: #67e8f9; font-weight: 700;">កាំទី ២៖ ការគិតជាភាសាសាមញ្ញ</span>
                <p style="color: var(--text-main); font-size: 0.88rem; margin: 0.2rem 0 0 0;">"យកក្រដាសស្អិតសរសេរថា 'Current Shift' ហើយកត់ពាក្យ 'Shift B' លើនោះ។"</p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.7); border-left: 4px solid #f59e0b; padding: 0.65rem 1rem; border-radius: 0.4rem;">
                <span style="font-size: 0.72rem; text-transform: uppercase; color: #fde68a; font-weight: 700;">កាំទី ៣៖ ការជ្រើសរើសអនុគមន៍</span>
                <p style="color: var(--text-main); font-family: var(--font-code); font-size: 0.88rem; margin: 0.2rem 0 0 0;">Set(...) &larr; បញ្ជាកត់ត្រាក្នុងអង្គចងចាំសកល</p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.7); border-left: 4px solid #a855f7; padding: 0.65rem 1rem; border-radius: 0.4rem;">
                <span style="font-size: 0.72rem; text-transform: uppercase; color: #d8b4fe; font-weight: 700;">កាំទី ៤៖ ការដាក់ឈ្មោះអថេរ</span>
                <p style="color: var(--text-main); font-family: var(--font-code); font-size: 0.88rem; margin: 0.2rem 0 0 0;">varCurrentShift</p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.7); border-left: 4px solid #10b981; padding: 0.65rem 1rem; border-radius: 0.4rem;">
                <span style="font-size: 0.72rem; text-transform: uppercase; color: #86efac; font-weight: 700;">កាំទី ៥៖ រូបមន្តពេញលេញ</span>
                <p style="color: var(--text-main); font-family: var(--font-code); font-size: 0.85rem; margin: 0.2rem 0 0 0;">Set(varCurrentShift, "Shift B")</p>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">របៀបគិតអំពីប៉ារ៉ាម៉ែត្រទាំងពីរ</h3>
            <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 0.75rem; padding: 1.25rem; margin-bottom: 1.25rem;">
              <strong style="color: #fde68a; font-size: 1.05rem;">"តើខ្ញុំទុកវានៅឯណា ហើយខ្ញុំទុកអ្វីចូលក្នុងនោះ?"</strong>
              <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.7; margin-top: 0.5rem;">
                រាល់ពេលអ្នកសរសេរ <code>Set()</code> អ្នកគ្រាន់តែឆ្លើយសំណួរសាមញ្ញពីរដែលខណ្ឌដោយសញ្ញាក្បៀសប៉ុណ្ណោះ៖
              </p>
              <ul style="color: var(--text-main); font-size: 0.88rem; padding-left: 1.2rem; margin-top: 0.5rem; line-height: 1.7;">
                <li><strong>ប៉ារ៉ាម៉ែត្រទី ១៖</strong> តើប្រអប់ផ្ទុករបស់ខ្ញុំឈ្មោះអ្វី? (<code>varCurrentShift</code>)</li>
                <li><strong>ប៉ារ៉ាម៉ែត្រទី ២៖</strong> តើខ្ញុំចង់ដាក់របស់អ្វីចូលក្នុងប្រអប់នោះ? (<code>"Shift B"</code>)</li>
              </ul>
            </div>

            <div style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 0.75rem; padding: 1rem;">
              <strong style="color: #93c5fd; font-size: 0.9rem;">ងាយស្រួល &amp; ប្រើឡើងវិញបាន៖</strong>
              <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">
                ពេលណាអ្នកចង់ប្តូរតម្លៃថ្មី គ្រាន់តែហៅ <code>Set()</code> ម្ដងទៀតជាមួយឈ្មោះដដែលនោះទៅជាការស្រេច!
              </p>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>ប៉ារ៉ាម៉ែត្រពីរ៖</strong> មើលកាំទី ៥។ Set មានតែពីរផ្នែកប៉ុណ្ណោះ៖ ឈ្មោះប្រអប់ និង របស់ដែលត្រូវដាក់ចូល។ ឱ្យសិស្សទន្ទេញចង្វាក់នេះ៖ <code>Set( ឈ្មោះប្រអប់ , របស់ដាក់ចូល )</code>។</p>`
    },

    // Slide 9: Set Syntax Dissection
    {
      "title": "ការវិភាគរូបមន្តទី ១ (Formula Breakdown 1)៖ រចនាសម្ព័ន្ធ (Structure)នៃ Set()",
      "segment": "ផ្នែកទី ៤ &bull; វិភាគរូបមន្តលម្អិត",
      "subtitle": "ការបំបែករូបមន្តដែលបង្កើត និងកែប្រែការចងចាំសកលរបស់កម្មវិធី។",
      "content": `<div class="syntax-dissection-grid">
            <div class="syntax-visual-chain">
              <div class="syntax-token-pill token-set">
                <span>Set</span>
                <span class="token-desc">បញ្ជា៖ ចងចាំ!</span>
              </div>
              <span style="font-size: 1.8rem; color: #94a3b8; font-weight: 300;">(</span>
              <div class="syntax-token-pill token-varname">
                <span>varSelectedBay</span>
                <span class="token-desc">ផ្នែក ១៖ ឈ្មោះអថេរ</span>
              </div>
              <span style="font-size: 1.8rem; color: #94a3b8; font-weight: 700;">,</span>
              <div class="syntax-token-pill token-val">
                <span>"Extruder Bay 4"</span>
                <span class="token-desc">ផ្នែក ២៖ តម្លៃត្រូវកត់ត្រា</span>
              </div>
              <span style="font-size: 1.8rem; color: #94a3b8; font-weight: 300;">)</span>
            </div>

            <div class="grid-3" style="margin-top: 0.5rem;">
              <div class="card" style="padding: 1.15rem; border-color: rgba(245, 158, 11, 0.4);">
                <strong style="color: #fbbf24; font-size: 0.95rem;">១. អនុគមន៍ <code>Set</code></strong>
                <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6; margin-top: 0.4rem;">
                  ប្រាប់ Power Apps ថា៖ <em>"បម្រុងទុកកន្លែងក្នុងអង្គចងចាំសកល ហើយដាក់តម្លៃនេះចូលភ្លាម។"</em> វាជាអនុគមន៍សកម្មភាពប្រើពេលមានព្រឹត្តិការណ៍។
                </p>
              </div>

              <div class="card" style="padding: 1.15rem; border-color: rgba(59, 130, 246, 0.4);">
                <strong style="color: #93c5fd; font-size: 0.95rem;">២. គ្មានសញ្ញាសម្រង់លើឈ្មោះអថេរ</strong>
                <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6; margin-top: 0.4rem;">
                  ចំណាំថា <code>varSelectedBay</code> គ្មានសញ្ញាសម្រង់ <code>""</code> ទេ! វាជាឈ្មោះកំប៉ុង (Identifier)។ បើដាក់សម្រង់ វានឹងច្រឡំជាអក្សរធម្មតា។
                </p>
              </div>

              <div class="card" style="padding: 1.15rem; border-color: rgba(16, 185, 129, 0.4);">
                <strong style="color: #86efac; font-size: 0.95rem;">៣. ត្រូវមានសញ្ញាសម្រង់លើអត្ថបទ</strong>
                <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6; margin-top: 0.4rem;">
                  តម្លៃ <code>"Extruder Bay 4"</code> ត្រូវតែមានសញ្ញាសម្រង់ ព្រោះវាជាអត្ថបទ (Text String)។ ចំណែកឯលេខ (ឧ. <code>42</code>) មិនបាច់ដាក់សម្រង់ឡើយ។
                </p>
              </div>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>ច្បាប់សំខាន់សម្រាប់អ្នកចាប់ផ្តើម៖</strong> "ហេតុអ្វីបានជាគ្មានសម្រង់លើឈ្មោះអថេរ? ពីព្រោះអ្នកកំពុងដាក់ឈ្មោះកំប៉ុង! អ្នកមិនដែលយកសញ្ញាសម្រង់ទៅសរសេរលើផ្លាកកំប៉ុងផ្ទះបាយរបស់អ្នកទេ។ អ្នកសរសេរឈ្មោះវាចំៗតែម្តង។"</p>`
    },

    // Slide 10: Naming Conventions
    {
      "title": "ការវិភាគរូបមន្តទី ២ (Formula Breakdown 2)៖ ស្តង់ដារដាក់ឈ្មោះបែបវិជ្ជាជីវៈ",
      "segment": "ផ្នែកទី ៤ &bull; ស្តង់ដារដាក់ឈ្មោះ",
      "subtitle": "មូលហេតុដែលអ្នកអភិវឌ្ឍន៍ Power Apps អាជីពតែងតែដាក់បុព្វបទ <code>var</code> លើអថេរសកលជានិច្ច។",
      "content": `<div class="card">
            <h3 class="card-title">ភាពច្របូកច្របល់នៃការដាក់ឈ្មោះគ្មានស្តង់ដារ</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1rem;">
              ស្រមៃថាអ្នកមានប្រអប់បញ្ចូលទិន្នន័យផ្នែក។ ហើយអ្នកក៏បង្កើតអថេរដើម្បីចងចាំវាផងដែរ។
            </p>

            <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 0.65rem; padding: 1rem; margin-bottom: 1rem;">
              <strong style="color: #fca5a5; font-size: 0.95rem;">ការភាន់ច្រឡំ៖</strong><br>
              <code style="color: #fca5a5; font-size: 0.88rem;">Department</code> &larr; តើពាក្យនេះជា Control លើអេក្រង់? ជាជួរឈរក្នុង SharePoint? ឬជាអថេរ?!
            </div>

            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              នៅពេលកូដកាន់តែច្រើន ការអង្គុយទាយឈ្មោះនាំឱ្យកើតកំហុស bug ការសរសេរជាន់គ្នា និងឈឺក្បាល!
            </p>
          </div>

          <div class="card">
            <h3 class="card-title">ស្តង់ដារស្អាតបាត <code>var</code></h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 0.75rem;">
              តែងតែដាក់អក្សរតូច <strong><code>var</code></strong> នៅខាងមុខឈ្មោះអថេរសកល រួចតដោយ CamelCase៖
            </p>

            <div style="display: flex; flex-direction: column; gap: 0.6rem;">
              <div style="background: rgba(15, 23, 42, 0.7); padding: 0.65rem 1rem; border-radius: 0.4rem; border-left: 3px solid #f59e0b;">
                <code style="color: #fbbf24; font-size: 0.9rem;">varCurrentShift</code>
                <span style="color: var(--text-muted); font-size: 0.82rem; margin-left: 0.75rem;">ផ្ទុកអត្ថបទ៖ ឧ. "Shift A"</span>
              </div>

              <div style="background: rgba(15, 23, 42, 0.7); padding: 0.65rem 1rem; border-radius: 0.4rem; border-left: 3px solid #3b82f6;">
                <code style="color: #93c5fd; font-size: 0.9rem;">varOperatorId</code>
                <span style="color: var(--text-muted); font-size: 0.82rem; margin-left: 0.75rem;">ផ្ទុកអត្ថបទ/លេខ៖ ឧ. "EMP-9021"</span>
              </div>

              <div style="background: rgba(15, 23, 42, 0.7); padding: 0.65rem 1rem; border-radius: 0.4rem; border-left: 3px solid #10b981;">
                <code style="color: #86efac; font-size: 0.9rem;">varIsEmergency</code>
                <span style="color: var(--text-muted); font-size: 0.82rem; margin-left: 0.75rem;">ផ្ទុកតម្លៃ Boolean៖ true ឬ false</span>
              </div>
            </div>

            <p style="color: #86efac; font-size: 0.85rem; margin-top: 1rem;">
              &check; ពេលណាអ្នកឃើញពាក្យ <code>var...</code> ក្នុងរូបមន្ត អ្នកដឹងភ្លាមថា៖ <em>"នេះជាអថេរដែលរក្សាទុកក្នុងអង្គចងចាំសកល!"</em>
            </p>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>ស្ថាបត្យកម្មស្អាតស្អំ៖</strong> អ្នកអភិវឌ្ឍន៍អាជីពមិនមែនសរសេរកូដឱ្យតែរួចពីដៃទេ តែសរសេរកូដឱ្យច្បាស់លាស់។ ពេលឃើញ <code>varCurrentShift</code> គឺដឹងភ្លាមដោយគ្មានមន្ទិល។</p>`
    },

    // Slide 11: Set vs. UpdateContext
    {
      "title": "ការវិភាគរូបមន្តទី ៣ (Formula Breakdown 3)៖ Global (Set) vs. Context (UpdateContext)",
      "segment": "ផ្នែកទី ៤ &bull; វិសាលភាពអថេរ",
      "subtitle": "ស្វែងយល់ពីភាពខុសគ្នារវាងក្តារខៀនរួម និងក្តារកត់ត្រាឯកជនផ្ទាល់ខ្លួន។",
      "content": `<div class="card" style="border-color: rgba(245, 158, 11, 0.4);">
            <div class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fde68a;">GLOBAL VARIABLE &bull; ចំណុចស្នូលថ្ងៃនេះ</div>
            <h3 class="card-title"><code>Set(varName, value)</code></h3>
            <p style="color: var(--text-main); font-size: 0.92rem; line-height: 1.6; margin-bottom: 0.75rem;">
              <strong>វិសាលភាព (Scope)៖</strong> ពេញមួយកម្មវិធីទាំងមូល! អាចអានបានទាំងលើ អេក្រង់ ១, អេក្រង់ ២, អេក្រង់ ៣ និងគ្រប់ទីកន្លែង។
            </p>
            <div style="background: #070a12; padding: 0.75rem; border-radius: 0.5rem; font-family: var(--font-code); color: #fbbf24; font-size: 0.85rem; margin-bottom: 0.75rem;">
              Set(varCurrentShift, "Shift B")
            </div>
            <ul style="color: var(--text-muted); font-size: 0.82rem; padding-left: 1.2rem; line-height: 1.6;">
              <li>ល្អបំផុតសម្រាប់ព័ត៌មាន Login, ផ្នែកសកម្ម, និងការកំណត់ទូទៅ។</li>
              <li>ប្រដូចទៅនឹង៖ ក្តារព័ត៌មានរួមរបស់ក្រុមហ៊ុន។</li>
              <li>Syntax សាមញ្ញមានត្រឹម ២ ប៉ារ៉ាម៉ែត្រ។</li>
            </ul>
          </div>

          <div class="card" style="border-color: rgba(139, 92, 246, 0.4);">
            <div class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c4b5fd;">CONTEXT VARIABLE &bull; សម្រាប់អេក្រង់តែមួយ</div>
            <h3 class="card-title"><code>UpdateContext({locName: value})</code></h3>
            <p style="color: var(--text-main); font-size: 0.92rem; line-height: 1.6; margin-bottom: 0.75rem;">
              <strong>វិសាលភាព (Scope)៖</strong> តែនៅលើអេក្រង់បច្ចុប្បន្នប៉ុណ្ណោះ! ពេលប្តូរទៅអេក្រង់ផ្សេង គឺមិនអាចអានបានឡើយ។
            </p>
            <div style="background: #070a12; padding: 0.75rem; border-radius: 0.5rem; font-family: var(--font-code); color: #c4b5fd; font-size: 0.85rem; margin-bottom: 0.75rem;">
              UpdateContext({locShowPopup: true})
            </div>
            <ul style="color: var(--text-muted); font-size: 0.82rem; padding-left: 1.2rem; line-height: 1.6;">
              <li>ល្អបំផុតសម្រាប់បើក/បិទផ្ទាំង Popup លើអេក្រង់នោះ។</li>
              <li>ទាមទារវង់ក្រចករាងទំពក់ <code>{ ... }</code>។</li>
              <li>ដាក់បុព្វបទដោយ <code>loc</code> (Local)។</li>
            </ul>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>កុំឱ្យសិស្សច្របូកច្របល់នឹងប្រភេទទាំងពីរ។ សម្រាប់អ្នកទើបចាប់ផ្តើម <code>Set()</code> គឺជាមិត្តល្អបំផុតព្រោះវាដំណើរការគ្រប់អេក្រង់ទាំងអស់។</p>`
    },

    // Slide 12: Reusing Variables Across Screens
    {
      "title": "ការប្រើប្រាស់អថេរឆ្លងកាត់អេក្រង់ច្រើន",
      "segment": "ផ្នែកទី ៤ &bull; លំហូរច្រើនអេក្រង់",
      "subtitle": "របៀបដែលអថេរបង្កើតលើអេក្រង់ទី ១ ជួយដំណើរការអេក្រង់ទី ២ និងទី ៣ ដោយស្វ័យប្រវត្តិ។",
      "content": `<div class="card">
            <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">អេក្រង់ ១៖ ស្វាគមន៍</span>
            <h4 style="color: var(--text-main); margin-top: 0.5rem;">អ្នកប្រើជ្រើសរើសផ្នែក</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6; margin: 0.5rem 0;">
              អ្នកប្រើវាយ "Molding Line 3" ហើយចុចប៊ូតុង ចាប់ផ្តើមវេនការងារ។
            </p>
            <div style="background: #070a12; padding: 0.75rem; border-radius: 0.5rem; font-family: var(--font-code); font-size: 0.8rem; color: #93c5fd; margin-top: auto;">
              Set(varDept, txtInput.Text);<br>
              Navigate(Screen2)
            </div>
          </div>

          <div class="card" style="border-color: var(--color-memory);">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fde68a;">អេក្រង់ ២៖ ទម្រង់ជួសជុល</span>
            <h4 style="color: var(--text-main); margin-top: 0.5rem;">ក្បាលទំព័របង្ហាញស្វ័យប្រវត្តិ</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6; margin: 0.5rem 0;">
              ស្លាកអក្សរស្វាគមន៍បុគ្គលិកភ្លាមៗ ដោយមិនបាច់សួរថាគាត់នៅផ្នែកណាទៀតឡើយ។
            </p>
            <div style="background: #070a12; padding: 0.75rem; border-radius: 0.5rem; font-family: var(--font-code); font-size: 0.8rem; color: #fde68a; margin-top: auto;">
              lblHeader.Text =<br>
              "ផ្នែកសកម្ម៖ " &amp; varDept
            </div>
          </div>

          <div class="card" style="border-color: var(--color-success);">
            <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">អេក្រង់ ៣៖ សង្ខេប</span>
            <h4 style="color: var(--text-main); margin-top: 0.5rem;">រក្សាទុកចូលក្នុង Storage</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6; margin: 0.5rem 0;">
              ពេលរក្សាទុករបាយការណ៍ចុងក្រោយ អថេរត្រូវបានបញ្ជូនចូលទៅកាន់ database ស្វ័យប្រវត្តិ។
            </p>
            <div style="background: #070a12; padding: 0.75rem; border-radius: 0.5rem; font-family: var(--font-code); font-size: 0.8rem; color: #86efac; margin-top: auto;">
              Department: varDept,<br>
              Status: "Pending"
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>ចង្អុលបង្ហាញសញ្ញាចុចក្បៀស (Semicolon)៖</strong> សញ្ញា <code>;</code> នៅលើអេក្រង់ទី ១ អនុញ្ញាតឱ្យយើងតសកម្មភាពពីរ៖ ដំបូងកត់ត្រាតម្លៃចូលអថេរ រួចហើយទើបផ្លាស់ប្តូរទៅកាន់អេក្រង់បន្ទាប់!</p>`
    },

    // Slide 13: Interactive Widget 1: Variable Memory Bank Inspector
    {
      "title": "ឧបករណ៍អន្តរកម្មទី ១៖ ឧបករណ៍ត្រួតពិនិត្យធនាគារចងចាំ RAM",
      "segment": "ផ្នែកទី ៤ &bull; ធនាគារចងចាំអន្តរកម្ម",
      "subtitle": "ចុចលើប៊ូតុងដើម្បីដំណើរការរូបមន្ត Set() និងទស្សនាការផ្លាស់ប្តូរតម្លៃក្នុងតារាង RAM ផ្ទាល់ភ្នែក។",
      "content": `<div class="widget-stage">
            <div class="inspector-menu">
              <div class="inspector-tab active" data-action="set-shift-a" onclick="selectMemoryAction('set-shift-a')">
                <span style="font-size: 1.2rem; color: #f59e0b;">&#128394;</span>
                <div>
                  <strong style="font-size: 0.88rem; color: var(--text-main);">សកម្មភាព ១៖ កំណត់ Shift A</strong>
                  <p style="font-size: 0.75rem; color: var(--text-muted); margin: 0;">Set(varShift, "Morning")</p>
                </div>
              </div>

              <div class="inspector-tab" data-action="set-shift-b" onclick="selectMemoryAction('set-shift-b')">
                <span style="font-size: 1.2rem; color: #3b82f6;">&#128394;</span>
                <div>
                  <strong style="font-size: 0.88rem; color: var(--text-main);">សកម្មភាព ២៖ កំណត់ Shift B</strong>
                  <p style="font-size: 0.75rem; color: var(--text-muted); margin: 0;">Set(varShift, "Evening")</p>
                </div>
              </div>

              <div class="inspector-tab" data-action="set-counter" onclick="selectMemoryAction('set-counter')">
                <span style="font-size: 1.2rem; color: #10b981;">&#43;</span>
                <div>
                  <strong style="font-size: 0.88rem; color: var(--text-main);">សកម្មភាព ៣៖ បង្កើនលេខរាប់</strong>
                  <p style="font-size: 0.75rem; color: var(--text-muted); margin: 0;">Set(varCount, varCount + 1)</p>
                </div>
              </div>

              <div class="inspector-tab" data-action="clear-memory" onclick="selectMemoryAction('clear-memory')">
                <span style="font-size: 1.2rem; color: #ef4444;">&#10006;</span>
                <div>
                  <strong style="font-size: 0.88rem; color: var(--text-main);">សកម្មភាព ៤៖ សម្អាតចងចាំ</strong>
                  <p style="font-size: 0.75rem; color: var(--text-muted); margin: 0;">Set(varShift, Blank())</p>
                </div>
              </div>
            </div>

            <div class="inspector-display">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                <h4 style="color: var(--color-memory); margin: 0;" id="mem-inspector-title">រូបមន្តសកម្ម៖ Set(varShift, "Morning")</h4>
                <span class="card-badge" id="mem-status-badge" style="background: rgba(245, 158, 11, 0.2); color: #fde68a;">RAM ត្រូវបានធ្វើបច្ចុប្បន្នភាព</span>
              </div>

              <div style="background: #070a12; border-radius: 0.65rem; padding: 1.15rem; font-family: var(--font-code); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.2rem;" id="mem-code-display">
                <span style="color: #fbbf24;">Set</span>( <span style="color: #93c5fd;">varShift</span>, <span style="color: #86efac;">"Morning"</span> )
              </div>

              <strong style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem;">Power Apps Studio &bull; តារាងអង្គចងចាំ Variables៖</strong>
              <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; background: rgba(7, 10, 18, 0.6); border-radius: 0.5rem; overflow: hidden;">
                <thead>
                  <tr style="border-bottom: 1px solid var(--border-subtle); color: #94a3b8; text-align: left;">
                    <th style="padding: 0.6rem 0.85rem;">ឈ្មោះអថេរ (Name)</th>
                    <th style="padding: 0.6rem 0.85rem;">ប្រភេទ (Type)</th>
                    <th style="padding: 0.6rem 0.85rem;">តម្លៃបច្ចុប្បន្នក្នុង RAM</th>
                  </tr>
                </thead>
                <tbody id="mem-table-body">
                  <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.04);">
                    <td style="padding: 0.6rem 0.85rem; font-family: var(--font-code); color: #93c5fd;">varShift</td>
                    <td style="padding: 0.6rem 0.85rem; color: var(--text-dim);">Text</td>
                    <td style="padding: 0.6rem 0.85rem; font-family: var(--font-code); color: #86efac;" id="val-shift">"Morning"</td>
                  </tr>
                  <tr>
                    <td style="padding: 0.6rem 0.85rem; font-family: var(--font-code); color: #93c5fd;">varCount</td>
                    <td style="padding: 0.6rem 0.85rem; color: var(--text-dim);">Number</td>
                    <td style="padding: 0.6rem 0.85rem; font-family: var(--font-code); color: #86efac;" id="val-count">0</td>
                  </tr>
                </tbody>
              </table>

              <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: auto; line-height: 1.6;" id="mem-explanation">
                ការដំណើរការ <code>Set(varShift, "Morning")</code> ផ្លាស់ប្តូរតម្លៃក្នុងអង្គចងចាំភ្លាមៗ។ រាល់ស្លាកអក្សរ ឬរូបមន្តណាដែលប្រើប្រាស់ <code>varShift</code> ទូទាំង App នឹងគណនាឡើងវិញដោយស្វ័យប្រវត្តិ។
              </p>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>ចុចលើសកម្មភាពទី ៣ (Increment Counter) ៣-៤ ដង។ បង្ហាញសិស្សឱ្យឃើញលេខរាប់កើនឡើងពី ០ ទៅ ១, ២, ៣! ពន្យល់ថាអថេរអាចរាប់ចំនួនដងនៃការចុច ឬចំនួនកំហុសបាន។</p>`
    },

    // Slide 14: Trainer Demonstration
    {
      "title": "ការបង្ហាញផ្ទាល់ពីគ្រូ៖ ការបង្កើត varSelectedDept",
      "segment": "ផ្នែកទី ៥ &bull; ការបង្ហាញផ្ទាល់ពីគ្រូ",
      "subtitle": "ទស្សនាការអនុវត្តជាក់ស្តែងជំហានម្តងមួយៗ ក្នុងការសរសេររូបមន្ត Set() លើប៊ូតុងក្នុង Power Apps Studio។",
      "content": `<div class="card">
            <h3 class="card-title">៥ ជំហាននៃការបង្ហាញផ្ទាល់</h3>

            <div style="display: flex; flex-direction: column; gap: 0.8rem;">
              <div style="display: flex; gap: 0.85rem; align-items: flex-start;">
                <span class="obj-num">1</span>
                <div>
                  <strong style="color: var(--text-main); font-size: 0.9rem;">បញ្ចូលប៊ូតុង &amp; ដាក់ឈ្មោះ <code>btnExtruder</code>៖</strong>
                  <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.15rem 0 0 0;">កំណត់អត្ថបទលើប៊ូតុងថា <em>"Line 4 - Extruder Bay"</em>។</p>
                </div>
              </div>

              <div style="display: flex; gap: 0.85rem; align-items: flex-start;">
                <span class="obj-num">2</span>
                <div>
                  <strong style="color: var(--text-main); font-size: 0.9rem;">ជ្រើសរើស Property <code>OnSelect</code>៖</strong>
                  <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.15rem 0 0 0;">ជ្រើសរើសព្រឹត្តិការណ៍ចុចលើ Formula Bar ខាងលើឆ្វេង។</p>
                </div>
              </div>

              <div style="display: flex; gap: 0.85rem; align-items: flex-start;">
                <span class="obj-num">3</span>
                <div>
                  <strong style="color: var(--text-main); font-size: 0.9rem;">សរសេររូបមន្តកត់ត្រាការចងចាំ៖</strong>
                  <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.15rem 0 0 0;">វាយបញ្ចូលរូបមន្ត <code>Set(varSelectedDept, "Line 4 - Extruder")</code>។</p>
                </div>
              </div>

              <div style="display: flex; gap: 0.85rem; align-items: flex-start;">
                <span class="obj-num">4</span>
                <div>
                  <strong style="color: var(--text-main); font-size: 0.9rem;">បន្ថែម Label ដើម្បីអានការចងចាំ៖</strong>
                  <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.15rem 0 0 0;">ដាក់ Label មួយហើយកំណត់ Text ថា <code>"សកម្ម៖ " &amp; varSelectedDept</code>។</p>
                </div>
              </div>

              <div style="display: flex; gap: 0.85rem; align-items: flex-start;">
                <span class="obj-num">5</span>
                <div>
                  <strong style="color: var(--text-main); font-size: 0.9rem;">ចុច <kbd style="background: #1e293b; padding: 2px 6px; border-radius: 4px; border: 1px solid #475569;">Alt</kbd> ជាប់ &amp; ចុចប៊ូតុង៖</strong>
                  <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.15rem 0 0 0;">ទស្សនាស្លាកអក្សរបង្ហាញតម្លៃដែលទើបតែកត់ត្រាបានភ្លាមៗ!</p>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">Formula Bar &amp; បន្ទះ Variables ក្នុង Studio</h3>

            <div style="background: #0f172a; border: 1px solid var(--border-subtle); border-radius: 0.75rem; padding: 1rem; margin-bottom: 1rem;">
              <div style="display: flex; align-items: center; gap: 0.75rem; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 0.5rem; margin-bottom: 0.75rem;">
                <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-memory);">Property:</span>
                <span style="font-family: var(--font-code); font-size: 0.85rem; color: #fbbf24;">OnSelect</span>
              </div>
              <pre style="margin: 0; font-family: var(--font-code); font-size: 0.85rem; color: #e2e8f0; line-height: 1.6;"><code>Set(
  varSelectedDept,
  "Line 4 - Extruder"
);
Notify(
  "ផ្នែកត្រូវបានកត់ត្រាក្នុងអង្គចងចាំ!",
  NotificationType.Information
)</code></pre>
            </div>

            <div style="background: rgba(245, 158, 11, 0.1); border-radius: 0.5rem; padding: 0.75rem; border: 1px solid rgba(245, 158, 11, 0.25);">
              <strong style="color: #fbbf24; font-size: 0.85rem;">កន្លែងស្វែងរក Variables ក្នុង Studio៖</strong>
              <p style="color: var(--text-muted); font-size: 0.8rem; margin: 0.2rem 0 0 0;">
                ចុចលើរូបតំណាង <strong>Variables ( {x} )</strong> នៅរបារខាងឆ្វេងក្នុង Studio។ អ្នកនឹងឃើញរាល់អថេរទាំងអស់ រួមជាមួយតម្លៃផ្ទាល់របស់វា!
              </p>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>បង្ហាញរូបតំណាង <code>{x}</code> នៅរបារចំហៀងខាងឆ្វេងក្នុង Studio។ សិស្សនឹងរំភើបចិត្តពេលឃើញអថេររបស់ខ្លួនលេចឡើងក្នុងបញ្ជីប្រព័ន្ធពិតប្រាកដ។</p>`
    },

    // Slide 15: Guided Practice
    {
      "title": "ការអនុវត្តរួមគ្នា៖ ការកសាងស្លាកសម្គាល់វេនការងារ",
      "segment": "ផ្នែកទី ៥ &bull; អនុវត្តរួមគ្នា",
      "subtitle": "ឥឡូវនេះ សូមបើក Power Apps Canvas របស់អ្នក ហើយអនុវត្តតាមគ្រូជំហានម្តងមួយៗ។",
      "content": `<div class="card">
            <h3 class="card-title">សេចក្តីណែនាំអំពីកិច្ចការ</h3>
            <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin-bottom: 1rem;">
              កសាងស្លាកជ្រើសរើសវេនការងារស្វ័យប្រវត្តិ សម្រាប់ Tablet ក្នុងរោងចក្រ Apex Plastics៖
            </p>

            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <div style="background: rgba(15, 23, 42, 0.7); padding: 0.75rem; border-radius: 0.5rem; border: 1px solid var(--border-subtle);">
                <strong style="color: var(--text-main); font-size: 0.88rem;">ជំហានទី ១៖ បញ្ចូលប៊ូតុងវេនការងារ ២</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.15rem 0 0 0;">ដាក់ឈ្មោះថា <code>btnMorning</code> និង <code>btnNight</code>។</p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.7); padding: 0.75rem; border-radius: 0.5rem; border: 1px solid var(--border-subtle);">
                <strong style="color: var(--text-main); font-size: 0.88rem;">ជំហានទី ២៖ សរសេររូបមន្ត Set()</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.15rem 0 0 0;">ប៊ូតុងថ្ងៃកំណត់ <code>"Shift A - វេនថ្ងៃ"</code>; ប៊ូតុងយប់កំណត់ <code>"Shift B - វេនយប់"</code>។</p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.7); padding: 0.75rem; border-radius: 0.5rem; border: 1px solid var(--border-subtle);">
                <strong style="color: var(--text-main); font-size: 0.88rem;">ជំហានទី ៣៖ បន្ថែម Label បង្ហាញតម្លៃ</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.15rem 0 0 0;">បង្ហាញតម្លៃអថេរដោយប្រើសញ្ញា <code>&amp;</code>។</p>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">រូបមន្តគោលដៅដែលត្រូវសរសេរ</h3>

            <div style="background: #070a12; border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 0.75rem; padding: 1rem; font-family: var(--font-code); font-size: 0.82rem; line-height: 1.6; margin-bottom: 0.75rem;">
              <span style="color: #64748b;">// btnMorning.OnSelect:</span><br>
              <span style="color: #fbbf24;">Set(varCurrentShift, "Shift A - វេនថ្ងៃ")</span><br><br>
              <span style="color: #64748b;">// btnNight.OnSelect:</span><br>
              <span style="color: #fbbf24;">Set(varCurrentShift, "Shift B - វេនយប់")</span><br><br>
              <span style="color: #64748b;">// lblActiveBadge.Text:</span><br>
              <span style="color: #86efac;">"វេនសកម្ម៖ " &amp; varCurrentShift</span>
            </div>

            <div style="background: rgba(16, 185, 129, 0.1); border-radius: 0.5rem; padding: 0.75rem; border: 1px solid rgba(16, 185, 129, 0.25);">
              <strong style="color: #86efac; font-size: 0.85rem;">បញ្ជីផ្ទៀងផ្ទាត់ភាពជោគជ័យ៖</strong>
              <p style="color: var(--text-muted); font-size: 0.8rem; margin: 0.2rem 0 0 0;">
                ចុច "វេនថ្ងៃ" &rarr; តើស្លាកអក្សរប្តូរទៅ "វេនសកម្ម៖ Shift A - វេនថ្ងៃ" ដែរឬទេ? ចុច "វេនយប់" &rarr; តើវាប្តូរភ្លាមៗមែនទេ? បើត្រូវ សូមលើកមេដៃបញ្ជាក់!
              </p>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>ជួយសម្រួលសិស្សណាដែលច្រឡំដាក់សម្រង់លើឈ្មោះអថេរ (<code>Set("varCurrentShift", ...)</code>)។ រំលឹកថាឈ្មោះអថេរមិនបាច់ដាក់សញ្ញាសម្រង់ទេ។</p>`
    },

    // Slide 16: Interactive Widget 2: Live Multi-Screen Simulator
    {
      "title": "ឧបករណ៍អន្តរកម្មទី ២៖ កម្មវិធីត្រាប់តាមការចងចាំច្រើនអេក្រង់",
      "segment": "ផ្នែកទី ៦ &bull; បន្ទប់ពិសោធន៍អន្តរកម្ម",
      "subtitle": "ទទួលបទពិសោធន៍ផ្ទាល់ពីរបៀបដែលអថេរបញ្ជូនទិន្នន័យឆ្លងកាត់អេក្រង់ទាំងពីរក្នុងពេលជាក់ស្តែង។",
      "content": `<div class="mock-screens-stage">
            <div class="mock-screen active-focus" id="sim-screen-1">
              <div class="mock-screen-header">
                <span style="font-size: 0.8rem; font-weight: 700; color: #fbbf24;">អេក្រង់ ១៖ ជ្រើសរើសវេន</span>
                <span style="font-size: 0.7rem; color: var(--text-dim);">Apex Plastics App</span>
              </div>
              <div class="mock-screen-body">
                <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">ជ្រើសរើសវេនការងារដើម្បីកត់ត្រាក្នុងអង្គចងចាំ៖</p>

                <button type="button" class="sample-button-control" onclick="setSimShift('Shift A (Day)', 'Line 1')">
                  ជ្រើសរើស Shift A (វេនថ្ងៃ)
                </button>
                <button type="button" class="sample-button-control" style="background: linear-gradient(135deg, #2563eb, #1d4ed8);" onclick="setSimShift('Shift B (Night)', 'Line 4')">
                  ជ្រើសរើស Shift B (វេនយប់)
                </button>
                <button type="button" class="sample-button-control" style="background: linear-gradient(135deg, #059669, #047857);" onclick="setSimShift('Weekend Crew', 'Line 2')">
                  ជ្រើសរើស ក្រុមចុងសប្តាហ៍
                </button>
              </div>
            </div>

            <div class="memory-tunnel-arrow">
              <span>&rarr;</span>
              <span style="font-size: 0.65rem; color: #fbbf24; text-transform: uppercase; writing-mode: vertical-rl; letter-spacing: 2px; margin-top: 0.5rem;">RAM Memory</span>
            </div>

            <div class="mock-screen" id="sim-screen-2">
              <div class="mock-screen-header">
                <span style="font-size: 0.8rem; font-weight: 700; color: #60a5fa;">អេក្រង់ ២៖ បញ្ជីការងារ</span>
                <span class="card-badge" id="sim-mem-badge" style="background: rgba(245, 158, 11, 0.2); color: #fde68a; margin: 0; padding: 2px 8px; font-size: 0.7rem;">varShift: គ្មាន</span>
              </div>
              <div class="mock-screen-body">
                <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid var(--border-subtle); border-radius: 0.5rem; padding: 0.85rem;">
                  <strong style="color: var(--text-main); font-size: 0.9rem;" id="sim-screen2-header">សូមស្វាគមន៍! មិនទាន់ជ្រើសរើសវេននៅឡើយ។</strong>
                  <p style="color: var(--text-muted); font-size: 0.8rem; margin: 0.25rem 0 0 0;" id="sim-screen2-desc">
                    ទីតាំងម៉ាស៊ីន៖ សូមជ្រើសរើសវេនការងារលើអេក្រង់ទី ១ ជាមុនសិន។
                  </p>
                </div>

                <div style="background: #070a12; border-radius: 0.5rem; padding: 0.75rem; border: 1px solid var(--border-subtle); font-family: var(--font-code); font-size: 0.75rem; color: #94a3b8; flex: 1;">
                  <p style="color: var(--color-memory); margin: 0 0 4px 0;">[កំណត់ត្រាដំណើរការអេក្រង់ទី ២]</p>
                  <p style="margin: 0;" id="sim-screen2-log">&bull; កំពុងរង់ចាំការកត់ត្រាអថេរពីអេក្រង់ទី ១...</p>
                </div>
              </div>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>ចុចលើ "Shift B (Night)"។ បង្ហាញសិស្សឱ្យឃើញថា អេក្រង់ទី ២ ធ្វើបច្ចុប្បន្នភាពក្បាលទំព័រ ស្លាក badge និងកំណត់ត្រាភ្លាមៗដោយស្វ័យប្រវត្តិ។ នេះជាការចែករំលែកទិន្នន័យឆ្លងអេក្រង់ពិតប្រាកដ!</p>`
    },

    // Slide 17: 5 Dangerous Misconceptions
    {
      "title": "ការយល់ច្រឡំគ្រោះថ្នាក់ ៥ យ៉ាង និងការពិតក្នុង Power Fx",
      "segment": "ផ្នែកទី ៦ &bull; កែតម្រូវការយល់ច្រឡំ",
      "subtitle": "ជៀសវាងអន្ទាក់ទូទៅទាំង ៥ នេះ មុនពេលវាធ្វើឱ្យកើតកំហុស bug ឬបាត់បង់ទិន្នន័យ។",
      "content": `<div class="card">
            <div style="display: flex; flex-direction: column; gap: 0.85rem;">
              <div style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; padding: 0.75rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5; font-size: 0.88rem;">ការយល់ច្រឡំទី ១៖ "អថេរជួយ Save ទិន្នន័យទុកក្នុង SharePoint អចិន្ត្រៃយ៍។"</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.2rem 0 0 0;">
                  <strong>ការពិត៖</strong> មិនពិតទេ! អថេររស់នៅតែក្នុង RAM នៃទូរស័ព្ទប៉ុណ្ណោះ។ ពេលអ្នកប្រើបិទ App ឬ Refresh អថេរនឹងត្រូវលុបស្អាត!
                </p>
              </div>

              <div style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; padding: 0.75rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5; font-size: 0.88rem;">ការយល់ច្រឡំទី ២៖ "ឈ្មោះអថេរត្រូវតែដាក់សម្រង់ Set(\"varX\", 10)។"</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.2rem 0 0 0;">
                  <strong>ការពិត៖</strong> កុំដាក់សញ្ញាសម្រង់លើឈ្មោះអថេរឱ្យសោះ! វាជាឈ្មោះកំប៉ុង (Identifier)។ ត្រូវសរសេរ <code>Set(varX, 10)</code>។
                </p>
              </div>

              <div style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; padding: 0.75rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5; font-size: 0.88rem;">ការយល់ច្រឡំទី ៣៖ "ត្រូវប្រកាសអថេរមុន (Declare) ដូចក្នុង C++ ឬ Java។"</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.2rem 0 0 0;">
                  <strong>ការពិត៖</strong> ក្នុង Power Apps អ្នកមិនបាច់ប្រកាសអថេរជាមុនទេ។ ពេលកូដជួប <code>Set(varNew, 1)</code> វានឹងបង្កើតអថេរនោះភ្លាម!
                </p>
              </div>
            </div>
          </div>

          <div class="card">
            <div style="display: flex; flex-direction: column; gap: 0.85rem;">
              <div style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; padding: 0.75rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5; font-size: 0.88rem;">ការយល់ច្រឡំទី ៤៖ "អថេរអាចផ្ទុកបានតែអត្ថបទធម្មតាប៉ុណ្ណោះ។"</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.2rem 0 0 0;">
                  <strong>ការពិត៖</strong> អថេរអាចផ្ទុកបានទាំង អត្ថបទ, លេខ, Boolean (True/False), កាលបរិច្ឆេទ, Record មួយជួរ, និងតារាង Table ទាំងមូល!
                </p>
              </div>

              <div style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; padding: 0.75rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5; font-size: 0.88rem;">ការយល់ច្រឡំទី ៥៖ "អ្នកដទៃលើទូរស័ព្ទផ្សេងអាចមើលឃើញអថេររបស់ខ្ញុំ។"</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.2rem 0 0 0;">
                  <strong>ការពិត៖</strong> អថេរគឺជាការចងចាំផ្ទាល់ខ្លួន ១០០% លើឧបករណ៍របស់អ្នកប្រើនោះ។ វាមិនដែលចែករំលែកឆ្លងឧបករណ៍ឡើយ (SharePoint ទើបចែករំលែកបាន)។
                </p>
              </div>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>សង្កត់ធ្ងន់លើចំណុច ១ និង ៥៖ អថេរមិនមែនជាមូលដ្ឋានទិន្នន័យទេ។ អថេរគ្រាន់តែជាក្រដាសកត់ចំណាំបណ្តោះអាសន្នក្នុងដៃរបស់អ្នកប្រើម្នាក់នោះប៉ុណ្ណោះ។ ថ្ងៃស្អែកទើបយើងរៀនទិន្នន័យរួមក្នុង SharePoint។</p>`
    },

    // Slide 18: Knowledge Check 1
    {
      "title": "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង៖ គោលបំណងចម្បងនៃអថេរ",
      "segment": "ផ្នែកទី ៧ &bull; សំណួរផ្ទៀងផ្ទាត់ ១ នៃ ៥",
      "subtitle": "សាកល្បងការយល់ដឹងជាមូលដ្ឋានរបស់អ្នកអំពីអង្គចងចាំរបស់កម្មវិធី។",
      "content": `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fde68a;">សំណួរទី ១</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                ហេតុអ្វីបានជាយើងប្រើប្រាស់អថេរ (Variable) ក្នុង Microsoft Power Apps ជាជាងការពឹងផ្អែកតែលើ Controls លើអេក្រង់?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'A', false, this)">
                  <strong>A.</strong> <span>ដើម្បីរក្សាទុកឯកសារប្រវត្តិសាស្រ្តជាអចិន្ត្រៃយ៍រាប់ឆ្នាំក្នុង Cloud</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'B', true, this)">
                  <strong>B.</strong> <span>ដើម្បីចងចាំតម្លៃបណ្តោះអាសន្នក្នុង RAM ដើម្បីឱ្យអេក្រង់ និងរូបមន្តផ្សេងៗអាចយកទៅប្រើឡើងវិញបាន</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'C', false, this)">
                  <strong>C.</strong> <span>ដើម្បីបកប្រែភាសាពីអង់គ្លេសមកខ្មែរស្វ័យប្រវត្តិ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'D', false, this)">
                  <strong>D.</strong> <span>ដើម្បីបង្កើនកម្រិតភាគរយថ្មលើ Tablet របស់បុគ្គលិក</span>
                </button>
              </div>
            </div>

            <div class="quiz-feedback" id="quiz-feedback-1">
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                <span class="card-badge" id="quiz-badge-1" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                <strong style="color: var(--text-main);" id="quiz-status-1">ពូកែណាស់!</strong>
              </div>
              <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                អថេរដើរតួជាធនាគារចងចាំបណ្តោះអាសន្នរបស់ App ក្នុង RAM។ វាអនុញ្ញាតឱ្យអេក្រង់ផ្សេងៗ រូបមន្ត និងសកម្មភាពនានា ចែករំលែកទិន្នន័យជាមួយគ្នាបានដោយមិនបាច់សួរអ្នកប្រើម្តងហើយម្តងទៀត។
              </p>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>បញ្ជាក់ពីភាពខុសគ្នារវាង RAM បណ្តោះអាសន្ន និង Cloud អចិន្ត្រៃយ៍។</p>`
    },

    // Slide 19: Knowledge Check 2 (Why)
    {
      "title": "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង៖ ហេតុអ្វីបានជាប្រើបុព្វបទ var?",
      "segment": "ផ្នែកទី ៧ &bull; សំណួរផ្ទៀងផ្ទាត់ ២ នៃ ៥",
      "subtitle": "ការវាយតម្លៃលើស្តង់ដាររៀបចំកូដបែបវិជ្ជាជីវៈ និងភាពងាយស្រួលក្នុងការអាន។",
      "content": `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fde68a;">សំណួរទី ២ &bull; សំណួរស្វែងយល់ហេតុផល 'Why'</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                ហេតុអ្វីបានជាស្ថាបត្យករ Power Apps អាជីពតែងតែដាក់បុព្វបទ <code>var</code> លើអថេរសកលជានិច្ច (ឧ. <code>varCurrentShift</code>)?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'A', false, this)">
                  <strong>A.</strong> <span>ពីព្រោះ Power Apps នឹងគាំងបើឈ្មោះអថេរមិនចាប់ផ្តើមដោយ 'var'</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'B', true, this)">
                  <strong>B.</strong> <span>ដើម្បីសម្គាល់អថេរដាច់ពី Controls និងជួរឈរ SharePoint ភ្លាមៗ ជៀសវាងការភាន់ច្រឡំ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'C', false, this)">
                  <strong>C.</strong> <span>ពីព្រោះវាជួយឱ្យកម្មវិធីដំណើរការលឿនជាងមុន ៥០% លើប្រព័ន្ធ 4G</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'D', false, this)">
                  <strong>D.</strong> <span>ដើម្បីលាក់អថេរមិនឱ្យ Microsoft ពិនិត្យឃើញ</span>
                </button>
              </div>
            </div>

            <div class="quiz-feedback" id="quiz-feedback-2">
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                <span class="card-badge" id="quiz-badge-2" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                <strong style="color: var(--text-main);" id="quiz-status-2">ស្តង់ដារស្អាតបាតត្រឹមត្រូវ!</strong>
              </div>
              <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                ភាពច្បាស់លាស់គឺជាស្តេច! បុព្វបទ <code>var</code> គឺជាស្តង់ដារជាសកលដែលធានាថា រាល់អ្នកអភិវឌ្ឍន៍ណាដែលអានកូដរបស់អ្នកនឹងដឹងភ្លាមថា៖ <em>"នេះជាអថេរសកល មិនមែនជាប៊ូតុង ឬទិន្នន័យ SharePoint ឡើយ។"</em>
              </p>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>បញ្ជាក់ប្រាប់សិស្សថា Power Apps មិនបង្ខំទេ ប៉ុន្តែអ្នកជំនាញតែងតែធ្វើបែបនេះដើម្បីកុំឱ្យវង្វេង។</p>`
    },

    // Slide 20: Knowledge Check 3
    {
      "title": "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង៖ អនុគមន៍បង្កើតអថេរសកល",
      "segment": "ផ្នែកទី ៧ &bull; សំណួរផ្ទៀងផ្ទាត់ ៣ នៃ ៥",
      "subtitle": "ផ្ទៀងផ្ទាត់ការចងចាំឈ្មោះអនុគមន៍ចងចាំក្នុង Power Fx។",
      "content": `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fde68a;">សំណួរទី ៣</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                តើអនុគមន៍ Power Fx មួយណាត្រូវបានប្រើដើម្បីបង្កើត និងកែប្រែតម្លៃអថេរសកល (Global Variable) ដែលអាចប្រើបានគ្រប់អេក្រង់?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'A', true, this)">
                  <strong>A.</strong> <span><code>Set(VariableName, Value)</code></span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'B', false, this)">
                  <strong>B.</strong> <span><code>Notify(VariableName, Value)</code></span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'C', false, this)">
                  <strong>C.</strong> <span><code>IsBlank(VariableName, Value)</code></span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'D', false, this)">
                  <strong>D.</strong> <span><code>SaveMemory(VariableName, Value)</code></span>
                </button>
              </div>
            </div>

            <div class="quiz-feedback" id="quiz-feedback-3">
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                <span class="card-badge" id="quiz-badge-3" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                <strong style="color: var(--text-main);" id="quiz-status-3">ចាំរូបមន្តបានច្បាស់!</strong>
              </div>
              <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                អនុគមន៍ <code>Set()</code> គឺជាពាក្យបញ្ជាផ្លូវការរបស់ Power Fx សម្រាប់អថេរសកល។ វាត្រូវការប៉ារ៉ាម៉ែត្រពីរ៖ ឈ្មោះអថេរ និងតម្លៃដែលអ្នកចង់កំណត់។
              </p>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>រំលឹកសិស្ស៖ <code>Set</code> គឺខ្លី ច្បាស់ និងងាយចាំ។</p>`
    },

    // Slide 21: Knowledge Check 4 (What Happens If)
    {
      "title": "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង៖ ចុះបើអ្នកប្រើបិទ App ចោល?",
      "segment": "ផ្នែកទី ៧ &bull; សំណួរផ្ទៀងផ្ទាត់ ៤ នៃ ៥",
      "subtitle": "ការស៊ើបអង្កេតអាយុកាលនៃអង្គចងចាំ RAM ធៀបនឹងមូលដ្ឋានទិន្នន័យអចិន្ត្រៃយ៍។",
      "content": `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fde68a;">សំណួរទី ៤ &bull; សំណួរស្វែងយល់អាកប្បកិរិយា 'What Happens If'</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                បុគ្គលិកជ្រើសរើស "Shift B" និងកំណត់អថេរ <code>varShift</code>។ បន្ទាប់មកគាត់បិទ Power Apps ទាំងស្រុងហើយត្រឡប់ទៅផ្ទះ។ ព្រឹកស្អែកពេលគាត់បើក App ឡើងវិញ តើ <code>varShift</code> មានតម្លៃអ្វី?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'A', false, this)">
                  <strong>A.</strong> <span>នៅតែ "Shift B" ដដែល ព្រោះអថេររក្សាទុកក្នុង SharePoint ស្វ័យប្រវត្តិ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'B', false, this)">
                  <strong>B.</strong> <span>វាក្លាយជាកំហុស Error ព្រោះអថេរហួសសុពលភាពពេលយប់</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'C', true, this)">
                  <strong>C.</strong> <span>វាទទេស្អាត (<strong>Blank()</strong>) ពីព្រោះអថេរត្រូវលុបចោលពេលចប់ Session នៃ App</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'D', false, this)">
                  <strong>D.</strong> <span>Power Apps ផ្ញើអ៊ីមែលសួរថាតើអថេរនោះឈ្មោះអ្វី</span>
                </button>
              </div>
            </div>

            <div class="quiz-feedback" id="quiz-feedback-4">
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                <span class="card-badge" id="quiz-badge-4" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                <strong style="color: var(--text-main);" id="quiz-status-4">យល់ដឹងស៊ីជម្រៅ!</strong>
              </div>
              <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                អថេររស់នៅក្នុង RAM បណ្តោះអាសន្ន! ពេលបិទ App ក្រដាសស្អិតត្រូវបានរហែកចោល។ បើអ្នកចង់ឱ្យទិន្នន័យនៅគង់វង្សដល់ថ្ងៃស្អែក អ្នកត្រូវតែរក្សាទុកវាចូលទៅក្នុង Database ដូចជា SharePoint (មេរៀនថ្ងៃស្អែក ថ្ងៃទី ១៩!)។
              </p>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>ស្ពានតភ្ជាប់ដ៏ល្អឥតខ្ចោះ៖ បង្ហាញសិស្សថា សំណួរទី ៤ នេះជាស្ពាននាំទៅមេរៀនថ្ងៃស្អែក។ បើអថេរបាត់បង់ពេលបិទ App តើយើងធ្វើដូចម្តេចដើម្បីទុកទិន្នន័យបានរាប់ឆ្នាំ? ចម្លើយគឺ SharePoint (ថ្ងៃទី ១៩)!</p>`
    },

    // Slide 22: Knowledge Check 5
    {
      "title": "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង៖ ភាពត្រឹមត្រូវនៃ Syntax",
      "segment": "ផ្នែកទី ៧ &bull; សំណួរផ្ទៀងផ្ទាត់ ៥ នៃ ៥",
      "subtitle": "ផ្ទៀងផ្ទាត់ភាពត្រឹមត្រូវនៃការប្រើប្រាស់សញ្ញាសម្រង់ និងឈ្មោះអថេរ។",
      "content": `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fde68a;">សំណួរទី ៥</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                តើជួរកូដ Power Fx មួយណាដែលកត់ត្រាអត្ថបទ "Extruder 4" ចូលទៅក្នុងអថេរឈ្មោះ <code>varDept</code> បានយ៉ាងត្រឹមត្រូវ?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(5, 'A', false, this)">
                  <strong>A.</strong> <span><code>Set("varDept", "Extruder 4")</code></span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(5, 'B', false, this)">
                  <strong>B.</strong> <span><code>varDept = "Extruder 4"</code></span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(5, 'C', true, this)">
                  <strong>C.</strong> <span><code>Set(varDept, "Extruder 4")</code></span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(5, 'D', false, this)">
                  <strong>D.</strong> <span><code>UpdateVariable(varDept: "Extruder 4")</code></span>
                </button>
              </div>
            </div>

            <div class="quiz-feedback" id="quiz-feedback-5">
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                <span class="card-badge" id="quiz-badge-5" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                <strong style="color: var(--text-main);" id="quiz-status-5">សម្រេចជោគជ័យ ១០០%!</strong>
              </div>
              <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                ជម្រើស C គឺត្រឹមត្រូវ! អនុគមន៍គឺ <code>Set()</code>, ឈ្មោះអថេរ <code>varDept</code> គ្មានសម្រង់, ហើយអត្ថបទ <code>"Extruder 4"</code> ត្រូវព័ទ្ធជុំវិញដោយសញ្ញាសម្រង់ទ្វេ។
              </p>
            </div>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>អបអរសាទរចំពោះសិស្ស។ បញ្ជាក់ថាជម្រើស B (<code>varDept = ...</code>) គឺជាកំហុសទូទៅរបស់អ្នកដែលធ្លាប់រៀន Python ឬ JavaScript ប៉ុន្តែក្នុង Power Fx យើងប្រើ <code>Set()</code>។</p>`
    },

    // Slide 23: Capstone Challenge & Rubric
    {
      "title": "កិច្ចការប្រឡងបញ្ចប់៖ ប្រព័ន្ធស្លាកសម្គាល់វេនការងារឆ្លងអេក្រង់",
      "segment": "ផ្នែកទី ៨ &bull; កិច្ចការប្រឡង &amp; រង្វាស់ពិន្ទុ",
      "subtitle": "បង្ហាញសមត្ថភាពរបស់អ្នកដោយបង្កើតប្រព័ន្ធចងចាំវេន និងម៉ាស៊ីនឆ្លងកាត់អេក្រង់សម្រាប់ Apex Plastics។",
      "content": `<div class="card">
            <h3 class="card-title">សេចក្តីសង្ខេបបេសកកម្ម</h3>
            <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin-bottom: 0.75rem;">
              អ្នកត្រូវបានចាត់តាំងឱ្យបង្កើតប្រព័ន្ធស្លាកសម្គាល់វេនការងារលើ Tablet សម្រាប់បុគ្គលិកដែលមកបំពេញការងារនៅ Apex Plastics។
            </p>

            <div style="background: rgba(15, 23, 42, 0.7); border-radius: 0.5rem; padding: 0.85rem; border: 1px solid var(--border-subtle); margin-bottom: 0.75rem;">
              <strong style="color: var(--color-memory); font-size: 0.88rem;">លក្ខខណ្ឌតម្រូវ៖</strong>
              <ul style="color: var(--text-muted); font-size: 0.82rem; padding-left: 1.2rem; margin-top: 0.35rem; line-height: 1.6;">
                <li>បង្កើតប៊ូតុង ២ លើអេក្រង់ទី ១៖ <em>"វេនថ្ងៃ (Day Shift)"</em> និង <em>"វេនយប់ (Night Shift)"</em>។</li>
                <li>ប៊ូតុងនីមួយៗកំណត់ <code>varActiveShift</code> ទៅតាមឈ្មោះវេន រួច Navigate ទៅអេក្រង់ទី ២។</li>
                <li>លើអេក្រង់ទី ២ បន្ថែមផ្ទាំងបដាក្បាលទំព័របង្ហាញថា៖ <code>"ចូលប្រើជា៖ " &amp; varActiveShift</code>។</li>
                <li>បន្ថែមប៊ូតុង "ប្តូរវេនការងារ" លើអេក្រង់ទី ២ ដើម្បី Navigate ត្រឡប់មកអេក្រង់ទី ១ វិញ។</li>
              </ul>
            </div>

            <div style="background: rgba(245, 158, 11, 0.1); border-radius: 0.5rem; padding: 0.75rem; border: 1px solid rgba(245, 158, 11, 0.25);">
              <strong style="color: #fbbf24; font-size: 0.85rem;">កិច្ចការផ្ទះស្រេចចិត្ត (&le; ១៥ នាទី)៖</strong>
              <p style="color: var(--text-muted); font-size: 0.8rem; margin: 0.2rem 0 0 0;">
                បន្ថែមអថេរទីពីរ៖ <code>varMachineBay</code>។ ឱ្យបុគ្គលិករើសរវាង Bay 1, Bay 2, និង Bay 3។ រួចបង្ហាញអថេរទាំងពីររួមគ្នាលើអេក្រង់ទី ២!
              </p>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">តារាងរង្វាស់វាយតម្លៃ ១០០ ពិន្ទុ (Rubric)</h3>
            
            <table style="width: 100%; font-size: 0.82rem; border-collapse: collapse; margin-top: 0.25rem;">
              <thead>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.15); text-align: left; color: #fde68a;">
                  <th style="padding: 0.5rem 0.25rem;">លក្ខណៈវិនិច្ឆ័យ</th>
                  <th style="padding: 0.5rem 0.25rem;">ពិន្ទុ</th>
                  <th style="padding: 0.5rem 0.25rem;">ស្តង់ដាររំពឹងទុក</th>
                </tr>
              </thead>
              <tbody style="color: var(--text-muted); line-height: 1.5;">
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
                  <td style="padding: 0.5rem 0.25rem; color: var(--text-main); font-weight: 600;">ភាពត្រឹមត្រូវនៃរូបមន្ត Set()</td>
                  <td style="padding: 0.5rem 0.25rem; font-family: var(--font-code); color: var(--color-memory);">៣០ ពិន្ទុ</td>
                  <td style="padding: 0.5rem 0.25rem;">ប្រើប្រាស់ <code>Set(varActiveShift, "...")</code> ត្រឹមត្រូវដោយគ្មានសម្រង់លើឈ្មោះអថេរ។</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
                  <td style="padding: 0.5rem 0.25rem; color: var(--text-main); font-weight: 600;">ការផ្លាស់ប្តូរអេក្រង់</td>
                  <td style="padding: 0.5rem 0.25rem; font-family: var(--font-code); color: var(--color-memory);">៣០ ពិន្ទុ</td>
                  <td style="padding: 0.5rem 0.25rem;">តភ្ជាប់សកម្មភាពដោយសញ្ញាចុចក្បៀស <code>; Navigate(Screen2)</code> ដំណើរការយ៉ាងរលូន។</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
                  <td style="padding: 0.5rem 0.25rem; color: var(--text-main); font-weight: 600;">ការទាញយកតម្លៃអថេរមកបង្ហាញ</td>
                  <td style="padding: 0.5rem 0.25rem; font-family: var(--font-code); color: var(--color-memory);">២០ ពិន្ទុ</td>
                  <td style="padding: 0.5rem 0.25rem;">ក្បាលទំព័រលើអេក្រង់ទី ២ បង្ហាញ <code>varActiveShift</code> ត្រឹមត្រូវតាមរយៈសញ្ញា <code>&amp;</code>។</td>
                </tr>
                <tr>
                  <td style="padding: 0.5rem 0.25rem; color: var(--text-main); font-weight: 600;">ស្តង់ដារដាក់ឈ្មោះ</td>
                  <td style="padding: 0.5rem 0.25rem; font-family: var(--font-code); color: var(--color-memory);">២០ ពិន្ទុ</td>
                  <td style="padding: 0.5rem 0.25rem;">អនុវត្តតាមស្តង់ដារបុព្វបទ <code>var...</code> ត្រឹមត្រូវពេញមួយកម្មវិធី។</td>
                </tr>
              </tbody>
            </table>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>ពន្យល់ពីតារាងពិន្ទុឱ្យច្បាស់។ បើពួកគេចុច "វេនថ្ងៃ" ហើយឃើញវាបង្ហាញលើអេក្រង់ទី ២ ភ្លាម នោះពួកគេទទួលបាន ១០០ ពិន្ទុពេញ!</p>`
    },

    // Slide 24: Connection Map & Bridge Forward
    {
      "title": "ផែនទីតភ្ជាប់កម្មវិធីសិក្សា៖ អតីតកាល បច្ចុប្បន្នកាល និងអនាគតកាល",
      "segment": "ផ្នែកទី ៨ &bull; ស្ពានតភ្ជាប់ទៅមុខ",
      "subtitle": "កន្លែងដែលយើងបានឆ្លងកាត់ អ្វីដែលយើងបានយកឈ្នះថ្ងៃនេះ និងដំណើរឆ្ពោះទៅកាន់ថ្ងៃស្អែក។",
      "content": `<div class="card">
            <div class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">អតីតកាល (ថ្ងៃ ១៧)</div>
            <h3 class="card-title">ខែលការពារទិន្នន័យ (Validation)</h3>
            <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin-bottom: 0.75rem;">
              អ្នកបានស្ទាត់ជំនាញការសម្រេចចិត្តជាមួយ <code>If()</code>, ការពិនិត្យភាពទទេស្អាតជាមួយ <code>IsBlank()</code>, និងសារព្រមានជាមួយ <code>Notify()</code>។
            </p>
            <ul style="color: var(--text-muted); font-size: 0.82rem; padding-left: 1.2rem; line-height: 1.6;">
              <li>ផ្លូវសម្រេចចិត្ត True/False។</li>
              <li>ទប់ស្កាត់ការបញ្ជូនទិន្នន័យទទេស្អាត។</li>
              <li>ផ្ទាំងសារ Toast ឆ្លើយតបអ្នកប្រើ។</li>
            </ul>
          </div>

          <div class="card" style="border-color: var(--color-memory); box-shadow: 0 0 25px rgba(245, 158, 11, 0.2);">
            <div class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fde68a;">បច្ចុប្បន្ន (ថ្ងៃ ១៨ ថ្ងៃនេះ)</div>
            <h3 class="card-title">ការចងចាំរបស់ App (អថេរ / Variables)</h3>
            <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin-bottom: 0.75rem;">
              អ្នកបានព្យាបាលជំងឺភ្លេចភ្លាំងរបស់ App! អ្នកបានរៀនពីរបៀបកត់ត្រាតម្លៃចូល RAM ជាមួយ <code>Set()</code> និងប្រើប្រាស់ឆ្លងអេក្រង់។
            </p>
            <ul style="color: #fde68a; font-size: 0.82rem; padding-left: 1.2rem; line-height: 1.6;">
              <li>អង្គចងចាំ <code>Set(varName, value)</code>។</li>
              <li>ការចែករំលែកទិន្នន័យឆ្លងកាត់អេក្រង់។</li>
              <li>ស្តង់ដារដាក់ឈ្មោះស្អាតបាត <code>var</code>។</li>
              <li>ក្រដាសកត់ចំណាំបណ្តោះអាសន្នក្នុង Session។</li>
            </ul>
          </div>

          <div class="card" style="border-color: var(--color-cyan); box-shadow: 0 0 25px rgba(6, 182, 212, 0.2);">
            <div class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">បន្ទាប់៖ ថ្ងៃទី ១៩</div>
            <h3 class="card-title">ការផ្ទុកអចិន្ត្រៃយ៍៖ មូលដ្ឋានទិន្នន័យ</h3>
            <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin-bottom: 0.75rem;">
              អថេរបាត់បង់នៅពេលដែលអ្នកប្រើបិទ App។ ថ្ងៃស្អែក យើងនឹងតភ្ជាប់ App ទៅកាន់ Database អាជីវកម្មអចិន្ត្រៃយ៍ក្នុង SharePoint!
            </p>
            <ul style="color: #67e8f9; font-size: 0.82rem; padding-left: 1.2rem; line-height: 1.6;">
              <li>ការតភ្ជាប់ទៅកាន់ SharePoint Lists។</li>
              <li>កត់ត្រាទិន្នន័យប្រវត្តិសាស្រ្តអចិន្ត្រៃយ៍។</li>
              <li>ប្រភពទិន្នន័យដែលមិនចេះភ្លេច។</li>
              <li>រក្សាទុកឯកសារអាជីវកម្មជារៀងរហូត!</li>
            </ul>
          </div>`,
      "notes": `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>ពាក្យបិទបញ្ចប់ (១ នាទី)៖</strong> "សូមអបអរសាទរចំពោះការយកឈ្នះថ្ងៃទី ១៨! ថ្ងៃនេះកម្មវិធីរបស់អ្នកបានរៀនចេះ ចងចាំ។ ថ្ងៃស្អែកលើថ្ងៃទី ១៩ យើងនឹងបោះជំហានធំចុងក្រោយក្នុងដំណាក់កាលទី ៦ គឺការតភ្ជាប់ App ទៅកាន់ទូដែកឯកសារអចិន្ត្រៃយ៍ SharePoint ដើម្បីឱ្យទិន្នន័យគង់វង្សជារៀងរហូត។ ជួបគ្នាថ្ងៃស្អែក!"</p>`
    }
  ];

  // --------------------------------------------------------------------------
  // 3. CAPTURE ENGLISH ORIGINAL CONTENT FOR SEAMLESS TOGGLING
  // --------------------------------------------------------------------------
  let ENGLISH_SLIDES = [];

  function captureEnglishOriginals() {
    ENGLISH_SLIDES = slides.map((slide, idx) => {
      const headerTitle = slide.querySelector('.slide-header h2');
      const headerSubtitle = slide.querySelector('.slide-header .subtitle');
      const sectionTag = slide.querySelector('.section-tag');
      const contentEl = slide.querySelector('.slide-content');
      const notesEl = slide.querySelector('aside.trainer-notes');

      return {
        title: headerTitle ? headerTitle.innerHTML : (slide.dataset.title || ''),
        subtitle: headerSubtitle ? headerSubtitle.innerHTML : '',
        segment: sectionTag ? sectionTag.innerHTML : (slide.dataset.segment || ''),
        content: contentEl ? contentEl.innerHTML : '',
        notes: notesEl ? notesEl.innerHTML : ''
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
    updateNotesDrawer();
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

      const headerTitle = slide.querySelector('.slide-header h2');
      const headerSubtitle = slide.querySelector('.slide-header .subtitle');
      const sectionTag = slide.querySelector('.section-tag');
      const contentEl = slide.querySelector('.slide-content');
      if (headerTitle && data.title) headerTitle.innerHTML = data.title;
      if (headerSubtitle && data.subtitle) headerSubtitle.innerHTML = data.subtitle;
      if (sectionTag && data.segment) sectionTag.innerHTML = data.segment;
      if (contentEl && data.content) contentEl.innerHTML = data.content;
      // Trainer notes are decoupled from the slide canvas and strictly reside in #notes-drawer
    });

    updateProgress();
    updateNotesDrawer();
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
        void ripple.offsetWidth;
        ripple.classList.add('rippling');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 8. TRAINER NOTES DRAWER (Strictly in Drawer, Never on Visible Stage)
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
    const activeSlide = slides[currentSlideIndex];

    if (!activeSlide || !notesBody) return;

    if (notesSlideTitle) {
      notesSlideTitle.textContent = isKhmerActive
        ? `ស្លាយទី ${currentSlideIndex + 1}`
        : `Slide ${currentSlideIndex + 1}`;
    }

    const asideNotes = activeSlide.querySelector('aside.trainer-notes');
    notesBody.innerHTML = asideNotes ? asideNotes.innerHTML : '<p>No specific script notes for this slide.</p>';
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
    // Re-bind Slide 13 Inspector tabs
    const tabs = document.querySelectorAll('.inspector-tab');
    tabs.forEach(tab => {
      tab.onclick = () => {
        selectMemoryAction(tab.dataset.action);
      };
    });
  }

  // WIDGET 1: Slide 13 Variable Memory Bank Inspector
  window.selectMemoryAction = function (actionKey) {
    const tabs = document.querySelectorAll('.inspector-tab');
    tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.action === actionKey));

    const titleEl = document.getElementById('mem-inspector-title');
    const badgeEl = document.getElementById('mem-status-badge');
    const codeDisplay = document.getElementById('mem-code-display');
    const shiftValEl = document.getElementById('val-shift');
    const countValEl = document.getElementById('val-count');
    const explanationEl = document.getElementById('mem-explanation');

    if (!titleEl || !badgeEl || !codeDisplay || !shiftValEl || !countValEl || !explanationEl) return;

    if (actionKey === 'set-shift-a') {
      liveMemoryBank.varShift = "Morning";
      titleEl.textContent = isKhmerActive ? "រូបមន្តសកម្ម៖ Set(varShift, \"Morning\")" : "Active Formula: Set(varShift, \"Morning\")";
      badgeEl.textContent = isKhmerActive ? "RAM ត្រូវបានធ្វើបច្ចុប្បន្នភាព" : "RAM UPDATED";
      badgeEl.style.background = "rgba(245, 158, 11, 0.2)";
      badgeEl.style.color = "#fde68a";

      codeDisplay.innerHTML = `<span style="color: #fbbf24;">Set</span>( <span style="color: #93c5fd;">varShift</span>, <span style="color: #86efac;">"Morning"</span> )`;
      shiftValEl.textContent = `"Morning"`;
      shiftValEl.style.color = "#86efac";

      explanationEl.textContent = isKhmerActive
        ? "ការដំណើរការ Set(varShift, \"Morning\") ផ្លាស់ប្តូរតម្លៃក្នុងអង្គចងចាំភ្លាមៗ។ រាល់ស្លាកអក្សរ ឬរូបមន្តណាដែលប្រើប្រាស់ varShift ទូទាំង App នឹងគណនាឡើងវិញដោយស្វ័យប្រវត្តិ។"
        : "Executing Set(varShift, \"Morning\") instantly updates the slot in memory. Any label or formula referencing varShift across the entire app recalculates immediately.";
    }
    else if (actionKey === 'set-shift-b') {
      liveMemoryBank.varShift = "Evening";
      titleEl.textContent = isKhmerActive ? "រូបមន្តសកម្ម៖ Set(varShift, \"Evening\")" : "Active Formula: Set(varShift, \"Evening\")";
      badgeEl.textContent = isKhmerActive ? "RAM ត្រូវបានធ្វើបច្ចុប្បន្នភាព" : "RAM UPDATED";
      badgeEl.style.background = "rgba(59, 130, 246, 0.2)";
      badgeEl.style.color = "#93c5fd";

      codeDisplay.innerHTML = `<span style="color: #fbbf24;">Set</span>( <span style="color: #93c5fd;">varShift</span>, <span style="color: #86efac;">"Evening"</span> )`;
      shiftValEl.textContent = `"Evening"`;
      shiftValEl.style.color = "#86efac";

      explanationEl.textContent = isKhmerActive
        ? "អថេរដដែល varShift ឥឡូវត្រូវបានសរសេរជាន់ដោយតម្លៃថ្មី \"Evening\"។ Power Apps មិនបង្កើតកំប៉ុងថ្មីទេ វាគ្រាន់តែប្តូររបស់ដែលនៅក្នុងកំប៉ុងចាស់ប៉ុណ្ណោះ!"
        : "The same variable varShift is now overwritten with \"Evening\". Power Apps doesn't create a new slot; it simply replaces the content inside the existing container!";
    }
    else if (actionKey === 'set-counter') {
      liveMemoryBank.varCount += 1;
      titleEl.textContent = isKhmerActive ? `រូបមន្តសកម្ម៖ Set(varCount, varCount + 1) &rarr; [${liveMemoryBank.varCount}]` : `Active Formula: Set(varCount, varCount + 1) &rarr; [${liveMemoryBank.varCount}]`;
      badgeEl.textContent = isKhmerActive ? "តម្លៃលេខកើនឡើង" : "COUNTER TICKED";
      badgeEl.style.background = "rgba(16, 185, 129, 0.2)";
      badgeEl.style.color = "#86efac";

      codeDisplay.innerHTML = `<span style="color: #fbbf24;">Set</span>( <span style="color: #93c5fd;">varCount</span>, <span style="color: #93c5fd;">varCount</span> + <span style="color: #86efac;">1</span> )`;
      countValEl.textContent = liveMemoryBank.varCount;
      countValEl.style.color = "#86efac";

      explanationEl.textContent = isKhmerActive
        ? `អថេរអាចផ្ទុកលេខ និងធ្វើការគណនាបាន! រូបមន្តនេះយកតម្លៃបច្ចុប្បន្ននៃ varCount បូកបន្ថែម ១ រួចសរសេរត្រឡប់ចូលក្នុងអង្គចងចាំវិញ (បច្ចុប្បន្ន = ${liveMemoryBank.varCount})។`
        : `Variables can store numbers and perform math! This formula takes the current value of varCount, adds 1 to it, and writes it back into memory (currently = ${liveMemoryBank.varCount}).`;
    }
    else if (actionKey === 'clear-memory') {
      liveMemoryBank.varShift = "Blank()";
      titleEl.textContent = isKhmerActive ? "រូបមន្តសកម្ម៖ Set(varShift, Blank())" : "Active Formula: Set(varShift, Blank())";
      badgeEl.textContent = isKhmerActive ? "អង្គចងចាំត្រូវបានសម្អាត" : "MEMORY CLEARED";
      badgeEl.style.background = "rgba(239, 68, 68, 0.2)";
      badgeEl.style.color = "#fca5a5";

      codeDisplay.innerHTML = `<span style="color: #fbbf24;">Set</span>( <span style="color: #93c5fd;">varShift</span>, <span style="color: #fca5a5;">Blank()</span> )`;
      shiftValEl.textContent = `Blank()`;
      shiftValEl.style.color = "#fca5a5";

      explanationEl.textContent = isKhmerActive
        ? "ការបញ្ជូនអនុគមន៍ Blank() ចូលទៅក្នុងអថេរ គឺដូចជាការហែកក្រដាសស្អិតចោល។ អថេរនោះនៅតែមានឈ្មោះ ប៉ុន្តែវាលែងមានតម្លៃនៅខាងក្នុងទៀតហើយ។"
        : "Passing Blank() into a variable is like peeling off and tossing the sticky note. The variable name remains registered, but its content is completely cleared.";
    }
  };

  // WIDGET 2: Slide 16 Live Multi-Screen Memory Simulator
  window.setSimShift = function (shiftName, bayName) {
    const memBadge = document.getElementById('sim-mem-badge');
    const headerEl = document.getElementById('sim-screen2-header');
    const descEl = document.getElementById('sim-screen2-desc');
    const logEl = document.getElementById('sim-screen2-log');
    const screen2 = document.getElementById('sim-screen-2');

    if (!memBadge || !headerEl || !descEl || !logEl || !screen2) return;

    memBadge.textContent = `varShift: "${shiftName}"`;
    headerEl.textContent = isKhmerActive ? `សូមស្វាគមន៍! កំពុងកត់ត្រាសម្រាប់៖ ${shiftName}` : `Welcome! Logging for: ${shiftName}`;
    descEl.textContent = isKhmerActive ? `ទីតាំងម៉ាស៊ីន៖ ${bayName} • ស្ថានភាព៖ សកម្មភាពកំពុងដំណើរការ` : `Assigned Bay: ${bayName} • Status: Active Session`;

    logEl.innerHTML = `
      <p style="color: #86efac; margin: 0 0 4px 0;">[Memory Tunnel Sync Complete]</p>
      <p style="margin: 0; color: #fde68a;">&bull; Action: Set(varCurrentShift, "${shiftName}")</p>
      <p style="margin: 0; color: #93c5fd;">&bull; Screen 2 Header: "Active Shift: " &amp; varCurrentShift</p>
      <p style="margin: 0; color: #cbd5e1;">&bull; Result: Screen 2 updated seamlessly without user re-typing!</p>
    `;

    // Visual pulse effect on Screen 2
    screen2.style.borderColor = '#f59e0b';
    screen2.style.boxShadow = '0 0 25px rgba(245, 158, 11, 0.4)';
    setTimeout(() => {
      screen2.style.borderColor = 'rgba(255, 255, 255, 0.08)';
      screen2.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.5)';
    }, 700);
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
  // 12.5 GLOBAL WINDOW EXPORTS (Ensures Instant Inline onclick Functionality)
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
  // 13. BOOTSTRAP INITIALIZATION
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

    console.log('Day 18 Presentation loaded successfully (Lesson 14 Exact DOM Architecture)!');
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
