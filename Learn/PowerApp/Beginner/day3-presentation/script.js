/**
 * ============================================================================
 * POWER APPS FOUNDATION: DAY 3 PRESENTATION ENGINE
 * Topic: Data — What an App Knows and Remembers
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

  // Interactive Quiz State
  let currentQuizIndex = 0;
  let quizScore = 0;
  let userAnswers = {};

  const QUIZ_QUESTIONS = [
    {
      qEn: "1. Why is an employee phone number like '+855-12-345-678' stored as Text instead of a Number?",
      qKh: "១. ហេតុអ្វីបានជាលេខទូរស័ព្ទបុគ្គលិកដូចជា '+855-12-345-678' ត្រូវរក្សាទុកជា អត្ថបទ (Text) មិនមែនជា លេខ (Number)?",
      optionsEn: [
        "A) Because it has more than 8 digits.",
        "B) Because you will never do math on it, and storing as number drops plus signs and leading zeros.",
        "C) Because Power Apps does not support numbers larger than 100.",
        "D) Because phone numbers change frequently."
      ],
      optionsKh: [
        "A) ពីព្រោះវាមានច្រើនជាង ៨ ខ្ទង់។",
        "B) ពីព្រោះយើងមិនដែលធ្វើប្រមាណវិធីគណិតវិទ្យាលើវាទេ ហើយការរក្សាទុកជាលេខនឹងធ្វើឱ្យបាត់សញ្ញាបូក និងលេខសូន្យខាងមុខ។",
        "C) ពីព្រោះ Power Apps មិនគាំទ្រលេខដែលធំជាង ១០០ ឡើយ។",
        "D) ពីព្រោះលេខទូរស័ព្ទផ្លាស់ប្តូរជាញឹកញាប់។"
      ],
      correctIndex: 1,
      explanationEn: "Correct! The Golden Rule: If you never add, subtract, or average a value, it belongs in Text. Plus, numbers drop leading zeros (02138 -> 2138) and cannot hold '+'.",
      explanationKh: "ត្រឹមត្រូវណាស់! វិធានមាស៖ ប្រសិនបើអ្នកមិនដែលបូក ដក ឬរកមធ្យមភាគលើតម្លៃណាមួយទេ នោះវាជា អត្ថបទ (Text)។ ម្យ៉ាងទៀត លេខនឹងកាត់លេខសូន្យខាងមុខចោល ហើយមិនអាចផ្ទុកសញ្ញា '+' បានទេ។"
    },
    {
      qEn: "2. What happens if an app treats two pallet quantity inputs ('10' and '20') as Text instead of Numbers?",
      qKh: "២. តើមានអ្វីកើតឡើងប្រសិនបើកម្មវិធីចាត់ទុកការបញ្ចូលចំនួនជើងទម្រទំនិញ '10' និង '20' ជាអត្ថបទ ជំនួសឱ្យលេខ?",
      optionsEn: [
        "A) The computer crashes immediately with a blue screen.",
        "B) It adds them mathematically to 30.",
        "C) It concatenates the text strings into '1020', potentially ordering 1,020 pallets!",
        "D) It converts them to Yes/No booleans."
      ],
      optionsKh: [
        "A) កុំព្យូទ័រនឹងគាំងភ្លាមៗដោយចេញផ្ទាំងពណ៌ខៀវ។",
        "B) វានឹងបូកគ្នាជាលក្ខណៈគណិតវិទ្យាចេញជា ៣០។",
        "C) វានឹងតខ្សែអក្សរចូលគ្នាបង្កើតបានជា '1020' ដែលអាចបញ្ជាទិញរហូតដល់ ១,០២០ ជើងទម្រទំនិញ (Pallets)!",
        "D) វានឹងបម្លែងវាទៅជាតម្លៃប៊ូលីន ពិត/មិនពិត។"
      ],
      correctIndex: 2,
      explanationEn: "Correct! When a computer adds text, it glues them together ('10' & '20' = '1020'). This was the root cause of the $24,000 inventory catastrophe at Apex Plastics!",
      explanationKh: "ត្រឹមត្រូវណាស់! នៅពេលកុំព្យូទ័រតអត្ថបទ វាបិទភ្ជាប់ពាក្យចូលគ្នា ('10' & '20' = '1020')។ នេះជាមូលហេតុដើមនៃមហន្តរាយស្តុកទំនិញ ២៤,០០០ ដុល្លារនៅរោងចក្រ Apex Plastics!"
    },
    {
      qEn: "3. Which Power Fx function safely converts the text string '45.5' into a mathematical number?",
      qKh: "៣. តើអនុគមន៍ Power Fx មួយណាដែលបម្លែងខ្សែអក្សរ '45.5' ទៅជាតម្លៃលេខគណិតវិទ្យាដោយសុវត្ថិភាព?",
      optionsEn: [
        "A) Text('45.5')",
        "B) Value('45.5')",
        "C) IsBlank('45.5')",
        "D) Today('45.5')"
      ],
      optionsKh: [
        "A) Text('45.5')",
        "B) Value('45.5')",
        "C) IsBlank('45.5')",
        "D) Today('45.5')"
      ],
      correctIndex: 1,
      explanationEn: "Correct! The Value() function takes text digits and converts them into real numbers so you can perform math (+, -, *, /).",
      explanationKh: "ត្រឹមត្រូវណាស់! អនុគមន៍ Value() ស្រង់យកតួលេខពីខ្សែអក្សរ ហើយបម្លែងវាទៅជាលេខពិតប្រាកដ ដើម្បីឱ្យអ្នកអាចធ្វើប្រមាណវិធីគណិតវិទ្យាបាន (+, -, *, /)។"
    },
    {
      qEn: "4. Why is storing dates in a dedicated Date/Time container better than storing '29-Oct-2026' as plain text?",
      qKh: "៤. ហេតុអ្វីបានជាការរក្សាទុកកាលបរិច្ឆេទក្នុងប្រអប់ កាលបរិច្ឆេទ/ពេលវេលា ប្រសើរជាងការរក្សាទុក '29-Oct-2026' ជាអត្ថបទធម្មតា?",
      optionsEn: [
        "A) Date containers use less colorful fonts on screen.",
        "B) Date containers allow the app to calculate elapsed days, check expiration, and sort chronologically.",
        "C) Date containers prevent anyone from changing the machine language.",
        "D) There is no difference; both behave identically."
      ],
      optionsKh: [
        "A) ប្រអប់កាលបរិច្ឆេទប្រើពុម្ពអក្សរដែលមានពណ៌តិចជាងនៅលើអេក្រង់។",
        "B) ប្រអប់កាលបរិច្ឆេទអនុញ្ញាតឱ្យកម្មវិធីគណនាចំនួនថ្ងៃដែលកន្លងផុត ពិនិត្យកាលបរិច្ឆេទផុតកំណត់ និងតម្រៀបតាមលំដាប់កាលវេលាបាន។",
        "C) ប្រអប់កាលបរិច្ឆេទរារាំងអ្នកដទៃមិនឱ្យផ្លាស់ប្តូរភាសាម៉ាស៊ីន។",
        "D) គ្មានភាពខុសគ្នាទេ ទាំងពីរដំណើរការដូចគ្នាបេះបិទ។"
      ],
      correctIndex: 1,
      explanationEn: "Correct! Plain text cannot calculate differences like DateDiff(Today(), IncidentDate, Days) or accurately sort dates across multiple months and years.",
      explanationKh: "ត្រឹមត្រូវណាស់! អត្ថបទធម្មតាមិនអាចគណនារយៈពេលខុសគ្នាដូចជា DateDiff() ឬតម្រៀបកាលបរិច្ឆេទឆ្លងខែ ឆ្លងឆ្នាំបានត្រឹមត្រូវឡើយ។"
    },
    {
      qEn: "5. A factory toggle switch for 'Emergency Stop Activated' holds what fundamental data type?",
      qKh: "៥. កុងតាក់បិទបើកក្នុងរោងចក្រសម្រាប់ 'ការបញ្ឈប់បន្ទាន់ត្រូវបានដំណើរការ' ផ្ទុកប្រភេទនៃទិន្នន័យមូលដ្ឋានមួយណា?",
      optionsEn: [
        "A) Number (either 0 or 100)",
        "B) Text ('YES' or 'NO')",
        "C) Yes/No (Boolean true or false)",
        "D) Date/Time"
      ],
      optionsKh: [
        "A) លេខ (០ ឬ ១០០)",
        "B) អត្ថបទ ('YES' ឬ 'NO')",
        "C) បាទ/ទេ ឬ ពិត/មិនពិត (Boolean true ឬ false)",
        "D) កាលបរិច្ឆេទ/ពេលវេលា"
      ],
      correctIndex: 2,
      explanationEn: "Correct! Binary two-state controls (On/Off, True/False) represent Boolean logic, the backbone of all computer decision-making.",
      explanationKh: "ត្រឹមត្រូវណាស់! ការគ្រប់គ្រងដែលមានស្ថានភាពពីរ (បើក/បិទ, ពិត/មិនពិត) តំណាងឱ្យតក្កវិជ្ជាប៊ូលីន ដែលជាឆ្អឹងខ្នងនៃការសម្រេចចិត្តទាំងអស់របស់កុំព្យូទ័រ។"
    }
  ];

  // --------------------------------------------------------------------------
  // 2. COMPLETE HIGH-ACCURACY KHMER TRANSLATIONS FOR ALL 24 SLIDES
  // --------------------------------------------------------------------------
  const KHMER_SLIDES = {
    'slide-1': {
      title: 'ថ្ងៃទី ៣៖ ទិន្នន័យ — អ្វីដែលកម្មវិធីដឹង និងចងចាំ',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & រំលឹកចំណេះដឹង (០០:០០ - ១០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"សូមស្វាគមន៍មកកាន់ថ្ងៃទី ៣ នៃវគ្គបណ្តុះបណ្តាល Microsoft Power Apps មូលដ្ឋាន!
កាលពីថ្ងៃទី ១ យើងបានរៀនថា កម្មវិធីកកើតឡើងដើម្បីដោះស្រាយបញ្ហាមនុស្ស ដោយប្រើប្រាស់ ធាតុបញ្ចូល (Input), ដំណើរការ (Process), និង លទ្ធផល (Output)។
កាលពីថ្ងៃទី ២ យើងបានពិនិត្យមើលខាងក្នុងប្រអប់ដំណើរការ ហើយបានរៀនថាកុំព្យូទ័រធ្វើតាមសេចក្តីណែនាំតាមលំដាប់លំដោយយ៉ាងម៉ត់ចត់។
ថ្ងៃនេះនៅថ្ងៃទី ៣ យើងចោទជាសំណួរដ៏សំខាន់មួយថា៖ តើសេចក្តីណែនាំទាំងនោះធ្វើការលើអ្វីពិតប្រាកដ?
រាល់សេចក្តីណែនាំទាំងអស់សុទ្ធតែត្រូវការព័ត៌មាន!
ម៉ាស៊ីនបោះពុម្ពមិនអាចបោះពុម្ពទំព័រទទេបានឡើយ។ ម៉ាស៊ីនគិតលេខមិនអាចគិតលេខបានទេបើគ្មានលេខ។ ហើយទម្រង់ស្នើសុំក៏មិនអាចផ្ញើបានដែរប្រសិនបើគ្មានទិន្នន័យ!
ខ្សែសង្វាក់គំនិតថ្ងៃនេះគឺ៖ ព័ត៌មាន ➔ តម្លៃ ➔ ប្រភេទ ➔ ទិន្នន័យដែលបានរក្សាទុក។
នៅចុងបញ្ចប់នៃរយៈពេល ៩០ នាទីថ្ងៃនេះ អ្នកនឹងកំណត់បានយ៉ាងច្បាស់នូវប្រភេទនៃទិន្នន័យមូលដ្ឋានទាំង ៤ យល់ពីមូលហេតុដែលការបូកលេខជាអត្ថបទបង្កជាមហន្តរាយ ២៤,០០០ ដុល្លារនៅរោងចក្រ Apex Plastics និងចេះគ្រប់គ្រងទិន្នន័យក្នុង Power Apps យ៉ាងស្ទាត់ជំនាញ!"`,
      content: `
        <div class="hero-layout">
          <div class="hero-pill-group">
            <span class="hero-pill">ដំណាក់កាលទី ១៖ មូលដ្ឋានគ្រឹះ</span>
            <span class="hero-pill teal-pill">ថ្ងៃទី ៣ នៃ ២៧</span>
            <span class="hero-pill blue-pill">៩០ នាទី</span>
          </div>
          <h1 class="hero-title">
            <span class="gradient-text">ទិន្នន័យ៖ អ្វីដែលកម្មវិធីដឹង និងចងចាំ</span><br>
            តម្លៃ, ប្រអប់ផ្ទុក, ប្រភេទ, និងការចងចាំឌីជីថល
          </h1>
          <p class="hero-subtitle">
            សេចក្តីណែនាំមិនអាចដំណើរការក្នុងភាពទទេស្អាតបានឡើយ។ រាល់ការគណនា ការចម្រាញ់ទិន្នន័យ និងការចុចប៊ូតុង សុទ្ធតែពឹងផ្អែកលើតម្លៃដែលបានរក្សាទុក។ ធ្វើជាម្ចាស់លើប្លុកគ្រឹះទាំង ៤ នៃទិន្នន័យអាជីវកម្ម។
          </p>

          <div class="title-feature-grid">
            <div class="feature-item">
              <span class="feature-icon">&#128196;</span>
              <div class="feature-info">
                <h4>១. តម្លៃ (The Value)</h4>
                <p>បំណែកព័ត៌មានឆៅ៖ ឈ្មោះ ចំនួន ពេលវេលា ឬស្ថានភាពបើក/បិទ។</p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">&#128279;</span>
              <div class="feature-info">
                <h4>២. ប្រភេទនៃទិន្នន័យ (Data Type)</h4>
                <p>រូបរាងនៃប្រអប់ផ្ទុកឌីជីថល ដែលកំណត់ថាតើសកម្មភាពអ្វីខ្លះអាចធ្វើទៅបាន។</p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">&#128190;</span>
              <div class="feature-info">
                <h4>៣. ការចងចាំ &amp; ការផ្ទុក</h4>
                <p>របៀបដែល Power Apps ចងចាំតម្លៃឆ្លងអេក្រង់ និងរក្សាទុកវាជារៀងរហូត។</p>
              </div>
            </div>
          </div>
        </div>
      `
    },

    'slide-2': {
      title: 'ផែនទីគំនិតកម្មវិធីសិក្សាទាំងមូល',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & រំលឹកចំណេះដឹង (០០:០០ - ១០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"សូមពិនិត្យមើលផែនទីផ្នត់គំនិតមេនៅលើអេក្រង់។ សូមកត់សម្គាល់ថារាល់ថ្ងៃទាំងអស់សុទ្ធតែតភ្ជាប់គ្នាដោយផ្ទាល់៖
កាលពីថ្ងៃទី ១ យើងបានសិក្សាពី បញ្ហាពិត និងគោលដៅស្នូលនៃអាជីវកម្ម។
កាលពីថ្ងៃទី ២ យើងបានរៀបចំ ដំណើរការ៖ សេចក្តីណែនាំដែលអនុវត្តតាមលំដាប់លំដោយ។
ថ្ងៃនេះនៅថ្ងៃទី ៣ យើងនឹងចូលទៅពិនិត្យមើលប្លុក 'ទិន្នន័យ' (DATA) ដែលរំលេចពណ៌ស្វាយភ្លឺថ្លា!
បើគ្មានទិន្នន័យទេ ដំណើរការរបស់អ្នកនឹងគ្មានវត្ថុធាតុដើមឡើយ។
ហើយមើលអ្វីដែលនឹងមកដល់នៅថ្ងៃស្អែកថ្ងៃទី ៤៖ តក្កវិជ្ជា និងការសម្រេចចិត្ត (Logic & Decision)!
តើកម្មវិធីអាចធ្វើការសម្រេចចិត្តដោយរបៀបណា? គឺតាមរយៈការពិនិត្យមើលទិន្នន័យនេះឯង! តើចំនួនធំជាង ១០០ ឬទេ? តើស្ថានភាពស្មើ 'បានអនុម័ត' ឬទេ?"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge purple-badge">ស្ថាបត្យកម្មកម្មវិធីសិក្សា</span>
          <h2 class="slide-title">ទីតាំងនៃមេរៀនថ្ងៃនេះក្នុងគំរូផ្នត់គំនិតមេ ២៧ ថ្ងៃ</h2>
          <p class="slide-lead">យើងមិនដែលបង្រៀនមុខងារដាច់ដោយឡែកពីគ្នានោះទេ។ រាល់ថ្ងៃទាំងអស់សុទ្ធតែបង្ហាញនូវតំណភ្ជាប់ដ៏សំខាន់បន្ទាប់ក្នុងខ្សែសង្វាក់ស្វ័យប្រវត្តិកម្មអាជីវកម្ម។</p>
        </div>

        <div class="mental-model-chain">
          <div class="chain-step step-completed">
            <span class="step-num">ថ្ងៃទី ១</span>
            <span class="step-name">បញ្ហាពិតប្រាកដ</span>
            <span class="step-status">&#10003; រួចរាល់</span>
          </div>
          <span class="chain-arrow">&#8594;</span>
          <div class="chain-step step-completed">
            <span class="step-num">ថ្ងៃទី ២</span>
            <span class="step-name">ដំណើរការ / លំដាប់</span>
            <span class="step-status">&#10003; រួចរាល់</span>
          </div>
          <span class="chain-arrow">&#8594;</span>
          <div class="chain-step step-active-day3">
            <span class="step-num">ថ្ងៃនេះ (ថ្ងៃទី ៣)</span>
            <span class="step-name">ទិន្នន័យ &amp; ប្រភេទ</span>
            <span class="step-status">&#9733; កំពុងសិក្សា</span>
          </div>
          <span class="chain-arrow">&#8594;</span>
          <div class="chain-step step-future">
            <span class="step-num">ថ្ងៃទី ៤</span>
            <span class="step-name">តក្កវិជ្ជា / ការសម្រេចចិត្ត</span>
            <span class="step-status">ថ្ងៃស្អែក</span>
          </div>
          <span class="chain-arrow">&#8594;</span>
          <div class="chain-step step-future">
            <span class="step-num">ថ្ងៃទី ៥-២៧</span>
            <span class="step-name">UI &#8594; សកម្មភាព &#8594; រក្សាទុក</span>
            <span class="step-status">ខាងមុខ</span>
          </div>
        </div>

        <div class="grid-2-col" style="margin-top: 1.5rem;">
          <div class="info-card border-blue">
            <div class="card-header-icon">&#128260; របៀបដែលថ្ងៃទី ២ ភ្ជាប់មកថ្ងៃទី ៣</div>
            <p>កាលពីថ្ងៃទី ២ យើងបានរៀនថាសេចក្តីណែនាំត្រូវអនុវត្តតាមលំដាប់លំដោយ៖ <code>ជំហាន ១ ; ជំហាន ២ ; ជំហាន ៣</code>។ ប៉ុន្តែតើអ្វីខ្លះដែលត្រូវដំណើរការក្នុងជំហានទាំងនោះ? គឺ <strong>ព័ត៌មាន!</strong> ជំហានមួយមិនអាចគណនា ផ្ទៀងផ្ទាត់ ឬរក្សាទុកបានទេបើគ្មានតម្លៃពិតប្រាកដសម្រាប់ដំណើរការ។</p>
          </div>
          <div class="info-card border-purple">
            <div class="card-header-icon">&#128301; ហេតុអ្វីបានជាថ្ងៃទី ៤ ត្រូវការថ្ងៃទី ៣</div>
            <p>នៅថ្ងៃស្អែកថ្ងៃទី ៤ កម្មវិធីរបស់យើងនឹងរៀនធ្វើការសម្រេចចិត្ត (<code>If / Else</code>)។ ប៉ុន្តែកម្មវិធីមិនអាចសម្រេចចិត្តទាំងងងឹតងងល់បានទេ។ វាត្រូវតែសួរសំណួរអំពី <strong>ទិន្នន័យ</strong>៖ <em>"តើចំនួននេះធំជាងសូន្យដែរឬទេ?"</em>, <em>"តើកាលបរិច្ឆេទនេះកន្លងផុតហើយឬនៅ?"</em></p>
          </div>
        </div>
      `
    },

    'slide-3': {
      title: 'ការរំលឹកចំណេះដឹងពីមុន',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & រំលឹកចំណេះដឹង (០០:០០ - ១០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"សូមកម្តៅខួរក្បាលរបស់យើងជាមួយសំណួររំលឹក ៣ ពីថ្ងៃទី ១ និងថ្ងៃទី ២!
សំណួរទី ១៖ តើអ្វីជាដំណាក់កាលស្នូលទាំង ៣ នៃកម្មវិធីឌីជីថលទាំងអស់ដែលយើងបានរៀននៅថ្ងៃទី ១?
(រង់ចាំចម្លើយ៖ Input, Process, Output!)
សំណួរទី ២៖ ហេតុអ្វីបានជាកុំព្យូទ័រនៅតែផ្តល់លទ្ធផលខុស បើទោះបីជាសេចក្តីណែនាំទាំងអស់សុទ្ធតែត្រឹមត្រូវក៏ដោយ?
(រង់ចាំចម្លើយ៖ ប្រសិនបើលំដាប់លំដោយនៃការអនុវត្តមានការខុសឆ្គង!)
សំណួរទី ៣៖ ក្នុង Power Fx តើសញ្ញាវណ្ណយុត្តិមួយណាដែលតភ្ជាប់សកម្មភាពជាច្រើនជាមួយគ្នាក្នុងលំដាប់លំដោយ?
(រង់ចាំចម្លើយ៖ សញ្ញាក្បៀសចំនុច ';' ដែលមានន័យថា 'ធ្វើចំណុចនេះ រួចហើយទើបធ្វើចំណុចនោះ'!)"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge blue-badge">ការរំលឹកឡើងវិញសកម្ម</span>
          <h2 class="slide-title">ការផ្ទៀងផ្ទាត់ចំណេះដឹងពីមុន៖ ថ្ងៃទី ១ &amp; ថ្ងៃទី ២</h2>
          <p class="slide-lead">រំលឹកគោលការណ៍គ្រឹះចេញពីការចងចាំ មុនពេលយើងបន្ថែមគោលគំនិតទិន្នន័យថ្ងៃនេះពីលើ។</p>
        </div>

        <div class="grid-3-col">
          <div class="retrieval-card">
            <div class="retrieval-num">០១</div>
            <h4>ពីថ្ងៃទី ១៖ មូលដ្ឋានគ្រឹះ</h4>
            <p class="retrieval-q">តើអ្វីជាដំណាក់កាលស្នូលទាំង ៣ នៃកម្មវិធីអាជីវកម្មទាំងអស់?</p>
            <div class="retrieval-answer">
              <strong>ចម្លើយ៖</strong> ធាតុបញ្ចូល (Input) &#8594; ដំណើរការ (Process) &#8594; លទ្ធផល (Output)។ បញ្ហាពិតត្រូវបានដោះស្រាយនៅពេលធាតុបញ្ចូលត្រូវបានដំណើរការទៅជាលទ្ធផលមានប្រយោជន៍។
            </div>
          </div>
          <div class="retrieval-card">
            <div class="retrieval-num">០២</div>
            <h4>ពីថ្ងៃទី ២៖ លំដាប់លំដោយ</h4>
            <p class="retrieval-q">តើមានអ្វីកើតឡើងប្រសិនបើសេចក្តីណែនាំនីមួយៗត្រឹមត្រូវទាំងអស់ ប៉ុន្តែលំដាប់ត្រូវបានផ្លាស់ប្តូរ?</p>
            <div class="retrieval-answer">
              <strong>ចម្លើយ៖</strong> កម្មវិធីនឹងបង្កើតលទ្ធផលខុសទាំងស្រុង ឬបង្កជាបរាជ័យធ្ងន់ធ្ងរ (ឧទាហរណ៍៖ ផ្ញើអ៊ីមែលមុនពេលទិន្នន័យត្រូវបានរក្សាទុក)។
            </div>
          </div>
          <div class="retrieval-card">
            <div class="retrieval-num">០៣</div>
            <h4>ពីថ្ងៃទី ២៖ វាក្យសម្ព័ន្ធ</h4>
            <p class="retrieval-q">តើសញ្ញាវណ្ណយុត្តិអ្វីក្នុង Power Fx ដែលភ្ជាប់សកម្មភាពជាច្រើនតាមលំដាប់ពេលវេលា?</p>
            <div class="retrieval-answer">
              <strong>ចម្លើយ៖</strong> សញ្ញាក្បៀសចំនុច (<code>;</code>) ដែលតំណាងឱ្យគោលគំនិតមនុស្សថា <em>"ធ្វើជំហាននេះសិន រួចទើបបន្តធ្វើជំហានបន្ទាប់"</em>។
            </div>
          </div>
        </div>
      `
    },

    'slide-4': {
      title: 'គោលបំណងសិក្សាដែលអាចវាស់វែងបាន',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & រំលឹកចំណេះដឹង (០០:០០ - ១០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"នេះជាគោលដៅសិក្សាដែលអាចវាស់វែងបានចំនួន ៤ សម្រាប់រយៈពេល ៨០ នាទីបន្ទាប់។
នៅម៉ោង ៩០:០០ ថ្ងៃនេះ អ្នកនឹងមិនគ្រាន់តែទន្ទេញនិយមន័យប៉ុណ្ណោះទេ។ អ្នកនឹងអាច៖
១. ពន្យល់ពីភាពខុសគ្នារវាងទិន្នន័យឆៅ និងព័ត៌មានមានន័យ ដោយប្រើការប្រៀបធៀបប្រចាំថ្ងៃដ៏សាមញ្ញ។
២. ចាត់ថ្នាក់រាល់ប្រអប់ទិន្នន័យអាជីវកម្មទាំងអស់ទៅជាប្រភេទគ្រឹះទាំង ៤៖ អត្ថបទ លេខ កាលបរិច្ឆេទ ឬ បាទ/ទេ បានយ៉ាងត្រឹមត្រូវ ១០០%។
៣. វិភាគ និងដោះស្រាយការប៉ះទង្គិចគ្នានៃប្រភេទនៃទិន្នន័យ ដូចជាពេលដែលលេខត្រូវបានចាត់ទុកជាអត្ថបទ ហើយតជាប់គ្នាជំនួសឱ្យការបូក។
៤. អនុវត្តអនុគមន៍បម្លែង និងផ្ទៀងផ្ទាត់ទិន្នន័យក្នុង Power Fx ដូចជា Value(), Text(), និង IsBlank()។"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge green-badge">សមត្ថភាពគោលដៅ</span>
          <h2 class="slide-title">គោលបំណងសិក្សា ៤ ដែលអាចវាស់វែងបានសម្រាប់ថ្ងៃទី ៣</h2>
          <p class="slide-lead">នៅចុងបញ្ចប់នៃវគ្គសិក្សា ៩០ នាទីនេះ អ្នកនឹងបង្ហាញនូវសមត្ថភាពជាក់ស្តែងទាំងបួននេះដោយឯករាជ្យ៖</p>
        </div>

        <div class="grid-2-col">
          <div class="objective-card">
            <div class="obj-badge">គោលបំណង ១ • ការយល់ដឹង</div>
            <h3>បែងចែកទិន្នន័យ និងព័ត៌មាន</h3>
            <p>កំណត់ទិន្នន័យឆៅជាតម្លៃដែលមិនទាន់រៀបចំ និងព័ត៌មានជាទិន្នន័យដែលមានរចនាសម្ព័ន្ធ និងបរិបទច្បាស់លាស់សម្រាប់ធ្វើការសម្រេចចិត្ត។</p>
            <div class="obj-outcome">&#10004; វាយតម្លៃតាមរយៈការប្រៀបធៀបក្រឡផ្ទុកគ្រឿងផ្សំ និងករណីសិក្សា</div>
          </div>

          <div class="objective-card">
            <div class="obj-badge">គោលបំណង ២ • ការចាត់ថ្នាក់</div>
            <h3>ចាត់ថ្នាក់ប្រភេទគ្រឹះទាំង ៤</h3>
            <p>ចាត់ថ្នាក់តម្លៃក្នុងកន្លែងធ្វើការទៅជា <strong>អត្ថបទ (Text)</strong>, <strong>លេខ (Number)</strong>, <strong>កាលបរិច្ឆេទ (Date/Time)</strong>, និង <strong>បាទ/ទេ (Yes/No)</strong> ដោយភាពជាក់លាក់ ១០០% រួមទាំងវិធានលេខទូរស័ព្ទ។</p>
            <div class="obj-outcome">&#10004; វាយតម្លៃតាមរយៈតារាងចាត់ថ្នាក់អន្តរកម្ម ៦ ប្រអប់</div>
          </div>

          <div class="objective-card">
            <div class="obj-badge">គោលបំណង ៣ • ការវិនិច្ឆ័យ</div>
            <h3>ទស្សន៍ទាយ &amp; ការពារការប៉ះទង្គិចប្រភេទ</h3>
            <p>កំណត់ផលវិបាកគ្រោះថ្នាក់នៃការមិនត្រូវគ្នានៃប្រភេទ (ដូចជាការតអក្សរ <code>"10" + "20" = "1020"</code>) និងពន្យល់ពីមូលហេតុដែលប្រអប់ឌីជីថលត្រូវតែត្រូវគ្នាជាមួយតម្លៃ។</p>
            <div class="obj-outcome">&#10004; វាយតម្លៃតាមរយៈការវិភាគមហន្តរាយ ២៤,០០០ ដុល្លារនៅ Apex</div>
          </div>

          <div class="objective-card">
            <div class="obj-badge">គោលបំណង ៤ • ការអនុវត្ត</div>
            <h3>ផ្គូផ្គងប្រអប់ទៅនឹងការគ្រប់គ្រង Power Apps</h3>
            <p>ផ្គូផ្គងប្រភេទនៃទិន្នន័យនីមួយៗទៅនឹងការគ្រប់គ្រងបញ្ចូលក្នុង Power Apps (Text input, Date picker, Toggle) និងអនុគមន៍ផ្ទៀងផ្ទាត់ Power Fx (<code>IsBlank</code>, <code>Value</code>)។</p>
            <div class="obj-outcome">&#10004; វាយតម្លៃតាមរយៈបញ្ហាប្រឈមកំណត់ហេតុថែទាំគ្រឿងចក្រ</div>
          </div>
        </div>
      `
    },

    'slide-5': {
      title: 'កាលវិភាគកំណត់ម៉ោង ៩០ នាទីជាក់លាក់',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & រំលឹកចំណេះដឹង (០០:០០ - ១០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"នេះជាផែនទីបង្ហាញផ្លូវ ៩០ នាទីដ៏ម៉ឺងម៉ាត់របស់យើង។
យើងចំណាយ ១០ នាទីលើការតម្រង់ទិស និងការរំលឹកឡើងវិញ។
ពី ១០ ទៅ ២៥ នាទី យើងពិនិត្យមើលមហន្តរាយ ២៤,០០០ ដុល្លារនៅរោងចក្រ Apex Plastics និងរៀនពីការប្រៀបធៀបក្រឡផ្ទុកគ្រឿងផ្សំក្នុងផ្ទះបាយ។
ពី ២៥ ទៅ ៤៥ នាទី យើងស្វែងយល់ស៊ីជម្រៅលើប្រភេទនៃទិន្នន័យទាំង ៤ និងដោះស្រាយបញ្ហាលេខទូរស័ព្ទ។
ពី ៤៥ ទៅ ៦០ នាទី ខ្ញុំនឹងបង្ហាញការពិសោធន៍ផ្ទាល់ជាមួយឧបករណ៍ពិនិត្យទិន្នន័យ (Data Inspector)។
ពី ៦០ ទៅ ៧៥ នាទី អ្នកទាំងអស់គ្នានឹងអនុវត្តផ្ទាល់លើការចាត់ថ្នាក់ប្រអប់ទិន្នន័យ។
ហើយ ១៥ នាទីចុងក្រោយ គឺជាការផ្ទៀងផ្ទាត់ចំណេះដឹង បញ្ហាប្រឈមចុងក្រោយ និងស្ពានចម្លងទៅកាន់ថ្ងៃទី ៤។"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge purple-badge">រចនាសម្ព័ន្ធមេរៀន</span>
          <h2 class="slide-title">កាលវិភាគលម្អិត ៩០ នាទីតាមគំរូវង់គំនិត</h2>
          <p class="slide-lead">ការបោះជំហានគរុកោសល្យប្រកបដោយតុល្យភាព ចាប់ពីបរាជ័យជាក់ស្តែងនៅកន្លែងធ្វើការ រហូតដល់ការអនុវត្តស្ទាត់ជំនាញ។</p>
        </div>

        <div class="agenda-timeline-grid">
          <div class="agenda-row">
            <div class="agenda-time">០០:០០ - ១០:០០ (១០នាទី)</div>
            <div class="agenda-topic">
              <strong>ផ្នែកទី ១៖ ស្វាគមន៍ &amp; រំលឹកចំណេះដឹង</strong>
              <span>ការតភ្ជាប់ផែនទីគំនិត, ការរំលឹក Day 1 IPO និង Day 2 Sequence, គោលបំណងសិក្សា ៤។</span>
            </div>
            <div class="agenda-milestone">ចំណុចដៅ៖ យុថ្កាផ្នត់គំនិត</div>
          </div>
          <div class="agenda-row">
            <div class="agenda-time">១០:០០ - ២៥:០០ (១៥នាទី)</div>
            <div class="agenda-topic">
              <strong>ផ្នែកទី ២៖ ហេតុអ្វីទិន្នន័យកើតមាន &amp; ការប្រៀបធៀប</strong>
              <span>មហន្តរាយស្តុកទំនិញ $24,000 នៅ Apex, ទិន្នន័យ ទល់នឹង ព័ត៌មាន, និងក្រឡផ្ទុកគ្រឿងផ្សំក្នុងផ្ទះបាយ។</span>
            </div>
            <div class="agenda-milestone">ចំណុចដៅ៖ យល់ច្បាស់ពីបញ្ហា</div>
          </div>
          <div class="agenda-row">
            <div class="agenda-time">២៥:០០ - ៤៥:០០ (២០នាទី)</div>
            <div class="agenda-topic">
              <strong>ផ្នែកទី ៣៖ ប្រភេទនៃទិន្នន័យមូលដ្ឋានទាំង ៤</strong>
              <span>អត្ថបទ, លេខ, កាលបរិច្ឆេទ, បាទ/ទេ (Boolean)។ វិធានលេខទូរស័ព្ទ និងកូដប្រៃសណីយ៍។ គំនូសតាងការប៉ះទង្គិច។</span>
            </div>
            <div class="agenda-milestone">ចំណុចដៅ៖ ទ្រឹស្តីរចនាសម្ព័ន្ធស្នូល</div>
          </div>
          <div class="agenda-row">
            <div class="agenda-time">៤៥:០០ - ៦០:០០ (១៥នាទី)</div>
            <div class="agenda-topic">
              <strong>ផ្នែកទី ៤៖ ការបង្ហាញផ្ទាល់ &amp; បន្ទប់ពិសោធន៍ទិន្នន័យ</strong>
              <span>ការបង្ហាញអន្តរកម្មលើ Data Inspector៖ ការពិនិត្យប្រអប់ផ្ទុក, ប្រមាណវិធីដែលអនុញ្ញាត និងមិនអនុញ្ញាត, Power Fx។</span>
            </div>
            <div class="agenda-milestone">ចំណុចដៅ៖ ការយល់ឃើញជាក់ស្តែង</div>
          </div>
          <div class="agenda-row">
            <div class="agenda-time">៦០:០០ - ៧៥:០០ (១៥នាទី)</div>
            <div class="agenda-topic">
              <strong>ផ្នែកទី ៥៖ ការអនុវត្តផ្ទាល់របស់អ្នកសិក្សា &amp; ការចាត់ថ្នាក់</strong>
              <span>តារាងចាត់ថ្នាក់ផ្ទាល់ដៃ៖ តម្រៀបប្រអប់ទិន្នន័យផលិតកម្ម ៦ ទៅក្នុងប្រអប់ផ្ទុកត្រឹមត្រូវជាមួយការវាយតម្លៃភ្លាមៗ។</span>
            </div>
            <div class="agenda-milestone">ចំណុចដៅ៖ សមត្ថភាពអនុវត្តឯករាជ្យ</div>
          </div>
          <div class="agenda-row">
            <div class="agenda-time">៧៥:០០ - ៩០:០០ (១៥នាទី)</div>
            <div class="agenda-topic">
              <strong>ផ្នែកទី ៦៖ ការផ្ទៀងផ្ទាត់ចំណេះដឹង &amp; ស្ពានចម្លង</strong>
              <span>កម្រងសំណួរ ៥ សំណួរ, បញ្ហាប្រឈម Apex Maintenance Log, រូបប៊្រិកវាយតម្លៃ, កិច្ចការផ្ទះ, និងស្ពានទៅកាន់ Day 4។</span>
            </div>
            <div class="agenda-milestone">ចំណុចដៅ៖ ការវាយតម្លៃបញ្ចប់</div>
          </div>
        </div>
      `
    },

    'slide-6': {
      title: 'បញ្ហានៅកន្លែងធ្វើការ៖ មហន្តរាយស្តុកទំនិញ ២៤,០០០ ដុល្លារ',
      segment: 'ផ្នែកទី ២៖ ហេតុអ្វីទិន្នន័យកើតមាន (១០:០០ - ២៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"សូមក្រឡេកមើលទៅក្នុងឃ្លាំងនៅរោងចក្រផលិតផ្លាស្ទិក Apex Plastics។
ក្រុមការងារឃ្លាំងបានបង្កើតកម្មវិធីសាមញ្ញមួយដើម្បីកុម្ម៉ង់គ្រាប់ជ័រផ្លាស្ទិក polymer។
វេនទី ១ បានកុម្ម៉ង់ ១០ ជើងទម្រទំនិញ (Pallets)។ វេនទី ២ បានកុម្ម៉ង់ ២០ ជើងទម្រទំនិញ (Pallets)។
ប្រធានផ្នែកបានចុចលើប៊ូតុង 'គណនាចំនួនសរុបដែលត្រូវកុម្ម៉ង់'។
តើពួកគេរំពឹងអ្វីខ្លះ? ១០ + ២០ = ៣០ ជើងទម្រទំនិញ (Pallets)!
ប៉ុន្តែតើឡានដឹកទំនិញរបស់អ្នកផ្គត់ផ្គង់បានដឹកអ្វីមកដល់នៅព្រឹកស្អែក? ១,០២០ ជើងទម្រទំនិញ (Pallets)!
ទីធ្លាដាក់ទំនិញត្រូវបានស្ទះទាំងស្រុង ខ្សែសង្វាក់ផលិតកម្មត្រូវផ្អាកដំណើរការ ហើយការពិន័យលើការដឹកជញ្ជូនខាតបង់អស់ ២៤,០០០ ដុល្លារ!
ហេតុអ្វីបានជារឿងនេះកើតឡើង?
ពីព្រោះប្រអប់ទិន្នន័យក្នុងកម្មវិធីត្រូវបានបង្កើតឡើងជា អត្ថបទ (TEXT) ជំនួសឱ្យ លេខ (NUMBER)!
នៅពេលអ្នកបូកអត្ថបទពីរចូលគ្នា កុំព្យូទ័រមិនធ្វើប្រមាណវិធីគណិតវិទ្យាទេ — វាគ្រាន់តែបិទភ្ជាប់ពាក្យចូលគ្នា៖ '10' + '20' = '1020' ប៉ុណ្ណោះ!
នេះជាមូលហេតុដែលប្រភេទនៃទិន្នន័យត្រូវតែកើតមាន។ វាជារបាំងការពារសុវត្ថិភាពសម្រាប់អាជីវកម្មរបស់អ្នក!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge red-badge">ករណីសិក្សានៅកន្លែងធ្វើការ</span>
          <h2 class="slide-title">Apex Plastics៖ មហន្តរាយគណិតវិទ្យាលើអត្ថបទ ២៤,០០០ ដុល្លារ</h2>
          <p class="slide-lead">របៀបដែលប្រអប់ទិន្នន័យកំណត់ខុសតែមួយ បង្កការរាំងស្ទះដល់ផលិតកម្ម និងដឹកជញ្ជូនទំនិញមកដល់ ១,០២០ ជើងទម្រទំនិញ (Pallets)ជំនួសឱ្យ ៣០។</p>
        </div>

        <div class="story-case-box">
          <div class="story-header">
            <span class="warning-icon">&#9888;</span>
            <div>
              <h3 style="margin:0; color:#fb7185;">របាយការណ៍ឧប្បត្តិហេតុ៖ មហន្តរាយនៃការកុម្ម៉ង់គ្រាប់ជ័រ</h3>
              <span style="font-size:0.85rem; color:#cbd5e1;">រោងចក្រផលិតផ្លាស្ទិក Apex Plastics • រោងចក្រលេខ ៣ ចំណត B</span>
            </div>
          </div>
          <div class="story-grid">
            <div class="story-panel">
              <h4>អ្វីដែលមនុស្សមានបំណងធ្វើ៖</h4>
              <div class="math-card math-expected">
                <span>សំណើវេនទី ១៖ <strong>១០ ជើងទម្រទំនិញ (Pallets)</strong></span>
                <span>សំណើវេនទី ២៖ <strong>២០ ជើងទម្រទំនិញ (Pallets)</strong></span>
                <div class="calc-divider"></div>
                <span class="result-line">ការកុម្ម៉ង់ដែលរំពឹងទុក៖ <strong>៣០ ជើងទម្រទំនិញ (Pallets) ($៦,០០០)</strong></span>
              </div>
            </div>
            <div class="story-panel">
              <h4>អ្វីដែលកុំព្យូទ័របានអនុវត្ត (ការតអត្ថបទចូលគ្នា)៖</h4>
              <div class="math-card math-actual">
                <span>ប្រភេទប្រអប់ទិន្នន័យ៖ <code>Text (អត្ថបទ)</code></span>
                <span>ប្រមាណវិធី៖ <code>"10" &amp; "20"</code></span>
                <div class="calc-divider"></div>
                <span class="result-line-fail">ទំនិញដែលដឹកមកដល់៖ <strong>១,០២០ ជើងទម្រទំនិញ (Pallets) ($២០៤,០០០)</strong></span>
              </div>
            </div>
          </div>
          <div class="story-footer">
            <strong>មូលហេតុដើម៖</strong> អ្នកបង្កើតកម្មវិធីបានប្រើប្រអប់ Text input ធម្មតា ដោយមិនបានកំណត់ប្រភេទជា <code>Number</code> ឡើយ។ ចំពោះកុំព្យូទ័រ <code>"ឆ្មា" + "ឆ្កែ" = "ឆ្មាឆ្កែ"</code> ហើយ <code>"10" + "20" = "1020"</code>!
          </div>
        </div>
      `
    },

    'slide-7': {
      title: 'គោលគំនិតធម្មតា៖ ទិន្នន័យ ទល់នឹង ព័ត៌មាន',
      segment: 'ផ្នែកទី ២៖ ហេតុអ្វីទិន្នន័យកើតមាន (១០:០០ - ២៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"មុនពេលយើងនិយាយអំពីកូដកុំព្យូទ័រ ចូរយើងយល់ឱ្យច្បាស់ពីភាសាសាមញ្ញជាមុនសិន។
មនុស្សជាច្រើនតែងតែប្រើពាក្យ 'ទិន្នន័យ' (Data) និង 'ព័ត៌មាន' (Information) ដូចជាពាក្យតែមួយ។ ការពិតវាមិនដូចគ្នាទាល់តែសោះ!
សូមគិតថា ទិន្នន័យ គឺជាគ្រឿងផ្សំឆៅក្នុងផ្ទះបាយ៖ ម្សៅមីមួយចាន ស្ករសមួយពែង ពងមាន់ឆៅពីរគ្រាប់។ ពងមាន់ឆៅដែលទុកនៅលើតុ មិនអាចធ្វើឱ្យគ្រួសារអ្នកឆ្អែតបានទេ។
រីឯ ព័ត៌មាន គឺជានំខេកសូកូឡាដែលដុតឆ្អិនឈ្ងុយឆ្ងាញ់!
ទិន្នន័យ គឺជាការពិតឆៅៗដែលមិនទាន់រៀបចំ៖ '42', 'ក្រហម', '2026-10-29'។
ព័ត៌មាន គឺជាទិន្នន័យដែលត្រូវបានផ្តល់អត្ថន័យ ស្លាកឈ្មោះ និងគោលបំណងច្បាស់លាស់៖ 'ម៉ាស៊ីនលេខ ៤២ មានកម្តៅ ២០០ អង្សាសេ នៅថ្ងៃទី ២៩ ខែតុលា'។
កម្មវិធីទទួលយកទិន្នន័យឆៅ យល់ច្បាស់ពីប្រភេទរបស់វា ហើយបម្លែងវាទៅជាព័ត៌មានមានប្រយោជន៍សម្រាប់អ្នកគ្រប់គ្រង!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge blue-badge">គំរូផ្នត់គំនិតស្នូល</span>
          <h2 class="slide-title">ភាសាសាមញ្ញ៖ ទិន្នន័យ (Data) ទល់នឹង ព័ត៌មាន (Information)</h2>
          <p class="slide-lead">កុំច្រឡំគ្រឿងផ្សំឆៅជាមួយអាហារដែលចម្អិនរួច។ ប្រព័ន្ធឌីជីថលបម្លែងតម្លៃឆៅទៅជាបរិបទមានន័យ។</p>
        </div>

        <div class="grid-2-col" style="gap: 1.5rem;">
          <div class="concept-card">
            <div class="concept-badge blue-badge">&#129370; ទិន្នន័យឆៅ (Raw Data)</div>
            <h3>ការពិត &amp; តម្លៃដែលមិនទាន់ដំណើរការ</h3>
            <p>ធាតុដាច់ដោយឡែកពីគ្នា គ្មានបរិបទ ឬស្លាកបញ្ជាក់។ កុំព្យូទ័ររក្សាទុកវា ប៉ុន្តែវាមិនអាចប្រាប់រឿងរ៉ាវអ្វីបានឡើយ។</p>
            <div class="concept-examples">
              <div class="example-item"><code>"45"</code> &bull; តើជា ៤៥ វិនាទី? ៤៥ ដុល្លារ? ឬ ៤៥ អង្សា?</div>
              <div class="example-item"><code>"សុភា"</code> &bull; តើជាអតិថិជន បុគ្គលិក ឬជាគ្រូពេទ្យ?</div>
              <div class="example-item"><code>true</code> &bull; តើម៉ាស៊ីនកំពុងដំណើរការ? ឬវិក្កយបត្របានបង់រួច?</div>
            </div>
          </div>

          <div class="concept-card">
            <div class="concept-badge green-badge">&#127829; ព័ត៌មានមានន័យ (Information)</div>
            <h3>ទិន្នន័យដែលមានរចនាសម្ព័ន្ធ និងបរិបទ</h3>
            <p>ទិន្នន័យដែលត្រូវបានដាក់ស្លាក កំណត់ប្រភេទ រៀបចំ និងបង្ហាញដើម្បីឱ្យមនុស្សអាចយល់ និងធ្វើសកម្មភាពបាន។</p>
            <div class="concept-examples">
              <div class="example-item">&#10004; <strong>ពេលម៉ាស៊ីនឈប់៖</strong> ៤៥ នាទី (ខ្សែសង្វាក់ទី ២ គាំង)</div>
              <div class="example-item">&#10004; <strong>អ្នកបញ្ជាម៉ាស៊ីន៖</strong> សុភា (ចូលប្រើម៉ាស៊ីនសង្កត់លេខ ៤)</div>
              <div class="example-item">&#10004; <strong>ការបញ្ឈប់បន្ទាន់៖</strong> ពិត (ត្រូវការក្រុមថែទាំជាបន្ទាន់)</div>
            </div>
          </div>
        </div>

        <div class="takeaway-banner">
          <strong>ចំណុចសំខាន់៖</strong> កម្មវិធីកើតមានដើម្បីប្រមូល <strong>ទិន្នន័យឆៅ</strong> តាមរយៈទម្រង់បញ្ចូល រក្សាទុកវាឱ្យបានត្រឹមត្រូវ និងបង្ហាញវាជា <strong>ព័ត៌មានដែលអាចអនុវត្តបាន</strong> ដើម្បីដោះស្រាយបញ្ហារបស់មនុស្ស។
        </div>
      `
    },

    'slide-8': {
      title: 'ការប្រៀបធៀបប្រចាំថ្ងៃ៖ ក្រឡផ្ទុកគ្រឿងផ្សំក្នុងផ្ទះបាយ',
      segment: 'ផ្នែកទី ២៖ ហេតុអ្វីទិន្នន័យកើតមាន (១០:០០ - ២៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"ដើម្បីឱ្យប្រភេទនៃទិន្នន័យក្លាយជាអ្វីដែលមិនអាចបំភ្លេចបាន សូមគិតអំពីទូផ្ទុកគ្រឿងផ្សំក្នុងផ្ទះបាយ។
នៅក្នុងផ្ទះបាយរបស់អ្នក អ្នកមានប្រអប់ផ្ទុកផ្សេងៗគ្នាសម្រាប់របស់របរផ្សេងៗគ្នា។
អ្នកមានក្រឡកែវសម្រាប់ដាក់ម្សៅមី។ អ្នកមានប្រអប់ក្រដាសសម្រាប់ដាក់ពងមាន់។ អ្នកមានក្អមសម្រាប់ដាក់ទឹកដោះគោ។
តើមានអ្វីកើតឡើងប្រសិនបើអ្នកព្យាយាមចាក់ទឹកដោះគោ ១ លីត្រចូលទៅក្នុងប្រអប់ក្រដាសដាក់ពងមាន់?
វាជ្រាបហៀរពេញផ្ទះ! ក្លាយជាមហន្តរាយ!
តើមានអ្វីកើតឡើងប្រសិនបើអ្នកព្យាយាមញាត់ពងមាន់ឆៅ ១២ គ្រាប់ចូលទៅក្នុងដបម្រេចដ៏តូចចង្អៀត?
វាបែកខ្ទេចខ្ទីអស់!
នៅក្នុងកុំព្យូទ័រ 'ប្រភេទនៃទិន្នន័យ' (DATA TYPE) គ្រាន់តែជារូបរាងពិតនៃប្រអប់ផ្ទុកប៉ុណ្ណោះ!
អ្នកមិនអាចចាក់ប្រយោគអក្សរចូលទៅក្នុងប្រអប់លេខបានទេ។
អ្នកមិនអាចធ្វើប្រមាណវិធីគុណលើក្រឡដែលផ្ទុកអក្សរបានឡើយ!
នៅពេលអ្នកជ្រើសរើសប្រភេទនៃទិន្នន័យក្នុង Power Apps អ្នកកំពុងប្រាប់កុំព្យូទ័រឱ្យរៀបចំក្រឡផ្ទុកណាដែលត្រូវប្រើ។"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge gold-badge">ការប្រៀបធៀបផ្នត់គំនិត</span>
          <h2 class="slide-title">ការប្រៀបធៀបប្រចាំថ្ងៃ៖ ក្រឡផ្ទុកគ្រឿងផ្សំក្នុងផ្ទះបាយ</h2>
          <p class="slide-lead">ប្រអប់ផ្ទុកឌីជីថលត្រូវតែត្រូវគ្នាជាមួយនឹងវត្ថុដែលវាផ្ទុក។ អ្នកមិនអាចដាក់សម្លក្នុងប្រអប់ពងមាន់បានទេ!</p>
        </div>

        <div class="pantry-grid">
          <div class="pantry-jar border-text">
            <div class="jar-icon">&#127850;</div>
            <h4>ប្រអប់ផ្ទុកអត្ថបទ (Text)</h4>
            <span class="jar-substance">ប្រអប់នំប័ុង</span>
            <p>ផ្ទុករាល់រូបរាង អក្សរ សញ្ញាវណ្ណយុត្តិ ឬពាក្យសម្តី។ បត់បែនបាន ប៉ុន្តែអ្នកមិនអាចធ្វើលេខបូកដកលើនំប័ុងបានទេ!</p>
            <div class="jar-example"><code>"ខ្សែសង្វាក់ A"</code></div>
          </div>

          <div class="pantry-jar border-num">
            <div class="jar-icon">&#129378;</div>
            <h4>ប្រអប់ផ្ទុកលេខ (Number)</h4>
            <span class="jar-substance">ពែងវាល់ខ្នាត</span>
            <p>ក្រិតខ្នាតយ៉ាងម៉ត់ចត់សម្រាប់បរិមាណ និងចំនួន។ រួចរាល់សម្រាប់ការបូក ដក គុណ ចែក និងរកមធ្យមភាគ។</p>
            <div class="jar-example"><code>150.5</code> គីឡូក្រាម</div>
          </div>

          <div class="pantry-jar border-date">
            <div class="jar-icon">&#128197;</div>
            <h4>ប្រអប់កាលបរិច្ឆេទ (Date)</h4>
            <span class="jar-substance">នាឡិកាកាលបរិច្ឆេទ</span>
            <p>តាមដានថ្ងៃក្នុងប្រតិទិន និងម៉ោងជាក់លាក់។ ស្គាល់ឆ្នាំបង្គ្រប់ ថ្ងៃនៃសប្តាហ៍ និងគម្លាតពេលវេលា។</p>
            <div class="jar-example"><code>2026-10-29 08:30</code></div>
          </div>

          <div class="pantry-jar border-bool">
            <div class="jar-icon">&#128161;</div>
            <h4>ប្រអប់ បាទ/ទេ (Yes/No)</h4>
            <span class="jar-substance">កុងតាក់ភ្លើង</span>
            <p>មានស្ថានភាពតែ ពីរ គត់៖ បើក ឬ បិទ (ON / OFF)។ គ្មានជម្រើសទីបីឡើយ គ្មានភាពស្រពេចស្រពិល។</p>
            <div class="jar-example"><code>true / false</code></div>
          </div>
        </div>
      `
    },

    'slide-9': {
      title: 'ប្រភេទនៃទិន្នន័យមូលដ្ឋានទាំង ៤',
      segment: 'ផ្នែកទី ៣៖ ប្រភេទនៃទិន្នន័យមូលដ្ឋាន (២៥:០០ - ៤៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"ឥឡូវនេះ ចូរយើងស្វែងយល់ជាផ្លូវការនូវសសរស្តម្ភទាំង ៤ នៃកម្មវិធីអាជីវកម្មទាំងអស់។
មិនថាអ្នកបង្កើតកម្មវិធីក្នុង Power Apps, Excel, SharePoint, SQL Server ឬ Python ទេ សសរស្តម្ភទាំង ៤ នេះមិនដែលផ្លាស់ប្តូរឡើយ៖
១. អត្ថបទ (Text ឬ String)៖ តួអក្សរ ឈ្មោះ កំណត់ចំណាំ ប្រយោគ។ ក្នុង Power Fx ត្រូវសរសេរក្នុងសញ្ញាសម្រង់ពីរ៖ 'Apex Plastics'។
២. លេខ (Number)៖ បរិមាណ តម្លៃ ទម្ងន់ រង្វាស់រង្វាល់។ សរសេរជាតួលេខផ្ទាល់ដោយគ្មានសញ្ញាសម្រង់៖ 45 ឬ 199.99។
៣. កាលបរិច្ឆេទ / ពេលវេលា (Date / Time)៖ ចំណុចពេលវេលាក្នុងប្រតិទិន៖ Today(), 2026-10-29។
៤. បាទ / ទេ (Boolean)៖ ភាពពិតជាក់ស្តែងពីរយ៉ាង៖ true ឬ false។
គ្រប់ប្រអប់បញ្ចូលទាំងអស់ដែលអ្នកធ្លាប់ដាក់ក្នុងកម្មវិធី សុទ្ធតែជាសមាជិកនៃគ្រួសារទាំង ៤ នេះ!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge purple-badge">មូលដ្ឋានបច្ចេកទេស</span>
          <h2 class="slide-title">ប្រភេទនៃទិន្នន័យអាជីវកម្មមូលដ្ឋានទាំង ៤</h2>
          <p class="slide-lead">៩៥% នៃកម្មវិធីអាជីវកម្មទាំងអស់ត្រូវបានជំរុញដោយប្រអប់ផ្ទុកទិន្នន័យគ្រឹះទាំងបួននេះ។</p>
        </div>

        <div class="types-table-wrapper">
          <table class="types-table">
            <thead>
              <tr>
                <th>ប្រភេទនៃទិន្នន័យ</th>
                <th>ឈ្មោះបច្ចេកទេស</th>
                <th>អ្វីដែលវាផ្ទុក</th>
                <th>ឧទាហរណ៍វាក្យសម្ព័ន្ធ Power Fx</th>
                <th>ប្រមាណវិធីដែលអនុញ្ញាត</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span class="type-pill pill-text">&#128221; អត្ថបទ (Text)</span></td>
                <td><code>String / Text</code></td>
                <td>អក្សរ និមិត្តសញ្ញា ពាក្យ ប្រយោគ</td>
                <td><code>"ម៉ាស៊ីនសង្កត់លេខ ០៤"</code></td>
                <td>តភ្ជាប់ (<code>&amp;</code>), Upper, Lower, Search</td>
              </tr>
              <tr>
                <td><span class="type-pill pill-num">&#128290; លេខ (Number)</span></td>
                <td><code>Decimal / Integer</code></td>
                <td>ចំនួន រង្វាស់ តម្លៃទំនិញ ទម្ងន់</td>
                <td><code>450.75</code></td>
                <td>បូក (<code>+</code>), ដក (<code>-</code>), គុណ, Sum</td>
              </tr>
              <tr>
                <td><span class="type-pill pill-date">&#128197; កាលបរិច្ឆេទ</span></td>
                <td><code>DateTime</code></td>
                <td>ថ្ងៃក្នុងប្រតិទិន ម៉ោងជាក់ស្តែង</td>
                <td><code>Today()</code> ឬ <code>Date(2026,10,29)</code></td>
                <td>DateAdd, DateDiff, Weekday</td>
              </tr>
              <tr>
                <td><span class="type-pill pill-bool">&#9989; បាទ/ទេ</span></td>
                <td><code>Boolean</code></td>
                <td>ទង់លក្ខខណ្ឌ ពិត ឬ មិនពិត</td>
                <td><code>true</code> ឬ <code>false</code></td>
                <td><code>And</code>, <code>Or</code>, <code>Not (!)</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },

    'slide-10': {
      title: 'ស្វែងយល់ស៊ីជម្រៅ៖ ពេលណាដែលលេខមិនមែនជាលេខ?',
      segment: 'ផ្នែកទី ៣៖ ប្រភេទនៃទិន្នន័យមូលដ្ឋាន (២៥:០០ - ៤៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"ឥឡូវនេះមកដល់វិធានដ៏សំខាន់បំផុតមួយក្នុងស្ថាបត្យកម្មទិន្នន័យ។
សួរសិស្សរបស់អ្នកថា៖ តើលេខទូរស័ព្ទជា លេខ ដែរឬទេ?
តើអត្តលេខបុគ្គលិក (ដូចជា 00482) ជា លេខ ដែរឬទេ?
តើកូដប្រៃសណីយ៍ (ដូចជា 02138) ជា លេខ ដែរឬទេ?
ចម្លើយគឺ ទេដាច់ខាត! ពួកវាគឺជា អត្ថបទ (TEXT)!
ហេតុអ្វី? គឺដោយសារតែ 'វិធានមាស'៖
'តើអ្នកនឹងធ្លាប់ធ្វើប្រមាណវិធីគណិតវិទ្យាលើតម្លៃនេះដែរឬទេ?'
តើអ្នកធ្លាប់យកលេខទូរស័ព្ទពីរមកបូកបញ្ចូលគ្នាដើម្បីរកមធ្យមភាគដែរឬទេ? ពិតជាអត់ទេ!
លើសពីនេះទៅទៀត ប្រសិនបើអ្នករក្សាទុកកូដប្រៃសណីយ៍ '02138' ជាលេខ កុំព្យូទ័រនឹងកាត់លេខសូន្យខាងមុខចោល បន្សល់ទុកត្រឹម '2138' — ធ្វើឱ្យការផ្ញើសំបុត្របរាជ័យ!
បើវាមានលេខសូន្យខាងមុខ សញ្ញាដក ឬមិនដែលត្រូវយកទៅបូកដក នោះវាគឺជា អត្ថបទ!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge gold-badge">វិធានមាសនៃការរៀបចំទិន្នន័យ</span>
          <h2 class="slide-title">តើនៅពេលណាដែលលេខ មិនមែនជាលេខ?</h2>
          <p class="slide-lead">គ្រាន់តែតម្លៃមួយមានផ្ទុកតួលេខ មិនមែនមានន័យថាវាជា លេខគណិតវិទ្យា នោះឡើយ។</p>
        </div>

        <div class="golden-rule-banner">
          <div class="rule-icon">&#127942;</div>
          <div class="rule-text">
            <h3>ការធ្វើតេស្តវិធានមាស៖ <em>"តើអ្នកនឹងធ្លាប់យកវាទៅគណនាដែរឬទេ?"</em></h3>
            <p>ប្រសិនបើអ្នកមិនដែលបូក ដក គុណ ឬរកមធ្យមភាគលើតម្លៃនោះទេ នោះវាស្ថិតក្នុងប្រអប់ <strong>អត្ថបទ (Text)</strong>!</p>
          </div>
        </div>

        <div class="grid-2-col" style="margin-top: 1.25rem;">
          <div class="contrast-card card-fail">
            <h4 style="color: #fb7185;">&#10060; គ្រោះថ្នាក់នៃការរក្សាទុកជាលេខ៖</h4>
            <ul class="danger-list">
              <li><strong>ការបាត់បង់លេខសូន្យខាងមុខ៖</strong> កូដ <code>"02138"</code> នឹងក្លាយជា <code>2138</code>។</li>
              <li><strong>ការកាត់ទម្រង់ចោល៖</strong> ទូរស័ព្ទ <code>"+855-23-888"</code> នឹងបង្កជាកំហុសប្រមាណវិធី!</li>
              <li><strong>លេខកូដសម្គាល់៖</strong> លេខកូដ <code>"007-B"</code> នឹងគាំងភ្លាមៗប្រសិនបើបង្ខំជាលេខ។</li>
            </ul>
          </div>
          <div class="contrast-card card-pass">
            <h4 style="color: #4ade80;">&#10004; លេខពិត ទល់នឹង តួលេខជាអត្ថបទ៖</h4>
            <ul class="success-list">
              <li><strong>លេខពិតប្រាកដ៖</strong> ប្រាក់ឈ្នួលក្នុងមួយម៉ោង ($25.50), ចំនួនអេតចាយ (14), ម៉ោងឈប់ដំណើរការ (2.5)។</li>
              <li><strong>តួលេខជាអត្ថបទ៖</strong> លេខទូរស័ព្ទ, លេខអត្តសញ្ញាណប័ណ្ណ, លេខកាតបុគ្គលិក, កូដប្រៃសណីយ៍, លេខស៊េរីម៉ាស៊ីន។</li>
            </ul>
          </div>
        </div>
      `
    },

    'slide-11': {
      title: 'ហេតុ និងផល៖ អ្វីកើតឡើងពេលទិន្នន័យប៉ះទង្គិចគ្នា?',
      segment: 'ផ្នែកទី ៣៖ ប្រភេទនៃទិន្នន័យមូលដ្ឋាន (២៥:០០ - ៤៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"សូមក្រឡេកមើលលំហូរហេតុ និងផលនេះ។
នៅខាងឆ្វេង៖ បុគ្គលិកវាយបញ្ចូលលេខ '50' ទៅក្នុងប្រអប់អត្ថបទ។
ប្រសិនបើកម្មវិធីចាត់ទុកវាជាអត្ថបទ ហើយយើងបូកវាជាមួយ '10' លទ្ធផលគឺ '5010'។
ប្រសិនបើកម្មវិធីចាត់ទុកវាជាលេខ ហើយយើងបូកវាជាមួយ 10 លទ្ធផលគឺ 60!
សូមមើលអ្វីដែលកើតឡើងនៅពេលប្រភេទនៃទិន្នន័យប៉ះទង្គិចគ្នា៖
ការព្យាយាមយកពាក្យ 'Apex' ទៅគុណនឹង ៥ នឹងបង្កជាកំហុសគាំងធ្ងន់ធ្ងរ៖ ប្រភេទមិនត្រូវគ្នា។
ការព្យាយាមរក្សាទុកពាក្យ 'Urgent' ចូលទៅក្នុងកុងតាក់ បាទ/ទេ នឹងធ្វើឱ្យការរក្សាទុកក្នុងទិន្នន័យបរាជ័យ!
ការយល់ដឹងពីប្រភេទនៃទិន្នន័យ ការពារកំហុស runtime មុនពេលវាទៅដល់ដៃអ្នកប្រើប្រាស់របស់អ្នក។"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge red-badge">រូបភាពហេតុ និងផល</span>
          <h2 class="slide-title">តើមានអ្វីកើតឡើងនៅពេលប្រភេទនៃទិន្នន័យប៉ះទង្គិចគ្នា?</h2>
          <p class="slide-lead">តាមដានប្រតិកម្មឌីជីថលនៅពេលដែលប្រមាណវិធីជួបជាមួយប្រអប់ផ្ទុកខុសប្រភេទ។</p>
        </div>

        <div class="collision-diagram">
          <div class="diagram-branch">
            <div class="diag-node node-input">
              <span class="node-tag">ធាតុបញ្ចូលពីមនុស្ស</span>
              <code>"50"</code> &amp; <code>"10"</code>
            </div>
            <div class="diag-arrow">&#8594;</div>
            <div class="diag-node node-text-op">
              <span class="node-tag">ចាត់ទុកជាអត្ថបទ</span>
              ប្រមាណវិធី៖ <code>&amp;</code> (តភ្ជាប់)
            </div>
            <div class="diag-arrow">&#8594;</div>
            <div class="diag-node node-fail">
              <span class="node-tag">លទ្ធផលដែលមិនចង់បាន</span>
              <strong>"5010"</strong> (ជើងទម្រទំនិញ!)
            </div>
          </div>

          <div class="diagram-divider">VS</div>

          <div class="diagram-branch">
            <div class="diag-node node-input">
              <span class="node-tag">ធាតុបញ្ចូលពីមនុស្ស</span>
              <code>Value("50")</code> &amp; <code>Value("10")</code>
            </div>
            <div class="diag-arrow">&#8594;</div>
            <div class="diag-node node-num-op">
              <span class="node-tag">ចាត់ទុកជាលេខ</span>
              ប្រមាណវិធី៖ <code>+</code> (គណិតវិទ្យា)
            </div>
            <div class="diag-arrow">&#8594;</div>
            <div class="diag-node node-success">
              <span class="node-tag">លទ្ធផលអាជីវកម្មត្រឹមត្រូវ</span>
              <strong>60</strong> (ជើងទម្រទំនិញ)
            </div>
          </div>
        </div>
      `
    },

    'slide-12': {
      title: 'ការបង្ហាញផ្ទាល់៖ បន្ទប់ពិសោធន៍ពិនិត្យទិន្នន័យ',
      segment: 'ផ្នែកទី ៤៖ ការបង្ហាញរបស់អ្នកបណ្តុះបណ្តាល (៤៥:០០ - ៦០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"ឥឡូវនេះ ចូរយើងបើកបន្ទប់ពិសោធន៍ពិនិត្យទិន្នន័យ (Data Inspector Lab) ទាំងអស់គ្នា!
ខ្ញុំនឹងចុចលើតម្លៃគំរូជាច្រើនពីកន្លែងផលិតកម្មរបស់យើង។
សូមសង្កេតមើលអ្វីដែលឧបករណ៍នេះបង្ហាញ៖
១. នៅពេលខ្ញុំចុច 'Line 04' វាបង្ហាញ ប្រភេទ៖ Text, ប្រអប់៖ String, អនុញ្ញាត៖ ការតភ្ជាប់ និងការស្វែងរក។
២. នៅពេលខ្ញុំចុច '150.25' វាបង្ហាញ ប្រភេទ៖ Number, អនុញ្ញាត៖ +, -, *, មធ្យមភាគ។
៣. នៅពេលខ្ញុំចុច '2026-10-29' វាបង្ហាញ ប្រភេទ៖ Date/Time, អនុញ្ញាត៖ DateAdd, DateDiff។
៤. នៅពេលខ្ញុំចុច 'True' វាបង្ហាញ ប្រភេទ៖ Yes/No, អនុញ្ញាត៖ If(), And, Or។
មើលអ្វីដែលកើតឡើងនៅពេលយើងព្យាយាមធ្វើប្រមាណវិធីខុសច្បាប់៖ ការព្យាយាមធ្វើលេខលើអត្ថបទនឹងលោតភ្លើងក្រហមព្រមានភ្លាម!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge blue-badge">ការពិសោធន៍អន្តរកម្ម</span>
          <h2 class="slide-title">ការបង្ហាញផ្ទាល់៖ បន្ទប់ពិសោធន៍ពិនិត្យទិន្នន័យ</h2>
          <p class="slide-lead">ជ្រើសរើសតម្លៃគំរូក្នុងរោងចក្រខាងក្រោម ដើម្បីពិនិត្យមើលរូបរាងប្រអប់ ការចងចាំ និងប្រមាណវិធីស្របច្បាប់។</p>
        </div>

        <div class="inspector-sandbox">
          <div class="inspector-picker">
            <span class="picker-label">ជ្រើសរើសតម្លៃគំរូពីកន្លែងធ្វើការ៖</span>
            <div class="sample-btn-group" id="lab-btn-group">
              <button class="sample-btn active" data-val="sample-text">"Injection Press #2"</button>
              <button class="sample-btn" data-val="sample-num">485.50</button>
              <button class="sample-btn" data-val="sample-phone">"+855-23-999-111"</button>
              <button class="sample-btn" data-val="sample-date">Today()</button>
              <button class="sample-btn" data-val="sample-bool">true</button>
            </div>
          </div>

          <div class="inspector-display-panel" id="inspector-display">
            <div class="panel-row">
              <span class="panel-label">ប្រភេទដែលបានរកឃើញ៖</span>
              <span class="panel-value type-highlight" id="disp-type">Text (អត្ថបទ)</span>
            </div>
            <div class="panel-row">
              <span class="panel-label">វាក្យសម្ព័ន្ធប្រអប់ផ្ទុក៖</span>
              <code class="panel-code" id="disp-syntax">"Injection Press #2" (នៅក្នុងសញ្ញាសម្រង់)</code>
            </div>
            <div class="panel-row">
              <span class="panel-label">ប្រមាណវិធីដែលអនុញ្ញាត៖</span>
              <span class="panel-value" id="disp-allowed">&#10004; ការតភ្ជាប់ (&amp;), ស្វែងរក, Upper, Lower, Len</span>
            </div>
            <div class="panel-row">
              <span class="panel-label">ប្រមាណវិធីដែលហាមឃាត់៖</span>
              <span class="panel-value text-danger" id="disp-prohibited">&#10060; ការបូក (+), ការដក, ការគុណ, ការបូកសរុប (Sum)</span>
            </div>
          </div>
        </div>
      `
    },

    'slide-13': {
      title: 'ការផ្ទៀងផ្ទាត់ពាក់កណ្តាលវគ្គ & ការសម្រាកភ្នែក',
      segment: 'ផ្នែកទី ៤៖ ការបង្ហាញរបស់អ្នកបណ្តុះបណ្តាល (៤៥:០០ - ៦០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"យើងបានមកដល់ចំណុច ៤៥ នាទីហើយ! ពាក់កណ្តាលផ្លូវនៃថ្ងៃទី ៣!
សូមផ្អាក ៦០ វិនាទី ដើម្បីដកដង្ហើមវែងៗ និងសម្រួលឥរិយាបថ។
ពិសារទឹកមួយកែវ។
សូមលើកមេដៃបញ្ជាក់ទាំងអស់គ្នាក្នុងបន្ទប់៖
មេដៃឡើងលើ ប្រសិនបើអ្នកយល់ច្បាស់ថាហេតុអ្វីលេខទូរស័ព្ទជា Text ហើយហេតុអ្វី '10' + '20' បង្កើតបានជា ១,០២០។
មេដៃទៅចំហៀង ប្រសិនបើអ្នកនៅតែឆ្ងល់ថាហេតុអ្វី Power Apps មិនចេះទស្សន៍ទាយបំណងរបស់យើង។
ចងចាំថា៖ កុំព្យូទ័រមិនដែលចេះស្មានឡើយ។ ភាពច្បាស់លាស់ គឺជាអ្វីដែលធ្វើឱ្យកម្មវិធីដំណើរការប្រកបដោយទំនុកចិត្ត!"`,
      content: `
        <div class="checkpoint-card">
          <div class="checkpoint-icon">&#9749;</div>
          <h2 class="checkpoint-title">ការផ្ទៀងផ្ទាត់ពាក់កណ្តាលវគ្គ (កន្លងផុត ៤៥:០០)</h2>
          <p class="checkpoint-subtitle">ដកដង្ហើមវែងៗ ពិសារទឹក និងផ្ទៀងផ្ទាត់គ្រឹះផ្នត់គំនិតរបស់អ្នក មុនពេលយើងចាប់ផ្តើមអនុវត្ត។</p>

          <div class="checkpoint-grid">
            <div class="check-item">
              <div class="check-icon">&#128077;</div>
              <h4>មេដៃឡើងលើ៖ ច្បាស់លាស់</h4>
              <p>ខ្ញុំយល់ពីប្រភេទទាំង ៤ ហើយដឹងច្បាស់ថាហេតុអ្វីលេខដែលមានលេខសូន្យខាងមុខត្រូវរក្សាទុកជា Text។</p>
            </div>
            <div class="check-item">
              <div class="check-icon">&#9995;</div>
              <h4>មេដៃទៅចំហៀង៖ នៅមិនទាន់ច្បាស់</h4>
              <p>ខ្ញុំយល់ពី Text និង Number ប៉ុន្តែខ្ញុំចង់ឃើញរបៀបដែល Power Apps គ្រប់គ្រងកុងតាក់ Date និង Yes/No។</p>
            </div>
            <div class="check-item">
              <div class="check-icon">&#128161;</div>
              <h4>ចងចាំវិធានមាស</h4>
              <p><em>"បើខ្ញុំមិនដែលបូកដកលើវាទេ នោះវាជា Text!"</em></p>
            </div>
          </div>
        </div>
      `
    },

    'slide-14': {
      title: 'ករណីសិក្សា៖ ទម្រង់ស្នើសុំជំនួយ និងថែទាំ',
      segment: 'ផ្នែកទី ៥៖ ការអនុវត្តផ្ទាល់របស់អ្នកសិក្សា (៦០:០០ - ៧៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"ឥឡូវនេះ ចូរយើងពិនិត្យមើលកម្មវិធីពិតប្រាកដដែលយើងកំពុងបង្កើតសម្រាប់ Apex Plastics៖ ទម្រង់រាយការណ៍ឧប្បត្តិហេតុ និងថែទាំគ្រឿងចក្រ!
សូមពិនិត្យមើលប្រអប់ទិន្នន័យទាំង ៥ នៅលើអេក្រង់នេះ៖
១. ឈ្មោះអ្នកបញ្ជាម៉ាស៊ីន៖ 'សុភា' -> ប្រភេទអ្វី? Text!
២. កូដផ្នែក៖ 'DEPT-PLAST-04' -> មានផ្ទុកអក្សរ និងសញ្ញាដក៖ Text!
៣. ម៉ោងឈប់ដំណើរការ៖ '2.5' -> ម៉ោងដែលខាតបង់៖ យើងត្រូវបូកសរុប និងរកមធ្យមភាគ៖ Number!
៤. កាលបរិច្ឆេទកើតហេតុ៖ '2026-10-29' -> Date/Time!
៥. គ្រោះថ្នាក់សុវត្ថិភាព? -> កុងតាក់បិទបើក៖ Yes/No (Boolean)!
នៅពេលអ្នករចនាកម្មវិធី កិច្ចការទីមួយរបស់អ្នកជានិច្ច គឺត្រូវផ្គូផ្គងគ្រប់ប្រអប់ទាំងអស់ទៅនឹងប្រភេទនៃទិន្នន័យត្រឹមត្រូវរបស់វា។"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge teal-badge">ស្ថាបត្យកម្មប្រព័ន្ធឌីជីថល</span>
          <h2 class="slide-title">Apex Plastics៖ ការបំបែករចនាសម្ព័ន្ធទម្រង់ជំនួយ</h2>
          <p class="slide-lead">រាល់ការបញ្ចូលនៅលើអេក្រង់ផលិតកម្ម សុទ្ធតែភ្ជាប់ដោយផ្ទាល់ទៅនឹងប្រអប់ផ្ទុកទិន្នន័យខាងក្រោម។</p>
        </div>

        <div class="form-blueprint-grid">
          <div class="form-preview-card">
            <div class="form-title-bar">ទម្រង់រាយការណ៍ឧប្បត្តិហេតុថែទាំ Apex Plastics</div>
            <div class="form-field-row">
              <label>ឈ្មោះអ្នកបញ្ជាម៉ាស៊ីន</label>
              <div class="mock-input">សុភា គឹម</div>
            </div>
            <div class="form-field-row">
              <label>កូដផ្នែកផលិតកម្ម</label>
              <div class="mock-input">DEPT-PLAST-04</div>
            </div>
            <div class="form-field-row">
              <label>ម៉ោងឈប់ដំណើរការ (ម៉ោង)</label>
              <div class="mock-input">2.5</div>
            </div>
            <div class="form-field-row">
              <label>កាលបរិច្ឆេទកើតហេតុ</label>
              <div class="mock-input">&#128197; 2026-10-29</div>
            </div>
            <div class="form-field-row">
              <label>មានគ្រោះថ្នាក់សុវត្ថិភាពដែរឬទេ?</label>
              <div class="mock-toggle"><span class="toggle-switch on"></span> ពិត (YES)</div>
            </div>
          </div>

          <div class="schema-mapping-card">
            <h4 style="margin-top:0; color:#38bdf8;">ការបញ្ជាក់ប្រភេទនៃទិន្នន័យ៖</h4>
            <div class="mapping-row">
              <span class="field-name">ឈ្មោះអ្នកបញ្ជាម៉ាស៊ីន</span>
              <span class="type-pill pill-text">អត្ថបទ (Text)</span>
              <span class="ui-ctrl">TextInput (Text)</span>
            </div>
            <div class="mapping-row">
              <span class="field-name">កូដផ្នែកផលិតកម្ម</span>
              <span class="type-pill pill-text">អត្ថបទ (Text)</span>
              <span class="ui-ctrl">Dropdown / Text</span>
            </div>
            <div class="mapping-row">
              <span class="field-name">ម៉ោងឈប់ដំណើរការ</span>
              <span class="type-pill pill-num">លេខ (Number)</span>
              <span class="ui-ctrl">TextInput (Number)</span>
            </div>
            <div class="mapping-row">
              <span class="field-name">កាលបរិច្ឆេទកើតហេតុ</span>
              <span class="type-pill pill-date">កាលបរិច្ឆេទ (Date)</span>
              <span class="ui-ctrl">DatePicker</span>
            </div>
            <div class="mapping-row">
              <span class="field-name">គ្រោះថ្នាក់សុវត្ថិភាព?</span>
              <span class="type-pill pill-bool">បាទ/ទេ (Yes/No)</span>
              <span class="ui-ctrl">Toggle / Checkbox</span>
            </div>
          </div>
        </div>
      `
    },

    'slide-15': {
      title: 'Power Fx & ប្រភេទនៃទិន្នន័យ',
      segment: 'ផ្នែកទី ៥៖ ការអនុវត្តផ្ទាល់របស់អ្នកសិក្សា (៦០:០០ - ៧៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"តើ Microsoft Power Apps គ្រប់គ្រងប្រភេទនៃទិន្នន័យទាំងនេះក្នុងកូដយ៉ាងដូចម្តេច?
នៅក្នុង Power Fx រាល់ការគ្រប់គ្រង (controls) នៅលើអេក្រង់សុទ្ធតែមានលក្ខណៈសម្បត្តិ (properties) ដែលផ្ទុកទិន្នន័យ៖
- ប្រអប់អត្ថបទឈ្មោះ txtOperator មាន property៖ txtOperator.Text។ វាជាប្រភេទ Text ជានិច្ច!
- ប្រអប់កាលបរិច្ឆេទមាន៖ dpIncidentDate.SelectedDate។ វាជាប្រភេទ Date!
- កុងតាក់បិទបើកមាន៖ chkHazard.Value។ វាជាប្រភេទ Boolean (true ឬ false)!
Power Fx មានអនុគមន៍ជំនួយជាច្រើនដើម្បីពិនិត្យទិន្នន័យ៖
- IsBlank(txtOperator.Text) ពិនិត្យមើលថាតើអ្នកប្រើប្រាស់ភ្លេចបញ្ចូលទិន្នន័យដែរឬទេ!
- Today() ទាញយកកាលបរិច្ឆេទបច្ចុប្បន្ន!
- Value(txtHours.Text) បម្លែងអក្សរជាលេខ ទៅជាលេខគណិតវិទ្យាពិតប្រាកដ!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge purple-badge">ការតភ្ជាប់ Power Fx</span>
          <h2 class="slide-title">របៀបដែល Power Apps អាន និងត្រួតពិនិត្យទិន្នន័យ</h2>
          <p class="slide-lead">ការតភ្ជាប់ឧបករណ៍បញ្ជាលើអេក្រង់ UI ទៅនឹងលក្ខណៈសម្បត្តិ Power Fx និងអនុគមន៍ផ្ទៀងផ្ទាត់។</p>
        </div>

        <div class="grid-2-col">
          <div class="code-card">
            <div class="code-header">ការអានតម្លៃពីឧបករណ៍បញ្ជាលើអេក្រង់</div>
            <pre class="powerfx-code">
<span class="comment">// ១. អានអត្ថបទពីប្រអប់បញ្ចូល</span>
<span class="keyword">Set</span>(varOperator, txtOperator.<span class="prop">Text</span>);

<span class="comment">// ២. អានកាលបរិច្ឆេទពី DatePicker</span>
<span class="keyword">Set</span>(varReportDate, dpDate.<span class="prop">SelectedDate</span>);

<span class="comment">// ៣. អានតម្លៃ ពិត/មិនពិត ពី Toggle</span>
<span class="keyword">Set</span>(varIsUrgent, chkUrgent.<span class="prop">Value</span>);
            </pre>
          </div>

          <div class="code-card">
            <div class="code-header">ការត្រួតពិនិត្យ &amp; ផ្ទៀងផ្ទាត់ទិន្នន័យ</div>
            <pre class="powerfx-code">
<span class="comment">// ពិនិត្យមើលថាតើប្រអប់ត្រូវបានទុកទំនេរឬទេ</span>
<span class="func">IsBlank</span>(txtOperator.<span class="prop">Text</span>)  <span class="comment">// ផ្តល់លទ្ធផល true/false</span>

<span class="comment">// ទាញយកកាលបរិច្ឆេទប្រតិទិនបច្ចុប្បន្ន</span>
<span class="func">Today</span>()                      <span class="comment">// ផ្តល់លទ្ធផល 2026-10-29</span>

<span class="comment">// បម្លែងអត្ថបទទៅជាលេខគណិតវិទ្យាពិត</span>
<span class="func">Value</span>(txtDowntime.<span class="prop">Text</span>)     <span class="comment">// "2.5" ➔ 2.5</span>
            </pre>
          </div>
        </div>
      `
    },

    'slide-16': {
      title: 'ការបម្លែងប្រភេទ៖ ស្ពាន Value() & Text()',
      segment: 'ផ្នែកទី ៥៖ ការអនុវត្តផ្ទាល់របស់អ្នកសិក្សា (៦០:០០ - ៧៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"តើមានអ្វីកើតឡើងប្រសិនបើបុគ្គលិកវាយលេខចូលទៅក្នុងប្រអប់អត្ថបទធម្មតា?
តាមលំនាំដើម អ្វីៗទាំងអស់ដែលបានវាយចូលទៅក្នុង TextInput control គឺជា អត្ថបទ (TEXT)! ទោះបីជាពួកគេវាយលេខ 50 ក៏វាជា '50' ដែលមានសញ្ញាសម្រង់ដែរ!
តើយើងបម្លែងវាទៅជាលេខពិតប្រាកដដោយរបៀបណាដើម្បីអាចបូកវាបានដោយសុវត្ថិភាព?
យើងប្រើអនុគមន៍ Power Fx៖ Value()!
Value('50') បម្លែងខ្សែអក្សរ '50' ទៅជាលេខ 50!
ហើយចុះប្រសិនបើយើងចង់យកលេខ ឬកាលបរិច្ឆេទ មកបង្ហាញឱ្យស្អាតជាមួយរូបិយប័ណ្ណវិញ?
យើងប្រើអនុគមន៍ Text()!
Text(1250, '$#,###.00') បម្លែង 1250 ទៅជា '$1,250.00'!
សូមគិតថា Value() និង Text() គឺជាស្ពានចម្លងរវាងក្រឡផ្ទុកគ្រឿងផ្សំទាំងឡាយ។"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge blue-badge">ស្ពានបម្លែងទិន្នន័យ</span>
          <h2 class="slide-title">ការបម្លែងទិន្នន័យ៖ ស្ពាន <code>Value()</code> &amp; <code>Text()</code></h2>
          <p class="slide-lead">ការឆ្លងកាត់ដោយសុវត្ថិភាពរវាងខ្សែអក្សរ លេខគណិតវិទ្យា និងកាលបរិច្ឆេទប្រតិទិន។</p>
        </div>

        <div class="conversion-bridge-grid">
          <div class="bridge-card bridge-to-num">
            <div class="bridge-direction">
              <span class="type-pill pill-text">អត្ថបទ (Text)</span>
              <span class="bridge-arrow">&#10142;</span>
              <span class="type-pill pill-num">លេខ (Number)</span>
            </div>
            <h3>អនុគមន៍ <code>Value()</code></h3>
            <p>ស្រង់យកតួលេខចេញពីខ្សែអក្សរ ដើម្បីឱ្យអ្នកអាចធ្វើប្រមាណវិធីគណិតវិទ្យាបានដោយសុវត្ថិភាព។</p>
            <div class="code-box">
              <code>Value("45.5") + Value("10") = <strong>55.5</strong></code>
            </div>
            <div class="bridge-note">&#9888; ប្រសិនបើអត្ថបទមានផ្ទុកអក្សរដូចជា "abc" នោះ Value() នឹងផ្តល់លទ្ធផល Blank/Error។</div>
          </div>

          <div class="bridge-card bridge-to-text">
            <div class="bridge-direction">
              <span class="type-pill pill-num">លេខ / កាលបរិច្ឆេទ</span>
              <span class="bridge-arrow">&#10142;</span>
              <span class="type-pill pill-text">អត្ថបទ (Text)</span>
            </div>
            <h3>អនុគមន៍ <code>Text()</code></h3>
            <p>រៀបចំទម្រង់លេខ ឬកាលបរិច្ឆេទឱ្យទៅជាខ្សែអក្សរដែលងាយស្រួលអានសម្រាប់ស្លាក និងអ៊ីមែល។</p>
            <div class="code-box">
              <code>Text(Today(), "dd-mmm-yyyy") = <strong>"29-Oct-2026"</strong></code><br>
              <code>Text(5420, "$#,###") = <strong>"$5,420"</strong></code>
            </div>
            <div class="bridge-note">&#10004; ល្អឥតខ្ចោះសម្រាប់របាយការណ៍ស្អាតបាត និងមតិឆ្លើយតបលើ UI។</div>
          </div>
        </div>
      `
    },

    'slide-17': {
      title: 'សង្ខេបការអនុវត្ត៖ សន្និធិគ្រឿងបន្លាស់',
      segment: 'ផ្នែកទី ៥៖ ការអនុវត្តផ្ទាល់របស់អ្នកសិក្សា (៦០:០០ - ៧៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"ឥឡូវនេះដល់ពេលសម្រាប់ការអនុវត្តផ្ទាល់ដៃរបស់អ្នកហើយ!
អ្នកគឺជាអ្នករចនាកម្មវិធីនាំមុខគេសម្រាប់ឃ្លាំងគ្រឿងបន្លាស់នៅ Apex Plastics។
ប្រធានរោងចក្រផ្តល់ឱ្យអ្នកនូវប្រអប់ទិន្នន័យ ៦ នៅលើកាតមួយ៖
១. លេខស៊េរីគ្រឿងបន្លាស់ ('SN-8841-A')
២. ចំនួនដែលមានក្នុងស្តុក ('25')
៣. តម្លៃជំនួសក្នុងមួយឯកតា ($120.50)
៤. កាលបរិច្ឆេទត្រួតពិនិត្យចុងក្រោយ ('2026-10-15')
៥. ត្រូវការកុម្ម៉ង់បន្ទាន់ដែរឬទេ? (ពិត/មិនពិត)
៦. កូដទីតាំងធ្នើរក្នុងឃ្លាំង ('BAY-04-NORTH')
នៅលើស្លាយបន្ទាប់ អ្នកនឹងអនុវត្តការចាត់ថ្នាក់ប្រអប់នីមួយៗចូលទៅក្នុងប្រអប់ផ្ទុកត្រឹមត្រូវរបស់វា!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge teal-badge">សង្ខេបបញ្ហាប្រឈម</span>
          <h2 class="slide-title">ការអនុវត្ត៖ សន្និធិគ្រឿងបន្លាស់ Apex Plastics</h2>
          <p class="slide-lead">វិភាគប្រអប់ទិន្នន័យសន្និធិទាំង ៦ ខាងក្រោម មុនពេលដាក់ពួកវាចូលទៅក្នុងប្រអប់ផ្ទុកឌីជីថលត្រឹមត្រូវ។</p>
        </div>

        <div class="parts-brief-grid">
          <div class="brief-item">
            <span class="brief-num">១</span>
            <div>
              <strong>លេខស៊េរីគ្រឿងបន្លាស់ (Part Serial)</strong>
              <p>គំរូ៖ <code>"SN-8841-A"</code> (ស្លាកដែកសម្គាល់លើម៉ាស៊ីនបាញ់ជ័រ)។</p>
            </div>
          </div>
          <div class="brief-item">
            <span class="brief-num">២</span>
            <div>
              <strong>ចំនួនដែលមានក្នុងស្តុក (Quantity)</strong>
              <p>គំរូ៖ <code>25</code> (ចំនួនរាប់ជាក់ស្តែងលើធ្នើរ ដកចេញពេលយកទៅប្រើ)។</p>
            </div>
          </div>
          <div class="brief-item">
            <span class="brief-num">៣</span>
            <div>
              <strong>តម្លៃជំនួសក្នុងមួយឯកតា (Unit Cost)</strong>
              <p>គំរូ៖ <code>$120.50</code> (តម្លៃទិញចូលសម្រាប់គណនាតម្លៃស្តុកសរុប)។</p>
            </div>
          </div>
          <div class="brief-item">
            <span class="brief-num">៤</span>
            <div>
              <strong>កាលបរិច្ឆេទត្រួតពិនិត្យចុងក្រោយ</strong>
              <p>គំរូ៖ <code>2026-10-15</code> (កាលបរិច្ឆេទដែលផ្នែកត្រួតពិនិត្យគុណភាពបានបញ្ជាក់)។</p>
            </div>
          </div>
          <div class="brief-item">
            <span class="brief-num">៥</span>
            <div>
              <strong>ត្រូវការកុម្ម៉ង់បន្ទាន់ដែរឬទេ?</strong>
              <p>គំរូ៖ <code>true</code> (ការជូនដំណឹងស្វ័យប្រវត្តិកាលណាទំនិញធ្លាក់ក្រោមចំនួនកំណត់)។</p>
            </div>
          </div>
          <div class="brief-item">
            <span class="brief-num">៦</span>
            <div>
              <strong>កូដទីតាំងធ្នើរក្នុងឃ្លាំង (Bay Location)</strong>
              <p>គំរូ៖ <code>"BAY-04-NORTH"</code> (កូអរដោនេធ្នើរជាក់ស្តែងក្នុងអគារ C)។</p>
            </div>
          </div>
        </div>
      `
    },

    'slide-18': {
      title: 'តារាងចាត់ថ្នាក់ទិន្នន័យអន្តរកម្ម ៦ ប្រអប់',
      segment: 'ផ្នែកទី ៥៖ ការអនុវត្តផ្ទាល់របស់អ្នកសិក្សា (៦០:០០ - ៧៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"នេះជាតារាងចាត់ថ្នាក់ទិន្នន័យជាក់ស្តែងរបស់អ្នក!
ចុចលើប្រអប់នីមួយៗក្នុងចំណោមប្រអប់ទាំង ៦ នៅខាងឆ្វេង បន្ទាប់មកចុចលើប្រអប់ផ្ទុកត្រឹមត្រូវនៅខាងស្តាំ។
សូមមើល៖ ប្រសិនបើអ្នកព្យាយាមដាក់ 'លេខស៊េរីគ្រឿងបន្លាស់' ទៅក្នុង Number នោះតារាងនឹងព្រមានអ្នកថាលេខស៊េរីមានផ្ទុកអក្សរ និងសញ្ញាដក។
តោះមើលថាតើអ្នកអាចទទួលបានពិន្ទុពេញ ៦ លើ ៦ ដែរឬទេ!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge green-badge">ការអនុវត្តផ្ទាល់ដៃ</span>
          <h2 class="slide-title">តារាងចាត់ថ្នាក់ទិន្នន័យអន្តរកម្ម ៦ ប្រអប់</h2>
          <p class="slide-lead">ចុចលើស្លាកទិន្នន័យនៅខាងឆ្វេង បន្ទាប់មកចុចលើប្រអប់ផ្ទុកត្រូវគ្នានៅខាងស្តាំដើម្បីចាត់ថ្នាក់។</p>
        </div>

        <div class="classifier-container" id="classifier-widget">
          <div class="classifier-left">
            <h4>ប្រអប់ដែលមិនទាន់ចាត់ថ្នាក់៖</h4>
            <div class="field-chips-list" id="field-chips">
              <button class="field-chip active" data-field="f-serial" data-correct="text">លេខស៊េរី ("SN-8841-A")</button>
              <button class="field-chip" data-field="f-qty" data-correct="number">ចំនួនក្នុងស្តុក (25)</button>
              <button class="field-chip" data-field="f-cost" data-correct="number">តម្លៃក្នុងមួយឯកតា ($120.50)</button>
              <button class="field-chip" data-field="f-date" data-correct="date">ថ្ងៃត្រួតពិនិត្យ (2026-10-15)</button>
              <button class="field-chip" data-field="f-reorder" data-correct="boolean">ត្រូវការកុម្ម៉ង់? (True/False)</button>
              <button class="field-chip" data-field="f-bay" data-correct="text">ទីតាំងធ្នើរ ("BAY-04-NORTH")</button>
            </div>
            <div class="classifier-score-box">
              ពិន្ទុ៖ <span id="classifier-score">0</span> / ៦ ត្រឹមត្រូវ
            </div>
          </div>

          <div class="classifier-right">
            <h4>ប្រអប់ផ្ទុកគោលដៅ៖</h4>
            <div class="target-bins-grid">
              <button class="target-bin bin-text" data-target="text">
                <div class="bin-header">&#128221; អត្ថបទ (Text)</div>
                <div class="bin-contents" id="bin-text-content">ទទេ</div>
              </button>
              <button class="target-bin bin-num" data-target="number">
                <div class="bin-header">&#128290; លេខ (Number)</div>
                <div class="bin-contents" id="bin-number-content">ទទេ</div>
              </button>
              <button class="target-bin bin-date" data-target="date">
                <div class="bin-header">&#128197; កាលបរិច្ឆេទ (Date)</div>
                <div class="bin-contents" id="bin-date-content">ទទេ</div>
              </button>
              <button class="target-bin bin-bool" data-target="boolean">
                <div class="bin-header">&#9989; បាទ/ទេ (Boolean)</div>
                <div class="bin-contents" id="bin-boolean-content">ទទេ</div>
              </button>
            </div>
            <div class="classifier-feedback" id="classifier-feedback">ចុចលើស្លាកទិន្នន័យនៅខាងឆ្វេង រួចចុចលើប្រអប់ផ្ទុកខាងលើ។</div>
          </div>
        </div>
      `
    },

    'slide-19': {
      title: 'ការយល់ខុសទូទៅ ៤ របស់អ្នកចាប់ផ្តើមដំបូង',
      segment: 'ផ្នែកទី ៦៖ ការវាយតម្លៃ & ស្ពានចម្លង (៧៥:០០ - ៩០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"សូមពិនិត្យមើលការយល់ខុសទូទៅចំនួន ៤ ដែលអ្នកចាប់ផ្តើមដំបូងតែងតែជួបប្រទះ៖
ការយល់ខុស ១៖ 'រាល់លេខទាំងអស់សុទ្ធតែជាប្រភេទ Number។'
ការកែតម្រូវ៖ លេខទូរស័ព្ទ កូដប្រៃសណីយ៍ និងលេខស៊េរី គឺជា TEXT ពីព្រោះយើងមិនដែលបូកដកលើវាទេ ហើយវាត្រូវការរក្សាលេខសូន្យខាងមុខ!
ការយល់ខុស ២៖ 'Yes/No គ្រាន់តែជាការវាយពាក្យ 'Yes' និង 'No'។'
ការកែតម្រូវ៖ ក្នុងការចងចាំរបស់កុំព្យូទ័រ Yes/No គឺជា Boolean true និង false!
ការយល់ខុស ៣៖ 'Power Apps នឹងបម្លែងអត្ថបទទៅជាលេខឱ្យខ្ញុំដោយស្វ័យប្រវត្តិ។'
ការកែតម្រូវ៖ Power Apps នឹងផ្តល់កំហុស ឬតអក្សរចូលគ្នា លុះត្រាតែអ្នកប្រើ Value() ឬកំណត់ប្រអប់បញ្ចូលជា Number!
ការយល់ខុស ៤៖ 'កាលបរិច្ឆេទថ្ងៃនេះ គ្រាន់តែជាអត្ថបទដូចជា 'October 29' ប៉ុណ្ណោះ។'
ការកែតម្រូវ៖ ការរក្សាទុកកាលបរិច្ឆេទជាអត្ថបទ ធ្វើឱ្យអ្នកមិនអាចតម្រៀបតាមលំដាប់ពេលវេលា ឬគណនាចំនួនថ្ងៃដែលកន្លងផុតបានឡើយ!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge red-badge">ការកែតម្រូវផ្នត់គំនិត</span>
          <h2 class="slide-title">ការយល់ខុសទូទៅ ៤ របស់អ្នកចាប់ផ្តើមដំបូង &amp; ការកែតម្រូវ</h2>
          <p class="slide-lead">ការកែតម្រូវគំរូខុសដែលអាចជឿជាក់បាន មុនពេលវាក្លាយជាទម្លាប់មិនល្អក្នុងការសរសេរកម្មវិធី។</p>
        </div>

        <div class="grid-2-col">
          <div class="misconception-card">
            <div class="misc-bad">&#10060; ផ្នត់គំនិតខុស #១</div>
            <h4>"បើវាមានតួលេខ វាច្បាស់ជាប្រភេទ Number ហើយ។"</h4>
            <p class="misc-fix"><strong>ការពន្យល់កែតម្រូវ៖</strong> លេខទូរស័ព្ទ អត្តលេខបុគ្គលិក និងកូដប្រៃសណីយ៍ គឺជា <strong>Text</strong>។ លេខពិតប្រាកដគឺត្រូវបានបម្រុងទុកសម្រាប់តែបរិមាណគណិតវិទ្យាប៉ុណ្ណោះ។</p>
          </div>

          <div class="misconception-card">
            <div class="misc-bad">&#10060; ផ្នត់គំនិតខុស #២</div>
            <h4>"Yes/No គ្រាន់តែជាការវាយពាក្យ 'Yes' ឬ 'No'។"</h4>
            <p class="misc-fix"><strong>ការពន្យល់កែតម្រូវ៖</strong> Yes/No គឺជាស្ថានភាពពីរយ៉ាងនៃ <strong>Boolean</strong>៖ <code>true</code> ឬ <code>false</code>។ ការរក្សាទុកជាអត្ថបទធ្វើឱ្យខាតបង់ទំហំផ្ទុក និងខូចតក្កវិជ្ជានៃលក្ខខណ្ឌ។</p>
          </div>

          <div class="misconception-card">
            <div class="misc-bad">&#10060; ផ្នត់គំនិតខុស #៣</div>
            <h4>"កម្មវិធីនឹងស្មានដឹងពីបំណងរបស់ខ្ញុំ ហើយធ្វើលេខឱ្យ។"</h4>
            <p class="misc-fix"><strong>ការពន្យល់កែតម្រូវ៖</strong> កុំព្យូទ័រមិនដែលស្មានឡើយ។ ប្រអប់អត្ថបទបញ្ចេញតម្លៃ <code>"10"</code>។ ដើម្បីបូកវា អ្នកត្រូវតែប្រើ <code>Value(TextInput.Text)</code> ឬកំណត់ប្រអប់ជា Numeric។</p>
          </div>

          <div class="misconception-card">
            <div class="misc-bad">&#10060; ផ្នត់គំនិតខុស #៤</div>
            <h4>"ខ្ញុំអាចរក្សាទុកកាលបរិច្ឆេទជាពាក្យអត្ថបទធម្មតាបាន។"</h4>
            <p class="misc-fix"><strong>ការពន្យល់កែតម្រូវ៖</strong> ការរក្សាទុក <code>"29-Oct-2026"</code> ជាអត្ថបទ មានន័យថាកុំព្យូទ័រមិនអាចគណនាកាលបរិច្ឆេទផុតកំណត់ ឬតម្រៀបតាមលំដាប់កាលវេលាបានឡើយ។</p>
          </div>
        </div>
      `
    },

    'slide-20': {
      title: 'កម្រងសំណួរផ្ទៀងផ្ទាត់ចំណេះដឹង ៥ សំណួរ',
      segment: 'ផ្នែកទី ៦៖ ការវាយតម្លៃ & ស្ពានចម្លង (៧៥:០០ - ៩០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"ដល់ពេលសម្រាប់កម្រងសំណួរផ្ទៀងផ្ទាត់ ៥ សំណួររបស់យើងហើយ!
សូមកត់សម្គាល់សំណួរទី ២ និងទី ៤ ដែលសួរជាក់លាក់អំពី 'ហេតុអ្វី' និង 'មានអ្វីកើតឡើងប្រសិនបើ'។
ចំណាយពេលគិតឱ្យបានម៉ត់ចត់ ជ្រើសរើសចម្លើយដែលល្អបំផុតសម្រាប់សំណួរនីមួយៗ ហើយយើងនឹងពិនិត្យមើលការពន្យល់ទាំងអស់គ្នា។"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge blue-badge">ការផ្ទៀងផ្ទាត់ចំណេះដឹង</span>
          <h2 class="slide-title">ការវាយតម្លៃចំណេះដឹងបញ្ចប់ថ្ងៃទី ៣</h2>
          <p class="slide-lead">ឆ្លើយសំណួរទាំង ៥ ដើម្បីបញ្ជាក់ពីភាពស្ទាត់ជំនាញរបស់អ្នកលើប្រភេទនៃទិន្នន័យ ប្រអប់ផ្ទុក និងតក្កវិជ្ជាបម្លែង។</p>
        </div>

        <div class="quiz-container" id="quiz-widget">
          <div class="quiz-header-bar">
            <span id="quiz-question-counter">សំណួរទី ១ នៃ ៥</span>
            <span id="quiz-score-display">ពិន្ទុ៖ ០ / ៥</span>
          </div>

          <div class="quiz-body" id="quiz-body">
            <!-- បង្ហាញដោយស្វ័យប្រវត្តិតាមរយៈ script.js -->
          </div>

          <div class="quiz-navigation">
            <button class="btn-subtle" id="quiz-prev-btn" disabled>&#8592; ថយក្រោយ</button>
            <button class="btn-primary" id="quiz-next-btn">សំណួរបន្ទាប់ &#8594;</button>
          </div>
        </div>
      `
    },

    'slide-21': {
      title: 'បញ្ហាប្រឈមចុងក្រោយ៖ កំណត់ហេតុថែទាំគ្រឿងចក្រ',
      segment: 'ផ្នែកទី ៦៖ ការវាយតម្លៃ & ស្ពានចម្លង (៧៥:០០ - ៩០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"នេះជាបញ្ហាប្រឈមចុងក្រោយសម្រាប់ថ្ងៃទី ៣៖
Apex Plastics ត្រូវការកំណត់ហេតុថែទាំគ្រឿងចក្រឌីជីថលថ្មីស្រឡាងមួយ។
អ្នកមានប្រអប់ទិន្នន័យអាជីវកម្មចំនួន ៨៖
១. លេខកូដសម្គាល់គ្រឿងចក្រ ('P-402-EXTRUDER')
២. លេខទូរស័ព្ទជាងបច្ចេកទេស ('+855-12-345-678')
៣. រង្វាស់សម្ពាធប្រេង Hydraulic (185.4 PSI)
៤. កាលបរិច្ឆេទថែទាំ (Today)
៥. ម៉ាស៊ីនមានសុវត្ថិភាពសម្រាប់ដំណើរការ? (True/False)
៦. ចំនួនគ្រឿងបន្លាស់ដែលបានផ្លាស់ប្តូរ (3)
៧. តម្លៃជួសជុលជាដុល្លារ ($450.00)
៨. កំណត់ចំណាំលម្អិតរបស់ជាង ('បានលាងសម្អាតតម្រង និងផ្លាស់ប្តូរប្រអប់កៅស៊ូ')
នៅលើក្រដាសកិច្ចការរបស់អ្នក ចូរចាត់តាំងប្រភេទនៃទិន្នន័យ ឧបករណ៍បញ្ជាលើ UI និងពន្យល់ពីមូលហេតុ!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge purple-badge">បញ្ហាប្រឈមឯករាជ្យ</span>
          <h2 class="slide-title">បញ្ហាប្រឈមចុងក្រោយ៖ កំណត់ហេតុថែទាំគ្រឿងចក្រ Apex</h2>
          <p class="slide-lead">រៀបចំរចនាសម្ព័ន្ធទិន្នន័យពេញលេញ និងការផ្គូផ្គងឧបករណ៍បញ្ជា UI សម្រាប់ប្រអប់ទិន្នន័យថែទាំទាំង ៨។</p>
        </div>

        <div class="challenge-table-wrapper">
          <table class="challenge-table">
            <thead>
              <tr>
                <th>#</th>
                <th>ឈ្មោះប្រអប់ទិន្នន័យ</th>
                <th>តម្លៃគំរូ</th>
                <th>ប្រភេទនៃទិន្នន័យគោលដៅ</th>
                <th>ការគ្រប់គ្រងលើ UI ដែលណែនាំ</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>១</td><td>កូដសម្គាល់គ្រឿងចក្រ</td><td><code>"P-402-EXTRUDER"</code></td><td>?</td><td>?</td></tr>
              <tr><td>២</td><td>ទូរស័ព្ទជាងបច្ចេកទេស</td><td><code>"+855-12-345-678"</code></td><td>?</td><td>?</td></tr>
              <tr><td>៣</td><td>សម្ពាធប្រេង Hydraulic</td><td><code>185.4</code> (PSI)</td><td>?</td><td>?</td></tr>
              <tr><td>៤</td><td>កាលបរិច្ឆេទថែទាំ</td><td><code>Today()</code></td><td>?</td><td>?</td></tr>
              <tr><td>៥</td><td>សុវត្ថិភាពដំណើរការ?</td><td><code>true</code></td><td>?</td><td>?</td></tr>
              <tr><td>៦</td><td>ចំនួនគ្រឿងបន្លាស់ផ្លាស់ប្តូរ</td><td><code>3</code></td><td>?</td><td>?</td></tr>
              <tr><td>៧</td><td>តម្លៃជួសជុល ($)</td><td><code>450.00</code></td><td>?</td><td>?</td></tr>
              <tr><td>៨</td><td>កំណត់ចំណាំការងារ</td><td><code>"បានលាងតម្រង និងប្តូរកៅស៊ូ"</code></td><td>?</td><td>?</td></tr>
            </tbody>
          </table>
        </div>
      `
    },

    'slide-22': {
      title: 'ដំណោះស្រាយបញ្ហាប្រឈម & រូបប៊្រិកវាយតម្លៃ',
      segment: 'ផ្នែកទី ៦៖ ការវាយតម្លៃ & ស្ពានចម្លង (៧៥:០០ - ៩០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"ចូរយើងបង្ហាញដំណោះស្រាយគំរូទាំងអស់គ្នា!
ចុចលើប៊ូតុង 'បង្ហាញដំណោះស្រាយ' ដើម្បីពិនិត្យមើលសន្លឹកចម្លើយ។
សូមកត់សម្គាល់៖ លេខទូរស័ព្ទជាង គឺជា TEXT ដោយសារតែសញ្ញាបូក និងលេខសូន្យខាងមុខ!
សម្ពាធប្រេង ចំនួនគ្រឿងបន្លាស់ និងតម្លៃជួសជុល គឺជា NUMBERS ពីព្រោះយើងត្រូវគណនាមធ្យមភាគ និងផលបូកសរុប។
ផ្ទៀងផ្ទាត់ការងាររបស់អ្នកជាមួយរូបប៊្រិកវាយតម្លៃ ៤ កម្រិត៖
កម្រិត ៤ (Mastery) មានន័យថាអ្នកកំណត់ត្រូវទាំង ៨ ប្រអប់ជាមួយការពន្យល់យ៉ាងច្បាស់លាស់!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge green-badge">គំរូ &amp; រូបប៊្រិក</span>
          <h2 class="slide-title">ដំណោះស្រាយបញ្ហាប្រឈម &amp; រូបប៊្រិកវាយតម្លៃ ៤ កម្រិត</h2>
          <p class="slide-lead">ប្រៀបធៀបរចនាសម្ព័ន្ធទិន្នន័យរបស់អ្នកទៅនឹងស្តង់ដារផលិតកម្ម និងវាយតម្លៃសមត្ថភាពរបស់អ្នក។</p>
        </div>

        <div class="grid-2-col">
          <div class="solution-card">
            <div class="solution-header">
              <h4>ការបញ្ជាក់រចនាសម្ព័ន្ធគំរូ</h4>
              <button class="btn-reveal" id="btn-reveal-solution">បង្ហាញដំណោះស្រាយ</button>
            </div>
            <div class="solution-body collapsed" id="solution-content">
              <ul class="solution-list">
                <li><strong>កូដសម្គាល់គ្រឿងចក្រ៖</strong> <code>Text</code> &#8594; TextInput (កូដអក្សរនិងលេខ)</li>
                <li><strong>ទូរស័ព្ទជាង៖</strong> <code>Text</code> &#8594; TextInput (វិធានមាស៖ មិនធ្វើលេខ!)</li>
                <li><strong>សម្ពាធប្រេង (PSI)៖</strong> <code>Number</code> &#8594; TextInput (Format: Number)</li>
                <li><strong>កាលបរិច្ឆេទថែទាំ៖</strong> <code>Date/Time</code> &#8594; DatePicker control</li>
                <li><strong>សុវត្ថិភាពដំណើរការ?៖</strong> <code>Yes/No</code> &#8594; Toggle switch (Boolean)</li>
                <li><strong>ចំនួនគ្រឿងបន្លាស់៖</strong> <code>Number</code> &#8594; TextInput (Format: Number)</li>
                <li><strong>តម្លៃជួសជុល៖</strong> <code>Number</code> &#8594; TextInput (Format: Number)</li>
                <li><strong>កំណត់ចំណាំការងារ៖</strong> <code>Text</code> &#8594; TextInput (Multiline mode)</li>
              </ul>
            </div>
          </div>

          <div class="rubric-card">
            <h4>រូបប៊្រិកវាយតម្លៃ (កម្រិតសមត្ថភាពទាំង ៤)</h4>
            <div class="rubric-levels">
              <div class="level-item level-4">
                <span class="lvl-title">កម្រិត ៤៖ ស្ទាត់ជំនាញ (១០០%)</span>
                <p>ត្រូវទាំង ៨ ប្រអប់; កំណត់លេខទូរស័ព្ទជា Text បានត្រឹមត្រូវ; ផ្គូផ្គងឧបករណ៍បញ្ជាត្រឹមត្រូវ។</p>
              </div>
              <div class="level-item level-3">
                <span class="lvl-title">កម្រិត ៣៖ កម្រិតបង្គួរ (៧៥-៩៩%)</span>
                <p>ត្រូវ ៦-៧ ប្រអប់; យល់ពី Text និង Number; ខុសឧបករណ៍បញ្ជាបន្តិចបន្តួច។</p>
              </div>
              <div class="level-item level-2">
                <span class="lvl-title">កម្រិត ២៖ កំពុងអភិវឌ្ឍ (៥០-៧៤%)</span>
                <p>ច្រឡំលេខទូរស័ព្ទជា Number; ច្រឡំ Boolean ជាមួយពាក្យអត្ថបទ "Yes"។</p>
              </div>
              <div class="level-item level-1">
                <span class="lvl-title">កម្រិត ១៖ អ្នកចាប់ផ្តើម (&lt;៥០%)</span>
                <p>មិនអាចបែងចែក Text ពី Number បាន; ចាត់ទុកគ្រប់តម្លៃទាំងអស់ជាអត្ថបទធម្មតា។</p>
              </div>
            </div>
          </div>
        </div>
      `
    },

    'slide-23': {
      title: 'ផែនទីតភ្ជាប់កម្មវិធីសិក្សា ៣ ថ្ងៃ',
      segment: 'ផ្នែកទី ៦៖ ការវាយតម្លៃ & ស្ពានចម្លង (៧៥:០០ - ៩០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"សូមពិនិត្យមើលផែនទីតភ្ជាប់ ៣ ថ្ងៃរបស់យើង។
កាលពីម្សិលមិញនៅថ្ងៃទី ២៖ យើងបានរៀនថាសេចក្តីណែនាំត្រូវអនុវត្តតាមលំដាប់លំដោយ។
ថ្ងៃនេះនៅថ្ងៃទី ៣៖ យើងបានរៀនថាសេចក្តីណែនាំធ្វើការលើប្រអប់ទិន្នន័យដែលមានប្រភេទច្បាស់លាស់។
ថ្ងៃស្អែកនៅថ្ងៃទី ៤៖ កម្មវិធីត្រូវរៀនធ្វើការ សម្រេចចិត្ត (DECISIONS)!
តើកម្មវិធីធ្វើការសម្រេចចិត្តដោយរបៀបណា?
គឺតាមរយៈការប្រៀបធៀប ទិន្នន័យ!
If (RepairCost > 500, RequireManagerApproval(), AutoApprove())!
បើគ្មានប្រភេទនៃទិន្នន័យថ្ងៃនេះទេ លក្ខខណ្ឌ និងការសម្រេចចិត្តនៅថ្ងៃស្អែកនឹងមិនអាចកើតឡើងបានឡើយ!
អ្វីៗគ្រប់យ៉ាងក្នុងវគ្គបណ្តុះបណ្តាលនេះសុទ្ធតែតភ្ជាប់គ្នាទាំងអស់។"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge purple-badge">ស្ពានកម្មវិធីសិក្សា</span>
          <h2 class="slide-title">ផែនទីតភ្ជាប់កម្មវិធីសិក្សា ៣ ថ្ងៃជាប់គ្នា</h2>
          <p class="slide-lead">របៀបដែលលំដាប់លំដោយពីម្សិលមិញ ទិន្នន័យថ្ងៃនេះ និងការសម្រេចចិត្តថ្ងៃស្អែក បង្កើតបានជាខ្សែសង្វាក់ឥតដាច់។</p>
        </div>

        <div class="bridge-three-col">
          <div class="bridge-col before-col">
            <span class="bridge-time-tag">ម្សិលមិញ (ថ្ងៃទី ២)</span>
            <h3>សេចក្តីណែនាំ &amp; លំដាប់</h3>
            <div class="bridge-summary">
              កម្មវិធីអនុវត្តសកម្មភាពតាមលំដាប់ពេលវេលាយ៉ាងម៉ត់ចត់។ សញ្ញាក្បៀសចំនុច (<code>;</code>) ភ្ជាប់ជំហានម្តងមួយៗ។
            </div>
            <div class="bridge-flow-arrow">&#10142; ដំណើរការលើ...</div>
          </div>

          <div class="bridge-col today-col">
            <span class="bridge-time-tag">ថ្ងៃនេះ (ថ្ងៃទី ៣)</span>
            <h3>ទិន្នន័យ &amp; ប្រអប់ផ្ទុក</h3>
            <div class="bridge-summary">
              សេចក្តីណែនាំត្រូវការតម្លៃ៖ អត្ថបទ លេខ កាលបរិច្ឆេទ និង បាទ/ទេ (Boolean)។ រូបរាងប្រអប់កំណត់សកម្មភាពស្របច្បាប់។
            </div>
            <div class="bridge-flow-arrow">&#10142; ត្រួតពិនិត្យដោយ...</div>
          </div>

          <div class="bridge-col next-col">
            <span class="bridge-time-tag">ថ្ងៃស្អែក (ថ្ងៃទី ៤)</span>
            <h3>លក្ខខណ្ឌ &amp; ការសម្រេចចិត្ត</h3>
            <div class="bridge-summary">
              កម្មវិធីពិនិត្យទិន្នន័យដើម្បីធ្វើការសម្រេចចិត្ត៖ <code>If(Downtime &gt; 2, NotifySupervisor())</code>។ សំណួរផ្តល់លទ្ធផល ពិត/មិនពិត។
            </div>
          </div>
        </div>
      `
    },

    'slide-24': {
      title: 'កិច្ចការផ្ទះ & សទ្ទានុក្រមបច្ចេកទេស',
      segment: 'ផ្នែកទី ៦៖ ការវាយតម្លៃ & ស្ពានចម្លង (៧៥:០០ - ៩០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"សូមអបអរសាទរចំពោះការបញ្ចប់ថ្ងៃទី ៣ យ៉ាងជោគជ័យ!
នេះជាកិច្ចការផ្ទះរំលឹកឡើងវិញ ១៥ នាទី៖ 'អ្នកស៊ើបអង្កេតទិន្នន័យនៅកន្លែងធ្វើការ'។
ស្វែងរកទម្រង់ក្រដាស ឬតារាង Excel ណាមួយនៅកន្លែងធ្វើការរបស់អ្នក។ ជ្រើសរើសជួរឈរចំនួន ៥។ កត់ត្រាប្រភេទនៃទិន្នន័យរបស់វា ហើយពិនិត្យមើលថាតើមានប្រអប់ដែលមានភាពស្មុគស្មាញដូចជាលេខទូរស័ព្ទ ឬកូដសម្គាល់ដែរឬទេ។
សូមពិនិត្យមើលសទ្ទានុក្រមបច្ចេកទេសទ្វេភាសា អង់គ្លេស-ខ្មែរ ខាងក្រោមផងដែរ។
សូមអរគុណចំពោះថាមពលដ៏អស្ចារ្យរបស់អ្នកនៅថ្ងៃនេះ។ ជួបគ្នានៅថ្ងៃស្អែកថ្ងៃទី ៤ យើងនឹងបង្រៀនកម្មវិធីរបស់យើងឱ្យចេះធ្វើការសម្រេចចិត្ត!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge blue-badge">ការបញ្ចប់វគ្គសិក្សា</span>
          <h2 class="slide-title">កិច្ចការផ្ទះ ១៥ នាទី &amp; សទ្ទានុក្រមទ្វេភាសា</h2>
          <p class="slide-lead">ពង្រឹងគោលគំនិតថ្ងៃនេះនៅក្នុងបរិយាកាសការងារប្រចាំថ្ងៃរបស់អ្នក និងក្តាប់យកវាក្យសព្ទបច្ចេកទេស។</p>
        </div>

        <div class="grid-2-col">
          <div class="homework-card">
            <div class="hw-icon">&#128269;</div>
            <div class="hw-content">
              <h4>កិច្ចការផ្ទះ៖ "អ្នកស៊ើបអង្កេតទិន្នន័យនៅកន្លែងធ្វើការ" (&le; ១៥ នាទី)</h4>
              <p>១. បើកតារាង Excel ទម្រង់ក្រដាស ឬអេក្រង់ប្រព័ន្ធ ERP ណាមួយនៅកន្លែងធ្វើការរបស់អ្នក។</p>
              <p>២. ជ្រើសរើស <strong>៥ ជួរឈរ ឬប្រអប់ទិន្នន័យ</strong> ហើយចាត់ថ្នាក់វាជា អត្ថបទ, លេខ, កាលបរិច្ឆេទ, ឬ បាទ/ទេ (Boolean)។</p>
              <p>៣. កំណត់ថាតើប្រអប់ណាដែលមានរូបរាងជាលេខ ប៉ុន្តែការពិតជា <strong>Text</strong> (ដូចជា លេខកាត, កូដប្រៃសណីយ៍, លេខទូរស័ព្ទ)។</p>
              <div class="hw-outcome">លទ្ធផលដែលរំពឹងទុក៖ ប្រអប់ទិន្នន័យ ៥ ដែលបានចាត់ថ្នាក់រួចរាល់សម្រាប់ចែករំលែកនៅព្រឹកស្អែក!</div>
            </div>
          </div>

          <div class="glossary-card">
            <h4>សទ្ទានុក្រមបច្ចេកទេសទ្វេភាសា (ថ្ងៃទី ៣)</h4>
            <div class="glossary-list">
              <div class="gloss-item">
                <span class="en-term">Data / Value</span>
                <span class="kh-term">ទិន្នន័យ / តម្លៃ</span>
              </div>
              <div class="gloss-item">
                <span class="en-term">Data Type</span>
                <span class="kh-term">ប្រភេទនៃទិន្នន័យ</span>
              </div>
              <div class="gloss-item">
                <span class="en-term">Text / String</span>
                <span class="kh-term">អត្ថបទ / ខ្សែអក្សរ</span>
              </div>
              <div class="gloss-item">
                <span class="en-term">Number / Numeric</span>
                <span class="kh-term">លេខ / តម្លៃលេខ</span>
              </div>
              <div class="gloss-item">
                <span class="en-term">Date and Time</span>
                <span class="kh-term">កាលបរិច្ឆេទ និង ពេលវេលា</span>
              </div>
              <div class="gloss-item">
                <span class="en-term">Boolean / Yes/No</span>
                <span class="kh-term">តក្កវិទ្យា (ពិត / មិនពិត)</span>
              </div>
            </div>
          </div>
        </div>
      `
    }
  };

  // --------------------------------------------------------------------------
  // 3. INITIALIZATION & CORE PRESENTATION ENGINE
  // --------------------------------------------------------------------------
  function initPresentation() {
    slides = Array.from(document.querySelectorAll('.slide'));
    totalSlides = slides.length;

    // Cache English originals for clean bilingual swapping
    slides.forEach(slide => {
      const slideId = slide.id;
      slideOriginals[slideId] = {
        title: slide.getAttribute('data-title'),
        segment: slide.getAttribute('data-segment'),
        notes: slide.getAttribute('data-notes'),
        content: slide.querySelector('.slide-content') ? slide.querySelector('.slide-content').innerHTML : ''
      };
    });

    // Update total slide indicators
    const totalEl = document.getElementById('total-slides-num');
    if (totalEl) totalEl.textContent = totalSlides;

    setupEventListeners();
    setupTimer();
    renderQuizQuestion();
    bindInteractiveDataLab();
    bindClassifierBoard();
    bindRevealInteractions();
    buildOverviewGrid();

    // Show initial slide
    goToSlide(0);
  }

  // --------------------------------------------------------------------------
  // 4. NAVIGATION LOGIC
  // --------------------------------------------------------------------------
  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    currentSlideIndex = index;
    updateUI();
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

  function updateUI() {
    const curSlide = slides[currentSlideIndex];
    if (!curSlide) return;

    // Slide indicator
    const curNumEl = document.getElementById('slide-current-num') || document.getElementById('current-slide-num');
    const totNumEl = document.getElementById('slide-total-count') || document.getElementById('total-slides-num');
    const counterEl = document.getElementById('slide-counter');
    if (curNumEl) curNumEl.textContent = String(currentSlideIndex + 1);
    if (totNumEl) totNumEl.textContent = String(totalSlides);
    if (counterEl) {
      counterEl.innerHTML = isKhmerActive 
        ? `ស្លាយទី <span id="slide-current-num">${currentSlideIndex + 1}</span> / <span id="slide-total-count">${totalSlides}</span>`
        : `Slide <span id="slide-current-num">${currentSlideIndex + 1}</span> / <span id="slide-total-count">${totalSlides}</span>`;
    }

    // Header Title & Segment
    const titleEl = document.getElementById('current-slide-title');
    const segEl = document.getElementById('current-segment-name');
    if (titleEl) titleEl.textContent = curSlide.getAttribute('data-title') || '';
    if (segEl) segEl.textContent = curSlide.getAttribute('data-segment') || '';

    // Progress Bar
    const progressEl = document.getElementById('progress-bar') || document.getElementById('progress-fill') || document.getElementById('progress-bar-fill');
    if (progressEl) {
      const pct = ((currentSlideIndex + 1) / totalSlides) * 100;
      progressEl.style.width = pct + '%';
    }

    // Prev / Next button states
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    if (btnPrev) {
      btnPrev.disabled = (currentSlideIndex === 0);
      btnPrev.onclick = prevSlide;
    }
    if (btnNext) {
      btnNext.disabled = (currentSlideIndex === totalSlides - 1);
      btnNext.onclick = nextSlide;
    }

    // Update Notes panel content
    const notesContent = document.getElementById('notes-content');
    if (notesContent) {
      const rawNotes = curSlide.getAttribute('data-notes') || 'No trainer speaking notes for this slide.';
      notesContent.innerHTML = `<pre style="white-space: pre-wrap; font-family: inherit; margin: 0; line-height: 1.6;">${escapeHtml(rawNotes)}</pre>`;
    }

    // Update Overview modal active state
    const gridCards = document.querySelectorAll('.overview-card');
    gridCards.forEach((c, idx) => {
      c.classList.toggle('active', idx === currentSlideIndex);
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // --------------------------------------------------------------------------
  // 5. NATIVE OFFLINE INSTANT BILINGUAL SWITCHER
  // --------------------------------------------------------------------------
  function toggleLanguage() {
    try { localStorage.setItem('powerapps_presentation_lang', !isKhmerActive ? 'km' : 'en'); } catch(e){}
    isKhmerActive = !isKhmerActive;
    applyBilingualState();
  }

  function applyBilingualState() {
    const langBtnText = document.getElementById('lang-btn-text');
    const body = document.body;

    if (isKhmerActive) {
      body.classList.add('khmer-mode');
      body.classList.add('khmer-font-active');
      if (langBtnText) langBtnText.textContent = '🇺🇸 English (EN)';

      // Swap all slides to Khmer
      slides.forEach(slide => {
        const slideId = slide.id;
        const khData = KHMER_SLIDES[slideId];
        if (khData) {
          slide.setAttribute('data-title', khData.title);
          slide.setAttribute('data-segment', khData.segment);
          slide.setAttribute('data-notes', khData.notes);
          const contentContainer = slide.querySelector('.slide-content');
          if (contentContainer) {
            contentContainer.innerHTML = khData.content;
          }
        }
      });
    } else {
      body.classList.remove('khmer-mode');
      body.classList.remove('khmer-font-active');
      if (langBtnText) langBtnText.textContent = '🇰🇭 ខ្មែរ (Khmer)';

      // Swap all slides back to English
      slides.forEach(slide => {
        const slideId = slide.id;
        const enData = slideOriginals[slideId];
        if (enData) {
          slide.setAttribute('data-title', enData.title);
          slide.setAttribute('data-segment', enData.segment);
          slide.setAttribute('data-notes', enData.notes);
          const contentContainer = slide.querySelector('.slide-content');
          if (contentContainer) {
            contentContainer.innerHTML = enData.content;
          }
        }
      });
    }

    // Rebind interactive widgets after DOM replacement
    bindInteractiveDataLab();
    bindClassifierBoard();
    bindRevealInteractions();
    renderQuizQuestion();
    updateUI();
  }

  // --------------------------------------------------------------------------
  // 6. 90-MINUTE AGENDA LIVE TIMER
  // --------------------------------------------------------------------------
  function setupTimer() {
    const toggleBtn = document.getElementById('timer-toggle-btn');
    const resetBtn = document.getElementById('timer-reset-btn');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isTimerRunning) {
          pauseTimer();
        } else {
          startTimer();
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        resetTimer();
      });
    }
  }

  function startTimer() {
    if (isTimerRunning) return;
    isTimerRunning = true;
    updateTimerIcon();

    timerInterval = setInterval(() => {
      timerSecondsElapsed++;
      updateTimerDisplay();

      if (timerSecondsElapsed >= TOTAL_SESSION_SECONDS) {
        pauseTimer();
      }
    }, 1000);
  }

  function pauseTimer() {
    isTimerRunning = false;
    clearInterval(timerInterval);
    updateTimerIcon();
  }

  function resetTimer() {
    pauseTimer();
    timerSecondsElapsed = 0;
    updateTimerDisplay();
  }

  function updateTimerDisplay() {
    const timerDisplay = document.getElementById('session-timer');
    if (!timerDisplay) return;

    const mins = Math.floor(timerSecondsElapsed / 60);
    const secs = timerSecondsElapsed % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    timerDisplay.textContent = formatted;
  }

  function updateTimerIcon() {
    const iconBtn = document.getElementById('timer-icon');
    if (!iconBtn) return;

    if (isTimerRunning) {
      // Pause icon
      iconBtn.innerHTML = '<path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>';
    } else {
      // Play icon
      iconBtn.innerHTML = '<path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>';
    }
  }

  // --------------------------------------------------------------------------
  // 7. PRESENTER NOTES & OVERVIEW MODAL
  // --------------------------------------------------------------------------
  function toggleNotes(show) {
    const panel = document.getElementById('presenter-notes-panel');
    const floatBtn = document.getElementById('notes-floating-tab');
    if (!panel) return;

    if (typeof show === 'boolean') {
      isNotesOpen = show;
    } else {
      isNotesOpen = !isNotesOpen;
    }

    panel.classList.toggle('open', isNotesOpen);
    if (floatBtn) {
      floatBtn.style.display = isNotesOpen ? 'none' : 'flex';
    }
  }

  function toggleOverview(show) {
    const modal = document.getElementById('overview-modal');
    if (!modal) return;

    const isOpen = modal.classList.contains('open') && !modal.classList.contains('hidden');
    const willOpen = (typeof show === 'boolean') ? show : !isOpen;

    modal.classList.toggle('open', willOpen);
    modal.classList.toggle('hidden', !willOpen);
    modal.setAttribute('aria-hidden', (!willOpen).toString());
  }

  function buildOverviewGrid() {
    const grid = document.getElementById('overview-grid');
    if (!grid) return;
    grid.innerHTML = '';

    slides.forEach((slide, idx) => {
      const card = document.createElement('button');
      card.className = `overview-card ${idx === currentSlideIndex ? 'active' : ''}`;
      card.innerHTML = `
        <span class="card-num">Slide ${idx + 1}</span>
        <h5 class="card-title">${slide.getAttribute('data-title') || 'Slide ' + (idx + 1)}</h5>
        <span class="card-seg">${slide.getAttribute('data-segment') || ''}</span>
      `;
      card.addEventListener('click', () => {
        goToSlide(idx);
        toggleOverview(false);
      });
      grid.appendChild(card);
    });
  }

  // --------------------------------------------------------------------------
  // 8. INTERACTIVE WIDGET: DATA INSPECTOR LAB (SLIDE 12)
  // --------------------------------------------------------------------------
  function bindInteractiveDataLab() {
    const btnGroup = document.getElementById('lab-btn-group');
    if (!btnGroup) return;

    const sampleButtons = btnGroup.querySelectorAll('.sample-btn');
    const dispType = document.getElementById('disp-type');
    const dispSyntax = document.getElementById('disp-syntax');
    const dispAllowed = document.getElementById('disp-allowed');
    const dispProhibited = document.getElementById('disp-prohibited');

    const LAB_DATA = {
      'sample-text': {
        typeEn: 'Text (String)',
        typeKh: 'អត្ថបទ (Text / String)',
        syntaxEn: '"Injection Press #2" (Enclosed in double quotes)',
        syntaxKh: '"Injection Press #2" (នៅក្នុងសញ្ញាសម្រង់ពីរ)',
        allowedEn: '✔ Concatenation (&), Search, Upper, Lower, Len',
        allowedKh: '✔ ការតភ្ជាប់ (&), ស្វែងរក, Upper, Lower, Len',
        prohibitedEn: '✖ Addition (+), Subtraction, Multiplication, Sum',
        prohibitedKh: '✖ ការបូក (+), ការដក, ការគុណ, ការបូកសរុប (Sum)'
      },
      'sample-num': {
        typeEn: 'Number (Decimal / Float)',
        typeKh: 'លេខ (Number / Decimal)',
        syntaxEn: '485.50 (Bare numeric digits without quotes)',
        syntaxKh: '485.50 (តួលេខសុទ្ធ ដោយគ្មានសញ្ញាសម្រង់)',
        allowedEn: '✔ Addition (+), Subtraction (-), Multiply (*), Divide (/), Average',
        allowedKh: '✔ ការបូក (+), ការដក (-), ការគុណ (*), ការចែក (/), មធ្យមភាគ',
        prohibitedEn: '✖ Concatenation (&) without Text() conversion',
        prohibitedKh: '✖ ការតភ្ជាប់ (&) ដោយគ្មានការបម្លែង Text()'
      },
      'sample-phone': {
        typeEn: 'Text (Formatted Alphanumeric)',
        typeKh: 'អត្ថបទ (Text ដែលមានទម្រង់)',
        syntaxEn: '"+855-23-999-111" (Golden Rule: Never used in math!)',
        syntaxKh: '"+855-23-999-111" (វិធានមាស៖ មិនដែលយកទៅធ្វើលេខឡើយ!)',
        allowedEn: '✔ Exact match, StartsWith, Display in dialer, Text search',
        allowedKh: '✔ ការផ្គូផ្គង, StartsWith, បង្ហាញលើប៊ូតុងហៅទូរស័ព្ទ, ស្វែងរក',
        prohibitedEn: '✖ Cannot calculate sum, cannot multiply, drops leading zeros if forced to numeric',
        prohibitedKh: '✖ មិនអាចបូកសរុប មិនអាចគុណ ហើយបាត់លេខសូន្យខាងមុខបើបង្ខំជាលេខ'
      },
      'sample-date': {
        typeEn: 'Date/Time (Temporal Timestamp)',
        typeKh: 'កាលបរិច្ឆេទ (Date/Time)',
        syntaxEn: 'Today() or Date(2026, 10, 29)',
        syntaxKh: 'Today() ឬ Date(2026, 10, 29)',
        allowedEn: '✔ DateAdd(), DateDiff(), Weekday(), IsToday()',
        allowedKh: '✔ DateAdd(), DateDiff(), Weekday(), IsToday()',
        prohibitedEn: '✖ Direct multiplication, plain string concatenation',
        prohibitedKh: '✖ ការគុណផ្ទាល់, ការតអក្សរធម្មតា'
      },
      'sample-bool': {
        typeEn: 'Yes/No (Boolean Binary State)',
        typeKh: 'បាទ/ទេ (Boolean តក្កវិជ្ជាពីរយ៉ាង)',
        syntaxEn: 'true or false (Pure logical states)',
        syntaxKh: 'true ឬ false (ស្ថានភាពតក្កវិជ្ជាសុទ្ធសាធ)',
        allowedEn: '✔ If(), And (&&), Or (||), Not (!)',
        allowedKh: '✔ If(), And (&&), Or (||), Not (!)',
        prohibitedEn: '✖ Mathematical operations, free-form typing',
        prohibitedKh: '✖ ប្រមាណវិធីគណិតវិទ្យា, ការវាយអក្សរដោយសេរី'
      }
    };

    sampleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        sampleButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const key = btn.getAttribute('data-val');
        const info = LAB_DATA[key];
        if (!info) return;

        if (dispType) dispType.textContent = isKhmerActive ? info.typeKh : info.typeEn;
        if (dispSyntax) dispSyntax.textContent = isKhmerActive ? info.syntaxKh : info.syntaxEn;
        if (dispAllowed) dispAllowed.textContent = isKhmerActive ? info.allowedKh : info.allowedEn;
        if (dispProhibited) dispProhibited.textContent = isKhmerActive ? info.prohibitedKh : info.prohibitedEn;
      });
    });
  }

  // --------------------------------------------------------------------------
  // 9. INTERACTIVE WIDGET: 6-FIELD CLASSIFIER (SLIDE 18)
  // --------------------------------------------------------------------------
  function bindClassifierBoard() {
    const chipContainer = document.getElementById('field-chips');
    const targetBins = document.querySelectorAll('.target-bin');
    const scoreDisplay = document.getElementById('classifier-score');
    const feedbackDisplay = document.getElementById('classifier-feedback');

    if (!chipContainer || targetBins.length === 0) return;

    let selectedChip = chipContainer.querySelector('.field-chip.active') || chipContainer.querySelector('.field-chip');
    let classifiedCount = 0;
    const classifiedMap = {};

    // Select chip
    const chips = chipContainer.querySelectorAll('.field-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        selectedChip = chip;

        const fieldName = chip.textContent;
        if (feedbackDisplay) {
          feedbackDisplay.textContent = isKhmerActive
            ? `បានជ្រើសរើស៖ ${fieldName}។ សូមចុចលើប្រអប់ផ្ទុកគោលដៅ។`
            : `Selected: ${fieldName}. Click target bin above.`;
        }
      });
    });

    // Drop into target bin
    targetBins.forEach(bin => {
      bin.addEventListener('click', () => {
        if (!selectedChip || selectedChip.classList.contains('placed')) return;

        const targetType = bin.getAttribute('data-target');
        const correctType = selectedChip.getAttribute('data-correct');
        const fieldId = selectedChip.getAttribute('data-field');
        const chipText = selectedChip.textContent;

        if (targetType === correctType) {
          // Correct match!
          selectedChip.classList.add('placed');
          selectedChip.classList.remove('active');
          bin.classList.add('bin-success');

          const contentDiv = bin.querySelector('.bin-contents');
          if (contentDiv) {
            if (contentDiv.textContent.trim() === 'Empty' || contentDiv.textContent.trim() === 'ទទេ') {
              contentDiv.innerHTML = `<div class="placed-item">✔ ${chipText}</div>`;
            } else {
              contentDiv.innerHTML += `<div class="placed-item">✔ ${chipText}</div>`;
            }
          }

          if (!classifiedMap[fieldId]) {
            classifiedMap[fieldId] = true;
            classifiedCount++;
          }

          if (scoreDisplay) scoreDisplay.textContent = classifiedCount;
          if (feedbackDisplay) {
            feedbackDisplay.textContent = isKhmerActive
              ? `✔ ត្រឹមត្រូវណាស់! ${chipText} ត្រូវបានដាក់ក្នុងប្រអប់ ${targetType.toUpperCase()}!`
              : `✔ Correct! ${chipText} belongs in the ${targetType.toUpperCase()} container!`;
            feedbackDisplay.style.color = '#4ade80';
          }

          // Auto-select next unplaced chip
          const remaining = chipContainer.querySelectorAll('.field-chip:not(.placed)');
          if (remaining.length > 0) {
            remaining[0].classList.add('active');
            selectedChip = remaining[0];
          } else {
            selectedChip = null;
            if (feedbackDisplay) {
              feedbackDisplay.textContent = isKhmerActive
                ? '🎉 អបអរសាទរ! អ្នកបានចាត់ថ្នាក់ប្រអប់ទិន្នន័យទាំង ៦ ត្រឹមត្រូវ ១០០%!'
                : '🎉 Congratulations! You classified all 6 manufacturing fields with 100% precision!';
            }
          }
        } else {
          // Incorrect match
          bin.classList.add('bin-error');
          setTimeout(() => bin.classList.remove('bin-error'), 800);

          if (feedbackDisplay) {
            feedbackDisplay.textContent = isKhmerActive
              ? `✖ មិនត្រឹមត្រូវទេ! ${chipText} មិនអាចដាក់ក្នុងប្រអប់ ${targetType.toUpperCase()} បានឡើយ។ សូមគិតអំពីវិធានមាស!`
              : `✖ Incompatible container! ${chipText} cannot go into ${targetType.toUpperCase()}. Remember the Golden Rule!`;
            feedbackDisplay.style.color = '#fb7185';
          }
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 10. INTERACTIVE WIDGET: 5-QUESTION QUIZ (SLIDE 20)
  // --------------------------------------------------------------------------
  function renderQuizQuestion() {
    const quizBody = document.getElementById('quiz-body');
    const counterEl = document.getElementById('quiz-question-counter');
    const scoreEl = document.getElementById('quiz-score-display');
    const prevBtn = document.getElementById('quiz-prev-btn');
    const nextBtn = document.getElementById('quiz-next-btn');

    if (!quizBody) return;

    const q = QUIZ_QUESTIONS[currentQuizIndex];
    if (!q) return;

    if (counterEl) {
      counterEl.textContent = isKhmerActive
        ? `សំណួរទី ${currentQuizIndex + 1} នៃ ${QUIZ_QUESTIONS.length}`
        : `Question ${currentQuizIndex + 1} of ${QUIZ_QUESTIONS.length}`;
    }

    if (scoreEl) {
      scoreEl.textContent = isKhmerActive
        ? `ពិន្ទុ៖ ${quizScore} / ${QUIZ_QUESTIONS.length}`
        : `Score: ${quizScore} / ${QUIZ_QUESTIONS.length}`;
    }

    if (prevBtn) prevBtn.disabled = (currentQuizIndex === 0);
    if (nextBtn) {
      nextBtn.textContent = (currentQuizIndex === QUIZ_QUESTIONS.length - 1)
        ? (isKhmerActive ? 'បញ្ចប់ការធ្វើតេស្ត ✔' : 'Finish Quiz ✔')
        : (isKhmerActive ? 'សំណួរបន្ទាប់ &#8594;' : 'Next Question &#8594;');
    }

    const titleText = isKhmerActive ? q.qKh : q.qEn;
    const options = isKhmerActive ? q.optionsKh : q.optionsEn;
    const selectedAnswer = userAnswers[currentQuizIndex];

    let optionsHtml = '';
    options.forEach((opt, idx) => {
      let optClass = 'quiz-option-btn';
      if (selectedAnswer !== undefined) {
        if (idx === q.correctIndex) {
          optClass += ' option-correct';
        } else if (idx === selectedAnswer) {
          optClass += ' option-incorrect';
        }
      }
      optionsHtml += `
        <button class="${optClass}" data-opt-idx="${idx}" ${selectedAnswer !== undefined ? 'disabled' : ''}>
          ${escapeHtml(opt)}
        </button>
      `;
    });

    let explanationHtml = '';
    if (selectedAnswer !== undefined) {
      const expText = isKhmerActive ? q.explanationKh : q.explanationEn;
      const isCorrect = (selectedAnswer === q.correctIndex);
      explanationHtml = `
        <div class="quiz-explanation ${isCorrect ? 'exp-correct' : 'exp-incorrect'}">
          <strong>${isCorrect ? (isKhmerActive ? '✔ ត្រឹមត្រូវ!' : '✔ Correct!') : (isKhmerActive ? '✖ មិនត្រឹមត្រូវ!' : '✖ Incorrect!')}</strong>
          <p>${escapeHtml(expText)}</p>
        </div>
      `;
    }

    quizBody.innerHTML = `
      <div class="quiz-question-text">${escapeHtml(titleText)}</div>
      <div class="quiz-options-group">${optionsHtml}</div>
      ${explanationHtml}
    `;

    // Bind option click
    const optButtons = quizBody.querySelectorAll('.quiz-option-btn');
    optButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const chosenIdx = parseInt(btn.getAttribute('data-opt-idx'), 10);
        userAnswers[currentQuizIndex] = chosenIdx;

        if (chosenIdx === q.correctIndex) {
          quizScore++;
        }
        renderQuizQuestion();
      });
    });

    // Bind navigation buttons
    if (prevBtn) {
      prevBtn.onclick = () => {
        if (currentQuizIndex > 0) {
          currentQuizIndex--;
          renderQuizQuestion();
        }
      };
    }

    if (nextBtn) {
      nextBtn.onclick = () => {
        if (currentQuizIndex < QUIZ_QUESTIONS.length - 1) {
          currentQuizIndex++;
          renderQuizQuestion();
        } else {
          // Finished quiz summary
          alert(isKhmerActive
            ? `អ្នកបានបញ្ចប់ការធ្វើតេស្ត! ពិន្ទុសរុបរបស់អ្នកគឺ៖ ${quizScore} លើ ${QUIZ_QUESTIONS.length}`
            : `Quiz Complete! Your final score is ${quizScore} out of ${QUIZ_QUESTIONS.length}`);
        }
      };
    }
  }

  // --------------------------------------------------------------------------
  // 11. INTERACTIVE WIDGET: SOLUTION REVEAL (SLIDE 22)
  // --------------------------------------------------------------------------
  function bindRevealInteractions() {
    const revealBtn = document.getElementById('btn-reveal-solution');
    const solutionContent = document.getElementById('solution-content');

    if (!revealBtn || !solutionContent) return;

    revealBtn.onclick = () => {
      const isCollapsed = solutionContent.classList.contains('collapsed');
      if (isCollapsed) {
        solutionContent.classList.remove('collapsed');
        revealBtn.textContent = isKhmerActive ? 'លាក់ដំណោះស្រាយ' : 'Hide Solution';
      } else {
        solutionContent.classList.add('collapsed');
        revealBtn.textContent = isKhmerActive ? 'បង្ហាញដំណោះស្រាយ' : 'Reveal Solution';
      }
    };
  }

  // --------------------------------------------------------------------------
  // 12. KEYBOARD SHORTCUTS & EVENT LISTENERS
  // --------------------------------------------------------------------------
  function setupEventListeners() {
    // Prev / Next button clicks
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const btnRestart = document.getElementById('btn-restart');

    if (btnPrev) btnPrev.addEventListener('click', prevSlide);
    if (btnNext) btnNext.addEventListener('click', nextSlide);
    if (btnRestart) btnRestart.addEventListener('click', () => goToSlide(0));

    // Header buttons
    const btnLang = document.getElementById('btn-lang');
    const btnOverview = document.getElementById('btn-overview');
    const btnNotes = document.getElementById('btn-notes');
    const btnFullscreen = document.getElementById('btn-fullscreen');
    const btnCloseNotes = document.getElementById('btn-close-notes');
    const btnCloseOverview = document.getElementById('btn-close-overview');
    const overviewBackdrop = document.getElementById('overview-backdrop');
    const floatNotesTab = document.getElementById('notes-floating-tab');

    if (btnLang) btnLang.addEventListener('click', toggleLanguage);
    if (btnOverview) btnOverview.addEventListener('click', () => toggleOverview());
    if (btnNotes) btnNotes.addEventListener('click', () => toggleNotes());
    if (btnFullscreen) btnFullscreen.addEventListener('click', toggleFullscreen);
    if (btnCloseNotes) btnCloseNotes.addEventListener('click', () => toggleNotes(false));
    if (btnCloseOverview) btnCloseOverview.addEventListener('click', () => toggleOverview(false));
    if (overviewBackdrop) overviewBackdrop.addEventListener('click', () => toggleOverview(false));
    if (floatNotesTab) floatNotesTab.addEventListener('click', () => toggleNotes(true));

    // Global Keyboard navigation
    document.addEventListener('keydown', (e) => {
      // Ignore keystrokes if typing inside inputs
      const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
      if (tag === 'input' || tag === 'textarea') return;

      switch (e.key) {
        case 'ArrowRight':
        case ' ': // Space bar advances
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
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
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'r':
        case 'R':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'Escape':
          toggleOverview(false);
          toggleNotes(false);
          break;
      }
    });

    // Touch swipe navigation for presentation stage
    let touchStartX = 0;
    let touchEndX = 0;
    const stage = document.getElementById('stage');
    if (stage) {
      stage.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      stage.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });
    }

    function handleSwipe() {
      const threshold = 50;
      if (touchEndX < touchStartX - threshold) {
        nextSlide();
      } else if (touchEndX > touchStartX + threshold) {
        prevSlide();
      }
    }
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
  // 13. DOM READY BOOTSTRAP
  // --------------------------------------------------------------------------
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

  // Universal Window Exports for inline HUD onclick handlers
  window.prevSlide = prevSlide;
  window.nextSlide = nextSlide;
  window.goToSlide = goToSlide;
  window.showSlide = goToSlide;
  window.toggleLanguage = toggleLanguage;
  window.toggleNotes = toggleNotes;
  window.toggleOverview = toggleOverview;
  window.toggleTimer = toggleTimer;
  window.toggleFullscreen = toggleFullscreen;
  window.toggleLaser = typeof toggleLaserPointer === 'function' ? toggleLaserPointer : function() {};

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
