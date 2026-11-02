/* ============================================================================
   DAY 26: BUILD THE COMPLETE CONNECTED APP + POWER AUTOMATE EXTENSION
   Presentation Engine: Verified zero syntax errors
   Includes: 24 Bilingual Slides (EN ⟷ KH Full Content Replacement),
   Interactive 7-Step Pipeline Simulator, 5-Question Dual-State Quiz,
   Trainer Notes Drawer, and 24-Slide Overview Modal
   ============================================================================ */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------------------------------------
  let currentSlideIndex = 0;
  let isKhmerActive = false;
  let isLaserActive = true;
  let isNotesOpen = false;
  let isOverviewOpen = false;
  let timerInterval = null;
  let timerSecondsRemaining = 90 * 60; // 90:00

  const totalSlides = 24;

  // Cached English Slide Originals (Captured on Initial DOM Load)
  let ENGLISH_SLIDES = [];

  // --------------------------------------------------------------------------
  // 1. KHMER BILINGUAL DICTIONARY (24 SLIDES WITH FULL CONTENT & NOTES)
  // --------------------------------------------------------------------------
  const KHMER_SLIDES = [
    // Slide 1 (Index 0): Hero Title & Mental Model
    {
      title: "ការបង្កើតប្រព័ន្ធកម្មវិធីតភ្ជាប់ពេញលេញ (Connected App)",
      segment: "ដំណាក់កាលទី ៨ ៖ សំយោគគម្រោង &amp; ស្វ័យប្រវត្តិកម្ម",
      subtitle: "ការរួមបញ្ចូលគំនិតទាំងអស់ទៅជាប្រព័ន្ធរស់រវើកតែមួយ មិនមែនជាមុខងារដាច់ដោយឡែកនោះឡើយ។ ការតភ្ជាប់ ៣ អេក្រង់ និងការដាស់ប្រព័ន្ធជូនដំណឹង Cloud តាម Power Automate។",
      content: `<div class="hero-badge">
            <span>កម្មវិធីសិក្សា Microsoft Power Apps</span>
            <span>&bull;</span>
            <span>ថ្ងៃទី ២៦ នៃ ២៧</span>
          </div>
          <h1 class="hero-title">ការបង្កើតប្រព័ន្ធកម្មវិធីតភ្ជាប់ពេញលេញ</h1>
          <p class="hero-subtitle">
            ការរួមបញ្ចូលគំនិតទាំងអស់ទៅជាប្រព័ន្ធរស់រវើកតែមួយ មិនមែនជាមុខងារដាច់ដោយឡែកនោះឡើយ។ ការតភ្ជាប់ ៣ អេក្រង់ និងការដាស់ប្រព័ន្ធជូនដំណឹង Cloud តាម Power Automate។
          </p>

          <div class="model-chain">
            <span class="chain-item">ទំព័រដើម</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item active">បង្កើតថ្មី</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item active">ការផ្ទៀងផ្ទាត់</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">រក្សាទុក</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">SharePoint</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item flow">Flow Trigger</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item flow">សារអ៊ីមែល</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">លម្អិត / កែប្រែ</span>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការបើកមេរៀន (២ នាទី) ៖</strong> "សូមស្វាគមន៍មកកាន់ថ្ងៃទី ២៦! រយៈពេល ២៥ ថ្ងៃកន្លងមក អ្នកបានរៀនឧបករណ៍ដាច់ដោយឡែកពីគ្នា ៖ ប៊ូតុង រូបមន្ត បញ្ជី SharePoint ផ្ទាំង Gallery ទម្រង់ Form និងប្លង់ស្ថាបត្យកម្ម។ ថ្ងៃនេះ យើងមិនបង្កើតប៊ូតុងឯកោទៀតទេ។ ថ្ងៃនេះ យើងដាស់ប្រព័ន្ធរោងចក្រទាំងមូលឱ្យមានជីវិត!"</p>
<p><strong>ខ្សែសង្វាក់គំនិតស្នូល ៖</strong> ដើរកាត់ខ្សែសង្វាក់ម៉ូដែល ៖ ទំព័រដើម ➔ បង្កើតថ្មី ➔ ផ្ទៀងផ្ទាត់ ➔ រក្សាទុក ➔ SharePoint ➔ Flow Trigger ➔ សារអ៊ីមែល ➔ លម្អិត/កែប្រែ។ ពន្យល់ថាកម្មវិធីសហគ្រាសតភ្ជាប់មនុស្ស មូលដ្ឋានទិន្នន័យលើ Cloud និងប្រព័ន្ធស្វ័យប្រវត្តិកម្មយ៉ាងរលូន។</p>`
    },

    // Slide 2 (Index 1): Agenda & Objectives
    {
      title: "របៀបវារៈ ៩០ នាទី និងគោលបំណងរៀនសូត្រច្បាស់លាស់",
      segment: "ផ្នែកទី ១ &bull; កាលវិភាគ និងលទ្ធផលរំពឹងទុក",
      subtitle: "រចនាសម្ព័ន្ធបង្រៀនជាវង់ (Spiral Learning) ៖ ការសំយោគគ្រប់ស្រទាប់បច្ចេកទេសទាំងអស់ឱ្យទៅជាប្រព័ន្ធផលិតកម្មតែមួយ។",
      content: `<div class="card">
            <h3 class="card-title">🎯 គោលបំណងស្នូលទាំង ៥ សម្រាប់ថ្ងៃនេះ</h3>
            <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem;">
              <div style="display: flex; gap: 0.65rem;">
                <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">1</span>
                <div><strong>តភ្ជាប់ការប្តូររវាងអេក្រង់ទាំង ៣ (Navigation) ៖</strong> ភ្ជាប់ Home ➔ New ➔ Detail/Edit ជាមួយការរុករកទៅមុខ ថយក្រោយ និងបោះបង់។</div>
              </div>
              <div style="display: flex; gap: 0.65rem;">
                <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">2</span>
                <div><strong>អនុវត្តការផ្ទៀងផ្ទាត់កម្រិតសហគ្រាស ៖</strong> ចាក់សោប៊ូតុង Submit ដោយប្រើ <code>IsBlank()</code> និងបញ្ជូនលទ្ធផលតាម <code>OnSuccess</code>។</div>
              </div>
              <div style="display: flex; gap: 0.65rem;">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">3</span>
                <div><strong>រៀបចំប្រព័ន្ធចម្រោះ Gallery ស្វ័យប្រវត្តិ ៖</strong> រួមបញ្ចូល <code>Search()</code> និង <code>Filter()</code> ដើម្បីស្វែងរកតាមម៉ាស៊ីន និងពាក្យគន្លឹះ។</div>
              </div>
              <div style="display: flex; gap: 0.65rem;">
                <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc;">4</span>
                <div><strong>បង្កើត Cloud Flow ២ ជំហាន ៖</strong> បង្កើតប្រព័ន្ធស្វ័យប្រវត្តិកម្មពី SharePoint Trigger ទៅកាន់សារអ៊ីមែល Outlook។</div>
              </div>
              <div style="display: flex; gap: 0.65rem;">
                <span class="card-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">5</span>
                <div><strong>ស្ទាត់ជំនាញដោះស្រាយបញ្ហា ៣ កម្រិត ៖</strong> វិភាគដឹងភ្លាមៗរវាងកំហុសរក្សាទុក App, ការយឺតយ៉ាវ Trigger, ឬការបរាជ័យបញ្ជូនអ៊ីមែល។</div>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">⏱️ កាលវិភាគលម្អិត ៩០ នាទី</h3>
            <div style="display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.85rem; margin-top: 0.35rem;">
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.3rem;">
                <span style="color: #67e8f9; font-weight: bold;">00 - 10 នាទី</span>
                <span><strong>រំលឹក និងតភ្ជាប់ ៖</strong> ពិនិត្យប្លង់មេថ្ងៃទី ២៥ + សំណួររំលឹក ៣</span>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.3rem;">
                <span style="color: #fcd34d; font-weight: bold;">10 - 20 នាទី</span>
                <span><strong>វិបត្តិជាក់ស្តែង ៖</strong> មហន្តរាយកោះមុខងារឯកោ $32,000 + ឧទាហរណ៍ភីហ្សា</span>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.3rem;">
                <span style="color: #86efac; font-weight: bold;">20 - 35 នាទី</span>
                <span><strong>ការបង្ហាញ App ៖</strong> តភ្ជាប់ ៣ អេក្រង់ + ការផ្ទៀងផ្ទាត់ &amp; OnSuccess Hooks</span>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.3rem;">
                <span style="color: #c084fc; font-weight: bold;">35 - 45 នាទី</span>
                <span><strong>ការបង្ហាញ Flow ៖</strong> បង្កើត Automated Cloud Flow ២ ជំហាន</span>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.3rem;">
                <span style="color: #67e8f9; font-weight: bold;">45 - 60 នាទី</span>
                <span><strong>ការអនុវត្តមានការណែនាំ ៖</strong> សិស្សតភ្ជាប់ខ្សែសង្វាក់ការងារពីដើមដល់ចប់</span>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.3rem;">
                <span style="color: #fca5a5; font-weight: bold;">60 - 72 នាទី</span>
                <span><strong>កិច្ចការស្វ័យសិក្សា ៖</strong> រៀបចំប្រព័ន្ធចម្រោះស្វែងរក &amp; តេស្តផ្ញើសារអាសន្ន</span>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.3rem;">
                <span style="color: #fcd34d; font-weight: bold;">72 - 82 នាទី</span>
                <span><strong>ការត្រួតពិនិត្យ &amp; កែតម្រូវ ៖</strong> សំណួរ Quiz ៥ + សវនកម្មដោះស្រាយបញ្ហា ៣ ស្រទាប់</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding-bottom: 0.3rem;">
                <span style="color: #86efac; font-weight: bold;">82 - 90 នាទី</span>
                <span><strong>ស្ពានចម្លងទៅមុខ ៖</strong> រូបប៊្រិក, កិច្ចការផ្ទះ &amp; មើលត្រួសៗថ្ងៃទី ២៧</span>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ទិដ្ឋភាពរួមនៃរបៀបវារៈ (២ នាទី) ៖</strong> "កត់សម្គាល់កាលវិភាគ ៨ ដំណាក់កាលរបស់យើង។ យើងមិនចាប់ផ្តើមជាមួយ Power Automate ភ្លាមៗទេ។ យើងត្រូវស្ទាត់ជំនាញកម្មវិធី Power Apps ទាំងស្រុងជាមុនសិន។ នៅពេលកម្មវិធីអាចសរសេរចូល SharePoint បានជោគជ័យ ទើបយើងបង្រៀន Power Automate ជាជំហានបន្ទាប់។"</p>`
    },

    // Slide 3 (Index 2): Concept Map Recap
    {
      title: "ផែនទីគំនិតតភ្ជាប់ ៖ ដំណើរឆ្ពោះមកកាន់ថ្ងៃទី ២៦",
      segment: "ផ្នែកទី ១ &bull; ការរួមបញ្ចូលកម្មវិធីសិក្សា",
      subtitle: "គ្រប់គំនិតដែលបានរៀនពីមុនមក គឺជាធ្មេញប្រអប់លេខដ៏សំខាន់នៅក្នុងម៉ាស៊ីនសហគ្រាសពេញលេញថ្ងៃនេះ។",
      content: `<div class="card" style="border-left: 3px solid #06b6d4;">
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem;">
              <div style="background: rgba(12, 19, 31, 0.7); padding: 1.15rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
                <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">ថ្ងៃទី ១ - ១០</span>
                <h4 style="color: #f8fafc; margin: 0.5rem 0;">ផ្ទាំង UI &amp; តក្កវិជ្ជា</h4>
                <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
                  ប៊ូតុង ស្លាក ប្រអប់បញ្ចូលអត្ថបទ លក្ខខណ្ឌ If និងការផ្ទៀងផ្ទាត់ IsBlank។ ឧបករណ៍គិត និងបញ្ចូលទិន្នន័យ។
                </p>
              </div>

              <div style="background: rgba(12, 19, 31, 0.7); padding: 1.15rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
                <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">ថ្ងៃទី ១១ - ១៦</span>
                <h4 style="color: #f8fafc; margin: 0.5rem 0;">អេក្រង់ &amp; UX</h4>
                <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
                  ការប្តូរឆ្លងអេក្រង់ (Navigation) ប៊ូតុងថយក្រោយ Back() និងបន្ទះជូនដំណឹង Notify() ផ្តល់ការឆ្លើយតបទៅអ្នកប្រើ។
                </p>
              </div>

              <div style="background: rgba(12, 19, 31, 0.7); padding: 1.15rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ថ្ងៃទី ១៧ - ២៤</span>
                <h4 style="color: #f8fafc; margin: 0.5rem 0;">SharePoint &amp; CRUD</h4>
                <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
                  តារាងលើ Cloud, Galleries (Items), Forms (Item, Mode), NewForm បង្កើតថ្មី, និង SubmitForm រក្សាទុក។
                </p>
              </div>

              <div style="background: rgba(139, 92, 246, 0.15); padding: 1.15rem; border-radius: 8px; border: 1px solid rgba(139, 92, 246, 0.4);">
                <span class="card-badge" style="background: rgba(139, 92, 246, 0.25); color: #c084fc;">ថ្ងៃទី ២៥ &amp; ២៦</span>
                <h4 style="color: #c084fc; margin: 0.5rem 0;">ប្រព័ន្ធរស់ &amp; Flow</h4>
                <p style="color: #f5f3ff; font-size: 0.86rem; line-height: 1.5;">
                  ពីប្លង់មេទៅជាកម្មវិធីពិត ៖ ៣ អេក្រង់តភ្ជាប់ទៅ SharePoint ១ ដោយដាស់ប្រព័ន្ធផ្ញើសារអាសន្ន Power Automate!
                </p>
              </div>
            </div>

            <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(139, 92, 246, 0.08); border-radius: 8px; text-align: center; border: 1px dashed rgba(139, 92, 246, 0.3);">
              <span style="color: #c084fc; font-weight: 700; font-size: 0.95rem;">
                គោលការណ៍ប្រព័ន្ធ ៖ កម្មវិធីមិនទាន់ចប់ត្រឹមអេក្រង់ស្អាតនោះទេ។ កម្មវិធីចប់ពេញលេញ លុះត្រាតែទិន្នន័យធ្វើដំណើរដោយរលូនពីដៃមនុស្ស ទៅកន្លែងផ្ទុក Cloud រហូតដល់ការជូនដំណឹងស្វ័យប្រវត្តិ!
              </span>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការសំយោគដំណើរការ (៣ នាទី) ៖</strong> "រំលឹកសិស្សអំពីដំណាក់កាលទាំង ៤។ ថ្ងៃទី ១-១០ ពួកគាត់រៀនឧបករណ៍។ ថ្ងៃទី ១១-១៦ រៀនប្តូរអេក្រង់ (Navigation)។ ថ្ងៃទី ១៧-២៤ រៀនរក្សាទុកក្នុង SharePoint។ ថ្ងៃទី ២៥ គូរប្លង់មេ។ ថ្ងៃនេះ សសរស្តម្ភទាំង ៤ ត្រូវបានផ្គុំចូលគ្នាជាប្រព័ន្ធតែមួយ។"</p>`
    },

    // Slide 4 (Index 3): Prerequisite Retrieval Check
    {
      title: "សំណួររំលឹកចំណេះដឹងចាស់ ៖ បើកដំណើរការគ្រឹះមុនៗ",
      segment: "ផ្នែកទី ២ &bull; ការរំលឹកចំណេះដឹង",
      subtitle: "ចុចលើកាតនីមួយៗដើម្បីបង្ហាញចម្លើយ និងគោលការណ៍គ្រឹះពីថ្ងៃទី ២២, ២៤ និង ២៥។",
      content: `<div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">សំណួរទី ១</span>
                <h4 style="color: #f8fafc; margin-top: 1rem;">ការផ្ទៀងផ្ទាត់ DisplayMode</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 0.5rem;">
                  ហេតុអ្វីបានជា <code>btnSubmit.DisplayMode</code> ត្រូវប្រើ <code>If(IsBlank(...))</code>?
                </p>
                <div class="flip-hint">ចុចដើម្បីត្រឡប់ &rarr;</div>
              </div>
              <div class="flip-card-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">គោលការណ៍ទី ១</span>
                <p style="color: #ecfdf5; font-size: 0.92rem; margin-top: 0.8rem; line-height: 1.6;">
                  <strong>ដើម្បីការពារមូលដ្ឋានទិន្នន័យក្រុមហ៊ុន!</strong><br><br>
                  ប៊ូតុងពណ៌ប្រផេះចាក់សោជាប់ ការពារមិនឱ្យទិន្នន័យទទេ ឬមិនគ្រប់ជ្រុងជ្រោយ ចូលទៅបំពុល Cloud។
                </p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">សំណួរទី ២</span>
                <h4 style="color: #f8fafc; margin-top: 1rem;">រូបមន្តតភ្ជាប់ទិន្នន័យ (The Glue)</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 0.5rem;">
                  តើអេក្រង់ Edit ដឹងថាសំបុត្រការងារណាដែលកម្មករបានចុចលើ Gallery តាមរបៀបណា?
                </p>
                <div class="flip-hint">ចុចដើម្បីត្រឡប់ &rarr;</div>
              </div>
              <div class="flip-card-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">គោលការណ៍ទី ២</span>
                <p style="color: #ecfdf5; font-size: 0.92rem; margin-top: 0.8rem; line-height: 1.6;">
                  <code>frmEditOrder.Item = galWorkOrders.Selected</code><br><br>
                  Gallery បញ្ជូនជួរដែលបានជ្រើសរើស ទៅក្នុងលក្ខណៈសម្បត្តិ <code>Item</code> របស់ Form ដើម្បីបង្ហាញទិន្នន័យចាស់!
                </p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc;">សំណួរទី ៣</span>
                <h4 style="color: #f8fafc; margin-top: 1rem;">OnSuccess vs OnSelect</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 0.5rem;">
                  ហេតុអ្វីបានជាយើងសរសេរ <code>Notify()</code> ក្នុង <code>Form.OnSuccess</code> មិនដាក់លើប៊ូតុង?
                </p>
                <div class="flip-hint">ចុចដើម្បីត្រឡប់ &rarr;</div>
              </div>
              <div class="flip-card-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">គោលការណ៍ទី ៣</span>
                <p style="color: #ecfdf5; font-size: 0.92rem; margin-top: 0.8rem; line-height: 1.6;">
                  <strong>ភាពស្មោះត្រង់ក្នុងការឆ្លើយតប!</strong><br><br>
                  <code>OnSuccess</code> ដំណើរការលុះត្រាតែ SharePoint បញ្ជាក់ថាបានរក្សាទុក។ បើដាច់ WiFi កម្មវិធីនឹងមិនកុហកឡើយ។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការរំលឹកសកម្ម (៣ នាទី) ៖</strong> "ហៅសិស្ស ៣ នាក់ឱ្យឆ្លើយសំណួរនីមួយៗមុនពេលចុចត្រឡប់កាត។ សរសើរពួកគេនៅពេលពួកគេប្រើពាក្យគន្លឹះ ៖ 'ការពារមូលដ្ឋានទិន្នន័យ', 'ភ្ជាប់ Item ទៅកាន់ Selected', និង 'ភាពស្មោះត្រង់នៃសារឆ្លើយតប'។"</p>`
    },

    // Slide 5 (Index 4): Workplace Crisis
    {
      title: "វិបត្តិជាក់ស្តែង ៖ មហន្តរាយកោះមុខងារឯកោខាតបង់ $32,000",
      segment: "ផ្នែកទី ៣ &bull; ហេតុអ្វីបានជាមេរៀននេះកើតឡើង",
      subtitle: "អ្វីដែលកើតឡើងនៅពេលកម្មវិធីមានអេក្រង់ស្អាតៗ ប៉ុន្តែខ្សែសង្វាក់ទំនាក់ទំនងត្រូវកាត់ផ្តាច់។",
      content: `<div class="card" style="border-left: 3px solid #ef4444;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
              <div>
                <h4 style="color: #f87171; margin-bottom: 0.5rem;">អ្វីដែលបានកើតឡើងនៅរោងចក្រ Apex ៖</h4>
                <ul style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; padding-left: 1.2rem;">
                  <li>អ្នកអភិវឌ្ឍន៍បានបង្កើតអេក្រង់ ៣ ៖ Browse, New Form, និង Edit Form។</li>
                  <li>ពេលចុច Submit រួច អេក្រង់មិនបិទ ឬសម្អាតទិន្នន័យទេ — វាគាំងនៅនឹងថ្កល់លើអក្សរចាស់។</li>
                  <li>កម្មករមិនដឹងថាបានរក្សាទុកឬនៅ ក៏ចុចប៊ូតុង Submit ៥ ដង បង្កើតបានសំបុត្រស្ទួន ៥ ជួរ!</li>
                  <li>កាន់តែធ្ងន់ធ្ងរ ៖ សំបុត្រដេកស្ងាត់ក្នុង SharePoint។ មេជាងនៅការិយាល័យខាងមុខមិនបានដឹងសោះ!</li>
                </ul>
              </div>

              <div>
                <h4 style="color: #fca5a5; margin-bottom: 0.5rem;">ផលវិបត្តិមហន្តរាយជាក់ស្តែង ៖</h4>
                <ul style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; padding-left: 1.2rem;">
                  <li><strong>ភាពស្ងាត់ជ្រងំ ៣ ម៉ោង ៖</strong> ម៉ាស៊ីន CNC-02 ឈរហុយផ្សែង ៣ ម៉ោងគ្មានអ្នកណាមកមើល។</li>
                  <li><strong>ខាតបង់ $32,000 ខកខានជើងហោះហើរ ៖</strong> ស្លាបទួរប៊ីនដឹកទៅក្រុមហ៊ុន Boeing ត្រូវយឺតពេល។</li>
                  <li><strong>ការបាត់បង់ទំនុកចិត្ត ៖</strong> "កម្មវិធីនេះមិនដំណើរការទេ ខ្ញុំត្រឡប់ទៅសរសេរក្រដាសវិញ!"</li>
                </ul>
              </div>
            </div>

            <div style="margin-top: 1.25rem; padding: 0.85rem; background: rgba(239, 68, 68, 0.1); border-radius: 6px; border-left: 3px solid #ef4444;">
              <p style="color: var(--text-main); font-size: 0.88rem; margin: 0;">
                <strong>ថ្នាំព្យាបាលស្ថាបត្យកម្ម ៖</strong> ប៊ូតុងដែលគ្មានការឆ្លើយតបបង្កើតភាពស្ទួន។ មូលដ្ឋានទិន្នន័យដែលគ្មានស្វ័យប្រវត្តិកម្មបង្កើតភាពស្ងាត់ជ្រងំ។ ថ្ងៃនេះយើងតភ្ជាប់ខ្សែសង្វាក់ទាំងមូល!
              </p>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>អារម្មណ៍ &amp; ហានិភ័យជាក់ស្តែង (៣ នាទី) ៖</strong> "សួរសិស្ស ៖ 'ប្រសិនបើអ្នកកុម្ម៉ង់តាក់ស៊ី PassApp ហើយអេក្រង់មិនបង្ហាញតៃកុង ហើយគ្មានឡានមក តើអ្នកមានអារម្មណ៍យ៉ាងណា?' អ្នកនឹងខឹងហើយបិទកម្មវិធីចោល។ សូហ្វវែរគឺអំពីទំនុកចិត្តរបស់មនុស្ស។ ពេលម៉ាស៊ីនខូច អ្នកដែលត្រូវជួសជុលត្រូវតែទទួលបានសារអាសន្នភ្លាមៗ។"</p>`
    },

    // Slide 6 (Index 5): Plain Language Matrix
    {
      title: "គំនិតសាមញ្ញមុនវាក្យសព្ទបច្ចេកទេស ៖ បំបែកប្រព័ន្ធតភ្ជាប់",
      segment: "ផ្នែកទី ៤ &bull; ភាសាសាមញ្ញជាមុន",
      subtitle: "កុំរៀនពាក្យបច្ចេកទេសដាច់ដោយឡែក។ រាល់សមាសភាគបច្ចេកទេសគ្រាន់តែជាការពិតក្នុងជីវិតប្រចាំថ្ងៃប៉ុណ្ណោះ។",
      content: `<div class="card">
            <table class="matrix-table">
              <thead>
                <tr>
                  <th>គំនិតជាភាសាសាមញ្ញ</th>
                  <th>ពាក្យបច្ចេកទេស</th>
                  <th>តួនាទីពិតប្រាកដក្នុងប្រព័ន្ធ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>ខ្សែសង្វាក់តភ្ជាប់</strong></td>
                  <td><span class="badge-tag tag-cyan">End-to-End System</span></td>
                  <td>អ្នកប្រើចុចប៊ូតុង ➔ កត់ត្រាចូលទិន្នន័យ ➔ Cloud ដាស់ខ្លួន ➔ មេជាងទទួលដំណឹង។</td>
                </tr>
                <tr>
                  <td><strong>កណ្តឹងរោទិ៍ស្វ័យប្រវត្តិ</strong></td>
                  <td><span class="badge-tag tag-purple">Power Automate Cloud Flow</span></td>
                  <td>ជំនួយការលើ Cloud ២៤/៧ ដែលបំពេញការងារស្វ័យប្រវត្តិពេលព្រឹត្តិការណ៍កើតឡើង។</td>
                </tr>
                <tr>
                  <td><strong>ផ្កាភ្លើងដាស់ការងារ (Trigger)</strong></td>
                  <td><span class="badge-tag tag-amber">Flow Trigger</span></td>
                  <td>ព្រឹត្តិការណ៍ជាក់លាក់ ៖ "នៅពេលមានជួរថ្មីត្រូវបានបង្កើតក្នុង SharePoint list WorkOrders"។</td>
                </tr>
                <tr>
                  <td><strong>កិច្ចការដែលត្រូវធ្វើ (Action)</strong></td>
                  <td><span class="badge-tag tag-emerald">Flow Action</span></td>
                  <td>ការងារដែលត្រូវធ្វើ ៖ "ផ្ញើសារអ៊ីមែល (V2) ទៅកាន់ប្រធានផ្នែកជួសជុល"។</td>
                </tr>
                <tr>
                  <td><strong>ខ្សែតភ្ជាប់ទិន្នន័យផ្ទាល់</strong></td>
                  <td><span class="badge-tag tag-cyan">Item = galWorkOrders.Selected</span></td>
                  <td>ប្រាប់អេក្រង់ Edit ថាតើសំបុត្រម៉ាស៊ីនមួយណាដែលត្រូវបង្ហាញ និងកែសម្រួល។</td>
                </tr>
                <tr>
                  <td><strong>ច្រកទ្វារសុវត្ថិភាព</strong></td>
                  <td><span class="badge-tag tag-rose">DisplayMode Validation</span></td>
                  <td>ចាក់សោប៊ូតុងជាពណ៌ប្រផេះ រហូតដល់មនុស្សបញ្ចូលទិន្នន័យត្រឹមត្រូវគ្រប់វាល។</td>
                </tr>
              </tbody>
            </table>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការបំភ្លឺជាភាសាសាមញ្ញ (៣ នាទី) ៖</strong> "អានម្តងមួយជួរ។ កត់សម្គាល់ពីភាពងាយយល់របស់ Power Automate ៖ Trigger គឺគ្រាន់តែជា 'អ្វីដែលដាស់វា'; Action គឺគ្រាន់តែជា 'អ្វីដែលវាធ្វើបន្ទាប់'។ គ្មានពាក្យពិបាកឡើយ!"</p>`
    },

    // Slide 7 (Index 6): Everyday Analogy: Pizza Tracker
    {
      title: "ឧទាហរណ៍ទី ១ ៖ ប្រព័ន្ធកុម្ម៉ង់ និងដឹកជញ្ជូនភីហ្សាស្វ័យប្រវត្តិ",
      segment: "ផ្នែកទី ៤ &bull; ម៉ូដែលគំនិត",
      subtitle: "របៀបដែលកម្មវិធីទូរស័ព្ទទំនើបតភ្ជាប់មនុស្ស មូលដ្ឋានទិន្នន័យ អេក្រង់ផ្ទះបាយ និងសារជូនដំណឹង។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">១. កុម្ម៉ង់លើ App</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">អ្នកជ្រើសរើសភីហ្សា</h4>
            <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
              អ្នករើសមុខម្ហូបលើទូរស័ព្ទ។ កម្មវិធីពិនិត្យមើលអាសយដ្ឋាន និងកាតធនាគាររបស់អ្នក (ការផ្ទៀងផ្ទាត់ Validation)។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">២. រក្សាទុកទិន្នន័យ</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">កត់ត្រាក្នុង Database</h4>
            <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
              ការកុម្ម៉ង់ធ្លាក់ចូលមូលដ្ឋានទិន្នន័យកណ្តាលជាសំបុត្រលេខ #419។ កម្មវិធីរបស់អ្នកបង្ហាញសញ្ញាគ្រីសពណ៌បៃតង!
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc;">៣. ផ្កាភ្លើងស្វ័យប្រវត្តិ (Trigger)</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">ម៉ាស៊ីនផ្ទះបាយរោទិ៍</h4>
            <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
              គ្មានអ្នកណាទូរស័ព្ទទៅចុងភៅទេ។ មូលដ្ឋានទិន្នន័យបញ្ជាឱ្យម៉ាស៊ីនព្រីនផ្ទះបាយបន្លឺសំឡេងភ្លាមៗពេលមានទិន្នន័យថ្មី!
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">៤. សកម្មភាពស្វ័យប្រវត្តិ (Action)</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">ចាត់តាំងអ្នកដឹក</h4>
            <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
              អ្នកដឹកឈ្មោះដារ៉ាទទួលបានសារលើនាឡិកាដៃជាមួយផែនទី GPS។ អ្នកទទួលបានសារ SMS តាមដានដំណើរភីហ្សា!
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការប្រៀបធៀបរូបភាព (៣ នាទី) ៖</strong> "សួរសិស្ស ៖ 'តើអតិថិជនបានទូរស័ព្ទទៅអ្នកដឹកទេ? តើអ្នកគិតលុយបានដើរទៅប្រាប់ចុងភៅទេ?' អត់ទេ! សូហ្វវែរជាអ្នកធ្វើកិច្ចការទាំងនោះដោយស្វ័យប្រវត្តិតាមរយៈ Trigger និង Action។ នោះជាអ្វីដែលយើងកំពុងបង្កើតសម្រាប់រោងចក្រថ្ងៃនេះ។"</p>`
    },

    // Slide 8 (Index 7): Manufacturing DX Story
    {
      title: "ឧទាហរណ៍រោងចក្រ DX ៖ ប្រព័ន្ធគ្រប់គ្រងការខូចម៉ាស៊ីនខ្សែសង្វាក់ទី ២",
      segment: "ផ្នែកទី ៤ &bull; កម្មវិធីជាក់ស្តែងក្នុងកន្លែងធ្វើការ",
      subtitle: "ការជំនួសសំបុត្រក្រដាសរញ៉េរញ៉ៃ ដោយលំហូរការងារឌីជីថលដែលមិនអាចបំបែកបាននៅរោងចក្រ Apex Precision។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">១. កម្មកររោងចក្រ</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">Spindle CNC ឡើងកម្តៅខ្លាំង</h4>
            <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
              កម្មករឃើញភ្លើងលឿង 85&deg;C។ ចុច <code>+ New Work Order</code>, រើស CNC-02, អាទិភាព ៖ Critical។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">២. ការសរសេរ Cloud សុវត្ថិភាព</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">SubmitForm &amp; OnSuccess</h4>
            <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
              SharePoint បង្កើតជួរថ្មី #WO-1045។ បន្ទះបៃតងបញ្ជាក់ការរក្សាទុក។ អេក្រង់ត្រឡប់ទៅ Home ដោយស្វ័យប្រវត្តិ។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc;">៣. ស្វ័យប្រវត្តិកម្ម Cloud</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">សារអាសន្ន Power Automate</h4>
            <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
              ក្នុងរយៈពេល ៤៥ វិនាទី Flow រកឃើញជួរថ្មី ហើយផ្ញើអ៊ីមែលអាទិភាពខ្ពស់ទៅកាន់ប្រធានផ្នែកសុខាភ្លាមៗ។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">៤. តុការងារជាងជួសជុល</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">កែសម្រួល &amp; ដោះស្រាយ</h4>
            <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
              ជាងដារ៉ាបើកថេប្លេត ចុច WO-1045 ក្នុង Gallery។ Form បង្ហាញព័ត៌មានចាស់។ ដារ៉ាកែជា "Resolved"។
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការតភ្ជាប់លំហូររោងចក្រ (៣ នាទី) ៖</strong> "កត់សម្គាល់ពីរបៀបដែលមនុស្សម្នាក់ៗមានតួនាទីច្បាស់លាស់ ៖ កម្មកររាយការណ៍; SharePoint រក្សាទុក; Power Automate ជូនដំណឹង; ជាងដោះស្រាយ។ នេះហើយគឺជាការផ្លាស់ប្តូរឌីជីថល (Digital Transformation)!"</p>`
    },

    // Slide 9 (Index 8): Master Cause-and-Effect Diagram
    {
      title: "ដ្យាក្រាមខ្សែសង្វាក់ហេតុនិងផលពេញលេញនៃប្រព័ន្ធ",
      segment: "ផ្នែកទី ៥ &bull; ស្ថាបត្យកម្មប្រព័ន្ធ",
      subtitle: "ការមើលឃើញពីរបៀបដែលសកម្មភាពរបស់មនុស្សក្នុង Power Apps បង្កើតផលប៉ះពាល់លើ Cloud និងស្វ័យប្រវត្តិកម្ម។",
      content: `<div class="card">
            <div class="flow-pipeline-container">
              <div class="flow-step-node">
                <div class="flow-step-icon">📱</div>
                <div class="flow-step-title">១. Power Apps</div>
                <div class="flow-step-desc">កម្មករចុច Submit<br><code>SubmitForm(frmNew)</code></div>
              </div>
              <div class="flow-step-arrow">&rarr;</div>
              <div class="flow-step-node">
                <div class="flow-step-icon">☁️</div>
                <div class="flow-step-title">២. SharePoint</div>
                <div class="flow-step-desc">ជួរទិន្នន័យថ្មីកើតឡើង<br>លេខកូដ #WO-1045</div>
              </div>
              <div class="flow-step-arrow">&rarr;</div>
              <div class="flow-step-node" style="border-color: #8b5cf6;">
                <div class="flow-step-icon">⚡</div>
                <div class="flow-step-title" style="color: #c084fc;">៣. Flow Trigger</div>
                <div class="flow-step-desc">Cloud ដាស់ខ្លួន ៖<br>When item is created</div>
              </div>
              <div class="flow-step-arrow">&rarr;</div>
              <div class="flow-step-node" style="border-color: #8b5cf6;">
                <div class="flow-step-icon">📧</div>
                <div class="flow-step-title" style="color: #c084fc;">៤. Flow Action</div>
                <div class="flow-step-desc">Send an email (V2)<br>ទៅកាន់ប្រធានផ្នែក</div>
              </div>
              <div class="flow-step-arrow">&rarr;</div>
              <div class="flow-step-node">
                <div class="flow-step-icon">🛠️</div>
                <div class="flow-step-title">៥. តុការងារជាង</div>
                <div class="flow-step-desc">ជាងកែប្រែស្ថានភាព<br><code>Item = gal.Selected</code></div>
              </div>
            </div>

            <div style="margin-top: 1.25rem; padding: 0.85rem; background: rgba(6, 182, 212, 0.08); border-radius: 6px; border-left: 3px solid #06b6d4;">
              <strong style="color: #67e8f9;">ម៉ូដែលគំនិតស្នូល ៖</strong> មនុស្ស &rarr; POWER APPS &rarr; SHAREPOINT &rarr; POWER AUTOMATE &rarr; សារជូនដំណឹង &rarr; មេជាង។
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការសំយោគប្រព័ន្ធ (៣ នាទី) ៖</strong> "ឱ្យសិស្សសូត្រខ្សែសង្វាក់នេះតាមអ្នក ៖ មនុស្ស ➔ Power Apps ➔ SharePoint ➔ Power Automate ➔ សារជូនដំណឹង ➔ មេជាង។ សង្កត់ធ្ងន់ថា Power Automate មិនមែនជាឧបករណ៍ដាច់ដោយឡែកទេ ប៉ុន្តែជាស្ពានជូនដំណឹងដែលដំណើរការលើ Cloud។"</p>`
    },

    // Slide 10 (Index 9): Screen 1 Architecture
    {
      title: "ស្ថាបត្យកម្មអេក្រង់ទី ១ ៖ scr_Home — មជ្ឈមណ្ឌលបញ្ជាកណ្តាល",
      segment: "ផ្នែកទី ៦ &bull; ការអនុវត្តអេក្រង់ជាក់ស្តែង",
      subtitle: "ផ្ទាំងគ្រប់គ្រងកណ្តាលដែលកម្មករចូលមកមើល ស្វែងរក និងចាប់ផ្តើមបង្កើតសំបុត្រការងារថ្មី។",
      content: `<div class="card">
            <h3 class="card-title">🖥️ រចនាសម្ព័ន្ធ UI &amp; ឧបករណ៍បញ្ជាស្នូល</h3>
            <ul style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; padding-left: 1.2rem;">
              <li><strong>របារខាងលើ (Header Banner) ៖</strong> ឡូហ្គោក្រុមហ៊ុន, ឈ្មោះអ្នកប្រើបច្ចុប្បន្ន, និងចំណងជើងកម្មវិធី។</li>
              <li><strong>របារសកម្មភាពរហ័ស (Top Action Bar) ៖</strong>
                <ul style="padding-left: 1rem; margin-top: 0.25rem;">
                  <li><code>txtSearch</code> ៖ ស្វែងរកតាមលេខកូដសំបុត្រ ឬការពិពណ៌នាបញ្ហា។</li>
                  <li><code>cmbMachineFilter</code> ៖ Dropdown ចម្រោះតាមឈ្មោះម៉ាស៊ីន។</li>
                  <li><code>btnNewTicket</code> ៖ ប៊ូតុងពណ៌លឿងទាក់ទាញ <code>+ New Work Order</code>។</li>
                </ul>
              </li>
              <li><strong>បញ្ជីកណ្តាល (<code>galWorkOrders</code>) ៖</strong>
                <ul style="padding-left: 1rem; margin-top: 0.25rem;">
                  <li>កាតបង្ហាញឈ្មោះម៉ាស៊ីន, ស្លាកអាទិភាព, ស្ថានភាព, និងកាលបរិច្ឆេទបង្កើត។</li>
                  <li>ចុចសញ្ញាព្រួញ &rarr; ប្តូរទៅកាន់អេក្រង់ទី ៣ (Navigate) (តុការងារជាង)។</li>
                </ul>
              </li>
            </ul>
          </div>

          <div class="card">
            <h3 class="card-title">⚡ រូបមន្តស្នូលលើអេក្រង់ទី ១</h3>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <div style="background: rgba(0, 0, 0, 0.35); padding: 0.75rem; border-radius: 6px; font-family: var(--font-code); font-size: 0.8rem; color: #fcd34d;">
                // btnNewTicket.OnSelect<br>
                NewForm(frmNewWorkOrder);<br>
                Navigate(scr_New, ScreenTransition.Cover)
              </div>
              <div style="background: rgba(0, 0, 0, 0.35); padding: 0.75rem; border-radius: 6px; font-family: var(--font-code); font-size: 0.8rem; color: #67e8f9;">
                // galWorkOrders.OnSelect (ឬ សញ្ញាព្រួញ)<br>
                Navigate(scr_DetailEdit, ScreenTransition.Fade)
              </div>
              <p style="color: var(--text-muted); font-size: 0.82rem;">
                <strong>វិធានមាស ៖</strong> រូបមន្ត <code>NewForm()</code> ត្រូវតែហៅជានិច្ច មុនពេលប្តូរទៅកាន់អេក្រង់ New ដើម្បីលុបបំបាត់ទិន្នន័យចាស់ៗចោល!
              </p>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>គោលបំណងអេក្រង់ទី ១ (៣ នាទី) ៖</strong> "បង្ហាញសិស្សពីមូលហេតុដែល NewForm() ត្រូវដាក់លើប៊ូតុងនៅអេក្រង់ទី ១។ ប្រសិនបើកម្មករពីមុនធ្លាប់វាយអត្ថបទពាក់កណ្តាលរួចចុចបោះបង់ NewForm() ធានាថាកម្មករក្រោយបើកមកឃើញទម្រង់ទទេស្អាត ១០០%!"</p>`
    },

    // Slide 11 (Index 10): Screen 2 Architecture
    {
      title: "ស្ថាបត្យកម្មអេក្រង់ទី ២ ៖ scr_New — ច្រកទ្វារទទួលព័ត៌មានសុវត្ថិភាព",
      segment: "ផ្នែកទី ៦ &bull; ការអនុវត្តអេក្រង់ជាក់ស្តែង",
      subtitle: "ទម្រង់បែបបទស្អាត គ្មានការរំខាន រចនាឡើងសម្រាប់កម្មកររោងចក្រពាក់ស្រោមដៃការងារ។",
      content: `<div class="card">
            <h3 class="card-title">🛡️ ការផ្ទៀងផ្ទាត់ &amp; សុវត្ថិភាពទិន្នន័យ</h3>
            <ul style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; padding-left: 1.2rem;">
              <li><strong>ទម្រង់បែបបទតែមួយ (<code>frmNewWorkOrder</code>) ៖</strong> ភ្ជាប់ជាមួយ <code>DataSource = WorkOrders</code> ក្នុង <code>FormMode.New</code>។</li>
              <li><strong>Dropdown ធំៗស្រួលចុច ៖</strong> MachineID (CNC-01 ដល់ 04), Priority (Critical, High, Medium, Low)។</li>
              <li><strong>ប្រអប់អត្ថបទចាំបាច់ ៖</strong> ការពិពណ៌នាអំពីបញ្ហា (Issue Description)។</li>
              <li><strong>ប៊ូតុងបោះបង់សុវត្ថិភាព ៖</strong> <code>ResetForm(frmNewWorkOrder); Back()</code>។</li>
            </ul>
          </div>

          <div class="card">
            <h3 class="card-title">🔒 រូបមន្តតក្កវិជ្ជានៃច្រកទ្វារសុវត្ថិភាព</h3>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <div style="background: rgba(0, 0, 0, 0.35); padding: 0.75rem; border-radius: 6px; font-family: var(--font-code); font-size: 0.8rem; color: #fcd34d;">
                // btnSubmit.DisplayMode (ច្រកទ្វារផ្ទៀងផ្ទាត់)<br>
                If(<br>
                &nbsp;&nbsp;IsBlank(cmbMachine.Selected) Or IsBlank(txtIssue.Text),<br>
                &nbsp;&nbsp;DisplayMode.Disabled,<br>
                &nbsp;&nbsp;DisplayMode.Edit<br>
                )
              </div>
              <div style="background: rgba(0, 0, 0, 0.35); padding: 0.75rem; border-radius: 6px; font-family: var(--font-code); font-size: 0.8rem; color: #86efac;">
                // frmNewWorkOrder.OnSuccess (ភាពស្មោះត្រង់)<br>
                Notify("សំបុត្រការងារត្រូវបានរក្សាទុកក្នុង Cloud!", NotificationType.Success);<br>
                Navigate(scr_Home, ScreenTransition.Uncover)
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ភាពសាមញ្ញនៃអេក្រង់ទី ២ (៣ នាទី) ៖</strong> "កត់សម្គាល់ថាអេក្រង់ទី ២ មានការងារតែមួយគត់ ៖ ទទួលទិន្នន័យ។ គ្មាន Gallery គ្មានស្ថិតិរញ៉េរញ៉ៃ។ គ្រាន់តែបញ្ចូលទិន្នន័យ ផ្ទៀងផ្ទាត់ និងរក្សាទុកដោយសុវត្ថិភាព។"</p>`
    },

    // Slide 12 (Index 11): Screen 3 Architecture
    {
      title: "ស្ថាបត្យកម្មអេក្រង់ទី ៣ ៖ scr_DetailEdit — តុការងារជាងជួសជុល",
      segment: "ផ្នែកទី ៦ &bull; ការអនុវត្តអេក្រង់ជាក់ស្តែង",
      subtitle: "កន្លែងដែលមេជាងពិនិត្យមើលសំបុត្រចាស់ ចាត់តាំងជាង និងកត់ត្រាថ្លៃគ្រឿងបន្លាស់ដោយមិនបង្កើតជួរស្ទួន។",
      content: `<div class="card">
            <h3 class="card-title">🔧 ប្លង់តុការងារ &amp; ស្ថានភាពកាតទិន្នន័យ</h3>
            <ul style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; padding-left: 1.2rem;">
              <li><strong>ទម្រង់បែបបទកែសម្រួល (<code>frmEditOrder</code>) ៖</strong> កំណត់ក្នុង <code>FormMode.Edit</code>។</li>
              <li><strong>ភ្ជាប់ជាមួយជួរដែលបានជ្រើស ៖</strong> <code>Item = galWorkOrders.Selected</code>។</li>
              <li><strong>កាតមើលតែមួយគត់ (Read-Only) ៖</strong> MachineID, អ្នករាយការណ៍, និងកាលបរិច្ឆេទបង្កើត (ចាក់សោជាប់)។</li>
              <li><strong>កាតសម្រាប់កែប្រែជាក់ស្តែង ៖</strong> ជាងទទួលបន្ទុក, ស្ថានភាព (In Repair, Resolved), ថ្លៃជួសជុល ($)។</li>
            </ul>
          </div>

          <div class="card">
            <h3 class="card-title">⚡ រូបមន្តព្រឹត្តិការណ៍លើតុការងារ</h3>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <div style="background: rgba(0, 0, 0, 0.35); padding: 0.75rem; border-radius: 6px; font-family: var(--font-code); font-size: 0.8rem; color: #67e8f9;">
                // frmEditOrder.Item<br>
                galWorkOrders.Selected
              </div>
              <div style="background: rgba(0, 0, 0, 0.35); padding: 0.75rem; border-radius: 6px; font-family: var(--font-code); font-size: 0.8rem; color: #fcd34d;">
                // btnSaveUpdate.OnSelect<br>
                SubmitForm(frmEditOrder)
              </div>
              <div style="background: rgba(0, 0, 0, 0.35); padding: 0.75rem; border-radius: 6px; font-family: var(--font-code); font-size: 0.8rem; color: #86efac;">
                // frmEditOrder.OnSuccess<br>
                Notify("សំបុត្រការងារត្រូវបានធ្វើបច្ចុប្បន្នភាព!", NotificationType.Success);<br>
                Navigate(scr_Home)
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>តុការងារជាង (៣ នាទី) ៖</strong> "រំលឹកសិស្ស ៖ ហេតុអ្វីបានជា SubmitForm() លើអេក្រង់នេះធ្វើការ UPDATE មិនមែន CREATE? ពីព្រោះ FormMode គឺ Edit ហើយ Item ភ្ជាប់ទៅ galWorkOrders.Selected! វាប្រាប់ SharePoint ថា ៖ 'កុំបង្កើតជួរ 420; គ្រាន់តែកែប្រែជួរ 419'។"</p>`
    },

    // Slide 13 (Index 12): Glue Logic Search & Filter
    {
      title: "តក្កវិជ្ជានៃការតភ្ជាប់ ៖ ការស្វែងរក និងចម្រោះទិន្នន័យច្រើនលក្ខខណ្ឌ",
      segment: "ផ្នែកទី ៦ &bull; តក្កវិជ្ជា Power Fx",
      subtitle: "អនុញ្ញាតឱ្យជាងជួសជុលច្រោះសំបុត្ររាប់រយតាមឈ្មោះម៉ាស៊ីន និងពាក្យគន្លឹះក្នុងពេលតែមួយ។",
      content: `<div class="card">
            <h3 class="card-title">🔍 រូបមន្តរួមបញ្ចូល Search() &amp; Filter()</h3>
            <div style="background: rgba(0, 0, 0, 0.45); padding: 1rem; border-radius: 8px; font-family: var(--font-code); font-size: 0.85rem; color: #67e8f9; line-height: 1.6;">
              // galWorkOrders.Items<br>
              Search(<br>
              &nbsp;&nbsp;Filter(<br>
              &nbsp;&nbsp;&nbsp;&nbsp;WorkOrders,<br>
              &nbsp;&nbsp;&nbsp;&nbsp;IsBlank(cmbFilterMachine.Selected.Value) Or MachineID.Value = cmbFilterMachine.Selected.Value<br>
              &nbsp;&nbsp;),<br>
              &nbsp;&nbsp;txtSearch.Text,<br>
              &nbsp;&nbsp;"Title",<br>
              &nbsp;&nbsp;"Description"<br>
              )
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(245, 158, 11, 0.1); padding: 0.85rem; border-radius: 6px; border-left: 3px solid #f59e0b;">
                <strong style="color: #fcd34d;">របៀបដំណើរការរបស់ Filter() ៖</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin-top: 0.25rem;">
                  ប្រសិនបើ Dropdown ទទេ (<code>IsBlank</code>) លក្ខខណ្ឌវាយតម្លៃថា <code>True</code> គ្រប់ជួរ នោះទិន្នន័យទាំងអស់នឹងបង្ហាញ។ បើរើសម៉ាស៊ីនណា នោះមានតែម៉ាស៊ីននោះប៉ុណ្ណោះដែលបង្ហាញ!
                </p>
              </div>

              <div style="background: rgba(6, 182, 212, 0.1); padding: 0.85rem; border-radius: 6px; border-left: 3px solid #06b6d4;">
                <strong style="color: #67e8f9;">របៀប Search() ស្រោបពីលើ ៖</strong>
                <p style="color: var(--text-muted); font-size: 0.82rem; margin-top: 0.25rem;">
                  យកតារាងដែល Filter រួច មកស្វែងរកតួអក្សរដែលវាយក្នុង <code>txtSearch</code> ឆ្លងកាត់ជួរឈរ <code>Title</code> និង <code>Description</code>។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការពន្យល់រូបមន្តស្រោបគ្នា (៣ នាទី) ៖</strong> "បង្រៀនតាមទស្សនៈតុក្កតារុស្ស៊ី ៖ ស្រទាប់ក្នុងបំផុតគឺតារាង SharePoint; Filter() ច្រោះយកតាមម៉ាស៊ីន; Search() ច្រោះយកតាមអក្សរ; ហើយ Gallery បង្ហាញលទ្ធផលចុងក្រោយ។"</p>`
    },

    // Slide 14 (Index 13): Power Automate Extension What is Automation?
    {
      title: "ផ្នែកបន្ថែម Power Automate ៖ តើអ្វីទៅជាស្វ័យប្រវត្តិកម្ម?",
      segment: "ផ្នែកទី ៧ &bull; ស្វ័យប្រវត្តិកម្ម Cloud",
      subtitle: "និយមន័យកម្រិតសាមញ្ញបំផុត ៖ ជំនួយការលើ Cloud ដែលបំពេញការងារដោយស្វ័យប្រវត្តិ ក្រោយពេលមានព្រឹត្តិការណ៍កើតឡើង។",
      content: `<div class="card" style="border-top: 4px solid #f59e0b;">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">ផ្កាភ្លើងដាស់ការងារ</span>
            <h3 class="card-title" style="color: #fcd34d;">១. TRIGGER ("អ្វីដែលចាប់ផ្តើមវា")</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">
              Trigger គឺជាកណ្តឹងរោទិ៍ដែលដាស់ Flow ឱ្យភ្ញាក់ពីដំណេក។ Flow នឹងគេងស្ងៀមរហូតដល់ព្រឹត្តិការណ៍ជាក់លាក់នេះកើតឡើងក្នុង Microsoft 365។
            </p>
            <div style="margin-top: 1rem; padding: 0.85rem; background: rgba(0, 0, 0, 0.35); border-radius: 6px; font-family: var(--font-code); font-size: 0.84rem; color: #fcd34d;">
              ⚡ SharePoint Connector ៖<br>
              <strong>"When an item is created"</strong>
            </div>
          </div>

          <div class="card" style="border-top: 4px solid #8b5cf6;">
            <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc;">កិច្ចការដែលត្រូវធ្វើ</span>
            <h3 class="card-title" style="color: #c084fc;">២. ACTION ("អ្វីដែលវាធ្វើបន្ទាប់")</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">
              Action គឺជាការងារដែល Flow ត្រូវធ្វើបន្ទាប់ពីភ្ញាក់ពីដំណេក។ វាទាញយកទិន្នន័យពី Trigger មកអនុវត្តកិច្ចការជាក់ស្តែង។
            </p>
            <div style="margin-top: 1rem; padding: 0.85rem; background: rgba(0, 0, 0, 0.35); border-radius: 6px; font-family: var(--font-code); font-size: 0.84rem; color: #c084fc;">
              📧 Office 365 Outlook Connector ៖<br>
              <strong>"Send an email (V2)"</strong>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការណែនាំដំបូងអំពី Power Automate (៣ នាទី) ៖</strong> "កុំប្រើពាក្យបច្ចេកទេសពិបាកៗដូចជា JSON ឬ webhooks ឱ្យសោះ! រក្សាវាឱ្យសាមញ្ញបំផុត ៖ Trigger = អ្វីដែលដាស់វា; Action = អ្វីដែលវាធ្វើបន្ទាប់។ នោះគឺជាគ្រឹះទាំងស្រុងនៃ Cloud Automation។"</p>`
    },

    // Slide 15 (Index 14): Building the 2-Step Flow
    {
      title: "ការបង្កើត Automated Cloud Flow ២ ជំហានជាក់ស្តែង",
      segment: "ផ្នែកទី ៧ &bull; ស្វ័យប្រវត្តិកម្ម Cloud",
      subtitle: "ការតភ្ជាប់ SharePoint Trigger ដោយផ្ទាល់ទៅកាន់សកម្មភាពផ្ញើសារអ៊ីមែលជូនដំណឹង Outlook។",
      content: `<div class="card">
            <h3 class="card-title">⚡ ជំហានទី ១ ៖ កំណត់ Trigger</h3>
            <div style="background: rgba(0, 0, 0, 0.35); padding: 0.85rem; border-radius: 6px; font-size: 0.85rem; color: #cbd5e1; line-height: 1.6;">
              <strong>Trigger Card ៖</strong> When an item is created<br>
              &bull; <strong>Site Address ៖</strong> https://company.sharepoint.com/sites/PlantOps<br>
              &bull; <strong>List Name ៖</strong> WorkOrders
            </div>
            <p style="color: var(--text-muted); font-size: 0.82rem; margin-top: 0.75rem;">
              Power Automate នឹងទទួលបានទិន្នន័យជួរឈរទាំងអស់ (Title, MachineID, Priority, Description, CreatedBy) ជា Dynamic Content ដោយស្វ័យប្រវត្តិ!
            </p>
          </div>

          <div class="card">
            <h3 class="card-title">📧 ជំហានទី ២ ៖ កំណត់ Action</h3>
            <div style="background: rgba(0, 0, 0, 0.35); padding: 0.85rem; border-radius: 6px; font-size: 0.85rem; color: #cbd5e1; line-height: 1.6;">
              <strong>Action Card ៖</strong> Send an email (V2)<br>
              &bull; <strong>To ៖</strong> Supervisor@company.com<br>
              &bull; <strong>Subject ៖</strong> 🚨 សំបុត្រការងារថ្មី ៖ <code>[Title]</code><br>
              &bull; <strong>Body ៖</strong> ម៉ាស៊ីន <code>[MachineID Value]</code> មានបញ្ហាអាទិភាព <code>[Priority Value]</code> រាយការណ៍ដោយ <code>[Created By DisplayName]</code>។
            </div>
            <p style="color: var(--text-muted); font-size: 0.82rem; margin-top: 0.75rem;">
              ស្លាក Dynamic Content ក្នុងវង់ក្រចក <code>[ ]</code> នឹងទាញតម្លៃពិតចេញពីជួរដែល Power Apps ទើបតែបានរក្សាទុក!
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ស្លាក Dynamic Content (៣ នាទី) ៖</strong> "បង្ហាញសិស្សនូវរូបរន្ទះ Dynamic Content។ ពន្យល់ ៖ 'យើងមិនសរសេរឈ្មោះ CNC-02 ដោយដៃក្នុងអ៊ីមែលទេ។ យើងជ្រើសរើសស្លាក MachineID ដូច្នេះអ៊ីមែលនឹងផ្លាស់ប្តូរតាមម៉ាស៊ីនដែលខូចជាក់ស្តែង!'"</p>`
    },

    // Slide 16 (Index 15): Interactive Pipeline Simulator
    {
      title: "ឧបករណ៍ពិសោធន៍លំហូរប្រព័ន្ធតភ្ជាប់ (Pipeline Simulator)",
      segment: "ផ្នែកទី ៨ &bull; បន្ទប់ពិសោធន៍អន្តរកម្ម",
      subtitle: "ចុចលើផ្ទាំងជំហាននីមួយៗខាងក្រោម ដើម្បីពិសោធន៍មើលពីរបៀបដែលទិន្នន័យផ្លាស់ទីពីថេប្លេត រហូតដល់សារអ៊ីមែល។",
      content: `<div class="blueprint-sim">
            <div class="sim-nav-tabs">
              <button class="sim-tab-btn active" id="sim-tab-1" onclick="selectDay26Sim(1)">១. Home</button>
              <button class="sim-tab-btn" id="sim-tab-2" onclick="selectDay26Sim(2)">២. បញ្ចូលថ្មី</button>
              <button class="sim-tab-btn" id="sim-tab-3" onclick="selectDay26Sim(3)">៣. ច្រកផ្ទៀងផ្ទាត់</button>
              <button class="sim-tab-btn" id="sim-tab-4" onclick="selectDay26Sim(4)">៤. រក្សាទុក Cloud</button>
              <button class="sim-tab-btn flow-tab" id="sim-tab-5" onclick="selectDay26Sim(5)">៥. Flow Trigger</button>
              <button class="sim-tab-btn flow-tab" id="sim-tab-6" onclick="selectDay26Sim(6)">៦. សកម្មភាព Email</button>
              <button class="sim-tab-btn" id="sim-tab-7" onclick="selectDay26Sim(7)">៧. តុការងារជាង</button>
            </div>
            <div class="sim-stage-content" id="sim-day26-display">
              <!-- Populated dynamically by selectDay26Sim(1) -->
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការស្វែងយល់ពីឧបករណ៍ពិសោធន៍ជាក់ស្តែង (Sandbox Walkthrough) (៣ នាទី) ៖</strong> "ចុចផ្ទាំងពី ១ ដល់ ៧ លើស្លាយ។ សួរសិស្ស ៖ 'តើជំហានណាខ្លះកើតឡើងក្នុង Power Apps? ជំហានណាក្នុង SharePoint? ជំហានណាក្នុង Power Automate?' ផ្ទៀងផ្ទាត់ថាពួកគេយល់ច្បាស់ពីការផ្ទេរការងារ។"</p>`
    },

    // Slide 17 (Index 16): Trainer Live Demonstration
    {
      title: "ការបង្ហាញផ្ទាល់ដោយគ្រូបង្វឹក ៖ ការតភ្ជាប់ប្រព័ន្ធក្នុងរយៈពេល ១៥ នាទី",
      segment: "ផ្នែកទី ៩ &bull; ការបង្ហាញផ្ទាល់",
      subtitle: "មើលគ្រូបង្វឹកបង្កើត និងតភ្ជាប់កម្មវិធី ៣ អេក្រង់ និង Cloud Flow ២ ជំហានដោយផ្ទាល់។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">ជំហាន ១ &bull; ៤ នាទី</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">តភ្ជាប់ការប្តូរអេក្រង់ (Screen Navigation)</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5;">
              បង្កើត ៣ អេក្រង់។ បន្ថែមប៊ូតុងជាមួយ <code>NewForm(); Navigate()</code> និង <code>ResetForm(); Back()</code>។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">ជំហាន ២ &bull; ៣ នាទី</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">ភ្ជាប់ Form &amp; Item</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5;">
              ភ្ជាប់ <code>frmNewOrder</code> ក្នុង New mode; ភ្ជាប់ <code>frmEditOrder</code> ក្នុង Edit mode ជាមួយ <code>Item = galWorkOrders.Selected</code>។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ជំហាន ៣ &bull; ៣ នាទី</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">ផ្ទៀងផ្ទាត់ &amp; Hooks</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5;">
              កំណត់ <code>btnSubmit.DisplayMode</code> ជាមួយ <code>If(IsBlank(...))</code> និងដាក់ <code>Notify()</code> ក្នុង <code>OnSuccess</code>។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc;">ជំហាន ៤ &bull; ៥ នាទី</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">បង្កើត Cloud Flow</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5;">
              បើក Power Automate បង្កើត Flow ៖ "When item is created" ➔ "Send an email (V2)"។ ធ្វើតេស្តជាក់ស្តែង!
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការណែនាំការបង្ហាញផ្ទាល់ (១៥ នាទី) ៖</strong> "រក្សាការចុចក្នុង Studio ឱ្យមានភាពស្ងប់ស្ងាត់ និងច្បាស់លាស់។ បង្ហាញសិស្សពីល្បឿននៃការបង្កើតនៅពេលយើងមានប្លង់មេថ្ងៃទី ២៥។ បញ្ជូនសំបុត្រតេស្តផ្ទាល់ ហើយមើលអ៊ីមែលធ្លាក់ចូល Outlook ក្នុងពេលជាក់ស្តែង!"</p>`
    },

    // Slide 18 (Index 17): Guided Practice
    {
      title: "ការអនុវត្តរួមគ្នា ៖ តភ្ជាប់អេក្រង់ Home ទៅកាន់ការកត់ត្រាថ្មី",
      segment: "ផ្នែកទី ១០ &bull; ការអនុវត្តរួមគ្នា",
      subtitle: "អនុវត្តតាម ៤ ជំហានជាលំដាប់ជាមួយគ្រូបង្វឹក ដើម្បីបង្កើតពាក់កណ្តាលដំបូងនៃខ្សែសង្វាក់ប្រព័ន្ធ។",
      content: `<div class="card">
            <h3 class="card-title">📝 បញ្ជីត្រួតពិនិត្យការអនុវត្ត</h3>
            <ol style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.7; padding-left: 1.2rem;">
              <li>បន្ថែមប៊ូតុង <code>btnNewTicket</code> លើ <code>scr_Home</code>។ កំណត់ <code>Text = "+ New Work Order"</code>។</li>
              <li>កំណត់ <code>btnNewTicket.OnSelect = NewForm(frmNewWorkOrder); Navigate(scr_New)</code>។</li>
              <li>លើ <code>scr_New</code>, ជ្រើសរើស <code>btnSubmit</code> ហើយកំណត់ <code>DisplayMode</code> ជាមួយការផ្ទៀងផ្ទាត់ <code>IsBlank()</code>។</li>
              <li>ជ្រើសរើស <code>frmNewWorkOrder</code> ហើយកំណត់ <code>OnSuccess</code> ឱ្យបង្ហាញសារបៃតង និងប្តូរត្រឡប់ទៅកាន់ Home វិញ។</li>
            </ol>
          </div>

          <div class="card">
            <h3 class="card-title">🔍 ការផ្ទៀងផ្ទាត់ជាក់ស្តែង</h3>
            <div style="background: rgba(0, 0, 0, 0.35); padding: 0.85rem; border-radius: 6px; font-size: 0.85rem; color: #cbd5e1; line-height: 1.6;">
              &bull; <strong>តេស្តទី ១ ៖</strong> ចុច "+ New Work Order" &rarr; តើ Form បើកមកទទេស្អាតដែរឬទេ?<br>
              &bull; <strong>តេស្តទី ២ ៖</strong> តើប៊ូតុង Submit ចាក់សោពណ៌ប្រផេះ រហូតដល់អ្នករើសម៉ាស៊ីនដែរឬទេ?<br>
              &bull; <strong>តេស្តទី ៣ ៖</strong> បំពេញទិន្នន័យរួចចុច Submit &rarr; តើបន្ទះបៃតងលោតឡើង ហើយត្រឡប់ទៅ Home វិញដែរឬទេ?
            </div>
            <p style="color: #86efac; font-size: 0.82rem; margin-top: 0.75rem;">
              ប្រសិនបើតេស្តទាំង ៣ ទទួលបានជោគជ័យ ច្រកទ្វារទទួលទិន្នន័យរបស់អ្នកត្រូវបានបញ្ជាក់ ១០០%!
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការណែនាំសិស្ស (១៥ នាទី) ៖</strong> "ដើរមើល និងធានាថាសិស្សសរសេរ NewForm() លើប៊ូតុង។ ប្រយ័ត្នកំហុសអក្ខរាវិរុទ្ធក្នុង IsBlank()។ ផ្ទៀងផ្ទាត់ថាបន្ទះបៃតងបង្ហាញឡើង ហើយត្រឡប់ទៅ Home យ៉ាងរលូន។"</p>`
    },

    // Slide 19 (Index 18): Independent Mini-Task
    {
      title: "កិច្ចការស្វ័យសិក្សា ៖ ប្រព័ន្ធចម្រោះស្វែងរក &amp; ការផ្ញើសារអាសន្ន",
      segment: "ផ្នែកទី ១១ &bull; កិច្ចការស្វ័យសិក្សា",
      subtitle: "១២ នាទី ៖ រៀបចំប្រព័ន្ធចម្រោះ Gallery និងបង្កើត Flow ផ្ញើសារអ៊ីមែលដោយឯករាជ្យ។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">លក្ខខណ្ឌប្រឈម</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">កិច្ចការ ២ យ៉ាងដែលត្រូវធ្វើម្នាក់ឯង ៖</h4>
            <ul style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; padding-left: 1.2rem;">
              <li><strong>កិច្ចការ ១ (App) ៖</strong> បន្ថែម Text Input (<code>txtSearch</code>) លើ <code>scr_Home</code> ហើយស្រោប <code>galWorkOrders.Items</code> ជាមួយ <code>Search()</code> ដើម្បីឱ្យការវាយពាក្យ "spindle" ច្រោះ Gallery ភ្លាមៗ។</li>
              <li><strong>កិច្ចការ ២ (Flow) ៖</strong> ចូលទៅកាន់ make.powerautomate.com បង្កើត Flow ចាប់ផ្តើមដោយ "When an item is created" ហើយផ្ញើសារអ៊ីមែលទៅកាន់អ៊ីមែលផ្ទាល់ខ្លួនរបស់អ្នក។</li>
            </ul>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">លទ្ធផលរំពឹងទុក</span>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              នៅពេលអ្នកបញ្ជូនសំបុត្រថ្មីសម្រាប់ម៉ាស៊ីន "Lathe-01" ជាមួយការពិពណ៌នា "Oil pressure sensor failure" អ្នកត្រូវតែទទួលបានសារអ៊ីមែលក្នុង Inbox ក្នុងរយៈពេលក្រោម ២ នាទី!
            </p>
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(16, 185, 129, 0.1); border-radius: 6px; font-size: 0.82rem; color: #86efac;">
              ✓ សំបុត្របង្ហាញក្នុង Gallery &nbsp;&bull;&nbsp; ✓ សារអ៊ីមែលធ្លាក់ចូលក្នុង Inbox
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការសម្របសម្រួលកិច្ចការស្វ័យសិក្សា (១២ នាទី) ៖</strong> "ទុកពេលឱ្យសិស្សផ្តោតអារម្មណ៍ស្ងប់ស្ងាត់។ សង្កេតមើលអេក្រង់របស់ពួកគេ។ ពិនិត្យមើលថាតើពួកគេបានដាក់អ៊ីមែលផ្ទាល់ខ្លួនក្នុងប្រអប់ 'To' នៃសកម្មភាពផ្ញើអ៊ីមែលដែរឬទេ។"</p>`
    },

    // Slide 20 (Index 19): 3-Tier Troubleshooting
    {
      title: "សវនកម្មដោះស្រាយបញ្ហា ៣ ស្រទាប់ ៖ តើខ្សែសង្វាក់ខូចនៅត្រង់ណា?",
      segment: "ផ្នែកទី ១២ &bull; វិធីសាស្ត្រដោះស្រាយបញ្ហាប្រព័ន្ធ",
      subtitle: "នៅពេលនរណាម្នាក់ត្អូញត្អែរថា 'ខ្ញុំអត់បានទទួលអ៊ីមែលទេ!' ចូរអនុវត្តតាមលំដាប់នេះដោយមិនបាច់ទាយឡើយ។",
      content: `<div class="troubleshoot-grid">
            <div class="troubleshoot-card troubleshoot-tier-a">
              <span class="troubleshoot-badge" style="background: rgba(2, 132, 199, 0.2); color: #38bdf8;">ស្រទាប់ទី ១ &bull; Power Apps</span>
              <h4 style="color: #f8fafc; margin-bottom: 0.5rem;">តើ SharePoint ទទួលបានជួរដែរទេ?</h4>
              <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.5;">
                បើកបញ្ជី SharePoint ក្នុងកម្មវិធី Browser (Edge/Chrome)។ រកមើលសំបុត្រការងារថ្មីនោះ។
              </p>
              <div class="troubleshoot-check-item">
                <span style="color: #f87171;">✕ បាត់ជួរ ៖</span>
                <span>Power Apps រក្សាទុកមិនបានសម្រេច។ ពិនិត្យមើល Form.Error, OnFailure, និងប៊ូតុង។</span>
              </div>
              <div class="troubleshoot-check-item">
                <span style="color: #34d399;">✓ ឃើញជួរ ៖</span>
                <span>Power Apps ជោគជ័យ ១០០%! <strong>កុំប៉ះកូដ APP ឱ្យសោះ!</strong> ឆ្ពោះទៅស្រទាប់ទី ២។</span>
              </div>
            </div>

            <div class="troubleshoot-card troubleshoot-tier-b">
              <span class="troubleshoot-badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc;">ស្រទាប់ទី ២ &bull; Flow Trigger</span>
              <h4 style="color: #f8fafc; margin-bottom: 0.5rem;">តើ Flow បានភ្ញាក់ពីដំណេកទេ?</h4>
              <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.5;">
                បើក Power Automate &rarr; ចុចលើ Flow &rarr; ពិនិត្យ Run History។
              </p>
              <div class="troubleshoot-check-item">
                <span style="color: #f87171;">✕ គ្មាន Run សោះ ៖</span>
                <span>Trigger រកមិនឃើញជួរថ្មី។ ពិនិត្យមើលថាតើ Flow បើក "On" ឬគណនីផុតកំណត់។</span>
              </div>
              <div class="troubleshoot-check-item">
                <span style="color: #34d399;">✓ ឃើញមាន Run ៖</span>
                <span>Flow រកឃើញជួរថ្មី ហើយភ្ញាក់ពីដំណេក! ឆ្ពោះទៅស្រទាប់ទី ៣។</span>
              </div>
            </div>

            <div class="troubleshoot-card troubleshoot-tier-c">
              <span class="troubleshoot-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ស្រទាប់ទី ៣ &bull; ការបញ្ជូន Email</span>
              <h4 style="color: #f8fafc; margin-bottom: 0.5rem;">តើសារអ៊ីមែលពិតជាបានផ្ញើចេញទេ?</h4>
              <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.5;">
                ចុចលើ Run ក្នុងប្រវត្តិ ដើម្បីពិនិត្យមើលកាត "Send an email (V2)"។
              </p>
              <div class="troubleshoot-check-item">
                <span style="color: #f87171;">✕ សញ្ញាខ្វែងក្រហម ៖</span>
                <span>សកម្មភាពបរាជ័យ។ អ៊ីមែលអ្នកទទួលខុស ឬប្រអប់សារពេញ។</span>
              </div>
              <div class="troubleshoot-check-item">
                <span style="color: #34d399;">✓ សញ្ញាគ្រីសបៃតង ៖</span>
                <span>អ៊ីមែលផ្ញើរួចរាល់! ពិនិត្យមើលប្រអប់ Junk/Spam ក្នុង Outlook។</span>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>វិធីសាស្ត្រដោះស្រាយបញ្ហាជាប្រព័ន្ធ (៣ នាទី) ៖</strong> "សង្កត់ធ្ងន់លើវិធានមាសនេះ ៖ កុំប៉ះកូដ Power Apps ឱ្យសោះ ប្រសិនបើជួរទិន្នន័យមាននៅក្នុង SharePoint រួចហើយ! អ្នកចាប់ផ្តើមដំបូងតែងតែខាតពេលជាច្រើនម៉ោងទៅលុប controls ក្នុង App ទាំងដែលបញ្ហាពិតប្រាកដគឺគ្រាន់តែវាយខុសអាសយដ្ឋានអ៊ីមែលក្នុង Flow ប៉ុណ្ណោះ។"</p>`
    },

    // Slide 21 (Index 20): Misconceptions Demolished
    {
      title: "ការលុបបំបាត់ការយល់ខុស ៣ យ៉ាងរបស់អ្នកចាប់ផ្តើមដំបូង",
      segment: "ផ្នែកទី ១២ &bull; កែតម្រូវការយល់ដឹង",
      subtitle: "ការជំនួសគំរូគំនិតខុសឆ្គង ដោយវិន័យវិស្វកម្មសហគ្រាសដ៏រឹងមាំ។",
      content: `<div class="card" style="border-top: 3px solid #ef4444;">
            <span class="card-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">ការយល់ខុសទី ១</span>
            <h4 style="color: #f87171; margin: 0.5rem 0;">"Power Automate មកជំនួស Power Apps"</h4>
            <p style="color: var(--text-muted); font-size: 0.84rem; line-height: 1.5;">
              <strong>ខុស ៖</strong> គិតថាមួយជាកំណែអាប់ដេតរបស់មួយទៀត។<br><br>
              <strong>ការពិត ៖</strong> Power Apps គឺជាផ្ទៃមុខ (មនុស្សប៉ះវា)។ Power Automate គឺជាប្រព័ន្ធប្រសាទ (ការងារស្វ័យប្រវត្តិក្នង Cloud)។ ពួកវាធ្វើការជាដៃគូ!
            </p>
          </div>

          <div class="card" style="border-top: 3px solid #f59e0b;">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">ការយល់ខុសទី ២</span>
            <h4 style="color: #fbbf24; margin: 0.5rem 0;">"ដាក់ SendEmail() ក្នុងប៊ូតុង"</h4>
            <p style="color: var(--text-muted); font-size: 0.84rem; line-height: 1.5;">
              <strong>ខុស ៖</strong> ព្យាយាមញាត់កូដផ្ញើអ៊ីមែលក្នុង OnSelect នៃប៊ូតុង។<br><br>
              <strong>ការពិត ៖</strong> បើអ្នកប្រើបិទថេប្លេតភ្លាម អ៊ីមែលនឹងបរាជ័យ! Cloud flows ដំណើរការលើ Server ២៤/៧ មិនខ្វល់ពីថ្ម ឬឧបករណ៍អ្នកប្រើឡើយ។
            </p>
          </div>

          <div class="card" style="border-top: 3px solid #06b6d4;">
            <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">ការយល់ខុសទី ៣</span>
            <h4 style="color: #67e8f9; margin: 0.5rem 0;">"បង្កើតបញ្ជី SharePoint ២ ដាច់ដោយឡែក"</h4>
            <p style="color: var(--text-muted); font-size: 0.84rem; line-height: 1.5;">
              <strong>ខុស ៖</strong> បង្កើតតារាងមួយសម្រាប់ New និងមួយទៀតសម្រាប់ Edit។<br><br>
              <strong>ការពិត ៖</strong> Form ទាំងពីរបង្ហាញទៅកាន់ <code>WorkOrders</code> តែមួយ! NewForm បង្កើតជួរថ្មី; EditForm កែជួរចាស់ដោយមិនស្ទួន។
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការកែតម្រូវការយល់ខុស (៣ នាទី) ៖</strong> "ពន្យល់ស៊ីជម្រៅលើការយល់ខុសទី ២។ បញ្ជាក់ពីមូលហេតុដែលការផ្ញើអ៊ីមែលក្នុង App ងាយនឹងបរាជ័យលើទូរស័ព្ទ និងមូលហេតុដែល Cloud Flow ផ្តល់នូវស្ថិរភាពខ្ពស់បំផុត។"</p>`
    },

    // Slide 22 (Index 21): Formative Assessment Quiz
    {
      title: "ការត្រួតពិនិត្យចំណេះដឹងប្រព័ន្ធ (Dual-State Inspector)",
      segment: "ផ្នែកទី ១៣ &bull; ការវាយតម្លៃចំណេះដឹង",
      subtitle: "សាកល្បងការយល់ដឹងអំពីស្ថាបត្យកម្មប្រព័ន្ធរបស់អ្នក។ ចុចលើជម្រើសណាមួយដើម្បីពិនិត្យមើលការពន្យល់បច្ចេកទេស។",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;" id="quiz-day26-q-num">សំណួរទី ១ នៃ ៥</span>
                <button class="hud-btn" id="quiz-day26-next-btn" onclick="nextDay26QuizQuestion()" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;">បន្ទាប់ &rarr;</button>
              </div>
              <h3 class="card-title" id="quiz-day26-q-text" style="margin-top: 0.75rem; font-size: 1.15rem; line-height: 1.4;">អត្ថបទសំណួរ</h3>
              <div class="quiz-options" id="quiz-day26-options-container">
                <!-- Dynamically populated by JS renderDay26QuizQuestion() -->
              </div>
            </div>

            <div class="quiz-inspector-card" id="quiz-day26-feedback-box">
              <div class="feedback-placeholder" id="quiz-day26-placeholder">
                <span style="font-size: 2.5rem; color: var(--text-dim); margin-bottom: 0.5rem;">🔍</span>
                <h4 style="color: var(--text-muted);">សូមជ្រើសរើសចម្លើយមួយ</h4>
                <p style="font-size: 0.85rem; color: var(--text-dim); max-width: 280px; margin-top: 0.35rem;">
                  ចុចលើជម្រើសណាមួយនៅខាងឆ្វេង ដើម្បីផ្ទៀងផ្ទាត់គោលការណ៍ស្ថាបត្យកម្ម។
                </p>
              </div>
              <div class="feedback-content" id="quiz-day26-feedback-content" style="display: none; flex-direction: column;">
                <span class="card-badge" id="quiz-day26-feedback-badge" style="margin-bottom: 0.5rem;">លទ្ធផល</span>
                <h4 id="quiz-day26-feedback-status" style="margin-bottom: 0.5rem; font-size: 1.1rem;">ស្ថានភាព</h4>
                <p id="quiz-day26-feedback-text" style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.6;">ការពន្យល់លម្អិត</p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការសម្របសម្រួលសំណួរ (៣ នាទី) ៖</strong> "អានសំណួរឱ្យឮៗ។ ឱ្យសិស្សពន្យល់ពីមូលហេតុដែលពួកគេជ្រើសរើសចម្លើយនោះ មុនពេលចុច។ ផ្តោតជាពិសេសលើសំណួរទី ៥ (ការដោះស្រាយបញ្ហា)។"</p>`
    },

    // Slide 23 (Index 22): Final Challenge & Rubric
    {
      title: "កិច្ចការប្រឡងបញ្ចប់ ៖ ការផ្ទេរការងាររោងចក្រដ៏ល្អឥតខ្ចោះ",
      segment: "ផ្នែកទី ១៤ &bull; រូបប៊្រិកវាយតម្លៃ",
      subtitle: "បង្ហាញនូវវដ្តប្រតិបត្តិការពេញលេញ ដែលមិនអាចបំបែកបានពីដើមរហូតដល់ចប់។",
      content: `<div class="card">
            <table class="rubric-table">
              <thead>
                <tr>
                  <th>វិមាត្រ</th>
                  <th>កម្រិត ១ ៖ អ្នកចាប់ផ្តើម (Novice)</th>
                  <th>កម្រិត ២ ៖ អ្នកមានសមត្ថភាព (Competent)</th>
                  <th>កម្រិត ៣ ៖ វិស្វករជាន់ខ្ពស់ (Master Engineer)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>លំហូរ &amp; ការប្តូរអេក្រង់ (Navigation)</strong></td>
                  <td>អេក្រង់មាន ប៉ុន្តែប៊ូតុងដើរទាល់ច្រក; អ្នកប្រើប្រាស់ជាប់គាំងលើទម្រង់។</td>
                  <td>Home ➔ New ➔ Detail/Edit ប្តូរអេក្រង់យ៉ាងរលូនជាមួយ <code>NewForm()</code> និង <code>Back()</code>។</td>
                  <td>បទពិសោធន៍ UX ឥតខ្ចោះ។ <code>OnSuccess</code> ត្រឡប់ទៅ Home ជាមួយបន្ទះបៃតង; Gallery ធ្វើបច្ចុប្បន្នភាពភ្លាមៗ។</td>
                </tr>
                <tr>
                  <td><strong>ការផ្ទៀងផ្ទាត់ &amp; Binding</strong></td>
                  <td>គ្មានការផ្ទៀងផ្ទាត់; រក្សាទុកទិន្នន័យទទេ; Edit form ប្រើ ID សរសេរដៃ។</td>
                  <td><code>btnSubmit.DisplayMode</code> ចាក់សោពេលទទេ; EditForm ភ្ជាប់ជាមួយ <code>galWorkOrders.Selected</code>។</td>
                  <td>ការផ្ទៀងផ្ទាត់រឹងមាំលើគ្រប់វាលចាំបាច់; កែសម្រួលយ៉ាងរលូនដោយគ្មានការបង្កើតជួរស្ទួនឡើយ។</td>
                </tr>
                <tr>
                  <td><strong>ស្វ័យប្រវត្តិកម្ម Cloud (Flow)</strong></td>
                  <td>គ្មាន Flow ឬអាសយដ្ឋានអ៊ីមែលសរសេរដៃរឹងក្នុងប៊ូតុង Power Apps។</td>
                  <td>Automated flow ដាស់ខ្លួនពេលបង្កើតជួរក្នុង SharePoint; ផ្ញើសារអ៊ីមែលមូលដ្ឋាន។</td>
                  <td>Flow ដាស់ខ្លួនយ៉ាងរហ័ស, ប្រើស្លាក Dynamic Content (ID, Machine, Priority), និងសិស្សពន្យល់ការដោះស្រាយបញ្ហា ៣ កម្រិតបានច្បាស់។</td>
                </tr>
              </tbody>
            </table>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការពិនិត្យរូបប៊្រិក (២ នាទី) ៖</strong> "បង្ហាញសិស្សនូវកម្រិតទាំង ៣។ អបអរសាទរពួកគេថា តាមរយៈការតភ្ជាប់ ៣ អេក្រង់ និង Power Automate ពួកគេសម្រេចបានកម្រិតទី ២ និងកំពុងឈានទៅកម្រិតទី ៣!"</p>`
    },

    // Slide 24 (Index 23): Wrap-Up & Bridge Forward
    {
      title: "សេចក្តីសង្ខេបថ្ងៃទី ២៦ ៖ អ្នកបានបង្កើតប្រព័ន្ធសហគ្រាសពេញលេញ!",
      segment: "ផ្នែកទី ១៥ &bull; សំយោគ និងស្ពានចម្លង",
      subtitle: "ក្រឡេកមើលសមិទ្ធផលដែលយើងសម្រេចបានថ្ងៃនេះ និងការត្រៀមខ្លួនសម្រាប់ Capstone ឯករាជ្យថ្ងៃទី ២៧។",
      content: `<div class="card" style="border-left: 3px solid #06b6d4;">
            <h3 class="card-title">🎯 ជ័យជម្នះថ្ងៃនេះ (ថ្ងៃទី ២៦)</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              អ្នកមិនមែនគ្រាន់តែរៀនរូបមន្ត Power Apps មួយផ្សេងទៀតនោះទេ។ អ្នកបានតភ្ជាប់ប្រព័ន្ធអេកូឡូស៊ីអាជីវកម្មទាំងមូល ៖
            </p>
            <div style="margin-top: 0.75rem; padding: 0.75rem; background: rgba(6, 182, 212, 0.1); border-radius: 6px; font-family: var(--font-code); font-size: 0.82rem; color: #67e8f9;">
              Home &rarr; New &rarr; ផ្ទៀងផ្ទាត់ &rarr; រក្សាទុក &rarr; SharePoint &rarr; Flow Trigger &rarr; សារ Email &rarr; កែប្រែ
            </div>
            <p style="color: var(--text-muted); font-size: 0.84rem; line-height: 1.5; margin-top: 0.75rem;">
              អ្នកបានលុបបំបាត់សំបុត្រស្ទួន ទប់ស្កាត់ទិន្នន័យទទេ និងធានាថាមេជាងទទួលបានដំណឹងស្វ័យប្រវត្តិក្នងរយៈពេលប៉ុន្មានវិនាទី។
            </p>
          </div>

          <div class="card" style="border-left: 3px solid #f59e0b;">
            <h3 class="card-title">🌉 ស្ពានចម្លងទៅថ្ងៃស្អែក ៖ Capstone ថ្ងៃទី ២៧</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              ថ្ងៃស្អែកគឺជាថ្ងៃបញ្ចប់ការសិក្សារបស់យើង ៖ <strong>ការផ្ទេរចំណេះដឹងដោយឯករាជ្យ (Independent Transfer)</strong>។
            </p>
            <div style="margin-top: 0.75rem; padding: 0.75rem; background: rgba(245, 158, 11, 0.1); border-radius: 6px; font-family: var(--font-code); font-size: 0.82rem; color: #fcd34d;">
              ថ្ងៃទី ២៧ ៖ វិញ្ញាបនបត្រគម្រោងបញ្ចប់ Capstone ឯករាជ្យ<br>
              អ្នកនឹងរចនា និងបង្កើតដំណោះស្រាយសហគ្រាសពេញលេញមួយពីដើមដោយខ្លួនឯង ដោយគ្មានការពឹងផ្អែកលើគ្រូឡើយ!
            </div>
            <p style="color: #fcd34d; font-size: 0.85rem; font-weight: bold; margin-top: 0.75rem;">
              អ្នកមានសមត្ថភាពគ្រប់គ្រាន់ហើយ។ សម្រាកឱ្យបានស្រួលយប់នេះ — ថ្ងៃស្អែកអ្នកនឹងបង្ហាញនូវភាពស្ទាត់ជំនាញរបស់អ្នក!
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការអបអរសាទរបញ្ចប់ (២ នាទី) ៖</strong> "អបអរសាទរចំពោះសមិទ្ធផលដ៏ធំធេងរបស់ពួកគេ! រំលឹកឡើងវិញនូវការតភ្ជាប់ពីមុន ➔ ថ្ងៃនេះ ➔ ថ្ងៃស្អែក។ ថ្ងៃស្អែកក្នុងថ្ងៃទី ២៧ ពួកគេនឹងបង្ហាញសមត្ថភាពរបស់ខ្លួនដោយឯករាជ្យទាំងស្រុង។ ជួបគ្នានៅថ្ងៃស្អែក!'"</p>`
    }
  ];

  // --------------------------------------------------------------------------
  // 2. ENGLISH SPEAKER NOTES (24 SLIDES)
  // --------------------------------------------------------------------------
  const ENGLISH_NOTES = {
    0: "<h4>TRAINER SPEAKING NOTES:</h4><p><strong>Opening Hook (2 min):</strong> 'Welcome to Day 26! For 25 days, you learned individual tools: buttons, formulas, SharePoint lists, galleries, forms, and architectural blueprints. Today, we don't build isolated buttons. Today, we bring the whole factory system to life!'</p><p><strong>The Core Connection:</strong> Walk across the mental model chain: Home ➔ New ➔ Validation ➔ Save ➔ SharePoint ➔ Flow Trigger ➔ Email Alert ➔ Details/Edit. Explain that a professional application connects humans, cloud databases, and automated background flows seamlessly.</p>",
    1: "<h4>AGENDA OVERVIEW:</h4><p>Notice our 8-part schedule. Notice that we don't start with Power Automate. We master the complete Power App first. Once our app reliably writes records to SharePoint, we introduce Power Automate as the natural next step.</p>",
    2: "<h4>JOURNEY SYNTHESIS:</h4><p>Walk the student through the 4 milestones. In Days 1-10, they learned the controls. In Days 11-16, they navigated screens. In Days 17-24, they saved to SharePoint. Yesterday in Day 25, they designed the blueprint. Today, all four pillars fuse into one living system.</p>",
    3: "<h4>ACTIVE RETRIEVAL:</h4><p>Have 3 different students answer each card before clicking. Praise them when they use the core concepts: 'protect the database', 'Item binds to Selected', and 'truth in feedback'.</p>",
    4: "<h4>STORYTELLING & EMOTION:</h4><p>Ask students: 'If you order an Uber, what happens if the screen doesn't show a driver and no car comes?' You get angry and close the app. Software is about human trust. When a machine breaks, the person who fixes it must be alerted automatically.</p>",
    5: "<h4>PLAIN-LANGUAGE DEMYSTIFICATION:</h4><p>Go row by row. Notice how simple Power Automate is when you define it in child-simple language: A trigger is 'What starts it'; an action is 'What it does next'. No jargon allowed!</p>",
    6: "<h4>REAL-WORLD ANALOGY:</h4><p>Ask students: 'Did the customer call the driver? Did the cashier walk into the kitchen?' No! The software did the hand-off. That is what we are building today for machine breakdowns.</p>",
    7: "<h4>FACTORY FLOW CONNECTION:</h4><p>Notice how every human persona has their exact role: The Operator reports; SharePoint stores; Power Automate alerts; the Technician resolves. This is digital transformation!</p>",
    8: "<h4>ECOSYSTEM SYNTHESIS:</h4><p>Have the learner recite the chain: User ➔ Power Apps ➔ SharePoint ➔ Power Automate ➔ Notification ➔ Person. Emphasize that Power Automate is not an isolated tool—it is the notification bridge triggered by SharePoint.</p>",
    9: "<h4>SCREEN 1 PURPOSE:</h4><p>Demonstrate why NewForm() is on the button on Screen 1. If an operator previously typed something and cancelled, NewForm() guarantees a sparkling clean slate!</p>",
    10: "<h4>SCREEN 2 PURITY:</h4><p>Notice that Screen 2 has only ONE job: intake. No galleries, no unrelated stats. Just clean input, validation, and safe submission.</p>",
    11: "<h4>THE WORKBENCH:</h4><p>Remind students: Why does SubmitForm() on this screen UPDATE instead of CREATE? Because FormMode is Edit and Item is galWorkOrders.Selected! It tells SharePoint: 'Don't make row 420; update row 419.'</p>",
    12: "<h4>DECONSTRUCTING THE WRAPPER:</h4><p>Teach the Russian nesting doll analogy: The innermost layer is the SharePoint table; Filter() trims rows by machine; Search() trims rows by keyword; Gallery displays the result.</p>",
    13: "<h4>FIRST INTRO TO POWER AUTOMATE:</h4><p>Do NOT use advanced jargon like JSON, webhooks, or variables! Keep it child-simple: Trigger = what starts it; Action = what it does next. That is the entire foundation of cloud automation.</p>",
    14: "<h4>DYNAMIC CONTENT TOKENS:</h4><p>Show students the dynamic content lightning bolt. Explain: 'We don't type CNC-02 manually in the email template. We select the MachineID token, so the email is personalized for whichever machine broke!'</p>",
    15: "<h4>SIMULATOR EXPLORATION:</h4><p>Click from tab 1 to 7 on the slide. Ask the learner: 'Which steps happen inside Power Apps? Which happen in SharePoint? Which happen in Power Automate?' Verify they see the hand-offs clearly.</p>",
    16: "<h4>LIVE DEMO SCRIPT:</h4><p>Keep studio actions calm and deliberate. Show students how fast you assemble the app when following the Day 25 blueprint. Submit a live test ticket and watch the Outlook email arrive in real-time!</p>",
    17: "<h4>GUIDED COACHING:</h4><p>Walk around and ensure students write NewForm() on the button. Watch out for typos in IsBlank(). Confirm that the green banner appears and returns them home smoothly.</p>",
    18: "<h4>INDEPENDENT FACILITATION:</h4><p>Give students quiet focus time. Observe their screens. Check if they put their own email address in the 'To' field of the email action.</p>",
    19: "<h4>SYSTEMATIC DEBUGGING:</h4><p>Emphasize this golden rule: Never touch Power Apps code if the row exists in SharePoint! Beginners waste hours breaking their apps when the issue was just a typo in an email address.</p>",
    20: "<h4>MYTH BUSTING:</h4><p>Drill down on Myth 2. Explain why in-app emails are fragile on mobile devices and why cloud flows provide bulletproof reliability.</p>",
    21: "<h4>QUIZ FACILITATION:</h4><p>Read the questions aloud. Have the learner explain WHY they picked an answer before clicking. Highlight Question 5 (Troubleshooting).</p>",
    22: "<h4>RUBRIC REVIEW:</h4><p>Show students the 3 levels. Congratulate them that by connecting the 3 screens and Power Automate, they have achieved Level 2 and are reaching for Level 3!</p>",
    23: "<h4>CLOSING CELEBRATION:</h4><p>Celebrate their massive achievement! Review the before ➔ today ➔ next connection. Tomorrow in Day 27, they will demonstrate their mastery completely independently. See you tomorrow!</p>"
  };

  // --------------------------------------------------------------------------
  // 3. INTERACTIVE 7-STEP PIPELINE SIMULATOR DATA (ENGLISH & KHMER)
  // --------------------------------------------------------------------------
  const DAY26_SIM_DATA = {
    1: {
      step: "Step 1: Mission Control (scr_Home)",
      badge: "Power Apps UI",
      title: "Operator Starts on Main Browse Screen",
      content: "Operator notices amber warning light on Line 2. Opens Power Apps tablet, views active list of work orders, and taps the amber button <code>+ New Work Order</code>.",
      output: "Event Triggered: <code>NewForm(frmNewWorkOrder); Navigate(scr_New, ScreenTransition.Cover)</code>"
    },
    2: {
      step: "Step 2: Intake Gate (scr_New)",
      badge: "Intake Form",
      title: "Clean Canvas in FormMode.New",
      content: "The intake form opens with a sparkling clean slate. Operator selects Machine 'CNC-02', Priority 'Critical', and types issue: 'Coolant pump motor jammed, spindle overheating'.",
      output: "Form State: <code>frmNewWorkOrder.Mode = FormMode.New</code> ready for fresh row creation."
    },
    3: {
      step: "Step 3: Validation Gatekeeper",
      badge: "Power Fx Logic",
      title: "Enforcing Complete Human Input",
      content: "While fields were empty, Submit button was gray and unclickable. The second Machine and Issue are filled out, the condition evaluates to False, unlocking the button to Edit mode!",
      output: "Rule Active: <code>btnSubmit.DisplayMode = If(IsBlank(...) Or IsBlank(...), DisplayMode.Disabled, DisplayMode.Edit)</code>"
    },
    4: {
      step: "Step 4: Save to Cloud Storage",
      badge: "SharePoint Write",
      title: "SubmitForm & OnSuccess Confirmation",
      content: "Operator taps Submit. Form sends HTTP POST to SharePoint. Row #WO-1045 is created. <code>OnSuccess</code> displays green notification and routes operator back to Home screen.",
      output: "Feedback Fired: <code>Notify('Work order logged!', NotificationType.Success); Navigate(scr_Home)</code>"
    },
    5: {
      step: "Step 5: Cloud Flow Trigger",
      badge: "Power Automate",
      title: "Trigger: When an item is created",
      content: "Deep in the Microsoft Cloud, Power Automate's 24/7 listener detects the new row in SharePoint list 'WorkOrders'. The flow wakes up instantly independent of the user's tablet!",
      output: "Trigger Fired: SharePoint item #WO-1045 detected with all column tokens available."
    },
    6: {
      step: "Step 6: Supervisor Notification",
      badge: "Outlook Action",
      title: "Action: Send an email (V2)",
      content: "Flow formats an urgent notification email with dynamic tokens: '🚨 CRITICAL Work Order WO-1045 logged for CNC-02 by Operator Dara' and delivers it to Supervisor Sokha's inbox in 45 seconds.",
      output: "Action Completed: Email successfully dispatched to Sokha@apex.com with direct link."
    },
    7: {
      step: "Step 7: Tech Workbench Update",
      badge: "Maintenance Resolution",
      title: "Technician Updates Record via gal.Selected",
      content: "Lead Tech Dara sees the red WO-1045 ticket at the top of the Home gallery. Taps chevron ➔ <code>scr_DetailEdit</code> opens in <code>FormMode.Edit</code> bound to <code>Item = galWorkOrders.Selected</code>. Dara logs $120 gasket cost, marks 'Resolved', and saves!",
      output: "System Harmony: Existing row #WO-1045 updated without creating duplicate records!"
    }
  };

  const DAY26_SIM_DATA_KH = {
    1: {
      step: "ជំហានទី ១ ៖ មជ្ឈមណ្ឌលបញ្ជា (scr_Home)",
      badge: "ផ្ទៃកម្មវិធី Power Apps",
      title: "កម្មករចាប់ផ្តើមលើអេក្រង់ទំព័រដើម",
      content: "កម្មករឃើញភ្លើងសញ្ញាអាសន្នលើខ្សែសង្វាក់ទី ២។ បើកថេប្លេត Power Apps មើលបញ្ជីសំបុត្រការងារសកម្ម រួចចុចលើប៊ូតុងពណ៌លឿង <code>+ New Work Order</code>។",
      output: "ព្រឹត្តិការណ៍ដំណើរការ ៖ <code>NewForm(frmNewWorkOrder); Navigate(scr_New, ScreenTransition.Cover)</code>"
    },
    2: {
      step: "ជំហានទី ២ ៖ ច្រកទទួលព័ត៌មាន (scr_New)",
      badge: "ទម្រង់បញ្ចូលទិន្នន័យ",
      title: "ផ្ទាំងទទេស្អាតក្នុង FormMode.New",
      content: "ទម្រង់បែបបទបើកឡើងជាមួយផ្ទាំងទទេស្អាត។ កម្មកររើសម៉ាស៊ីន 'CNC-02', អាទិភាព 'Critical', និងវាយបញ្ហា ៖ 'ម៉ូទ័របូមទឹកត្រជាក់ស្ទះ spindle ឡើងកម្តៅខ្លាំង'។",
      output: "ស្ថានភាព Form ៖ <code>frmNewWorkOrder.Mode = FormMode.New</code> ត្រៀមបង្កើតជួរទិន្នន័យថ្មី។"
    },
    3: {
      step: "ជំហានទី ៣ ៖ ច្រកទ្វារផ្ទៀងផ្ទាត់សុវត្ថិភាព",
      badge: "តក្កវិជ្ជា Power Fx",
      title: "ការអនុវត្តការបំពេញទិន្នន័យចាំបាច់",
      content: "ពេលដែលវាលទិន្នន័យនៅទទេ ប៊ូតុង Submit មានពណ៌ប្រផេះចុចមិនកើត។ ពេលដែលឈ្មោះម៉ាស៊ីន និងបញ្ហាត្រូវបានបំពេញ លក្ខខណ្ឌវាយតម្លៃ False ដោះសោប៊ូតុងឱ្យចុចបានភ្លាម!",
      output: "វិធានសកម្ម ៖ <code>btnSubmit.DisplayMode = If(IsBlank(...) Or IsBlank(...), DisplayMode.Disabled, DisplayMode.Edit)</code>"
    },
    4: {
      step: "ជំហានទី ៤ ៖ រក្សាទុកក្នុង Cloud Storage",
      badge: "ការសរសេរ SharePoint",
      title: "SubmitForm &amp; ការបញ្ជាក់ OnSuccess",
      content: "កម្មករចុច Submit។ Form បញ្ជូន HTTP POST ទៅកាន់ SharePoint។ ជួរលេខ #WO-1045 ត្រូវបានបង្កើត។ <code>OnSuccess</code> បង្ហាញបន្ទះបៃតងបញ្ជាក់ និងបញ្ជូនកម្មករត្រឡប់ទៅ Home វិញ។",
      output: "ការឆ្លើយតប ៖ <code>Notify('បានរក្សាទុកសំបុត្រការងារ!', NotificationType.Success); Navigate(scr_Home)</code>"
    },
    5: {
      step: "ជំហានទី ៥ ៖ ផ្កាភ្លើងដាស់ Flow (Trigger)",
      badge: "Power Automate",
      title: "Trigger ៖ When an item is created",
      content: "ជ្រៅក្នុង Microsoft Cloud ប្រព័ន្ធស្តាប់ ២៤/៧ របស់ Power Automate រកឃើញជួរថ្មីក្នុងបញ្ជី SharePoint 'WorkOrders'។ Flow ដាស់ខ្លួនភ្លាមៗដោយមិនខ្វល់ពីថេប្លេតអ្នកប្រើឡើយ!",
      output: "Trigger ដំណើរការ ៖ រកឃើញទិន្នន័យជួរ #WO-1045 ជាមួយស្លាក Dynamic Content ទាំងអស់។"
    },
    6: {
      step: "ជំហានទី ៦ ៖ ការជូនដំណឹងដល់មេជាង",
      badge: "សកម្មភាព Outlook",
      title: "Action ៖ Send an email (V2)",
      content: "Flow រៀបចំសារអ៊ីមែលបន្ទាន់ជាមួយ Dynamic Content ៖ '🚨 សំបុត្របន្ទាន់ WO-1045 លើម៉ាស៊ីន CNC-02 ដោយកម្មករដារ៉ា' ហើយបញ្ជូនទៅកាន់ប្រអប់សាររបស់មេជាងសុខាក្នុងរយៈពេល ៤៥ វិនាទី។",
      output: "សកម្មភាពជោគជ័យ ៖ អ៊ីមែលត្រូវបានបញ្ជូនទៅកាន់ Sokha@apex.com ជាមួយតំណភ្ជាប់ផ្ទាល់។"
    },
    7: {
      step: "ជំហានទី ៧ ៖ តុការងារជាងធ្វើបច្ចុប្បន្នភាព",
      badge: "ការដោះស្រាយបញ្ហា",
      title: "ជាងកែប្រែទិន្នន័យតាមរយៈ gal.Selected",
      content: "មេជាងដារ៉ាឃើញសំបុត្រក្រហម WO-1045 នៅកំពូលនៃ Gallery។ ចុចសញ្ញាព្រួញ ➔ <code>scr_DetailEdit</code> បើកឡើងក្នុង <code>FormMode.Edit</code> ភ្ជាប់ជាមួយ <code>Item = galWorkOrders.Selected</code>។ ដារ៉ាកត់ត្រាថ្លៃបន្លាស់ $120 កែជា 'Resolved' រួច Save!",
      output: "ភាពសុក្រឹតនៃប្រព័ន្ធ ៖ ជួរចាស់ #WO-1045 ត្រូវបានកែប្រែដោយមិនបង្កើតជួរស្ទួនឡើយ!"
    }
  };

  // --------------------------------------------------------------------------
  // 4. FORMATIVE ASSESSMENT QUIZ DATA (ENGLISH & KHMER)
  // --------------------------------------------------------------------------
  const QUIZ_QUESTIONS = [
    {
      question: "Why do both frmNewWorkOrder (on Screen 2) and frmEditWorkOrder (on Screen 3) point to the EXACT SAME SharePoint list 'WorkOrders'?",
      options: [
        "Because Microsoft Power Apps crashes if you create more than one data source.",
        "Because they represent two stages of the same record lifecycle: NewForm creates the row, while EditForm updates that exact same row without duplicating data.",
        "Because SharePoint only allows one list per company tenant.",
        "Because Power Automate cannot read from two different screens."
      ],
      correct: 1,
      explanation: "Correct! Both forms target the same database table. FormMode.New sends an insert command, while FormMode.Edit bound to galWorkOrders.Selected sends an update command to the existing row."
    },
    {
      question: "What happens if an operator submits a Critical work order while mobile internet drops for 10 seconds?",
      options: [
        "The phone automatically saves the data into the supervisor's Outlook mailbox directly.",
        "SubmitForm() fails; because Notify() is placed inside OnSuccess, the app will NOT falsely report success, allowing OnFailure to alert the user that the network dropped.",
        "The app permanently deletes the machine record from SharePoint.",
        "The tablet restarts automatically."
      ],
      correct: 1,
      explanation: "Correct! This is why OnSuccess exists. If WiFi drops, SubmitForm() fails, OnSuccess does not run, and the app never lies to the user. OnFailure tells them to retry safely."
    },
    {
      question: "Why is an automated cloud flow (Power Automate) better for supervisor notifications than having the operator's tablet send an email directly?",
      options: [
        "Because tablets are physically forbidden from sending emails in Windows.",
        "Because cloud flows run 24/7 on Microsoft servers; once the row lands in SharePoint, the alert sends reliably even if the operator shuts down their tablet or enters an elevator with no signal.",
        "Because Power Automate makes the tablet battery charge 50% faster.",
        "Because Power Apps buttons can only hold up to 3 lines of code."
      ],
      correct: 1,
      explanation: "Correct! Cloud flows are decoupled from the user's mobile device. Even if the worker drops their tablet in a puddle or walks into a dead zone, the cloud flow executes reliably."
    },
    {
      question: "In Power Automate, what is the exact difference between a Trigger and an Action?",
      options: [
        "Triggers are for mobile phones; Actions are for desktop computers.",
        "A Trigger is the event that wakes the flow up ('What starts it'); an Action is the work performed by the flow after waking up ('What it does next').",
        "Triggers cost money, but Actions are always free.",
        "Triggers only work on Mondays, but Actions work every day."
      ],
      correct: 1,
      explanation: "Correct! Child-simple definition: The Trigger is 'What starts it' (When an item is created in SharePoint); the Action is 'What it does next' (Send an email notification)."
    },
    {
      question: "An operator logged ticket WO-1049. You open SharePoint and see WO-1049. But the supervisor says she never got an email. Where should you look first, and what should you NOT touch?",
      options: [
        "Immediately delete the submit button in Power Apps and rewrite all formulas.",
        "Open Power Automate and inspect the Run History; DO NOT touch Power Apps code because the row in SharePoint proves the app worked 100% perfectly!",
        "Restart the factory's main electrical power generator.",
        "Create a brand new SharePoint list and delete the old one."
      ],
      correct: 1,
      explanation: "Correct! Tier A passed because the row exists in SharePoint! Therefore, Power Apps is 100% innocent. Touching your app code will only break working software. Go straight to Power Automate Run History!"
    }
  ];

  const QUIZ_QUESTIONS_KH = [
    {
      question: "ហេតុអ្វីបានជា frmNewWorkOrder (លើអេក្រង់ ២) និង frmEditWorkOrder (លើអេក្រង់ ៣) ភ្ជាប់ទៅកាន់បញ្ជី SharePoint 'WorkOrders' តែមួយដូចគ្នា?",
      options: [
        "ដោយសារតែ Power Apps នឹងគាំង ប្រសិនបើអ្នកបង្កើតប្រភពទិន្នន័យលើសពីមួយ។",
        "ដោយសារតែពួកវាតំណាងឱ្យដំណាក់កាល ២ នៃវដ្តជីវិតកំណត់ត្រាតែមួយ ៖ NewForm បង្កើតជួរថ្មី ចំណែក EditForm កែប្រែជួរចាស់នោះដោយមិនបង្កើតទិន្នន័យស្ទួនឡើយ។",
        "ដោយសារតែ SharePoint អនុញ្ញាតឱ្យក្រុមហ៊ុនមួយមានបញ្ជីទិន្នន័យតែមួយប៉ុណ្ណោះ។",
        "ដោយសារតែ Power Automate មិនអាចអានទិន្នន័យពីអេក្រង់ពីរផ្សេងគ្នាបាន។"
      ],
      correct: 1,
      explanation: "ត្រឹមត្រូវហើយ! Form ទាំងពីរបង្ហាញទៅកាន់តារាងទិន្នន័យតែមួយ។ FormMode.New បញ្ជូនពាក្យបញ្ជាបង្កើតថ្មី ចំណែក FormMode.Edit ភ្ជាប់ជាមួយ galWorkOrders.Selected បញ្ជូនពាក្យបញ្ជាកែប្រែជួរចាស់។"
    },
    {
      question: "តើមានអ្វីកើតឡើង ប្រសិនបើកម្មករចុច Submit សំបុត្របន្ទាន់ ខណៈពេលដែលសេវាអ៊ីនធឺណិតដាច់រយៈពេល ១០ វិនាទី?",
      options: [
        "ទូរស័ព្ទនឹងរក្សាទុកទិន្នន័យដោយស្វ័យប្រវត្តិទៅក្នុង Outlook របស់មេជាងដោយផ្ទាល់។",
        "SubmitForm() នឹងបរាជ័យ; ដោយសារតែ Notify() ស្ថិតក្នុង OnSuccess នោះកម្មវិធីនឹងមិនកុហកថាជោគជ័យឡើយ ហើយ OnFailure នឹងប្រាប់កម្មករឱ្យដឹងថាដាច់សេវា។",
        "កម្មវិធីនឹងលុបកំណត់ត្រាម៉ាស៊ីនចោលជាអចិន្ត្រៃយ៍ពី SharePoint។",
        "ថេប្លេតនឹងបិទបើកឡើងវិញដោយស្វ័យប្រវត្តិ។"
      ],
      correct: 1,
      explanation: "ត្រឹមត្រូវហើយ! នេះជាមូលហេតុដែល OnSuccess កើតឡើង។ បើដាច់ WiFi ការ Submit បរាជ័យ OnSuccess មិនដំណើរការ ហើយកម្មវិធីមិនកុហកអ្នកប្រើឡើយ។ OnFailure នឹងប្រាប់ឱ្យពួកគេសាកល្បងម្តងទៀត។"
    },
    {
      question: "ហេតុអ្វីបានជា Cloud Flow (Power Automate) ល្អជាងការឱ្យថេប្លេតរបស់កម្មករផ្ញើសារអ៊ីមែលដោយផ្ទាល់ទៅកាន់មេជាង?",
      options: [
        "ដោយសារតែថេប្លេតត្រូវបានហាមឃាត់មិនឱ្យផ្ញើអ៊ីមែលក្នុងប្រព័ន្ធ Windows។",
        "ដោយសារតែ Cloud Flows ដំណើរការ ២៤/៧ លើ Server របស់ Microsoft; ពេលទិន្នន័យធ្លាក់ចូល SharePoint សារនឹងផ្ញើចេញដោយស្វ័យប្រវត្តិក្នង Cloud ទោះបីកម្មករបិទថេប្លេត ឬដើរចូលជណ្តើរយន្តគ្មានសេវាក៏ដោយ។",
        "ដោយសារតែ Power Automate ជួយសន្សំសំចៃថ្មថេប្លេតបាន ៥០%។",
        "ដោយសារតែប៊ូតុង Power Apps អាចផ្ទុកកូដបានត្រឹមតែ ៣ ជួរគត់។"
      ],
      correct: 1,
      explanation: "ត្រឹមត្រូវហើយ! Cloud flows ដំណើរការដាច់ដោយឡែកពីឧបករណ៍អ្នកប្រើ។ ទោះបីជាកម្មករជ្រុះថេប្លេតចូលទឹក ឬដើរចូលកន្លែងគ្មានសេវា ក៏ Flow នៅតែដំណើរការផ្ញើអ៊ីមែលបាន ១០០% ដែរ។"
    },
    {
      question: "នៅក្នុង Power Automate តើអ្វីជាភាពខុសគ្នាពិតប្រាកដរវាង Trigger និង Action?",
      options: [
        "Trigger សម្រាប់ប្រើលើទូរស័ព្ទ; Action សម្រាប់ប្រើលើកុំព្យូទ័រ។",
        "Trigger គឺជាព្រឹត្តិការណ៍ដែលដាស់ Flow ឱ្យភ្ញាក់ ('អ្វីដែលចាប់ផ្តើមវា'); Action គឺជាកិច្ចការដែល Flow ត្រូវធ្វើបន្ទាប់ពីភ្ញាក់ ('អ្វីដែលវាធ្វើបន្ទាប់')។",
        "Trigger ត្រូវចំណាយលុយទិញ ប៉ុន្តែ Action គឺឥតគិតថ្លៃជានិច្ច។",
        "Trigger ដំណើរការតែថ្ងៃចន្ទ ប៉ុន្តែ Action ដំណើរការរាល់ថ្ងៃ។"
      ],
      correct: 1,
      explanation: "ត្រឹមត្រូវហើយ! និយមន័យកម្រិតសាមញ្ញបំផុត ៖ Trigger គឺជា 'អ្វីដែលចាប់ផ្តើមវា' (ពេលមានជួរថ្មីក្នុង SharePoint); Action គឺជា 'អ្វីដែលវាធ្វើបន្ទាប់' (ផ្ញើសារអ៊ីមែលជូនដំណឹង)។"
    },
    {
      question: "កម្មករកត់ត្រាសំបុត្រ WO-1049។ អ្នកបើក SharePoint ឃើញជួរ WO-1049 ច្បាស់នឹងភ្នែក។ ប៉ុន្តែមេជាងប្រាប់ថាមិនបានទទួលអ៊ីមែលសោះ។ តើអ្នកគួរពិនិត្យមើលត្រង់ណាជាមុន ហើយតើអ្វីដែលអ្នកមិនត្រូវប៉ះពាល់ជាដាច់ខាត?",
      options: [
        "លុបប៊ូតុង Submit ក្នុង Power Apps ចោលភ្លាម ហើយសរសេររូបមន្តឡើងវិញទាំងអស់។",
        "បើក Power Automate ហើយពិនិត្យមើល Run History; កុំប៉ះពាល់កូដក្នុង Power Apps ឱ្យសោះ ពីព្រោះជួរទិន្នន័យក្នុង SharePoint បញ្ជាក់ថា App ដំណើរការត្រឹមត្រូវ ១០០% រួចហើយ!",
        "បិទបើកម៉ាស៊ីនភ្លើងកណ្តាលរបស់រោងចក្រឡើងវិញ។",
        "បង្កើតបញ្ជី SharePoint ថ្មីមួយទៀត ហើយលុបបញ្ជីចាស់ចោល។"
      ],
      correct: 1,
      explanation: "ត្រឹមត្រូវហើយ! ស្រទាប់ Tier A បានជោគជ័យ ពីព្រោះជួរទិន្នន័យមានក្នុង SharePoint រួចហើយ! ដូច្នេះ Power Apps គ្មានកំហុសអ្វីឡើយ។ ការទៅកែកូដក្នុង App នឹងធ្វើឱ្យខូចកម្មវិធីដែលដំណើរការស្រេច។ ត្រូវពិនិត្យ Run History ក្នុង Flow ភ្លាម!"
    }
  ];

  let currentQuizIndex = 0;
  let quizAnswered = false;

  // --------------------------------------------------------------------------
  // 5. CAPTURE ORIGINAL ENGLISH SLIDES
  // --------------------------------------------------------------------------
  function captureEnglishOriginals() {
    const slides = document.querySelectorAll('.slide');
    ENGLISH_SLIDES = Array.from(slides).map((slide) => {
      const headerTitle = slide.querySelector('.slide-header h2') || slide.querySelector('.hero-title');
      const headerSubtitle = slide.querySelector('.slide-header .subtitle') || slide.querySelector('.hero-subtitle');
      const sectionTag = slide.querySelector('.section-tag') || slide.querySelector('.hero-badge');
      const contentEl = slide.querySelector('.slide-content');

      return {
        title: headerTitle ? headerTitle.innerHTML : (slide.dataset.title || ''),
        subtitle: headerSubtitle ? headerSubtitle.innerHTML : '',
        segment: sectionTag ? sectionTag.innerHTML : (slide.dataset.segment || ''),
        content: contentEl ? contentEl.innerHTML : '',
        notes: (slide.querySelector('aside.trainer-notes') ? slide.querySelector('aside.trainer-notes').innerHTML : '')
      };
    });
  }

  // --------------------------------------------------------------------------
  // 6. BILINGUAL LANGUAGE TOGGLE (EN ⟷ KH)
  // --------------------------------------------------------------------------
  function toggleLanguage() {
    try { localStorage.setItem('powerapps_presentation_lang', !isKhmerActive ? 'km' : 'en'); } catch(e){}
    isKhmerActive = !isKhmerActive;
    const body = document.body;
    const langLabel = document.getElementById('lang-label');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const btnLaser = document.getElementById('btn-laser');
    const btnNotes = document.getElementById('btn-notes');
    const btnOverview = document.getElementById('btn-overview');
    const overviewTitle = document.querySelector('.overview-header h3');

    if (isKhmerActive) {
      body.classList.add('khmer-mode');
      if (langLabel) langLabel.textContent = 'EN';
      if (btnPrev) btnPrev.innerHTML = '&#8592; ថយក្រោយ';
      if (btnNext) btnNext.innerHTML = 'បន្ទាប់ &#8594;';
      if (btnLaser) btnLaser.innerHTML = '🔴 ឡាស៊ែរ';
      if (btnNotes) btnNotes.innerHTML = '📝 កំណត់ចំណាំ';
      if (btnOverview) btnOverview.innerHTML = '🗂️ ទិដ្ឋភាពរួម';
      if (overviewTitle) overviewTitle.textContent = 'ទិដ្ឋភាពរួមស្លាយទាំង ២៤';
    } else {
      body.classList.remove('khmer-mode');
      if (langLabel) langLabel.textContent = 'KH';
      if (btnPrev) btnPrev.innerHTML = '&#8592; Prev';
      if (btnNext) btnNext.innerHTML = 'Next &#8594;';
      if (btnLaser) btnLaser.innerHTML = '🔴 Laser';
      if (btnNotes) btnNotes.innerHTML = '📝 Notes';
      if (btnOverview) btnOverview.innerHTML = '🗂️ Overview';
      if (overviewTitle) overviewTitle.textContent = '24-Slide Master Navigation';
    }

    const dataSource = isKhmerActive ? KHMER_SLIDES : ENGLISH_SLIDES;
    const slides = document.querySelectorAll('.slide');

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
    });

    // Re-render active interactive modules in current language
    selectDay26Sim(1);
    renderDay26QuizQuestion();

    updateProgress();
    updateCounter();
    updateNotesDrawer();
    if (isOverviewOpen) renderOverviewGrid();
  }

  // --------------------------------------------------------------------------
  // 7. SLIDE NAVIGATION CORE ENGINE
  // --------------------------------------------------------------------------
  function showSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    currentSlideIndex = index;

    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentSlideIndex);
    });

    updateProgress();
    updateCounter();
    updateNotesDrawer();
    updateOverviewModal();

    // Trigger simulator setup if on Slide 16 (index 15)
    if (currentSlideIndex === 15) {
      selectDay26Sim(1);
    }

    // Trigger quiz setup if on Slide 22 (index 21)
    if (currentSlideIndex === 21) {
      renderDay26QuizQuestion();
    }
  }

  function prevSlide() {
    showSlide(currentSlideIndex - 1);
  }

  function nextSlide() {
    showSlide(currentSlideIndex + 1);
  }

  function goToSlide(index) {
    showSlide(index);
    if (isOverviewOpen) toggleOverview();
  }

  function updateProgress() {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
      const percentage = ((currentSlideIndex + 1) / totalSlides) * 100;
      progressBar.style.width = percentage + '%';
    }
  }

  function updateCounter() {
    const counter = document.getElementById('slide-counter');
    if (counter) {
      counter.textContent = isKhmerActive
        ? 'ស្លាយ ' + (currentSlideIndex + 1) + ' / ' + totalSlides
        : 'Slide ' + (currentSlideIndex + 1) + ' / ' + totalSlides;
    }
  }

  // --------------------------------------------------------------------------
  // 8. TRAINER NOTES DRAWER (STRICTLY OFF-STAGE)
  // --------------------------------------------------------------------------
  function toggleNotes() {
    isNotesOpen = !isNotesOpen;
    const drawer = document.getElementById('notes-drawer');
    const btnNotes = document.getElementById('btn-notes');
    if (drawer) {
      drawer.classList.toggle('open', isNotesOpen);
      if (isNotesOpen) updateNotesDrawer();
    }
    if (btnNotes) btnNotes.classList.toggle('active', isNotesOpen);
  }

  function updateNotesDrawer() {
    const notesTitle = document.getElementById('notes-slide-title');
    const notesBody = document.getElementById('notes-body-content');
    if (!notesBody) return;

    if (notesTitle) {
      notesTitle.textContent = isKhmerActive
        ? 'កំណត់ចំណាំគ្រូបង្វឹក ៖ ស្លាយទី ' + (currentSlideIndex + 1)
        : 'Trainer Speaking Notes \u2022 Slide ' + (currentSlideIndex + 1);
    }

    const dataSource = isKhmerActive ? KHMER_SLIDES : ENGLISH_SLIDES;
    const currentNotes = (dataSource[currentSlideIndex] && dataSource[currentSlideIndex].notes)
      ? dataSource[currentSlideIndex].notes
      : (ENGLISH_NOTES[currentSlideIndex] || '<p>Review slide objectives and engage learner in discussion.</p>');

    notesBody.innerHTML = currentNotes;
  }

  // --------------------------------------------------------------------------
  // 9. 24-SLIDE OVERVIEW MODAL
  // --------------------------------------------------------------------------
  function toggleOverview() {
    isOverviewOpen = !isOverviewOpen;
    const modal = document.getElementById('overview-modal');
    const btnOverview = document.getElementById('btn-overview');
    if (modal) {
      modal.classList.toggle('open', isOverviewOpen);
      if (isOverviewOpen) renderOverviewGrid();
    }
    if (btnOverview) btnOverview.classList.toggle('active', isOverviewOpen);
  }

  function renderOverviewGrid() {
    const grid = document.getElementById('overview-grid');
    if (!grid) return;
    grid.innerHTML = '';
    const dataSource = isKhmerActive ? KHMER_SLIDES : ENGLISH_SLIDES;
    const slides = document.querySelectorAll('.slide');

    slides.forEach((slide, idx) => {
      const card = document.createElement('div');
      card.className = 'overview-card' + (idx === currentSlideIndex ? ' active' : '');
      card.onclick = function () { goToSlide(idx); };

      const data = dataSource[idx];
      const title = data ? (data.title || slide.getAttribute('data-title')) : (slide.getAttribute('data-title') || 'Slide ' + (idx + 1));
      const segment = data ? (data.segment || slide.getAttribute('data-segment')) : (slide.getAttribute('data-segment') || 'Day 26');

      card.innerHTML =
        '<div class=\"overview-card-num\">#' + (idx + 1) + ' &bull; ' + segment + '</div>' +
        '<div class=\"overview-card-title\">' + title + '</div>';

      grid.appendChild(card);
    });
  }

  function updateOverviewModal() {
    if (isOverviewOpen) renderOverviewGrid();
  }

  // --------------------------------------------------------------------------
  // 10. 90-MINUTE COUNTDOWN TIMER
  // --------------------------------------------------------------------------
  function toggleTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
      const btnTimer = document.getElementById('btn-timer');
      if (btnTimer) btnTimer.style.opacity = '0.7';
    } else {
      timerInterval = setInterval(function () {
        if (timerSecondsRemaining > 0) {
          timerSecondsRemaining--;
          updateTimerDisplay();
        } else {
          clearInterval(timerInterval);
          timerInterval = null;
        }
      }, 1000);
      const btnTimer = document.getElementById('btn-timer');
      if (btnTimer) btnTimer.style.opacity = '1.0';
    }
  }

  function updateTimerDisplay() {
    const display = document.getElementById('timer-display');
    if (!display) return;
    const mins = Math.floor(timerSecondsRemaining / 60);
    const secs = timerSecondsRemaining % 60;
    display.textContent =
      (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;
  }

  // --------------------------------------------------------------------------
  // 11. PRESENTER LASER POINTER & SPOTLIGHT
  // --------------------------------------------------------------------------
  function toggleLaser() {
    isLaserActive = !isLaserActive;
    const laser = document.getElementById('presenter-laser');
    const btnLaser = document.getElementById('btn-laser');
    if (laser) {
      laser.style.display = isLaserActive ? 'block' : 'none';
    }
    if (btnLaser) {
      btnLaser.classList.toggle('active', isLaserActive);
    }
  }

  function initPointerAndSpotlight() {
    const stage = document.getElementById('presentation-stage');
    const laser = document.getElementById('presenter-laser');
    const ripple = document.getElementById('pointer-ripple');

    if (!stage) return;

    stage.addEventListener('mousemove', function (e) {
      stage.style.setProperty('--mouse-x', e.clientX + 'px');
      stage.style.setProperty('--mouse-y', e.clientY + 'px');
      if (laser && isLaserActive) {
        laser.style.left = e.clientX + 'px';
        laser.style.top = e.clientY + 'px';
      }
    });

    stage.addEventListener('click', function (e) {
      if (ripple && isLaserActive) {
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        ripple.classList.remove('active');
        void ripple.offsetWidth; // Force reflow
        ripple.classList.add('active');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 12. FULLSCREEN TOGGLE
  // --------------------------------------------------------------------------
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(function () {});
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }

  // --------------------------------------------------------------------------
  // 13. INTERACTIVE SIMULATOR (SLIDE 16)
  // --------------------------------------------------------------------------
  function selectDay26Sim(stepNum) {
    const dataSource = isKhmerActive ? DAY26_SIM_DATA_KH : DAY26_SIM_DATA;
    const step = dataSource[stepNum];
    if (!step) return;

    for (let i = 1; i <= 7; i++) {
      const tab = document.getElementById('sim-tab-' + i);
      if (tab) tab.classList.toggle('active', i === stepNum);
    }

    const display = document.getElementById('sim-day26-display') || document.getElementById('sim-layer-display') || document.getElementById('sim-display');
    const impactLabel = isKhmerActive ? 'លទ្ធផលប្រតិបត្តិការ ៖ ' : 'Operational Result: ';

    if (display) {
      display.innerHTML =
        '<div style=\"display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;\">' +
          '<span class=\"card-badge\" style=\"background: rgba(6, 182, 212, 0.2); color: #67e8f9; font-size: 0.82rem; padding: 4px 10px;\">' + step.badge + '</span>' +
          '<span style=\"color: #94a3b8; font-size: 0.85rem; font-weight: 600;\">' + step.step + '</span>' +
        '</div>' +
        '<h3 style=\"color: #f8fafc; font-size: 1.22rem; margin-bottom: 10px;\">' + step.title + '</h3>' +
        '<p style=\"color: #cbd5e1; line-height: 1.7; font-size: 0.92rem; margin-bottom: 14px;\">' + step.content + '</p>' +
        '<div style=\"background: rgba(6, 182, 212, 0.12); border-left: 3px solid #06b6d4; padding: 10px 14px; border-radius: 6px;\">' +
          '<strong style=\"color: #38bdf8; font-size: 0.85rem;\">' + impactLabel + '</strong>' +
          '<span style=\"color: #e2e8f0; font-size: 0.85rem; font-family: var(--font-code);\">' + step.output + '</span>' +
        '</div>';
    }
  }

  window.selectDay26Sim = selectDay26Sim;
  window.selectSimLayer = selectDay26Sim;

  // --------------------------------------------------------------------------
  // 14. FORMATIVE ASSESSMENT QUIZ ENGINE (SLIDE 22)
  // --------------------------------------------------------------------------
  function renderDay26QuizQuestion() {
    const qList = isKhmerActive ? QUIZ_QUESTIONS_KH : QUIZ_QUESTIONS;
    const qData = qList[currentQuizIndex];
    if (!qData) return;

    quizAnswered = false;
    const qNumElem = document.getElementById('quiz-day26-q-num') || document.getElementById('quiz-q-num');
    const qTextElem = document.getElementById('quiz-day26-q-text') || document.getElementById('quiz-q-text');
    const optionsContainer = document.getElementById('quiz-day26-options-container') || document.getElementById('quiz-options-container');
    const feedbackBox = document.getElementById('quiz-day26-feedback-box') || document.getElementById('quiz-feedback-box');
    const placeholder = document.getElementById('quiz-day26-placeholder') || document.getElementById('quiz-placeholder');
    const content = document.getElementById('quiz-day26-feedback-content') || document.getElementById('quiz-feedback-content');
    const nextBtn = document.getElementById('quiz-day26-next-btn') || document.getElementById('quiz-next-btn');

    if (qNumElem) {
      qNumElem.textContent = isKhmerActive
        ? 'សំណួរទី ' + (currentQuizIndex + 1) + ' នៃ ' + qList.length
        : 'Question ' + (currentQuizIndex + 1) + ' of ' + qList.length;
    }
    if (qTextElem) qTextElem.textContent = qData.question;
    if (placeholder) {
      placeholder.innerHTML = isKhmerActive
        ? '<span style="font-size: 2.5rem; color: var(--text-dim); margin-bottom: 0.5rem;">🔍</span><h4 style="color: var(--text-muted);">សូមជ្រើសរើសចម្លើយមួយ</h4><p style="font-size: 0.85rem; color: var(--text-dim); max-width: 280px; margin-top: 0.35rem;">ចុចលើជម្រើសណាមួយនៅខាងឆ្វេង ដើម្បីផ្ទៀងផ្ទាត់គោលការណ៍ស្ថាបត្យកម្ម។</p>'
        : '<span style="font-size: 2.5rem; color: var(--text-dim); margin-bottom: 0.5rem;">🔍</span><h4 style="color: var(--text-muted);">Select an Answer</h4><p style="font-size: 0.85rem; color: var(--text-dim); max-width: 280px; margin-top: 0.35rem;">Click any option on the left to verify architectural principles.</p>';
      placeholder.style.display = 'flex';
    }
    if (content) content.style.display = 'none';
    if (feedbackBox) feedbackBox.classList.remove('answered');

    if (nextBtn) {
      nextBtn.textContent = isKhmerActive ? 'បន្ទាប់ \u2192' : 'Next \u2192';
    }

    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      qData.options.forEach((optText, optIdx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.innerHTML = '<strong>' + String.fromCharCode(65 + optIdx) + '.</strong> ' + optText;
        btn.onclick = function () { handleDay26QuizAnswer(optIdx); };
        optionsContainer.appendChild(btn);
      });
    }
  }

  function handleDay26QuizAnswer(selectedIdx) {
    if (quizAnswered) return;
    quizAnswered = true;

    const qList = isKhmerActive ? QUIZ_QUESTIONS_KH : QUIZ_QUESTIONS;
    const qData = qList[currentQuizIndex];
    const optionsContainer = document.getElementById('quiz-day26-options-container') || document.getElementById('quiz-options-container');
    const feedbackBox = document.getElementById('quiz-day26-feedback-box') || document.getElementById('quiz-feedback-box');
    const placeholder = document.getElementById('quiz-day26-placeholder') || document.getElementById('quiz-placeholder');
    const content = document.getElementById('quiz-day26-feedback-content') || document.getElementById('quiz-feedback-content');
    const badge = document.getElementById('quiz-day26-feedback-badge') || document.getElementById('quiz-feedback-badge');
    const statusElem = document.getElementById('quiz-day26-feedback-status') || document.getElementById('quiz-feedback-status');
    const textElem = document.getElementById('quiz-day26-feedback-text') || document.getElementById('quiz-feedback-text');
    const nextBtn = document.getElementById('quiz-day26-next-btn') || document.getElementById('quiz-next-btn');

    if (optionsContainer) {
      const buttons = optionsContainer.querySelectorAll('.quiz-option-btn');
      buttons.forEach((btn, idx) => {
        if (idx === qData.correct) {
          btn.classList.add('correct');
        } else if (idx === selectedIdx) {
          btn.classList.add('incorrect');
        }
      });
    }

    if (placeholder) placeholder.style.display = 'none';
    if (content) content.style.display = 'flex';
    if (feedbackBox) feedbackBox.classList.add('answered');

    const isCorrect = (selectedIdx === qData.correct);
    if (badge) {
      if (isKhmerActive) {
        badge.textContent = isCorrect ? 'គោលការណ៍ត្រឹមត្រូវ!' : 'ពិនិត្យមើលវិធានឡើងវិញ';
      } else {
        badge.textContent = isCorrect ? 'Principle Verified!' : 'Review Rule';
      }
      badge.style.background = isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)';
      badge.style.color = isCorrect ? '#86efac' : '#fca5a5';
    }
    if (statusElem) {
      if (isKhmerActive) {
        statusElem.textContent = isCorrect ? 'ចម្លើយត្រឹមត្រូវ!' : 'មិនទាន់ត្រឹមត្រូវឡើយ';
      } else {
        statusElem.textContent = isCorrect ? 'Correct!' : 'Incorrect';
      }
      statusElem.style.color = isCorrect ? '#34d399' : '#f87171';
    }
    if (textElem) {
      textElem.textContent = qData.explanation;
    }
    if (nextBtn) {
      if (isKhmerActive) {
        nextBtn.textContent = (currentQuizIndex < qList.length - 1)
          ? 'សំណួរបន្ទាប់ \u2192'
          : 'ចាប់ផ្តើមឡើងវិញ';
      } else {
        nextBtn.textContent = (currentQuizIndex < qList.length - 1)
          ? 'Next Question \u2192'
          : 'Restart Quiz';
      }
    }
  }

  function nextDay26QuizQuestion() {
    const qList = isKhmerActive ? QUIZ_QUESTIONS_KH : QUIZ_QUESTIONS;
    currentQuizIndex++;
    if (currentQuizIndex >= qList.length) {
      currentQuizIndex = 0;
    }
    renderDay26QuizQuestion();
  }

  window.renderQuizQuestion = renderDay26QuizQuestion;
  window.renderDay26QuizQuestion = renderDay26QuizQuestion;
  window.handleQuizAnswer = handleDay26QuizAnswer;
  window.handleDay26QuizAnswer = handleDay26QuizAnswer;
  window.nextQuizQuestion = nextDay26QuizQuestion;
  window.nextDay26QuizQuestion = nextDay26QuizQuestion;

  // --------------------------------------------------------------------------
  // 15. KEYBOARD SHORTCUTS
  // --------------------------------------------------------------------------
  function handleKeyDown(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

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
      case 'p':
      case 'P':
        e.preventDefault();
        toggleLaser();
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
  // 16. GLOBAL EXPORTS
  // --------------------------------------------------------------------------
  window.prevSlide = prevSlide;
  window.nextSlide = nextSlide;
  window.goToSlide = goToSlide;
  window.showSlide = showSlide;
  window.toggleLanguage = toggleLanguage;
  window.toggleLaser = toggleLaser;
  window.toggleNotes = toggleNotes;
  window.toggleOverview = toggleOverview;
  window.toggleTimer = toggleTimer;
  window.toggleFullscreen = toggleFullscreen;
  window.handleKeyDown = handleKeyDown;

  window.selectDay26Sim = selectDay26Sim;
  window.selectSimLayer = selectDay26Sim;
  window.handleDay26QuizAnswer = handleDay26QuizAnswer;
  window.handleQuizAnswer = handleDay26QuizAnswer;
  window.nextDay26QuizQuestion = nextDay26QuizQuestion;
  window.nextQuizQuestion = nextDay26QuizQuestion;
  window.renderDay26QuizQuestion = renderDay26QuizQuestion;
  window.renderQuizQuestion = renderDay26QuizQuestion;

  window.addEventListener('keydown', handleKeyDown);

  // --------------------------------------------------------------------------
  // 17. BOOTSTRAP INITIALIZATION
  // --------------------------------------------------------------------------
  function initPresentation() {
    initPointerAndSpotlight();
    updateProgress();
    updateCounter();
    updateTimerDisplay();

    // Initialize Simulator and Quiz before capturing English originals
    if (window.selectDay26Sim) window.selectDay26Sim(1);
    renderDay26QuizQuestion();

    // Capture complete English originals
    captureEnglishOriginals();

    console.log('Day 26 Presentation Engine initialized successfully with 24 full bilingual slides!');
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
