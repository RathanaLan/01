/* ============================================================================
   POWER APPS FOUNDATION: DAY 22 PRESENTATION ENGINE
   Topic: Forms: One Record, Many Fields
   Phase: Phase 7: Power Apps Data Integration
   Theme: Microsoft Fluent 2 Dark Mode (Form Amber Gold & Power Fx Cyan)
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
  // 2. KHMER SLIDES DATA STORE (Direct Child Elements Only - Exact 1-to-1 Match)
  // --------------------------------------------------------------------------
  const KHMER_SLIDES = [
    // Slide 1: Hero Title
    {
      title: "Forms ៖ កំណត់ត្រាមួយ វាលទិន្នន័យជាច្រើន",
      segment: "ដំណាក់កាលទី ៧ ៖ ការរួមបញ្ចូលទិន្នន័យ Power Apps",
      subtitle: "Gallery ប្រើសម្រាប់រមូរមើលកំណត់ត្រារាប់រយជួរ ប៉ុន្តែ Edit Form ប្រើសម្រាប់ពិនិត្យព័ត៌មានលម្អិត។ ថ្ងៃនេះយើងនឹងស្ទាត់ជំនាញលើស្ថាបត្យកម្ម Form ៖ តភ្ជាប់កំណត់ត្រាអាជីវកម្មតែមួយដែលបានជ្រើសរើស ទៅកាន់ DataCards ដែលអាចកែប្រែបានយ៉ាងរលូន។",
      content: `<div class="hero-badge">
            <span>គ្រឹះវិជ្ជាជីវៈ Microsoft Power Apps</span>
            <span>&bull;</span>
            <span>ថ្ងៃទី ២២ នៃ ២៧</span>
          </div>
          <h1 class="hero-title">Forms ៖ កំណត់ត្រាមួយ វាលទិន្នន័យជាច្រើន</h1>
          <p class="hero-subtitle">
            Gallery ប្រើសម្រាប់រមូរមើលកំណត់ត្រារាប់រយជួរ ប៉ុន្តែ Edit Form ប្រើសម្រាប់ពិនិត្យព័ត៌មានលម្អិត។ ថ្ងៃនេះយើងនឹងស្ទាត់ជំនាញលើស្ថាបត្យកម្ម Form ៖ តភ្ជាប់កំណត់ត្រាអាជីវកម្មតែមួយដែលបានជ្រើសរើស ទៅកាន់ DataCards ដែលអាចកែប្រែបានយ៉ាងរលូន។
          </p>

          <div class="model-chain">
            <span class="chain-item">បញ្ហាជាក់ស្តែង</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ដំណើរការ</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ទិន្នន័យ</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item active">UI / អេក្រង់ [FORM]</span>
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
<p><strong>ការបើកមេរៀន (២ នាទី) ៖</strong> សូមស្វាគមន៍មកកាន់ថ្ងៃទី ២២! កាលពីម្សិលមិញ យើងបានប្រើ Gallery ដើម្បីរមូរមើលបញ្ជីសំបុត្រជួសជុល ១៥០ ករណី។ ប៉ុន្តែជួរនីមួយៗបង្ហាញបានតែ Title និង Priority ប៉ុណ្ណោះ។ ចុះបើជាងត្រូវការពិនិត្យ និងកែប្រែព័ត៌មានលម្អិតទាំង ១២ ជួរឈរ? ថ្ងៃនេះ Form នឹងបើកកាតាឡុកព័ត៌មានលម្អិតនោះជូនអ្នក!</p>`
    },

    // Slide 2: Agenda & Objectives
    {
      title: "របៀបវារៈ ៩០ នាទី និងគោលបំណងរំពឹងទុកជាក់ស្តែង",
      segment: "ផ្នែកទី ១ &bull; ផែនការមេរៀន និងកាលវិភាគ",
      subtitle: "ដំណើរការរៀនជាវង់តំរៀប (Spiral Learning) ពីបញ្ហាប្រឈមនៃ Input រាយប៉ាយ រហូតដល់ការបង្កើត Form សហគ្រាសដ៏រឹងមាំ។",
      content: `<div class="card">
            <h3 class="card-title">៤ គោលបំណងរំពឹងទុកជាក់ស្តែង</h3>
            <div class="objective-item">
              <span class="obj-num">1</span>
              <div>
                <strong>យល់ច្បាស់ពីស្ថាបត្យកម្ម Form ៖</strong>
                <p>ពន្យល់ជាភាសាសាមញ្ញពីមូលហេតុដែល Edit Form គឺជាប្រអប់ផ្ទុកឆ្លាតវៃ ដោយមិនបាច់អូស Text Inputs រាយប៉ាយដោយដៃឡើយ។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">2</span>
              <div>
                <strong>ស្ទាត់ជំនាញលើ Property មាស <code>Form.Item</code> ៖</strong>
                <p>កំណត់រូបមន្ត <code>Form.Item = galRequests.Selected</code> ដើម្បីទាញយកទិន្នន័យនៃជួរដែលបានចុចក្នុង Gallery មកបង្ហាញភ្លាមៗ។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">3</span>
              <div>
                <strong>វិភាគរចនាសម្ព័ន្ធនៃប្រអប់ទិន្នន័យ DataCard ៖</strong>
                <p>កំណត់សម្គាល់ ៤ ផ្នែកនៃ DataCard (Key, Value, Star, ErrorMessage) និងយល់ពីរបៀប Unlock កាតដោយសុវត្ថិភាព។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">4</span>
              <div>
                <strong>បែងចែក ៣ ស្ថានភាពនៃ FormMode ៖</strong>
                <p>គ្រប់គ្រងភាពខុសគ្នានៃអាកប្បកិរិយារវាង <code>FormMode.Edit</code>, <code>FormMode.View</code> និង <code>FormMode.New</code>។</p>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">កាលវិភាគលម្អិត ៩០ នាទី</h3>
            <div class="agenda-timeline">
              <div class="agenda-row">
                <span class="agenda-time">០០ - ០៨ នាទី</span>
                <div><strong>រំលឹកចំណេះដឹង និងគំរូផ្នត់គំនិត ៖</strong> តភ្ជាប់ថ្ងៃ ១០, ១១, ២០, ២១ មកកាន់បញ្ហា "កំណត់ត្រាតែមួយ"។</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time">០៨ - ២០ នាទី</span>
                <div><strong>វិបត្តិការងារ និងការប្រៀបធៀប ៖</strong> គ្រោះមហន្តរាយនៃ Inputs ៣០ រាយប៉ាយ; ស្រោមឯកសារវេជ្ជសាស្ត្រ។</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time">២០ - ៣២ នាទី</span>
                <div><strong>រចនាសម្ព័ន្ធ (Structure) និង Property មាស ៖</strong> ការបំបែក DataCards និងដែនកំណត់ទិន្នន័យនៃ <code>Form.Item</code>។</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time">៣២ - ៤៥ នាទី</span>
                <div><strong>ការបង្ហាញផ្ទាល់របស់គ្រូ ៖</strong> បញ្ចូល Edit Form, បន្ថែម Fields និងភ្ជាប់ជាមួយ <code>galRequests.Selected</code>។</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time">៤៥ - ៦៥ នាទី</span>
                <div><strong>ការអនុវត្តផ្ទាល់ដៃក្រោមការណែនាំ ៖</strong> បង្កើតផ្ទាំង Master-Detail ជួសជុលរបស់រោងចក្រ Apex។</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time">៦៥ - ៧៥ នាទី</span>
                <div><strong>កិច្ចការអនុវត្តឯករាជ្យ ៖</strong> ភ្ជាប់ជួរ Choice, តម្រៀបលំដាប់កាត និងប៊ូតុងប្តូរ Mode។</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time">៧៥ - ៩០ នាទី</span>
                <div><strong>កែតម្រូវការយល់ច្រឡំ និងស្ពានឆ្ពោះទៅមុខ ៖</strong> ៥ សំណួរស្ថាបត្យកម្ម និងស្ពានទៅកាន់ <code>SubmitForm()</code> ថ្ងៃទី ២៣។</div>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការកំណត់ការរំពឹងទុក ៖</strong> ប្រាប់សិស្សថា ៖ "ថ្ងៃនេះជាថ្ងៃដែលអ្នកឈប់គ្រាន់តែមើលទិន្នន័យ ហើយចាប់ផ្តើមរៀបចំអេក្រង់ដែលអនុញ្ញាតឱ្យអ្នកប្រើប្រាស់កែប្រែទិន្នន័យជាក់ស្តែង!"</p>`
    },

    // Slide 3: Concept Map Continuity
    {
      title: "ដំណើររឿងបន្តបន្ទាប់នៃកម្មវិធីសិក្សា ៖ ដំណើរទិន្នន័យ",
      segment: "ផ្នែកទី ១ &bull; ភាពបន្តគ្នានៃកម្មវិធីសិក្សា",
      subtitle: "កាលពីម្សិលមិញយើងរមូរមើលបញ្ជី។ ថ្ងៃនេះយើងពិនិត្យកំណត់ត្រា។ ថ្ងៃស្អែកយើងរក្សាទុកការកែប្រែជាអចិន្ត្រៃយ៍។",
      content: `<div class="card" style="border-left: 3px solid #0d9488;">
            <span class="card-badge" style="background: rgba(13, 148, 136, 0.2); color: #5eead4;">ថ្ងៃទី ២១ ៖ កាលពីម្សិលមិញ</span>
            <h3 class="card-title">Gallery ៖ រមូរមើលកំណត់ត្រាជាច្រើន</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">
              យើងបានកំណត់ <code>galRequests.Items = Apex_Maintenance_Requests</code>។ គំរូមេមួយបានបង្កើតកាតរាប់រយជួរ ហើយការចុចរបស់អ្នកប្រើបានកំណត់ <code>galRequests.Selected</code>។
            </p>
            <div style="margin-top: auto; padding-top: 1rem; color: #5eead4; font-weight: 600; font-size: 0.85rem;">
              &check; តារាង Cloud &rarr; បញ្ជីរមូរលើ UI
            </div>
          </div>

          <div class="card" style="border-left: 3px solid var(--color-warning); background: rgba(245, 158, 11, 0.08);">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.25); color: #fcd34d;">ថ្ងៃទី ២២ ៖ ថ្ងៃនេះ</span>
            <h3 class="card-title">Form ៖ កំណត់ត្រាមួយ វាលទិន្នន័យជាច្រើន</h3>
            <p style="color: var(--text-main); font-size: 0.9rem; line-height: 1.6;">
              យើងយកកំណត់ត្រាតែមួយពី <code>galRequests.Selected</code> មកបញ្ជូនចូលក្នុង <code>Form.Item</code>។ Form នឹងបង្កើត DataCards យ៉ាងមានរបៀបរៀបរយសម្រាប់គ្រប់ជួរឈរទាំង ១៥។
            </p>
            <div style="margin-top: auto; padding-top: 1rem; color: #fcd34d; font-weight: 700; font-size: 0.85rem;">
              &bull; ជួរដែលបានជ្រើសរើស &rarr; វាលទិន្នន័យកែប្រែបាន
            </div>
          </div>

          <div class="card" style="border-left: 3px solid #8b5cf6;">
            <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc;">ថ្ងៃទី ២៣ ៖ ថ្ងៃស្អែក</span>
            <h3 class="card-title">SubmitForm ៖ រក្សាទុកក្នុង Cloud</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">
              នៅពេលជាង Davi កែប្រែទិន្នន័យក្នុង Form រួចរាល់ គាត់នឹងចុច Save! យើងដំណើរការ <code>SubmitForm(frmMaintenance)</code> ដើម្បីសរសេរគ្រប់ការកែប្រែត្រឡប់ទៅ SharePoint វិញ។
            </p>
            <div style="margin-top: auto; padding-top: 1rem; color: #c084fc; font-weight: 600; font-size: 0.85rem;">
              &rarr; រក្សាទុកការកែប្រែត្រឡប់ទៅ Cloud
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការតភ្ជាប់គ្នា ៖</strong> បង្ហាញខ្សែសង្វាក់ ៖ Gallery (រកមើល) &rarr; Form (ពិនិត្យ/កែសម្រួល) &rarr; SubmitForm (រក្សាទុក)។ នេះជាបេះដូងនៃប្រព័ន្ធគ្រប់គ្រងអាជីវកម្ម ៩០% លើពិភពលោក!</p>`
    },

    // Slide 4: Prerequisite Retrieval
    {
      title: "ការរំលឹកចំណេះដឹងគ្រឹះ ៖ ៤ ចំណុចបង្គោល",
      segment: "ផ្នែកទី ២ &bull; ការរំលឹកការចងចាំ",
      subtitle: "ចុចលើកាតណាមួយដើម្បីត្រឡប់មើលការពន្យល់ និងរបៀបដែលមេរៀនមុនៗផ្តល់ថាមពលដល់ Form ថ្ងៃនេះ។",
      content: `<div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.15); color: #93c5fd;">ថ្ងៃទី ១០ &bull; Tables</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-top: 0.5rem;">Record និង Table?</h4>
                <p style="color: var(--text-muted); font-size: 0.85rem;">តើអ្វីជាភាពខុសគ្នាជាមូលដ្ឋាន?</p>
                <div class="flip-hint">&circlearrowright; ចុចដើម្បីត្រឡប់</div>
              </div>
              <div class="flip-card-back">
                <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">ចំណេះដឹងគ្រឹះ</span>
                <h4 style="color: #67e8f9; font-size: 1rem; margin-top: 0.5rem;">ជួរមួយទល់នឹងជួរច្រើន</h4>
                <p style="color: #e2e8f0; font-size: 0.82rem; line-height: 1.5;">
                  <strong>Table</strong> គឺជាបណ្តុំជួរទាំងអស់។ ចំណែក <strong>Record</strong> គឺជាជួរដេកតែមួយដែលមានតម្លៃសម្រាប់ជួរឈរនីមួយៗ។
                </p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.15); color: #93c5fd;">ថ្ងៃទី ១១ &bull; Schema</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-top: 0.5rem;">ប្រភេទជួរឈរ?</h4>
                <p style="color: var(--text-muted); font-size: 0.85rem;">ហេតុអ្វីបានជា Type សំខាន់ចំពោះ Input?</p>
                <div class="flip-hint">&circlearrowright; ចុចដើម្បីត្រឡប់</div>
              </div>
              <div class="flip-card-back">
                <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">ចំណេះដឹងគ្រឹះ</span>
                <h4 style="color: #67e8f9; font-size: 1rem; margin-top: 0.5rem;">ទម្រង់ត្រូវនឹងទិន្នន័យ</h4>
                <p style="color: #e2e8f0; font-size: 0.82rem; line-height: 1.5;">
                  Text ត្រូវការប្រអប់អត្ថបទ; Number ត្រូវការលេខ; Choice ត្រូវការ Dropdown; Date ត្រូវការប្រតិទិន។ Form រៀបចំរបស់ទាំងនេះដោយស្វ័យប្រវត្តិ!
                </p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.15); color: #93c5fd;">ថ្ងៃទី ២០ &bull; SharePoint</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-top: 0.5rem;">តើអ្វីជា DataSource?</h4>
                <p style="color: var(--text-muted); font-size: 0.85rem;">តើ Form យកជួរឈរមកពីណា?</p>
                <div class="flip-hint">&circlearrowright; ចុចដើម្បីត្រឡប់</div>
              </div>
              <div class="flip-card-back">
                <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">ចំណេះដឹងគ្រឹះ</span>
                <h4 style="color: #67e8f9; font-size: 1rem; margin-top: 0.5rem;">រចនាសម្ព័ន្ធលើ Cloud</h4>
                <p style="color: #e2e8f0; font-size: 0.82rem; line-height: 1.5;">
                  <code>Apex_Maintenance_Requests</code> គឺជាប្រភពទិន្នន័យ។ វាជាអ្នកកំណត់ថាតើមានជួរឈរណាខ្លះ ហើយជួរណាដែលតម្រូវឱ្យបំពេញជាដាច់ខាត។
                </p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.15); color: #93c5fd;">ថ្ងៃទី ២១ &bull; Gallery</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-top: 0.5rem;">Gallery.Selected?</h4>
                <p style="color: var(--text-muted); font-size: 0.85rem;">តើតម្លៃរបស់វាជាអ្វី?</p>
                <div class="flip-hint">&circlearrowright; ចុចដើម្បីត្រឡប់</div>
              </div>
              <div class="flip-card-back">
                <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">ចំណេះដឹងគ្រឹះ</span>
                <h4 style="color: #67e8f9; font-size: 1rem; margin-top: 0.5rem;">កំណត់ត្រាសកម្ម</h4>
                <p style="color: #e2e8f0; font-size: 0.82rem; line-height: 1.5;">
                  វាផ្តល់នូវកំណត់ត្រាតែមួយគត់ដែលអ្នកប្រើបានចុចលើ! ថ្ងៃនេះ យើងនឹងបញ្ជូនកំណត់ត្រានេះទៅកាន់ <code>Form.Item</code> ដោយផ្ទាល់។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការរំលឹកសិស្ស ៖</strong> សួរថា ៖ "តើអ្នកណាចាំថាពេលយើងចុចលើជួរទី ៣ ក្នុង Gallery តើ <code>galRequests.Selected</code> មានផ្ទុកអ្វី?" រង់ចាំឱ្យសិស្សឆ្លើយថាកំណត់ត្រាទី ៣ ទាំងមូល។</p>`
    },

    // Slide 5: The Workplace Crisis
    {
      title: "វិបត្តិការងារ ៖ \"គ្រោះមហន្តរាយនៃ Inputs ៣០ រាយប៉ាយ\"",
      segment: "ផ្នែកទី ៣ &bull; ហេតុអ្វីបានជា Form ត្រូវតែមាន",
      subtitle: "មូលហេតុដែលការសាងសង់អេក្រង់ដោយគ្មាន Form បង្កជាមហន្តរាយដល់ការសរសេរកូដ និងការខូចខាតទិន្នន័យ។",
      content: `<div class="card" style="border-left: 3px solid #ef4444;">
            <span class="card-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">សេណារីយ៉ូនៃការខូចខាត &bull; វេនទី ២ ម៉ោង ០៨ ៖ ៣០ ព្រឹក</span>
            <h3 class="card-title">ឧប្បត្តិហេតុជួសជុលនៅ Apex Plastics</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1rem;">
              ជាង Davi ចុចលើសំបុត្រ #104 ក្នុង Gallery ៖ <em>"ស្ទះរ៉ងធារាសាស្ត្រធ្លាយប្រេងលើម៉ាស៊ីនសង្កត់ P-04"</em>។ ដើម្បីជួសជុល គាត់ត្រូវពិនិត្យ និងកែប្រែ ១២ វាលទិន្នន័យ (កម្រិតគ្រោះថ្នាក់, សម្ពាធ PSI, រយៈពេល, គ្រឿងបន្លាស់, កំណត់ចំណាំ)។
            </p>
            <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); padding: 0.85rem; border-radius: 0.5rem; margin-bottom: 1rem;">
              <strong style="color: #fca5a5; font-size: 0.88rem;">កំហុសរបស់អ្នកអភិវឌ្ឍន៍ថ្មីថ្មោង ៖</strong>
              <p style="color: #fecaca; font-size: 0.82rem; margin-top: 0.25rem;">
                អ្នកអភិវឌ្ឍន៍ថ្មីបានអូស <strong>Text Inputs ចំនួន ១២ និង Labels ចំនួន ១២ ផ្សេងគ្នា</strong> មកដាក់លើអេក្រង់។ រាល់ Input ទាំងអស់ត្រូវសរសេររូបមន្តដោយដៃដើម្បីទាញយកទិន្នន័យ។ ពេលចុច Save គាត់ត្រូវសរសេរកូដ <code>Patch()</code> វែងដល់ទៅ ៤០ ជួរដើម្បីផ្គូផ្គងគ្រប់ប្រអប់ទាំងអស់។
              </p>
            </div>
            <p style="color: var(--text-muted); font-size: 0.85rem;">
              ការវាយខុសអក្សរតែមួយបានធ្វើឱ្យប្រអប់ "សម្ពាធ PSI" ទៅសរសេរជាន់លើ "លេខសម្គាល់ម៉ាស៊ីន"! ការផលិតត្រូវបានផ្អាកអស់ ៤ ម៉ោងដោយសារទិន្នន័យច្របូកច្របល់។
            </p>
          </div>

          <div class="card" style="border-left: 3px solid var(--color-warning);">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">ដំណោះស្រាយស្ថាបត្យកម្ម</span>
            <h3 class="card-title">ហេតុអ្វីបានជា Edit Form ជាជម្រើសតែមួយគត់</h3>
            <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-top: 0.5rem;">
              <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: rgba(16, 185, 129, 0.2); color: #10b981; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">&check;</div>
                <div>
                  <strong style="color: #86efac; font-size: 0.9rem;">ប្រអប់ផ្ទុកឯកភាពតែមួយ ៖</strong>
                  <p style="color: var(--text-muted); font-size: 0.82rem;">Form ភ្ជាប់ជាមួយជួរដេកទាំងមូលក្នុង SharePoint ក្នុងពេលតែមួយ ដោយមិនបាច់ភ្ជាប់ Input ម្តងមួយៗឡើយ។</p>
                </div>
              </div>

              <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: rgba(16, 185, 129, 0.2); color: #10b981; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">&check;</div>
                <div>
                  <strong style="color: #86efac; font-size: 0.9rem;">កំណត់ប្រភេទដោយស្វ័យប្រវត្តិ ៖</strong>
                  <p style="color: var(--text-muted); font-size: 0.82rem;">ជួរ Choice ទទួលបាន Choice Dropdown ពិតប្រាកដ; Date ទទួលបានប្រតិទិនជ្រើសរើសដោយស្វ័យប្រវត្តិ។</p>
                </div>
              </div>

              <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: rgba(16, 185, 129, 0.2); color: #10b981; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">&check;</div>
                <div>
                  <strong style="color: #86efac; font-size: 0.9rem;">ប្រព័ន្ធផ្ទៀងផ្ទាត់ និងកំហុសស្រេច ៖</strong>
                  <p style="color: var(--text-muted); font-size: 0.82rem;">ជួរដែលតម្រូវឱ្យបំពេញទទួលបានសញ្ញាផ្កាយក្រហម ហើយសារជូនដំណឹងកំហុសនឹងបង្ហាញខ្លួនដោយស្វ័យប្រវត្តិ។</p>
                </div>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការប្រៀបធៀប ៖</strong> ការអូស Text Inputs ១២ មកដាក់លើអេក្រង់ ប្រៀបដូចជាការទិញគ្រឿងបន្លាស់ម៉ូតូរាប់រយដុំមកផ្គុំជិះខ្លួនឯង។ ឯ Form គឺដូចជាម៉ូតូដែលគេដំឡើងរួចស្រេច មានទាំងហ្វ្រាំង និងភ្លើងបំភ្លឺសុវត្ថិភាព!</p>`
    },

    // Slide 6: Everyday Physical Analogy
    {
      title: "ការប្រៀបធៀបក្នុងជីវិតជាក់ស្តែង ៖ ស្រោមឯកសារវេជ្ជសាស្ត្ររបស់អ្នកជំងឺ",
      segment: "ផ្នែកទី ៣ &bull; គំរូផ្នត់គំនិតក្នុងជីវិតពិត",
      subtitle: "ស្វែងយល់ពីរចនាសម្ព័ន្ធ Form និង FormMode តាមរយៈដំណើរការក្នុងមន្ទីរពេទ្យដែលអ្នកស្គាល់ច្បាស់។",
      content: `<div class="card" style="align-items: center; text-align: center;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(2, 132, 199, 0.15); border: 1px solid #0284c7; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: #38bdf8; margin-bottom: 1rem;">
              &#128203;
            </div>
            <span class="card-badge" style="background: rgba(2, 132, 199, 0.2); color: #7dd3fc;">ប្រអប់ផ្ទុក</span>
            <h3 class="card-title">១. ស្រោមឯកសារវេជ្ជសាស្ត្រ</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              គិលានុបដ្ឋាយិកាកាន់ស្រោមឯកសាររបស់អ្នកជំងឺ <strong>Davi Santos</strong>។ ស្រោមនេះមិនផ្ទុកអ្នកជំងឺទាំង ៥០ នាក់ក្នុងបន្ទប់រង់ចាំទេ គឺផ្ទុកតែព័ត៌មានលម្អិតនៃ <strong>អ្នកជំងឺម្នាក់គត់</strong>។
            </p>
            <div style="margin-top: auto; padding-top: 1rem; color: #38bdf8; font-weight: 700; font-size: 0.85rem;">
              = The Edit Form
            </div>
          </div>

          <div class="card" style="align-items: center; text-align: center;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(245, 158, 11, 0.15); border: 1px solid #f59e0b; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: #fbbf24; margin-bottom: 1rem;">
              &#128196;
            </div>
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">ផ្នែកនីមួយៗ</span>
            <h3 class="card-title">២. ផ្នែកដែលបានបោះពុម្ពរួច</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              ផ្នែកទី ១ ៖ <em>សម្ពាធឈាម</em>។ ផ្នែកទី ២ ៖ <em>ប្រវត្តិអាឡែកហ្ស៊ី</em>។ ផ្នែកទី ៣ ៖ <em>វេជ្ជបញ្ជា</em>។ គ្រប់ផ្នែកនីមួយៗមានចំណងជើង ប្រអប់បំពេញ និងសញ្ញាសម្គាល់ដាច់ដោយឡែក។
            </p>
            <div style="margin-top: auto; padding-top: 1rem; color: #fcd34d; font-weight: 700; font-size: 0.85rem;">
              = The DataCards
            </div>
          </div>

          <div class="card" style="align-items: center; text-align: center;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(139, 92, 246, 0.15); border: 1px solid #8b5cf6; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: #c084fc; margin-bottom: 1rem;">
              &#128274;
            </div>
            <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc;">សិទ្ធិ និងស្ថានភាព</span>
            <h3 class="card-title">៣. ស្ថានភាពទាំង ៣ នៃស្រោមឯកសារ</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              <strong>View Mode ៖</strong> អ្នកជំងឺអានប្រវត្តិក្រោមបន្ទះប្លាស្ទិក។ <strong>Edit Mode ៖</strong> គ្រូពេទ្យកែសម្រួលកម្រិតថ្នាំ។ <strong>New Mode ៖</strong> សន្លឹកទទេស្អាតសម្រាប់អ្នកជំងឺទើបមកដល់ថ្មី។
            </p>
            <div style="margin-top: auto; padding-top: 1rem; color: #c084fc; font-weight: 700; font-size: 0.85rem;">
              = FormMode (View / Edit / New)
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការដើរតួ ៖</strong> សួរសិស្សថា ៖ "នៅពេលអ្នកទៅពេទ្យ តើគេឱ្យអ្នកសរសេរលើសន្លឹកកិច្ចការរបស់អ្នកជំងឺដទៃដែរឬទេ?" ទេ! អ្នកកាន់តែឯកសារផ្ទាល់ខ្លួនរបស់អ្នកប៉ុណ្ណោះ។ នោះហើយជាមុខងាររបស់ Form!</p>`
    },

    // Slide 7: Plain-Language Concepts Before Tech Jargon
    {
      title: "គោលគំនិតភាសាសាមញ្ញ ៖ ៤ ពាក្យគន្លឹះនៃ Form",
      segment: "ផ្នែកទី ៣ &bull; ពាក្យបច្ចេកទេសបកស្រាយយ៉ាងសាមញ្ញ",
      subtitle: "ស្វែងយល់ពីតួនាទីរបស់វាក្នុងប្រព័ន្ធ មុនពេលចាប់ផ្តើមកំណត់រូបមន្ត Power Fx។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(2, 132, 199, 0.2); color: #7dd3fc;">ប្រអប់ផ្ទុកឆ្លាតវៃ</span>
            <h4 style="color: #f8fafc; font-size: 1rem;">១. Edit Form</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; margin-top: 0.35rem;">
              <strong>ភាសាសាមញ្ញ ៖</strong> "ស្រោមឯកសារឌីជីថលនៅលើតុ។"<br><br>
              <strong>តួនាទីបច្ចេកទេស ៖</strong> Control ប្រអប់ផ្ទុកដែលទាក់ទងជាមួយ SharePoint ដើម្បីបង្ហាញ និងកែសម្រួលគ្រប់ជួរឈរនៃកំណត់ត្រាតែមួយ។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">ឯកសារជាក់លាក់</span>
            <h4 style="color: #f8fafc; font-size: 1rem;">២. Property Item</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; margin-top: 0.35rem;">
              <strong>ភាសាសាមញ្ញ ៖</strong> "តើយើងកំពុងមើលឯកសាររបស់អ្នកណាឱ្យប្រាកដ?"<br><br>
              <strong>តួនាទីបច្ចេកទេស ៖</strong> Property រូបមន្ត (ឧ. <code>galRequests.Selected</code>) ដែលបញ្ជូនកំណត់ត្រាជាក់លាក់មួយចូលក្នុង Form។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(13, 148, 136, 0.2); color: #5eead4;">ប្រអប់សំណួរនីមួយៗ</span>
            <h4 style="color: #f8fafc; font-size: 1rem;">៣. DataCard</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; margin-top: 0.35rem;">
              <strong>ភាសាសាមញ្ញ ៖</strong> "ប្រអប់បោះពុម្ពស្រេចសម្រាប់មួយសំណួរ។"<br><br>
              <strong>តួនាទីបច្ចេកទេស ៖</strong> កាតរងដែលរួមបញ្ចូលចំណងជើង, ប្រអប់បំពេញ, សញ្ញាផ្កាយ និងសារកំហុសសម្រាប់មួយជួរឈរ។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc;">ស្ថានភាពសិទ្ធិ</span>
            <h4 style="color: #f8fafc; font-size: 1rem;">៤. FormMode</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; margin-top: 0.35rem;">
              <strong>ភាសាសាមញ្ញ ៖</strong> "តើយើងកំពុងអាន កែសម្រួល ឬបង្កើតថ្មី?"<br><br>
              <strong>តួនាទីបច្ចេកទេស ៖</strong> កំណត់អាកប្បកិរិយា ៖ <code>FormMode.View</code> (អានប៉ុណ្ណោះ), <code>FormMode.Edit</code> (កែប្រែចាស់) ឬ <code>FormMode.New</code> (បង្កើតថ្មី)។
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការរំលឹកជាចង្វាក់ ៖</strong> ហាត់ពត់ ៤ ពាក្យនេះ ៖ Form &rarr; Item &rarr; DataCard &rarr; FormMode។ ធ្វើម្តងទៀតពីរដង។</p>`
    },

    // Slide 8: The Architectural Data Pipeline
    {
      title: "ស្ថាបត្យកម្មលំហូរទិន្នន័យនៃ Form ៖ លំហូរ Master-Detail",
      segment: "ផ្នែកទី ៣ &bull; ដ្យាក្រាមស្ថាបត្យកម្មប្រព័ន្ធ",
      subtitle: "របៀបដែលការចុចរបស់អ្នកប្រើក្នុង Gallery ឆ្លងកាត់អង្គចងចាំចូលទៅកាន់ DataCards នៃ Form ភ្លាមៗ។",
      content: `<div class="pipeline-stage">
            <div class="pipeline-node">
              <div class="pipeline-icon icon-table">&#128196;</div>
              <strong style="color: #5eead4; font-size: 0.95rem;">SharePoint List</strong>
              <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">មូលដ្ឋានទិន្នន័យ Cloud</span>
              <p style="font-size: 0.8rem; color: #cbd5e1; margin-top: 0.5rem; line-height: 1.4;">
                ផ្ទុកសំបុត្រជួសជុល ១៥០ ករណីឆ្លងកាត់ជួរឈររៀបចំចំនួន ១២។
              </p>
            </div>

            <div class="pipeline-arrow">&rarr;</div>

            <div class="pipeline-node">
              <div class="pipeline-icon icon-items">&#128260;</div>
              <strong style="color: #67e8f9; font-size: 0.95rem;">Gallery (Master)</strong>
              <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">រមូរមើល ១០០ ជួរ</span>
              <p style="font-size: 0.8rem; color: #cbd5e1; margin-top: 0.5rem; line-height: 1.4;">
                អ្នកប្រើរមូរមើលបញ្ជី ហើយចុចលើជួរទី ៣ ៖ <em>"សម្ពាធ P-04 ធ្លាក់ចុះ"</em>។
              </p>
            </div>

            <div class="pipeline-arrow">&rarr;</div>

            <div class="pipeline-node">
              <div class="pipeline-icon icon-thisitem">&#9757;</div>
              <strong style="color: #fcd34d; font-size: 0.95rem;">galRequests.Selected</strong>
              <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">កំណត់ត្រាតែមួយគត់</span>
              <p style="font-size: 0.8rem; color: #cbd5e1; margin-top: 0.5rem; line-height: 1.4;">
                Power Apps បំបែកយកតែជួរដេកនោះមកទុកក្នុងអង្គចងចាំសកម្ម។
              </p>
            </div>

            <div class="pipeline-arrow">&rarr;</div>

            <div class="pipeline-node">
              <div class="pipeline-icon icon-selected">&#128203;</div>
              <strong style="color: #c084fc; font-size: 0.95rem;">Form.Item (Detail)</strong>
              <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">DataCards ចំនួន ១២</span>
              <p style="font-size: 0.8rem; color: #cbd5e1; margin-top: 0.5rem; line-height: 1.4;">
                Edit Form ទទួលយកកំណត់ត្រានោះ ហើយបំពេញគ្រប់ DataCard ទាំងអស់ភ្លាមៗ!
              </p>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការចង្អុលបង្ហាញ ៖</strong> ប្រើ Laser Pointer ចង្អុលពី Gallery.Selected &rarr; Form.Item។ សង្កត់ធ្ងន់ថា ៖ គ្មានកូដ OnSelect ស្មុគស្មាញទេ! គ្រាន់តែភ្ជាប់តាមរយៈ Property Item ប៉ុណ្ណោះ។</p>`
    },

    // Slide 9: Anatomy of a DataCard
    {
      title: "រចនាសម្ព័ន្ធនៃប្រអប់ទិន្នន័យ DataCard ៖ ៤ ផ្នែកស្តង់ដារ",
      segment: "ផ្នែកទី ៣ &bull; ស្ថាបត្យកម្ម Control ស៊ីជម្រៅ",
      subtitle: "គ្រប់ជួរឈរនៅក្នុង Edit Form ត្រូវបានគ្រប់គ្រងដោយកាតសម្របសម្រួលស្វ័យប្រវត្តិចំនួន ៤ ផ្នែក។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">ស្ថាបត្យកម្មរូបភាព</span>
            <h3 class="card-title">អ្វីដែលនៅខាងក្នុងប្រអប់ DataCard</h3>
            
            <div style="background: #090e17; border: 1px dashed rgba(245, 158, 11, 0.5); border-radius: 0.5rem; padding: 1rem; margin-top: 0.75rem;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
                <div>
                  <span style="color: #f8fafc; font-weight: 700; font-size: 0.9rem;">លេខសម្គាល់ម៉ាស៊ីន</span>
                  <span style="color: #ef4444; font-weight: bold; margin-left: 0.25rem;">* (StarVisible)</span>
                </div>
                <span style="font-family: var(--font-code); font-size: 0.72rem; color: #94a3b8;">DataCardKey1</span>
              </div>

              <div style="background: #1e293b; border: 1px solid var(--border-subtle); border-radius: 0.35rem; padding: 0.6rem 0.85rem; color: #f8fafc; font-family: var(--font-code); font-size: 0.85rem; margin-bottom: 0.4rem; display: flex; justify-content: space-between;">
                <span>Press P-04</span>
                <span style="color: #64748b; font-size: 0.72rem;">DataCardValue1</span>
              </div>

              <div style="font-size: 0.75rem; color: #ef4444; display: flex; justify-content: space-between;">
                <span>&cross; លេខសម្គាល់ម៉ាស៊ីនត្រូវបានទាមទារដោយគោលការណ៍រោងចក្រ។</span>
                <span style="color: #64748b; font-size: 0.72rem;">ErrorMessage1</span>
              </div>
            </div>

            <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.85rem; line-height: 1.5;">
              អ្នកមិនបាច់បង្កើតប្រព័ន្ធនេះដោយដៃឡើយ។ Power Apps បង្កើតការសម្របសម្រួល ៤ ផ្នែកនេះជូនអ្នកដោយស្វ័យប្រវត្តិសម្រាប់គ្រប់ជួរឈរ SharePoint។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">តួនាទីនៃសមាសភាគ</span>
            <h3 class="card-title">ការទទួលខុសត្រូវនៃ ៤ សមាសភាគរង</h3>
            <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem;">
              <div style="background: rgba(255, 255, 255, 0.04); padding: 0.65rem; border-radius: 0.4rem; border-left: 3px solid #38bdf8;">
                <strong style="color: #38bdf8; font-size: 0.88rem;">១. DataCardKey ៖</strong>
                <p style="color: var(--text-muted); font-size: 0.8rem; margin-top: 0.15rem;">ផ្លាកចំណងជើងនៃវាល។ អានឈ្មោះជួរឈរពី SharePoint ដោយស្វ័យប្រវត្តិ។</p>
              </div>

              <div style="background: rgba(255, 255, 255, 0.04); padding: 0.65rem; border-radius: 0.4rem; border-left: 3px solid #10b981;">
                <strong style="color: #86efac; font-size: 0.88rem;">២. DataCardValue ៖</strong>
                <p style="color: var(--text-muted); font-size: 0.8rem; margin-top: 0.15rem;">Control បញ្ចូលទិន្នន័យ (TextBox, Dropdown, DatePicker, Toggle)។</p>
              </div>

              <div style="background: rgba(255, 255, 255, 0.04); padding: 0.65rem; border-radius: 0.4rem; border-left: 3px solid #ef4444;">
                <strong style="color: #fca5a5; font-size: 0.88rem;">៣. StarVisible ៖</strong>
                <p style="color: var(--text-muted); font-size: 0.8rem; margin-top: 0.15rem;">បង្ហាញសញ្ញាផ្កាយក្រហម <code>*</code> ដោយស្វ័យប្រវត្តិនូវរាល់ជួរដែលទាមទារជាចាំបាច់។</p>
              </div>

              <div style="background: rgba(255, 255, 255, 0.04); padding: 0.65rem; border-radius: 0.4rem; border-left: 3px solid #f59e0b;">
                <strong style="color: #fcd34d; font-size: 0.88rem;">៤. ErrorMessage ៖</strong>
                <p style="color: var(--text-muted); font-size: 0.8rem; margin-top: 0.15rem;">ភ្លឺពណ៌ក្រហមដោយស្វ័យប្រវត្តិនូវរាល់ពេលដែលអ្នកប្រើប្រាស់បញ្ចូលទិន្នន័យខុសច្បាប់។</p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការបង្ហាញរចនាសម្ព័ន្ធ ៖</strong> បង្ហាញសិស្សក្នុង Tree View ៖ DataCard គឺជាមេគ្រួសារ ហើយមានកូន ៤ នាក់ (Key, Value, Star, ErrorMessage)។ ពួកគេធ្វើការជាមួយគ្នាជាក្រុម!</p>`
    },

    // Slide 10: Step-by-Step Procedure
    {
      title: "ជំហានលម្អិតក្នុងការបញ្ចូល និងភ្ជាប់ Edit Form",
      segment: "ផ្នែកទី ៤ &bull; ដំណើរការការងារក្នុង Studio",
      subtitle: "ជំហានជាក់លាក់ទាំង ៤ ចាប់ពីអេក្រង់ទទេ រហូតដល់ Form ពិនិត្យទិន្នន័យពេញលេញ។",
      content: `<div class="card">
            <span class="obj-num" style="margin-bottom: 0.75rem;">1</span>
            <h4 style="color: #f8fafc; font-size: 1rem;">បញ្ចូល Edit Form</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; margin-top: 0.35rem;">
              ចុច <strong>+ Insert</strong> &rarr; ស្វែងរក <strong>Edit form</strong> &rarr; អូសដាក់លើផ្ទាំងខាងស្តាំ។
            </p>
            <div style="margin-top: auto; padding-top: 0.75rem; font-family: var(--font-code); font-size: 0.75rem; color: #67e8f9;">
              ឈ្មោះ ៖ frmMaintenance
            </div>
          </div>

          <div class="card">
            <span class="obj-num" style="margin-bottom: 0.75rem;">2</span>
            <h4 style="color: #f8fafc; font-size: 1rem;">ភ្ជាប់ Data Source</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; margin-top: 0.35rem;">
              ក្នុងផ្ទាំង Properties ខាងស្តាំ ជ្រើសយក <code>Apex_Maintenance_Requests</code> ជា <strong>Data source</strong>។
            </p>
            <div style="margin-top: auto; padding-top: 0.75rem; font-family: var(--font-code); font-size: 0.75rem; color: #67e8f9;">
              DataSource = តារាង Cloud
            </div>
          </div>

          <div class="card">
            <span class="obj-num" style="margin-bottom: 0.75rem;">3</span>
            <h4 style="color: #f8fafc; font-size: 1rem;">ជ្រើសរើសជួរឈរ Fields</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; margin-top: 0.35rem;">
              ចុច <strong>Edit fields</strong> &rarr; <strong>+ Add field</strong> &rarr; ធីក Title, MachineID, Priority, Hazard, Status។
            </p>
            <div style="margin-top: auto; padding-top: 0.75rem; font-family: var(--font-code); font-size: 0.75rem; color: #67e8f9;">
              កាតត្រូវបានបង្កើតដោយស្វ័យប្រវត្តិ &check;
            </div>
          </div>

          <div class="card">
            <span class="obj-num" style="margin-bottom: 0.75rem;">4</span>
            <h4 style="color: #f8fafc; font-size: 1rem;">ភ្ជាប់ Property មាស Item</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; margin-top: 0.35rem;">
              ក្នុងរបាររូបមន្ត ជ្រើសរើស <strong>Item</strong> រួចសរសេរ <code>galRequests.Selected</code>។
            </p>
            <div style="margin-top: auto; padding-top: 0.75rem; font-family: var(--font-code); font-size: 0.75rem; color: #67e8f9;">
              frmMaintenance.Item = ជួរដេកសកម្ម
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការព្រមាន ៖</strong> បើអ្នកភ្លេចជំហានទី ៤ Form នឹងបង្ហាញពាក្យថា 'No item to display'។ រំលឹកសិស្សថា ៖ កុំភ័យស្លន់ស្លោ! នោះគ្រាន់តែមកពីអ្នកមិនទាន់បានប្រាប់ Form ថាត្រូវបើកស្រោមឯកសារមួយណា។</p>`
    },

    // Slide 11: The Golden Property Form.Item
    {
      title: "ស្វែងយល់ស៊ីជម្រៅ ៖ Property មាស <code>Form.Item</code>",
      segment: "ផ្នែកទី ៤ &bull; ដែនកំណត់ទិន្នន័យ Power Fx",
      subtitle: "មូលហេតុដែល Item រង់ចាំទទួលតែមួយកំណត់ត្រា ហើយហេតុអ្វីឈ្មោះតារាងបង្កជាកំហុសភ្លាមៗ។",
      content: `<div class="card" style="border-left: 3px solid #ef4444;">
            <span class="card-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">អន្ទាក់កូដសម្រាប់អ្នកចាប់ផ្តើម</span>
            <h3 class="card-title">ការសរសេរ <code>Form.Item = Apex_Maintenance_Requests</code></h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; margin-bottom: 0.75rem;">
              អ្នកចាប់ផ្តើមតែងតែគិតថា ៖ <em>"Form ត្រូវការទិន្នន័យ ដូច្នេះខ្ញុំនឹងវាយឈ្មោះតារាង SharePoint ចូលក្នុង Item។"</em>
            </p>
            <div style="background: #090e17; border: 1px solid var(--border-subtle); border-radius: 0.5rem; padding: 0.75rem; font-family: var(--font-code); font-size: 0.85rem; color: #fca5a5; margin-bottom: 0.75rem;">
              &cross; frmMaintenance.Item = Apex_Maintenance_Requests<br>
              <span style="color: #ef4444; font-size: 0.78rem;">// Error: រំពឹងទុក Record តែបែរជាទទួលបាន Table (១៥០ ជួរ)!</span>
            </div>
            <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.5;">
              <strong>មូលហេតុដែលខុស ៖</strong> Form មិនអាចបង្ហាញ ១៥០ ជួរក្នុងពេលតែមួយបានទេ។ វាមានប្រអប់ Title តែមួយ និង Machine ID តែមួយ។ វាត្រូវការ <strong>កំណត់ត្រាតែមួយគត់</strong>។
            </p>
          </div>

          <div class="card" style="border-left: 3px solid var(--color-warning);">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">ដំណោះស្រាយត្រឹមត្រូវ</span>
            <h3 class="card-title">ការសរសេរ <code>Form.Item = galRequests.Selected</code></h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; margin-bottom: 0.75rem;">
              Property <code>.Selected</code> របស់ Gallery ផ្តល់មកវិញនូវជួរដេកតែមួយគត់ដែលអ្នកប្រើបានចុចលើ។
            </p>
            <div style="background: #090e17; border: 1px solid var(--border-subtle); border-radius: 0.5rem; padding: 0.75rem; font-family: var(--font-code); font-size: 0.85rem; color: #86efac; margin-bottom: 0.75rem;">
              &check; frmMaintenance.Item = galRequests.Selected<br>
              <span style="color: #10b981; font-size: 0.78rem;">// ពេលចុចជួរទី ១ &rarr; Form បង្ហាញជួរទី ១<br>// ពេលចុចជួរទី ២ &rarr; Form បង្ហាញជួរទី ២ ភ្លាមៗ!</span>
            </div>
            <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.5;">
              <strong>គ្មានកូដ Event ស្មុគស្មាញឡើយ ៖</strong> អ្នកមិនបាច់សរសេរកូដ OnSelect លើ Gallery ឡើយ។ Power Fx ធ្វើបច្ចុប្បន្នភាពទិន្នន័យដោយស្វ័យប្រវត្តិតាមរយៈ Reactive Binding!
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>គន្លឹះចងចាំ ៖</strong> "Items របស់ Gallery ត្រូវការ Table (សំបុត្រទាំងអស់)។ ចំណែក Item របស់ Form ត្រូវការ Record តែមួយ (សំបុត្រដែលបានចុច)។ ចងចាំភាពខុសគ្នារវាងពហុវចនៈ (Items) និងឯកវចនៈ (Item)!"</p>`
    },

    // Slide 12: Unlocking DataCards & Choice Binding
    {
      title: "ការដោះសោ DataCards និងការភ្ជាប់ជួរ Choice",
      segment: "ផ្នែកទី ៤ &bull; ការកែសម្រួលកម្រិតខ្ពស់",
      subtitle: "មូលហេតុដែល DataCards មានសោចាក់ របៀប Unlock ដោយសុវត្ថិភាព និងអនុគមន៍ Choices()។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc;">សោសុវត្ថិភាព</span>
            <h3 class="card-title">ហេតុអ្វីបានជា DataCards ត្រូវបានចាក់សោ?</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; margin-bottom: 0.75rem;">
              នៅពេលអ្នកចុចលើ DataCard អ្នកនឹងឃើញរូបតំណាងសោចាក់តូចមួយនៅក្នុងផ្ទាំង Advanced។
            </p>
            <div style="background: rgba(139, 92, 246, 0.08); border-left: 3px solid #8b5cf6; padding: 0.75rem; border-radius: 0.4rem; margin-bottom: 0.75rem;">
              <strong style="color: #c084fc; font-size: 0.85rem;">មូលហេតុដែលវាចាក់សោ ៖</strong>
              <p style="color: #e2e8f0; font-size: 0.82rem; margin-top: 0.2rem;">
                Power Apps ចាក់សោរកាត ដើម្បីកុំឱ្យអ្នកច្រឡំដៃកែប្រែខូចខ្សែចំណងស្វ័យប្រវត្តិតភ្ជាប់រវាង Input និងជួរឈរ SharePoint។
              </p>
            </div>
            <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.5;">
              <strong>របៀបដោះសោដោយសុវត្ថិភាព ៖</strong> ចុចកណ្ដុរស្ដាំលើកាត រួចជ្រើសយក <em>"Unlock to change properties"</em>។ ពេលនេះអ្នកអាចបកប្រែចំណងជើងជាភាសាខ្មែរ (ឧ. <code>"លេខសម្គាល់ម៉ាស៊ីន"</code>) ដោយគ្មានផលប៉ះពាល់ដល់ទិន្នន័យឡើយ។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(13, 148, 136, 0.2); color: #5eead4;">អនុគមន៍ Choices() របស់ SharePoint</span>
            <h3 class="card-title">របៀបដែល Dropdown ទទួលបានជម្រើស</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; margin-bottom: 0.75rem;">
              នៅក្នុង SharePoint ជួរ <code>Priority</code> ជាជួរ Choice ("High", "Medium", "Low")។
            </p>
            <div style="background: #090e17; border: 1px solid var(--border-subtle); border-radius: 0.5rem; padding: 0.75rem; font-family: var(--font-code); font-size: 0.85rem; color: #5eead4; margin-bottom: 0.75rem;">
              DataCardValue.Items = Choices(Apex_Maintenance_Requests.Priority)
            </div>
            <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.5;">
              <strong>ការធ្វើសមកាលកម្មទិន្នន័យផ្ទាល់ ៖</strong> អ្នកមិនបាច់វាយជម្រើសដោយដៃឡើយ។ Power Apps សួរ SharePoint ផ្ទាល់។ បើមេការបន្ថែមជម្រើស "Emergency / P1" ក្នុង SharePoint នោះ Dropdown ក្នុង App របស់អ្នកនឹងបង្ហាញតាមដោយស្វ័យប្រវត្តិ!
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការណែនាំ ៖</strong> កុំលុប DataCard ចោលឱ្យសោះ! ប្រសិនបើអ្នកចង់កែអក្សរ គ្រាន់តែ Unlock រួចកែ <code>DataCardKey.Text</code> គឺជាការស្រេច។</p>`
    },

    // Slide 13: Interactive Simulator 1
    {
      title: "ឧបករណ៍ពិសោធអន្តរកម្ម ៖ ការផ្លាស់ប្តូរស្ថានភាព FormMode",
      segment: "ផ្នែកទី ៤ &bull; ឧបករណ៍ពិសោធអន្តរកម្ម",
      subtitle: "ចុចប្តូររវាង ៣ ស្ថានភាពនៃ Form Mode ខាងក្រោម ហើយសង្កេតមើលប្រតិកម្មនៃ Input នីមួយៗភ្លាមៗ។",
      content: `<div class="studio-chrome">
            <div class="studio-chrome-header">
              <span>Form Controls</span>
              <span>frmMaintenance.DefaultMode</span>
            </div>
            <div class="studio-chrome-body">
              <label style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase;">ជ្រើសរើសស្ថានភាព Form Mode ៖</label>
              <div style="display: flex; gap: 0.5rem; margin: 0.5rem 0 1rem 0;">
                <button class="hud-btn active" id="btn-mode-edit" onclick="setSimMode('Edit')">FormMode.Edit</button>
                <button class="hud-btn" id="btn-mode-view" onclick="setSimMode('View')">FormMode.View</button>
                <button class="hud-btn" id="btn-mode-new" onclick="setSimMode('New')">FormMode.New</button>
              </div>

              <div style="background: rgba(255, 255, 255, 0.04); padding: 0.75rem; border-radius: 0.4rem; font-size: 0.82rem; color: #cbd5e1; margin-bottom: 1rem;">
                <strong style="color: #67e8f9;" id="sim-mode-explanation-title">FormMode.Edit កំពុងដំណើរការ</strong>
                <p style="margin-top: 0.25rem; font-size: 0.78rem; color: var(--text-muted);" id="sim-mode-explanation-body">
                  ទាញយកទិន្នន័យនៃកំណត់ត្រាចាស់មកដាក់ក្នុងប្រអប់ដែលអនុញ្ញាតឱ្យអ្នកប្រើប្រាស់កែសម្រួលបាន។
                </p>
              </div>

              <button class="hud-btn" style="width: 100%; justify-content: center; background: rgba(245, 158, 11, 0.2); border-color: var(--color-warning); color: #fcd34d;" onclick="resetSimMode()">
                កំណត់ទម្រង់ឡើងវិញ
              </button>
            </div>
          </div>

          <div class="card" style="background: rgba(12, 19, 31, 0.95); justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
                <span class="card-badge" id="sim-form-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">frmMaintenance [Mode: Edit]</span>
                <span style="font-family: var(--font-code); font-size: 0.75rem; color: var(--text-dim);" id="sim-item-label">Item: Ticket #104</span>
              </div>

              <div style="display: flex; flex-direction: column; gap: 0.75rem;" id="sim-cards-container">
                <!-- Card 1: Title -->
                <div class="sim-datacard">
                  <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.25rem;">
                    <span style="font-weight: 700; color: #f8fafc;">ចំណងជើងសំបុត្រជួសជុល <span style="color: #ef4444;">*</span></span>
                  </div>
                  <input type="text" class="sim-input" id="sim-field-title" value="ស្ទះរ៉ងធារាសាស្ត្រធ្លាយប្រេង">
                </div>

                <!-- Card 2: Machine ID -->
                <div class="sim-datacard">
                  <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.25rem;">
                    <span style="font-weight: 700; color: #f8fafc;">លេខសម្គាល់ម៉ាស៊ីន <span style="color: #ef4444;">*</span></span>
                  </div>
                  <input type="text" class="sim-input" id="sim-field-machine" value="Press P-04">
                </div>

                <!-- Card 3: Priority -->
                <div class="sim-datacard">
                  <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.25rem;">
                    <span style="font-weight: 700; color: #f8fafc;">កម្រិតអាទិភាព</span>
                  </div>
                  <select class="sim-input" id="sim-field-priority">
                    <option value="High" selected>High (អាទិភាពខ្ពស់)</option>
                    <option value="Medium">Medium (អាទិភាពមធ្យម)</option>
                    <option value="Low">Low (អាទិភាពទាប)</option>
                  </select>
                </div>
              </div>
            </div>

            <div style="margin-top: 1rem; padding: 0.5rem 0.75rem; border-radius: 0.35rem; background: rgba(6, 182, 212, 0.1); border-left: 3px solid #06b6d4; font-size: 0.8rem; color: #67e8f9;">
              &bull; សង្កេតមើល ៖ ពេលប្តូរទៅ <strong>View</strong> ប្រអប់កែប្រែប្រែជាអក្សរធម្មតា ហើយពេលប្តូរទៅ <strong>New</strong> ប្រអប់ទាំងអស់ក្លាយជាទទេស្អាត!
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការបង្ហាញផ្ទាល់ ៖</strong> ចុចប្តូរទៅកាន់ View Mode រួចសាកល្បងចុចវាយអក្សរ ៖ បង្ហាញថាមិនអាចវាយបានឡើយ។ បន្ទាប់មកចុចប្តូរទៅ New Mode ៖ បង្ហាញថាប្រអប់ក្លាយជាទទេស្អាត ត្រៀមបង្កើតសំបុត្រថ្មី។</p>`
    },

    // Slide 14: Trainer Demonstration Script
    {
      title: "ការបង្ហាញផ្ទាល់របស់គ្រូបង្វឹក ៖ ជំហានចុចជាក់ស្តែង",
      segment: "ផ្នែកទី ៥ &bull; ការបង្ហាញផ្ទាល់របស់គ្រូ",
      subtitle: "សង្កេតមើលសកម្មភាពជាក់ស្តែងលើអេក្រង់ សំឡេងពន្យល់ និងចំណុចគ្រោះថ្នាក់ដែលត្រូវចៀសវាង។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">ដំណាក់កាលទី ១ &bull; ០-៤ នាទី</span>
            <h3 class="card-title">១. ទម្លាក់ និងកំណត់ទីតាំង</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
              <strong>សកម្មភាពគ្រូ ៖</strong> អូស Edit Form មកដាក់លើពាក់កណ្តាលអេក្រង់ខាងស្តាំ។ ដាក់ឈ្មោះថា <code>frmMaintenance</code>។<br><br>
              <strong>សម្តីពន្យល់ ៖</strong> <em>"មើលប្រអប់ប្រផេះនេះចុះ។ Power Apps កំពុងសួរយើងថា ៖ 'សូមប្រាប់ខ្ញុំតើតារាងមួយណា (DataSource) និងសំបុត្រមួយណា (Item)!' យើងនឹងផ្តល់ទាំងពីរជូនវា។"</em>
            </p>
          </div>

          <div class="card" style="border-left: 3px solid var(--color-warning);">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.25); color: #fcd34d;">ដំណាក់កាលទី ២ &bull; ៤-៨ នាទី</span>
            <h3 class="card-title">២. បន្ថែមជួរឈរ Fields</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
              <strong>សកម្មភាពគ្រូ ៖</strong> ចុច Edit Fields &rarr; បន្ថែម Title, MachineID, Priority, LoggedDate។<br><br>
              <strong>សម្តីពន្យល់ ៖</strong> <em>"មើលចុះ Priority ទទួលបាន Dropdown ព្រោះ SharePoint កំណត់វាជា Choice។ LoggedDate ទទួលបានប្រតិទិន។ ទាំងអស់នេះកើតឡើងដោយគ្មានកូដសូម្បីមួយជួរ!"</em>
            </p>
          </div>

          <div class="card" style="border-left: 3px solid #10b981;">
            <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ដំណាក់កាលទី ៣ &bull; ៨-១៣ នាទី</span>
            <h3 class="card-title">៣. ភ្ជាប់ Item ទៅកាន់ Gallery</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
              <strong>សកម្មភាពគ្រូ ៖</strong> កំណត់ <code>frmMaintenance.Item = galRequests.Selected</code>។ ចុចឆ្លាស់ជួរក្នុង Gallery។<br><br>
              <strong>សម្តីពន្យល់ ៖</strong> <em>"ឥឡូវមើលទំនាក់ទំនង Master-Detail ចុះ! ខ្ញុំចុចម៉ាស៊ីន M-04 ខាងឆ្វេង &rarr; Form បង្ហាញ M-04 ភ្លាម។ ខ្ញុំចុចខ្សែពាន C-02 &rarr; Form ប្តូរតាមភ្លាមៗ!"</em>
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>កាយវិការ ៖</strong> លើកដៃឡើងបង្ហាញការចុចលើ Gallery ខាងឆ្វេង និងភ្នែកសម្លឹងមើលការផ្លាស់ប្តូរនៃ Form ខាងស្តាំ។ បញ្ជាក់ថា នេះជាមូលដ្ឋានគ្រឹះនៃ Master-Detail Architecture។</p>`
    },

    // Slide 15: Guided Learner Practice
    {
      title: "ការអនុវត្តផ្ទាល់ដៃ ៖ បង្កើតផ្ទាំង Master-Detail Console",
      segment: "ផ្នែកទី ៥ &bull; ការអនុវត្តផ្ទាល់ដៃរបស់សិស្ស",
      subtitle: "បើក Tab Browser ផ្ទាល់ខ្លួនរបស់អ្នក ហើយអនុវត្តតាម ៤ ដំណាក់កាលដែលមានរចនាសម្ព័ន្ធនេះឥឡូវនេះ។",
      content: `<div class="card">
            <h3 class="card-title">ការណែនាំតាមដំណាក់កាល</h3>
            <div class="objective-item">
              <span class="obj-num">A</span>
              <div>
                <strong>បញ្ចូល និងតម្រឹម Edit Form ៖</strong>
                <p>ទាញបញ្ចូល <strong>Edit form</strong> នៅពាក់កណ្តាលខាងស្តាំនៃ Canvas។ ដាក់ឈ្មោះថា <code>frmMaintenance</code>។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">B</span>
              <div>
                <strong>ភ្ជាប់ប្រភពទិន្នន័យ SharePoint ៖</strong>
                <p>កំណត់ <code>DataSource = Apex_Maintenance_Requests</code>។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">C</span>
              <div>
                <strong>បន្ថែម ៤ ជួរឈរស្នូល ៖</strong>
                <p>បន្ថែម <code>Title</code>, <code>MachineID</code>, <code>Priority</code> និង <code>WorkDescription</code>។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">D</span>
              <div>
                <strong>ភ្ជាប់ Property Item ៖</strong>
                <p>កំណត់ <code>frmMaintenance.Item = galRequests.Selected</code>។</p>
              </div>
            </div>
          </div>

          <div class="card" style="border-left: 3px solid var(--color-warning);">
            <h3 class="card-title">បញ្ជីផ្ទៀងផ្ទាត់ជោគជ័យរបស់សិស្ស</h3>
            <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-top: 0.5rem;">
              <label style="display: flex; align-items: center; gap: 0.65rem; font-size: 0.9rem; color: #e2e8f0;">
                <input type="checkbox" style="width: 18px; height: 18px;">
                <span>Form បង្ហាញ DataCards ស្អាតចំនួន ៤ នៅលើផ្ទាំងខាងស្តាំនៃ Canvas</span>
              </label>
              <label style="display: flex; align-items: center; gap: 0.65rem; font-size: 0.9rem; color: #e2e8f0;">
                <input type="checkbox" style="width: 18px; height: 18px;">
                <span><code>frmMaintenance.Item</code> ត្រូវបានកំណត់ស្មើ <code>galRequests.Selected</code></span>
              </label>
              <label style="display: flex; align-items: center; gap: 0.65rem; font-size: 0.9rem; color: #e2e8f0;">
                <input type="checkbox" style="width: 18px; height: 18px;">
                <span>ការចុច <kbd>Alt</kbd> ជាប់ហើយចុចជួរទី ២ ក្នុង Gallery ធ្វើឱ្យ Form ប្តូរទៅជួរទី ២ ភ្លាម</span>
              </label>
              <label style="display: flex; align-items: center; gap: 0.65rem; font-size: 0.9rem; color: #e2e8f0;">
                <input type="checkbox" style="width: 18px; height: 18px;">
                <span>Dropdown នៃ Priority បង្ហាញជម្រើសពិតប្រាកដពី SharePoint</span>
              </label>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការជួយសិស្ស ៖</strong> ដើរត្រួតពិនិត្យ។ ប្រសិនបើសិស្សឃើញ Form នៅទទេ សូមរំលឹកឱ្យគាត់ពិនិត្យមើលថាតើគាត់បានចុចជ្រើសរើសជួរណាមួយក្នុង Gallery ឬនៅ។</p>`
    },

    // Slide 16: Interactive Simulator 2
    {
      title: "ផ្ទាំងត្រួតពិនិត្យផ្ទាល់ ៖ ទំនាក់ទំនង Master-Detail",
      segment: "ផ្នែកទី ៦ &bull; ឧបករណ៍ពិសោធអន្តរកម្ម",
      subtitle: "ចុចលើសំបុត្រជួសជុលណាមួយក្នុង Gallery ខាងឆ្វេង ដើម្បីមើល Form.Item ធ្វើបច្ចុប្បន្នភាពគ្រប់ DataCard ភ្លាមៗ។",
      content: `<div class="sim-gallery-box" style="height: 100%;">
            <div class="sim-gallery-row selected" id="md-row-1" onclick="selectMasterDetail(1, 'ស្ទះរ៉ងធារាសាស្ត្រធ្លាយប្រេង', 'Press P-04', 'High', 'Davi Santos', '31-Oct-2026', 'មានថ្លុកប្រេងធ្លាយយ៉ាងខ្លាំងនៅក្រោមក្បាលពីស្តុងមេ។')">
              <div>
                <strong style="color: #f8fafc; font-size: 0.92rem;">ស្ទះរ៉ងធារាសាស្ត្រធ្លាយប្រេង</strong>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">Press P-04 &bull; 31-Oct-2026</div>
              </div>
              <span class="pill-priority-high">High</span>
            </div>

            <div class="sim-gallery-row" id="md-row-2" onclick="selectMasterDetail(2, 'ដងប៊ូឡឺម៉ូទ័រស្រែកឮខ្លាំង', 'Conveyor C-02', 'Medium', 'Bopha Chen', '31-Oct-2026', 'សំឡេងកកិតខ្លាំងឮឡើងពេលខ្សែពានចាប់ផ្តើមវិលលឿន។')">
              <div>
                <strong style="color: #f8fafc; font-size: 0.92rem;">ដងប៊ូឡឺម៉ូទ័រស្រែកឮខ្លាំង</strong>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">Conveyor C-02 &bull; 31-Oct-2026</div>
              </div>
              <span class="pill-priority-med">Medium</span>
            </div>

            <div class="sim-gallery-row" id="md-row-3" onclick="selectMasterDetail(3, 'សេនស័រកម្តៅដើរខុសប្រក្រតី', 'Extruder E-01', 'Low', 'Alex Vong', '30-Oct-2026', 'កម្តៅលោតឡើងចុះប្រហែល +/- 12C លើអេក្រង់ឌីជីថល។')">
              <div>
                <strong style="color: #f8fafc; font-size: 0.92rem;">សេនស័រកម្តៅដើរខុសប្រក្រតី</strong>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">Extruder E-01 &bull; 30-Oct-2026</div>
              </div>
              <span class="pill-priority-low">Low</span>
            </div>

            <div class="sim-gallery-row" id="md-row-4" onclick="selectMasterDetail(4, 'ធ្លាយខ្យល់ម៉ាស៊ីនសង្កត់', 'Compressor K-03', 'High', 'Sokha Ly', '29-Oct-2026', 'សំឡេងខ្យល់បាញ់ចេញតាមវ៉ានសម្ពាធនៅកម្រិត 85 PSI។')">
              <div>
                <strong style="color: #f8fafc; font-size: 0.92rem;">ធ្លាយខ្យល់ម៉ាស៊ីនសង្កត់</strong>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">Compressor K-03 &bull; 29-Oct-2026</div>
              </div>
              <span class="pill-priority-high">High</span>
            </div>
          </div>

          <div class="card" style="background: rgba(12, 19, 31, 0.95); justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
                <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">frmMaintenanceDetail</span>
                <span style="font-family: var(--font-code); font-size: 0.75rem; color: #67e8f9;">Item = galRequests.Selected</span>
              </div>

              <div style="display: flex; flex-direction: column; gap: 0.65rem;">
                <!-- Card 1 -->
                <div class="sim-datacard">
                  <span style="font-size: 0.75rem; color: var(--text-muted);">Title DataCard</span>
                  <input type="text" class="sim-input" id="md-detail-title" value="ស្ទះរ៉ងធារាសាស្ត្រធ្លាយប្រេង">
                </div>

                <!-- Card 2 -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                  <div class="sim-datacard">
                    <span style="font-size: 0.75rem; color: var(--text-muted);">លេខសម្គាល់ម៉ាស៊ីន</span>
                    <input type="text" class="sim-input" id="md-detail-machine" value="Press P-04">
                  </div>
                  <div class="sim-datacard">
                    <span style="font-size: 0.75rem; color: var(--text-muted);">កម្រិតអាទិភាព</span>
                    <input type="text" class="sim-input" id="md-detail-priority" value="High">
                  </div>
                </div>

                <!-- Card 3 -->
                <div class="sim-datacard">
                  <span style="font-size: 0.75rem; color: var(--text-muted);">ការពណ៌នាការងារ (Work Description)</span>
                  <textarea class="sim-input" id="md-detail-desc" rows="3" style="resize: none;">មានថ្លុកប្រេងធ្លាយយ៉ាងខ្លាំងនៅក្រោមក្បាលពីស្តុងមេ។</textarea>
                </div>
              </div>
            </div>

            <div style="background: rgba(255, 255, 255, 0.04); border-radius: 0.5rem; padding: 0.75rem; font-size: 0.82rem; color: #cbd5e1; margin-top: 0.75rem;">
              <strong>ស្ពានទៅកាន់ថ្ងៃស្អែក (ថ្ងៃទី ២៣) ៖</strong> នៅពេលអ្នកចុចប៊ូតុង <strong>Save</strong> អនុគមន៍ <code>SubmitForm(frmMaintenanceDetail)</code> នឹងសរសេរទិន្នន័យក្នុងប្រអប់ទាំងនេះត្រឡប់ទៅ SharePoint វិញភ្លាមៗ!
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការពិសោធ ៖</strong> ចុចជួរទី ២ រួចជួរទី ៤។ បង្ហាញសិស្សពីរបៀបដែលគ្រប់ប្រអប់ខាងស្តាំផ្លាស់ប្តូរស្របគ្នាដោយរលូន គ្មានការយឺតយ៉ាវឡើយ។</p>`
    },

    // Slide 17: 5 Dangerous Misconceptions
    {
      title: "ការយល់ច្រឡំគ្រោះថ្នាក់ ៥ យ៉ាង និងការពិតជាក់ស្តែងលើ Cloud",
      segment: "ផ្នែកទី ៦ &bull; ការកែតម្រូវកំហុស និងការយល់ច្រឡំ",
      subtitle: "ចៀសវាងកំហុសទាំង ៥ នេះ មុនពេលវាធ្វើឱ្យខូចខ្សែចំណងទិន្នន័យ ឬបាត់បង់កំណត់ត្រាអាជីវកម្ម។",
      content: `<div class="card">
            <div style="display: flex; flex-direction: column; gap: 0.85rem;">
              <div style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; padding: 0.75rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5; font-size: 0.88rem;">ការយល់ច្រឡំទី ១ ៖ "Form បង្កើតទិន្នន័យចម្លងថ្មីមួយទៀតទុកក្នុងទូរស័ព្ទ។"</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.2rem 0 0 0;">
                  <strong>ការពិត ៖</strong> មិនពិតទេ! Form គឺជាបង្អួចឆ្លុះមើលទិន្នន័យពិតប្រាកដក្នុង SharePoint ដោយផ្ទាល់។
                </p>
              </div>

              <div style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; padding: 0.75rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5; font-size: 0.88rem;">ការយល់ច្រឡំទី ២ ៖ "ដើម្បីកែចំណងជើងកាត ខ្ញុំត្រូវលុប DataCard ចោល។"</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.2rem 0 0 0;">
                  <strong>ការពិត ៖</strong> កុំលុបកាតឱ្យសោះ! គ្រាន់តែចុចកណ្តុរស្ដាំជ្រើសយក <em>"Unlock to change properties"</em> រួចកែចំណងជើងជាការស្រេច។
                </p>
              </div>

              <div style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; padding: 0.75rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5; font-size: 0.88rem;">ការយល់ច្រឡំទី ៣ ៖ "ការដាក់ឈ្មោះតារាងក្នុង Form.Item នឹងបង្ហាញសំបុត្រទាំងអស់។"</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.2rem 0 0 0;">
                  <strong>ការពិត ៖</strong> Form ទទួលយកតែមួយ <strong>Record</strong> ប៉ុណ្ណោះ។ បើដាក់ឈ្មោះតារាង វានឹងលោត Error ក្រហមភ្លាម។
                </p>
              </div>
            </div>
          </div>

          <div class="card">
            <div style="display: flex; flex-direction: column; gap: 0.85rem;">
              <div style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; padding: 0.75rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5; font-size: 0.88rem;">ការយល់ច្រឡំទី ៤ ៖ "FormMode.View អនុញ្ញាតឱ្យវាយអក្សរបាន គ្រាន់តែមិន Save។"</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.2rem 0 0 0;">
                  <strong>ការពិត ៖</strong> ក្នុង View Mode គ្រប់ប្រអប់បញ្ចូលទិន្នន័យត្រូវបានចាក់សោជាអត្ថបទអានសុទ្ធ។ អ្នកប្រើមិនអាចបើកក្តារចុចបានឡើយ។
                </p>
              </div>

              <div style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; padding: 0.75rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5; font-size: 0.88rem;">ការយល់ច្រឡំទី ៥ ៖ "ខ្ញុំត្រូវសរសេរកូដ OnSelect លើ Gallery ដើម្បីបញ្ជូនទិន្នន័យ។"</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.2rem 0 0 0;">
                  <strong>ការពិត ៖</strong> មិនបាច់សរសេរកូដមួយតួអក្សរឡើយ! <code>Form.Item = galRequests.Selected</code> ធ្វើការទាញយកទិន្នន័យដោយស្វ័យប្រវត្តិ។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការសង្កត់ធ្ងន់ ៖</strong> Misconception 3 និង 5 គឺជាកន្លែងដែលអ្នកចាប់ផ្តើមតែងតែជាប់គាំង។ សូមរំលឹកពួកគេឱ្យបានច្បាស់។</p>`
    },

    // Slide 18: Knowledge Check 1
    {
      title: "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង ៖ គោលបំណងនៃដែនកំណត់ទិន្នន័យ",
      segment: "ផ្នែកទី ៧ &bull; សំណួរផ្ទៀងផ្ទាត់ ១ នៃ ៥",
      subtitle: "សាកល្បងការយល់ដឹងជាមូលដ្ឋានរបស់អ្នកអំពីរបៀបដែល Gallery និង Form បែងចែកការទទួលខុសត្រូវទិន្នន័យ។",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ១ &bull; ដែនកំណត់ទិន្នន័យ</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                តើអ្វីជាភាពខុសគ្នាជាមូលដ្ឋានក្នុងស្ថាបត្យកម្មទិន្នន័យរវាង Gallery និង Edit Form?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'A', false, this)">
                  <strong>A.</strong> <span>Gallery សម្រាប់ប្រើលើទូរស័ព្ទដៃ ខណៈ Form ប្រើបានតែលើកុំព្យូទ័រធំ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'B', true, this)">
                  <strong>B.</strong> <span>Gallery ទទួលយកតារាង Table (ជួរជាច្រើន) សម្រាប់រមូរមើល ខណៈ Form ទទួលយកកំណត់ត្រា Record តែមួយសម្រាប់ពិនិត្យ និងកែសម្រួល</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'C', false, this)">
                  <strong>C.</strong> <span>Gallery បង្ហាញបានតែលេខ ខណៈ Form បង្ហាញបានតែអត្ថបទ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'D', false, this)">
                  <strong>D.</strong> <span>Form នឹងលុបកំណត់ត្រាចោលបន្ទាប់ពីអានរួច</span>
                </button>
              </div>
            </div>

            <div class="quiz-inspector-card" id="quiz-feedback-1">
              <div class="feedback-placeholder">
                <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.85rem auto; font-size: 1.5rem; color: #fcd34d;">
                  &quest;
                </div>
                <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d; margin-bottom: 0.65rem;">ស្ថានភាព ៖ កំពុងរង់ចាំការជ្រើសរើសចម្លើយ</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-bottom: 0.5rem;">ផ្ទាំងវិភាគស្ថាបត្យកម្មផ្ទាល់</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; max-width: 380px; margin: 0 auto;">
                  សូមជ្រើសរើសចម្លើយខាងឆ្វេង (A, B, C ឬ D) ដើម្បីបញ្ជូនចម្លើយរបស់អ្នក និងបើកមើលការពន្យល់ស្ថាបត្យកម្មប្រព័ន្ធ។
                </p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-1" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-1">ស្ថាបត្យកម្មដែនទិន្នន័យយល់បានច្បាស់!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  ពិតជាត្រឹមត្រូវ! Gallery បម្លែង Table (បណ្តុំជួរ) ទៅជាបញ្ជីរមូរ។ ចំណែក Form បើក Record តែមួយជាក់លាក់ ដើម្បីបង្ហាញ និងកែសម្រួលគ្រប់ជួរឈររបស់វា។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការពិនិត្យចម្លើយ ៖</strong> សង្កត់ធ្ងន់លើជម្រើស B។ នេះជាការបែងចែកទំនួលខុសត្រូវស្នូលនៃ Data Integration ក្នុង Power Apps។</p>`
    },

    // Slide 19: Knowledge Check 2
    {
      title: "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង ៖ ហេតុផលស្ថាបត្យកម្ម 'Why' នៃ DataCards",
      segment: "ផ្នែកទី ៧ &bull; សំណួរផ្ទៀងផ្ទាត់ ២ នៃ ៥",
      subtitle: "មូលហេតុដែល Power Apps ប្រើប្រាស់ DataCard ជាប្រអប់សម្របសម្រួល ជំនួសឱ្យការប្រើប្រាស់ Input រាយប៉ាយ។",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ២ &bull; សំណួរស្វែងយល់ហេតុផល 'Why'</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                ហេតុអ្វីបានជា Power Apps ប្រមូលផ្តុំរាល់វាលទិន្នន័យរបស់ Form ទៅក្នុង "DataCard" ស្វ័យប្រវត្តិ ជំនួសឱ្យការទម្លាក់ Input ដាច់ៗលើអេក្រង់?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'A', false, this)">
                  <strong>A.</strong> <span>ដោយសារ DataCards អនុញ្ញាតឱ្យ Power Apps គិតថ្លៃអាជ្ញាប័ណ្ណបន្ថែម</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'B', false, this)">
                  <strong>B.</strong> <span>ដោយសារ Input ដាច់ៗមិនអាចបង្ហាញអក្សរដិត Bold បាន</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'C', true, this)">
                  <strong>C.</strong> <span>ដោយសារ DataCard រួមបញ្ចូលផ្លាកឈ្មោះ, ប្រអប់បំពេញ, សញ្ញាផ្កាយផ្ទៀងផ្ទាត់ និងសារកំហុសមូលដ្ឋានទិន្នន័យជាឯកភាពមួយ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'D', false, this)">
                  <strong>D.</strong> <span>ដោយសារ DataCards ទប់ស្កាត់មិនឱ្យអ្នកប្រើចុចប៊ូតុងបាន</span>
                </button>
              </div>
            </div>

            <div class="quiz-inspector-card" id="quiz-feedback-2">
              <div class="feedback-placeholder">
                <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.85rem auto; font-size: 1.5rem; color: #fcd34d;">
                  &quest;
                </div>
                <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d; margin-bottom: 0.65rem;">ស្ថានភាព ៖ កំពុងរង់ចាំការជ្រើសរើសចម្លើយ</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-bottom: 0.5rem;">ផ្ទាំងវិភាគស្ថាបត្យកម្មផ្ទាល់</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; max-width: 380px; margin: 0 auto;">
                  សូមជ្រើសរើសចម្លើយខាងឆ្វេង (A, B, C ឬ D) ដើម្បីបញ្ជូនចម្លើយរបស់អ្នក និងបើកមើលការពន្យល់ស្ថាបត្យកម្មប្រព័ន្ធ។
                </p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-2" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-2">ស្ថាបត្យកម្មសមាសភាគយល់បានច្បាស់!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  ពិតជាពូកែណាស់! DataCard គឺជាអ្នកសម្របសម្រួលវាលស្វ័យប្រវត្តិ។ វាគ្រប់គ្រងចំណងជើង, ប្រអប់បញ្ចូល, សញ្ញាផ្កាយ Required (StarVisible) និងកំហុសទិន្នន័យ Cloud ក្នុងកញ្ចប់តែមួយ។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការសង្កត់ធ្ងន់លើស្ថាបត្យកម្ម ៖</strong> ប្រាប់សិស្សថា DataCard គឺជាអង្គភាពស្វ័យភាព។ បើច្បាប់ក្នុង SharePoint ផ្លាស់ប្តូរ DataCard នឹងដោះស្រាយវាដោយស្វ័យប្រវត្តិ។</p>`
    },

    // Slide 20: Knowledge Check 3
    {
      title: "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង ៖ \"តើមានអ្វីកើតឡើងប្រសិនបើ\" ការជ្រើសរើសផ្លាស់ប្តូរ",
      segment: "ផ្នែកទី ៧ &bull; សំណួរផ្ទៀងផ្ទាត់ ៣ នៃ ៥",
      subtitle: "ស្វែងយល់ពីទំនាក់ទំនងប្រតិកម្មរវាងការចុចលើ Gallery និង Property Item របស់ Form។",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ៣ &bull; ទំនាក់ទំនងប្រតិកម្ម</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                នៅពេលកំណត់ <code>frmMaintenance.Item = galRequests.Selected</code> តើមានអ្វីកើតឡើងចំពោះ Form នៅពេលជាងចុចលើជួរថ្មីក្នុង Gallery?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'A', false, this)">
                  <strong>A.</strong> <span>គ្មានអ្វីផ្លាស់ប្តូរទេ រហូតដល់ជាង Restart កម្មវិធីឡើងវិញ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'B', false, this)">
                  <strong>B.</strong> <span>App នឹងគាំងដំណើរការ ព្រោះរូបមន្តមិនអាចស្តាប់ការចុចបានឡើយ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'C', true, this)">
                  <strong>C.</strong> <span>Form នឹងលុបទិន្នន័យចាស់ចេញភ្លាម ហើយបំពេញគ្រប់ DataCard ទាំងអស់ជាមួយជួរថ្មីដែលទើបចុចក្នុងរយៈពេលមិនដល់ ១ មីលីវិនាទី</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'D', false, this)">
                  <strong>D.</strong> <span>Form នឹងបង្កើតទិន្នន័យចម្លងជាន់គ្នាក្នុង SharePoint</span>
                </button>
              </div>
            </div>

            <div class="quiz-inspector-card" id="quiz-feedback-3">
              <div class="feedback-placeholder">
                <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.85rem auto; font-size: 1.5rem; color: #fcd34d;">
                  &quest;
                </div>
                <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d; margin-bottom: 0.65rem;">ស្ថានភាព ៖ កំពុងរង់ចាំការជ្រើសរើសចម្លើយ</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-bottom: 0.5rem;">ផ្ទាំងវិភាគស្ថាបត្យកម្មផ្ទាល់</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; max-width: 380px; margin: 0 auto;">
                  សូមជ្រើសរើសចម្លើយខាងឆ្វេង (A, B, C ឬ D) ដើម្បីបញ្ជូនចម្លើយរបស់អ្នក និងបើកមើលការពន្យល់ស្ថាបត្យកម្មប្រព័ន្ធ។
                </p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-3" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-3">ទំនាក់ទំនងប្រតិកម្មយល់បានច្បាស់!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  ពិតជាត្រឹមត្រូវ! ដោយសារ Power Fx គណនាតម្លៃឡើងវិញជាបន្តបន្ទាប់ (ដូចជា Microsoft Excel) ការផ្លាស់ប្តូរ <code>galRequests.Selected</code> នឹងបង្ខំឱ្យ Form ធ្វើបច្ចុប្បន្នភាព DataCards របស់វាភ្លាមៗ។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការប្រៀបធៀបជាមួយ Excel ៖</strong> ប្រៀបធៀបវាទៅនឹងក្រឡា A1 បូក B1។ ពេលប្តូរលេខក្នុង A1 នោះផលបូកប្តូរភ្លាម។ ទីនេះក៏ដូចគ្នា ៖ ពេលប្តូរ Selected នោះ Form ប្តូរតាមភ្លាម!</p>`
    },

    // Slide 21: Knowledge Check 4
    {
      title: "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង ៖ ការគ្រប់គ្រង Form Modes",
      segment: "ផ្នែកទី ៧ &bull; សំណួរផ្ទៀងផ្ទាត់ ៤ នៃ ៥",
      subtitle: "សាកល្បងសមត្ថភាពរបស់អ្នកក្នុងការទស្សន៍ទាយអាកប្បកិរិយារបស់ Form ក្រោមស្ថានភាពប្រតិបត្តិការផ្សេងៗគ្នា។",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ៤ &bull; ការគ្រប់គ្រង Mode</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                មេការរោងចក្រចង់ឱ្យកម្មករអានព័ត៌មានលម្អិតនៃសំបុត្រជួសជុលបាន ប៉ុន្តែហាមដាច់ខាតមិនឱ្យកែប្រែអក្សរឡើយ។ តើ Form ត្រូវកំណត់ទៅកាន់ Mode មួយណា?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'A', false, this)">
                  <strong>A.</strong> <span>FormMode.New</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'B', true, this)">
                  <strong>B.</strong> <span>FormMode.View</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'C', false, this)">
                  <strong>C.</strong> <span>FormMode.Edit</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'D', false, this)">
                  <strong>D.</strong> <span>DisplayMode.Disabled</span>
                </button>
              </div>
            </div>

            <div class="quiz-inspector-card" id="quiz-feedback-4">
              <div class="feedback-placeholder">
                <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.85rem auto; font-size: 1.5rem; color: #fcd34d;">
                  &quest;
                </div>
                <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d; margin-bottom: 0.65rem;">ស្ថានភាព ៖ កំពុងរង់ចាំការជ្រើសរើសចម្លើយ</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-bottom: 0.5rem;">ផ្ទាំងវិភាគស្ថាបត្យកម្មផ្ទាល់</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; max-width: 380px; margin: 0 auto;">
                  សូមជ្រើសរើសចម្លើយខាងឆ្វេង (A, B, C ឬ D) ដើម្បីបញ្ជូនចម្លើយរបស់អ្នក និងបើកមើលការពន្យល់ស្ថាបត្យកម្មប្រព័ន្ធ។
                </p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-4" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-4">ស្ថាបត្យកម្ម Mode យល់បានច្បាស់!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  ពិតប្រាកដណាស់! <code>FormMode.View</code> បង្ហាញគ្រប់កាតទាំងអស់ជាអត្ថបទអានសុទ្ធ ដោយការពារទិន្នន័យក្នុង SharePoint មិនឱ្យរងការកែប្រែដោយអចេតនាឡើយ។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ពិនិត្យជម្រើស B ៖</strong> បញ្ជាក់ថា View Mode ល្អឥតខ្ចោះសម្រាប់អេក្រង់ពិនិត្យ ឬសម្រាប់បុគ្គលិកដែលគ្មានសិទ្ធិកែប្រែទិន្នន័យ។</p>`
    },

    // Slide 22: Knowledge Check 5
    {
      title: "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង ៖ ការធ្វើសមកាលកម្មទិន្នន័យ Choice",
      segment: "ផ្នែកទី ៧ &bull; សំណួរផ្ទៀងផ្ទាត់ ៥ នៃ ៥",
      subtitle: "របៀបដែល Power Apps សាកសួរទិន្នន័យពី Cloud ដើម្បីធ្វើឱ្យបញ្ជី Dropdown ធ្វើបច្ចុប្បន្នភាពដោយស្វ័យប្រវត្តិ។",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ៥ &bull; សមកាលកម្មទិន្នន័យ Cloud</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                នៅក្នុង DataCard សម្រាប់ជួរឈរ Choice ដូចជា <code>Priority</code> តើ Control Dropdown ទទួលបានជម្រើសមកពីណា?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(5, 'A', false, this)">
                  <strong>A.</strong> <span>អ្នកអភិវឌ្ឍន៍ត្រូវតែវាយបញ្ចូលជម្រើសនីមួយៗដោយដៃក្នុង Collection</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(5, 'B', true, this)">
                  <strong>B.</strong> <span>វាប្រើប្រាស់អនុគមន៍ 'Choices(TableName.ColumnName)' ដើម្បីទាញយកជម្រើសពី SharePoint ដោយស្វ័យប្រវត្តិ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(5, 'C', false, this)">
                  <strong>C.</strong> <span>វាអានពី File Excel លើ OneDrive</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(5, 'D', false, this)">
                  <strong>D.</strong> <span>ជម្រើសត្រូវបានបង្កើតដោយចៃដន្យតាម Bing AI</span>
                </button>
              </div>
            </div>

            <div class="quiz-inspector-card" id="quiz-feedback-5">
              <div class="feedback-placeholder">
                <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.85rem auto; font-size: 1.5rem; color: #fcd34d;">
                  &quest;
                </div>
                <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d; margin-bottom: 0.65rem;">ស្ថានភាព ៖ កំពុងរង់ចាំការជ្រើសរើសចម្លើយ</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-bottom: 0.5rem;">ផ្ទាំងវិភាគស្ថាបត្យកម្មផ្ទាល់</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; max-width: 380px; margin: 0 auto;">
                  សូមជ្រើសរើសចម្លើយខាងឆ្វេង (A, B, C ឬ D) ដើម្បីបញ្ជូនចម្លើយរបស់អ្នក និងបើកមើលការពន្យល់ស្ថាបត្យកម្មប្រព័ន្ធ។
                </p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-5" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-5">ជំនាញទិន្នន័យ Cloud យល់បានច្បាស់!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  ឥតខ្ចោះ! អនុគមន៍ <code>Choices()</code> សាកសួរទិន្នន័យពី SharePoint List ដោយផ្ទាល់។ នៅពេលមានការបន្ថែមជម្រើសក្នុង SharePoint កម្មវិធីរបស់អ្នកនឹងទទួលបានជម្រើសថ្មីនោះដោយស្វ័យប្រវត្តិ!
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការរំលឹក ៖</strong> "ចងចាំថា ៖ យើងមិនដែលវាយ Hardcode ជម្រើសជួរ Choice ឡើយ។ យើងប្រើ <code>Choices()</code> ដើម្បីឱ្យប្រព័ន្ធដំណើរការដោយស្វ័យប្រវត្តិជានិច្ច!"</p>`
    },

    // Slide 23: Final Capstone Challenge
    {
      title: "ការវាយតម្លៃចុងក្រោយ ៖ ផ្ទាំងពិនិត្យ និងកែប្រែសំបុត្រជួសជុលបន្ទាន់",
      segment: "ផ្នែកទី ៧ &bull; ការវាយតម្លៃជាក់ស្តែង",
      subtitle: "បង្កើតចំណុចប្រទាក់ Master-Detail ពេញលេញសម្រាប់មេការវេននៅរោងចក្រ Apex Plastics។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">សេចក្តីសង្ខេបប្រតិបត្តិការរោងចក្រ</span>
            <h3 class="card-title">លក្ខណៈបច្ចេកទេសនៃផ្ទាំងបញ្ជាមេការ</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; margin-bottom: 1rem;">
              បង្កើតប្លង់ស្ថានីយការងារសងខាងនៅលើអេក្រង់តែមួយ ៖
            </p>
            <div style="display: flex; flex-direction: column; gap: 0.65rem;">
              <div style="background: rgba(255, 255, 255, 0.04); padding: 0.75rem; border-radius: 0.4rem; border-left: 3px solid #0284c7;">
                <strong style="color: #67e8f9; font-size: 0.85rem;">ផ្ទាំងខាងឆ្វេង (Vertical Gallery) ៖</strong>
                <p style="color: var(--text-muted); font-size: 0.8rem; margin-top: 0.2rem;">បង្ហាញ <code>Apex_Maintenance_Requests</code> ជាមួយ Title, Machine ID និង Priority។</p>
              </div>
              <div style="background: rgba(255, 255, 255, 0.04); padding: 0.75rem; border-radius: 0.4rem; border-left: 3px solid #f59e0b;">
                <strong style="color: #fcd34d; font-size: 0.85rem;">ផ្ទាំងខាងស្តាំ (Edit Form) ៖</strong>
                <p style="color: var(--text-muted); font-size: 0.8rem; margin-top: 0.2rem;">ភ្ជាប់ទៅកាន់ <code>galRequests.Selected</code> បង្ហាញ Title, Machine ID, Priority និង Description។</p>
              </div>
              <div style="background: rgba(255, 255, 255, 0.04); padding: 0.75rem; border-radius: 0.4rem; border-left: 3px solid #10b981;">
                <strong style="color: #86efac; font-size: 0.85rem;">ប៊ូតុងប្តូរ Mode ៖</strong>
                <p style="color: var(--text-muted); font-size: 0.8rem; margin-top: 0.2rem;">ផ្តល់ប៊ូតុងចុចប្តូររវាង <code>FormMode.View</code> និង <code>FormMode.Edit</code> យ៉ាងរលូន។</p>
              </div>
            </div>
          </div>

          <div class="card" style="border-left: 3px solid var(--color-warning);">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">តារាងពិន្ទុវាយតម្លៃ (១០០ ពិន្ទុ)</span>
            <h3 class="card-title">ប្លង់ដំណោះស្រាយស្ថាបត្យកម្ម</h3>
            <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.4rem;">
                <span style="font-size: 0.85rem; color: #cbd5e1;">A. ភ្ជាប់ Form ទៅកាន់ SharePoint DataSource ត្រឹមត្រូវ</span>
                <span style="font-family: var(--font-code); color: #fcd34d; font-weight: bold;">២៥ ពិន្ទុ</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.4rem;">
                <span style="font-size: 0.85rem; color: #cbd5e1;">B. ភ្ជាប់ Item ទៅកាន់ galRequests.Selected បានត្រឹមត្រូវ</span>
                <span style="font-family: var(--font-code); color: #fcd34d; font-weight: bold;">២៥ ពិន្ទុ</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.4rem;">
                <span style="font-size: 0.85rem; color: #cbd5e1;">C. ប្រើប្រាស់អនុគមន៍ Choices() លើ Dropdown យ៉ាងត្រឹមត្រូវ</span>
                <span style="font-family: var(--font-code); color: #fcd34d; font-weight: bold;">២៥ ពិន្ទុ</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 0.4rem;">
                <span style="font-size: 0.85rem; color: #cbd5e1;">D. ប្តូរ Mode រវាង View និង Edit ដំណើរការយ៉ាងរលូន</span>
                <span style="font-family: var(--font-code); color: #fcd34d; font-weight: bold;">២៥ ពិន្ទុ</span>
              </div>
            </div>
            <div style="margin-top: auto; padding-top: 1rem; color: #86efac; font-weight: 700; font-size: 0.9rem;">
              ពិន្ទុសរុប ៖ ១០០/១០០ &bull; វិញ្ញាបនបត្រស្ថាបត្យករ Form សហគ្រាស
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការអបអរសាទរ ៖</strong> សិស្សបានបង្កើត Master-Detail Screen ដំបូងរបស់ពួកគេដោយជោគជ័យ! នេះជាសមិទ្ធផលដ៏ធំធេងសម្រាប់អ្នកដែលចាប់ផ្តើមពីកម្រិតសូន្យ។</p>`
    },

    // Slide 24: Bridge Forward to Day 23
    {
      title: "ផែនទីតភ្ជាប់ និងស្ពានចម្លងឆ្ពោះទៅកាន់ថ្ងៃទី ២៣",
      segment: "ផ្នែកទី ៨ &bull; គោលដៅបន្ទាប់",
      subtitle: "អ្នកចេះមើល និងកែប្រែទិន្នន័យក្នុងអង្គចងចាំហើយ។ ថ្ងៃស្អែក យើងនឹងសរសេរទិន្នន័យត្រឡប់ទៅ SharePoint វិញ!",
      content: `<div class="card" style="border-left: 3px solid #0d9488;">
            <span class="card-badge" style="background: rgba(13, 148, 136, 0.2); color: #5eead4;">ថ្ងៃទី ២១ បានសម្រេច</span>
            <h3 class="card-title">Gallery ៖ ការរមូរមើល</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
              រមូរមើលទិន្នន័យរាប់រយជួរតាមរយៈ <code>galRequests.Items</code>។ បោះត្រាជួរដដែលៗដោយប្រើគំរូមេតែមួយ។
            </p>
            <div style="margin-top: auto; padding-top: 1rem; color: #5eead4; font-weight: 700; font-size: 0.85rem;">
              &check; UI បង្ហាញជួរដដែលៗ
            </div>
          </div>

          <div class="card" style="border-left: 3px solid var(--color-warning); background: rgba(245, 158, 11, 0.08);">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.25); color: #fcd34d;">ថ្ងៃទី ២២ បានសម្រេច</span>
            <h3 class="card-title">Form ៖ ការភ្ជាប់វាលទិន្នន័យ</h3>
            <p style="color: var(--text-main); font-size: 0.85rem; line-height: 1.6;">
              ភ្ជាប់ <code>Form.Item = galRequests.Selected</code>។ ស្វែងយល់ពី DataCards និងគ្រប់គ្រងស្ថានភាព View, Edit និង New modes។
            </p>
            <div style="margin-top: auto; padding-top: 1rem; color: #fcd34d; font-weight: 700; font-size: 0.85rem;">
              &check; វាលទិន្នន័យកែប្រែបាននៃមួយកំណត់ត្រា
            </div>
          </div>

          <div class="card" style="border-left: 3px solid #8b5cf6;">
            <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc;">ថ្ងៃស្អែក ៖ ថ្ងៃទី ២៣</span>
            <h3 class="card-title">SubmitForm ៖ ការរក្សាទុក</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
              ថ្ងៃស្អែក យើងបន្ថែម <strong>ប៊ូតុង Save</strong>! តាមរយៈ <code>SubmitForm(frmMaintenance)</code> យើងសរសេរគ្រប់ការកែប្រែក្នុងកាតត្រឡប់ទៅ SharePoint វិញជាអចិន្ត្រៃយ៍!
            </p>
            <div style="margin-top: auto; padding-top: 1rem; color: #c084fc; font-weight: 700; font-size: 0.85rem;">
              &rarr; ថ្ងៃទី ២៣ ៖ ការរក្សាទុកទិន្នន័យលើ Cloud
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ពាក្យបិទបញ្ចប់ (២ នាទី) ៖</strong> "ថ្ងៃស្អែកជាថ្ងៃដែលទិន្នន័យពិតប្រាកដត្រូវបានរក្សាទុកចូលក្នុង Cloud Database! រៀបចំខ្លួនឱ្យរួចរាល់សម្រាប់ថ្ងៃទី ២៣ ៖ SubmitForm! ជួបគ្នាថ្ងៃស្អែក!"</p>`
    }
  ];

  // --------------------------------------------------------------------------
  // 2.5 ENGLISH TRAINER NOTES STORE (Decoupled from DOM - Strict Drawer Rendering)
  // --------------------------------------------------------------------------
  const ENGLISH_NOTES = [
    // Slide 1
    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Opening Hook (2 min):</strong> "Welcome to Day 22! Yesterday, you conquered the Gallery, learning how to browse hundreds of rows. But a gallery row only has room for a summary. What happens when a technician needs to inspect all 15 columns of a work order? Today, we unlock the Edit Form!"</p>
<p><strong>The Mental Model Anchor:</strong> Emphasize that 'UI/Screen' (Form) now directly connects to 'Storage' (SharePoint row) through the golden Item property.</p>`,

    // Slide 2
    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Set Clear Expectations:</strong> Walk through the 4 objectives. Emphasize that by minute 65, every student will have built a live two-panel Master-Detail console with their own hands.</p>
<p><strong>Pacing Tip:</strong> Spend only 8 minutes on recall and problem discovery. Save the largest block of energy for the interactive simulator and hands-on guided practice.</p>`,

    // Slide 3
    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Reinforce Continuity:</strong> "Notice the seamless progression: Day 20 built the pipe to SharePoint. Day 21 used the gallery to browse the list. Day 22 uses the form to inspect one row. Tomorrow on Day 23, we save changes back to SharePoint!"</p>`,

    // Slide 4
    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Interactive Cold Calling:</strong> Click the 4 flip cards one by one. Ask: "Who can remind us what galRequests.Selected evaluates to?" Reassure beginners: a record is simply one horizontal row.</p>`,

    // Slide 5
    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Emotional Engagement:</strong> Make the workplace pain palpable. "Imagine dragging 12 separate inputs, writing 12 custom default formulas, and debugging a 40-line Patch statement at 2:00 AM. That is why Microsoft built the Form!"</p>`,

    // Slide 6
    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Trace the Physical Analogy:</strong> "When you visit a clinic, the nurse doesn't hand you everyone's records. You get YOUR clipboard. The clipboard holds your pre-printed sections (DataCards) and has 3 states: View, Edit, or New."</p>`,

    // Slide 7
    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Plain Language Cadence:</strong> Chanty repeat the 4 terms with the class: Form &rarr; Item &rarr; DataCard &rarr; FormMode. Ensure absolute zero fear of jargon.</p>`,

    // Slide 8
    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Trace with Laser Pointer:</strong> Turn on your laser (<kbd>P</kbd>) and trace from SharePoint List &rarr; Gallery &rarr; galRequests.Selected &rarr; Form.Item. Highlight that zero OnSelect code was needed.</p>`,

    // Slide 9
    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Component Anatomy:</strong> Explain that a DataCard is like a family of 4: DataCardKey (the label), DataCardValue (the input box), StarVisible (the red asterisk), and ErrorMessage (the alarm bell).</p>`,

    // Slide 10
    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Common Panic Point:</strong> "If your form says 'No item to display', do not panic! It simply means you haven't written <code>galRequests.Selected</code> into the Item property yet."</p>`,

    // Slide 11
    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>The Golden Rule:</strong> Emphasize: <code>Items</code> (plural) belongs to Gallery (many rows). <code>Item</code> (singular) belongs to Form (one single row). Never mix them up!</p>`,

    // Slide 12
    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Safety Lock Rule:</strong> "Never delete a DataCard just to change a label. Right-click and choose 'Unlock to change properties'. That protects the plumbing while letting you style the card."</p>`,

    // Slide 13
    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Live Interactive Demonstration:</strong> Click between FormMode.Edit, View, and New. Ask the class: "Notice how View mode turns inputs into read-only text, while New mode wipes the sheet completely blank!"</p>`,

    // Slide 14
    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Live Studio Narration:</strong> Walk through dropping the form, adding fields, and setting Item = galRequests.Selected. Keep your tone encouraging and steady.</p>`,

    // Slide 15
    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Active Circulation:</strong> Walk the room or monitor remote screens. Ensure every student holds <kbd>Alt</kbd> when clicking gallery rows to verify live form updating in Studio.</p>`,

    // Slide 16
    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Master-Detail Verification:</strong> Click row 1, then row 3, then row 4. Highlight how every input on the right updates synchronously in under 1 millisecond.</p>`,

    // Slide 17
    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Misconceptions Refutation:</strong> Address Misconception 3 directly: putting a table name into Item will trigger an instant red squiggly error line.</p>`,

    // Slide 18
    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Knowledge Check 1:</strong> Have students vote before clicking. Praise correct reasoning on Table (Gallery) vs Record (Form).</p>`,

    // Slide 19
    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Knowledge Check 2:</strong> Reinforce that DataCards bundle validation, input, and label into a single self-healing unit.</p>`,

    // Slide 20
    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Knowledge Check 3:</strong> Highlight reactive recalculation: Power Fx constantly recalculates dependencies just like Microsoft Excel formulas.</p>`,

    // Slide 21
    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Knowledge Check 4:</strong> Emphasize that FormMode.View is essential for security and preventing accidental keyboard edits by operators.</p>`,

    // Slide 22
    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Knowledge Check 5:</strong> Reassure students that <code>Choices(Table.Column)</code> is the golden standard for SharePoint dropdowns.</p>`,

    // Slide 23
    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Celebrate Growth:</strong> Congratulate students on building an enterprise-grade Master-Detail console from absolute zero!</p>`,

    // Slide 24
    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Forward Bridge (2 min):</strong> "Tomorrow on Day 23, we take everything you edited in this form and permanently write it back into the cloud using <code>SubmitForm()</code>. See you all tomorrow!"</p>`
  ];

  // --------------------------------------------------------------------------
  // 3. CAPTURE ENGLISH ORIGINAL CONTENT FOR SEAMLESS 2-WAY TOGGLING
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
  // 5. BILINGUAL TOGGLE ENGINE (100% Symmetrical 1-to-1 Child Replacement)
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
      // Trainer notes strictly reside in #notes-drawer
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
  // 8. TRAINER NOTES DRAWER (Strictly off-screen until N pressed)
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
      : (ENGLISH_NOTES[currentSlideIndex] || '<p>No specific script notes for this slide.</p>');
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
  // 10. INTERACTIVE WIDGET 1: LIVE FORM MODE SWITCHER (SLIDE 13)
  // --------------------------------------------------------------------------
  window.setSimMode = function (mode) {
    const btnEdit = document.getElementById('btn-mode-edit');
    const btnView = document.getElementById('btn-mode-view');
    const btnNew = document.getElementById('btn-mode-new');
    const formBadge = document.getElementById('sim-form-badge');
    const itemLabel = document.getElementById('sim-item-label');
    const expTitle = document.getElementById('sim-mode-explanation-title');
    const expBody = document.getElementById('sim-mode-explanation-body');

    const titleInput = document.getElementById('sim-field-title');
    const machineInput = document.getElementById('sim-field-machine');
    const prioritySelect = document.getElementById('sim-field-priority');

    [btnEdit, btnView, btnNew].forEach(b => b?.classList.remove('active'));

    if (mode === 'Edit') {
      btnEdit?.classList.add('active');
      if (formBadge) formBadge.textContent = 'frmMaintenance [Mode: Edit]';
      if (itemLabel) itemLabel.textContent = 'Item: Ticket #104';
      if (expTitle) expTitle.textContent = isKhmerActive ? 'FormMode.Edit កំពុងដំណើរការ' : 'FormMode.Edit Active';
      if (expBody) expBody.textContent = isKhmerActive
        ? 'ទាញយកទិន្នន័យនៃកំណត់ត្រាចាស់មកដាក់ក្នុងប្រអប់ដែលអនុញ្ញាតឱ្យអ្នកប្រើប្រាស់កែសម្រួលបាន។'
        : 'Loads existing record fields into editable input boxes. Ready for user modification.';

      if (titleInput) { titleInput.readOnly = false; titleInput.value = 'Hydraulic Valve Leaking Oil'; }
      if (machineInput) { machineInput.readOnly = false; machineInput.value = 'Press P-04'; }
      if (prioritySelect) { prioritySelect.disabled = false; prioritySelect.value = 'High'; }

    } else if (mode === 'View') {
      btnView?.classList.add('active');
      if (formBadge) formBadge.textContent = 'frmMaintenance [Mode: View]';
      if (itemLabel) itemLabel.textContent = 'Item: Ticket #104';
      if (expTitle) expTitle.textContent = isKhmerActive ? 'FormMode.View កំពុងដំណើរការ' : 'FormMode.View Active';
      if (expBody) expBody.textContent = isKhmerActive
        ? 'បង្ហាញទិន្នន័យជាអត្ថបទអានសុទ្ធ។ ប្រអប់ទាំងអស់ត្រូវបានចាក់សោ មិនអាចវាយអក្សរបានឡើយ។'
        : 'Renders fields as read-only text. Inputs are locked; keyboard cannot alter database values.';

      if (titleInput) { titleInput.readOnly = true; titleInput.value = 'Hydraulic Valve Leaking Oil'; }
      if (machineInput) { machineInput.readOnly = true; machineInput.value = 'Press P-04'; }
      if (prioritySelect) { prioritySelect.disabled = true; prioritySelect.value = 'High'; }

    } else if (mode === 'New') {
      btnNew?.classList.add('active');
      if (formBadge) formBadge.textContent = 'frmMaintenance [Mode: New]';
      if (itemLabel) itemLabel.textContent = 'Item: Defaults()';
      if (expTitle) expTitle.textContent = isKhmerActive ? 'FormMode.New កំពុងដំណើរការ' : 'FormMode.New Active';
      if (expBody) expBody.textContent = isKhmerActive
        ? 'លុបទិន្នន័យទាំងអស់ឱ្យនៅទទេស្អាត។ ត្រៀមទទួលការបញ្ចូលសំបុត្រជួសជុលថ្មីស្រឡាង។'
        : 'Wipes all inputs completely blank. Ready for creating a brand-new work order record.';

      if (titleInput) { titleInput.readOnly = false; titleInput.value = ''; titleInput.placeholder = isKhmerActive ? 'បញ្ចូលចំណងជើងថ្មី...' : 'Enter new title...'; }
      if (machineInput) { machineInput.readOnly = false; machineInput.value = ''; machineInput.placeholder = isKhmerActive ? 'បញ្ចូលលេខម៉ាស៊ីន...' : 'Enter Machine ID...'; }
      if (prioritySelect) { prioritySelect.disabled = false; prioritySelect.value = 'Medium'; }
    }
  };

  window.resetSimMode = function () {
    window.setSimMode('Edit');
  };

  // --------------------------------------------------------------------------
  // 11. INTERACTIVE WIDGET 2: MASTER-DETAIL SELECTOR (SLIDE 16)
  // --------------------------------------------------------------------------
  window.selectMasterDetail = function (rowNum, title, machine, priority, tech, date, desc) {
    const rows = document.querySelectorAll('#slide-16 .sim-gallery-row');
    rows.forEach(r => r.classList.remove('selected'));

    const activeRow = document.getElementById(`md-row-${rowNum}`);
    if (activeRow) activeRow.classList.add('selected');

    const detailTitle = document.getElementById('md-detail-title');
    const detailMachine = document.getElementById('md-detail-machine');
    const detailPriority = document.getElementById('md-detail-priority');
    const detailDesc = document.getElementById('md-detail-desc');

    if (detailTitle) detailTitle.value = title;
    if (detailMachine) detailMachine.value = machine;
    if (detailPriority) detailPriority.value = priority;
    if (detailDesc) detailDesc.value = desc;
  };

  // --------------------------------------------------------------------------
  // 12. KNOWLEDGE CHECK QUIZ ENGINE (SLIDES 18 TO 22) - DUAL-STATE INSPECTOR
  // --------------------------------------------------------------------------
  window.handleQuizAnswer = function (qNum, choice, isCorrect, btn) {
    const slide = slides[currentSlideIndex];
    if (!slide) return;

    // Highlight clicked option and lock siblings
    const options = slide.querySelectorAll('.quiz-option-btn');
    options.forEach(b => {
      b.classList.remove('correct', 'wrong');
      b.style.pointerEvents = 'none'; // Lock after choice
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
        status.textContent = isKhmerActive ? 'ស្ថាបត្យកម្ម Form យល់ដឹងបានច្បាស់!' : 'Architecture Mastered!';
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
        toggleFullscreen();
        break;

      case 'Escape':
        if (isNotesOpen) toggleNotes();
        if (isOverviewOpen) toggleOverview();
        break;
    }
  }

  // --------------------------------------------------------------------------
  // 13.5 FULLSCREEN CONTROLLER
  // --------------------------------------------------------------------------
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
    }
  }

  // --------------------------------------------------------------------------
  // 14. GLOBAL WINDOW EXPORTS (Ensures Instant Inline onclick Functionality)
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
  // 15. BOOTSTRAP INITIALIZATION
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

    console.log('Day 22 Presentation loaded successfully (Lesson 14 Exact DOM Architecture)!');
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
