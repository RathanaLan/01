/* ============================================================================
   POWER APPS FOUNDATION: DAY 23 PRESENTATION ENGINE
   Topic: Create Records: From User Input to Saved Data
   Phase: CRUD Operations (Create)
   Theme: Microsoft Fluent 2 Dark Mode (Create Emerald & Power Fx Cyan)
   Architecture: Zero-Shift Bilingual DOM Engine & Interactive Simulators
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

  // Simulator State
  let currentSimStep = 1;

  // --------------------------------------------------------------------------
  // 2. KHMER SLIDES DATA STORE (100% Exact 1-to-1 DOM Mirroring)
  // --------------------------------------------------------------------------
  const KHMER_SLIDES = [
    // Slide 1: Hero
    {
      title: "បង្កើតកំណត់ត្រាថ្មី ៖ ពីការវាយបញ្ចូលរបស់អ្នកប្រើប្រាស់ ទៅកាន់ទិន្នន័យដែលបានរក្សាទុក",
      segment: "ដំណាក់កាលទី ៧ ៖ ប្រតិបត្តិការ CRUD",
      subtitle: "ការតភ្ជាប់ទម្រង់បញ្ចូលទិន្នន័យ (Form), ការផ្ទៀងផ្ទាត់ (Validation) និងការរក្សាទុកក្នុង SharePoint បង្កើតជាលំហូរ Create ដ៏រឹងមាំ។",
      content: `<div class="hero-badge">
            <span>កម្មវិធីសិក្សា Microsoft Power Apps</span>
            <span>&bull;</span>
            <span>ថ្ងៃទី ២៣ នៃ ២៧</span>
          </div>
          <h1 class="hero-title">បង្កើតកំណត់ត្រាថ្មី ៖ ពីការបញ្ចូលទិន្នន័យ ទៅការរក្សាទុក</h1>
          <p class="hero-subtitle">
            ការតភ្ជាប់ទម្រង់បញ្ចូលទិន្នន័យ (Form), ការផ្ទៀងផ្ទាត់ (Validation) និងការរក្សាទុកក្នុង SharePoint បង្កើតជាលំហូរ Create ដ៏រឹងមាំ។
          </p>

          <div class="model-chain">
            <span class="chain-item">បញ្ហាពិត</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ដំណើរការ</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ទិន្នន័យ</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">UI/អេក្រង់</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item active">NewForm()</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item active">ផ្ទៀងផ្ទាត់</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item active">SubmitForm()</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item active">រក្សាទុកក្នុង SP</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item active">OnSuccess ឆ្លើយតប</span>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការបើកមេរៀន (២ នាទី) ៖</strong> សូមស្វាគមន៍មកកាន់ថ្ងៃទី ២៣! កាលពីម្សិលមិញ យើងបានរៀនអំពី Form ដែលបង្ហាញទិន្នន័យដែលមានស្រាប់។ ប៉ុន្តែចុះបើមានម៉ាស៊ីនខូចថ្មីមួយដែលមិនធ្លាប់មានក្នុងប្រព័ន្ធពីមុនមក? តើយើងបង្កើតជួរទិន្នន័យថ្មីនោះដោយរបៀបណា? ថ្ងៃនេះ យើងនឹងរៀនអំពីអក្សរ "C" ក្នុង CRUD គឺ Create!</p>`
    },

    // Slide 2: Objectives & Agenda
    {
      title: "របៀបវារៈ ៩០ នាទី និងគោលបំណងរៀនសូត្រច្បាស់លាស់",
      segment: "ផ្នែកទី ១ &bull; គោលបំណង និងរបៀបវារៈ",
      subtitle: "រចនាសម្ព័ន្ធបង្រៀនជាវង់ (Spiral Learning) បង្កើតឡើងសម្រាប់អ្នករៀនពីកម្រិតសូន្យ។",
      content: `<div class="card">
            <h3 class="card-title">🎯 ជំនាញស្នូលទាំង ៤ សម្រាប់ថ្ងៃនេះ</h3>
            <div class="objective-item">
              <span class="obj-num">1</span>
              <div>
                <strong>ស្វែងយល់ពីវដ្តជីវិតនៃការបង្កើត (Create Lifecycle) ៖</strong>
                <p>តាមដានដំណើរការដែល <code>NewForm()</code> លុបសម្អាតទិន្នន័យចាស់ រៀបចំ Card និងទទួលទិន្នន័យថ្មី។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">2</span>
              <div>
                <strong>ដំណើរការ <code>SubmitForm()</code> ប្រកបដោយសុវត្ថិភាព ៖</strong>
                <p>រុញទិន្នន័យពី DataCards ចូលទៅក្នុងជួរថ្មីនៃ SharePoint ដោយគ្មានការបាត់បង់ទិន្នន័យ។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">3</span>
              <div>
                <strong>កំណត់ការឆ្លើយតបតាម <code>OnSuccess</code> ៖</strong>
                <p>ដាក់ <code>Notify()</code> នៅក្នុងព្រឹត្តិការណ៍របស់ Form ជាជាងដាក់លើប៊ូតុង ដើម្បីការពារការជូនដំណឹងក្លែងក្លាយ។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">4</span>
              <div>
                <strong>ទាញយកលេខសម្គាល់ដែលប្រព័ន្ធបង្កើត ៖</strong>
                <p>ស្រង់តម្លៃដែល SharePoint បង្កើតដូចជា <code>Form.LastSubmit.ID</code> ដើម្បីបង្ហាញលេខសំបុត្រជួសជុល។</p>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">⏱️ កាលវិភាគលម្អិត ៩០ នាទី</h3>
            <div class="timeline-item">
              <span class="time-badge">00-10m</span>
              <div><strong>រំលឹក និងម៉ូដែលគំនិត ៖</strong> រំលឹកថ្ងៃទី ១៧, ១៩, ២២ និងការប្រៀបធៀបម៉ាស៊ីន ATM</div>
            </div>
            <div class="timeline-item">
              <span class="time-badge">10-25m</span>
              <div><strong>វិបត្តិជាក់ស្តែង ៖</strong> ផ្សិតចាក់ជ័រខូចខាត $45,000 និងខ្សែសង្វាក់ Create</div>
            </div>
            <div class="timeline-item">
              <span class="time-badge">25-45m</span>
              <div><strong>ការបង្ហាញផ្ទាល់របស់គ្រូ ៖</strong> ការភ្ជាប់ <code>NewForm</code>, <code>SubmitForm</code>, និង <code>OnSuccess</code></div>
            </div>
            <div class="timeline-item">
              <span class="time-badge">45-65m</span>
              <div><strong>ការអនុវត្តមានការណែនាំ ៖</strong> បង្កើតអេក្រង់រាយការណ៍ការខូចខាតម៉ាស៊ីន</div>
            </div>
            <div class="timeline-item">
              <span class="time-badge">65-80m</span>
              <div><strong>កិច្ចការស្វ័យសិក្សា ៖</strong> បង្កើតប្រព័ន្ធរាយការណ៍ការកកស្ទះប្រអប់ជាមួយ <code>LastSubmit.ID</code></div>
            </div>
            <div class="timeline-item">
              <span class="time-badge">80-90m</span>
              <div><strong>សំណួរផ្ទៀងផ្ទាត់ និងស្ពានចម្លង ៖</strong> សំណួរពិនិត្យចំណេះដឹង ៥ និងមើលត្រួសៗថ្ងៃទី ២៤</div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការកំណត់ការរំពឹងទុក ៖</strong> ថ្ងៃនេះជាថ្ងៃដែលកម្មវិធីរបស់សិស្សចាប់ផ្តើមមានអន្តរកម្មពិតប្រាកដពីរផ្លូវ គឺមិនត្រឹមតែអានទិន្នន័យទេ ថែមទាំងអាចបញ្ចូលទិន្នន័យថ្មីទៅក្នុង Cloud ទៀតផង!</p>`
    },

    // Slide 3: Concept Map Recap
    {
      title: "ផែនទីគំនិតតភ្ជាប់ ៖ ដំណើរឆ្ពោះមកកាន់ថ្ងៃទី ២៣",
      segment: "ផ្នែកទី ១ &bull; ការរួមបញ្ចូលកម្មវិធីសិក្សា",
      subtitle: "គ្រប់មេរៀនដែលបានរៀនពីមុន ត្រូវបានផ្គុំចូលគ្នាបង្កើតជាលំហូរការងារអាជីវកម្មពេញលេញ។",
      content: `<div class="card" style="border-left: 3px solid #10b981;">
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem;">
              <div style="background: rgba(15, 23, 42, 0.6); padding: 1.15rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">ថ្ងៃទី ១១ និង ១៩</span>
                <h4 style="color: #f8fafc; margin: 0.5rem 0;">SharePoint Storage</h4>
                <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
                  បង្កើតបញ្ជីទិន្នន័យដែលមានជួរឈរ៖ Title, Priority, Department និងលេខ ID អូតូ។
                </p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.6); padding: 1.15rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
                <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">ថ្ងៃទី ១៧</span>
                <h4 style="color: #f8fafc; margin: 0.5rem 0;">Validation Logic</h4>
                <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
                  រៀន <code>IsBlank()</code>, ការវាយតម្លៃ True/False និងការសម្រេចចិត្តឆ្លើយតបតាម <code>Notify()</code>។
                </p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.6); padding: 1.15rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
                <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c4b5fd;">ថ្ងៃទី ២១ និង ២២</span>
                <h4 style="color: #f8fafc; margin: 0.5rem 0;">Gallery &amp; Form</h4>
                <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
                  Gallery បង្ហាញកំណត់ត្រាច្រើន; Form បង្ហាញកំណត់ត្រាមួយតាមរយៈ <strong>DataCards</strong>។
                </p>
              </div>

              <div style="background: rgba(16, 185, 129, 0.15); padding: 1.15rem; border-radius: 8px; border: 1px solid rgba(16, 185, 129, 0.4);">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.25); color: #86efac;">ថ្ងៃនេះ (ថ្ងៃ ២៣)</span>
                <h4 style="color: #34d399; margin: 0.5rem 0;">Create Flow (CRUD)</h4>
                <p style="color: #ecfdf5; font-size: 0.86rem; line-height: 1.5;">
                  <code>NewForm</code> រៀបចំក្តារស្អាត; <code>SubmitForm</code> រក្សាទុកជួរថ្មីចូល SharePoint ជាអចិន្ត្រៃយ៍!
                </p>
              </div>
            </div>

            <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(16, 185, 129, 0.08); border-radius: 8px; text-align: center; border: 1px dashed rgba(16, 185, 129, 0.3);">
              <span style="color: #a7f3d0; font-weight: 600; font-size: 0.95rem;">
                វិធានមាស ៖ កាលពីម្សិលមិញ យើងពិនិត្យមើលទិន្នន័យដែលមានស្រាប់។ ថ្ងៃនេះ យើងបង្កើតទិន្នន័យថ្មីស្រឡាងដែលស្ថិតស្ថេររហូត!
              </span>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការតភ្ជាប់គំនិត ៖</strong> ចង្អុលបង្ហាញសិស្សថាគ្រប់បំណែកនៃរូបមន្តដែលយើងរៀនពីមុន (IsBlank, Notify, Columns) ឥឡូវត្រូវបានដំឡើងចូលទៅក្នុងយន្តការ Create តែមួយ។</p>`
    },

    // Slide 4: Retrieval Questions
    {
      title: "សំណួររំលឹកចំណេះដឹងចាស់ ៖ បើកដំណើរការគ្រឹះមុនៗ",
      segment: "ផ្នែកទី ២ &bull; ការរំលឹកចំណេះដឹង",
      subtitle: "ចុចលើកាតនីមួយៗដើម្បីបង្ហាញចម្លើយ និងគោលការណ៍ស្ថាបត្យកម្មគ្រឹះ។",
      content: `<div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-inner">
              <div class="flip-front">
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ១</span>
                <h4 style="color: #f8fafc; margin-top: 1rem;">Gallery.Items vs Form.Item</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 0.5rem;">
                  តើអ្វីជាភាពខុសគ្នាជាមូលដ្ឋានរវាង Property <code>Items</code> និង <code>Item</code>?
                </p>
                <div class="tap-hint">ចុចដើម្បីត្រឡប់ &rarr;</div>
              </div>
              <div class="flip-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ចម្លើយទី ១</span>
                <p style="color: #ecfdf5; font-size: 0.92rem; margin-top: 0.8rem; line-height: 1.6;">
                  <strong>Items (ពហុវចនៈ)</strong> ជារបស់ Gallery ហើយត្រូវការ <strong>Table</strong> ដែលមានកំណត់ត្រាច្រើន។<br><br>
                  <strong>Item (ឯកវចនៈ)</strong> ជារបស់ Form ហើយត្រូវការ <strong>កំណត់ត្រាតែមួយគត់</strong>។
                </p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-inner">
              <div class="flip-front">
                <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">សំណួរទី ២</span>
                <h4 style="color: #f8fafc; margin-top: 1rem;">ការវាយតម្លៃ IsBlank()</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 0.5rem;">
                  នៅពេលអ្នកប្រើប្រាស់ទុកប្រអប់បញ្ចូលអត្ថបទឱ្យនៅទទេ តើ <code>IsBlank(txtTitle.Text)</code> ផ្តល់តម្លៃអ្វី?
                </p>
                <div class="tap-hint">ចុចដើម្បីត្រឡប់ &rarr;</div>
              </div>
              <div class="flip-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ចម្លើយទី ២</span>
                <p style="color: #ecfdf5; font-size: 0.92rem; margin-top: 0.8rem; line-height: 1.6;">
                  វាផ្តល់តម្លៃ Boolean <strong>true</strong>! ក្នុងថ្ងៃទី ១៧ យើងបានដឹងថាតម្លៃ True នឹងដំណើរការលក្ខខណ្ឌផ្ទៀងផ្ទាត់របស់យើង។
                </p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-inner">
              <div class="flip-front">
                <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c4b5fd;">សំណួរទី ៣</span>
                <h4 style="color: #f8fafc; margin-top: 1rem;">ភាពស្ថិតស្ថេរនៃ SharePoint</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 0.5rem;">
                  តើមានអ្វីកើតឡើងចំពោះជួរទិន្នន័យក្នុង SharePoint ពេលអ្នកប្រើប្រាស់បិទម៉ាស៊ីន ឬលុប App ចោល?
                </p>
                <div class="tap-hint">ចុចដើម្បីត្រឡប់ &rarr;</div>
              </div>
              <div class="flip-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ចម្លើយទី ៣</span>
                <p style="color: #ecfdf5; font-size: 0.92rem; margin-top: 0.8rem; line-height: 1.6;">
                  <strong>គ្មានការបាត់បង់ទិន្នន័យឡើយ!</strong> ក្នុងថ្ងៃទី ១៩ យើងបានបញ្ជាក់ថា SharePoint ជា Cloud Database អចិន្ត្រៃយ៍។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការពិនិត្យការយល់ដឹង ៖</strong> ឱ្យសិស្សឆ្លើយមុននឹងចុចត្រឡប់កាតនីមួយៗ ដើម្បីបញ្ជាក់ថាសិស្សចាំភាពខុសគ្នារវាង Items និង Item។</p>`
    },

    // Slide 5: The Why Crisis
    {
      title: "វិបត្តិជាក់ស្តែងក្នុងរោងចក្រ ៖ ការកកកកិតផ្សិតចាក់ជ័រខាតបង់ $45,000",
      segment: "ផ្នែកទី ៣ &bull; ហេតុអ្វីបានជាត្រូវរៀនមេរៀននេះ",
      subtitle: "ហេតុអ្វីបានជាការបញ្ចូលទិន្នន័យដោយគ្មានលំហូរ Create ត្រឹមត្រូវ នាំឱ្យមានមហន្តរាយផលិតកម្ម។",
      content: `<div class="card" style="border-left: 3px solid #ef4444;">
            <div class="crisis-banner">
              <span class="crisis-icon">&iexcl;</span>
              <div>
                <strong style="color: #fca5a5; font-size: 1.1rem;">ឧបទ្ទវហេតុម៉ាស៊ីនខូចបន្ទាន់ ៖ ស្នប់បូមទឹកត្រជាក់ Chiller 2 ឡើងកម្តៅ</strong>
                <p style="color: #fecaca; font-size: 0.88rem; margin: 0.25rem 0 0 0;">រោងចក្រចាក់ជ័រ Apex Plastics &bull; វេនយប់ (ម៉ោង ២:១៥ ទៀបភ្លឺ)</p>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 1.25rem;">
              <div>
                <h4 style="color: #f87171; margin-bottom: 0.5rem;">អ្វីដែលបានកើតឡើង (កំហុសអ្នកចាប់ផ្តើម) ៖</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  ១. ស្នប់ម៉ាស៊ីនត្រជាក់ Chiller 2 ឡើងកម្តៅខ្លាំង។ កម្មករឈ្មោះ សំណាង បានបើកកុំព្យូទ័រ Tablet។<br>
                  ២. ទម្រង់ Form ជាប់ក្នុង <strong>Edit mode</strong> បង្ហាញសំបុត្រជួសជុលម្សិលមិញ (#1042)។<br>
                  ៣. សំណាង បានវាយត្រួតពីលើថា <em>"ស្នប់ឡើងកម្តៅខ្លាំង"</em> រួចបិទ App ដោយគិតថាវាយហើយគឺ Save អូតូ។<br>
                  ៤. ជាងម្នាក់ទៀតចុចប៊ូតុងដែលគ្មានការឆ្លើយតប ស្មានតែកម្មវិធីគាំង ក៏ដើរចេញបាត់។
                </p>
              </div>

              <div>
                <h4 style="color: #fca5a5; margin-bottom: 0.5rem;">ផលវិបាកជាមហន្តរាយ ៖</h4>
                <ul style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; padding-left: 1.2rem;">
                  <li><strong>គ្មានកំណត់ត្រាថ្មី ៖</strong> គ្មានទិន្នន័យណាមួយត្រូវបានផ្ញើទៅ SharePoint ឡើយ។</li>
                  <li><strong>ទិន្នន័យចាស់ខូចខាត ៖</strong> សំបុត្រជួសជុល #1042 ត្រូវបានកែប្រែដោយចៃដន្យ។</li>
                  <li><strong>ខូចខាតឧបករណ៍ $45,000 ៖</strong> ម៉ាស៊ីនកកកកិត បណ្តាលឱ្យប្រេះផ្សិតចាក់ជ័រដែកថែប។</li>
                  <li><strong>ដំណោះស្រាយ ៖</strong> ត្រូវតែហៅ <code>NewForm()</code>, ផ្ទៀងផ្ទាត់ Card, ដំណើរការ <code>SubmitForm()</code> និងបញ្ជាក់តាម <code>OnSuccess</code>!</li>
                </ul>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការលើកឡើងពីវិបត្តិពិត ៖</strong> បង្ហាញសិស្សឱ្យយល់ថា ការវាយអត្ថបទក្នុងប្រអប់ Input មិនស្មើនឹងការរក្សាទុកនោះទេ។ បើគ្មានប៊ូតុងបញ្ជូន និងការជូនដំណឹងទេ កម្មករនឹងគិតថាទិន្នន័យបាន Save រួចហើយ។</p>`
    },

    // Slide 6: Plain-Language Concept
    {
      title: "ស្វែងយល់គំនិតមុននឹងសរសេរកូដ ៖ ក្រដាសសស្អាត និងប្រអប់សំបុត្រ",
      segment: "ផ្នែកទី ៤ &bull; គំនិតងាយយល់ជាមុន",
      subtitle: "ស្វែងយល់ពីដំណាក់កាលដាច់ដោយឡែកពីគ្នាទាំងពីរនៃការបង្កើតទិន្នន័យក្នុងប្រព័ន្ធកុំព្យូទ័រ។",
      content: `<div class="card" style="align-items: center; text-align: center;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(59, 130, 246, 0.15); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; color: #60a5fa; margin-bottom: 1rem;">
              📄
            </div>
            <h3 style="color: #f8fafc; margin-bottom: 0.5rem;">ដំណាក់កាលទី ១ ៖ យកក្រដាសសស្អាតមួយសន្លឹក</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; max-width: 400px;">
              មុននឹងសរសេរសំបុត្រថ្មី អ្នកមិនត្រូវសរសេរត្រួតពីលើក្រដាសចាស់របស់អ្នកដទៃឡើយ។ អ្នកត្រូវដកយក <strong>ក្រដាសសស្អាតមួយសន្លឹក</strong>។
            </p>
            <div style="margin-top: 1rem; padding: 0.6rem 1rem; background: rgba(59, 130, 246, 0.1); border-radius: 6px; border: 1px solid rgba(59, 130, 246, 0.3); font-family: var(--font-mono); font-size: 0.9rem; color: #93c5fd;">
              NewForm(frmRequest)
            </div>
            <span style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.5rem;">លុបអត្ថបទចាស់ &bull; ប្តូរ Form ទៅជា New Mode</span>
          </div>

          <div class="card" style="align-items: center; text-align: center;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(16, 185, 129, 0.15); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; color: #34d399; margin-bottom: 1rem;">
              📮
            </div>
            <h3 style="color: #f8fafc; margin-bottom: 0.5rem;">ដំណាក់កាលទី ២ ៖ ទម្លាក់ចូលក្នុងប្រអប់សំបុត្រ</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; max-width: 400px;">
              ការសរសេរលើក្រដាសមិនទាន់បញ្ជូនទៅណាទេ រហូតដល់អ្នកយកវាទៅទម្លាក់ក្នុងប្រអប់សំបុត្រ ហើយទទួលបានបង្កាន់ដៃបញ្ជាក់។
            </p>
            <div style="margin-top: 1rem; padding: 0.6rem 1rem; background: rgba(16, 185, 129, 0.1); border-radius: 6px; border: 1px solid rgba(16, 185, 129, 0.3); font-family: var(--font-mono); font-size: 0.9rem; color: #86efac;">
              SubmitForm(frmRequest)
            </div>
            <span style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.5rem;">ប្រមូលទិន្នន័យគ្រប់ប្រអប់ &bull; រក្សាទុកជួរថ្មីក្នុង SharePoint</span>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការប្រៀបធៀប ៖</strong> សង្កត់ធ្ងន់លើគំនិតពីរដាច់ដោយឡែកពីគ្នា៖ ក្រដាសសស្អាត (NewForm) និងការទម្លាក់សំបុត្រ (SubmitForm)។</p>`
    },

    // Slide 7: Everyday Analogy: ATM
    {
      title: "ការប្រៀបធៀបក្នុងជីវិតប្រចាំថ្ងៃ ៖ ការដាក់ប្រាក់ក្នុងទូ ATM",
      segment: "ផ្នែកទី ៤ &bull; ម៉ូដែលគំនិត",
      subtitle: "របៀបដែលទូ ATM ឆ្លុះបញ្ចាំងពីវដ្តជីវិតប្រតិបត្តិការ Create ទាំង ៥ ជំហានរបស់ Power Apps។",
      content: `<div class="card">
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem;">
              <div style="background: rgba(15, 23, 42, 0.5); padding: 1rem; border-radius: 8px; text-align: center; border: 1px solid rgba(255,255,255,0.06);">
                <div style="font-size: 1.6rem; margin-bottom: 0.5rem;">💳</div>
                <strong style="color: #93c5fd; font-size: 0.9rem; display: block;">១. ចុច "ដាក់ប្រាក់"</strong>
                <p style="color: var(--text-muted); font-size: 0.78rem; margin-top: 0.4rem; line-height: 1.4;">
                  អេក្រង់ជម្រះព័ត៌មានចាស់ រួចបើកទ្វារទទួលប្រាក់។<br>
                  <code>NewForm()</code>
                </p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.5); padding: 1rem; border-radius: 8px; text-align: center; border: 1px solid rgba(255,255,255,0.06);">
                <div style="font-size: 1.6rem; margin-bottom: 0.5rem;">💵</div>
                <strong style="color: #fcd34d; font-size: 0.9rem; display: block;">២. ញាត់លុយចូល</strong>
                <p style="color: var(--text-muted); font-size: 0.78rem; margin-top: 0.4rem; line-height: 1.4;">
                  អ្នកដាក់ក្រដាសប្រាក់ចូលទៅក្នុងរន្ធ។<br>
                  <em>User វាយក្នុង DataCards</em>
                </p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.5); padding: 1rem; border-radius: 8px; text-align: center; border: 1px solid rgba(255,255,255,0.06);">
                <div style="font-size: 1.6rem; margin-bottom: 0.5rem;">🔍</div>
                <strong style="color: #fca5a5; font-size: 0.9rem; display: block;">៣. ស្កេនពិនិត្យ</strong>
                <p style="color: var(--text-muted); font-size: 0.78rem; margin-top: 0.4rem; line-height: 1.4;">
                  ម៉ាស៊ីនច្រានក្រដាសប្រាក់ក្លែងក្លាយ ឬរហែកចេញ។<br>
                  <em>DataCard Validation</em>
                </p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.5); padding: 1rem; border-radius: 8px; text-align: center; border: 1px solid rgba(255,255,255,0.06);">
                <div style="font-size: 1.6rem; margin-bottom: 0.5rem;">📥</div>
                <strong style="color: #86efac; font-size: 0.9rem; display: block;">៤. បញ្ជាក់ការដាក់ប្រាក់</strong>
                <p style="color: var(--text-muted); font-size: 0.78rem; margin-top: 0.4rem; line-height: 1.4;">
                  ទូដែកសុវត្ថិភាពទាញលុយរក្សាទុកក្នុងធនាគារ។<br>
                  <code>SubmitForm()</code>
                </p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.5); padding: 1rem; border-radius: 8px; text-align: center; border: 1px solid rgba(255,255,255,0.06);">
                <div style="font-size: 1.6rem; margin-bottom: 0.5rem;">🧾</div>
                <strong style="color: #c4b5fd; font-size: 0.9rem; display: block;">៥. បោះពុម្ពវិក្កយបត្រ</strong>
                <p style="color: var(--text-muted); font-size: 0.78rem; margin-top: 0.4rem; line-height: 1.4;">
                  ម៉ាស៊ីនបន្លឺសំឡេង និងចេញវិក្កយបត្របញ្ជាក់។<br>
                  <code>OnSuccess Notify()</code>
                </p>
              </div>
            </div>

            <div style="margin-top: 1.5rem; padding: 0.85rem; background: rgba(59, 130, 246, 0.08); border-radius: 6px; border-left: 3px solid #3b82f6;">
              <p style="color: var(--text-main); font-size: 0.88rem; margin: 0;">
                <strong>ចំណុចសំខាន់ ៖</strong> ប្រសិនបើម៉ាស៊ីនច្រានក្រដាសប្រាក់ចេញនៅជំហានទី ៣ នោះទូដែកសុវត្ថិភាពនឹងមិនបើកនៅជំហានទី ៤ ឡើយ! ការផ្ទៀងផ្ទាត់លើទូរស័ព្ទជួយការពារកុំឱ្យទិន្នន័យមិនត្រឹមត្រូវធ្លាក់ចូលទៅក្នុង SharePoint។
              </p>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការដើរតួ ៖</strong> សួរថា៖ "តើមានអ្នកណាធ្លាប់ដាក់លុយចូល ATM ហើយម៉ាស៊ីនច្រានលុយចេញមកវិញទេ?" នោះហើយគឺជា Validation!</p>`
    },

    // Slide 8: The Create Data Pipeline
    {
      title: "ខ្សែសង្វាក់ទិន្នន័យ Create ពេញលេញ",
      segment: "ផ្នែកទី ៥ &bull; ស្ថាបត្យកម្មលម្អិត",
      subtitle: "តាមដានចលនាពិតប្រាកដនៃទិន្នន័យចាប់ពីពេលចុចប៊ូតុង រហូតដល់ការរក្សាទុកក្នុង Cloud។",
      content: `<div class="card" style="border-left: 3px solid #06b6d4;">
            <div style="display: flex; flex-direction: column; gap: 0.85rem;">
              <div style="display: flex; align-items: center; gap: 1rem; background: rgba(15, 23, 42, 0.7); padding: 0.85rem 1.25rem; border-radius: 6px; border: 1px solid rgba(255,255,255,0.06);">
                <span style="background: #3b82f6; color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.85rem;">១</span>
                <div style="flex: 1;">
                  <strong style="color: #93c5fd; font-size: 0.92rem;">ចុចប៊ូតុង '+ New' លើ Header ៖</strong>
                  <span style="color: var(--text-muted); font-size: 0.85rem; margin-left: 0.5rem;">
                    <code>NewForm(frmRequest); Navigate(scrCreate, ScreenTransition.Fade)</code>
                  </span>
                </div>
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សកម្មភាព UI</span>
              </div>

              <div style="display: flex; align-items: center; gap: 1rem; background: rgba(15, 23, 42, 0.7); padding: 0.85rem 1.25rem; border-radius: 6px; border: 1px solid rgba(255,255,255,0.06);">
                <span style="background: #f59e0b; color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.85rem;">២</span>
                <div style="flex: 1;">
                  <strong style="color: #fcd34d; font-size: 0.92rem;">Form កំណត់ឡើងវិញទៅជាផ្ទាំងទទេ ៖</strong>
                  <span style="color: var(--text-muted); font-size: 0.85rem; margin-left: 0.5rem;">
                    <code>frmRequest.Mode = FormMode.New</code> &bull; តម្លៃ DataCard ទាំងអស់កំណត់ទៅជា Blank / Default
                  </span>
                </div>
                <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">ការផ្លាស់ប្តូរស្ថានភាព</span>
              </div>

              <div style="display: flex; align-items: center; gap: 1rem; background: rgba(15, 23, 42, 0.7); padding: 0.85rem 1.25rem; border-radius: 6px; border: 1px solid rgba(255,255,255,0.06);">
                <span style="background: #ef4444; color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.85rem;">៣</span>
                <div style="flex: 1;">
                  <strong style="color: #fca5a5; font-size: 0.92rem;">ការផ្ទៀងផ្ទាត់លើ DataCard ៖</strong>
                  <span style="color: var(--text-muted); font-size: 0.85rem; margin-left: 0.5rem;">
                    ប្រសិនបើ <code>IsBlank(txtTitle.Text)</code> កាតនឹងឡើងពណ៌ក្រហម ហើយបញ្ឈប់ការបញ្ជូនភ្លាម!
                  </span>
                </div>
                <span class="card-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">ការផ្ទៀងផ្ទាត់</span>
              </div>

              <div style="display: flex; align-items: center; gap: 1rem; background: rgba(15, 23, 42, 0.7); padding: 0.85rem 1.25rem; border-radius: 6px; border: 1px solid rgba(255,255,255,0.06);">
                <span style="background: #10b981; color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.85rem;">៤</span>
                <div style="flex: 1;">
                  <strong style="color: #86efac; font-size: 0.92rem;">បញ្ជូនទិន្នន័យតាមរយៈ SubmitForm ៖</strong>
                  <span style="color: var(--text-muted); font-size: 0.85rem; margin-left: 0.5rem;">
                    Power Apps ប្រមូលតម្លៃពីគ្រប់ DataCard ទាំងអស់រួចបញ្ជូនទៅកាន់ SharePoint List Connector
                  </span>
                </div>
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ការរុញទៅរក្សាទុក</span>
              </div>

              <div style="display: flex; align-items: center; gap: 1rem; background: rgba(15, 23, 42, 0.7); padding: 0.85rem 1.25rem; border-radius: 6px; border: 1px solid rgba(255,255,255,0.06);">
                <span style="background: #8b5cf6; color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.85rem;">៥</span>
                <div style="flex: 1;">
                  <strong style="color: #c4b5fd; font-size: 0.92rem;">SharePoint បញ្ជាក់ការទទួល និងដំណើរការ OnSuccess ៖</strong>
                  <span style="color: var(--text-muted); font-size: 0.85rem; margin-left: 0.5rem;">
                    SharePoint បង្កើតលេខ ID ថ្មី &bull; <code>frmRequest.OnSuccess</code> បង្ហាញ <code>Notify()</code> និងនាំត្រឡប់ទៅ Gallery វិញ
                  </span>
                </div>
                <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c4b5fd;">ការឆ្លើយតប</span>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការតាមដានចលនា ៖</strong> ឱ្យសិស្សមើលលេខរៀងទាំង ៥ នេះ។ បញ្ជាក់ថាគ្មានជំហានណាដែលរំលងបានឡើយ បើចង់បានប្រព័ន្ធ Create ដ៏រឹងមាំ។</p>`
    },

    // Slide 9: Command 1: NewForm()
    {
      title: "ពាក្យបញ្ជាទី ១ ៖ NewForm() — ការលុបក្តារខៀនឱ្យស្អាត",
      segment: "ផ្នែកទី ៦ &bull; រូបមន្ត Power Fx",
      subtitle: "ហេតុអ្វីបានជាអ្នកត្រូវប្រាប់ Power Apps ឱ្យបានច្បាស់លាស់ដើម្បីត្រៀមបង្កើតកំណត់ត្រាថ្មី។",
      content: `<div class="card">
            <h3 class="card-title">⚙️ ទម្រង់ និងយន្តការរបស់អនុគមន៍</h3>
            <div style="padding: 1rem; background: #0f172a; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); margin: 0.75rem 0;">
              <code style="color: #38bdf8; font-size: 1.1rem; font-weight: bold;">NewForm( <span style="color: #fcd34d;">FormName</span> )</code>
            </div>
            <ul style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; padding-left: 1.2rem;">
              <li><strong>អាគុយម៉ង់ ៖</strong> <code>FormName</code> — ឈ្មោះពិតប្រាកដរបស់ EditForm Control (ឧ. <code>frmRequest</code>)។</li>
              <li><strong>មុខងារ ៖</strong> ប្តូរ Mode របស់ Form ទៅជា <code>FormMode.New</code>។</li>
              <li><strong>ផ្តាច់ Item ៖</strong> ផ្តាច់ Form ចេញពី <code>Item = galRequests.Selected</code> ដើម្បីកុំឱ្យកែត្រួតលើជួរចាស់។</li>
              <li><strong>កំណត់ឡើងវិញ ៖</strong> លុបអត្ថបទក្នុងប្រអប់ទាំងអស់ និងទាញយកតម្លៃលំនាំដើមរបស់ SharePoint។</li>
            </ul>
          </div>

          <div class="card">
            <h3 class="card-title">💡 លំនាំស្តង់ដារក្នុងសហគ្រាស</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              តែងតែចងភ្ជាប់ <code>NewForm</code> ជាមួយការប្តូរអេក្រង់នៅលើប៊ូតុង '+ New' ដោយប្រើសញ្ញាចុចក្បៀស <code>;</code> ៖
            </p>
            <div style="padding: 1rem; background: #0f172a; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); margin: 0.75rem 0; font-family: var(--font-mono); font-size: 0.95rem; color: #a7f3d0;">
              // Button: btnAddNew.OnSelect<br>
              <span style="color: #38bdf8;">NewForm</span>(frmRequest);<br>
              <span style="color: #c084fc;">Navigate</span>(scrFormScreen, <span style="color: #fcd34d;">ScreenTransition.Fade</span>)
            </div>
            <div style="margin-top: 0.5rem; padding: 0.75rem; background: rgba(245, 158, 11, 0.1); border-radius: 6px; border-left: 3px solid #f59e0b;">
              <span style="color: #fcd34d; font-size: 0.82rem;">
                ⚠️ <strong>លំដាប់លំដោយសំខាន់ណាស់ ៖</strong> ត្រូវហៅ <code>NewForm()</code> *មុន* <code>Navigate()</code> ដើម្បីកុំឱ្យអ្នកប្រើប្រាស់ឃើញស្រមោលទិន្នន័យចាស់មួយភ្លែត!
              </span>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ច្បាប់ស្តីពីលំដាប់ ៖</strong> សង្កត់ធ្ងន់ថា៖ ប្រសិនបើសរសេរ Navigate មុន NewForm នោះអេក្រង់នឹងបង្ហាញទិន្នន័យចាស់មួយភ្លែតមុននឹងលុប ដែលធ្វើឱ្យ UI មើលទៅមិនស្អាត។</p>`
    },

    // Slide 10: Interactive Simulator 1
    {
      title: "បន្ទប់ពិសោធន៍អន្តរកម្ម ៖ ឧបករណ៍ពិនិត្យស្ថានភាព និង Mode របស់ Form",
      segment: "ផ្នែកទី ៦ &bull; បន្ទប់ពិសោធន៍អន្តរកម្ម",
      subtitle: "ចុចប៊ូតុង Mode ខាងក្រោមដើម្បីពិនិត្យមើលប្រតិកម្មរបស់ DataCards ជាក់ស្តែង។",
      content: `<div class="interactive-lab-container">
            <div class="lab-controls">
              <button class="lab-btn active" id="btn-mode-new" onclick="setSimMode('New')">១. NewForm(frmRequest)</button>
              <button class="lab-btn" id="btn-mode-edit" onclick="setSimMode('Edit')">២. EditForm(frmRequest)</button>
              <button class="lab-btn" id="btn-mode-view" onclick="setSimMode('View')">៣. ViewForm(frmRequest)</button>
            </div>

            <div class="lab-stage grid-2-col" style="gap: 1.5rem; margin-top: 1rem;">
              <div class="card" style="background: rgba(15, 23, 42, 0.8);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                  <strong style="color: #f8fafc; font-size: 1rem;">ទម្រង់ ៖ frmRequest</strong>
                  <span class="card-badge" id="sim-mode-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">Mode: FormMode.New</span>
                </div>

                <div style="display: flex; flex-direction: column; gap: 0.85rem;">
                  <div>
                    <label style="font-size: 0.82rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">ចំណងជើង <span style="color: #ef4444;">*</span></label>
                    <input type="text" id="sim-inp-title" class="sim-input" placeholder="បញ្ចូលចំណងជើងការខូចខាត..." value="">
                  </div>
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                    <div>
                      <label style="font-size: 0.82rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">អាទិភាព</label>
                      <select id="sim-inp-priority" class="sim-input">
                        <option value="High">ខ្ពស់ (High)</option>
                        <option value="Medium" selected>មធ្យម (Medium)</option>
                        <option value="Low">ទាប (Low)</option>
                      </select>
                    </div>
                    <div>
                      <label style="font-size: 0.82rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">ផ្នែក</label>
                      <input type="text" id="sim-inp-dept" class="sim-input" value="ផ្នែកចាក់ជ័រ (Injection Molding)">
                    </div>
                  </div>
                </div>
              </div>

              <div class="card" style="background: rgba(15, 23, 42, 0.8); border-left: 3px solid #3b82f6;">
                <h4 style="color: #93c5fd; margin-bottom: 0.5rem;" id="sim-desc-title">ហេតុផលស្ថាបត្យកម្មនៃ FormMode.New</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;" id="sim-desc-body">
                  នៅពេលហៅ <code>NewForm()</code> កម្មវិធី Power Apps នឹងផ្តាច់ទំនាក់ទំនងជាមួយ <code>Item = galRequests.Selected</code>។ Form នឹងរៀបចំគំរូទទេស្អាតក្នុងអង្គចងចាំ។ រាល់ប្រអប់ទាំងអស់នឹងត្រឡប់ទៅជាទទេ ដែលធានាថាពេល Submit វានឹងបង្កើត <strong>ជួរទិន្នន័យថ្មី</strong> ជាមួយលេខ ID ថ្មី!
                </p>
                <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(59, 130, 246, 0.1); border-radius: 6px; font-family: var(--font-mono); font-size: 0.85rem;" id="sim-desc-code">
                  frmRequest.Item = Blank()<br>
                  គោលដៅ ៖ SharePoint.CreateRecord()
                </div>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការពិសោធន៍ផ្ទាល់ ៖</strong> ចុចឆ្លាស់គ្នារវាង New, Edit និង View។ ចង្អុលឱ្យសិស្សឃើញថា៖ ក្នុង New mode ប្រអប់ទាំងអស់គឺទទេ ហើយត្រៀមបង្កើតជួរថ្មី!</p>`
    },

    // Slide 11: Client-Side Validation
    {
      title: "សុវត្ថិភាពទិន្នន័យ ៖ វិធានផ្ទៀងផ្ទាត់លើ DataCard",
      segment: "ផ្នែកទី ៧ ៖ តក្កវិជ្ជា និងការសម្រេចចិត្ត",
      subtitle: "របៀបដែល Power Apps ការពារ SharePoint ពីការបញ្ចូលទិន្នន័យខុស ទទេ ឬមិនពេញលេញ។",
      content: `<div class="card">
            <h3 class="card-title">🛑 របាំងការពារ Required ដែលមានស្រាប់</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              នៅពេលជួរឈរក្នុង SharePoint ត្រូវបានកំណត់ថា "Require that this column contains information" ៖
            </p>
            <ul style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; padding-left: 1.2rem; margin-top: 0.5rem;">
              <li>DataCard ដែលត្រូវគ្នានឹងកំណត់ <code>Required = true</code> ដោយស្វ័យប្រវត្តិ។</li>
              <li>សញ្ញាផ្កាយក្រហម <span style="color: #ef4444;">*</span> នឹងបង្ហាញនៅក្បែរឈ្មោះរបស់ Card។</li>
              <li>នៅពេលចុច Submit ប្រសិនបើប្រអប់នោះនៅទទេ <strong>Power Apps នឹងបដិសេធមិនព្រមបញ្ជូនទិន្នន័យទៅ SharePoint ឡើយ</strong>។</li>
              <li>គែមរបស់ Card នឹងឡើងពណ៌ក្រហមព្រមទាំងសារ ៖ <em>"An entry is required or has an invalid value."</em></li>
            </ul>
          </div>

          <div class="card">
            <h3 class="card-title">🧠 ការរំលឹកតក្កវិជ្ជានៃថ្ងៃទី ១៧</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              ចងចាំខ្សែសង្វាក់គំនិតថ្ងៃទី ១៧ ៖ <code>លក្ខខណ្ឌ &rarr; True/False &rarr; សកម្មភាព</code>។ អ្នកអាចសរសេរកូដផ្ទៀងផ្ទាត់លើប៊ូតុងផ្ទាល់មុននឹងហៅ <code>SubmitForm</code> ៖
            </p>
            <div style="padding: 0.85rem; background: #0f172a; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); margin: 0.5rem 0; font-family: var(--font-mono); font-size: 0.85rem; color: #fcd34d;">
              If(<br>
              &nbsp;&nbsp;<span style="color: #38bdf8;">IsBlank</span>(DataCardValue1.Text),<br>
              &nbsp;&nbsp;<span style="color: #f87171;">Notify</span>("សូមបញ្ចូលចំណងជើងជាមុនសិន!", NotificationType.Error),<br>
              &nbsp;&nbsp;<span style="color: #34d399;">SubmitForm</span>(frmRequest)<br>
              )
            </div>
            <span style="font-size: 0.8rem; color: var(--text-muted);">
              សំណួរ ៖ តើវាទទេមែនទេ? &bull; True = ប្រាប់អ្នកប្រើ &bull; False = រក្សាទុកក្នុង SharePoint!
            </span>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការតភ្ជាប់តក្កវិជ្ជា ៖</strong> រំលឹកសិស្សពីថ្ងៃទី ១៧។ បង្ហាញថា If() និង IsBlank() មិនមែនរៀនចោលទេ គឺយកមកប្រើការពារទិន្នន័យនៅថ្ងៃនេះ!</p>`
    },

    // Slide 12: Command 2: SubmitForm()
    {
      title: "ពាក្យបញ្ជាទី ២ ៖ SubmitForm() — អ្នកបញ្ជូនទិន្នន័យទៅ Cloud",
      segment: "ផ្នែកទី ៨ &bull; ការបញ្ជូនទិន្នន័យ",
      subtitle: "ពាក្យបញ្ជាមេតែមួយគត់ដែលសរសេរទិន្នន័យពី Form ចូលទៅក្នុង Cloud Database ជាអចិន្ត្រៃយ៍។",
      content: `<div class="card">
            <h3 class="card-title">📦 អ្វីដែល SubmitForm ធ្វើដោយស្វ័យប្រវត្តិ</h3>
            <div style="padding: 1rem; background: #0f172a; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); margin: 0.75rem 0;">
              <code style="color: #34d399; font-size: 1.1rem; font-weight: bold;">SubmitForm( <span style="color: #fcd34d;">frmRequest</span> )</code>
            </div>
            <ul style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; padding-left: 1.2rem;">
              <li><strong>ស្កេនគ្រប់ DataCard ៖</strong> ប្រមូលតម្លៃពីគ្រប់ប្រអប់បញ្ចូល Dropdown និង DatePicker ទាំងអស់។</li>
              <li><strong>ដំណើរការ Validation ៖</strong> ផ្ទៀងផ្ទាត់ថារាល់ Card ដែលចាំបាច់ត្រូវបានបំពេញត្រឹមត្រូវ។</li>
              <li><strong>កំណត់ប្រតិបត្តិការ SQL ៖</strong> បើ Form ស្ថិតក្នុង <code>FormMode.New</code> វានឹងធ្វើការ Insert (បង្កើតជួរថ្មី)។ បើស្ថិតក្នុង <code>Edit</code> វានឹងធ្វើការ Update។</li>
              <li><strong>មិនបាច់សរសេរ SQL ដោយដៃ ៖</strong> មិនបាច់សរសេរ <code>INSERT INTO</code> វែងអន្លាយឡើយ!</li>
            </ul>
          </div>

          <div class="card">
            <h3 class="card-title">⚠️ កំហុសឆ្គងលេខ ១ របស់អ្នកចាប់ផ្តើម</h3>
            <div style="padding: 0.85rem; background: rgba(239, 68, 68, 0.1); border-radius: 6px; border-left: 3px solid #ef4444; margin-bottom: 0.75rem;">
              <strong style="color: #fca5a5; font-size: 0.95rem;">ហាមដាច់ខាតមិនឱ្យដាក់ Notify() លើប៊ូតុង!</strong>
              <p style="color: #fecaca; font-size: 0.85rem; margin-top: 0.35rem;">
                ការសរសេរ <code>SubmitForm(frmRequest); Notify("Saved!", Success)</code> លើប៊ូតុងជាកំហុសស្ថាបត្យកម្មដ៏ធ្ងន់ធ្ងរ។
              </p>
            </div>
            <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.6;">
              <strong>មូលហេតុ ៖</strong> <code>SubmitForm</code> ដំណើរការឆ្លងកាត់អ៊ីនធឺណិត។ ប្រសិនបើសេវាអ៊ីនធឺណិតដាច់ ឬការផ្ទៀងផ្ទាត់មិនជាប់ ប៊ូតុងនៅតែលោតសារ "Saved!" ដដែល! នេះជាការភូតកុហកអ្នកប្រើប្រាស់! សារជូនដំណឹងពិតប្រាកដត្រូវតែដាក់ក្នុង <code>OnSuccess</code> របស់ Form។
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការដាស់តឿនខ្លាំងៗ ៖</strong> ហាមដាក់ Notify លើប៊ូតុងជាដាច់ខាត! នេះជាកំហុសដែលអ្នករៀនដំបូង ៩៩% តែងតែភ្លាត់ស្នៀត។</p>`
    },

    // Slide 13: Interactive Simulator 2
    {
      title: "បន្ទប់ពិសោធន៍អន្តរកម្ម ៖ ខ្សែសង្វាក់បញ្ជូនទិន្នន័យចុងដល់ចប់",
      segment: "ផ្នែកទី ៨ &bull; ការពិសោធន៍ផ្ទាល់",
      subtitle: "ចុចតាមជំហាននីមួយៗដើម្បីមើលដំណើរការទិន្នន័យចេញពីម្រាមដៃឆ្ពោះទៅកាន់ SharePoint។",
      content: `<div class="interactive-lab-container">
            <div class="pipeline-stepper" id="pipeline-stepper">
              <div class="step-node active" id="step-node-1" onclick="jumpToSimStep(1)">១. NewForm</div>
              <div class="step-connector"></div>
              <div class="step-node" id="step-node-2" onclick="jumpToSimStep(2)">២. User Input</div>
              <div class="step-connector"></div>
              <div class="step-node" id="step-node-3" onclick="jumpToSimStep(3)">៣. Validation</div>
              <div class="step-connector"></div>
              <div class="step-node" id="step-node-4" onclick="jumpToSimStep(4)">៤. SubmitForm</div>
              <div class="step-connector"></div>
              <div class="step-node" id="step-node-5" onclick="jumpToSimStep(5)">៥. SharePoint Store</div>
              <div class="step-connector"></div>
              <div class="step-node" id="step-node-6" onclick="jumpToSimStep(6)">៦. OnSuccess</div>
            </div>

            <div class="card" style="margin-top: 1.25rem; min-height: 190px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <h4 style="color: #38bdf8; font-size: 1.05rem;" id="pipe-title">ដំណាក់កាលទី ១ ៖ ចាប់ផ្តើមកំណត់ត្រាទទេស្អាត</h4>
                  <span class="card-badge" id="pipe-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">កូដសកម្ម ៖ NewForm(frmRequest)</span>
                </div>
                <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;" id="pipe-desc">
                  ប៊ូតុង '+ New Ticket' ដំណើរការ <code>NewForm(frmRequest)</code>។ Form នឹងផ្តាច់ចេញពីជួរចាស់ ប្តូរទៅកាន់ FormMode.New និងបង្កើតកន្លែងទំនេរក្នុង Memory ត្រៀមទទួលការវាយបញ្ចូល។
                </p>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.85rem;">
                <span style="font-family: var(--font-mono); font-size: 0.85rem; color: #a7f3d0;" id="pipe-status">ស្ថានភាពក្នុងម៉ាស៊ីន ៖ រៀបចំរួចរាល់ &bull; SharePoint ៖ មិនទាន់ប៉ះពាល់</span>
                <div style="display: flex; gap: 0.5rem;">
                  <button class="lab-btn" onclick="prevSimStep()">ថយក្រោយ</button>
                  <button class="lab-btn active" onclick="nextSimStep()">ជំហានបន្ទាប់ &rarr;</button>
                </div>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការចុចសាកល្បង ៖</strong> ចុច 'ជំហានបន្ទាប់' មួយម្តងៗ។ ពន្យល់សិស្សពីភាពខុសគ្នារវាងការផ្ទៀងផ្ទាត់លើម៉ាស៊ីនទូរស័ព្ទ និងការទទួលស្គាល់ពី SharePoint។</p>`
    },

    // Slide 14: The Golden Feedback Hook
    {
      title: "ទំពក់ឆ្លើយតបមាស ៖ Form.OnSuccess ទល់នឹង Button OnSelect",
      segment: "ផ្នែកទី ៩ &bull; ស្ថាបត្យកម្មការឆ្លើយតប",
      subtitle: "ហេតុអ្វីបានជាកម្មវិធីសហគ្រាសត្រូវបំបែកសំណើផ្ញើចេញពីការឆ្លើយតបជោគជ័យ។",
      content: `<div class="card" style="border-left: 3px solid #ef4444;">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
              <span style="color: #ef4444; font-size: 1.2rem;">❌</span>
              <strong style="color: #f87171; font-size: 1rem;">លំនាំដែលងាយខូច ៖ Button OnSelect</strong>
            </div>
            <div style="padding: 0.85rem; background: #0f172a; border-radius: 6px; font-family: var(--font-mono); font-size: 0.88rem; color: #fca5a5; margin: 0.5rem 0;">
              // Button OnSelect<br>
              SubmitForm(frmRequest);<br>
              Notify("Record Saved!", Success);<br>
              Navigate(scrGallery)
            </div>
            <ul style="color: var(--text-muted); font-size: 0.84rem; line-height: 1.6; padding-left: 1.2rem;">
              <li>លោតសារ <code>Notify()</code> ទោះបីជាខ្សែអ៊ីនធឺណិតត្រូវបានផ្តាច់ក៏ដោយ!</li>
              <li>រត់ទៅកាន់ <code>Navigate()</code> ទោះបីជាប្រអប់ចំណងជើងនៅទទេក៏ដោយ!</li>
              <li>ធ្វើឱ្យអ្នកប្រើប្រាស់គិតថាសំបុត្រត្រូវបានកត់ត្រា ទាំងដែល SharePoint មិនបានទទួលអ្វីសោះ។</li>
            </ul>
          </div>

          <div class="card" style="border-left: 3px solid #10b981;">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
              <span style="color: #10b981; font-size: 1.2rem;">✅</span>
              <strong style="color: #34d399; font-size: 1rem;">លំនាំកម្រិតសហគ្រាស ៖ Form OnSuccess</strong>
            </div>
            <div style="padding: 0.85rem; background: #0f172a; border-radius: 6px; font-family: var(--font-mono); font-size: 0.88rem; color: #86efac; margin: 0.5rem 0;">
              // Form: frmRequest.OnSuccess<br>
              Notify("បង្កើតសំបុត្រជួសជុលបានជោគជ័យ!", Success);<br>
              Navigate(scrGallery, ScreenTransition.Cover)
            </div>
            <ul style="color: var(--text-muted); font-size: 0.84rem; line-height: 1.6; padding-left: 1.2rem;">
              <li>ដំណើរការ <strong>លុះត្រាតែ</strong> SharePoint ឆ្លើយតបមកវិញនូវកូដបញ្ជាក់ HTTP 201 Created!</li>
              <li>ធានាគ្មានការជូនដំណឹងក្លែងក្លាយ ១០០%។</li>
              <li>រក្សាអ្នកប្រើប្រាស់នៅលើ Form ដដែលជាមួយសញ្ញាក្រហមបើការផ្ទៀងផ្ទាត់មិនជាប់។</li>
            </ul>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការប្រៀបធៀបរូបភាព ៖</strong> ការដាក់ Notify លើប៊ូតុងដូចជាការអបអរសាទរថារថភ្លើងបានមកដល់ ទាំងដែលយើងទើបតែដើរទិញសំបុត្រនៅស្ថានីយ!</p>`
    },

    // Slide 15: LastSubmit.ID
    {
      title: "ស្វែងយល់ស៊ីជម្រៅ ៖ ការទាញយកទិន្នន័យប្រព័ន្ធតាមរយៈ LastSubmit",
      segment: "ផ្នែកទី ៩ &bull; ការឆ្លើយតបកម្រិតខ្ពស់",
      subtitle: "របៀបស្រង់យកលេខសម្គាល់ ID ដែល SharePoint ទើបតែបង្កើតភ្លាមៗក្រោយពេល Save។",
      content: `<div class="card">
            <h3 class="card-title">🏷️ អ្វីទៅជា <code>Form.LastSubmit</code>?</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              នៅពេល SharePoint រក្សាទុកជួរថ្មី វានឹងបញ្ជូនកំណត់ត្រាដែលបានរក្សាទុកនោះត្រឡប់មក Power Apps វិញភ្លាមៗ។ កំណត់ត្រានោះត្រូវបានផ្ទុកនៅក្នុង ៖
            </p>
            <div style="padding: 0.85rem; background: #0f172a; border-radius: 6px; font-family: var(--font-mono); font-size: 1rem; color: #38bdf8; margin: 0.75rem 0;">
              frmRequest.LastSubmit
            </div>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              កំណត់ត្រានេះផ្ទុកគ្រប់ជួរឈរទាំងអស់ រួមទាំងតម្លៃដែលប្រព័ន្ធបង្កើតដោយស្វ័យប្រវត្តិក៏យើងមិនបានវាយបញ្ចូលផងដែរដូចជា ៖ <code>ID</code>, <code>Created</code>, <code>CreatedBy</code>, និង <code>Modified</code>!
            </p>
          </div>

          <div class="card">
            <h3 class="card-title">🚀 រូបមន្តបញ្ជាក់ដំណឹងកម្រិតអាជីព</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              ជាជាងបង្ហាញពាក្យ "Saved!" ធម្មតា ចូរបង្ហាញលេខកូដសំបុត្រជួសជុលជាក់ស្តែងជូនអ្នកប្រើប្រាស់ ៖
            </p>
            <div style="padding: 1rem; background: #0f172a; border-radius: 6px; font-family: var(--font-mono); font-size: 0.92rem; color: #a7f3d0; margin: 0.75rem 0;">
              // frmRequest.OnSuccess<br>
              Notify(<br>
              &nbsp;&nbsp;"សំបុត្រលេខ #" &amp; <span style="color: #fcd34d;">frmRequest.LastSubmit.ID</span> &amp; " ត្រូវបានបង្កើត!",<br>
              &nbsp;&nbsp;NotificationType.Success<br>
              );<br>
              Navigate(scrGallery)
            </div>
            <div style="padding: 0.65rem 0.85rem; background: rgba(16, 185, 129, 0.1); border-radius: 6px; border-left: 3px solid #10b981;">
              <span style="color: #86efac; font-size: 0.84rem;">
                លទ្ធផលក្នុងកម្មវិធី ៖ <strong>"សំបុត្រលេខ #1043 ត្រូវបានបង្កើត!"</strong> — បង្កើតទំនុកចិត្តខ្ពស់ដល់កម្មករ!
              </span>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ចំណុចពិសេស ៖</strong> បង្ហាញសិស្សថា LastSubmit.ID គឺជាចំណុចខុសគ្នារវាងកម្មវិធីក្មេងលេង និងកម្មវិធីអាជីវកម្មពិតប្រាកដ។</p>`
    },

    // Slide 16: Trainer Demo
    {
      title: "ការបង្ហាញផ្ទាល់របស់គ្រូ ៖ ការកសាងលំហូរ Create ពេញលេញ",
      segment: "ផ្នែកទី ១០ &bull; ការបង្ហាញផ្ទាល់",
      subtitle: "ទស្សនាការផ្គុំប៊ូតុង '+ New', ការភ្ជាប់ Form និងការកំណត់ទំពក់ជោគជ័យមួយជំហានម្តងៗ។",
      content: `<div class="card">
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">
              <div style="background: rgba(15, 23, 42, 0.6); padding: 1rem; border-radius: 6px; border-top: 3px solid #3b82f6;">
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">ជំហានទី ១</span>
                <h4 style="color: #f8fafc; margin: 0.5rem 0; font-size: 0.95rem;">ដាក់ Icon + New</h4>
                <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.5;">
                  លើ <code>scrGallery</code> ដាក់ Add Icon ក្នុង Header។ កំណត់ <code>OnSelect = NewForm(frmRequest); Navigate(scrCreate)</code>។
                </p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.6); padding: 1rem; border-radius: 6px; border-top: 3px solid #f59e0b;">
                <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">ជំហានទី ២</span>
                <h4 style="color: #f8fafc; margin: 0.5rem 0; font-size: 0.95rem;">បង្កើតអេក្រង់ Form</h4>
                <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.5;">
                  លើ <code>scrCreate</code> ដាក់ EditForm។ កំណត់ <code>DataSource = MaintenanceRequests</code>។ ពិនិត្យមើល Card Title &amp; Priority។
                </p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.6); padding: 1rem; border-radius: 6px; border-top: 3px solid #10b981;">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ជំហានទី ៣</span>
                <h4 style="color: #f8fafc; margin: 0.5rem 0; font-size: 0.95rem;">ភ្ជាប់ប៊ូតុង Submit</h4>
                <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.5;">
                  ដាក់ប៊ូតុងខាងក្រោម Form ឈ្មោះ <code>btnSubmit</code>។ កំណត់ <code>OnSelect = SubmitForm(frmRequest)</code>។
                </p>
              </div>

              <div style="background: rgba(15, 23, 42, 0.6); padding: 1rem; border-radius: 6px; border-top: 3px solid #8b5cf6;">
                <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c4b5fd;">ជំហានទី ៤</span>
                <h4 style="color: #f8fafc; margin: 0.5rem 0; font-size: 0.95rem;">កំណត់ OnSuccess</h4>
                <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.5;">
                  ជ្រើសរើស <code>frmRequest</code>។ កំណត់ <code>OnSuccess = Notify("Created!", Success); Navigate(scrGallery)</code>។
                </p>
              </div>
            </div>

            <div style="margin-top: 1.25rem; padding: 0.85rem; background: rgba(59, 130, 246, 0.1); border-radius: 6px; border: 1px solid rgba(59, 130, 246, 0.3);">
              <span style="color: #93c5fd; font-size: 0.88rem;">
                <strong>ការណែនាំគ្រូ ៖</strong> សាកល្បងទុក Title ឱ្យនៅទទេ ដើម្បីបង្ហាញថាកម្មវិធីមិនព្រម Save ទេ។ បន្ទាប់មកវាយ "Line 4 Extruder Jam" រួចចុច Save ដើម្បីឱ្យឃើញទិន្នន័យថ្មីលោតចូល Gallery ភ្លាមៗ!
              </span>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការបង្ហាញផ្ទាល់ ៖</strong> ធ្វើតេស្តទាំងពីរករណី៖ ១. ទុកទទេ (Error) និង ២. បំពេញពេញលេញ (Success) ដើម្បីសិស្សឃើញភាពខុសគ្នាជាក់ស្តែង។</p>`
    },

    // Slide 17: Guided Practice
    {
      title: "ការអនុវត្តមានការណែនាំ ៖ ដំឡើងអេក្រង់ Create ផ្ទាល់ដៃ",
      segment: "ផ្នែកទី ១១ &bull; អនុវត្តផ្ទាល់ដៃ",
      subtitle: "អនុវត្តតាម ៥ ជំហាននេះនៅក្នុង Power Apps Studio របស់អ្នកឥឡូវនេះ។",
      content: `<div class="card" style="border-left: 3px solid #10b981;">
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <div class="objective-item">
                <span class="obj-num">1</span>
                <div>
                  <strong>ដាក់ Icon បង្កើតថ្មី ៖</strong> ក្នុង Header នៃ <code>scrGallery</code> ដាក់ Add Icon។ កំណត់ <code>OnSelect = NewForm(frmRequest); Navigate(scrCreate, ScreenTransition.Fade)</code>។
                </div>
              </div>
              <div class="objective-item">
                <span class="obj-num">2</span>
                <div>
                  <strong>ពិនិត្យ Property របស់ Form ៖</strong> លើ <code>scrCreate</code> ចុចលើ <code>frmRequest</code>។ ធានាថា <code>DataSource = MaintenanceRequests</code>។
                </div>
              </div>
              <div class="objective-item">
                <span class="obj-num">3</span>
                <div>
                  <strong>ដាក់ប៊ូតុង Save ៖</strong> ដាក់ Button មួយ។ កំណត់ <code>Text = "Submit Request"</code> និង <code>OnSelect = SubmitForm(frmRequest)</code>។
                </div>
              </div>
              <div class="objective-item">
                <span class="obj-num">4</span>
                <div>
                  <strong>ភ្ជាប់ OnSuccess របស់ Form ៖</strong> ចុចលើ <code>frmRequest</code> ក្នុង Tree View។ កំណត់ <code>OnSuccess = Notify("បានកត់ត្រា ៖ សំបុត្រលេខ #" &amp; frmRequest.LastSubmit.ID, NotificationType.Success); Navigate(scrGallery)</code>។
                </div>
              </div>
              <div class="objective-item">
                <span class="obj-num">5</span>
                <div>
                  <strong>ធ្វើតេស្ត F5 ផ្ទាល់ ៖</strong> ចុច '+ New', វាយព័ត៌មានម៉ាស៊ីនខូច, ចុច Submit និងមើលសារពណ៌បៃតងព្រមទាំង Gallery ដែល Refresh ភ្លាមៗ!
                </div>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការដើរមើល ៖</strong> ដើរពិនិត្យអេក្រង់សិស្ស។ ធានាថាសិស្សមិនបានសរសេរ Notify លើប៊ូតុង Save ឡើយ។</p>`
    },

    // Slide 18: Misconceptions
    {
      title: "ការយល់ច្រឡំជាទូទៅ និងអន្ទាក់រចនាសម្ព័ន្ធ",
      segment: "ផ្នែកទី ១២ &bull; អន្ទាក់គ្រោះថ្នាក់",
      subtitle: "អន្ទាក់គំនិតរបស់អ្នកចាប់ផ្តើមដំបូងទាំងបីដែលតែងតែបំបែកកម្មវិធីសហគ្រាស។",
      content: `<div class="card" style="border-top: 3px solid #ef4444;">
            <span class="card-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">អន្ទាក់ទី ១</span>
            <h4 style="color: #f8fafc; margin: 0.75rem 0 0.25rem 0;">Notify លើប៊ូតុង</h4>
            <p style="color: #fecaca; font-size: 0.82rem; font-style: italic;">"ខ្ញុំដាក់ SubmitForm លើប៊ូតុង ដូច្នេះខ្ញុំដាក់ Notify បន្ទាប់ពីវាតែម្តង។"</p>
            <p style="color: var(--text-muted); font-size: 0.84rem; margin-top: 0.5rem; line-height: 1.5;">
              <strong>ដំណោះស្រាយ ៖</strong> ការបញ្ជូនទិន្នន័យដំណើរការអសមកាល។ ប៊ូតុងមិនដឹងថា SharePoint ទទួលឬអត់ទេ។ ត្រូវតែប្រើ <code>Form.OnSuccess</code>!
            </p>
          </div>

          <div class="card" style="border-top: 3px solid #f59e0b;">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">អន្ទាក់ទី ២</span>
            <h4 style="color: #f8fafc; margin: 0.75rem 0 0.25rem 0;">ស្មានថាប្រអប់ទទេ = New</h4>
            <p style="color: #fecaca; font-size: 0.82rem; font-style: italic;">"បើប្រអប់អត្ថបទនៅទទេ Form នឹងបង្កើតជួរថ្មីដោយស្វ័យប្រវត្តិ។"</p>
            <p style="color: var(--text-muted); font-size: 0.84rem; margin-top: 0.5rem; line-height: 1.5;">
              <strong>ដំណោះស្រាយ ៖</strong> បើ Mode នៅតែ Edit នោះការ Submit នឹងកែត្រួតលើជួរចាស់។ អ្នកត្រូវតែហៅ <code>NewForm()</code> ឱ្យច្បាស់លាស់!
            </p>
          </div>

          <div class="card" style="border-top: 3px solid #8b5cf6;">
            <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c4b5fd;">អន្ទាក់ទី ៣</span>
            <h4 style="color: #f8fafc; margin: 0.75rem 0 0.25rem 0;">ResetForm vs NewForm</h4>
            <p style="color: #fecaca; font-size: 0.82rem; font-style: italic;">"ResetForm() បង្កើតកំណត់ត្រាទទេថ្មីស្រឡាង។"</p>
            <p style="color: var(--text-muted); font-size: 0.84rem; margin-top: 0.5rem; line-height: 1.5;">
              <strong>ដំណោះស្រាយ ៖</strong> <code>ResetForm</code> ទាញយកទិន្នន័យដើមដែលបាន Save រួចមកវិញ។ ឯ <code>NewForm</code> ទើបបង្កើតផ្ទាំងទទេសម្រាប់ជួរថ្មី។
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការបញ្ជាក់ឡើងវិញ ៖</strong> ពន្យល់សិស្សថា ResetForm មានន័យថា "សុំលុបចោលអ្វីដែលខ្ញុំវាយខុស" ចំណែក NewForm មានន័យថា "សុំក្រដាសសថ្មីមួយសន្លឹក"។</p>`
    },

    // Slide 19: Knowledge Check 1
    {
      title: "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង ៖ គោលបំណងចម្បងនៃ NewForm()",
      segment: "ផ្នែកទី ១៣ &bull; សំណួរផ្ទៀងផ្ទាត់ ១ នៃ ៥",
      subtitle: "ផ្ទៀងផ្ទាត់ការយល់ដឹងរបស់អ្នកអំពីស្ថានភាព Form Mode និង Memory Buffers។",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ១</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                តើការដំណើរការ <code>NewForm(frmRequest)</code> ធ្វើអ្វីខ្លះចំពោះ Form និង Data Source?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'A', false, this)">
                  <strong>A.</strong> <span>វាបង្កើតជួរទទេមួយភ្លាមៗចូលទៅក្នុងបញ្ជី SharePoint</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'B', true, this)">
                  <strong>B.</strong> <span>វាសម្អាត Controls, កំណត់ FormMode.New និងរៀបចំផ្ទាំងទទេក្នុង Memory</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'C', false, this)">
                  <strong>C.</strong> <span>វាលុបកំណត់ត្រាចាស់ៗទាំងអស់ដែលមានក្នុង SharePoint ចោល</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'D', false, this)">
                  <strong>D.</strong> <span>វាប្តូរពណ៌ផ្ទៃក្រោយរបស់ Form ទៅជាពណ៌ខៀវស្រាល</span>
                </button>
              </div>
            </div>

            <div class="quiz-inspector-card" id="quiz-inspector-1">
              <div class="feedback-placeholder">
                <div class="inspector-icon">&quest;</div>
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">រង់ចាំការជ្រើសរើស</span>
                <h4>ឧបករណ៍ត្រួតពិនិត្យស្ថាបត្យកម្ម</h4>
                <p>ជ្រើសរើសជម្រើសមួយនៅខាងឆ្វេងដើម្បីផ្ទៀងផ្ទាត់យន្តការប្រតិបត្តិការរបស់ NewForm()។</p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-1" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-1">ស្ថាបត្យកម្មត្រូវបានបញ្ជាក់!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  <code>NewForm()</code> ដំណើរការទាំងស្រុងនៅក្នុង Memory នៃម៉ាស៊ីន! វារៀបចំផ្ទាំងទទេ និងប្តូរស្ថានភាពទៅជា <code>FormMode.New</code>។ វាមិនទាន់ប៉ះពាល់ SharePoint ទេរហូតដល់ចុច <code>SubmitForm()</code>។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការពិភាក្សា ៖</strong> សង្កត់ធ្ងន់ថា NewForm មិនទាន់បង្កើតជួរក្នុង SharePoint ទេ ដើម្បីកុំឱ្យសិស្សខ្លាចថាចុច New ច្រើនដងនាំឱ្យមានជួរទទេក្នុង Database។</p>`
    },

    // Slide 20: Knowledge Check 2 (Why Question)
    {
      title: "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង ៖ ហេតុអ្វីត្រូវដាក់ Notify() ក្នុង OnSuccess?",
      segment: "ផ្នែកទី ១៣ &bull; សំណួរផ្ទៀងផ្ទាត់ ២ នៃ ៥",
      subtitle: "ការវិភាគស្ថាបត្យកម្មនៃសំណើបណ្តាញកុំព្យូទ័រអសមកាល (Asynchronous)។",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ២ &bull; សំណួរស្វែងយល់ហេតុផល 'Why'</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                ហេតុអ្វីបានជាអ្នកអភិវឌ្ឍន៍ត្រូវដាក់ <code>Notify()</code> ក្នុង <code>Form.OnSuccess</code> ជាជាងដាក់លើប៊ូតុង Save ផ្ទាល់?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'A', false, this)">
                  <strong>A.</strong> <span>ដោយសារ Power Apps Studio មិនអនុញ្ញាតឱ្យ Save កម្មវិធីបើដាក់លើប៊ូតុង</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'B', true, this)">
                  <strong>B.</strong> <span>ដោយសារ SubmitForm() ជាដំណើរការអសមកាល; មានតែ OnSuccess ទេដែលបញ្ជាក់ថា SharePoint បាន Save ពិតប្រាកដ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'C', false, this)">
                  <strong>C.</strong> <span>ដោយសារ OnSuccess ធ្វើឱ្យផ្ទាំងជូនដំណឹងបង្ហាញនៅលើអេក្រង់បានយូរជាង</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'D', false, this)">
                  <strong>D.</strong> <span>ដោយសារ SharePoint ទាមទារ Password ពី OnSuccess ទើបព្រមទទួលយក</span>
                </button>
              </div>
            </div>

            <div class="quiz-inspector-card" id="quiz-inspector-2">
              <div class="feedback-placeholder">
                <div class="inspector-icon">&quest;</div>
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">រង់ចាំការជ្រើសរើស</span>
                <h4>ឧបករណ៍ត្រួតពិនិត្យស្ថាបត្យកម្ម</h4>
                <p>ជ្រើសរើសជម្រើសមួយនៅខាងឆ្វេងដើម្បីផ្ទៀងផ្ទាត់ហេតុផលស្ថាបត្យកម្មបណ្តាញ។</p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-2" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-2">វិធានបណ្តាញត្រូវបានបញ្ជាក់!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  <code>SubmitForm()</code> បញ្ជូនទិន្នន័យឆ្លងកាត់អ៊ីនធឺណិត។ ប្រសិនបើសេវាដាច់ ឬទិន្នន័យមិនពេញលេញ ការបញ្ជូននឹងបរាជ័យ! មានតែ <code>OnSuccess</code> មួយគត់ដែលដំណើរការនៅពេល SharePoint ឆ្លើយតបមកវិញនូវការរក្សាទុកជោគជ័យ!
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការសង្កត់ធ្ងន់ ៖</strong> នេះជាចំណុចគន្លឹះនៃមេរៀនថ្ងៃនេះ។ ត្រូវប្រាកដថាសិស្សយល់ច្បាស់ពីពាក្យ Asynchronous ដោយប្រើពាក្យសាមញ្ញថា "ផ្ញើសំបុត្រទៅហើយ ត្រូវចាំគេឆ្លើយតបសិន"។</p>`
    },

    // Slide 21: Knowledge Check 3 (What Happens If)
    {
      title: "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង ៖ តើមានអ្វីកើតឡើងបើទុកប្រអប់ Required ឱ្យនៅទទេ?",
      segment: "ផ្នែកទី ១៣ &bull; សំណួរផ្ទៀងផ្ទាត់ ៣ នៃ ៥",
      subtitle: "ការវិភាគរបាំងផ្ទៀងផ្ទាត់លើម៉ាស៊ីនអ្នកប្រើប្រាស់ (Client-side Validation)។",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ៣ &bull; សំណួរ 'What Happens If'</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                កម្មករម្នាក់ចុច "Submit" ប៉ុន្តែគាត់ភ្លេចវាយចំណងជើង Title ដែលជាប្រអប់ចាំបាច់។ តើ Power Apps នឹងធ្វើដូចម្តេច?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'A', false, this)">
                  <strong>A.</strong> <span>កម្មវិធីនឹងគាំង និងបង្ហាញផ្ទាំងខៀវ Blue Screen</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'B', false, this)">
                  <strong>B.</strong> <span>SharePoint នឹង Save ជួរនោះដោយដាក់ចំណងជើងថា "Untitled"</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'C', true, this)">
                  <strong>C.</strong> <span>ការផ្ទៀងផ្ទាត់នឹងបញ្ឈប់ការបញ្ជូន; Card នឹងឡើងពណ៌ក្រហម ហើយគ្មានទិន្នន័យណាមួយត្រូវបានផ្ញើ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'D', false, this)">
                  <strong>D.</strong> <span>Power Apps នឹងផ្ញើ Email ទៅកាន់ក្រុម IT ឱ្យជួយបំពេញ</span>
                </button>
              </div>
            </div>

            <div class="quiz-inspector-card" id="quiz-inspector-3">
              <div class="feedback-placeholder">
                <div class="inspector-icon">&quest;</div>
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">រង់ចាំការជ្រើសរើស</span>
                <h4>ឧបករណ៍ត្រួតពិនិត្យស្ថាបត្យកម្ម</h4>
                <p>ជ្រើសរើសជម្រើសមួយនៅខាងឆ្វេងដើម្បីផ្ទៀងផ្ទាត់យន្តការផ្ទៀងផ្ទាត់។</p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-3" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-3">របាំងផ្ទៀងផ្ទាត់ដំណើរការ!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  ការផ្ទៀងផ្ទាត់លើ DataCard ការពារមិនឱ្យកញ្ចប់ទិន្នន័យខុសចាកចេញពីឧបករណ៍ទូរស័ព្ទឡើយ! អ្នកប្រើប្រាស់នឹងទទួលបានការណែនាំយ៉ាងច្បាស់ឱ្យបំពេញប្រអប់ដែលនៅខ្វះ។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការពិនិត្យ ៖</strong> បញ្ជាក់ថា DataCard ការពារមិនឱ្យទិន្នន័យខុសហោះទៅដល់ Cloud ទេ ដែលជួយសន្សំសំចៃ Network Bandwidth និងទប់ស្កាត់ការខូចទិន្នន័យ។</p>`
    },

    // Slide 22: Knowledge Check 4
    {
      title: "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង ៖ ការចាប់យកលេខកូដ ID ដែលប្រព័ន្ធបង្កើត",
      segment: "ផ្នែកទី ១៣ &bull; សំណួរផ្ទៀងផ្ទាត់ ៤ នៃ ៥",
      subtitle: "ការទាញយកទិន្នន័យដែលបានឆ្លើយតបមកពី SharePoint Connector។",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ៤</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                តើកម្មវិធីអាចបង្ហាញលេខកូដសំបុត្រជួសជុលថ្មីរបស់ SharePoint នៅក្នុងផ្ទាំងជូនដំណឹងដោយរបៀបណា?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'A', true, this)">
                  <strong>A.</strong> <span>ដោយសរសេរសំដៅទៅលើ frmRequest.LastSubmit.ID</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'B', false, this)">
                  <strong>B.</strong> <span>ដោយសរសេរ CountRows(MaintenanceRequests) + 1</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'C', false, this)">
                  <strong>C.</strong> <span>ដោយសរសេរ First(MaintenanceRequests).ID</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'D', false, this)">
                  <strong>D.</strong> <span>ដោយបង្កើតលេខចៃដន្យ ៤ ខ្ទង់</span>
                </button>
              </div>
            </div>

            <div class="quiz-inspector-card" id="quiz-inspector-4">
              <div class="feedback-placeholder">
                <div class="inspector-icon">&quest;</div>
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">រង់ចាំការជ្រើសរើស</span>
                <h4>ឧបករណ៍ត្រួតពិនិត្យស្ថាបត្យកម្ម</h4>
                <p>ជ្រើសរើសជម្រើសមួយនៅខាងឆ្វេងដើម្បីផ្ទៀងផ្ទាត់ការទាញយកទិន្នន័យប្រព័ន្ធ។</p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-4" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-4">LastSubmit ត្រូវបានផ្ទៀងផ្ទាត់!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  <code>LastSubmit</code> ផ្ទុកនូវកំណត់ត្រាទាំងមូលដែលបានទទួលពី Server ដែលអនុញ្ញាតឱ្យអ្នកទាញយកលេខ <code>ID</code>, កាលបរិច្ឆេទ <code>Created</code> និងឈ្មោះអ្នកបង្កើត <code>Author</code> ភ្លាមៗ!
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការកែតម្រូវគំនិតខុស ៖</strong> កុំប្រើ CountRows + 1 ព្រោះបើមានមនុស្សពីរនាក់ចុចដំណាលគ្នា វានឹងជាន់លេខគ្នា។ LastSubmit.ID ធានាលេខពិតប្រាកដពី Server!</p>`
    },

    // Slide 23: Final Challenge & Rubric
    {
      title: "កិច្ចការប្រឈមចុងក្រោយ (Final Challenge) ៖ ខ្សែទូរស័ព្ទទាន់ហេតុការណ៍ និងតារាងវាយតម្លៃ",
      segment: "ផ្នែកទី ១៤ &bull; ការវាយតម្លៃ និងតារាងពិន្ទុ",
      subtitle: "កសាងលំហូរ Create ពេញលេញលើ ២ អេក្រង់ និងវាយតម្លៃតាមស្តង់ដារសហគ្រាស។",
      content: `<div class="card">
            <h3 class="card-title">🏆 លក្ខខណ្ឌតម្រូវនៃកិច្ចការ</h3>
            <div style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
              <p>កសាងលំហូររាយការណ៍ការខូចខាតម៉ាស៊ីនក្នុងរោងចក្រតាម ៤ លក្ខខណ្ឌ ៖</p>
              <ol style="padding-left: 1.2rem; margin-top: 0.5rem;">
                <li>ប៊ូតុង Header លើ <code>scrHome</code> ហៅ <code>NewForm()</code> និងប្តូរអេក្រង់យ៉ាងរលូន។</li>
                <li><code>frmMaintenance</code> កំណត់ឱ្យបំពេញ Title និង Priority ជាដាច់ខាត។</li>
                <li>ប៊ូតុង Submit ហៅ <code>SubmitForm(frmMaintenance)</code> តែមួយមុខគត់។</li>
                <li><code>OnSuccess</code> បង្ហាញដំណឹងឌីណាមិក ៖ <em>"បញ្ជូនសំបុត្រលេខ #..."</em> ដោយប្រើ <code>LastSubmit.ID</code> និងត្រឡប់ទៅ Home។</li>
              </ol>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">📊 តារាងវាយតម្លៃកម្រិតសហគ្រាស</h3>
            <table class="rubric-table">
              <thead>
                <tr>
                  <th>លក្ខណៈវិនិច្ឆ័យ</th>
                  <th>កម្រិត ១ ៖ ចាប់ផ្តើម</th>
                  <th>កម្រិត ៣ ៖ ជំនាញច្បាស់</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>ការផ្តួចផ្តើម NewForm</strong></td>
                  <td>ប្តូរអេក្រង់ដោយមិនហៅ NewForm; ទិន្នន័យចាស់នៅជាប់។</td>
                  <td>រួមបញ្ចូល NewForm &amp; Navigate យ៉ាងរលូនដោយគ្មានស្រមោលទិន្នន័យចាស់។</td>
                </tr>
                <tr>
                  <td><strong>ស្ថាបត្យកម្ម Submit</strong></td>
                  <td>ដាក់ Notify លើប៊ូតុង Submit ផ្ទាល់។</td>
                  <td>ដាក់ SubmitForm លើប៊ូតុង; ឯ Notify ស្ថិតក្នុង OnSuccess។</td>
                </tr>
                <tr>
                  <td><strong>ភាពច្បាស់លាស់នៃដំណឹង</strong></td>
                  <td>បង្ហាញត្រឹមតែពាក្យ "Saved"; គ្មានលេខ ID។</td>
                  <td>បង្ហាញលេខកូដសំបុត្រ SharePoint ជាក់ស្តែងតាមរយៈ LastSubmit.ID។</td>
                </tr>
              </tbody>
            </table>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការវាយតម្លៃ ៖</strong> ឱ្យសិស្សពិនិត្យកូដរបស់ខ្លួនឯងធៀបនឹងតារាង Level 3 Master មុននឹងប្រគល់កិច្ចការ។</p>`
    },

    // Slide 24: Wrap-Up & Forward Bridge
    {
      title: "សង្ខេបមេរៀន ៖ អ្នកបានស្ទាត់ជំនាញអក្សរ 'C' ក្នុង CRUD រួចរាល់!",
      segment: "ផ្នែកទី ១៥ &bull; ការសំយោគ និងជំហានបន្ទាប់",
      subtitle: "រំលឹកជ័យជម្នះថ្ងៃនេះ និងស្ពានចម្លងទៅកាន់ថ្ងៃទី ២៤ (Update / EditForm)។",
      content: `<div class="card" style="border-left: 3px solid #10b981;">
            <h3 class="card-title">🎯 សមិទ្ធផលថ្ងៃនេះ (Create)</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              អ្នកបានកសាងស្ពានតភ្ជាប់ពីការវាយបញ្ចូលរបស់អ្នកប្រើប្រាស់ ទៅកាន់ Cloud Storage នៃ SharePoint។
            </p>
            <div style="margin-top: 0.75rem; padding: 0.75rem; background: rgba(16, 185, 129, 0.1); border-radius: 6px; font-family: var(--font-mono); font-size: 0.84rem; color: #a7f3d0;">
              NewForm &rarr; Input &rarr; Validate &rarr; SubmitForm &rarr; SharePoint &rarr; OnSuccess
            </div>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; margin-top: 0.75rem;">
              ឥឡូវនេះ អ្នកបានដឹងពីរបៀបដែលគ្រប់ប្រព័ន្ធអាជីវកម្មបង្កើតសំបុត្រការងារ ការកុម្ម៉ង់ និងការចុះឈ្មោះអតិថិជនថ្មី។
            </p>
          </div>

          <div class="card" style="border-left: 3px solid #06b6d4;">
            <h3 class="card-title">🌉 ស្ពានចម្លងឆ្ពោះទៅកាន់ថ្ងៃស្អែក ៖ ថ្ងៃទី ២៤</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              ឥឡូវនេះកំណត់ត្រាមាននៅក្នុង SharePoint ហើយ... ចុះបើជាងជួសជុលចាប់ផ្តើមធ្វើការ ហើយគាត់ត្រូវប្តូរស្ថានភាពទៅជា <em>"In Progress"</em> វិញនោះ?
            </p>
            <div style="margin-top: 0.75rem; padding: 0.75rem; background: rgba(6, 182, 212, 0.1); border-radius: 6px; font-family: var(--font-mono); font-size: 0.84rem; color: #67e8f9;">
              ថ្ងៃស្អែក ៖ ទាញយក និងកែសម្រួល (អក្សរ "U" ក្នុង CRUD)<br>
              EditForm(frmRequest) &bull; Item = galRequests.Selected &bull; ResetForm()
            </div>
            <p style="color: #67e8f9; font-size: 0.85rem; font-weight: bold; margin-top: 0.75rem;">
              ថ្ងៃស្អែក យើងនឹងរៀនពីរបៀបកែប្រែប្រវត្តិដែលមានស្រាប់ ដោយមិនបង្កើតជួរស្ទួន!
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការបិទបញ្ចប់ (២ នាទី) ៖</strong> "ថ្ងៃស្អែក យើងនឹងរៀនពីរបៀបកែប្រែកំណត់ត្រាដែលមានស្រាប់ដោយប្រើ EditForm និង Item = galRequests.Selected។ ជួបគ្នាថ្ងៃស្អែកទាំងអស់គ្នា!"</p>`
    }
  ];

  // --------------------------------------------------------------------------
  // 3. ENGLISH NOTES DATA STORE (Trainer Script Quarantined in #notes-drawer)
  // --------------------------------------------------------------------------
  const ENGLISH_NOTES = [
    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Lesson Opening (2 min):</strong> "Welcome back to Day 23! Yesterday, we explored how a Form displays records that already exist. But what happens when an operator experiences a brand-new machine failure that no one has ever logged before? Where does that new row come from? Today, we conquer the 'C' in CRUD: Creating brand-new records that live forever in SharePoint!"</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Setting Expectations:</strong> Emphasize that today is a monumental milestone. The student transitions from building passive read-only apps to building active, two-way business applications that create enterprise records.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Spiral Connections:</strong> Point to the concept map. Show how Day 11 columns, Day 17 IsBlank validation, Day 19 SharePoint lists, and Day 22 forms all converge into today's Create flow.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Active Retrieval:</strong> Have students answer out loud before clicking each flip card. Praise correct explanations distinguishing <code>Items</code> (Gallery list) from <code>Item</code> (Form single record).</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>The Workplace Crisis:</strong> Paint the picture of the graveyard shift at Apex Plastics. Emphasize Somnang's false assumption that typing into an input box automatically saves data to the cloud.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Plain Language First:</strong> Explain the two distinct human steps: grabbing a fresh sheet of paper (<code>NewForm</code>) and dropping it into the mailbox slot (<code>SubmitForm</code>). Keep it physical and tangible.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>The ATM Deposit Analogy:</strong> Walk through the 5 steps. Remind students that if the ATM sensor rejects a crumpled bill, the safe never opens. That is client-side validation!</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Pipeline Narration:</strong> Trace the 5 numbers on screen. Highlight that every professional app on iOS, Android, and web follows this identical 5-stage architectural pipeline.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Order of Operations:</strong> Emphasize why <code>NewForm()</code> must come before <code>Navigate()</code>. Calling Navigate first causes a split-second flash of yesterday's record before resetting, which looks amateur.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Interactive Demonstration:</strong> Click between NewForm, EditForm, and ViewForm. Highlight how NewForm immediately blanks out all cards and disconnects from the gallery's selected record.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Validation Cues:</strong> Show how SharePoint's "Required" setting automatically flows into Power Apps. Highlight how combining IsBlank() with Notify() empowers developers to create custom error banners.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>The Golden Command:</strong> Explain that <code>SubmitForm()</code> does the work of 50 lines of complex SQL. It bundles every card, validates types, and pushes an HTTP POST payload automatically.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Interactive Pipeline Stepper:</strong> Click through stages 1 to 6. Walk students through what is happening in local phone memory versus what is happening inside the SharePoint cloud.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>The Golden Decoupling Rule:</strong> Stress this repeatedly: Never put Notify on the submit button! The button only sends the letter; only <code>OnSuccess</code> knows when the post office delivered it!</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>LastSubmit Mastery:</strong> Explain that <code>LastSubmit.ID</code> is how professional systems print confirmation receipts. It proves the record has landed safely in SharePoint with a permanent ID.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Live Studio Narration:</strong> Walk through dropping the Add icon, creating the form, wiring the button, and binding OnSuccess. Keep your pace steady and encouraging.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Active Circulation:</strong> Monitor student screens. Ensure every student tests leaving the Title blank first to see the red validation border, then tests submitting a valid ticket.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Misconceptions Review:</strong> Refute Trap 1 and Trap 2 directly. Reassure students that making mistakes with form modes is normal, and show how to fix them calmly.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Knowledge Check 1:</strong> Have students vote before clicking. Reiterate that NewForm works in local memory and does not create an empty row in SharePoint.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Knowledge Check 2:</strong> Highlight asynchronous networking. Explain that on factory Wi-Fi, signals drop frequently, making OnSuccess indispensable for true data integrity.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Knowledge Check 3:</strong> Celebrate student understanding of client-side validation barriers preventing corrupted records from entering databases.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Knowledge Check 4:</strong> Reiterate that <code>LastSubmit</code> holds server-generated fields like ID and Created timestamp that cannot be guessed client-side.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Rubric Evaluation:</strong> Guide students to evaluate their own work against Level 3 Master criteria before submitting their challenge.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Forward Bridge (2 min):</strong> "Today you mastered Create! Tomorrow on Day 24, we learn the 'U' in CRUD: retrieving that ticket and changing its status to 'In Progress' using EditForm! Fantastic work today!"</p>`
  ];

  // Store original English slides captured from the DOM
  const ENGLISH_SLIDES = [];

  function captureEnglishOriginals() {
    slides.forEach((slide, idx) => {
      const headerTitle = slide.querySelector('.slide-header h2') || slide.querySelector('.hero-title');
      const headerSubtitle = slide.querySelector('.slide-header .subtitle') || slide.querySelector('.hero-subtitle');
      const sectionTag = slide.querySelector('.section-tag') || slide.querySelector('.hero-badge');
      const contentEl = slide.querySelector('.slide-content');

      ENGLISH_SLIDES.push({
        title: headerTitle ? headerTitle.innerHTML : (slide.dataset.title || ''),
        subtitle: headerSubtitle ? headerSubtitle.innerHTML : '',
        segment: sectionTag ? sectionTag.innerHTML : (slide.dataset.segment || ''),
        content: contentEl ? contentEl.innerHTML : '',
        notes: ENGLISH_NOTES[idx] || ''
      });
    });
  }

  // --------------------------------------------------------------------------
  // 4. CORE SLIDE NAVIGATION
  // --------------------------------------------------------------------------
  function showSlide(index) {
    if (index < 0 || index >= totalSlides) return;

    slides[currentSlideIndex].classList.remove('active');
    currentSlideIndex = index;
    slides[currentSlideIndex].classList.add('active');

    updateProgress();
    updateNotesDrawer();
    if (isOverviewOpen) updateOverviewActiveCard();
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

  function goToSlide(index) {
    showSlide(index);
    if (isOverviewOpen) toggleOverview();
  }

  function updateProgress() {
    const counter = document.getElementById('slide-counter');
    const progressBar = document.getElementById('progress-bar');
    const percent = ((currentSlideIndex + 1) / totalSlides) * 100;

    if (progressBar) progressBar.style.width = percent + '%';
    if (counter) {
      counter.textContent = isKhmerActive
        ? 'ស្លាយ ' + (currentSlideIndex + 1) + ' / ' + totalSlides
        : 'Slide ' + (currentSlideIndex + 1) + ' / ' + totalSlides;
    }
  }

  // --------------------------------------------------------------------------
  // 5. BILINGUAL LANGUAGE ENGINE (Zero Layout Shift Architecture)
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
    timerDisplay.textContent = String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
  }

  // --------------------------------------------------------------------------
  // 7. LASER POINTER
  // --------------------------------------------------------------------------
  function initPointerAndSpotlight() {
    const stage = document.getElementById('presentation-stage');
    const laser = document.getElementById('presenter-laser');
    const ripple = document.getElementById('pointer-ripple');
    if (!stage) return;

    stage.addEventListener('mousemove', e => {
      stage.style.setProperty('--mouse-x', e.clientX + 'px');
      stage.style.setProperty('--mouse-y', e.clientY + 'px');
      if (laser && isLaserActive) {
        laser.style.left = e.clientX + 'px';
        laser.style.top = e.clientY + 'px';
      }
    });

    stage.addEventListener('click', e => {
      if (!isLaserActive || !ripple) return;
      ripple.style.left = e.clientX + 'px';
      ripple.style.top = e.clientY + 'px';
      ripple.classList.remove('rippling');
      void ripple.offsetWidth;
      ripple.classList.add('rippling');
    });
  }

  function toggleLaser() {
    isLaserActive = !isLaserActive;
    const btn = document.getElementById('btn-laser');
    const laser = document.getElementById('presenter-laser');
    if (btn) btn.classList.toggle('active', isLaserActive);
    if (laser) laser.classList.toggle('active', isLaserActive);
  }

  // --------------------------------------------------------------------------
  // 8. PRESENTER NOTES DRAWER (Strictly Quarantined from Slide Stage)
  // --------------------------------------------------------------------------
  function toggleNotes() {
    isNotesOpen = !isNotesOpen;
    const drawer = document.getElementById('notes-drawer');
    const btnNotes = document.getElementById('btn-notes');

    if (drawer) {
      if (isNotesOpen) {
        drawer.classList.add('open');
        updateNotesDrawer();
      } else {
        drawer.classList.remove('open');
      }
    }
    if (btnNotes) {
      if (isNotesOpen) btnNotes.classList.add('active');
      else btnNotes.classList.remove('active');
    }
  }

  function updateNotesDrawer() {
    const notesTitle = document.getElementById('notes-slide-title');
    const notesBody = document.getElementById('notes-body-content');
    if (!notesBody) return;

    if (notesTitle) {
      notesTitle.textContent = isKhmerActive
        ? 'កំណត់ចំណាំស្លាយទី ' + (currentSlideIndex + 1)
        : 'Slide ' + (currentSlideIndex + 1) + ' Trainer Notes';
    }

    const dataSource = isKhmerActive ? KHMER_SLIDES : ENGLISH_SLIDES;
    const currentNotes = (dataSource[currentSlideIndex] && dataSource[currentSlideIndex].notes)
      ? dataSource[currentSlideIndex].notes
      : (ENGLISH_NOTES[currentSlideIndex] || '<p>No specific script notes for this slide.</p>');

    notesBody.innerHTML = currentNotes;
  }

  // --------------------------------------------------------------------------
  // 9. SLIDE OVERVIEW NAVIGATOR (24 SLIDES)
  // --------------------------------------------------------------------------
  function toggleOverview() {
    isOverviewOpen = !isOverviewOpen;
    const modal = document.getElementById('overview-modal');
    const btnOverview = document.getElementById('btn-overview');

    if (modal) {
      if (isOverviewOpen) {
        modal.classList.add('open');
        renderOverviewGrid();
      } else {
        modal.classList.remove('open');
      }
    }
    if (btnOverview) {
      if (isOverviewOpen) btnOverview.classList.add('active');
      else btnOverview.classList.remove('active');
    }
  }

  function renderOverviewGrid() {
    const grid = document.getElementById('overview-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const dataSource = isKhmerActive ? KHMER_SLIDES : ENGLISH_SLIDES;

    slides.forEach((slide, idx) => {
      const card = document.createElement('div');
      card.className = 'overview-card ' + (idx === currentSlideIndex ? 'active' : '');
      card.onclick = () => goToSlide(idx);

      const titleText = (dataSource[idx] && dataSource[idx].title)
        ? dataSource[idx].title
        : slide.getAttribute('data-title') || ('Slide ' + (idx + 1));

      card.innerHTML = `
        <span class="overview-card-num">${idx + 1}</span>
        <span class="overview-card-title">${titleText}</span>
      `;
      grid.appendChild(card);
    });
  }

  function updateOverviewActiveCard() {
    const cards = document.querySelectorAll('.overview-card');
    cards.forEach((card, idx) => {
      if (idx === currentSlideIndex) card.classList.add('active');
      else card.classList.remove('active');
    });
  }

  // --------------------------------------------------------------------------
  // 10. INTERACTIVE SIMULATOR 1: FORM MODE & STATE CONTROLLER (SLIDE 10)
  // --------------------------------------------------------------------------
  window.setSimMode = function (mode) {
    const badge = document.getElementById('sim-mode-badge');
    const titleInp = document.getElementById('sim-inp-title');
    const priorityInp = document.getElementById('sim-inp-priority');
    const deptInp = document.getElementById('sim-inp-dept');

    const descTitle = document.getElementById('sim-desc-title');
    const descBody = document.getElementById('sim-desc-body');
    const descCode = document.getElementById('sim-desc-code');

    const btnNew = document.getElementById('btn-mode-new');
    const btnEdit = document.getElementById('btn-mode-edit');
    const btnView = document.getElementById('btn-mode-view');

    [btnNew, btnEdit, btnView].forEach(b => b && b.classList.remove('active'));

    if (mode === 'New') {
      if (btnNew) btnNew.classList.add('active');
      if (badge) {
        badge.textContent = 'Mode: FormMode.New';
        badge.style.background = 'rgba(16, 185, 129, 0.2)';
        badge.style.color = '#86efac';
      }
      if (titleInp) {
        titleInp.value = '';
        titleInp.disabled = false;
        titleInp.placeholder = isKhmerActive ? 'បញ្ចូលចំណងជើងការខូចខាត...' : 'Enter breakdown title...';
      }
      if (priorityInp) {
        priorityInp.value = 'Medium';
        priorityInp.disabled = false;
      }
      if (deptInp) {
        deptInp.value = isKhmerActive ? 'ផ្នែកចាក់ជ័រ (Injection Molding)' : 'Injection Molding';
        deptInp.disabled = false;
      }

      if (descTitle) descTitle.textContent = isKhmerActive ? 'ហេតុផលស្ថាបត្យកម្មនៃ FormMode.New' : 'FormMode.New Architecture Rationale';
      if (descBody) {
        descBody.textContent = isKhmerActive
          ? 'នៅពេលហៅ NewForm() កម្មវិធី Power Apps នឹងផ្តាច់ទំនាក់ទំនងជាមួយ Item = galRequests.Selected។ Form នឹងរៀបចំគំរូទទេស្អាតក្នុងអង្គចងចាំ។ រាល់ប្រអប់ទាំងអស់នឹងត្រឡប់ទៅជាទទេ ដែលធានាថាពេល Submit វានឹងបង្កើត ជួរទិន្នន័យថ្មី ជាមួយលេខ ID ថ្មី!'
          : 'When NewForm() is called, Power Apps severs the connection to Item = galRequests.Selected. The form allocates a clean, empty record template in memory. All inputs reset to blank or SharePoint default values, guaranteeing that submitting will create a brand-new row with a new ID!';
      }
      if (descCode) {
        descCode.innerHTML = 'frmRequest.Item = Blank()<br>Target: SharePoint.CreateRecord()';
      }
    } else if (mode === 'Edit') {
      if (btnEdit) btnEdit.classList.add('active');
      if (badge) {
        badge.textContent = 'Mode: FormMode.Edit';
        badge.style.background = 'rgba(245, 158, 11, 0.2)';
        badge.style.color = '#fcd34d';
      }
      if (titleInp) {
        titleInp.value = isKhmerActive ? 'ខ្សែពានបញ្ជូនម៉ាស៊ីន ២ ឮសំឡេងកកិត' : 'Line 2 Conveyor Squeaking';
        titleInp.disabled = false;
      }
      if (priorityInp) {
        priorityInp.value = 'High';
        priorityInp.disabled = false;
      }
      if (deptInp) {
        deptInp.value = isKhmerActive ? 'ផ្នែកថែទាំទូទៅ (Maintenance)' : 'Plant Maintenance';
        deptInp.disabled = false;
      }

      if (descTitle) descTitle.textContent = isKhmerActive ? 'ហេតុផលស្ថាបត្យកម្មនៃ FormMode.Edit' : 'FormMode.Edit Architecture Rationale';
      if (descBody) {
        descBody.textContent = isKhmerActive
          ? 'នៅក្នុង FormMode.Edit ទម្រង់ Form នឹងទាញយកទិន្នន័យដែលមានស្រាប់ពី Item = galRequests.Selected។ នៅពេលចុច SubmitForm វានឹងធ្វើការ Update លើជួរចាស់នោះ មិនមែនបង្កើតជួរថ្មីនោះឡើយ!'
          : 'In FormMode.Edit, the form reads existing data from Item = galRequests.Selected. When SubmitForm() is called, it issues an HTTP PATCH to update the existing row rather than inserting a duplicate!';
      }
      if (descCode) {
        descCode.innerHTML = 'frmRequest.Item = galRequests.Selected (ID #1042)<br>Target: SharePoint.UpdateRecord()';
      }
    } else if (mode === 'View') {
      if (btnView) btnView.classList.add('active');
      if (badge) {
        badge.textContent = 'Mode: FormMode.View';
        badge.style.background = 'rgba(148, 163, 184, 0.2)';
        badge.style.color = '#cbd5e1';
      }
      if (titleInp) {
        titleInp.value = isKhmerActive ? 'ខ្សែពានបញ្ជូនម៉ាស៊ីន ២ ឮសំឡេងកកិត' : 'Line 2 Conveyor Squeaking';
        titleInp.disabled = true;
      }
      if (priorityInp) {
        priorityInp.value = 'High';
        priorityInp.disabled = true;
      }
      if (deptInp) {
        deptInp.value = isKhmerActive ? 'ផ្នែកថែទាំទូទៅ (Maintenance)' : 'Plant Maintenance';
        deptInp.disabled = true;
      }

      if (descTitle) descTitle.textContent = isKhmerActive ? 'ហេតុផលស្ថាបត្យកម្មនៃ FormMode.View' : 'FormMode.View Architecture Rationale';
      if (descBody) {
        descBody.textContent = isKhmerActive
          ? 'នៅក្នុង FormMode.View រាល់ Input ទាំងអស់ត្រូវចាក់សោ (Read-only)។ គ្មានការបញ្ជូនទិន្នន័យណាមួយអាចកើតឡើងបានឡើយ ដែលជួយការពារទិន្នន័យពីការកែប្រែដោយចៃដន្យ។'
          : 'In FormMode.View, all inputs are locked to read-only labels. Submission is disabled, providing complete security against accidental operator edits.';
      }
      if (descCode) {
        descCode.innerHTML = 'DisplayMode = DisplayMode.View<br>Submissions: Locked';
      }
    }
  };

  // --------------------------------------------------------------------------
  // 11. INTERACTIVE SIMULATOR 2: END-TO-END PIPELINE STEPPER (SLIDE 13)
  // --------------------------------------------------------------------------
  const PIPELINE_STAGES = [
    {
      title: 'Stage 1: Initialize New Blank Record',
      titleKh: 'ដំណាក់កាលទី ១ ៖ ចាប់ផ្តើមកំណត់ត្រាទទេស្អាត',
      badge: 'Active Power Fx: NewForm(frmRequest)',
      badgeKh: 'កូដសកម្ម ៖ NewForm(frmRequest)',
      desc: 'The "+ New Ticket" button fires NewForm(frmRequest). The form unbinds from previous records, switches to FormMode.New, and creates a clean memory buffer ready for typing.',
      descKh: 'ប៊ូតុង "+ New Ticket" ដំណើរការ NewForm(frmRequest)។ Form នឹងផ្តាច់ចេញពីជួរចាស់ ប្តូរទៅកាន់ FormMode.New និងបង្កើតកន្លែងទំនេរក្នុង Memory ត្រៀមទទួលការវាយបញ្ចូល។',
      status: 'Local State: Buffer allocated • SharePoint: Untouched',
      statusKh: 'ស្ថានភាពក្នុងម៉ាស៊ីន ៖ រៀបចំរួចរាល់ • SharePoint ៖ មិនទាន់ប៉ះពាល់'
    },
    {
      title: 'Stage 2: Operator Data Entry',
      titleKh: 'ដំណាក់កាលទី ២ ៖ ការវាយបញ្ចូលទិន្នន័យរបស់អ្នកប្រើប្រាស់',
      badge: 'DataCardValue.Text = "Line 4 Extruder Jam"',
      badgeKh: 'តម្លៃកាត ៖ DataCardValue.Text = "Line 4 Extruder Jam"',
      desc: 'The operator types the breakdown title and selects dropdown values. Data is stored strictly in client RAM (local tablet memory). No network calls have been transmitted yet.',
      descKh: 'កម្មករវាយចំណងជើងការខូចខាត និងជ្រើសរើសជម្រើសផ្សេងៗ។ ទិន្នន័យត្រូវបានផ្ទុកត្រឹមតែក្នុង RAM នៃម៉ាស៊ីនទូរស័ព្ទប៉ុណ្ណោះ។ មិនទាន់មានការផ្ញើតាម Network ឡើយ។',
      status: 'Local State: RAM updated • SharePoint: Untouched',
      statusKh: 'ស្ថានភាពក្នុងម៉ាស៊ីន ៖ បានផ្ទុកក្នុង RAM • SharePoint ៖ មិនទាន់ប៉ះពាល់'
    },
    {
      title: 'Stage 3: Client-Side DataCard Validation',
      titleKh: 'ដំណាក់កាលទី ៣ ៖ ការផ្ទៀងផ្ទាត់លើ DataCard ក្នុងម៉ាស៊ីន',
      badge: 'DataCard.Required == true Guard',
      badgeKh: 'របាំងការពារ ៖ DataCard.Required == true',
      desc: 'Before any transmission, Power Apps inspects all required cards. If any mandatory card is empty, execution HALTS immediately with red borders. Corrupted data is stopped at the source.',
      descKh: 'មុនពេលបញ្ជូន Power Apps ពិនិត្យមើលគ្រប់ Card ដែលចាំបាច់។ ប្រសិនបើមាន Card ណាមួយនៅទទេ ការបញ្ជូននឹងត្រូវបញ្ឈប់ភ្លាមៗជាមួយសញ្ញាក្រហម។ ទិន្នន័យខុសត្រូវទប់ស្កាត់តាំងពីប្រភព។',
      status: 'Inspection: PASSED (All required cards valid)',
      statusKh: 'ការត្រួតពិនិត្យ ៖ ជាប់ (គ្រប់ Card ចាំបាច់មានទិន្នន័យ)'
    },
    {
      title: 'Stage 4: Asynchronous Dispatch via SubmitForm()',
      titleKh: 'ដំណាក់កាលទី ៤ ៖ ការបញ្ជូនទិន្នន័យតាម SubmitForm()',
      badge: 'Power Fx: SubmitForm(frmRequest)',
      badgeKh: 'កូដសកម្ម ៖ SubmitForm(frmRequest)',
      desc: 'Operator taps Submit. Power Apps bundles all card values into a JSON payload and issues an HTTP POST request to the SharePoint List Connector across the network.',
      descKh: 'កម្មករចុច Submit។ Power Apps ប្រមូលតម្លៃពីគ្រប់ Card ទៅជាកញ្ចប់ទិន្នន័យ JSON រួចផ្ញើជាសំណើ HTTP POST ទៅកាន់ SharePoint List Connector ឆ្លងកាត់អ៊ីនធឺណិត។',
      status: 'Network State: In-Flight Payload • Status: 200 Pending',
      statusKh: 'ស្ថានភាពបណ្តាញ ៖ កំពុងបញ្ជូន • ស្ថានភាព ៖ រង់ចាំការឆ្លើយតប'
    },
    {
      title: 'Stage 5: SharePoint Commit & Server ID Generation',
      titleKh: 'ដំណាក់កាលទី ៥ ៖ SharePoint រក្សាទុក និងបង្កើតលេខ ID ថ្មី',
      badge: 'SharePoint Engine: Insert Row -> Mint ID #1043',
      badgeKh: 'ម៉ាស៊ីន SharePoint ៖ បង្កើតជួរថ្មី -> លេខ ID #1043',
      desc: 'SharePoint writes the record to SQL disk, assigns permanent system metadata (ID = 1043, CreatedBy = Operator, Created = Now()), and returns an HTTP 201 Created acknowledgment.',
      descKh: 'SharePoint សរសេរជួរទិន្នន័យចូលក្នុង Disk បង្កើតលេខ ID អចិន្ត្រៃយ៍ (#1043) និងបញ្ជូនកូដបញ្ជាក់ HTTP 201 Created ត្រឡប់មកវិញ។',
      status: 'Storage State: PERMANENTLY SAVED (Row ID #1043)',
      statusKh: 'ស្ថានភាពផ្ទុក ៖ បានរក្សាទុកអចិន្ត្រៃយ៍ (សំបុត្រលេខ #1043)'
    },
    {
      title: 'Stage 6: Form.OnSuccess Event Fires',
      titleKh: 'ដំណាក់កាលទី ៦ ៖ ព្រឹត្តិការណ៍ Form.OnSuccess ដំណើរការ',
      badge: 'OnSuccess: Notify("Ticket #" & LastSubmit.ID & " Created!")',
      badgeKh: 'OnSuccess ៖ Notify("សំបុត្រលេខ #" & LastSubmit.ID & " បានបង្កើត!")',
      desc: 'The form receives SharePoint confirmation and executes OnSuccess. It displays a green success banner with the exact new ID and navigates back to the gallery. Success guaranteed!',
      descKh: 'Form ទទួលបានការបញ្ជាក់ពី SharePoint រួចដំណើរការ OnSuccess។ វានឹងបង្ហាញផ្ទាំងពណ៌បៃតងជាមួយលេខ ID ថ្មី និងនាំត្រឡប់ទៅ Gallery វិញដោយសុវត្ថិភាព!',
      status: 'User Feedback: Green Banner Active • Navigation: Completed',
      statusKh: 'ការឆ្លើយតប ៖ បង្ហាញផ្ទាំងបៃតង • ការប្តូរអេក្រង់ ៖ រួចរាល់'
    }
  ];

  window.jumpToSimStep = function (stepNum) {
    currentSimStep = stepNum;
    updatePipelineUI();
  };

  window.nextSimStep = function () {
    if (currentSimStep < 6) {
      currentSimStep++;
      updatePipelineUI();
    }
  };

  window.prevSimStep = function () {
    if (currentSimStep > 1) {
      currentSimStep--;
      updatePipelineUI();
    }
  };

  function updatePipelineUI() {
    const nodes = document.querySelectorAll('.step-node');
    nodes.forEach((node, idx) => {
      const stepIdx = idx + 1;
      node.classList.remove('active', 'completed');
      if (stepIdx === currentSimStep) {
        node.classList.add('active');
      } else if (stepIdx < currentSimStep) {
        node.classList.add('completed');
      }
    });

    const data = PIPELINE_STAGES[currentSimStep - 1];
    if (!data) return;

    const titleEl = document.getElementById('pipe-title');
    const badgeEl = document.getElementById('pipe-badge');
    const descEl = document.getElementById('pipe-desc');
    const statusEl = document.getElementById('pipe-status');

    if (titleEl) titleEl.textContent = isKhmerActive ? data.titleKh : data.title;
    if (badgeEl) badgeEl.textContent = isKhmerActive ? data.badgeKh : data.badge;
    if (descEl) descEl.textContent = isKhmerActive ? data.descKh : data.desc;
    if (statusEl) statusEl.textContent = isKhmerActive ? data.statusKh : data.status;
  }

  // --------------------------------------------------------------------------
  // 12. KNOWLEDGE CHECK QUIZ ENGINE (SLIDES 19 TO 22) - DUAL-STATE INSPECTOR
  // --------------------------------------------------------------------------
  window.handleQuizAnswer = function (qNum, choice, isCorrect, btn) {
    const slide = slides[currentSlideIndex];
    if (!slide) return;

    const options = slide.querySelectorAll('.quiz-option-btn');
    options.forEach(b => {
      b.classList.remove('correct', 'wrong');
      b.style.pointerEvents = 'none'; // Lock options after first selection
    });

    if (isCorrect) {
      btn.classList.add('correct');
    } else {
      btn.classList.add('wrong');
      // Highlight the correct option for learning reinforcement
      options.forEach(b => {
        if (b.getAttribute('onclick') && b.getAttribute('onclick').includes('true')) {
          b.classList.add('correct');
        }
      });
    }

    // Transform Inspector Card (Column 2) from Awaiting to Answered state
    const inspectorCard = slide.querySelector('.quiz-inspector-card');
    const placeholder = slide.querySelector('.feedback-placeholder');
    const content = slide.querySelector('.feedback-content');
    const badge = slide.querySelector('#quiz-badge-' + qNum);
    const status = slide.querySelector('#quiz-status-' + qNum);

    if (inspectorCard) inspectorCard.classList.add('answered');
    if (placeholder) placeholder.style.display = 'none';
    if (content) content.style.display = 'block';

    if (badge) {
      if (isCorrect) {
        badge.textContent = isKhmerActive ? 'ត្រឹមត្រូវ!' : 'Correct!';
        badge.style.background = 'rgba(16, 185, 129, 0.2)';
        badge.style.color = '#86efac';
      } else {
        badge.textContent = isKhmerActive ? 'មិនទាន់ត្រឹមត្រូវ' : 'Incorrect';
        badge.style.background = 'rgba(239, 68, 68, 0.2)';
        badge.style.color = '#fca5a5';
      }
    }

    if (status) {
      if (isCorrect) {
        status.textContent = isKhmerActive ? 'គោលការណ៍ត្រូវបានបញ្ជាក់!' : 'Architecture Verified!';
        status.style.color = '#86efac';
      } else {
        status.textContent = isKhmerActive ? 'ចូរពិនិត្យវិធានឡើងវិញ ៖' : 'Review The Architecture:';
        status.style.color = '#fca5a5';
      }
    }
  };

  // --------------------------------------------------------------------------
  // 13. KEYBOARD NAVIGATION
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
  // 14. FULLSCREEN CONTROLLER
  // --------------------------------------------------------------------------
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }

  // --------------------------------------------------------------------------
  // 15. GLOBAL WINDOW EXPORTS (Ensures Instant Inline onclick Functionality)
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

  window.addEventListener('keydown', handleKeyDown);

  // --------------------------------------------------------------------------
  // 16. BOOTSTRAP INITIALIZATION
  // --------------------------------------------------------------------------
  function initPresentation() {
    captureEnglishOriginals();
    initPointerAndSpotlight();
    updateProgress();
    updateTimerDisplay();

    // Initialize Simulator 1 in New mode
    if (window.setSimMode) window.setSimMode('New');
    // Initialize Simulator 2 in Step 1
    if (window.jumpToSimStep) window.jumpToSimStep(1);

    console.log('Day 23 Presentation loaded successfully (Zero-Shift DOM Engine)!');
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
