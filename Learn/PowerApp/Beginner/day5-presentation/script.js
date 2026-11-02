/**
 * ============================================================================
 * POWER APPS FOUNDATION: DAY 5 PRESENTATION ENGINE
 * Topic: Decisions: IF / THEN / ELSE
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

  // Bilingual State (In-DOM instant swapping inside .slide-content)
  let isKhmerActive = false;
  const slideOriginals = {};

  // Interactive Quiz State
  let currentQuizIndex = 0;
  let quizScore = 0;
  let userQuizAnswers = {};

  const QUIZ_QUESTIONS = [
    {
      qEn: "1. What are the three essential arguments of the Power Fx If() function?",
      qKh: "១. តើអ្វីជាអាគុយម៉ង់សំខាន់ទាំង ៣ របស់អនុគមន៍ Power Fx If()?",
      optionsEn: [
        "A) Screen, Gallery, Button",
        "B) Condition, Action/Value If True, Action/Value If False",
        "C) Database, Table, Column",
        "D) Input, Math, Output"
      ],
      optionsKh: [
        "A) Screen, Gallery, Button",
        "B) លក្ខខណ្ឌ (Condition), សកម្មភាពបើពិត (If True), សកម្មភាពបើមិនពិត (If False)",
        "C) Database, Table, Column",
        "D) Input, Math, Output"
      ],
      correctIndex: 1,
      explanationEn: "Correct! If(Condition, ResultIfTrue, ResultIfFalse) requires exactly these three parts to make a complete business fork.",
      explanationKh: "ត្រឹមត្រូវណាស់! If(Condition, ResultIfTrue, ResultIfFalse) ត្រូវការផ្នែកសំខាន់ទាំង ៣ នេះដើម្បីបង្កើតផ្លូវបំបែកអាជីវកម្មដ៏ពេញលេញមួយ។"
    },
    {
      qEn: "2. In the expression If(Condition, ActionA, ActionB), what do the two commas mean in plain English?",
      qKh: "២. នៅក្នុងកន្សោម If(Condition, ActionA, ActionB) តើសញ្ញាក្បៀសទាំងពីរមានន័យយ៉ាងណាក្នុងភាសាសាមញ្ញ?",
      optionsEn: [
        "A) First comma means 'AND'; second comma means 'OR'",
        "B) First comma means 'PLUS'; second comma means 'MINUS'",
        "C) First comma means 'THEN'; second comma means 'ELSE'",
        "D) They are just decorative punctuation marks"
      ],
      optionsKh: [
        "A) ក្បៀសទីមួយមានន័យថា 'AND'; ក្បៀសទីពីរមានន័យថា 'OR'",
        "B) ក្បៀសទីមួយមានន័យថា 'បូក'; ក្បៀសទីពីរមានន័យថា 'ដក'",
        "C) ក្បៀសទីមួយមានន័យថា 'បន្ទាប់មក (THEN)'; ក្បៀសទីពីរមានន័យថា 'បើមិនដូច្នោះទេ (ELSE)'",
        "D) គ្រាន់តែជាសញ្ញាវណ្ណយុត្តិលម្អធម្មតាប៉ុណ្ណោះ"
      ],
      correctIndex: 2,
      explanationEn: "Correct! The first comma separates Condition from the True branch (THEN); the second comma separates the True branch from the False branch (ELSE).",
      explanationKh: "ត្រឹមត្រូវណាស់! សញ្ញាក្បៀសទីមួយបំបែកលក្ខខណ្ឌចេញពីផ្លូវពិត (THEN) ហើយសញ្ញាក្បៀសទីពីរបំបែកផ្លូវពិតចេញពីផ្លូវមិនពិត (ELSE)។"
    },
    {
      qEn: "3. What happens if the condition inside If() evaluates to FALSE?",
      qKh: "៣. តើមានអ្វីកើតឡើងប្រសិនបើលក្ខខណ្ឌខាងក្នុង If() ផ្តល់លទ្ធផលថា FALSE (មិនពិត)?",
      optionsEn: [
        "A) Power Apps crashes and displays a red error box.",
        "B) The app completely skips Action A and executes only Action B (the ELSE branch).",
        "C) The app executes both Action A and Action B simultaneously.",
        "D) The app repeats the condition in an infinite loop."
      ],
      optionsKh: [
        "A) Power Apps គាំង ហើយបង្ហាញប្រអប់កំហុសពណ៌ក្រហម។",
        "B) កម្មវិធីនឹងរំលងសកម្មភាព A ទាំងស្រុង ហើយដំណើរការតែសកម្មភាព B (ផ្លូវ ELSE) ប៉ុណ្ណោះ។",
        "C) កម្មវិធីដំណើរការទាំងសកម្មភាព A និងសកម្មភាព B ក្នុងពេលតែមួយ។",
        "D) កម្មវិធីដំណើរការលក្ខខណ្ឌនោះម្តងហើយម្តងទៀតមិនចេះចប់។"
      ],
      correctIndex: 1,
      explanationEn: "Correct! If the condition is False, the True branch is completely ignored and only the False (ELSE) branch is executed.",
      explanationKh: "ត្រឹមត្រូវណាស់! ប្រសិនបើលក្ខខណ្ឌគឺមិនពិត (False) ផ្លូវ True នឹងត្រូវរំលងចោលទាំងស្រុង ហើយមានតែផ្លូវ False (ELSE) ប៉ុណ្ណោះដែលត្រូវបានដំណើរការ។"
    },
    {
      qEn: "4. If txtDowntime.Text contains '6.5', why is If(txtDowntime.Text > 4, ...) a critical beginner bug?",
      qKh: "៤. ប្រសិនបើ txtDowntime.Text មានតម្លៃ '6.5' ហេតុអ្វីបានជា If(txtDowntime.Text > 4, ...) ជាកំហុសឆ្គងដ៏គ្រោះថ្នាក់របស់អ្នកទើបចាប់ផ្តើម?",
      optionsEn: [
        "A) Because 6.5 is less than 4.",
        "B) Because txtDowntime.Text is Text data; it must be wrapped in Value() to perform mathematical comparisons.",
        "C) Because Power Apps does not allow numbers with decimals.",
        "D) Because downtime can only be measured in minutes."
      ],
      optionsKh: [
        "A) ពីព្រោះ 6.5 តូចជាង 4។",
        "B) ពីព្រោះ txtDowntime.Text ជាទិន្នន័យអត្ថបទ (Text) ដូច្នេះវាត្រូវតែរុំក្នុងអនុគមន៍ Value() ជាមុនសិន ទើបអាចប្រៀបធៀបគណិតវិទ្យាបាន។",
        "C) ពីព្រោះ Power Apps មិនអនុញ្ញាតឱ្យប្រើលេខទសភាគឡើយ។",
        "D) ពីព្រោះម៉ោងឈប់ដំណើរការអាចគិតបានត្រឹមតែជានាទីប៉ុណ្ណោះ។"
      ],
      correctIndex: 1,
      explanationEn: "Correct! Text and Numbers are stored differently in memory. Always use Value() before comparing numeric text boxes!",
      explanationKh: "ត្រឹមត្រូវណាស់! អត្ថបទ និងលេខ ត្រូវបានរក្សាទុកខុសគ្នាក្នុងអង្គចងចាំ។ ត្រូវប្រើ Value() ជានិច្ច មុនពេលប្រៀបធៀបប្រអប់អត្ថបទដែលមានតួលេខ!"
    },
    {
      qEn: "5. Can If() be used to control visual properties like Visible and DisplayMode?",
      qKh: "៥. តើ If() អាចប្រើដើម្បីគ្រប់គ្រងលក្ខណៈសម្បត្តិរូបភាពដូចជា Visible និង DisplayMode បានដែរឬទេ?",
      optionsEn: [
        "A) No, If() can only be used on Button OnSelect.",
        "B) Yes, If() can evaluate conditions and return visual values like DisplayMode.Disabled or true/false.",
        "C) Only if the app is connected to an Excel spreadsheet.",
        "D) No, visual properties do not support logic."
      ],
      optionsKh: [
        "A) ទេ If() អាចប្រើបានតែលើប៊ូតុង OnSelect ប៉ុណ្ណោះ។",
        "B) បានពិតប្រាកដណាស់! If() អាចវាយតម្លៃលក្ខខណ្ឌ ហើយផ្តល់ត្រឡប់មកវិញនូវតម្លៃរូបភាពដូចជា DisplayMode.Disabled ឬ true/false។",
        "C) លុះត្រាតែកម្មវិធីភ្ជាប់ទៅកាន់ Excel spreadsheet ប៉ុណ្ណោះ។",
        "D) ទេ លក្ខណៈសម្បត្តិរូបភាពមិនគាំទ្រតក្កវិជ្ជាឡើយ។"
      ],
      correctIndex: 1,
      explanationEn: "Correct! If() works for both behavior (OnSelect) and appearance (Visible, DisplayMode, Color, Text)!",
      explanationKh: "ត្រឹមត្រូវណាស់! If() ដំណើរការទាំងសម្រាប់សកម្មភាព (OnSelect) និងសម្រាប់រូបរាងបង្ហាញ (Visible, DisplayMode, Color, Text)!"
    }
  ];

  // --------------------------------------------------------------------------
  // 2. FULL BILINGUAL DICTIONARY (EXACT 1-TO-1 HTML STRUCTURE)
  // --------------------------------------------------------------------------
  const KHMER_SLIDES = {
    'slide-1': {
      title: 'សេចក្តីសម្រេចចិត្ត៖ IF / THEN / ELSE',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & រំលឹកចំណេះដឹង (០០:០០ - ១០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"សូមស្វាគមន៍មកកាន់ថ្ងៃទី ៥ នៃវគ្គសិក្សា Microsoft Power Apps Foundation!
ថ្ងៃនេះគឺជាចំណុចរបត់ដ៏អស្ចារ្យដែលកម្មវិធីរបស់យើងផ្លាស់ប្តូរពីឧបករណ៍គិតលេខធម្មតា ទៅជាជំនួយការឆ្លាតវៃក្នុងអាជីវកម្ម!
កាលពីថ្ងៃទី ១ យើងរៀនពីមូលហេតុដែលកម្មវិធីកើតឡើង៖ ដើម្បីដោះស្រាយបញ្ហាជាក់ស្តែង។
កាលពីថ្ងៃទី ២ យើងរៀនរបៀបដែលកម្មវិធីរៀបលំដាប់លំដោយជំហាន។
កាលពីថ្ងៃទី ៣ យើងបានរក្សាទុកទិន្នន័យ (អត្ថបទ, លេខ, កាលបរិច្ឆេទ, ប៊ូលីន)។
កាលពីថ្ងៃទី ៤ ម្សិលមិញ យើងរៀនចោទសួរអំពីទិន្នន័យដោយប្រើ លក្ខខណ្ឌ (Conditions) ដើម្បីទទួលបានចម្លើយ ពិត (True) ឬ មិនពិត (False)។
ថ្ងៃនេះនៅថ្ងៃទី ៥ យើងរៀនស្ដេចនៃតក្កវិជ្ជាអាជីវកម្ម៖ IF!
ខ្សែសង្វាក់តភ្ជាប់ថ្ងៃនេះគឺ៖ លក្ខខណ្ឌ ➔ ពិត/មិនពិត ➔ IF ➔ សកម្មភាព A / សកម្មភាព B។
កម្មវិធីមិនចេះគិតទេ! IF គ្រាន់តែរង់ចាំស្តាប់លទ្ធផល True ឬ False ពីលក្ខខណ្ឌ រួចជ្រើសរើសផ្លូវមួយដែលត្រូវដើរ!"`,
      content: `
        <div class="hero-layout">
          <div class="hero-pill-group">
            <span class="hero-pill">ដំណាក់កាលទី ២៖ តក្កវិជ្ជា &amp; ការសម្រេចចិត្ត</span>
            <span class="hero-pill teal-pill">ថ្ងៃទី ៥ នៃ ២៧</span>
            <span class="hero-pill blue-pill">៩០ នាទី</span>
          </div>
          <h1 class="hero-title">
            <span class="gradient-text">សេចក្តីសម្រេចចិត្ត៖ IF / THEN / ELSE</span><br>
            របៀបដែលកម្មវិធីជ្រើសរើសសកម្មភាពផ្សេងគ្នាផ្អែកលើការពិត
          </h1>
          <p class="hero-subtitle">
            កាលពីម្សិលមិញ លក្ខខណ្ឌបានផ្តល់ឱ្យកម្មវិធីនូវសមត្ថភាពស្វែងរក <strong>ពិត (True)</strong> និង <strong>មិនពិត (False)</strong>។ ថ្ងៃនេះ អនុគមន៍ <code>If()</code> បម្លែងលទ្ធផលនោះឱ្យក្លាយទៅជាសកម្មភាពអាជីវកម្មជាក់ស្តែង ដោយបើកផ្លូវបំបែកពីរ ដើម្បីឱ្យកម្មវិធីធ្វើរឿងត្រឹមត្រូវនៅពេលវេលាត្រឹមត្រូវ។
          </p>

          <div class="title-feature-grid">
            <div class="feature-item">
              <span class="feature-icon">&#10067;</span>
              <div class="feature-info">
                <h4>១. លក្ខខណ្ឌ (Condition)</h4>
                <p>សំណួរកាលពីម្សិលមិញដែលវាយតម្លៃទិន្នន័យដើម្បីផ្តល់ចម្លើយយ៉ាងតឹងរ៉ឹងត្រឹមតែ <strong>True</strong> ឬ <strong>False</strong>។</p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">&#128256;</span>
              <div class="feature-info">
                <h4>២. ផ្លូវបំបែកពីរ (The Fork)</h4>
                <p>អនុគមន៍ <code>If()</code> ពិនិត្យមើលលទ្ធផលនោះ ដើម្បីបំបែកទិសដៅដំណើរការជាពីរផ្លូវដាច់ដោយឡែកពីគ្នា។</p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">&#128640;</span>
              <div class="feature-info">
                <h4>៣. សកម្មភាពដែលត្រូវជ្រើសរើស</h4>
                <p>ដំណើរការ <strong>សកម្មភាព A (THEN)</strong> បើពិត ឬងាកទៅធ្វើ <strong>សកម្មភាព B (ELSE)</strong> បើមិនពិត។</p>
              </div>
            </div>
          </div>
        </div>
      `
    },
    'slide-2': {
      title: 'ផែនទីគំរូគំនិតមេ (Spiral Concept Map)',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & រំលឹកចំណេះដឹង (០០:០០ - ១០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"សូមក្រឡេកមើលចំណុចតភ្ជាប់នៃមេរៀនទាំង ២៧ ថ្ងៃ។
កាលពីថ្ងៃទី ៣ យើងមានទិន្នន័យ។ កាលពីថ្ងៃទី ៤ យើងសួរលក្ខខណ្ឌ។
ថ្ងៃនេះនៅថ្ងៃទី ៥ យើងប្រើ IF ដើម្បីសម្រេចចិត្ត។
បើគ្មានទិន្នន័យ គ្មានលក្ខខណ្ឌទេ។ បើគ្មានលក្ខខណ្ឌ ក៏គ្មាន IF ដែរ!
នេះជាខ្សែសង្វាក់ចាក់ស្រេះគ្នាដែលគ្មានចំណុចណាមួយដាច់ដោយឡែកឡើយ។"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge purple-badge">ស្ថាបត្យកម្មកម្មវិធីសិក្សា</span>
          <h2 class="slide-title">ទីតាំងនៃមេរៀនថ្ងៃនេះក្នុងគំរូគំនិតមេ ២៧ ថ្ងៃ</h2>
          <p class="slide-lead">យើងមិនដែលបង្រៀនមុខងារដាច់ដោយឡែកឡើយ។ ថ្ងៃនេះបំពេញស្ពានតភ្ជាប់រវាងលក្ខខណ្ឌអសកម្ម និងអាកប្បកិរិយាសកម្មរបស់កម្មវិធី។</p>
        </div>

        <div class="mental-model-chain">
          <div class="chain-step step-completed">
            <span class="step-num">ថ្ងៃទី ១-២</span>
            <span class="step-name">បញ្ហា &amp; លំដាប់</span>
            <span class="step-status">&#10003; គ្រឹះដំបូង</span>
          </div>
          <span class="chain-arrow">&#8594;</span>
          <div class="chain-step step-completed">
            <span class="step-num">ថ្ងៃទី ៣-៤</span>
            <span class="step-name">ទិន្នន័យ &amp; លក្ខខណ្ឌ</span>
            <span class="step-status">&#10003; True / False</span>
          </div>
          <span class="chain-arrow">&#8594;</span>
          <div class="chain-step step-active-day5">
            <span class="step-num">ថ្ងៃនេះ (ថ្ងៃ ៥)</span>
            <span class="step-name">IF / ការសម្រេចចិត្ត</span>
            <span class="step-status">&#9733; តក្កវិជ្ជាបំបែកផ្លូវ</span>
          </div>
          <span class="chain-arrow">&#8594;</span>
          <div class="chain-step step-future">
            <span class="step-num">ថ្ងៃទី ៦</span>
            <span class="step-name">ច្រក AND / OR</span>
            <span class="step-status">ថ្ងៃស្អែក</span>
          </div>
          <span class="chain-arrow">&#8594;</span>
          <div class="chain-step step-future">
            <span class="step-num">ថ្ងៃទី ៧-២៧</span>
            <span class="step-name">UI ➔ រក្សាទុក ➔ តេស្ត</span>
            <span class="step-status">ខាងមុខ</span>
          </div>
        </div>

        <div class="grid-2-col" style="margin-top: 1.25rem;">
          <div class="info-card border-blue">
            <div class="card-header-icon">&#128260; របៀបដែលថ្ងៃទី ៤ តភ្ជាប់មកថ្ងៃទី ៥</div>
            <p>កាលពីម្សិលមិញ យើងរៀនថា <strong>លក្ខខណ្ឌ</strong> គឺជាសំណួរដែលប្រៀបធៀបទិន្នន័យដើម្បីផ្តល់ចម្លើយត្រឹមតែ <strong>True</strong> ឬ <strong>False</strong>។ ថ្ងៃនេះ <code>If()</code> យកចម្លើយ True/False នោះមកធ្វើជាកុងតាក់ប្តូរផ្លូវ ដើម្បីជ្រើសរើសរវាងសកម្មភាព A និងសកម្មភាព B។</p>
          </div>
          <div class="info-card border-purple">
            <div class="card-header-icon">&#128301; ហេតុអ្វីថ្ងៃទី ៦ ត្រូវការពឹងផ្អែកលើថ្ងៃទី ៥</div>
            <p>ការសម្រេចចិត្តក្នុងអាជីវកម្មជាក់ស្តែង ច្រើនតែត្រូវការលក្ខខណ្ឌច្រើនជាងមួយ (ឧទាហរណ៍៖ សម្ពាធ &gt; ២០០ <strong>និង</strong> ទ្វារសុវត្ថិភាពបើក)។ ថ្ងៃស្អែកនៅថ្ងៃទី ៦ យើងនឹងរៀនច្រក <code>And</code> / <code>Or</code> ប៉ុន្តែអ្នកត្រូវតែចេះស្ទាត់លើផ្លូវបំបែកទោលនៃ <code>If()</code> ថ្ងៃនេះជាមុនសិន។</p>
          </div>
        </div>
      `
    },
    'slide-3': {
      title: 'សំណួររំលឹកចំណេះដឹងគ្រឹះ (Prerequisite Retrieval)',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & រំលឹកចំណេះដឹង (០០:០០ - ១០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"មុននឹងយើងចាប់ផ្តើមសរសេរ If() ខ្ញុំសុំសួរ ៣ សំណួរដើម្បីរំលឹកការចងចាំពីថ្ងៃទី ៣ និង ៤។
សួរទៅកាន់សិស្ស៖ 'តើលក្ខខណ្ឌជាអ្វី?' 'តើវាបង្កើតចម្លើយអ្វី?' 'ហេតុអ្វីត្រូវប្រើ Value()?'
សូមផ្តល់ពេលវេលាឱ្យសិស្សឆ្លើយដោយផ្ទាល់មាត់ មុននឹងបង្ហាញចម្លើយនៅលើស្លាយ។"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge blue-badge">រំលឹកចំណេះដឹងគ្រឹះ</span>
          <h2 class="slide-title">តេស្តចំណេះដឹងពីមុន៖ រំលឹកលក្ខខណ្ឌថ្ងៃទី ៤</h2>
          <p class="slide-lead">ទាញយកគោលគំនិតលក្ខខណ្ឌគ្រឹះពីការចងចាំ មុនពេលយើងផ្តល់ថាមពលនៃការសម្រេចចិត្តដល់កម្មវិធីរបស់យើង។</p>
        </div>

        <div class="grid-3-col">
          <div class="retrieval-card">
            <div class="retrieval-num">01</div>
            <h4>ពីថ្ងៃទី ៤៖ និយមន័យ</h4>
            <p class="retrieval-q">តើអ្វីជានិយមន័យស្នូលនៃ "លក្ខខណ្ឌ (Condition)"?</p>
            <div class="retrieval-answer">
              <strong>ចម្លើយ៖</strong> សំណួរប្រៀបធៀបទិន្នន័យជាមួយកម្រិតគោល (ឧ. <code>Pressure &gt; 200</code>) ដែលផ្តល់ចម្លើយយ៉ាងតឹងរ៉ឹងត្រឹមតែ <strong>True</strong> ឬ <strong>False</strong>។
            </div>
          </div>
          <div class="retrieval-card">
            <div class="retrieval-num">02</div>
            <h4>ពីថ្ងៃទី ៤៖ លទ្ធផល</h4>
            <p class="retrieval-q">តើ True ឬ False គឺជាការសម្រេចចិត្តទាំងស្រុងឬនៅ?</p>
            <div class="retrieval-answer">
              <strong>ចម្លើយ៖</strong> ទេ! True/False គ្រាន់តែជា <strong>ចម្លើយវាយតម្លៃ</strong>។ កម្មវិធីមិនទាន់ធ្វើសកម្មភាពអ្វីទាំងអស់ លុះត្រាតែមានអនុគមន៍ <code>If()</code> មកចាត់ចែងលើវា។
            </div>
          </div>
          <div class="retrieval-card">
            <div class="retrieval-num">03</div>
            <h4>ពីថ្ងៃទី ៤៖ សញ្ញាប្រៀបធៀប</h4>
            <p class="retrieval-q">តើសញ្ញាអ្វីមានន័យថា "មិនស្មើគ្នា" ក្នុង Power Fx?</p>
            <div class="retrieval-answer">
              <strong>ចម្លើយ៖</strong> សញ្ញាវង់ក្រចកមុំ <code>&lt;&gt;</code> ដែលសួរសំណួរថា៖ <em>"តើតម្លៃខាងឆ្វេងខុសពីតម្លៃខាងស្តាំដែរឬទេ?"</em>។
            </div>
          </div>
        </div>
      `
    },
    'slide-4': {
      title: 'គោលបំណងនៃការរៀនសូត្រ (Measurable Objectives)',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & រំលឹកចំណេះដឹង (០០:០០ - ១០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"នៅចុងបញ្ចប់នៃវគ្គ ៩០ នាទីថ្ងៃនេះ សិស្សនឹងអាច៖
១. ពន្យល់រចនាសម្ព័ន្ធ ៣ ផ្នែកនៃ IF ដោយគ្មានកំហុស។
២. តាមដានទិសដៅនៃកូដដោយដឹងច្បាស់ថាផ្លូវណាដំណើរការ។
៣. ការពារកំហុសស្វ័យប្រវត្តិកម្មខ្វាក់ភ្នែកដូចនៅរោងចក្រ Apex។
៤. សរសេរកូដ Power Fx If() សម្រាប់ប៊ូតុង និងការចាក់សោរ UI!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge green-badge">សមត្ថភាពគោលដៅ</span>
          <h2 class="slide-title">គោលបំណងដែលអាចវាស់វែងបាន ៤ ចំណុចសម្រាប់ថ្ងៃទី ៥</h2>
          <p class="slide-lead">នៅចុងបញ្ចប់នៃវគ្គសិក្សា ៩០ នាទីនេះ អ្នកនឹងអាចបង្ហាញសមត្ថភាពជាក់ស្តែងទាំងបួននេះដោយឯករាជ្យ៖</p>
        </div>

        <div class="grid-2-col">
          <div class="objective-card">
            <div class="obj-badge">OBJ 1 • ការយល់ដឹង</div>
            <h3>បំបែកផ្នែកសំខាន់ទាំង ៣ នៃ IF</h3>
            <p>កំណត់ និងពន្យល់សមាសធាតុសំខាន់ទាំង ៣ នៃរាល់ការសម្រេចចិត្ត៖ <strong>លក្ខខណ្ឌ</strong> (សំណួរ), <strong>ផ្លូវ True</strong> (THEN), និង <strong>ផ្លូវ False</strong> (ELSE)។</p>
            <div class="obj-outcome">&#10004; វាស់វែងតាមរយៈ៖ ឧទាហរណ៍ប្រៀបធៀបផ្លូវបំបែករថភ្លើង</div>
          </div>

          <div class="objective-card">
            <div class="obj-badge">OBJ 2 • តាមដានតក្កវិជ្ជា</div>
            <h3>តាមដានទិសដៅនៃការដំណើរការ</h3>
            <p>ទស្សន៍ទាយយ៉ាងត្រឹមត្រូវ ១០០% ថាតើសកម្មភាពមួយណាដំណើរការផ្អែកលើទិន្នន័យជាក់ស្តែង ដោយធានាថាមានតែផ្លូវមួយគត់ដែលដំណើរការ។</p>
            <div class="obj-outcome">&#10004; វាស់វែងតាមរយៈ៖ កម្មវិធីក្លែងធ្វើការសម្រេចចិត្ត ៦ ស្ថានភាព</div>
          </div>

          <div class="objective-card">
            <div class="obj-badge">OBJ 3 • ការធ្វើរោគវិនិច្ឆ័យ</div>
            <h3>ការពារកុំឱ្យមាន "ស្វ័យប្រវត្តិកម្មខ្វាក់ភ្នែក"</h3>
            <p>ធ្វើរោគវិនិច្ឆ័យថាតើមានអ្វីកើតឡើងនៅពេលកម្មវិធីអនុវត្តគ្រប់ព្រឹត្តិការណ៍ដូចៗគ្នាដោយគ្មានការបំបែកផ្លូវ ដែលបណ្តាលឱ្យរោទិ៍ខុស និងខាតបង់ធនធាន។</p>
            <div class="obj-outcome">&#10004; វាស់វែងតាមរយៈ៖ ករណីសិក្សាការខាតបង់ $18,000 នៅ Apex</div>
          </div>

          <div class="objective-card">
            <div class="obj-badge">OBJ 4 • ការអនុវត្តជាក់ស្តែង</div>
            <h3>បង្កើតរូបមន្ត Power Fx <code>If()</code></h3>
            <p>សរសេរកូដ Power Fx <code>If()</code> ត្រឹមត្រូវតាមក្បួន ដើម្បីបញ្ជាសកម្មភាពប៊ូតុង, ប្តូរពណ៌ស្លាកអក្សរ, និងគ្រប់គ្រងការបង្ហាញ (<code>Visible</code>, <code>DisplayMode</code>)។</p>
            <div class="obj-outcome">&#10004; វាស់វែងតាមរយៈ៖ បញ្ហាប្រឈមចាត់ចែងឃ្លាំងស្វ័យប្រវត្តិ</div>
          </div>
        </div>
      `
    },
    'slide-5': {
      title: 'របៀបវារៈ ៩០ នាទី (Timed Agenda)',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & រំលឹកចំណេះដឹង (០០:០០ - ១០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"នេះជារបៀបវារៈ ៩០ នាទីរបស់យើង៖
១០ នាទីដំបូង៖ រំលឹកចំណេះដឹង។
១៥ នាទីបន្ទាប់៖ មូលហេតុដែល IF កើតឡើង & ករណី Apex។
២០ នាទីបន្ទាប់៖ សមាសធាតុទាំង ៣ នៃ IF & កន្លែងដែល IF រស់នៅ។
១៥ នាទីបន្ទាប់៖ បង្ហាញផ្ទាល់លើ IF Workbench។
១៥ នាទីបន្ទាប់៖ អនុវត្តផ្ទាល់លើ ៦ ស្ថានភាព។
១៥ នាទីចុងក្រោយ៖ កម្រងសំណួរ, បញ្ហាប្រឈមឃ្លាំង & ស្ពានទៅថ្ងៃទី ៦!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge purple-badge">រចនាសម្ព័ន្ធមេរៀន</span>
          <h2 class="slide-title">របៀបវារៈ ៩០ នាទីតាមទម្រង់ Spiral</h2>
          <p class="slide-lead">ដំណើរការគរុកោសល្យប្រកបដោយតុល្យភាព ចាប់ពីការបរាជ័យក្នុងរោងចក្រ រហូតដល់ការអនុវត្តជាក់ស្តែងលើផ្លូវបំបែកតក្កវិជ្ជា។</p>
        </div>

        <div class="agenda-timeline-grid">
          <div class="agenda-row">
            <div class="agenda-time">00:00 - 10:00 (10m)</div>
            <div class="agenda-topic">
              <strong>ផ្នែកទី ១៖ ស្វាគមន៍ &amp; រំលឹកចំណេះដឹង</strong>
              <span>យុថ្កាគំរូគំនិតមេ, រំលឹកចំណេះដឹងពីថ្ងៃទី ១–៤, ៤ គោលបំណងដែលអាចវាស់វែងបាន។</span>
            </div>
            <div class="agenda-milestone">ចំណុចដៅ៖ យុថ្កាគំនិត</div>
          </div>
          <div class="agenda-row">
            <div class="agenda-time">10:00 - 25:00 (15m)</div>
            <div class="agenda-topic">
              <strong>ផ្នែកទី ២៖ មូលហេតុនៃការសម្រេចចិត្ត &amp; ឧទាហរណ៍ប្រៀបធៀប</strong>
              <span>កំហុសប្រកាសអាសន្នខ្វាក់ភ្នែក $18,000 នៅ Apex, គោលគំនិតនៃការសម្រេចចិត្ត, និងផ្លូវបំបែករថភ្លើង។</span>
            </div>
            <div class="agenda-milestone">ចំណុចដៅ៖ យល់ច្បាស់ពីបញ្ហា</div>
          </div>
          <div class="agenda-row">
            <div class="agenda-time">25:00 - 45:00 (20m)</div>
            <div class="agenda-topic">
              <strong>ផ្នែកទី ៣៖ សមាសធាតុសំខាន់ទាំង ៣ នៃ IF</strong>
              <span>លក្ខខណ្ឌ ➔ សកម្មភាពបើពិត ➔ សកម្មភាពបើមិនពិត។ កន្លែងដែល IF រស់នៅ៖ OnSelect, Visible, DisplayMode។</span>
            </div>
            <div class="agenda-milestone">ចំណុចដៅ៖ វេយ្យាករណ៍តក្កវិជ្ជា</div>
          </div>
          <div class="agenda-row">
            <div class="agenda-time">45:00 - 60:00 (15m)</div>
            <div class="agenda-topic">
              <strong>ផ្នែកទី ៤៖ ការបង្ហាញផ្ទាល់ &amp; បន្ទប់ពិសោធន៍ការសម្រេចចិត្ត</strong>
              <span>តុពិសោធន៍ IF Decision Workbench៖ ស្លាយឌ័រ និងប៊ូតុងប្តូរផ្លូវដំណើរការជាក់ស្តែងក្នុងពេលជាក់ស្តែង។</span>
            </div>
            <div class="agenda-milestone">ចំណុចដៅ៖ មើលឃើញផ្ទាល់ភ្នែក</div>
          </div>
          <div class="agenda-row">
            <div class="agenda-time">60:00 - 75:00 (15m)</div>
            <div class="agenda-topic">
              <strong>ផ្នែកទី ៥៖ ការអនុវត្តក្រោមការណែនាំ &amp; កម្មវិធីក្លែងធ្វើ</strong>
              <span>វិភាគក្បួនបញ្ជូនទិន្នន័យនៃទម្រង់ Apex; អនុវត្តផ្ទាល់លើផ្ទាំងសម្រេចចិត្ត ៦ ស្ថានភាព។</span>
            </div>
            <div class="agenda-milestone">ចំណុចដៅ៖ អនុវត្តឯករាជ្យ</div>
          </div>
          <div class="agenda-row">
            <div class="agenda-time">75:00 - 90:00 (15m)</div>
            <div class="agenda-topic">
              <strong>ផ្នែកទី ៦៖ ពិនិត្យចំណេះដឹង, លំហាត់បញ្ចប់ &amp; ស្ពានចម្លង</strong>
              <span>សំណួរ ៥ ចំណុច, បញ្ហាប្រឈមឃ្លាំង ៨ ផ្លូវបំបែក, រូបរិកវាយតម្លៃ, កិច្ចការផ្ទះ &amp; ស្ពានទៅថ្ងៃទី ៦ ច្រក AND/OR។</span>
            </div>
            <div class="agenda-milestone">ចំណុចដៅ៖ វាយតម្លៃស្ទាត់ជំនាញ</div>
          </div>
        </div>
      `
    },
    'slide-6': {
      title: 'បញ្ហាកន្លែងធ្វើការ៖ កំហុសខាតបង់ $18,000',
      segment: 'ផ្នែកទី ២៖ មូលហេតុដែលត្រូវមានការសម្រេចចិត្ត (១០:០០ - ២៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"សូមក្រឡេកមើលករណីសិក្សានៅរោងចក្រ Apex Plastics។
អ្នកបង្កើតកម្មវិធីដំបូងម្នាក់បានបង្កើតប៊ូតុង 'Report Incident' ដោយដាក់កូដផ្លូវទោល៖
SendAlertToPlantManager() ; SoundPlantEvacuationAlarm()!
ពេលមានប្រេងស្រក់តិចតួចត្រឹម ៥ មីលីលីត្រ កម្មករចុចប៊ូតុងនោះ ហើយរោងចក្រទាំងមូលត្រូវបានជម្លៀស!
កម្មករ ១៤០ នាក់ត្រូវរត់ចេញក្រៅ ឡានពន្លត់អគ្គិភ័យមកដល់ ខាតបង់ពេល ២ ម៉ោង ស្មើនឹង $18,000!
ទាំងអស់នេះកើតឡើងដោយសារតែកម្មវិធីគ្មាន IF! កម្មវិធីគ្មានផ្លូវបំបែក!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge red-badge">ករណីសិក្សាកន្លែងធ្វើការ</span>
          <h2 class="slide-title">Apex Plastics៖ កំហុស "ប្រកាសអាសន្នខ្វាក់ភ្នែក" ខាតបង់ $18,000</h2>
          <p class="slide-lead">របៀបដែលកម្មវិធីមានផ្លូវរត់តែមួយគ្មានការបំបែកតក្កវិជ្ជា បានជម្លៀសកម្មករពេញរោងចក្រ ដោយសារតែប្រេងស្រក់តិចតួចត្រឹម ១០ នាទី។</p>
        </div>

        <div class="story-case-box">
          <div class="story-header">
            <span class="warning-icon">&#9888;</span>
            <div>
              <h3 style="margin:0; color:#fb7185;">របាយការណ៍ឧបទ្ទវហេតុ៖ ការជម្លៀសបន្ទាន់ពេញរោងចក្រដោយច្រឡំ</h3>
              <span style="font-size:0.85rem; color:#cbd5e1;">រោងចក្រផលិតផ្លាស្ទិក Apex • ខ្សែច្រវាក់វេចខ្ចប់ Conveyor #2 វេន A</span>
            </div>
          </div>

          <div class="story-grid">
            <div class="story-panel">
              <h4>អ្វីដែលកម្មវិធីបានដំណើរការ (កូដផ្លូវទោលត្រង់ស្ទុយ)៖</h4>
              <div class="math-card math-actual">
                <span>បញ្ហាដែលបានរាយការណ៍៖ <code>"ប្រេងស្រក់តិចតួចពីប៊ូឡុងធូរ"</code></span>
                <span>រូបមន្តកម្មវិធី៖ <code>SoundEvacuationSiren()</code></span>
                <div class="calc-divider"></div>
                <span class="result-line-fail">លទ្ធផល៖ <strong>កម្មករ ១៤០ នាក់ត្រូវជម្លៀស (ខាតបង់ $18,000)</strong></span>
              </div>
            </div>

            <div class="story-panel">
              <h4>អ្វីដែលតក្កវិជ្ជាបំបែកផ្លូវគួរតែធ្វើ (IF)៖</h4>
              <div class="math-card math-expected">
                <span>លក្ខខណ្ឌ៖ <code>IsUrgent = true</code> (លទ្ធផលវាយតម្លៃ៖ FALSE)</span>
                <span>ផ្លូវ True៖ <code>SoundEvacuationSiren()</code></span>
                <span>ផ្លូវ False៖ <code>NotifyLineMechanic()</code></span>
                <div class="calc-divider"></div>
                <span class="result-line">លទ្ធផលជាក់ស្តែង៖ <strong>ជាងមេកានិកមកជួសជុល • គ្មានការខាតបង់ពេលផលិតកម្ម</strong></span>
              </div>
            </div>
          </div>

          <div class="story-footer">
            <strong>មូលហេតុដើម៖</strong> កម្មវិធីខ្វះផ្លូវបំបែកការសម្រេចចិត្ត។ ដំណើរការអាជីវកម្មពិតប្រាកដមិនមែនជារថភ្លើងផ្លូវទោលទេ វាត្រូវការ <strong>តក្កវិជ្ជាបំបែកផ្លូវ (Branching Logic)</strong> ដើម្បីចាត់ចែងកិច្ចការតូចតាចខុសពីគ្រោះអាសន្នធំៗ។
          </div>
        </div>
      `
    },
    'slide-7': {
      title: 'គោលគំនិតសាមញ្ញ៖ តើអ្វីជាការសម្រេចចិត្ត?',
      segment: 'ផ្នែកទី ២៖ មូលហេតុដែលត្រូវមានការសម្រេចចិត្ត (១០:០០ - ២៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"តើការសម្រេចចិត្តក្នុងកម្មវិធីជាអ្វី?
វាគ្រាន់តែជាផ្លូវបំបែកពីរ!
ស្រមៃថាអ្នកដើរតាមផ្លូវដើរ ហើយឃើញស្លាកសួរថា៖ 'តើកាតរបស់អ្នកពណ៌បៃតងទេ?'
បើពិត បត់ឆ្វេងចូលបន្ទប់ប្រជុំ។ បើមិនពិត បត់ស្តាំចូលអាហារដ្ឋាន។
អ្នកមិនអាចបត់ទាំងឆ្វេងទាំងស្តាំក្នុងពេលតែមួយបានទេ!
ស្លាកសួរគឺជាលក្ខខណ្ឌ (Condition)។ ផ្លូវបំបែកគឺជា IF។ ទ្វារទាំងពីរគឺជាសកម្មភាព A និង B!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge blue-badge">គំរូគំនិតស្នូល</span>
          <h2 class="slide-title">ភាសាសាមញ្ញ៖ តើអ្វីជា "ការសម្រេចចិត្ត (Decision)"?</h2>
          <p class="slide-lead">ការសម្រេចចិត្ត គឺជាផ្លូវបំបែកពីរដែលកម្មវិធីជ្រើសរើសផ្លូវមួយយ៉ាងពិតប្រាកដ ដោយផ្អែកលើចម្លើយរបស់លក្ខខណ្ឌ។</p>
        </div>

        <div class="grid-2-col" style="gap: 1.5rem;">
          <div class="concept-card">
            <div class="concept-badge red-badge">&#10060; កូដរត់ផ្លូវទោល (ស្វ័យប្រវត្តិកម្មខ្វាក់ភ្នែក)</div>
            <h3>ដំណើរការគ្រប់ជំហានដោយងងឹតងងុល</h3>
            <p>ធ្វើតាមលំដាប់ថេរដោយមិនខ្វល់ពីស្ថានភាពជាក់ស្តែង។ ចាត់ទុកគ្រោះអាសន្ន និងបញ្ហាបន្តិចបន្តួចដូចៗគ្នា។</p>
            <div class="concept-examples">
              <div class="example-item">តែងតែបន្លឺសំឡេងរោទិ៍ជម្លៀសគ្រប់ពេល។</div>
              <div class="example-item">តែងតែទាមទារហត្ថលេខាអ្នកគ្រប់គ្រង សូម្បីតែទិញសម្ភារៈ $2។</div>
              <div class="example-item">តែងតែចាក់សោរអេក្រង់ សូម្បីតែបំពេញទិន្នន័យត្រូវហើយក៏ដោយ។</div>
            </div>
          </div>

          <div class="concept-card">
            <div class="concept-badge green-badge">&#10004; ការសម្រេចចិត្តបំបែកផ្លូវ (កម្មវិធីឆ្លាតវៃ)</div>
            <h3>ជ្រើសរើសសកម្មភាពសមស្របផ្អែកលើការពិត</h3>
            <p>ពិនិត្យមើលចម្លើយ True/False របស់លក្ខខណ្ឌ ដើម្បីបញ្ជូនអ្នកប្រើប្រាស់ទៅកាន់លទ្ធផលត្រឹមត្រូវតាមកាលៈទេសៈ។</p>
            <div class="concept-examples">
              <div class="example-item">&#10004; <strong>បើអាសន្ន?</strong> បន្លឺស៊ីរ៉ែន។ <strong>បើមិនអាសន្ន?</strong> កត់ត្រាធម្មតា។</div>
              <div class="example-item">&#10004; <strong>បើថ្លៃ &gt; $500?</strong> ផ្ញើទៅនាយក។ <strong>បើមិនថ្លៃ?</strong> អនុម័តស្វ័យប្រវត្តិ។</div>
              <div class="example-item">&#10004; <strong>បើឈ្មោះទទេ?</strong> បង្ហាញអក្សរក្រហម។ <strong>បើមាន?</strong> រក្សាទុកទម្រង់។</div>
            </div>
          </div>
        </div>

        <div class="takeaway-banner">
          <strong>ចំណុចសំខាន់៖</strong> <code>If()</code> មិនចេះសម្រេចចិត្តដោយខ្លួនឯងទេ! វាគ្រាន់តែដើរតាមទិសដៅដែលចង្អុលបង្ហាញដោយ <strong>ចម្លើយ True ឬ False</strong> នៃលក្ខខណ្ឌរបស់អ្នកប៉ុណ្ណោះ!
        </div>
      `
    },
    'slide-8': {
      title: 'ឧទាហរណ៍ប្រៀបធៀប៖ កុងតាក់ផ្លូវដែក',
      segment: 'ផ្នែកទី ២៖ មូលហេតុដែលត្រូវមានការសម្រេចចិត្ត (១០:០០ - ២៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"ឧទាហរណ៍ផ្លូវដែករថភ្លើងជួយឱ្យសិស្សចងចាំ IF បានច្បាស់បំផុត។
រថភ្លើងរត់ទៅមុខជាលំហូរកូដ។ កុងតាក់ពិនិត្យមើលឧបសគ្គ៖
បើផ្លូវស្រឡះ (True) រថភ្លើងរត់ត្រង់ទៅស្ថានីយ A។
បើមានឧបសគ្គ (False) ដងកុងតាក់បង្វែរផ្លូវទៅស្ថានីយ B។
រថភ្លើងមិនអាចបំបែកជាពីររត់លើផ្លូវទាំងពីរក្នុងពេលតែមួយបានឡើយ!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge gold-badge">ឧទាហរណ៍ប្រៀបធៀបក្នុងជីវិត</span>
          <h2 class="slide-title">ឧទាហរណ៍ប្រៀបធៀប៖ កុងតាក់ប្តូរផ្លូវដែករថភ្លើង</h2>
          <p class="slide-lead">រថភ្លើងមិនអាចរត់លើផ្លូវពីរក្នុងពេលតែមួយបានទេ។ ដងកុងតាក់នឹងបង្វែររថភ្លើងទៅកាន់ផ្លូវ A ឬផ្លូវ B។</p>
        </div>

        <div class="railway-switch-box">
          <div class="train-origin">
            <span class="rail-icon">&#128642;</span>
            <strong>ចរន្តនៃការដំណើរការ</strong>
            <p>អ្នកប្រើចុចលើប៊ូតុង</p>
          </div>

          <div class="switch-lever">
            <div class="lever-indicator">&#128256;</div>
            <span class="lever-label">កុងតាក់ IF</span>
            <code>លក្ខខណ្ឌ៖ True ឬ False?</code>
          </div>

          <div class="track-branches">
            <div class="track-branch branch-true">
              <span class="branch-pill pill-true">TRUE (THEN)</span>
              <strong>ផ្លូវ A៖ រថភ្លើងល្បឿនលឿន</strong>
              <p>ដំណើរការសកម្មភាព A (ឧទាហរណ៍៖ រក្សាទុកទម្រង់ &amp; ជូនដំណឹងប្រធាន)</p>
            </div>

            <div class="track-branch branch-false">
              <span class="branch-pill pill-false">FALSE (ELSE)</span>
              <strong>ផ្លូវ B៖ ផ្លូវចតសុវត្ថិភាព</strong>
              <p>ដំណើរការសកម្មភាព B (ឧទាហរណ៍៖ បង្ហាញកំហុសក្រហម &amp; ទប់ស្កាត់ការរុករក)</p>
            </div>
          </div>
        </div>
      `
    },
    'slide-9': {
      title: 'សមាសធាតុសំខាន់ទាំង ៣ នៃ IF',
      segment: 'ផ្នែកទី ៣៖ សមាសធាតុសំខាន់ទាំង ៣ នៃ IF (២៥:០០ - ៤៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"រាល់ IF ទាំងអស់ក្នុងលោកមាន ៣ ផ្នែកបំបែកដោយក្បៀស៖
ផ្នែកទី ១៖ លក្ខខណ្ឌ (សំណួរ True/False)។
ផ្នែកទី ២៖ THEN (សកម្មភាពបើពិត)។
ផ្នែកទី ៣៖ ELSE (សកម្មភាពបើមិនពិត)។
ក្បៀសទីមួយ = THEN; ក្បៀសទីពីរ = ELSE!
សូមឱ្យសិស្សទន្ទេញមេរៀននេះឱ្យចាំមាត់៖ លក្ខខណ្ឌ, THEN, ELSE!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge purple-badge">រចនាសម្ព័ន្ធនៃកូដ (Code Structure)</span>
          <h2 class="slide-title">សមាសធាតុសំខាន់ទាំង ៣ នៃ <code>If()</code></h2>
          <p class="slide-lead">បំបែកដោយសញ្ញាក្បៀស អាគុយម៉ង់ទាំងបីនេះបង្កើតជាវេយ្យាករណ៍សកលនៃការសម្រេចចិត្តក្នុងប្រព័ន្ធឌីជីថល។</p>
        </div>

        <div class="if-syntax-anatomy-box">
          <div class="if-banner">
            <span class="if-kw">If</span> ( 
            <span class="if-arg if-cond">លក្ខខណ្ឌ (Condition)</span> , 
            <span class="if-arg if-then">សកម្មភាពបើពិត (IfTrue)</span> , 
            <span class="if-arg if-else">សកម្មភាពបើមិនពិត (IfFalse)</span> )
          </div>

          <div class="if-cards-grid">
            <div class="if-card card-cond">
              <span class="card-step-tag">អាគុយម៉ង់ទី ១</span>
              <h4>លក្ខខណ្ឌ (សំណួរ)</h4>
              <p>សំណួរប្រៀបធៀបពីថ្ងៃទី ៤ ដែលផ្តល់ចម្លើយយ៉ាងតឹងរ៉ឹងត្រឹមតែ <strong>True</strong> ឬ <strong>False</strong>។</p>
              <div class="card-example"><code>Value(txtHours.Text) &gt; 4.0</code></div>
            </div>

            <div class="if-card card-then">
              <span class="card-step-tag">អាគុយម៉ង់ទី ២ (ក្រោយក្បៀសទី ១)</span>
              <h4>THEN៖ ផ្លូវពិត (True Branch)</h4>
              <p>សកម្មភាព ឬតម្លៃដែលត្រូវផ្តល់ឱ្យនៅពេលលក្ខខណ្ឌវាយតម្លៃឃើញថា <strong>TRUE</strong>។</p>
              <div class="card-example"><code>"CRITICAL ESCALATION"</code></div>
            </div>

            <div class="if-card card-else">
              <span class="card-step-tag">អាគុយម៉ង់ទី ៣ (ក្រោយក្បៀសទី ២)</span>
              <h4>ELSE៖ ផ្លូវមិនពិត (False Branch)</h4>
              <p>សកម្មភាព ឬតម្លៃបម្រុងដែលត្រូវផ្តល់ឱ្យនៅពេលលក្ខខណ្ឌវាយតម្លៃឃើញថា <strong>FALSE</strong>។</p>
              <div class="card-example"><code>"STANDARD TICKET"</code></div>
            </div>
          </div>
        </div>
      `
    },
    'slide-10': {
      title: 'កន្លែងដែល IF រស់នៅក្នុង Power Apps',
      segment: 'ផ្នែកទី ៣៖ សមាសធាតុសំខាន់ទាំង ៣ នៃ IF (២៥:០០ - ៤៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"តើ IF រស់នៅកន្លែងណាខ្លះក្នុង Power Apps?
១. OnSelect លើប៊ូតុង៖ សម្រេចចិត្តថាតើត្រូវ Save ឬ Alert។
២. Visible លើផ្ទាំងរូបភាព៖ បង្ហាញ ឬលាក់ស្លាកអាសន្ន។
៣. DisplayMode លើប្រអប់បញ្ចូល៖ ចាក់សោរ Disabled ឬអនុញ្ញាត Edit។
៤. Color លើអក្សរ៖ ប្តូរពណ៌ក្រហម ឬបៃតង។
រូបមន្ត ៣ ផ្នែកដូចគ្នា ប្រើបានគ្រប់ទីកន្លែង!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge gold-badge">ទម្រង់នៃការអនុវត្ត</span>
          <h2 class="slide-title">កន្លែងដែល <code>If()</code> រស់នៅក្នុង Microsoft Power Apps</h2>
          <p class="slide-lead">ទម្រង់សម្រេចចិត្តដូចគ្នានេះ ដំណើរការលើសកម្មភាពប៊ូតុង, ការបង្ហាញរូបរាងលើអេក្រង់, និងសិទ្ធិគ្រប់គ្រងប្រអប់ទិន្នន័យ។</p>
        </div>

        <div class="pantry-grid">
          <div class="pantry-jar border-blue">
            <div class="jar-icon">&#128433;</div>
            <h4>១. សកម្មភាព (OnSelect)</h4>
            <span class="jar-substance">លំហូរការងារប៊ូតុង</span>
            <p>សម្រេចចិត្តថាតើត្រូវដំណើរការពាក្យបញ្ជាណាមួយនៅពេលអ្នកប្រើចុចលើប៊ូតុង។</p>
            <div class="jar-example"><code>If(Valid, Save(), Alert())</code></div>
          </div>

          <div class="pantry-jar border-num">
            <div class="jar-icon">&#128065;</div>
            <h4>២. ការបង្ហាញ (Visible)</h4>
            <span class="jar-substance">រូបរាង UI ថាមវន្ត</span>
            <p>បង្ហាញផ្ទាំងប្រកាសអាសន្ន លុះត្រាតែលក្ខខណ្ឌគ្រោះថ្នាក់គឺ True។</p>
            <div class="jar-example"><code>If(Hazard, true, false)</code></div>
          </div>

          <div class="pantry-jar border-date">
            <div class="jar-icon">&#128274;</div>
            <h4>៣. សិទ្ធិប្រើប្រាស់ (DisplayMode)</h4>
            <span class="jar-substance">ការចាក់សោរប្រអប់</span>
            <p>ចាក់សោរប៊ូតុង Submit រហូតដល់រាល់ប្រអប់ចាំបាច់ទាំងអស់ត្រូវបានបំពេញ។</p>
            <div class="jar-example"><code>If(Blank, Disabled, Edit)</code></div>
          </div>

          <div class="pantry-jar border-bool">
            <div class="jar-icon">&#127912;</div>
            <h4>៤. រចនាប័ទ្មពណ៌ (Color)</h4>
            <span class="jar-substance">ស្ថានភាពដែលមើលឃើញ</span>
            <p>ប្តូរពណ៌អក្សរទៅជា ក្រហម បើហួសកាលកំណត់ ឬ បៃតង បើទាន់ពេលវេលា។</p>
            <div class="jar-example"><code>If(Late, Color.Red, Green)</code></div>
          </div>
        </div>
      `
    },
    'slide-11': {
      title: 'ហេតុ & ផល៖ ផ្លូវបំបែកពីរ',
      segment: 'ផ្នែកទី ៣៖ សមាសធាតុសំខាន់ទាំង ៣ នៃ IF (២៥:០០ - ៤៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"សូមតាមដានលំហូរទិន្នន័យជាក់ស្តែងនៅលើដ្យាក្រាម៖
ទិន្នន័យចូលមក៖ 5.5 ម៉ោង។
លក្ខខណ្ឌសួរថា៖ 5.5 > 4.0?
លទ្ធផលវាយតម្លៃឃើញថា៖ TRUE!
កុងតាក់ IF បើកផ្លូវ True ដំណើរការសកម្មភាព A (ប្រកាសអាសន្នបន្ទាន់)។
ផ្លូវ False ត្រូវបានរំលងចោលទាំងស្រុង!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge blue-badge">លំហូរតក្កវិជ្ជា</span>
          <h2 class="slide-title">ហេតុ &amp; ផលជាក់ស្តែង៖ ផ្លូវបំបែកពីរ</h2>
          <p class="slide-lead">តាមដានទិន្នន័យជាក់ស្តែងឆ្លងកាត់ការវាយតម្លៃលក្ខខណ្ឌ ចូលទៅក្នុងផ្លូវដំណើរការដាច់ដោយឡែកពីគ្នា។</p>
        </div>

        <div class="branching-diagram-container">
          <div class="diagram-root">
            <span class="root-badge">ទិន្នន័យឧបករណ៍ចាប់សញ្ញាជាក់ស្តែង</span>
            <code>Downtime = 5.5 Hours</code>
          </div>

          <div class="diagram-stem">&#10142;</div>

          <div class="diagram-decision-diamond">
            <span class="diamond-tag">ការត្រួតពិនិត្យលក្ខខណ្ឌ</span>
            <strong>Value(Hours) &gt; 4.0?</strong>
            <div class="diamond-result">លទ្ធផល៖ TRUE (ពិត)</div>
          </div>

          <div class="diagram-fork-branches">
            <div class="fork-path path-active">
              <span class="fork-tag tag-true">&#10004; ផ្លូវ TRUE ត្រូវបានជ្រើសរើស</span>
              <h4>សកម្មភាព A៖ ប្រកាសអាសន្នបន្ទាន់កម្រិតខ្ពស់</h4>
              <p>ផ្ញើដំណឹងបន្ទាន់ទៅកាន់ទូរស័ព្ទនាយករោងចក្រ; បង្ហាញផ្ទាំងភ្លើងក្រហមលើអេក្រង់។</p>
            </div>

            <div class="fork-path path-dormant">
              <span class="fork-tag tag-false">&#10060; ផ្លូវ FALSE (ត្រូវបានរំលងចោល)</span>
              <h4>សកម្មភាព B៖ ការចាត់ចែងធម្មតា</h4>
              <p>កត់ត្រាក្នុង SharePoint ធម្មតា; ចាត់ចែងទៅកាន់ជាងវេនបន្ទាប់ដែលទំនេរ។</p>
            </div>
          </div>
        </div>
      `
    },
    'slide-12': {
      title: 'ការបង្ហាញផ្ទាល់៖ IF Decision Workbench',
      segment: 'ផ្នែកទី ៤៖ ការបង្ហាញផ្ទាល់របស់អ្នកបណ្តុះបណ្តាល (៤៥:០០ - ៦០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"ឥឡូវនេះសូមក្រឡេកមើលតុពិសោធន៍ផ្ទាល់!
ពេលខ្ញុំអូសស្លាយឌ័រទៅ ២ ម៉ោង លក្ខខណ្ឌ 2 > 4 គឺ False ដូច្នេះប្រអប់ធម្មតាពណ៌ខៀវភ្លឺឡើង។
ពេលខ្ញុំអូសលើសពី ៤ ម៉ោង លក្ខខណ្ឌប្រែជា True ភ្លាមៗ ហើយប្រអប់អាសន្នពណ៌ក្រហមភ្លឺឡើង!
ពេលប្រអប់ឈ្មោះទទេ ប៊ូតុងត្រូវចាក់សោរ; ពេលវាយឈ្មោះ ប៊ូតុងដោះសោរភ្លាម!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge blue-badge">ការក្លែងធ្វើអន្តរកម្ម</span>
          <h2 class="slide-title">ការបង្ហាញផ្ទាល់៖ តុពិសោធន៍ការសម្រេចចិត្ត IF</h2>
          <p class="slide-lead">កែតម្រូវឧបករណ៍បញ្ជាជាក់ស្តែងនៅខាងឆ្វេង ដើម្បីមើលរបៀបដែល <code>If()</code> ប្តូររវាងសកម្មភាព A និងសកម្មភាព B ដោយស្វ័យប្រវត្តិ។</p>
        </div>

        <div class="workbench-grid">
          <div class="workbench-inputs">
            <h4>ទិន្នន័យបញ្ចូលនៃសំបុត្រថែទាំ៖</h4>
            <div class="input-control-row">
              <label>ម៉ោងឈប់ដំណើរការ៖ <strong id="wb-hours-val">2.0</strong> ម៉ោង</label>
              <input type="range" id="wb-hours-slider" min="0.5" max="10.0" step="0.5" value="2.0" class="fluent-slider">
            </div>
            <div class="input-control-row">
              <label>ឈ្មោះប្រតិបត្តិករ៖</label>
              <input type="text" id="wb-op-input" value="" class="fluent-text-input" placeholder="វាយឈ្មោះដើម្បីដោះសោរប៊ូតុង...">
            </div>
            <div class="input-control-row">
              <label>តើមានគ្រោះថ្នាក់ដែរឬទេ?</label>
              <button type="button" id="wb-hazard-btn" class="workbench-toggle-btn">
                <span class="toggle-indicator off"></span> គ្រោះថ្នាក់៖ ទេ (false)
              </button>
            </div>
          </div>

          <div class="workbench-evaluations">
            <h4>សកម្មភាពដែលកំពុងដំណើរការជាក់ស្តែង៖</h4>
            <div class="decision-result-card" id="card-alert-branch">
              <span class="branch-label" id="branch-indicator">ផ្លូវ FALSE កំពុងដំណើរការ៖ ចាត់ចែងធម្មតា</span>
              <h4 id="branch-title" style="color: #38bdf8;">&#128227; បញ្ជូនទៅកាន់ប្រធានក្រុមជាងមេកានិក</h4>
              <p id="branch-desc">ម៉ោងឈប់ដំណើរការក្រោម 4.0 ម៉ោង។ កត់ត្រាទុកជាអាទិភាពធម្មតា។</p>
            </div>

            <div class="submit-state-demo">
              <label>សិទ្ធិប៊ូតុង DisplayMode៖ <code>If(IsBlank(Name), Disabled, Edit)</code></label>
              <button id="demo-submit-btn" class="nav-btn" disabled style="width: 100%; justify-content: center; opacity: 0.4;">
                &#128274; បញ្ជូនសំបុត្រ (ចាក់សោរ៖ ត្រូវការបញ្ចូលឈ្មោះ)
              </button>
            </div>
          </div>
        </div>
      `
    },
    'slide-13': {
      title: 'ចំណុចផ្ទៀងផ្ទាត់ពាក់កណ្តាលម៉ោង',
      segment: 'ផ្នែកទី ៤៖ ការបង្ហាញផ្ទាល់របស់អ្នកបណ្តុះបណ្តាល (៤៥:០០ - ៦០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"យើងបានមកដល់ពាក់កណ្តាលវគ្គ ៤៥ នាទីហើយ!
សូមសម្រាក ៦០ វិនាទី ពិសារទឹក និងធ្វើសញ្ញាមេដៃ៖
មេដៃឡើងលើ៖ បើយល់ច្បាស់ពី ៣ ផ្នែកនៃ IF។
មេដៃផ្អៀង៖ បើនៅស្រពិចស្រពិលលើសញ្ញាក្បៀស។
ចងចាំច្បាប់មាស៖ ក្បៀសទីមួយ = THEN; ក្បៀសទីពីរ = ELSE!"`,
      content: `
        <div class="checkpoint-card">
          <div class="checkpoint-icon">&#9749;</div>
          <h2 class="checkpoint-title">ចំណុចផ្ទៀងផ្ទាត់ពាក់កណ្តាលម៉ោង (៤៥:០០ នាទីកន្លងផុត)</h2>
          <p class="checkpoint-subtitle">ដកដង្ហើមវែងៗ ពិសារទឹក និងផ្ទៀងផ្ទាត់គ្រឹះការយល់ដឹងរបស់អ្នក មុនពេលយើងចាប់ផ្តើមសរសេរកូដជាក់ស្តែង។</p>

          <div class="checkpoint-grid">
            <div class="check-item">
              <div class="check-icon">&#128077;</div>
              <h4>មេដៃឡើងលើ៖ ច្បាស់លាស់</h4>
              <p>ខ្ញុំយល់ផ្នែកទាំង ៣ នៃ <code>If()</code>៖ លក្ខខណ្ឌ, សកម្មភាពបើពិត, និងសកម្មភាពបើមិនពិត ដោយបំបែកដោយក្បៀស។</p>
            </div>
            <div class="check-item">
              <div class="check-icon">&#9995;</div>
              <h4>មេដៃផ្អៀង៖ មិនទាន់ប្រាកដ</h4>
              <p>ខ្ញុំយល់គោលគំនិតផ្លូវបំបែក ប៉ុន្តែខ្ញុំចង់អនុវត្តសរសេរកូដជាក់ស្តែងក្នុង Power Fx បន្ថែមទៀត។</p>
            </div>
            <div class="check-item">
              <div class="check-icon">&#128161;</div>
              <h4>ច្បាប់មាសដែលត្រូវចងចាំ</h4>
              <p><em>"ក្បៀសទីមួយមានន័យថា THEN (នោះ); ក្បៀសទីពីរមានន័យថា ELSE (បើមិនដូច្នោះទេ)។"</em></p>
            </div>
          </div>
        </div>
      `
    },
    'slide-14': {
      title: 'ករណីសិក្សា៖ វិភាគក្បួនទម្រង់ Apex',
      segment: 'ផ្នែកទី ៥៖ ការអនុវត្តក្រោមការណែនាំ (៦០:០០ - ៧៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"សូមពិនិត្យមើលក្បួនអាជីវកម្មទាំង ៣ នៃទម្រង់ Apex Plastics៖
ក្បួន ១៖ ពណ៌ស្លាកអាទិភាព (ក្រហម បើ > 4, ខៀវ បើ <= 4)។
ក្បួន ២៖ បញ្ជូនអាសន្ន (SMS បើ Hazard, Log បើធម្មតា)។
ក្បួន ៣៖ ចាក់សោរប៊ូតុង (Disabled បើឈ្មោះទទេ, Edit បើមានឈ្មោះ)។
រាល់ក្បួនទាំងអស់សុទ្ធតែមានទម្រង់ IF ដូចៗគ្នា!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge teal-badge">ស្ថាបត្យកម្ម DX ក្នុងរោងចក្រ</span>
          <h2 class="slide-title">Apex Plastics៖ វិភាគក្បួនបញ្ជូនទិន្នន័យនៃទម្រង់</h2>
          <p class="slide-lead">បម្លែងក្បួនប្រតិបត្តិការក្នុងរោងចក្រពិតប្រាកដ ទៅជាការសម្រេចចិត្តបំបែកផ្លូវពីរយ៉ាងច្បាស់លាស់។</p>
        </div>

        <div class="form-blueprint-grid">
          <div class="form-preview-card">
            <div class="form-title-bar">ប្លង់តក្កវិជ្ជានៃទម្រង់ជំនួយការ Apex Plastics</div>
            <div class="form-field-row">
              <label>ក្បួនទី ១៖ ពណ៌ស្លាកអាទិភាព</label>
              <div class="mock-input"><code>If(Downtime &gt; 4, Color.Red, Color.Blue)</code></div>
            </div>
            <div class="form-field-row">
              <label>ក្បួនទី ២៖ ការបញ្ជូនដំណឹងអាសន្ន</label>
              <div class="mock-input"><code>If(chkHazard.Value, DispatchEmergency(), LogTicket())</code></div>
            </div>
            <div class="form-field-row">
              <label>ក្បួនទី ៣៖ ការចាក់សោរប៊ូតុង Submit</label>
              <div class="mock-input"><code>If(IsBlank(txtName.Text), Disabled, Edit)</code></div>
            </div>
            <div class="form-field-row">
              <label>ក្បួនទី ៤៖ សារបញ្ជាក់ការងារ</label>
              <div class="mock-input"><code>If(chkHazard.Value, "SIREN SENT!", "Ticket Logged")</code></div>
            </div>
          </div>

          <div class="schema-mapping-card">
            <h4 style="margin-top:0; color:#38bdf8;">ការបែងចែកប្រភេទនៃការបំបែកផ្លូវ៖</h4>
            <div class="mapping-row">
              <span class="field-name">ពណ៌អាទិភាព</span>
              <span class="type-pill pill-text">លក្ខណៈរូបភាព</span>
              <span class="ui-ctrl">Red (True) vs Blue (False)</span>
            </div>
            <div class="mapping-row">
              <span class="field-name">ស៊ីរ៉ែនអាសន្ន</span>
              <span class="type-pill pill-bool">សកម្មភាព OnSelect</span>
              <span class="ui-ctrl">ផ្ញើសារ SMS vs កត់ត្រាធម្មតា</span>
            </div>
            <div class="mapping-row">
              <span class="field-name">ចាក់សោរប៊ូតុង</span>
              <span class="type-pill pill-date">ស្ថានភាពគ្រប់គ្រង</span>
              <span class="ui-ctrl">Disabled vs Edit (ចុចបាន)</span>
            </div>
            <div class="mapping-row">
              <span class="field-name">ដំណឹងអ្នកប្រើ</span>
              <span class="type-pill pill-num">អត្ថបទ Banner</span>
              <span class="ui-ctrl">អត្ថបទអាសន្ន vs អត្ថបទធម្មតា</span>
            </div>
          </div>
        </div>
      `
    },
    'slide-15': {
      title: 'កូដ Power Fx If() ជាក់ស្តែង',
      segment: 'ផ្នែកទី ៥៖ ការអនុវត្តក្រោមការណែនាំ (៦០:០០ - ៧៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"តើយើងសរសេរកូដ If() ក្នុង Power Apps យ៉ាងដូចម្តេច?
ឧទាហរណ៍ ១៖ សកម្មភាពចុចប៊ូតុង OnSelect ដោយប្រើ Notify() ពីរផ្សេងគ្នា។
ឧទាហរណ៍ ២៖ ប្តូរអត្ថបទ ឬពណ៌តាមលក្ខខណ្ឌ។
ឧទាហរណ៍ ៣៖ គ្រប់គ្រង DisplayMode ដោយចាក់សោរប៊ូតុងពេលឈ្មោះទទេ។"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge purple-badge">ការតភ្ជាប់ Power Fx</span>
          <h2 class="slide-title">របៀបដែល Power Fx បង្កើតការសម្រេចចិត្ត</h2>
          <p class="slide-lead">តភ្ជាប់តម្រូវការអាជីវកម្មទៅកាន់ការអនុវត្តកូដ <code>If()</code> ត្រឹមត្រូវតាមក្បួនខ្នាត។</p>
        </div>

        <div class="grid-2-col">
          <div class="code-card">
            <div class="code-header">សកម្មភាពបំបែកផ្លូវ (OnSelect)</div>
            <pre class="powerfx-code">
<span class="comment">// ១. សម្រេចចិត្តថាតើត្រូវដំណើរការសកម្មភាពណាពេលចុច</span>
<span class="keyword">If</span>(
    <span class="func">Value</span>(txtDowntime.<span class="prop">Text</span>) &gt; 4.0,
    <span class="func">Notify</span>("CRITICAL ESCALATION DISPATCHED!", NotificationType.<span class="prop">Error</span>),
    <span class="func">Notify</span>("Routine ticket logged.", NotificationType.<span class="prop">Success</span>)
);
            </pre>
          </div>

          <div class="code-card">
            <div class="code-header">តម្លៃលក្ខណៈសម្បត្តិថាមវន្ត (UI)</div>
            <pre class="powerfx-code">
<span class="comment">// ២. អត្ថបទថាមវន្តផ្អែកលើលក្ខខណ្ឌ</span>
<span class="keyword">If</span>(chkHazard.<span class="prop">Value</span> = <span class="keyword">true</span>, "DANGER: HALT PRESS", "OPERATING NORMALLY")

<span class="comment">// ៣. បើក/បិទប៊ូតុង (DisplayMode)</span>
<span class="keyword">If</span>(
    <span class="func">IsBlank</span>(txtOperator.<span class="prop">Text</span>),
    DisplayMode.<span class="prop">Disabled</span>,
    DisplayMode.<span class="prop">Edit</span>
)
            </pre>
          </div>
        </div>
      `
    },
    'slide-16': {
      title: 'រចនាសម្ព័ន្ធ៖ សញ្ញាក្បៀស & អាគុយម៉ង់ (Syntax Structure)',
      segment: 'ផ្នែកទី ៥៖ ការអនុវត្តក្រោមការណែនាំ (៦០:០០ - ៧៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"តើមានអ្វីកើតឡើងប្រសិនបើអ្នកភ្លេចដាក់ក្បៀសទីពីរ (ផ្លូវ False)?
ក្នុង Power Apps បើអ្នកមិនដាក់ផ្លូវ False កម្មវិធីនឹងផ្តល់តម្លៃទទេ (Blank) ពេលលក្ខខណ្ឌមិនពិត។
សម្រាប់ UI ពណ៌ ឬអត្ថបទ ត្រូវតែដាក់ផ្លូវទាំងពីរជានិច្ច!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge blue-badge">យន្តការនៃកូដ</span>
          <h2 class="slide-title">ច្បាប់សញ្ញាក្បៀស៖ របៀបដែល Power Apps អានអាគុយម៉ង់</h2>
          <p class="slide-lead">ស្វែងយល់ច្បាស់ពីតួនាទីនៃសញ្ញាក្បៀស និងអ្វីដែលកើតឡើងនៅពេលផ្លូវ False ត្រូវបានលុបចោល។</p>
        </div>

        <div class="conversion-bridge-grid">
          <div class="bridge-card bridge-to-num">
            <div class="bridge-direction">
              <span class="type-pill pill-bool">IF ផ្លូវពីរពេញលេញ</span>
              <span class="bridge-arrow">&#10142;</span>
              <span class="type-pill pill-text">ផ្លូវបំបែកពេញលេញ</span>
            </div>
            <h3>ធានាសកម្មភាពទាំងពីរ</h3>
            <p>ផ្តល់សកម្មភាពជាក់លាក់សម្រាប់លទ្ធផលទាំងពីរ។ គ្មានអ្វីត្រូវទុកឱ្យស្រពិចស្រពិលឡើយ។</p>
            <div class="code-box">
              <code>If(Condition , ActionTrue , ActionFalse)</code>
            </div>
            <div class="bridge-note">&#10004; ស័ក្តិសមបំផុតសម្រាប់រចនាប័ទ្ម UI, DisplayMode, និងការជូនដំណឹងពីរផ្លូវ។</div>
          </div>

          <div class="bridge-card bridge-to-text">
            <div class="bridge-direction">
              <span class="type-pill pill-num">IF ផ្លូវទោល</span>
              <span class="bridge-arrow">&#10142;</span>
              <span class="type-pill pill-date">ផ្លូវបម្រុងមិនដាក់</span>
            </div>
            <h3>សកម្មភាពតែលើផ្លូវ True ប៉ុណ្ណោះ</h3>
            <p>បើលទ្ធផលជា False វាមិនធ្វើអ្វីទាំងអស់ ហើយផ្តល់តម្លៃទទេ (Blank)។</p>
            <div class="code-box">
              <code>If(Condition , ActionTrue)</code>
            </div>
            <div class="bridge-note">&#9888; សុវត្ថិភាពសម្រាប់ការផ្ទៀងផ្ទាត់រហ័ស; ជៀសវាងពេលត្រូវការតម្លៃដើមប្រាកដប្រជា។</div>
          </div>
        </div>
      `
    },
    'slide-17': {
      title: 'សេចក្តីសង្ខេបបញ្ហាប្រឈម Extruder #4',
      segment: 'ផ្នែកទី ៥៖ ការអនុវត្តក្រោមការណែនាំ (៦០:០០ - ៧៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"នេះជាស្ថានភាពជាក់ស្តែងទាំង ៦ នៃម៉ាស៊ីន Extruder #4៖
កម្ដៅ, ឈ្មោះទទេ, កម្រិតថវិកា, ចាក់សោរសុវត្ថិភាព, ស្តុក, និងកាលបរិច្ឆេទ។
នៅស្លាយបន្ទាប់ សិស្សនឹងចុចជ្រើសរើសផ្លូវ A ឬ B ដោយផ្ទាល់ដៃ!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge teal-badge">សេចក្តីសង្ខេបបញ្ហាប្រឈម</span>
          <h2 class="slide-title">ការអនុវត្តក្រោមការណែនាំ៖ ប្រព័ន្ធចាត់ចែងខ្សែច្រវាក់ Extruder #4</h2>
          <p class="slide-lead">វិភាគស្ថានភាពប្រតិបត្តិការទាំង ៦ ខាងក្រោម មុនពេលបញ្ជូនពួកវាឆ្លងកាត់ផ្លូវបំបែក IF។</p>
        </div>

        <div class="parts-brief-grid">
          <div class="brief-item">
            <span class="brief-num">1</span>
            <div>
              <strong>កុងតាក់ម៉ាស៊ីនត្រជាក់ពេលក្តៅខ្លាំង</strong>
              <p>ក្បួន៖ <code>If(Temp &gt; 90, TurnOnCooler(), CoolerOff())</code> &bull; កម្ដៅបច្ចុប្បន្ន៖ 94°C។</p>
            </div>
          </div>
          <div class="brief-item">
            <span class="brief-num">2</span>
            <div>
              <strong>ផ្ទៀងផ្ទាត់ឈ្មោះដែលខកខានមិនបានបំពេញ</strong>
              <p>ក្បួន៖ <code>If(IsBlank(Name), ShowError(), SaveForm())</code> &bull; តម្លៃបច្ចុប្បន្ន៖ "Dara"។</p>
            </div>
          </div>
          <div class="brief-item">
            <span class="brief-num">3</span>
            <div>
              <strong>កម្រិតថវិកាដែលត្រូវសុំការអនុម័ត</strong>
              <p>ក្បួន៖ <code>If(Cost &gt; 500, RequireVP(), AutoApprove())</code> &bull; តម្លៃបច្ចុប្បន្ន៖ $350។</p>
            </div>
          </div>
          <div class="brief-item">
            <span class="brief-num">4</span>
            <div>
              <strong>ប្រព័ន្ធចាក់សោរសុវត្ថិភាពម៉ាស៊ីន</strong>
              <p>ក្បួន៖ <code>If(Safe = true, DisplayMode.Edit, Disabled)</code> &bull; សុវត្ថិភាពបច្ចុប្បន្ន៖ false។</p>
            </div>
          </div>
          <div class="brief-item">
            <span class="brief-num">5</span>
            <div>
              <strong>ការបញ្ជាទិញគ្រឿងបន្លាស់ស្តុកឡើងវិញ</strong>
              <p>ក្បួន៖ <code>If(Stock &lt; 5, ReorderSupplier(), UseStock())</code> &bull; ស្តុកបច្ចុប្បន្ន៖ 2។</p>
            </div>
          </div>
          <div class="brief-item">
            <span class="brief-num">6</span>
            <div>
              <strong>ស្លាកសម្គាល់ការងារប្រចាំថ្ងៃ</strong>
              <p>ក្បួន៖ <code>If(Date = Today(), "NEW", "CARRYOVER")</code> &bull; កាលបរិច្ឆេទបច្ចុប្បន្ន៖ 2026-10-15។</p>
            </div>
          </div>
        </div>
      `
    },
    'slide-18': {
      title: 'កម្មវិធីក្លែងធ្វើការសម្រេចចិត្ត ៦ ស្ថានភាព',
      segment: 'ផ្នែកទី ៥៖ ការអនុវត្តក្រោមការណែនាំ (៦០:០០ - ៧៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"សូមឱ្យសិស្សចូលរួមចុចលើផ្ទាំងក្លែងធ្វើនេះ!
ឧទាហរណ៍ ស្ថានភាព ១៖ 94 > 90 គឺ True ដូច្នេះផ្លូវ A បើកម៉ាស៊ីនត្រជាក់ដំណើរការ!
ស្ថានភាព ៣៖ 350 > 500 គឺ False ដូច្នេះផ្លូវ B អនុម័តស្វ័យប្រវត្តដំណើរការ!
ព្យាយាមឆ្លើយឱ្យបានពិន្ទុពេញ ៦ លើ ៦!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge green-badge">ការអនុវត្តជាក់ស្តែង</span>
          <h2 class="slide-title">កម្មវិធីក្លែងធ្វើការសម្រេចចិត្ត IF ៦ ស្ថានភាព</h2>
          <p class="slide-lead">តាមដានស្ថានភាពនីមួយៗខាងក្រោម។ ជ្រើសរើសផ្លូវដែលត្រូវដំណើរការផ្អែកលើការពិតជាក់ស្តែង។</p>
        </div>

        <div class="evaluator-grid-container" id="if-simulator-widget">
          <div class="evaluator-card" data-scenario="s1" data-correct="path-a">
            <div class="cond-title">1. កម្ដៅ៖ <code>94 &gt; 90</code></div>
            <div class="cond-btn-pair">
              <button class="cond-btn" data-choice="path-a">ផ្លូវ A៖ បើកម៉ាស៊ីនត្រជាក់</button>
              <button class="cond-btn" data-choice="path-b">ផ្លូវ B៖ បិទម៉ាស៊ីនត្រជាក់</button>
            </div>
            <div class="cond-status-text">សូមជ្រើសរើសផ្លូវ A ឬ ផ្លូវ B</div>
          </div>

          <div class="evaluator-card" data-scenario="s2" data-correct="path-b">
            <div class="cond-title">2. ឈ្មោះទទេ៖ <code>IsBlank("Dara")</code></div>
            <div class="cond-btn-pair">
              <button class="cond-btn" data-choice="path-a">ផ្លូវ A៖ បង្ហាញកំហុស</button>
              <button class="cond-btn" data-choice="path-b">ផ្លូវ B៖ រក្សាទុកទម្រង់</button>
            </div>
            <div class="cond-status-text">សូមជ្រើសរើសផ្លូវ A ឬ ផ្លូវ B</div>
          </div>

          <div class="evaluator-card" data-scenario="s3" data-correct="path-b">
            <div class="cond-title">3. តម្លៃ៖ <code>350 &gt; 500</code></div>
            <div class="cond-btn-pair">
              <button class="cond-btn" data-choice="path-a">ផ្លូវ A៖ ផ្ញើទៅនាយក</button>
              <button class="cond-btn" data-choice="path-b">ផ្លូវ B៖ អនុម័តស្វ័យប្រវត្តិ</button>
            </div>
            <div class="cond-status-text">សូមជ្រើសរើសផ្លូវ A ឬ ផ្លូវ B</div>
          </div>

          <div class="evaluator-card" data-scenario="s4" data-correct="path-b">
            <div class="cond-title">4. ចាក់សោរសុវត្ថិភាព៖ <code>false = true</code></div>
            <div class="cond-btn-pair">
              <button class="cond-btn" data-choice="path-a">ផ្លូវ A៖ ដោះសោរប៊ូតុង</button>
              <button class="cond-btn" data-choice="path-b">ផ្លូវ B៖ ចាក់សោរប៊ូតុង</button>
            </div>
            <div class="cond-status-text">សូមជ្រើសរើសផ្លូវ A ឬ ផ្លូវ B</div>
          </div>

          <div class="evaluator-card" data-scenario="s5" data-correct="path-a">
            <div class="cond-title">5. ស្តុក៖ <code>2 &lt; 5</code></div>
            <div class="cond-btn-pair">
              <button class="cond-btn" data-choice="path-a">ផ្លូវ A៖ បញ្ជាទិញថែម</button>
              <button class="cond-btn" data-choice="path-b">ផ្លូវ B៖ ប្រើប្រាស់ស្តុក</button>
            </div>
            <div class="cond-status-text">សូមជ្រើសរើសផ្លូវ A ឬ ផ្លូវ B</div>
          </div>

          <div class="evaluator-card" data-scenario="s6" data-correct="path-b">
            <div class="cond-title">6. ពិនិត្យកាលបរិច្ឆេទ៖ <code>"Oct-15" = "Today"</code></div>
            <div class="cond-btn-pair">
              <button class="cond-btn" data-choice="path-a">ផ្លូវ A៖ "NEW"</button>
              <button class="cond-btn" data-choice="path-b">ផ្លូវ B៖ "CARRYOVER"</button>
            </div>
            <div class="cond-status-text">សូមជ្រើសរើសផ្លូវ A ឬ ផ្លូវ B</div>
          </div>
        </div>

        <div class="evaluator-footer-bar">
          <span>ពិន្ទុ៖ <strong id="sim-score">0</strong> / 6 ត្រឹមត្រូវ</span>
          <span id="sim-feedback">សូមជ្រើសរើសផ្លូវដែលត្រូវដំណើរការសម្រាប់ស្ថានភាពទាំង ៦ ខាងលើ។</span>
        </div>
      `
    },
    'slide-19': {
      title: 'ការយល់ច្រឡំ ៤ យ៉ាងរបស់អ្នកទើបចាប់ផ្តើម',
      segment: 'ផ្នែកទី ៦៖ ការវាយតម្លៃ & ស្ពានចម្លង (៧៥:០០ - ៩០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"សូមពិនិត្យមើលការយល់ច្រឡំ ៤ យ៉ាងនេះ៖
១. កម្មវិធីមិនដែលដំណើរការផ្លូវទាំងពីរក្នុងពេលតែមួយឡើយ!
២. IF មិនមែនជាអ្នកសួរទេ លក្ខខណ្ឌទេដែលជាអ្នកសួរ!
៣. សញ្ញាក្បៀសទីពីរសំខាន់ណាស់សម្រាប់ UI!
៤. Power Apps IF គឺដូចគ្នាទៅនឹង Excel IF បេះបិទ!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge red-badge">កែតម្រូវគំរូគំនិត</span>
          <h2 class="slide-title">ការយល់ច្រឡំទូទៅ ៤ យ៉ាងរបស់អ្នកទើបចាប់ផ្តើម &amp; ការកែតម្រូវ</h2>
          <p class="slide-lead">កែតម្រូវគំរូគំនិតខុសឆ្គងដែលអាចបង្កគ្រោះថ្នាក់ មុនពេលវាក្លាយទៅជាទម្លាប់មិនល្អ។</p>
        </div>

        <div class="grid-2-col">
          <div class="misconception-card">
            <div class="misc-bad">&#10060; ការយល់ច្រឡំទី ១</div>
            <h4>"កម្មវិធីដំណើរការផ្លូវទាំងពីរដើម្បីតេស្តមើល។"</h4>
            <p class="misc-fix"><strong>ការកែតម្រូវរបស់អ្នកបណ្តុះបណ្តាល៖</strong> ផ្លូវរបស់ <code>If()</code> គឺដាច់ដោយឡែកពីគ្នា ១០០%។ កម្មវិធីវាយតម្លៃលក្ខខណ្ឌម្តង ជ្រើសរើសផ្លូវតែមួយគត់ ហើយរំលងផ្លូវមួយទៀតចោលទាំងស្រុង។</p>
          </div>

          <div class="misconception-card">
            <div class="misc-bad">&#10060; ការយល់ច្រឡំទី ២</div>
            <h4>"IF គឺជាអ្នកចោទសួរសំណួរ។"</h4>
            <p class="misc-fix"><strong>ការកែតម្រូវរបស់អ្នកបណ្តុះបណ្តាល៖</strong> <code>If()</code> មិនមែនជាអ្នកសួរទេ។ <strong>លក្ខខណ្ឌ</strong> (\`> 4\`, \`= "Done"\`) ទេដែលជាអ្នកសួរ។ <code>If()</code> គ្រាន់តែជាកុងតាក់ប្តូរផ្លូវដែលស្តាប់ចម្លើយ True/False ប៉ុណ្ណោះ។</p>
          </div>

          <div class="misconception-card">
            <div class="misc-bad">&#10060; ការយល់ច្រឡំទី ៣</div>
            <h4>"សញ្ញាក្បៀសទីពីរមិនបាច់ដាក់ក៏បានពេលកំណត់ពណ៌ UI។"</h4>
            <p class="misc-fix"><strong>ការកែតម្រូវរបស់អ្នកបណ្តុះបណ្តាល៖</strong> ប្រសិនបើអ្នកលុបផ្លូវ False ចោលក្នុងរូបមន្តពណ៌ អត្ថបទរបស់អ្នកនឹងប្រែជាទទេស្អាត ឬបាត់រូបរាងពេល False! ត្រូវតែដាក់ផ្លូវទាំងពីរជានិច្ចសម្រាប់ UI។</p>
          </div>

          <div class="misconception-card">
            <div class="misc-bad">&#10060; ការយល់ច្រឡំទី ៤</div>
            <h4>"Power Apps IF ខុសគ្នាស្រឡះពី Excel IF។"</h4>
            <p class="misc-fix"><strong>ការកែតម្រូវរបស់អ្នកបណ្តុះបណ្តាល៖</strong> Power Fx មានប្រភពចេញមកពី Microsoft Excel។ រូបមន្ត <code>If(LogicalTest, ValueIfTrue, ValueIfFalse)</code> ដំណើរការដូចគ្នាបេះបិទក្នុងកម្មវិធីទាំងពីរ។</p>
          </div>
        </div>
      `
    },
    'slide-20': {
      title: 'កម្រងសំណួរវាយតម្លៃចំណេះដឹង (៥ សំណួរ)',
      segment: 'ផ្នែកទី ៦៖ ការវាយតម្លៃ & ស្ពានចម្លង (៧៥:០០ - ៩០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"ដល់ពេលធ្វើតេស្តចំណេះដឹង ៥ សំណួរហើយ!
សូមអានសំណួរនីមួយៗឱ្យបានច្បាស់លាស់ ជ្រើសរើសចម្លើយត្រឹមត្រូវ រួចពិនិត្យមើលការពន្យល់បច្ចេកទេសជាមួយគ្នា។"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge blue-badge">ផ្ទៀងផ្ទាត់ចំណេះដឹង</span>
          <h2 class="slide-title">កម្រងសំណួរវាយតម្លៃចំណេះដឹងថ្ងៃទី ៥</h2>
          <p class="slide-lead">ឆ្លើយសំណួរទាំង ៥ ដើម្បីផ្ទៀងផ្ទាត់ការយល់ដឹងរបស់អ្នកលើការបំបែកផ្លូវ IF, អាគុយម៉ង់, និងទិសដៅដំណើរការ។</p>
        </div>

        <div class="quiz-container" id="quiz-widget">
          <div class="quiz-header-bar">
            <span id="quiz-question-counter">សំណួរទី ១ នៃ ៥</span>
            <span id="quiz-score-display">ពិន្ទុ៖ ០ / ៥</span>
          </div>

          <div class="quiz-body" id="quiz-body">
            <!-- Rendered dynamically -->
          </div>

          <div class="quiz-navigation">
            <button class="btn-subtle" id="quiz-prev-btn" disabled>&#8592; សំណួរមុន</button>
            <button class="btn-primary" id="quiz-next-btn">សំណួរបន្ទាប់ &#8594;</button>
          </div>
        </div>
      `
    },
    'slide-21': {
      title: 'បញ្ហាប្រឈមចុងក្រោយ៖ ចាត់ចែងឃ្លាំងស្វ័យប្រវត្តិ',
      segment: 'ផ្នែកទី ៦៖ ការវាយតម្លៃ & ស្ពានចម្លង (៧៥:០០ - ៩០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"នេះជាបញ្ហាប្រឈមចុងក្រោយ Capstone នៃថ្ងៃទី ៥៖
រោងចក្រ Apex Plastics កំពុងរៀបចំប្រព័ន្ធបញ្ជូនទំនិញក្នុងឃ្លាំង។
សិស្សត្រូវសរសេរកូដ IF ទាំង ៨ សម្រាប់៖
ទម្ងន់ប៉ាឡែត, ទំនិញងាយបែក, ទំនិញនាំចេញ, ស្តុកពេញ, ត្រា QC, ឈ្មោះអ្នកបើកបរ, ម៉ោងដឹកជញ្ជូន, និងរបាំងទ្វារសុវត្ថិភាព!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge purple-badge">បញ្ហាប្រឈមបញ្ចប់មេរៀន</span>
          <h2 class="slide-title">បញ្ហាប្រឈមចុងក្រោយ៖ ប្រព័ន្ធចាត់ចែងឃ្លាំងស្វ័យប្រវត្តិ Apex</h2>
          <p class="slide-lead">សរសេររូបមន្តបំបែកផ្លូវ <code>If()</code> ទាំង ៨ ដ៏ពេញលេញ ដើម្បីគ្រប់គ្រងការដឹកជញ្ជូន និងចាត់ចែងទំនិញក្នុងឃ្លាំង។</p>
        </div>

        <div class="challenge-table-wrapper">
          <table class="challenge-table">
            <thead>
              <tr>
                <th>#</th>
                <th>ក្បួនប្រតិបត្តិការអាជីវកម្ម</th>
                <th>លក្ខខណ្ឌ (សំណួរ)</th>
                <th>សកម្មភាពបើពិត (Then)</th>
                <th>សកម្មភាពបើមិនពិត (Else)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>ការចាត់ចែងប៉ាឡែតធ្ងន់</td><td><code>Weight &gt; 500</code></td><td>ប្រើឡានលើកធំ (Heavy Forklift)</td><td>ប្រើរទេះរុញដៃ (Hand-Truck)</td></tr>
              <tr><td>2</td><td>ល្បឿនទំនិញងាយបែក</td><td><code>IsFragile = true</code></td><td>ល្បឿនខ្សែក្រវាត់ = យឺត</td><td>ល្បឿនខ្សែក្រវាត់ = ធម្មតា</td></tr>
              <tr><td>3</td><td>ឯកសារទំនិញនាំចេញ</td><td><code>Dest = "Export"</code></td><td>ព្រីនលិខិតគយ (Customs)</td><td>ព្រីនវិក្កយបត្រក្នុងស្រុក</td></tr>
              <tr><td>4</td><td>ឃ្លាំងផ្ទុកពេញហៀរ</td><td><code>Count &gt;= 100</code></td><td>បង្វែរទៅឃ្លាំងបន្ទាប់បន្សំ B</td><td>ចតក្នុងឃ្លាំងមេ A</td></tr>
              <tr><td>5</td><td>ការបិទស្លាកគុណភាព QC</td><td><code>Passed = true</code></td><td>បិទត្រាពណ៌បៃតងជាប់គុណភាព</td><td>បិទស្លាកក្រហមឃាត់ទុក</td></tr>
              <tr><td>6</td><td>ចាក់សោរពេលគ្មានឈ្មោះអ្នកបើកបរ</td><td><code>IsBlank(Driver)</code></td><td>Button.Disabled</td><td>Button.Edit</td></tr>
              <tr><td>7</td><td>អាទិភាពដឹកជញ្ជូនតាមយន្តហោះ</td><td><code>Hour &lt; 12</code></td><td>ដឹកតាមយន្តហោះពេលព្រឹក</td><td>ដឹកតាមឡានកុងតឺន័រពេលរសៀល</td></tr>
              <tr><td>8</td><td>របាំងទ្វារសុវត្ថិភាពបើកចំហ</td><td><code>GateOpen = true</code></td><td>បន្លឺសំឡេងរោទិ៍អាសន្ន</td><td>បង្ហាញភ្លើងពណ៌បៃតងអនុញ្ញាត</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    'slide-22': {
      title: 'ចម្លើយគំរូ & រូបរិកវាយតម្លៃ',
      segment: 'ផ្នែកទី ៦៖ ការវាយតម្លៃ & ស្ពានចម្លង (៧៥:០០ - ៩០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"ចុចលើប៊ូតុង 'Reveal Solution' ដើម្បីផ្ទៀងផ្ទាត់ចម្លើយគំរូ។
ពិនិត្យមើលកម្រិតសមត្ថភាពទាំង ៤ ក្នុងរូបរិកវាយតម្លៃ៖
កម្រិត ៤ (Mastery)៖ សរសេរត្រូវទាំង ៨ រូបមន្តដោយប្រើក្បៀស និងអាគុយម៉ង់គ្មានកំហុស!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge green-badge">ចម្លើយគំរូ &amp; រូបរិក</span>
          <h2 class="slide-title">ចម្លើយគំរូនៃបញ្ហាប្រឈម &amp; រូបរិកវាយតម្លៃ ៤ កម្រិត</h2>
          <p class="slide-lead">ប្រៀបធៀបរូបមន្តបំបែកផ្លូវរបស់អ្នកជាមួយចម្លើយគំរូស្តង់ដារ និងវាយតម្លៃសមត្ថភាពផ្ទាល់ខ្លួន។</p>
        </div>

        <div class="grid-2-col">
          <div class="solution-card">
            <div class="solution-header">
              <h4>ចម្លើយគំរូបច្ចេកទេស Power Fx</h4>
              <button class="btn-reveal" id="btn-reveal-solution">បង្ហាញចម្លើយ</button>
            </div>
            <div class="solution-body collapsed" id="solution-content">
              <ul class="solution-list">
                <li><strong>1. ឡានលើក៖</strong> <code>If(Value(txtWeight.Text) &gt; 500, "HEAVY_FORKLIFT", "HAND_TRUCK")</code></li>
                <li><strong>2. ល្បឿន៖</strong> <code>If(chkFragile.Value = true, "SLOW", "NORMAL")</code></li>
                <li><strong>3. នាំចេញ៖</strong> <code>If(txtDest.Text = "Export", PrintCustoms(), PrintDomestic())</code></li>
                <li><strong>4. ហៀរស្តុក៖</strong> <code>If(Value(txtBay.Text) &gt;= 100, RouteBayB(), RouteBayA())</code></li>
                <li><strong>5. ត្រា QC៖</strong> <code>If(chkPassed.Value, Color.Green, Color.Red)</code></li>
                <li><strong>6. ចូលឈ្មោះ៖</strong> <code>If(IsBlank(txtDriver.Text), DisplayMode.Disabled, DisplayMode.Edit)</code></li>
                <li><strong>7. ដឹកជញ្ជូន៖</strong> <code>If(Hour(Now()) &lt; 12, "AIR_EXPRESS", "GROUND_TRUCK")</code></li>
                <li><strong>8. របាំងទ្វារ៖</strong> <code>If(chkGate.Value = true, SoundAlarm(), GreenLight())</code></li>
              </ul>
            </div>
          </div>

          <div class="rubric-card">
            <h4>រូបរិកវាយតម្លៃ (៤ កម្រិតសមត្ថភាព)</h4>
            <div class="rubric-levels">
              <div class="level-item level-4">
                <span class="lvl-title">កម្រិតទី ៤៖ ស្ទាត់ជំនាញ (១០០%)</span>
                <p>រូបមន្ត If() ទាំង ៨ ត្រឹមត្រូវតាមក្បួនខ្នាតឥតខ្ចោះ; ប្រើសញ្ញាក្បៀសត្រឹមត្រូវ; ផ្តល់ទាំងផ្លូវ True និង False។</p>
              </div>
              <div class="level-item level-3">
                <span class="lvl-title">កម្រិតទី ៣៖ ស្ទាត់ល្មម (៧៥-៩៩%)</span>
                <p>រូបមន្ត ៦-៧ ត្រឹមត្រូវ; យល់ច្បាស់រវាងលក្ខខណ្ឌ និងផ្លូវសកម្មភាព; ខុសបន្តិចបន្តួចលើឈ្មោះ Property។</p>
              </div>
              <div class="level-item level-2">
                <span class="lvl-title">កម្រិតទី ២៖ កំពុងអភិវឌ្ឍ (៥០-៧៤%)</span>
                <p>ភ្លេចដាក់សញ្ញាក្បៀសទីពីរ (ផ្លូវ Else); ច្រឡំរវាងលក្ខខណ្ឌ និងសកម្មភាព; ត្រូវការការណែនាំបន្ថែមលើ Syntax។</p>
              </div>
              <div class="level-item level-1">
                <span class="lvl-title">កម្រិតទី ១៖ ចាប់ផ្តើមដំបូង (&lt;៥០%)</span>
                <p>មិនទាន់អាចសរសេរទម្រង់ ៣ ផ្នែកបាន; ចាត់ទុក If() ដូចជាបញ្ជាផ្លូវទោលធម្មតាដោយគ្មានផ្លូវបំបែក។</p>
              </div>
            </div>
          </div>
        </div>
      `
    },
    'slide-23': {
      title: 'ផែនទីតភ្ជាប់ ៣ ថ្ងៃ (Connection Map)',
      segment: 'ផ្នែកទី ៦៖ ការវាយតម្លៃ & ស្ពានចម្លង (៧៥:០០ - ៩០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"សូមក្រឡេកមើលស្ពានតភ្ជាប់ ៣ ថ្ងៃ៖
ម្សិលមិញ ថ្ងៃទី ៤៖ យើងរៀនលក្ខខណ្ឌដែលបង្កើត True ឬ False។
ថ្ងៃនេះ ថ្ងៃទី ៥៖ យើងរៀន IF ដែលយក True/False មកបំបែកជាផ្លូវ A ឬ B។
ថ្ងៃស្អែក ថ្ងៃទី ៦៖ ការសម្រេចចិត្តក្នុងជីវិតពិតត្រូវការលក្ខខណ្ឌច្រើនរួមគ្នា!
ថ្ងៃស្អែកយើងនឹងរៀនច្រក AND / OR Gates!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge purple-badge">ស្ពានតភ្ជាប់កម្មវិធីសិក្សា</span>
          <h2 class="slide-title">ផែនទីតភ្ជាប់ចំណេះដឹង ៣ ថ្ងៃ</h2>
          <p class="slide-lead">របៀបដែលលក្ខខណ្ឌម្សិលមិញ, ការសម្រេចចិត្ត IF ថ្ងៃនេះ, និងច្រកលក្ខខណ្ឌច្រើនថ្ងៃស្អែក បង្កើតជាខ្សែសង្វាក់បន្តគ្នា។</p>
        </div>

        <div class="bridge-three-col">
          <div class="bridge-col before-col">
            <span class="bridge-time-tag">ម្សិលមិញ (ថ្ងៃទី ៤)</span>
            <h3>លក្ខខណ្ឌ &amp; ការពិត</h3>
            <div class="bridge-summary">
              សំណួរប្រៀបធៀប (<code>=</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&lt;&gt;</code>) វាយតម្លៃទិន្នន័យដើម្បីផ្តល់ចម្លើយយ៉ាងតឹងរ៉ឹងត្រឹមតែ <strong>True</strong> ឬ <strong>False</strong>។
            </div>
            <div class="bridge-flow-arrow">&#10142; ត្រូវបានប្រើប្រាស់ដោយ...</div>
          </div>

          <div class="bridge-col today-col">
            <span class="bridge-time-tag">ថ្ងៃនេះ (ថ្ងៃទី ៥)</span>
            <h3>ការសម្រេចចិត្ត៖ IF / THEN / ELSE</h3>
            <div class="bridge-summary">
              <code>If()</code> យកចម្លើយ True/False នោះមកបំបែកការដំណើរការជា សកម្មភាព A (True) ឬ សកម្មភាព B (False)។
            </div>
            <div class="bridge-flow-arrow">&#10142; ពង្រីកសមត្ថភាពដោយ...</div>
          </div>

          <div class="bridge-col next-col">
            <span class="bridge-time-tag">ថ្ងៃស្អែក (ថ្ងៃទី ៦)</span>
            <h3>ច្រកលក្ខខណ្ឌច្រើន AND / OR</h3>
            <div class="bridge-summary">
              ក្បួនអាជីវកម្មក្នុងជីវិតពិតត្រូវការលក្ខខណ្ឌច្រើនរួមគ្នា៖ <code>If(Pressure &gt; 200 And Gate = Open, Alarm())</code>។
            </div>
          </div>
        </div>
      `
    },
    'slide-24': {
      title: 'កិច្ចការផ្ទះ & សទ្ទានុក្រមទ្វេភាសា',
      segment: 'ផ្នែកទី ៦៖ ការវាយតម្លៃ & ស្ពានចម្លង (៧៥:០០ - ៩០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល:
"សូមអបអរសាទរដែលបានបញ្ចប់ថ្ងៃទី ៥ ដោយជោគជ័យ!
កិច្ចការផ្ទះ ១៥ នាទី៖ កត់ត្រាការសម្រេចចិត្ត ៣ ក្នុងជីវិតប្រចាំថ្ងៃរបស់អ្នកជាទម្រង់ If(Condition, Then, Else)។
ពិនិត្យមើលសទ្ទានុក្រមទ្វេភាសាខាងក្រោម។
ជួបគ្នានៅថ្ងៃស្អែកក្នុងថ្ងៃទី ៦ ជាមួយច្រក AND / OR Gates!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge blue-badge">សង្ខេបបញ្ចប់វគ្គ</span>
          <h2 class="slide-title">កិច្ចការផ្ទះ ១៥ នាទី &amp; សទ្ទានុក្រមទ្វេភាសា</h2>
          <p class="slide-lead">ពង្រឹងតក្កវិជ្ជាបំបែកផ្លូវក្នុងបរិយាកាសប្រចាំថ្ងៃរបស់អ្នក និងស្វែងយល់ពាក្យបច្ចេកទេសសំខាន់ៗ។</p>
        </div>

        <div class="grid-2-col">
          <div class="homework-card">
            <div class="hw-icon">&#128269;</div>
            <div class="hw-content">
              <h4>កិច្ចការផ្ទះ៖ "តាមដាន IF/THEN/ELSE ក្នុងជីវិតពិត" (&le; ១៥ នាទី)</h4>
              <p>១. កំណត់ <strong>ការសម្រេចចិត្ត ៣ ក្នុងជីវិតប្រចាំថ្ងៃ</strong> របស់អ្នកដែលមានផ្លូវ True និង False ច្បាស់លាស់។</p>
              <p>២. សរសេរនីមួយៗតាមទម្រង់៖ <code>If ( លក្ខខណ្ឌ , សកម្មភាពបើពិត , សកម្មភាពបើមិនពិត )</code>។</p>
              <p>៣. កត់សម្គាល់ថាតើសកម្មភាពមួយណាដែលអ្នកបានអនុវត្តជាក់ស្តែងថ្ងៃនេះ!</p>
              <div class="hw-outcome">លទ្ធផលរំពឹងទុក៖ រូបមន្តបំបែកផ្លូវចំនួន ៣ ដែលបានកត់ត្រាទុកសម្រាប់ចែករំលែកថ្ងៃស្អែក!</div>
            </div>
          </div>

          <div class="glossary-card">
            <h4>សទ្ទានុក្រមបច្ចេកទេសទ្វេភាសា (ថ្ងៃទី ៥)</h4>
            <div class="glossary-list">
              <div class="gloss-item">
                <span class="en-term">Decision / Branching</span>
                <span class="kh-term">ការសម្រេចចិត្ត / ការបំបែកផ្លូវតក្កវិជ្ជា</span>
              </div>
              <div class="gloss-item">
                <span class="en-term">IF Function</span>
                <span class="kh-term">អនុគមន៍ IF (ប្រសិនបើ)</span>
              </div>
              <div class="gloss-item">
                <span class="en-term">THEN (True Branch)</span>
                <span class="kh-term">នោះ (សកម្មភាពនៅពេលលក្ខខណ្ឌពិត)</span>
              </div>
              <div class="gloss-item">
                <span class="en-term">ELSE (False Branch)</span>
                <span class="kh-term">បើមិនដូច្នោះទេ (សកម្មភាពនៅពេលលក្ខខណ្ឌមិនពិត)</span>
              </div>
              <div class="gloss-item">
                <span class="en-term">Mutually Exclusive</span>
                <span class="kh-term">ដាច់ដោយឡែកពីគ្នាទាំងស្រុង (ដំណើរការតែមួយគត់)</span>
              </div>
              <div class="gloss-item">
                <span class="en-term">Safety Interlock</span>
                <span class="kh-term">ប្រព័ន្ធចាក់សោរសុវត្ថិភាព (DisplayMode.Disabled)</span>
              </div>
            </div>
          </div>
        </div>
      `
    }
  };

  // --------------------------------------------------------------------------
  // 3. CORE ENGINE INITIALIZATION
  // --------------------------------------------------------------------------
  function initEngine() {
    slides = Array.from(document.querySelectorAll('.slide'));
    totalSlides = slides.length;

    // Cache original English slide content (.slide-content only) for clean 1-to-1 bilingual toggling
    slides.forEach(slide => {
      const id = slide.id;
      const contentEl = slide.querySelector('.slide-content');
      slideOriginals[id] = {
        title: slide.getAttribute('data-title'),
        segment: slide.getAttribute('data-segment'),
        notes: slide.getAttribute('data-notes'),
        content: contentEl ? contentEl.innerHTML : ''
      };
    });

    bindEvents();
    initWorkbench();
    initSimulator();
    initQuiz();
    initSolutionDrawer();
    buildOverviewModal();
    startTimer();
    showSlide(0);
  }

  // --------------------------------------------------------------------------
  // 4. SLIDE PRESENTATION NAVIGATION
  // --------------------------------------------------------------------------
  function showSlide(index) {
    if (index < 0 || index >= totalSlides) return;

    slides.forEach((slide, idx) => {
      if (idx === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    currentSlideIndex = index;
    updateStageUI();
    updateNotesDrawer();
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

  function updateStageUI() {
    const activeSlide = slides[currentSlideIndex];
    if (!activeSlide) return;

    const title = activeSlide.getAttribute('data-title') || `Slide ${currentSlideIndex + 1}`;
    const segment = activeSlide.getAttribute('data-segment') || 'Day 5: Decisions (IF / THEN / ELSE)';

    // Update Header
    const slideTitleEl = document.getElementById('current-slide-title');
    if (slideTitleEl) slideTitleEl.textContent = title;

    const segmentEl = document.getElementById('current-segment-name');
    if (segmentEl) segmentEl.textContent = segment;

    // Update Footer Indicators
    const currentNumEl = document.getElementById('slide-current-num') || document.getElementById('current-slide-num');
    const totalNumEl = document.getElementById('slide-total-count') || document.getElementById('total-slides-num');
    if (currentNumEl) currentNumEl.textContent = String(currentSlideIndex + 1);
    if (totalNumEl) totalNumEl.textContent = String(totalSlides);

    const counterEl = document.getElementById('slide-counter');
    if (counterEl) {
      counterEl.innerHTML = isKhmerActive 
        ? `ស្លាយទី <span id="slide-current-num">${currentSlideIndex + 1}</span> / <span id="slide-total-count">${totalSlides}</span>` 
        : `Slide <span id="slide-current-num">${currentSlideIndex + 1}</span> / <span id="slide-total-count">${totalSlides}</span>`;
    }

    // Update Progress Bars
    const pct = ((currentSlideIndex + 1) / totalSlides) * 100;
    const progressBar = document.getElementById('progress-bar') || document.getElementById('progress-fill') || document.getElementById('progress-bar-fill');
    if (progressBar) progressBar.style.width = `${pct}%`;

    // Update Button Disabled States
    const prevBtn = document.getElementById('btn-prev') || document.getElementById('prev-btn');
    const nextBtn = document.getElementById('btn-next') || document.getElementById('next-btn');
    if (prevBtn) {
      prevBtn.disabled = (currentSlideIndex === 0);
      prevBtn.onclick = prevSlide;
    }
    if (nextBtn) {
      nextBtn.disabled = (currentSlideIndex === totalSlides - 1);
      nextBtn.onclick = nextSlide;
    }

    // Update overview thumbnail active state
    document.querySelectorAll('.overview-thumb').forEach((thumb, idx) => {
      if (idx === currentSlideIndex) {
        thumb.classList.add('active-thumb');
      } else {
        thumb.classList.remove('active-thumb');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. 90-MINUTE AGENDA LIVE TIMER
  // --------------------------------------------------------------------------
  function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    isTimerRunning = true;
    updateTimerIcon();

    timerInterval = setInterval(() => {
      timerSecondsElapsed++;
      if (timerSecondsElapsed >= TOTAL_SESSION_SECONDS) {
        timerSecondsElapsed = TOTAL_SESSION_SECONDS;
        pauseTimer();
      }
      renderTimer();
    }, 1000);
  }

  function pauseTimer() {
    isTimerRunning = false;
    clearInterval(timerInterval);
    updateTimerIcon();
  }

  function toggleTimer() {
    if (isTimerRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  }

  function resetTimer() {
    pauseTimer();
    timerSecondsElapsed = 0;
    renderTimer();
  }

  function renderTimer() {
    const mins = Math.floor(timerSecondsElapsed / 60);
    const secs = timerSecondsElapsed % 60;
    const str = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    const timerDisplay = document.getElementById('session-timer');
    if (timerDisplay) timerDisplay.textContent = str;
  }

  function updateTimerIcon() {
    const icon = document.getElementById('timer-icon');
    if (!icon) return;
    if (isTimerRunning) {
      icon.innerHTML = '<path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>';
    } else {
      icon.innerHTML = '<path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>';
    }
  }

  // --------------------------------------------------------------------------
  // 6. PRESENTER NOTES DRAWER
  // --------------------------------------------------------------------------
  function toggleNotes() {
    isNotesOpen = !isNotesOpen;
    const panel = document.getElementById('presenter-notes-panel') || document.getElementById('notes-drawer');
    if (!panel) return;

    if (isNotesOpen) {
      panel.classList.remove('hidden');
      panel.classList.add('open');
      updateNotesDrawer();
    } else {
      panel.classList.remove('open');
      panel.classList.add('hidden');
    }
  }

  function updateNotesDrawer() {
    const panel = document.getElementById('presenter-notes-panel') || document.getElementById('notes-drawer');
    if (!panel || !isNotesOpen) return;

    const activeSlide = slides[currentSlideIndex];
    if (!activeSlide) return;

    const notes = activeSlide.getAttribute('data-notes') || 'No trainer script provided for this slide.';
    const notesBody = document.getElementById('notes-body') || document.getElementById('notes-content');
    if (notesBody) {
      notesBody.textContent = notes;
    }
  }

  // --------------------------------------------------------------------------
  // 7. SLIDE OVERVIEW GRID MODAL (PRESS O)
  // --------------------------------------------------------------------------
  function buildOverviewModal() {
    const grid = document.getElementById('overview-grid');
    if (!grid) return;

    grid.innerHTML = '';
    slides.forEach((slide, idx) => {
      const title = slide.getAttribute('data-title') || `Slide ${idx + 1}`;
      const thumb = document.createElement('div');
      thumb.className = `overview-thumb ${idx === currentSlideIndex ? 'active-thumb' : ''}`;
      thumb.innerHTML = `
        <span class="thumb-num">#${idx + 1}</span>
        <span class="thumb-title">${title}</span>
      `;
      thumb.addEventListener('click', () => {
        showSlide(idx);
        closeOverview();
      });
      grid.appendChild(thumb);
    });
  }

  function toggleOverview() {
    const modal = document.getElementById('overview-modal');
    if (!modal) return;
    const isOpen = modal.classList.contains('open') && !modal.classList.contains('hidden');
    if (isOpen) {
      closeOverview();
    } else {
      buildOverviewModal();
      modal.classList.remove('hidden');
      modal.classList.add('open');
    }
  }

  function closeOverview() {
    const modal = document.getElementById('overview-modal');
    if (modal) {
      modal.classList.remove('open');
      modal.classList.add('hidden');
    }
  }

  // --------------------------------------------------------------------------
  // 8. FULLSCREEN TOGGLE (PRESS F)
  // --------------------------------------------------------------------------
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }

  // --------------------------------------------------------------------------
  // 9. BILINGUAL LANGUAGE ENGINE (PRESS L) - IN-DOM SWAPPING WITHOUT BREAKING CSS
  // --------------------------------------------------------------------------
  function toggleLanguage() {
    try { localStorage.setItem('powerapps_presentation_lang', !isKhmerActive ? 'km' : 'en'); } catch(e){}
    isKhmerActive = !isKhmerActive;
    const langBtnText = document.getElementById('lang-btn-text');

    if (isKhmerActive) {
      document.body.classList.add('khmer-mode');
      document.body.classList.add('khmer-font-active');
      if (langBtnText) langBtnText.textContent = '🇬🇧 English';

      // Swap slide content to Khmer inside .slide-content ONLY (preserves DOM hierarchy & CSS!)
      slides.forEach(slide => {
        const id = slide.id;
        const khData = KHMER_SLIDES[id];
        if (khData) {
          slide.setAttribute('data-title', khData.title);
          slide.setAttribute('data-segment', khData.segment);
          slide.setAttribute('data-notes', khData.notes);
          const contentEl = slide.querySelector('.slide-content');
          if (contentEl && khData.content) {
            contentEl.innerHTML = khData.content;
          }
        }
      });
    } else {
      document.body.classList.remove('khmer-mode');
      document.body.classList.remove('khmer-font-active');
      if (langBtnText) langBtnText.textContent = '🇰🇭 ខ្មែរ (Khmer)';

      // Swap slide content back to original English inside .slide-content
      slides.forEach(slide => {
        const id = slide.id;
        const enData = slideOriginals[id];
        if (enData) {
          slide.setAttribute('data-title', enData.title);
          slide.setAttribute('data-segment', enData.segment);
          slide.setAttribute('data-notes', enData.notes);
          const contentEl = slide.querySelector('.slide-content');
          if (contentEl && enData.content) {
            contentEl.innerHTML = enData.content;
          }
        }
      });
    }

    // Re-bind interactive components that were re-rendered
    initWorkbench();
    initSimulator();
    renderQuiz();
    initSolutionDrawer();
    updateStageUI();
    updateNotesDrawer();
  }

  // --------------------------------------------------------------------------
  // 10. INTERACTIVE IF DECISION WORKBENCH (SLIDE 12)
  // --------------------------------------------------------------------------
  function initWorkbench() {
    const slider = document.getElementById('wb-hours-slider');
    const txtVal = document.getElementById('wb-hours-val');
    const txtName = document.getElementById('wb-op-input');
    const hazardBtn = document.getElementById('wb-hazard-btn');
    const alertCard = document.getElementById('card-alert-branch');
    const indicator = document.getElementById('branch-indicator');
    const title = document.getElementById('branch-title');
    const desc = document.getElementById('branch-desc');
    const submitBtn = document.getElementById('demo-submit-btn');

    if (!slider) return;

    let isHazard = false;

    function update() {
      const hours = parseFloat(slider.value) || 2.0;
      if (txtVal) txtVal.textContent = hours.toFixed(1);

      const isCritical = (hours > 4.0) || isHazard;

      if (alertCard && indicator && title && desc) {
        if (isCritical) {
          alertCard.className = 'decision-result-card status-critical';
          indicator.textContent = isKhmerActive 
            ? 'ផ្លូវ TRUE កំពុងដំណើរការ៖ អាសន្នធ្ងន់ធ្ងរ' 
            : 'TRUE PATH ACTIVE: Critical Escalation';
          title.style.color = '#fb7185';
          title.innerHTML = isKhmerActive 
            ? '🚨 ជូនដំណឹងបន្ទាន់ទៅកាន់នាយករោងចក្រ' 
            : '🚨 Urgent Alert to Plant Manager';
          desc.textContent = isKhmerActive 
            ? `ម៉ោងឈប់ដំណើរការ ${hours.toFixed(1)}h > 4.0h ឬមានគ្រោះថ្នាក់។ បានចាត់ចែងជាអាទិភាពបន្ទាន់បំផុត!` 
            : `Downtime ${hours.toFixed(1)}h > 4.0h or hazard flagged. Critical plant-wide escalation dispatched!`;
        } else {
          alertCard.className = 'decision-result-card status-routine';
          indicator.textContent = isKhmerActive 
            ? 'ផ្លូវ FALSE កំពុងដំណើរការ៖ ចាត់ចែងធម្មតា' 
            : 'FALSE PATH ACTIVE: Standard Dispatch';
          title.style.color = '#38bdf8';
          title.innerHTML = isKhmerActive 
            ? '📢 បញ្ជូនទៅកាន់ប្រធានក្រុមជាងមេកានិក' 
            : '📢 Route to Shift Lead Mechanic';
          desc.textContent = isKhmerActive 
            ? `ម៉ោងឈប់ដំណើរការ ${hours.toFixed(1)}h <= 4.0h។ កត់ត្រាទុកជាអាទិភាពធម្មតា។` 
            : `Downtime is under 4.0 hours. Logged as Routine Priority.`;
        }
      }

      if (submitBtn && txtName) {
        const name = txtName.value.trim();
        if (name === '') {
          submitBtn.disabled = true;
          submitBtn.style.opacity = '0.4';
          submitBtn.innerHTML = isKhmerActive 
            ? '🔒 បញ្ជូនសំបុត្រ (ចាក់សោរ៖ ត្រូវការបញ្ចូលឈ្មោះ)' 
            : '🔒 Submit Ticket (Disabled: Name Required)';
        } else {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1.0';
          submitBtn.style.background = 'var(--fluent-blue)';
          submitBtn.innerHTML = isKhmerActive 
            ? '✅ បញ្ជូនសំបុត្រ (ដោះសោរ៖ ត្រៀមរួចរាល់)' 
            : '✅ Submit Ticket (Ready to Dispatch)';
        }
      }
    }

    slider.oninput = update;
    if (txtName) txtName.oninput = update;
    if (hazardBtn) {
      hazardBtn.onclick = function () {
        isHazard = !isHazard;
        hazardBtn.innerHTML = `<span class="toggle-indicator ${isHazard ? 'on' : 'off'}"></span> ` + 
          (isKhmerActive 
            ? (isHazard ? 'គ្រោះថ្នាក់៖ បាទ/ចាស (true)' : 'គ្រោះថ្នាក់៖ ទេ (false)')
            : (isHazard ? 'Hazard: YES (true)' : 'Hazard: NO (false)'));
        update();
      };
    }

    update();
  }

  // --------------------------------------------------------------------------
  // 11. INTERACTIVE 6-SCENARIO IF SIMULATOR (SLIDE 18)
  // --------------------------------------------------------------------------
  function initSimulator() {
    const container = document.getElementById('if-simulator-widget');
    if (!container) return;

    const cards = container.querySelectorAll('.evaluator-card');
    const scoreEl = document.getElementById('sim-score');
    const feedbackEl = document.getElementById('sim-feedback');

    let answered = {};

    cards.forEach((card, idx) => {
      const correctChoice = card.getAttribute('data-correct');
      const buttons = card.querySelectorAll('.cond-btn');
      const statusText = card.querySelector('.cond-status-text');

      buttons.forEach(btn => {
        btn.onclick = function () {
          const choice = btn.getAttribute('data-choice');
          buttons.forEach(b => b.classList.remove('selected-true', 'selected-false'));

          if (choice === correctChoice) {
            btn.classList.add('selected-true');
            answered[idx] = true;
            if (statusText) {
              statusText.textContent = isKhmerActive ? '✅ ត្រឹមត្រូវ! ផ្លូវនេះត្រូវបានដំណើរការ។' : '✅ Correct! This path executes.';
              statusText.style.color = 'var(--branch-true)';
            }
          } else {
            btn.classList.add('selected-false');
            answered[idx] = false;
            if (statusText) {
              statusText.textContent = isKhmerActive ? '❌ មិនត្រឹមត្រូវ! លក្ខខណ្ឌផ្តល់លទ្ធផលផ្លូវផ្ទុយ។' : '❌ Incorrect! The condition chose the opposite branch.';
              statusText.style.color = 'var(--fluent-red-light)';
            }
          }

          let correctCount = Object.values(answered).filter(v => v === true).length;
          if (scoreEl) scoreEl.textContent = correctCount;

          if (feedbackEl) {
            if (correctCount === 6) {
              feedbackEl.textContent = isKhmerActive 
                ? '🎉 អបអរសាទរ! អ្នកឆ្លើយត្រូវទាំង ៦ ស្ថានភាពឥតខ្ចោះ!' 
                : '🎉 Perfect! You mastered all 6 IF branching scenarios!';
              feedbackEl.style.color = 'var(--branch-true)';
            } else {
              feedbackEl.textContent = isKhmerActive 
                ? `បានឆ្លើយត្រូវ ${correctCount} ក្នុងចំណោម ៦ ស្ថានភាព។` 
                : `${correctCount} of 6 scenarios correctly routed.`;
            }
          }
        };
      });
    });
  }

  // --------------------------------------------------------------------------
  // 12. INTERACTIVE 5-QUESTION QUIZ (SLIDE 20)
  // --------------------------------------------------------------------------
  function initQuiz() {
    const prevBtn = document.getElementById('quiz-prev-btn');
    const nextBtn = document.getElementById('quiz-next-btn');

    if (prevBtn) {
      prevBtn.onclick = () => {
        if (currentQuizIndex > 0) {
          currentQuizIndex--;
          renderQuiz();
        }
      };
    }

    if (nextBtn) {
      nextBtn.onclick = () => {
        if (currentQuizIndex < QUIZ_QUESTIONS.length - 1) {
          currentQuizIndex++;
          renderQuiz();
        }
      };
    }

    renderQuiz();
  }

  function renderQuiz() {
    const qBody = document.getElementById('quiz-body');
    const counterEl = document.getElementById('quiz-question-counter');
    const scoreEl = document.getElementById('quiz-score-display');
    const prevBtn = document.getElementById('quiz-prev-btn');
    const nextBtn = document.getElementById('quiz-next-btn');

    if (!qBody) return;

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
      nextBtn.disabled = (currentQuizIndex === QUIZ_QUESTIONS.length - 1);
    }

    const prompt = isKhmerActive ? q.qKh : q.qEn;
    const options = isKhmerActive ? q.optionsKh : q.optionsEn;
    const explanation = isKhmerActive ? q.explanationKh : q.explanationEn;

    let html = `
      <div class="quiz-question-text">${prompt}</div>
      <div class="quiz-options-group">
    `;

    const userAnswer = userQuizAnswers[currentQuizIndex];

    options.forEach((opt, idx) => {
      let btnClass = 'quiz-option-btn';
      let disabledAttr = '';
      if (userAnswer !== undefined) {
        disabledAttr = 'disabled';
        if (idx === q.correctIndex) {
          btnClass += ' option-correct';
        } else if (idx === userAnswer) {
          btnClass += ' option-incorrect';
        }
      }
      html += `<button class="${btnClass}" data-opt-idx="${idx}" ${disabledAttr}>${opt}</button>`;
    });

    html += `</div>`;

    if (userAnswer !== undefined) {
      const isCorrect = (userAnswer === q.correctIndex);
      html += `
        <div class="quiz-explanation ${isCorrect ? 'exp-correct' : 'exp-incorrect'}">
          <strong>${isCorrect ? (isKhmerActive ? '✅ ត្រឹមត្រូវណាស់!' : '✅ Correct!') : (isKhmerActive ? '❌ មិនត្រឹមត្រូវទេ!' : '❌ Incorrect!')}</strong>
          <span>${explanation}</span>
        </div>
      `;
    }

    qBody.innerHTML = html;

    qBody.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.onclick = function () {
        const idx = parseInt(btn.getAttribute('data-opt-idx'), 10);
        userQuizAnswers[currentQuizIndex] = idx;
        if (idx === q.correctIndex) {
          quizScore++;
        }
        renderQuiz();
      };
    });
  }

  // --------------------------------------------------------------------------
  // 13. SOLUTION REVEAL DRAWER (SLIDE 22)
  // --------------------------------------------------------------------------
  function initSolutionDrawer() {
    const btn = document.getElementById('btn-reveal-solution');
    const body = document.getElementById('solution-content');
    if (!btn || !body) return;

    btn.onclick = function () {
      const isCollapsed = body.classList.contains('collapsed');
      if (isCollapsed) {
        body.classList.remove('collapsed');
        btn.textContent = isKhmerActive ? 'លាក់ចម្លើយ' : 'Hide Solution';
      } else {
        body.classList.add('collapsed');
        btn.textContent = isKhmerActive ? 'បង្ហាញចម្លើយ' : 'Reveal Solution';
      }
    };
  }

  // --------------------------------------------------------------------------
  // 14. KEYBOARD SHORTCUTS & EVENT BINDINGS
  // --------------------------------------------------------------------------
  function bindEvents() {
    const prevBtn = document.getElementById('btn-prev') || document.getElementById('prev-btn');
    const nextBtn = document.getElementById('btn-next') || document.getElementById('next-btn');
    const restartBtn = document.getElementById('btn-restart');

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (restartBtn) restartBtn.addEventListener('click', () => showSlide(0));

    // Header buttons
    const langBtn = document.getElementById('btn-lang');
    const notesBtn = document.getElementById('btn-notes');
    const overviewBtn = document.getElementById('btn-overview');
    const fsBtn = document.getElementById('btn-fullscreen');

    if (langBtn) langBtn.addEventListener('click', toggleLanguage);
    if (notesBtn) notesBtn.addEventListener('click', toggleNotes);
    if (overviewBtn) overviewBtn.addEventListener('click', toggleOverview);
    if (fsBtn) fsBtn.addEventListener('click', toggleFullscreen);

    // Floating notes button & close button
    const notesFloatingTab = document.getElementById('notes-floating-tab');
    const notesCloseBtn = document.getElementById('btn-close-notes') || document.getElementById('notes-close-btn');
    if (notesFloatingTab) notesFloatingTab.addEventListener('click', toggleNotes);
    if (notesCloseBtn) notesCloseBtn.addEventListener('click', toggleNotes);

    // Overview close button & backdrop
    const overviewCloseBtn = document.getElementById('btn-close-overview') || document.getElementById('overview-close-btn');
    const overviewBackdrop = document.getElementById('overview-backdrop');
    if (overviewCloseBtn) overviewCloseBtn.addEventListener('click', closeOverview);
    if (overviewBackdrop) overviewBackdrop.addEventListener('click', closeOverview);

    // Timer controls
    const timerToggleBtn = document.getElementById('timer-toggle-btn');
    const timerResetBtn = document.getElementById('timer-reset-btn');
    if (timerToggleBtn) timerToggleBtn.addEventListener('click', toggleTimer);
    if (timerResetBtn) timerResetBtn.addEventListener('click', resetTimer);

    // Global keyboard shortcuts
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

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
          showSlide(0);
          break;
        case 'End':
          e.preventDefault();
          showSlide(totalSlides - 1);
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
          showSlide(0);
          break;
        case 'Escape':
          closeOverview();
          if (isNotesOpen) toggleNotes();
          break;
      }
    });
  }

  // --------------------------------------------------------------------------
  // 15. RUN ENGINE ON DOM READY
  // --------------------------------------------------------------------------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEngine);
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
    initEngine();
  }

  // Universal Window Exports for inline HUD onclick handlers
  window.prevSlide = prevSlide;
  window.nextSlide = nextSlide;
  window.goToSlide = showSlide;
  window.showSlide = showSlide;
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
