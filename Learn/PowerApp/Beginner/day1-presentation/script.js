/**
 * ============================================================================
 * MICROSOFT POWER APPS FOUNDATION — DAY 1: HOW APPS SOLVE PROBLEMS
 * Standalone Presentation Engine with 100% Reliable Instant Bilingual Translation
 * English <-> Khmer (ភាសាខ្មែរ) with Offline-Safe In-DOM Translation Engine
 * Optimized 60fps Smooth Transitions & Native Khmer Typography
 * ============================================================================
 */

(function () {
  'use strict';

  // State Management
  let currentSlideIndex = 0;
  let slides = [];
  let totalSlides = 0;

  // 90-Minute Agenda Live Activity Timer
  let timerSecondsElapsed = 0;
  let timerInterval = null;
  let isTimerRunning = false;
  const TOTAL_SESSION_SECONDS = 90 * 60; // 90 minutes

  // Presenter Notes
  let isNotesOpen = false;

  // Bilingual State (Persisted in localStorage when available)
  let isKhmerActive = false;
  const slideOriginals = {};

  // --------------------------------------------------------------------------
  // Complete High-Accuracy Khmer Knowledge Base for ALL 24 Slides
  // --------------------------------------------------------------------------
  const KHMER_SLIDES = {
    'slide-1': {
      title: 'ថ្ងៃទី ១៖ របៀបដែលកម្មវិធីដោះស្រាយបញ្ហា',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & តម្រង់ទិស (០០:០០ - ១០:០០)',
      content: `
        <div class="hero-layout">
          <div class="hero-pill-group">
            <span class="hero-pill">ដំណាក់កាលទី ១៖ មូលដ្ឋានគ្រឹះ</span>
            <span class="hero-pill teal-pill">ថ្ងៃទី ១ នៃ ២៧</span>
            <span class="hero-pill blue-pill">៩០ នាទី</span>
          </div>

          <h1 class="hero-title">
            របៀបដែលកម្មវិធីដោះស្រាយបញ្ហា
            <span class="gradient-text"><br>លំហូរជាសកលនៃកម្មវិធីកុំព្យូទ័រ</span>
          </h1>

          <p class="hero-subtitle">
            សូមស្វាគមន៍មកកាន់ថ្ងៃទី ១! អ្នកមិនចាំបាច់មានចំណេះដឹងសរសេរកូដ គណិតវិទ្យា ឬវិទ្យាសាស្ត្រកុំព្យូទ័រពីមុនមកទេ។ ថ្ងៃនេះយើងនឹងស្វែងយល់ពីច្បាប់មាសតែមួយគត់ដែលដំណើរការគ្រប់កម្មវិធីកុំព្យូទ័រទាំងអស់នៅលើផែនដី។
          </p>

          <div class="mental-model-anchor-card">
            <span class="card-eyebrow">គំរូគំនិតមេសម្រាប់វគ្គបណ្តុះបណ្តាល ២៧ ថ្ងៃ៖</span>
            <div class="model-pipeline-container">
              <div class="pipeline-step active-step">
                <span class="pipeline-step-badge">1</span>
                <span class="pipeline-step-name">បញ្ហាពិត</span>
              </div>
              <span class="pipeline-arrow">&rarr;</span>
              <div class="pipeline-step">
                <span class="pipeline-step-badge">2</span>
                <span class="pipeline-step-name">ដំណើរការ</span>
              </div>
              <span class="pipeline-arrow">&rarr;</span>
              <div class="pipeline-step">
                <span class="pipeline-step-badge">3</span>
                <span class="pipeline-step-name">ទិន្នន័យ</span>
              </div>
              <span class="pipeline-arrow">&rarr;</span>
              <div class="pipeline-step">
                <span class="pipeline-step-badge">4</span>
                <span class="pipeline-step-name">អេក្រង់ UI</span>
              </div>
              <span class="pipeline-arrow">&rarr;</span>
              <div class="pipeline-step">
                <span class="pipeline-step-badge">5</span>
                <span class="pipeline-step-name">តក្កវិជ្ជា</span>
              </div>
              <span class="pipeline-arrow">&rarr;</span>
              <div class="pipeline-step">
                <span class="pipeline-step-badge">6</span>
                <span class="pipeline-step-name">សកម្មភាព</span>
              </div>
              <span class="pipeline-arrow">&rarr;</span>
              <div class="pipeline-step">
                <span class="pipeline-step-badge">7</span>
                <span class="pipeline-step-name">ផ្ទុកទិន្នន័យ</span>
              </div>
              <span class="pipeline-arrow">&rarr;</span>
              <div class="pipeline-step">
                <span class="pipeline-step-badge">8</span>
                <span class="pipeline-step-name">ការឆ្លើយតប</span>
              </div>
              <span class="pipeline-arrow">&rarr;</span>
              <div class="pipeline-step">
                <span class="pipeline-step-badge">9</span>
                <span class="pipeline-step-name">តេស្តសាកល្បង</span>
              </div>
            </div>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូបង្រៀន (០០:០០ - ០៤:០០):</strong></p>
        <p>"សូមស្វាគមន៍អ្នកទាំងអស់គ្នាមកកាន់ថ្ងៃទី ១ នៃវគ្គបណ្តុះបណ្តាល Microsoft Power Apps! មុននឹងចាប់ផ្តើម សូមដកដង្ហើមវែងៗ។ អ្នកទាំងអស់គ្នាកំពុងស្ថិតនៅកន្លែងដែលត្រឹមត្រូវ ទោះបីជាអ្នកមិនធ្លាប់សរសេរកូដសូម្បីតែមួយបន្ទាត់ មិនធ្លាប់ប៉ះ Database ឬមិនធ្លាប់បង្កើត Software ពីមុនមកក៏ដោយ។"</p>
        <p>"វគ្គសិក្សានេះមិនមែនជាប្រធានបទដាច់ដោយឡែក ២៧ ថ្ងៃនោះទេ។ មើលខ្សែចង្វាក់នៅលើអេក្រង់៖ បញ្ហាជាក់ស្តែង ➔ ដំណើរការ ➔ ទិន្នន័យ ➔ អេក្រង់ UI ➔ តក្កវិជ្ជា ➔ សកម្មភាព ➔ ការផ្ទុកទិន្នន័យ ➔ ការឆ្លើយតប ➔ ការសាកល្បង។ នេះជាគំរូគំនិតមេរបស់យើង។ ថ្ងៃនេះយើងចាប់ផ្តើមពីចំណុចទី ១៖ កម្មវិធីកើតចេញពីបញ្ហារបស់មនុស្សដែលត្រូវការលទ្ធផលមានប្រយោជន៍។"</p>
      `
    },

    'slide-2': {
      title: 'ផែនទីគំនិតមេ និងដំណើរការនៃកម្មវិធីសិក្សា',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & តម្រង់ទិស (០០:០០ - ១០:០០)',
      content: `
        <div class="slide-header">
          <span class="section-tag purple-tag">ស្ថាបត្យកម្មកម្មវិធីសិក្សា</span>
          <h2 class="slide-title">ដំណើរនៃការរៀនសូត្រជាវង់៖ របៀបដែលយើងរីកចម្រើន</h2>
          <p class="slide-lead">យើងមិនរៀននិយមន័យដាច់ដោយឡែកនោះទេ។ រាល់ថ្ងៃបន្ថែមតំណភ្ជាប់ធម្មជាតិមួយទៅក្នុងប្រព័ន្ធដែលអ្នកបង្កើត៖</p>
        </div>

        <div class="title-feature-grid">
          <div class="feature-card">
            <div class="feature-icon-badge purple-glow">🌱</div>
            <h3>ដំណាក់កាលទី ១៖ មូលដ្ឋានគ្រឹះ (ថ្ងៃ ១–៣)</h3>
            <p>បញ្ហា &rarr; ជំហានតាមលំដាប់ &rarr; ការពិត &amp; ទិន្នន័យ។ ស្វែងយល់ពីធាតុផ្សំរបស់មនុស្ស និងឌីជីថល។</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon-badge blue-glow">🧠</div>
            <h3>ដំណាក់កាលទី ២៖ តក្កវិជ្ជា &amp; ការសម្រេចចិត្ត (ថ្ងៃ ៤–៦)</h3>
            <p>ការប្រៀបធៀបទិន្នន័យ &rarr; សំណួរ ពិត/មិនពិត &rarr; ជម្រើស បើសិនជា/បើមិនដូច្នោះ &rarr; ច្បាប់រួមបញ្ចូលគ្នា។</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon-badge teal-glow">🏗️</div>
            <h3>ដំណាក់កាលទី ៣៖ ការបង្កើត App ផ្ទាល់ (ថ្ងៃ ៧–២៧)</h3>
            <p>លំហូរការងារ &rarr; តារាង SharePoint &rarr; អេក្រង់ &rarr; រូបមន្ត Power Fx &rarr; ការធ្វើតេស្តផ្ទាល់។</p>
          </div>
        </div>

        <div class="memory-hook-banner" style="margin-top: 18px;">
          <strong>សាច់រឿងរួមរបស់យើង៖</strong> ក្នុងរយៈពេល ២៧ ថ្ងៃខាងមុខ យើងនឹងបង្កើតប្រព័ន្ធជាក់ស្តែងមួយរួមគ្នា៖ <strong>កម្មវិធីស្នើសុំជំនួយ និងជួសជុលឧបករណ៍ក្នុងរោងចក្រ Apex Plastics</strong>។
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (០៤:០០ - ០៧:០០):</strong></p>
        <p>"សូមកត់សម្គាល់ថាតើដំណាក់កាលទី ១ ផ្សារភ្ជាប់ទៅដំណាក់កាលទី ២ យ៉ាងដូចម្តេច ហើយឈានទៅរកការបង្កើត App ផ្ទាល់។ យើងនឹងមិនផ្លាស់ប្តូរសាច់រឿងរាល់ថ្ងៃនោះទេ ប៉ុន្តែនឹងអនុវត្តលើសាច់រឿងរោងចក្រជាក់ស្តែងមួយ៖ កន្លែងដែលម៉ាស៊ីនខូច ក្រដាសបាត់បង់ ហើយកម្មករត្រូវការវិធីស្នើសុំការជួសជុលយ៉ាងរហ័ស។"</p>
      `
    },

    'slide-3': {
      title: 'គោលបំណងនៃការរៀនសូត្រដែលអាចវាស់វែងបាន',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & តម្រង់ទិស (០០:០០ - ១០:០០)',
      content: `
        <div class="slide-header">
          <span class="section-tag blue-tag">គោលដៅវគ្គសិក្សា</span>
          <h2 class="slide-title">អ្វីដែលអ្នកនឹងចេះស្ទាត់ក្នុងរយៈពេល ៩០ នាទីថ្ងៃនេះ</h2>
          <p class="slide-lead">នៅចុងបញ្ចប់នៃវគ្គសិក្សានេះ អ្នកនឹងអាចអនុវត្តជំនាញទាំង ៤ នេះដោយភាពជឿជាក់៖</p>
        </div>

        <div class="comparison-grid">
          <div class="comparison-card">
            <div class="card-icon-header">
              <span class="card-icon-circle blue-icon">1</span>
              <h3>កំណត់បញ្ហាជាក់ស្តែង</h3>
            </div>
            <p>ពិនិត្យមើលបញ្ហារាំងស្ទះនៅកន្លែងធ្វើការ និងញែកបញ្ហារបស់មនុស្ស (Problem) ចេញពីលទ្ធផលដែលចង់បាន (Result)។</p>
          </div>

          <div class="comparison-card">
            <div class="card-icon-header">
              <span class="card-icon-circle teal-icon">2</span>
              <h3>ពន្យល់ពីខ្សែចង្វាក់សកល</h3>
            </div>
            <p>តាមដានកិច្ចការណាមួយតាមខ្សែចង្វាក់ ៥ ជំហាន៖ <strong>បញ្ហា &rarr; ធាតុចូល &rarr; ដំណើរការ &rarr; ធាតុចេញ &rarr; លទ្ធផល</strong> ដោយមិនប្រើពាក្យបច្ចេកទេសពិបាកយល់។</p>
          </div>

          <div class="comparison-card">
            <div class="card-icon-header">
              <span class="card-icon-circle purple-icon">3</span>
              <h3>វិភាគម៉ាស៊ីនប្រចាំថ្ងៃ</h3>
            </div>
            <p>កំណត់ធាតុចូលច្បាស់លាស់ ដំណើរការខាងក្នុង និងធាតុចេញនៃឧបករណ៍ទូទៅ ដូចជាម៉ាស៊ីនលក់ភេសជ្ជៈ និងមីក្រូវ៉េវ។</p>
          </div>

          <div class="comparison-card">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">4</span>
              <h3>រៀបចំផែនទីស្នើសុំជំនួយក្នុងរោងចក្រ</h3>
            </div>
            <p>រៀបចំផែនទីករណីម៉ាស៊ីនខូចទៅជាធាតុចូល និងធាតុចេញច្បាស់លាស់ ត្រៀមសម្រាប់បង្កើត App លើ Tablet ក្នុង Power Apps។</p>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (០៧:០០ - ១០:០០):</strong></p>
        <p>"មើលគោលដៅទី ២៖ 'តាមដានកិច្ចការណាមួយតាមខ្សែចង្វាក់ ៥ ជំហាន៖ បញ្ហា ➔ ធាតុចូល ➔ ដំណើរការ ➔ ធាតុចេញ ➔ លទ្ធផល'។ នៅពេលអ្នកយល់ច្បាស់ពីចំណុចនេះ អ្នកអាចមើលឃើញរចនាសម្ព័ន្ធឌីជីថលភ្លាមៗនៅពេលឃើញបញ្ហានៅកន្លែងធ្វើការ។"</p>
      `
    },

    'slide-4': {
      title: 'ការរំលឹកចំណេះដឹងមូលដ្ឋាន',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & តម្រង់ទិស (០០:០០ - ១០:០០)',
      content: `
        <div class="slide-header">
          <span class="section-tag teal-tag">ការរំលឹកចំណេះដឹង</span>
          <h2 class="slide-title">អ្នកមានគំនិតជាអ្នកស្ថាបត្យករកម្មវិធីរួចហើយ</h2>
          <p class="slide-lead">តោះមកបញ្ជាក់ថាអ្នកបានយល់ដឹងពីកុំព្យូទ័ររួចហើយ តាមរយៈបទពិសោធន៍រស់នៅប្រចាំថ្ងៃ៖</p>
        </div>

        <div class="comparison-grid">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle blue-icon">Q1</span>
              <h3>កាក់ម៉ាស៊ីនលក់ភេសជ្ជៈ</h3>
            </div>
            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5;">
              នៅពេលអ្នកដាក់កាក់ $1 ក្នុងម៉ាស៊ីនលក់ភេសជ្ជៈ ហើយចុចប៊ូតុង "B-4" តើអ្នកកំពុងធ្វើអ្វី?
            </p>
            <div style="background-color: var(--bg-card); border-left: 3px solid var(--fluent-blue); padding: 10px; margin-top: 8px; color: #fff; font-size: 0.88rem;">
              <strong>ចម្លើយមូលដ្ឋាន៖</strong> អ្នកកំពុងផ្តល់ <em>ការណែនាំ (Instructions)</em> និង <em>ធនធាន (Resources)</em> ដល់ម៉ាស៊ីន ដើម្បីឲ្យវាដឹងពីអ្វីដែលត្រូវធ្វើ!
            </div>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle teal-icon">Q2</span>
              <h3>កាហ្វេត្រជាក់</h3>
            </div>
            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5;">
              កាហ្វេរបស់អ្នកត្រជាក់។ អ្នកដាក់វាចូលក្នុងមីក្រូវ៉េវ កំណត់ "៦០ វិនាទី" រួចចុច Start។ តើអ្វីជាបញ្ហាពិតប្រាកដ?
            </p>
            <div style="background-color: var(--bg-card); border-left: 3px solid var(--fluent-teal); padding: 10px; margin-top: 8px; color: #fff; font-size: 0.88rem;">
              <strong>ចម្លើយមូលដ្ឋាន៖</strong> បញ្ហាគឺ <em>កាហ្វេត្រជាក់</em>; មីក្រូវ៉េវជា <em>ដំណើរការ (Process)</em>; កែវកាហ្វេក្តៅគឺជា <em>ផលសម្រេច (Result)</em>!
            </div>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១០:០០):</strong></p>
        <p>"កត់សម្គាល់ឃើញទេ? គ្មាននរណាម្នាក់ត្រូវការសញ្ញាបត្រវិទ្យាសាស្ត្រកុំព្យូទ័រដើម្បីឆ្លើយសំណួរទាំងពីរនេះឡើយ! អ្នកទាំងអស់គ្នាយល់ស្រាប់ហើយថាម៉ាស៊ីនត្រូវការធាតុចូល ដើម្បីដំណើរការ និងផ្តល់លទ្ធផលមកវិញ។"</p>
      `
    },

    'slide-5': {
      title: 'បញ្ហាដែលជាមូលហេតុនៃការបង្កើត App',
      segment: 'ផ្នែកទី ២៖ មូលហេតុដែលមានកម្មវិធី (១០:០០ - ២៥:០០)',
      content: `
        <div class="slide-header">
          <span class="section-tag yellow-tag">បញ្ហាជាក់ស្តែង</span>
          <h2 class="slide-title">វិបត្តិរោងចក្រ៖ ការបាត់បង់ក្រដាសកត់ត្រា</h2>
          <p class="slide-lead">ហេតុអ្វីបានជាក្រុមហ៊ុនចំណាយលុយរាប់លានដុល្លារដើម្បីជំនួសក្រដាសកត់ត្រាដោយ Power Apps?</p>
        </div>

        <div class="comparison-grid">
          <div class="comparison-card" style="border-left: 4px solid var(--fluent-red);">
            <div class="card-icon-header">
              <span class="card-icon-circle" style="background: rgba(209, 52, 56, 0.2); color: #ff8e8e;">❌</span>
              <h3>ការពិតនៃការប្រើក្រដាស</h3>
            </div>
            <ul class="comparison-list">
              <li>មូទ័រខ្សែក្រវាត់លេខ ២ ចាប់ផ្តើមលេចប្រេងនៅម៉ោង ០៨:១៥ ព្រឹក។</li>
              <li>កម្មករសរសេររបាយការណ៍លើក្រដាសដែលព្យួរនៅបង្គោលឈើ។</li>
              <li>នៅម៉ោង ១១:៣០ ព្រឹក នរណាម្នាក់បានកំពប់ប្រេងលើក្រដាសនោះដោយអចេតនា។</li>
              <li>មេការផ្នែកជួសជុលមិនដែលបានឃើញសារនោះឡើយ។</li>
              <li><strong>លទ្ធផល៖</strong> នៅម៉ោង ២:០០ រសៀល មូទ័រក្តៅខ្លាំង និងគាំង។ រោងចក្រទាំងមូលត្រូវបិទដំណើរការ ៦ ម៉ោង!</li>
            </ul>
          </div>

          <div class="comparison-card" style="border-left: 4px solid var(--fluent-green);">
            <div class="card-icon-header">
              <span class="card-icon-circle" style="background: rgba(16, 124, 16, 0.2); color: #8ce68c;">✅</span>
              <h3>អ្វីដែល App ធ្វើខុសពីមុន</h3>
            </div>
            <ul class="comparison-list">
              <li>កម្មករចុចលើ "Conveyor 2" និង "Oil Leak" លើ Tablet ជាប់ជញ្ជាំង។</li>
              <li>Tablet កត់ត្រាពេលវេលាជាក់ស្តែងភ្លាមៗ (08:15:22 ព្រឹក)។</li>
              <li>សារជូនដំណឹងបន្ទាន់លោតលើទូរស័ព្ទដៃរបស់ជាងជួសជុលភ្លាម។</li>
              <li>ជាងជួសជុលមកដល់ជាមួយប្រេង និងគ្រឿងបន្លាស់ក្នុងរយៈពេល ១២ នាទី។</li>
              <li><strong>លទ្ធផល៖</strong> មិនខាតពេល មិនខូចផលិតផល មិនខាតបង់ថវិកា!</li>
            </ul>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១០:០០ - ១៦:០០):</strong></p>
        <p>"មើលផ្នែកខាងឆ្វេង៖ នេះជាការពិតដែលកើតឡើងរាល់សប្តាហ៍ក្នុងរោងចក្រ ឃ្លាំង និងមន្ទីរពេទ្យ។ ក្រដាសបាត់បង់ កាហ្វេកំពប់ អក្សរមើលមិនយល់។ មើលផ្នែកខាងស្តាំ៖ App មិនមែនជាអ្នកជួសជុលមូទ័រទេ មនុស្សជាអ្នកជួសជុល! ប៉ុន្តែ App ធ្វើឲ្យការទំនាក់ទំនងមានភាពរហ័ស អចិន្ត្រៃយ៍ និងច្បាស់លាស់។"</p>
      `
    },

    'slide-6': {
      title: 'គោលគំនិតជាភាសាសាមញ្ញ',
      segment: 'ផ្នែកទី ២៖ មូលហេតុដែលមានកម្មវិធី (១០:០០ - ២៥:០០)',
      content: `
        <div class="slide-header">
          <span class="section-tag blue-tag">ភាសាសាមញ្ញជាមុនសិន</span>
          <h2 class="slide-title">តើអ្វីទៅជា "កម្មវិធីកុំព្យូទ័រ (Application)"?</h2>
          <p class="slide-lead">មុននឹងយើងមើលអេក្រង់ Software សូមលុបបំបាត់ការភ័យខ្លាចចំពោះពាក្យបច្ចេកទេស៖</p>
        </div>

        <div class="comparison-grid">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle blue-icon">💡</span>
              <h3>និយមន័យ ១ ប្រយោគ</h3>
            </div>
            <p style="font-size: 1.25rem; color: #fff; line-height: 1.6; margin-bottom: 14px;">
              <strong>កម្មវិធី គឺជាជំនួយការឌីជីថលដ៏ស្មោះត្រង់ ដែលទទួលយកព័ត៌មាន អនុវត្តតាមច្បាប់កំណត់យ៉ាងម៉ឺងម៉ាត់ និងផ្តល់នូវលទ្ធផលមានប្រយោជន៍។</strong>
            </p>
            <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.5;">
              កម្មវិធីមិនអាចគិតដោយខ្លួនឯងបានទេ គ្មានអារម្មណ៍ និងមិនអាចទាយដឹងចិត្តអ្នកឡើយ។ វាគឺខ្វាក់ភ្នែក និងធ្វើតាមតែការបញ្ជាប៉ុណ្ណោះ។
            </p>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle teal-icon">🔍</span>
              <h3>ការពិត ៣ យ៉ាងអំពីគ្រប់ App</h3>
            </div>
            <ul class="comparison-list">
              <li><strong>១. វាមិនមែនជាមន្តអាគមទេ៖</strong> រាល់សកម្មភាពដែល App ធ្វើ គឺដោយសារមនុស្សបានប្រាប់វាឲ្យធ្វើច្បាស់លាស់។</li>
              <li><strong>២. វាមានសម្រាប់បម្រើមនុស្ស៖</strong> App ដែលគ្មានអ្នកប្រើប្រាស់ គឺគ្រាន់តែជាប្រអប់ដែកស៊ីភ្លើងប៉ុណ្ណោះ។</li>
              <li><strong>៣. វាផ្សារភ្ជាប់បញ្ហាទៅកាន់លទ្ធផល៖</strong> ប្រសិនបើ App មិនបានជួយឲ្យការងារកាន់តែងាយស្រួល សុវត្ថិភាព ឬលឿនទេ វាមិនគួរមានវត្តមានឡើយ។</li>
            </ul>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១៦:០០ - ២០:០០):</strong></p>
        <p>"សូមចងចាំឃ្លានេះ៖ 'App គឺជាជំនួយការឌីជីថលដ៏ស្មោះត្រង់'។ វាមិនចេះនឿយហត់ មិនចេះភ្លេច និងមិនមានការរំខានឡើយ។ នៅពេលឃើញ Power App ក្នុងវគ្គនេះ កុំគិតពីកូដ តែត្រូវគិតពីជំនួយការដែលកំពុងរង់ចាំការបញ្ជា។"</p>
      `
    },

    'slide-7': {
      title: 'ឧទាហរណ៍ប្រចាំថ្ងៃ៖ ម៉ាស៊ីនលក់ភេសជ្ជៈ',
      segment: 'ផ្នែកទី ២៖ មូលហេតុដែលមានកម្មវិធី (១០:០០ - ២៥:០០)',
      content: `
        <div class="slide-header">
          <span class="section-tag purple-tag">ឧទាហរណ៍ប្រចាំថ្ងៃ</span>
          <h2 class="slide-title">ម៉ាស៊ីនលក់ភេសជ្ជៈ៖ ផ្នែករឹង + ផ្នែកទន់ក្នុងសកម្មភាព</h2>
          <p class="slide-lead">តោះមកពិនិត្យមើលម៉ាស៊ីនដែលយើងធ្លាប់ប្រើទាំងអស់គ្នា៖</p>
        </div>

        <div class="cause-effect-flow">
          <div class="flow-node node-problem">
            <span class="flow-node-tag">តម្រូវការមនុស្ស</span>
            <div class="flow-node-title">ស្រេកទឹក / អស់កម្លាំង</div>
            <p class="flow-node-desc">អ្នកអស់កម្លាំង និងត្រូវការភេសជ្ជៈប៉ូវកម្លាំងពេលសម្រាក។</p>
          </div>

          <div class="flow-arrow">&rarr;</div>

          <div class="flow-node node-input">
            <span class="flow-node-tag">ធាតុចូល</span>
            <div class="flow-node-title">កាក់ + ប៊ូតុង "A3"</div>
            <p class="flow-node-desc">អ្នកដាក់លុយចូល និងចុចប៊ូតុងកូដភេសជ្ជៈ។</p>
          </div>

          <div class="flow-arrow">&rarr;</div>

          <div class="flow-node node-process">
            <span class="flow-node-tag">ដំណើរការ</span>
            <div class="flow-node-title">ផ្ទៀងផ្ទាត់ &amp; ង្វិល</div>
            <p class="flow-node-desc">ឈីបពិនិត្យលុយ បញ្ជាមូទ័រ A3 ឲ្យវិល ៣៦០ ដឺក្រេ។</p>
          </div>

          <div class="flow-arrow">&rarr;</div>

          <div class="flow-node node-output">
            <span class="flow-node-tag">ធាតុចេញ</span>
            <div class="flow-node-title">កំប៉ុងធ្លាក់ + សំឡេង</div>
            <p class="flow-node-desc">កំប៉ុងធ្លាក់ចុះមកថាស; អេក្រង់បង្ហាញ "THANK YOU"។</p>
          </div>

          <div class="flow-arrow">&rarr;</div>

          <div class="flow-node node-result">
            <span class="flow-node-tag">ផលសម្រេចពិត</span>
            <div class="flow-node-title">បាត់ស្រេកទឹក</div>
            <p class="flow-node-desc">អ្នកទទួលទានភេសជ្ជៈ និងត្រឡប់ទៅធ្វើការប្រកបដោយថាមពល។</p>
          </div>
        </div>

        <div class="memory-hook-banner" style="margin-top: 14px;">
          💡 <strong>កត់សម្គាល់ព្រំដែន៖</strong> ធាតុចេញ (Output) គឺកំប៉ុងធ្លាក់ក្នុងថាស។ ប៉ុន្តែ <em>ផលសម្រេច (Result)</em> គឺការបាត់ស្រេកទឹករបស់អ្នក។ Software បញ្ចប់នៅ Output; មនុស្សជាអ្នកទទួលបាន Result!
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (២០:០០ - ២៥:០០):</strong></p>
        <p>"សូមយកចិត្តទុកដាក់ខ្ពស់លើភាពខុសគ្នារវាង OUTPUT និង RESULT។ ម៉ាស៊ីនផលិតធាតុចេញ Output គឺកំប៉ុងទឹកត្រជាក់មួយ។ ប៉ុន្តែមនុស្សមិនមែនគ្រាន់តែចង់បានកំប៉ុងដែកទេ គឺចង់បាត់ស្រេកទឹក (Result)។ App ជោគជ័យបាន លុះត្រាតែ Output របស់វាបង្កើតបានជា Result ក្នុងជីវិតពិត។"</p>
      `
    },

    'slide-8': {
      title: 'ស្ថានភាពការងារជាក់ស្តែង៖ បញ្ជរស្នើសុំជំនួយក្នុងរោងចក្រ',
      segment: 'ផ្នែកទី ៣៖ លំហូរជាសកលនៃកម្មវិធី (២៥:០០ - ៤៥:០០)',
      content: `
        <div class="slide-header">
          <span class="section-tag teal-tag">ការអនុវត្តការងារជាក់ស្តែង</span>
          <h2 class="slide-title">គម្រោងកម្មវិធីសិក្សារបស់យើង៖ បញ្ជរស្នើសុំជំនួយក្នុងរោងចក្រ</h2>
          <p class="slide-lead">ជួបជាមួយកម្មវិធីរោងចក្រជាក់ស្តែងដែលយើងនឹងរចនា និងបង្កើតពេញមួយវគ្គសិក្សានេះ៖</p>
        </div>

        <div class="comparison-grid">
          <div class="concept-card" style="border-left: 4px solid var(--fluent-purple);">
            <div class="card-icon-header">
              <span class="card-icon-circle purple-icon">🏭</span>
              <h3>បរិបទរោងចក្រ៖ Apex Plastics Manufacturing</h3>
            </div>
            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5;">
              Apex Plastics ដំណើរការម៉ាស៊ីនចាក់ពុម្ពផ្លាស្ទិកល្បឿនលឿនចំនួន ១២ គ្រឿង។ ម៉ាស៊ីននីមួយៗដំណើរការ ២៤/៧ ដើម្បីផលិតគ្រឿងបន្លាស់រថយន្ត។
            </p>
            <ul class="comparison-list" style="margin-top: 10px;">
              <li><strong>អ្នកប្រើប្រាស់៖</strong> កម្មករបញ្ជាម៉ាស៊ីន, មេការវេន, អ្នកត្រួតពិនិត្យសុវត្ថិភាព, និងជាងជួសជុល។</li>
              <li><strong>ឧបសគ្គការងារ៖</strong> នៅពេលពុម្ពគាំង ឬលេចប្រេងត្រជាក់ កម្មករត្រូវចំណាយពេល ២០ នាទីដើររកជាងជួសជុលពាសពេញរោងចក្រ។</li>
            </ul>
          </div>

          <div class="concept-card" style="border-left: 4px solid var(--fluent-blue);">
            <div class="card-icon-header">
              <span class="card-icon-circle blue-icon">📱</span>
              <h3>ដំណោះស្រាយ៖ បញ្ជរ Tablet ឌីជីថល ១ នាទី</h3>
            </div>
            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5;">
              Tablet ធន់រឹងមាំមួយត្រូវបានបំពាក់នៅគ្រប់ទីតាំងផលិតកម្ម ដោយដំណើរការកម្មវិធី Microsoft Power App ផ្ទាល់ខ្លួន។
            </p>
            <ul class="comparison-list" style="margin-top: 10px;">
              <li>កម្មករគ្រាន់តែចុច៖ <strong>លេខកូដម៉ាស៊ីន</strong>, <strong>ប្រភេទបញ្ហា</strong>, និង <strong>កម្រិតបន្ទាន់</strong>។</li>
              <li>ការចុចប៊ូតុងធំមួយលើ <strong>"ផ្ញើសំណើសុំជំនួយ (SUBMIT REQUEST)"</strong> នឹងជូនដំណឹងភ្លាមៗទៅកាន់ជាងជួសជុលដែលកំពុងប្រចាំការ!</li>
            </ul>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (២៥:០០ - ៣០:០០):</strong></p>
        <p>"នេះគឺជាសាច់រឿងនៃវគ្គសិក្សា ២៧ ថ្ងៃរបស់យើង។ គ្រប់គោលគំនិតទាំងអស់ — លំដាប់លំដោយ, ប្រភេទដាតា, ពិត/មិនពិត, អថេរ (Variables), Galleries, ទម្រង់ Forms, និងតារាង SharePoint — នឹងត្រូវបង្កើតឡើងដោយផ្ទាល់ដើម្បីធ្វើឲ្យបញ្ជរស្នើសុំជំនួយនេះដំណើរការ។"</p>
        <p>"ឥឡូវនេះ តោះមកពិនិត្យមើលច្បាប់គ្រឹះនៃកុំព្យូទ័រ៖ ធាតុចូល &rarr; ដំណើរការ &rarr; ធាតុចេញ។"</p>
      `
    },

    'slide-9': {
      title: 'ខ្សែសង្វាក់ហេតុនិងផល (Cause-and-Effect Chain)',
      segment: 'ផ្នែកទី ៣៖ លំហូរជាសកលនៃកម្មវិធី (២៥:០០ - ៤៥:០០)',
      content: `
        <div class="slide-header">
          <span class="section-tag green-tag">បុព្វហេតុ &amp; ផល</span>
          <h2 class="slide-title">ខ្សែចង្វាក់ ៥ ជំហានជាសកលក្នុងសកម្មភាពជាក់ស្តែង</h2>
          <p class="slide-lead">របៀបដែលកម្មវិធីស្នើសុំជំនួយរបស់យើងផ្លាស់ប្តូរពីបញ្ហាម៉ាស៊ីនខូច ទៅជាម៉ាស៊ីនត្រូវបានជួសជុលរួចរាល់៖</p>
        </div>

        <div class="cause-effect-flow">
          <div class="flow-node node-problem">
            <span class="flow-node-tag">១. បញ្ហាជាក់ស្តែង</span>
            <div class="flow-node-title">ម៉ាស៊ីនចាក់ពុម្ពលេខ ៤ ឡើងកម្តៅខ្លាំង</div>
            <p class="flow-node-desc">បំពង់ទឹកត្រជាក់ស្ទះ; សីតុណ្ហភាពប្រេងឡើងដល់ ៨៨°C។</p>
          </div>

          <div class="flow-arrow">&rarr;</div>

          <div class="flow-node node-input">
            <span class="flow-node-tag">២. ធាតុចូលមនុស្ស</span>
            <div class="flow-node-title">កម្មករចុចលើ Tablet</div>
            <p class="flow-node-desc">ជ្រើសរើស "ម៉ាស៊ីនលេខ ៤", ប្រភេទ "ឡើងកម្តៅខ្លាំង", រួចចុច Submit។</p>
          </div>

          <div class="flow-arrow">&rarr;</div>

          <div class="flow-node node-process">
            <span class="flow-node-tag">៣. ដំណើរការឌីជីថល</span>
            <div class="flow-node-title">តក្កវិជ្ជានិងការបញ្ជូនសំណើ</div>
            <p class="flow-node-desc">បង្កើតសំបុត្រ #SR-101, កត់ត្រាពេល ០៨:១៥ ព្រឹក, ជូនដំណឹងទៅជាង។</p>
          </div>

          <div class="flow-arrow">&rarr;</div>

          <div class="flow-node node-output">
            <span class="flow-node-tag">៤. ធាតុចេញបង្ហាញ</span>
            <div class="flow-node-title">ផ្ទាំងបៃតងបញ្ជាក់ &amp; សំឡេងរោទ៍</div>
            <p class="flow-node-desc">អេក្រង់បង្ហាញ "សំបុត្រ #SR-101 បានបញ្ជូនទៅកាន់ជាង ស្រី"។</p>
          </div>

          <div class="flow-arrow">&rarr;</div>

          <div class="flow-node node-result">
            <span class="flow-node-tag">៥. ផលសម្រេចមានប្រយោជន៍</span>
            <div class="flow-node-title">ប្រព័ន្ធត្រជាក់ដំណើរការឡើងវិញ</div>
            <p class="flow-node-desc">ជាងមកដល់ក្នុងរយៈពេល ៨ នាទី; ម៉ាស៊ីនរួចផុតពីការខូចខាតធ្ងន់ធ្ងរ!</p>
          </div>
        </div>

        <div class="memory-hook-banner">
          <strong>សូមចងចាំ៖</strong> កម្មវិធីស្ថិតនៅក្នុងជំហាន ២, ៣, និង ៤។ ប៉ុន្តែគោលបំណងតែមួយគត់របស់វា គឺតភ្ជាប់ជំហាន ១ (បញ្ហា) ទៅកាន់ជំហាន ៥ (ផលសម្រេច)!
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (៣០:០០ - ៣៥:០០):</strong></p>
        <p>"សូមពិនិត្យមើលដ្យាក្រាមនេះដោយយកចិត្តទុកដាក់។ ក្នុងនាមជាអ្នកបង្កើត App យើងចំណាយពេលវេលាបង្កើតជំហានទី ២, ៣, និង ៤ — អេក្រង់ តក្កវិជ្ជា និងសារជូនដំណឹង។"</p>
        <p>"ប៉ុន្តែកុំភ្លេចពីមូលហេតុដែលអ្នកបង្កើតវា! អ្នកមិនមែនបង្កើតវាដើម្បីគ្រាន់តែបានប៊ូតុងស្អាតនោះទេ។ អ្នកបង្កើតវាដើម្បីឲ្យជំហានទី ១ ទទួលបានការដោះស្រាយក្នុងជំហានទី ៥។"</p>
      `
    },

    'slide-10': {
      title: 'ស្វែងយល់ស៊ីជម្រៅ៖ ធាតុចូល (INPUT)',
      segment: 'ផ្នែកទី ៣៖ លំហូរជាសកលនៃកម្មវិធី (២៥:០០ - ៤៥:០០)',
      content: `
        <div class="slide-header">
          <span class="section-tag blue-tag">តំណភ្ជាប់ទី ១ នៃខ្សែចង្វាក់</span>
          <h2 class="slide-title">ធាតុចូល (Input)៖ អ្វីដែលបញ្ជូនចូលទៅក្នុងម៉ាស៊ីន</h2>
          <p class="slide-lead">កុំព្យូទ័រមិនអាចអានចិត្តមនុស្សបានទេ។ វាដឹងត្រឹមតែអ្វីដែលយើងផ្តល់ឲ្យវាប៉ុណ្ណោះ៖</p>
        </div>

        <div class="comparison-grid">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle blue-icon">📥</span>
              <h3>និយមន័យជាភាសាសាមញ្ញ</h3>
            </div>
            <p style="font-size: 1.1rem; color: #fff; line-height: 1.5; margin-bottom: 12px;">
              <strong>ធាតុចូល (Input) គឺជាសញ្ញាឆៅ អត្ថបទ លេខ ឬការចុចបញ្ជាដោយម្រាមដៃ ដែលមនុស្ស ឬឧបករណ៍ចាប់សញ្ញាបញ្ជូនចូលទៅក្នុងកម្មវិធី។</strong>
            </p>
            <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.5;">
              បើគ្មានធាតុចូលទេ កុំព្យូទ័រនឹងនៅស្ងៀម រង់ចាំការបញ្ជាដោយអត់ធ្មត់ជារៀងរហូត។
            </p>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle teal-icon">👆</span>
              <h3>ធាតុចូលទូទៅក្នុង Power Apps</h3>
            </div>
            <ul class="comparison-list">
              <li><strong>ការចុចម្រាមដៃ / ចុចកណ្ដុរ៖</strong> ចុចលើប៊ូតុង "Submit" ឬ "Cancel"។</li>
              <li><strong>ការវាយអត្ថបទ៖</strong> វាយឈ្មោះបុគ្គលិក ឬរោគសញ្ញាម៉ាស៊ីនចូលក្នុងប្រអប់អត្ថបទ (Text Input)។</li>
              <li><strong>ការជ្រើសរើស Dropdown៖</strong> ជ្រើសរើស "អាទិភាពខ្ពស់" ពីបញ្ជីជម្រើស។</li>
              <li><strong>ឧបករណ៍ចាប់សញ្ញា Hardware៖</strong> ស្កេនបាកូដកាតសម្គាល់ម៉ាស៊ីន ឬថតរូបភាពស្នាមប្រេះ។</li>
            </ul>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (៣៥:០០ - ៣៨:០០):</strong></p>
        <p>"គិតថាធាតុចូល (Input) ដូចជាការហុចសំបុត្រឲ្យអ្នកនាំសារ។ ប្រសិនបើអ្នកមិនហុចសំបុត្រឲ្យគាត់ទេ គាត់គ្មានអ្វីត្រូវដឹកជញ្ជូនឡើយ។ ធាតុចូល គឺជាប្រេងឥន្ធនៈដែលចាប់ផ្តើមដំណើរការកុំព្យូទ័រទាំងអស់។"</p>
      `
    },

    'slide-11': {
      title: 'ស្វែងយល់ស៊ីជម្រៅ៖ ដំណើរការ (PROCESS)',
      segment: 'ផ្នែកទី ៣៖ លំហូរជាសកលនៃកម្មវិធី (២៥:០០ - ៤៥:០០)',
      content: `
        <div class="slide-header">
          <span class="section-tag yellow-tag">តំណភ្ជាប់ទី ២ នៃខ្សែចង្វាក់</span>
          <h2 class="slide-title">ដំណើរការ (Process)៖ អ្វីដែលម៉ាស៊ីនធ្វើដោយស្ងាត់ៗ</h2>
          <p class="slide-lead">ការងារលាក់កំបាំងដែលអនុវត្តនៅក្នុងបន្ទះឈីបកុំព្យូទ័រ៖</p>
        </div>

        <div class="comparison-grid">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle" style="background: rgba(255, 185, 0, 0.2); color: var(--fluent-yellow);">⚙️</span>
              <h3>និយមន័យជាភាសាសាមញ្ញ</h3>
            </div>
            <p style="font-size: 1.1rem; color: #fff; line-height: 1.5; margin-bottom: 12px;">
              <strong>ដំណើរការ (Process) គឺជាការងារផ្ទៃក្នុង៖ ការគណនាគណិតវិទ្យា ការត្រួតពិនិត្យច្បាប់សុវត្ថិភាព និងការរៀបចំទិន្នន័យ។</strong>
            </p>
            <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.5;">
              អ្នកមិនអាចមើលឃើញចរន្តអគ្គិសនីរត់កាត់បន្ទះឈីបទេ ប៉ុន្តែអ្នកឃើញលទ្ធផលរបស់វា។ កុំព្យូទ័រអនុវត្តតាមជំហានមេកានិចក្នុងល្បឿនពន្លឺ។
            </p>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle purple-icon">🧮</span>
              <h3>អ្វីដែល Power Apps ធ្វើក្នុងពេលដំណើរការ</h3>
            </div>
            <ul class="comparison-list">
              <li><strong>ការគណនាគណិតវិទ្យា៖</strong> គណនារយៈពេល ថ្លៃខាតបង់ពេលម៉ាស៊ីនឈប់ ឬចំនួនបរិមាណ។</li>
              <li><strong>ការត្រួតពិនិត្យច្បាប់៖</strong> <em>"តើកម្មករភ្លេចវាយបញ្ចូលការពណ៌នាអំពីបញ្ហាដែរឬទេ?"</em></li>
              <li><strong>ការបញ្ជូនសេចក្តីសម្រេច៖</strong> <em>"ប្រសិនបើកម្រិតបន្ទាន់ជា 'ធ្ងន់ធ្ងរបំផុត' ត្រូវជូនដំណឹងទៅប្រធានរោងចក្រភ្លាមៗ!"</em></li>
              <li><strong>ការរក្សាទុកទិន្នន័យ៖</strong> រក្សាទុកកំណត់ត្រាជាអចិន្ត្រៃយ៍ក្នុង Cloud Database ឬតារាង SharePoint។</li>
            </ul>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (៣៨:០០ - ៤១:០០):</strong></p>
        <p>"ពាក្យថា 'ដំណើរការ (Process)' ស្តាប់ទៅដូចជាពាក្យបច្ចេកទេសវិស្វកម្ម ប៉ុន្តែសូមគិតថាវាដូចជាការចម្អិនអាហារ។ អ្នកដាក់នំប៉័ងចូលក្នុងម៉ាស៊ីនអាំង (ធាតុចូល); ធ្យូងកម្ដៅឡើងក្រហម និងរាប់វិនាទី (ដំណើរការ); ផុច! នំប៉័ងអាំងរួចរាល់លោតឡើងមក (ធាតុចេញ)។"</p>
      `
    },

    'slide-12': {
      title: 'ស្វែងយល់ស៊ីជម្រៅ៖ ធាតុចេញ & ផលសម្រេច',
      segment: 'ផ្នែកទី ៣៖ លំហូរជាសកលនៃកម្មវិធី (២៥:០០ - ៤៥:០០)',
      content: `
        <div class="slide-header">
          <span class="section-tag green-tag">តំណភ្ជាប់ទី ៣ &amp; ៤ នៃខ្សែចង្វាក់</span>
          <h2 class="slide-title">ធាតុចេញ &amp; ផលសម្រេច៖ ការផ្តល់តម្លៃត្រឡប់មកវិញ</h2>
          <p class="slide-lead">អ្វីដែលភ្នែក និងត្រចៀកមនុស្សទទួលបានមកវិញ និងរបៀបដែលពិភពពិតផ្លាស់ប្តូរ៖</p>
        </div>

        <div class="comparison-grid">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle teal-icon">📤</span>
              <h3>ធាតុចេញ (Output - តម្លៃឌីជីថល)</h3>
            </div>
            <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.5;">
              អ្វីៗទាំងអស់ដែលបង្ហាញត្រឡប់មកកាន់ញាណរបស់មនុស្ស៖
            </p>
            <ul class="comparison-list">
              <li>សញ្ញាគ្រីសពណ៌បៃតងបញ្ជាក់ជោគជ័យលើកញ្ចក់ Tablet។</li>
              <li>សំឡេងរោទ៍ជូនដំណឹងលោតលើទូរស័ព្ទរបស់ជាងជួសជុល។</li>
              <li>របារវឌ្ឍនភាពដែលបង្ហាញស្ថានភាពសំបុត្រ៖ <em>"បានចាត់ចែងជូនជាង ស្រី"</em>។</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">🎯</span>
              <h3>ផលសម្រេច (Result - តម្លៃជាក់ស្តែងក្នុងជីវិតពិត)</h3>
            </div>
            <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.5;">
              ការផ្លាស់ប្តូរក្នុងពិភពពិតដែលបញ្ជាក់ថាកម្មវិធីពិតជាមានតម្លៃក្នុងការបង្កើត៖
            </p>
            <ul class="comparison-list">
              <li>ម៉ាស៊ីនដែលឡើងកម្តៅត្រូវបានត្រួតពិនិត្យមុនពេលវាខូចខាត។</li>
              <li>ការផលិតគ្រឿងបន្លាស់ដំណើរការតាមកាលវិភាគធម្មតា។</li>
              <li>កម្មករត្រឡប់ទៅផ្ទះវិញដោយសុវត្ថិភាពនៅចុងបញ្ចប់នៃវេនការងារ!</li>
            </ul>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (៤១:០០ - ៤៥:០០):</strong></p>
        <p>"កុំច្រឡំរវាង ធាតុចេញ (Output) និង ផលសម្រេច (Result) ឲ្យសោះ។ ធាតុចេញ គឺជាការបញ្ជាក់ឌីជីថល (ផ្ទាំងបៃតងលើអេក្រង់)។ ផលសម្រេច គឺជាពិភពពិតត្រូវបានកែលម្អ (ម៉ាស៊ីនត្រូវបានជួសជុល ហើយរោងចក្របន្តផលិតកម្មដោយរលូន!)។"</p>
      `
    },

    'slide-13': {
      title: 'ចំណុចត្រួតពិនិត្យពាក់កណ្តាលម៉ោង (៤៥:០០)',
      segment: 'ផ្នែកទី ៣៖ លំហូរជាសកលនៃកម្មវិធី (២៥:០០ - ៤៥:០០)',
      content: `
        <div class="slide-header">
          <span class="section-tag purple-tag">ចំណុចត្រួតពិនិត្យពាក់កណ្តាលម៉ោង</span>
          <h2 class="slide-title">ការឆ្លុះបញ្ចាំងពាក់កណ្តាលម៉ោង៖ បានបញ្ចប់ ៤៥ នាទី</h2>
          <p class="slide-lead">តោះមកពិនិត្យមើលវឌ្ឍនភាពរបស់យើងធៀបនឹងរបៀបវារៈមេ ៩០ នាទី៖</p>
        </div>

        <div class="title-feature-grid">
          <div class="feature-card" style="border-top: 3px solid var(--fluent-green);">
            <div class="feature-icon-badge" style="background: rgba(16,124,16,0.2); color:#8ce68c;">✓</div>
            <h3>ផ្នែកទី ១៖ ការតម្រង់ទិស</h3>
            <p>គំរូគំនិតមេត្រូវបានបង្កើតឡើង៖ ចាប់ពីបញ្ហា រហូតដល់ផលសម្រេច។</p>
          </div>
          <div class="feature-card" style="border-top: 3px solid var(--fluent-green);">
            <div class="feature-icon-badge" style="background: rgba(16,124,16,0.2); color:#8ce68c;">✓</div>
            <h3>ផ្នែកទី ២ &amp; ៣៖ ខ្សែចង្វាក់សកល</h3>
            <p>បានយល់ច្បាស់ពី បញ្ហា &rarr; ធាតុចូល &rarr; ដំណើរការ &rarr; ធាតុចេញ &rarr; ផលសម្រេច។</p>
          </div>
          <div class="feature-card" style="border-top: 3px solid var(--fluent-blue);">
            <div class="feature-icon-badge blue-glow">➔</div>
            <h3>៤៥ នាទីបន្ទាប់</h3>
            <p>ការបង្ហាញបញ្ជរផ្ទាល់ ការអនុវត្តរួមគ្នា កម្រងសំណួរ &amp; បញ្ហាប្រឈមចុងក្រោយ!</p>
          </div>
        </div>

        <div class="memory-hook-banner" style="margin-top: 18px;">
          <strong>ការត្រួតពិនិត្យវឌ្ឍនភាព៖</strong> ក្រោកឡើងបត់បែនរាងកាយ បៀមទឹកបន្តិច! នៅក្នុងពាក់កណ្តាលទី ២ អ្នកនឹងបានធ្វើសកម្មភាពផ្ទាល់លើអេក្រង់ មិនមែនត្រឹមតែអង្គុយស្តាប់នោះទេ។
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (៤៥:០០):</strong></p>
        <p>"យើងមកដល់នាទីទី ៤៥ ពាក់កណ្តាលមេរៀនរបស់យើងហើយ។ ឥឡូវនេះអ្នកយល់ដឹងពីទស្សនវិជ្ជាគ្រឹះនៃ Software ច្បាស់ជាងអ្នកសរសេរកូដស្ម័គ្រចិត្តជាច្រើននាក់ទៅទៀត។"</p>
        <p>"នៅក្នុងពាក់កណ្តាលទី ២ យើងនឹងយកចំណេះដឹងនេះទៅអនុវត្តជាក់ស្តែងជាមួយឧបករណ៍ពិសោធន៍ និងបញ្ហាប្រឈម ១០ នាទី។ តោះឈានទៅផ្នែកទី ៤!"</p>
      `
    },

    'slide-14': {
      title: 'ការបង្ហាញផ្ទាល់របស់គ្រូ៖ បញ្ជរគំរូ',
      segment: 'ផ្នែកទី ៤៖ ការបង្ហាញ & ការអនុវត្ត (៤៥:០០ - ៦៥:០០)',
      content: `
        <div class="slide-header">
          <span class="section-tag blue-tag">ការបង្ហាញផ្ទាល់</span>
          <h2 class="slide-title">ការបង្ហាញផ្ទាល់៖ បញ្ជរស្នើសុំជំនួយ ១ នាទី</h2>
          <p class="slide-lead">ទស្សនារបៀបដែលខ្សែចង្វាក់ ៥ ជំហានដំណើរការជាក់ស្តែងក្នុងឧបករណ៍ Tablet ឌីជីថលគំរូនេះ៖</p>
        </div>

        <div class="kiosk-demo-container">
          <div class="kiosk-screen-box">
            <div class="kiosk-screen-header">
              <span class="kiosk-title">📱 APEX PLASTICS • បញ្ជរស្នើសុំជំនួយ</span>
              <span class="kiosk-status-badge">ONLINE</span>
            </div>

            <div class="kiosk-form-group">
              <label class="kiosk-label" for="kiosk-issue-select">1. តើមានបញ្ហាអ្វីកើតឡើង? (ធាតុចូល / Input)</label>
              <select id="kiosk-issue-select" class="kiosk-input-select">
                <option value="Conveyor Belt Jammed">ខ្សែក្រវាត់ដឹកជញ្ជូនស្ទះ (Conveyor Belt Jammed)</option>
                <option value="Hydraulic Oil Leak (Press #4)" selected>ការលេចធ្លាយប្រេងធារាសាស្ត្រ - ម៉ាស៊ីនលេខ ៤ (Hydraulic Oil Leak)</option>
                <option value="Safety Guard Interlock Broken">គន្លឹះសុវត្ថិភាពទ្វារបាក់ (Safety Guard Interlock Broken)</option>
                <option value="Temperature Overheating (>85°C)">សីតុណ្ហភាពឡើងកម្តៅខ្លាំង >85°C (Temperature Overheating)</option>
              </select>
            </div>

            <div class="kiosk-form-group">
              <label class="kiosk-label" for="kiosk-dept-select">2. ទីតាំងរោងចក្រ / ខ្សែសង្វាក់ផលិតកម្ម</label>
              <select id="kiosk-dept-select" class="kiosk-input-select">
                <option value="Bay A: Molding Bay" selected>តំបន់ A៖ កន្លែងចាក់ពុម្ព (Bay A: Molding Bay)</option>
                <option value="Bay B: Assembly Line 2">តំបន់ B៖ ខ្សែសង្វាក់ដំឡើងទី ២ (Bay B: Assembly Line 2)</option>
                <option value="Bay C: Quality Inspection">តំបន់ C៖ កន្លែងត្រួតពិនិត្យគុណភាព (Bay C: Quality Inspection)</option>
              </select>
            </div>

            <button id="kiosk-submit-btn" class="kiosk-btn">
              ផ្ញើសំណើសុំជំនួយ (Submit Support Request)
            </button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 12px; justify-content: center;">
            <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">
              នៅពីក្រោយខ្នង (ដំណើរការ &amp; ធាតុចេញ / Process &amp; Output)៖
            </div>
            <div id="kiosk-output-display" class="kiosk-output-card hidden">
            </div>
            <p style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.45;">
              នៅពេលអ្នកចុច "Submit" ប្រព័ន្ធដំណើរការនឹងខ្ចប់ធាតុបញ្ចូល បង្កើតលេខកូដសំបុត្រថ្មី កត់ត្រាពេលវេលា និងរុញសារជូនដំណឹងភ្លាមៗ។
            </p>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (៤៥:០០ - ៥២:០០):</strong></p>
        <p>"មើលលើអេក្រង់របស់ខ្ញុំ។ ក្នុងនាមជាកម្មករ ខ្ញុំជ្រើសរើស 'ការលេចធ្លាយប្រេងធារាសាស្ត្រ (Press #4)' និង 'តំបន់ A៖ កន្លែងចាក់ពុម្ព'។ បញ្ជី Dropdown ទាំងនោះគឺជា ធាតុចូល (INPUTS) របស់ខ្ញុំ។"</p>
        <p>"ឥឡូវនេះ ខ្ញុំចុចប៊ូតុងពណ៌ខៀវធំ។ មើលអ្វីដែលកើតឡើងនៅខាងស្តាំ៖ សំបុត្រ #SR-101 ត្រូវបានបង្កើតភ្លាមៗ មានកត់ត្រាពេលវេលា និងចាត់ចែងជាង។ នោះហើយជា ដំណើរការ (PROCESS) និង ធាតុចេញ (OUTPUT)!"</p>
      `
    },

    'slide-15': {
      title: 'ការអនុវត្តរួមគ្នា៖ ការវិភាគប្រព័ន្ធ ៣',
      segment: 'ផ្នែកទី ៤៖ ការបង្ហាញ & ការអនុវត្ត (៤៥:០០ - ៦៥:០០)',
      content: `
        <div class="slide-header">
          <span class="section-tag teal-tag">លំហាត់អនុវត្តរួមគ្នា</span>
          <h2 class="slide-title">ការអនុវត្តរួមគ្នា៖ វិភាគប្រព័ន្ធប្រចាំថ្ងៃចំនួន ៣</h2>
          <p class="slide-lead">រួមគ្នាជាមួយគ្រូ បំបែកស្ថានភាពនីមួយៗទៅជា ធាតុចូល ដំណើរការ និងធាតុចេញ៖</p>
        </div>

        <div class="title-feature-grid">
          <div class="feature-card">
            <div class="feature-icon-badge blue-glow">1</div>
            <h4>ម៉ោងរោទ៍ទូរស័ព្ទ</h4>
            <p><strong>ធាតុចូល៖</strong> អ្នកកំណត់ម៉ោង "០៦:៣០ ព្រឹក" &amp; បើកដំណើរការ។</p>
            <p><strong>ដំណើរការ៖</strong> នាឡិកាទូរស័ព្ទរាប់ថយក្រោយ; ប្រៀបធៀបម៉ោងបច្ចុប្បន្នទៅ ០៦:៣០។</p>
            <p><strong>ធាតុចេញ៖</strong> ឧបករណ៍បំពងសំឡេងបន្លឺសំឡេងរោទ៍ខ្លាំងៗនៅម៉ោង ០៦:៣០ ព្រឹក។</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon-badge teal-glow">2</div>
            <h4>បាកូដផ្សារទំនើប</h4>
            <p><strong>ធាតុចូល៖</strong> អ្នកគិតលុយយកបាកូដមកស្កេនកាត់កាំរស្មីឡាស៊ែរ។</p>
            <p><strong>ដំណើរការ៖</strong> កុំព្យូទ័រស្វែងរកលេខកូដនោះក្នុងបញ្ជីតម្លៃលើ Cloud។</p>
            <p><strong>ធាតុចេញ៖</strong> អេក្រង់បង្ហាញ "ទឹកដោះគោ $3.50" ហើយថតថតលុយបើកចេញមក។</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon-badge purple-glow">3</div>
            <h4>ការស្កេនកាតចូលធ្វើការ</h4>
            <p><strong>ធាតុចូល៖</strong> កម្មករយកកាត RFID ប៉ះលើឧបករណ៍ចាប់សញ្ញាទ្វាររោងចក្រ។</p>
            <p><strong>ដំណើរការ៖</strong> ប្រព័ន្ធផ្ទៀងផ្ទាត់កំណត់ត្រាបុគ្គលិកសកម្ម និងកត់ត្រាពេលវេលាជាក់ស្តែង។</p>
            <p><strong>ធាតុចេញ៖</strong> របាំងទ្វារដោះសោ ហើយភ្លើងព្រួញពណ៌បៃតងភ្លឺឡើង។</p>
          </div>
        </div>

        <div class="analogy-box" style="margin-top: 18px;">
          <strong>សូមសង្កេត៖</strong> ទោះបីជាប្រព័ន្ធកុំព្យូទ័រមើលទៅស្មុគស្មាញយ៉ាងណាក៏ដោយ ក៏វាតែងតែជាជំហានទាំង ៣ នេះដដែលៗតាមលំដាប់លំដោយជានិច្ច!
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (៥២:០០ - ៥៨:០០):</strong></p>
        <p>"តោះធ្វើលំហាត់នេះទាំងអស់គ្នាជាក្រុម។ មើលឧទាហរណ៍ទី ២៖ ម៉ាស៊ីនស្កេនបាកូដនៅផ្សារទំនើប។ ប្រសិនបើឡាស៊ែរប្រឡាក់ធូលី ហើយមិនអាចអានឆ្នូតខ្មៅបាន តើជំហានណាដែលបរាជ័យ? (រង់ចាំចម្លើយសិស្ស៖ ធាតុចូល / Input!)។ ត្រឹមត្រូវណាស់!"</p>
        <p>"ហើយប្រសិនបើធាតុចូលបរាជ័យ តើកុំព្យូទ័រអាចរកតម្លៃឃើញទេ? មិនអាចទេ! នោះហើយជាមូលហេតុដែលការរចនាចំណុចប្រទាក់អ្នកប្រើ (User Interface) មានសារៈសំខាន់ខ្លាំងក្នុង Power Apps។"</p>
      `
    },

    'slide-16': {
      title: 'កិច្ចការអនុវត្តផ្ទាល់ខ្លួន៖ អ្នកស៊ើបអង្កេតក្រដាស',
      segment: 'ផ្នែកទី ៤៖ ការបង្ហាញ & ការអនុវត្ត (៤៥:០០ - ៦៥:០០)',
      content: `
        <div class="slide-header">
          <span class="section-tag purple-tag">ការអនុវត្តផ្ទាល់ខ្លួន</span>
          <h2 class="slide-title">កិច្ចការអនុវត្តផ្ទាល់ខ្លួន៖ «អ្នកស៊ើបអង្កេតក្រដាស»</h2>
          <p class="slide-lead">ចំណាយពេល ៥ នាទីលើសៀវភៅកត់ត្រារបស់អ្នក។ ជ្រើសរើសទម្រង់ក្រដាស ១ ក្នុងកន្លែងធ្វើការរបស់អ្នក៖</p>
        </div>

        <div class="comparison-grid">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle purple-icon">📝</span>
              <h3>បញ្ជីពិនិត្យ ៥ នាទីរបស់អ្នក</h3>
            </div>
            <ul class="comparison-list">
              <li><strong>១. ឈ្មោះទម្រង់ក្រដាស៖</strong> ឧ. កំណត់ត្រាត្រួតពិនិត្យឧបករណ៍, សំណើសុំថែមម៉ោង, ឬប័ណ្ណបើកទំនិញពីឃ្លាំង។</li>
              <li><strong>២. កំណត់ធាតុចូល ៣ យ៉ាង៖</strong> តើមាន ៣ ចំណុចអ្វីខ្លះដែលកម្មករសរសេរដោយដៃ? (ឧ. ឈ្មោះ, កាលបរិច្ឆេទ, លេខម៉ាស៊ីន)។</li>
              <li><strong>៣. កំណត់ដំណើរការ៖</strong> តើអ្នកណាជាអ្នកអានក្រដាស គណនាផលបូក ឬស៊ីញ៉េអនុម័ត?</li>
              <li><strong>៤. កំណត់ផលសម្រេចដែលចង់បាន៖</strong> តើមានរឿងល្អអ្វីកើតឡើងនៅពេលទម្រង់នោះត្រូវបានបំពេញចប់សព្វគ្រប់?</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">💡</span>
              <h3>ឧទាហរណ៍នៃការវិភាគរបស់សិស្សគំរូ</h3>
            </div>
            <div style="background-color: var(--bg-card); border-radius: 6px; padding: 14px; font-size: 0.88rem; line-height: 1.5;">
              <p><strong>ទម្រង់ក្រដាស៖</strong> បញ្ជីត្រួតពិនិត្យសុវត្ថិភាពឡានលើកទំនិញប្រចាំថ្ងៃ (Forklift Checklist)។</p>
              <p><strong>ធាតុចូល៖</strong> ឈ្មោះអ្នកបើកបរ, លេខឡានលើកទំនិញ #3, ហ្វ្រាំងដំណើរការល្អ (បាទ/ចាស ឬ ទេ)។</p>
              <p><strong>ដំណើរការ៖</strong> មេការសុវត្ថិភាពពិនិត្យមើលកំណត់ត្រានៅម៉ោង ០៨:៣០ ព្រឹក។</p>
              <p><strong>ផលសម្រេច៖</strong> ឡានលើកទំនិញដែលមានបញ្ហាត្រូវបានផ្អាកដំណើរការ មុនពេលបង្កគ្រោះថ្នាក់!</p>
            </div>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (៥៨:០០ - ៦៥:០០):</strong></p>
        <p>"ចំណាយពេល ៥ នាទីស្ងប់ស្ងាត់ឥឡូវនេះ។ សរសេរចំណុចទាំង ៤ របស់អ្នកលើក្រដាស។ ខ្ញុំនឹងដើរជុំវិញបន្ទប់ដើម្បីឆ្លើយសំណួរ និងពិនិត្យការងាររបស់អ្នក។"</p>
        <p>"កុំទាន់បារម្ភពីរឿងកូដបច្ចេកវិទ្យា — ផ្តោតតែលើសាច់រឿងជាក់ស្តែងរបស់មនុស្ស៖ តើអ្វីជាធាតុចូល? តើអ្វីត្រូវបានដំណើរការ? តើអ្វីជាផលសម្រេច?"</p>
      `
    },

    'slide-17': {
      title: 'ការយល់ខុសទូទៅរបស់អ្នករៀនដំបូង',
      segment: 'ផ្នែកទី ៥៖ ការត្រួតពិនិត្យ & ការយល់ខុស (៦៥:០០ - ៧៥:០០)',
      content: `
        <div class="slide-header">
          <span class="section-tag yellow-tag">ជៀសវាងអន្ទាក់គំនិត</span>
          <h2 class="slide-title">គំរូគំនិតខុស ៣ យ៉ាងរបស់អ្នកទើបចាប់ផ្តើមរៀន</h2>
          <p class="slide-lead">ការកែតម្រូវការយល់ច្រឡំទាំងនេះឥឡូវនេះ នឹងជួយការពារអ្នកពីការខកចិត្តរាប់ខែនៅពេលក្រោយ៖</p>
        </div>

        <div class="comparison-grid">
          <div class="comparison-card">
            <div class="card-icon-header">
              <span class="card-icon-circle" style="background: rgba(209, 52, 56, 0.2); color: #ff8e8e;">1</span>
              <h3>"App ឆ្លាតដូចមនុស្ស"</h3>
            </div>
            <p style="font-size: 0.88rem; color: #ff9e9e;"><strong>គំរូគំនិតខុសដែលអាចកើតមាន៖</strong> គិតថា App ដឹងថាអ្នកវាយខុស ហើយវានឹងជួយកែដោយស្វ័យប្រវត្តិ។</p>
            <p style="font-size: 0.88rem; color: #8ce68c; margin-top: 6px;"><strong>ការកែតម្រូវរបស់គ្រូ៖</strong> កុំព្យូទ័រគឺខ្វាក់ភ្នែក និងធ្វើតាមបង្គាប់ ១០០%។ បើអ្នកផ្តល់ធាតុចូលមិនល្អ វានឹងផ្តល់ធាតុចេញមិនល្អ (Garbage In, Garbage Out!)។</p>
          </div>

          <div class="comparison-card">
            <div class="card-icon-header">
              <span class="card-icon-circle" style="background: rgba(209, 52, 56, 0.2); color: #ff8e8e;">2</span>
              <h3>"ផ្នែករឹង និងផ្នែកទន់ ដូចគ្នា"</h3>
            </div>
            <p style="font-size: 0.88rem; color: #ff9e9e;"><strong>គំរូគំនិតខុសដែលអាចកើតមាន៖</strong> ហៅកញ្ចក់អេក្រង់ iPad រូបវន្តថាជា "App"។</p>
            <p style="font-size: 0.88rem; color: #8ce68c; margin-top: 6px;"><strong>ការកែតម្រូវរបស់គ្រូ៖</strong> កញ្ចក់ និងថ្មរបស់ Tablet គឺជា <strong>ផ្នែករឹង (Hardware)</strong> (ដូចជារាងកាយ)។ Power App ដែលដំណើរការលើវា គឺជា <strong>ផ្នែកទន់ (Software)</strong> (ដូចជាសេចក្តីណែនាំ/គំនិត!)។</p>
          </div>

          <div class="comparison-card">
            <div class="card-icon-header">
              <span class="card-icon-circle" style="background: rgba(209, 52, 56, 0.2); color: #ff8e8e;">3</span>
              <h3>"ដំណើរការ គឺជាមន្តអាគម"</h3>
            </div>
            <p style="font-size: 0.88rem; color: #ff9e9e;"><strong>គំរូគំនិតខុសដែលអាចកើតមាន៖</strong> ជឿជាក់ថា App តភ្ជាប់ទៅទិន្នន័យដោយមន្តអាគម ដោយមិនចាំបាច់មានការណែនាំ។</p>
            <p style="font-size: 0.88rem; color: #8ce68c; margin-top: 6px;"><strong>ការកែតម្រូវរបស់គ្រូ៖</strong> នៅថ្ងៃទី ២ យើងនឹងឃើញថា ដំណើរការ គឺគ្រាន់តែជារូបមន្តនៃជំហានតាមលំដាប់លំដោយប៉ុណ្ណោះ។ គ្រប់ជំហានទាំងអស់ត្រូវតែតភ្ជាប់យ៉ាងច្បាស់លាស់!</p>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (៦៥:០០ - ៧០:០០):</strong></p>
        <p>"សូមកត់សម្គាល់អន្ទាក់ទី ២៖ ប្រសិនបើអ្នកធ្វើឲ្យ Tablet ធ្លាក់លើស៊ីម៉ងត៍បែកកញ្ចក់ តើអ្នកបានធ្វើឲ្យ Software ខូចដែរឬទេ? អត់ទេ! អ្នកគ្រាន់តែធ្វើឲ្យ Hardware ខូចប៉ុណ្ណោះ។ កម្មវិធី Power App របស់អ្នកមានសុវត្ថិភាពក្នុង Microsoft Cloud។ អ្នកអាចយក Tablet ថ្មីមួយមក Login ហើយ App របស់អ្នកនឹងបង្ហាញនៅទីនោះភ្លាម។"</p>
      `
    },

    'slide-18': {
      title: 'សំណួរត្រួតពិនិត្យចំណេះដឹង (៥ សំណួរ)',
      segment: 'ផ្នែកទី ៥៖ ការត្រួតពិនិត្យ & ការយល់ខុស (៦៥:០០ - ៧៥:០០)',
      content: `
        <div class="slide-header">
          <span class="section-tag purple-tag">ការផ្ទៀងផ្ទាត់អន្តរកម្ម</span>
          <h2 class="slide-title">សំណួរត្រួតពិនិត្យចំណេះដឹង ៥ សំណួរ</h2>
          <p class="slide-lead">ចុចលើជម្រើសរបស់អ្នកនៅលើអេក្រង់ដើម្បីសាកល្បងការយល់ដឹង។ ការពន្យល់នឹងបង្ហាញភ្លាមៗ៖</p>
        </div>

        <div class="quiz-widget-card">
          <div class="quiz-progress-bar-wrap">
            <span style="font-size: 0.82rem; color: var(--fluent-purple-light); font-weight: 700;">ការផ្ទៀងផ្ទាត់គោលគំនិត</span>
            <span style="font-size: 0.82rem; color: var(--text-muted);">ចុចលើជម្រើសមួយដើម្បីពិនិត្យ</span>
          </div>

          <div class="quiz-question-text">
            សំណួរទី ១៖ កម្មករចុចលើ "ម៉ាស៊ីនលេខ ៤ ឡើងកម្តៅខ្លាំង" លើអេក្រង់ Tablet។ តើការចុចម្រាមដៃនេះជាអ្វី?
          </div>

          <div class="quiz-options-list">
            <button class="quiz-option-btn" data-correct="false" data-explanation="មិនត្រឹមត្រូវទេ៖ ដំណើរការ គឺជាអ្វីដែលបន្ទះឈីបកុំព្យូទ័រធ្វើនៅផ្ទៃក្នុង បន្ទាប់ពីអ្នកប៉ះអេក្រង់រួច!">
              <span>ក) ដំណើរការ (The Process)</span>
            </button>
            <button class="quiz-option-btn" data-correct="true" data-explanation="✓ ត្រឹមត្រូវណាស់! រាល់សកម្មភាព ការជ្រើសរើស ឬទិន្នន័យដែលមនុស្សផ្តល់ចូលទៅក្នុងប្រព័ន្ធ គឺជា ធាតុចូល (INPUT)!">
              <span>ខ) ធាតុចូល (The Input)</span>
            </button>
            <button class="quiz-option-btn" data-correct="false" data-explanation="មិនត្រឹមត្រូវទេ៖ ធាតុចេញ គឺជាអ្វីដែលអេក្រង់បង្ហាញត្រឡប់មកកាន់ភ្នែករបស់មនុស្សវិញ!">
              <span>គ) ធាតុចេញ (The Output)</span>
            </button>
            <button class="quiz-option-btn" data-correct="false" data-explanation="មិនត្រឹមត្រូវទេ៖ ថ្មផ្តល់ថាមពលអគ្គិសនី ប៉ុន្តែការចុចម្រាមដៃគឺជា ធាតុចូល (Input)។">
              <span>ឃ) ថ្មផ្នែករឹង (The Hardware Battery)</span>
            </button>
          </div>

          <div class="quiz-feedback-box hidden" style="margin-top: 12px;"></div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (៧០:០០ - ៧៥:០០):</strong></p>
        <p>"សំណួរទី ១៖ តើការចុចម្រាមដៃជាអ្វី? (រង់ចាំថ្នាក់ឆ្លើយ៖ ធាតុចូល / Input!)។ ត្រឹមត្រូវ!"</p>
        <p>"សំណួរបន្ថែមសម្រាប់សួរផ្ទាល់មាត់ក្នុងថ្នាក់៖<br>
        Q2: តើមានអ្វីកើតឡើងប្រសិនបើកម្មករវាយលេខម៉ាស៊ីនខុសចូលក្នុង Tablet? (ជាងជួសជុលទៅខុសម៉ាស៊ីន — Garbage In, Garbage Out!)។<br>
        Q3: ហេតុអ្វីបានជាកុំព្យូទ័រមិនអាចដំណើរការទិន្នន័យដោយគ្មានធាតុចូលបាន? (ពីព្រោះកុំព្យូទ័រជាជំនួយការស្តាប់បង្គាប់ដែលរង់ចាំការបញ្ជា)។<br>
        Q4: តើតួយក្សអាលុយមីញ៉ូមរូបវន្តរបស់ Tablet ហៅថាអ្វី? (ផ្នែករឹង / Hardware!)។<br>
        Q5: តើអ្វីជាភាពខុសគ្នារវាងធាតុចេញ (Output) និងផលសម្រេច (Result)? (ធាតុចេញជាព័ត៌មានឌីជីថលលើអេក្រង់; ផលសម្រេចជាបញ្ហាជាក់ស្តែងក្នុងពិភពពិតដែលត្រូវបានដោះស្រាយ!)។"</p>
      `
    },

    'slide-19': {
      title: 'បញ្ហាប្រឈមចុងក្រោយ ១០ នាទី',
      segment: 'ផ្នែកទី ៦៖ បញ្ហាប្រឈមចុងក្រោយ (៧៥:០០ - ៨៥:០០)',
      content: `
        <div class="slide-header">
          <span class="section-tag yellow-tag">បញ្ហាប្រឈមចុងក្រោយ</span>
          <h2 class="slide-title">បញ្ហាប្រឈម ១០ នាទី៖ របាយការណ៍លេចប្រេងម៉ាស៊ីន</h2>
          <p class="slide-lead">បង្ហាញភាពស្ទាត់ជំនាញរបស់អ្នក ដោយបំបែកការខូចខាតម៉ាស៊ីនជាក់ស្តែងនេះទៅជាខ្សែចង្វាក់ ៥ ជំហាន៖</p>
        </div>

        <div class="comparison-grid">
          <div class="concept-card" style="border-left: 4px solid var(--fluent-yellow);">
            <div class="card-icon-header">
              <span class="card-icon-circle" style="background: rgba(255, 185, 0, 0.2); color: var(--fluent-yellow);">📋</span>
              <h3>ស្ថានភាពបញ្ហាប្រឈម</h3>
            </div>
            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5;">
              នៅម៉ោង ០៩:៣០ ព្រឹក កម្មករម្នាក់កត់សម្គាល់ឃើញដក់ប្រេងធារាសាស្ត្រហូរចេញពីក្រោមម៉ាស៊ីនចាក់ពុម្ពលេខ ២។ ប្រសិនបើប្រេងរីងអស់ ស្នប់បូមតម្លៃ $120,000 នឹងត្រូវឆេះខូចទាំងស្រុង។
            </p>
            <div style="background-color: var(--bg-card); border-radius: 6px; padding: 12px; margin-top: 10px; font-size: 0.88rem; color: #fff;">
              <strong>កិច្ចការរបស់អ្នក៖</strong> សរសេរចំណុចទាំង ៥ នេះលើក្រដាសកត់ត្រារបស់អ្នក៖<br>
              ១. <strong>បញ្ហា (Problem)៖</strong> ...<br>
              ២. <strong>ធាតុចូល (Input)៖</strong> ...<br>
              ៣. <strong>ដំណើរការ (Process)៖</strong> ...<br>
              ៤. <strong>ធាតុចេញ (Output)៖</strong> ...<br>
              ៥. <strong>ផលសម្រេច (Result)៖</strong> ...
            </div>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">⏱️</span>
              <h3>ពេលវេលា &amp; ការវាយតម្លៃ</h3>
            </div>
            <ul class="comparison-list">
              <li><strong>ពេលវេលាកំណត់៖</strong> ពិតប្រាកដ ១០ នាទី (៧៥:០០ – ៨៥:០០)។</li>
              <li><strong>ច្បាប់៖</strong> ប្រើតែភាសាសាមញ្ញប៉ុណ្ណោះ។ មិនចាំបាច់ប្រើពាក្យបច្ចេកទេសសរសេរកូដឡើយ។</li>
              <li><strong>ស្តង់ដារជោគជ័យ៖</strong> ការពន្យល់របស់អ្នកត្រូវតែបង្ហាញពីបុព្វហេតុ និងផលយ៉ាងច្បាស់ ចាប់ពីដក់ប្រេងហូរ រហូតដល់ស្នប់បូមត្រូវបានសង្គ្រោះ!</li>
            </ul>
            <div style="margin-top: 14px;">
              <button class="btn-primary-nav btn-reveal-solution" style="padding: 8px 18px; font-size: 0.85rem;">
                👁️ បង្ហាញចម្លើយគំរូ &amp; តារាងវាយតម្លៃ
              </button>
            </div>
          </div>
        </div>

        <div class="challenge-solution-card hidden" style="margin-top: 14px; padding: 14px; background: rgba(0, 130, 114, 0.15); border: 1px solid var(--fluent-teal); border-radius: 6px;">
          <strong style="color: #3be4cb;">ដំណោះស្រាយគំរូកម្រិតស្តង់ដារ៖</strong>
          <p style="font-size: 0.86rem; color: #fff; margin-top: 6px;">
            ១. <strong>បញ្ហា (Problem)៖</strong> ការលេចធ្លាយប្រេងធារាសាស្ត្រលើម៉ាស៊ីនលេខ ២ ដែលប្រឈមនឹងការឆេះខូចស្នប់បូមតម្លៃ $120k។<br>
            ២. <strong>ធាតុចូល (Input)៖</strong> កម្មករជ្រើសរើស "ម៉ាស៊ីនលេខ ២", បញ្ហា "លេចប្រេង", កម្រិតបន្ទាន់ "ខ្ពស់", រួចចុច Submit។<br>
            ៣. <strong>ដំណើរការ (Process)៖</strong> App កត់ត្រាសំបុត្រ #SR-104, រក្សាទុកម៉ោង ០៩:៣០ ព្រឹក, និងរោទ៍សារអាសន្ន។<br>
            ៤. <strong>ធាតុចេញ (Output)៖</strong> អេក្រង់បង្ហាញសារបញ្ជាក់ពណ៌បៃតង; ទូរស័ព្ទជាងបន្លឺសំឡេងរោទ៍ជូនដំណឹង។<br>
            ៥. <strong>ផលសម្រេច (Result)៖</strong> ជាងជួសជុលរឹតបន្តឹងតំណភ្ជាប់ទុយោប្រេង; ស្នប់បូមត្រូវបានសង្គ្រោះ; រោងចក្រមិនខាតពេលសូម្បី ១ នាទី!
          </p>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (៧៥:០០ - ៨២:០០):</strong></p>
        <p>"អ្នកមានពេល ១០ នាទី។ ធ្វើការរៀងៗខ្លួន ឬជាគូ។ សរសេរដំណាក់កាលទាំង ៥ របស់អ្នកឲ្យច្បាស់។ សូមចងចាំ៖ បុព្វហេតុ និងផលត្រូវតែហូរចាប់ពីការលេចប្រេង រហូតដល់ស្នប់បូមត្រូវបានសង្គ្រោះ!"</p>
      `
    },

    'slide-20': {
      title: 'តារាងវាយតម្លៃសមត្ថភាព ៤ កម្រិត',
      segment: 'ផ្នែកទី ៦៖ បញ្ហាប្រឈមចុងក្រោយ (៧៥:០០ - ៨៥:០០)',
      content: `
        <div class="slide-header">
          <span class="section-tag green-tag">តារាងវាយតម្លៃ</span>
          <h2 class="slide-title">តារាងវាយតម្លៃសមត្ថភាព ៤ កម្រិតនៃបញ្ហាប្រឈម</h2>
          <p class="slide-lead">របៀបវាយតម្លៃភាពស្ទាត់ជំនាញរបស់សិស្សលើខ្សែចង្វាក់បុព្វហេតុពីបញ្ហារហូតដល់ផលសម្រេច៖</p>
        </div>

        <div class="rubric-grid">
          <div class="rubric-card level-4">
            <span class="rubric-level-badge" style="color: var(--fluent-green);">កម្រិត ៤៖ ស្ទាត់ជំនាញឥតខ្ចោះ (៥/៥)</span>
            <strong>ខ្សែចង្វាក់បុព្វហេតុឥតខ្ចោះ</strong>
            <p style="font-size: 0.8rem; color: var(--text-secondary);">
              បង្ហាញជំហានទាំង ៥ យ៉ាងច្បាស់លាស់។ ញែកធាតុចេញ Output (សារបញ្ជាក់លើអេក្រង់) ចេញពីផលសម្រេច Result (ស្នប់បូមត្រូវបានសង្គ្រោះ) ដោយគ្មានការច្រឡំទាល់តែសោះ។
            </p>
          </div>

          <div class="rubric-card level-3">
            <span class="rubric-level-badge" style="color: var(--fluent-blue);">កម្រិត ៣៖ កម្រិតជំនាញល្អ (៤/៥)</span>
            <strong>ការយល់ដឹងអំពីប្រតិបត្តិការរឹងមាំ</strong>
            <p style="font-size: 0.8rem; color: var(--text-secondary);">
              យល់ច្បាស់ពី បញ្ហា, ធាតុចូល, ដំណើរការ, និងធាតុចេញ។ អាចមានការច្រឡំបន្តិចបន្តួចរវាងធាតុចេញ និងផលសម្រេច។ ត្រៀមខ្លួនរួចរាល់សម្រាប់ថ្ងៃទី ២។
            </p>
          </div>

          <div class="rubric-card level-2">
            <span class="rubric-level-badge" style="color: var(--fluent-yellow);">កម្រិត ២៖ កំពុងអភិវឌ្ឍ (៣/៥)</span>
            <strong>ត្រូវការបំភ្លឺបន្ថែមលើដំណើរការ</strong>
            <p style="font-size: 0.8rem; color: var(--text-secondary);">
              ច្រឡំធាតុចូលជាមួយដំណើរការ (ឧ. គិតថាកុំព្យូទ័រជាអ្នកវាយបញ្ចូលទិន្នន័យ)។ ត្រូវរំលឹកឡើងវិញនូវឧទាហរណ៍ម៉ាស៊ីនលក់ភេសជ្ជៈ។
            </p>
          </div>

          <div class="rubric-card level-1">
            <span class="rubric-level-badge" style="color: var(--fluent-red);">កម្រិត ១៖ អ្នកចាប់ផ្តើមថ្មី (&lt;៣/៥)</span>
            <strong>ត្រូវការការបណ្តុះបណ្តាលឡើងវិញ</strong>
            <p style="font-size: 0.8rem; color: var(--text-secondary);">
              មើលឃើញ App ជាប្រអប់មន្តអាគម ដោយមិនយល់ពីការធ្វើអន្តរកម្មរបស់អ្នកប្រើប្រាស់។ ត្រូវការរំលឹកឡើងវិញនូវគោលគំនិតមីក្រូវ៉េវ និង IPO។
            </p>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (៨២:០០ - ៨៥:០០):</strong></p>
        <p>"ដាក់ពិន្ទុលើក្រដាសរបស់អ្នកធៀបនឹងតារាងនេះ។ ប្រសិនបើអ្នកបានញែកដាច់រវាងធាតុចេញឌីជីថល (ផ្ទាំងបៃតងលើអេក្រង់) ចេញពីផលសម្រេចរូបវន្ត (ស្នប់បូមត្រូវបានសង្គ្រោះ) អ្នកទទួលបានកម្រិត ៤ ស្ទាត់ជំនាញឥតខ្ចោះ!"</p>
      `
    },

    'slide-21': {
      title: 'ផែនទីតភ្ជាប់ (មុននេះ -> ថ្ងៃនេះ -> បន្ទាប់)',
      segment: 'ផ្នែកទី ៧៖ សង្ខេប & ការតភ្ជាប់ទៅមុខ (៨៥:០០ - ៩០:០០)',
      content: `
        <div class="slide-header">
          <span class="section-tag purple-tag">ស្ពានចម្លងកម្មវិធីសិក្សា</span>
          <h2 class="slide-title">ផែនទីតភ្ជាប់៖ មុននេះ &rarr; ថ្ងៃនេះ &rarr; បន្ទាប់</h2>
          <p class="slide-lead">របៀបដែលថ្ងៃនេះតភ្ជាប់ត្រឡប់ទៅក្រោយ និងត្រួសត្រាយផ្លូវឆ្ពោះទៅកាន់ថ្ងៃទី ២៖</p>
        </div>

        <div class="title-feature-grid">
          <div class="feature-card" style="border-top: 3px solid var(--text-muted);">
            <div class="feature-icon-badge" style="background: rgba(255,255,255,0.08); color: var(--text-muted);">មុននេះ</div>
            <h4>មុនថ្ងៃនេះ</h4>
            <p><strong>ចំណុចចាប់ផ្តើម៖</strong> មិនមានចំណេះដឹងផ្នែកអភិវឌ្ឍន៍ Software ពីមុនមក។ មើលបច្ចេកវិទ្យាជាប្រធានបទដាច់ដោយឡែក។</p>
          </div>

          <div class="feature-card" style="border-top: 3px solid var(--fluent-green);">
            <div class="feature-icon-badge" style="background: rgba(16,124,16,0.2); color: #8ce68c;">ថ្ងៃនេះ</div>
            <h4>គោលគំនិតថ្ងៃទី ១</h4>
            <p><strong>ខ្សែចង្វាក់ បញ្ហា &rarr; ផលសម្រេច៖</strong> កម្មវិធីកើតឡើងដើម្បីរុញបញ្ហារបស់មនុស្សឆ្ពោះទៅរកផលសម្រេចមានប្រយោជន៍ តាមរយៈ ធាតុចូល, ដំណើរការ, និង ធាតុចេញ។</p>
          </div>

          <div class="feature-card" style="border-top: 3px solid var(--fluent-blue);">
            <div class="feature-icon-badge blue-glow">បន្ទាប់</div>
            <h4>ស្ពានចម្លងថ្ងៃទី ២</h4>
            <p><strong>សេចក្តីណែនាំ &amp; លំដាប់លំដោយ៖</strong> កុំព្យូទ័រគឺខ្វាក់ភ្នែក និងស្តាប់បង្គាប់។ វាត្រូវការសេចក្តីណែនាំមួយជំហានម្តងៗតាមលំដាប់លំដោយយ៉ាងម៉ឺងម៉ាត់!</p>
          </div>
        </div>

        <div class="memory-hook-banner" style="margin-top: 18px;">
          <strong>ស្ពានចម្លងទៅមុខ៖</strong> នៅថ្ងៃស្អែក យើងនឹងសួរថា៖ <em>"តើកុំព្យូទ័រដំណើរការជំហានទាំងនោះដោយរបៀបណាដោយមិនមានការខុសឆ្គង?"</em> ចម្លើយនោះគឺ លំដាប់លំដោយ (SEQUENCE)!
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (៨៥:០០ - ៨៧:០០):</strong></p>
        <p>"មើលស្ពានចម្លងទៅមុខ។ ថ្ងៃនេះអ្នកបានរៀនថាដំណើរការកើតឡើងនៅចន្លោះធាតុចូល និងធាតុចេញ។ ប៉ុន្តែតើកុំព្យូទ័រដឹងថាត្រូវដំណើរការអ្វីដោយរបៀបណា? កុំព្យូទ័រមិនអាចទាយដឹងចិត្តយើងទេ! ថ្ងៃស្អែកក្នុងថ្ងៃទី ២ យើងនឹងរៀនអំពីសេចក្តីណែនាំ និងលំដាប់លំដោយ — ការផ្តល់ជំហានតាមលំដាប់លំដោយដល់ម៉ាស៊ីនដែលខ្វាក់ភ្នែក។"</p>
      `
    },

    'slide-22': {
      title: 'កិច្ចការផ្ទះជាក់ស្តែង ១៥ នាទី',
      segment: 'ផ្នែកទី ៧៖ សង្ខេប & ការតភ្ជាប់ទៅមុខ (៨៥:០០ - ៩០:០០)',
      content: `
        <div class="slide-header">
          <span class="section-tag teal-tag">កិច្ចការផ្ទះអនុវត្ត</span>
          <h2 class="slide-title">កិច្ចការផ្ទះ ១៥ នាទី៖ «អ្នកតាមដានបញ្ហានៅកន្លែងធ្វើការ»</h2>
          <p class="slide-lead">កិច្ចការរហ័ស មិនបាច់សរសេរកូដ ដើម្បីរៀបចំខួរក្បាលរបស់អ្នកសម្រាប់ថ្ងៃទី ២៖</p>
        </div>

        <div class="comparison-grid">
          <div class="concept-card" style="border-left: 4px solid var(--fluent-blue);">
            <div class="card-icon-header">
              <span class="card-icon-circle blue-icon">📝</span>
              <h3>កិច្ចការដែលត្រូវធ្វើ</h3>
            </div>
            <p style="font-size: 0.92rem; line-height: 1.5; color: var(--text-secondary); margin-bottom: 12px;">
              ស្វែងរក <strong>បញ្ហា ឬការរំខានពិតប្រាកដ ១</strong> នៅក្នុងផ្នែករបស់អ្នក ឬនៅផ្ទះ (ឧ. បាត់កូនសោ, បាត់ឧបករណ៍, ក្រដាសសុំច្បាប់សម្រាក, ក្រដាសម៉ាស៊ីនព្រីនអស់)។
            </p>
            <ul class="comparison-list">
              <li>សរសេរ៖ <strong>តើអ្វីជាបញ្ហាពិតប្រាកដ? (Real Problem)</strong></li>
              <li>សរសេរ៖ <strong>តើធាតុចូលអ្វីខ្លះដែលអ្នកប្រើប្រាស់អាចផ្តល់ឲ្យ? (Input)</strong></li>
              <li>សរសេរ៖ <strong>តើអ្វីជាផលសម្រេចមានប្រយោជន៍ដែលអ្នកប្រាថ្នាចង់បាន? (Useful Result)</strong></li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">⏱️</span>
              <h3>ការប្រគល់ &amp; ពេលវេលា</h3>
            </div>
            <ul class="comparison-list">
              <li><strong>រយៈពេលអតិបរមា៖</strong> ត្រឹមតែ ១៥ នាទី ឬតិចជាងនេះ។</li>
              <li><strong>ទម្រង់៖</strong> សរសេរប៊ិចលើក្រដាសស្អិត Sticky Note ឬកត់ត្រាក្នុងទូរស័ព្ទ។</li>
              <li><strong>គោលដៅ៖</strong> បង្វឹកខួរក្បាលរបស់អ្នកឲ្យមើលឃើញឱកាសបង្កើត Software ក្នុងឧបសគ្គប្រចាំថ្ងៃ។</li>
              <li><strong>ស្ពានទៅថ្ងៃទី ២៖</strong> យើងនឹងយកបញ្ហាដែលអ្នកបានសរសេរ មកប្រើក្នុងលំហាត់លំដាប់លំដោយនៅព្រឹកស្អែក!</li>
            </ul>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (៨៧:០០ - ៨៨:៣០):</strong></p>
        <p>"នេះជាកិច្ចការផ្ទះ ១៥ នាទីរបស់អ្នក៖ ស្វែងរកការរំខានពិតប្រាកដ ១ នៅតុធ្វើការ ឬនៅផ្ទះ។ សរសេរបញ្ហា ធាតុចូល និងផលសម្រេចដែលចង់បានលើក្រដាសស្អិត Sticky Note។ យកវាមកជាមួយអ្នកនៅព្រឹកស្អែក!"</p>
      `
    },

    'slide-23': {
      title: 'សេចក្តីសង្ខេប ១ ទំព័រ & សទ្ទានុក្រមទ្វេភាសា',
      segment: 'ផ្នែកទី ៧៖ សង្ខេប & ការតភ្ជាប់ទៅមុខ (៨៥:០០ - ៩០:០០)',
      content: `
        <div class="slide-header">
          <span class="section-tag green-tag">សង្ខេបថ្ងៃទី ១</span>
          <h2 class="slide-title">សេចក្តីសង្ខេប ១ ទំព័រ &amp; សទ្ទានុក្រមទ្វេភាសា</h2>
          <p class="slide-lead">រក្សាពាក្យគន្លឹះគ្រឹះទាំងនេះឲ្យស្រស់បំព្រងទាំងភាសាអង់គ្លេស និងភាសាខ្មែរ៖</p>
        </div>

        <div class="dataset-preview-table-card" style="margin: 12px 0;">
          <table class="dataset-table">
            <thead>
              <tr>
                <th>ពាក្យអង់គ្លេស</th>
                <th>ភាសាខ្មែរ (Khmer)</th>
                <th>ការពន្យល់សាមញ្ញ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Problem</strong></td>
                <td>បញ្ហាជាក់ស្តែង (Problem)</td>
                <td>ឧបសគ្គ ឬការឈឺចាប់ក្នុងពិភពពិតរបស់មនុស្សដែលត្រូវការដោះស្រាយ។</td>
              </tr>
              <tr>
                <td><strong>Input</strong></td>
                <td>ធាតុចូល / ការបញ្ចូល (Input)</td>
                <td>ទិន្នន័យឆៅ លេខ ឬការចុចប៊ូតុងដែលមនុស្សផ្តល់ឲ្យម៉ាស៊ីន។</td>
              </tr>
              <tr>
                <td><strong>Process</strong></td>
                <td>ដំណើរការផ្ទៃក្នុង (Process)</td>
                <td>ការគណនា និងការត្រួតពិនិត្យច្បាប់ដោយស្ងាត់ៗក្នុងបន្ទះឈីប។</td>
              </tr>
              <tr>
                <td><strong>Output</strong></td>
                <td>ធាតុចេញឌីជីថល (Output)</td>
                <td>សារ សំឡេង ឬការបញ្ជាក់ដែលបង្ហាញលើអេក្រង់។</td>
              </tr>
              <tr>
                <td><strong>Result</strong></td>
                <td>ផលសម្រេចចុងក្រោយ (Result)</td>
                <td>ការកែលម្អក្នុងជីវិតពិតដែលដោះស្រាយបញ្ហាដើមបានជោគជ័យ!</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (៨៨:៣០ - ៨៩:៣០):</strong></p>
        <p>"ពិនិត្យតារាងទ្វេភាសារបស់យើង។ ទោះបីជាអ្នកពន្យល់ជាភាសាអង់គ្លេស ឬភាសាខ្មែរ ការពិតសកលនៃកុំព្យូទ័រគឺដូចគ្នាបេះបិទ៖ បញ្ហា &rarr; ធាតុចូល &rarr; ដំណើរការ &rarr; ធាតុចេញ &rarr; ផលសម្រេច។"</p>
      `
    },

    'slide-24': {
      title: 'ទិដ្ឋភាពថ្ងៃទី ២៖ សេចក្តីណែនាំ & លំដាប់លំដោយ',
      segment: 'ផ្នែកទី ៧៖ សង្ខេប & ការតភ្ជាប់ទៅមុខ (៨៥:០០ - ៩០:០០)',
      content: `
        <div class="slide-header">
          <span class="section-tag purple-tag">ត្រៀមសម្រាប់ថ្ងៃស្អែក</span>
          <h2 class="slide-title">សូមអបអរសាទរ! អ្នកបានយកឈ្នះថ្ងៃទី ១ រួចរាល់ហើយ</h2>
          <p class="slide-lead">នេះជាអ្វីដែលកំពុងរង់ចាំអ្នកនៅព្រឹកស្អែកក្នុងថ្ងៃទី ២៖</p>
        </div>

        <div class="comparison-grid">
          <div class="concept-card" style="border-left: 4px solid var(--fluent-green);">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">🎉</span>
              <h3>អ្នកលែងជាអ្នកមិនដឹងអីសូន្យទៀតហើយ</h3>
            </div>
            <p style="font-size: 0.95rem; color: #fff; line-height: 1.5;">
              ឥឡូវនេះអ្នកបានយល់ច្បាស់ពីការពិតគ្រឹះនៃស្ថាបត្យកម្ម Software៖
            </p>
            <ul class="comparison-list" style="margin-top: 8px;">
              <li>អ្នកអាចកំណត់បញ្ហា និងញែកវាចេញពីផលសម្រេចបានយ៉ាងច្បាស់។</li>
              <li>អ្នកអាចបំបែកគ្រប់កិច្ចការទៅជា ធាតុចូល &rarr; ដំណើរការ &rarr; ធាតុចេញ។</li>
              <li>អ្នកមើលឃើញពីរបៀបដែលបញ្ជរស្នើសុំជំនួយក្នុងរោងចក្ររបស់យើងនឹងវិវឌ្ឍមួយជំហានម្តងៗ!</li>
            </ul>
          </div>

          <div class="concept-card" style="border-left: 4px solid var(--fluent-blue);">
            <div class="card-icon-header">
              <span class="card-icon-circle blue-icon">🚀</span>
              <h3>ថ្ងៃស្អែកក្នុងថ្ងៃទី ២៖ 'សេចក្តីណែនាំ និងលំដាប់លំដោយ'</h3>
            </div>
            <p style="font-size: 0.95rem; color: #fff; line-height: 1.5;">
              <strong>មូលហេតុដែលលំដាប់លំដោយជាអ្វីៗគ្រប់យ៉ាងក្នុង Software៖</strong>
            </p>
            <ul class="comparison-list" style="margin-top: 8px;">
              <li>ហេតុអ្វីបានជាកុំព្យូទ័រមិនអាចទាយដឹងអ្វីដែលអ្នកចង់បាន។</li>
              <li>សញ្ញា Semicolon (<code>;</code>) សម្រាប់តភ្ជាប់ពាក្យបញ្ជាក្នុង Power Apps។</li>
              <li>នីតិវិធីចាប់ផ្តើមម៉ាស៊ីនដោយសុវត្ថិភាព៖ ត្រូវត្រួតពិនិត្យ <em>មុនពេល</em> បញ្ជាឲ្យម៉ាស៊ីនដំណើរការ!</li>
            </ul>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (៨៩:៣០ - ៩០:០០):</strong></p>
        <p>"សូមអបអរសាទរចំពោះអ្នកទាំងអស់គ្នា! អ្នកបានយកឈ្នះថ្ងៃទី ១ ជាផ្លូវការហើយ។ ឥឡូវនេះអ្នកកំពុងគិតដូចជាស្ថាបត្យករប្រព័ន្ធ។ ជួបគ្នានៅព្រឹកស្អែកសម្រាប់ថ្ងៃទី ២៖ សេចក្តីណែនាំ និងលំដាប់លំដោយ (Instructions & Sequence)!"</p>
      `
    }
  };

  // --------------------------------------------------------------------------
  // Initialization
  // --------------------------------------------------------------------------
  function initPresentationEngine() {
    slides = Array.from(document.querySelectorAll('.slide'));
    totalSlides = slides.length;

    // Cache original English slide contents, titles, and notes
    slides.forEach(slide => {
      const contentEl = slide.querySelector('.slide-content');
      const notesEl = slide.querySelector('.slide-notes-content');
      slideOriginals[slide.id] = {
        title: slide.getAttribute('data-title') || '',
        segment: slide.getAttribute('data-segment') || '',
        content: contentEl ? contentEl.innerHTML : '',
        notes: notesEl ? notesEl.innerHTML : (slide.getAttribute('data-notes') || '')
      };
    });

    const totalCountElem = document.getElementById('slide-total-num');
    if (totalCountElem) totalCountElem.textContent = String(totalSlides);

    // Event Bindings
    bindNavigationEvents();
    bindTimerControls();
    bindPresenterNotes();
    bindOverviewModal();
    bindLanguageToggle();

    // Day 1 Interactive Features
    bindInteractiveKiosk();
    bindQuizInteractions();
    bindRevealInteractions();

    // Setup slide-level pre-rendered notes
    prepareSlideNotesDOM();

    // Check previously saved language state
    try {
      const savedLang = localStorage.getItem('powerapps_presentation_lang');
      if (savedLang === 'km') {
        toggleLanguage(true);
      } else {
        goToSlide(0);
      }
    } catch (e) {
      goToSlide(0);
    }

    console.log(`[Day 1 Engine] Initialized presentation with ${totalSlides} slides.`);
  }

  // --------------------------------------------------------------------------
  // Slide-Level Notes Translation Enhancement
  // --------------------------------------------------------------------------
  function prepareSlideNotesDOM() {
    slides.forEach(slide => {
      let notesContainer = slide.querySelector('.slide-notes-content');
      if (!notesContainer) {
        const rawNotes = slide.getAttribute('data-notes');
        if (rawNotes) {
          notesContainer = document.createElement('div');
          notesContainer.className = 'slide-notes-content';
          notesContainer.style.display = 'none';
          notesContainer.innerHTML = rawNotes
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .map(line => `<p>${line}</p>`)
            .join('');
          slide.appendChild(notesContainer);
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // Slide Navigation
  // --------------------------------------------------------------------------
  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    currentSlideIndex = index;

    slides.forEach((slide, idx) => {
      slide.classList.remove('active', 'slide-prev', 'slide-next');
      if (idx === currentSlideIndex) {
        slide.classList.add('active');
      } else if (idx < currentSlideIndex) {
        slide.classList.add('slide-prev');
      } else {
        slide.classList.add('slide-next');
      }
    });

    const activeSlide = slides[currentSlideIndex];

    // Header Updates based on active language
    const currentId = activeSlide.id;
    let slideTitle = '';
    let segmentName = '';

    if (isKhmerActive && KHMER_SLIDES[currentId]) {
      slideTitle = KHMER_SLIDES[currentId].title;
      segmentName = KHMER_SLIDES[currentId].segment;
    } else {
      slideTitle = slideOriginals[currentId]?.title || activeSlide.getAttribute('data-title') || `Slide ${currentSlideIndex + 1}`;
      segmentName = slideOriginals[currentId]?.segment || activeSlide.getAttribute('data-segment') || 'Power Apps Foundation';
    }

    const headerTitleElem = document.getElementById('current-slide-title');
    if (headerTitleElem) headerTitleElem.textContent = slideTitle;

    const segmentBadgeElem = document.getElementById('current-segment-name');
    if (segmentBadgeElem) segmentBadgeElem.textContent = segmentName;

    // Footer Counter
    const currentNumElem = document.getElementById('slide-current-num');
    if (currentNumElem) currentNumElem.textContent = String(currentSlideIndex + 1);

    // Progress Scrub Bar
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
      const percentage = ((currentSlideIndex + 1) / totalSlides) * 100;
      progressBar.style.width = `${percentage}%`;
    }

    // Sync Presenter Notes
    updatePresenterNotesContent(activeSlide);
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

  function bindNavigationEvents() {
    document.getElementById('btn-next')?.addEventListener('click', nextSlide);
    document.getElementById('btn-prev')?.addEventListener('click', prevSlide);
    document.getElementById('btn-restart')?.addEventListener('click', () => goToSlide(0));

    // Progress Track Scrub
    const progressTrack = document.getElementById('progress-track');
    progressTrack?.addEventListener('click', (e) => {
      const rect = progressTrack.getBoundingClientRect();
      const clickRatio = (e.clientX - rect.left) / rect.width;
      const targetSlide = Math.min(Math.floor(clickRatio * totalSlides), totalSlides - 1);
      goToSlide(targetSlide);
    });

    // Fullscreen Toggle
    document.getElementById('btn-fullscreen')?.addEventListener('click', toggleFullscreen);

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      switch (e.code) {
        case 'ArrowRight':
        case 'Space':
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
        case 'KeyF':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'KeyN':
          e.preventDefault();
          togglePresenterNotes();
          break;
        case 'KeyO':
          e.preventDefault();
          toggleOverviewModal();
          break;
        case 'KeyR':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'KeyL':
          e.preventDefault();
          toggleLanguage();
          break;
      }
    });
  }

  // --------------------------------------------------------------------------
  // Presenter Notes Toggle
  // --------------------------------------------------------------------------
  function togglePresenterNotes(forceState) {
    const notesPanel = document.getElementById('presenter-notes-panel');
    const notesBtn = document.getElementById('btn-notes');
    const floatingTab = document.getElementById('notes-floating-tab');
    if (!notesPanel) return;

    const isCurrentlyOpen = notesPanel.classList.contains('open');
    const shouldOpen = (typeof forceState === 'boolean') ? forceState : !isCurrentlyOpen;

    if (shouldOpen) {
      notesPanel.classList.add('open');
      notesBtn?.classList.add('active-notes');
      if (floatingTab) {
        const text = floatingTab.querySelector('.tab-text');
        if (text) text.textContent = isKhmerActive ? 'បិទកំណត់សម្គាល់' : 'Hide Notes';
      }
      isNotesOpen = true;
    } else {
      notesPanel.classList.remove('open');
      notesBtn?.classList.remove('active-notes');
      if (floatingTab) {
        const text = floatingTab.querySelector('.tab-text');
        if (text) text.textContent = isKhmerActive ? 'កំណត់សម្គាល់' : 'Notes';
      }
      isNotesOpen = false;
    }
  }

  window.togglePresenterNotes = togglePresenterNotes;

  function updatePresenterNotesContent(slideElement) {
    const notesContentElem = document.getElementById('notes-content');
    const notesSegmentElem = document.getElementById('notes-segment-label');
    if (!notesContentElem) return;

    const currentId = slideElement.id;

    if (isKhmerActive) {
      if (notesSegmentElem) {
        notesSegmentElem.textContent = KHMER_SLIDES[currentId]?.segment || 'ផ្នែកទី ១';
      }
      if (KHMER_SLIDES[currentId]?.notes) {
        notesContentElem.innerHTML = KHMER_SLIDES[currentId].notes;
        return;
      }
    } else {
      const segment = slideOriginals[currentId]?.segment || slideElement.getAttribute('data-segment') || 'Part 1';
      if (notesSegmentElem) notesSegmentElem.textContent = segment;
    }

    const inDomNotes = slideElement.querySelector('.slide-notes-content');
    if (inDomNotes && inDomNotes.innerHTML.trim().length > 0) {
      notesContentElem.innerHTML = inDomNotes.innerHTML;
    } else {
      const rawNotes = slideOriginals[currentId]?.notes || slideElement.getAttribute('data-notes') || 'No trainer speaking script recorded for this slide.';
      notesContentElem.innerHTML = rawNotes
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => `<p>${line}</p>`)
        .join('');
    }
  }

  function bindPresenterNotes() {
    document.getElementById('btn-notes')?.addEventListener('click', () => togglePresenterNotes());
    document.getElementById('notes-close-btn')?.addEventListener('click', () => togglePresenterNotes(false));
    document.getElementById('notes-floating-tab')?.addEventListener('click', () => togglePresenterNotes());
  }

  // --------------------------------------------------------------------------
  // Overview Modal
  // --------------------------------------------------------------------------
  function toggleOverviewModal() {
    const modal = document.getElementById('overview-modal');
    if (!modal) return;

    if (modal.classList.contains('hidden')) {
      buildOverviewGrid();
      modal.classList.remove('hidden');
    } else {
      modal.classList.add('hidden');
    }
  }

  function buildOverviewGrid() {
    const container = document.getElementById('overview-grid-container');
    if (!container) return;

    container.innerHTML = '';
    slides.forEach((slide, index) => {
      const currentId = slide.id;
      let title = '';
      if (isKhmerActive && KHMER_SLIDES[currentId]) {
        title = KHMER_SLIDES[currentId].title;
      } else {
        title = slideOriginals[currentId]?.title || slide.getAttribute('data-title') || `Slide ${index + 1}`;
      }

      const thumb = document.createElement('div');
      thumb.className = `overview-thumbnail ${index === currentSlideIndex ? 'active-thumb' : ''}`;
      thumb.innerHTML = `
        <span class="thumb-num">${isKhmerActive ? 'ស្លាយ ' + (index + 1) : 'SLIDE ' + (index + 1)}</span>
        <span class="thumb-title">${title}</span>
      `;
      thumb.addEventListener('click', () => {
        goToSlide(index);
        toggleOverviewModal();
      });
      container.appendChild(thumb);
    });
  }

  function bindOverviewModal() {
    document.getElementById('btn-overview')?.addEventListener('click', toggleOverviewModal);
    document.getElementById('overview-close-btn')?.addEventListener('click', toggleOverviewModal);
  }

  // --------------------------------------------------------------------------
  // Activity Timer (90 Minutes)
  // --------------------------------------------------------------------------
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function updateTimerDisplay() {
    const display = document.getElementById('session-timer');
    if (display) display.textContent = formatTime(timerSecondsElapsed);
  }

  function toggleTimer() {
    if (isTimerRunning) {
      clearInterval(timerInterval);
      isTimerRunning = false;
      updateTimerButtonIcon(false);
    } else {
      timerInterval = setInterval(() => {
        if (timerSecondsElapsed < TOTAL_SESSION_SECONDS) {
          timerSecondsElapsed++;
          updateTimerDisplay();
        } else {
          clearInterval(timerInterval);
          isTimerRunning = false;
          updateTimerButtonIcon(false);
        }
      }, 1000);
      isTimerRunning = true;
      updateTimerButtonIcon(true);
    }
  }

  function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    timerSecondsElapsed = 0;
    updateTimerDisplay();
    updateTimerButtonIcon(false);
  }

  function updateTimerButtonIcon(running) {
    const icon = document.getElementById('timer-icon');
    if (!icon) return;
    if (running) {
      icon.innerHTML = '<path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>';
    } else {
      icon.innerHTML = '<path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>';
    }
  }

  function bindTimerControls() {
    document.getElementById('timer-toggle-btn')?.addEventListener('click', toggleTimer);
    document.getElementById('timer-reset-btn')?.addEventListener('click', resetTimer);
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }

  // --------------------------------------------------------------------------
  // Instant Smooth Bilingual Translation Engine
  // --------------------------------------------------------------------------
  function toggleLanguage(forceLang) {
    if (typeof forceLang === 'boolean') {
      isKhmerActive = forceLang;
    } else {
      isKhmerActive = !isKhmerActive;
    }

    try {
      localStorage.setItem('powerapps_presentation_lang', isKhmerActive ? 'km' : 'en');
    } catch (e) {}

    // Subtle gentle cross-fade for seamless visual transition
    const stage = document.getElementById('stage') || document.querySelector('.stage');
    if (stage) stage.style.opacity = '0.5';

    setTimeout(() => {
      applyLanguageState();
      if (stage) stage.style.opacity = '1';
    }, 120);
  }

  function applyLanguageState() {
    const langBtnText = document.getElementById('lang-btn-text');
    const courseTag = document.querySelector('.course-tag');
    const btnPrevSpan = document.querySelector('#btn-prev span');
    const btnNextSpan = document.querySelector('#btn-next span');
    const btnNotesSpan = document.querySelector('#btn-notes span:last-child');
    const btnOverviewSpan = document.querySelector('#btn-overview span');
    const notesBadge = document.querySelector('.notes-badge');
    const shortcutHint = document.querySelector('.shortcut-hint-text');
    const floatingTab = document.getElementById('notes-floating-tab');

    if (isKhmerActive) {
      document.body.classList.add('khmer-mode');
      if (langBtnText) langBtnText.textContent = '🇬🇧 English';
      if (courseTag) courseTag.textContent = 'មូលដ្ឋានគ្រឹះ Power Apps • ថ្ងៃទី ១';
      if (btnPrevSpan) btnPrevSpan.textContent = 'ថយក្រោយ';
      if (btnNextSpan) btnNextSpan.textContent = 'បន្ទាប់';
      if (btnNotesSpan) btnNotesSpan.textContent = 'កំណត់សម្គាល់';
      if (btnOverviewSpan) btnOverviewSpan.textContent = 'ទិដ្ឋភាពរួម';
      if (notesBadge) notesBadge.textContent = '🎓 ការណែនាំ និងកំណត់សម្គាល់សម្រាប់គ្រូ';
      if (shortcutHint) shortcutHint.textContent = 'Space / ◀ ▶ ដើម្បីប្តូរស្លាយ';
      if (floatingTab) {
        const text = floatingTab.querySelector('.tab-text');
        if (text) text.textContent = isNotesOpen ? 'បិទកំណត់សម្គាល់' : 'កំណត់សម្គាល់';
      }

      // Swap In-DOM Content for each slide
      slides.forEach(slide => {
        const id = slide.id;
        const contentContainer = slide.querySelector('.slide-content');
        if (KHMER_SLIDES[id] && contentContainer) {
          contentContainer.innerHTML = KHMER_SLIDES[id].content;
        }
      });

    } else {
      document.body.classList.remove('khmer-mode');
      if (langBtnText) langBtnText.textContent = '🇰🇭 ខ្មែរ (Khmer)';
      if (courseTag) courseTag.textContent = 'Power Apps Foundation • Day 1';
      if (btnPrevSpan) btnPrevSpan.textContent = 'Prev';
      if (btnNextSpan) btnNextSpan.textContent = 'Next';
      if (btnNotesSpan) btnNotesSpan.textContent = 'Trainer Notes';
      if (btnOverviewSpan) btnOverviewSpan.textContent = 'Grid';
      if (notesBadge) notesBadge.textContent = '🎓 TRAINER SCRIPT & SPEAKING NOTES';
      if (shortcutHint) shortcutHint.textContent = 'Space / ◀ ▶ to navigate';
      if (floatingTab) {
        const text = floatingTab.querySelector('.tab-text');
        if (text) text.textContent = isNotesOpen ? 'Hide Notes' : 'Notes';
      }

      // Restore original English Content
      slides.forEach(slide => {
        const id = slide.id;
        const contentContainer = slide.querySelector('.slide-content');
        if (slideOriginals[id] && contentContainer) {
          contentContainer.innerHTML = slideOriginals[id].content;
        }
      });
    }

    // Re-bind interactive widget listeners on the updated DOM
    bindInteractiveKiosk();
    bindQuizInteractions();
    bindRevealInteractions();

    // Refresh Current Slide View
    goToSlide(currentSlideIndex);
  }

  function bindLanguageToggle() {
    document.getElementById('btn-lang')?.addEventListener('click', () => toggleLanguage());
  }

  // --------------------------------------------------------------------------
  // Day 1 Interactive Features: Support Kiosk Demo
  // --------------------------------------------------------------------------
  let ticketSequence = 101;

  function bindInteractiveKiosk() {
    const submitBtn = document.getElementById('kiosk-submit-btn');
    if (!submitBtn) return;

    submitBtn.onclick = null; // Clear previous handler
    submitBtn.addEventListener('click', () => {
      const issueSelect = document.getElementById('kiosk-issue-select');
      const deptSelect = document.getElementById('kiosk-dept-select');
      const outputCard = document.getElementById('kiosk-output-display');
      if (!issueSelect || !deptSelect || !outputCard) return;

      const issueText = issueSelect.options[issueSelect.selectedIndex]?.text || issueSelect.value;
      const deptText = deptSelect.options[deptSelect.selectedIndex]?.text || deptSelect.value;
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const currentTicket = `SR-${ticketSequence++}`;

      outputCard.classList.remove('hidden');

      if (isKhmerActive) {
        outputCard.innerHTML = `
          <div style="font-size: 0.78rem; color: var(--fluent-green-light); font-weight: 800; text-transform: uppercase;">
            ✅ បានបង្កើតសំបុត្រជោគជ័យ៖ ${currentTicket}
          </div>
          <div style="font-size: 0.94rem; color: #fff; margin: 4px 0; line-height: 1.6;">
            <strong>បញ្ហា៖</strong> ${issueText} <br>
            <strong>ទីតាំង៖</strong> ${deptText}
          </div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">
            កត់ត្រានៅម៉ោង <strong>${currentTime}</strong> • បានជូនដំណឹងទៅក្រុមជាងជួសជុលដោយស្វ័យប្រវត្តិ!
          </div>
        `;
        submitBtn.textContent = '✓ បានកត់ត្រា! ចង់ផ្ញើសំណើផ្សេងទៀតទេ?';
      } else {
        outputCard.innerHTML = `
          <div style="font-size: 0.76rem; color: var(--fluent-green-light); font-weight: 800; text-transform: uppercase;">
            ✅ TICKET GENERATED: ${currentTicket}
          </div>
          <div style="font-size: 0.92rem; color: #fff; margin: 4px 0;">
            <strong>Issue:</strong> ${issueText} <br>
            <strong>Area:</strong> ${deptText}
          </div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">
            Logged at <strong>${currentTime}</strong> • Maintenance Crew Auto-Notified!
          </div>
        `;
        submitBtn.textContent = '✓ Request Logged! Submit Another?';
      }

      setTimeout(() => {
        submitBtn.textContent = isKhmerActive ? 'ផ្ញើសំណើសុំជំនួយ (Submit Request)' : 'Submit Support Request';
      }, 3500);
    });
  }

  // --------------------------------------------------------------------------
  // Knowledge Check Quiz Interactions
  // --------------------------------------------------------------------------
  function bindQuizInteractions() {
    document.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.onclick = null;
      btn.addEventListener('click', (e) => {
        const targetBtn = e.currentTarget;
        const parentList = targetBtn.closest('.quiz-options-list') || targetBtn.parentElement;
        const card = targetBtn.closest('.quiz-widget-card') || targetBtn.closest('.slide');
        const isCorrect = targetBtn.getAttribute('data-correct') === 'true';

        parentList.querySelectorAll('.quiz-option-btn').forEach(b => {
          b.classList.remove('correct', 'wrong');
        });

        if (isCorrect) {
          targetBtn.classList.add('correct');
        } else {
          targetBtn.classList.add('wrong');
        }

        const feedbackBox = card ? card.querySelector('.quiz-feedback-box') : null;
        if (feedbackBox) {
          feedbackBox.classList.remove('hidden');
          const customExp = targetBtn.getAttribute('data-explanation');
          if (customExp) feedbackBox.innerHTML = customExp;
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // Reveal Solution / Content Buttons
  // --------------------------------------------------------------------------
  function bindRevealInteractions() {
    document.querySelectorAll('.btn-reveal-solution, .reveal-trigger').forEach(btn => {
      btn.onclick = null;
      btn.addEventListener('click', (e) => {
        const targetBtn = e.currentTarget;
        const card = targetBtn.closest('.slide') || document;
        const targetElem = card.querySelector('.challenge-solution-card') || card.querySelector('.revealed-content');

        if (targetElem) {
          targetElem.classList.toggle('hidden');
          const isNowHidden = targetElem.classList.contains('hidden');
          if (isKhmerActive) {
            targetBtn.textContent = isNowHidden ? '👁️ បង្ហាញចម្លើយគំរូ & តារាងវាយតម្លៃ' : '🔒 លាក់ចម្លើយវិញ';
          } else {
            targetBtn.textContent = isNowHidden ? '👁️ Reveal Solution & Rubric' : '🔒 Hide Solution';
          }
        }
      });
    });
  }

  // Bootstrap
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPresentationEngine);
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

    // High-performance direct laser tracking (zero layout reflows)
    window.addEventListener('mousemove', (e) => {
      if (!isLaserActive || !pointerDot) return;
      pointerDot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    }, { passive: true });

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
