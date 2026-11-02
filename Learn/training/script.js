/**
 * ============================================================================
 * QA NETWORK MASTER TRAINING PRESENTATION ENGINE
 * Standalone Presentation Engine with 100% Offline-Safe In-DOM Bilingual Translation
 * English <-> Khmer (ភាសាខ្មែរ) with High-Precision Quality Engineering Terminology
 * Interactive Matrix Calculator & Simulator • Timer • Speaker Notes • Laser Pointer
 * ============================================================================
 */

(function () {
  'use strict';

  // Presentation State
  let currentSlideIndex = 0;
  let slides = [];
  let totalSlides = 0;

  // Bilingual State
  let isKhmerActive = false;
  const slideOriginals = {};

  // Interactive Tools State
  let isNotesOpen = false;
  let isOverviewOpen = false;
  let isLaserActive = false;
  let timerSeconds = 90 * 60; // 90 mins
  let timerInterval = null;
  let isTimerRunning = false;

  // --------------------------------------------------------------------------
  // Complete High-Accuracy Khmer Translations for ALL 39 Slides
  // --------------------------------------------------------------------------
  const KHMER_SLIDES = {
    'slide-1': {
      title: 'វគ្គបណ្តុះបណ្តាលមេ QA Network',
      segment: 'សេចក្តីផ្តើមវគ្គសិក្សា',
      content: `
        <div class="hero-layout">
          <div class="hero-pill-group">
            <span class="hero-pill">វិស្វកម្មគុណភាពផលិតកម្ម</span>
            <span class="hero-pill teal-pill">វគ្គពេញលេញ ១ ថ្ងៃ</span>
            <span class="hero-pill purple-pill">វិធីសាស្ត្រគ្មានការខូចខាត (Zero Defect)</span>
          </div>
          
          <h1 class="hero-title">
            វគ្គបណ្តុះបណ្តាលមេ <span class="gradient-text">QA Network</span>
          </h1>

          <p class="hero-subtitle">
            វិធីសាស្ត្រជាប្រព័ន្ធតភ្ជាប់តាមដំណើរការផលិត ដើម្បីកំណត់រកចំណុចខ្វះខាតជាក់ស្តែង និងសក្តានុពល លុបបំបាត់ឫសគល់បញ្ហាមុនពេលវាកើតឡើង និងកសាងការធានាគុណភាពកម្រិតពិភពលោកក្នុងគ្រប់ដំណាក់កាល។
          </p>

          <div style="display: flex; gap: 16px; margin-top: 10px;">
            <div class="badge-pill" style="padding: 10px 20px; font-size: 0.95rem;">
              <span>🛡️ បង្កើតគុណភាពនៅចំណុចដំណើរការ</span>
            </div>
            <div class="badge-pill" style="padding: 10px 20px; font-size: 0.95rem;">
              <span>⚙️ ច្បាប់ការពារ ១-៣០-៣០០-៣០០០</span>
            </div>
            <div class="badge-pill" style="padding: 10px 20px; font-size: 0.95rem;">
              <span>📊 ការសង្កេតផ្អែកលើការពិត 5 Gen</span>
            </div>
          </div>

          <div style="margin-top: 36px; font-size: 0.85rem; color: var(--text-dim);">
            បណ្ឌិត្យសភាបណ្តុះបណ្តាលគំរូ &bull; កំណែអនុវត្តជាក់ស្តែងក្នុងរោងចក្រ &bull; ទ្វេភាសា អង់គ្លេស / ខ្មែរ
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (០៩:០០ - ០៩:១០):</strong></p>
        <p>សូមស្វាគមន៍សិក្ខាកាមមកកាន់វគ្គបណ្តុះបណ្តាល QA Network! សូមបញ្ជាក់ថា គោលបំណងចម្បងនៃវគ្គនេះ គឺការប្តូរផ្នត់គំនិតពី "ការរង់ចាំពិនិត្យកំហុស" ទៅជា "ការទប់ស្កាត់កំហុសកុំឱ្យកើតមានឡើងទាល់តែសោះ"។</p>
      `
    },

    'slide-2': {
      title: 'គោលបំណងនៃការបណ្តុះបណ្តាល & លទ្ធផលសិក្សា',
      segment: '០៩:០០ - ០៩:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag">សេចក្តីផ្តើមវគ្គសិក្សា</span>
          <h2 class="slide-title">គោលបំណងនៃការបណ្តុះបណ្តាល &amp; លទ្ធផលសិក្សា</h2>
          <p class="slide-lead">ឯកសារបណ្តុះបណ្តាលពង្រីកពេញលេញ ១ ថ្ងៃ &bull; ០៩:០០–១៦:០០ &bull; ការធានាគុណភាពតម្រង់ទិសតាមដំណើរការ</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle">🎯</span>
              <h3>គោលបំណងចម្បង</h3>
            </div>
            <p>
              ប្រើប្រាស់ <strong>QA Network</strong> ដែលតភ្ជាប់តាមដំណើរការផលិត ដើម្បីកំណត់បញ្ហាសក្តានុពល និងជាក់ស្តែង ស្វែងយល់ពីកន្លែងដែលបញ្ហាកើតឡើង និងច្រករបូតចេញ វាយតម្លៃផលប៉ះពាល់ និងរបាំងការពារ ព្រមទាំងរៀបចំផែនការកែលម្អគុណភាព និងកាត់បន្ថយការចំណាយ។
            </p>
            <div class="callout-box" style="margin-top: 16px;">
              <strong>ទស្សនវិជ្ជាស្នូល៖</strong> គុណភាពមិនអាចកើតចេញពីការត្រួតពិនិត្យចុងក្រោយនៅមាត់ទ្វារនោះទេ ប៉ុន្តែត្រូវតែកសាង និងបង្កប់ក្នុងគ្រប់ប្រតិបត្តិការនីមួយៗ!
            </div>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">✓</span>
              <h3>នៅចុងបញ្ចប់នៃវគ្គសិក្សា សិក្ខាកាមអាច៖</h3>
            </div>
            <ul>
              <li><strong>បែងចែក QC និង QA៖</strong> បែងចែកច្បាស់រវាងការត្រួតពិនិត្យផលិតផល (QC) និងការធានាដំណើរការជាប្រព័ន្ធ (QA)។</li>
              <li><strong>អនុវត្តថ្លៃដើមគុណភាព (COQ):</strong> វាស់វែង និងពិពណ៌នាការខាតបង់ដែលអាចការពារបាន (Prevention, Appraisal, Failure)។</li>
              <li><strong>បង្កើតតារាង QA Network Sheet:</strong> រៀបចំផែនទីលំហូរការងារ ច្រករបូតបញ្ហា និងរបាំងការពារ។</li>
              <li><strong>ប្រមូលភស្តុតាងជាក់ស្តែង៖</strong> ចុះអង្កេតផ្ទាល់នៅកន្លែងធ្វើការ (Go &amp; See / Genchi Genbutsu) តាមក្បួន 5 Gen។</li>
              <li><strong>វាយតម្លៃរបាំងការពារ៖</strong> ដាក់ពិន្ទុលើការការពារការកើតឡើង ការការពារការធ្លាយចេញ និងកម្រិតធានាសរុប។</li>
            </ul>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (០៩:១០ - ០៩:២០):</strong></p>
        <p>សួរសិក្ខាកាមថា៖ "តើរោងចក្ររបស់អ្នកធ្លាប់ជួបបញ្ហាដែលឆ្លងផុតការពិនិត្យ QC ទៅដល់អតិថិជនដែរឬទេ?" សង្កត់ធ្ងន់ថា QA Network គឺត្រូវបានបង្កើតឡើងដើម្បីលុបបំបាត់បញ្ហានេះ។</p>
      `
    },

    'slide-3': {
      title: 'កាលវិភាគបណ្តុះបណ្តាល ១ ថ្ងៃ & វិធីសាស្ត្រសិក្សា',
      segment: '០៩:០០ - ០៩:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag">រចនាសម្ព័ន្ធវគ្គសិក្សា</span>
          <h2 class="slide-title">កាលវិភាគបណ្តុះបណ្តាល ១ ថ្ងៃ &amp; វិធីសាស្ត្រសិក្ខាសាលា</h2>
          <p class="slide-lead">កម្មវិធីសិក្សាផ្អែកលើការអនុវត្តជាក់ស្តែងនៅរោងចក្រ ឆ្លាស់គ្នារវាងទ្រឹស្តីខ្លី និងលំហាត់ក្រុម។</p>
        </div>

        <div class="grid-2">
          <div class="data-table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width: 130px;">ពេលវេលា</th>
                  <th>សកម្មភាព &amp; ខ្លឹមសារបណ្តុះបណ្តាល</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="color: var(--qa-primary-light); font-weight: 700;">០៩:០០–០៩:៣០</td>
                  <td>គោលគំនិតគុណភាព គោលបំណងវគ្គសិក្សា &amp; ការពិភាក្សាបើកឆាក</td>
                </tr>
                <tr>
                  <td style="color: var(--qa-primary-light); font-weight: 700;">០៩:៣០–១០:៣០</td>
                  <td>ការប្រៀបធៀប QC និង QA ការកាត់បន្ថយការខាតបង់ &amp; ថ្លៃដើមគុណភាព (COQ)</td>
                </tr>
                <tr style="background: rgba(255,255,255,0.02);">
                  <td style="color: var(--text-dim);">១០:៣០–១០:៤៥</td>
                  <td style="color: var(--text-dim);"><em>សម្រាកពិសាកាហ្វេពេលព្រឹក (១៥ នាទី)</em></td>
                </tr>
                <tr>
                  <td style="color: var(--qa-primary-light); font-weight: 700;">១០:៤៥–១២:០០</td>
                  <td>មូលដ្ឋានគ្រឹះ QA Network វិសាលភាព &amp; វដ្ត PDCA</td>
                </tr>
                <tr style="background: rgba(255,255,255,0.02);">
                  <td style="color: var(--text-dim);">១២:០០–១៣:០០</td>
                  <td style="color: var(--text-dim);"><em>សម្រាកទទួលទានអាហារថ្ងៃត្រង់ (៦០ នាទី)</em></td>
                </tr>
                <tr>
                  <td style="color: var(--qa-primary-light); font-weight: 700;">១៣:០០–១៤:០០</td>
                  <td>Go &amp; See ការសង្កេត 5 Gen &amp; ការវិភាគដំណើរការ/ចំណុចខូច</td>
                </tr>
                <tr>
                  <td style="color: var(--qa-primary-light); font-weight: 700;">១៤:០០–១៤:៣០</td>
                  <td>ការបំពេញតារាង QA Network Sheet ការវាយតម្លៃហានិភ័យ &amp; ម៉ាទ្រីសធានាគុណភាព</td>
                </tr>
                <tr style="background: rgba(255,255,255,0.02);">
                  <td style="color: var(--text-dim);">១៤:៣០–១៤:៤៥</td>
                  <td style="color: var(--text-dim);"><em>សម្រាកពេលរសៀល (១៥ នាទី)</em></td>
                </tr>
                <tr>
                  <td style="color: var(--qa-primary-light); font-weight: 700;">១៤:៤៥–១៥:៣០</td>
                  <td>លំហាត់សិក្សាជាក្រុម៖ ការបង្កើត QA Network &amp; ផែនការកែលម្អ</td>
                </tr>
                <tr>
                  <td style="color: var(--qa-primary-light); font-weight: 700;">១៥:៣០–១៦:០០</td>
                  <td>ការធ្វើបទបង្ហាញរបស់ក្រុម ការណែនាំចម្លើយ ការតាមដាន &amp; ការវាយតម្លៃបញ្ចប់</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle purple-icon">👥</span>
              <h3>វិធីសាស្ត្រ &amp; វិន័យនៃសិក្ខាសាលា</h3>
            </div>
            <p>
              វគ្គនេះមិនមែនជាការស្តាប់ទ្រឹស្តីស្ងួតនោះទេ។ យើងឆ្លាស់គ្នារវាងការពន្យល់ខ្លី និងការដោះស្រាយបញ្ហាជាក្រុម៖
            </p>
            <ul>
              <li><strong>សង្កេតខ្សែសង្វាក់ពិត៖</strong> សុំឱ្យសិក្ខាកាមពិពណ៌នាអំពីអ្វីដែល <em>កើតឡើងពិតប្រាកដ</em> នៅក្នុងខ្សែសង្វាក់របស់ខ្លួន មិនមែនអ្វីដែលនីតិវិធីចាស់បានចែងទុកនោះទេ។</li>
              <li><strong>ទំហំក្រុមការងារ៖</strong> ធ្វើការងារជាក្រុមតូចៗពី ៣ ទៅ ៥ នាក់ រួមមានវិស្វករ និងប្រធានផ្នែក។</li>
              <li><strong>មូលដ្ឋានទិន្នន័យពិត៖</strong> ផ្តល់ទិន្នន័យជាក់ស្តែង ករណីសិក្សា និងតារាងទទេសម្រាប់អនុវត្តផ្ទាល់។</li>
            </ul>
            <div class="callout-box green-box" style="margin-top: 14px;">
              <strong>ច្បាប់មាស៖</strong> ហាមទាយ ឬសន្មតដោយគ្មានភស្តុតាង! គ្រប់ពិន្ទុត្រូវតែមានការពិតបញ្ជាក់ច្បាស់លាស់។
            </div>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (០៩:២០ - ០៩:៣០):</strong></p>
        <p>ពន្យល់ពីសារៈសំខាន់នៃលំហាត់ក្រុមនៅម៉ោង ១៤:៤៥។ សិក្ខាកាមនឹងយកទិន្នន័យខ្សែសង្វាក់ផលិតកម្មពិតរបស់ខ្លួនមកអនុវត្តផ្ទាល់។</p>
      `
    },

    'slide-4': {
      title: 'ម៉ូឌុលទី ១៖ តើអ្វីទៅជា "គុណភាព" ពិតប្រាកដ?',
      segment: '០៩:៣០ - ១០:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag">ម៉ូឌុលទី ១ — គោលគំនិតគុណភាព</span>
          <h2 class="slide-title">តើពាក្យថា "គុណភាព" មានន័យយ៉ាងណាឱ្យប្រាកដ?</h2>
          <p class="slide-lead">គុណភាពមានន័យថាការបំពេញបានតាមតម្រូវការផលិតផល និងដំណើរការដែលបានព្រមព្រៀងគ្នា មិនមែនត្រឹមតែជាប់ការត្រួតពិនិត្យចុងក្រោយនោះឡើយ។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle">📐</span>
              <h3>តម្រូវការដែលអាចសង្កេត និងវាស់វែងបាន</h3>
            </div>
            <p>កំណត់តម្រូវការផលិតផលជាលក្ខណៈជាក់លាក់ដែលអាចផ្ទៀងផ្ទាត់បាន៖</p>
            <ul>
              <li><strong>ទំហំ &amp; វិមាត្រ៖</strong> កម្រិតលម្អៀង (Tolerance), ប្រវែង, អង្កត់ផ្ចិត, ភាពត្រង់។</li>
              <li><strong>មុខងារ៖</strong> កម្លាំងរមួល (Torque), ចរន្តអគ្គិសនី, ភាពមិនលេចធ្លាយ។</li>
              <li><strong>រូបរាងមើលឃើញ៖</strong> ផ្ទៃរលោង, គ្មានគែមមុត (Burr), គ្មានសាច់ជ័រលើស (Flash)។</li>
              <li><strong>សុវត្ថិភាព &amp; ការតាមដាន៖</strong> គ្មានគែមគ្រោះថ្នាក់, បាកូដអានបានច្បាស់, លេខឡូត៍ត្រឹមត្រូវ។</li>
            </ul>
            <div class="callout-box amber-box" style="margin-top: 16px;">
              <strong>ភាពខុសគ្នាគន្លឹះ៖</strong> បែងចែករវាង <em>ភាពស្របតាម (Conformity)</em> (ផលិតផលត្រូវតាមស្តង់ដារនៅពេលនេះ) និង <em>ប្រសិទ្ធភាពដំណើរការ (Process Effectiveness)</em> (ដំណើរការបន្តផលិតបានល្អជាប់ជានិច្ច)។
            </div>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle red-icon">⚠️</span>
              <h3>ឧទាហរណ៍ជាក់ស្តែង៖ ហានិភ័យដែលកំពុងកើនឡើង</h3>
            </div>
            <p>
              <strong>ករណីជាក់ស្តែង៖</strong> ម្ជុលម៉ាស៊ីន CNC (Machined pin) មួយត្រូវបានវាស់ឃើញថាត្រឹមត្រូវតាមប្លង់អំឡុងពេលត្រួតពិនិត្យចុងក្រោយ។
            </p>
            <p>
              ប៉ុន្តែក្រោយការផ្លាស់ប្តូរវេនកម្មករ ផ្លែកាត់ចាប់ផ្តើមសឹក ដែលធ្វើឱ្យទំហំចាប់ផ្តើមរអិលទៅកៀកនឹងកម្រិតដែនកំណត់ខាងលើ (Upper limit)។
            </p>
            <div class="callout-box red-box" style="margin-top: 14px;">
              <strong>ការពិតនៃគុណភាព៖</strong> ផលិតផលពេលនេះគឺល្អមែន ប៉ុន្តែហានិភ័យសម្រាប់ថ្ងៃស្អែកកំពុងតែកើនឡើង! ការជាប់ការត្រួតពិនិត្យថ្ងៃនេះ មិនបានធានាថាដំណើរការនៅថ្ងៃស្អែកមានសុវត្ថិភាពនោះឡើយ។
            </div>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (០៩:៣០ - ០៩:៤៥):</strong></p>
        <p>សួរសិក្ខាកាមថា៖ "ប្រសិនបើយើងពិនិត្យឃើញផលិតផលល្អ ១០០ គ្រាប់ថ្ងៃនេះ តើមានន័យថាម៉ាស៊ីនរបស់យើងមានស្ថេរភាពដែរឬទេ?" ពន្យល់ពីគម្លាតរវាង Conformity និង Effectiveness។</p>
      `
    },

    'slide-5': {
      title: 'QA vs QC៖ តើអ្វីជាភាពខុសគ្នាពិតប្រាកដ?',
      segment: '០៩:៣០ - ១០:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag">ម៉ូឌុលទី ១ — គោលគំនិតគុណភាព</span>
          <h2 class="slide-title">QA vs QC៖ តើអ្វីជាភាពខុសគ្នាពិតប្រាកដ?</h2>
          <p class="slide-lead">ទាំងពីរគឺសុទ្ធតែចាំបាច់ ប៉ុន្តែគោលដៅ និងយន្តការរបស់វាខុសគ្នាទាំងស្រុង។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card" style="border-top: 4px solid var(--color-success);">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">🛡️</span>
              <h3>Quality Assurance (QA) &bull; ទប់ស្កាត់បញ្ហា</h3>
            </div>
            <p><strong>ទិសដៅ៖</strong> តម្រង់ទិសលើដំណើរការ (Process-Oriented)</p>
            <p><strong>បេសកកម្មចម្បង៖</strong> ទប់ស្កាត់កំហុស <em>មុនពេល</em> វាកើតឡើងនៅក្នុងខ្សែសង្វាក់។</p>
            <p><strong>ការផ្តោតអារម្មណ៍៖</strong> ការរៀបចំផែនការ សមត្ថភាពម៉ាស៊ីន ស្តង់ដារប្លង់ ការបំពាក់ Poka-Yoke និងនីតិវិធីស្តង់ដាររឹងមាំ។</p>
            <div class="callout-box green-box" style="margin-top: 16px;">
              <strong>ឧទាហរណ៍ក្នុងរោងចក្រ៖</strong> ការអនុម័តរូបមន្តលាយបេតុង, ការដាក់គន្លឹះទប់ Poka-Yoke ការពារកុំឱ្យដាក់ច្រាស, ការកំណត់ប៉ារ៉ាម៉ែត្ររ៉ូបូតផ្សារ។
            </div>
          </div>

          <div class="concept-card" style="border-top: 4px solid var(--qa-primary);">
            <div class="card-icon-header">
              <span class="card-icon-circle">🔍</span>
              <h3>Quality Control (QC) &bull; រកមើលបញ្ហា</h3>
            </div>
            <p><strong>ទិសដៅ៖</strong> តម្រង់ទិសលើផលិតផល (Product-Oriented)</p>
            <p><strong>បេសកកម្មចម្បង៖</strong> រកឱ្យឃើញកំហុស <em>ក្រោយពេល</em> ការងារត្រូវបានបញ្ចប់រួចរាល់។</p>
            <p><strong>ការផ្តោតអារម្មណ៍៖</strong> ការត្រួតពិនិត្យមើល ការវាស់ទំហំ ការធ្វើតេស្តក្នុងមន្ទីរពិសោធន៍ ការរើសកាកសំណល់ និងការជួសជុលឡើងវិញ។</p>
            <div class="callout-box" style="margin-top: 16px;">
              <strong>ឧទាហរណ៍ក្នុងរោងចក្រ៖</strong> ការវាស់ Slump តេស្តបេតុង, ការវាស់ដោយម៉ាស៊ីន CMM, ការពិនិត្យដែកសរសៃ, ការវាស់ចរន្តអគ្គិសនីចុងក្រោយ។
            </div>
          </div>
        </div>

        <div class="callout-box" style="margin-top: 20px; text-align: center; border-left: none; border: 1px solid var(--border-strong); background: rgba(2, 132, 199, 0.1);">
          <strong style="color: var(--qa-primary-light); font-size: 1.05rem;">ច្បាប់មាស៖</strong> QC ដើរពន្លត់ភ្លើងក្រោយពេលភ្លើងឆេះ; QA សាងសង់ជញ្ជាំងការពារភ្លើងដើម្បីកុំឱ្យភ្លើងឆេះបាន!
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (០៩:៤៥ - ១០:០០):</strong></p>
        <p>សង្កត់ធ្ងន់៖ "QC = Find Problems (ស្វែងរកបញ្ហា), QA = Prevent Problems (ទប់ស្កាត់បញ្ហា)"។ ទាំងពីរត្រូវតែធ្វើការរួមគ្នា ប៉ុន្តែការចំណាយលើ QA ចំណេញជាង QC រាប់សិបដង។</p>
      `
    },

    'slide-6': {
      title: 'ខ្សែការពារ ៣ ជាន់ប្រឆាំងនឹងការរបូតចេញនៃបញ្ហា',
      segment: '០៩:៣០ - ១០:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag">ម៉ូឌុលទី ១ — ការរបូតចេញនៃបញ្ហា</span>
          <h2 class="slide-title">ខ្សែការពារ ៣ ជាន់ប្រឆាំងនឹងការរបូតចេញនៃបញ្ហា</h2>
          <p class="slide-lead">ពិពណ៌នាអំពីដំណើរផ្លូវរបស់កំហុស ចាប់តាំងពីការបង្កើតឡើង រហូតដល់ការរបូតចេញទៅដល់ដៃអតិថិជន។</p>
        </div>

        <div class="grid-3">
          <div class="concept-card" style="border-top: 4px solid var(--color-success);">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">1</span>
              <h3>ជាន់ទី ១៖ ការទប់ស្កាត់</h3>
            </div>
            <p><strong>ទប់ស្កាត់កុំឱ្យកើតនៅប្រភពដើម៖</strong></p>
            <p>ទប់ស្កាត់កុំឱ្យកើតកំហុសដោយប្រើវត្ថុធាតុដើមត្រឹមត្រូវ ឧបករណ៍ម៉ាស៊ីនរឹងមាំ ការកំណត់ប៉ារ៉ាម៉ែត្រត្រឹមត្រូវ និងយន្តការ Poka-yoke ការពារកុំឱ្យច្រឡំ។</p>
            <div class="callout-box green-box">គោលដៅ៖ គ្មានកំហុសកើតឡើង</div>
          </div>

          <div class="concept-card" style="border-top: 4px solid var(--color-warning);">
            <div class="card-icon-header">
              <span class="card-icon-circle amber-icon">2</span>
              <h3>ជាន់ទី ២៖ ការរកឱ្យឃើញ</h3>
            </div>
            <p><strong>ចាប់ឱ្យបានភ្លាមៗក្នុងដំណើរការ៖</strong></p>
            <p>រកឱ្យឃើញទិន្នផលមិនប្រក្រតីភ្លាមៗនៅនឹងកន្លែង ឬដំណាក់កាលបន្ទាប់ តាមរយៈឧបករណ៍សេនស័រ ការពិនិត្យបំណែកទីមួយ (First-piece) ឬប្រព័ន្ធស្វ័យប្រវត្តិ។</p>
            <div class="callout-box amber-box">គោលដៅ៖ ខ្ទប់បញ្ហាភ្លាមៗ</div>
          </div>

          <div class="concept-card" style="border-top: 4px solid var(--color-danger);">
            <div class="card-icon-header">
              <span class="card-icon-circle red-icon">3</span>
              <h3>ជាន់ទី ៣៖ ការទប់ស្កាត់ការរបូត</h3>
            </div>
            <p><strong>ទប់ស្កាត់កុំឱ្យរបូតដល់អតិថិជន៖</strong></p>
            <p>របាំងរូបវន្តបញ្ឈប់ទំនិញខូចកុំឱ្យចាកចេញពីរោងចក្រ តាមរយៈការដាក់នៅកន្លែងដាច់ដោយឡែក (Segregation) ការពិនិត្យបញ្ចេញទំនិញ និងការតាមដានលេខកូដ។</p>
            <div class="callout-box red-box">គោលដៅ៖ គ្មានបញ្ហាដល់អតិថិជន</div>
          </div>
        </div>

        <div class="callout-box" style="margin-top: 20px;">
          <strong>ឧទាហរណ៍លើការវេចខ្ចប់ស្លាកសញ្ញា៖</strong> ស្លាកខុសអាចកើតឡើងនៅពេលបោះពុម្ព (ខ្សោយជាន់ទី ១), អាចចាប់បានដោយឧបករណ៍ស្កេនបាកូដ (ជាន់ទី ២), និងអាចពិនិត្យឃើញម្តងទៀតនៅពេលវេចខ្ចប់ (ជាន់ទី ៣)។ <em>ប្រសិនបើបុគ្គលិកតែងតែបិទឧបករណ៍ស្កេនចោល នោះខ្សែការពារកណ្តាលនឹងត្រូវបាត់បង់ទាំងស្រុង!</em>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១០:០០ - ១០:១៥):</strong></p>
        <p>លើកឧទាហរណ៍ខ្សែការពារ ៣ ជាន់នេះ។ ប្រសិនបើជាន់ទី ១ បរាជ័យ យើងនៅមានជាន់ទី ២។ ប៉ុន្តែប្រសិនបើជាន់ទី ២ ត្រូវបានរំលងដោយសារទម្លាប់មិនល្អ (Bypass) នោះហានិភ័យនឹងធ្លាក់ទៅជាន់ទី ៣ ទាំងស្រុង។</p>
      `
    },

    'slide-7': {
      title: 'ធាតុចូលដំណើរការ & ក្របខ័ណ្ឌវិភាគ 6M',
      segment: '០៩:៣០ - ១០:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag">ម៉ូឌុលទី ១ — ក្របខ័ណ្ឌវិភាគឫសគល់</span>
          <h2 class="slide-title">ធាតុចូលដំណើរការ &amp; ក្របខ័ណ្ឌប្រព័ន្ធ 6M</h2>
          <p class="slide-lead">មើលឱ្យហួសពីកំហុសរបស់បុគ្គលិក ដើម្បីវិភាគលើរចនាសម្ព័ន្ធប្រព័ន្ធផលិតកម្មទាំងមូល។</p>
        </div>

        <div class="grid-6">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle">1</span>
              <h3>Man (មនុស្ស)</h3>
            </div>
            <p>ជំនាញ កម្រិតបណ្តុះបណ្តាល វិញ្ញាបនបត្រ កត្តាមនុស្ស ការអស់កម្លាំង ការប្រគល់វេនការងារ និងទំនួលខុសត្រូវ។</p>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle">2</span>
              <h3>Machine (ម៉ាស៊ីន)</h3>
            </div>
            <p>ការពាក់សឹកនៃឧបករណ៍ ភាពត្រឹមត្រូវ សេនស័រ របាំងការពារ កាលវិភាគថែទាំបង្ការ (PM) និងការការពារការខូច។</p>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle">3</span>
              <h3>Material (វត្ថុធាតុ)</h3>
            </div>
            <p>គុណភាពអ្នកផ្គត់ផ្គង់ លក្ខណៈបច្ចេកទេស ការផ្លាស់ប្តូរឡូត៍ ការគ្រប់គ្រង FIFO ការទុកដាក់ និងការតាមដានប្រភព។</p>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle">4</span>
              <h3>Method (វិធីសាស្ត្រ)</h3>
            </div>
            <p>នីតិវិធី SOP សេចក្តីណែនាំការងារ (WI) លំដាប់លំដោយត្រឹមត្រូវ ស្តង់ដារនៃការចាប់គៀប និងការគោរព Takt time។</p>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle">5</span>
              <h3>Measurement (ការវាស់)</h3>
            </div>
            <p>ស្ថានភាពក្រិតឧបករណ៍ (Calibration) ការវិភាគប្រព័ន្ធវាស់វែង (MSA) ភាពសុក្រឹត និងភាពញឹកញាប់នៃការពិនិត្យ។</p>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle">6</span>
              <h3>Mother Nature (បរិស្ថាន)</h3>
            </div>
            <p>អនាម័យ ធូលី សីតុណ្ហភាព សំណើមខ្យល់ កម្រិតពន្លឺភ្លើង និងការការពារអគ្គិសនីស្ទិត (ESD)។</p>
          </div>
        </div>

        <div class="callout-box" style="margin-top: 14px;">
          <strong>ករណីជាក់ស្តែង៖</strong> បញ្ហាតម្លើងគ្រឿងបន្លាស់ស្រាប់តែកើតឡើងភ្លាមៗក្រោយការផ្លាស់ប្តូរវេនយប់ និងការប្តូរឡូត៍វត្ថុធាតុដើម។ ទាំងវិមាត្រវត្ថុធាតុដើមថ្មី (Material) និងសេចក្តីណែនាំតម្លើងមិនច្បាស់លាស់ (Method/Man) ត្រូវតែយកមកស៊ើបអង្កេតរួមគ្នា។
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១០:១៥ - ១០:៣០):</strong></p>
        <p>ក្រើនរំលឹកសិក្ខាកាម៖ កុំបន្ទោសបុគ្គលិកថា "មិនប្រយ័ត្ន"! ត្រូវមើលលើប្រព័ន្ធ 6M ថាតើមានចំណុចខ្វះខាតលើ Machine, Material, Method, ឬ Measurement ដែរឬទេ?</p>
      `
    },

    'slide-8': {
      title: 'ការខាតបង់គុណភាពក្នុងខ្សែសង្វាក់ផលិតកម្ម',
      segment: '០៩:៣០ - ១០:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag">ម៉ូឌុលទី ១ — ផលប៉ះពាល់សេដ្ឋកិច្ច</span>
          <h2 class="slide-title">ការខាតបង់គុណភាពមើលឃើញ និងមើលមិនឃើញ</h2>
          <p class="slide-lead">កំណត់បរិមាណកាកសំណល់ប្រតិបត្តិការជាក់ស្តែង ដោយពិនិត្យមើលទាំងការខូចខាតផ្ទាល់ និងការចំណាយលាក់កំបាំង។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle red-icon">📉</span>
              <h3>ការខាតបង់ដែលមើលឃើញ (Visible Losses)</h3>
            </div>
            <p>ថ្លៃដើមផ្ទាល់ដែលត្រូវបានកត់ត្រាក្នុងបញ្ជីគណនេយ្យរោងចក្រភ្លាមៗ៖</p>
            <ul>
              <li><strong>កាកសំណល់បោះចោល (Scrap):</strong> វត្ថុធាតុដើម និងគ្រឿងបន្លាស់ដែលត្រូវបោះបង់។</li>
              <li><strong>ពលកម្មជួសជុលកែច្នៃ (Rework):</strong> ម៉ោងការងារដែលចំណាយលើការកែកំហុស។</li>
              <li><strong>ការរើសទំនិញឡើងវិញ ១០០%៖</strong> ពលកម្មបន្ទាន់ដើម្បីរើសទំនិញជាប់គាំង។</li>
              <li><strong>ការឈប់ខ្សែសង្វាក់ផលិតកម្ម៖</strong> ពេលវេលាអសកម្មលើម៉ាស៊ីនសំខាន់ៗ។</li>
              <li><strong>ថ្លៃដឹកជញ្ជូនបន្ទាន់ពិសេស (Premium freight):</strong> ជួលយន្តហោះដឹកទំនិញដើម្បីកុំឱ្យរោងចក្រអតិថិជនត្រូវបិទទ្វារ។</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle amber-icon">🔍</span>
              <h3>ការខាតបង់លាក់កំបាំង (Hidden Losses)</h3>
            </div>
            <p>ការបាត់បង់ដោយប្រយោលលើសមត្ថភាពវិស្វកម្ម និងល្បឿនរោងចក្រ៖</p>
            <ul>
              <li><strong>ពេលវេលារបស់ប្រធាន &amp; វិស្វករ៖</strong> ត្រូវចំណាយពេលដើរពន្លត់ភ្លើងជាជាងការកែលម្អ Kaizen។</li>
              <li><strong>ការបាត់បង់សមត្ថភាពផលិតកម្ម៖</strong> ដំណាក់កាលបន្ទាប់ត្រូវរង់ចាំទំនិញ។</li>
              <li><strong>ការត្រួតពិនិត្យដដែលៗ &amp; ស្តុកកកស្ទះ៖</strong> ការកើនឡើងនៃទំនិញមិនទាន់ចប់ (WIP)។</li>
              <li><strong>ការបាត់បង់ទំនុកចិត្តអតិថិជន៖</strong> ការធ្លាក់ចុះពិន្ទុអ្នកផ្គត់ផ្គង់ និងបាត់បង់ការបញ្ជាទិញ។</li>
              <li><strong>ការចំណាយលើការធានា (Warranty):</strong> ពាក្យបណ្តឹង ការពិនិត្យផ្លូវច្បាប់ និងការប្រមូលទំនិញមកវិញ។</li>
            </ul>
          </div>
        </div>

        <div class="callout-box amber-box" style="margin-top: 18px;">
          <strong>វិន័យក្នុងការគណនាហិរញ្ញវត្ថុ៖</strong> នៅពេលគណនាប្រាក់សន្សំបានពីការកែលម្អគុណភាព ត្រូវបែងចែកឱ្យច្បាស់រវាង <em>ការចំណាយជាក់ស្តែងដែលបានកាត់បន្ថយ</em> (ដូចជាប្រាក់ថែមម៉ោង OT ឬថ្លៃវត្ថុធាតុដើមខូច) និងសមត្ថភាពទ្រឹស្តីដែលទទួលបានមកវិញ។
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១០:២០ - ១០:៣០):</strong></p>
        <p>ពន្យល់ពីឧទាហរណ៍៖ ប្រសិនបើម៉ាស៊ីនឈប់ ៣០ នាទី បណ្តាលឱ្យត្រូវថែមម៉ោង OT និងពន្យារពេលប្រគល់ទំនិញ មានតែប្រាក់ OT ជាក់ស្តែងប៉ុណ្ណោះដែលត្រូវកត់ត្រាជាប្រាក់សន្សំជាសាច់ប្រាក់។</p>
      `
    },
              <li><strong>ការរើសទំនិញឡើងវិញ ១០០%៖</strong> ពលកម្មបន្ទាន់ដើម្បីរើសទំនិញជាប់គាំង។</li>
              <li><strong>ការឈប់ខ្សែសង្វាក់ផលិតកម្ម៖</strong> ពេលវេលាអសកម្មលើម៉ាស៊ីនសំខាន់ៗ។</li>
              <li><strong>ថ្លៃដឹកជញ្ជូនបន្ទាន់ពិសេស (Premium freight):</strong> ជួលយន្តហោះដឹកទំនិញដើម្បីកុំឱ្យរោងចក្រអតិថិជនត្រូវបិទទ្វារ។</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle amber-icon">🔍</span>
              <h3>ការខាតបង់លាក់កំបាំង (Hidden Losses)</h3>
            </div>
            <p>ការបាត់បង់ដោយប្រយោលលើសមត្ថភាពវិស្វកម្ម និងល្បឿនរោងចក្រ៖</p>
            <ul>
              <li><strong>ពេលវេលារបស់ប្រធាន &amp; វិស្វករ៖</strong> ត្រូវចំណាយពេលដើរពន្លត់ភ្លើងជាជាងការកែលម្អ Kaizen។</li>
              <li><strong>ការបាត់បង់សមត្ថភាពផលិតកម្ម៖</strong> ដំណាក់កាលបន្ទាប់ត្រូវរង់ចាំទំនិញ។</li>
              <li><strong>ការត្រួតពិនិត្យដដែលៗ &amp; ស្តុកកកស្ទះ៖</strong> ការកើនឡើងនៃទំនិញមិនទាន់ចប់ (WIP)។</li>
              <li><strong>ការបាត់បង់ទំនុកចិត្តអតិថិជន៖</strong> ការធ្លាក់ចុះពិន្ទុអ្នកផ្គត់ផ្គង់ និងបាត់បង់ការបញ្ជាទិញ។</li>
              <li><strong>ការចំណាយលើការធានា (Warranty):</strong> ពាក្យបណ្តឹង ការពិនិត្យផ្លូវច្បាប់ និងការប្រមូលទំនិញមកវិញ។</li>
            </ul>
          </div>
        </div>

        <div class="callout-box amber-box" style="margin-top: 18px;">
          <strong>វិន័យក្នុងការគណនាហិរញ្ញវត្ថុ៖</strong> នៅពេលគណនាប្រាក់សន្សំបានពីការកែលម្អគុណភាព ត្រូវបែងចែកឱ្យច្បាស់រវាង <em>ការចំណាយជាក់ស្តែងដែលបានកាត់បន្ថយ</em> (ដូចជាប្រាក់ថែមម៉ោង OT ឬថ្លៃវត្ថុធាតុដើមខូច) និងសមត្ថភាពទ្រឹស្តីដែលទទួលបានមកវិញ។
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១០:២០ - ១០:៣០):</strong></p>
        <p>ពន្យល់ពីឧទាហរណ៍៖ ប្រសិនបើម៉ាស៊ីនឈប់ ៣០ នាទី បណ្តាលឱ្យត្រូវថែមម៉ោង OT និងពន្យារពេលប្រគល់ទំនិញ មានតែប្រាក់ OT ជាក់ស្តែងប៉ុណ្ណោះដែលត្រូវកត់ត្រាជាប្រាក់សន្សំជាសាច់ប្រាក់។</p>
      `
    },

    'slide-9': {
      title: 'ម៉ូឌុលទី ២៖ ថ្លៃដើមគុណភាព (COQ) & ដុំទឹកកកគុណភាព',
      segment: '០៩:៣០ - ១០:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag purple-tag">ម៉ូឌុលទី ២ — ថ្លៃដើមគុណភាព</span>
          <h2 class="slide-title">ថ្លៃដើមគុណភាព (COQ) &amp; ដុំទឹកកកនៃគុណភាពអន់</h2>
          <p class="slide-lead">COQ ផ្តល់ជាភាសាសកលដើម្បីប្រៀបធៀបការវិនិយោគលើការធានាគុណភាព ទៅនឹងការខាតបង់ដោយសារការបរាជ័យ។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle purple-icon">🧊</span>
              <h3>ដុំទឹកកកនៃការចំណាយដោយសារគុណភាពអន់</h3>
            </div>
            <p><strong>ផ្នែកខាងលើទឹក (មើលឃើញ ~១៥%):</strong></p>
            <p>កាកសំណល់បោះចោល, ម៉ោងជួសជុលកែច្នៃ, ថ្លៃទាមទារសំណងធម្មតា, ការចោលទំនិញខូចក្នុងខ្សែសង្វាក់។</p>
            <div style="height: 2px; background: rgba(56, 189, 248, 0.4); margin: 12px 0;"></div>
            <p><strong>ផ្នែកខាងក្រោមទឹក (លាក់កំបាំង ~៨៥%):</strong></p>
            <p>ការមិនពេញចិត្តរបស់អតិថិជន, វិស្វកររវល់តែពន្លត់ភ្លើង, ការពន្យារពេលប្រគល់ទំនិញ, ការថយចុះល្បឿនផលិត, ស្តុកកកស្ទះលើសកម្រិត, ការបាត់បង់កេរ្តិ៍ឈ្មោះម៉ាកសញ្ញា។</p>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">⚖️</span>
              <h3>ក្របខ័ណ្ឌថ្លៃដើមគុណភាពសរុប (Total COQ)</h3>
            </div>
            <p>COQ សរុបត្រូវបានបែងចែកជាពីរប្រភេទធំៗ៖</p>
            <div class="callout-box green-box" style="margin-bottom: 12px;">
              <strong>១. ថ្លៃដើមនៃគុណភាពល្អ (Cost of Good Quality - CoGQ):</strong><br>
              ការវិនិយោគដើម្បីធ្វើឱ្យត្រឹមត្រូវតាំងពីលើកដំបូង។<br>
              &bull; <strong>ថ្លៃដើមការពារ (Prevention)</strong> + <strong>ថ្លៃដើមវាយតម្លៃ (Appraisal)</strong>
            </div>
            <div class="callout-box red-box">
              <strong>២. ថ្លៃដើមនៃគុណភាពអន់ (Cost of Poor Quality - CoPQ):</strong><br>
              ការខាតបង់ដែលកើតឡើងដោយសារផលិតផលមិនស្របតាមស្តង់ដារ។<br>
              &bull; <strong>ការបរាជ័យផ្ទៃក្នុង (Internal Failure)</strong> + <strong>ការបរាជ័យខាងក្រៅ (External Failure)</strong>
            </div>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១០:៣០ - ១០:៤៥):</strong></p>
        <p>មុនពេលសម្រាកកាហ្វេ សូមបង្ហាញរូបដុំទឹកកកនេះ។ ការចំណាយដែលក្រុមហ៊ុនឃើញនៅលើតុគណនេយ្យ គឺត្រឹមតែ ១៥% ប៉ុណ្ណោះ ឯ ៨៥% ទៀតគឺនៅក្រោមកម្រិតទឹកដែលកំពុងបំផ្លាញប្រាក់ចំណេញ។</p>
      `
    },

    'slide-10': {
      title: 'ចំណាត់ថ្នាក់ថ្លៃដើមគុណភាពទាំង ៤ ប្រភេទ',
      segment: '០៩:៣០ - ១០:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag purple-tag">ម៉ូឌុលទី ២ — ថ្លៃដើមគុណភាព</span>
          <h2 class="slide-title">ចំណាត់ថ្នាក់ថ្លៃដើមគុណភាពទាំង ៤ ប្រភេទ</h2>
          <p class="slide-lead">និយមន័យច្បាស់លាស់ និងការបែងចែកជាក់ស្តែងនៅក្នុងរោងចក្រផលិតកម្ម។</p>
        </div>

        <div class="grid-4">
          <div class="concept-card" style="border-top: 4px solid var(--color-success);">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">1</span>
              <h3>Prevention (ការការពារ)</h3>
            </div>
            <p><strong>ការចំណាយដើម្បីការពារកុំឱ្យមានកំហុស៖</strong></p>
            <ul>
              <li>ការបណ្តុះបណ្តាលបុគ្គលិក</li>
              <li>ការរចនា Poka-yoke ការពារកំហុស</li>
              <li>ការសិក្សា DFMEA &amp; PFMEA</li>
              <li>ការផ្ទៀងផ្ទាត់សមត្ថភាពដំណើរការ</li>
              <li>ការថែទាំឧបករណ៍ទប់គន្លឹះ (Jigs)</li>
            </ul>
          </div>

          <div class="concept-card" style="border-top: 4px solid var(--qa-primary);">
            <div class="card-icon-header">
              <span class="card-icon-circle">2</span>
              <h3>Appraisal (ការវាយតម្លៃ)</h3>
            </div>
            <p><strong>ការចំណាយដើម្បីពិនិត្យគុណភាព៖</strong></p>
            <ul>
              <li>ការពិនិត្យវត្ថុធាតុដើមចូល</li>
              <li>ការវាស់ទំហំនៅក្នុងដំណើរការ</li>
              <li>ការពិនិត្យគំរូដំបូង (First-piece)</li>
              <li>ការធ្វើតេស្តក្នុងមន្ទីរពិសោធន៍</li>
              <li>ការក្រិតឧបករណ៍វាស់ (Calibration)</li>
            </ul>
          </div>

          <div class="concept-card" style="border-top: 4px solid var(--color-warning);">
            <div class="card-icon-header">
              <span class="card-icon-circle amber-icon">3</span>
              <h3>Internal Failure (បរាជ័យផ្ទៃក្នុង)</h3>
            </div>
            <p><strong>កំហុសចាប់បានមុនបញ្ជូនចេញ៖</strong></p>
            <ul>
              <li>កាកសំណល់បោះចោលក្នុងរោងចក្រ</li>
              <li>ការជួសជុលកែច្នៃគ្រឿងបន្លាស់</li>
              <li>ការធ្វើតេស្តឡូត៍ខូចឡើងវិញ</li>
              <li>ការរើសទំនិញដែលជាប់គាំង</li>
              <li>ម៉ាស៊ីនឈប់ដោយសារគ្រឿងខូច</li>
            </ul>
          </div>

          <div class="concept-card" style="border-top: 4px solid var(--color-danger);">
            <div class="card-icon-header">
              <span class="card-icon-circle red-icon">4</span>
              <h3>External Failure (បរាជ័យខាងក្រៅ)</h3>
            </div>
            <p><strong>កំហុសរបូតដល់ដៃអតិថិជន៖</strong></p>
            <ul>
              <li>អតិថិជនបង្វិលទំនិញមកវិញ</li>
              <li>ការទាមទារសំណងធានា (Warranty)</li>
              <li>ថ្លៃពិន័យរើសទំនិញនៅរោងចក្រ OEM</li>
              <li>ការប្រមូលរថយន្ត/ទំនិញមកវិញ</li>
              <li>សំណងដោយសារធ្វើឱ្យគេឈប់ដំណើរការ</li>
            </ul>
          </div>
        </div>

        <div class="callout-box" style="margin-top: 16px;">
          <strong>ឧទាហរណ៍ជាក់ស្តែង៖</strong> ការថែទាំកុងតាក់ Poka-yoke គឺជា <em>Prevention</em>; ប្រាក់ខែអ្នកត្រួតពិនិត្យចុងក្រោយគឺជា <em>Appraisal</em>; គ្រឿងដែកបោះចោលគឺជា <em>Internal Failure</em>; ការជួសជុលឡានអតិថិជននៅយានដ្ឋានគឺជា <em>External Failure</em>។
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ:</strong></p>
        <p>សួរសិក្ខាកាមឱ្យលើកឧទាហរណ៍ពីការងារផ្ទាល់ខ្លួនរបស់ពួកគេសម្រាប់ប្រអប់នីមួយៗទាំង ៤ នេះ ដើម្បីឱ្យប្រាកដថាពួកគេយល់ច្បាស់ពីការបែងចែក។</p>
      `
    },

    'slide-11': {
      title: 'លំហាត់គណនា COQ & សូចនាករបញ្ជាក់',
      segment: '០៩:៣០ - ១០:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag purple-tag">ម៉ូឌុលទី ២ — សូចនាករហិរញ្ញវត្ថុ</span>
          <h2 class="slide-title">លំហាត់គណនា COQ &amp; សូចនាករគោលប្រចាំខែ</h2>
          <p class="slide-lead">ប្រើប្រាស់កាលបរិច្ឆេទគណនេយ្យស្របគ្នា និងជៀសវាងការរាប់ត្រួតស៊ីគ្នាពេលគណនាការចំណាយគុណភាព។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle purple-icon">🧮</span>
              <h3>គំរូគណិតវិទ្យា &amp; រូបមន្តគណនា</h3>
            </div>
            <div class="callout-box" style="font-family: var(--font-code); font-size: 1rem; line-height: 1.8; margin-bottom: 14px;">
              COQ = Prevention + Appraisal + Internal Failure + External Failure<br><br>
              Total Failure Cost = Internal Failure + External Failure<br><br>
              Failure Cost Ratio = (Failure Cost / Total COQ) × 100%
            </div>
            <p>
              ដើម្បីវាស់វែងផលប្រយោជន៍ហិរញ្ញវត្ថុពីវិធានការ QA Network ត្រូវប្រៀបធៀបការចំណាយដើមគ្រា (Baseline) ទៅនឹងការចំណាយក្រោយកែលម្អ ក្រោមបរិមាណផលិតកម្មប្រហាក់ប្រហែលគ្នា។
            </p>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">📊</span>
              <h3>ករណីគំរូប្រចាំខែក្នុងរោងចក្រផលិតកម្ម</h3>
            </div>
            <table class="data-table">
              <tbody>
                <tr>
                  <td><strong>ថ្លៃដើមការពារ (Prevention - P):</strong></td>
                  <td style="text-align: right; color: var(--color-success-light); font-weight: 700;">THB 12,000</td>
                </tr>
                <tr>
                  <td><strong>ថ្លៃដើមវាយតម្លៃ (Appraisal - A):</strong></td>
                  <td style="text-align: right; color: var(--qa-primary-light); font-weight: 700;">THB 18,000</td>
                </tr>
                <tr>
                  <td><strong>បរាជ័យផ្ទៃក្នុង (Internal Failure - IF):</strong></td>
                  <td style="text-align: right; color: var(--color-warning-light); font-weight: 700;">THB 13,400</td>
                </tr>
                <tr>
                  <td><strong>បរាជ័យខាងក្រៅ (External Failure - EF):</strong></td>
                  <td style="text-align: right; color: var(--color-danger-light); font-weight: 700;">THB 8,600</td>
                </tr>
                <tr style="border-top: 2px solid var(--border-strong); background: rgba(255,255,255,0.04);">
                  <td><strong>ថ្លៃដើមគុណភាពសរុប (Total COQ):</strong></td>
                  <td style="text-align: right; font-weight: 800; color: #fff;">THB 52,000</td>
                </tr>
                <tr>
                  <td><strong>ការខាតបង់បរាជ័យសរុប (IF + EF):</strong></td>
                  <td style="text-align: right; font-weight: 800; color: var(--color-danger-light);">THB 22,000 (៤២.៣%)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ:</strong></p>
        <p>កត់សម្គាល់៖ ការខាតបង់បរាជ័យស្មើនឹង ៤២.៣% នៃ COQ សរុប! នេះជាលុយដែលហួតចោលទទេៗ។ ប្រសិនបើយើងបង្កើន Prevention ត្រឹមតែ ៥,០០០ បាត យើងអាចកាត់បន្ថយ Failure បាន ១៥,០០០ បាត។</p>
      `
    },

    'slide-12': {
      title: 'ខ្សែកោងថ្លៃដើម៖ ការការពារ vs ការខាតបង់បរាជ័យ',
      segment: '០៩:៣០ - ១០:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag purple-tag">ម៉ូឌុលទី ២ — ថាមវន្តសេដ្ឋកិច្ច</span>
          <h2 class="slide-title">ខ្សែកោងថ្លៃដើម៖ ការការពារកម្ចាត់ការខាតបង់បរាជ័យ</h2>
          <p class="slide-lead">រាល់ប្រាក់មួយកាក់ដែលវិនិយោគលើការការពាររឹងមាំ នឹងកាត់បន្ថយថ្លៃត្រួតពិនិត្យ និងថ្លៃខូចខាតយ៉ាងច្រើនសន្ធឹកសន្ធាប់។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">📈</span>
              <h3>សេដ្ឋកិច្ចនៃការទប់ស្កាត់ជាមុន</h3>
            </div>
            <p>
              នៅពេលដែលកិច្ចខិតខំប្រឹងប្រែង និងការវិនិយោគលើ <strong>ការការពារ (Prevention)</strong> (Poka-yoke, ការបណ្តុះបណ្តាល) កើនឡើង នោះអត្រានៃការកើតបញ្ហានឹងធ្លាក់ចុះជាគំហុក៖
            </p>
            <ul>
              <li><strong>ការបរាជ័យផ្ទៃក្នុង៖</strong> ធ្លាក់ចុះយ៉ាងលឿនដោយសារកាកសំណល់ និងការកែច្នៃត្រូវបានលុបបំបាត់។</li>
              <li><strong>ការបរាជ័យខាងក្រៅ៖</strong> ធ្លាក់ចុះដល់សូន្យ ដោយសារគ្មានបញ្ហាត្រូវបានបង្កើតឡើងនៅម៉ាស៊ីន។</li>
              <li><strong>លទ្ធផលហិរញ្ញវត្ថុរួម៖</strong> ថ្លៃដើមប្រតិបត្តិការសរុបធ្លាក់ចុះយ៉ាងខ្លាំង ចំណេញលើសពីថ្លៃធ្វើឧបករណ៍ការពារឆ្ងាយណាស់!</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle">📉</span>
              <h3>អន្ទាក់នៃការរំពឹងតែលើការត្រួតពិនិត្យ (Appraisal)</h3>
            </div>
            <p>
              ការព្យាយាមលុបបំបាត់ទំនិញខូចដោយការបន្ថែមបុគ្គលិក QC ពិនិត្យ គឺជាអន្ទាក់ដ៏គ្រោះថ្នាក់៖
            </p>
            <ul>
              <li>ការពិនិត្យដោយភ្នែកមនុស្សមិនដែលត្រឹមត្រូវ ១០០% ទេ (ភាពនឿយហត់ធ្វើឱ្យខកខាន ១៥-២០%)។</li>
              <li>ទំនិញខូចត្រូវបានផលិតរួចទៅហើយ ខាតបង់ទាំងម៉ោងម៉ាស៊ីន និងវត្ថុធាតុដើម។</li>
              <li>ថ្លៃត្រួតពិនិត្យកើនឡើងខ្ពស់ ខណៈដែលហានិភ័យរបូតនៅតែមាន។</li>
            </ul>
          </div>
        </div>

        <div class="callout-box green-box" style="margin-top: 16px;">
          <strong>យុទ្ធសាស្ត្រគន្លឹះ៖</strong> បង្វែរថវិកាចេញពីការជួលមនុស្សពិនិត្យ និងរើសទំនិញ ទៅជាការបំពាក់ឧបករណ៍ការពារស្វ័យប្រវត្តិនៅនឹងកន្លែង!
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ:</strong></p>
        <p>សង្កត់ធ្ងន់លើខ្សែកោង៖ នៅពេល Effort/Time លើ Prevention កើនឡើង ខ្សែកោង Internal/External Failure ធ្លាក់ចុះយ៉ាងគំហុកភ្លាមៗ។</p>
      `
    },

    'slide-13': {
      title: 'ការកំណត់អាទិភាព Pareto៖ ចំនួន vs ការខាតបង់ហិរញ្ញវត្ថុ',
      segment: '០៩:៣០ - ១០:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag purple-tag">ម៉ូឌុលទី ២ — ការកំណត់អាទិភាពតាមទិន្នន័យ</span>
          <h2 class="slide-title">ការកំណត់អាទិភាព Pareto៖ ចំនួន vs ផលប៉ះពាល់ហិរញ្ញវត្ថុ</h2>
          <p class="slide-lead">Pareto តាមចំនួនដង ច្រើនតែផ្ទុយគ្នាស្រឡះពី Pareto តាមទំហំទឹកប្រាក់ខាតបង់។ ត្រូវតែពិនិត្យមើលទាំងពីរ!</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle">🔢</span>
              <h3>Pareto ធម្មតា (តាមចំនួនកំហុស - Frequency)</h3>
            </div>
            <p>កំណត់ត្រាកំហុសប្រចាំខែតាមចំនួនដង៖</p>
            <table class="data-table">
              <thead>
                <tr>
                  <th>ប្រភេទកំហុស</th>
                  <th>ចំនួន</th>
                  <th>ចំណែក %</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>គែមមុតតូចតាច (Burrs)</td>
                  <td style="color: var(--qa-primary-light); font-weight: 700;">60</td>
                  <td>60.0%</td>
                </tr>
                <tr>
                  <td>ស្នាមឆ្កូតលើផ្ទៃ (Cosmetic Dents)</td>
                  <td style="color: var(--qa-primary-light); font-weight: 700;">25</td>
                  <td>25.0%</td>
                </tr>
                <tr>
                  <td>បាត់ខ្ចៅខ្ទាស់ (Missing Clip)</td>
                  <td style="color: var(--qa-primary-light); font-weight: 700;">10</td>
                  <td>10.0%</td>
                </tr>
                <tr>
                  <td>លេចធ្លាយប្រេងធារាសាស្ត្រ (Major Leak)</td>
                  <td style="color: var(--color-danger-light); font-weight: 700;">5</td>
                  <td>5.0%</td>
                </tr>
              </tbody>
            </table>
            <div class="callout-box" style="margin-top: 10px;">
              <strong>អន្ទាក់ចំនួនដង៖</strong> គែមមុតមានរហូតដល់ ៦០% នាំឱ្យក្រុមការងាររត់ទៅខាត់គែមមុតចោលអស់កម្លាំង!
            </div>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle red-icon">💰</span>
              <h3>Pareto ទម្ងន់ (តាមទំហំទឹកប្រាក់ - Financial Loss)</h3>
            </div>
            <p>កំណត់ត្រាកំហុសប្រចាំខែតាមការខាតបង់ទឹកប្រាក់ជាក់ស្តែង៖</p>
            <table class="data-table">
              <thead>
                <tr>
                  <th>ប្រភេទកំហុស</th>
                  <th>ទឹកប្រាក់ខាតបង់</th>
                  <th>ចំណែក %</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>លេចធ្លាយប្រេងធារាសាស្ត្រ (Major Leak)</td>
                  <td style="color: var(--color-danger-light); font-weight: 800;">$4,500</td>
                  <td>89.1%</td>
                </tr>
                <tr>
                  <td>បាត់ខ្ចៅខ្ទាស់ (Missing Clip)</td>
                  <td style="color: var(--color-warning-light); font-weight: 700;">$300</td>
                  <td>5.9%</td>
                </tr>
                <tr>
                  <td>គែមមុតតូចតាច (Burrs)</td>
                  <td style="color: var(--text-secondary); font-weight: 700;">$150</td>
                  <td>3.0%</td>
                </tr>
                <tr>
                  <td>ស្នាមឆ្កូតលើផ្ទៃ (Cosmetic Dents)</td>
                  <td style="color: var(--text-secondary); font-weight: 700;">$100</td>
                  <td>2.0%</td>
                </tr>
              </tbody>
            </table>
            <div class="callout-box red-box" style="margin-top: 10px;">
              <strong>ការពិតជាក់ស្តែង៖</strong> គ្រាន់តែបញ្ហាលេចធ្លាយ ៥ ករណី បង្កការខាតបង់រហូតដល់ <strong>៨៩.១%</strong> នៃទឹកប្រាក់សរុប! Pareto តាមទំហំទឹកប្រាក់ការពារកុំឱ្យវិស្វករខ្ជះខ្ជាយពេលលើរឿងកំប៉ិកកំប៉ុក។
            </div>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ:</strong></p>
        <p>នេះជាស្លាយគន្លឹះបំផុតមួយក្នុង Module 2។ កុំមើលតែចំនួនដង! បញ្ហាខ្លះកើតឡើងតិចតួច ប៉ុន្តែអាចបំផ្លាញក្រុមហ៊ុនទាំងមូលបាន។</p>
      `
    },

    'slide-14': {
      title: 'ការកាត់បន្ថយការចំណាយដោយគុណភាព & រយៈពេលរួចដើម',
      segment: '០៩:៣០ - ១០:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag purple-tag">ម៉ូឌុលទី ២ — ROI &amp; ការរួចដើម</span>
          <h2 class="slide-title">ការកាត់បន្ថយការចំណាយដោយគុណភាព &amp; រយៈពេលរួចដើម</h2>
          <p class="slide-lead">លុបបំបាត់យន្តការដែលបង្កបញ្ហាជាអចិន្ត្រៃយ៍ ដោយមិនកាត់បន្ថយការធានាគុណភាពដែលចាំបាច់។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">⚡</span>
              <h3>គោលការណ៍កាត់បន្ថយការចំណាយ</h3>
            </div>
            <ul>
              <li><strong>កាត់បន្ថយពេលវេលាឆ្លើយតប៖</strong> បង្រួមពេលវេលាចាប់ពីពេលកំហុសកើតឡើងរហូតដល់រកឃើញ ពីច្រើនម៉ោង/ថ្ងៃ មកត្រឹមប៉ុន្មានវិនាទី។</li>
              <li><strong>លុបបំបាត់បំរែបំរួល៖</strong> កាត់បន្ថយគម្លាតក្នុងការដំឡើង ភាពសឹកនៃផ្លែកាត់ ការច្រឡំឡូត៍ និងកំហុសរើសដោយដៃ។</li>
              <li><strong>ការវាយតម្លៃរយៈពេលរួចដើម៖</strong> ប្រៀបធៀបទុនវិនិយោគដំបូង ទៅនឹងប្រាក់សន្សំប្រចាំខែជាក់ស្តែង (ដោយរាប់បញ្ចូលទាំងថ្លៃថែទាំ និងការបណ្តុះបណ្តាល)។</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle purple-icon">🧮</span>
              <h3>ឧទាហរណ៍គណនារយៈពេលរួចដើមលើ Jig</h3>
            </div>
            <p><strong>គម្រោង៖</strong> ដំឡើងឧបករណ៍ Jig ទប់កុំឱ្យដាក់ខុស (Keyed fixture) នៅដំណាក់កាលតម្លើង។</p>
            <table class="data-table" style="margin: 10px 0;">
              <tbody>
                <tr>
                  <td>ទុនវិនិយោគធ្វើ Jig មួយដង៖</td>
                  <td style="text-align: right; font-weight: 700;">THB 40,000</td>
                </tr>
                <tr>
                  <td>ប្រាក់សន្សំបានពីការកាត់បន្ថយ Scrap៖</td>
                  <td style="text-align: right; color: var(--color-success-light); font-weight: 700;">+ THB 10,000 / ខែ</td>
                </tr>
                <tr>
                  <td>ថ្លៃថែទាំ &amp; ប្រតិបត្តិការ Jig៖</td>
                  <td style="text-align: right; color: var(--color-danger-light); font-weight: 700;">- THB 1,000 / ខែ</td>
                </tr>
                <tr style="border-top: 2px solid var(--border-strong); background: rgba(255,255,255,0.04);">
                  <td><strong>ប្រាក់សន្សំសុទ្ធប្រចាំខែ៖</strong></td>
                  <td style="text-align: right; font-weight: 800; color: var(--color-success-light);">THB 9,000 / ខែ</td>
                </tr>
              </tbody>
            </table>
            <div class="callout-box green-box">
              <strong>រយៈពេលរួចដើម (Payback):</strong> 40,000 / 9,000 &approx; <strong>៤.៤ ខែ!</strong><br>
              បន្ទាប់ពី ៤ ខែកន្លះ ឧបករណ៍នេះនឹងបង្កើតជាប្រាក់ចំណេញសុទ្ធត្រឡប់មកវិញរៀងរាល់ខែ។
            </div>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ:</strong></p>
        <p>បង្ហាញថ្នាក់ដឹកនាំរោងចក្រដោយប្រើតួលេខនេះ! វិស្វករតែងតែត្អូញត្អែរថា "គ្មានថវិកាធ្វើ Poka-yoke" ប៉ុន្តែនៅពេលបង្ហាញរយៈពេលរួចដើមត្រឹម ៤.៤ ខែ ថ្នាក់ដឹកនាំនឹងអនុម័តភ្លាមៗ។</p>
      `
    },

    'slide-15': {
      title: 'ម៉ូឌុលទី ៣៖ មូលដ្ឋានគ្រឹះ QA Network',
      segment: '១០:៤៥ - ១២:០០',
      content: `
        <div class="slide-header">
          <span class="section-tag green-tag">ម៉ូឌុលទី ៣ — មូលដ្ឋានគ្រឹះ QA NETWORK</span>
          <h2 class="slide-title">តើអ្វីទៅជា QA Network?</h2>
          <p class="slide-lead">ផែនទីដែលតភ្ជាប់តាមដំណើរការផលិត ដើម្បីបង្ហាញពីកំហុសសក្តានុពល ផលប៉ះពាល់ និងយន្តការការពារ។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">🌐</span>
              <h3>រចនាសម្ព័ន្ធស្នូលនៃបណ្តាញ (Network)</h3>
            </div>
            <p>QA Network ខុសប្លែកទាំងស្រុងពីតារាងស្តង់ដារធម្មតា៖</p>
            <ul>
              <li><strong>ចំណុចតភ្ជាប់តាមដំណើរការ (Nodes):</strong> គ្រប់ចំណុចនីមួយៗតំណាងឱ្យដំណាក់កាលផលិតកម្មពិតប្រាកដដែលតភ្ជាប់គ្នាតាមលំដាប់លំដោយ។</li>
              <li><strong>ខ្សែផ្លូវនៃកំហុស (Defect Pathways):</strong> បង្ហាញយ៉ាងច្បាស់ពីរបៀបដែលកំហុសត្រូវបានបង្កើតឡើង រុញបន្តទៅមុខ រកឃើញ ឬរបូតចេញ។</li>
              <li><strong>ការរៀបចំរបាំងការពារពហុជាន់៖</strong> នៅគ្រប់ជំហាន ត្រូវកត់ត្រាការទប់ស្កាត់ការកើតឡើង ការចាប់បញ្ហា ការឆ្លើយតប និងអ្នកទទួលខុសត្រូវ។</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle amber-icon">🔄</span>
              <h3>ឧទាហរណ៍លំហូរក្នុងរោងចក្រ</h3>
            </div>
            <p>ពិនិត្យមើលដំណើរការផលិតគ្រឿងដែកតម្រង់ទិស៖</p>
            <div class="pipeline-container" style="flex-direction: column; align-items: stretch; gap: 8px;">
              <div style="display: flex; justify-content: space-between; font-size: 0.85rem; padding: 6px 10px; background: rgba(255,255,255,0.05); border-radius: 4px;">
                <span>១០. ពិនិត្យវត្ថុធាតុដើម</span> <span>&rarr;</span> <span>២០. កាត់ម៉ាស៊ីន CNC</span> <span>&rarr;</span> <span>៣០. ខាត់គែមមុត</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.85rem; padding: 6px 10px; background: rgba(255,255,255,0.05); border-radius: 4px;">
                <span>៤០. លាងសម្អាត</span> <span>&rarr;</span> <span>៥០. វាស់ទំហំ</span> <span>&rarr;</span> <span>៦០. វេចខ្ចប់</span>
              </div>
            </div>
            <div class="callout-box red-box" style="margin-top: 12px;">
              <strong>គ្រោះថ្នាក់នៃខ្សែផ្លូវ៖</strong> គែមមុតដែលកើតនៅជំហាន ២០ (CNC) អាចឆ្លងកាត់ការលាងសម្អាត រហូតដល់ការវេចខ្ចប់ និងទៅដល់ដៃអតិថិជនបានយ៉ាងងាយ! QA Network នឹងលាតត្រដាងចន្លោះប្រហោងនេះភ្លាមៗ។
            </div>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១០:៤៥ - ១១:០០):</strong></p>
        <p>ពន្យល់ពាក្យថា "Network" (បណ្តាញ)។ ហេតុអ្វីបានជាគេហៅថា Network? ពីព្រោះដំណាក់កាលមួយមានឥទ្ធិពលលើដំណាក់កាលបន្ទាប់។ កំហុសនៅជំហានទីមួយអាចធ្វើឱ្យរបាំងនៅជំហានទីបួនបរាជ័យ។</p>
      `
    },

    'slide-16': {
      title: 'លក្ខខណ្ឌតម្រូវស្នូលទាំង ៣ ក្នុងការអនុវត្ត',
      segment: '១០:៤៥ - ១២:០០',
      content: `
        <div class="slide-header">
          <span class="section-tag green-tag">ម៉ូឌុលទី ៣ — លក្ខខណ្ឌចាំបាច់</span>
          <h2 class="slide-title">លក្ខខណ្ឌតម្រូវស្នូលទាំង ៣ ក្នុងការអនុវត្ត QA Network</h2>
          <p class="slide-lead">លក្ខខណ្ឌចាំបាច់ដែលត្រូវតែបំពេញ មុនពេលចាប់ផ្តើមរៀបចំប្រព័ន្ធ QA Network។</p>
        </div>

        <div class="grid-3">
          <div class="concept-card" style="border-top: 4px solid var(--qa-primary);">
            <div class="card-icon-header">
              <span class="card-icon-circle">1</span>
              <h3>អនុវត្តមុនពេលបញ្ហាកើតឡើង</h3>
            </div>
            <p>
              QA Network មិនមែនជារបាយការណ៍កោសល្យវិច័យសពក្រោយពេលជួបគ្រោះថ្នាក់នោះទេ! វាត្រូវតែអនុវត្តជាមុននៅពេលចាប់ផ្តើមផលិតផលថ្មី ប្តូរខ្សែសង្វាក់ ឬកែប្រែបច្ចេកទេស ដើម្បីទប់ស្កាត់បញ្ហាមុនពេលទំនិញត្រូវបានបញ្ជូនចេញ។
            </p>
          </div>

          <div class="concept-card" style="border-top: 4px solid var(--color-success);">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">2</span>
              <h3>បង្កើតក្រុមចម្រុះមុខងារ (Cross-Functional)</h3>
            </div>
            <p>
              ផ្នែកគុណភាពមិនអាចធ្វើការតែឯងក្នុងបន្ទប់ម៉ាស៊ីនត្រជាក់បានទេ។ ក្រុមការងារត្រូវតែរួមបញ្ចូល <strong>បុគ្គលិកផ្នែកផលិតកម្ម</strong>, <strong>វិស្វករដំណើរការ (PE)</strong>, <strong>ផ្នែកគុណភាព (QA/QC)</strong>, និង <strong>ផ្នែកថែទាំ (Maintenance)</strong>។
            </p>
          </div>

          <div class="concept-card" style="border-top: 4px solid var(--color-warning);">
            <div class="card-icon-header">
              <span class="card-icon-circle amber-icon">3</span>
              <h3>ឈរលើស្ថានភាពពិតនៅរោងចក្រ (Go &amp; See)</h3>
            </div>
            <p>
              ហាមដាច់ខាតការបំពេញតារាងនៅក្នុងការិយាល័យ! ការវិភាគត្រូវតែឈរលើស្ថានភាពពិតជាក់ស្តែងនៅកន្លែងផលិត — <em>Genchi Genbutsu (ចុះទៅមើលផ្ទាល់)</em> — មើលវដ្តផលិតពិត ការសឹកឧបករណ៍ពិត និងការប្រគល់វេនពិត។
            </p>
          </div>
        </div>

        <div class="callout-box green-box" style="margin-top: 20px;">
          <strong>រូបមន្តសង្ខេប៖</strong> ពេលវេលាទប់ស្កាត់ជាមុន + ក្រុមចម្រុះមុខងារ + ការពិតជាក់ស្តែងនៅរោងចក្រ = ប្រព័ន្ធគុណភាពដ៏រឹងមាំបំផុត!
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១១:០០ - ១១:១៥):</strong></p>
        <p>សង្កត់ធ្ងន់ចំណុចទី ៣៖ "Go & See (Genchi Genbutsu)"។ ប្រសិនបើវិស្វករគ្រាន់តែអង្គុយសរសេរក្នុងកុំព្យូទ័រដោយមិនចុះទៅមើលម៉ាស៊ីន នោះតារាង QA Network នឹងក្លាយជាក្រដាសឥតប្រយោជន៍។</p>
      `
    },

    'slide-17': {
      title: 'សាជីជ្រុងថ្លៃដើម៖ ច្បាប់ ១-៣០-៣០០-៣០០០',
      segment: '១០:៤៥ - ១២:០០',
      content: `
        <div class="slide-header">
          <span class="section-tag green-tag">ម៉ូឌុលទី ៣ — ច្បាប់នៃការរីករាលដាល</span>
          <h2 class="slide-title">ច្បាប់នៃការរីករាលដាល ១-៣០-៣០០-៣០០០</h2>
          <p class="slide-lead">កម្ចាត់ចំណុចខ្សោយតាំងពីនៅនឹងម៉ាស៊ីន មុនពេលបញ្ហារាលដាលចុះទៅក្នុងខ្សែច្រវាក់ផ្គត់ផ្គង់។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle red-icon">🔺</span>
              <h3>កម្រិតនៃការខាតបង់តាមសាជីជ្រុង</h3>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px; margin: 12px 0;">
              <div style="background: rgba(239, 68, 68, 0.3); border: 1px solid var(--color-danger); padding: 12px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                <span><strong>កម្រិត A៖ អ្នកប្រើប្រាស់ចុងក្រោយ (End User)</strong></span>
                <span class="badge-pill" style="background: #ef4444; color: #fff;">ផលធៀប៖ ១</span>
              </div>
              <div style="background: rgba(245, 158, 11, 0.25); border: 1px solid var(--color-warning); padding: 12px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                <span><strong>កម្រិត B៖ រោងចក្រផ្គុំរថយន្ត (Vehicle Plant / OEM)</strong></span>
                <span class="badge-pill" style="background: #f59e0b; color: #fff;">ផលធៀប៖ ៣០</span>
              </div>
              <div style="background: rgba(2, 132, 199, 0.2); border: 1px solid var(--qa-primary); padding: 12px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                <span><strong>កម្រិត C៖ ការពិនិត្យចុងក្រោយរបស់អ្នកផ្គត់ផ្គង់ (Final Check)</strong></span>
                <span class="badge-pill" style="background: #0284c7; color: #fff;">ផលធៀប៖ ៣០០</span>
              </div>
              <div style="background: rgba(16, 185, 129, 0.2); border: 1px solid var(--color-success); padding: 12px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                <span><strong>កម្រិត D៖ ក្នុងដំណើរការផលិតផ្ទាល់ (Production Node)</strong></span>
                <span class="badge-pill" style="background: #10b981; color: #fff;">ផលធៀប៖ ៣០០០</span>
              </div>
            </div>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">🛡️</span>
              <h3>យុទ្ធសាស្ត្រប្រតិបត្តិការស្នូល</h3>
            </div>
            <p>
              ប្រសិនបើបញ្ហារបូតទៅដល់ <strong>កម្រិត A</strong> ក្រុមហ៊ុននឹងប្រឈមនឹងការប្រមូលទំនិញមកវិញទូទាំងប្រទេស បណ្តឹងផ្លូវច្បាប់ និងការបាត់បង់ជីវិតមនុស្ស។
            </p>
            <p>
              ប្រសិនបើទៅដល់ <strong>កម្រិត B</strong> រោងចក្រដំឡើងរថយន្តនឹងបញ្ឈប់ខ្សែសង្វាក់ ពិន័យជាទឹកប្រាក់រាប់ម៉ឺនដុល្លារ និងចេញលិខិតព្រមានធ្ងន់ធ្ងរ។
            </p>
            <div class="callout-box green-box" style="margin-top: 14px;">
              <strong>យុទ្ធសាស្ត្រសកម្មភាព៖</strong><br>
              ១. <em>កុំរង់ចាំ</em> ឱ្យបញ្ហាកើតឡើងនៅកម្រិត A ឬ B ឱ្យសោះ!<br>
              ២. លុបបំបាត់ចំណុចខ្សោយនៅកម្រិត C និង D ជាជំហានៗឱ្យអស់ពីប្រព័ន្ធ!
            </div>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១១:១៥ - ១១:៣០):</strong></p>
        <p>ពន្យល់ពីតួលេខ ១-៣០-៣០០-៣០០០ ក្នុងស្លាយទី ១២ នៃឯកសារដើម។ បញ្ហា ១ នៅដៃអតិថិជន ស្មើនឹងបញ្ហា ៣០ នៅរោងចក្រដំឡើង ស្មើនឹងបញ្ហា ៣០០ នៅដំណាក់កាល QC និងស្មើនឹង ៣០០០ នៅលើខ្សែសង្វាក់។</p>
      `
    },

    'slide-18': {
      title: 'គោលបំណងទាំង ៥ & ធាតុចូលអនុវត្តជាក់ស្តែង',
      segment: '១០:៤៥ - ១២:០០',
      content: `
        <div class="slide-header">
          <span class="section-tag green-tag">ម៉ូឌុលទី ៣ — គោលបំណង &amp; ភស្តុតាង</span>
          <h2 class="slide-title">គោលបំណងស្នូលទាំង ៥ &amp; ធាតុចូលអនុវត្តជាក់ស្តែង</h2>
          <p class="slide-lead">កសាងបណ្តាញធានាគុណភាពលើមូលដ្ឋានប្លង់បច្ចេកទេសត្រឹមត្រូវ និងភស្តុតាងរឹងមាំ។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">🎯</span>
              <h3>គោលបំណងស្នូលទាំង ៥ (Purpose)</h3>
            </div>
            <ul>
              <li><strong>១. កំណត់ &amp; វាយតម្លៃ៖</strong> រកឱ្យឃើញរាល់បញ្ហាសក្តានុពល និងផលវិបាករបស់វា។</li>
              <li><strong>២. លុបបំបាត់ / កាត់បន្ថយ៖</strong> បញ្ចុះលទ្ធភាពនៃការកើតកំហុសនៅប្រភពដើម។</li>
              <li><strong>៣. កត់ត្រាចំណេះដឹង (Know-how):</strong> រក្សាទុកចំណេះដឹងផលិតកម្មសម្រាប់ខ្សែសង្វាក់ជំនាន់ក្រោយ។</li>
              <li><strong>៤. កែលម្អជាបន្តបន្ទាប់៖</strong> ជំរុញការទប់ស្កាត់បញ្ហាតាមវដ្ត PDCA ជាប់ជានិច្ច។</li>
              <li><strong>៥. ការពារដំណាក់កាលបន្ទាប់៖</strong> ធានាថាគ្មានគ្រឿងខូចធ្លាយទៅដំណាក់កាលបន្ទាប់ ឬអតិថិជន។</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle">📋</span>
              <h3>ធាតុចូលជាក់ស្តែងដែលត្រូវមាន</h3>
            </div>
            <ul>
              <li><strong>Process Flow &amp; Control Plan:</strong> កំណែកែប្រែចុងក្រោយបំផុត។</li>
              <li><strong>ប្លង់បច្ចេកទេស (Drawings):</strong> លក្ខណៈបច្ចេកទេស និងកម្រិតលម្អៀង GD&amp;T។</li>
              <li><strong>សេចក្តីណែនាំការងារ (WI):</strong> ស្តង់ដារដែលបុគ្គលិកកំពុងប្រើប្រាស់ជាក់ស្តែង។</li>
              <li><strong>កំណត់ត្រាកំហុស៖</strong> ទិន្នន័យ Scrap ពាក្យបណ្តឹងអតិថិជន និងកំណត់ត្រាវេនការងារ។</li>
              <li><strong>ការព្រមព្រៀងលើនិយមន័យពិន្ទុ៖</strong> កំណត់និយមន័យរួម ដើម្បីកុំឱ្យដាក់ពិន្ទុខុសគ្នា។</li>
            </ul>
          </div>
        </div>

        <div class="callout-box amber-box" style="margin-top: 16px;">
          <strong>ឧទាហរណ៍នៃការក្រិតការយល់ដឹង៖</strong> ក្រុមពីរបានដាក់ពិន្ទុលើ "កម្លាំងរមួល Torque ខុស" ខុសគ្នាទាំងស្រុង ពីព្រោះក្រុមមួយគិតដល់សុវត្ថិភាពគ្រោះថ្នាក់ចរាចរណ៍ ខណៈដែលក្រុមមួយទៀតគិតតែថ្លៃកែច្នៃប៉ុណ្ណោះ។ ការព្រមព្រៀងលើនិយមន័យជាមុន ជួយលុបបំបាត់ភាពលម្អៀងនេះ!
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១១:៣០ - ១១:៤៥):</strong></p>
        <p>សង្កត់ធ្ងន់លើសារៈសំខាន់នៃការកត់ត្រា Know-how។ កម្មករចាស់ៗចាកចេញទៅ ចំណេះដឹងក៏បាត់បង់តាម។ QA Network ជួយរក្សាចំណេះដឹងនេះទុកក្នុងប្រព័ន្ធរោងចក្រជារៀងរហូត។</p>
      `
    },

    'slide-19': {
      title: 'ការកំណត់វិសាលភាព & ព្រំដែននៃ QA Network',
      segment: '១០:៤៥ - ១២:០០',
      content: `
        <div class="slide-header">
          <span class="section-tag green-tag">ម៉ូឌុលទី ៣ — ការកំណត់ព្រំដែន</span>
          <h2 class="slide-title">ការកំណត់វិសាលភាព &amp; ព្រំដែននៃ QA Network</h2>
          <p class="slide-lead">រក្សាព្រំដែនវិភាគឱ្យមានអត្ថន័យគ្រប់គ្រាន់ ដើម្បីឈានទៅរកសកម្មភាពវិស្វកម្មជាក់ស្តែង។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle">🔍</span>
              <h3>ពេលណាដែលត្រូវប្រើប្រាស់ QA Network</h3>
            </div>
            <ul>
              <li><strong>១. ផលិតផលថ្មី &amp; ដំណើរការថ្មី៖</strong> បង្កើតប្រព័ន្ធការពារកំហុសតាំងពីដំណាក់កាល APQP / Launch។</li>
              <li><strong>២. ដំណើរការដែលមានការកែប្រែ (ការផ្លាស់ប្តូរ 4M):</strong> ពេលមានការដូរពុម្ព វត្ថុធាតុ ឬវិធីសាស្ត្រ។</li>
              <li><strong>៣. ផលិតផល ឬដំណើរការដែលត្រូវការការធានាខ្ពស់៖</strong> ខ្សែសង្វាក់ដែលមាន Scrap ច្រើន ឬមានបណ្តឹងពីអតិថិជន។</li>
              <li><strong>៤. គ្រប់ដំណាក់កាលផលិតកម្ម៖</strong> ការធានាគុណភាពត្រូវតែបង្កប់ក្នុងគ្រប់ប្រតិបត្តិការ មិនមែនតែការពិនិត្យចុងក្រោយនោះទេ។</li>
              <li><strong>៥. ការទប់ស្កាត់ជាមុន៖</strong> ពង្រឹង QA មានន័យថាការពារកុំឱ្យកើត មិនមែនគ្រាន់តែមកកែក្រោយពេលវាកើតឡើងនោះឡើយ។</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle purple-icon">🔄</span>
              <h3>ការគ្រប់គ្រងចំណុចតភ្ជាប់ខាងក្រៅ (Interfaces)</h3>
            </div>
            <p>
              កំណត់ជំហានចាប់ផ្តើម និងបញ្ចប់ឱ្យច្បាស់លាស់ រង្វិលជុំនៃការកែច្នៃ (Rework loops) និងប្រតិបត្តិការដែលជួលគេធ្វើខាងក្រៅ (Outsourced)។ ហាមលាក់បាំងចំណុចតភ្ជាប់ខាងក្រៅ (ដូចជាការជួលគេស្រោបកម្រាល ឬដុតកម្ដៅ) ដែលអាចបណ្តាលឱ្យច្រឡំសម្ភារ ឬបាត់ដានប្រវត្តិ។
            </p>
            <div class="callout-box" style="margin-top: 14px;">
              <strong>ឧទាហរណ៍វិសាលភាព៖</strong> ការទទួលគ្រាប់ជ័រ &rarr; សម្ងួត &rarr; ចាក់ពុម្ព &rarr; ដោតម្ជុល &rarr; តេស្តភ្លើង &rarr; វេចខ្ចប់។ ការជួលគេស្រោបកម្រាលម្ជុលខាងក្រៅ ត្រូវតែមានការត្រួតពិនិត្យទទួលច្បាស់លាស់។
            </div>
            <div class="callout-box red-box" style="margin-top: 10px;">
              <strong>ច្បាប់កាតព្វកិច្ច៖</strong> រាល់ពេលមានបញ្ហាកើតឡើងក្នុងផលិតកម្ម វិធានការកែតម្រូវត្រូវតែយកមកបញ្ចូលទៅក្នុងតារាង QA Network ឡើងវិញជាដាច់ខាត!
            </div>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១១:៤៥ - ១២:០០):</strong></p>
        <p>សង្កត់ធ្ងន់លើ "ចំណាំ (Note)": រាល់ពេលមានបញ្ហាកើតឡើង ត្រូវតែបញ្ចូលវិធានការកែលម្អទៅក្នុង QA Network។ បើមិនដូច្នោះទេ QA Network នឹងក្លាយជាឯកសារស្លាប់។</p>
      `
    },

    'slide-20': {
      title: 'ការរួមបញ្ចូលឧបករណ៍៖ PFMEA, Control Plan & QA Network',
      segment: '១០:៤៥ - ១២:០០',
      content: `
        <div class="slide-header">
          <span class="section-tag green-tag">ម៉ូឌុលទី ៣ — ការស៊ីសង្វាក់គ្នានៃឧបករណ៍</span>
          <h2 class="slide-title">ការរួមបញ្ចូលឧបករណ៍៖ Process Flow, PFMEA, Control Plan &amp; QA Network</h2>
          <p class="slide-lead">ប្រើប្រាស់ឯកសារគ្រប់គ្រងហានិភ័យ និងដំណើរការដែលមានស្រាប់ឱ្យស៊ីសង្វាក់គ្នា ដោយគ្មានការស្ទួនការងារ។</p>
        </div>

        <div class="pipeline-container">
          <div class="pipeline-step">
            <div class="pipeline-badge">1</div>
            <div class="pipeline-label">Process Flow</div>
          </div>
          <span class="pipeline-arrow">&rarr;</span>
          <div class="pipeline-step">
            <div class="pipeline-badge">2</div>
            <div class="pipeline-label">PFMEA</div>
          </div>
          <span class="pipeline-arrow">&rarr;</span>
          <div class="pipeline-step">
            <div class="pipeline-badge">3</div>
            <div class="pipeline-label">Control Plan</div>
          </div>
          <span class="pipeline-arrow">&rarr;</span>
          <div class="pipeline-step active-step">
            <div class="pipeline-badge" style="background: var(--color-success);">4</div>
            <div class="pipeline-label" style="color: var(--color-success-light);">QA Network</div>
          </div>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle">📚</span>
              <h3>តួនាទីបំពេញបន្ថែមនៃឧបករណ៍នីមួយៗ</h3>
            </div>
            <ul>
              <li><strong>Process Flow:</strong> កំណត់លំដាប់លំដោយនៃប្រតិបត្តិការ និងការរត់នៃគ្រឿងបន្លាស់។</li>
              <li><strong>PFMEA:</strong> វិភាគទម្រង់នៃការបរាជ័យ មូលហេតុ និងផលប៉ះពាល់តាមទ្រឹស្តី។</li>
              <li><strong>Control Plan:</strong> ចងក្រងលក្ខណៈផលិតផល វិធីសាស្ត្រពិនិត្យ ភាពញឹកញាប់ និងផែនការឆ្លើយតប។</li>
              <li><strong>QA Network:</strong> ជាស្ពានតភ្ជាប់រវាងក្រដាស និងការអនុវត្តពិត! បង្ហាញពីរបាំងដែលតភ្ជាប់គ្នា និងផ្ទៀងផ្ទាត់ថាតើវិធានការក្នុង Control Plan កំពុងដំណើរការជាក់ស្តែងលើដីរោងចក្រឬអត់។</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle amber-icon">⚡</span>
              <h3>ឧទាហរណ៍គម្លាតរវាងក្រដាស និងការពិត</h3>
            </div>
            <div class="callout-box" style="margin-bottom: 8px;">
              <strong>PFMEA:</strong> កត់ត្រាបញ្ហាសក្តានុពល "បាត់រ៉ង O-ring" ថាជាហានិភ័យធ្ងន់ធ្ងរ។
            </div>
            <div class="callout-box" style="margin-bottom: 8px;">
              <strong>Control Plan:</strong> ចែងថា "ត្រូវពិនិត្យដោយកាមេរ៉ាស្វ័យប្រវត្តិ" ១០០%។
            </div>
            <div class="callout-box red-box">
              <strong>ការចុះសង្កេត QA Network ជាក់ស្តែង៖</strong> បានរកឃើញថាកាមេរ៉ានោះត្រូវបានជាងម៉ាស៊ីនបិទកុងតាក់ចោលអំឡុងពេលជួសជុលម៉ាស៊ីន ហើយមិនបានបើកឡើងវិញទេ ធ្វើឱ្យខ្សែសង្វាក់គ្មានការការពារទាល់តែសោះ!
            </div>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ:</strong></p>
        <p>សង្កត់ធ្ងន់លើឧទាហរណ៍ "O-ring" និងកាមេរ៉ា។ នៅក្នុងឯកសារ Control Plan មើលទៅល្អឥតខ្ចោះណាស់ ប៉ុន្តែពេលដើរមើលជាក់ស្តែង កាមេរ៉ាត្រូវបានបិទចោល។ នេះហើយជាមូលហេតុដែលយើងត្រូវការ QA Network!</p>
      `
    },

    'slide-21': {
      title: 'វដ្ត PDCA នៅក្នុង QA Network',
      segment: '១០:៤៥ - ១២:០០',
      content: `
        <div class="slide-header">
          <span class="section-tag green-tag">ម៉ូឌុលទី ៣ — ការកែលម្អជាបន្តបន្ទាប់</span>
          <h2 class="slide-title">វដ្ត PDCA នៅក្នុងការអនុវត្ត QA Network</h2>
          <p class="slide-lead">រៀបចំផែនការ អនុវត្ត ផ្ទៀងផ្ទាត់ និងធ្វើឱ្យក្លាយជាស្តង់ដារ ដើម្បីរក្សាគុណភាពជាអចិន្ត្រៃយ៍។</p>
        </div>

        <div class="grid-4">
          <div class="concept-card" style="border-top: 4px solid var(--qa-primary);">
            <div class="card-icon-header">
              <span class="card-icon-circle">P</span>
              <h3>PLAN (រៀបចំផែនការ)</h3>
            </div>
            <p><strong>កំណត់បញ្ហា &amp; គោលដៅ៖</strong></p>
            <ul>
              <li>បញ្ជាក់កំហុស ទីតាំង រយៈពេល និងទំហំខាតបង់។</li>
              <li>បញ្ជាក់ព្រំដែនដំណើរការ និងខ្សែផ្លូវសង្ស័យ។</li>
              <li>កំណត់គោលដៅ អ្នកទទួលខុសត្រូវ និងកាលបរិច្ឆេទ។</li>
            </ul>
          </div>

          <div class="concept-card" style="border-top: 4px solid var(--color-warning);">
            <div class="card-icon-header">
              <span class="card-icon-circle amber-icon">D</span>
              <h3>DO (អនុវត្តសាកល្បង)</h3>
            </div>
            <p><strong>សាកល្បងវិធានការកែលម្អ៖</strong></p>
            <ul>
              <li>សាកល្បងឧបករណ៍ Poka-yoke ក្នុងទំហំកំណត់។</li>
              <li>បណ្តុះបណ្តាលបុគ្គលិក និងកែសម្រួល WI នៅកន្លែងធ្វើការ។</li>
              <li>កត់ត្រាកាលបរិច្ឆេទ លេខកូដគ្រឿង និងលទ្ធផលតេស្ត។</li>
            </ul>
          </div>

          <div class="concept-card" style="border-top: 4px solid var(--color-success);">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">C</span>
              <h3>CHECK (ផ្ទៀងផ្ទាត់លទ្ធផល)</h3>
            </div>
            <p><strong>បញ្ជាក់ថាវិធានការដំណើរការ៖</strong></p>
            <ul>
              <li>ប្រៀបធៀបអត្រាកំហុស មុន vs ក្រោយកែលម្អ។</li>
              <li>បញ្ជាក់ថាមិនមានកំហុសថ្មីដែលអចេតនាកើតឡើង។</li>
              <li>ចុះពិនិត្យឧបករណ៍ការពារផ្ទាល់ មិនមែនមើលតែក្រដាស!</li>
            </ul>
          </div>

          <div class="concept-card" style="border-top: 4px solid var(--color-purple);">
            <div class="card-icon-header">
              <span class="card-icon-circle purple-icon">A</span>
              <h3>ACT (ធ្វើជាស្តង់ដារ)</h3>
            </div>
            <p><strong>ស្តង់ដារ &amp; ពង្រីកការអនុវត្ត៖</strong></p>
            <ul>
              <li>កែប្រែឯកសារស្តង់ដារ PFMEA &amp; Control Plan។</li>
              <li>ធ្វើបច្ចុប្បន្នភាពឯកសារបណ្តុះបណ្តាលបុគ្គលិកថ្មី។</li>
              <li>យកគំរូ Poka-yoke ជោគជ័យទៅបំពាក់លើខ្សែស្របគ្នា។</li>
            </ul>
          </div>
        </div>

        <div class="callout-box" style="margin-top: 16px;">
          <strong>ការព្រមានអំពីបរិមាណតេស្ត៖</strong> ក្រោយពេលបំពាក់សេនស័រ គ្មានកំហុសកើតឡើងសោះក្នុងរយៈពេល ៦ សប្តាហ៍ ប៉ុន្តែផលិតផលទើបតែផលិតបាន ៣០ គ្រឿងប៉ុណ្ណោះ បើធៀបនឹង ១០,០០០ គ្រឿងពីមុន។ លទ្ធផលនេះមិនទាន់អាចជឿជាក់បានទេ បើគ្មានបរិមាណផលិតស្មើគ្នាដើម្បីធ្វើតេស្ត!
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ:</strong></p>
        <p>ពន្យល់ពីឧទាហរណ៍ ៣០ គ្រឿង vs ១០,០០០ គ្រឿង។ កុំប្រញាប់ប្រកាសថា "ជោគជ័យ" ប្រសិនបើចំនួនផលិតផលដែលរត់កាត់សេនស័រនៅតិចពេក។</p>
      `
    },

    'slide-22': {
      title: 'ផែនទីបង្ហាញផ្លូវ ៥ ជំហាន & ១១ ជំហានរងនៃ QA Network',
      segment: '១៣:០០ - ១៤:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag amber-tag">ផែនទីបង្ហាញផ្លូវនៃវិធីសាស្ត្រ</span>
          <h2 class="slide-title">ជំហានស្នូលទាំង ៥ &amp; ១១ ជំហានរងនៃ QA Network</h2>
          <p class="slide-lead">នីតិវិធីលម្អិតជាជំហានៗ ដើម្បីវាយតម្លៃហានិភ័យ កំណត់គោលដៅ និងផ្ទៀងផ្ទាត់ការកែលម្អ។</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 10px;">
          <div class="concept-card" style="padding: 14px 20px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-weight: 800; color: var(--qa-primary-light);">STEP # 1: ការវិភាគមូលដ្ឋាន &amp; ការកំណត់គោលដៅ</span>
              <span class="badge-pill">ជំហានរង ១ ដល់ ៥</span>
            </div>
            <p style="margin: 6px 0 0 0; font-size: 0.88rem;">១. ពិនិត្យ QC Process Chart &bull; ២. កំណត់បញ្ហាសក្តានុពល (Key Points) &bull; ៣. វិភាគការខូចខាត (Damage Analysis) &bull; ៤. វាយតម្លៃកម្រិតធ្ងន់ធ្ងរ (Ranking S ដល់ C) &bull; ៥. កំណត់កម្រិតគោលដៅ (Target A, B, C)។</p>
          </div>

          <div class="concept-card" style="padding: 14px 20px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-weight: 800; color: var(--color-warning-light);">STEP # 2: ការការពារការកើត ការការពារការធ្លាយ &amp; ម៉ាទ្រីសធានា</span>
              <span class="badge-pill">ជំហានរង ៦ ដល់ ៨</span>
            </div>
            <p style="margin: 6px 0 0 0; font-size: 0.88rem;">៦. វិភាគការការពារការកើតឡើង (Level 1-4) &bull; ៧. វិភាគការការពារការធ្លាយចេញ (Level 1-4) &bull; ៨. វាយតម្លៃកម្រិតធានាគុណភាពសរុប (A ដល់ F តាមម៉ាទ្រីស 4x4)។</p>
          </div>

          <div class="concept-card" style="padding: 14px 20px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-weight: 800; color: var(--color-danger-light);">STEP # 3: ការប្រៀបធៀបគម្លាតធៀបនឹងគោលដៅ</span>
              <span class="badge-pill">ជំហានរង ៩</span>
            </div>
            <p style="margin: 6px 0 0 0; font-size: 0.88rem;">៩. ប្រៀបធៀបកម្រិតគោលដៅ (Target) ធៀបនឹងកម្រិតធានាសរុបបច្ចុប្បន្ន (Total Assurance Level) ដើម្បីរកឱ្យឃើញគម្លាតហានិភ័យ។</p>
          </div>

          <div class="concept-card" style="padding: 14px 20px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-weight: 800; color: var(--color-success-light);">STEP # 4: ការរៀបចំផែនការកែលម្អគុណភាព</span>
              <span class="badge-pill">ជំហានរង ១០</span>
            </div>
            <p style="margin: 6px 0 0 0; font-size: 0.88rem;">១០. រៀបចំផែនការវិធានការកែលម្អ (កែលម្អការទប់ស្កាត់ ការរកឃើញ ឬទាំងពីរ) ជាមួយកាលវិភាគ Gantt chart។</p>
          </div>

          <div class="concept-card" style="padding: 14px 20px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-weight: 800; color: var(--color-purple);">STEP # 5: ការវាយតម្លៃឡើងវិញក្រោយពេលកែលម្អ</span>
              <span class="badge-pill">ជំហានរង ១១</span>
            </div>
            <p style="margin: 6px 0 0 0; font-size: 0.88rem;">១១. វាយតម្លៃពិន្ទុឡើងវិញលើការកើតឡើង ការធ្លាយចេញ និងកម្រិតធានាសរុប ដើម្បីបញ្ជាក់ថាគម្លាតត្រូវបានបិទបញ្ចប់ដោយជោគជ័យ។</p>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១៣:០០ - ១៣:១០):</strong></p>
        <p>សូមស្វាគមន៍សិក្ខាកាមត្រឡប់ពីអាហារថ្ងៃត្រង់! ឥឡូវនេះយើងចូលដល់បេះដូងនៃ QA Network Method ដែលមាន ៥ ជំហានធំ និង ១១ ជំហានរង។</p>
      `
    },

    'slide-23': {
      title: 'ជំហានទី ១៖ ពិនិត្យលំហូរ QC & កំណត់បញ្ហាសក្តានុពល',
      segment: '១៣:០០ - ១៤:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag amber-tag">ជំហានទី ១ &bull; ការកំណត់កំហុស</span>
          <h2 class="slide-title">ជំហានទី ១៖ ពិនិត្យលំហូរ QC &amp; កំណត់បញ្ហាសក្តានុពល</h2>
          <p class="slide-lead">កំណត់បញ្ហាសក្តានុពលដោយឈរលើលក្ខខណ្ឌជាក់ស្តែងនៅរោងចក្រ និងការពិតនៃប្រតិបត្តិការ។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle">🔍</span>
              <h3>ប្រភេទបញ្ហាសក្តានុពលទាំង ២ ប្រភេទ</h3>
            </div>
            <div class="callout-box" style="margin-bottom: 12px;">
              <strong>២.១ កំហុសទាក់ទងនឹងមនុស្ស (Human-Related Defects):</strong><br>
              ការមិនធ្វើតាមសេចក្តីណែនាំការងារ (WI), ការរំលងជំហាន, ការភ្លេចដំឡើងគ្រឿងបន្លាស់, ការដាក់ត្រឡប់ទិស, ឬការដំឡើងខុសម៉ូដែល។
            </div>
            <div class="callout-box red-box">
              <strong>២.២ កំហុសទាក់ទងនឹងដំណើរការ (Process-Related Defects):</strong><br>
              ប៉ារ៉ាម៉ែត្រម៉ាស៊ីនរអិលខុសស្តង់ដារ, សីតុណ្ហភាព/សម្ពាធខុស, ឧបករណ៍ពាក់សឹកហួសកំណត់, ឬគ្រឿងបន្លាស់ហួសកាលបរិច្ឆេទប្រើប្រាស់។
            </div>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle amber-icon">📌</span>
              <h3>ការសន្មតមូលដ្ឋានទាំង ៥ ពេលកំណត់បញ្ហាសក្តានុពល</h3>
            </div>
            <ul>
              <li><strong>១. ហានិភ័យកើតបានគ្រប់ពេល៖</strong> បញ្ហាអាចកើតឡើងគ្រប់ពេលវេលា ទោះបីជាវាមិនដែលធ្លាប់កើតមានពីមុនមកក៏ដោយ!</li>
              <li><strong>២. មិនត្រូវគិតពីប្រព័ន្ធការពារបច្ចុប្បន្ន៖</strong> ពេលស្រង់រកបញ្ហាសក្តានុពល ហាមយកប្រព័ន្ធការពារដែលមានស្រាប់មកគិត។</li>
              <li><strong>៣. ផ្តោតលើដំណើរការផលិតផ្ទាល់៖</strong> មិនរាប់បញ្ចូលការត្រួតពិនិត្យចុងក្រោយទេ លើកលែងតែការត្រួតពិនិត្យនោះខ្លួនឯងអាចធ្វើឱ្យខូចផលិតផល។</li>
              <li><strong>៤. សន្មតថាគ្រឿងពីដំណាក់កាលមុនគឺល្អ៖</strong> ចាត់ទុកថាគ្រឿងបន្លាស់ដែលមកដល់គឺស្របតាមស្តង់ដារ។</li>
              <li><strong>៥. ស្តាប់សំឡេងអតិថិជន៖</strong> ពិនិត្យរាល់បណ្តឹងពីដំណាក់កាលបន្ទាប់ និងពីអតិថិជន។</li>
            </ul>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១៣:១០ - ១៣:២៥):</strong></p>
        <p>សង្កត់ធ្ងន់លើចំណុចសន្មតទី ២៖ "Do not consider existing prevention controls while identifying potential defects"។ វិស្វករច្រើនតែនិយាយថា "ចំណុចនេះមិនបាច់ដាក់ទេ ព្រោះយើងមានសេនស័រការពារហើយ"។ នេះជាការយល់ខុស! ត្រូវស្រង់បញ្ហាទាំងអស់ចេញសិន។</p>
      `
    },

    'slide-24': {
      title: 'ជំហានទី ១៖ ការវិភាគការខូចខាត & និមិត្តសញ្ញាកម្រិតធ្ងន់ធ្ងរ',
      segment: '១៣:០០ - ១៤:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag amber-tag">ជំហានទី ១ &bull; ការវិភាគផលប៉ះពាល់</span>
          <h2 class="slide-title">ជំហានទី ១៖ ការវិភាគការខូចខាត &amp; និមិត្តសញ្ញាកម្រិតធ្ងន់ធ្ងរ</h2>
          <p class="slide-lead">លំដាប់លំដោយពិចារណា៖ ដំណើរការបន្ទាប់ &rarr; អតិថិជន (រោងចក្រដំឡើង) &rarr; អ្នកបើកបររថយន្ត។ (សន្មតថាអតិថិជនគ្មានការត្រួតពិនិត្យឡើយ!)</p>
        </div>

        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 80px; text-align: center;">និមិត្តសញ្ញា</th>
                <th style="width: 220px;">ចំណាត់ថ្នាក់</th>
                <th>និយមន័យវិស្វកម្ម &amp; ឧទាហរណ៍ជាក់ស្តែង</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="text-align: center;"><span class="severity-badge badge-S">S</span></td>
                <td><strong>សុវត្ថិភាព / គ្រោះថ្នាក់ចរាចរណ៍ (Safety)</strong></td>
                <td>អាចបណ្តាលឱ្យមានគ្រោះថ្នាក់ចរាចរណ៍ ដូចជាការលេចធ្លាយប្រេងឥន្ធនៈ ឬប្រព័ន្ធហ្វ្រាំងមិនដំណើរការ។</td>
              </tr>
              <tr>
                <td style="text-align: center;"><span class="severity-badge badge-X">X</span></td>
                <td><strong>រថយន្តឈប់ភ្លាមៗ (ផ្នែកមិនវិល)</strong></td>
                <td>ប៉ះពាល់លើគ្រឿងបន្លាស់មិនមានចលនា ធ្វើឱ្យរថយន្តឈប់ដំណើរការភ្លាមៗ (ឧ. សន្លាក់ជន្ទល់កង់ Knuckle បាក់)។</td>
              </tr>
              <tr>
                <td style="text-align: center;"><span class="severity-badge badge-XA">XA</span></td>
                <td><strong>រថយន្តឈប់ភ្លាមៗ (ផ្នែកមានចលនា)</strong></td>
                <td>ប៉ះពាល់លើគ្រឿងបន្លាស់មានចលនា ធ្វើឱ្យរថយន្តឈប់ភ្លាមៗ (ឧ. ប៉ុងក្រោយ Rear Differential គាំង)។</td>
              </tr>
              <tr>
                <td style="text-align: center;"><span class="severity-badge badge-XB">XB</span></td>
                <td><strong>រថយន្តឈប់ភ្លាមៗ (ដោយសារលេចធ្លាយ)</strong></td>
                <td>ការលេចធ្លាយប្រេង ឬវត្ថុរាវសំខាន់ៗដែលបណ្តាលឱ្យរថយន្តឈប់ដំណើរការភ្លាមៗ។</td>
              </tr>
              <tr>
                <td style="text-align: center;"><span class="severity-badge badge-R">R</span></td>
                <td><strong>ច្បាប់ &amp; បទប្បញ្ញត្តិ (Regulation)</strong></td>
                <td>ខុសពីច្បាប់ ឬបទប្បញ្ញត្តិសុវត្ថិភាពនៃប្រទេស ឬតំបន់របស់អតិថិជន។</td>
              </tr>
              <tr>
                <td style="text-align: center;"><span class="severity-badge badge-E">E</span></td>
                <td><strong>បរិស្ថាន &amp; ការបំភាយឧស្ម័ន (Emissions)</strong></td>
                <td>កំហុសគ្រឿងបន្លាស់បណ្តាលឱ្យរថយន្តបង្កើតការបំពុលបរិស្ថាន ឬឧស្ម័នពុលលើសកម្រិតកំណត់។</td>
              </tr>
              <tr>
                <td style="text-align: center;"><span class="severity-badge badge-V">V</span></td>
                <td><strong>ប៉ះពាល់ខ្សែសង្វាក់អតិថិជន (Vehicle OEM)</strong></td>
                <td>រកឃើញនៅពេលអតិថិជនកំពុងតម្លើងរថយន្ត (ឧ. ជើងទម្រតម្លើងមិនចូលជាមួយ Lower arm); អតិថិជនប្តឹង Claim។</td>
              </tr>
              <tr>
                <td style="text-align: center;"><span class="severity-badge badge-A">A</span></td>
                <td><strong>ផ្នែកវិលខូច តែឡាននៅរត់បាន</strong></td>
                <td>ប៉ះពាល់លើគ្រឿងបន្លាស់មានចលនា ប៉ុន្តែរថយន្តនៅតែអាចបន្តដំណើរការបាន (ឧ. មានសំឡេងរោទ៍ខុសប្រក្រតី)។</td>
              </tr>
              <tr>
                <td style="text-align: center;"><span class="severity-badge badge-B">B</span></td>
                <td><strong>ផ្នែកមិនវិលខូច តែឡាននៅរត់បាន</strong></td>
                <td>រថយន្តនៅតែអាចបន្តដំណើរការបានក្រោយពេលកំហុសកើតឡើង (ឧ. ការជ្រាបប្រេងតិចតួចនៅជុំវិញ Oil seal)។</td>
              </tr>
              <tr>
                <td style="text-align: center;"><span class="severity-badge badge-C">C</span></td>
                <td><strong>រូបរាងខាងក្រៅ / សោភ័ណភាព (Cosmetic)</strong></td>
                <td>រថយន្តនៅតែអាចដំណើរការបានធម្មតា (ឧ. ស្នាមច្រែះពណ៌បៃតងលើកាងក្រូមីញ៉ូមខាងក្រោយ)។</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១៣:២៥ - ១៣:៤០):</strong></p>
        <p>ពន្យល់និមិត្តសញ្ញានីមួយៗឱ្យច្បាស់៖ S, X, XA, XB, R, E, V, A, B, C ដូចមានចែងក្នុងទំព័រ ២១ ដល់ ២៣ នៃឯកសារដើម។ សង្កត់ធ្ងន់៖ ពេលវាយតម្លៃរោងចក្រ OEM ត្រូវសន្មតថាគេមិនពិនិត្យអ្វីទាំងអស់!</p>
      `
    },

    'slide-25': {
      title: 'ជំហានទី ១៖ ការប្តូរកម្រិតធ្ងន់ធ្ងរទៅជាកម្រិតគោលដៅ',
      segment: '១៣:០០ - ១៤:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag amber-tag">ជំហានទី ១ &bull; ការកំណត់កម្រិតគោលដៅ</span>
          <h2 class="slide-title">ជំហានទី ១៖ ការប្តូរកម្រិតធ្ងន់ធ្ងរទៅជាកម្រិតគោលដៅ (Target)</h2>
          <p class="slide-lead">កំណត់កម្រិតធានាគុណភាពជាកាតព្វកិច្ច ដោយផ្អែកលើទំហំនៃភាពធ្ងន់ធ្ងរ។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">🎯</span>
              <h3>តារាងបម្លែងកម្រិតគោលដៅ</h3>
            </div>
            <table class="data-table">
              <thead>
                <tr>
                  <th>កម្រិតភាពធ្ងន់ធ្ងរ (Severity Ranking)</th>
                  <th style="text-align: center;">គោលដៅដែលត្រូវតែសម្រេច (Target)</th>
                </tr>
              </thead>
              <tbody>
                <tr style="background: rgba(239, 68, 68, 0.1);">
                  <td><span class="severity-badge badge-S">S</span> <span class="severity-badge badge-X">X</span> <span class="severity-badge badge-XA">XA</span> <span class="severity-badge badge-XB">XB</span></td>
                  <td style="text-align: center; font-size: 1.5rem; font-weight: 800; color: #34d399;">A</td>
                </tr>
                <tr style="background: rgba(245, 158, 11, 0.1);">
                  <td><span class="severity-badge badge-E">E</span> <span class="severity-badge badge-R">R</span> <span class="severity-badge badge-V">V</span> <span class="severity-badge badge-A">A</span> <span class="severity-badge badge-B">B</span></td>
                  <td style="text-align: center; font-size: 1.5rem; font-weight: 800; color: #38bdf8;">B</td>
                </tr>
                <tr style="background: rgba(255, 255, 255, 0.03);">
                  <td><span class="severity-badge badge-C">C</span></td>
                  <td style="text-align: center; font-size: 1.5rem; font-weight: 800; color: #fbbf24;">C</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle purple-icon">💡</span>
              <h3>ឧទាហរណ៍ជាក់ស្តែងលើប៊ូឡុងហ្វ្រាំងរថយន្ត</h3>
            </div>
            <p><strong>ភាពរឹងនៃគ្រាប់ Nut កៀបហ្វ្រាំង (Brake Caliper Nut):</strong></p>
            <div class="pipeline-container" style="font-size: 0.8rem; padding: 10px;">
              <span>វត្ថុធាតុដើមពី Supplier</span> &rarr;
              <span>កាត់ &amp; ដុតកម្ដៅ</span> &rarr;
              <span>ភាពរឹងមិនដល់ Spec</span> &rarr;
              <span>តម្លើងជាមួយហ្វ្រាំង</span> &rarr;
              <span style="color: #f87171; font-weight: 700;">រលុងកម្លាំង Torque!</span>
            </div>
            <div class="callout-box red-box" style="margin-top: 10px;">
              <strong>ការវិភាគភាពធ្ងន់ធ្ងរ៖</strong> ភាពរឹងមិនដល់ធ្វើឱ្យរលុងខ្ចៅ &rarr; ហ្វ្រាំងមិនដំណើរការ &rarr; កម្រិតធ្ងន់ធ្ងរគឺ <strong>[S]</strong>!<br>
              <strong>គោលដៅជាកាតព្វកិច្ច៖</strong> ដូច្នេះ កម្រិតធានាសរុបដែលត្រូវតែសម្រេចឱ្យបានគឺកម្រិត <strong>"A"</strong> ជាដាច់ខាត។
            </div>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១៣:៤០ - ១៣:៥០):</strong></p>
        <p>បង្ហាញតារាងបម្លែងក្នុងទំព័រ ២៤ នៃឯកសារដើម។ ឱ្យតែជាបញ្ហាសុវត្ថិភាព ឬឡានឈប់ (S, X, XA, XB) គោលដៅត្រូវតែជាកម្រិត "A" ដាច់ខាត គ្មានការយោគយល់ឡើយ។</p>
      `
    },

    'slide-26': {
      title: 'ជំហានទី ២៖ កម្រិតនៃការការពារការកើតឡើង (Level 1 ដល់ 4)',
      segment: '១៣:០០ - ១៤:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag amber-tag">ជំហានទី ២ &bull; ការការពារការកើតឡើង</span>
          <h2 class="slide-title">ជំហានទី ២៖ កម្រិតនៃការការពារការកើតឡើង (Level 1 ដល់ 4)</h2>
          <p class="slide-lead">ការគ្រប់គ្រងដំណើរការដើម្បីទប់ស្កាត់ ឬកាត់បន្ថយការបង្កើតកំហុសផលិតផលនៅនឹងម៉ាស៊ីន។</p>
        </div>

        <div class="grid-4">
          <div class="concept-card" style="border-top: 4px solid var(--color-success);">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">1</span>
              <h3>Level 1</h3>
            </div>
            <p><strong>ឧបករណ៍ស្វ័យប្រវត្តិ ១០០%៖</strong></p>
            <p>មានបំពាក់ឧបករណ៍ការពារ ដែលអាចទប់ស្កាត់កំហុសពីមនុស្ស និងដំណើរការបាន <strong>១០០%</strong> ដោយស្វ័យប្រវត្តិ (ឧ. Jig រាងទប់កុំឱ្យដាក់ខុស, គន្លឹះអគ្គិសនី)។</p>
            <div class="callout-box green-box">ភាពជឿជាក់ខ្ពស់បំផុត</div>
          </div>

          <div class="concept-card" style="border-top: 4px solid var(--qa-primary);">
            <div class="card-icon-header">
              <span class="card-icon-circle">2</span>
              <h3>Level 2</h3>
            </div>
            <p><strong>ឧបករណ៍ដំណើរការដោយមនុស្ស៖</strong></p>
            <p>មានឧបករណ៍ការពារកំហុស ប៉ុន្តែមនុស្សត្រូវតែជាអ្នកបញ្ជា ឬរៀបចំឧបករណ៍នោះ (ឧ. ដងមួល Torque ដែលលាន់ឮសូរ "កិក", គំរូទម្រទប់ដោយដៃ)។</p>
            <div class="callout-box">ឧបករណ៍ + មនុស្ស</div>
          </div>

          <div class="concept-card" style="border-top: 4px solid var(--color-warning);">
            <div class="card-icon-header">
              <span class="card-icon-circle amber-icon">3</span>
              <h3>Level 3</h3>
            </div>
            <p><strong>មនុស្សអនុវត្តតាម WI៖</strong></p>
            <p>គ្មានឧបករណ៍ការពារកំហុសទាល់តែសោះ។ ការការពារអាស្រ័យទាំងស្រុងលើបុគ្គលិកក្នុងការអនុវត្តតាមសេចក្តីណែនាំការងារ (WI) ឱ្យបានត្រឹមត្រូវ។</p>
            <div class="callout-box amber-box">ពឹងលើមនុស្សទាំងស្រុង</div>
          </div>

          <div class="concept-card" style="border-top: 4px solid var(--color-danger);">
            <div class="card-icon-header">
              <span class="card-icon-circle red-icon">4</span>
              <h3>Level 4</h3>
            </div>
            <p><strong>គ្មាន WI ឬដំណើរការខ្វះការគ្រប់គ្រង៖</strong></p>
            <p>គ្មានឧបករណ៍ការពារ ហើយគ្មានសេចក្តីណែនាំ WI ឬមិនបានអនុវត្តតាម ឬដំណើរការមិនអាចទប់ស្កាត់កំហុសបានទាល់តែសោះ។</p>
            <div class="callout-box red-box">ហានិភ័យគ្មានការគ្រប់គ្រង</div>
          </div>
        </div>

        <div class="callout-box green-box" style="margin-top: 16px;">
          <strong>អាទិភាពវិស្វកម្ម៖</strong> ត្រូវផ្តល់អាទិភាពដាច់ខាតទៅលើការការពារដោយម៉ាស៊ីន ឬឧបករណ៍ស្វ័យប្រវត្តិ (Level 1)!
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១៣:៥០ - ១៤:០០):</strong></p>
        <p>ពន្យល់កម្រិតទាំង ៤ នៃ Occurrence Prevention (ទំព័រ ២៤-២៥ នៃឯកសារដើម)។ សង្កត់ធ្ងន់លើភាពខុសគ្នារវាង Level 1 (ម៉ាស៊ីនធ្វើដោយស្វ័យប្រវត្តិ) និង Level 2 (មានឧបករណ៍ តែមនុស្សត្រូវបញ្ជា)។</p>
      `
    },

    'slide-27': {
      title: 'ជំហានទី ២៖ កម្រិតនៃការការពារការធ្លាយចេញ (Level 1 ដល់ 4)',
      segment: '១៣:០០ - ១៤:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag amber-tag">ជំហានទី ២ &bull; ការការពារការធ្លាយចេញ</span>
          <h2 class="slide-title">ជំហានទី ២៖ កម្រិតនៃការការពារការធ្លាយចេញ (Flow-Out)</h2>
          <p class="slide-lead">ការត្រួតពិនិត្យ ឬការចាប់កំហុស ដើម្បីកុំឱ្យផលិតផលខូចរបូតចេញទៅដល់អតិថិជន។</p>
        </div>

        <div class="grid-4">
          <div class="concept-card" style="border-top: 4px solid var(--color-success);">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">1</span>
              <h3>Level 1</h3>
            </div>
            <p><strong>ឧបករណ៍ចាប់ស្វ័យប្រវត្តិ ១០០%៖</strong></p>
            <p>មានបំពាក់ឧបករណ៍ចាប់កំហុស ដែលអាចរកឃើញកំហុសបាន <strong>១០០%</strong> ដោយស្វ័យប្រវត្តិ និងមានប្រព័ន្ធច្រានចោល ឬចាក់សោម៉ាស៊ីនភ្លាមៗ (ឧ. កាមេរ៉ា Vision, ម៉ាស៊ីនតេស្តខ្យល់ស្វ័យប្រវត្តិ)។</p>
            <div class="callout-box green-box">ស្វ័យប្រវត្តិ ១០០%</div>
          </div>

          <div class="concept-card" style="border-top: 4px solid var(--qa-primary);">
            <div class="card-icon-header">
              <span class="card-icon-circle">2</span>
              <h3>Level 2</h3>
            </div>
            <p><strong>ឧបករណ៍វាស់ដោយមនុស្ស៖</strong></p>
            <p>មានឧបករណ៍ចាប់កំហុស ប៉ុន្តែមនុស្សត្រូវតែជាអ្នកកាន់វាស់ ឬដំណើរការឧបករណ៍នោះ (ឧ. កាឡីប Micrometer, ឧបករណ៍វាស់សម្ពាធដោយដៃ)។</p>
            <div class="callout-box">ឧបករណ៍ + មនុស្ស</div>
          </div>

          <div class="concept-card" style="border-top: 4px solid var(--color-warning);">
            <div class="card-icon-header">
              <span class="card-icon-circle amber-icon">3</span>
              <h3>Level 3</h3>
            </div>
            <p><strong>មនុស្សពិនិត្យតាម WI៖</strong></p>
            <p>គ្មានឧបករណ៍ចាប់កំហុសទេ។ ការរកឃើញអាស្រ័យទាំងស្រុងលើបុគ្គលិកក្នុងការមើលដោយភ្នែក ឬស្ទាបតាមនីតិវិធីត្រួតពិនិត្យ។</p>
            <div class="callout-box amber-box">មើលដោយភ្នែក</div>
          </div>

          <div class="concept-card" style="border-top: 4px solid var(--color-danger);">
            <div class="card-icon-header">
              <span class="card-icon-circle red-icon">4</span>
              <h3>Level 4</h3>
            </div>
            <p><strong>គ្មានឧបករណ៍ ឬមិនអាចរកឃើញ៖</strong></p>
            <p>គ្មានឧបករណ៍ចាប់កំហុស ហើយគ្មាននីតិវិធី ឬកំហុសនោះមិនអាចរកឃើញបានទាល់តែសោះមុនពេលដឹកចេញ។</p>
            <div class="callout-box red-box">ច្រករបូតងងឹត</div>
          </div>
        </div>

        <div class="callout-box" style="margin-top: 16px;">
          <strong>អាទិភាពនៃការរកឃើញ៖</strong> ការប្រើប្រាស់ឧបករណ៍ស្វ័យប្រវត្តិ (Level 1) ជួយលុបបំបាត់ភាពនឿយហត់របស់ភ្នែកមនុស្ស និងធានាការទប់ស្កាត់ការធ្លាយចេញបានយ៉ាងពិតប្រាកដ។
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១៤:០០ - ១៤:១០):</strong></p>
        <p>ពន្យល់ពី Flow-Out Prevention (ទំព័រ ២៥-២៦ នៃឯកសារដើម)។ បង្ហាញពីហានិភ័យនៃ Level 3 ដែលពឹងលើភ្នែកមនុស្ស។ ភ្នែកមនុស្សតែងតែមើលរំលងនៅពេលធ្វើការយូរម៉ោង។</p>
      `
    },

    'slide-28': {
      title: 'ជំហានទី ២ & ៣៖ ម៉ាទ្រីសធានាគុណភាពសរុប & ការវិភាគគម្លាត',
      segment: '១៤:០០ - ១៤:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag amber-tag">ជំហានទី ២ &amp; ៣ &bull; ម៉ាទ្រីសវាយតម្លៃ</span>
          <h2 class="slide-title">ម៉ាទ្រីសធានាគុណភាពសរុប &amp; ការវិភាគគម្លាត</h2>
          <p class="slide-lead">ផ្សំលេខរង្វង់ (ការការពារការកើត) ជាមួយលេខប្រអប់ (ការការពារការធ្លាយ) ដើម្បីទាញរកកម្រិតធានាសរុប (A ដល់ F)។</p>
        </div>

        <div class="grid-2">
          <div>
            <table class="qa-matrix-table">
              <thead>
                <tr>
                  <th rowspan="2" style="width: 140px; font-size: 0.85rem;">ការការពារការធ្លាយចេញ<br>(Flow-out Prevention)</th>
                  <th colspan="4" style="font-size: 0.85rem;">ការការពារការកើតឡើង (Occurrence Prevention)</th>
                </tr>
                <tr>
                  <th>① Auto</th>
                  <th>② Manual</th>
                  <th>③ WI</th>
                  <th>④ None</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>[1] Auto Device</th>
                  <td class="matrix-cell rank-A">A</td>
                  <td class="matrix-cell rank-A">A</td>
                  <td class="matrix-cell rank-A">A</td>
                  <td class="matrix-cell rank-B">B</td>
                </tr>
                <tr>
                  <th>[2] Person Device</th>
                  <td class="matrix-cell rank-A">A</td>
                  <td class="matrix-cell rank-B">B</td>
                  <td class="matrix-cell rank-C">C</td>
                  <td class="matrix-cell rank-D">D</td>
                </tr>
                <tr>
                  <th>[3] Operator WI</th>
                  <td class="matrix-cell rank-A">A</td>
                  <td class="matrix-cell rank-C">C</td>
                  <td class="matrix-cell rank-D">D</td>
                  <td class="matrix-cell rank-E">E</td>
                </tr>
                <tr>
                  <th>[4] No Detection</th>
                  <td class="matrix-cell rank-B">B</td>
                  <td class="matrix-cell rank-D">D</td>
                  <td class="matrix-cell rank-E">E</td>
                  <td class="matrix-cell rank-F">F</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle purple-icon">⚖️</span>
              <h3>ជំហានទី ៣៖ ការវិភាគគម្លាត (Gap Analysis)</h3>
            </div>
            <p><strong>ឧទាហរណ៍នៃការវាយតម្លៃ៖</strong></p>
            <div class="callout-box" style="margin-bottom: 8px;">
              &bull; ការការពារការកើត = កម្រិត ② (ឧបករណ៍បញ្ជាដោយមនុស្ស)<br>
              &bull; ការការពារការធ្លាយ = កម្រិត [2] (ឧបករណ៍វាស់ដោយមនុស្ស)<br>
              &bull; លទ្ធផលក្នុងម៉ាទ្រីស = <strong>កម្រិតធានាសរុប "B"</strong>
            </div>
            <div class="callout-box red-box">
              <strong>ការត្រួតពិនិត្យគម្លាត៖</strong><br>
              ប្រសិនបើគោលដៅកំណត់ថា <strong>"A"</strong> ប៉ុន្តែកម្រិតធានាបច្ចុប្បន្នបានត្រឹម <strong>"B"</strong> ឬ <strong>"C"</strong> នោះគម្លាតគ្រោះថ្នាក់កំពុងមានហើយ! ត្រូវតែរៀបចំផែនការកែលម្អជាបន្ទាន់ក្នុងជំហានទី ៤។
            </div>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១៤:១០ - ១៤:៣០):</strong></p>
        <p>បង្ហាញតារាងម៉ាទ្រីស 4x4 ដ៏ល្បីល្បាញនៃ QA Network (ទំព័រ ២៦-២៧ នៃឯកសារដើម)។ នាំសិក្ខាកាមមើលប្រសព្វរវាងលេខរង្វង់ និងលេខប្រអប់។ បង្ហាញឧទាហរណ៍ Occurrence 2 + Flowout 2 = Level B។</p>
      `
    },

    'slide-29': {
      title: 'ជំហានទី ៤ & ៥៖ ផែនការកែលម្អ & ការវាយតម្លៃឡើងវិញ',
      segment: '១៤:៤៥ - ១៥:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag green-tag">ជំហានទី ៤ &amp; ៥ &bull; សកម្មភាព &amp; ការផ្ទៀងផ្ទាត់</span>
          <h2 class="slide-title">ជំហានទី ៤ &amp; ៥៖ ផែនការកែលម្អ &amp; ការវាយតម្លៃឡើងវិញ</h2>
          <p class="slide-lead">បង្កើតវិធានការដែលមានអ្នកទទួលខុសត្រូវច្បាស់លាស់ អនុវត្តការកែប្រែ និងគណនាផ្ទៀងផ្ទាត់ពិន្ទុឡើងវិញ។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">🛠️</span>
              <h3>ជំហានទី ៤៖ វិធីសាស្ត្រកែលម្អទាំង ៣</h3>
            </div>
            <p>នៅពេលកម្រិតធានាទាបជាងគោលដៅ (ឧ. គោលដៅ A តែបច្ចុប្បន្ន C)៖</p>
            <ul>
              <li><strong>វិធីទី ១៖ កែលម្អការការពារការកើតឡើង៖</strong> ដំឡើង Poka-yoke ស្វ័យប្រវត្តិកុំឱ្យច្រឡំ (រំកិលជួរឈរពីស្តាំទៅឆ្វេង៖ ③ &rarr; ①)។</li>
              <li><strong>វិធីទី ២៖ កែលម្អការការពារការធ្លាយចេញ៖</strong> បំពាក់កាមេរ៉ា ឬសេនស័រស្វ័យប្រវត្តិ (រំកិលជួរដេកពីក្រោមឡើងលើ៖ [3] &rarr; [1])។</li>
              <li><strong>វិធីទី ៣៖ កែលម្អទាំងពីរទន្ទឹមគ្នា៖</strong> រួមបញ្ចូលខ្សែការពារពីរជាន់ដើម្បីសុវត្ថិភាពអតិបរមា។</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle purple-icon">🔄</span>
              <h3>ជំហានទី ៥៖ ការវាយតម្លៃឡើងវិញ (Re-Evaluation)</h3>
            </div>
            <p>ក្រោយពេលអនុវត្តវិធានការកែលម្អរួច ត្រូវធ្វើការវាយតម្លៃឡើងវិញ៖</p>
            <ul>
              <li>១. វាយតម្លៃពិន្ទុការពារការកើតឡើងឡើងវិញ ក្រោយពេលកែប្រែ។</li>
              <li>២. វាយតម្លៃពិន្ទុការពារការធ្លាយចេញឡើងវិញ ក្រោយពេលកែប្រែ។</li>
              <li>៣. ទាញរកកម្រិតធានាសរុបឡើងវិញនៅលើម៉ាទ្រីស 4x4។</li>
              <li>៤. បញ្ជាក់ថាពិន្ទុថ្មីសម្រេចបានស្មើ ឬលើសកម្រិតគោលដៅ (Target) ដែលបានកំណត់!</li>
            </ul>
            <div class="callout-box green-box" style="margin-top: 10px;">
              <strong>រក្សាភាពរឹងមាំ៖</strong> កែសម្រួលឯកសារ WI, បណ្តុះបណ្តាលបុគ្គលិក និងកត់ត្រា Know-how ចូលក្នុងប្រព័ន្ធ។
            </div>
          </div>
        </div>
      `,
      notes: `

    'slide-23': {
      title: 'ជំហានទី ១៖ ពិនិត្យលំហូរ QC & កំណត់បញ្ហាសក្តានុពល',
      segment: '១៣:០០ - ១៤:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag amber-tag">ជំហានទី ១ &bull; ការកំណត់កំហុស</span>
          <h2 class="slide-title">ជំហានទី ១៖ ពិនិត្យលំហូរ QC &amp; កំណត់បញ្ហាសក្តានុពល</h2>
          <p class="slide-lead">កំណត់បញ្ហាសក្តានុពលដោយឈរលើលក្ខខណ្ឌជាក់ស្តែងនៅរោងចក្រ និងការពិតនៃប្រតិបត្តិការ។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle">🔍</span>
              <h3>ប្រភេទបញ្ហាសក្តានុពលទាំង ២ ប្រភេទ</h3>
            </div>
            <div class="callout-box" style="margin-bottom: 12px;">
              <strong>២.១ កំហុសទាក់ទងនឹងមនុស្ស (Human-Related Defects):</strong><br>
              ការមិនធ្វើតាមសេចក្តីណែនាំការងារ (WI), ការរំលងជំហាន, ការភ្លេចដំឡើងគ្រឿងបន្លាស់, ការដាក់ត្រឡប់ទិស, ឬការដំឡើងខុសម៉ូដែល។
            </div>
            <div class="callout-box red-box">
              <strong>២.២ កំហុសទាក់ទងនឹងដំណើរការ (Process-Related Defects):</strong><br>
              ប៉ារ៉ាម៉ែត្រម៉ាស៊ីនរអិលខុសស្តង់ដារ, សីតុណ្ហភាព/សម្ពាធខុស, ឧបករណ៍ពាក់សឹកហួសកំណត់, ឬគ្រឿងបន្លាស់ហួសកាលបរិច្ឆេទប្រើប្រាស់។
            </div>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle amber-icon">📌</span>
              <h3>ការសន្មតមូលដ្ឋានទាំង ៥ ពេលកំណត់បញ្ហាសក្តានុពល</h3>
            </div>
            <ul>
              <li><strong>១. ហានិភ័យកើតបានគ្រប់ពេល៖</strong> បញ្ហាអាចកើតឡើងគ្រប់ពេលវេលា ទោះបីជាវាមិនដែលធ្លាប់កើតមានពីមុនមកក៏ដោយ!</li>
              <li><strong>២. មិនត្រូវគិតពីប្រព័ន្ធការពារបច្ចុប្បន្ន៖</strong> ពេលស្រង់រកបញ្ហាសក្តានុពល ហាមយកប្រព័ន្ធការពារដែលមានស្រាប់មកគិត។</li>
              <li><strong>៣. ផ្តោតលើដំណើរការផលិតផ្ទាល់៖</strong> មិនរាប់បញ្ចូលការត្រួតពិនិត្យចុងក្រោយទេ លើកលែងតែការត្រួតពិនិត្យនោះខ្លួនឯងអាចធ្វើឱ្យខូចផលិតផល។</li>
              <li><strong>៤. សន្មតថាគ្រឿងពីដំណាក់កាលមុនគឺល្អ៖</strong> ចាត់ទុកថាគ្រឿងបន្លាស់ដែលមកដល់គឺស្របតាមស្តង់ដារ។</li>
              <li><strong>៥. ស្តាប់សំឡេងអតិថិជន៖</strong> ពិនិត្យរាល់បណ្តឹងពីដំណាក់កាលបន្ទាប់ និងពីអតិថិជន។</li>
            </ul>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១៣:១០ - ១៣:២៥):</strong></p>
        <p>សង្កត់ធ្ងន់លើចំណុចសន្មតទី ២៖ "Do not consider existing prevention controls while identifying potential defects"។ វិស្វករច្រើនតែនិយាយថា "ចំណុចនេះមិនបាច់ដាក់ទេ ព្រោះយើងមានសេនស័រការពារហើយ"។ នេះជាការយល់ខុស! ត្រូវស្រង់បញ្ហាទាំងអស់ចេញសិន។</p>
      `
    },

    'slide-24': {
      title: 'ជំហានទី ១៖ ការវិភាគការខូចខាត & និមិត្តសញ្ញាកម្រិតធ្ងន់ធ្ងរ',
      segment: '១៣:០០ - ១៤:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag amber-tag">ជំហានទី ១ &bull; ការវិភាគផលប៉ះពាល់</span>
          <h2 class="slide-title">ជំហានទី ១៖ ការវិភាគការខូចខាត &amp; និមិត្តសញ្ញាកម្រិតធ្ងន់ធ្ងរ</h2>
          <p class="slide-lead">លំដាប់លំដោយពិចារណា៖ ដំណើរការបន្ទាប់ &rarr; អតិថិជន (រោងចក្រដំឡើង) &rarr; អ្នកបើកបររថយន្ត។ (សន្មតថាអតិថិជនគ្មានការត្រួតពិនិត្យឡើយ!)</p>
        </div>

        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 80px; text-align: center;">និមិត្តសញ្ញា</th>
                <th style="width: 220px;">ចំណាត់ថ្នាក់</th>
                <th>និយមន័យវិស្វកម្ម &amp; ឧទាហរណ៍ជាក់ស្តែង</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="text-align: center;"><span class="severity-badge badge-S">S</span></td>
                <td><strong>សុវត្ថិភាព / គ្រោះថ្នាក់ចរាចរណ៍ (Safety)</strong></td>
                <td>អាចបណ្តាលឱ្យមានគ្រោះថ្នាក់ចរាចរណ៍ ដូចជាការលេចធ្លាយប្រេងឥន្ធនៈ ឬប្រព័ន្ធហ្វ្រាំងមិនដំណើរការ។</td>
              </tr>
              <tr>
                <td style="text-align: center;"><span class="severity-badge badge-X">X</span></td>
                <td><strong>រថយន្តឈប់ភ្លាមៗ (ផ្នែកមិនវិល)</strong></td>
                <td>ប៉ះពាល់លើគ្រឿងបន្លាស់មិនមានចលនា ធ្វើឱ្យរថយន្តឈប់ដំណើរការភ្លាមៗ (ឧ. សន្លាក់ជន្ទល់កង់ Knuckle បាក់)។</td>
              </tr>
              <tr>
                <td style="text-align: center;"><span class="severity-badge badge-XA">XA</span></td>
                <td><strong>រថយន្តឈប់ភ្លាមៗ (ផ្នែកមានចលនា)</strong></td>
                <td>ប៉ះពាល់លើគ្រឿងបន្លាស់មានចលនា ធ្វើឱ្យរថយន្តឈប់ភ្លាមៗ (ឧ. ប៉ុងក្រោយ Rear Differential គាំង)។</td>
              </tr>
              <tr>
                <td style="text-align: center;"><span class="severity-badge badge-XB">XB</span></td>
                <td><strong>រថយន្តឈប់ភ្លាមៗ (ដោយសារលេចធ្លាយ)</strong></td>
                <td>ការលេចធ្លាយប្រេង ឬវត្ថុរាវសំខាន់ៗដែលបណ្តាលឱ្យរថយន្តឈប់ដំណើរការភ្លាមៗ។</td>
              </tr>
              <tr>
                <td style="text-align: center;"><span class="severity-badge badge-R">R</span></td>
                <td><strong>ច្បាប់ &amp; បទប្បញ្ញត្តិ (Regulation)</strong></td>
                <td>ខុសពីច្បាប់ ឬបទប្បញ្ញត្តិសុវត្ថិភាពនៃប្រទេស ឬតំបន់របស់អតិថិជន។</td>
              </tr>
              <tr>
                <td style="text-align: center;"><span class="severity-badge badge-E">E</span></td>
                <td><strong>បរិស្ថាន &amp; ការបំភាយឧស្ម័ន (Emissions)</strong></td>
                <td>កំហុសគ្រឿងបន្លាស់បណ្តាលឱ្យរថយន្តបង្កើតការបំពុលបរិស្ថាន ឬឧស្ម័នពុលលើសកម្រិតកំណត់។</td>
              </tr>
              <tr>
                <td style="text-align: center;"><span class="severity-badge badge-V">V</span></td>
                <td><strong>ប៉ះពាល់ខ្សែសង្វាក់អតិថិជន (Vehicle OEM)</strong></td>
                <td>រកឃើញនៅពេលអតិថិជនកំពុងតម្លើងរថយន្ត (ឧ. ជើងទម្រតម្លើងមិនចូលជាមួយ Lower arm); អតិថិជនប្តឹង Claim។</td>
              </tr>
              <tr>
                <td style="text-align: center;"><span class="severity-badge badge-A">A</span></td>
                <td><strong>ផ្នែកវិលខូច តែឡាននៅរត់បាន</strong></td>
                <td>ប៉ះពាល់លើគ្រឿងបន្លាស់មានចលនា ប៉ុន្តែរថយន្តនៅតែអាចបន្តដំណើរការបាន (ឧ. មានសំឡេងរោទ៍ខុសប្រក្រតី)។</td>
              </tr>
              <tr>
                <td style="text-align: center;"><span class="severity-badge badge-B">B</span></td>
                <td><strong>ផ្នែកមិនវិលខូច តែឡាននៅរត់បាន</strong></td>
                <td>រថយន្តនៅតែអាចបន្តដំណើរការបានក្រោយពេលកំហុសកើតឡើង (ឧ. ការជ្រាបប្រេងតិចតួចនៅជុំវិញ Oil seal)។</td>
              </tr>
              <tr>
                <td style="text-align: center;"><span class="severity-badge badge-C">C</span></td>
                <td><strong>រូបរាងខាងក្រៅ / សោភ័ណភាព (Cosmetic)</strong></td>
                <td>រថយន្តនៅតែអាចដំណើរការបានធម្មតា (ឧ. ស្នាមច្រែះពណ៌បៃតងលើកាងក្រូមីញ៉ូមខាងក្រោយ)។</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១៣:២៥ - ១៣:៤០):</strong></p>
        <p>ពន្យល់និមិត្តសញ្ញានីមួយៗឱ្យច្បាស់៖ S, X, XA, XB, R, E, V, A, B, C ដូចមានចែងក្នុងទំព័រ ២១ ដល់ ២៣ នៃឯកសារដើម។ សង្កត់ធ្ងន់៖ ពេលវាយតម្លៃរោងចក្រ OEM ត្រូវសន្មតថាគេមិនពិនិត្យអ្វីទាំងអស់!</p>
      `
    },

    'slide-25': {
      title: 'ជំហានទី ១៖ ការប្តូរកម្រិតធ្ងន់ធ្ងរទៅជាកម្រិតគោលដៅ',
      segment: '១៣:០០ - ១៤:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag amber-tag">ជំហានទី ១ &bull; ការកំណត់កម្រិតគោលដៅ</span>
          <h2 class="slide-title">ជំហានទី ១៖ ការប្តូរកម្រិតធ្ងន់ធ្ងរទៅជាកម្រិតគោលដៅ (Target)</h2>
          <p class="slide-lead">កំណត់កម្រិតធានាគុណភាពជាកាតព្វកិច្ច ដោយផ្អែកលើទំហំនៃភាពធ្ងន់ធ្ងរ។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">🎯</span>
              <h3>តារាងបម្លែងកម្រិតគោលដៅ</h3>
            </div>
            <table class="data-table">
              <thead>
                <tr>
                  <th>កម្រិតភាពធ្ងន់ធ្ងរ (Severity Ranking)</th>
                  <th style="text-align: center;">គោលដៅដែលត្រូវតែសម្រេច (Target)</th>
                </tr>
              </thead>
              <tbody>
                <tr style="background: rgba(239, 68, 68, 0.1);">
                  <td><span class="severity-badge badge-S">S</span> <span class="severity-badge badge-X">X</span> <span class="severity-badge badge-XA">XA</span> <span class="severity-badge badge-XB">XB</span></td>
                  <td style="text-align: center; font-size: 1.5rem; font-weight: 800; color: #34d399;">A</td>
                </tr>
                <tr style="background: rgba(245, 158, 11, 0.1);">
                  <td><span class="severity-badge badge-E">E</span> <span class="severity-badge badge-R">R</span> <span class="severity-badge badge-V">V</span> <span class="severity-badge badge-A">A</span> <span class="severity-badge badge-B">B</span></td>
                  <td style="text-align: center; font-size: 1.5rem; font-weight: 800; color: #38bdf8;">B</td>
                </tr>
                <tr style="background: rgba(255, 255, 255, 0.03);">
                  <td><span class="severity-badge badge-C">C</span></td>
                  <td style="text-align: center; font-size: 1.5rem; font-weight: 800; color: #fbbf24;">C</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle purple-icon">💡</span>
              <h3>ឧទាហរណ៍ជាក់ស្តែងលើប៊ូឡុងហ្វ្រាំងរថយន្ត</h3>
            </div>
            <p><strong>ភាពរឹងនៃគ្រាប់ Nut កៀបហ្វ្រាំង (Brake Caliper Nut):</strong></p>
            <div class="pipeline-container" style="font-size: 0.8rem; padding: 10px;">
              <span>វត្ថុធាតុដើមពី Supplier</span> &rarr;
              <span>កាត់ &amp; ដុតកម្ដៅ</span> &rarr;
              <span>ភាពរឹងមិនដល់ Spec</span> &rarr;
              <span>តម្លើងជាមួយហ្វ្រាំង</span> &rarr;
              <span style="color: #f87171; font-weight: 700;">រលុងកម្លាំង Torque!</span>
            </div>
            <div class="callout-box red-box" style="margin-top: 10px;">
              <strong>ការវិភាគភាពធ្ងន់ធ្ងរ៖</strong> ភាពរឹងមិនដល់ធ្វើឱ្យរលុងខ្ចៅ &rarr; ហ្វ្រាំងមិនដំណើរការ &rarr; កម្រិតធ្ងន់ធ្ងរគឺ <strong>[S]</strong>!<br>
              <strong>គោលដៅជាកាតព្វកិច្ច៖</strong> ដូច្នេះ កម្រិតធានាសរុបដែលត្រូវតែសម្រេចឱ្យបានគឺកម្រិត <strong>"A"</strong> ជាដាច់ខាត។
            </div>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១៣:៤០ - ១៣:៥០):</strong></p>
        <p>បង្ហាញតារាងបម្លែងក្នុងទំព័រ ២៤ នៃឯកសារដើម។ ឱ្យតែជាបញ្ហាសុវត្ថិភាព ឬឡានឈប់ (S, X, XA, XB) គោលដៅត្រូវតែជាកម្រិត "A" ដាច់ខាត គ្មានការយោគយល់ឡើយ។</p>
      `
    },

    'slide-26': {
      title: 'ជំហានទី ២៖ កម្រិតនៃការការពារការកើតឡើង (Level 1 ដល់ 4)',
      segment: '១៣:០០ - ១៤:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag amber-tag">ជំហានទី ២ &bull; ការការពារការកើតឡើង</span>
          <h2 class="slide-title">ជំហានទី ២៖ កម្រិតនៃការការពារការកើតឡើង (Level 1 ដល់ 4)</h2>
          <p class="slide-lead">ការគ្រប់គ្រងដំណើរការដើម្បីទប់ស្កាត់ ឬកាត់បន្ថយការបង្កើតកំហុសផលិតផលនៅនឹងម៉ាស៊ីន។</p>
        </div>

        <div class="grid-4">
          <div class="concept-card" style="border-top: 4px solid var(--color-success);">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">1</span>
              <h3>Level 1</h3>
            </div>
            <p><strong>ឧបករណ៍ស្វ័យប្រវត្តិ ១០០%៖</strong></p>
            <p>មានបំពាក់ឧបករណ៍ការពារ ដែលអាចទប់ស្កាត់កំហុសពីមនុស្ស និងដំណើរការបាន <strong>១០០%</strong> ដោយស្វ័យប្រវត្តិ (ឧ. Jig រាងទប់កុំឱ្យដាក់ខុស, គន្លឹះអគ្គិសនី)។</p>
            <div class="callout-box green-box">ភាពជឿជាក់ខ្ពស់បំផុត</div>
          </div>

          <div class="concept-card" style="border-top: 4px solid var(--qa-primary);">
            <div class="card-icon-header">
              <span class="card-icon-circle">2</span>
              <h3>Level 2</h3>
            </div>
            <p><strong>ឧបករណ៍ដំណើរការដោយមនុស្ស៖</strong></p>
            <p>មានឧបករណ៍ការពារកំហុស ប៉ុន្តែមនុស្សត្រូវតែជាអ្នកបញ្ជា ឬរៀបចំឧបករណ៍នោះ (ឧ. ដងមួល Torque ដែលលាន់ឮសូរ "កិក", គំរូទម្រទប់ដោយដៃ)។</p>
            <div class="callout-box">ឧបករណ៍ + មនុស្ស</div>
          </div>

          <div class="concept-card" style="border-top: 4px solid var(--color-warning);">
            <div class="card-icon-header">
              <span class="card-icon-circle amber-icon">3</span>
              <h3>Level 3</h3>
            </div>
            <p><strong>មនុស្សអនុវត្តតាម WI៖</strong></p>
            <p>គ្មានឧបករណ៍ការពារកំហុសទាល់តែសោះ។ ការការពារអាស្រ័យទាំងស្រុងលើបុគ្គលិកក្នុងការអនុវត្តតាមសេចក្តីណែនាំការងារ (WI) ឱ្យបានត្រឹមត្រូវ។</p>
            <div class="callout-box amber-box">ពឹងលើមនុស្សទាំងស្រុង</div>
          </div>

          <div class="concept-card" style="border-top: 4px solid var(--color-danger);">
            <div class="card-icon-header">
              <span class="card-icon-circle red-icon">4</span>
              <h3>Level 4</h3>
            </div>
            <p><strong>គ្មាន WI ឬដំណើរការខ្វះការគ្រប់គ្រង៖</strong></p>
            <p>គ្មានឧបករណ៍ការពារ ហើយគ្មានសេចក្តីណែនាំ WI ឬមិនបានអនុវត្តតាម ឬដំណើរការមិនអាចទប់ស្កាត់កំហុសបានទាល់តែសោះ។</p>
            <div class="callout-box red-box">ហានិភ័យគ្មានការគ្រប់គ្រង</div>
          </div>
        </div>

        <div class="callout-box green-box" style="margin-top: 16px;">
          <strong>អាទិភាពវិស្វកម្ម៖</strong> ត្រូវផ្តល់អាទិភាពដាច់ខាតទៅលើការការពារដោយម៉ាស៊ីន ឬឧបករណ៍ស្វ័យប្រវត្តិ (Level 1)!
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១៣:៥០ - ១៤:០០):</strong></p>
        <p>ពន្យល់កម្រិតទាំង ៤ នៃ Occurrence Prevention (ទំព័រ ២៤-២៥ នៃឯកសារដើម)។ សង្កត់ធ្ងន់លើភាពខុសគ្នារវាង Level 1 (ម៉ាស៊ីនធ្វើដោយស្វ័យប្រវត្តិ) និង Level 2 (មានឧបករណ៍ តែមនុស្សត្រូវបញ្ជា)។</p>
      `
    },

    'slide-27': {
      title: 'ជំហានទី ២៖ កម្រិតនៃការការពារការធ្លាយចេញ (Level 1 ដល់ 4)',
      segment: '១៣:០០ - ១៤:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag amber-tag">ជំហានទី ២ &bull; ការការពារការធ្លាយចេញ</span>
          <h2 class="slide-title">ជំហានទី ២៖ កម្រិតនៃការការពារការធ្លាយចេញ (Flow-Out)</h2>
          <p class="slide-lead">ការត្រួតពិនិត្យ ឬការចាប់កំហុស ដើម្បីកុំឱ្យផលិតផលខូចរបូតចេញទៅដល់អតិថិជន។</p>
        </div>

        <div class="grid-4">
          <div class="concept-card" style="border-top: 4px solid var(--color-success);">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">1</span>
              <h3>Level 1</h3>
            </div>
            <p><strong>ឧបករណ៍ចាប់ស្វ័យប្រវត្តិ ១០០%៖</strong></p>
            <p>មានបំពាក់ឧបករណ៍ចាប់កំហុស ដែលអាចរកឃើញកំហុសបាន <strong>១០០%</strong> ដោយស្វ័យប្រវត្តិ និងមានប្រព័ន្ធច្រានចោល ឬចាក់សោម៉ាស៊ីនភ្លាមៗ (ឧ. កាមេរ៉ា Vision, ម៉ាស៊ីនតេស្តខ្យល់ស្វ័យប្រវត្តិ)។</p>
            <div class="callout-box green-box">ស្វ័យប្រវត្តិ ១០០%</div>
          </div>

          <div class="concept-card" style="border-top: 4px solid var(--qa-primary);">
            <div class="card-icon-header">
              <span class="card-icon-circle">2</span>
              <h3>Level 2</h3>
            </div>
            <p><strong>ឧបករណ៍វាស់ដោយមនុស្ស៖</strong></p>
            <p>មានឧបករណ៍ចាប់កំហុស ប៉ុន្តែមនុស្សត្រូវតែជាអ្នកកាន់វាស់ ឬដំណើរការឧបករណ៍នោះ (ឧ. កាឡីប Micrometer, ឧបករណ៍វាស់សម្ពាធដោយដៃ)។</p>
            <div class="callout-box">ឧបករណ៍ + មនុស្ស</div>
          </div>

          <div class="concept-card" style="border-top: 4px solid var(--color-warning);">
            <div class="card-icon-header">
              <span class="card-icon-circle amber-icon">3</span>
              <h3>Level 3</h3>
            </div>
            <p><strong>មនុស្សពិនិត្យតាម WI៖</strong></p>
            <p>គ្មានឧបករណ៍ចាប់កំហុសទេ។ ការរកឃើញអាស្រ័យទាំងស្រុងលើបុគ្គលិកក្នុងការមើលដោយភ្នែក ឬស្ទាបតាមនីតិវិធីត្រួតពិនិត្យ។</p>
            <div class="callout-box amber-box">មើលដោយភ្នែក</div>
          </div>

          <div class="concept-card" style="border-top: 4px solid var(--color-danger);">
            <div class="card-icon-header">
              <span class="card-icon-circle red-icon">4</span>
              <h3>Level 4</h3>
            </div>
            <p><strong>គ្មានឧបករណ៍ ឬមិនអាចរកឃើញ៖</strong></p>
            <p>គ្មានឧបករណ៍ចាប់កំហុស ហើយគ្មាននីតិវិធី ឬកំហុសនោះមិនអាចរកឃើញបានទាល់តែសោះមុនពេលដឹកចេញ។</p>
            <div class="callout-box red-box">ច្រករបូតងងឹត</div>
          </div>
        </div>

        <div class="callout-box" style="margin-top: 16px;">
          <strong>អាទិភាពនៃការរកឃើញ៖</strong> ការប្រើប្រាស់ឧបករណ៍ស្វ័យប្រវត្តិ (Level 1) ជួយលុបបំបាត់ភាពនឿយហត់របស់ភ្នែកមនុស្ស និងធានាការទប់ស្កាត់ការធ្លាយចេញបានយ៉ាងពិតប្រាកដ។
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១៤:០០ - ១៤:១០):</strong></p>
        <p>ពន្យល់ពី Flow-Out Prevention (ទំព័រ ២៥-២៦ នៃឯកសារដើម)។ បង្ហាញពីហានិភ័យនៃ Level 3 ដែលពឹងលើភ្នែកមនុស្ស។ ភ្នែកមនុស្សតែងតែមើលរំលងនៅពេលធ្វើការយូរម៉ោង។</p>
      `
    },

    'slide-28': {
      title: 'ជំហានទី ២ & ៣៖ ម៉ាទ្រីសធានាគុណភាពសរុប & ការវិភាគគម្លាត',
      segment: '១៤:០០ - ១៤:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag amber-tag">ជំហានទី ២ &amp; ៣ &bull; ម៉ាទ្រីសវាយតម្លៃ</span>
          <h2 class="slide-title">ម៉ាទ្រីសធានាគុណភាពសរុប &amp; ការវិភាគគម្លាត</h2>
          <p class="slide-lead">ផ្សំលេខរង្វង់ (ការការពារការកើត) ជាមួយលេខប្រអប់ (ការការពារការធ្លាយ) ដើម្បីទាញរកកម្រិតធានាសរុប (A ដល់ F)។</p>
        </div>

        <div class="grid-2">
          <div>
            <table class="qa-matrix-table">
              <thead>
                <tr>
                  <th rowspan="2" style="width: 140px; font-size: 0.85rem;">ការការពារការធ្លាយចេញ<br>(Flow-out Prevention)</th>
                  <th colspan="4" style="font-size: 0.85rem;">ការការពារការកើតឡើង (Occurrence Prevention)</th>
                </tr>
                <tr>
                  <th>① Auto</th>
                  <th>② Manual</th>
                  <th>③ WI</th>
                  <th>④ None</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>[1] Auto Device</th>
                  <td class="matrix-cell rank-A">A</td>
                  <td class="matrix-cell rank-A">A</td>
                  <td class="matrix-cell rank-A">A</td>
                  <td class="matrix-cell rank-B">B</td>
                </tr>
                <tr>
                  <th>[2] Person Device</th>
                  <td class="matrix-cell rank-A">A</td>
                  <td class="matrix-cell rank-B">B</td>
                  <td class="matrix-cell rank-C">C</td>
                  <td class="matrix-cell rank-D">D</td>
                </tr>
                <tr>
                  <th>[3] Operator WI</th>
                  <td class="matrix-cell rank-A">A</td>
                  <td class="matrix-cell rank-C">C</td>
                  <td class="matrix-cell rank-D">D</td>
                  <td class="matrix-cell rank-E">E</td>
                </tr>
                <tr>
                  <th>[4] No Detection</th>
                  <td class="matrix-cell rank-B">B</td>
                  <td class="matrix-cell rank-D">D</td>
                  <td class="matrix-cell rank-E">E</td>
                  <td class="matrix-cell rank-F">F</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle purple-icon">⚖️</span>
              <h3>ជំហានទី ៣៖ ការវិភាគគម្លាត (Gap Analysis)</h3>
            </div>
            <p><strong>ឧទាហរណ៍នៃការវាយតម្លៃ៖</strong></p>
            <div class="callout-box" style="margin-bottom: 8px;">
              &bull; ការការពារការកើត = កម្រិត ② (ឧបករណ៍បញ្ជាដោយមនុស្ស)<br>
              &bull; ការការពារការធ្លាយ = កម្រិត [2] (ឧបករណ៍វាស់ដោយមនុស្ស)<br>
              &bull; លទ្ធផលក្នុងម៉ាទ្រីស = <strong>កម្រិតធានាសរុប "B"</strong>
            </div>
            <div class="callout-box red-box">
              <strong>ការត្រួតពិនិត្យគម្លាត៖</strong><br>
              ប្រសិនបើគោលដៅកំណត់ថា <strong>"A"</strong> ប៉ុន្តែកម្រិតធានាបច្ចុប្បន្នបានត្រឹម <strong>"B"</strong> ឬ <strong>"C"</strong> នោះគម្លាតគ្រោះថ្នាក់កំពុងមានហើយ! ត្រូវតែរៀបចំផែនការកែលម្អជាបន្ទាន់ក្នុងជំហានទី ៤។
            </div>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១៤:១០ - ១៤:៣០):</strong></p>
        <p>បង្ហាញតារាងម៉ាទ្រីស 4x4 ដ៏ល្បីល្បាញនៃ QA Network (ទំព័រ ២៦-២៧ នៃឯកសារដើម)។ នាំសិក្ខាកាមមើលប្រសព្វរវាងលេខរង្វង់ និងលេខប្រអប់។ បង្ហាញឧទាហរណ៍ Occurrence 2 + Flowout 2 = Level B។</p>
      `
    },
    'slide-29': {
      title: 'ជំហានទី ៤ & ៥៖ ផែនការកែលម្អ & ការវាយតម្លៃឡើងវិញ',
      segment: '១៤:៤៥ - ១៥:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag green-tag">ជំហានទី ៤ &amp; ៥ &bull; សកម្មភាព &amp; ការផ្ទៀងផ្ទាត់</span>
          <h2 class="slide-title">ជំហានទី ៤ &amp; ៥៖ ផែនការកែលម្អ &amp; ការវាយតម្លៃឡើងវិញ</h2>
          <p class="slide-lead">បង្កើតវិធានការដែលមានអ្នកទទួលខុសត្រូវច្បាស់លាស់ អនុវត្តការកែប្រែ និងគណនាផ្ទៀងផ្ទាត់ពិន្ទុឡើងវិញ។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">🛠️</span>
              <h3>ជំហានទី ៤៖ វិធីសាស្ត្រកែលម្អទាំង ៣</h3>
            </div>
            <p>នៅពេលកម្រិតធានាទាបជាងគោលដៅ (ឧ. គោលដៅ A តែបច្ចុប្បន្ន C)៖</p>
            <ul>
              <li><strong>វិធីទី ១៖ កែលម្អការការពារការកើតឡើង៖</strong> ដំឡើង Poka-yoke ស្វ័យប្រវត្តិកុំឱ្យច្រឡំ (រំកិលជួរឈរពីស្តាំទៅឆ្វេង៖ ③ &rarr; ①)។</li>
              <li><strong>វិធីទី ២៖ កែលម្អការការពារការធ្លាយចេញ៖</strong> បំពាក់កាមេរ៉ា ឬសេនស័រស្វ័យប្រវត្តិ (រំកិលជួរដេកពីក្រោមឡើងលើ៖ [3] &rarr; [1])។</li>
              <li><strong>វិធីទី ៣៖ កែលម្អទាំងពីរទន្ទឹមគ្នា៖</strong> រួមបញ្ចូលខ្សែការពារពីរជាន់ដើម្បីសុវត្ថិភាពអតិបរមា។</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle purple-icon">🔄</span>
              <h3>ជំហានទី ៥៖ ការវាយតម្លៃឡើងវិញ (Re-Evaluation)</h3>
            </div>
            <p>ក្រោយពេលអនុវត្តវិធានការកែលម្អរួច ត្រូវធ្វើការវាយតម្លៃឡើងវិញ៖</p>
            <ul>
              <li>១. វាយតម្លៃពិន្ទុការពារការកើតឡើងឡើងវិញ ក្រោយពេលកែប្រែ។</li>
              <li>២. វាយតម្លៃពិន្ទុការពារការធ្លាយចេញឡើងវិញ ក្រោយពេលកែប្រែ។</li>
              <li>៣. ទាញរកកម្រិតធានាសរុបឡើងវិញនៅលើម៉ាទ្រីស 4x4។</li>
              <li>៤. បញ្ជាក់ថាពិន្ទុថ្មីសម្រេចបានស្មើ ឬលើសកម្រិតគោលដៅ (Target) ដែលបានកំណត់!</li>
            </ul>
            <div class="callout-box green-box" style="margin-top: 10px;">
              <strong>រក្សាភាពរឹងមាំ៖</strong> កែសម្រួលឯកសារ WI, បណ្តុះបណ្តាលបុគ្គលិក និងកត់ត្រា Know-how ចូលក្នុងប្រព័ន្ធ។
            </div>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១៤:៤៥ - ១៥:០០):</strong></p>
        <p>ពន្យល់ពីវិធី ៣ យ៉ាងក្នុងទំព័រ ២៧-២៨។ ប្រសិនបើ Target គឺ A តែបច្ចុប្បន្ន C យើងអាចរំកិល Occurrence ទៅ Level 1 ឬរំកិល Flowout ទៅ Level 1 ឬធ្វើទាំងពីរ។</p>
      `
    },

    'slide-30': {
      title: 'ម៉ូឌុលទី ៤៖ Go & See (Genchi Genbutsu) & ក្របខ័ណ្ឌ 5 Gen',
      segment: '១៣:០០ - ១៤:០០',
      content: `
        <div class="slide-header">
          <span class="section-tag">ម៉ូឌុលទី ៤ — ការស្វែងរកការពិត &amp; បញ្ហា</span>
          <h2 class="slide-title">Go &amp; See (Genchi Genbutsu) &amp; ក្របខ័ណ្ឌ 5 Gen</h2>
          <p class="slide-lead">ផ្ទៀងផ្ទាត់ទីកន្លែងពិត វត្ថុពិត ការពិតជាក់ស្តែង គោលការណ៍វិស្វកម្ម និងស្តង់ដារប្រតិបត្តិការ។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle">👀</span>
              <h3>Go &amp; See៖ ចុះសង្កេតកន្លែងធ្វើការជាក់ស្តែង</h3>
            </div>
            <p>ដើរទៅកាន់ស្ថានីយការងារដែលកំហុសអាចកើតឡើង ឬអាចរបូតចេញ៖</p>
            <ul>
              <li>រៀបចំសំណួរសង្កេតផ្ដោតមួយ ហើយដើរតាមផលិតផលជាក់ស្តែងពេញមួយវដ្ត។</li>
              <li>សង្កេតមើលស្ថានភាពផ្លាស់ប្តូរសំខាន់ៗ៖ ពេលចាប់ផ្តើមម៉ាស៊ីន, ពេលប្តូរម៉ូដែល, ពេលបើកម៉ាស៊ីនឡើងវិញ, ពេលបន្ថែមសម្ភារ, និងពេលដោះស្រាយបញ្ហាមិនប្រក្រតី។</li>
              <li>ប្រៀបធៀបការអនុវត្តពិតរបស់កម្មករ ធៀបនឹងសេចក្តីណែនាំការងារដែលបិទផ្សាយ។</li>
              <li>និយាយជាមួយកម្មករដោយគ្មានការស្តីបន្ទោស; បែងចែកការសង្កេតជាក់ស្តែងចេញពីការស្មាន។</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">⛩️</span>
              <h3>ក្របខ័ណ្ឌសង្កេត 5 Gen របស់ជប៉ុន</h3>
            </div>
            <ul>
              <li><strong>១. Genba (現場):</strong> កន្លែងធ្វើការជាក់ស្តែងដែលការងារកំពុងដំណើរការ។</li>
              <li><strong>២. Genbutsu (現物):</strong> វត្ថុពិត គ្រឿងបន្លាស់ពិត ឬម៉ាស៊ីនពិត។</li>
              <li><strong>៣. Genjitsu (現実):</strong> ការពិតជាក់ស្តែង ទិន្នន័យពិត និងស្ថានភាពវាស់វែងជាក់ស្តែង។</li>
              <li><strong>៤. Genri (原理):</strong> គោលការណ៍វិទ្យាសាស្ត្រ ឬវិស្វកម្មដែលនៅពីក្រោយដំណើរការ។</li>
              <li><strong>៥. Gensoku (原則):</strong> ច្បាប់ស្តង់ដារ ប៉ារ៉ាម៉ែត្រ និងលក្ខណៈបច្ចេកទេសដែលបានកំណត់។</li>
            </ul>
            <div class="callout-box" style="margin-top: 10px;">
              <strong>ឧទាហរណ៍ម៉ាស៊ីនកៀប៖</strong> ពិនិត្យគ្រឿងបន្លាស់ប្រេះ (<em>Genbutsu</em>), កត់ត្រាកម្លាំងសង្កត់ (<em>Genjitsu</em>), សង្កេតការដំឡើងពុម្ព (<em>Genba</em>), ពិនិត្យចលនាលោហៈធាតុ (<em>Genri</em>), ប្រៀបធៀបនឹងស្តង់ដារដំឡើង (<em>Gensoku</em>)។
            </div>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ:</strong></p>
        <p>ពន្យល់ពីទស្សនវិជ្ជា 5 Gen (ទំព័រ ៣០ នៃឯកសារដើម)។ ជនជាតិជប៉ុនចាត់ទុក 5 Gen ជាមូលដ្ឋានគ្រឹះនៃភាពជោគជ័យក្នុងរោងចក្រ។ ការចុះទៅមើលផ្ទាល់គឺជាវិធីតែមួយគត់ដើម្បីស្វែងរកការពិត។</p>
      `
    },

    'slide-31': {
      title: 'ភស្តុតាងរឹងមាំ vs ការសន្មត & ការរៀបចំខ្សែផ្លូវនៃកំហុស',
      segment: '១៣:០០ - ១៤:០០',
      content: `
        <div class="slide-header">
          <span class="section-tag">ម៉ូឌុលទី ៤ — ការពិតជាក់ស្តែង</span>
          <h2 class="slide-title">ភស្តុតាងរឹងមាំ vs ការសន្មត &amp; ការរៀបចំខ្សែផ្លូវនៃកំហុស</h2>
          <p class="slide-lead">ការវាយតម្លៃមួយមានតម្លៃលុះត្រាតែមានការពិតគាំទ្រ។ រៀបចំផែនទីបង្ហាញពីរបៀបដែលកំហុសធ្វើដំណើរឆ្លងកាត់ស្ថានីយ។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle amber-icon">⚖️</span>
              <h3>ការសង្កេតដែលអាចផ្ទៀងផ្ទាត់បាន vs យោបល់ស្មាន</h3>
            </div>
            <div class="callout-box red-box" style="margin-bottom: 12px;">
              <strong>យោបល់ស្មានទន់ខ្សោយ (ការសន្និដ្ឋាន):</strong><br>
              "កម្មករមិនខ្វល់ខ្វាយ ហើយមិនព្រមធ្វើតាមសេចក្តីណែនាំការងារ WI នោះទេ។"
            </div>
            <div class="callout-box green-box">
              <strong>ភស្តុតាងរឹងមាំ (ការសង្កេតជាក់ស្តែង):</strong><br>
              "នៅថ្ងៃទី ១៤ ខែតុលា ក្នុងចំណោម ៥ វដ្តដែលបានសង្កេតឃើញ មាន ៣ វដ្តបានរំលងជំហានទី ៤; ដោយសារឯកសារ WI កំណែ C ត្រូវបានអនុម័ត តែនៅកន្លែងធ្វើការនៅតែបិទកំណែចាស់ B នៅឡើយ។"
            </div>
            <p style="margin-top: 12px; font-size: 0.9rem;">
              គំរូគ្រឿងបន្លាស់ពិត ទិន្នន័យក្រិតឧបករណ៍ត្រឹមត្រូវ និងកំណត់ត្រាកាកសំណល់ច្បាស់លាស់ គឺមិនអាចប្រកែកបានឡើយ បើធៀបនឹងការនិយាយដោយមាត់ទទេ!
            </p>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle purple-icon">🗺️</span>
              <h3>ការរៀបចំផែនទីនៃការបង្កើត &amp; ការរបូតចេញ</h3>
            </div>
            <p>តាមដានដំណើរផ្លូវដែលគ្រឿងខូចអាចឆ្លងកាត់រវាងស្ថានីយការងារ៖</p>
            <ul>
              <li>កំណត់ចំណុចបង្កើតដំបូង ចំណុចផ្ទេរបន្ត និងរបាំងត្រួតពិនិត្យ។</li>
              <li>កត់ត្រាលក្ខខណ្ឌបរាជ័យនៃរបាំង៖ កុងតាក់ Bypass, ចន្លោះប្រហោងនៃការដកគំរូ, និងការច្រឡំទទួលយកទំនិញខូច។</li>
              <li>គិតគូរដល់ការផ្លាស់ប្តូរវេន, ធុងគ្រឿងបន្លាស់ច្រឡូកច្រឡំ, និងការសម្អាតខ្សែសង្វាក់ (Line clearance)។</li>
            </ul>
            <div class="callout-box" style="margin-top: 10px;">
              <strong>ករណីដោតម្ជុល៖</strong> ម្ជុលបាត់កើតឡើងនៅកន្លែងដោត; ម៉ាស៊ីនតេស្តភ្លើងរកឃើញចរន្ត តែមិនអាចដឹងថាតើគន្លឹះចាក់សោរប្លាស្ទិកបានកៀបជាប់ឬអត់នោះទេ!
            </div>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ:</strong></p>
        <p>សង្កត់ធ្ងន់លើស្លាយទំព័រ ៣០ និង ៣២ នៃឯកសារដើម។ "Operators do not follow WI" គ្រាន់តែជាការសន្និដ្ឋានស្មាន។ យើងត្រូវការភស្តុតាងជាក់ស្តែងដែលអាចធ្វើតេស្តបាន។</p>
      `
    },

    'slide-32': {
      title: 'ម៉ូឌុលទី ៥៖ ភាពធ្ងន់ធ្ងរ, ភាពទន់ខ្សោយ & ពិន្ទុអាទិភាព (P = S × W)',
      segment: '១៤:០០ - ១៤:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag purple-tag">ម៉ូឌុលទី ៥ — ការវាយតម្លៃហានិភ័យ</span>
          <h2 class="slide-title">ពិន្ទុអាទិភាពហានិភ័យ៖ ភាពធ្ងន់ធ្ងរ (S1–S4) &times; ភាពទន់ខ្សោយ (W1–W4)</h2>
          <p class="slide-lead">ប្រើប្រាស់កម្រិតភាពធ្ងន់ធ្ងររួមគ្នាជាមួយភាពទន់ខ្សោយនៃការគ្រប់គ្រង ដើម្បីបែងចែកធនធានវិស្វកម្មឱ្យចំគោលដៅ។</p>
        </div>

        <div class="grid-3">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle red-icon">S</span>
              <h3>កម្រិតភាពធ្ងន់ធ្ងរ (S1 ដល់ S4)</h3>
            </div>
            <ul>
              <li><strong>S1 (តូចតាច):</strong> ការរំខានបន្តិចបន្តួចនៅនឹងកន្លែង; គ្មានផលប៉ះពាល់លើមុខងារ។</li>
              <li><strong>S2 (មធ្យម):</strong> ការកែច្នៃផ្ទៃក្នុងច្រើន; ការរំខានត្រូវបានគ្រប់គ្រង។</li>
              <li><strong>S3 (ធ្ងន់ធ្ងរ):</strong> ប៉ះពាល់ការដំឡើងរបស់អតិថិជន; ខូចមុខងារធ្ងន់ធ្ងរ ឬមានបណ្តឹងធំ។</li>
              <li><strong>S4 (គ្រោះថ្នាក់):</strong> ហានិភ័យសុវត្ថិភាពចរាចរណ៍ គ្រោះថ្នាក់ ឬខុសច្បាប់។</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle amber-icon">W</span>
              <h3>ភាពទន់ខ្សោយនៃការគ្រប់គ្រង (W1 ដល់ W4)</h3>
            </div>
            <ul>
              <li><strong>W1 (រឹងមាំ):</strong> មានប្រព័ន្ធចាក់សោស្វ័យប្រវត្តិ ឬ Poka-yoke ជឿជាក់បាន។</li>
              <li><strong>W2 (សមរម្យ):</strong> មានការគ្រប់គ្រង និងភស្តុតាងច្បាស់លាស់ តែពឹងលើមនុស្សខ្លះ។</li>
              <li><strong>W3 (ខ្សោយ):</strong> ការការពារមិនជាប់លាប់ ឆ្លើយតបយឺត ការក្រិតខ្សោយ។</li>
              <li><strong>W4 (អវត្តមាន):</strong> គ្មានរបាំងការពារទាល់តែសោះ ឬតែងតែ Bypass ចោល។</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle purple-icon">P</span>
              <h3>ពិន្ទុអាទិភាព (P = S &times; W)</h3>
            </div>
            <div class="callout-box" style="font-family: var(--font-code); font-size: 0.95rem; margin-bottom: 10px;">
              ពិន្ទុ៖ ១ ដល់ ១៦<br>
              &bull; ១–៣៖ តាមដានធម្មតា (Routine)<br>
              &bull; ៤–៧៖ កែលម្អតាមផែនការ (Improve)<br>
              &bull; ៨–១១៖ អាទិភាពខ្ពស់ (High)<br>
              &bull; ១២–១៦៖ បន្ទាន់បំផុត (Urgent)
            </div>
            <div class="callout-box red-box">
              <strong>ច្បាប់លើកលែងសុវត្ថិភាព៖</strong> រាល់ហានិភ័យសុវត្ថិភាព S4 ឬករណីដែលធ្លាប់របូតដល់ដៃអតិថិជន ត្រូវតែចាត់វិធានការបន្ទាន់បំផុតភ្លាមៗ ដោយមិនគិតពីពិន្ទុឡើយ!
            </div>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ:</strong></p>
        <p>ពន្យល់ពីរូបមន្ត P = S x W ក្នុងទំព័រ ៣៥ នៃឯកសារដើម។ ភាពធ្ងន់ធ្ងរ S មិនអាចប្តូរបានទេ (ព្រោះជាលក្ខណៈផលិតផល) ប៉ុន្តែយើងអាចបន្ថយ W ពី 3 មក 1 ដោយការបំពាក់ Poka-yoke ដែលធ្វើឱ្យពិន្ទុធ្លាក់ពី P9 មក P3 ភ្លាម។</p>
      `
    },

    'slide-33': {
      title: 'ការវាយតម្លៃការចាប់កំហុស & ការទប់ស្កាត់ការកើតឡើងវិញ',
      segment: '១៤:០០ - ១៤:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag purple-tag">ម៉ូឌុលទី ៥ — ការទប់ស្កាត់ &amp; ការការពារការកើតឡើងវិញ</span>
          <h2 class="slide-title">ការវាយតម្លៃការចាប់កំហុស &amp; ការទប់ស្កាត់ការកើតឡើងវិញ</h2>
          <p class="slide-lead">ការដោះស្រាយបញ្ហាមួយពេលនេះ មិនដូចគ្នានឹងការជួសជុលប្រព័ន្ធដើម្បីកុំឱ្យវាកើតឡើងវិញនៅថ្ងៃស្អែកនោះទេ។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle">⏱️</span>
              <h3>ហានិភ័យលាក់កំបាំងនៃការដកគំរូពិនិត្យ</h3>
            </div>
            <p>
              វាយតម្លៃទីតាំងត្រួតពិនិត្យ វិធីសាស្ត្រ ភាពឯករាជ្យ និងល្បឿននៃការឆ្លើយតប៖
            </p>
            <div class="callout-box amber-box" style="margin: 12px 0;">
              <strong>គម្លាតហានិភ័យ ៥៩ នាទី៖</strong><br>
              ការដកគំរូពិនិត្យ ១ គ្រាប់រៀងរាល់ ១ ម៉ោងម្តង ទុកឱ្យផលិតផលក្នុងរយៈពេល <strong>៥៩ នាទីស្ថិតក្នុងហានិភ័យទាំងស្រុង</strong>! ប្រសិនបើផ្លែកាត់ចាប់ផ្តើមសឹកនៅនាទីទី ០៥ នោះទំនិញខូចរយៈពេល ៥៥ នាទីបានរត់ទៅដំណាក់កាលបន្ទាប់បាត់ទៅហើយ មុនពេលគេពិនិត្យឃើញ។
            </div>
            <p style="font-size: 0.9rem;">
              ការបំពាក់ឧបករណ៍ចាប់ស្វ័យប្រវត្តិ ១០០% លុបបំបាត់គម្លាតនេះទាំងស្រុង។ ត្រូវធ្វើតេស្តសាកល្បងសេនស័រជារៀងរាល់ថ្ងៃជាមួយគំរូខូចមេ (Master defective sample)។
            </p>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">🛡️</span>
              <h3>ការទប់ស្កាត់បន្ទាន់ vs ការការពារការកើតឡើងវិញ</h3>
            </div>
            <div class="callout-box" style="margin-bottom: 12px;">
              <strong>ការទប់ស្កាត់បន្ទាន់ (Containment):</strong><br>
              ការរើសទំនិញ ៤,០០០ គ្រាប់ ជួយដកទំនិញខូចចេញនៅថ្ងៃនេះ។ នេះគ្រាន់តែជួយសង្គ្រោះឡូត៍ទំនិញប៉ុណ្ណោះ តែមិនបានដោះស្រាយឫសគល់បញ្ហាឡើយ។
            </div>
            <div class="callout-box green-box">
              <strong>ការការពារការកើតឡើងវិញជាប្រព័ន្ធ (Recurrence Prevention):</strong><br>
              ការដំឡើង Jig ទប់គន្លឹះ និងប្រព័ន្ធចាក់សោម៉ាស៊ីន ជួយការពារកុំឱ្យកំហុសនោះអាចកើតឡើងបានជារៀងរហូត!
            </div>
            <p style="margin-top: 10px; font-size: 0.9rem;">
              ត្រូវផ្ទៀងផ្ទាត់ឫសគល់បញ្ហាដោយភស្តុតាងជាក់ស្តែង កែប្រែស្តង់ដារបច្ចេកទេស កែសម្រួលការបណ្តុះបណ្តាល និងកំណត់ការចុះសវនកម្មតាមដាន។
            </p>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ:</strong></p>
        <p>សង្កត់ធ្ងន់លើឧទាហរណ៍ "៥៩ នាទី" ក្នុងទំព័រ ៣៤ នៃឯកសារដើម។ ការពិនិត្យ ១ ម៉ោងម្តង មិនមែនជាការការពាររឹងមាំទេ។ បើម៉ាស៊ីនផលិតបាន ១០ គ្រាប់ក្នុង ១ នាទី មានន័យថា ៥៩០ គ្រាប់កំពុងប្រឈមនឹងការខូចខាត។</p>
      `
    },

    'slide-34': {
      title: 'ម៉ូឌុលទី ៦៖ រចនាសម្ព័ន្ធតារាងស្តង់ដារ QA Network Sheet',
      segment: '១៤:៤៥ - ១៥:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag teal-tag">ម៉ូឌុលទី ៦ — រចនាសម្ព័ន្ធឯកសារការងារ</span>
          <h2 class="slide-title">រចនាសម្ព័ន្ធតារាងស្តង់ដារ QA Network Sheet</h2>
          <p class="slide-lead">តារាងដ៏មានប្រយោជន៍មួយ ត្រូវតែរៀបរាប់ដំណើររឿងច្បាស់លាស់ ចាប់ពីដំណាក់កាលផលិតកម្ម រហូតដល់សកម្មភាពត្រួតពិនិត្យ។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle">📄</span>
              <h3>ផ្នែកក្បាល &amp; លំដាប់ដំណើរការ</h3>
            </div>
            <ul>
              <li><strong>ក្បាលឯកសាររដ្ឋបាល៖</strong> ឈ្មោះគ្រឿងបន្លាស់, លេខកូដ Part No., ខ្សែសង្វាក់ផលិតកម្ម, កាលបរិច្ឆេទ, កំណែកែប្រែ, និងឈ្មោះសមាជិកក្រុមចម្រុះមុខងារ។</li>
              <li><strong>លំដាប់ដំណើរការ៖</strong> លេខរៀងជំហាន (Step No.), ឈ្មោះស្ថានីយ, និងសកម្មភាពប្រតិបត្តិការរូបវន្ត។</li>
              <li><strong>ប្រវត្តិបញ្ហាសក្តានុពល៖</strong> ទម្រង់នៃការខូច, យន្តការបរាជ័យ, និងការចាត់ថ្នាក់ឫសគល់តាម 6M។</li>
              <li><strong>ការវិភាគការខូចខាតបន្ត៖</strong> ផលវិបាកលើស្ថានីយបន្ទាប់, រោងចក្រអតិថិជន, និងអ្នកប្រើប្រាស់ចុងក្រោយ។</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">📊</span>
              <h3>ជួរឈរវាយតម្លៃ &amp; វិធានការកែលម្អ</h3>
            </div>
            <ul>
              <li><strong>កម្រិតធ្ងន់ធ្ងរ (Severity Ranking):</strong> S, X, XA, XB, R, E, V, A, B, ឬ C។</li>
              <li><strong>កម្រិតគោលដៅ (Target):</strong> កម្រិតគោលដៅ A, B, ឬ C។</li>
              <li><strong>ស្ថានភាពបច្ចុប្បន្ន (Baseline):</strong> កម្រិតការពារការកើត (1–4) &bull; កម្រិតការពារការធ្លាយ (1–4) &bull; កម្រិតធានាសរុប (A–F)។</li>
              <li><strong>ការវិភាគគម្លាត (Gap):</strong> សញ្ញាសម្គាល់ភ្លាមៗ ប្រសិនបើកម្រិតធានាទាបជាងគោលដៅ។</li>
              <li><strong>ផែនការសកម្មភាព៖</strong> វិធានការជាក់លាក់, អ្នកទទួលខុសត្រូវ, កាលបរិច្ឆេទ, និងពិន្ទុវាយតម្លៃឡើងវិញក្រោយពេលកែលម្អ។</li>
            </ul>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១៤:៤៥ - ១៥:០០):</strong></p>
        <p>បង្ហាញតារាងគំរូ QA Network Sheet ដូចក្នុងទំព័រ ៣៦ នៃឯកសារដើម។ ពន្យល់ពីរបៀបដែលជួរឈរនីមួយៗតភ្ជាប់គ្នាពីឆ្វេងទៅស្តាំ។</p>
      `
    },

    'slide-35': {
      title: 'ករណីសិក្សាទី ១ & ២៖ ការចាក់ពុម្ពជ័រ & ការកាត់កៀបដែក',
      segment: '១៤:៤៥ - ១៥:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag teal-tag">ម៉ូឌុលទី ៦ — ករណីសិក្សាក្នុងរោងចក្រ</span>
          <h2 class="slide-title">ករណីសិក្សាទី ១ &amp; ២៖ ការចាក់ពុម្ពជ័រ &amp; ការកាត់កៀបដែក</h2>
          <p class="slide-lead">ការអនុវត្តជាក់ស្តែងក្នុងរោងចក្រ បង្ហាញពីការបង្កើតកំហុស ការផ្ទេរបន្ត និងរបាំងការពារ។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle">🧪</span>
              <h3>ករណីទី ១៖ ការចាក់ពុម្ពក្បាលដោតប្លាស្ទិក (Injection Molding)</h3>
            </div>
            <ul>
              <li><strong>ការសម្ងួតជ័រ៖</strong> ជ័រសើមបណ្តាលឱ្យមានពពុះខ្យល់ និងស្រួយបាក់គន្លឹះ &rarr; <em>វិធានការ៖</em> សេនស័រវាស់សំណើម Dew point ភ្ជាប់ប្រព័ន្ធចាក់សោម៉ាស៊ីន។</li>
              <li><strong>ការចាក់ពុម្ព៖</strong> សាច់ជ័រមិនពេញ (Short shot) និងជ័រលើស (Flash) &rarr; <em>វិធានការ៖</em> សេនស័រសម្ពាធក្នុងពុម្ព និងការកំណត់កម្រិតកម្ដៅពុម្ព។</li>
              <li><strong>ការដោតម្ជុល៖</strong> ម្ជុលកោង ឬដោតមិនចូល &rarr; <em>វិធានការ៖</em> សេនស័រអុបទិកវាស់កម្ពស់ម្ជុល និងការតេស្តចរន្តអគ្គិសនី ១០០%។</li>
              <li><strong>ការវេចខ្ចប់៖</strong> ច្រឡំស្លាកសញ្ញា &rarr; <em>វិធានការ៖</em> ឧបករណ៍ស្កេនបាកូដផ្គូផ្គងស្លាកកេសជាមួយ RFID របស់ធុង។</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle amber-icon">⚙️</span>
              <h3>ករណីទី ២៖ ការកាត់កៀបដែក &amp; ការខាត់គែមមុត (Stamping)</h3>
            </div>
            <ul>
              <li><strong>ការកៀបដែក៖</strong> ផ្លែពុម្ពសឹកបណ្តាលឱ្យមានគែមមុតខ្លាំង &rarr; <em>វិធានការ៖</em> ឧបករណ៍វាស់កម្លាំងទម្ងន់សង្កត់ (Tonnage monitor) និងកាលវិភាគថែទាំតាមចំនួនដងវាយ។</li>
              <li><strong>ការខាត់គែមមុត៖</strong> ធុងរំញ័រខាត់បិទបាំងភស្តុតាងនៃគែមមុត &rarr; <em>វិធានការ៖</em> ការពិនិត្យបំណែកទីមួយដោយប្រើរង្វាស់ Go/No-go ring gauge។</li>
              <li><strong>ការខួងរន្ធ CNC៖</strong> អង្កត់ផ្ចិតរន្ធរអិលដោយសារផ្លែខួងសឹក &rarr; <em>វិធានការ៖</em> ឧបករណ៍ Touch-probe វាស់ស្ទាបផ្លែកាត់ស្វ័យប្រវត្តិនារៀងរាល់ ៥០ វដ្តម្តង។</li>
            </ul>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១៥:០០ - ១៥:១៥):</strong></p>
        <p>បង្ហាញករណីសិក្សាទាំងពីរក្នុងទំព័រ ៣៧ នៃឯកសារដើម។ បង្ហាញពីរបៀបដែលដំណើរការមួយប៉ះពាល់លើដំណើរការមួយទៀត (Stamping wear បង្កើន Burr ធ្វើឱ្យ Deburring លាក់ភស្តុតាង)។</p>
      `
    },

    'slide-36': {
      title: 'ករណីសិក្សាទី ៣ & ៤៖ ការផ្សារដែក & ការវេចខ្ចប់តាមដាន',
      segment: '១៤:៤៥ - ១៥:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag teal-tag">ម៉ូឌុលទី ៦ — ករណីសិក្សាក្នុងរោងចក្រ</span>
          <h2 class="slide-title">ករណីសិក្សាទី ៣ &amp; ៤៖ ការផ្សារដែក &amp; ការវេចខ្ចប់តាមដាន</h2>
          <p class="slide-lead">ការដោះស្រាយចំណុចតភ្ជាប់សុវត្ថិភាពសំខាន់ៗ និងការច្រឡំស្លាកសញ្ញាដែលកើតឡើងញឹកញាប់។</p>
        </div>

        <div class="grid-2">
            <div class="card-icon-header">
              <span class="card-icon-circle red-icon">🔥</span>
              <h3>ករណីទី ៣៖ ការផ្សារដោយរ៉ូបូត (Robotic Welding)</h3>
            </div>
            <p><strong>គ្រោះថ្នាក់៖</strong> សាច់ផ្សារមិនចូលគ្នាពេញលេញ និងមានប្រហោងខ្យល់ក្នុងជើងទម្រតម្រង់ទិសរថយន្ត។</p>
            <ul>
              <li><strong>ការបង្កើតកំហុស៖</strong> ឧបករណ៍កៀប (Clamp) ដាក់មិនត្រូវទីតាំងមុនពេលរ៉ូបូតចាប់ផ្តើមផ្សារ។</li>
              <li><strong>របាំងបរាជ័យ៖</strong> ការពិនិត្យដោយភ្នែកក្រោយផ្សាររួច មិនអាចមើលឃើញជម្រៅជ្រាបចូលនៃសាច់ផ្សារខាងក្នុងឡើយ!</li>
              <li><strong>វិធានការ QA Network៖</strong> បំពាក់សេនស័រ Proximity interlock ដើម្បីធានាថាគ្រឿងបន្លាស់ត្រូវទីតាំង ១០០% ទើបរ៉ូបូតដំណើរការ; ធ្វើតេស្តរលកសំឡេង Ultrasonic លើបំណែកទីមួយ។</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle purple-icon">📦</span>
              <h3>ករណីទី ៤៖ ការវេចខ្ចប់ &amp; ការតាមដានប្រវត្តិ (Traceability)</h3>
            </div>
            <p><strong>គ្រោះថ្នាក់៖</strong> ការបិទស្លាកលេខកូដខុសលើកេសទំនិញដឹកជញ្ជូន។</p>
            <ul>
              <li><strong>ការបង្កើតកំហុស៖</strong> ធុងពីរនៅក្បែរគ្នាដាក់គ្រឿងបន្លាស់ស្រដៀងគ្នាខ្លាំង; ម៉ាស៊ីនព្រីនស្លាករួមគ្នាមួយអនុញ្ញាតឱ្យជ្រើសរើសស្លាកមួយណាក៏បានដោយគ្មានការផ្ទៀងផ្ទាត់។</li>
              <li><strong>វិធានការ QA Network៖</strong> ធ្វើរបាំងបែងចែកធុងដាច់ពីគ្នា; បំពាក់ឧបករណ៍ស្កេនបាកូដដែលតម្រូវឱ្យស្កេនកេសសិនទើបម៉ាស៊ីនព្រីនស្លាកចេញ; អនុវត្តវិន័យ Line clearance ពេលប្តូរវេន។</li>
            </ul>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១៥:១៥ - ១៥:៣០):</strong></p>
        <p>បង្ហាញករណីទី ៣ និង ទី ៤ ក្នុងទំព័រ ៣៨ នៃឯកសារដើម។ ការផ្សារដែកមិនអាចពិនិត្យដោយភ្នែកទទេបានទេ ព្រោះបញ្ហានៅខាងក្នុងសាច់ដែក។ ការវេចខ្ចប់ក៏ត្រូវចាត់ទុកជាផ្នែកនៃគុណភាពផលិតផលដែរ។</p>
      `
    },

    'slide-37': {
      title: 'ការអនុវត្តផែនការ, សូចនាករ KPI នាំមុខ & ការឆ្លើយតបបន្ទាន់',
      segment: '១៥:៣០ - ១៦:០០',
      content: `
        <div class="slide-header">
          <span class="section-tag teal-tag">ម៉ូឌុលទី ៦ — ការរក្សាឧត្តមភាព</span>
          <h2 class="slide-title">ការអនុវត្តផែនការ, សូចនាករ KPI នាំមុខ &amp; ការឆ្លើយតបបន្ទាន់</h2>
          <p class="slide-lead">ប្រែក្លាយការវាយតម្លៃឱ្យទៅជាវិធានការជាក់ស្តែងដែលអាចធ្វើតេស្តបាន ជាមួយព្រំដែនទប់ស្កាត់ច្បាស់លាស់។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">📋</span>
              <h3>ការបង្កើតផែនការសកម្មភាពដែលអាចធ្វើតេស្តបាន</h3>
            </div>
            <div class="callout-box red-box" style="margin-bottom: 10px;">
              <strong>វិធានការស្រពិចស្រពិល (ធ្លាក់សវនកម្ម):</strong> "ពង្រឹងការបណ្តុះបណ្តាល និងប្រាប់កម្មករឱ្យមានការប្រុងប្រយ័ត្នខ្ពស់។"
            </div>
            <div class="callout-box green-box">
              <strong>វិធានការដែលអាចធ្វើតេស្តបាន (កម្រិតពិភពលោក):</strong> "ដំឡើង Jig ទម្រដែលមានរាងចាក់សោ, ធ្វើតេស្តសាកល្បងដោយចេតនាដាក់បញ្ច្រាសចំនួន ២០ ដង, កែប្រែ WI ដោយដាក់រូបថតពណ៌, និងធ្វើសវនកម្មជារៀងរាល់ថ្ងៃរយៈពេល ៤ សប្តាហ៍។"
            </div>
            <p style="margin-top: 10px; font-size: 0.9rem;">
              ត្រូវតែកំណត់អ្នកទទួលខុសត្រូវតែម្នាក់គត់ កាលបរិច្ឆេទកំណត់ វិធានការទប់ស្កាត់បណ្តោះអាសន្ន និងលក្ខណៈវិនិច្ឆ័យវាយតម្លៃបញ្ចប់។
            </p>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle amber-icon">🚨</span>
              <h3>សូចនាករ KPI នាំមុខ &amp; ផែនការឆ្លើយតបបន្ទាន់</h3>
            </div>
            <ul>
              <li><strong>សូចនាករនាំមុខ (Leading KPIs):</strong> អត្រាតេស្តជាប់នៃឧបករណ៍ Poka-yoke ប្រចាំថ្ងៃ, កំណត់ត្រាព្រឹត្តិការណ៍ Bypass សេនស័រ, អត្រាបញ្ចប់ការថែទាំ PM។</li>
              <li><strong>សូចនាករតាមក្រោយ (Lagging KPIs):</strong> ទឹកប្រាក់ខាតបង់ Scrap (THB), អត្រាកំហុស PPM, ការបង្វិលទំនិញពីអតិថិជន។</li>
              <li><strong>ពិធីសារឆ្លើយតបបន្ទាន់៖</strong> នៅពេលសេនស័របរាជ័យ ត្រូវឃាត់ទំនិញត្រឡប់ថយក្រោយរហូតដល់ <em>ចំណុចចុងក្រោយដែលត្រូវបានពិនិត្យថាល្អ</em> មិនមែនឃាត់តែមួយគ្រាប់នៅនឹងម៉ាស៊ីននោះឡើយ!</li>
            </ul>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១៥:៣០ - ១៥:៤៥):</strong></p>
        <p>ពន្យល់ពីទំព័រ ៣៩-៤០ នៃឯកសារដើម។ ពេលសេនស័រខូចនៅម៉ោង ១០:២០ មិនមែនចាប់តែទំនិញនៅម៉ោង ១០:២០ ទេ ត្រូវចាប់តាំងពីពេលដែលតេស្តសេនស័រល្អលើកចុងក្រោយ (ឧ. ម៉ោង ០៨:០០)។</p>
      `
    },

    'slide-38': {
      title: 'ម៉ាស៊ីនគណនា & កម្មវិធីពិសោធន៍ម៉ាទ្រីស QA Network',
      segment: 'ការពិសោធន៍ក្នុងសិក្ខាសាលា',
      content: `
        <div class="slide-header">
          <span class="section-tag amber-tag">ការពិសោធន៍អន្តរកម្ម</span>
          <h2 class="slide-title">ម៉ាស៊ីនគណនា &amp; កម្មវិធីពិសោធន៍ម៉ាទ្រីស QA Network</h2>
          <p class="slide-lead">សាកល្បងសេណារីយ៉ូជាក់ស្តែង៖ ជ្រើសរើសកម្រិតធ្ងន់ធ្ងរ កម្រិតការពារការកើត និងកម្រិតការពារការធ្លាយ ដើម្បីគណនាពិន្ទុ និងស្វែងរកគម្លាត។</p>
        </div>

        <div class="simulator-card">
          <div class="sim-control-group">
            <div class="sim-field">
              <label for="sim-severity">១. កម្រិតភាពធ្ងន់ធ្ងរនៃកំហុស (Severity):</label>
              <select id="sim-severity" class="sim-select" onchange="runSimCalculation()">
                <option value="S">S — សុវត្ថិភាព / គ្រោះថ្នាក់ចរាចរណ៍ (ហ្វ្រាំង, ប្រេងឥន្ធនៈ)</option>
                <option value="X">X — ឡានឈប់ភ្លាមៗ ផ្នែកមិនមានចលនា (ជន្ទល់កង់បាក់)</option>
                <option value="XA">XA — ឡានឈប់ភ្លាមៗ ផ្នែកមានចលនា (ប៉ុងក្រោយគាំង)</option>
                <option value="XB">XB — ឡានឈប់ភ្លាមៗ ដោយសារលេចធ្លាយប្រេង</option>
                <option value="R">R — បទប្បញ្ញត្តិ / ច្បាប់រដ្ឋ</option>
                <option value="E">E — បរិស្ថាន / ការបំភាយឧស្ម័នពុល</option>
                <option value="V">V — ប៉ះពាល់ខ្សែសង្វាក់រោងចក្រដំឡើងអតិថិជន</option>
                <option value="A">A — គ្រឿងវិលខូច តែឡាននៅរត់បាន (លាន់ឮសំឡេង)</option>
                <option value="B">B — គ្រឿងមិនវិលខូច តែឡាននៅរត់បាន (ជ្រាបប្រេងតិចតួច)</option>
                <option value="C">C — រូបរាង / សោភ័ណភាពខាងក្រៅ (ស្នាមច្រែះលើកាង)</option>
              </select>
            </div>

            <div class="sim-field">
              <label for="sim-occurrence">២. កម្រិតការពារការកើតឡើង (Occurrence):</label>
              <select id="sim-occurrence" class="sim-select" onchange="runSimCalculation()">
                <option value="1">Level 1 — ឧបករណ៍ស្វ័យប្រវត្តិ ១០០% (Poka-yoke)</option>
                <option value="2" selected>Level 2 — ឧបករណ៍ដំណើរការដោយមនុស្ស</option>
                <option value="3">Level 3 — មនុស្សអនុវត្តតាម WI</option>
                <option value="4">Level 4 — គ្មាន WI ឬដំណើរការខ្វះការគ្រប់គ្រង</option>
              </select>
            </div>

            <div class="sim-field">
              <label for="sim-flowout">៣. កម្រិតការពារការធ្លាយចេញ (Flow-Out):</label>
              <select id="sim-flowout" class="sim-select" onchange="runSimCalculation()">
                <option value="1">Level 1 — សេនស័រ / កាមេរ៉ាស្វ័យប្រវត្តិ ១០០%</option>
                <option value="2" selected>Level 2 — ឧបករណ៍វាស់ដោយមនុស្ស</option>
                <option value="3">Level 3 — មើលដោយភ្នែកតាម WI</option>
                <option value="4">Level 4 — គ្មានឧបករណ៍ចាប់កំហុស</option>
              </select>
            </div>
          </div>

          <div class="sim-result-panel">
            <div class="result-metric">
              <div class="metric-label">កម្រិតគោលដៅជាកាតព្វកិច្ច</div>
              <div class="metric-val" id="res-target" style="color: #34d399;">A</div>
            </div>

            <div class="result-metric">
              <div class="metric-label">កម្រិតធានាសរុបបច្ចុប្បន្ន</div>
              <div class="metric-val" id="res-assurance" style="color: #38bdf8;">B</div>
            </div>

            <div class="result-metric">
              <div class="metric-label">ស្ថានភាពគម្លាតហានិភ័យ</div>
              <div class="metric-val" id="res-status" style="font-size: 1.15rem; color: #fbbf24;">មានគម្លាតហានិភ័យ</div>
            </div>
          </div>

          <div id="res-recommendation" class="callout-box amber-box" style="margin-top: 16px;">
            <strong>អនុសាសន៍វិស្វកម្ម៖</strong> គោលដៅដែលត្រូវសម្រេចគឺកម្រិត <strong>A</strong> ប៉ុន្តែកម្រិតធានាបច្ចុប្បន្នបានត្រឹម <strong>B</strong>។ ត្រូវដំឡើងកម្រិតការពារការកើតឡើងទៅ Level 1 (Poka-Yoke ស្វ័យប្រវត្តិ) ឬដំឡើងកម្រិតការពារការធ្លាយចេញទៅ Level 1 (កាមេរ៉ាស្វ័យប្រវត្តិ) ដើម្បីបិទគម្លាតនេះ។
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ:</strong></p>
        <p>អញ្ជើញសិក្ខាកាមឡើងមកចុចសាកល្បងផ្ទាល់លើអេក្រង់! ជ្រើសរើសករណីជាក់ស្តែងក្នុងរោងចក្ររបស់ពួកគេ ហើយមើលថាតើប្រព័ន្ធគណនាចេញមកមាន Gap ឬយ៉ាងណា។</p>
      `
    },

    'slide-39': {
      title: 'សេចក្តីសង្ខេបវគ្គសិក្សា, ការអនុវត្តបន្ត & សំណួរ-ចម្លើយ',
      segment: '១៥:៣០ - ១៦:០០',
      content: `
        <div class="hero-layout">
          <div class="hero-pill-group">
            <span class="hero-pill">ការសន្និដ្ឋានបញ្ចប់វគ្គ</span>
            <span class="hero-pill teal-pill">វិញ្ញាបនបត្រ ZERO DEFECT</span>
            <span class="hero-pill purple-pill">KAIZEN ជាបន្តបន្ទាប់</span>
          </div>

          <h2 class="hero-title">
            កសាងគុណភាពនៅប្រភពដើម &bull; <span class="gradient-text">គ្មានបញ្ហារបូតចេញ</span>
          </h2>

          <div class="grid-3" style="width: 100%; max-width: 1100px; margin-bottom: 24px; text-align: left;">
            <div class="concept-card">
              <div class="card-icon-header">
                <span class="card-icon-circle green-icon">1</span>
                <h3>ការទប់ស្កាត់ជាមុន</h3>
              </div>
              <p>បញ្ឈប់កំហុសនៅកម្រិត D និង C។ ផ្តល់អាទិភាពដល់ Poka-yoke ដោយម៉ាស៊ីន ជាជាងការរំពឹងលើការប្រុងប្រយ័ត្នរបស់មនុស្ស។</p>
            </div>

            <div class="concept-card">
              <div class="card-icon-header">
                <span class="card-icon-circle">2</span>
                <h3>ឈរលើការពិតជាក់ស្តែង</h3>
              </div>
              <p>អនុវត្ត Go &amp; See (Genchi Genbutsu) តាមក្បួន 5 Gen។ ជឿជាក់លើតែភស្តុតាងរូបវន្តដែលអាចធ្វើតេស្តបានប៉ុណ្ណោះ។</p>
            </div>

            <div class="concept-card">
              <div class="card-icon-header">
                <span class="card-icon-circle purple-icon">3</span>
                <h3>វដ្ត PDCA ជាប់ជានិច្ច</h3>
              </div>
              <p>ធ្វើបច្ចុប្បន្នភាពតារាង QA Network ឡើងវិញជាប្រចាំ រាល់ពេលមានការផ្លាស់ប្តូរ 4M ឬមានបញ្ហាមិនប្រក្រតីកើតឡើង។</p>
            </div>
          </div>

          <div style="display: flex; gap: 16px;">
            <button class="hud-nav-btn" onclick="jumpToSlide(37)" style="background: var(--qa-primary); color: #fff; padding: 10px 24px;">
              <span>🧮 បើកម៉ាស៊ីនគណនាពិសោធន៍</span>
            </button>
            <button class="hud-nav-btn" onclick="jumpToSlide(0)" style="padding: 10px 24px;">
              <span>⏮️ ចាប់ផ្តើមវគ្គសិក្សាឡើងវិញ</span>
            </button>
          </div>

          <div style="margin-top: 32px; font-size: 0.9rem; color: var(--text-dim);">
            សូមថ្លែងអំណរគុណចំពោះការចូលរួម! សំណួរ ចម្លើយ &amp; សកម្មភាពអនុវត្តបន្តក្នុងខ្សែសង្វាក់ផលិតកម្ម។
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១៥:៤៥ - ១៦:០០):</strong></p>
        <p>ថ្លែងអំណរគុណដល់សិក្ខាកាមទាំងអស់។ ផ្តល់កិច្ចការផ្ទះ៖ ក្រុមនីមួយៗត្រូវជ្រើសរើសខ្សែសង្វាក់ ១ ក្នុងរោងចក្ររបស់ខ្លួន ដើម្បីបង្កើតតារាង QA Network ពេញលេញ និងរាយការណ៍ក្នុងរយៈពេល ២ សប្តាហ៍។</p>
      `
    }
  };

  // --------------------------------------------------------------------------
  // Core Presentation Initialization
  // --------------------------------------------------------------------------
  function initPresentation() {
    slides = Array.from(document.querySelectorAll('.slide'));
    totalSlides = slides.length;

    // Cache English originals for dynamic translation toggling
    slides.forEach((slide) => {
      const id = slide.id;
      slideOriginals[id] = {
        title: slide.getAttribute('data-title') || '',
        segment: slide.getAttribute('data-segment') || '',
        content: slide.innerHTML,
        notes: getSlideEnglishNotes(id)
      };
    });

    // Populate Overview Grid
    buildOverviewGrid();

    // Register Keyboard & Navigation Event Handlers
    document.addEventListener('keydown', handleKeyNavigation);

    // Presenter Laser Pointer Tracking
    document.addEventListener('mousemove', handleLaserMovement);

    // Initial Slide Display
    showSlide(currentSlideIndex);

    // Run Initial Simulation Calculation
    runSimCalculation();
  }

  // --------------------------------------------------------------------------
  // Speaker Notes Extraction Helper
  // --------------------------------------------------------------------------
  function getSlideEnglishNotes(slideId) {
    // English default speaking notes corresponding to each slide
    const EN_NOTES = {
      'slide-1': '<p><strong>Trainer Script (09:00 - 09:10):</strong> Welcome participants to the QA Network Master Training. Emphasize that QA Network is about designing quality into the process so defects can never arise.</p>',
      'slide-2': '<p><strong>Trainer Script (09:10 - 09:20):</strong> Review course objectives. Ask trainees: "Has your plant ever shipped a defect that slipped past final QC?" Emphasize how QA Network prevents this escape.</p>',
      'slide-3': '<p><strong>Trainer Script (09:20 - 09:30):</strong> Walk through the 1-day agenda. Point out the afternoon workshop at 14:45 where groups will build real QA Network sheets.</p>',
      'slide-4': '<p><strong>Trainer Script (09:30 - 09:45):</strong> Explain Conformity vs Effectiveness. A part passing final inspection today does not prove the process is capable tomorrow if tooling offsets drift.</p>',
      'slide-5': '<p><strong>Trainer Script (09:45 - 10:00):</strong> QC = Find defects; QA = Prevent defects. Both are needed, but QA provides 10x higher financial leverage.</p>',
      'slide-6': '<p><strong>Trainer Script (10:00 - 10:15):</strong> Highlight the 3 lines of defense. When operators bypass line 2 sensors, the line relies solely on final inspection.</p>',
      'slide-7': '<p><strong>Trainer Script (10:15 - 10:30):</strong> Teach the 6M lens: Man, Machine, Material, Method, Measurement, Mother Nature. Never jump to "operator careless" conclusions.</p>',
      'slide-8': '<p><strong>Trainer Script (10:30 - 10:45):</strong> Discuss visible scrap vs hidden losses like engineering firefighting and customer trust erosion.</p>',
      'slide-9': '<p><strong>Trainer Script (10:45 - 11:00):</strong> Explain the COQ Iceberg. Visible scrap is just 15%; 85% of poor quality costs lie submerged below the waterline.</p>',
      'slide-10': '<p><strong>Trainer Script:</strong> Ask participants to classify shop-floor activities into Prevention, Appraisal, Internal Failure, and External Failure.</p>',
      'slide-11': '<p><strong>Trainer Script:</strong> Walk through the monthly calculation: Failure cost is 42.3% of total COQ. Reducing failure is pure profit recovery.</p>',
      'slide-12': '<p><strong>Trainer Script:</strong> Explain the cost curves. Increased investment in prevention causes failure costs to plummet exponentially.</p>',
      'slide-13': '<p><strong>Trainer Script:</strong> Key insight: Frequency Pareto (burrs 60%) often contradicts Cost Pareto (leaks 89.1%). Never prioritize by unit count alone!</p>',
      'slide-14': '<p><strong>Trainer Script:</strong> Demonstrate the THB 40,000 fixture payback calculation. A 4.4-month payback is an easy justification for management approval.</p>',
      'slide-15': '<p><strong>Trainer Script:</strong> Define QA Network: Process-connected nodes tracing defect pathways from creation to escape.</p>',
      'slide-16': '<p><strong>Trainer Script:</strong> Emphasize the 3 prerequisites: Implement before problems occur, form a cross-functional team, and use Go & See facts.</p>',
      'slide-17': '<p><strong>Trainer Script:</strong> Explain the 1-30-300-3000 rule. Stopping defects at Level D and C prevents catastrophic Level A recalls.</p>',
      'slide-18': '<p><strong>Trainer Script:</strong> Emphasize calibrating severity definitions before scoring so team members do not argue about severity.</p>',
      'slide-19': '<p><strong>Trainer Script:</strong> Review scope rules. Emphasize that whenever a production defect occurs, corrective actions must be updated into the QA Network.</p>',
      'slide-20': '<p><strong>Trainer Script:</strong> Contrast the written Control Plan with shop-floor reality: camera in document vs camera disabled by maintenance.</p>',
      'slide-21': '<p><strong>Trainer Script:</strong> Review PDCA. Warn about sample exposure: 30 test units do not prove a 10,000-unit production line is defect-free.</p>',
      'slide-22': '<p><strong>Trainer Script:</strong> Walk through the 5 steps and 11 sub-steps of the QA Network methodology roadmap.</p>',
      'slide-23': '<p><strong>Trainer Script:</strong> Step 1: Brainstorm potential defects without considering existing safeguards!</p>',
      'slide-24': '<p><strong>Trainer Script:</strong> Review the 10 severity symbols: S, X, XA, XB, R, E, V, A, B, C. When evaluating vehicle OEM impact, assume no inspection by customer.</p>',
      'slide-25': '<p><strong>Trainer Script:</strong> Teach the target conversion table. Safety and vehicle-stop defects (S, X, XA, XB) must achieve Target A.</p>',
      'slide-26': '<p><strong>Trainer Script:</strong> Occurrence Prevention Levels 1 to 4: Automated device vs manual device vs operator with WI vs no WI.</p>',
      'slide-27': '<p><strong>Trainer Script:</strong> Flow-Out Prevention Levels 1 to 4: Automated sensor vs manual gauge vs visual check vs no detection.</p>',
      'slide-28': '<p><strong>Trainer Script:</strong> Teach the 4x4 Total Assurance Matrix. Show how Occurrence Level 2 + Flow-out Level 2 yields Level B.</p>',
      'slide-29': '<p><strong>Trainer Script:</strong> Step 4 & 5: Three approaches to improve assurance, and post-improvement re-evaluation.</p>',
      'slide-30': '<p><strong>Trainer Script:</strong> Module 4: Go & See (Genchi Genbutsu) and the 5 Gen framework (Genba, Genbutsu, Genjitsu, Genri, Gensoku).</p>',
      'slide-31': '<p><strong>Trainer Script:</strong> Good evidence vs assumptions. Compare testable observations with unsupported conclusions.</p>',
      'slide-32': '<p><strong>Trainer Script:</strong> Priority score P = S x W (1 to 16). Highlight the safety override rule.</p>',
      'slide-33': '<p><strong>Trainer Script:</strong> Explain the 59-minute exposure gap of hourly sampling. Containment vs true recurrence prevention.</p>',
      'slide-34': '<p><strong>Trainer Script:</strong> Walk through the standard columns and fields of the QA Network Sheet.</p>',
      'slide-35': '<p><strong>Trainer Script:</strong> Case Studies 1 & 2: Plastic connector injection molding and progressive metal stamping.</p>',
      'slide-36': '<p><strong>Trainer Script:</strong> Case Studies 3 & 4: Robotic welding clamp misalignment and packaging barcode label verification.</p>',
      'slide-37': '<p><strong>Trainer Script:</strong> Testable action plans and escalation reaction: hold suspect parts back to the last verified good check.</p>',
      'slide-38': '<p><strong>Trainer Script:</strong> Invite trainees to interact with the Live QA Network Matrix Calculator on screen.</p>',
      'slide-39': '<p><strong>Trainer Script:</strong> Conclude the course, summarize key takeaways, and assign the shop-floor QA Network homework.</p>'
    };

    return EN_NOTES[slideId] || '<p>General guidance: Facilitate discussion and connect concepts to physical shop-floor examples.</p>';
  }

  // --------------------------------------------------------------------------
  // Navigation Engine
  // --------------------------------------------------------------------------
  function showSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;

    slides.forEach((slide, idx) => {
      slide.classList.remove('active');
      if (idx === index) {
        slide.classList.add('active');
      }
    });

    currentSlideIndex = index;
    updateHUD();
    updatePresenterNotes();
    updateOverviewActiveCard();
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

  function jumpToSlide(index) {
    showSlide(index);
    if (isOverviewOpen) toggleOverview();
  }

  // --------------------------------------------------------------------------
  // HUD & Progress Indicators
  // --------------------------------------------------------------------------
  function updateHUD() {
    const counterEl = document.getElementById('slide-counter');
    const fillEl = document.getElementById('progress-fill');
    const modulePill = document.getElementById('module-pill');
    const segmentPill = document.getElementById('segment-pill');

    if (counterEl) {
      counterEl.textContent = `${currentSlideIndex + 1} / ${totalSlides}`;
    }

    if (fillEl) {
      const pct = ((currentSlideIndex + 1) / totalSlides) * 100;
      fillEl.style.width = `${pct}%`;
    }

    const activeSlide = slides[currentSlideIndex];
    if (activeSlide) {
      const title = activeSlide.getAttribute('data-title') || '';
      const segment = activeSlide.getAttribute('data-segment') || '';
      if (modulePill) {
        if (currentSlideIndex <= 2) modulePill.textContent = isKhmerActive ? 'សេចក្តីផ្តើម' : 'ORIENTATION';
        else if (currentSlideIndex <= 7) modulePill.textContent = isKhmerActive ? 'ម៉ូឌុល ១៖ គុណភាព' : 'MODULE 1: QUALITY';
        else if (currentSlideIndex <= 13) modulePill.textContent = isKhmerActive ? 'ម៉ូឌុល ២៖ COQ' : 'MODULE 2: COQ';
        else if (currentSlideIndex <= 20) modulePill.textContent = isKhmerActive ? 'ម៉ូឌុល ៣៖ QA NETWORK' : 'MODULE 3: QA NETWORK';
        else if (currentSlideIndex <= 28) modulePill.textContent = isKhmerActive ? 'វិធីសាស្ត្រ ៥ ជំហាន' : 'METHOD: 5 STEPS';
        else if (currentSlideIndex <= 30) modulePill.textContent = isKhmerActive ? 'ម៉ូឌុល ៤៖ 5 GEN' : 'MODULE 4: 5 GEN';
        else if (currentSlideIndex <= 32) modulePill.textContent = isKhmerActive ? 'ម៉ូឌុល ៥៖ ហានិភ័យ' : 'MODULE 5: RISK';
        else if (currentSlideIndex <= 36) modulePill.textContent = isKhmerActive ? 'ម៉ូឌុល ៦៖ ការអនុវត្ត' : 'MODULE 6: APPLICATION';
        else if (currentSlideIndex === 37) modulePill.textContent = isKhmerActive ? 'ពិសោធន៍ម៉ាទ្រីស' : 'SIMULATOR';
        else modulePill.textContent = isKhmerActive ? 'សន្និដ្ឋាន' : 'CONCLUSION';
      }

      if (segmentPill) {
        segmentPill.textContent = segment;
      }
    }
  }

  // --------------------------------------------------------------------------
  // Instant Bilingual Translation Engine (English <-> Khmer)
  // --------------------------------------------------------------------------
  function toggleLanguage() {
    isKhmerActive = !isKhmerActive;
    document.body.classList.toggle('khmer-mode', isKhmerActive);

    const langLabel = document.getElementById('lang-label');
    const langLabelTop = document.getElementById('lang-label-top');
    const labelText = isKhmerActive ? 'EN' : 'KH';

    if (langLabel) langLabel.textContent = labelText;
    if (langLabelTop) langLabelTop.textContent = labelText;

    slides.forEach((slide) => {
      const id = slide.id;
      if (isKhmerActive && KHMER_SLIDES[id]) {
        slide.innerHTML = KHMER_SLIDES[id].content;
        slide.setAttribute('data-title', KHMER_SLIDES[id].title);
        slide.setAttribute('data-segment', KHMER_SLIDES[id].segment);
      } else if (!isKhmerActive && slideOriginals[id]) {
        slide.innerHTML = slideOriginals[id].content;
        slide.setAttribute('data-title', slideOriginals[id].title);
        slide.setAttribute('data-segment', slideOriginals[id].segment);
      }
    });

    updateHUD();
    updatePresenterNotes();
    buildOverviewGrid();
    runSimCalculation();
  }

  // --------------------------------------------------------------------------
  // Presenter Notes Drawer
  // --------------------------------------------------------------------------
  function toggleNotes() {
    const panel = document.getElementById('presenter-notes-panel');
    const btn = document.getElementById('btn-notes');
    if (!panel) return;

    isNotesOpen = !isNotesOpen;
    panel.classList.toggle('open', isNotesOpen);
    if (btn) btn.classList.toggle('active', isNotesOpen);

    if (isNotesOpen) {
      updatePresenterNotes();
    }
  }

  function updatePresenterNotes() {
    const notesContent = document.getElementById('notes-content');
    const timingBadge = document.getElementById('notes-timing-badge');
    const activeSlide = slides[currentSlideIndex];
    if (!activeSlide || !notesContent) return;

    const id = activeSlide.id;
    const segment = activeSlide.getAttribute('data-segment') || '';
    if (timingBadge) timingBadge.textContent = segment;

    if (isKhmerActive && KHMER_SLIDES[id] && KHMER_SLIDES[id].notes) {
      notesContent.innerHTML = KHMER_SLIDES[id].notes;
    } else if (slideOriginals[id] && slideOriginals[id].notes) {
      notesContent.innerHTML = slideOriginals[id].notes;
    } else {
      notesContent.innerHTML = getSlideEnglishNotes(id);
    }
  }

  // --------------------------------------------------------------------------
  // Slide Overview Grid Modal
  // --------------------------------------------------------------------------
  function toggleOverview() {
    const modal = document.getElementById('overview-modal');
    const btn = document.getElementById('btn-overview');
    if (!modal) return;

    isOverviewOpen = !isOverviewOpen;
    modal.classList.toggle('open', isOverviewOpen);
    if (btn) btn.classList.toggle('active', isOverviewOpen);

    if (isOverviewOpen) {
      updateOverviewActiveCard();
    }
  }

  function closeOverview(e) {
    if (e.target.id === 'overview-modal') {
      toggleOverview();
    }
  }

  function buildOverviewGrid() {
    const grid = document.getElementById('overview-grid');
    if (!grid) return;

    grid.innerHTML = '';
    slides.forEach((slide, idx) => {
      const id = slide.id;
      const title = slide.getAttribute('data-title') || `Slide ${idx + 1}`;
      const card = document.createElement('div');
      card.className = `overview-card ${idx === currentSlideIndex ? 'active' : ''}`;
      card.id = `ov-card-${idx}`;
      card.innerHTML = `
        <span class="overview-card-num">#${idx + 1}</span>
        <span class="overview-card-title">${title}</span>
      `;
      card.addEventListener('click', () => jumpToSlide(idx));
      grid.appendChild(card);
    });
  }

  function updateOverviewActiveCard() {
    const cards = document.querySelectorAll('.overview-card');
    cards.forEach((card, idx) => {
      card.classList.toggle('active', idx === currentSlideIndex);
    });
  }

  // --------------------------------------------------------------------------
  // Laser Pointer & Halo
  // --------------------------------------------------------------------------
  function toggleLaser() {
    const dot = document.getElementById('laser-dot');
    const btn = document.getElementById('btn-laser');
    if (!dot) return;

    isLaserActive = !isLaserActive;
    dot.style.display = isLaserActive ? 'block' : 'none';
    if (btn) btn.classList.toggle('active', isLaserActive);
  }

  function handleLaserMovement(e) {
    if (!isLaserActive) return;
    const dot = document.getElementById('laser-dot');
    if (dot) {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    }
  }

  // --------------------------------------------------------------------------
  // Countdown Timer
  // --------------------------------------------------------------------------
  function toggleTimer() {
    const display = document.getElementById('timer-display');
    const btn = document.getElementById('btn-timer');

    if (isTimerRunning) {
      clearInterval(timerInterval);
      isTimerRunning = false;
      if (btn) btn.classList.remove('active');
    } else {
      isTimerRunning = true;
      if (btn) btn.classList.add('active');
      timerInterval = setInterval(() => {
        if (timerSeconds > 0) {
          timerSeconds--;
          const m = Math.floor(timerSeconds / 60);
          const s = timerSeconds % 60;
          if (display) {
            display.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
          }
        } else {
          clearInterval(timerInterval);
          isTimerRunning = false;
          if (btn) btn.classList.remove('active');
        }
      }, 1000);
    }
  }

  // --------------------------------------------------------------------------
  // Fullscreen Toggle
  // --------------------------------------------------------------------------
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  // --------------------------------------------------------------------------
  // Keyboard Shortcut Navigation
  // --------------------------------------------------------------------------
  function handleKeyNavigation(e) {
    // If user is inside an input/select, don't trigger slide shortcuts
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case 'PageDown':
      case ' ':
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
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
        toggleLanguage();
        break;
      case 'n':
      case 'N':
        toggleNotes();
        break;
      case 'o':
      case 'O':
        toggleOverview();
        break;
      case 'p':
      case 'P':
        toggleLaser();
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
        if (isOverviewOpen) toggleOverview();
        if (isNotesOpen) toggleNotes();
        break;
    }
  }

  // --------------------------------------------------------------------------
  // Interactive QA Network Matrix Calculator & Simulator Logic
  // --------------------------------------------------------------------------
  function runSimCalculation() {
    const sevSelect = document.getElementById('sim-severity');
    const occSelect = document.getElementById('sim-occurrence');
    const flowSelect = document.getElementById('sim-flowout');

    if (!sevSelect || !occSelect || !flowSelect) return;

    const sev = sevSelect.value;
    const occ = parseInt(occSelect.value, 10);
    const flow = parseInt(flowSelect.value, 10);

    // 1. Calculate Required Target
    let target = 'C';
    if (['S', 'X', 'XA', 'XB'].includes(sev)) {
      target = 'A';
    } else if (['E', 'R', 'V', 'A', 'B'].includes(sev)) {
      target = 'B';
    } else {
      target = 'C';
    }

    // 2. 4x4 Total Assurance Matrix Lookup
    // Matrix [row = flowout 1-4][col = occurrence 1-4]
    const matrix = {
      1: { 1: 'A', 2: 'A', 3: 'A', 4: 'B' },
      2: { 1: 'A', 2: 'B', 3: 'C', 4: 'D' },
      3: { 1: 'A', 2: 'C', 3: 'D', 4: 'E' },
      4: { 1: 'B', 2: 'D', 3: 'E', 4: 'F' }
    };

    const assurance = (matrix[flow] && matrix[flow][occ]) ? matrix[flow][occ] : 'F';

    // 3. Gap Analysis (Rank Order: A = 1, B = 2, C = 3, D = 4, E = 5, F = 6)
    const rankMap = { 'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6 };
    const targetRank = rankMap[target] || 3;
    const assuranceRank = rankMap[assurance] || 6;

    const resTarget = document.getElementById('res-target');
    const resAssurance = document.getElementById('res-assurance');
    const resStatus = document.getElementById('res-status');
    const resRec = document.getElementById('res-recommendation');

    if (resTarget) resTarget.textContent = target;
    if (resAssurance) resAssurance.textContent = assurance;

    const isTargetMet = assuranceRank <= targetRank;

    if (resStatus) {
      if (isTargetMet) {
        resStatus.textContent = isKhmerActive ? '✅ សម្រេចតាមគោលដៅ (គ្មានគម្លាត)' : '✅ TARGET MET (NO GAP)';
        resStatus.style.color = '#34d399';
      } else {
        resStatus.textContent = isKhmerActive ? '⚠️ មានគម្លាតហានិភ័យ (ត្រូវកែលម្អ)' : '⚠️ ASSURANCE GAP DETECTED!';
        resStatus.style.color = '#fbbf24';
      }
    }

    if (resRec) {
      if (isTargetMet) {
        resRec.className = 'callout-box green-box';
        resRec.innerHTML = isKhmerActive
          ? `<strong>អនុសាសន៍វិស្វកម្ម៖</strong> ប្រព័ន្ធការពារបច្ចុប្បន្នសម្រេចបានកម្រិត <strong>${assurance}</strong> ស្មើ ឬលើសកម្រិតគោលដៅ <strong>${target}</strong>។ សូមបន្តរក្សាស្តង់ដារ Poka-yoke ត្រួតពិនិត្យក្រិតឧបករណ៍ និងសវនកម្ម WI ជាប្រចាំ។`
          : `<strong>Engineering Recommendation:</strong> Current assurance level <strong>${assurance}</strong> satisfies or exceeds the required target <strong>${target}</strong>! Continue standard poka-yoke verification, gauge calibration, and daily WI audits.`;
      } else {
        resRec.className = 'callout-box red-box';
        resRec.innerHTML = isKhmerActive
          ? `<strong>អនុសាសន៍វិស្វកម្ម៖</strong> កម្រិតគោលដៅជាកាតព្វកិច្ចគឺ <strong>${target}</strong> ប៉ុន្តែកម្រិតធានាបច្ចុប្បន្នបានត្រឹម <strong>${assurance}</strong>។ គម្លាតនេះបង្កហានិភ័យធ្ងន់ធ្ងរ! សូមជ្រើសរើសវិធានការ៖ ដំឡើងកម្រិតការពារការកើតឡើងទៅ Level 1 (Poka-yoke ស្វ័យប្រវត្តិ) ឬដំឡើងកម្រិតការពារការធ្លាយចេញទៅ Level 1 (កាមេរ៉ា/សេនស័រស្វ័យប្រវត្តិ)។`
          : `<strong>Engineering Recommendation:</strong> Mandatory target is <strong>${target}</strong>, but current assurance is <strong>${assurance}</strong>. Significant risk gap! Recommended action: Upgrade Occurrence Prevention to Level 1 (Automated Poka-Yoke) or upgrade Flow-Out Prevention to Level 1 (100% Automated Vision/Sensor Inspection).`;
      }
    }
  }

  // Expose Global Functions for Inline HTML Callbacks
  window.nextSlide = nextSlide;
  window.prevSlide = prevSlide;
  window.jumpToSlide = jumpToSlide;
  window.toggleLanguage = toggleLanguage;
  window.toggleNotes = toggleNotes;
  window.toggleOverview = toggleOverview;
  window.closeOverview = closeOverview;
  window.toggleLaser = toggleLaser;
  window.toggleTimer = toggleTimer;
  window.toggleFullscreen = toggleFullscreen;
  window.runSimCalculation = runSimCalculation;

  // Initialize presentation once DOM content is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPresentation);
  } else {
    initPresentation();
  }

})();
    'slide-29': {
      title: 'ជំហានទី ៤ & ៥៖ ផែនការកែលម្អ & ការវាយតម្លៃឡើងវិញ',
      segment: '១៤:៤៥ - ១៥:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag green-tag">ជំហានទី ៤ &amp; ៥ &bull; សកម្មភាព &amp; ការផ្ទៀងផ្ទាត់</span>
          <h2 class="slide-title">ជំហានទី ៤ &amp; ៥៖ ផែនការកែលម្អ &amp; ការវាយតម្លៃឡើងវិញ</h2>
          <p class="slide-lead">បង្កើតវិធានការដែលមានអ្នកទទួលខុសត្រូវច្បាស់លាស់ អនុវត្តការកែប្រែ និងគណនាផ្ទៀងផ្ទាត់ពិន្ទុឡើងវិញ។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">🛠️</span>
              <h3>ជំហានទី ៤៖ វិធីសាស្ត្រកែលម្អទាំង ៣</h3>
            </div>
            <p>នៅពេលកម្រិតធានាទាបជាងគោលដៅ (ឧ. គោលដៅ A តែបច្ចុប្បន្ន C)៖</p>
            <ul>
              <li><strong>វិធីទី ១៖ កែលម្អការការពារការកើតឡើង៖</strong> ដំឡើង Poka-yoke ស្វ័យប្រវត្តិកុំឱ្យច្រឡំ (រំកិលជួរឈរពីស្តាំទៅឆ្វេង៖ ③ &rarr; ①)។</li>
              <li><strong>វិធីទី ២៖ កែលម្អការការពារការធ្លាយចេញ៖</strong> បំពាក់កាមេរ៉ា ឬសេនស័រស្វ័យប្រវត្តិ (រំកិលជួរដេកពីក្រោមឡើងលើ៖ [3] &rarr; [1])។</li>
              <li><strong>វិធីទី ៣៖ កែលម្អទាំងពីរទន្ទឹមគ្នា៖</strong> រួមបញ្ចូលខ្សែការពារពីរជាន់ដើម្បីសុវត្ថិភាពអតិបរមា។</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle purple-icon">🔄</span>
              <h3>ជំហានទី ៥៖ ការវាយតម្លៃឡើងវិញ (Re-Evaluation)</h3>
            </div>
            <p>ក្រោយពេលអនុវត្តវិធានការកែលម្អរួច ត្រូវធ្វើការវាយតម្លៃឡើងវិញ៖</p>
            <ul>
              <li>១. វាយតម្លៃពិន្ទុការពារការកើតឡើងឡើងវិញ ក្រោយពេលកែប្រែ។</li>
              <li>២. វាយតម្លៃពិន្ទុការពារការធ្លាយចេញឡើងវិញ ក្រោយពេលកែប្រែ។</li>
              <li>៣. ទាញរកកម្រិតធានាសរុបឡើងវិញនៅលើម៉ាទ្រីស 4x4។</li>
              <li>៤. បញ្ជាក់ថាពិន្ទុថ្មីសម្រេចបានស្មើ ឬលើសកម្រិតគោលដៅ (Target) ដែលបានកំណត់!</li>
            </ul>
            <div class="callout-box green-box" style="margin-top: 10px;">
              <strong>រក្សាភាពរឹងមាំ៖</strong> កែសម្រួលឯកសារ WI, បណ្តុះបណ្តាលបុគ្គលិក និងកត់ត្រា Know-how ចូលក្នុងប្រព័ន្ធ។
            </div>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១៤:៤៥ - ១៥:០០):</strong></p>
        <p>ពន្យល់ពីវិធី ៣ យ៉ាងក្នុងទំព័រ ២៧-២៨។ ប្រសិនបើ Target គឺ A តែបច្ចុប្បន្ន C យើងអាចរំកិល Occurrence ទៅ Level 1 ឬរំកិល Flowout ទៅ Level 1 ឬធ្វើទាំងពីរ។</p>
      `
    },

    'slide-30': {
      title: 'ម៉ូឌុលទី ៤៖ Go & See (Genchi Genbutsu) & ក្របខ័ណ្ឌ 5 Gen',
      segment: '១៣:០០ - ១៤:០០',
      content: `
        <div class="slide-header">
          <span class="section-tag">ម៉ូឌុលទី ៤ — ការស្វែងរកការពិត &amp; បញ្ហា</span>
          <h2 class="slide-title">Go &amp; See (Genchi Genbutsu) &amp; ក្របខ័ណ្ឌ 5 Gen</h2>
          <p class="slide-lead">ផ្ទៀងផ្ទាត់ទីកន្លែងពិត វត្ថុពិត ការពិតជាក់ស្តែង គោលការណ៍វិស្វកម្ម និងស្តង់ដារប្រតិបត្តិការ។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle">👀</span>
              <h3>Go &amp; See៖ ចុះសង្កេតកន្លែងធ្វើការជាក់ស្តែង</h3>
            </div>
            <p>ដើរទៅកាន់ស្ថានីយការងារដែលកំហុសអាចកើតឡើង ឬអាចរបូតចេញ៖</p>
            <ul>
              <li>រៀបចំសំណួរសង្កេតផ្ដោតមួយ ហើយដើរតាមផលិតផលជាក់ស្តែងពេញមួយវដ្ត។</li>
              <li>សង្កេតមើលស្ថានភាពផ្លាស់ប្តូរសំខាន់ៗ៖ ពេលចាប់ផ្តើមម៉ាស៊ីន, ពេលប្តូរម៉ូដែល, ពេលបើកម៉ាស៊ីនឡើងវិញ, ពេលបន្ថែមសម្ភារ, និងពេលដោះស្រាយបញ្ហាមិនប្រក្រតី។</li>
              <li>ប្រៀបធៀបការអនុវត្តពិតរបស់កម្មករ ធៀបនឹងសេចក្តីណែនាំការងារដែលបិទផ្សាយ។</li>
              <li>និយាយជាមួយកម្មករដោយគ្មានការស្តីបន្ទោស; បែងចែកការសង្កេតជាក់ស្តែងចេញពីការស្មាន។</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">⛩️</span>
              <h3>ក្របខ័ណ្ឌសង្កេត 5 Gen របស់ជប៉ុន</h3>
            </div>
            <ul>
              <li><strong>១. Genba (現場):</strong> កន្លែងធ្វើការជាក់ស្តែងដែលការងារកំពុងដំណើរការ។</li>
              <li><strong>២. Genbutsu (現物):</strong> វត្ថុពិត គ្រឿងបន្លាស់ពិត ឬម៉ាស៊ីនពិត។</li>
              <li><strong>៣. Genjitsu (現実):</strong> ការពិតជាក់ស្តែង ទិន្នន័យពិត និងស្ថានភាពវាស់វែងជាក់ស្តែង។</li>
              <li><strong>៤. Genri (原理):</strong> គោលការណ៍វិទ្យាសាស្ត្រ ឬវិស្វកម្មដែលនៅពីក្រោយដំណើរការ។</li>
              <li><strong>៥. Gensoku (原則):</strong> ច្បាប់ស្តង់ដារ ប៉ារ៉ាម៉ែត្រ និងលក្ខណៈបច្ចេកទេសដែលបានកំណត់។</li>
            </ul>
            <div class="callout-box" style="margin-top: 10px;">
              <strong>ឧទាហរណ៍ម៉ាស៊ីនកៀប៖</strong> ពិនិត្យគ្រឿងបន្លាស់ប្រេះ (<em>Genbutsu</em>), កត់ត្រាកម្លាំងសង្កត់ (<em>Genjitsu</em>), សង្កេតការដំឡើងពុម្ព (<em>Genba</em>), ពិនិត្យចលនាលោហៈធាតុ (<em>Genri</em>), ប្រៀបធៀបនឹងស្តង់ដារដំឡើង (<em>Gensoku</em>)។
            </div>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ:</strong></p>
        <p>ពន្យល់ពីទស្សនវិជ្ជា 5 Gen (ទំព័រ ៣០ នៃឯកសារដើម)។ ជនជាតិជប៉ុនចាត់ទុក 5 Gen ជាមូលដ្ឋានគ្រឹះនៃភាពជោគជ័យក្នុងរោងចក្រ។ ការចុះទៅមើលផ្ទាល់គឺជាវិធីតែមួយគត់ដើម្បីស្វែងរកការពិត។</p>
      `
    },

    'slide-31': {
      title: 'ភស្តុតាងរឹងមាំ vs ការសន្មត & ការរៀបចំខ្សែផ្លូវនៃកំហុស',
      segment: '១៣:០០ - ១៤:០០',
      content: `
        <div class="slide-header">
          <span class="section-tag">ម៉ូឌុលទី ៤ — ការពិតជាក់ស្តែង</span>
          <h2 class="slide-title">ភស្តុតាងរឹងមាំ vs ការសន្មត &amp; ការរៀបចំខ្សែផ្លូវនៃកំហុស</h2>
          <p class="slide-lead">ការវាយតម្លៃមួយមានតម្លៃលុះត្រាតែមានការពិតគាំទ្រ។ រៀបចំផែនទីបង្ហាញពីរបៀបដែលកំហុសធ្វើដំណើរឆ្លងកាត់ស្ថានីយ។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle amber-icon">⚖️</span>
              <h3>ការសង្កេតដែលអាចផ្ទៀងផ្ទាត់បាន vs យោបល់ស្មាន</h3>
            </div>
            <div class="callout-box red-box" style="margin-bottom: 12px;">
              <strong>យោបល់ស្មានទន់ខ្សោយ (ការសន្និដ្ឋាន):</strong><br>
              "កម្មករមិនខ្វល់ខ្វាយ ហើយមិនព្រមធ្វើតាមសេចក្តីណែនាំការងារ WI នោះទេ។"
            </div>
            <div class="callout-box green-box">
              <strong>ភស្តុតាងរឹងមាំ (ការសង្កេតជាក់ស្តែង):</strong><br>
              "នៅថ្ងៃទី ១៤ ខែតុលា ក្នុងចំណោម ៥ វដ្តដែលបានសង្កេតឃើញ មាន ៣ វដ្តបានរំលងជំហានទី ៤; ដោយសារឯកសារ WI កំណែ C ត្រូវបានអនុម័ត តែនៅកន្លែងធ្វើការនៅតែបិទកំណែចាស់ B នៅឡើយ។"
            </div>
            <p style="margin-top: 12px; font-size: 0.9rem;">
              គំរូគ្រឿងបន្លាស់ពិត ទិន្នន័យក្រិតឧបករណ៍ត្រឹមត្រូវ និងកំណត់ត្រាកាកសំណល់ច្បាស់លាស់ គឺមិនអាចប្រកែកបានឡើយ បើធៀបនឹងការនិយាយដោយមាត់ទទេ!
            </p>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle purple-icon">🗺️</span>
              <h3>ការរៀបចំផែនទីនៃការបង្កើត &amp; ការរបូតចេញ</h3>
            </div>
            <p>តាមដានដំណើរផ្លូវដែលគ្រឿងខូចអាចឆ្លងកាត់រវាងស្ថានីយការងារ៖</p>
            <ul>
              <li>កំណត់ចំណុចបង្កើតដំបូង ចំណុចផ្ទេរបន្ត និងរបាំងត្រួតពិនិត្យ។</li>
              <li>កត់ត្រាលក្ខខណ្ឌបរាជ័យនៃរបាំង៖ កុងតាក់ Bypass, ចន្លោះប្រហោងនៃការដកគំរូ, និងការច្រឡំទទួលយកទំនិញខូច។</li>
              <li>គិតគូរដល់ការផ្លាស់ប្តូរវេន, ធុងគ្រឿងបន្លាស់ច្រឡូកច្រឡំ, និងការសម្អាតខ្សែសង្វាក់ (Line clearance)។</li>
            </ul>
            <div class="callout-box" style="margin-top: 10px;">
              <strong>ករណីដោតម្ជុល៖</strong> ម្ជុលបាត់កើតឡើងនៅកន្លែងដោត; ម៉ាស៊ីនតេស្តភ្លើងរកឃើញចរន្ត តែមិនអាចដឹងថាតើគន្លឹះចាក់សោរប្លាស្ទិកបានកៀបជាប់ឬអត់នោះទេ!
            </div>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ:</strong></p>
        <p>សង្កត់ធ្ងន់លើស្លាយទំព័រ ៣០ និង ៣២ នៃឯកសារដើម។ "Operators do not follow WI" គ្រាន់តែជាការសន្និដ្ឋានស្មាន។ យើងត្រូវការភស្តុតាងជាក់ស្តែងដែលអាចធ្វើតេស្តបាន។</p>
      `
    },

    'slide-32': {
      title: 'ម៉ូឌុលទី ៥៖ ភាពធ្ងន់ធ្ងរ, ភាពទន់ខ្សោយ & ពិន្ទុអាទិភាព (P = S × W)',
      segment: '១៤:០០ - ១៤:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag purple-tag">ម៉ូឌុលទី ៥ — ការវាយតម្លៃហានិភ័យ</span>
          <h2 class="slide-title">ពិន្ទុអាទិភាពហានិភ័យ៖ ភាពធ្ងន់ធ្ងរ (S1–S4) &times; ភាពទន់ខ្សោយ (W1–W4)</h2>
          <p class="slide-lead">ប្រើប្រាស់កម្រិតភាពធ្ងន់ធ្ងររួមគ្នាជាមួយភាពទន់ខ្សោយនៃការគ្រប់គ្រង ដើម្បីបែងចែកធនធានវិស្វកម្មឱ្យចំគោលដៅ។</p>
        </div>

        <div class="grid-3">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle red-icon">S</span>
              <h3>កម្រិតភាពធ្ងន់ធ្ងរ (S1 ដល់ S4)</h3>
            </div>
            <ul>
              <li><strong>S1 (តូចតាច):</strong> ការរំខានបន្តិចបន្តួចនៅនឹងកន្លែង; គ្មានផលប៉ះពាល់លើមុខងារ។</li>
              <li><strong>S2 (មធ្យម):</strong> ការកែច្នៃផ្ទៃក្នុងច្រើន; ការរំខានត្រូវបានគ្រប់គ្រង។</li>
              <li><strong>S3 (ធ្ងន់ធ្ងរ):</strong> ប៉ះពាល់ការដំឡើងរបស់អតិថិជន; ខូចមុខងារធ្ងន់ធ្ងរ ឬមានបណ្តឹងធំ។</li>
              <li><strong>S4 (គ្រោះថ្នាក់):</strong> ហានិភ័យសុវត្ថិភាពចរាចរណ៍ គ្រោះថ្នាក់ ឬខុសច្បាប់។</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle amber-icon">W</span>
              <h3>ភាពទន់ខ្សោយនៃការគ្រប់គ្រង (W1 ដល់ W4)</h3>
            </div>
            <ul>
              <li><strong>W1 (រឹងមាំ):</strong> មានប្រព័ន្ធចាក់សោស្វ័យប្រវត្តិ ឬ Poka-yoke ជឿជាក់បាន។</li>
              <li><strong>W2 (សមរម្យ):</strong> មានការគ្រប់គ្រង និងភស្តុតាងច្បាស់លាស់ តែពឹងលើមនុស្សខ្លះ។</li>
              <li><strong>W3 (ខ្សោយ):</strong> ការការពារមិនជាប់លាប់ ឆ្លើយតបយឺត ការក្រិតខ្សោយ។</li>
              <li><strong>W4 (អវត្តមាន):</strong> គ្មានរបាំងការពារទាល់តែសោះ ឬតែងតែ Bypass ចោល។</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle purple-icon">P</span>
              <h3>ពិន្ទុអាទិភាព (P = S &times; W)</h3>
            </div>
            <div class="callout-box" style="font-family: var(--font-code); font-size: 0.95rem; margin-bottom: 10px;">
              ពិន្ទុ៖ ១ ដល់ ១៦<br>
              &bull; ១–៣៖ តាមដានធម្មតា (Routine)<br>
              &bull; ៤–៧៖ កែលម្អតាមផែនការ (Improve)<br>
              &bull; ៨–១១៖ អាទិភាពខ្ពស់ (High)<br>
              &bull; ១២–១៦៖ បន្ទាន់បំផុត (Urgent)
            </div>
            <div class="callout-box red-box">
              <strong>ច្បាប់លើកលែងសុវត្ថិភាព៖</strong> រាល់ហានិភ័យសុវត្ថិភាព S4 ឬករណីដែលធ្លាប់របូតដល់ដៃអតិថិជន ត្រូវតែចាត់វិធានការបន្ទាន់បំផុតភ្លាមៗ ដោយមិនគិតពីពិន្ទុឡើយ!
            </div>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ:</strong></p>
        <p>ពន្យល់ពីរូបមន្ត P = S x W ក្នុងទំព័រ ៣៥ នៃឯកសារដើម។ ភាពធ្ងន់ធ្ងរ S មិនអាចប្តូរបានទេ (ព្រោះជាលក្ខណៈផលិតផល) ប៉ុន្តែយើងអាចបន្ថយ W ពី 3 មក 1 ដោយការបំពាក់ Poka-yoke ដែលធ្វើឱ្យពិន្ទុធ្លាក់ពី P9 មក P3 ភ្លាម។</p>
      `
    },

    'slide-33': {
      title: 'ការវាយតម្លៃការចាប់កំហុស & ការទប់ស្កាត់ការកើតឡើងវិញ',
      segment: '១៤:០០ - ១៤:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag purple-tag">ម៉ូឌុលទី ៥ — ការទប់ស្កាត់ &amp; ការការពារការកើតឡើងវិញ</span>
          <h2 class="slide-title">ការវាយតម្លៃការចាប់កំហុស &amp; ការទប់ស្កាត់ការកើតឡើងវិញ</h2>
          <p class="slide-lead">ការដោះស្រាយបញ្ហាមួយពេលនេះ មិនដូចគ្នានឹងការជួសជុលប្រព័ន្ធដើម្បីកុំឱ្យវាកើតឡើងវិញនៅថ្ងៃស្អែកនោះទេ។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle">⏱️</span>
              <h3>ហានិភ័យលាក់កំបាំងនៃការដកគំរូពិនិត្យ</h3>
            </div>
            <p>
              វាយតម្លៃទីតាំងត្រួតពិនិត្យ វិធីសាស្ត្រ ភាពឯករាជ្យ និងល្បឿននៃការឆ្លើយតប៖
            </p>
            <div class="callout-box amber-box" style="margin: 12px 0;">
              <strong>គម្លាតហានិភ័យ ៥៩ នាទី៖</strong><br>
              ការដកគំរូពិនិត្យ ១ គ្រាប់រៀងរាល់ ១ ម៉ោងម្តង ទុកឱ្យផលិតផលក្នុងរយៈពេល <strong>៥៩ នាទីស្ថិតក្នុងហានិភ័យទាំងស្រុង</strong>! ប្រសិនបើផ្លែកាត់ចាប់ផ្តើមសឹកនៅនាទីទី ០៥ នោះទំនិញខូចរយៈពេល ៥៥ នាទីបានរត់ទៅដំណាក់កាលបន្ទាប់បាត់ទៅហើយ មុនពេលគេពិនិត្យឃើញ។
            </div>
            <p style="font-size: 0.9rem;">
              ការបំពាក់ឧបករណ៍ចាប់ស្វ័យប្រវត្តិ ១០០% លុបបំបាត់គម្លាតនេះទាំងស្រុង។ ត្រូវធ្វើតេស្តសាកល្បងសេនស័រជារៀងរាល់ថ្ងៃជាមួយគំរូខូចមេ (Master defective sample)។
            </p>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">🛡️</span>
              <h3>ការទប់ស្កាត់បន្ទាន់ vs ការការពារការកើតឡើងវិញ</h3>
            </div>
            <div class="callout-box" style="margin-bottom: 12px;">
              <strong>ការទប់ស្កាត់បន្ទាន់ (Containment):</strong><br>
              ការរើសទំនិញ ៤,០០០ គ្រាប់ ជួយដកទំនិញខូចចេញនៅថ្ងៃនេះ។ នេះគ្រាន់តែជួយសង្គ្រោះឡូត៍ទំនិញប៉ុណ្ណោះ តែមិនបានដោះស្រាយឫសគល់បញ្ហាឡើយ។
            </div>
            <div class="callout-box green-box">
              <strong>ការការពារការកើតឡើងវិញជាប្រព័ន្ធ (Recurrence Prevention):</strong><br>
              ការដំឡើង Jig ទប់គន្លឹះ និងប្រព័ន្ធចាក់សោម៉ាស៊ីន ជួយការពារកុំឱ្យកំហុសនោះអាចកើតឡើងបានជារៀងរហូត!
            </div>
            <p style="margin-top: 10px; font-size: 0.9rem;">
              ត្រូវផ្ទៀងផ្ទាត់ឫសគល់បញ្ហាដោយភស្តុតាងជាក់ស្តែង កែប្រែស្តង់ដារបច្ចេកទេស កែសម្រួលការបណ្តុះបណ្តាល និងកំណត់ការចុះសវនកម្មតាមដាន។
            </p>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ:</strong></p>
        <p>សង្កត់ធ្ងន់លើឧទាហរណ៍ "៥៩ នាទី" ក្នុងទំព័រ ៣៤ នៃឯកសារដើម។ ការពិនិត្យ ១ ម៉ោងម្តង មិនមែនជាការការពាររឹងមាំទេ។ បើម៉ាស៊ីនផលិតបាន ១០ គ្រាប់ក្នុង ១ នាទី មានន័យថា ៥៩០ គ្រាប់កំពុងប្រឈមនឹងការខូចខាត។</p>
      `
    },

    'slide-34': {
      title: 'ម៉ូឌុលទី ៦៖ រចនាសម្ព័ន្ធតារាងស្តង់ដារ QA Network Sheet',
      segment: '១៤:៤៥ - ១៥:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag teal-tag">ម៉ូឌុលទី ៦ — រចនាសម្ព័ន្ធឯកសារការងារ</span>
          <h2 class="slide-title">រចនាសម្ព័ន្ធតារាងស្តង់ដារ QA Network Sheet</h2>
          <p class="slide-lead">តារាងដ៏មានប្រយោជន៍មួយ ត្រូវតែរៀបរាប់ដំណើររឿងច្បាស់លាស់ ចាប់ពីដំណាក់កាលផលិតកម្ម រហូតដល់សកម្មភាពត្រួតពិនិត្យ។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle">📄</span>
              <h3>ផ្នែកក្បាល &amp; លំដាប់ដំណើរការ</h3>
            </div>
            <ul>
              <li><strong>ក្បាលឯកសាររដ្ឋបាល៖</strong> ឈ្មោះគ្រឿងបន្លាស់, លេខកូដ Part No., ខ្សែសង្វាក់ផលិតកម្ម, កាលបរិច្ឆេទ, កំណែកែប្រែ, និងឈ្មោះសមាជិកក្រុមចម្រុះមុខងារ។</li>
              <li><strong>លំដាប់ដំណើរការ៖</strong> លេខរៀងជំហាន (Step No.), ឈ្មោះស្ថានីយ, និងសកម្មភាពប្រតិបត្តិការរូបវន្ត។</li>
              <li><strong>ប្រវត្តិបញ្ហាសក្តានុពល៖</strong> ទម្រង់នៃការខូច, យន្តការបរាជ័យ, និងការចាត់ថ្នាក់ឫសគល់តាម 6M។</li>
              <li><strong>ការវិភាគការខូចខាតបន្ត៖</strong> ផលវិបាកលើស្ថានីយបន្ទាប់, រោងចក្រអតិថិជន, និងអ្នកប្រើប្រាស់ចុងក្រោយ។</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">📊</span>
              <h3>ជួរឈរវាយតម្លៃ &amp; វិធានការកែលម្អ</h3>
            </div>
            <ul>
              <li><strong>កម្រិតធ្ងន់ធ្ងរ (Severity Ranking):</strong> S, X, XA, XB, R, E, V, A, B, ឬ C។</li>
              <li><strong>កម្រិតគោលដៅ (Target):</strong> កម្រិតគោលដៅ A, B, ឬ C។</li>
              <li><strong>ស្ថានភាពបច្ចុប្បន្ន (Baseline):</strong> កម្រិតការពារការកើត (1–4) &bull; កម្រិតការពារការធ្លាយ (1–4) &bull; កម្រិតធានាសរុប (A–F)។</li>
              <li><strong>ការវិភាគគម្លាត (Gap):</strong> សញ្ញាសម្គាល់ភ្លាមៗ ប្រសិនបើកម្រិតធានាទាបជាងគោលដៅ។</li>
              <li><strong>ផែនការសកម្មភាព៖</strong> វិធានការជាក់លាក់, អ្នកទទួលខុសត្រូវ, កាលបរិច្ឆេទ, និងពិន្ទុវាយតម្លៃឡើងវិញក្រោយពេលកែលម្អ។</li>
            </ul>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១៤:៤៥ - ១៥:០០):</strong></p>
        <p>បង្ហាញតារាងគំរូ QA Network Sheet ដូចក្នុងទំព័រ ៣៦ នៃឯកសារដើម។ ពន្យល់ពីរបៀបដែលជួរឈរនីមួយៗតភ្ជាប់គ្នាពីឆ្វេងទៅស្តាំ។</p>
      `
    },

    'slide-35': {
      title: 'ករណីសិក្សាទី ១ & ២៖ ការចាក់ពុម្ពជ័រ & ការកាត់កៀបដែក',
      segment: '១៤:៤៥ - ១៥:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag teal-tag">ម៉ូឌុលទី ៦ — ករណីសិក្សាក្នុងរោងចក្រ</span>
          <h2 class="slide-title">ករណីសិក្សាទី ១ &amp; ២៖ ការចាក់ពុម្ពជ័រ &amp; ការកាត់កៀបដែក</h2>
          <p class="slide-lead">ការអនុវត្តជាក់ស្តែងក្នុងរោងចក្រ បង្ហាញពីការបង្កើតកំហុស ការផ្ទេរបន្ត និងរបាំងការពារ។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle">🧪</span>
              <h3>ករណីទី ១៖ ការចាក់ពុម្ពក្បាលដោតប្លាស្ទិក (Injection Molding)</h3>
            </div>
            <ul>
              <li><strong>ការសម្ងួតជ័រ៖</strong> ជ័រសើមបណ្តាលឱ្យមានពពុះខ្យល់ និងស្រួយបាក់គន្លឹះ &rarr; <em>វិធានការ៖</em> សេនស័រវាស់សំណើម Dew point ភ្ជាប់ប្រព័ន្ធចាក់សោម៉ាស៊ីន។</li>
              <li><strong>ការចាក់ពុម្ព៖</strong> សាច់ជ័រមិនពេញ (Short shot) និងជ័រលើស (Flash) &rarr; <em>វិធានការ៖</em> សេនស័រសម្ពាធក្នុងពុម្ព និងការកំណត់កម្រិតកម្ដៅពុម្ព។</li>
              <li><strong>ការដោតម្ជុល៖</strong> ម្ជុលកោង ឬដោតមិនចូល &rarr; <em>វិធានការ៖</em> សេនស័រអុបទិកវាស់កម្ពស់ម្ជុល និងការតេស្តចរន្តអគ្គិសនី ១០០%។</li>
              <li><strong>ការវេចខ្ចប់៖</strong> ច្រឡំស្លាកសញ្ញា &rarr; <em>វិធានការ៖</em> ឧបករណ៍ស្កេនបាកូដផ្គូផ្គងស្លាកកេសជាមួយ RFID របស់ធុង។</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle amber-icon">⚙️</span>
              <h3>ករណីទី ២៖ ការកាត់កៀបដែក &amp; ការខាត់គែមមុត (Stamping)</h3>
            </div>
            <ul>
              <li><strong>ការកៀបដែក៖</strong> ផ្លែពុម្ពសឹកបណ្តាលឱ្យមានគែមមុតខ្លាំង &rarr; <em>វិធានការ៖</em> ឧបករណ៍វាស់កម្លាំងទម្ងន់សង្កត់ (Tonnage monitor) និងកាលវិភាគថែទាំតាមចំនួនដងវាយ។</li>
              <li><strong>ការខាត់គែមមុត៖</strong> ធុងរំញ័រខាត់បិទបាំងភស្តុតាងនៃគែមមុត &rarr; <em>វិធានការ៖</em> ការពិនិត្យបំណែកទីមួយដោយប្រើរង្វាស់ Go/No-go ring gauge។</li>
              <li><strong>ការខួងរន្ធ CNC៖</strong> អង្កត់ផ្ចិតរន្ធរអិលដោយសារផ្លែខួងសឹក &rarr; <em>វិធានការ៖</em> ឧបករណ៍ Touch-probe វាស់ស្ទាបផ្លែកាត់ស្វ័យប្រវត្តិនារៀងរាល់ ៥០ វដ្តម្តង។</li>
            </ul>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១៥:០០ - ១៥:១៥):</strong></p>
        <p>បង្ហាញករណីសិក្សាទាំងពីរក្នុងទំព័រ ៣៧ នៃឯកសារដើម។ បង្ហាញពីរបៀបដែលដំណើរការមួយប៉ះពាល់លើដំណើរការមួយទៀត (Stamping wear បង្កើន Burr ធ្វើឱ្យ Deburring លាក់ភស្តុតាង)។</p>
      `
    },

    'slide-36': {
      title: 'ករណីសិក្សាទី ៣ & ៤៖ ការផ្សារដែក & ការវេចខ្ចប់តាមដាន',
      segment: '១៤:៤៥ - ១៥:៣០',
      content: `
        <div class="slide-header">
          <span class="section-tag teal-tag">ម៉ូឌុលទី ៦ — ករណីសិក្សាក្នុងរោងចក្រ</span>
          <h2 class="slide-title">ករណីសិក្សាទី ៣ &amp; ៤៖ ការផ្សារដែក &amp; ការវេចខ្ចប់តាមដាន</h2>
          <p class="slide-lead">ការដោះស្រាយចំណុចតភ្ជាប់សុវត្ថិភាពសំខាន់ៗ និងការច្រឡំស្លាកសញ្ញាដែលកើតឡើងញឹកញាប់។</p>
        </div>

        <div class="grid-2">
            <div class="card-icon-header">
              <span class="card-icon-circle red-icon">🔥</span>
              <h3>ករណីទី ៣៖ ការផ្សារដោយរ៉ូបូត (Robotic Welding)</h3>
            </div>
            <p><strong>គ្រោះថ្នាក់៖</strong> សាច់ផ្សារមិនចូលគ្នាពេញលេញ និងមានប្រហោងខ្យល់ក្នុងជើងទម្រតម្រង់ទិសរថយន្ត។</p>
            <ul>
              <li><strong>ការបង្កើតកំហុស៖</strong> ឧបករណ៍កៀប (Clamp) ដាក់មិនត្រូវទីតាំងមុនពេលរ៉ូបូតចាប់ផ្តើមផ្សារ។</li>
              <li><strong>របាំងបរាជ័យ៖</strong> ការពិនិត្យដោយភ្នែកក្រោយផ្សាររួច មិនអាចមើលឃើញជម្រៅជ្រាបចូលនៃសាច់ផ្សារខាងក្នុងឡើយ!</li>
              <li><strong>វិធានការ QA Network៖</strong> បំពាក់សេនស័រ Proximity interlock ដើម្បីធានាថាគ្រឿងបន្លាស់ត្រូវទីតាំង ១០០% ទើបរ៉ូបូតដំណើរការ; ធ្វើតេស្តរលកសំឡេង Ultrasonic លើបំណែកទីមួយ។</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle purple-icon">📦</span>
              <h3>ករណីទី ៤៖ ការវេចខ្ចប់ &amp; ការតាមដានប្រវត្តិ (Traceability)</h3>
            </div>
            <p><strong>គ្រោះថ្នាក់៖</strong> ការបិទស្លាកលេខកូដខុសលើកេសទំនិញដឹកជញ្ជូន។</p>
            <ul>
              <li><strong>ការបង្កើតកំហុស៖</strong> ធុងពីរនៅក្បែរគ្នាដាក់គ្រឿងបន្លាស់ស្រដៀងគ្នាខ្លាំង; ម៉ាស៊ីនព្រីនស្លាករួមគ្នាមួយអនុញ្ញាតឱ្យជ្រើសរើសស្លាកមួយណាក៏បានដោយគ្មានការផ្ទៀងផ្ទាត់។</li>
              <li><strong>វិធានការ QA Network៖</strong> ធ្វើរបាំងបែងចែកធុងដាច់ពីគ្នា; បំពាក់ឧបករណ៍ស្កេនបាកូដដែលតម្រូវឱ្យស្កេនកេសសិនទើបម៉ាស៊ីនព្រីនស្លាកចេញ; អនុវត្តវិន័យ Line clearance ពេលប្តូរវេន។</li>
            </ul>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១៥:១៥ - ១៥:៣០):</strong></p>
        <p>បង្ហាញករណីទី ៣ និង ទី ៤ ក្នុងទំព័រ ៣៨ នៃឯកសារដើម។ ការផ្សារដែកមិនអាចពិនិត្យដោយភ្នែកទទេបានទេ ព្រោះបញ្ហានៅខាងក្នុងសាច់ដែក។ ការវេចខ្ចប់ក៏ត្រូវចាត់ទុកជាផ្នែកនៃគុណភាពផលិតផលដែរ។</p>
      `
    },

    'slide-37': {
      title: 'ការអនុវត្តផែនការ, សូចនាករ KPI នាំមុខ & ការឆ្លើយតបបន្ទាន់',
      segment: '១៥:៣០ - ១៦:០០',
      content: `
        <div class="slide-header">
          <span class="section-tag teal-tag">ម៉ូឌុលទី ៦ — ការរក្សាឧត្តមភាព</span>
          <h2 class="slide-title">ការអនុវត្តផែនការ, សូចនាករ KPI នាំមុខ &amp; ការឆ្លើយតបបន្ទាន់</h2>
          <p class="slide-lead">ប្រែក្លាយការវាយតម្លៃឱ្យទៅជាវិធានការជាក់ស្តែងដែលអាចធ្វើតេស្តបាន ជាមួយព្រំដែនទប់ស្កាត់ច្បាស់លាស់។</p>
        </div>

        <div class="grid-2">
          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle green-icon">📋</span>
              <h3>ការបង្កើតផែនការសកម្មភាពដែលអាចធ្វើតេស្តបាន</h3>
            </div>
            <div class="callout-box red-box" style="margin-bottom: 10px;">
              <strong>វិធានការស្រពិចស្រពិល (ធ្លាក់សវនកម្ម):</strong> "ពង្រឹងការបណ្តុះបណ្តាល និងប្រាប់កម្មករឱ្យមានការប្រុងប្រយ័ត្នខ្ពស់។"
            </div>
            <div class="callout-box green-box">
              <strong>វិធានការដែលអាចធ្វើតេស្តបាន (កម្រិតពិភពលោក):</strong> "ដំឡើង Jig ទម្រដែលមានរាងចាក់សោ, ធ្វើតេស្តសាកល្បងដោយចេតនាដាក់បញ្ច្រាសចំនួន ២០ ដង, កែប្រែ WI ដោយដាក់រូបថតពណ៌, និងធ្វើសវនកម្មជារៀងរាល់ថ្ងៃរយៈពេល ៤ សប្តាហ៍។"
            </div>
            <p style="margin-top: 10px; font-size: 0.9rem;">
              ត្រូវតែកំណត់អ្នកទទួលខុសត្រូវតែម្នាក់គត់ កាលបរិច្ឆេទកំណត់ វិធានការទប់ស្កាត់បណ្តោះអាសន្ន និងលក្ខណៈវិនិច្ឆ័យវាយតម្លៃបញ្ចប់។
            </p>
          </div>

          <div class="concept-card">
            <div class="card-icon-header">
              <span class="card-icon-circle amber-icon">🚨</span>
              <h3>សូចនាករ KPI នាំមុខ &amp; ផែនការឆ្លើយតបបន្ទាន់</h3>
            </div>
            <ul>
              <li><strong>សូចនាករនាំមុខ (Leading KPIs):</strong> អត្រាតេស្តជាប់នៃឧបករណ៍ Poka-yoke ប្រចាំថ្ងៃ, កំណត់ត្រាព្រឹត្តិការណ៍ Bypass សេនស័រ, អត្រាបញ្ចប់ការថែទាំ PM។</li>
              <li><strong>សូចនាករតាមក្រោយ (Lagging KPIs):</strong> ទឹកប្រាក់ខាតបង់ Scrap (THB), អត្រាកំហុស PPM, ការបង្វិលទំនិញពីអតិថិជន។</li>
              <li><strong>ពិធីសារឆ្លើយតបបន្ទាន់៖</strong> នៅពេលសេនស័របរាជ័យ ត្រូវឃាត់ទំនិញត្រឡប់ថយក្រោយរហូតដល់ <em>ចំណុចចុងក្រោយដែលត្រូវបានពិនិត្យថាល្អ</em> មិនមែនឃាត់តែមួយគ្រាប់នៅនឹងម៉ាស៊ីននោះឡើយ!</li>
            </ul>
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១៥:៣០ - ១៥:៤៥):</strong></p>
        <p>ពន្យល់ពីទំព័រ ៣៩-៤០ នៃឯកសារដើម។ ពេលសេនស័រខូចនៅម៉ោង ១០:២០ មិនមែនចាប់តែទំនិញនៅម៉ោង ១០:២០ ទេ ត្រូវចាប់តាំងពីពេលដែលតេស្តសេនស័រល្អលើកចុងក្រោយ (ឧ. ម៉ោង ០៨:០០)។</p>
      `
    },

    'slide-38': {
      title: 'ម៉ាស៊ីនគណនា & កម្មវិធីពិសោធន៍ម៉ាទ្រីស QA Network',
      segment: 'ការពិសោធន៍ក្នុងសិក្ខាសាលា',
      content: `
        <div class="slide-header">
          <span class="section-tag amber-tag">ការពិសោធន៍អន្តរកម្ម</span>
          <h2 class="slide-title">ម៉ាស៊ីនគណនា &amp; កម្មវិធីពិសោធន៍ម៉ាទ្រីស QA Network</h2>
          <p class="slide-lead">សាកល្បងសេណារីយ៉ូជាក់ស្តែង៖ ជ្រើសរើសកម្រិតធ្ងន់ធ្ងរ កម្រិតការពារការកើត និងកម្រិតការពារការធ្លាយ ដើម្បីគណនាពិន្ទុ និងស្វែងរកគម្លាត។</p>
        </div>

        <div class="simulator-card">
          <div class="sim-control-group">
            <div class="sim-field">
              <label for="sim-severity">១. កម្រិតភាពធ្ងន់ធ្ងរនៃកំហុស (Severity):</label>
              <select id="sim-severity" class="sim-select" onchange="runSimCalculation()">
                <option value="S">S — សុវត្ថិភាព / គ្រោះថ្នាក់ចរាចរណ៍ (ហ្វ្រាំង, ប្រេងឥន្ធនៈ)</option>
                <option value="X">X — ឡានឈប់ភ្លាមៗ ផ្នែកមិនមានចលនា (ជន្ទល់កង់បាក់)</option>
                <option value="XA">XA — ឡានឈប់ភ្លាមៗ ផ្នែកមានចលនា (ប៉ុងក្រោយគាំង)</option>
                <option value="XB">XB — ឡានឈប់ភ្លាមៗ ដោយសារលេចធ្លាយប្រេង</option>
                <option value="R">R — បទប្បញ្ញត្តិ / ច្បាប់រដ្ឋ</option>
                <option value="E">E — បរិស្ថាន / ការបំភាយឧស្ម័នពុល</option>
                <option value="V">V — ប៉ះពាល់ខ្សែសង្វាក់រោងចក្រដំឡើងអតិថិជន</option>
                <option value="A">A — គ្រឿងវិលខូច តែឡាននៅរត់បាន (លាន់ឮសំឡេង)</option>
                <option value="B">B — គ្រឿងមិនវិលខូច តែឡាននៅរត់បាន (ជ្រាបប្រេងតិចតួច)</option>
                <option value="C">C — រូបរាង / សោភ័ណភាពខាងក្រៅ (ស្នាមច្រែះលើកាង)</option>
              </select>
            </div>

            <div class="sim-field">
              <label for="sim-occurrence">២. កម្រិតការពារការកើតឡើង (Occurrence):</label>
              <select id="sim-occurrence" class="sim-select" onchange="runSimCalculation()">
                <option value="1">Level 1 — ឧបករណ៍ស្វ័យប្រវត្តិ ១០០% (Poka-yoke)</option>
                <option value="2" selected>Level 2 — ឧបករណ៍ដំណើរការដោយមនុស្ស</option>
                <option value="3">Level 3 — មនុស្សអនុវត្តតាម WI</option>
                <option value="4">Level 4 — គ្មាន WI ឬដំណើរការខ្វះការគ្រប់គ្រង</option>
              </select>
            </div>

            <div class="sim-field">
              <label for="sim-flowout">៣. កម្រិតការពារការធ្លាយចេញ (Flow-Out):</label>
              <select id="sim-flowout" class="sim-select" onchange="runSimCalculation()">
                <option value="1">Level 1 — សេនស័រ / កាមេរ៉ាស្វ័យប្រវត្តិ ១០០%</option>
                <option value="2" selected>Level 2 — ឧបករណ៍វាស់ដោយមនុស្ស</option>
                <option value="3">Level 3 — មើលដោយភ្នែកតាម WI</option>
                <option value="4">Level 4 — គ្មានឧបករណ៍ចាប់កំហុស</option>
              </select>
            </div>
          </div>

          <div class="sim-result-panel">
            <div class="result-metric">
              <div class="metric-label">កម្រិតគោលដៅជាកាតព្វកិច្ច</div>
              <div class="metric-val" id="res-target" style="color: #34d399;">A</div>
            </div>

            <div class="result-metric">
              <div class="metric-label">កម្រិតធានាសរុបបច្ចុប្បន្ន</div>
              <div class="metric-val" id="res-assurance" style="color: #38bdf8;">B</div>
            </div>

            <div class="result-metric">
              <div class="metric-label">ស្ថានភាពគម្លាតហានិភ័យ</div>
              <div class="metric-val" id="res-status" style="font-size: 1.15rem; color: #fbbf24;">មានគម្លាតហានិភ័យ</div>
            </div>
          </div>

          <div id="res-recommendation" class="callout-box amber-box" style="margin-top: 16px;">
            <strong>អនុសាសន៍វិស្វកម្ម៖</strong> គោលដៅដែលត្រូវសម្រេចគឺកម្រិត <strong>A</strong> ប៉ុន្តែកម្រិតធានាបច្ចុប្បន្នបានត្រឹម <strong>B</strong>។ ត្រូវដំឡើងកម្រិតការពារការកើតឡើងទៅ Level 1 (Poka-Yoke ស្វ័យប្រវត្តិ) ឬដំឡើងកម្រិតការពារការធ្លាយចេញទៅ Level 1 (កាមេរ៉ាស្វ័យប្រវត្តិ) ដើម្បីបិទគម្លាតនេះ។
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ:</strong></p>
        <p>អញ្ជើញសិក្ខាកាមឡើងមកចុចសាកល្បងផ្ទាល់លើអេក្រង់! ជ្រើសរើសករណីជាក់ស្តែងក្នុងរោងចក្ររបស់ពួកគេ ហើយមើលថាតើប្រព័ន្ធគណនាចេញមកមាន Gap ឬយ៉ាងណា។</p>
      `
    },

    'slide-39': {
      title: 'សេចក្តីសង្ខេបវគ្គសិក្សា, ការអនុវត្តបន្ត & សំណួរ-ចម្លើយ',
      segment: '១៥:៣០ - ១៦:០០',
      content: `
        <div class="hero-layout">
          <div class="hero-pill-group">
            <span class="hero-pill">ការសន្និដ្ឋានបញ្ចប់វគ្គ</span>
            <span class="hero-pill teal-pill">វិញ្ញាបនបត្រ ZERO DEFECT</span>
            <span class="hero-pill purple-pill">KAIZEN ជាបន្តបន្ទាប់</span>
          </div>

          <h2 class="hero-title">
            កសាងគុណភាពនៅប្រភពដើម &bull; <span class="gradient-text">គ្មានបញ្ហារបូតចេញ</span>
          </h2>

          <div class="grid-3" style="width: 100%; max-width: 1100px; margin-bottom: 24px; text-align: left;">
            <div class="concept-card">
              <div class="card-icon-header">
                <span class="card-icon-circle green-icon">1</span>
                <h3>ការទប់ស្កាត់ជាមុន</h3>
              </div>
              <p>បញ្ឈប់កំហុសនៅកម្រិត D និង C។ ផ្តល់អាទិភាពដល់ Poka-yoke ដោយម៉ាស៊ីន ជាជាងការរំពឹងលើការប្រុងប្រយ័ត្នរបស់មនុស្ស។</p>
            </div>

            <div class="concept-card">
              <div class="card-icon-header">
                <span class="card-icon-circle">2</span>
                <h3>ឈរលើការពិតជាក់ស្តែង</h3>
              </div>
              <p>អនុវត្ត Go &amp; See (Genchi Genbutsu) តាមក្បួន 5 Gen។ ជឿជាក់លើតែភស្តុតាងរូបវន្តដែលអាចធ្វើតេស្តបានប៉ុណ្ណោះ។</p>
            </div>

            <div class="concept-card">
              <div class="card-icon-header">
                <span class="card-icon-circle purple-icon">3</span>
                <h3>វដ្ត PDCA ជាប់ជានិច្ច</h3>
              </div>
              <p>ធ្វើបច្ចុប្បន្នភាពតារាង QA Network ឡើងវិញជាប្រចាំ រាល់ពេលមានការផ្លាស់ប្តូរ 4M ឬមានបញ្ហាមិនប្រក្រតីកើតឡើង។</p>
            </div>
          </div>

          <div style="display: flex; gap: 16px;">
            <button class="hud-nav-btn" onclick="jumpToSlide(37)" style="background: var(--qa-primary); color: #fff; padding: 10px 24px;">
              <span>🧮 បើកម៉ាស៊ីនគណនាពិសោធន៍</span>
            </button>
            <button class="hud-nav-btn" onclick="jumpToSlide(0)" style="padding: 10px 24px;">
              <span>⏮️ ចាប់ផ្តើមវគ្គសិក្សាឡើងវិញ</span>
            </button>
          </div>

          <div style="margin-top: 32px; font-size: 0.9rem; color: var(--text-dim);">
            សូមថ្លែងអំណរគុណចំពោះការចូលរួម! សំណួរ ចម្លើយ &amp; សកម្មភាពអនុវត្តបន្តក្នុងខ្សែសង្វាក់ផលិតកម្ម។
          </div>
        </div>
      `,
      notes: `
        <p><strong>ការណែនាំសម្រាប់គ្រូ (១៥:៤៥ - ១៦:០០):</strong></p>
        <p>ថ្លែងអំណរគុណដល់សិក្ខាកាមទាំងអស់។ ផ្តល់កិច្ចការផ្ទះ៖ ក្រុមនីមួយៗត្រូវជ្រើសរើសខ្សែសង្វាក់ ១ ក្នុងរោងចក្ររបស់ខ្លួន ដើម្បីបង្កើតតារាង QA Network ពេញលេញ និងរាយការណ៍ក្នុងរយៈពេល ២ សប្តាហ៍។</p>
      `
    }
  };

  // --------------------------------------------------------------------------
  // Core Presentation Initialization
  // --------------------------------------------------------------------------
  function initPresentation() {
    slides = Array.from(document.querySelectorAll('.slide'));
    totalSlides = slides.length;

    // Cache English originals for dynamic translation toggling
    slides.forEach((slide) => {
      const id = slide.id;
      slideOriginals[id] = {
        title: slide.getAttribute('data-title') || '',
        segment: slide.getAttribute('data-segment') || '',
        content: slide.innerHTML,
        notes: getSlideEnglishNotes(id)
      };
    });

    // Populate Overview Grid
    buildOverviewGrid();

    // Register Keyboard & Navigation Event Handlers
    document.addEventListener('keydown', handleKeyNavigation);

    // Presenter Laser Pointer Tracking
    document.addEventListener('mousemove', handleLaserMovement);

    // Initial Slide Display
    showSlide(currentSlideIndex);

    // Run Initial Simulation Calculation
    runSimCalculation();
  }

  // --------------------------------------------------------------------------
  // Speaker Notes Extraction Helper
  // --------------------------------------------------------------------------
  function getSlideEnglishNotes(slideId) {
    // English default speaking notes corresponding to each slide
    const EN_NOTES = {
      'slide-1': '<p><strong>Trainer Script (09:00 - 09:10):</strong> Welcome participants to the QA Network Master Training. Emphasize that QA Network is about designing quality into the process so defects can never arise.</p>',
      'slide-2': '<p><strong>Trainer Script (09:10 - 09:20):</strong> Review course objectives. Ask trainees: "Has your plant ever shipped a defect that slipped past final QC?" Emphasize how QA Network prevents this escape.</p>',
      'slide-3': '<p><strong>Trainer Script (09:20 - 09:30):</strong> Walk through the 1-day agenda. Point out the afternoon workshop at 14:45 where groups will build real QA Network sheets.</p>',
      'slide-4': '<p><strong>Trainer Script (09:30 - 09:45):</strong> Explain Conformity vs Effectiveness. A part passing final inspection today does not prove the process is capable tomorrow if tooling offsets drift.</p>',
      'slide-5': '<p><strong>Trainer Script (09:45 - 10:00):</strong> QC = Find defects; QA = Prevent defects. Both are needed, but QA provides 10x higher financial leverage.</p>',
      'slide-6': '<p><strong>Trainer Script (10:00 - 10:15):</strong> Highlight the 3 lines of defense. When operators bypass line 2 sensors, the line relies solely on final inspection.</p>',
      'slide-7': '<p><strong>Trainer Script (10:15 - 10:30):</strong> Teach the 6M lens: Man, Machine, Material, Method, Measurement, Mother Nature. Never jump to "operator careless" conclusions.</p>',
      'slide-8': '<p><strong>Trainer Script (10:30 - 10:45):</strong> Discuss visible scrap vs hidden losses like engineering firefighting and customer trust erosion.</p>',
      'slide-9': '<p><strong>Trainer Script (10:45 - 11:00):</strong> Explain the COQ Iceberg. Visible scrap is just 15%; 85% of poor quality costs lie submerged below the waterline.</p>',
      'slide-10': '<p><strong>Trainer Script:</strong> Ask participants to classify shop-floor activities into Prevention, Appraisal, Internal Failure, and External Failure.</p>',
      'slide-11': '<p><strong>Trainer Script:</strong> Walk through the monthly calculation: Failure cost is 42.3% of total COQ. Reducing failure is pure profit recovery.</p>',
      'slide-12': '<p><strong>Trainer Script:</strong> Explain the cost curves. Increased investment in prevention causes failure costs to plummet exponentially.</p>',
      'slide-13': '<p><strong>Trainer Script:</strong> Key insight: Frequency Pareto (burrs 60%) often contradicts Cost Pareto (leaks 89.1%). Never prioritize by unit count alone!</p>',
      'slide-14': '<p><strong>Trainer Script:</strong> Demonstrate the THB 40,000 fixture payback calculation. A 4.4-month payback is an easy justification for management approval.</p>',
      'slide-15': '<p><strong>Trainer Script:</strong> Define QA Network: Process-connected nodes tracing defect pathways from creation to escape.</p>',
      'slide-16': '<p><strong>Trainer Script:</strong> Emphasize the 3 prerequisites: Implement before problems occur, form a cross-functional team, and use Go & See facts.</p>',
      'slide-17': '<p><strong>Trainer Script:</strong> Explain the 1-30-300-3000 rule. Stopping defects at Level D and C prevents catastrophic Level A recalls.</p>',
      'slide-18': '<p><strong>Trainer Script:</strong> Emphasize calibrating severity definitions before scoring so team members do not argue about severity.</p>',
      'slide-19': '<p><strong>Trainer Script:</strong> Review scope rules. Emphasize that whenever a production defect occurs, corrective actions must be updated into the QA Network.</p>',
      'slide-20': '<p><strong>Trainer Script:</strong> Contrast the written Control Plan with shop-floor reality: camera in document vs camera disabled by maintenance.</p>',
      'slide-21': '<p><strong>Trainer Script:</strong> Review PDCA. Warn about sample exposure: 30 test units do not prove a 10,000-unit production line is defect-free.</p>',
      'slide-22': '<p><strong>Trainer Script:</strong> Walk through the 5 steps and 11 sub-steps of the QA Network methodology roadmap.</p>',
      'slide-23': '<p><strong>Trainer Script:</strong> Step 1: Brainstorm potential defects without considering existing safeguards!</p>',
      'slide-24': '<p><strong>Trainer Script:</strong> Review the 10 severity symbols: S, X, XA, XB, R, E, V, A, B, C. When evaluating vehicle OEM impact, assume no inspection by customer.</p>',
      'slide-25': '<p><strong>Trainer Script:</strong> Teach the target conversion table. Safety and vehicle-stop defects (S, X, XA, XB) must achieve Target A.</p>',
      'slide-26': '<p><strong>Trainer Script:</strong> Occurrence Prevention Levels 1 to 4: Automated device vs manual device vs operator with WI vs no WI.</p>',
      'slide-27': '<p><strong>Trainer Script:</strong> Flow-Out Prevention Levels 1 to 4: Automated sensor vs manual gauge vs visual check vs no detection.</p>',
      'slide-28': '<p><strong>Trainer Script:</strong> Teach the 4x4 Total Assurance Matrix. Show how Occurrence Level 2 + Flow-out Level 2 yields Level B.</p>',
      'slide-29': '<p><strong>Trainer Script:</strong> Step 4 & 5: Three approaches to improve assurance, and post-improvement re-evaluation.</p>',
      'slide-30': '<p><strong>Trainer Script:</strong> Module 4: Go & See (Genchi Genbutsu) and the 5 Gen framework (Genba, Genbutsu, Genjitsu, Genri, Gensoku).</p>',
      'slide-31': '<p><strong>Trainer Script:</strong> Good evidence vs assumptions. Compare testable observations with unsupported conclusions.</p>',
      'slide-32': '<p><strong>Trainer Script:</strong> Priority score P = S x W (1 to 16). Highlight the safety override rule.</p>',
      'slide-33': '<p><strong>Trainer Script:</strong> Explain the 59-minute exposure gap of hourly sampling. Containment vs true recurrence prevention.</p>',
      'slide-34': '<p><strong>Trainer Script:</strong> Walk through the standard columns and fields of the QA Network Sheet.</p>',
      'slide-35': '<p><strong>Trainer Script:</strong> Case Studies 1 & 2: Plastic connector injection molding and progressive metal stamping.</p>',
      'slide-36': '<p><strong>Trainer Script:</strong> Case Studies 3 & 4: Robotic welding clamp misalignment and packaging barcode label verification.</p>',
      'slide-37': '<p><strong>Trainer Script:</strong> Testable action plans and escalation reaction: hold suspect parts back to the last verified good check.</p>',
      'slide-38': '<p><strong>Trainer Script:</strong> Invite trainees to interact with the Live QA Network Matrix Calculator on screen.</p>',
      'slide-39': '<p><strong>Trainer Script:</strong> Conclude the course, summarize key takeaways, and assign the shop-floor QA Network homework.</p>'
    };

    return EN_NOTES[slideId] || '<p>General guidance: Facilitate discussion and connect concepts to physical shop-floor examples.</p>';
  }

  // --------------------------------------------------------------------------
  // Navigation Engine
  // --------------------------------------------------------------------------
  function showSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;

    slides.forEach((slide, idx) => {
      slide.classList.remove('active');
      if (idx === index) {
        slide.classList.add('active');
      }
    });

    currentSlideIndex = index;
    updateHUD();
    updatePresenterNotes();
    updateOverviewActiveCard();
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

  function jumpToSlide(index) {
    showSlide(index);
    if (isOverviewOpen) toggleOverview();
  }

  // --------------------------------------------------------------------------
  // HUD & Progress Indicators
  // --------------------------------------------------------------------------
  function updateHUD() {
    const counterEl = document.getElementById('slide-counter');
    const fillEl = document.getElementById('progress-fill');
    const modulePill = document.getElementById('module-pill');
    const segmentPill = document.getElementById('segment-pill');

    if (counterEl) {
      counterEl.textContent = `${currentSlideIndex + 1} / ${totalSlides}`;
    }

    if (fillEl) {
      const pct = ((currentSlideIndex + 1) / totalSlides) * 100;
      fillEl.style.width = `${pct}%`;
    }

    const activeSlide = slides[currentSlideIndex];
    if (activeSlide) {
      const title = activeSlide.getAttribute('data-title') || '';
      const segment = activeSlide.getAttribute('data-segment') || '';
      if (modulePill) {
        if (currentSlideIndex <= 2) modulePill.textContent = isKhmerActive ? 'សេចក្តីផ្តើម' : 'ORIENTATION';
        else if (currentSlideIndex <= 7) modulePill.textContent = isKhmerActive ? 'ម៉ូឌុល ១៖ គុណភាព' : 'MODULE 1: QUALITY';
        else if (currentSlideIndex <= 13) modulePill.textContent = isKhmerActive ? 'ម៉ូឌុល ២៖ COQ' : 'MODULE 2: COQ';
        else if (currentSlideIndex <= 20) modulePill.textContent = isKhmerActive ? 'ម៉ូឌុល ៣៖ QA NETWORK' : 'MODULE 3: QA NETWORK';
        else if (currentSlideIndex <= 28) modulePill.textContent = isKhmerActive ? 'វិធីសាស្ត្រ ៥ ជំហាន' : 'METHOD: 5 STEPS';
        else if (currentSlideIndex <= 30) modulePill.textContent = isKhmerActive ? 'ម៉ូឌុល ៤៖ 5 GEN' : 'MODULE 4: 5 GEN';
        else if (currentSlideIndex <= 32) modulePill.textContent = isKhmerActive ? 'ម៉ូឌុល ៥៖ ហានិភ័យ' : 'MODULE 5: RISK';
        else if (currentSlideIndex <= 36) modulePill.textContent = isKhmerActive ? 'ម៉ូឌុល ៦៖ ការអនុវត្ត' : 'MODULE 6: APPLICATION';
        else if (currentSlideIndex === 37) modulePill.textContent = isKhmerActive ? 'ពិសោធន៍ម៉ាទ្រីស' : 'SIMULATOR';
        else modulePill.textContent = isKhmerActive ? 'សន្និដ្ឋាន' : 'CONCLUSION';
      }

      if (segmentPill) {
        segmentPill.textContent = segment;
      }
    }
  }

  // --------------------------------------------------------------------------
  // Instant Bilingual Translation Engine (English <-> Khmer)
  // --------------------------------------------------------------------------
  function toggleLanguage() {
    isKhmerActive = !isKhmerActive;
    document.body.classList.toggle('khmer-mode', isKhmerActive);

    const langLabel = document.getElementById('lang-label');
    const langLabelTop = document.getElementById('lang-label-top');
    const labelText = isKhmerActive ? 'EN' : 'KH';

    if (langLabel) langLabel.textContent = labelText;
    if (langLabelTop) langLabelTop.textContent = labelText;

    slides.forEach((slide) => {
      const id = slide.id;
      if (isKhmerActive && KHMER_SLIDES[id]) {
        slide.innerHTML = KHMER_SLIDES[id].content;
        slide.setAttribute('data-title', KHMER_SLIDES[id].title);
        slide.setAttribute('data-segment', KHMER_SLIDES[id].segment);
      } else if (!isKhmerActive && slideOriginals[id]) {
        slide.innerHTML = slideOriginals[id].content;
        slide.setAttribute('data-title', slideOriginals[id].title);
        slide.setAttribute('data-segment', slideOriginals[id].segment);
      }
    });

    updateHUD();
    updatePresenterNotes();
    buildOverviewGrid();
    runSimCalculation();
  }

  // --------------------------------------------------------------------------
  // Presenter Notes Drawer
  // --------------------------------------------------------------------------
  function toggleNotes() {
    const panel = document.getElementById('presenter-notes-panel');
    const btn = document.getElementById('btn-notes');
    if (!panel) return;

    isNotesOpen = !isNotesOpen;
    panel.classList.toggle('open', isNotesOpen);
    if (btn) btn.classList.toggle('active', isNotesOpen);

    if (isNotesOpen) {
      updatePresenterNotes();
    }
  }

  function updatePresenterNotes() {
    const notesContent = document.getElementById('notes-content');
    const timingBadge = document.getElementById('notes-timing-badge');
    const activeSlide = slides[currentSlideIndex];
    if (!activeSlide || !notesContent) return;

    const id = activeSlide.id;
    const segment = activeSlide.getAttribute('data-segment') || '';
    if (timingBadge) timingBadge.textContent = segment;

    if (isKhmerActive && KHMER_SLIDES[id] && KHMER_SLIDES[id].notes) {
      notesContent.innerHTML = KHMER_SLIDES[id].notes;
    } else if (slideOriginals[id] && slideOriginals[id].notes) {
      notesContent.innerHTML = slideOriginals[id].notes;
    } else {
      notesContent.innerHTML = getSlideEnglishNotes(id);
    }
  }

  // --------------------------------------------------------------------------
  // Slide Overview Grid Modal
  // --------------------------------------------------------------------------
  function toggleOverview() {
    const modal = document.getElementById('overview-modal');
    const btn = document.getElementById('btn-overview');
    if (!modal) return;

    isOverviewOpen = !isOverviewOpen;
    modal.classList.toggle('open', isOverviewOpen);
    if (btn) btn.classList.toggle('active', isOverviewOpen);

    if (isOverviewOpen) {
      updateOverviewActiveCard();
    }
  }

  function closeOverview(e) {
    if (e.target.id === 'overview-modal') {
      toggleOverview();
    }
  }

  function buildOverviewGrid() {
    const grid = document.getElementById('overview-grid');
    if (!grid) return;

    grid.innerHTML = '';
    slides.forEach((slide, idx) => {
      const id = slide.id;
      const title = slide.getAttribute('data-title') || `Slide ${idx + 1}`;
      const card = document.createElement('div');
      card.className = `overview-card ${idx === currentSlideIndex ? 'active' : ''}`;
      card.id = `ov-card-${idx}`;
      card.innerHTML = `
        <span class="overview-card-num">#${idx + 1}</span>
        <span class="overview-card-title">${title}</span>
      `;
      card.addEventListener('click', () => jumpToSlide(idx));
      grid.appendChild(card);
    });
  }

  function updateOverviewActiveCard() {
    const cards = document.querySelectorAll('.overview-card');
    cards.forEach((card, idx) => {
      card.classList.toggle('active', idx === currentSlideIndex);
    });
  }

  // --------------------------------------------------------------------------
  // Laser Pointer & Halo
  // --------------------------------------------------------------------------
  function toggleLaser() {
    const dot = document.getElementById('laser-dot');
    const btn = document.getElementById('btn-laser');
    if (!dot) return;

    isLaserActive = !isLaserActive;
    dot.style.display = isLaserActive ? 'block' : 'none';
    if (btn) btn.classList.toggle('active', isLaserActive);
  }

  function handleLaserMovement(e) {
    if (!isLaserActive) return;
    const dot = document.getElementById('laser-dot');
    if (dot) {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    }
  }

  // --------------------------------------------------------------------------
  // Countdown Timer
  // --------------------------------------------------------------------------
  function toggleTimer() {
    const display = document.getElementById('timer-display');
    const btn = document.getElementById('btn-timer');

    if (isTimerRunning) {
      clearInterval(timerInterval);
      isTimerRunning = false;
      if (btn) btn.classList.remove('active');
    } else {
      isTimerRunning = true;
      if (btn) btn.classList.add('active');
      timerInterval = setInterval(() => {
        if (timerSeconds > 0) {
          timerSeconds--;
          const m = Math.floor(timerSeconds / 60);
          const s = timerSeconds % 60;
          if (display) {
            display.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
          }
        } else {
          clearInterval(timerInterval);
          isTimerRunning = false;
          if (btn) btn.classList.remove('active');
        }
      }, 1000);
    }
  }

  // --------------------------------------------------------------------------
  // Fullscreen Toggle
  // --------------------------------------------------------------------------
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  // --------------------------------------------------------------------------
  // Keyboard Shortcut Navigation
  // --------------------------------------------------------------------------
  function handleKeyNavigation(e) {
    // If user is inside an input/select, don't trigger slide shortcuts
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case 'PageDown':
      case ' ':
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
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
        toggleLanguage();
        break;
      case 'n':
      case 'N':
        toggleNotes();
        break;
      case 'o':
      case 'O':
        toggleOverview();
        break;
      case 'p':
      case 'P':
        toggleLaser();
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
        if (isOverviewOpen) toggleOverview();
        if (isNotesOpen) toggleNotes();
        break;
    }
  }

  // --------------------------------------------------------------------------
  // Interactive QA Network Matrix Calculator & Simulator Logic
  // --------------------------------------------------------------------------
  function runSimCalculation() {
    const sevSelect = document.getElementById('sim-severity');
    const occSelect = document.getElementById('sim-occurrence');
    const flowSelect = document.getElementById('sim-flowout');

    if (!sevSelect || !occSelect || !flowSelect) return;

    const sev = sevSelect.value;
    const occ = parseInt(occSelect.value, 10);
    const flow = parseInt(flowSelect.value, 10);

    // 1. Calculate Required Target
    let target = 'C';
    if (['S', 'X', 'XA', 'XB'].includes(sev)) {
      target = 'A';
    } else if (['E', 'R', 'V', 'A', 'B'].includes(sev)) {
      target = 'B';
    } else {
      target = 'C';
    }

    // 2. 4x4 Total Assurance Matrix Lookup
    // Matrix [row = flowout 1-4][col = occurrence 1-4]
    const matrix = {
      1: { 1: 'A', 2: 'A', 3: 'A', 4: 'B' },
      2: { 1: 'A', 2: 'B', 3: 'C', 4: 'D' },
      3: { 1: 'A', 2: 'C', 3: 'D', 4: 'E' },
      4: { 1: 'B', 2: 'D', 3: 'E', 4: 'F' }
    };

    const assurance = (matrix[flow] && matrix[flow][occ]) ? matrix[flow][occ] : 'F';

    // 3. Gap Analysis (Rank Order: A = 1, B = 2, C = 3, D = 4, E = 5, F = 6)
    const rankMap = { 'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6 };
    const targetRank = rankMap[target] || 3;
    const assuranceRank = rankMap[assurance] || 6;

    const resTarget = document.getElementById('res-target');
    const resAssurance = document.getElementById('res-assurance');
    const resStatus = document.getElementById('res-status');
    const resRec = document.getElementById('res-recommendation');

    if (resTarget) resTarget.textContent = target;
    if (resAssurance) resAssurance.textContent = assurance;

    const isTargetMet = assuranceRank <= targetRank;

    if (resStatus) {
      if (isTargetMet) {
        resStatus.textContent = isKhmerActive ? '✅ សម្រេចតាមគោលដៅ (គ្មានគម្លាត)' : '✅ TARGET MET (NO GAP)';
        resStatus.style.color = '#34d399';
      } else {
        resStatus.textContent = isKhmerActive ? '⚠️ មានគម្លាតហានិភ័យ (ត្រូវកែលម្អ)' : '⚠️ ASSURANCE GAP DETECTED!';
        resStatus.style.color = '#fbbf24';
      }
    }

    if (resRec) {
      if (isTargetMet) {
        resRec.className = 'callout-box green-box';
        resRec.innerHTML = isKhmerActive
          ? `<strong>អនុសាសន៍វិស្វកម្ម៖</strong> ប្រព័ន្ធការពារបច្ចុប្បន្នសម្រេចបានកម្រិត <strong>${assurance}</strong> ស្មើ ឬលើសកម្រិតគោលដៅ <strong>${target}</strong>។ សូមបន្តរក្សាស្តង់ដារ Poka-yoke ត្រួតពិនិត្យក្រិតឧបករណ៍ និងសវនកម្ម WI ជាប្រចាំ។`
          : `<strong>Engineering Recommendation:</strong> Current assurance level <strong>${assurance}</strong> satisfies or exceeds the required target <strong>${target}</strong>! Continue standard poka-yoke verification, gauge calibration, and daily WI audits.`;
      } else {
        resRec.className = 'callout-box red-box';
        resRec.innerHTML = isKhmerActive
          ? `<strong>អនុសាសន៍វិស្វកម្ម៖</strong> កម្រិតគោលដៅជាកាតព្វកិច្ចគឺ <strong>${target}</strong> ប៉ុន្តែកម្រិតធានាបច្ចុប្បន្នបានត្រឹម <strong>${assurance}</strong>។ គម្លាតនេះបង្កហានិភ័យធ្ងន់ធ្ងរ! សូមជ្រើសរើសវិធានការ៖ ដំឡើងកម្រិតការពារការកើតឡើងទៅ Level 1 (Poka-yoke ស្វ័យប្រវត្តិ) ឬដំឡើងកម្រិតការពារការធ្លាយចេញទៅ Level 1 (កាមេរ៉ា/សេនស័រស្វ័យប្រវត្តិ)។`
          : `<strong>Engineering Recommendation:</strong> Mandatory target is <strong>${target}</strong>, but current assurance is <strong>${assurance}</strong>. Significant risk gap! Recommended action: Upgrade Occurrence Prevention to Level 1 (Automated Poka-Yoke) or upgrade Flow-Out Prevention to Level 1 (100% Automated Vision/Sensor Inspection).`;
      }
    }
  }

  // Expose Global Functions for Inline HTML Callbacks
  window.nextSlide = nextSlide;
  window.prevSlide = prevSlide;
  window.jumpToSlide = jumpToSlide;
  window.toggleLanguage = toggleLanguage;
  window.toggleNotes = toggleNotes;
  window.toggleOverview = toggleOverview;
  window.closeOverview = closeOverview;
  window.toggleLaser = toggleLaser;
  window.toggleTimer = toggleTimer;
  window.toggleFullscreen = toggleFullscreen;
  window.runSimCalculation = runSimCalculation;

  // Initialize presentation once DOM content is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPresentation);
  } else {
    initPresentation();
  }

})();