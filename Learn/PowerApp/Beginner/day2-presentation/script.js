/**
 * ============================================================================
 * POWER APPS FOUNDATION: DAY 2 PRESENTATION ENGINE
 * Topic: Instructions & Sequence (Start, Order, Finish)
 * Standalone Zero-Dependency Engine with 100% Reliable Offline Bilingual Support
 * English <-> Khmer (ភាសាខ្មែរ) with Exact 1-to-1 Content & Interactive Widgets
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. GLOBAL STATE & CONFIGURATION
  // --------------------------------------------------------------------------
  let currentSlideIndex = 0;
  let slides = [];
  let totalSlides = 0;

  // 90-Minute Agenda Live Timer State
  let timerSecondsElapsed = 0;
  let timerInterval = null;
  let isTimerRunning = false;
  const TOTAL_SESSION_SECONDS = 90 * 60; // 90 minutes

  // Presenter Notes State
  let isNotesOpen = false;

  // Bilingual State (In-DOM instant swapping)
  let isKhmerActive = false;
  const slideOriginals = {};

  // --------------------------------------------------------------------------
  // 2. COMPLETE HIGH-ACCURACY KHMER TRANSLATIONS FOR ALL 24 SLIDES
  // --------------------------------------------------------------------------
  const KHMER_SLIDES = {
    'slide-1': {
      title: 'ថ្ងៃទី ២៖ សេចក្តីណែនាំ និងលំដាប់លំដោយ',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & តម្រង់ទិស (០០:០០ - ១០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"សូមស្វាគមន៍មកកាន់ថ្ងៃទី ២ នៃវគ្គបណ្តុះបណ្តាល Microsoft Power Apps មូលដ្ឋាន!
កាលពីថ្ងៃទី ១ យើងបានរៀនថា កម្មវិធីអាជីវកម្មមួយកើតឡើងដើម្បីដោះស្រាយបញ្ហាមនុស្សពិតប្រាកដ ដោយបម្លែងធាតុបញ្ចូល (Input) ទៅជាដំណើរការ (Process) និងបញ្ចេញលទ្ធផល (Output)។
ថ្ងៃនេះនៅថ្ងៃទី ២ យើងនឹងចូលទៅមើលខាងក្នុងប្រអប់កណ្តាលនោះ គឺ 'ដំណើរការ' (PROCESS)។
តើកុំព្យូទ័រដំណើរការការងារយ៉ាងដូចម្តេច?
គឺតាមរយៈ 'សេចក្តីណែនាំ' (Instructions) និង 'លំដាប់លំដោយ' (Sequence)!
ខ្សែសង្វាក់គំនិតថ្ងៃនេះគឺ៖ សេចក្តីណែនាំ ➔ លំដាប់លំដោយ ➔ សកម្មភាព ➔ លទ្ធផល។
កម្មវិធីកុំព្យូទ័រធ្វើសកម្មភាពតាមលំដាប់លំដោយយ៉ាងម៉ត់ចត់បំផុត បើខុសលំដាប់ នោះលទ្ធផលនឹងខុសទាំងស្រុង!"`,
      content: `
        <div class="hero-layout">
          <div class="hero-pill-group">
            <span class="hero-pill">ដំណាក់កាលទី ១៖ មូលដ្ឋានគ្រឹះ</span>
            <span class="hero-pill teal-pill">ថ្ងៃទី ២ នៃ ២៧</span>
            <span class="hero-pill blue-pill">៩០ នាទី</span>
          </div>
          <h1 class="hero-title">
            <span class="gradient-text">សេចក្តីណែនាំ &amp; លំដាប់លំដោយ</span><br>
            របៀបដែលកម្មវិធីអនុវត្តតាមជំហានពីដើមដល់ចប់
          </h1>
          <p class="hero-subtitle">
            រាល់កម្មវិធីឌីជីថលទាំងអស់តែងតែប្រតិបត្តិតាមបញ្ជារបស់មនុស្សយ៉ាងម៉ត់ចត់។ ស្វែងយល់ពីមូលហេតុដែលកុំព្យូទ័រមិនចេះស្មាន របៀបដែលលំដាប់ការពារគ្រោះមហន្តរាយ និងរបៀបដែល Power Apps ភ្ជាប់សកម្មភាព។
          </p>

          <div class="title-feature-grid">
            <div class="feature-item">
              <span class="feature-icon">&#128221;</span>
              <div class="feature-info">
                <h4>១. សេចក្តីណែនាំ (Instruction)</h4>
                <p>បញ្ជាច្បាស់លាស់មួយ ប្រាប់ម៉ាស៊ីនឱ្យធ្វើសកម្មភាពមួយគត់។</p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">&#128260;</span>
              <div class="feature-info">
                <h4>២. លំដាប់លំដោយ (Sequence)</h4>
                <p>លំដាប់ដ៏ម៉ត់ចត់មិនអាចបំពានបាន៖ ចាប់ផ្តើម ➔ ជំហាន ➔ បញ្ចប់។</p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">&#9881;</span>
              <div class="feature-info">
                <h4>៣. ការភ្ជាប់សកម្មភាព</h4>
                <p>ក្នុង Power Fx សញ្ញាក្បៀសចំនុច (<code>;</code>) មានន័យថា <em>"ធ្វើចំណុចនេះ រួចហើយទើបធ្វើចំណុចនោះ"</em>។</p>
              </div>
            </div>
          </div>
        </div>
      `
    },

    'slide-2': {
      title: 'ផែនទីគំនិតកម្មវិធីសិក្សាទាំងមូល',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & តម្រង់ទិស (០០:០០ - ១០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"មើលរូបភាពរួមនៅលើអេក្រង់។ នេះជាគំរូផ្នត់គំនិតមេសម្រាប់កម្មវិធីសិក្សាទាំង ២៧ ថ្ងៃរបស់យើង៖
បញ្ហាពិត ➔ ដំណើរការ ➔ ទិន្នន័យ ➔ អេក្រង់/UI ➔ តក្កវិជ្ជា/ការសម្រេចចិត្ត ➔ សកម្មភាព ➔ ការផ្ទុក ➔ ការឆ្លើយតប ➔ ការសាកល្បង។
កាលពីថ្ងៃទី ១ យើងបានសិក្សាអំពីបញ្ហាពិត និងលំហូរ IPO។
ថ្ងៃនេះនៅថ្ងៃទី ២ យើងកំពុងពិនិត្យមើលក្នុងប្រអប់ដំណើរការ (Process) គឺសេចក្តីណែនាំ និងលំដាប់លំដោយ។
ហើយនៅថ្ងៃស្អែកថ្ងៃទី ៣ យើងនឹងសួរថា 'តើជំហាននីមួយៗត្រូវការអ្វីដើម្បីដំណើរការ?' គឺវាត្រូវការទិន្នន័យ (Data)!"`,
      content: `
        <div class="slide-header">
          <span class="section-tag purple-tag">គំរូផ្នត់គំនិតមេ</span>
          <h2 class="slide-title">ផែនទីបង្ហាញផ្លូវកម្មវិធីសិក្សាដែលផ្សារភ្ជាប់គ្នា</h2>
          <p class="slide-lead">ទីតាំងដែលមេរៀនថ្ងៃនេះស្ថិតនៅក្នុងក្របខ័ណ្ឌជំនាញ ២៧ ថ្ងៃរបស់យើង។</p>
        </div>

        <div class="sequence-flow-container" style="flex-wrap: wrap;">
          <div class="sequence-step-card" style="border-top: 4px solid var(--color-problem); flex: 1 1 200px;">
            <span class="step-number-badge">ថ្ងៃទី ១ (កន្លងមក)</span>
            <span class="step-card-icon">&#9888;</span>
            <h3>១. បញ្ហាពិតជាក់ស្តែង</h3>
            <p>ការលំបាកនៅកន្លែងធ្វើការ៖ ម៉ាស៊ីនខូច ភាពយឺតយ៉ាវនៃក្រដាស ហានិភ័យសុវត្ថិភាព។</p>
          </div>

          <div class="flow-arrow-divider">➔</div>

          <div class="sequence-step-card" style="border-top: 4px solid var(--color-gold-accent); flex: 1 1 240px; background: rgba(245, 158, 11, 0.15); box-shadow: 0 0 16px rgba(245, 158, 11, 0.3);">
            <span class="step-number-badge" style="background: var(--color-gold-accent); color: #000; font-weight: 800;">ថ្ងៃនេះ • ថ្ងៃទី ២</span>
            <span class="step-card-icon">&#128260;</span>
            <h3>២. ដំណើរការ (លំដាប់លំដោយ)</h3>
            <p>សេចក្តីណែនាំតាមលំដាប់៖ <em>សេចក្តីណែនាំ ➔ លំដាប់ ➔ សកម្មភាព ➔ លទ្ធផល</em>។</p>
          </div>

          <div class="flow-arrow-divider">➔</div>

          <div class="sequence-step-card" style="border-top: 4px solid var(--fluent-blue-light); flex: 1 1 200px;">
            <span class="step-number-badge">ថ្ងៃទី ៣ (ថ្ងៃស្អែក)</span>
            <span class="step-card-icon">&#128196;</span>
            <h3>៣. ទិន្នន័យ (Data)</h3>
            <p>អ្វីដែលជំហាននីមួយៗត្រូវការ៖ អត្ថបទ លេខ កាលបរិច្ឆេទ តម្លៃប៊ូលីន បាទ/ទេ (Yes/No)។</p>
          </div>

          <div class="flow-arrow-divider">➔</div>

          <div class="sequence-step-card" style="border-top: 4px solid var(--color-lilac-accent); flex: 1 1 200px;">
            <span class="step-number-badge">ថ្ងៃបន្តបន្ទាប់</span>
            <span class="step-card-icon">&#128187;</span>
            <h3>៤. UI ➔ តក្កវិជ្ជា ➔ ការផ្ទុក</h3>
            <p>អេក្រង់ ប៊ូតុង រូបមន្ត Power Fx និងតារាង SharePoint។</p>
          </div>
        </div>

        <div style="background-color: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 14px 20px;">
          <p style="font-size: 0.94rem; color: #fff;">
            <strong>🔗 ខ្សែសង្វាក់ភ្ជាប់ថ្ងៃនេះ៖</strong> <span style="color: var(--color-gold-accent);">សេចក្តីណែនាំ</span> ➔ <span style="color: var(--fluent-blue-light);">លំដាប់លំដោយ</span> ➔ <span style="color: var(--fluent-teal-light);">សកម្មភាព</span> ➔ <span style="color: var(--color-output);">លទ្ធផល</span>។ លំដាប់ត្រឹមត្រូវទើបបង្កើតលទ្ធផលជោគជ័យ!
          </p>
        </div>
      `
    },

    'slide-3': {
      title: 'រំលឹកចំណេះដឹងពីថ្ងៃទី ១',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & តម្រង់ទិស (០០:០០ - ១០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"មុននឹងបន្តទៅមុខ ចូររំលឹកគំនិតស្នូលពីថ្ងៃទី ១ ឡើងវិញ៖
១. កម្មវិធី (Application) ជាអ្វី? ជាឧបករណ៍កម្មវិធីដែលបង្កើតឡើងដើម្បីធ្វើការងារជាក់លាក់មួយសម្រាប់មនុស្ស។
២. អ្នកប្រើប្រាស់ (User) ជាអ្នកណា? ជាមនុស្សដែលប្រតិបត្តិការកម្មវិធី — កុំភ្លេចពីស្រោមដៃ ល្បឿន និងសុវត្ថិភាពរបស់គាត់!
៣. ច្បាប់មាស IPO ជាអ្វី? ធាតុបញ្ចូល (Input) ➔ ដំណើរការ (Process) ➔ ធាតុចេញ (Output)។
៤. 'បញ្ចូលសំរាម ចេញសំរាម' មានន័យដូចម្តេច? បើបញ្ចូលទិន្នន័យខុស កុំព្យូទ័រនឹងដំណើរការខុស និងផ្តល់លទ្ធផលខុស!"`,
      content: `
        <div class="slide-header">
          <span class="section-tag">រំលឹកចំណេះដឹងចាស់</span>
          <h2 class="slide-title">ពិនិត្យមើលគ្រឹះរឹងមាំពីថ្ងៃទី ១ របស់យើង</h2>
          <p class="slide-lead">ពង្រឹងគោលគំនិតទាំង ៤ ឡើងវិញមុននឹងបន្ថែមរឿងលំដាប់លំដោយ។</p>
        </div>

        <div class="sequence-flow-container">
          <div class="sequence-step-card start-card">
            <span class="step-number-badge">រំលឹកចំណុច ១</span>
            <span class="step-card-icon">&#128241;</span>
            <h3>១. កម្មវិធី (Application)</h3>
            <p>ឧបករណ៍ឌីជីថលដែលបង្កើតឡើងដើម្បីដោះស្រាយ <strong>ការងារជាក់លាក់មួយ</strong> សម្រាប់មនុស្ស។</p>
          </div>

          <div class="flow-arrow-divider">➔</div>

          <div class="sequence-step-card middle-card">
            <span class="step-number-badge">រំលឹកចំណុច ២</span>
            <span class="step-card-icon">&#128100;</span>
            <h3>២. អ្នកប្រើប្រាស់ (User)</h3>
            <p>មនុស្សជាចំណុចកណ្តាល៖ កម្មកររោងចក្រ អ្នកត្រួតពិនិត្យគុណភាព ឬប្រធានផ្នែក។</p>
          </div>

          <div class="flow-arrow-divider">➔</div>

          <div class="sequence-step-card finish-card">
            <span class="step-number-badge">រំលឹកចំណុច ៣</span>
            <span class="step-card-icon">&#9881;</span>
            <h3>៣. ធាតុបញ្ចូល ➔ ដំណើរការ ➔ ធាតុចេញ</h3>
            <p>អ្វីដែលយើងផ្តល់ឱ្យ ➔ អ្វីដែលកុំព្យូទ័រគិត ➔ អ្វីដែលវាបញ្ជូនត្រឡប់មកវិញ!</p>
          </div>
        </div>

        <div class="interactive-sequencer-box">
          <div class="seq-builder-header">
            <h3>&#128373; ត្រួតពិនិត្យកិច្ចការផ្ទះ៖ អ្នកស៊ើបអង្កេតទូរស័ព្ទ</h3>
            <span class="segment-pill">ពិនិត្យក្រដាសកត់ត្រា</span>
          </div>
          <p style="color: var(--text-secondary); font-size: 0.92rem;">
            តើអ្នកបានរកឃើញកម្មវិធីទូរស័ព្ទដែលដើរតាម IPO ដែរឬទេ? ឧទាហរណ៍៖ <em>នាឡិការោទិ៍</em> — ធាតុបញ្ចូល៖ ចុចម៉ោង ៦:៣០ ព្រឹក; ដំណើរការ៖ ប្រៀបធៀបម៉ោងដើរជាក់ស្តែង; ធាតុចេញ៖ បន្លឺសំឡេងរោទិ៍ឮៗ!
          </p>
        </div>
      `
    },

    'slide-4': {
      title: 'គោលបំណងរៀនសូត្រទាំង ៤ ដែលអាចវាស់វែងបាន',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & តម្រង់ទិស (០០:០០ - ១០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"នេះជាគោលដៅរៀនសូត្រទាំង ៤ ដែលអាចវាស់វែងបានសម្រាប់ថ្ងៃនេះ។ នៅនាទីទី ៩០ អ្នកសិក្សានឹងអាច៖
១. ពន្យល់និយមន័យ 'សេចក្តីណែនាំ' ជាភាសាសាមញ្ញដោយប្រើរឿងមនុស្សយន្តស្មោះត្រង់។
២. ពន្យល់ពីច្បាប់ 'លំដាប់លំដោយ' និងមូលហេតុដែលកុំព្យូទ័រមិនអាចធ្វើការងាររំលងជំហាន។
៣. តាមដាននីតិវិធីការងាររោងចក្រពីចំណុចចាប់ផ្តើម ឆ្លងកាត់ជំហាននីមួយៗ រហូតដល់បញ្ចប់។
៤. ភ្ជាប់សកម្មភាពពីរក្នុង Power Apps ដោយប្រើសញ្ញាក្បៀសចំនុច ';' ដើម្បីលុបទិន្នន័យចាស់ និងបង្ហាញសារជោគជ័យ។"`,
      content: `
        <div class="slide-header">
          <span class="section-tag purple-tag">គោលដៅថ្ងៃនេះ</span>
          <h2 class="slide-title">គោលបំណងរៀនសូត្រទាំង ៤ ដែលអាចវាស់វែងបាន</h2>
          <p class="slide-lead">អ្វីដែលអ្នកនឹងអាចពន្យល់ និងអនុវត្តបានយ៉ាងជឿជាក់នៅនាទីទី ៩០។</p>
        </div>

        <div class="objectives-list">
          <div class="objective-card">
            <div class="objective-num">០១</div>
            <div class="objective-body">
              <h3>ពន្យល់និយមន័យ "សេចក្តីណែនាំ" ជាភាសាសាមញ្ញ</h3>
              <p>ពន្យល់សេចក្តីណែនាំជាបញ្ជាច្បាស់លាស់មួយ ប្រាប់មនុស្ស ឬកុំព្យូទ័រឱ្យធ្វើសកម្មភាពមួយគត់ដែលមិនស្រពិចស្រពិល។</p>
            </div>
            <span class="objective-badge">វាក្យសព្ទ</span>
          </div>

          <div class="objective-card">
            <div class="objective-num">០២</div>
            <div class="objective-body">
              <h3>ពន្យល់ច្បាប់នៃ "លំដាប់លំដោយ" &amp; ជួរលំដាប់</h3>
              <p>បង្ហាញពីមូលហេតុដែលកុំព្យូទ័រត្រូវតែធ្វើការតាមលំដាប់ ដោយប្រើឧទាហរណ៍ "ស្រោមជើងមុនស្បែកជើង" និង "ការដុតនំ"។</p>
            </div>
            <span class="objective-badge">គំនិតស្នូល</span>
          </div>

          <div class="objective-card">
            <div class="objective-num">០៣</div>
            <div class="objective-body">
              <h3>តាមដានលំហូរការងាររោងចក្រពីដើមដល់ចប់</h3>
              <p>បំបែកការបញ្ឆេះម៉ាស៊ីន និងការត្រួតពិនិត្យសុវត្ថិភាពទៅជាដំណាក់កាលច្បាស់លាស់ មិនជាន់គ្នា។</p>
            </div>
            <span class="objective-badge">ការងាររោងចក្រ DX</span>
          </div>

          <div class="objective-card">
            <div class="objective-num">០៤</div>
            <div class="objective-body">
              <h3>យល់ពីការភ្ជាប់សកម្មភាពក្នុង Power Apps (សញ្ញាក្បៀសចំនុច <code>;</code>)</h3>
              <p>យល់ដឹងថាក្នុង Power Apps សញ្ញាក្បៀសចំនុចគ្រាន់តែមានន័យថា <em>"ធ្វើសកម្មភាពនេះ រួចហើយទើបធ្វើសកម្មភាពនោះ"</em>។</p>
            </div>
            <span class="objective-badge">ត្រៀមខ្លួនសម្រាប់ Power Fx</span>
          </div>
        </div>
      `
    },

    'slide-5': {
      title: 'កាលវិភាគជាក់លាក់ ៩០ នាទី',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & តម្រង់ទិស (០០:០០ - ១០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"នេះជាកាលវិភាគជាក់លាក់ ៩០ នាទីរបស់យើង។ មើលនាឡិកានៅខាងលើអេក្រង់។
ផ្នែកទី ១ (០០ ដល់ ១០ នាទី)៖ ស្វាគមន៍ រំលឹកកិច្ចការផ្ទះ និងគោលដៅ។
ផ្នែកទី ២ (១០ ដល់ ២២ នាទី)៖ អ្វីទៅជាសេចក្តីណែនាំ? បញ្ជាច្បាស់ ទល់នឹង មិនច្បាស់។
ផ្នែកទី ៣ (២២ ដល់ ៣៨ នាទី)៖ ហេតុអ្វីលំដាប់សំខាន់ — ច្បាប់ស្រោមជើងមុនស្បែកជើង។
នៅនាទី ៣៨៖ សម្រាក ៤ នាទី ញ៉ាំទឹក និងត្រួតពិនិត្យស្មារតី!
ផ្នែកទី ៤ (៤២ ដល់ ៥៤ នាទី)៖ ករណីសិក្សារោងចក្រ DX — សុវត្ថិភាពបញ្ឆេះម៉ាស៊ីន។
ផ្នែកទី ៥ (៥៤ ដល់ ៦៦ នាទី)៖ ការអនុវត្តផ្ទាល់លើក្តារតម្រៀបលំដាប់។
ផ្នែកទី ៦ (៦៦ ដល់ ៧៤ នាទី)៖ សំណួរពិនិត្យចំណេះដឹង ៥ សំណួរ។
ផ្នែកទី ៧ (៧៤ ដល់ ៨៤ នាទី)៖ បញ្ហាប្រឈមចុងក្រោយ ១០ នាទី។
ផ្នែកទី ៨ (៨៤ ដល់ ៩០ នាទី)៖ ផែនទីតភ្ជាប់ កិច្ចការផ្ទះ និងត្រៀមសម្រាប់ថ្ងៃទី ៣!"`,
      content: `
        <div class="slide-header">
          <span class="section-tag teal-tag">ផែនទីបង្ហាញផ្លូវ</span>
          <h2 class="slide-title">កាលវិភាគកំណត់ម៉ោងជាក់លាក់ ៩០ នាទី</h2>
          <p class="slide-lead">រៀបចំឡើងជាពិសេសសម្រាប់អ្នកចាប់ផ្តើមដំបូង ដោយមានការសម្រាកត្រឹមត្រូវ។</p>
        </div>

        <div class="agenda-table-wrapper">
          <table class="fluent-table">
            <thead>
              <tr>
                <th>ផ្នែក</th>
                <th>ចន្លោះម៉ោង</th>
                <th>រយៈពេល</th>
                <th>ប្រធានបទ &amp; សកម្មភាពអនុវត្តផ្ទាល់</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span class="segment-pill">ផ្នែកទី ១</span></td>
                <td><span class="time-range">០០:០០ – ១០:០០</span></td>
                <td><span class="duration-tag">១០ នាទី</span></td>
                <td><strong>ស្វាគមន៍ រំលឹកកិច្ចការផ្ទះថ្ងៃទី ១ &amp; គោលបំណង</strong></td>
              </tr>
              <tr>
                <td><span class="segment-pill">ផ្នែកទី ២</span></td>
                <td><span class="time-range">១០:០០ – ២២:០០</span></td>
                <td><span class="duration-tag">១២ នាទី</span></td>
                <td><strong>អ្វីទៅជាសេចក្តីណែនាំ?</strong> ឧទាហរណ៍មនុស្សយន្តស្មោះត្រង់ &amp; បញ្ជាច្បាស់លាស់។</td>
              </tr>
              <tr>
                <td><span class="segment-pill">ផ្នែកទី ៣</span></td>
                <td><span class="time-range">២២:០០ – ៣៨:០០</span></td>
                <td><span class="duration-tag">១៦ នាទី</span></td>
                <td><strong>មូលហេតុដែលលំដាប់សំខាន់៖</strong> ច្បាប់ស្រោមជើងមុនស្បែកជើង &amp; ការដុតនំ។</td>
              </tr>
              <tr style="background-color: rgba(245, 158, 11, 0.08);">
                <td><span class="segment-pill" style="background: rgba(245, 158, 11, 0.25); color: var(--color-gold-accent);">សម្រាក</span></td>
                <td><span class="time-range">៣៨:០០ – ៤២:០០</span></td>
                <td><span class="duration-tag">៤ នាទី</span></td>
                <td><strong>សម្រាកពាក់កណ្តាលម៉ោង ញ៉ាំទឹក &amp; ពិនិត្យស្មារតី</strong></td>
              </tr>
              <tr>
                <td><span class="segment-pill">ផ្នែកទី ៤</span></td>
                <td><span class="time-range">៤២:០០ – ៥៤:០០</span></td>
                <td><span class="duration-tag">១២ នាទី</span></td>
                <td><strong>ករណីសិក្សារោងចក្រ DX៖</strong> ការបញ្ឆេះម៉ាស៊ីនប្រកបដោយសុវត្ថិភាព &amp; ប្រព័ន្ធរារាំង។</td>
              </tr>
              <tr>
                <td><span class="segment-pill">ផ្នែកទី ៥</span></td>
                <td><span class="time-range">៥៤:០០ – ៦៦:០០</span></td>
                <td><span class="duration-tag">១២ នាទី</span></td>
                <td><strong>ការអនុវត្តផ្ទាល់របស់អ្នកសិក្សា៖</strong> ក្តារតម្រៀបលំដាប់អន្តរកម្ម ៤ ជំហាន។</td>
              </tr>
              <tr>
                <td><span class="segment-pill">ផ្នែកទី ៦</span></td>
                <td><span class="time-range">៦៦:០០ – ៧៤:០០</span></td>
                <td><span class="duration-tag">៨ នាទី</span></td>
                <td><strong>សំណួរពិនិត្យចំណេះដឹង ៥ សំណួរ៖</strong> ឆ្លើយភ្លាម ដឹងចម្លើយភ្លាម។</td>
              </tr>
              <tr>
                <td><span class="segment-pill">ផ្នែកទី ៧</span></td>
                <td><span class="time-range">៧៤:០០ – ៨៤:០០</span></td>
                <td><span class="duration-tag">១០ នាទី</span></td>
                <td><strong>បញ្ហាប្រឈមចុងក្រោយ ១០ នាទី៖</strong> រៀបចំលំដាប់រាយការណ៍ម៉ាស៊ីនខូច។</td>
              </tr>
              <tr>
                <td><span class="segment-pill">ផ្នែកទី ៨</span></td>
                <td><span class="time-range">៨៤:០០ – ៩០:០០</span></td>
                <td><span class="duration-tag">៦ នាទី</span></td>
                <td><strong>ផែនទីតភ្ជាប់ កិច្ចការផ្ទះ &amp; ត្រៀមសម្រាប់ថ្ងៃទី ៣៖</strong> (ទិន្នន័យពីចំណុចសូន្យ)។</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },

    'slide-6': {
      title: 'មូលហេតុដែលមេរៀននេះមាន៖ ឧប្បត្តិហេតុខូចខាត ១៨,០០០ ដុល្លារ',
      segment: 'ផ្នែកទី ២៖ អ្វីជាសេចក្តីណែនាំ? (១០:០០ - ២២:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"ហេតុអ្វីបានជាលំដាប់លំដោយសំខាន់ក្នុងជីវិតពិត? ហេតុអ្វីបានជាមេរៀននេះមានវត្តមាន?
សូមក្រឡេកមើលរោងចក្រ Apex Plastics Manufacturing — ករណីសិក្សារបស់យើង។
កាលពីខែមុន កម្មករថ្មីម្នាក់បានមកដល់វេនទី ១។
ដោយសារប្រញាប់ចង់បានបរិមាណផលិតកម្ម គាត់បានចុចប៊ូតុង [START] បញ្ឆេះម៉ាស៊ីនកៀបធារាសាស្ត្រ មុនពេលបើកកង្ហារត្រជាក់ និងមុនពេលពិនិត្យសម្ពាធប្រេងធារាសាស្ត្រ!
តើមានអ្វីកើតឡើង?
ស្នប់ធារាសាស្ត្របានវិលស្ងួតអស់ ៩០ វិនាទី។ ដែកកកិតនឹងដែក។
ស្នប់បានជាប់គាំង បំពង់ប្រេងបែកធ្លាយ និងខូចខាតអស់ ១៨,០០០ ដុល្លារ — ធ្វើឱ្យរោងចក្រត្រូវផ្អាកដំណើរការអស់ ២ ថ្ងៃពេញ!
សកម្មភាពបញ្ឆេះម៉ាស៊ីនមិនមែនជាសកម្មភាពខុសទេ ប៉ុន្តែវាជាមហន្តរាយដោយសារតែ 'ខុសលំដាប់លំដោយ'!"`,
      content: `
        <div class="slide-header">
          <span class="section-tag" style="background: rgba(251, 113, 133, 0.2); color: var(--color-problem); border-color: rgba(251, 113, 133, 0.4);">មូលហេតុដែលមេរៀននេះមាន</span>
          <h2 class="slide-title">ឧប្បត្តិហេតុខូចខាត ១៨,០០០ ដុល្លារ ដោយសារបញ្ឆេះខុសលំដាប់</h2>
          <p class="slide-lead">ផលវិបាកធ្ងន់ធ្ងរនៅពេលដែលជំហានការងារត្រូវបានអនុវត្តខុសលំដាប់លំដោយ។</p>
        </div>

        <div class="comparison-grid">
          <div class="comparison-col bad-col">
            <div class="comparison-col-header">
              <span class="bad-icon">&#9888;</span>
              <h3>មហន្តរាយនៃការធ្វើខុសលំដាប់ (Apex Plastics)</h3>
            </div>
            <ul class="comparison-list">
              <li><strong>ជំហាន ក (ធ្វើមុនដោយច្រឡំ)៖</strong> កម្មករបានចុចប៊ូតុងបៃតង [START] ភ្លាមៗ។</li>
              <li><strong>ជំហាន ខ (រំលងចោល)៖</strong> មិនបានបើកប្រព័ន្ធកង្ហារត្រជាក់ធារាសាស្ត្រ។</li>
              <li><strong>ជំហាន គ (រំលងចោល)៖</strong> មិនបានពិនិត្យសម្ពាធប្រេង (នៅសល់ 0 PSI)។</li>
              <li><strong>មហន្តរាយ៖</strong> ស្នប់វិលស្ងួត កកិតដែកជាប់គាំង ខូចខាត ១៨,០០០ ដុល្លារ បិទរោងចក្រ ៤៨ ម៉ោង!</li>
            </ul>
          </div>

          <div class="comparison-col good-col">
            <div class="comparison-col-header">
              <span class="good-icon">&#10004;</span>
              <h3>ស្តង់ដារលំដាប់ត្រឹមត្រូវ (សុវត្ថិភាព)</h3>
            </div>
            <ul class="comparison-list">
              <li><strong>ជំហាន ១៖</strong> ពិនិត្យរបាំងសុវត្ថិភាពអុបទិក (Light Curtain)។</li>
              <li><strong>ជំហាន ២៖</strong> បើកសោភ្លើងធំ Master Power &amp; កង្ហារត្រជាក់។</li>
              <li><strong>ជំហាន ៣៖</strong> ផ្ទៀងផ្ទាត់សម្ពាធប្រេងធារាសាស្ត្រឱ្យដល់ 50 PSI ថេរ។</li>
              <li><strong>ជំហាន ៤៖</strong> ចុចប៊ូតុងបៃតង [START] ➔ ដំណើរការប្រកបដោយសុវត្ថិភាព!</li>
            </ul>
          </div>
        </div>

        <div style="background: rgba(251, 113, 133, 0.15); border: 1px solid rgba(251, 113, 133, 0.4); border-radius: var(--radius-sm); padding: 12px 18px;">
          <p style="font-size: 0.95rem; color: #fff;">
            <strong>💡 មេរៀនស្នូល៖</strong> ក្នុងកម្មវិធី និងម៉ាស៊ីន ការធ្វើរឿងត្រឹមត្រូវក្នុងលំដាប់ខុស ស្មើនឹងបរាជ័យទាំងស្រុង!
          </p>
        </div>
      `
    },

    'slide-7': {
      title: 'គំនិតទី ១៖ តើអ្វីទៅជា "សេចក្តីណែនាំ"?',
      segment: 'ផ្នែកទី ២៖ អ្វីជាសេចក្តីណែនាំ? (១០:០០ - ២២:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"សូមកំណត់ពាក្យគន្លឹះដំបូងរបស់យើង៖ សេចក្តីណែនាំ (INSTRUCTION)។
ជាភាសាសាមញ្ញ សេចក្តីណែនាំគឺជាបញ្ជាតែមួយគត់ និងច្បាស់លាស់ ដែលប្រាប់នរណាម្នាក់ ឬម៉ាស៊ីនណាមួយឱ្យធ្វើសកម្មភាពតែមួយគត់។
គិតអំពីមនុស្សយន្តម្នាក់។
បើអ្នកប្រាប់មនុស្ស៖ 'ជួយធ្វើអាហារពេលព្រឹកបន្តិច' មនុស្សយល់ ព្រោះមនុស្សមានវិចារណញាណ។
ប៉ុន្តែបើអ្នកប្រាប់កុំព្យូទ័រ ឬមនុស្សយន្តបែបនេះ វានឹងឈរធ្មឹង មិនធ្វើអ្វីទាំងអស់!
ពីព្រោះពាក្យ 'ធ្វើអាហារពេលព្រឹក' វាស្រពេចស្រពិលពេក!
សម្រាប់កុំព្យូទ័រ អ្នកត្រូវបំបែកវាជាសេចក្តីណែនាំតូចៗ៖
១. ដើរទៅកាន់ទូទឹកកក។
២. បើកទ្វារទូទឹកកក។
៣. ចាប់យកប្រអប់ស៊ុត។
រាល់ជំហាននីមួយៗ គឺជា 'សេចក្តីណែនាំ' មួយ!"`,
      content: `
        <div class="slide-header">
          <span class="section-tag">វាក្យសព្ទគន្លឹះ</span>
          <h2 class="slide-title">គំនិតទី ១៖ តើអ្វីទៅជា "សេចក្តីណែនាំ" (Instruction)?</h2>
          <p class="slide-lead">បញ្ជាតែមួយគត់ និងច្បាស់លាស់ ប្រាប់ម៉ាស៊ីនឱ្យធ្វើសកម្មភាពមួយគត់។</p>
        </div>

        <div class="sequence-flow-container">
          <div class="sequence-step-card start-card">
            <span class="step-number-badge">ឧទាហរណ៍ជីវិតប្រចាំថ្ងៃ</span>
            <span class="step-card-icon">&#129302;</span>
            <h3>មនុស្សយន្តស្មោះត្រង់</h3>
            <p>មនុស្សយន្តគ្មានវិចារណញាណទេ។ បើអ្នកប្រាប់ថា <em>"រៀបបន្ទប់"</em> វានឹងមិនកម្រើកឡើយ។ អ្នកត្រូវប្រាប់ថា៖ <em>"លើកប្រអប់នោះឡើង"</em>។</p>
          </div>

          <div class="flow-arrow-divider">➔</div>

          <div class="sequence-step-card middle-card">
            <span class="step-number-badge">ឧទាហរណ៍រោងចក្រ</span>
            <span class="step-card-icon">&#128295;</span>
            <h3>ស្តង់ដារការងារ (SOP)</h3>
            <p>នីតិវិធីស្តង់ដារប្រតិបត្តិការកើតឡើងពីសេចក្តីណែនាំ៖ <em>"រឹតប៊ូឡុងតាមទ្រនិចនាឡិកាឱ្យដល់កម្លាំង 25 Nm"</em>។</p>
          </div>

          <div class="flow-arrow-divider">➔</div>

          <div class="sequence-step-card finish-card">
            <span class="step-number-badge">ឧទាហរណ៍ POWER APPS</span>
            <span class="step-card-icon">&#128241;</span>
            <h3>សកម្មភាពកម្មវិធី</h3>
            <p>ក្នុង Power Apps ប៊ូតុងមួយមានសេចក្តីណែនាំ៖ <em>"រក្សាទុកទិន្នន័យ"</em> ឬ <em>"ប្តូរទៅកាន់អេក្រង់ទី ២"</em>។</p>
          </div>
        </div>

        <div style="background: rgba(0, 120, 212, 0.15); border: 1px solid rgba(0, 120, 212, 0.4); padding: 14px 20px; border-radius: 10px; display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 1.5rem;">&#128161;</span>
          <span style="font-size: 0.95rem; color: #fff;">
            <strong>ច្បាប់នៃសេចក្តីណែនាំ៖</strong> កុំព្យូទ័រមិនដែលចេះស្មានអារម្មណ៍ ឬបំណងរបស់អ្នកឡើយ។ អ្នកត្រូវតែផ្តល់បញ្ជាដែលច្បាស់ សាមញ្ញ និងមួយៗដាច់ដោយឡែក!
          </span>
        </div>
      `
    },

    'slide-8': {
      title: 'សេចក្តីណែនាំច្បាស់លាស់ ទល់នឹង មិនច្បាស់លាស់',
      segment: 'ផ្នែកទី ២៖ អ្វីជាសេចក្តីណែនាំ? (១០:០០ - ២២:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"មើលភាពខុសគ្នារវាងសេចក្តីណែនាំដែលមិនច្បាស់លាស់ និងសេចក្តីណែនាំដែលច្បាស់លាស់។
នៅខាងឆ្វេង៖
'ពិនិត្យម៉ាស៊ីន' — ពិនិត្យអ្វី? ប្រេង? កម្តៅ? ឬថ្នាំពណ៌?
'ដោះស្រាយកំហុស' — ដោះស្រាយយ៉ាងម៉េច? បិទម៉ាស៊ីន? ទូរស័ព្ទហៅមេ? ឬទុកវាចោល?
នៅខាងស្តាំ៖
'អានកម្តៅឌីជីថលលើឧបករណ៏ Sensor 3' — ច្បាស់លាស់ណាស់!
'បើកម្តៅលើសពី 80°C ត្រូវបើកភ្លើងសញ្ញាក្រហម' — ច្បាស់លាស់ឥតខ្ចោះ!
ក្នុង Power Apps អ្នកនឹងមិនសរសេរបញ្ជាស្រពិចស្រពិលបែបនេះទេ អ្នកនឹងសរសេរជំហានជាក់លាក់!"`,
      content: `
        <div class="slide-header">
          <span class="section-tag purple-tag">ភាពជាក់លាក់ក្នុងកុំព្យូទ័រ</span>
          <h2 class="slide-title">សេចក្តីណែនាំច្បាស់លាស់ ទល់នឹង មិនច្បាស់លាស់</h2>
          <p class="slide-lead">កុំព្យូទ័រនឹងបរាជ័យពេលបញ្ជាស្រពិចស្រពិល។ វានឹងដំណើរការល្អឥតខ្ចោះពេលបញ្ជាជាក់លាក់។</p>
        </div>

        <div class="comparison-grid">
          <div class="comparison-col bad-col">
            <div class="comparison-col-header">
              <span class="bad-icon">&#10060;</span>
              <h3>សេចក្តីណែនាំមិនច្បាស់ (កុំព្យូទ័របរាជ័យ)</h3>
            </div>
            <ul class="comparison-list">
              <li><span class="bad-icon">&#10006;</span> <em>"ធ្វើឱ្យវាដំណើរការទៅ។"</em> <span>(ម៉ាស៊ីនមួយណា? លទ្ធផលបែបណា?)</span></li>
              <li><span class="bad-icon">&#10006;</span> <em>"ពិនិត្យសីតុណ្ហភាព។"</em> <span>(នៅកន្លែងណា? កម្រិតណាទើបមានសុវត្ថិភាព?)</span></li>
              <li><span class="bad-icon">&#10006;</span> <em>"ប្រាប់មេផងបើវាខូច។"</em> <span>(មេណាគេ? ប្រាប់តាមអ៊ីមែល ឬទូរស័ព្ទ?)</span></li>
              <li><span class="bad-icon">&#10006;</span> <em>"រក្សាទុកព័ត៌មានទៅ។"</em> <span>(ទុកនៅឯណា? យកទិន្នន័យអ្វីខ្លះ?)</span></li>
            </ul>
          </div>

          <div class="comparison-col good-col">
            <div class="comparison-col-header">
              <span class="good-icon">&#10004;</span>
              <h3>សេចក្តីណែនាំច្បាស់លាស់ (កុំព្យូទ័រជោគជ័យ)</h3>
            </div>
            <ul class="comparison-list">
              <li><span class="good-icon">&#10004;</span> <em>"អានឧបករណ៍វាស់កម្តៅឌីជីថល Sensor 3។"</em> <span>(ទីតាំងជាក់លាក់)</span></li>
              <li><span class="good-icon">&#10004;</span> <em>"បើកម្តៅ &gt; 80°C ត្រូវបើកភ្លើងសញ្ញាក្រហមភ្លាម។"</em> <span>(ច្បាប់ច្បាស់លាស់)</span></li>
              <li><span class="good-icon">&#10004;</span> <em>"ផ្ញើអ៊ីមែលដំណឹងទៅកាន់អ្នកគ្រប់គ្រង ភ្ជាប់ជាមួយ Machine ID។"</em> <span>(គោលដៅជាក់លាក់)</span></li>
              <li><span class="good-icon">&#10004;</span> <em>"រក្សាទុកឈ្មោះប្រតិបត្តិករ និងកាលបរិច្ឆេទក្នុង SharePoint List។"</em> <span>(កន្លែងផ្ទុកទិន្នន័យច្បាស់លាស់)</span></li>
            </ul>
          </div>
        </div>

        <div class="comparison-takeaway">
          <div class="takeaway-icon">💡</div>
          <div class="takeaway-text">
            <strong>មេរៀនសម្រាប់ Power Apps៖</strong> កុំព្យូទ័រមិនចេះស្មានបំណងរបស់អ្នកឡើយ។ រាល់ប៊ូតុង និងរូបមន្ត Power Fx ទាំងអស់ ត្រូវការសេចក្តីណែនាំច្បាស់លាស់ និងជាក់លាក់ជាជំហានៗ!
          </div>
        </div>
      `
    },

    'slide-11': {
      title: 'ឧទាហរណ៍ជីវិតប្រចាំថ្ងៃទី ២៖ គ្រោះមហន្តរាយនៃការដុតនំខុសលំដាប់',
      segment: 'ផ្នែកទី ៣៖ ច្បាប់នៃលំដាប់ (២២:០០ - ៣៨:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"មើលឧទាហរណ៍មួយទៀត៖ ការដុតនំខេក។
រូបមន្តធ្វើម្ហូប គឺជាកម្មវិធីកុំព្យូទ័រដែលសរសេរឡើងសម្រាប់ចុងភៅជាមនុស្ស។
មើលខាងស្តាំ៖
១. កូរម្សៅ ស៊ុត និងស្ករក្នុងចាន។
២. ចាក់ម្សៅចូលក្នុងពុម្ពនំ។
៣. ដាក់ដុតក្នុងឡនៅកម្តៅ 180°C រយៈពេល ៣០ នាទី។
លទ្ធផល៖ នំខេកទន់ឆ្ងាញ់!
ចុះបើធ្វើច្របល់លំដាប់នៅខាងឆ្វេងវិញ៖
១. ដាក់ពុម្ពទទេចូលក្នុងឡក្តៅ ៣០ នាទី។
២. ទាញពុម្ពដែកក្តៅហុយផ្សែងចេញមក។
៣. ចាក់ស៊ុតឆៅ និងម្សៅស្ងួតទៅលើតុបាយ។
តើបានអ្វីមកវិញ? ផ្សែងហុយ ក្តាររោទិ៍ភ្លើងរោទិ៍ និងផ្ទះបាយខូចខាត!
គ្រឿងផ្សំមានគ្រប់ កម្តៅត្រឹមត្រូវ ប៉ុន្តែលំដាប់ខុសបានបំផ្លាញអ្វីៗទាំងអស់!"`,
      content: `
        <div class="slide-header">
          <span class="section-tag">ការបង្ហាញទី ១</span>
          <h2 class="slide-title">គ្រោះមហន្តរាយនៃការដុតនំខុសលំដាប់</h2>
          <p class="slide-lead">រូបមន្តធ្វើម្ហូបគ្រាន់តែជាកម្មវិធីដែលសរសេរឡើងសម្រាប់ចុងភៅប៉ុណ្ណោះ។</p>
        </div>

        <div class="comparison-grid">
          <div class="comparison-col good-col">
            <div class="comparison-col-header">
              <span class="good-icon">&#127856;</span>
              <h3>លំដាប់រូបមន្តត្រឹមត្រូវ</h3>
            </div>
            <ul class="comparison-list">
              <li><strong>ជំហាន ១៖</strong> វាយបញ្ចូលម្សៅ ស៊ុត ទឹកដោះគោ និងស្ករឱ្យម៉ត់ល្អ។</li>
              <li><strong>ជំហាន ២៖</strong> ចាក់ម្សៅដែលលាយរួចចូលក្នុងពុម្ពនំ។</li>
              <li><strong>ជំហាន ៣៖</strong> ដាក់ចូលក្នុងឡកម្តៅ 180°C រយៈពេល ៣០ នាទី។</li>
              <li><strong>លទ្ធផល៖</strong> នំខេកពណ៌លឿងទុំ ឈ្ងុយឆ្ងាញ់ ត្រៀមរីករាយ!</li>
            </ul>
          </div>

          <div class="comparison-col bad-col">
            <div class="comparison-col-header">
              <span class="bad-icon">&#128293;</span>
              <h3>លំដាប់ច្របល់ (មហន្តរាយផ្ទះបាយ)</h3>
            </div>
            <ul class="comparison-list">
              <li><strong>ជំហាន ១៖</strong> ដាក់ពុម្ពដែកទទេចូលក្នុងឡកម្តៅ 180°C រយៈពេល ៣០ នាទី។</li>
              <li><strong>ជំហាន ២៖</strong> លើកយកពុម្ពដែកក្តៅហុយផ្សែងចេញមកក្រៅ។</li>
              <li><strong>ជំហាន ៣៖</strong> ចាក់ស៊ុតឆៅ និងម្សៅស្ងួតទៅលើតុបាយ។</li>
              <li><strong>លទ្ធផល៖</strong> ភ្លើងឆេះផ្ទះបាយ ខូចពុម្ពនំ ប្រឡាក់ម្សៅ គ្មានអ្វីញ៉ាំ!</li>
            </ul>
          </div>
        </div>
      `
    },

    'slide-12': {
      title: 'ការអនុវត្តអន្តរកម្ម៖ ការឆុងកាហ្វេពេលព្រឹក',
      segment: 'ផ្នែកទី ៣៖ ច្បាប់នៃលំដាប់ (២២:០០ - ៣៨:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"ឥឡូវនេះ ចូរយើងសាកល្បងដោយផ្ទាល់ដៃ!
មើលក្តារអន្តរកម្មនៅលើអេក្រង់៖ 'ការឆុងកាហ្វេពេលព្រឹក'។
យើងមាន ៤ ជំហានដែលច្របល់គ្នានៅខាងលើ៖
- ដាក់កាហ្វេម៉ត់
- រីករាយជាមួយកាហ្វេក្តៅ
- ដាំទឹកឱ្យពុះ
- ចាក់ទឹកពុះ
តោះចុចតាមលំដាប់!
តើជំហានទី ១ ជាអ្វី? ដាំទឹកឱ្យពុះ! ចុចលើវា។
ជំហានទី ២ ជាអ្វី? ដាក់កាហ្វេម៉ត់ចូលក្នុងតម្រង!
ជំហានទី ៣ ជាអ្វី? ចាក់ទឹកពុះពីលើកាហ្វេ!
ជំហានទី ៤ ជាអ្វី? រីករាយជាមួយកាហ្វេក្តៅ!
មើលផ្ទាំងបៃតងលេចឡើងនៅពេលលំដាប់ត្រឹមត្រូវ ១០០%!"`,
      content: `
        <div class="slide-header">
          <span class="section-tag purple-tag">ការអនុវត្តអន្តរកម្ម</span>
          <h2 class="slide-title">ក្តារតម្រៀបលំដាប់អន្តរកម្ម៖ ការឆុងកាហ្វេពេលព្រឹក</h2>
          <p class="slide-lead">ចុចលើប៊ូតុងខាងក្រោមតាមលំដាប់ត្រឹមត្រូវពិតប្រាកដ (ពីជំហាន ១ ដល់ ៤)។</p>
        </div>

        <div class="interactive-sequencer-box">
          <div class="seq-builder-header">
            <h3>ជំហានដែលមាន (ចុចតាមលំដាប់)៖</h3>
            <button class="footer-icon-btn" id="coffee-reset-btn" title="កំណត់ឡើងវិញ">↺ កំណត់ឡើងវិញ</button>
          </div>

          <div class="seq-items-pool" id="everyday-seq-pool">
            <button class="seq-drag-item" data-step="grounds">&#9749; ដាក់កាហ្វេម៉ត់</button>
            <button class="seq-drag-item" data-step="enjoy">&#128523; រីករាយជាមួយកាហ្វេក្តៅ</button>
            <button class="seq-drag-item" data-step="boil">&#128293; ដាំទឹកឱ្យពុះ</button>
            <button class="seq-drag-item" data-step="pour">&#128167; ចាក់ទឹកពុះ</button>
          </div>

          <div class="seq-drop-slots">
            <div class="seq-slot" id="everyday-slot-1">
              <span class="slot-label">ជំហានទី ១</span>
              <span class="slot-content">— នៅទទេ —</span>
            </div>
            <div class="seq-slot" id="everyday-slot-2">
              <span class="slot-label">ជំហានទី ២</span>
              <span class="slot-content">— នៅទទេ —</span>
            </div>
            <div class="seq-slot" id="everyday-slot-3">
              <span class="slot-label">ជំហានទី ៣</span>
              <span class="slot-content">— នៅទទេ —</span>
            </div>
            <div class="seq-slot" id="everyday-slot-4">
              <span class="slot-label">ជំហានទី ៤</span>
              <span class="slot-content">— នៅទទេ —</span>
            </div>
          </div>

          <div class="seq-feedback-banner waiting" id="everyday-seq-feedback">
            👉 ចុចប៊ូតុងខាងលើតាមលំដាប់ត្រឹមត្រូវ (ពីជំហានទី ១ ដល់ ទី ៤)។
          </div>
        </div>
      `
    },

    'slide-13': {
      title: 'ការត្រួតពិនិត្យពាក់កណ្តាលម៉ោង & សម្រាក ៤ នាទី',
      segment: 'សម្រាកពាក់កណ្តាលម៉ោង (៣៨:០០ - ៤២:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"យើងបានមកដល់នាទីទី ៣៨ ហើយ! ពិតជាទាន់ពេលវេលាឥតខ្ចោះ។
ចូរសម្រាក ៤ នាទី ក្រោកឈរ ញ៉ាំទឹក និងពិនិត្យមើលស្មារតីរបស់យើងឡើងវិញ។
មើលអ្វីដែលយើងបានក្តាប់ជាប់រហូតមកដល់ពេលនេះ៖
១. សេចក្តីណែនាំ = បញ្ជាច្បាស់លាស់តែមួយគត់។
២. លំដាប់លំដោយ = លំដាប់ដ៏ម៉ត់ចត់ពី ចាប់ផ្តើម ដល់ បញ្ចប់។
៣. ពេលលំដាប់ខុស ទោះបីសេចក្តីណែនាំល្អក៏បរាជ័យដែរ!
ពិសាទឹកមួយកែវ។ ក្នុងផ្នែកទី ៤ យើងនឹងចូលទៅកាន់រោងចក្រពិតប្រាកដ!"`,
      content: `
        <div class="slide-header">
          <span class="section-tag yellow-tag">ត្រួតពិនិត្យនៅនាទីទី ៣៨:០០</span>
          <h2 class="slide-title">សម្រាក ៤ នាទី ញ៉ាំទឹក &amp; ពិនិត្យស្មារតីឡើងវិញ</h2>
          <p class="slide-lead">ដកដង្ហើមវែងៗ ញ៉ាំទឹកមួយកែវ និងផ្ទៀងផ្ទាត់គ្រឹះផ្នត់គំនិតរបស់អ្នក។</p>
        </div>

        <div class="title-feature-grid" style="margin-top: 24px;">
          <div class="feature-item" style="border-top: 4px solid var(--color-lilac-accent);">
            <span class="feature-icon">&#10004;</span>
            <div class="feature-info">
              <h4>យល់ច្បាស់ពីសេចក្តីណែនាំ</h4>
              <p>បញ្ជាច្បាស់លាស់តែមួយគត់ ប្រាប់ម៉ាស៊ីនឱ្យធ្វើការ។</p>
            </div>
          </div>

          <div class="feature-item" style="border-top: 4px solid var(--fluent-blue-light);">
            <span class="feature-icon">&#10004;</span>
            <div class="feature-info">
              <h4>យល់ច្បាស់ពីលំដាប់</h4>
              <p>ចាប់ផ្តើម ➔ ជំហាន ➔ បញ្ចប់។ ស្រោមជើងមុនស្បែកជើង!</p>
            </div>
          </div>

          <div class="feature-item" style="border-top: 4px solid var(--fluent-teal-light);">
            <span class="feature-icon">&#128640;</span>
            <div class="feature-info">
              <h4>អ្វីដែលបន្ទាប់ទៀត</h4>
              <p>ករណីសិក្សារោងចក្រ DX &amp; ការភ្ជាប់សកម្មភាព Power Apps!</p>
            </div>
          </div>
        </div>

        <div style="text-align: center; margin-top: 36px;">
          <span class="segment-pill" style="font-size: 0.9rem; padding: 6px 18px; background: rgba(245, 158, 11, 0.2); color: var(--color-gold-accent);">
            &#9201; ពេលវេលាកន្លងផុត៖ ៣៨:០០ / ៩០:០០ • អ្នកកំពុងធ្វើបានយ៉ាងល្អអស្ចារ្យ!
          </span>
        </div>
      `
    },

    'slide-14': {
      title: 'ករណីសិក្សាជាក់ស្តែងក្នុងរោងចក្រទី ១៖ លំដាប់សុវត្ថិភាពនៃការបញ្ឆេះម៉ាស៊ីន',
      segment: 'ផ្នែកទី ៤៖ ករណីសិក្សារោងចក្រ (៤២:០០ - ៥៤:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"ឥឡូវនេះ សូមបោះជំហានចូលទៅកាន់រោងចក្រផលិតកម្ម។
នេះជាម៉ាស៊ីនកៀបដែកធារាសាស្ត្រធំមួយលើខ្សែសង្វាក់ដំឡើងរថយន្ត។
ក្នុងការផលិត លំដាប់លំដោយមិនមែនគ្រាន់តែជាការងាយស្រួលនោះទេ — លំដាប់លំដោយគឺដើម្បីសុវត្ថិភាព និងការសង្គ្រោះជីវិតមនុស្ស!
មើលលំដាប់ស្តង់ដារពេលព្រឹក៖
ជំហាន ១៖ ត្រួតពិនិត្យរូបវន្ត។ ពិនិត្យរបាំងពន្លឺសុវត្ថិភាព និងប៊ូតុងឈប់បន្ទាន់ E-Stop។
ជំហាន ២៖ បើកសោភ្លើងធំ Master Power ON។
ជំហាន ៣៖ រង់ចាំ ១០ វិនាទីឱ្យសម្ពាធប្រេងធារាសាស្ត្រឡើងដល់ 50 PSI ថេរ។
ជំហាន ៤៖ ចុចប៊ូតុងបៃតង START ដើម្បីដំណើរការខ្សែសង្វាក់ផលិតកម្ម។"`,
      content: `
        <div class="slide-header">
          <span class="section-tag teal-tag">ការងាររោងចក្រ DX</span>
          <h2 class="slide-title">ករណីសិក្សាជាក់ស្តែង៖ លំដាប់សុវត្ថិភាពនៃការបញ្ឆេះម៉ាស៊ីន</h2>
          <p class="slide-lead">ក្នុងផលិតកម្មឧស្សាហកម្ម លំដាប់ការពារអាយុជីវិតមនុស្ស និងឧបករណ៍រាប់លានដុល្លារ។</p>
        </div>

        <div class="sequence-flow-container">
          <div class="sequence-step-card start-card">
            <span class="step-number-badge">ជំហាន ១ • សុវត្ថិភាព</span>
            <span class="step-card-icon">&#128737;</span>
            <h3>ពិនិត្យរបាំងសុវត្ថិភាព</h3>
            <p>ផ្ទៀងផ្ទាត់របាំងពន្លឺអុបទិក &amp; ប៊ូតុងឈប់បន្ទាន់ថាគ្មានដៃ ឬកម្ទេចកម្ទីរារាំង។</p>
          </div>

          <div class="flow-arrow-divider">➔</div>

          <div class="sequence-step-card middle-card">
            <span class="step-number-badge">ជំហាន ២ • ថាមពល</span>
            <span class="step-card-icon">&#128273;</span>
            <h3>បើកសោភ្លើងធំ</h3>
            <p>បង្វិលសោបញ្ឆេះដើម្បីផ្តល់ថាមពលដល់បន្ទះកុំព្យូទ័រ និងកង្ហារត្រជាក់។</p>
          </div>

          <div class="flow-arrow-divider">➔</div>

          <div class="sequence-step-card middle-card">
            <span class="step-number-badge">ជំហាន ៣ • សម្ពាធ</span>
            <span class="step-card-icon">&#9874;</span>
            <h3>ពិនិត្យសម្ពាធប្រេង</h3>
            <p>រង់ចាំ ១០ វិនាទីឱ្យស្នប់ធារាសាស្ត្ររុញសម្ពាធប្រេងឡើងដល់ 50 PSI ថេរ។</p>
          </div>

          <div class="flow-arrow-divider">➔</div>

          <div class="sequence-step-card finish-card">
            <span class="step-number-badge">ជំហាន ៤ • ដំណើរការ</span>
            <span class="step-card-icon">&#9654;</span>
            <h3>ចុចប៊ូតុងបៃតង START</h3>
            <p>ម៉ូទ័រចាប់ផ្តើមវិល ភ្លើងសញ្ញាបៃតងភ្លឺ ការផលិតចាប់ផ្តើមប្រកបដោយសុវត្ថិភាព!</p>
          </div>
        </div>
      `
    },

    'slide-15': {
      title: 'ករណីសិក្សាជាក់ស្តែងក្នុងរោងចក្រទី ២៖ ផលវិបាកនៃការរំលោភលើលំដាប់',
      segment: 'ផ្នែកទី ៤៖ ករណីសិក្សារោងចក្រ (៤២:០០ - ៥៤:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"ចុះបើកម្មករដែលមិនបានទទួលការបណ្តុះបណ្តាលរំលោភលើលំដាប់នេះ?
តើមានអ្វីកើតឡើងបើចុច START មុនពេលសម្ពាធប្រេងឡើងដល់ 50 PSI?
ស្នប់ស្ងួតកកិតគ្នា ឆេះម៉ូទ័រ និងខូចខាត ៣០,០០០ ដុល្លារ!
តើមានអ្វីកើតឡើងបើដាក់ដែកចូលមុនពេលពិនិត្យរបាំងសុវត្ថិភាព?
គ្រោះថ្នាក់ធ្ងន់ធ្ងរដល់រាងកាយនឹងកើតឡើង!
នេះជាមូលហេតុដែលរោងចក្រទំនើបប្រើប្រាស់ 'ប្រព័ន្ធរារាំងសុវត្ថិភាព' (DIGITAL INTERLOCKS)។
ហើយនោះជាអ្វីដែលអ្នកនឹងបង្កើតក្នុង Power Apps — កម្មវិធីអាចចាក់សោប៊ូតុង Start រហូតដល់ជំហានទី ១, ២, ៣ ត្រូវបានផ្ទៀងផ្ទាត់!"`,
      content: `
        <div class="slide-header">
          <span class="section-tag purple-tag">ហេតុអ្វីបានជា DX មានសារៈសំខាន់</span>
          <h2 class="slide-title">តើមានអ្វីកើតឡើងនៅពេលរំលោភលើលំដាប់លំដោយ?</h2>
          <p class="slide-lead">ការផ្លាស់ប្តូរឌីជីថល (DX) ការពារកំហុសមនុស្សដោយអនុវត្តលំដាប់តាមរយៈកម្មវិធីកុំព្យូទ័រ។</p>
        </div>

        <div class="comparison-grid">
          <div class="comparison-col bad-col">
            <div class="comparison-col-header">
              <span class="bad-icon">&#9888;</span>
              <h3>អន្ទាក់ក្រដាសចាស់ &amp; ការចងចាំ</h3>
            </div>
            <ul class="comparison-list">
              <li>កម្មករអស់កម្លាំង ប្រញាប់ ឬមិនទាន់ទទួលបានការបណ្តុះបណ្តាល។</li>
              <li>កម្មកររំលងជំហានទី ១ (សុវត្ថិភាព) ហើយចុចប៊ូតុង START ភ្លាម។</li>
              <li>ម៉ាស៊ីនគាំង ម៉ូទ័រឆេះ ខូចខាតផលិតកម្មអស់ ៣០,០០០ ដុល្លារ។</li>
              <li>ក្រដាសកត់ត្រាលើក្តារត្រូវបានគូសធីក <em>បន្ទាប់ពី</em> ចប់វេនការងារទៅវិញ។</li>
            </ul>
          </div>

          <div class="comparison-col good-col">
            <div class="comparison-col-header">
              <span class="good-icon">&#128241;</span>
              <h3>ដំណោះស្រាយឌីជីថល Power Apps</h3>
            </div>
            <ul class="comparison-list">
              <li>Power App ចាក់សោប៊ូតុង [START] មិនឱ្យចុចបាន រហូតដល់ជំហានទី ១ ត្រូវធីក។</li>
              <li>កម្មវិធីអានឧបករណ៏វាស់សម្ពាធប្រេងដោយស្វ័យប្រវត្តិ។</li>
              <li>ភ្លើងសញ្ញាបៃតងភ្លឺឡើងតែនៅពេលដែលគ្រប់ជំហានសុវត្ថិភាពត្រូវតាមលំដាប់។</li>
              <li>គ្មានកំហុស អនុវត្តបាន ១០០% កម្មករមានសុវត្ថិភាពខ្ពស់!</li>
            </ul>
          </div>
        </div>
      `
    },

    'slide-16': {
      title: 'ការអនុវត្តសាកល្បង៖ ប្រព័ន្ធត្រាប់តាមការបញ្ឆេះម៉ាស៊ីនដោយសុវត្ថិភាព',
      segment: 'ផ្នែកទី ៤៖ ករណីសិក្សារោងចក្រ (៤២:០០ - ៥៤:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"តោះសាកល្បងប្រព័ន្ធនេះឥឡូវនេះនៅលើក្តារពិសោធន៍ជាក់ស្តែង!
មើលភ្លើងសញ្ញាក្រហមនៅខាងឆ្វេង។ ម៉ាស៊ីនកំពុងឈប់ (STOPPED)។
យើងមាន ៤ ប៊ូតុង៖
- ពិនិត្យរបាំងសុវត្ថិភាព
- បើកសោភ្លើងធំ
- ពិនិត្យសម្ពាធ (50 PSI)
- ចុចប៊ូតុងបៃតង START
សាកល្បងចុច 'ចុចប៊ូតុងបៃតង START' ឥឡូវនេះមើល!
ឃើញទេ៖ 'ប្រព័ន្ធរារាំងសុវត្ថិភាពបានចាក់សោ៖ អ្នកមិនអាចបញ្ឆេះម៉ាស៊ីនបានទេ!'
ឥឡូវចុចតាមលំដាប់ត្រឹមត្រូវ៖
១. ពិនិត្យរបាំងសុវត្ថិភាព...
២. បើកសោភ្លើងធំ...
៣. ពិនិត្យសម្ពាធ...
៤. ចុចប៊ូតុងបៃតង START...
ភ្លើងសញ្ញាបៃតងភ្លឺឡើង ហើយម៉ាស៊ីនដំណើរការដោយសុវត្ថិភាព!"`,
      content: `
        <div class="slide-header">
          <span class="section-tag teal-tag">ការពិសោធន៍អន្តរកម្ម</span>
          <h2 class="slide-title">ប្រព័ន្ធត្រាប់តាមការបញ្ឆេះម៉ាស៊ីនប្រកបដោយសុវត្ថិភាព</h2>
          <p class="slide-lead">ស្វែងយល់ពីប្រព័ន្ធរារាំងសុវត្ថិភាព៖ អ្នកមិនអាចបញ្ឆេះបានទេ បើមិនទាន់បំពេញលក្ខខណ្ឌមុន។</p>
        </div>

        <div class="interactive-sequencer-box">
          <div class="seq-builder-header">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span id="machine-beacon-light" style="width: 16px; height: 16px; border-radius: 50%; background-color: #ef4444; display: inline-block; box-shadow: 0 0 10px rgba(239, 68, 68, 0.8);"></span>
              <h3>ប្រព័ន្ធត្រាប់តាមម៉ាស៊ីនកៀបដែកឧស្សាហកម្ម</h3>
            </div>
            <button class="footer-icon-btn" id="mach-reset-btn" title="កំណត់ឡើងវិញ">↺ កំណត់ម៉ាស៊ីនឡើងវិញ</button>
          </div>

          <div class="seq-items-pool">
            <button class="seq-drag-item mach-seq-btn" id="mach-btn-1" data-mach-step="guard">&#128737; ១. ពិនិត្យរបាំងសុវត្ថិភាព</button>
            <button class="seq-drag-item mach-seq-btn" id="mach-btn-2" data-mach-step="key">&#128273; ២. បើកសោភ្លើងធំ</button>
            <button class="seq-drag-item mach-seq-btn" id="mach-btn-3" data-mach-step="pressure">&#9874; ៣. ពិនិត្យសម្ពាធ (50 PSI)</button>
            <button class="seq-drag-item mach-seq-btn" id="mach-btn-4" data-mach-step="start">&#9654; ៤. ចុចប៊ូតុងបៃតង START</button>
          </div>

          <div class="seq-feedback-banner waiting" id="machine-seq-feedback">
            👉 អនុវត្តតាមពិធីការសុវត្ថិភាព៖ ១. របាំងសុវត្ថិភាព ➔ ២. សោភ្លើង ➔ ៣. សម្ពាធប្រេង ➔ ៤. ចុច Start។
          </div>
        </div>
      `
    },

    'slide-17': {
      title: 'ការណែនាំលំហាត់អនុវត្តផ្ទាល់៖ ការរៀបចំរបាយការណ៍ម៉ាស៊ីនខូច',
      segment: 'ផ្នែកទី ៥៖ ការអនុវត្តផ្ទាល់ (៥៤:០០ - ៦៦:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"ឥឡូវនេះដល់វេនអ្នកទាំងអស់គ្នាបញ្ចេញសមត្ថភាពហើយ!
នាទីទី ៥៤ ដល់ ៦៦ គឺជាវគ្គអនុវត្តផ្ទាល់ដៃរយៈពេល ១២ នាទីរបស់យើង។
អ្នកមានបញ្ហាប្រឈមមួយ៖
កម្មកររោងចក្រម្នាក់បានឃើញផ្សែងហុយ និងរំញ័រខុសធម្មតាចេញពីម៉ូទ័រខ្សែសង្វាក់ផលិតកម្ម។
យើងត្រូវរាយការណ៍បញ្ហានេះតាមរយៈកម្មវិធី Power App លើថេប្លេត។
នៅលើស្លាយបន្ទាប់ អ្នកនឹងឃើញជំហានច្របល់គ្នា ៤៖
- ស្កេនបាកូដ QR លើម៉ាស៊ីន
- ចុចប៊ូតុងឈប់បន្ទាន់ E-Stop
- ផ្ញើរបាយការណ៍បញ្ហា
- បើកកម្មវិធី Power App លើថេប្លេត
ភារកិច្ចរបស់អ្នក៖ ចុចប៊ូតុងតម្រៀបចូលក្នុងជំហានទី ១, ២, ៣ និង ៤ តាមលំដាប់សមហេតុផលបំផុត!"`,
      content: `
        <div class="slide-header">
          <span class="section-tag purple-tag">ការអនុវត្តផ្ទាល់ដៃ</span>
          <h2 class="slide-title">លំហាត់អនុវត្ត៖ ក្តារតម្រៀបលំដាប់របាយការណ៍</h2>
          <p class="slide-lead">អនុវត្តចំណេះដឹងរបស់អ្នក៖ តម្រៀប ៤ ជំហានដើម្បីរាយការណ៍ម៉ាស៊ីនខូចដោយសុវត្ថិភាព។</p>
        </div>

        <div class="objectives-list">
          <div class="objective-card">
            <div class="objective-num">&#128065;</div>
            <div class="objective-body">
              <h3>ស្ថានភាពជាក់ស្តែងនៅកន្លែងធ្វើការ</h3>
              <p>អ្នកកំពុងធ្វើការនៅវេនទី ១។ ម៉ូទ័រលេខ ៣ នៅខ្សែសង្វាក់ ខ ចាប់ផ្តើមបន្លឺសំឡេងកកិតឮខ្លាំង និងហុយផ្សែង។ អ្នកត្រូវរាយការណ៍បញ្ហានេះ។</p>
            </div>
          </div>

          <div class="objective-card">
            <div class="objective-num">&#128070;</div>
            <div class="objective-body">
              <h3>ភារកិច្ចរបស់អ្នក (១២ នាទី)</h3>
              <p>នៅលើអេក្រង់បន្ទាប់ ចូររៀបចំកាតសកម្មភាពដែលច្របល់គ្នាទាំង ៤ ឱ្យទៅជាលំដាប់តែមួយគត់ដែលមានសុវត្ថិភាពពីជំហានទី ១ ដល់ ទី ៤។</p>
            </div>
          </div>

          <div class="objective-card">
            <div class="objective-num">&#127942;</div>
            <div class="objective-body">
              <h3>លក្ខណៈវិនិច្ឆ័យជោគជ័យ</h3>
              <p>សុវត្ថិភាពផ្ទាល់ខ្លួនជាចម្បង បើកកម្មវិធីជាបន្ទាប់ កំណត់អត្តសញ្ញាណម៉ាស៊ីនជាទីបី និងជូនដំណឹងដល់ប្រធានផ្នែកជាទីបួន!</p>
            </div>
          </div>
        </div>
      `
    },

    'slide-18': {
      title: 'ក្តារអនុវត្តអន្តរកម្ម៖ ការតម្រៀបជំហានរបាយការណ៍ឧប្បត្តិហេតុ',
      segment: 'ផ្នែកទី ៥៖ ការអនុវត្តផ្ទាល់ (៥៤:០០ - ៦៦:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"នេះជាក្តារអនុវត្តផ្ទាល់របស់អ្នក!
មើលប៊ូតុងទាំង ៤ ក្នុងប្រអប់៖
- ស្កេនបាកូដម៉ាស៊ីន
- ចុចប៊ូតុងឈប់បន្ទាន់ E-Stop
- ផ្ញើរបាយការណ៍បញ្ហា
- បើកកម្មវិធី Power App
ចុចលើជំហាននីមួយៗតាមលំដាប់ដែលវាត្រូវតែកើតឡើង។
បើអ្នកចុច 'ចុចប៊ូតុងឈប់បន្ទាន់' មុន វានឹងចូលទៅក្នុងជំហានទី ១។
បើច្រឡំ ចុច 'កំណត់ក្តារឡើងវិញ' ហើយសាកម្តងទៀត!
ចំណាយពេល ៣ នាទីដើម្បីសាកល្បង!"`,
      content: `
        <div class="slide-header">
          <span class="section-tag teal-tag">ក្តារអនុវត្តផ្ទាល់</span>
          <h2 class="slide-title">ការអនុវត្តអន្តរកម្ម៖ លំដាប់រាយការណ៍បញ្ហាម៉ាស៊ីន</h2>
          <p class="slide-lead">ចុចលើសកម្មភាពទាំង ៤ ខាងក្រោមតាមលំដាប់ប្រតិបត្តិការត្រឹមត្រូវ។</p>
        </div>

        <div class="interactive-sequencer-box">
          <div class="seq-builder-header">
            <h3>កាតសកម្មភាពដែលមាន (ចុចដើម្បីដាក់ចូល)៖</h3>
            <button class="footer-icon-btn" id="handson-reset-btn" title="កំណត់ក្តារឡើងវិញ">↺ កំណត់ក្តារឡើងវិញ</button>
          </div>

          <div class="seq-items-pool" id="handson-pool">
            <button class="seq-drag-item" data-action="scan">&#128269; ស្កេនបាកូដម៉ាស៊ីន</button>
            <button class="seq-drag-item" data-action="estop">&#128721; ចុចប៊ូតុងឈប់បន្ទាន់ (E-Stop)</button>
            <button class="seq-drag-item" data-action="submit">&#128228; ផ្ញើរបាយការណ៍បញ្ហា</button>
            <button class="seq-drag-item" data-action="open">&#128241; បើកកម្មវិធី Power App</button>
          </div>

          <div class="seq-drop-slots">
            <div class="seq-slot" id="handson-slot-1">
              <span class="slot-label">ជំហានទី ១ (មុនគេ)</span>
              <span class="slot-content">— នៅទទេ —</span>
            </div>
            <div class="seq-slot" id="handson-slot-2">
              <span class="slot-label">ជំហានទី ២ (បន្ទាប់មក)</span>
              <span class="slot-content">— នៅទទេ —</span>
            </div>
            <div class="seq-slot" id="handson-slot-3">
              <span class="slot-label">ជំហានទី ៣ (បន្តទៀត)</span>
              <span class="slot-content">— នៅទទេ —</span>
            </div>
            <div class="seq-slot" id="handson-slot-4">
              <span class="slot-label">ជំហានទី ៤ (បញ្ចប់)</span>
              <span class="slot-content">— នៅទទេ —</span>
            </div>
          </div>

          <div class="seq-feedback-banner waiting" id="handson-seq-feedback">
            👉 ចុចសកម្មភាពទាំង ៤ តាមលំដាប់ប្រតិបត្តិការត្រឹមត្រូវ។
          </div>
        </div>
      `
    },

    'slide-19': {
      title: 'កំហុសទូទៅទាំង ៤ របស់អ្នកចាប់ផ្តើមដំបូង & ដំណោះស្រាយ',
      segment: 'ផ្នែកទី ៥៖ ការអនុវត្តផ្ទាល់ (៥៤:០០ - ៦៦:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"នៅពេលអ្នកចាប់ផ្តើមដំបូងរៀនអំពីលំដាប់ ពួកគេតែងតែជួបប្រទះអន្ទាក់ ៤ យ៉ាង។ ចូរស្វែងយល់ដើម្បីជៀសវាងវា៖
អន្ទាក់ ១៖ គិតថាកុំព្យូទ័រចេះអានចិត្ត។ គិតថាកុំព្យូទ័រដឹងពីអ្វីដែលយើងចង់បាន ទោះបីរំលងជំហានក៏ដោយ។ ដំណោះស្រាយ៖ កុំព្យូទ័រគ្មានវិចារណញាណទេ សរសេររាល់ជំហានឱ្យច្បាស់!
អន្ទាក់ ២៖ ដាក់ស្បែកជើងមុនស្រោមជើង។ ព្យាយាមបង្ហាញសារជោគជ័យមុនពេលរក្សាទុកទិន្នន័យ។ ដំណោះស្រាយ៖ រក្សាទុកទិន្នន័យសិន រួចទើបប្តូរអេក្រង់!
អន្ទាក់ ៣៖ ដាក់ឈ្មោះប៊ូតុងមិនច្បាស់ ដូចជា 'ចុច' ឬ 'ទៅ'។ ដំណោះស្រាយ៖ ប្រើកិរិយាសព្ទ+នាម ដូចជា 'ផ្ញើរបាយការណ៍បញ្ហា'។
អន្ទាក់ ៤៖ គ្មានការឆ្លើយតបពេលចប់។ ទុកឱ្យអ្នកប្រើសម្លឹងមើលអេក្រង់ស្ងាត់ច្រៀប។ ដំណោះស្រាយ៖ បង្ហាញផ្ទាំងបៃតងបញ្ជាក់ជានិច្ច!"`,
      content: `
        <div class="slide-header">
          <span class="section-tag yellow-tag">ការណែនាំពីគ្រូ</span>
          <h2 class="slide-title">កំហុសទូទៅទាំង ៤ របស់អ្នកចាប់ផ្តើមដំបូង &amp; ដំណោះស្រាយ</h2>
          <p class="slide-lead">ស្គាល់អន្ទាក់បុរាណទាំងនេះ និងអនុវត្តទម្លាប់កែតម្រូវដ៏សាមញ្ញ។</p>
        </div>

        <div class="comparison-grid">
          <div class="comparison-col bad-col">
            <div class="comparison-col-header">
              <span class="bad-icon">&#9888;</span>
              <h3>កំហុសរបស់អ្នកចាប់ផ្តើមដំបូង</h3>
            </div>
            <ul class="comparison-list">
              <li><strong>១. ការរំលងជំហាន៖</strong> គិតថាកម្មវិធីដឹងខ្លួនឯងថាត្រូវរក្សាទុកទិន្នន័យមុននឹងប្តូរអេក្រង់។</li>
              <li><strong>២. ពាក់ស្បែកជើងមុនស្រោមជើង៖</strong> ព្យាយាមបង្ហាញសារជោគជ័យ មុនពេលទិន្នន័យត្រូវបានរក្សាទុក។</li>
              <li><strong>៣. ឈ្មោះសកម្មភាពមិនច្បាស់៖</strong> ដាក់ឈ្មោះប៊ូតុងស្រពិចស្រពិលដូចជា <em>"ទៅ"</em> ឬ <em>"ចុច"</em>។</li>
              <li><strong>៤. មិនផ្តល់ការឆ្លើយតប៖</strong> បិទកម្មវិធីដោយមិនបានប្រាប់កម្មករថារបាយការណ៍ត្រូវបានទទួលជោគជ័យ។</li>
            </ul>
          </div>

          <div class="comparison-col good-col">
            <div class="comparison-col-header">
              <span class="good-icon">&#128161;</span>
              <h3>ដំណោះស្រាយរបស់អ្នកបណ្តុះបណ្តាល</h3>
            </div>
            <ul class="comparison-list">
              <li><strong>ដំណោះស្រាយ៖</strong> កុំព្យូទ័រមិនចេះអានចិត្តឡើយ។ ត្រូវសរសេររាល់ជំហានផ្លាស់ប្តូរឱ្យច្បាស់លាស់។</li>
              <li><strong>ដំណោះស្រាយ៖</strong> ច្បាប់មាស៖ ១. រក្សាទុកទិន្នន័យ ➔ ២. រួចហើយទើបប្តូរអេក្រង់!</li>
              <li><strong>ដំណោះស្រាយ៖</strong> ប្រើស្លាកកិរិយាសព្ទ+នាម៖ <em>"ផ្ញើរបាយការណ៍បញ្ហា"</em>។</li>
              <li><strong>ដំណោះស្រាយ៖</strong> បង្ហាញផ្ទាំងបៃតងជូនដំណឹងជានិច្ច៖ <em>"បានកត់ត្រារបាយការណ៍លេខ ១០៤២!"</em></li>
            </ul>
          </div>
        </div>
      `
    },

    'slide-20': {
      title: 'ការតភ្ជាប់ទៅ Power Apps៖ ការភ្ជាប់សកម្មភាពដោយប្រើសញ្ញាក្បៀសចំនុច ( ; )',
      segment: 'ផ្នែកទី ៦៖ ចំណេះដឹង & Power Fx (៦៦:០០ - ៧៤:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"ឥឡូវនេះ ចូរយើងភ្ជាប់រឿងនេះដោយផ្ទាល់ទៅកាន់ Microsoft Power Apps!
ក្នុង Power Apps តើយើងប្រាប់ប៊ូតុងមួយយ៉ាងដូចម្តេចថា៖
'ធ្វើសកម្មភាព ក សិន រួចហើយទើបធ្វើសកម្មភាព ខ បន្ទាប់'?
យើងប្រើសញ្ញាវណ្ណយុត្តិដ៏សាមញ្ញមួយ គឺ៖ សញ្ញាក្បៀសចំនុច SEMICOLON (;)!
ជាភាសាអង់គ្លេស សញ្ញាចុចបញ្ចប់ប្រយោគ។
ក្នុង Power Apps សញ្ញាក្បៀសចំនុច (;) គ្រាន់តែជាពាក្យ 'រួចហើយទើប' (AND THEN)!
មើលស្លាយ៖
ភាសាសាមញ្ញ៖ លុបប្រអប់អត្ថបទ រួចហើយទើប បង្ហាញសារបៃតង។
រូបមន្ត Power Apps៖ Reset(txtIssue) ; Notify('Report Sent!')
សញ្ញាក្បៀសចំនុចតភ្ជាប់សេចក្តីណែនាំទាំងពីរឱ្យទៅជាលំដាប់លំដោយមួយ!"`,
      content: `
        <div class="slide-header">
          <span class="section-tag purple-tag">ការតភ្ជាប់ទៅ Power Apps</span>
          <h2 class="slide-title">របៀបដែល Power Apps ភ្ជាប់ជំហាន៖ សញ្ញាក្បៀសចំនុច ( ; )</h2>
          <p class="slide-lead">ក្នុង Power Fx សញ្ញាក្បៀសចំនុចគ្រាន់តែជាពាក្យកូដសម្រាប់ <em>"រួចហើយទើប (AND THEN)"</em>។</p>
        </div>

        <div class="sequence-flow-container">
          <div class="sequence-step-card start-card">
            <span class="step-number-badge">ជំហានទី ១</span>
            <span class="step-card-icon">&#128465;</span>
            <h3>Reset(txtIssue)</h3>
            <p>ដំបូង សម្អាតប្រអប់អត្ថបទរបស់អ្នកបញ្ជាឱ្យនៅទទេ និងស្អាតឡើងវិញ។</p>
          </div>

          <div class="flow-arrow-divider" style="color: var(--color-gold-accent);">
            ;<br><span class="flow-arrow-text" style="color: var(--color-gold-accent);">"រួចហើយទើប"</span>
          </div>

          <div class="sequence-step-card finish-card">
            <span class="step-number-badge">ជំហានទី ២</span>
            <span class="step-card-icon">&#128226;</span>
            <h3>Notify("Report Sent!")</h3>
            <p>បន្ទាប់មក បង្ហាញផ្ទាំងជូនដំណឹងពណ៌បៃតងបញ្ជាក់យ៉ាងកក់ក្តៅនៅខាងលើអេក្រង់។</p>
          </div>
        </div>

        <div style="background-color: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 18px 24px;">
          <p style="font-size: 1rem; color: #fff;">
            <strong>ភាសាសាមញ្ញជាមុន៖</strong> <em>"ដំបូងសម្អាតទម្រង់ <strong>រួចហើយទើប</strong> បង្ហាញផ្ទាំងជូនដំណឹងជោគជ័យ។"</em><br>
            <strong>រូបមន្ត Power Fx៖</strong> <code style="color: var(--fluent-teal-light); font-size: 1.05rem;">Reset(txtIssue) ; Notify("Report Sent!", NotificationType.Success)</code>
          </p>
        </div>
      `
    },

    'slide-21': {
      title: 'ការវិភាគរូបមន្ត Power Fx តាមលំដាប់លំដោយ',
      segment: 'ផ្នែកទី ៦៖ ចំណេះដឹង & Power Fx (៦៦:០០ - ៧៤:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"មើលផ្នែកនីមួយៗនៃរូបមន្តនេះឱ្យបានច្បាស់លាស់។
កុំខ្លាចរូបមន្តឱ្យសោះ! អ្នកបានយល់រួចហើយថាតួអង្គនីមួយៗធ្វើអ្វី៖
ផ្នែកទី ១៖ Reset(txtIssue) — 'Reset' មានន័យថាសម្អាត។ 'txtIssue' គឺជាឈ្មោះប្រអប់អត្ថបទ។
ផ្នែកទី ២៖ សញ្ញាក្បៀសចំនុច ';' — មានន័យថា 'រួចហើយទើប'។
ផ្នែកទី ៣៖ Notify('Report Sent!', NotificationType.Success) — 'Notify' មានន័យថាបង្ហាញផ្ទាំងជូនដំណឹងលើអេក្រង់។
កុំព្យូទ័រនឹងធ្វើផ្នែកទី ១ មុន រង់ចាំឱ្យចប់ ជួបសញ្ញាក្បៀសចំនុច រួចទើបធ្វើផ្នែកទី ៣។
លំដាប់ពិតជាសំខាន់ណាស់! បើអ្នកដាក់ច្របល់គ្នា សារជូនដំណឹងនឹងលេចឡើងមុនពេលទម្រង់ត្រូវបានសម្អាត!"`,
      content: `
        <div class="slide-header">
          <span class="section-tag teal-tag">រចនាសម្ព័ន្ធនៃរូបមន្ត (Formula Structure)</span>
          <h2 class="slide-title">ការបំបែករូបមន្តតាមលំដាប់លំដោយ</h2>
          <p class="slide-lead">រាល់តួអក្សរនីមួយៗសុទ្ធតែមានគោលបំណងឡូជីខល និងមានន័យច្បាស់លាស់សម្រាប់មនុស្ស។</p>
        </div>

        <div class="powerfx-sequence-card">
          <div class="pfx-formula-banner">
            <span class="pfx-step1">Reset(txtIssue)</span>
            <span class="pfx-semicolon">;</span>
            <span class="pfx-step2">Notify("Report Sent!", NotificationType.Success)</span>
          </div>

          <div class="pfx-step-explanations">
            <div class="pfx-exp-box">
              <h4>១. សកម្មភាពទីមួយ</h4>
              <p><strong>Reset(txtIssue)</strong> ប្រាប់ Power Apps ឱ្យសម្អាតប្រអប់អត្ថបទ ដើម្បីឱ្យអ្នកបញ្ជាអាចវាយបញ្ចូលថ្មីបាន។</p>
            </div>

            <div class="pfx-connector-pill">
              ; = "រួចហើយទើប (AND THEN)"
            </div>

            <div class="pfx-exp-box">
              <h4>២. សកម្មភាពទីពីរ</h4>
              <p><strong>Notify(...)</strong> បង្ហាញផ្ទាំងជូនដំណឹងពណ៌បៃតងបញ្ជាក់ថារបាយការណ៍បានទៅដល់ម៉ាស៊ីនបម្រើដោយសុវត្ថិភាព។</p>
            </div>
          </div>
        </div>
      `
    },

    'slide-22': {
      title: 'សំណួរបញ្ជាក់ចំណេះដឹងទាំង ៥',
      segment: 'ផ្នែកទី ៦៖ ចំណេះដឹង & Power Fx (៦៦:០០ - ៧៤:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"ដល់ពេលធ្វើតេស្តបញ្ជាក់ចំណេះដឹង ៥ សំណួរហើយ!
តោះមើលថាតើយើងចងចាំបានកម្រិតណា។
អានសំណួរទី ១ នៅលើអេក្រង់៖
'តើអ្វីទៅជាសេចក្តីណែនាំ ជាភាសាសាមញ្ញប្រចាំថ្ងៃ?'
ជ្រើសរើសចម្លើយ ក៖ 'បញ្ជាច្បាស់លាស់តែមួយគត់ ប្រាប់មនុស្ស ឬកុំព្យូទ័រឱ្យធ្វើសកម្មភាពតែមួយ។'
ចុចលើវា!
សញ្ញាគ្រីសបៃតង! ត្រឹមត្រូវហើយ!
ចុច 'សំណួរបន្ទាប់' ដើម្បីឆ្លើយសំណួរទាំង ៥ ជាមួយគ្នា!"`,
      content: `
        <div class="slide-header flex-header">
          <div>
            <span class="section-tag yellow-tag">ពិនិត្យចំណេះដឹង</span>
            <h2 class="slide-title">សំណួរពិនិត្យចំណេះដឹងរហ័សទាំង ៥</h2>
            <p class="slide-lead">ចុចលើចម្លើយរបស់អ្នកដើម្បីទទួលបានការពន្យល់ភ្លាមៗពីគ្រូ។</p>
          </div>
          <button class="footer-icon-btn" id="quiz-next-btn" style="border: 1px solid var(--border-subtle); padding: 6px 14px;">សំណួរបន្ទាប់ ➔</button>
        </div>

        <div class="quiz-widget-card">
          <div class="quiz-progress-bar-wrap">
            <span id="quiz-counter" style="font-size: 0.82rem; font-weight: 700; color: var(--color-lilac-accent);">សំណួរទី ១ នៃ ៥</span>
          </div>
          <h3 class="quiz-question-text" id="quiz-question">កំពុងផ្ទុកសំណួរ...</h3>
          <div class="quiz-options-list" id="quiz-options"></div>
          <div class="quiz-feedback-box" id="quiz-feedback" style="display: none;"></div>
        </div>
      `
    },

    'slide-23': {
      title: 'បញ្ហាប្រឈមចុងក្រោយ ១០ នាទី & តារាងវាយតម្លៃ',
      segment: 'ផ្នែកទី ៧៖ បញ្ហាប្រឈមចុងក្រោយ (៧៤:០០ - ៨៤:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"ឥឡូវនេះ យើងមកដល់ការសាកល្បងសមត្ថភាពចុងក្រោយ៖ បញ្ហាប្រឈម ១០ នាទី!
ពីនាទី ៧៤ ដល់ ៨៤ អ្នកនឹងដើរតួជាអ្នករចនាដំណោះស្រាយកម្មវិធី។
បញ្ហាប្រឈមរបស់អ្នក៖
ម៉ាស៊ីនកាត់ CNC លេខ ៧ នៅរោងចក្រ ផ្នែក ខ ចាប់ផ្តើមធ្លាយប្រេងធារាសាស្ត្រមកលើផ្លូវដើរ បង្កជាហានិភ័យរអិលដួល ហើយម៉ាស៊ីនញ័រតិចៗ។
នៅលើក្រដាសរបស់អ្នក ចូរសរសេរលំដាប់ ៤ ជំហានយ៉ាងច្បាស់លាស់សម្រាប់កម្មករក្នុងការរាយការណ៍បញ្ហានេះតាមទូរស័ព្ទ Power App។
ត្រូវប្រាកដថា៖
- ជំហានទី ១ ជាអ្វី? (តម្រុយ៖ សុវត្ថិភាព!)
- ជំហានទី ២ ជាអ្វី?
- ជំហានទី ៣ ជាអ្វី?
- ជំហានទី ៤ ជាអ្វី?
មើលតារាងវាយតម្លៃខាងក្រោម៖ បើអ្នកផ្តល់អាទិភាពសុវត្ថិភាព ប្រើពាក្យច្បាស់ និងបញ្ចប់ដោយការឆ្លើយតប អ្នកទទួលបានកម្រិត ៤ (Mastery)!"`,
      content: `
        <div class="slide-header">
          <span class="section-tag teal-tag">ការវាយតម្លៃសមត្ថភាព</span>
          <h2 class="slide-title">បញ្ហាប្រឈម ១០ នាទី៖ ឧប្បត្តិហេតុធ្លាយប្រេងម៉ាស៊ីន</h2>
          <p class="slide-lead">រៀបចំលំដាប់រាយការណ៍ ៤ ជំហានយ៉ាងច្បាស់លាស់ និងគ្មានភាពស្រពេចស្រពិលលើសៀវភៅរបស់អ្នក។</p>
        </div>

        <div class="challenge-grid">
          <div class="challenge-task-card">
            <h3>&#128221; ស្ថានភាពជាក់ស្តែងនៅកន្លែងធ្វើការ</h3>
            <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 14px;">
              អ្នកកំពុងដើរកាត់ម៉ាស៊ីន CNC លេខ ៧។ អ្នកឃើញប្រេងធារាសាស្ត្រកំពុងស្រក់លើផ្លូវដើរ បង្កជាគ្រោះថ្នាក់រអិលដួល ហើយម៉ាស៊ីនកំពុងញ័រតិចៗ។
            </p>
            <h4>ការណែនាំរបស់អ្នក៖</h4>
            <ol class="challenge-steps-ol">
              <li>សរសេរ <strong>ជំហានទី ១</strong>៖ តើសកម្មភាពសុវត្ថិភាពបន្ទាន់អ្វីដែលត្រូវធ្វើមុនគេ?</li>
              <li>សរសេរ <strong>ជំហានទី ២</strong>៖ តើអ្នកបញ្ជាបើក និងផ្ទៀងផ្ទាត់កម្មវិធី Power App យ៉ាងដូចម្តេច?</li>
              <li>សរសេរ <strong>ជំហានទី ៣</strong>៖ តើទិន្នន័យម៉ាស៊ីន ឬរូបថតជាក់លាក់អ្វីដែលត្រូវកត់ត្រា?</li>
              <li>សរសេរ <strong>ជំហានទី ៤</strong>៖ តើកម្មវិធីបញ្ចប់ និងជូនដំណឹងទៅក្រុមជាងជួសជុលយ៉ាងដូចម្តេច?</li>
            </ol>
          </div>

          <div class="challenge-solution-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <h3>&#128065; លក្ខណៈវិនិច្ឆ័យវាយតម្លៃ</h3>
              <button class="footer-icon-btn btn-reveal-solution" id="challenge-reveal-btn" style="border: 1px solid var(--border-subtle); padding: 4px 10px; font-size: 0.78rem;">👁️ បង្ហាញចម្លើយគំរូ</button>
            </div>
            <ul class="comparison-list">
              <li><span class="good-icon">&#10004;</span> <strong>លំដាប់ &amp; តក្កវិជ្ជា៖</strong> សុវត្ថិភាពត្រូវតែជាជំហានទី ១ ដាច់ខាត។</li>
              <li><span class="good-icon">&#10004;</span> <strong>គ្មានពាក្យស្រពិចស្រពិល៖</strong> ប្រើកិរិយាសព្ទច្បាស់ (ចុច, ស្កេន, ផ្ញើ)។</li>
              <li><span class="good-icon">&#10004;</span> <strong>ការបញ្ចប់ច្បាស់លាស់៖</strong> អ្នកបញ្ជាដឹងច្បាស់ថារបាយការណ៍បានទៅដល់ក្រុមជាង។</li>
            </ul>

            <div id="challenge-exemplar-card" class="revealed-content hidden" style="margin-top: 14px; background: rgba(0, 130, 114, 0.18); border: 1px solid var(--fluent-teal-light); padding: 12px; border-radius: 6px; font-size: 0.88rem; color: #a3f7ea; line-height: 1.5;">
              <strong>ចម្លើយគំរូល្អឥតខ្ចោះ ៤ ជំហាន៖</strong><br>
              ១. ចុចប៊ូតុងឈប់បន្ទាន់ E-Stop &amp; ដាក់កោណសញ្ញាប្រយ័ត្នរអិល។<br>
              ២. បើកកម្មវិធី Power App 'Maintenance Support' លើថេប្លេត។<br>
              ៣. ស្កេនបាកូដ QR ម៉ាស៊ីន CNC #7 &amp; ថតរូបកន្លែងធ្លាយប្រេង។<br>
              ៤. ចុច [ផ្ញើរបាយការណ៍] ➔ កម្មវិធីជូនដំណឹងទៅប្រធានជាងភ្លាមៗជាមួយលេខសំបុត្រ!
            </div>
          </div>
        </div>

        <!-- Evaluation Rubric Cards -->
        <div class="rubric-grid" style="margin-top: 10px;">
          <div class="rubric-card level-4">
            <span class="rubric-level-badge" style="color: var(--fluent-green-light);">កម្រិត ៤ • ស្ទាត់ជំនាញ</span>
            <h4>លំដាប់ឥតខ្ចោះ</h4>
            <p>សុវត្ថិភាពជាជំហាន ១។ សកម្មភាពដើរតាមលំដាប់ម៉ត់ចត់។ បញ្ចូលទិន្នន័យជាក់លាក់ និងបញ្ចប់ដោយការឆ្លើយតបច្បាស់។</p>
          </div>

          <div class="rubric-card level-3">
            <span class="rubric-level-badge" style="color: var(--fluent-blue-light);">កម្រិត ៣ • សមត្ថភាពល្អ</span>
            <h4>លំដាប់រឹងមាំ</h4>
            <p>មានគ្រប់ ៤ ជំហាន។ ផ្តល់អាទិភាពសុវត្ថិភាព។ លំដាប់ត្រឹមត្រូវ ប៉ុន្តែការពិពណ៌នាសកម្មភាពមួយរាងទូលាយបន្តិច។</p>
          </div>

          <div class="rubric-card level-2">
            <span class="rubric-level-badge" style="color: var(--color-gold-accent);">កម្រិត ២ • កំពុងអភិវឌ្ឍ</span>
            <h4>ខុសលំដាប់</h4>
            <p>ជំហានសំខាន់ៗត្រូវបានផ្លាស់ប្តូរ (ឧ. វាយរបាយការណ៍មុនពេលបិទម៉ាស៊ីនគ្រោះថ្នាក់)។ ត្រូវរៀបចំលំដាប់ឡើងវិញ។</p>
          </div>

          <div class="rubric-card level-1">
            <span class="rubric-level-badge" style="color: var(--color-problem);">កម្រិត ១ • ចាប់ផ្តើមដំបូង</span>
            <h4>គ្មានលំដាប់</h4>
            <p>សរសេរតែមួយឃ្លាស្រពិចស្រពិល (<em>'ជួសជុលការលេចធ្លាយ'</em>) ដោយគ្មានជំហាន ឬចំណុចចាប់ផ្តើម/បញ្ចប់។</p>
          </div>
        </div>
      `
    },

    'slide-24': {
      title: 'ផែនទីតភ្ជាប់ (Connection Map), កិច្ចការផ្ទះ ១៥ នាទី & សទ្ទានុក្រមទ្វេភាសា',
      segment: 'ផ្នែកទី ៨៖ សំយោគ & កិច្ចការផ្ទះ (៨៤:០០ - ៩០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"យើងបានមកដល់នាទីទី ៨៤ ហើយ! ចូរក្រឡេកមើលផែនទីតភ្ជាប់របស់យើង៖
កន្លងមក (ថ្ងៃទី ១)៖ យើងបានរៀនថាកម្មវិធីដោះស្រាយបញ្ហាដោយប្រើ ធាតុបញ្ចូល ដំណើរការ និងធាតុចេញ (IPO)។
ថ្ងៃនេះ (ថ្ងៃទី ២)៖ យើងបានចូលទៅមើលខាងក្នុងដំណើរការ និងក្តាប់បាននូវ សេចក្តីណែនាំ និងលំដាប់លំដោយ។
ថ្ងៃស្អែក (ថ្ងៃទី ៣)៖ យើងនឹងសួរថា 'តើជំហាននីមួយៗត្រូវការអ្វីដើម្បីដំណើរការ?' គឺវាត្រូវការទិន្នន័យ (DATA)! អត្ថបទ លេខ កាលបរិច្ឆេទ និងប៊ូលីន បាទ/ទេ!
កិច្ចការផ្ទះ ១៥ នាទីយប់នេះ៖
'អ្នកប្រមាញ់ទម្រង់ក្រដាសនៅកន្លែងធ្វើការ'។
ស្វែងរកទម្រង់ក្រដាស ១ សន្លឹកនៅកន្លែងធ្វើការ ឬវិក្កយបត្រពីហាង។
កំណត់ព័ត៌មាន ៥ ចំណុច និងដាក់ស្លាកប្រភេទរបស់វា (អត្ថបទ លេខ កាលបរិច្ឆេទ ឬ បាទ/ទេ)។
យកវាមកកាន់ថ្នាក់រៀនថ្ងៃទី ៣ នៅថ្ងៃស្អែក!
អ្នកទាំងអស់គ្នាធ្វើបានល្អអស្ចារ្យណាស់ថ្ងៃនេះ។ ជួបគ្នាថ្ងៃស្អែក!"`,
      content: `
        <div class="slide-header">
          <span class="section-tag teal-tag">ស្ពានតភ្ជាប់កម្មវិធីសិក្សា</span>
          <h2 class="slide-title">ផែនទីតភ្ជាប់ (Connection Map) &amp; ត្រៀមសម្រាប់ថ្ងៃទី ៣</h2>
          <p class="slide-lead">កន្លងមក ➔ ថ្ងៃនេះ ➔ ថ្ងៃស្អែក៖ របៀបដែលថ្ងៃនីមួយៗកសាងជំនាញ Power Apps ដ៏រឹងមាំ។</p>
        </div>

        <!-- The Spiral Curriculum Connection Map -->
        <div class="sequence-flow-container">
          <div class="sequence-step-card start-card">
            <span class="step-number-badge">កន្លងមក • ថ្ងៃទី ១</span>
            <span class="step-card-icon">&#9881;</span>
            <h3>ធាតុបញ្ចូល / ដំណើរការ / ធាតុចេញ</h3>
            <p>កម្មវិធីដោះស្រាយបញ្ហាដោយរុញធាតុបញ្ចូលតាមរយៈដំណើរការដើម្បីបញ្ចេញលទ្ធផលមានប្រយោជន៍។</p>
          </div>

          <div class="flow-arrow-divider">➔</div>

          <div class="sequence-step-card middle-card" style="background: rgba(245, 158, 11, 0.15); border-top: 4px solid var(--color-gold-accent);">
            <span class="step-number-badge" style="background: var(--color-gold-accent); color: #000; font-weight: 800;">ថ្ងៃនេះ • ថ្ងៃទី ២</span>
            <span class="step-card-icon">&#128260;</span>
            <h3>សេចក្តីណែនាំ &amp; លំដាប់លំដោយ</h3>
            <p>ដំណើរការប្រតិបត្តាមជំហានម៉ត់ចត់៖ <em>សេចក្តីណែនាំ ➔ លំដាប់ ➔ សកម្មភាព ➔ លទ្ធផល</em>។</p>
          </div>

          <div class="flow-arrow-divider">➔</div>

          <div class="sequence-step-card finish-card" style="border-top: 4px solid var(--color-lilac-accent);">
            <span class="step-number-badge">ថ្ងៃស្អែក • ថ្ងៃទី ៣</span>
            <span class="step-card-icon">&#128196;</span>
            <h3>ទិន្នន័យពីចំណុចសូន្យ (Data)</h3>
            <p>រាល់ជំហានត្រូវការព័ត៌មាន៖ អត្ថបទ លេខ កាលបរិច្ឆេទ និងតម្លៃប៊ូលីន បាទ/ទេ (Yes/No)។</p>
          </div>
        </div>

        <div class="comparison-grid" style="margin-top: 10px;">
          <!-- Homework Card -->
          <div class="comparison-col good-col">
            <div class="comparison-col-header">
              <span class="good-icon">&#128373;</span>
              <h3>កិច្ចការផ្ទះ ១៥ នាទីយប់នេះ</h3>
            </div>
            <p style="font-size: 0.9rem; color: #fff; margin-bottom: 6px;">
              <strong>"អ្នកប្រមាញ់ទម្រង់ក្រដាសនៅកន្លែងធ្វើការ"</strong>
            </p>
            <ul class="comparison-list">
              <li>១. រកទម្រង់ក្រដាស ១ សន្លឹក (កំណត់ហេតុថែទាំ សំណើសុំសម្ភារ ឬវិក្កយបត្រ)។</li>
              <li>២. កំណត់ព័ត៌មាន ៥ ចំណុចដាច់ដោយឡែកពីគ្នាលើក្រដាសនោះ។</li>
              <li>៣. គូសរង្វង់ជុំវិញពួកវា និងដាក់ស្លាកប្រភេទ៖ <strong>អត្ថបទ</strong>, <strong>លេខ</strong>, <strong>កាលបរិច្ឆេទ</strong> ឬ <strong>បាទ/ទេ</strong>។</li>
              <li>៤. យកវាមកកាន់ថ្នាក់រៀននៅព្រឹកថ្ងៃស្អែក!</li>
            </ul>
          </div>

          <!-- Bilingual Glossary Summary -->
          <div class="comparison-col" style="border-top: 4px solid var(--color-lilac-accent);">
            <div class="comparison-col-header">
              <span style="color: var(--color-lilac-accent); font-size: 1.3rem;">&#128218;</span>
              <h3>សទ្ទានុក្រមទ្វេភាសាថ្ងៃទី ២ (Bilingual Glossary)</h3>
            </div>
            <ul class="comparison-list" style="font-size: 0.88rem;">
              <li><strong>Instruction (សេចក្តីណែនាំ)៖</strong> បញ្ជាច្បាស់លាស់តែមួយគត់ដែលប្រាប់ម៉ាស៊ីនឱ្យធ្វើការ។</li>
              <li><strong>Sequence (លំដាប់លំដោយ)៖</strong> លំដាប់ដ៏តឹងរ៉ឹងមិនអាចបំពានបានពី ចាប់ផ្តើម ដល់ បញ្ចប់។</li>
              <li><strong>Digital Interlock (ប្រព័ន្ធរារាំងសុវត្ថិភាព)៖</strong> តក្កវិជ្ជានៃកម្មវិធីដែលរារាំងសកម្មភាពរហូតដល់លក្ខខណ្ឌមុនត្រូវបំពេញ។</li>
              <li><strong>Semicolon ; (សញ្ញាក្បៀសចំនុច)៖</strong> ក្នុង Power Fx ប្រើសម្រាប់ភ្ជាប់សកម្មភាព៖ <em>"ធ្វើចំណុចនេះ រួចហើយទើបធ្វើចំណុចនោះ"</em>។</li>
            </ul>
          </div>
        </div>
      `
    }
  };

  // --------------------------------------------------------------------------
  // 3. QUIZ DATA (5 Knowledge Check Questions)
  // --------------------------------------------------------------------------
  const quizData = [
    {
      q: "Q1. What is an 'Instruction' in simple everyday English?",
      qKm: "សំណួរទី ១៖ តើអ្វីទៅជា 'សេចក្តីណែនាំ' (Instruction) ជាភាសាសាមញ្ញប្រចាំថ្ងៃ?",
      options: [
        "A single, clear command telling a person or computer to do ONE action",
        "A secret programming code only software engineers can read",
        "A 500-page heavy manual that must be memorized",
        "A random suggestion that the machine might ignore"
      ],
      optionsKm: [
        "បញ្ជាច្បាស់លាស់តែមួយគត់ ប្រាប់មនុស្ស ឬកុំព្យូទ័រឱ្យធ្វើសកម្មភាពតែមួយ",
        "កូដសរសេរកម្មវិធីសម្ងាត់ដែលមានតែវិស្វករទើបអានយល់",
        "សៀវភៅក្រាស់កម្រាស់ ៥០០ ទំព័រដែលត្រូវទន្ទេញចាំមាត់",
        "ការផ្តល់យោបល់បែបព្រាវៗដែលម៉ាស៊ីនអាចនឹងមិនអើពើ"
      ],
      correct: 0,
      explanation: "Correct! An instruction is simply one direct command: 'Press green button', 'Read sensor', or 'Clear the text box'.",
      explanationKm: "ត្រឹមត្រូវណាស់! សេចក្តីណែនាំគ្រាន់តែជាបញ្ជាផ្ទាល់តែមួយគត់៖ 'ចុចប៊ូតុងបៃតង', 'អានឧបករណ៏វាស់' ឬ 'សម្អាតប្រអប់អត្ថបទ'។"
    },
    {
      q: "Q2. Why is 'Sequence' strictly important in computer applications?",
      qKm: "សំណួរទី ២៖ ហេតុអ្វីបានជា 'លំដាប់លំដោយ' (Sequence) មានសារៈសំខាន់បំផុតក្នុងកម្មវិធីកុំព្យូទ័រ?",
      options: [
        "Because computers execute instructions in the exact order you write them, without guessing",
        "Because computers always scramble steps randomly",
        "It is not important; any order gives the same result",
        "Because the computer gets tired if you do things out of order"
      ],
      optionsKm: [
        "ពីព្រោះកុំព្យូទ័រប្រតិបត្តិតាមលំដាប់ជាក់លាក់ដែលអ្នកសរសេរ ដោយមិនចេះស្មានឡើយ",
        "ពីព្រោះកុំព្យូទ័រតែងតែច្របល់ជំហានដោយចៃដន្យជានិច្ច",
        "វាមិនសំខាន់ទេ ធ្វើលំដាប់ណាក៏ផ្តល់លទ្ធផលដូចគ្នាដែរ",
        "ពីព្រោះកុំព្យូទ័រនឹងអស់កម្លាំងបើអ្នកធ្វើការខុសលំដាប់"
      ],
      correct: 0,
      explanation: "Correct! If you put shoes on before socks, or bake an empty oven before mixing batter, failure occurs. Computers execute steps strictly in order.",
      explanationKm: "ត្រឹមត្រូវណាស់! បើអ្នកពាក់ស្បែកជើងមុនស្រោមជើង ឬដុតពុម្ពទទេមុនលាយម្សៅ នោះនឹងបរាជ័យ។ កុំព្យូទ័រធ្វើការតាមលំដាប់យ៉ាងម៉ត់ចត់។"
    },
    {
      q: "Q3. In manufacturing, what is the correct sequence before starting production?",
      qKm: "សំណួរទី ៣៖ ក្នុងការផលិត តើលំដាប់ត្រឹមត្រូវមុនពេលដំណើរការម៉ាស៊ីនគឺជាអ្វី?",
      options: [
        "1. Inspect Safety Guard ➔ 2. Master Key ON ➔ 3. Check Pressure ➔ 4. Press START",
        "1. Press START ➔ 2. Inspect Safety Guard ➔ 3. Master Key ON",
        "1. Feed Metal ➔ 2. Press START ➔ 3. Put on Safety Glasses",
        "1. Press START ➔ 2. Wait for Breakdown"
      ],
      optionsKm: [
        "១. ពិនិត្យរបាំងសុវត្ថិភាព ➔ ២. បើកសោភ្លើងធំ ➔ ៣. ពិនិត្យសម្ពាធ ➔ ៤. ចុច START",
        "១. ចុច START ➔ ២. ពិនិត្យរបាំងសុវត្ថិភាព ➔ ៣. បើកសោភ្លើងធំ",
        "១. ដាក់ដែកចូល ➔ ២. ចុច START ➔ ៣. ពាក់វ៉ែនតាសុវត្ថិភាព",
        "១. ចុច START ➔ ២. រង់ចាំឱ្យម៉ាស៊ីនខូច"
      ],
      correct: 0,
      explanation: "Correct! Safety guard first, electrical power second, hydraulic pressure third, and machine start fourth.",
      explanationKm: "ត្រឹមត្រូវណាស់! របាំងសុវត្ថិភាពជាចម្បង ភ្លើងអគ្គិសនីជាទីពីរ សម្ពាធធារាសាស្ត្រជាទីបី និងបញ្ឆេះម៉ាស៊ីនជាទីបួន។"
    },
    {
      q: "Q4. In Power Apps, what does the semicolon ';' mean between two actions?",
      qKm: "សំណួរទី ៤៖ ក្នុង Power Apps តើសញ្ញាក្បៀសចំនុច ';' នៅចន្លោះសកម្មភាពពីរមានន័យដូចម្តេច?",
      options: [
        "It means 'AND THEN' — do the first action, and then do the second action",
        "It means delete everything immediately",
        "It means pause the app forever",
        "It means multiply the two numbers"
      ],
      optionsKm: [
        "វាមានន័យថា 'រួចហើយទើប' (AND THEN) — ធ្វើសកម្មភាពទីមួយ រួចហើយទើបធ្វើសកម្មភាពទីពីរ",
        "វាមានន័យថាលុបអ្វីៗទាំងអស់ចោលភ្លាមៗ",
        "វាមានន័យថាផ្អាកដំណើរការកម្មវិធីជារៀងរហូត",
        "វាមានន័យថាគុណលេខទាំងពីរចូលគ្នា"
      ],
      correct: 0,
      explanation: "Correct! The semicolon ';' chains sequential actions in Power Fx: Reset(field) ; Notify('Done').",
      explanationKm: "ត្រឹមត្រូវណាស់! សញ្ញាក្បៀសចំនុច ';' ភ្ជាប់សកម្មភាពជាលំដាប់ក្នុង Power Fx៖ Reset(field) ; Notify('Done')។"
    },
    {
      q: "Q5. What happens if an app shows a success message BEFORE saving data to SharePoint?",
      qKm: "សំណួរទី ៥៖ តើមានអ្វីកើតឡើងបើកម្មវិធីបង្ហាញសារជោគជ័យ មុនពេលទិន្នន័យត្រូវបានរក្សាទុកក្នុង SharePoint?",
      options: [
        "If saving fails, the user believes their report succeeded when data was actually lost!",
        "Nothing happens, it always works perfectly",
        "The computer will shut down automatically",
        "SharePoint will fix the error by itself"
      ],
      optionsKm: [
        "បើការរក្សាទុកបរាជ័យ អ្នកប្រើនឹងជឿថារបាយការណ៍ជោគជ័យ ខណៈដែលទិន្នន័យពិតជាបាត់បង់!",
        "គ្មានបញ្ហាអ្វីទេ វាតែងតែដំណើរការល្អឥតខ្ចោះជានិច្ច",
        "កុំព្យូទ័រនឹងបិទដំណើរការដោយស្វ័យប្រវត្តិ",
        "SharePoint នឹងកែសម្រួលកំហុសនោះដោយខ្លួនឯង"
      ],
      correct: 0,
      explanation: "Correct! This violates cause-and-effect. Always save data first, and ONLY show confirmation once the save finishes!",
      explanationKm: "ត្រឹមត្រូវណាស់! នេះជាការបំពានច្បាប់ហេតុនិងផល។ ត្រូវរក្សាទុកទិន្នន័យសិន រួចទើបបង្ហាញសារបញ្ជាក់នៅពេលរក្សាទុករួចរាល់!"
    }
  ];

  let currentQuizIndex = 0;

  // --------------------------------------------------------------------------
  // 4. PRESENTATION ENGINE INITIALIZATION
  // --------------------------------------------------------------------------
  function initPresentationEngine() {
    slides = Array.from(document.querySelectorAll('.slide'));
    totalSlides = slides.length;

    // Cache original English DOM content for all slides
    slides.forEach((slide) => {
      const id = slide.id;
      const content = slide.querySelector('.slide-content');
      if (content) {
        slideOriginals[id] = {
          title: slide.getAttribute('data-title') || '',
          segment: slide.getAttribute('data-segment') || '',
          notes: slide.getAttribute('data-notes') || '',
          content: content.innerHTML
        };
      }
    });

    const totalNumElem = document.getElementById('slide-total-num');
    if (totalNumElem) totalNumElem.textContent = totalSlides;

    bindNavigationControls();
    bindKeyboardShortcuts();
    bindTimerControls();
    bindPresenterNotes();
    bindOverviewModal();
    bindLanguageToggle();

    // Bind interactive widgets
    bindEverydaySequencer();
    bindMachineSimulator();
    bindHandsOnBoard();
    bindQuizWidget();
    bindRevealInteractions();

    // Start on first slide
    goToSlide(0);
    startTimer();
  }

  // --------------------------------------------------------------------------
  // 5. SLIDE NAVIGATION LOGIC
  // --------------------------------------------------------------------------
  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;

    currentSlideIndex = index;

    slides.forEach((slide, i) => {
      if (i === currentSlideIndex) {
        slide.classList.add('active');
        slide.scrollTop = 0;
      } else {
        slide.classList.remove('active');
      }
    });

    const activeSlide = slides[currentSlideIndex];
    const slideTitle = activeSlide.getAttribute('data-title') || '';
    const slideSegment = activeSlide.getAttribute('data-segment') || '';

    // Update Header & Footer
    const headerTitleElem = document.getElementById('current-slide-title');
    if (headerTitleElem) headerTitleElem.textContent = slideTitle;

    const currentNumElem = document.getElementById('slide-current-num');
    if (currentNumElem) currentNumElem.textContent = currentSlideIndex + 1;

    // Update Progress Scrub Bar
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
      const percent = ((currentSlideIndex + 1) / totalSlides) * 100;
      progressBar.style.width = `${percent}%`;
    }

    // Update Nav Buttons
    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');
    if (prevBtn) prevBtn.disabled = currentSlideIndex === 0;
    if (nextBtn) {
      if (currentSlideIndex === totalSlides - 1) {
        nextBtn.innerHTML = isKhmerActive ? '<span>ចប់</span>' : '<span>Finish</span>';
      } else {
        nextBtn.innerHTML = isKhmerActive
          ? `<span>បន្ទាប់</span> <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>`
          : `<span>Next</span> <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>`;
      }
    }

    // Update Presenter Notes
    updatePresenterNotesContent();
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

  function bindNavigationControls() {
    document.getElementById('btn-prev')?.addEventListener('click', prevSlide);
    document.getElementById('btn-next')?.addEventListener('click', nextSlide);
    document.getElementById('btn-restart')?.addEventListener('click', () => goToSlide(0));

    // Progress scrub track click to jump
    const track = document.getElementById('progress-track');
    if (track) {
      track.addEventListener('click', (e) => {
        const rect = track.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const targetPercent = clickX / rect.width;
        const targetIndex = Math.floor(targetPercent * totalSlides);
        goToSlide(targetIndex);
      });
    }
  }

  function bindKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

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
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'n':
        case 'N':
          e.preventDefault();
          togglePresenterNotes();
          break;
        case 'o':
        case 'O':
          e.preventDefault();
          toggleOverviewModal();
          break;
        case 'r':
        case 'R':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'l':
        case 'L':
          e.preventDefault();
          toggleLanguage();
          break;
      }
    });
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }

  // --------------------------------------------------------------------------
  // 6. 90-MINUTE AGENDA LIVE ACTIVITY TIMER
  // --------------------------------------------------------------------------
  function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    isTimerRunning = true;
    updateTimerButtonUI();

    timerInterval = setInterval(() => {
      timerSecondsElapsed++;
      renderTimerDisplay();
      updateAgendaSegmentTracker();
    }, 1000);
  }

  function pauseTimer() {
    if (timerInterval) clearInterval(timerInterval);
    isTimerRunning = false;
    updateTimerButtonUI();
  }

  function resetTimer() {
    pauseTimer();
    timerSecondsElapsed = 0;
    renderTimerDisplay();
    updateAgendaSegmentTracker();
  }

  function toggleTimer() {
    if (isTimerRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  }

  function renderTimerDisplay() {
    const timerElem = document.getElementById('session-timer');
    if (!timerElem) return;

    const mins = Math.floor(timerSecondsElapsed / 60);
    const secs = timerSecondsElapsed % 60;
    timerElem.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function updateTimerButtonUI() {
    const iconElem = document.getElementById('timer-icon');
    if (!iconElem) return;

    if (isTimerRunning) {
      iconElem.innerHTML = `<path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>`;
    } else {
      iconElem.innerHTML = `<path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>`;
    }
  }

  function updateAgendaSegmentTracker() {
    const segmentBadge = document.getElementById('current-segment-name');
    if (!segmentBadge) return;

    const mins = timerSecondsElapsed / 60;
    let segTextEn = 'Part 1: Welcome & Review';
    let segTextKm = 'ផ្នែកទី ១៖ ស្វាគមន៍ & តម្រង់ទិស';

    if (mins >= 10 && mins < 22) {
      segTextEn = 'Part 2: What is an Instruction?';
      segTextKm = 'ផ្នែកទី ២៖ អ្វីជាសេចក្តីណែនាំ?';
    } else if (mins >= 22 && mins < 38) {
      segTextEn = 'Part 3: The Law of Order';
      segTextKm = 'ផ្នែកទី ៣៖ ច្បាប់នៃលំដាប់';
    } else if (mins >= 38 && mins < 42) {
      segTextEn = 'Mid-Session Pulse Check';
      segTextKm = 'សម្រាកពាក់កណ្តាលម៉ោង';
    } else if (mins >= 42 && mins < 54) {
      segTextEn = 'Part 4: Workplace Case Studies';
      segTextKm = 'ផ្នែកទី ៤៖ ករណីសិក្សារោងចក្រ';
    } else if (mins >= 54 && mins < 66) {
      segTextEn = 'Part 5: Hands-On Practice';
      segTextKm = 'ផ្នែកទី ៥៖ ការអនុវត្តផ្ទាល់';
    } else if (mins >= 66 && mins < 74) {
      segTextEn = 'Part 6: Knowledge & Power Fx';
      segTextKm = 'ផ្នែកទី ៦៖ ចំណេះដឹង & Power Fx';
    } else if (mins >= 74 && mins < 84) {
      segTextEn = 'Part 7: Final Challenge';
      segTextKm = 'ផ្នែកទី ៧៖ បញ្ហាប្រឈមចុងក្រោយ';
    } else if (mins >= 84) {
      segTextEn = 'Part 8: Synthesis & Homework';
      segTextKm = 'ផ្នែកទី ៨៖ សំយោគ & កិច្ចការផ្ទះ';
    }

    segmentBadge.textContent = isKhmerActive ? segTextKm : segTextEn;
  }

  function bindTimerControls() {
    document.getElementById('timer-toggle-btn')?.addEventListener('click', toggleTimer);
    document.getElementById('timer-reset-btn')?.addEventListener('click', resetTimer);
  }

  // --------------------------------------------------------------------------
  // 7. PRESENTER NOTES SYSTEM
  // --------------------------------------------------------------------------
  function togglePresenterNotes() {
    isNotesOpen = !isNotesOpen;
    const panel = document.getElementById('presenter-notes-panel');
    if (panel) {
      panel.classList.toggle('open', isNotesOpen);
    }
  }

  function updatePresenterNotesContent() {
    const activeSlide = slides[currentSlideIndex];
    if (!activeSlide) return;

    const notesContentElem = document.getElementById('notes-content');
    const notesSegmentElem = document.getElementById('notes-segment-label');
    const notes = activeSlide.getAttribute('data-notes') || (isKhmerActive ? 'គ្មានកំណត់ចំណាំសម្រាប់ស្លាយនេះទេ' : 'No notes available for this slide.');
    const segment = activeSlide.getAttribute('data-segment') || '';

    if (notesContentElem) notesContentElem.textContent = notes;
    if (notesSegmentElem) notesSegmentElem.textContent = segment;
  }

  function bindPresenterNotes() {
    document.getElementById('btn-notes')?.addEventListener('click', togglePresenterNotes);
    document.getElementById('notes-floating-tab')?.addEventListener('click', togglePresenterNotes);
    document.getElementById('notes-close-btn')?.addEventListener('click', togglePresenterNotes);
  }

  // --------------------------------------------------------------------------
  // 8. OVERVIEW MODAL SYSTEM
  // --------------------------------------------------------------------------
  function toggleOverviewModal() {
    const modal = document.getElementById('overview-modal');
    if (!modal) return;

    modal.classList.toggle('hidden');
    if (!modal.classList.contains('hidden')) {
      renderOverviewGrid();
    }
  }

  function renderOverviewGrid() {
    const gridContainer = document.getElementById('overview-grid-container');
    if (!gridContainer) return;

    gridContainer.innerHTML = '';

    slides.forEach((slide, i) => {
      const card = document.createElement('div');
      card.className = `overview-card ${i === currentSlideIndex ? 'active' : ''}`;
      const title = slide.getAttribute('data-title') || `Slide ${i + 1}`;

      card.innerHTML = `
        <span class="overview-card-num">SLIDE ${i + 1}</span>
        <span class="overview-card-title">${title}</span>
      `;

      card.addEventListener('click', () => {
        goToSlide(i);
        toggleOverviewModal();
      });

      gridContainer.appendChild(card);
    });
  }

  function bindOverviewModal() {
    document.getElementById('btn-overview')?.addEventListener('click', toggleOverviewModal);
    document.getElementById('overview-close-btn')?.addEventListener('click', toggleOverviewModal);
  }

  // --------------------------------------------------------------------------
  // 9. NATIVE OFFLINE IN-DOM BILINGUAL TRANSLATION (ZERO LAG)
  // --------------------------------------------------------------------------
  function toggleLanguage() {
    try { localStorage.setItem('powerapps_presentation_lang', !isKhmerActive ? 'km' : 'en'); } catch(e){}
    isKhmerActive = !isKhmerActive;
    document.body.classList.toggle('khmer-mode', isKhmerActive);

    const langBtnText = document.getElementById('lang-btn-text');
    if (langBtnText) {
      langBtnText.innerHTML = isKhmerActive ? '🇺🇸 English' : '🇰🇭 ខ្មែរ (Khmer)';
    }

    slides.forEach((slide) => {
      const id = slide.id;
      const contentContainer = slide.querySelector('.slide-content');
      if (!contentContainer) return;

      if (isKhmerActive && KHMER_SLIDES[id]) {
        contentContainer.innerHTML = KHMER_SLIDES[id].content;
        slide.setAttribute('data-title', KHMER_SLIDES[id].title);
        slide.setAttribute('data-segment', KHMER_SLIDES[id].segment);
        if (KHMER_SLIDES[id].notes) {
          slide.setAttribute('data-notes', KHMER_SLIDES[id].notes);
        }
      } else if (!isKhmerActive && slideOriginals[id]) {
        contentContainer.innerHTML = slideOriginals[id].content;
        slide.setAttribute('data-title', slideOriginals[id].title);
        slide.setAttribute('data-segment', slideOriginals[id].segment);
        slide.setAttribute('data-notes', slideOriginals[id].notes);
      }
    });

    // Re-bind interactive widget listeners on the updated DOM
    bindEverydaySequencer();
    bindMachineSimulator();
    bindHandsOnBoard();
    bindQuizWidget();
    bindRevealInteractions();

    // Refresh Current Slide View without changing slide index!
    goToSlide(currentSlideIndex);
    updateAgendaSegmentTracker();
  }

  function bindLanguageToggle() {
    document.getElementById('btn-lang')?.addEventListener('click', toggleLanguage);
  }

  // --------------------------------------------------------------------------
  // 10. INTERACTIVE DEMO 1: EVERYDAY SEQUENCER (COFFEE)
  // --------------------------------------------------------------------------
  let coffeeSequence = [];
  const correctCoffeeOrder = ['boil', 'grounds', 'pour', 'enjoy'];

  function bindEverydaySequencer() {
    const pool = document.getElementById('everyday-seq-pool');
    const resetBtn = document.getElementById('coffee-reset-btn');
    if (!pool) return;

    if (resetBtn) {
      resetBtn.onclick = () => resetEverydaySeq();
    }

    const buttons = pool.querySelectorAll('.seq-drag-item');
    buttons.forEach((btn) => {
      btn.onclick = () => {
        const step = btn.getAttribute('data-step');
        if (!step || btn.classList.contains('used')) return;
        placeEverydayStep(btn, step);
      };
    });
  }

  function placeEverydayStep(btn, stepKey) {
    if (coffeeSequence.length >= 4) return;

    coffeeSequence.push(stepKey);
    btn.classList.add('used');

    const slotIndex = coffeeSequence.length;
    const slotElem = document.getElementById(`everyday-slot-${slotIndex}`);
    if (slotElem) {
      slotElem.classList.add('filled');
      const contentSpan = slotElem.querySelector('.slot-content');
      if (contentSpan) {
        contentSpan.textContent = btn.textContent;
      }
    }

    checkEverydaySeqCompletion();
  }

  function checkEverydaySeqCompletion() {
    const feedback = document.getElementById('everyday-seq-feedback');
    if (!feedback) return;

    if (coffeeSequence.length === 4) {
      const isCorrect = coffeeSequence.every((val, idx) => val === correctCoffeeOrder[idx]);
      if (isCorrect) {
        feedback.className = 'seq-feedback-banner success';
        feedback.innerHTML = isKhmerActive
          ? '🎉 <strong>លំដាប់ត្រឹមត្រូវឥតខ្ចោះ!</strong> ដាំទឹក ➔ ដាក់កាហ្វេ ➔ ចាក់ទឹក ➔ រីករាយ។ កាហ្វេក្តៅឆ្ងាញ់រួចរាល់!'
          : '🎉 <strong>PERFECT SEQUENCE!</strong> Boil ➔ Grounds ➔ Pour ➔ Enjoy. Delicious hot coffee is served!';
      } else {
        feedback.className = 'seq-feedback-banner error';
        feedback.innerHTML = isKhmerActive
          ? '⚠️ <strong>ខុសលំដាប់ហើយ!</strong> អ្នកបានច្របល់ជំហាន។ ចុច "កំណត់ឡើងវិញ" ហើយសាកម្តងទៀត!'
          : '⚠️ <strong>INCORRECT SEQUENCE!</strong> You poured water or drank before boiling! Click "Reset" and try again.';
      }
    } else {
      feedback.className = 'seq-feedback-banner waiting';
      feedback.textContent = isKhmerActive
        ? `👉 បានជ្រើសរើស ${coffeeSequence.length}/៤ ជំហាន... បន្តជ្រើសរើសតាមលំដាប់!`
        : `👉 Placed ${coffeeSequence.length}/4 steps... Keep going in order!`;
    }
  }

  function resetEverydaySeq() {
    coffeeSequence = [];
    for (let i = 1; i <= 4; i++) {
      const slot = document.getElementById(`everyday-slot-${i}`);
      if (slot) {
        slot.classList.remove('filled');
        const content = slot.querySelector('.slot-content');
        if (content) content.textContent = isKhmerActive ? '— នៅទទេ —' : '— Empty —';
      }
    }

    const pool = document.getElementById('everyday-seq-pool');
    if (pool) {
      pool.querySelectorAll('.seq-drag-item').forEach((b) => b.classList.remove('used'));
    }

    const feedback = document.getElementById('everyday-seq-feedback');
    if (feedback) {
      feedback.className = 'seq-feedback-banner waiting';
      feedback.textContent = isKhmerActive
        ? '👉 ចុចប៊ូតុងខាងលើតាមលំដាប់ត្រឹមត្រូវ (ពីជំហានទី ១ ដល់ ទី ៤)។'
        : '👉 Tap the buttons above in the exact logical order (Step 1 to Step 4).';
    }
  }

  // --------------------------------------------------------------------------
  // 11. INTERACTIVE DEMO 2: INDUSTRIAL MACHINE SAFE-START SIMULATOR
  // --------------------------------------------------------------------------
  let machineState = {
    guard: false,
    key: false,
    pressure: false,
    running: false
  };

  function bindMachineSimulator() {
    const resetBtn = document.getElementById('mach-reset-btn');
    if (resetBtn) {
      resetBtn.onclick = () => resetMachineSeq();
    }

    ['mach-btn-1', 'mach-btn-2', 'mach-btn-3', 'mach-btn-4'].forEach((id) => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.onclick = () => {
          const step = btn.getAttribute('data-mach-step');
          handleMachineStep(step, btn);
        };
      }
    });
  }

  function handleMachineStep(step, btn) {
    const feedback = document.getElementById('machine-seq-feedback');
    const beacon = document.getElementById('machine-beacon-light');

    if (step === 'guard') {
      machineState.guard = true;
      btn.style.borderColor = 'var(--fluent-green-light)';
      btn.style.background = 'rgba(16, 124, 16, 0.25)';
      if (feedback) {
        feedback.className = 'seq-feedback-banner waiting';
        feedback.innerHTML = isKhmerActive
          ? '✅ <strong>ជំហាន ១ ជោគជ័យ៖</strong> របាំងសុវត្ថិភាពអុបទិកត្រូវបានត្រួតពិនិត្យ គ្មានឧបសគ្គរារាំង។ បន្ទាប់៖ បើកសោភ្លើងធំ!'
          : '✅ <strong>Step 1 Complete:</strong> Safety guard optical light curtain verified clear! Next: Turn on Master Power.';
      }
    } else if (step === 'key') {
      if (!machineState.guard) {
        triggerInterlockViolation(isKhmerActive
          ? '🚨 <strong>ប្រព័ន្ធរារាំងសុវត្ថិភាព៖</strong> មិនអាចបើកភ្លើងបានទេ! ត្រូវពិនិត្យរបាំងសុវត្ថិភាព (ជំហាន ១) ជាមុន!'
          : '🚨 <strong>SAFETY INTERLOCK:</strong> Cannot energize power! You must inspect Safety Guard (Step 1) first!');
        return;
      }
      machineState.key = true;
      btn.style.borderColor = 'var(--fluent-green-light)';
      btn.style.background = 'rgba(16, 124, 16, 0.25)';
      if (beacon) {
        beacon.style.backgroundColor = '#f59e0b';
        beacon.style.boxShadow = '0 0 12px rgba(245, 158, 11, 0.9)';
      }
      if (feedback) {
        feedback.className = 'seq-feedback-banner waiting';
        feedback.innerHTML = isKhmerActive
          ? '✅ <strong>ជំហាន ២ ជោគជ័យ៖</strong> សោភ្លើងធំត្រូវបានបើក កង្ហារត្រជាក់ដំណើរការ។ បន្ទាប់៖ ពិនិត្យសម្ពាធប្រេង!'
          : '✅ <strong>Step 2 Complete:</strong> Master key ON. Microcontrollers energized. Next: Check hydraulic oil pressure.';
      }
    } else if (step === 'pressure') {
      if (!machineState.key) {
        triggerInterlockViolation(isKhmerActive
          ? '🚨 <strong>ប្រព័ន្ធរារាំងសុវត្ថិភាព៖</strong> សម្ពាធប្រេងនៅត្រឹម 0 PSI! ត្រូវបើកសោភ្លើងធំ (ជំហាន ២) ជាមុន!'
          : '🚨 <strong>SAFETY INTERLOCK:</strong> Oil pump is unpowered! You must turn Master Key ON (Step 2) first!');
        return;
      }
      machineState.pressure = true;
      btn.style.borderColor = 'var(--fluent-green-light)';
      btn.style.background = 'rgba(16, 124, 16, 0.25)';
      if (feedback) {
        feedback.className = 'seq-feedback-banner waiting';
        feedback.innerHTML = isKhmerActive
          ? '✅ <strong>ជំហាន ៣ ជោគជ័យ៖</strong> សម្ពាធប្រេងឡើងដល់ 50 PSI ថេរ។ លក្ខខណ្ឌគ្រប់គ្រាន់! អាចចុចប៊ូតុងបៃតង START បាន!'
          : '✅ <strong>Step 3 Complete:</strong> Hydraulic pressure steady at 50 PSI. All prerequisites met! You may now press START.';
      }
    } else if (step === 'start') {
      if (!machineState.guard || !machineState.key || !machineState.pressure) {
        triggerInterlockViolation(isKhmerActive
          ? '🚨 <strong>ប្រព័ន្ធរារាំងសុវត្ថិភាពបានចាក់សោ៖</strong> ម៉ូទ័រត្រូវបានចាក់សោ! អ្នកត្រូវតែបំពេញ ជំហាន ១, ២ និង ៣ ជាមុនសិន ទើបអាចបញ្ឆេះបាន!'
          : '🚨 <strong>SAFETY INTERLOCK BLOCKED:</strong> Motor locked! You must satisfy Safety Guard, Master Key, and Pressure Check first!');
        return;
      }
      machineState.running = true;
      btn.style.borderColor = 'var(--fluent-green-light)';
      btn.style.background = 'rgba(16, 124, 16, 0.4)';
      if (beacon) {
        beacon.style.backgroundColor = '#107c10';
        beacon.style.boxShadow = '0 0 16px rgba(16, 124, 16, 1)';
      }
      if (feedback) {
        feedback.className = 'seq-feedback-banner success';
        feedback.innerHTML = isKhmerActive
          ? '⚡ <strong>ម៉ាស៊ីនដំណើរការដោយសុវត្ថិភាព!</strong> ភ្លើងសញ្ញាបៃតងភ្លឺ ខ្សែសង្វាក់ផលិតកម្មចាប់ផ្តើមដោយគ្មានគ្រោះថ្នាក់!'
          : '⚡ <strong>MOTOR RUNNING SAFELY!</strong> Green beacon active. Stamping press running in full compliance with safety SOP!';
      }
    }
  }

  function triggerInterlockViolation(msg) {
    const feedback = document.getElementById('machine-seq-feedback');
    const beacon = document.getElementById('machine-beacon-light');
    if (feedback) {
      feedback.className = 'seq-feedback-banner error';
      feedback.innerHTML = msg;
    }
    if (beacon) {
      beacon.style.backgroundColor = '#ef4444';
      beacon.style.boxShadow = '0 0 18px rgba(239, 68, 68, 1)';
    }
  }

  function resetMachineSeq() {
    machineState = { guard: false, key: false, pressure: false, running: false };

    ['mach-btn-1', 'mach-btn-2', 'mach-btn-3', 'mach-btn-4'].forEach((id) => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.style.borderColor = 'var(--border-subtle)';
        btn.style.background = 'var(--bg-card)';
      }
    });

    const beacon = document.getElementById('machine-beacon-light');
    if (beacon) {
      beacon.style.backgroundColor = '#ef4444';
      beacon.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.8)';
    }

    const feedback = document.getElementById('machine-seq-feedback');
    if (feedback) {
      feedback.className = 'seq-feedback-banner waiting';
      feedback.textContent = isKhmerActive
        ? '👉 អនុវត្តតាមពិធីការសុវត្ថិភាព៖ ១. របាំងសុវត្ថិភាព ➔ ២. សោភ្លើង ➔ ៣. សម្ពាធប្រេង ➔ ៤. ចុច Start។'
        : '👉 Follow the strict safety protocol: 1. Safety Guard ➔ 2. Key Power ➔ 3. Pressure Check ➔ 4. Start.';
    }
  }

  // --------------------------------------------------------------------------
  // 12. GUIDED PRACTICE: HANDS-ON SORTING BOARD
  // --------------------------------------------------------------------------
  let handsOnSequence = [];
  const correctHandsOnOrder = ['estop', 'open', 'scan', 'submit'];

  function bindHandsOnBoard() {
    const pool = document.getElementById('handson-pool');
    const resetBtn = document.getElementById('handson-reset-btn');
    if (!pool) return;

    if (resetBtn) {
      resetBtn.onclick = () => resetHandsOnBoard();
    }

    const buttons = pool.querySelectorAll('.seq-drag-item');
    buttons.forEach((btn) => {
      btn.onclick = () => {
        const action = btn.getAttribute('data-action');
        if (!action || btn.classList.contains('used')) return;
        addHandsOnStep(btn, action);
      };
    });
  }

  function addHandsOnStep(btn, actionKey) {
    if (handsOnSequence.length >= 4) return;

    handsOnSequence.push(actionKey);
    btn.classList.add('used');

    const slotIndex = handsOnSequence.length;
    const slotElem = document.getElementById(`handson-slot-${slotIndex}`);
    if (slotElem) {
      slotElem.classList.add('filled');
      const contentSpan = slotElem.querySelector('.slot-content');
      if (contentSpan) {
        contentSpan.textContent = btn.textContent;
      }
    }

    checkHandsOnCompletion();
  }

  function checkHandsOnCompletion() {
    const feedback = document.getElementById('handson-seq-feedback');
    if (!feedback) return;

    if (handsOnSequence.length === 4) {
      const isCorrect = handsOnSequence.every((val, idx) => val === correctHandsOnOrder[idx]);
      if (isCorrect) {
        feedback.className = 'seq-feedback-banner success';
        feedback.innerHTML = isKhmerActive
          ? '🎉 <strong>លំដាប់ប្រតិបត្តិការល្អឥតខ្ចោះ!</strong> សុវត្ថិភាពឈប់បន្ទាន់ ➔ បើកកម្មវិធី ➔ ស្កេនបាកូដ ➔ ផ្ញើរបាយការណ៍។ ត្រឹមត្រូវតាមស្តង់ដារឧស្សាហកម្ម!'
          : '🎉 <strong>FLAWLESS OPERATIONAL SEQUENCE!</strong> E-Stop ➔ Open App ➔ Scan Barcode ➔ Submit Report. Safety and data verified!';
      } else {
        feedback.className = 'seq-feedback-banner error';
        feedback.innerHTML = isKhmerActive
          ? '⚠️ <strong>លំដាប់មិនទាន់ត្រឹមត្រូវទេ!</strong> ចងចាំ៖ សុវត្ថិភាព E-Stop ត្រូវតែធ្វើមុនគេបង្អស់! ចុច "កំណត់ក្តារឡើងវិញ" ហើយសាកម្តងទៀត។'
          : '⚠️ <strong>INCORRECT ORDER!</strong> Safety E-Stop must strictly be Step 1 before picking up the tablet! Click "Reset Board" to retry.';
      }
    } else {
      feedback.className = 'seq-feedback-banner waiting';
      feedback.textContent = isKhmerActive
        ? `👉 បានដាក់ ${handsOnSequence.length}/៤ ជំហាន... បន្តជ្រើសរើសតាមលំដាប់!`
        : `👉 Placed ${handsOnSequence.length}/4 steps... Keep going!`;
    }
  }

  function resetHandsOnBoard() {
    handsOnSequence = [];
    for (let i = 1; i <= 4; i++) {
      const slot = document.getElementById(`handson-slot-${i}`);
      if (slot) {
        slot.classList.remove('filled');
        const content = slot.querySelector('.slot-content');
        if (content) content.textContent = isKhmerActive ? '— នៅទទេ —' : '— Empty —';
      }
    }

    const pool = document.getElementById('handson-pool');
    if (pool) {
      pool.querySelectorAll('.seq-drag-item').forEach((b) => b.classList.remove('used'));
    }

    const feedback = document.getElementById('handson-seq-feedback');
    if (feedback) {
      feedback.className = 'seq-feedback-banner waiting';
      feedback.textContent = isKhmerActive
        ? '👉 ចុចសកម្មភាពទាំង ៤ តាមលំដាប់ប្រតិបត្តិការត្រឹមត្រូវ។'
        : '👉 Click the 4 steps in the correct operational order.';
    }
  }

  // --------------------------------------------------------------------------
  // 13. KNOWLEDGE CHECK QUIZ WIDGET
  // --------------------------------------------------------------------------
  function bindQuizWidget() {
    renderQuizQuestion();

    const nextBtn = document.getElementById('quiz-next-btn');
    if (nextBtn) {
      nextBtn.onclick = () => {
        currentQuizIndex = (currentQuizIndex + 1) % quizData.length;
        renderQuizQuestion();
      };
    }
  }

  function renderQuizQuestion() {
    const qData = quizData[currentQuizIndex];
    if (!qData) return;

    const counterElem = document.getElementById('quiz-counter');
    const questionElem = document.getElementById('quiz-question');
    const optionsElem = document.getElementById('quiz-options');
    const feedbackElem = document.getElementById('quiz-feedback');

    if (counterElem) {
      counterElem.textContent = isKhmerActive
        ? `សំណួរទី ${currentQuizIndex + 1} នៃ ${quizData.length}`
        : `Question ${currentQuizIndex + 1} of ${quizData.length}`;
    }

    if (questionElem) {
      questionElem.textContent = isKhmerActive ? qData.qKm : qData.q;
    }

    if (feedbackElem) {
      feedbackElem.style.display = 'none';
      feedbackElem.innerHTML = '';
    }

    if (optionsElem) {
      optionsElem.innerHTML = '';
      const options = isKhmerActive ? qData.optionsKm : qData.options;
      const letters = ['A', 'B', 'C', 'D'];

      options.forEach((optText, optIdx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.innerHTML = `<strong>${letters[optIdx]}.</strong> <span>${optText}</span>`;

        btn.onclick = () => {
          const isCorrect = optIdx === qData.correct;
          optionsElem.querySelectorAll('.quiz-option-btn').forEach((b) => {
            b.classList.remove('correct', 'wrong');
            b.disabled = true;
          });

          if (isCorrect) {
            btn.classList.add('correct');
          } else {
            btn.classList.add('wrong');
            const correctBtn = optionsElem.children[qData.correct];
            if (correctBtn) correctBtn.classList.add('correct');
          }

          if (feedbackElem) {
            feedbackElem.style.display = 'block';
            feedbackElem.innerHTML = isKhmerActive ? qData.explanationKm : qData.explanation;
          }
        };

        optionsElem.appendChild(btn);
      });
    }
  }

  // --------------------------------------------------------------------------
  // 14. REVEAL SOLUTION INTERACTION
  // --------------------------------------------------------------------------
  function bindRevealInteractions() {
    const revealBtn = document.getElementById('challenge-reveal-btn');
    if (!revealBtn) return;

    revealBtn.onclick = () => {
      const solutionCard = document.getElementById('challenge-exemplar-card');
      if (!solutionCard) return;

      solutionCard.classList.toggle('hidden');
      const isHidden = solutionCard.classList.contains('hidden');

      if (isKhmerActive) {
        revealBtn.textContent = isHidden ? '👁️ បង្ហាញចម្លើយគំរូ' : '🔒 លាក់ចម្លើយវិញ';
      } else {
        revealBtn.textContent = isHidden ? '👁️ Reveal Solution' : '🔒 Hide Solution';
      }
    };
  }

  // --------------------------------------------------------------------------
  // 15. BOOTSTRAP INITIALIZATION
  // --------------------------------------------------------------------------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPresentationEngine);
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
    initPresentationEngine();
  }

})();


// ============================================================================
// VISUAL & ENGAGEMENT UPGRADE ENGINE: LASER POINTER, SPOTLIGHT, AND CLICK RIPPLE
// ============================================================================
(function initVisualEngagementEngine() {
  function setup() {
    let pointerDot = document.getElementById('presenter-pointer');
    let rippleEl = document.getElementById('pointer-click-ripple');
    let isLaserActive = true;

    // Create DOM elements if they don't already exist
    if (!pointerDot) {
      pointerDot = document.createElement('div');
      pointerDot.id = 'presenter-pointer';
      pointerDot.className = 'presenter-laser-dot';
      pointerDot.innerHTML = '<div class="laser-halo"></div>';
      document.body.appendChild(pointerDot);
    }
    if (!rippleEl) {
      rippleEl = document.createElement('div');
      rippleEl.id = 'pointer-click-ripple';
      rippleEl.className = 'pointer-click-ripple';
      document.body.appendChild(rippleEl);
    }

    document.body.classList.add('laser-mode');

    // Laser button in header if present
    const laserBtn = document.getElementById('laser-toggle-btn') || document.getElementById('btn-laser');
    if (laserBtn) {
      laserBtn.style.color = '#ff4d4d';
      laserBtn.classList.add('active-tool');
      laserBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleLaser();
      });
    }

    function toggleLaser() {
      isLaserActive = !isLaserActive;
      document.body.classList.toggle('laser-mode', isLaserActive);
      if (laserBtn) {
        laserBtn.style.color = isLaserActive ? '#ff4d4d' : 'var(--text-muted)';
        laserBtn.classList.toggle('active-tool', isLaserActive);
      }
    }

    // Keydown toggle with 'P'
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (e.code === 'KeyP') {
        e.preventDefault();
        toggleLaser();
      }
    });

    // Dynamic mouse tracking for both the Teacher Laser & Stage Ambient Spotlight
    window.addEventListener('mousemove', (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);

      if (!isLaserActive || !pointerDot) return;
      pointerDot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    });

    // Ripple click shockwave for student focus on trainer clicks
    window.addEventListener('mousedown', (e) => {
      if (!rippleEl) return;
      rippleEl.style.left = `${e.clientX}px`;
      rippleEl.style.top = `${e.clientY}px`;
      rippleEl.classList.remove('rippling');
      void rippleEl.offsetWidth; // trigger reflow
      rippleEl.classList.add('rippling');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
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
