/**
 * ============================================================================
 * POWER APPS FOUNDATION: DAY 8 PRESENTATION ENGINE
 * Topic: Process, Workflow, Status & Decision
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

  // Presenter Notes & Overview State
  let isNotesOpen = false;
  let isOverviewOpen = false;

  // Bilingual State (In-DOM instant swapping inside .slide-content)
  let isKhmerActive = false;
  const slideOriginals = {};

  // Interactive Quiz State (Slide 20)
  let currentQuizIndex = 0;
  let quizScore = 0;
  let userQuizAnswers = {};

  const QUIZ_QUESTIONS = [
    {
      qEn: "1. What is the primary function of a 'Status' field in a business app?",
      qKh: "១. តើមុខងារចម្បងនៃប្រអប់ទិន្នន័យ 'Status' (ស្ថានភាព) នៅក្នុងកម្មវិធីអាជីវកម្មគឺជាអ្វី?",
      optionsEn: [
        "A) A decorative label that operators can type anything into",
        "B) The single source of truth describing the record's current lifecycle stage, controlling UI and permissions",
        "C) A formula that deletes old database records automatically",
        "D) An email notification sent to the plant manager every 5 minutes"
      ],
      optionsKh: [
        "A) ស្លាកលម្អសម្រាប់អ្នកប្រើប្រាស់វាយបញ្ចូលអ្វីក៏បានតាមចិត្ត",
        "B) ប្រភពពិតតែមួយគត់ដែលបញ្ជាក់ពីដំណាក់កាលនៃទិន្នន័យ ព្រមទាំងគ្រប់គ្រងផ្ទាំងបង្ហាញ និងសិទ្ធិអនុញ្ញាត",
        "C) រូបមន្តដែលលុបទិន្នន័យចាស់ៗចេញពីមូលដ្ឋានទិន្នន័យដោយស្វ័យប្រវត្តិ",
        "D) សារជូនដំណឹងតាមអ៊ីមែលដែលផ្ញើទៅកាន់ប្រធានរោងចក្ររៀងរាល់ ៥ នាទីម្តង"
      ],
      correctIndex: 1,
      explanationEn: "Correct! The Status field acts as the master key: it tracks where work is, who owns it, and dynamically controls whether buttons are Visible and forms are Editable.",
      explanationKh: "ត្រឹមត្រូវ! ប្រអប់ស្ថានភាពដើរតួជាកូនសោចម្បង៖ វាត្រួតពិនិត្យថាការងារដល់ណា អ្នកណាជាអ្នកទទួលខុសត្រូវ និងបញ្ជាប៊ូតុង Visible ឬទម្រង់ Editable ដោយស្វ័យប្រវត្តិ។"
    },
    {
      qEn: "2. Why is an app not allowed to jump a record directly from 'Submitted' to 'Closed' without technician work?",
      qKh: "២. ហេតុអ្វីបានជាកម្មវិធីមិនអនុញ្ញាតឱ្យរំលងទិន្នន័យពី 'Submitted' ទៅ 'Closed' ដោយផ្ទាល់ដោយគ្មានការជួសជុល?",
      optionsEn: [
        "A) Power Apps crashes if you skip a status",
        "B) It bypasses triage, budget review, physical repair, and safety checks, creating operational catastrophe",
        "C) Because Closed tickets take up twice as much cloud storage",
        "D) Because only Microsoft engineers can set a status to Closed"
      ],
      optionsKh: [
        "A) Power Apps នឹងគាំងដំណើរការប្រសិនបើអ្នករំលងដំណាក់កាល",
        "B) វាធ្វើឱ្យរំលងការត្រួតពិនិត្យ ថវិកា ការជួសជុលជាក់ស្តែង និងសុវត្ថិភាព ដែលអាចបង្កមហន្តរាយដល់រោងចក្រ",
        "C) ដោយសារតែទិន្នន័យដែលបិទ (Closed) ស៊ីទំហំផ្ទុកទ្វេដង",
        "D) ពីព្រោះមានតែវិស្វករ Microsoft ប៉ុណ្ណោះដែលអាចប្តូរទៅជា Closed បាន"
      ],
      correctIndex: 1,
      explanationEn: "Correct! Workflows enforce accountability and safety. Skipping repair and quality inspections is why factory disasters happen.",
      explanationKh: "ត្រឹមត្រូវ! លំហូរការងារធានានូវគណនេយ្យភាព និងសុវត្ថិភាព។ ការរំលងការជួសជុល និងការត្រួតពិនិត្យគុណភាព អាចបង្កគ្រោះថ្នាក់យ៉ាងធ្ងន់ធ្ងរ។"
    },
    {
      qEn: "3. In a visual flowchart, what does a diamond symbol represent?",
      qKh: "៣. នៅក្នុងដ្យាក្រាមលំហូរការងារ តើរូបសញ្ញាពេជ្រ (Diamond) តំណាងឱ្យអ្វី?",
      optionsEn: [
        "A) The start of a database table",
        "B) A decision gate where a condition produces True or False, splitting the workflow path",
        "C) The button that closes the application",
        "D) A user profile picture"
      ],
      optionsKh: [
        "A) ចំណុចចាប់ផ្តើមនៃតារាងមូលដ្ឋានទិន្នន័យ",
        "B) ច្រកទ្វារសម្រេចចិត្ត (Decision Gate) ដែលលក្ខខណ្ឌបង្កើតបាន True ឬ False ដើម្បីបំបែកផ្លូវដំណើរការ",
        "C) ប៊ូតុងសម្រាប់បិទកម្មវិធី",
        "D) រូបភាពគណនីរបស់អ្នកប្រើប្រាស់"
      ],
      correctIndex: 1,
      explanationEn: "Correct! The diamond represents a decision gate. A business rule evaluates data (e.g. Cost > $1,000) and routes work down the True or False path.",
      explanationKh: "ត្រឹមត្រូវ! សញ្ញាពេជ្រតំណាងឱ្យច្រកសម្រេចចិត្ត។ ក្បួនអាជីវកម្មសួរលក្ខខណ្ឌលើទិន្នន័យ (ឧ. តម្លៃ > $1,000) រួចបំបែកផ្លូវទៅតាម True ឬ False។"
    },
    {
      qEn: "4. Why should a form's DisplayMode be locked to View when a work order reaches 'Closed' status?",
      qKh: "៤. ហេតុអ្វីបានជា DisplayMode នៃទម្រង់គួរតែចាក់សោត្រឹម View នៅពេលសំណើដល់ស្ថានភាព 'Closed'?",
      optionsEn: [
        "A) To save battery on tablet computers",
        "B) To prevent accidental tampering or historical alteration after quality sign-off and audit compliance",
        "C) Because Power Apps cannot display colors on closed records",
        "D) Because closed records are automatically sent to Microsoft Excel"
      ],
      optionsKh: [
        "A) ដើម្បីសន្សំសំចៃថ្មនៅលើកុំព្យូទ័របន្ទះ (Tablet)",
        "B) ដើម្បីការពារកុំឱ្យមានការកែប្រែទិន្នន័យប្រវត្តិសាស្ត្រដោយអចេតនា ក្រោយពេលឆ្លងកាត់ការត្រួតពិនិត្យគុណភាព",
        "C) ពីព្រោះ Power Apps មិនអាចបង្ហាញពណ៌លើទិន្នន័យដែលបិទរួចបានទេ",
        "D) ពីព្រោះទិន្នន័យដែលបិទរួច នឹងត្រូវផ្ញើទៅកាន់ Microsoft Excel ដោយស្វ័យប្រវត្តិ"
      ],
      correctIndex: 1,
      explanationEn: "Correct! Immutability after completion protects legal compliance, accounting audits, and ISO quality standards.",
      explanationKh: "ត្រឹមត្រូវ! ការមិនអនុញ្ញាតឱ្យកែប្រែក្រោយពេលបញ្ចប់ ជួយការពារសុពលភាពច្បាប់ សវនកម្មគណនេយ្យ និងស្តង់ដារគុណភាព ISO។"
    },
    {
      qEn: "5. Given the formula: btnStart.Visible = (Status = 'Approved') && (AssignedTech = User().Email), when will the button appear?",
      qKh: "៥. ប្រសិនបើមានរូបមន្ត៖ btnStart.Visible = (Status = 'Approved') && (AssignedTech = User().Email) តើប៊ូតុងនឹងបង្ហាញនៅពេលណា?",
      optionsEn: [
        "A) Whenever any user logs in, regardless of status",
        "B) Only when the request is Approved AND the currently logged-in user is the assigned technician",
        "C) Only on weekends and night shifts",
        "D) When the supervisor clicks reject"
      ],
      optionsKh: [
        "A) គ្រប់ពេលដែលអ្នកប្រើប្រាស់ណាម្នាក់ចូលប្រើ ដោយមិនខ្វល់ពីស្ថានភាព",
        "B) លុះត្រាតែសំណើត្រូវបាន Approved ហើយអ្នកកំពុងបើកមើល គឺជាជាងបច្ចេកទេសដែលត្រូវបានចាត់តាំងឱ្យធ្វើការងារនោះ",
        "C) បង្ហាញតែនៅថ្ងៃចុងសប្តាហ៍ និងវេនយប់ប៉ុណ្ណោះ",
        "D) នៅពេលដែលប្រធានចុចបដិសេធ (Reject)"
      ],
      correctIndex: 1,
      explanationEn: "Correct! The && (AND) operator requires BOTH conditions to be True: Status must be 'Approved' AND the current user must match the assigned technician.",
      explanationKh: "ត្រឹមត្រូវ! សញ្ញា && (AND) ទាមទារឱ្យលក្ខខណ្ឌទាំងពីរចេញ True ព្រមគ្នា៖ ស្ថានភាពត្រូវតែ 'Approved' ហើយអ្នកប្រើត្រូវតែជាជាងដែលត្រូវគេចាត់តាំង។"
    }
  ];

  // --------------------------------------------------------------------------
  // 2. KHMER SLIDES DICTIONARY (EXACT 1-TO-1 DOM MIRRORING)
  // --------------------------------------------------------------------------
  const KHMER_SLIDES = {
    0: {
      title: "ចំណងជើង & ការណែនាំ",
      content: `
        <div class="title-badge-row">
          <span class="pill pill-purple">ដំណាក់កាលទី ៣៖ ការគិតបែបអាជីវកម្ម</span>
          <span class="pill pill-teal">ថ្ងៃទី ៨ នៃ ២៧ ថ្ងៃ</span>
          <span class="pill pill-blue">រយៈពេល៖ ៩០ នាទី</span>
        </div>
        
        <h1 class="hero-title">ដំណើរការ, លំហូរការងារ, ស្ថានភាព &amp; ការសម្រេចចិត្ត</h1>
        <p class="hero-subtitle">ការតភ្ជាប់សកម្មភាព និងការសម្រេចចិត្តឆ្លងកាត់មនុស្ស និងដំណាក់កាលផ្សេងៗក្នុង Microsoft Power Apps</p>

        <div class="connection-chain-banner">
          <span class="chain-node active">១. ចាប់ផ្តើម / គន្លឹះ</span>
          <span class="chain-arrow">➔</span>
          <span class="chain-node active">២. ជំហានបន្តបន្ទាប់</span>
          <span class="chain-arrow">➔</span>
          <span class="chain-node active">៣. ស្ថានភាពបច្ចុប្បន្ន</span>
          <span class="chain-arrow">➔</span>
          <span class="chain-node active">៤. ច្រកសម្រេចចិត្ត</span>
          <span class="chain-arrow">➔</span>
          <span class="chain-node active">៥. បញ្ចប់ / រក្សាទុក</span>
        </div>

        <div class="title-footer-meta">
          <div class="meta-item">
            <span class="meta-label">គំរូផ្នត់គំនិតស្នូល៖</span>
            <span class="meta-val">បញ្ហាពិត ➔ ដំណើរការ ➔ ទិន្នន័យ ➔ អេក្រង់ ➔ តក្កវិជ្ជា ➔ សកម្មភាព ➔ កន្លែងផ្ទុក</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">អ្នកសិក្សា៖</span>
            <span class="meta-val">អ្នកចាប់ផ្តើមពីកម្រិតសូន្យ • ការផ្លាស់ប្តូរឌីជីថលក្នុងរោងចក្រ &amp; ការិយាល័យ</span>
          </div>
        </div>
      `
    },
    1: {
      title: "វឌ្ឍនភាពកម្មវិធីសិក្សា & ផែនទីតភ្ជាប់",
      content: `
        <div class="slide-header">
          <span class="section-tag">វឌ្ឍនភាពកម្មវិធីសិក្សា</span>
          <h2>តើយើងកំពុងឈរនៅត្រង់ណាលើដំណើរ ២៧ ថ្ងៃ?</h2>
          <p class="subtitle">កម្មវិធីមួយមិនមែនគ្រាន់តែជាប៊ូតុងរាយប៉ាយទេ វាគឺជាដំណើរដែលមានរចនាសម្ព័ន្ធតភ្ជាប់មនុស្ស និងស្ថានភាព។</p>
        </div>

        <div class="roadmap-grid">
          <div class="roadmap-card past">
            <div class="card-phase">ដំណាក់កាល ១ &amp; ២ • ថ្ងៃ ១–៦</div>
            <div class="card-title">មូលដ្ឋានគ្រឹះ &amp; ច្រកតក្កវិជ្ជា</div>
            <ul class="roadmap-list">
              <li><span class="icon-check">✓</span> ថ្ងៃ ១–២៖ បញ្ហា &amp; ការណែនាំលម្អិត</li>
              <li><span class="icon-check">✓</span> ថ្ងៃ ៣៖ ប្រភេទព័ត៌មាន &amp; ទិន្នន័យ</li>
              <li><span class="icon-check">✓</span> ថ្ងៃ ៤៖ លក្ខខណ្ឌសួរនាំ &amp; True/False</li>
              <li><span class="icon-check">✓</span> ថ្ងៃ ៥–៦៖ ការសម្រេចចិត្ត IF &amp; AND/OR</li>
            </ul>
            <div class="card-footer-tag">បានយល់ដឹងច្បាស់លាស់</div>
          </div>

          <div class="roadmap-card current">
            <div class="card-phase">ដំណាក់កាល ៣ • ថ្ងៃ ៧ &amp; ថ្ងៃ ៨ (ថ្ងៃនេះ!)</div>
            <div class="card-title">ការគិតបែបអាជីវកម្ម &amp; លំហូរការងារ</div>
            <ul class="roadmap-list">
              <li><span class="icon-check">✓</span> ថ្ងៃ ៧៖ បញ្ហាពិតទៅជាឱកាសបង្កើត App</li>
              <li><span class="icon-current">★</span> <strong>ថ្ងៃ ៨៖ ដំណើរការ, លំហូរការងារ &amp; ស្ថានភាព</strong></li>
              <li><span class="icon-future">➔</span> ប្លុកគ្រឹះទាំង ៥ នៃលំហូរការងារ</li>
              <li><span class="icon-future">➔</span> ប្រព័ន្ធស្ថានភាព &amp; ការចាក់សោ UI</li>
            </ul>
            <div class="card-footer-tag current-tag">ការផ្តោតសំខាន់ថ្ងៃនេះ</div>
          </div>

          <div class="roadmap-card future">
            <div class="card-phase">ដំណាក់កាល ៤ • ថ្ងៃ ៩–១២</div>
            <div class="card-title">តារាងទំនាក់ទំនង &amp; អេក្រង់</div>
            <ul class="roadmap-list">
              <li><span class="icon-future">➔</span> ថ្ងៃ ៩៖ ការផ្ទុកទិន្នន័យ &amp; តារាង Dataverse</li>
              <li><span class="icon-future">➔</span> ថ្ងៃ ១០៖ អេក្រង់, Galleries &amp; Forms</li>
              <li><span class="icon-future">➔</span> ថ្ងៃ ១១៖ សារជូនដំណឹងភ្លាមៗ</li>
              <li><span class="icon-future">➔</span> ថ្ងៃ ១២៖ ការធ្វើតេស្តសាកល្បងរួមគ្នា</li>
            </ul>
            <div class="card-footer-tag future-tag">មេរៀនបន្ទាប់</div>
          </div>
        </div>
      `
    },
    2: {
      title: "ការរំលឹកចំណេះដឹងចាស់",
      content: `
        <div class="slide-header">
          <span class="section-tag">ការរំលឹកចំណេះដឹងតាមវដ្ត</span>
          <h2>សំណួររំលឹកចំណេះដឹង៖ តេស្តមូលដ្ឋានចាស់</h2>
          <p class="subtitle">ពិនិត្យមើលឡើងវិញនូវគំនិតពីថ្ងៃទី ៣, ៥, ៦ និង ៧ ដែលជាគ្រឹះទ្រទ្រង់ម៉ាស៊ីនដំណើរការថ្ងៃនេះ។</p>
        </div>

        <div class="retrieval-cards-container">
          <div class="retrieval-card">
            <div class="retrieval-badge">សំណួរទី ១ (ថ្ងៃទី ៧)</div>
            <h3>តើសសរស្តម្ភទាំង ៥ នៃក្របខ័ណ្ឌឱកាសបង្កើត App មានអ្វីខ្លះ?</h3>
            <p class="retrieval-hint">គិតដល់តារាងវិនិច្ឆ័យមុនពេលសរសេរកូដ។</p>
            <div class="retrieval-answer">
              <strong>ចម្លើយ៖</strong> ១) បញ្ហាបច្ចុប្បន្ន, ២) លទ្ធផលចង់បាន, ៣) មនុស្ស (តួនាទី), ៤) ព័ត៌មាន (ទិន្នន័យ), និង ៥) ក្បួនច្បាប់ (ការសម្រេចចិត្ត)។
            </div>
          </div>

          <div class="retrieval-card">
            <div class="retrieval-badge">សំណួរទី ២ (ថ្ងៃទី ៥ &amp; ៦)</div>
            <h3>តើអ្វីជាអ្នកសម្រេចថា App ត្រូវដើរផ្លូវណាពេលដល់ផ្លូវបំបែក?</h3>
            <p class="retrieval-hint">តើ App ជ្រើសរើសផ្លូវ A ឬផ្លូវ B តាមរបៀបណា?</p>
            <div class="retrieval-answer">
              <strong>ចម្លើយ៖</strong> <strong>ច្រកលក្ខខណ្ឌ (Condition Gate)</strong>។ វាសួរនាំទិន្នន័យដើម្បីបង្កើត <code>True</code> ឬ <code>False</code> ហើយអនុគមន៍ <code>If()</code> នឹងជ្រើសរើសសកម្មភាព។
            </div>
          </div>

          <div class="retrieval-card">
            <div class="retrieval-badge">សំណួរទី ៣ (ថ្ងៃទី ៣)</div>
            <h3>ហេតុអ្វីបានជាប្រអប់ "Status" គួរតែជាប្រភេទ Choice មិនមែនវាយអក្សរដោយសេរី?</h3>
            <p class="retrieval-hint">តើមានរឿងអ្វីកើតឡើងបើមនុស្សម្នាក់ៗវាយ "done", "Done", ឬ "finished"?</p>
            <div class="retrieval-answer">
              <strong>ចម្លើយ៖</strong> <strong>Choice</strong> ធានានូវពាក្យត្រឹមត្រូវជាក់លាក់។ ការវាយអក្សរខុសនឹងធ្វើឱ្យក្បួន <code>If(Status = "Closed", ...)</code> ដំណើរការលែងកើត។
            </div>
          </div>
        </div>
      `
    },
    3: {
      title: "គោលបំណងសិក្សាទាំង ៤",
      content: `
        <div class="slide-header">
          <span class="section-tag">ផែនទីគោលបំណង BLOOM'S TAXONOMY</span>
          <h2>គោលបំណងសិក្សាដែលអាចវាស់វែងបានទាំង ៤ សម្រាប់ថ្ងៃនេះ</h2>
          <p class="subtitle">នៅនាទីទី ៩០ អ្នកនឹងអាចបង្ហាញសមត្ថភាពអនុវត្តផ្ទាល់ទាំងបួនយ៉ាងនេះដោយឯករាជ្យ៖</p>
        </div>

        <div class="objectives-grid">
          <div class="obj-card">
            <div class="obj-icon-pill obj-analyze">កម្រិត ៤៖ វិភាគ (Analyze)</div>
            <h3>១. បំបែកលំហូរការងារនៅកន្លែងធ្វើការ</h3>
            <p>បំបែករាល់ការងារដែលរញ៉េរញ៉ៃទៅជាប្លុកគ្រឹះសកលទាំង ៥៖ <strong>Trigger (ចំណុចចាប់ផ្តើម)</strong>, <strong>Steps (សកម្មភាព)</strong>, <strong>Status (ស្ថានភាព)</strong>, <strong>Decision (ការសម្រេចចិត្ត)</strong>, និង <strong>Finish (ការបញ្ចប់)</strong>។</p>
          </div>

          <div class="obj-card">
            <div class="obj-icon-pill obj-apply">កម្រិត ៣៖ អនុវត្ត (Apply)</div>
            <h3>២. រៀបចំស្ថានភាព &amp; ទប់ស្កាត់ការរំលងខុសច្បាប់</h3>
            <p>កំណត់តម្លៃ <strong>Status Values</strong> ដាច់ដោយឡែកពីគ្នា និងរៀបចំគន្លឹះច្បាស់លាស់ដើម្បីប្តូរពីស្ថានភាពមួយទៅមួយទៀតដោយមិនរំលងជំហាន។</p>
          </div>

          <div class="obj-card">
            <div class="obj-icon-pill obj-apply">កម្រិត ៣៖ អនុវត្ត (Apply)</div>
            <h3>៣. ភ្ជាប់ស្ថានភាពទៅនឹងការចាក់សោ UI ក្នុង Power Apps</h3>
            <p>សរសេរកូដ Power Fx កម្រិតដំបូងដើម្បីភ្ជាប់ស្ថានភាពទៅនឹងការគ្រប់គ្រងអេក្រង់ (ឧ. ចាក់សោទម្រង់តាមរយៈ <code>DisplayMode.View</code> និងបង្ហាញប៊ូតុងតាមរយៈ <code>Visible</code>)។</p>
          </div>

          <div class="obj-card">
            <div class="obj-icon-pill obj-create">កម្រិត ៥៖ បង្កើតថ្មី (Synthesize)</div>
            <h3>៤. រៀបចំតារាងដំណើរការជួសជុលពុម្ព Apex ពេញលេញ</h3>
            <p>បង្កើតឯកសារលំហូរការងារ ៥ ដំណាក់កាលពេញលេញសម្រាប់ពុម្ព Die #2 ដោយកំណត់ច្បាស់ថានរណាជាអ្នកធ្វើ អ្វីខ្លះជាទិន្នន័យត្រូវបញ្ចូល និងច្រកសម្រេចចិត្តណាខ្លះត្រូវឆ្លងកាត់។</p>
          </div>
        </div>
      `
    },
    4: {
      title: "មហន្តរាយការងារបាត់មុខ $45,000",
      content: `
        <div class="slide-header">
          <span class="section-tag section-alert">ករណីសិក្សាមហន្តរាយនៅកន្លែងធ្វើការ</span>
          <h2>វិបត្តិ "ប័ណ្ណការងារបាត់ស្រមោល" ខាតបង់ $45,000 នៅរោងចក្រ Apex</h2>
          <p class="subtitle">តើមានរឿងអ្វីកើតឡើង នៅពេលការងារត្រូវបានធ្វើឡើងយ៉ាងសកម្ម ប៉ុន្តែគ្មាននរណាម្នាក់ដឹងពីស្ថានភាព?</p>
        </div>

        <div class="case-study-split">
          <div class="case-box disaster-timeline">
            <div class="case-box-header">
              <span class="timeline-badge">កាលប្បវត្តិទិន្នន័យនៃភាពច្របូកច្របល់</span>
            </div>
            <ul class="timeline-list">
              <li>
                <span class="time-stamp">02:15 រសៀល</span>
                <div class="time-content">
                  <strong>ខ្សែច្រវាក់ទី ៤ ត្រូវបិទ៖</strong> ពុម្ពដែក Die #2 ប្រេះស្រាំ។ កម្មករ សុធា សរសេរលើក្រដាសរួចទុកនៅលើក្តារកៀបនៅតុជួសជុល។
                </div>
              </li>
              <li>
                <span class="time-stamp">02:45 រសៀល</span>
                <div class="time-content">
                  <strong>ជាង ដេវ យកពុម្ពទៅ៖</strong> ជាង ដេវ ដើរកាត់ ឃើញពុម្ពប្រេះក៏លើកយកទៅបន្ទប់ CNC ដើម្បីផ្សារ និងខាត់ភ្លាម។ គាត់មិនបានប្រាប់នរណាឡើយព្រោះគិតថាខ្លួនឯងគ្រាន់តែជួយធ្វើការ។
                </div>
              </li>
              <li>
                <span class="time-stamp">03:30 រសៀល</span>
                <div class="time-content">
                  <strong>ប្រធានវេនយប់មកដល់៖</strong> ម៉ារ៉ា មកដល់ឃើញម៉ាស៊ីនឈប់ ហើយបាត់ពុម្ព Die #2។ គ្មានព័ត៌មានស្ថានភាពលើក្តារឡើយ។ ទូរស័ព្ទ ដេវ ខលមិនចូល។
                </div>
              </li>
              <li>
                <span class="time-stamp">05:00 ល្ងាច</span>
                <div class="time-content disaster-callout">
                  <strong>ការបញ្ជាទិញបន្ទាន់ $45,000៖</strong> ដោយគិតថាពុម្ពបាក់បែកបាត់បង់ ម៉ារ៉ា បានសម្រេចចិត្តបញ្ជាទិញពុម្ពថ្មីពីអាល្លឺម៉ង់ជាបន្ទាន់តាមយន្តហោះ!
                </div>
              </li>
            </ul>
          </div>

          <div class="case-box disaster-summary">
            <div class="cost-stat-card">
              <span class="stat-number">$45,000</span>
              <span class="stat-label">ថ្លៃបញ្ជាទិញពុម្ពថ្មីបន្ទាន់តាមយន្តហោះ</span>
            </div>
            <div class="cost-stat-card secondary">
              <span class="stat-number">24 ម៉ោង</span>
              <span class="stat-label">ការខាតបង់ពេលឈប់ដំណើរការម៉ាស៊ីន ($18,000)</span>
            </div>
            <div class="pain-summary-pill">
              <strong>មូលហេតុពិត៖</strong> ដេវ បានធ្វើការយ៉ាងល្អ ប៉ុន្តែ<em>ប្រព័ន្ធគ្មានការបង្ហាញស្ថានភាព (Status)</em>។ សម្រាប់អ្នកដទៃ ពុម្ពដែកនោះបានរលាយបាត់ដូចផ្សែង!
            </div>
          </div>
        </div>
      `
    },
    5: {
      title: "ការវិភាគឫសគល់បញ្ហា៖ ភាពងងឹតនៃដំណើរការ",
      content: `
        <div class="slide-header">
          <span class="section-tag">ការវិភាគរចនាសម្ព័ន្ធបរាជ័យ</span>
          <h2>ហេតុអ្វីបានជា Apex ខាតបង់ $45,000? "ភាពងងឹតនៃដំណើរការ"</h2>
          <p class="subtitle">នៅពេលដែលការងារមិនត្រូវបានតាមដានតាមរយៈស្ថានភាព (Status) ភាពបរាជ័យធំៗទាំងបីនេះនឹងកើតឡើង៖</p>
        </div>

        <div class="trio-cards">
          <div class="feature-card red-border">
            <div class="card-icon">🕳️</div>
            <h3>១. ឥទ្ធិពលរណ្តៅខ្មៅ (Black Hole)</h3>
            <p>នៅចន្លោះការបញ្ជូនក្រដាស ការងារធ្លាក់ចូលក្នុងភាពងងឹត។ គ្មាននរណាដឹងថានរណាជាអ្នកកាន់ការងារ ជួសជុលបានដល់ណា ឬគ្រឿងបន្លាស់បានមកដល់ឬនៅ។</p>
            <div class="card-quote">"ខ្ញុំស្មានតែមានអ្នកផ្សេងយកទៅធ្វើហើយតើ។"</div>
          </div>

          <div class="feature-card orange-border">
            <div class="card-icon">⚡</div>
            <h3>២. សកម្មភាពជាន់គ្នា និងផ្ទុយគ្នា</h3>
            <p>បើគ្មានស្ថានភាពរួម អ្នកដឹកនាំពីរនាក់ធ្វើការសម្រេចចិត្តផ្ទុយគ្នាក្នុងពេលតែមួយ៖ ម្នាក់កំពុងខំជួសជុលពុម្ពចាស់ ម្នាក់ទៀតកំពុងចំណាយលុយទិញពុម្ពថ្មី!</p>
            <div class="card-quote">"បើខ្ញុំដឹងថា ដេវ កំពុងធ្វើ ខ្ញុំមិនចំណាយ $45,000 នោះទេ។"</div>
          </div>

          <div class="feature-card yellow-border">
            <div class="card-icon">🛑</div>
            <h3>៣. គ្មានការត្រួតពិនិត្យសុវត្ថិភាព</h3>
            <p>ក្រដាសអនុញ្ញាតឱ្យមនុស្សរំលងជំហាន។ ម៉ាស៊ីនអាចត្រូវបានបើកដំណើរការឡើងវិញមុនពេលត្រួតពិនិត្យគុណភាព ដែលបង្កគ្រោះថ្នាក់យ៉ាងធ្ងន់ធ្ងរ។</p>
            <div class="card-quote">"គ្មាននរណាបានចុះហត្ថលេខាលើការវាស់ទំហំពុម្ពនៅឡើយទេ។"</div>
          </div>
        </div>
      `
    },
    6: {
      title: "ការប្រៀបធៀបជាក់ស្តែង៖ ការតាមដានដឹកជញ្ជូនអាហារ",
      content: `
        <div class="slide-header">
          <span class="section-tag">ការប្រៀបធៀបក្នុងជីវិតប្រចាំថ្ងៃ</span>
          <h2>ការតាមដានដឹកជញ្ជូនអាហារ៖ គំរូនៃប្រព័ន្ធស្ថានភាពជាក់ស្តែង</h2>
          <p class="subtitle">អ្នកបានយល់ពីលំហូរការងាររួចទៅហើយ ពីព្រោះអ្នកប្រើប្រាស់វារាល់ថ្ងៃនៅលើទូរស័ព្ទដៃរបស់អ្នក។</p>
        </div>

        <div class="delivery-tracker-container">
          <div class="tracker-steps">
            <div class="tracker-node done">
              <div class="node-circle">1</div>
              <div class="node-text">
                <strong>បានបញ្ជាទិញ</strong>
                <span>ការទូទាត់ប្រាក់បានជោគជ័យ</span>
              </div>
            </div>
            <div class="tracker-line done"></div>

            <div class="tracker-node done">
              <div class="node-circle">2</div>
              <div class="node-text">
                <strong>កំពុងចម្អិន</strong>
                <span>ចុងភៅកំពុងរៀបចំម្ហូប</span>
              </div>
            </div>
            <div class="tracker-line done"></div>

            <div class="tracker-node current">
              <div class="node-circle">3</div>
              <div class="node-text">
                <strong>អ្នកដឹកបានទទួល</strong>
                <span>អ្នកដឹកកំពុងធ្វើដំណើរទៅអ្នក</span>
              </div>
            </div>
            <div class="tracker-line pending"></div>

            <div class="tracker-node pending">
              <div class="node-circle">4</div>
              <div class="node-text">
                <strong>បានប្រគល់ជូន</strong>
                <span>អាហារដល់ដៃអតិថិជន</span>
              </div>
            </div>
          </div>

          <div class="tracker-insights-grid">
            <div class="insight-box">
              <span class="insight-badge">ក្បួន ១៖ ភាពមើលឃើញរួមគ្នា</span>
              <p>អតិថិជន ហាង និងអ្នកដឹក មើលឃើញដំណាក់កាលដូចគ្នា។ គ្មាននរណាម្នាក់ត្រូវខលសួរថា "តើអ្នកកំពុងធ្វើម្ហូបឬនៅ?" ឡើយ។</p>
            </div>
            <div class="insight-box">
              <span class="insight-badge">ក្បួន ២៖ ការចាក់សោសកម្មភាព</span>
              <p>អ្នកអាចចុចបោះបង់ការបញ្ជាទិញពេល <em>បានបញ្ជាទិញ</em> ប៉ុន្តែប៊ូតុងនោះនឹងត្រូវបិទមិនឱ្យចុចពេលស្ថានភាពក្លាយជា <em>អ្នកដឹកបានទទួល</em>!</p>
            </div>
            <div class="insight-box">
              <span class="insight-badge">ក្បួន ៣៖ ការផ្ទេរការងារច្បាស់លាស់</span>
              <p>អ្នកដឹកទទួលបានសារជូនដំណឹងឱ្យទៅយកអាហារ លុះត្រាតែចុងភៅចុចលើប៊ូតុង <em>ម្ហូបរួចរាល់</em>។</p>
            </div>
          </div>
        </div>
      `
    },
    7: {
      title: "និយមន័យលំហូរការងារជាភាសាសាមញ្ញ",
      content: `
        <div class="slide-header">
          <span class="section-tag">ស្ពានចម្លងគំនិត</span>
          <h2>ភាសាសាមញ្ញ៖ អ្វីទៅជា Workflow &amp; Status?</h2>
          <p class="subtitle">ដកចេញនូវពាក្យបច្ចេកទេសស្មុគស្មាញទាំងអស់។ តើ Workflow របស់កម្មវិធីពិតជាធ្វើអ្វីខ្លះ?</p>
        </div>

        <div class="plain-concept-grid">
          <div class="concept-card highlight-card">
            <div class="concept-icon">🔄</div>
            <h3>Workflow គឺជាដំណើររត់ប្រណាំងបន្តវេន</h3>
            <p>Workflow គឺជា<strong>ផ្លូវដើរជាជំហានៗ</strong>ដែលការងារត្រូវធ្វើដំណើរឆ្លងកាត់ ចាប់តាំងពីពេលនរណាម្នាក់ស្នើសុំ រហូតដល់ត្រូវបានដោះស្រាយចប់សព្វគ្រប់។</p>
            <div class="concept-footer">ដូចជាដំបងរត់ប្រណាំងដែលត្រូវហុចពីដៃកីឡាករម្នាក់ទៅម្នាក់ទៀតយ៉ាងរលូន។</div>
          </div>

          <div class="concept-card highlight-card">
            <div class="concept-icon">🏷️</div>
            <h3>Status គឺជាស្លាកសម្គាល់លើដំបងនោះ</h3>
            <p>Status គឺជា<strong>ពាក្យគន្លឹះតែមួយគត់</strong>ដែលប្រាប់មនុស្សគ្រប់គ្នាក្នុងក្រុមហ៊ុនថាការងារកំពុងនៅឯណា នរណាជាអ្នកកាន់ ហើយត្រូវធ្វើអ្វីបន្ត។</p>
            <div class="concept-footer">ឧទាហរណ៍៖ "Submitted", "Under Review", "In Repair", "Closed"។</div>
          </div>

          <div class="concept-card highlight-card">
            <div class="concept-icon">⚖️</div>
            <h3>Decision គឺជាផ្លូវបំបែកលើដងផ្លូវ</h3>
            <p>Decision គឺជាចំណុចដែលក្បួនអាជីវកម្មសួរសំណួរ (<code>If</code>) ទៅលើទិន្នន័យដើម្បីជ្រើសរើសផ្លូវដែលត្រូវបន្តទៅមុខ។</p>
            <div class="concept-footer">ឧទាហរណ៍៖ ប្រសិនបើតម្លៃជួសជុល > $1,000 ត្រូវបញ្ជូនទៅប្រធានរោងចក្រដើម្បីស៊ីញ៉េ។</div>
          </div>
        </div>
      `
    },
    8: {
      title: "ប្លុកគ្រឹះទាំង ៥ នៃលំហូរការងារ",
      content: `
        <div class="slide-header">
          <span class="section-tag">រចនាសម្ព័ន្ធសកល</span>
          <h2>ប្លុកគ្រឹះសកលទាំង ៥ នៃគ្រប់លំហូរការងារ</h2>
          <p class="subtitle">គ្រប់ដំណើរការទាំងអស់នៅក្នុង Microsoft Power Apps ត្រូវបានបង្កើតឡើងពីសមាសធាតុគ្រឹះទាំងប្រាំនេះ៖</p>
        </div>

        <div class="five-blocks-flex">
          <div class="workflow-block block-trigger">
            <div class="block-num">១</div>
            <div class="block-tag">TRIGGER</div>
            <h4>គន្លឹះចាប់ផ្តើម</h4>
            <p>ព្រឹត្តិការណ៍ជាក់ស្តែងដែលបង្កើតកំណត់ត្រាដំបូង។</p>
            <span class="block-example">ឧ. ពុម្ពដែកប្រេះនៅលើខ្សែច្រវាក់ទី ៤</span>
          </div>

          <div class="block-connector">➔</div>

          <div class="workflow-block block-step">
            <div class="block-num">២</div>
            <div class="block-tag">ACTION / STEPS</div>
            <h4>សកម្មភាពមនុស្ស</h4>
            <p>កិច្ចការជាក់ស្តែងដែលតួនាទីនីមួយៗត្រូវធ្វើ។</p>
            <span class="block-example">ឧ. កម្មករបញ្ចូលព័ត៌មានលម្អិត</span>
          </div>

          <div class="block-connector">➔</div>

          <div class="workflow-block block-status">
            <div class="block-num">៣</div>
            <div class="block-tag">STATUS</div>
            <h4>ស្ថានភាពបច្ចុប្បន្ន</h4>
            <p>ស្លាកតែមួយគត់ដែលពណ៌នាពីទិន្នន័យពេលនេះ។</p>
            <span class="block-example">ឧ. Status = "Submitted"</span>
          </div>

          <div class="block-connector">➔</div>

          <div class="workflow-block block-decision">
            <div class="block-num">៤</div>
            <div class="block-tag">DECISION</div>
            <h4>ច្រកសម្រេចចិត្ត</h4>
            <p>សំណួរលក្ខខណ្ឌដែលបំបែកផ្លូវដំណើរការ។</p>
            <span class="block-example">ឧ. តម្លៃជួសជុល &gt; $1,000?</span>
          </div>

          <div class="block-connector">➔</div>

          <div class="workflow-block block-finish">
            <div class="block-num">៥</div>
            <div class="block-tag">FINISH</div>
            <h4>ដំណាក់កាលបញ្ចប់</h4>
            <p>រក្សាទុកជាប្រវត្តិ; ចាក់សោការកែសម្រួលទាំងអស់។</p>
            <span class="block-example">ឧ. Status = "Closed"</span>
          </div>
        </div>

        <div class="workflow-summary-banner">
          <strong>ចំណុចសំខាន់សម្រាប់ Citizen Developer៖</strong> មុននឹងបើក Power Apps Studio ចូរគូរប្លុកទាំង ៥ នេះលើក្រដាសជាមុនសិន។ ប្រសិនបើអ្នកមិនទាន់ស្គាល់ Status ទេ អ្នកមិនអាចសរសេរ App បានឡើយ!
        </div>
      `
    },
    9: {
      title: "ប្រព័ន្ធស្ថានភាព៖ ត្រឹមត្រូវ vs ខុសច្បាប់",
      content: `
        <div class="slide-header">
          <span class="section-tag">សុក្រឹតភាព &amp; របាំងការពារ</span>
          <h2>ប្រព័ន្ធស្ថានភាព (State Machine)៖ ការផ្លាស់ប្តូរត្រឹមត្រូវ vs. ការរំលងខុសច្បាប់</h2>
          <p class="subtitle">App ត្រូវតែអនុវត្តតាមផ្លូវច្បាប់។ ទិន្នន័យមិនអាចលោតផ្លោះរំលងដំណាក់កាលដោយគ្មានការអនុញ្ញាតឡើយ។</p>
        </div>

        <div class="transition-comparison-grid">
          <div class="transition-card valid-card">
            <div class="transition-card-header">
              <span class="badge badge-green">✓ ការផ្លាស់ប្តូរត្រឹមត្រូវតាមក្បួន</span>
            </div>
            <div class="transition-flow">
              <span class="flow-pill">Submitted</span>
              <span class="flow-arrow">➔</span>
              <span class="flow-action">[ប្រធានចុចអនុម័ត]</span>
              <span class="flow-arrow">➔</span>
              <span class="flow-pill">Approved</span>
            </div>
            <ul class="transition-rules">
              <li><strong>គន្លឹះជំរុញ៖</strong> ប្រធានចុចលើប៊ូតុង "Approve"។</li>
              <li><strong>ការផ្ទៀងផ្ទាត់៖</strong> គណនីប្រធានត្រូវបានផ្ទៀងផ្ទាត់សិទ្ធិ។</li>
              <li><strong>លទ្ធផល៖</strong> បើកសិទ្ធិឱ្យប៊ូតុង "Start Repair" សម្រាប់ជាងបច្ចេកទេស។</li>
            </ul>
          </div>

          <div class="transition-card illegal-card">
            <div class="transition-card-header">
              <span class="badge badge-red">❌ ការរំលងខុសច្បាប់ដោយផ្ទាល់</span>
            </div>
            <div class="transition-flow">
              <span class="flow-pill">Submitted</span>
              <span class="flow-arrow flow-danger">⚡ រំលងខុសច្បាប់ ⚡</span>
              <span class="flow-pill">Closed</span>
            </div>
            <ul class="transition-rules">
              <li><strong>គ្រោះថ្នាក់៖</strong> រំលងការពិនិត្យ ថវិកា និងការជួសជុលជាក់ស្តែង!</li>
              <li><strong>ផលវិបាក៖</strong> ម៉ាស៊ីនដំណើរការទាំងខូច បង្កគ្រោះថ្នាក់ភ្លើង ឬរបួសមនុស្ស។</li>
              <li><strong>ដំណោះស្រាយក្នុង App៖</strong> បិទប៊ូតុង "Close" មិនឱ្យចុចពេល Status != "Inspected"។</li>
            </ul>
          </div>
        </div>

        <div class="state-rule-footer">
          <span class="rule-icon">🛡️</span>
          <span><strong>ក្បួននៃប្រព័ន្ធស្ថានភាព៖</strong> កំណត់ត្រាអាចប្តូរទៅស្ថានភាពថ្មីបាន លុះត្រាតែលក្ខខណ្ឌតម្រូវរបស់វាបង្កើតបានជា <code>True</code>!</span>
        </div>
      `
    },
    10: {
      title: "ច្រកសម្រេចចិត្ត & ការបែងចែកផ្លូវ",
      content: `
        <div class="slide-header">
          <span class="section-tag">រចនាសម្ព័ន្ធនៃដ្យាក្រាមលំហូរ (Flowchart Structure)</span>
          <h2>ច្រកសម្រេចចិត្ត៖ ផ្លូវបំបែកសញ្ញាពេជ្រនៅលើដងផ្លូវ</h2>
          <p class="subtitle">ជាចំណុចដែលច្រកតក្កវិជ្ជានៃថ្ងៃទី ៤, ៥ និង ៦ ត្រូវបំបែកផ្លូវការងារទៅតាមលក្ខខណ្ឌអាជីវកម្ម។</p>
        </div>

        <div class="decision-gate-diagram">
          <div class="gate-incoming">
            <span class="node-badge">សំណើដែលបានផ្ញើមកដល់</span>
            <strong>Status = "Submitted"</strong>
            <span>តម្លៃប៉ាន់ស្មានត្រូវបានគណនារួចរាល់</span>
          </div>

          <div class="gate-diamond-container">
            <div class="diamond-box">
              <span class="diamond-label">លក្ខខណ្ឌសួរនាំ</span>
              <strong>តម្លៃ &gt; $1,000?</strong>
            </div>
          </div>

          <div class="gate-branches">
            <div class="branch-card branch-true-card">
              <div class="branch-tag tag-true">ផ្លូវ TRUE (ចំណាយខ្ពស់)</div>
              <h4>ទាមទារការអនុម័តពីប្រធានរោងចក្រ</h4>
              <p>ស្ថានភាពប្តូរទៅជា៖ <code>Pending Plant Mgr</code></p>
              <div class="branch-rule">ត្រូវការការត្រួតពិនិត្យថវិកាបន្ថែមមុនពេលបញ្ចេញលុយ។</div>
            </div>

            <div class="branch-card branch-false-card">
              <div class="branch-tag tag-false">ផ្លូវ FALSE (ចំណាយទូទៅ)</div>
              <h4>ប្រធានវេនអាចអនុម័តបានភ្លាមៗ</h4>
              <p>ស្ថានភាពប្តូរទៅជា៖ <code>Approved</code></p>
              <div class="branch-rule">ការជួសជុលទូទៅត្រូវធ្វើភ្លាមៗដើម្បីជៀសវាងម៉ាស៊ីនឈប់យូរ។</div>
            </div>
          </div>
        </div>
      `
    },
    11: {
      title: "ក្តារពិសោធន៍លំហូរការងារអន្តរកម្ម",
      content: `
        <div class="slide-header">
          <span class="section-tag section-lab">ក្តារពិសោធន៍អន្តរកម្មរបស់គ្រូ</span>
          <h2>ឧបករណ៍រុករកស្ថានភាព៖ បន្ទប់ពិសោធន៍ចាក់សោ UI ផ្ទាល់</h2>
          <p class="subtitle">ចុចលើដំណាក់កាលស្ថានភាពនីមួយៗខាងក្រោម ដើម្បីមើលឃើញពីរបៀបដែល UI ប៊ូតុង និងសិទ្ធិផ្លាស់ប្តូរដោយស្វ័យប្រវត្តិ។</p>
        </div>

        <div class="workbench-container">
          <div class="status-stepper-bar">
            <button class="step-btn active" data-status="Draft">១. សេចក្តីព្រាង (Draft)</button>
            <button class="step-btn" data-status="Submitted">២. បានផ្ញើ (Submitted)</button>
            <button class="step-btn" data-status="Approved">៣. បានអនុម័ត (Approved)</button>
            <button class="step-btn" data-status="InProgress">៤. កំពុងជួសជុល (In Progress)</button>
            <button class="step-btn" data-status="Closed">៥. បានបញ្ចប់ (Closed)</button>
          </div>

          <div class="simulated-app-window">
            <div class="app-header-bar">
              <span class="app-title">កម្មវិធីជួសជុល Apex • សំណើ Die #2</span>
              <span class="app-status-badge badge-draft" id="wb-status-badge">ស្ថានភាព៖ សេចក្តីព្រាង (Draft)</span>
            </div>

            <div class="app-body-content">
              <div class="app-field-row">
                <label>លេខសម្គាល់ម៉ាស៊ីន / ពុម្ពដែក៖</label>
                <input type="text" id="wb-machine-input" value="Injection Molder Line 4 - Die #2" class="fluent-input">
              </div>

              <div class="app-field-row">
                <label>ការពិពណ៌នាពីបញ្ហា៖</label>
                <textarea id="wb-desc-input" class="fluent-input" rows="2">រកឃើញការប្រេះស្រាំលើប្រហោងពុម្ព B អំឡុងពេលដំណើរការផលិត ៥០០ គ្រឿង។</textarea>
              </div>

              <div class="app-field-row">
                <label>តម្លៃជួសជុលប៉ាន់ស្មាន ($)៖</label>
                <input type="number" id="wb-cost-input" value="1450" class="fluent-input">
              </div>

              <div class="app-actions-footer">
                <button id="wb-btn-submit" class="fluent-btn-primary">ផ្ញើសំណើ ➔</button>
                <button id="wb-btn-approve" class="fluent-btn-success" style="display: none;">អនុម័តសំណើ ✓</button>
                <button id="wb-btn-start" class="fluent-btn-accent" style="display: none;">ចាប់ផ្តើមជួសជុល CNC ⚙</button>
                <button id="wb-btn-close" class="fluent-btn-success" style="display: none;">ជាប់តេស្ត &amp; បិទបញ្ចប់ 🔒</button>
              </div>
            </div>

            <div class="powerfx-live-inspector">
              <span class="inspector-label">កូដ POWER FX ចាក់សោ UI៖</span>
              <code id="wb-powerfx-display">frmTicket.DisplayMode = DisplayMode.Edit</code>
            </div>
          </div>
        </div>
      `
    },
    12: {
      title: "ការត្រួតពិនិត្យពាក់កណ្តាលម៉ោង & សម្រាក",
      content: `
        <div class="slide-header">
          <span class="section-tag section-pulse">នាទីទី ៤៥:០០ • ចំណុចត្រួតពិនិត្យពាក់កណ្តាលម៉ោង</span>
          <h2>ការត្រួតពិនិត្យស្មារតី, សម្រួលរាងកាយ &amp; ផឹកទឹក</h2>
          <p class="subtitle">ចំណាយពេល ៦០ វិនាទីដើម្បីបន្ធូរអារម្មណ៍ មុនពេលយើងភ្ជាប់ស្ថានភាពទៅនឹងកូដ Power Fx។</p>
        </div>

        <div class="pulse-grid">
          <div class="pulse-card">
            <div class="pulse-icon">🧘‍♂️</div>
            <h3>សម្រួលរាងកាយ</h3>
            <p>ក្រោកឈរឡើង បង្វិលស្មាថយក្រោយ បន្ធូរសន្លាក់ដៃ និងដកដង្ហើមវែងៗចំនួន ៣ ដង។</p>
          </div>

          <div class="pulse-card">
            <div class="pulse-icon">💧</div>
            <h3>ពិសាទឹកមួយកែវ</h3>
            <p>ខួរក្បាលដំណើរការប្រព័ន្ធស្ថានភាពបានលឿនជាងមុន នៅពេលរាងកាយទទួលបានជាតិទឹកគ្រប់គ្រាន់!</p>
          </div>

          <div class="pulse-card">
            <div class="pulse-icon">💡</div>
            <h3>សំណួរសួរផ្ទាល់មាត់ភ្លាមៗ</h3>
            <p><strong>"ហេតុអ្វីបានជា ដេវ មិនគួរជួសជុលពុម្ពដែកដោយមិនចុចអាប់ដេតក្នុង App?"</strong></p>
            <span class="pulse-answer">ពីព្រោះបើគ្មានការអាប់ដេតស្ថានភាព អ្នកដទៃនឹងគិតថាពុម្ពខូចបាត់បង់ ហើយទៅទិញថ្មីខាតបង់ $45,000!</span>
          </div>
        </div>
      `
    },
    13: {
      title: "ស្ថានភាពនៅក្នុងលក្ខណៈសម្បត្តិ Power Fx",
      content: `
        <div class="slide-header">
          <span class="section-tag">ការតភ្ជាប់កូដ POWER FX</span>
          <h2>របៀបដែលប្រអប់ស្ថានភាព (Status) គ្រប់គ្រងលើអេក្រង់</h2>
          <p class="subtitle">ជំនួសឱ្យការបង្កើតអេក្រង់ ១០ ផ្សេងគ្នា Power Apps ប្រើប្រអប់ Status ដើម្បីកែប្រែអេក្រង់តែមួយឱ្យបត់បែន!</p>
        </div>

        <div class="property-trio-grid">
          <div class="prop-card">
            <div class="prop-badge">១. DisplayMode (ការចាក់សោ)</div>
            <h3>ចាក់សោកំណត់ត្រាចាស់</h3>
            <p>ទប់ស្កាត់ការកែប្រែទិន្នន័យពេលការងារបានបញ្ចប់។</p>
            <div class="code-box">
              <code>frmDetails.DisplayMode =<br>If(Status = "Closed",<br>&nbsp;&nbsp;DisplayMode.View,<br>&nbsp;&nbsp;DisplayMode.Edit)</code>
            </div>
            <span class="prop-expl">បើ Closed ➔ មើលបានតែប៉ុណ្ណោះ; ផ្សេងពីនេះ ➔ កែបាន</span>
          </div>

          <div class="prop-card">
            <div class="prop-badge">២. Visible (សិទ្ធិតាមតួនាទី)</div>
            <h3>បង្ហាញប៊ូតុងតាមពេល</h3>
            <p>បង្ហាញប៊ូតុងតែពេលដែលស្ថានភាពអនុញ្ញាត។</p>
            <div class="code-box">
              <code>btnApprove.Visible =<br>(Status = "Submitted") &amp;&amp;<br>(UserRole = "Supervisor")</code>
            </div>
            <span class="prop-expl">បង្ហាញឡើងលុះត្រាតែលក្ខខណ្ឌទាំងពីរចេញ True!</span>
          </div>

          <div class="prop-card">
            <div class="prop-badge">៣. Fill / Color (ការដាក់ពណ៌)</div>
            <h3>ពណ៌សម្គាល់ភាពបន្ទាន់</h3>
            <p>ផ្តល់ការដឹងភ្លាមៗដល់អ្នកប្រើប្រាស់តាមរយៈពណ៌។</p>
            <div class="code-box">
              <code>lblBadge.Fill =<br>Switch(Status,<br>&nbsp;&nbsp;"Closed", Color.Green,<br>&nbsp;&nbsp;"InProgress", Color.Blue,<br>&nbsp;&nbsp;Color.Orange)</code>
            </div>
            <span class="prop-expl">បៃតងសម្រាប់ Closed, ខៀវសម្រាប់កំពុងធ្វើ, ទឹកក្រូចសម្រាប់ថ្មី</span>
          </div>
        </div>
      `
    },
    14: {
      title: "ការពន្យល់កូដមួយជំហានម្តងៗ",
      content: `
        <div class="slide-header">
          <span class="section-tag">ការវិភាគវេយ្យាករណ៍កូដ</span>
          <h2>រចនាសម្ព័ន្ធនៃកូដ (Code Structure)ចាក់សោតាមស្ថានភាព</h2>
          <p class="subtitle">កុំទន្ទេញចាំមាត់ដោយមិនយល់។ ចូរយល់ពីរបៀបដែលសំណួរដឹកនាំលទ្ធផលរបស់អេក្រង់។</p>
        </div>

        <div class="syntax-breakdown-card">
          <div class="business-statement">
            <span class="statement-label">តម្រូវការអាជីវកម្ម៖</span>
            <p>"នៅពេលការត្រួតពិនិត្យគុណភាពត្រូវបានចុះហត្ថលេខា ហើយសំណើត្រូវបាន Closed ចូរចាក់សោទម្រង់ ដើម្បីកុំឱ្យនរណាម្នាក់កែប្រែម៉ោងម៉ាស៊ីន ឬគ្រឿងបន្លាស់បានទៀត។"</p>
          </div>

          <div class="fx-large-display">
            <span class="fx-target">frmMaintenance.DisplayMode</span>
            <span class="fx-equals">=</span>
            <span class="fx-func">If</span>
            <span class="fx-paren">(</span>
            <span class="fx-arg1" title="សំណួរលក្ខខណ្ឌ">Status = "Closed"</span>
            <span class="fx-comma">,</span>
            <span class="fx-arg2" title="លទ្ធផល True">DisplayMode.View</span>
            <span class="fx-comma">,</span>
            <span class="fx-arg3" title="លទ្ធផល False">DisplayMode.Edit</span>
            <span class="fx-paren">)</span>
          </div>

          <div class="arg-expl-grid">
            <div class="arg-item">
              <span class="arg-tag tag-cond">Status = "Closed"</span>
              <strong>សំណួរលក្ខខណ្ឌ</strong>
              <p>ប្រៀបធៀបអក្សរក្នុងប្រអប់ Status ជាមួយពាក្យ "Closed"។ បង្កើតបានជាលទ្ធផល True ឬ False។</p>
            </div>

            <div class="arg-item">
              <span class="arg-tag tag-true">DisplayMode.View</span>
              <strong>សកម្មភាពពេល True (ចាក់សោ)</strong>
              <p>បើចេញ True វានឹងប្តូរទម្រង់ទៅជាទម្រង់មើលតែប៉ុណ្ណោះ។ ប្រអប់វាយអក្សរក្លាយជាពណ៌ប្រផេះ ហើយមិនអាចចុចកែបានទេ។</p>
            </div>

            <div class="arg-item">
              <span class="arg-tag tag-false">DisplayMode.Edit</span>
              <strong>សកម្មភាពពេល False (កែបាន)</strong>
              <p>បើចេញ False (សំណើនៅជា New, Approved, ឬ In Progress) វារក្សាប្រអប់បញ្ចូលទិន្នន័យឱ្យនៅកែសម្រួលបានធម្មតា។</p>
            </div>
          </div>
        </div>
      `
    },
    15: {
      title: "ប្លង់ដ្យាក្រាមដំណើរការ Apex",
      content: `
        <div class="slide-header">
          <span class="section-tag">ប្លង់ករណីសិក្សាក្នុងរោងចក្រ</span>
          <h2>លំហូរការងារជួសជុលពុម្ពដែកនៅរោងចក្រ Apex</h2>
          <p class="subtitle">ប្លង់ ៥ ដំណាក់កាលពេញលេញដែលជួយដោះស្រាយបញ្ហាប័ណ្ណការងារបាត់មុខ $45,000 ជារៀងរហូត៖</p>
        </div>

        <div class="swimlane-container">
          <div class="lane-col">
            <div class="lane-header">១. ការផ្តួចផ្តើម</div>
            <div class="lane-role">តួនាទី៖ កម្មករម៉ាស៊ីន</div>
            <div class="lane-card">
              <span class="card-status">ស្ថានភាព៖ Submitted</span>
              <p>រាយការណ៍ពីពុម្ពប្រេះ បញ្ចូលលេខម៉ាស៊ីន និងថតរូបភាពខូចខាត។</p>
            </div>
          </div>

          <div class="lane-arrow">➔</div>

          <div class="lane-col">
            <div class="lane-header">២. ពិនិត្យ &amp; អនុម័ត</div>
            <div class="lane-role">តួនាទី៖ ប្រធានវេន</div>
            <div class="lane-card">
              <span class="card-status status-decision">ច្រកសញ្ញាពេជ្រ</span>
              <p>ពិនិត្យតម្លៃប៉ាន់ស្មាន៖ បើ &gt; $1,000 ➔ ប្រធានរោងចក្រ; បើតិចជាង ➔ ប្រធានវេន។</p>
            </div>
          </div>

          <div class="lane-arrow">➔</div>

          <div class="lane-col">
            <div class="lane-header">៣. ការចាត់ចែង</div>
            <div class="lane-role">តួនាទី៖ ប្រធានផ្នែកជួសជុល</div>
            <div class="lane-card">
              <span class="card-status">ស្ថានភាព៖ Assigned</span>
              <p>ចាត់តាំងជាងជំនាញ (ដេវ) និងកំណត់កាលវិភាគម៉ោងជួសជុល។</p>
            </div>
          </div>

          <div class="lane-arrow">➔</div>

          <div class="lane-col">
            <div class="lane-header">៤. ការអនុវត្តជាក់ស្តែង</div>
            <div class="lane-role">តួនាទី៖ ជាងជួសជុល</div>
            <div class="lane-card">
              <span class="card-status">ស្ថានភាព៖ In Progress</span>
              <p>ផ្សារ និងខាត់ពុម្ពលើម៉ាស៊ីន CNC។ កត់ត្រាម៉ោងធ្វើការ និងគ្រឿងបន្លាស់។</p>
            </div>
          </div>

          <div class="lane-arrow">➔</div>

          <div class="lane-col">
            <div class="lane-header">៥. ការត្រួតពិនិត្យគុណភាព</div>
            <div class="lane-role">តួនាទី៖ អ្នកត្រួតពិនិត្យ QC</div>
            <div class="lane-card">
              <span class="card-status status-closed">ស្ថានភាព៖ Closed</span>
              <p>វាស់ទំហំស្តង់ដារ។ បើជាប់ ➔ Closed &amp; យកទៅប្រើលើខ្សែច្រវាក់ទី ៤ វិញ!</p>
            </div>
          </div>
        </div>
      `
    },
    16: {
      title: "ការយល់ច្រឡំជាទូទៅទាំង ៤",
      content: `
        <div class="slide-header">
          <span class="section-tag section-alert">អន្ទាក់ &amp; ការយល់ច្រឡំ</span>
          <h2>ការយល់ច្រឡំជាទូទៅទាំង ៤ អំពីលំហូរការងារ</h2>
          <p class="subtitle">ចៀសវាងកំហុសផ្នត់គំនិតទាំង ៤ នេះ មុនពេលអ្នកចាប់ផ្តើមសរសេរកូដ Power Fx ដំបូងរបស់អ្នក៖</p>
        </div>

        <div class="traps-grid">
          <div class="trap-card">
            <div class="trap-header">
              <span class="trap-badge">អន្ទាក់ទី ១</span>
              <h4>"លំហូរការងារគ្រាន់តែជាគំនូរលើ PowerPoint។"</h4>
            </div>
            <div class="trap-body">
              <p class="wrong-model"><strong>ផ្នត់គំនិតខុស៖</strong> "ខ្ញុំគូសដ្យាក្រាមលើ PowerPoint រួចហើយ ដូច្នេះការងារខ្ញុំចប់ហើយ។"</p>
              <p class="correct-model"><strong>ការពន្យល់កែតម្រូវ៖</strong> រាល់ប្រអប់ក្នុងគំនូររបស់អ្នក ត្រូវតែក្លាយជា <strong>Status Value ក្នុងតារាងទិន្នន័យ</strong> ហើយរាល់ព្រួញត្រូវតែក្លាយជា <strong>ប៊ូតុងដែលមានកូដ Power Fx</strong>!</p>
            </div>
          </div>

          <div class="trap-card">
            <div class="trap-header">
              <span class="trap-badge">អន្ទាក់ទី ២</span>
              <h4>"អ្នកប្រើប្រាស់អាចវាយស្ថានភាពចូលតាមចិត្ត។"</h4>
            </div>
            <div class="trap-body">
              <p class="wrong-model"><strong>ផ្នត់គំនិតខុស៖</strong> ទុកឱ្យមនុស្សវាយ "done", "Finished", ឬ "Fixed" ចូលក្នុងប្រអប់អក្សរ។</p>
              <p class="correct-model"><strong>ការពន្យល់កែតម្រូវ៖</strong> ការវាយសេរីបង្កឱ្យមានអក្ខរាវិរុទ្ធខុស! បើរូបមន្តពិនិត្យរកពាក្យ <code>"Closed"</code> ប៉ុន្តែអ្នកប្រើវាយ <code>"done"</code> នោះលក្ខខណ្ឌនឹងបរាជ័យ ហើយដំណើរការនឹងត្រូវគាំង។</p>
            </div>
          </div>

          <div class="trap-card">
            <div class="trap-header">
              <span class="trap-badge">អន្ទាក់ទី ៣</span>
              <h4>"ការអនុម័តគ្រាន់តែជាការផ្ញើអ៊ីមែលទៅចៅហ្វាយ។"</h4>
            </div>
            <div class="trap-body">
              <p class="wrong-model"><strong>ផ្នត់គំនិតខុស៖</strong> "ខ្ញុំបានផ្ញើអ៊ីមែលទៅមេហើយ ដូច្នេះ App នឹងដឹងថាវាបានអនុម័ត។"</p>
              <p class="correct-model"><strong>ការពន្យល់កែតម្រូវ៖</strong> អ៊ីមែលមិនបានកែប្រែទិន្នន័យក្នុងមូលដ្ឋានទិន្នន័យឡើយ! ការអនុម័តត្រូវតែជា <strong>សកម្មភាពក្នុង App</strong> ដែលកែប្រែ <code>Status = "Approved"</code>។</p>
            </div>
          </div>

          <div class="trap-card">
            <div class="trap-header">
              <span class="trap-badge">អន្ទាក់ទី ៤</span>
              <h4>"លុបសំណើដែលបានបញ្ចប់ចោលដើម្បីកុំឱ្យចង្អៀត។"</h4>
            </div>
            <div class="trap-body">
              <p class="wrong-model"><strong>ផ្នត់គំនិតខុស៖</strong> ពេលការងារចប់ ចូរលុបកំណត់ត្រាចេញពីមូលដ្ឋានទិន្នន័យ។</p>
              <p class="correct-model"><strong>ការពន្យល់កែតម្រូវ៖</strong> សវនកម្មរោងចក្រ និងប្រវត្តិថែទាំទាមទារនូវដានប្រវត្តិពេញលេញ! ត្រូវប្តូរទិន្នន័យទៅជាស្ថានភាពចុងក្រោយ (<code>Closed</code>) រួចចាក់សោវា។</p>
            </div>
          </div>
        </div>
      `
    },
    17: {
      title: "ឧបករណ៍វាយតម្លៃលំហូរការងារ ៦ ស្ថានភាព",
      content: `
        <div class="slide-header">
          <span class="section-tag section-lab">ឧបករណ៍ពិសោធន៍អនុវត្តជាក់ស្តែង</span>
          <h2>ឧបករណ៍វាយតម្លៃ៖ តើជាការផ្លាស់ប្តូរត្រឹមត្រូវ ឬជារំលងខុសច្បាប់?</h2>
          <p class="subtitle">វាយតម្លៃស្ថានភាពជាក់ស្តែងទាំង ៦ នេះតាមក្បួនប្រព័ន្ធស្ថានភាព។ ពិន្ទុ៖ <span id="sim-score-counter">0 / 6</span></p>
        </div>

        <div class="simulator-grid" id="sim-grid">
          <div class="sim-card" data-sim-id="1" data-correct="illegal">
            <div class="sim-card-top">
              <span class="sim-id">ស្ថានភាពទី ១</span>
              <h4>កម្មករចុច "Mark Closed" ភ្លាមៗក្រោយពេលរាយការណ៍ពីបញ្ហា។</h4>
            </div>
            <p class="sim-desc">កម្មករ សុធា រាយការណ៍ពីពុម្ពប្រេះ រួចចុចបិទបញ្ចប់សំណើភ្លាមៗ។</p>
            <div class="sim-btn-row">
              <button class="sim-btn sim-valid" data-choice="valid">ត្រឹមត្រូវតាមក្បួន</button>
              <button class="sim-btn sim-illegal" data-choice="illegal">រំលងខុសច្បាប់ ❌</button>
            </div>
            <div class="sim-feedback"></div>
          </div>

          <div class="sim-card" data-sim-id="2" data-correct="valid">
            <div class="sim-card-top">
              <span class="sim-id">ស្ថានភាពទី ២</span>
              <h4>ប្រធានពិនិត្យសំណើ "Submitted" រួចចុច "Approve"។</h4>
            </div>
            <p class="sim-desc">ប្រធានវេន ម៉ារ៉ា ផ្ទៀងផ្ទាត់រូបថតខូចខាត រួចប្តូរស្ថានភាពទៅជា "Approved"។</p>
            <div class="sim-btn-row">
              <button class="sim-btn sim-valid" data-choice="valid">ត្រឹមត្រូវតាមក្បួន ✓</button>
              <button class="sim-btn sim-illegal" data-choice="illegal">រំលងខុសច្បាប់</button>
            </div>
            <div class="sim-feedback"></div>
          </div>

          <div class="sim-card" data-sim-id="3" data-correct="illegal">
            <div class="sim-card-top">
              <span class="sim-id">ស្ថានភាពទី ៣</span>
              <h4>ជាងចាប់ផ្តើមជួសជុលសំណើដែលមានស្ថានភាព "Rejected"។</h4>
            </div>
            <p class="sim-desc">ជាង ដេវ ចាប់ផ្តើមផ្សារពុម្ព Die #4 ទោះបីជាប្រធានបានបដិសេធថវិកាក៏ដោយ។</p>
            <div class="sim-btn-row">
              <button class="sim-btn sim-valid" data-choice="valid">ត្រឹមត្រូវតាមក្បួន</button>
              <button class="sim-btn sim-illegal" data-choice="illegal">រំលងខុសច្បាប់ ❌</button>
            </div>
            <div class="sim-feedback"></div>
          </div>

          <div class="sim-card" data-sim-id="4" data-correct="valid">
            <div class="sim-card-top">
              <span class="sim-id">ស្ថានភាពទី ៤</span>
              <h4>ជាងជួសជុលរួច ហើយប្តូរស្ថានភាពទៅជា "Under Inspection"។</h4>
            </div>
            <p class="sim-desc">ដេវ បញ្ចប់ការខាត់លើ CNC រួចប្រគល់ពុម្ពទៅឱ្យផ្នែកត្រួតពិនិត្យគុណភាព (QC)។</p>
            <div class="sim-btn-row">
              <button class="sim-btn sim-valid" data-choice="valid">ត្រឹមត្រូវតាមក្បួន ✓</button>
              <button class="sim-btn sim-illegal" data-choice="illegal">រំលងខុសច្បាប់</button>
            </div>
            <div class="sim-feedback"></div>
          </div>

          <div class="sim-card" data-sim-id="5" data-correct="valid">
            <div class="sim-card-top">
              <span class="sim-id">ស្ថានភាពទី ៥</span>
              <h4>QC ឃើញមានកំហុស រួចបញ្ជូនសំណើត្រឡប់ទៅ "In Progress" វិញ។</h4>
            </div>
            <p class="sim-desc">អ្នកត្រួតពិនិត្យ QC ឃើញខ្វះទំហំស្តង់ដារ រួចបញ្ជូនឱ្យជាងយកទៅកែសម្រួលឡើងវិញ។</p>
            <div class="sim-btn-row">
              <button class="sim-btn sim-valid" data-choice="valid">ត្រឹមត្រូវតាមក្បួន ✓</button>
              <button class="sim-btn sim-illegal" data-choice="illegal">រំលងខុសច្បាប់</button>
            </div>
            <div class="sim-feedback"></div>
          </div>

          <div class="sim-card" data-sim-id="6" data-correct="illegal">
            <div class="sim-card-top">
              <span class="sim-id">ស្ថានភាពទី ៦</span>
              <h4>ប្រធានវេនយប់ចុច "Closed" ខណៈពុម្ពនៅរាយប៉ាយមិនទាន់ដំឡើង។</h4>
            </div>
            <p class="sim-desc">ប្រធានបង្ខំប្តូរទៅជា Closed ដើម្បីបំពេញរបាយការណ៍ ខណៈគ្រឿងម៉ាស៊ីនមិនទាន់ផ្គុំរួច។</p>
            <div class="sim-btn-row">
              <button class="sim-btn sim-valid" data-choice="valid">ត្រឹមត្រូវតាមក្បួន</button>
              <button class="sim-btn sim-illegal" data-choice="illegal">រំលងខុសច្បាប់ ❌</button>
            </div>
            <div class="sim-feedback"></div>
          </div>
        </div>
      `
    },
    18: {
      title: "សេចក្តីណែនាំកិច្ចការ Capstone",
      content: `
        <div class="slide-header">
          <span class="section-tag section-capstone">កិច្ចការអនុវត្តជាក់ស្តែង</span>
          <h2>ការអនុវត្តឯករាជ្យ៖ តារាងលំហូរការងារថែទាំ Apex</h2>
          <p class="subtitle">ផ្គុំសមាសធាតុទាំងអស់បញ្ចូលគ្នា៖ កំណត់តួនាទី សកម្មភាព ទិន្នន័យបញ្ចូល និងស្ថានភាពពីចំណុចចាប់ផ្តើមដល់បញ្ចប់។</p>
        </div>

        <div class="capstone-brief-grid">
          <div class="brief-box">
            <h3>សេណារីយ៉ូអាជីវកម្ម</h3>
            <p>ខ្សែច្រវាក់ផលិតកម្មទី ៤ របស់ Apex ផលិតគ្រឿងបន្លាស់រថយន្ត ៥០០ គ្រឿងក្នុងមួយម៉ោង។ នៅពេលពុម្ព Die #2 ប្រេះ ការឈប់ដំណើរការខាតបង់ $750 ក្នុងមួយម៉ោង។ អ្នកត្រូវរៀបចំលំហូរការងារ ៥ ដំណាក់កាល ដើម្បីកុំឱ្យកើតមានប័ណ្ណការងារបាត់មុខ $45,000 ទៀត។</p>
          </div>

          <div class="brief-box">
            <h3>លទ្ធផលដែលត្រូវសម្រេចបាន</h3>
            <ul class="brief-list">
              <li>រៀបចំ <strong>៥ ដំណាក់កាលបន្តបន្ទាប់</strong> ពីចំណុចចាប់ផ្តើមដល់ការរក្សាទុក។</li>
              <li>ចាត់តាំង <strong>តួនាទីដែលមានសិទ្ធិ</strong> សម្រាប់ដំណាក់កាលនីមួយៗ។</li>
              <li>កំណត់តម្លៃ <strong>Status Value</strong> ជាក់លាក់ដែលត្រូវកត់ត្រាទុក។</li>
              <li>កំណត់ <strong>ច្រកសម្រេចចិត្ត (Decision Gate)</strong> សម្រាប់ចំណាយលើសពី $1,000។</li>
              <li>បង្កើតរូបមន្ត <strong>Power Fx Interlock</strong> ដើម្បីចាក់សោសំណើដែលបានបញ្ចប់។</li>
            </ul>
          </div>
        </div>
      `
    },
    19: {
      title: "សំណួរវាយតម្លៃចំណេះដឹងទាំង ៥",
      content: `
        <div class="slide-header">
          <span class="section-tag section-quiz">ការវាយតម្លៃការយល់ដឹង</span>
          <h2>សំណួរវាយតម្លៃចំណេះដឹងទាំង ៥</h2>
          <p class="subtitle">វាស់ស្ទង់ការយល់ដឹងរបស់អ្នកអំពីលំហូរការងារ ប្រព័ន្ធស្ថានភាព និងការចាក់សោ UI ក្នុង Power Fx។</p>
        </div>

        <div class="quiz-wrapper">
          <div class="quiz-status-header">
            <span id="quiz-question-counter">សំណួរទី ១ នៃ ៥</span>
            <span id="quiz-score-display">ពិន្ទុ៖ 0 / 5</span>
          </div>

          <div class="quiz-card" id="quiz-card">
            <h3 id="quiz-question-text" class="quiz-question-title">១. តើមុខងារចម្បងនៃប្រអប់ទិន្នន័យ "Status" (ស្ថានភាព) នៅក្នុងកម្មវិធីអាជីវកម្មគឺជាអ្វី?</h3>
            <div class="quiz-options-grid" id="quiz-options-container">
              <!-- នឹងត្រូវបង្កើតតាម JS -->
            </div>
            <div class="quiz-feedback-box" id="quiz-feedback-box" style="display: none;"></div>
          </div>

          <div class="quiz-nav-row">
            <button id="quiz-prev-btn" class="fluent-btn-secondary" disabled>← ថយក្រោយ</button>
            <button id="quiz-next-btn" class="fluent-btn-primary" disabled>សំណួរបន្ទាប់ →</button>
          </div>
        </div>
      `
    },
    20: {
      title: "តារាងលក្ខណៈបច្ចេកទេស Capstone",
      content: `
        <div class="slide-header">
          <span class="section-tag section-capstone">កិច្ចការអនុវត្តជាក់ស្តែង</span>
          <h2>ដំណើរការថែទាំពុម្ពដែក Apex៖ ប្លង់ ៥ ដំណាក់កាល</h2>
          <p class="subtitle">ពិនិត្យមើលតារាងប្លង់ខាងក្រោម។ បង្កើតដំណោះស្រាយក្នុងចិត្តរបស់អ្នក មុនពេលបើកមើលចម្លើយស្តង់ដារ។</p>
        </div>

        <div class="table-container">
          <table class="capstone-table">
            <thead>
              <tr>
                <th>ដំណាក់កាល</th>
                <th>ឈ្មោះដំណាក់កាល</th>
                <th>តួនាទី (នរណា)</th>
                <th>សកម្មភាព / កិច្ចការ</th>
                <th>តម្លៃស្ថានភាព</th>
                <th>ច្រកសម្រេចចិត្ត / ក្បួន</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>១</strong></td>
                <td>ការផ្តួចផ្តើម</td>
                <td>កម្មករម៉ាស៊ីន</td>
                <td>កត់ត្រាការប្រេះស្រាំ, ថតរូបខូចខាត</td>
                <td><code>"Submitted"</code></td>
                <td>Trigger: ម៉ាស៊ីនឈប់ដំណើរការ</td>
              </tr>
              <tr>
                <td><strong>២</strong></td>
                <td>ពិនិត្យ &amp; អនុម័ត</td>
                <td>ប្រធានវេន</td>
                <td>ប៉ាន់ស្មានតម្លៃជួសជុល &amp; ម៉ោងឈប់</td>
                <td><code>"Approved"</code></td>
                <td>បើ តម្លៃ &gt; $1,000 ➔ ផ្ញើទៅប្រធានរោងចក្រ</td>
              </tr>
              <tr>
                <td><strong>៣</strong></td>
                <td>ការចាត់ចែង</td>
                <td>ប្រធានជាង</td>
                <td>ចាត់តាំងជាងបច្ចេកទេសជំនាញ</td>
                <td><code>"Assigned"</code></td>
                <td>បើកសិទ្ធិលើ Tablet របស់ជាង</td>
              </tr>
              <tr>
                <td><strong>៤</strong></td>
                <td>ការអនុវត្តជាក់ស្តែង</td>
                <td>ជាងជួសជុល</td>
                <td>ផ្សារ, ខាត់លើ CNC, កត់ត្រាម៉ោង</td>
                <td><code>"In Progress"</code></td>
                <td>ប្តូរទៅ <code>"Under Inspection"</code> ពេលរួចរាល់</td>
              </tr>
              <tr>
                <td><strong>៥</strong></td>
                <td>ការត្រួតពិនិត្យ</td>
                <td>អ្នកត្រួតពិនិត្យ QC</td>
                <td>វាស់ទំហំស្តង់ដារ &amp; ចុះហត្ថលេខា</td>
                <td><code>"Closed"</code></td>
                <td>ចាក់សោទម្រង់៖ <code>DisplayMode.View</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },
    21: {
      title: "ចម្លើយគំរូ & រង្វាស់វាយតម្លៃ",
      content: `
        <div class="slide-header">
          <span class="section-tag section-capstone">ចម្លើយគំរូ &amp; ការវាយតម្លៃ</span>
          <h2>ចម្លើយគំរូស្តង់ដារ &amp; រង្វាស់វាយតម្លៃ ៤ កម្រិត</h2>
          <p class="subtitle">ប្រៀបធៀបដំណោះស្រាយរបស់អ្នក ទៅនឹងស្តង់ដារវិស្វកម្ម Microsoft Citizen Developer៖</p>
        </div>

        <div class="solution-reveal-wrapper">
          <button id="btn-reveal-solution" class="fluent-btn-primary btn-reveal">
            👁️ ចុចដើម្បីបង្ហាញចម្លើយគំរូ &amp; តារាងវាយតម្លៃ
          </button>

          <div id="solution-drawer" class="solution-drawer collapsed">
            <div class="rubric-grid">
              <div class="rubric-col mastery">
                <div class="rubric-badge">កម្រិត ៤៖ ស្ទាត់ជំនាញ (100%)</div>
                <h4>រចនាសម្ព័ន្ធឥតខ្ចោះ</h4>
                <p>កំណត់បានគ្រប់ ៥ ដំណាក់កាល; ស្ថានភាពដាច់ដោយឡែកពីគ្នា; ច្រកសញ្ញាពេជ្របំបែកត្រូវតាមលក្ខខណ្ឌ $1,000; សរសេរកូដ <code>DisplayMode.View</code> បានត្រឹមត្រូវឥតខ្ចោះ។</p>
              </div>

              <div class="rubric-col proficient">
                <div class="rubric-badge">កម្រិត ៣៖ កម្រិតល្អ (75–99%)</div>
                <h4>លំហូរអាជីវកម្មរឹងមាំ</h4>
                <p>រៀបចំបាន ៥ ដំណាក់កាល; ស្ថានភាពច្បាស់លាស់; ខ្វះចន្លោះបន្តិចបន្តួចលើការផ្ទៀងផ្ទាត់តួនាទី ឬខុសអក្ខរាវិរុទ្ធកូដ Power Fx បន្តិចបន្តួច។</p>
              </div>

              <div class="rubric-col developing">
                <div class="rubric-badge">កម្រិត ២៖ កំពុងអភិវឌ្ឍ (50–74%)</div>
                <h4>យល់ដឹងមួយផ្នែក</h4>
                <p>ស្គាល់ជំហាននីមួយៗ ប៉ុន្តែទុកស្ថានភាពជាអក្សរវាយសេរី; អនុញ្ញាតឱ្យមានការរំលងខុសច្បាប់ ឬខ្វះដំណាក់កាលត្រួតពិនិត្យគុណភាព (QC)។</p>
              </div>

              <div class="rubric-col novice">
                <div class="rubric-badge">កម្រិត ១៖ ទើបចាប់ផ្តើម (&lt;50%)</div>
                <h4>ខ្វះរចនាសម្ព័ន្ធ</h4>
                <p>មិនអាចបែងចែកភាពខុសគ្នារវាងលំហូរការងារ និងបញ្ជីការងារធម្មតា; បាត់បង់តួនាទី តម្លៃស្ថានភាព និងច្រកសម្រេចចិត្ត។</p>
              </div>
            </div>

            <div class="solution-code-banner">
              <strong>កូដ Power Fx ស្តង់ដារ៖</strong>
              <code>frmMaintenance.DisplayMode = If(Status = "Closed", DisplayMode.View, DisplayMode.Edit)</code>
            </div>
          </div>
        </div>
      `
    },
    22: {
      title: "កិច្ចការផ្ទះប្រចាំថ្ងៃ",
      content: `
        <div class="slide-header">
          <span class="section-tag">ការអនុវត្តបន្ថែមក្រៅថ្នាក់</span>
          <h2>កិច្ចការផ្ទះ ១៥ នាទី៖ ការស្វែងរកលំហូរការងារនៅកន្លែងធ្វើការ</h2>
          <p class="subtitle">ចំណាយពេល ១៥ នាទីយប់នេះ ដើម្បីគូសផែនទីដំណើរការជាក់ស្តែងមួយក្នុងផ្នែករបស់អ្នកលើក្រដាសមួយសន្លឹក៖</p>
        </div>

        <div class="homework-grid">
          <div class="hw-card">
            <div class="hw-step">ជំហានទី ១</div>
            <h4>ជ្រើសរើសដំណើរការជាក់ស្តែង</h4>
            <p>ជ្រើសរើសការងារដដែលៗមួយ៖ ស្នើសុំច្បាប់សម្រាក, ស្នើសុំថែមម៉ោង, ស្នើសុំសម្ភារការពារ (PPE), ឬការជួសជុលឧបករណ៍។</p>
          </div>

          <div class="hw-card">
            <div class="hw-step">ជំហានទី ២</div>
            <h4>កំណត់ស្ថានភាព ៤ ទៅ ៥</h4>
            <p>សរសេរឈ្មោះដំណាក់កាលឱ្យច្បាស់៖ ឧ. <code>Draft ➔ Submitted ➔ Approved ➔ In Progress ➔ Closed</code>។</p>
          </div>

          <div class="hw-card">
            <div class="hw-step">ជំហានទី ៣</div>
            <h4>ស្វែងរកផ្លូវបំបែកសម្រេចចិត្ត</h4>
            <p>តើលក្ខខណ្ឌណាដែលបំបែកផ្លូវ? (ឧ. បើតម្លៃ > $500 ឬច្បាប់លើស ៣ ថ្ងៃ ត្រូវឆ្លងកាត់នាយក)។</p>
          </div>

          <div class="hw-card">
            <div class="hw-step">ជំហានទី ៤</div>
            <h4>កំណត់ក្បួនចាក់សោ</h4>
            <p>តើស្ថានភាពណាដែលត្រូវចាក់សោទម្រង់ទៅជា <code>DisplayMode.View</code> ដើម្បីកុំឱ្យកែប្រែទិន្នន័យចាស់បាន?</p>
          </div>
        </div>
      `
    },
    23: {
      title: "ស្ពានចម្លងទៅកាន់ថ្ងៃទី ៩",
      content: `
        <div class="slide-header">
          <span class="section-tag">ការតភ្ជាប់ទៅកាន់ថ្ងៃស្អែក</span>
          <h2>ស្ពានចម្លងទៅមុខ៖ ពីលំហូរការងារទៅកាន់តារាងទិន្នន័យទំនាក់ទំនង</h2>
          <p class="subtitle">ថ្ងៃនេះយើងបានរៀបចំរចនាសម្ព័ន្ធដំណើរការ; ថ្ងៃស្អែកយើងនឹងបង្កើតតារាងមូលដ្ឋានទិន្នន័យដើម្បីចងចាំវា!</p>
        </div>

        <div class="connection-map-container">
          <div class="conn-card conn-past">
            <span class="conn-tag">ម្សិលមិញ (ថ្ងៃទី ៧)</span>
            <h3>ឱកាសបង្កើត App</h3>
            <p>វិភាគបញ្ហា, លទ្ធផលចង់បាន, មនុស្ស, ទិន្នន័យ និងក្បួនច្បាប់តាមរយៈផ្ទាំង ៥ សសរស្តម្ភ។</p>
          </div>

          <div class="conn-arrow">➔</div>

          <div class="conn-card conn-today">
            <span class="conn-tag">ថ្ងៃនេះ (ថ្ងៃទី ៨)</span>
            <h3>លំហូរការងារ &amp; ស្ថានភាព</h3>
            <p>តភ្ជាប់មនុស្ស, ជំហាន, ស្ថានភាព និងច្រកសម្រេចចិត្តទៅជាប្រព័ន្ធដំណើរការដែលមានគណនេយ្យភាព។</p>
          </div>

          <div class="conn-arrow">➔</div>

          <div class="conn-card conn-future">
            <span class="conn-tag">ថ្ងៃស្អែក (ថ្ងៃទី ៩)</span>
            <h3>តារាងទិន្នន័យទំនាក់ទំនង</h3>
            <p>តើទិន្នន័យនេះត្រូវនៅឯណា? តារាង Dataverse, Foreign Keys, Lookup Columns និងទំនាក់ទំនង 1-to-Many!</p>
          </div>
        </div>

        <div class="session-complete-banner">
          <h3>🎉 បញ្ចប់ថ្ងៃទី ៨ ដោយជោគជ័យ! ឥឡូវនេះអ្នកអាចរៀបចំលំហូរការងារអាជីវកម្មបានហើយ!</h3>
          <p>ចុចគ្រាប់ចុច <strong>Home</strong> ដើម្បីត្រឡប់ទៅដើមវិញ ឬចុច <strong>L</strong> ដើម្បីប្តូរទៅភាសាអង់គ្លេស។</p>
        </div>
      `
    }
  };

  // --------------------------------------------------------------------------
  // 3. CORE INITIALIZATION
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initDeck();
    initTimer();
    initKeyboard();
    initPresenterPointer();
    initOverview();
    initNotes();
    initWorkbench();
    initSimulator();
    initQuiz();
    initSolutionReveal();
    initLanguageSwitcher();
  });

  function initDeck() {
    slides = Array.from(document.querySelectorAll('.slide'));
    totalSlides = slides.length;

    // Cache English originals for non-destructive bilingual swap
    slides.forEach((slide, idx) => {
      const contentEl = slide.querySelector('.slide-content');
      if (contentEl) {
        slideOriginals[idx] = {
          title: slide.getAttribute('data-title') || '',
          content: contentEl.innerHTML
        };
      }
    });

    goToSlide(0);
  }

  // --------------------------------------------------------------------------
  // 4. SLIDE NAVIGATION LOGIC
  // --------------------------------------------------------------------------
  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;

    slides[currentSlideIndex].classList.remove('active');
    currentSlideIndex = index;
    slides[currentSlideIndex].classList.add('active');

    updateHeaderFooter();
    updateNotesContent();
    updateOverviewActiveState();

    // Scroll viewport to top on slide change
    const viewport = document.getElementById('slides-viewport');
    if (viewport) viewport.scrollTop = 0;
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

  function updateHeaderFooter() {
    const activeSlide = slides[currentSlideIndex];
    const title = activeSlide.getAttribute('data-title') || '';
    const segment = activeSlide.getAttribute('data-segment') || 'Part 1: Welcome & Spiral Recall';

    const titleEl = document.getElementById('current-slide-title');
    if (titleEl) {
      if (isKhmerActive && KHMER_SLIDES[currentSlideIndex]) {
        titleEl.textContent = KHMER_SLIDES[currentSlideIndex].title;
      } else {
        titleEl.textContent = title;
      }
    }

    const segEl = document.getElementById('current-segment-name');
    if (segEl) segEl.textContent = segment;

    const curNumEl = document.getElementById('slide-current-num') || document.getElementById('current-slide-num');
    const totalEl = document.getElementById('slide-total-count') || document.getElementById('total-slides-num');
    const counterEl = document.getElementById('slide-counter');
    if (curNumEl) curNumEl.textContent = String(currentSlideIndex + 1);
    if (totalEl) totalEl.textContent = String(totalSlides);
    if (counterEl) {
      counterEl.innerHTML = isKhmerActive 
        ? `ស្លាយទី <span id="slide-current-num">${currentSlideIndex + 1}</span> / <span id="slide-total-count">${totalSlides}</span>`
        : `Slide <span id="slide-current-num">${currentSlideIndex + 1}</span> / <span id="slide-total-count">${totalSlides}</span>`;
    }

    const progressFill = document.getElementById('progress-bar') || document.getElementById('progress-bar-fill') || document.getElementById('progress-fill');
    if (progressFill) {
      const pct = ((currentSlideIndex + 1) / totalSlides) * 100;
      progressFill.style.width = `${pct}%`;
    }

    // Nav button state
    const prevBtn = document.getElementById('btn-prev') || document.getElementById('nav-btn-prev');
    const nextBtn = document.getElementById('btn-next') || document.getElementById('nav-btn-next');
    if (prevBtn) prevBtn.disabled = (currentSlideIndex === 0);
    if (nextBtn) nextBtn.disabled = (currentSlideIndex === totalSlides - 1);
  }

  // --------------------------------------------------------------------------
  // 5. 90-MINUTE AGENDA LIVE TIMER
  // --------------------------------------------------------------------------
  function initTimer() {
    const toggleBtn = document.getElementById('timer-toggle-btn');
    const resetBtn = document.getElementById('timer-reset-btn');

    if (toggleBtn) toggleBtn.addEventListener('click', toggleTimer);
    if (resetBtn) resetBtn.addEventListener('click', resetTimer);

    // Auto-start timer on initial load
    startTimer();
  }

  function startTimer() {
    if (isTimerRunning) return;
    isTimerRunning = true;
    updateTimerPlayIcon();

    timerInterval = setInterval(() => {
      timerSecondsElapsed++;
      renderTimerDisplay();
      checkAgendaSegments();
    }, 1000);
  }

  function pauseTimer() {
    if (!isTimerRunning) return;
    isTimerRunning = false;
    clearInterval(timerInterval);
    updateTimerPlayIcon();
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
    renderTimerDisplay();
    checkAgendaSegments();
  }

  function renderTimerDisplay() {
    const displayEl = document.getElementById('session-timer');
    if (!displayEl) return;

    const mins = Math.floor(timerSecondsElapsed / 60);
    const secs = timerSecondsElapsed % 60;
    displayEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function updateTimerPlayIcon() {
    const icon = document.getElementById('timer-icon');
    if (!icon) return;

    if (isTimerRunning) {
      // Pause Icon
      icon.innerHTML = '<path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>';
    } else {
      // Play Icon
      icon.innerHTML = '<path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>';
    }
  }

  function checkAgendaSegments() {
    const mins = Math.floor(timerSecondsElapsed / 60);
    const segEl = document.getElementById('current-segment-name');
    if (!segEl) return;

    let segmentText = '';
    if (mins < 10) {
      segmentText = 'Part 1: Welcome & Spiral Recall (00–10 min)';
    } else if (mins < 25) {
      segmentText = 'Part 2: Discover — The Why (10–25 min)';
    } else if (mins < 45) {
      segmentText = 'Part 3: Deep Dive Theory (25–45 min)';
    } else if (mins < 60) {
      segmentText = 'Part 4: Demonstrate & Lab (45–60 min)';
    } else if (mins < 75) {
      segmentText = 'Part 5: Guided Practice (60–75 min)';
    } else {
      segmentText = 'Part 6: Assess & Bridge (75–90 min)';
    }

    segEl.textContent = segmentText;
  }

  // --------------------------------------------------------------------------
  // 6. KEYBOARD SHORTCUTS
  // --------------------------------------------------------------------------
  function initKeyboard() {
    document.addEventListener('keydown', (e) => {
      // Don't intercept typing in inputs or textareas
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

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
          toggleNotes();
          break;
        case 'KeyO':
          e.preventDefault();
          toggleOverview();
          break;
        case 'KeyL':
          e.preventDefault();
          toggleLanguage();
          break;
        case 'KeyP':
          e.preventDefault();
          toggleLaserPointer();
          break;
        case 'Escape':
          closeAllDrawers();
          break;
      }
    });

    const prevBtn = document.getElementById('btn-prev') || document.getElementById('nav-btn-prev');
    const nextBtn = document.getElementById('btn-next') || document.getElementById('nav-btn-next');
    if (prevBtn) {
      prevBtn.onclick = prevSlide;
      prevBtn.addEventListener('click', prevSlide);
    }
    if (nextBtn) {
      nextBtn.onclick = nextSlide;
      nextBtn.addEventListener('click', nextSlide);
    }

    const fsBtn = document.getElementById('btn-toggle-fullscreen');
    if (fsBtn) fsBtn.addEventListener('click', toggleFullscreen);
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  // --------------------------------------------------------------------------
  // 7. PRESENTER NOTES & OVERVIEW DRAWERS
  // --------------------------------------------------------------------------
  function initNotes() {
    const toggleBtn = document.getElementById('btn-toggle-notes');
    const closeBtn = document.getElementById('btn-close-notes');

    if (toggleBtn) toggleBtn.addEventListener('click', toggleNotes);
    if (closeBtn) closeBtn.addEventListener('click', closeNotes);
  }

  function toggleNotes() {
    const drawer = document.getElementById('notes-drawer');
    if (!drawer) return;

    isNotesOpen = !isNotesOpen;
    if (isNotesOpen) {
      closeOverview();
      drawer.classList.remove('collapsed');
      updateNotesContent();
    } else {
      drawer.classList.add('collapsed');
    }
  }

  function closeNotes() {
    const drawer = document.getElementById('notes-drawer');
    if (drawer) {
      drawer.classList.add('collapsed');
      isNotesOpen = false;
    }
  }

  function updateNotesContent() {
    const contentEl = document.getElementById('notes-content');
    if (!contentEl) return;

    const activeSlide = slides[currentSlideIndex];
    const notes = activeSlide ? activeSlide.getAttribute('data-notes') : '';
    contentEl.innerHTML = `<p>${notes || 'No trainer script notes recorded for this slide.'}</p>`;
  }

  function initOverview() {
    const toggleBtn = document.getElementById('btn-toggle-overview');
    const closeBtn = document.getElementById('btn-close-overview');
    const grid = document.getElementById('overview-grid');

    if (toggleBtn) toggleBtn.addEventListener('click', toggleOverview);
    if (closeBtn) closeBtn.addEventListener('click', closeOverview);

    if (grid) {
      grid.innerHTML = '';
      slides.forEach((slide, idx) => {
        const title = slide.getAttribute('data-title') || `Slide ${idx + 1}`;
        const card = document.createElement('div');
        card.className = `overview-card ${idx === currentSlideIndex ? 'active' : ''}`;
        card.dataset.index = idx;
        card.innerHTML = `
          <span class="overview-card-num">Slide ${idx + 1}</span>
          <span class="overview-card-title">${title}</span>
        `;
        card.addEventListener('click', () => {
          goToSlide(idx);
          closeOverview();
        });
        grid.appendChild(card);
      });
    }
  }

  function toggleOverview() {
    const drawer = document.getElementById('overview-drawer');
    if (!drawer) return;

    isOverviewOpen = !isOverviewOpen;
    if (isOverviewOpen) {
      closeNotes();
      drawer.classList.remove('collapsed');
      updateOverviewActiveState();
    } else {
      drawer.classList.add('collapsed');
    }
  }

  function closeOverview() {
    const drawer = document.getElementById('overview-drawer');
    if (drawer) {
      drawer.classList.add('collapsed');
      isOverviewOpen = false;
    }
  }

  function updateOverviewActiveState() {
    const cards = document.querySelectorAll('.overview-card');
    cards.forEach((card, idx) => {
      if (idx === currentSlideIndex) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }

  function closeAllDrawers() {
    closeNotes();
    closeOverview();
  }

  // --------------------------------------------------------------------------
  // 8. BILINGUAL TRANSLATION ENGINE (NON-DESTRUCTIVE IN-DOM SWAP)
  // --------------------------------------------------------------------------
  function initLanguageSwitcher() {
    const langBtn = document.getElementById('lang-switch-btn');
    if (langBtn) {
      langBtn.addEventListener('click', toggleLanguage);
    }
  }

  function toggleLanguage() {
    try { localStorage.setItem('powerapps_presentation_lang', !isKhmerActive ? 'km' : 'en'); } catch(e){}
    isKhmerActive = !isKhmerActive;
    const body = document.body;
    const langLabel = document.getElementById('lang-label');

    if (isKhmerActive) {
      body.classList.add('khmer-mode');
      if (langLabel) langLabel.textContent = 'English (អង់គ្លេស)';

      // Swap slide content to Khmer
      slides.forEach((slide, idx) => {
        const contentEl = slide.querySelector('.slide-content');
        if (contentEl && KHMER_SLIDES[idx]) {
          contentEl.innerHTML = KHMER_SLIDES[idx].content;
        }
      });
    } else {
      body.classList.remove('khmer-mode');
      if (langLabel) langLabel.textContent = 'ភាសាខ្មែរ (Khmer)';

      // Restore original English content
      slides.forEach((slide, idx) => {
        const contentEl = slide.querySelector('.slide-content');
        if (contentEl && slideOriginals[idx]) {
          contentEl.innerHTML = slideOriginals[idx].content;
        }
      });
    }

    // Re-bind interactive widget listeners after DOM swap!
    initWorkbench();
    initSimulator();
    initQuiz();
    initSolutionReveal();
    updateHeaderFooter();
  }

  // --------------------------------------------------------------------------
  // 9. SLIDE 12: INTERACTIVE PROCESS STATUS NAVIGATOR (WORKBENCH)
  // --------------------------------------------------------------------------
  function initWorkbench() {
    const stepperBtns = document.querySelectorAll('.status-stepper-bar .step-btn');
    if (!stepperBtns.length) return;

    stepperBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        stepperBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const status = btn.getAttribute('data-status');
        updateWorkbenchState(status);
      });
    });
  }

  function updateWorkbenchState(status) {
    const badgeEl = document.getElementById('wb-status-badge');
    const machineInput = document.getElementById('wb-machine-input');
    const descInput = document.getElementById('wb-desc-input');
    const costInput = document.getElementById('wb-cost-input');

    const btnSubmit = document.getElementById('wb-btn-submit');
    const btnApprove = document.getElementById('wb-btn-approve');
    const btnStart = document.getElementById('wb-btn-start');
    const btnClose = document.getElementById('wb-btn-close');
    const fxDisplay = document.getElementById('wb-powerfx-display');

    if (!badgeEl) return;

    // Reset buttons
    if (btnSubmit) btnSubmit.style.display = 'none';
    if (btnApprove) btnApprove.style.display = 'none';
    if (btnStart) btnStart.style.display = 'none';
    if (btnClose) btnClose.style.display = 'none';

    badgeEl.className = 'app-status-badge';

    switch (status) {
      case 'Draft':
        badgeEl.textContent = isKhmerActive ? 'ស្ថានភាព៖ សេចក្តីព្រាង (Draft)' : 'Status: Draft';
        badgeEl.classList.add('badge-draft');
        setInputsDisabled(false);
        if (btnSubmit) btnSubmit.style.display = 'inline-flex';
        if (fxDisplay) fxDisplay.textContent = 'frmTicket.DisplayMode = DisplayMode.Edit';
        break;

      case 'Submitted':
        badgeEl.textContent = isKhmerActive ? 'ស្ថានភាព៖ បានផ្ញើ (Submitted)' : 'Status: Submitted';
        badgeEl.classList.add('badge-submitted');
        setInputsDisabled(true);
        if (btnApprove) btnApprove.style.display = 'inline-flex';
        if (fxDisplay) fxDisplay.textContent = 'btnApprove.Visible = (Status = "Submitted") && (UserRole = "Supervisor")';
        break;

      case 'Approved':
        badgeEl.textContent = isKhmerActive ? 'ស្ថានភាព៖ បានអនុម័ត (Approved)' : 'Status: Approved';
        badgeEl.classList.add('badge-approved');
        setInputsDisabled(true);
        if (btnStart) btnStart.style.display = 'inline-flex';
        if (fxDisplay) fxDisplay.textContent = 'btnStartWork.Visible = (Status = "Approved") && (AssignedTech = User().Email)';
        break;

      case 'InProgress':
        badgeEl.textContent = isKhmerActive ? 'ស្ថានភាព៖ កំពុងជួសជុល (In Progress)' : 'Status: In Progress';
        badgeEl.classList.add('badge-inprogress');
        setInputsDisabled(true);
        if (btnClose) btnClose.style.display = 'inline-flex';
        if (fxDisplay) fxDisplay.textContent = 'lblStatus.Fill = Color.MediumPurple; btnClose.Visible = (Status = "InProgress")';
        break;

      case 'Closed':
        badgeEl.textContent = isKhmerActive ? 'ស្ថានភាព៖ បានបញ្ចប់ (Closed)' : 'Status: Closed';
        badgeEl.classList.add('badge-closed');
        setInputsDisabled(true);
        if (fxDisplay) fxDisplay.textContent = 'frmTicket.DisplayMode = If(Status = "Closed", DisplayMode.View, DisplayMode.Edit)';
        break;
    }

    // Trigger animated pop on badge and code inspector
    badgeEl.classList.remove('wb-badge-pop');
    void badgeEl.offsetWidth; // Force DOM reflow
    badgeEl.classList.add('wb-badge-pop');

    if (fxDisplay) {
      fxDisplay.classList.remove('wb-code-flash');
      void fxDisplay.offsetWidth; // Force DOM reflow
      fxDisplay.classList.add('wb-code-flash');
    }
  }

  function setInputsDisabled(disabled) {
    const machine = document.getElementById('wb-machine-input');
    const desc = document.getElementById('wb-desc-input');
    const cost = document.getElementById('wb-cost-input');
    if (machine) machine.disabled = disabled;
    if (desc) desc.disabled = disabled;
    if (cost) cost.disabled = disabled;
  }

  // --------------------------------------------------------------------------
  // 10. SLIDE 18: 6-SCENARIO WORKFLOW SIMULATOR
  // --------------------------------------------------------------------------
  function initSimulator() {
    const simGrid = document.getElementById('sim-grid');
    if (!simGrid) return;

    let answeredCount = 0;
    let correctCount = 0;

    const cards = simGrid.querySelectorAll('.sim-card');
    cards.forEach(card => {
      const correctChoice = card.getAttribute('data-correct'); // 'valid' or 'illegal'
      const buttons = card.querySelectorAll('.sim-btn');
      const feedback = card.querySelector('.sim-feedback');

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          buttons.forEach(b => b.disabled = true);
          const userChoice = btn.getAttribute('data-choice');

          if (userChoice === correctChoice) {
            btn.classList.add('btn-correct');
            card.classList.add('card-pop-success');
            correctCount++;
            if (feedback) {
              feedback.className = 'sim-feedback visible correct-text';
              feedback.textContent = isKhmerActive 
                ? 'ត្រឹមត្រូវ! ការវាយតម្លៃរបស់អ្នកត្រូវតាមក្បួនច្បាប់។'
                : 'Correct! Accurate state machine assessment.';
            }
          } else {
            btn.classList.add('btn-wrong');
            if (feedback) {
              feedback.className = 'sim-feedback visible wrong-text';
              feedback.textContent = isKhmerActive 
                ? 'មិនត្រឹមត្រូវទេ។ នេះជាការរំលងខុសច្បាប់ក្នុងលំហូរការងារ។'
                : 'Incorrect. This violates business process integrity.';
            }
          }

          answeredCount++;
          const scoreEl = document.getElementById('sim-score-counter');
          if (scoreEl) scoreEl.textContent = `${correctCount} / 6`;
        });
      });
    });
  }

  // --------------------------------------------------------------------------
  // 11. SLIDE 20: 5-QUESTION EVALUATIVE QUIZ
  // --------------------------------------------------------------------------
  function initQuiz() {
    currentQuizIndex = 0;
    quizScore = 0;
    userQuizAnswers = {};

    renderQuizQuestion(currentQuizIndex);

    const prevBtn = document.getElementById('quiz-prev-btn');
    const nextBtn = document.getElementById('quiz-next-btn');

    if (prevBtn) {
      prevBtn.onclick = () => {
        if (currentQuizIndex > 0) {
          currentQuizIndex--;
          renderQuizQuestion(currentQuizIndex);
        }
      };
    }

    if (nextBtn) {
      nextBtn.onclick = () => {
        if (currentQuizIndex < QUIZ_QUESTIONS.length - 1) {
          currentQuizIndex++;
          renderQuizQuestion(currentQuizIndex);
        }
      };
    }
  }

  function renderQuizQuestion(idx) {
    const qData = QUIZ_QUESTIONS[idx];
    if (!qData) return;

    const counterEl = document.getElementById('quiz-question-counter');
    const scoreEl = document.getElementById('quiz-score-display');
    const qTextEl = document.getElementById('quiz-question-text');
    const optContainer = document.getElementById('quiz-options-container');
    const feedbackBox = document.getElementById('quiz-feedback-box');
    const prevBtn = document.getElementById('quiz-prev-btn');
    const nextBtn = document.getElementById('quiz-next-btn');

    if (counterEl) {
      counterEl.textContent = isKhmerActive 
        ? `សំណួរទី ${idx + 1} នៃ ${QUIZ_QUESTIONS.length}`
        : `Question ${idx + 1} of ${QUIZ_QUESTIONS.length}`;
    }

    if (scoreEl) {
      scoreEl.textContent = isKhmerActive
        ? `ពិន្ទុ៖ ${quizScore} / ${QUIZ_QUESTIONS.length}`
        : `Score: ${quizScore} / ${QUIZ_QUESTIONS.length}`;
    }

    if (qTextEl) {
      qTextEl.textContent = isKhmerActive ? qData.qKh : qData.qEn;
    }

    if (feedbackBox) {
      feedbackBox.style.display = 'none';
      feedbackBox.textContent = '';
    }

    if (optContainer) {
      optContainer.innerHTML = '';
      const options = isKhmerActive ? qData.optionsKh : qData.optionsEn;

      options.forEach((optText, optIdx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.textContent = optText;

        // If previously answered
        if (userQuizAnswers[idx] !== undefined) {
          btn.disabled = true;
          if (optIdx === qData.correctIndex) {
            btn.classList.add('opt-correct');
          } else if (optIdx === userQuizAnswers[idx]) {
            btn.classList.add('opt-wrong');
          }
        }

        btn.addEventListener('click', () => {
          handleQuizSelection(idx, optIdx);
        });

        optContainer.appendChild(btn);
      });
    }

    if (prevBtn) prevBtn.disabled = (idx === 0);
    if (nextBtn) nextBtn.disabled = (idx === QUIZ_QUESTIONS.length - 1 || userQuizAnswers[idx] === undefined);

    // Show feedback if already answered
    if (userQuizAnswers[idx] !== undefined && feedbackBox) {
      feedbackBox.style.display = 'block';
      feedbackBox.textContent = isKhmerActive ? qData.explanationKh : qData.explanationEn;
    }
  }

  function handleQuizSelection(qIdx, selectedOptIdx) {
    if (userQuizAnswers[qIdx] !== undefined) return;

    userQuizAnswers[qIdx] = selectedOptIdx;
    const qData = QUIZ_QUESTIONS[qIdx];
    const isCorrect = (selectedOptIdx === qData.correctIndex);

    if (isCorrect) quizScore++;

    const scoreEl = document.getElementById('quiz-score-display');
    if (scoreEl) {
      scoreEl.textContent = isKhmerActive
        ? `ពិន្ទុ៖ ${quizScore} / ${QUIZ_QUESTIONS.length}`
        : `Score: ${quizScore} / ${QUIZ_QUESTIONS.length}`;
    }

    const optContainer = document.getElementById('quiz-options-container');
    if (optContainer) {
      const buttons = optContainer.querySelectorAll('.quiz-option-btn');
      buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === qData.correctIndex) {
          btn.classList.add('opt-correct');
        } else if (idx === selectedOptIdx) {
          btn.classList.add('opt-wrong');
        }
      });
    }

    const feedbackBox = document.getElementById('quiz-feedback-box');
    if (feedbackBox) {
      feedbackBox.classList.remove('feedback-pop');
      void feedbackBox.offsetWidth; // Force reflow
      feedbackBox.classList.add('feedback-pop');
      feedbackBox.style.display = 'block';
      feedbackBox.textContent = isKhmerActive ? qData.explanationKh : qData.explanationEn;
    }

    const nextBtn = document.getElementById('quiz-next-btn');
    if (nextBtn) nextBtn.disabled = (qIdx === QUIZ_QUESTIONS.length - 1);
  }

  // --------------------------------------------------------------------------
  // 12. SLIDE 22: CAPSTONE SOLUTION REVEAL DRAWER
  // --------------------------------------------------------------------------
  function initSolutionReveal() {
    const revealBtn = document.getElementById('btn-reveal-solution');
    const drawer = document.getElementById('solution-drawer');

    if (!revealBtn || !drawer) return;

    revealBtn.onclick = () => {
      drawer.classList.toggle('collapsed');
      const isCollapsed = drawer.classList.contains('collapsed');

      if (isKhmerActive) {
        revealBtn.textContent = isCollapsed 
          ? '👁️ ចុចដើម្បីបង្ហាញចម្លើយគំរូ & តារាងវាយតម្លៃ'
          : '🙈 ចុចដើម្បីបិទបាំងចម្លើយគំរូវិញ';
      } else {
        revealBtn.textContent = isCollapsed 
          ? '👁️ Click to Reveal Master Solution & Rubric'
          : '🙈 Click to Hide Master Solution & Rubric';
      }
    };
  }

  // --------------------------------------------------------------------------
  // PRESENTER FOCUS LASER POINTER & CLICK RIPPLE ENGINE
  // --------------------------------------------------------------------------
  let isLaserActive = true;
  let pointerEl = null;
  let rippleEl = null;
  let targetX = -100;
  let targetY = -100;
  let currentX = -100;
  let currentY = -100;
  let isPointerMoving = false;

  function initPresenterPointer() {
    pointerEl = document.getElementById('presenter-pointer');
    rippleEl = document.getElementById('pointer-click-ripple');
    const laserBtn = document.getElementById('btn-toggle-laser');

    if (laserBtn) {
      laserBtn.addEventListener('click', toggleLaserPointer);
      if (isLaserActive) laserBtn.classList.add('active');
    }

    if (isLaserActive) {
      document.body.classList.add('laser-mode');
    }

    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isPointerMoving && isLaserActive) {
        isPointerMoving = true;
        requestAnimationFrame(renderPointerLoop);
      }
    }, { passive: true });

    window.addEventListener('click', (e) => {
      if (!isLaserActive || !rippleEl) return;
      rippleEl.style.left = `${e.clientX}px`;
      rippleEl.style.top = `${e.clientY}px`;
      rippleEl.classList.remove('rippling');
      void rippleEl.offsetWidth;
      rippleEl.classList.add('rippling');
    });
  }

  function renderPointerLoop() {
    if (!pointerEl || !isLaserActive) {
      isPointerMoving = false;
      return;
    }

    currentX += (targetX - currentX) * 0.45;
    currentY += (targetY - currentY) * 0.45;

    pointerEl.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

    if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
      requestAnimationFrame(renderPointerLoop);
    } else {
      isPointerMoving = false;
    }
  }

  function toggleLaserPointer() {
    isLaserActive = !isLaserActive;
    const laserBtn = document.getElementById('btn-toggle-laser');

    if (isLaserActive) {
      document.body.classList.add('laser-mode');
      if (laserBtn) laserBtn.classList.add('active');
      requestAnimationFrame(renderPointerLoop);
    } else {
      document.body.classList.remove('laser-mode');
      if (laserBtn) laserBtn.classList.remove('active');
    }
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
  window.toggleLaser = toggleLaserPointer;

})();



    window.addEventListener('mousemove', (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    }, { passive: true });


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
