/* ============================================================================
   POWER APPS FOUNDATION: DAY 20 PRESENTATION ENGINE
   Topic: Connect Power Apps to SharePoint
   Phase: Phase 7: SharePoint Integration
   Theme: Microsoft Fluent 2 Dark Mode (SharePoint Emerald Teal & Industrial Glass)
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
      title: "ភ្ជាប់ Power Apps ទៅកាន់ SharePoint",
      segment: "ដំណាក់កាលទី ៧ ៖ ការរួមបញ្ចូលជាមួយ SharePoint",
      subtitle: "ប៊ូតុង និងប្រអប់អត្ថបទនៅលើកញ្ចក់ទូរស័ព្ទមិនអាចបញ្ជូនទិន្នន័យទៅកាន់ Cloud ដោយខ្លួនឯងបានទេ។ ថ្ងៃនេះយើងនឹងសាងសង់ស្ពានតភ្ជាប់ស្ថាបត្យកម្ម ៖ បន្ថែមប្រភពទិន្នន័យ SharePoint ដើម្បីឱ្យ Controls អាចអាន បង្ហាញ និងកែប្រែកំណត់ត្រាអាជីវកម្មជាក់ស្តែង។",
      content: `<div class="hero-badge">
            <span>គ្រឹះវិជ្ជាជីវៈ Microsoft Power Apps</span>
            <span>&bull;</span>
            <span>ថ្ងៃទី ២០ នៃ ២៧</span>
          </div>
          <h1 class="hero-title">ភ្ជាប់ Power Apps ទៅកាន់ SharePoint</h1>
          <p class="hero-subtitle">
            ប៊ូតុង និងប្រអប់អត្ថបទនៅលើកញ្ចក់ទូរស័ព្ទមិនអាចបញ្ជូនទិន្នន័យទៅកាន់ Cloud ដោយខ្លួនឯងបានទេ។ ថ្ងៃនេះយើងនឹងសាងសង់ស្ពានតភ្ជាប់ស្ថាបត្យកម្ម ៖ បន្ថែមប្រភពទិន្នន័យ SharePoint ដើម្បីឱ្យ Controls អាចអាន បង្ហាញ និងកែប្រែកំណត់ត្រាអាជីវកម្មជាក់ស្តែង។
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
            <span class="chain-item active">ការផ្ទុកទិន្នន័យ [បានភ្ជាប់]</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ការឆ្លើយតប</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ការធ្វើតេស្ត</span>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការបើកមេរៀន (២ នាទី) ៖</strong> សូមស្វាគមន៍មកកាន់ថ្ងៃទី ២០! រយៈពេលប៉ុន្មានសប្តាហ៍មកនេះ អ្នកបានរៀនបង្កើតអេក្រង់ និងរូបមន្តយ៉ាងស្ទាត់ជំនាញ។ កាលពីម្សិលមិញ អ្នកបានបង្កើត SharePoint List មួយយ៉ាងត្រឹមត្រូវ។ ប៉ុន្តែពេលនេះ វាប្រៀបដូចជាមនុស្សចម្លែកពីរនាក់នៅក្នុងបន្ទប់ផ្សេងគ្នាដែលមិនដែលស្គាល់គ្នា។ ថ្ងៃនេះ យើងនឹងណែនាំពួកគេឱ្យស្គាល់គ្នា។</p>`
    },

    // Slide 2: Agenda & Objectives
    {
      title: "របៀបវារៈ ៩០ នាទី និងគោលបំណងរំពឹងទុកជាក់ស្តែង",
      segment: "ផ្នែកទី ១ &bull; ផែនការមេរៀន និងកាលវិភាគ",
      subtitle: "ដំណើរការរៀនជាវង់តំរៀប (Spiral Learning) ពីការយល់ដឹងអំពីបំពង់ទឹកជាក់ស្តែង រហូតដល់ការតភ្ជាប់ទិន្នន័យពពកផ្ទាល់ដៃ។",
      content: `<div class="card">
            <h3 class="card-title">៤ គោលបំណងរំពឹងទុកជាក់ស្តែង</h3>
            <div class="objective-item">
              <span class="obj-num">1</span>
              <div>
                <strong>ស្វែងរកផ្ទាំងទិន្នន័យក្នុង Studio ៖</strong>
                <p>ចុចលើរូបតំណាងស៊ីឡាំងទិន្នន័យ (Data Icon) នៅលើរបារខាងឆ្វេង ហើយស្វែងរក SharePoint Connector ដោយស្ទាត់ជំនាញ។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">2</span>
              <div>
                <strong>ជ្រើសរើស Site និងផ្តល់សិទ្ធិភ្ជាប់ ៖</strong>
                <p>ជ្រើសរើស Team Site របស់រោងចក្រ ផ្ទៀងផ្ទាត់សិទ្ធិសុវត្ថិភាពតាម Entra ID (SSO) និងជ្រើសយក <code>Apex_Maintenance_Requests</code>។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">3</span>
              <div>
                <strong>ផ្ទៀងផ្ទាត់ Data Source ក្នុង IntelliSense ៖</strong>
                <p>វាយឈ្មោះ List ក្នុងរបាររូបមន្ត ហើយបញ្ជាក់ថា Power Fx ទទួលស្គាល់វាជាតារាងទិន្នន័យពិតប្រាកដ។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">4</span>
              <div>
                <strong>ធ្វើរោគវិនិច្ឆ័យការតភ្ជាប់ (Diagnostics) ៖</strong>
                <p>ប្រើប្រាស់ម៉ឺនុយ Data Source ដើម្បី Refresh ទិន្នន័យ មើលទិន្នន័យផ្ទាល់ និងដោះស្រាយបញ្ហាព្រមានកូដពណ៌លឿង។</p>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">កាលវិភាគលម្អិត ៩០ នាទី</h3>
            <div class="agenda-timeline">
              <div class="agenda-row">
                <span class="agenda-time">០០ - ១០ នាទី</span>
                <div><strong>រំលឹកចំណេះដឹង និងគំរូផ្នត់គំនិត ៖</strong> រំលឹកថ្ងៃ ១១, ១៦, ១៨, ១៩ និងវិបត្តិ "មនុស្សចម្លែកពីរនាក់"។</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time">១០ - ២៥ នាទី</span>
                <div><strong>ការប្រៀបធៀបក្នុងជីវិតជាក់ស្តែង ៖</strong> ក្បាលរ៉ូប៊ីណេទឹក អាងស្តុកទឹក និងបំពង់ស្ពាន់។</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time">២៥ - ៤០ នាទី</span>
                <div><strong>ការបង្ហាញស្ថាបត្យកម្មផ្ទាល់ ៖</strong> របារទិន្នន័យ Studio, សិទ្ធិ SSO និងការត្រួតពិនិត្យ Schema។</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time">៤០ - ៦៥ នាទី</span>
                <div><strong>ការអនុវត្តផ្ទាល់ដៃក្រោមការណែនាំ ៖</strong> ភ្ជាប់ SharePoint List និងធ្វើតេស្ត IntelliSense។</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time">៦៥ - ៨០ នាទី</span>
                <div><strong>ការធ្វើរោគវិនិច្ឆ័យ និងកែតម្រូវការយល់ច្រឡំ ៖</strong> ការ Refresh Schema និងបកស្រាយការយល់ច្រឡំ។</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time">៨០ - ៩០ នាទី</span>
                <div><strong>សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង និងស្ពានឆ្ពោះទៅមុខ ៖</strong> ៥ សំណួរ និងការត្រៀមខ្លួនសម្រាប់ Gallery ថ្ងៃទី ២១។</div>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>បញ្ជាក់ការរំពឹងទុក ៖</strong> ថ្ងៃនេះមិនមែនជាការសរសេរកូដរាប់សិបជួរទេ ប៉ុន្តែជាការកសាងទំនុកចិត្តរវាងសេវាកម្ម Microsoft Cloud ទាំងពីរ។ បើស្ពាននេះរឹងមាំ នោះមេរៀនថ្ងៃទី ២១ ដល់ ២៧ នឹងដំណើរការយ៉ាងរលូន។</p>`
    },

    // Slide 3: Concept Map Continuity
    {
      title: "ដំណើររឿងបន្តបន្ទាប់នៃកម្មវិធីសិក្សា ២៧ ថ្ងៃ",
      segment: "ផ្នែកទី ១ &bull; ភាពបន្តគ្នានៃកម្មវិធីសិក្សា",
      subtitle: "មេរៀននីមួយៗបង្កើតឡើងដោយពឹងផ្អែកលើលទ្ធផលពីម្សិលមិញ ដើម្បីត្រួសត្រាយផ្លូវសម្រាប់ថ្ងៃស្អែក។",
      content: `<div class="card" style="border-left: 3px solid #3b82f6;">
            <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">ថ្ងៃទី ១៩ ៖ កាលពីម្សិលមិញ</span>
            <h3 class="card-title">ទិន្នន័យអាជីវកម្មអចិន្ត្រៃយ៍</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">
              យើងបានរចនា និងបង្កើត SharePoint List ឈ្មោះ <code>Apex_Maintenance_Requests</code> ដែលមានជួរឈរច្បាស់លាស់ (Single line text, Choice, Number, Date, Person)។ ទិន្នន័យត្រូវបានរក្សាទុកដោយសុវត្ថិភាពលើ Microsoft Cloud។
            </p>
            <div style="margin-top: auto; padding-top: 1rem; color: #60a5fa; font-weight: 600; font-size: 0.85rem;">
              &check; រចនាសម្ព័ន្ធ Schema រួចរាល់រង់ចាំការភ្ជាប់
            </div>
          </div>

          <div class="card" style="border-left: 3px solid var(--color-primary-light); background: rgba(20, 184, 166, 0.1);">
            <span class="card-badge" style="background: rgba(20, 184, 166, 0.25); color: #5eead4;">ថ្ងៃទី ២០ ៖ ថ្ងៃនេះ</span>
            <h3 class="card-title">ភ្ជាប់ Power Apps ទៅកាន់ SharePoint</h3>
            <p style="color: var(--text-main); font-size: 0.9rem; line-height: 1.6;">
              យើងសាងសង់បំពង់បង្ហូរទិន្នន័យផ្ទាល់។ យើងបើក Power Apps Studio បន្ថែម SharePoint Connector ផ្ទៀងផ្ទាត់តាម Entra ID និងភ្ជាប់ List ឱ្យក្លាយជា Data Source សកម្មក្នុងម៉ាស៊ីនកម្មវិធី។
            </p>
            <div style="margin-top: auto; padding-top: 1rem; color: #5eead4; font-weight: 700; font-size: 0.85rem;">
              &bull; បង្កើតស្ពានទិន្នន័យផ្ទាល់
            </div>
          </div>

          <div class="card" style="border-left: 3px solid #8b5cf6;">
            <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc;">ថ្ងៃទី ២១ ៖ ថ្ងៃស្អែក</span>
            <h3 class="card-title">បង្ហាញកំណត់ត្រាច្រើន ៖ Galleries</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">
              ពេលបំពង់បង្ហូរទឹកបើកហើយ យើងត្រូវការធុងដើម្បីបង្ហាញជួរទាំងអស់! ថ្ងៃស្អែកយើងនឹងបន្ថែម Gallery Control ដែលមាន property <code>Items</code> ស្មើនឹង <code>Apex_Maintenance_Requests</code>។
            </p>
            <div style="margin-top: auto; padding-top: 1rem; color: #c084fc; font-weight: 600; font-size: 0.85rem;">
              &rarr; បង្ហាញជួរទិន្នន័យទាំងអស់លើអេក្រង់
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>សង្កត់ធ្ងន់លើខ្សែសង្វាក់ ៖</strong> អ្នកមិនអាចបង្កើត Gallery នៅថ្ងៃស្អែកបានទេ បើមិនបានភ្ជាប់ Data Source នៅថ្ងៃនេះ! Gallery ដែលគ្មាន Data Source គឺដូចជាស៊ុមរូបថតទទេដែលគ្មានរូប។</p>`
    },

    // Slide 4: Prerequisite Retrieval (4 Flip Cards)
    {
      title: "ការរំលឹកចំណេះដឹងគ្រឹះ ៖ ៤ ផ្នែកសំខាន់ៗ",
      segment: "ផ្នែកទី ២ &bull; ការរំលឹកការចងចាំ",
      subtitle: "ចុចលើកាតណាមួយដើម្បីត្រឡប់មើលការពន្យល់ និងរបៀបដែលមេរៀនមុនៗតភ្ជាប់មកកាន់ថ្ងៃនេះ។",
      content: `<div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.15); color: #93c5fd;">ថ្ងៃទី ១១ &bull; រចនាសម្ព័ន្ធទិន្នន័យ</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-top: 0.5rem;">តើ Table, Record និង Field ជាអ្វី?</h4>
                <p style="color: var(--text-muted); font-size: 0.85rem;">តើទិន្នន័យរៀបចំជាប្រព័ន្ធដូចម្តេច?</p>
                <div class="flip-hint">&circlearrowright; ចុចដើម្បីត្រឡប់មើលចម្លើយ</div>
              </div>
              <div class="flip-card-back">
                <span class="card-badge" style="background: rgba(20, 184, 166, 0.2); color: #5eead4;">ចំណេះដឹងគ្រឹះ</span>
                <h4 style="color: #5eead4; font-size: 1rem; margin-top: 0.5rem;">ម៉ាទ្រីសរៀបចំទិន្នន័យ</h4>
                <p style="color: #e2e8f0; font-size: 0.82rem; line-height: 1.5;">
                  <strong>Table</strong> គឺជាបណ្តុំទាំងមូល (ដូចជាបញ្ជី List); <strong>Record</strong> គឺជាជួរដេកមួយ (ករណីជួសជុលមួយ); <strong>Field</strong> គឺជាជួរឈរមួយ (ឧ. Priority)។
                </p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.15); color: #93c5fd;">ថ្ងៃទី ១៦ &bull; Controls</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-top: 0.5rem;">តើ Control Property ជាអ្វី?</h4>
                <p style="color: var(--text-muted); font-size: 0.85rem;">តើ Controls ដឹងថាត្រូវបង្ហាញអ្វីដោយរបៀបណា?</p>
                <div class="flip-hint">&circlearrowright; ចុចដើម្បីត្រឡប់មើលចម្លើយ</div>
              </div>
              <div class="flip-card-back">
                <span class="card-badge" style="background: rgba(20, 184, 166, 0.2); color: #5eead4;">ចំណេះដឹងគ្រឹះ</span>
                <h4 style="color: #5eead4; font-size: 1rem; margin-top: 0.5rem;">Property = ការកំណត់លក្ខណៈ</h4>
                <p style="color: #e2e8f0; font-size: 0.82rem; line-height: 1.5;">
                  គ្រប់ Control សុទ្ធតែមាន properties (ដូចជា <code>Text</code>, <code>Items</code>, <code>Visible</code>)។ រូបមន្តជាអ្នកគណនាតម្លៃដែល property នោះត្រូវមាននៅរាល់វិនាទី។
                </p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.15); color: #93c5fd;">ថ្ងៃទី ១៨ &bull; Variables</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-top: 0.5rem;">Variables និង Persistent Data</h4>
                <p style="color: var(--text-muted); font-size: 0.85rem;">ហេតុអ្វី Set(varUser, ...) មិនគ្រប់គ្រាន់?</p>
                <div class="flip-hint">&circlearrowright; ចុចដើម្បីត្រឡប់មើលចម្លើយ</div>
              </div>
              <div class="flip-card-back">
                <span class="card-badge" style="background: rgba(20, 184, 166, 0.2); color: #5eead4;">ចំណេះដឹងគ្រឹះ</span>
                <h4 style="color: #5eead4; font-size: 1rem; margin-top: 0.5rem;">អង្គចងចាំ RAM ទល់នឹង Hard Drive</h4>
                <p style="color: #e2e8f0; font-size: 0.82rem; line-height: 1.5;">
                  Variables រស់នៅតែក្នុង RAM នៃទូរស័ព្ទប៉ុណ្ណោះ! ពេលបិទ App វាបាត់បង់អស់។ ចំណែកទិន្នន័យអាជីវកម្មអចិន្ត្រៃយ៍ត្រូវតែរក្សាទុកក្នុង Database ខាងក្រៅដូចជា SharePoint។
                </p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.15); color: #93c5fd;">ថ្ងៃទី ១៩ &bull; SharePoint</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-top: 0.5rem;">តើ SharePoint List ជាអ្វី?</h4>
                <p style="color: var(--text-muted); font-size: 0.85rem;">តើជួរឈររបស់យើងផ្ទុកនៅឯណា?</p>
                <div class="flip-hint">&circlearrowright; ចុចដើម្បីត្រឡប់មើលចម្លើយ</div>
              </div>
              <div class="flip-card-back">
                <span class="card-badge" style="background: rgba(20, 184, 166, 0.2); color: #5eead4;">ចំណេះដឹងគ្រឹះ</span>
                <h4 style="color: #5eead4; font-size: 1rem; margin-top: 0.5rem;">តារាងផ្ទុកទិន្នន័យ Cloud</h4>
                <p style="color: #e2e8f0; font-size: 0.82rem; line-height: 1.5;">
                  SharePoint List គឺជាតារាងផ្ទុកទិន្នន័យលើ Cloud របស់ Microsoft 365 ដែលមានសុវត្ថិភាពខ្ពស់ កំណត់ប្រភេទជួរឈរច្បាស់លាស់ និងមានប្រវត្តិ Audit។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការពិនិត្យអន្តរកម្ម ៖</strong> សួរសិស្សអំពីកាតទី ៣ មុនពេលត្រឡប់។ បញ្ជាក់ថា ៖ Variables គឺជាក្រដាស Sticky Note បណ្តោះអាសន្ន រីឯ SharePoint គឺជាទូដែកផ្ទុកឯកសារអចិន្ត្រៃយ៍។</p>`
    },

    // Slide 5: The Manufacturing Crisis: "Two Strangers at Apex Plastics"
    {
      title: "វិបត្តិក្នុងរោងចក្រ ៖ \"មនុស្សចម្លែកពីរនាក់នៅ Apex Plastics\"",
      segment: "ផ្នែកទី ៣ &bull; បញ្ហាជាក់ស្តែង និងវិបត្តិការងារ",
      subtitle: "មូលហេតុដែលការបង្កើតអេក្រង់ និងការបង្កើតមូលដ្ឋានទិន្នន័យដោយដាច់ដោយឡែកពីគ្នា មិនផ្តល់ផលប្រយោជន៍អ្វីសោះដល់អាជីវកម្ម។",
      content: `<div class="card" style="border-left: 3px solid #ef4444;">
            <span class="card-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">សេណារីយ៉ូនៃការខូចខាត</span>
            <h3 class="card-title">ម៉ាស៊ីន M-04 ឡើងកម្តៅខ្លាំងនៅម៉ោង ២ ៖ ១៥ រសៀល</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1rem;">
              កម្មករឈ្មោះ Davi ឃើញផ្សែងហុយចេញពីម៉ាស៊ីនចាក់ពុម្ពប្លាស្ទិក M-04។ គាត់ចាប់យកថេប្លេត បើកអេក្រង់ Power Apps វាយបញ្ចូលថា "ស្ទះវ៉ានប្រេងធារាសាស្ត្រឡើងកម្តៅខ្លាំង" រួចចុច <strong>Submit</strong>។
            </p>
            <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); padding: 0.85rem; border-radius: 0.5rem; margin-bottom: 1rem;">
              <strong style="color: #fca5a5; font-size: 0.88rem;">កំហុសឆ្គងដ៏ធ្ងន់ធ្ងរ ៖</strong>
              <p style="color: #fecaca; font-size: 0.82rem; margin-top: 0.25rem;">
                ប៊ូតុងមានពន្លឺភ្លឹបភ្លែត អេក្រង់មើលទៅស្រស់ស្អាត។ ប៉ុន្តែអ្នកអភិវឌ្ឍន៍ភ្លេចភ្ជាប់ App ទៅកាន់ SharePoint List! អត្ថបទដែល Davi បានវាយបានរលាយបាត់ទៅក្នុងខ្យល់ភ្លាមៗពេលដែល App បិទ។
              </p>
            </div>
            <p style="color: var(--text-muted); font-size: 0.85rem;">
              ខណៈនោះ មេការជួសជុលអង្គុយក្នុងការិយាល័យសម្លឹងមើល SharePoint List ទទេស្អាត។ គ្មានជាងណាត្រូវបានបញ្ជូនទៅឡើយ។ ម៉ាស៊ីន M-04 បានគាំងទាំងស្រុង ខូចខាតពុម្ពប្លាស្ទិកអស់ប្រាក់ ៤៥,០០០ ដុល្លារ។
            </p>
          </div>

          <div class="card" style="border-left: 3px solid var(--color-primary-light);">
            <span class="card-badge" style="background: rgba(20, 184, 166, 0.2); color: #5eead4;">ការវិភាគលើស្ថាបត្យកម្ម</span>
            <h3 class="card-title">ហេតុអ្វីបានជាមហន្តរាយនេះកើតឡើង?</h3>
            <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-top: 0.5rem;">
              <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: rgba(239, 68, 68, 0.2); color: #ef4444; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">&cross;</div>
                <div>
                  <strong style="color: var(--text-main); font-size: 0.9rem;">គ្មានបំពង់តភ្ជាប់ជាក់ស្តែង ៖</strong>
                  <p style="color: var(--text-muted); font-size: 0.82rem;">Power Apps Controls គ្មានញាណទិព្វដឹងចិត្តមនុស្សទេ។ ពួកវាមិនអាចផ្ញើអត្ថបទទៅ SharePoint បានទេ ប្រសិនបើគ្មាន Connector ភ្ជាប់ជាក់លាក់។</p>
                </div>
              </div>

              <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: rgba(239, 68, 68, 0.2); color: #ef4444; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">&cross;</div>
                <div>
                  <strong style="color: var(--text-main); font-size: 0.9rem;">បន្ទប់ Cloud ពីរដាច់ដោយឡែកពីគ្នា ៖</strong>
                  <p style="color: var(--text-muted); font-size: 0.82rem;">Power Apps Studio ដំណើរការក្នុង Tab មួយ រីឯ SharePoint នៅ Tab មួយទៀត។ សេវាកម្មទាំងពីរមិនដឹងថាមានគ្នាទៅវិញទៅមកឡើយ។</p>
                </div>
              </div>

              <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: rgba(16, 185, 129, 0.2); color: #10b981; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">&check;</div>
                <div>
                  <strong style="color: #86efac; font-size: 0.9rem;">ដំណោះស្រាយថ្ងៃទី ២០ ៖</strong>
                  <p style="color: var(--text-muted); font-size: 0.82rem;">តាមរយៈការភ្ជាប់ <code>Apex_Maintenance_Requests</code> ចូល Studio គ្រប់រូបមន្តអាចសរសេរជួរទិន្នន័យដោយផ្ទាល់ទៅក្នុង SharePoint បានភ្លាមៗ។</p>
                </div>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>សង្កត់ធ្ងន់លើបញ្ហាជាក់ស្តែង ៖</strong> នេះជាកំហុសលេខ ១ របស់អ្នកចាប់ផ្តើមដំបូង។ ពួកគេបង្កើតអេក្រង់ ១០ យ៉ាងស្រស់ស្អាត តែដល់ថ្ងៃសម្ពោធទើបដឹងថាគ្មានទិន្នន័យណាមួយត្រូវបានរក្សាទុកសោះ។</p>`
    },

    // Slide 6: Everyday Physical Analogy: Faucet, Reservoir & Pipe
    {
      title: "ការប្រៀបធៀបក្នុងជីវិតជាក់ស្តែង ៖ ក្បាលរ៉ូប៊ីណេ អាងទឹក និងបំពង់ស្ពាន់",
      segment: "ផ្នែកទី ៣ &bull; គំរូផ្នត់គំនិតក្នុងជីវិតពិត",
      subtitle: "ស្វែងយល់ពីស្ថាបត្យកម្ម Cloud តាមរយៈប្រព័ន្ធទឹកប្រើប្រាស់ក្នុងផ្ទះបាយរបស់អ្នក។",
      content: `<div class="card" style="text-align: center; align-items: center;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(59, 130, 246, 0.15); border: 1px solid #3b82f6; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: #60a5fa; margin-bottom: 1rem;">
              &#128167;
            </div>
            <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">UI (ផ្នែកខាងមុខ)</span>
            <h3 class="card-title">១. ក្បាលរ៉ូប៊ីណេទឹក</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              ក្បាលរ៉ូប៊ីណេត្រូវបានបំពាក់លើតុផ្ទះបាយ។ វាមានដៃមួល និងបំពង់បង្ហូរ។ ប៉ុន្តែក្បាលរ៉ូប៊ីណេមិនមែនជាអ្នកបង្កើតទឹកទេ! វាគ្រាន់តែគ្រប់គ្រងលំហូរ និងបង្ហាញទឹកដល់មនុស្សដែលឈរនៅមុខវាប៉ុណ្ណោះ។
            </p>
            <div style="margin-top: auto; padding-top: 1rem; color: #60a5fa; font-weight: 700; font-size: 0.85rem;">
              = Power Apps Controls (UI)
            </div>
          </div>

          <div class="card" style="text-align: center; align-items: center; background: rgba(20, 184, 166, 0.1); border-color: var(--color-primary-light);">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(20, 184, 166, 0.2); border: 1px solid var(--color-primary-light); display: flex; align-items: center; justify-content: center; font-size: 2rem; color: #5eead4; margin-bottom: 1rem;">
              &#128295;
            </div>
            <span class="card-badge" style="background: rgba(20, 184, 166, 0.25); color: #5eead4;">ការតភ្ជាប់ (ស្ពាន)</span>
            <h3 class="card-title">២. បំពង់ស្ពាន់</h3>
            <p style="color: var(--text-main); font-size: 0.88rem; line-height: 1.6;">
              បើគ្មានបំពង់តភ្ជាប់ក្បាលរ៉ូប៊ីណេទៅកាន់ប្រភពទឹកទេ បើកដៃមួលយ៉ាងណាក៏ចេញតែខ្យល់ទទេ! បំពង់ស្ពាន់ដឹកនាំទឹកទៅមកឆ្លងកាត់ចម្ងាយ សម្ពាធ និងវ៉ានបិទបើក។
            </p>
            <div style="margin-top: auto; padding-top: 1rem; color: #5eead4; font-weight: 700; font-size: 0.85rem;">
              = SharePoint Connector (ថ្ងៃនេះ!)
            </div>
          </div>

          <div class="card" style="text-align: center; align-items: center;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: #86efac; margin-bottom: 1rem;">
              &#127970;
            </div>
            <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">កន្លែងផ្ទុក (ផ្នែកខាងក្រោយ)</span>
            <h3 class="card-title">៣. អាងស្តុកទឹកទីក្រុង</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              នៅចម្ងាយរាប់គីឡូម៉ែត្រ ទឹកបរិសុទ្ធរាប់លានលីត្រត្រូវបានការពារ ចម្រោះ និងស្តុកទុកដោយសុវត្ថិភាព។ ទោះបីជាមាននរណាយកញញួរមកវាយបំបែកក្បាលរ៉ូប៊ីណេរបស់អ្នក ក៏អាងទឹកនៅតែមានសុវត្ថិភាព ១០០%។
            </p>
            <div style="margin-top: auto; padding-top: 1rem; color: #86efac; font-weight: 700; font-size: 0.85rem;">
              = SharePoint List (ថ្ងៃទី ១៩)
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការធ្វើកាយវិការ ៖</strong> ធ្វើកាយវិការមួលក្បាលរ៉ូប៊ីណេដែលគ្មានបំពង់ទឹក។ សួរសិស្សថា ៖ "តើមានអ្វីកើតឡើងបើមួលរ៉ូប៊ីណេដែលគ្មានបំពង់?" គ្មានអ្វីចេញមកទេ! នោះហើយជាអ្វីដែលកើតឡើងពេលចុចប៊ូតុង Submit មុនពេលភ្ជាប់ SharePoint។</p>`
    },

    // Slide 7: Plain-Language Concepts: Data Source & Connector
    {
      title: "គោលគំនិតភាសាសាមញ្ញ ៖ តើអ្វីជា Data Source និងអ្វីជា Connector?",
      segment: "ផ្នែកទី ៣ &bull; ពាក្យបច្ចេកទេសបកស្រាយយ៉ាងសាមញ្ញ",
      subtitle: "កុំរៀនពាក្យបច្ចេកទេសជាអត្ថន័យទោលដាច់ដោយឡែក។ ត្រូវយល់ពីតួនាទីរបស់វាក្នុងប្រព័ន្ធទាំងមូល។",
      content: `<div class="card">
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
              <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9; margin-bottom: 0;">ពាក្យបច្ចេកទេស</span>
              <h3 class="card-title" style="margin-bottom: 0;">តើអ្វីជា "Connector"?</h3>
            </div>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1rem;">
              <strong>Connector</strong> គឺជាស្ពានបកប្រែកម្មវិធីដែលបង្កើតឡើងដោយ Microsoft។ វាចេះនិយាយពីរភាសា ៖ ភាសារូបមន្ត Power Fx នៅខាងក្នុង និងភាសាស្នើសុំ REST API លើ Cloud នៅខាងក្រៅ។
            </p>
            <div style="background: rgba(6, 182, 212, 0.08); border-left: 3px solid #06b6d4; padding: 0.85rem; border-radius: 0.4rem;">
              <strong style="color: #67e8f9; font-size: 0.85rem;">ហេតុអ្វី Microsoft បង្កើតវាឡើង ៖</strong>
              <p style="color: var(--text-muted); font-size: 0.82rem; margin-top: 0.2rem;">
                បើគ្មាន Connector ទេ អ្នកត្រូវសរសេរកូដបណ្តាញ C# ឬ JavaScript រាប់រយជួរ ញែកទិន្នន័យ JSON និងដោះស្រាយសុវត្ថិភាព SSL។ Connector បង្រួមភាពស្មុគស្មាញទាំងអស់នេះមកនៅត្រឹម ១ ចុចប៉ុណ្ណោះ។
              </p>
            </div>
          </div>

          <div class="card">
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
              <span class="card-badge" style="background: rgba(20, 184, 166, 0.2); color: #5eead4; margin-bottom: 0;">ពាក្យបច្ចេកទេស</span>
              <h3 class="card-title" style="margin-bottom: 0;">តើអ្វីជា "Data Source"?</h3>
            </div>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1rem;">
              <strong>Data Source</strong> គឺជាកន្លែងផ្ទុកទិន្នន័យអាជីវកម្មជាក់លាក់ដែលអ្នកភ្ជាប់ជាមួយ App។ ខណៈដែល "SharePoint" ជាប្រភេទ Connector នោះ <code>Apex_Maintenance_Requests</code> គឺជា Data Source ជាក់ស្តែងរបស់អ្នក។
            </p>
            <div style="background: rgba(20, 184, 166, 0.08); border-left: 3px solid var(--color-primary-light); padding: 0.85rem; border-radius: 0.4rem;">
              <strong style="color: #5eead4; font-size: 0.85rem;">របៀបដែល Power Fx មើលឃើញវា ៖</strong>
              <p style="color: var(--text-muted); font-size: 0.82rem; margin-top: 0.2rem;">
                នៅពេលអ្នកភ្ជាប់ Data Source ឈ្មោះរបស់វានឹងក្លាយជា Keyword សកម្មក្នុង Power Fx ភ្លាមៗ។ អ្នកអាចវាយ <code>Apex_Maintenance_Requests</code> ក្នុងរូបមន្តណាមួយ ដូចវាយឈ្មោះតារាង Excel អញ្ចឹង!
              </p>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការពន្យល់បន្ថែម ៖</strong> គិតថា Connector ដូចជាខ្សែភ្លើង ចំណែក Data Source ដូចជាព្រីភ្លើងនៅលើជញ្ជាំង។ ខ្សែភ្លើងនាំចរន្តមកបាន តែវាត្រូវតែដោតចូលទៅក្នុងព្រីជាក់លាក់មួយ។</p>`
    },

    // Slide 8: Architectural Data Bridge Pipeline Diagram
    {
      title: "ស្ថាបត្យកម្មស្ពានទិន្នន័យ ៖ ខ្សែសង្វាក់តភ្ជាប់ចុងម្ខាងទៅចុងម្ខាង",
      segment: "ផ្នែកទី ៣ &bull; ដ្យាក្រាមស្ថាបត្យកម្ម Cloud",
      subtitle: "ស្វែងយល់ពីរបៀបដែលការប៉ះបញ្ជាលើអេក្រង់ធ្វើដំណើរទៅកាន់ Datacenter របស់ Microsoft និងត្រឡប់មកវិញ។",
      content: `<div class="pipeline-stage">
            <div class="pipeline-node">
              <div class="pipeline-icon icon-app">&#128241;</div>
              <strong style="color: #93c5fd; font-size: 0.95rem;">Power Apps Studio</strong>
              <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">Front-End Canvas UI</span>
              <p style="font-size: 0.8rem; color: #cbd5e1; margin-top: 0.5rem; line-height: 1.4;">
                Controls, ប៊ូតុង, TextInputs និងរូបមន្ត Power Fx ដំណើរការលើ Browser នៃថេប្លេត។
              </p>
            </div>

            <div class="pipeline-arrow">&rarr;</div>

            <div class="pipeline-node">
              <div class="pipeline-icon icon-connector">&#128260;</div>
              <strong style="color: #67e8f9; font-size: 0.95rem;">SharePoint Connector</strong>
              <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">ស្រទាប់បកប្រែ</span>
              <p style="font-size: 0.8rem; color: #cbd5e1; margin-top: 0.5rem; line-height: 1.4;">
                បម្លែងរូបមន្ត Power Fx ទៅជាសំណើ HTTPS REST API ដែលមានសុវត្ថិភាពសម្រាប់ Microsoft 365។
              </p>
            </div>

            <div class="pipeline-arrow">&rarr;</div>

            <div class="pipeline-node">
              <div class="pipeline-icon icon-auth">&#128274;</div>
              <strong style="color: #c084fc; font-size: 0.95rem;">Microsoft Entra ID</strong>
              <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">ច្រកទ្វារសុវត្ថិភាព SSO</span>
              <p style="font-size: 0.8rem; color: #cbd5e1; margin-top: 0.5rem; line-height: 1.4;">
                ផ្ទៀងផ្ទាត់គណនីក្រុមហ៊ុនរបស់អ្នកប្រើប្រាស់ និងត្រួតពិនិត្យសិទ្ធិមុននឹងអនុញ្ញាតឱ្យចូល។
              </p>
            </div>

            <div class="pipeline-arrow">&rarr;</div>

            <div class="pipeline-node">
              <div class="pipeline-icon icon-sharepoint">&#128196;</div>
              <strong style="color: #5eead4; font-size: 0.95rem;">Apex Maintenance List</strong>
              <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">តារាង SharePoint Online</span>
              <p style="font-size: 0.8rem; color: #cbd5e1; margin-top: 0.5rem; line-height: 1.4;">
                ជួរទិន្នន័យលើ Cloud ត្រូវបានកត់ត្រាជាអចិន្ត្រៃយ៍ក្នុង Disk របស់ Datacenter ជាមួយប្រវត្តិ Versioning។
              </p>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការដើរតាមដំណើរការ ៖</strong> នាំសិស្សមើលពីឆ្វេងទៅស្តាំ។ មើលដំណើរការពេល Davi ចុច Submit ៖ ថេប្លេត -> Connector បកប្រែ -> Entra ID ឆែកសិទ្ធិ -> SharePoint កត់ត្រាចូលក្នុង Disk។</p>`
    },

    // Slide 9: Connectors & Single Sign-On (Entra ID)
    {
      title: "Connectors និងការចូលប្រើប្រព័ន្ធរួមតែមួយ ៖ Microsoft Entra ID",
      segment: "ផ្នែកទី ៣ &bull; សុវត្ថិភាពសហគ្រាស និងអត្តសញ្ញាណ",
      subtitle: "មូលហេតុដែលអ្នកមិនចាំបាច់សរសេរបញ្ចូលលេខកូដសម្ងាត់ Database ក្នុង Power Apps។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc;">គ្មានការសួរបញ្ចូលលេខសម្ងាត់ឡើយ</span>
            <h3 class="card-title">ដំណើរការ Single Sign-On (SSO) ជាក់ស្តែង</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1rem;">
              នៅពេល Davi ចូលប្រើថេប្លេត Windows ឬបើក Power Apps លើ Edge Browser គាត់បាន Login ជាមួយគណនីក្រុមហ៊ុន Microsoft 365 រួចជាស្រេចហើយ។
            </p>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">
              នៅពេល SharePoint Connector ចាប់ផ្តើមដំណើរការ វាបញ្ជូនកូដសុវត្ថិភាពដែលបានអ៊ិនគ្រីប (Encrypted Security Token) ដោយស្វ័យប្រវត្តិកំបាំងភ្នែក។ Power Apps មិនដែលសួរ Davi ថា <em>"សូមវាយ Username និង Password របស់ Database មក"</em> នោះឡើយ។ អត្តសញ្ញាណធ្វើដំណើរដោយរលូនឆ្លងកាត់ Entra ID។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(20, 184, 166, 0.2); color: #5eead4;">គោលការណ៍សុវត្ថិភាពសហគ្រាស</span>
            <h3 class="card-title">តើសិទ្ធិរបស់អ្នកណាជាអ្នកកំណត់?</h3>
            <div style="background: rgba(20, 184, 166, 0.08); border-left: 3px solid var(--color-primary-light); padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
              <strong style="color: #5eead4; font-size: 0.95rem;">ច្បាប់នៃការទទួលសិទ្ធិបន្ត (Inherited Permissions) ៖</strong>
              <p style="color: #cbd5e1; font-size: 0.85rem; margin-top: 0.35rem; line-height: 1.5;">
                Power Apps មិនដែលរំលោភលើសិទ្ធិរបស់ SharePoint បានឡើយ! ប្រសិនបើកម្មករម្នាក់គ្មានសិទ្ធិ Read ក្នុង SharePoint List ទេ នោះ App នឹងបដិសេធមិនបង្ហាញទិន្នន័យដល់កម្មករនោះដាច់ខាត។
              </p>
            </div>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5;">
              ក្នុងនាមជាអ្នកអភិវឌ្ឍន៍ ចំណុចនេះការពារអ្នកយ៉ាងខ្លាំង។ អ្នកមិនចាំបាច់សរសេរបង្កើតកូដ Firewall ស្មុគស្មាញដោយខ្លួនឯងទេ ព្រោះប្រព័ន្ធសុវត្ថិភាពរបស់ SharePoint ជាអ្នកយាមទ្វារដោយស្វ័យប្រវត្តិ។
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការបំភ្លឺអំពីសុវត្ថិភាព ៖</strong> បញ្ជាក់ឱ្យសិស្សយល់ច្បាស់ ៖ ប្រសិនបើអ្នកបង្កើត App ភ្ជាប់ទៅកាន់តារាងប្រាក់ខែ បុគ្គលិកធម្មតាមិនអាចមើលឃើញប្រាក់ខែថ្នាក់ដឹកនាំបានទេ លុះត្រាតែពួកគេមានសិទ្ធិស្រាប់ក្នុង SharePoint!</p>`
    },

    // Slide 10: Step-by-Step Anatomy of Connecting Data in Studio
    {
      title: "ជំហានលម្អិតក្នុងការភ្ជាប់ទិន្នន័យនៅក្នុង Studio",
      segment: "ផ្នែកទី ៤ &bull; ដំណើរការការងារក្នុង Studio",
      subtitle: "ជំហាន ៤ ចុចដ៏ជាក់លាក់ក្នុងការភ្ជាប់ SharePoint List ណាមួយទៅកាន់ Power App របស់អ្នក។",
      content: `<div class="card">
            <span class="obj-num" style="margin-bottom: 0.75rem;">1</span>
            <h4 style="color: #f8fafc; font-size: 1rem;">បើករបារខាងឆ្វេង</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; margin-top: 0.35rem;">
              នៅលើរបាររុករកបញ្ឈរនៅខាងឆ្វេងបំផុតនៃ Power Apps Studio ចុចលើ <strong>រូបតំណាងស៊ីឡាំងទិន្នន័យ (Data Icon)</strong>។
            </p>
            <div style="margin-top: auto; padding-top: 0.75rem; font-family: var(--font-code); font-size: 0.75rem; color: #5eead4;">
              Icon ៖ Cylinder &equiv;
            </div>
          </div>

          <div class="card">
            <span class="obj-num" style="margin-bottom: 0.75rem;">2</span>
            <h4 style="color: #f8fafc; font-size: 1rem;">ចុច "+ Add data"</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; margin-top: 0.35rem;">
              ចុចលើប៊ូតុង <strong>+ Add data</strong> នៅផ្នែកខាងលើនៃផ្ទាំងទិន្នន័យ ដើម្បីបើកបញ្ជី Connector ទាំងអស់។
            </p>
            <div style="margin-top: auto; padding-top: 0.75rem; font-family: var(--font-code); font-size: 0.75rem; color: #5eead4;">
              ស្វែងរក ៖ "SharePoint"
            </div>
          </div>

          <div class="card">
            <span class="obj-num" style="margin-bottom: 0.75rem;">3</span>
            <h4 style="color: #f8fafc; font-size: 1rem;">ជ្រើសរើស Team Site</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; margin-top: 0.35rem;">
              ជ្រើសរើស SharePoint Team Site ជាក់លាក់របស់រោងចក្រ (ឧ. <code>Apex Manufacturing Plant</code>) ពី Recent Sites ឬ Paste URL។
            </p>
            <div style="margin-top: auto; padding-top: 0.75rem; font-family: var(--font-code); font-size: 0.75rem; color: #5eead4;">
              Site ៖ Apex Plant 1
            </div>
          </div>

          <div class="card">
            <span class="obj-num" style="margin-bottom: 0.75rem;">4</span>
            <h4 style="color: #f8fafc; font-size: 1rem;">ធីក List និង Connect</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; margin-top: 0.35rem;">
              ស្វែងរក <code>Apex_Maintenance_Requests</code> ក្នុងបញ្ជី ធីកលើប្រអប់ Checkbox រួចចុចប៊ូតុងពណ៌ខៀវ <strong>Connect</strong>។
            </p>
            <div style="margin-top: auto; padding-top: 0.75rem; font-family: var(--font-code); font-size: 0.75rem; color: #5eead4;">
              ស្ថានភាព ៖ Connected &check;
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ចំណុចភ្លាត់ស្នៀតទូទៅ ៖</strong> បង្ហាញសិស្សថាពេលខ្លះពួកគេចុចខុស Site ប្រសិនបើក្រុមហ៊ុនមាន 'Apex Test' និង 'Apex Production'។ ត្រូវផ្ទៀងផ្ទាត់ចំណងជើង Site ជានិច្ចមុនជ្រើសរើស List។</p>`
    },

    // Slide 11: What Changes in Studio Once Connected
    {
      title: "អ្វីដែលផ្លាស់ប្តូរក្នុង Studio បន្ទាប់ពីភ្ជាប់រួច ៖ IntelliSense",
      segment: "ផ្នែកទី ៤ &bull; ភាពវៃឆ្លាតរបស់ Studio",
      subtitle: "ស្វែងយល់ពីរបៀបដែល Power Fx ស្រូបយករចនាសម្ព័ន្ធ Schema របស់ SharePoint ចូលទៅក្នុងប្រព័ន្ធបំពេញកូដស្វ័យប្រវត្តិ។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">ភាពវៃឆ្លាតនៃរូបមន្តភ្លាមៗ</span>
            <h3 class="card-title">ការបំពេញកូដស្វ័យប្រវត្តិ (IntelliSense)</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1rem;">
              នៅរាល់វិនាទីដែលការតភ្ជាប់ជោគជ័យ Power Apps នឹងទាញយកព័ត៌មានរចនាសម្ព័ន្ធ Schema ភ្លាមៗ។ ពេលអ្នកចុចលើរបាររូបមន្ត ហើយវាយពាក្យ <code>Ap...</code> នោះ Power Fx នឹងបង្ហាញការណែនាំ ៖
            </p>
            <div style="background: #090e17; border: 1px solid var(--border-subtle); border-radius: 0.5rem; padding: 1rem; font-family: var(--font-code); font-size: 0.95rem; color: #60a5fa; margin-bottom: 1rem;">
              <span style="color: #94a3b8;">// ផ្ទាំងស្វ័យប្រវត្តិនឹងលោតឡើង ៖</span><br>
              &bull; <strong>Apex_Maintenance_Requests</strong> &nbsp;<span style="color: #10b981; font-size: 0.8rem;">[SharePoint Table]</span>
            </div>
            <p style="color: var(--text-muted); font-size: 0.85rem;">
              លើសពីនេះ ការវាយ <code>Apex_Maintenance_Requests.</code> នឹងបង្ហាញឈ្មោះជួរឈរទាំងអស់ភ្លាមៗ ៖ <code>Title</code>, <code>MachineID</code>, <code>Priority</code>, <code>Status</code>, និង <code>LoggedDate</code>!
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(20, 184, 166, 0.2); color: #5eead4;">សញ្ញាបញ្ជាក់ភាពជោគជ័យ</span>
            <h3 class="card-title">២ សញ្ញាបញ្ជាក់លើអេក្រង់ថាភ្ជាប់បានសម្រេច</h3>
            <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 0.5rem;">
              <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="width: 28px; height: 28px; border-radius: 50%; background: rgba(20, 184, 166, 0.2); color: #5eead4; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">1</div>
                <div>
                  <strong style="color: var(--text-main); font-size: 0.9rem;">បង្ហាញក្នុងបញ្ជី Data Tree ៖</strong>
                  <p style="color: var(--text-muted); font-size: 0.82rem;">នៅក្រោមផ្ទាំង Data ខាងឆ្វេង <code>Apex_Maintenance_Requests</code> នឹងបង្ហាញឡើងជាមួយនិមិត្តសញ្ញា SharePoint ពណ៌បៃតង។</p>
                </div>
              </div>

              <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="width: 28px; height: 28px; border-radius: 50%; background: rgba(20, 184, 166, 0.2); color: #5eead4; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">2</div>
                <div>
                  <strong style="color: var(--text-main); font-size: 0.9rem;">ជម្រើស "View data" ៖</strong>
                  <p style="color: var(--text-muted); font-size: 0.82rem;">ការចុចលើចុចបី (...) ក្បែរ Data Source នឹងផ្តល់ឱ្យអ្នកនូវជម្រើស <strong>View data</strong> ដែលអាចឱ្យអ្នកមើលជួរទិន្នន័យជាក់ស្តែងក្នុង Studio បានភ្លាមៗ។</p>
                </div>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ពេលវេលាដ៏អស្ចារ្យ ៖</strong> បង្ហាញសិស្សពីរបៀបដែល IntelliSense បំពេញឈ្មោះជួរឈរ។ អ្នកមិនចាំបាច់ចាំអក្ខរាវិរុទ្ធជួរឈរទេ ព្រោះ Power Apps បានអាន SharePoint List និងចងចាំវាជំនួសអ្នករួចហើយ!</p>`
    },

    // Slide 12: Architectural Schema Verification Checklist
    {
      title: "បញ្ជីផ្ទៀងផ្ទាត់រចនាសម្ព័ន្ធទិន្នន័យ (Schema Verification)",
      segment: "ផ្នែកទី ៤ &bull; អភិបាលកិច្ចទិន្នន័យ និង Schema",
      subtitle: "ផ្ទៀងផ្ទាត់ថាគ្រប់ប្រភេទជួរឈរត្រូវបានបម្លែងពី SharePoint ទៅកាន់ Power Fx យ៉ាងត្រឹមត្រូវ ១០០%។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">ប្រអប់អត្ថបទ</span>
            <h4 style="color: #f8fafc; font-size: 1rem;">Title</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.25rem;">
              <strong>SharePoint ៖</strong> Single line of text<br>
              <strong>ប្រភេទ Power Fx ៖</strong> Text (String)<br>
              <strong>គោលបំណង ៖</strong> សេចក្តីសង្ខេបបញ្ហា
            </p>
            <div style="margin-top: auto; padding-top: 0.5rem; color: #10b981; font-size: 0.78rem;">&check; ផ្គូផ្គង ១ ទល់ ១ ត្រឹមត្រូវ</div>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(20, 184, 166, 0.2); color: #5eead4;">ជម្រើស Choice</span>
            <h4 style="color: #f8fafc; font-size: 1rem;">Priority</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.25rem;">
              <strong>SharePoint ៖</strong> Choice (Low/Med/High)<br>
              <strong>ប្រភេទ Power Fx ៖</strong> Record / OptionSet<br>
              <strong>ការចូលប្រើ ៖</strong> <code>Priority.Value</code>
            </p>
            <div style="margin-top: auto; padding-top: 0.5rem; color: #10b981; font-size: 0.78rem;">&check; ទាមទារ .Value</div>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">កាលបរិច្ឆេទ Date</span>
            <h4 style="color: #f8fafc; font-size: 1rem;">LoggedDate</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.25rem;">
              <strong>SharePoint ៖</strong> Date and Time<br>
              <strong>ប្រភេទ Power Fx ៖</strong> DateTime<br>
              <strong>ទម្រង់ ៖</strong> ស្តង់ដារពពក ISO 8601
            </p>
            <div style="margin-top: auto; padding-top: 0.5rem; color: #10b981; font-size: 0.78rem;">&check; បម្លែងម៉ោងតាមតំបន់ស្វ័យប្រវត្តិ</div>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc;">បុគ្គល Person</span>
            <h4 style="color: #f8fafc; font-size: 1rem;">Technician</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.25rem;">
              <strong>SharePoint ៖</strong> Person or Group<br>
              <strong>ប្រភេទ Power Fx ៖</strong> Complex Record<br>
              <strong>លក្ខណៈរង ៖</strong> DisplayName, Email
            </p>
            <div style="margin-top: auto; padding-top: 0.5rem; color: #10b981; font-size: 0.78rem;">&check; ភ្ជាប់ជាមួយ Entra ID</div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ច្បាប់សំខាន់លើ Choice Field ៖</strong> រំលឹកសិស្សពីថ្ងៃទី ១៩ ៖ ជួរឈរ Choice ក្នុង SharePoint ផ្តល់តម្លៃជា Record ក្នុង Power Fx។ ដើម្បីបង្ហាញអក្សរលើអេក្រង់ អ្នកត្រូវសរសេរ <code>.Value</code>។</p>`
    },

    // Slide 13: Interactive Widget 1: Studio Data Bridge Simulator
    {
      title: "ឧបករណ៍ពិសោធស្ពានទិន្នន័យក្នុង Studio ផ្ទាល់ដៃ",
      segment: "ផ្នែកទី ៤ &bull; ឧបករណ៍ពិសោធអន្តរកម្ម",
      subtitle: "ទទួលបានបទពិសោធន៍ក្នុងការភ្ជាប់ SharePoint ផ្ទាល់នៅក្នុងផ្ទាំងត្រាប់តាម Power Apps Studio នេះ។",
      content: `<div class="studio-chrome">
            <div class="studio-chrome-header">
              <span>Studio Navigation Rail</span>
              <span>Power Apps v3.24</span>
            </div>
            <div class="studio-chrome-body">
              <div class="studio-nav-item" onclick="selectSimTab('tree')">&#128193; Tree View</div>
              <div class="studio-nav-item" onclick="selectSimTab('insert')">&#10133; Insert Controls</div>
              <div class="studio-nav-item active" id="sim-data-nav" onclick="selectSimTab('data')">&#128451; Data Sources</div>
              <div class="studio-nav-item" onclick="selectSimTab('media')">&#127912; Media &amp; Assets</div>
              
              <div style="margin-top: 1.5rem; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
                <label style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase;">ជ្រើសរើស SharePoint Site ៖</label>
                <select id="sim-site-select" style="width: 100%; background: #0c1524; color: #f8fafc; border: 1px solid var(--border-subtle); padding: 0.5rem; border-radius: 0.4rem; margin-top: 0.35rem; font-size: 0.85rem;">
                  <option value="apex">Apex Manufacturing Plant 1</option>
                  <option value="hq">Apex Global Corporate HQ</option>
                  <option value="test">Sandbox Developer Zone</option>
                </select>

                <div style="margin-top: 1rem;">
                  <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: #cbd5e1; cursor: pointer;">
                    <input type="checkbox" id="sim-list-check" checked>
                    <span>Apex_Maintenance_Requests</span>
                  </label>
                </div>

                <button class="sim-btn-connect" onclick="runSimConnection()">
                  <span>ភ្ជាប់ស្ពានទិន្នន័យ (Establish Bridge)</span> &rarr;
                </button>
              </div>
            </div>
          </div>

          <div class="card" style="background: rgba(12, 19, 31, 0.95); justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                <span class="card-badge" id="sim-status-badge" style="background: rgba(20, 184, 166, 0.2); color: #5eead4;">ស្ថានភាព ៖ រួចរាល់សម្រាប់ការតភ្ជាប់</span>
                <span style="font-family: var(--font-code); font-size: 0.75rem; color: var(--text-dim);">Latency ៖ 42ms</span>
              </div>
              <h3 style="color: #f8fafc; font-size: 1.15rem; margin-bottom: 0.5rem;" id="sim-stage-title">ទិន្នន័យត្រួតពិនិត្យការតភ្ជាប់ផ្ទាល់</h3>
              <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; margin-bottom: 1rem;" id="sim-stage-desc">
                ចុចលើប៊ូតុង <strong>"ភ្ជាប់ស្ពានទិន្នន័យ"</strong> ខាងឆ្វេង ដើម្បីត្រាប់តាមការផ្ទៀងផ្ទាត់សិទ្ធិ ការទាក់ទង REST API និងការភ្ជាប់រចនាសម្ព័ន្ធ Schema។
              </p>
            </div>

            <div class="diag-console" id="sim-diag-log">
              &gt; Power Apps Studio runtime initialized.<br>
              &gt; Microsoft Entra ID token: ACTIVE (user: davi@apexplastics.com)<br>
              &gt; Awaiting data source binding command...
            </div>

            <div style="display: flex; gap: 1rem; margin-top: 1rem; align-items: center;">
              <span style="font-size: 0.82rem; color: var(--text-muted);">ការធ្វើតេស្ត IntelliSense ៖</span>
              <code style="background: #090e17; padding: 0.35rem 0.75rem; border-radius: 0.4rem; color: #5eead4;" id="sim-code-preview">
                Apex_Maintenance_Requests.Title
              </code>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>សកម្មភាពក្នុងថ្នាក់ ៖</strong> ឱ្យសិស្សចុច 'ភ្ជាប់ស្ពានទិន្នន័យ'។ មើលផ្ទាំង Console កត់ត្រាដំណាក់កាលនីមួយៗ ៖ ការឆែក Token -> ការហៅ REST -> ការផ្គូផ្គង Metadata -> ដំណើរការ IntelliSense។</p>`
    },

    // Slide 14: Trainer Demonstration Script
    {
      title: "ការបង្ហាញផ្ទាល់របស់គ្រូបង្វឹក ៖ ជំហានចុចជាក់ស្តែង",
      segment: "ផ្នែកទី ៥ &bull; ការបង្ហាញផ្ទាល់របស់គ្រូ",
      subtitle: "សង្កេតមើលសកម្មភាពជាក់ស្តែងលើអេក្រង់ សំឡេងពន្យល់ និងចំណុចគ្រោះថ្នាក់ដែលត្រូវចៀសវាង។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">ដំណាក់កាលទី ១ &bull; ០-៥ នាទី</span>
            <h3 class="card-title">១. ស្វែងរក Data Rail ខាងឆ្វេង</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
              <strong>សកម្មភាពគ្រូ ៖</strong> រំកិល Mouse ទៅរបារបញ្ឈរខាងឆ្វេង។ ដាក់ Mouse លើរូបស៊ីឡាំងទាល់តែឃើញពាក្យ "Data"។<br><br>
              <strong>សម្តីពន្យល់ ៖</strong> <em>"សូមចាប់អារម្មណ៍រូបស៊ីឡាំងនេះ។ ក្នុងវិទ្យាសាស្ត្រកុំព្យូទ័រ ស៊ីឡាំងតំណាងឱ្យ Database អស់រយៈពេល ៥០ ឆ្នាំមកហើយ។ ចុចលើវាដើម្បីបើកបន្ទប់បញ្ជាទិន្នន័យ។"</em>
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(20, 184, 166, 0.2); color: #5eead4;">ដំណាក់កាលទី ២ &bull; ៥-១០ នាទី</span>
            <h3 class="card-title">២. ជ្រើសរើស Connector និង Site</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
              <strong>សកម្មភាពគ្រូ ៖</strong> ចុច "+ Add data" វាយ "SharePoint" ក្នុងប្រអប់ស្វែងរក។ ជ្រើសរើស Connector SharePoint ពណ៌បៃតង។ រើសយក "Apex Manufacturing Plant 1"។<br><br>
              <strong>សម្តីពន្យល់ ៖</strong> <em>"មាន Connector រាប់ពាន់នៅទីនេះ ដូចជា SAP, Salesforce, SQL។ យើងរើស SharePoint ព្រោះ List របស់យើងរស់នៅទីនោះ។"</em>
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ដំណាក់កាលទី ៣ &bull; ១០-១៥ នាទី</span>
            <h3 class="card-title">៣. ការផ្ទៀងផ្ទាត់ និង View Data</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
              <strong>សកម្មភាពគ្រូ ៖</strong> ធីក <code>Apex_Maintenance_Requests</code> ចុច Connect។ ចុចលើចុចបី (...) រួចជ្រើសយក "View data"។<br><br>
              <strong>សម្តីពន្យល់ ៖</strong> <em>"មើលចុះ! ជួរគំរូទាំងបីដែល Davi បានបញ្ចូលកាលពីម្សិលមិញក្នុង SharePoint កំពុងបង្ហាញខ្លួនផ្ទាល់ក្នុង Studio Canvas របស់យើងហើយ!"</em>
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការបង្ហាញកំហុសចេតនា ៖</strong> បង្ហាញសិស្សនូវអ្វីដែលកើតឡើងប្រសិនបើអ្នកវាយឈ្មោះ List ខុសអក្ខរាវិរុទ្ធក្នុងរបាររូបមន្ត។ វានឹងចេញពណ៌ក្រហម! បន្ទាប់មកបង្ហាញថាពេលវាយត្រូវ វានឹងចេញពណ៌បៃតង។</p>`
    },

    // Slide 15: Guided Practice: Connecting Apex_Maintenance_Requests
    {
      title: "ការអនុវត្តផ្ទាល់ដៃ ៖ ភ្ជាប់ Apex_Maintenance_Requests",
      segment: "ផ្នែកទី ៥ &bull; ការអនុវត្តផ្ទាល់ដៃរបស់សិស្ស",
      subtitle: "បើក Tab Browser ផ្ទាល់ខ្លួនរបស់អ្នក ហើយអនុវត្តតាម ៤ ដំណាក់កាលដែលមានរចនាសម្ព័ន្ធនេះឥឡូវនេះ។",
      content: `<div class="card">
            <h3 class="card-title">ការណែនាំតាមដំណាក់កាល</h3>
            <div class="objective-item">
              <span class="obj-num">A</span>
              <div>
                <strong>បើកផ្ទាំង Data ៖</strong>
                <p>ចុចលើរូបតំណាងស៊ីឡាំងទិន្នន័យ (Data Icon) នៅលើរបារខាងឆ្វេងនៃ Power Apps Studio របស់អ្នក។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">B</span>
              <div>
                <strong>បន្ថែមការតភ្ជាប់ SharePoint ៖</strong>
                <p>ចុចលើ <code>+ Add data</code> &rarr; ស្វែងរក <code>SharePoint</code> &rarr; ចុចលើ Connector នោះ។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">C</span>
              <div>
                <strong>ជ្រើសរើស Team Site របស់អ្នក ៖</strong>
                <p>ជ្រើសយក Team Site រោងចក្រដែលបានកំណត់ពីបញ្ជី Sites ដែលមាន។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">D</span>
              <div>
                <strong>ភ្ជាប់តារាងទិន្នន័យរបស់អ្នក ៖</strong>
                <p>ធីកលើ <code>Apex_Maintenance_Requests</code> រួចចុច <strong>Connect</strong>។</p>
              </div>
            </div>
          </div>

          <div class="card" style="border-left: 3px solid var(--color-primary-light);">
            <h3 class="card-title">បញ្ជីផ្ទៀងផ្ទាត់ជោគជ័យរបស់សិស្ស</h3>
            <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-top: 0.5rem;">
              <label style="display: flex; align-items: center; gap: 0.65rem; font-size: 0.9rem; color: #e2e8f0;">
                <input type="checkbox" style="width: 18px; height: 18px;">
                <span>ផ្ទាំង Data បង្ហាញរូបតំណាង SharePoint ពណ៌បៃតងក្បែរឈ្មោះ List</span>
              </label>
              <label style="display: flex; align-items: center; gap: 0.65rem; font-size: 0.9rem; color: #e2e8f0;">
                <input type="checkbox" style="width: 18px; height: 18px;">
                <span>គ្មានសញ្ញាឧទានពណ៌លឿង (!) បង្ហាញក្បែរការតភ្ជាប់នោះឡើយ</span>
              </label>
              <label style="display: flex; align-items: center; gap: 0.65rem; font-size: 0.9rem; color: #e2e8f0;">
                <input type="checkbox" style="width: 18px; height: 18px;">
                <span>ការចុចលើ (...) &rarr; "View data" បង្ហាញកំណត់ត្រាគំរូទាំង ៣ របស់អ្នក</span>
              </label>
              <label style="display: flex; align-items: center; gap: 0.65rem; font-size: 0.9rem; color: #e2e8f0;">
                <input type="checkbox" style="width: 18px; height: 18px;">
                <span>ការវាយពាក្យ <code>Apex</code> ក្នុងរបាររូបមន្ត បង្ហាញឈ្មោះតារាងពេញលេញ</span>
              </label>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ដើរមើលក្នុងថ្នាក់ ៖</strong> ដើរត្រួតពិនិត្យមើលអេក្រង់សិស្ស។ ស្វែងរកសិស្សណាដែលច្រឡំជ្រើសរើស Root Company Site ជំនួសឱ្យ Plant 1 Site។</p>`
    },

    // Slide 16: Interactive Widget 2: Live Connection Diagnostics & Ping Tester
    {
      title: "ឧបករណ៍ធ្វើរោគវិនិច្ឆ័យការតភ្ជាប់ និងតេស្តល្បឿន Ping",
      segment: "ផ្នែកទី ៦ &bull; មន្ទីរពិសោធន៍ធ្វើរោគវិនិច្ឆ័យ",
      subtitle: "ដោះស្រាយបញ្ហារអាក់រអួលនៃការតភ្ជាប់ Cloud ការផ្លាស់ប្តូរ Schema និងការ Refresh ទិន្នន័យ។",
      content: `<div class="studio-chrome">
            <div class="studio-chrome-header">
              <span>Diagnostic Controls</span>
              <span>Cloud Ping Tool</span>
            </div>
            <div class="studio-chrome-body">
              <button class="hud-btn" style="width: 100%; margin-bottom: 0.75rem; justify-content: flex-start;" onclick="runDiagAction('ping')">
                &#128225; តេស្តល្បឿន Ping ទៅកាន់ SharePoint API
              </button>
              <button class="hud-btn" style="width: 100%; margin-bottom: 0.75rem; justify-content: flex-start;" onclick="runDiagAction('schema')">
                &#128196; ត្រួតពិនិត្យការស៊ីចង្វាក់នៃជួរឈរ (Schema)
              </button>
              <button class="hud-btn" style="width: 100%; margin-bottom: 0.75rem; justify-content: flex-start;" onclick="runDiagAction('refresh')">
                &#128260; បង្ខំឱ្យ Refresh Data Source ឡើងវិញ
              </button>
              <button class="hud-btn" style="width: 100%; margin-bottom: 0.75rem; justify-content: flex-start; color: #fca5a5;" onclick="runDiagAction('simulate_break')">
                &#9888; ត្រាប់តាមករណីជួបបញ្ហាខូចជួរឈរ
              </button>

              <div style="margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--border-subtle);">
                <span style="font-size: 0.75rem; color: var(--text-muted);">ម៉ាស៊ីនបម្រើការសកម្ម ៖</span>
                <div style="font-family: var(--font-code); font-size: 0.75rem; color: #5eead4; margin-top: 0.2rem;">
                  apexplastics.sharepoint.com
                </div>
              </div>
            </div>
          </div>

          <div class="card" style="background: rgba(12, 19, 31, 0.95); justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
                <span class="card-badge" id="diag-status-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">សុខភាព ៖ ល្អឥតខ្ចោះ (200 OK)</span>
                <span style="font-family: var(--font-code); font-size: 0.78rem; color: #94a3b8;" id="diag-timestamp">ពេលវេលា ៖ 14:22:04 UTC</span>
              </div>
              <h3 style="color: #f8fafc; font-size: 1.15rem; margin-bottom: 0.5rem;" id="diag-title">លទ្ធផលធ្វើរោគវិនិច្ឆ័យប្រព័ន្ធ</h3>
              <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.5;" id="diag-desc">
                ជ្រើសរើសសកម្មភាពវិភាគនៅខាងឆ្វេង ដើម្បីធ្វើតេស្តសុខភាពនៃការប្រាស្រ័យទាក់ទងរវាង App និង Cloud។
              </p>
            </div>

            <div class="diag-console" id="diag-output-console">
              [SYSTEM OK] SharePoint REST endpoint reachable.<br>
              [PING] GET /_api/web/lists/getbytitle('Apex_Maintenance_Requests') -> 38ms<br>
              [AUTH] Bearer token valid for next 7 hours 45 minutes.<br>
              [SCHEMA] 5 columns synced: Title, MachineID, Priority, Status, LoggedDate.
            </div>

            <div style="background: rgba(255, 255, 255, 0.04); border-radius: 0.5rem; padding: 0.75rem; font-size: 0.82rem; color: #cbd5e1;">
              <strong>គន្លឹះវិជ្ជាជីវៈ ៖</strong> នៅពេលណាដែលមាននរណាម្នាក់បន្ថែម ឬប្តូរឈ្មោះជួរឈរក្នុង SharePoint អ្នកត្រូវតែ Right-click លើ Data Source ក្នុង Power Apps រួចចុច <strong>Refresh</strong>!
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការពន្យល់អំពី Refresh ៖</strong> Power Apps មិនបានអង្គុយសួរ SharePoint រាល់វិនាទីថាតើមានជួរឈរថ្មីឬអត់នោះទេ។ បើមេការរបស់អ្នកបន្ថែមជួរឈរ 'Cost' ពេលថ្ងៃត្រង់ អ្នកនឹងមិនឃើញវាទេរហូតដល់អ្នកចុច Refresh!</p>`
    },

    // Slide 17: 5 Dangerous Misconceptions vs. Cloud Reality
    {
      title: "ការយល់ច្រឡំគ្រោះថ្នាក់ ៥ យ៉ាង និងការពិតជាក់ស្តែងលើ Cloud",
      segment: "ផ្នែកទី ៦ &bull; ការកែតម្រូវកំហុស និងការយល់ច្រឡំ",
      subtitle: "ចៀសវាងអន្ទាក់ទាំង ៥ នេះ មុនពេលវាធ្វើឱ្យខូចខាតទិន្នន័យ ឬធ្វើឱ្យ App គាំងដំណើរការ។",
      content: `<div class="card">
            <div style="display: flex; flex-direction: column; gap: 0.85rem;">
              <div style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; padding: 0.75rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5; font-size: 0.88rem;">ការយល់ច្រឡំទី ១ ៖ "ការភ្ជាប់គឺដូចជាការចម្លង (Import) ទិន្នន័យចូលក្នុង App។"</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.2rem 0 0 0;">
                  <strong>ការពិត ៖</strong> មិនពិតទេ! ការភ្ជាប់បង្កើតបានជាបំពង់បង្ហូរផ្ទាល់។ វាមិនបានទាញយកទិន្នន័យមកទុកក្នុងទូរស័ព្ទទេ។ ទិន្នន័យនៅតែរស់នៅលើ SharePoint។
                </p>
              </div>

              <div style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; padding: 0.75rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5; font-size: 0.88rem;">ការយល់ច្រឡំទី ២ ៖ "បើខ្ញុំប្តូរឈ្មោះជួរឈរក្នុង SharePoint នោះ Power Apps នឹងដឹងស្វ័យប្រវត្តិ។"</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.2rem 0 0 0;">
                  <strong>ការពិត ៖</strong> មិនដឹងទេ! Power Apps ចងចាំ Schema ចាស់។ បើអ្នកកែជួរឈរក្នុង SharePoint រូបមន្តរបស់អ្នកនឹងខូចរហូតដល់អ្នកចុច <strong>Refresh</strong>។
                </p>
              </div>

              <div style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; padding: 0.75rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5; font-size: 0.88rem;">ការយល់ច្រឡំទី ៣ ៖ "អ្នកប្រើប្រាស់អាចកែប្រែទិន្នន័យបាន ទោះបីជាពួកគេគ្មានសិទ្ធិក្នុង SharePoint ក៏ដោយ។"</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.2rem 0 0 0;">
                  <strong>ការពិត ៖</strong> Power Apps ប្រើសិទ្ធិ Entra ID របស់អ្នកប្រើ។ បើគ្មានសិទ្ធិ Edit ក្នុង SharePoint ទេ ប៊ូតុង Submit នឹងលោតកំហុស Error ភ្លាមៗ។
                </p>
              </div>
            </div>
          </div>

          <div class="card">
            <div style="display: flex; flex-direction: column; gap: 0.85rem;">
              <div style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; padding: 0.75rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5; font-size: 0.88rem;">ការយល់ច្រឡំទី ៤ ៖ "ការភ្ជាប់ SharePoint អាចដំណើរការ Offline ពេលគ្មានអ៊ីនធឺណិតដោយស្វ័យប្រវត្តិ។"</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.2rem 0 0 0;">
                  <strong>ការពិត ៖</strong> Connector ធម្មតាត្រូវការអ៊ីនធឺណិតដើម្បីទាក់ទង Cloud។ ការប្រើ Offline ទាមទាររូបមន្តផ្ទុកទិន្នន័យក្នុងមូលដ្ឋានដាច់ដោយឡែក។
                </p>
              </div>

              <div style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; padding: 0.75rem; border-radius: 0.4rem;">
                <strong style="color: #fca5a5; font-size: 0.88rem;">ការយល់ច្រឡំទី ៥ ៖ "ខ្ញុំអាចភ្ជាប់ Lists ៥០ ដោយមិនធ្វើឱ្យ App ដំណើរការយឺតឡើយ។"</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin: 0.2rem 0 0 0;">
                  <strong>ការពិត ៖</strong> រាល់ Data Source នីមួយៗសុទ្ធតែត្រូវការការផ្ទៀងផ្ទាត់សិទ្ធិ API ពេលបើក App។ គួរភ្ជាប់តែតារាងណាដែលអេក្រង់នោះត្រូវការប៉ុណ្ណោះ។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>សង្កត់ធ្ងន់លើចំណុចទី ១ ៖</strong> ឱ្យសិស្សកត់ត្រាទុក ៖ 'Connector គឺជាបង្អួចដើម្បីសម្លឹងមើល SharePoint មិនមែនជាវ៉ាលីសសម្រាប់វេចខ្ចប់ទិន្នន័យយកទៅផ្ទះនោះទេ'។</p>`
    },

    // Slide 18: Knowledge Check 1
    {
      title: "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង ៖ តួនាទីស្នូលរបស់ Connector",
      segment: "ផ្នែកទី ៧ &bull; សំណួរផ្ទៀងផ្ទាត់ ១ នៃ ៥",
      subtitle: "សាកល្បងការយល់ដឹងជាមូលដ្ឋានរបស់អ្នកអំពីរបៀបដែល Power Apps ប្រាស្រ័យទាក់ទងជាមួយមូលដ្ឋានទិន្នន័យខាងក្រៅ។",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ១ &bull; និយមន័យស្នូល</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                តើអ្វីជាតួនាទីស្នូលផ្នែកស្ថាបត្យកម្មរបស់ <strong>Connector</strong> នៅក្នុង Microsoft Power Apps?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'A', false, this)">
                  <strong>A.</strong> <span>វាចម្លងជួរទិន្នន័យទាំងអស់ជាអចិន្ត្រៃយ៍ចូលទៅក្នុងការផ្ទុកក្នុងមូលដ្ឋានរបស់ថេប្លេត</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'B', true, this)">
                  <strong>B.</strong> <span>វាដើរតួជាស្ពានបកប្រែដ៏មានសុវត្ថិភាពរវាងរូបមន្ត Power Fx និង Cloud REST APIs</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'C', false, this)">
                  <strong>C.</strong> <span>វាបង្កើតជួរឈរថ្មីដោយស្វ័យប្រវត្តិនៅពេលណាដែលអ្នកប្រើប្រាស់វាយបញ្ចូលអត្ថបទ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'D', false, this)">
                  <strong>D.</strong> <span>វាជំនួសឱ្យតម្រូវការនៃការផ្ទៀងផ្ទាត់សិទ្ធិតាម Microsoft Entra ID</span>
                </button>
              </div>
            </div>

            <div class="quiz-inspector-card" id="quiz-feedback-1">
              <div class="feedback-placeholder">
                <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(20, 184, 166, 0.15); border: 1px solid rgba(20, 184, 166, 0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.85rem auto; font-size: 1.5rem; color: #5eead4;">
                  &quest;
                </div>
                <span class="card-badge" style="background: rgba(20, 184, 166, 0.2); color: #5eead4; margin-bottom: 0.65rem;">ស្ថានភាព ៖ កំពុងរង់ចាំការជ្រើសរើសចម្លើយ</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-bottom: 0.5rem;">ផ្ទាំងវិភាគស្ថាបត្យកម្មផ្ទាល់</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; max-width: 380px; margin: 0 auto;">
                  សូមជ្រើសរើសចម្លើយខាងឆ្វេង (A, B, C ឬ D) ដើម្បីបញ្ជូនចម្លើយរបស់អ្នក និងបើកមើលការពន្យល់ស្ថាបត្យកម្មប្រព័ន្ធ។
                </p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-1" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-1">ស្ថាបត្យកម្មយល់ដឹងបានច្បាស់លាស់!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  ពិតជាត្រឹមត្រូវ! Connector មិនមែនជាអ្នកចម្លង Database ឡើយ។ វាគឺជាអ្នកបកប្រែ ៖ បម្លែងពាក្យបញ្ជា Power Fx (ដូចជា Filter, LookUp, Patch) ឱ្យទៅជាសំណើ API ដែលមានសុវត្ថិភាពសម្រាប់ SharePoint។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ពិនិត្យជម្រើស A ៖</strong> បញ្ជាក់ពីមូលហេតុដែលជម្រើស A ខុស ៖ បើ Power Apps ចម្លង Database ទាំងមូលមកទុកក្នុងថេប្លេត នោះថេប្លេតនឹងពេញទំហំផ្ទុកភ្លាមៗពេលជួបតារាងធំៗ។</p>`
    },

    // Slide 19: Knowledge Check 2
    {
      title: "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង ៖ ហេតុផលស្ថាបត្យកម្ម 'Why'",
      segment: "ផ្នែកទី ៧ &bull; សំណួរផ្ទៀងផ្ទាត់ ២ នៃ ៥",
      subtitle: "ស្វែងយល់ពីមូលហេតុដែលប្រភពទិន្នន័យខាងក្រៅមានសារៈសំខាន់ ជំនួសឱ្យការផ្ទុកទិន្នន័យក្នុងរូបមន្ត។",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ២ &bull; សំណួរស្វែងយល់ហេតុផល 'Why'</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                ហេតុអ្វីបានជាអ្នកអភិវឌ្ឍន៍មិនអាចគ្រាន់តែរក្សាទុកទិន្នន័យស្នើសុំជួសជុលក្នុង Variable ដោយប្រើ <code>Set(varRequest, ...)</code> ជាជាងការភ្ជាប់ SharePoint?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'A', false, this)">
                  <strong>A.</strong> <span>ដោយសារ Variables មិនអាចផ្ទុកអត្ថបទវែងជាង ១០ តួអក្សរបាន</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'B', false, this)">
                  <strong>B.</strong> <span>ដោយសារ Power Apps គិតថ្លៃ ៥ ដុល្លារសម្រាប់រាល់ Variable នីមួយៗ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'C', true, this)">
                  <strong>C.</strong> <span>ដោយសារ Variables គឺជាអង្គចងចាំ RAM បណ្តោះអាសន្ន ហើយនឹងបាត់បង់អស់ពេលបិទ App</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'D', false, this)">
                  <strong>D.</strong> <span>ដោយសារ Variables មិនអាចយកមកបង្ហាញក្នុង Label Control បាន</span>
                </button>
              </div>
            </div>

            <div class="quiz-inspector-card" id="quiz-feedback-2">
              <div class="feedback-placeholder">
                <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(20, 184, 166, 0.15); border: 1px solid rgba(20, 184, 166, 0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.85rem auto; font-size: 1.5rem; color: #5eead4;">
                  &quest;
                </div>
                <span class="card-badge" style="background: rgba(20, 184, 166, 0.2); color: #5eead4; margin-bottom: 0.65rem;">ស្ថានភាព ៖ កំពុងរង់ចាំការជ្រើសរើសចម្លើយ</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-bottom: 0.5rem;">ផ្ទាំងវិភាគស្ថាបត្យកម្មផ្ទាល់</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; max-width: 380px; margin: 0 auto;">
                  សូមជ្រើសរើសចម្លើយខាងឆ្វេង (A, B, C ឬ D) ដើម្បីបញ្ជូនចម្លើយរបស់អ្នក និងបើកមើលការពន្យល់ស្ថាបត្យកម្មប្រព័ន្ធ។
                </p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-2" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-2">ការយល់ដឹងអំពីអង្គចងចាំច្បាស់លាស់!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  ពូកែណាស់! Variables រស់នៅតែក្នុងអង្គចងចាំបណ្តោះអាសន្ននៃទូរស័ព្ទប៉ុណ្ណោះ។ បើ Davi កត់ត្រាក្នុង Variable រួចបិទ App នោះទិន្នន័យនឹងរលាយបាត់អស់។ SharePoint ផ្តល់នូវការផ្ទុកទិន្នន័យអចិន្ត្រៃយ៍ និងចែករំលែករួមគ្នាក្នុងសហគ្រាស។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការតភ្ជាប់ឡើងវិញ ៖</strong> ចំណុចនេះភ្ជាប់ថ្ងៃទី ១៨ (Variables) ទៅនឹងថ្ងៃទី ១៩/២០ (SharePoint)។ សង្កត់ធ្ងន់ជានិច្ចលើភាពខុសគ្នារវាង RAM និង Cloud Disk។</p>`
    },

    // Slide 20: Knowledge Check 3
    {
      title: "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង ៖ ការផ្លាស់ប្តូរ Schema និងការ Refresh",
      segment: "ផ្នែកទី ៧ &bull; សំណួរផ្ទៀងផ្ទាត់ ៣ នៃ ៥",
      subtitle: "តើមានអ្វីកើតឡើងនៅពេលរចនាសម្ព័ន្ធមូលដ្ឋានទិន្នន័យផ្លាស់ប្តូរ បន្ទាប់ពី App របស់អ្នកបានភ្ជាប់រួចហើយ?",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ៣ &bull; ការថែទាំ Schema</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                មេការរោងចក្របានបន្ថែមជួរឈរថ្មីឈ្មោះ <code>EstimatedDowntimeHours</code> ក្នុង SharePoint។ ហេតុអ្វីបានជាវាមិនបង្ហាញក្នុង IntelliSense របស់ Power Apps ភ្លាមៗ?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'A', false, this)">
                  <strong>A.</strong> <span>ដោយសារ Power Apps អនុញ្ញាតឱ្យមានតែ ៥ ជួរឈរប៉ុណ្ណោះក្នុងមួយតារាង</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'B', true, this)">
                  <strong>B.</strong> <span>ដោយសារ Studio រក្សាទុក Schema ចាស់; អ្នកត្រូវ Right-click លើ Data Source រួចចុច "Refresh"</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'C', false, this)">
                  <strong>C.</strong> <span>ដោយសារជួរឈរថ្មីត្រូវការពេល ៤៨ ម៉ោងដើម្បីបញ្ជូនពាសពេញ Microsoft 365</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'D', false, this)">
                  <strong>D.</strong> <span>ដោយសារអ្នកត្រូវតែលុប App ចោល ហើយសាងសង់វាឡើងវិញពីដំបូង</span>
                </button>
              </div>
            </div>

            <div class="quiz-inspector-card" id="quiz-feedback-3">
              <div class="feedback-placeholder">
                <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(20, 184, 166, 0.15); border: 1px solid rgba(20, 184, 166, 0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.85rem auto; font-size: 1.5rem; color: #5eead4;">
                  &quest;
                </div>
                <span class="card-badge" style="background: rgba(20, 184, 166, 0.2); color: #5eead4; margin-bottom: 0.65rem;">ស្ថានភាព ៖ កំពុងរង់ចាំការជ្រើសរើសចម្លើយ</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-bottom: 0.5rem;">ផ្ទាំងវិភាគស្ថាបត្យកម្មផ្ទាល់</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; max-width: 380px; margin: 0 auto;">
                  សូមជ្រើសរើសចម្លើយខាងឆ្វេង (A, B, C ឬ D) ដើម្បីបញ្ជូនចម្លើយរបស់អ្នក និងបើកមើលការពន្យល់ស្ថាបត្យកម្មប្រព័ន្ធ។
                </p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-3" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-3">ការធ្វើសមកាលកម្ម Schema ច្បាស់លាស់!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  ពិតជាត្រឹមត្រូវ! Power Apps រក្សាទុកទិន្នន័យ Schema មួយភ្លែតដើម្បីបង្កើនល្បឿនដំណើរការ។ នៅពេល Schema ក្នុង SharePoint ផ្លាស់ប្តូរ ការចុច <strong>Refresh</strong> ដោយផ្ទាល់ដៃនឹងបង្ខំឱ្យ Studio ទាញយករចនាសម្ព័ន្ធជួរឈរថ្មី។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ទម្លាប់ស្តង់ដារមាស ៖</strong> នៅពេលណាដែលអ្នកកែប្រែ SharePoint ទម្លាប់បន្ទាប់របស់អ្នកក្នុង Power Apps គឺ ៖ Right click -> Refresh។ កុំភ្លេចទម្លាប់នេះឱ្យសោះ!</p>`
    },

    // Slide 21: Knowledge Check 4
    {
      title: "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង ៖ សុវត្ថិភាព និងសិទ្ធិប្រើប្រាស់",
      segment: "ផ្នែកទី ៧ &bull; សំណួរផ្ទៀងផ្ទាត់ ៤ នៃ ៥",
      subtitle: "ស្វែងយល់ពីរបៀបដែលអត្តសញ្ញាណសហគ្រាសគ្រប់គ្រងការចូលប្រើប្រាស់ទិន្នន័យឆ្លងកាត់ Connector។",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ៤ &bull; គំរូសុវត្ថិភាព</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                ប្រសិនបើកម្មករបណ្តោះអាសន្នម្នាក់ត្រូវបានផ្តល់សិទ្ធិឱ្យប្រើ Power App ប៉ុន្តែគណនីក្រុមហ៊ុនរបស់គាត់ <strong>គ្មានសិទ្ធិ</strong> ក្នុង SharePoint List ទេ តើមានអ្វីកើតឡើង?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'A', false, this)">
                  <strong>A.</strong> <span>Power Apps នឹងរំលងសិទ្ធិ SharePoint ហើយអនុញ្ញាតឱ្យគាត់កែប្រែបានធម្មតា</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'B', false, this)">
                  <strong>B.</strong> <span>App នឹងទាមទារឱ្យគាត់វាយបញ្ចូល Password របស់អ្នកគ្រប់គ្រង IT</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'C', true, this)">
                  <strong>C.</strong> <span>SharePoint នឹងបដិសេធការចូលប្រើ ហើយ Power Apps នឹងបង្ហាញកំហុសសិទ្ធិ (Authorization Error)</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'D', false, this)">
                  <strong>D.</strong> <span>ថេប្លេតរបស់កម្មករនោះនឹងលុបកម្មវិធី App ចោលដោយស្វ័យប្រវត្តិ</span>
                </button>
              </div>
            </div>

            <div class="quiz-inspector-card" id="quiz-feedback-4">
              <div class="feedback-placeholder">
                <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(20, 184, 166, 0.15); border: 1px solid rgba(20, 184, 166, 0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.85rem auto; font-size: 1.5rem; color: #5eead4;">
                  &quest;
                </div>
                <span class="card-badge" style="background: rgba(20, 184, 166, 0.2); color: #5eead4; margin-bottom: 0.65rem;">ស្ថានភាព ៖ កំពុងរង់ចាំការជ្រើសរើសចម្លើយ</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-bottom: 0.5rem;">ផ្ទាំងវិភាគស្ថាបត្យកម្មផ្ទាល់</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; max-width: 380px; margin: 0 auto;">
                  សូមជ្រើសរើសចម្លើយខាងឆ្វេង (A, B, C ឬ D) ដើម្បីបញ្ជូនចម្លើយរបស់អ្នក និងបើកមើលការពន្យល់ស្ថាបត្យកម្មប្រព័ន្ធ។
                </p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-4" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-4">សុវត្ថិភាពសហគ្រាសយល់បានច្បាស់!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  ពិតប្រាកដណាស់! Power Apps ប្រើប្រាស់សិទ្ធិរបស់បុគ្គលដែលបាន Login ជាក់ស្តែង។ វាមិនអាចផ្តល់សិទ្ធិខ្ពស់ជាងអ្វីដែលបុគ្គលនោះមានក្នុង SharePoint ឡើយ។ សុវត្ថិភាពត្រូវបានការពារយ៉ាងរឹងមាំនៅកម្រិតមូលដ្ឋានទិន្នន័យជានិច្ច!
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ច្បាប់សំខាន់ ៖</strong> ការ Share Power App ទៅកាន់នរណាម្នាក់ មិនមែនមានន័យថា Share SharePoint List ដោយស្វ័យប្រវត្តិនោះទេ! អ្នកត្រូវតែ Share ទាំង App និងផ្តល់សិទ្ធិ Read/Write លើ List ផងដែរ។</p>`
    },

    // Slide 22: Knowledge Check 5
    {
      title: "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង ៖ ការដោះស្រាយបញ្ហាសញ្ញាព្រមានពណ៌លឿង",
      segment: "ផ្នែកទី ៧ &bull; សំណួរផ្ទៀងផ្ទាត់ ៥ នៃ ៥",
      subtitle: "ការធ្វើរោគវិនិច្ឆ័យ និងដោះស្រាយបញ្ហាសញ្ញាត្រីកោណព្រមានពណ៌លឿងក្នុងផ្ទាំងទិន្នន័យ។",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ៥ &bull; ការដោះស្រាយបញ្ហាជាក់ស្តែង</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                សញ្ញាត្រីកោណព្រមានពណ៌លឿងមួយបានលេចឡើងក្បែរការតភ្ជាប់ SharePoint ក្នុង Studio ហើយរូបមន្តបង្ហាញបន្ទាត់រលកក្រហម។ តើអ្វីជាជំហានដំបូងដ៏គួរឱ្យទុកចិត្តបំផុតដើម្បីដោះស្រាយ?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(5, 'A', false, this)">
                  <strong>A.</strong> <span>Restart កុំព្យូទ័ររបស់អ្នក ហើយទិញថេប្លេតថ្មីមួយទៀត</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(5, 'B', true, this)">
                  <strong>B.</strong> <span>ចុចលើចុចបី (...) ក្បែរ Data Source &rarr; ចុច "Refresh" ឬ Remove រួច Add ការតភ្ជាប់ឡើងវិញ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(5, 'C', false, this)">
                  <strong>C.</strong> <span>កែប្រែគ្រប់រូបមន្តរបស់អ្នកឱ្យប្រើលេខជំនួសឱ្យអត្ថបទ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(5, 'D', false, this)">
                  <strong>D.</strong> <span>ប្តូរឈ្មោះ SharePoint List ទៅជា "Database1"</span>
                </button>
              </div>
            </div>

            <div class="quiz-inspector-card" id="quiz-feedback-5">
              <div class="feedback-placeholder">
                <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(20, 184, 166, 0.15); border: 1px solid rgba(20, 184, 166, 0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.85rem auto; font-size: 1.5rem; color: #5eead4;">
                  &quest;
                </div>
                <span class="card-badge" style="background: rgba(20, 184, 166, 0.2); color: #5eead4; margin-bottom: 0.65rem;">ស្ថានភាព ៖ កំពុងរង់ចាំការជ្រើសរើសចម្លើយ</span>
                <h4 style="color: #f8fafc; font-size: 1.05rem; margin-bottom: 0.5rem;">ផ្ទាំងវិភាគស្ថាបត្យកម្មផ្ទាល់</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; max-width: 380px; margin: 0 auto;">
                  សូមជ្រើសរើសចម្លើយខាងឆ្វេង (A, B, C ឬ D) ដើម្បីបញ្ជូនចម្លើយរបស់អ្នក និងបើកមើលការពន្យល់ស្ថាបត្យកម្មប្រព័ន្ធ។
                </p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-5" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-5">ជំនាញដោះស្រាយបញ្ហាត្រឹមត្រូវឥតខ្ចោះ!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  ល្អឥតខ្ចោះ! សញ្ញាត្រីកោណព្រមានពណ៌លឿងភាគច្រើនកើតឡើងដោយសារតែកូដ Token ផ្ទៀងផ្ទាត់សិទ្ធិផុតកំណត់ ឬ Schema មិនស៊ីចង្វាក់គ្នា។ ការចុច Refresh ឬ Remove ហើយ Add ឡើងវិញអាចដោះស្រាយបញ្ហា ៩៩% បានភ្លាមៗ។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>កុំស្លន់ស្លោ ៖</strong> ពេលសិស្សឃើញសញ្ញាពណ៌លឿង ឬបន្ទាត់រលកក្រហម ពួកគេតែងតែភ័យស្លន់ស្លោ។ រំលឹកពួកគេ ៖ ការតភ្ជាប់គ្រាន់តែងងុយដេកប៉ុណ្ណោះ។ ការ Refresh មួយភ្លែតនឹងដាស់វាឱ្យភ្ញាក់ឡើងវិញ។</p>`
    },

    // Slide 23: Final Capstone Challenge
    {
      title: "ការវាយតម្លៃចុងក្រោយ ៖ ស្ថាបត្យកម្មតភ្ជាប់ពហុប្រភពក្នុងរោងចក្រ",
      segment: "ផ្នែកទី ៧ &bull; ការវាយតម្លៃជាក់ស្តែង",
      subtitle: "រៀបចំរចនាសម្ព័ន្ធតភ្ជាប់ទាំងមូលសម្រាប់ប្រព័ន្ធគ្រប់គ្រងការជួសជុលរបស់រោងចក្រ Apex Plastics។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(20, 184, 166, 0.2); color: #5eead4;">សេណារីយ៉ូពង្រីករោងចក្រ</span>
            <h3 class="card-title">បញ្ហាប្រឈមនៃប្រតិបត្តិការរោងចក្រ</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; margin-bottom: 1rem;">
              រោងចក្រ Apex Plastics កំពុងពង្រីកសាខា។ ក្រៅពី <code>Apex_Maintenance_Requests</code> មេការរោងចក្របានស្នើឱ្យអ្នកភ្ជាប់ SharePoint Lists ចំនួនពីរទៀតចូលក្នុង App តែមួយ ៖
            </p>
            <div style="display: flex; flex-direction: column; gap: 0.65rem;">
              <div style="background: rgba(255, 255, 255, 0.04); padding: 0.75rem; border-radius: 0.4rem; border-left: 3px solid #3b82f6;">
                <strong style="color: #93c5fd; font-size: 0.85rem;">១. Machine_Master_Directory ៖</strong>
                <p style="color: var(--text-muted); font-size: 0.8rem; margin-top: 0.2rem;">ផ្ទុកលេខសម្គាល់ម៉ាស៊ីន លេខស៊េរី ឆ្នាំផលិត និងទីតាំងដំឡើង។</p>
              </div>
              <div style="background: rgba(255, 255, 255, 0.04); padding: 0.75rem; border-radius: 0.4rem; border-left: 3px solid #10b981;">
                <strong style="color: #86efac; font-size: 0.85rem;">២. Technician_Skill_Roster ៖</strong>
                <p style="color: var(--text-muted); font-size: 0.8rem; margin-top: 0.2rem;">ផ្ទុកបញ្ជីឈ្មោះជាងដែលមានវិញ្ញាបនបត្រ ម៉ោងវេនធ្វើការ និងជំនាញអគ្គិសនី/ធារាសាស្ត្រ។</p>
              </div>
            </div>
          </div>

          <div class="card" style="border-left: 3px solid var(--color-primary-light);">
            <span class="card-badge" style="background: rgba(20, 184, 166, 0.2); color: #5eead4;">តារាងពិន្ទុវាយតម្លៃ ១០០ ពិន្ទុ</span>
            <h3 class="card-title">ប្លង់ដំណោះស្រាយស្ថាបត្យកម្ម</h3>
            <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.4rem;">
                <span style="font-size: 0.85rem; color: #cbd5e1;">A. បើកផ្ទាំង Data និងបន្ថែម SharePoint Connector</span>
                <span style="font-family: var(--font-code); color: #5eead4; font-weight: bold;">២៥ ពិន្ទុ</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.4rem;">
                <span style="font-size: 0.85rem; color: #cbd5e1;">B. ភ្ជាប់ Lists ទាំង ៣ នៅក្រោម Site រោងចក្រតែមួយ</span>
                <span style="font-family: var(--font-code); color: #5eead4; font-weight: bold;">២៥ ពិន្ទុ</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.4rem;">
                <span style="font-size: 0.85rem; color: #cbd5e1;">C. ផ្ទៀងផ្ទាត់ Schema Autocomplete ក្នុង Formula Bar</span>
                <span style="font-family: var(--font-code); color: #5eead4; font-weight: bold;">២៥ ពិន្ទុ</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 0.4rem;">
                <span style="font-size: 0.85rem; color: #cbd5e1;">D. ដំណើរការ Refresh Diagnostics និងពិនិត្យទិន្នន័យ</span>
                <span style="font-family: var(--font-code); color: #5eead4; font-weight: bold;">២៥ ពិន្ទុ</span>
              </div>
            </div>
            <div style="margin-top: auto; padding-top: 1rem; color: #86efac; font-weight: 700; font-size: 0.9rem;">
              ពិន្ទុសរុប ៖ ១០០/១០០ &bull; វិញ្ញាបនបត្រស្ថាបត្យករទិន្នន័យសហគ្រាស
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការបញ្ចប់បញ្ហាប្រឈម ៖</strong> អបអរសាទរសិស្សទាំងអស់ក្នុងថ្នាក់។ ពួកគេបានភ្ជាប់មូលដ្ឋានទិន្នន័យ Cloud របស់សហគ្រាសទៅកាន់ App ផ្នែកខាងមុខជាផ្លូវការហើយ។</p>`
    },

    // Slide 24: Bridge Forward to Day 21
    {
      title: "ផែនទីតភ្ជាប់ និងស្ពានចម្លងឆ្ពោះទៅកាន់ថ្ងៃទី ២១",
      segment: "ផ្នែកទី ៨ &bull; គោលដៅបន្ទាប់",
      subtitle: "បំពង់ទឹកត្រូវបានដំឡើងរួចរាល់ហើយ។ ថ្ងៃស្អែក យើងនឹងបើកវ៉ានទឹកដើម្បីបង្ហាញកំណត់ត្រារាប់រយជួរ!",
      content: `<div class="card" style="border-left: 3px solid #3b82f6;">
            <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">ខ្សែសង្វាក់ដែលបានសម្រេច</span>
            <h3 class="card-title">សមិទ្ធផលដែលយើងសម្រេចបានថ្ងៃនេះ</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
              យើងបានយល់ច្បាស់ពី Connector ភ្ជាប់ <code>Apex_Maintenance_Requests</code> ផ្ទៀងផ្ទាត់តាម Entra ID ពិនិត្យភាពវៃឆ្លាតរបស់ Schema និងស្ទាត់ជំនាញក្នុងការ Refresh ទិន្នន័យ។
            </p>
            <div style="margin-top: auto; padding-top: 1rem; color: #60a5fa; font-weight: 700; font-size: 0.85rem;">
              &check; បំពង់បង្ហូរទិន្នន័យផ្ទាល់ត្រូវបានបើកដំណើរការ!
            </div>
          </div>

          <div class="card" style="border-left: 3px solid #f59e0b;">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">បញ្ហាប្រឈមដែលកំពុងរង់ចាំ</span>
            <h3 class="card-title">ឧបសគ្គនៃការបង្ហាញកំណត់ត្រាតែមួយ</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
              Label Control មួយអាចបង្ហាញអត្ថបទបានតែមួយជួរប៉ុណ្ណោះ។ ប៉ុន្តែ SharePoint List របស់យើងមានរហូតដល់ ១៥០ ករណី! តើអេក្រង់ទូរស័ព្ទអាចបង្ហាញ ១៥០ ជួរផ្សេងគ្នាដោយរបៀបណាដោយមិនគាំង?
            </p>
            <div style="margin-top: auto; padding-top: 1rem; color: #fcd34d; font-weight: 700; font-size: 0.85rem;">
              ? តើត្រូវបង្ហាញជួរដដែលៗដោយរបៀបណា?
            </div>
          </div>

          <div class="card" style="border-left: 3px solid var(--color-primary-light); background: rgba(20, 184, 166, 0.1);">
            <span class="card-badge" style="background: rgba(20, 184, 166, 0.25); color: #5eead4;">ថ្ងៃស្អែក ៖ ថ្ងៃទី ២១</span>
            <h3 class="card-title">Galleries ៖ ការបង្ហាញកំណត់ត្រាច្រើន</h3>
            <p style="color: var(--text-main); font-size: 0.85rem; line-height: 1.6;">
              ថ្ងៃស្អែក យើងនឹងណែនាំ <strong>Gallery Control</strong>។ យើងនឹងកំណត់ property <code>Items</code> របស់វាទៅកាន់ <code>Apex_Maintenance_Requests</code> ហើយទស្សនាជួរទិន្នន័យ ១៥០ ជួររត់មកបង្ហាញដោយស្វ័យប្រវត្តិជាមួយរូបភាព និងពណ៌ស្ថានភាព!
            </p>
            <div style="margin-top: auto; padding-top: 1rem; color: #5eead4; font-weight: 700; font-size: 0.85rem;">
              &rarr; ថ្ងៃទី ២១ ៖ បញ្ជីទិន្នន័យវិលជុំបែបមើលឃើញ
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ស្ពានឆ្ពោះទៅមុខ (២ នាទី) ៖</strong> ដកដង្ហើមវែងៗ! អ្នកបានសាងសង់បំពង់បង្ហូរទឹកនៅថ្ងៃនេះ។ ថ្ងៃស្អែកលើថ្ងៃទី ២១ យើងនឹងបើកវ៉ានទឹក ហើយបង្ហូរទិន្នន័យចូលទៅក្នុង Gallery ដ៏ស្រស់ស្អាត។ ជួបគ្នានៅថ្ងៃស្អែក!</p>`
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
      const notesEl = slide.querySelector('aside.trainer-notes');

      if (headerTitle && data.title) headerTitle.innerHTML = data.title;
      if (headerSubtitle && data.subtitle) headerSubtitle.innerHTML = data.subtitle;
      if (sectionTag && data.segment) sectionTag.innerHTML = data.segment;
      if (contentEl && data.content) contentEl.innerHTML = data.content;
      if (notesEl && data.notes) notesEl.innerHTML = data.notes;
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
  // 10. INTERACTIVE WIDGET 1: STUDIO DATA BRIDGE SIMULATOR (SLIDE 13)
  // --------------------------------------------------------------------------
  window.selectSimTab = function (tab) {
    const items = document.querySelectorAll('.studio-nav-item');
    items.forEach(item => item.classList.remove('active'));

    const activeItem = document.getElementById('sim-data-nav');
    if (activeItem && tab === 'data') activeItem.classList.add('active');

    const log = document.getElementById('sim-diag-log');
    if (log) {
      log.innerHTML += `<br>&gt; Switched navigation context to: [${tab.toUpperCase()}]`;
      log.scrollTop = log.scrollHeight;
    }
  };

  window.runSimConnection = function () {
    const log = document.getElementById('sim-diag-log');
    const badge = document.getElementById('sim-status-badge');
    const preview = document.getElementById('sim-code-preview');
    const site = document.getElementById('sim-site-select');

    if (!log || !badge) return;

    const siteName = site ? site.options[site.selectedIndex].text : 'Apex Manufacturing Plant 1';

    badge.style.background = 'rgba(245, 158, 11, 0.2)';
    badge.style.color = '#fbbf24';
    badge.textContent = isKhmerActive ? 'ស្ថានភាព ៖ កំពុងផ្ទៀងផ្ទាត់សិទ្ធិ...' : 'Status: Authenticating...';

    log.innerHTML += `<br>&gt; Connecting to SharePoint Site: "${siteName}"...`;
    log.innerHTML += `<br>&gt; Validating Microsoft Entra ID claims ticket... [PASS]`;
    log.scrollTop = log.scrollHeight;

    setTimeout(() => {
      log.innerHTML += `<br>&gt; Fetching list definitions from: /_api/web/lists... [200 OK]`;
      log.innerHTML += `<br>&gt; Found target list: [Apex_Maintenance_Requests]`;
      log.innerHTML += `<br>&gt; Downloading column schema definitions...`;
      log.innerHTML += `<br>&gt; Generating Power Fx table metadata symbol... [DONE]`;
      log.scrollTop = log.scrollHeight;

      badge.style.background = 'rgba(16, 185, 129, 0.2)';
      badge.style.color = '#86efac';
      badge.textContent = isKhmerActive ? 'ស្ថានភាព ៖ បានភ្ជាប់ដោយជោគជ័យ' : 'Status: Connected & Synchronized';

      if (preview) {
        preview.style.color = '#86efac';
        preview.textContent = 'Apex_Maintenance_Requests.Priority.Value';
      }
    }, 1200);
  };

  // --------------------------------------------------------------------------
  // 11. INTERACTIVE WIDGET 2: DIAGNOSTICS & PING TESTER (SLIDE 16)
  // --------------------------------------------------------------------------
  window.runDiagAction = function (action) {
    const consoleEl = document.getElementById('diag-output-console');
    const badge = document.getElementById('diag-status-badge');
    const timestamp = document.getElementById('diag-timestamp');

    if (!consoleEl || !badge) return;

    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0] + ' UTC';
    if (timestamp) timestamp.textContent = `Time: ${timeStr}`;

    switch (action) {
      case 'ping':
        badge.style.background = 'rgba(16, 185, 129, 0.2)';
        badge.style.color = '#86efac';
        badge.textContent = 'Health: Optimal (200 OK)';
        consoleEl.innerHTML = `[${timeStr}] PING test initiated to apexplastics.sharepoint.com...<br>` +
          `[${timeStr}] TLS 1.3 encrypted handshake established in 14ms.<br>` +
          `[${timeStr}] HTTP GET /_api/web/lists/getbytitle('Apex_Maintenance_Requests') -> 32ms.<br>` +
          `[${timeStr}] Overall health: 100% operational. No latency spikes detected.`;
        break;

      case 'schema':
        badge.style.background = 'rgba(20, 184, 166, 0.2)';
        badge.style.color = '#5eead4';
        badge.textContent = 'Schema: Synchronized';
        consoleEl.innerHTML = `[${timeStr}] Validating cached schema vs live SharePoint table definition...<br>` +
          `[${timeStr}] Column 'Title' -> Single line of text (Power Fx: Text) [MATCH]<br>` +
          `[${timeStr}] Column 'MachineID' -> Single line of text (Power Fx: Text) [MATCH]<br>` +
          `[${timeStr}] Column 'Priority' -> Choice (Power Fx: OptionSet) [MATCH]<br>` +
          `[${timeStr}] Column 'Status' -> Choice (Power Fx: OptionSet) [MATCH]<br>` +
          `[${timeStr}] Column 'LoggedDate' -> DateTime (Power Fx: DateTime) [MATCH]<br>` +
          `[${timeStr}] All 5 columns perfectly aligned with Power Apps Studio.`;
        break;

      case 'refresh':
        badge.style.background = 'rgba(59, 130, 246, 0.2)';
        badge.style.color = '#93c5fd';
        badge.textContent = 'Refreshing Metadata...';
        consoleEl.innerHTML = `[${timeStr}] Re-querying Microsoft 365 metadata endpoints...<br>` +
          `[${timeStr}] Invalidating local schema cache...<br>` +
          `[${timeStr}] Re-building IntelliSense autocomplete dictionary...<br>` +
          `[${timeStr}] Refresh complete! Table symbol 'Apex_Maintenance_Requests' updated.`;
        setTimeout(() => {
          badge.style.background = 'rgba(16, 185, 129, 0.2)';
          badge.style.color = '#86efac';
          badge.textContent = 'Health: Optimal (Refreshed)';
        }, 800);
        break;

      case 'simulate_break':
        badge.style.background = 'rgba(239, 68, 68, 0.2)';
        badge.style.color = '#fca5a5';
        badge.textContent = 'Warning: Schema Mismatch (!)';
        consoleEl.innerHTML = `[${timeStr}] [ALERT] Detected cloud schema modification outside Studio!<br>` +
          `[${timeStr}] SharePoint column 'UrgencyLevel' was deleted or renamed.<br>` +
          `[${timeStr}] Warning: Formulas referencing 'UrgencyLevel' will produce red errors.<br>` +
          `[${timeStr}] RESOLUTION: Click 'Force Data Source Refresh' to synchronize schema.`;
        break;
    }

    consoleEl.scrollTop = consoleEl.scrollHeight;
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
  // 13.5 GLOBAL WINDOW EXPORTS (Ensures Instant Inline onclick Functionality)
  // --------------------------------------------------------------------------
  window.prevSlide = prevSlide;
  window.nextSlide = nextSlide;
  window.showSlide = showSlide;
  window.toggleLanguage = toggleLanguage;
  window.toggleLaser = toggleLaser;
  window.toggleNotes = toggleNotes;
  window.toggleOverview = toggleOverview;
  window.toggleTimer = toggleTimer;
  window.toggleFullscreen = function () {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };
  window.handleKeyDown = handleKeyDown;

  // Immediately attach keydown listener
  window.addEventListener('keydown', handleKeyDown);

  // --------------------------------------------------------------------------
  // 14. INITIALIZATION
  // --------------------------------------------------------------------------
  function init() {
    // HUD Button Listeners
    document.getElementById('btn-prev')?.addEventListener('click', prevSlide);
    document.getElementById('btn-next')?.addEventListener('click', nextSlide);
    document.getElementById('btn-lang')?.addEventListener('click', toggleLanguage);
    document.getElementById('btn-laser')?.addEventListener('click', toggleLaser);
    document.getElementById('btn-notes')?.addEventListener('click', toggleNotes);
    document.getElementById('btn-overview')?.addEventListener('click', toggleOverview);
    document.getElementById('btn-timer')?.addEventListener('click', toggleTimer);
    document.getElementById('btn-fullscreen')?.addEventListener('click', window.toggleFullscreen);

    document.getElementById('notes-close-btn')?.addEventListener('click', toggleNotes);
    document.getElementById('overview-close-btn')?.addEventListener('click', toggleOverview);

    initPointerAndSpotlight();
    showSlide(0);
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
