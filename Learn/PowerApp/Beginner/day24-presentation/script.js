/* ============================================================================
   POWER APPS FOUNDATION: DAY 24 PRESENTATION ENGINE
   Topic: Read & Update: Complete the Record Lifecycle
   Phase: CRUD Operations (Read & Update)
   Theme: Microsoft Fluent 2 Dark Mode (Update Cyan & Form Amber)
   Architecture: Lesson 14 Standards - Zero-Clipping Typography & Strict Notes Lock
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
  let activeSimTicketId = 1043;
  let activeSimMode = 'Edit';

  // --------------------------------------------------------------------------
  // 2. KHMER SLIDES DATA STORE (100% Exact 1-to-1 DOM Mirroring)
  // --------------------------------------------------------------------------
  const KHMER_SLIDES = [
    // Slide 1: Hero
    {
      title: "អាន និងកែប្រែទិន្នន័យ ៖ បំពេញវដ្តជីវិតកំណត់ត្រាពេញលេញ",
      segment: "ដំណាក់កាលទី ៧ ៖ វដ្តជីវិត CRUD",
      subtitle: "ការតភ្ជាប់ Gallery, Form និងបញ្ជី SharePoint ទៅជាលំហូរ Read និង Update។ ស្ទាត់ជំនាញវដ្តជីវិត CRUD ពេញលេញ ៖ កែប្រែប្រវត្តិដោយមិនបង្កើតជួរស្ទួន។",
      content: `<div class="hero-badge">
            <span>កម្មវិធីសិក្សា Microsoft Power Apps</span>
            <span>&bull;</span>
            <span>ថ្ងៃទី ២៤ នៃ ២៧</span>
          </div>
          <h1 class="hero-title">អាន និងកែប្រែទិន្នន័យ ៖ បំពេញវដ្តជីវិតកំណត់ត្រា</h1>
          <p class="hero-subtitle">
            ការតភ្ជាប់ Gallery, Form និងបញ្ជី SharePoint ទៅជាលំហូរ Read និង Update។ ស្ទាត់ជំនាញវដ្តជីវិត CRUD ពេញលេញ ៖ កែប្រែប្រវត្តិដោយមិនបង្កើតជួរស្ទួន។
          </p>

          <div class="model-chain">
            <span class="chain-item">បញ្ហាពិត</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ដំណើរការ</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">ទិន្នន័យ</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item active">Gallery [READ]</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item active">ជួរដែលបានរើស</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item active">EditForm()</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item active">SubmitForm() [UPDATE]</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item active">រក្សាទុកក្នុង SP</span>
            <span class="chain-arrow">&rarr;</span>
            <span class="chain-item">លទ្ធផលថ្មី</span>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការបើកមេរៀន (២ នាទី) ៖</strong> សូមស្វាគមន៍មកកាន់ថ្ងៃទី ២៤! កាលពីម្សិលមិញ យើងបានរៀនបង្កើតកំណត់ត្រាថ្មី (Create)។ ប៉ុន្តែចុះបើព្រឹកឡើង ជាងជួសជុលម៉ាស៊ីនរួច ហើយគាត់ត្រូវចូលទៅប្តូរស្ថានភាពពី 'New' ទៅ 'Completed' និងបន្ថែមចំណាំជួសជុល? ថ្ងៃនេះយើងរៀនអំពី Read & Update ដើម្បីបញ្ចប់វដ្តជីវិត CRUD!</p>`
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
                <strong>ស្វែងយល់ពីវដ្តជីវិត CRUD ពេញលេញ ៖</strong>
                <p>យល់ច្បាស់ពីរបៀបដែល Create, Read, Update និង Delete បង្កើតបានជាវដ្តទិន្នន័យសហគ្រាស។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">2</span>
              <div>
                <strong>អនុវត្តការប្តូរពី Read ទៅកាន់ Edit ៖</strong>
                <p>ភ្ជាប់រូបតំណាង Edit ក្នុង Gallery ដោយប្រើ <code>EditForm()</code> និង <code>Navigate()</code>។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">3</span>
              <div>
                <strong>ស្ទាត់ជំនាញ Form.Item = galRequests.Selected ៖</strong>
                <p>ធានាថា <code>SubmitForm()</code> កែប្រែកំណត់ត្រាដែលមានស្រាប់ ដោយមិនបង្កើតជួរស្ទួនឡើយ។</p>
              </div>
            </div>
            <div class="objective-item">
              <span class="obj-num">4</span>
              <div>
                <strong>បង្កើតប្រព័ន្ធបោះបង់តាម ResetForm() ៖</strong>
                <p>ផ្តល់ច្រកចេញសុវត្ថិភាព "Cancel" ដែលជម្រះទិន្នន័យវាយខុស និងទាញយកទិន្នន័យពិតពី Cloud មកវិញ។</p>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">⏱️ កាលវិភាគលម្អិត ៩០ នាទី</h3>
            <div class="agenda-timeline">
              <div class="agenda-row">
                <span class="agenda-time">00 - 10 នាទី</span>
                <div><strong>រំលឹក និងម៉ូដែលគំនិត ៖</strong> រំលឹកថ្ងៃទី ២១-២៣ និងការប្រៀបធៀប Contact ទូរស័ព្ទ</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time">10 - 25 នាទី</span>
                <div><strong>វិបត្តិជាក់ស្តែង ៖</strong> ការបង្កើតជួរស្ទួនខាតបង់ $18,000 នៅរោងចក្រ Apex Plastics</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time">25 - 45 នាទី</span>
                <div><strong>ការបង្ហាញផ្ទាល់របស់គ្រូ ៖</strong> ការភ្ជាប់ <code>EditForm</code>, <code>Item</code>, និង <code>ResetForm</code></div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time">45 - 65 នាទី</span>
                <div><strong>ការអនុវត្តមានការណែនាំ ៖</strong> បង្កើតផ្ទាំងកែសម្រួលស្ថានភាពសំបុត្រការងារ</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time">65 - 80 នាទី</span>
                <div><strong>កិច្ចការស្វ័យសិក្សា ៖</strong> កត់ត្រាកំណត់ចំណាំជួសជុល និងប្តូរស្ថានភាពជា Completed</div>
              </div>
              <div class="agenda-row">
                <span class="agenda-time">80 - 90 នាទី</span>
                <div><strong>សំណួរផ្ទៀងផ្ទាត់ និងស្ពានចម្លង ៖</strong> សំណួរពិនិត្យចំណេះដឹង ៥ និងមើលត្រួសៗថ្ងៃទី ២៥</div>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការកំណត់ការរំពឹងទុក ៖</strong> ប្រាប់សិស្សថា៖ ថ្ងៃនេះជាថ្ងៃដែលយើងបិទបញ្ចប់វដ្តជីវិតទិន្នន័យ! ពេលរៀនចប់ថ្ងៃនេះ សិស្សនឹងចេះបង្កើតប្រព័ន្ធគ្រប់គ្រងការងារពេញលេញមួយ។</p>`
    },

    // Slide 3: Concept Map Recap
    {
      title: "ផែនទីគំនិតតភ្ជាប់ ៖ ដំណើរឆ្ពោះមកកាន់ថ្ងៃទី ២៤",
      segment: "ផ្នែកទី ១ &bull; ការរួមបញ្ចូលកម្មវិធីសិក្សា",
      subtitle: "គ្រប់មេរៀនដែលបានរៀនពីមុន ត្រូវបានផ្គុំចូលគ្នាបង្កើតជាលំហូរការងារអាជីវកម្មពេញលេញ។",
      content: `<div class="card" style="border-left: 3px solid #06b6d4;">
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem;">
              <div style="background: rgba(12, 19, 31, 0.7); padding: 1.15rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">ថ្ងៃទី ២១ ៖ Read ច្រើន</span>
                <h4 style="color: #f8fafc; margin: 0.5rem 0;">The Gallery</h4>
                <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
                  <code>galRequests.Items</code> បង្ហាញ ១៥០ កំណត់ត្រា; អ្នកប្រើចុចលើជួរដើម្បីកំណត់ <code>Selected</code>។
                </p>
              </div>

              <div style="background: rgba(12, 19, 31, 0.7); padding: 1.15rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
                <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">ថ្ងៃទី ២២ ៖ Read មួយ</span>
                <h4 style="color: #f8fafc; margin: 0.5rem 0;">The Form &amp; Cards</h4>
                <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
                  <code>frmRequest.Item</code> បង្ហាញគ្រប់ជួរឈរនៃកំណត់ត្រាអាជីវកម្មតែមួយគត់។
                </p>
              </div>

              <div style="background: rgba(12, 19, 31, 0.7); padding: 1.15rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ថ្ងៃទី ២៣ ៖ Create</span>
                <h4 style="color: #f8fafc; margin: 0.5rem 0;">NewForm &amp; Save</h4>
                <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.5;">
                  <code>NewForm()</code> សម្អាតផ្ទាំងទទេ; <code>SubmitForm()</code> បង្កើតជួរថ្មីក្នុង SharePoint។
                </p>
              </div>

              <div style="background: rgba(6, 182, 212, 0.15); padding: 1.15rem; border-radius: 8px; border: 1px solid rgba(6, 182, 212, 0.4);">
                <span class="card-badge" style="background: rgba(6, 182, 212, 0.25); color: #67e8f9;">ថ្ងៃនេះ (ថ្ងៃ ២៤)</span>
                <h4 style="color: #67e8f9; margin: 0.5rem 0;">Read &amp; Update</h4>
                <p style="color: #ecfeff; font-size: 0.86rem; line-height: 1.5;">
                  <code>EditForm()</code> បើកជួរចាស់; <code>SubmitForm()</code> កែប្រែទិន្នន័យដោយមិនបង្កើតជួរស្ទួន!
                </p>
              </div>
            </div>

            <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(6, 182, 212, 0.08); border-radius: 8px; text-align: center; border: 1px dashed rgba(6, 182, 212, 0.3);">
              <span style="color: #67e8f9; font-weight: 700; font-size: 0.95rem;">
                រង្វិលជុំស្ថាបត្យកម្មមាស ៖ Create (ថ្ងៃ ២៣) + Read (ថ្ងៃ ២១) + Update (ថ្ងៃនេះ) = ១០០% នៃការគ្រប់គ្រងការងារសហគ្រាស!
              </span>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការតភ្ជាប់គំនិត ៖</strong> ចង្អុលបង្ហាញសិស្សថា៖ បើគ្មាន Update ទេ ប្រព័ន្ធនឹងក្លាយជាឃ្លាំងផ្ទុកទិន្នន័យស្លាប់ ព្រោះគ្មានអ្នកណាអាចចូលទៅបិទសំបុត្រការងារដែលបានធ្វើរួចបានឡើយ។</p>`
    },

    // Slide 4: Retrieval Practice (Flip Cards)
    {
      title: "សំណួររំលឹកចំណេះដឹងចាស់ ៖ បើកដំណើរការគ្រឹះមុនៗ",
      segment: "ផ្នែកទី ២ &bull; ការរំលឹកចំណេះដឹង",
      subtitle: "ចុចលើកាតនីមួយៗដើម្បីបង្ហាញចម្លើយ និងគោលការណ៍ស្ថាបត្យកម្មគ្រឹះ។",
      content: `<div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ១</span>
                <h4 style="color: #f8fafc; margin-top: 1rem;">NewForm() vs EditForm()</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 0.5rem;">
                  តើ <code>NewForm()</code> ធ្វើអ្វីចំពោះ Form បើប្រៀបធៀបជាមួយ <code>EditForm()</code>?
                </p>
                <div class="flip-hint">ចុចដើម្បីត្រឡប់ &rarr;</div>
              </div>
              <div class="flip-card-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ចម្លើយទី ១</span>
                <p style="color: #ecfdf5; font-size: 0.92rem; margin-top: 0.8rem; line-height: 1.6;">
                  <code>NewForm()</code> លុប Card ឱ្យនៅទទេ ដើម្បីបង្កើត <strong>ជួរថ្មី</strong>។<br><br>
                  <code>EditForm()</code> ទាញយកទិន្នន័យពី <strong>ជួរចាស់</strong> ដែលមានក្នុង <code>Item</code> មកបង្ហាញក្នុង Card!
                </p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">សំណួរទី ២</span>
                <h4 style="color: #f8fafc; margin-top: 1rem;">តួនាទីរបស់ Form.Item</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 0.5rem;">
                  ហេតុអ្វីបានជា <code>Item = galRequests.Selected</code> ជា Property សំខាន់បំផុតពេល Edit?
                </p>
                <div class="flip-hint">ចុចដើម្បីត្រឡប់ &rarr;</div>
              </div>
              <div class="flip-card-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ចម្លើយទី ២</span>
                <p style="color: #ecfdf5; font-size: 0.92rem; margin-top: 0.8rem; line-height: 1.6;">
                  ពីព្រោះ <code>Item</code> ផ្តល់នូវលេខកូដសម្គាល់ <strong>ID</strong> ជាក់លាក់របស់ SharePoint! បើគ្មានវា Power Apps មិនដឹងថាកំពុងកែជួរណាឡើយ។
                </p>
              </div>
            </div>
          </div>

          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">សំណួរទី ៣</span>
                <h4 style="color: #f8fafc; margin-top: 1rem;">ភាពបត់បែននៃ SubmitForm()</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 0.5rem;">
                  តើ <code>SubmitForm()</code> អាចបង្កើតបានតែជួរថ្មី ឬក៏អាចកែប្រែជួរចាស់បានដែរ?
                </p>
                <div class="flip-hint">ចុចដើម្បីត្រឡប់ &rarr;</div>
              </div>
              <div class="flip-card-back">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ចម្លើយទី ៣</span>
                <p style="color: #ecfdf5; font-size: 0.92rem; margin-top: 0.8rem; line-height: 1.6;">
                  <strong>វាអាចធ្វើបានទាំងពីរ!</strong> បើ <code>Mode = New</code> វានឹងបង្កើតជួរថ្មី។ បើ <code>Mode = Edit</code> វានឹងកែប្រែជួរដែលមានស្រាប់!
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការផ្ទៀងផ្ទាត់ ៖</strong> ឱ្យសិស្សឆ្លើយដោយផ្ទាល់មាត់មុននឹងត្រឡប់កាត ដើម្បីបញ្ជាក់ថាពួកគេយល់ច្បាស់ពីតួនាទីរបស់ SubmitForm() ក្នុង Mode ទាំងពីរ។</p>`
    },

    // Slide 5: The Why Crisis
    {
      title: "វិបត្តិជាក់ស្តែងក្នុងរោងចក្រ ៖ ការខាតបង់ម៉ោងបន្ថែម $18,000 ដោយសារជួរស្ទួន",
      segment: "ផ្នែកទី ៣ &bull; ហេតុអ្វីបានជាត្រូវរៀនមេរៀននេះ",
      subtitle: "ហេតុអ្វីបានជាការបង្កើត App ដែលចេះតែបង្កើតជួរថ្មី នាំឱ្យមានភាពច្របូកច្របល់ក្នុងរោងចក្រ។",
      content: `<div class="card" style="border-left: 3px solid #ef4444;">
            <div class="crisis-banner">
              <span class="crisis-icon">&iexcl;</span>
              <div>
                <strong style="color: #fca5a5; font-size: 1.1rem;">វិបត្តិសំបុត្រការងារបន្ទាន់ ៖ ការផ្លាស់ប្តូរគ្រាប់ប៊アリング (Bearing) ម៉ូទ័រ Extruder</strong>
                <p style="color: #fecaca; font-size: 0.88rem; margin: 0.25rem 0 0 0;">រោងចក្រចាក់ជ័រ Apex Plastics &bull; វេនព្រឹក (ម៉ោង ៨:០០ ព្រឹក)</p>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 1.25rem;">
              <div>
                <h4 style="color: #f87171; margin-bottom: 0.5rem;">អ្វីដែលបានកើតឡើង (កំហុសអ្នកចាប់ផ្តើម) ៖</h4>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  ១. ម្សិលមិញ សំណាងបានបង្កើតសំបុត្រ #1043 ៖ <em>"ម៉ូទ័រ Extruder ញ័រខ្លាំង"</em>។<br>
                  ២. ព្រឹកម៉ោង ៨:០០ មេជាងឈ្មោះ បុប្ផា បានដូរគ្រាប់ប៊アリング (Bearing) រួចរាល់ ម៉ាស៊ីនដំណើរការ ១០០%។<br>
                  ៣. បុប្ផាបើក Tablet ដើម្បីបិទសំបុត្រ ប៉ុន្តែ App មានតែប៊ូតុង <strong>"+ New Ticket"</strong>!<br>
                  ៤. បុប្ផាចុច "+ New Ticket" រួចវាយ <em>"ដូរគ្រាប់ប៊アリング (Bearing) រួចហើយ - ជួសជុលចប់"</em>។<br>
                  ៥. SharePoint ក៏មានសំបុត្រពីរ ៖ #1043 (នៅតែ New / High) និង #1044 ("ជួសជុលចប់")។
                </p>
              </div>

              <div>
                <h4 style="color: #fca5a5; margin-bottom: 0.5rem;">ផលវិបាកជាមហន្តរាយ ៖</h4>
                <ul style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; padding-left: 1.2rem;">
                  <li><strong>សំបុត្រ #1043 នៅតែសកម្ម ៖</strong> ប្រធានផ្នែកឃើញសញ្ញាក្រហមអាសន្ននៅដដែល។</li>
                  <li><strong>ផ្អាកខ្សែសង្វាក់ ៤ ម៉ោង ៖</strong> ប្រធានផ្នែកបញ្ជាឱ្យបិទខ្សែសង្វាក់ព្រោះស្មានថាម៉ាស៊ីនមិនទាន់ជួសជុល។</li>
                  <li><strong>ខាតបង់ថ្លៃ Overtime $18,000 ៖</strong> ជួលជាងក្រៅម៉ោងមកពិនិត្យម៉ូទ័រដែលបានជួសជុលរួចស្រេច!</li>
                  <li><strong>ដំណោះស្រាយ ៖</strong> ត្រូវតែមាន <strong>Update Path</strong> (<code>EditForm</code> + <code>Item = galRequests.Selected</code>)!</li>
                </ul>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការលើកឡើងពីវិបត្តិពិត ៖</strong> បង្ហាញសិស្សឱ្យឃើញថា ការចេះតែចុច New បង្កើតជួរថ្មី នឹងធ្វើឱ្យប្រព័ន្ធមានសំបុត្រស្ទួនរាប់រយ ដែលធ្វើឱ្យអ្នកគ្រប់គ្រងមើលមិនយល់។</p>`
    },

    // Slide 6: Plain-Language Concept
    {
      title: "ស្វែងយល់គំនិតមុននឹងសរសេរកូដ ៖ ត្រាលើលិខិតឆ្លងដែន",
      segment: "ផ្នែកទី ៤ &bull; គំនិតងាយយល់ជាមុន",
      subtitle: "ហេតុអ្វីបានជាការកែប្រែប្រវត្តិរក្សាអត្តសញ្ញាណដើម ខណៈពេលដែលព័ត៌មានលម្អិតផ្លាស់ប្តូរ។",
      content: `<div class="card" style="align-items: center; text-align: center;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(239, 68, 68, 0.15); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; color: #f87171; margin-bottom: 1rem;">
              🚫
            </div>
            <h3 style="color: #f8fafc; margin-bottom: 0.5rem;">គំរូខុស ៖ ការបង្កើតមនុស្សថ្មី</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; max-width: 400px;">
              នៅពេលអ្នកប្តូរផ្ទះ អ្នកមិនត្រូវបោះលិខិតឆ្លងដែនចោល ហើយសុំសញ្ជាតិថ្មីជាកូនក្មេងទើបនឹងកើតនោះទេ។ នោះនឹងបង្កើតអត្តសញ្ញាណស្ទួនដែលខុសច្បាប់!
            </p>
            <div style="margin-top: 1rem; padding: 0.6rem 1rem; background: rgba(239, 68, 68, 0.1); border-radius: 6px; border: 1px solid rgba(239, 68, 68, 0.3); font-family: var(--font-code); font-size: 0.88rem; color: #fca5a5;">
              ការហៅ NewForm() ដើម្បី Update = បង្កើតជួរស្ទួន (Duplicate Bug)
            </div>
          </div>

          <div class="card" style="align-items: center; text-align: center;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(6, 182, 212, 0.15); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; color: #67e8f9; margin-bottom: 1rem;">
              🛂
            </div>
            <h3 style="color: #f8fafc; margin-bottom: 0.5rem;">គំរូត្រឹមត្រូវ ៖ ការវាយត្រាផ្លូវការ</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; max-width: 400px;">
              អ្នកយកលិខិតឆ្លងដែនដដែលទៅឱ្យមន្ត្រី។ លេខកូដសម្គាល់របស់អ្នកនៅដដែល។ មន្ត្រីគ្រាន់តែវាយត្រាអាសយដ្ឋានថ្មីលើទំព័រដែលមានស្រាប់ប៉ុណ្ណោះ។
            </p>
            <div style="margin-top: 1rem; padding: 0.6rem 1rem; background: rgba(6, 182, 212, 0.1); border-radius: 6px; border: 1px solid rgba(6, 182, 212, 0.3); font-family: var(--font-code); font-size: 0.88rem; color: #67e8f9;">
              EditForm() + Item = galRequests.Selected = កែប្រែជួរដែលមានស្រាប់
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការប្រៀបធៀប ៖</strong> លិខិតឆ្លងដែនតំណាងឱ្យជួរទិន្នន័យក្នុង SharePoint។ លេខសម្គាល់ ID មិនដែលផ្លាស់ប្តូរទេ តែព័ត៌មានខាងក្នុងអាចកែប្រែបាន។</p>`
    },

    // Slide 7: Everyday Analogy: Smartphone Contact
    {
      title: "ការប្រៀបធៀបក្នុងជីវិតប្រចាំថ្ងៃ ៖ ការកែប្រែលេខទូរស័ព្ទក្នុង Contact",
      segment: "ផ្នែកទី ៤ &bull; ម៉ូដែលគំនិត",
      subtitle: "របៀបដែលទូរស័ព្ទឆ្លាតវៃរបស់អ្នកគ្រប់គ្រងវដ្តជីវិត Read-to-Edit យ៉ាងរលូន។",
      content: `<div class="card">
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">
              <div style="background: rgba(12, 19, 31, 0.6); padding: 1rem; border-radius: 8px; text-align: center; border: 1px solid var(--border-subtle);">
                <div style="font-size: 1.6rem; margin-bottom: 0.5rem;">📱</div>
                <strong style="color: #93c5fd; font-size: 0.9rem; display: block;">១. រកមើលបញ្ជី (Read ច្រើន)</strong>
                <p style="color: var(--text-muted); font-size: 0.78rem; margin-top: 0.4rem; line-height: 1.4;">
                  អ្នករមូរមើល ២០០ នាក់ រួចចុចលើ "ម៉ាក់"។<br>
                  <code>galRequests.Selected</code>
                </p>
              </div>

              <div style="background: rgba(12, 19, 31, 0.6); padding: 1rem; border-radius: 8px; text-align: center; border: 1px solid var(--border-subtle);">
                <div style="font-size: 1.6rem; margin-bottom: 0.5rem;">👁️</div>
                <strong style="color: #fcd34d; font-size: 0.9rem; display: block;">២. មើលព័ត៌មាន (Read មួយ)</strong>
                <p style="color: var(--text-muted); font-size: 0.78rem; margin-top: 0.4rem; line-height: 1.4;">
                  ផ្ទាំងបង្ហាញលេខ និងរូបថត។ មិនអាចច្រឡំដៃកែទេ។<br>
                  <code>ViewForm()</code>
                </p>
              </div>

              <div style="background: rgba(12, 19, 31, 0.6); padding: 1rem; border-radius: 8px; text-align: center; border: 1px solid var(--border-subtle);">
                <div style="font-size: 1.6rem; margin-bottom: 0.5rem;">✏️</div>
                <strong style="color: #67e8f9; font-size: 0.9rem; display: block;">៣. ចុច Edit (បើកសោ)</strong>
                <p style="color: var(--text-muted); font-size: 0.78rem; margin-top: 0.4rem; line-height: 1.4;">
                  ប្រអប់ក្លាយជាកន្លែងវាយអក្សរ។ លេខចាស់នៅដដែល!<br>
                  <code>EditForm()</code>
                </p>
              </div>

              <div style="background: rgba(12, 19, 31, 0.6); padding: 1rem; border-radius: 8px; text-align: center; border: 1px solid var(--border-subtle);">
                <div style="font-size: 1.6rem; margin-bottom: 0.5rem;">💾</div>
                <strong style="color: #86efac; font-size: 0.9rem; display: block;">៤. ចុច Done (Update)</strong>
                <p style="color: var(--text-muted); font-size: 0.78rem; margin-top: 0.4rem; line-height: 1.4;">
                  ទូរស័ព្ទកែប្រែលេខចាស់ ដោយមិនបង្កើត "ម៉ាក់" ទីពីរឡើយ!<br>
                  <code>SubmitForm()</code>
                </p>
              </div>
            </div>

            <div style="margin-top: 1.5rem; padding: 0.85rem; background: rgba(6, 182, 212, 0.08); border-radius: 6px; border-left: 3px solid #06b6d4;">
              <p style="color: var(--text-main); font-size: 0.88rem; margin: 0;">
                <strong>ចុះបើអ្នកវាយខុសហើយចង់បោះបង់?</strong> អ្នកគ្រាន់តែចុច "Cancel"។ ទូរស័ព្ទនឹងលុបអ្វីដែលអ្នកទើបតែវាយ រួចបង្ហាញលេខចាស់ដើមវិញ។ ក្នុង Power Apps ពាក្យបញ្ជានោះគឺ <code>ResetForm(frmRequest)</code>!
              </p>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការពិភាក្សា ៖</strong> សួរសិស្សថា៖ "តើមានអ្នកណាបង្កើត Contact ម៉ាក់ទីពីរ ពេលគាត់ដូរលេខទូរស័ព្ទទេ?" ទាំងអស់គ្នានឹងឆ្លើយថា ទេ គឺគ្រាន់តែ Edit លេខចាស់។ នោះហើយគឺជា Update!</p>`
    },

    // Slide 8: The Complete CRUD Lifecycle
    {
      title: "ស្ថាបត្យកម្មវដ្តជីវិត CRUD ពេញលេញ",
      segment: "ផ្នែកទី ៥ &bull; ស្ថាបត្យកម្មលម្អិត",
      subtitle: "ប្រតិបត្តិការទិន្នន័យសកលទាំង ៤ ដែលទ្រទ្រង់គ្រប់វិស្វកម្មសូហ្វវែរទាំងអស់លើពិភពលោក។",
      content: `<div class="crud-cycle-grid">
            <div class="crud-node" style="border-top: 3px solid #10b981;">
              <div class="crud-letter crud-c">C</div>
              <h4 style="color: #6ee7b7; margin-bottom: 0.35rem;">CREATE (ថ្ងៃ ២៣)</h4>
              <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.45;">
                <code>NewForm()</code> សម្អាតផ្ទាំង។ អ្នកប្រើវាយទិន្នន័យ។ <code>SubmitForm()</code> បង្កើតជួរថ្មីជាមួយ ID ថ្មីក្នុង SharePoint។
              </p>
              <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac; margin-top: 0.75rem;">HTTP POST</span>
            </div>

            <div class="crud-node" style="border-top: 3px solid #3b82f6;">
              <div class="crud-letter crud-r">R</div>
              <h4 style="color: #93c5fd; margin-bottom: 0.35rem;">READ (ថ្ងៃ ២១)</h4>
              <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.45;">
                <code>Gallery.Items</code> ទាញទិន្នន័យមកបង្ហាញ។ <code>ViewForm()</code> ពិនិត្យគ្រប់ជួរឈរនៃកំណត់ត្រាមួយដោយសុវត្ថិភាព។
              </p>
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd; margin-top: 0.75rem;">HTTP GET</span>
            </div>

            <div class="crud-node" style="border-top: 3px solid #06b6d4;">
              <div class="crud-letter crud-u">U</div>
              <h4 style="color: #67e8f9; margin-bottom: 0.35rem;">UPDATE (ថ្ងៃនេះ)</h4>
              <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.45;">
                <code>EditForm()</code> បើក <code>Item</code>។ អ្នកប្រើប្តូរស្ថានភាព។ <code>SubmitForm()</code> កែប្រែជួរដដែលដោយមិនស្ទួន!
              </p>
              <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9; margin-top: 0.75rem;">HTTP PATCH</span>
            </div>

            <div class="crud-node" style="border-top: 3px solid #ef4444;">
              <div class="crud-letter crud-d">D</div>
              <h4 style="color: #fca5a5; margin-bottom: 0.35rem;">DELETE (បណ្ណសារ)</h4>
              <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.45;">
                <code>Remove()</code> ឬប្តូរស្ថានភាពទៅជា "Archived" ដើម្បីបិទបញ្ចប់វដ្តជីវិតទិន្នន័យជាស្ថាពរ។
              </p>
              <span class="card-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5; margin-top: 0.75rem;">HTTP DELETE</span>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការពន្យល់អក្សរកាត់ ៖</strong> បង្រៀនពាក្យ CRUD ៖ Create (បង្កើត), Read (អាន), Update (កែប្រែ), Delete (លុប)។ នេះជាគ្រឹះមូលដ្ឋានបំផុតនៃអ្នកសរសេរកម្មវិធីទិន្នន័យ។</p>`
    },

    // Slide 9: Command 1: EditForm()
    {
      title: "ពាក្យបញ្ជាទី ១ ៖ EditForm() — ការបើកសោទិន្នន័យចាស់ដើម្បីកែប្រែ",
      segment: "ផ្នែកទី ៦ &bull; រូបមន្ត Power Fx",
      subtitle: "របៀបផ្លាស់ប្តូរស្ថានភាព Form ទៅកាន់កន្លែងកែសម្រួលទិន្នន័យអន្តរកម្ម។",
      content: `<div class="card">
            <h3 class="card-title">⚙️ យន្តការរបស់អនុគមន៍</h3>
            <div style="padding: 1rem; background: #0c1524; border-radius: 6px; border: 1px solid var(--border-subtle); margin: 0.75rem 0;">
              <code style="color: #67e8f9; font-size: 1.1rem; font-weight: bold;">EditForm( <span style="color: #fcd34d;">frmRequest</span> )</code>
            </div>
            <ul style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; padding-left: 1.2rem;">
              <li><strong>កំណត់ Mode ៖</strong> ប្តូរ Property <code>Mode</code> របស់ Form ទៅជា <code>FormMode.Edit</code>។</li>
              <li><strong>រក្សាទិន្នន័យចាស់ ៖</strong> ពិនិត្យមើល <code>Item</code> (ឧ. <code>galRequests.Selected</code>) រួចទាញតម្លៃចាស់ទាំងអស់មកបង្ហាញក្នុង DataCard។</li>
              <li><strong>បើកសោ Controls ៖</strong> ប្តូរ Label អានសុទ្ធ ឱ្យទៅជាប្រអប់ Text, Dropdown និង DatePicker ដែលអាចកែបាន។</li>
            </ul>
          </div>

          <div class="card">
            <h3 class="card-title">💡 លំនាំសរសេរកូដលើរូបតំណាងក្នុង Gallery</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              នៅក្នុងជួរនីមួយៗនៃ Gallery ដាក់រូបតំណាងខ្មៅដៃ Edit រួចសរសេរ ៖
            </p>
            <div style="padding: 1rem; background: #0c1524; border-radius: 6px; border: 1px solid var(--border-subtle); margin: 0.75rem 0; font-family: var(--font-code); font-size: 0.92rem; color: #a7f3d0;">
              // Gallery Item: icnEdit.OnSelect<br>
              <span style="color: #67e8f9;">EditForm</span>(frmRequest);<br>
              <span style="color: #c084fc;">Navigate</span>(scrEdit, <span style="color: #fcd34d;">ScreenTransition.Fade</span>)
            </div>
            <div style="padding: 0.65rem 0.85rem; background: rgba(6, 182, 212, 0.1); border-radius: 6px; border-left: 3px solid #06b6d4;">
              <span style="color: #67e8f9; font-size: 0.82rem;">
                គោលការណ៍សំខាន់ ៖ ដោយសារ Icon ស្ថិតក្នុងជួរ Gallery ពេលចុចលើវា នោះ <code>galRequests.Selected</code> នឹងកំណត់ទៅកាន់កំណត់ត្រានោះដោយស្វ័យប្រវត្តិ!
              </span>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ចំណុចគន្លឹះ ៖</strong> បញ្ជាក់ប្រាប់សិស្សថា ពេលយើងចុចលើប៊ូតុងក្នុងជួរ Gallery កម្មវិធីដឹងភ្លាមថាជាជួរណា ដូច្នេះ galRequests.Selected នឹងចង្អុលទៅជួរនោះភ្លាមៗ។</p>`
    },

    // Slide 10: Interactive Simulator 1
    {
      title: "បន្ទប់ពិសោធន៍អន្តរកម្ម ៖ ផ្ទាំងគ្រប់គ្រង Master-Detail Read-to-Edit",
      segment: "ផ្នែកទី ៦ &bull; បន្ទប់ពិសោធន៍អន្តរកម្ម",
      subtitle: "ជ្រើសរើសសំបុត្រមួយក្នុង Gallery រួចចុចឆ្លាស់គ្នារវាង View និង Edit modes។",
      content: `<div class="interactive-lab-container">
            <div class="lab-controls">
              <button class="lab-btn active" id="btn-ticket-1043" onclick="selectSimTicket(1043)">សំបុត្រ #1043 ៖ ម៉ូទ័រ Extruder</button>
              <button class="lab-btn" id="btn-ticket-1042" onclick="selectSimTicket(1042)">សំបុត្រ #1042 ៖ ខ្សែពានឮសំឡេង</button>
              <button class="lab-btn" id="btn-ticket-1041" onclick="selectSimTicket(1041)">សំបុត្រ #1041 ៖ សេនស័រវាស់កម្តៅ</button>
              <div style="flex: 1;"></div>
              <button class="lab-btn" id="btn-sim-view" onclick="setSimFormState('View')">ViewForm()</button>
              <button class="lab-btn active" id="btn-sim-edit" onclick="setSimFormState('Edit')">EditForm()</button>
            </div>

            <div class="grid-2-col" style="gap: 1.5rem; margin-top: 1rem;">
              <div class="card" style="background: rgba(12, 19, 31, 0.85);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.85rem;">
                  <strong style="color: #f8fafc;" id="sim-form-title">កែប្រែសំបុត្រជួសជុល #1043</strong>
                  <span class="card-badge" id="sim-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">Mode: FormMode.Edit</span>
                </div>

                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                  <div>
                    <label style="font-size: 0.8rem; color: var(--text-muted); display: block;">ចំណងជើង</label>
                    <input type="text" id="sim-edit-title" class="sim-input" value="ម៉ូទ័រ Extruder ញ័រខ្លាំង">
                  </div>
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                    <div>
                      <label style="font-size: 0.8rem; color: var(--text-muted); display: block;">ស្ថានភាព</label>
                      <select id="sim-edit-status" class="sim-input">
                        <option value="New">ថ្មី (New)</option>
                        <option value="In Progress" selected>កំពុងធ្វើ (In Progress)</option>
                        <option value="Completed">រួចរាល់ (Completed)</option>
                      </select>
                    </div>
                    <div>
                      <label style="font-size: 0.8rem; color: var(--text-muted); display: block;">អាទិភាព</label>
                      <input type="text" id="sim-edit-priority" class="sim-input" value="ខ្ពស់ (High)">
                    </div>
                  </div>
                  <div>
                    <label style="font-size: 0.8rem; color: var(--text-muted); display: block;">កំណត់ចំណាំជាងជួសជុល</label>
                    <input type="text" id="sim-edit-notes" class="sim-input" value="បានដោះគ្រាប់ប៊アリング (Bearing) និងតម្រង់រ៉ូទ័ររួចរាល់។">
                  </div>
                </div>
              </div>

              <div class="card" style="background: rgba(12, 19, 31, 0.85); border-left: 3px solid #06b6d4;">
                <h4 style="color: #67e8f9; margin-bottom: 0.5rem;" id="sim-state-title">ឧបករណ៍ត្រួតពិនិត្យស្ថានភាព Update</h4>
                <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.6;" id="sim-state-desc">
                  ដោយសារ <code>Item = galRequests.Selected</code> ចង្អុលទៅសំបុត្រលេខ #1043 ពេល Submit ទម្រង់នេះ វានឹងបញ្ជូនសំណើ <strong>HTTP PATCH</strong> ទៅកាន់ជួរ ID 1043។ ជួរដែលមានស្រាប់នឹងត្រូវ Update ជាមួយចំណាំថ្មី ដោយមិនបង្កើតជួរស្ទួនឡើយ!
                </p>
                <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(6, 182, 212, 0.1); border-radius: 6px; font-family: var(--font-code); font-size: 0.84rem; color: #a7f3d0;" id="sim-state-code">
                  Target: SharePoint.UpdateRecord(ID = 1043)<br>
                  Action: Patch(MaintenanceRequests, {ID: 1043, Status: "In Progress"})
                </div>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការពិសោធន៍ផ្ទាល់ ៖</strong> ចុចលើសំបុត្រ #1043, #1042, #1041 រួចចុច ViewForm និង EditForm ដើម្បីបង្ហាញពីរបៀបដែលទិន្នន័យផ្លាស់ប្តូរតាមការជ្រើសរើស។</p>`
    },

    // Slide 11: The Core Plumbing: Form.Item
    {
      title: "បំពង់តភ្ជាប់ស្នូល ៖ Form.Item = galRequests.Selected",
      segment: "ផ្នែកទី ៧ &bull; ស្ថាបត្យកម្មស្នូល",
      subtitle: "របៀបដែល Power Apps ប្រាប់ Form ឱ្យដឹងច្បាស់ថាតើត្រូវអាន និងកែប្រែកំណត់ត្រាណាពិតប្រាកដ។",
      content: `<div class="card">
            <h3 class="card-title">🔍 ចំណុចតភ្ជាប់ដែលមិនអាចខ្វះបាន</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              នៅពេលអ្នកដាក់ Form ទៅជា Edit mode កម្មវិធី Power Apps នឹងសួរថា ៖ <em>"តើអ្នកចង់កែប្រែកំណត់ត្រាមួយណា?"</em>
            </p>
            <div style="padding: 0.85rem; background: #0c1524; border-radius: 6px; border: 1px solid var(--border-subtle); margin: 0.75rem 0;">
              <code style="color: #fcd34d; font-size: 1.05rem;">frmRequest.Item = <span style="color: #67e8f9;">galRequests.Selected</span></code>
            </div>
            <ul style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.6; padding-left: 1.2rem;">
              <li><code>galRequests</code> គឺជាឈ្មោះរបស់ Gallery Control របស់អ្នក។</li>
              <li><code>.Selected</code> តំណាងឱ្យកំណត់ត្រាដែលអ្នកប្រើទើបតែចុចលើ។</li>
              <li>វាផ្តល់នូវលេខកូដសោចម្បង ៖ <strong><code>Selected.ID</code></strong>។</li>
            </ul>
          </div>

          <div class="card">
            <h3 class="card-title">⚠️ តើមានអ្វីកើតឡើងបើ Item នៅទទេ?</h3>
            <div style="padding: 0.85rem; background: rgba(239, 68, 68, 0.1); border-radius: 6px; border-left: 3px solid #ef4444; margin-bottom: 0.75rem;">
              <strong style="color: #fca5a5;">សារគួរឱ្យភ័យខ្លាច ៖ "No item to display"</strong>
              <p style="color: #fecaca; font-size: 0.84rem; margin-top: 0.35rem;">
                ប្រសិនបើ Form ស្ថិតក្នុង Edit mode តែ Item នៅទទេ នោះ Form នឹងចាក់សោប្រអប់ទាំងអស់ព្រមទាំងបង្ហាញ "No item to display"។
              </p>
            </div>
            <p style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.6;">
              នេះជាចំណុចស្លន់ស្លោលេខ ១ របស់អ្នកចាប់ផ្តើម។ បើឃើញសារនេះ សូមកុំបារម្ភ! គ្រាន់តែចុចលើ Form រួចសរសេរ <code>galRequests.Selected</code> ក្នុងប្រអប់ Item នោះបញ្ហានឹងត្រូវដោះស្រាយភ្លាម!
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការដោះស្រាយបញ្ហា ៖</strong> ប្រាប់សិស្សកុំឱ្យស្លន់ស្លោពេលឃើញ "No item to display"។ វាគ្រាន់តែមានន័យថា Form មិនទាន់ដឹងថាយើងចង់កែជួរណា។</p>`
    },

    // Slide 12: How SubmitForm Decides
    {
      title: "របៀបដែល SubmitForm() សម្រេចចិត្ត ៖ Insert ទល់នឹង Update",
      segment: "ផ្នែកទី ៨ &bull; ការសម្រេចចិត្តរបស់ម៉ាស៊ីន",
      subtitle: "ភាពវៃឆ្លាតខាងក្នុងរបស់ម៉ាស៊ីនបញ្ជូនទិន្នន័យនៃ Power Apps។",
      content: `<div class="card" style="border-left: 3px solid #10b981;">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
              <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ករណីទី ១ ៖ FormMode.New</span>
            </div>
            <h4 style="color: #6ee7b7; margin-bottom: 0.5rem;">បង្កើតជួរថ្មីស្រឡាង</h4>
            <ul style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.6; padding-left: 1.2rem;">
              <li><code>Item</code> ត្រូវបានមិនអើពើ (ចាត់ទុកជា Blank)។</li>
              <li>បញ្ជូនសំណើ <strong>HTTP POST</strong> ទៅកាន់បញ្ជី SharePoint។</li>
              <li>SharePoint បង្កើតលេខ ID ថ្មីស្រឡាង (ឧ. #1045)។</li>
              <li>ប្រើសម្រាប់ ៖ <em>ការរាយការណ៍ម៉ាស៊ីនខូចថ្មី</em>។</li>
            </ul>
          </div>

          <div class="card" style="border-left: 3px solid #06b6d4;">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
              <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">ករណីទី ២ ៖ FormMode.Edit</span>
            </div>
            <h4 style="color: #67e8f9; margin-bottom: 0.5rem;">កែប្រែជួរដែលមានស្រាប់</h4>
            <ul style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.6; padding-left: 1.2rem;">
              <li>អាន <code>Item.ID</code> (ឧ. ID #1043)។</li>
              <li>បញ្ជូនសំណើ <strong>HTTP PATCH</strong> សំដៅទៅលើជួរនោះចំៗ។</li>
              <li>រក្សាទុកលេខ ID ដើម កាលបរិច្ឆេទបង្កើត និងឈ្មោះអ្នកបង្កើតដដែល!</li>
              <li>ប្រើសម្រាប់ ៖ <em>ការបិទសំបុត្រ បន្ថែមចំណាំ និងប្តូរស្ថានភាព</em>។</li>
            </ul>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការប្រៀបធៀប ៖</strong> SubmitForm() ដូចជាអ្នករត់សំបុត្រវៃឆ្លាត។ បើស្រោមសំបុត្រមានតែងតាំងថ្មី គាត់បង្កើតឯកសារថ្មី។ បើមានលេខកូដចាស់ គាត់យកទៅដាក់ក្នុងថតចាស់ដដែល។</p>`
    },

    // Slide 13: Interactive Simulator 2
    {
      title: "បន្ទប់ពិសោធន៍អន្តរកម្ម ៖ ឧបករណ៍ក្លែងធ្វើម៉ាស៊ីន CRUD State",
      segment: "ផ្នែកទី ៨ &bull; ការពិសោធន៍ផ្ទាល់",
      subtitle: "ចុចលើពាក្យបញ្ជា Power Fx នីមួយៗដើម្បីមើលការផ្លាស់ប្តូរកញ្ចប់ទិន្នន័យ Network។",
      content: `<div class="interactive-lab-container">
            <div class="lab-controls">
              <button class="lab-btn" id="btn-engine-new" onclick="runEngineCmd('NewForm')">NewForm(frmRequest)</button>
              <button class="lab-btn active" id="btn-engine-edit" onclick="runEngineCmd('EditForm')">EditForm(frmRequest)</button>
              <button class="lab-btn" id="btn-engine-submit" onclick="runEngineCmd('SubmitForm')">SubmitForm(frmRequest)</button>
              <button class="lab-btn" id="btn-engine-reset" onclick="runEngineCmd('ResetForm')">ResetForm(frmRequest)</button>
            </div>

            <div class="card" style="margin-top: 1rem; min-height: 200px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <h4 style="color: #67e8f9; font-size: 1.05rem;" id="engine-title">កូដសកម្ម ៖ EditForm(frmRequest)</h4>
                  <span class="card-badge" id="engine-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">HTTP Method ៖ គ្មាន (ការប្តូរស្ថានភាព)</span>
                </div>
                <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;" id="engine-desc">
                  Form ប្តូរទៅជា FormMode.Edit។ វាអាន galRequests.Selected (ID #1043) ទាញយកចំណងជើង អាទិភាព និងស្ថានភាពចាស់មកដាក់ក្នុង Memory រួចបើកសោប្រអប់បញ្ចូលទិន្នន័យ។
                </p>
              </div>

              <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
                <span style="font-family: var(--font-code); font-size: 0.84rem; color: #a7f3d0;" id="engine-code">
                  ស្ថានភាព Form ៖ FormMode.Edit &bull; គោលដៅ ID ៖ 1043 &bull; Buffer ៖ ផ្ទុកទិន្នន័យរួចរាល់
                </span>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការពិសោធន៍ ៖</strong> ចុច SubmitForm ពេល Form កំពុង Edit ដើម្បីសិស្សឃើញពាក្យ HTTP PATCH (ID 1043)។ បន្ទាប់មកចុច NewForm រួច Submit ដើម្បីសិស្សឃើញ HTTP POST (New ID)។</p>`
    },

    // Slide 14: The Safety Escape Hatch: ResetForm()
    {
      title: "ច្រកចេញសុវត្ថិភាព ៖ ResetForm() សម្រាប់ការបោះបង់",
      segment: "ផ្នែកទី ៩ &bull; សុវត្ថិភាព និងភាពធន់",
      subtitle: "ហេតុអ្វីបានជាកម្មវិធីសហគ្រាសត្រូវការបញ្ជាជម្រះ Memory Buffer ឱ្យច្បាស់លាស់។",
      content: `<div class="card" style="border-left: 3px solid #ef4444;">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
              <span style="color: #ef4444; font-size: 1.2rem;">❌</span>
              <strong style="color: #f87171; font-size: 1rem;">លំនាំដែលងាយខូច ៖ គ្រាន់តែថយក្រោយ Back()</strong>
            </div>
            <div style="padding: 0.85rem; background: #0c1524; border-radius: 6px; font-family: var(--font-code); font-size: 0.88rem; color: #fca5a5; margin: 0.5rem 0;">
              // Cancel Button<br>
              Back()
            </div>
            <ul style="color: var(--text-muted); font-size: 0.84rem; line-height: 1.6; padding-left: 1.2rem;">
              <li>ទុកឱ្យអក្សរដែលវាយមិនទាន់ចប់ជាប់គាំងនៅក្នុង Memory Cache របស់ Form!</li>
              <li>ប្រសិនបើអ្នកប្រើចុចលើសំបុត្រផ្សេងទៀត អត្ថបទចាស់នោះអាចនឹងនៅសេសសល់បំពុលសំបុត្រថ្មី!</li>
            </ul>
          </div>

          <div class="card" style="border-left: 3px solid #10b981;">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
              <span style="color: #10b981; font-size: 1.2rem;">✅</span>
              <strong style="color: #34d399; font-size: 1rem;">លំនាំកម្រិតសហគ្រាស ៖ ResetForm + Back</strong>
            </div>
            <div style="padding: 0.85rem; background: #0c1524; border-radius: 6px; font-family: var(--font-code); font-size: 0.88rem; color: #86efac; margin: 0.5rem 0;">
              // Cancel Button: btnCancel.OnSelect<br>
              ResetForm(frmRequest);<br>
              Back()
            </div>
            <ul style="color: var(--text-muted); font-size: 0.84rem; line-height: 1.6; padding-left: 1.2rem;">
              <li>លុបចោលរាល់ការវាយដែលមិនទាន់រក្សាទុកចេញពី Memory Buffer។</li>
              <li>ទាញយកទិន្នន័យពិតស្អាតពី SharePoint មកដាក់វិញ។</li>
              <li>ថយក្រោយដោយគ្មានបញ្ហាជ្រាបទិន្នន័យ (Memory Leak) ១០០%!</li>
            </ul>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការប្រៀបធៀប ៖</strong> ResetForm ដូចជាការចុច Ctrl+Z លើក្រដាសកិច្ចការ។ បើមិន Reset ទេ អ្វីដែលយើងសរសេរខុសនឹងនៅជាប់លើក្តារខៀនរហូត។</p>`
    },

    // Slide 15: Two-Way Synchronization
    {
      title: "ការធ្វើសមកាលកម្មពីរផ្លូវ ៖ ការឆ្លុះបញ្ចាំងលើ Gallery ភ្លាមៗ",
      segment: "ផ្នែកទី ៩ &bull; ភាពឆ្លើយតបនៃទិន្នន័យ",
      subtitle: "ស្វែងយល់ពីការចងភ្ជាប់ទិន្នន័យបែប Reactive របស់ Microsoft Power Apps។",
      content: `<div class="card">
            <h3 class="card-title">⚡ ការចងភ្ជាប់ឆ្លើយតបភ្លាមៗ</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              នៅពេល <code>SubmitForm()</code> កែប្រែទិន្នន័យក្នុង SharePoint ៖
            </p>
            <ul style="color: var(--text-muted); font-size: 0.86rem; line-height: 1.6; padding-left: 1.2rem; margin-top: 0.5rem;">
              <li>SharePoint រក្សាទុកការកែប្រែ និងកែម៉ោង <code>Modified</code>។</li>
              <li>SharePoint Connector ប្រាប់ Power Apps Studio អំពីជួរដែលបានកែ។</li>
              <li>ដោយសារ <code>galRequests.Items = MaintenanceRequests</code> នោះ Gallery <strong>នឹង Refresh ដោយស្វ័យប្រវត្តិ</strong>!</li>
              <li>មិនបាច់សរសេរសំណួរ <code>Refresh(SharePoint)</code> ដោយដៃឡើយ!</li>
            </ul>
          </div>

          <div class="card">
            <h3 class="card-title">🏷️ រូបមន្តប្តូរពណ៌ផ្លាកស្ថានភាព</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              រំលឹកតក្កវិជ្ជាថ្ងៃទី ១៧ ៖ ផ្លាកស្ថានភាពក្នុង Gallery នឹងប្តូរពណ៌អូតូពេលស្ថានភាពផ្លាស់ប្តូរ ៖
            </p>
            <div style="padding: 0.85rem; background: #0c1524; border-radius: 6px; font-family: var(--font-code); font-size: 0.84rem; color: #fcd34d; margin: 0.5rem 0;">
              Switch(<br>
              &nbsp;&nbsp;ThisItem.Status.Value,<br>
              &nbsp;&nbsp;"Completed", Color.Green,<br>
              &nbsp;&nbsp;"In Progress", Color.Cyan,<br>
              &nbsp;&nbsp;Color.Orange<br>
              )
            </div>
            <span style="font-size: 0.8rem; color: var(--text-muted);">
              លទ្ធផល ៖ ពេលប្តូរទៅ "Completed" ផ្លាកក្នុង Gallery នឹងឡើងពណ៌បៃតងភ្លាមៗ!
            </span>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ភាពអស្ចារ្យនៃ Power Fx ៖</strong> បញ្ជាក់ថាយើងមិនបាច់សរសេរកូដ Refresh អ្វីទាំងអស់។ Power Apps ធ្វើការដូច Excel ៖ ពេលទិន្នន័យដើមប្រែប្រួល អេក្រង់នឹងប្រែប្រួលតាមភ្លាម។</p>`
    },

    // Slide 16: Trainer Live Demo
    {
      title: "ការបង្ហាញផ្ទាល់របស់គ្រូ ៖ ការកសាងអេក្រង់ Edit សំបុត្រការងារ",
      segment: "ផ្នែកទី ១០ &bull; ការបង្ហាញផ្ទាល់",
      subtitle: "ទស្សនាការផ្គុំរូបតំណាង Edit, ការភ្ជាប់ Item និងសកម្មភាពរក្សាទុកមួយជំហានម្តងៗ។",
      content: `<div class="card">
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">
              <div style="background: rgba(12, 19, 31, 0.6); padding: 1rem; border-radius: 6px; border-top: 3px solid #3b82f6;">
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">ជំហានទី ១</span>
                <h4 style="color: #f8fafc; margin: 0.5rem 0; font-size: 0.95rem;">ដាក់ Icon ខ្មៅដៃ</h4>
                <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.5;">
                  ក្នុងជួរនៃ <code>galRequests</code> ដាក់ Edit icon។ កំណត់ <code>OnSelect = EditForm(frmRequest); Navigate(scrEdit)</code>។
                </p>
              </div>

              <div style="background: rgba(12, 19, 31, 0.6); padding: 1rem; border-radius: 6px; border-top: 3px solid #06b6d4;">
                <span class="card-badge" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9;">ជំហានទី ២</span>
                <h4 style="color: #f8fafc; margin: 0.5rem 0; font-size: 0.95rem;">ភ្ជាប់ Form.Item</h4>
                <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.5;">
                  លើ <code>scrEdit</code> ចុចលើ <code>frmRequest</code>។ កំណត់ <code>Item = galRequests.Selected</code>។ មើលទិន្នន័យចាស់បង្ហាញភ្លាម!
                </p>
              </div>

              <div style="background: rgba(12, 19, 31, 0.6); padding: 1rem; border-radius: 6px; border-top: 3px solid #10b981;">
                <span class="card-badge" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ជំហានទី ៣</span>
                <h4 style="color: #f8fafc; margin: 0.5rem 0; font-size: 0.95rem;">ភ្ជាប់ប៊ូតុង Submit</h4>
                <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.5;">
                  កំណត់ប៊ូតុង Save <code>OnSelect = SubmitForm(frmRequest)</code>។ Form mode នឹងចាត់ចែង HTTP PATCH អូតូ។
                </p>
              </div>

              <div style="background: rgba(12, 19, 31, 0.6); padding: 1rem; border-radius: 6px; border-top: 3px solid #f59e0b;">
                <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">ជំហានទី ៤</span>
                <h4 style="color: #f8fafc; margin: 0.5rem 0; font-size: 0.95rem;">ភ្ជាប់ប៊ូតុង Cancel</h4>
                <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.5;">
                  ដាក់ប៊ូតុង Cancel។ កំណត់ <code>OnSelect = ResetForm(frmRequest); Back()</code> ដើម្បីជម្រះទិន្នន័យវាយខុស។
                </p>
              </div>
            </div>

            <div style="margin-top: 1.25rem; padding: 0.85rem; background: rgba(6, 182, 212, 0.1); border-radius: 6px; border: 1px solid rgba(6, 182, 212, 0.3);">
              <span style="color: #67e8f9; font-size: 0.88rem;">
                <strong>ការណែនាំគ្រូ ៖</strong> កែប្រែសំបុត្រ #1043 ប្តូរទៅ "Completed" រួចចុច Save។ បង្ហាញសិស្សឱ្យឃើញថាចំនួនជួរក្នុង SharePoint នៅដដែល គ្មានការកើនជួរស្ទួនឡើយ!
              </span>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការបង្ហាញផ្ទាល់ ៖</strong> បើកបញ្ជី SharePoint ទន្ទឹមនឹង App ដើម្បីបង្ហាញថាក្រោយពេល Save ជួរ #1043 គ្រាន់តែប្តូរ Status ដោយមិនបង្កើតជួរ #1044 ទេ។</p>`
    },

    // Slide 17: Guided Practice
    {
      title: "ការអនុវត្តមានការណែនាំ ៖ ដំឡើងអេក្រង់ Edit ផ្ទាល់ដៃ",
      segment: "ផ្នែកទី ១១ &bull; អនុវត្តផ្ទាល់ដៃ",
      subtitle: "អនុវត្តតាម ៥ ជំហាននេះនៅក្នុង Power Apps Studio របស់អ្នកឥឡូវនេះ។",
      content: `<div class="card" style="border-left: 3px solid #06b6d4;">
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <div class="objective-item">
                <span class="obj-num">1</span>
                <div>
                  <strong>ដាក់ Edit Icon ក្នុង Gallery Row ៖</strong> ជ្រើសរើសជួរទី ១ ក្នុង <code>galRequests</code>។ ដាក់ Edit pencil icon។ កំណត់ <code>OnSelect = EditForm(frmRequest); Navigate(scrEdit, ScreenTransition.Fade)</code>។
                </div>
              </div>
              <div class="objective-item">
                <span class="obj-num">2</span>
                <div>
                  <strong>កំណត់ Form.Item ៖</strong> ចុចលើខ្មៅដៃខណៈពេលចុច <kbd>Alt</kbd>។ លើ <code>scrEdit</code> ចុច <code>frmRequest</code>។ កំណត់ <code>Item = galRequests.Selected</code>។
                </div>
              </div>
              <div class="objective-item">
                <span class="obj-num">3</span>
                <div>
                  <strong>ដាក់ប៊ូតុង Save ៖</strong> ដាក់ Button ឈ្មោះ <code>btnSaveUpdates</code>។ កំណត់ <code>OnSelect = SubmitForm(frmRequest)</code>។
                </div>
              </div>
              <div class="objective-item">
                <span class="obj-num">4</span>
                <div>
                  <strong>ដាក់ប៊ូតុង Cancel ៖</strong> ដាក់ Button ឈ្មោះ <code>btnCancel</code>។ កំណត់ <code>OnSelect = ResetForm(frmRequest); Back()</code>។
                </div>
              </div>
              <div class="objective-item">
                <span class="obj-num">5</span>
                <div>
                  <strong>ធ្វើតេស្តផ្ទៀងផ្ទាត់ ៖</strong> ប្តូរស្ថានភាពទៅ "In Progress" ចុច Save និងផ្ទៀងផ្ទាត់ថា Gallery បង្ហាញទិន្នន័យថ្មីដោយគ្មានជួរស្ទួន!
                </div>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការដើរពិនិត្យ ៖</strong> ពិនិត្យមើលថាគ្រប់សិស្សទាំងអស់បានកំណត់ Item = galRequests.Selected ត្រឹមត្រូវ។ បើមានសិស្សឃើញ "No item to display" ចូរប្រាប់គាត់ភ្លាម។</p>`
    },

    // Slide 18: Common Misconceptions
    {
      title: "ការយល់ច្រឡំជាទូទៅ និងអន្ទាក់រចនាសម្ព័ន្ធ",
      segment: "ផ្នែកទី ១២ &bull; អន្ទាក់គ្រោះថ្នាក់",
      subtitle: "អន្ទាក់គំនិតរបស់អ្នកចាប់ផ្តើមដំបូងទាំងបីដែលបណ្តាលឱ្យខូចលំហូរ Update។",
      content: `<div class="card" style="border-top: 3px solid #ef4444;">
            <span class="card-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5;">អន្ទាក់ទី ១</span>
            <h4 style="color: #f8fafc; margin: 0.75rem 0 0.25rem 0;">SubmitForm បង្កើតតែជួរថ្មី</h4>
            <p style="color: #fecaca; font-size: 0.82rem; font-style: italic;">"SubmitForm() បង្កើតតែជួរថ្មីរហូត; ខ្ញុំត្រូវរករូបមន្ត Update ផ្សេងទៀត។"</p>
            <p style="color: var(--text-muted); font-size: 0.84rem; margin-top: 0.5rem; line-height: 1.5;">
              <strong>ដំណោះស្រាយ ៖</strong> <code>SubmitForm()</code> ពិនិត្យ <code>Form.Mode</code>។ ក្នុង Edit mode វានឹងធ្វើការ Update លើជួរក្នុង <code>Item</code> ដោយស្វ័យប្រវត្តិ!
            </p>
          </div>

          <div class="card" style="border-top: 3px solid #f59e0b;">
            <span class="card-badge" style="background: rgba(245, 158, 11, 0.2); color: #fcd34d;">អន្ទាក់ទី ២</span>
            <h4 style="color: #f8fafc; margin: 0.75rem 0 0.25rem 0;">ទុក Item ឱ្យនៅទទេ</h4>
            <p style="color: #fecaca; font-size: 0.82rem; font-style: italic;">"Power Apps ដឹងថាខ្ញុំទើបតែចុចលើជួរណាដោយមិនបាច់កំណត់ Item ទេ។"</p>
            <p style="color: var(--text-muted); font-size: 0.84rem; margin-top: 0.5rem; line-height: 1.5;">
              <strong>ដំណោះស្រាយ ៖</strong> បើ <code>Item</code> នៅទទេ Form នឹងជាប់គាំង "No item to display"។ ត្រូវតែសរសេរ <code>Item = galRequests.Selected</code>!
            </p>
          </div>

          <div class="card" style="border-top: 3px solid #8b5cf6;">
            <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: #c4b5fd;">អន្ទាក់ទី ៣</span>
            <h4 style="color: #f8fafc; margin: 0.75rem 0 0.25rem 0;">បោះបង់ដោយមិន Reset</h4>
            <p style="color: #fecaca; font-size: 0.82rem; font-style: italic;">"ខ្ញុំគ្រាន់តែចុច Back() គឺអាចបោះបង់ការកែប្រែបានហើយ។"</p>
            <p style="color: var(--text-muted); font-size: 0.84rem; margin-top: 0.5rem; line-height: 1.5;">
              <strong>ដំណោះស្រាយ ៖</strong> អក្សរដែលវាយមិនទាន់ Save នឹងជាប់ក្នុង Cache។ ត្រូវតែហៅ <code>ResetForm(frmRequest)</code> មុននឹង <code>Back()</code>!
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការដាស់តឿន ៖</strong> សង្កត់ធ្ងន់លើអន្ទាក់ទាំងបីនេះ។ នេះជាកំហុសដែលជួបប្រទះញឹកញាប់បំផុតក្នុងការប្រឡង និងការងារជាក់ស្តែង។</p>`
    },

    // Slide 19: Knowledge Check 1
    {
      title: "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង ៖ របៀបដែល SubmitForm សម្រេចចិត្ត",
      segment: "ផ្នែកទី ១៣ &bull; សំណួរផ្ទៀងផ្ទាត់ ១ នៃ ៥",
      subtitle: "ផ្ទៀងផ្ទាត់ការយល់ដឹងរបស់អ្នកអំពីស្ថានភាព Form Mode និងការបញ្ជូនទិន្នន័យ។",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ១</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                តើ <code>SubmitForm(frmRequest)</code> សម្រេចចិត្តថាតើត្រូវបង្កើតជួរថ្មី ឬកែប្រែជួរចាស់ក្នុង SharePoint ដោយរបៀបណា?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'A', false, this)">
                  <strong>A.</strong> <span>ដោយពិនិត្យមើលពណ៌របស់ប៊ូតុងថាជាពណ៌ខៀវ ឬបៃតង</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'B', true, this)">
                  <strong>B.</strong> <span>ដោយពិនិត្យ Form.Mode: New នឹងបង្កើតជួរថ្មី; Edit នឹងកែប្រែជួរក្នុង Item</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'C', false, this)">
                  <strong>C.</strong> <span>ដោយរាប់ចំនួនតួអក្សរដែលអ្នកប្រើបានវាយក្នុងប្រអប់</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(1, 'D', false, this)">
                  <strong>D.</strong> <span>ដោយសួរអ្នកប្រើប្រាស់តាមរយៈផ្ទាំង Pop-up បញ្ជាក់</span>
                </button>
              </div>
            </div>

            <div class="quiz-inspector-card" id="quiz-inspector-1">
              <div class="feedback-placeholder">
                <div class="inspector-icon">&quest;</div>
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">រង់ចាំការជ្រើសរើស</span>
                <h4>ឧបករណ៍ត្រួតពិនិត្យស្ថាបត្យកម្ម</h4>
                <p>ជ្រើសរើសជម្រើសមួយនៅខាងឆ្វេងដើម្បីផ្ទៀងផ្ទាត់យន្តការសម្រេចចិត្តរបស់ម៉ាស៊ីន។</p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-1" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-1">តក្កវិជ្ជា Mode ត្រូវបានបញ្ជាក់!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  <code>SubmitForm()</code> ជាអ្នកបញ្ជូនដ៏វៃឆ្លាត! បើ <code>Form.Mode == FormMode.New</code> វានឹងចេញ HTTP POST។ បើ <code>Form.Mode == FormMode.Edit</code> វានឹងចេញ HTTP PATCH សំដៅលើ <code>Item.ID</code>!
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការពិភាក្សា ៖</strong> សង្កត់ធ្ងន់ថា Form.Mode គឺជាកុងតាក់បញ្ជា។ យើងមិនបាច់ដូរប៊ូតុង Submit ទេ គឺគ្រាន់តែប្តូរ Mode របស់ Form ប៉ុណ្ណោះ។</p>`
    },

    // Slide 20: Knowledge Check 2 (Why Question)
    {
      title: "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង ៖ ហេតុអ្វីបានជា ResetForm() ចាំបាច់ពេល Cancel?",
      segment: "ផ្នែកទី ១៣ &bull; សំណួរផ្ទៀងផ្ទាត់ ២ នៃ ៥",
      subtitle: "ការវិភាគ Memory Buffer និងការទប់ស្កាត់ការជ្រាបទិន្នន័យ Cache។",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ២ &bull; សំណួរស្វែងយល់ហេតុផល 'Why'</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                ហេតុអ្វីបានជាកម្មវិធីត្រូវហៅ <code>ResetForm(frmRequest)</code> ពេលអ្នកប្រើចុច Cancel ជាជាងគ្រាន់តែហៅ <code>Back()</code>?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'A', false, this)">
                  <strong>A.</strong> <span>ដោយសារ Power Apps Studio នឹងបិទកុំព្យូទ័របើមានទិន្នន័យមិនទាន់ Save</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'B', true, this)">
                  <strong>B.</strong> <span>បើគ្មាន ResetForm ទេ អក្សរដែលវាយមិនទាន់ចប់នឹងជាប់ក្នុង Cache ហើយអាចជ្រាបចូលសំបុត្របន្ទាប់</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'C', false, this)">
                  <strong>C.</strong> <span>ដោយសារ ResetForm ជួយលុបជួរចោលពី SharePoint ដើម្បីសន្សំទំហំផ្ទុក</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(2, 'D', false, this)">
                  <strong>D.</strong> <span>ដោយសារ SharePoint តម្រូវឱ្យមានកូដ Reset រៀងរាល់ ២៤ ម៉ោងម្តង</span>
                </button>
              </div>
            </div>

            <div class="quiz-inspector-card" id="quiz-inspector-2">
              <div class="feedback-placeholder">
                <div class="inspector-icon">&quest;</div>
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">រង់ចាំការជ្រើសរើស</span>
                <h4>ឧបករណ៍ត្រួតពិនិត្យស្ថាបត្យកម្ម</h4>
                <p>ជ្រើសរើសជម្រើសមួយនៅខាងឆ្វេងដើម្បីផ្ទៀងផ្ទាត់ឥរិយាបថ Memory Buffer។</p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-2" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-2">ភាពស្អាតនៃ Memory ត្រូវបានបញ្ជាក់!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  Controls របស់ Form រក្សាទុក Cache នៃការវាយបញ្ចូល។ ការហៅ <code>ResetForm()</code> នឹងលាងសម្អាត Memory មិនល្អ និងទាញយកទិន្នន័យពិតស្អាតពី SharePoint មកវិញ!
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការសង្កត់ធ្ងន់ ៖</strong> ពន្យល់សិស្សពីបញ្ហា Form Memory Leakage។ បើគ្មាន ResetForm ទេ ពេលយើងចុចមើលសំបុត្រផ្សេង យើងអាចឃើញអក្សរដែលយើងទើបតែវាយជាប់នៅឡើយ។</p>`
    },

    // Slide 21: Knowledge Check 3 (What Happens If)
    {
      title: "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង ៖ តើមានអ្វីកើតឡើងបើ Item នៅទទេក្នុង Edit mode?",
      segment: "ផ្នែកទី ១៣ &bull; សំណួរផ្ទៀងផ្ទាត់ ៣ នៃ ៥",
      subtitle: "ការវិភាគមូលហេតុនៃសារស្លន់ស្លោលេខ ១ របស់អ្នកចាប់ផ្តើម។",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ៣ &bull; សំណួរ 'What Happens If'</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                អ្នកអភិវឌ្ឍន៍ម្នាក់កំណត់ <code>EditForm(frmRequest)</code> ប៉ុន្តែទុក <code>frmRequest.Item</code> ឱ្យនៅទទេទាំងស្រុង។ តើមានអ្វីកើតឡើងលើអេក្រង់?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'A', false, this)">
                  <strong>A.</strong> <span>Form នឹងកែប្រែជួរទីមួយក្នុងបញ្ជី SharePoint ដោយស្វ័យប្រវត្តិ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'B', false, this)">
                  <strong>B.</strong> <span>កម្មវិធីនឹងគាំង និងបង្ហាញផ្ទាំង Error ពណ៌ក្រហម</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'C', true, this)">
                  <strong>C.</strong> <span>Form នឹងបង្ហាញ "No item to display" ហើយ DataCards ទាំងអស់ត្រូវចាក់សោ</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(3, 'D', false, this)">
                  <strong>D.</strong> <span>SharePoint នឹងបង្កើតកំណត់ត្រាទទេមួយឈ្មោះថា "Ghost Ticket"</span>
                </button>
              </div>
            </div>

            <div class="quiz-inspector-card" id="quiz-inspector-3">
              <div class="feedback-placeholder">
                <div class="inspector-icon">&quest;</div>
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">រង់ចាំការជ្រើសរើស</span>
                <h4>ឧបករណ៍ត្រួតពិនិត្យស្ថាបត្យកម្ម</h4>
                <p>ជ្រើសរើសជម្រើសមួយនៅខាងឆ្វេងដើម្បីផ្ទៀងផ្ទាត់ការចងភ្ជាប់របស់ Form។</p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-3" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-3">ការវិភាគត្រូវបានដោះស្រាយ!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  EditForm មិនអាចកែប្រែខ្យល់អាកាសបានទេ! បើគ្មាន <code>Item</code> វានឹងបង្ហាញ <em>"No item to display"</em>។ គ្រាន់តែសរសេរ <code>Item = galRequests.Selected</code> នោះវានឹងដំណើរការភ្លាម។
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការពិនិត្យ ៖</strong> រំលឹកសិស្សឱ្យចាំចម្លើយនេះច្បាស់។ ពេលពួកគេឃើញ "No item to display" ពួកគេនឹងដឹងភ្លាមថាភ្លេចដាក់ Item = galRequests.Selected។</p>`
    },

    // Slide 22: Knowledge Check 4
    {
      title: "សំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង ៖ រូបមន្តប្តូរពី Gallery ទៅ Edit ត្រឹមត្រូវ",
      segment: "ផ្នែកទី ១៣ &bull; សំណួរផ្ទៀងផ្ទាត់ ៤ នៃ ៥",
      subtitle: "ស្ទាត់ជំនាញលើ Syntax នៃអន្តរកម្មលើជួរ Gallery។",
      content: `<div class="quiz-container">
            <div class="quiz-card">
              <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">សំណួរទី ៤</span>
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-top: 0.5rem;">
                តើរូបមន្តមួយណាដែលត្រឹមត្រូវសម្រាប់ភ្ជាប់លើ Icon Edit ក្នុងជួរ Gallery ដើម្បីនាំអ្នកប្រើទៅកាន់អេក្រង់កែប្រែ?
              </p>

              <div class="quiz-options">
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'A', false, this)">
                  <strong>A.</strong> <span>NewForm(frmRequest); Navigate(scrEdit)</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'B', true, this)">
                  <strong>B.</strong> <span>EditForm(frmRequest); Navigate(scrEdit, ScreenTransition.Fade)</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'C', false, this)">
                  <strong>C.</strong> <span>ResetForm(frmRequest); SubmitForm(frmRequest)</span>
                </button>
                <button class="quiz-option-btn" onclick="handleQuizAnswer(4, 'D', false, this)">
                  <strong>D.</strong> <span>ViewForm(frmRequest); Exit()</span>
                </button>
              </div>
            </div>

            <div class="quiz-inspector-card" id="quiz-inspector-4">
              <div class="feedback-placeholder">
                <div class="inspector-icon">&quest;</div>
                <span class="card-badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd;">រង់ចាំការជ្រើសរើស</span>
                <h4>ឧបករណ៍ត្រួតពិនិត្យស្ថាបត្យកម្ម</h4>
                <p>ជ្រើសរើសជម្រើសមួយនៅខាងឆ្វេងដើម្បីផ្ទៀងផ្ទាត់ Syntax នៃរូបមន្ត។</p>
              </div>
              <div class="feedback-content">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <span class="card-badge" id="quiz-badge-4" style="background: rgba(16, 185, 129, 0.2); color: #86efac;">ត្រឹមត្រូវ!</span>
                  <strong style="color: var(--text-main); font-size: 1.05rem;" id="quiz-status-4">Syntax ត្រូវបានផ្ទៀងផ្ទាត់!</strong>
                </div>
                <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
                  <code>EditForm(frmRequest)</code> ប្តូរស្ថានភាព Form និងទាញទិន្នន័យចាស់មកដាក់ រួច <code>Navigate()</code> នាំអ្នកប្រើទៅកាន់អេក្រង់ Edit យ៉ាងរលូន!
                </p>
              </div>
            </div>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការកត់សម្គាល់ ៖</strong> សង្កត់ធ្ងន់លើសញ្ញាចុចក្បៀស (;) ដែលចងពាក្យបញ្ជាពីរជាមួយគ្នា ៖ ១. ប្តូរ Mode Form និង ២. ប្តូរអេក្រង់។</p>`
    },

    // Slide 23: Final Challenge & Rubric
    {
      title: "កិច្ចការប្រឈមចុងក្រោយ (Final Challenge) ៖ ផ្ទាំងគ្រប់គ្រងវដ្តជីវិតសំបុត្រការងារ",
      segment: "ផ្នែកទី ១៤ &bull; ការវាយតម្លៃ និងតារាងពិន្ទុ",
      subtitle: "កសាងលំហូរ CRUD ពេញលេញលើច្រើនអេក្រង់ និងវាយតម្លៃតាមស្តង់ដារសហគ្រាស។",
      content: `<div class="card">
            <h3 class="card-title">🏆 លក្ខខណ្ឌតម្រូវនៃកិច្ចការ</h3>
            <div style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
              <p>កសាងវដ្តជីវិតសំបុត្រជួសជុលក្នុងរោងចក្រតាម ៤ លក្ខខណ្ឌ ៖</p>
              <ol style="padding-left: 1.2rem; margin-top: 0.5rem;">
                <li>Gallery លើ <code>scrGallery</code> បង្ហាញសំបុត្រទាំងអស់ជាមួយផ្លាកស្ថានភាព និង Icon Edit។</li>
                <li>Icon Edit ហៅ <code>EditForm()</code> និងប្តូរទៅកាន់ <code>scrEdit</code> យ៉ាងរលូន។</li>
                <li><code>frmEdit.Item = galRequests.Selected</code>; កែប្រែស្ថានភាព និងចំណាំជួសជុល។</li>
                <li>ប៊ូតុង Cancel ហៅ <code>ResetForm(frmEdit); Back()</code> ដើម្បីបោះបង់ទិន្នន័យវាយខុស។</li>
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
                  <td><strong>ការប្តូរទៅ Edit</strong></td>
                  <td>ប្តូរអេក្រង់ដោយមិនហៅ EditForm; Form នៅជាប់ View ឬ New។</td>
                  <td>រួមបញ្ចូល EditForm និង Navigate យ៉ាងរលូនដោយគ្មានភាពរអាក់រអួល។</td>
                </tr>
                <tr>
                  <td><strong>ការភ្ជាប់ Item</strong></td>
                  <td>ទុក Item ឱ្យនៅទទេ បណ្តាលឱ្យចេញ "No item to display"។</td>
                  <td>ភ្ជាប់ Item = galRequests.Selected បានយ៉ាងល្អឥតខ្ចោះ។</td>
                </tr>
                <tr>
                  <td><strong>ការទប់ស្កាត់ជួរស្ទួន</strong></td>
                  <td>ចុច Save បង្កើតជួរថ្មីស្ទួនក្នុង SharePoint។</td>
                  <td>គ្មានជួរស្ទួនឡើយ; ជួរចាស់ត្រូវបានកែប្រែត្រឹមត្រូវតាម PATCH។</td>
                </tr>
                <tr>
                  <td><strong>ស្ថាបត្យកម្ម Cancel</strong></td>
                  <td>គ្មានប៊ូតុង Cancel; អ្នកប្រើត្រូវបិទ App បើចង់បោះបង់។</td>
                  <td>ប្រើ ResetForm(frm); Back() ដោយគ្មានការជ្រាប Cache ទិន្នន័យ។</td>
                </tr>
              </tbody>
            </table>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការវាយតម្លៃ ៖</strong> ឱ្យសិស្សផ្ទៀងផ្ទាត់កូដរបស់ពួកគេធៀបនឹង Level 3 Master។ បញ្ជាក់ថាការទប់ស្កាត់ជួរស្ទួនជាលក្ខខណ្ឌសំខាន់បំផុត។</p>`
    },

    // Slide 24: Wrap-Up & Forward Bridge
    {
      title: "សង្ខេបមេរៀន ៖ អ្នកបានស្ទាត់ជំនាញវដ្តជីវិត CRUD ពេញលេញ!",
      segment: "ផ្នែកទី ១៥ &bull; ការសំយោគ និងជំហានបន្ទាប់",
      subtitle: "រំលឹកជ័យជម្នះថ្ងៃនេះ និងស្ពានចម្លងទៅកាន់ថ្ងៃទី ២៥ (ស្ថាបត្យកម្មប្រព័ន្ធពេញលេញ)។",
      content: `<div class="card" style="border-left: 3px solid #06b6d4;">
            <h3 class="card-title">🎯 សមិទ្ធផលថ្ងៃនេះ (Read &amp; Update)</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              អ្នកបានបិទបញ្ចប់រង្វង់មាសនៃទិន្នន័យសហគ្រាស ៖
            </p>
            <div style="margin-top: 0.75rem; padding: 0.75rem; background: rgba(6, 182, 212, 0.1); border-radius: 6px; font-family: var(--font-code); font-size: 0.84rem; color: #67e8f9;">
              Gallery &rarr; Selected Row &rarr; EditForm() &rarr; SubmitForm() &rarr; SharePoint Update &rarr; Gallery Refresh
            </div>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; margin-top: 0.75rem;">
              ឥឡូវនេះ អ្នកបានដឹងពីរបៀបដែលគ្រប់កម្មវិធីសហគ្រាសអានទិន្នន័យ អនុញ្ញាតឱ្យកែប្រែដោយសុវត្ថិភាព និងរក្សាទុកក្នុង Cloud ដោយមិនបង្កើតជួរស្ទួន។
            </p>
          </div>

          <div class="card" style="border-left: 3px solid #f59e0b;">
            <h3 class="card-title">🌉 ស្ពានចម្លងឆ្ពោះទៅកាន់ថ្ងៃស្អែក ៖ ថ្ងៃទី ២៥</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
              ឥឡូវនេះ យើងមានគ្រប់ដុំឥដ្ឋទាំងអស់ហើយ ៖ ដំណើរការ, តារាង, ជួរឈរ, Gallery, Form, Create, Read, និង Update។
            </p>
            <div style="margin-top: 0.75rem; padding: 0.75rem; background: rgba(245, 158, 11, 0.1); border-radius: 6px; font-family: var(--font-code); font-size: 0.84rem; color: #fcd34d;">
              ថ្ងៃស្អែក ៖ ស្ថាបត្យកម្មប្រព័ន្ធពេញលេញ (ថ្ងៃទី ២៥)<br>
              រៀបចំផែនការកសាងកម្មវិធីពេញលេញច្រើនអេក្រង់ពីដំបូង ដោយប្រើស្រទាប់ទាំង ៩ ជាមួយគ្នា!
            </div>
            <p style="color: #fcd34d; font-size: 0.85rem; font-weight: bold; margin-top: 0.75rem;">
              ថ្ងៃស្អែក អ្នកនឹងក្លាយជាស្ថាបត្យករសូហ្វវែរ (Software Architect)!
            </p>
          </div>`,
      notes: `<h4>កំណត់សម្គាល់សម្រាប់គ្រូបង្វឹក ៖</h4>
<p><strong>ការបិទបញ្ចប់ (២ នាទី) ៖</strong> "អបអរសាទរទាំងអស់គ្នា! អ្នកបានរៀនចប់ប្រតិបត្តិការ CRUD ទាំងមូលហើយ។ ថ្ងៃស្អែកយើងនឹងរួមបញ្ចូលគ្នានូវគ្រប់ស្រទាប់ទាំងអស់ដើម្បីរៀបចំបង្កើតប្រព័ន្ធពេញលេញមួយ។ ជួបគ្នាថ្ងៃស្អែក!"</p>`
    }
  ];

  // --------------------------------------------------------------------------
  // 3. ENGLISH NOTES DATA STORE (Trainer Script Quarantined in #notes-drawer)
  // --------------------------------------------------------------------------
  const ENGLISH_NOTES = [
    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Lesson Opening (2 min):</strong> "Welcome back to Day 24! Yesterday we mastered creating brand-new records. But what happens the next morning when a technician repairs the machine? They need to open that exact work order, update its status to 'Completed', and record what was repaired. Today we conquer Read and Update—the 'R' and 'U' in CRUD—learning how to modify business history without creating duplicate rows!"</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Setting Expectations:</strong> Today completes the CRUD data lifecycle. When students finish today's lesson, they will possess the full toolkit required to build 95% of all commercial business apps.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Concept Map Spiral:</strong> Walk students through how Day 21 (Gallery reading), Day 22 (Form fields), Day 23 (Create), and today's Update converge into a unified enterprise loop.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Active Retrieval Check:</strong> Have students vote and answer verbally before clicking each flip card. Praise correct explanations distinguishing <code>NewForm()</code> from <code>EditForm()</code>.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>The Workplace Crisis:</strong> Describe Senior Mechanic Bopha's situation. Highlight the devastating impact of duplicate rows: how Ticket #1043 remaining active caused an unnecessary 4-hour plant shutdown and $18,000 in wasted contractor overtime.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Plain Language Analogy:</strong> Emphasize the passport address stamp. You don't get a new human identity when you move; you stamp the new address into the existing passport. That is what <code>EditForm</code> does!</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Everyday Analogy:</strong> Walk through editing a smartphone contact. Show how browsing is Gallery, viewing is ViewForm, tapping the pencil is EditForm, and tapping Done is SubmitForm.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>The Universal CRUD Cycle:</strong> Explain the 4 letters: Create, Read, Update, Delete. Show that every database engine from SQLite to Oracle and SharePoint speaks this exact 4-letter vocabulary.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Command Mechanics:</strong> Walk through <code>EditForm(frmRequest)</code>. Point out that because the edit icon is inside the gallery row, clicking it automatically sets <code>galRequests.Selected</code>.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Interactive Master-Detail Simulation:</strong> Click Ticket #1043, then #1042, then #1041. Switch between ViewForm and EditForm. Show how the input fields toggle from read-only to editable while preserving the selected row's data.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>The Core Plumbing:</strong> Direct student attention to <code>frmRequest.Item = galRequests.Selected</code>. Address the "No item to display" panic message and show how easy it is to fix.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Decision Intelligence:</strong> Explain how <code>SubmitForm()</code> inspects <code>Form.Mode</code>. In New mode it issues HTTP POST; in Edit mode it issues HTTP PATCH targeting the record ID.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>CRUD State Engine Simulator:</strong> Click NewForm, EditForm, SubmitForm, and ResetForm. Highlight how the target ID and HTTP payload adapt dynamically based on the active command.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>The Escape Hatch:</strong> Stress why Cancel buttons must call <code>ResetForm(frmRequest)</code> before <code>Back()</code> to purge dirty memory caches and prevent data cross-contamination.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Reactive Reactivity:</strong> Explain that Power Apps is reactive like Excel. When SharePoint updates, the gallery refreshes automatically without needing manual query code.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Live Demonstration:</strong> Walk through dropping the Edit icon, setting <code>Item = galRequests.Selected</code>, wiring Submit, and adding the Cancel button. Keep your tone encouraging and steady.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Active Circulation:</strong> Monitor student screens during guided practice. Ensure every student confirms that editing Ticket #1043 does not increase the total row count in their SharePoint list.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Misconceptions Review:</strong> Refute Trap 1, 2, and 3 directly. Reassure students that understanding form modes is the hallmark of transitioning from beginner to professional developer.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Knowledge Check 1:</strong> Have students vote. Reinforce that <code>SubmitForm()</code> relies entirely on <code>Form.Mode</code> to decide between Insert and Update.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Knowledge Check 2:</strong> Reinforce memory buffer cleanliness. Explain how <code>ResetForm()</code> guarantees that uncommitted user edits do not pollute subsequent records.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Knowledge Check 3:</strong> Celebrate student mastery of diagnosing "No item to display" as a simple missing <code>Item</code> reference.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Knowledge Check 4:</strong> Verify syntax mastery of chaining <code>EditForm()</code> and <code>Navigate()</code> with a semicolon.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Rubric Evaluation:</strong> Guide students to assess their work against Level 3 Master criteria, paying special attention to duplicate prevention and cancel architecture.</p>`,

    `<h4>Trainer Speaking Script &amp; Pedagogical Cues:</h4>
<p><strong>Forward Bridge (2 min):</strong> "Congratulations! You have conquered the complete CRUD lifecycle. Tomorrow on Day 25, we step into the shoes of a Software Architect to plan and build an entire multi-screen application from scratch! See you tomorrow!"</p>`
  ];

  // Store original English slides captured from the DOM
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
    const progressBar = document.getElementById('progress-bar');
    const slideCounter = document.getElementById('slide-counter');

    const percent = ((currentSlideIndex + 1) / totalSlides) * 100;
    if (progressBar) progressBar.style.width = percent + '%';

    if (slideCounter) {
      slideCounter.textContent = isKhmerActive
        ? 'ស្លាយ ' + (currentSlideIndex + 1) + ' / ' + totalSlides
        : 'Slide ' + (currentSlideIndex + 1) + ' / ' + totalSlides;
    }
  }

  // --------------------------------------------------------------------------
  // 5. BILINGUAL TOGGLE ENGINE (Zero Layout Shift Architecture)
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
  // 7. PRESENTER LASER POINTER & SHOCKWAVE CLICK RIPPLE (Day 22 Standard)
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
    if (btnNotes) btnNotes.classList.toggle('active', isNotesOpen);
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
    if (btnOverview) btnOverview.classList.toggle('active', isOverviewOpen);
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
  // 10. INTERACTIVE SIMULATOR 1: MASTER-DETAIL READ-TO-EDIT (SLIDE 10)
  // --------------------------------------------------------------------------
  const SIM_TICKETS = {
    1043: {
      title: 'Extruder Motor High Vibration',
      titleKh: 'ម៉ូទ័រ Extruder ញ័រខ្លាំង',
      status: 'In Progress',
      priority: 'High',
      priorityKh: 'ខ្ពស់ (High)',
      notes: 'Bearings disassembled; rotor aligned.',
      notesKh: 'បានដោះគ្រាប់ប៊アリング (Bearing) និងតម្រង់រ៉ូទ័ររួចរាល់។'
    },
    1042: {
      title: 'Line 2 Conveyor Belt Squeaking',
      titleKh: 'ខ្សែពានបញ្ជូនម៉ាស៊ីន ២ ឮសំឡេងកកិត',
      status: 'Completed',
      priority: 'Medium',
      priorityKh: 'មធ្យម (Medium)',
      notes: 'Tension adjusted; roller greased.',
      notesKh: 'បានរឹតបន្តឹងខ្សែពាន និងដាក់ខ្លាញ់គោរួចរាល់។'
    },
    1041: {
      title: 'Zone 4 Temperature Sensor Drift',
      titleKh: 'សេនស័រវាស់កម្តៅតំបន់ ៤ ឡើងខុសប្រក្រតី',
      status: 'New',
      priority: 'Low',
      priorityKh: 'ទាប (Low)',
      notes: 'Awaiting multimeter calibration check.',
      notesKh: 'រង់ចាំការវាស់តេស្តដោយម៉ែត្រតេស្តភ្លើង។'
    }
  };

  window.selectSimTicket = function (ticketId) {
    activeSimTicketId = ticketId;
    ['btn-ticket-1043', 'btn-ticket-1042', 'btn-ticket-1041'].forEach(id => {
      const b = document.getElementById(id);
      if (b) b.classList.toggle('active', id === 'btn-ticket-' + ticketId);
    });
    updateSimDisplay();
  };

  window.setSimFormState = function (state) {
    activeSimMode = state;
    const btnView = document.getElementById('btn-sim-view');
    const btnEdit = document.getElementById('btn-sim-edit');
    if (btnView) btnView.classList.toggle('active', state === 'View');
    if (btnEdit) btnEdit.classList.toggle('active', state === 'Edit');
    updateSimDisplay();
  };

  function updateSimDisplay() {
    const data = SIM_TICKETS[activeSimTicketId];
    if (!data) return;

    const formTitle = document.getElementById('sim-form-title');
    const badge = document.getElementById('sim-badge');
    const titleInp = document.getElementById('sim-edit-title');
    const statusInp = document.getElementById('sim-edit-status');
    const priorityInp = document.getElementById('sim-edit-priority');
    const notesInp = document.getElementById('sim-edit-notes');

    const stateTitle = document.getElementById('sim-state-title');
    const stateDesc = document.getElementById('sim-state-desc');
    const stateCode = document.getElementById('sim-state-code');

    const isEdit = activeSimMode === 'Edit';

    if (formTitle) {
      formTitle.textContent = isKhmerActive
        ? (isEdit ? 'កែប្រែសំបុត្រជួសជុល #' : 'ពិនិត្យសំបុត្រជួសជុល #') + activeSimTicketId
        : (isEdit ? 'Edit Work Order #' : 'View Work Order #') + activeSimTicketId;
    }

    if (badge) {
      badge.textContent = isEdit ? 'Mode: FormMode.Edit' : 'Mode: FormMode.View';
      badge.style.background = isEdit ? 'rgba(6, 182, 212, 0.2)' : 'rgba(148, 163, 184, 0.2)';
      badge.style.color = isEdit ? '#67e8f9' : '#cbd5e1';
    }

    if (titleInp) {
      titleInp.value = isKhmerActive ? data.titleKh : data.title;
      titleInp.disabled = !isEdit;
    }
    if (statusInp) {
      statusInp.value = data.status;
      statusInp.disabled = !isEdit;
    }
    if (priorityInp) {
      priorityInp.value = isKhmerActive ? data.priorityKh : data.priority;
      priorityInp.disabled = !isEdit;
    }
    if (notesInp) {
      notesInp.value = isKhmerActive ? data.notesKh : data.notes;
      notesInp.disabled = !isEdit;
    }

    if (stateTitle) {
      stateTitle.textContent = isKhmerActive
        ? (isEdit ? 'ឧបករណ៍ត្រួតពិនិត្យស្ថានភាព Update (HTTP PATCH)' : 'ឧបករណ៍ត្រួតពិនិត្យស្ថានភាព View (Read-Only)')
        : (isEdit ? 'Live Update State Inspector (HTTP PATCH)' : 'Read-Only Security Inspector');
    }

    if (stateDesc) {
      if (isEdit) {
        stateDesc.textContent = isKhmerActive
          ? 'ដោយសារ Item = galRequests.Selected ចង្អុលទៅសំបុត្រលេខ #' + activeSimTicketId + ' ពេល Submit ទម្រង់នេះ វានឹងបញ្ជូនសំណើ HTTP PATCH ទៅកាន់ជួរ ID ' + activeSimTicketId + '។ ជួរដែលមានស្រាប់នឹងត្រូវ Update ជាមួយចំណាំថ្មី ដោយមិនបង្កើតជួរស្ទួនឡើយ!'
          : 'Because Item = galRequests.Selected points to Ticket #' + activeSimTicketId + ', submitting this form will issue an HTTP PATCH targeting Row ID ' + activeSimTicketId + '. The existing row will be updated with your new notes and status without creating any duplicate tickets!';
      } else {
        stateDesc.textContent = isKhmerActive
          ? 'នៅក្នុង FormMode.View រាល់ Input ទាំងអស់ត្រូវបានចាក់សោសុវត្ថិភាព។ អ្នកប្រើប្រាស់អាចពិនិត្យមើលព័ត៌មានលម្អិតទាំងអស់បានដោយមិនបារម្ភពីការច្រឡំដៃកែប្រែទិន្នន័យឡើយ។'
          : 'In FormMode.View, all inputs are rendered as read-only text. Operators can safely inspect all column details without any danger of accidental keystrokes corrupting the record.';
      }
    }

    if (stateCode) {
      stateCode.innerHTML = isEdit
        ? `Target: SharePoint.UpdateRecord(ID = ${activeSimTicketId})<br>Action: Patch(MaintenanceRequests, {ID: ${activeSimTicketId}, Status: "${data.status}"})`
        : `Target: SharePoint.ReadRecord(ID = ${activeSimTicketId})<br>Action: DisplayMode = DisplayMode.View (Read-Only)`;
    }
  }

  // --------------------------------------------------------------------------
  // 11. INTERACTIVE SIMULATOR 2: CRUD STATE ENGINE SIMULATOR (SLIDE 13)
  // --------------------------------------------------------------------------
  window.runEngineCmd = function (cmd) {
    ['btn-engine-new', 'btn-engine-edit', 'btn-engine-submit', 'btn-engine-reset'].forEach(id => {
      const b = document.getElementById(id);
      if (b) b.classList.remove('active');
    });

    const titleEl = document.getElementById('engine-title');
    const badgeEl = document.getElementById('engine-badge');
    const descEl = document.getElementById('engine-desc');
    const codeEl = document.getElementById('engine-code');

    if (cmd === 'NewForm') {
      document.getElementById('btn-engine-new')?.classList.add('active');
      if (titleEl) titleEl.textContent = isKhmerActive ? 'កូដសកម្ម ៖ NewForm(frmRequest)' : 'Active Command: NewForm(frmRequest)';
      if (badgeEl) {
        badgeEl.textContent = 'HTTP Method: N/A (State Switch)';
        badgeEl.style.background = 'rgba(16, 185, 129, 0.2)';
        badgeEl.style.color = '#86efac';
      }
      if (descEl) {
        descEl.textContent = isKhmerActive
          ? 'Form ប្តូរទៅជា FormMode.New។ វាផ្តាច់ទំនាក់ទំនងចេញពី galRequests.Selected សម្អាតប្រអប់បញ្ចូលទាំងអស់ឱ្យនៅទទេ និងត្រៀមបង្កើតជួរថ្មី។'
          : 'The form switches to FormMode.New. It unbinds from galRequests.Selected, blanks all inputs, and allocates a clean memory template ready for typing.';
      }
      if (codeEl) codeEl.innerHTML = 'Form State: FormMode.New &bull; Target ID: None (Pending) &bull; Buffer: Blank';
    } else if (cmd === 'EditForm') {
      document.getElementById('btn-engine-edit')?.classList.add('active');
      if (titleEl) titleEl.textContent = isKhmerActive ? 'កូដសកម្ម ៖ EditForm(frmRequest)' : 'Active Command: EditForm(frmRequest)';
      if (badgeEl) {
        badgeEl.textContent = 'HTTP Method: N/A (State Switch)';
        badgeEl.style.background = 'rgba(6, 182, 212, 0.2)';
        badgeEl.style.color = '#67e8f9';
      }
      if (descEl) {
        descEl.textContent = isKhmerActive
          ? 'Form ប្តូរទៅជា FormMode.Edit។ វាអាន galRequests.Selected (ID #1043) ទាញយកចំណងជើង អាទិភាព និងស្ថានភាពចាស់មកដាក់ក្នុង Memory រួចបើកសោប្រអប់បញ្ចូលទិន្នន័យ។'
          : 'The form switches to FormMode.Edit. It reads galRequests.Selected (ID #1043), loads the existing Title, Priority, and Status into memory, and enables the inputs for editing.';
      }
      if (codeEl) codeEl.innerHTML = 'Form State: FormMode.Edit &bull; Target ID: 1043 &bull; Buffer: Populated';
    } else if (cmd === 'SubmitForm') {
      document.getElementById('btn-engine-submit')?.classList.add('active');
      if (titleEl) titleEl.textContent = isKhmerActive ? 'កូដសកម្ម ៖ SubmitForm(frmRequest)' : 'Active Command: SubmitForm(frmRequest)';
      if (badgeEl) {
        badgeEl.textContent = 'HTTP Method: PATCH (Update Row 1043)';
        badgeEl.style.background = 'rgba(6, 182, 212, 0.25)';
        badgeEl.style.color = '#67e8f9';
      }
      if (descEl) {
        descEl.textContent = isKhmerActive
          ? 'ដោយសារ Form កំពុងស្ថិតក្នុង Edit mode នោះ SubmitForm() នឹងបង្កើតកញ្ចប់ទិន្នន័យ HTTP PATCH សំដៅលើជួរ ID #1043 ក្នុង SharePoint។ ជួរចាស់ត្រូវបានកែប្រែដោយមិនបង្កើតជួរស្ទួនឡើយ!'
          : 'Because the form is currently in FormMode.Edit, SubmitForm() generates an HTTP PATCH payload targeting Row ID #1043 in SharePoint. The existing record is updated without creating any duplicates!';
      }
      if (codeEl) codeEl.innerHTML = 'SharePoint Action: UpdateRecord(ID = 1043) &bull; Network Result: HTTP 200 OK &bull; Zero Duplicates';
    } else if (cmd === 'ResetForm') {
      document.getElementById('btn-engine-reset')?.classList.add('active');
      if (titleEl) titleEl.textContent = isKhmerActive ? 'កូដសកម្ម ៖ ResetForm(frmRequest)' : 'Active Command: ResetForm(frmRequest)';
      if (badgeEl) {
        badgeEl.textContent = 'HTTP Method: N/A (Buffer Purge)';
        badgeEl.style.background = 'rgba(245, 158, 11, 0.2)';
        badgeEl.style.color = '#fcd34d';
      }
      if (descEl) {
        descEl.textContent = isKhmerActive
          ? 'ResetForm() លុបចោលរាល់អក្សរដែលអ្នកប្រើទើបតែវាយខុសក្នុង Memory Cache។ វាទាញយកទិន្នន័យពិតស្អាតពី SharePoint មកដាក់វិញភ្លាមៗ។'
          : 'ResetForm() purges all uncommitted typing from local memory cache. It immediately reloads the pristine saved values from SharePoint, resetting all cards back to baseline truth.';
      }
      if (codeEl) codeEl.innerHTML = 'Cache State: Purged &bull; Data Reverted: Saved SharePoint Truth &bull; Leaks: Zero';
    }
  };

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
      options.forEach(b => {
        if (b.getAttribute('onclick') && b.getAttribute('onclick').includes('true')) {
          b.classList.add('correct');
        }
      });
    }

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

  window.selectSimTicket = window.selectSimTicket;
  window.setSimFormState = window.setSimFormState;
  window.runEngineCmd = window.runEngineCmd;
  window.handleQuizAnswer = window.handleQuizAnswer;

  window.addEventListener('keydown', handleKeyDown);

  // --------------------------------------------------------------------------
  // 16. BOOTSTRAP INITIALIZATION
  // --------------------------------------------------------------------------
  function initPresentation() {
    captureEnglishOriginals();
    initPointerAndSpotlight();
    updateProgress();
    updateTimerDisplay();

    // Initialize Simulator 1
    if (window.selectSimTicket) window.selectSimTicket(1043);
    // Initialize Simulator 2
    if (window.runEngineCmd) window.runEngineCmd('EditForm');

    console.log('Day 24 Presentation loaded successfully (Lesson 14 Standards)!');
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
