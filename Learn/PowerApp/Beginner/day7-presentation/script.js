/**
 * ============================================================================
 * POWER APPS FOUNDATION: DAY 7 PRESENTATION ENGINE
 * Topic: From Real Problem to App Opportunity
 * Phase: Phase 3: Business Thinking
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
      qEn: "1. What are the five essential pillars of the App Opportunity Framework?",
      qKh: "១. តើអ្វីជាសសរស្តម្ភសំខាន់ទាំង ៥ នៃក្របខ័ណ្ឌឱកាសបង្កើតកម្មវិធី (App Opportunity Framework)?",
      optionsEn: [
        "A) Screen, Gallery, Button, Dropdown, Label",
        "B) Current Problem, Desired Result, People, Information, Rules",
        "C) Database, Server, WiFi, Battery, Password",
        "D) Power Fx, SharePoint, Teams, Excel, Outlook"
      ],
      optionsKh: [
        "A) អេក្រង់, ផ្ទាំង Gallery, ប៊ូតុង, ប្រអប់ជ្រើសរើស, ស្លាកអក្សរ",
        "B) បញ្ហាបច្ចុប្បន្ន (Problem), លទ្ធផលរំពឹងទុក (Result), មនុស្ស (People), ព័ត៌មាន (Information), វិធានការ (Rules)",
        "C) មូលដ្ឋានទិន្នន័យ, ម៉ាស៊ីនមេ, សេវា WiFi, ថ្ម, ពាក្យសម្ងាត់",
        "D) Power Fx, SharePoint, Teams, Excel, Outlook"
      ],
      correctIndex: 1,
      explanationEn: "Correct! Every great application is scoped around: What hurts (Problem) ➔ Desired goal (Result) ➔ Who interacts (People) ➔ What data is needed (Information) ➔ How decisions are made (Rules).",
      explanationKh: "ត្រឹមត្រូវណាស់! គ្រប់កម្មវិធីដ៏អស្ចារ្យតែងតែចាប់ផ្តើមពី៖ អ្វីជាបញ្ហាឈឺចាប់ (Problem) ➔ គោលដៅចង់បាន (Result) ➔ អ្នកពាក់ព័ន្ធ (People) ➔ ទិន្នន័យដែលត្រូវការ (Information) ➔ របៀបសម្រេចចិត្ត (Rules)។"
    },
    {
      qEn: "2. Why did the junior developer's 14-screen maintenance app at Apex Plastics fail completely, even though it had zero technical bugs?",
      qKh: "២. ហេតុអ្វីបានជាកម្មវិធីថែទាំម៉ាស៊ីន ១៤ អេក្រង់របស់ Junior Developer នៅរោងចក្រ Apex Plastics ត្រូវបរាជ័យទាំងស្រុង ទោះបីជាគ្មានកំហុសបច្ចេកទេសសូម្បីតែមួយ?",
      optionsEn: [
        "A) Because Microsoft Power Apps stopped working that week.",
        "B) Because floor operators wearing heavy gloves working on hot lines cannot fill out 45 technical fields taking 12 minutes per ticket.",
        "C) Because the company didn't buy enough tablets.",
        "D) Because maintenance cannot be automated."
      ],
      optionsKh: [
        "A) ពីព្រោះប្រព័ន្ធ Microsoft Power Apps បានគាំងនៅសប្តាហ៍នោះ។",
        "B) ពីព្រោះកម្មករនៅខ្សែសង្វាក់ដែលពាក់ស្រោមដៃក្រាស់ក្នុងកម្តៅខ្លាំង មិនអាចបំពេញ ៤៥ ប្រអប់ទិន្នន័យដែលចំណាយពេលដល់ទៅ ១២ នាទីក្នុងមួយសំបុត្របានទេ។",
        "C) ពីព្រោះក្រុមហ៊ុនមិនបានទិញ Tablet ឱ្យបានគ្រប់គ្រាន់។",
        "D) ពីព្រោះការងារថែទាំមិនអាចធ្វើស្វ័យប្រវត្តិកម្មបានឡើយ។"
      ],
      correctIndex: 1,
      explanationEn: "Correct! The app solved the developer's curiosity instead of the operator's real human friction. An app must fit the physical workplace reality of the front-line worker.",
      explanationKh: "ត្រឹមត្រូវណាស់! កម្មវិធីនោះត្រូវបានបង្កើតឡើងតាមការចង់បានរបស់អ្នកសរសេរកូដ មិនមែនដោះស្រាយការលំបាកជាក់ស្តែងរបស់កម្មករឡើយ។ កម្មវិធីត្រូវតែសមស្របនឹងបរិយាកាសការងារជាក់ស្តែង។"
    },
    {
      qEn: "3. What happens if you build a Power App without identifying who the Worker/Actor is?",
      qKh: "៣. តើមានអ្វីកើតឡើងប្រសិនបើអ្នកបង្កើតកម្មវិធី Power App ដោយមិនបានកំណត់ឱ្យច្បាស់ថាអ្នកណាជាអ្នកអនុវត្តការងារ (Worker/Actor)?",
      optionsEn: [
        "A) The app will capture data, but tickets will sit in digital storage unread and unassigned—just like the paper clipboard!",
        "B) The database will instantly corrupt and delete all records.",
        "C) Power Apps will refuse to save the screens.",
        "D) The application will automatically assign the tickets to artificial intelligence."
      ],
      optionsKh: [
        "A) កម្មវិធីនឹងកត់ត្រាទិន្នន័យបាន ប៉ុន្តែសំបុត្រស្នើសុំនឹងដេកស្តូកស្តឹងក្នុងទិន្នន័យដោយគ្មានអ្នកទទួលខុសត្រូវដោះស្រាយ ដូចគ្នានឹងក្រដាសជាប់ប្រេងលើក្តារខៀនដែរ!",
        "B) មូលដ្ឋានទិន្នន័យនឹងខូច ហើយលុបឯកសារចោលទាំងអស់ភ្លាមៗ។",
        "C) Power Apps នឹងបដិសេធមិនព្រមរក្សាទុកអេក្រង់ឡើយ។",
        "D) កម្មវិធីនឹងចាត់ចែងសំបុត្រនោះទៅឱ្យបញ្ញាសិប្បនិម្មិតដោយស្វ័យប្រវត្តិ។"
      ],
      correctIndex: 0,
      explanationEn: "Correct! An app requires a complete human loop: Requester logs ➔ Worker acts ➔ Supervisor monitors. Without the Worker role, work never gets done.",
      explanationKh: "ត្រឹមត្រូវណាស់! កម្មវិធីត្រូវការរង្វង់មនុស្សពេញលេញ៖ អ្នកស្នើសុំកត់ត្រា ➔ អ្នកដោះស្រាយអនុវត្ត ➔ ប្រធានតាមដាន។ បើគ្មានតួនាទីអ្នកដោះស្រាយទេ ការងារនឹងមិនត្រូវបានបញ្ចប់ឡើយ។"
    },
    {
      qEn: "4. What happens if a business task is performed only once every two years? Should you build a custom Power App for it?",
      qKh: "៤. តើមានអ្វីកើតឡើងប្រសិនបើកិច្ចការអាជីវកម្មមួយត្រូវធ្វើឡើងតែម្តងគត់ក្នុងរយៈពេលពីរឆ្នាំ? តើអ្នកគួរបង្កើតកម្មវិធី Power App សម្រាប់វាដែរឬទេ?",
      optionsEn: [
        "A) Yes, every task in a company should have its own Power App.",
        "B) No; custom apps require design, testing, and maintenance. For rare tasks, standard documentation, forms, or an email template is vastly more cost-effective.",
        "C) Only if the app has at least 10 screens.",
        "D) Yes, but only if built using Excel."
      ],
      optionsKh: [
        "A) គួរធ្វើ គ្រប់កិច្ចការទាំងអស់ក្នុងក្រុមហ៊ុនគួរតែមានកម្មវិធីផ្ទាល់ខ្លួន។",
        "B) មិនគួរធ្វើទេ; កម្មវិធីទាមទារការរចនា ការធ្វើតេស្ត និងការថែទាំ។ សម្រាប់កិច្ចការកម្រធ្វើ ការប្រើឯកសារណែនាំ ឬទម្រង់បែបបទធម្មតាមានប្រសិទ្ធភាពចំណាយខ្ពស់ជាងឆ្ងាយ។",
        "C) លុះត្រាតែកម្មវិធីនោះមានយ៉ាងហោចណាស់ ១០ អេក្រង់។",
        "D) គួរធ្វើ ប៉ុន្តែលុះត្រាតែបង្កើតដោយប្រើ Excel។"
      ],
      correctIndex: 1,
      explanationEn: "Correct! The first Litmus Test is Frequency & ROI. Custom apps provide high value for repetitive daily or weekly workflows, not one-off events.",
      explanationKh: "ត្រឹមត្រូវណាស់! វិញ្ញាសាដំបូងគឺ ភាពញឹកញាប់ និងផលចំណេញ (ROI)។ កម្មវិធីផ្តល់តម្លៃខ្ពស់បំផុតលើកិច្ចការប្រចាំថ្ងៃឬប្រចាំសប្តាហ៍ដែលកើតឡើងដដែលៗ មិនមែនកិច្ចការយូរៗម្តងឡើយ។"
    },
    {
      qEn: "5. Which user role should be interviewed FIRST when scoping an operational app opportunity?",
      qKh: "៥. តើអ្នកគួរជួបសម្ភាសន៍តួនាទីអ្នកប្រើប្រាស់ណាគេមុនគេបំផុត នៅពេលកំណត់វិសាលភាពឱកាសបង្កើតកម្មវិធី?",
      optionsEn: [
        "A) The Executive Vice President who approved the budget.",
        "B) The front-line worker (e.g. Line Operator) who physically experiences the friction every single day.",
        "C) The database administrator in the corporate headquarters.",
        "D) The graphic designer choosing the color scheme."
      ],
      optionsKh: [
        "A) អនុប្រធានប្រតិបត្តិដែលជាអ្នកអនុម័តថវិកា។",
        "B) កម្មករជួរមុខ (ឧ. បុគ្គលិកបញ្ជាម៉ាស៊ីន) ដែលជាអ្នកជួបប្រទះការលំបាកនិងបញ្ហាស្ទះជារៀងរាល់ថ្ងៃដោយផ្ទាល់។",
        "C) អ្នកគ្រប់គ្រងទិន្នន័យនៅការិយាល័យកណ្តាល។",
        "D) អ្នករចនាក្រាហ្វិកដែលជាអ្នកជ្រើសរើសពណ៌។"
      ],
      correctIndex: 1,
      explanationEn: "Correct! While executives set business targets, only the front-line worker knows the real operational friction, missing fields, and workplace constraints.",
      explanationKh: "ត្រឹមត្រូវណាស់! ខណៈពេលថ្នាក់ដឹកនាំជាអ្នកកំណត់ទិសដៅ មានតែបុគ្គលិកជួរមុខទេដែលដឹងពីការលំបាកពិតប្រាកដ ទិន្នន័យដែលបាត់បង់ និងឧបសគ្គជាក់ស្តែងក្នុងកន្លែងធ្វើការ។"
    }
  ];

  // --------------------------------------------------------------------------
  // 2. FULL BILINGUAL DICTIONARY (EXACT 1-TO-1 HTML STRUCTURE)
  // --------------------------------------------------------------------------
  const KHMER_SLIDES = {
    'slide-1': {
      title: 'ពីបញ្ហាជាក់ស្តែង ទៅជាឱកាសបង្កើតកម្មវិធី',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & រំលឹកចំណេះដឹង (០០:០០ - ១០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"សូមស្វាគមន៍មកកាន់ថ្ងៃទី ៧ នៃវគ្គសិក្សា Microsoft Power Apps Foundation!
ថ្ងៃនេះគឺជាចំណុចរបត់ដ៏សំខាន់៖ យើងឈានចូល ដំណាក់កាលទី ៣៖ ការគិតបែបអាជីវកម្ម (Business Thinking)!
ក្នុងរយៈពេល ៦ ថ្ងៃដំបូង អ្នកបានរៀនសមាសធាតុនៃម៉ាស៊ីនរួចហើយ៖ ទិន្នន័យចូល លំដាប់ជំហាន ប្រភេទតម្លៃ លក្ខខណ្ឌ True/False ការសម្រេចចិត្ត If និងច្រកតក្កវិជ្ជា AND/OR/NOT។
អ្នកដឹងពីរបៀបដែលម៉ាស៊ីនដំណើរការ!
ប៉ុន្តែឥឡូវនេះ សំណួរតម្លៃរាប់លានដុល្លារសួរថា៖
តើយើងកំពុងបង្កើតកម្មវិធីដើម្បីអ្វី ហើយសម្រាប់នរណា?
អ្នកចាប់ផ្តើមជាច្រើនបានបើក Power Apps ហើយចាប់ទាញប៊ូតុងដាក់លើអេក្រង់ បង្កើតបានកម្មវិធីដែលគ្មាននរណាម្នាក់ប្រើ!
ហេតុអ្វី? ពីព្រោះពួកគេមិនដែលស្វែងយល់ពីបញ្ហារបស់មនុស្សពិតប្រាកដ!
ថ្ងៃនេះ យើងរៀនក្របខ័ណ្ឌ ៥ សសរស្តម្ភ៖
បញ្ហាបច្ចុប្បន្ន ➔ លទ្ធផលចង់បាន ➔ មនុស្ស ➔ ព័ត៌មាន ➔ វិធានការ។"`,
      html: `
        <div class="hero-layout">
          <div class="hero-pill-group">
            <span class="hero-pill">ដំណាក់កាលទី ៣៖ ការគិតបែបអាជីវកម្ម</span>
            <span class="hero-pill teal-pill">ថ្ងៃទី ៧ នៃ ២៧</span>
            <span class="hero-pill blue-pill">៩០ នាទី</span>
          </div>
          <h1 class="hero-title">
            <span class="gradient-text">ពីបញ្ហាជាក់ស្តែង ទៅជាឱកាសបង្កើតកម្មវិធី</span><br>
            របៀបកំណត់អ្វីដែលត្រូវផ្លាស់ប្តូរ និងសម្រាប់នរណា មុនពេលចាប់ផ្តើមបង្កើត
          </h1>
          <p class="hero-subtitle">
            នៅថ្ងៃទី ១–៦ អ្នកបានស្ទាត់ជំនាញលើទិន្នន័យ លក្ខខណ្ឌ និងច្រកតក្កវិជ្ជា។ ថ្ងៃនេះ យើងបោះជំហានថយក្រោយ ដើម្បីស្វែងយល់ថាតើតម្រូវការទាំងនោះកើតចេញពីណា។ កម្មវិធីមិនមែនគ្រាន់តែជាប៊ូតុងលើអេក្រង់ទេ ប៉ុន្តែជាឧបករណ៍ប្រតិបត្តិការដែលដោះស្រាយការលំបាកជាក់ស្តែងរបស់មនុស្ស។
          </p>

          <div class="title-feature-grid">
            <div class="feature-item">
              <span class="feature-icon">&#128300;</span>
              <div class="feature-info">
                <h4>១. ការវិភាគរោគវិនិច្ឆ័យបញ្ហា</h4>
                <p>កំណត់ការលំបាកក្នុងកន្លែងធ្វើការ ពេលវេលាខ្ជះខ្ជាយ និងការស្ទះដោយសារក្រដាស មុនពេលប៉ះពាល់កម្មវិធី។</p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">&#128101;</span>
              <div class="feature-info">
                <h4>២. មនុស្ស &amp; តួនាទីអ្នកប្រើ</h4>
                <p>កំណត់តួនាទីសំខាន់ទាំង ៣៖ អ្នកស្នើសុំ (Requester), អ្នកអនុវត្ត (Worker), និងប្រធានតាមដាន (Supervisor)។</p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">&#9878;</span>
              <div class="feature-info">
                <h4>៣. កំណត់ទិន្នន័យ &amp; វិធានការ</h4>
                <p>ស្រង់យកតែទិន្នន័យសំខាន់ ៤-៥ ចំណុច និងវិធានការដែលនាំផ្លូវសកម្មភាព ដោយមិនបញ្ចូលទិន្នន័យឥតប្រយោជន៍។</p>
              </div>
            </div>
          </div>
        </div>
      `
    },

    'slide-2': {
      title: 'ផែនទីគំនិតរួមនៃកម្មវិធីសិក្សា',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & រំលឹកចំណេះដឹង (០០:០០ - ១០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"សូមក្រឡេកមើលគំរូផ្នត់គំនិតស្នូលរបស់យើងនៅលើអេក្រង់។
មើលកន្លែងដែលយើងកំពុងឈរនៅថ្ងៃទី ៧ នេះ!
នៅថ្ងៃទី ១ & ២ យើងរៀនថាកម្មវិធីធ្វើតាមជំហានដែលមានលំដាប់។
នៅថ្ងៃទី ៣ & ៤ យើងរៀនថាជំហាននីមួយៗដំណើរការលើទិន្នន័យ និងចោទសួរលក្ខខណ្ឌ True/False។
នៅថ្ងៃទី ៥ & ៦ យើងរៀនពីរបៀបដែល IF និង AND/OR ធ្វើការសម្រេចចិត្ត។
ឥឡូវនេះ សូមមើលដំណាក់កាលទី ៣៖ ការគិតបែបអាជីវកម្ម!
ថ្ងៃនេះនៅថ្ងៃទី ៧ យើងសួរថា៖ តើទិន្នន័យ និងតក្កវិជ្ជាទាំងនោះកើតចេញពីណា?
គឺកើតចេញពី បញ្ហាជាក់ស្តែង (Real Problem)!
បើអ្នកមិនស្គាល់បញ្ហា អ្នកនឹងមិនដឹងថាត្រូវប្រមូលទិន្នន័យអ្វី ឬសរសេរវិធានការអ្វីឡើយ។
ហើយមើលថ្ងៃស្អែកនៅថ្ងៃទី ៨៖ យើងនឹងយកឱកាសដែលបានកំណត់ថ្ងៃនេះ ទៅបង្កើតជាដ្យាក្រាមដំណើរការ និងគំនូសព្រាងអេក្រង់!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge purple-badge">ស្ថាបត្យកម្មកម្មវិធីសិក្សា</span>
          <h2 class="slide-title">តួនាទីនៃថ្ងៃនេះនៅក្នុងគំរូផ្នត់គំនិត ២៧ ថ្ងៃ</h2>
          <p class="slide-lead">យើងមិនដែលបង្រៀនមុខងារបច្ចេកទេសដាច់ដោយឡែកឡើយ។ ថ្ងៃនេះជាស្ពានភ្ជាប់តក្កវិជ្ជាបច្ចេកទេស ទៅកាន់ស្ថាបត្យកម្មអាជីវកម្មជាក់ស្តែង។</p>
        </div>

        <div class="mental-model-chain">
          <div class="chain-step step-completed">
            <span class="step-num">ថ្ងៃ ១-២</span>
            <span class="step-name">បញ្ហា &amp; លំដាប់</span>
            <span class="step-status">&#10003; គ្រឹះដំបូង</span>
          </div>
          <span class="chain-arrow">&#8594;</span>
          <div class="chain-step step-completed">
            <span class="step-num">ថ្ងៃ ៣-៤</span>
            <span class="step-name">ទិន្នន័យ &amp; លក្ខខណ្ឌ</span>
            <span class="step-status">&#10003; True / False</span>
          </div>
          <span class="chain-arrow">&#8594;</span>
          <div class="chain-step step-completed">
            <span class="step-num">ថ្ងៃ ៥-៦</span>
            <span class="step-name">តក្កវិជ្ជា &amp; សេចក្តីសម្រេច</span>
            <span class="step-status">&#10003; IF / AND / OR</span>
          </div>
          <span class="chain-arrow">&#8594;</span>
          <div class="chain-step step-active-day5">
            <span class="step-num">ថ្ងៃនេះ (ថ្ងៃ ៧)</span>
            <span class="step-name">ឱកាសកម្មវិធី</span>
            <span class="step-status">&#9733; ចាប់ផ្តើមវគ្គ ៣</span>
          </div>
          <span class="chain-arrow">&#8594;</span>
          <div class="chain-step step-future">
            <span class="step-num">ថ្ងៃ ៨-២៧</span>
            <span class="step-name">ដំណើរការ ➔ UI ➔ ដាក់ពង្រាយ</span>
            <span class="step-status">ខាងមុខ</span>
          </div>
        </div>

        <div class="grid-2-col" style="margin-top: 1.25rem;">
          <div class="info-card border-blue">
            <div class="card-header-icon">&#128260; របៀបដែលថ្ងៃ ១–៦ ភ្ជាប់មកថ្ងៃ ៧</div>
            <p>នៅថ្ងៃទី ១–៦ យើងបានរៀនរបៀបរក្សាទុកតម្លៃ សួរសំណួរប្រៀបធៀប និងសរសេរផ្លូវបំបែក <code>If()</code>។ ថ្ងៃនេះ យើងស្វែងយល់ពីរបៀបកំណត់ចំណុចស្ទះក្នុងកន្លែងធ្វើការណាដែលពិតជាត្រូវការទិន្នន័យ និងការសម្រេចចិត្តទាំងនោះ។</p>
          </div>
          <div class="info-card border-purple">
            <div class="card-header-icon">&#128301; ហេតុអ្វីបានជាថ្ងៃ ៨ ត្រូវការថ្ងៃ ៧</div>
            <p>ថ្ងៃស្អែកនៅថ្ងៃទី ៨ យើងនឹងបង្កើតផែនទីដំណើរការការងារ និងគំនូសព្រាងអេក្រង់អ្នកប្រើ។ អ្នកមិនអាចរចនាអេក្រង់បានទេ លុះត្រាតែអ្នកកំណត់បានច្បាស់ថានរណាជាអ្នកប្រើប្រាស់ ត្រូវការទិន្នន័យអ្វី និងរំពឹងចង់បានលទ្ធផលអ្វី។</p>
          </div>
        </div>
      `
    },

    'slide-3': {
      title: 'ការរំលឹកចំណេះដឹងជាមូលដ្ឋាន',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & រំលឹកចំណេះដឹង (០០:០០ - ១០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"សូមសាកល្បងការចងចាំសកម្មរបស់យើងជាមួយសំណួររំលឹកចំនួន ៣ ពីថ្ងៃទី ៣, ៥, & ៦!
សំណួរទី ១៖ នៅថ្ងៃទី ៦ ហេតុអ្វីបានជាយើងត្រូវការច្រកចម្រុះ (&& និង ||) ជំនួសឱ្យលក្ខខណ្ឌតែមួយ?
(ចម្លើយ៖ ពីព្រោះវិធានការជាក់ស្តែងអាស្រ័យលើកត្តាជាច្រើន ដូចជាសម្ពាធខ្ពស់ផង និងទឹកត្រជាក់ទាបផង!)
សំណួរទី ២៖ ពីថ្ងៃទី ៣ ហេតុអ្វីបានជាការកំណត់ប្រភេទតម្លៃ (Text, Number, Date, Boolean) មានសារៈសំខាន់?
(ចម្លើយ៖ ពីព្រោះកុំព្យូទ័ររក្សាទុកពួកវាខុសគ្នា; ការគណនានិងការប្រៀបធៀបត្រូវការលេខ មិនមែនអត្ថបទទេ!)
សំណួរទី ៣៖ តើអ្វីជាភាពខុសគ្នាសំខាន់រវាង Input និង Action?
(ចម្លើយ៖ Input គឺជាទិន្នន័យដែលមនុស្សវាយបញ្ចូល; Action គឺជាការងារដែលកម្មវិធីធ្វើឆ្លើយតប ដូចជាការផ្ញើដំណឹង ឬកត់ត្រា!)"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge blue-badge">ការរំលឹកចំណេះដឹងសកម្ម</span>
          <h2 class="slide-title">ការផ្ទៀងផ្ទាត់ចំណេះដឹងមុន៖ ការរំលឹកតក្កវិជ្ជា &amp; ទិន្នន័យ</h2>
          <p class="slide-lead">រំលឹកគោលគំនិតគ្រឹះនៃទិន្នន័យចូល ប្រភេទតម្លៃ និងច្រកតក្កវិជ្ជា មុនពេលយើងអនុវត្តលើការកំណត់ឱកាសអាជីវកម្ម។</p>
        </div>

        <div class="grid-3-col">
          <div class="retrieval-card">
            <div class="retrieval-num">01</div>
            <h4>ពីថ្ងៃទី ៦៖ ច្រកទ្វាររួម</h4>
            <p class="retrieval-q">ហេតុអ្វីបានជាវិធានការអាជីវកម្មត្រូវការ <code>&amp;&amp;</code> និង <code>||</code>?</p>
            <div class="retrieval-answer">
              <strong>ចម្លើយ៖</strong> ពីព្រោះការងារជាក់ស្តែងពឹងផ្អែកលើកត្តាជាច្រើនរួមគ្នា ដូចជាទាមទារទាំងសម្ពាធ និងទឹកត្រជាក់សម្រាប់សុវត្ថិភាពម៉ាស៊ីន។
            </div>
          </div>
          <div class="retrieval-card">
            <div class="retrieval-num">02</div>
            <h4>ពីថ្ងៃទី ៣៖ ប្រភេទតម្លៃ</h4>
            <p class="retrieval-q">ហេតុអ្វីបានជាយើងត្រូវកំណត់ឱ្យច្បាស់ថាជា Text, Number, ឬ Boolean?</p>
            <div class="retrieval-answer">
              <strong>ចម្លើយ៖</strong> ពីព្រោះកុំព្យូទ័ររក្សាទុកខុសគ្នា; ការគណនានិងតក្កវិជ្ជាទាមទារប្រភេទតម្លៃច្បាស់លាស់ (ឧ. <code>Value()</code>)។
            </div>
          </div>
          <div class="retrieval-card">
            <div class="retrieval-num">03</div>
            <h4>ពីថ្ងៃ ១-២៖ Input vs Action</h4>
            <p class="retrieval-q">តើអ្វីជាភាពខុសគ្នារវាង Input និង Action នៅក្នុងកម្មវិធី?</p>
            <div class="retrieval-answer">
              <strong>ចម្លើយ៖</strong> <strong>Input</strong> គឺជាព័ត៌មានដែលមនុស្សបញ្ចូល; ចំណែក <strong>Action</strong> គឺជាការងារដែលកម្មវិធីដំណើរការឆ្លើយតប។
            </div>
          </div>
        </div>
      `
    },

    'slide-4': {
      title: 'គោលបំណងសិក្សាដែលអាចវាស់វែងបាន',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & រំលឹកចំណេះដឹង (០០:០០ - ១០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"នេះជាគោលដៅសិក្សាដែលអាចវាស់វែងបានទាំង ៤ សម្រាប់ថ្ងៃទី ៧ នេះ។
នៅត្រឹមនាទីទី ៩០ អ្នកនឹងអាច៖
១. បែងចែករវាងឱកាសបង្កើត Power Apps ពិតប្រាកដ និងបញ្ហាដែលមិនមែនជាកម្មវិធីបានត្រឹមត្រូវ ១០០% លើ ៦ សេណារីយ៉ូ។
២. កំណត់តួនាទីអ្នកប្រើប្រាស់សំខាន់ទាំង ៣ (អ្នកស្នើសុំ, អ្នកដោះស្រាយ, ប្រធាន) និងទិន្នន័យចាំបាច់អប្បបរមា។
៣. បំប្លែងពាក្យត្អូញត្អែរទូទៅក្នុងកន្លែងធ្វើការ ឱ្យទៅជាវិធានការអាជីវកម្មច្បាស់លាស់សម្រាប់សរសេរកូដ។
៤. រៀបចំផែនការប្លង់ឱកាសកម្មវិធី ៥ សសរស្តម្ភ សម្រាប់បញ្ហាផ្លាស់ប្តូរពុម្ពដែកនៅរោងចក្រ Apex Plastics។"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge green-badge">សមត្ថភាពគោលដៅ</span>
          <h2 class="slide-title">គោលបំណងសិក្សាដែលអាចវាស់វែងបានទាំង ៤ សម្រាប់ថ្ងៃទី ៧</h2>
          <p class="slide-lead">នៅចុងបញ្ចប់នៃមេរៀន ៩០ នាទីនេះ អ្នកនឹងបង្ហាញសមត្ថភាពជាក់ស្តែងទាំងបួននេះដោយឯករាជ្យ៖</p>
        </div>

        <div class="grid-2-col">
          <div class="objective-card">
            <div class="obj-badge">គោលបំណង ១ • ការវិភាគរោគវិនិច្ឆ័យ</div>
            <h3>កំណត់ឱកាសកម្មវិធីពិតប្រាកដ</h3>
            <p>បែងចែករវាងចំណុចស្ទះប្រតិបត្តិការដដែលៗដែលសមស្របនឹង Power Apps និងបញ្ហាដែលមិនមែនជាកម្មវិធី (ការផ្លាស់ប្តូរគោលការណ៍, ផ្ទាំងព័ត៌មាន جامد, ការកែសម្រួលជាក់ស្តែង)។</p>
            <div class="obj-outcome">&#10004; វាយតម្លៃតាមរយៈកម្មវិធីត្រាប់តាម ៦ សេណារីយ៉ូ</div>
          </div>

          <div class="objective-card">
            <div class="obj-badge">គោលបំណង ២ • ការកំណត់តួនាទី</div>
            <h3>កំណត់តួនាទីអ្នកប្រើប្រាស់ទាំង ៣</h3>
            <p>កំណត់តម្រូវការនិងចំណុចអន្តរកម្មជាក់លាក់សម្រាប់ <strong>អ្នកស្នើសុំ (Requester)</strong>, <strong>អ្នកអនុវត្ត (Worker)</strong>, និង <strong>ប្រធានតាមដាន (Supervisor)</strong>។</p>
            <div class="obj-outcome">&#10004; វាយតម្លៃតាមរយៈប្លង់ផ្គូផ្គងតួនាទីទៅកាន់អេក្រង់</div>
          </div>

          <div class="objective-card">
            <div class="obj-badge">គោលបំណង ៣ • ការស្រង់វិធានការ</div>
            <h3>ស្រង់យកវិធានការអាជីវកម្មជាក់ស្តែង</h3>
            <p>បំប្លែងពាក្យត្អូញត្អែរមិនច្បាស់លាស់ (<em>"ជួយដោះស្រាយការធ្លាយប្រេងឱ្យលឿន"</em>) ទៅជាលក្ខខណ្ឌតក្កវិជ្ជា៖ <code>Condition (If) ➔ Action (Then) ➔ Fallback (Else)</code>។</p>
            <div class="obj-outcome">&#10004; វាយតម្លៃតាមរយៈការធ្វើសវនកម្មវិធានការអាជីវកម្ម</div>
          </div>

          <div class="objective-card">
            <div class="obj-badge">គោលបំណង ៤ • ស្ថាបត្យកម្ម</div>
            <h3>រៀបចំផែនការប្លង់ ៥ សសរស្តម្ភ</h3>
            <p>សំយោគបញ្ហាបច្ចុប្បន្ន លទ្ធផលចង់បាន អ្នកប្រើប្រាស់ ទិន្នន័យប្រមូល និងវិធានការអាជីវកម្ម ឱ្យទៅជាប្លង់ប្រតិបត្តិការ ១ ទំព័រ ត្រៀមសម្រាប់គូរគំនូសព្រាង។</p>
            <div class="obj-outcome">&#10004; វាយតម្លៃតាមរយៈបញ្ហាប្រឈមប្តូរពុម្ពដែក Apex Plastics</div>
          </div>
        </div>
      `
    },

    'slide-5': {
      title: 'កាលវិភាគ ៩០ នាទី',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & រំលឹកចំណេះដឹង (០០:០០ - ១០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"នេះជាកាលវិភាគ ៩០ នាទីដ៏ច្បាស់លាស់របស់យើងសម្រាប់ថ្ងៃនេះ៖
ផ្នែកទី ១ (០០:០០–១០:០០)៖ រំលឹកចំណេះដឹង ការតភ្ជាប់ និងគោលបំណង។
ផ្នែកទី ២ (១០:០០–២៥:០០)៖ មហន្តរាយក្រដាសជាប់ប្រេង $32,000 នៅ Apex Plastics និងឧទាហរណ៍ជាក់ស្តែងទាំងពីរ៖ គ្រូពេទ្យ និងស្ថាបត្យករ។
ផ្នែកទី ៣ (២៥:០០–៤៥:០០)៖ ក្របខ័ណ្ឌ ៥ សសរស្តម្ភ និងវិញ្ញាសាវាយតម្លៃលទ្ធភាពទាំង ៤។
ផ្នែកទី ៤ (៤៥:០០–៦០:០០)៖ សម្រាកសម្រួលឥរិយាបថ បន្ទាប់មកការបង្ហាញផ្ទាល់លើបន្ទះ Discovery Canvas។
ផ្នែកទី ៥ (៦០:០០–៧៥:០០)៖ អនុវត្តផ្ទាល់លើកម្មវិធីត្រាប់តាម ៦ សេណារីយ៉ូ និងកែកំហុសយល់ខុសទាំង ៤។
ផ្នែកទី ៦ (៧៥:០០–៩០:០០)៖ កម្រងសំណួរ ៥, បញ្ហាប្រឈមចុងក្រោយ, រូបប្រឡង និងការតភ្ជាប់ទៅកាន់ថ្ងៃទី ៨!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge purple-badge">រចនាសម្ព័ន្ធមេរៀន</span>
          <h2 class="slide-title">កាលវិភាគមេរៀន ៩០ នាទីបែប Spiral</h2>
          <p class="slide-lead">ការវិវឌ្ឍជាជំហានៗចាប់ពីការលំបាកប្រតិបត្តិការជាក់ស្តែង រហូតដល់ការរៀបចំប្លង់ឱកាសបង្កើតកម្មវិធីដ៏មានរចនាសម្ព័ន្ធ។</p>
        </div>

        <div class="agenda-timeline-grid">
          <div class="agenda-row">
            <div class="agenda-time">00:00 - 10:00 (10នាទី)</div>
            <div class="agenda-topic">
              <strong>ផ្នែកទី ១៖ ស្វាគមន៍ &amp; រំលឹកចំណេះដឹង</strong>
              <span>ភ្ជាប់ផ្នត់គំនិតស្នូល, រំលឹកសកម្មថ្ងៃ ១–៦, គោលបំណងសិក្សា ៤ យ៉ាង។</span>
            </div>
            <div class="agenda-milestone">គោលដៅ៖ ភ្ជាប់ផ្នត់គំនិត</div>
          </div>
          <div class="agenda-row">
            <div class="agenda-time">10:00 - 25:00 (15នាទី)</div>
            <div class="agenda-topic">
              <strong>ផ្នែកទី ២៖ មូលហេតុនៃការកំណត់បញ្ហា &amp; ឧទាហរណ៍</strong>
              <span>មហន្តរាយក្រដាសកត់ត្រា $32,000, ឧទាហរណ៍រោគវិនិច្ឆ័យរបស់គ្រូពេទ្យ, ប្លង់ស្ថាបត្យករ។</span>
            </div>
            <div class="agenda-milestone">គោលដៅ៖ យល់បញ្ហាជាក់ស្តែង</div>
          </div>
          <div class="agenda-row">
            <div class="agenda-time">25:00 - 45:00 (20នាទី)</div>
            <div class="agenda-topic">
              <strong>ផ្នែកទី ៣៖ ក្របខ័ណ្ឌ ៥ សសរស្តម្ភ &amp; វិញ្ញាសាវាយតម្លៃ</strong>
              <span>សសរស្តម្ភ៖ បញ្ហា ➔ លទ្ធផល ➔ មនុស្ស ➔ ព័ត៌មាន ➔ វិធានការ; វិញ្ញាសាវាយតម្លៃលទ្ធភាព ៤ ចំណុច។</span>
            </div>
            <div class="agenda-milestone">គោលដៅ៖ វិធីសាស្ត្រកំណត់វិសាលភាព</div>
          </div>
          <div class="agenda-row">
            <div class="agenda-time">45:00 - 60:00 (15នាទី)</div>
            <div class="agenda-topic">
              <strong>ផ្នែកទី ៤៖ ការបង្ហាញផ្ទាល់ &amp; បន្ទះ Discovery Canvas</strong>
              <span>ផ្អាកសម្រាកសម្រួលអារម្មណ៍; ការបង្ហាញបន្ទះអន្តរកម្មស្វែងរកឱកាសជាមួយពិន្ទុវាយតម្លៃផ្ទាល់។</span>
            </div>
            <div class="agenda-milestone">គោលដៅ៖ ការយល់ឃើញច្បាស់</div>
          </div>
          <div class="agenda-row">
            <div class="agenda-time">60:00 - 75:00 (15នាទី)</div>
            <div class="agenda-topic">
              <strong>ផ្នែកទី ៥៖ ការអនុវត្តផ្ទាល់ &amp; កម្មវិធីត្រាប់តាម</strong>
              <span>វិភាគការប្តូរពុម្ពម៉ាស៊ីនលេខ ៤; កម្មវិធីត្រាប់តាម ៦ សេណារីយ៉ូ (ឱកាសកម្មវិធី vs មិនមែនកម្មវិធី)។</span>
            </div>
            <div class="agenda-milestone">គោលដៅ៖ អនុវត្តដោយខ្លួនឯង</div>
          </div>
          <div class="agenda-row">
            <div class="agenda-time">75:00 - 90:00 (15នាទី)</div>
            <div class="agenda-topic">
              <strong>ផ្នែកទី ៦៖ ការធ្វើតេស្ត, បញ្ហាប្រឈម &amp; ស្ពានទៅមុខ</strong>
              <span>កម្រងសំណួរ ៥, បញ្ហាប្រឈមប្តូរពុម្ព Apex, រូបប្រឡង, កិច្ចការផ្ទះ &amp; ស្ពានទៅកាន់ថ្ងៃទី ៨។</span>
            </div>
            <div class="agenda-milestone">គោលដៅ៖ ការវាយតម្លៃចុងក្រោយ</div>
          </div>
        </div>
      `
    },

    'slide-6': {
      title: 'បញ្ហាកន្លែងធ្វើការ៖ មហន្តរាយ $32,000',
      segment: 'ផ្នែកទី ២៖ មូលហេតុនៃការកំណត់បញ្ហា (១០:០០ - ២៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"សូមក្រឡេកមើលរោងចក្រ Apex Plastics ក្នុងរោងចក្រម៉ាស៊ីនលេខ ៤។
ការស្នើសុំជួសជុលកន្លងមក ត្រូវបានកត់ត្រាលើក្រដាសដែលព្យួរជាប់នឹងម៉ាស៊ីន។
នៅម៉ោង ១:១៥ យប់ បុគ្គលិកឈ្មោះ ដារ៉ា បានឃើញស្នប់បូមប្រេងធារាសាស្ត្រលេខ ៣ ធ្លាយប្រេង និងបន្លឺសំឡេងស្រួយ។ គាត់បានកត់លើក្រដាសថា៖ 'ស្នប់លេខ ៣ ធ្លាយប្រេង សំឡេងឮចម្លែក'។
ពេលប្តូរវេនព្រឹក ផ្សែងប្រេងបានធ្វើឱ្យជោកក្រដាសនោះ។
ក្រដាសនោះបានព្យួរចោលនៅទីនោះអស់រយៈពេល ១៤ ម៉ោងដោយគ្មាននរណាមើលឃើញ!
នៅម៉ោង ៣:៣០ រសៀល ស្នប់បានគាំង បែកបំពង់ និងហៀរប្រេងក្តៅ ៤០០ លីត្រលើឥដ្ឋរោងចក្រ!
ការខាតបង់សរុប៖ $32,000!
បន្ទាប់មក អ្នកបង្កើតកម្មវិធីថ្មោងថ្មីម្នាក់ព្យាយាមជួយ៖
គាត់បានបង្កើតកម្មវិធីមួយដែលមាន ១៤ អេក្រង់ និង ៤៥ ប្រអប់ទិន្នន័យចាំបាច់ សួររកទាំងលេខកូដក្រុមហ៊ុនផលិត!
កម្មករពាក់ស្រោមដៃក្រាស់ ចំណាយពេលដល់ទៅ ១២ នាទីដើម្បីសរសេរសំបុត្រមួយ!
ក្នុងរយៈពេល ៤ ថ្ងៃ កម្មករបានបោះបង់ចោល Tablet ហើយត្រឡប់ទៅប្រើក្រដាសស្អិតវិញ!
ហេតុអ្វីបានជាកម្មវិធីបរាជ័យ? ពីព្រោះគាត់មិនបានស្វែងយល់ពីបញ្ហាពិតប្រាកដ!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge red-badge">ករណីសិក្សាការងារជាក់ស្តែង</span>
          <h2 class="slide-title">Apex Plastics៖ មហន្តរាយ "ក្រដាសជាប់ប្រេង" ខាតបង់ $32,000</h2>
          <p class="slide-lead">របៀបដែលក្រដាសកត់ត្រាដែលគេមើលរំលងបានបង្កឱ្យលិចប្រេងរោងចក្រ និងមូលហេតុដែលកម្មវិធីស្មុគស្មាញ ១៤ អេក្រង់ត្រូវបានគេបោះបង់ចោល។</p>
        </div>

        <div class="story-case-box">
          <div class="story-header">
            <span class="warning-icon">&#9888;</span>
            <div>
              <h3 style="margin:0; color:#fb7185;">របាយការណ៍ឧបទ្ទវហេតុ៖ ការគាំងប្រព័ន្ធធារាសាស្ត្រលេខ ៤ &amp; ការបរាជ័យនៃកម្មវិធីថ្មី</h3>
              <span style="font-size:0.85rem; color:#cbd5e1;">Apex Plastics Manufacturing • កំណត់ត្រាថែទាំម៉ាស៊ីនខ្សែសង្វាក់លេខ ៤</span>
            </div>
          </div>

          <div class="story-grid">
            <div class="story-panel">
              <h4>អ្វីដែលបានកើតឡើង (ការបរាជ័យនៃក្រដាស &amp; កម្មវិធីដែលមិនបានសិក្សា)៖</h4>
              <div class="math-card math-actual">
                <span>ក្រដាសកត់ត្រា៖ ជោកជាំដោយប្រេង &bull; ព្យួរចោលមិនមានអ្នកមើល <strong>១៤ ម៉ោង</strong></span>
                <span>មហន្តរាយ៖ គាំងស្នប់, បែកទុយោ, ហៀរប្រេង ៤០០L, ឈប់ដំណើរការ ១៨ ម៉ោង</span>
                <span>កម្មវិធីដោះស្រាយដែលខុស៖ ១៤ អេក្រង់ មាន ៤៥ ប្រអប់ទិន្នន័យ &bull; ចំណាយពេល ១២ នាទី</span>
                <div class="calc-divider"></div>
                <span class="result-line-fail">លទ្ធផល៖ <strong>ខាតបង់ $32,000 • Tablet ត្រូវបានបោះបង់ចោលក្នុងរយៈពេល ៤ ថ្ងៃ</strong></span>
              </div>
            </div>

            <div class="story-panel">
              <h4>អ្វីដែលការកំណត់បញ្ហាពិតប្រាកដសម្រេចបាន (ឱកាសកម្មវិធីពិត)៖</h4>
              <div class="math-card math-expected">
                <span>តម្រូវការមនុស្សពិត៖ ចុច ៤ ដងក្នុងរយៈពេល &lt; ៦០ វិនាទីលើ Tablet ធន់នឹងការប៉ះទង្គិច</span>
                <span>ការបញ្ជូនស្វ័យប្រវត្ត៖ ផ្ញើដំណឹងភ្លាមៗទៅកាន់ទូរស័ព្ទជាងដែលកំពុងបំពេញការងារ</span>
                <span>ការតាមដានច្បាស់លាស់៖ ផ្ទាំងបង្ហាញស្ថានភាពម៉ាស៊ីនផ្ទាល់សម្រាប់ប្រធានវេន</span>
                <div class="calc-divider"></div>
                <span class="result-line">លទ្ធផល៖ <strong>ពេលរង់ចាំជួសជុលធ្លាក់ចុះពី ១៤ ម៉ោងមកត្រឹម ១៨ នាទី • ខាតបង់ប្រេង $0</strong></span>
              </div>
            </div>
          </div>

          <div class="story-footer">
            <strong>មូលហេតុឫសគល់៖</strong> កម្មវិធីមិនមែនជោគជ័យដោយសារតែវាដំណើរការគ្មានកំហុសកូដនោះទេ។ ប្រសិនបើកម្មវិធីមិនដោះស្រាយ <strong>ការលំបាកជាក់ស្តែងរបស់មនុស្សជួរមុខ</strong> ទេ វានឹងត្រូវគេបដិសេធចោលភ្លាមៗ។
          </div>
        </div>
      `
    },

    'slide-7': {
      title: 'គោលគំនិតសាមញ្ញ៖ អ្វីជាឱកាសបង្កើតកម្មវិធី?',
      segment: 'ផ្នែកទី ២៖ មូលហេតុនៃការកំណត់បញ្ហា (១០:០០ - ២៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"តើអ្វីទៅជាឱកាសបង្កើតកម្មវិធី (App Opportunity) ក្នុងភាសាសាមញ្ញ?
វាមិនមែនជាគំនិតចៃដន្យដែលស្រាប់តែផុសឡើងក្នុងក្បាលនោះទេ។
ឱកាសបង្កើតកម្មវិធី គឺជាសកម្មភាពមនុស្សជាក់លាក់ ដដែលៗ និងកំពុងស្ទះ ដែលអាចត្រូវបានកែលម្អយ៉ាងខ្លាំងដោយការជំនួសក្រដាសដែលងាយបាត់ អ៊ីមែលដែលយឺតយ៉ាវ ឬការទូរស័ព្ទដែលច្របូកច្របល់ មកជាឧបករណ៍សាមញ្ញលើទូរស័ព្ទ Tablet ឬកុំព្យូទ័រ!
ចូរសួរសំណួរ ៣ នេះ៖
១. តើវាជាការងារដដែលៗមែនទេ? (កើតឡើងរាល់ថ្ងៃ ឬរាល់សប្តាហ៍?)
២. តើមានការផ្ទេរការងារច្បាស់លាស់ទេ? (មនុស្ស A បញ្ចូលទិន្នន័យ មនុស្ស B ទៅដោះស្រាយ?)
៣. តើមានវិធានការ និងការតាមដានទេ? (តើថ្នាក់គ្រប់គ្រងត្រូវការដឹងពីស្ថានភាពទេ?)
បើចម្លើយគឺពិត នោះអ្នកបានរកឃើញឱកាសបង្កើតកម្មវិធីហើយ!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge blue-badge">ផ្នត់គំនិតស្នូល</span>
          <h2 class="slide-title">ភាសាសាមញ្ញ៖ តើអ្វីទៅជា "ឱកាសបង្កើតកម្មវិធី" (App Opportunity)?</h2>
          <p class="slide-lead">ការស្វែងយល់ថាតើពេលណាដែលចំណុចស្ទះក្នុងកន្លែងធ្វើការសមស្របនឹងការបង្កើតកម្មវិធី មុនពេលចាប់ផ្តើមសរសេរកូដ។</p>
        </div>

        <div class="grid-2-col" style="gap: 1.5rem;">
          <div class="concept-card">
            <div class="concept-badge red-badge">&#10060; អ្វីដែលមិនមែនជាឱកាសកម្មវិធី</div>
            <h3>គំនិតខុស &amp; គម្រោងកម្មវិធីដែលខ្ជះខ្ជាយ</h3>
            <p>បញ្ហាដែលមិនត្រូវការកម្មវិធីផ្ទាល់ខ្លួន ហើយអាចដោះស្រាយបានល្អជាងតាមរយៈការប្រាស្រ័យទាក់ទង ឬឧបករណ៍ដែលមានស្រាប់។</p>
            <div class="concept-examples">
              <div class="example-item">កិច្ចការធ្វើតែម្តងគត់ (ឧ. ការបោះឆ្នោតរើសទីតាំងជប់លៀងប្រចាំឆ្នាំ)។</div>
              <div class="example-item">ព័ត៌មានដែលមិនប្រែប្រួល (ឧ. ការបិទផ្សាយម៉ឺនុយអាហារប្រចាំសប្តាហ៍)។</div>
              <div class="example-item">បញ្ហាគោលការណ៍គ្រប់គ្រង (ឧ. បុគ្គលិកមកប្រជុំវេនយឺតយ៉ាវ)។</div>
            </div>
          </div>

          <div class="concept-card">
            <div class="concept-badge green-badge">&#10004; អ្វីដែលជាឱកាសកម្មវិធីពិត</div>
            <h3>បេក្ខភាពចម្បងសម្រាប់ Power Apps</h3>
            <p>ការផ្ទេរការងារប្រតិបត្តិការដដែលៗ ដែលការបាត់បង់ទិន្នន័យ ការយឺតយ៉ាវ ឬការខ្វះការតាមដាន បង្កឱ្យខាតបង់អាជីវកម្ម។</p>
            <div class="concept-examples">
              <div class="example-item">&#10004; <strong>ការផ្ទេរការងារដដែលៗ៖</strong> មនុស្ស A ស្នើសុំ; មនុស្ស B ទៅដោះស្រាយ។</div>
              <div class="example-item">&#10004; <strong>ការប្រមូលទិន្នន័យចល័ត៖</strong> ការត្រួតពិនិត្យលើឥដ្ឋរោងចក្រ, សវនកម្ម, សំបុត្រការងារ។</div>
              <div class="example-item">&#10004; <strong>តក្កវិជ្ជាស្វ័យប្រវត្ត &amp; SLA៖</strong> បញ្ហាបន្ទាន់បញ្ជូនដំណឹងទៅប្រធានភ្លាមៗ។</div>
            </div>
          </div>
        </div>

        <div class="takeaway-banner">
          <strong>ចំណុចគន្លឹះសំខាន់៖</strong> <em>"ការធ្វើស្វ័យប្រវត្តិកម្មលើដំណើរការដែលខូច នឹងផ្តល់ឱ្យអ្នកនូវភាពវឹកវរស្វ័យប្រវត្តិប៉ុណ្ណោះ។"</em> ត្រូវកែសម្រួលការផ្ទេរការងាររបស់មនុស្សឱ្យច្បាស់សិន មុនពេលបង្កើតឧបករណ៍ឌីជីថល!
        </div>
      `
    },

    'slide-8': {
      title: 'ឧទាហរណ៍ជាក់ស្តែង ១៖ រោគវិនិច្ឆ័យរបស់គ្រូពេទ្យ',
      segment: 'ផ្នែកទី ២៖ មូលហេតុនៃការកំណត់បញ្ហា (១០:០០ - ២៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"ដើម្បីយល់ពីមូលហេតុដែលការកំណត់បញ្ហាត្រូវធ្វើមុនគេ សូមគិតដល់ការទៅជួបគ្រូពេទ្យ។
ស្រមៃថាអ្នកដើរចូលគ្លីនិក ហើយគ្រូពេទ្យវះកាត់ប្រញាប់រុញអ្នកចូលបន្ទប់វះកាត់ ចាប់កាំបិតវះកាត់ ហើយចាប់ផ្តើមកាត់ពោះរបស់អ្នកភ្លាម!
អ្នកប្រាកដជាស្រែកថា៖ 'ឈប់សិន! លោកគ្រូពេទ្យមិនទាន់ទាំងបានសួរខ្ញុំផងថាខ្ញុំឈឺត្រង់ណា!'
គ្រូពេទ្យតែងតែធ្វើតាមលំដាប់លំដោយយ៉ាងត្រឹមត្រូវ៖
១. ស្តាប់រោគសញ្ញា (ការឈឺចាប់បច្ចុប្បន្ន)។
២. វាស់កម្តៅ សម្ពាធឈាម និងធ្វើតេស្ត (ទិន្នន័យ/ព័ត៌មាន)។
៣. កំណត់ជំងឺ (រោគវិនិច្ឆ័យ)។
៤. កំណត់លក្ខខណ្ឌនៃការព្យាបាល (វិធានការ)។
៥. ទើបចេញវេជ្ជបញ្ជា ឬធ្វើការវះកាត់ (សកម្មភាព)!
ការបង្កើតកម្មវិធីមុនពេលស្គាល់បញ្ហា គឺដូចជាការវះកាត់លើសរីរាង្គខុសយ៉ាងដូច្នោះដែរ!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge gold-badge">ឧទាហរណ៍ប្រៀបធៀប ១</span>
          <h2 class="slide-title">ឧទាហរណ៍ ១៖ រោគវិនិច្ឆ័យរបស់គ្រូពេទ្យមុនពេលវះកាត់</h2>
          <p class="slide-lead">គ្រូពេទ្យវះកាត់មិនដែលកាន់កាំបិតវះកាត់មុនពេលធ្វើរោគវិនិច្ឆ័យអ្នកជំងឺឡើយ។ អ្នកបង្កើតកម្មវិធីក៏មិនត្រូវសរសេរកូដមុនពេលយល់ពីបញ្ហាអាជីវកម្មដែរ។</p>
        </div>

        <div class="railway-switch-box">
          <div class="train-origin">
            <span class="rail-icon">&#129658;</span>
            <strong>រោគសញ្ញាអ្នកជំងឺ</strong>
            <p>ឈឺត្រង់ណា? យ៉ាងម៉េច?</p>
          </div>

          <div class="switch-lever">
            <div class="lever-indicator">&#128269;</div>
            <span class="lever-label">រោគវិនិច្ឆ័យវេជ្ជសាស្ត្រ</span>
            <code>ពិនិត្យមុនព្យាបាល</code>
          </div>

          <div class="track-branches">
            <div class="track-branch branch-true">
              <span class="branch-pill pill-true">ធ្វើរោគវិនិច្ឆ័យជាមុន</span>
              <strong>ការព្យាបាលចំគោលដៅ (ជាសះស្បើយ)</strong>
              <p>កំណត់មូលហេតុពិតប្រាកដ៖ ចេញថ្នាំ ឬធ្វើការព្យាបាលបានត្រឹមត្រូវ ១០០%។</p>
            </div>

            <div class="track-branch branch-false">
              <span class="branch-pill pill-false">ប្រញាប់កាន់កាំបិតវះកាត់</span>
              <strong>កំហុសវេជ្ជសាស្ត្រ (មហន្តរាយ)</strong>
              <p>កាត់ដោយងងឹតងងល់៖ ប៉ះពាល់សរីរាង្គល្អ ខណៈពេលជំងឺពិតប្រាកដនៅតែបន្តរីករាលដាល។</p>
            </div>
          </div>
        </div>
      `
    },

    'slide-9': {
      title: 'ឧទាហរណ៍ជាក់ស្តែង ២៖ ប្លង់ស្ថាបត្យករ',
      segment: 'ផ្នែកទី ២៖ មូលហេតុនៃការកំណត់បញ្ហា (១០:០០ - ២៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"នេះជាឧទាហរណ៍ជាក់ស្តែងទីពីររបស់យើង៖ ប្លង់ស្ថាបត្យករ។
អ្នកប្រាកដជាមិនដែលបញ្ជាទិញឥដ្ឋ ១០,០០០ ដុំ ទម្លាក់លើដីភក់ ហើយប្រាប់ជាងសំណង់ឱ្យចាប់ផ្តើមបូកជញ្ជាំងដោយគ្មានប្លង់នោះទេ!
តើនរណានឹងរស់នៅក្នុងផ្ទះនេះ? មានមនុស្សប៉ុន្មាននាក់? ទ្វារនៅឯណា? បំពង់ទឹក និងខ្សែភ្លើងរត់តាមណា?
នៅក្នុង Power Apps៖
ប៊ូតុង ប្រអប់អត្ថបទ និងផ្ទាំង Gallery គឺជាដុំឥដ្ឋរបស់អ្នក!
ការកំណត់បញ្ហាគឺជាប្លង់ស្ថាបត្យកម្មរបស់អ្នក!
ប្រសិនបើអ្នកសាងសង់ដោយគ្មានប្លង់ ជញ្ជាំងរបស់អ្នកនឹងដួលរលំ ហើយអ្នកនឹងត្រូវវាយកម្ទេចអគារចោលទាំងមូល!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge gold-badge">ឧទាហរណ៍ប្រៀបធៀប ២</span>
          <h2 class="slide-title">ឧទាហរណ៍ ២៖ ប្លង់ស្ថាបត្យករមុនពេលរៀបឥដ្ឋ</h2>
          <p class="slide-lead">ប៊ូតុង ផ្ទាំង Gallery និងប្រអប់អត្ថបទ គឺជាដុំឥដ្ឋសំណង់។ ការកំណត់បញ្ហាគឺជាប្លង់ស្ថាបត្យកម្មដែលផ្តល់គោលបំណងដល់ពួកវា។</p>
        </div>

        <div class="railway-switch-box">
          <div class="train-origin">
            <span class="rail-icon">&#127959;</span>
            <strong>តម្រូវការអតិថិជន</strong>
            <p>អ្នកណារស់នៅ? បន្ទប់?</p>
          </div>

          <div class="switch-lever">
            <div class="lever-indicator">&#128208;</div>
            <span class="lever-label">ប្លង់ស្ថាបត្យកម្ម</span>
            <code>បំពង់ទឹក &bull; ខ្សែភ្លើង &bull; ប្លង់បន្ទប់</code>
          </div>

          <div class="track-branches">
            <div class="track-branch branch-true">
              <span class="branch-pill pill-true">សាងសង់តាមប្លង់</span>
              <strong>ផ្ទះរឹងមាំមានប្រយោជន៍ (យូរអង្វែង)</strong>
              <p>បន្ទប់សមស្របនឹងអ្នករស់នៅ៖ ប្រព័ន្ធទឹក និងភ្លើងត្រូវបានតភ្ជាប់គ្នាយ៉ាងរលូន។</p>
            </div>

            <div class="track-branch branch-false">
              <span class="branch-pill pill-false">រៀបឥដ្ឋដោយងងឹតងងល់</span>
              <strong>ការបាក់រលំ (ខ្ជះខ្ជាយលុយ)</strong>
              <p>ជញ្ជាំងបាំងផ្លូវដើរ៖ គ្មានបំពង់ទឹក អគារត្រូវតែវាយកម្ទេចចោលវិញទាំងស្រុង។</p>
            </div>
          </div>
        </div>
      `
    },

    'slide-10': {
      title: 'ក្របខ័ណ្ឌ ៥ សសរស្តម្ភនៃឱកាសកម្មវិធី',
      segment: 'ផ្នែកទី ៣៖ ក្របខ័ណ្ឌ & វិញ្ញាសាវាយតម្លៃ (២៥:០០ - ៤៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"ឥឡូវនេះ សូមពិនិត្យមើលសសរស្តម្ភទាំង ៥ នៃក្របខ័ណ្ឌឱកាសបង្កើតកម្មវិធី (5-Part Opportunity Framework)។
គ្រប់កម្មវិធីដែលជោគជ័យទាំងអស់លើលោក អាចត្រូវបានកំណត់ដោយប្រើសសរស្តម្ភទាំង ៥ នេះ៖
១. បញ្ហាបច្ចុប្បន្ន (Problem)៖ តើអ្វីកំពុងឈឺចាប់ឥឡូវនេះ? (បាត់ក្រដាស មិនមានអ្នកមើល ខាតបង់ពេល)។
២. លទ្ធផលចង់បាន (Result)៖ តើភាពជោគជ័យពេញលេញមើលទៅដូចម្តេច? (ជួសជុលក្នុងពេល < ២០ នាទី ដំណឹងបន្ទាន់ភ្លាមៗ)។
៣. មនុស្ស (People)៖ តើនរណាខ្លះជាអ្នកពាក់ព័ន្ធ? (កម្មករកត់ត្រា ជាងទៅជួសជុល ប្រធានតាមដាន)។
៤. ព័ត៌មាន (Information)៖ តើទិន្នន័យ ៤-៥ ចំណុចណាដែលចាំបាច់ដាច់ខាត? (លេខម៉ាស៊ីន ប្រភេទខូច កម្រិតបន្ទាន់ រូបថត)។
៥. វិធានការ (Rules)៖ តើលក្ខខណ្ឌអ្វីខ្លះដែលនាំផ្លូវការសម្រេចចិត្ត? (បើសិនជាបន្ទាន់ខ្លាំង ➔ បន្លឺស៊ីរ៉ែន និងផ្ញើដំណឹងភ្លាម)។
សូមចងចាំលំដាប់នេះ៖ បញ្ហា ➔ លទ្ធផល ➔ មនុស្ស ➔ ព័ត៌មាន ➔ វិធានការ!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge purple-badge">វិធីសាស្ត្រកំណត់វិសាលភាព</span>
          <h2 class="slide-title">ក្របខ័ណ្ឌ ៥ សសរស្តម្ភនៃឱកាសបង្កើតកម្មវិធី</h2>
          <p class="slide-lead">លំដាប់លំដោយនៃការស្វែងយល់ជាសកលចំនួន ៥ ជំហាន ដែលត្រូវធ្វើជាដាច់ខាតមុនពេលបង្កើតអេក្រង់ ឬសរសេរកូដ Power Fx។</p>
        </div>

        <div class="pantry-grid" style="grid-template-columns: repeat(5, 1fr);">
          <div class="pantry-jar border-blue">
            <div class="jar-icon">&#128308;</div>
            <h4>១. បញ្ហា</h4>
            <span class="jar-substance">អ្វីដែលឈឺចាប់?</span>
            <p>បាត់ក្រដាសកត់ត្រា, ជួសជុលយឺតយ៉ាវ, គ្មានការទទួលខុសត្រូវ។</p>
            <div class="jar-example"><code>Pain Point</code></div>
          </div>

          <div class="pantry-jar border-num">
            <div class="jar-icon">&#127919;</div>
            <h4>២. លទ្ធផល</h4>
            <span class="jar-substance">គោលដៅចង់បាន</span>
            <p>កត់ត្រាសំបុត្រ &lt; ៦០វិនាទី, បញ្ជូនជាងភ្លាមៗ។</p>
            <div class="jar-example"><code>Target KPI</code></div>
          </div>

          <div class="pantry-jar border-date">
            <div class="jar-icon">&#128101;</div>
            <h4>៣. មនុស្ស</h4>
            <span class="jar-substance">តួនាទីអ្នកប្រើ</span>
            <p>កម្មករម៉ាស៊ីន, ជាងថែទាំ, ប្រធានវេន។</p>
            <div class="jar-example"><code>Stakeholders</code></div>
          </div>

          <div class="pantry-jar border-bool">
            <div class="jar-icon">&#128196;</div>
            <h4>៤. ព័ត៌មាន</h4>
            <span class="jar-substance">ប្រអប់ទិន្នន័យ</span>
            <p>លេខម៉ាស៊ីន, ប្រភេទខូច, កម្រិតបន្ទាន់, ចំណាំ, រូបថត។</p>
            <div class="jar-example"><code>Data Inputs</code></div>
          </div>

          <div class="pantry-jar border-blue">
            <div class="jar-icon">&#9878;</div>
            <h4>៥. វិធានការ</h4>
            <span class="jar-substance">ច្រកតក្កវិជ្ជា</span>
            <p>បើបន្ទាន់ខ្លាំង ➔ ផ្តល់ដំណឹងភ្លាម; បើធម្មតា ➔ រង់ចាំតាមជួរ។</p>
            <div class="jar-example"><code>Business Logic</code></div>
          </div>
        </div>
      `
    },

    'slide-11': {
      title: 'ដ្យាក្រាមលំហូរហេតុ & ផល',
      segment: 'ផ្នែកទី ៣៖ ក្របខ័ណ្ឌ & វិញ្ញាសាវាយតម្លៃ (២៥:០០ - ៤៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"សូមក្រឡេកមើលលំហូរហេតុនិងផលនៅលើអេក្រង់។
មើលរបៀបដែលបញ្ហាមនុស្សដែលច្របូកច្របល់ បំប្លែងទៅជាស្ថាបត្យកម្មកម្មវិធីដ៏ស្អាតស្អំ៖
កម្រិតទី ១៖ ភាពវឹកវរលើឥដ្ឋរោងចក្រ (បាត់ក្តារខៀន ក្រដាសជោកប្រេង ខាតបង់ $32,000)។
កម្រិតទី ២៖ ក្របខ័ណ្ឌ ៥ សសរស្តម្ភ ស្រង់យករចនាសម្ព័ន្ធចេញពីភាពវឹកវរនោះ។
កម្រិតទី ៣៖ រចនាសម្ព័ន្ធនោះកំណត់ទម្រង់អេក្រង់ Power Apps ដោយផ្ទាល់!
សូមកត់សម្គាល់៖ តួនាទីកម្មករ ក្លាយជា អេក្រង់ទី ១ (ទម្រង់ Kiosk សាមញ្ញ)។
តួនាទីជាង ក្លាយជា អេក្រង់ទី ២ (បញ្ជីការងារដែលមានប៊ូតុងទទួលការងារ)។
តួនាទីប្រធាន ក្លាយជា អេក្រង់ទី ៣ (ផ្ទាំងព័ត៌មាន KPI ផ្ទាល់)។
ហើយវិធានការអាជីវកម្ម ក្លាយជារូបមន្ត Power Fx If()!
នេះជារបៀបដែល Citizen Developer បង្កើតកម្មវិធីប្រកបដោយគោលបំណង!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge blue-badge">ស្ថាបត្យកម្មលំហូរតក្កវិជ្ជា</span>
          <h2 class="slide-title">ហេតុ &amp; ផលជាក់ស្តែង៖ ពីភាពវឹកវរក្នុងរោងចក្រ ទៅជាអេក្រង់កម្មវិធី</h2>
          <p class="slide-lead">តាមដានរបៀបដែលការស្ទះប្រតិបត្តិការដែលរញ៉េរញ៉ៃ បំប្លែងខ្លួនជាប្រព័ន្ធទៅជាស្ថាបត្យកម្មកម្មវិធីដ៏មានរចនាសម្ព័ន្ធ។</p>
        </div>

        <div class="branching-diagram-container">
          <div class="diagram-root">
            <span class="root-badge">ការស្ទះប្រតិបត្តិការ</span>
            <code>បាត់ក្រដាសកត់ត្រា &bull; ពន្យារពេល ១៤ ម៉ោង &bull; ខាតបង់ $32,000</code>
          </div>

          <div class="diagram-stem">&#10142;</div>

          <div class="diagram-decision-diamond">
            <span class="diamond-tag">ក្របខ័ណ្ឌ ៥ សសរស្តម្ភ</span>
            <strong>បញ្ហា ➔ លទ្ធផល ➔ មនុស្ស ➔ ព័ត៌មាន ➔ វិធានការ</strong>
            <div class="diamond-result">លក្ខណៈបច្ចេកទេសស្អាតស្អំ</div>
          </div>

          <div class="diagram-fork-branches">
            <div class="fork-path path-active">
              <span class="fork-tag tag-true">&#10004; ប្លង់អេក្រង់ &amp; តក្កវិជ្ជា</span>
              <h4>ការបង្កើតកម្មវិធីមានរចនាសម្ព័ន្ធ (គំនូសព្រាងថ្ងៃទី ៨)</h4>
              <p>អេក្រង់ ១៖ Kiosk (កម្មករ) &bull; អេក្រង់ ២៖ បញ្ជីការងារ (ជាង) &bull; អេក្រង់ ៣៖ ផ្ទាំង KPI (ប្រធាន)។</p>
            </div>

            <div class="fork-path path-dormant">
              <span class="fork-tag tag-false">&#10060; ការស្មានដោយគ្មានការសិក្សា</span>
              <h4>កម្មវិធីហើម ១៤ អេក្រង់ (ត្រូវបានបោះបង់ចោល)</h4>
              <p>មាន ៤៥ ប្រអប់ទិន្នន័យបច្ចេកទេសបង្ខំ បង្កការភ័ន្តច្រឡំ កម្មវិធីត្រូវបោះចោលក្នុងរយៈពេល ៤ ថ្ងៃ។</p>
            </div>
          </div>
        </div>
      `
    },

    'slide-12': {
      title: 'ការបង្ហាញផ្ទាល់៖ Discovery Canvas',
      segment: 'ផ្នែកទី ៤៖ ការបង្ហាញផ្ទាល់របស់អ្នកបណ្តុះបណ្តាល (៤៥:០០ - ៦០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"ឥឡូវនេះ សូមបើកបន្ទះពិសោធន៍ផ្ទាល់ App Opportunity Discovery Canvas របស់យើង!
មើលនៅពេលខ្ញុំធ្វើអន្តរកម្មជាមួយផ្ទាំងនេះ៖
ខ្ញុំអាចជ្រើសរើសសេណារីយ៉ូកន្លែងធ្វើការផ្សេងៗគ្នា៖
១. ការកត់ត្រាម៉ាស៊ីនខូច (Apex Plastics)
២. ការស្នើសុំប្តូរពុម្ពដែក (Molding Shop)
៣. ការត្រួតពិនិត្យសុវត្ថិភាពឡានលើក Forklift
៤. ផ្ទាំងបិទផ្សាយម៉ឺនុយអាហារ
មើលរបៀបដែលសសរស្តម្ភទាំង ៥ ផ្លាស់ប្តូរដោយស្វ័យប្រវត្តិ៖
បញ្ហាឈឺចាប់ គោលដៅ តួនាទីទាំង ៣ ប្រអប់ទិន្នន័យ និងវិធានការ!
មើលកាតវាយតម្លៃនៅខាងស្តាំ៖
វានឹងវាយតម្លៃគម្រោងធៀបនឹងវិញ្ញាសាទាំង ៤ របស់យើង៖
តើវាញឹកញាប់ទេ? បាទ! តើមានការផ្ទេរការងារទេ? បាទ! តើត្រូវការវិធានការទេ? បាទ!
កាតនេះនឹងបង្ហាញពណ៌បៃតងចែងចាំងជាមួយពិន្ទុ 95% High App Opportunity!
នេះជារបៀបដែលអ្នកប្រឹក្សាអាជីពវាយតម្លៃគម្រោងមុនពេលសរសេរកូដ!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge blue-badge">ការពិសោធន៍អន្តរកម្ម</span>
          <h2 class="slide-title">ការបង្ហាញរបស់អ្នកបណ្តុះបណ្តាល៖ បន្ទះស្វែងរកឱកាសកម្មវិធី (Discovery Canvas)</h2>
          <p class="slide-lead">ជ្រើសរើសចំណុចស្ទះក្នុងកន្លែងធ្វើការផ្សេងៗគ្នាខាងក្រោម ដើម្បីមើលរបៀបដែលសសរស្តម្ភទាំង ៥ បង្កើតវិសាលភាពកម្មវិធីជាមួយពិន្ទុវាយតម្លៃផ្ទាល់។</p>
        </div>

        <div class="workbench-grid">
          <div class="workbench-inputs">
            <h4>ជ្រើសរើសករណីសិក្សាកន្លែងធ្វើការ៖</h4>
            <div class="input-control-row">
              <label>សេណារីយ៉ូចំណុចស្ទះប្រតិបត្តិការ៖</label>
              <select id="canvas-scenario-select" class="fluent-text-input">
                <option value="maintenance">ករណី A៖ សំបុត្រម៉ាស៊ីនខូច (ម៉ាស៊ីនលេខ ៤)</option>
                <option value="die-change">ករណី B៖ ការស្នើសុំប្តូរពុម្ពដែក (រោងជាងពុម្ព)</option>
                <option value="forklift">ករណី C៖ ការត្រួតពិនិត្យសុវត្ថិភាពឡាន Forklift</option>
                <option value="cafeteria">ករណី D៖ ផ្ទាំងផ្សាយម៉ឺនុយអាហារអាហារដ្ឋាន</option>
              </select>
            </div>

            <div class="input-control-row">
              <label>ភាពញឹកញាប់នៃប្រតិបត្តិការ៖</label>
              <input type="text" id="canvas-freq-val" class="fluent-text-input" value="រាល់ថ្ងៃ (១០-១៥ ដងក្នុងមួយវេន)" readonly>
            </div>

            <div class="input-control-row">
              <label>ហានិភ័យអាជីវកម្មចម្បង៖</label>
              <input type="text" id="canvas-risk-val" class="fluent-text-input" value="ខាតបង់ $32,000 ដោយម៉ាស៊ីនឈប់ដំណើរការ" readonly>
            </div>

            <div class="input-control-row">
              <label>តើត្រូវការប្រមូលទិន្នន័យចល័តទេ?</label>
              <button type="button" id="canvas-mobile-btn" class="workbench-toggle-btn">
                <span class="toggle-indicator on"></span> ឧបករណ៍ Tablet ចល័ត៖ ត្រូវការ
              </button>
            </div>
          </div>

          <div class="workbench-evaluations">
            <h4>ការវាយតម្លៃលទ្ធភាពជោគជ័យនៃឱកាសកម្មវិធីផ្ទាល់</h4>
            
            <div class="decision-result-card status-routine" id="canvas-result-card">
              <span class="branch-label" id="canvas-opportunity-badge">ឱកាសកម្មវិធីកម្រិតខ្ពស់ (ពិន្ទុ៖ 95%)</span>
              <h4 id="canvas-opportunity-title" style="color: #4ade80;">&#10004; បេក្ខភាពចម្បងសម្រាប់ Power Apps</h4>
              <p id="canvas-opportunity-desc">ភាពញឹកញាប់ខ្ពស់, ការផ្ទេរការងារបន្ទាន់, ការកត់ត្រាចល័តលើឥដ្ឋរោងចក្រ, ការបញ្ជូនដំណឹងទៅប្រធានស្វ័យប្រវត្តិ។</p>
            </div>

            <div class="submit-state-demo">
              <label>ការស្រង់ចេញនូវសសរស្តម្ភទាំង ៥៖</label>
              <div id="canvas-summary-box" style="font-size:0.84rem; line-height:1.5; color:#cbd5e1;">
                <strong>តួនាទី៖</strong> កម្មករ ➔ ជាងជួសជុល ➔ ប្រធានវេន<br>
                <strong>ទិន្នន័យ៖</strong> លេខម៉ាស៊ីន, ប្រភេទខូច, កម្រិតបន្ទាន់, ចំណាំ, រូបថត<br>
                <strong>វិធានការ៖</strong> បើកម្រិតបន្ទាន់ = "បន្ទាន់ខ្លាំង" ➔ ផ្តល់ដំណឹងទៅប្រធានភ្លាមៗ
              </div>
            </div>
          </div>
        </div>
      `
    },

    'slide-13': {
      title: 'ការផ្ទៀងផ្ទាត់ពាក់កណ្តាលមេរៀន & ផឹកទឹក',
      segment: 'ផ្នែកទី ៤៖ ការបង្ហាញផ្ទាល់របស់អ្នកបណ្តុះបណ្តាល (៤៥:០០ - ៦០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"យើងបានមកដល់ចំណុច ៤៥ នាទីហើយ! ពាក់កណ្តាលនៃថ្ងៃទី ៧!
សូមផ្អាកដកដង្ហើមវែងៗ សម្រួលឥរិយាបថ និងពិសារទឹកមួយកែវ។
សូមលើកមេដៃបញ្ជាក់ទាំងអស់គ្នា៖
លើកមេដៃឡើងលើ (Thumbs UP) ប្រសិនបើអ្នកយល់ច្បាស់ពីមូលហេតុដែលការប្រញាប់បង្កើតអេក្រង់ដោយមិនបានសិក្សាបញ្ហា នឹងបង្កើតបានតែកម្មវិធីដែលឥតប្រយោជន៍!
លើកមេដៃផ្អៀង (Thumbs SIDEWAYS) ប្រសិនបើអ្នកចង់ដឹងបន្ថែមពីរបៀបបែងចែកថាពេលណាត្រូវប្រើ Power Apps និងពេលណាគ្រាន់តែផ្ញើអ៊ីមែល ឬប្រើ Microsoft Forms។
សូមចាំវិធានរបស់យើង៖
កម្មវិធីគឺជាឧបករណ៍ដោះស្រាយចំណុចស្ទះរបស់មនុស្ស។ បើគ្មានចំណុចស្ទះទេ កុំបង្កើតកម្មវិធី!"`,
      html: `
        <div class="slide-content">
          <div class="checkpoint-card">
            <div class="checkpoint-icon">&#9749;</div>
            <h2 class="checkpoint-title">ការផ្ទៀងផ្ទាត់ពាក់កណ្តាលមេរៀន (កន្លងផុត ៤៥:០០)</h2>
            <p class="checkpoint-subtitle">ដកដង្ហើមវែងៗ ពិសារទឹក និងផ្ទៀងផ្ទាត់គ្រឹះផ្នត់គំនិតដែលផ្តោតលើបញ្ហាជាចម្បង មុនពេលយើងអនុវត្តការកំណត់ឱកាសកម្មវិធី។</p>

            <div class="checkpoint-grid">
              <div class="check-item">
                <div class="check-icon">&#128077;</div>
                <h4>មេដៃឡើងលើ៖ យល់ច្បាស់</h4>
                <p>ខ្ញុំដឹងពីលំដាប់លំដោយ៖ <code>បញ្ហា ➔ លទ្ធផល ➔ មនុស្ស ➔ ព័ត៌មាន ➔ វិធានការ</code> មុនពេលប៉ះពាល់អេក្រង់ ឬសរសេរ Power Fx។</p>
              </div>
              <div class="check-item">
                <div class="check-icon">&#9995;</div>
                <h4>មេដៃផ្អៀង៖ មិនទាន់ច្បាស់</h4>
                <p>ខ្ញុំយល់ពីសសរស្តម្ភទាំង ៥ ប៉ុន្តែខ្ញុំចង់អនុវត្តបន្ថែមក្នុងការធ្វើតេស្តថាតើពេលណាបញ្ហាពិតជាត្រូវការ Power App vs ទម្រង់ធម្មតា។</p>
              </div>
              <div class="check-item">
                <div class="check-icon">&#128161;</div>
                <h4>វិធានមាសដែលត្រូវចងចាំ</h4>
                <p><em>"កុំបង្កើតកម្មវិធីសម្រាប់បញ្ហាដែលមិនទាន់ត្រូវបានធ្វើរោគវិនិច្ឆ័យ។ ការរចនាត្រូវហូរចេញពីតម្រូវការរបស់មនុស្សទៅកាន់កូដ មិនមែនច្រាសមកវិញឡើយ។"</em></p>
              </div>
            </div>
          </div>
        </div>
      `
    },

    'slide-14': {
      title: 'ការបំបែកតួនាទីអ្នកពាក់ព័ន្ធទាំង ៣',
      segment: 'ផ្នែកទី ៥៖ ការអនុវត្តដឹកនាំដោយគ្រូ (៦០:០០ - ៧៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"គ្រប់កម្មវិធីអាជីវកម្មទាំងអស់លើលោក បម្រើតួនាទីសំខាន់ចំនួន ៣។
សូមមើលឱ្យច្បាស់លើស្លាយនេះ៖
តួនាទី ១៖ អ្នកស្នើសុំ (Requester / Creator)។
មនុស្សម្នាក់នេះកំពុងនៅកន្លែងធ្វើការ កំពុងមានសម្ពាធ ព្យាយាមបំពេញការងាររបស់ខ្លួន។ ពួកគេត្រូវការអេក្រង់សាមញ្ញ លឿន មានប៊ូតុងធំៗស្រួលចុច។
តួនាទី ២៖ អ្នកអនុវត្ត / អ្នកដោះស្រាយ (Worker / Actor)។
មនុស្សម្នាក់នេះទទួលបានសំបុត្រ រត់ទៅកាន់ម៉ាស៊ីន ផ្លាស់ប្តូរប្រអប់ប្រេង និងចុចថា 'រួចរាល់'។ ពួកគេត្រូវការបញ្ជីការងារច្បាស់លាស់ និងប៊ូតុង 'ទទួលការងារ'។
តួនាទី ៣៖ ប្រធានតាមដាន (Supervisor / Viewer)។
មនុស្សម្នាក់នេះអង្គុយក្នុងការិយាល័យ ឬដើរត្រួតពិនិត្យ។ ពួកគេមិនចង់ឃើញព័ត៌មានលម្អិតពេកទេ ពួកគេចង់ឃើញតួលេខធំៗ៖ តើមានម៉ាស៊ីនខូចប៉ុន្មាន? តើម៉ាស៊ីនលេខ ៤ រង់ចាំយូរប៉ុណ្ណាហើយ?
នៅពេលអ្នកកំណត់វិសាលភាពកម្មវិធី អ្នកត្រូវតែគិតគូរដល់តួនាទីទាំង ៣ នេះជានិច្ច!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge teal-badge">ស្ថាបត្យកម្មអ្នកពាក់ព័ន្ធ</span>
          <h2 class="slide-title">ការបំបែកតួនាទីអ្នកប្រើប្រាស់សំខាន់ទាំង ៣ ក្នុងកន្លែងធ្វើការ</h2>
          <p class="slide-lead">គ្រប់កម្មវិធីប្រតិបត្តិការទាំងអស់ សម្របសម្រួលតួនាទីមនុស្ស ៣ ផ្សេងគ្នា ដែលតួនាទីនីមួយៗទាមទារបទពិសោធន៍អេក្រង់ខុសៗគ្នា។</p>
        </div>

        <div class="grid-3-col">
          <div class="retrieval-card" style="border-top: 4px solid var(--fluent-blue-light);">
            <div class="retrieval-num">&#128104;&#8205;&#128295;</div>
            <h4>១. អ្នកស្នើសុំ (Requester)</h4>
            <p class="retrieval-q">កម្មករម៉ាស៊ីន / បុគ្គលិកជួរមុខ</p>
            <div class="retrieval-answer">
              <strong>តម្រូវការ៖</strong> បញ្ចូលទិន្នន័យលឿនបំផុត (&lt; ៦០វិនាទី), ប៊ូតុងធំៗសម្រាប់ស្រោមដៃ, កត់ត្រាពេលវេលានិងម៉ាស៊ីនដោយស្វ័យប្រវត្តិ។
            </div>
          </div>

          <div class="retrieval-card" style="border-top: 4px solid var(--fluent-yellow);">
            <div class="retrieval-num">&#129520;</div>
            <h4>២. អ្នកដោះស្រាយ (Worker)</h4>
            <p class="retrieval-q">ជាងថែទាំ / អ្នកបច្ចេកទេសពុម្ព</p>
            <div class="retrieval-answer">
              <strong>តម្រូវការ៖</strong> ដំណឹងលោតលើទូរស័ព្ទ, បញ្ជីសំបុត្រការងារតម្រៀបតាមភាពបន្ទាន់, ប៊ូតុងចុច ១ ដងដើម្បី "ទទួលការងារ" និង "រួចរាល់"។
            </div>
          </div>

          <div class="retrieval-card" style="border-top: 4px solid var(--fluent-green-light);">
            <div class="retrieval-num">&#128202;</div>
            <h4>៣. ប្រធានតាមដាន (Supervisor)</h4>
            <p class="retrieval-q">អ្នកគ្រប់គ្រងរោងចក្រ / ប្រធានវេន</p>
            <div class="retrieval-answer">
              <strong>តម្រូវការ៖</strong> ផ្ទាំងព័ត៌មាន KPI រូបភាពធំៗ, ការព្រមានពេលលើសកំណត់ SLA, រយៈពេលមធ្យមនៃការជួសជុល, របាយការណ៍ប្រវត្តិ។
            </div>
          </div>
        </div>
      `
    },

    'slide-15': {
      title: 'វិញ្ញាសាវាយតម្លៃលទ្ធភាពបង្កើតកម្មវិធី',
      segment: 'ផ្នែកទី ៥៖ ការអនុវត្តដឹកនាំដោយគ្រូ (៦០:០០ - ៧៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"តើអ្នកដឹងដោយរបៀបណាថាបញ្ហាមួយត្រូវការ Power Apps, Microsoft Forms, Excel, ឬគ្រាន់តែផ្ញើអ៊ីមែល?
សូមប្រើវិញ្ញាសាវាយតម្លៃ ៤ ចំណុចនៅលើអេក្រង់៖
វិញ្ញាសា ១៖ ភាពញឹកញាប់ និងទំហំ (Frequency & Volume)។ តើវាកើតឡើងច្រើនដងក្នុងមួយថ្ងៃ ឬមួយសប្តាហ៍ទេ? បើកើតឡើងតែម្តងក្នុងមួយឆ្នាំ ➔ កុំធ្វើកម្មវិធី!
វិញ្ញាសា ២៖ ភាពចល័ត / ទីតាំង (Mobility)។ តើកម្មករបញ្ចូលទិន្នន័យពេលកំពុងឈរលើឥដ្ឋរោងចក្រ ឃ្លាំង ឬឡានដឹកទំនិញទេ? បើពិត ➔ Power Apps!
វិញ្ញាសា ៣៖ តក្កវិជ្ជា & ការសម្រេចចិត្ត (Logic & Decisions)។ តើទម្រង់នោះត្រូវការការផ្ទៀងផ្ទាត់ ការគណនា ឬលក្ខខណ្ឌបំបែកផ្លូវទេ? បើពិត ➔ Power Apps!
វិញ្ញាសា ៤៖ ការផ្ទេរការងារ (Hand-off)។ តើមនុស្ស A បង្កើត ហើយមនុស្ស B ត្រូវអនុម័តឬដោះស្រាយទេ? បើពិត ➔ Power Apps!
បើឆ្លងកាត់ទាំង ៤ នេះ ការបង្កើត Power App នឹងជួយសន្សំលុយរាប់ពាន់ដុល្លារ!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge purple-badge">ការវាយតម្លៃលទ្ធភាពជោគជ័យ</span>
          <h2 class="slide-title">វិញ្ញាសាវាយតម្លៃលទ្ធភាពបង្កើតកម្មវិធី ៤ ចំណុច</h2>
          <p class="slide-lead">រូបប្រឡងជាប្រព័ន្ធដើម្បីសម្រេចចិត្តថាតើត្រូវបង្កើត Power App ផ្ទាល់ខ្លួន ឬប្រើឧបករណ៍ជំនួសដែលសាមញ្ញជាង។</p>
        </div>

        <div class="grid-2-col">
          <div class="code-card">
            <div class="code-header">វិញ្ញាសា ៤ ចំណុចសម្រាប់ Power Apps</div>
            <div style="padding:16px; display:flex; flex-direction:column; gap:12px; font-size:0.9rem;">
              <div>&#128197; <strong>១. ភាពញឹកញាប់ខ្ពស់៖</strong> កើតឡើងរាល់ថ្ងៃ ឬរាល់សប្តាហ៍ បង្កការស្ទះប្រតិបត្តិការដដែលៗជាប្រចាំ។</div>
              <div>&#128241; <strong>២. ភាពចល័ត &amp; ការកត់ត្រាផ្ទាល់៖</strong> ប្រើប្រាស់នៅក្រៅតុធ្វើការ (Tablets, ម៉ាស៊ីនស្កេនបាកូដ, កាមេរ៉ា)។</div>
              <div>&#9881; <strong>៣. តក្កវិជ្ជា &amp; រូបមន្ត៖</strong> ត្រូវការការផ្ទៀងផ្ទាត់ប្រអប់ទិន្នន័យចាំបាច់ និងការព្រមានតាមលក្ខខណ្ឌ។</div>
              <div>&#128257; <strong>៤. ការផ្ទេរការងារពហុដំណាក់កាល៖</strong> មនុស្ស A កត់ត្រា ➔ មនុស្ស B ដោះស្រាយ ➔ មនុស្ស C តាមដាន។</div>
            </div>
          </div>

          <div class="code-card">
            <div class="code-header">ពេលណាត្រូវប្រើឧបករណ៍ Microsoft 365 ផ្សេងទៀត</div>
            <div style="padding:16px; display:flex; flex-direction:column; gap:12px; font-size:0.9rem;">
              <div>&#128231; <strong>អ៊ីមែលសាមញ្ញ / Teams៖</strong> សំណួរធ្វើម្តងម្កាល ឬការជូនដំណឹងធម្មតារវាងមិត្តរួមការងារពីរនាក់។</div>
              <div>&#128203; <strong>Microsoft Forms៖</strong> ការស្ទង់មតិសាមញ្ញដែលគ្មានតក្កវិជ្ជា គ្មានការកែសម្រួល និងគ្មានការផ្ទេរការងារ។</div>
              <div>&#128202; <strong>Excel / SharePoint List៖</strong> ការតាមដានទិន្នន័យទោលដែលគ្រប់គ្រងដោយមនុស្សម្នាក់នៅលើតុធ្វើការ។</div>
              <div>&#128736; <strong>ការងារជាក់ស្តែង៖</strong> ការកែសម្រួលម៉ាស៊ីនត្រជាក់ ឬការជួសជុលឧបករណ៍ខូចដោយផ្ទាល់ដៃ។</div>
            </div>
          </div>
        </div>
      `
    },

    'slide-16': {
      title: 'ការស្រង់វិធានការអាជីវកម្មជាក់ស្តែង',
      segment: 'ផ្នែកទី ៥៖ ការអនុវត្តដឹកនាំដោយគ្រូ (៦០:០០ - ៧៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"អ្នកគ្រប់គ្រងអាជីវកម្មតែងតែនិយាយជាភាសាមិនច្បាស់លាស់ និងមានអារម្មណ៍។
ពួកគេនិយាយថា៖ 'យើងត្រូវតែដោះស្រាយការធ្លាយប្រេងបន្ទាន់ឱ្យលឿនបំផុត!'
ឬ៖ 'កុំឱ្យពួកគេបញ្ជូនសំបុត្រមកដោយមិនព្រមប្រាប់ព័ត៌មានលម្អិត!'
ក្នុងនាមជា Citizen Developer ការងាររបស់អ្នកគឺបកប្រែពាក្យទាំងនោះទៅជាតក្កវិជ្ជាជាក់លាក់៖
សូមមើលតារាងនៅលើអេក្រង់៖
មនុស្សនិយាយ៖ 'ការធ្លាយប្រេងបន្ទាន់ត្រូវតែដោះស្រាយលឿន!'
វិធានការបច្ចេកទេស៖ If(Urgency = 'Critical' && FaultType = 'Leak', SoundAlarm() & NotifyLead(), QueueStandard())។
មនុស្សនិយាយ៖ 'កុំឱ្យពួកគេផ្ញើសំបុត្រទទេ!'
វិធានការបច្ចេកទេស៖ btnSubmit.DisplayMode = If(!IsBlank(Machine) && !IsBlank(Fault), Edit, Disabled)។
សូមកត់សម្គាល់៖ ចំណុចនេះភ្ជាប់ដោយផ្ទាល់ទៅកាន់ថ្ងៃទី ៤, ៥, និង ៦!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge blue-badge">ការបកប្រែតក្កវិជ្ជា</span>
          <h2 class="slide-title">ការស្រង់វិធានការអាជីវកម្មជាក់ស្តែងចេញពីការនិយាយរបស់មនុស្ស</h2>
          <p class="slide-lead">ការបកប្រែបំណងប្រាថ្នាមិនច្បាស់លាស់ក្នុងកន្លែងធ្វើការ ទៅជាច្រកតក្កវិជ្ជា លក្ខខណ្ឌ-ការវិនិច្ឆ័យ-សកម្មភាព។</p>
        </div>

        <div class="conversion-bridge-grid">
          <div class="bridge-card bridge-to-num">
            <div class="bridge-direction">
              <span class="type-pill pill-text">ការនិយាយរបស់មនុស្ស</span>
              <span class="bridge-arrow">&#10142;</span>
              <span class="type-pill pill-bool">វិធានការច្បាស់លាស់</span>
            </div>
            <h3>"ជួយដោះស្រាយការធ្លាយប្រេងបន្ទាន់ឱ្យលឿនបំផុត!"</h3>
            <p>អារម្មណ៍ទូទៅត្រូវបានបំប្លែងទៅជាលក្ខខណ្ឌចម្រុះ និងសកម្មភាពស្វ័យប្រវត្តិច្បាស់លាស់។</p>
            <div class="code-box">
              <code>If(Urgency = "Critical" &amp;&amp; Type = "Leak", SoundBeacon(), Queue())</code>
            </div>
            <div class="bridge-note">&#10004; វាយតម្លៃកត្តាទាំងពីរ មុនពេលបន្លឺសំឡេងរោទិ៍ទូទាំងរោងចក្រ។</div>
          </div>

          <div class="bridge-card bridge-to-text">
            <div class="bridge-direction">
              <span class="type-pill pill-text">ការនិយាយរបស់មនុស្ស</span>
              <span class="bridge-arrow">&#10142;</span>
              <span class="type-pill pill-date">ការចាក់សោ UI</span>
            </div>
            <h3>"កុំឱ្យពួកគេបញ្ជូនសំបុត្រមកពាក់កណ្តាលទទេ!"</h3>
            <p>បកប្រែទៅជាការផ្ទៀងផ្ទាត់ DisplayMode នៃប៊ូតុង ដើម្បីធានាបានទិន្នន័យពេញលេញ។</p>
            <div class="code-box">
              <code>If(!IsBlank(ddMachine.Value) &amp;&amp; !IsBlank(txtNotes.Text), Edit, Disabled)</code>
            </div>
            <div class="bridge-note">&#9888; ការពារកុំឱ្យទិន្នន័យមិនពេញលេញត្រូវកត់ត្រាចូលក្នុងមូលដ្ឋានទិន្នន័យ!</div>
          </div>
        </div>
      `
    },

    'slide-17': {
      title: 'សេចក្តីសង្ខេបការអនុវត្ត',
      segment: 'ផ្នែកទី ៥៖ ការអនុវត្តដឹកនាំដោយគ្រូ (៦០:០០ - ៧៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"ឥឡូវនេះ សូមពិនិត្យមើលសេណារីយ៉ូអនុវត្តរបស់យើង៖
ការផ្លាស់ប្តូរពុម្ពដែកនៅរោងចក្រ Apex Plastics (Tooling Die Changeover)។
រាល់ពេលដែលម៉ាស៊ីនផលិតចប់ការបញ្ជាទិញ ពុម្ពដែកធ្ងន់ត្រូវតែដោះដូរ។
បច្ចុប្បន្ន កម្មករសរសេរពាក្យស្នើសុំប្តូរពុម្ពលើក្តារខៀននៅចុងច្រកផ្លូវដើរ។
ជាងពុម្ពដែលនៅរោងជាងចម្ងាយ ២០០ ម៉ែត្រ មិនបានឃើញក្តារខៀននោះទេ រហូតដល់ម៉ោងសម្រាកកាហ្វេរបស់ពួកគេ!
លទ្ធផល៖ ម៉ាស៊ីនត្រូវឈប់នៅស្ងៀមពី ៣៥ ទៅ ៤៥ នាទីរាល់ពេលប្តូរពុម្ពម្តងៗ!
នៅស្លាយបន្ទាប់ យើងនឹងធ្វើតេស្តថាតើសេណារីយ៉ូនេះ និងសេណារីយ៉ូផ្សេងទៀត សមស្របជាឱកាសបង្កើតកម្មវិធីពិតដែរឬទេ!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge teal-badge">សេចក្តីសង្ខេបបញ្ហាប្រឈម</span>
          <h2 class="slide-title">ការអនុវត្តផ្ទាល់៖ ចំណុចស្ទះនៃការប្តូរពុម្ពដែក Apex Plastics</h2>
          <p class="slide-lead">វិភាគការស្ទះប្រតិបត្តិការខាងក្រោម មុនពេលអនុវត្តការវាយតម្លៃសេណារីយ៉ូនៅលើបន្ទះអន្តរកម្មរបស់យើង។</p>
        </div>

        <div class="parts-brief-grid">
          <div class="brief-item">
            <span class="brief-num">1</span>
            <div>
              <strong>ការឈឺចាប់បច្ចុប្បន្ន</strong>
              <p>កម្មករសរសេរសំណើប្តូរពុម្ពលើក្តារខៀនតាមច្រកផ្លូវដើរ។ ជាងពុម្ពចម្ងាយ ២០០ ម៉ែត្រមិនបានឃើញអស់ ៤៥ នាទី។</p>
            </div>
          </div>
          <div class="brief-item">
            <span class="brief-num">2</span>
            <div>
              <strong>ការខាតបង់ហិរញ្ញវត្ថុ</strong>
              <p>ប្តូរពុម្ព ៣ ដងក្នុងមួយថ្ងៃ &bull; ម៉ាស៊ីនឈប់ ៤០ នាទីរាល់ដង &bull; តម្លៃម៉ាស៊ីន $140/ម៉ោង = ខាតបង់ $840 រាល់ថ្ងៃ ($210,000/ឆ្នាំ)។</p>
            </div>
          </div>
          <div class="brief-item">
            <span class="brief-num">3</span>
            <div>
              <strong>អ្នកពាក់ព័ន្ធសំខាន់ៗ</strong>
              <p>កម្មករម៉ាស៊ីន (កត់ត្រាពេលចប់) &bull; ជាងពុម្ព (រៀបចំ &amp; ដាក់ពុម្ព) &bull; អ្នករៀបចំកាលវិភាគផលិត (តាមដានពេលឈប់)។</p>
            </div>
          </div>
          <div class="brief-item">
            <span class="brief-num">4</span>
            <div>
              <strong>ទិន្នន័យចាំបាច់ត្រូវកត់ត្រា</strong>
              <p>លេខម៉ាស៊ីន (១–១២), លេខកូដពុម្ពចាស់, លេខកូដពុម្ពថ្មី, ត្រូវការស្ទូចស្ទូច (True/False), ពេលវេលារួចរាល់។</p>
            </div>
          </div>
          <div class="brief-item">
            <span class="brief-num">5</span>
            <div>
              <strong>វិធានការអាជីវកម្មសំខាន់</strong>
              <p>បើត្រូវការស្ទូច (Crane Required = True) ➔ ផ្ញើដំណឹងទៅក្រុមស្ទូចព្រមគ្នាជាមួយរោងជាងពុម្ពភ្លាមៗ។</p>
            </div>
          </div>
          <div class="brief-item">
            <span class="brief-num">6</span>
            <div>
              <strong>លទ្ធផលរំពឹងទុកដែលចង់បាន</strong>
              <p>ក្រុមជាងពុម្ពរៀបចំពុម្ពថ្មីទុកជាស្រេច ១៥ នាទីមុនពេលការផលិតចប់។ ពេលឈប់ប្តូរពុម្ពធ្លាក់ចុះពី ៤០ នាទីមកត្រឹម ៨ នាទី។</p>
            </div>
          </div>
        </div>
      `
    },

    'slide-18': {
      title: 'កម្មវិធីត្រាប់តាមការវាយតម្លៃឱកាស',
      segment: 'ផ្នែកទី ៥៖ ការអនុវត្តដឹកនាំដោយគ្រូ (៦០:០០ - ៧៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"នេះជាកម្មវិធីត្រាប់តាម Opportunity Evaluator Simulator របស់អ្នក!
អ្នកមានសេណារីយ៉ូកន្លែងធ្វើការជាក់ស្តែងចំនួន ៦ ពីរោងចក្រ Apex Plastics។
សម្រាប់សេណារីយ៉ូនីមួយៗ សូមវាយតម្លៃថាតើវាជា ឱកាសបង្កើត POWER APP ពិតប្រាកដ (ផ្លូវ A) ឬជា បញ្ហាដែលមិនមែនជាកម្មវិធី ដែលគួរប្រើ Forms, អ៊ីមែល ឬសកម្មភាពជាក់ស្តែង (ផ្លូវ B)!
តោះមើលថាតើអ្នកអាចទទួលបានពិន្ទុពេញ ៦ លើ ៦ ដែរឬទេ!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge green-badge">ការអនុវត្តជាក់ស្តែង</span>
          <h2 class="slide-title">កម្មវិធីត្រាប់តាមអន្តរកម្ម៖ "ឱកាសកម្មវិធីពិត ឬជាគំនិតខុស?" ៦ សេណារីយ៉ូ</h2>
          <p class="slide-lead">វាយតម្លៃបញ្ហាកន្លែងធ្វើការនីមួយៗខាងក្រោម។ សម្រេចចិត្តថាតើវាសមស្របនឹង Power Apps ឬគួរប្រើដំណោះស្រាយផ្សេង។</p>
        </div>

        <div class="evaluator-grid-container" id="opportunity-simulator-widget">
          <div class="evaluator-card" data-scenario="s1" data-correct="path-a">
            <div class="cond-title">1. ការស្ទះប្តូរពុម្ពដែក (ម៉ាស៊ីនឈប់ចោល)</div>
            <div class="cond-btn-pair">
              <button class="cond-btn" data-choice="path-a">ផ្លូវ A៖ បង្កើត Power App</button>
              <button class="cond-btn" data-choice="path-b">ផ្លូវ B៖ ឧបករណ៍ផ្សេង / មិនធ្វើ</button>
            </div>
            <div class="cond-status-text">ជ្រើសរើសផ្លូវ A ឬ ផ្លូវ B</div>
          </div>

          <div class="evaluator-card" data-scenario="s2" data-correct="path-b">
            <div class="cond-title">2. ការប្រកាសបុគ្គលិកឆ្នើមប្រចាំខែ</div>
            <div class="cond-btn-pair">
              <button class="cond-btn" data-choice="path-a">ផ្លូវ A៖ បង្កើត Power App</button>
              <button class="cond-btn" data-choice="path-b">ផ្លូវ B៖ ឧបករណ៍ផ្សេង / មិនធ្វើ</button>
            </div>
            <div class="cond-status-text">ជ្រើសរើសផ្លូវ A ឬ ផ្លូវ B</div>
          </div>

          <div class="evaluator-card" data-scenario="s3" data-correct="path-a">
            <div class="cond-title">3. តារាងត្រួតពិនិត្យឡានលើក Forklift OSHA</div>
            <div class="cond-btn-pair">
              <button class="cond-btn" data-choice="path-a">ផ្លូវ A៖ បង្កើត Power App</button>
              <button class="cond-btn" data-choice="path-b">ផ្លូវ B៖ ឧបករណ៍ផ្សេង / មិនធ្វើ</button>
            </div>
            <div class="cond-status-text">ជ្រើសរើសផ្លូវ A ឬ ផ្លូវ B</div>
          </div>

          <div class="evaluator-card" data-scenario="s4" data-correct="path-b">
            <div class="cond-title">4. ការកែសម្រួលម៉ាស៊ីនត្រជាក់បន្ទប់សម្រាក</div>
            <div class="cond-btn-pair">
              <button class="cond-btn" data-choice="path-a">ផ្លូវ A៖ បង្កើត Power App</button>
              <button class="cond-btn" data-choice="path-b">ផ្លូវ B៖ ឧបករណ៍ផ្សេង / មិនធ្វើ</button>
            </div>
            <div class="cond-status-text">ជ្រើសរើសផ្លូវ A ឬ ផ្លូវ B</div>
          </div>

          <div class="evaluator-card" data-scenario="s5" data-correct="path-a">
            <div class="cond-title">5. ការអនុម័តឯកសារសំណល់គីមី Hazmat</div>
            <div class="cond-btn-pair">
              <button class="cond-btn" data-choice="path-a">ផ្លូវ A៖ បង្កើត Power App</button>
              <button class="cond-btn" data-choice="path-b">ផ្លូវ B៖ ឧបករណ៍ផ្សេង / មិនធ្វើ</button>
            </div>
            <div class="cond-status-text">ជ្រើសរើសផ្លូវ A ឬ ផ្លូវ B</div>
          </div>

          <div class="evaluator-card" data-scenario="s6" data-correct="path-b">
            <div class="cond-title">6. ការបោះឆ្នោតញ៉ាំភីហ្សា ឬបឺហ្គឺពេលថ្ងៃត្រង់</div>
            <div class="cond-btn-pair">
              <button class="cond-btn" data-choice="path-a">ផ្លូវ A៖ បង្កើត Power App</button>
              <button class="cond-btn" data-choice="path-b">ផ្លូវ B៖ ឧបករណ៍ផ្សេង / មិនធ្វើ</button>
            </div>
            <div class="cond-status-text">ជ្រើសរើសផ្លូវ A ឬ ផ្លូវ B</div>
          </div>
        </div>

        <div class="evaluator-footer-bar">
          <span>ពិន្ទុ៖ <strong id="sim-score">0</strong> / 6 ត្រឹមត្រូវ</span>
          <span id="sim-feedback">វាយតម្លៃសេណារីយ៉ូទាំង ៦ ខាងលើ ដើម្បីសាកល្បងសមត្ថភាពកំណត់រោគវិនិច្ឆ័យរបស់អ្នក។</span>
        </div>
      `
    },

    'slide-19': {
      title: 'ការយល់ខុសទូទៅរបស់អ្នកទើបចាប់ផ្តើម',
      segment: 'ផ្នែកទី ៦៖ ការវាយតម្លៃ & ស្ពានទៅមុខ (៧៥:០០ - ៩០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"សូមក្រឡេកមើលការយល់ខុសដ៏គ្រោះថ្នាក់ទាំង ៤ ដែលអ្នកទើបចាប់ផ្តើមតែងតែជួបប្រទះ៖
កំហុស ១៖ 'Power Apps គឺសម្រាប់បង្កើតរាល់គំនិតប្លែកៗដែលផុសក្នុងក្បាលខ្ញុំ!'
ការកែតម្រូវ៖ កម្មវិធីដែលគ្មានបញ្ហាអាជីវកម្ម គឺខ្ជះខ្ជាយពេលវេលា។ ត្រូវចាប់ផ្តើមជានិច្ចពី៖ អ្វីជាបញ្ហា នរណាខាតលុយ និងនរណាប្រើវា?
កំហុស ២៖ 'កាន់តែមានប្រអប់បញ្ចូលច្រើន កម្មវិធីខ្ញុំកាន់តែមើលទៅអាជីព!'
ការកែតម្រូវ៖ ផ្ទុយស្រឡះ! ប្រអប់ទិន្នន័យលើសកាន់តែច្រើន កម្មករកាន់តែឆាប់បោះបង់កម្មវិធីរបស់អ្នកចោល។ ប្រមូលតែទិន្នន័យណាដែលចាំបាច់សម្រាប់សកម្មភាពប៉ុណ្ណោះ!
កំហុស ៣៖ 'ខ្ញុំគួរតែចាប់ផ្តើមពីការគូរអេក្រង់ស្អាតៗមុនគេ!'
ការកែតម្រូវ៖ កុំរចនាអេក្រង់មុនពេលស្គាល់ទិន្នន័យនិងមនុស្សឱ្យសោះ។ ការរចនាត្រូវហូរពី បញ្ហា ➔ ដំណើរការ ➔ ទិន្នន័យ ➔ អេក្រង់!
កំហុស ៤៖ 'បើការងារលើក្រដាសរញ៉េរញ៉ៃ ដាក់ចូលកម្មវិធីនឹងដោះស្រាយបាន!'
ការកែតម្រូវ៖ ការធ្វើស្វ័យប្រវត្តិកម្មលើភាពរញ៉េរញ៉ៃ នឹងផ្តល់ឱ្យអ្នកនូវភាពរញ៉េរញ៉ៃស្វ័យប្រវត្តិតែប៉ុណ្ណោះ! ត្រូវបញ្ជាក់ការទទួលខុសត្រូវរបស់មនុស្សឱ្យច្បាស់ជាមុនសិន!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge red-badge">ការកែតម្រូវផ្នត់គំនិត</span>
          <h2 class="slide-title">ការយល់ខុសទូទៅទាំង ៤ របស់អ្នកទើបចាប់ផ្តើម &amp; វិធីកែតម្រូវ</h2>
          <p class="slide-lead">កែតម្រូវផ្នត់គំនិតដែលមើលទៅហាក់ដូចជាត្រូវ ប៉ុន្តែអាចនាំឱ្យគម្រោងកម្មវិធីត្រូវគេបោះបង់ចោល។</p>
        </div>

        <div class="grid-2-col">
          <div class="misconception-card">
            <div class="misc-bad">&#10060; ផ្នត់គំនិតខុស #១</div>
            <h4>"Power Apps គឺសម្រាប់បង្កើតរាល់គំនិតដែលផុសក្នុងក្បាលខ្ញុំ។"</h4>
            <p class="misc-fix"><strong>ការកែតម្រូវ៖</strong> កម្មវិធីត្រូវតែបម្រើគោលបំណងប្រតិបត្តិការ។ ប្រសិនបើគ្មានការឈឺចាប់ពិត គ្មានអ្នកប្រើច្បាស់លាស់ និងគ្មានការខាតបង់លុយទេ គ្មាននរណាម្នាក់ប្រើកម្មវិធីនោះឡើយ។</p>
          </div>

          <div class="misconception-card">
            <div class="misc-bad">&#10060; ផ្នត់គំនិតខុស #២</div>
            <h4>"កាន់តែមានប្រអប់បញ្ចូលទិន្នន័យច្រើន កម្មវិធីកាន់តែល្អ។"</h4>
            <p class="misc-fix"><strong>ការកែតម្រូវ៖</strong> កម្មករពាក់ស្រោមដៃនឹងបោះបង់ចោលទម្រង់ដែលមាន ៣០ ប្រអប់។ ត្រូវប្រមូលតែទិន្នន័យអប្បបរមាណាដែលចាំបាច់សម្រាប់ជំរុញសកម្មភាពប៉ុណ្ណោះ។</p>
          </div>

          <div class="misconception-card">
            <div class="misc-bad">&#10060; ផ្នត់គំនិតខុស #៣</div>
            <h4>"ខ្ញុំគួរតែចាប់ផ្តើមគូរប៊ូតុង និងអេក្រង់ស្អាតៗមុនគេបង្អស់។"</h4>
            <p class="misc-fix"><strong>ការកែតម្រូវ៖</strong> ការរចនាតែងតែហូរទៅមុខជានិច្ច៖ <em>បញ្ហា ➔ ដំណើរការ ➔ ទិន្នន័យ ➔ អេក្រង់</em>។ ការរចនាអេក្រង់មុន ធានាថានឹងត្រូវកែកម្ទេចចោលឡើងវិញ។</p>
          </div>

          <div class="misconception-card">
            <div class="misc-bad">&#10060; ផ្នត់គំនិតខុស #៤</div>
            <h4>"ការយកការងារក្រដាសដែលខូចមកដាក់ក្នុងកម្មវិធី នឹងដោះស្រាយបញ្ហាបាន។"</h4>
            <p class="misc-fix"><strong>ការកែតម្រូវ៖</strong> ប្រសិនបើកម្មករមិនដឹងថានរណាជាអ្នកទទួលខុសត្រូវលើក្រដាសទេ ការដាក់ក្នុងកម្មវិធីនឹងបង្កើតបានតែការភ័ន្តច្រឡំឌីជីថលប៉ុណ្ណោះ។ ត្រូវកែសម្រួលដំណើរការមនុស្សជាមុនសិន។</p>
          </div>
        </div>
      `
    },

    'slide-20': {
      title: 'ការផ្ទៀងផ្ទាត់ចំណេះដឹង ៥ សំណួរ',
      segment: 'ផ្នែកទី ៦៖ ការវាយតម្លៃ & ស្ពានទៅមុខ (៧៥:០០ - ៩០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"ដល់ពេលសម្រាប់ការផ្ទៀងផ្ទាត់ចំណេះដឹង ៥ សំណួររបស់យើងហើយ!
សូមកត់សម្គាល់សំណួរទី ២, ៣, និង ៤ ដែលសួរយ៉ាងស៊ីជម្រៅអំពី 'ហេតុអ្វី' និង 'តើមានអ្វីកើតឡើងប្រសិនបើ'។
ចំណាយពេលគិតពិចារណា ជ្រើសរើសចម្លើយដែលល្អបំផុតសម្រាប់សំណួរនីមួយៗ ហើយយើងនឹងពិនិត្យមើលការពន្យល់លម្អិតទាំងអស់គ្នា!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge blue-badge">ការផ្ទៀងផ្ទាត់ចំណេះដឹង</span>
          <h2 class="slide-title">ការផ្ទៀងផ្ទាត់ចំណេះដឹងវាយតម្លៃនៃថ្ងៃទី ៧</h2>
          <p class="slide-lead">ឆ្លើយសំណួរទាំង ៥ ដើម្បីផ្ទៀងផ្ទាត់ការយល់ដឹងរបស់អ្នកលើការវិភាគរោគវិនិច្ឆ័យបញ្ហា តួនាទីអ្នកប្រើប្រាស់ និងលទ្ធភាពបង្កើតកម្មវិធី។</p>
        </div>

        <div class="quiz-container" id="quiz-widget">
          <div class="quiz-header-bar">
            <span id="quiz-question-counter">សំណួរទី ១ នៃ ៥</span>
            <span id="quiz-score-display">ពិន្ទុ៖ 0 / 5</span>
          </div>

          <div class="quiz-body" id="quiz-body">
            <!-- Rendered dynamically -->
          </div>

          <div class="quiz-navigation">
            <button class="btn-subtle" id="quiz-prev-btn" disabled>&#8592; ថយក្រោយ</button>
            <button class="btn-primary" id="quiz-next-btn">សំណួរបន្ទាប់ &#8594;</button>
          </div>
        </div>
      `
    },

    'slide-21': {
      title: 'បញ្ហាប្រឈមចុងក្រោយ៖ ប្លង់ប្តូរពុម្ពដែក',
      segment: 'ផ្នែកទី ៦៖ ការវាយតម្លៃ & ស្ពានទៅមុខ (៧៥:០០ - ៩០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"នេះជាបញ្ហាប្រឈមចុងក្រោយ Capstone Challenge នៃថ្ងៃទី ៧ របស់យើង៖
អ្នកគឺជាស្ថាបត្យករស្វ័យប្រវត្តិកម្មនៅរោងចក្រ Apex Plastics។
ប្រធានរោងចក្រស្នើសុំឱ្យអ្នកកំណត់វិសាលភាពបញ្ហាស្ទះនៃការប្តូរពុម្ពដែក (Tooling Die Changeover)។
នៅលើសន្លឹកកិច្ចការរបស់អ្នក សូមបំពេញសសរស្តម្ភទាំង ៥៖
១. តើអ្វីជាបញ្ហាបច្ចុប្បន្ន?
២. តើអ្វីជាលទ្ធផលដែលចង់បាន?
៣. តើនរណាខ្លះជាមនុស្សក្នុងតួនាទីទាំង ៣?
៤. តើទិន្នន័យ ៤-៥ ចំណុចណាខ្លះដែលត្រូវប្រមូល?
៥. តើអ្វីជាវិធានការអាជីវកម្មចម្បង?
ចូរបង្កើតប្លង់របស់អ្នកឥឡូវនេះ!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge purple-badge">បញ្ហាប្រឈមឯករាជ្យ</span>
          <h2 class="slide-title">បញ្ហាប្រឈមចុងក្រោយ៖ ប្លង់ឱកាសប្តូរពុម្ពដែក Apex Plastics</h2>
          <p class="slide-lead">រៀបចំប្លង់កំណត់វិសាលភាព ៥ សសរស្តម្ភពេញលេញសម្រាប់បញ្ហាស្ទះប្តូរពុម្ព មុនពេលយើងគូរផែនទីដំណើរការថ្ងៃស្អែក។</p>
        </div>

        <div class="challenge-table-wrapper">
          <table class="challenge-table">
            <thead>
              <tr>
                <th>សសរស្តម្ភ #</th>
                <th>សមាសភាគក្របខ័ណ្ឌ</th>
                <th>សំណួរណែនាំការកំណត់</th>
                <th>ការបញ្ជាក់ប្រតិបត្តិការរបស់អ្នក</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>បញ្ហាបច្ចុប្បន្ន</td><td>តើការលំបាកអ្វីរបស់មនុស្សដែលបង្កការយឺតយ៉ាវ ឬខាតបង់លុយ?</td><td>សំណើលើក្តារខៀននៅឆ្ងាយព្យួរចោល ៤៥ នាទី; ម៉ាស៊ីនឈប់ចោល។</td></tr>
              <tr><td>2</td><td>លទ្ធផលចង់បាន</td><td>តើភាពជោគជ័យដែលអាចវាស់វែងបានមានទម្រង់ដូចម្តេច?</td><td>រោងជាងពុម្ពដឹងដំណឹង ១៥ នាទីមុនចប់; ពេលឈប់ប្តូរ &lt; ៨ នាទី។</td></tr>
              <tr><td>3</td><td>មនុស្ស &amp; តួនាទី</td><td>តើនរណាជាអ្នកស្នើ? អ្នកណាដោះស្រាយ? អ្នកណាត្រួតពិនិត្យ?</td><td>កម្មករម៉ាស៊ីន ➔ ជាងពុម្ព ➔ អ្នករៀបចំកាលវិភាគផលិតកម្ម។</td></tr>
              <tr><td>4</td><td>ព័ត៌មាន/ទិន្នន័យ</td><td>តើទិន្នន័យ ៤-៥ ចំណុចណាខ្លះដែលត្រូវប្រមូលដោយមិនឱ្យលើស?</td><td>លេខម៉ាស៊ីន, លេខពុម្ពចាស់, លេខពុម្ពថ្មី, ត្រូវការស្ទូច, ពេលវេលា។</td></tr>
              <tr><td>5</td><td>វិធានការអាជីវកម្ម</td><td>តើតក្កវិជ្ជាស្វ័យប្រវត្តអ្វីខ្លះដែលនាំផ្លូវដំណឹងអាសន្ន?</td><td>បើត្រូវការស្ទូច = True ➔ ផ្ញើដំណឹងទៅក្រុមស្ទូច + រោងជាងពុម្ព។</td></tr>
            </tbody>
          </table>
        </div>
      `
    },

    'slide-22': {
      title: 'ដំណោះស្រាយបញ្ហាប្រឈម & រូបប្រឡង',
      segment: 'ផ្នែកទី ៦៖ ការវាយតម្លៃ & ស្ពានទៅមុខ (៧៥:០០ - ៩០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"សូមបង្ហាញដំណោះស្រាយស្តង់ដារគំរូ!
ចុចលើប៊ូតុង 'បង្ហាញចម្លើយ' ដើម្បីផ្ទៀងផ្ទាត់សសរស្តម្ភទាំង ៥ របស់អ្នក។
សូមប្រៀបធៀបប្លង់របស់អ្នកជាមួយរូបប្រឡងវាយតម្លៃកម្រិតទាំង ៤ របស់យើង៖
កម្រិត ៤ (Mastery) មានន័យថាសសរស្តម្ភទាំង ៥ មានភាពច្បាស់លាស់ ជាក់ស្តែង គ្មានទិន្នន័យលើស និងរួចរាល់សម្រាប់ការគូរផែនទីដំណើរការថ្ងៃស្អែក!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge green-badge">គំរូ &amp; រូបប្រឡង</span>
          <h2 class="slide-title">ដំណោះស្រាយបញ្ហាប្រឈម &amp; រូបប្រឡងវាយតម្លៃ ៤ កម្រិត</h2>
          <p class="slide-lead">ប្រៀបធៀបប្លង់ឱកាសរបស់អ្នកជាមួយស្តង់ដារផលិតកម្ម និងវាយតម្លៃការត្រៀមខ្លួនសម្រាប់គំនូសព្រាងអេក្រង់។</p>
        </div>

        <div class="grid-2-col">
          <div class="solution-card">
            <div class="solution-header">
              <h4>ប្លង់គំរូ ៥ សសរស្តម្ភនៃឱកាសកម្មវិធី</h4>
              <button class="btn-reveal" id="btn-reveal-solution">បង្ហាញចម្លើយ</button>
            </div>
            <div class="solution-body collapsed" id="solution-content">
              <ul class="solution-list">
                <li><strong>1. បញ្ហា៖</strong> សំណើលើក្តារខៀនចម្ងាយ ២០០ ម៉ែត្រ បង្កឱ្យម៉ាស៊ីនឈប់ ៤០ នាទីរាល់ដង (ខាតបង់ $210,000/ឆ្នាំ)។</li>
                <li><strong>2. លទ្ធផល៖</strong> ដំណឹងលោតលើទូរស័ព្ទជាងភ្លាមៗ; រៀបចំពុម្ពមុន ១៥ នាទី; ពេលប្តូរពុម្ព &le; ៨ នាទី។</li>
                <li><strong>3. តួនាទី៖</strong> កម្មករ (កត់ត្រាពេលចប់), ជាងពុម្ព (ដំឡើងពុម្ព), អ្នករៀបកាលវិភាគ (តាមដានពេលឈប់)។</li>
                <li><strong>4. ទិន្នន័យ៖</strong> <code>MachineID</code> (Number), <code>CurrentMold</code> (Text), <code>NextMold</code> (Text), <code>CraneNeeded</code> (Boolean), <code>RunEndTime</code> (DateTime)។</li>
                <li><strong>5. វិធានការ៖</strong> <code>If(CraneNeeded, AlertCraneCrew() &amp; AlertToolroom(), AlertToolroomOnly())</code>។</li>
              </ul>
            </div>
          </div>

          <div class="rubric-card">
            <h4>រូបប្រឡងវាយតម្លៃ (៤ កម្រិតសមត្ថភាព)</h4>
            <div class="rubric-levels">
              <div class="level-item level-4">
                <span class="lvl-title">កម្រិត ៤៖ ស្ទាត់ជំនាញ (១០០%)</span>
                <p>សសរស្តម្ភទាំង ៥ ត្រូវបានកំណត់យ៉ាងច្បាស់ មានការវាស់វែងការខាតបង់ គោលដៅជាក់លាក់ ទិន្នន័យខ្លីច្បាស់ និងតក្កវិជ្ជាត្រឹមត្រូវ។</p>
              </div>
              <div class="level-item level-3">
                <span class="lvl-title">កម្រិត ៣៖ កម្រិតខ្ពស់ (៧៥-៩៩%)</span>
                <p>សសរស្តម្ភ ៤ ពេញលេញ; មានភាពមិនច្បាស់លាស់បន្តិចបន្តួចលើការផ្ទេរការងារ ឬខ្វះទិន្នន័យសំខាន់មួយចំណុច។</p>
              </div>
              <div class="level-item level-2">
                <span class="lvl-title">កម្រិត ២៖ កំពុងអភិវឌ្ឍ (៥០-៧៤%)</span>
                <p>ច្រឡំបញ្ហាជាមួយដំណោះស្រាយ; ដាក់ប្រអប់ទិន្នន័យលើសច្រើនពេក (លើសពី ២០); វិធានការមិនច្បាស់លាស់។</p>
              </div>
              <div class="level-item level-1">
                <span class="lvl-title">កម្រិត ១៖ អ្នកចាប់ផ្តើម (&lt;៥០%)</span>
                <p>ប្រញាប់ទៅរៀបរាប់ពីប៊ូតុងលើអេក្រង់ ដោយមិនបានវិភាគពីការលំបាករបស់មនុស្ស ឬតួនាទីអ្នកប្រើប្រាស់ឡើយ។</p>
              </div>
            </div>
          </div>
        </div>
      `
    },

    'slide-23': {
      title: 'ផែនទីតភ្ជាប់កម្មវិធីសិក្សា',
      segment: 'ផ្នែកទី ៦៖ ការវាយតម្លៃ & ស្ពានទៅមុខ (៧៥:០០ - ៩០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"សូមមើលផែនទីតភ្ជាប់ ៣ ដំណាក់កាលរបស់យើង។
កាលពីថ្ងៃទី ១–៦៖ យើងបានរៀនពីបំណែកគ្រឹះបច្ចេកទេស៖ ទិន្នន័យចូល លំដាប់ ប្រភេទតម្លៃ លក្ខខណ្ឌ True/False និងច្រកតក្កវិជ្ជា (&&, ||, !)។
ថ្ងៃនេះនៅថ្ងៃទី ៧៖ យើងបានរៀនពីរបៀបស្វែងរក និងកំណត់ឱកាសក្នុងកន្លែងធ្វើការជាក់ស្តែង ដោយប្រើក្របខ័ណ្ឌ ៥ សសរស្តម្ភ (បញ្ហា, លទ្ធផល, មនុស្ស, ព័ត៌មាន, វិធានការ)។
ថ្ងៃស្អែកនៅថ្ងៃទី ៨៖ យើងនឹងយកឱកាសដែលបានកំណត់ថ្ងៃនេះ ទៅបំប្លែងជាផែនទីដំណើរការការងារមួយជំហានម្តងៗ និងគំនូសព្រាងអេក្រង់ស្អាតៗទាំង ៣!
រាល់មេរៀននីមួយៗសុទ្ធតែកសាងលើមេរៀនមុនជានិច្ច!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge purple-badge">ស្ពានកម្មវិធីសិក្សា</span>
          <h2 class="slide-title">ផែនទីតភ្ជាប់កម្មវិធីសិក្សាបីដំណាក់កាល</h2>
          <p class="slide-lead">របៀបដែលតក្កវិជ្ជាបច្ចេកទេសកន្លងមក ការកំណត់ឱកាសអាជីវកម្មថ្ងៃនេះ និងការគូរគំនូសព្រាងដំណើរការថ្ងៃស្អែក តភ្ជាប់គ្នាជារង្វង់តែមួយ។</p>
        </div>

        <div class="bridge-three-col">
          <div class="bridge-col before-col">
            <span class="bridge-time-tag">កន្លងមក (ថ្ងៃ ១–៦)</span>
            <h3>តក្កវិជ្ជា &amp; ច្រកទ្វារបច្ចេកទេស</h3>
            <div class="bridge-summary">
              រៀនរបៀបដែលកម្មវិធីរក្សាទុកទិន្នន័យ វាយតម្លៃលក្ខខណ្ឌ True/False និងដំណើរការសកម្មភាពជាមួយ <code>If()</code>, <code>&amp;&amp;</code>, <code>||</code>, និង <code>!</code>។
            </div>
            <div class="bridge-flow-arrow">&#10142; អនុវត្តទៅលើ...</div>
          </div>

          <div class="bridge-col today-col">
            <span class="bridge-time-tag">ថ្ងៃនេះ (ថ្ងៃ ៧)</span>
            <h3>ពីបញ្ហា ទៅជាឱកាសកម្មវិធី</h3>
            <div class="bridge-summary">
              ចាប់ផ្តើមដំណាក់កាលទី ៣៖ កំណត់វិសាលភាពនៃការស្ទះប្រតិបត្តិការទៅជា ៥ សសរស្តម្ភ (បញ្ហា ➔ លទ្ធផល ➔ មនុស្ស ➔ ព័ត៌មាន ➔ វិធានការ) មុនប៉ះពាល់កូដ។
            </div>
            <div class="bridge-flow-arrow">&#10142; រៀបចំចូលទៅក្នុង...</div>
          </div>

          <div class="bridge-col next-col">
            <span class="bridge-time-tag">ថ្ងៃស្អែក (ថ្ងៃ ៨)</span>
            <h3>ផែនទីដំណើរការ &amp; គំនូសព្រាង</h3>
            <div class="bridge-summary">
              បំប្លែងឱកាសដែលបានកំណត់ ឱ្យទៅជាដ្យាក្រាមដំណើរការការងារមួយជំហានម្តងៗ និងគំនូសព្រាងគំរូអេក្រង់ស្អាតៗចំនួន ៣។
            </div>
          </div>
        </div>
      `
    },

    'slide-24': {
      title: 'កិច្ចការផ្ទះ & បញ្ជីពាក្យបច្ចេកទេស',
      segment: 'ផ្នែកទី ៦៖ ការវាយតម្លៃ & ស្ពានទៅមុខ (៧៥:០០ - ៩០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"សូមអបអរសាទរចំពោះការបញ្ចប់ថ្ងៃទី ៧! ឥឡូវនេះអ្នកមានផ្នត់គំនិតយុទ្ធសាស្ត្ររបស់ស្ថាបត្យករ Citizen Developer ហើយ!
នេះជាកិច្ចការផ្ទះ ១៥ នាទី៖ 'The Workplace Pain Hunter' (អ្នកប្រមាញ់ការលំបាកក្នុងកន្លែងធ្វើការ)។
ស្វែងរកចំណុចស្ទះពិតប្រាកដមួយក្នុងជីវិតប្រចាំថ្ងៃរបស់អ្នក៖
១. តើអ្វីដែលកំពុងឈឺចាប់?
២. តើភាពជោគជ័យពេញលេញមើលទៅដូចម្តេច?
៣. តើនរណាខ្លះជាមនុស្សក្នុងតួនាទីទាំង ៣?
៤. តើទិន្នន័យ ៤-៥ ចំណុចណាខ្លះដែលត្រូវកត់ត្រា?
៥. តើអ្វីជាវិធានការអាជីវកម្មមួយ?
សរសេរវានៅលើក្រដាសមួយសន្លឹក ហើយយកមកថ្នាក់នៅថ្ងៃស្អែក ដើម្បីយើងយកវាទៅគូរជាគំនូសព្រាងអេក្រង់!
សូមអរគុណសម្រាប់ការយកចិត្តទុកដាក់ដ៏អស្ចារ្យនៅថ្ងៃនេះ!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge blue-badge">ការបញ្ចប់មេរៀន</span>
          <h2 class="slide-title">កិច្ចការផ្ទះ ១៥ នាទី &amp; បញ្ជីពាក្យបច្ចេកទេសទ្វេភាសា</h2>
          <p class="slide-lead">អនុវត្តការស្វែងរកចំណុចស្ទះប្រតិបត្តិការក្នុងកន្លែងធ្វើការរបស់អ្នក និងស្ទាត់ជំនាញវាក្យសព្ទស្ថាបត្យកម្មអាជីវកម្ម។</p>
        </div>

        <div class="grid-2-col">
          <div class="homework-card">
            <div class="hw-icon">&#128269;</div>
            <div class="hw-content">
              <h4>កិច្ចការផ្ទះ៖ "អ្នកប្រមាញ់ការលំបាកក្នុងកន្លែងធ្វើការ" (&le; ១៥ នាទី)</h4>
              <p>១. កំណត់ <strong>ចំណុចស្ទះពិតប្រាកដ ១</strong> នៅកន្លែងធ្វើការ ឬផ្ទះរបស់អ្នក (បាត់ឧបករណ៍, ការអនុម័តយឺត, ក្រដាសកត់ត្រា)។</p>
              <p>២. សរសេរព្រាងនូវ <strong>៥ សសរស្តម្ភ</strong>៖ បញ្ហា &bull; លទ្ធផល &bull; មនុស្ស &bull; ព័ត៌មាន &bull; វិធានការ។</p>
              <p>៣. យកក្រដាសព្រាង ១ ទំព័ររបស់អ្នកមកកាន់ថ្នាក់រៀនថ្ងៃស្អែកសម្រាប់ថ្ងៃទី ៨ ជាកន្លែងដែលយើងនឹងបំប្លែងវាទៅជា <strong>ផែនទីដំណើរការ &amp; គំនូសព្រាងអេក្រង់</strong>!</p>
              <div class="hw-outcome">លទ្ធផលរំពឹងទុក៖ ប្លង់ ៥ សសរស្តម្ភចំនួន ១ សន្លឹកដែលបានបំពេញរួចរាល់សម្រាប់គូរគំនូសព្រាង!</div>
            </div>
          </div>

          <div class="glossary-card">
            <h4>បញ្ជីពាក្យបច្ចេកទេសទ្វេភាសា (ថ្ងៃទី ៧)</h4>
            <div class="glossary-list">
              <div class="gloss-item">
                <span class="en-term">App Opportunity</span>
                <span class="kh-term">ឱកាសបង្កើតកម្មវិធី / ដំណោះស្រាយបញ្ហា</span>
              </div>
              <div class="gloss-item">
                <span class="en-term">Operational Bottleneck</span>
                <span class="kh-term">ចំណុចស្ទះនៃប្រតិបត្តិការការងារ</span>
              </div>
              <div class="gloss-item">
                <span class="en-term">Requester (Creator)</span>
                <span class="kh-term">អ្នកស្នើសុំ (អ្នកបង្កើតទិន្នន័យ)</span>
              </div>
              <div class="gloss-item">
                <span class="en-term">Actor / Worker (Fixer)</span>
                <span class="kh-term">អ្នកអនុវត្តសកម្មភាព (អ្នកដោះស្រាយ)</span>
              </div>
              <div class="gloss-item">
                <span class="en-term">Feasibility Litmus Test</span>
                <span class="kh-term">វិញ្ញាសាវាយតម្លៃលទ្ធភាពជោគជ័យ</span>
              </div>
              <div class="gloss-item">
                <span class="en-term">Business Rule</span>
                <span class="kh-term">វិធានការអាជីវកម្ម / តក្កវិជ្ជានាំផ្លូវ</span>
              </div>
            </div>
          </div>
        </div>
      `
    }
  };

  // --------------------------------------------------------------------------
  // 3. CORE PRESENTATION NAVIGATION & SLIDE MANAGEMENT
  // --------------------------------------------------------------------------
  function initSlides() {
    slides = Array.from(document.querySelectorAll('.slide'));
    totalSlides = slides.length;

    // Cache English originals for clean, non-destructive swapping
    slides.forEach(slide => {
      const contentEl = slide.querySelector('.slide-content');
      if (contentEl) {
        slideOriginals[slide.id] = {
          title: slide.getAttribute('data-title') || '',
          segment: slide.getAttribute('data-segment') || '',
          notes: slide.getAttribute('data-notes') || '',
          html: contentEl.innerHTML
        };
      }
    });

    goToSlide(0);
    renderOverviewGrid();
  }

  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;

    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === index);
    });

    currentSlideIndex = index;
    updateHeaderAndFooter();
    updateNotesContent();
    highlightActiveThumb();
    rebindInteractiveElementsForCurrentSlide();
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

  function restartDeck() {
    goToSlide(0);
  }

  function updateHeaderAndFooter() {
    const currentSlide = slides[currentSlideIndex];
    if (!currentSlide) return;

    // Update Counter
    const counterEl = document.getElementById('slide-counter');
    if (counterEl) {
      counterEl.textContent = `Slide ${currentSlideIndex + 1} of ${totalSlides}`;
    }

    // Update Progress Bar
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
      const progressPercent = ((currentSlideIndex + 1) / totalSlides) * 100;
      progressBar.style.width = `${progressPercent}%`;
    }

    // Update Header Slide Title
    const titleEl = document.getElementById('current-slide-title');
    if (titleEl) {
      if (isKhmerActive && KHMER_SLIDES[currentSlide.id]) {
        titleEl.textContent = KHMER_SLIDES[currentSlide.id].title;
      } else {
        titleEl.textContent = currentSlide.getAttribute('data-title') || '';
      }
    }

    // Update Header Segment Badge
    const segmentEl = document.getElementById('current-segment-name');
    if (segmentEl) {
      if (isKhmerActive && KHMER_SLIDES[currentSlide.id]) {
        segmentEl.textContent = KHMER_SLIDES[currentSlide.id].segment;
      } else {
        segmentEl.textContent = currentSlide.getAttribute('data-segment') || '';
      }
    }

    // Update Button Disabled States
    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');
    if (prevBtn) prevBtn.disabled = currentSlideIndex === 0;
    if (nextBtn) nextBtn.disabled = currentSlideIndex === totalSlides - 1;
  }

  // --------------------------------------------------------------------------
  // 4. 90-MINUTE LIVE ACTIVITY TIMER
  // --------------------------------------------------------------------------
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
    timerInterval = null;
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
    const iconContainer = document.getElementById('timer-icon');
    if (!iconContainer) return;
    if (isTimerRunning) {
      // Pause Icon
      iconContainer.innerHTML = '<path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>';
    } else {
      // Play Icon
      iconContainer.innerHTML = '<path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>';
    }
  }

  // --------------------------------------------------------------------------
  // 5. IN-DOM NON-DESTRUCTIVE BILINGUAL ENGINE
  // --------------------------------------------------------------------------
  function toggleLanguage() {
    try { localStorage.setItem('powerapps_presentation_lang', !isKhmerActive ? 'km' : 'en'); } catch(e){}
    isKhmerActive = !isKhmerActive;
    document.body.classList.toggle('khmer-mode', isKhmerActive);

    const langBtnText = document.getElementById('lang-btn-text');
    if (langBtnText) {
      langBtnText.textContent = isKhmerActive ? '🇬🇧 English' : '🇰🇭 ខ្មែរ (Khmer)';
    }

    slides.forEach(slide => {
      const contentEl = slide.querySelector('.slide-content');
      if (!contentEl) return;

      if (isKhmerActive) {
        const khData = KHMER_SLIDES[slide.id];
        if (khData && khData.html) {
          contentEl.innerHTML = khData.html;
        }
      } else {
        const orig = slideOriginals[slide.id];
        if (orig && orig.html) {
          contentEl.innerHTML = orig.html;
        }
      }
    });

    updateHeaderAndFooter();
    updateNotesContent();
    renderOverviewGrid();
    rebindInteractiveElementsForCurrentSlide();
  }

  // --------------------------------------------------------------------------
  // 6. PRESENTER NOTES & OVERVIEW MODAL
  // --------------------------------------------------------------------------
  function toggleNotes() {
    const notesPanel = document.getElementById('presenter-notes-panel');
    if (!notesPanel) return;

    isNotesOpen = !isNotesOpen;
    notesPanel.classList.toggle('open', isNotesOpen);
    notesPanel.classList.toggle('hidden', !isNotesOpen);
    notesPanel.setAttribute('aria-hidden', !isNotesOpen);
    updateNotesContent();
  }

  function updateNotesContent() {
    const notesBody = document.getElementById('notes-body');
    const currentSlide = slides[currentSlideIndex];
    if (!notesBody || !currentSlide) return;

    if (isKhmerActive && KHMER_SLIDES[currentSlide.id] && KHMER_SLIDES[currentSlide.id].notes) {
      notesBody.textContent = KHMER_SLIDES[currentSlide.id].notes;
    } else {
      notesBody.textContent = currentSlide.getAttribute('data-notes') || 'No trainer script notes recorded for this slide.';
    }
  }

  function openOverview() {
    const modal = document.getElementById('overview-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    highlightActiveThumb();
  }

  function closeOverview() {
    const modal = document.getElementById('overview-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
  }

  function renderOverviewGrid() {
    const gridContainer = document.getElementById('overview-grid');
    if (!gridContainer) return;
    gridContainer.innerHTML = '';

    slides.forEach((slide, idx) => {
      const thumb = document.createElement('div');
      thumb.className = `overview-thumb ${idx === currentSlideIndex ? 'active-thumb' : ''}`;
      thumb.setAttribute('data-index', idx);

      let title = slide.getAttribute('data-title') || `Slide ${idx + 1}`;
      if (isKhmerActive && KHMER_SLIDES[slide.id]) {
        title = KHMER_SLIDES[slide.id].title;
      }

      thumb.innerHTML = `
        <span class="thumb-num">SLIDE ${idx + 1}</span>
        <span class="thumb-title">${title}</span>
      `;

      thumb.addEventListener('click', () => {
        goToSlide(idx);
        closeOverview();
      });

      gridContainer.appendChild(thumb);
    });
  }

  function highlightActiveThumb() {
    const thumbs = document.querySelectorAll('.overview-thumb');
    thumbs.forEach(t => {
      const idx = parseInt(t.getAttribute('data-index'), 10);
      t.classList.toggle('active-thumb', idx === currentSlideIndex);
    });
  }

  // --------------------------------------------------------------------------
  // 7. INTERACTIVE WIDGET: OPPORTUNITY DISCOVERY CANVAS (Slide 12)
  // --------------------------------------------------------------------------
  let isMobileRequired = true;

  const CANVAS_DATA = {
    'maintenance': {
      freqEn: "Daily (10-15 times per shift)",
      freqKh: "រាល់ថ្ងៃ (១០-១៥ ដងក្នុងមួយវេន)",
      riskEn: "$32,000 Unplanned Line Downtime",
      riskKh: "ខាតបង់ $32,000 ដោយម៉ាស៊ីនឈប់ដំណើរការ",
      badgeEn: "HIGH APP OPPORTUNITY (SCORE: 95%)",
      badgeKh: "ឱកាសកម្មវិធីកម្រិតខ្ពស់ (ពិន្ទុ៖ 95%)",
      titleEn: "✔ Prime Power Apps Candidate",
      titleKh: "✔ បេក្ខភាពចម្បងសម្រាប់ Power Apps",
      descEn: "High frequency, urgent human hand-off, mobile floor capture, automated supervisor escalation.",
      descKh: "ភាពញឹកញាប់ខ្ពស់, ការផ្ទេរការងារបន្ទាន់, ការកត់ត្រាចល័តលើឥដ្ឋរោងចក្រ, ការបញ្ជូនដំណឹងទៅប្រធានស្វ័យប្រវត្តិ។",
      summaryEn: "<strong>Roles:</strong> Operator ➔ Technician ➔ Shift Lead<br><strong>Data:</strong> Machine #, Fault Type, Urgency, Notes, Photo<br><strong>Rule:</strong> If Urgency = 'Critical' ➔ Alert Lead Immediately",
      summaryKh: "<strong>តួនាទី៖</strong> កម្មករ ➔ ជាងជួសជុល ➔ ប្រធានវេន<br><strong>ទិន្នន័យ៖</strong> លេខម៉ាស៊ីន, ប្រភេទខូច, កម្រិតបន្ទាន់, ចំណាំ, រូបថត<br><strong>វិធានការ៖</strong> បើកម្រិតបន្ទាន់ = 'បន្ទាន់ខ្លាំង' ➔ ផ្តល់ដំណឹងទៅប្រធានភ្លាមៗ",
      isApp: true
    },
    'die-change': {
      freqEn: "Recurring (3-4 times per day)",
      freqKh: "កើតឡើងញឹកញាប់ (៣-៤ ដងក្នុងមួយថ្ងៃ)",
      riskEn: "$210,000/year Lost Idle Machine Time",
      riskKh: "ខាតបង់ $210,000/ឆ្នាំ ដោយម៉ាស៊ីនឈប់ចោល",
      badgeEn: "HIGH APP OPPORTUNITY (SCORE: 90%)",
      badgeKh: "ឱកាសកម្មវិធីកម្រិតខ្ពស់ (ពិន្ទុ៖ 90%)",
      titleEn: "✔ High Operational ROI Candidate",
      titleKh: "✔ បេក្ខភាពផលចំណេញប្រតិបត្តិការខ្ពស់",
      descEn: "Inter-department coordination between Line Operators, Toolroom, and Rigging Crane crew.",
      descKh: "ការសម្របសម្រួលឆ្លងផ្នែករវាងកម្មករម៉ាស៊ីន រោងជាងពុម្ព និងក្រុមស្ទូច។",
      summaryEn: "<strong>Roles:</strong> Line Operator ➔ Tooling Tech ➔ Production Scheduler<br><strong>Data:</strong> Machine #, Old Mold ID, New Mold ID, Crane Needed, Time<br><strong>Rule:</strong> If Crane Needed ➔ Alert Rigging Crew + Toolroom",
      summaryKh: "<strong>តួនាទី៖</strong> កម្មករម៉ាស៊ីន ➔ ជាងពុម្ព ➔ អ្នករៀបកាលវិភាគផលិត<br><strong>ទិន្នន័យ៖</strong> លេខម៉ាស៊ីន, លេខពុម្ពចាស់, លេខពុម្ពថ្មី, ត្រូវការស្ទូច, ពេលវេលា<br><strong>វិធានការ៖</strong> បើត្រូវការស្ទូច ➔ ផ្តល់ដំណឹងទៅក្រុមស្ទូច + រោងជាងពុម្ព",
      isApp: true
    },
    'forklift': {
      freqEn: "Daily (Before each 8-hour shift)",
      freqKh: "រាល់ថ្ងៃ (មុនពេលចាប់ផ្តើមវេន ៨ ម៉ោង)",
      riskEn: "OSHA Safety Non-Compliance & Severe Fines",
      riskKh: "ការបំពានច្បាប់សុវត្ថិភាព OSHA & ការផាកពិន័យធ្ងន់ធ្ងរ",
      badgeEn: "HIGH APP OPPORTUNITY (SCORE: 92%)",
      badgeKh: "ឱកាសកម្មវិធីកម្រិតខ្ពស់ (ពិន្ទុ៖ 92%)",
      titleEn: "✔ Critical Regulatory Audit Trail",
      titleKh: "✔ កំណត់ត្រាសវនកម្មបទប្បញ្ញត្តិសំខាន់",
      descEn: "Replaces paper checklist clipboard with digital inspection, barcode scan, and lockout flag.",
      descKh: "ជំនួសក្រដាសកត់ត្រាដោយការត្រួតពិនិត្យឌីជីថល ស្កេនបាកូដ និងការចាក់សោបើមានគ្រោះថ្នាក់។",
      summaryEn: "<strong>Roles:</strong> Forklift Driver ➔ Safety Officer ➔ Fleet Maintenance<br><strong>Data:</strong> Vehicle #, Brakes OK, Horn OK, Fluid OK, Driver Badge<br><strong>Rule:</strong> If Any Safety Item Fails ➔ Lockout Vehicle & Dispatch Tech",
      summaryKh: "<strong>តួនាទី៖</strong> អ្នកបើកបរ ➔ មន្ត្រីសុវត្ថិភាព ➔ ជាងជួសជុលរថយន្ត<br><strong>ទិន្នន័យ៖</strong> លេខរថយន្ត, ហ្វ្រាំង OK, ស៊ីប្លេ OK, ប្រេង OK, កាតសម្គាល់<br><strong>វិធានការ៖</strong> បើមានចំណុចមិនជាប់ ➔ ចាក់សោរថយន្ត & បញ្ជូនជាងភ្លាម",
      isApp: true
    },
    'cafeteria': {
      freqEn: "Static Weekly Bulletin (Once a week)",
      freqKh: "ផ្ទាំងព័ត៌មាន جامد (១ សប្តាហ៍ម្តង)",
      riskEn: "Zero Operational Risk or Lost Production",
      riskKh: "គ្មានហានិភ័យប្រតិបត្តិការ ឬការខាតបង់ឡើយ",
      badgeEn: "LOW OPPORTUNITY (SCORE: 12% - DO NOT BUILD)",
      badgeKh: "ឱកាសទាប (ពិន្ទុ៖ 12% - មិនគួរធ្វើកម្មវិធីឡើយ)",
      titleEn: "✖ Non-App Candidate (Use Teams or Email)",
      titleKh: "✖ មិនមែនជាបេក្ខភាពកម្មវិធី (ប្រើ Teams ឬ Email)",
      descEn: "Zero data hand-off, zero business logic, zero mobile capture needs. Better served by Teams or PDF.",
      descKh: "គ្មានការផ្ទេរការងារ គ្មានតក្កវិជ្ជាអាជីវកម្ម គ្មានតម្រូវការទិន្នន័យចល័ត។ ប្រើ Teams ឬ PDF ល្អជាង។",
      summaryEn: "<strong>Roles:</strong> Cafeteria Chef ➔ Employees (Read-only)<br><strong>Data:</strong> Monday–Friday Menu Text (Static)<br><strong>Rule:</strong> None (No calculations or branching actions)",
      summaryKh: "<strong>តួនាទី៖</strong> ចុងភៅ ➔ បុគ្គលិក (មើលតែប៉ុណ្ណោះ)<br><strong>ទិន្នន័យ៖</strong> អត្ថបទមុខម្ហូបច័ន្ទ-សុក្រ (មិនប្រែប្រួល)<br><strong>វិធានការ៖</strong> គ្មាន (គ្មានការគណនា ឬសកម្មភាពបំបែកផ្លូវ)",
      isApp: false
    }
  };

  function initOpportunityCanvas() {
    const selectEl = document.getElementById('canvas-scenario-select');
    const mobileBtn = document.getElementById('canvas-mobile-btn');

    if (!selectEl) return;

    selectEl.onchange = updateCanvasUI;

    if (mobileBtn) {
      mobileBtn.onclick = () => {
        isMobileRequired = !isMobileRequired;
        const ind = mobileBtn.querySelector('.toggle-indicator');
        if (ind) {
          ind.className = `toggle-indicator ${isMobileRequired ? 'on' : 'off'}`;
        }
        mobileBtn.innerHTML = isMobileRequired
          ? `<span class="toggle-indicator on"></span> ${isKhmerActive ? 'ឧបករណ៍ Tablet ចល័ត៖ ត្រូវការ' : 'Mobile Tablets: YES'}`
          : `<span class="toggle-indicator off"></span> ${isKhmerActive ? 'ឧបករណ៍ Tablet ចល័ត៖ មិនត្រូវការ' : 'Mobile Tablets: NO'}`;
        updateCanvasUI();
      };
    }

    updateCanvasUI();
  }

  function updateCanvasUI() {
    const selectEl = document.getElementById('canvas-scenario-select');
    const freqEl = document.getElementById('canvas-freq-val');
    const riskEl = document.getElementById('canvas-risk-val');
    const resultCard = document.getElementById('canvas-result-card');
    const badgeEl = document.getElementById('canvas-opportunity-badge');
    const titleEl = document.getElementById('canvas-opportunity-title');
    const descEl = document.getElementById('canvas-opportunity-desc');
    const summaryEl = document.getElementById('canvas-summary-box');

    if (!selectEl || !resultCard) return;

    const key = selectEl.value;
    const item = CANVAS_DATA[key];
    if (!item) return;

    if (freqEl) freqEl.value = isKhmerActive ? item.freqKh : item.freqEn;
    if (riskEl) riskEl.value = isKhmerActive ? item.riskKh : item.riskEn;

    if (item.isApp) {
      resultCard.className = 'decision-result-card status-routine';
      if (badgeEl) badgeEl.textContent = isKhmerActive ? item.badgeKh : item.badgeEn;
      if (titleEl) {
        titleEl.textContent = isKhmerActive ? item.titleKh : item.titleEn;
        titleEl.style.color = '#4ade80';
      }
      if (descEl) descEl.textContent = isKhmerActive ? item.descKh : item.descEn;
    } else {
      resultCard.className = 'decision-result-card status-critical';
      if (badgeEl) badgeEl.textContent = isKhmerActive ? item.badgeKh : item.badgeEn;
      if (titleEl) {
        titleEl.textContent = isKhmerActive ? item.titleKh : item.titleEn;
        titleEl.style.color = '#fb7185';
      }
      if (descEl) descEl.textContent = isKhmerActive ? item.descKh : item.descEn;
    }

    if (summaryEl) summaryEl.innerHTML = isKhmerActive ? item.summaryKh : item.summaryEn;
  }

  // --------------------------------------------------------------------------
  // 8. INTERACTIVE WIDGET: 6-SCENARIO OPPORTUNITY SIMULATOR (Slide 18)
  // --------------------------------------------------------------------------
  const userOpportunityChoices = {};

  function initOpportunitySimulator() {
    const cards = document.querySelectorAll('.evaluator-card');
    cards.forEach(card => {
      const scenarioId = card.getAttribute('data-scenario');
      const correctChoice = card.getAttribute('data-correct');
      const btns = card.querySelectorAll('.cond-btn');

      btns.forEach(btn => {
        btn.onclick = () => {
          const choice = btn.getAttribute('data-choice');
          userOpportunityChoices[scenarioId] = choice;

          // Clear previous highlights in this card
          btns.forEach(b => b.classList.remove('selected-true', 'selected-false'));

          const isCorrect = choice === correctChoice;
          btn.classList.add(isCorrect ? 'selected-true' : 'selected-false');

          const statusText = card.querySelector('.cond-status-text');
          if (statusText) {
            statusText.textContent = isCorrect
              ? (isKhmerActive ? '✓ ត្រឹមត្រូវណាស់! ការវិភាគរោគវិនិច្ឆ័យរបស់អ្នកច្បាស់លាស់។' : '✓ Correct! Sound opportunity diagnosis.')
              : (isKhmerActive ? '✗ មិនត្រឹមត្រូវទេ។ សូមពិនិត្យមើលវិញ្ញាសាទាំង ៤ ឡើងវិញ។' : '✗ Incorrect. Re-evaluate against the 4 Litmus Tests.');
            statusText.style.color = isCorrect ? 'var(--fluent-green-light)' : 'var(--fluent-red-light)';
          }

          updateSimulatorScore();
        };
      });
    });
  }

  function updateSimulatorScore() {
    const cards = document.querySelectorAll('.evaluator-card');
    let correctCount = 0;

    cards.forEach(card => {
      const scenarioId = card.getAttribute('data-scenario');
      const correctChoice = card.getAttribute('data-correct');
      if (userOpportunityChoices[scenarioId] === correctChoice) {
        correctCount++;
      }
    });

    const scoreEl = document.getElementById('sim-score');
    const feedbackEl = document.getElementById('sim-feedback');

    if (scoreEl) scoreEl.textContent = correctCount;
    if (feedbackEl) {
      if (correctCount === 6) {
        feedbackEl.textContent = isKhmerActive
          ? '🌟 អស្ចារ្យណាស់! អ្នកបានវាយតម្លៃត្រូវទាំង ៦ សេណារីយ៉ូ!'
          : '🌟 Perfect! You mastered all 6 opportunity diagnostic scenarios!';
        feedbackEl.style.color = 'var(--fluent-green-light)';
      } else {
        feedbackEl.textContent = isKhmerActive
          ? `ឆ្លើយត្រូវ ${correctCount} នៃ ៦។ បន្តវាយតម្លៃសេណារីយ៉ូដែលនៅសល់!`
          : `${correctCount} of 6 correct. Continue evaluating remaining scenarios!`;
        feedbackEl.style.color = '#ffffff';
      }
    }
  }

  // --------------------------------------------------------------------------
  // 9. INTERACTIVE WIDGET: 5-QUESTION QUIZ (Slide 20)
  // --------------------------------------------------------------------------
  function initQuiz() {
    renderQuizQuestion();

    const prevBtn = document.getElementById('quiz-prev-btn');
    const nextBtn = document.getElementById('quiz-next-btn');

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
        }
      };
    }
  }

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

    if (prevBtn) prevBtn.disabled = currentQuizIndex === 0;
    if (nextBtn) {
      nextBtn.disabled = currentQuizIndex === QUIZ_QUESTIONS.length - 1;
      nextBtn.textContent = currentQuizIndex === QUIZ_QUESTIONS.length - 1
        ? (isKhmerActive ? 'បានបញ្ចប់' : 'Completed')
        : (isKhmerActive ? 'សំណួរបន្ទាប់ →' : 'Next Question →');
    }

    const questionText = isKhmerActive ? q.qKh : q.qEn;
    const options = isKhmerActive ? q.optionsKh : q.optionsEn;
    const answered = userQuizAnswers[currentQuizIndex] !== undefined;
    const selectedAnswer = userQuizAnswers[currentQuizIndex];

    let optionsHtml = '';
    options.forEach((opt, optIdx) => {
      let optClass = 'quiz-option-btn';
      if (answered) {
        if (optIdx === q.correctIndex) {
          optClass += ' option-correct';
        } else if (optIdx === selectedAnswer) {
          optClass += ' option-incorrect';
        }
      }

      optionsHtml += `
        <button class="${optClass}" data-opt-idx="${optIdx}" ${answered ? 'disabled' : ''}>
          ${opt}
        </button>
      `;
    });

    let explanationHtml = '';
    if (answered) {
      const isCorrect = selectedAnswer === q.correctIndex;
      const expText = isKhmerActive ? q.explanationKh : q.explanationEn;
      explanationHtml = `
        <div class="quiz-explanation ${isCorrect ? 'exp-correct' : 'exp-incorrect'}">
          <strong>${isCorrect ? (isKhmerActive ? '✓ ត្រឹមត្រូវ!' : '✓ Correct!') : (isKhmerActive ? '✗ មិនទាន់ត្រឹមត្រូវទេ' : '✗ Incorrect')}</strong>
          <span>${expText}</span>
        </div>
      `;
    }

    quizBody.innerHTML = `
      <div class="quiz-question-text">${questionText}</div>
      <div class="quiz-options-group">${optionsHtml}</div>
      ${explanationHtml}
    `;

    // Bind Option Clicks
    const optButtons = quizBody.querySelectorAll('.quiz-option-btn');
    optButtons.forEach(btn => {
      btn.onclick = () => {
        const choiceIdx = parseInt(btn.getAttribute('data-opt-idx'), 10);
        userQuizAnswers[currentQuizIndex] = choiceIdx;
        if (choiceIdx === q.correctIndex) {
          quizScore++;
        }
        renderQuizQuestion();
      };
    });
  }

  // --------------------------------------------------------------------------
  // 10. COLLAPSIBLE SOLUTION DRAWER (Slide 22)
  // --------------------------------------------------------------------------
  function initSolutionToggle() {
    const revealBtn = document.getElementById('btn-reveal-solution');
    const content = document.getElementById('solution-content');

    if (!revealBtn || !content) return;

    revealBtn.onclick = () => {
      const isCollapsed = content.classList.contains('collapsed');
      if (isCollapsed) {
        content.classList.remove('collapsed');
        revealBtn.textContent = isKhmerActive ? 'លាក់ចម្លើយ' : 'Hide Solution';
      } else {
        content.classList.add('collapsed');
        revealBtn.textContent = isKhmerActive ? 'បង្ហាញចម្លើយ' : 'Reveal Solution';
      }
    };
  }

  // --------------------------------------------------------------------------
  // 11. REBINDING INTERACTIVE CONTROLS AFTER SLIDE TRANSITION OR BILINGUAL SWAP
  // --------------------------------------------------------------------------
  function rebindInteractiveElementsForCurrentSlide() {
    initOpportunityCanvas();
    initOpportunitySimulator();
    initQuiz();
    initSolutionToggle();
  }

  // --------------------------------------------------------------------------
  // 12. GLOBAL EVENT LISTENERS & KEYBOARD CONTROLS
  // --------------------------------------------------------------------------
  function initKeyboardControls() {
    document.addEventListener('keydown', (e) => {
      // Ignore keystrokes when typing into text inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
        case 'l':
        case 'L':
          e.preventDefault();
          nextSlide();
          break;

        case 'ArrowLeft':
        case 'PageUp':
        case 'h':
        case 'H':
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
          toggleNotes();
          break;

        case 'o':
        case 'O':
          e.preventDefault();
          const modal = document.getElementById('overview-modal');
          if (modal && !modal.classList.contains('hidden')) {
            closeOverview();
          } else {
            openOverview();
          }
          break;

        case 'r':
        case 'R':
          e.preventDefault();
          restartDeck();
          break;

        case 'Escape':
          e.preventDefault();
          closeOverview();
          if (isNotesOpen) toggleNotes();
          break;

        default:
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

  function initUIButtons() {
    // Top Bar Buttons
    const langBtn = document.getElementById('btn-lang');
    if (langBtn) langBtn.onclick = toggleLanguage;

    const overviewBtn = document.getElementById('btn-overview');
    if (overviewBtn) overviewBtn.onclick = openOverview;

    const notesBtn = document.getElementById('btn-notes');
    if (notesBtn) notesBtn.onclick = toggleNotes;

    const fullscreenBtn = document.getElementById('btn-fullscreen');
    if (fullscreenBtn) fullscreenBtn.onclick = toggleFullscreen;

    const timerToggleBtn = document.getElementById('timer-toggle-btn');
    if (timerToggleBtn) timerToggleBtn.onclick = toggleTimer;

    const timerResetBtn = document.getElementById('timer-reset-btn');
    if (timerResetBtn) timerResetBtn.onclick = resetTimer;

    // Bottom Bar Buttons
    const prevBtn = document.getElementById('btn-prev');
    if (prevBtn) prevBtn.onclick = prevSlide;

    const nextBtn = document.getElementById('btn-next');
    if (nextBtn) nextBtn.onclick = nextSlide;

    const restartBtn = document.getElementById('btn-restart');
    if (restartBtn) restartBtn.onclick = restartDeck;

    // Modal Close Buttons
    const closeOverviewBtn = document.getElementById('btn-close-overview');
    const overviewBackdrop = document.getElementById('overview-backdrop');
    if (closeOverviewBtn) closeOverviewBtn.onclick = closeOverview;
    if (overviewBackdrop) overviewBackdrop.onclick = closeOverview;

    const closeNotesBtn = document.getElementById('btn-close-notes');
    if (closeNotesBtn) closeNotesBtn.onclick = toggleNotes;
  }

  // --------------------------------------------------------------------------
  // 13. BOOTSTRAP INITIALIZATION
  // --------------------------------------------------------------------------
  window.addEventListener('DOMContentLoaded', () => {
    initSlides();
    initUIButtons();
    initKeyboardControls();
    rebindInteractiveElementsForCurrentSlide();
  });

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
