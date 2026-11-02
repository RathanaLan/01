/* ============================================================================
   POWER APPS FOUNDATION: DAY 21 PRESENTATION ENGINE
   Topic: Gallery: Read and Select Records
   Phase: Phase 7: Power Apps Data Integration
   Theme: Microsoft Fluent 2 Dark Mode (SharePoint Emerald Teal & Power Fx Cyan)
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
  // 2. KHMER SLIDES DATA STORE (Direct Child Elements Only - No Duplicate Grid Wrappers)
  // --------------------------------------------------------------------------
  const KHMER_SLIDES = [
    // Slide 1: Hero
    {
      title: "Gallery ៖ ការអាន និងជ្រើសរើសកំណត់ត្រាទិន្នន័យ",
      segment: "ដំណាក់កាលទី ៧ ៖ ការរួមបញ្ចូលទិន្នន័យ Power Apps",
      subtitle: "Label មួយអាចបង្ហាញអត្ថបទបានតែមួយជួរប៉ុណ្ណោះ។ ថ្ងៃនេះយើងនឹងបើកទ្វារស្ថាបត្យកម្មបង្ហាញជួរទិន្នន័យដដែលៗ ៖ Gallery បម្លែងតារាងទិន្នន័យ Cloud ទាំងមូលឱ្យទៅជាបញ្ជីរមូរដ៏ស្រស់ស្អាត ដោយប្រើតែគំរូមេ (Master Template) មួយគត់។",
      content: `<div class="hero-badge">
            <span>គ្រឹះវិជ្ជាជីវៈ Microsoft Power Apps</span>
            <span>&bull;</span>
            <span>ថ្ងៃទី ២១ នៃ ២៧</span>
          </div>
          <h1 class="hero-title">Gallery ៖ ការអាន និងជ្រើសរើសកំណត់ត្រាទិន្នន័យ</h1>
          <p class="hero-subtitle">
            Label មួយអាចបង្ហាញអត្ថបទបានតែមួយជួរប៉ុណ្ណោះ។ ថ្ងៃនេះយើងនឹងបើកទ្វារស្ថាបត្យកម្មបង្ហាញជួរទិន្នន័យដដែលៗ ៖ Gallery បម្លែងតារាងទិន្នន័យ Cloud ទាំងមូលឱ្យទៅជាបញ្ជីរមូរដ៏ស្រស់ស្អាត ដោយប្រើតែគំរូមេ (Master Template) មួយគត់។
          </p>

          <div class="model-chain">
            <span class="chain-item">បញ្ហាជាក់ស្តែង</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ដំណើរការ</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ទិន្នន័យ</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item active">UI / អេក្រង់ [GALLERY]</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">តក្កវិជ្ជា/ការសម្រេចចិត្ត</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">សកម្មភាព</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ការផ្ទុកទិន្នន័យ [បានភ្ជាប់]</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ការឆ្លើយតប</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ការធ្វើតេស្ត</span>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការបើកមេរៀន (២ នាទី) ៖</strong> សូមស្វាគមន៍មកកាន់ថ្ងៃទី ២១! កាលពីម្សិលមិញ អ្នកបានតបំពង់ទៅកាន់ SharePoint។ ថ្ងៃនេះយើងនឹងបើកវ៉ានទឹក។ ប៉ុន្តែជំនួសឱ្យទឹកហូរខ្ចាត់ខ្ចាយ Gallery នឹងរៀបចំជួរទិន្នន័យរាប់រយជួរឱ្យក្លាយជាបញ្ជីរមូរដ៏ស្រស់ស្អាត។</p>`
    },

    // Slide 2: Agenda & Objectives
    {
      title: "របៀបវារៈ ៩០ នាទី និងគោលបំណងរំពឹងទុកជាក់ស្តែង",
      segment: "ផ្នែកទី ១ &bull; ផែនការមេរៀន និងកាលវិភាគ",
      subtitle: "ដំណើរការរៀនជាវង់តំរៀប (Spiral Learning) ពីគំនិតត្រាតាងកៅស៊ូ រហូតដល់ការបង្ហាញបញ្ជីទិន្នន័យ Cloud ផ្ទាល់ដៃ។",
      content: `<div class="card">
            <h3 class="card-title">៤ គោលបំណងរំពឹងទុកជាក់ស្តែង</h3>
            <div class="objective-item">
              <span class="obj-num">1</span>
              <div>
                <strong>យល់ច្បាស់ពីគំរូមេ (Template Concept) ៖</strong>
                <p>ពន្យល់ជាភាសាសាមញ្ញពីមូលហេតុដែលការកែប្រែជួរទីមួយ (Template Cell) ធ្វើឱ្យគ្រប់ជួរផ្សេងទៀតផ្លាស់ប្តូរតាមដោយស្វ័យប្រវត្តិ។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">2</span>
              <div>
                <strong>ភ្ជាប់ទិន្នន័យទៅកាន់ <code>Gallery.Items</code> ៖</strong>
                <p>ទាញបញ្ចូល Vertical Gallery និងកំណត់ property <code>Items</code> ទៅកាន់ <code>Apex_Maintenance_Requests</code> ដោយគ្មានកំហុស។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">3</span>
              <div>
                <strong>ទាញទិន្នន័យជួរនីមួយៗតាម <code>ThisItem</code> ៖</strong>
                <p>សរសេររូបមន្តទាញយកទិន្នន័យបានត្រឹមត្រូវដោយប្រើ <code>ThisItem.Title</code>, <code>ThisItem.MachineID</code> និង <code>ThisItem.Priority.Value</code>។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">4</span>
              <div>
                <strong>ចាប់យកការចុចរបស់អ្នកប្រើតាម <code>Gallery.Selected</code> ៖</strong>
                <p>បញ្ជូនទិន្នន័យនៃជួរដែលបានចុចទៅកាន់ផ្ទាំងពិនិត្យខាងក្រៅដោយប្រើ <code>galRequests.Selected</code>។</p>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">កាលវិភាគលម្អិត ៩០ នាទី</h3>
            <div class="agenda-timeline">
              <div class="agenda-row">
                <span class="agenda-time">០០ - ១០ នាទី</span>
                <div><strong>រំលឹកចំណេះដឹង និងគំរូផ្នត់គំនិត ៖</strong> រំលឹកថ្ងៃ ១០, ១៤, ១៦, ២០ និងវិបត្តិ "កំណត់ត្រាតែមួយ"។</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time">១០ - ២៥ នាទី</span>
                <div><strong>ការប្រៀបធៀបក្នុងជីវិតជាក់ស្តែង ៖</strong> ត្រាតាងកៅស៊ូ និងស្រោមអាល់ប៊ុមរូបថត។</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time">២៥ - ៤០ នាទី</span>
                <div><strong>ការបង្ហាញផ្ទាល់របស់គ្រូ ៖</strong> បញ្ចូល Gallery, កែ Template និងស្វែងយល់ពី <code>ThisItem</code>។</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time">៤០ - ៦០ នាទី</span>
                <div><strong>ការអនុវត្តផ្ទាល់ដៃក្រោមការណែនាំ ៖</strong> បង្កើតផ្ទាំង Dispatch ជួសជុលរបស់រោងចក្រ Apex។</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time">៦០ - ៧២ នាទី</span>
                <div><strong>កិច្ចការអនុវត្តឯករាជ្យ ៖</strong> បន្ថែមផ្លាកពណ៌ Priority ដោយប្រើរូបមន្ត Power Fx។</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time">៧២ - ៩០ នាទី</span>
                <div><strong>កែតម្រូវការយល់ច្រឡំ និងស្ពានឆ្ពោះទៅមុខ ៖</strong> ៥ សំណួរ និងការត្រៀមខ្លួនសម្រាប់ Edit Forms ថ្ងៃទី ២២។</div>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការកំណត់ការរំពឹងទុក ៖</strong> ថ្ងៃនេះជាថ្ងៃដែលកម្មវិធីរបស់អ្នកចាប់ផ្តើមមើលទៅដូចជាប្រព័ន្ធសហគ្រាសពិតប្រាកដ ដែលអាចរមូរមើលទិន្នន័យរាប់រយជួរយ៉ាងរលូន។</p>`
    },

    // Slide 3: Concept Map Continuity
    {
      title: "ដំណើររឿងបន្តបន្ទាប់នៃកម្មវិធីសិក្សា ២៧ ថ្ងៃ",
      segment: "ផ្នែកទី ១ &bull; ភាពបន្តគ្នានៃកម្មវិធីសិក្សា",
      subtitle: "កាលពីម្សិលមិញយើងតភ្ជាប់បំពង់ទឹក។ ថ្ងៃនេះយើងបង្ហាញទិន្នន័យ។ ថ្ងៃស្អែកយើងកែប្រែទិន្នន័យ។",
      content: `<div class="card" style="border-left: 3px solid #0d9488;">
            <span class="card-badge" style="background: rgba(13, 148, 136, 0.2); color: #5eead4;">ថ្ងៃទី ២០ ៖ កាលពីម្សិលមិញ</span>
            <h3 class="card-title">ភ្ជាប់ទៅកាន់ SharePoint</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">
              យើងបានបន្ថែម SharePoint Connector ផ្ទៀងផ្ទាត់សិទ្ធិតាម Entra ID (SSO) និងបានភ្ជាប់ <code>Apex_Maintenance_Requests</code> ជា Data Source សកម្មក្នុង Studio។
            </p>
            <div style="margin-top: auto; padding-top: 1rem; color: #5eead4; font-weight: 600; font-size: 0.85rem;">
              &check; បំពង់បង្ហូរទិន្នន័យ Cloud ត្រូវបានបើក!
            </div>
          </div>

          <div class="card" style="border-left: 3px solid var(--color-primary-light); background: rgba(6, 182, 212, 0.1);">
            <span class="card-badge" style="background: rgba(6, 182, 212, 0.25); color: #67e8f9;">ថ្ងៃទី ២១ ៖ ថ្ងៃនេះ</span>
            <h3 class="card-title">Gallery ៖ អាន និងជ្រើសរើសកំណត់ត្រា</h3>
            <p style="color: var(--text-main); font-size: 0.9rem; line-height: 1.6;">
              យើងបញ្ជូនតារាងទិន្នន័យចូល Gallery តាមរយៈ <code>Items</code>។ យើងបង្កើតគំរូមេមួយ ភ្ជាប់ជួរឈរតាម <code>ThisItem</code> និងតាមដានការចុចរបស់អ្នកប្រើតាម <code>Gallery.Selected</code>។
            </p>
            <div style="margin-top: auto; padding-top: 1rem; color: #67e8f9; font-weight: 700; font-size: 0.85rem;">
              &bull; បម្លែងតារាងទិន្នន័យទៅជាបញ្ជីរមូរលើ UI
            </div>
          </div>

          <div class="card" style="border-left: 3px solid #8b5cf6;">
            <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc;">ថ្ងៃទី ២២ ៖ ថ្ងៃស្អែក</span>
            <h3 class="card-title">Forms ៖ មើល និងកែប្រែកំណត់ត្រាមួយ</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">
              ពេលអ្នកប្រើជ្រើសរើសជួរណាមួយក្នុង Gallery យើងត្រូវការ Form ដើម្បីកែប្រែទិន្នន័យនោះ! ថ្ងៃស្អែក យើងកំណត់ <code>Form.Item = galRequests.Selected</code> ដើម្បីរក្សាទុកការកែប្រែត្រឡប់ទៅ SharePoint វិញ។
            </p>
            <div style="margin-top: auto; padding-top: 1rem; color: #c084fc; font-weight: 600; font-size: 0.85rem;">
              &rarr; កែប្រែកំណត់ត្រាដែលបានជ្រើសរើស
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការតភ្ជាប់គ្នា ៖</strong> ថ្ងៃទី ២០ ភ្ជាប់តារាង។ ថ្ងៃទី ២១ បង្ហាញជួរទាំងអស់។ ថ្ងៃទី ២២ កែប្រែជួរជាក់លាក់ដែលអ្នកបានចុចនៅលើថ្ងៃទី ២១!</p>`
    },

    // Slide 4: Prerequisite Retrieval (4 Flip Cards)
    {
      title: "ការរំលឹកចំណេះដឹងគ្រឹះ ៖ ៤ ផ្នែកសំខាន់ៗ",
      segment: "ផ្នែកទី ២ &bull; ការរំលឹកការចងចាំ",
      subtitle: "ចុចលើកាតណាមួយដើម្បីត្រឡប់មើលការពន្យល់ និងរបៀបដែលមេរៀនមុនៗតភ្ជាប់មកកាន់ Gallery ថ្ងៃនេះ។",
      content: `<div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.15); color: #93c5fd;">ថ្ងៃទី ១០ &bull; Tables និង Records</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-top: 0.5rem;">តើ Record ជាអ្វី?</h4>
                <p style="color: var(--text-muted); font-size: 0.85rem;">តើជួរដេកខុសពីតារាងយ៉ាងដូចម្តេច?</p>
                <div class="flip-hint">&circlearrowright; ចុចដើម្បីត្រឡប់មើលចម្លើយ</div>
              </div>
              <div class="flip-card-back">
                <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">ចំណេះដឹងគ្រឹះ</span>
                <h4 style="color: #67e8f9; font-size: 1rem; margin-top: 0.5rem;">ជួរដេកតែមួយ</h4>
                <p style="color: #e2e8f0; font-size: 0.82rem; line-height: 1.5;">
                  <strong>Table</strong> គឺជាបណ្តុំនៃជួរទាំងអស់។ ចំណែក <strong>Record</strong> គឺជាជួរដេកតែមួយដែលមានព័ត៌មានលម្អិតនៃករណីជាក់លាក់មួយ (ឧ. សំបុត្រជួសជុលម៉ាស៊ីន M-04)។
                </p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.15); color: #93c5fd;">ថ្ងៃទី ១៤ &bull; Controls</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-top: 0.5rem;">តើ Label អាចផ្ទុក ១០០ ជួរបានទេ?</h4>
                <p style="color: var(--text-muted); font-size: 0.85rem;">តើកម្រិតកំណត់របស់ Label គឺជាអ្វី?</p>
                <div class="flip-hint">&circlearrowright; ចុចដើម្បីត្រឡប់មើលចម្លើយ</div>
              </div>
              <div class="flip-card-back">
                <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">ចំណេះដឹងគ្រឹះ</span>
                <h4 style="color: #67e8f9; font-size: 1rem; margin-top: 0.5rem;">តម្លៃតែមួយគត់</h4>
                <p style="color: #e2e8f0; font-size: 0.82rem; line-height: 1.5;">
                  Label ធម្មតាមាន property <code>Text</code> តែមួយគត់សម្រាប់បង្ហាញអត្ថបទមួយ។ ដើម្បីបង្ហាញ ១០០ ជួរ អ្នកត្រូវការប្រអប់ដែលចេះបង្កើតជួរដដែលៗដូចជា Gallery!
                </p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.15); color: #93c5fd;">ថ្ងៃទី ១៦ &bull; Properties</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-top: 0.5rem;">តើ Controls បង្ហាញទិន្នន័យដោយរបៀបណា?</h4>
                <p style="color: var(--text-muted); font-size: 0.85rem;">តើអ្វីជាអ្នកបញ្ជាទិន្នន័យលើអេក្រង់?</p>
                <div class="flip-hint">&circlearrowright; ចុចដើម្បីត្រឡប់មើលចម្លើយ</div>
              </div>
              <div class="flip-card-back">
                <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">ចំណេះដឹងគ្រឹះ</span>
                <h4 style="color: #67e8f9; font-size: 1rem; margin-top: 0.5rem;">Properties + រូបមន្ត</h4>
                <p style="color: #e2e8f0; font-size: 0.82rem; line-height: 1.5;">
                  គ្រប់ Control សុទ្ធតែមាន properties។ នៅពេលអ្នកកំណត់រូបមន្តទៅកាន់ property (ដូចជា <code>Items</code> ឬ <code>Text</code>) Power Apps នឹងគណនាតម្លៃមកបង្ហាញភ្លាមៗ។
                </p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.15); color: #93c5fd;">ថ្ងៃទី ២០ &bull; SharePoint</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-top: 0.5rem;">តើ Studio មើលឃើញ List ដោយរបៀបណា?</h4>
                <p style="color: var(--text-muted); font-size: 0.85rem;">តើមានអ្វីកើតឡើងពេលវាយឈ្មោះ List?</p>
                <div class="flip-hint">&circlearrowright; ចុចដើម្បីត្រឡប់មើលចម្លើយ</div>
              </div>
              <div class="flip-card-back">
                <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">ចំណេះដឹងគ្រឹះ</span>
                <h4 style="color: #67e8f9; font-size: 1rem; margin-top: 0.5rem;">និមិត្តសញ្ញា Data Source សកម្ម</h4>
                <p style="color: #e2e8f0; font-size: 0.82rem; line-height: 1.5;">
                  <code>Apex_Maintenance_Requests</code> ត្រូវបាន IntelliSense ទទួលស្គាល់ជាតារាង Cloud ដ៏ពិតប្រាកដមួយ ដែលផ្ទុកកំណត់ត្រាជាច្រើនរង់ចាំការទាញយកមកប្រើប្រាស់។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការពិនិត្យអន្តរកម្ម ៖</strong> សួរសិស្សថា ៖ "តើអ្នកណាចាំថាហេតុអ្វីបានជាការអូស Label ១០០ មកដាក់លើអេក្រង់ជាគំនិតមិនល្អ?" រង់ចាំឱ្យសិស្សឆ្លើយថាវាមិនអាចគ្រប់គ្រងបានពេលទិន្នន័យកើនឡើង។</p>`
    },

    // Slide 5: The Manufacturing Crisis: Single-Record Dilemma
    {
      title: "វិបត្តិការងារ ៖ \"ឧបសគ្គនៃការបង្ហាញកំណត់ត្រាតែមួយ\"",
      segment: "ផ្នែកទី ៣ &bull; បញ្ហាជាក់ស្តែង និងវិបត្តិការងារ",
      subtitle: "មូលហេតុដែលការបង្កើតអេក្រង់ដោយគ្មានប្រអប់បង្កើតជួរដដែលៗ បង្កជាឧបសគ្គធ្ងន់ធ្ងរដល់ដំណើរការការងារ។",
      content: `<div class="card" style="border-left: 3px solid #ef4444;">
            <span class="card-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">សេណារីយ៉ូនៃការខូចខាត</span>
            <h3 class="card-title">ការរៀបចំវេនជួសជុល ម៉ោង ០៧ ៖ ០០ ព្រឹកថ្ងៃចន្ទ</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1rem;">
              មេការ Davi មកដល់រោងចក្រ Apex Plastics។ កាលពីចុងសប្តាហ៍ មានបញ្ហាជួសជុលចំនួន ១៨ ត្រូវបានកត់ត្រាចូលក្នុង SharePoint។ Davi ត្រូវការមើលបញ្ជីទាំងអស់លើថេប្លេត ដើម្បីបែងចែកជាងឱ្យចំគោលដៅ។
            </p>
            <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); padding: 0.85rem; border-radius: 0.5rem; margin-bottom: 1rem;">
              <strong style="color: #fca5a5; font-size: 0.88rem;">សុបិន្តអាក្រក់របស់អ្នកអភិវឌ្ឍន៍ដំបូង ៖</strong>
              <p style="color: #fecaca; font-size: 0.82rem; margin-top: 0.25rem;">
                អ្នកអភិវឌ្ឍន៍ថ្មីថ្មោងម្នាក់បានអូស <strong>Labels ចំនួន ៥៤</strong> មកដាក់លើអេក្រង់ (Title 1, Title 2... Priority 1, Priority 2...)។ ពេលករណីទី ១៩ កើតឡើង វាមិនបង្ហាញខ្លួនសោះ! ពេលករណីទី ៣ ត្រូវបានដោះស្រាយរួចលុបចោល ចន្លោះប្រហោងទទេស្អាតមួយបានលេចឡើងចំកណ្តាលអេក្រង់។
              </p>
            </div>
            <p style="color: var(--text-muted); font-size: 0.85rem;">
              ផ្ទាំងគ្រប់គ្រងមើលទៅដូចជាឈីសដែលមានប្រហោង។ ក្រុមជាងបានភ្លេចបញ្ហាឡើងកម្តៅធ្ងន់ធ្ងរនៃម៉ាស៊ីន M-04 ព្រោះវាបានធ្លាក់ចេញពីអេក្រង់បាត់។
            </p>
          </div>

          <div class="card" style="border-left: 3px solid var(--color-primary-light);">
            <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">ដំណោះស្រាយស្ថាបត្យកម្ម</span>
            <h3 class="card-title">ហេតុអ្វីបានជា Gallery មិនអាចខ្វះបាន?</h3>
            <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-top: 0.5rem;">
              <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: rgba(16, 185, 129, 0.2); color: #10b981; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">&check;</div>
                <div>
                  <strong style="color: #86efac; font-size: 0.9rem;">បង្កើតជួរដដែលៗដោយស្វ័យប្រវត្តិ ៖</strong>
                  <p style="color: var(--text-muted); font-size: 0.82rem;">មិនថា SharePoint មាន ៣ ជួរ ឬ ៣០០ ជួរទេ Gallery នឹងបង្កើតកាតបង្ហាញយ៉ាងត្រឹមត្រូវតាមចំនួនជួរជាក់ស្តែង។</p>
                </div>
              </div>

              <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: rgba(16, 185, 129, 0.2); color: #10b981; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">&check;</div>
                <div>
                  <strong style="color: #86efac; font-size: 0.9rem;">គ្មានចន្លោះប្រហោងទទេឡើយ ៖</strong>
                  <p style="color: var(--text-muted); font-size: 0.82rem;">នៅពេលកំណត់ត្រាត្រូវបានលុបចេញ ជួរខាងក្រោមក៏រំកិលឡើងលើមកបំពេញចន្លោះយ៉ាងរលូន ដោយរក្សាអេក្រង់ឱ្យមានរបៀបរៀបរយ។</p>
                </div>
              </div>

              <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: rgba(16, 185, 129, 0.2); color: #10b981; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">&check;</div>
                <div>
                  <strong style="color: #86efac; font-size: 0.9rem;">រចនាគំរូតែមួយគត់ ៖</strong>
                  <p style="color: var(--text-muted); font-size: 0.82rem;">អ្នកគ្រាន់តែរៀបចំជួរទីមួយតែម្តងគត់ រួច Power Apps នឹងចម្លងរចនាបថនោះសម្រាប់គ្រប់ជួរទាំងអស់។</p>
                </div>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការសង្កត់ធ្ងន់លើទំហំការងារ ៖</strong> ក្នុងកម្មវិធីទំនើប យើងមិនដែលបង្កើត Control ដាច់ដោយឡែកសម្រាប់ជួរនីមួយៗឡើយ។ នោះប្រៀបដូចជាការសាងសង់ផ្លូវល្បឿនលឿនមួយខ្សែថ្មីសម្រាប់រថយន្តនីមួយៗដែលបើកចូលទីក្រុងអញ្ចឹង!</p>`
    },

    // Slide 6: Everyday Physical Analogy: Rubber Stamp & Photo Album
    {
      title: "ការប្រៀបធៀបក្នុងជីវិតជាក់ស្តែង ៖ ត្រាតាងកៅស៊ូ និងអាល់ប៊ុមរូបថត",
      segment: "ផ្នែកទី ៣ &bull; គំរូផ្នត់គំនិតក្នុងជីវិតពិត",
      subtitle: "ស្វែងយល់ពីរចនាសម្ព័ន្ធ UI ដដែលៗតាមរយៈឧបករណ៍ជាក់ស្តែងដែលអ្នកស្គាល់ច្បាស់។",
      content: `<div class="card" style="align-items: center; text-align: center;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(2, 132, 199, 0.15); border: 1px solid #0284c7; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: #38bdf8; margin-bottom: 1rem;">
              &#128394;
            </div>
            <span class="card-badge" style="background: rgba(2, 132, 199, 0.2); color: #7dd3fc;">គំនិតនៃ Template</span>
            <h3 class="card-title">១. ត្រាតាងកៅស៊ូ</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              ស្រមៃថាអ្នកមានត្រាតាងកៅស៊ូមួយដែលមានចម្លាក់ ៣ កន្លែង ៖ <code>[រូបតំណាង] [ឈ្មោះ] [កាលបរិច្ឆេទ]</code>។ អ្នកបោះត្រានោះលើក្រដាស ១០០ ដង។ អ្នកចម្លាក់ត្រាតែ <strong>ម្តងគត់</strong> ប៉ុន្តែអ្នកបង្កើតបាន ១០០ ជួរយ៉ាងស្អាត។
            </p>
            <div style="margin-top: auto; padding-top: 1rem; color: #38bdf8; font-weight: 700; font-size: 0.85rem;">
              = Gallery Master Template Cell
            </div>
          </div>

          <div class="card" style="align-items: center; text-align: center;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(139, 92, 246, 0.15); border: 1px solid #8b5cf6; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: #c084fc; margin-bottom: 1rem;">
              &#128218;
            </div>
            <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc;">គំនិតទិន្នន័យក្នុងជួរ</span>
            <h3 class="card-title">២. ស្រោមអាល់ប៊ុមរូបថត</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              អាល់ប៊ុមរូបថតមានស្រោមប្លាស្ទិក ១០ ដែលមានទំហំដូចគ្នាទាំងស្រុង។ ស្រោមទី ១ ដាក់រូប Davi; ស្រោមទី ២ ដាក់រូប Bopha។ ទំហំស្រោមមិនប្រែប្រួលទេ តែអ្វីដែលនៅខាងក្នុង (<code>ThisItem</code>) ផ្លាស់ប្តូរទៅតាមស្រោមនីមួយៗ។
            </p>
            <div style="margin-top: auto; padding-top: 1rem; color: #c084fc; font-weight: 700; font-size: 0.85rem;">
              = ការកំណត់ទិន្នន័យតាម <code>ThisItem</code>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>កាយវិការបង្ហាញ ៖</strong> ធ្វើកាយវិការកាន់ត្រាតាងកៅស៊ូបោះត្រា។ បោះម្តង ពីរដង បីដង។ ប្រាប់សិស្សថា ៖ "អ្នកគ្រាន់តែរចនាត្រាប៉ុណ្ណោះ។ Power Apps ជាអ្នកដើរបោះត្រាជូនអ្នក។"</p>`
    },

    // Slide 7: Plain-Language Concepts Before Tech Jargon
    {
      title: "គោលគំនិតភាសាសាមញ្ញ ៖ ៤ ពាក្យគន្លឹះនៃ Gallery",
      segment: "ផ្នែកទី ៣ &bull; ពាក្យបច្ចេកទេសបកស្រាយយ៉ាងសាមញ្ញ",
      subtitle: "ស្វែងយល់ពីតួនាទីរបស់វាក្នុងប្រព័ន្ធ មុនពេលចាប់ផ្តើមសរសេរកូដ Power Fx។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(2, 132, 199, 0.2); color: #7dd3fc;">បំពង់បញ្ជូនទិន្នន័យ</span>
            <h4 style="color: #f8fafc; font-size: 1rem;">១. Items Property</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; margin-top: 0.35rem;">
              <strong>ភាសាសាមញ្ញ ៖</strong> "បញ្ជូនតារាងទាំងមូលចូលក្នុងម៉ាស៊ីន។"<br><br>
              <strong>តួនាទីបច្ចេកទេស ៖</strong> Property របស់ Gallery សម្រាប់ភ្ជាប់ជាមួយ SharePoint List របស់អ្នក (ឧ. <code>Apex_Maintenance_Requests</code>)។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">ប្លង់មេគំរូ</span>
            <h4 style="color: #f8fafc; font-size: 1rem;">២. Template Cell</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; margin-top: 0.35rem;">
              <strong>ភាសាសាមញ្ញ ៖</strong> "ចម្លាក់ត្រាតាងកៅស៊ូ។"<br><br>
              <strong>តួនាទីបច្ចេកទេស ៖</strong> ជួរដំបូងបង្អស់នៅផ្នែកខាងលើនៃ Gallery ដែលមានស៊ុមពណ៌ទឹកក្រូច។ Control ណាដាក់ក្នុងនេះ នឹងចម្លងទៅគ្រប់ជួរទាំងអស់។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc;">ដែនកំណត់ទិន្នន័យជួរ</span>
            <h4 style="color: #f8fafc; font-size: 1rem;">៣. ThisItem</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; margin-top: 0.35rem;">
              <strong>ភាសាសាមញ្ញ ៖</strong> "ទិន្នន័យសម្រាប់តែជួរជាក់លាក់មួយនេះ។"<br><br>
              <strong>តួនាទីបច្ចេកទេស ៖</strong> កំណត់រូបមន្តឱ្យទាញយកតែទិន្នន័យនៃជួរដេកដែលកំពុងបង្ហាញខ្លួន (ឧ. <code>ThisItem.Title</code>)។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ការចុចរបស់អ្នកប្រើ</span>
            <h4 style="color: #f8fafc; font-size: 1rem;">៤. Selected</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; margin-top: 0.35rem;">
              <strong>ភាសាសាមញ្ញ ៖</strong> "កាតណាដែលអ្នកប្រើបានប៉ះចំ។"<br><br>
              <strong>តួនាទីបច្ចេកទេស ៖</strong> រក្សាទុកកំណត់ត្រាសកម្មទាំងមូលដែលអ្នកប្រើបានចុចលើ (ឧ. <code>galRequests.Selected</code>)។
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការរំលឹកជាចង្វាក់ ៖</strong> ហាត់ពត់ ៤ ពាក្យនេះជាមួយសិស្ស ៖ Items &rarr; Template &rarr; ThisItem &rarr; Selected។ ធ្វើម្តងទៀតពីរដង។</p>`
    },

    // Slide 8: The Architectural Gallery Pipeline Diagram
    {
      title: "ស្ថាបត្យកម្មលំហូរទិន្នន័យនៃ Gallery ៖ ចុងម្ខាងទៅចុងម្ខាង",
      segment: "ផ្នែកទី ៣ &bull; ដ្យាក្រាមស្ថាបត្យកម្ម Cloud",
      subtitle: "ស្វែងយល់ពីរបៀបដែល ១៥០ ជួរក្នុង SharePoint ក្លាយជាកាតនីមួយៗលើអេក្រង់ទូរស័ព្ទរបស់អ្នក។",
      content: `<div class="pipeline-stage">
            <div class="pipeline-node">
              <div class="pipeline-icon icon-table">&#128196;</div>
              <strong style="color: #5eead4; font-size: 0.95rem;">SharePoint List</strong>
              <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">ការផ្ទុកតារាងលើ Cloud</span>
              <p style="font-size: 0.8rem; color: #cbd5e1; margin-top: 0.5rem; line-height: 1.4;">
                សំបុត្រជួសជុល ១៥០ ករណីត្រូវបានកត់ត្រាទុកយ៉ាងមានសុវត្ថិភាពលើ Microsoft Datacenter។
              </p>
            </div>

            <div class="pipeline-arrow">&rarr;</div>

            <div class="pipeline-node">
              <div class="pipeline-icon icon-items">&#128260;</div>
              <strong style="color: #67e8f9; font-size: 0.95rem;">Gallery.Items</strong>
              <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">Property បញ្ជូនទិន្នន័យ</span>
              <p style="font-size: 0.8rem; color: #cbd5e1; margin-top: 0.5rem; line-height: 1.4;">
                Gallery ទាញយកកំណត់ត្រា ១៥០ ឆ្លងកាត់ Connector មកកាន់អង្គចងចាំថេប្លេត។
              </p>
            </div>

            <div class="pipeline-arrow">&rarr;</div>

            <div class="pipeline-node">
              <div class="pipeline-icon icon-thisitem">&#128394;</div>
              <strong style="color: #c084fc; font-size: 0.95rem;">ThisItem Scoping</strong>
              <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">ការបំបែកតាមជួរនីមួយៗ</span>
              <p style="font-size: 0.8rem; color: #cbd5e1; margin-top: 0.5rem; line-height: 1.4;">
                Power Apps រត់កាត់ជួរ ៖ ជួរទី ១ ទទួលទិន្នន័យករណី ១; ជួរទី ២ ទទួលទិន្នន័យករណី ២។
              </p>
            </div>

            <div class="pipeline-arrow">&rarr;</div>

            <div class="pipeline-node">
              <div class="pipeline-icon icon-selected">&#9757;</div>
              <strong style="color: #86efac; font-size: 0.95rem;">Gallery.Selected</strong>
              <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">ការចុចប៉ះរបស់អ្នកប្រើ</span>
              <p style="font-size: 0.8rem; color: #cbd5e1; margin-top: 0.5rem; line-height: 1.4;">
                កម្មករចុចលើជួរទី ៤ ៖ កំណត់ត្រានោះត្រូវបានជ្រើសរើស និងត្រៀមខ្លួនសម្រាប់ Edit Form ថ្ងៃស្អែក!
              </p>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការដើរតាមដំណើរការ ៖</strong> ចង្អុលពីឆ្វេងទៅស្តាំ។ បង្ហាញពីរបៀបដែល ១៥០ ជួរក្លាយជាកាតរមូរ និងរបៀបដែលការចុចរបស់អ្នកប្រើប្រាស់ដកស្រង់យកបានត្រឹមតែ ១ កំណត់ត្រាក្នុង Selected។</p>`
    },

    // Slide 9: Anatomy of the Template Cell
    {
      title: "រចនាសម្ព័ន្ធនៃប្រអប់គំរូ Template Cell ៖ ប្លង់មេមួយ បោះត្រា ១០០ ដង",
      segment: "ផ្នែកទី ៣ &bull; ស្ថាបត្យកម្ម UI ស៊ីជម្រៅ",
      subtitle: "មូលហេតុដែលអ្នកមិនត្រូវកែប្រែជួរទីពីរ ឬជួរទីបីនៅក្នុង Power Apps Gallery។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">ជួរមេគំរូ</span>
            <h3 class="card-title">របៀបដែល Template Cell គ្រប់គ្រងបញ្ជីទាំងមូល</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1rem;">
              នៅពេលអ្នកចុចលើ Gallery លើ Canvas សូមក្រឡេកមើលជួរខាងលើបំផុត។ អ្នកនឹងឃើញរូបតំណាងខ្មៅដៃតូចមួយ (<strong>Edit gallery</strong>) និងស៊ុមជ្រើសរើសពណ៌ទឹកក្រូច។
            </p>
            <div style="background: rgba(245, 158, 11, 0.08); border-left: 3px solid #f59e0b; padding: 0.85rem; border-radius: 0.4rem; margin-bottom: 1rem;">
              <strong style="color: #fcd34d; font-size: 0.88rem;">ច្បាប់មាសនៃការកែប្រែ Template ៖</strong>
              <p style="color: #fde68a; font-size: 0.82rem; margin-top: 0.2rem;">
                Control ណាដែលត្រូវបានដាក់ក្នុងជួរទីមួយ នឹងចម្លងទៅគ្រប់ជួរទាំងអស់ខាងក្រោមវាដោយស្វ័យប្រវត្តិ! អ្នកមិនអាចជ្រើសរើសជួរទី ២ ឬទី ៣ ដើម្បីដាក់ Control បានឡើយ។
              </p>
            </div>
            <p style="color: var(--text-muted); font-size: 0.85rem;">
              ប្រសិនបើអ្នកពង្រីកកម្ពស់ Template ដោយទាញចំណុចទាញខាងក្រោមចុះ ២០ ភីកសែល នោះគ្រប់ជួរទាំងអស់ក្នុង Gallery នឹងពង្រីកកម្ពស់ ២០ ភីកសែលស្មើៗគ្នា។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">សញ្ញាសម្គាល់</span>
            <h3 class="card-title">អ្វីដែលត្រូវដាក់ខាងក្នុង និងខាងក្រៅ</h3>
            <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-top: 0.5rem;">
              <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: rgba(16, 185, 129, 0.2); color: #10b981; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">&check;</div>
                <div>
                  <strong style="color: var(--text-main); font-size: 0.9rem;">នៅក្នុង Template ៖</strong>
                  <p style="color: var(--text-muted); font-size: 0.82rem;">Labels, ផ្លាកសញ្ញា, រូបតំណាងស្ថានភាព, សញ្ញាព្រួញ និងរូបភាពដែលផ្លាស់ប្តូរទៅតាមកំណត់ត្រានីមួយៗ។</p>
                </div>
              </div>

              <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: rgba(239, 68, 68, 0.2); color: #ef4444; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">&cross;</div>
                <div>
                  <strong style="color: var(--text-main); font-size: 0.9rem;">នៅខាងក្រៅ Gallery ៖</strong>
                  <p style="color: var(--text-muted); font-size: 0.82rem;">ចំណងជើងអេក្រង់, ប្រអប់ស្វែងរក Search, Dropdown តម្រៀប និងប៊ូតុង Submit មេដែលជាកម្មសិទ្ធិរបស់អេក្រង់ទាំងមូល។</p>
                </div>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការបង្ហាញកំហុស ៖</strong> បង្ហាញសិស្សនូវអ្វីដែលកើតឡើងប្រសិនបើពួកគេច្រឡំទម្លាក់ប្រអប់ Search ចូលក្នុង Template ៖ ប្រអប់ Search ១៥ នឹងបង្ហាញពាសពេញអេក្រង់! ពន្យល់ពីមូលហេតុ។</p>`
    },

    // Slide 10: Step-by-Step Procedure to Insert & Bind a Gallery
    {
      title: "ជំហានលម្អិតក្នុងការបញ្ចូល និងភ្ជាប់ Gallery ទៅកាន់ទិន្នន័យ",
      segment: "ផ្នែកទី ៤ &bull; ដំណើរការការងារក្នុង Studio",
      subtitle: "ជំហានជាក់លាក់ទាំង ៤ ចាប់ពីអេក្រង់ទទេ រហូតដល់បញ្ជីទិន្នន័យ Cloud ពេញលេញ។",
      content: `<div class="card">
            <span class="obj-num" style="margin-bottom: 0.75rem;">1</span>
            <h4 style="color: #f8fafc; font-size: 1rem;">បញ្ចូល Vertical Gallery</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; margin-top: 0.35rem;">
              ចុច <strong>+ Insert</strong> &rarr; ពង្រីក <strong>Layout</strong> &rarr; ជ្រើសយក <strong>Vertical gallery</strong>។ អូសវាឱ្យពេញពាក់កណ្តាលអេក្រង់ខាងឆ្វេង។
            </p>
            <div style="margin-top: auto; padding-top: 0.75rem; font-family: var(--font-code); font-size: 0.75rem; color: #67e8f9;">
              ឈ្មោះ ៖ galMaintenance
            </div>
          </div>

          <div class="card">
            <span class="obj-num" style="margin-bottom: 0.75rem;">2</span>
            <h4 style="color: #f8fafc; font-size: 1rem;">កំណត់ Property Items</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; margin-top: 0.35rem;">
              ក្នុងរបាររូបមន្ត (ជាមួយ property <code>Items</code>) វាយ ៖ <code>Apex_Maintenance_Requests</code> រួចចុច Enter។
            </p>
            <div style="margin-top: auto; padding-top: 0.75rem; font-family: var(--font-code); font-size: 0.75rem; color: #67e8f9;">
              galMaintenance.Items = Table
            </div>
          </div>

          <div class="card">
            <span class="obj-num" style="margin-bottom: 0.75rem;">3</span>
            <h4 style="color: #f8fafc; font-size: 1rem;">ជ្រើសរើស Layout</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; margin-top: 0.35rem;">
              ក្នុងផ្ទាំង Properties ខាងស្តាំ កំណត់ <strong>Layout</strong> ទៅជា <strong>Title and subtitle</strong> (ចំណងជើង និងចំណងជើងរង)។
            </p>
            <div style="margin-top: auto; padding-top: 0.75rem; font-family: var(--font-code); font-size: 0.75rem; color: #67e8f9;">
              Layout ៖ Title &amp; Subtitle
            </div>
          </div>

          <div class="card">
            <span class="obj-num" style="margin-bottom: 0.75rem;">4</span>
            <h4 style="color: #f8fafc; font-size: 1rem;">ភ្ជាប់ Fields តាម ThisItem</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; margin-top: 0.35rem;">
              ចុចលើ Label ចំណងជើងក្នុងជួរទីមួយ ហើយសរសេរ <code>ThisItem.Title</code>។ ចុច subtitle ហើយសរសេរ <code>ThisItem.MachineID</code>។
            </p>
            <div style="margin-top: auto; padding-top: 0.75rem; font-family: var(--font-code); font-size: 0.75rem; color: #67e8f9;">
              ThisItem.Title &check;
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>គន្លឹះក្នុង Studio ៖</strong> បង្ហាញសិស្សថា Power Apps តែងតែផ្តល់ Layout ដែលមានរូបភាពគំរូ។ ការជ្រើសរើស 'Title and Subtitle' ជួយឱ្យផ្ទាំងបង្ហាញស្អាត និងស័ក្តិសមសម្រាប់ទិន្នន័យរោងចក្រ។</p>`
    },

    // Slide 11: Deciphering ThisItem: Row Scope vs Table Arrays
    {
      title: "ស្វែងយល់ពី <code>ThisItem</code> ៖ ដែនកំណត់ជួរទល់នឹងតារាងទាំងមូល",
      segment: "ផ្នែកទី ៤ &bull; រូបមន្ត Power Fx ស៊ីជម្រៅ",
      subtitle: "មូលហេតុដែលការសរសេរឈ្មោះតារាងក្នុង Gallery បង្កជាកំហុស ហើយហេតុអ្វី ThisItem តែងតែត្រឹមត្រូវ។",
      content: `<div class="card" style="border-left: 3px solid #ef4444;">
            <span class="card-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">អន្ទាក់កូដសម្រាប់អ្នកចាប់ផ្តើម</span>
            <h3 class="card-title">ការសរសេរ <code>Apex_Maintenance_Requests.Title</code></h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; margin-bottom: 0.75rem;">
              អ្នកចាប់ផ្តើមតែងតែគិតថា ៖ <em>"Title នៅក្នុងតារាង ដូច្នេះខ្ញុំនឹងសរសេរឈ្មោះតារាងភ្ជាប់ជាមួយ Title ក្នុង Label។"</em>
            </p>
            <div style="background: #090e17; border: 1px solid var(--border-subtle); border-radius: 0.5rem; padding: 0.75rem; font-family: var(--font-code); font-size: 0.85rem; color: #fca5a5; margin-bottom: 0.75rem;">
              &cross; Label.Text = Apex_Maintenance_Requests.Title<br>
              <span style="color: #ef4444; font-size: 0.78rem;">// Error: រំពឹងទុកអត្ថបទមួយ តែបែរជាទទួលបានតារាងទាំងមូល (Table/Array)!</span>
            </div>
            <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.5;">
              <strong>មូលហេតុដែលខុស ៖</strong> ឈ្មោះតារាងសំដៅទៅលើជួរទាំង ១៥០ ក្នុងពេលតែមួយ! Label មួយមិនអាចបង្ហាញចំណងជើង ១៥០ ដំណាលគ្នាទេ ព្រោះវាមិនដឹងថាវាជាជួរណាមួយ។
            </p>
          </div>

          <div class="card" style="border-left: 3px solid var(--color-primary-light);">
            <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">ដំណោះស្រាយត្រឹមត្រូវ</span>
            <h3 class="card-title">ការសរសេរ <code>ThisItem.Title</code></h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; margin-bottom: 0.75rem;">
              ពាក្យគន្លឹះ <code>ThisItem</code> ប្រាប់ Power Fx ថា ៖ <em>"សូមផ្តល់ Title នៃកំណត់ត្រាជាក់លាក់ដែលកំពុងបោះត្រានៅពេលនេះ!"</em>
            </p>
            <div style="background: #090e17; border: 1px solid var(--border-subtle); border-radius: 0.5rem; padding: 0.75rem; font-family: var(--font-code); font-size: 0.85rem; color: #86efac; margin-bottom: 0.75rem;">
              &check; Label.Text = ThisItem.Title<br>
              <span style="color: #10b981; font-size: 0.78rem;">// ក្នុងជួរទី ១ -> "ម៉ាស៊ីន M-04 ឡើងកម្តៅ"<br>// ក្នុងជួរទី ២ -> "ខ្សែពាន C-02 រអិល"</span>
            </div>
            <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.5;">
              <strong>មូលហេតុដែលត្រឹមត្រូវ ៖</strong> <code>ThisItem</code> បង្កើតបានជាដែនកំណត់ទិន្នន័យតាមជួរនីមួយៗ។ រូបមន្តដដែលដំណើរការយ៉ាងត្រឹមត្រូវសម្រាប់គ្រប់ជួរទាំងអស់!
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការប្រៀបធៀប ៖</strong> ប្រសិនបើអ្នកដើរចូលក្នុងថ្នាក់ដែលមានសិស្ស ៣០ នាក់ ហើយស្រែកថា 'ឈ្មោះមនុស្ស!' ម្នាក់ៗនឹងស្រឡាំងកាំង។ ប៉ុន្តែបើអ្នកចង្អុលចំសិស្សម្នាក់ហើយនិយាយថា 'ឈ្មោះមនុស្សម្នាក់នេះ' នោះអ្នកនឹងទទួលបានចម្លើយយ៉ាងច្បាស់!</p>`
    },

    // Slide 12: Formatting Columns Inside the Template
    {
      title: "ការកំណត់ទម្រង់ជួរឈរក្នុង Template ៖ Text, Date និង Choice",
      segment: "ផ្នែកទី ៤ &bull; ប្រភេទជួរឈរ និងទម្រង់បង្ហាញ",
      subtitle: "ការអនុវត្តរូបមន្ត Power Fx ដ៏ត្រឹមត្រូវសម្រាប់ប្រភេទជួរឈរផ្សេងៗរបស់ SharePoint។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">Single Line of Text</span>
            <h3 class="card-title">Title និង MachineID</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
              ជួរឈរអត្ថបទសាមញ្ញមិនត្រូវការការបម្លែងអ្វីឡើយ។ អាចទាញយកអត្ថបទផ្ទាល់តែម្តង ៖
            </p>
            <div style="background: #090e17; padding: 0.75rem; border-radius: 0.4rem; font-family: var(--font-code); font-size: 0.82rem; color: #60a5fa; margin: 0.75rem 0;">
              ThisItem.Title<br>
              ThisItem.MachineID
            </div>
            <div style="font-size: 0.78rem; color: #10b981;">&check; អត្ថបទសុទ្ធ</div>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">Date &amp; Time Field</span>
            <h3 class="card-title">LoggedDate</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
              កាលបរិច្ឆេទ Cloud មើលទៅច្របូកច្របល់បើមិនកំណត់ទម្រង់ (ឧ. 2026-10-31T07:15)។ ត្រូវរុំជាមួយ <code>Text()</code> ៖
            </p>
            <div style="background: #090e17; padding: 0.75rem; border-radius: 0.4rem; font-family: var(--font-code); font-size: 0.82rem; color: #fcd34d; margin: 0.75rem 0;">
              Text(ThisItem.LoggedDate, "dd-mmm-yyyy")
            </div>
            <div style="font-size: 0.78rem; color: #10b981;">&check; បង្ហាញជា ៖ 31-Oct-2026</div>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(13, 148, 136, 0.2); color: #5eead4;">SharePoint Choice Field</span>
            <h3 class="card-title">Priority និង Status</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
              ជួរ Choice ផ្តល់តម្លៃជា Record Object។ អ្នកត្រូវតែបន្ថែម <code>.Value</code> នៅខាងចុង ៖
            </p>
            <div style="background: #090e17; padding: 0.75rem; border-radius: 0.4rem; font-family: var(--font-code); font-size: 0.82rem; color: #5eead4; margin: 0.75rem 0;">
              ThisItem.Priority.Value<br>
              ThisItem.Status.Value
            </div>
            <div style="font-size: 0.78rem; color: #10b981;">&check; ទាញយកពាក្យ ៖ "High"</div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការរំលឹកច្បាប់ Choice ៖</strong> បើអ្នកវាយ <code>ThisItem.Priority</code> ហើយឃើញបន្ទាត់ក្រហម កុំភ័យស្លន់ស្លោ! គ្រាន់តែបន្ថែម <code>.Value</code> នៅខាងចុង វានឹងប្រែជាពណ៌បៃតងភ្លាម។</p>`
    },

    // Slide 13: Interactive Widget 1: Master Template Simulator
    {
      title: "ឧបករណ៍ពិសោធគំរូមេ និងត្រាតាងកៅស៊ូផ្ទាល់ដៃ",
      segment: "ផ្នែកទី ៤ &bull; ឧបករណ៍ពិសោធអន្តរកម្ម",
      subtitle: "កែប្រែជួរគំរូមេខាងឆ្វេង ហើយសង្កេតមើលគ្រប់ជួរទាំងអស់ផ្លាស់ប្តូរតាមក្នុងពេលតែមួយ។",
      content: `<div class="studio-chrome">
            <div class="studio-chrome-header">
              <span>Master Template Controls</span>
              <span>Row 1 Blueprint</span>
            </div>
            <div class="studio-chrome-body">
              <label style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase;">ទំហំអក្សរចំណងជើង ៖</label>
              <input type="range" id="sim-font-size" min="14" max="22" value="16" style="width: 100%; margin: 0.5rem 0 1rem 0;" oninput="updateSimTemplate()">

              <label style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase;">កម្ពស់គម្លាតជួរ (Padding) ៖</label>
              <input type="range" id="sim-row-padding" min="8" max="24" value="14" style="width: 100%; margin: 0.5rem 0 1rem 0;" oninput="updateSimTemplate()">

              <label style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase;">ពណ៌អក្សរចំណងជើង ៖</label>
              <select id="sim-title-color" style="width: 100%; background: #0c1524; color: #f8fafc; border: 1px solid var(--border-subtle); padding: 0.5rem; border-radius: 0.4rem; margin: 0.5rem 0 1rem 0; font-size: 0.85rem;" onchange="updateSimTemplate()">
                <option value="#f8fafc">ពណ៌ស (#f8fafc)</option>
                <option value="#67e8f9">ពណ៌ខៀវខ្ចី Cyan (#67e8f9)</option>
                <option value="#fcd34d">ពណ៌លឿងទុំ Amber (#fcd34d)</option>
                <option value="#86efac">ពណ៌បៃតងខ្ចី Emerald (#86efac)</option>
              </select>

              <button class="hud-btn" style="width: 100%; justify-content: center; background: rgba(6, 182, 212, 0.2); border-color: var(--color-primary-light); color: #67e8f9;" onclick="resetSimTemplate()">
                កំណត់ទម្រង់ឡើងវិញ
              </button>
            </div>
          </div>

          <div class="card" style="background: rgba(12, 19, 31, 0.95); justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
                <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">ផ្ទាំងមើលគំរូ Gallery ផ្ទាល់</span>
                <span style="font-family: var(--font-code); font-size: 0.75rem; color: var(--text-dim);">Items: Apex_Maintenance_Requests</span>
              </div>
              <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 0.75rem;">
                ជួរទី ១ មានស៊ុមដាច់ៗពណ៌ទឹកក្រូច (Master Template)។ សង្កេតមើលការរំកិលរង្វាស់ខាងឆ្វេង ផ្លាស់ប្តូរ <strong>គ្រប់ជួរទាំង ៤ ដំណាលគ្នា</strong>!
              </p>
            </div>

            <div class="sim-gallery-box" id="sim-gallery-container">
              <div class="sim-gallery-row master-template" id="sim-row-1">
                <span class="sim-master-pill">Master Template Cell</span>
                <div>
                  <div class="sim-row-title" style="font-size: 1rem; font-weight: 700; color: #f8fafc;">ស្ទះរ៉ងធារាសាស្ត្រធ្លាយប្រេង</div>
                  <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.2rem;">ម៉ាស៊ីន M-04 &bull; 31-Oct-2026</div>
                </div>
                <span class="pill-priority-high">High</span>
              </div>

              <div class="sim-gallery-row" id="sim-row-2">
                <div>
                  <div class="sim-row-title" style="font-size: 1rem; font-weight: 700; color: #f8fafc;">ដងប៊ូឡឺម៉ូទ័រស្រែកឮខ្លាំង</div>
                  <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.2rem;">ខ្សែពាន C-02 &bull; 31-Oct-2026</div>
                </div>
                <span class="pill-priority-med">Medium</span>
              </div>

              <div class="sim-gallery-row" id="sim-row-3">
                <div>
                  <div class="sim-row-title" style="font-size: 1rem; font-weight: 700; color: #f8fafc;">សេនស័រកម្តៅដើរខុសប្រក្រតី</div>
                  <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.2rem;">ម៉ាស៊ីនកិន E-01 &bull; 30-Oct-2026</div>
                </div>
                <span class="pill-priority-low">Low</span>
              </div>

              <div class="sim-gallery-row" id="sim-row-4">
                <div>
                  <div class="sim-row-title" style="font-size: 1rem; font-weight: 700; color: #f8fafc;">ធ្លាយខ្យល់ម៉ាស៊ីនសង្កត់</div>
                  <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.2rem;">ម៉ាស៊ីនខ្យល់ K-03 &bull; 29-Oct-2026</div>
                </div>
                <span class="pill-priority-med">Medium</span>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>លំហាត់អន្តរកម្ម ៖</strong> ទាញរង្វាស់ទំហំអក្សរ។ សួរសិស្សថា ៖ "តើខ្ញុំបានកែជួរទី ៤ ដែរឬទេ?" ទេ! អ្នកគ្រាន់តែកែ Template ហើយ Power Apps ជាអ្នកចម្លងការកែប្រែនោះទៅគ្រប់ជួរទាំងអស់។</p>`
    },

    // Slide 14: Trainer Demonstration Script
    {
      title: "ការបង្ហាញផ្ទាល់របស់គ្រូបង្វឹក ៖ ជំហានចុចជាក់ស្តែង",
      segment: "ផ្នែកទី ៥ &bull; ការបង្ហាញផ្ទាល់របស់គ្រូ",
      subtitle: "សង្កេតមើលសកម្មភាពជាក់ស្តែងលើអេក្រង់ សំឡេងពន្យល់ និងចំណុចគ្រោះថ្នាក់ដែលត្រូវចៀសវាង។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">ដំណាក់កាលទី ១ &bull; ០-៥ នាទី</span>
            <h3 class="card-title">១. ទម្លាក់ និងភ្ជាប់ Gallery</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
              <strong>សកម្មភាពគ្រូ ៖</strong> ចុច Insert &rarr; Vertical Gallery។ ជ្រើសយក <code>Apex_Maintenance_Requests</code> ក្នុងប្រអប់ទិន្នន័យ។<br><br>
              <strong>សម្តីពន្យល់ ៖</strong> <em>"មើលចុះ ទិន្នន័យគំរូបាត់អស់ហើយ។ ក្នុងរយៈពេល ២ វិនាទី កំណត់ត្រាពិតប្រាកដទាំង ១៨ ពីរោងចក្របានបង្ហាញខ្លួនភ្លាមៗ!"</em>
            </p>
          </div>

          <div class="card" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.25); color: #fde68a;">ដំណាក់កាលទី ២ &bull; ៥-១០ នាទី</span>
            <h3 class="card-title" style="color: #f8fafc;">២. ការកែសម្រួលគំរូមេ (Template)</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
              <strong>សកម្មភាពគ្រូ ៖</strong> ចុចលើរូបខ្មៅដៃក្នុងជួរទី ១។ រំកិល Label ចំណងជើងទៅស្តាំ ១០ ភីកសែល។ បន្ថែម Label ថ្មីមួយទៀត។<br><br>
              <strong>សម្តីពន្យល់ ៖</strong> <em>"ឃើញទេ? គ្រប់ជួរទាំងអស់រំកិលតាម។ យើងប៉ះតែជួរទីមួយគត់ ហើយទុកឱ្យ Power Apps ជាអ្នកមើលថែជួរទី ២ ដល់ ១៥០។"</em>
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ដំណាក់កាលទី ៣ &bull; ១០-១៥ នាទី</span>
            <h3 class="card-title">៣. ការធ្វើតេស្តការជ្រើសរើស (Selected)</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
              <strong>សកម្មភាពគ្រូ ៖</strong> បន្ថែម Label នៅក្រៅ Gallery។ សរសេរ ៖ <code>"Active: " & galRequests.Selected.Title</code>។ ចុចជួរទី ៣។<br><br>
              <strong>សម្តីពន្យល់ ៖</strong> <em>"មើល Label ខាងក្រៅចុះ! វាយកទិន្នន័យជួរទី ៣ មកបង្ហាញភ្លាម។ នោះហើយជាមុខងាររបស់ <code>Gallery.Selected</code>!"</em>
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការបង្ហាញកំហុសចេតនា ៖</strong> សាកល្បងចុចលើជួរទី ២ ដោយផ្ទាល់ ហើយបង្ហាញថាមិនអាចបន្ថែម Control ក្នុងជួរទី ២ បានទេ។ បញ្ជាក់ថា ជួរទី ១ គឺជាកន្លែងតែមួយគត់ដែលអាចកែប្រែបាន។</p>`
    },

    // Slide 15: Guided Practice: Building the Maintenance Dispatch Gallery
    {
      title: "ការអនុវត្តផ្ទាល់ដៃ ៖ បង្កើតផ្ទាំង Dispatch ជួសជុល",
      segment: "ផ្នែកទី ៥ &bull; ការអនុវត្តផ្ទាល់ដៃរបស់សិស្ស",
      subtitle: "បើក Tab Browser ផ្ទាល់ខ្លួនរបស់អ្នក ហើយអនុវត្តតាម ៤ ដំណាក់កាលដែលមានរចនាសម្ព័ន្ធនេះឥឡូវនេះ។",
      content: `<div class="card">
            <h3 class="card-title">ការណែនាំតាមដំណាក់កាល</h3>
            <div class="objective-item">
              <span class="obj-num">A</span>
              <div>
                <strong>បញ្ចូល និងកំណត់ទីតាំង Gallery ៖</strong>
                <p>ទាញបញ្ចូល Vertical Gallery នៅពាក់កណ្តាលខាងឆ្វេង។ ដាក់ឈ្មោះថា <code>galMaintenance</code>។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">B</span>
              <div>
                <strong>ភ្ជាប់ប្រភពទិន្នន័យ Cloud ៖</strong>
                <p>កំណត់ <code>galMaintenance.Items = Apex_Maintenance_Requests</code>។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">C</span>
              <div>
                <strong>កំណត់ទម្រង់ជួរឈរ ៖</strong>
                <p>ភ្ជាប់អត្ថបទចំណងជើងទៅ <code>ThisItem.Title</code> និងចំណងជើងរងទៅ <code>ThisItem.MachineID</code>។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">D</span>
              <div>
                <strong>ភ្ជាប់ផ្ទាំងត្រួតពិនិត្យការជ្រើសរើស ៖</strong>
                <p>ដាក់ Label នៅផ្នែកខាងស្តាំដោយសរសេររូបមន្ត <code>galMaintenance.Selected.Title</code>។</p>
              </div>
            </div>
          </div>

          <div class="card" style="border-left: 3px solid var(--color-primary-light);">
            <h3 class="card-title">បញ្ជីផ្ទៀងផ្ទាត់ជោគជ័យរបស់សិស្ស</h3>
            <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-top: 0.5rem;">
              <label style="display: flex; align-items: center; gap: 0.65rem; font-size: 0.9rem; color: #e2e8f0;">
                <input type="checkbox" style="width: 18px; height: 18px;">
                <span>Vertical Gallery បង្ហាញជួរទិន្នន័យពី SharePoint យ៉ាងច្បាស់លាស់</span>
              </label>
              <label style="display: flex; align-items: center; gap: 0.65rem; font-size: 0.9rem; color: #e2e8f0;">
                <input type="checkbox" style="width: 18px; height: 18px;">
                <span>គ្រប់រូបមន្តក្នុងជួរប្រើប្រាស់ <code>ThisItem</code> ជំនួសឱ្យឈ្មោះតារាង</span>
              </label>
              <label style="display: flex; align-items: center; gap: 0.65rem; font-size: 0.9rem; color: #e2e8f0;">
                <input type="checkbox" style="width: 18px; height: 18px;">
                <span>ជួរ Choice ត្រូវបានហៅប្រើតាម <code>ThisItem.Priority.Value</code></span>
              </label>
              <label style="display: flex; align-items: center; gap: 0.65rem; font-size: 0.9rem; color: #e2e8f0;">
                <input type="checkbox" style="width: 18px; height: 18px;">
                <span>ការចុចលើជួរផ្សេងៗធ្វើឱ្យ Label ខាងក្រៅផ្លាស់ប្តូរតាមភ្លាមៗ</span>
              </label>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការជួយដោះស្រាយ ៖</strong> ដើរត្រួតពិនិត្យមើល។ ត្រូវប្រាកដថាសិស្សចុចគ្រាប់ចុច <kbd>Alt</kbd> ជាប់ពេលចុចតេស្តលើ Studio ដើម្បីសាកល្បងមុខងារជ្រើសរើស។</p>`
    },

    // Slide 16: Interactive Widget 2: Live Gallery Selector & Inspector
    {
      title: "ផ្ទាំងត្រួតពិនិត្យការជ្រើសរើសផ្ទាល់ ៖ <code>Gallery.Selected</code>",
      segment: "ផ្នែកទី ៦ &bull; ឧបករណ៍ពិសោធអន្តរកម្ម",
      subtitle: "ចុចលើករណីណាមួយក្នុង Gallery ខាងឆ្វេង ដើម្បីមើលរបៀបដែលផ្ទាំងខាងស្តាំអានទិន្នន័យនៃកំណត់ត្រាសកម្ម។",
      content: `<div class="sim-gallery-box" style="height: 100%;">
            <div class="sim-gallery-row selected" id="triage-row-1" onclick="selectTriageRow(1, 'ម៉ាស៊ីន M-04', 'ស្ទះរ៉ងធារាសាស្ត្រធ្លាយប្រេង', 'High', 'Davi Santos', '31-Oct-2026')">
              <div>
                <strong style="color: #f8fafc; font-size: 0.92rem;">ស្ទះរ៉ងធារាសាស្ត្រធ្លាយប្រេង</strong>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">ម៉ាស៊ីន M-04 &bull; 31-Oct-2026</div>
              </div>
              <span class="pill-priority-high">High</span>
            </div>

            <div class="sim-gallery-row" id="triage-row-2" onclick="selectTriageRow(2, 'ខ្សែពាន C-02', 'ដងប៊ូឡឺម៉ូទ័រស្រែកឮខ្លាំង', 'Medium', 'Bopha Chen', '31-Oct-2026')">
              <div>
                <strong style="color: #f8fafc; font-size: 0.92rem;">ដងប៊ូឡឺម៉ូទ័រស្រែកឮខ្លាំង</strong>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">ខ្សែពាន C-02 &bull; 31-Oct-2026</div>
              </div>
              <span class="pill-priority-med">Medium</span>
            </div>

            <div class="sim-gallery-row" id="triage-row-3" onclick="selectTriageRow(3, 'ម៉ាស៊ីនកិន E-01', 'សេនស័រកម្តៅដើរខុសប្រក្រតី', 'Low', 'Alex Vong', '30-Oct-2026')">
              <div>
                <strong style="color: #f8fafc; font-size: 0.92rem;">សេនស័រកម្តៅដើរខុសប្រក្រតី</strong>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">ម៉ាស៊ីនកិន E-01 &bull; 30-Oct-2026</div>
              </div>
              <span class="pill-priority-low">Low</span>
            </div>

            <div class="sim-gallery-row" id="triage-row-4" onclick="selectTriageRow(4, 'ម៉ាស៊ីនខ្យល់ K-03', 'ធ្លាយខ្យល់ម៉ាស៊ីនសង្កត់', 'High', 'Sokha Ly', '29-Oct-2026')">
              <div>
                <strong style="color: #f8fafc; font-size: 0.92rem;">ធ្លាយខ្យល់ម៉ាស៊ីនសង្កត់</strong>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">ម៉ាស៊ីនខ្យល់ K-03 &bull; 29-Oct-2026</div>
              </div>
              <span class="pill-priority-high">High</span>
            </div>
          </div>

          <div class="card" style="background: rgba(12, 19, 31, 0.95); justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ផ្ទាំងវិភាគកំណត់ត្រាសកម្ម</span>
                <span style="font-family: var(--font-code); font-size: 0.75rem; color: #67e8f9;">galRequests.Selected</span>
              </div>
              <h3 style="color: #f8fafc; font-size: 1.25rem; margin-bottom: 0.25rem;" id="triage-detail-title">ស្ទះរ៉ងធារាសាស្ត្រធ្លាយប្រេង</h3>
              <p style="color: var(--text-muted); font-size: 0.85rem;" id="triage-detail-machine">លេខសម្គាល់ម៉ាស៊ីន ៖ ម៉ាស៊ីន M-04</p>
            </div>

            <div style="background: #090e17; border: 1px solid var(--border-subtle); border-radius: 0.65rem; padding: 1rem; display: flex; flex-direction: column; gap: 0.65rem;">
              <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
                <span style="color: var(--text-muted);">កម្រិតអាទិភាព ៖</span>
                <span id="triage-detail-priority" class="pill-priority-high">High</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
                <span style="color: var(--text-muted);">កត់ត្រាដោយជាង ៖</span>
                <strong style="color: #f8fafc;" id="triage-detail-tech">Davi Santos</strong>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
                <span style="color: var(--text-muted);">កាលបរិច្ឆេទ ៖</span>
                <span style="color: #67e8f9; font-family: var(--font-code);" id="triage-detail-date">31-Oct-2026</span>
              </div>
            </div>

            <div style="background: rgba(255, 255, 255, 0.04); border-radius: 0.5rem; padding: 0.75rem; font-size: 0.82rem; color: #cbd5e1;">
              <strong>ស្ពានឆ្ពោះទៅថ្ងៃស្អែក (ថ្ងៃទី ២២) ៖</strong> ផ្ទាំងខាងស្តាំនេះនឹងត្រូវជំនួសដោយ <strong>Edit Form</strong> ដែលមាន <code>Item = galRequests.Selected</code>!
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការបង្ហាញការផ្លាស់ប្តូរ ៖</strong> ចុចជួរទី ១ រួចទី ៣ រួចទី ៤។ បង្ហាញពីរបៀបដែលផ្ទាំងខាងស្តាំផ្លាស់ប្តូរតាមភ្លាមៗដោយមិនបាច់សរសេរកូដ Event ស្មុគស្មាញឡើយ។</p>`
    },

    // Slide 17: 5 Dangerous Misconceptions vs. Cloud Reality
    {
      title: "ការយល់ច្រឡំគ្រោះថ្នាក់ ៥ យ៉ាង និងការពិតជាក់ស្តែងលើ Cloud",
      segment: "ផ្នែកទី ៦ &bull; ការកែតម្រូវកំហុស និងការយល់ច្រឡំ",
      subtitle: "ចៀសវាងអន្ទាក់ទាំង ៥ នេះ មុនពេលវាបង្កការយល់ច្រឡំលើការរចនា ឬបណ្តាលឱ្យរូបមន្តខូច។",
      content: `<div class="card">
            <div style="display: flex; flex-direction: column; gap: 0.85rem;">
              <div style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; padding: 0.75rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5; font-size: 0.88rem;">ការយល់ច្រឡំទី ១ ៖ "ខ្ញុំត្រូវតែសរសេរកូដសម្រាប់គ្រប់ជួរទាំងអស់ក្នុងតារាង។"</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.2rem 0 0 0;">
                  <strong>ការពិត ៖</strong> មិនពិតទេ! អ្នកសរសេរកូដតែម្តងគត់ក្នុង Template Cell។ Power Apps នឹងចម្លងវាសម្រាប់ ១, ១០ ឬ ១០,០០០ ជួរដោយស្វ័យប្រវត្តិ។
                </p>
              </div>

              <div style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; padding: 0.75rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5; font-size: 0.88rem;">ការយល់ច្រឡំទី ២ ៖ "ការកែជួរទី ៣ នឹងផ្លាស់ប្តូរតែការរចនារបស់ជួរទី ៣ ប៉ុណ្ណោះ។"</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.2rem 0 0 0;">
                  <strong>ការពិត ៖</strong> មិនពិតទេ! អ្នកមិនអាចកែជួរទី ៣ ដាច់ដោយឡែកបានឡើយ។ ការផ្លាស់ប្តូរណាដែលធ្វើឡើងលើ Template នឹងអនុវត្តលើគ្រប់ជួរទាំងអស់។
                </p>
              </div>

              <div style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; padding: 0.75rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5; font-size: 0.88rem;">ការយល់ច្រឡំទី ៣ ៖ "Gallery ចម្លងកំណត់ត្រាទាំងអស់មកទុកក្នុងទូរស័ព្ទ។"</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.2rem 0 0 0;">
                  <strong>ការពិត ៖</strong> មិនពិតទេ! Gallery គ្រាន់តែជាកញ្ចក់ឆ្លុះមើលទិន្នន័យពី SharePoint Cloud ឆ្លងកាត់ Connector ប៉ុណ្ណោះ។
                </p>
              </div>
            </div>
          </div>

          <div class="card">
            <div style="display: flex; flex-direction: column; gap: 0.85rem;">
              <div style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; padding: 0.75rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5; font-size: 0.88rem;">ការយល់ច្រឡំទី ៤ ៖ "ការសរសេរ ឈ្មោះតារាង.Title ដំណើរការក្នុង Gallery។"</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.2rem 0 0 0;">
                  <strong>ការពិត ៖</strong> ការហៅឈ្មោះតារាងនឹងផ្តល់មកវិញនូវ Array ទាំងមូល។ ក្នុងជួរនីមួយៗ អ្នកត្រូវតែប្រើ <code>ThisItem.Title</code> ដើម្បីកំណត់ជួរបច្ចុប្បន្ន។
                </p>
              </div>

              <div style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; padding: 0.75rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5; font-size: 0.88rem;">ការយល់ច្រឡំទី ៥ ៖ "ThisItem.Priority អាចបង្ហាញអក្សរលើអេក្រង់បាន។"</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.2rem 0 0 0;">
                  <strong>ការពិត ៖</strong> Priority ជាជួរ Choice! វាផ្តល់តម្លៃមកវិញជា Record Object។ អ្នកត្រូវតែសរសេរ <code>ThisItem.Priority.Value</code> ដើម្បីទាញយកអត្ថបទ។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការសង្កត់ធ្ងន់លើចំណុចទី ២ ៖</strong> ចងចាំថា ៖ Template ក្នុងជួរទី ១ គឺជាត្រាតាងកៅស៊ូ។ ពេលអ្នកចម្លាក់ត្រា រូបដែលបោះត្រាចេញមកទាំងអស់នឹងប្រែប្រួលតាមនោះ។</p>`
    },

    // Slide 18: Knowledge Check 1
    {
      title: "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង ៖ យន្តការនៃ Master Template",
      segment: "ផ្នែកទី ៧ &bull; សំណួរផ្ទៀងផ្ទាត់ ១ នៃ ៥",
      subtitle: "សាកល្បងការយល់ដឹងជាមូលដ្ឋានរបស់អ្នកអំពីរបៀបដែលការកែប្រែ Template ជះឥទ្ធិពលលើបញ្ជីទាំងមូល។",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ១ &bull; យន្តការស្នូល</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                តើមានអ្វីកើតឡើងចំពោះជួរដទៃទៀតក្នុង Vertical Gallery នៅពេលអ្នកប្តូរទំហំ Label នៅក្នុង Template Cell ទីមួយ (ខាងលើបង្អស់)?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'A', false, this)">
                  <strong>A.</strong> <span>ផ្លាស់ប្តូរតែជួរទី ១ ប៉ុណ្ណោះ; ជួរឯទៀតនៅរក្សាទំហំដើម</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'B', true, this)">
                  <strong>B.</strong> <span>គ្រប់ជួរទាំងអស់នឹងផ្លាស់ប្តូរទំហំ និងទីតាំងដូចគ្នាភ្លាមៗដោយស្វ័យប្រវត្តិ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'C', false, this)">
                  <strong>C.</strong> <span>Power Apps នឹងលុបជួរដទៃទៀតចោលពី Database</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'D', false, this)">
                  <strong>D.</strong> <span>Gallery នឹងទាមទារឱ្យអ្នកប្រើចុចយល់ព្រមម្តងមួយៗសម្រាប់រាល់កំណត់ត្រា</span>
                </button>
              </div>
            </div>

            <div class="quiz-inspector-card" id="quiz-feedback-1">
              <div class="feedback-placeholder">
                <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(6, 182, 212, 0.15); border: 1px solid rgba(6, 182, 212, 0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.85rem auto; font-size: 1.5rem; color: #67e8f9;">
                  &quest;
                </div>
                <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9; margin-bottom: 0.65rem;">ស្ថានភាព ៖ កំពុងរង់ចាំការជ្រើសរើសចម្លើយ</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-bottom: 0.5rem;">ផ្ទាំងវិភាគស្ថាបត្យកម្មផ្ទាល់</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; max-width: 380px; margin: 0 auto;">
                  សូមជ្រើសរើសចម្លើយខាងឆ្វេង (A, B, C ឬ D) ដើម្បីបញ្ជូនចម្លើយរបស់អ្នក និងបើកមើលការពន្យល់ស្ថាបត្យកម្មប្រព័ន្ធ។
                </p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-1" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-1">ស្ថាបត្យកម្ម Template យល់បានច្បាស់!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  ពិតជាត្រឹមត្រូវ! ជួរខាងលើបង្អស់គឺជាប្លង់មេ។ នៅពេលអ្នកកែប្រែលក្ខណៈរូបវន្តណាមួយក្នុង Template Cell នោះ Power Apps នឹងចម្លងការផ្លាស់ប្តូរនោះទៅគ្រប់កំណត់ត្រាទាំងអស់ក្នុង Gallery ភ្លាមៗ។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ពិនិត្យជម្រើស A ៖</strong> ពន្យល់ថាជម្រើស A គឺជាទម្រង់ការងារដោយដៃបែបចាស់។ នៅក្នុងស្ថាបត្យកម្ម Low-Code ការប្រើ Template ធានាបាននូវភាពស៊ីសង្វាក់គ្នានៃការរចនា ១០០%។</p>`
    },

    // Slide 19: Knowledge Check 2
    {
      title: "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង ៖ ហេតុផលស្ថាបត្យកម្ម 'Why' នៃ ThisItem",
      segment: "ផ្នែកទី ៧ &bull; សំណួរផ្ទៀងផ្ទាត់ ២ នៃ ៥",
      subtitle: "មូលហេតុដែល Power Fx ទាមទារពាក្យគន្លឹះកំណត់ជួរ ជំនួសឱ្យការប្រើឈ្មោះតារាងទូទៅ។",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ២ &bull; សំណួរស្វែងយល់ហេតុផល 'Why'</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                ហេតុអ្វីបានជា Power Fx ប្រើប្រាស់ពាក្យគន្លឹះ <code>ThisItem</code> ជំនួសឱ្យឈ្មោះតារាងនៅក្នុងរូបមន្តជួរដេករបស់ Gallery?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'A', false, this)">
                  <strong>A.</strong> <span>ដោយសារវិស្វករ Microsoft គិតថាពាក្យ 'ThisItem' មើលទៅឡូយជាង</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'B', false, this)">
                  <strong>B.</strong> <span>ដោយសារឈ្មោះតារាងមិនអាចវាយបញ្ចូលលើអេក្រង់ទូរស័ព្ទបាន</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'C', true, this)">
                  <strong>C.</strong> <span>ដោយសារឈ្មោះតារាងសំដៅលើជួរទាំង ១៥០ ខណៈ 'ThisItem' កំណត់រូបមន្តឱ្យទាញយកតែទិន្នន័យនៃជួរដេកបច្ចុប្បន្ន</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'D', false, this)">
                  <strong>D.</strong> <span>ដោយសារ 'ThisItem' បកប្រែអត្ថបទជាភាសាអង់គ្លេសដោយស្វ័យប្រវត្តិ</span>
                </button>
              </div>
            </div>

            <div class="quiz-inspector-card" id="quiz-feedback-2">
              <div class="feedback-placeholder">
                <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(6, 182, 212, 0.15); border: 1px solid rgba(6, 182, 212, 0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.85rem auto; font-size: 1.5rem; color: #67e8f9;">
                  &quest;
                </div>
                <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9; margin-bottom: 0.65rem;">ស្ថានភាព ៖ កំពុងរង់ចាំការជ្រើសរើសចម្លើយ</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-bottom: 0.5rem;">ផ្ទាំងវិភាគស្ថាបត្យកម្មផ្ទាល់</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; max-width: 380px; margin: 0 auto;">
                  សូមជ្រើសរើសចម្លើយខាងឆ្វេង (A, B, C ឬ D) ដើម្បីបញ្ជូនចម្លើយរបស់អ្នក និងបើកមើលការពន្យល់ស្ថាបត្យកម្មប្រព័ន្ធ។
                </p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-2" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-2">ការកំណត់ដែនទិន្នន័យច្បាស់លាស់!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  ពូកែណាស់! ឈ្មោះតារាងសំដៅលើទិន្នន័យទាំង ១៥០ កំណត់ត្រា (Array)។ <code>ThisItem</code> ដើរតួជាទ្រនិចចង្អុលបង្ហាញចំកំណត់ត្រាតែមួយដែលកំពុងត្រូវបានបង្ហាញនៅលើជួរនោះនៃអេក្រង់។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការសង្កត់ធ្ងន់លើដែនទិន្នន័យ ៖</strong> រំលឹកសិស្សពីថ្ងៃទី ១០ ៖ កំណត់ត្រាគឺជាជួរដេកមួយ។ <code>ThisItem</code> មានន័យថា 'ជួរមួយនេះនៅទីនេះ'។</p>`
    },

    // Slide 20: Knowledge Check 3
    {
      title: "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង ៖ \"តើមានអ្វីកើតឡើងប្រសិនបើ\" កំណត់ត្រាត្រូវបានលុប",
      segment: "ផ្នែកទី ៧ &bull; សំណួរផ្ទៀងផ្ទាត់ ៣ នៃ ៥",
      subtitle: "ស្វែងយល់ពីការរៀបចំជួរឡើងវិញដោយស្វ័យប្រវត្តិនៅពេលទិន្នន័យក្នុង Cloud ត្រូវបានលុបចេញ។",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ៣ &bull; ការរៀបចំជួរឡើងវិញ</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                ជាងម្នាក់ក្នុងរោងចក្របានដោះស្រាយ និងលុបសំបុត្រជួសជុលទី ៣ ក្នុង SharePoint ចោល ខណៈដែល Davi កំពុងមើល Gallery។ តើមានអ្វីកើតឡើងពេល Gallery ធ្វើការ Refresh?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'A', false, this)">
                  <strong>A.</strong> <span>ប្រហោងពណ៌សទទេមួយលេចឡើងនៅលើអេក្រង់ត្រង់កន្លែងសំបុត្រទី ៣</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'B', false, this)">
                  <strong>B.</strong> <span>App នឹងគាំងដំណើរការ ហើយបង្ហាញកំហុស Error</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'C', true, this)">
                  <strong>C.</strong> <span>ជួរទី ៣ នឹងបាត់ទៅ ហើយជួរខាងក្រោមក៏រំកិលឡើងលើមកបំពេញចន្លោះដោយរលូន គ្មានចន្លោះប្រហោងឡើយ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'D', false, this)">
                  <strong>D.</strong> <span>គ្រប់សំបុត្រជួសជុលផ្សេងទៀតត្រូវបានលុបចោលដោយស្វ័យប្រវត្តិ</span>
                </button>
              </div>
            </div>

            <div class="quiz-inspector-card" id="quiz-feedback-3">
              <div class="feedback-placeholder">
                <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(6, 182, 212, 0.15); border: 1px solid rgba(6, 182, 212, 0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.85rem auto; font-size: 1.5rem; color: #67e8f9;">
                  &quest;
                </div>
                <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9; margin-bottom: 0.65rem;">ស្ថានភាព ៖ កំពុងរង់ចាំការជ្រើសរើសចម្លើយ</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-bottom: 0.5rem;">ផ្ទាំងវិភាគស្ថាបត្យកម្មផ្ទាល់</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; max-width: 380px; margin: 0 auto;">
                  សូមជ្រើសរើសចម្លើយខាងឆ្វេង (A, B, C ឬ D) ដើម្បីបញ្ជូនចម្លើយរបស់អ្នក និងបើកមើលការពន្យល់ស្ថាបត្យកម្មប្រព័ន្ធ។
                </p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-3" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-3">ការរៀបចំជួរស្វ័យប្រវត្តិបញ្ជាក់បានត្រឹមត្រូវ!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  ពិតជាអស្ចារ្យ! ដោយសារ Gallery គឺជាប្រអប់ដែលចេះបង្កើតជួរដដែលៗ មិនមែនជា Label ងាប់នោះទេ វានឹងរៀបចំបញ្ជីឡើងវិញយ៉ាងស្អាតនៅរាល់ពេលដែលមានការបន្ថែម ឬលុបជួរចេញពី SharePoint។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ប្រៀបធៀបជាមួយវិធីចាស់ ៖</strong> រំលឹកសិស្សពី Labels ទាំង ៥៤ របស់អ្នកអភិវឌ្ឍន៍ដំបូង ៖ បើពួកគេប្រើ Labels ងាប់ នោះការលុបជួរទី ៣ នឹងបន្សល់ទុកប្រហោងទទេស្អាតមួយលើអេក្រង់។</p>`
    },

    // Slide 21: Knowledge Check 4
    {
      title: "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង ៖ អន្ទាក់ជួរឈរ Choice របស់ SharePoint",
      segment: "ផ្នែកទី ៧ &bull; សំណួរផ្ទៀងផ្ទាត់ ៤ នៃ ៥",
      subtitle: "ការយល់ដឹងអំពីប្រភេទជួរឈរខុសគ្នារវាង OptionSets របស់ SharePoint និង Label របស់ Power Apps។",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ៤ &bull; អន្ទាក់ប្រភេទជួរឈរ</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                ហេតុអ្វីបានជាការសរសេរ <code>ThisItem.Priority</code> បង្ហាញបន្ទាត់រលកក្រហមកូដ Error នៅពេលដែល <code>Priority</code> ជាជួរ Choice ក្នុង SharePoint?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'A', false, this)">
                  <strong>A.</strong> <span>ដោយសារ SharePoint ហាមឃាត់មិនឱ្យប្រើជួរ Choice ក្នុង Gallery ឡើយ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'B', true, this)">
                  <strong>B.</strong> <span>ដោយសារជួរ Choice ផ្តល់តម្លៃជា Record Object; អ្នកត្រូវសរសេរ 'ThisItem.Priority.Value' ដើម្បីទាញយកអត្ថបទ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'C', false, this)">
                  <strong>C.</strong> <span>ដោយសារ Priority ត្រូវតែបម្លែងទៅជាលេខជាមុនសិន</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'D', false, this)">
                  <strong>D.</strong> <span>ដោយសារអ្នកត្រូវតែរុំវាជាមួយអនុគមន៍ 'Notify()'</span>
                </button>
              </div>
            </div>

            <div class="quiz-inspector-card" id="quiz-feedback-4">
              <div class="feedback-placeholder">
                <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(6, 182, 212, 0.15); border: 1px solid rgba(6, 182, 212, 0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.85rem auto; font-size: 1.5rem; color: #67e8f9;">
                  &quest;
                </div>
                <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9; margin-bottom: 0.65rem;">ស្ថានភាព ៖ កំពុងរង់ចាំការជ្រើសរើសចម្លើយ</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-bottom: 0.5rem;">ផ្ទាំងវិភាគស្ថាបត្យកម្មផ្ទាល់</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; max-width: 380px; margin: 0 auto;">
                  សូមជ្រើសរើសចម្លើយខាងឆ្វេង (A, B, C ឬ D) ដើម្បីបញ្ជូនចម្លើយរបស់អ្នក និងបើកមើលការពន្យល់ស្ថាបត្យកម្មប្រព័ន្ធ។
                </p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-4" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-4">សុវត្ថិភាពប្រភេទជួរឈរយល់បានច្បាស់!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  ពិតប្រាកដណាស់! ជួរ Choice ក្នុង SharePoint មិនមែនជាអត្ថបទធម្មតាទេ តែជា Record ដែលផ្ទុក Property ឈ្មោះ <code>Value</code>។ ការសរសេរ <code>ThisItem.Priority.Value</code> នឹងទាញយកពាក្យ ("High", "Medium", "Low") បានយ៉ាងត្រឹមត្រូវ។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>គន្លឹះចងចាំរូបមន្ត ៖</strong> "ចាំជានិច្ច ៖ Choice ត្រូវការ .Value! Person ត្រូវការ .DisplayName! កុំភ្លេចសញ្ញាចុច (Dot) ឱ្យសោះ!"</p>`
    },

    // Slide 22: Knowledge Check 5
    {
      title: "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង ៖ ការអានទិន្នន័យតាម <code>Gallery.Selected</code>",
      segment: "ផ្នែកទី ៧ &bull; សំណួរផ្ទៀងផ្ទាត់ ៥ នៃ ៥",
      subtitle: "ការបញ្ជូនទិន្នន័យពីធាតុដែលបានចុចក្នុង Gallery ទៅកាន់ផ្នែកផ្សេងទៀតនៃអេក្រង់។",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ៥ &bull; ស្ថានភាពអន្តរកម្ម</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                តើ Control ផ្សេងទៀតនៅលើអេក្រង់ (នៅខាងក្រៅ Gallery) អាចដឹងថាតើកម្មករបានចុចលើសំបុត្រជួសជុលមួយណាដោយរបៀបណា?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(5, 'A', false, this)">
                  <strong>A.</strong> <span>តាមរយៈការអាន Global Variable ឈ្មោះ 'varClicked'</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(5, 'B', true, this)">
                  <strong>B.</strong> <span>តាមរយៈការហៅប្រើ 'GalleryName.Selected.FieldName' (ឧ. galMaintenance.Selected.Title)</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(5, 'C', false, this)">
                  <strong>C.</strong> <span>តាមរយៈការទាក់ទងសួរ SharePoint ម្តងទៀតដោយប្រើអនុគមន៍ 'LookUp()'</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(5, 'D', false, this)">
                  <strong>D.</strong> <span>តាមរយៈការ Restart ថេប្លេតឡើងវិញ</span>
                </button>
              </div>
            </div>

            <div class="quiz-inspector-card" id="quiz-feedback-5">
              <div class="feedback-placeholder">
                <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(6, 182, 212, 0.15); border: 1px solid rgba(6, 182, 212, 0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.85rem auto; font-size: 1.5rem; color: #67e8f9;">
                  &quest;
                </div>
                <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9; margin-bottom: 0.65rem;">ស្ថានភាព ៖ កំពុងរង់ចាំការជ្រើសរើសចម្លើយ</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-bottom: 0.5rem;">ផ្ទាំងវិភាគស្ថាបត្យកម្មផ្ទាល់</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; max-width: 380px; margin: 0 auto;">
                  សូមជ្រើសរើសចម្លើយខាងឆ្វេង (A, B, C ឬ D) ដើម្បីបញ្ជូនចម្លើយរបស់អ្នក និងបើកមើលការពន្យល់ស្ថាបត្យកម្មប្រព័ន្ធ។
                </p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-5" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-5">ជំនាញជ្រើសរើសអន្តរកម្មយល់បានច្បាស់!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  ឥតខ្ចោះ! Gallery រក្សាទុកតម្លៃក្នុង property <code>Selected</code> ដោយស្វ័យប្រវត្តិ។ កាតណាដែលអ្នកប្រើប៉ះចំ នឹងក្លាយជាសកម្ម ដែលអនុញ្ញាតឱ្យគ្រប់ Label, ប៊ូតុង ឬ Form អាចអានជួរឈររបស់វាបានភ្លាមៗ!
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ស្ពានឆ្ពោះទៅមុខ ៖</strong> "សូមកត់សម្គាល់ជម្រើស B គឺជាស្ពានមាសទៅកាន់ថ្ងៃទី ២២! ថ្ងៃស្អែក Edit Form របស់យើងនឹងមាន <code>Item = galMaintenance.Selected</code>!"</p>`
    },

    // Slide 23: Final Capstone Challenge
    {
      title: "ការវាយតម្លៃចុងក្រោយ ៖ ផ្ទាំងបញ្ជា Dispatch ជួសជុលក្នុងរោងចក្រ",
      segment: "ផ្នែកទី ៧ &bull; ការវាយតម្លៃជាក់ស្តែង",
      subtitle: "រៀបចំរចនាសម្ព័ន្ធចំណុចប្រទាក់បញ្ជូនការងារពេញលេញសម្រាប់មេការវេននៅរោងចក្រ Apex Plastics។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">សេចក្តីសង្ខេបប្រតិបត្តិការរោងចក្រ</span>
            <h3 class="card-title">បញ្ហាប្រឈមនៃផ្ទាំង Triage ក្នុងរោងចក្រ</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; margin-bottom: 1rem;">
              សាងសង់ផ្ទាំងបញ្ជាដែលមានពីរផ្នែកនៅលើអេក្រង់តែមួយ ៖
            </p>
            <div style="display: flex; flex-direction: column; gap: 0.65rem;">
              <div style="background: rgba(255, 255, 255, 0.04); padding: 0.75rem; border-radius: 0.4rem; border-left: 3px solid #0284c7;">
                <strong style="color: #67e8f9; font-size: 0.85rem;">ផ្ទាំងខាងឆ្វេង (Vertical Gallery) ៖</strong>
                <p style="color: var(--text-muted); font-size: 0.8rem; margin-top: 0.2rem;">បង្ហាញ <code>Apex_Maintenance_Requests</code> ជាមួយ Title, MachineID និងផ្លាកពណ៌ Priority។</p>
              </div>
              <div style="background: rgba(255, 255, 255, 0.04); padding: 0.75rem; border-radius: 0.4rem; border-left: 3px solid #10b981;">
                <strong style="color: #86efac; font-size: 0.85rem;">ផ្ទាំងខាងស្តាំ (Detail Inspection Card) ៖</strong>
                <p style="color: var(--text-muted); font-size: 0.8rem; margin-top: 0.2rem;">អានទិន្នន័យពី <code>galMaintenance.Selected</code> ដើម្បីបង្ហាញព័ត៌មានលម្អិត, ឈ្មោះជាង និងកាលបរិច្ឆេទ។</p>
              </div>
            </div>
          </div>

          <div class="card" style="border-left: 3px solid var(--color-primary-light);">
            <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">តារាងពិន្ទុវាយតម្លៃ ១០០ ពិន្ទុ</span>
            <h3 class="card-title">ប្លង់ដំណោះស្រាយស្ថាបត្យកម្ម</h3>
            <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.4rem;">
                <span style="font-size: 0.85rem; color: #cbd5e1;">A. ភ្ជាប់ Gallery ទៅកាន់ SharePoint Data Source</span>
                <span style="font-family: var(--font-code); color: #67e8f9; font-weight: bold;">២៥ ពិន្ទុ</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.4rem;">
                <span style="font-size: 0.85rem; color: #cbd5e1;">B. រៀបចំ Template Cell មិនឱ្យមានការជាន់អក្សរគ្នា</span>
                <span style="font-family: var(--font-code); color: #67e8f9; font-weight: bold;">២៥ ពិន្ទុ</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.4rem;">
                <span style="font-size: 0.85rem; color: #cbd5e1;">C. ហៅប្រើជួរ Choice តាមរយៈ .Value យ៉ាងត្រឹមត្រូវ</span>
                <span style="font-family: var(--font-code); color: #67e8f9; font-weight: bold;">២៥ ពិន្ទុ</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 0.4rem;">
                <span style="font-size: 0.85rem; color: #cbd5e1;">D. ភ្ជាប់ផ្ទាំងលម្អិតតាមរយៈ Gallery.Selected</span>
                <span style="font-family: var(--font-code); color: #67e8f9; font-weight: bold;">២៥ ពិន្ទុ</span>
              </div>
            </div>
            <div style="margin-top: auto; padding-top: 1rem; color: #86efac; font-weight: 700; font-size: 0.9rem;">
              ពិន្ទុសរុប ៖ ១០០/១០០ &bull; វិញ្ញាបនបត្រស្ថាបត្យករ UI សហគ្រាស
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការអបអរសាទរ ៖</strong> អ្នកបានយកឈ្នះលើ Gallery ដោយជោគជ័យហើយ! អ្នកចេះពីរបៀបបម្លែងជួរ Cloud រាប់រយជួរឱ្យក្លាយជាប្រព័ន្ធអាជីវកម្មដ៏ទំនើប។</p>`
    },

    // Slide 24: Bridge Forward to Day 22
    {
      title: "ផែនទីតភ្ជាប់ និងស្ពានចម្លងឆ្ពោះទៅកាន់ថ្ងៃទី ២២",
      segment: "ផ្នែកទី ៨ &bull; គោលដៅបន្ទាប់",
      subtitle: "អ្នកចេះអាន និងជ្រើសរើសកំណត់ត្រាហើយ។ ថ្ងៃស្អែក អ្នកនឹងកែប្រែពួកវា ហើយសរសេរត្រឡប់ទៅ SharePoint វិញ!",
      content: `<div class="card" style="border-left: 3px solid #0d9488;">
            <span class="card-badge" style="background: rgba(13, 148, 136, 0.2); color: #5eead4;">ថ្ងៃទី ២០ បានសម្រេច</span>
            <h3 class="card-title">ការតភ្ជាប់ SharePoint</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
              បានតភ្ជាប់បំពង់បង្ហូរទិន្នន័យ Cloud និងផ្ទៀងផ្ទាត់សិទ្ធិតាម Microsoft Entra ID។ មូលដ្ឋានទិន្នន័យរង់ចាំទទួលបញ្ជា។
            </p>
            <div style="margin-top: auto; padding-top: 1rem; color: #5eead4; font-weight: 700; font-size: 0.85rem;">
              &check; ស្ពាន Cloud ត្រូវបានបង្កើត
            </div>
          </div>

          <div class="card" style="border-left: 3px solid var(--color-primary-light); background: rgba(6, 182, 212, 0.1);">
            <span class="card-badge" style="background: rgba(6, 182, 212, 0.25); color: #67e8f9;">ថ្ងៃទី ២១ ៖ ថ្ងៃនេះ</span>
            <h3 class="card-title">Gallery ៖ អាន និងជ្រើសរើស</h3>
            <p style="color: var(--text-main); font-size: 0.85rem; line-height: 1.6;">
              Vertical Gallery ទទួលទិន្នន័យពី <code>Items</code>។ គំរូមេ Master Template ត្រូវបានបោះត្រាកាត់គ្រប់ជួរទាំងអស់។ ការចុចរបស់អ្នកប្រើកំណត់ជួរសកម្មតាម <code>Selected</code>។
            </p>
            <div style="margin-top: auto; padding-top: 1rem; color: #67e8f9; font-weight: 700; font-size: 0.85rem;">
              &check; ស្ទាត់ជំនាញលើ UI ដដែលៗ និងការជ្រើសរើស
            </div>
          </div>

          <div class="card" style="border-left: 3px solid #8b5cf6;">
            <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc;">ថ្ងៃស្អែក ៖ ថ្ងៃទី ២២</span>
            <h3 class="card-title">Forms ៖ កែប្រែកំណត់ត្រាមួយ</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
              ថ្ងៃស្អែក យើងបន្ថែម <strong>Edit Form</strong>។ Property <code>Item</code> របស់វានឹងស្មើ <code>galMaintenance.Selected</code> ហើយការចុច Save នឹងកែប្រែទិន្នន័យក្នុង SharePoint ភ្លាមៗ!
            </p>
            <div style="margin-top: auto; padding-top: 1rem; color: #c084fc; font-weight: 700; font-size: 0.85rem;">
              &rarr; ថ្ងៃទី ២២ ៖ ការកែប្រែទិន្នន័យទៅមក
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ស្ពានឆ្ពោះទៅមុខ (២ នាទី) ៖</strong> មានមោទនភាពចំពោះអ្វីដែលអ្នកបានកសាងនៅថ្ងៃនេះ! ថ្ងៃស្អែកលើថ្ងៃទី ២២ យើងនឹងយកកំណត់ត្រាដែលអ្នកបានចុចលើ Gallery ទៅបង្ហាញលើ Edit Form ពេញលេញ។ ជួបគ្នានៅថ្ងៃស្អែក!</p>`
    }
  ];

  // --------------------------------------------------------------------------
  // 3. CACHE ENGLISH CONTENT FOR SEAMLESS 2-WAY TOGGLING
  // --------------------------------------------------------------------------
  const ENGLISH_SLIDES = slides.map((slide) => {
    const titleEl = slide.querySelector('.slide-header h2') || slide.querySelector('.hero-title');
    const subtitleEl = slide.querySelector('.slide-header .subtitle') || slide.querySelector('.hero-subtitle');
    const segmentEl = slide.querySelector('.section-tag') || slide.querySelector('.hero-badge');
    const contentEl = slide.querySelector('.slide-content');
    const notesEl = slide.querySelector('aside.trainer-notes');

    return {
      title: titleEl ? titleEl.innerHTML : '',
      subtitle: subtitleEl ? subtitleEl.innerHTML : '',
      segment: segmentEl ? segmentEl.innerHTML : '',
      content: contentEl ? contentEl.innerHTML : '',
      notes: notesEl ? notesEl.innerHTML : ''
    };
  });

  // --------------------------------------------------------------------------
  // 4. CORE NAVIGATION & SLIDE MANAGEMENT
  // --------------------------------------------------------------------------
  function showSlide(index) {
    if (index < 0 || index >= totalSlides) return;

    slides[currentSlideIndex].classList.remove('active');
    currentSlideIndex = index;
    slides[currentSlideIndex].classList.add('active');

    updateProgress();
    updateNotesDrawer();
    bindInteractiveWidgets();
  }

  function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
      showSlide(currentSlideIndex + 1);
    }
  }

  function prevSlide() {
    if (currentSlideIndex > 0) {
      showSlide(currentSlideIndex - 1);
    }
  }

  function updateProgress() {
    const progressBar = document.getElementById('progress-bar');
    const slideCounter = document.getElementById('slide-counter');

    const percent = ((currentSlideIndex + 1) / totalSlides) * 100;
    if (progressBar) progressBar.style.width = `${percent}%`;

    if (slideCounter) {
      slideCounter.textContent = isKhmerActive
        ? `ស្លាយ ${currentSlideIndex + 1} / ${totalSlides}`
        : `Slide ${currentSlideIndex + 1} / ${totalSlides}`;
    }
  }

  // --------------------------------------------------------------------------
  // 5. BILINGUAL TOGGLE ENGINE (Exact 1-to-1 Child Replacement)
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
        void ripple.offsetWidth; // Reflow
        ripple.classList.add('rippling');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 8. TRAINER NOTES DRAWER (SLIDES OUT ONLY WHEN N PRESSED)
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
        ? `កំណត់ចំណាំស្លាយទី ${currentSlideIndex + 1}`
        : `Slide ${currentSlideIndex + 1} Trainer Notes`;
    }

    const dataSource = isKhmerActive ? KHMER_SLIDES : ENGLISH_SLIDES;
    const activeData = dataSource[currentSlideIndex];

    notesBody.innerHTML = (activeData && activeData.notes)
      ? activeData.notes
      : '<p>No specific script notes for this slide.</p>';
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
    const grid = document.getElementById('overview-grid');
    if (!grid) return;

    grid.innerHTML = '';
    slides.forEach((slide, idx) => {
      const card = document.createElement('div');
      card.className = `overview-card ${idx === currentSlideIndex ? 'active' : ''}`;
      
      const titleText = isKhmerActive && KHMER_SLIDES[idx]
        ? KHMER_SLIDES[idx].title
        : slide.getAttribute('data-title') || `Slide ${idx + 1}`;

      card.innerHTML = `
        <span class="overview-card-num">${isKhmerActive ? 'ស្លាយ ' + (idx + 1) : 'SLIDE ' + (idx + 1)}</span>
        <div class="overview-card-title">${titleText}</div>
      `;

      card.addEventListener('click', () => {
        showSlide(idx);
        toggleOverview();
      });

      grid.appendChild(card);
    });
  }

  // --------------------------------------------------------------------------
  // 10. INTERACTIVE WIDGET 1: MASTER TEMPLATE SIMULATOR (SLIDE 13)
  // --------------------------------------------------------------------------
  window.updateSimTemplate = function () {
    const fontSize = document.getElementById('sim-font-size')?.value || 16;
    const padding = document.getElementById('sim-row-padding')?.value || 14;
    const color = document.getElementById('sim-title-color')?.value || '#f8fafc';

    const rows = document.querySelectorAll('.sim-gallery-row');
    rows.forEach(row => {
      row.style.padding = `${padding}px 1.15rem`;
      const title = row.querySelector('.sim-row-title');
      if (title) {
        title.style.fontSize = `${fontSize}px`;
        title.style.color = color;
      }
    });
  };

  window.resetSimTemplate = function () {
    const fontInput = document.getElementById('sim-font-size');
    const padInput = document.getElementById('sim-row-padding');
    const colorSelect = document.getElementById('sim-title-color');

    if (fontInput) fontInput.value = 16;
    if (padInput) padInput.value = 14;
    if (colorSelect) colorSelect.value = '#f8fafc';

    window.updateSimTemplate();
  };

  // --------------------------------------------------------------------------
  // 11. INTERACTIVE WIDGET 2: GALLERY SELECTOR & INSPECTOR (SLIDE 16)
  // --------------------------------------------------------------------------
  window.selectTriageRow = function (rowNum, machine, title, priority, tech, date) {
    const rows = document.querySelectorAll('#slide-16 .sim-gallery-row');
    rows.forEach(r => r.classList.remove('selected'));

    const activeRow = document.getElementById(`triage-row-${rowNum}`);
    if (activeRow) activeRow.classList.add('selected');

    const detailTitle = document.getElementById('triage-detail-title');
    const detailMachine = document.getElementById('triage-detail-machine');
    const detailPriority = document.getElementById('triage-detail-priority');
    const detailTech = document.getElementById('triage-detail-tech');
    const detailDate = document.getElementById('triage-detail-date');

    if (detailTitle) detailTitle.textContent = title;
    if (detailMachine) detailMachine.textContent = isKhmerActive ? `លេខសម្គាល់ម៉ាស៊ីន ៖ ${machine}` : `Equipment ID: ${machine}`;
    if (detailTech) detailTech.textContent = tech;
    if (detailDate) detailDate.textContent = date;

    if (detailPriority) {
      detailPriority.textContent = priority;
      detailPriority.className = priority === 'High'
        ? 'pill-priority-high'
        : (priority === 'Medium' ? 'pill-priority-med' : 'pill-priority-low');
    }
  };

  // --------------------------------------------------------------------------
  // 12. KNOWLEDGE CHECK QUIZ ENGINE (SLIDES 18 TO 22) - DUAL-STATE INSPECTOR
  // --------------------------------------------------------------------------
  window.handleQuizAnswer = function (qNum, choice, isCorrect, btn) {
    const slide = slides[currentSlideIndex];
    if (!slide) return;

    // Highlight clicked option
    const options = slide.querySelectorAll('.quiz-option-btn');
    options.forEach(b => {
      b.classList.remove('correct', 'wrong');
      b.style.pointerEvents = 'none'; // Lock after first answer
    });

    if (isCorrect) {
      btn.classList.add('correct');
    } else {
      btn.classList.add('wrong');
      // Highlight the correct answer for pedagogical reinforcement
      options.forEach(b => {
        if (b.onclick && b.onclick.toString().includes('true')) {
          b.classList.add('correct');
        }
      });
    }

    // Transform Inspector Card (Column 2) from Awaiting to Answered state
    const inspectorCard = slide.querySelector('.quiz-inspector-card');
    const placeholder = slide.querySelector('.feedback-placeholder');
    const content = slide.querySelector('.feedback-content');
    const badge = slide.querySelector(`#quiz-badge-${qNum}`);
    const status = slide.querySelector(`#quiz-status-${qNum}`);

    if (inspectorCard) inspectorCard.classList.add('answered');
    if (placeholder) placeholder.style.display = 'none';
    if (content) content.style.display = 'flex';

    if (badge && status) {
      if (isCorrect) {
        badge.style.background = 'rgba(16, 185, 129, 0.2)';
        badge.style.color = '#86efac';
        badge.textContent = isKhmerActive ? 'ត្រឹមត្រូវ!' : 'Correct!';
        status.style.color = '#86efac';
        status.textContent = isKhmerActive ? 'យល់ដឹងបានច្បាស់លាស់!' : 'Architecture Mastered!';
      } else {
        badge.style.background = 'rgba(239, 68, 68, 0.2)';
        badge.style.color = '#fca5a5';
        badge.textContent = isKhmerActive ? 'មិនទាន់ត្រឹមត្រូវ!' : 'Incorrect';
        status.style.color = '#fca5a5';
        status.textContent = isKhmerActive ? 'សូមពិនិត្យការពន្យល់ស្ថាបត្យកម្ម ៖' : 'Review System Architecture Rationale:';
      }
    }
  };

  function bindInteractiveWidgets() {
    // Re-bind click handlers or dynamic states when slides change
  }

  // --------------------------------------------------------------------------
  // 13. GLOBAL KEYBOARD & SHORTCUT CONTROLLER
  // --------------------------------------------------------------------------
  function handleKeyDown(e) {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

    switch (e.key) {
      case 'ArrowRight':
      case 'PageDown':
      case ' ':
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
        showSlide(0);
        break;

      case 'End':
        e.preventDefault();
        showSlide(totalSlides - 1);
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
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
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
      if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
    }
  }

  // --------------------------------------------------------------------------
  // 13. GLOBAL WINDOW EXPORTS (Ensures Instant Inline onclick Functionality)
  // --------------------------------------------------------------------------
  window.prevSlide = prevSlide;
  window.nextSlide = nextSlide;
  window.showSlide = showSlide;
  window.goToSlide = showSlide; // alias for universal compatibility
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
  // 14. INITIALIZATION
  // --------------------------------------------------------------------------
  function init() {
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

    initPointerAndSpotlight();
    updateProgress();
    updateTimerDisplay();
    showSlide(0);

    console.log('Day 21 Presentation loaded successfully (Lesson 14 Exact DOM Architecture)!');
  }

  if (document.readyState === 'loading') {
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
  } else {
    init();
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
