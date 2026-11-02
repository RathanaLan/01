/**
 * POWER APPS FOUNDATION: DAY 19 PRESENTATION CONTROLLER
 * Topic: SharePoint List: Persistent Business Data
 * Phase: Phase 7: SharePoint Data Integration
 * Architecture: Exact Lesson 14 Engine & Zero Layout Shift System
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. GLOBAL STATE & SELECTORS
  // --------------------------------------------------------------------------
  const slides = Array.from(document.querySelectorAll('.slide'));
  const totalSlides = slides.length;
  let currentSlideIndex = 0;
  let isKhmerActive = false;
  let isNotesOpen = false;
  let isOverviewOpen = false;
  let isLaserActive = false;

  // 90-Minute Timer State
  let remainingSeconds = 90 * 60; // 5400 seconds
  let timerInterval = null;
  let isTimerRunning = false;

  // --------------------------------------------------------------------------
  // 2. KHMER DATA STORE (24 SLIDES - 100% SYMMETRICAL DOM - NO WRAPPER DIVS)
  // --------------------------------------------------------------------------
  const KHMER_SLIDES = [
    // Slide 1: Hero
    {
      title: "SharePoint List ៖ ការរក្សាទុកទិន្នន័យអាជីវកម្មអចិន្ត្រៃយ៍",
      segment: "ដំណាក់កាលទី ៧ &bull; ការតភ្ជាប់ទិន្នន័យ SharePoint",
      subtitle: "ផ្លាស់ប្តូរពីតម្លៃបណ្តោះអាសន្នក្នុងអង្គចងចាំ (RAM) មកជាកំណត់ត្រាអាជីវកម្មអចិន្ត្រៃយ៍ដែលចែករំលែកគ្នាប្រើប្រាស់។ ស្វែងយល់ពីរបៀបដែល SharePoint List ការពារទិន្នន័យរោងចក្រមិនឱ្យបាត់បង់ពេលបិទម៉ាស៊ីន។",
      content: `<div class="hero-content">
          <div class="hero-badge">
            <span>មូលដ្ឋានគ្រឹះវិជ្ជាជីវៈ Microsoft Power Apps</span>
            <span>&bull;</span>
            <span>ថ្ងៃទី ១៩ នៃ ២៧</span>
          </div>
          <h1 class="hero-title">SharePoint List ៖ ការរក្សាទុកទិន្នន័យអាជីវកម្មអចិន្ត្រៃយ៍</h1>
          <p class="hero-subtitle">
            ផ្លាស់ប្តូរពីតម្លៃបណ្តោះអាសន្នក្នុងអង្គចងចាំ (RAM) មកជាកំណត់ត្រាអាជីវកម្មអចិន្ត្រៃយ៍ដែលចែករំលែកគ្នាប្រើប្រាស់។ ស្វែងយល់ពីរបៀបដែល SharePoint List ការពារទិន្នន័យរោងចក្រមិនឱ្យបាត់បង់ពេលបិទម៉ាស៊ីន។
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
            <span class="chain-item">តក្កវិជ្ជា/ការសម្រេចចិត្ត</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">សកម្មភាព</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item active">ការផ្ទុកទិន្នន័យ (Storage)</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ការឆ្លើយតប</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ការធ្វើតេស្ត</span>
          </div>
        </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>ពាក្យបើកឆាក (២ នាទី) ៖</strong> "សូមស្វាគមន៍មកកាន់ថ្ងៃទី ១៩! កាលពីម្សិលមិញនៅលើថ្ងៃទី ១៨ យើងបានផ្តល់អង្គចងចាំដល់ App តាមរយៈ Variables។ ប៉ុន្តែអថេរទាំងនោះរស់នៅតែក្នុង RAM នៃ Tablet ប៉ុណ្ណោះ។ បើអស់ថ្ម រលត់ម៉ាស៊ីន នោះទិន្នន័យនឹងរលាយបាត់ទាំងអស់!"</p>
<p><strong>ការផ្លាស់ប្តូរស្នូលថ្ងៃនេះ ៖</strong> ថ្ងៃនេះយើងបោះជំហានដ៏ធំមួយចូលទៅក្នុងដំណាក់កាលទី ៧ គឺការបង្កើតបន្ទប់សុវត្ថិភាពទិន្នន័យលើ Cloud ជាមួយ SharePoint List។</p>`
    },

    // Slide 2: Agenda & Objectives
    {
      title: "របៀបវារៈ ៩០ នាទី និងគោលដៅដែលអាចវាស់វែងបាន",
      segment: "ផ្នែកទី ១ &bull; គោលដៅ និងរចនាសម្ព័ន្ធ",
      subtitle: "គន្លងរៀនសូត្រតាមរង្វង់មូល (Spiral Learning) ៖ ការភ្ជាប់តក្កវិជ្ជាទៅកាន់ឃ្លាំងទិន្នន័យអចិន្ត្រៃយ៍។",
      content: `<div class="card">
            <h3 class="card-title">៤ គោលដៅដែលអាចវាស់វែងបាន</h3>
            <div class="objective-item">
              <span class="obj-num">១</span>
              <div>
                <strong>បែងចែកភាពខុសគ្នារវាង RAM និង Cloud Storage ៖</strong>
                <p>ពន្យល់បានច្បាស់លាស់ពីមូលហេតុដែលអថេរក្នុង App បាត់បង់តម្លៃពេលបិទអេក្រង់ ខណៈ SharePoint List រក្សាទុកទិន្នន័យជាអចិន្ត្រៃយ៍។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">២</span>
              <div>
                <strong>រៀបចំរចនាសម្ព័ន្ធ List ក្នុង SharePoint Online ៖</strong>
                <p>បង្កើតបញ្ជីទិន្នន័យថ្មី និងកំណត់ប្រភេទ Columns (Text, Choice, Date) ឱ្យត្រូវតាមតម្រូវការអាជីវកម្មដោយគ្មានកំហុស។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">៣</span>
              <div>
                <strong>គ្រប់គ្រង Column ពិសិដ្ឋ "Title" ៖</strong>
                <p>យល់ច្បាស់ពីតួនាទីស្នូលរបស់ Title Column ក្នុង SharePoint និងអនុវត្តវិធី Rename វាជា Ticket ID ដោយមិនព្យាយាមលុបវាចោល។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">៤</span>
              <div>
                <strong>ផ្គូផ្គង Form Fields ទៅនឹង Columns ៖</strong>
                <p>បង្កើតតារាងផែនទីច្បាស់លាស់រវាង Input Controls ក្នុង Power Apps និង SharePoint Columns ដើម្បីត្រៀមសម្រាប់ Patch() នៅថ្ងៃស្អែក។</p>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">កាលវិភាគ ៩០ នាទី (កំណត់ពេលច្បាស់លាស់)</h3>
            <div class="agenda-row">
              <span class="agenda-time">០០:០០ - ១០:០០</span>
              <div>
                <strong>រំលឹកចំណេះដឹង &bull; វិបត្តិអង្គចងចាំ RAM</strong>
                <p style="color: var(--text-muted); font-size: 0.8rem; margin: 0;">ហេតុអ្វីបានជាអថេរថ្ងៃទី ១៨ មិនអាចការពារទិន្នន័យពេលបិទ Tablet។</p>
              </div>
            </div>
            <div class="agenda-row">
              <span class="agenda-time">១០:០០ - ២៥:០០</span>
              <div>
                <strong>ការរកឃើញគំនិត &bull; សំណុំទិន្នន័យ SharePoint</strong>
                <p style="color: var(--text-muted); font-size: 0.8rem; margin: 0;">ទូឯកសារកណ្តាល ៖ Lists, Columns, Rows/Items និងប្រភេទ Data Types។</p>
              </div>
            </div>
            <div class="agenda-row">
              <span class="agenda-time">២៥:០០ - ៤៥:០០</span>
              <div>
                <strong>ការបង្ហាញផ្ទាល់ &bull; បង្កើត List ក្នុង SharePoint</strong>
                <p style="color: var(--text-muted); font-size: 0.8rem; margin: 0;">គ្រូបង្ហាញការបង្កើត List ឈ្មោះ Apex_Maintenance_Requests ផ្ទាល់លើ Cloud។</p>
              </div>
            </div>
            <div class="agenda-row">
              <span class="agenda-time">៤៥:០០ - ៦៥:០០</span>
              <div>
                <strong>អនុវត្តរួមគ្នា &bull; សិស្សបង្កើត List ដោយផ្ទាល់ដៃ</strong>
                <p style="color: var(--text-muted); font-size: 0.8rem; margin: 0;">សិស្សម្នាក់ៗបង្កើត List ផ្ទាល់ខ្លួន និងបន្ថែម ៦ Columns សំខាន់ៗ។</p>
              </div>
            </div>
            <div class="agenda-row">
              <span class="agenda-time">៦៥:០០ - ៨០:០០</span>
              <div>
                <strong>ពិសោធន៍ជាក់ស្តែង &bull; តេស្តបិទបើក Tablet</strong>
                <p style="color: var(--text-muted); font-size: 0.8rem; margin: 0;">ពិសោធន៍ផ្ទុកទិន្នន័យ និងតេស្ត Simulate Restart ដើម្បីផ្ទៀងផ្ទាត់ភាពគង់វង្ស។</p>
              </div>
            </div>
            <div class="agenda-row">
              <span class="agenda-time">៨០:០០ - ៩០:០០</span>
              <div>
                <strong>សំណួរផ្ទៀងផ្ទាត់ &bull; ស្ពានចម្លងទៅកាន់ថ្ងៃទី ២០</strong>
                <p style="color: var(--text-muted); font-size: 0.8rem; margin: 0;">សំណួរ ៥ សំណួរ និងការរៀបចំភ្ជាប់ App ទៅកាន់ SharePoint។</p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>ការគ្រប់គ្រងពេលវេលា ៖</strong> រក្សាកាលវិភាគឱ្យបានច្បាស់លាស់។ កុំចំណាយពេលលើសពី ១០ នាទីលើការរំលឹកមេរៀនចាស់ ដើម្បីទុកពេលឱ្យសិស្សបានអនុវត្តបង្កើត List ដោយផ្ទាល់ដៃ។</p>`
    },

    // Slide 3: Concept Map Recap
    {
      title: "ផែនទីគំនិត ៖ គន្លងតភ្ជាប់ពីថ្ងៃទី ១ ដល់ថ្ងៃទី ១៩",
      segment: "ផ្នែកទី ១ &bull; ផែនទីគំនិតបន្តបន្ទាប់",
      subtitle: "របៀបដែលមេរៀននីមួយៗកសាងមូលដ្ឋានគ្រឹះរឹងមាំសម្រាប់ជំហានបន្ទាប់។",
      content: `<div class="card" style="border-left: 4px solid #3b82f6;">
            <div class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">ថ្ងៃទី ៤-៦ &bull; ថ្ងៃទី ១៦-១៧</div>
            <h3 class="card-title">ដំណាក់កាលតក្កវិជ្ជា និងរូបមន្ត</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
              យើងបានរៀនថាទិន្នន័យអាចប្រៀបធៀបបាន លក្ខខណ្ឌសួរសំណួរ ហើយលទ្ធផល <code>True/False</code> បញ្ជាម៉ាស៊ីន <code>If()</code> ឱ្យជ្រើសរើសផ្លូវសកម្មភាពត្រឹមត្រូវ។
            </p>
            <div style="background: rgba(15, 23, 42, 0.6); padding: 0.65rem; border-radius: 0.5rem; margin-top: 0.5rem; font-family: var(--font-code); font-size: 0.8rem; color: #93c5fd;">
              If(IsBlank(txtDept.Text), Notify("បំពេញផ្នែក!", Error), ...)
            </div>
          </div>

          <div class="card" style="border-left: 4px solid #f59e0b;">
            <div class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fde68a;">ថ្ងៃទី ១៨ (ម្សិលមិញ)</div>
            <h3 class="card-title">អថេរ ៖ អង្គចងចាំបណ្តោះអាសន្ន</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
              យើងបានប្រើប្រាស់ <code>Set(gblUser, User().FullName)</code> ដើម្បីឱ្យ App ចងចាំតម្លៃ។ ប៉ុន្តែអង្គចងចាំនេះរស់នៅតែក្នុង RAM នៃឧបករណ៍តែប៉ុណ្ណោះ។
            </p>
            <div style="background: rgba(15, 23, 42, 0.6); padding: 0.65rem; border-radius: 0.5rem; margin-top: 0.5rem; font-family: var(--font-code); font-size: 0.8rem; color: #fde68a;">
              RAM = បាត់បង់ទិន្នន័យភ្លាមពេលបិទ App!
            </div>
          </div>

          <div class="card" style="border-left: 4px solid #14b8a6; box-shadow: 0 0 20px rgba(20, 184, 166, 0.25);">
            <div class="card-badge" style="background: rgba(20, 184, 166, 0.25); color: #5eead4;">ថ្ងៃទី ១៩ (ថ្ងៃនេះ)</div>
            <h3 class="card-title">SharePoint ៖ ឃ្លាំងទិន្នន័យអចិន្ត្រៃយ៍</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
              យើងផ្លាស់ទីពីអង្គចងចាំទោលមកជា <strong>ឃ្លាំងទិន្នន័យរួមលើ Cloud</strong>។ ទោះបីជា Tablet ខូច ឬអ្នកប្រើបិទម៉ាស៊ីន ក៏ទិន្នន័យនៅតែគង់វង្ស និងចែករំលែកគ្នាបាន។
            </p>
            <div style="background: rgba(15, 23, 42, 0.6); padding: 0.65rem; border-radius: 0.5rem; margin-top: 0.5rem; font-family: var(--font-code); font-size: 0.8rem; color: #5eead4;">
              Cloud Storage = គង់វង្សជាអចិន្ត្រៃយ៍ &amp; Multi-User!
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>ចង្អុលបង្ហាញការវិវត្ត ៖</strong> បង្ហាញសិស្សពីរបៀបដែលចំណេះដឹងត្រូវបានតភ្ជាប់គ្នា។ យើងមិនរៀនបច្ចេកវិទ្យាដាច់ដោយឡែកទេ គឺរៀនដោះស្រាយបញ្ហាជាប្រព័ន្ធ។</p>`
    },

    // Slide 4: Retrieval Questions
    {
      title: "សំណួររំលឹកចំណេះដឹងគន្លឹះមុនចាប់ផ្តើម",
      segment: "ផ្នែកទី ១ &bull; រំលឹកចំណេះដឹង",
      subtitle: "ចុចលើកាតនីមួយៗដើម្បីផ្ទៀងផ្ទាត់ការចងចាំរបស់អ្នកពីថ្ងៃទី ១៦ ដល់ថ្ងៃទី ១៨។",
      content: `<div class="flip-card" onclick="toggleFlipCard(this)">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ១ &bull; ថ្ងៃទី ១៦</span>
                <h4 style="margin: 0.75rem 0; color: #f8fafc; font-size: 1.05rem;">តើ Property ជាអ្វី ហើយ Formula ធ្វើអ្វីចំពោះវា?</h4>
                <p style="color: var(--text-muted); font-size: 0.82rem;">(ចុចលើកាតដើម្បីមើលចម្លើយ)</p>
              </div>
              <div class="flip-card-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ចម្លើយ</span>
                <p style="color: #f8fafc; font-size: 0.85rem; line-height: 1.6; margin-top: 0.5rem;">
                  <strong>Property</strong> គឺជាលក្ខណៈកំណត់រូបរាង ឬអាកប្បកិរិយារបស់ Control (ដូចជា Text, Color, Visible)។ <strong>Formula</strong> គឺជាអ្នកគណនាតម្លៃដែល Property នោះត្រូវមាន!
                </p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="toggleFlipCard(this)">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ២ &bull; ថ្ងៃទី ១៧</span>
                <h4 style="margin: 0.75rem 0; color: #f8fafc; font-size: 1.05rem;">តើ IsBlank(txtDesc.Text) ផ្តល់តម្លៃអ្វីបើប្រអប់នោះនៅទទេ?</h4>
                <p style="color: var(--text-muted); font-size: 0.82rem;">(ចុចលើកាតដើម្បីមើលចម្លើយ)</p>
              </div>
              <div class="flip-card-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ចម្លើយ</span>
                <p style="color: #f8fafc; font-size: 0.85rem; line-height: 1.6; margin-top: 0.5rem;">
                  វាផ្តល់តម្លៃ <strong>true</strong>! តម្លៃ True នេះបញ្ជាក់ថាលក្ខខណ្ឌត្រូវបានផ្ទៀងផ្ទាត់ជាប់ ដែលអនុញ្ញាតឱ្យអនុគមន៍ <code>If()</code> បាញ់សារព្រមាន Notify() ពណ៌ក្រហមបានត្រឹមត្រូវ។
                </p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="toggleFlipCard(this)">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fde68a;">សំណួរទី ៣ &bull; ថ្ងៃទី ១៨</span>
                <h4 style="margin: 0.75rem 0; color: #f8fafc; font-size: 1.05rem;">តើមានអ្វីកើតឡើងចំពោះ Global Variable ពេលបិទ App?</h4>
                <p style="color: var(--text-muted); font-size: 0.82rem;">(ចុចលើកាតដើម្បីមើលចម្លើយ)</p>
              </div>
              <div class="flip-card-back">
                <span class="card-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">ចម្លើយ</span>
                <p style="color: #f8fafc; font-size: 0.85rem; line-height: 1.6; margin-top: 0.5rem;">
                  <strong>តម្លៃរលាយបាត់ទាំងអស់!</strong> អថេររស់នៅតែក្នុងអង្គចងចាំបណ្តោះអាសន្ន (RAM) នៃឧបករណ៍ប៉ុណ្ណោះ។ នៅពេលបិទ App ឬដាច់ភ្លើង អង្គចងចាំ RAM នឹងត្រូវសម្អាតចោលស្អាតគ្មានសល់។
                </p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="toggleFlipCard(this)">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <span class="card-badge" style="background: rgba(20, 184, 166, 0.2); color: #5eead4;">សំណួរទី ៤ &bull; ស្ពានថ្ងៃនេះ</span>
                <h4 style="margin: 0.75rem 0; color: #f8fafc; font-size: 1.05rem;">ហេតុអ្វីបានជាអាជីវកម្មមិនអាចពឹងផ្អែកតែលើ Variables?</h4>
                <p style="color: var(--text-muted); font-size: 0.82rem;">(ចុចលើកាតដើម្បីមើលចម្លើយ)</p>
              </div>
              <div class="flip-card-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ចម្លើយ</span>
                <p style="color: #f8fafc; font-size: 0.85rem; line-height: 1.6; margin-top: 0.5rem;">
                  ព្រោះអាជីវកម្មត្រូវការ <strong>ភាពគង់វង្ស និងការចែករំលែក</strong>! របាយការណ៍ខូចម៉ាស៊ីនត្រូវតែរក្សាទុកឱ្យអ្នកគ្រប់គ្រង និងក្រុមជាងមើលឃើញ ទោះបីជាអ្នករាយការណ៍បានបិទទូរស័ព្ទទៅហើយក្តី។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>ការឆ្លើយតបសកម្ម ៖</strong> សួរសិស្សម្នាក់ៗម្តងមួយសំណួរ មុននឹងចុចត្រឡប់កាតបង្ហាញចម្លើយ។ បើមានសិស្សភ្លេចចំណុច RAM សូមរំលឹកពីភាពខុសគ្នារវាងក្តារខៀន និងសៀវភៅបញ្ជីកត់ត្រា។</p>`
    },

    // Slide 5: The "Why This Exists" Problem
    {
      title: "បញ្ហាជាក់ស្តែង ៖ វិបត្តិអស់ថ្ម Tablet របស់រោងចក្រ Apex Plastics",
      segment: "ផ្នែកទី ២ &bull; ហេតុអ្វីបានជាមុខងារនេះកើតឡើង?",
      subtitle: "រឿងរ៉ាវពិតដែលបង្ហាញពីមូលហេតុដែលអាជីវកម្មមិនអាចរស់បានដោយគ្មានឃ្លាំងទិន្នន័យអចិន្ត្រៃយ៍។",
      content: `<div class="card" style="border-left: 4px solid var(--color-danger);">
            <div class="card-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">គ្រោះមហន្តរាយទិន្នន័យរោងចក្រ</div>
            <h3 class="card-title" style="color: #fca5a5; margin-top: 0.5rem;">ឧបទ្ទវហេតុម៉ោង ០២:១៥ រសៀល នៅខ្សែសង្វាក់ផលិតកម្មទី ៣</h3>
            <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.7;">
              ម៉ោង ០២:១៥ រសៀល ម៉ាស៊ីនចាក់ពុម្ពប្លាស្ទិកធំនៅខ្សែសង្វាក់ទី ៣ ឡើងកម្ដៅខ្លាំងហុយផ្សែង។ កម្មករឈ្មោះ សុខា បានយក Tablet មកបំពេញទម្រង់រាយការណ៍យ៉ាងលម្អិត។
            </p>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.7; margin-top: 0.5rem;">
              កម្មវិធីរបស់សុខាត្រូវបានបង្កើតឡើងដោយប្រើប្រាស់តែ <strong>Variables (Set)</strong> ប៉ុណ្ណោះ។ ពេលសុខាកំពុងរត់ទៅហៅប្រធានផ្នែក ស្រាប់តែ Tablet របស់គាត់ <strong>អស់ថ្មរលត់ងងឹតឈឹង</strong>!
            </p>
            <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.35); border-radius: 0.5rem; padding: 0.75rem; margin-top: 0.75rem;">
              <strong style="color: #fca5a5; font-size: 0.88rem;">ផលវិបាកធ្ងន់ធ្ងរ ៖</strong>
              <p style="color: #cbd5e1; font-size: 0.82rem; margin: 0.2rem 0 0 0;">
                ទិន្នន័យក្នុង RAM ត្រូវរលុបបាត់អស់! ក្រុមជាងមិនបានទទួលសំបុត្ររាយការណ៍ឡើយ ដែលបណ្តាលឱ្យម៉ាស៊ីនខូចធ្ងន់ធ្ងរ ត្រូវផ្អាកផលិតកម្មអស់ ៤ ម៉ោង និងខាតបង់ទឹកប្រាក់ជាង ១២,០០០ ដុល្លារ!
              </p>
            </div>
          </div>

          <div class="card" style="border-left: 4px solid var(--color-success);">
            <div class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ដំណោះស្រាយស្ថាបត្យកម្មអាជីព</div>
            <h3 class="card-title" style="color: #86efac; margin-top: 0.5rem;">SharePoint List ៖ ខែលការពារទិន្នន័យអចិន្ត្រៃយ៍</h3>
            <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.7;">
              ប្រសិនបើកម្មវិធីរបស់សុខាត្រូវបានតភ្ជាប់ទៅកាន់ <strong>SharePoint List</strong> លើ Cloud នោះគ្រោះមហន្តរាយនេះនឹងមិនកើតឡើងឡើយ!
            </p>
            <ul style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.8; margin-top: 0.75rem; padding-left: 1.2rem;">
              <li><strong style="color: #5eead4;">បញ្ជូនភ្លាមដល់ Cloud ៖</strong> ទិន្នន័យត្រូវបញ្ជូនតាមប្រព័ន្ធអ៊ីនធឺណិតទៅកាន់ Microsoft Data Center ភ្លាមៗ។</li>
              <li><strong style="color: #5eead4;">មិនខ្វល់រឿងអស់ថ្ម ៖</strong> ទោះបីជា Tablet ធ្លាក់បែក ឬរលត់ម៉ាស៊ីន ក៏ទិន្នន័យនៅតែមានសុវត្ថិភាព ១០០% លើ Server។</li>
              <li><strong style="color: #5eead4;">ក្រុមជាងមើលឃើញភ្លាម ៖</strong> ប្រធានផ្នែក និងក្រុមជាងអាចបើកមើលសំបុត្រនោះលើកុំព្យូទ័ររបស់ពួកគេក្នុងរយៈពេលតែ ៥ វិនាទីប៉ុណ្ណោះ!</li>
            </ul>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>ការបង្កើតអារម្មណ៍ចូលរួម ៖</strong> លើកឧទាហរណ៍នេះឡើងដោយការសង្កត់សំឡេង។ ធ្វើឱ្យសិស្សមានអារម្មណ៍ថាការខ្វះឃ្លាំងទិន្នន័យ Storage ពិតជាបង្កគ្រោះថ្នាក់ជាក់ស្តែងដល់អាជីវកម្ម មិនមែនគ្រាន់តែជាទ្រឹស្តីកូដនោះទេ។</p>`
    },

    // Slide 6: Everyday Analogy: The Whiteboard vs. The Steel Filing Cabinet
    {
      title: "ការប្រៀបធៀបក្នុងជីវិតប្រចាំថ្ងៃ ៖ ក្តារខៀនសរសេរដៃ ទល់នឹង ទូដែកដាក់ឯកសារ",
      segment: "ផ្នែកទី ២ &bull; ការប្រៀបធៀបក្នុងជីវិតរស់នៅ",
      subtitle: "ស្វែងយល់ពីភាពខុសគ្នារវាងអង្គចងចាំ RAM បណ្តោះអាសន្ន និង Cloud Storage អចិន្ត្រៃយ៍។",
      content: `<div class="analogy-grid">
            <div class="analogy-column" style="border-top: 4px solid var(--color-warning);">
              <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fde68a;">អង្គចងចាំ RAM (Variables)</span>
              <h3 style="color: #fde68a; margin: 0.5rem 0;">ក្តារខៀនសរសេរដៃក្នុងបន្ទប់ប្រជុំ</h3>
              
              <div style="background: rgba(15, 23, 42, 0.6); padding: 0.75rem; border-radius: 0.5rem; margin-bottom: 0.75rem;">
                <p style="color: var(--text-main); font-size: 0.88rem; line-height: 1.6; margin: 0;">
                  អ្នកសរសេរលេខ ឬកំណត់ត្រាលើក្តារខៀន។ វាលឿន ងាយស្រួលកែប្រែ និងអស្ចារ្យសម្រាប់ការគិតភ្លាមៗ។
                </p>
              </div>

              <ul style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.7; padding-left: 1.2rem;">
                <li><strong>រលុបងាយ ៖</strong> ពេលចប់ការប្រជុំ ឬពេលនរណាម្នាក់យកក្រណាត់មកជូត អ្វីៗរលុបអស់គ្មានសល់។</li>
                <li><strong>អ្នកក្រៅមើលមិនឃើញ ៖</strong> មនុស្សនៅបន្ទប់ផ្សេង ឬរោងចក្រផ្សេងមិនអាចមើលឃើញអ្វីនៅលើក្តារខៀននោះទេ។</li>
                <li><strong>គ្មានប្រវត្តិ ៖</strong> មិនអាចដឹងថាកាលពីម្សិលមិញមានសរសេរអ្វីខ្លះឡើយ។</li>
              </ul>
            </div>

            <div class="analogy-column" style="border-top: 4px solid var(--color-primary);">
              <span class="card-badge" style="background: rgba(20, 184, 166, 0.25); color: #5eead4;">Cloud Storage (SharePoint List)</span>
              <h3 style="color: #5eead4; margin: 0.5rem 0;">ទូដែកដាក់ឯកសារកណ្តាលរបស់រោងចក្រ</h3>
              
              <div style="background: rgba(15, 23, 42, 0.6); padding: 0.75rem; border-radius: 0.5rem; margin-bottom: 0.75rem;">
                <p style="color: var(--text-main); font-size: 0.88rem; line-height: 1.6; margin: 0;">
                  ឯកសារផ្លូវការត្រូវបានបោះពុម្ព ចុះលេខកូដ និងដាក់ក្នុងថតឯកសារទូដែកដែលមានសោការពារយ៉ាងរឹងមាំ។
                </p>
              </div>

              <ul style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.7; padding-left: 1.2rem;">
                <li><strong>គង់វង្សជាអចិន្ត្រៃយ៍ ៖</strong> ទោះបីជាបិទភ្លើង ឬបុគ្គលិកចេញទៅផ្ទះ ក៏ឯកសារក្នុងទូដែកមិនបាត់បង់ដែរ។</li>
                <li><strong>ចែករំលែកគ្នាប្រើ ៖</strong> មនុស្សដែលមានសោត្រឹមត្រូវ អាចបើកមើល និងទាញយកព័ត៌មានបានគ្រប់ពេល។</li>
                <li><strong>មានប្រវត្តិ និងសុវត្ថិភាព ៖</strong> ដឹងច្បាស់ថាឯកសារណាបញ្ចូលពេលណា និងការពារដោយប្រព័ន្ធសុវត្ថិភាព។</li>
              </ul>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>រូបភាពប្រៀបធៀប ៖</strong> សួរទៅកាន់សិស្ស៖ "បើអ្នកត្រូវកត់ត្រាការទូទាត់ប្រាក់ខែ តើអ្នកកត់លើក្តារខៀន ឬកត់ក្នុងសៀវភៅបញ្ជីទូដែក?" សិស្សនឹងឆ្លើយថាទូដែកភ្លាម។ នេះជាពេលដែលត្រូវប្រាប់ថា៖ "SharePoint List គឺជាទូដែកឌីជីថលលើ Cloud របស់អ្នក!"</p>`
    },

    // Slide 7: Plain-Language Mental Model: Lists, Columns, Rows
    {
      title: "គំរូផ្នត់គំនិត ៖ បញ្ជី (List), ជួរឈរ (Columns), និងជួរដេក (Rows)",
      segment: "ផ្នែកទី ២ &bull; គំរូផ្នត់គំនិតជាភាសាសាមញ្ញ",
      subtitle: "កុំទន្ទេញនិយមន័យបច្ចេកទេស! ស្វែងយល់ពីរចនាសម្ព័ន្ធ (Structure)នៃតារាងទិន្នន័យសាមញ្ញ។",
      content: `<div class="card">
            <h3 class="card-title">រចនាសម្ព័ន្ធ ៣ ផ្នែកនៃ SharePoint List</h3>

            <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-top: 0.5rem;">
              <div style="background: rgba(15, 23, 42, 0.7); border-left: 4px solid #14b8a6; padding: 0.85rem; border-radius: 0.5rem;">
                <strong style="color: #5eead4; font-size: 0.95rem;">១. បញ្ជីទិន្នន័យ (List / Table) ៖</strong>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin: 0.2rem 0 0 0;">
                  គឺជាទូឯកសារទាំងមូល។ ឧទាហរណ៍៖ បញ្ជី <code>Apex_Maintenance_Requests</code> គឺជាកន្លែងប្រមូលផ្តុំរាល់សំបុត្រស្នើសុំជួសជុលទាំងអស់ក្នុងរោងចក្រ។
                </p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.7); border-left: 4px solid #06b6d4; padding: 0.85rem; border-radius: 0.5rem;">
                <strong style="color: #67e8f9; font-size: 0.95rem;">២. ជួរឈរ (Columns / Fields) ៖</strong>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin: 0.2rem 0 0 0;">
                  គឺជាប្រភេទសំណួរដែលត្រូវសួរ! ជួរឈរនីមួយៗកំណត់ថាតើព័ត៌មានប្រភេទណាដែលត្រូវបំពេញ (ដូចជា ឈ្មោះផ្នែក, ភាពបន្ទាន់, កាលបរិច្ឆេទ)។
                </p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.7); border-left: 4px solid #3b82f6; padding: 0.85rem; border-radius: 0.5rem;">
                <strong style="color: #93c5fd; font-size: 0.95rem;">៣. ជួរដេក ឬទិន្នន័យមួយកំណត់ត្រា (Rows / Items / Records) ៖</strong>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin: 0.2rem 0 0 0;">
                  គឺជាសន្លឹកឯកសារពិតជាក់ស្តែងមួយសន្លឹក! ជួរដេកនីមួយៗតំណាងឱ្យបញ្ហាខូចម៉ាស៊ីនមួយដែលបានកើតឡើងពិតប្រាកដ។
                </p>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">ការមើលឃើញជាក់ស្តែងលើអេក្រង់</h3>
            <div style="background: rgba(15, 23, 42, 0.9); border: 1px solid var(--border-subtle); border-radius: 0.75rem; padding: 1rem; overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; font-size: 0.82rem; text-align: left;">
                <thead>
                  <tr style="border-bottom: 2px solid #14b8a6; color: #5eead4;">
                    <th style="padding: 6px;">Ticket ID (Title)</th>
                    <th style="padding: 6px;">Department</th>
                    <th style="padding: 6px;">Urgency</th>
                    <th style="padding: 6px;">Status</th>
                  </tr>
                </thead>
                <tbody style="color: #cbd5e1;">
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 6px; font-weight: bold; color: #38bdf8;">TKT-1001</td>
                    <td style="padding: 6px;">Molding</td>
                    <td style="padding: 6px;"><span class="sp-pill" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">Critical</span></td>
                    <td style="padding: 6px;"><span class="sp-pill" style="background: rgba(245, 158, 11, 0.2); color: #fde68a;">In Progress</span></td>
                  </tr>
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 6px; font-weight: bold; color: #38bdf8;">TKT-1002</td>
                    <td style="padding: 6px;">Packaging</td>
                    <td style="padding: 6px;"><span class="sp-pill" style="background: rgba(245, 158, 11, 0.2); color: #fde68a;">Medium</span></td>
                    <td style="padding: 6px;"><span class="sp-pill" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">Resolved</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style="color: var(--text-dim); font-size: 0.8rem; line-height: 1.6; margin-top: 0.75rem;">
              ជួរឈរខាងលើ (Columns) កំណត់ទម្រង់បែបបទ ចំណែកជួរដេកខាងក្រោម (Rows) គឺជាទិន្នន័យពិតដែលបានកត់ត្រាទុក។
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>ការបំភ្លឺពាក្យបច្ចេកទេស ៖</strong> នៅក្នុងពិភព Microsoft SharePoint គេហៅជួរដេកថា 'Item'។ នៅក្នុង Power Apps គេហៅថា 'Record'។ បញ្ជាក់ប្រាប់សិស្សថាកុំបារម្ភ ពួកវាមានន័យដូចគ្នាបេះបិទ គឺសំដៅលើជួរដេកនៃទិន្នន័យមួយខ្សែ!</p>`
    },

    // Slide 8: The Architecture Chain: Form Fields -> SP Columns -> Records
    {
      title: "ខ្សែច្រវាក់ស្ថាបត្យកម្ម ៖ Form Fields &rarr; SP Columns &rarr; Records",
      segment: "ផ្នែកទី ២ &bull; ខ្សែច្រវាក់តភ្ជាប់",
      subtitle: "របៀបដែលទិន្នន័យធ្វើដំណើរពីម្រាមដៃអ្នកប្រើប្រាស់ ចូលទៅកាន់មូលដ្ឋានទិន្នន័យ Cloud។",
      content: `<div class="card">
            <h3 class="card-title">ខ្សែច្រវាក់ ៣ ដំណាក់កាល</h3>
            
            <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem;">
              <div style="background: rgba(15, 23, 42, 0.7); border-left: 4px solid #3b82f6; padding: 0.75rem; border-radius: 0.4rem;">
                <span style="font-size: 0.75rem; text-transform: uppercase; color: #93c5fd; font-weight: 700;">ដំណាក់កាលទី ១ ៖ Power Apps UI Fields</span>
                <p style="color: var(--text-main); font-size: 0.85rem; margin: 0.2rem 0 0 0;">
                  អ្នកប្រើប្រាស់វាយបញ្ចូលអក្សរក្នុង <code>TextInput</code> ឬជ្រើសរើសជម្រើសក្នុង <code>Dropdown</code> នៅលើអេក្រង់ Canvas។
                </p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.7); border-left: 4px solid #14b8a6; padding: 0.75rem; border-radius: 0.4rem;">
                <span style="font-size: 0.75rem; text-transform: uppercase; color: #5eead4; font-weight: 700;">ដំណាក់កាលទី ២ ៖ SharePoint Schema Columns</span>
                <p style="color: var(--text-main); font-size: 0.85rem; margin: 0.2rem 0 0 0;">
                  កូឡោន SharePoint ដើរតួជាអ្នកត្រួតពិនិត្យប្រភេទ (Type Validator) ធានាថាលេខត្រូវចូលលេខ អក្សរចូលអក្សរ និងជម្រើសត្រូវតាមបញ្ជី។
                </p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.7); border-left: 4px solid #10b981; padding: 0.75rem; border-radius: 0.4rem;">
                <span style="font-size: 0.75rem; text-transform: uppercase; color: #86efac; font-weight: 700;">ដំណាក់កាលទី ៣ ៖ Persistent Cloud Item / Record</span>
                <p style="color: var(--text-main); font-size: 0.85rem; margin: 0.2rem 0 0 0;">
                  ទិន្នន័យត្រូវបានកត់ត្រាចូលទៅក្នុង Microsoft Data Center ដែលមានប្រព័ន្ធចម្លងសុវត្ថិភាពទូទាំងពិភពលោក (Geo-redundant)។
                </p>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">ការផ្គូផ្គងប្រភេទ Control ទៅកាន់ប្រភេទ Column</h3>
            <div style="background: rgba(15, 23, 42, 0.75); border-radius: 0.5rem; padding: 0.85rem; font-size: 0.82rem; line-height: 1.7;">
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.08); padding: 0.35rem 0;">
                <span style="color: #93c5fd;">TextInput (អក្សរខ្លី)</span>
                <span style="color: #5eead4;">&rarr; Single line of text</span>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.08); padding: 0.35rem 0;">
                <span style="color: #93c5fd;">Dropdown / Radio (ជម្រើស)</span>
                <span style="color: #5eead4;">&rarr; Choice (បញ្ជីជម្រើស)</span>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.08); padding: 0.35rem 0;">
                <span style="color: #93c5fd;">TextInput (Multiline)</span>
                <span style="color: #5eead4;">&rarr; Multiple lines of text</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 0.35rem 0;">
                <span style="color: #93c5fd;">DatePicker (ប្រតិទិន)</span>
                <span style="color: #5eead4;">&rarr; Date and Time</span>
              </div>
            </div>
            <p style="color: #fde68a; font-size: 0.8rem; margin-top: 0.75rem;">
              ច្បាប់មាស ៖ កុំព្យាយាមភ្ជាប់ DatePicker ទៅកាន់ Text Column ឬ Dropdown ទៅកាន់ Number Column ឱ្យសោះ ព្រោះវានឹងបង្កកំហុសទិន្នន័យ!
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>ការតភ្ជាប់ទៅកាន់ថ្ងៃស្អែក ៖</strong> ប្រាប់សិស្សថាតារាងផ្គូផ្គងនេះគឺជាផែនទីមាស។ នៅថ្ងៃស្អែក (ថ្ងៃទី ២០) យើងនឹងប្រើអនុគមន៍ Patch() ដើម្បីបញ្ជូនទិន្នន័យឆ្លងកាត់ស្ពាននេះ។ បើស្ពាននេះសាងសង់ខុស ប្រព័ន្ធនឹងបដិសេធមិនទទួលទិន្នន័យឡើយ។</p>`
    },

    // Slide 9: Column Types: The Building Blocks of Business Schemas
    {
      title: "ប្រភេទ Columns ៖ ដុំឥដ្ឋនៃរចនាសម្ព័ន្ធទិន្នន័យអាជីវកម្ម",
      segment: "ផ្នែកទី ៣ &bull; ប្រភេទ Columns",
      subtitle: "ការយល់ដឹងពីប្រភេទ Columns សំខាន់ៗទាំង ៥ និងដែនកំណត់របស់ពួកវា។",
      content: `<div class="card" style="padding: 1.15rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
              <strong style="color: #5eead4; font-size: 0.95rem;">Single line of text</strong>
              <span class="card-badge" style="background: rgba(20, 184, 166, 0.2); color: #5eead4;">អត្ថបទខ្លី</span>
            </div>
            <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.6;">
              ផ្ទុកអក្សរបានអតិបរមា ២៥៥ តួ។ ល្អឥតខ្ចោះសម្រាប់ឈ្មោះខ្លី លេខកូដសម្គាល់ ឬលេខសំបុត្រ (ដូចជា TKT-1001)។
            </p>
          </div>

          <div class="card" style="padding: 1.15rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
              <strong style="color: #67e8f9; font-size: 0.95rem;">Choice</strong>
              <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">បញ្ជីជម្រើស</span>
            </div>
            <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.6;">
              កំណត់បញ្ជីជម្រើសជាមុន (ដូចជា Low, Med, High)។ ការពារកុំឱ្យមនុស្សវាយអក្សរខុស ឬប្រើពាក្យមិនដូចគ្នា។
            </p>
          </div>

          <div class="card" style="padding: 1.15rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
              <strong style="color: #93c5fd; font-size: 0.95rem;">Multiple lines of text</strong>
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">អត្ថបទវែង</span>
            </div>
            <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.6;">
              សម្រាប់កថាខណ្ឌវែង និងការរៀបរាប់លម្អិត។ <strong>ត្រូវតែជ្រើសរើស Plain text</strong> ជៀសវាង Rich text!
            </p>
          </div>

          <div class="card" style="padding: 1.15rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
              <strong style="color: #fde68a; font-size: 0.95rem;">Date and Time</strong>
              <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fde68a;">កាលបរិច្ឆេទ</span>
            </div>
            <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.6;">
              កត់ត្រាកាលបរិច្ឆេទពិតប្រាកដតាមទម្រង់ស្តង់ដារ។ អាចកំណត់ឱ្យដាក់កាលបរិច្ឆេទថ្ងៃនេះ (Today) ដោយស្វ័យប្រវត្តិ។
            </p>
          </div>

          <div class="card" style="padding: 1.15rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
              <strong style="color: #c4b5fd; font-size: 0.95rem;">Number</strong>
              <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c4b5fd;">ចំនួនលេខសុទ្ធ</span>
            </div>
            <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.6;">
              សម្រាប់តម្លៃគណិតវិទ្យា (បរិមាណ, តម្លៃ, សីតុណ្ហភាព)។ មិនអនុញ្ញាតឱ្យបញ្ចូលអក្សរឡើយ។
            </p>
          </div>

          <div class="card" style="padding: 1.15rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
              <strong style="color: #86efac; font-size: 0.95rem;">Yes/No (Boolean)</strong>
              <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ពិត/មិនពិត</span>
            </div>
            <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.6;">
              កត់ត្រាតម្លៃ True ឬ False សុទ្ធ (ដូចជា IsMachineHalted, RequiresSafetyApproval)។
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>ការសង្កត់ធ្ងន់លើ Data Types ៖</strong> ពន្យល់ថានៅពេលដែលយើងជ្រើសរើសប្រភេទ Column បានត្រឹមត្រូវ SharePoint នឹងដើរតួជាឆ្មាំទ្វារការពារមិនឱ្យទិន្នន័យខុសទម្រង់អាចចូលមកបំពុលប្រព័ន្ធបានឡើយ។</p>`
    },

    // Slide 10: The Sacred "Title" Column Rule
    {
      title: "ច្បាប់កូឡោនពិសិដ្ឋ 'Title' ៖ កុំព្យាយាមលុប តែត្រូវ Rename វា!",
      segment: "ផ្នែកទី ៣ &bull; ច្បាប់ស្ថាបត្យកម្មស្នូល",
      subtitle: "មូលហេតុដែលអ្នកអភិវឌ្ឍន៍អាជីពមិនដែលព្យាយាមលុប Title Column ចោលឡើយ។",
      content: `<div class="card" style="border-left: 4px solid var(--color-danger);">
            <div class="card-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">កំហុសធំបំផុតរបស់អ្នកទើបរៀនដំបូង</div>
            <h3 class="card-title" style="color: #fca5a5; margin-top: 0.5rem;">"ខ្ញុំមិនត្រូវការចំណងជើងទេ ខ្ញុំចង់លុប Title ចោល!"</h3>
            <p style="color: var(--text-main); font-size: 0.92rem; line-height: 1.7;">
              អ្នកចាប់ផ្តើមដំបូងស្ទើរតែ ១០០% តែងតែព្យាយាមស្វែងរកប៊ូតុងលុប (Delete) លើ Column ឈ្មោះ <code>Title</code> ព្រោះពួកគេគិតថាទម្រង់របស់ពួកគេមិនត្រូវការចំណងជើងនោះទេ។
            </p>
            <div style="background: rgba(239, 68, 68, 0.1); border-radius: 0.5rem; padding: 0.75rem; margin-top: 0.75rem;">
              <strong style="color: #fca5a5; font-size: 0.85rem;">ការពិតរបស់ SharePoint Core ៖</strong>
              <p style="color: var(--text-muted); font-size: 0.8rem; margin: 0.2rem 0 0 0; line-height: 1.5;">
                អ្នកមិនអាចលុប Title បានជាដាច់ខាត! វាត្រូវបានបង្កប់យ៉ាងរឹងមាំទៅក្នុងកូដស្នូលរបស់ Microsoft SharePoint សម្រាប់ធ្វើ Indexing, Search, និង System Identifiers។
              </p>
            </div>
          </div>

          <div class="card" style="border-left: 4px solid var(--color-success);">
            <div class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ដំណោះស្រាយរបស់ស្ថាបត្យករអាជីព</div>
            <h3 class="card-title" style="color: #86efac; margin-top: 0.5rem;">ក្បួន Rename ទៅជា Primary Identifier</h3>
            <p style="color: var(--text-main); font-size: 0.92rem; line-height: 1.7;">
              អ្នកអភិវឌ្ឍន៍អាជីពមិនដែលខាតពេលតវ៉ាជាមួយប្រព័ន្ធទេ។ ពួកគេគ្រាន់តែ <strong>ប្តូរឈ្មោះបង្ហាញ (Rename)</strong> របស់ Title ទៅជាលេខកូដចម្បងនៃប្រព័ន្ធរបស់ពួកគេ!
            </p>
            
            <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid var(--border-subtle); border-radius: 0.5rem; padding: 0.75rem; margin-top: 0.75rem;">
              <strong style="color: #5eead4; font-size: 0.85rem;">ឧទាហរណ៍នៃការ Rename ជាក់ស្តែង ៖</strong>
              <ul style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.6; padding-left: 1.2rem; margin-top: 0.35rem;">
                <li>ក្នុងប្រព័ន្ធជួសជុល ៖ Rename <code>Title</code> &rarr; <code>Ticket ID</code></li>
                <li>ក្នុងប្រព័ន្ធគ្រប់គ្រងទ្រព្យសម្បត្តិ ៖ Rename <code>Title</code> &rarr; <code>Asset Tag</code></li>
                <li>ក្នុងប្រព័ន្ធបញ្ជាទិញ ៖ Rename <code>Title</code> &rarr; <code>Order Number</code></li>
              </ul>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>ការដោះស្រាយកង្វល់ ៖</strong> សិស្សជាច្រើនមានអារម្មណ៍ធុញថប់ពេលឃើញពាក្យ Title។ ប្រាប់ពួកគេថា៖ "គិតថា Title ដូចជាលេខអត្តសញ្ញាណប័ណ្ណរបស់មនុស្ស។ យើងគ្រាន់តែប្តូរផ្លាកឈ្មោះរបស់វាទៅជា Ticket ID ទៅបានហើយ!"</p>`
    },

    // Slide 11: Controlled Vocabulary vs. Free-Text Chaos
    {
      title: "បញ្ជីជម្រើសត្រួតពិនិត្យ ទល់នឹង ភាពរញ៉េរញ៉ៃនៃអត្ថបទសេរី",
      segment: "ផ្នែកទី ៣ &bull; អភិបាលកិច្ចទិន្នន័យ",
      subtitle: "ហេតុអ្វីបានជា Choice Columns មានសារៈសំខាន់បំផុតសម្រាប់របាយការណ៍ និង Dashboard អាជីវកម្ម។",
      content: `<div class="card" style="border-top: 4px solid var(--color-danger);">
            <div class="card-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">អត្ថបទសេរី (Single Line of Text)</div>
            <h3 class="card-title" style="color: #fca5a5;">ភាពច្របូកច្របល់នៃការវាយអក្សរដោយដៃ</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
              នៅពេលអ្នកទុកឱ្យអ្នកប្រើវាយអក្សរឈ្មោះផ្នែកដោយសេរី មនុស្ស ៥ នាក់នឹងវាយចេញជា ៥ បែបផ្សេងគ្នា ៖
            </p>
            <div style="background: rgba(15, 23, 42, 0.7); padding: 0.65rem; border-radius: 0.4rem; font-family: var(--font-code); font-size: 0.8rem; color: #fca5a5; margin: 0.5rem 0;">
              "Molding", "moulding", "MOLD", "moldng", "ផ្នែកចាក់ពុម្ព"
            </div>
            <p style="color: #cbd5e1; font-size: 0.8rem; line-height: 1.5;">
              លទ្ធផល ៖ នៅពេលអ្នកគ្រប់គ្រងចង់ Filter រកមើលបញ្ហារបស់ផ្នែក Molding ប្រព័ន្ធនឹងបង្ហាញទិន្នន័យមិនពេញលេញ ដែលធ្វើឱ្យរបាយការណ៍ខុសទាំងស្រុង!
            </p>
          </div>

          <div class="card" style="border-top: 4px solid var(--color-success);">
            <div class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">បញ្ជីជម្រើស (Choice Column)</div>
            <h3 class="card-title" style="color: #86efac;">ភាពត្រឹមត្រូវ ១០០% នៃទិន្នន័យ</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
              អ្នកបង្កើតបញ្ជីជម្រើសជាក់លាក់មួយ។ អ្នកប្រើប្រាស់គ្រាន់តែចុចជ្រើសរើសប៉ុណ្ណោះ ៖
            </p>
            <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin: 0.5rem 0;">
              <span class="sp-pill" style="background: rgba(20, 184, 166, 0.2); color: #5eead4;">Molding</span>
              <span class="sp-pill" style="background: rgba(20, 184, 166, 0.2); color: #5eead4;">Extrusion</span>
              <span class="sp-pill" style="background: rgba(20, 184, 166, 0.2); color: #5eead4;">Packaging</span>
              <span class="sp-pill" style="background: rgba(20, 184, 166, 0.2); color: #5eead4;">Quality</span>
              <span class="sp-pill" style="background: rgba(20, 184, 166, 0.2); color: #5eead4;">Maintenance</span>
            </div>
            <p style="color: #cbd5e1; font-size: 0.8rem; line-height: 1.5;">
              លទ្ធផល ៖ ទិន្នន័យស្អាតល្អឥតខ្ចោះ ១០០%។ រាល់ការ Filter, Search, និង Dashboard ក្នុង Power BI ដំណើរការដោយភាពត្រឹមត្រូវគ្មានកំហុស។
            </p>
          </div>

          <div class="card" style="border-top: 4px solid var(--color-cyan);">
            <div class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">អភិបាលកិច្ចទិន្នន័យ (Governance)</div>
            <h3 class="card-title" style="color: #67e8f9;">ច្បាប់រចនាសម្រាប់អ្នកបង្កើត App</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
              កាលណាទិន្នន័យមានជម្រើសច្បាស់លាស់ <strong>ហាមដាច់ខាតកុំប្រើ Single Line of Text</strong>!
            </p>
            <ul style="color: var(--text-muted); font-size: 0.8rem; line-height: 1.6; padding-left: 1.2rem; margin-top: 0.5rem;">
              <li>ផ្នែកទទួលខុសត្រូវ &rarr; ប្រើ Choice</li>
              <li>វេនការងារ (Shift A, Shift B) &rarr; ប្រើ Choice</li>
              <li>កម្រិតភាពបន្ទាន់ (Low, Med, High) &rarr; ប្រើ Choice</li>
              <li>ស្ថានភាពសំបុត្រ (New, In Progress, Closed) &rarr; ប្រើ Choice</li>
            </ul>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>ការតភ្ជាប់ទៅកាន់ Power BI ៖</strong> ប្រាប់សិស្សថា: 'Garbage In, Garbage Out'។ បើយើងអនុញ្ញាតឱ្យទិន្នន័យកខ្វក់ចូលក្នុង SharePoint នោះ Dashboard សម្រាប់ថ្នាក់ដឹកនាំនឹងក្លាយជាសំរាមដូចគ្នា។ Choice Columns គឺជាឧបករណ៍សម្អាតទិន្នន័យតាំងពីប្រភពដើម!</p>`
    },

    // Slide 12: Data Schema Blueprint: Apex_Maintenance_Requests
    {
      title: "ប្លង់មេស្ថាបត្យកម្មទិន្នន័យ ៖ Apex_Maintenance_Requests",
      segment: "ផ្នែកទី ៣ &bull; ប្លង់មេស្ថាបត្យកម្ម",
      subtitle: "ប្លង់វិស្វកម្មពេញលេញនៃតារាងទិន្នន័យ SharePoint សម្រាប់រោងចក្រ Apex Plastics។",
      content: `<div class="card" style="padding: 1.25rem;">
            <table class="sp-data-table">
              <thead>
                <tr>
                  <th>ឈ្មោះបង្ហាញ (Display Name)</th>
                  <th>ឈ្មោះក្នុងប្រព័ន្ធ (Internal Name)</th>
                  <th>ប្រភេទទិន្នន័យ (Data Type)</th>
                  <th>ទាមទារ?</th>
                  <th>ជម្រើស / លក្ខខណ្ឌកំណត់</th>
                  <th>គោលបំណងអាជីវកម្ម</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong style="color: #5eead4;">Ticket ID</strong> (renamed)</td>
                  <td><code>Title</code></td>
                  <td>Single line of text</td>
                  <td><span class="sp-pill" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">បាទ/ចាស</span></td>
                  <td>អតិបរមា ២៥៥ តួ</td>
                  <td>លេខសម្គាល់សំបុត្រតែមួយគត់ (ឧ. TKT-1001)</td>
                </tr>
                <tr>
                  <td><strong>Department</strong></td>
                  <td><code>Department</code></td>
                  <td>Choice</td>
                  <td><span class="sp-pill" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">បាទ/ចាស</span></td>
                  <td>Molding, Extrusion, Packaging, Quality, Maintenance</td>
                  <td>ផ្នែកផលិតកម្មដែលជួបប្រទះបញ្ហា</td>
                </tr>
                <tr>
                  <td><strong>Shift</strong></td>
                  <td><code>Shift</code></td>
                  <td>Choice</td>
                  <td><span class="sp-pill" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">បាទ/ចាស</span></td>
                  <td>Shift A (ព្រឹក), Shift B (យប់), Weekend</td>
                  <td>វេនការងារដែលបញ្ហាកើតឡើង</td>
                </tr>
                <tr>
                  <td><strong>Urgency</strong></td>
                  <td><code>Urgency</code></td>
                  <td>Choice</td>
                  <td><span class="sp-pill" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">បាទ/ចាស</span></td>
                  <td>Low, Medium, High, Critical</td>
                  <td>កម្រិតអាទិភាពដើម្បីឱ្យជាងដឹងថាត្រូវជួសជុលមុន</td>
                </tr>
                <tr>
                  <td><strong>Problem Description</strong></td>
                  <td><code>ProblemDescription</code></td>
                  <td>Multiple lines of text</td>
                  <td><span class="sp-pill" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">បាទ/ចាស</span></td>
                  <td>Plain text សុទ្ធ (គ្មានកូដ HTML)</td>
                  <td>ការពណ៌នាលម្អិតអំពីការខូចខាតម៉ាស៊ីន</td>
                </tr>
                <tr>
                  <td><strong>Reported Date</strong></td>
                  <td><code>ReportedDate</code></td>
                  <td>Date and Time</td>
                  <td><span class="sp-pill" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ស្វ័យប្រវត្ត</span></td>
                  <td>Date Only; លំនាំដើម ៖ Today</td>
                  <td>កាលបរិច្ឆេទដែលបានរាយការណ៍</td>
                </tr>
                <tr>
                  <td><strong>Status</strong></td>
                  <td><code>Status</code></td>
                  <td>Choice</td>
                  <td><span class="sp-pill" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ស្វ័យប្រវត្ត</span></td>
                  <td>New, In Progress, Resolved; លំនាំដើម ៖ New</td>
                  <td>ដំណាក់កាលនៃវដ្តជីវិតសំបុត្រជួសជុល</td>
                </tr>
              </tbody>
            </table>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>ពន្យល់ពី Internal Name ទល់នឹង Display Name ៖</strong> ចង្អុលបង្ហាញកូឡោនទី ២។ នៅពេលបង្កើត Column ដំបូង SharePoint យកឈ្មោះនោះមកធ្វើជា URL identifier។ គន្លឹះពិសេស ៖ ពេលបង្កើតដំបូង កុំដកឃ្លា (ដូចជា ProblemDescription) រួចសឹមចូលទៅ Edit ប្តូរឈ្មោះបង្ហាញជា Problem Description តាមក្រោយ។ វិធីនេះជៀសវាងការកើតសញ្ញា '%20' ក្នុងកូដ!</p>`
    },

    // Slide 13: Interactive Widget 1: Field-to-Column Mapping Matrix Inspector
    {
      title: "ឧបករណ៍អន្តរកម្ម ៖ ឧបករណ៍ត្រួតពិនិត្យការផ្គូផ្គង Field ទៅ Column",
      segment: "ផ្នែកទី ៣ &bull; ឧបករណ៍អន្តរកម្ម",
      subtitle: "ជ្រើសរើស Form Field ណាមួយនៅខាងឆ្វេង ដើម្បីពិនិត្យមើលការកំណត់រចនាសម្ព័ន្ធ SharePoint និងតួនាទីការពារទិន្នន័យ។",
      content: `<div class="mapping-selector-panel">
            <span style="font-size: 0.78rem; text-transform: uppercase; color: var(--color-cyan); font-weight: 700; letter-spacing: 1px;">App UI Form Fields:</span>
            <div class="mapping-field-btn active" onclick="inspectField('ticket')">
              <strong>Ticket ID</strong>
              <small style="color: var(--text-muted); display: block;">លេខកូដចម្បង &bull; Text</small>
            </div>
            <div class="mapping-field-btn" onclick="inspectField('dept')">
              <strong>Department</strong>
              <small style="color: var(--text-muted); display: block;">Dropdown &bull; Single Choice</small>
            </div>
            <div class="mapping-field-btn" onclick="inspectField('shift')">
              <strong>Operating Shift</strong>
              <small style="color: var(--text-muted); display: block;">Radio / Dropdown &bull; Choice</small>
            </div>
            <div class="mapping-field-btn" onclick="inspectField('desc')">
              <strong>Problem Description</strong>
              <small style="color: var(--text-muted); display: block;">ប្រអប់អត្ថបទវែង &bull; Long Text</small>
            </div>
            <div class="mapping-field-btn" onclick="inspectField('urgency')">
              <strong>Urgency Level</strong>
              <small style="color: var(--text-muted); display: block;">កម្រិតអាទិភាព &bull; Choice</small>
            </div>
            <div class="mapping-field-btn" onclick="inspectField('date')">
              <strong>Reported Date</strong>
              <small style="color: var(--text-muted); display: block;">ប្រតិទិន &bull; Date</small>
            </div>
          </div>

          <div class="inspector-display" id="inspector-display-box">
            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem; margin-bottom: 1rem;">
              <h3 id="inspector-field-title" style="margin: 0; color: #5eead4;">Field ៖ Ticket ID</h3>
              <span id="inspector-type-badge" class="card-badge" style="background: rgba(13, 148, 136, 0.25); color: #5eead4;">Single line of text (Title)</span>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div style="background: rgba(15, 23, 42, 0.6); padding: 0.85rem; border-radius: 0.5rem;">
                <strong style="color: var(--text-muted); font-size: 0.78rem; text-transform: uppercase;">ការកំណត់ក្នុង SharePoint ៖</strong>
                <p id="inspector-settings" style="color: var(--text-main); font-size: 0.88rem; margin: 0.3rem 0 0 0; line-height: 1.5;">
                  Column ៖ ប្តូរឈ្មោះពី <code>Title</code> មកជា "Ticket ID"។<br>
                  ទាមទារ (Required) ៖ បាទ/ចាស &bull; ប្រវែងអតិបរមា ៖ ២៥៥ តួ។
                </p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.6); padding: 0.85rem; border-radius: 0.5rem;">
                <strong style="color: var(--text-muted); font-size: 0.78rem; text-transform: uppercase;">ការផ្គូផ្គងក្នុង Power Apps ៖</strong>
                <p id="inspector-uimatch" style="color: var(--text-main); font-size: 0.88rem; margin: 0.3rem 0 0 0; line-height: 1.5;">
                  ត្រូវគ្នានឹង ៖ <code>TextInput</code> control ឬរូបមន្តបង្កើតលេខកូដស្វ័យប្រវត្តិ (ឧ. "TKT-" &amp; Text(RandBetween(1000,9999)))។
                </p>
              </div>
            </div>

            <div style="background: rgba(20, 184, 166, 0.1); border: 1px solid rgba(20, 184, 166, 0.3); border-radius: 0.5rem; padding: 0.85rem; flex: 1;">
              <strong style="color: #5eead4; font-size: 0.85rem;">គ្រោះមហន្តរាយដែលត្រូវបានទប់ស្កាត់ ៖</strong>
              <p id="inspector-disaster" style="color: var(--text-main); font-size: 0.85rem; margin: 0.3rem 0 0 0; line-height: 1.6;">
                ទប់ស្កាត់កុំឱ្យកើតមានកំណត់ត្រាកំព្រាដែលគ្មានអត្តសញ្ញាណ។ ក្នុងកំណត់ត្រាឧស្សាហកម្ម រាល់សំបុត្រទាំងអស់ត្រូវតែមានលេខកូដច្បាស់លាស់ដើម្បីតាមដានឆ្លងវេនការងារ។
              </p>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>ការចុចបង្ហាញជាជំហាន (៤ នាទី) ៖</strong> ចុចលើប៊ូតុងនីមួយៗនៅខាងឆ្វេងម្តងមួយៗ។ សួរសិស្សថា៖ "ហេតុអ្វីបានជា Urgency ត្រូវតែជា Choice?" "ហេតុអ្វី Problem Description ត្រូវតែជា Plain Text?" ធ្វើឱ្យសិស្សមើលឃើញទំនាក់ទំនងរវាង UI និង Database។</p>`
    },

    // Slide 14: Trainer Demonstration Script
    {
      title: "ការបង្ហាញផ្ទាល់ដោយគ្រូ ៖ ការបង្កើត List ក្នុង SharePoint Online",
      segment: "ផ្នែកទី ៣ &bull; ការបង្ហាញផ្ទាល់",
      subtitle: "សូមតាមដានគ្រូបង្កើត List ផ្ទាល់លើ Microsoft 365 មុនពេលអ្នកចាប់ផ្តើមចុចលើក្តារចុចរបស់អ្នក។",
      content: `<div class="card">
            <h3 class="card-title">ជំហានបង្ហាញផ្ទាល់ដោយគ្រូ</h3>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <div style="background: rgba(15, 23, 42, 0.7); padding: 0.65rem 0.85rem; border-radius: 0.4rem; border-left: 3px solid #0d9488;">
                <strong style="color: #5eead4; font-size: 0.82rem;">ជំហានទី ១ ៖ ចូលទៅកាន់ Site Contents</strong>
                <p style="color: var(--text-muted); font-size: 0.78rem; margin: 0.1rem 0 0 0;">បើក SharePoint Team Site របស់អ្នក &rarr; ចុចលើរូបកង់ស្ពឺ (Settings) &rarr; ចុច <strong>Site contents</strong>។</p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.7); padding: 0.65rem 0.85rem; border-radius: 0.4rem; border-left: 3px solid #0d9488;">
                <strong style="color: #5eead4; font-size: 0.82rem;">ជំហានទី ២ ៖ បង្កើត Blank List ថ្មី</strong>
                <p style="color: var(--text-muted); font-size: 0.78rem; margin: 0.1rem 0 0 0;">ចុច <strong>+ New</strong> &rarr; ជ្រើសរើស <strong>List</strong> &rarr; ចុច <strong>Blank list</strong> &rarr; ដាក់ឈ្មោះថា <code>Apex_Maintenance_Requests</code>។</p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.7); padding: 0.65rem 0.85rem; border-radius: 0.4rem; border-left: 3px solid #0d9488;">
                <strong style="color: #5eead4; font-size: 0.82rem;">ជំហានទី ៣ ៖ ប្តូរឈ្មោះ Title Column</strong>
                <p style="color: var(--text-muted); font-size: 0.78rem; margin: 0.1rem 0 0 0;">ចុចលើក្បាលជួរឈរ Title &rarr; Column settings &rarr; Rename &rarr; វាយ <code>Ticket ID</code> &rarr; Save។</p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.7); padding: 0.65rem 0.85rem; border-radius: 0.4rem; border-left: 3px solid #0d9488;">
                <strong style="color: #5eead4; font-size: 0.82rem;">ជំហានទី ៤ ៖ បន្ថែម Choice Columns</strong>
                <p style="color: var(--text-muted); font-size: 0.78rem; margin: 0.1rem 0 0 0;">ចុច <strong>+ Add column</strong> &rarr; Choice &rarr; បញ្ចូលជម្រើស Department &rarr; ដោះធីក 'Allow multiple selections'។</p>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">អ្វីដែលត្រូវសង្កេតយ៉ាងយកចិត្តទុកដាក់</h3>
            <div style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 0.5rem; padding: 1rem; margin-bottom: 1rem;">
              <strong style="color: #93c5fd; font-size: 0.9rem;">បញ្ជីត្រួតពិនិត្យរបស់គ្រូ ៖</strong>
              <ul style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.6; padding-left: 1.2rem; margin: 0.4rem 0 0 0;">
                <li>មើលការផ្លាស់ប្តូរ URL ក្នុង Browser ពេលបង្កើត List។</li>
                <li>សង្កេតមើលរបៀបដែល Choice Options អាចដាក់ពណ៌សម្គាល់បាន។</li>
                <li>សង្កេតកុងតាក់ 'Require that this column contains information'។</li>
                <li>មើលរបៀបបន្ថែមទិន្នន័យសាកល្បងមួយជួរដំបូង។</li>
              </ul>
            </div>
            <p style="color: var(--text-dim); font-size: 0.82rem; line-height: 1.5;">
              "សូមកត់សម្គាល់ថាយើងមិនដកឃ្លាក្នុងឈ្មោះ List ទេ (ប្រើសញ្ញា underscore ដូចជា <code>Apex_Maintenance_Requests</code>) ដើម្បីរក្សា URL ឱ្យស្អាតគ្មាន '%20'។"
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>ការចែករំលែកអេក្រង់ ៖</strong> ប្តូរអេក្រង់ទៅកាន់ SharePoint ផ្ទាល់។ ធ្វើបង្ហាញយឺតៗ ចង្អុលកណ្ដុរឱ្យសិស្សមើលឃើញច្បាស់ៗកន្លែងដែលត្រូវចុច។ កុំប្រញាប់ប្រញាល់។</p>`
    },

    // Slide 15: Guided Practice: Building the Maintenance Requests List
    {
      title: "ការអនុវត្តរួមគ្នា ៖ ការកសាងបញ្ជី Maintenance Requests ដោយផ្ទាល់ដៃ",
      segment: "ផ្នែកទី ៤ &bull; អនុវត្តរួមគ្នា",
      subtitle: "សូមបើក SharePoint Team Site របស់អ្នក ហើយអនុវត្តតាមគ្រូជំហានម្តងមួយៗ។",
      content: `<div class="card">
            <h3 class="card-title">ការណែនាំអំពីកិច្ចការផ្ទាល់ដៃរបស់សិស្ស</h3>
            <div style="display: flex; flex-direction: column; gap: 0.65rem;">
              <div style="background: rgba(15, 23, 42, 0.7); padding: 0.65rem; border-radius: 0.4rem; border: 1px solid var(--border-subtle);">
                <strong style="color: var(--text-main); font-size: 0.82rem;">កិច្ចការទី ១ ៖ បង្កើត Blank List</strong>
                <p style="color: var(--text-muted); font-size: 0.78rem; margin: 0.1rem 0 0 0;">ដាក់ឈ្មោះថា <code>[អក្សរកាត់ឈ្មោះអ្នក]_Maintenance_Requests</code>។</p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.7); padding: 0.65rem; border-radius: 0.4rem; border: 1px solid var(--border-subtle);">
                <strong style="color: var(--text-main); font-size: 0.82rem;">កិច្ចការទី ២ ៖ ប្តូរឈ្មោះ Title Column</strong>
                <p style="color: var(--text-muted); font-size: 0.78rem; margin: 0.1rem 0 0 0;">Rename កូឡោនលំនាំដើម Title ទៅជា <code>Ticket ID</code>។</p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.7); padding: 0.65rem; border-radius: 0.4rem; border: 1px solid var(--border-subtle);">
                <strong style="color: var(--text-main); font-size: 0.82rem;">កិច្ចការទី ៣ ៖ បន្ថែម Column ប្រភេទ Choice សម្រាប់ Department</strong>
                <p style="color: var(--text-muted); font-size: 0.78rem; margin: 0.1rem 0 0 0;">ដាក់ជម្រើស ៖ Molding, Extrusion, Packaging, Quality, Maintenance។</p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.7); padding: 0.65rem; border-radius: 0.4rem; border: 1px solid var(--border-subtle);">
                <strong style="color: var(--text-main); font-size: 0.82rem;">កិច្ចការទី ៤ ៖ បន្ថែម Column ប្រភេទ Choice សម្រាប់ Urgency</strong>
                <p style="color: var(--text-muted); font-size: 0.78rem; margin: 0.1rem 0 0 0;">ដាក់ជម្រើស ៖ Low, Medium, High, Critical។</p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.7); padding: 0.65rem; border-radius: 0.4rem; border: 1px solid var(--border-subtle);">
                <strong style="color: var(--text-main); font-size: 0.82rem;">កិច្ចការទី ៥ ៖ បន្ថែម Problem Description</strong>
                <p style="color: var(--text-muted); font-size: 0.78rem; margin: 0.1rem 0 0 0;">Multiple lines of text &rarr; ជ្រើសរើស <strong>Plain text</strong> ជាដាច់ខាត!</p>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">ការណែនាំពីគ្រូ និងច្រកទ្វារផ្ទៀងផ្ទាត់ (Verification Gate)</h3>
            <div style="background: rgba(20, 184, 166, 0.1); border: 1px solid rgba(20, 184, 166, 0.3); border-radius: 0.5rem; padding: 1rem; margin-bottom: 1rem;">
              <strong style="color: #5eead4; font-size: 0.88rem;">ច្រកទ្វារផ្ទៀងផ្ទាត់ភាពជោគជ័យ ៖</strong>
              <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.3rem 0 0 0; line-height: 1.5;">
                មុននឹងបន្តទៅមុខទៀត សូមចុច <strong>+ New</strong> ក្នុង SharePoint List របស់អ្នក។ សាកល្បងបញ្ចូលសំបុត្រតេស្តមួយ (ឧ. TKT-1001, Molding, High, "Test description")។ ពិនិត្យមើលថាតើទិន្នន័យនោះលោតបង្ហាញក្នុងតារាងដែរឬទេ!
              </p>
            </div>
            <p style="color: var(--text-dim); font-size: 0.8rem; line-height: 1.5;">
              ប្រសិនបើសិស្សណាម្នាក់ច្រឡំបង្កើត Column ថ្មីឈ្មោះ "Ticket ID" ជំនួសឱ្យការ Rename Title សូមជួយពួកគេលុប Column ថ្មីនោះចោលវិញ ហើយបង្រៀន Rename Title ឱ្យត្រូវ។
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>ដើរមើលសិស្ស (១០ នាទី) ៖</strong> ដើរត្រួតពិនិត្យអេក្រង់សិស្ស។ ធានាថាសិស្សគ្រប់រូបដាក់អក្សរកាត់ឈ្មោះរបស់ពួកគេនៅពីមុខឈ្មោះ List ដើម្បីកុំឱ្យជាន់គ្នាលើ tenant រួម។</p>`
    },

    // Slide 16: Interactive Widget 2: Live SharePoint Data Vault Simulator
    {
      title: "ឧបករណ៍អន្តរកម្ម ៖ កម្មវិធីត្រាប់តាមបន្ទប់ផ្ទុកទិន្នន័យ SharePoint",
      segment: "ផ្នែកទី ៤ &bull; កម្មវិធីត្រាប់តាមអន្តរកម្ម",
      subtitle: "ទទួលបទពិសោធន៍ផ្ទាល់នៃភាពគង់វង្សទិន្នន័យ! បញ្ជូនសំបុត្រទៅកាន់ Vault រួចសាកល្បងបិទបើក App ឡើងវិញ។",
      content: `<div class="sp-command-bar">
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <input id="vault-input-id" class="sample-input-control" style="width: 130px;" type="text" placeholder="Ticket ID (Title)" value="TKT-1042">
              <select id="vault-input-dept" class="sample-input-control" style="width: 140px;">
                <option value="Molding">Molding</option>
                <option value="Extrusion">Extrusion</option>
                <option value="Packaging">Packaging</option>
                <option value="Maintenance">Maintenance</option>
              </select>
              <select id="vault-input-urgency" class="sample-input-control" style="width: 120px;">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High" selected>High</option>
                <option value="Critical">Critical</option>
              </select>
              <input id="vault-input-desc" class="sample-input-control" style="width: 240px;" type="text" placeholder="Problem description..." value="Hydraulic arm seal leaking fluid">
              <button class="sample-button-control" onclick="submitToVault()">+ Commit to SharePoint</button>
            </div>

            <div style="display: flex; gap: 0.5rem;">
              <button class="hud-btn" style="border-color: #f59e0b; color: #fde68a;" onclick="simulateAppRestart()">Simulate App Restart (Clear RAM)</button>
              <button class="hud-btn" onclick="resetVaultDemo()">Reset Demo</button>
            </div>
          </div>

          <div class="sp-table-scroll">
            <table class="sp-data-table" id="vault-table">
              <thead>
                <tr>
                  <th>Ticket ID (Title)</th>
                  <th>Department</th>
                  <th>Urgency</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Persistence State</th>
                </tr>
              </thead>
              <tbody id="vault-tbody">
                <tr>
                  <td><strong style="color: #5eead4;">TKT-1001</strong></td>
                  <td>Molding</td>
                  <td><span class="sp-pill" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">Critical</span></td>
                  <td>Extruder heater band blown on Line 2</td>
                  <td><span class="sp-pill" style="background: rgba(245, 158, 11, 0.2); color: #fde68a;">In Progress</span></td>
                  <td>Today, 08:30 AM</td>
                  <td><span class="sp-pill" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">Safe in Cloud</span></td>
                </tr>
                <tr>
                  <td><strong style="color: #5eead4;">TKT-1002</strong></td>
                  <td>Packaging</td>
                  <td><span class="sp-pill" style="background: rgba(245, 158, 11, 0.2); color: #fde68a;">Medium</span></td>
                  <td>Conveyor belt sensor dirty, false jam alarms</td>
                  <td><span class="sp-pill" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">Resolved</span></td>
                  <td>Today, 09:15 AM</td>
                  <td><span class="sp-pill" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">Safe in Cloud</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div id="vault-toast-banner" style="display: none; background: rgba(13, 148, 136, 0.2); border: 1px solid #14b8a6; padding: 0.65rem 1rem; border-radius: 0.5rem; color: #5eead4; font-size: 0.85rem; align-items: center; justify-content: space-between;">
            <span id="vault-toast-msg">កំណត់ត្រាត្រូវបានរក្សាទុកក្នុងបន្ទប់សុវត្ថិភាព SharePoint List!</span>
            <span style="font-size: 0.75rem; color: #cbd5e1;">មានប្រព័ន្ធការពារ និងចម្លងសុវត្ថិភាព ៣ តំបន់លើ Cloud។</span>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>ការបង្ហាញពីអានុភាពនៃភាពគង់វង្ស (៤ នាទី) ៖</strong> វាយបញ្ចូលសំបុត្រថ្មី រួចចុច '+ Commit to SharePoint'។ បង្ហាញជួរដេកថ្មីដែលទើបលោតចូល។ បន្ទាប់មកចុចប៊ូតុងពណ៌លឿង 'Simulate App Restart'។ ចង្អុលទៅកាន់តារាង៖ "មើលចុះ! App ត្រូវបានបិទបើកឡើងវិញ RAM ត្រូវរលុប ប៉ុន្តែរាល់ជួរដេកក្នុង SharePoint List នៅតែគង់វង្សដដែល!" ខណៈពេលនេះហើយដែលសិស្សនឹងចងចាំគំនិតនេះពេញមួយជីវិត។</p>`
    },

    // Slide 17: 5 Dangerous Misconceptions vs. SharePoint Reality
    {
      title: "ការយល់ច្រឡំគ្រោះថ្នាក់ ៥ យ៉ាង និងការពិតរបស់ SharePoint",
      segment: "ផ្នែកទី ៥ &bull; អន្ទាក់ដែលត្រូវជៀសវាង",
      subtitle: "ជៀសវាងអន្ទាក់ទូទៅទាំង ៥ នេះ មុនពេលវាធ្វើឱ្យខូចខាតគម្រោង Power Apps របស់អ្នក។",
      content: `<div class="card" style="border-left: 4px solid var(--color-danger);">
            <h3 class="card-title" style="color: #fca5a5;">ការយល់ច្រឡំរបស់អ្នកចាប់ផ្តើមដំបូង</h3>
            
            <div style="display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.82rem;">
              <div style="background: rgba(15, 23, 42, 0.6); padding: 0.55rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5;">១. "ខ្ញុំមិនត្រូវការ Title ទេ ខ្ញុំនឹងលុបវាចោល។"</strong>
                <p style="color: var(--text-muted); margin: 0.1rem 0 0 0;">ពួកគេមានអារម្មណ៍ធុញថប់នៅពេលដែល SharePoint បដិសេធមិនឱ្យលុប។</p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.6); padding: 0.55rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5;">២. "Rich text ស្អាតជាងសម្រាប់ប្រអប់ពណ៌នាបញ្ហា។"</strong>
                <p style="color: var(--text-muted); margin: 0.1rem 0 0 0;">ពួកគេជ្រើសរើស Rich Text ហើយទទួលបានកូដ HTML រញ៉េរញ៉ៃក្នុង Power Apps។</p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.6); padding: 0.55rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5;">៣. "SharePoint List គ្រាន់តែជា File Excel លើ Cloud ប៉ុណ្ណោះ។"</strong>
                <p style="color: var(--text-muted); margin: 0.1rem 0 0 0;">ពួកគេប្រើប្រាស់វាដូច Excel ហើយធ្វើឱ្យខូចប្រព័ន្ធ multi-user locking។</p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.6); padding: 0.55rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5;">៤. "ដាក់ឈ្មោះ Column ដកឃ្លាដូចជា 'Ticket Number' មិនអីទេ។"</strong>
                <p style="color: var(--text-muted); margin: 0.1rem 0 0 0;">SharePoint បង្កើតឈ្មោះក្នុងកូដយ៉ាងអាក្រក់ដូចជា <code>Ticket_x0020_Number</code>។</p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.6); padding: 0.55rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5;">៥. "Share កម្មវិធី Power App គឺស្វ័យប្រវត្តិចែករំលែក List ដែរហើយ។"</strong>
                <p style="color: var(--text-muted); margin: 0.1rem 0 0 0;">អ្នកប្រើប្រាស់ជួបបញ្ហា Permission Denied ព្រោះភ្លេចផ្តល់សិទ្ធិលើ SharePoint List។</p>
              </div>
            </div>
          </div>

          <div class="card" style="border-left: 4px solid var(--color-primary);">
            <h3 class="card-title" style="color: #5eead4;">ការពិតរបស់ស្ថាបត្យករអាជីព</h3>
            
            <div style="display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.82rem;">
              <div style="background: rgba(15, 23, 42, 0.6); padding: 0.55rem; border-radius: 0.4rem;">
                <strong style="color: #5eead4;">១. ត្រូវតែ Rename Title ទៅជាលេខសម្គាល់ចម្បងរបស់អ្នក។</strong>
                <p style="color: var(--text-muted); margin: 0.1rem 0 0 0;">ប្តូរឈ្មោះវាទៅជា Ticket ID, Asset Tag, ឬ Order Number។</p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.6); padding: 0.55rem; border-radius: 0.4rem;">
                <strong style="color: #5eead4;">២. ត្រូវតែជ្រើសរើស Plain Text សម្រាប់ប្រអប់អត្ថបទវែង។</strong>
                <p style="color: var(--text-muted); margin: 0.1rem 0 0 0;">Plain text ដំណើរការស៊ីសង្វាក់គ្នាយ៉ាងល្អឥតខ្ចោះជាមួយ Power Apps។</p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.6); padding: 0.55rem; border-radius: 0.4rem;">
                <strong style="color: #5eead4;">៣. SharePoint ជាមូលដ្ឋានទិន្នន័យពិតប្រាកដលើ Cloud។</strong>
                <p style="color: var(--text-muted); margin: 0.1rem 0 0 0;">វាគាំទ្រការកត់ត្រាទិន្នន័យពីមនុស្សរាប់រយនាក់ក្នុងពេលតែមួយដោយមិនខូច File។</p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.6); padding: 0.55rem; border-radius: 0.4rem;">
                <strong style="color: #5eead4;">៤. បង្កើតឈ្មោះ Column កុំដកឃ្លា រួចសឹម Rename តាមក្រោយ។</strong>
                <p style="color: var(--text-muted); margin: 0.1rem 0 0 0;">ជួយឱ្យកូដ Power Fx ងាយស្រួលអាន និងគ្មានសញ្ញាចម្លែក។</p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.6); padding: 0.55rem; border-radius: 0.4rem;">
                <strong style="color: #5eead4;">៥. ត្រូវផ្តល់សិទ្ធិលើ SharePoint List ដោយឡែក។</strong>
                <p style="color: var(--text-muted); margin: 0.1rem 0 0 0;">អ្នកប្រើប្រាស់ត្រូវតែមានសិទ្ធិយ៉ាងហោចណាស់ 'Contribute' ឬ 'Edit' លើ List។</p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>សង្កត់ធ្ងន់លើចំណុចទី ៥ ៖</strong> ចំណុចទី ៥ គឺជាមូលហេតុលេខ ១ ដែលកម្មវិធីបរាជ័យពេលដាក់ឱ្យប្រើប្រាស់ដំបូង! សិទ្ធិ Power Apps និងសិទ្ធិ SharePoint List គឺជាកូនសោពីរផ្សេងគ្នាចំពោះទ្វារពីរផ្សេងគ្នា។</p>`
    },

    // Slide 18: Knowledge Check 1
    {
      title: "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង ៖ អថេរ (Variables) ទល់នឹង SharePoint List",
      segment: "ផ្នែកទី ៥ &bull; សំណួរផ្ទៀងផ្ទាត់ ១ នៃ ៥",
      subtitle: "ផ្ទៀងផ្ទាត់ការយល់ដឹងរបស់អ្នកអំពីភាពខុសគ្នារវាង RAM បណ្តោះអាសន្ន និង Cloud អចិន្ត្រៃយ៍។",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ១ &bull; គ្រឹះនៃគំនិត</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                តើអ្វីជាភាពខុសគ្នាជាមូលដ្ឋានរវាងការរក្សាទុកសំបុត្រក្នុង <strong>Variable</strong> របស់ Power Apps ទៅនឹងការបញ្ជូនទៅកាន់ <strong>SharePoint List</strong>?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'A', false, this)">
                  <strong>A.</strong> <span>អថេរអាចទុកបានតែលេខ ចំណែក SharePoint អាចទុកបានតែអត្ថបទ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'B', true, this)">
                  <strong>B.</strong> <span>អថេររស់នៅបណ្តោះអាសន្នក្នុង RAM ចំណែក SharePoint រក្សាទុកជាអចិន្ត្រៃយ៍លើ Cloud សម្រាប់មនុស្សច្រើននាក់</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'C', false, this)">
                  <strong>C.</strong> <span>SharePoint List នឹងលុបទិន្នន័យចោលស្វ័យប្រវត្តិនៅពេលដែលអ្នកប្រើប្រាស់ Log out</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'D', false, this)">
                  <strong>D.</strong> <span>គ្មានអ្វីខុសគ្នាទេ ពួកវាគ្រាន់តែជាឈ្មោះពីរផ្សេងគ្នានៃមុខងារតែមួយ</span>
                </button>
              </div>
            </div>

            <div class="quiz-feedback" id="quiz-feedback-1">
              <div class="feedback-placeholder">
                <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(20, 184, 166, 0.15); border: 1px solid rgba(20, 184, 166, 0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.85rem auto; font-size: 1.5rem; color: #5eead4;">
                  &quest;
                </div>
                <span class="card-badge" style="background: rgba(20, 184, 166, 0.2); color: #5eead4; margin-bottom: 0.65rem;">ស្ថានភាព ៖ កំពុងរង់ចាំចម្លើយ</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-bottom: 0.5rem;">ផ្ទាំងវិភាគស្ថាបត្យកម្មផ្ទាល់</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; max-width: 380px; margin: 0 auto;">
                  សូមជ្រើសរើសចម្លើយ (A, B, C ឬ D) ខាងឆ្វេង ដើម្បីផ្ទៀងផ្ទាត់ចំណេះដឹង និងមើលការពន្យល់ស្ថាបត្យកម្ម។
                </p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-1" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-1">ការយល់ដឹងច្បាស់លាស់!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  ពិតជាត្រឹមត្រូវ! អថេរគឺជាក្រដាសព្រាងបណ្តោះអាសន្នក្នុង RAM នៃឧបករណ៍។ ចំណែក SharePoint List គឺជាមូលដ្ឋានទិន្នន័យសហគ្រាសដ៏រឹងមាំលើ Microsoft Cloud ដែលបុគ្គលិកទាំងអស់អាចចូលប្រើប្រាស់បាន ទោះបីជាបិទបើកកម្មវិធីឡើងវិញក៏ដោយ។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>ធានាថាសិស្សយល់ច្បាស់ពីមូលហេតុដែលចម្លើយ B ត្រឹមត្រូវ។ រំលឹកពីភាពខុសគ្នារវាង RAM និង Cloud។</p>`
    },

    // Slide 19: Knowledge Check 2
    {
      title: "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង ៖ កូឡោនពិសិដ្ឋ 'Title'",
      segment: "ផ្នែកទី ៥ &bull; សំណួរផ្ទៀងផ្ទាត់ ២ នៃ ៥",
      subtitle: "ពិនិត្យមើលការចងចាំរបស់អ្នកអំពីច្បាប់គ្រឹះនៃ SharePoint schema។",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ២ &bull; ច្បាប់រចនាសម្ព័ន្ធ</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                ហេតុអ្វីបានជាអ្នកអភិវឌ្ឍន៍មិនអាចលុបកូឡោនលំនាំដើម <strong>Title</strong> ចោលបាននៅពេលបង្កើត SharePoint List ថ្មី?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'A', false, this)">
                  <strong>A.</strong> <span>ដោយសារ Microsoft គិតថ្លៃ ៥០ ដុល្លារទើបអនុញ្ញាតឱ្យលុប</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'B', false, this)">
                  <strong>B.</strong> <span>ដោយសារ Power Apps Studio នឹងមិនព្រមដំណើរការលើ Windows</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'C', true, this)">
                  <strong>C.</strong> <span>វាជាសសរទ្រូងស្នូលរបស់ប្រព័ន្ធដែលប្រើសម្រាប់ Indexing, ស្វែងរក និងប្រតិបត្តិការមូលដ្ឋានទិន្នន័យ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'D', false, this)">
                  <strong>D.</strong> <span>តាមពិតអាចលុបបាន ដោយគ្រាន់តែចុចសង្កត់លើគ្រាប់ចុច Shift</span>
                </button>
              </div>
            </div>

            <div class="quiz-feedback" id="quiz-feedback-2">
              <div class="feedback-placeholder">
                <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(20, 184, 166, 0.15); border: 1px solid rgba(20, 184, 166, 0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.85rem auto; font-size: 1.5rem; color: #5eead4;">
                  &quest;
                </div>
                <span class="card-badge" style="background: rgba(20, 184, 166, 0.2); color: #5eead4; margin-bottom: 0.65rem;">ស្ថានភាព ៖ កំពុងរង់ចាំចម្លើយ</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-bottom: 0.5rem;">ផ្ទាំងវិភាគស្ថាបត្យកម្មផ្ទាល់</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; max-width: 380px; margin: 0 auto;">
                  សូមជ្រើសរើសចម្លើយ (A, B, C ឬ D) ខាងឆ្វេង ដើម្បីផ្ទៀងផ្ទាត់ចំណេះដឹង និងមើលការពន្យល់ស្ថាបត្យកម្ម។
                </p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-2" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-2">ច្បាប់ SharePoint ត្រូវបានបញ្ជាក់!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  ត្រឹមត្រូវឥតខ្ចោះ! Column ឈ្មោះ Title ត្រូវបានផ្សារភ្ជាប់យ៉ាងរឹងមាំទៅក្នុងស្នូល Database របស់ SharePoint។ កុំព្យាយាមប្រឆាំងនឹងវា ៖ ត្រូវតែ Rename ឈ្មោះបង្ហាញរបស់វាទៅជាលេខកូដចម្បងរបស់អ្នក (ដូចជា Ticket ID ឬ Serial Number)!
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>រំលឹកសិស្សម្តងទៀត៖ អ្នកអភិវឌ្ឍន៍អាជីពមិនប្រឆាំងនឹង Title ទេ គឺគេ Rename វា។</p>`
    },

    // Slide 20: Knowledge Check 3
    {
      title: "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង ៖ កូឡោន Choice ទល់នឹង អត្ថបទសេរី",
      segment: "ផ្នែកទី ៥ &bull; សំណួរផ្ទៀងផ្ទាត់ ៣ នៃ ៥",
      subtitle: "ផ្ទៀងផ្ទាត់ការវិនិច្ឆ័យរបស់អ្នកចំពោះភាពត្រឹមត្រូវនៃទិន្នន័យ និងអភិបាលកិច្ចទិន្នន័យ។",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ៣ &bull; ភាពត្រឹមត្រូវនៃទិន្នន័យ</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                ហេតុអ្វីបានជាព័ត៌មានដូចជា <strong>Department</strong> និង <strong>Urgency Level</strong> គួរកំណត់ជា <strong>Choice</strong> ជាជាង Single Line of Text?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'A', false, this)">
                  <strong>A.</strong> <span>ដោយសារ Column ប្រភេទ Choice ស៊ីទំហំ Cloud តិចជាង</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'B', true, this)">
                  <strong>B.</strong> <span>ដើម្បីកំណត់បញ្ជីជម្រើសត្រួតពិនិត្យ និងកម្ចាត់កំហុសអក្ខរាវិរុទ្ធ និងការបែកខ្ញែកនៃរបាយការណ៍</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'C', false, this)">
                  <strong>C.</strong> <span>ដោយសារ Single Line of Text មិនអាចអានបានលើទូរស័ព្ទដៃ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'D', false, this)">
                  <strong>D.</strong> <span>ដោយសារ Power Apps មិនអាចបង្ហាញប្រអប់ Dropdown បានបើគ្មាន Choice</span>
                </button>
              </div>
            </div>

            <div class="quiz-feedback" id="quiz-feedback-3">
              <div class="feedback-placeholder">
                <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(20, 184, 166, 0.15); border: 1px solid rgba(20, 184, 166, 0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.85rem auto; font-size: 1.5rem; color: #5eead4;">
                  &quest;
                </div>
                <span class="card-badge" style="background: rgba(20, 184, 166, 0.2); color: #5eead4; margin-bottom: 0.65rem;">ស្ថានភាព ៖ កំពុងរង់ចាំចម្លើយ</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-bottom: 0.5rem;">ផ្ទាំងវិភាគស្ថាបត្យកម្មផ្ទាល់</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; max-width: 380px; margin: 0 auto;">
                  សូមជ្រើសរើសចម្លើយ (A, B, C ឬ D) ខាងឆ្វេង ដើម្បីផ្ទៀងផ្ទាត់ចំណេះដឹង និងមើលការពន្យល់ស្ថាបត្យកម្ម។
                </p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-3" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-3">យល់ច្បាស់ពី Data Governance!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  ពិតជាត្រឹមត្រូវ! ការកំណត់បញ្ជីជម្រើសរារាំងមិនឱ្យកម្មករវាយ "Molding", "moulding" និង "moldng" ដោយធានាបាននូវរបាយការណ៍ស្អាត និងការ Filter ដ៏ត្រឹមត្រូវ។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>ភ្ជាប់ទៅកាន់ការបង្កើត Dashboard៖ ទិន្នន័យកខ្វក់ក្នុង Power Apps នឹងបង្កើត Dashboard កខ្វក់ក្នុង Power BI។ Choice columns ការពារគុណភាពទិន្នន័យតាំងពីប្រភព។</p>`
    },

    // Slide 21: Knowledge Check 4
    {
      title: "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង ៖ អន្ទាក់ Rich Text",
      segment: "ផ្នែកទី ៥ &bull; សំណួរផ្ទៀងផ្ទាត់ ៤ នៃ ៥",
      subtitle: "សាកល្បងការយល់ដឹងជាក់ស្តែងរបស់អ្នកអំពីបញ្ហាទម្រង់អត្ថបទឆ្លងកាត់ប្រព័ន្ធ។",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ៤ &bull; អន្ទាក់ជាក់ស្តែង</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                នៅពេលបង្កើត Column ប្រភេទ <strong>Multiple lines of text</strong> សម្រាប់ប្រអប់ពណ៌នាក្នុង Power Apps ហេតុអ្វីបានជាអ្នក <strong>ត្រូវតែ</strong> ជ្រើសរើស <strong>Plain text</strong>?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'A', false, this)">
                  <strong>A.</strong> <span>Plain text ជួយអ៊ិនគ្រីបការពារទិន្នន័យមិនឱ្យ Hacker លួចមើលបាន</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'B', false, this)">
                  <strong>B.</strong> <span>Rich text ធ្វើឱ្យដំណើរការ Tablet យឺតយ៉ាវ ៩០%</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'C', true, this)">
                  <strong>C.</strong> <span>Rich text បង្កប់កូដ HTML (ដូចជា &lt;div&gt;&lt;p&gt;) ដែលធ្វើឱ្យរញ៉េរញ៉ៃដល់ប្រអប់អត្ថបទធម្មតាក្នុង Power Apps</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'D', false, this)">
                  <strong>D.</strong> <span>SharePoint List អនុញ្ញាតឱ្យប្រើ Plain text តែនៅថ្ងៃអង្គារ និងថ្ងៃព្រហស្បតិ៍ប៉ុណ្ណោះ</span>
                </button>
              </div>
            </div>

            <div class="quiz-feedback" id="quiz-feedback-4">
              <div class="feedback-placeholder">
                <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(20, 184, 166, 0.15); border: 1px solid rgba(20, 184, 166, 0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.85rem auto; font-size: 1.5rem; color: #5eead4;">
                  &quest;
                </div>
                <span class="card-badge" style="background: rgba(20, 184, 166, 0.2); color: #5eead4; margin-bottom: 0.65rem;">ស្ថានភាព ៖ កំពុងរង់ចាំចម្លើយ</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-bottom: 0.5rem;">ផ្ទាំងវិភាគស្ថាបត្យកម្មផ្ទាល់</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; max-width: 380px; margin: 0 auto;">
                  សូមជ្រើសរើសចម្លើយ (A, B, C ឬ D) ខាងឆ្វេង ដើម្បីផ្ទៀងផ្ទាត់ចំណេះដឹង និងមើលការពន្យល់ស្ថាបត្យកម្ម។
                </p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-4" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-4">ជៀសផុតពីអន្ទាក់ធំ!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  ឆ្លាតវៃណាស់! Enhanced rich text បង្កប់កូដ HTML ដូចជា <code>&lt;div&gt;&lt;strong&gt;</code> ទៅក្នុងទិន្នន័យសុទ្ធ។ នៅក្នុង Power Apps អ្នកប្រើប្រាស់នឹងឃើញកូដ HTML រញ៉េរញ៉ៃជំនួសឱ្យប្រយោគស្អាត។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>ការបង្ហាញជាក់ស្តែង៖ ប្រាប់សិស្សថាការកែប្រែកូឡោន Rich Text ក្រោយពេលមានទិន្នន័យ ៥០០ ជួរ គឺជាការងារដ៏ឈឺក្បាលបំផុត។ ត្រូវជ្រើសរើស Plain Text តាំងពីថ្ងៃដំបូង!</p>`
    },

    // Slide 22: Knowledge Check 5
    {
      title: "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង ៖ ភាពធន់នៅចំពោះមុខគ្រោះមហន្តរាយ",
      segment: "ផ្នែកទី ៥ &bull; សំណួរផ្ទៀងផ្ទាត់ ៥ នៃ ៥",
      subtitle: "ផ្ទៀងផ្ទាត់ទំនុកចិត្តប្រតិបត្តិការរបស់អ្នកលើស្ថាបត្យកម្ម Enterprise Cloud។",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ៥ &bull; សុវត្ថិភាពទិន្នន័យ</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                កម្មករម្នាក់បានចុច "Submit Request" ដើម្បីបញ្ជូនសំបុត្រទៅកាន់ SharePoint។ ពីរវិនាទីក្រោយមក ថេប្លេតរបស់គាត់បានធ្លាក់ចូលទៅក្នុងធុងទឹកត្រជាក់ ហើយខូចទាំងស្រុង។ តើសំបុត្រនោះបាត់បង់ដែរឬទេ?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(5, 'A', true, this)">
                  <strong>A.</strong> <span>អត់បាត់ទេ! ទិន្នន័យត្រូវបានបញ្ជូនទៅកាន់ Server របស់ Microsoft និងរក្សាទុកដោយសុវត្ថិភាពរួចរាល់ហើយ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(5, 'B', false, this)">
                  <strong>B.</strong> <span>បាត់បង់! ព្រោះទិន្នន័យ SharePoint រស់នៅតែលើ Tablet ដែលបង្កើតវាប៉ុណ្ណោះ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(5, 'C', false, this)">
                  <strong>C.</strong> <span>បាត់បង់ លុះត្រាតែយក Tablet ទៅផ្អាប់ក្នុងអង្ករក្នុងរយៈពេល ២៤ ម៉ោង</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(5, 'D', false, this)">
                  <strong>D.</strong> <span>រក្សាទុកបានតែ Title ប៉ុណ្ណោះ ចំណែកការពណ៌នាបានលិចទឹកជាមួយ Tablet ហើយ</span>
                </button>
              </div>
            </div>

            <div class="quiz-feedback" id="quiz-feedback-5">
              <div class="feedback-placeholder">
                <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(20, 184, 166, 0.15); border: 1px solid rgba(20, 184, 166, 0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.85rem auto; font-size: 1.5rem; color: #5eead4;">
                  &quest;
                </div>
                <span class="card-badge" style="background: rgba(20, 184, 166, 0.2); color: #5eead4; margin-bottom: 0.65rem;">ស្ថានភាព ៖ កំពុងរង់ចាំចម្លើយ</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-bottom: 0.5rem;">ផ្ទាំងវិភាគស្ថាបត្យកម្មផ្ទាល់</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; max-width: 380px; margin: 0 auto;">
                  សូមជ្រើសរើសចម្លើយ (A, B, C ឬ D) ខាងឆ្វេង ដើម្បីផ្ទៀងផ្ទាត់ចំណេះដឹង និងមើលការពន្យល់ស្ថាបត្យកម្ម។
                </p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-5" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-5">ស្ថាបត្យកម្ម Cloud រឹងមាំបំផុត!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  ត្រឹមត្រូវ ១០០%! នៅពេលដែលកញ្ចប់ទិន្នន័យ HTTPS ត្រូវបានទទួលស្គាល់ដោយ SharePoint កំណត់ត្រានោះនឹងរស់នៅយ៉ាងមានសុវត្ថិភាពក្នុង Data Center របស់ Microsoft។ ប្រធានផ្នែកអាចមើលឃើញសំបុត្រនោះលើកុំព្យូទ័ររបស់គាត់ក្នុងរយៈពេលតែ ៥ វិនាទីក្រោយមក!
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p>អបអរសាទរចំពោះការឆ្លើយត្រូវទាំង ៥/៥។ ចង្អុលបង្ហាញថាសំណួរនេះផ្ទុយស្រឡះពីវិបត្តិលើស្លាយទី ៥ ដែលអថេរត្រូវរលុបបាត់។</p>`
    },

    // Slide 23: Final Capstone Challenge: Equipment Preventive Maintenance Log
    {
      title: "កិច្ចការបញ្ជាក់សមត្ថភាពចុងក្រោយ ៖ តារាងបញ្ជីម៉ាស៊ីនផលិតកម្ម",
      segment: "ផ្នែកទី ៥ &bull; អនុវត្តដោយឯករាជ្យ",
      subtitle: "អនុវត្តជំនាញរបស់អ្នកដោយឯករាជ្យ ៖ រៀបចំប្លង់បញ្ជីមេសម្រាប់ម៉ាស៊ីនក្នុងរោងចក្រ។",
      content: `<div class="card">
            <h3 class="card-title">សង្ខេបបេសកកម្មប្រឡងសមត្ថភាព</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 0.75rem;">
              រោងចក្រ Apex Plastics ត្រូវការបញ្ជីទីពីរឈ្មោះថា <code>Apex_Equipment_Registry</code> ដើម្បីកត់ត្រារាល់ម៉ាស៊ីនទាំងអស់លើផ្ទៃរោងចក្រ។
            </p>

            <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-subtle); border-radius: 0.5rem; padding: 0.85rem; font-size: 0.82rem; line-height: 1.6;">
              <strong style="color: #5eead4;">តម្រូវការ Columns ដែលត្រូវបង្កើត ៖</strong>
              <ol style="color: var(--text-main); padding-left: 1.2rem; margin-top: 0.35rem;">
                <li>Rename <code>Title</code> &rarr; <code>EquipmentID</code> (Single line of text)</li>
                <li><code>MachineName</code> (Single line of text)</li>
                <li><code>Department</code> (Choice: Molding, Extrusion, Packaging)</li>
                <li><code>InstallationDate</code> (Date and Time, Date Only)</li>
                <li><code>IsOperational</code> (Yes/No, Default: Yes)</li>
              </ol>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">លក្ខណៈវិនិច្ឆ័យវាយតម្លៃ និងតេស្តជោគជ័យ</h3>
            <div style="background: rgba(20, 184, 166, 0.1); border: 1px solid rgba(20, 184, 166, 0.3); border-radius: 0.5rem; padding: 1rem; margin-bottom: 1rem;">
              <strong style="color: #5eead4; font-size: 0.88rem;">តេស្តផ្ទៀងផ្ទាត់ ៖</strong>
              <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.3rem 0 0 0; line-height: 1.5;">
                បន្ទាប់ពីបង្កើត List រួច សូមបញ្ចូលម៉ាស៊ីនសាកល្បងមួយ ៖ <code>EQ-201</code>, "Injection Molder 300T", Molding, Today, Yes។ បង្ហាញអេក្រង់នេះទៅកាន់គ្រូដើម្បីទទួលបានការបញ្ជាក់!
              </p>
            </div>
            <p style="color: var(--text-dim); font-size: 0.8rem; line-height: 1.5;">
              កិច្ចការនេះបញ្ជាក់ថាអ្នកបានយល់ច្បាស់ ១០០% អំពីការបង្កើត SharePoint Lists និងត្រៀមខ្លួនជាស្រេចសម្រាប់ការភ្ជាប់ App នៅថ្ងៃស្អែក!
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>ការវាយតម្លៃឯករាជ្យ (៨ នាទី) ៖</strong> ទុកពេលឱ្យសិស្សបង្កើត List នេះដោយខ្លួនឯង ដោយមិនចាំបាច់មានការជួយពីគ្រូ។ នេះជាការវាស់ស្ទង់សមត្ថភាពពិតប្រាកដ។</p>`
    },

    // Slide 24: Bridge Forward to Day 20
    {
      title: "ស្ពានចម្លងទៅកាន់ថ្ងៃទី ២០ ៖ ការតភ្ជាប់ Power Apps ទៅកាន់ SharePoint",
      segment: "ផ្នែកទី ៦ &bull; ត្រៀមសម្រាប់ថ្ងៃស្អែក",
      subtitle: "ការតភ្ជាប់ផ្ទាល់រវាងទម្រង់អេក្រង់ និងមូលដ្ឋានទិន្នន័យពិតប្រាកដ (Live Connection)។",
      content: `<div class="card" style="border-color: #14b8a6; box-shadow: 0 0 25px rgba(20, 184, 166, 0.2);">
            <div class="card-badge" style="background: rgba(20, 184, 166, 0.25); color: #5eead4;">ថ្ងៃនេះ ៖ ថ្ងៃទី ១៩ បានបញ្ចប់</div>
            <h3 class="card-title" style="color: #5eead4;">ឃ្លាំងទិន្នន័យអចិន្ត្រៃយ៍ត្រូវបានរៀបចំរួចរាល់</h3>
            <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin-bottom: 0.75rem;">
              ថ្ងៃនេះ អ្នកបានបង្កើតគ្រឹះទិន្នន័យសហគ្រាសដ៏រឹងមាំមួយ ៖
            </p>
            <ul style="color: #5eead4; font-size: 0.82rem; padding-left: 1.2rem; line-height: 1.6;">
              <li>យល់ច្បាស់ពីភាពខុសគ្នារវាង RAM និង Cloud Storage។</li>
              <li>ចេះ Rename កូឡោន Title ទៅជា Primary ID។</li>
              <li>ការពារគុណភាពទិន្នន័យដោយប្រើ Choice Columns។</li>
              <li>បង្កើត List <code>Apex_Maintenance_Requests</code> លើ Cloud។</li>
            </ul>
          </div>

          <div class="card" style="border-color: var(--color-cyan); box-shadow: 0 0 25px rgba(6, 182, 212, 0.2);">
            <div class="card-badge" style="background: rgba(6, 182, 212, 0.25); color: #67e8f9;">បន្ទាប់ ៖ ថ្ងៃទី ២០ (ស្អែក)</div>
            <h3 class="card-title" style="color: #67e8f9;">ការតភ្ជាប់ App ទៅកាន់ SharePoint</h3>
            <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin-bottom: 0.75rem;">
              ឥឡូវនេះយើងមាន App អេក្រង់ (ថ្ងៃទី ១៤-១៨) និងឃ្លាំងទិន្នន័យ (ថ្ងៃទី ១៩)។ តើយើងភ្ជាប់ពួកវាដោយរបៀបណា?
            </p>
            <ul style="color: #67e8f9; font-size: 0.82rem; padding-left: 1.2rem; line-height: 1.6;">
              <li>បន្ថែម SharePoint ជា Data Source ក្នុង Power Apps Studio។</li>
              <li>យល់ដឹងពី Connector Permissions និង Single Sign-On។</li>
              <li>រៀបចំ App ឱ្យមើលឃើញ Columns របស់ SharePoint។</li>
              <li>ត្រៀមខ្លួនសម្រាប់អនុគមន៍ <code>Patch()</code> និង <code>SubmitForm()</code>!</li>
            </ul>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក៖</h4>
<p><strong>ពាក្យបិទបញ្ចប់ (១ នាទី) ៖</strong> "សូមអបអរសាទរចំពោះការបញ្ចប់ថ្ងៃទី ១៩! ថ្ងៃនេះអ្នកបានឈានជើងចេញពីការគ្រាន់តែជាអ្នករៀបចំអេក្រង់ មកជាស្ថាបត្យករប្រព័ន្ធទិន្នន័យពិតប្រាកដ។ ជួបគ្នានៅថ្ងៃស្អែកដើម្បីភ្ជាប់ប្រព័ន្ធទាំងពីរចូលគ្នា!"</p>`
    }
  ];

  // --------------------------------------------------------------------------
  // 3. CAPTURE ENGLISH ORIGINAL CONTENT FOR SEAMLESS 1-TO-1 TOGGLING
  // --------------------------------------------------------------------------
  let ENGLISH_SLIDES = [];

  function captureEnglishOriginals() {
    ENGLISH_SLIDES = slides.map((slide) => {
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
  // 4. NAVIGATION ENGINE
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
  // 5. BILINGUAL TOGGLE ENGINE (ZERO LAYOUT SHIFT - DIRECT INNER INJECTION)
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
  // 7. PRESENTER LASER & SHOCKWAVE SPOTLIGHT
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
  // 8. TRAINER NOTES DRAWER (EXCLUSIVELY IN DRAWER - NEVER ON SLIDE STAGE)
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
  // 9. OVERVIEW MODAL
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
  // 10. INTERACTIVE WIDGETS & QUIZ CONTROLLER
  // --------------------------------------------------------------------------
  window.toggleFlipCard = function (cardElement) {
    cardElement.classList.toggle('flipped');
  };

  function bindInteractiveWidgets() {
    // Re-bind Slide 13 Mapping Inspector Buttons
    const fieldBtns = document.querySelectorAll('.mapping-field-btn');
    fieldBtns.forEach(btn => {
      const onclickAttr = btn.getAttribute('onclick');
      if (onclickAttr && onclickAttr.includes('ticket')) btn.onclick = () => window.inspectField('ticket');
      if (onclickAttr && onclickAttr.includes('dept')) btn.onclick = () => window.inspectField('dept');
      if (onclickAttr && onclickAttr.includes('shift')) btn.onclick = () => window.inspectField('shift');
      if (onclickAttr && onclickAttr.includes('desc')) btn.onclick = () => window.inspectField('desc');
      if (onclickAttr && onclickAttr.includes('urgency')) btn.onclick = () => window.inspectField('urgency');
      if (onclickAttr && onclickAttr.includes('date')) btn.onclick = () => window.inspectField('date');
    });
  }

  // WIDGET 1: Slide 13 Mapping Inspector
  window.inspectField = function (fieldKey) {
    const allBtns = document.querySelectorAll('.mapping-field-btn');
    allBtns.forEach(btn => btn.classList.remove('active'));

    const clickedBtn = event ? event.currentTarget : null;
    if (clickedBtn) clickedBtn.classList.add('active');

    const titleEl = document.getElementById('inspector-field-title');
    const badgeEl = document.getElementById('inspector-type-badge');
    const settingsEl = document.getElementById('inspector-settings');
    const uimatchEl = document.getElementById('inspector-uimatch');
    const disasterEl = document.getElementById('inspector-disaster');

    if (!titleEl || !badgeEl || !settingsEl || !uimatchEl || !disasterEl) return;

    const dataMap = {
      ticket: {
        title: isKhmerActive ? "Field ៖ Ticket ID" : "Field: Ticket ID",
        badge: isKhmerActive ? "Single line of text (Title)" : "Single line of text (Title)",
        settings: isKhmerActive
          ? "Column ៖ ប្តូរឈ្មោះពី <code>Title</code> មកជា \"Ticket ID\"។<br>ទាមទារ ៖ បាទ/ចាស &bull; ប្រវែងអតិបរមា ៖ ២៥៥ តួ &bull; Unique ៖ ណែនាំឱ្យបើក។"
          : "Column: Built-in <code>Title</code> renamed to \"Ticket ID\".<br>Required: Yes &bull; Max Length: 255 chars &bull; Unique values: Recommended.",
        uimatch: isKhmerActive
          ? "ត្រូវគ្នានឹង ៖ <code>TextInput</code> control ឬរូបមន្តបង្កើតលេខកូដស្វ័យប្រវត្តិ (ឧ. \"TKT-\" & Text(RandBetween(1000,9999)))។"
          : "Matches: <code>TextInput</code> control or automated formula generator (e.g., \"TKT-\" & Text(RandBetween(1000,9999))).",
        disaster: isKhmerActive
          ? "ទប់ស្កាត់កុំឱ្យកើតមានកំណត់ត្រាកំព្រាដែលគ្មានអត្តសញ្ញាណ។ ក្នុងកំណត់ត្រាឧស្សាហកម្ម រាល់សំបុត្រទាំងអស់ត្រូវតែមានលេខកូដច្បាស់លាស់ដើម្បីតាមដានឆ្លងវេនការងារ។"
          : "Prevents unidentifiable \"orphan records\". In any manufacturing incident log, every ticket must have a distinct identifier so managers can track maintenance resolution across shifts."
      },
      dept: {
        title: isKhmerActive ? "Field ៖ Department" : "Field: Department",
        badge: isKhmerActive ? "Choice (បញ្ជីជម្រើស)" : "Choice (Single Selection)",
        settings: isKhmerActive
          ? "Choices ៖ Molding, Extrusion, Packaging, Quality, Maintenance។<br>ទាមទារ ៖ បាទ/ចាស &bull; Allow multiple ៖ បិទ (No)។"
          : "Choices: Molding, Extrusion, Packaging, Quality, Maintenance.<br>Required: Yes &bull; Allow multiple selections: Off.",
        uimatch: isKhmerActive
          ? "ត្រូវគ្នានឹង ៖ <code>Dropdown</code> ឬ <code>ComboBox</code> control ដោយកំណត់ Items មកពី Choices([@Apex_Maintenance_Requests].Department)។"
          : "Matches: <code>Dropdown</code> or <code>ComboBox</code> control with Items populated via Choices([@Apex_Maintenance_Requests].Department).",
        disaster: isKhmerActive
          ? "កម្ចាត់ភាពរញ៉េរញ៉ៃនៃអក្ខរាវិរុទ្ធ (ដូចជា 'Molding', 'moulding', 'mold') ដែលបំផ្លាញការ Filter និងរបាយការណ៍ Dashboard ក្នុង Power BI។"
          : "Eliminates spelling variants (like 'Molding', 'moulding', 'mold') that fragment incident reporting and break management triage filters."
      },
      shift: {
        title: isKhmerActive ? "Field ៖ Operating Shift" : "Field: Operating Shift",
        badge: isKhmerActive ? "Choice (បញ្ជីជម្រើស)" : "Choice (Single Selection)",
        settings: isKhmerActive
          ? "Choices ៖ Shift A (Morning), Shift B (Evening), Weekend។<br>ទាមទារ ៖ បាទ/ចាស &bull; លំនាំដើម ៖ Shift A។"
          : "Choices: Shift A (Morning), Shift B (Evening), Weekend.<br>Required: Yes &bull; Default value: Shift A.",
        uimatch: isKhmerActive
          ? "ត្រូវគ្នានឹង ៖ <code>Radio</code> group ឬ <code>Dropdown</code> control។"
          : "Matches: <code>Radio</code> group or horizontal compact <code>Dropdown</code> control.",
        disaster: isKhmerActive
          ? "ទប់ស្កាត់ការប្រកែកគ្នាឆ្លងវេនការងារ។ ធានាថារាល់ការខូចម៉ាស៊ីនត្រូវបានកត់ត្រាច្បាស់លាស់ថាបានកើតឡើងក្នុងវេនការងារណាពិតប្រាកដ។"
          : "Prevents cross-shift dispute. Guarantees that every maintenance issue is permanently attributed to the exact operating crew on duty."
      },
      desc: {
        title: isKhmerActive ? "Field ៖ Problem Description" : "Field: Problem Description",
        badge: isKhmerActive ? "Multiple lines of text (Plain Text)" : "Multiple lines of text (Plain Text)",
        settings: isKhmerActive
          ? "Type ៖ Plain text សុទ្ធ &bull; ទាមទារ ៖ បាទ/ចាស &bull; កម្រិតបន្ទាត់ ៖ ៦ បន្ទាត់។<br><strong style=\"color:#fca5a5;\">ហាមដាច់ខាតកុំប្រើ Enhanced Rich Text!</strong>"
          : "Type: Plain text &bull; Required: Yes &bull; Number of lines: 6.<br><strong style=\"color:#fca5a5;\">CRITICAL: Never choose Enhanced Rich Text!</strong>",
        uimatch: isKhmerActive
          ? "ត្រូវគ្នានឹង ៖ <code>TextInput</code> control ដោយកំណត់ Mode ជា <code>TextMode.MultiLine</code>។"
          : "Matches: <code>TextInput</code> control configured with Mode = <code>TextMode.MultiLine</code>.",
        disaster: isKhmerActive
          ? "ជៀសផុតពីការបង្កប់កូដ HTML ដូចជា <code>&lt;div&gt;&lt;strong&gt;</code> ចូលទៅក្នុងប្រអប់អត្ថបទធម្មតារបស់ Power Apps ដែលធ្វើឱ្យអ្នកប្រើប្រាស់ធុញថប់។"
          : "Prevents nasty HTML markup tags (like <code>&lt;div&gt;&lt;span&gt;</code>) from polluting Power Apps text controls."
      },
      urgency: {
        title: isKhmerActive ? "Field ៖ Urgency Level" : "Field: Urgency Level",
        badge: isKhmerActive ? "Choice (បញ្ជីជម្រើស)" : "Choice (Triage Indicator)",
        settings: isKhmerActive
          ? "Choices ៖ Low, Medium, High, Critical។<br>ទាមទារ ៖ បាទ/ចាស &bull; លំនាំដើម ៖ Medium។"
          : "Choices: Low, Medium, High, Critical.<br>Required: Yes &bull; Default: Medium.",
        uimatch: isKhmerActive
          ? "ត្រូវគ្នានឹង ៖ <code>Dropdown</code> control ជាមួយរូបមន្តកំណត់ពណ៌ស្វ័យប្រវត្តិតាមកម្រិតបន្ទាន់។"
          : "Matches: <code>Dropdown</code> control with color-coded warning chips in Power Apps UI.",
        disaster: isKhmerActive
          ? "ទប់ស្កាត់ការយឺតយ៉ាវក្នុងការសង្គ្រោះម៉ាស៊ីន។ សំបុត្រ Critical នឹងត្រូវបានបន្លឺសំឡេងព្រមាន និងបញ្ជូនភ្លាមៗទៅកាន់ក្រុមជាង។"
          : "Prevents catastrophic plant downtime. Ensures Critical breakdown alerts trigger immediate supervisor escalation."
      },
      date: {
        title: isKhmerActive ? "Field ៖ Reported Date" : "Field: Reported Date",
        badge: isKhmerActive ? "Date and Time (Date Only)" : "Date and Time (Date Only)",
        settings: isKhmerActive
          ? "Format ៖ Date Only &bull; លំនាំដើម ៖ Today's Date (ថ្ងៃនេះ)។"
          : "Format: Date Only &bull; Default value: Today's date.",
        uimatch: isKhmerActive
          ? "ត្រូវគ្នានឹង ៖ <code>DatePicker</code> control ឬអនុគមន៍ស្វ័យប្រវត្តិ <code>Today()</code>។"
          : "Matches: <code>DatePicker</code> control or automated formula <code>Today()</code>.",
        disaster: isKhmerActive
          ? "កម្ចាត់ការបញ្ចូលកាលបរិច្ឆេទខុសស្តង់ដារ (ដូចជា 12/05 vs 05/12) ដែលធ្វើឱ្យការគណនារយៈពេលជួសជុល (MTTR) ខុសទាំងស្រុង។"
          : "Eliminates ambiguous text formats (like 05/12 vs 12/05) that corrupt Mean Time To Repair (MTTR) analytics."
      }
    };

    const target = dataMap[fieldKey];
    if (!target) return;

    titleEl.textContent = target.title;
    badgeEl.textContent = target.badge;
    settingsEl.innerHTML = target.settings;
    uimatchEl.innerHTML = target.uimatch;
    disasterEl.textContent = target.disaster;
  };

  // WIDGET 2: Slide 16 Live Data Vault Simulator
  window.submitToVault = function () {
    const idInput = document.getElementById('vault-input-id');
    const deptSelect = document.getElementById('vault-input-dept');
    const urgencySelect = document.getElementById('vault-input-urgency');
    const descInput = document.getElementById('vault-input-desc');
    const tbody = document.getElementById('vault-tbody');
    const toastBanner = document.getElementById('vault-toast-banner');
    const toastMsg = document.getElementById('vault-toast-msg');

    if (!idInput || !deptSelect || !urgencySelect || !descInput || !tbody) return;

    const idVal = idInput.value.trim() || 'TKT-' + Math.floor(1000 + Math.random() * 9000);
    const deptVal = deptSelect.value;
    const urgencyVal = urgencySelect.value;
    const descVal = descInput.value.trim() || 'General maintenance check';

    const urgencyColors = {
      Critical: 'background: rgba(239, 68, 68, 0.2); color: #fca5a5;',
      High: 'background: rgba(245, 158, 11, 0.2); color: #fde68a;',
      Medium: 'background: rgba(59, 130, 246, 0.2); color: #93c5fd;',
      Low: 'background: rgba(16, 185, 129, 0.2); color: #86efac;'
    };

    const newRow = document.createElement('tr');
    newRow.style.animation = 'fadeIn 0.4s ease';
    newRow.innerHTML = `
      <td><strong style="color: #5eead4;">${idVal}</strong></td>
      <td>${deptVal}</td>
      <td><span class="sp-pill" style="${urgencyColors[urgencyVal] || ''}">${urgencyVal}</span></td>
      <td>${descVal}</td>
      <td><span class="sp-pill" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">New</span></td>
      <td>Just now</td>
      <td><span class="sp-pill" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">Safe in Cloud</span></td>
    `;

    tbody.insertBefore(newRow, tbody.firstChild);

    if (toastBanner) {
      toastBanner.style.display = 'flex';
      if (toastMsg) {
        toastMsg.textContent = isKhmerActive
          ? `សំបុត្រ ${idVal} ត្រូវបានកត់ត្រាទុកក្នុង SharePoint List Vault!`
          : `Record ${idVal} successfully committed to SharePoint List vault!`;
      }
      setTimeout(() => {
        toastBanner.style.display = 'none';
      }, 5000);
    }

    idInput.value = 'TKT-' + Math.floor(1000 + Math.random() * 9000);
  };

  window.simulateAppRestart = function () {
    const banner = document.getElementById('vault-toast-banner');
    const msg = document.getElementById('vault-toast-msg');

    if (banner && msg) {
      banner.style.display = 'flex';
      banner.style.background = 'rgba(245, 158, 11, 0.2)';
      banner.style.borderColor = '#f59e0b';
      msg.textContent = isKhmerActive
        ? 'ថេប្លេតត្រូវបានបិទបើកឡើងវិញ! RAM ត្រូវបានសម្អាត ប៉ុន្តែទិន្នន័យក្នុង SharePoint នៅតែមានសុវត្ថិភាព ១០០%!'
        : 'App Restarted! Tablet RAM was completely purged, but SharePoint cloud data remains 100% INTACT!';

      setTimeout(() => {
        banner.style.display = 'none';
        banner.style.background = 'rgba(13, 148, 136, 0.2)';
        banner.style.borderColor = '#14b8a6';
      }, 6000);
    }
  };

  window.resetVaultDemo = function () {
    const tbody = document.getElementById('vault-tbody');
    if (!tbody) return;

    tbody.innerHTML = `
      <tr>
        <td><strong style="color: #5eead4;">TKT-1001</strong></td>
        <td>Molding</td>
        <td><span class="sp-pill" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">Critical</span></td>
        <td>Extruder heater band blown on Line 2</td>
        <td><span class="sp-pill" style="background: rgba(245, 158, 11, 0.2); color: #fde68a;">In Progress</span></td>
        <td>Today, 08:30 AM</td>
        <td><span class="sp-pill" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">Safe in Cloud</span></td>
      </tr>
      <tr>
        <td><strong style="color: #5eead4;">TKT-1002</strong></td>
        <td>Packaging</td>
        <td><span class="sp-pill" style="background: rgba(245, 158, 11, 0.2); color: #fde68a;">Medium</span></td>
        <td>Conveyor belt sensor dirty, false jam alarms</td>
        <td><span class="sp-pill" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">Resolved</span></td>
        <td>Today, 09:15 AM</td>
        <td><span class="sp-pill" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">Safe in Cloud</span></td>
      </tr>
    `;
  };

  // QUIZZES: Slides 18 - 22 Answer Controller
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
          statusTitle.textContent = isKhmerActive ? 'ការយល់ដឹងច្បាស់លាស់!' : 'Mastery Demonstrated!';
          statusTitle.style.color = '#86efac';
        }
      } else {
        if (badge) {
          badge.textContent = isKhmerActive ? 'មិនទាន់ត្រឹមត្រូវ' : 'Incorrect';
          badge.style.background = 'rgba(239, 68, 68, 0.2)';
          badge.style.color = '#fca5a5';
        }
        if (statusTitle) {
          statusTitle.textContent = isKhmerActive ? 'សូមពិនិត្យច្បាប់ឡើងវិញ ៖' : 'Review The Rule:';
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

    console.log('Day 19 Presentation loaded successfully (Lesson 14 Exact Architecture)!');
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
