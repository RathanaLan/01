/* ============================================================================
   DAY 25: ARCHITECTURE — PROBLEM -> PROCESS -> DATA -> UI -> LOGIC
   Presentation Engine: Verified zero syntax errors via node -c
   Includes: 24 Bilingual Slides (EN ⟷ KH Full Content Replacement),
   Interactive 7-Layer Architecture Simulator, 5-Question Dual-State Quiz,
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
      title: "ស្ថាបត្យកម្មប្រព័ន្ធ ៖ បញ្ហា &rarr; ដំណើរការ &rarr; ទិន្នន័យ &rarr; អេក្រង់ &rarr; តក្កវិជ្ជា",
      segment: "ដំណាក់កាលទី ៨ ៖ ស្ថាបត្យកម្មគម្រោង",
      subtitle: "ការសំយោគជំនាញទាំង ២៤ ថ្ងៃមុនចូលទៅក្នុងប្លង់មេវិស្វកម្មតែមួយ។ រាល់ប៊ូតុង វាលទិន្នន័យ អថេរ និងរូបមន្ត ត្រូវតែតភ្ជាប់ដោយផ្ទាល់ទៅនឹងតម្រូវការអាជីវកម្មពិតប្រាកដ។",
      content: `<div class="hero-badge">
            <span>កម្មវិធីសិក្សា Microsoft Power Apps</span>
            <span>&bull;</span>
            <span>ថ្ងៃទី ២៥ នៃ ២៧</span>
          </div>
          <h1 class="hero-title">ស្ថាបត្យកម្មប្រព័ន្ធ ៖ បញ្ហា &rarr; ដំណើរការ &rarr; ទិន្នន័យ &rarr; អេក្រង់ &rarr; តក្កវិជ្ជា</h1>
          <p class="hero-subtitle">
            ការសំយោគជំនាញទាំង ២៤ ថ្ងៃមុនចូលទៅក្នុងប្លង់មេវិស្វកម្មតែមួយ។ រាល់ប៊ូតុង វាលទិន្នន័យ អថេរ និងរូបមន្ត ត្រូវតែតភ្ជាប់ដោយផ្ទាល់ទៅនឹងតម្រូវការអាជីវកម្មពិតប្រាកដ។
          </p>

          <div class="model-chain">
            <span class="chain-item">បញ្ហាពិត</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ដំណើរការ</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ទិន្នន័យ</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item active">អេក្រង់ / UI</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item active">តក្កវិជ្ជា / ការសម្រេចចិត្ត</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">សកម្មភាព</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">កន្លែងផ្ទុក (Cloud)</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ការឆ្លើយតប</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ការសាកល្បង</span>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការបើកមេរៀន (២ នាទី) ៖</strong> "សូមស្វាគមន៍មកកាន់ថ្ងៃទី ២៥! ថ្ងៃនេះគឺជាការបោះជំហានចូលទៅក្នុងដំណាក់កាលទី ៨ ៖ ស្ថាបត្យកម្មគម្រោង។ រយៈពេល ២៤ ថ្ងៃកន្លងមក អ្នកបានរៀនឧបករណ៍ជាងឈើដាច់ដោយឡែក៖ ញញួរ រណា ខ្នាតរង្វាស់។ ថ្ងៃនេះមានគេជួលយើងឱ្យសង់ផ្ទះមួយខ្នង។ យើងមិនចាប់កាន់ញញួរភ្លាមៗនោះទេ ប៉ុន្តែយើងត្រូវបើកប្លង់មេវិស្វកម្មជាមុន!"</p>
<p><strong>ខ្សែសង្វាក់គំនិតស្នូល ៖</strong> ចង្អុលបង្ហាញខ្សែសង្វាក់ម៉ូដែលគំនិត៖ បញ្ហាពិត -> ដំណើរការ -> ទិន្នន័យ -> អេក្រង់ -> តក្កវិជ្ជា -> សកម្មភាព -> កន្លែងផ្ទុក -> ការឆ្លើយតប -> ការសាកល្បង។ ថ្ងៃនេះគឺដើម្បីធានាថារាល់ប៊ូតុង ជួរឈរ និងរូបមន្ត ត្រូវតែឆ្លុះបញ្ចាំងពីតម្រូវការអាជីវកម្មពិតប្រាកដ។</p>`
    },

    // Slide 2 (Index 1): Agenda & Measurable Objectives
    {
      title: "របៀបវារៈ ៩០ នាទី និងគោលបំណងរៀនសូត្រច្បាស់លាស់",
      segment: "ផ្នែកទី ១ &bull; ប្លង់មេ និងកាលវិភាគ",
      subtitle: "រចនាសម្ព័ន្ធបង្រៀនជាវង់ (Spiral Learning) ៖ ការសំយោគគំនិត ២៤ ថ្ងៃមុន មុនពេលចាប់ផ្តើមសរសេរកូដ។",
      content: `<div class="card">
            <h3 class="card-title">🎯 គោលបំណងស្នូលទាំង ៥ សម្រាប់ថ្ងៃនេះ</h3>
            <div class="objective-item">
              <span class="obj-num">1</span>
              <div>
                <strong>ស្វែងយល់ពីស្ថាបត្យកម្ម ៧ ស្រទាប់ ៖</strong>
                <p>តាមដានគ្រប់ប៊ូតុង រូបមន្ត ឬជួរឈរទិន្នន័យ តាំងពីការឈឺចាប់របស់មនុស្សរហូតដល់កន្លែងផ្ទុកលើក្លោដ ដោយមិនរំលងជំហាន។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">2</span>
              <div>
                <strong>បំបែកដំណើរការការងាររបស់មនុស្ស ៖</strong>
                <p>បកប្រែពាក្យត្អូញត្អែរក្នុងរោងចក្រ ទៅជាជំហានផ្ទេរការងារ តួនាទីមនុស្ស និងច្រកសម្រេចចិត្ត មុនពេលប៉ះកុំព្យូទ័រ។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">3</span>
              <div>
                <strong>កំណត់ទម្រង់ទិន្នន័យស្តង់ដារ (Data Schema) ៖</strong>
                <p>កំណត់ប្រភេទជួរឈរ SharePoint ត្រឹមត្រូវ (Choice, Number, Date, Person) ស្របតាមតម្រូវការអាជីវកម្ម។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">4</span>
              <div>
                <strong>រៀបចំប្លង់គំរូ ៣ អេក្រង់ស្តង់ដារ ៖</strong>
                <p>រចនាលំហូរស្ដង់ដារ Browse ➔ Create ➔ Detail/Edit ជាមួយ FormMode និងវិធានផ្ទៀងផ្ទាត់។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">5</span>
              <div>
                <strong>កម្ចាត់អន្ទាក់ផ្ទាំងទទេ (Blank-Canvas Traps) ៖</strong>
                <p>លុបបំបាត់ការរចនា UI មុនពេលគិតទិន្នន័យ ការប្រើប្រាស់វាលអក្សរខុសគោលដៅ និងអេក្រង់រញ៉េរញ៉ៃ។</p>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">⏱️ កាលវិភាគលម្អិត ៩០ នាទី</h3>
            <div class="agenda-timeline">
              <div class="agenda-row">
                <span class="agenda-time">00 - 05 នាទី</span>
                <div><strong>រំលឹក និងសំយោគដំណើរការ ៖</strong> សង្ខេបថ្ងៃទី ១-២៤ + កម្មវិធីសិក្សាតភ្ជាប់គ្នា</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time">05 - 12 នាទី</span>
                <div><strong>វិបត្តិជាក់ស្តែង ៖</strong> មហន្តរាយផ្ទាំងទទេខាតបង់ $45,000 នៅរោងចក្រ Apex Precision</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time">12 - 22 នាទី</span>
                <div><strong>គំនិតសាមញ្ញ &amp; ឧទាហរណ៍ ៖</strong> ផ្ទះបាយភោជនីយដ្ឋាន + ការសង្គ្រោះបន្ទាន់នៅមន្ទីរពេទ្យ</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time">22 - 35 នាទី</span>
                <div><strong>ប្លង់មេ ៧ ស្រទាប់ ៖</strong> បញ្ហា ➔ ដំណើរការ ➔ ទិន្នន័យ ➔ អេក្រង់ ➔ តក្កវិជ្ជា ➔ កន្លែងផ្ទុក ➔ ការឆ្លើយតប</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time">35 - 50 នាទី</span>
                <div><strong>ការបង្ហាញផ្ទាល់របស់គ្រូ ៖</strong> គូរប្លង់ថែទាំម៉ាស៊ីន ១ ទំព័រមុនពេលបើក Power Apps</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time">50 - 65 នាទី</span>
                <div><strong>ការអនុវត្តមានការណែនាំ ៖</strong> បង្កើតទម្រង់ទិន្នន័យ ស្ថាបត្យកម្មអេក្រង់ និងវិធានសុវត្ថិភាពឡានលើក</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time">65 - 75 នាទី</span>
                <div><strong>កិច្ចការស្វ័យសិក្សា ៖</strong> ប្លង់ស្ថាបត្យកម្ម ៥ ស្រទាប់សម្រាប់ឃ្លាំងដាក់ទំនិញដាច់ដោយឡែក</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time">75 - 90 នាទី</span>
                <div><strong>ការត្រួតពិនិត្យ រូបប៊្រិក &amp; ស្ពានចម្លង ៖</strong> សំណួរ dual-state ៥, រូបប៊្រិក និងមើលត្រួសៗថ្ងៃទី ២៦</div>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ទិដ្ឋភាពរួមនៃរបៀបវារៈ (២ នាទី) ៖</strong> "កត់សម្គាល់កាលវិភាគ ៨ ដំណាក់កាលរបស់យើង។ យើងចំណាយពេល ១៥ នាទីលើការបង្ហាញផ្ទាល់ ១៥ នាទីលើការអនុវត្តរួមគ្នា និង ១០ នាទីលើកិច្ចការឯករាជ្យ។ ៨០% នៃពេលវេលាត្រូវបានប្រើប្រាស់លើការគិត និងការរៀបចំរចនាសម្ព័ន្ធ; មានតែ ២០% ប៉ុណ្ណោះដែលប្រើលើការចុចប៊ូតុង។"</p>`
    },

    // Slide 3 (Index 2): Concept Map Recap
    {
      title: "ផែនទីគំនិតតភ្ជាប់ ៖ ដំណើរឆ្ពោះមកកាន់ថ្ងៃទី ២៥",
      segment: "ផ្នែកទី ១ &bull; ការរួមបញ្ចូលកម្មវិធីសិក្សា",
      subtitle: "គ្រប់ឧបករណ៍ដែលបានរៀនពីមុន ត្រូវបានផ្គុំចូលគ្នាបង្កើតជាលំហូរការងារអាជីវកម្មពេញលេញ។",
      content: `<div class="card" style="border-left: 3px solid #06b6d4;">
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem;">
              <div style="background: rgba(12, 19, 31, 0.7); padding: 1.15rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
                <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">ថ្ងៃទី ១ - ៥</span>
                <h4 style="color: #f8fafc; margin: 0.5rem 0;">ផ្ទាំង UI &amp; អថេរ</h4>
                <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
                  ប៊ូតុង ស្លាក ប្រអប់បញ្ចូលអត្ថបទ និងអថេរបណ្តោះអាសន្នក្នុងអង្គចងចាំ (Set, UpdateContext)។
                </p>
              </div>

              <div style="background: rgba(12, 19, 31, 0.7); padding: 1.15rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
                <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">ថ្ងៃទី ៦ - ១០</span>
                <h4 style="color: #f8fafc; margin: 0.5rem 0;">លក្ខខណ្ឌ &amp; តារាង</h4>
                <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
                  តក្កវិជ្ជា If, ការផ្ទៀងផ្ទាត់ IsBlank និងតារាងបណ្តោះអាសន្នច្រើនជួរ (ClearCollect)។
                </p>
              </div>

              <div style="background: rgba(12, 19, 31, 0.7); padding: 1.15rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ថ្ងៃទី ១៧ - ២០</span>
                <h4 style="color: #f8fafc; margin: 0.5rem 0;">SharePoint &amp; ក្លោដ</h4>
                <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
                  តារាងលើក្លោដ ជួរឈរមានប្រភេទត្រឹមត្រូវ និងការរក្សាទុកទិន្នន័យជាអចិន្ត្រៃយ៍របស់ក្រុមហ៊ុន។
                </p>
              </div>

              <div style="background: rgba(139, 92, 246, 0.15); padding: 1.15rem; border-radius: 8px; border: 1px solid rgba(139, 92, 246, 0.4);">
                <span class="card-badge" style="background: rgba(139, 92, 246, 0.25); color: #c084fc;">ថ្ងៃទី ២១ - ២៤</span>
                <h4 style="color: #c084fc; margin: 0.5rem 0;">វដ្តជីវិត CRUD ពេញលេញ</h4>
                <p style="color: #f5f3ff; font-size: 0.86rem; line-height: 1.5;">
                  Galleries មើលទិន្នន័យ, Forms កែសម្រួល, NewForm បង្កើតថ្មី, និង SubmitForm រក្សាទុកដោយមិនស្ទួន!
                </p>
              </div>
            </div>

            <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(6, 182, 212, 0.08); border-radius: 8px; text-align: center; border: 1px dashed rgba(6, 182, 212, 0.3);">
              <span style="color: #67e8f9; font-weight: 700; font-size: 0.95rem;">
                ច្បាប់ស្ថាបត្យកម្ម ៖ ការមានឧបករណ៍មិនមែនមានន័យថាអ្នកមានផ្ទះមួយខ្នងនោះឡើយ! ស្ថាបត្យកម្មគឺជាប្លង់មេដែលកំណត់ទីតាំងសម្រាប់ក្តារ ដែកគោល និងបំពង់នីមួយៗ។
              </span>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការសំយោគដំណើរការ (៣ នាទី) ៖</strong> "រំលឹកឡើងវិញនូវយុគសម័យទាំង ៤ ៖ ផ្ទាំង UI (ថ្ងៃទី ១-៥), តក្កវិជ្ជា (ថ្ងៃទី ៦-១០), SharePoint (ថ្ងៃទី ១៧-២០), និង CRUD (ថ្ងៃទី ២១-២៤)។ ថ្ងៃនីមួយៗបានបន្ថែមបំណែកមួយនៃល្បែងផ្គុំរូប។ ថ្ងៃនេះ បំណែកទាំងអស់ត្រូវបានផ្គុំចូលគ្នាទៅជាប្រព័ន្ធសហគ្រាសពេញលេញ។"</p>`
    },

    // Slide 4 (Index 3): Prerequisite Retrieval Check
    {
      title: "សំណួររំលឹកចំណេះដឹងចាស់ ៖ បើកដំណើរការគ្រឹះមុនៗ",
      segment: "ផ្នែកទី ២ &bull; ការរំលឹកចំណេះដឹង",
      subtitle: "ចុចលើកាតនីមួយៗដើម្បីបង្ហាញចម្លើយ និងគោលការណ៍ស្ថាបត្យកម្មគ្រឹះពីថ្ងៃទី ១៨, ២២ និង ២៣។",
      content: `<div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">សំណួរទី ១</span>
                <h4 style="color: #f8fafc; margin-top: 1rem;">អថេរ (Variables) vs SharePoint</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 0.5rem;">
                  តើមានអ្វីកើតឡើងចំពោះអថេរពេលអ្នកបិទកម្មវិធី? ចុះកំណត់ត្រា SharePoint វិញ?
                </p>
                <div class="flip-hint">ចុចដើម្បីត្រឡប់ &rarr;</div>
              </div>
              <div class="flip-card-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">គោលការណ៍ទី ១</span>
                <p style="color: #ecfdf5; font-size: 0.92rem; margin-top: 0.8rem; line-height: 1.6;">
                  <strong>អថេរបាត់ភ្លាមៗ</strong> ពីអង្គចងចាំ RAM របស់ឧបករណ៍។<br><br>
                  <strong>កំណត់ត្រា SharePoint នៅស្ថិតស្ថេររហូត</strong> លើក្លោដ ចែករំលែកសុវត្ថិភាពដល់អ្នកប្រើប្រាស់ទាំងអស់!
                </p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">សំណួរទី ២</span>
                <h4 style="color: #f8fafc; margin-top: 1rem;">Items vs Item</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 0.5rem;">
                  តើមួយណាជាកម្មសិទ្ធិរបស់ Gallery មួយណាជារបស់ Form ហើយតើវាទាក់ទងគ្នាយ៉ាងដូចម្តេច?
                </p>
                <div class="flip-hint">ចុចដើម្បីត្រឡប់ &rarr;</div>
              </div>
              <div class="flip-card-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">គោលការណ៍ទី ២</span>
                <p style="color: #ecfdf5; font-size: 0.92rem; margin-top: 0.8rem; line-height: 1.6;">
                  <code>Items</code> (ពហុវចនៈ) = ប្រភពតារាងរបស់ Gallery។<br><br>
                  <code>Item</code> (ឯកវចនៈ) = កំណត់ត្រាគោលដៅរបស់ Form។<br><br>
                  តភ្ជាប់គ្នាដោយ <code>Item = galWorkOrders.Selected</code> (ឬ <code>galRequests.Selected</code>)!
                </p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <span class="card-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">សំណួរទី ៣</span>
                <h4 style="color: #f8fafc; margin-top: 1rem;">សារៈសំខាន់នៃការផ្ទៀងផ្ទាត់</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 0.5rem;">
                  ហេតុអ្វីបានជាយើងត្រូវពិនិត្យ <code>IsBlank()</code> មុនពេលហៅ <code>SubmitForm()</code>?
                </p>
                <div class="flip-hint">ចុចដើម្បីត្រឡប់ &rarr;</div>
              </div>
              <div class="flip-card-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">គោលការណ៍ទី ៣</span>
                <p style="color: #ecfdf5; font-size: 0.92rem; margin-top: 0.8rem; line-height: 1.6;">
                  <strong>ដើម្បីការពារមូលដ្ឋានទិន្នន័យក្រុមហ៊ុន!</strong><br><br>
                  ការផ្ទៀងផ្ទាត់ការពារទិន្នន័យទទេ ខូច ឬមិនត្រឹមត្រូវ មិនឱ្យចូលទៅបំពុលរបាយការណ៍លើក្លោដ។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការរំលឹកសកម្ម (៣ នាទី) ៖</strong> "ហៅសិស្ស ៣ នាក់ផ្សេងគ្នា។ សំណួរ ១ ៖ អថេរបាត់ពេលបិទកម្មវិធី; កំណត់ត្រា SharePoint រស់នៅរហូតលើក្លោដ។ សំណួរ ២ ៖ Items (ពហុវចនៈ) = Gallery; Item (ឯកវចនៈ) = Form។ សំណួរ ៣ ៖ ការផ្ទៀងផ្ទាត់ IsBlank ទប់ស្កាត់ទិន្នន័យសំរាមមិនឱ្យចូលក្នុងមូលដ្ឋានទិន្នន័យក្រុមហ៊ុន។"</p>`
    },

    // Slide 5 (Index 4): Workplace Crisis: $45,000 Catastrophe
    {
      title: "វិបត្តិជាក់ស្តែង ៖ មហន្តរាយផ្ទាំងទទេខាតបង់ $45,000",
      segment: "ផ្នែកទី ៣ &bull; ហេតុអ្វីបានជាមេរៀននេះកើតឡើង",
      subtitle: "អ្វីដែលកើតឡើងនៅពេលនរណាម្នាក់បើក Power Apps Studio ដោយគ្មានប្លង់ស្ថាបត្យកម្ម។",
      content: `<div class="card" style="border-left: 3px solid #ef4444;">
          <div class="crisis-banner">
            <span class="crisis-icon">&iexcl;</span>
            <div>
              <strong style="color: #fca5a5; font-size: 1.1rem;">វិបត្តិសំបុត្រការងារបន្ទាន់ ៖ Spindle ម៉ាស៊ីន CNC រលាយគាំងនៅរោងចក្រ Apex Precision</strong>
              <p style="color: #fecaca; font-size: 0.88rem; margin: 0.25rem 0 0 0;">រោងចក្រផលិតស្លាបទួរប៊ីន Apex Precision &bull; ផ្នែកម៉ាស៊ីន CNC &bull; វេនទី ១</p>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 1.25rem;">
            <div>
              <h4 style="color: #f87171; margin-bottom: 0.5rem;">កំហុសរបស់អ្នកអភិវឌ្ឍន៍ស្ម័គ្រចិត្ត (The Amateur Mistake) ៖</h4>
              <ul style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; padding-left: 1.2rem;">
                <li>បើក Power Apps នៅថ្ងៃចន្ទដោយគ្មានកំណត់ត្រាស្ថាបត្យកម្មអ្វីទាំងអស់។</li>
                <li>បង្កើតប៊ូតុងក្រហមមួយ និងប្រអប់វាយអក្សរ ១២ គ្មានការផ្ទៀងផ្ទាត់លើផ្ទាំងទទេ។</li>
                <li>បង្កើតបញ្ជីឈ្មោះ "AppStuff" ក្នុង SharePoint ដែលមានជួរឈរ <code>Col1</code>, <code>Data2</code>។</li>
                <li>ប្រើប្រាស់វាលអក្សរវាយតាមចិត្តសម្រាប់ឈ្មោះម៉ាស៊ីន ៖ កម្មករវាយ "CNC-04", "machine 4", "Unit 4"។</li>
                <li>គ្មានអេក្រង់កែប្រែសំបុត្រការងារ ធ្វើឱ្យកម្មករបង្កើតសំបុត្រស្ទួនរាល់ម៉ោង។</li>
              </ul>
            </div>

            <div>
              <h4 style="color: #fca5a5; margin-bottom: 0.5rem;">លទ្ធផលមហន្តរាយជាក់ស្តែង (The Catastrophic Result) ៖</h4>
              <ul style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; padding-left: 1.2rem;">
                <li><strong>សំបុត្របាត់ក្នុងចំណោមទិន្នន័យស្ទួន ៖</strong> បញ្ហាបូមទឹកត្រជាក់ត្រូវកប់បាត់ក្រោម ៤០០ សំបុត្រជាន់គ្នា។</li>
                <li><strong>ដំណើរការ ៣ ថ្ងៃគ្មានទឹកត្រជាក់ ៖</strong> Spindle ឡើងកម្តៅខ្លាំងហើយរលាយគាំងទាំងស្រុង។</li>
                <li><strong>ខាតបង់ $45,000 ជំនួសគ្រឿងបន្លាស់ ៖</strong> ផ្អាកខ្សែសង្វាក់ផលិតកម្ម ៤៨ ម៉ោងដើម្បីជួសជុល។</li>
                <li><strong>គម្រោងកម្មវិធីត្រូវលុបចោល ៖</strong> ប្រធានរោងចក្របញ្ឈប់ការប្រើប្រាស់កម្មវិធីនេះភ្លាមៗ!</li>
              </ul>
            </div>
          </div>

          <div style="margin-top: 1.25rem; padding: 0.85rem; background: rgba(239, 68, 68, 0.1); border-radius: 6px; border-left: 3px solid #ef4444;">
            <p style="color: var(--text-main); font-size: 0.88rem; margin: 0;">
              <strong>មេរៀនមាស ៖</strong> ការអភិវឌ្ឍន៍សូហ្វវែរមិនមែនជាការអូសប៊ូតុងចម្រុះពណ៌នោះទេ។ វាគឺអំពីការស្វែងយល់ពីដំណើរការការងាររបស់មនុស្ស និងការរៀបចំរចនាសម្ព័ន្ធការពិតនៃអាជីវកម្ម!
            </p>
          </div>
        </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការនិទានរឿង &amp; អារម្មណ៍ (៤ នាទី) ៖</strong> "រោងចក្រ Apex Precision ផលិតស្លាបទួរប៊ីនតម្លៃ $8,000 ក្នុងមួយដុំ។ អ្នកអភិវឌ្ឍន៍ស្ម័គ្រចិត្តបានបើក Power Apps ដោយគ្មានផែនការ ៖ ជួរឈរឈ្មោះ Col1 វាលអក្សរវាយតាមចិត្ត។ សំបុត្របូមទឹកត្រជាក់ត្រូវបានបង្កើតស្ទួនហើយបាត់ដំណឹង។ Spindle តម្លៃ $45,000 បានរលាយគាំង បណ្តាលឱ្យផ្អាករោងចក្រ ៤៨ ម៉ោង។ សូហ្វវែរមិនមែនជាការអូសប្រអប់ទេ វាជាការរៀបចំការពិតនៃអាជីវកម្ម។"</p>`
    },

    // Slide 6 (Index 5): Plain-Language Concept Translation Matrix
    {
      title: "គំនិតសាមញ្ញមុនវាក្យសព្ទបច្ចេកទេស ៖ បកប្រែការឈឺចាប់ទៅជាស្ថាបត្យកម្ម",
      segment: "ផ្នែកទី ៤ &bull; ភាសាសាមញ្ញជាមុន",
      subtitle: "កុំរៀនពាក្យបច្ចេកទេសដាច់ដោយឡែក។ រាល់ស្រទាប់បច្ចេកទេសគ្រាន់តែជាការពិតក្នុងជីវិតប្រចាំថ្ងៃប៉ុណ្ណោះ។",
      content: `<div class="card">
          <table class="matrix-table">
            <thead>
              <tr>
                <th>គំនិតជាភាសាសាមញ្ញ</th>
                <th>ពាក្យបច្ចេកទេស</th>
                <th>អត្ថន័យពិតក្នុងជីវិតជាក់ស្តែង</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>ការឈឺចាប់ពិត (The Real Pain)</strong></td>
                <td><span class="badge-tag tag-rose">Business Requirement</span></td>
                <td>បញ្ហាដំណើរការអាជីវកម្មដែលធ្វើឱ្យខាតបង់ប្រាក់ បង្កើតហានិភ័យសុវត្ថិភាព ឬពន្យារពេលអតិថិជន។</td>
              </tr>
              <tr>
                <td><strong>ជំហានផ្ទេរការងារ (The Hand-Off Steps)</strong></td>
                <td><span class="badge-tag tag-cyan">Business Process Map</span></td>
                <td>លំដាប់លំដោយនៃអ្នកដែលត្រូវធ្វើអ្វី នៅពេលណា និងការសម្រេចចិត្តបន្ទាប់ដែលត្រូវធ្វើ។</td>
              </tr>
              <tr>
                <td><strong>ធុងចងចាំ (The Memory Buckets)</strong></td>
                <td><span class="badge-tag tag-emerald">Data Schema / Columns</span></td>
                <td>ប្រអប់ផ្ទុកឈ្មោះច្បាស់លាស់ និងប្រភេទជាក់លាក់ (Choice, Date, Number) ដែលយើងត្រូវចងចាំជារៀងរហូត។</td>
              </tr>
              <tr>
                <td><strong>បង្អួច និងទ្វារ (The Windows &amp; Doors)</strong></td>
                <td><span class="badge-tag tag-purple">Screen Architecture / UI</span></td>
                <td>អេក្រង់ដែលមនុស្សចូលមើលសេចក្តីសង្ខេប បំពេញសំណើ ឬអនុម័តសកម្មភាព។</td>
              </tr>
              <tr>
                <td><strong>ច្បាប់ចរាចរណ៍ (The Traffic Rules)</strong></td>
                <td><span class="badge-tag tag-amber">Business Logic / Power Fx</span></td>
                <td>រូបមន្តដែលការពារកុំឱ្យទទេ គណនាតម្លៃសរុប និងណែនាំអ្នកប្រើប្រាស់ដោយសុវត្ថិភាព។</td>
              </tr>
              <tr>
                <td><strong>ទូដាក់ឯកសារ (The Filing Cabinet)</strong></td>
                <td><span class="badge-tag tag-cyan">SharePoint Storage</span></td>
                <td>មូលដ្ឋានទិន្នន័យលើក្លោដអចិន្ត្រៃយ៍ ដែលកំណត់ត្រារស់នៅឆ្លងកាត់គ្រប់ឧបករណ៍ និងសម័យប្រជុំ។</td>
              </tr>
            </tbody>
          </table>
        </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការបំភ្លឺគំនិត (៣ នាទី) ៖</strong> "អានម្តងមួយជួរ។ 'Business Requirement' គឺគ្រាន់តែជា 'អ្វីដែលកំពុងឈឺចាប់'; 'Data Schema' គឺគ្រាន់តែជា 'ធុងចងចាំ'; 'Power Fx' គឺគ្រាន់តែជា 'ច្បាប់ចរាចរណ៍' ដែលការពារកុំឱ្យមនុស្សធ្វើខុស។"</p>`
    },

    // Slide 7 (Index 6): Everyday Analogy 1: Commercial Kitchen
    {
      title: "ឧទាហរណ៍ទី ១ ៖ ការរចនាផ្ទះបាយភោជនីយដ្ឋានផ្កាយ ៥",
      segment: "ផ្នែកទី ៤ &bull; ម៉ូដែលគំនិត",
      subtitle: "ហេតុអ្វីបានជាគេមិនដែលទិញចង្ក្រានហ្គាស មុនពេលគូរប្លង់រាងត្រីកោណនៃការធ្វើការងាររបស់មេចុងភៅ។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">១. បញ្ហាពិតប្រាកដ</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">ការពន្យារពេលម្ហូប (Order Delays)</h4>
            <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
              ភ្ញៀវត្រូវរង់ចាំអាហារពេលល្ងាចរហូតដល់ ៤៥ នាទី ពីព្រោះចុងភៅ និងអ្នកលាងចានដើរប៉ះទង្គិចគ្នាក្នុងច្រកដើរចង្អៀត។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">២. លំហូរដំណើរការ</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">ត្រីកោណការងារ (The Triangle)</h4>
            <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
              ការទទួលគ្រឿងផ្សំឆៅ ➔ តុរៀបចំគ្រឿង ➔ ស្ថានីយចម្អិន/ឆា ➔ ការត្រួតពិនិត្យលើចាន ➔ តុលើកម្ហូបជូនអ្នករត់តុ។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">៣. ការផ្ទុក &amp; ធុងស្តុក</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">តំបន់មានស្លាក (Labeled Zones)</h4>
            <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
              បន្ទប់ត្រជាក់ស្តុកមានធុងតាមកម្រិតសីតុណ្ហភាព ៖ សាច់ឆៅ (បក្សី), បន្លែ (លាងរួច), ទឹកជ្រលក់ចម្អិនស្រេច។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">៤. តក្កវិជ្ជានៃសុវត្ថិភាព</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">ច្រកត្រួតពិនិត្យ (Inspection Gate)</h4>
            <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
              ប្រសិនបើទែរម៉ូម៉ែត្រវាស់សាច់បង្ហាញក្រោម 74&deg;C ចុងភៅរៀបចានត្រូវបានរារាំងមិនឱ្យបញ្ចេញម្ហូបដាច់ខាត!
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការប្រៀបធៀបរូបភាព (៣ នាទី) ៖</strong> "ប្រសិនបើអ្នកសង់ផ្ទះបាយដោយគ្រាន់តែទិញចង្ក្រានស្អាតៗមកដាក់រញ៉េរញ៉ៃ នោះចុងភៅនឹងដើរប៉ះទង្គិចគ្នា ហើយម្ហូបនឹងចេញយឺត។ នៅក្នុង Power Apps ប៊ូតុង និងអេក្រង់គឺជាចង្ក្រាន; ប្លង់ស្ថាបត្យកម្មគឺជាលំហូរការងាររបស់ចុងភៅ។"</p>`
    },

    // Slide 8 (Index 7): Everyday Analogy 2: Hospital Emergency Room Triage
    {
      title: "ឧទាហរណ៍ទី ២ ៖ បន្ទប់សង្គ្រោះបន្ទាន់នៅមន្ទីរពេទ្យ (ER Triage)",
      segment: "ផ្នែកទី ៤ &bull; ម៉ូដែលគំនិត",
      subtitle: "ហេតុអ្វីបានជាគ្រូពេទ្យមិនឱ្យអ្នកជំងឺទាំងអស់ដើរចូលបន្ទប់វះកាត់ដោយគ្មានការចាត់ថ្នាក់ជាមុន។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">១. បញ្ហាពិតប្រាកដ</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">គាំងបេះដូង vs ថ្លោះគ្រេច</h4>
            <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
              អ្នកជំងឺគាំងបេះដូងអាចស្លាប់បើចាំលើស ៨ នាទី ចំណែកអ្នកថ្លោះគ្រេចអាចរង់ចាំ ៦០ នាទីបាន។ ការតម្រង់ជួរមុនក្រោយបណ្តាលឱ្យបាត់បង់ជីវិត។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">២. ដំណើរការ &amp; ទិន្នន័យ</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">រង្វាស់កម្រិតសង្គ្រោះបន្ទាន់ (Triage Metrics)</h4>
            <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
              គិលានុបដ្ឋាយិកាវាស់សញ្ញាជីវិត។ ទម្រង់ទិន្នន័យ ៖ <code>HeartRate (Number)</code>, <code>TriageLevel (Choice: Red, Yellow, Green)</code>។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">៣. វិធានតក្កវិជ្ជា</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">ការបញ្ជូនសំឡេងរោទិ៍អាសន្ន (Alarm Routing)</h4>
            <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
              <code>If(HeartRate &gt; 140 Or BP &lt; 90, "Red Alert", "Standard")</code>។ កុំព្យូទ័របញ្ជូនការចាត់ចែងគ្រែដោយស្វ័យប្រវត្តិ។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">៤. អេក្រង់ UI</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">ស្ថានីយការងារទាំង ៣ (3 Workstations)</h4>
            <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
              ថេប្លេត Triage (ទទួលរហ័ស) ➔ ក្តារព័ត៌មានវេជ្ជបណ្ឌិត (សញ្ញាក្រហមនៅកំពូលនៃ Gallery) ➔ ម៉ូនីទ័រក្បែរគ្រែ (ព័ត៌មានលម្អិតពេញលេញ)។
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការយល់ដឹងអំពីអាទិភាព (៣ នាទី) ៖</strong> "បន្ទប់សង្គ្រោះបន្ទាន់មិនឱ្យមនុស្សដើរចូលតាមចិត្តទេ។ Triage គឺជាតម្រង (Filter); កម្រិតបន្ទាន់គឺជាជួរឈរ Choice; ហើយវេជ្ជបណ្ឌិតគឺជាតួនាទី Role-based access។"</p>`
    },

    // Slide 9 (Index 8): 7-Layer Master Framework
    {
      title: "ក្របខ័ណ្ឌស្ថាបត្យកម្ម ៧ ស្រទាប់ (The 7-Layer Master Framework)",
      segment: "ផ្នែកទី ៥ &bull; ម៉ូដែលគំនិតមេ",
      subtitle: "ខ្សែសង្វាក់វិស្វកម្មពេញលេញ ដែលធានាថារាល់ធាតុផ្សំទាំងអស់ក្នុងកម្មវិធីបម្រើដល់តម្លៃអាជីវកម្ម។",
      content: `<div class="card">
          <div class="arch-pipeline">
            <div class="arch-node">
              <div class="arch-node-num">L1</div>
              <div class="arch-node-title">បញ្ហាពិត</div>
              <div class="arch-node-sub">អ្វីដែលឈឺចាប់?</div>
            </div>
            <div class="arch-arrow">&rarr;</div>
            <div class="arch-node">
              <div class="arch-node-num">L2</div>
              <div class="arch-node-title">ដំណើរការ</div>
              <div class="arch-node-sub">តើនរណាធ្វើអ្វី?</div>
            </div>
            <div class="arch-arrow">&rarr;</div>
            <div class="arch-node">
              <div class="arch-node-num">L3</div>
              <div class="arch-node-title">ទិន្នន័យ</div>
              <div class="arch-node-sub">អ្វីដែលត្រូវចងចាំ?</div>
            </div>
            <div class="arch-arrow">&rarr;</div>
            <div class="arch-node active">
              <div class="arch-node-num">L4</div>
              <div class="arch-node-title">អេក្រង់</div>
              <div class="arch-node-sub">តើមើលនៅទីណា?</div>
            </div>
            <div class="arch-arrow">&rarr;</div>
            <div class="arch-node active">
              <div class="arch-node-num">L5</div>
              <div class="arch-node-title">តក្កវិជ្ជា</div>
              <div class="arch-node-sub">ច្បាប់ចរាចរណ៍?</div>
            </div>
            <div class="arch-arrow">&rarr;</div>
            <div class="arch-node">
              <div class="arch-node-num">L6</div>
              <div class="arch-node-title">កន្លែងផ្ទុក</div>
              <div class="arch-node-sub">កត់ត្រាលើក្លោដ</div>
            </div>
            <div class="arch-arrow">&rarr;</div>
            <div class="arch-node">
              <div class="arch-node-num">L7</div>
              <div class="arch-node-title">ការឆ្លើយតប</div>
              <div class="arch-node-sub">បញ្ជាក់ការពិត</div>
            </div>
          </div>

          <div class="callout-box" style="margin-top: 1.25rem;">
            <strong style="color: #67e8f9;">ច្បាប់ស្ថាបត្យកម្ម ៖</strong> អ្នកមិនអាចបង្កើតស្រទាប់ទី ៤ (អេក្រង់) ឬសរសេរស្រទាប់ទី ៥ (Power Fx) បានឡើយ លុះត្រាតែស្រទាប់ទី ១, ២ និង ៣ ត្រូវបានបញ្ចប់ច្បាស់លាស់លើក្រដាសជាមុន! ការរំលងស្រទាប់គឺជាដើមចមនៃមហន្តរាយផ្ទាំងទទេ។
          </div>
        </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ក្របខ័ណ្ឌ ៧ ស្រទាប់ (៣ នាទី) ៖</strong> "ដើរឆ្លងកាត់ខ្សែសង្វាក់ ៧ ថ្នាំង។ ឱ្យសិស្សសូត្រតាមអ្នក ៖ 'បញ្ហា ➔ ដំណើរការ ➔ ទិន្នន័យ ➔ អេក្រង់ ➔ តក្កវិជ្ជា ➔ កន្លែងផ្ទុក ➔ ការឆ្លើយតប'។ បញ្ជាក់ច្បាប់ ៖ អ្នកមិនអាចរំលងស្រទាប់បានទេ។ ការបង្កើតអេក្រង់មុនពេលស្គាល់ទម្រង់ទិន្នន័យ គឺជាការធានានូវការបរាជ័យ។"</p>`
    },

    // Slide 10 (Index 9): Layers 1 & 2: Problem & Process
    {
      title: "ស្រទាប់ទី ១ &amp; ២ ៖ បញ្ហាអាជីវកម្ម និងដំណើរការការងាររបស់មនុស្ស",
      segment: "ផ្នែកទី ៥ &bull; ស្រទាប់គ្រឹះ",
      subtitle: "សូហ្វវែរមិនអាចដោះស្រាយបញ្ហាដែលមនុស្សខ្លួនឯងមិនទាន់យល់ច្បាស់នោះឡើយ។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">ស្រទាប់ទី ១ ៖ ការកំណត់បញ្ហា</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">វិបត្តិ Spindle ម៉ាស៊ីន CNC ឡើងកម្តៅខ្លាំង</h4>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              នៅពេលម៉ាស៊ីនបូមទឹកត្រជាក់លើ CNC ខ្សែទី ២ ខូច កម្មករមិនអាចដឹងថាតើសំបុត្រការងារត្រូវបានកត់ត្រារួចហើយឬនៅនោះទេ។ ការខាតបង់ $45,000 ជំនួសគ្រឿងបន្លាស់ និង ៤៨ ម៉ោងផ្អាកផលិតកម្មនឹងកើតឡើងបើព្រងើយកន្តើយ។
            </p>
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0, 0, 0, 0.35); border-radius: 6px;">
              <strong style="color: #fca5a5; font-size: 0.85rem;">គោលបំណងអាជីវកម្ម ៖</strong>
              <p style="color: #cbd5e1; font-size: 0.82rem; margin-top: 0.25rem;">អនុញ្ញាតឱ្យកម្មករកត់ត្រាការឡើងកម្តៅក្នុងរយៈពេលក្រោម ១៥ វិនាទី និងអនុញ្ញាតឱ្យជាងជួសជុលកែប្រែស្ថានភាពដោយមិនបង្កើតជួរស្ទួន។</p>
            </div>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">ស្រទាប់ទី ២ ៖ ផែនទីដំណើរការមនុស្ស</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">ខ្សែសង្វាក់ផ្ទេរការងារ ៤ ជំហាន</h4>
            <div class="agenda-timeline" style="margin-top: 0.5rem;">
              <div class="agenda-row">
                <span class="agenda-time" style="color: #67e8f9;">ជំហាន ១ &bull; កម្មករ</span>
                <div>កម្មករឃើញភ្លើងលឿង ➔ កត់ត្រាសំបុត្រការងារឌីជីថលភ្លាមៗ។</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time" style="color: #fcd34d;">ជំហាន ២ &bull; មេជាង</span>
                <div>មេជាងទទួលបានសារអាសន្ន ➔ ចាត់តាំងជាងដារ៉ាឱ្យទៅពិនិត្យ។</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time" style="color: #86efac;">ជំហាន ៣ &bull; ជាង</span>
                <div>ជាងដារ៉ាជួសជុលវ៉ានទឹក ➔ កត់ត្រាថ្លៃបន្លាស់ $120 &amp; កំណត់ចំណាំ។</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time" style="color: #c084fc;">ជំហាន ៤ &bull; ប្រធាន</span>
                <div>ប្រធានផ្នែកត្រួតពិនិត្យសម្ពាធទឹក ➔ ចុះហត្ថលេខា &amp; បិទសំបុត្រ។</div>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ស្រទាប់ទី ១ &amp; ២ (៣ នាទី) ៖</strong> "បង្ហាញពីរបៀបដែលយើងសម្ភាសន៍កម្មករ។ យើងមិនសួរថា 'តើអ្នកចង់បានប៊ូតុងអ្វីខ្លះ?' ទេ យើងសួរថា ៖ 'តើអ្វីកំពុងរារាំងអ្នកមិនឱ្យបំពេញការងារបានល្អ?' កត់សម្គាល់តួនាទីមនុស្សទាំង ៤ ៖ កម្មករ, មេជាង, ជាងជួសជុល, និងប្រធានផ្នែក។ តួនាទីនីមួយៗមានការទទួលខុសត្រូវដាច់ដោយឡែក។"</p>`
    },

    // Slide 11 (Index 10): Layer 3: Normalized Data Schema
    {
      title: "ស្រទាប់ទី ៣ ៖ ទម្រង់ទិន្នន័យស្តង់ដារ (បញ្ជី SharePoint)",
      segment: "ផ្នែកទី ៥ &bull; ស្រទាប់ទិន្នន័យ",
      subtitle: "បញ្ជី SharePoint ៖ EquipmentWorkOrders — រាល់ជួរឈរកើតឡើងដើម្បីបម្រើជំហានរបស់មនុស្ស។",
      content: `<div class="card">
            <h3 class="card-title">📋 ជួរឈរក្នុងបញ្ជី SharePoint</h3>
            <table class="matrix-table" style="font-size: 0.82rem;">
              <thead>
                <tr>
                  <th>ឈ្មោះជួរឈរ</th>
                  <th>ប្រភេទទិន្នន័យ</th>
                  <th>តួនាទីក្នុងដំណើរការអាជីវកម្ម</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>Title</code></td>
                  <td><span class="badge-tag tag-cyan">Single line of text</span></td>
                  <td>លេខកូដសំបុត្រការងារតែមួយគត់ (ឧ. WO-1045)</td>
                </tr>
                <tr>
                  <td><code>MachineID</code></td>
                  <td><span class="badge-tag tag-amber">Choice</span></td>
                  <td>CNC-01, CNC-02, CNC-03, Lathe-01</td>
                </tr>
                <tr>
                  <td><code>Priority</code></td>
                  <td><span class="badge-tag tag-rose">Choice</span></td>
                  <td>Critical, High, Medium, Low</td>
                </tr>
                <tr>
                  <td><code>Status</code></td>
                  <td><span class="badge-tag tag-emerald">Choice</span></td>
                  <td>New, Dispatched, In Repair, Closed</td>
                </tr>
                <tr>
                  <td><code>RepairCost</code></td>
                  <td><span class="badge-tag tag-purple">Number</span></td>
                  <td>តម្លៃគ្រឿងបន្លាស់ជាដុល្លារសម្រាប់ Sum()</td>
                </tr>
                <tr>
                  <td><code>AssignedTech</code></td>
                  <td><span class="badge-tag tag-cyan">Person</span></td>
                  <td>គណនី Office 365 របស់ជាងជួសជុល</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="card">
            <h3 class="card-title">🛡️ ហេតុអ្វី Normalization ការពារកម្មវិធី?</h3>
            <ul style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; padding-left: 1.2rem;">
              <li><strong>ហេតុអ្វី Choice សម្រាប់ MachineID?</strong> បើកម្មករវាយអក្សរតាមចិត្ត ពួកគេនឹងវាយ 'CNC4', 'cnc-04', 'Machine #4'។ រូបមន្ត <code>Filter(WorkOrders, MachineID = 'CNC-04')</code> នឹងខូចភ្លាម!</li>
              <li><strong>ហេតុអ្វី Choice សម្រាប់ Priority?</strong> ធានាថាការតម្រៀប និងពណ៌សម្គាល់ដំណើរការត្រឹមត្រូវ ១០០% ដោយគ្មានកំហុសអក្ខរាវិរុទ្ធ។</li>
              <li><strong>ហេតុអ្វី Number សម្រាប់ RepairCost?</strong> អ្នកមិនអាចគណនា <code>Sum(WorkOrders, RepairCost)</code> លើវាលអក្សរបានឡើយ!</li>
              <li><strong>ហេតុអ្វី Person សម្រាប់ AssignedTech?</strong> ទាញយកអ៊ីមែល រូបថត និងប្រធានផ្នែកដោយស្វ័យប្រវត្តិតាមរយៈ Office 365។</li>
            </ul>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ស្រទាប់ទី ៣ Normalization (៣ នាទី) ៖</strong> "ពន្យល់ពីមូលហេតុដែលជួរឈរ Choice មានសារៈសំខាន់ជាដាច់ខាតសម្រាប់ឈ្មោះម៉ាស៊ីន និងអាទិភាព។ ប្រសិនបើកម្មករវាយតាមចិត្ត ការច្រោះទិន្នន័យនឹងបរាជ័យទាំងស្រុង! ជួរឈរ Choice បង្កើតវិន័យអាជីវកម្ម។"</p>`
    },

    // Slide 12 (Index 11): Layer 4: 3-Screen Enterprise Pattern
    {
      title: "ស្រទាប់ទី ៤ ៖ គំរូស្ថាបត្យកម្ម ៣ អេក្រង់ស្តង់ដារសហគ្រាស",
      segment: "ផ្នែកទី ៥ &bull; ស្ថាបត្យកម្មអេក្រង់",
      subtitle: "កុំបង្កើតអេក្រង់រញ៉េរញ៉ៃដល់ទៅ ២០ អេក្រង់។ ៩៥% នៃកម្មវិធីសហគ្រាសប្រើប្រាស់គំរូ ៣ អេក្រង់នេះ។",
      content: `<div class="screen-arch-grid">
          <div class="screen-card">
            <span class="screen-badge badge-browse">អេក្រង់ ១ &bull; Browse</span>
            <h4 style="color: #f8fafc; font-size: 1.05rem;">scr_BrowseWorkOrders</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5;">
              ផ្ទាំងគ្រប់គ្រងរោងចក្រកណ្តាល។ កម្មករ និងមេជាងស្វែងរកសំបុត្រសកម្មបានភ្លាមៗ។
            </p>
            <div style="background: rgba(0, 0, 0, 0.35); padding: 0.75rem; border-radius: 6px; font-size: 0.8rem; color: #cbd5e1;">
              &bull; <code>galWorkOrders.Items = Filter(...)</code><br>
              &bull; ប្រអប់ស្វែងរកតាមលេខម៉ាស៊ីន<br>
              &bull; ប៊ូតុង <code>+ New Work Order</code> (រុករកទៅអេក្រង់ ២)
            </div>
          </div>

          <div class="screen-card">
            <span class="screen-badge badge-create">អេក្រង់ ២ &bull; Create</span>
            <h4 style="color: #f8fafc; font-size: 1.05rem;">scr_CreateWorkOrder</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5;">
              ទម្រង់បែបបទទទួលព័ត៌មានស្អាត គ្មានការរំខាន សម្រាប់កម្មកររាយការណ៍ម៉ាស៊ីនខូច។
            </p>
            <div style="background: rgba(0, 0, 0, 0.35); padding: 0.75rem; border-radius: 6px; font-size: 0.8rem; color: #cbd5e1;">
              &bull; <code>frmCreateOrder.DataSource = WorkOrders</code><br>
              &bull; <code>Mode = FormMode.New</code> (សម្អាតកាតទទេទាំងអស់)<br>
              &bull; ប៊ូតុង Submit ជាមួយប្រព័ន្ធចាក់សោសុវត្ថិភាព
            </div>
          </div>

          <div class="screen-card">
            <span class="screen-badge badge-edit">អេក្រង់ ៣ &bull; Detail &amp; Edit</span>
            <h4 style="color: #f8fafc; font-size: 1.05rem;">scr_DetailEditWorkOrder</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5;">
              ផ្ទាំងការងារជាងជួសជុល។ អានព័ត៌មានលម្អិតចាស់ និងកត់ត្រាការជួសជុលជាក់ស្តែង។
            </p>
            <div style="background: rgba(0, 0, 0, 0.35); padding: 0.75rem; border-radius: 6px; font-size: 0.8rem; color: #cbd5e1;">
              &bull; <code>Item = galWorkOrders.Selected</code><br>
              &bull; <code>Mode = FormMode.Edit</code> (កែប្រែជួរចាស់ មិនស្ទួន)<br>
              &bull; <code>ResetForm()</code> ច្រកសុវត្ថិភាពបោះបង់ការកែប្រែ
            </div>
          </div>
        </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ស្រទាប់ទី ៤ គំរូ ៣ អេក្រង់ (៣ នាទី) ៖</strong> "ពន្យល់ពីមូលហេតុដែល ៣ អេក្រង់ជាស្តង់ដារមាស។ អេក្រង់ ១ អនុញ្ញាតឱ្យស្វែងរក និងរុករក។ អេក្រង់ ២ ផ្តល់ផ្ទាំងទទេស្អាតដើម្បីកត់ត្រាដោយគ្មានការរំខាន។ អេក្រង់ ៣ ផ្តល់ឱ្យជាងជួសជុលនូវបរិបទពេញលេញនៃកំណត់ត្រាដែលបានជ្រើសរើស។ វាស្អាត លឿន និងងាយស្រួលថែទាំ។"</p>`
    },

    // Slide 13 (Index 12): Layer 5: Business Rules & Power Fx
    {
      title: "ស្រទាប់ទី ៥ ៖ វិធានអាជីវកម្ម និងតក្កវិជ្ជាសម្រេចចិត្ត Power Fx",
      segment: "ផ្នែកទី ៦ &bull; តក្កវិជ្ជាសម្រេចចិត្ត",
      subtitle: "ការតភ្ជាប់ពីវិធានអាជីវកម្មរបស់មនុស្ស ទៅជាលក្ខខណ្ឌ True/False និងលក្ខណៈសម្បត្តិ Power Fx។",
      content: `<div class="card">
            <h3 class="card-title">⚙️ វិធានអាជីវកម្ម &rarr; រូបមន្ត Power Fx</h3>
            <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem;">
              <div style="background: rgba(12, 19, 31, 0.7); padding: 0.85rem; border-radius: 6px; border-left: 3px solid #f59e0b;">
                <strong style="color: #fcd34d; font-size: 0.85rem;">វិធាន ១ ៖ មិនអនុញ្ញាតឱ្យរក្សាទុកទិន្នន័យទទេឡើយ</strong>
                <p style="color: var(--text-muted); font-size: 0.8rem; margin: 0.25rem 0;">ចាក់សោប៊ូតុង Submit រហូតដល់ឈ្មោះម៉ាស៊ីន និងការពិពណ៌នាត្រូវបានបំពេញ។</p>
                <code style="color: #67e8f9; font-size: 0.8rem;">btnSubmit.DisplayMode = If(IsBlank(txtIssue.Text) Or IsBlank(cmbMachine.Selected), DisplayMode.Disabled, DisplayMode.Edit)</code>
              </div>

              <div style="background: rgba(12, 19, 31, 0.7); padding: 0.85rem; border-radius: 6px; border-left: 3px solid #ef4444;">
                <strong style="color: #fca5a5; font-size: 0.85rem;">វិធាន ២ ៖ បង្ហាញសញ្ញាអាសន្នក្រហមចំពោះករណីបន្ទាន់</strong>
                <p style="color: var(--text-muted); font-size: 0.8rem; margin: 0.25rem 0;">ស្លាកអាទិភាពប្តូរទៅជាពណ៌ក្រហម ប្រសិនបើ Priority ជា Critical។</p>
                <code style="color: #67e8f9; font-size: 0.8rem;">tagPriority.Fill = If(ThisItem.Priority.Value = "Critical", ColorValue("#ef4444"), ColorValue("#06b6d4"))</code>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">🔒 គោលការណ៍ស្ថាបត្យកម្មស្នូលទាំង ៣</h3>
            <ul style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; padding-left: 1.2rem;">
              <li><strong>ខ្សែសង្វាក់លក្ខខណ្ឌ (Condition Chain) ៖</strong> គ្រប់រូបមន្តសួរសំណួរ ➔ វាយតម្លៃ True/False ➔ បញ្ជាសកម្មភាព។</li>
              <li><strong>ការភ្ជាប់ទម្រង់បែបបទ (Form Binding) ៖</strong> <code>frmDetail.Item = galWorkOrders.Selected</code> ធានាថាមិនមានការស្ទួនទិន្នន័យពេលកែសម្រួល។</li>
              <li><strong>ការបោះបង់ដោយសុវត្ថិភាព ៖</strong> <code>ResetForm(frmDetail); Back()</code> បោះបង់ការផ្លាស់ប្តូរបណ្តោះអាសន្នដោយមិនបំពុលទិន្នន័យ។</li>
            </ul>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ស្រទាប់ទី ៥ តក្កវិជ្ជា (៣ នាទី) ៖</strong> "បំបែករចនាសម្ព័ន្ធរូបមន្ត។ លក្ខខណ្ឌជាភាសាសាមញ្ញ ➔ សំណួរ ➔ លទ្ធផល True/False ➔ សកម្មភាព។ បង្ហាញពីរបៀបដែល btnSubmit.DisplayMode ប្រើ If(IsBlank(...)) ដើម្បីទប់ស្កាត់កំណត់ត្រាទទេដោយផ្ទាល់។"</p>`
    },

    // Slide 14 (Index 13): Layers 6 & 7: Storage & Feedback
    {
      title: "ស្រទាប់ទី ៦ &amp; ៧ ៖ កន្លែងផ្ទុកលើក្លោដ និងប្រព័ន្ធឆ្លើយតបអ្នកប្រើប្រាស់",
      segment: "ផ្នែកទី ៧ &bull; កន្លែងផ្ទុក និងការផ្ទៀងផ្ទាត់",
      subtitle: "របៀបដែលទិន្នន័យត្រូវបានបញ្ជូនទៅកាន់ SharePoint និងរបៀបដែលអ្នកប្រើប្រាស់ទទួលបានការបញ្ជាក់។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ស្រទាប់ទី ៦ ៖ កន្លែងផ្ទុកក្លោដ</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">ការសរសេរទិន្នន័យតាម SubmitForm()</h4>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              នៅពេលប្រតិបត្តិករចុច Save រូបមន្ត <code>SubmitForm(frmOrder)</code> នឹងពិនិត្យមើល <code>Form.Mode</code> ៖
            </p>
            <ul style="color: var(--text-muted); font-size: 0.84rem; line-height: 1.6; padding-left: 1.2rem; margin-top: 0.5rem;">
              <li><strong>បើជា New ៖</strong> បញ្ជូន HTTP POST ➔ បង្កើតជួរថ្មី &amp; ផ្តល់លេខសម្គាល់ ID ថ្មីក្នុង SharePoint។</li>
              <li><strong>បើជា Edit ៖</strong> បញ្ជូន HTTP PATCH ➔ កែប្រែជួរចាស់ដែលត្រូវនឹង <code>Item.ID</code> ដោយមិនបង្កើតជួរស្ទួន!</li>
            </ul>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">ស្រទាប់ទី ៧ ៖ ប្រព័ន្ធឆ្លើយតបអ្នកប្រើ</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">ព្រឹត្តិការណ៍ Hooks ៖ OnSuccess &amp; OnFailure</h4>
            <div style="background: rgba(0, 0, 0, 0.35); padding: 0.85rem; border-radius: 6px; font-family: var(--font-code); font-size: 0.82rem; color: #86efac; margin-top: 0.5rem;">
              // frmOrder.OnSuccess<br>
              Notify("សំបុត្រការងារត្រូវបានរក្សាទុកក្នុង Cloud!", NotificationType.Success);<br>
              Navigate(scr_BrowseWorkOrders)
            </div>
            <div style="background: rgba(0, 0, 0, 0.35); padding: 0.85rem; border-radius: 6px; font-family: var(--font-code); font-size: 0.82rem; color: #fca5a5; margin-top: 0.5rem;">
              // frmOrder.OnFailure<br>
              Notify("ការរក្សាទុកបរាជ័យ ៖ " &amp; frmOrder.Error, NotificationType.Error)
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ស្រទាប់ទី ៦ &amp; ៧ (៣ នាទី) ៖</strong> "បញ្ជាក់ច្បាស់ថា SubmitForm() ធ្វើការងារធ្ងន់ទាំងអស់។ ប៉ុន្តែសូមគូសបញ្ជាក់អំពីព្រឹត្តិការណ៍ hooks ៖ OnSuccess ដំណើរការលុះត្រាតែ SharePoint បញ្ជាក់ការសរសេររួចរាល់! កុំដាក់ Notify() ក្នុង OnSelect របស់ប៊ូតុងឱ្យសោះ—ប្រសិនបើដាច់អ៊ីនធឺណិត ប៊ូតុងនឹងកុហកថា 'ជោគជ័យ' ទោះបីជាទិន្នន័យបាត់បង់ក៏ដោយ។"</p>`
    },

    // Slide 15 (Index 14): Interactive 7-Layer Architecture Simulator
    {
      title: "ឧបករណ៍ពិសោធន៍ស្ថាបត្យកម្ម ៧ ស្រទាប់ (Interactive Architecture Simulator)",
      segment: "ផ្នែកទី ៨ &bull; បន្ទប់ពិសោធន៍អន្តរកម្ម",
      subtitle: "ចុចលើផ្ទាំងស្រទាប់នីមួយៗខាងក្រោម ដើម្បីពិនិត្យមើលពីរបៀបដែលបញ្ហាគ្រឿងម៉ាស៊ីនប្រែទៅជាសមាសភាគកម្មវិធី។",
      content: `<div class="blueprint-sim">
          <div class="sim-nav-tabs">
            <button class="sim-tab-btn active" id="sim-tab-1" onclick="selectSimLayer(1)">១. បញ្ហា</button>
            <button class="sim-tab-btn" id="sim-tab-2" onclick="selectSimLayer(2)">២. ដំណើរការ</button>
            <button class="sim-tab-btn" id="sim-tab-3" onclick="selectSimLayer(3)">៣. ទិន្នន័យ</button>
            <button class="sim-tab-btn" id="sim-tab-4" onclick="selectSimLayer(4)">៤. អេក្រង់</button>
            <button class="sim-tab-btn" id="sim-tab-5" onclick="selectSimLayer(5)">៥. តក្កវិជ្ជា</button>
            <button class="sim-tab-btn" id="sim-tab-6" onclick="selectSimLayer(6)">៦. កន្លែងផ្ទុក</button>
            <button class="sim-tab-btn" id="sim-tab-7" onclick="selectSimLayer(7)">៧. ការឆ្លើយតប</button>
          </div>
          <div class="sim-stage-content" id="sim-layer-display">
            <!-- Populated dynamically by selectSimLayer(1) -->
          </div>
        </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ឧបករណ៍ពិសោធន៍អន្តរកម្ម (៣ នាទី) ៖</strong> "ចុចលើផ្ទាំងពី ១ ដល់ ៧ លើស្លាយ។ ចង្អុលបង្ហាញពីរបៀបដែលបញ្ហាម៉ូទ័របូមទឹកត្រជាក់ឡើងកម្តៅ ប្រែប្រួលយ៉ាងរលូនទៅជាជួរឈរ SharePoint បន្ទាប់មកទៅជាកាត EditForm បន្ទាប់មកទៅជាលក្ខខណ្ឌ If និងចុងក្រោយទៅជាបន្ទះជូនដំណឹងពណ៌បៃតង។"</p>`
    },

    // Slide 16 (Index 15): Trainer Live Demo: 1-Page Blueprint on Paper
    {
      title: "ការបង្ហាញផ្ទាល់ដោយគ្រូបង្វឹក ៖ ការគូរប្លង់មេ ១ ទំព័រលើក្រដាស",
      segment: "ផ្នែកទី ៩ &bull; ការបង្ហាញផ្ទាល់",
      subtitle: "មើលពីរបៀបដែលស្ថាបត្យករសូហ្វវែរគូរប្លង់មេពេញលេញ មុនពេលប៉ះ Power Apps Studio។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">ជំហាន ១ &bull; ៣ នាទី</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">ការឈឺចាប់ &amp; តួនាទី</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5;">
              កត់ត្រារោគសញ្ញាម៉ាស៊ីនជាក់លាក់ និងតួនាទីមនុស្សទាំង ៤ ៖ កម្មករ, មេជាង, ជាងជួសជុល, និងប្រធានផ្នែក។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">ជំហាន ២ &bull; ៣ នាទី</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">តារាង ៦ ជួរឈរ</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5;">
              គូសតារាងមាន ៦ ជួរឈរ។ កំណត់ Choice សម្រាប់ MachineID និង Priority; Number សម្រាប់ RepairCost។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ជំហាន ៣ &bull; ២ នាទី</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">ប្រអប់ ៣ អេក្រង់</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5;">
              គូសប្រអប់ ៣ ៖ Browse (Gallery) ➔ Create (NewForm) ➔ Detail/Edit (EditForm + galWorkOrders.Selected)។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc;">ជំហាន ៤ &bull; ២ នាទី</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">តក្កវិជ្ជាផ្ទៀងផ្ទាត់</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5;">
              សរសេរការត្រួតពិនិត្យ <code>IsBlank()</code> លើប៊ូតុងរក្សាទុក និងភ្ជាប់ <code>OnSuccess = Notify()</code>។
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការណែនាំការបង្ហាញផ្ទាល់ (៣ នាទី) ៖</strong> "រក្សា Power Apps Studio ឱ្យនៅបិទ! ប្រើក្រដាសមួយសន្លឹក ឬក្តារខៀនឌីជីថល។ បង្ហាញសិស្សពីរបៀបដែលអ្នកអាចកត់ត្រាចំណងជើងទាំង ៤ និងគូរប្លង់រចនាសម្ព័ន្ធកម្មវិធីទាំងមូលក្នុងរយៈពេល ១០ នាទី។ សង្កត់ធ្ងន់ ៖ 'ការចំណាយពេល ១០ នាទីគិត ជួយសន្សំពេល ១០ ម៉ោងក្នុងការលុប controls ខុសៗ។'"</p>`
    },

    // Slide 17 (Index 16): Guided Practice 1: Forklift Safety App
    {
      title: "ការអនុវត្តរួមគ្នា ៖ ប្រព័ន្ធត្រួតពិនិត្យសុវត្ថិភាពឡានលើក (បញ្ហា &amp; ដំណើរការ)",
      segment: "ផ្នែកទី ១០ &bull; ការអនុវត្តរួមគ្នា",
      subtitle: "លំហាត់សហការ ៖ រួមគ្នាគូសផែនទីការត្រួតពិនិត្យឃ្លាំង តាំងពីការឈឺចាប់ពិត រហូតដល់ជំហានផ្ទេរការងារ។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">ការឈឺចាប់ក្នុងឃ្លាំងទំនិញ</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">ហ្វ្រាំងឡានលើកទំនិញខូចនៅតំបន់ Zone B</h4>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              ឡានលើកទំនិញ ១២ គ្រឿងដំណើរការឆ្លងកាត់ ៣ វេនក្នុងឃ្លាំង។ កាលពីម្សិលមិញ ឡានលេខ FL-08 មានបញ្ហាខូចហ្វ្រាំង ប៉ុន្តែក្តារក្រដាសត្រួតពិនិត្យត្រូវទឹកកាហ្វេជោកជាំមើលមិនយល់។ អ្នកបើកបរវេនបន្ទាប់បានបើកបុកធ្នើទំនិញយ៉ាងធ្ងន់ធ្ងរ!
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">ការផ្ទេរការងារ ៣ ជំហានរបស់មនុស្ស</span>
            <div class="agenda-timeline" style="margin-top: 0.5rem;">
              <div class="agenda-row">
                <span class="agenda-time" style="color: #67e8f9;">ជំហាន ១ &bull; អ្នកបើកបរ</span>
                <div>អ្នកបើកបរចាប់ផ្តើមវេន ➔ ត្រួតពិនិត្យ ៥ ចំណុចលើថេប្លេតឌីជីថល។</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time" style="color: #ef4444;">ជំហាន ២ &bull; ច្រកទ្វារសុវត្ថិភាព</span>
                <div>បើមានចំណុចណាមួយមិនជាប់ (ឧ. ហ្វ្រាំង = Fail) ➔ ប្រព័ន្ធចាក់សោឡានភ្លាម!</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time" style="color: #86efac;">ជំហាន ៣ &bull; រោងជាងជួសជុល</span>
                <div>រោងជាងជួសជុលទទួលបានសាររោទិ៍បន្ទាន់ ➔ យកឡានទៅជួសជុលភ្លាម។</div>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការអនុវត្តរួមគ្នា ១ (៣ នាទី) ៖</strong> "ចូលរួមជាមួយសិស្សយ៉ាងសកម្ម។ សួរ ៖ 'តើនរណាជាអ្នកបើកបរឡានលើក? តើអ្វីខ្លះអាចខូច?' ណែនាំពួកគេឱ្យសរសេរដំណើរការ ៣ ជំហាន។ ធានាថាពួកគេយល់ពីមូលហេតុដែលការធ្លាក់ការធ្វើតេស្តហ្វ្រាំង ត្រូវតែចាក់សោរថយន្តភ្លាមៗ។"</p>`
    },

    // Slide 18 (Index 17): Guided Practice 2: Forklift Data Schema & Logic
    {
      title: "ការអនុវត្តរួមគ្នា ៖ ទម្រង់ទិន្នន័យ និងតក្កវិជ្ជានៃសុវត្ថិភាពឡានលើក",
      segment: "ផ្នែកទី ១០ &bull; ការអនុវត្តរួមគ្នា",
      subtitle: "ការកំណត់ប្រភេទជួរឈរ SharePoint និងការសរសេររូបមន្តចាក់សោសុវត្ថិភាព។",
      content: `<div class="card">
            <h3 class="card-title">📋 SharePoint Schema ៖ ForkliftInspections</h3>
            <ul style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.6; padding-left: 1.2rem;">
              <li><code>Title</code> (Text) ៖ លេខកូដត្រួតពិនិត្យ (ឧ. INSP-2026-08)</li>
              <li><code>ForkliftID</code> (Choice) ៖ FL-01 ដល់ FL-12</li>
              <li><code>BrakeCheck</code> (Choice) ៖ Pass, Fail</li>
              <li><code>BatteryPct</code> (Number) ៖ ភាគរយអាគុយពី 0 - 100</li>
              <li><code>InspectionStatus</code> (Choice) ៖ Safe, Locked Out, Under Repair</li>
            </ul>
          </div>

          <div class="card">
            <h3 class="card-title">🔒 រូបមន្ត Power Fx ចាក់សោសុវត្ថិភាព</h3>
            <div style="background: rgba(0, 0, 0, 0.35); padding: 0.85rem; border-radius: 6px; font-family: var(--font-code); font-size: 0.82rem; color: #fcd34d;">
              // គណនាស្ថានភាពចាក់សោសុវត្ថិភាព<br>
              If(<br>
              &nbsp;&nbsp;cmbBrakes.Selected.Value = "Fail" Or numBattery.Value &lt; 20,<br>
              &nbsp;&nbsp;"Locked Out",<br>
              &nbsp;&nbsp;"Safe to Operate"<br>
              )
            </div>
            <p style="color: var(--text-muted); font-size: 0.84rem; margin-top: 0.5rem;">
              កត់សម្គាល់ពីរបៀបដែលវិធានអាជីវកម្ម (ហ្វ្រាំងខូច ឬអាគុយក្រោម 20%) កំណត់តម្លៃទិន្នន័យដោយផ្ទាល់!
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការអនុវត្តរួមគ្នា ២ (៣ នាទី) ៖</strong> "ឱ្យសិស្សផ្ទៀងផ្ទាត់ប្រភេទជួរឈរ។ ហេតុអ្វីបានជា BatteryPct ជា Number? ពីព្រោះពេលក្រោយយើងចង់បង្កើតសាររោទិ៍ពេល BatteryPct &lt; 20! អ្នកមិនអាចប្រៀបធៀបអក្សរក្នុងតក្កវិជ្ជាគណិតវិទ្យាបានទេ។"</p>`
    },

    // Slide 19 (Index 18): Solo Challenge: Material Quarantine
    {
      title: "កិច្ចការស្វ័យសិក្សា ៖ ប្លង់ស្ថាបត្យកម្មប្រព័ន្ធឃាត់ទុកវត្ថុធាតុដើម (Raw Material Quarantine Blueprint)",
      segment: "ផ្នែកទី ១១ &bull; កិច្ចការស្វ័យសិក្សា",
      subtitle: "១០ នាទី ៖ រចនាប្លង់មេស្ថាបត្យកម្ម ៥ ស្រទាប់នៅលើក្រដាសព្រាងរបស់អ្នកដោយឯករាជ្យ។",
      content: `<div class="card">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">សេចក្តីសង្ខេបនៃបញ្ហាប្រឈម</span>
            <h4 style="color: #f8fafc; margin: 0.5rem 0;">ការដាក់ដាច់ដោយឡែកនូវដុំអាលុយមីញ៉ូមដែលច្រេះ</h4>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              នៅពេលឡានដឹកទំនិញមកដល់ឃ្លាំងទទួល បុគ្គលិកត្រូវតែត្រួតពិនិត្យដុំអាលុយមីញ៉ូមដែលបានដឹកមកដល់។ ប្រសិនបើមានច្រេះ ឬខូចទ្រង់ទ្រាយ បុគ្គលិកត្រូវដាក់ដុំអាលុយមីញ៉ូមទាំងនោះដាច់ដោយឡែកភ្លាមៗ ដើម្បីកុំឱ្យលោហៈខូចចូលទៅក្នុងឡស្ល។
            </p>
          </div>

          <div class="card">
            <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">លទ្ធផល ៥ យ៉ាងដែលត្រូវប្រគល់</span>
            <ul style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.6; padding-left: 1.2rem;">
              <li><strong>ស្រទាប់ទី ១ ៖</strong> សេចក្តីថ្លែងការណ៍ហានិភ័យអាជីវកម្ម ១ ប្រយោគ។</li>
              <li><strong>ស្រទាប់ទី ២ ៖</strong> ខ្សែសង្វាក់ផ្ទេរការងារ ៣ ជំហាន (ទទួល ➔ ត្រួតពិនិត្យ ➔ បង្វិលសង)។</li>
              <li><strong>ស្រទាប់ទី ៣ ៖</strong> ជួរឈរ SharePoint ៥ ជាមួយប្រភេទទិន្នន័យត្រឹមត្រូវ។</li>
              <li><strong>ស្រទាប់ទី ៤ ៖</strong> ឈ្មោះអេក្រង់ស្តង់ដារទាំង ៣ នៃប្រព័ន្ធសហគ្រាស។</li>
              <li><strong>ស្រទាប់ទី ៥ ៖</strong> រូបមន្តផ្ទៀងផ្ទាត់ Power Fx ១ លើប៊ូតុងរក្សាទុក។</li>
            </ul>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការសម្របសម្រួលកិច្ចការស្វ័យសិក្សា (២ នាទី) ៖</strong> "ទុកពេលឱ្យសិស្ស ១០ នាទីធ្វើការដោយស្ងប់ស្ងាត់។ សង្កេតមើលការវិវឌ្ឍរបស់ពួកគេ។ ពិនិត្យមើលថាតើពួកគេបានកំណត់ Supplier ជា Choice ឬអត់ និងថាតើពួកគេបានសរសេរការត្រួតពិនិត្យ IsBlank() លើប៊ូតុងរក្សាទុកដែរឬទេ។"</p>`
    },

    // Slide 20 (Index 19): 3 Beginner Misconceptions Demolished
    {
      title: "ការលុបបំបាត់ការយល់ខុស ៣ យ៉ាងរបស់អ្នកចាប់ផ្តើមដំបូង",
      segment: "ផ្នែកទី ១២ &bull; កែតម្រូវការយល់ដឹង",
      subtitle: "ការលះបង់ចោលនូវជំនឿមិនត្រឹមត្រូវ ដើម្បីបង្កើតសូហ្វវែរសហគ្រាសដែលមានស្ថិរភាព និងងាយស្រួលថែទាំ។",
      content: `<div class="card" style="border-top: 3px solid #ef4444;">
            <span class="card-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">ការយល់ខុសទី ១</span>
            <h4 style="color: #f87171; margin: 0.5rem 0;">"បង្កើត UI ជាមុន"</h4>
            <p style="color: var(--text-muted); font-size: 0.84rem; line-height: 1.5;">
              <strong>អន្ទាក់ ៖</strong> បើក Power Apps Studio ដើម្បីអូសប៊ូតុង និងរើសពណ៌ស្អាតៗភ្លាមៗ។<br><br>
              <strong>ការពិត ៖</strong> UI ដែលបង្កើតឡើងដោយគ្មានទម្រង់ទិន្នន័យ នឹងត្រូវលុបចោល ១០០%។ ត្រូវរចនាទិន្នន័យជាមុន!
            </p>
          </div>

          <div class="card" style="border-top: 3px solid #f59e0b;">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">ការយល់ខុសទី ២</span>
            <h4 style="color: #fbbf24; margin: 0.5rem 0;">"ប្រើអក្សរ (Text) សម្រាប់គ្រប់យ៉ាង"</h4>
            <p style="color: var(--text-muted); font-size: 0.84rem; line-height: 1.5;">
              <strong>អន្ទាក់ ៖</strong> បង្កើតជួរឈរ SharePoint ទាំងអស់ជា 'Single line of text' ដោយសារតែខ្ជិល។<br><br>
              <strong>ការពិត ៖</strong> អ្នកនឹងបំផ្លាញការតម្រៀប គណនា Sum() មិនកើត និងធ្វើឱ្យ filter ខូចដោយសារវាយខុស។
            </p>
          </div>

          <div class="card" style="border-top: 3px solid #06b6d4;">
            <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">ការយល់ខុសទី ៣</span>
            <h4 style="color: #67e8f9; margin: 0.5rem 0;">"កាន់តែច្រើនអេក្រង់ កាន់តែល្អ"</h4>
            <p style="color: var(--text-muted); font-size: 0.84rem; line-height: 1.5;">
              <strong>អន្ទាក់ ៖</strong> បង្កើតអេក្រង់រហូតដល់ ២០ សម្រាប់គ្រប់បំរែបំរួលតូចតាច។<br><br>
              <strong>ការពិត ៖</strong> ស្ទាត់ជំនាញគំរូ ៣ អេក្រង់។ វាដោះស្រាយបាន ៩៥% នៃលំហូរការងារអាជីវកម្មដោយគ្មានភាពស្មុគស្មាញ។
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការកែតម្រូវការយល់ខុស (៣ នាទី) ៖</strong> "បំផ្លាញទេវកថាទាំង ៣ ៖ (១) UI ជាមុន, (២) អក្សរសម្រាប់គ្រប់យ៉ាង, (៣) ២០ អេក្រង់។ ការអភិវឌ្ឍន៍កម្មវិធីទំនើបគឺអំពីភាពសាមញ្ញ វិន័យ និងការថែទាំប្រកបដោយចីរភាព។"</p>`
    },

    // Slide 21 (Index 20): Formative Assessment: Architecture Quiz
    {
      title: "ការត្រួតពិនិត្យចំណេះដឹងស្ថាបត្យកម្ម (Dual-State Inspector)",
      segment: "ផ្នែកទី ១៣ &bull; ការវាយតម្លៃចំណេះដឹង",
      subtitle: "សាកល្បងការគិតបែបស្ថាបត្យកម្មរបស់អ្នក។ ចុចលើជម្រើសណាមួយដើម្បីពិនិត្យមើលការពន្យល់បច្ចេកទេស។",
      content: `<div class="quiz-container">
          <div class="quiz-card">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;" id="quiz-q-num">សំណួរទី ១ នៃ ៥</span>
              <button class="hud-btn" id="quiz-next-btn" onclick="nextQuizQuestion()" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;">បន្ទាប់ &rarr;</button>
            </div>
            <h3 class="card-title" id="quiz-q-text" style="margin-top: 0.75rem; font-size: 1.15rem; line-height: 1.4;">អត្ថបទសំណួរ</h3>
            <div class="quiz-options" id="quiz-options-container">
              <!-- Dynamically populated by renderQuizQuestion() -->
            </div>
          </div>

          <div class="quiz-inspector-card" id="quiz-feedback-box">
            <div class="feedback-placeholder" id="quiz-placeholder">
              <span style="font-size: 2.5rem; color: var(--text-dim); margin-bottom: 0.5rem;">🔍</span>
              <h4 style="color: var(--text-muted);">សូមជ្រើសរើសចម្លើយមួយ</h4>
              <p style="font-size: 0.85rem; color: var(--text-dim); max-width: 280px; margin-top: 0.35rem;">
                ចុចលើជម្រើសណាមួយនៅខាងឆ្វេង ដើម្បីផ្ទៀងផ្ទាត់គោលការណ៍ស្ថាបត្យកម្ម។
              </p>
            </div>
            <div class="feedback-content" id="quiz-feedback-content">
              <span class="card-badge" id="quiz-feedback-badge" style="margin-bottom: 0.5rem;">លទ្ធផល</span>
              <h4 id="quiz-feedback-status" style="margin-bottom: 0.5rem; font-size: 1.1rem;">ស្ថានភាព</h4>
              <p id="quiz-feedback-text" style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.6;">ការពន្យល់លម្អិត</p>
            </div>
          </div>
        </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការសម្របសម្រួលសំណួរ (៣ នាទី) ៖</strong> "ណែនាំសិស្សឆ្លងកាត់សំណួរអន្តរកម្មទាំង ៥។ នៅពេលពួកគេចុចលើចម្លើយ សូមអានការពន្យល់លម្អិតឱ្យឮៗ។ ផ្តោតជាពិសេសលើសំណួរទី ២ (Number vs Text) និងសំណួរទី ៤ (OnSuccess vs OnSelect)។"</p>`
    },

    // Slide 22 (Index 21): Assessment Review & Synthesis
    {
      title: "សង្ខេបវិធានស្ថាបត្យកម្មមាសទាំង ៥",
      segment: "ផ្នែកទី ១៣ &bull; ការពិនិត្យស៊ីជម្រៅ",
      subtitle: "ចំណុចគន្លឹះស្នូលដែលអ្នកអភិវឌ្ឍន៍សហគ្រាសគ្រប់រូបត្រូវចងចាំមុនពេលចាប់ផ្តើមបង្កើត។",
      content: `<div class="card">
            <h3 class="card-title">🔑 វិធាន ១, ២ និង ៣</h3>
            <ul style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; padding-left: 1.2rem;">
              <li><strong>វិធាន ១ (បញ្ហាជាមុន) ៖</strong> បញ្ហាអាជីវកម្មកំណត់នូវការសម្រេចចិត្តរបស់មនុស្ស ដែលជាអ្នកបញ្ជាក់ថាទិន្នន័យអ្វីខ្លះត្រូវកត់ត្រាទុក។</li>
              <li><strong>វិធាន ២ (ជួរឈរមានប្រភេទត្រឹមត្រូវ) ៖</strong> កុំរក្សាទុកលេខ ឬកាលបរិច្ឆេទជាអក្សរឡើយ។ ប្រភេទទិន្នន័យត្រឹមត្រូវអនុញ្ញាតឱ្យតម្រៀប គណនា Sum() និងផ្ទៀងផ្ទាត់។</li>
              <li><strong>វិធាន ៣ (គំរូ ៣ អេក្រង់) ៖</strong> កំណត់ស្តង់ដារលើ Browse ➔ Create ➔ Detail/Edit សម្រាប់ ៩៥% នៃកម្មវិធីអាជីវកម្ម។</li>
            </ul>
          </div>

          <div class="card">
            <h3 class="card-title">🔑 វិធាន ៤, ៥ និងទស្សនៈស្នូល</h3>
            <ul style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; padding-left: 1.2rem;">
              <li><strong>វិធាន ៤ (OnSuccess Hooks) ៖</strong> ដាក់ការជូនដំណឹងអ្នកប្រើប្រាស់ក្នុង <code>Form.OnSuccess</code> កុំដាក់ក្នុង <code>OnSelect</code> នៃប៊ូតុងឱ្យសោះ!</li>
              <li><strong>វិធាន ៥ (ឧបករណ៍បញ្ជាតក្កវិជ្ជា) ៖</strong> Power Fx សួរសំណួរ វាយតម្លៃ True/False និងបញ្ជាសកម្មភាពដោយសុវត្ថិភាព។</li>
              <li><strong>ទស្សនៈស្នូល ៖</strong> ការចំណាយពេល ១០ នាទីគូរប្លង់លើក្រដាស ជួយសន្សំពេល ១០ ម៉ោងក្នុងការលុបប៊ូតុងខុសៗក្នុង Power Apps Studio។</li>
            </ul>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការពិនិត្យស៊ីជម្រៅ (២ នាទី) ៖</strong> "សំយោគវិធានមាសទាំង ៥។ សង្កត់ធ្ងន់ថាវិស្វកម្មសូហ្វវែរគឺជាវិន័យបញ្ញានៃការគិតប្រកបដោយរចនាសម្ព័ន្ធ មិនមែនជាការចុចប៊ូតុងដោយគ្មានផែនការនោះទេ។"</p>`
    },

    // Slide 23 (Index 22): Architectural Mastery Rubric
    {
      title: "រូបប៊្រិកវាយតម្លៃសមត្ថភាពស្ថាបត្យកម្ម ៣ កម្រិត",
      segment: "ផ្នែកទី ១៤ &bull; រូបប៊្រិកវាយតម្លៃ",
      subtitle: "វាស់វែងកម្រិតប្លង់មេរបស់អ្នកធៀបនឹងស្តង់ដារអភិវឌ្ឍន៍សហគ្រាស Microsoft ពិតប្រាកដ។",
      content: `<div class="card">
          <table class="rubric-table">
            <thead>
              <tr>
                <th>វិមាត្រ</th>
                <th>កម្រិត ១ ៖ អ្នកចាប់ផ្តើម (Novice)</th>
                <th>កម្រិត ២ ៖ អ្នកមានសមត្ថភាព (Competent)</th>
                <th>កម្រិត ៣ ៖ ស្ថាបត្យករជាន់ខ្ពស់ (Master Architect)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>ពីបញ្ហាទៅទម្រង់ទិន្នន័យ</strong></td>
                <td>បង្កើតជួរឈរឈ្មោះ Col1 ឬប្រើប្រាស់វាលអក្សរសម្រាប់គ្រប់យ៉ាង។</td>
                <td>ផ្គូផ្គងដំណើរការមនុស្សទៅជាជួរឈរមានប្រភេទច្បាស់ (Choice, Date, Number)។</td>
                <td>រៀបចំតារាងស្តង់ដារ លុបបំបាត់ភាពស្ទួន និងបន្ថែមជួរឈរសវនកម្មពេញលេញ។</td>
              </tr>
              <tr>
                <td><strong>គំរូអេក្រង់</strong></td>
                <td>បង្កើតអេក្រង់ដាច់ដោយឡែករហូតដល់ ១៥ ជាមួយប៊ូតុងស្ទួនគ្នា។</td>
                <td>ប្រើប្រាស់គំរូ ៣ អេក្រង់ស្តង់ដារ (Browse, Create, Edit)។</td>
                <td>បង្កើនល្បឿនប្រតិបត្តិការ ភ្ជាប់ gal.Selected និងផ្តល់ច្រកបោះបង់ស្អាត។</td>
              </tr>
              <tr>
                <td><strong>តក្កវិជ្ជា &amp; ការផ្ទៀងផ្ទាត់</strong></td>
                <td>គ្មានការផ្ទៀងផ្ទាត់; រក្សាទុកទិន្នន័យទទេ និងគាំងពេលគ្មានទិន្នន័យ។</td>
                <td>ចាក់សោប៊ូតុង Submit ដោយប្រើលក្ខខណ្ឌ <code>IsBlank()</code>។</td>
                <td>ផ្ទៀងផ្ទាត់ច្រើនវាល បង្ហាញពណ៌អាសន្នតាមលក្ខខណ្ឌ និងប្រើប្រាស់ OnSuccess hooks។</td>
              </tr>
            </tbody>
          </table>
        </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការពិនិត្យរូបប៊្រិក (២ នាទី) ៖</strong> "បង្ហាញសិស្សនូវកម្រិតសមត្ថភាពទាំង ៣ ៖ អ្នកចាប់ផ្តើម, អ្នកមានសមត្ថភាព, និងស្ថាបត្យករជាន់ខ្ពស់។ លើកទឹកចិត្តពួកគេថា តាមរយៈការអនុវត្តតាមក្របខ័ណ្ឌ ៧ ស្រទាប់ ពួកគេកំពុងស្ថិតក្នុងកម្រិតទី ២ (អ្នកមានសមត្ថភាព) រួចទៅហើយ!"</p>`
    },

    // Slide 24 (Index 23): Wrap-Up & Bridge Forward to Day 26
    {
      title: "សេចក្តីសង្ខេប ៖ ឥឡូវនេះអ្នកគឺជាស្ថាបត្យករសូហ្វវែរម្នាក់!",
      segment: "ផ្នែកទី ១៥ &bull; សំយោគ និងស្ពានចម្លង",
      subtitle: "ជោគជ័យស្ថាបត្យកម្មថ្ងៃនេះ និងការត្រៀមខ្លួនសម្រាប់ការអនុវត្តបង្កើតជាក់ស្តែងនៅថ្ងៃស្អែក។",
      content: `<div class="card" style="border-left: 3px solid #06b6d4;">
            <h3 class="card-title">🎯 ជោគជ័យថ្ងៃនេះ (ស្ថាបត្យកម្ម)</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              អ្នកបានស្ទាត់ជំនាញខ្សែសង្វាក់វិស្វកម្ម ៧ ស្រទាប់ពេញលេញ ៖
            </p>
            <div style="margin-top: 0.75rem; padding: 0.75rem; background: rgba(6, 182, 212, 0.1); border-radius: 6px; font-family: var(--font-code); font-size: 0.84rem; color: #67e8f9;">
              បញ្ហា &rarr; ដំណើរការ &rarr; ទិន្នន័យ &rarr; អេក្រង់ &rarr; តក្កវិជ្ជា &rarr; កន្លែងផ្ទុក &rarr; ការឆ្លើយតប
            </div>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; margin-top: 0.75rem;">
              រាល់ប៊ូតុង ជួរឈរ និងរូបមន្ត សុទ្ធតែមានហេតុផលច្បាស់លាស់ក្នុងការកកើតឡើង។ អ្នកនឹងមិនបង្កើតជួរស្ទួន ឬមហន្តរាយផ្ទាំងទទេទៀតឡើយ។
            </p>
          </div>

          <div class="card" style="border-left: 3px solid #f59e0b;">
            <h3 class="card-title">🌉 ស្ពានចម្លងទៅថ្ងៃស្អែក ៖ ថ្ងៃទី ២៦</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              ថ្ងៃស្អែកយើងនឹងបើក Power Apps Studio ហើយប្រែក្លាយប្លង់មេលើក្រដាសរបស់យើងទៅជាសូហ្វវែរមានជីវិត!
            </p>
            <div style="margin-top: 0.75rem; padding: 0.75rem; background: rgba(245, 158, 11, 0.1); border-radius: 6px; font-family: var(--font-code); font-size: 0.84rem; color: #fcd34d;">
              ថ្ងៃស្អែក ៖ ការអនុវត្តផ្ទាល់ពីដើមដល់ចប់ (Day 26)<br>
              យើងនឹងបង្កើតកម្មវិធីថែទាំគ្រឿងម៉ាស៊ីន ៣ អេក្រង់ជាក់ស្តែង ដោយផ្អែកលើប្លង់មេថ្ងៃទី ២៥ នេះ!
            </div>
            <p style="color: #fcd34d; font-size: 0.85rem; font-weight: bold; margin-top: 0.75rem;">
              សូមយកប្លង់មេថ្ងៃទី ២៥ របស់អ្នកមកជាមួយ — ថ្ងៃស្អែកយើងចាប់ផ្តើមសាងសង់!
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ស្ពានចម្លងទៅមុខ (២ នាទី) ៖</strong> "អបអរសាទរចំពោះការបញ្ចប់ថ្ងៃទី ២៥ របស់ពួកគេ! សង្ខេប ៖ 'ថ្ងៃនេះ អ្នកបានក្លាយជាស្ថាបត្យករម្នាក់។ ថ្ងៃស្អែកក្នុងថ្ងៃទី ២៦ យើងនឹងបើក Power Apps Studio ហើយបង្កើតប្រព័ន្ធនេះផ្ទាល់ពីកម្រិតដំបូង។ ជួបគ្នានៅថ្ងៃស្អែក!'"</p>`
    }
  ];

  // --------------------------------------------------------------------------
  // 2. ENGLISH SPEAKER NOTES (24 SLIDES)
  // --------------------------------------------------------------------------
  const ENGLISH_NOTES = {
    0: "<h4>TRAINER SPEAKING NOTES:</h4><p><strong>Opening Hook (2 min):</strong> 'Welcome to Day 25! Today marks our transition into Phase 8: Project Architecture. For the past 24 days, you learned individual carpentry tools: hammer, saw, measuring tape. Today, someone asked us to build a house. We do NOT pick up the hammer first. We open our blueprints.'</p><p><strong>Core Connection:</strong> Point to the mental model chain: REAL PROBLEM -> PROCESS -> DATA -> UI/SCREEN -> LOGIC/DECISION -> ACTION -> STORAGE -> FEEDBACK -> TEST. Today is about ensuring every button, column, and formula traces back to an authentic business requirement.</p>",
    1: "<h4>AGENDA OVERVIEW:</h4><p>Notice our 8-phase spiral schedule. We spend 15 minutes on live demonstration, 15 minutes on guided practice, and 10 minutes on independent architectural drafting. 80% of our time is spent thinking and structuring; only 20% on clicking.</p>",
    2: "<h4>JOURNEY SYNTHESIS:</h4><p>Review the 4 historical eras: UI Controls (Days 1-5), Logic (Days 6-10), SharePoint (Days 17-20), and CRUD (Days 21-24). Each day added one layer of the puzzle. Today, all puzzle pieces assemble into an enterprise system.</p>",
    3: "<h4>ACTIVE RETRIEVAL:</h4><p>Call on three different students. Check 1: Variables vanish on app close; SharePoint records live forever in the cloud. Check 2: Items (plural) = Gallery; Item (singular) = Form. Check 3: IsBlank validation stops corrupted garbage from entering the company database.</p>",
    4: "<h4>STORYTELLING & EMOTION:</h4><p>Apex Precision manufactures $8,000 turbine blades. The junior developer opened Power Apps with no plan: columns named Col1, text fields for machine names. An overheating coolant pump ticket was duplicated and lost. A $45,000 spindle melted down, halting the line for 48 hours. Software development is not dragging rectangles; it is structuring business truth.</p>",
    5: "<h4>CONCEPT DEMYSTIFICATION:</h4><p>Go row by row. 'Business Requirement' is just 'What hurts'; 'Data Schema' is just 'Memory Buckets'; 'Power Fx' is just the 'Traffic Rules' that keep people from crashing.</p>",
    6: "<h4>REAL-WORLD ANALOGY 1:</h4><p>Ask students: 'What happens if a restaurant builder installs the stove in the middle of the hallway before knowing what the chef cooks?' Chaos, collisions, and burns! Architecture ensures tools are placed where human movement is natural.</p>",
    7: "<h4>REAL-WORLD ANALOGY 2:</h4><p>Explain why first-come-first-served fails in an ER. A cardiac arrest patient cannot wait behind a mild sprain. This is why we have data prioritization and conditional formatting in galleries: critical items must float to the top in bright red.</p>",
    8: "<h4>MASTER ARCHITECTURE PIPELINE:</h4><p>Walk across the 7-node pipeline. Have students chant the sequence with you: 'Problem ➔ Process ➔ Data ➔ Screen ➔ Logic ➔ Storage ➔ Test'. Drill the rule: you cannot skip a layer. Building a screen before knowing the data schema is guaranteed failure.</p>",
    9: "<h4>LAYERS 1 & 2 DEEP DIVE:</h4><p>Show how we interview operators. We don't ask 'What buttons do you want?' We ask: 'What is stopping you from doing your job?' Notice the 4 human roles: Operator, Lead Tech, Technician, Supervisor. Each role has a distinct responsibility.</p>",
    10: "<h4>LAYER 3 NORMALIZATION:</h4><p>Explain why choice fields are mandatory for machine names and priority. If operators type free text, they type 'CNC4', 'cnc-04', 'Machine #4'. The filter will fail! Choice columns enforce business discipline.</p>",
    11: "<h4>LAYER 4 THE 3-SCREEN PATTERN:</h4><p>Explain why 3 screens is the golden standard. Screen 1 lets you find and browse. Screen 2 gives you a clean slate to submit without distractions. Screen 3 gives technicians the full context of the selected record. It is clean, fast, and easy to maintain.</p>",
    12: "<h4>LAYER 5 DECISION LOGIC:</h4><p>Break down the formula structure. Plain-English condition ➔ Question ➔ True/False result ➔ Action. Show how btnSubmit.DisplayMode uses If(IsBlank(...)) to physically prevent empty records.</p>",
    13: "<h4>LAYERS 6 & 7 STORAGE & FEEDBACK:</h4><p>Clarify that SubmitForm() does the heavy lifting. But highlight the event hooks: OnSuccess runs only when SharePoint confirms the write! Never put Notify() inside the button's OnSelect—if the internet is disconnected, the button will lie and say 'Success!' even though data was lost.</p>",
    14: "<h4>INTERACTIVE SIMULATOR GUIDE:</h4><p>Click through the tabs 1 to 7 on the slide. Point out how the problem of an overheating coolant pump smoothly transforms into a SharePoint column, then an EditForm card, then an If condition, and finally a green notification banner.</p>",
    15: "<h4>LIVE DEMONSTRATION SCRIPT:</h4><p>Keep Power Apps Studio closed! Use a piece of paper or digital notepad. Show students how fast you can write down the 4 headings and draft the entire app structure in 10 minutes. Emphasize: '10 minutes of thinking saves 10 hours of deleting bad controls.'</p>",
    16: "<h4>GUIDED PRACTICE PART 1:</h4><p>Engage the learner actively. Ask: 'Who drives the forklift? What can break?' Guide them to write the 3-step process. Ensure they understand why failing a brake test must trigger a lockout.</p>",
    17: "<h4>GUIDED PRACTICE PART 2:</h4><p>Have students verify column types. Why is BatteryPct a Number? Because later we want to alert when BatteryPct &lt; 20! You cannot compare text in mathematical logic.</p>",
    18: "<h4>SOLO CHALLENGE FACILITATION:</h4><p>Give the student 10 minutes of quiet working time. Observe their progress. Check if they made Supplier a Choice column and whether they wrote an IsBlank() check on the submit button.</p>",
    19: "<h4>MISCONCEPTION BUSTING:</h4><p>Debunk the 3 myths: (1) UI first, (2) Text for everything, (3) 20 screens. Explain that modern app development is about simplicity and discipline, not visual clutter.</p>",
    20: "<h4>QUIZ FACILITATION:</h4><p>Guide the student through the 5 interactive questions. When they click an answer, read the detailed explanation out loud. Highlight Question 2 (Number vs Text) and Question 4 (DataCard validation).</p>",
    21: "<h4>DEEP REVIEW:</h4><p>Synthesize the 5 golden rules. Emphasize that software engineering is an intellectual discipline of structured thought, not impulsive clicking.</p>",
    22: "<h4>RUBRIC REVIEW:</h4><p>Show students the 3 levels of competence: Novice, Competent, Master Architect. Encourage them that by following the 7-layer framework, they are already operating at Level 2 (Competent)!</p>",
    23: "<h4>FORWARD BRIDGE TO DAY 26:</h4><p>Celebrate their completion of Day 25! Summarize: 'Today, you became an architect. Tomorrow on Day 26, we open Power Apps Studio and build this exact system from scratch. See you tomorrow!'</p>"
  };

  // --------------------------------------------------------------------------
  // 3. INTERACTIVE 7-LAYER SIMULATOR DATA (ENGLISH & KHMER)
  // --------------------------------------------------------------------------
  const ARCH_SIM_DATA = {
    1: {
      layer: "Layer 1: Real Business Problem",
      badge: "The Root Pain",
      title: "CNC Coolant Pump Overheating ($45,000 Risk)",
      content: "Coolant pump motors on Line 2 overheat after 4 hours of heavy milling. If the spindle runs without coolant, turbine blades warp ($8,000 defect) and the machine spindle burns out ($45,000 replacement + 48 hours plant downtime).",
      output: "Core Goal: Operators must instantly flag overheating pumps before spindle damage occurs."
    },
    2: {
      layer: "Layer 2: Human Process Flow",
      badge: "The 4 Hand-Offs",
      title: "From Amber Warning to Verified Restart",
      content: "1. Operator sees 85&deg;C amber light ➔ Submits digital incident.<br>2. Maintenance Lead receives high-priority mobile alert ➔ Assigns technician Dara.<br>3. Tech Dara flushes pump valve ➔ Logs $120 replacement gasket.<br>4. Supervisor tests coolant pressure ➔ Signs off ➔ Machine returns to production.",
      output: "Hand-off Chain: Operator ➔ Lead ➔ Tech ➔ Supervisor."
    },
    3: {
      layer: "Layer 3: Normalized Data Schema",
      badge: "SharePoint List: WorkOrders",
      title: "Strict Containers & Data Types",
      content: "&bull; <code>Title</code> (Text): Unique Work Order ID (e.g., WO-1045)<br>&bull; <code>MachineID</code> (Choice): CNC-01, CNC-02, CNC-03, Lathe-01<br>&bull; <code>Priority</code> (Choice): Critical, High, Medium, Low<br>&bull; <code>Status</code> (Choice): New, Dispatched, In Repair, Resolved, Closed<br>&bull; <code>RepairCost</code> (Number): Parts cost in USD<br>&bull; <code>AssignedTech</code> (Person): Office 365 User Account",
      output: "Normalized columns prevent typos, duplicate entries, and sorting failures."
    },
    4: {
      layer: "Layer 4: UI & Screen Architecture",
      badge: "The 3-Screen Master Pattern",
      title: "Focused Workstations for Each Persona",
      content: "&bull; <code>scr_BrowseWorkOrders</code>: Responsive Gallery of active tickets with search bar and red priority tags.<br>&bull; <code>scr_CreateWorkOrder</code>: Fast shop-floor intake form in <code>FormMode.New</code> with big dropdowns.<br>&bull; <code>scr_DetailEditWorkOrder</code>: Technician workbench in <code>FormMode.Edit</code> bound to <code>galWorkOrders.Selected</code>.",
      output: "3 purposeful screens replace 20 cluttered pages."
    },
    5: {
      layer: "Layer 5: Power Fx Logic & Rules",
      badge: "The Traffic Controller",
      title: "Enforcing Safety & Preventing Blanks",
      content: "&bull; <strong>Validation Rule:</strong> <code>btnSubmit.DisplayMode = If(IsBlank(txtIssue.Text) Or IsBlank(cmbMachine.Selected), DisplayMode.Disabled, DisplayMode.Edit)</code><br>&bull; <strong>Visual Alarm:</strong> <code>shpPriority.Fill = If(ThisItem.Priority.Value = 'Critical', ColorValue('#ef4444'), ColorValue('#38bdf8'))</code><br>&bull; <strong>Cost Lockout:</strong> Parts cost card is hidden until status is set to 'In Repair'.",
      output: "The app actively protects the company database from human error."
    },
    6: {
      layer: "Layer 6: Cloud Storage & Event Hooks",
      badge: "SharePoint Integration",
      title: "Executing Writes & Capturing Responses",
      content: "&bull; <strong>Trigger:</strong> <code>SubmitForm(frmWorkOrder)</code> pushes all card values across the connector.<br>&bull; <strong>OnSuccess Hook:</strong> <code>Notify('Work order saved to cloud!', NotificationType.Success); Navigate(scr_Browse)</code><br>&bull; <strong>OnFailure Hook:</strong> <code>Notify('Connection lost: ' & frmWorkOrder.Error, NotificationType.Error)</code>",
      output: "Records are permanently recorded in SharePoint with full audit logging."
    },
    7: {
      layer: "Layer 7: Audit Feedback & User Acceptance",
      badge: "The Reality Check",
      title: "Live Edge-Case Verification",
      content: "&bull; <strong>Test 1:</strong> Submit with empty machine name ➔ Verify button stays locked.<br>&bull; <strong>Test 2:</strong> Mark as Critical ➔ Verify ticket appears at the top of the gallery in red.<br>&bull; <strong>Test 3:</strong> Disconnect WiFi and submit ➔ Verify OnFailure red banner alerts the user.",
      output: "The system is proven unbreakable before deployment to factory workers."
    }
  };

  const ARCH_SIM_DATA_KH = {
    1: {
      layer: "ស្រទាប់ទី ១ ៖ បញ្ហាអាជីវកម្មពិត",
      badge: "ការឈឺចាប់ដើមហេតុ",
      title: "ម៉ូទ័របូមទឹកត្រជាក់ CNC ឡើងកម្តៅខ្លាំង (ហានិភ័យ $45,000)",
      content: "ម៉ូទ័របូមទឹកត្រជាក់លើខ្សែសង្វាក់ទី ២ ឡើងកម្តៅខ្លាំងក្រោយដំណើរការ ៤ ម៉ោង។ បើ Spindle ដំណើរការដោយគ្មានទឹកត្រជាក់ ស្លាបទួរប៊ីននឹងខូច ($8,000) ហើយ Spindle ម៉ាស៊ីននឹងរលាយគាំង ($45,000 ជំនួស + ផ្អាករោងចក្រ ៤៨ ម៉ោង)។",
      output: "គោលដៅស្នូល ៖ កម្មករត្រូវតែអាចរាយការណ៍អំពីការឡើងកម្តៅភ្លាមៗ មុនពេល Spindle រលាយខូច។"
    },
    2: {
      layer: "ស្រទាប់ទី ២ ៖ លំហូរដំណើរការរបស់មនុស្ស",
      badge: "ការផ្ទេរការងារ ៤ ជំហាន",
      title: "ពីភ្លើងសញ្ញាអាសន្ន រហូតដល់ការដំណើរការម៉ាស៊ីនឡើងវិញ",
      content: "១. កម្មករឃើញភ្លើងលឿង 85&deg;C ➔ បញ្ជូនរបាយការណ៍ឌីជីថលភ្លាមៗ។<br>២. មេជាងទទួលបានសាររោទិ៍អាទិភាពខ្ពស់ ➔ ចាត់តាំងជាងដារ៉ា។<br>៣. ជាងដារ៉ាលាងសម្អាតវ៉ានបូមទឹក ➔ កត់ត្រាថ្លៃគ្រឿងបន្លាស់ $120។<br>៤. ប្រធានផ្នែកត្រួតពិនិត្យសម្ពាធទឹក ➔ ចុះហត្ថលេខា ➔ ម៉ាស៊ីនដំណើរការឡើងវិញ។",
      output: "ខ្សែសង្វាក់ផ្ទេរការងារ ៖ កម្មករ ➔ មេជាង ➔ ជាងជួសជុល ➔ ប្រធានផ្នែក។"
    },
    3: {
      layer: "ស្រទាប់ទី ៣ ៖ ទម្រង់ទិន្នន័យស្តង់ដារ",
      badge: "បញ្ជី SharePoint ៖ WorkOrders",
      title: "ធុងផ្ទុក និងប្រភេទទិន្នន័យច្បាស់លាស់",
      content: "&bull; <code>Title</code> (Text) ៖ លេខកូដសំបុត្រការងារតែមួយគត់ (ឧ. WO-1045)<br>&bull; <code>MachineID</code> (Choice) ៖ CNC-01, CNC-02, CNC-03, Lathe-01<br>&bull; <code>Priority</code> (Choice) ៖ Critical, High, Medium, Low<br>&bull; <code>Status</code> (Choice) ៖ New, Dispatched, In Repair, Resolved, Closed<br>&bull; <code>RepairCost</code> (Number) ៖ តម្លៃគ្រឿងបន្លាស់ជាដុល្លារ<br>&bull; <code>AssignedTech</code> (Person) ៖ គណនី Office 365 របស់ជាង",
      output: "ជួរឈរស្តង់ដារការពារកុំឱ្យវាយអក្សរខុស ការស្ទួនទិន្នន័យ និងការបរាជ័យក្នុងការតម្រៀប។"
    },
    4: {
      layer: "ស្រទាប់ទី ៤ ៖ ស្ថាបត្យកម្មអេក្រង់ & UI",
      badge: "គំរូមេ ៣ អេក្រង់",
      title: "ស្ថានីយការងារច្បាស់លាស់សម្រាប់តួនាទីនីមួយៗ",
      content: "&bull; <code>scr_BrowseWorkOrders</code> ៖ Gallery ឆ្លើយតបរហ័ស បង្ហាញសំបុត្រសកម្ម ជាមួយប្រអប់ស្វែងរក និងផ្លាកអាទិភាពក្រហម។<br>&bull; <code>scr_CreateWorkOrder</code> ៖ ទម្រង់បែបបទរហ័សក្នុង <code>FormMode.New</code> ជាមួយ Dropdown ធំៗស្រួលចុច។<br>&bull; <code>scr_DetailEditWorkOrder</code> ៖ ផ្ទាំងការងារជាងក្នុង <code>FormMode.Edit</code> ភ្ជាប់ជាមួយ <code>galWorkOrders.Selected</code>។",
      output: "អេក្រង់គោលដៅ ៣ ជំនួសឱ្យអេក្រង់រញ៉េរញ៉ៃ ២០។"
    },
    5: {
      layer: "ស្រទាប់ទី ៥ ៖ វិធាន & តក្កវិជ្ជា Power Fx",
      badge: "អ្នកគ្រប់គ្រងចរាចរណ៍",
      title: "ការអនុវត្តសុវត្ថិភាព និងការទប់ស្កាត់ទិន្នន័យទទេ",
      content: "&bull; <strong>វិធានផ្ទៀងផ្ទាត់ ៖</strong> <code>btnSubmit.DisplayMode = If(IsBlank(txtIssue.Text) Or IsBlank(cmbMachine.Selected), DisplayMode.Disabled, DisplayMode.Edit)</code><br>&bull; <strong>សញ្ញាអាសន្ន ៖</strong> <code>shpPriority.Fill = If(ThisItem.Priority.Value = 'Critical', ColorValue('#ef4444'), ColorValue('#38bdf8'))</code><br>&bull; <strong>ចាក់សោតម្លៃ ៖</strong> លាក់កាតចំណាយជួសជុលរហូតដល់ស្ថានភាពប្តូរជា 'In Repair'។",
      output: "កម្មវិធីការពារមូលដ្ឋានទិន្នន័យក្រុមហ៊ុនពីកំហុសរបស់មនុស្សយ៉ាងសកម្ម។"
    },
    6: {
      layer: "ស្រទាប់ទី ៦ ៖ កន្លែងផ្ទុក Cloud & ព្រឹត្តិការណ៍",
      badge: "ការរួមបញ្ចូល SharePoint",
      title: "ការបញ្ជូនទិន្នន័យ និងការចាប់យកលទ្ធផល",
      content: "&bull; <strong>ការបញ្ជា ៖</strong> <code>SubmitForm(frmWorkOrder)</code> បញ្ជូនតម្លៃកាតទាំងអស់ឆ្លងកាត់ Connector។<br>&bull; <strong>OnSuccess Hook ៖</strong> <code>Notify('បានរក្សាទុកក្នុង Cloud ដោយជោគជ័យ!', NotificationType.Success); Navigate(scr_Browse)</code><br>&bull; <strong>OnFailure Hook ៖</strong> <code>Notify('បរាជ័យក្នុងការតភ្ជាប់ ៖ ' & frmWorkOrder.Error, NotificationType.Error)</code>",
      output: "កំណត់ត្រាត្រូវបានកត់ត្រាជារៀងរហូតក្នុង SharePoint ជាមួយប្រវត្តិសវនកម្មពេញលេញ។"
    },
    7: {
      layer: "ស្រទាប់ទី ៧ ៖ ការឆ្លើយតប & ការសាកល្បងជាក់ស្តែង",
      badge: "ការផ្ទៀងផ្ទាត់ការពិត",
      title: "ការសាកល្បងករណីពិសេសជាក់ស្តែង",
      content: "&bull; <strong>តេស្តទី ១ ៖</strong> ចុច Save ដោយទុកឈ្មោះម៉ាស៊ីនទទេ ➔ ផ្ទៀងផ្ទាត់ថាប៊ូតុងនៅតែចាក់សោជាប់។<br>&bull; <strong>តេស្តទី ២ ៖</strong> ជ្រើសរើស Priority = Critical ➔ ផ្ទៀងផ្ទាត់ថាសំបុត្រលោតទៅលើគេក្នុង Gallery ជាមួយពណ៌ក្រហម។<br>&bull; <strong>តេស្តទី ៣ ៖</strong> បិទ WiFi រួចចុច Save ➔ ផ្ទៀងផ្ទាត់ថា OnFailure បង្ហាញបន្ទះក្រហមជូនដំណឹងដល់អ្នកប្រើ។",
      output: "ប្រព័ន្ធត្រូវបានបញ្ជាក់ថាមិនអាចបំបែកបាន មុនពេលដាក់ឱ្យកម្មករប្រើប្រាស់ក្នុងរោងចក្រ។"
    }
  };

  // --------------------------------------------------------------------------
  // 4. FORMATIVE ASSESSMENT QUIZ DATA (ENGLISH & KHMER)
  // --------------------------------------------------------------------------
  const QUIZ_QUESTIONS = [
    {
      question: "Why must an architect define the business problem before creating SharePoint columns?",
      options: [
        "Because Power Apps Studio will crash if you open it first.",
        "Because the problem determines what human decisions must be made, which dictates what data facts must be recorded.",
        "Because SharePoint only allows column creation in alphabetical order.",
        "Because business problems automatically write Power Fx formulas."
      ],
      correct: 1,
      explanation: "Correct! The business problem determines the human decisions, which determines what facts we need. If you create columns first, you will end up recording useless data and forgetting critical audit fields."
    },
    {
      question: "What happens if a developer creates a SharePoint column called 'Cost' as 'Single line of text' instead of 'Number'?",
      options: [
        "The computer will automatically convert text to numbers without any issue.",
        "You cannot use Sum() or Average(), and sorting will fail (e.g., '$100' sorts before '$20' alphabetically).",
        "The form will refuse to submit any data.",
        "The currency symbol will turn into an error icon."
      ],
      correct: 1,
      explanation: "Correct! In text fields, numbers are sorted alphabetically like words ('100' comes before '20', just like 'apple' comes before 'banana'). You also lose the ability to calculate monthly repair budgets using Sum()."
    },
    {
      question: "Why do enterprise Power Apps architects standardize on the '3-Screen Master Pattern' (Browse ➔ Create ➔ Detail/Edit)?",
      options: [
        "Because Microsoft Power Apps limits all apps to exactly 3 screens.",
        "Because 3 screens cover 95% of business CRUD workflows while preventing app lag, navigation bugs, and user confusion.",
        "Because 3-screen apps use 50% less internet bandwidth.",
        "Because forms cannot exist on the same screen as galleries."
      ],
      correct: 1,
      explanation: "Correct! A 3-screen architecture keeps apps blazing fast, easy for factory operators to learn, and drastically simplifies maintenance for the developer."
    },
    {
      question: "Where should the user feedback formula Notify('Saved successfully!', NotificationType.Success) be placed?",
      options: [
        "Inside the Submit button's OnSelect property right before SubmitForm().",
        "Inside the Form's OnSuccess event property.",
        "Inside the App's OnStart property.",
        "Inside the Screen's OnVisible property."
      ],
      correct: 1,
      explanation: "Correct! OnSuccess triggers ONLY when SharePoint confirms the record has landed safely in cloud storage. If you put Notify in the button OnSelect, it will falsely tell the user 'Saved!' even if their WiFi dropped."
    },
    {
      question: "In our 7-layer architectural mental model, what is the exact role of Power Fx in Layer 5?",
      options: [
        "To replace the SharePoint database.",
        "To act as the traffic controller: asking questions about data, enforcing validation, and choosing actions.",
        "To design the CSS color palette and fonts.",
        "To automatically restart machines on the shop floor."
      ],
      correct: 1,
      explanation: "Correct! Power Fx is the decision engine. It asks questions (Conditions), evaluates True/False, and directs actions (DisplayMode, Visible, SubmitForm, Notify)."
    }
  ];

  const QUIZ_QUESTIONS_KH = [
    {
      question: "ហេតុអ្វីបានជាស្ថាបត្យករត្រូវកំណត់បញ្ហាអាជីវកម្ម មុនពេលបង្កើតជួរឈរក្នុង SharePoint?",
      options: [
        "ដោយសារតែ Power Apps Studio នឹងគាំង ប្រសិនបើអ្នកបើកវាជាមុន។",
        "ដោយសារតែបញ្ហាអាជីវកម្មកំណត់នូវការសម្រេចចិត្តរបស់មនុស្ស ដែលជាអ្នកបញ្ជាក់ថាទិន្នន័យអ្វីខ្លះត្រូវកត់ត្រាទុក។",
        "ដោយសារតែ SharePoint អនុញ្ញាតឱ្យបង្កើតជួរឈរតាមលំដាប់អក្សរតែប៉ុណ្ណោះ។",
        "ដោយសារតែបញ្ហាអាជីវកម្មនឹងសរសេររូបមន្ត Power Fx ដោយស្វ័យប្រវត្តិ។"
      ],
      correct: 1,
      explanation: "ត្រឹមត្រូវហើយ! បញ្ហាអាជីវកម្មកំណត់នូវការសម្រេចចិត្តរបស់មនុស្ស ដែលជាអ្នកបញ្ជាក់ថាយើងត្រូវការទិន្នន័យអ្វីខ្លះ។ ប្រសិនបើអ្នកបង្កើតជួរឈរមុន អ្នកនឹងកត់ត្រាទិន្នន័យឥតប្រយោជន៍ និងភ្លេចវាលទិន្នន័យសវនកម្មសំខាន់ៗ។"
    },
    {
      question: "តើមានអ្វីកើតឡើង ប្រសិនបើអ្នកអភិវឌ្ឍន៍បង្កើតជួរឈរ 'Cost' ជា 'Single line of text' ជំនួសឱ្យ 'Number'?",
      options: [
        "កុំព្យូទ័រនឹងបំប្លែងអក្សរទៅជាលេខដោយស្វ័យប្រវត្តិដោយគ្មានបញ្ហាអ្វីឡើយ។",
        "អ្នកមិនអាចប្រើរូបមន្ត Sum() ឬ Average() បានឡើយ ហើយការតម្រៀបនឹងខុស (ឧទាហរណ៍ '$100' នឹងនៅមុខ '$20' ព្រោះតម្រៀបតាមតួអក្សរ)។",
        "ទម្រង់បែបបទ (Form) នឹងបដិសេធមិនព្រមរក្សាទុកទិន្នន័យទាំងអស់។",
        "និមិត្តសញ្ញារូបិយប័ណ្ណនឹងប្រែទៅជារូបតំណាងកំហុស (Error icon)។"
      ],
      correct: 1,
      explanation: "ត្រឹមត្រូវហើយ! នៅក្នុងវាលអក្សរ លេខត្រូវបានតម្រៀបតាមលំដាប់អក្ខរក្រមដូចពាក្យ ('100' មកមុន '20' ដូចពាក្យ 'ក' មកមុន 'ខ')។ លើសពីនេះ អ្នកនឹងបាត់បង់សមត្ថភាពក្នុងការគណនាថវិកាសរុបដោយប្រើ Sum()!"
    },
    {
      question: "ហេតុអ្វីបានជាស្ថាបត្យករ Power Apps សហគ្រាសនិយមកំណត់យក 'គំរូ ៣ អេក្រង់ស្តង់ដារ' (Browse ➔ Create ➔ Detail/Edit)?",
      options: [
        "ដោយសារតែ Microsoft Power Apps កំណត់ឱ្យកម្មវិធីទាំងអស់មានត្រឹមតែ ៣ អេក្រង់ប៉ុណ្ណោះ។",
        "ដោយសារតែ ៣ អេក្រង់នេះគ្របដណ្តប់ ៩៥% នៃលំហូរការងារ CRUD អាជីវកម្ម ព្រមទាំងការពារភាពយឺតយ៉ាវ កំហុសរុករក និងការភ័ន្តច្រឡំរបស់អ្នកប្រើប្រាស់។",
        "ដោយសារតែកម្មវិធី ៣ អេក្រង់ប្រើប្រាស់អ៊ីនធឺណិតតិចជាងមុន ៥០%។",
        "ដោយសារតែ Form មិនអាចស្ថិតនៅលើអេក្រង់តែមួយជាមួយ Gallery បានឡើយ។"
      ],
      correct: 1,
      explanation: "ត្រឹមត្រូវហើយ! ស្ថាបត្យកម្ម ៣ អេក្រង់ធ្វើឱ្យកម្មវិធីដំណើរការលឿនបំផុត ងាយស្រួលសម្រាប់កម្មកររោងចក្រក្នុងការរៀនប្រើប្រាស់ និងជួយសម្រួលដល់ការថែទាំរបស់អ្នកអភិវឌ្ឍន៍យ៉ាងច្រើន។"
    },
    {
      question: "តើរូបមន្តឆ្លើយតបទៅកាន់អ្នកប្រើប្រាស់ Notify('រក្សាទុកដោយជោគជ័យ!', NotificationType.Success) គួរដាក់នៅទីតាំងណា?",
      options: [
        "នៅក្នុង OnSelect នៃប៊ូតុង Submit មុនពេល SubmitForm()។",
        "នៅក្នុងព្រឹត្តិការណ៍ OnSuccess របស់ Form។",
        "នៅក្នុង OnStart របស់ App។",
        "នៅក្នុង OnVisible របស់ Screen។"
      ],
      correct: 1,
      explanation: "ត្រឹមត្រូវហើយ! OnSuccess នឹងដំណើរការលុះត្រាតែ SharePoint បានបញ្ជាក់ថាទិន្នន័យបានទៅដល់កន្លែងផ្ទុកលើក្លោដដោយសុវត្ថិភាព។ ប្រសិនបើអ្នកដាក់ក្នុង OnSelect នៃប៊ូតុង វានឹងប្រាប់អ្នកប្រើប្រាស់ថា 'រក្សាទុកជោគជ័យ!' ទោះបីជាដាច់អ៊ីនធឺណិតក៏ដោយ!"
    },
    {
      question: "នៅក្នុងម៉ូដែលស្ថាបត្យកម្ម ៧ ស្រទាប់របស់យើង តើតួនាទីពិតប្រាកដរបស់ Power Fx ក្នុងស្រទាប់ទី ៥ គឺជាអ្វី?",
      options: [
        "ដើម្បីជំនួសមូលដ្ឋានទិន្នន័យ SharePoint។",
        "ដើម្បីដើរតួជាអ្នកគ្រប់គ្រងចរាចរណ៍ ៖ សួរសំណួរអំពីទិន្នន័យ អនុវត្តវិធានផ្ទៀងផ្ទាត់ និងជ្រើសរើសសកម្មភាព។",
        "ដើម្បីរចនាពណ៌ CSS និងពុម្ពអក្សរ។",
        "ដើម្បីបញ្ឆេះម៉ាស៊ីនក្នុងរោងចក្រឡើងវិញដោយស្វ័យប្រវត្តិ។"
      ],
      correct: 1,
      explanation: "ត្រឹមត្រូវហើយ! Power Fx គឺជាម៉ាស៊ីនសម្រេចចិត្ត។ វាតែងតែសួរសំណួរ (Conditions), វាយតម្លៃលទ្ធផល True/False, និងបញ្ជាសកម្មភាព (DisplayMode, Visible, SubmitForm, Notify)។"
    }
  ];

  let currentQuizIndex = 0;
  let quizAnswered = false;

  // --------------------------------------------------------------------------
  // 5. CAPTURE ORIGINAL ENGLISH SLIDES (Zero Layout Shift Engine)
  // --------------------------------------------------------------------------
  function captureEnglishOriginals() {
    const slides = document.querySelectorAll('.slide');
    ENGLISH_SLIDES = Array.from(slides).map((slide, idx) => {
      const headerTitle = slide.querySelector('.slide-header h2') || slide.querySelector('.hero-title');
      const headerSubtitle = slide.querySelector('.slide-header .subtitle') || slide.querySelector('.hero-subtitle');
      const sectionTag = slide.querySelector('.section-tag') || slide.querySelector('.hero-badge');
      const contentEl = slide.querySelector('.slide-content');
      const notesEl = slide.querySelector('.trainer-notes');

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
    if (currentSlideIndex === 14) {
      selectSimLayer(1);
    }
    if (currentSlideIndex === 20) {
      renderQuizQuestion();
    }

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

    // Trigger simulator setup if on Slide 15 (index 14)
    if (currentSlideIndex === 14) {
      selectSimLayer(1);
    }

    // Trigger quiz setup if on Slide 21 (index 20)
    if (currentSlideIndex === 20) {
      renderQuizQuestion();
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
      const segment = data ? (data.segment || slide.getAttribute('data-segment')) : (slide.getAttribute('data-segment') || 'Day 25');

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
  // 13. INTERACTIVE SIMULATOR: 7-LAYER BLUEPRINT
  // --------------------------------------------------------------------------
  window.selectSimLayer = function (layerNum) {
    const dataSource = isKhmerActive ? ARCH_SIM_DATA_KH : ARCH_SIM_DATA;
    const layer = dataSource[layerNum];
    if (!layer) return;

    // Update active tab buttons
    for (let i = 1; i <= 7; i++) {
      const tab = document.getElementById('sim-tab-' + i);
      if (tab) tab.classList.toggle('active', i === layerNum);
    }

    // Render content into display
    const display = document.getElementById('sim-layer-display');
    const impactLabel = isKhmerActive ? 'ផលប៉ះពាល់ស្ថាបត្យកម្ម ៖ ' : 'Architectural Impact: ';

    if (display) {
      display.innerHTML =
        '<div style=\"display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;\">' +
          '<span class=\"badge-tag tag-cyan\" style=\"font-size: 0.85rem; padding: 4px 10px;\">' + layer.badge + '</span>' +
          '<span style=\"color: #94a3b8; font-size: 0.85rem; font-weight: 600;\">' + layer.layer + '</span>' +
        '</div>' +
        '<h3 style=\"color: #f8fafc; font-size: 1.25rem; margin-bottom: 10px;\">' + layer.title + '</h3>' +
        '<p style=\"color: #cbd5e1; line-height: 1.7; font-size: 0.92rem; margin-bottom: 14px;\">' + layer.content + '</p>' +
        '<div style=\"background: rgba(6, 182, 212, 0.12); border-left: 3px solid #06b6d4; padding: 10px 14px; border-radius: 6px;\">' +
          '<strong style=\"color: #38bdf8; font-size: 0.85rem;\">' + impactLabel + '</strong>' +
          '<span style=\"color: #e2e8f0; font-size: 0.85rem;\">' + layer.output + '</span>' +
        '</div>';
    }
  };

  // --------------------------------------------------------------------------
  // 14. FORMATIVE ASSESSMENT QUIZ ENGINE
  // --------------------------------------------------------------------------
  function renderQuizQuestion() {
    const qList = isKhmerActive ? QUIZ_QUESTIONS_KH : QUIZ_QUESTIONS;
    const qData = qList[currentQuizIndex];
    if (!qData) return;

    quizAnswered = false;
    const qNumElem = document.getElementById('quiz-q-num');
    const qTextElem = document.getElementById('quiz-q-text');
    const optionsContainer = document.getElementById('quiz-options-container');
    const feedbackBox = document.getElementById('quiz-feedback-box');
    const placeholder = document.getElementById('quiz-placeholder');
    const content = document.getElementById('quiz-feedback-content');

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

    const nextBtn = document.getElementById('quiz-next-btn');
    if (nextBtn) {
      nextBtn.textContent = isKhmerActive ? 'បន្ទាប់ \u2192' : 'Next \u2192';
    }

    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      qData.options.forEach((optText, optIdx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.innerHTML = '<strong>' + String.fromCharCode(65 + optIdx) + '.</strong> ' + optText;
        btn.onclick = function () { handleQuizAnswer(optIdx); };
        optionsContainer.appendChild(btn);
      });
    }
  }

  window.handleQuizAnswer = function (selectedIdx) {
    if (quizAnswered) return;
    quizAnswered = true;

    const qList = isKhmerActive ? QUIZ_QUESTIONS_KH : QUIZ_QUESTIONS;
    const qData = qList[currentQuizIndex];
    const optionsContainer = document.getElementById('quiz-options-container');
    const feedbackBox = document.getElementById('quiz-feedback-box');
    const placeholder = document.getElementById('quiz-placeholder');
    const content = document.getElementById('quiz-feedback-content');
    const badge = document.getElementById('quiz-feedback-badge');
    const statusElem = document.getElementById('quiz-feedback-status');
    const textElem = document.getElementById('quiz-feedback-text');
    const nextBtn = document.getElementById('quiz-next-btn');

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
  };

  window.nextQuizQuestion = function () {
    const qList = isKhmerActive ? QUIZ_QUESTIONS_KH : QUIZ_QUESTIONS;
    currentQuizIndex++;
    if (currentQuizIndex >= qList.length) {
      currentQuizIndex = 0;
    }
    renderQuizQuestion();
  };

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
      case 'Hero':
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

  window.selectSimLayer = window.selectSimLayer;
  window.handleQuizAnswer = window.handleQuizAnswer;
  window.nextQuizQuestion = window.nextQuizQuestion;

  window.addEventListener('keydown', handleKeyDown);

  // --------------------------------------------------------------------------
  // 17. BOOTSTRAP INITIALIZATION
  // --------------------------------------------------------------------------
  function initPresentation() {
    captureEnglishOriginals();
    initPointerAndSpotlight();
    updateProgress();
    updateCounter();
    updateTimerDisplay();

    // Initialize Simulator
    if (window.selectSimLayer) window.selectSimLayer(1);
    // Initialize Quiz
    renderQuizQuestion();

    console.log('Day 25 Presentation Engine initialized successfully with 24 full bilingual slides!');
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
