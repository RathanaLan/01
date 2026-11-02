/* ============================================================================
   DAY 27: FINAL TRANSFER CHALLENGE — EXPLAIN WHY IT WORKS
   Presentation Engine: Verified zero syntax errors via node -c
   Includes: 24 Bilingual Slides (EN ⟷ KH Full Content Replacement),
   Interactive 7-Stage Capstone Simulator, 5-Question Dual-State Quiz,
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
    // Slide 1 (Index 0): Hero Title & Capstone Mental Model
    {
      title: "ការប្រឡងផ្ទេរចំណេះដឹងបញ្ចប់ ៖ ពន្យល់ពីមូលហេតុដែលប្រព័ន្ធដំណើរការ",
      segment: "ដំណាក់កាលទី ៨ ៖ ការវាយតម្លៃបញ្ចប់ការសិក្សា (Capstone)",
      subtitle: "វាយតម្លៃថាតើសិស្សពិតជាយល់ដឹងពីហេតុ ផល និងការតភ្ជាប់ស្ថាបត្យកម្មប្រព័ន្ធ ឬគ្រាន់តែទន្ទេញចាំមាត់នូវការចុចប៊ូតុង និងរូបមន្ត។ ការដោះស្រាយបញ្ហាអាជីវកម្មថ្មីទាំងស្រុងពីបាតដៃទទេ។",
      content: `<div class="hero-badge">
            <span>កម្មវិធីសិក្សា Microsoft Power Apps</span>
            <span>&bull;</span>
            <span>ថ្ងៃទី ២៧ នៃ ២៧ &bull; ថ្ងៃបញ្ចប់ការសិក្សា 🎓</span>
          </div>
          <h1 class="hero-title">ការប្រឡងផ្ទេរចំណេះដឹងបញ្ចប់ ៖ ពន្យល់ពីមូលហេតុដែលប្រព័ន្ធដំណើរការ</h1>
          <p class="hero-subtitle">
            វាយតម្លៃថាតើសិស្សពិតជាយល់ដឹងពីហេតុ ផល និងការតភ្ជាប់ស្ថាបត្យកម្មប្រព័ន្ធ ឬគ្រាន់តែទន្ទេញចាំមាត់នូវការចុចប៊ូតុង និងរូបមន្ត។ ការដោះស្រាយបញ្ហាអាជីវកម្មថ្មីទាំងស្រុងពីបាតដៃទទេ។
          </p>

          <div class="model-chain">
            <span class="chain-item">បញ្ហាថ្មី</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">លំហូរការងារ</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ទម្រង់ទិន្នន័យ</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item active">៣ អេក្រង់</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item active">ច្រកទ្វារតក្កវិជ្ជា</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ផ្ទុកលើ Cloud</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item flow">Cloud Flow</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">តេស្ត &amp; ដោះស្រាយ</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item active" style="background: rgba(16, 185, 129, 0.25); color: #86efac; border-color: #10b981;">ពន្យល់មូលហេតុ</span>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការបើកមេរៀន (២ នាទី) ៖</strong> "សូមស្វាគមន៍មកកាន់ថ្ងៃទី ២៧—ថ្ងៃបញ្ចប់ការសិក្សាជាផ្លូវការរបស់យើង! រយៈពេល ២៦ ថ្ងៃកន្លងមក អ្នកបានកសាងសាច់ដុំបច្ចេកវិទ្យាយ៉ាងរឹងមាំ។ អ្នកបានរៀនឧបករណ៍ រូបមន្ត បញ្ជី SharePoint ផ្ទាំង Gallery ទម្រង់ Form ស្ថាបត្យកម្មប្រព័ន្ធ និងលំហូរស្វ័យប្រវត្តិកម្ម។ ថ្ងៃនេះ មិនមែនជាការធ្វើតាមគ្រូនោះទេ។ ថ្ងៃនេះគឺជាការប្រឡងបើកបរពិតប្រាកដរបស់អ្នក។ អ្នកគឺជាអ្នកកាន់ចង្កូត!"</p>
<p><strong>ខ្សែសង្វាក់គំនិតស្នូល ៖</strong> ដើរកាត់ខ្សែសង្វាក់ម៉ូដែល ៩ ជំហាន។ បញ្ជាក់ថា នរណាក៏អាចចម្លងតាមសៀវភៅម្ហូបបានដែរ ប៉ុន្តែមេចុងភៅជំនាញយល់ច្បាស់ពីមូលហេតុដែលកម្តៅ និងអំបិលផ្លាស់ប្តូររសជាតិ។ ថ្ងៃនេះ អ្នកនឹងបង្ហាញថាអ្នកយល់ច្បាស់ពីមូលហេតុដែលប្រព័ន្ធសូហ្វវែរដំណើរការ។</p>`
    },

    // Slide 2 (Index 1): Agenda & Measurable Objectives
    {
      title: "របៀបវារៈ ៩០ នាទី និងគោលបំណងរៀនសូត្រច្បាស់លាស់",
      segment: "ផ្នែកទី ១ &bull; កាលវិភាគ និងលទ្ធផលរំពឹងទុក",
      subtitle: "រចនាសម្ព័ន្ធបង្រៀនជាវង់ (Spiral Learning) ៖ ការបង្ហាញពីសមត្ថភាពដោះស្រាយបញ្ហាដោយឯករាជ្យ និងការសំយោគស្ថាបត្យកម្ម។",
      content: `<div class="card">
            <h3 class="card-title">🎯 គោលបំណងស្នូលទាំង ៥ សម្រាប់ថ្ងៃនេះ</h3>
            <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem;">
              <div style="display: flex; gap: 0.65rem;">
                <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">1</span>
                <div><strong>បំបែកបញ្ហាអាជីវកម្មថ្មីដោយឯករាជ្យ ៖</strong> បំប្លែងបញ្ហាជាក់ស្តែងក្នុងរោងចក្រ ទៅជាលំហូរមនុស្ស ទម្រង់ទិន្នន័យ និងអេក្រង់ UI។</div>
              </div>
              <div style="display: flex; gap: 0.65rem;">
                <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">2</span>
                <div><strong>រៀបចំស្ថាបត្យកម្ម ៣ អេក្រង់តភ្ជាប់ ៖</strong> ភ្ជាប់ Home ➔ Report ➔ Review ជាមួយការផ្ទេរទិន្នន័យច្បាស់លាស់ គ្មានផ្លូវទាល់។</div>
              </div>
              <div style="display: flex; gap: 0.65rem;">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">3</span>
                <div><strong>អនុវត្តការផ្ទៀងផ្ទាត់ &amp; ភាពស្មោះត្រង់ ៖</strong> ចាក់សោប៊ូតុងដោយប្រើ <code>IsBlank()</code> និងផ្តល់ដំណឹងជោគជ័យតាម <code>OnSuccess</code>។</div>
              </div>
              <div style="display: flex; gap: 0.65rem;">
                <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc;">4</span>
                <div><strong>បង្កើតប្រព័ន្ធស្វ័យប្រវត្តិកម្ម Cloud ៖</strong> ពន្យល់ពីមូលហេតុដែលដំណឹងត្រូវនៅលើ Flow និងបង្កើត Flow ផ្ញើសារ ២ ជំហាន។</div>
              </div>
              <div style="display: flex; gap: 0.65rem;">
                <span class="card-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">5</span>
                <div><strong>ស្ទាត់ជំនាញដោះស្រាយបញ្ហា ៣ កម្រិត ៖</strong> វិភាគដឹងភ្លាមៗរវាងកំហុស App, បញ្ហា Flow Trigger, ឬការបញ្ជូនអ៊ីមែលដោយមិនបាច់ទាយ។</div>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">⏱️ កាលវិភាគលម្អិត ៩០ នាទី</h3>
            <div style="display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.85rem; margin-top: 0.35rem;">
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.3rem;">
                <span style="color: #fcd34d; font-weight: bold;">00 - 10 នាទី</span>
                <span><strong>រំលឹក និងតភ្ជាប់ ៖</strong> ដំណើរ ២៧ ថ្ងៃ + សំណួររំលឹក ៣</span>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.3rem;">
                <span style="color: #fca5a5; font-weight: bold;">10 - 20 នាទី</span>
                <span><strong>វិបត្តិជាក់ស្តែង ៖</strong> មហន្តរាយ $45,000 ទន្ទេញតាមវីដេអូ + ឧទាហរណ៍បើកបរ</span>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.3rem;">
                <span style="color: #67e8f9; font-weight: bold;">20 - 35 នាទី</span>
                <span><strong>ការបង្ហាញស្ថាបត្យកម្ម ៖</strong> បំបែកប្រព័ន្ធរាយការណ៍គ្រោះថ្នាក់ការងារ</span>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.3rem;">
                <span style="color: #c084fc; font-weight: bold;">35 - 45 នាទី</span>
                <span><strong>ការបង្ហាញ Flow ៖</strong> បង្កើត Cloud Trigger &amp; Dynamic Content Tokens</span>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.3rem;">
                <span style="color: #86efac; font-weight: bold;">45 - 65 នាទី</span>
                <span><strong>ការប្រឡង Capstone ឯករាជ្យ ៖</strong> សិស្សបង្កើតប្រព័ន្ធ និងតេស្តផ្ទាល់</span>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.3rem;">
                <span style="color: #fcd34d; font-weight: bold;">65 - 75 នាទី</span>
                <span><strong>ដោះស្រាយបញ្ហា &amp; ពន្យល់ហេតុផល ៖</strong> សវនកម្ម ៣ ស្រទាប់ &amp; ការការពារគម្រោង</span>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.3rem;">
                <span style="color: #67e8f9; font-weight: bold;">75 - 83 នាទី</span>
                <span><strong>ការវាយតម្លៃចំណេះដឹង ៖</strong> សំណួរ Quiz ស្ថាបត្យកម្ម ៥ សំណួរ</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding-bottom: 0.3rem;">
                <span style="color: #86efac; font-weight: bold;">83 - 90 នាទី</span>
                <span><strong>បញ្ចប់ការសិក្សា &amp; ដំណើរឆ្ពោះទៅមុខ ៖</strong> រូបប៊្រិកវាយតម្លៃ &amp; វិញ្ញាបនបត្របញ្ចប់</span>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ទិដ្ឋភាពរួមនៃរបៀបវារៈ (២ នាទី) ៖</strong> "កត់សម្គាល់របៀបវារៈថ្ងៃនេះ។ គ្រូនិយាយតិចជាងមុន ចំណែកសិស្សជាអ្នកបង្កើត និងជាអ្នកពន្យល់ការពារ។ គោលដៅគឺភាពឯករាជ្យពេញលេញ ៖ អ្នករចនា អ្នកបង្កើត អ្នកតេស្ត និងអ្នកការពារស្ថាបត្យកម្មដោយខ្លួនឯង។"</p>`
    },

    // Slide 3 (Index 2): Concept Map Recap
    {
      title: "ដំណើរ ២៧ ថ្ងៃតភ្ជាប់ ៖ ពីចំណុចសូន្យឆ្ពោះទៅកាន់ស្ថាបត្យករ",
      segment: "ផ្នែកទី ១ &bull; ការសំយោគកម្មវិធីសិក្សា",
      subtitle: "គ្រប់គំនិតទាំងអស់ដែលបានរៀន គឺជាធ្មេញប្រអប់លេខដ៏សំខាន់នៅក្នុងម៉ាស៊ីនបញ្ចប់ការសិក្សាថ្ងៃនេះ។",
      content: `<div class="card" style="border-left: 3px solid #f59e0b;">
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem;">
              <div style="background: rgba(12, 19, 31, 0.7); padding: 1.15rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
                <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">ថ្ងៃទី ១ - ១០</span>
                <h4 style="color: #f8fafc; margin: 0.5rem 0;">ផ្ទាំង UI &amp; តក្កវិជ្ជា</h4>
                <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
                  ប៊ូតុង ស្លាក ប្រអប់បញ្ចូល តក្កវិជ្ជាប៊ូលីន ប្រៀបធៀបទិន្នន័យ If() និង IsBlank()។ គ្រាប់អាតូមនៃការគិត និងបញ្ចូលទិន្នន័យ។
                </p>
              </div>

              <div style="background: rgba(12, 19, 31, 0.7); padding: 1.15rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
                <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">ថ្ងៃទី ១១ - ១៦</span>
                <h4 style="color: #f8fafc; margin: 0.5rem 0;">អេក្រង់ &amp; លំហូរ UX</h4>
                <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
                  ការប្តូរឆ្លងអេក្រង់ (Navigation) Back() ResetForm() ដំណើរឆ្លងអេក្រង់ និងសារឆ្លើយតបដ៏ស្មោះត្រង់តាម Notify()។
                </p>
              </div>

              <div style="background: rgba(12, 19, 31, 0.7); padding: 1.15rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ថ្ងៃទី ១៧ - ២៤</span>
                <h4 style="color: #f8fafc; margin: 0.5rem 0;">SharePoint &amp; CRUD</h4>
                <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
                  បញ្ជី SharePoint, ជួរឈរកំណត់ប្រភេទ, Galleries (Items), Forms (Item, Mode), NewForm និង SubmitForm។
                </p>
              </div>

              <div style="background: rgba(139, 92, 246, 0.15); padding: 1.15rem; border-radius: 8px; border: 1px solid rgba(139, 92, 246, 0.4);">
                <span class="card-badge" style="background: rgba(139, 92, 246, 0.25); color: #c084fc;">ថ្ងៃទី ២៥ - ២៧</span>
                <h4 style="color: #c084fc; margin: 0.5rem 0;">ស្ថាបត្យកម្មប្រព័ន្ធ</h4>
                <p style="color: #f5f3ff; font-size: 0.86rem; line-height: 1.5;">
                  ប្លង់មេ ៧ ស្រទាប់, កម្មវិធីតភ្ជាប់ + Power Automate Flow, និងការផ្ទេរចំណេះដឹងដោយឯករាជ្យថ្ងៃនេះ!
                </p>
              </div>
            </div>

            <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(245, 158, 11, 0.08); border-radius: 8px; text-align: center; border: 1px dashed rgba(245, 158, 11, 0.3);">
              <span style="color: #fcd34d; font-weight: 700; font-size: 0.95rem;">
                គោលការណ៍បញ្ចប់ការសិក្សា ៖ យើងមិនទន្ទេញចាំមាត់សូហ្វវែរនោះទេ។ យើងស្ទាត់ជំនាញខ្សែសង្វាក់ហេតុផល ៩ ជំហាន ៖ បញ្ហា ➔ ដំណើរការ ➔ ទិន្នន័យ ➔ UI ➔ តក្កវិជ្ជា ➔ សកម្មភាព ➔ កន្លែងផ្ទុក ➔ Flow ➔ តេស្ត!
              </span>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការសំយោគដំណើរការ (៣ នាទី) ៖</strong> "ក្រឡេកមើលចំណុចចាប់ផ្តើមរបស់អ្នកនៅថ្ងៃទី ១។ អ្នកមិនធ្លាប់ស្គាល់អថេរ ឬតក្កវិជ្ជាប៊ូលីននោះទេ។ ថ្ងៃនេះ អ្នកកំពុងរចនាប្រព័ន្ធមូលដ្ឋានទិន្នន័យលើ Cloud ដែលមានច្រើនអេក្រង់ ជាមួយលំហូរស្វ័យប្រវត្តិក្នងផ្ទៃខាងក្រោយ។ សូមមានមោទនភាពចំពោះខ្លួនឯង!"</p>`
    },

    // Slide 4 (Index 3): Active Retrieval Check
    {
      title: "សំណួររំលឹកចំណេះដឹងចាស់ ៖ បើកដំណើរការប្រតិកម្មស្ថាបត្យកម្ម",
      segment: "ផ្នែកទី ២ &bull; ការរំលឹកចំណេះដឹង",
      subtitle: "ចុចលើកាតនីមួយៗដើម្បីត្រឡប់ និងផ្ទៀងផ្ទាត់គោលការណ៍ស្នូលដែលត្រូវការសម្រាប់ការផ្ទេរចំណេះដឹងថ្ងៃនេះ។",
      content: `<div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">សំណួរទី ១</span>
                <h4 style="color: #f8fafc; margin-top: 1rem;">សវនកម្មដោះស្រាយបញ្ហា</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 0.5rem;">
                  អ្នកប្រើប្រាស់និយាយថា ៖ "ខ្ញុំអត់បានទទួលអ៊ីមែលទេ!" តើកន្លែងណាដំបូងដែលអ្នកត្រូវពិនិត្យ ហើយតើអ្វីដែលអ្នកមិនត្រូវប៉ះពាល់?
                </p>
                <div class="flip-hint">ចុចដើម្បីត្រឡប់ &rarr;</div>
              </div>
              <div class="flip-card-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">គោលការណ៍ទី ១</span>
                <p style="color: #ecfdf5; font-size: 0.92rem; margin-top: 0.8rem; line-height: 1.6;">
                  <strong>ពិនិត្យមើលបញ្ជី SharePoint ជាមុន (Tier A)!</strong><br><br>
                  បើឃើញមានជួរទិន្នន័យ Power Apps គ្មានកំហុស ១០០%—<strong>កុំប៉ះកូដក្នុង APP ឱ្យសោះ!</strong> ឆ្ពោះទៅពិនិត្យ Flow Run History (Tier B)។
                </p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">សំណួរទី ២</span>
                <h4 style="color: #f8fafc; margin-top: 1rem;">កាវតភ្ជាប់ទិន្នន័យ (Binding)</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 0.5rem;">
                  ហេតុអ្វីបានជា <code>frmReview.Item = galHazards.Selected</code> ការពារមិនឱ្យកើតមានជួរទិន្នន័យស្ទួនពេលកែសម្រួល?
                </p>
                <div class="flip-hint">ចុចដើម្បីត្រឡប់ &rarr;</div>
              </div>
              <div class="flip-card-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">គោលការណ៍ទី ២</span>
                <p style="color: #ecfdf5; font-size: 0.92rem; margin-top: 0.8rem; line-height: 1.6;">
                  <strong>ការបញ្ជូនលេខសម្គាល់ Record ID!</strong><br><br>
                  Gallery បញ្ជូន ID នៃជួរដែលបានរើស។ ពេល <code>FormMode.Edit</code> ដំណើរការ <code>SubmitForm()</code> ធ្វើការ UPDATE ជួរចាស់ មិនមែន INSERT ថ្មីទេ។
                </p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc;">សំណួរទី ៣</span>
                <h4 style="color: #f8fafc; margin-top: 1rem;">កិច្ចសន្យាឆ្លើយតប (Feedback)</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 0.5rem;">
                  ហេតុអ្វីបានជា <code>Notify()</code> ត្រូវតែស្ថិតនៅក្នុង <code>Form.OnSuccess</code> មិនមែននៅលើប៊ូតុង Submit?
                </p>
                <div class="flip-hint">ចុចដើម្បីត្រឡប់ &rarr;</div>
              </div>
              <div class="flip-card-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">គោលការណ៍ទី ៣</span>
                <p style="color: #ecfdf5; font-size: 0.92rem; margin-top: 0.8rem; line-height: 1.6;">
                  <strong>ភាពស្មោះត្រង់ក្នុងវិស្វកម្ម!</strong><br><br>
                  <code>OnSuccess</code> ដំណើរការលុះត្រាតែកន្លែងផ្ទុក Cloud បញ្ជាក់ថាបានទទួលទិន្នន័យ។ បើដាច់ WiFi កម្មវិធីនឹងមិនកុហកអ្នកប្រើប្រាស់ឡើយ។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការរំលឹកសកម្ម (៣ នាទី) ៖</strong> "ហៅសិស្ស ៣ នាក់ឱ្យឆ្លើយសំណួរនីមួយៗមុនពេលចុចត្រឡប់កាត។ ស្តាប់ពាក្យគន្លឹះ ៖ 'កុំប៉ះកូដ App បើឃើញជួរក្នុង SharePoint', 'Item ភ្ជាប់ទៅ Selected', និង 'ភាពស្មោះត្រង់នៃសារឆ្លើយតប'។ ទាំងនេះជាសញ្ញានៃស្ថាបត្យករពិតប្រាកដ។"</p>`
    },

    // Slide 5 (Index 4): The "Why This Exists" Problem
    {
      title: "វិបត្តិជាក់ស្តែង ៖ មហន្តរាយ $45,000 នៃការទន្ទេញតាមវីដេអូ (Tutorial Hell)",
      segment: "ផ្នែកទី ៣ &bull; ហេតុអ្វីបានជាមេរៀននេះកើតឡើង",
      subtitle: "អ្វីដែលកើតឡើងនៅពេលនរណាម្នាក់ទន្ទេញចាំតែការចុចប៊ូតុងតាមវីដេអូ ប៉ុន្តែមិនយល់ដឹងពីការតភ្ជាប់ប្រព័ន្ធ។",
      content: `<div class="card" style="border-left: 3px solid #ef4444;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
              <div>
                <h4 style="color: #f87171; margin-bottom: 0.5rem;">អ្វីដែលបានកើតឡើងនៅរោងចក្រ Apex ៖</h4>
                <ul style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; padding-left: 1.2rem;">
                  <li>អ្នកអភិវឌ្ឍន៍ម្នាក់បានមើលវីដេអូ YouTube ១០០ ម៉ោង ហើយទន្ទេញចាំតែការចុចប៊ូតុង។</li>
                  <li>ពេលគេឱ្យបង្កើតកម្មវិធីរាយការណ៍គ្រោះថ្នាក់ការងារ គាត់បានចម្លងរូបមន្តទាំងងងឹតងងល់ ដោយមិនយល់ពី Data Schema ឬ Form Binding។</li>
                  <li>ប៊ូតុង Submit របស់គាត់បានសរសេរជាន់លើសំបុត្រការងារអតិថិជន ជំនួសឱ្យការកត់ត្រាគ្រោះថ្នាក់។</li>
                  <li>គាត់ដាក់កូដផ្ញើអ៊ីមែលក្នុងប៊ូតុង ដែលបរាជ័យរាល់ពេលកម្មករផ្ញើរបាយការណ៍ពីកន្លែងដាច់សេវា។</li>
                </ul>
              </div>

              <div>
                <h4 style="color: #fca5a5; margin-bottom: 0.5rem;">ផលវិបត្តិមហន្តរាយជាក់ស្តែង ៖</h4>
                <ul style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; padding-left: 1.2rem;">
                  <li><strong>របាយការណ៍បាត់បង់ ៖</strong> របាយការណ៍គ្រោះថ្នាក់បន្ទាន់ ១៨ ករណីបានបាត់ស្រមោល។</li>
                  <li><strong>ការផាកពិន័យពីស្ថាប័នសុវត្ថិភាព ៖</strong> ប្រេងហៀរដែលគ្មានអ្នកដឹង បណ្តាលឱ្យកម្មកររអិលដួលរបួស។</li>
                  <li><strong>ខាតបង់ $45,000 ជួលក្រុមហ៊ុនក្រៅ ៖</strong> ក្រុមហ៊ុនត្រូវជួលអ្នកជំនាញក្រៅមកកម្ទេចចោល និងសាងសង់ឡើងវិញពីបាតដៃទទេ។</li>
                </ul>
              </div>
            </div>

            <div style="margin-top: 1.25rem; padding: 0.85rem; background: rgba(239, 68, 68, 0.1); border-radius: 6px; border-left: 3px solid #ef4444;">
              <p style="color: var(--text-main); font-size: 0.88rem; margin: 0;">
                <strong>ថ្នាំព្យាបាលស្ថាបត្យកម្ម ៖</strong> ការទន្ទេញចាំមាត់នឹងខូចភ្លាមៗ ពេលតម្រូវការអាជីវកម្មប្រែប្រួលត្រឹម ៥%។ ម៉ូដែលគំនិតស្ថាបត្យកម្ម ៩ ជំហានអនុញ្ញាតឱ្យអ្នកដើរចូលក្រុមហ៊ុនណា ក៏អាចបង្កើតប្រព័ន្ធរឹងមាំបានភ្លាមៗពីគោលការណ៍គ្រឹះ។
              </p>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>អារម្មណ៍ &amp; ហានិភ័យជាក់ស្តែង (៣ នាទី) ៖</strong> "ពន្យល់ថានេះមិនមែនជារឿងប្រឌិតទេ—វាកើតឡើងរាល់ថ្ងៃក្នុងក្រុមហ៊ុននានា។ មនុស្សចម្លងកូដពី ChatGPT ឬ YouTube ដោយមិនដឹងថាវាធ្វើអ្វី។ ថ្ងៃនេះ អ្នកបង្ហាញថាអ្នកជាវិស្វករដែលយល់ច្បាស់ពីហេតុ និងផល។"</p>`
    },

    // Slide 6 (Index 5): Plain Language Concept Matrix
    {
      title: "ភាសាសាមញ្ញជាមុន ៖ វាក្យសព្ទនៃការផ្ទេរចំណេះដឹង",
      segment: "ផ្នែកទី ៤ &bull; ភាសាសាមញ្ញជាមុន",
      subtitle: "កុំរៀនពាក្យបច្ចេកទេសដាច់ដោយឡែក។ រាល់សមាសភាគវិស្វកម្មសូហ្វវែរទាំងអស់សុទ្ធតែអាចបកប្រែជាការយល់ដឹងទូទៅ។",
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
                  <td><strong>ការផ្ទេរចំណេះដឹងដោយខ្លួនឯង</strong></td>
                  <td><span class="badge-tag tag-cyan">First-Principles Modeling</span></td>
                  <td>ការដោះស្រាយបញ្ហាអាជីវកម្មថ្មីទាំងស្រុង ដោយប្រើខ្សែសង្វាក់ ៩ ជំហានដោយមិនចាំបាច់ចម្លងតាមវីដេអូ។</td>
                </tr>
                <tr>
                  <td><strong>កិច្ចព្រមព្រៀងធុងផ្ទុកទិន្នន័យ</strong></td>
                  <td><span class="badge-tag tag-amber">Typed Data Schema</span></td>
                  <td>ការព្រមព្រៀងលើប្រភេទជួរឈរជាក់លាក់ (Choice, Date, Number) មុនពេលចាប់ផ្តើមរចនាប៊ូតុងលើអេក្រង់។</td>
                </tr>
                <tr>
                  <td><strong>ការបែងចែកការងារដាច់ពីគ្នា</strong></td>
                  <td><span class="badge-tag tag-purple">Decoupled Architecture</span></td>
                  <td>Power Apps ទទួលព័ត៌មានពីមនុស្ស; Cloud Flow ទទួលខុសត្រូវបញ្ជូនសារស្វ័យប្រវត្តិក្នងផ្ទៃខាងក្រោយ។</td>
                </tr>
                <tr>
                  <td><strong>ច្រកទ្វារសុវត្ថិភាពទិន្នន័យ</strong></td>
                  <td><span class="badge-tag tag-rose">Validation Rules</span></td>
                  <td>ចាក់សោប៊ូតុង (DisplayMode.Disabled) រហូតដល់មនុស្សបំពេញព័ត៌មានគ្រប់ជ្រុងជ្រោយ។</td>
                </tr>
                <tr>
                  <td><strong>ការធ្វើរោគវិនិច្ឆ័យតាមលំដាប់</strong></td>
                  <td><span class="badge-tag tag-emerald">3-Tier Troubleshooting</span></td>
                  <td>ការត្រួតពិនិត្យតាមលំដាប់ ៖ App ➔ Storage ➔ Flow ➔ Delivery ដោយមិនបាច់ទាយ ឬភ័យស្លន់ស្លោ។</td>
                </tr>
              </tbody>
            </table>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការបំភ្លឺជាភាសាសាមញ្ញ (៣ នាទី) ៖</strong> "កត់សម្គាល់ពីរបៀបដែលពាក្យនីមួយៗផ្សារភ្ជាប់ជាមួយការពិតក្នុងកន្លែងធ្វើការ។ ពេលអ្នកពន្យល់កម្មវិធីទៅកាន់ថ្នាក់ដឹកនាំ ចូរនិយាយភាសាសាមញ្ញ ៖ 'យើងបានបំបែកប្រព័ន្ធផ្ញើសារចេញពីកម្មវិធី ដូច្នេះទោះបីជាកម្មករដាច់អ៊ីនធឺណិត ក៏សារជូនដំណឹងមិនបាត់បង់ដែរ'។"</p>`
    },

    // Slide 7 (Index 6): Everyday Analogy: Driving Test
    {
      title: "ឧទាហរណ៍ជាក់ស្តែង ៖ ការប្រឡងយកប័ណ្ណបើកបរ vs ការទន្ទេញផ្លូវ GPS",
      segment: "ផ្នែកទី ៤ &bull; ម៉ូដែលគំនិត",
      subtitle: "ហេតុអ្វីបានជាការយល់ដឹងពីឧបករណ៍បញ្ជា និងច្បាប់ចរាចរណ៍ មានតម្លៃជាងការទន្ទេញចាំទិសដៅបត់ឆ្វេងបត់ស្តាំ។",
      content: `<div class="card" style="border-top: 4px solid #ef4444;">
            <span class="card-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">អ្នកទន្ទេញចាំមាត់ (ងាយរងគ្រោះ)</span>
            <h3 class="card-title" style="color: #f87171;">ការទន្ទេញទិសដៅតាម GPS</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">
              អ្នករៀនបើកបរម្នាក់ទន្ទេញថា ៖ <em>"បើកទៅមុខ ៤០០ ម៉ែត្រ បត់ឆ្វេងត្រង់ផ្ទះពណ៌ខៀវ បត់ស្តាំត្រង់ដើមឈើ។"</em>
            </p>
            <div style="margin-top: 1rem; padding: 0.85rem; background: rgba(0, 0, 0, 0.35); border-radius: 6px; font-size: 0.85rem; color: #fca5a5; line-height: 1.5;">
              ⚠️ <strong>ពេលផ្លូវត្រូវបិទជួសជុល ៖</strong><br>
              ដោយសារតែអ្នកបើកបរមិនយល់ពីផ្លាកសញ្ញា មិនយល់ពីម៉ាស៊ីន ឬផែនទី គាត់នឹងវង្វេងផ្លូវ និងជួបគ្រោះថ្នាក់ភ្លាមៗ។
            </div>
          </div>

          <div class="card" style="border-top: 4px solid #10b981;">
            <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ស្ថាបត្យករពិតប្រាកដ (រឹងមាំ)</span>
            <h3 class="card-title" style="color: #86efac;">អ្នកបើកបរដែលមានប័ណ្ណត្រឹមត្រូវ</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">
              អ្នកបើកបរអាជីពយល់ពីចលនារថយន្ត (ឈ្នាន់ហ្គាស ឈ្នាន់ហ្វ្រាំង), ច្បាប់ចរាចរណ៍ (ឈប់ ផ្តល់អាទិភាព), និងបណ្តាញផ្លូវ។
            </p>
            <div style="margin-top: 1rem; padding: 0.85rem; background: rgba(0, 0, 0, 0.35); border-radius: 6px; font-size: 0.85rem; color: #86efac; line-height: 1.5;">
              ✓ <strong>ពេលជួបផ្លូវវាង ៖</strong><br>
              អ្នកបើកបរវាយតម្លៃស្ថានភាព បើកមើលផែនទី បត់ចូលផ្លូវវាងដោយស្ងប់ស្ងាត់ ហើយទៅដល់គោលដៅដោយសុវត្ថិភាព។
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការប្រៀបធៀបការបើកបរ (៣ នាទី) ៖</strong> "សួរសិស្ស ៖ 'ពេលអ្នកប្រឡងយកប័ណ្ណបើកបរ តើអ្នកប្រឡងឱ្យ GPS អ្នកមើលទេ?' អត់ទេ! គេប្រាប់ឱ្យអ្នកបត់ ចូលចត និងជាន់ហ្វ្រាំងដោយសុវត្ថិភាព។ ថ្ងៃនេះគឺជាការប្រឡងបើកបររបស់អ្នកសម្រាប់ Power Platform។"</p>`
    },

    // Slide 8 (Index 7): Workplace Scenario: Safety Hazard App
    {
      title: "ឧទាហរណ៍រោងចក្រ DX ៖ ប្រព័ន្ធតាមដានគ្រោះថ្នាក់ និងហានិភ័យសុវត្ថិភាព",
      segment: "ផ្នែកទី ៤ &bull; កម្មវិធីជាក់ស្តែងក្នុងកន្លែងធ្វើការ",
      subtitle: "បញ្ហាប្រតិបត្តិការថ្មីនៅរោងចក្រ Apex ៖ ការជំនួសក្រដាសកត់ត្រាគ្រោះថ្នាក់ ដោយប្រព័ន្ធឌីជីថល ៣០ វិនាទី។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">១. កម្មកររោងចក្រ</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">ប្រទះឃើញប្រេងហៀរ</h4>
            <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
              កម្មករឃើញប្រេងត្រជាក់ហៀរពេញផ្លូវដើរក្បែរម៉ាស៊ីនក្រឡឹង CNC Lathe #04 ដែលអាចបណ្តាលឱ្យរអិលដួល។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">២. ច្រកទ្វារលើថេប្លេត</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">កត់ត្រាក្នុង ៣០ វិនាទី</h4>
            <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
              ចុច <code>+ Report Hazard</code>, រើសទីតាំង 'Line 2 Bay', អាទិភាព 'High', វាយការពិពណ៌នា រួចចុច Save។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc;">៣. ដំណឹងស្វ័យប្រវត្តិ Cloud</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">សារអាសន្នទៅកាន់ EHS</h4>
            <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
              SharePoint ដាស់ Power Automate។ សារអាទិភាពខ្ពស់ធ្លាក់ចូល Outlook របស់ប្រធានសុវត្ថិភាពសុខាក្នុងរយៈពេល ៤០ វិនាទី។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">៤. តុការងារដោះស្រាយ</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">ត្រួតពិនិត្យ &amp; ដោះស្រាយ</h4>
            <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
              សុខាបើកកម្មវិធី ចុចលើសំបុត្រ #HAZ-204 ពិនិត្យព័ត៌មាន កែជា 'Mitigated' និងកត់ត្រាថ្លៃសម្អាត។
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការរៀបចំសេណារីយ៉ូ (៣ នាទី) ៖</strong> "កត់សម្គាល់ថានេះជាបញ្ហាថ្មីទាំងស្រុង។ វាមិនមែនជាការជួសជុលម៉ាស៊ីនទេ—វាជាសុខភាព និងសុវត្ថិភាពការងារ (EHS)។ ប៉ុន្តែស្ថាបត្យកម្មគឺដូចគ្នាទាំងស្រុង! នេះហើយគឺជាអំណាចនៃការផ្ទេរចំណេះដឹង។"</p>`
    },

    // Slide 9 (Index 8): Master Cause-and-Effect Architecture
    {
      title: "ដ្យាក្រាមខ្សែសង្វាក់ហេតុនិងផលពេញលេញ ៩ ជំហាន",
      segment: "ផ្នែកទី ៥ &bull; ស្ថាបត្យកម្មប្រព័ន្ធ",
      subtitle: "រាល់សមាសភាគឌីជីថលសុទ្ធតែកើតឡើងដើម្បីបម្រើសុវត្ថិភាពមនុស្ស។ តាមដានខ្សែសង្វាក់ពីការរអិលដួលរហូតដល់ការដោះស្រាយ។",
      content: `<div class="card">
            <div class="flow-pipeline-container">
              <div class="flow-step-node">
                <div class="flow-step-icon">⚠️</div>
                <div class="flow-step-title">១. បញ្ហា</div>
                <div class="flow-step-desc">ប្រេងហៀរហានិភ័យរអិលដួលលើផ្លូវដើរ</div>
              </div>
              <div class="flow-step-arrow">&rarr;</div>
              <div class="flow-step-node">
                <div class="flow-step-icon">📋</div>
                <div class="flow-step-title">២. ដំណើរការ</div>
                <div class="flow-step-desc">រាយការណ៍ ➔ ដំណឹង ➔ សម្អាត ➔ ពិនិត្យ</div>
              </div>
              <div class="flow-step-arrow">&rarr;</div>
              <div class="flow-step-node">
                <div class="flow-step-icon">🗄️</div>
                <div class="flow-step-title">៣. ទិន្នន័យ</div>
                <div class="flow-step-desc">SharePoint: SafetyHazards list</div>
              </div>
              <div class="flow-step-arrow">&rarr;</div>
              <div class="flow-step-node">
                <div class="flow-step-icon">📱</div>
                <div class="flow-step-title">៤. អេក្រង់</div>
                <div class="flow-step-desc">Home ➔ Report ➔ Review screens</div>
              </div>
              <div class="flow-step-arrow">&rarr;</div>
              <div class="flow-step-node">
                <div class="flow-step-icon">🔒</div>
                <div class="flow-step-title">៥. តក្កវិជ្ជា</div>
                <div class="flow-step-desc">If(IsBlank(), Disabled, Edit)</div>
              </div>
              <div class="flow-step-arrow">&rarr;</div>
              <div class="flow-step-node" style="border-color: #8b5cf6;">
                <div class="flow-step-icon">⚡</div>
                <div class="flow-step-title" style="color: #c084fc;">៦. Cloud Flow</div>
                <div class="flow-step-desc">Trigger ➔ Outlook Email V2</div>
              </div>
              <div class="flow-step-arrow">&rarr;</div>
              <div class="flow-step-node" style="border-color: #10b981;">
                <div class="flow-step-icon">🎓</div>
                <div class="flow-step-title" style="color: #86efac;">៧. ការពន្យល់</div>
                <div class="flow-step-desc">បកស្រាយហេតុផល ៣ កម្រិត</div>
              </div>
            </div>

            <div style="margin-top: 1.25rem; padding: 0.85rem; background: rgba(245, 158, 11, 0.08); border-radius: 6px; border-left: 3px solid #f59e0b;">
              <strong style="color: #fcd34d;">ខ្សែសង្វាក់សកល ៖</strong> មនុស្ស ➔ POWER APPS ➔ SHAREPOINT ➔ POWER AUTOMATE ➔ សារដំណឹង ➔ មេការ។
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការដើរកាត់ប្រព័ន្ធ (៣ នាទី) ៖</strong> "ឱ្យសិស្សសូត្រខ្សែសង្វាក់នេះ។ ប្រសិនបើប៊ូតុងមួយដំណើរការខុស តើវាស្ថិតនៅស្រទាប់ណា? ស្រទាប់ទី ៥។ ប្រសិនបើអ៊ីមែលមិនព្រមផ្ញើចេញ តើវាស្ថិតនៅស្រទាប់ណា? ស្រទាប់ទី ៦។ រាល់បញ្ហាទាំងអស់សុទ្ធតែមានអាសយដ្ឋានច្បាស់លាស់។"</p>`
    },

    // Slide 10 (Index 9): Layer 1 & 2 Transfer: Problem & Process
    {
      title: "ស្រទាប់ទី ១ &amp; ២ ៖ ការបំបែកបញ្ហា និងដំណើរការការងាររបស់មនុស្ស",
      segment: "ផ្នែកទី ៦ &bull; ការផ្ទេរចំណេះដឹងស្រទាប់ ១ &amp; ២",
      subtitle: "មុនពេលប៉ះ Power Apps Studio ឬ SharePoint ត្រូវគូរផែនទីតួអង្គមនុស្ស និងការផ្ទេរការងារក្នុងជីវិតពិតជាមុន។",
      content: `<div class="card">
            <h3 class="card-title">🚨 ស្រទាប់ទី ១ ៖ ការវិភាគបញ្ហា</h3>
            <ul style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; padding-left: 1.2rem;">
              <li><strong>ការឈឺចាប់របស់មនុស្ស ៖</strong> កម្មករឃើញគ្រោះថ្នាក់ជាក់ស្តែង ប៉ុន្តែការកត់ក្រដាសចំណាយពេល ១៥ នាទីក្នុងការស្វែងរក និងបំពេញ។</li>
              <li><strong>ភាពស្ទះដំណើរការ ៖</strong> ក្រដាសរាយការណ៍ដេកស្ងាត់ក្នុងថតឯកសារមេការ ៤៨ ម៉ោងដោយគ្មានអ្នកអាន។</li>
              <li><strong>ផលវិបាក ៖</strong> ការរអិលដួល របួសកម្មករ ការផាកពិន័យ និងការខាតបង់ផលិតកម្ម។</li>
              <li><strong>គោលដៅកំណត់ ៖</strong> កាត់បន្ថយពេលរាយការណ៍ពី ១៥ នាទីមកក្រោម ៣០ វិនាទី; ជូនដំណឹងដល់មេការក្នុងពេលក្រោម ៦០ វិនាទី។</li>
            </ul>
          </div>

          <div class="card">
            <h3 class="card-title">🔄 ស្រទាប់ទី ២ ៖ ការផ្ទេរការងាររវាងមនុស្ស</h3>
            <div style="display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.85rem; margin-top: 0.25rem;">
              <div style="background: rgba(0, 0, 0, 0.3); padding: 0.6rem; border-radius: 6px; border-left: 3px solid #f59e0b;">
                <strong>ជំហានទី ១ (ទទួលព័ត៌មាន) ៖</strong> កម្មករឃើញគ្រោះថ្នាក់ ➔ បញ្ចូលចំណងជើង ទីតាំង កម្រិតធ្ងន់ធ្ងរលើថេប្លេត ➔ ចុច Submit។
              </div>
              <div style="background: rgba(0, 0, 0, 0.3); padding: 0.6rem; border-radius: 6px; border-left: 3px solid #8b5cf6;">
                <strong>ជំហានទី ២ (ការជូនដំណឹង) ៖</strong> SharePoint ដាស់ Power Automate ➔ ប្រធានសុវត្ថិភាពទទួលបានសារអ៊ីមែលបន្ទាន់ក្នុង Outlook។
              </div>
              <div style="background: rgba(0, 0, 0, 0.3); padding: 0.6rem; border-radius: 6px; border-left: 3px solid #10b981;">
                <strong>ជំហានទី ៣ (ការដោះស្រាយ) ៖</strong> មន្ត្រីសុវត្ថិភាពចុះពិនិត្យ ចាត់តាំងក្រុមសម្អាត កត់ត្រាថ្លៃចំណាយ និងកែជា 'Mitigated'។
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការគូរផែនទីដំណើរការ (៣ នាទី) ៖</strong> "សួរសិស្ស ៖ 'តើតួអង្គមនុស្សណាខ្លះក្នុងដំណើរការនេះ?' មាន ២ នាក់ ៖ កម្មកររោងចក្រ និងមន្ត្រីសុវត្ថិភាព EHS។ កម្មវិធីរបស់អ្នកត្រូវតែបម្រើមនុស្សទាំងពីរដោយគ្មានការភាន់ច្រឡំ។"</p>`
    },

    // Slide 11 (Index 10): Layer 3 Transfer: Data Schema
    {
      title: "ស្រទាប់ទី ៣ ៖ ការរៀបចំទម្រង់ទិន្នន័យ (Data Schema) ក្នុង SharePoint",
      segment: "ផ្នែកទី ៦ &bull; ការផ្ទេរចំណេះដឹងស្រទាប់ ៣",
      subtitle: "ការបង្កើតធុងផ្ទុកទិន្នន័យអចិន្ត្រៃយ៍លើ Cloud ជាមួយប្រភេទជួរឈរត្រឹមត្រូវ មុនពេលចាប់ផ្តើមបង្កើតអេក្រង់។",
      content: `<div class="card">
            <h3 class="card-title">🗄️ បញ្ជី SharePoint ៖ <code>SafetyHazards</code></h3>
            <table class="matrix-table" style="margin-top: 0.5rem;">
              <thead>
                <tr>
                  <th>ឈ្មោះជួរឈរ</th>
                  <th>ប្រភេទក្នុង SharePoint</th>
                  <th>ការកំណត់ &amp; តម្លៃអនុញ្ញាត</th>
                  <th>តួនាទីក្នុងប្រព័ន្ធ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>Title</code></td>
                  <td>Single Line of Text</td>
                  <td>ចាំបាច់ (ឧ. "Oil spill aisle 4")</td>
                  <td>ស្លាកខ្លីសម្រាប់បង្ហាញក្នុង Gallery និងចំណងជើងសង្ខេប។</td>
                </tr>
                <tr>
                  <td><code>Location</code></td>
                  <td>Choice (Dropdown)</td>
                  <td>Line 1 Bay, Line 2 Bay, CNC Area, Assembly, Shipping</td>
                  <td>កំណត់តំបន់ស្តង់ដារក្នុងរោងចក្រ ងាយស្រួលចម្រោះ និងធ្វើរបាយការណ៍។</td>
                </tr>
                <tr>
                  <td><code>Severity</code></td>
                  <td>Choice (Dropdown)</td>
                  <td>Critical, High, Medium, Low</td>
                  <td>កំណត់ពណ៌អាសន្នលើ UI និងដាស់សារអ៊ីមែលអាទិភាពខ្ពស់។</td>
                </tr>
                <tr>
                  <td><code>Description</code></td>
                  <td>Multiple Lines of Text</td>
                  <td>អត្ថបទធម្មតា</td>
                  <td>ការពន្យល់លម្អិតអំពីស្ថានភាព និងហានិភ័យភ្លាមៗ។</td>
                </tr>
                <tr>
                  <td><code>Status</code></td>
                  <td>Choice (Dropdown)</td>
                  <td>New, In Progress, Mitigated, Closed</td>
                  <td>វដ្តជីវិតកំណត់ត្រា; គ្រប់គ្រងថាតើត្រូវបង្ហាញក្នុងបញ្ជីសកម្មឬអត់។</td>
                </tr>
              </tbody>
            </table>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការពិនិត្យទម្រង់ទិន្នន័យ (៣ នាទី) ៖</strong> "សង្កត់ធ្ងន់ពីមូលហេតុដែល Location និង Severity ជា Choice មិនមែនជា Text។ ប្រសិនបើនរណាម្នាក់វាយ 'cnc area' ហើយម្នាក់ទៀតវាយ 'CNC Area 1' ការ Filter របស់យើងនឹងខូច។ Choice ជួយធានានូវភាពសុក្រឹតនៃទិន្នន័យ។"</p>`
    },

    // Slide 12 (Index 11): Layer 4 Transfer: 3-Screen UI Pattern
    {
      title: "ស្រទាប់ទី ៤ ៖ ការអនុវត្តស្ថាបត្យកម្ម ៣ អេក្រង់ស្តង់ដារ",
      segment: "ផ្នែកទី ៦ &bull; ការផ្ទេរចំណេះដឹងស្រទាប់ ៤",
      subtitle: "គំរូសហគ្រាសដែលមិនអាចបំបែកបាន ៖ ១ អេក្រង់រុករកនិងមើលទិន្នន័យ (Gallery), ១ អេក្រង់ទទួលព័ត៌មានថ្មី, និង ១ អេក្រង់ត្រួតពិនិត្យ/កែសម្រួល។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">អេក្រង់ទី ១</span>
            <h3 class="card-title"><code>scr_HazardHome</code></h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5;">
              <strong>មជ្ឈមណ្ឌលបញ្ជាកណ្តាល ៖</strong><br>
              &bull; ប្រអប់ស្វែងរក (<code>txtSearchHazard</code>)<br>
              &bull; Dropdown ចម្រោះតាមកម្រិតធ្ងន់ធ្ងរ<br>
              &bull; Gallery (<code>galHazards</code>) បង្ហាញសំបុត្រសកម្មជាមួយស្លាកពណ៌<br>
              &bull; ប៊ូតុងធំ ៖ <code>+ Report Hazard</code>
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">អេក្រង់ទី ២</span>
            <h3 class="card-title"><code>scr_ReportHazard</code></h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5;">
              <strong>ច្រកទ្វារទទួលព័ត៌មានសុវត្ថិភាព ៖</strong><br>
              &bull; ទម្រង់បែបបទតែមួយ ៖ <code>frmNewHazard</code> ក្នុង <code>FormMode.New</code><br>
              &bull; ប៊ូតុង និងប្រអប់ធំៗងាយស្រួលចុចលើ Touchscreen<br>
              &bull; ប៊ូតុង Submit ចាក់សោផ្ទៀងផ្ទាត់ទិន្នន័យ<br>
              &bull; ប៊ូតុង Cancel សុវត្ថិភាព ៖ <code>ResetForm(); Back()</code>
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">អេក្រង់ទី ៣</span>
            <h3 class="card-title"><code>scr_ReviewHazard</code></h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5;">
              <strong>តុការងារមន្ត្រីសុវត្ថិភាព ៖</strong><br>
              &bull; ទម្រង់កែសម្រួល ៖ <code>frmReviewHazard</code> ក្នុង <code>FormMode.Edit</code><br>
              &bull; ភ្ជាប់ទិន្នន័យផ្ទាល់ ៖ <code>Item = galHazards.Selected</code><br>
              &bull; វាលមើលតែមួយគត់ (អ្នករាយការណ៍ កាលបរិច្ឆេទ)<br>
              &bull; កែប្រែស្ថានភាព (Mitigated) &amp; កត់ត្រាថ្លៃចំណាយ
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>វិន័យ ៣ អេក្រង់ (៣ នាទី) ៖</strong> "រំលឹកសិស្ស ៖ យើងមិនបង្កើត ១០ អេក្រង់រញ៉េរញ៉ៃទេ។ ៩៥% នៃកម្មវិធីអាជីវកម្មដំណើរការយ៉ាងល្អឥតខ្ចោះលើ ៣ អេក្រង់នេះ។ ស្ទាត់ជំនាញលើគំរូនេះ អ្នកអាចបង្កើតកម្មវិធីអ្វីក៏បាន។"</p>`
    },

    // Slide 13 (Index 12): Layer 5 Transfer: Power Fx Decision Rules
    {
      title: "ស្រទាប់ទី ៥ ៖ វិធានតក្កវិជ្ជា និងច្រកទ្វារសុវត្ថិភាព Power Fx",
      segment: "ផ្នែកទី ៦ &bull; ការផ្ទេរចំណេះដឹងស្រទាប់ ៥",
      subtitle: "ការអនុវត្តវិធានអាជីវកម្មតាមរយៈសំណួរប៊ូលីន ពណ៌តាមលក្ខខណ្ឌ និងព្រឹត្តិការណ៍វដ្តជីវិតទិន្នន័យ។",
      content: `<div class="card">
            <h3 class="card-title">🔒 ការផ្ទៀងផ្ទាត់ប៊ូតុង Submit</h3>
            <div style="background: rgba(0, 0, 0, 0.45); padding: 0.85rem; border-radius: 6px; font-family: var(--font-code); font-size: 0.82rem; color: #fcd34d; line-height: 1.6;">
              // btnSubmitHazard.DisplayMode<br>
              If(<br>
              &nbsp;&nbsp;IsBlank(cmbLocation.Selected.Value) Or IsBlank(txtDescription.Text),<br>
              &nbsp;&nbsp;DisplayMode.Disabled,<br>
              &nbsp;&nbsp;DisplayMode.Edit<br>
              )
            </div>
            <p style="color: var(--text-muted); font-size: 0.82rem; margin-top: 0.75rem;">
              <strong>មូលហេតុដែលដំណើរការ ៖</strong> ប្រតិបត្តិករ <code>Or</code> វាយតម្លៃស្មើ True ប្រសិនបើវាលណាមួយនៅទទេ ធ្វើឱ្យប៊ូតុងប្រែជាពណ៌ប្រផេះចាក់សោជាប់ ការពារកុំឱ្យទិន្នន័យខូចចូល Cloud។
            </p>
          </div>

          <div class="card">
            <h3 class="card-title">🎨 ពណ៌ស្លាកកម្រិតធ្ងន់ធ្ងរតាមលក្ខខណ្ឌ</h3>
            <div style="background: rgba(0, 0, 0, 0.45); padding: 0.85rem; border-radius: 6px; font-family: var(--font-code); font-size: 0.82rem; color: #67e8f9; line-height: 1.6;">
              // lblSeverityBadge.Fill<br>
              Switch(<br>
              &nbsp;&nbsp;ThisItem.Severity.Value,<br>
              &nbsp;&nbsp;"Critical", RGBA(239, 68, 68, 0.8),<br>
              &nbsp;&nbsp;"High", RGBA(245, 158, 11, 0.8),<br>
              &nbsp;&nbsp;RGBA(16, 185, 129, 0.8)<br>
              )
            </div>
            <p style="color: var(--text-muted); font-size: 0.82rem; margin-top: 0.75rem;">
              <strong>មូលហេតុដែលដំណើរការ ៖</strong> <code>Switch()</code> វាយតម្លៃកម្រិតធ្ងន់ធ្ងរ និងប្តូរពណ៌ភ្លាមៗ ដើម្បីឱ្យករណីបន្ទាន់លេចធ្លោទាក់ភ្នែកមេការ។
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការពន្យល់តក្កវិជ្ជា (៣ នាទី) ៖</strong> "សួរសិស្ស ៖ 'តើសំណួរអ្វីដែលកំពុងសួរលើប៊ូតុង Submit?' សំណួរគឺ ៖ តើទីតាំងនៅទទេ ឬការពិពណ៌នានៅទទេ? បើទទេ ត្រូវចាក់សោប៊ូតុង។ ភាសាសាមញ្ញជាមុនជានិច្ច!"</p>`
    },

    // Slide 14 (Index 13): Layer 6 & 7 Transfer: Cloud Automation
    {
      title: "ស្រទាប់ទី ៦ &amp; ៧ ៖ ស្វ័យប្រវត្តិកម្ម Cloud ដាច់ដោយឡែកជាមួយ Power Automate",
      segment: "ផ្នែកទី ៦ &bull; ការផ្ទេរចំណេះដឹងស្រទាប់ ៦ &amp; ៧",
      subtitle: "មូលហេតុដែលសារដំណឹងត្រូវនៅលើ Cloud Server និងរបៀបដែល SharePoint Trigger ដំណើរការ ២៤/៧ ដោយឯករាជ្យ។",
      content: `<div class="card" style="border-left: 3px solid #8b5cf6;">
            <h3 class="card-title">⚡ Trigger ៖ When an item is created</h3>
            <div style="background: rgba(0, 0, 0, 0.35); padding: 0.85rem; border-radius: 6px; font-size: 0.85rem; color: #cbd5e1; line-height: 1.6;">
              <strong>Connector ៖</strong> SharePoint<br>
              &bull; <strong>Site Address ៖</strong> https://apexprecision.sharepoint.com/sites/EHS<br>
              &bull; <strong>List Name ៖</strong> SafetyHazards
            </div>
            <p style="color: var(--text-muted); font-size: 0.82rem; margin-top: 0.75rem;">
              <strong>វិធានដាច់ដោយឡែក ៖</strong> Flow ដេកស្ងៀមលើ Microsoft Cloud Server រហូតដល់ SharePoint ប្រាប់ថា ៖ <em>"មានជួរគ្រោះថ្នាក់ថ្មីកើតឡើង!"</em> វាមិនខ្វល់ថាថេប្លេតបិទឬអត់ឡើយ។
            </p>
          </div>

          <div class="card" style="border-left: 3px solid #8b5cf6;">
            <h3 class="card-title">📧 Action ៖ Send an email (V2)</h3>
            <div style="background: rgba(0, 0, 0, 0.35); padding: 0.85rem; border-radius: 6px; font-size: 0.85rem; color: #cbd5e1; line-height: 1.6;">
              <strong>Connector ៖</strong> Office 365 Outlook<br>
              &bull; <strong>To ៖</strong> EHS_Director@apexprecision.com<br>
              &bull; <strong>Subject ៖</strong> 🚨 <code>[Severity Value]</code> គ្រោះថ្នាក់ ៖ <code>[Title]</code> នៅ <code>[Location Value]</code><br>
              &bull; <strong>Body ៖</strong> រាយការណ៍ដោយ <code>[Created By DisplayName]</code>។ សូមចូលពិនិត្យក្នុង App ភ្លាម។
            </div>
            <p style="color: var(--text-muted); font-size: 0.82rem; margin-top: 0.75rem;">
              <strong>ស្លាក Dynamic Content ៖</strong> ស្លាកក្នុងវង់ក្រចក <code>[ ]</code> នឹងទាញតម្លៃពិតចេញពីជួរដែលទើបតែបង្កើតដោយស្វ័យប្រវត្តិ!
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការបំបែកស្រទាប់ Cloud (៣ នាទី) ៖</strong> "បញ្ជាក់ពីមូលហេតុដែលប៊ូតុងផ្ញើអ៊ីមែលក្នុង App ងាយនឹងខូច។ បើកម្មករទម្លាក់ទូរស័ព្ទបែក ឬដើរចូលកន្លែងដាច់សេវា អ៊ីមែលនឹងងាប់។ Cloud flows ធានាការបញ្ជូន ១០០% ពេលទិន្នន័យចូល SharePoint រួច។"</p>`
    },

    // Slide 15 (Index 14): Layer 8 & 9 Transfer: 3-Tier Troubleshooting
    {
      title: "ស្រទាប់ទី ៨ &amp; ៩ ៖ វិធីសាស្ត្រដោះស្រាយបញ្ហាជាប្រព័ន្ធ ៣ ស្រទាប់",
      segment: "ផ្នែកទី ៦ &bull; ការផ្ទេរចំណេះដឹងស្រទាប់ ៨ &amp; ៩",
      subtitle: "នៅពេលនរណាម្នាក់រាយការណ៍ពីកំហុស កុំទាយ ឬសរសេរកូដឡើងវិញដោយងងឹតងងល់។ អនុវត្តសវនកម្ម ៣ ស្រទាប់។",
      content: `<div class="troubleshoot-grid">
            <div class="troubleshoot-card troubleshoot-tier-a">
              <span class="troubleshoot-badge" style="background: rgba(2, 132, 199, 0.2); color: #38bdf8;">ស្រទាប់ទី ១ &bull; Power Apps Layer</span>
              <h4 style="color: #f8fafc; margin-bottom: 0.5rem;">តើទិន្នន័យបានចូល SharePoint ទេ?</h4>
              <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.5;">
                បើកបញ្ជី SharePoint ក្នុង Browser។ រកមើលជួរគ្រោះថ្នាក់ដែលទើបរាយការណ៍។
              </p>
              <div class="troubleshoot-check-item">
                <span style="color: #f87171;">✕ បាត់ជួរ ៖</span>
                <span>Power Apps មិនបាន Submit។ ពិនិត្យមើល <code>Form.Error</code>, Wi-Fi, ឬវិធានផ្ទៀងផ្ទាត់។</span>
              </div>
              <div class="troubleshoot-check-item">
                <span style="color: #34d399;">✓ ឃើញជួរ ៖</span>
                <span>Power Apps គ្មានកំហុស ១០០%! <strong>កុំប៉ះកូដ APP ឱ្យសោះ!</strong> ឆ្ពោះទៅស្រទាប់ទី ២។</span>
              </div>
            </div>

            <div class="troubleshoot-card troubleshoot-tier-b">
              <span class="troubleshoot-badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc;">ស្រទាប់ទី ២ &bull; Flow Trigger Layer</span>
              <h4 style="color: #f8fafc; margin-bottom: 0.5rem;">តើ Power Automate បានភ្ញាក់ពីដំណេកទេ?</h4>
              <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.5;">
                បើក Power Automate &rarr; Flow Details &rarr; ពិនិត្យ <strong>Run History</strong>។
              </p>
              <div class="troubleshoot-check-item">
                <span style="color: #f87171;">✕ គ្មាន Run សោះ ៖</span>
                <span>Trigger រកមិនឃើញជួរថ្មី។ ពិនិត្យមើលថាតើ Flow បើក <strong>On</strong> ឬគណនីផុតកំណត់។</span>
              </div>
              <div class="troubleshoot-check-item">
                <span style="color: #34d399;">✓ ឃើញមាន Run ៖</span>
                <span>Trigger ដំណើរការជោគជ័យ! ឆ្ពោះទៅស្រទាប់ទី ៣ ដើម្បីពិនិត្យកាត Action។</span>
              </div>
            </div>

            <div class="troubleshoot-card troubleshoot-tier-c">
              <span class="troubleshoot-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ស្រទាប់ទី ៣ &bull; ការបញ្ជូន Email</span>
              <h4 style="color: #f8fafc; margin-bottom: 0.5rem;">តើសកម្មភាពអ៊ីមែលជោគជ័យទេ?</h4>
              <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.5;">
                ចុចចូលក្នុង Run History ដើម្បីពិនិត្យមើលកាត <code>Send an email (V2)</code>។
              </p>
              <div class="troubleshoot-check-item">
                <span style="color: #f87171;">✕ សញ្ញាខ្វែងក្រហម ៖</span>
                <span>សកម្មភាពបរាជ័យ។ អ៊ីមែលអ្នកទទួលខុស ឬគ្មានសិទ្ធិផ្ញើ។</span>
              </div>
              <div class="troubleshoot-check-item">
                <span style="color: #34d399;">✓ សញ្ញាគ្រីសបៃតង ៖</span>
                <span>អ៊ីមែលផ្ញើរួចរាល់! ពិនិត្យមើលប្រអប់ <strong>Junk / Spam</strong> ក្នុង Outlook។</span>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>វិន័យវិនិច្ឆ័យ (៣ នាទី) ៖</strong> "ដាស់តឿនសិស្ស ៖ 'បើឃើញជួរក្នុង SharePoint តើអ្នកទៅកែកូដ Power Apps ទេ?' មិនដាច់ខាត! ការធ្វើបែបនោះមានតែបំផ្លាញកូដដែលដំណើរការស្រេច។ ត្រូវបន្តទៅស្រទាប់ទី ២ ដោយស្ងប់ស្ងាត់។"</p>`
    },

    // Slide 16 (Index 15): Interactive Simulator: Capstone Lifecycle
    {
      title: "ឧបករណ៍ពិសោធន៍វដ្តជីវិតគម្រោង Capstone (Interactive Simulator)",
      segment: "ផ្នែកទី ៧ &bull; បន្ទប់ពិសោធន៍អន្តរកម្ម",
      subtitle: "ចុចលើដំណាក់កាលនីមួយៗខាងក្រោម ដើម្បីពិសោធន៍ការផ្លាស់ទីទិន្នន័យ និងការផ្ទេរការងារពីថេប្លេតដល់អ៊ីមែល។",
      content: `<div class="blueprint-sim">
            <div class="sim-nav-tabs">
              <button class="sim-tab-btn active" id="sim-tab-1" onclick="selectDay27Sim(1)">១. រោងចក្រ</button>
              <button class="sim-tab-btn" id="sim-tab-2" onclick="selectDay27Sim(2)">២. កត់ត្រា</button>
              <button class="sim-tab-btn" id="sim-tab-3" onclick="selectDay27Sim(3)">៣. ច្រកទ្វារផ្ទៀងផ្ទាត់</button>
              <button class="sim-tab-btn" id="sim-tab-4" onclick="selectDay27Sim(4)">៤. សរសេរ Cloud</button>
              <button class="sim-tab-btn flow-tab" id="sim-tab-5" onclick="selectDay27Sim(5)">៥. Flow Trigger</button>
              <button class="sim-tab-btn flow-tab" id="sim-tab-6" onclick="selectDay27Sim(6)">៦. សារ Outlook</button>
              <button class="sim-tab-btn" id="sim-tab-7" onclick="selectDay27Sim(7)">៧. EHS ដោះស្រាយ</button>
            </div>
            <div class="sim-stage-content" id="sim-day27-display">
              <!-- Populated dynamically by JS selectDay27Sim(1) -->
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការស្វែងយល់ពីឧបករណ៍ពិសោធន៍ជាក់ស្តែង (Sandbox Walkthrough) (៣ នាទី) ៖</strong> "ចុចលើផ្ទាំងពី ១ ដល់ ៧។ សួរសិស្ស ៖ 'តើកន្លែងណាដែល Power Apps បញ្ចប់ ហើយ SharePoint ចាប់ផ្តើម? កន្លែងណាដែល SharePoint បញ្ចប់ ហើយ Power Automate ចាប់ផ្តើម?' ផ្ទៀងផ្ទាត់ការយល់ដឹងពីព្រំដែនប្រព័ន្ធ។"</p>`
    },

    // Slide 17 (Index 16): Trainer Demonstration: Rapid Deconstruction
    {
      title: "ការបង្ហាញផ្ទាល់ដោយគ្រូបង្វឹក ៖ ការបំបែកបញ្ហាស្ថាបត្យកម្មក្នុង ១៥ នាទី",
      segment: "ផ្នែកទី ៨ &bull; ការបង្ហាញផ្ទាល់",
      subtitle: "មើលគ្រូបង្វឹកបំប្លែងបញ្ហាសុវត្ថិភាពរោងចក្រ ទៅជា SharePoint Schema, ៣ អេក្រង់, និង Cloud Flow យ៉ាងលឿន។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">ដំណាក់កាល ១ &bull; ៤ នាទី</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">Schema ក្នុង SharePoint</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5;">
              បង្កើតបញ្ជី <code>SafetyHazards</code>។ បន្ថែមជួរឈរ Choice សម្រាប់ Location, Severity, និង Status។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">ដំណាក់កាល ២ &bull; ៤ នាទី</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">តភ្ជាប់ ៣ អេក្រង់</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5;">
              បង្កើតអេក្រង់ Home, Report, Review។ ភ្ជាប់ <code>NewForm()</code> លើប៊ូតុង និង <code>Item = gal.Selected</code> លើ Edit form។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ដំណាក់កាល ៣ &bull; ៣ នាទី</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">ច្រកទ្វារតក្កវិជ្ជា</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5;">
              អនុវត្ត <code>DisplayMode</code> validation លើ Submit និងរៀបចំការឆ្លើយតបតាម <code>OnSuccess</code>។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc;">ដំណាក់កាល ៤ &bull; ៤ នាទី</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">បង្កើត Cloud Flow</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5;">
              បង្កើត Automated flow ២ ជំហានក្នុង Power Automate ហើយបញ្ជូនសំបុត្រតេស្តផ្ទាល់ដើម្បីផ្ទៀងផ្ទាត់ការធ្លាក់អ៊ីមែល។
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការបង្ហាញផ្ទាល់ (១៥ នាទី) ៖</strong> "បង្ហាញដោយស្ងប់ស្ងាត់ និងច្បាស់លាស់។ បង្ហាញថា នៅពេលយើងមានប្លង់មេថ្ងៃទី ២៥ យើងអាចផ្គុំសូហ្វវែរដែលដំណើរការបានក្នុងរយៈពេលប៉ុន្មាននាទីដោយមិនបាច់ទាយ។ បញ្ជូនសំបុត្រតេស្ត ហើយបង្ហាញអ៊ីមែលក្នុង Outlook។"</p>`
    },

    // Slide 18 (Index 17): Guided Learner Practice
    {
      title: "ការអនុវត្តរួមគ្នា ៖ ការរួមគ្នារៀបចំច្រកទទួលព័ត៌មាន &amp; ការផ្ទៀងផ្ទាត់",
      segment: "ផ្នែកទី ៩ &bull; ការអនុវត្តរួមគ្នា",
      subtitle: "ដើរកាត់ចំណុចត្រួតពិនិត្យសំខាន់ៗជាមួយគ្រូបង្វឹក មុនពេលឈានចូលការបង្កើតដោយស្វ័យភាពផ្ទាល់ខ្លួន។",
      content: `<div class="card">
            <h3 class="card-title">📝 បញ្ជីត្រួតពិនិត្យការអនុវត្ត</h3>
            <ol style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.7; padding-left: 1.2rem;">
              <li>ផ្ទៀងផ្ទាត់ថា <code>btnNewHazard.OnSelect</code> ហៅ <code>NewForm(frmNewHazard); Navigate(scr_ReportHazard)</code>។</li>
              <li>ផ្ទៀងផ្ទាត់ថា <code>btnCancel.OnSelect</code> ហៅ <code>ResetForm(frmNewHazard); Back()</code>។</li>
              <li>ផ្ទៀងផ្ទាត់ថា <code>btnSubmit.DisplayMode</code> វាយតម្លៃ <code>IsBlank()</code> លើ Location និង Description។</li>
              <li>ផ្ទៀងផ្ទាត់ថា <code>frmNewHazard.OnSuccess</code> មាន <code>Notify()</code> និង <code>Navigate(scr_HazardHome)</code>។</li>
            </ol>
          </div>

          <div class="card">
            <h3 class="card-title">🔍 សំណួរផ្ទៀងផ្ទាត់ស្ថាបត្យកម្ម</h3>
            <div style="background: rgba(0, 0, 0, 0.35); padding: 0.85rem; border-radius: 6px; font-size: 0.85rem; color: #cbd5e1; line-height: 1.6;">
              &bull; <strong>សំណួរ ១ ៖</strong> បើកម្មករវាយអក្សររួចចុច Cancel ហើយចុច New ម្តងទៀត តើអក្សរចាស់នៅសល់ទេ?<br>
              &bull; <strong>សំណួរ ២ ៖</strong> បើកម្មករចុច Submit ទាំងមិនទាន់រើសទីតាំង តើប៊ូតុងឆ្លើយតបដែរឬទេ?<br>
              &bull; <strong>សំណួរ ៣ ៖</strong> បើថេប្លេតដាច់ WiFi ពេលកំពុងចុច Submit តើមានអ្វីកើតឡើង?
            </div>
            <p style="color: #86efac; font-size: 0.82rem; margin-top: 0.75rem;">
              ប្រសិនបើស្ថាបត្យកម្មរបស់អ្នកឆ្លើយសំណួរទាំង ៣ នេះបានត្រឹមត្រូវ ច្រកទ្វាររបស់អ្នកមានកម្រិតស្តង់ដារសហគ្រាស!
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការណែនាំរួមគ្នា (១០ នាទី) ៖</strong> "ដើរមើល និងធានាថាសិស្សអាចពន្យល់ពីមូលហេតុដែល NewForm() សម្អាតទម្រង់ និងមូលហេតុដែល OnSuccess ផ្តល់នូវភាពស្មោះត្រង់នៃការឆ្លើយតប។"</p>`
    },

    // Slide 19 (Index 18): Independent Capstone Challenge
    {
      title: "កិច្ចការប្រឡងបញ្ចប់ Capstone ឯករាជ្យ ៖ បង្កើត &amp; តេស្តប្រព័ន្ធសុវត្ថិភាព",
      segment: "ផ្នែកទី ១០ &bull; ការប្រឡងស្វ័យភាព",
      subtitle: "២០ នាទី ៖ បង្កើត ៣ អេក្រង់, អនុវត្តវិធានតក្កវិជ្ជា, តភ្ជាប់ Cloud Flow, និងធ្វើតេស្តជាក់ស្តែងពីដើមដល់ចប់។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">វិសាលភាពនៃការប្រឡង</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">លទ្ធផល ៤ យ៉ាងដែលត្រូវបញ្ចប់ដោយខ្លួនឯង ៖</h4>
            <ul style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; padding-left: 1.2rem;">
              <li><strong>លទ្ធផល ១ (UI) ៖</strong> តភ្ជាប់ ៣ អេក្រង់ (<code>scr_HazardHome</code>, <code>scr_ReportHazard</code>, <code>scr_ReviewHazard</code>)។</li>
              <li><strong>លទ្ធផល ២ (Logic) ៖</strong> អនុវត្តការផ្ទៀងផ្ទាត់ <code>DisplayMode</code> លើ Submit; ភ្ជាប់ <code>Item = galHazards.Selected</code> លើទម្រង់ Review។</li>
              <li><strong>លទ្ធផល ៣ (Feedback) ៖</strong> បញ្ជូនសារបៃតង <code>Notify()</code> តាមរយៈ <code>OnSuccess</code>។</li>
              <li><strong>លទ្ធផល ៤ (Cloud Flow) ៖</strong> បង្កើត Flow ២ ជំហានផ្ញើសារដំណឹងទៅកាន់អ៊ីមែលផ្ទាល់ខ្លួនពេលមានជួរថ្មី។</li>
            </ul>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ភស្តុតាងនៃភាពស្ទាត់ជំនាញ</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">លទ្ធផលរំពឹងទុកចុងក្រោយ ៖</h4>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              បញ្ជូនរបាយការណ៍តេស្តផ្ទាល់ ៖ <em>"Line 2 Bay - Oil spill near lathe CNC-04 (High)"</em>។<br><br>
              ក្នុងរយៈពេល ៦០ វិនាទី អ្នកត្រូវតែបង្ហាញគ្រូបង្វឹកនូវ ៖<br>
              ១. ជួររបាយការណ៍ថ្មីបង្ហាញឡើងលើ Gallery នៃអេក្រង់ Home។<br>
              ២. សារអ៊ីមែលស្វ័យប្រវត្តិកំពុងស្ថិតក្នុង Inbox នៃ Outlook របស់អ្នក!
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការសម្របសម្រួលឯករាជ្យ (២០ នាទី) ៖</strong> "ថយក្រោយ។ កុំប៉ះក្តារចុចរបស់ពួកគេ។ ទុកឱ្យពួកគេបង្កើត និងជួបកំហុស។ បើពួកគេទាល់ច្រក សួរថា ៖ 'តើអ្នកកំពុងស្ថិតនៅស្រទាប់ណា នៃម៉ូដែល ៩ ជំហាន?' ជំរុញឱ្យពួកគេគិត មិនមែនចម្លងតាម។"</p>`
    },

    // Slide 20 (Index 19): 3 Fatal Misconceptions Demolished
    {
      title: "ការលុបបំបាត់ការយល់ខុស ៣ យ៉ាងរបស់អ្នកចាប់ផ្តើមដំបូង",
      segment: "ផ្នែកទី ១១ &bull; កែតម្រូវការយល់ដឹង",
      subtitle: "ការជំនួសគំរូគំនិតខុសឆ្គង ដោយវិន័យវិស្វកម្មសហគ្រាសដ៏រឹងមាំ។",
      content: `<div class="card" style="border-top: 3px solid #ef4444;">
            <span class="card-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">ការយល់ខុសទី ១</span>
            <h4 style="color: #f87171; margin: 0.5rem 0;">"ត្រូវមានវីដេអូបង្រៀនសម្រាប់គ្រប់ App"</h4>
            <p style="color: var(--text-muted); font-size: 0.84rem; line-height: 1.5;">
              <strong>ខុស ៖</strong> គិតថាកម្មវិធីសុវត្ថិភាព កម្មវិធីជួសជុល និងកម្មវិធីសុំច្បាប់ខុសគ្នាស្រឡះ។<br><br>
              <strong>ការពិត ៖</strong> កម្មវិធីអាជីវកម្មទាំងអស់ចែករំលែកខ្សែសង្វាក់ ៩ ជំហានដូចគ្នា។ យល់ពីខ្សែសង្វាក់ អ្នកអាចបង្កើតអ្វីក៏បាន!
            </p>
          </div>

          <div class="card" style="border-top: 3px solid #f59e0b;">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">ការយល់ខុសទី ២</span>
            <h4 style="color: #fbbf24; margin: 0.5rem 0;">"សរសេរកូដឡើងវិញពេលមានបញ្ហា"</h4>
            <p style="color: var(--text-muted); font-size: 0.84rem; line-height: 1.5;">
              <strong>ខុស ៖</strong> ទៅកែកូដ Power Fx រញ៉េរញ៉ៃពេលដែលអ៊ីមែលមិនព្រមផ្ញើ។<br><br>
              <strong>ការពិត ៖</strong> បើជួរទិន្នន័យមានក្នុង SharePoint នោះ Power Apps គ្មានកំហុសឡើយ! ការពិនិត្យ ៣ ស្រទាប់ការពារការបំផ្លាញកូដដែលដើរស្រេច។
            </p>
          </div>

          <div class="card" style="border-top: 3px solid #06b6d4;">
            <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">ការយល់ខុសទី ៣</span>
            <h4 style="color: #67e8f9; margin: 0.5rem 0;">"អ្នកអភិវឌ្ឍន៍ទន្ទេញចាំទាំងអស់"</h4>
            <p style="color: var(--text-muted); font-size: 0.84rem; line-height: 1.5;">
              <strong>ខុស ៖</strong> មានអារម្មណ៍អន់ចិត្តដោយសារតែមិនចាំគ្រប់ syntax ឬ arguments។<br><br>
              <strong>ការពិត ៖</strong> ស្ថាបត្យករចងចាំទំនាក់ទំនង និងលំហូរទិន្នន័យ។ របាររូបមន្តជាអ្នកបំពេញ syntax ជំនួសយើង។
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការពិនិត្យការយល់ខុស (៣ នាទី) ៖</strong> "សង្កត់ធ្ងន់លើការយល់ខុសទី ៣។ ប្រាប់សិស្សថាវិស្វករអាជីពបើកមើលឯកសារបច្ចេកទេសរាល់ថ្ងៃ។ អ្វីដែលធ្វើឱ្យអ្នកជាវិស្វករ គឺការដឹងថា *ត្រូវសួរសំណួរអ្វី*។"</p>`
    },

    // Slide 21 (Index 20): Formative Assessment Quiz
    {
      title: "ការត្រួតពិនិត្យចំណេះដឹងប្រព័ន្ធ (Dual-State Inspector)",
      segment: "ផ្នែកទី ១២ &bull; ការវាយតម្លៃចំណេះដឹង",
      subtitle: "សាកល្បងការវែកញែកស្ថាបត្យកម្មរបស់អ្នក។ ចុចលើជម្រើសណាមួយនៅខាងឆ្វេង ដើម្បីពិនិត្យមើលការពន្យល់ហេតុផល។",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;" id="quiz-day27-q-num">សំណួរទី ១ នៃ ៥</span>
                <button class="hud-btn" id="quiz-day27-next-btn" onclick="nextDay27QuizQuestion()" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;">បន្ទាប់ &rarr;</button>
              </div>
              <h3 class="card-title" id="quiz-day27-q-text" style="margin-top: 0.75rem; font-size: 1.15rem; line-height: 1.4;">អត្ថបទសំណួរ</h3>
              <div class="quiz-options" id="quiz-day27-options-container">
                <!-- Dynamically populated by JS renderDay27QuizQuestion() -->
              </div>
            </div>

            <div class="quiz-inspector-card" id="quiz-day27-feedback-box">
              <div class="feedback-placeholder" id="quiz-day27-placeholder">
                <span style="font-size: 2.5rem; color: var(--text-dim); margin-bottom: 0.5rem;">🔍</span>
                <h4 style="color: var(--text-muted);">សូមជ្រើសរើសចម្លើយមួយ</h4>
                <p style="font-size: 0.85rem; color: var(--text-dim); max-width: 280px; margin-top: 0.35rem;">
                  ចុចលើជម្រើសណាមួយនៅខាងឆ្វេង ដើម្បីពិនិត្យមើលហេតុនិងផលនៃស្ថាបត្យកម្ម។
                </p>
              </div>
              <div class="feedback-content" id="quiz-day27-feedback-content" style="display: none; flex-direction: column;">
                <span class="card-badge" id="quiz-day27-feedback-badge" style="margin-bottom: 0.5rem;">លទ្ធផល</span>
                <h4 id="quiz-day27-feedback-status" style="margin-bottom: 0.5rem; font-size: 1.1rem;">ស្ថានភាព</h4>
                <p id="quiz-day27-feedback-text" style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.6;">ការពន្យល់លម្អិត</p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការសម្របសម្រួលសំណួរ (៤ នាទី) ៖</strong> "អានសំណួរឱ្យឮៗ។ ឱ្យសិស្សពន្យល់ពីមូលហេតុដែលពួកគេជ្រើសរើសចម្លើយនោះ មុនពេលចុច។ ផ្តោតជាពិសេសលើសំណួរទី ៤ អំពីវិន័យដោះស្រាយបញ្ហា។"</p>`
    },

    // Slide 22 (Index 21): Capstone Graduation Rubric
    {
      title: "រូបប៊្រិកវាយតម្លៃបញ្ចប់ការសិក្សា ៖ ការវាស់វែងភាពឯករាជ្យពិតប្រាកដ",
      segment: "ផ្នែកទី ១៣ &bull; រូបប៊្រិកវាយតម្លៃ",
      subtitle: "តើអ្នកស្ថិតនៅត្រង់ណាក្នុងកម្រិតវិស្វកម្ម? ការវាយតម្លៃសមត្ថភាពស្ថាបត្យកម្មរបស់អ្នក។",
      content: `<div class="card">
            <table class="rubric-table">
              <thead>
                <tr>
                  <th>វិមាត្រ</th>
                  <th>កម្រិត ១ ៖ អ្នកទន្ទេញតាមវីដេអូ (Novice)</th>
                  <th>កម្រិត ២ ៖ អ្នកអភិវឌ្ឍន៍មានសមត្ថភាព (Competent)</th>
                  <th>កម្រិត ៣ ៖ ស្ថាបត្យករដំណោះស្រាយជាន់ខ្ពស់ (Master)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>ការរៀបចំម៉ូដែលប្រព័ន្ធ</strong></td>
                  <td>ស្មានឈ្មោះជួរឈរក្នុង Power Apps; បង្កើតអេក្រង់មុនពេលរៀបចំទិន្នន័យ។</td>
                  <td>បកប្រែដំណើរការមនុស្សទៅជា SharePoint Schema មុនពេលប៉ះ UI។</td>
                  <td>រៀបចំជួរឈរត្រឹមត្រូវ បង្កើតជម្រើស Choice ច្បាស់លាស់ និងគូរផែនទីមនុស្សពេញលេញ។</td>
                </tr>
                <tr>
                  <td><strong>ការតភ្ជាប់ UI &amp; លំហូរ</strong></td>
                  <td>ប៊ូតុងដើរទាល់ច្រក; ភ្លេច <code>NewForm()</code>; ទិន្នន័យចាស់នៅសល់ពេល Cancel។</td>
                  <td>លំហូរ ៣ អេក្រង់ដំណើរការជាមួយ <code>NewForm()</code>, <code>SubmitForm()</code>, និង <code>Back()</code>។</td>
                  <td>បទពិសោធន៍ UX ឥតខ្ចោះ។ <code>OnSuccess</code> ត្រឡប់ទៅ Home; Responsive; គ្មានទិន្នន័យធ្លាយ។</td>
                </tr>
                <tr>
                  <td><strong>តក្កវិជ្ជា &amp; ការផ្ទៀងផ្ទាត់</strong></td>
                  <td>ទុកឱ្យប៊ូតុង Submit ចុចកើតទោះបីជាទិន្នន័យចាំបាច់នៅទទេ។</td>
                  <td>ប្រើប្រាស់ <code>If(IsBlank(...))</code> ដើម្បីចាក់សោប៊ូតុង Submit ត្រឹមត្រូវ។</td>
                  <td>ការផ្ទៀងផ្ទាត់ច្រើនលក្ខខណ្ឌ; ស្លាកពណ៌តាមអាទិភាព; ភ្ជាប់ <code>gal.Selected</code> យ៉ាងរលូន។</td>
                </tr>
                <tr>
                  <td><strong>ស្វ័យប្រវត្តិកម្ម &amp; ការដោះស្រាយបញ្ហា</strong></td>
                  <td>សរសេរកូដផ្ញើអ៊ីមែលក្នុងប៊ូតុង App; ស្លន់ស្លោពេលអ៊ីមែលមិនធ្លាក់ចូល។</td>
                  <td>បង្កើត Cloud Flow ២ ជំហាន; វិភាគដឹងរវាង Tier A និង Tier B ក្នុងការដោះស្រាយបញ្ហា។</td>
                  <td>ស្ថាបត្យកម្ម Cloud ដាច់ដោយឡែក; ប្រើ Dynamic Tokens; ពន្យល់ហេតុផល ៣ ស្រទាប់យ៉ាងច្បាស់។</td>
                </tr>
              </tbody>
            </table>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការវាយតម្លៃរូបប៊្រិក (២ នាទី) ៖</strong> "បង្ហាញសិស្សថា តាមរយៈការបញ្ចប់ការប្រឡងថ្ងៃនេះ ពួកគេបានសម្រេចកម្រិតទី ២ (មានសមត្ថភាពពេញលេញ) និងបានបង្ហាញនូវចរិតលក្ខណៈកម្រិតទី ៣ ក្នុងការដោះស្រាយបញ្ហា និងស្ថាបត្យកម្ម Cloud!"</p>`
    },

    // Slide 23 (Index 22): 15-Minute Capstone Reflection
    {
      title: "ការឆ្លុះបញ្ចាំង ១៥ នាទី &amp; ប្លង់មេផលប័ត្រអាជីព (Portfolio)",
      segment: "ផ្នែកទី ១៤ &bull; ការឆ្លុះបញ្ចាំង និងផលប័ត្រ",
      subtitle: "របៀបចងក្រងប្រព័ន្ធ Capstone ថ្ងៃនេះ ទៅជាឯកសារបង្ហាញសមត្ថភាពដល់ថ្នាក់ដឹកនាំ និងនិយោជក។",
      content: `<div class="card">
            <h3 class="card-title">📁 ប្លង់មេឯកសារផលប័ត្រ (Portfolio)</h3>
            <div style="display: flex; flex-direction: column; gap: 0.65rem; font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
              <div><strong>១. ការកំណត់បញ្ហា (Problem Statement) ៖</strong> កត់ត្រាការឈឺចាប់ដើម (ក្រដាសកត់ត្រាគ្រោះថ្នាក់, របាយការណ៍បាត់, ហានិភ័យច្បាប់)។</div>
              <div><strong>២. ដ្យាក្រាមស្ថាបត្យកម្ម (Architecture Diagram) ៖</strong> ភ្ជាប់ដ្យាក្រាមខ្សែសង្វាក់ហេតុនិងផល ៩ ជំហានរបស់អ្នក។</div>
              <div><strong>៣. វចនានុក្រមទិន្នន័យ (Data Dictionary) ៖</strong> បញ្ជាក់ឈ្មោះជួរឈរ SharePoint, ប្រភេទទិន្នន័យ, និងតម្លៃ Choice។</div>
              <div><strong>៤. វិធាន Power Fx ៖</strong> បង្ហាញការផ្ទៀងផ្ទាត់ <code>DisplayMode</code> និងការភ្ជាប់ទិន្នន័យ Gallery។</div>
              <div><strong>៥. Cloud Flow ៖</strong> រូបថតអេក្រង់នៃ Power Automate Flow ២ ជំហាន និងសារអ៊ីមែលលទ្ធផល។</div>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">💼 ការណែនាំខ្លួន ៣០ វិនាទីក្នុងការសម្ភាសន៍</h3>
            <p style="color: #cbd5e1; font-size: 0.88rem; line-height: 1.6; font-style: italic;">
              "ខ្ញុំមិនមែនគ្រាន់តែបង្កើតអេក្រង់ក្នុង Power Apps នោះទេ។ ខ្ញុំរចនាប្រព័ន្ធឌីជីថលពីដើមដល់ចប់។ ជាក់ស្តែង ខ្ញុំបានបង្កើតប្រព័ន្ធតាមដានគ្រោះថ្នាក់ការងារដែលតភ្ជាប់ ៣ អេក្រង់លើទូរស័ព្ទ, មូលដ្ឋានទិន្នន័យ SharePoint លើ Cloud, និងលំហូរ Power Automate ផ្ញើសារអាសន្នទៅកាន់មេការក្នុងពេលតែប៉ុន្មានវិនាទី ព្រមទាំងមានវិន័យដោះស្រាយបញ្ហា ៣ កម្រិតយ៉ាងច្បាស់លាស់។"
            </p>
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(16, 185, 129, 0.1); border-radius: 6px; font-size: 0.82rem; color: #86efac;">
              ✓ បង្ហាញតម្លៃអាជីវកម្ម &nbsp;&bull;&nbsp; ✓ បង្ហាញការគិតស្ថាបត្យកម្ម &nbsp;&bull;&nbsp; ✓ បង្ហាញជំនាញស្វ័យប្រវត្តិកម្ម
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការបង្ហាញខ្លួនអាជីព (២ នាទី) ៖</strong> "បង្រៀនសិស្សពីរបៀបនិយាយអំពីស្នាដៃរបស់ពួកគេ។ អ្នកគ្រប់គ្រងមិនខ្វល់ពីរឿងពណ៌ប៊ូតុងទេ; ពួកគេខ្វល់ពីរឿងកាត់បន្ថយហានិភ័យ ការទំនាក់ទំនងលឿន និងសូហ្វវែរដែលមិនងាយខូច។"</p>`
    },

    // Slide 24 (Index 23): Graduation Celebration & The Journey Ahead
    {
      title: "ការបញ្ចប់ការសិក្សាជាផ្លូវការ ៖ អ្នកគឺជាស្ថាបត្យករ Power Platform!",
      segment: "ផ្នែកទី ១៥ &bull; ពិធីបញ្ចប់ការសិក្សា",
      subtitle: "ក្រឡេកមើលការរីកចម្រើនឥតឈប់ឈររយៈពេល ២៧ ថ្ងៃ និងការបោះជំហានឆ្ពោះទៅកាន់អាជីពជា Citizen Developer ដ៏ជឿជាក់។",
      content: `<div class="card" style="border-left: 3px solid #10b981;">
            <h3 class="card-title" style="color: #86efac;">🎓 វិញ្ញាបនបត្រនៃការបញ្ចប់ការសិក្សា</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              អ្នកបានបញ្ចប់ទាំងស្រុងនូវកម្មវិធីសិក្សា ២៧ ថ្ងៃនៃ <strong>Microsoft Power Apps Foundation Program</strong> ៖
            </p>
            <div style="margin-top: 0.75rem; padding: 0.75rem; background: rgba(16, 185, 129, 0.1); border-radius: 6px; font-family: var(--font-code); font-size: 0.82rem; color: #86efac;">
              បញ្ហា ➔ ដំណើរការ ➔ ទិន្នន័យ ➔ អេក្រង់ ➔ តក្កវិជ្ជា ➔ សកម្មភាព ➔ ផ្ទុក ➔ Flow ➔ តេស្ត ➔ ពន្យល់ហេតុផល!
            </div>
            <p style="color: var(--text-muted); font-size: 0.84rem; line-height: 1.5; margin-top: 0.75rem;">
              អ្នកមានផ្នត់គំនិតវិស្វកម្មដ៏រឹងមាំ។ អ្នកមានសមត្ថភាពផ្លាស់ប្តូរសន្លឹក Excel រញ៉េរញ៉ៃ ក្រដាសកត់ត្រា និងអ៊ីមែលយឺតយ៉ាវ ឱ្យទៅជាសូហ្វវែរសហគ្រាសដ៏រលូន។
            </p>
          </div>

          <div class="card" style="border-left: 3px solid #f59e0b;">
            <h3 class="card-title" style="color: #fcd34d;">🚀 ដំណើរឆ្ពោះទៅមុខរបស់អ្នក</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              តើអ្នកត្រូវបន្តទៅណាបន្ទាប់ពីថ្ងៃនេះ?
            </p>
            <ul style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.6; padding-left: 1.2rem; margin-top: 0.5rem;">
              <li><strong>ក្នុងកន្លែងធ្វើការរបស់អ្នក ៖</strong> រកមើលក្រដាសកត់ត្រា ឬ Excel ពិបាកប្រើ ១ រួចបង្កើតដំណោះស្រាយ ៣ អេក្រង់។</li>
              <li><strong>Power Automate កម្រិតខ្ពស់ ៖</strong> ប្រព័ន្ធអនុម័ត (Approvals), លក្ខខណ្ឌបែកខ្នែងច្រើន, និង Scheduled Flows។</li>
              <li><strong>UI/UX កម្រិតខ្ពស់ ៖</strong> បណ្ណាល័យ Component, Responsive Containers, និង Dark-Mode។</li>
            </ul>
            <p style="color: #fcd34d; font-size: 0.88rem; font-weight: bold; margin-top: 0.75rem;">
              សូមអបអរសាទរដល់និស្សិតជ័យលាភី! ចូរចេញទៅបង្កើតសូហ្វវែរដែលមានប្រយោជន៍ដល់ពិភពលោក!
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>សុន្ទរកថាបញ្ចប់ការសិក្សា (៣ នាទី) ៖</strong> "ថ្លែងសារអបអរសាទរចេញពីបេះដូង។ កោតសរសើរការតស៊ូ ភាពចង់ចេះចង់ដឹង និងការផ្លាស់ប្តូររបស់ពួកគេពីសិស្សដែលមិនធ្លាប់ស្គាល់កូដនៅថ្ងៃទី ១ មកជាស្ថាបត្យករដំណោះស្រាយឯករាជ្យនៅថ្ងៃទី ២៧។ នាំសិស្សទះដៃអបអរសាទររួមគ្នា!"</p>`
    }
  ];

  // --------------------------------------------------------------------------
  // 2. ENGLISH SPEAKER NOTES (24 SLIDES)
  // --------------------------------------------------------------------------
  const ENGLISH_NOTES = {
    0: "<h4>TRAINER SPEAKING NOTES:</h4><p><strong>Opening Hook (2 min):</strong> 'Welcome to Day 27—our Graduation Day! For 26 days, you built technical muscle. You learned controls, formulas, SharePoint lists, galleries, forms, architectures, and automated flows. Today is not about following instructions. Today is your official driving test. Today, you take the wheel.'</p><p><strong>The Core Connection:</strong> Walk across the mental model chain. Emphasize that anyone can copy a recipe, but a Master Chef understands why heat and salt change ingredients. Today you prove that you understand why software works.</p>",
    1: "<h4>AGENDA OVERVIEW:</h4><p>Notice our agenda. Today, the trainer does less talking and the learner does more building and explaining. The goal is complete autonomy: you will design, build, test, and defend your architecture.</p>",
    2: "<h4>JOURNEY SYNTHESIS:</h4><p>Look back at where you started on Day 1. You didn't know what a variable was or what Boolean logic meant. Today you are designing multi-screen cloud database systems with automated background workflows. Stand tall!</p>",
    3: "<h4>ACTIVE RETRIEVAL:</h4><p>Ask 3 students to answer each question before flipping. Listen for key phrases: 'Never touch app code if row exists', 'Item binds to Selected', and 'Truth in feedback'. These are the hallmarks of a true architect.</p>",
    4: "<h4>STORYTELLING & EMOTION:</h4><p>Explain that this isn't fiction—it happens every single day in corporate IT. People copy formulas from ChatGPT or YouTube without knowing what they do. Today, you prove you are an engineer who understands causality.</p>",
    5: "<h4>PLAIN-LANGUAGE DEMYSTIFICATION:</h4><p>Notice how each term is rooted in ordinary workplace reality. When you explain your app to a manager, speak plain language: 'We decoupled the notification so mobile disconnects never lose alerts.'</p>",
    6: "<h4>REAL-WORLD ANALOGY:</h4><p>Ask the learner: 'When you take a driving test, does the examiner give you a GPS to follow?' No! They tell you to turn left, park, and brake safely. Today is your driving test for Power Platform.</p>",
    7: "<h4>CAPSTONE SCENARIO SETUP:</h4><p>Notice this is a brand-new scenario. It's not equipment maintenance—it's environmental health and safety. But the architecture is identical! That is the power of transfer.</p>",
    8: "<h4>ECOSYSTEM CAUSALITY:</h4><p>Have the student recite this chain. If a button fails, what layer is it? Layer 5. If an email fails, what layer is it? Layer 6. Every problem has an exact address.</p>",
    9: "<h4>HUMAN PROCESS MAPPING:</h4><p>Ask the learner: 'Who are the human personas in this process?' There are two: The Shop-Floor Operator and the EHS Officer. Your app must serve both without confusion.</p>",
    10: "<h4>DATA SCHEMA DISCIPLINE:</h4><p>Emphasize why Location and Severity are Choice columns, not free-text. If someone types 'cnc area' and another types 'CNC Area 1', our filters will fail. Choice columns guarantee data consistency.</p>",
    11: "<h4>THE 3-SCREEN DISCIPLINE:</h4><p>Remind the learner: We do not invent 10 screens. 95% of business applications operate perfectly on these exact 3 screens. Master this pattern and you can build anything.</p>",
    12: "<h4>LOGIC & DECISION RULES:</h4><p>Ask the learner: 'What is the question being asked in the submit button?' The question is: Is the location empty, or is the description empty? If yes, disable the button. Plain English first!</p>",
    13: "<h4>CLOUD AUTOMATION EXTENSION:</h4><p>Highlight why in-app email buttons are fragile. If a worker drops their phone or walks into a dead zone, the email dies. Cloud flows guarantee 100% notification reliability once the row is stored.</p>",
    14: "<h4>SYSTEMATIC TROUBLESHOOTING:</h4><p>Drill this into the student: 'If the row exists in SharePoint, do you touch your Power Apps code?' NEVER! Doing so only breaks working software. Move calmly to Tier B.</p>",
    15: "<h4>SIMULATOR EXPLORATION:</h4><p>Click tabs 1 through 7. Ask the student: 'Where does Power Apps end and SharePoint begin? Where does SharePoint end and Power Automate begin?' Verify they understand the exact hand-off boundaries.</p>",
    16: "<h4>LIVE DEMO SCRIPT:</h4><p>Demonstrate calmly and deliberately. Show that by having the Day 25 architectural blueprint, you assemble working software in minutes without trial and error. Submit a test hazard and show the email in Outlook.</p>",
    17: "<h4>GUIDED COACHING:</h4><p>Walk the room and ensure the student can explain why NewForm() clears the form and why OnSuccess provides truth in feedback.</p>",
    18: "<h4>INDEPENDENT FACILITATION:</h4><p>Step back. Do not touch their keyboard. Let them build and make mistakes. If they get stuck, ask: 'Which layer of the 9-step model are you working on?' Prompt them to think, not copy.</p>",
    19: "<h4>MYTH REVIEW:</h4><p>Reinforce Myth 3. Reassure the learner that professional engineers consult documentation every day. What makes you an engineer is knowing what question to ask.</p>",
    20: "<h4>QUIZ FACILITATION:</h4><p>Read the questions aloud. Have the learner explain WHY they picked an answer before clicking. Highlight Question 4 on troubleshooting discipline.</p>",
    21: "<h4>RUBRIC REVIEW:</h4><p>Show the learner that by completing today's challenge, they have achieved Level 2 (Competent) and demonstrated Level 3 traits in troubleshooting and decoupling!</p>",
    22: "<h4>PROFESSIONAL PITCH:</h4><p>Teach the learner how to talk about their work. Managers don't care about button colors; they care about reduced risk, faster communication, and reliable software.</p>",
    23: "<h4>GRADUATION CELEBRATION:</h4><p>Deliver a heartfelt graduation message. Commend their persistence, curiosity, and transformation from Day 1 absolute beginner to Day 27 independent solution architect. Lead a round of applause!</p>"
  };

  // --------------------------------------------------------------------------
  // 3. INTERACTIVE 7-STAGE CAPSTONE SIMULATOR DATA (ENGLISH & KHMER)
  // --------------------------------------------------------------------------
  const DAY27_SIM_DATA = {
    1: {
      step: "Stage 1: Physical Hazard Spot",
      badge: "Real-World Pain",
      title: "Worker Spots Oil Spill on CNC Lathe Aisle",
      content: "Operator notices slippery cutting fluid pooling around CNC Lathe #04 in Line 2 Bay. Physical slip and fall hazard threatens shift safety.",
      output: "Operational Trigger: Worker walks to mounted workstation tablet to log incident in under 30 seconds."
    },
    2: {
      step: "Stage 2: Clean Tablet Intake",
      badge: "Intake Gate",
      title: "scr_ReportHazard Opens in FormMode.New",
      content: "Worker taps <code>+ Report Hazard</code>. Form initializes in New mode with clean slate. Selects Location: 'Line 2 Bay', Severity: 'High', types: 'Coolant leak pooling on floor'.",
      output: "Form State: <code>frmNewHazard.Mode = FormMode.New</code> ready for fresh database row insertion."
    },
    3: {
      step: "Stage 3: Gatekeeper Validation",
      badge: "Power Fx Logic",
      title: "Locking Action Until Data is Complete",
      content: "Submit button evaluates <code>IsBlank(Location) Or IsBlank(Description)</code>. The instant both are provided, the condition turns False, unlocking Submit into Edit mode!",
      output: "Rule Active: <code>btnSubmitHazard.DisplayMode = If(IsBlank(...) Or IsBlank(...), Disabled, Edit)</code>"
    },
    4: {
      step: "Stage 4: SharePoint Cloud Write",
      badge: "Storage Confirmation",
      title: "SubmitForm & OnSuccess Feedback",
      content: "Worker taps Submit. Form executes HTTP POST. SharePoint list <code>SafetyHazards</code> creates row #HAZ-204. <code>OnSuccess</code> displays green notification and routes worker back to Home.",
      output: "Storage Written: Row #HAZ-204 saved with Title, Location, Severity, Status='New', CreatedBy, Date."
    },
    5: {
      step: "Stage 5: Decoupled Flow Trigger",
      badge: "Power Automate",
      title: "Trigger: When an item is created",
      content: "Deep in the Microsoft Cloud, Power Automate's 24/7 listener detects new item #HAZ-204 in SharePoint list SafetyHazards. Flow wakes up on the server completely independent of the tablet!",
      output: "Trigger Fired: Cloud server extracts dynamic tokens for Severity, Location, Description, and Author."
    },
    6: {
      step: "Stage 6: Instant Supervisor Notification",
      badge: "Outlook Action",
      title: "Action: Send an email (V2)",
      content: "Flow formats high-priority alert email: '🚨 HIGH Severity Hazard: Oil spill near lathe CNC-04 at Line 2 Bay' and delivers it to Safety Officer Sokha's inbox in 40 seconds.",
      output: "Action Completed: High-importance alert dispatched to EHS_Director@apexprecision.com."
    },
    7: {
      step: "Stage 7: EHS Resolution Desk",
      badge: "Resolution & Audit",
      title: "Review & Status Update via gal.Selected",
      content: "Safety Officer opens app, taps hazard #HAZ-204 in Gallery. <code>scr_ReviewHazard</code> loads in Edit mode bound to <code>Item = galHazards.Selected</code>. Officer inspects cleanup, updates Status to 'Mitigated', logs $45 absorbent cost, and saves!",
      output: "System Closed-Loop: Existing record #HAZ-204 updated without creating duplicate entries!"
    }
  };

  const DAY27_SIM_DATA_KH = {
    1: {
      step: "ដំណាក់កាលទី ១ ៖ ការប្រទះឃើញគ្រោះថ្នាក់",
      badge: "ការឈឺចាប់ជាក់ស្តែង",
      title: "កម្មករឃើញប្រេងហៀរលើផ្លូវដើរម៉ាស៊ីនក្រឡឹង CNC",
      content: "កម្មករប្រទះឃើញប្រេងត្រជាក់ហៀរពេញផ្លូវដើរក្បែរម៉ាស៊ីនក្រឡឹង CNC-04 ក្នុង Line 2 Bay ដែលអាចបណ្តាលឱ្យរអិលដួលគ្រោះថ្នាក់។",
      output: "ព្រឹត្តិការណ៍ចាប់ផ្តើម ៖ កម្មករដើរទៅកាន់ថេប្លេតក្បែរម៉ាស៊ីន ដើម្បីកត់ត្រាក្នុងពេលក្រោម ៣០ វិនាទី។"
    },
    2: {
      step: "ដំណាក់កាលទី ២ ៖ ច្រកទទួលព័ត៌មានស្អាត",
      badge: "ច្រកទទួលព័ត៌មាន",
      title: "scr_ReportHazard បើកឡើងក្នុង FormMode.New",
      content: "កម្មករចុច <code>+ Report Hazard</code>។ ទម្រង់បែបបទបើកឡើងជាមួយផ្ទាំងទទេស្អាត។ ជ្រើសរើសទីតាំង ៖ 'Line 2 Bay', អាទិភាព ៖ 'High', វាយ ៖ 'ប្រេងត្រជាក់ហៀរលើកម្រាល'។",
      output: "ស្ថានភាព Form ៖ <code>frmNewHazard.Mode = FormMode.New</code> ត្រៀមបង្កើតជួរទិន្នន័យថ្មីក្នុង Cloud។"
    },
    3: {
      step: "ដំណាក់កាលទី ៣ ៖ ច្រកទ្វារផ្ទៀងផ្ទាត់សុវត្ថិភាព",
      badge: "តក្កវិជ្ជា Power Fx",
      title: "ការចាក់សោសកម្មភាពរហូតដល់ទិន្នន័យពេញលេញ",
      content: "ប៊ូតុង Submit វាយតម្លៃ <code>IsBlank(Location) Or IsBlank(Description)</code>។ ពេលដែលវាលទាំងពីរត្រូវបានបំពេញ លក្ខខណ្ឌប្រែជា False ដោះសោប៊ូតុងឱ្យចុចបានភ្លាម!",
      output: "វិធានសកម្ម ៖ <code>btnSubmitHazard.DisplayMode = If(IsBlank(...) Or IsBlank(...), Disabled, Edit)</code>"
    },
    4: {
      step: "ដំណាក់កាលទី ៤ ៖ ការសរសេរចូល SharePoint Cloud",
      badge: "ការបញ្ជាក់ការផ្ទុក",
      title: "SubmitForm &amp; សារឆ្លើយតប OnSuccess",
      content: "កម្មករចុច Submit។ Form បញ្ជូន HTTP POST ទៅកាន់ SharePoint។ ជួរលេខ #HAZ-204 ត្រូវបានបង្កើត។ <code>OnSuccess</code> បង្ហាញបន្ទះបៃតងបញ្ជាក់ និងបញ្ជូនកម្មករត្រឡប់ទៅ Home វិញ។",
      output: "ទិន្នន័យបានកត់ត្រា ៖ ជួរ #HAZ-204 រក្សាទុកដោយជោគជ័យជាមួយ Title, Location, Severity, Status, CreatedBy។"
    },
    5: {
      step: "ដំណាក់កាលទី ៥ ៖ ផ្កាភ្លើងដាស់ Flow (Trigger)",
      badge: "Power Automate",
      title: "Trigger ៖ When an item is created",
      content: "ជ្រៅក្នុង Microsoft Cloud ប្រព័ន្ធស្តាប់ ២៤/៧ របស់ Power Automate រកឃើញជួរថ្មី #HAZ-204 ក្នុងបញ្ជី SharePoint SafetyHazards។ Flow ដាស់ខ្លួនភ្លាមៗលើ Server ដោយមិនខ្វល់ពីថេប្លេតឡើយ!",
      output: "Trigger ដំណើរការ ៖ Cloud Server ទាញយកស្លាកទិន្នន័យសម្រាប់ Severity, Location, Description, និង CreatedBy។"
    },
    6: {
      step: "ដំណាក់កាលទី ៦ ៖ សារជូនដំណឹងបន្ទាន់ទៅកាន់មេការ",
      badge: "សកម្មភាព Outlook",
      title: "Action ៖ Send an email (V2)",
      content: "Flow រៀបចំសារអ៊ីមែលអាទិភាពខ្ពស់ ៖ '🚨 គ្រោះថ្នាក់កម្រិត HIGH ៖ ប្រេងហៀរក្បែរម៉ាស៊ីន CNC-04 នៅ Line 2 Bay' ហើយបញ្ជូនទៅកាន់ Outlook របស់ប្រធានសុវត្ថិភាពសុខាក្នុងពេល ៤០ វិនាទី។",
      output: "សកម្មភាពជោគជ័យ ៖ អ៊ីមែលអាទិភាពខ្ពស់ត្រូវបានបញ្ជូនទៅកាន់ EHS_Director@apexprecision.com។"
    },
    7: {
      step: "ដំណាក់កាលទី ៧ ៖ តុការងារដោះស្រាយសុវត្ថិភាព",
      badge: "ការដោះស្រាយ &amp; សវនកម្ម",
      title: "ត្រួតពិនិត្យ &amp; កែប្រែស្ថានភាពតាមរយៈ gal.Selected",
      content: "មន្ត្រីសុវត្ថិភាពបើក App ចុចសំបុត្រ #HAZ-204 ក្នុង Gallery។ <code>scr_ReviewHazard</code> បើកឡើងក្នុង Edit mode ភ្ជាប់ជាមួយ <code>Item = galHazards.Selected</code>។ មន្ត្រីពិនិត្យការសម្អាត កែជា 'Mitigated' កត់ត្រាថ្លៃសម្អាត $45 រួចចុច Save!",
      output: "ប្រព័ន្ធបិទវដ្តការងារ ៖ ជួរចាស់ #HAZ-204 ត្រូវបានធ្វើបច្ចុប្បន្នភាពដោយមិនបង្កើតជួរស្ទួនឡើយ!"
    }
  };

  // --------------------------------------------------------------------------
  // 4. FORMATIVE ASSESSMENT QUIZ DATA (ENGLISH & KHMER)
  // --------------------------------------------------------------------------
  const QUIZ_QUESTIONS = [
    {
      question: "Why is it impossible to write a correct Power Fx formula before establishing the SharePoint data schema?",
      options: [
        "Because Microsoft Power Apps will display an unclosable error popup.",
        "Because Power Fx logic evaluates data inside named containers; if columns do not exist or have the wrong data types (e.g. Text instead of Choice), formulas like Filter(), comparisons, and Sum() cannot function.",
        "Because SharePoint only connects to computers on weekends.",
        "Because Power Automate requires you to write formulas in HTML."
      ],
      correct: 1,
      explanation: "Correct! Data dictates what logic is possible. Without typed columns (Choice, Number, Date), formulas have no defined structure to evaluate."
    },
    {
      question: "What happens if a developer puts a SendEmail() formula inside a mobile Submit button instead of using a decoupled Power Automate flow?",
      options: [
        "The phone battery will instantly drain to zero.",
        "If the worker minimizes the app, locks the tablet, or walks into a concrete stairwell with no signal right after tapping submit, the email will fail to dispatch. A cloud flow runs 24/7 on Microsoft servers independently.",
        "The SharePoint list will automatically delete all prior records.",
        "The Submit button will change color to yellow permanently."
      ],
      correct: 1,
      explanation: "Correct! In-app email execution depends on device state and local network. A decoupled cloud flow triggers 24/7 on server storage independently."
    },
    {
      question: "Why does frmReviewHazard.Item = galHazards.Selected eliminate the need for a separate database 'Lookup' query?",
      options: [
        "Because the Gallery has already queried and loaded active records into device memory; 'Selected' points directly to that in-memory record, giving instantaneous performance with zero extra server calls.",
        "Because SharePoint forbids lookup queries on weekdays.",
        "Because Power Fx does not support database queries.",
        "Because Edit forms can only display records if typed manually."
      ],
      correct: 0,
      explanation: "Correct! The Gallery already holds the records in client memory. Passing .Selected gives instant response times and zero server latency."
    },
    {
      question: "A worker submitted a Critical hazard report. The SharePoint list shows row #HAZ-204, but no email arrived. Which tier has the defect, and what must you NEVER do?",
      options: [
        "Immediately delete the Power Apps Submit button and rewrite all screen formulas.",
        "The defect is in Tier B (Flow Trigger) or Tier C (Email Action). You must NEVER modify Power Apps code because the row in SharePoint proves the app executed 100% perfectly!",
        "Restart the factory electrical transformer.",
        "Delete the SharePoint list and start over."
      ],
      correct: 1,
      explanation: "Correct! The presence of the row in SharePoint proves Tier A passed! Power Apps is 100% innocent. Modifying working app code will only break functional software."
    },
    {
      question: "What is the fundamental difference between an independent Citizen Developer and someone who only memorized YouTube tutorial clicks?",
      options: [
        "The Citizen Developer memorized 5,000 Power Fx formulas.",
        "The tutorial follower is fragile: when a scenario shifts by 5%, memorized steps break. The independent Citizen Developer understands the 9-step causality chain (Problem -> Process -> Data -> UI -> Logic -> Storage -> Flow -> Test -> Explain) and can architect solutions to any business problem from first principles.",
        "The tutorial follower uses a mouse, while the Citizen Developer only uses a keyboard.",
        "There is no difference; they are identical."
      ],
      correct: 1,
      explanation: "Correct! True mastery is understanding causality and connections. An architect knows WHY each layer exists and can solve brand-new business problems systematically."
    }
  ];

  const QUIZ_QUESTIONS_KH = [
    {
      question: "ហេតុអ្វីបានជាយើងមិនអាចសរសេររូបមន្ត Power Fx ឱ្យបានត្រឹមត្រូវ មុនពេលបង្កើតទម្រង់ទិន្នន័យ (Data Schema) ក្នុង SharePoint?",
      options: [
        "ដោយសារតែ Power Apps នឹងបង្ហាញផ្ទាំង Error ដែលមិនអាចបិទបាន។",
        "ដោយសារតែតក្កវិជ្ជា Power Fx វាយតម្លៃទិន្នន័យក្នុងធុងផ្ទុកដែលមានឈ្មោះច្បាស់លាស់; បើជួរឈរមិនទាន់មាន ឬកំណត់ប្រភេទខុស (ឧ. Text ជំនួស Choice) នោះរូបមន្ត Filter(), ការប្រៀបធៀប និង Sum() មិនអាចដំណើរការបានឡើយ។",
        "ដោយសារតែ SharePoint អនុញ្ញាតឱ្យតភ្ជាប់តែកុំព្យូទ័រនៅថ្ងៃចុងសប្តាហ៍ប៉ុណ្ណោះ។",
        "ដោយសារតែ Power Automate តម្រូវឱ្យសរសេររូបមន្តជាកូដ HTML។"
      ],
      correct: 1,
      explanation: "ត្រឹមត្រូវហើយ! ទិន្នន័យជាអ្នកកំណត់ថាតើតក្កវិជ្ជាអ្វីខ្លះដែលអាចដំណើរការបាន។ បើគ្មានជួរឈរកំណត់ប្រភេទច្បាស់លាស់ (Choice, Number, Date) រូបមន្តគ្មានទិន្នន័យសម្រាប់វាយតម្លៃឡើយ។"
    },
    {
      question: "តើមានអ្វីកើតឡើង ប្រសិនបើអ្នកអភិវឌ្ឍន៍ដាក់កូដ SendEmail() ក្នុងប៊ូតុង Submit លើទូរស័ព្ទ ជំនួសឱ្យការប្រើប្រាស់ Cloud Flow ក្នុង Power Automate?",
      options: [
        "ថ្មទូរស័ព្ទនឹងអស់ភ្លាមៗធ្លាក់ដល់សូន្យភាគរយ។",
        "ប្រសិនបើកម្មករបង្រួម App, ចាក់សោថេប្លេត ឬដើរចូលកន្លែងដាច់សេវាភ្លាមៗក្រោយចុច Submit សារអ៊ីមែលនឹងបរាជ័យក្នុងការផ្ញើចេញ។ Cloud Flow ដំណើរការ ២៤/៧ លើ Server ដោយឯករាជ្យ។",
        "បញ្ជី SharePoint នឹងលុបកំណត់ត្រាចាស់ៗទាំងអស់ចោលដោយស្វ័យប្រវត្តិ។",
        "ប៊ូតុង Submit នឹងប្រែជាពណ៌លឿងជាអចិន្ត្រៃយ៍។"
      ],
      correct: 1,
      explanation: "ត្រឹមត្រូវហើយ! ការផ្ញើអ៊ីមែលក្នុង App ពឹងផ្អែកលើស្ថានភាពទូរស័ព្ទ និងសេវាអ៊ីនធឺណិត។ ចំណែក Cloud Flow ដំណើរការ ២៤/៧ លើ Server ដាច់ដោយឡែកពីឧបករណ៍អ្នកប្រើ។"
    },
    {
      question: "ហេតុអ្វីបានជា frmReviewHazard.Item = galHazards.Selected លុបបំបាត់តម្រូវការក្នុងការសរសេរសំណួរ 'Lookup' ទៅកាន់ Database ម្តងទៀត?",
      options: [
        "ដោយសារតែ Gallery បានទាញទិន្នន័យសកម្មទាំងអស់មកទុកក្នុង Memory របស់ឧបករណ៍រួចស្រេចហើយ; .Selected ចង្អុលចំទិន្នន័យក្នុង Memory នោះភ្លាមៗ ដោយមិនបាច់ហៅទៅ Server ម្តងទៀតឡើយ។",
        "ដោយសារតែ SharePoint ហាមឃាត់ការសរសេរសំណួរ Lookup នៅថ្ងៃធ្វើការ។",
        "ដោយសារតែ Power Fx មិនគាំទ្រការសរសេរសំណួរ Database ឡើយ។",
        "ដោយសារតែ Edit form អាចបង្ហាញទិន្នន័យបាន លុះត្រាតែវាយអត្ថបទដោយដៃ។"
      ],
      correct: 0,
      explanation: "ត្រឹមត្រូវហើយ! Gallery បានផ្ទុកកំណត់ត្រាទាំងអស់ក្នុង Memory រួចហើយ។ ការបញ្ជូន .Selected ផ្តល់នូវល្បឿនលឿនបំផុត និងមិនបាច់រង់ចាំ Server ឡើយ។"
    },
    {
      question: "កម្មករកត់ត្រារបាយការណ៍គ្រោះថ្នាក់បន្ទាន់។ បញ្ជី SharePoint បង្ហាញជួរ #HAZ-204 ច្បាស់នឹងភ្នែក ប៉ុន្តែគ្មានអ៊ីមែលធ្លាក់ចូលសោះ។ តើស្រទាប់ណាដែលមានកំហុស ហើយតើអ្វីដែលអ្នកមិនត្រូវធ្វើដាច់ខាត?",
      options: [
        "លុបប៊ូតុង Submit ក្នុង Power Apps ចោលភ្លាម ហើយសរសេររូបមន្តឡើងវិញទាំងអស់។",
        "កំហុសស្ថិតនៅក្នុងស្រទាប់ Tier B (Flow Trigger) ឬ Tier C (Email Action)។ អ្នកមិនត្រូវប៉ះពាល់កូដ Power Apps ឡើយ ពីព្រោះជួរក្នុង SharePoint បញ្ជាក់ថា App ដំណើរការត្រឹមត្រូវ ១០០% រួចហើយ!",
        "បិទបើកត្រង់ស្វូម៉ាស៊ីនភ្លើងរោងចក្រឡើងវិញ។",
        "លុបបញ្ជី SharePoint ចោល ហើយចាប់ផ្តើមឡើងវិញពីដំបូង។"
      ],
      correct: 1,
      explanation: "ត្រឹមត្រូវហើយ! វត្តមាននៃជួរទិន្នន័យក្នុង SharePoint បញ្ជាក់ថាស្រទាប់ Tier A បានជោគជ័យ! Power Apps គ្មានកំហុសឡើយ។ ការទៅកែកូដក្នុង App នឹងធ្វើឱ្យខូចសូហ្វវែរដែលដំណើរការស្រេច។"
    },
    {
      question: "តើអ្វីជាភាពខុសគ្នាជាមូលដ្ឋានរវាង Citizen Developer ឯករាជ្យ និងអ្នកដែលគ្រាន់តែទន្ទេញចាំមាត់តាមវីដេអូ YouTube?",
      options: [
        "Citizen Developer ទន្ទេញចាំរូបមន្ត Power Fx ចំនួន ៥០០០ រូបមន្ត។",
        "អ្នកទន្ទេញតាមវីដេអូមានភាពផុយស្រួយ ៖ ពេលបញ្ហាអាជីវកម្មប្រែប្រួលត្រឹម ៥% អ្វីដែលគាត់ទន្ទេញនឹងខូចភ្លាម។ ចំណែក Citizen Developer ឯករាជ្យយល់ច្បាស់ពីខ្សែសង្វាក់ហេតុផល ៩ ជំហាន (បញ្ហា ➔ ដំណើរការ ➔ ទិន្នន័យ ➔ UI ➔ តក្កវិជ្ជា ➔ សកម្មភាព ➔ ផ្ទុក ➔ Flow ➔ តេស្ត ➔ ពន្យល់) ហើយអាចដោះស្រាយបញ្ហាអាជីវកម្មណាក៏បានពីគោលការណ៍គ្រឹះ។",
        "អ្នកទន្ទេញតាមវីដេអូប្រើកណ្តុរ ចំណែក Citizen Developer ប្រើតែក្តារចុច។",
        "គ្មានភាពខុសគ្នាឡើយ ពួកគេដូចគ្នាទាំងស្រុង។"
      ],
      correct: 1,
      explanation: "ត្រឹមត្រូវហើយ! ភាពស្ទាត់ជំនាញពិតប្រាកដគឺការយល់ដឹងពីហេតុផល និងការតភ្ជាប់។ ស្ថាបត្យករដឹងច្បាស់ពី *មូលហេតុ* ដែលស្រទាប់នីមួយៗកើតឡើង ហើយអាចដោះស្រាយបញ្ហាថ្មីៗជាប្រព័ន្ធ។"
    }
  ];

  let currentQuizIndex = 0;
  let quizAnswered = false;

  // --------------------------------------------------------------------------
  // 5. CAPTURE ORIGINAL ENGLISH SLIDES
  // --------------------------------------------------------------------------
  function captureEnglishOriginals() {
    const slides = document.querySelectorAll('.slide');
    ENGLISH_SLIDES = Array.from(slides).map((slide, idx) => {
      const headerTitle = slide.querySelector('.slide-header h2') || slide.querySelector('.hero-title');
      const headerSubtitle = slide.querySelector('.slide-header .subtitle') || slide.querySelector('.hero-subtitle');
      const sectionTag = slide.querySelector('.section-tag') || slide.querySelector('.hero-badge');
      const contentEl = slide.querySelector('.slide-content');
      const notesEl = slide.querySelector('aside.trainer-notes');

      return {
        title: headerTitle ? headerTitle.innerHTML : (slide.dataset.title || ''),
        subtitle: headerSubtitle ? headerSubtitle.innerHTML : '',
        segment: sectionTag ? sectionTag.innerHTML : (slide.dataset.segment || ''),
        content: contentEl ? contentEl.innerHTML : '',
        notes: notesEl ? notesEl.innerHTML : (ENGLISH_NOTES[idx] || '')
      };
    });
  }

  // --------------------------------------------------------------------------
  // 6. BILINGUAL LANGUAGE ENGINE (EN ⟷ KH FULL CONTENT REPLACEMENT)
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
    selectDay27Sim(1);
    renderDay27QuizQuestion();

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
      selectDay27Sim(1);
    }

    // Trigger quiz setup if on Slide 21 (index 20)
    if (currentSlideIndex === 20) {
      renderDay27QuizQuestion();
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
      const segment = data ? (data.segment || slide.getAttribute('data-segment')) : (slide.getAttribute('data-segment') || 'Day 27');

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
  function selectDay27Sim(stepNum) {
    const dataSource = isKhmerActive ? DAY27_SIM_DATA_KH : DAY27_SIM_DATA;
    const step = dataSource[stepNum];
    if (!step) return;

    for (let i = 1; i <= 7; i++) {
      const tab = document.getElementById('sim-tab-' + i);
      if (tab) tab.classList.toggle('active', i === stepNum);
    }

    const display = document.getElementById('sim-day27-display') || document.getElementById('sim-layer-display') || document.getElementById('sim-display');
    const impactLabel = isKhmerActive ? 'លទ្ធផលប្រតិបត្តិការ ៖ ' : 'Operational Result: ';

    if (display) {
      display.innerHTML =
        '<div style=\"display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;\">' +
          '<span class=\"card-badge\" style=\"background: rgba(245, 158, 11, 0.2); color: #fcd34d; font-size: 0.82rem; padding: 4px 10px;\">' + step.badge + '</span>' +
          '<span style=\"color: #94a3b8; font-size: 0.85rem; font-weight: 600;\">' + step.step + '</span>' +
        '</div>' +
        '<h3 style=\"color: #f8fafc; font-size: 1.22rem; margin-bottom: 10px;\">' + step.title + '</h3>' +
        '<p style=\"color: #cbd5e1; line-height: 1.7; font-size: 0.92rem; margin-bottom: 14px;\">' + step.content + '</p>' +
        '<div style=\"background: rgba(245, 158, 11, 0.12); border-left: 3px solid #f59e0b; padding: 10px 14px; border-radius: 6px;\">' +
          '<strong style=\"color: #fcd34d; font-size: 0.85rem;\">' + impactLabel + '</strong>' +
          '<span style=\"color: #e2e8f0; font-size: 0.85rem; font-family: var(--font-code);\">' + step.output + '</span>' +
        '</div>';
    }
  }

  // --------------------------------------------------------------------------
  // 14. FORMATIVE ASSESSMENT QUIZ ENGINE (SLIDE 21)
  // --------------------------------------------------------------------------
  function renderDay27QuizQuestion() {
    const qList = isKhmerActive ? QUIZ_QUESTIONS_KH : QUIZ_QUESTIONS;
    const qData = qList[currentQuizIndex];
    if (!qData) return;

    quizAnswered = false;
    const qNumElem = document.getElementById('quiz-day27-q-num') || document.getElementById('quiz-q-num');
    const qTextElem = document.getElementById('quiz-day27-q-text') || document.getElementById('quiz-q-text');
    const optionsContainer = document.getElementById('quiz-day27-options-container') || document.getElementById('quiz-options-container');
    const feedbackBox = document.getElementById('quiz-day27-feedback-box') || document.getElementById('quiz-feedback-box');
    const placeholder = document.getElementById('quiz-day27-placeholder') || document.getElementById('quiz-placeholder');
    const content = document.getElementById('quiz-day27-feedback-content') || document.getElementById('quiz-feedback-content');
    const nextBtn = document.getElementById('quiz-day27-next-btn') || document.getElementById('quiz-next-btn');

    if (qNumElem) {
      qNumElem.textContent = isKhmerActive
        ? 'សំណួរទី ' + (currentQuizIndex + 1) + ' នៃ ' + qList.length
        : 'Question ' + (currentQuizIndex + 1) + ' of ' + qList.length;
    }
    if (qTextElem) qTextElem.textContent = qData.question;
    if (placeholder) {
      placeholder.innerHTML = isKhmerActive
        ? '<span style="font-size: 2.5rem; color: var(--text-dim); margin-bottom: 0.5rem;">🔍</span><h4 style="color: var(--text-muted);">សូមជ្រើសរើសចម្លើយមួយ</h4><p style="font-size: 0.85rem; color: var(--text-dim); max-width: 280px; margin-top: 0.35rem;">ចុចលើជម្រើសណាមួយនៅខាងឆ្វេង ដើម្បីពិនិត្យមើលហេតុនិងផលនៃស្ថាបត្យកម្ម។</p>'
        : '<span style="font-size: 2.5rem; color: var(--text-dim); margin-bottom: 0.5rem;">🔍</span><h4 style="color: var(--text-muted);">Select an Answer</h4><p style="font-size: 0.85rem; color: var(--text-dim); max-width: 280px; margin-top: 0.35rem;">Click any option on the left to inspect architectural causality.</p>';
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
        btn.onclick = function () { handleDay27QuizAnswer(optIdx); };
        optionsContainer.appendChild(btn);
      });
    }
  }

  function handleDay27QuizAnswer(selectedIdx) {
    if (quizAnswered) return;
    quizAnswered = true;

    const qList = isKhmerActive ? QUIZ_QUESTIONS_KH : QUIZ_QUESTIONS;
    const qData = qList[currentQuizIndex];
    const optionsContainer = document.getElementById('quiz-day27-options-container') || document.getElementById('quiz-options-container');
    const feedbackBox = document.getElementById('quiz-day27-feedback-box') || document.getElementById('quiz-feedback-box');
    const placeholder = document.getElementById('quiz-day27-placeholder') || document.getElementById('quiz-placeholder');
    const content = document.getElementById('quiz-day27-feedback-content') || document.getElementById('quiz-feedback-content');
    const badge = document.getElementById('quiz-day27-feedback-badge') || document.getElementById('quiz-feedback-badge');
    const statusElem = document.getElementById('quiz-day27-feedback-status') || document.getElementById('quiz-feedback-status');
    const textElem = document.getElementById('quiz-day27-feedback-text') || document.getElementById('quiz-feedback-text');
    const nextBtn = document.getElementById('quiz-day27-next-btn') || document.getElementById('quiz-next-btn');

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
        badge.textContent = isCorrect ? 'ស្ថាបត្យកម្មត្រឹមត្រូវ!' : 'ពិនិត្យមើលវិធានឡើងវិញ';
      } else {
        badge.textContent = isCorrect ? 'Architecture Verified!' : 'Review Rule';
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

  function nextDay27QuizQuestion() {
    const qList = isKhmerActive ? QUIZ_QUESTIONS_KH : QUIZ_QUESTIONS;
    currentQuizIndex++;
    if (currentQuizIndex >= qList.length) {
      currentQuizIndex = 0;
    }
    renderDay27QuizQuestion();
  }

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

  window.selectDay27Sim = selectDay27Sim;
  window.selectSimLayer = selectDay27Sim;
  window.handleDay27QuizAnswer = handleDay27QuizAnswer;
  window.handleQuizAnswer = handleDay27QuizAnswer;
  window.nextDay27QuizQuestion = nextDay27QuizQuestion;
  window.nextQuizQuestion = nextDay27QuizQuestion;
  window.renderDay27QuizQuestion = renderDay27QuizQuestion;
  window.renderQuizQuestion = renderDay27QuizQuestion;

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
    selectDay27Sim(1);
    renderDay27QuizQuestion();

    // Capture complete English originals including populated modules
    captureEnglishOriginals();

    console.log('Day 27 Capstone Presentation Engine initialized successfully with 24 full bilingual slides!');
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
