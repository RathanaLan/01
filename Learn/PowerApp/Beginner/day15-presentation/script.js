/* ============================================================================
   POWER APPS FOUNDATION: DAY 15 PRESENTATION ENGINE
   Topic: Navigation: Connect Screens into a Flow
   Theme: Microsoft Fluent 2 Dark Mode (Industrial Neon / Precision Glass)
   Bilingual: English + Khmer (100% Exact 1-to-1 DOM Mirroring + Anti-Clipping)
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
  // 2. KHMER SLIDES DATA STORE (100% Exact DOM Mirroring & Subtitles)
  // --------------------------------------------------------------------------
  const KHMER_SLIDES = [
  {
    "title": "ថ្ងៃទី ១៥៖ ការប្តូរអេក្រង់ (Navigation) ៖ តភ្ជាប់អេក្រង់ទាំងអស់ឱ្យក្លាយជាលំហូរការងារ",
    "segment": "វគ្គទី ៥៖ ការអនុវត្តជាក់ស្តែងក្នុង Canvas Studio",
    "subtitle": "",
    "content": "<div class=\"hero-badge\">\n            <span>គ្រឹះវិជ្ជាជីវៈ Microsoft Power Apps</span>\n            <span>&bull;</span>\n            <span>ថ្ងៃទី ១៥ នៃ ២៧</span>\n          </div>\n          <h1 class=\"hero-title\">ការប្តូរអេក្រង់ (Navigation) ៖ តភ្ជាប់អេក្រង់ទាំងអស់ឱ្យក្លាយជាលំហូរការងារ</h1>\n          <p class=\"hero-subtitle\">\n            បំប្លែងផ្ទាំងអេក្រង់ដាច់ៗដោយឡែកឱ្យក្លាយជាដំណើរការអាជីវកម្មដ៏រលូនដូចដែលបានរចនាលើក្រដាស។ ស្វែងយល់ពីខ្សែសង្វាក់ប្តូរអេក្រង់ (Navigation Chain)៖ សកម្មភាពអ្នកប្រើ &rarr; OnSelect &rarr; Navigate() / Back() &rarr; អេក្រង់គោលដៅ ធានាថាកម្មករមិនជាប់គាំង ឬផ្ញើទិន្នន័យស្ទួនឡើយ។\n          </p>\n\n          <div class=\"model-chain\">\n            <span class=\"chain-item\">បញ្ហាពិត</span>\n            <span class=\"chain-arrow\">&rarr;</span>\n            <span class=\"chain-item\">ដំណើរការ</span>\n            <span class=\"chain-arrow\">&rarr;</span>\n            <span class=\"chain-item\">ទិន្នន័យ</span>\n            <span class=\"chain-arrow\">&rarr;</span>\n            <span class=\"chain-item active\">UI / Screens</span>\n            <span class=\"chain-arrow\">&rarr;</span>\n            <span class=\"chain-item active\">សកម្មភាព (Navigate)</span>\n            <span class=\"chain-arrow\">&rarr;</span>\n            <span class=\"chain-item\">ការផ្ទុក</span>\n            <span class=\"chain-arrow\">&rarr;</span>\n            <span class=\"chain-item active\">ការឆ្លើយតប (Confirmation)</span>\n            <span class=\"chain-arrow\">&rarr;</span>\n            <span class=\"chain-item\">ការសាកល្បង</span>\n          </div>"
  },
  {
    "title": "របៀបវារៈ ៩០ នាទី និងគោលបំណងជាក់លាក់",
    "segment": "ផ្នែកទី ១៖ ការណែនាំ និងលទ្ធផលរំពឹងទុក",
    "subtitle": "រចនាសម្ព័ន្ធសិក្សាតាមគន្លងគួច តភ្ជាប់ Controls ពីមុនទៅកាន់ស្ថាបត្យកម្មលំហូរពហុអេក្រង់។",
    "content": "<div class=\"card\">\n            <h3 class=\"card-title\">គោលបំណងសិក្សាដែលអាចវាស់វែងបានទាំង ៤</h3>\n            <div class=\"objective-item\">\n              <span class=\"obj-num\">1</span>\n              <div>\n                <strong>បញ្ជាក់ពីតួនាទីនៃការប្តូរអេក្រង់ (Navigation) ៖</strong>\n                <p>ពន្យល់ពីមូលហេតុដែលអេក្រង់ដាច់ៗពីគ្នាត្រូវតែតភ្ជាប់ដោយកូដផ្លាស់ប្តូរច្បាស់លាស់ ដើម្បីបញ្ចប់ដំណើរការអាជីវកម្មដែលបានរចនាកាលពីមេរៀនមុន។</p>\n              </div>\n            </div>\n            <div class=\"objective-item\">\n              <span class=\"obj-num\">2</span>\n              <div>\n                <strong>បង្កើត និងប្រើប្រាស់រូបមន្ត Navigate()៖</strong>\n                <p>សរសេររូបមន្ត <code>Navigate(TargetScreen, Transition)</code> បានត្រឹមត្រូវ ដោយយល់ច្បាស់ពីអាគុយម៉ង់នីមួយៗដោយមិនចាំបាច់ទន្ទេញចាំមាត់។</p>\n              </div>\n            </div>\n            <div class=\"objective-item\">\n              <span class=\"obj-num\">3</span>\n              <div>\n                <strong>គ្រប់គ្រងប្រព័ន្ធចងចាំប្រវត្តិអេក្រង់ (History Stack)៖</strong>\n                <p>បែងចែកឱ្យដាច់រវាងការត្រឡប់ក្រោយតាមប្រវត្តិដោយប្រើ <code>Back()</code> និងការបង្ខំរត់ទៅមុខដោយប្រើ <code>Navigate(scrHome)</code>។</p>\n              </div>\n            </div>\n            <div class=\"objective-item\">\n              <span class=\"obj-num\">4</span>\n              <div>\n                <strong>លុបបំបាត់បញ្ហាអ្នកប្រើជាប់គាំង (Dead Ends)៖</strong>\n                <p>រចនា និងអនុវត្តផ្លូវ Cancel, Back, និងផ្ទាំងបញ្ជាក់ជោគជ័យ ដើម្បីលុបបំបាត់ការស្លន់ស្លោ និងការផ្ញើទិន្នន័យស្ទួនរបស់កម្មករ។</p>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"card\">\n            <h3 class=\"card-title\">កាលវិភាគមេរៀន ៩០ នាទី</h3>\n            <div class=\"agenda-timeline\">\n              <div class=\"agenda-block\">\n                <span class=\"agenda-time\">00 - 10m</span>\n                <span class=\"agenda-name\">វគ្គទី ១៖ រំលឹក និងតភ្ជាប់</span>\n                <span class=\"agenda-desc\">ការរំលឹកចំណេះដឹងចាស់</span>\n              </div>\n              <div class=\"agenda-block\">\n                <span class=\"agenda-time\">10 - 25m</span>\n                <span class=\"agenda-name\">វគ្គទី ២៖ ស្វែងយល់ពីមូលហេតុ</span>\n                <span class=\"agenda-desc\">វិបត្តិអ្នកប្រើជាប់គាំង</span>\n              </div>\n              <div class=\"agenda-block\">\n                <span class=\"agenda-time\">25 - 40m</span>\n                <span class=\"agenda-name\">វគ្គទី ៣៖ អនុគមន៍រុករក</span>\n                <span class=\"agenda-desc\">រចនាសម្ព័ន្ធ (Structure) Navigate vs Back</span>\n              </div>\n              <div class=\"agenda-block\">\n                <span class=\"agenda-time\">40 - 55m</span>\n                <span class=\"agenda-name\">វគ្គទី ៤៖ ការបង្ហាញផ្ទាល់ដោយគ្រូ</span>\n                <span class=\"agenda-desc\">ការតខ្សែសៀគ្វីក្នុង Studio</span>\n              </div>\n              <div class=\"agenda-block\">\n                <span class=\"agenda-time\">55 - 65m</span>\n                <span class=\"agenda-name\">វគ្គទី ៥៖ ការអនុវត្តដោយមានការណែនាំ</span>\n                <span class=\"agenda-desc\">លំហូរប្រគល់វេនការងារ</span>\n              </div>\n              <div class=\"agenda-block\">\n                <span class=\"agenda-time\">65 - 75m</span>\n                <span class=\"agenda-name\">វគ្គទី ៦៖ ការអនុវត្តស្វ័យភាព</span>\n                <span class=\"agenda-desc\">លំហូរ ៣ អេក្រង់ក្នុងឃ្លាំង</span>\n              </div>\n              <div class=\"agenda-block\">\n                <span class=\"agenda-time\">75 - 85m</span>\n                <span class=\"agenda-name\">វគ្គទី ៧៖ ការត្រួតពិនិត្យ និងបញ្ហាប្រឈម</span>\n                <span class=\"agenda-desc\">សំណួរ ៥ + បញ្ហាប្រឈមចុងក្រោយ</span>\n              </div>\n              <div class=\"agenda-block\">\n                <span class=\"agenda-time\">85 - 90m</span>\n                <span class=\"agenda-name\">វគ្គទី ៨៖ ស្ពានភ្ជាប់ទៅថ្ងៃស្អែក</span>\n                <span class=\"agenda-desc\">ទិដ្ឋភាពថ្ងៃទី ១៦ Dynamic Logic</span>\n              </div>\n            </div>\n          </div>"
  },
  {
    "title": "ផែនទីកម្មវិធីសិក្សា៖ ម៉ាស៊ីនប្រទាក់ក្រឡាគ្នា",
    "segment": "ផ្នែកទី ១៖ ការណែនាំ និងលទ្ធផលរំពឹងទុក",
    "subtitle": "រាល់មេរៀនទាំងអស់សុទ្ធតែកសាងលើអ្វីដែលបានរៀន និងត្រៀមគ្រឹះសម្រាប់មេរៀនបន្ទាប់ជានិច្ច។",
    "content": "<div class=\"card\">\n            <span class=\"card-badge\">ថ្ងៃទី ១២–១៤ (កន្លងមក)</span>\n            <h3 class=\"card-title\">គំនូរព្រាង និង Controls</h3>\n            <p class=\"card-body\">\n              នៅថ្ងៃទី ១២ យើងគូសព្រាងអេក្រង់លើក្រដាស (Dashboard, Form, Success)។ នៅថ្ងៃទី ១៣ យើងបង្កើតអេក្រង់ក្នុង Studio។ នៅថ្ងៃទី ១៤ យើងរៀបចំ Buttons, Labels, និង Dropdowns។\n            </p>\n          </div>\n\n          <div class=\"card\" style=\"border-color: var(--color-cyan); box-shadow: 0 0 20px rgba(6, 182, 212, 0.2);\">\n            <span class=\"card-badge\" style=\"background: rgba(6, 182, 212, 0.2); color: #67e8f9;\">ថ្ងៃនេះ (ថ្ងៃទី ១៥)</span>\n            <h3 class=\"card-title\">ការរុករក៖ តភ្ជាប់លំហូរការងារ</h3>\n            <p class=\"card-body\">\n              យើងតភ្ជាប់អេក្រង់ដែលនៅដាច់ពីគ្នាដោយប្រើ <code>Navigate()</code> និង <code>Back()</code> ក្នុង Property <code>OnSelect</code> របស់ប៊ូតុង ដើម្បីបញ្ចប់ដំណើរការអាជីវកម្មពីដើមដល់ចប់។\n            </p>\n          </div>\n\n          <div class=\"card\">\n            <span class=\"card-badge\">ថ្ងៃស្អែក (ថ្ងៃទី ១៦)</span>\n            <h3 class=\"card-title\">តក្កវិជ្ជា Control ឌីណាមិក</h3>\n            <p class=\"card-body\">\n              ឥឡូវនេះអេក្រង់បានតភ្ជាប់គ្នាហើយ យើងនឹងធ្វើឱ្យ Controls មានប្រតិកម្មវៃឆ្លាត៖ ចាក់សោប៊ូតុង Submit រហូតដល់បំពេញគ្រប់ប្រអប់ និងបង្ហាញផ្ទាំងព្រមានតាមលក្ខខណ្ឌ។\n            </p>\n          </div>"
  },
  {
    "title": "ការរំលឹកចំណេះដឹងមុន៖ ចុចលើកាតដើម្បីមើលចម្លើយ",
    "segment": "ផ្នែកទី ១៖ ការណែនាំ និងលទ្ធផលរំពឹងទុក",
    "subtitle": "ការរំលឹកការចងចាំរហ័ស មុនពេលយើងតភ្ជាប់ដំណើរការប្តូររវាងអេក្រង់ច្រើន (Multi-Screen Navigation)។",
    "content": "<div class=\"flip-card\" onclick=\"this.classList.toggle('flipped')\">\n            <div class=\"flip-inner\">\n              <div class=\"flip-front\">\n                <span class=\"card-badge\">សំណួរទី ១</span>\n                <p>តើបុព្វបទស្តង់ដារ Hungarian មួយណាដែលយើងប្រើសម្រាប់ Screen ក្នុង Tree View?</p>\n                <span class=\"flip-prompt\">ចុចដើម្បីត្រឡប់កាត &rarr;</span>\n              </div>\n              <div class=\"flip-back\">\n                <span class=\"card-badge\">ចម្លើយទី ១</span>\n                <p>បុព្វបទ <code>scr</code> (ឧ. <code>scrHome</code>, <code>scrNewRequest</code>, <code>scrSuccessConfirmation</code>)។</p>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"flip-card\" onclick=\"this.classList.toggle('flipped')\">\n            <div class=\"flip-inner\">\n              <div class=\"flip-front\">\n                <span class=\"card-badge\">សំណួរទី ២</span>\n                <p>តើ Property មួយណាលើប៊ូតុង Button ដែលកំណត់សកម្មភាពនៅពេលអ្នកប្រើចុចលើវា?</p>\n                <span class=\"flip-prompt\">ចុចដើម្បីត្រឡប់កាត &rarr;</span>\n              </div>\n              <div class=\"flip-back\">\n                <span class=\"card-badge\">ចម្លើយទី ២</span>\n                <p>Property <code>OnSelect</code>។ តាមលំនាំដើមវានៅទទេ ហើយយើងសរសេររូបមន្តបញ្ជា និងរុករកនៅទីនោះ។</p>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"flip-card\" onclick=\"this.classList.toggle('flipped')\">\n            <div class=\"flip-inner\">\n              <div class=\"flip-front\">\n                <span class=\"card-badge\">សំណួរទី ៣</span>\n                <p>តើផ្ទាំងបញ្ជាក់ជោគជ័យ (Confirmation Screen) មានតួនាទីសំខាន់អ្វីខ្លះក្នុង App?</p>\n                <span class=\"flip-prompt\">ចុចដើម្បីត្រឡប់កាត &rarr;</span>\n              </div>\n              <div class=\"flip-back\">\n                <span class=\"card-badge\">ចម្លើយទី ៣</span>\n                <p>ផ្តល់ការឆ្លើយតបផ្លូវចិត្តយ៉ាងច្បាស់ថាទិន្នន័យត្រូវបានរក្សាទុក បង្ហាញលេខយោងប័ណ្ណ និងបំបាត់ការថប់បារម្ភរបស់អ្នកប្រើ។</p>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"flip-card\" onclick=\"this.classList.toggle('flipped')\">\n            <div class=\"flip-inner\">\n              <div class=\"flip-front\">\n                <span class=\"card-badge\">សំណួរទី ៤</span>\n                <p>ប្រសិនបើប៊ូតុងមាន <code>DisplayMode = DisplayMode.Disabled</code> តើ OnSelect ដំណើរការទេ?</p>\n                <span class=\"flip-prompt\">ចុចដើម្បីត្រឡប់កាត &rarr;</span>\n              </div>\n              <div class=\"flip-back\">\n                <span class=\"card-badge\">ចម្លើយទី ៤</span>\n                <p>មិនដំណើរការទេ។ ប៊ូតុងអសកម្មនឹងប្រែពណ៌ប្រផេះ មិនឆ្លើយតបនឹងការប៉ះ ហើយកូដក្នុង <code>OnSelect</code> ត្រូវបានមិនអើពើ។</p>\n              </div>\n            </div>\n          </div>"
  },
  {
    "title": "វិបត្តិនៅកន្លែងការងារ៖ ការស្លន់ស្លោរបស់កម្មករដែលជាប់គាំងក្នុង App",
    "segment": "វគ្គទី ២៖ មូលហេតុពិតក្នុងពិភពជាក់ស្តែង",
    "subtitle": "អ្វីដែលកើតឡើងនៅពេលអេក្រង់នានានៅដាច់ពីគ្នាដោយគ្មានផ្លូវចេញ ឬផ្លូវបញ្ជាក់ដំណឹង។",
    "content": "<div class=\"crisis-banner\">\n            <span class=\"crisis-icon\">&Delta;</span>\n            <div>\n              <h3>ហេតុការណ៍វេនយប់នៅរោងចក្រ Apex Plastics</h3>\n              <p>បុគ្គលិកបច្ចេកទេស សំណាង បានបង្កើត ៣ អេក្រង់ក្នុង Studio៖ <code>scrHome</code>, <code>scrNewRequest</code>, និង <code>scrSuccess</code>។ ប៉ុន្តែគាត់ភ្លេចតភ្ជាប់កូដរុករក។ ភាពចលាចលបានកើតឡើងភ្លាមៗ។</p>\n            </div>\n          </div>\n\n          <div class=\"grid-3\">\n            <div class=\"card\">\n              <span class=\"consequence-badge\">ដំណាក់កាល ១៖ ជាប់គាំងក្នុងបន្ទប់</span>\n              <h4 style=\"margin: 0.6rem 0;\">គ្មានប៊ូតុង Back ឬ Cancel</h4>\n              <p>កម្មករឈ្មោះ ដារ៉ា បានចុចលើតំណភ្ជាប់ Tablet ហើយបើកចំ <code>scrNewRequest</code> ដោយចៃដន្យ។ លើអេក្រង់នោះ <strong>គ្មានប៊ូតុង Back គ្មានប៊ូតុង Cancel និងគ្មានប៊ូតុង Home ឡើយ</strong>។ គាត់ត្រូវបានចាក់សោជាប់ក្នុងទម្រង់នោះទាំងស្រុង។</p>\n            </div>\n\n            <div class=\"card\">\n              <span class=\"consequence-badge\">ដំណាក់កាល ២៖ បង្ខំចិត្តវាយទិន្នន័យខូច</span>\n              <h4 style=\"margin: 0.6rem 0;\">Submit ដើម្បីតែចង់ចេញ</h4>\n              <p>ដោយគិតថាវិធីតែមួយគត់ដើម្បីចេញពីអេក្រង់នេះគឺត្រូវតែ Submit ដារ៉ាក៏បានវាយពាក្យ <em>\"test asdf\"</em> ចូលក្នុងប្រអប់កំណត់ចំណាំ ហើយចុច Submit បង្កឱ្យទិន្នន័យសំរាមហូរចូល Database។</p>\n            </div>\n\n            <div class=\"card\">\n              <span class=\"consequence-badge\">ដំណាក់កាល ៣៖ អេក្រង់ស្ងាត់ឈឹង</span>\n              <h4 style=\"margin: 0.6rem 0;\">ប័ណ្ណស្ទួនចំនួន ៩ បានកើតឡើង</h4>\n              <p>ពេលដារ៉ាចុច Submit អេក្រង់មិនកម្រើកសោះ! ដោយគិតថា Tablet គាំង គាត់បានចុច Submit <strong>៨ ដងទៀតផ្ទួនៗ</strong> បង្កើតបានប័ណ្ណអាសន្ន ៩ សន្លឹកដែលធ្វើឱ្យក្រុមវិស្វករបើកឡានរត់ពេញរោងចក្រ!</p>\n            </div>\n          </div>"
  },
  {
    "title": "ខ្សែសង្វាក់នៃផលវិបាក៖ ពីការគ្មានកូដរុករក រហូតដល់ការឆេះប្រអប់លេខម៉ាស៊ីន",
    "segment": "វគ្គទី ២៖ មូលហេតុពិតក្នុងពិភពជាក់ស្តែង",
    "subtitle": "កំហុសរុករកក្នុងកម្មវិធីមិនមែនជារឿងលេងសើចទេ—វាជះឥទ្ធិពលផ្ទាល់ដល់សុវត្ថិភាពរោងចក្រ។",
    "content": "<div class=\"card\">\n            <h3 class=\"card-title\">ផលប៉ះពាល់ជាបន្តបន្ទាប់លើប្រតិបត្តិការ</h3>\n            <div class=\"consequence-row\">\n              <span class=\"consequence-badge\">១. ស្លន់ស្លោ</span>\n              <div>\n                <strong>អ្នកប្រើថប់បារម្ភ និងចុច Submit ផ្ទួនៗ៖</strong>\n                <p>ដោយសារគ្មានការប្តូរទៅកាន់អេក្រង់បញ្ជាក់ជោគជ័យ អ្នកប្រើគិតថា App គាំង ហើយចុចប៊ូតុងដដែលៗជាច្រើនដង។</p>\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"consequence-badge\">២. ទិន្នន័យខូច</span>\n              <div>\n                <strong>ប័ណ្ណស្ទួន ៩ សន្លឹកក្នុង SharePoint៖</strong>\n                <p>មូលដ្ឋានទិន្នន័យជន់ជោរដោយប័ណ្ណខ្មោច ធ្វើឱ្យក្រុមបែងចែកការងារជួសជុលវង្វេងវង្វាន់ទាំងស្រុង។</p>\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"consequence-badge\">៣. វង្វេងទិស</span>\n              <div>\n                <strong>វិស្វកររត់ទៅរកម៉ាស៊ីនដែលមិនខូច៖</strong>\n                <p>វិស្វករជាន់ខ្ពស់ ៣ នាក់បានរត់ទៅម៉ាស៊ីន Press #3 ដែលកំពុងដំណើរការយ៉ាងរលូន ១០០%។</p>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"card\" style=\"border-color: rgba(239, 68, 68, 0.4); background: rgba(30, 41, 59, 0.9);\">\n            <h3 class=\"card-title\" style=\"color: #fca5a5;\">ការខាតបង់ឧស្សាហកម្មពិត</h3>\n            <div style=\"font-size: 2.8rem; font-weight: 800; color: #ef4444; margin: 1rem 0;\">ឆេះប្រអប់លេខ</div>\n            <p style=\"font-size: 1.05rem; line-height: 1.6; color: #cbd5e1;\">\n              ខណៈពេលដែលក្រុមជាងកំពុងរវល់ស៊ើបអង្កេតប័ណ្ណខ្មោចទាំង ៩ លើ Press #3 សញ្ញាអាសន្នឡើងកម្តៅពិតប្រាកដលើម៉ាស៊ីន Press #1 ត្រូវបានគេមើលរំលងអស់ ២ ម៉ោង។ ប្រអប់លេខមេកានិកបានជាប់គាំង និងឆេះបំផ្លាញគ្រឿងបន្លាស់អស់ទឹកប្រាក់ $18,500។\n            </p>\n            <div style=\"margin-top: auto; padding: 0.85rem; background: rgba(239, 68, 68, 0.15); border-radius: 0.5rem; font-weight: 600; color: #fca5a5;\">\n              មេរៀនសំខាន់៖ ការរុករកតភ្ជាប់ទំនុកចិត្តមនុស្សទៅនឹងការពិតអាជីវកម្ម។ ត្រូវតែមានផ្លូវចេញ និងការឆ្លើយតបជានិច្ច!\n            </div>\n          </div>"
  },
  {
    "title": "គោលគំនិតងាយយល់៖ បន្ទប់ និងទ្វារនៅក្នុងអាគារ",
    "segment": "វគ្គទី ២៖ មូលហេតុពិតក្នុងពិភពជាក់ស្តែង",
    "subtitle": "មុនពេលឈានដល់រូបមន្ត ចូរស្រមៃមើលបន្ទប់រូបវន្តផ្សេងៗនៅក្នុងអាគាររោងចក្រ។",
    "content": "<div class=\"card\">\n            <span class=\"card-badge\" style=\"background: rgba(6, 182, 212, 0.2); color: #67e8f9;\">១. បន្ទប់ជាក់លាក់</span>\n            <h3 class=\"card-title\">បន្ទប់រូបវន្ត (Screen)</h3>\n            <p class=\"card-body\">\n              រោងចក្រមានបន្ទប់ដាច់ដោយឡែក៖ បន្ទប់ទទួលភ្ញៀវ, រោងជាងថែទាំ, និងបន្ទប់ពិសោធន៍គុណភាព។ អ្នកមិនធ្វើការវះកាត់នៅកន្លែងទទួលភ្ញៀវទេ។ អេក្រង់នីមួយៗក្នុង App គឺជាបន្ទប់ដែលរចនាសម្រាប់ <strong>កិច្ចការជាក់លាក់មួយប៉ុណ្ណោះ</strong>។\n            </p>\n            <div style=\"margin-top: auto; font-family: var(--font-code); color: var(--color-cyan); font-size: 0.85rem;\">\n              សមមូលក្នុង Studio៖ Screen (scr)\n            </div>\n          </div>\n\n          <div class=\"card\">\n            <span class=\"card-badge\" style=\"background: rgba(59, 130, 246, 0.2); color: #93c5fd;\">២. គន្លឹះទ្វារ</span>\n            <h3 class=\"card-title\">ទ្វារដែលមានផ្លាកសញ្ញា (Navigate)</h3>\n            <p class=\"card-body\">\n              ដើម្បីដើរពីកន្លែងទទួលភ្ញៀវទៅរោងជាង អ្នកត្រូវដើរទៅកាន់ទ្វារដែលមានស្លាកសរសេរថា៖ <em>\"ចូលរោងជាង\"</em> ហើយមួលគន្លឹះទ្វារ។ ក្នុង Power Apps ប៊ូតុងដែលមានកូដ <code>Navigate()</code> គឺជាទ្វារសម្រាប់ដើរទៅមុខចូលបន្ទប់បន្ទាប់។\n            </p>\n            <div style=\"margin-top: auto; font-family: var(--font-code); color: #60a5fa; font-size: 0.85rem;\">\n              Power Fx៖ Navigate(scrTarget)\n            </div>\n          </div>\n\n          <div class=\"card\">\n            <span class=\"card-badge\" style=\"background: rgba(16, 185, 129, 0.2); color: #6ee7b7;\">៣. ការដើរថយក្រោយ</span>\n            <h3 class=\"card-title\">ការដើរត្រឡប់តាមផ្លូវចាស់ (Back)</h3>\n            <p class=\"card-body\">\n              ពេលអ្នកធ្វើការចប់ក្នុងរោងជាង អ្នកមិនលោតតាមបង្អួចទេ។ អ្នកងាកក្រោយ ហើយដើរថយក្រោយតាមទ្វារដែលអ្នកបានចូល។ ក្នុង Power Apps អនុគមន៍ <code>Back()</code> នាំអ្នកត្រឡប់ក្រោយតាមប្រវត្តិអេក្រង់ដែលអ្នកទើបតែឆ្លងកាត់។\n            </p>\n            <div style=\"margin-top: auto; font-family: var(--font-code); color: #34d399; font-size: 0.85rem;\">\n              Power Fx៖ Back()\n            </div>\n          </div>"
  },
  {
    "title": "ការប្រៀបធៀបក្នុងជីវិតរស់នៅ៖ ការដកប្រាក់ពីទូ ATM",
    "segment": "វគ្គទី ២៖ មូលហេតុពិតក្នុងពិភពជាក់ស្តែង",
    "subtitle": "រាល់ប្រតិបត្តិការដកប្រាក់ពីទូ ATM គឺជាលំហូរ ៥ អេក្រង់តភ្ជាប់គ្នាដោយមានផ្លូវចេញជានិច្ច។",
    "content": "<div class=\"card\">\n            <span class=\"card-badge\">ជំហាន ១</span>\n            <h4 style=\"margin: 0.5rem 0;\">អេក្រង់ស្វាគមន៍</h4>\n            <p style=\"font-size: 0.88rem; color: var(--text-muted);\">\n              \"សូមបញ្ចូលកាត\"។ អ្នកប្រើបញ្ចូលកាត &rarr; ទូ ATM ដំណើរការ <code>Navigate(scrPIN)</code> ដោយស្វ័យប្រវត្តិ។\n            </p>\n            <div style=\"margin-top: auto; font-family: var(--font-code); font-size: 0.78rem; color: var(--color-cyan);\">ការរុករកទៅមុខ</div>\n          </div>\n\n          <div class=\"card\">\n            <span class=\"card-badge\">ជំហាន ២</span>\n            <h4 style=\"margin: 0.5rem 0;\">វាយកូដ PIN + បោះបង់</h4>\n            <p style=\"font-size: 0.88rem; color: var(--text-muted);\">\n              ទាមទារលេខសម្ងាត់ ៤ ខ្ទង់។ មានប៊ូតុងក្រហមធំមួយ៖ <strong>បោះបង់ (Back)</strong>។ អ្នកប្រើមិនដែលជាប់គាំងឡើយ។\n            </p>\n            <div style=\"margin-top: auto; font-family: var(--font-code); font-size: 0.78rem; color: #ef4444;\">ផ្លូវសុវត្ថិភាពចាកចេញ</div>\n          </div>\n\n          <div class=\"card\">\n            <span class=\"card-badge\">ជំហាន ៣</span>\n            <h4 style=\"margin: 0.5rem 0;\">ជ្រើសរើសចំនួនប្រាក់</h4>\n            <p style=\"font-size: 0.88rem; color: var(--text-muted);\">\n              ចុច \"$100\"។ ម៉ាស៊ីនរាប់ប្រាក់ &rarr; <code>Navigate(scrDispense, ScreenTransition.Fade)</code>។\n            </p>\n            <div style=\"margin-top: auto; font-family: var(--font-code); font-size: 0.78rem; color: #60a5fa;\">ការផ្លាស់ប្តូរស្ថានភាព</div>\n          </div>\n\n          <div class=\"card\">\n            <span class=\"card-badge\">ជំហាន ៤</span>\n            <h4 style=\"margin: 0.5rem 0;\">អេក្រង់បញ្ជាក់លទ្ធផល</h4>\n            <p style=\"font-size: 0.88rem; color: var(--text-muted);\">\n              \"សូមទទួលយកប្រាក់ និងវិក្កយបត្រ\"។ ដកប្រាក់រួច &rarr; អេក្រង់ត្រឡប់ទៅកាន់ទំព័រដើមវិញដោយរលូន។\n            </p>\n            <div style=\"margin-top: auto; font-family: var(--font-code); font-size: 0.78rem; color: #34d399;\">ការបញ្ចប់រង្វិលជុំពេញលេញ</div>\n          </div>"
  },
  {
    "title": "អនុគមន៍រុករកស្នូលទាំងពីរក្នុង Power Apps មួយភ្លែត",
    "segment": "វគ្គទី ៣៖ រចនាសម្ព័ន្ធ និងយន្តការដំណើរការ",
    "subtitle": "Power Apps ផ្តល់នូវអនុគមន៍ជាក់លាក់ចំនួនពីរដើម្បីបញ្ជាកាមេរ៉ាបង្ហាញអេក្រង់របស់អ្នកប្រើប្រាស់។",
    "content": "<div class=\"card\">\n            <div style=\"display: flex; justify-content: space-between; align-items: center;\">\n              <span class=\"card-badge\" style=\"background: rgba(59, 130, 246, 0.2); color: #93c5fd;\">បញ្ជាទៅមុខ</span>\n              <span style=\"font-family: var(--font-code); color: #60a5fa; font-weight: 700;\">Navigate()</span>\n            </div>\n            <h3 style=\"margin: 0.8rem 0 0.4rem 0;\">អនុគមន៍ Navigate()</h3>\n            <p style=\"font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1rem;\">\n              ដឹកជញ្ជូនទិដ្ឋភាពរបស់អ្នកប្រើប្រាស់ឆ្ពោះទៅមុខយ៉ាងច្បាស់លាស់ទៅកាន់អេក្រង់គោលដៅដែលមានឈ្មោះក្នុង Tree View។\n            </p>\n\n            <div style=\"background: #020617; padding: 1rem; border-radius: 0.6rem; border: 1px solid var(--border-subtle); font-family: var(--font-code); font-size: 0.85rem; line-height: 1.6; color: #93c5fd;\">\n              Navigate( <span style=\"color: #38bdf8;\">TargetScreen</span>, <span style=\"color: #a78bfa;\">ScreenTransition</span> )\n            </div>\n\n            <div style=\"margin-top: 1rem; font-size: 0.82rem; color: var(--text-muted);\">\n              <strong>ឧទាហរណ៍៖</strong> <code>Navigate(scrNewRequest, ScreenTransition.Cover)</code>\n            </div>\n          </div>\n\n          <div class=\"card\">\n            <div style=\"display: flex; justify-content: space-between; align-items: center;\">\n              <span class=\"card-badge\" style=\"background: rgba(16, 185, 129, 0.2); color: #6ee7b7;\">បញ្ជាថយក្រោយ</span>\n              <span style=\"font-family: var(--font-code); color: #34d399; font-weight: 700;\">Back()</span>\n            </div>\n            <h3 style=\"margin: 0.8rem 0 0.4rem 0;\">អនុគមន៍ Back()</h3>\n            <p style=\"font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1rem;\">\n              អានប្រវត្តិអេក្រង់ពីការចងចាំខាងក្នុង (Stack) ហើយនាំអ្នកប្រើត្រឡប់ក្រោយទៅកាន់អេក្រង់ណាដែលពួកគេទើបតែឆ្លងកាត់។\n            </p>\n\n            <div style=\"background: #020617; padding: 1rem; border-radius: 0.6rem; border: 1px solid var(--border-subtle); font-family: var(--font-code); font-size: 0.85rem; line-height: 1.6; color: #86efac;\">\n              Back( [ <span style=\"color: #a78bfa;\">ScreenTransition</span> ] )\n            </div>\n\n            <div style=\"margin-top: 1rem; font-size: 0.82rem; color: var(--text-muted);\">\n              <strong>ឧទាហរណ៍៖</strong> <code>Back(ScreenTransition.UnCover)</code> ឬសរសេរត្រឹម <code>Back()</code>\n            </div>\n          </div>"
  },
  {
    "title": "ស្វែងយល់ស៊ីជម្រៅ៖ រចនាសម្ព័ន្ធនៃរូបមន្ត (Formula Structure) Navigate()",
    "segment": "វគ្គទី ៣៖ រចនាសម្ព័ន្ធ និងយន្តការដំណើរការ",
    "subtitle": "យល់ដឹងពីអាគុយម៉ង់នីមួយៗយ៉ាងស៊ីជម្រៅ ដើម្បីកុំឱ្យអ្នកត្រូវទន្ទេញចាំកូដដោយមិនយល់។",
    "content": "<div class=\"card\">\n            <h3 class=\"card-title\">ការបំបែកធាតុផ្សំនៃរូបមន្ត</h3>\n            <div style=\"background: #070a12; padding: 1.25rem; border-radius: 0.75rem; border: 1px solid var(--border-subtle); font-family: var(--font-code); font-size: 0.95rem; margin-bottom: 1.25rem;\">\n              <span style=\"color: #f59e0b;\">Navigate</span>( <span style=\"color: #38bdf8;\">scrNewRequest</span>, <span style=\"color: #c084fc;\">ScreenTransition.Cover</span> )\n            </div>\n\n            <div class=\"consequence-row\">\n              <span class=\"card-badge\" style=\"background: rgba(245, 158, 11, 0.2); color: #fbbf24;\">អនុគមន៍</span>\n              <div>\n                <strong>Navigate៖</strong>\n                <p>កិរិយាស័ព្ទបញ្ជា។ បញ្ជាឱ្យប្រព័ន្ធ Power Apps ផ្លាស់ប្តូរអេក្រង់ដែលកំពុងមើលឃើញ។</p>\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"card-badge\" style=\"background: rgba(56, 189, 248, 0.2); color: #38bdf8;\">Arg 1</span>\n              <div>\n                <strong>TargetScreen (scrNewRequest)៖</strong>\n                <p>ឈ្មោះពិតប្រាកដរបស់ Screen ក្នុង Tree View។ ត្រូវតែសរសេរឈ្មោះឱ្យដូចបេះបិទ (ហាមប្រើសញ្ញាសម្រង់!)។</p>\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"card-badge\" style=\"background: rgba(192, 132, 252, 0.2); color: #c084fc;\">Arg 2</span>\n              <div>\n                <strong>ScreenTransition (ចលនារូបវន្ត)៖</strong>\n                <p>ចលនាបង្ហាញនៅពេលប្តូរអេក្រង់ (Fade, Cover, CoverRight, None) ដើម្បីផ្តល់អារម្មណ៍ស្រួលភ្នែក។</p>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"card\">\n            <h3 class=\"card-title\">តើយើងត្រូវសរសេររូបមន្តនេះនៅទីណា?</h3>\n            <p class=\"card-body\">\n              ក្នុង Power Apps Studio រូបមន្តរុករកត្រូវបានដំណើរការជាការឆ្លើយតបទៅនឹងសកម្មភាពរបស់អ្នកប្រើប្រាស់។ ដូច្នេះ អ្នកស្ទើរតែតែងតែសរសេរ <code>Navigate()</code> នៅខាងក្នុង៖\n            </p>\n\n            <div style=\"background: rgba(15, 23, 42, 0.85); padding: 1rem; border-radius: 0.6rem; border: 1px solid var(--border-subtle); margin: 0.85rem 0;\">\n              <strong style=\"color: var(--color-cyan); font-size: 0.85rem;\">Property OnSelect នៃ៖</strong>\n              <ul style=\"margin: 0.5rem 0 0 1.2rem; font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;\">\n                <li>Buttons៖ <code>btnNewTicket.OnSelect</code></li>\n                <li>Icons (ព្រួញ)៖ <code>icnNextArrow.OnSelect</code></li>\n                <li>កាតក្នុងបញ្ជី Gallery៖ <code>galIncidents.OnSelect</code></li>\n              </ul>\n            </div>\n\n            <div style=\"margin-top: auto; padding: 0.85rem; background: rgba(59, 130, 246, 0.1); border-radius: 0.5rem; font-size: 0.82rem; color: #93c5fd;\">\n              ចំណាំសំខាន់៖ ឈ្មោះអេក្រង់មិនប្រើសញ្ញាសម្រង់ \"\" ទេ ពីព្រោះវាជាឈ្មោះ Object ផ្ទាល់ មិនមែនជាអត្ថបទ Text ឡើយ!\n            </div>\n          </div>"
  },
  {
    "title": "ឧបករណ៍ពិសោធន៍ផ្ទាល់៖ សាកល្បងលំហូរ ៣ អេក្រង់ក្នុងទូរស័ព្ទគំរូ",
    "segment": "វគ្គទី ៣៖ រចនាសម្ព័ន្ធ និងយន្តការដំណើរការ",
    "subtitle": "ចុចលើប៊ូតុងក្នុងទូរស័ព្ទគំរូ ដើម្បីរុករកកាត់តាមសៀគ្វីទាំងមូល និងសង្កេតមើលប្រវត្តិ Stack។",
    "content": "<div class=\"phone-mockup-frame\">\n            <div class=\"phone-notch\"></div>\n            <div class=\"sim-screen-container\">\n              \n              <!-- Screen 1: scrHome -->\n              <div id=\"sim-scr-home\" class=\"sim-screen active\">\n                <span class=\"card-badge\" style=\"align-self: flex-start; margin-bottom: 0.5rem;\">scrHome</span>\n                <h4 style=\"font-size: 1.1rem; margin-bottom: 0.35rem;\">មជ្ឈមណ្ឌលថែទាំ Apex</h4>\n                <p style=\"font-size: 0.82rem; color: var(--text-muted); margin-bottom: 1.5rem;\">\n                  ខ្សែសង្វាក់ផលិតកម្មទាំង ៤ សកម្ម។ គ្មានសញ្ញាអាសន្ន។\n                </p>\n\n                <div style=\"background: rgba(30, 41, 59, 0.6); padding: 0.85rem; border-radius: 0.5rem; border: 1px solid var(--border-subtle); margin-bottom: 1.5rem; font-size: 0.8rem; color: #cbd5e1;\">\n                  ការជួសជុលថ្មីៗ៖<br>&bull; Press-02៖ បានប្តូរក្បាលវ៉ាន (08:30)<br>&bull; Extruder-01៖ បានលាងសម្អាតតម្រង\n                </div>\n\n                <button id=\"sim-btn-goto-form\" class=\"hud-btn\" style=\"width: 100%; justify-content: center; background: #0078d4; color: #fff; padding: 0.75rem; margin-top: auto;\">\n                  + រាយការណ៍បញ្ហា &rarr;\n                </button>\n              </div>\n\n              <!-- Screen 2: scrNewRequest -->\n              <div id=\"sim-scr-form\" class=\"sim-screen\">\n                <div style=\"display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;\">\n                  <button id=\"sim-btn-cancel-form\" class=\"hud-btn\" style=\"padding: 0.25rem 0.6rem; font-size: 0.75rem; background: rgba(239, 68, 68, 0.2); color: #fca5a5; border-color: rgba(239, 68, 68, 0.4);\">\n                    &larr; បោះបង់ (Back)\n                  </button>\n                  <span class=\"card-badge\">scrNewRequest</span>\n                </div>\n\n                <h4 style=\"font-size: 1.05rem; margin-bottom: 0.25rem;\">របាយការណ៍ម៉ាស៊ីនខូចថ្មី</h4>\n                <p style=\"font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.85rem;\">ជ្រើសរើសម៉ាស៊ីន និងរៀបរាប់បញ្ហា។</p>\n\n                <div style=\"margin-bottom: 0.65rem;\">\n                  <label style=\"font-size: 0.75rem; color: var(--text-dim); display: block; margin-bottom: 0.2rem;\">លេខម៉ាស៊ីន៖</label>\n                  <select class=\"dial-select\" style=\"width: 100%; font-size: 0.8rem; padding: 0.4rem;\">\n                    <option>Press-01 (ចាក់ពុម្ព)</option>\n                    <option>Press-02 (ចាក់ពុម្ព)</option>\n                    <option>Press-03 (ចាក់ពុម្ព)</option>\n                  </select>\n                </div>\n\n                <div style=\"margin-bottom: 1rem;\">\n                  <label style=\"font-size: 0.75rem; color: var(--text-dim); display: block; margin-bottom: 0.2rem;\">កំណត់ចំណាំ៖</label>\n                  <input type=\"text\" class=\"dial-input\" value=\"លេចធ្លាយប្រេងធារាសាស្ត្រត្រង់ seal #3\" style=\"width: 100%; font-size: 0.8rem; padding: 0.4rem;\">\n                </div>\n\n                <button id=\"sim-btn-submit-form\" class=\"hud-btn\" style=\"width: 100%; justify-content: center; background: #10b981; color: #fff; padding: 0.75rem; margin-top: auto;\">\n                  បញ្ជូនប័ណ្ណ &rarr;\n                </button>\n              </div>\n\n              <!-- Screen 3: scrSuccess -->\n              <div id=\"sim-scr-success\" class=\"sim-screen\">\n                <span class=\"card-badge\" style=\"align-self: flex-start; margin-bottom: 0.5rem; background: rgba(16, 185, 129, 0.2); color: #86efac;\">scrSuccess</span>\n                <div style=\"text-align: center; margin: 1.5rem 0 1rem 0;\">\n                  <div style=\"font-size: 2.5rem; color: #10b981; margin-bottom: 0.5rem;\">&check;</div>\n                  <h4 style=\"font-size: 1.15rem; color: #fff;\">បានរក្សាទុកជោគជ័យ!</h4>\n                  <p style=\"font-size: 0.82rem; color: var(--color-cyan); font-family: var(--font-code); margin-top: 0.25rem;\">\n                    លេខប័ណ្ណ៖ TKT-2026-0914\n                  </p>\n                </div>\n\n                <p style=\"font-size: 0.82rem; color: var(--text-muted); text-align: center; line-height: 1.5; margin-bottom: 1.5rem;\">\n                  សារជូនដំណឹងត្រូវបានបញ្ជូនទៅកាន់ក្រុមជាងប្រចាំការរួចរាល់ហើយ។\n                </p>\n\n                <button id=\"sim-btn-return-home\" class=\"hud-btn\" style=\"width: 100%; justify-content: center; background: #0078d4; color: #fff; padding: 0.75rem; margin-top: auto;\">\n                  ត្រឡប់ទៅផ្ទាំងដើម &larr;\n                </button>\n              </div>\n\n            </div>\n          </div>\n\n          <!-- Stack Inspector & Formula Terminal -->\n          <div class=\"stack-inspector-panel\">\n            <h3 class=\"card-title\">ផ្ទាំងត្រួតពិនិត្យការរុករកក្នុងពេលដំណើរការ</h3>\n            <p style=\"font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;\">\n              សង្កេតមើលរបៀបដែល Power Apps កត់ត្រាអេក្រង់សកម្ម និងគ្រប់គ្រងប្រវត្តិ Stack៖\n            </p>\n\n            <div class=\"stack-trail-box\">\n              <div><span style=\"color: var(--color-cyan);\">អេក្រង់ដែលកំពុងមើលឃើញ៖</span> <strong id=\"sim-active-screen-name\" style=\"color: #fff;\">scrHome</strong></div>\n              <div><span style=\"color: #c084fc;\">អេក្រង់មុនក្នុងប្រវត្តិ STACK៖</span> <span id=\"sim-stack-prev-name\" style=\"color: #94a3b8;\">(គ្មាន - ទំព័រដើម)</span></div>\n              <div><span style=\"color: #f59e0b;\">រូបមន្តចុងក្រោយដែលបានដំណើរការ៖</span> <span id=\"sim-last-formula\" style=\"color: #93c5fd;\">App.OnStart</span></div>\n            </div>\n\n            <div style=\"background: rgba(30, 41, 59, 0.5); padding: 1rem; border-radius: 0.6rem; border: 1px solid var(--border-subtle); font-size: 0.85rem; line-height: 1.7; color: var(--text-muted);\">\n              <strong>ការសង្កេតស្ថាបត្យកម្ម៖</strong>\n              <p>នៅពេលអ្នកចុច <strong>\"+ រាយការណ៍បញ្ហា\"</strong> ប្រព័ន្ធរុញ <code>scrHome</code> ចូលទៅក្នុងប្រវត្តិ ហើយបង្ហាញ <code>scrNewRequest</code>។ នៅពេលចុច <strong>\"បោះបង់\"</strong> អនុគមន៍ <code>Back()</code> ដកប្រវត្តិចេញវិញដោយមិនបាច់កំណត់ឈ្មោះអេក្រង់ឡើយ។</p>\n            </div>\n          </div>"
  },
  {
    "title": "ស្វែងយល់ស៊ីជម្រៅ៖ អនុគមន៍ Back() និងប្រព័ន្ធចងចាំ Stack",
    "segment": "វគ្គទី ៣៖ រចនាសម្ព័ន្ធ និងយន្តការដំណើរការ",
    "subtitle": "មូលហេតុដែល Back() ប្រសើរជាងការសរសេរ Navigate(scrHome) លើប៊ូតុងបោះបង់។",
    "content": "<div class=\"card\">\n            <h3 class=\"card-title\">របៀបដែល Navigation Stack ដំណើរការ (LIFO)</h3>\n            <p class=\"card-body\">\n              រាល់ពេលដែលអ្នកហៅ <code>Navigate()</code> ប្រព័ន្ធ Power Apps នឹងរុញអេក្រង់បច្ចុប្បន្នចូលទៅក្នុងជង់សតិខាងក្នុង ដូចជាការដាក់សន្លឹកបៀជាន់ពីលើគ្នា៖\n            </p>\n\n            <div style=\"background: #020617; padding: 1rem; border-radius: 0.6rem; border: 1px solid var(--border-subtle); margin: 1rem 0; font-family: var(--font-code); font-size: 0.82rem; line-height: 1.7;\">\n              [សន្លឹកលើគេបង្អស់] &rarr; scrNewRequest (អេក្រង់សកម្ម)<br>\n              [សន្លឹកខាងក្រោម] &rarr; scrHome (រុញចូលពេលហៅ Navigate)<br>\n              [បាតក្រោមគេ] &rarr; (ឫសគល់នៃ App)\n            </div>\n\n            <p style=\"font-size: 0.85rem; color: var(--text-muted);\">\n              នៅពេលអ្នកហៅអនុគមន៍ <code>Back()</code> ប្រព័ន្ធគ្រាន់តែដកសន្លឹកបៀខាងលើចេញ ហើយបង្ហាញសន្លឹកបៀដែលនៅខាងក្រោមភ្លាម។\n            </p>\n          </div>\n\n          <div class=\"card\">\n            <h3 class=\"card-title\">ការប្រៀបធៀបរវាង Back() និង Navigate(scrHome)</h3>\n            <div class=\"consequence-row\">\n              <span class=\"card-badge\" style=\"background: rgba(16, 185, 129, 0.2); color: #86efac;\">Back()</span>\n              <div>\n                <strong>ត្រឡប់ក្រោយដោយរក្សាបរិបទ៖</strong>\n                <p>ប្រសិនបើអ្នកប្រើមកពីផ្ទាំង Search នោះ <code>Back()</code> នឹងនាំពួកគេត្រឡប់ទៅ Search វិញដោយរក្សាពាក្យគន្លឹះនៅដដែល។</p>\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"card-badge\" style=\"background: rgba(239, 68, 68, 0.2); color: #fca5a5;\">Navigate(scrHome)</span>\n              <div>\n                <strong>ការបង្ខំលោតទៅមុខ៖</strong>\n                <p>លុបបំបាត់បរិបទរបស់អ្នកប្រើ។ ប្រសិនបើពួកគេកំពុងស្វែងរកទិន្នន័យ ការបង្ខំទៅ Home នឹងបំផ្លាញការងារពួកគេចោល!</p>\n              </div>\n            </div>\n            <div style=\"margin-top: auto; padding: 0.85rem; background: rgba(59, 130, 246, 0.1); border-radius: 0.5rem; font-size: 0.82rem; color: #93c5fd;\">\n              វិធានវិស្វកម្ម៖ ត្រូវតែប្រើ <code>Back()</code> ជានិច្ចសម្រាប់ប៊ូតុង Cancel និងព្រួញត្រឡប់ក្រោយ!\n            </div>\n          </div>"
  },
  {
    "title": "បន្ទប់ពិសោធន៍ចលនាប្តូរអេក្រង់៖ តេស្តចលនារូបវន្ត",
    "segment": "វគ្គទី ៣៖ រចនាសម្ព័ន្ធ និងយន្តការដំណើរការ",
    "subtitle": "ជ្រើសរើសប្រភេទចលនាខាងឆ្វេង ហើយចុច 'ចាក់ចលនា' ដើម្បីសង្កេតមើលចលនារូបវន្ត។",
    "content": "<div class=\"transition-options-menu\">\n            <div class=\"transition-opt-card active\" data-transition=\"fade\">\n              <h4 style=\"color: var(--color-cyan); font-size: 0.95rem;\">ScreenTransition.Fade</h4>\n              <p style=\"font-size: 0.78rem; color: var(--text-muted);\">ចលនារលាយចូលគ្នាយឺតៗ។ ស័ក្តិសមបំផុតសម្រាប់ស្ថានភាពផ្លាស់ប្តូរ និងការបញ្ជាក់ជោគជ័យ។</p>\n            </div>\n            <div class=\"transition-opt-card\" data-transition=\"cover\">\n              <h4 style=\"color: #60a5fa; font-size: 0.95rem;\">ScreenTransition.Cover</h4>\n              <p style=\"font-size: 0.78rem; color: var(--text-muted);\">រុញអេក្រង់ថ្មីពីស្តាំមកឆ្វេងគ្របពីលើ។ ផ្តល់សញ្ញាថាអ្នកប្រើកំពុងចូលកាន់តែជ្រៅក្នុងកិច្ចការ។</p>\n            </div>\n            <div class=\"transition-opt-card\" data-transition=\"uncover\">\n              <h4 style=\"color: #34d399; font-size: 0.95rem;\">ScreenTransition.UnCover</h4>\n              <p style=\"font-size: 0.78rem; color: var(--text-muted);\">រុញអេក្រង់បច្ចុប្បន្នចេញទៅស្តាំ។ ជាដៃគូធម្មជាតិដ៏ល្អឥតខ្ចោះសម្រាប់ Back()។</p>\n            </div>\n            <div class=\"transition-opt-card\" data-transition=\"none\">\n              <h4 style=\"color: #cbd5e1; font-size: 0.95rem;\">ScreenTransition.None</h4>\n              <p style=\"font-size: 0.78rem; color: var(--text-muted);\">ប្តូរភ្លាមៗដោយគ្មានចលនា។ ស័ក្តិសមសម្រាប់ឧបករណ៍ប្រើប្រាស់រហ័សលើកុំព្យូទ័រ។</p>\n            </div>\n\n            <button id=\"btn-play-transition\" class=\"hud-btn\" style=\"width: 100%; justify-content: center; background: #0078d4; color: #fff; padding: 0.75rem; margin-top: auto;\">\n              ចាក់ចលនា TRANSITION &rarr;\n            </button>\n          </div>\n\n          <div class=\"transition-preview-stage\" id=\"transition-stage-box\">\n            <div id=\"trans-card-a\" style=\"position: absolute; width: 340px; height: 220px; background: rgba(30, 41, 59, 0.95); border: 2px solid #38bdf8; border-radius: 1rem; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: all 0.5s ease;\">\n              <span class=\"card-badge\" style=\"margin-bottom: 0.5rem;\">SCREEN A</span>\n              <h4 style=\"color: #fff;\">ផ្ទាំងគ្រប់គ្រង Dashboard</h4>\n              <p style=\"font-size: 0.8rem; color: var(--text-muted); margin-top: 0.35rem;\">កំពុងរង់ចាំដំណើរការចលនា...</p>\n            </div>\n\n            <div id=\"trans-card-b\" style=\"position: absolute; width: 340px; height: 220px; background: rgba(16, 185, 129, 0.95); border: 2px solid #34d399; border-radius: 1rem; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0; transform: translateX(100%); transition: all 0.5s ease;\">\n              <span class=\"card-badge\" style=\"margin-bottom: 0.5rem; background: #064e3b; color: #6ee7b7;\">SCREEN B</span>\n              <h4 style=\"color: #fff;\">ផ្ទាំងទម្រង់ Form</h4>\n              <p style=\"font-size: 0.8rem; color: #dcfce7; margin-top: 0.35rem;\">ការផ្លាស់ប្តូរបានបញ្ចប់ជោគជ័យ!</p>\n            </div>\n          </div>"
  },
  {
    "title": "ស្វែងយល់ស៊ីជម្រៅ៖ រង្វិលជុំបញ្ជាក់ដំណឹង និងផ្លូវសុវត្ថិភាព",
    "segment": "វគ្គទី ៣៖ រចនាសម្ព័ន្ធ និងយន្តការដំណើរការ",
    "subtitle": "វិធានសុវត្ថិភាពមិនអាចខ្វះបានចំនួនពីរសម្រាប់រាល់កម្មវិធីអាជីវកម្មខ្នាតសហគ្រាស។",
    "content": "<div class=\"card\">\n            <span class=\"consequence-badge\" style=\"background: rgba(16, 185, 129, 0.2); color: #86efac; border-color: rgba(16, 185, 129, 0.4);\">វិធានសុវត្ថិភាពទី ១</span>\n            <h3 style=\"margin: 0.6rem 0;\">ផ្លូវចេញជាកាតព្វកិច្ច (Cancel / Back)</h3>\n            <p style=\"font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1rem;\">\n              កុំឃុំឃាំងអ្នកប្រើប្រាស់ក្នុងទម្រង់ឱ្យសោះ។ ប្រសិនបើកម្មករបើកអេក្រង់នោះដោយច្រឡំ ពួកគេត្រូវតែមានផ្លូវចេញដោយសុវត្ថិភាពដែលមិនប៉ះពាល់ដល់ទិន្នន័យ។\n            </p>\n            <div style=\"background: rgba(15, 23, 42, 0.85); padding: 0.85rem; border-radius: 0.5rem; border: 1px solid var(--border-subtle); font-size: 0.82rem; color: #cbd5e1;\">\n              <strong>បើគ្មានផ្លូវចេញ៖</strong> អ្នកប្រើនឹងវាយទិន្នន័យក្លែងក្លាយដើម្បីតែចង់ចេញពីរទម្រង់។<br>\n              <strong>បើមានផ្លូវចេញ (Back())៖</strong> ទិន្នន័យស្អាត អ្នកប្រើប្រាស់មិនស្លន់ស្លោ។\n            </div>\n          </div>\n\n          <div class=\"card\">\n            <span class=\"consequence-badge\" style=\"background: rgba(59, 130, 246, 0.2); color: #93c5fd; border-color: rgba(59, 130, 246, 0.4);\">វិធានសុវត្ថិភាពទី ២</span>\n            <h3 style=\"margin: 0.6rem 0;\">រង្វិលជុំបញ្ជាក់ដំណឹងជាកាតព្វកិច្ច (Success Screen)</h3>\n            <p style=\"font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1rem;\">\n              កុំទុកឱ្យអ្នកប្រើឈរធ្មឹងសម្លឹងមើលទម្រង់ដែលបាន Submit រួច។ ការប្តូរទៅកាន់អេក្រង់ជោគជ័យភ្លាមៗផ្តល់នូវទំនុកចិត្ត ៣ យ៉ាង៖\n            </p>\n            <div style=\"background: rgba(15, 23, 42, 0.85); padding: 0.85rem; border-radius: 0.5rem; border: 1px solid var(--border-subtle); font-size: 0.82rem; color: #cbd5e1;\">\n              1. <strong>ភស្តុតាងទទួលទិន្នន័យ៖</strong> បង្ហាញលេខយោង Ticket ID។<br>\n              2. <strong>ការកំណត់ការរំពឹងទុក៖</strong> \"ជាងនឹងមកដល់ក្នុងរយៈពេល ១៥ នាទី\"។<br>\n              3. <strong>ការកំណត់ឡើងវិញ៖</strong> ប៊ូតុងច្បាស់លាស់សម្រាប់ត្រឡប់ទៅទំព័រដើម។\n            </div>\n          </div>"
  },
  {
    "title": "ការបង្ហាញផ្ទាល់ដោយគ្រូ៖ ការតភ្ជាប់សៀគ្វី ៣ អេក្រង់",
    "segment": "វគ្គទី ៤៖ ការបង្ហាញផ្ទាល់",
    "subtitle": "ទស្សនាគ្រូបង្ហាញការតភ្ជាប់សៀគ្វីរុករកទាំងមូលក្នុង Power Apps Studio ដោយស្ទាត់ជំនាញ។",
    "content": "<div class=\"card\">\n            <span class=\"obj-num\">1</span>\n            <h4 style=\"margin: 0.6rem 0 0.3rem 0;\">បង្កើត Success Screen</h4>\n            <p style=\"font-size: 0.85rem; color: var(--text-muted); flex: 1;\">\n              ចុច <code>+ New screen</code> &rarr; <code>Blank</code>។ ប្តូរឈ្មោះជា <code>scrSuccessConfirmation</code>។ ដាក់ស្លាកសញ្ញាជោគជ័យ។\n            </p>\n            <div style=\"font-family: var(--font-code); font-size: 0.78rem; color: var(--color-cyan); margin-top: 0.5rem;\">ការរៀបចំក្នុង Tree View</div>\n          </div>\n\n          <div class=\"card\">\n            <span class=\"obj-num\">2</span>\n            <h4 style=\"margin: 0.6rem 0 0.3rem 0;\">តភ្ជាប់ប៊ូតុងទៅមុខ</h4>\n            <p style=\"font-size: 0.85rem; color: var(--text-muted); flex: 1;\">\n              លើ <code>scrHome</code> រើស <code>btnNewTicket</code>។ ក្នុង <code>OnSelect</code> សរសេរ៖ <code>Navigate(scrNewRequest, ScreenTransition.Cover)</code>។\n            </p>\n            <div style=\"font-family: var(--font-code); font-size: 0.78rem; color: #60a5fa; margin-top: 0.5rem;\">ផ្លូវរុករកទៅមុខ</div>\n          </div>\n\n          <div class=\"card\">\n            <span class=\"obj-num\">3</span>\n            <h4 style=\"margin: 0.6rem 0 0.3rem 0;\">តភ្ជាប់ផ្លូវ Cancel ចេញ</h4>\n            <p style=\"font-size: 0.85rem; color: var(--text-muted); flex: 1;\">\n              លើ <code>scrNewRequest</code> ដាក់ <code>icnBack</code>។ ក្នុង <code>OnSelect</code> សរសេរ៖ <code>Back(ScreenTransition.UnCover)</code>។\n            </p>\n            <div style=\"font-family: var(--font-code); font-size: 0.78rem; color: #a78bfa; margin-top: 0.5rem;\">ផ្លូវសុវត្ថិភាពចាកចេញ</div>\n          </div>\n\n          <div class=\"card\">\n            <span class=\"obj-num\">4</span>\n            <h4 style=\"margin: 0.6rem 0 0.3rem 0;\">តភ្ជាប់ Submit និងរង្វិលជុំ</h4>\n            <p style=\"font-size: 0.85rem; color: var(--text-muted); flex: 1;\">\n              លើ <code>scrNewRequest</code> កំណត់ <code>btnSubmit.OnSelect = Navigate(scrSuccessConfirmation, ScreenTransition.Fade)</code>។\n            </p>\n            <div style=\"font-family: var(--font-code); font-size: 0.78rem; color: #34d399; margin-top: 0.5rem;\">រង្វិលជុំពេញលេញ</div>\n          </div>"
  },
  {
    "title": "បន្ទប់វិនិច្ឆ័យបញ្ហាផ្ទាល់៖ កែសម្រួលបញ្ហាអ្នកប្រើជាប់គាំងក្នុង App",
    "segment": "វគ្គទី ៥៖ ការអនុវត្តដោយមានការណែនាំ",
    "subtitle": "ពិសោធន៍បញ្ហាជាប់គាំងនៅខាងឆ្វេង រួចអនុវត្តដំណោះស្រាយដើម្បីបើកផ្លូវចេញនៅខាងស្តាំ។",
    "content": "<div class=\"diagnostic-panel\" style=\"border-color: rgba(239, 68, 68, 0.4);\">\n            <div style=\"display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;\">\n              <h3 style=\"color: #fca5a5; font-size: 1.05rem;\">អេក្រង់មានកំហុស៖ អ្នកប្រើជាប់គាំង</h3>\n              <span class=\"consequence-badge\">កំហុស Dead-End</span>\n            </div>\n            <p style=\"font-size: 0.82rem; color: var(--text-muted); margin-bottom: 1rem;\">\n              ចំណាំ៖ គ្មានប៊ូតុង Back ឡើយ។ សាកល្បងចុច \"ព្យាយាមចាកចេញ\"៖\n            </p>\n\n            <div style=\"background: #020617; padding: 1.25rem; border-radius: 0.75rem; border: 1px solid var(--border-subtle); flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;\">\n              <span class=\"card-badge\" style=\"margin-bottom: 0.5rem;\">scrToolPicker</span>\n              <h4 style=\"color: #fff; margin-bottom: 0.25rem;\">ជ្រើសរើសឧបករណ៍គ្រឿងបន្លាស់</h4>\n              <p style=\"font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;\">គ្មានផ្លូវ Cancel ឬ Back សម្រាប់ចាកចេញឡើយ។</p>\n              <button id=\"btn-diag-trapped\" class=\"hud-btn\" style=\"background: rgba(239, 68, 68, 0.2); color: #fca5a5; border-color: rgba(239, 68, 68, 0.4);\">\n                ព្យាយាមចាកចេញពីអេក្រង់ &rarr;\n              </button>\n            </div>\n\n            <div id=\"diag-trapped-msg\" style=\"margin-top: 0.75rem; font-size: 0.82rem; color: #fca5a5; min-height: 24px;\"></div>\n          </div>\n\n          <!-- Fixed State -->\n          <div class=\"diagnostic-panel\" style=\"border-color: rgba(16, 185, 129, 0.4);\">\n            <div style=\"display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;\">\n              <h3 style=\"color: #86efac; font-size: 1.05rem;\">អេក្រង់ដែលបានកែសម្រួល៖ បំពាក់ Back()</h3>\n              <span class=\"consequence-badge\" style=\"background: rgba(16, 185, 129, 0.2); color: #86efac; border-color: rgba(16, 185, 129, 0.4);\">បានដោះស្រាយ</span>\n            </div>\n            <p style=\"font-size: 0.82rem; color: var(--text-muted); margin-bottom: 1rem;\">\n              បានកំណត់ផ្លូវត្រឡប់ក្រោយ៖ <code>icnBack.OnSelect = Back()</code>៖\n            </p>\n\n            <div style=\"background: #020617; padding: 1.25rem; border-radius: 0.75rem; border: 1px solid var(--border-subtle); flex: 1; display: flex; flex-direction: column; position: relative;\">\n              <button id=\"btn-diag-fixed-back\" class=\"hud-btn\" style=\"align-self: flex-start; padding: 0.3rem 0.75rem; font-size: 0.8rem; background: rgba(59, 130, 246, 0.2); color: #93c5fd; border-color: rgba(59, 130, 246, 0.4); margin-bottom: 1rem;\">\n                &larr; Back()\n              </button>\n              <div style=\"text-align: center; margin-top: auto; margin-bottom: auto;\">\n                <span class=\"card-badge\" style=\"margin-bottom: 0.5rem;\">scrToolPicker</span>\n                <h4 style=\"color: #fff; margin-bottom: 0.25rem;\">ជ្រើសរើសឧបករណ៍គ្រឿងបន្លាស់</h4>\n                <p style=\"font-size: 0.8rem; color: #86efac; margin-top: 0.35rem;\">កម្មករអាចចាកចេញដោយសុវត្ថិភាពដោយមិនខូចទិន្នន័យ!</p>\n              </div>\n            </div>\n\n            <div id=\"diag-fixed-msg\" style=\"margin-top: 0.75rem; font-size: 0.82rem; color: #86efac; min-height: 24px;\"></div>\n          </div>"
  },
  {
    "title": "ការអនុវត្តដោយមានការណែនាំ៖ លំហូរ ៣ អេក្រង់នៃការប្រគល់វេន",
    "segment": "វគ្គទី ៥៖ ការអនុវត្តដោយមានការណែនាំ",
    "subtitle": "អនុវត្តតាមការណែនាំ ដោយផ្គូផ្គងចំណុចរុករកទាំង ៣ ក្នុង Studio។",
    "content": "<div class=\"card\">\n            <h3 class=\"card-title\">លក្ខខណ្ឌតម្រូវក្នុងរោងចក្រ</h3>\n            <div class=\"consequence-row\">\n              <span class=\"obj-num\">A</span>\n              <div>\n                <strong>បើកទម្រង់ប្រគល់វេន៖</strong>\n                <p>លើ <code>scrShiftDashboard</code> ប្រធានវេនចុច <code>btnStartHandover</code> &rarr; បើកទម្រង់ជាមួយចលនា Cover។</p>\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"obj-num\">B</span>\n              <div>\n                <strong>បោះបង់ការប្រគល់វេន៖</strong>\n                <p>លើ <code>scrHandoverForm</code> ប្រធានវេនចុច <code>btnCancel</code> &rarr; ដកអេក្រង់ចេញជាមួយ UnCover ត្រឡប់ទៅ Dashboard វិញ។</p>\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"obj-num\">C</span>\n              <div>\n                <strong>បិទកំណត់ហេតុប្រគល់វេន៖</strong>\n                <p>លើ <code>scrHandoverForm</code> ប្រធានវេនចុច <code>btnSealHandover</code> &rarr; រលាយ Fade ចូលទៅកាន់ <code>scrHandoverSuccess</code>។</p>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"card\">\n            <h3 class=\"card-title\">ដំណោះស្រាយស្ថាបត្យកម្មរបស់សិក្ខាកាម</h3>\n            <table style=\"width: 100%; border-collapse: collapse; font-size: 0.85rem; color: var(--text-muted);\">\n              <thead>\n                <tr style=\"border-bottom: 1px solid var(--border-subtle); color: var(--color-cyan); text-align: left;\">\n                  <th style=\"padding: 0.5rem 0.25rem;\">ចំណុច</th>\n                  <th style=\"padding: 0.5rem 0.25rem;\">ឈ្មោះ Control</th>\n                  <th style=\"padding: 0.5rem 0.25rem;\">Property</th>\n                  <th style=\"padding: 0.5rem 0.25rem;\">រូបមន្ត Power Fx</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr style=\"border-bottom: 1px solid var(--border-subtle);\">\n                  <td style=\"padding: 0.6rem 0.25rem; font-weight: 700; color: #fff;\">A</td>\n                  <td style=\"padding: 0.6rem 0.25rem; font-family: var(--font-code); color: #60a5fa;\">btnStartHandover</td>\n                  <td style=\"padding: 0.6rem 0.25rem;\">OnSelect</td>\n                  <td style=\"padding: 0.6rem 0.25rem; font-family: var(--font-code); color: #93c5fd;\">Navigate(scrHandoverForm, ScreenTransition.Cover)</td>\n                </tr>\n                <tr style=\"border-bottom: 1px solid var(--border-subtle);\">\n                  <td style=\"padding: 0.6rem 0.25rem; font-weight: 700; color: #fff;\">B</td>\n                  <td style=\"padding: 0.6rem 0.25rem; font-family: var(--font-code); color: #ef4444;\">btnCancel</td>\n                  <td style=\"padding: 0.6rem 0.25rem;\">OnSelect</td>\n                  <td style=\"padding: 0.6rem 0.25rem; font-family: var(--font-code); color: #fca5a5;\">Back(ScreenTransition.UnCover)</td>\n                </tr>\n                <tr>\n                  <td style=\"padding: 0.6rem 0.25rem; font-weight: 700; color: #fff;\">C</td>\n                  <td style=\"padding: 0.6rem 0.25rem; font-family: var(--font-code); color: #10b981;\">btnSealHandover</td>\n                  <td style=\"padding: 0.6rem 0.25rem;\">OnSelect</td>\n                  <td style=\"padding: 0.6rem 0.25rem; font-family: var(--font-code); color: #86efac;\">Navigate(scrHandoverSuccess, ScreenTransition.Fade)</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>"
  },
  {
    "title": "ការអនុវត្តស្វ័យភាព៖ លំហូរ ៣ អេក្រង់ក្នុងឃ្លាំងឧបករណ៍",
    "segment": "វគ្គទី ៦៖ ការអនុវត្តស្វ័យភាព",
    "subtitle": "ចំណាយពេល ១០ នាទីដើម្បីផ្គូផ្គងចំណុចរុករកទាំង ៤ សម្រាប់ទូ Touchscreen ក្នុងឃ្លាំង។",
    "content": "<div class=\"card\">\n            <h3 class=\"card-title\">សេណារីយ៉ូអាជីវកម្មក្នុងឃ្លាំង Tool Crib</h3>\n            <p style=\"font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1rem;\">\n              កម្មករឈរនៅមុខទូ Touchscreen លើជញ្ជាំងឃ្លាំង។ ចូរតភ្ជាប់កូដរុករកសម្រាប់វគ្គការងាររបស់ពួកគេ៖\n            </p>\n\n            <div class=\"objective-item\">\n              <span class=\"obj-num\">1</span>\n              <div>\n                <strong>ចូលរើសឧបករណ៍៖</strong>\n                <p>លើ <code>scrKioskWelcome</code> ចុច <code>btnCheckoutTool</code> &rarr; រុញ Cover ចូលទៅកាន់ <code>scrPartPicker</code>។</p>\n              </div>\n            </div>\n            <div class=\"objective-item\">\n              <span class=\"obj-num\">2</span>\n              <div>\n                <strong>បោះបង់ការរើស៖</strong>\n                <p>លើ <code>scrPartPicker</code> កម្មករចុច <code>btnAbort</code> &rarr; ត្រឡប់ទៅអេក្រង់ស្វាគមន៍ដើមដោយសុវត្ថិភាព។</p>\n              </div>\n            </div>\n            <div class=\"objective-item\">\n              <span class=\"obj-num\">3</span>\n              <div>\n                <strong>ពិនិត្យការដកចេញ៖</strong>\n                <p>លើ <code>scrPartPicker</code> ចុច <code>btnConfirmCart</code> &rarr; រលាយ Fade ចូលទៅកាន់ <code>scrReceiptSummary</code>។</p>\n              </div>\n            </div>\n            <div class=\"objective-item\">\n              <span class=\"obj-num\">4</span>\n              <div>\n                <strong>បញ្ចប់ និងកំណត់ឡើងវិញ៖</strong>\n                <p>លើ <code>scrReceiptSummary</code> ចុច <code>btnDone</code> &rarr; Fade កំណត់ឡើងវិញទៅកាន់ <code>scrKioskWelcome</code>។</p>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"card\" style=\"border-color: rgba(59, 130, 246, 0.4); background: rgba(15, 23, 42, 0.9);\">\n            <h3 class=\"card-title\">ទម្រង់លទ្ធផលដែលត្រូវប្រគល់</h3>\n            <p style=\"font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;\">\n              សរសេររូបមន្ត Power Fx ឱ្យបានត្រឹមត្រូវសម្រាប់ Property <code>OnSelect</code> នៃប៊ូតុងទាំង ៤៖\n            </p>\n\n            <div style=\"background: rgba(30, 41, 59, 0.6); padding: 1rem; border-radius: 0.6rem; border: 1px dashed var(--border-subtle); font-family: var(--font-code); font-size: 0.82rem; line-height: 1.8;\">\n              Item 1: btnCheckoutTool.OnSelect = [រូបមន្ត Power Fx?]<br>\n              Item 2: btnAbort.OnSelect = [រូបមន្ត Power Fx?]<br>\n              Item 3: btnConfirmCart.OnSelect = [រូបមន្ត Power Fx?]<br>\n              Item 4: btnDone.OnSelect = [រូបមន្ត Power Fx?]\n            </div>\n\n            <div style=\"margin-top: auto; padding: 0.85rem; background: rgba(6, 182, 212, 0.1); border-radius: 0.5rem; font-size: 0.82rem; color: #67e8f9;\">\n              គន្លឹះ៖ ចងចាំថាឈ្មោះ Object (អេក្រង់) មិនប្រើសញ្ញាសម្រង់ \"\" ឡើយ!\n            </div>\n          </div>"
  },
  {
    "title": "ការបកស្រាយការយល់ខុសដ៏គ្រោះថ្នាក់ទាំង ៤ អំពីការរុករក",
    "segment": "វគ្គទី ៦៖ ការអនុវត្តស្វ័យភាព",
    "subtitle": "ជំនួសការយល់ខុសទូទៅរបស់អ្នកចាប់ផ្តើមដំបូង ដោយសភាវគតិវិស្វកម្មវិជ្ជាជីវៈ។",
    "content": "<div class=\"card\">\n            <span class=\"consequence-badge\">ការយល់ខុសទី ១</span>\n            <h4 style=\"margin: 0.5rem 0;\">\"អេក្រង់នឹងរត់ទៅមុខដោយស្វ័យប្រវត្តិតែម្តងពេលបំពេញចប់។\"</h4>\n            <p style=\"font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.65rem;\">\n              <strong>មូលហេតុដែលគិតបែបនេះ៖</strong> កម្មវិធីកម្សាន្តដូចជា TikTok តែងតែរុញទៅមុខដោយស្វ័យប្រវត្តិ។\n            </p>\n            <p style=\"font-size: 0.85rem; color: #86efac; border-left: 2px solid var(--color-success); padding-left: 0.75rem;\">\n              <strong>ការពិតវិស្វកម្ម៖</strong> កម្មវិធីអាជីវកម្មមិនដែលស្មានចិត្តអ្នកប្រើឡើយ។ អ្នកត្រូវតែសរសេរ <code>Navigate()</code> លើ OnSelect នៃប៊ូតុង។\n            </p>\n          </div>\n\n          <div class=\"card\">\n            <span class=\"consequence-badge\">ការយល់ខុសទី ២</span>\n            <h4 style=\"margin: 0.5rem 0;\">\"Navigate() នឹងរក្សាទុកទិន្នន័យចូល SharePoint ដោយស្វ័យប្រវត្តិ។\"</h4>\n            <p style=\"font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.65rem;\">\n              <strong>មូលហេតុដែលគិតបែបនេះ៖</strong> ដោយសារឃើញអេក្រង់ប្តូរ អ្នកចាប់ផ្តើមគិតថាទិន្នន័យក៏ត្រូវបាន Save ដែរ។\n            </p>\n            <p style=\"font-size: 0.85rem; color: #86efac; border-left: 2px solid var(--color-success); padding-left: 0.75rem;\">\n              <strong>ការពិតវិស្វកម្ម៖</strong> <code>Navigate()</code> គ្រាន់តែបង្វែរកែវភ្នែកអ្នកមើលប៉ុណ្ណោះ។ ការរក្សាទុកទិន្នន័យជាការងាររបស់ <code>SubmitForm()</code> ឬ <code>Patch()</code>។\n            </p>\n          </div>\n\n          <div class=\"card\">\n            <span class=\"consequence-badge\">ការយល់ខុសទី ៣</span>\n            <h4 style=\"margin: 0.5rem 0;\">\"Back() គឺដូចគ្នាទៅនឹង Navigate(scrHome) ទាំងស្រុង។\"</h4>\n            <p style=\"font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.65rem;\">\n              <strong>មូលហេតុដែលគិតបែបនេះ៖</strong> ក្នុង App សាមញ្ញដែលមានតែ ២ អេក្រង់ ទាំងពីរនេះសុទ្ធតែត្រឡប់មកអេក្រង់ដើមវិញដូចគ្នា។\n            </p>\n            <p style=\"font-size: 0.85rem; color: #86efac; border-left: 2px solid var(--color-success); padding-left: 0.75rem;\">\n              <strong>ការពិតវិស្វកម្ម៖</strong> <code>Back()</code> ដកប្រវត្តិចេញតាមលំដាប់។ បើអ្នកប្រើមកពីផ្ទាំង Search ការបង្ខំ <code>Navigate(scrHome)</code> នឹងលុបបំបាត់លទ្ធផលស្វែងរករបស់គេចោល!\n            </p>\n          </div>\n\n          <div class=\"card\">\n            <span class=\"consequence-badge\">ការយល់ខុសទី ៤</span>\n            <h4 style=\"margin: 0.5rem 0;\">\"ចលនា Transitions គ្រាន់តែជារបស់លម្អដែលធ្វើឱ្យទូរស័ព្ទយឺត។\"</h4>\n            <p style=\"font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.65rem;\">\n              <strong>មូលហេតុដែលគិតបែបនេះ៖</strong> គិតថាចលនាគ្រាន់តែជាការតុបតែងខាងក្រៅគ្មានប្រយោជន៍។\n            </p>\n            <p style=\"font-size: 0.85rem; color: #86efac; border-left: 2px solid var(--color-success); padding-left: 0.75rem;\">\n              <strong>ការពិតវិស្វកម្ម៖</strong> ចលនាជួយតម្រង់ទិសខួរក្បាលមនុស្ស។ ចលនា <code>Cover</code> ប្រាប់ថា <em>\"កំពុងចូលកាន់តែជ្រៅ\"</em> រីឯ <code>Fade</code> ប្រាប់ថា <em>\"កិច្ចការចប់សព្វគ្រប់\"</em>។\n            </p>\n          </div>"
  },
  {
    "title": "ការវាយតម្លៃចំណេះដឹង៖ សំណួរ ៥ អំពីស្ថាបត្យកម្មរុករក",
    "segment": "វគ្គទី ៧៖ ការវាយតម្លៃ និងត្រួតពិនិត្យ",
    "subtitle": "សាកល្បងការយល់ដឹងរបស់អ្នកអំពីតួនាទី Controls, Properties, និងសុក្រឹតភាពទិន្នន័យ។",
    "content": "<div class=\"quiz-card\">\n            <div style=\"display: flex; justify-content: space-between; align-items: center;\">\n              <span id=\"quiz-question-badge\" class=\"card-badge\">សំណួរទី ១ នៃ ៥</span>\n              <span id=\"quiz-score-badge\" style=\"font-family: var(--font-code); color: var(--color-cyan); font-size: 0.85rem;\">ពិន្ទុ៖ 0/5</span>\n            </div>\n\n            <h3 id=\"quiz-question-title\" style=\"margin: 1rem 0 0.5rem 0; font-size: 1.15rem; line-height: 1.4;\">\n              ហេតុអ្វីបានជាអនុគមន៍ Back() ប្រសើរជាងការសរសេរ Navigate(scrHome) លើប៊ូតុង Cancel?\n            </h3>\n\n            <div class=\"quiz-options\" id=\"quiz-options-container\">\n              <!-- Rendered dynamically by script.js -->\n            </div>\n\n            <div class=\"quiz-feedback\" id=\"quiz-feedback-box\">\n              <!-- Feedback rationale shown upon answering -->\n            </div>\n\n            <div style=\"margin-top: auto; display: flex; justify-content: space-between; align-items: center; padding-top: 1rem;\">\n              <button id=\"btn-quiz-prev\" class=\"hud-btn\" style=\"visibility: hidden;\">&larr; សំណួរមុន</button>\n              <button id=\"btn-quiz-next\" class=\"hud-btn\" style=\"display: none;\">សំណួរបន្ទាប់ &rarr;</button>\n            </div>\n          </div>\n\n          <div class=\"card\" style=\"border-color: rgba(59, 130, 246, 0.3); background: rgba(15, 23, 42, 0.85);\">\n            <h3 class=\"card-title\">សង្ខេបវិធានវិស្វកម្មការរុករក</h3>\n            <div class=\"consequence-row\">\n              <span class=\"card-badge\" style=\"background: rgba(59, 130, 246, 0.2); color: #93c5fd;\">ទៅមុខ</span>\n              <div>\n                <strong>Navigate(TargetScreen, Transition)៖</strong>\n                <p>ទាមទារឈ្មោះអេក្រង់ពិតប្រាកដ (គ្មានសញ្ញាសម្រង់)។ រុញអេក្រង់បច្ចុប្បន្នចូលទៅក្នុង History Stack។</p>\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"card-badge\" style=\"background: rgba(16, 185, 129, 0.2); color: #86efac;\">ថយក្រោយ</span>\n              <div>\n                <strong>Back(Transition)៖</strong>\n                <p>ដកប្រវត្តិចេញពី Stack។ គោរពផ្លូវដែលអ្នកប្រើបានឆ្លងកាត់ និងរក្សាបរិបទតម្រងស្វែងរកនៅដដែល។</p>\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"card-badge\" style=\"background: rgba(6, 182, 212, 0.2); color: #67e8f9;\">សុវត្ថិភាពលំហូរ</span>\n              <div>\n                <strong>ការបញ្ជាក់ និងផ្លូវចេញ៖</strong>\n                <p>រាល់ទម្រង់ត្រូវតែមានផ្លូវ Cancel (Back) ហើយរាល់ការ Submit ត្រូវតែប្តូរទៅកាន់អេក្រង់ Confirmation (Fade)។</p>\n              </div>\n            </div>\n          </div>"
  },
  {
    "title": "បញ្ហាប្រឈមចុងក្រោយ៖ លំហូរ ៣ អេក្រង់នៃការត្រួតពិនិត្យគុណភាព",
    "segment": "វគ្គទី ៧៖ ការវាយតម្លៃ និងត្រួតពិនិត្យ",
    "subtitle": "រចនារចនាសម្ព័ន្ធ Controls ពេញលេញសម្រាប់ទម្រង់ត្រួតពិនិត្យគុណភាពប្រចាំម៉ោងរបស់បុប្ផា។",
    "content": "<div class=\"card\">\n            <h3 class=\"card-title\">សេណារីយ៉ូកន្លែងការងារ និងលក្ខខណ្ឌតម្រូវ</h3>\n            <p style=\"font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1rem;\">\n              អ្នកត្រួតពិនិត្យគុណភាព បុប្ផា ត្រូវពិនិត្យគ្រឿងប្លាស្ទិករៀងរាល់មួយម៉ោងម្តង។ ចូរតភ្ជាប់លំហូរ ៣ អេក្រង់លើឧបករណ៍ស្កេនរបស់គាត់៖\n            </p>\n\n            <div class=\"consequence-row\">\n              <span class=\"obj-num\">1</span>\n              <div>\n                <strong>scrQualityDashboard៖</strong>\n                <p>ចុច <code>btnNewInspection</code> &rarr; រុញ Cover ចូលទៅកាន់ <code>scrInspectionForm</code>។</p>\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"obj-num\">2</span>\n              <div>\n                <strong>scrInspectionForm (ផ្លូវចេញ)៖</strong>\n                <p>ចុច <code>icnCancel</code> &rarr; ដក UnCover ត្រឡប់ទៅផ្ទាំង Dashboard វិញដោយប្រើ <code>Back()</code>។</p>\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"obj-num\">3</span>\n              <div>\n                <strong>scrInspectionForm (បញ្ជូនទិន្នន័យ)៖</strong>\n                <p>ចុច <code>btnLogVerdict</code> &rarr; រលាយ Fade ចូលទៅកាន់ <code>scrInspectionSuccess</code>។</p>\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"obj-num\">4</span>\n              <div>\n                <strong>scrInspectionSuccess (ផ្លូវត្រឡប់ពីរជម្រើស)៖</strong>\n                <p>ជម្រើស A៖ <code>btnLogAnother</code> &rarr; បើកទម្រង់ថ្មី។<br>ជម្រើស B៖ <code>btnBackToDashboard</code> &rarr; ត្រឡប់ទៅផ្ទាំងដើម។</p>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"card\" style=\"border-color: var(--color-cyan); background: rgba(15, 23, 42, 0.9);\">\n            <h3 class=\"card-title\">លទ្ធផលបេសកកម្មដែលត្រូវប្រគល់</h3>\n            <p style=\"font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem;\">\n              នៅក្នុងសៀវភៅការងាររបស់អ្នក ចូរបង្កើតតារាងលក្ខណៈបច្ចេកទេសរុករកទាំង ៤ ចំណុច៖\n            </p>\n\n            <ul style=\"font-size: 0.85rem; color: var(--text-muted); line-height: 1.8; margin-left: 1.2rem; margin-bottom: 1.25rem;\">\n              <li><strong>អេក្រង់ប្រភព</strong> (ឈ្មោះពិតក្នុង Tree View)</li>\n              <li><strong>Control បញ្ជា</strong> (ឈ្មោះប៊ូតុង ឬរូបតំណាងតាមស្តង់ដារ Hungarian)</li>\n              <li><strong>Property គោលដៅ</strong> (<code>OnSelect</code>)</li>\n              <li><strong>រូបមន្ត Power Fx ពិតប្រាកដ</strong> (អនុគមន៍ + អាគុយម៉ង់)</li>\n              <li><strong>ការពន្យល់អំពីចលនា Transition</strong></li>\n            </ul>\n\n            <div style=\"padding: 0.85rem; background: rgba(6, 182, 212, 0.1); border-radius: 0.5rem; font-size: 0.82rem; color: #67e8f9;\">\n              ការវាយតម្លៃផ្អែកលើ៖ ភាពត្រឹមត្រូវនៃ Syntax, ការរក្សាប្រវត្តិ Stack, និងលំហូរ UX បិទជិតគ្មានផ្លូវទាល់!\n            </div>\n          </div>"
  },
  {
    "title": "កម្រិតពិន្ទុវាយតម្លៃ និងដំណោះស្រាយស្ថាបត្យកម្មគំរូ",
    "segment": "វគ្គទី ៧៖ ការវាយតម្លៃ និងត្រួតពិនិត្យ",
    "subtitle": "ផ្ទៀងផ្ទាត់ការរចនារបស់អ្នកធៀបនឹងកម្រិតពិន្ទុទាំង ៤ និងដំណោះស្រាយវិស្វកម្មគំរូ។",
    "content": "<div class=\"card\">\n            <h3 class=\"card-title\">កម្រិតពិន្ទុវាយតម្លៃទាំង ៤ កម្រិត</h3>\n            <div style=\"display: flex; flex-direction: column; gap: 0.65rem; font-size: 0.82rem;\">\n              <div style=\"background: rgba(30, 41, 59, 0.5); padding: 0.65rem; border-radius: 0.4rem; border-left: 3px solid var(--color-cyan);\">\n                <strong>៤ - ល្អឥតខ្ចោះ (Exemplary)៖</strong> Syntax ត្រឹមត្រូវឥតខ្ចោះ; ប្រើ <code>Back()</code> ជាមួយ <code>UnCover</code> សម្រាប់បោះបង់; ប្រើ <code>Fade</code> សម្រាប់បញ្ជាក់ដំណឹង; មានជម្រើសត្រឡប់ពីរផ្លូវ។\n              </div>\n              <div style=\"background: rgba(30, 41, 59, 0.5); padding: 0.65rem; border-radius: 0.4rem; border-left: 3px solid var(--color-success);\">\n                <strong>៣ - កម្រិតជំនាញ (Proficient)៖</strong> រូបមន្ត <code>Navigate()</code> និង <code>Back()</code> ត្រឹមត្រូវ; កំណត់អាគុយម៉ង់ Transition បានច្បាស់លាស់; គ្មានអេក្រង់ទាល់ច្រកឡើយ។\n              </div>\n              <div style=\"background: rgba(30, 41, 59, 0.5); padding: 0.65rem; border-radius: 0.4rem; border-left: 3px solid var(--color-warning);\">\n                <strong>២ - កំពុងអភិវឌ្ឍ (Developing)៖</strong> ប្រើសញ្ញាសម្រង់លើឈ្មោះអេក្រង់; ប្រើ <code>Navigate(scrDashboard)</code> ជំនួសឱ្យ <code>Back()</code> លើប៊ូតុង Cancel។\n              </div>\n              <div style=\"background: rgba(30, 41, 59, 0.5); padding: 0.65rem; border-radius: 0.4rem; border-left: 3px solid var(--color-danger);\">\n                <strong>១ - កម្រិតដំបូង (Beginning)៖</strong> ទុកអេក្រង់ចោលដោយគ្មានផ្លូវចេញ; សរសេររូបមន្តរុករកលើខុស Property។\n              </div>\n            </div>\n          </div>\n\n          <div class=\"card\" style=\"border-color: rgba(16, 185, 129, 0.4); background: rgba(15, 23, 42, 0.9);\">\n            <h3 class=\"card-title\" style=\"color: #86efac;\">ដំណោះស្រាយស្ថាបត្យកម្មគំរូ</h3>\n            <table style=\"width: 100%; border-collapse: collapse; font-size: 0.82rem; color: var(--text-muted);\">\n              <thead>\n                <tr style=\"border-bottom: 1px solid var(--border-subtle); color: #86efac; text-align: left;\">\n                  <th style=\"padding: 0.4rem 0.2rem;\">អេក្រង់</th>\n                  <th style=\"padding: 0.4rem 0.2rem;\">Control</th>\n                  <th style=\"padding: 0.4rem 0.2rem;\">រូបមន្ត Power Fx</th>\n                  <th style=\"padding: 0.4rem 0.2rem;\">ចលនា Transition</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr style=\"border-bottom: 1px solid var(--border-subtle);\">\n                  <td style=\"padding: 0.4rem 0.2rem; color: #fff;\">Dashboard</td>\n                  <td style=\"padding: 0.4rem 0.2rem; font-family: var(--font-code); color: var(--color-cyan);\">btnNewInspection</td>\n                  <td style=\"padding: 0.4rem 0.2rem; font-family: var(--font-code);\">Navigate(scrInspectionForm, ScreenTransition.Cover)</td>\n                  <td style=\"padding: 0.4rem 0.2rem;\">Cover</td>\n                </tr>\n                <tr style=\"border-bottom: 1px solid var(--border-subtle);\">\n                  <td style=\"padding: 0.4rem 0.2rem; color: #fff;\">Form</td>\n                  <td style=\"padding: 0.4rem 0.2rem; font-family: var(--font-code); color: #fca5a5;\">icnCancel</td>\n                  <td style=\"padding: 0.4rem 0.2rem; font-family: var(--font-code);\">Back(ScreenTransition.UnCover)</td>\n                  <td style=\"padding: 0.4rem 0.2rem;\">UnCover</td>\n                </tr>\n                <tr style=\"border-bottom: 1px solid var(--border-subtle);\">\n                  <td style=\"padding: 0.4rem 0.2rem; color: #fff;\">Form</td>\n                  <td style=\"padding: 0.4rem 0.2rem; font-family: var(--font-code); color: #34d399;\">btnLogVerdict</td>\n                  <td style=\"padding: 0.4rem 0.2rem; font-family: var(--font-code);\">Navigate(scrInspectionSuccess, ScreenTransition.Fade)</td>\n                  <td style=\"padding: 0.4rem 0.2rem;\">Fade</td>\n                </tr>\n                <tr style=\"border-bottom: 1px solid var(--border-subtle);\">\n                  <td style=\"padding: 0.4rem 0.2rem; color: #fff;\">Success</td>\n                  <td style=\"padding: 0.4rem 0.2rem; font-family: var(--font-code); color: #60a5fa;\">btnLogAnother</td>\n                  <td style=\"padding: 0.4rem 0.2rem; font-family: var(--font-code);\">Navigate(scrInspectionForm, ScreenTransition.Cover)</td>\n                  <td style=\"padding: 0.4rem 0.2rem;\">Cover</td>\n                </tr>\n                <tr>\n                  <td style=\"padding: 0.4rem 0.2rem; color: #fff;\">Success</td>\n                  <td style=\"padding: 0.4rem 0.2rem; font-family: var(--font-code); color: #cbd5e1;\">btnBackToDash</td>\n                  <td style=\"padding: 0.4rem 0.2rem; font-family: var(--font-code);\">Navigate(scrQualityDashboard, ScreenTransition.Fade)</td>\n                  <td style=\"padding: 0.4rem 0.2rem;\">Fade</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>"
  },
  {
    "title": "ការពិនិត្យឡើងវិញ ១៥ នាទី៖ កែសម្រួលលំហូរក្នុងឃ្លាំងទំនិញ",
    "segment": "វគ្គទី ៨៖ ស្ពានតភ្ជាប់ និងកិច្ចការផ្ទះ",
    "subtitle": "អនុវត្តជំនាញវិស្វកម្ម Controls របស់អ្នកដើម្បីកែលម្អអេក្រង់ទទួលទំនិញក្នុងឃ្លាំងដែលមានកំហុស។",
    "content": "<div class=\"card\">\n            <h3 class=\"card-title\">លំហូរ App ក្នុងឃ្លាំងដឹកជញ្ជូនដែលមានបញ្ហា</h3>\n            <p style=\"font-size: 0.88rem; color: var(--text-muted); margin-bottom: 0.85rem;\">\n              នេះជាដ្យាក្រាមលំហូរ App មកពីឃ្លាំងដឹកជញ្ជូនទំនិញមួយ៖\n            </p>\n\n            <div class=\"consequence-row\">\n              <span class=\"consequence-badge\">កំហុស ១</span>\n              <div>\n                <strong>scrScanner គ្មានប៊ូតុង Back ឡើយ!</strong> មានតែពាក្យ \"Finish\"។ កម្មករមិនអាចបោះបង់ការស្កេនខុសបានទេ។\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"consequence-badge\">កំហុស ២</span>\n              <div>\n                <strong>ចុច \"Finish\" លោតត្រង់ទៅកាន់ Welcome ភ្លាម!</strong> គ្មានអេក្រង់បញ្ជាក់លទ្ធផលបង្ហាញលេខកូដវិក្កយបត្រទេ។\n              </div>\n            </div>\n            <div class=\"consequence-row\">\n              <span class=\"consequence-badge\">កំហុស ៣</span>\n              <div>\n                <strong>អេក្រង់ Help ឃុំឃាំងអ្នកប្រើ៖</strong> ចុច \"Done\" លើ `scrHelp` បែរជាបង្ខំទៅ Home បាត់ការស្កេនអស់រលីង!\n              </div>\n            </div>\n          </div>\n\n          <div class=\"card\">\n            <h3 class=\"card-title\">កិច្ចការផ្ទះ ១៥ នាទីរបស់អ្នក</h3>\n            <p style=\"font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1rem;\">\n              នៅក្នុងសៀវភៅកត់ត្រាផ្ទាល់ខ្លួន ចូរកែសម្រួលលំហូរនេះទៅជាលក្ខណៈបច្ចេកទេសស្អាត ៤ ជំហាន៖\n            </p>\n\n            <ol style=\"font-size: 0.85rem; color: var(--text-muted); line-height: 1.8; margin-left: 1.2rem; margin-bottom: 1.25rem;\">\n              <li>បន្ថែម <strong>Confirmation Screen</strong> ដែលបាត់ ហើយតភ្ជាប់កូដប្តូរអេក្រង់ទៅមុខ (Navigate)។</li>\n              <li>ជំនួសការបង្ខំលោតទៅ Home លើ `scrHelp` ដោយប្រើ <code>Back()</code>។</li>\n              <li>ដាក់ប៊ូតុង Cancel លើ `scrScanner` ដោយប្រើ <code>Back()</code>។</li>\n              <li>សរសេរ <strong>រូបមន្ត Power Fx ទាំង ៤</strong> ឱ្យបានត្រឹមត្រូវ។</li>\n            </ol>\n\n            <div style=\"margin-top: auto; padding: 0.85rem; background: rgba(59, 130, 246, 0.1); border-radius: 0.5rem; font-size: 0.82rem; color: #93c5fd;\">\n              ពេលវេលាពិនិត្យ៖ ត្រឹមតែ ១៥ នាទីមុនពេលចាប់ផ្តើមថ្នាក់រៀនថ្ងៃទី ១៦ ស្អែកនេះ!\n            </div>\n          </div>"
  },
  {
    "title": "ផែនទីតភ្ជាប់កម្មវិធីសិក្សា៖ ថ្ងៃទី ១៥ &rarr; ថ្ងៃទី ១៦",
    "segment": "វគ្គទី ៨៖ ស្ពានតភ្ជាប់ និងកិច្ចការផ្ទះ",
    "subtitle": "ពី Controls ដាច់ៗដោយឡែក ឈានទៅកាន់ដំណើរការអ្នកប្រើប្រាស់ពហុអេក្រង់ដែលតភ្ជាប់គ្នា។",
    "content": "<div class=\"card\">\n            <span class=\"card-badge\">ម្សិលមិញ (ថ្ងៃទី ១៤)</span>\n            <h3 class=\"card-title\">តួនាទី Controls និង Properties</h3>\n            <p class=\"card-body\">\n              យើងបានយល់ច្បាស់ពីមុខងារ Controls៖ Labels បង្ហាញព័ត៌មាន, Inputs ប្រមូលអត្ថបទ, Dropdowns ធានាជម្រើសត្រឹមត្រូវ, និង Buttons បញ្ជាសកម្មភាព។\n            </p>\n          </div>\n\n          <div class=\"card\" style=\"border-color: rgba(59, 130, 246, 0.4); background: rgba(30, 41, 59, 0.85);\">\n            <span class=\"card-badge\" style=\"background: rgba(59, 130, 246, 0.2); color: #93c5fd;\">ថ្ងៃនេះ (ថ្ងៃទី ១៥)</span>\n            <h3 class=\"card-title\">ការប្តូរអេក្រង់ និងលំហូរអ្នកប្រើ (Navigation)</h3>\n            <p class=\"card-body\">\n              យើងបានតភ្ជាប់ Controls ទាំងនោះឱ្យក្លាយជាដំណើរការដ៏រលូនដោយប្រើ <code>Navigate()</code> និង <code>Back()</code> ដោយផ្តល់នូវចលនាផ្លាស់ប្តូរ និងរង្វិលជុំបញ្ជាក់ដំណឹង។\n            </p>\n          </div>\n\n          <div class=\"card\" style=\"border-color: var(--color-cyan); box-shadow: 0 0 20px rgba(6, 182, 212, 0.2);\">\n            <span class=\"card-badge\" style=\"background: rgba(6, 182, 212, 0.2); color: #67e8f9;\">ថ្ងៃស្អែក (ថ្ងៃទី ១៦)</span>\n            <h3 class=\"card-title\">តក្កវិជ្ជា Control ឌីណាមិក</h3>\n            <p class=\"card-body\">\n              យើងនឹងធ្វើឱ្យ Controls មានប្រតិកម្មវៃឆ្លាត! យើងនឹងចាក់សោប៊ូតុង Submit រហូតដល់បំពេញគ្រប់ប្រអប់, លាក់ផ្ទាំងព្រមានតាមលក្ខខណ្ឌ, និងសរសេររូបមន្តផ្ទៀងផ្ទាត់ដំបូង!\n            </p>\n          </div>"
  }
];

  // Cache English slide contents, titles, and subtitles
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
  // 3. INTERACTIVE WIDGET 4: QUIZ QUESTIONS DATA
  // --------------------------------------------------------------------------
  const QUIZ_QUESTIONS = [
    {
      questionEn: "Why is the Back() function architecturally superior to hardcoding Navigate(scrHome) on a Cancel button?",
      questionKh: "ហេតុអ្វីបានជាអនុគមន៍ Back() ប្រសើរជាងការសរសេរ Navigate(scrHome) លើប៊ូតុង Cancel?",
      optionsEn: [
        "Because Back() uses less tablet battery power than Navigate().",
        "Because Back() pops the memory history stack, returning the user to wherever they arrived from and preserving their search/filter context.",
        "Because Navigate(scrHome) is an obsolete formula banned by Microsoft.",
        "Because Back() automatically translates the screen to another language."
      ],
      optionsKh: [
        "ពីព្រោះ Back() ប្រើប្រាស់ថាមពលថ្ម Tablet តិចជាង Navigate()។",
        "ពីព្រោះ Back() ដកប្រវត្តិចេញពី Stack ដោយនាំអ្នកប្រើត្រឡប់ទៅកន្លែងណាដែលពួកគេទើបឆ្លងកាត់ និងរក្សាបរិបទស្វែងរកនៅដដែល។",
        "ពីព្រោះ Navigate(scrHome) ជារូបមន្តចាស់ដែល Microsoft ហាមឃាត់មិនឱ្យប្រើ។",
        "ពីព្រោះ Back() បកប្រែភាសាលើអេក្រង់ដោយស្វ័យប្រវត្តិ។"
      ],
      correctIndex: 1,
      explanationEn: "Correct! Back() reads the runtime history stack, preserving previous search terms and filter states. Hardcoding Navigate(scrHome) destroys user context.",
      explanationKh: "ត្រឹមត្រូវ! Back() អានប្រវត្តិពី Memory Stack ដោយរក្សាពាក្យស្វែងរក និងតម្រងចាស់។ ការសរសេរ Navigate(scrHome) នឹងលុបបំបាត់ការងារចាស់របស់គេចោល។"
    },
    {
      questionEn: "What happens if an operator submits an incident report, but the developer forgot to add a Navigate() formula to btnSubmit.OnSelect?",
      questionKh: "តើមានអ្វីកើតឡើង ប្រសិនបើកម្មករចុច Submit លើរបាយការណ៍ តែអ្នកបង្កើត App ភ្លេចដាក់កូដ Navigate() លើ OnSelect?",
      optionsEn: [
        "The tablet catches fire and burns the battery.",
        "The computer prompts the user for their credit card.",
        "The screen remains frozen on the form; the anxious operator taps Submit multiple times, creating duplicate database records.",
        "The app automatically exits to the Windows desktop."
      ],
      optionsKh: [
        "ឧបករណ៍ Tablet ឡើងកម្តៅខ្លាំងឆេះធ្លាក់ថ្ម។",
        "កុំព្យូទ័រទាមទារឱ្យអ្នកប្រើបញ្ចូលកាតឥណទាន។",
        "អេក្រង់នៅទ្រឹងស្ងៀមលើទម្រង់ចាស់; កម្មករស្លន់ស្លោចុច Submit ផ្ទួនៗជាច្រើនដង បង្កើតបានប័ណ្ណស្ទួនក្នុង Database។",
        "App នឹងបិទខ្លួនឯងចេញទៅកាន់ Windows Desktop ដោយស្វ័យប្រវត្តិ។"
      ],
      correctIndex: 2,
      explanationEn: "Correct! Without transition feedback to a Confirmation Screen, users assume their tap didn't register and tap Submit repeatedly, flooding the database with duplicates.",
      explanationKh: "ត្រឹមត្រូវ! បើគ្មានការប្តូរទៅកាន់ផ្ទាំង Confirmation ទេ អ្នកប្រើប្រាស់នឹងគិតថាចុចមិនចូល ហើយចុច Submit ផ្ទួនៗ បង្កឱ្យកើតមានទិន្នន័យស្ទួនពេញប្រព័ន្ធ។"
    },
    {
      questionEn: "In the formula Navigate(scrSuccessConfirmation, ScreenTransition.Fade), what is the job of the second argument?",
      questionKh: "ក្នុងរូបមន្ត Navigate(scrSuccessConfirmation, ScreenTransition.Fade) តើអាគុយម៉ង់ទីពីរមានតួនាទីអ្វី?",
      optionsEn: [
        "It defines the visual animation applied during the transition, signaling a completed state change to the operator.",
        "It sets the font size of the next screen.",
        "It encrypts the network connection to SharePoint.",
        "It deletes the previous screen from the tablet."
      ],
      optionsKh: [
        "វាកំណត់ចលនារូបវន្តដែលត្រូវបង្ហាញពេលប្តូរអេក្រង់ ដោយផ្តល់សញ្ញាថាដំណើរការការងារត្រូវបានបញ្ចប់សព្វគ្រប់។",
        "វាកំណត់ទំហំអក្សរសម្រាប់អេក្រង់បន្ទាប់។",
        "វាការពារសុវត្ថិភាពបណ្តាញអ៊ីនធឺណិតទៅកាន់ SharePoint។",
        "វាលុបអេក្រង់មុនចោលពីក្នុង Tablet។"
      ],
      correctIndex: 0,
      explanationEn: "Correct! ScreenTransition.Fade provides smooth visual continuity, communicating to the human brain that a task phase has cleanly finished.",
      explanationKh: "ត្រឹមត្រូវ! ScreenTransition.Fade ផ្តល់នូវចលនារលាយយ៉ាងរលូន ដែលប្រាប់ទៅខួរក្បាលមនុស្សថា ដំណាក់កាលការងារមួយត្រូវបានបញ្ចប់ដោយជោគជ័យ។"
    },
    {
      questionEn: "Why is a Cancel or Back button considered a mandatory safety requirement on data collection forms?",
      questionKh: "ហេតុអ្វីបានជាប៊ូតុង Cancel ឬ Back ត្រូវបានចាត់ទុកជាលក្ខខណ្ឌសុវត្ថិភាពជាកាតព្វកិច្ចលើទម្រង់បញ្ចូលទិន្នន័យ?",
      optionsEn: [
        "Because Microsoft enforces a $50 fine if you leave it out.",
        "To provide an escape route so operators who enter by accident aren't forced to submit fake/test data just to exit.",
        "Because forms look ugly without red buttons.",
        "To restart the tablet's operating system."
      ],
      optionsKh: [
        "ពីព្រោះ Microsoft នឹងពិន័យប្រាក់ $50 ប្រសិនបើអ្នកមិនដាក់វា។",
        "ដើម្បីផ្តល់ផ្លូវចេញប្រកបដោយសុវត្ថិភាព ការពារកុំឱ្យកម្មករដែលបើកច្រឡំត្រូវបង្ខំចិត្ត Submit ទិន្នន័យក្លែងក្លាយដើម្បីតែចង់ចេញ។",
        "ពីព្រោះទម្រង់មើលទៅមិនស្អាតបើគ្មានប៊ូតុងពណ៌ក្រហម។",
        "ដើម្បី Restart ប្រព័ន្ធប្រតិបត្តិការរបស់ Tablet ឡើងវិញ។"
      ],
      correctIndex: 1,
      explanationEn: "Correct! An escape route prevents trapped user panic. Without it, operators enter bogus text just to exit, directly polluting production databases.",
      explanationKh: "ត្រឹមត្រូវ! ផ្លូវចេញការពារកុំឱ្យអ្នកប្រើប្រាស់ស្លន់ស្លោ។ បើគ្មានវា កម្មករនឹងវាយអក្សរផ្តេសផ្តាសដើម្បីតែចង់ចេញ ដែលនាំឱ្យខូចទិន្នន័យក្នុងរោងចក្រ។"
    },
    {
      questionEn: "Does the formula Navigate(scrConfirmation) automatically save the operator's input to SharePoint? Why or why not?",
      questionKh: "តើរូបមន្ត Navigate(scrConfirmation) នឹងរក្សាទុកទិន្នន័យចូល SharePoint ដោយស្វ័យប្រវត្តិដែរឬទេ? ពីព្រោះអ្វី?",
      optionsEn: [
        "Yes, Navigate() saves all data automatically in modern Power Apps.",
        "No. Navigate() is strictly a visual camera transport command; writing data requires SubmitForm() or Patch().",
        "Yes, but only if the tablet is connected to Wi-Fi.",
        "No, because Navigate() only works with Excel spreadsheets."
      ],
      optionsKh: [
        "បាទ រក្សាទុក, Navigate() នឹង Save ទិន្នន័យទាំងអស់ដោយស្វ័យប្រវត្តិក្នង Power Apps សម័យថ្មី។",
        "ទេ មិនរក្សាទុកទេ! Navigate() គ្រាន់តែជាបញ្ជាបង្វែរកែវភ្នែកកាមេរ៉ាប៉ុណ្ណោះ; ការរក្សាទុកទិន្នន័យទាមទារ SubmitForm() ឬ Patch()។",
        "បាទ រក្សាទុក, ប៉ុន្តែទាល់តែ Tablet ភ្ជាប់ Wi-Fi។",
        "ទេ មិនរក្សាទុកទេ, ពីព្រោះ Navigate() ដំណើរការតែជាមួយ Excel ប៉ុណ្ណោះ។"
      ],
      correctIndex: 1,
      explanationEn: "Correct! Never confuse camera navigation with database writes. Navigate() transports the view; SubmitForm() or Patch() writes to the database.",
      explanationKh: "ត្រឹមត្រូវ! កុំច្រឡំរវាងការប្តូរអេក្រង់ និងការសរសេរទិន្នន័យចូល Database។ Navigate() គ្រាន់តែប្តូរអេក្រង់ រីឯ SubmitForm() ឬ Patch() ទើបជាអ្នក Save។"
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
  // 5. BILINGUAL LANGUAGE ENGINE (ENGLISH / KHMER + SUBTITLES)
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

    // Swap slide contents, titles, and subtitles
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

    // Re-initialize active widgets
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
  // 10. INTERACTIVE WIDGET 1: MULTI-SCREEN FLOW SIMULATOR
  // --------------------------------------------------------------------------
  function initWidget1() {
    const scrHome = document.getElementById('sim-scr-home');
    const scrForm = document.getElementById('sim-scr-form');
    const scrSuccess = document.getElementById('sim-scr-success');

    const btnGotoForm = document.getElementById('sim-btn-goto-form');
    const btnCancelForm = document.getElementById('sim-btn-cancel-form');
    const btnSubmitForm = document.getElementById('sim-btn-submit-form');
    const btnReturnHome = document.getElementById('sim-btn-return-home');

    const activeScreenLabel = document.getElementById('sim-active-screen-name');
    const prevScreenLabel = document.getElementById('sim-stack-prev-name');
    const lastFormulaLabel = document.getElementById('sim-last-formula');

    if (!scrHome || !scrForm || !scrSuccess) return;

    let historyStack = [];

    function switchSimScreen(fromScreen, toScreen, formulaUsed) {
      if (fromScreen) fromScreen.classList.remove('active');
      if (toScreen) toScreen.classList.add('active');

      if (activeScreenLabel) {
        activeScreenLabel.textContent = toScreen.id.replace('sim-', '');
      }

      if (prevScreenLabel) {
        const prev = historyStack.length ? historyStack[historyStack.length - 1] : '(None - Root)';
        prevScreenLabel.textContent = prev;
      }

      if (lastFormulaLabel) {
        lastFormulaLabel.textContent = formulaUsed;
      }
    }

    if (btnGotoForm) {
      btnGotoForm.onclick = () => {
        historyStack.push('scrHome');
        switchSimScreen(scrHome, scrForm, 'Navigate(scrNewRequest, ScreenTransition.Cover)');
      };
    }

    if (btnCancelForm) {
      btnCancelForm.onclick = () => {
        const popped = historyStack.pop() || 'scrHome';
        switchSimScreen(scrForm, scrHome, 'Back(ScreenTransition.UnCover)');
      };
    }

    if (btnSubmitForm) {
      btnSubmitForm.onclick = () => {
        historyStack.push('scrNewRequest');
        switchSimScreen(scrForm, scrSuccess, 'Navigate(scrSuccessConfirmation, ScreenTransition.Fade)');
      };
    }

    if (btnReturnHome) {
      btnReturnHome.onclick = () => {
        historyStack = [];
        switchSimScreen(scrSuccess, scrHome, 'Navigate(scrHome, ScreenTransition.Fade)');
      };
    }
  }

  // --------------------------------------------------------------------------
  // 11. INTERACTIVE WIDGET 2: SCREEN TRANSITION MATRIX LAB
  // --------------------------------------------------------------------------
  function initWidget2() {
    const optCards = document.querySelectorAll('.transition-opt-card');
    const btnPlay = document.getElementById('btn-play-transition');
    const cardA = document.getElementById('trans-card-a');
    const cardB = document.getElementById('trans-card-b');

    if (!optCards.length || !btnPlay || !cardA || !cardB) return;

    let selectedTransition = 'fade';

    optCards.forEach(card => {
      card.addEventListener('click', () => {
        optCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        selectedTransition = card.getAttribute('data-transition') || 'fade';
      });
    });

    btnPlay.onclick = () => {
      // Reset cards
      cardA.style.transition = 'none';
      cardB.style.transition = 'none';
      cardA.style.opacity = '1';
      cardA.style.transform = 'translateX(0)';
      cardB.style.opacity = '0';
      cardB.style.transform = 'translateX(100%)';
      void cardA.offsetWidth; // reflow

      cardA.style.transition = 'all 0.5s ease';
      cardB.style.transition = 'all 0.5s ease';

      if (selectedTransition === 'fade') {
        cardA.style.opacity = '0';
        cardB.style.transform = 'translateX(0)';
        cardB.style.opacity = '1';
      } else if (selectedTransition === 'cover') {
        cardA.style.transform = 'translateX(-20%)';
        cardA.style.opacity = '0.5';
        cardB.style.transform = 'translateX(0)';
        cardB.style.opacity = '1';
      } else if (selectedTransition === 'uncover') {
        cardA.style.transform = 'translateX(100%)';
        cardA.style.opacity = '0';
        cardB.style.transform = 'translateX(0)';
        cardB.style.opacity = '1';
      } else if (selectedTransition === 'none') {
        cardA.style.transition = 'none';
        cardB.style.transition = 'none';
        cardA.style.opacity = '0';
        cardB.style.transform = 'translateX(0)';
        cardB.style.opacity = '1';
      }
    };
  }

  // --------------------------------------------------------------------------
  // 12. INTERACTIVE WIDGET 3: TRAPPED USER DIAGNOSTIC LAB
  // --------------------------------------------------------------------------
  function initWidget3() {
    const btnTrapped = document.getElementById('btn-diag-trapped');
    const trappedMsg = document.getElementById('diag-trapped-msg');
    const btnFixedBack = document.getElementById('btn-diag-fixed-back');
    const fixedMsg = document.getElementById('diag-fixed-msg');

    if (btnTrapped && trappedMsg) {
      btnTrapped.onclick = () => {
        trappedMsg.textContent = isKhmerActive 
          ? 'កំហុសធ្ងន់ធ្ងរ៖ គ្មានកូដប្តូរអេក្រង់សម្រាប់ចាកចេញឡើយ! កម្មករជាប់គាំងក្នុងទម្រង់។'
          : 'FATAL UX BUG: No Back/Cancel route exists! Operator is trapped on screen.';
      };
    }

    if (btnFixedBack && fixedMsg) {
      btnFixedBack.onclick = () => {
        fixedMsg.textContent = isKhmerActive 
          ? 'ជោគជ័យ៖ Back() បានដំណើរការយ៉ាងរលូន ដោយនាំកម្មករត្រឡប់ទៅផ្ទាំង Dashboard វិញដោយសុវត្ថិភាព!'
          : 'SUCCESS: Back() executed smoothly. Operator safely returned to dashboard without corrupting data!';
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

    // Default laser to active
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
