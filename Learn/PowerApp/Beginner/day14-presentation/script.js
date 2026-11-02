/* ============================================================================
   POWER APPS FOUNDATION: DAY 14 PRESENTATION ENGINE
   Topic: Controls: Input, Action, Output
   Theme: Microsoft Fluent 2 Dark Mode (Industrial Neon / Precision Glass)
   Bilingual: English + Khmer (100% Exact 1-to-1 DOM Mirroring)
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

  // 90-minute Countdown Timer state (90 minutes = 5400 seconds)
  const TOTAL_TIMER_SECONDS = 90 * 60;
  let remainingSeconds = TOTAL_TIMER_SECONDS;
  let timerInterval = null;
  let isTimerRunning = false;

  // --------------------------------------------------------------------------
  // 2. KHMER SLIDES DATA STORE (100% Exact DOM Mirroring)
  // --------------------------------------------------------------------------
  const KHMER_SLIDES = [
  {
    "title": "ថ្ងៃទី ១៤៖ ឧបករណ៍បញ្ជា (Controls)៖ ការបញ្ចូល, សកម្មភាព, និងលទ្ធផល",
    "segment": "វគ្គទី ៥៖ ការអនុវត្តជាក់ស្តែងក្នុង Canvas Studio",
    "content": "<div class=\"hero-badge\">\n            <span>គ្រឹះវិជ្ជាជីវៈ Microsoft Power Apps</span>\n            <span>&bull;</span>\n            <span>ថ្ងៃទី ១៤ នៃ ២៧</span>\n          </div>\n          <h1 class=\"hero-title\">ឧបករណ៍បញ្ជា៖ ការបញ្ចូល, សកម្មភាព, និងលទ្ធផល</h1>\n          <p class=\"hero-subtitle\">\n            រាល់ Control ទាំងអស់នៅលើផ្ទាំង Canvas សុទ្ធតែមានតួនាទីមិនអាចខ្វះបាន។ ស្វែងយល់ពីប្រព័ន្ធត្រីគុណ បញ្ចូល-ដំណើរការ-លទ្ធផល៖ Label បង្ហាញព័ត៌មាន, Input ប្រមូលទិន្នន័យ, Dropdown ធានាជម្រើសត្រឹមត្រូវ, និង Button បញ្ជាសកម្មភាព។\n          </p>\n\n          <div class=\"model-chain\">\n            <span class=\"chain-item\">បញ្ហាពិត</span>\n            <span class=\"chain-arrow\">&rarr;</span>\n            <span class=\"chain-item\">ដំណើរការ</span>\n            <span class=\"chain-arrow\">&rarr;</span>\n            <span class=\"chain-item\">ទិន្នន័យ</span>\n            <span class=\"chain-arrow\">&rarr;</span>\n            <span class=\"chain-item active\">UI / Controls</span>\n            <span class=\"chain-arrow\">&rarr;</span>\n            <span class=\"chain-item active\">សកម្មភាព</span>\n            <span class=\"chain-arrow\">&rarr;</span>\n            <span class=\"chain-item\">ការផ្ទុក</span>\n            <span class=\"chain-arrow\">&rarr;</span>\n            <span class=\"chain-item\">ការឆ្លើយតប</span>\n            <span class=\"chain-arrow\">&rarr;</span>\n            <span class=\"chain-item\">ការសាកល្បង</span>\n          </div>",
    "subtitle": ""
  },
  {
    "title": "របៀបវារៈ ៩០ នាទី និងគោលបំណងជាក់លាក់",
    "segment": "ផ្នែកទី ១៖ ការណែនាំ និងលទ្ធផលរំពឹងទុក",
    "content": "<div class=\"card\">\n            <h3 class=\"card-title\">គោលបំណងសិក្សាដែលអាចវាស់វែងបានទាំង ៤</h3>\n            <div class=\"objective-item\">\n              <span class=\"obj-num\">1</span>\n              <div>\n                <strong>បែងចែកតាមមុខងារប្រតិបត្តិការ៖</strong>\n                <p>កំណត់ប្រភេទ Control នីមួយៗថាជា លទ្ធផលបង្ហាញ (Label), ការបញ្ចូលទិន្នន័យសេរី (TextInput), ជម្រើសកំណត់ទុក (Dropdown), ឬបញ្ជាសកម្មភាព (Button)។</p>\n              </div>\n            </div>\n            <div class=\"objective-item\">\n              <span class=\"obj-num\">2</span>\n              <div>\n                <strong>អនុវត្តវិធានសុក្រឹតភាពទិន្នន័យ៖</strong>\n                <p>សម្រេចចិត្តជ្រើសរើសរវាង Dropdown និង TextInput ដោយផ្អែកលើតម្រូវការអាជីវកម្មថាតើទាមទារជម្រើសច្បាស់លាស់ ឬអត្ថបទសេរី។</p>\n              </div>\n            </div>\n            <div class=\"objective-item\">\n              <span class=\"obj-num\">3</span>\n              <div>\n                <strong>កំណត់រចនាសម្ព័ន្ធ Properties សំខាន់ៗ៖</strong>\n                <p>កំណត់តម្លៃយ៉ាងត្រឹមត្រូវលើ <code>Text</code>, <code>Default</code>, <code>HintText</code>, <code>Items</code>, <code>OnSelect</code>, និង <code>DisplayMode</code> ក្នុង Power Apps Studio។</p>\n              </div>\n            </div>\n            <div class=\"objective-item\">\n              <span class=\"obj-num\">4</span>\n              <div>\n                <strong>វិភាគ និងដោះស្រាយកំហុសប្រើ Control ខុស៖</strong>\n                <p>កំណត់ និងកែប្រែបញ្ហាស្ទះដំណើរការអាជីវកម្មដែលបណ្តាលមកពីការដាក់ Control ខុសតួនាទីនៅក្នុងកម្មវិធីចាស់ៗ។</p>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"card\">\n            <h3 class=\"card-title\">កាលវិភាគមេរៀន ៩០ នាទី</h3>\n            <div class=\"agenda-timeline\">\n              <div class=\"agenda-block\">\n                <span class=\"agenda-time\">00 - 10m</span>\n                <span class=\"agenda-name\">វគ្គទី ១៖ រំលឹក និងតភ្ជាប់</span>\n                <span class=\"agenda-desc\">ការរំលឹកចំណេះដឹងចាស់</span>\n              </div>\n              <div class=\"agenda-block\">\n                <span class=\"agenda-time\">10 - 25m</span>\n                <span class=\"agenda-name\">វគ្គទី ២៖ ស្វែងយល់ពីមូលហេតុ</span>\n                <span class=\"agenda-desc\">វិបត្តិនៅ Apex Plastics</span>\n              </div>\n              <div class=\"agenda-block\">\n                <span class=\"agenda-time\">25 - 40m</span>\n                <span class=\"agenda-name\">វគ្គទី ៣៖ Controls ស្នូលទាំង ៤</span>\n                <span class=\"agenda-desc\">រចនាសម្ព័ន្ធ (Structure) និងតួនាទី</span>\n              </div>\n              <div class=\"agenda-block\">\n                <span class=\"agenda-time\">40 - 55m</span>\n                <span class=\"agenda-name\">វគ្គទី ៤៖ ការបង្ហាញផ្ទាល់ដោយគ្រូ</span>\n                <span class=\"agenda-desc\">ការបង្កើតក្នុង Studio</span>\n              </div>\n              <div class=\"agenda-block\">\n                <span class=\"agenda-time\">55 - 65m</span>\n                <span class=\"agenda-name\">វគ្គទី ៥៖ ការអនុវត្តដោយមានការណែនាំ</span>\n                <span class=\"agenda-desc\">ទម្រង់ប្រគល់វេនការងារ</span>\n              </div>\n              <div class=\"agenda-block\">\n                <span class=\"agenda-time\">65 - 75m</span>\n                <span class=\"agenda-name\">វគ្គទី ៦៖ ការអនុវត្តស្វ័យភាព</span>\n                <span class=\"agenda-desc\">ការដកគ្រឿងបន្លាស់ពីឃ្លាំង</span>\n              </div>\n              <div class=\"agenda-block\">\n                <span class=\"agenda-time\">75 - 85m</span>\n                <span class=\"agenda-name\">វគ្គទី ៧៖ ការត្រួតពិនិត្យ និងបញ្ហាប្រឈម</span>\n                <span class=\"agenda-desc\">សំណួរ ៥ + បញ្ហាប្រឈមចុងក្រោយ</span>\n              </div>\n              <div class=\"agenda-block\">\n                <span class=\"agenda-time\">85 - 90m</span>\n                <span class=\"agenda-name\">វគ្គទី ៨៖ ស្ពានភ្ជាប់ទៅថ្ងៃស្អែក</span>\n                <span class=\"agenda-desc\">ទិដ្ឋភាពថ្ងៃទី ១៥ Navigation</span>\n              </div>\n            </div>\n          </div>",
    "subtitle": "រចនាសម្ព័ន្ធសិក្សាតាមគន្លងគួច តភ្ជាប់ស្ថាបត្យកម្មពីមុនទៅកាន់ការគ្រប់គ្រង Controls ជាក់ស្តែង។"
  },
  {
    "title": "ផែនទីកម្មវិធីសិក្សា៖ ម៉ាស៊ីនប្រទាក់ក្រឡាគ្នា",
    "segment": "ផ្នែកទី ១៖ ការណែនាំ និងលទ្ធផលរំពឹងទុក",
    "content": "<div class=\"card\">\n            <span class=\"card-badge\">គ្រឹះដំបូង (ថ្ងៃ ១–១១)</span>\n            <h3 class=\"card-title\">បញ្ហា និងរចនាសម្ព័ន្ធទិន្នន័យ</h3>\n            <p class=\"card-body\">\n              នៅថ្ងៃទី ១ យើងបានរៀនថា App ដំណើរការតាម <strong>Input &rarr; Process &rarr; Output</strong>។ នៅថ្ងៃទី ៩–១១ យើងបានរចនាតារាង SharePoint៖ <code>MachineID</code>, <code>Urgency</code>, <code>Description</code>, និង <code>Status</code>។\n            </p>\n          </div>\n\n          <div class=\"card\" style=\"border-color: rgba(59, 130, 246, 0.4); background: rgba(30, 41, 59, 0.85);\">\n            <span class=\"card-badge\" style=\"background: rgba(59, 130, 246, 0.2); color: #93c5fd;\">ម្សិលមិញ (ថ្ងៃទី ១៣)</span>\n            <h3 class=\"card-title\">Studio និង Tree View</h3>\n            <p class=\"card-body\">\n              យើងបានបំប្លែងគំនូរព្រាងលើក្រដាសចូលក្នុង Studio។ យើងរៀបចំ Screens ដាក់ Control ទទេៗ និងអនុវត្តស្តង់ដារឈ្មោះ Hungarian (<code>lbl</code>, <code>txt</code>, <code>drp</code>, <code>btn</code>)។\n            </p>\n          </div>\n\n          <div class=\"card\" style=\"border-color: var(--color-cyan); box-shadow: 0 0 20px rgba(6, 182, 212, 0.2);\">\n            <span class=\"card-badge\" style=\"background: rgba(6, 182, 212, 0.2); color: #67e8f9;\">ថ្ងៃនេះ (ថ្ងៃទី ១៤)</span>\n            <h3 class=\"card-title\">ការបញ្ចូល, សកម្មភាព, និងលទ្ធផល</h3>\n            <p class=\"card-body\">\n              យើងកំណត់តួនាទីជាក់លាក់ដល់ Control នីមួយៗ៖ <strong>Labels</strong> បង្ហាញព័ត៌មាន, <strong>Inputs</strong> ប្រមូលអត្ថបទ, <strong>Dropdowns</strong> ធានាជម្រើសត្រឹមត្រូវ, និង <strong>Buttons</strong> បញ្ជាដំណើរការកូដ។\n            </p>\n          </div>",
    "subtitle": "រាល់មេរៀនទាំងអស់សុទ្ធតែកសាងលើអ្វីដែលបានរៀន និងត្រៀមគ្រឹះសម្រាប់មេរៀនបន្ទាប់ជានិច្ច។"
  },
  {
    "title": "ការរំលឹកចំណេះដឹងមុន៖ ចុចលើកាតដើម្បីមើលចម្លើយ",
    "segment": "ផ្នែកទី ១៖ ការណែនាំ និងលទ្ធផលរំពឹងទុក",
    "content": "<div class=\"flip-card\" onclick=\"this.classList.toggle('flipped')\">\n            <div class=\"flip-inner\">\n              <div class=\"flip-front\">\n                <span class=\"card-badge\">សំណួរទី ១</span>\n                <p>ហេតុអ្វីបានជាយើងត្រូវប្តូរឈ្មោះទៅជា <code>txtNotes</code> ជាជាងទុកឈ្មោះ <code>TextInput1</code>?</p>\n                <span class=\"flip-prompt\">ចុចដើម្បីត្រឡប់កាត &rarr;</span>\n              </div>\n              <div class=\"flip-back\">\n                <span class=\"card-badge\">ចម្លើយទី ១</span>\n                <p>ឈ្មោះលំនាំដើមបង្កឱ្យមានកំហុសក្នុងរូបមន្ត។ ឈ្មោះ <code>txtNotes</code> ប្រាប់អ្នកបង្កើត App ភ្លាមៗអំពីប្រភេទ Control និងគោលបំណងរបស់វា។</p>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"flip-card\" onclick=\"this.classList.toggle('flipped')\">\n            <div class=\"flip-inner\">\n              <div class=\"flip-front\">\n                <span class=\"card-badge\">សំណួរទី ២</span>\n                <p>តើផ្ទាំងមួយណា ក្នុង Studio បង្ហាញរចនាសម្ព័ន្ធមេ-កូនរបស់ Screens និង Controls?</p>\n                <span class=\"flip-prompt\">ចុចដើម្បីត្រឡប់កាត &rarr;</span>\n              </div>\n              <div class=\"flip-back\">\n                <span class=\"card-badge\">ចម្លើយទី ២</span>\n                <p>ផ្ទាំង <strong>Tree View</strong> នៅលើរបារខាងឆ្វេង ដែលបង្ហាញអេក្រង់មេ និង Controls កូនៗនៅខាងក្នុងតាមលំដាប់ថ្នាក់។</p>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"flip-card\" onclick=\"this.classList.toggle('flipped')\">\n            <div class=\"flip-inner\">\n              <div class=\"flip-front\">\n                <span class=\"card-badge\">សំណួរទី ៣</span>\n                <p>ប្រសិនបើប៊ូតុងមួយមាន Property <code>Visible = false</code> តើអ្នកប្រើប្រាស់នឹងឃើញអ្វី?</p>\n                <span class=\"flip-prompt\">ចុចដើម្បីត្រឡប់កាត &rarr;</span>\n              </div>\n              <div class=\"flip-back\">\n                <span class=\"card-badge\">ចម្លើយទី ៣</span>\n                <p>ប៊ូតុងនោះនឹងបាត់ទាំងស្រុងពីអេក្រង់។ អ្នកប្រើប្រាស់មិនអាចមើលឃើញ មិនអាចចុច ឬធ្វើអន្តរកម្មលើវាបានឡើយ។</p>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"flip-card\" onclick=\"this.classList.toggle('flipped')\">\n            <div class=\"flip-inner\">\n              <div class=\"flip-front\">\n                <span class=\"card-badge\">សំណួរទី ៤</span>\n                <p>តើការបញ្ចូលទិន្នន័យមិនត្រឹមត្រូវក្នុង App ជះឥទ្ធិពលយ៉ាងណាដល់ក្រុមហ៊ុនទាំងមូល?</p>\n                <span class=\"flip-prompt\">ចុចដើម្បីត្រឡប់កាត &rarr;</span>\n              </div>\n              <div class=\"flip-back\">\n                <span class=\"card-badge\">ចម្លើយទី ៤</span>\n                <p>បញ្ចូលទិន្នន័យមិនល្អ នាំឱ្យលទ្ធផលខូច (Garbage In, Garbage Out)។ ទិន្នន័យខុសក្នុង Controls រក្សាទុកចូល SharePoint បង្កឱ្យរបាយការណ៍គាំង និងខាតបង់គ្រឿងបន្លាស់។</p>\n              </div>\n            </div>\n          </div>",
    "subtitle": "ការរំលឹកការចងចាំរហ័ស មុនពេលយើងស្វែងយល់ពីយន្តការខាងក្នុងនៃ Controls។"
  },
  {
    "title": "វិបត្តិនៅកន្លែងការងារ៖ មហន្តរាយនៃការប្រើ Control ខុសតួនាទី",
    "segment": "វគ្គទី ២៖ មូលហេតុពិតក្នុងពិភពជាក់ស្តែង",
    "content": "<div class=\"crisis-banner\">\n            <span class=\"crisis-icon\">&Delta;</span>\n            <div>\n              <h3>ហេតុការណ៍វេនយប់នៅរោងចក្រ Apex Plastics</h3>\n              <p>បុគ្គលិកថែទាំឈ្មោះ សំណាង បានប្រញាប់បង្កើត App \"រាយការណ៍ម៉ាស៊ីនខូចបន្ទាន់\"។ គាត់បានចាប់ទាញរូបរាងផ្សេងៗក្នុង Studio មកដាក់ដោយមិនយល់ពីតួនាទីវិស្វកម្មរបស់វា។</p>\n            </div>\n          </div>\n\n          <div class=\"grid-3\">\n            <div class=\"card\">\n              <span class=\"consequence-badge\">កំហុសទី ១៖ ប្រអប់អក្សរខ្មោច</span>\n              <h4 style=\"margin: 0.6rem 0;\">យក Label មកឱ្យបញ្ចូលអត្តលេខ</h4>\n              <p>សំណាងបានដាក់ <strong>Text Label</strong> ហើយវាយពាក្យ <em>\"បញ្ចូលអត្តលេខបុគ្គលិកនៅទីនេះ\"</em>។ ពេលកម្មករចុចលើ Tablet បែរជាគ្មានក្តារចុចលោតមកសោះ! ពីព្រោះ Label ជា Output Control មិនអាចទទួលទិន្នន័យបានទេ។</p>\n            </div>\n\n            <div class=\"card\">\n              <span class=\"consequence-badge\">កំហុសទី ២៖ ១៤ ទម្រង់នៃម៉ាស៊ីនលេខ ១</span>\n              <h4 style=\"margin: 0.6rem 0;\">យក TextInput មកឱ្យវាយឈ្មោះម៉ាស៊ីន</h4>\n              <p>សំណាងបានប្រើ <strong>Text Input</strong> សេរីសម្រាប់ឈ្មោះម៉ាស៊ីន។ ក្នុងរយៈពេល ៤៨ ម៉ោង កម្មករបានវាយ៖ <em>\"press 1\"</em>, <em>\"P-01\"</em>, <em>\"Press #1\"</em>, និង <em>\"machine one\"</em>។ ប្រព័ន្ធទិន្នន័យស្វ័យប្រវត្តិគាំងរកម៉ាស៊ីនមិនឃើញទាំងស្រុង!</p>\n            </div>\n\n            <div class=\"card\">\n              <span class=\"consequence-badge\">កំហុសទី ៣៖ ប៊ូតុងគ្មានព្រលឹង</span>\n              <h4 style=\"margin: 0.6rem 0;\">យករូបភាព Image មកធ្វើជាប៊ូតុង Submit</h4>\n              <p>សំណាងបានដាក់រូបសញ្ញាធិកពណ៌បៃតងធ្វើជាប៊ូតុង Submit។ កម្មករបានចុចលើវាហើយដើរចេញ ប៉ុន្តែដោយសារ Property <code>OnSelect</code> របស់វានៅទទេ ទើបគ្មានទិន្នន័យសូម្បីមួយជួរត្រូវបានរក្សាទុកក្នុង SharePoint!</p>\n            </div>\n          </div>",
    "subtitle": "អ្វីដែលកើតឡើងនៅពេលអ្នកបង្កើត App ដំឡើងទម្រង់ដោយមិនយល់ពីតួនាទីរបស់ Control នីមួយៗ។"
  },
  {
    "title": "ខ្សែសង្វាក់នៃផលវិបាក៖ ពីការប្រើ Control ខុស រហូតដល់ការខាតបង់ $34,000",
    "segment": "វគ្គទី ២៖ មូលហេតុពិតក្នុងពិភពជាក់ស្តែង",
    "content": "<div class=\"card\">\n            <h3 class=\"card-title\">ផលប៉ះពាល់ជាបន្តបន្ទាប់លើប្រតិបត្តិការ</h3>\n            <div class=\"consequence-row\">\n              <span class=\"consequence-badge\">ដំណាក់កាល ១</span>\n              <div>\n                <strong>កម្មករច្របូកច្របល់ និងខកចិត្ត៖</strong>\n                <p>មិនអាចវាយអក្សរចូលក្នុង Label បាន គិតថា App គាំង។ ចុចលើរូបភាព ១០ ដងតែគ្មានប្រតិកម្មអ្វីសោះ។</p>\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"consequence-badge\">ដំណាក់កាល ២</span>\n              <div>\n                <strong>ប័ណ្ណជួសជុល ១៧ សន្លឹកបានបាត់បង់៖</strong>\n                <p>ដោយសាររូបភាពគ្មានកូដក្នុង <code>OnSelect</code> គ្មានទិន្នន័យណាមួយត្រូវបានបញ្ជូនទៅកាន់ SharePoint ឡើយ។</p>\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"consequence-badge\">ដំណាក់កាល ៣</span>\n              <div>\n                <strong>ប្រព័ន្ធស្វ័យប្រវត្តិកុម្ម៉ង់គ្រឿងបន្លាស់បរាជ័យ៖</strong>\n                <p>ឈ្មោះម៉ាស៊ីនវាយសេរីមិនស៊ីគ្នាជាមួយបញ្ជីផ្លូវការ ធ្វើឱ្យគ្មានក្បាលវ៉ានធារាសាស្ត្រណាមួយត្រូវបានបញ្ជាទិញ។</p>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"card\" style=\"border-color: rgba(239, 68, 68, 0.4); background: rgba(30, 41, 59, 0.9);\">\n            <h3 class=\"card-title\" style=\"color: #fca5a5;\">លទ្ធផលខាតបង់ក្នុងរោងចក្រ</h3>\n            <div style=\"font-size: 2.8rem; font-weight: 800; color: #ef4444; margin: 1rem 0;\">$34,000</div>\n            <p style=\"font-size: 1.05rem; line-height: 1.6; color: #cbd5e1;\">\n              ម៉ាស៊ីន Injection Press #2 ឡើងកម្តៅខ្លាំងដោយគ្មានក្រុមបច្ចេកទេសដឹង។ ជ័រទម្ងន់ 400kg បានរលាយស្អិតខ្លោចក្នុងបំពង់កិន បំផ្លាញក្បាលវីសម៉ាស៊ីនទាំងស្រុង និងបិទខ្សែសង្វាក់ផលិតកម្ម Line B អស់រយៈពេល ៣៦ ម៉ោង។\n            </p>\n            <div style=\"margin-top: auto; padding: 0.85rem; background: rgba(239, 68, 68, 0.15); border-radius: 0.5rem; font-weight: 600; color: #fca5a5;\">\n              មេរៀនសំខាន់៖ Controls ក្នុង Power Apps គឺជាវ៉ានឧស្សាហកម្មជាក់លាក់ មិនមែនជារូបរាងតុបតែងលម្អនោះទេ!\n            </div>\n          </div>",
    "subtitle": "កំហុសលើផ្ទៃផ្ទាំងកម្មវិធីមិនមែនគ្រាន់តែជារឿងកែសម្ផស្សទេ—វាជះឥទ្ធិពលផ្ទាល់ដល់ដំណើរការរោងចក្រ។"
  },
  {
    "title": "គោលគំនិតងាយយល់៖ ក្តារឧបករណ៍ក្នុងរោងជាង",
    "segment": "វគ្គទី ២៖ មូលហេតុពិតក្នុងពិភពជាក់ស្តែង",
    "content": "<div class=\"card\">\n            <span class=\"role-badge-pill pill-output\">១. ក្តារជូនដំណឹង (Output)</span>\n            <h3 class=\"card-title\">ក្តារព័ត៌មាន និងស្លាកសញ្ញា</h3>\n            <p class=\"card-body\">\n              ស្លាកក្រដាសបិទលើជញ្ជាំងសរសេរថា <em>\"កំណត់ត្រាសុវត្ថិភាពវេនការងារ៖ ១៤២ ថ្ងៃ\"</em>។ អ្នកគ្រាន់តែឈរមើលពីចម្ងាយ។ អ្នកមិនអាចសរសេរលើវា ហើយវាក៏មិនរត់ការឱ្យអ្នកដែរ។ តួនាទីរបស់វាគឺ <strong>ផ្សព្វផ្សាយព័ត៌មានចេញ</strong>។\n            </p>\n            <div style=\"margin-top: auto; font-family: var(--font-code); color: var(--color-cyan); font-size: 0.85rem;\">\n              សមមូលក្នុង Power Apps៖ Label (lbl)\n            </div>\n          </div>\n\n          <div class=\"card\">\n            <span class=\"role-badge-pill pill-input\">២. ប្រអប់ប្រមូលទិន្នន័យ (Input)</span>\n            <h3 class=\"card-title\">រន្ធទម្លាក់ឯកសារ និងថាសជម្រើស</h3>\n            <p class=\"card-body\">\n              <strong>រន្ធទម្លាក់ក្រដាសទទេ៖</strong> អ្នកអាចសរសេរពាក្យពេចន៍អ្វីក៏បានតាមចិត្ត (TextInput)។<br><br>\n              <strong>ថាសកាតពណ៌៖</strong> អ្នកត្រូវរើសកាតមួយក្នុងចំណោមកាតកំណត់ទុក ៤ (Dropdown)។ អ្នកមិនអាចបង្កើតកាតទី ៥ ទេ។ តួនាទីរបស់វាគឺ <strong>ប្រមូលទិន្នន័យស្អាត</strong>។\n            </p>\n            <div style=\"margin-top: auto; font-family: var(--font-code); color: #60a5fa; font-size: 0.85rem;\">\n              សមមូលក្នុង Power Apps៖ TextInput និង Dropdown\n            </div>\n          </div>\n\n          <div class=\"card\">\n            <span class=\"role-badge-pill pill-action\">៣. ដៃដងបញ្ជាមេកានិក (Action)</span>\n            <h3 class=\"card-title\">ដងកន្លាស់សង្គ្រោះបន្ទាន់</h3>\n            <p class=\"card-body\">\n              ដងកន្លាស់ដែកពណ៌ក្រហមលើជញ្ជាំង។ វាមិនផ្ទុកអក្សរ មិនប្រមូលទិន្នន័យ ហើយក៏មិនបង្ហាញរបាយការណ៍អ្វីដែរ។ ប៉ុន្តែនៅពេលអ្នកកាច់វាចុះ វានឹងបញ្ជាម៉ូទ័រធារាសាស្ត្រ រោទ៍ស៊ីរ៉ែន ឬវាយត្រាលើឯកសារ។ តួនាទីរបស់វាគឺ <strong>បញ្ជាសកម្មភាព</strong>។\n            </p>\n            <div style=\"margin-top: auto; font-family: var(--font-code); color: #34d399; font-size: 0.85rem;\">\n              សមមូលក្នុង Power Apps៖ Button (btn)\n            </div>\n          </div>",
    "subtitle": "មុនពេលឈានដល់ពាក្យបច្ចេកទេស ចូរស្រមៃថាអ្នកកំពុងឈរនៅមុខបញ្ជរការងាររូបវន្តមួយ។"
  },
  {
    "title": "ការប្រៀបធៀបក្នុងជីវិតរស់នៅ៖ ទូកាហ្វេស្វ័យប្រវត្តិ",
    "segment": "វគ្គទី ២៖ មូលហេតុពិតក្នុងពិភពជាក់ស្តែង",
    "content": "<div class=\"card\">\n            <span class=\"role-badge-pill pill-output\">ឧបករណ៍បង្ហាញលទ្ធផល</span>\n            <h4 style=\"margin: 0.5rem 0;\">អេក្រង់បង្ហាញស្ថានភាព</h4>\n            <p style=\"font-size: 0.88rem; color: var(--text-muted);\">\n              បង្ហាញ <em>\"តម្លៃ៖ $3.50\"</em> និង <em>\"កម្តៅទឹក៖ 92°C\"</em>។ ជាព័ត៌មានសុទ្ធសាធសម្រាប់អាន។\n            </p>\n            <div style=\"margin-top: auto; font-family: var(--font-code); font-size: 0.8rem; color: var(--color-cyan);\">\n              Control៖ Label (lbl)\n            </div>\n          </div>\n\n          <div class=\"card\">\n            <span class=\"role-badge-pill pill-input\">ការជ្រើសរើសច្បាស់លាស់</span>\n            <h4 style=\"margin: 0.5rem 0;\">កុងតាក់រើសទំហំកែវ</h4>\n            <p style=\"font-size: 0.88rem; color: var(--text-muted);\">\n              ជម្រើស៖ <code>[\"តូច (8oz)\", \"មធ្យម (12oz)\", \"ធំ (16oz)\"]</code>។ ការពារកុំឱ្យភ្ញៀវសុំកែវយក្សដែលម៉ាស៊ីនគ្មាន។\n            </p>\n            <div style=\"margin-top: auto; font-family: var(--font-code); font-size: 0.8rem; color: #60a5fa;\">\n              Control៖ Dropdown (drp)\n            </div>\n          </div>\n\n          <div class=\"card\">\n            <span class=\"role-badge-pill pill-input\">ការបញ្ចូលអក្សរសេរី</span>\n            <h4 style=\"margin: 0.5rem 0;\">ប្រអប់វាយឈ្មោះលើកែវ</h4>\n            <p style=\"font-size: 0.88rem; color: var(--text-muted);\">\n              ប្រអប់ក្តារចុចទទេសម្រាប់វាយឈ្មោះហៅក្រៅរបស់អ្នក <em>\"បុប្ផា\"</em> ដើម្បីឱ្យអ្នកឆុងដឹងឈ្មោះ។\n            </p>\n            <div style=\"margin-top: auto; font-family: var(--font-code); font-size: 0.8rem; color: #60a5fa;\">\n              Control៖ TextInput (txt)\n            </div>\n          </div>\n\n          <div class=\"card\">\n            <span class=\"role-badge-pill pill-action\">គន្លឹះបញ្ជាសកម្មភាព</span>\n            <h4 style=\"margin: 0.5rem 0;\">ប៊ូតុង \"ចាប់ផ្តើមឆុង\"</h4>\n            <p style=\"font-size: 0.88rem; color: var(--text-muted);\">\n              ពេលចុចលើវា ម៉ាស៊ីនកិនកាហ្វេដំណើរការ វ៉ានទឹកក្តៅបើក និងកាត់ប្រាក់ពីកាតធនាគារ។\n            </p>\n            <div style=\"margin-top: auto; font-family: var(--font-code); font-size: 0.8rem; color: #34d399;\">\n              Control៖ Button (btn)\n            </div>\n          </div>",
    "subtitle": "អ្នកតែងតែធ្វើអន្តរកម្មជាមួយប្រព័ន្ធ បញ្ចូល-ដំណើរការ-លទ្ធផល នេះជារៀងរាល់ព្រឹក។"
  },
  {
    "title": "ឧបករណ៍បញ្ជាស្នូលទាំង ៤ មួយភ្លែត",
    "segment": "វគ្គទី ៣៖ រចនាសម្ព័ន្ធ និងយន្តការដំណើរការ",
    "content": "<div class=\"card\">\n            <div style=\"display: flex; justify-content: space-between; align-items: center;\">\n              <span class=\"card-badge\">Label</span>\n              <span style=\"font-family: var(--font-code); color: var(--color-cyan); font-weight: 700;\">lbl</span>\n            </div>\n            <h3 style=\"margin: 0.8rem 0 0.4rem 0;\">Text Label</h3>\n            <p style=\"font-size: 0.85rem; color: var(--text-muted); flex: 1;\">\n              បង្ហាញអត្ថបទថេរ តម្លៃគណនា ឬការណែនាំដល់អ្នកប្រើប្រាស់។ មិនអាចវាយអក្សរចូលបានឡើយ។\n            </p>\n            <div style=\"border-top: 1px solid var(--border-subtle); padding-top: 0.75rem; margin-top: 0.75rem;\">\n              <span style=\"font-size: 0.75rem; color: var(--color-cyan); font-weight: 700;\">PROPERTIES សំខាន់ៗ៖</span>\n              <p style=\"font-family: var(--font-code); font-size: 0.8rem;\">Text, Color, Size, Visible</p>\n            </div>\n          </div>\n\n          <div class=\"card\">\n            <div style=\"display: flex; justify-content: space-between; align-items: center;\">\n              <span class=\"card-badge\">Text Input</span>\n              <span style=\"font-family: var(--font-code); color: #60a5fa; font-weight: 700;\">txt</span>\n            </div>\n            <h3 style=\"margin: 0.8rem 0 0.4rem 0;\">Text Input</h3>\n            <p style=\"font-size: 0.85rem; color: var(--text-muted); flex: 1;\">\n              ប្រមូលទិន្នន័យអក្សរ និងលេខដោយសេរីដែលបញ្ចូលដោយអ្នកប្រើប្រាស់តាមរយៈក្តារចុច។\n            </p>\n            <div style=\"border-top: 1px solid var(--border-subtle); padding-top: 0.75rem; margin-top: 0.75rem;\">\n              <span style=\"font-size: 0.75rem; color: #60a5fa; font-weight: 700;\">PROPERTIES សំខាន់ៗ៖</span>\n              <p style=\"font-family: var(--font-code); font-size: 0.8rem;\">Default, HintText, Mode</p>\n            </div>\n          </div>\n\n          <div class=\"card\">\n            <div style=\"display: flex; justify-content: space-between; align-items: center;\">\n              <span class=\"card-badge\">Dropdown</span>\n              <span style=\"font-family: var(--font-code); color: #a78bfa; font-weight: 700;\">drp</span>\n            </div>\n            <h3 style=\"margin: 0.8rem 0 0.4rem 0;\">Drop Down</h3>\n            <p style=\"font-size: 0.85rem; color: var(--text-muted); flex: 1;\">\n              កំណត់កំហិតការបញ្ចូលទិន្នន័យឱ្យនៅត្រឹមបញ្ជីជម្រើសដែលបានផ្ទៀងផ្ទាត់។ ការពារសុក្រឹតភាពទិន្នន័យ។\n            </p>\n            <div style=\"border-top: 1px solid var(--border-subtle); padding-top: 0.75rem; margin-top: 0.75rem;\">\n              <span style=\"font-size: 0.75rem; color: #a78bfa; font-weight: 700;\">PROPERTIES សំខាន់ៗ៖</span>\n              <p style=\"font-family: var(--font-code); font-size: 0.8rem;\">Items, Default, Selected</p>\n            </div>\n          </div>\n\n          <div class=\"card\">\n            <div style=\"display: flex; justify-content: space-between; align-items: center;\">\n              <span class=\"card-badge\">Button</span>\n              <span style=\"font-family: var(--font-code); color: #34d399; font-weight: 700;\">btn</span>\n            </div>\n            <h3 style=\"margin: 0.8rem 0 0.4rem 0;\">Button</h3>\n            <p style=\"font-size: 0.85rem; color: var(--text-muted); flex: 1;\">\n              ដំណើរការរូបមន្ត Power Fx រក្សាទុកទិន្នន័យ ប្តូរអេក្រង់ ឬបញ្ជាលំហូរការងារស្វ័យប្រវត្តិ។\n            </p>\n            <div style=\"border-top: 1px solid var(--border-subtle); padding-top: 0.75rem; margin-top: 0.75rem;\">\n              <span style=\"font-size: 0.75rem; color: #34d399; font-weight: 700;\">PROPERTIES សំខាន់ៗ៖</span>\n              <p style=\"font-family: var(--font-code); font-size: 0.8rem;\">Text, OnSelect, DisplayMode</p>\n            </div>\n          </div>",
    "subtitle": "បុព្វបទស្តង់ដារ Hungarian, តួនាទីប្រតិបត្តិការ, និងកុងតាក់កំណត់រចនាសម្ព័ន្ធចម្បងៗ។"
  },
  {
    "title": "ស្វែងយល់ស៊ីជម្រៅ៖ ឧបករណ៍បញ្ជាបង្ហាញលទ្ធផល (Label • lbl)",
    "segment": "វគ្គទី ៣៖ រចនាសម្ព័ន្ធ និងយន្តការដំណើរការ",
    "content": "<div class=\"card\">\n            <h3 class=\"card-title\">រចនាសម្ព័ន្ធនៃ Label (Label Structure)</h3>\n            <p class=\"card-body\">\n              Label គឺជា <strong>កញ្ចក់ឆ្លុះព័ត៌មានទិសដៅតែមួយ</strong>។ ព័ត៌មានហូរចេញពី App ឆ្ពោះទៅកាន់ភ្នែកមនុស្សតែប៉ុណ្ណោះ។ មនុស្សមិនអាចវាយអក្សរចូល មិនអាចគូសធីក ឬកាច់វាដូចជាដងកន្លាស់បានទេ។\n            </p>\n\n            <div style=\"margin-top: 1rem; background: rgba(15, 23, 42, 0.8); padding: 1rem; border-radius: 0.6rem; border: 1px solid var(--border-subtle);\">\n              <span style=\"font-size: 0.75rem; font-weight: 700; color: var(--color-cyan);\">ករណីប្រើប្រាស់ទូទៅនៅ APEX PLASTICS៖</span>\n              <ul style=\"margin: 0.5rem 0 0 1.2rem; font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;\">\n                <li>ចំណងជើងអេក្រង់៖ <code>\"Apex Plastics - New Maintenance Ticket\"</code></li>\n                <li>កាលបរិច្ឆេទឌីណាមិក៖ <code>\"Logged On: \" & Text(Today(), \"dd-mmm-yyyy\")</code></li>\n                <li>ការណែនាំអ្នកប្រើ៖ <code>\"ជ្រើសរើសម៉ាស៊ីនដែលកំពុងជួបបញ្ហាខូចខាត៖\"</code></li>\n                <li>លេខប័ណ្ណស្វ័យប្រវត្តិ៖ <code>\"Ticket # TKT-2026-0891\"</code></li>\n              </ul>\n            </div>\n          </div>\n\n          <div class=\"card\">\n            <h3 class=\"card-title\">Properties សំខាន់ៗលើ Label</h3>\n            <div class=\"consequence-row\">\n              <span class=\"card-badge\" style=\"background: rgba(6, 182, 212, 0.2); color: #67e8f9;\">Text</span>\n              <div>\n                <strong>សារដែលត្រូវបង្ហាញ៖</strong>\n                <p>អាចជាអត្ថបទថេរក្នុងសញ្ញាសម្រង់ <code>\"សួស្តី\"</code> ឬជារូបមន្តឌីណាមិក <code>User().FullName</code>។</p>\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"card-badge\" style=\"background: rgba(6, 182, 212, 0.2); color: #67e8f9;\">Color & Fill</span>\n              <div>\n                <strong>សញ្ញាពណ៌សម្គាល់៖</strong>\n                <p>ពណ៌អក្សរ និងពណ៌ផ្ទៃខាងក្រោយ។ ប្រើដើម្បីបង្ហាញសញ្ញាប្រុងប្រយ័ត្នពណ៌ក្រហម ឬជោគជ័យពណ៌បៃតង។</p>\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"card-badge\" style=\"background: rgba(6, 182, 212, 0.2); color: #67e8f9;\">DisplayMode</span>\n              <div>\n                <strong>ស្ថានភាពអន្តរកម្ម៖</strong>\n                <p>កំណត់លំនាំដើមជា <code>DisplayMode.View</code> ដែលបញ្ជាក់ប្រាប់ប្រព័ន្ធថាវាសម្រាប់តែអានប៉ុណ្ណោះ។</p>\n              </div>\n            </div>\n          </div>",
    "subtitle": "សំឡេងនៃកម្មវិធីរបស់អ្នក៖ បង្ហាញការពិត, កូដស្ថានភាព, និងការណែនាំដល់អ្នកប្រើ។"
  },
  {
    "title": "ឧបករណ៍ពិសោធន៍ផ្ទាល់៖ ត្រួតពិនិត្យតួនាទី Controls ទាំង ៤",
    "segment": "វគ្គទី ៣៖ រចនាសម្ព័ន្ធ និងយន្តការដំណើរការ",
    "content": "<div class=\"inspector-menu\">\n            <div class=\"inspector-tab active\" data-control-key=\"label\">\n              <span class=\"tab-icon\">&loz;</span>\n              <div class=\"tab-info\">\n                <h4>Label Control (lbl)</h4>\n                <span>តួនាទី៖ បង្ហាញព័ត៌មាន (Output)</span>\n              </div>\n            </div>\n\n            <div class=\"inspector-tab\" data-control-key=\"textinput\">\n              <span class=\"tab-icon\">&square;</span>\n              <div class=\"tab-info\">\n                <h4>TextInput Control (txt)</h4>\n                <span>តួនាទី៖ បញ្ចូលទិន្នន័យសេរី (Input)</span>\n              </div>\n            </div>\n\n            <div class=\"inspector-tab\" data-control-key=\"dropdown\">\n              <span class=\"tab-icon\">&blacktriangledown;</span>\n              <div class=\"tab-info\">\n                <h4>Dropdown Control (drp)</h4>\n                <span>តួនាទី៖ ជ្រើសរើសជម្រើសកំណត់ (Choice)</span>\n              </div>\n            </div>\n\n            <div class=\"inspector-tab\" data-control-key=\"button\">\n              <span class=\"tab-icon\">&circledast;</span>\n              <div class=\"tab-info\">\n                <h4>Button Control (btn)</h4>\n                <span>តួនាទី៖ បញ្ជាសកម្មភាព (Action)</span>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"inspector-display\">\n            <div style=\"display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;\">\n              <span id=\"inspector-role-badge\" class=\"role-badge-pill pill-output\">Output Control</span>\n              <span id=\"inspector-hungarian-tag\" style=\"font-family: var(--font-code); color: var(--color-cyan); font-weight: 700;\">Prefix: lbl</span>\n            </div>\n\n            <h3 id=\"inspector-control-title\" style=\"margin-bottom: 0.5rem;\">Text Label &bull; lblIncidentDate</h3>\n            <p id=\"inspector-control-desc\" style=\"font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1.25rem;\">\n              បង្ហាញការពិតរបស់ប្រព័ន្ធ ឬអត្ថបទគណនា។ ជាធម្មជាតិសម្រាប់តែអានប៉ុណ្ណោះ មិនអាចទទួលការវាយអក្សរបានទេ។\n            </p>\n\n            <div class=\"live-control-box\">\n              <div id=\"inspector-live-mount\" style=\"width: 100%; display: flex; justify-content: center;\">\n                <!-- Live HTML Control rendered by script.js -->\n              </div>\n            </div>\n\n            <div style=\"background: rgba(15, 23, 42, 0.9); padding: 1rem; border-radius: 0.6rem; border: 1px solid var(--border-subtle);\">\n              <span style=\"font-size: 0.75rem; font-weight: 700; color: var(--color-cyan);\">រូបមន្តកំណត់ក្នុង FORMULA BAR៖</span>\n              <div id=\"inspector-formula-code\" style=\"font-family: var(--font-code); font-size: 0.85rem; color: #93c5fd; margin-top: 0.35rem;\">\n                lblIncidentDate.Text = \"Date: \" & Text(Today(), \"dd-mmm-yyyy\")\n              </div>\n            </div>\n          </div>",
    "subtitle": "ជ្រើសរើសផ្ទាំង Control ខាងឆ្វេង ដើម្បីពិនិត្យឥរិយាបថផ្ទាល់, ស្លាកតួនាទី, និង Properties ខាងស្តាំ។"
  },
  {
    "title": "ស្វែងយល់ស៊ីជម្រៅ៖ ឧបករណ៍បញ្ចូលទិន្នន័យ (TextInput និង Dropdown)",
    "segment": "វគ្គទី ៣៖ រចនាសម្ព័ន្ធ និងយន្តការដំណើរការ",
    "content": "<div class=\"card\">\n            <div style=\"display: flex; justify-content: space-between; align-items: center;\">\n              <span class=\"role-badge-pill pill-input\">ការបញ្ចូលអក្សរសេរី</span>\n              <span style=\"font-family: var(--font-code); color: #60a5fa; font-weight: 700;\">txt</span>\n            </div>\n            <h3 style=\"margin: 0.6rem 0;\">Text Input (txt)</h3>\n            <p style=\"font-size: 0.88rem; color: var(--text-muted); margin-bottom: 0.85rem;\">\n              ប្រើនៅពេលចម្លើយមិនអាចដឹងមុនបាន (ឧ. ការពណ៌នាអំពីហេតុការណ៍ខូចខាត, លេខស៊េរីម៉ាស៊ីន, មតិយោបល់របស់អ្នកបច្ចេកទេស)។\n            </p>\n            <div style=\"background: rgba(15, 23, 42, 0.8); padding: 0.85rem; border-radius: 0.5rem; border: 1px solid var(--border-subtle);\">\n              <strong style=\"font-size: 0.82rem; color: #93c5fd;\">Properties គន្លឹះសំខាន់ៗ៖</strong>\n              <ul style=\"margin: 0.4rem 0 0 1.2rem; font-size: 0.82rem; color: var(--text-muted); line-height: 1.5;\">\n                <li><code>Default</code>៖ តម្លៃដែលបំពេញស្រាប់ពីដំបូង (ភាគច្រើនទុកទទេ <code>\"\"</code>)។</li>\n                <li><code>HintText</code>៖ អក្សរណែនាំស្រាលៗ (ឧ. <em>\"ពណ៌នាអំពីសំឡេង ឬកន្លែងលេចធ្លាយ...\"</em>)។</li>\n                <li><code>Mode</code>៖ <code>TextMode.SingleLine</code> ឬ <code>TextMode.MultiLine</code>។</li>\n              </ul>\n            </div>\n          </div>\n\n          <div class=\"card\">\n            <div style=\"display: flex; justify-content: space-between; align-items: center;\">\n              <span class=\"role-badge-pill pill-input\">ការជ្រើសរើសច្បាស់លាស់</span>\n              <span style=\"font-family: var(--font-code); color: #a78bfa; font-weight: 700;\">drp</span>\n            </div>\n            <h3 style=\"margin: 0.6rem 0;\">Drop Down (drp)</h3>\n            <p style=\"font-size: 0.88rem; color: var(--text-muted); margin-bottom: 0.85rem;\">\n              ប្រើនៅពេលជម្រើសមានកំណត់ និងច្បាស់លាស់។ <strong>ធានាសុក្រឹតភាពទិន្នន័យ</strong> ដោយលុបបំបាត់ការសរសេរខុសអក្ខរាវិរុទ្ធ និងភាពខុសប្លែកគ្នានៃអក្សរ។\n            </p>\n            <div style=\"background: rgba(15, 23, 42, 0.8); padding: 0.85rem; border-radius: 0.5rem; border: 1px solid var(--border-subtle);\">\n              <strong style=\"font-size: 0.82rem; color: #c4b5fd;\">Properties គន្លឹះសំខាន់ៗ៖</strong>\n              <ul style=\"margin: 0.4rem 0 0 1.2rem; font-size: 0.82rem; color: var(--text-muted); line-height: 1.5;\">\n                <li><code>Items</code>៖ តារាងជួរឈរទោលនៃជម្រើស៖ <code>[\"Press-01\", \"Press-02\", \"Press-03\"]</code>។</li>\n                <li><code>Default</code>៖ ជម្រើសដែលជ្រើសរើសដំបូងគេពេលបើកអេក្រង់។</li>\n                <li><code>Selected.Value</code>៖ តម្លៃពិតប្រាកដដែលអ្នកប្រើប្រាស់បានចុចរើស។</li>\n              </ul>\n            </div>\n          </div>",
    "subtitle": "វិធានសុក្រឹតភាពទិន្នន័យ៖ វាយអក្សរសេរីពេលចម្លើយមានច្រើនឥតគណនា; Dropdown ពេលជម្រើសមានកំណត់។"
  },
  {
    "title": "ឧបករណ៍ពិសោធន៍បញ្ហាក្នុង App៖ ការវាយអក្សរសេរី ប្រៀបធៀបនឹង Dropdown",
    "segment": "វគ្គទី ៣៖ រចនាសម្ព័ន្ធ និងយន្តការដំណើរការ",
    "content": "<div class=\"sim-panel error-side\">\n            <div class=\"sim-header\">\n              <h3 style=\"color: #fca5a5; font-size: 1.05rem;\">ស្ថាបត្យកម្មមានកំហុស៖ ប្រើ Text Input សេរី</h3>\n              <span class=\"consequence-badge\">ហានិភ័យខូចទិន្នន័យខ្ពស់</span>\n            </div>\n            <p style=\"font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;\">\n              កម្មករវាយឈ្មោះម៉ាស៊ីនដោយសេរីចូលទៅក្នុង <code>txtMachineName</code>៖\n            </p>\n\n            <div style=\"display: flex; gap: 0.5rem; margin-bottom: 1rem;\">\n              <input type=\"text\" id=\"sim-bad-input\" class=\"sample-input-control\" placeholder=\"ឧ. press 1, P01, Machine-1\" value=\"press 1\">\n              <button id=\"btn-sim-test-bad\" class=\"hud-btn\" style=\"background: rgba(239, 68, 68, 0.2); border-color: var(--color-danger); color: #fca5a5;\">\n                សាកល្បង Submit\n              </button>\n            </div>\n\n            <div class=\"sim-log-box\" id=\"sim-bad-log\">\n              <div class=\"log-entry-bad\">[08:14] អ្នកប្រើវាយ \"press 1\" &rarr; DB ស្វែងរកបរាជ័យ (គ្មានឈ្មោះម៉ាស៊ីននេះទេ)</div>\n              <div class=\"log-entry-bad\">[08:32] អ្នកប្រើវាយ \"M/C #1\" &rarr; ការស្វែងរកគ្រឿងបន្លាស់គាំងទាំងស្រុង!</div>\n              <div class=\"log-entry-bad\">[09:05] អ្នកប្រើវាយ \"P-01\" &rarr; កំហុស Foreign Key ក្នុង SharePoint!</div>\n            </div>\n          </div>\n\n          <div class=\"sim-panel success-side\">\n            <div class=\"sim-header\">\n              <h3 style=\"color: #86efac; font-size: 1.05rem;\">ស្ថាបត្យកម្មវិស្វកម្មត្រឹមត្រូវ៖ ប្រើ Dropdown ជម្រើសកំណត់</h3>\n              <span class=\"consequence-badge\" style=\"background: rgba(16, 185, 129, 0.2); color: #86efac; border-color: rgba(16, 185, 129, 0.4);\">ទិន្នន័យស្អាត ១០០%</span>\n            </div>\n            <p style=\"font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;\">\n              កម្មករជ្រើសរើសពីបញ្ជីម៉ាស៊ីនដែលបានចុះបញ្ជីត្រឹមត្រូវក្នុង <code>drpMachineSelect</code>៖\n            </p>\n\n            <div style=\"display: flex; gap: 0.5rem; margin-bottom: 1rem;\">\n              <select id=\"sim-good-select\" class=\"sample-input-control\" style=\"cursor: pointer;\">\n                <option value=\"Press-01\">Injection Press 01 (M-01)</option>\n                <option value=\"Press-02\">Injection Press 02 (M-02)</option>\n                <option value=\"Press-03\">Injection Press 03 (M-03)</option>\n                <option value=\"Extruder-01\">Extruder Line 01 (E-01)</option>\n              </select>\n              <button id=\"btn-sim-test-good\" class=\"hud-btn\" style=\"background: rgba(16, 185, 129, 0.2); border-color: var(--color-success); color: #86efac;\">\n                សាកល្បង Submit\n              </button>\n            </div>\n\n            <div class=\"sim-log-box\" id=\"sim-good-log\">\n              <div class=\"log-entry-good\">[08:14] ជ្រើសរើស \"Press-01\" &rarr; ស៊ីគ្នាជាមួយ Asset ID 1042 (ទិន្នន័យត្រឹមត្រូវ)</div>\n              <div class=\"log-entry-good\">[08:32] ជ្រើសរើស \"Press-02\" &rarr; ក្បាលវ៉ានធារាសាស្ត្របម្រុងទុកដោយស្វ័យប្រវត្តិ</div>\n              <div class=\"log-entry-good\">[09:05] ជ្រើសរើស \"Press-01\" &rarr; សេចក្តីជូនដំណឹងជួសជុលដំណើរការភ្លាមៗ</div>\n            </div>\n          </div>",
    "subtitle": "ពិសោធន៍ផ្ទាល់ពីមូលហេតុដែលការជ្រើសរើស Control ខុសបំផ្លាញទិន្នន័យ និងបង្កឱ្យគាំងការផលិត។"
  },
  {
    "title": "ស្វែងយល់ស៊ីជម្រៅ៖ ឧបករណ៍បញ្ជាសកម្មភាព (Button • btn)",
    "segment": "វគ្គទី ៣៖ រចនាសម្ព័ន្ធ និងយន្តការដំណើរការ",
    "content": "<div class=\"card\">\n            <h3 class=\"card-title\">រចនាសម្ព័ន្ធនៃប៊ូតុងបញ្ជា (Button Structure)</h3>\n            <p class=\"card-body\">\n              Button គឺជា <strong>កុងតាក់អគ្គិសនីមេកានិក</strong>។ ដោយខ្លួនវាផ្ទាល់ វាមិនរក្សាទុកអ្វីទាំងអស់ ហើយក៏មិនដឹងអ្វីទាំងអស់ដែរ។ វានៅស្ងៀមរង់ចាំព្រឹត្តិការណ៍ <code>OnSelect</code> ពីអ្នកប្រើប្រាស់។\n            </p>\n\n            <div style=\"margin-top: 1rem; background: rgba(15, 23, 42, 0.85); padding: 1rem; border-radius: 0.6rem; border: 1px solid var(--border-subtle);\">\n              <span style=\"font-size: 0.75rem; font-weight: 700; color: #34d399;\">វដ្តជីវិតរបស់ BUTTON៖</span>\n              <ol style=\"margin: 0.5rem 0 0 1.2rem; font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;\">\n                <li>អ្នកប្រើប៉ះលើអេក្រង់ &rarr; កម្មវិធីរុករកបញ្ឆេះព្រឹត្តិការណ៍ <code>OnSelect</code>។</li>\n                <li>Power Apps ដំណើរការរូបមន្ត៖ ផ្ទៀងផ្ទាត់ទិន្នន័យ រក្សាទុក ឬប្តូរអេក្រង់។</li>\n                <li>ការឆ្លើយតបដែលមើលឃើញ៖ ប៊ូតុងស្រុតចុះបន្តិច និងបញ្ចេញពន្លឺ។</li>\n              </ol>\n            </div>\n          </div>\n\n          <div class=\"card\">\n            <h3 class=\"card-title\">ការកំណត់របៀបទាំងបី៖ DisplayMode</h3>\n            <div class=\"consequence-row\">\n              <span class=\"card-badge\" style=\"background: rgba(16, 185, 129, 0.2); color: #86efac;\">DisplayMode.Edit</span>\n              <div>\n                <strong>សកម្ម និងអាចចុចបាន (Active)៖</strong>\n                <p>ស្ថានភាពដំណើរការធម្មតា។ ប៊ូតុងឆ្លើយតបនឹងការប៉ះ ហើយដំណើរការកូដក្នុង <code>OnSelect</code>។</p>\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"card-badge\" style=\"background: rgba(100, 116, 139, 0.3); color: #94a3b8;\">DisplayMode.Disabled</span>\n              <div>\n                <strong>អសកម្ម និងពណ៌ប្រផេះ (Locked)៖</strong>\n                <p>មិនអាចចុចបានឡើយ។ ប្រើដើម្បីទប់ស្កាត់ការ Submit នៅពេលប្រអប់ទិន្នន័យចាំបាច់នៅទទេ។</p>\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"card-badge\" style=\"background: rgba(59, 130, 246, 0.2); color: #93c5fd;\">DisplayMode.View</span>\n              <div>\n                <strong>សម្រាប់តែមើលប៉ុណ្ណោះ (Display Only)៖</strong>\n                <p>បង្ហាញជាអក្សរធម្មតាដោយគ្មានរាងប៊ូតុងអន្តរកម្មឡើយ ដំណើរការដូចជា Label។</p>\n              </div>\n            </div>\n          </div>",
    "subtitle": "គន្លឹះមេកានិក៖ បំប្លែងបំណងរបស់អ្នកប្រើប្រាស់ឱ្យទៅជាការរក្សាទុកក្នុង Database និងការប្តូរអេក្រង់។"
  },
  {
    "title": "ការបង្ហាញផ្ទាល់ដោយគ្រូ៖ ការដំឡើងទម្រង់ scrNewRequest",
    "segment": "វគ្គទី ៤៖ ការបង្ហាញផ្ទាល់",
    "content": "<div class=\"card\">\n            <span class=\"obj-num\">1</span>\n            <h4 style=\"margin: 0.6rem 0 0.3rem 0;\">បញ្ចូល Label ចំណងជើង</h4>\n            <p style=\"font-size: 0.85rem; color: var(--text-muted); flex: 1;\">\n              ចុច <code>+ Insert</code> &rarr; <code>Text label</code>។ ប្តូរឈ្មោះជា <code>lblFormTitle</code>។ កំណត់ <code>Text = \"Report Machine Incident\"</code>។\n            </p>\n            <div style=\"font-family: var(--font-code); font-size: 0.78rem; color: var(--color-cyan); margin-top: 0.5rem;\">តួនាទី៖ Output</div>\n          </div>\n\n          <div class=\"card\">\n            <span class=\"obj-num\">2</span>\n            <h4 style=\"margin: 0.6rem 0 0.3rem 0;\">បញ្ចូល Dropdown ម៉ាស៊ីន</h4>\n            <p style=\"font-size: 0.85rem; color: var(--text-muted); flex: 1;\">\n              ចុច <code>+ Insert</code> &rarr; <code>Drop down</code>។ ប្តូរឈ្មោះជា <code>drpMachineSelect</code>។ កំណត់ <code>Items = [\"Press-01\", \"Press-02\", \"Press-03\"]</code>។\n            </p>\n            <div style=\"font-family: var(--font-code); font-size: 0.78rem; color: #60a5fa; margin-top: 0.5rem;\">តួនាទី៖ Choice Input</div>\n          </div>\n\n          <div class=\"card\">\n            <span class=\"obj-num\">3</span>\n            <h4 style=\"margin: 0.6rem 0 0.3rem 0;\">បញ្ចូល TextInput កំណត់ចំណាំ</h4>\n            <p style=\"font-size: 0.85rem; color: var(--text-muted); flex: 1;\">\n              ចុច <code>+ Insert</code> &rarr; <code>Text input</code>។ ប្តូរឈ្មោះជា <code>txtFailureNotes</code>។ កំណត់ <code>Default = \"\"</code> និង <code>Mode = TextMode.MultiLine</code>។\n            </p>\n            <div style=\"font-family: var(--font-code); font-size: 0.78rem; color: #a78bfa; margin-top: 0.5rem;\">តួនាទី៖ Freeform Input</div>\n          </div>\n\n          <div class=\"card\">\n            <span class=\"obj-num\">4</span>\n            <h4 style=\"margin: 0.6rem 0 0.3rem 0;\">បញ្ចូល Button បញ្ជូនប័ណ្ណ</h4>\n            <p style=\"font-size: 0.85rem; color: var(--text-muted); flex: 1;\">\n              ចុច <code>+ Insert</code> &rarr; <code>Button</code>។ ប្តូរឈ្មោះជា <code>btnSubmitTicket</code>។ កំណត់ <code>Text = \"SUBMIT TICKET\"</code>។\n            </p>\n            <div style=\"font-family: var(--font-code); font-size: 0.78rem; color: #34d399; margin-top: 0.5rem;\">តួនាទី៖ Action Trigger</div>\n          </div>",
    "subtitle": "ទស្សនាគ្រូបង្ហាញការដំឡើង Controls ស្នូលទាំង ៤ ក្នុង Power Apps Studio ដោយស្ទាត់ជំនាញ។"
  },
  {
    "title": "បន្ទប់ពិសោធន៍ Properties ផ្ទាល់៖ កែសម្រួលកុងតាក់ និងសង្កេតប្រតិកម្ម",
    "segment": "វគ្គទី ៥៖ ការអនុវត្តដោយមានការណែនាំ",
    "content": "<div class=\"dials-panel\">\n            <h3 style=\"font-size: 1.05rem; margin-bottom: 0.4rem;\">កុងតាក់ Properties (ផ្ទាំង Inspector)</h3>\n            \n            <div class=\"dial-group\">\n              <label class=\"dial-label\" for=\"lab-hint-input\">txtIncidentNotes &bull; HintText៖</label>\n              <input type=\"text\" id=\"lab-hint-input\" class=\"dial-input\" value=\"Describe unusual noise, smell, or leak...\">\n            </div>\n\n            <div class=\"dial-group\">\n              <label class=\"dial-label\" for=\"lab-items-select\">drpUrgency &bull; តារាង Items៖</label>\n              <select id=\"lab-items-select\" class=\"dial-select\">\n                <option value=\"standard\">[\"Low\", \"Medium\", \"High\", \"Critical\"]</option>\n                <option value=\"shift\">[\"Shift A\", \"Shift B\", \"Shift C\"]</option>\n                <option value=\"department\">[\"Molding\", \"Tooling\", \"Packaging\"]</option>\n              </select>\n            </div>\n\n            <div class=\"dial-group\">\n              <label class=\"dial-label\" for=\"lab-display-mode\">btnSubmit &bull; DisplayMode៖</label>\n              <select id=\"lab-display-mode\" class=\"dial-select\">\n                <option value=\"Edit\">DisplayMode.Edit (សកម្ម / អាចចុចបាន)</option>\n                <option value=\"Disabled\">DisplayMode.Disabled (ពណ៌ប្រផេះ / ចាក់សោ)</option>\n              </select>\n            </div>\n\n            <div style=\"margin-top: auto; padding: 0.75rem; background: rgba(59, 130, 246, 0.1); border-radius: 0.5rem; border: 1px solid rgba(59, 130, 246, 0.3); font-size: 0.8rem; color: #93c5fd;\">\n              គន្លឹះ៖ ក្នុង Power Apps Studio រាល់ការផ្លាស់ប្តូររូបរាង និងឥរិយាបថ គឺកើតចេញពីការផ្លាស់ប្តូរតម្លៃលើ Property!\n            </div>\n          </div>\n\n          <div class=\"canvas-preview-panel\">\n            <span style=\"position: absolute; top: 1rem; left: 1.5rem; font-size: 0.75rem; font-weight: 700; color: var(--color-cyan); text-transform: uppercase;\">\n              ទិដ្ឋភាពផ្ទាល់លើ Canvas (scrNewRequest)\n            </span>\n\n            <div style=\"width: 100%; max-width: 440px; display: flex; flex-direction: column; gap: 1.25rem;\">\n              <div>\n                <label style=\"font-size: 0.82rem; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 0.35rem;\">\n                  1. កម្រិតបន្ទាន់នៃបញ្ហា (drpUrgency)៖\n                </label>\n                <select id=\"lab-preview-dropdown\" class=\"sample-input-control\" style=\"cursor: pointer;\">\n                  <option>Low</option>\n                  <option>Medium</option>\n                  <option>High</option>\n                  <option>Critical</option>\n                </select>\n              </div>\n\n              <div>\n                <label style=\"font-size: 0.82rem; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 0.35rem;\">\n                  2. កំណត់ចំណាំពិស្តារអំពីបញ្ហា (txtIncidentNotes)៖\n                </label>\n                <input type=\"text\" id=\"lab-preview-textinput\" class=\"sample-input-control\" placeholder=\"Describe unusual noise, smell, or leak...\">\n              </div>\n\n              <div>\n                <label style=\"font-size: 0.82rem; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 0.35rem;\">\n                  3. បញ្ជាបញ្ជូនទិន្នន័យ (btnSubmit)៖\n                </label>\n                <button id=\"lab-preview-button\" class=\"sample-button-control\">\n                  SUBMIT MAINTENANCE TICKET\n                </button>\n              </div>\n            </div>\n          </div>",
    "subtitle": "កែប្រែកុងតាក់ Properties ក្នុងពេលជាក់ស្តែង ដើម្បីសង្កេតមើលប្រតិកម្មរបស់ Controls។"
  },
  {
    "title": "ការអនុវត្តដោយមានការណែនាំ៖ ការដំឡើងទម្រង់ប្រគល់វេនការងារ",
    "segment": "វគ្គទី ៥៖ ការអនុវត្តដោយមានការណែនាំ",
    "content": "<div class=\"card\">\n            <h3 class=\"card-title\">លក្ខខណ្ឌតម្រូវក្នុងរោងចក្រ</h3>\n            <div class=\"consequence-row\">\n              <span class=\"obj-num\">A</span>\n              <div>\n                <strong>ស្លាកសម្គាល់វេនការងារ៖</strong>\n                <p>ត្រូវបង្ហាញ \"Current Shift: Morning Shift (06:00 - 14:00)\" ជាអត្ថបទសម្រាប់តែអានប៉ុណ្ណោះ។</p>\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"obj-num\">B</span>\n              <div>\n                <strong>ស្ថានភាពខ្សែសង្វាក់ផលិតកម្ម៖</strong>\n                <p>ប្រធានវេនជ្រើសរើសក្នុងចំណោម ៣ ជម្រើស៖ \"100% Operational\", \"Degraded Rate\", \"Full Stoppage\"។</p>\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"obj-num\">C</span>\n              <div>\n                <strong>កំណត់ចំណាំប្រគល់វេន៖</strong>\n                <p>ប្រអប់អត្ថបទច្រើនជួរសម្រាប់កត់ត្រាការដឹកជញ្ជូនវត្ថុធាតុដើម ឬការពាក់ស្លាកស្នាមពុម្ព។</p>\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"obj-num\">D</span>\n              <div>\n                <strong>បញ្ជាក់ និងចាក់សោទិន្នន័យ៖</strong>\n                <p>ប៊ូតុងសម្រាប់បិទកំណត់ហេតុប្រគល់វេន និងបញ្ឆេះរបាយការណ៍ស្វ័យប្រវត្តិ។</p>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"card\">\n            <h3 class=\"card-title\">ដំណោះស្រាយស្ថាបត្យកម្មរបស់សិក្ខាកាម</h3>\n            <table style=\"width: 100%; border-collapse: collapse; font-size: 0.85rem; color: var(--text-muted);\">\n              <thead>\n                <tr style=\"border-bottom: 1px solid var(--border-subtle); color: var(--color-cyan); text-align: left;\">\n                  <th style=\"padding: 0.5rem 0.25rem;\">ល.រ</th>\n                  <th style=\"padding: 0.5rem 0.25rem;\">ប្រភេទ Control</th>\n                  <th style=\"padding: 0.5rem 0.25rem;\">ឈ្មោះ Hungarian</th>\n                  <th style=\"padding: 0.5rem 0.25rem;\">Property សំខាន់</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr style=\"border-bottom: 1px solid var(--border-subtle);\">\n                  <td style=\"padding: 0.6rem 0.25rem; font-weight: 700; color: #fff;\">A</td>\n                  <td style=\"padding: 0.6rem 0.25rem;\">Label</td>\n                  <td style=\"padding: 0.6rem 0.25rem; font-family: var(--font-code); color: var(--color-cyan);\">lblShiftBanner</td>\n                  <td style=\"padding: 0.6rem 0.25rem; font-family: var(--font-code);\">Text</td>\n                </tr>\n                <tr style=\"border-bottom: 1px solid var(--border-subtle);\">\n                  <td style=\"padding: 0.6rem 0.25rem; font-weight: 700; color: #fff;\">B</td>\n                  <td style=\"padding: 0.6rem 0.25rem;\">Dropdown</td>\n                  <td style=\"padding: 0.6rem 0.25rem; font-family: var(--font-code); color: #60a5fa;\">drpLineStatus</td>\n                  <td style=\"padding: 0.6rem 0.25rem; font-family: var(--font-code);\">Items</td>\n                </tr>\n                <tr style=\"border-bottom: 1px solid var(--border-subtle);\">\n                  <td style=\"padding: 0.6rem 0.25rem; font-weight: 700; color: #fff;\">C</td>\n                  <td style=\"padding: 0.6rem 0.25rem;\">TextInput</td>\n                  <td style=\"padding: 0.6rem 0.25rem; font-family: var(--font-code); color: #a78bfa;\">txtHandoverNotes</td>\n                  <td style=\"padding: 0.6rem 0.25rem; font-family: var(--font-code);\">HintText</td>\n                </tr>\n                <tr>\n                  <td style=\"padding: 0.6rem 0.25rem; font-weight: 700; color: #fff;\">D</td>\n                  <td style=\"padding: 0.6rem 0.25rem;\">Button</td>\n                  <td style=\"padding: 0.6rem 0.25rem; font-family: var(--font-code); color: #34d399;\">btnConfirmHandover</td>\n                  <td style=\"padding: 0.6rem 0.25rem; font-family: var(--font-code);\">OnSelect</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>",
    "subtitle": "អនុវត្តតាមការណែនាំ ដោយផ្គូផ្គងលក្ខខណ្ឌប្រគល់វេនទាំង ៤ ទៅកាន់ Controls និង Properties។"
  },
  {
    "title": "ការអនុវត្តស្វ័យភាព៖ ការដកគ្រឿងបន្លាស់ពីឃ្លាំង",
    "segment": "វគ្គទី ៦៖ ការអនុវត្តស្វ័យភាព",
    "content": "<div class=\"card\">\n            <h3 class=\"card-title\">សេណារីយ៉ូអាជីវកម្មក្នុងឃ្លាំងឧបករណ៍</h3>\n            <p style=\"font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1rem;\">\n              នៅពេលអ្នកបច្ចេកទេសថែទាំមកដកគ្រឿងបន្លាស់ពីឃ្លាំង Tool Crib ពួកគេប្រើប្រាស់ iPad ដែលបំពាក់លើជញ្ជាំងទូដែក។\n            </p>\n\n            <div class=\"objective-item\">\n              <span class=\"obj-num\">1</span>\n              <div>\n                <strong>បង្ហាញទីតាំងទូដែក៖</strong>\n                <p>អត្ថបទសម្រាប់តែអានបង្ហាញ <em>\"Cabinet #4: Hydraulic Spares &bull; Shelf B\"</em>។</p>\n              </div>\n            </div>\n            <div class=\"objective-item\">\n              <span class=\"obj-num\">2</span>\n              <div>\n                <strong>ជ្រើសរើសគ្រឿងបន្លាស់ត្រឹមត្រូវ៖</strong>\n                <p>រើសពីបញ្ជីស្តុក៖ <code>O-Ring 50mm</code>, <code>Piston Seal</code>, <code>Hydraulic Fluid 5L</code>។</p>\n              </div>\n            </div>\n            <div class=\"objective-item\">\n              <span class=\"obj-num\">3</span>\n              <div>\n                <strong>បញ្ចូលចំនួនដកចេញ៖</strong>\n                <p>អ្នកបច្ចេកទេសវាយចំនួនគ្រឿងបន្លាស់ដែលបានយកចេញពីធុង (ឧ. <code>2</code>)។</p>\n              </div>\n            </div>\n            <div class=\"objective-item\">\n              <span class=\"obj-num\">4</span>\n              <div>\n                <strong>បញ្ជាក់ប្រតិបត្តិការដក៖</strong>\n                <p>ប៊ូតុងចុចដើម្បីកត់ត្រាកំណត់ហេតុ និងកាត់ស្តុកក្នុងតារាង SharePoint។</p>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"card\" style=\"border-color: rgba(59, 130, 246, 0.4); background: rgba(15, 23, 42, 0.9);\">\n            <h3 class=\"card-title\">ទម្រង់លទ្ធផលដែលត្រូវប្រគល់</h3>\n            <p style=\"font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;\">\n              សរសេរចម្លើយរបស់អ្នកក្នុងសៀវភៅកំណត់ត្រាមុនពេលយើងផ្ទៀងផ្ទាត់ចម្លើយរួមគ្នា៖\n            </p>\n\n            <div style=\"background: rgba(30, 41, 59, 0.6); padding: 1rem; border-radius: 0.6rem; border: 1px dashed var(--border-subtle); font-family: var(--font-code); font-size: 0.82rem; line-height: 1.8;\">\n              Item 1: [ប្រភេទ Control?] &bull; [បុព្វបទ + ឈ្មោះ?] &bull; [Property?]<br>\n              Item 2: [ប្រភេទ Control?] &bull; [បុព្វបទ + ឈ្មោះ?] &bull; [Property?]<br>\n              Item 3: [ប្រភេទ Control?] &bull; [បុព្វបទ + ឈ្មោះ?] &bull; [Property?]<br>\n              Item 4: [ប្រភេទ Control?] &bull; [បុព្វបទ + ឈ្មោះ?] &bull; [Property?]\n            </div>\n\n            <div style=\"margin-top: auto; padding: 0.85rem; background: rgba(6, 182, 212, 0.1); border-radius: 0.5rem; font-size: 0.82rem; color: #67e8f9;\">\n              គន្លឹះ៖ ចងចាំបុព្វបទស្តង់ដារ Hungarian ជានិច្ច៖ <code>lbl</code>, <code>drp</code>, <code>txt</code>, <code>btn</code>!\n            </div>\n          </div>",
    "subtitle": "ចំណាយពេល ១០ នាទីដើម្បីផ្គូផ្គងលក្ខខណ្ឌតម្រូវទាំង ៤ ខាងក្រោមទៅកាន់ការកំណត់ Control ដ៏ល្អបំផុត។"
  },
  {
    "title": "ការបកស្រាយការយល់ខុសដ៏គ្រោះថ្នាក់ទាំង ៤ របស់អ្នកចាប់ផ្តើមដំបូង",
    "segment": "វគ្គទី ៦៖ ការអនុវត្តស្វ័យភាព",
    "content": "<div class=\"card\">\n            <span class=\"consequence-badge\">ការយល់ខុសទី ១</span>\n            <h4 style=\"margin: 0.5rem 0;\">\"Label អាចវាយអក្សរចូលបាន ប្រសិនបើខ្ញុំចុចលើវា។\"</h4>\n            <p style=\"font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.65rem;\">\n              <strong>មូលហេតុដែលគិតបែបនេះ៖</strong> ក្នុង Microsoft Word អក្សរទាំងអស់សុទ្ធតែអាចចុចកែសម្រួលបានគ្រប់ទីកន្លែង។\n            </p>\n            <p style=\"font-size: 0.85rem; color: #86efac; border-left: 2px solid var(--color-success); padding-left: 0.75rem;\">\n              <strong>ការពិតវិស្វកម្ម៖</strong> Label គឺជាកញ្ចក់ឆ្លុះព័ត៌មានទិសដៅតែមួយ។ ដើម្បីប្រមូលអក្សរពីអ្នកប្រើប្រាស់ អ្នកត្រូវតែប្រើ Text Input។\n            </p>\n          </div>\n\n          <div class=\"card\">\n            <span class=\"consequence-badge\">ការយល់ខុសទី ២</span>\n            <h4 style=\"margin: 0.5rem 0;\">\"TextInput ល្អជាង Dropdown ព្រោះអ្នកប្រើអាចវាយអ្វីក៏បាន។\"</h4>\n            <p style=\"font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.65rem;\">\n              <strong>មូលហេតុដែលគិតបែបនេះ៖</strong> អ្នកចាប់ផ្តើមចូលចិត្តសេរីភាពនៃការវាយអក្សរ និងខ្លាចការដាក់កំហិតលើអ្នកប្រើ។\n            </p>\n            <p style=\"font-size: 0.85rem; color: #86efac; border-left: 2px solid var(--color-success); padding-left: 0.75rem;\">\n              <strong>ការពិតវិស្វកម្ម៖</strong> ការវាយអក្សរសេរីបំផ្លាញមូលដ្ឋានទិន្នន័យ។ Dropdown ធានាថាកូដម៉ាស៊ីន និងស្ថានភាពមានភាពត្រឹមត្រូវ ១០០% សម្រាប់របាយការណ៍។\n            </p>\n          </div>\n\n          <div class=\"card\">\n            <span class=\"consequence-badge\">ការយល់ខុសទី ៣</span>\n            <h4 style=\"margin: 0.5rem 0;\">\"ប៊ូតុងនឹងរក្សាទុកទិន្នន័យដោយស្វ័យប្រវត្តិពេលចុច។\"</h4>\n            <p style=\"font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.65rem;\">\n              <strong>មូលហេតុដែលគិតបែបនេះ៖</strong> ធ្លាប់ប្រើទម្រង់វិបសាយដែលគ្រាន់តែចុច Submit គឺទិន្នន័យត្រូវបានបញ្ជូនភ្លាម។\n            </p>\n            <p style=\"font-size: 0.85rem; color: #86efac; border-left: 2px solid var(--color-success); padding-left: 0.75rem;\">\n              <strong>ការពិតវិស្វកម្ម៖</strong> ប៊ូតុងប្រៀបដូចជាកុងតាក់ជ័រមួយ។ វាមិនធ្វើអ្វីទាំងអស់រហូតទាល់តែអ្នកសរសេររូបមន្តក្នុង Property <code>OnSelect</code> របស់វា។\n            </p>\n          </div>\n\n          <div class=\"card\">\n            <span class=\"consequence-badge\">ការយល់ខុសទី ៤</span>\n            <h4 style=\"margin: 0.5rem 0;\">\"HintText និង Default គឺជាតែមួយដូចគ្នា។\"</h4>\n            <p style=\"font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.65rem;\">\n              <strong>មូលហេតុដែលគិតបែបនេះ៖</strong> ទាំងពីរនេះសុទ្ធតែបង្ហាញអក្សរក្នុងប្រអប់ពេលអេក្រង់បើកដំបូង។\n            </p>\n            <p style=\"font-size: 0.85rem; color: #86efac; border-left: 2px solid var(--color-success); padding-left: 0.75rem;\">\n              <strong>ការពិតវិស្វកម្ម៖</strong> <code>Default</code> ជាទិន្នន័យពិតដែលនឹងរក្សាទុកបើមិនកែប្រែ។ រីឯ <code>HintText</code> ជាអក្សរស្រមោលណែនាំដែលនឹងរលាយបាត់ពេលវាយអក្សរ។\n            </p>\n          </div>",
    "subtitle": "ជំនួសការយល់ខុសទូទៅរបស់អ្នកចាប់ផ្តើមដំបូង ដោយសភាវគតិវិស្វកម្មវិជ្ជាជីវៈ។"
  },
  {
    "title": "ការវាយតម្លៃចំណេះដឹង៖ សំណួរ ៥ អំពីការគ្រប់គ្រង Controls",
    "segment": "វគ្គទី ៧៖ ការវាយតម្លៃ និងត្រួតពិនិត្យ",
    "content": "<div class=\"quiz-card\">\n            <div style=\"display: flex; justify-content: space-between; align-items: center;\">\n              <span id=\"quiz-question-badge\" class=\"card-badge\">សំណួរទី ១ នៃ ៥</span>\n              <span id=\"quiz-score-badge\" style=\"font-family: var(--font-code); color: var(--color-cyan); font-size: 0.85rem;\">ពិន្ទុ៖ 0/5</span>\n            </div>\n\n            <h3 id=\"quiz-question-title\" style=\"margin: 1rem 0 0.5rem 0; font-size: 1.15rem; line-height: 1.4;\">\n              ហេតុអ្វីបានជាឈ្មោះម៉ាស៊ីនក្នុងទម្រង់រាយការណ៍គួរតែជា Dropdown ជាជាង Text Input?\n            </h3>\n\n            <div class=\"quiz-options\" id=\"quiz-options-container\">\n              <!-- Rendered dynamically by script.js -->\n            </div>\n\n            <div class=\"quiz-feedback\" id=\"quiz-feedback-box\">\n              <!-- Feedback rationale shown upon answering -->\n            </div>\n\n            <div style=\"margin-top: auto; display: flex; justify-content: space-between; align-items: center; padding-top: 1rem;\">\n              <button id=\"btn-quiz-prev\" class=\"hud-btn\" style=\"visibility: hidden;\">&larr; សំណួរមុន</button>\n              <button id=\"btn-quiz-next\" class=\"hud-btn\" style=\"display: none;\">សំណួរបន្ទាប់ &rarr;</button>\n            </div>\n          </div>\n\n          <div class=\"card\" style=\"border-color: rgba(59, 130, 246, 0.3); background: rgba(15, 23, 42, 0.85);\">\n            <h3 class=\"card-title\">សង្ខេបវិធានវិស្វកម្ម Controls</h3>\n            <div class=\"consequence-row\">\n              <span class=\"role-badge-pill pill-output\">វិធាន Output</span>\n              <div>\n                <strong>Label (lbl)៖</strong>\n                <p>កុំប្រើសម្រាប់ប្រមូលទិន្នន័យ។ ប្រើសម្រាប់តែចំណងជើង ស្លាកព័ត៌មាន និងតម្លៃគណនាប៉ុណ្ណោះ។</p>\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"role-badge-pill pill-input\">វិធាន Input</span>\n              <div>\n                <strong>Dropdown (drp)៖</strong>\n                <p>ប្រើជានិច្ចនៅពេលជម្រើសត្រឹមត្រូវមានចំនួនកំណត់ (ឧ. លេខម៉ាស៊ីន, កម្រិតបន្ទាន់, វេនការងារ, ប្រភេទ)។</p>\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"role-badge-pill pill-action\">វិធាន Action</span>\n              <div>\n                <strong>Button (btn)៖</strong>\n                <p>ត្រូវតែមានរូបមន្តក្នុង <code>OnSelect</code> ដើម្បីដំណើរការ។ ប្រើ <code>DisplayMode.Disabled</code> ដើម្បីទប់ស្កាត់ការ Submit ខុស។</p>\n              </div>\n            </div>\n          </div>",
    "subtitle": "សាកល្បងការយល់ដឹងរបស់អ្នកអំពីតួនាទី Controls, Properties, និងសុក្រឹតភាពទិន្នន័យ។"
  },
  {
    "title": "បញ្ហាប្រឈមចុងក្រោយ៖ ទម្រង់ត្រួតពិនិត្យគុណភាពរហ័ស",
    "segment": "វគ្គទី ៧៖ ការវាយតម្លៃ និងត្រួតពិនិត្យ",
    "content": "<div class=\"card\">\n            <h3 class=\"card-title\">សេណារីយ៉ូកន្លែងការងារ និងលក្ខខណ្ឌតម្រូវ</h3>\n            <p style=\"font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1rem;\">\n              អ្នកត្រួតពិនិត្យគុណភាព បុប្ផា ត្រូវពិនិត្យគ្រឿងប្លាស្ទិកដែលផលិតចេញរៀងរាល់មួយម៉ោងម្តង។ គាត់ត្រូវការផ្ទាំងអេក្រង់រហ័សមួយលើឧបករណ៍ស្កេនបាកូដដើម្បីកត់ត្រាការជាប់ ឬធ្លាក់។\n            </p>\n\n            <div class=\"consequence-row\">\n              <span class=\"obj-num\">1</span>\n              <div>\n                <strong>កាលបរិច្ឆេទ និងឈ្មោះអ្នកត្រួតពិនិត្យ៖</strong>\n                <p>បង្ហាញកាលបរិច្ឆេទបច្ចុប្បន្ន និងឈ្មោះអ្នកត្រួតពិនិត្យនៅផ្នែកខាងលើសម្រាប់តែអានប៉ុណ្ណោះ។</p>\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"obj-num\">2</span>\n              <div>\n                <strong>លេខរន្ធពុម្ព (Mold Cavity)៖</strong>\n                <p>ជ្រើសរើសក្នុងចំណោមរន្ធពុម្ពរូបវន្ត ៤៖ <code>Cavity-A</code>, <code>Cavity-B</code>, <code>Cavity-C</code>, <code>Cavity-D</code>។</p>\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"obj-num\">3</span>\n              <div>\n                <strong>សេចក្តីសម្រេចគុណភាព (Verdict)៖</strong>\n                <p>ជម្រើស៖ <code>PASS</code>, <code>FAIL - Burr</code>, <code>FAIL - Bubble</code>, <code>FAIL - Warpage</code>។</p>\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"obj-num\">4</span>\n              <div>\n                <strong>កំណត់ចំណាំបញ្ហាខូចខាត៖</strong>\n                <p>ប្រអប់អត្ថបទសេរីសម្រាប់ពន្យល់ពីភាពធ្ងន់ធ្ងរនៃបញ្ហា ប្រសិនបើពិនិត្យឃើញធ្លាក់។</p>\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"obj-num\">5</span>\n              <div>\n                <strong>កត់ត្រាលទ្ធផលត្រួតពិនិត្យ៖</strong>\n                <p>ប៊ូតុងបញ្ជាដើម្បីរក្សាទុកលទ្ធផលចូលទៅក្នុងកំណត់ហេតុគុណភាព។</p>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"card\" style=\"border-color: var(--color-cyan); background: rgba(15, 23, 42, 0.9);\">\n            <h3 class=\"card-title\">លទ្ធផលបេសកកម្មដែលត្រូវប្រគល់</h3>\n            <p style=\"font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem;\">\n              នៅក្នុងសៀវភៅការងាររបស់អ្នក ចូរបង្កើតតារាងលក្ខណៈបច្ចេកទេស Control ទាំង ៥ ដែលរួមមាន៖\n            </p>\n\n            <ul style=\"font-size: 0.85rem; color: var(--text-muted); line-height: 1.8; margin-left: 1.2rem; margin-bottom: 1.25rem;\">\n              <li><strong>លេខរៀងលក្ខខណ្ឌ</strong> (១ ដល់ ៥)</li>\n              <li><strong>ប្រភេទ Control</strong> (Label, Dropdown, TextInput, Button)</li>\n              <li><strong>ឈ្មោះតាមស្តង់ដារ Hungarian</strong> (ឧ. <code>drpCavitySelect</code>)</li>\n              <li><strong>Property គន្លឹះដែលត្រូវកំណត់</strong> (<code>Text</code>, <code>Items</code>, <code>HintText</code>, <code>OnSelect</code>)</li>\n              <li><strong>តម្លៃរូបមន្ត ឬការកំណត់គំរូ</strong></li>\n            </ul>\n\n            <div style=\"padding: 0.85rem; background: rgba(6, 182, 212, 0.1); border-radius: 0.5rem; font-size: 0.82rem; color: #67e8f9;\">\n              ការវាយតម្លៃផ្អែកលើ៖ ភាពត្រឹមត្រូវនៃតួនាទី Control, ការគោរពស្តង់ដារឈ្មោះ, និងការការពារសុក្រឹតភាពទិន្នន័យ!\n            </div>\n          </div>",
    "subtitle": "រចនារចនាសម្ព័ន្ធ Controls ពេញលេញសម្រាប់ទម្រង់ត្រួតពិនិត្យគុណភាពប្រចាំម៉ោងរបស់បុប្ផា។"
  },
  {
    "title": "កម្រិតពិន្ទុវាយតម្លៃ និងដំណោះស្រាយស្ថាបត្យកម្មគំរូ",
    "segment": "វគ្គទី ៧៖ ការវាយតម្លៃ និងត្រួតពិនិត្យ",
    "content": "<div class=\"card\">\n            <h3 class=\"card-title\">កម្រិតពិន្ទុវាយតម្លៃទាំង ៤ កម្រិត</h3>\n            <div style=\"display: flex; flex-direction: column; gap: 0.65rem; font-size: 0.82rem;\">\n              <div style=\"background: rgba(30, 41, 59, 0.5); padding: 0.65rem; border-radius: 0.4rem; border-left: 3px solid var(--color-cyan);\">\n                <strong>៤ - ល្អឥតខ្ចោះ (Exemplary)៖</strong> ជ្រើសរើសតួនាទី Control ត្រឹមត្រូវ ១០០%; គោរពឈ្មោះ Hungarian ពេញលេញ; រូបមន្តតារាង Items ស្អាត; ពន្យល់ពីសុក្រឹតភាពទិន្នន័យបានច្បាស់។\n              </div>\n              <div style=\"background: rgba(30, 41, 59, 0.5); padding: 0.65rem; border-radius: 0.4rem; border-left: 3px solid var(--color-success);\">\n                <strong>៣ - កម្រិតជំនាញ (Proficient)៖</strong> ជ្រើសរើស Controls ត្រឹមត្រូវសម្រាប់ទាំង ៥ ចំណុច; ឈ្មោះមានបុព្វបទ Hungarian; កំណត់ Property សំខាន់ៗបានត្រឹមត្រូវ។\n              </div>\n              <div style=\"background: rgba(30, 41, 59, 0.5); padding: 0.65rem; border-radius: 0.4rem; border-left: 3px solid var(--color-warning);\">\n                <strong>២ - កំពុងអភិវឌ្ឍ (Developing)៖</strong> ប្រើ TextInput សម្រាប់ជម្រើសកំណត់; ទុកឈ្មោះលំនាំដើមដូចជា <code>Dropdown1</code>; ច្រឡំរវាង <code>Default</code> និង <code>HintText</code>។\n              </div>\n              <div style=\"background: rgba(30, 41, 59, 0.5); padding: 0.65rem; border-radius: 0.4rem; border-left: 3px solid var(--color-danger);\">\n                <strong>១ - កម្រិតដំបូង (Beginning)៖</strong> ប្រើ Label ដើម្បីប្រមូលទិន្នន័យ; មិនអាចពន្យល់ពីតួនាទីរបស់ <code>OnSelect</code> លើ Button បាន។\n              </div>\n            </div>\n          </div>\n\n          <div class=\"card\" style=\"border-color: rgba(16, 185, 129, 0.4); background: rgba(15, 23, 42, 0.9);\">\n            <h3 class=\"card-title\" style=\"color: #86efac;\">ដំណោះស្រាយស្ថាបត្យកម្មគំរូ</h3>\n            <table style=\"width: 100%; border-collapse: collapse; font-size: 0.82rem; color: var(--text-muted);\">\n              <thead>\n                <tr style=\"border-bottom: 1px solid var(--border-subtle); color: #86efac; text-align: left;\">\n                  <th style=\"padding: 0.4rem 0.2rem;\">ល.រ</th>\n                  <th style=\"padding: 0.4rem 0.2rem;\">Control</th>\n                  <th style=\"padding: 0.4rem 0.2rem;\">ឈ្មោះ</th>\n                  <th style=\"padding: 0.4rem 0.2rem;\">Property និង រូបមន្ត</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr style=\"border-bottom: 1px solid var(--border-subtle);\">\n                  <td style=\"padding: 0.4rem 0.2rem; color: #fff;\">1</td>\n                  <td style=\"padding: 0.4rem 0.2rem;\">Label</td>\n                  <td style=\"padding: 0.4rem 0.2rem; font-family: var(--font-code); color: var(--color-cyan);\">lblInspectionInfo</td>\n                  <td style=\"padding: 0.4rem 0.2rem; font-family: var(--font-code);\">Text: Now() &amp; \" - \" &amp; User().FullName</td>\n                </tr>\n                <tr style=\"border-bottom: 1px solid var(--border-subtle);\">\n                  <td style=\"padding: 0.4rem 0.2rem; color: #fff;\">2</td>\n                  <td style=\"padding: 0.4rem 0.2rem;\">Dropdown</td>\n                  <td style=\"padding: 0.4rem 0.2rem; font-family: var(--font-code); color: #60a5fa;\">drpCavitySelect</td>\n                  <td style=\"padding: 0.4rem 0.2rem; font-family: var(--font-code);\">Items: [\"Cavity-A\", \"Cavity-B\", \"Cavity-C\", \"Cavity-D\"]</td>\n                </tr>\n                <tr style=\"border-bottom: 1px solid var(--border-subtle);\">\n                  <td style=\"padding: 0.4rem 0.2rem; color: #fff;\">3</td>\n                  <td style=\"padding: 0.4rem 0.2rem;\">Dropdown</td>\n                  <td style=\"padding: 0.4rem 0.2rem; font-family: var(--font-code); color: #60a5fa;\">drpQualityVerdict</td>\n                  <td style=\"padding: 0.4rem 0.2rem; font-family: var(--font-code);\">Items: [\"PASS\", \"FAIL - Burr\", \"FAIL - Bubble\"]</td>\n                </tr>\n                <tr style=\"border-bottom: 1px solid var(--border-subtle);\">\n                  <td style=\"padding: 0.4rem 0.2rem; color: #fff;\">4</td>\n                  <td style=\"padding: 0.4rem 0.2rem;\">TextInput</td>\n                  <td style=\"padding: 0.4rem 0.2rem; font-family: var(--font-code); color: #a78bfa;\">txtDefectNotes</td>\n                  <td style=\"padding: 0.4rem 0.2rem; font-family: var(--font-code);\">HintText: \"Specify defect location or cause...\"</td>\n                </tr>\n                <tr>\n                  <td style=\"padding: 0.4rem 0.2rem; color: #fff;\">5</td>\n                  <td style=\"padding: 0.4rem 0.2rem;\">Button</td>\n                  <td style=\"padding: 0.4rem 0.2rem; font-family: var(--font-code); color: #34d399;\">btnLogInspection</td>\n                  <td style=\"padding: 0.4rem 0.2rem; font-family: var(--font-code);\">Text: \"LOG INSPECTION VERDICT\"</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>",
    "subtitle": "ផ្ទៀងផ្ទាត់ការរចនារបស់អ្នកធៀបនឹងកម្រិតពិន្ទុទាំង ៤ និងដំណោះស្រាយវិស្វកម្មគំរូ។"
  },
  {
    "title": "ការពិនិត្យឡើងវិញ ១៥ នាទី៖ កែលម្អទម្រង់ទទួលទំនិញក្នុងឃ្លាំង",
    "segment": "វគ្គទី ៨៖ ស្ពានតភ្ជាប់ និងកិច្ចការផ្ទះ",
    "content": "<div class=\"card\">\n            <h3 class=\"card-title\">ទម្រង់ទទួលទំនិញក្នុងឃ្លាំងដែលមានកំហុស</h3>\n            <p style=\"font-size: 0.88rem; color: var(--text-muted); margin-bottom: 0.85rem;\">\n              នេះជាបំណែកកូដពីទម្រង់ទទួលទំនិញនៅផែឃ្លាំងដែលមានបញ្ហា៖\n            </p>\n\n            <div class=\"consequence-row\">\n              <span class=\"consequence-badge\">កំហុស ១</span>\n              <div>\n                <strong>txtDeliveryDate៖</strong> ប្រអប់អត្ថបទសេរីដែលកម្មករវាយ <em>\"Oct 30 2026\"</em>។\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"consequence-badge\">កំហុស ២</span>\n              <div>\n                <strong>lblVendorName៖</strong> Label ដែលមានអក្សរ <em>\"Type Vendor Name Here\"</em>។\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"consequence-badge\">កំហុស ៣</span>\n              <div>\n                <strong>txtCondition៖</strong> ប្រអប់អត្ថបទសេរីដែលកម្មករវាយ <em>\"Good\"</em> ឬ <em>\"Damaged\"</em>។\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"consequence-badge\">កំហុស ៤</span>\n              <div>\n                <strong>imgSubmit៖</strong> រូបភាពឡានដឹកទំនិញពណ៌បៃតងដែលគ្មានរូបមន្ត <code>OnSelect</code> អ្វីសោះ។\n              </div>\n            </div>\n          </div>\n\n          <div class=\"card\">\n            <h3 class=\"card-title\">កិច្ចការផ្ទះ ១៥ នាទីរបស់អ្នក</h3>\n            <p style=\"font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1rem;\">\n              នៅក្នុងសៀវភៅកត់ត្រាផ្ទាល់ខ្លួន ចូរសរសេរកែសម្រួលធាតុទាំង ៤ នេះទៅជាតារាងស្អាតមួយ៖\n            </p>\n\n            <ol style=\"font-size: 0.85rem; color: var(--text-muted); line-height: 1.8; margin-left: 1.2rem; margin-bottom: 1.25rem;\">\n              <li>កំណត់ <strong>ប្រភេទ Control ត្រឹមត្រូវ</strong> សម្រាប់ធាតុនីមួយៗ។</li>\n              <li>ដាក់ <strong>ឈ្មោះតាមស្តង់ដារ Hungarian</strong>។</li>\n              <li>បញ្ជាក់ <strong>Property គោលដៅ</strong> ដែលត្រូវកំណត់។</li>\n              <li>សរសេរ <strong>ការពន្យល់អាជីវកម្ម ១ ឃ្លា</strong> ថាហេតុអ្វីបានជាការកែប្រែនេះការពារទិន្នន័យពីការបាត់បង់។</li>\n            </ol>\n\n            <div style=\"margin-top: auto; padding: 0.85rem; background: rgba(59, 130, 246, 0.1); border-radius: 0.5rem; font-size: 0.82rem; color: #93c5fd;\">\n              ពេលវេលាពិនិត្យ៖ ត្រឹមតែ ១៥ នាទីមុនពេលចាប់ផ្តើមថ្នាក់រៀនថ្ងៃទី ១៥ ស្អែកនេះ!\n            </div>\n          </div>",
    "subtitle": "អនុវត្តជំនាញវិស្វកម្ម Controls របស់អ្នកដើម្បីកែលម្អអេក្រង់ទទួលទំនិញក្នុងឃ្លាំងដែលមានកំហុស។"
  },
  {
    "title": "ផែនទីតភ្ជាប់កម្មវិធីសិក្សា៖ ថ្ងៃទី ១៤ &rarr; ថ្ងៃទី ១៥",
    "segment": "វគ្គទី ៨៖ ស្ពានតភ្ជាប់ និងកិច្ចការផ្ទះ",
    "content": "<div class=\"card\">\n            <span class=\"card-badge\">ម្សិលមិញ (ថ្ងៃទី ១៣)</span>\n            <h3 class=\"card-title\">ផ្ទាំង Studio និងរចនាសម្ព័ន្ធ</h3>\n            <p class=\"card-body\">\n              យើងបានយល់ដឹងពីបរិស្ថាន Power Apps Studio, ស្វែងយល់ពី Tree View, ការដាក់ឈ្មោះ Hungarian និងការរៀបចំប្លង់ទូទៅលើអេក្រង់។\n            </p>\n          </div>\n\n          <div class=\"card\" style=\"border-color: rgba(59, 130, 246, 0.4); background: rgba(30, 41, 59, 0.85);\">\n            <span class=\"card-badge\" style=\"background: rgba(59, 130, 246, 0.2); color: #93c5fd;\">ថ្ងៃនេះ (ថ្ងៃទី ១៤)</span>\n            <h3 class=\"card-title\">តួនាទី Controls និង Properties</h3>\n            <p class=\"card-body\">\n              យើងបានផ្តល់ជីវិតដល់ Controls៖ <strong>Labels</strong> បង្ហាញព័ត៌មាន, <strong>Inputs</strong> ប្រមូលអត្ថបទ, <strong>Dropdowns</strong> ធានាជម្រើសត្រឹមត្រូវ, និង <strong>Buttons</strong> បញ្ជាសកម្មភាព។\n            </p>\n          </div>\n\n          <div class=\"card\" style=\"border-color: var(--color-cyan); box-shadow: 0 0 20px rgba(6, 182, 212, 0.2);\">\n            <span class=\"card-badge\" style=\"background: rgba(6, 182, 212, 0.2); color: #67e8f9;\">ថ្ងៃស្អែក (ថ្ងៃទី ១៥)</span>\n            <h3 class=\"card-title\">ដំណើរអ្នកប្រើប្រាស់ពហុអេក្រង់</h3>\n            <p class=\"card-body\">\n              យើងនឹងតភ្ជាប់អេក្រង់ដែលនៅដាច់ពីគ្នាឱ្យក្លាយជាលំហូរការងារពេញលេញដោយប្រើ <code>Navigate(scrSuccess, ScreenTransition.Fade)</code> និង <code>Back()</code> ដើម្បីផ្តល់ការឆ្លើយតបដ៏រលូនដល់អ្នកប្រើ!\n            </p>\n          </div>",
    "subtitle": "ពី Controls ដាច់ៗដោយឡែក ឈានទៅកាន់ដំណើរការអ្នកប្រើប្រាស់ពហុអេក្រង់ដែលតភ្ជាប់គ្នា។"
  }
];

  // Cache English slide contents and metadata
  const ENGLISH_SLIDES = slides.map((slide, idx) => {
    const title = slide.getAttribute('data-title') || ('Slide ' + (idx + 1));
    const segment = slide.getAttribute('data-segment') || '';
    const subtitleEl = slide.querySelector('.slide-header .subtitle');
    const contentEl = slide.querySelector('.slide-content');
    return {
      title: title,
      segment: segment,
      subtitle: subtitleEl ? subtitleEl.textContent.trim() : '',
      content: contentEl ? contentEl.innerHTML : ''
    };
  });

  // --------------------------------------------------------------------------
  // 3. INTERACTIVE WIDGET DATA STORES
  // --------------------------------------------------------------------------

  // Widget 1: Control Role Inspector Data
  const INSPECTOR_DATA = {
    label: {
      roleEn: "Output Control",
      roleKh: "ឧបករណ៍បង្ហាញលទ្ធផល (Output)",
      roleClass: "pill-output",
      prefix: "lbl",
      titleEn: "Text Label • lblIncidentDate",
      titleKh: "Text Label • lblIncidentDate",
      descEn: "Displays system facts, status badges, or calculated text. Read-only by nature; cannot receive keyboard keystrokes.",
      descKh: "បង្ហាញការពិតរបស់ប្រព័ន្ធ ឬអត្ថបទគណនា។ ជាធម្មជាតិសម្រាប់តែអានប៉ុណ្ណោះ មិនអាចទទួលការវាយអក្សរបានទេ។",
      formula: 'lblIncidentDate.Text = "Date: " & Text(Today(), "dd-mmm-yyyy")',
      html: '<div style="background: rgba(15, 23, 42, 0.9); border: 1px solid #38bdf8; border-radius: 4px; padding: 0.75rem 1.25rem; color: #38bdf8; font-weight: 700; font-size: 1.05rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color:#06b6d4;">&bull;</span> Reported On: 30-Oct-2026</div>'
    },
    textinput: {
      roleEn: "Freeform Input Control",
      roleKh: "ការបញ្ចូលអក្សរសេរី (Input)",
      roleClass: "pill-input",
      prefix: "txt",
      titleEn: "Text Input • txtIncidentNotes",
      titleKh: "Text Input • txtIncidentNotes",
      descEn: "Collects unrestricted alphanumeric descriptions from user keyboard. Ideal for failure symptoms and qualitative remarks.",
      descKh: "ប្រមូលការពិពណ៌នាជាអក្សរ និងលេខដោយសេរីពីក្តារចុចរបស់អ្នកប្រើ។ ស័ក្តិសមបំផុតសម្រាប់ការកត់ត្រារោគសញ្ញាខូចខាត។",
      formula: 'txtIncidentNotes.HintText = "Describe unusual sound, smell, or leak..."',
      html: '<input type="text" class="sample-input-control" placeholder="Describe unusual sound, smell, or leak..." style="width: 380px;">'
    },
    dropdown: {
      roleEn: "Controlled Choice Control",
      roleKh: "ការជ្រើសរើសច្បាស់លាស់ (Choice)",
      roleClass: "pill-input",
      prefix: "drp",
      titleEn: "Drop Down • drpMachineSelect",
      titleKh: "Drop Down • drpMachineSelect",
      descEn: "Restricts input to verified assets registered in plant database. Guarantees data integrity by eliminating spelling errors.",
      descKh: "កំណត់កំហិតការបញ្ចូលត្រឹមម៉ាស៊ីនដែលបានចុះបញ្ជីក្នុងរោងចក្រ។ ធានាសុក្រឹតភាពទិន្នន័យដោយលុបបំបាត់ការសរសេរខុស។",
      formula: 'drpMachineSelect.Items = ["Press-01", "Press-02", "Press-03", "Extruder-01"]',
      html: '<select class="sample-input-control" style="width: 380px; cursor: pointer;"><option>Press-01 (Injection Molding #1)</option><option>Press-02 (Injection Molding #2)</option><option>Press-03 (Injection Molding #3)</option><option>Extruder-01 (High-Output Line)</option></select>'
    },
    button: {
      roleEn: "Action Trigger Control",
      roleKh: "គន្លឹះបញ្ជាសកម្មភាព (Action)",
      roleClass: "pill-action",
      prefix: "btn",
      titleEn: "Button • btnSubmitTicket",
      titleKh: "Button • btnSubmitTicket",
      descEn: "Mechanical electrical trigger. Evaluates OnSelect action formula: validates fields, writes to database, and triggers notifications.",
      descKh: "គន្លឹះមេកានិកអគ្គិសនី។ ដំណើរការរូបមន្តក្នុង OnSelect៖ ផ្ទៀងផ្ទាត់ទិន្នន័យ រក្សាទុកក្នុង Database និងផ្ញើសារជូនដំណឹង។",
      formula: 'btnSubmitTicket.OnSelect = SubmitForm(frmIncident); Notify("Saved!", NotificationType.Success)',
      html: '<button class="sample-button-control" style="width: 380px;" onclick="alert(document.body.classList.contains(\'khmer-mode\') ? \'បានបញ្ជូនប័ណ្ណជួសជុលជោគជ័យ! (OnSelect Action Executed)\' : \'Ticket Submitted Successfully! (OnSelect Action Executed)\')">SUBMIT MAINTENANCE TICKET</button>'
    }
  };

  // Widget 4: Knowledge Check Quiz Questions
  const QUIZ_QUESTIONS = [
    {
      questionEn: "Why should Machine ID in our incident report be a Dropdown instead of a Text Input?",
      questionKh: "ហេតុអ្វីបានជាឈ្មោះម៉ាស៊ីនក្នុងទម្រង់រាយការណ៍គួរតែជា Dropdown ជាជាង Text Input?",
      optionsEn: [
        "Because Dropdowns have prettier border colors than Text Inputs.",
        "To enforce data integrity and prevent spelling errors from crashing database queries.",
        "Because Text Inputs are forbidden on mobile tablet devices.",
        "To allow operators to type any imaginary machine code they want."
      ],
      optionsKh: [
        "ពីព្រោះ Dropdown មានពណ៌ស៊ុមស្អាតជាង Text Input។",
        "ដើម្បីធានាសុក្រឹតភាពទិន្នន័យ និងការពារកុំឱ្យការសរសេរខុសធ្វើឱ្យគាំងការស្វែងរកក្នុង Database។",
        "ពីព្រោះ Text Input ត្រូវបានហាមឃាត់មិនឱ្យប្រើលើឧបករណ៍ Tablet។",
        "ដើម្បីអនុញ្ញាតឱ្យកម្មករវាយកូដម៉ាស៊ីនតាមការស្រមើស្រមៃរបស់ពួកគេ។"
      ],
      correctIndex: 1,
      explanationEn: "Correct! A Dropdown enforces exact foreign keys registered in the database, preventing typos like 'P-01' vs 'press 1'.",
      explanationKh: "ត្រឹមត្រូវ! Dropdown បង្ខំឱ្យជ្រើសរើសឈ្មោះម៉ាស៊ីនផ្លូវការដែលបានចុះបញ្ជី ការពារការវាយខុសអក្ខរាវិរុទ្ធដែលនាំឱ្យខូចទិន្នន័យ។"
    },
    {
      questionEn: "What happens if a developer creates a Button, changes text to 'SUBMIT', but leaves OnSelect empty?",
      questionKh: "តើមានអ្វីកើតឡើង ប្រសិនបើអ្នកបង្កើត App ដាក់ប៊ូតុងមួយ ដូរឈ្មោះជា 'SUBMIT' តែទុក OnSelect ឱ្យនៅទទេ?",
      optionsEn: [
        "Power Apps automatically guesses where to save the data.",
        "The computer displays a blue screen of death crash error.",
        "The button provides visual click feedback, but zero data is saved and no action occurs.",
        "The tablet automatically prints a paper receipt."
      ],
      optionsKh: [
        "Power Apps នឹងស្មានដោយស្វ័យប្រវត្តិកន្លែងដែលត្រូវរក្សាទុកទិន្នន័យ។",
        "កុំព្យូទ័រនឹងលោតអេក្រង់ពណ៌ខៀវធ្លាក់កូដគាំងម៉ាស៊ីន។",
        "ប៊ូតុងនឹងស្រុតចុះពេលចុច ប៉ុន្តែគ្មានទិន្នន័យណាមួយត្រូវបានរក្សាទុក ហើយគ្មានសកម្មភាពអ្វីកើតឡើងឡើយ។",
        "ឧបករណ៍ Tablet នឹងបញ្ជាព្រីនក្រដាសវិក្កយបត្រចេញមកដោយស្វ័យប្រវត្តិ។"
      ],
      correctIndex: 2,
      explanationEn: "Correct! A Button is just an unpowered plastic switch until you assign code to its OnSelect property.",
      explanationKh: "ត្រឹមត្រូវ! ប៊ូតុងប្រៀបដូចជាកុងតាក់គ្មានខ្សែភ្លើង។ វាមិនដំណើរការអ្វីឡើយរហូតទាល់តែអ្នកសរសេរកូដក្នុង OnSelect។"
    },
    {
      questionEn: "Which control type should be used to display an incident's auto-generated Ticket ID at the top of the screen?",
      questionKh: "តើប្រភេទ Control មួយណាដែលគួរប្រើសម្រាប់បង្ហាញលេខប័ណ្ណស្វ័យប្រវត្តិ (Ticket ID) នៅផ្នែកខាងលើអេក្រង់?",
      optionsEn: [
        "Label (lbl) — because Ticket ID is read-only information generated by the system.",
        "TextInput (txt) — so the operator can re-type the ticket number manually.",
        "Dropdown (drp) — so the operator can choose which ticket number they prefer.",
        "Button (btn) — so the operator must click to reveal the number."
      ],
      optionsKh: [
        "Label (lbl) — ពីព្រោះលេខប័ណ្ណជាព័ត៌មានសម្រាប់តែអានដែលបង្កើតដោយប្រព័ន្ធ។",
        "TextInput (txt) — ដើម្បីឱ្យកម្មករអាចវាយលេខប័ណ្ណឡើងវិញដោយដៃ។",
        "Dropdown (drp) — ដើម្បីឱ្យកម្មករអាចរើសលេខប័ណ្ណណាមួយដែលពួកគេពេញចិត្ត។",
        "Button (btn) — ដើម្បីឱ្យកម្មករត្រូវតែចុចទើបឃើញលេខប័ណ្ណ។"
      ],
      optionsKh: [
        "Label (lbl) — ពីព្រោះលេខប័ណ្ណជាព័ត៌មានសម្រាប់តែអានដែលបង្កើតដោយប្រព័ន្ធ។",
        "TextInput (txt) — ដើម្បីឱ្យកម្មករអាចវាយលេខប័ណ្ណឡើងវិញដោយដៃ។",
        "Dropdown (drp) — ដើម្បីឱ្យកម្មករអាចរើសលេខប័ណ្ណណាមួយដែលពួកគេពេញចិត្ត។",
        "Button (btn) — ដើម្បីឱ្យកម្មករត្រូវតែចុចទើបឃើញលេខប័ណ្ណ។"
      ],
      correctIndex: 0,
      explanationEn: "Correct! Read-only identifiers and computed facts always belong inside an Output control: the Text Label.",
      explanationKh: "ត្រឹមត្រូវ! លេខកូដសម្គាល់សម្រាប់តែអាន និងតម្លៃដែលគណនាដោយប្រព័ន្ធ ត្រូវតែស្ថិតនៅក្នុង Output Control គឺ Text Label។"
    },
    {
      questionEn: "What is the critical behavioral difference between a TextInput's Default property and HintText property?",
      questionKh: "តើអ្វីជាភាពខុសគ្នាសំខាន់បំផុតរវាង Property 'Default' និង 'HintText' លើ TextInput?",
      optionsEn: [
        "Default is for font size, while HintText is for text color.",
        "Default is real data that saves if untouched; HintText is a ghost guide that disappears upon typing and is never saved.",
        "HintText saves to SharePoint, while Default gets deleted automatically.",
        "There is no difference; they are duplicate synonyms in Power Apps."
      ],
      optionsKh: [
        "Default សម្រាប់កំណត់ទំហំអក្សរ រីឯ HintText សម្រាប់កំណត់ពណ៌អក្សរ។",
        "Default ជាទិន្នន័យពិតដែលនឹងរក្សាទុកបើមិនកែប្រែ; HintText ជាអក្សរស្រមោលណែនាំដែលនឹងរលាយបាត់ពេលវាយអក្សរ ហើយមិនត្រូវបានរក្សាទុកឡើយ។",
        "HintText នឹងរក្សាទុកក្នុង SharePoint រីឯ Default នឹងត្រូវលុបចោលដោយស្វ័យប្រវត្តិ។",
        "គ្មានភាពខុសគ្នាទេ ពួកវាជាពាក្យមានន័យដូចគ្នាក្នុង Power Apps។"
      ],
      correctIndex: 1,
      explanationEn: "Correct! Never put instructional placeholder text into Default, otherwise workers will save the instruction as real database data!",
      explanationKh: "ត្រឹមត្រូវ! កុំច្រឡំដាក់ពាក្យណែនាំក្នុង Default ឱ្យសោះ បើពុំនោះទេពាក្យណែនាំនោះនឹងត្រូវរក្សាទុកជាទិន្នន័យពិតក្នុង Database!"
    },
    {
      questionEn: "If you set a Button's DisplayMode property to DisplayMode.Disabled, how does the app react?",
      questionKh: "ប្រសិនបើអ្នកកំណត់ Property DisplayMode របស់ Button ទៅជា DisplayMode.Disabled តើ App នឹងមានប្រតិកម្មយ៉ាងណា?",
      optionsEn: [
        "The button deletes itself permanently from the Tree View.",
        "The button turns red and plays a loud buzzer sound.",
        "The button renders in muted gray and completely ignores mouse clicks or finger taps.",
        "The button automatically switches to a dropdown menu."
      ],
      optionsKh: [
        "ប៊ូតុងនឹងលុបខ្លួនឯងចោលជារៀងរហូតពីផ្ទាំង Tree View។",
        "ប៊ូតុងនឹងប្រែពណ៌ក្រហម ហើយបន្លឺសំឡេងរោទ៍យ៉ាងខ្លាំង។",
        "ប៊ូតុងនឹងប្រែពណ៌ប្រផេះស្រាល ហើយមិនឆ្លើយតបនឹងការចុចកណ្តុរ ឬការប៉ះម្រាមដៃឡើយ។",
        "ប៊ូតុងនឹងប្តូរខ្លួនឯងទៅជាបញ្ជី Dropdown ដោយស្វ័យប្រវត្តិ។"
      ],
      correctIndex: 2,
      explanationEn: "Correct! DisplayMode.Disabled provides intuitive visual feedback that required form inputs are still incomplete.",
      explanationKh: "ត្រឹមត្រូវ! DisplayMode.Disabled ផ្តល់សញ្ញាដែលមើលឃើញយ៉ាងច្បាស់ថា លក្ខខណ្ឌទិន្នន័យចាំបាច់មិនទាន់បានបំពេញគ្រប់គ្រាន់ឡើយ។"
    }
  ];

  let currentQuizIndex = 0;
  let quizScore = 0;
  let quizAnswered = new Array(QUIZ_QUESTIONS.length).fill(null);

  // --------------------------------------------------------------------------
  // 4. PRESENTATION NAVIGATION & SLIDE ACTIVATION
  // --------------------------------------------------------------------------
  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;

    slides[currentSlideIndex].classList.remove('active');
    currentSlideIndex = index;
    slides[currentSlideIndex].classList.add('active');

    updateHud();
    updateNotesDrawer();
    updateOverviewActiveState();
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

  function updateHud() {
    const counterEl = document.getElementById('slide-counter');
    const progressFill = document.getElementById('progress-bar');

    if (counterEl) {
      counterEl.textContent = isKhmerActive
        ? ('ស្លាយទី ' + (currentSlideIndex + 1) + ' / ' + totalSlides)
        : ('Slide ' + (currentSlideIndex + 1) + ' / ' + totalSlides);
    }

    if (progressFill) {
      const pct = ((currentSlideIndex + 1) / totalSlides) * 100;
      progressFill.style.width = pct + '%';
    }
  }

  // --------------------------------------------------------------------------
  // 5. BILINGUAL LANGUAGE ENGINE (ENGLISH / KHMER)
  // --------------------------------------------------------------------------
  function toggleLanguage() {
    try { localStorage.setItem('powerapps_presentation_lang', !isKhmerActive ? 'km' : 'en'); } catch(e){}
    isKhmerActive = !isKhmerActive;
    document.body.classList.toggle('khmer-mode', isKhmerActive);

    const langBtn = document.getElementById('btn-lang');
    const langLabel = document.getElementById('lang-label');
    if (langLabel) {
      langLabel.textContent = isKhmerActive ? 'EN' : 'KH';
    }
    if (langBtn) {
      langBtn.title = isKhmerActive ? 'Switch to English (L)' : 'ប្តូរទៅភាសាខ្មែរ (L)';
    }

    // Swap slide contents
    slides.forEach((slide, idx) => {
      const contentEl = slide.querySelector('.slide-content');
      const headerTitle = slide.querySelector('.slide-header h2');
      const headerSubtitle = slide.querySelector('.slide-header .subtitle');
      const headerTag = slide.querySelector('.slide-header .section-tag');

      if (isKhmerActive && KHMER_SLIDES[idx]) {
        if (contentEl) contentEl.innerHTML = KHMER_SLIDES[idx].content;
        if (headerTitle) headerTitle.textContent = KHMER_SLIDES[idx].title;
        if (headerTag) headerTag.textContent = KHMER_SLIDES[idx].segment;
        if (headerSubtitle) headerSubtitle.textContent = KHMER_SLIDES[idx].subtitle || '';
      } else if (ENGLISH_SLIDES[idx]) {
        if (contentEl) contentEl.innerHTML = ENGLISH_SLIDES[idx].content;
        if (headerTitle) headerTitle.textContent = ENGLISH_SLIDES[idx].title;
        if (headerTag) headerTag.textContent = ENGLISH_SLIDES[idx].segment;
        if (headerSubtitle) headerSubtitle.textContent = ENGLISH_SLIDES[idx].subtitle || '';
      }
    });

    // Re-initialize active widgets on swapped DOM
    initWidget1();
    initWidget2();
    initWidget3();
    renderQuizQuestion(currentQuizIndex);
    updateHud();
    updateNotesDrawer();
    populateOverviewGrid();
  }

  // --------------------------------------------------------------------------
  // 6. TIMER ENGINE (90 MINUTES)
  // --------------------------------------------------------------------------
  function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timer-display');
    if (!timerDisplay) return;

    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    const formatted = String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
    timerDisplay.textContent = formatted;

    if (remainingSeconds <= 300 && remainingSeconds > 0) {
      timerDisplay.style.color = '#f59e0b';
    } else if (remainingSeconds === 0) {
      timerDisplay.style.color = '#ef4444';
    } else {
      timerDisplay.style.color = 'inherit';
    }
  }

  function toggleTimer() {
    if (isTimerRunning) {
      clearInterval(timerInterval);
      isTimerRunning = false;
    } else {
      if (remainingSeconds <= 0) remainingSeconds = TOTAL_TIMER_SECONDS;
      isTimerRunning = true;
      timerInterval = setInterval(() => {
        if (remainingSeconds > 0) {
          remainingSeconds--;
          updateTimerDisplay();
        } else {
          clearInterval(timerInterval);
          isTimerRunning = false;
          alert(isKhmerActive ? 'ពេលវេលាសិក្សា ៩០ នាទីបានបញ្ចប់!' : '90-minute training session completed!');
        }
      }, 1000);
    }
  }

  // --------------------------------------------------------------------------
  // 7. TRAINER NOTES DRAWER (HOTKEY: N)
  // --------------------------------------------------------------------------
  function toggleNotesDrawer() {
    isNotesOpen = !isNotesOpen;
    const drawer = document.getElementById('notes-drawer');
    const btn = document.getElementById('btn-notes');
    if (drawer) drawer.classList.toggle('open', isNotesOpen);
    if (btn) btn.classList.toggle('active', isNotesOpen);
    if (isNotesOpen) updateNotesDrawer();
  }

  function updateNotesDrawer() {
    const titleEl = document.getElementById('notes-slide-title');
    const contentEl = document.getElementById('notes-body-content');
    if (!contentEl) return;

    const activeSlide = slides[currentSlideIndex];
    if (titleEl) {
      const title = activeSlide.getAttribute('data-title') || ('Slide ' + (currentSlideIndex + 1));
      titleEl.textContent = title;
    }

    const notesAside = activeSlide.querySelector('aside.trainer-notes');
    if (notesAside) {
      contentEl.innerHTML = notesAside.innerHTML;
    } else {
      contentEl.innerHTML = '<p><em>No presenter notes recorded for Slide ' + (currentSlideIndex + 1) + '.</em></p>';
    }
  }

  // --------------------------------------------------------------------------
  // 8. SLIDE GRID OVERVIEW MODAL (HOTKEY: O)
  // --------------------------------------------------------------------------
  function toggleOverviewModal() {
    isOverviewOpen = !isOverviewOpen;
    const modal = document.getElementById('overview-modal');
    const btn = document.getElementById('btn-overview');
    if (modal) modal.classList.toggle('open', isOverviewOpen);
    if (btn) btn.classList.toggle('active', isOverviewOpen);
    if (isOverviewOpen) populateOverviewGrid();
  }

  function populateOverviewGrid() {
    const gridContainer = document.getElementById('overview-grid-container');
    if (!gridContainer) return;
    gridContainer.innerHTML = '';

    slides.forEach((slide, idx) => {
      const card = document.createElement('div');
      card.className = 'overview-card' + (idx === currentSlideIndex ? ' active' : '');

      const titleEn = slide.getAttribute('data-title') || ('Slide ' + (idx + 1));
      const titleKh = KHMER_SLIDES[idx] ? KHMER_SLIDES[idx].title : titleEn;

      card.innerHTML = 
        '<span class="overview-card-num">' + (isKhmerActive ? 'ស្លាយ ' : 'Slide ') + (idx + 1) + '</span>' +
        '<div class="overview-card-title">' + (isKhmerActive ? titleKh : titleEn) + '</div>';

      card.addEventListener('click', () => {
        goToSlide(idx);
        toggleOverviewModal();
      });

      gridContainer.appendChild(card);
    });
  }

  function updateOverviewActiveState() {
    const cards = document.querySelectorAll('.overview-card');
    cards.forEach((card, idx) => {
      card.classList.toggle('active', idx === currentSlideIndex);
    });
  }

  // --------------------------------------------------------------------------
  // 9. PRESENTER LASER POINTER & SPOTLIGHT
  // --------------------------------------------------------------------------
  function initPointerAndSpotlight() {
    const laserDot = document.getElementById('presenter-laser');
    const rippleEl = document.getElementById('pointer-ripple');

    window.addEventListener('mousemove', (e) => {
      document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
      document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');

      if (isLaserActive && laserDot) {
        laserDot.style.left = e.clientX + 'px';
        laserDot.style.top = e.clientY + 'px';
      }
    });

    window.addEventListener('click', (e) => {
      if (isLaserActive && rippleEl) {
        rippleEl.style.left = e.clientX + 'px';
        rippleEl.style.top = e.clientY + 'px';
        rippleEl.classList.remove('rippling');
        void rippleEl.offsetWidth; // Trigger reflow
        rippleEl.classList.add('rippling');
      }
    });
  }

  function toggleLaser() {
    isLaserActive = !isLaserActive;
    const laserDot = document.getElementById('presenter-laser');
    const btn = document.getElementById('btn-laser');
    if (laserDot) laserDot.classList.toggle('active', isLaserActive);
    if (btn) btn.classList.toggle('active', isLaserActive);
  }

  // --------------------------------------------------------------------------
  // 10. INTERACTIVE WIDGET 1: CONTROL ROLE INSPECTOR
  // --------------------------------------------------------------------------
  function initWidget1() {
    const tabs = document.querySelectorAll('.inspector-tab');
    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const key = tab.getAttribute('data-control-key') || 'label';
        const data = INSPECTOR_DATA[key];
        if (!data) return;

        const badgeEl = document.getElementById('inspector-role-badge');
        const tagEl = document.getElementById('inspector-hungarian-tag');
        const titleEl = document.getElementById('inspector-control-title');
        const descEl = document.getElementById('inspector-control-desc');
        const mountEl = document.getElementById('inspector-live-mount');
        const formulaEl = document.getElementById('inspector-formula-code');

        if (badgeEl) {
          badgeEl.className = 'role-badge-pill ' + data.roleClass;
          badgeEl.textContent = isKhmerActive ? data.roleKh : data.roleEn;
        }
        if (tagEl) tagEl.textContent = 'Prefix: ' + data.prefix;
        if (titleEl) titleEl.textContent = isKhmerActive ? data.titleKh : data.titleEn;
        if (descEl) descEl.textContent = isKhmerActive ? data.descKh : data.descEn;
        if (mountEl) mountEl.innerHTML = data.html;
        if (formulaEl) formulaEl.textContent = data.formula;
      });
    });

    // Initialize default tab
    const firstTab = document.querySelector('.inspector-tab.active') || tabs[0];
    if (firstTab) firstTab.click();
  }

  // --------------------------------------------------------------------------
  // 11. INTERACTIVE WIDGET 2: CONTROL ROLE DISASTER SIMULATOR
  // --------------------------------------------------------------------------
  function initWidget2() {
    const btnBad = document.getElementById('btn-sim-test-bad');
    const btnGood = document.getElementById('btn-sim-test-good');
    const inputBad = document.getElementById('sim-bad-input');
    const selectGood = document.getElementById('sim-good-select');
    const logBad = document.getElementById('sim-bad-log');
    const logGood = document.getElementById('sim-good-log');

    if (btnBad && inputBad && logBad) {
      btnBad.onclick = () => {
        const val = inputBad.value.trim() || 'empty';
        const timeStr = new Date().toTimeString().split(' ')[0].substring(0, 5);
        const entry = document.createElement('div');
        entry.className = 'log-entry-bad';
        entry.textContent = '[' + timeStr + '] ' + (isKhmerActive 
          ? ('អ្នកប្រើវាយ "' + val + '" -> បរាជ័យក្នុងការស្វែងរកក្នុង DB (កូដមិនត្រូវគ្នា!)')
          : ('User typed "' + val + '" -> DB Lookup Failed (Invalid foreign key format!)'));
        logBad.prepend(entry);
      };
    }

    if (btnGood && selectGood && logGood) {
      btnGood.onclick = () => {
        const val = selectGood.value;
        const timeStr = new Date().toTimeString().split(' ')[0].substring(0, 5);
        const entry = document.createElement('div');
        entry.className = 'log-entry-good';
        entry.textContent = '[' + timeStr + '] ' + (isKhmerActive 
          ? ('ជ្រើសរើស "' + val + '" -> ផ្ទៀងផ្ទាត់ជោគជ័យ (រក្សាទុកទិន្នន័យត្រឹមត្រូវ ១០០%)')
          : ('Selected "' + val + '" -> Matched verified plant asset (Clean record saved)'));
        logGood.prepend(entry);
      };
    }
  }

  // --------------------------------------------------------------------------
  // 12. INTERACTIVE WIDGET 3: LIVE CONTROL PROPERTY LAB
  // --------------------------------------------------------------------------
  function initWidget3() {
    const hintInput = document.getElementById('lab-hint-input');
    const itemsSelect = document.getElementById('lab-items-select');
    const displayModeSelect = document.getElementById('lab-display-mode');

    const previewDropdown = document.getElementById('lab-preview-dropdown');
    const previewTextInput = document.getElementById('lab-preview-textinput');
    const previewButton = document.getElementById('lab-preview-button');

    if (hintInput && previewTextInput) {
      hintInput.oninput = () => {
        previewTextInput.placeholder = hintInput.value;
      };
    }

    if (itemsSelect && previewDropdown) {
      itemsSelect.onchange = () => {
        previewDropdown.innerHTML = '';
        let options = [];
        if (itemsSelect.value === 'standard') {
          options = isKhmerActive 
            ? ['ទាប (Low)', 'មធ្យម (Medium)', 'ខ្ពស់ (High)', 'បន្ទាន់បំផុត (Critical)']
            : ['Low', 'Medium', 'High', 'Critical'];
        } else if (itemsSelect.value === 'shift') {
          options = isKhmerActive 
            ? ['វេន ព្រឹក (Shift A)', 'វេន រសៀល (Shift B)', 'វេន យប់ (Shift C)']
            : ['Shift A (Morning)', 'Shift B (Afternoon)', 'Shift C (Night)'];
        } else {
          options = isKhmerActive 
            ? ['ផ្នែក ចាក់ពុម្ព (Molding)', 'ផ្នែក ជាងពុម្ព (Tooling)', 'ផ្នែក វេចខ្ចប់ (Packaging)']
            : ['Molding Dept', 'Tooling Dept', 'Packaging Dept'];
        }
        options.forEach(opt => {
          const optEl = document.createElement('option');
          optEl.textContent = opt;
          previewDropdown.appendChild(optEl);
        });
      };
    }

    if (displayModeSelect && previewButton) {
      displayModeSelect.onchange = () => {
        if (displayModeSelect.value === 'Disabled') {
          previewButton.disabled = true;
          previewButton.style.opacity = '0.45';
          previewButton.style.cursor = 'not-allowed';
          previewButton.style.background = '#64748b';
        } else {
          previewButton.disabled = false;
          previewButton.style.opacity = '1';
          previewButton.style.cursor = 'pointer';
          previewButton.style.background = '#0078d4';
        }
      };
    }

    if (previewButton) {
      previewButton.onclick = () => {
        if (!previewButton.disabled) {
          alert(isKhmerActive 
            ? 'ប៊ូតុងសកម្ម៖ បានបញ្ជូនប័ណ្ណជួសជុលជោគជ័យ! (DisplayMode.Edit)' 
            : 'Active Button: Incident ticket submitted successfully! (DisplayMode.Edit)');
        }
      };
    }
  }

  // --------------------------------------------------------------------------
  // 13. INTERACTIVE WIDGET 4: KNOWLEDGE CHECK QUIZ
  // --------------------------------------------------------------------------
  function renderQuizQuestion(qIdx) {
    const qData = QUIZ_QUESTIONS[qIdx];
    if (!qData) return;

    const badgeEl = document.getElementById('quiz-question-badge');
    const scoreEl = document.getElementById('quiz-score-badge');
    const titleEl = document.getElementById('quiz-question-title');
    const optionsContainer = document.getElementById('quiz-options-container');
    const feedbackBox = document.getElementById('quiz-feedback-box');
    const btnNext = document.getElementById('btn-quiz-next');
    const btnPrev = document.getElementById('btn-quiz-prev');

    if (badgeEl) {
      badgeEl.textContent = isKhmerActive 
        ? ('សំណួរទី ' + (qIdx + 1) + ' នៃ ' + QUIZ_QUESTIONS.length)
        : ('Question ' + (qIdx + 1) + ' of ' + QUIZ_QUESTIONS.length);
    }

    if (scoreEl) {
      scoreEl.textContent = (isKhmerActive ? 'ពិន្ទុ៖ ' : 'Score: ') + quizScore + '/' + QUIZ_QUESTIONS.length;
    }

    if (titleEl) {
      titleEl.textContent = isKhmerActive ? qData.questionKh : qData.questionEn;
    }

    if (feedbackBox) {
      feedbackBox.className = 'quiz-feedback';
      feedbackBox.innerHTML = '';
    }

    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      const opts = isKhmerActive ? qData.optionsKh : qData.optionsEn;

      opts.forEach((optText, optIdx) => {
        const optBtn = document.createElement('button');
        optBtn.className = 'quiz-option-btn';
        optBtn.innerHTML = '<span style="font-weight:700; color:var(--color-cyan);">' + String.fromCharCode(65 + optIdx) + '.</span> ' + optText;

        // Check if already answered
        if (quizAnswered[qIdx] !== null) {
          optBtn.disabled = true;
          if (optIdx === qData.correctIndex) {
            optBtn.classList.add('correct');
          } else if (optIdx === quizAnswered[qIdx]) {
            optBtn.classList.add('wrong');
          }
        } else {
          optBtn.onclick = () => {
            handleQuizAnswer(qIdx, optIdx);
          };
        }

        optionsContainer.appendChild(optBtn);
      });
    }

    // Show feedback if already answered
    if (quizAnswered[qIdx] !== null && feedbackBox) {
      const isCorrect = (quizAnswered[qIdx] === qData.correctIndex);
      feedbackBox.className = 'quiz-feedback visible';
      feedbackBox.style.background = isCorrect ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)';
      feedbackBox.style.border = '1px solid ' + (isCorrect ? 'var(--color-success)' : 'var(--color-danger)');
      feedbackBox.style.color = isCorrect ? '#86efac' : '#fca5a5';
      feedbackBox.innerHTML = '<strong>' + (isCorrect ? (isKhmerActive ? 'ត្រឹមត្រូវ!' : 'Correct!') : (isKhmerActive ? 'មិនទាន់ត្រឹមត្រូវ!' : 'Incorrect.')) + '</strong> ' + (isKhmerActive ? qData.explanationKh : qData.explanationEn);
    }

    if (btnPrev) {
      btnPrev.style.visibility = qIdx > 0 ? 'visible' : 'hidden';
      btnPrev.onclick = () => {
        if (currentQuizIndex > 0) {
          currentQuizIndex--;
          renderQuizQuestion(currentQuizIndex);
        }
      };
    }

    if (btnNext) {
      btnNext.style.display = (quizAnswered[qIdx] !== null && qIdx < QUIZ_QUESTIONS.length - 1) ? 'inline-block' : 'none';
      btnNext.onclick = () => {
        if (currentQuizIndex < QUIZ_QUESTIONS.length - 1) {
          currentQuizIndex++;
          renderQuizQuestion(currentQuizIndex);
        }
      };
    }
  }

  function handleQuizAnswer(qIdx, selectedIdx) {
    const qData = QUIZ_QUESTIONS[qIdx];
    quizAnswered[qIdx] = selectedIdx;

    if (selectedIdx === qData.correctIndex) {
      quizScore++;
    }

    renderQuizQuestion(qIdx);
  }

  // --------------------------------------------------------------------------
  // 14. KEYBOARD SHORTCUTS
  // --------------------------------------------------------------------------
  function initKeyboardControls() {
    window.addEventListener('keydown', (e) => {
      // Ignore if user is typing in an input
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
          toggleNotesDrawer();
          break;
        case 'o':
        case 'O':
          toggleOverviewModal();
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
          if (isOverviewOpen) toggleOverviewModal();
          if (isNotesOpen) toggleNotesDrawer();
          break;
      }
    });
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }

  // --------------------------------------------------------------------------
  // 15. BOOTSTRAP WHEN DOM READY
  // --------------------------------------------------------------------------
  function initPresentation() {
    // HUD Button bindings
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
    if (btnNotes) btnNotes.onclick = toggleNotesDrawer;
    if (btnOverview) btnOverview.onclick = toggleOverviewModal;
    if (btnTimer) btnTimer.onclick = toggleTimer;
    if (btnFullscreen) btnFullscreen.onclick = toggleFullscreen;
    if (notesCloseBtn) notesCloseBtn.onclick = toggleNotesDrawer;
    if (overviewCloseBtn) overviewCloseBtn.onclick = toggleOverviewModal;

    initPointerAndSpotlight();
    initKeyboardControls();
    initWidget1();
    initWidget2();
    initWidget3();
    renderQuizQuestion(0);
    updateHud();
    updateTimerDisplay();

    // Set laser active by default
    const laserDot = document.getElementById('presenter-laser');
    if (laserDot) laserDot.classList.add('active');
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
