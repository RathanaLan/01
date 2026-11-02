/**
 * ============================================================================
 * POWER APPS FOUNDATION: DAY 4 PRESENTATION ENGINE
 * Topic: Questions, Conditions, True & False
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
      qEn: "1. What is the fundamental purpose of a Condition in software logic?",
      qKh: "១. តើអ្វីជាគោលបំណងគ្រឹះនៃ លក្ខខណ្ឌ (Condition) នៅក្នុងតក្កវិជ្ជានៃកម្មវិធីកុំព្យូទ័រ?",
      optionsEn: [
        "A) To execute an action like sending an email immediately.",
        "B) To ask a comparison question about data that produces strictly True or False.",
        "C) To create a new table inside SharePoint.",
        "D) To change the font color on the mobile screen."
      ],
      optionsKh: [
        "A) ដើម្បីដំណើរការសកម្មភាពដូចជាផ្ញើអ៊ីមែលភ្លាមៗ។",
        "B) ដើម្បីចោទជាសំណួរប្រៀបធៀបអំពីទិន្នន័យ ដែលផ្តល់ចម្លើយយ៉ាងតឹងរ៉ឹងត្រឹមតែ ពិត (True) ឬ មិនពិត (False)។",
        "C) ដើម្បីបង្កើតតារាងថ្មីនៅក្នុង SharePoint។",
        "D) ដើម្បីផ្លាស់ប្តូរពណ៌ពុម្ពអក្សរនៅលើអេក្រង់ទូរស័ព្ទ។"
      ],
      correctIndex: 1,
      explanationEn: "Correct! A condition is never an action itself; it is the question that evaluates data to produce True or False.",
      explanationKh: "ត្រឹមត្រូវណាស់! លក្ខខណ្ឌមិនមែនជាសកម្មភាពដោយខ្លួនឯងទេ វាជាសំណួរដែលវាយតម្លៃទិន្នន័យដើម្បីបង្កើតជាចម្លើយ ពិត ឬ មិនពិត។"
    },
    {
      qEn: "2. Why did the hydraulic cylinder burst at Apex Plastics even though the pressure gauge showed 245 PSI?",
      qKh: "២. ហេតុអ្វីបានជាស៊ីឡាំងប្រេងធារាសាស្ត្រផ្ទុះបែកនៅ Apex Plastics បើទោះបីជាឧបករណ៍វាស់សម្ពាធបង្ហាញ ២៤៥ PSI ក៏ដោយ?",
      optionsEn: [
        "A) Because the sensor battery was completely dead.",
        "B) Because the tablet was stolen by an operator.",
        "C) Because the app passively displayed the number without ever asking the condition 'Pressure > 200' to trigger an alarm.",
        "D) Because 245 is less than 200."
      ],
      optionsKh: [
        "A) ពីព្រោះថ្មឧបករណ៍ចាប់សញ្ញាបានអស់ទាំងស្រុង។",
        "B) ពីព្រោះថេប្លេតត្រូវបានលួចដោយប្រតិបត្តិករ។",
        "C) ពីព្រោះកម្មវិធីគ្រាន់តែបង្ហាញតួលេខអសកម្ម ដោយមិនដែលបានចោទសួរលក្ខខណ្ឌ 'សម្ពាធ > ២០០' ដើម្បីបន្លឺសំឡេងរោទិ៍ (Trigger Alarm)ឡើយ។",
        "D) ពីព្រោះ ២៤៥ គឺតូចជាង ២០០។"
      ],
      correctIndex: 2,
      explanationEn: "Correct! Data sitting passively on screen does nothing. An app must actively evaluate conditions to trigger protective business decisions.",
      explanationKh: "ត្រឹមត្រូវណាស់! ទិន្នន័យដែលស្ថិតនៅអសកម្មលើអេក្រង់មិនអាចជួយអ្វីបានឡើយ។ កម្មវិធីត្រូវតែសួរលក្ខខណ្ឌយ៉ាងសកម្ម ដើម្បីជំរុញការសម្រេចចិត្តការពារអាជីវកម្ម។"
    },
    {
      qEn: "3. What does the Power Fx expression 'txtDowntime.Text > 4.0' evaluate to when txtDowntime contains '2.5'?",
      qKh: "៣. តើកន្សោម Power Fx 'txtDowntime.Text > 4.0' ផ្តល់លទ្ធផលអ្វី នៅពេលដែល txtDowntime មានតម្លៃ '2.5'?",
      optionsEn: [
        "A) TRUE",
        "B) FALSE",
        "C) Error: Numbers cannot be compared.",
        "D) '2.54.0'"
      ],
      optionsKh: [
        "A) TRUE (ពិត)",
        "B) FALSE (មិនពិត)",
        "C) កំហុស៖ លេខមិនអាចប្រៀបធៀបបានទេ។",
        "D) '2.54.0'"
      ],
      correctIndex: 1,
      explanationEn: "Correct! 2.5 is not greater than 4.0, so the condition strictly evaluates to FALSE.",
      explanationKh: "ត្រឹមត្រូវណាស់! ២.៥ មិនធំជាង ៤.០ ឡើយ ដូច្នេះលក្ខខណ្ឌនេះផ្តល់លទ្ធផលយ៉ាងច្បាស់ថា FALSE (មិនពិត)។"
    },
    {
      qEn: "4. What happens if a citizen developer writes 'IsBlank(txtOperator.Text)' in an app?",
      qKh: "៤. តើមានអ្វីកើតឡើងប្រសិនបើអ្នកបង្កើតកម្មវិធីសរសេរ 'IsBlank(txtOperator.Text)' នៅក្នុងកម្មវិធី?",
      optionsEn: [
        "A) It deletes the operator's name from memory.",
        "B) It asks whether the text box is empty, returning TRUE if empty and FALSE if text was entered.",
        "C) It converts the operator's name into a number.",
        "D) It opens a blank new screen."
      ],
      optionsKh: [
        "A) វានឹងលុបឈ្មោះប្រតិបត្តិករចេញពីសតិចងចាំ។",
        "B) វានឹងសួរថាតើប្រអប់អត្ថបទនោះទទេឬអត់ ដោយផ្តល់ចម្លើយ TRUE បើទទេ និង FALSE បើមានការវាយអត្ថបទបញ្ចូល។",
        "C) វានឹងបម្លែងឈ្មោះប្រតិបត្តិករទៅជាលេខ។",
        "D) វានឹងបើកអេក្រង់ទទេថ្មីមួយ។"
      ],
      correctIndex: 1,
      explanationEn: "Correct! IsBlank() is a condition helper that returns True when a field contains no characters or data.",
      explanationKh: "ត្រឹមត្រូវណាស់! IsBlank() គឺជាជំនួយការលក្ខខណ្ឌដែលផ្តល់តម្លៃ True នៅពេលដែលប្រអប់ទិន្នន័យគ្មានតួអក្សរ ឬគ្មានទិន្នន័យ។"
    },
    {
      qEn: "5. Why is True/False NOT the complete decision in Power Apps?",
      qKh: "៥. ហេតុអ្វីបានជា ពិត/មិនពិត (True/False) មិនមែនជាការសម្រេចចិត្តទាំងមូលនៅក្នុង Power Apps?",
      optionsEn: [
        "A) Because True and False are only used in math class.",
        "B) Because True/False is merely the answer to a question; tomorrow's IF() function is what actually chooses which action to run.",
        "C) Because Power Apps does not allow decisions.",
        "D) Because True and False expire after 24 hours."
      ],
      optionsKh: [
        "A) ពីព្រោះ ពិត និង មិនពិត ប្រើតែក្នុងថ្នាក់គណិតវិទ្យាប៉ុណ្ណោះ។",
        "B) ពីព្រោះ True/False គ្រាន់តែជាចម្លើយចំពោះសំណួរមួយប៉ុណ្ណោះ។ អនុគមន៍ IF() ថ្ងៃស្អែកទើបជាអ្នកជ្រើសរើសថាតើត្រូវដំណើរការសកម្មភាពមួយណាពិតប្រាកដ។",
        "C) ពីព្រោះ Power Apps មិនអនុញ្ញាតឱ្យធ្វើការសម្រេចចិត្តឡើយ។",
        "D) ពីព្រោះ ពិត និង មិនពិត ផុតកំណត់បន្ទាប់ពី ២៤ ម៉ោង។"
      ],
      correctIndex: 1,
      explanationEn: "Correct! True and False are the outputs of a condition. Tomorrow, Day 5's IF() takes that answer to branch into action!",
      explanationKh: "ត្រឹមត្រូវណាស់! True និង False គឺជាលទ្ធផលនៃលក្ខខណ្ឌ។ នៅថ្ងៃទី ៥ ថ្ងៃស្អែក អនុគមន៍ IF() នឹងយកចម្លើយនោះទៅជ្រើសរើសសកម្មភាពជាក់ស្តែង!"
    }
  ];

  // --------------------------------------------------------------------------
  // 2. COMPLETE HIGH-ACCURACY KHMER TRANSLATIONS FOR ALL 24 SLIDES
  // --------------------------------------------------------------------------
  const KHMER_SLIDES = {
    'slide-1': {
      title: 'ថ្ងៃទី ៤៖ សំណួរ, លក្ខខណ្ឌ, ពិត & មិនពិត',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & រំលឹកចំណេះដឹង (០០:០០ - ១០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"សូមស្វាគមន៍មកកាន់ថ្ងៃទី ៤ នៃវគ្គបណ្តុះបណ្តាល Microsoft Power Apps!
សូមក្រឡេកមើលចំណុចដែលយើងកំពុងឈរនៅក្នុងដំណើរការសិក្សា៖
កាលពីថ្ងៃទី ១ យើងបានរៀនថា កម្មវិធីដោះស្រាយបញ្ហាមនុស្សដោយប្រើ ធាតុបញ្ចូល, ដំណើរការ និង ធាតុចេញ។
កាលពីថ្ងៃទី ២ យើងបានរៀនថាកុំព្យូទ័រធ្វើតាមជំហានតាមលំដាប់លំដោយ (Sequence)។
កាលពីថ្ងៃទី ៣ យើងបានស្គាល់ទិន្នន័យ និងប្រអប់ផ្ទុក (អត្ថបទ, លេខ, កាលបរិច្ឆេទ, បាទ/ទេ)។
ថ្ងៃនេះនៅថ្ងៃទី ៤ យើងឈានជើងចូលទៅក្នុងបេះដូងនៃភាពវៃឆ្លាតរបស់កម្មវិធី៖ តក្កវិជ្ជា (LOGIC)!
ខ្សែសង្វាក់តភ្ជាប់ថ្ងៃនេះគឺ៖ ទិន្នន័យ ➔ ការប្រៀបធៀប/សំណួរ ➔ លក្ខខណ្ឌ ➔ ពិត/មិនពិត។
ចំណុចស្នូលដែលអ្នកត្រូវចងចាំ៖ True និង False មិនមែនជាតក្កវិជ្ជាទាំងមូលទេ វាគ្រាន់តែជា 'ចម្លើយ' ដែលកើតចេញពីសំណួរប្រៀបធៀបទិន្នន័យប៉ុណ្ណោះ!"`,
      content: `
        <div class="hero-layout">
          <div class="hero-pill-group">
            <span class="hero-pill">ដំណាក់កាលទី ២៖ តក្កវិជ្ជា &amp; ការសម្រេចចិត្ត</span>
            <span class="hero-pill teal-pill">ថ្ងៃទី ៤ នៃ ២៧</span>
            <span class="hero-pill blue-pill">៩០ នាទី</span>
          </div>
          <h1 class="hero-title">
            <span class="gradient-text">សំណួរ, លក្ខខណ្ឌ, ពិត &amp; មិនពិត</span><br>
            របៀបដែលកម្មវិធីពិនិត្យទិន្នន័យដើម្បីស្វែងរកការពិត
          </h1>
          <p class="hero-subtitle">
            កម្មវិធីមិនអាចធ្វើការសម្រេចចិត្តក្នុងភាពងងឹតឡើយ។ មុនពេលវាអាចជ្រើសរើសសកម្មភាព វាត្រូវតែចោទសួរអំពីទិន្នន័យរបស់វា។ សំណួរនោះហៅថា <strong>លក្ខខណ្ឌ (Condition)</strong> ហើយចម្លើយតែមួយគត់របស់វាគឺ <strong>ពិត (True)</strong> ឬ <strong>មិនពិត (False)</strong>។
          </p>
          <div class="title-feature-grid">
            <div class="feature-item">
              <span class="feature-icon">&#128196;</span>
              <div class="feature-info">
                <h4>១. ទិន្នន័យ (Data)</h4>
                <p>តម្លៃដែលបានរក្សាទុកកាលពីម្សិលមិញ៖ សម្ពាធធារាសាស្ត្រ, ឈ្មោះអ្នកប្រើ, កាលបរិច្ឆេទ។</p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">&#10067;</span>
              <div class="feature-info">
                <h4>២. សំណួរប្រៀបធៀប (Condition)</h4>
                <p>សំណួរដែលយើងសួរអំពីទិន្នន័យ៖ <em>"តើសម្ពាធ &gt; ២០០ ឬទេ?"</em>, <em>"តើឈ្មោះទទេឬទេ?"</em></p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">&#9989;</span>
              <div class="feature-info">
                <h4>៣. ចម្លើយតក្កវិជ្ជា (Boolean)</h4>
                <p>សេចក្តីសម្រេចចុងក្រោយដែលផលិតបាន៖ ពិត (<strong>TRUE</strong>) ឬ មិនពិត (<strong>FALSE</strong>)។</p>
              </div>
            </div>
          </div>
        </div>
      `
    },
    'slide-2': {
      title: 'គំរូគំនិតមេនៃការបណ្តុះបណ្តាល',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & រំលឹកចំណេះដឹង (០០:០០ - ១០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"សូមក្រឡេកមើលផែនទីគំរូគំនិតមេនៅលើអេក្រង់។
កាលពីថ្ងៃទី ៣ យើងបានរៀនអំពីទិន្នន័យ។
ថ្ងៃនេះនៅថ្ងៃទី ៤ យើងរៀនអំពីលក្ខខណ្ឌ (Conditions) ដែលប្រៀបធៀបទិន្នន័យដើម្បីទទួលបាន True ឬ False។
ហើយថ្ងៃស្អែកនៅថ្ងៃទី ៥ អនុគមន៍ IF នឹងយកចម្លើយ True/False នោះទៅជ្រើសរើសសកម្មភាព!
កុំមើលឃើញ True និង False ជារឿងដាច់ដោយឡែក។ ពួកវាជាចម្លើយនៃសំណួរអាជីវកម្មរបស់អ្នក!"`,
      content: `
        <div class="slide-header">
          <span class="slide-badge purple-badge">ស្ថាបត្យកម្មកម្មវិធីសិក្សា</span>
          <h2 class="slide-title">ទីតាំងនៃមេរៀនថ្ងៃនេះក្នុងគំរូគំនិតមេ ២៧ ថ្ងៃ</h2>
          <p class="slide-lead">យើងមិនដែលបង្រៀនមុខងារដាច់ដោយឡែកឡើយ។ រាល់ថ្ងៃទាំងអស់សុទ្ធតែតភ្ជាប់ទៅមេរៀនកន្លងមក និងត្រួសត្រាយផ្លូវទៅមេរៀនបន្ទាប់។</p>
        </div>
        <div class="mental-model-chain">
          <div class="chain-step step-completed">
            <span class="step-num">ថ្ងៃទី ១-២</span>
            <span class="step-name">បញ្ហា &amp; លំដាប់</span>
            <span class="step-status">&#10003; មូលដ្ឋានគ្រឹះ</span>
          </div>
          <span class="chain-arrow">&#8594;</span>
          <div class="chain-step step-completed">
            <span class="step-num">ថ្ងៃទី ៣</span>
            <span class="step-name">ទិន្នន័យ &amp; ប្រភេទ</span>
            <span class="step-status">&#10003; តម្លៃដែលបានរក្សាទុក</span>
          </div>
          <span class="chain-arrow">&#8594;</span>
          <div class="chain-step step-active-day4">
            <span class="step-num">ថ្ងៃនេះ (ថ្ងៃទី ៤)</span>
            <span class="step-name">លក្ខខណ្ឌ (T / F)</span>
            <span class="step-status">&#9733; ចំណុចផ្តោតបច្ចុប្បន្ន</span>
          </div>
          <span class="chain-arrow">&#8594;</span>
          <div class="chain-step step-future">
            <span class="step-num">ថ្ងៃទី ៥</span>
            <span class="step-name">IF / ការសម្រេចចិត្ត</span>
            <span class="step-status">ថ្ងៃស្អែក</span>
          </div>
          <span class="chain-arrow">&#8594;</span>
          <div class="chain-step step-future">
            <span class="step-num">ថ្ងៃទី ៦-២៧</span>
            <span class="step-name">សកម្មភាព ➔ រក្សាទុក ➔ តេស្ត</span>
            <span class="step-status">ខាងមុខ</span>
          </div>
        </div>
        <div class="grid-2-col" style="margin-top: 1.25rem;">
          <div class="info-card border-blue">
            <div class="card-header-icon">&#128260; របៀបដែលថ្ងៃទី ៣ តភ្ជាប់មកថ្ងៃទី ៤</div>
            <p>កាលពីម្សិលមិញ យើងរៀនថាកម្មវិធីផ្ទុកទិន្នន័យតាមប្រភេទ។ ប៉ុន្តែការផ្ទុកទិន្នន័យគឺនៅអសកម្ម! ថ្ងៃនេះ យើងបង្រៀនកម្មវិធីឱ្យចេះ <strong>ពិនិត្យ និងប្រៀបធៀប</strong> ទិន្នន័យទាំងនោះដោយប្រើសញ្ញាសួរប្រៀបធៀប (<code>=</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&lt;&gt;</code>)។</p>
          </div>
          <div class="info-card border-purple">
            <div class="card-header-icon">&#128301; ហេតុអ្វីថ្ងៃទី ៥ ត្រូវការពឹងផ្អែកលើថ្ងៃទី ៤</div>
            <p>ថ្ងៃស្អែកនៅថ្ងៃទី ៥ កម្មវិធីរបស់យើងនឹងរៀនអនុគមន៍ដ៏ល្បីល្បាញ <code>If()</code> ដើម្បីជ្រើសរើសសកម្មភាព។ ប៉ុន្តែ <code>If()</code> មិនអាចដំណើរការបានទេបើគ្មានលក្ខខណ្ឌ! <code>If()</code> គ្រាន់តែរង់ចាំស្តាប់ <strong>លទ្ធផល True/False</strong> ដែលយើងរៀនថ្ងៃនេះប៉ុណ្ណោះ។</p>
          </div>
        </div>
      `
    },
    'slide-3': {
      title: "ការពិនិត្យឡើងវិញនូវចំណេះដឹងជាមូលដ្ឋាន",
      segment: "ផ្នែកទី ១៖ ស្វាគមន៍ & រំលឹកចំណេះដឹង (០០:០០ - ១០:០០)",
      notes: "កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):\n\"ចូរយើងកម្តៅខួរក្បាលរបស់យើងជាមួយនឹងសំណួរបញ្ជាក់ចំណេះដឹងចំនួន ៣ យ៉ាងរហ័សពីថ្ងៃទី ៣!\nសំណួរទី ១៖ តើអ្វីជាប្រភេទកុងតឺន័រទិន្នន័យគ្រឹះទាំង ៤ ដែលយើងបានរៀនកាលពីម្សិលមិញ?\n(ចម្លើយសិក្ខាកាម៖ អត្ថបទ (Text), លេខ (Number), កាលបរិច្ឆេទ/ពេលវេលា (Date/Time), បាទ/ទេ ឬប៊ូលីន (Yes/No - Boolean)!)\nសំណួរទី ២៖ ហេតុអ្វីបានជាលេខទូរស័ព្ទបុគ្គលិកដូចជា +855-12-345-678 ត្រូវរក្សាទុកជា អត្ថបទ (Text) មិនមែនជា លេខ (Number)?\n(ចម្លើយសិក្ខាកាម៖ ផ្អែកលើច្បាប់មាស៖ យើងមិនដែលយកវាទៅបូកដកគុណចែកគណិតវិទ្យាឡើយ ហើយការរក្សាទុកជាលេខនឹងធ្វើឱ្យបាត់សញ្ញាបូក (+) និងលេខសូន្យ (0) នៅខាងមុខ!)\nសំណួរទី ៣៖ តើមានអ្វីកើតឡើងនៅរោងចក្រ Apex Plastics នៅពេលដែលកម្មវិធីចាត់ទុក '10' និង '20' ជាអត្ថបទ?\n(ចម្លើយសិក្ខាកាម៖ វានាំយកពាក្យទាំងពីរមកភ្ជាប់គ្នាទៅជា '1020' ប៉ាឡែត ជំនួសឱ្យការបូកសរុបស្មើ ៣០!)\nការចងចាំពិតជាអស្ចារ្យណាស់! ឥឡូវនេះ ចូរយើងស្វែងយល់ថាតើកម្មវិធីវាយតម្លៃទិន្នន័យទាំងនេះយ៉ាងដូចម្តេច។\"",
      content: `<div class="slide-header">
        <span class="slide-badge blue-badge">រំលឹកចំណេះដឹងសកម្ម</span>
        <h2 class="slide-title">តេស្តចំណេះដឹងពីមុន៖ រំលឹកទិន្នន័យថ្ងៃទី ៣</h2>
        <p class="slide-lead">ទាញយកគោលការណ៍ទិន្នន័យគ្រឹះពីការចងចាំ មុនពេលយើងរៀនពីរបៀបចោទសួរអំពីទិន្នន័យទាំងនោះ។</p>
      </div>

      <div class="grid-3-col">
        <div class="retrieval-card">
          <div class="retrieval-num">០១</div>
          <h4>ពីថ្ងៃទី ៣៖ សសរស្តម្ភទិន្នន័យ</h4>
          <p class="retrieval-q">តើកុងតឺន័រផ្ទុកទិន្នន័យគ្រឹះទាំង ៤ នៃកម្មវិធីអាជីវកម្មមានអ្វីខ្លះ?</p>
          <div class="retrieval-ans">
            <strong>ចម្លើយត្រឹមត្រូវ៖</strong>
            <span>អត្ថបទ (Text), លេខ (Number), កាលបរិច្ឆេទ (Date), និង ប៊ូលីន (Yes/No)។ គ្រប់ព័ត៌មានទាំងអស់ត្រូវតែស្ថិតនៅក្នុងប្រអប់ត្រឹមត្រូវមួយនៃប្រអប់ទាំង ៤ នេះ!</span>
          </div>
        </div>

        <div class="retrieval-card">
          <div class="retrieval-num">០២</div>
          <h4>ពីថ្ងៃទី ៣៖ ច្បាប់មាស</h4>
          <p class="retrieval-q">ហេតុអ្វីបានជាលេខទូរស័ព្ទ <code>+855-12-345-678</code> ត្រូវបានរក្សាទុកជាប្រភេទ អត្ថបទ (Text)?</p>
          <div class="retrieval-ans">
            <strong>ចម្លើយត្រឹមត្រូវ៖</strong>
            <span>ដោយសារយើងមិនដែលយកលេខទូរស័ព្ទទៅគណនាគណិតវិទ្យា (បូក/គុណ) ឡើយ! ប្រសិនបើរៀបចំជាលេខ កុំព្យូទ័រនឹងលុបសញ្ញាបូក (+) និងលេខសូន្យ (0) នៅមុខចោល។</span>
          </div>
        </div>

        <div class="retrieval-card">
          <div class="retrieval-num">០៣</div>
          <h4>ពីថ្ងៃទី ៣៖ មេរៀនកំហុស</h4>
          <p class="retrieval-q">តើមានអ្វីកើតឡើងនៅពេល Apex Plastics ច្រឡំបូកបញ្ចូល '10' + '20' ជាអត្ថបទ?</p>
          <div class="retrieval-ans">
            <strong>ចម្លើយត្រឹមត្រូវ៖</strong>
            <span>កម្មវិធីបានភ្ជាប់ពាក្យចូលគ្នាបង្កើតបានជា <code>"1020"</code> ប៉ាឡែតជំនួសឱ្យ <code>30</code>! ប្រភេទខុស នាំឱ្យការគិតខុសទាំងស្រុង។</span>
          </div>
        </div>
      </div>`
    },
    'slide-4': {
      title: "គោលបំណងសិក្សាដែលអាចវាស់វែងបាន",
      segment: "ផ្នែកទី ១៖ ស្វាគមន៍ & រំលឹកចំណេះដឹង (០០:០០ - ១០:០០)",
      notes: "កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):\n\"នេះជាគោលដៅសិក្សាជាក់ស្តែងចំនួន ៤ សម្រាប់ថ្ងៃទី ៤ របស់យើង។\nនៅចុងបញ្ចប់នៃនាទីទី ៩០ ថ្ងៃនេះ អ្នកនឹងអាច៖\n១. ពន្យល់ពីទំនាក់ទំនងរវាង ទិន្នន័យ (Data), សំណួរប្រៀបធៀប (Condition), និងលទ្ធផល ពិត/មិនពិត (True/False)។\n២. ស្ទាត់ជំនាញលើសញ្ញាប្រៀបធៀបគ្រឹះទាំង ៦៖ =, <>, >, <, >=, <= លើទិន្នន័យលេខ អត្ថបទ និងកាលបរិច្ឆេទ។\n៣. វិភាគគ្រោះថ្នាក់នៃ 'សំណួរដែលមិនបានសួរ'—ដូចជាមូលហេតុដែលឧបករណ៍វាស់សម្ពាធនៅ Apex Plastics បានផ្ទុះបែកដោយសារគ្មានអ្នកសរសេរលក្ខខណ្ឌ!\n៤. សរសេរកន្សោមលក្ខខណ្ឌ Power Fx យ៉ាងច្បាស់លាស់ និងត្រឹមត្រូវព្រមទាំងពន្យល់ពីតម្លៃនៃផ្នែកសងខាងនៃសមីការ។\"",
      content: `<div class="slide-header">
        <span class="slide-badge green-badge">សមត្ថភាពគោលដៅ</span>
        <h2 class="slide-title">គោលបំណងសិក្សាដែលអាចវាស់វែងបានទាំង ៤ សម្រាប់ថ្ងៃទី ៤</h2>
        <p class="slide-lead">នៅចុងបញ្ចប់នៃវគ្គសិក្សា ៩០ នាទីនេះ អ្នកនឹងបង្ហាញសមត្ថភាពជាក់ស្តែងទាំង ៤ នេះដោយឯករាជ្យ៖</p>
      </div>

      <div class="grid-2-col">
        <div class="objective-card">
          <div class="obj-badge">OBJ 1 • ការយល់ដឹងស៊ីជម្រៅ</div>
          <h3>កំណត់អត្ថន័យនៃ "លក្ខខណ្ឌ" ជាសំណួរ</h3>
          <p>ពន្យល់បានថាលក្ខខណ្ឌមិនមែនជាសកម្មភាព ឬការសម្រេចចិត្តឡើយ។ វាគឺជាសំណួរប្រៀបធៀបទិន្នន័យដែលផ្តល់ចម្លើយយ៉ាងតឹងរ៉ឹងត្រឹមតែ <strong>ពិត (True)</strong> ឬ <strong>មិនពិត (False)</strong> ប៉ុណ្ណោះ។</p>
        </div>

        <div class="objective-card">
          <div class="obj-badge">OBJ 2 • វាក្យសម្ព័ន្ធបច្ចេកទេស</div>
          <h3>ស្ទាត់ជំនាញលើសញ្ញាប្រៀបធៀបទាំង ៦</h3>
          <p>ប្រើប្រាស់សញ្ញាប្រៀបធៀបទូទៅទាំង ៦ (<code>=</code>, <code>&lt;&gt;</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>) យ៉ាងត្រឹមត្រូវរវាងទិន្នន័យលេខ អត្ថបទ និងកាលបរិច្ឆេទដោយគ្មានកំហុសប្រភេទ។</p>
        </div>

        <div class="objective-card">
          <div class="obj-badge">OBJ 3 • ការដោះស្រាយបញ្ហាជាក់ស្តែង</div>
          <h3>វិភាគគ្រោះមហន្តរាយនៃសំណួរដែលមិនបានសួរ</h3>
          <p>វិភាគលើករណីជាក់ស្តែងនៃរោងចក្រផលិតកម្ម Apex Plastics៖ ពន្យល់ពីមូលហេតុដែលការមានទិន្នន័យសុក្រឹតតែមួយមុខ ប៉ុន្តែមិនបានសួរលក្ខខណ្ឌ បានបង្កឱ្យខូចខាតអស់ ៤២,០០០ ដុល្លារ។</p>
        </div>

        <div class="objective-card">
          <div class="obj-badge">OBJ 4 • ការអនុវត្ត Power Fx</div>
          <h3>បង្កើតកន្សោមលក្ខខណ្ឌ Power Fx ត្រឹមត្រូវ</h3>
          <p>បម្លែងច្បាប់អាជីវកម្មមនុស្សទៅជាលក្ខខណ្ឌកូដ <code>Value(txtCost.Text) &gt; 500</code> និង <code>IsBlank(txtOperator.Text)</code> ដោយស្វែងយល់គ្រប់អាគុយម៉ង់ទាំងអស់។</p>
        </div>
      </div>`
    },
    'slide-5': {
      title: "កាលវិភាគ ៩០ នាទីលម្អិត",
      segment: "ផ្នែកទី ១៖ ស្វាគមន៍ & រំលឹកចំណេះដឹង (០០:០០ - ១០:០០)",
      notes: "កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):\n\"នេះជាផែនទីបង្ហាញផ្លូវ ៩០ នាទីដ៏ហ្មត់ចត់របស់យើង។\nយើងចំណាយពេល ១០ នាទីដំបូងលើការស្វាគមន៍ និងរំលឹកចំណេះដឹងចាស់។\nពីនាទីទី ១០ ដល់ ២៥ យើងពិនិត្យមើលគ្រោះមហន្តរាយ ៤២,០០០ ដុល្លារនៅ Apex Plastics និងស្វែងយល់ពីឧបមាឧបករណ៍វាស់កម្ពស់ជិះរទេះភ្លើង។\nពីនាទីទី ២៥ ដល់ ៤៥ យើងស្ទាត់ជំនាញលើសំណួរប្រៀបធៀបទាំង ៦ និងរបៀបប្រៀបធៀបលេខ អត្ថបទ និងកាលបរិច្ឆេទ។\nពីនាទីទី ៤៥ ដល់ ៦០ ខ្ញុំនឹងបង្ហាញការពិសោធន៍ផ្ទាល់នៅលើ Condition Workbench។\nពីនាទីទី ៦០ ដល់ ៧៥ អ្នកទាំងអស់គ្នានឹងអនុវត្តជាក់ស្តែងក្នុងការវាយតម្លៃលក្ខខណ្ឌសុវត្ថិភាពរោងចក្រ។\nនិង ១៥ នាទីចុងក្រោយ គឺជាការត្រួតពិនិត្យចំណេះដឹង ការដាក់ពិន្ទុបញ្ហាប្រឈមចុងក្រោយ និងការភ្ជាប់ស្ពានទៅកាន់លក្ខខណ្ឌ IF នៃថ្ងៃទី ៥។\"",
      content: `<div class="slide-header">
        <span class="slide-badge purple-badge">រចនាសម្ព័ន្ធមេរៀន</span>
        <h2 class="slide-title">របៀបវារៈ ៩០ នាទីតាមវិធីសាស្ត្រ Spiral Learning</h2>
        <p class="slide-lead">ដំណើរការគរុកោសល្យប្រកបដោយតុល្យភាព ចាប់ពីការវិភាគកំហុសជាក់ស្តែងក្នុងរោងចក្រ រហូតដល់ការសរសេរលក្ខខណ្ឌដោយដៃផ្ទាល់។</p>
      </div>

      <div class="agenda-timeline-grid">
        <div class="agenda-row">
          <div class="agenda-time">០០:០០ - ១០:០០ (១០នាទី)</div>
          <div class="agenda-topic">
            <strong>ផ្នែកទី ១៖ ស្វាគមន៍ &amp; រំលឹកចំណេះដឹងចាស់</strong>
            <span>ភ្ជាប់ពីទិន្នន័យថ្ងៃទី ៣ មកកាន់លក្ខខណ្ឌថ្ងៃនេះ និងកំណត់គោលដៅសិក្សាទាំង ៤។</span>
          </div>
          <div class="agenda-tag tag-intro">តម្រង់ទិស</div>
        </div>

        <div class="agenda-row">
          <div class="agenda-time">១០:០០ - ២៥:០០ (១៥នាទី)</div>
          <div class="agenda-topic">
            <strong>ផ្នែកទី ២៖ ហេតុអ្វីបានជាលក្ខខណ្ឌត្រូវតែមាន?</strong>
            <span>ករណីសិក្សាការផ្ទុះស៊ីឡាំង ៤២,០០០ ដុល្លារនៅ Apex Plastics &amp; ឧបមាឧបករណ៍វាស់កម្ពស់។</span>
          </div>
          <div class="agenda-tag tag-why">ស្វែងយល់ហេតុផល</div>
        </div>

        <div class="agenda-row">
          <div class="agenda-time">២៥:០០ - ៤៥:០០ (២០នាទី)</div>
          <div class="agenda-topic">
            <strong>ផ្នែកទី ៣៖ សញ្ញាសំណួរប្រៀបធៀបទាំង ៦</strong>
            <span>រៀនសញ្ញា <code>=</code>, <code>&lt;&gt;</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code> និងការប្រៀបធៀបប្រភេទផ្សេងៗគ្នា។</span>
          </div>
          <div class="agenda-tag tag-core">ចំណុចស្នូល</div>
        </div>

        <div class="agenda-row">
          <div class="agenda-time">៤៥:០០ - ៦០:០០ (១៥នាទី)</div>
          <div class="agenda-topic">
            <strong>ផ្នែកទី ៤៖ ការបង្ហាញផ្ទាល់ដោយគ្រូបណ្តុះបណ្តាល</strong>
            <span>ការពិសោធន៍ផ្ទាល់នៅលើផ្ទាំង Interactive Condition Workbench ជាមួយឧបករណ៍ចាប់សញ្ញាសម្ពាធ។</span>
          </div>
          <div class="agenda-tag tag-demo">ការបង្ហាញផ្ទាល់</div>
        </div>

        <div class="agenda-row">
          <div class="agenda-time">៦០:០០ - ៧៥:០០ (១៥នាទី)</div>
          <div class="agenda-topic">
            <strong>ផ្នែកទី ៥៖ សិក្ខាកាមអនុវត្តជាក់ស្តែង</strong>
            <span>វាយតម្លៃលក្ខខណ្ឌសុវត្ថិភាពទាំង ៦ នៃម៉ាស៊ីន Extruder #4 នៅលើផ្ទាំង Truth Evaluator។</span>
          </div>
          <div class="agenda-tag tag-hands">អនុវត្តផ្ទាល់</div>
        </div>

        <div class="agenda-row">
          <div class="agenda-time">៧៥:០០ - ៩០:០០ (១៥នាទី)</div>
          <div class="agenda-topic">
            <strong>ផ្នែកទី ៦៖ ការវាយតម្លៃ &amp; ស្ពានទៅថ្ងៃបន្ទាប់</strong>
            <span>សំណួរត្រួតពិនិត្យ ៥ សំណួរ, លំហាត់ Quality Gate, និងការត្រួសត្រាយផ្លូវទៅកាន់ IF() ថ្ងៃទី ៥។</span>
          </div>
          <div class="agenda-tag tag-bridge">វាយតម្លៃ &amp; ស្ពាន</div>
        </div>
      </div>`
    },
    'slide-6': {
      title: "បញ្ហានៅកន្លែងធ្វើការ៖ ការផ្ទុះខូចខាត $42,000",
      segment: "ផ្នែកទី ២៖ ហេតុអ្វីបានជាលក្ខខណ្ឌត្រូវតែមាន? (១០:០០ - ២៥:០០)",
      notes: "កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):\n\"សូមក្រឡេកមើលរោងចក្រ Apex Plastics នៅម៉ោង ០២:០០ យប់ក្នុងវេនការងារពេលយប់។\nម៉ាស៊ីនចាក់ពុម្ពប្លាស្ទិកលេខ ៤ មានថេប្លេតឌីជីថលមួយបង្ហាញទិន្នន័យម៉ាស៊ីន។\nនៅលើអេក្រង់បង្ហាញយ៉ាងច្បាស់៖ សម្ពាធធារាសាស្ត្រ (Hydraulic Pressure)៖ ២៤៥ PSI។\nម៉ាស៊ីនមានទិន្នន័យ (DATA)។ ទិន្នន័យនោះគឺសុក្រឹត ១០០%។\nចុះហេតុអ្វីបានជា ២០ នាទីក្រោយមក ស៊ីឡាំងប្រេងបានផ្ទុះបែក បណ្តាលឱ្យប្រេះពុម្ពដែកថែបតម្លៃ ៤២,០០០ ដុល្លារ ហើយរោងចក្រទាំងមូលត្រូវផ្អាកដំណើរការ?\nពីព្រោះតែកម្មវិធីគ្រាន់តែបង្ហាញទិន្នន័យប៉ុណ្ណោះ!\nកម្មវិធីមិនដែលបានចោទសួរជាសំណួរឡើយ!\nគ្មានអ្នកណាម្នាក់បានសរសេរលក្ខខណ្ឌ៖ 'តើសម្ពាធ > ២០០ ឬទេ?' ឡើយ!\nដោយសារសំណួរមិនដែលត្រូវបានសួរ ចម្លើយ TRUE (ពិត) ក៏មិនដែលត្រូវបានបង្កើត!\nហើយដោយសារ TRUE មិនដែលត្រូវបានបង្កើត សំឡេងរោទិ៍អាសន្នក៏មិនដែលបន្លឺឡើង!\nទិន្នន័យដែលស្ថិតនៅអសកម្មលើអេក្រង់មិនអាចជួយសង្គ្រោះនរណាម្នាក់បានឡើយ។ កម្មវិធីត្រូវតែសួរលក្ខខណ្ឌអំពីទិន្នន័យរបស់វាជាប្រចាំ!\"",
      content: `<div class="slide-header">
        <span class="slide-badge red-badge">ករណីសិក្សានៅកន្លែងការងារ</span>
        <h2 class="slide-title">Apex Plastics៖ មហន្តរាយ $42,000 នៃ "សំណួរដែលមិនបានសួរ"</h2>
        <p class="slide-lead">របៀបដែលការមានទិន្នន័យសុក្រឹត ប៉ុន្តែខកខានមិនបានសួរលក្ខខណ្ឌ បានបង្កឱ្យមានការផ្ទុះធ្លាយពុម្ពដែកយ៉ាងធ្ងន់ធ្ងរ។</p>
      </div>

      <div class="story-case-box">
        <div class="story-header">
          <span class="warning-icon">&#9888;</span>
          <div>
            <h3 style="margin:0; color:#fb7185;">របាយការណ៍ឧបទ្ទវហេតុ៖ ការផ្ទុះស៊ីឡាំងធារាសាស្ត្រ និងខូចខាតពុម្ពដែកថែប</h3>
            <span style="font-size:0.8rem; color:var(--text-muted);">ម៉ាស៊ីន Injection Molding #4 &bull; វេនយប់ម៉ោង ០២:០០ &bull; ការខូចខាតសរុប៖ $42,000</span>
          </div>
        </div>

        <div class="story-body-grid">
          <div class="story-col">
            <h4 style="color: #93c5fd;">អ្វីដែលបានកើតឡើងពិតប្រាកដ</h4>
            <p>ឧបករណ៍ចាប់សញ្ញាបានអានតម្លៃសម្ពាធធារាសាស្ត្រឃើញ <strong>245 PSI</strong>។ កម្មវិធីបានបង្ហាញលេខ <code>245</code> យ៉ាងត្រឹមត្រូវនៅលើអេក្រង់ថេប្លេត។ ប្រតិបត្តិករកំពុងរវល់រៀបចំប៉ាឡែតនៅចុងម្ខាងទៀតនៃរោងចក្រ។ ម្ភៃនាទីក្រោយមក ស៊ីឡាំងបានផ្ទុះឡើងដោយសារសម្ពាធលើសកម្រិត ២០០ PSI!</p>
          </div>
          <div class="story-col">
            <h4 style="color: #fb7185;">មូលហេតុពិតប្រាកដនៃការបរាជ័យ (RCA)</h4>
            <p>កម្មវិធីមាន <strong>ទិន្នន័យ (Data)</strong> ប៉ុន្តែវាគ្មាន <strong>សំណួរ (Condition)</strong> ឡើយ! គ្មានអ្នកសរសេរកូដណាបានសួរថាតើ <code>Pressure &gt; 200</code> នោះទេ។ ដោយសារគ្មានសំណួរ វាក៏មិនដែលបង្កើតចម្លើយ <strong>TRUE</strong> ដើម្បីដំណើរការសកម្មភាព (Trigger Action)បិទម៉ាស៊ីនស្វ័យប្រវត្តិ ឬបន្លឺស៊ីរ៉ែននោះដែរ!</p>
          </div>
        </div>

        <div class="story-moral-banner">
          <span>&#128161;</span>
          <div>
            <strong>ច្បាប់មាសនៃតក្កវិជ្ជារបស់កម្មវិធី៖</strong>
            <span>ទិន្នន័យអសកម្មមិនអាចការពារអាជីវកម្មបានឡើយ។ កម្មវិធីឆ្លាតវៃត្រូវតែយកទិន្នន័យនោះមក <em>សួរលក្ខខណ្ឌប្រៀបធៀប</em> ដើម្បីស្វែងរកការពិត!</span>
          </div>
        </div>
      </div>`
    },
    'slide-7': {
      title: "គំនិតសាមញ្ញ៖ តើអ្វីជាលក្ខខណ្ឌ?",
      segment: "ផ្នែកទី ២៖ ហេតុអ្វីបានជាលក្ខខណ្ឌត្រូវតែមាន? (១០:០០ - ២៥:០០)",
      notes: "កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):\n\"មុនពេលយើងក្រឡេកមើលកូដកុំព្យូទ័រ ចូរយើងយល់ថាតើ លក្ខខណ្ឌ (Condition) គឺជាអ្វីជាភាសាខ្មែរសាមញ្ញ។\nលក្ខខណ្ឌ គឺជា សំណួរ ដែលចោទសួរអំពីទិន្នន័យ ដែលមានចម្លើយតែ ពីរគត់ ដែលអាចកើតឡើងបាន៖\nបាទ/ចាស ឬ ទេ (YES ឬ NO)។\nពិត ឬ មិនពិត (TRUE ឬ FALSE)។\nសូមកត់សម្គាល់៖ លក្ខខណ្ឌ មិនមែន ជាសកម្មភាពឡើយ។ លក្ខខណ្ឌមិនផ្ញើអ៊ីមែលទេ។ លក្ខខណ្ឌមិនបិទវ៉ានប្រេងទេ។\nលក្ខខណ្ឌគ្រាន់តែជាសំណួរថា៖\nតើសីតុណ្ហភាពលើសពី ១០០ ដឺក្រេឬទេ?\nតើប្រអប់ឈ្មោះអ្នកប្រើប្រាស់ទទេឬទេ?\nតើថ្ងៃដឹកជញ្ជូនមុនថ្ងៃនេះឬទេ?\nប្រសិនបើអ្នកសួរថា 'តើអ្នកចូលចិត្តពណ៌អ្វី?' នោះមិនមែនជាលក្ខខណ្ឌឡើយ ព្រោះវាមានចម្លើយរាប់ពាន់!\nលក្ខខណ្ឌគឺជាសំណួរបិទយ៉ាងម៉ឺងម៉ាត់ ដែលផ្តល់ចម្លើយត្រឹមតែ ពិត (TRUE) ឬ មិនពិត (FALSE) ប៉ុណ្ណោះ!\"",
      content: `<div class="slide-header">
        <span class="slide-badge blue-badge">គំរូគំនិតស្នូល</span>
        <h2 class="slide-title">ភាសាសាមញ្ញ៖ តើអ្វីជា "លក្ខខណ្ឌ" (Condition)?</h2>
        <p class="slide-lead">លក្ខខណ្ឌមិនមែនជាសកម្មភាព ឬការសម្រេចចិត្តឡើយ។ វាគឺជាសំណួរដែលផ្តល់លទ្ធផលយ៉ាងតឹងរ៉ឹងត្រឹមតែ ពិត ឬ មិនពិត។</p>
      </div>

      <div class="grid-2-col" style="gap: 1.5rem;">
        <div class="concept-card">
          <div class="concept-badge red-badge">&#10060; សំណួរបើកចំហ (មិនមែនជាលក្ខខណ្ឌ)</div>
          <h3>សំណួរអត្តនោម័តដែលមានចម្លើយច្រើនរាប់មិនអស់</h3>
          <p>សំណួរទាំងនេះមិនអាចឱ្យកុំព្យូទ័រវាយតម្លៃបានភ្លាមៗទេ ព្រោះវាទាមទារការបកស្រាយ៖</p>
          <ul class="concept-list">
            <li><em>"តើម៉ាស៊ីនដំណើរការក្តៅខ្លាំងពេកឬទេ?"</em> (តើពាក្យ 'ក្តៅខ្លាំងពេក' សំដៅលើប៉ុន្មាន?)</li>
            <li><em>"តើប្រតិបត្តិករជានរណា?"</em> (ចម្លើយអាចជាឈ្មោះមនុស្សរាប់ពាន់នាក់)</li>
            <li><em>"តើស្ថានភាពការងារយ៉ាងម៉េចដែរ?"</em> (ចម្លើយជាមតិមិនច្បាស់លាស់)</li>
          </ul>
          <div class="concept-verdict verdict-bad">កុំព្យូទ័រមិនអាចសម្រេចចិត្តបានឡើយ!</div>
        </div>

        <div class="concept-card">
          <div class="concept-badge green-badge">&#9989; លក្ខខណ្ឌបិទយ៉ាងតឹងរ៉ឹង (លក្ខខណ្ឌកុំព្យូទ័រ)</div>
          <h3>សំណួរប្រៀបធៀបដែលផ្តល់ចម្លើយ TRUE ឬ FALSE</h3>
          <p>សំណួរដែលប្រៀបធៀបទិន្នន័យជាក់លាក់ទល់នឹងកម្រិតស្តង់ដារ៖</p>
          <ul class="concept-list">
            <li><em>"តើសីតុណ្ហភាព &gt; ១០០ ដឺក្រេឬទេ?"</em> &rarr; <strong>TRUE ឬ FALSE</strong></li>
            <li><em>"តើប្រអប់ឈ្មោះទទេ (IsBlank) ឬទេ?"</em> &rarr; <strong>TRUE ឬ FALSE</strong></li>
            <li><em>"តើកាលបរិច្ឆេទ &lt; ថ្ងៃនេះឬទេ?"</em> &rarr; <strong>TRUE ឬ FALSE</strong></li>
          </ul>
          <div class="concept-verdict verdict-good">ផ្តល់ចម្លើយជាក់លាក់៖ ពិត (TRUE) ឬ មិនពិត (FALSE)!</div>
        </div>
      </div>`
    },
    'slide-8': {
      title: "ឧបមាជីវិតប្រចាំថ្ងៃ៖ ឧបករណ៍វាស់កម្ពស់រទេះភ្លើង",
      segment: "ផ្នែកទី ២៖ ហេតុអ្វីបានជាលក្ខខណ្ឌត្រូវតែមាន? (១០:០០ - ២៥:០០)",
      notes: "កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):\n\"ដើម្បីធ្វើឱ្យអ្នកចងចាំលក្ខខណ្ឌមិនភ្លេច ចូរស្រមៃមើលច្រកចូលរទេះភ្លើងក្រឡាប់ចាក់ដ៏ធំមួយនៅក្នុងសួនកម្សាន្ត។\nនៅមាត់ទ្វារមានបង្គោលឈើមួយដែលមានគូសបន្ទាត់ក្រហមកម្ពស់ ៤៨ អ៊ីញយ៉ាងច្បាស់។\nក្មេងអាយុ ៧ ឆ្នាំម្នាក់ដើរមករកបង្គោលនោះ។\nតើកម្ពស់របស់ក្មេងនោះជាអ្វី? នោះគឺជា ទិន្នន័យ (DATA)៖ ៥០ អ៊ីញ!\nតើបន្ទាត់ក្រហមនៅលើបង្គោលជាអ្វី? នោះជា កម្រិតស្តង់ដារ (BENCHMARK)៖ ៤៨ អ៊ីញ!\nតើបុគ្គលិកយាមទ្វារធ្វើអ្វី? គាត់សួរនូវ លក្ខខណ្ឌ (CONDITION)៖\n'តើកម្ពស់ក្មេង >= ៤៨ អ៊ីញ ឬទេ?'\n៥០ >= ៤៨ វាយតម្លៃចេញជាលទ្ធផល៖ TRUE (ពិត)!\nដោយសារចម្លើយគឺ TRUE ក្មេងនោះអាចដើរចូលជិះរទេះភ្លើងបាន!\nចុះបើក្មេងតូចម្នាក់ទៀតដើរមកដែលមានកម្ពស់តែ ៤០ អ៊ីញ?\n៤០ >= ៤៨ វាយតម្លៃចេញជាលទ្ធផល៖ FALSE (មិនពិត)!\nដោយសារចម្លើយគឺ FALSE បុគ្គលិកនិយាយថា 'សុំទោស អូនមិនអាចជិះបានទេថ្ងៃនេះ'។\nសូមកត់សម្គាល់៖ បង្គោលឈើមិនបានទាញក្មេងឡើងជិះរទេះភ្លើងដោយខ្លួនឯងទេ។ បង្គោលឈើគ្រាន់តែចោទសួរសំណួរប្រៀបធៀបប៉ុណ្ណោះ!\"",
      content: `<div class="slide-header">
        <span class="slide-badge gold-badge">ឧបមាជីវិតជាក់ស្តែង</span>
        <h2 class="slide-title">ឧបមាជីវិតប្រចាំថ្ងៃ៖ បង្គោលវាស់កម្ពស់រទេះភ្លើងកម្សាន្ត</h2>
        <p class="slide-lead">លក្ខខណ្ឌប្រៀបធៀបទិន្នន័យពិតប្រាកដទល់នឹងស្តង់ដារកំណត់ ដើម្បីបង្កើតការវិនិច្ឆ័យ ជាប់ ឬ ធ្លាក់ ភ្លាមៗ។</p>
      </div>

      <div class="rollercoaster-analogy-box">
        <div class="analogy-step">
          <div class="step-circle blue-circle">១</div>
          <div class="step-desc">
            <strong>ទិន្នន័យពិត (ក្មេង)</strong>
            <span>កម្ពស់ជាក់ស្តែងដែលក្មេងមាន៖ <code>៥០ អ៊ីញ</code> (នេះជា Data)</span>
          </div>
        </div>

        <span class="analogy-arrow">&rarr;</span>

        <div class="analogy-step">
          <div class="step-circle purple-circle">២</div>
          <div class="step-desc">
            <strong>កម្រិតបន្ទាត់ស្តង់ដារ</strong>
            <span>បន្ទាត់ក្រហមសុវត្ថិភាពដែលបានគូស៖ <code>៤៨ អ៊ីញ</code> (កម្រិត Benchmark)</span>
          </div>
        </div>

        <span class="analogy-arrow">&rarr;</span>

        <div class="analogy-step">
          <div class="step-circle gold-circle">៣</div>
          <div class="step-desc">
            <strong>សំណួរលក្ខខណ្ឌ</strong>
            <span><em>"តើកម្ពស់ &gt;= ៤៨ អ៊ីញ ឬទេ?"</em> (នេះជា Condition)</span>
          </div>
        </div>

        <span class="analogy-arrow">&rarr;</span>

        <div class="analogy-step">
          <div class="step-circle green-circle">៤</div>
          <div class="step-desc">
            <strong>លទ្ធផល Boolean</strong>
            <span>៥០ &gt;= ៤៨ &rarr; <strong>TRUE (ពិត)</strong> &rarr; អនុញ្ញាតឱ្យឡើងជិះ!</span>
          </div>
        </div>
      </div>

      <div class="analogy-insight-box">
        <h4>&#128065; ការយល់ដឹងគរុកោសល្យដ៏សំខាន់៖</h4>
        <p>បង្គោលឈើមិនដែលសម្រេចចិត្ត ឬទាញក្មេងឡើងជិះដោយខ្លួនឯងឡើយ។ បង្គោលឈើគ្រាន់តែជា <strong>ឧបករណ៍ប្រៀបធៀប</strong> ប៉ុណ្ណោះ។ ចម្លើយ ពិត/មិនពិត ដែលវាផលិតបាន គឺជាអ្វីដែលបុគ្គលិកយកទៅប្រើដើម្បីសម្រេចចិត្ត!</p>
      </div>`
    },
    'slide-9': {
      title: "សញ្ញាសំណួរប្រៀបធៀបទាំង ៦",
      segment: "ផ្នែកទី ៣៖ សញ្ញាសំណួរប្រៀបធៀបទាំង ៦ (២៥:០០ - ៤៥:០០)",
      notes: "កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):\n\"តើកម្មវិធីចោទសួរអំពីទិន្នន័យយ៉ាងដូចម្តេច?\nតាមរយៈសញ្ញាប្រៀបធៀបសកលទាំង ៦ នេះ!\nគ្រប់ភាសាសរសេរកូដទាំងអស់ រាល់រូបមន្ត Excel និង Power Apps សុទ្ធតែប្រើប្រាស់សញ្ញាទាំង ៦ នេះដូចៗគ្នា៖\n១. ស្មើនឹង៖ = (តើស្ថានភាពស្មើនឹង 'Approved' ឬទេ?)\n២. មិនស្មើនឹង៖ <> (តើស្ថានភាពមិនស្មើនឹង 'Closed' ឬទេ?)\n៣. ធំជាង៖ > (តើសម្ពាធធំជាង ២០០ ឬទេ?)\n៤. តូចជាង៖ < (តើចំនួនស្តុកដែលនៅសល់តូចជាង ១០ ឬទេ?)\n៥. ធំជាង ឬស្មើ៖ >= (តើអាយុ ១៨ ឆ្នាំឡើងទៅឬទេ?)\n៦. តូចជាង ឬស្មើ៖ <= (តើសីតុណ្ហភាព ១០០ ដឺក្រេចុះក្រោមឬទេ?)\nរាល់លក្ខខណ្ឌទាំងអស់ដែលអ្នកនឹងសរសេរក្នុងអាជីពជាអ្នកបង្កើតកម្មវិធី គឺកើតចេញពីសំណួរទាំង ៦ នេះទាំងអស់!\"",
      content: `<div class="slide-header">
        <span class="slide-badge purple-badge">វេយ្យាករណ៍បច្ចេកទេស</span>
        <h2 class="slide-title">សញ្ញាសំណួរប្រៀបធៀបគ្រឹះទាំង ៦ (Comparison Operators)</h2>
        <p class="slide-lead">នៅក្នុង Power Apps និង Excel គ្រប់លក្ខខណ្ឌទាំងអស់ត្រូវបានបង្កើតឡើងដោយប្រើប្រាស់សញ្ញាទំនាក់ទំនងណាមួយក្នុងចំណោមសញ្ញាទាំង ៦ នេះ។</p>
      </div>

      <div class="types-table-wrapper">
        <table class="types-table">
          <thead>
            <tr>
              <th>សញ្ញា</th>
              <th>សំណួរជាភាសាសាមញ្ញ</th>
              <th>ឧទាហរណ៍ជាក់ស្តែងក្នុងរោងចក្រ</th>
              <th>លទ្ធផល Boolean</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>=</code></td>
              <td>តើស្មើនឹងតម្លៃនេះឬទេ?</td>
              <td><code>Status = "Approved"</code></td>
              <td><span class="badge-bool-true">TRUE ឬ FALSE</span></td>
            </tr>
            <tr>
              <td><code>&lt;&gt;</code></td>
              <td>តើមិនស្មើ ឬខុសពីតម្លៃនេះឬទេ?</td>
              <td><code>LineStatus &lt;&gt; "Halted"</code></td>
              <td><span class="badge-bool-true">TRUE ឬ FALSE</span></td>
            </tr>
            <tr>
              <td><code>&gt;</code></td>
              <td>តើធំជាងកម្រិតនេះឬទេ?</td>
              <td><code>Pressure &gt; 200</code></td>
              <td><span class="badge-bool-true">TRUE ឬ FALSE</span></td>
            </tr>
            <tr>
              <td><code>&lt;</code></td>
              <td>តើតូចជាងកម្រិតនេះឬទេ?</td>
              <td><code>ResinInventory &lt; 50</code></td>
              <td><span class="badge-bool-true">TRUE ឬ FALSE</span></td>
            </tr>
            <tr>
              <td><code>&gt;=</code></td>
              <td>តើធំជាង ឬស្មើនឹងកម្រិតនេះឬទេ?</td>
              <td><code>CycleTime &gt;= 45.0</code></td>
              <td><span class="badge-bool-true">TRUE ឬ FALSE</span></td>
            </tr>
            <tr>
              <td><code>&lt;=</code></td>
              <td>តើតូចជាង ឬស្មើនឹងកម្រិតនេះឬទេ?</td>
              <td><code>RejectionRate &lt;= 0.02</code></td>
              <td><span class="badge-bool-true">TRUE ឬ FALSE</span></td>
            </tr>
          </tbody>
        </table>
      </div>`
    },
    'slide-10': {
      title: "ការប្រៀបធៀបប្រភេទផ្សេងៗគ្នា",
      segment: "ផ្នែកទី ៣៖ សញ្ញាសំណួរប្រៀបធៀបទាំង ៦ (២៥:០០ - ៤៥:០០)",
      notes: "កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):\n\"ឥឡូវនេះ ចូរយើងភ្ជាប់សំណួរប្រៀបធៀបថ្ងៃនេះ ទៅកាន់ប្រភេទកុងតឺន័រទិន្នន័យទាំង ៤ កាលពីម្សិលមិញ!\nតើអ្នកប្រៀបធៀបទិន្នន័យលេខ (Number) យ៉ាងដូចម្តេច?\nប្រើសញ្ញាគណិតវិទ្យា៖ 245 > 200 ផ្តល់លទ្ធផលថា True។\nតើអ្នកប្រៀបធៀបទិន្នន័យអត្ថបទ (Text) យ៉ាងដូចម្តេច?\nត្រូវតែដាក់អត្ថបទក្នុងសញ្ញាសម្រង់ពីរជានិច្ច៖ txtDepartment.Text = 'Plastics'។\nចុះបើអក្សរធំនិងអក្សរតូចខុសគ្នា? ក្នុង Power Apps 'apex' = 'APEX' ផ្តល់លទ្ធផល True ព្រោះវាប្រៀបធៀបមិនប្រកាន់អក្សរតូចធំឡើយ!\nតើអ្នកប្រៀបធៀបកាលបរិច្ឆេទ (Date) យ៉ាងដូចម្តេច?\nកាលបរិច្ឆេទអាចមុន ឬក្រោយ៖ dpIncidentDate.SelectedDate < Today() សួរថា៖ តើឧបទ្ទវហេតុនេះបានកើតឡើងក្នុងអតីតកាលឬទេ?\nតើអ្នកប្រៀបធៀបប៊ូលីន (Boolean) យ៉ាងដូចម្តេច?\nchkEmergency.Value = true សួរថា៖ តើកុងតាក់អាសន្នត្រូវបានបើក (ON) ឬទេ?\nចំណាំ៖ អ្នកត្រូវតែប្រៀបធៀបប្រភេទដូចគ្នា។ អ្នកមិនអាចសួរថាតើ ៥០ ធំជាង 'ផ្លែប៉ោម' ឬទេនោះឡើយ!\"",
      content: `<div class="slide-header">
        <span class="slide-badge gold-badge">ច្បាប់ឆ្លងប្រភេទ</span>
        <h2 class="slide-title">របៀបដែលប្រភេទទិន្នន័យផ្សេងៗឆ្លើយតបនឹងសំណួរ</h2>
        <p class="slide-lead">លក្ខខណ្ឌអាចដំណើរការលើលេខ, ខ្សែអក្សរ, កាលបរិច្ឆេទក្នុងប្រតិទិន, និងកុងតាក់បិទបើក។</p>
      </div>

      <div class="pantry-grid">
        <div class="pantry-jar border-num">
          <div class="jar-icon">&#128290;</div>
          <h4>ការប្រៀបធៀបលេខ (Numbers)</h4>
          <span class="jar-substance">បរិមាណ &amp; ការរាប់ចំនួន</span>
          <p>ប្រៀបធៀបតាមបែបគណិតវិទ្យា។</p>
          <div class="jar-example"><code>245 &gt; 200 ➔ TRUE</code></div>
        </div>

        <div class="pantry-jar border-text">
          <div class="jar-icon">&#128221;</div>
          <h4>ការប្រៀបធៀបអត្ថបទ (Text)</h4>
          <span class="jar-substance">ឈ្មោះ, កូដ, និងស្ថានភាព</span>
          <p>ប្រៀបធៀបខ្សែអក្សរជាក់លាក់។</p>
          <div class="jar-example"><code>"Molding" = "Molding" ➔ TRUE</code></div>
        </div>

        <div class="pantry-jar border-date">
          <div class="jar-icon">&#128197;</div>
          <h4>ការប្រៀបធៀបកាលបរិច្ឆេទ (Dates)</h4>
          <span class="jar-substance">ពេលវេលា, អតីត, អនាគត</span>
          <p>ប្រៀបធៀបមុន (&lt;) និងក្រោយ (&gt;)។</p>
          <div class="jar-example"><code>Date &lt; Today() ➔ TRUE</code></div>
        </div>

        <div class="pantry-jar border-bool">
          <div class="jar-icon">&#9989;</div>
          <h4>ការប្រៀបធៀបប៊ូលីន (Boolean)</h4>
          <span class="jar-substance">កុងតាក់ បាទ/ទេ &bull; បើក/បិទ</span>
          <p>ប្រៀបធៀបទង់ពិត/មិនពិត។</p>
          <div class="jar-example"><code>chkHazard.Value = true ➔ TRUE</code></div>
        </div>
      </div>`
    },
    'slide-11': {
      title: "រចនាសម្ព័ន្ធនៃលំហូរលក្ខខណ្ឌ (Condition Flow Structure)",
      segment: "ផ្នែកទី ៣៖ សញ្ញាសំណួរប្រៀបធៀបទាំង ៦ (២៥:០០ - ៤៥:០០)",
      notes: "កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):\n\"សូមក្រឡេកមើលរចនាសម្ព័ន្ធ (Structure) ៣ ផ្នែកនៃគ្រប់លក្ខខណ្ឌនៅលើអេក្រង់៖\nផ្នែកទី ១៖ ផ្នែកខាងឆ្វេង (LEFT SIDE) — នេះជាទិន្នន័យជាក់ស្តែងពីកម្មវិធីរបស់អ្នក (ឧទាហរណ៍៖ txtDowntime.Text)។\nផ្នែកទី ២៖ សញ្ញាប្រៀបធៀប (OPERATOR) — នេះជាសញ្ញាសួរប្រៀបធៀប (ឧទាហរណ៍៖ >)។\nផ្នែកទី ៣៖ ផ្នែកខាងស្តាំ (RIGHT SIDE) — នេះជាកម្រិតស្តង់ដារ ឬរបាំងកំណត់ (ឧទាហរណ៍៖ ៤)។\nនៅពេលដែលកុំព្យូទ័រវាយតម្លៃសមីការនេះ៖\nតើ ៥.៥ ធំជាង ៤ ឬទេ?\nវានឹងបង្កើតតម្លៃតែ មួយគត់ នៅក្នុងសតិចងចាំ៖ TRUE!\nហើយតម្លៃ TRUE តែមួយនោះហើយ គឺជាសោរដោះសោទ្វារទៅកាន់សកម្មភាពបន្ទាប់!\"",
      content: `<div class="slide-header">
        <span class="slide-badge blue-badge">រចនាសម្ព័ន្ធតក្កវិជ្ជា (Logic Structure)</span>
        <h2 class="slide-title">ហេតុ &amp; ផលជាក់ស្តែង៖ រចនាសម្ព័ន្ធនៃលក្ខខណ្ឌ (Condition Anatomy)</h2>
        <p class="slide-lead">គ្រប់លក្ខខណ្ឌទាំងអស់មានសមាសភាគ ៣ ដាច់ដោយឡែក ដែលបង្រួមចូលគ្នាទៅជាតម្លៃការពិតប៊ូលីនតែមួយគត់។</p>
      </div>

      <div class="condition-anatomy-container">
        <!-- Top Tier: សមាសភាគសមីការ ៣ ផ្នែក -->
        <div class="anatomy-equation-row">
          <div class="anatomy-box left-side">
            <span class="part-tag">ផ្នែកទី ១៖ ទិន្នន័យ (ខាងឆ្វេង)</span>
            <div class="part-val"><code>txtDowntime.Text</code></div>
            <p class="part-sub">តម្លៃជាក់ស្តែងបច្ចុប្បន្ន៖ <strong>"5.5"</strong></p>
          </div>

          <div class="anatomy-operator">
            <span class="part-tag">ផ្នែកទី ២៖ សញ្ញាប្រៀបធៀប</span>
            <div class="operator-symbol">&gt;</div>
            <p class="part-sub">សំណួរ៖ <em>"តើធំជាងឬទេ?"</em></p>
          </div>

          <div class="anatomy-box right-side">
            <span class="part-tag">ផ្នែកទី ៣៖ កម្រិតស្តង់ដារ (ខាងស្តាំ)</span>
            <div class="part-val"><code>4.0</code></div>
            <p class="part-sub">ដែនកំណត់សុវត្ថិភាព៖ <strong>៤.០ ម៉ោង</strong></p>
          </div>
        </div>

        <!-- Middle Tier: ព្រួញវាយតម្លៃ -->
        <div class="anatomy-arrow-down">&darr; វាយតម្លៃស្វែងរកការពិតក្នុងសតិកុំព្យូទ័រ &darr;</div>

        <!-- Bottom Tier: លទ្ធផលប៊ូលីនចុងក្រោយ -->
        <div class="anatomy-result-box">
          <div class="result-badge-col">
            <span class="res-tag">លទ្ធផលចុងក្រោយ (ប៊ូលីន)</span>
            <div class="verdict-pill verdict-true">TRUE (ពិត)</div>
          </div>
          <div class="result-desc-col">
            <p class="res-desc">ដោយសារតម្លៃម៉ោងខូច <strong>៥.៥</strong> ពិតជាធំជាងដែនកំណត់ <strong>៤.០</strong> ដូច្នេះលក្ខខណ្ឌនេះផលិតបានចម្លើយតែមួយគត់គឺ <strong>TRUE</strong>!</p>
          </div>
        </div>
      </div>`
    },
    
    'slide-12': {
      title: "ការបង្ហាញផ្ទាល់៖ ផ្ទាំងពិសោធន៍លក្ខខណ្ឌ",
      segment: "ផ្នែកទី ៤៖ ការបង្ហាញផ្ទាល់ដោយគ្រូបណ្តុះបណ្តាល (៤៥:០០ - ៦០:០០)",
      notes: "កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):\n\"ឥឡូវនេះ ចូរយើងបើកផ្ទាំងពិសោធន៍អន្តរកម្ម Condition Workbench របស់យើង!\nសូមមើលនៅពេលខ្ញុំរុញរបារសម្ពាធ (Pressure Slider)៖\nនៅពេលសម្ពាធ ១៤០ PSI សូមមើលលក្ខខណ្ឌទី ១៖ 'Pressure > 200'។\nតើ ១៤០ > ២០០ ឬទេ? លទ្ធផលបង្ហាញ FALSE ពណ៌ប្រផេះ!\nឥឡូវនេះ សូមមើលអ្វីដែលកើតឡើងនៅពេលខ្ញុំរុញរបារឡើងដល់ ២១៥ PSI៖\nទះដៃ! ស្លាកលទ្ធផលភ្លាមៗនោះប្រែជាពណ៌បៃតងភ្លឺចែងចាំង ហើយបង្ហាញពាក្យ TRUE!\nសូមក្រឡេកមើលលក្ខខណ្ឌទី ២៖ 'Operator Name is blank'។\nនៅពេលមានការវាយអត្ថបទឈ្មោះ អនុគមន៍ IsBlank() វាយតម្លៃចេញជា FALSE។\nនៅពេលខ្ញុំលុបឈ្មោះចោល IsBlank() វាយតម្លៃចេញជា TRUE ភ្លាមៗ!\nនេះជារបៀបដែលកម្មវិធីសម័យទំនើបគិត៖ តម្លៃទិន្នន័យប្រែប្រួល លក្ខខណ្ឌវាយតម្លៃឡើងវិញ ហើយចម្លើយប៊ូលីន True/False ដឹកនាំសកម្មភាពកម្មវិធី!\"",
      content: `<div class="slide-header">
        <span class="slide-badge blue-badge">ការពិសោធន៍អន្តរកម្ម</span>
        <h2 class="slide-title">ការបង្ហាញផ្ទាល់ដោយគ្រូ៖ ផ្ទាំងពិសោធន៍លក្ខខណ្ឌ (Workbench)</h2>
        <p class="slide-lead">កែតម្រូវឧបករណ៍បញ្ជាឧបករណ៍ចាប់សញ្ញារោងចក្រនៅខាងឆ្វេង ដើម្បីមើលរបៀបដែលលក្ខខណ្ឌវាយតម្លៃជា True ឬ False ភ្លាមៗក្នុងពេលជាក់ស្តែង។</p>
      </div>

      <div class="workbench-grid">
        <div class="workbench-inputs">
          <h4>ឧបករណ៍បញ្ជាឧបករណ៍ចាប់សញ្ញាម៉ាស៊ីនផ្ទាល់៖</h4>
          <div class="input-control-row">
            <label>សម្ពាធធារាសាស្ត្រ (Pressure)៖ <strong id="wb-psi-val">150</strong> PSI</label>
            <input type="range" id="wb-psi-slider" min="50" max="300" value="150" class="fluent-slider">
          </div>
          <div class="input-control-row">
            <label>ប្រអប់បញ្ចូលឈ្មោះប្រតិបត្តិករ៖</label>
            <input type="text" id="wb-name-input" value="Sophea Chem" class="fluent-text-input" placeholder="វាយឈ្មោះប្រតិបត្តិករ...">
          </div>
          <div class="input-control-row">
            <label>តើកុងតាក់អាសន្នត្រូវបានបើកឬនៅ?</label>
            <button type="button" id="wb-hazard-toggle" class="workbench-toggle-btn">
              <span class="toggle-indicator off"></span> បិទ - OFF (false)
            </button>
          </div>
        </div>

        <div class="workbench-evaluations">
          <h4>តារាងវាយតម្លៃលក្ខខណ្ឌផ្ទាល់ក្នុងពេលជាក់ស្តែង៖</h4>
          <div class="eval-card" id="eval-card-psi">
            <div class="eval-left">
              <span class="eval-condition"><code>Pressure &gt; 200</code></span>
              <span class="eval-calc" id="calc-psi">150 &gt; 200</span>
            </div>
            <div class="verdict-badge verdict-false" id="verdict-psi">FALSE</div>
          </div>

          <div class="eval-card" id="eval-card-name">
            <div class="eval-left">
              <span class="eval-condition"><code>IsBlank(OperatorName)</code></span>
              <span class="eval-calc" id="calc-name">"Sophea Chem" គឺទទេឬ?</span>
            </div>
            <div class="verdict-badge verdict-false" id="verdict-name">FALSE</div>
          </div>

          <div class="eval-card" id="eval-card-hazard">
            <div class="eval-left">
              <span class="eval-condition"><code>EmergencySwitch = true</code></span>
              <span class="eval-calc" id="calc-hazard">false = true</span>
            </div>
            <div class="verdict-badge verdict-false" id="verdict-hazard">FALSE</div>
          </div>
        </div>
      </div>`
    },
    'slide-13': {
      title: "ការវាស់ស្ទង់ការយល់ដឹងពាក់កណ្តាលវគ្គ (Mid-Session Check-in)",
      segment: "ផ្នែកទី ៤៖ ការបង្ហាញផ្ទាល់ដោយគ្រូបណ្តុះបណ្តាល (៤៥:០០ - ៦០:០០)",
      notes: "កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):\n\"យើងបានឈានមកដល់នាទីទី ៤៥ ហើយ! ពាក់កណ្តាលនៃថ្ងៃទី ៤!\nចូរយើងឈប់សម្រាកដកដង្ហើមវែងៗ និងកែសម្រួលឥរិយាបថអង្គុយរយៈពេល ៦០ វិនាទី។\nពិសាទឹកមួយកែវ។\nសុំសញ្ញាមេដៃរហ័សពីអ្នកទាំងអស់គ្នានៅក្នុងបន្ទប់៖\nលើកមេដៃឡើងលើ ប្រសិនបើអ្នកយល់ច្បាស់ថាលក្ខខណ្ឌគឺជាសំណួរ ហើយ True/False គឺជាចម្លើយ។\nលើកមេដៃទៅចំហៀង ប្រសិនបើអ្នកនៅតែឆ្ងល់ថាតើវាភ្ជាប់ទៅនឹងការចុចប៊ូតុងយ៉ាងដូចម្តេច។\nចងចាំថា៖ ថ្ងៃស្អែក ការចុចប៊ូតុងនឹងយកចម្លើយ True/False ទាំងនេះទៅសម្រេចចិត្តថាតើត្រូវរក្សាទុក ផ្ញើសារព្រមាន ឬទប់ស្កាត់ការបញ្ជូន!\"",
      content: `<div class="checkpoint-card">
        <div class="checkpoint-icon">&#9749;</div>
        <h2 class="checkpoint-title">ការវាស់ស្ទង់ការយល់ដឹងពាក់កណ្តាលវគ្គ (Mid-Session Check-in) (៤៥:០០ នាទីកន្លងផុត)</h2>
        <p class="checkpoint-subtitle">ដកដង្ហើមវែងៗ ពិសាទឹក និងផ្ទៀងផ្ទាត់មូលដ្ឋានគ្រឹះគំនិតរបស់អ្នក មុនពេលយើងអនុវត្តការសរសេរលក្ខខណ្ឌ។</p>

        <div class="checkpoint-grid">
          <div class="check-item">
            <div class="check-icon">&#128077;</div>
            <h4>មេដៃឡើងលើ៖ យល់ច្បាស់</h4>
            <p>ខ្ញុំយល់ថាលក្ខខណ្ឌគឺជាសំណួរប្រៀបធៀបដែលផ្តល់លទ្ធផលយ៉ាងតឹងរ៉ឹងត្រឹមតែ TRUE ឬ FALSE ប៉ុណ្ណោះ។</p>
          </div>

          <div class="check-item">
            <div class="check-icon">&#128073;</div>
            <h4>មេដៃទៅចំហៀង៖ នៅឆ្ងល់</h4>
            <p>ខ្ញុំយល់ True/False ប៉ុន្តែចង់ឃើញពីរបៀបដែលប៊ូតុង និងអេក្រង់ទូរស័ព្ទយកចម្លើយនេះទៅប្រើប្រាស់។</p>
          </div>

          <div class="check-item">
            <div class="check-icon">&#128640;</div>
            <h4>ត្រៀមខ្លួនសម្រាប់ជំហានបន្ទាប់</h4>
            <p>ត្រៀមខ្លួនរួចរាល់ក្នុងការសរសេរលក្ខខណ្ឌសុវត្ថិភាពផ្ទាល់ដៃលើករណីសិក្សារោងចក្រ Apex Plastics!</p>
          </div>
        </div>
      </div>`
    },
    'slide-14': {
      title: "ករណីសិក្សា៖ លក្ខខណ្ឌទម្រង់បែបបទ Apex",
      segment: "ផ្នែកទី ៥៖ សិក្ខាកាមអនុវត្តជាក់ស្តែង (៦០:០០ - ៧៥:០០)",
      notes: "កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):\n\"ឥឡូវនេះ ចូរយើងពិនិត្យមើលថាតើលក្ខខណ្ឌជួយការពារទម្រង់បែបបទជំនួយការងារ (Support Form) នៅ Apex Plastics យ៉ាងដូចម្តេច!\nសូមមើលតម្រូវការអាជីវកម្មទាំង ៣ នៅលើអេក្រង់នេះ៖\nតម្រូវការទី ១៖ 'ប្រតិបត្តិករត្រូវតែបំពេញឈ្មោះរបស់ពួកគេមុនពេលចុចបញ្ជូន។'\nតើលក្ខខណ្ឌគឺជាអ្វី? IsBlank(txtOperator.Text) = false!\nតម្រូវការទី ២៖ 'ប្រសិនបើរយៈពេលម៉ាស៊ីនខូចលើសពី ៤ ម៉ោង សូមកំណត់ប័ណ្ណការងារជាប្រភេទបន្ទាន់ (Critical)។'\nតើលក្ខខណ្ឌគឺជាអ្វី? Value(txtDowntime.Text) > 4!\nតម្រូវការទី ៣៖ 'ធានាថាកាលបរិច្ឆេទឧបទ្ទវហេតុមិនត្រូវបានកំណត់ក្នុងអនាគតឡើយ។'\nតើលក្ខខណ្ឌគឺជាអ្វី? dpDate.SelectedDate <= Today()!\nសូមកត់សម្គាល់៖ គ្រប់តម្រូវការអាជីវកម្មទាំងអស់ សុទ្ធតែបម្លែងទៅជាសំណួរប្រៀបធៀបដ៏សាមញ្ញ និងច្បាស់លាស់។\"",
      content: `<div class="slide-header">
        <span class="slide-badge teal-badge">ស្ថាបត្យកម្ម DX អាជីវកម្ម</span>
        <h2 class="slide-title">Apex Plastics៖ ការបំបែកលក្ខខណ្ឌទម្រង់បែបបទឌីជីថល</h2>
        <p class="slide-lead">ការបម្លែងច្បាប់អាជីវកម្មមនុស្សពិតប្រាកដ ទៅជាសំណួរប្រៀបធៀបតាមវាក្យសម្ព័ន្ធកូដ។</p>
      </div>

      <div class="form-blueprint-grid">
        <div class="form-preview-card">
          <div class="form-title-bar">ច្បាប់ផ្ទៀងផ្ទាត់ទម្រង់បែបបទជួសជុល Apex Maintenance</div>
          <div class="form-field-row">
            <label>ច្បាប់ទី ១៖ ទាមទារឈ្មោះ</label>
            <div class="field-box">ឈ្មោះប្រតិបត្តិករ (មិនអាចទទេ)</div>
            <span class="field-cond"><code>IsBlank(txtOperator.Text) = false</code></span>
          </div>
          <div class="form-field-row">
            <label>ច្បាប់ទី ២៖ កម្រិតម៉ោងខូច</label>
            <div class="field-box">ម៉ោងម៉ាស៊ីនខូច (Downtime &gt; ៤ ម៉ោង)</div>
            <span class="field-cond"><code>Value(txtDowntime.Text) &gt; 4.0</code></span>
          </div>
          <div class="form-field-row">
            <label>ច្បាប់ទី ៣៖ កាលបរិច្ឆេទត្រឹមត្រូវ</label>
            <div class="field-box">កាលបរិច្ឆេទឧបទ្ទវហេតុ (មិនលើសថ្ងៃនេះ)</div>
            <span class="field-cond"><code>dpDate.SelectedDate &lt;= Today()</code></span>
          </div>
        </div>

        <div class="form-analysis-card">
          <h4>ហេតុអ្វីបានជាត្រូវប្រើលក្ខខណ្ឌ ៣ នេះ?</h4>
          <ul class="analysis-list">
            <li><strong>ទប់ស្កាត់ទិន្នន័យទទេ៖</strong> ការពិនិត្យឈ្មោះទប់ស្កាត់ការបញ្ជូនប័ណ្ណការងារដែលគ្មានអ្នកទទួលខុសត្រូវ។</li>
            <li><strong>ការចាត់ថ្នាក់បន្ទាន់ស្វ័យប្រវត្តិ៖</strong> ប្រសិនបើតម្លៃលើសពី ៤ ម៉ោង កម្មវិធីនឹងដឹងភ្លាមៗថាជាប័ណ្ណអាសន្ន។</li>
            <li><strong>ការការពារទិន្នន័យអនាគត៖</strong> ការប្រៀបធៀបទល់នឹង <code>Today()</code> ធានាថាគ្មានបុគ្គលិកណាអាចកត់ត្រាការខូចខាតដែលមិនទាន់កើតឡើងឡើយ!</li>
          </ul>
        </div>
      </div>`
    },
    'slide-15': {
      title: "លក្ខខណ្ឌនៅក្នុង Power Fx",
      segment: "ផ្នែកទី ៥៖ សិក្ខាកាមអនុវត្តជាក់ស្តែង (៦០:០០ - ៧៥:០០)",
      notes: "កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):\n\"តើយើងសរសេរលក្ខខណ្ឌទាំងនេះនៅក្នុង Microsoft Power Fx យ៉ាងដូចម្តេច?\nសូមក្រឡេកមើលលំនាំ ៥ ជំហានដែលយើងអនុវត្តជានិច្ច៖\n១. តម្រូវការអាជីវកម្ម៖ អ្នកគ្រប់គ្រងចង់ឱ្យមានការជូនដំណឹង ប្រសិនបើតម្លៃជួសជុលលើសពី ៥០០ ដុល្លារ។\n២. ច្បាប់ជាភាសាសាមញ្ញ៖ តើតម្លៃជួសជុលធំជាងប្រាំរយដុល្លារឬទេ?\n៣. លក្ខខណ្ឌ / សំណួរ៖ Value(txtCost.Text) > 500។\n៤. លទ្ធផលប៊ូលីន៖ វាយតម្លៃចេញជា TRUE ឬ FALSE។\n៥. ការសម្រេចចិត្ត / សកម្មភាព៖ ថ្ងៃស្អែកនៅថ្ងៃទី ៥ អនុគមន៍ If() នឹងយកតម្លៃ True នោះទៅបញ្ជូនប័ណ្ណសុំការអនុម័ត!\nសូមមើលអនុគមន៍ផ្ទៀងផ្ទាត់ឯកទេសបន្ថែម៖\nIsBlank(TextInput.Text) ពិនិត្យមើលថាតើប្រអប់ទិន្នន័យទទេឬអត់។\nIsEmpty(Collection) ពិនិត្យមើលថាតើតារាងគ្មានជួរដេកទិន្នន័យឬអត់។\nToday() ផ្តល់កាលបរិច្ឆេទនៃថ្ងៃនេះ។\"",
      content: `<div class="slide-header">
        <span class="slide-badge purple-badge">ការតភ្ជាប់ Power Fx</span>
        <h2 class="slide-title">របៀបដែល Power Fx ចោទសួរអំពីទិន្នន័យ</h2>
        <p class="slide-lead">ចាប់ពីតម្រូវការអាជីវកម្មមនុស្ស រហូតដល់រូបមន្តប្រៀបធៀបតាមវាក្យសម្ព័ន្ធកូដ។</p>
      </div>

      <div class="grid-2-col">
        <div class="code-card">
          <div class="code-header">
            <span>💻 រូបមន្តប្រៀបធៀបគំរូ</span>
            <span class="slide-badge purple-badge" style="float: right;">Power Fx</span>
          </div>
          <pre class="powerfx-code">
<span class="comment">// ១. ការប្រៀបធៀបលេខ (ផ្តល់ TRUE ឬ FALSE)</span>
<span class="func">Value</span>(txtDowntime.Text) &gt; <span class="num">4.0</span>

<span class="comment">// ២. ការប្រៀបធៀបអត្ថបទ (អក្សរតូចធំស្មើគ្នា)</span>
txtDepartment.Text = <span class="str">"Injection Molding"</span>

<span class="comment">// ៣. ពិនិត្យប្រអប់ទទេ (ទទេ = TRUE, មានអក្សរ = FALSE)</span>
<span class="func">IsBlank</span>(txtOperatorName.Text)

<span class="comment">// ៤. ការប្រៀបធៀបកាលបរិច្ឆេទ</span>
dpIncidentDate.SelectedDate &lt;= <span class="func">Today</span>()
          </pre>
          <div class="code-footer">លក្ខខណ្ឌទាំងអស់នេះបង្កើតលទ្ធផលតែមួយគត់គឺ ៖ <code>TRUE</code> ឬ <code>FALSE</code></div>
        </div>

        <div class="chain-explain-card">
          <div class="chain-header">
            <span>🧠 ខ្សែសង្វាក់តក្កវិជ្ជា ៥ ជំហាន</span>
            <span class="slide-badge teal-badge">5-Step Logic Chain</span>
          </div>
          <div class="chain-body">
            <ol class="five-step-chain">
              <li>
                <span class="step-chain-badge">១</span>
                <div class="step-chain-content">
                  <strong>តម្រូវការអាជីវកម្ម (Business Need) ៖</strong>
                  <div style="color: #cbd5e1; font-size: 0.86rem;">ប្រសិនបើតម្លៃជួសជុលលើស $500 ត្រូវទាមទារការអនុម័តពីប្រធានផ្នែក។</div>
                </div>
              </li>
              <li>
                <span class="step-chain-badge">២</span>
                <div class="step-chain-content">
                  <strong>ច្បាប់ជាភាសាសាមញ្ញ (Plain Rule) ៖</strong>
                  <div style="color: #cbd5e1; font-size: 0.86rem;">តើតម្លៃជួសជុលធំជាង 500 ដុល្លារឬទេ?</div>
                </div>
              </li>
              <li>
                <span class="step-chain-badge">៣</span>
                <div class="step-chain-content">
                  <strong>សំណួរ / លក្ខខណ្ឌ (Power Fx) ៖</strong>
                  <div><code>Value(txtCost.Text) &gt; 500</code></div>
                </div>
              </li>
              <li>
                <span class="step-chain-badge">៤</span>
                <div class="step-chain-content">
                  <strong>លទ្ធផល Boolean (Output) ៖</strong>
                  <div style="color: #cbd5e1; font-size: 0.86rem;">កុំព្យូទ័រគិតឃើញលទ្ធផលតែមួយគត់គឺ <strong style="color: #86efac;">TRUE</strong> ឬ <strong style="color: #f87171;">FALSE</strong></div>
                </div>
              </li>
              <li>
                <span class="step-chain-badge">៥</span>
                <div class="step-chain-content">
                  <strong>សកម្មភាព / ការសម្រេចចិត្ត (Day 5 Action) ៖</strong>
                  <div><code>If(True, Navigate(scrApproval))</code></div>
                </div>
              </li>
            </ol>
          </div>
          <div class="chain-footer">
            <span>🔗 <strong>ស្ពានភ្ជាប់ទៅថ្ងៃទី ៥ ៖</strong> លក្ខខណ្ឌជាអ្នកសម្រេចថាតើកម្មវិធីត្រូវជ្រើសរើសផ្លូវមួយណា!</span>
          </div>
        </div>
      </div>`
    },
    'slide-16': {
      title: "ច្បាប់ភាពស៊ីគ្នានៃប្រភេទទិន្នន័យ",
      segment: "ផ្នែកទី ៥៖ សិក្ខាកាមអនុវត្តជាក់ស្តែង (៦០:០០ - ៧៥:០០)",
      notes: "កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):\n\"ចូរយើងពង្រឹងច្បាប់មាសនៃការប្រៀបធៀប៖\nសំណួរ ត្រូវតែ ប្រៀបធៀបប្រភេទទិន្នន័យដែលស៊ីគ្នា!\nអ្នកអាចប្រៀបធៀប លេខ ជាមួយ លេខ (245 > 200)។\nអ្នកអាចប្រៀបធៀប អត្ថបទ ជាមួយ អត្ថបទ ('Molding' = 'Molding')។\nអ្នកអាចប្រៀបធៀប កាលបរិច្ឆេទ ជាមួយ កាលបរិច្ឆេទ (Today() > Date(2026,1,1))។\nចុះតើមានអ្វីកើតឡើងប្រសិនបើអ្នកព្យាយាមសួរថា៖ តើ 'Sophea' > 50 ឬទេ?\nPower Apps នឹងគូសបន្ទាត់ក្រហមរលកពីក្រោម ហើយប្រាប់ថា៖ Incompatible types. You cannot compare text to numbers! (ប្រភេទមិនស៊ីគ្នា។ អ្នកមិនអាចប្រៀបធៀបអត្ថបទទៅនឹងលេខបានទេ!)\nត្រូវប្រាកដជានិច្ចថាសងខាងនៃសញ្ញាប្រៀបធៀបរបស់អ្នក មកពីកែវទិន្នន័យតែមួយ!\"",
      content: `<div class="slide-header">
        <span class="slide-badge blue-badge">ភាពស៊ីគ្នានៃប្រភេទទិន្នន័យ</span>
        <h2 class="slide-title">ច្បាប់មាសនៃភាពស៊ីគ្នានៃទិន្នន័យសម្រាប់លក្ខខណ្ឌ</h2>
        <p class="slide-lead">ផ្នែកទាំងសងខាងនៃសញ្ញាប្រៀបធៀប ត្រូវតែស្ថិតនៅក្នុងក្រុមគ្រួសារទិន្នន័យដូចគ្នាបេះបិទ។</p>
      </div>

      <div class="conversion-bridge-grid">
        <div class="bridge-card bridge-to-num">
          <div class="bridge-direction">
            <span class="type-pill pill-num">លេខ</span>
            <span class="bridge-arrow">&#8596;</span>
            <span class="type-pill pill-num">លេខ</span>
          </div>
          <h4>&#9989; ស៊ីគ្នា ១០០%</h4>
          <p><code>Value(txtCost.Text) &gt; 500</code><br>លេខអាចប្រៀបធៀបជាមួយលេខបានគ្រប់សញ្ញាទាំងអស់ (<code>&gt;</code>, <code>&lt;</code>, <code>=</code>)។</p>
        </div>

        <div class="bridge-card bridge-to-text">
          <div class="bridge-direction">
            <span class="type-pill pill-text">អត្ថបទ</span>
            <span class="bridge-arrow">&#8596;</span>
            <span class="type-pill pill-text">អត្ថបទ</span>
          </div>
          <h4>&#9989; ស៊ីគ្នា ១០០%</h4>
          <p><code>txtStatus.Text = "Approved"</code><br>អត្ថបទអាចប្រៀបធៀបជាមួយអត្ថបទបានដោយប្រើ <code>=</code> ឬ <code>&lt;&gt;</code> ក្នុងសញ្ញាសម្រង់។</p>
        </div>

        <div class="bridge-card" style="border-color: #fb7185;">
          <div class="bridge-direction">
            <span class="type-pill pill-text">អត្ថបទ</span>
            <span class="bridge-arrow" style="color: #fb7185;">&#10006;</span>
            <span class="type-pill pill-num">លេខ</span>
          </div>
          <h4 style="color: #fb7185;">&#10060; កំហុសមិនស៊ីគ្នា (Error)</h4>
          <p><code>"Sophea" &gt; 50</code><br>កំហុសវាក្យសម្ព័ន្ធធ្ងន់ធ្ងរ! កុំព្យូទ័រមិនអាចវាយតម្លៃបានថាតើឈ្មោះមនុស្សធំជាងលេខ ៥០ យ៉ាងដូចម្តេចឡើយ។</p>
        </div>
      </div>`
    },
    'slide-17': {
      title: "សេចក្តីណែនាំការអនុវត្តជាក់ស្តែង",
      segment: "ផ្នែកទី ៥៖ សិក្ខាកាមអនុវត្តជាក់ស្តែង (៦០:០០ - ៧៥:០០)",
      notes: "កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):\n\"ឥឡូវនេះដល់ពេលដែលអ្នកត្រូវអនុវត្តផ្ទាល់ដៃហើយ!\nអ្នកកំពុងធ្វើសវនកម្មលើឧបករណ៍ចាប់សញ្ញាសុវត្ថិភាពនៅលើខ្សែសង្វាក់ម៉ាស៊ីន Apex Plastics Extruder #4។\nប្រធានផ្នែកសុវត្ថិភាពរោងចក្របានប្រគល់លក្ខខណ្ឌឧបករណ៍ចាប់សញ្ញាចំនួន ៦ ឱ្យអ្នកវាយតម្លៃ៖\n១. សីតុណ្ហភាពស៊ីឡាំង > ២៣០°C (តម្លៃអានបច្ចុប្បន្ន៖ ២៤៥°C)\n២. ទ្វារសុវត្ថិភាពបិទជិត = true (ស្ថានភាពបច្ចុប្បន្ន៖ true)\n៣. កម្រិតគ្រាប់ជ័រក្នុងធុង < ១០% (កម្រិតបច្ចុប្បន្ន៖ ៨%)\n៤. សម្ពាធធារាសាស្ត្រ <= ១៨០ PSI (តម្លៃអានបច្ចុប្បន្ន៖ ១៩៥ PSI)\n៥. ឈ្មោះអ្នកបច្ចេកទេស <> '' (អត្ថបទបច្ចុប្បន្ន៖ 'Sophea')\n៦. កាលបរិច្ឆេទក្រិតតាមខ្នាត >= Today() (កាលបរិច្ឆេទ៖ 2026-10-15 ទល់នឹង ថ្ងៃនេះ៖ 2026-10-29)\nនៅស្លាយបន្ទាប់ អ្នកនឹងចុចជ្រើសរើសដោយផ្ទាល់ថាតើលក្ខខណ្ឌនីមួយៗផ្តល់លទ្ធផល TRUE ឬ FALSE!\"",
      content: `<div class="slide-header">
        <span class="slide-badge teal-badge">សេចក្តីណែនាំការអនុវត្ត</span>
        <h2 class="slide-title">ការអនុវត្តផ្ទាល់៖ សវនកម្មសុវត្ថិភាពម៉ាស៊ីន Extruder #4</h2>
        <p class="slide-lead">វិភាគលក្ខខណ្ឌសុវត្ថិភាពផលិតកម្មទាំង ៦ មុនពេលវាយតម្លៃរកភាពពិតប៊ូលីនរបស់វា។</p>
      </div>

      <div class="parts-brief-grid">
        <div class="brief-item">
          <span class="brief-num">១</span>
          <div>
            <strong>ការពិនិត្យកម្ដៅលើសកម្រិត</strong>
            <p>រូបមន្ត៖ <code>Temp &gt; 230</code> (តម្លៃជាក់ស្តែង៖ ២៤៥°C) &bull; តើសីតុណ្ហភាពក្តៅលើសស្តង់ដារឬទេ?</p>
          </div>
        </div>

        <div class="brief-item">
          <span class="brief-num">២</span>
          <div>
            <strong>ស្ថានភាពទ្វារសុវត្ថិភាព</strong>
            <p>រូបមន្ត៖ <code>GateClosed = true</code> (ស្ថានភាពជាក់ស្តែង៖ true) &bull; តើទ្វារការពារត្រូវបានបិទជិតឬទេ?</p>
          </div>
        </div>

        <div class="brief-item">
          <span class="brief-num">៣</span>
          <div>
            <strong>កម្រិតគ្រាប់ជ័រក្នុងធុង</strong>
            <p>រូបមន្ត៖ <code>ResinLevel &lt; 10</code> (កម្រិតជាក់ស្តែង៖ ៨%) &bull; តើជ័រជិតអស់ពីធុងឬទេ?</p>
          </div>
        </div>

        <div class="brief-item">
          <span class="brief-num">៤</span>
          <div>
            <strong>កម្រិតសម្ពាធសុវត្ថិភាព</strong>
            <p>រូបមន្ត៖ <code>Pressure &lt;= 180</code> (សម្ពាធជាក់ស្តែង៖ ១៩៥ PSI) &bull; តើសម្ពាធស្ថិតក្នុងកម្រិតសុវត្ថិភាពឬទេ?</p>
          </div>
        </div>

        <div class="brief-item">
          <span class="brief-num">៥</span>
          <div>
            <strong>ការចាត់តាំងអ្នកបច្ចេកទេស</strong>
            <p>រូបមន្ត៖ <code>TechName &lt;&gt; ""</code> (ឈ្មោះបច្ចុប្បន្ន៖ "Sophea") &bull; តើមានអ្នកទទួលខុសត្រូវឬទេ?</p>
          </div>
        </div>

        <div class="brief-item">
          <span class="brief-num">៦</span>
          <div>
            <strong>សុពលភាពនៃការក្រិតខ្នាតម៉ាស៊ីន</strong>
            <p>រូបមន្ត៖ <code>CalibDate &gt;= Today()</code> (កាលបរិច្ឆេទ៖ 15-Oct vs 29-Oct) &bull; តើវិញ្ញាបនបត្រនៅមានសុពលភាពឬទេ?</p>
          </div>
        </div>
      </div>`
    },
    'slide-18': {
      title: "ផ្ទាំងវាយតម្លៃលក្ខខណ្ឌអន្តរកម្ម",
      segment: "ផ្នែកទី ៥៖ សិក្ខាកាមអនុវត្តជាក់ស្តែង (៦០:០០ - ៧៥:០០)",
      notes: "កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):\n\"នេះជាផ្ទាំង Truth Evaluator Board អន្តរកម្មផ្ទាល់របស់អ្នក!\nសម្រាប់លក្ខខណ្ឌនីមួយៗក្នុងចំណោមលក្ខខណ្ឌទាំង ៦ សូមអានតម្លៃឧបករណ៍ចាប់សញ្ញា រួចចុចលើពាក្យ TRUE ឬ FALSE។\nសូមកត់សម្គាល់៖\nនៅពេលសីតុណ្ហភាព ២៤៥, ២៤៥ > ២៣០ គឺ TRUE!\nនៅពេលសម្ពាធ ១៩៥, ១៩៥ <= ១៨០ គឺ FALSE!\nចូរយើងសាកល្បងមើលថាតើអ្នកអាចទទួលបានពិន្ទុពេញ ៦ លើ ៦ ដែរឬទេ!\"",
      content: `<div class="slide-header">
        <span class="slide-badge green-badge">ការអនុវត្តជាក់ស្តែង</span>
        <h2 class="slide-title">ផ្ទាំងវាយតម្លៃលក្ខខណ្ឌពិតអន្តរកម្ម (Truth Evaluator)</h2>
        <p class="slide-lead">វាយតម្លៃលក្ខខណ្ឌរោងចក្រនីមួយៗខាងក្រោម។ ចុចលើ TRUE ឬ FALSE ដើម្បីសាកល្បងតក្កវិជ្ជារបស់អ្នក។</p>
      </div>

      <div class="evaluator-grid-container" id="evaluator-widget">
        <div class="evaluator-card" data-cond-id="c1" data-correct="true">
          <div class="cond-title">១. កម្តៅលើសកម្រិត៖ <code>245 &gt; 230</code></div>
          <div class="cond-btn-pair">
            <button class="cond-btn" data-choice="true">TRUE (ពិត)</button>
            <button class="cond-btn" data-choice="false">FALSE (មិនពិត)</button>
          </div>
          <div class="cond-status-text">ជ្រើសរើស ពិត ឬ មិនពិត</div>
        </div>

        <div class="evaluator-card" data-cond-id="c2" data-correct="true">
          <div class="cond-title">២. ទ្វារសុវត្ថិភាព៖ <code>true = true</code></div>
          <div class="cond-btn-pair">
            <button class="cond-btn" data-choice="true">TRUE (ពិត)</button>
            <button class="cond-btn" data-choice="false">FALSE (មិនពិត)</button>
          </div>
          <div class="cond-status-text">ជ្រើសរើស ពិត ឬ មិនពិត</div>
        </div>

        <div class="evaluator-card" data-cond-id="c3" data-correct="true">
          <div class="cond-title">៣. គ្រាប់ជ័រខ្វះខាត៖ <code>8 &lt; 10</code></div>
          <div class="cond-btn-pair">
            <button class="cond-btn" data-choice="true">TRUE (ពិត)</button>
            <button class="cond-btn" data-choice="false">FALSE (មិនពិត)</button>
          </div>
          <div class="cond-status-text">ជ្រើសរើស ពិត ឬ មិនពិត</div>
        </div>

        <div class="evaluator-card" data-cond-id="c4" data-correct="false">
          <div class="cond-title">៤. សម្ពាធសុវត្ថិភាព៖ <code>195 &lt;= 180</code></div>
          <div class="cond-btn-pair">
            <button class="cond-btn" data-choice="true">TRUE (ពិត)</button>
            <button class="cond-btn" data-choice="false">FALSE (មិនពិត)</button>
          </div>
          <div class="cond-status-text">ជ្រើសរើស ពិត ឬ មិនពិត</div>
        </div>

        <div class="evaluator-card" data-cond-id="c5" data-correct="true">
          <div class="cond-title">៥. អ្នកបច្ចេកទេស៖ <code>"Sophea" &lt;&gt; ""</code></div>
          <div class="cond-btn-pair">
            <button class="cond-btn" data-choice="true">TRUE (ពិត)</button>
            <button class="cond-btn" data-choice="false">FALSE (មិនពិត)</button>
          </div>
          <div class="cond-status-text">ជ្រើសរើស ពិត ឬ មិនពិត</div>
        </div>

        <div class="evaluator-card" data-cond-id="c6" data-correct="false">
          <div class="cond-title">៦. សុពលភាពក្រិតខ្នាត៖ <code>"2026-10-15" &gt;= "Today"</code></div>
          <div class="cond-btn-pair">
            <button class="cond-btn" data-choice="true">TRUE (ពិត)</button>
            <button class="cond-btn" data-choice="false">FALSE (មិនពិត)</button>
          </div>
          <div class="cond-status-text">ជ្រើសរើស ពិត ឬ មិនពិត</div>
        </div>
      </div>

      <div class="evaluator-footer-bar">
        <span>ពិន្ទុ៖ <strong id="eval-score">0</strong> / 6 ត្រឹមត្រូវ</span>
        <span id="eval-feedback">សូមវាយតម្លៃលក្ខខណ្ឌទាំង ៦ ខាងលើ។</span>
      </div>`
    },
    'slide-19': {
      title: "ការយល់ច្រឡំជាទូទៅរបស់អ្នកចាប់ផ្តើមដំបូង",
      segment: "ផ្នែកទី ៦៖ ការវាយតម្លៃ & ស្ពានទៅថ្ងៃបន្ទាប់ (៧៥:០០ - ៩០:០០)",
      notes: "កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):\n\"ចូរយើងពិនិត្យមើលការយល់ច្រឡំជាទូទៅចំនួន ៤ ដែលអ្នកទើបចាប់ផ្តើមរៀនតែងតែជួបប្រទះ៖\nការយល់ច្រឡំទី ១៖ 'True/False គឺជាការសម្រេចចិត្តទាំងមូល។'\nការពន្យល់កែតម្រូវ៖ True/False គ្រាន់តែជាចម្លើយប៉ុណ្ណោះ! លក្ខខណ្ឌគឺជាសំណួរ។ ថ្ងៃស្អែក អនុគមន៍ IF ទើបជាអ្នកយកចម្លើយនោះទៅសម្រេចចិត្តជ្រើសរើសសកម្មភាព។\nការយល់ច្រឡំទី ២៖ 'សញ្ញាស្មើមួយ (=) មានន័យថាបញ្ជាឱ្យតម្លៃស្មើគ្នា។'\nការពន្យល់កែតម្រូវ៖ នៅក្នុង Power Fx សញ្ញា = គឺជាសំណួរប្រៀបធៀប ('តើរបស់ពីរនេះស្មើគ្នាឬទេ?') ចំណែកឯ Set() ទើបជាអ្នកកំណត់តម្លៃ!\nការយល់ច្រឡំទី ៣៖ 'ខ្ញុំត្រូវតែសរសេរពាក្យ true ក្នុងសញ្ញាសម្រង់។'\nការពន្យល់កែតម្រូវ៖ ប៊ូលីន true និង false គឺជាពាក្យគន្លឹះពិសេសសុទ្ធសាធ។ ប្រសិនបើអ្នកដាក់សញ្ញាសម្រង់លើ 'true' វានឹងក្លាយជាខ្សែអក្សរធម្មតា ហើយធ្វើឱ្យខូចតក្កវិជ្ជាទាំងមូល!\nការយល់ច្រឡំទី ៤៖ 'លក្ខខណ្ឌអាចដំណើរការសកម្មភាពបាន។'\nការពន្យល់កែតម្រូវ៖ លក្ខខណ្ឌគ្រាន់តែប្រៀបធៀបទិន្នន័យស្វែងរកការពិតប៉ុណ្ណោះ វាមិនដែលផ្លាស់ប្តូរទិន្នន័យ ឬប្តូរអេក្រង់ឡើយ!\"",
      content: `<div class="slide-header">
        <span class="slide-badge red-badge">ការកែតម្រូវគំរូគំនិត</span>
        <h2 class="slide-title">ការយល់ច្រឡំ ៤ យ៉ាងរបស់អ្នកចាប់ផ្តើមដំបូង &amp; ការកែតម្រូវ</h2>
        <p class="slide-lead">ការកែតម្រូវគំរូគំនិតខុសដែលអាចកើតមាន មុនពេលវាក្លាយជាទម្លាប់មិនល្អក្នុងការសរសេរកូដ។</p>
      </div>

      <div class="grid-2-col">
        <div class="misconception-card">
          <div class="misc-bad">&#10060; ការយល់ច្រឡំទី ១</div>
          <h4>"True និង False គឺជាការសម្រេចចិត្តទាំងស្រុង។"</h4>
          <p class="misc-fix"><strong>ការកែតម្រូវរបស់គ្រូ៖</strong> មិនមែនទេ! True/False គ្រាន់តែជា <em>ចម្លើយ</em> ចំពោះសំណួរមួយប៉ុណ្ណោះ។ នៅថ្ងៃស្អែក អនុគមន៍ <code>If()</code> ទើបជាអ្នកយកចម្លើយនោះទៅជ្រើសរើសសកម្មភាពជាក់ស្តែង។</p>
        </div>

        <div class="misconception-card">
          <div class="misc-bad">&#10060; ការយល់ច្រឡំទី ២</div>
          <h4>"សញ្ញា <code>=</code> គឺជាការបញ្ជាឱ្យតម្លៃស្មើគ្នា។"</h4>
          <p class="misc-fix"><strong>ការកែតម្រូវរបស់គ្រូ៖</strong> នៅក្នុង Power Fx សញ្ញា <code>=</code> គឺជា <em>សំណួរប្រៀបធៀប</em> ("តើតម្លៃទាំងពីរនេះស្មើគ្នាឬទេ?")។ វាមិនមែនជាការប្រគល់តម្លៃដូចក្នុងគណិតវិទ្យាឡើយ។</p>
        </div>

        <div class="misconception-card">
          <div class="misc-bad">&#10060; ការយល់ច្រឡំទី ៣</div>
          <h4>"ត្រូវសរសេរប៊ូលីនជា <code>"true"</code> ក្នុងសញ្ញាសម្រង់។"</h4>
          <p class="misc-fix"><strong>ការកែតម្រូវរបស់គ្រូ៖</strong> <code>true</code> និង <code>false</code> គឺជាពាក្យគន្លឹះប្រព័ន្ធ (Keywords) មិនមែនជាអត្ថបទឡើយ! ប្រសិនបើអ្នកដាក់សម្រង់ <code>"true"</code> វានឹងក្លាយជា Text មិនមែន Boolean ឡើយ។</p>
        </div>

        <div class="misconception-card">
          <div class="misc-bad">&#10060; ការយល់ច្រឡំទី ៤</div>
          <h4>"លក្ខខណ្ឌមួយអាចដំណើរការសកម្មភាពបាន។"</h4>
          <p class="misc-fix"><strong>ការកែតម្រូវរបស់គ្រូ៖</strong> លក្ខខណ្ឌមិនដែលបញ្ជូនទម្រង់បែបបទ ឬផ្ញើអ៊ីមែលឡើយ! លក្ខខណ្ឌគ្រាន់តែប្រៀបធៀបទិន្នន័យដើម្បីប្រាប់កុំព្យូទ័រថា ពិត ឬ មិនពិត ប៉ុណ្ណោះ។</p>
        </div>
      </div>`
    },
    'slide-20': {
      title: "សំណួរត្រួតពិនិត្យចំណេះដឹង ៥ សំណួរ",
      segment: "ផ្នែកទី ៦៖ ការវាយតម្លៃ & ស្ពានទៅថ្ងៃបន្ទាប់ (៧៥:០០ - ៩០:០០)",
      notes: "កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):\n\"ដល់ពេលវេលាធ្វើតេស្តផ្ទៀងផ្ទាត់ចំណេះដឹង ៥ សំណួរហើយ!\nសូមកត់សម្គាល់ថាសំណួរទី ២ និងទី ៤ សួរជាពិសេសអំពី 'ហេតុអ្វី' និង 'តើមានអ្វីកើតឡើងប្រសិនបើ'។\nសូមចំណាយពេលគិតពិចារណា ជ្រើសរើសចម្លើយដែលល្អបំផុតសម្រាប់សំណួរនីមួយៗ ហើយយើងនឹងពិនិត្យមើលការពន្យល់ជាមួយគ្នា។\"",
      content: `<div class="slide-header">
        <span class="slide-badge blue-badge">ផ្ទៀងផ្ទាត់ចំណេះដឹង</span>
        <h2 class="slide-title">ការត្រួតពិនិត្យចំណេះដឹងវាយតម្លៃនៃថ្ងៃទី ៤</h2>
        <p class="slide-lead">ឆ្លើយសំណួរទាំង ៥ ខាងក្រោម ដើម្បីផ្ទៀងផ្ទាត់ការយល់ដឹងរបស់អ្នកអំពីលក្ខខណ្ឌ សញ្ញាប្រៀបធៀប និងការវាយតម្លៃប៊ូលីន។</p>
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
          <button class="btn-subtle" id="quiz-prev-btn" disabled>&#8592; សំណួរមុន</button>
          <button class="btn-primary" id="quiz-next-btn">សំណួរបន្ទាប់ &#8594;</button>
        </div>
      </div>`
    },
    'slide-21': {
      title: "បញ្ហាប្រឈមចុងក្រោយ៖ ច្រកត្រួតពិនិត្យគុណភាព",
      segment: "ផ្នែកទី ៦៖ ការវាយតម្លៃ & ស្ពានទៅថ្ងៃបន្ទាប់ (៧៥:០០ - ៩០:០០)",
      notes: "កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):\n\"នេះជាបញ្ហាប្រឈមចុងក្រោយប្រចាំថ្ងៃទី ៤ របស់អ្នក (Capstone Challenge)៖\nរោងចក្រ Apex Plastics កំពុងដាក់ឱ្យដំណើរការច្រកត្រួតពិនិត្យគុណភាពឌីជីថល (Digital Quality Gate) សម្រាប់គ្រឿងបន្លាស់រថយន្ត។\nអ្នកមានច្បាប់ត្រួតពិនិត្យគុណភាពចំនួន ៨៖\n១. ទម្ងន់គ្រឿងបន្លាស់ >= ៤៨.០ ក្រាម។\n២. ចំនួនកំហុសផលិតផល (Defects) = ០។\n៣. លេខសម្គាល់ពុម្ព (Cavity ID) មិនស្មើ 'C-99'។\n៤. សីតុណ្ហភាពជ័ររលាយ >= ២១០°C។\n៥. ឈ្មោះអ្នកត្រួតពិនិត្យមិនទទេ (Not Empty)។\n៦. កាលបរិច្ឆេទត្រួតពិនិត្យ <= ថ្ងៃនេះ Today()។\n៧. កម្រាស់ជញ្ជាំងជ័រ >= ២.៥ មីលីម៉ែត្រ។\n៨. ការឆ្លងកាត់ការពិនិត្យមើលដោយភ្នែក = true។\nចូរបង្កើតលក្ខខណ្ឌកូដនីមួយៗ និងកំណត់ថាតើវាផ្តល់លទ្ធផល TRUE ឬ FALSE សម្រាប់គ្រឿងបន្លាស់គំរូលេខ #882!\"",
      content: `<div class="slide-header">
        <span class="slide-badge purple-badge">បញ្ហាប្រឈមឯករាជ្យ</span>
        <h2 class="slide-title">បញ្ហាប្រឈមចុងក្រោយ៖ ច្រកត្រួតពិនិត្យគុណភាព Apex Quality Gate</h2>
        <p class="slide-lead">បម្លែងស្តង់ដារគុណភាពផលិតកម្មទាំង ៨ ទៅជាកន្សោមលក្ខខណ្ឌ Power Fx តាមវាក្យសម្ព័ន្ធត្រឹមត្រូវ។</p>
      </div>

      <div class="challenge-table-wrapper">
        <table class="challenge-table">
          <thead>
            <tr>
              <th>#</th>
              <th>ច្បាប់ត្រួតពិនិត្យគុណភាព</th>
              <th>ទិន្នន័យគ្រឿងបន្លាស់គំរូ #882</th>
              <th>កន្សោមលក្ខខណ្ឌគោលដៅ</th>
              <th>លទ្ធផលវិនិច្ឆ័យ (Verdict)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>១</td><td>ទម្ងន់បន្លាស់ &gt;= ៤៨.០ ក្រាម</td><td><code>Weight = 49.5g</code></td><td>?</td><td>?</td></tr>
            <tr><td>២</td><td>ចំនួនកំហុសផលិតផល = ០</td><td><code>Defects = 0</code></td><td>?</td><td>?</td></tr>
            <tr><td>៣</td><td>លេខពុម្ព &lt;&gt; "C-99"</td><td><code>Cavity = "C-04"</code></td><td>?</td><td>?</td></tr>
            <tr><td>៤</td><td>កម្តៅជ័រ &gt;= ២១០°C</td><td><code>Temp = 218°C</code></td><td>?</td><td>?</td></tr>
            <tr><td>៥</td><td>ឈ្មោះអ្នកត្រួតពិនិត្យមិនទទេ</td><td><code>Inspector = "Dara"</code></td><td>?</td><td>?</td></tr>
            <tr><td>៦</td><td>កាលបរិច្ឆេទ &lt;= ថ្ងៃនេះ</td><td><code>Date = Today()</code></td><td>?</td><td>?</td></tr>
            <tr><td>៧</td><td>កម្រាស់ជញ្ជាំង &gt;= ២.៥ ម.ម</td><td><code>Thickness = 2.1mm</code></td><td>?</td><td>?</td></tr>
            <tr><td>៨</td><td>ត្រួតពិនិត្យដោយភ្នែកជាប់ = true</td><td><code>QC = true</code></td><td>?</td><td>?</td></tr>
          </tbody>
        </table>
      </div>`
    },
    'slide-22': {
      title: "ដំណោះស្រាយ & កម្រិតវិនិច្ឆ័យពិន្ទុ",
      segment: "ផ្នែកទី ៦៖ ការវាយតម្លៃ & ស្ពានទៅថ្ងៃបន្ទាប់ (៧៥:០០ - ៩០:០០)",
      notes: "កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):\n\"ចូរយើងបង្ហាញដំណោះស្រាយស្តង់ដារ!\nចុចលើប៊ូតុង 'បង្ហាញដំណោះស្រាយ' ដើម្បីពិនិត្យមើលចម្លើយគំរូ។\nសូមកត់សម្គាល់ច្បាប់ទី ៧៖ កម្រាស់ជញ្ជាំងជាក់ស្តែងគឺ ២.១ មីលីម៉ែត្រ ដូច្នេះ ២.១ >= ២.៥ ផ្តល់លទ្ធផលថា FALSE!\nចំណែកច្បាប់ទាំង ៧ ផ្សេងទៀតសុទ្ធតែផ្តល់លទ្ធផលថា TRUE!\nដោយសារច្បាប់ទី ៧ គឺ FALSE គ្រឿងបន្លាស់នេះបានធ្លាក់ពីច្រកត្រួតពិនិត្យគុណភាព!\nចូរផ្ទៀងផ្ទាត់ការងាររបស់អ្នកទល់នឹងកម្រិតវាយតម្លៃទាំង ៤ របស់យើង៖\nកម្រិតទី ៤ (Mastery) មានន័យថាលក្ខខណ្ឌទាំង ៨ ត្រូវបានសរសេរយ៉ាងត្រឹមត្រូវតាមវាក្យសម្ព័ន្ធ ជាមួយនឹងការវិនិច្ឆ័យ True/False ត្រឹមត្រូវ ១០០%!\"",
      content: `<div class="slide-header">
        <span class="slide-badge green-badge">គំរូដំណោះស្រាយ &amp; រង្វាស់ពិន្ទុ</span>
        <h2 class="slide-title">ដំណោះស្រាយបញ្ហាប្រឈមចុងក្រោយ &amp; តារាងរង្វាស់ពិន្ទុ ៤ កម្រិត</h2>
        <p class="slide-lead">ប្រៀបធៀបកន្សោមលក្ខខណ្ឌរបស់អ្នកទល់នឹងស្តង់ដារផលិតកម្ម និងវាយតម្លៃលើលទ្ធផលរបស់អ្នក។</p>
      </div>

      <div class="grid-2-col">
        <div class="solution-card">
          <div class="solution-header">
            <h4>លក្ខណៈបច្ចេកទេសលក្ខខណ្ឌគំរូ</h4>
            <button class="btn-reveal" id="btn-reveal-solution">បង្ហាញដំណោះស្រាយ</button>
          </div>
          <div class="solution-body collapsed" id="solution-content">
            <ul class="solution-list">
              <li><strong>១. ទម្ងន់៖</strong> <code>Value(txtWeight.Text) &gt;= 48.0</code> ➔ <strong style="color:#4ade80;">TRUE</strong> (៤៩.៥ &gt;= ៤៨.០)</li>
              <li><strong>២. កំហុស៖</strong> <code>Value(txtDefects.Text) = 0</code> ➔ <strong style="color:#4ade80;">TRUE</strong> (០ = ០)</li>
              <li><strong>៣. លេខពុម្ព៖</strong> <code>txtCavity.Text &lt;&gt; "C-99"</code> ➔ <strong style="color:#4ade80;">TRUE</strong> ("C-04" &lt;&gt; "C-99")</li>
              <li><strong>៤. កម្តៅ៖</strong> <code>Value(txtTemp.Text) &gt;= 210</code> ➔ <strong style="color:#4ade80;">TRUE</strong> (២១៨ &gt;= ២១០)</li>
              <li><strong>៥. អ្នកត្រួតពិនិត្យ៖</strong> <code>IsBlank(txtInspector.Text) = false</code> ➔ <strong style="color:#4ade80;">TRUE</strong> (មិនទទេ)</li>
              <li><strong>៦. កាលបរិច្ឆេទ៖</strong> <code>dpDate.SelectedDate &lt;= Today()</code> ➔ <strong style="color:#4ade80;">TRUE</strong> (អតីត/បច្ចុប្បន្នត្រឹមត្រូវ)</li>
              <li><strong>៧. កម្រាស់៖</strong> <code>Value(txtThick.Text) &gt;= 2.5</code> ➔ <strong style="color:#fb7185;">FALSE</strong> (២.១ &gt;= ២.៥ ធ្លាក់!)</li>
              <li><strong>៨. ពិនិត្យដោយភ្នែក៖</strong> <code>chkVisual.Value = true</code> ➔ <strong style="color:#4ade80;">TRUE</strong> (កុងតាក់បានបើក)</li>
            </ul>
          </div>
        </div>

        <div class="rubric-card">
          <h4>តារាងរង្វាស់កម្រិតសមត្ថភាពទាំង ៤ (Rubric)</h4>
          <div class="rubric-levels">
            <div class="level-item level-4">
              <span class="lvl-title">កម្រិតទី ៤៖ ស្ទាត់ជំនាញកម្រិតខ្ពស់ (១០០%)</span>
              <p>លក្ខខណ្ឌទាំង ៨ ត្រឹមត្រូវតាមវាក្យសម្ព័ន្ធ; ប្រើ Value() ត្រឹមត្រូវ; កំណត់ច្បាប់ទី ៧ ថា FALSE បានត្រឹមត្រូវ។</p>
            </div>
            <div class="level-item level-3">
              <span class="lvl-title">កម្រិតទី ៣៖ កម្រិតជំនាញល្អ (៧៥-៩៩%)</span>
              <p>លក្ខខណ្ឌត្រឹមត្រូវ ៦-៧; ប្រើប្រាស់សញ្ញាប្រៀបធៀបត្រឹមត្រូវ; ខ្វះខាតវាក្យសម្ព័ន្ធបន្តិចបន្តួច។</p>
            </div>
            <div class="level-item level-2">
              <span class="lvl-title">កម្រិតទី ២៖ កំពុងអភិវឌ្ឍ (៥០-៧៤%)</span>
              <p>ច្រឡំសញ្ញា &lt;&gt; ជាមួយ =; ភ្លេចសញ្ញាសម្រង់លើអត្ថបទ; វាយតម្លៃច្បាប់ទី ៧ ខុស។</p>
            </div>
            <div class="level-item level-1">
              <span class="lvl-title">កម្រិតទី ១៖ កម្រិតដំបូង (&lt;៥០%)</span>
              <p>ចាត់ទុកលក្ខខណ្ឌជាសកម្មភាព; ច្រឡំ True/False ជាមួយពាក្យអត្ថបទ "បាទ" / "ទេ"។</p>
            </div>
          </div>
        </div>
      </div>`
    },
    'slide-23': {
      title: "ផែនទីតភ្ជាប់កម្មវិធីសិក្សា",
      segment: "ផ្នែកទី ៦៖ ការវាយតម្លៃ & ស្ពានទៅថ្ងៃបន្ទាប់ (៧៥:០០ - ៩០:០០)",
      notes: "កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):\n\"សូមក្រឡេកមើលផែនទីតភ្ជាប់ ៣ ថ្ងៃរបស់យើង។\nកាលពីម្សិលមិញនៅថ្ងៃទី ៣៖ យើងបានរៀនថាកម្មវិធីរក្សាទុកព័ត៌មានក្នុងកុងតឺន័រតាមប្រភេទ (អត្ថបទ, លេខ, កាលបរិច្ឆេទ, ប៊ូលីន)។\nថ្ងៃនេះនៅថ្ងៃទី ៤៖ យើងបានរៀនពីរបៀបដែលកម្មវិធីចោទសួរអំពីទិន្នន័យដោយប្រើលក្ខខណ្ឌ ដើម្បីផលិតតម្លៃ TRUE ឬ FALSE។\nថ្ងៃស្អែកនៅថ្ងៃទី ៥៖ ជាចំណុចកំពូលនៃការសម្រេចចិត្ត! អនុគមន៍ IF និងការបំបែកលំហូរ!\nតើ IF ដំណើរការយ៉ាងដូចម្តេច?\nIf (Condition, ActionIfTrue, ActionIfFalse)!\nសូមមើលភាពរលូននៃខ្សែសង្វាក់នេះ៖\nទិន្នន័យបញ្ជូនទៅលក្ខខណ្ឌ។ លក្ខខណ្ឌផ្តល់ចម្លើយ True ឬ False។ True ឬ False ប្រាប់ IF ថាតើត្រូវដំណើរការសកម្មភាពមួយណា!\nគ្រប់មេរៀនទាំងអស់នៅក្នុងវគ្គបណ្តុះបណ្តាលនេះ សុទ្ធតែមានទំនាក់ទំនងគ្នាជានិច្ច។\"",
      content: `<div class="slide-header">
        <span class="slide-badge purple-badge">ស្ពានកម្មវិធីសិក្សា</span>
        <h2 class="slide-title">ផែនទីតភ្ជាប់កម្មវិធីសិក្សា ៣ ថ្ងៃ</h2>
        <p class="slide-lead">របៀបដែលទិន្នន័យកាលពីម្សិលមិញ លក្ខខណ្ឌថ្ងៃនេះ និងការសម្រេចចិត្តថ្ងៃស្អែក បង្កើតបានជាខ្សែសង្វាក់តក្កវិជ្ជាដ៏រលូន។</p>
      </div>

      <div class="bridge-three-col">
        <div class="bridge-col before-col">
          <span class="bridge-time-tag">កាលពីម្សិលមិញ (ថ្ងៃទី ៣)</span>
          <h3>ទិន្នន័យ &amp; កុងតឺន័រ</h3>
          <div class="bridge-summary">
            កម្មវិធីរក្សាទុកព័ត៌មានក្នុងប្រអប់ទិន្នន័យ ៤ ប្រភេទ៖ អត្ថបទ, លេខ, កាលបរិច្ឆេទ, និង ប៊ូលីន។
          </div>
          <div class="bridge-flow-arrow">&#10142; យកមកប្រៀបធៀបដោយ...</div>
        </div>

        <div class="bridge-col today-col">
          <span class="bridge-time-tag">ថ្ងៃនេះ (ថ្ងៃទី ៤)</span>
          <h3>សំណួរ &amp; លក្ខខណ្ឌ</h3>
          <div class="bridge-summary">
            ទិន្នន័យត្រូវបានប្រៀបធៀបដោយប្រើសញ្ញា (<code>=</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&lt;&gt;</code>) ដើម្បីបង្កើតចម្លើយ <strong>ពិត (True)</strong> ឬ <strong>មិនពិត (False)</strong>។
          </div>
          <div class="bridge-flow-arrow">&#10142; យកទៅវាយតម្លៃដោយ...</div>
        </div>

        <div class="bridge-col next-col">
          <span class="bridge-time-tag">ថ្ងៃស្អែក (ថ្ងៃទី ៥)</span>
          <h3>IF &amp; សកម្មភាពសម្រេចចិត្ត</h3>
          <div class="bridge-summary">
            អនុគមន៍ <code>If()</code> ទទួលយកលទ្ធផល True/False ដើម្បីជ្រើសរើសសកម្មភាព៖ <code>If(Downtime &gt; 4, NotifyManager(), AutoSave())</code>។
          </div>
        </div>
      </div>`
    },
    'slide-24': {
      title: "កិច្ចការផ្ទះ & សទ្ទានុក្រមបច្ចេកទេស",
      segment: "ផ្នែកទី ៦៖ ការវាយតម្លៃ & ស្ពានទៅថ្ងៃបន្ទាប់ (៧៥:០០ - ៩០:០០)",
      notes: "កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):\n\"សូមអបអរសាទរចំពោះការបញ្ចប់ថ្ងៃទី ៤ ដោយជោគជ័យ!\nនេះជាកិច្ចការផ្ទះស្រាវជ្រាវរយៈពេល ១៥ នាទីមិនបង្ខំរបស់អ្នក៖ 'អ្នករុករកលក្ខខណ្ឌក្នុងជីវិតពិត'។\nសូមស្វែងរកលក្ខខណ្ឌចំនួន ៣ ក្នុងទម្លាប់ប្រចាំថ្ងៃរបស់អ្នក៖\n១. 'តើម៉ោងរោទិ៍ >= ០៦:៣០ ឬទេ?'\n២. 'តើកម្រិតសាំងក្នុងធុង < ១៥% ឬទេ?'\n៣. 'តើសីតុណ្ហភាពទឹកតែក្តៅ > ៨០°C ឬទេ?'\nសូមពិនិត្យមើលសទ្ទានុក្រមទ្វេភាសា ខ្មែរ-អង់គ្លេស ខាងក្រោមផងដែរ។\nសូមអរគុណចំពោះការយកចិត្តទុកដាក់ដ៏អស្ចារ្យរបស់អ្នកនៅថ្ងៃនេះ។ ថ្ងៃស្អែកនៅថ្ងៃទី ៥ យើងនឹងបង្រៀនកម្មវិធីរបស់យើងឱ្យចេះធ្វើការសម្រេចចិត្តដ៏វៃឆ្លាតដោយប្រើអនុគមន៍ IF!\"",
      content: `<div class="slide-header">
        <span class="slide-badge blue-badge">សង្ខេបបញ្ចប់វគ្គ</span>
        <h2 class="slide-title">កិច្ចការផ្ទះ ១៥ នាទី &amp; សទ្ទានុក្រមទ្វេភាសា</h2>
        <p class="slide-lead">ពង្រឹងគោលគំនិតថ្ងៃនេះនៅក្នុងបរិយាកាសប្រចាំថ្ងៃរបស់អ្នក និងស្ទាត់ជំនាញលើវាក្យសព្ទតក្កវិជ្ជាបច្ចេកទេស។</p>
      </div>

      <div class="grid-2-col">
        <div class="homework-card">
          <div class="hw-icon">&#128269;</div>
          <div class="hw-content">
            <h4>កិច្ចការផ្ទះ៖ "អ្នករុករកលក្ខខណ្ឌក្នុងជីវិតពិត" (&le; ១៥ នាទី)</h4>
            <p>១. កំណត់ <strong>លក្ខខណ្ឌជីវិតពិតចំនួន ៣</strong> ដែលអ្នកតែងតែវាយតម្លៃរាល់ថ្ងៃនៅផ្ទះ ឬកន្លែងធ្វើការ។</p>
            <p>២. បំបែកលក្ខខណ្ឌនីមួយៗជា ៣ ផ្នែក៖ <code>[ទិន្នន័យខាងឆ្វេង] + [សញ្ញាប្រៀបធៀប] + [ស្តង់ដារខាងស្តាំ]</code>។</p>
            <p>៣. កត់ត្រាថាតើលក្ខខណ្ឌនោះផ្តល់លទ្ធផលជា <strong>ពិត (True)</strong> ឬ <strong>មិនពិត (False)</strong> នៅថ្ងៃនេះ។</p>
            <div class="hw-outcome">លទ្ធផលរំពឹងទុក៖ រូបមន្តលក្ខខណ្ឌដែលសរសេរដោយដៃចំនួន ៣ ត្រៀមចែករំលែកនៅថ្ងៃស្អែក!</div>
          </div>
        </div>

        <div class="glossary-card">
          <h4>សទ្ទានុក្រមបច្ចេកទេសទ្វេភាសា (ថ្ងៃទី ៤)</h4>
          <div class="glossary-list">
            <div class="gloss-item">
              <span class="en-term">Condition</span>
              <span class="kh-term">លក្ខខណ្ឌ (សំណួរប្រៀបធៀបទិន្នន័យ)</span>
            </div>
            <div class="gloss-item">
              <span class="en-term">Comparison Operator</span>
              <span class="kh-term">សញ្ញាប្រមាណវិធីប្រៀបធៀប (=, &lt;&gt;, &gt;, &lt;)</span>
            </div>
            <div class="gloss-item">
              <span class="en-term">True / False</span>
              <span class="kh-term">ពិត / មិនពិត (ចម្លើយតក្កវិជ្ជានៃសំណួរ)</span>
            </div>
            <div class="gloss-item">
              <span class="en-term">Equal / Not Equal</span>
              <span class="kh-term">ស្មើ (=) / មិនស្មើ ឬខុសពី (&lt;&gt;)</span>
            </div>
            <div class="gloss-item">
              <span class="en-term">Greater / Less Than</span>
              <span class="kh-term">ធំជាង (&gt;) / តូចជាង (&lt;)</span>
            </div>
            <div class="gloss-item">
              <span class="en-term">IsBlank Function</span>
              <span class="kh-term">អនុគមន៍ពិនិត្យប្រអប់ទទេ IsBlank()</span>
            </div>
          </div>
        </div>
      </div>`
    }
  };

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
    const totalEl = document.getElementById('slide-total-count') || document.getElementById('total-slides-num');
    if (totalEl) totalEl.textContent = totalSlides;

    setupEventListeners();
    setupTimer();
    renderQuizQuestion();
    bindConditionWorkbench();
    bindTruthEvaluator();
    bindRevealInteractions();
    buildOverviewGrid();

    // Show initial slide
    goToSlide(0);

    // Apply saved language preference cleanly after slides and originals are ready
    try {
      const savedLang = localStorage.getItem('powerapps_presentation_lang') || 
        (JSON.parse(localStorage.getItem('powerapps_master_curriculum_state_v1') || '{}').isKhmer ? 'km' : null);
      if (savedLang === 'km' && !isKhmerActive) {
        toggleLanguage();
      }
    } catch(e) {}
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
    if (curNumEl) curNumEl.textContent = currentSlideIndex + 1;

    // Header Title & Segment
    const titleEl = document.getElementById('current-slide-title');
    const segEl = document.getElementById('current-segment-name');
    if (titleEl) titleEl.textContent = curSlide.getAttribute('data-title') || '';
    if (segEl) segEl.textContent = curSlide.getAttribute('data-segment') || '';

    // Progress Bar
    const progressEl = document.getElementById('progress-bar');
    if (progressEl) {
      const pct = ((currentSlideIndex + 1) / totalSlides) * 100;
      progressEl.style.width = pct + '%';
    }

    // Prev / Next button states
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    if (btnPrev) btnPrev.disabled = (currentSlideIndex === 0);
    if (btnNext) btnNext.disabled = (currentSlideIndex === totalSlides - 1);

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
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  // --------------------------------------------------------------------------
  // 5. BILINGUAL SWITCHER (ENGLISH <-> KHMER)
  // --------------------------------------------------------------------------
  function toggleLanguage() {
    try { localStorage.setItem('powerapps_presentation_lang', !isKhmerActive ? 'km' : 'en'); } catch(e){}
    isKhmerActive = !isKhmerActive;
    applyBilingualState();
  }

  function applyBilingualState() {
    const langBtnText = document.getElementById('lang-label') || document.getElementById('lang-btn-text');
    const body = document.body;

    if (isKhmerActive) {
      body.classList.add('khmer-mode');
      body.classList.add('khmer-font-active');
      if (langBtnText) langBtnText.textContent = 'EN';

      // Swap slides that have Khmer translations
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
      if (langBtnText) langBtnText.textContent = 'KH';

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
    bindConditionWorkbench();
    bindTruthEvaluator();
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

  function toggleTimer() {
    if (isTimerRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  }

  function updateTimerDisplay() {
    const timerDisplay = document.getElementById('session-timer') || document.getElementById('timer-display');
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
  // 8. INTERACTIVE WIDGET: CONDITION WORKBENCH (SLIDE 12)
  // --------------------------------------------------------------------------
  function bindConditionWorkbench() {
    const psiSlider = document.getElementById('wb-psi-slider');
    const psiValDisplay = document.getElementById('wb-psi-val');
    const calcPsi = document.getElementById('calc-psi');
    const verdictPsi = document.getElementById('verdict-psi');
    const cardPsi = document.getElementById('eval-card-psi');

    const nameInput = document.getElementById('wb-name-input');
    const calcName = document.getElementById('calc-name');
    const verdictName = document.getElementById('verdict-name');

    const hazardToggle = document.getElementById('wb-hazard-toggle');
    const calcHazard = document.getElementById('calc-hazard');
    const verdictHazard = document.getElementById('verdict-hazard');

    if (!psiSlider) return;

    let isHazardOn = false;

    // PSI Slider handler
    psiSlider.oninput = () => {
      const val = parseInt(psiSlider.value, 10);
      if (psiValDisplay) psiValDisplay.textContent = val;
      if (calcPsi) calcPsi.textContent = `${val} > 200`;

      const isTrue = (val > 200);
      if (verdictPsi) {
        verdictPsi.textContent = isTrue ? 'TRUE' : 'FALSE';
        verdictPsi.className = `verdict-badge ${isTrue ? 'verdict-true' : 'verdict-false'}`;
      }
      if (cardPsi) {
        cardPsi.style.borderColor = isTrue ? '#4ade80' : 'rgba(255,255,255,0.12)';
      }
    };

    // Name input handler
    if (nameInput) {
      nameInput.oninput = () => {
        const text = nameInput.value.trim();
        const isEmpty = (text.length === 0);
        if (calcName) calcName.textContent = isEmpty ? 'Box is completely empty' : `"${text}" is not empty`;
        if (verdictName) {
          verdictName.textContent = isEmpty ? 'TRUE' : 'FALSE';
          verdictName.className = `verdict-badge ${isEmpty ? 'verdict-true' : 'verdict-false'}`;
        }
      };
    }

    // Hazard toggle button
    if (hazardToggle) {
      hazardToggle.onclick = () => {
        isHazardOn = !isHazardOn;
        const ind = hazardToggle.querySelector('.toggle-indicator');
        if (ind) ind.className = `toggle-indicator ${isHazardOn ? 'on' : 'off'}`;
        hazardToggle.innerHTML = `<span class="toggle-indicator ${isHazardOn ? 'on' : 'off'}"></span> ${isHazardOn ? 'ON (true)' : 'OFF (false)'}`;

        if (calcHazard) calcHazard.textContent = `${isHazardOn} = true`;
        if (verdictHazard) {
          verdictHazard.textContent = isHazardOn ? 'TRUE' : 'FALSE';
          verdictHazard.className = `verdict-badge ${isHazardOn ? 'verdict-true' : 'verdict-false'}`;
        }
      };
    }
  }

  // --------------------------------------------------------------------------
  // 9. INTERACTIVE WIDGET: 6-CONDITION TRUTH EVALUATOR (SLIDE 18)
  // --------------------------------------------------------------------------
  function bindTruthEvaluator() {
    const cards = document.querySelectorAll('.evaluator-card');
    const scoreDisplay = document.getElementById('eval-score');
    const feedbackDisplay = document.getElementById('eval-feedback');

    if (cards.length === 0) return;

    let score = 0;
    const answeredMap = {};

    cards.forEach(card => {
      const correctChoice = card.getAttribute('data-correct');
      const condId = card.getAttribute('data-cond-id');
      const statusText = card.querySelector('.cond-status-text');
      const buttons = card.querySelectorAll('.cond-btn');

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const userChoice = btn.getAttribute('data-choice');
          buttons.forEach(b => {
            b.classList.remove('selected-true', 'selected-false');
          });

          if (userChoice === 'true') btn.classList.add('selected-true');
          if (userChoice === 'false') btn.classList.add('selected-false');

          if (userChoice === correctChoice) {
            if (statusText) {
              statusText.textContent = '✔ Correct evaluation!';
              statusText.style.color = '#4ade80';
            }
            if (!answeredMap[condId]) {
              answeredMap[condId] = true;
              score++;
            }
          } else {
            if (statusText) {
              statusText.textContent = '✖ Incorrect! Re-check comparison.';
              statusText.style.color = '#fb7185';
            }
            if (answeredMap[condId]) {
              delete answeredMap[condId];
              score--;
            }
          }

          if (scoreDisplay) scoreDisplay.textContent = score;
          if (feedbackDisplay) {
            feedbackDisplay.textContent = (score === 6)
              ? '🎉 100% Mastery! You evaluated all 6 conditions correctly!'
              : `Current progress: ${score} of 6 correct.`;
            feedbackDisplay.style.color = (score === 6) ? '#4ade80' : '#ffffff';
          }
        });
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
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const btnRestart = document.getElementById('btn-restart');

    if (btnPrev) btnPrev.addEventListener('click', prevSlide);
    if (btnNext) btnNext.addEventListener('click', nextSlide);
    if (btnRestart) btnRestart.addEventListener('click', () => goToSlide(0));

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

    document.addEventListener('keydown', (e) => {
      const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
      if (tag === 'input' || tag === 'textarea') return;

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
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
        case 'dummy_unused':
          e.preventDefault();
          goToSlide(0);

    // Apply saved language preference cleanly after slides and originals are ready
    try {
      const savedLang = localStorage.getItem('powerapps_presentation_lang') || 
        (JSON.parse(localStorage.getItem('powerapps_master_curriculum_state_v1') || '{}').isKhmer ? 'km' : null);
      if (savedLang === 'km' && !isKhmerActive) {
        toggleLanguage();
      }
    } catch(e) {}
          break;
        case 'Escape':
          toggleOverview(false);
          toggleNotes(false);
          break;
      }
    });

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
  // 12.5 UNIVERSAL GLOBAL WINDOW EXPORT
  window.prevSlide = prevSlide;
  window.nextSlide = nextSlide;
  window.goToSlide = goToSlide;
  window.toggleLanguage = toggleLanguage;
  window.toggleNotes = toggleNotes;
  window.toggleOverview = toggleOverview;
  window.toggleFullscreen = toggleFullscreen;
  window.initPresentation = initPresentation;

  // 13. DOM READY BOOTSTRAP
  // --------------------------------------------------------------------------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPresentation);

  } else {
    initPresentation();
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
        laserBtn.classList.toggle('active', isLaserActive);
      }
    }
    window.toggleLaser = toggleLaser;

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
