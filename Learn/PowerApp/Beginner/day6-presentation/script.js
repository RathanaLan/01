/**
 * ============================================================================
 * POWER APPS FOUNDATION: DAY 6 PRESENTATION ENGINE
 * Topic: Combining Conditions: AND / OR / NOT
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
      qEn: "1. What is the fundamental difference between && (AND) and || (OR) in Power Apps?",
      qKh: "១. តើអ្វីជាភាពខុសគ្នាសំខាន់បំផុតរវាង && (AND) និង || (OR) នៅក្នុង Power Apps?",
      optionsEn: [
        "A) && requires all conditions to be True; || requires at least one condition to be True.",
        "B) && is only used for numbers; || is only used for text strings.",
        "C) && executes faster than || in all formulas.",
        "D) There is no difference; they are interchangeable aliases."
      ],
      optionsKh: [
        "A) && ទាមទារឱ្យលក្ខខណ្ឌទាំងអស់ត្រូវតែពិត (True); ចំណែក || ទាមទារឱ្យមានយ៉ាងហោចណាស់លក្ខខណ្ឌមួយពិត។",
        "B) && ប្រើសម្រាប់តែលេខ; ចំណែក || ប្រើសម្រាប់តែអត្ថបទ។",
        "C) && ដំណើរការលឿនជាង || នៅក្នុងរូបមន្តទាំងអស់។",
        "D) គ្មានភាពខុសគ្នាទេ ពួកវាជាសញ្ញាជំនួសគ្នាបាន។"
      ],
      correctIndex: 0,
      explanationEn: "Correct! The AND gate (&&) enforces strict conjunction (Two-Key Vault), while the OR gate (||) provides permissive safety triggering (Multi-Sensor Alarm).",
      explanationKh: "ត្រឹមត្រូវណាស់! ច្រក AND (&&) ទាមទារភាពត្រឹមត្រូវដាច់ខាតទាំងអស់ (សោរពីរបើកទូដែក) ចំណែកច្រក OR (||) ដំណើរការនៅពេលមានយ៉ាងហោចណាស់លក្ខខណ្ឌមួយពិត (សំឡេងរោទិ៍ឧបសគ្គ)។"
    },
    {
      qEn: "2. Why does the expression `Value(txtHours.Text) > 4 && chkHazard.Value` evaluate to FALSE when hours is 6.5 and hazard is unchecked?",
      qKh: "២. ហេតុអ្វីបានជាកន្សោម `Value(txtHours.Text) > 4 && chkHazard.Value` វាយតម្លៃស្មើ FALSE នៅពេល hours គឺ 6.5 ប៉ុន្តែប្រអប់ hazard មិនត្រូវបានធីក?",
      optionsEn: [
        "A) Because 6.5 is not greater than 4.",
        "B) Because && requires BOTH conditions to be True; since chkHazard.Value is False, the entire AND gate outputs False.",
        "C) Because text cannot be compared with numbers in Power Apps.",
        "D) Because unchecked checkboxes always cause runtime formula errors."
      ],
      optionsKh: [
        "A) ពីព្រោះ 6.5 មិនធំជាង 4 ឡើយ។",
        "B) ពីព្រោះ && ទាមទារឱ្យលក្ខខណ្ឌទាំងពីរត្រូវតែពិត; ដោយសារ chkHazard.Value មិនពិត (False) ធ្វើឱ្យច្រក AND ទាំងមូលចេញលទ្ធផល False។",
        "C) ពីព្រោះអត្ថបទមិនអាចប្រៀបធៀបជាមួយលេខក្នុង Power Apps បានទេ។",
        "D) ពីព្រោះប្រអប់ធីកដែលមិនបានធីកតែងតែបង្កកំហុសរូបមន្ត។"
      ],
      correctIndex: 1,
      explanationEn: "Correct! In an AND gate, a single False verdict immediately pulls down the entire compound expression to False.",
      explanationKh: "ត្រឹមត្រូវណាស់! នៅក្នុងច្រក AND ប្រសិនបើមានលក្ខខណ្ឌមិនពិត (False) តែមួយ វានឹងទាញលទ្ធផលនៃកន្សោមទាំងមូលឱ្យទៅជា False ភ្លាមៗ។"
    },
    {
      qEn: "3. What happens if you write `If(Status = 'Draft' || Status = 'Review' && IsUrgent, ActionA, ActionB)` without parentheses?",
      qKh: "៣. តើមានអ្វីកើតឡើងប្រសិនបើអ្នកសរសេរ `If(Status = 'Draft' || Status = 'Review' && IsUrgent, ActionA, ActionB)` ដោយគ្មានវង់ក្រចក?",
      optionsEn: [
        "A) Power Apps throws a red syntax compilation error.",
        "B) Power Apps evaluates && before ||; any 'Draft' will execute ActionA regardless of whether it is urgent or not!",
        "C) Power Apps evaluates || before && from right to left.",
        "D) The formula alternates randomly between ActionA and ActionB."
      ],
      optionsKh: [
        "A) Power Apps បង្ហាញកំហុសវាក្យសម្ព័ន្ធក្រហមភ្លាមៗ។",
        "B) Power Apps វាយតម្លៃ && មុន ||; ដូច្នេះរាល់ឯកសារ 'Draft' នឹងដំណើរការ ActionA ជានិច្ច ទោះបីជាវាបន្ទាន់ (Urgent) ឬមិនបន្ទាន់ក៏ដោយ!",
        "C) Power Apps វាយតម្លៃ || មុន && ពីស្តាំទៅឆ្វេង។",
        "D) រូបមន្តនឹងជ្រើសរើសឆ្លាស់គ្នារវាង ActionA និង ActionB ដោយចៃដន្យ។"
      ],
      correctIndex: 1,
      explanationEn: "Correct! Because AND (&&) has higher precedence than OR (||), it binds as `Status = 'Draft' || (Status = 'Review' && IsUrgent)`. Always use parentheses `(A || B) && C`!",
      explanationKh: "ត្រឹមត្រូវណាស់! ដោយសារ && មានអាទិភាពខ្ពស់ជាង || វានឹងចងភ្ជាប់ជា `Status = 'Draft' || (Status = 'Review' && IsUrgent)`។ ត្រូវប្រើវង់ក្រចក `(A || B) && C` ជានិច្ច!"
    },
    {
      qEn: "4. What happens if `txtDowntime.Text` is completely empty, and the formula evaluates `!IsBlank(txtDowntime.Text) && Value(txtDowntime.Text) > 4`?",
      qKh: "៤. តើមានអ្វីកើតឡើងប្រសិនបើ `txtDowntime.Text` នៅទទេស្អាត ហើយរូបមន្តវាយតម្លៃ `!IsBlank(txtDowntime.Text) && Value(txtDowntime.Text) > 4`?",
      optionsEn: [
        "A) The app crashes because Value() fails on an empty string.",
        "B) Short-circuit evaluation stops at !IsBlank() (False) and never evaluates Value(), cleanly preventing runtime errors.",
        "C) The app fills the box with the number 0 automatically.",
        "D) Power Apps skips the rest of the application screens."
      ],
      optionsKh: [
        "A) កម្មវិធីនឹងគាំង ដោយសារតែ Value() មិនអាចបំប្លែងអត្ថបទទទេបាន។",
        "B) ការកាត់ផ្តាច់វាយតម្លៃរហ័ស (Short-circuit evaluation) ឈប់ត្រឹម !IsBlank() (False) ហើយមិនដំណើរការ Value() ឡើយ ដែលការពារកំហុសបានយ៉ាងល្អឥតខ្ចោះ។",
        "C) កម្មវិធីនឹងបំពេញលេខ 0 ចូលក្នុងប្រអប់នោះដោយស្វ័យប្រវត្តិ។",
        "D) Power Apps នឹងរំលងផ្ទាំងអេក្រង់ដែលនៅសល់ទាំងអស់។"
      ],
      correctIndex: 1,
      explanationEn: "Correct! Short-circuit evaluation stops immediately when the first condition of an && gate is False, shielding subsequent expressions from executing.",
      explanationKh: "ត្រឹមត្រូវណាស់! ការវាយតម្លៃរហ័ស (Short-circuit) នឹងឈប់ភ្លាមៗនៅពេលលក្ខខណ្ឌដំបូងនៃច្រក && គឺ False ដែលជាខែលការពារកុំឱ្យកន្សោមបន្ទាប់ដំណើរការ។"
    },
    {
      qEn: "5. What is the clean, professional Power Fx idiom to check if a checkbox called `chkSafetyPassed` is NOT checked?",
      qKh: "៥. តើអ្វីជារបៀបសរសេរ Power Fx ដ៏ស្អាតនិងមានវិជ្ជាជីវៈ ដើម្បីពិនិត្យមើលថាតើប្រអប់ធីក `chkSafetyPassed` មិនត្រូវបានធីក?",
      optionsEn: [
        "A) `chkSafetyPassed.Value == false == 0`",
        "B) `!chkSafetyPassed.Value`",
        "C) `If(chkSafetyPassed.Value = false, false, true)`",
        "D) `Not(chkSafetyPassed.Text = 'Unchecked')`"
      ],
      optionsKh: [
        "A) `chkSafetyPassed.Value == false == 0`",
        "B) `!chkSafetyPassed.Value`",
        "C) `If(chkSafetyPassed.Value = false, false, true)`",
        "D) `Not(chkSafetyPassed.Text = 'Unchecked')`"
      ],
      correctIndex: 1,
      explanationEn: "Correct! Checkboxes natively output Boolean values. Using the negation operator `!chkSafetyPassed.Value` is clean, concise, and professional.",
      explanationKh: "ត្រឹមត្រូវណាស់! ប្រអប់ធីកបញ្ចេញតម្លៃ Boolean រួចជាស្រេច។ ការប្រើសញ្ញាបដិសេធ `!chkSafetyPassed.Value` គឺខ្លី ស្អាត និងប្រកបដោយវិជ្ជាជីវៈបំផុត។"
    }
  ];

  // --------------------------------------------------------------------------
  // 2. FULL BILINGUAL DICTIONARY (EXACT 1-TO-1 HTML STRUCTURE)
  // --------------------------------------------------------------------------
  const KHMER_SLIDES = {
    'slide-1': {
      title: 'ការរួមបញ្ចូលលក្ខខណ្ឌ៖ AND / OR / NOT',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & រំលឹកចំណេះដឹង (០០:០០ - ១០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"សូមស្វាគមន៍មកកាន់ថ្ងៃទី ៦ នៃវគ្គសិក្សា Microsoft Power Apps Foundation!
ម្សិលមិញនៅថ្ងៃទី ៥ កម្មវិធីរបស់យើងបានរៀនធ្វើការសម្រេចចិត្តលើលក្ខខណ្ឌតែមួយដោយប្រើ If()។
បើពិត ➔ ជ្រើសរើសផ្លូវ A; បើមិនពិត ➔ ជ្រើសរើសផ្លូវ B។
ដូចជាគន្លឹះផ្លូវដែកដែលប្តូររវាងផ្លូវពីរយ៉ាងដូច្នោះដែរ!
ប៉ុន្តែនៅក្នុងការងារជាក់ស្តែង៖
ការសម្រេចចិត្តក្នុងអាជីវកម្មកម្រពឹងផ្អែកលើសំណួរតែមួយណាស់!
ឡចំហាយមិនមែនត្រូវការតែសម្ពាធសុវត្ថិភាពទេ វាត្រូវការសម្ពាធសុវត្ថិភាពផង និងកម្រិតទឹកត្រជាក់ផង (AND)!
ស៊ីរ៉ែនអាសន្ននឹងបន្លឺឡើងបើមានផ្សែងពុល ឬមានឧស្ម័នឆេះ (OR)!
ថ្ងៃនេះ យើងរៀនមេគុណតក្កវិជ្ជាទាំង ៣៖ AND (&&), OR (||), និង NOT (!)。"`,
      html: `
        <div class="hero-layout">
          <div class="hero-pill-group">
            <span class="hero-pill">ដំណាក់កាលទី ២៖ តក្កវិជ្ជា & សេចក្តីសម្រេច</span>
            <span class="hero-pill teal-pill">ថ្ងៃទី ៦ នៃ ២៧</span>
            <span class="hero-pill blue-pill">៩០ នាទី</span>
          </div>
          <h1 class="hero-title">
            <span class="gradient-text">ការរួមបញ្ចូលលក្ខខណ្ឌ៖ AND / OR / NOT</span><br>
            របៀបដែលកម្មវិធីបង្កើតវិធានការអាជីវកម្មពហុលក្ខខណ្ឌជាក់ស្តែង
          </h1>
          <p class="hero-subtitle">
            ម្សិលមិញ <code>If()</code> បានផ្តល់សមត្ថភាពឱ្យកម្មវិធីជ្រើសរើសផ្លូវដោយផ្អែកលើសំណួរតែមួយ។ ថ្ងៃនេះ យើងស្វែងយល់ថាការសម្រេចចិត្តអាជីវកម្មពិតប្រាកដទាមទារច្រកទ្វាររួម៖ ការច្របាច់បញ្ចូលសំណួរ True/False ជាច្រើនឱ្យទៅជាការវិនិច្ឆ័យតែមួយគត់។
          </p>

          <div class="title-feature-grid">
            <div class="feature-item">
              <span class="feature-icon">&#128272;</span>
              <div class="feature-info">
                <h4>១. ច្រកទ្វារ AND (&&)</h4>
                <p>ការរួមភ្ជាប់តឹងរ៉ឹងបំផុត៖ ទាមទារឱ្យ<strong>គ្រប់លក្ខខណ្ឌទាំងអស់</strong>ត្រូវតែពិត (សោរពីរបើកទូដែក)។</p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">&#128680;</span>
              <div class="feature-info">
                <h4>២. ច្រកទ្វារ OR (||)</h4>
                <p>ការការពារសុវត្ថិភាព៖ ដំណើរការប្រសិនបើមាន<strong>យ៉ាងហោចណាស់លក្ខខណ្ឌមួយ</strong>ពិត (សំឡេងរោទិ៍ឧបសគ្គ)។</p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">&#128260;</span>
              <div class="feature-info">
                <h4>៣. ច្រកបញ្ច្រាស NOT (!)</h4>
                <p>បញ្ច្រាសការពិត៖ បង្វែរ True ទៅជា False និងបង្វែរ False ទៅជា True (ឧ. <code>!IsBlank()</code>)។</p>
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
រាល់ថ្ងៃទាំងអស់ត្រូវបានតភ្ជាប់គ្នាដោយផ្ទាល់។
នៅថ្ងៃទី ៣ យើងមានទិន្នន័យ (Data)។
នៅថ្ងៃទី ៤ យើងបានចោទសួរលក្ខខណ្ឌ (Conditions) លើទិន្នន័យនោះ។
នៅថ្ងៃទី ៥ យើងបានបញ្ជូនចម្លើយ True/False នោះទៅកាន់ការសម្រេចចិត្ត If() តែមួយ។
ថ្ងៃនេះនៅថ្ងៃទី ៦ យើងបញ្ចប់ដំណាក់កាល Logic ដោយការរួមបញ្ចូលលក្ខខណ្ឌជាច្រើនជាមួយ AND, OR, និង NOT!
សូមចាំថា៖ AND និង OR មិនមែនមកជំនួស If() ទេ!
ពួកវាជាអ្នកច្របាច់បញ្ចូលសំណួរជាច្រើនឱ្យទៅជាចម្លើយ True ឬ False តែមួយគត់ដែល If() ត្រូវការ!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge purple-badge">ស្ថាបត្យកម្មកម្មវិធីសិក្សា</span>
          <h2 class="slide-title">តួនាទីនៃថ្ងៃនេះនៅក្នុងគំរូផ្នត់គំនិត ២៧ ថ្ងៃ</h2>
          <p class="slide-lead">យើងមិនដែលបង្រៀនមុខងារដាច់ដោយឡែកឡើយ។ ថ្ងៃនេះបញ្ចប់ដំណាក់កាលទី ២ តក្កវិជ្ជា ដោយអនុញ្ញាតឱ្យបង្កើតវិធានការអាជីវកម្មពហុលក្ខខណ្ឌ។</p>
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
            <span class="step-num">ថ្ងៃ ៥</span>
            <span class="step-name">IF ទោល</span>
            <span class="step-status">&#10003; ផ្លូវបំបែក</span>
          </div>
          <span class="chain-arrow">&#8594;</span>
          <div class="chain-step step-active-day5">
            <span class="step-num">ថ្ងៃនេះ (ថ្ងៃ ៦)</span>
            <span class="step-name">AND / OR / NOT</span>
            <span class="step-status">&#9733; ច្រកទ្វាររួម</span>
          </div>
          <span class="chain-arrow">&#8594;</span>
          <div class="chain-step step-future">
            <span class="step-num">ថ្ងៃ ៧-២៧</span>
            <span class="step-name">ដំណើរការ ➔ UI ➔ រក្សាទុក</span>
            <span class="step-status">ខាងមុខ</span>
          </div>
        </div>

        <div class="grid-2-col" style="margin-top: 1.25rem;">
          <div class="info-card border-blue">
            <div class="card-header-icon">&#128260; របៀបដែលថ្ងៃ ៥ ភ្ជាប់មកថ្ងៃ ៦</div>
            <p>កាលពីម្សិលមិញ <code>If()</code> បានរៀនស្តាប់ការវិនិច្ឆ័យ True ឬ False តែមួយ។ ថ្ងៃនេះ <code>AND</code> និង <code>OR</code> រួមបញ្ចូលសំណួរជាច្រើនឱ្យទៅជាទម្រង់ True/False តែមួយដដែល ដែលអនុញ្ញាតឱ្យ <code>If()</code> ធ្វើការសម្រេចចិត្តដ៏ឆ្លាតវៃលើកត្តាជាច្រើន។</p>
          </div>
          <div class="info-card border-purple">
            <div class="card-header-icon">&#128301; ហេតុអ្វីបានជាថ្ងៃ ៧ ត្រូវការថ្ងៃ ៦</div>
            <p>ថ្ងៃស្អែកនៅថ្ងៃទី ៧ យើងនឹងរចនាដំណើរការអាជីវកម្មទាំងមូល និងគំនូសព្រាងផ្ទាំងកម្មវិធី។ លំហូរការងារអាជីវកម្មពិតប្រាកដទាមទារការផ្ទៀងផ្ទាត់ពហុលក្ខខណ្ឌ (ឧ. កាតសម្គាល់ត្រឹមត្រូវ ហើយថវិកាត្រូវបានអនុម័ត) មុនពេលបន្តកិច្ចការ។</p>
          </div>
        </div>
      `
    },

    'slide-3': {
      title: 'ការរំលឹកចំណេះដឹងជាមូលដ្ឋាន',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & រំលឹកចំណេះដឹង (០០:០០ - ១០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"សូមកម្តៅការចងចាំសកម្មរបស់យើងជាមួយសំណួររំលឹកចំនួន ៣ ពីថ្ងៃទី ៤ និងទី ៥!
សំណួរទី ១៖ នៅក្នុង Power Fx If(Condition, ActionA, ActionB) តើសញ្ញាក្បៀសទាំងពីរមានន័យដូចម្តេច?
(ចម្លើយ៖ ក្បៀសទីមួយ = THEN; ក្បៀសទីពីរ = ELSE!)
សំណួរទី ២៖ តើលក្ខខណ្ឌអាចបង្កើតចម្លើយអ្វីបានខ្លះ?
(ចម្លើយ៖ គឺមានតែ TRUE ឬ FALSE តែប៉ុណ្ណោះ!)
សំណួរទី ៣៖ ប្រសិនបើ txtPSI.Text មានផ្ទុក '250' តើត្រូវប្រើអនុគមន៍អ្វីមុនពេលប្រៀបធៀបជាមួយ 200?
(ចម្លើយ៖ Value(txtPSI.Text) ដើម្បីបំប្លែងអត្ថបទទៅជាលេខ!)"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge blue-badge">ការរំលឹកចំណេះដឹងសកម្ម</span>
          <h2 class="slide-title">ការផ្ទៀងផ្ទាត់ចំណេះដឹងមុន៖ ការរំលឹកតក្កវិជ្ជាថ្ងៃ ៤ &amp; ៥</h2>
          <p class="slide-lead">រំលឹកគោលគំនិតគ្រឹះនៃលក្ខខណ្ឌ និងការសម្រេចចិត្ត IF មុនពេលយើងរួមបញ្ចូលពួកវាទៅជាច្រកទ្វារចម្រុះ។</p>
        </div>

        <div class="grid-3-col">
          <div class="retrieval-card">
            <div class="retrieval-num">01</div>
            <h4>ពីថ្ងៃទី ៥៖ កាយវិភាគសាស្ត្រនៃ IF</h4>
            <p class="retrieval-q">តើសញ្ញាក្បៀសទាំងពីរមានន័យដូចម្តេចក្នុង \`If(Cond, ActA, ActB)\`?</p>
            <div class="retrieval-answer">
              <strong>ចម្លើយ៖</strong> ក្បៀសទី ១ = <strong>THEN</strong> (បើពិត); ក្បៀសទី ២ = <strong>ELSE</strong> (បើមិនពិត)។
            </div>
          </div>
          <div class="retrieval-card">
            <div class="retrieval-num">02</div>
            <h4>ពីថ្ងៃទី ៤៖ លទ្ធផលនៃលក្ខខណ្ឌ</h4>
            <p class="retrieval-q">តើលក្ខខណ្ឌអាចបង្កើតពាក្យ ឬលេខបានដែរឬទេ?</p>
            <div class="retrieval-answer">
              <strong>ចម្លើយ៖</strong> មិនអាចដាច់ខាត! លក្ខខណ្ឌជាសំណួរប្រៀបធៀបដែលបង្កើតបានតែ Boolean <strong>True</strong> ឬ <strong>False</strong> ប៉ុណ្ណោះ។
            </div>
          </div>
          <div class="retrieval-card">
            <div class="retrieval-num">03</div>
            <h4>ពីថ្ងៃទី ៣៖ វិន័យនៃប្រភេទតម្លៃ</h4>
            <p class="retrieval-q">ហេតុអ្វីបានជា \`txtPSI.Text &gt; 200\` ជាកំហុសឆ្គងដ៏គ្រោះថ្នាក់?</p>
            <div class="retrieval-answer">
              <strong>ចម្លើយ៖</strong> ពីព្រោះ \`txtPSI.Text\` ជា <strong>Text</strong>! វាត្រូវតែរុំក្នុង <code>Value()</code> មុនពេលប្រៀបធៀបលេខ។
            </div>
          </div>
        </div>
      `
    },

    'slide-4': {
      title: 'គោលបំណងសិក្សាដែលអាចវាស់វែងបាន',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & រំលឹកចំណេះដឹង (០០:០០ - ១០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"នេះជាគោលដៅសិក្សាដែលអាចវាស់វែងបានទាំង ៤ សម្រាប់ថ្ងៃទី ៦ នេះ។
នៅត្រឹមនាទីទី ៩០ អ្នកនឹងអាច៖
១. បែងចែកភាពខុសគ្នារវាង AND និង OR ដោយប្រើវិធានការសោរពីរបើកទូដែក និងសំឡេងរោទិ៍ឧបសគ្គ។
២. ដាក់វង់ក្រចកជាក្រុមលើលក្ខខណ្ឌចម្រុះដើម្បីការពារកំហុសតក្កវិជ្ជាស្ងាត់។
៣. វិភាគនិងកែកំហុសអន្ទាក់ទូទៅទាំង ៤ របស់អ្នកទើបចាប់ផ្តើម។
៤. សរសេររូបមន្ត Power Fx ដោយប្រើ &&, ||, និង ! យ៉ាងស្ទាត់ជំនាញ។"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge green-badge">សមត្ថភាពគោលដៅ</span>
          <h2 class="slide-title">គោលបំណងសិក្សាដែលអាចវាស់វែងបានទាំង ៤ សម្រាប់ថ្ងៃទី ៦</h2>
          <p class="slide-lead">នៅចុងបញ្ចប់នៃមេរៀន ៩០ នាទីនេះ អ្នកនឹងបង្ហាញសមត្ថភាពជាក់ស្តែងទាំងបួននេះដោយឯករាជ្យ៖</p>
        </div>

        <div class="grid-2-col">
          <div class="objective-card">
            <div class="obj-badge">គោលបំណង ១ • ការយល់ដឹង</div>
            <h3>បែងចែកច្រកទ្វារតក្កវិជ្ជា AND និង OR</h3>
            <p>ទស្សន៍ទាយយ៉ាងត្រឹមត្រូវ ១០០% ថាតើកន្សោមចម្រុះផ្តល់លទ្ធផល True ឬ False ដោយប្រើវិធានការសោរពីរតឹងរ៉ឹង (<code>AND</code>) និងវិធានការសំឡេងរោទិ៍ (<code>OR</code>)។</p>
            <div class="obj-outcome">&#10004; វាយតម្លៃតាមរយៈតារាងតក្កវិជ្ជាផ្លូវការ (Truth Table)</div>
          </div>

          <div class="objective-card">
            <div class="obj-badge">គោលបំណង ២ • ការតាមដានតក្កវិជ្ជា</div>
            <h3>ដាក់វង់ក្រចកលើលក្ខខណ្ឌចម្រុះ</h3>
            <p>ប្រើប្រាស់វង់ក្រចក <code>(A || B) &amp;&amp; C</code> ដើម្បីគ្រប់គ្រងលំដាប់អាទិភាពនៃការគណនា ការពារកំហុសតក្កវិជ្ជាធ្ងន់ធ្ងរក្នុងដំណើរការអាជីវកម្ម។</p>
            <div class="obj-outcome">&#10004; វាយតម្លៃតាមរយៈការវិភាគលំដាប់អាទិភាព</div>
          </div>

          <div class="objective-card">
            <div class="obj-badge">គោលបំណង ៣ • ការវិភាគកំហុស</div>
            <h3>កែតម្រូវអន្ទាក់តក្កវិជ្ជាទូទៅទាំង ៤</h3>
            <p>វិភាគនិងកែកំហុសការកាត់បន្ថយវាក្យសម្ព័ន្ធតាមការនិយាយ (<code>A = 1 || 2</code>), ការប្រើសញ្ញាបដិសេធខុស, និងការសរសេរ <code>= true</code> លើសកម្រិត។</p>
            <div class="obj-outcome">&#10004; វាយតម្លៃតាមរយៈប័ណ្ណត្រួតពិនិត្យការយល់ខុស</div>
          </div>

          <div class="objective-card">
            <div class="obj-badge">គោលបំណង ៤ • ការអនុវត្តជាក់ស្តែង</div>
            <h3>សរសេររូបមន្ត Power Fx <code>&amp;&amp;</code>, <code>||</code>, <code>!</code></h3>
            <p>សរសេរកន្សោម Power Fx ឥតខ្ចោះដោយរួមបញ្ចូលសំណួរជាច្រើនសម្រាប់ប្រព័ន្ធសុវត្ថិភាព ការកំណត់ពណ៌ និងការចាក់សោប៊ូតុង។</p>
            <div class="obj-outcome">&#10004; វាយតម្លៃតាមរយៈកិច្ចការប្រឈមបញ្ជូនសារធាតុគីមី Hazmat (Final Challenge)</div>
          </div>
        </div>
      `
    },

    'slide-5': {
      title: 'កាលវិភាគ ៩០ នាទី',
      segment: 'ផ្នែកទី ១៖ ស្វាគមន៍ & រំលឹកចំណេះដឹង (០០:០០ - ១០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"នេះជាកាលវិភាគ ៩០ នាទីដ៏តឹងរ៉ឹងនិងច្បាស់លាស់របស់យើង។
យើងចំណាយ ១០ នាទីលើការរំលឹកនិងគោលបំណង។
ពីនាទីទី ១០ ដល់ ២៥ យើងពិនិត្យមើលគ្រោះមហន្តរាយ $24,000 នៅរោងចក្រ Apex Plastics និងស្វែងយល់ពីឧទាហរណ៍ជាក់ស្តែងទាំង ៣៖ សោរពីរ, សំឡេងរោទិ៍, និងកុងតាក់បញ្ច្រាស។
ពីនាទី ២៥ ដល់ ៤៥ យើងសិក្សាអំពីដ្យាក្រាមច្រកតក្កវិជ្ជា តារាង Truth Tables និងវាក្យសម្ព័ន្ធ Power Fx។
នៅនាទីទី ៤៥ គត់ យើងផ្អាកសម្រាកផឹកទឹក ១ នាទី។
ពីនាទី ៤៥ ដល់ ៦០ ខ្ញុំបង្ហាញការពិសោធន៍ផ្ទាល់លើ Multi-Gate Decision Workbench។
ពីនាទី ៦០ ដល់ ៧៥ អ្នកទាំងអស់គ្នានឹងអនុវត្តជាក់ស្តែងលើកម្មវិធីត្រាប់តាម ៦ សេណារីយ៉ូ។
ហើយ ១៥ នាទីចុងក្រោយគឺជាការធ្វើកម្រងសំណួរ កិច្ចការប្រឈម និងការតភ្ជាប់ទៅកាន់ថ្ងៃទី ៧!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge purple-badge">រចនាសម្ព័ន្ធមេរៀន</span>
          <h2 class="slide-title">កាលវិភាគមេរៀន ៩០ នាទីបែប Spiral</h2>
          <p class="slide-lead">ការវិវឌ្ឍជាជំហានៗចាប់ពីគ្រោះថ្នាក់ឧស្សាហកម្មជាក់ស្តែង រហូតដល់ការស្ទាត់ជំនាញតក្កវិជ្ជាចម្រុះ។</p>
        </div>

        <div class="agenda-timeline-grid">
          <div class="agenda-row">
            <div class="agenda-time">00:00 - 10:00 (10នាទី)</div>
            <div class="agenda-topic">
              <strong>ផ្នែកទី ១៖ ស្វាគមន៍ &amp; រំលឹកចំណេះដឹង</strong>
              <span>ភ្ជាប់ផ្នត់គំនិតស្នូល, រំលឹកសកម្មថ្ងៃ ១–៥, គោលបំណងសិក្សា ៤ យ៉ាង។</span>
            </div>
            <div class="agenda-milestone">គោលដៅ៖ ភ្ជាប់ផ្នត់គំនិត</div>
          </div>
          <div class="agenda-row">
            <div class="agenda-time">10:00 - 25:00 (15នាទី)</div>
            <div class="agenda-topic">
              <strong>ផ្នែកទី ២៖ មូលហេតុនៃតក្កវិជ្ជាចម្រុះ &amp; ឧទាហរណ៍</strong>
              <span>មហន្តរាយជ័រខ្លោច $24,000, សោរពីរ (AND), សំឡេងរោទិ៍ (OR), កុងតាក់បញ្ច្រាស (NOT)។</span>
            </div>
            <div class="agenda-milestone">គោលដៅ៖ យល់បញ្ហាជាក់ស្តែង</div>
          </div>
          <div class="agenda-row">
            <div class="agenda-time">25:00 - 45:00 (20នាទី)</div>
            <div class="agenda-topic">
              <strong>ផ្នែកទី ៣៖ ច្រកទ្វារ, តារាងតក្កវិជ្ជា &amp; Power Fx</strong>
              <span>ដ្យាក្រាមលំហូរ, តារាង Truth Tables, វាក្យសម្ព័ន្ធ (\`&&\`, \`||\`, \`!\`), លំដាប់អាទិភាព &amp; Short-Circuit។</span>
            </div>
            <div class="agenda-milestone">គោលដៅ៖ វេយ្យាករណ៍តក្កវិជ្ជា</div>
          </div>
          <div class="agenda-row">
            <div class="agenda-time">45:00 - 60:00 (15នាទី)</div>
            <div class="agenda-topic">
              <strong>ផ្នែកទី ៤៖ ការបង្ហាញផ្ទាល់ &amp; Multi-Gate Lab</strong>
              <span>ផ្អាកសម្រាកសម្រួលអារម្មណ៍; បង្ហាញបន្ទះពិសោធន៍ផ្ទាល់ជាមួយសម្ពាធ និងកម្រិតទឹកត្រជាក់។</span>
            </div>
            <div class="agenda-milestone">គោលដៅ៖ ការយល់ឃើញច្បាស់</div>
          </div>
          <div class="agenda-row">
            <div class="agenda-time">60:00 - 75:00 (15នាទី)</div>
            <div class="agenda-topic">
              <strong>ផ្នែកទី ៥៖ ការអនុវត្តផ្ទាល់ &amp; កម្មវិធីត្រាប់តាម</strong>
              <span>វិភាគម៉ាទ្រីសសុវត្ថិភាពម៉ាស៊ីនលេខ ៤; អនុវត្តផ្ទាល់លើផ្ទាំងត្រាប់តាម ៦ សេណារីយ៉ូ។</span>
            </div>
            <div class="agenda-milestone">គោលដៅ៖ អនុវត្តដោយខ្លួនឯង</div>
          </div>
          <div class="agenda-row">
            <div class="agenda-time">75:00 - 90:00 (15នាទី)</div>
            <div class="agenda-topic">
              <strong>ផ្នែកទី ៦៖ ការធ្វើតេស្ត, បញ្ហាប្រឈម &amp; ស្ពានទៅមុខ</strong>
              <span>កម្រងសំណួរ ៥, កិច្ចការប្រឈម Hazmat ៨ វិធាន (Challenge), រូបប្រឡង, កិច្ចការផ្ទះ &amp; ស្ពានទៅកាន់ថ្ងៃទី ៧។</span>
            </div>
            <div class="agenda-milestone">គោលដៅ៖ ការវាយតម្លៃចុងក្រោយ</div>
          </div>
        </div>
      `
    },

    'slide-6': {
      title: 'បញ្ហាកន្លែងធ្វើការ៖ មហន្តរាយ $24,000',
      segment: 'ផ្នែកទី ២៖ មូលហេតុនៃតក្កវិជ្ជាចម្រុះ (១០:០០ - ២៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"សូមក្រឡេកមើលរោងចក្រ Apex Plastics។
ម៉ាស៊ីនរំលាយប្លាស្ទិកកម្តៅជ័រនៅសីតុណ្ហភាព 220°C។
ប្រព័ន្ធសុវត្ថិភាពពីរការពារធុងរំលាយ៖ ឧបករណ៍វាស់កម្តៅ (Temp > 240) និងម៉ាស៊ីនបូមទឹកត្រជាក់ (CoolantActive)។
អ្នកបង្កើតកម្មវិធីដំបូងបានសរសេរ If តែមួយ៖
If(Temp > 240, ShutdownHeaters(), MaintainHeat())!
នៅម៉ោង ២ ទៀបភ្លឺ សីតុណ្ហភាពឡើងដល់ 235°C (នៅក្រោម 240 ដូច្នេះលក្ខខណ្ឌគឺ FALSE)។
ប៉ុន្តែ បំពង់ទឹកបានបែក ហើយម៉ាស៊ីនបូមទឹកត្រជាក់បានខូច (CoolantActive = false)!
ដោយសារតែកម្មវិធីពិនិត្យតែសីតុណ្ហភាព វាបានបន្តកម្តៅ (MaintainHeat())!
ដោយគ្មានទឹកត្រជាក់ ជ័រប្លាស្ទិក ៦០០ គីឡូក្រាមបានខ្លោចកកដូចថ្មក្នុងធុងម៉ាស៊ីន!
ខាតបង់ការផលិត ៦ ម៉ោង៖ $15,000។ ជ័រខូច ៦០០ គីឡូក្រាម៖ $9,000។ សរុបខាតបង់៖ $24,000!
ទាំងអស់នេះមកពីការពិនិត្យសំណួរតែមួយ ជំនួសឱ្យការរួមបញ្ចូលលក្ខខណ្ឌ!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge red-badge">ករណីសិក្សាការងារជាក់ស្តែង</span>
          <h2 class="slide-title">Apex Plastics៖ គ្រោះមហន្តរាយ "ជ័រខ្លោច" ខាតបង់ $24,000</h2>
          <p class="slide-lead">របៀបដែលរូបមន្ត IF លក្ខខណ្ឌទោលបានធ្វើឱ្យខ្លោចជ័រប្លាស្ទិក ៦០០ គីឡូក្រាម ដោយសារតែមើលរំលងការខូចខាតប្រព័ន្ធទឹកត្រជាក់។</p>
        </div>

        <div class="story-case-box">
          <div class="story-header">
            <span class="warning-icon">&#9888;</span>
            <div>
              <h3 style="margin:0; color:#fb7185;">របាយការណ៍ឧបទ្ទវហេតុ៖ ការកកខ្លោចជ័រប្លាស្ទិកក្នុងធុងម៉ាស៊ីនលេខ ៤</h3>
              <span style="font-size:0.85rem; color:#cbd5e1;">Apex Plastics Manufacturing • វេនយប់ខ្សែសង្វាក់ផលិតកម្មលេខ ៤</span>
            </div>
          </div>

          <div class="story-grid">
            <div class="story-panel">
              <h4>អ្វីដែលកម្មវិធីបានដំណើរការ (កំហុសលក្ខខណ្ឌទោល)៖</h4>
              <div class="math-card math-actual">
                <span>លក្ខខណ្ឌដែលបានពិនិត្យ៖ <code>Temp &gt; 240°C</code> (Temp = 235°C ➔ FALSE)</span>
                <span>ស្ថានភាពទឹកត្រជាក់៖ <code>CoolantPump = false</code> (ត្រូវបានមើលរំលង!)</span>
                <div class="calc-divider"></div>
                <span class="result-line-fail">សកម្មភាព៖ <strong>បន្តកម្តៅ ➔ ខ្លោចជ័រ ៦០០ គីឡូក្រាម (ខាតបង់ $24,000)</strong></span>
              </div>
            </div>

            <div class="story-panel">
              <h4>អ្វីដែលតក្កវិជ្ជាចម្រុះគួរតែធ្វើ (ច្រកទ្វារ OR)៖</h4>
              <div class="math-card math-expected">
                <span>វិធានការចម្រុះ៖ <code>Temp &gt; 240 || !CoolantActive</code> (វាយតម្លៃ៖ TRUE)</span>
                <span>ផ្លូវ True៖ <code>ShutdownHeaters() &amp; SoundAlarm()</code></span>
                <div class="calc-divider"></div>
                <span class="result-line">លទ្ធផល៖ <strong>កាត់ផ្តាច់ភ្លើងកម្តៅភ្លាមៗ • ធុងម៉ាស៊ីនមានសុវត្ថិភាព ១០០%</strong></span>
              </div>
            </div>
          </div>

          <div class="story-footer">
            <strong>មូលហេតុឫសគល់៖</strong> ការគិតលើលក្ខខណ្ឌទោលគឺមានគ្រោះថ្នាក់ខ្លាំងក្នុងឧស្សាហកម្មទំនើប។ ប្រតិបត្តិការជាក់ស្តែងទាមទារ <strong>ច្រកទ្វារតក្កវិជ្ជាចម្រុះ</strong> ដើម្បីតាមដានអថេរសុវត្ថិភាពដែលពាក់ព័ន្ធគ្នាទៅវិញទៅមក។
          </div>
        </div>
      `
    },

    'slide-7': {
      title: 'គោលគំនិតសាមញ្ញ៖ អ្វីជាលក្ខខណ្ឌចម្រុះ?',
      segment: 'ផ្នែកទី ២៖ មូលហេតុនៃតក្កវិជ្ជាចម្រុះ (១០:០០ - ២៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"តើអ្វីជាលក្ខខណ្ឌចម្រុះ (Compound Condition)?
វាងាយស្រួលយល់ណាស់៖ វាគ្រាន់តែជាសំណួរពីរ ឬច្រើនដែលត្រូវបានភ្ជាប់គ្នា ដើម្បីបង្កើតបានជាការវិនិច្ឆ័យ TRUE ឬ FALSE ចុងក្រោយតែមួយគត់!
សូមគិតបែបនេះ៖
If() កំពុងអង្គុយចាំចម្លើយ។
If() មិនចង់ស្តាប់ចម្លើយពីរផ្សេងគ្នាទេ!
If() ស្រែកថា៖ 'ផ្តល់ចម្លើយ True ឬ False តែមួយមកខ្ញុំ!'
AND (&&) និង OR (||) គឺជាគណៈកម្មការដែលវាយតម្លៃសំណួរទាំងពីរ ហើយប្រគល់ចម្លើយតែមួយនោះទៅឱ្យ If()!
បើចម្លើយចេញមក True ➔ ដំណើរការផ្លូវ A!
បើចម្លើយចេញមក False ➔ ដំណើរការផ្លូវ B!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge blue-badge">ផ្នត់គំនិតស្នូល</span>
          <h2 class="slide-title">ភាសាសាមញ្ញ៖ តើអ្វីទៅជា "លក្ខខណ្ឌចម្រុះ" (Compound Condition)?</h2>
          <p class="slide-lead">ការរួមបញ្ចូលសំណួរជាច្រើនឱ្យទៅជាការវិនិច្ឆ័យ True/False តែមួយគត់ មុនពេលបញ្ជូនវាទៅឱ្យ <code>If()</code>។</p>
        </div>

        <div class="grid-2-col" style="gap: 1.5rem;">
          <div class="concept-card">
            <div class="concept-badge red-badge">&#10060; លក្ខខណ្ឌទោល (ការសម្រេចចិត្តបែបសាមញ្ញពេក)</div>
            <h3>ពិនិត្យមើលអថេរតែមួយគត់</h3>
            <p>ពិនិត្យមើលតែតួលេខ ឬប្រអប់អត្ថបទមួយ។ បរាជ័យនៅពេលដែលសុវត្ថិភាព ឬគោលការណ៍អាជីវកម្មជាក់ស្តែងអាស្រ័យលើកត្តាជាច្រើន។</p>
            <div class="concept-examples">
              <div class="example-item">ពិនិត្យតែកម្តៅ មើលរំលងការខូចម៉ាស៊ីនបូមទឹកត្រជាក់។</div>
              <div class="example-item">ពិនិត្យតែការយល់ព្រមពីមេ មើលរំលងការលើសថវិកា។</div>
              <div class="example-item">ពិនិត្យតែឈ្មោះអ្នកបើកបរ មើលរំលងការមិនបានថ្លឹងទម្ងន់ឡាន។</div>
            </div>
          </div>

          <div class="concept-card">
            <div class="concept-badge green-badge">&#10004; ច្រកទ្វារចម្រុះ (វិធានការឆ្លាតវៃ)</div>
            <h3>រួមបញ្ចូលការពិនិត្យជាច្រើនទៅជាចម្លើយតែមួយ</h3>
            <p>វាយតម្លៃលក្ខខណ្ឌជាច្រើនដោយប្រើច្រកតក្កវិជ្ជា ដោយច្របាច់បញ្ចូលគ្នាឱ្យទៅជាចម្លើយ True ឬ False តែមួយសម្រាប់កម្មវិធី។</p>
            <div class="concept-examples">
              <div class="example-item">&#10004; <strong>AND:</strong> កាតត្រឹមត្រូវ <strong>និង</strong> ជាបុគ្គលិកដែលមានវិញ្ញាបនបត្រ។</div>
              <div class="example-item">&#10004; <strong>OR:</strong> សម្ពាធលើសកម្រិត <strong>ឬ</strong> សីតុណ្ហភាពឡើងខ្ពស់ខ្លាំង។</div>
              <div class="example-item">&#10004; <strong>NOT:</strong> ធុងពេញ <strong>និងមិនមែន</strong> កំពុងបង្ហូរចេញ។</div>
            </div>
          </div>
        </div>

        <div class="takeaway-banner">
          <strong>ចំណុចគន្លឹះសំខាន់៖</strong> <code>AND</code> និង <code>OR</code> មិនមែនមកជំនួស <code>If()</code> ឡើយ! ពួកវាជា <strong>អ្នកច្របាច់បញ្ចូលលក្ខខណ្ឌ</strong> ដែលបង្រួមសំណួរជាច្រើនឱ្យទៅជាការវិនិច្ឆ័យ True/False តែមួយគត់!
        </div>
      `
    },

    'slide-8': {
      title: 'ឧទាហរណ៍ជាក់ស្តែង ១៖ សោរពីរបើកទូដែក (AND)',
      segment: 'ផ្នែកទី ២៖ មូលហេតុនៃតក្កវិជ្ជាចម្រុះ (១០:០០ - ២៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"ដើម្បីចងចាំ AND មិនឱ្យភ្លេច សូមគិតដល់ទូដែកសុវត្ថិភាពខ្ពស់ដែលមានសោរពីរ។
មន្ត្រីសន្តិសុខពីរនាក់ត្រូវតែកាច់សោរព្រមគ្នា។
មន្ត្រីទី ១ កាច់សោរ A (Condition A = TRUE)។
មន្ត្រីទី ២ ទៅញ៉ាំបាយបាត់ មិនបានកាច់សោរ B ទេ (Condition B = FALSE)។
តើទ្វារទូដែករបើកទេ?
មិនរបើកដាច់ខាត!
សម្រាប់ច្រក AND ការមានចម្លើយ True តែមួយ គឺមិនគ្រប់គ្រាន់ទេ!
គ្រប់លក្ខខណ្ឌទាំងអស់ត្រូវតែ TRUE ទើបលទ្ធផលចុងក្រោយចេញមក TRUE!
បើមានសូម្បីតែលក្ខខណ្ឌមួយចេញ FALSE ច្រក AND ទាំងមូលនឹងចេញ FALSE ភ្លាម!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge gold-badge">ឧទាហរណ៍ប្រៀបធៀប ១</span>
          <h2 class="slide-title">ច្រកទ្វារ \`AND\` (<code>&amp;&amp;</code>)៖ សោរពីរបើកទូដែកសុវត្ថិភាព</h2>
          <p class="slide-lead">ការរួមភ្ជាប់តឹងរ៉ឹងបំផុត៖ សោរទាំងពីរត្រូវតែកាច់ព្រមគ្នា។ ប្រសិនបើខ្វះសូម្បីតែសោរមួយ ទ្វារនឹងនៅតែចាក់សោជាប់ជានិច្ច។</p>
        </div>

        <div class="railway-switch-box">
          <div class="train-origin">
            <span class="rail-icon">&#128271;</span>
            <strong>សោរមន្ត្រីទី ១</strong>
            <p>លក្ខខណ្ឌ A៖ True</p>
          </div>

          <div class="switch-lever">
            <div class="lever-indicator">&#10133;</div>
            <span class="lever-label">ច្រកទ្វារ AND (&amp;&amp;)</span>
            <code>ត្រូវតែពិតទាំងអស់</code>
          </div>

          <div class="track-branches">
            <div class="track-branch branch-true">
              <span class="branch-pill pill-true">TRUE លុះត្រាតែពិតទាំងអស់</span>
              <strong>ទូដែករបើក (សកម្មភាព A)</strong>
              <p>សោរទាំងពីរកាច់ព្រមគ្នា៖ អនុញ្ញាតឱ្យចូលប្រើប្រាស់ធនាគារ។</p>
            </div>

            <div class="track-branch branch-false">
              <span class="branch-pill pill-false">FALSE បើមានយ៉ាងហោចមួយមិនពិត</span>
              <strong>ទូដែកនៅចាក់សោ (សកម្មភាព B)</strong>
              <p>ខ្វះសោរណាមួយ៖ បដិសេធការចូល និងបើកប្រព័ន្ធការពារ។</p>
            </div>
          </div>
        </div>
      `
    },

    'slide-9': {
      title: 'ឧទាហរណ៍ជាក់ស្តែង ២៖ សំឡេងរោទិ៍ឧបសគ្គ (OR)',
      segment: 'ផ្នែកទី ២៖ មូលហេតុនៃតក្កវិជ្ជាចម្រុះ (១០:០០ - ២៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"ឥឡូវនេះ សូមប្រៀបធៀប AND ជាមួយ OR!
សូមគិតដល់ប្រព័ន្ធសំឡេងរោទិ៍អគ្គិភ័យក្នុងរោងចក្រ។
ពិដានមានឧបករណ៍ចាប់ផ្សែង ឧបករណ៍ចាប់កម្តៅ និងខ្សែទាញអាសន្ន។
តើរោងចក្រត្រូវរង់ចាំឱ្យទាំងបីដំណើរការព្រមគ្នា ទើបបន្លឺសំឡេងរោទិ៍មែនទេ?
មិនមែនទេ! បើធ្វើបែបនោះ មនុស្សនឹងស្លាប់អស់ហើយ!
បើមានផ្សែង ➔ រោទិ៍ភ្លាម!
ឬបើមានកម្តៅខ្លាំង ➔ រោទិ៍ភ្លាម!
ឬបើមានកម្មករទាញខ្សែអាសន្ន ➔ រោទិ៍ភ្លាម!
ច្រក OR គឺមានភាពបត់បែន និងការពារសុវត្ថិភាព។
វាផ្តល់លទ្ធផល TRUE ប្រសិនបើមានយ៉ាងហោចណាស់លក្ខខណ្ឌមួយពិត!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge gold-badge">ឧទាហរណ៍ប្រៀបធៀប ២</span>
          <h2 class="slide-title">ច្រកទ្វារ \`OR\` (<code>||</code>)៖ សំឡេងរោទិ៍អគ្គិភ័យពហុឧបសគ្គ</h2>
          <p class="slide-lead">ការការពារសុវត្ថិភាព៖ ប្រសិនបើមានឧបសគ្គយ៉ាងហោចណាស់មួយត្រូវបានរកឃើញ សំឡេងរោទិ៍អាសន្ននឹងបន្លឺឡើងភ្លាមៗ។</p>
        </div>

        <div class="railway-switch-box">
          <div class="train-origin">
            <span class="rail-icon">&#128293;</span>
            <strong>ឧបករណ៍ចាប់ឧបសគ្គ</strong>
            <p>ផ្សែង OR កម្តៅ OR ខ្សែទាញ</p>
          </div>

          <div class="switch-lever">
            <div class="lever-indicator">&#128279;</div>
            <span class="lever-label">ច្រកទ្វារ OR (||)</span>
            <code>យ៉ាងហោចពិតមួយ</code>
          </div>

          <div class="track-branches">
            <div class="track-branch branch-true">
              <span class="branch-pill pill-true">TRUE បើមានយ៉ាងហោចមួយពិត</span>
              <strong>បន្លឺស៊ីរ៉ែនអាសន្ន (សកម្មភាព A)</strong>
              <p>រកឃើញគ្រោះថ្នាក់ណាមួយ៖ ផ្តល់ដំណឹងអាសន្នទូទាំងរោងចក្រភ្លាមៗ។</p>
            </div>

            <div class="track-branch branch-false">
              <span class="branch-pill pill-false">FALSE លុះត្រាតែមិនពិតទាំងអស់</span>
              <strong>ដំណើរការធម្មតាដោយសុវត្ថិភាព (សកម្មភាព B)</strong>
              <p>ឧបសគ្គទាំងអស់សុទ្ធតែស្អាតស្អំ៖ រោងចក្របន្តដំណើរការជាប្រក្រតី។</p>
            </div>
          </div>
        </div>
      `
    },

    'slide-10': {
      title: 'ឧទាហរណ៍ជាក់ស្តែង ៣៖ កុងតាក់បញ្ច្រាស (NOT)',
      segment: 'ផ្នែកទី ២៖ មូលហេតុនៃតក្កវិជ្ជាចម្រុះ (១០:០០ - ២៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"សញ្ញាតក្កវិជ្ជាទី ៣ របស់យើងគឺ NOT តំណាងដោយសញ្ញាឧទាន (!)。
សូមគិតដល់ NOT ដូចជាកុងតាក់បញ្ច្រាស ឬអាវភ្លៀងដែលអាចត្រឡប់ពាក់បានទាំងសងខាង។
វាគ្រាន់តែត្រឡប់តម្លៃពិតដែលអ្នកផ្តល់ឱ្យវាប៉ុណ្ណោះ!
បើលក្ខខណ្ឌគឺ True វានឹងប្រែទៅជា False!
បើលក្ខខណ្ឌគឺ False វានឹងប្រែទៅជា True!
ហេតុអ្វីបានជាវាមានប្រយោជន៍ក្នុង Power Apps?
ពីព្រោះ Power Apps មានអនុគមន៍ដូចជា IsBlank(txtName.Text)។
IsBlank() ផ្តល់តម្លៃ TRUE នៅពេលប្រអប់នោះនៅទទេស្អាត។
ចុះបើអ្នកចង់សួរថា៖ 'តើប្រអប់នេះមិនមែននៅទទេមែនទេ?'
អ្នកគ្រាន់តែដាក់សញ្ញាឧទាននៅខាងមុខ៖ !IsBlank(txtName.Text)!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge gold-badge">ឧទាហរណ៍ប្រៀបធៀប ៣</span>
          <h2 class="slide-title">ច្រកទ្វារ \`NOT\` (<code>!</code>)៖ កុងតាក់បញ្ច្រាសការពិត</h2>
          <p class="slide-lead">ការបញ្ច្រាសតក្កវិជ្ជា៖ បង្វែរ True ទៅជា False និងបង្វែរ False ទៅជា True។ ចាំបាច់បំផុតសម្រាប់ការពិនិត្យប្រអប់ទិន្នន័យមិនទទេ។</p>
        </div>

        <div class="pantry-grid">
          <div class="pantry-jar border-blue">
            <div class="jar-icon">&#128260;</div>
            <h4>តម្លៃដើម៖ TRUE</h4>
            <span class="jar-substance">ធាតុចូល៖ true</span>
            <p>ឧទាហរណ៍៖ <code>IsBlank(txt)</code> ស្មើ True (ប្រអប់នៅទទេ)។</p>
            <div class="jar-example"><code>Input = true</code></div>
          </div>

          <div class="pantry-jar border-num">
            <div class="jar-icon">&#9889;</div>
            <h4>ច្រកបញ្ច្រាស (!)</h4>
            <span class="jar-substance">សញ្ញា៖ ! ឬ Not()</span>
            <p>បញ្ច្រាសចរន្តតក្កវិជ្ជាទៅកាន់ស្ថានភាពផ្ទុយគ្នាទាំងស្រុង។</p>
            <div class="jar-example"><code>!true ➔ FALSE</code></div>
          </div>

          <div class="pantry-jar border-date">
            <div class="jar-icon">&#10060;</div>
            <h4>លទ្ធផលត្រឡប់៖ FALSE</h4>
            <span class="jar-substance">ធាតុចេញ៖ false</span>
            <p>ឥឡូវនេះកម្មវិធីចាត់ទុកប្រអប់ទទេនោះថាជាការផ្ទៀងផ្ទាត់មិនជាប់។</p>
            <div class="jar-example"><code>Result = false</code></div>
          </div>

          <div class="pantry-jar border-bool">
            <div class="jar-icon">&#10004;</div>
            <h4>បញ្ច្រាស False៖ TRUE</h4>
            <span class="jar-substance">ធាតុចេញ៖ true</span>
            <p><code>!false</code> បង្កើតបាន True បញ្ជាក់ថាប្រអប់មានទិន្នន័យ!</p>
            <div class="jar-example"><code>!IsBlank("Dara") = true</code></div>
          </div>
        </div>
      `
    },

    'slide-11': {
      title: 'ស្ថាបត្យកម្មច្រកតក្កវិជ្ជា',
      segment: 'ផ្នែកទី ៣៖ ច្រកទ្វារ & វាក្យសម្ព័ន្ធ (២៥:០០ - ៤៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"សូមក្រឡេកមើលលំហូរហេតុនិងផលនៅលើអេក្រង់។
មើលរបៀបដែលទិន្នន័យធ្វើដំណើរឆ្លងកាត់ខ្សែសង្វាក់តក្កវិជ្ជាចម្រុះ៖
ជំហានទី ១៖ ទិន្នន័យចូល ១ (សម្ពាធ = 240 PSI) និងទិន្នន័យចូល ២ (ទឹកត្រជាក់ = 12%)។
ជំហានទី ២៖ សំណួរប្រៀបធៀបឯករាជ្យពីរ៖
តើសម្ពាធ > 200 មែនទេ? ➔ ចម្លើយគឺ TRUE!
តើទឹកត្រជាក់ < 20% មែនទេ? ➔ ចម្លើយគឺ TRUE!
ជំហានទី ៣៖ ចម្លើយទាំងពីរចូលទៅក្នុងច្រក AND (&&)។
TRUE && TRUE បង្កើតបានការវិនិច្ឆ័យរួមតែមួយគត់៖ TRUE!
ជំហានទី ៤៖ ការវិនិច្ឆ័យ True នោះត្រូវបានបញ្ជូនទៅក្នុង If()។
ជំហានទី ៥៖ If() បត់ទៅកាន់ផ្លូវ A៖ បញ្ចេញសម្ពាធអាសន្ន និងបិទកម្តៅភ្លាមៗ!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge blue-badge">ស្ថាបត្យកម្មលំហូរតក្កវិជ្ជា</span>
          <h2 class="slide-title">ហេតុ &amp; ផលជាក់ស្តែង៖ ខ្សែសង្វាក់នៃច្រកតក្កវិជ្ជាចម្រុះ</h2>
          <p class="slide-lead">តាមដានទិន្នន័យឧបករណ៍ចាប់សញ្ញារោងចក្រឆ្លងកាត់សំណួរលក្ខខណ្ឌជាច្រើន ចូលទៅកាន់ច្រកវិនិច្ឆ័យរួម និងសកម្មភាពចុងក្រោយ។</p>
        </div>

        <div class="branching-diagram-container">
          <div class="diagram-root">
            <span class="root-badge">ទិន្នន័យឧបករណ៍ផ្ទាល់</span>
            <code>សម្ពាធ៖ 240 PSI &bull; ទឹកត្រជាក់៖ 12%</code>
          </div>

          <div class="diagram-stem">&#10142;</div>

          <div class="diagram-decision-diamond">
            <span class="diamond-tag">ច្រកទ្វាររួម (AND)</span>
            <strong>Value(PSI) &gt; 200 &amp;&amp; Value(Coolant) &lt; 20</strong>
            <div class="diamond-result">ការវិនិច្ឆ័យរួម៖ TRUE</div>
          </div>

          <div class="diagram-fork-branches">
            <div class="fork-path path-active">
              <span class="fork-tag tag-true">&#10004; ជ្រើសរើសផ្លូវ TRUE (IF TRUE)</span>
              <h4>សកម្មភាព A៖ បញ្ចេញសម្ពាធអាសន្នជាបន្ទាន់</h4>
              <p>លក្ខខណ្ឌធ្ងន់ធ្ងរទាំងពីរត្រូវបានបំពេញ៖ កាត់ផ្តាច់ធារាសាស្ត្រ បន្លឺស៊ីរ៉ែន និងបញ្ជូនក្រុមបច្ចេកទេស។</p>
            </div>

            <div class="fork-path path-dormant">
              <span class="fork-tag tag-false">&#10060; ផ្លូវ FALSE (ត្រូវបានរំលង)</span>
              <h4>សកម្មភាព B៖ បន្តដំណើរការធម្មតា</h4>
              <p>ប៉ារ៉ាម៉ែត្រស្ថិតក្នុងកម្រិតសុវត្ថិភាព៖ បន្តវដ្តចាក់ពុម្ពស្វ័យប្រវត្តិតាមស្តង់ដារ។</p>
            </div>
          </div>
        </div>
      `
    },

    'slide-12': {
      title: 'ការបង្ហាញផ្ទាល់៖ Multi-Gate Workbench',
      segment: 'ផ្នែកទី ៤៖ ការបង្ហាញផ្ទាល់របស់អ្នកបណ្តុះបណ្តាល (៤៥:០០ - ៦០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"ឥឡូវនេះ សូមបើកបន្ទះពិសោធន៍ផ្ទាល់ Interactive Multi-Gate Decision Workbench របស់យើង!
មើលនៅពេលខ្ញុំកែប្រែឧបករណ៍បញ្ជាជាក់ស្តែង៖
មើលរបារសម្ពាធ៖ បច្ចុប្បន្ននៅត្រឹម 150 PSI។
មើលរបារទឹកត្រជាក់៖ បច្ចុប្បន្ននៅត្រឹម 80%។
រូបមន្តដែលយើងកំពុងធ្វើតេស្តគឺ៖
Pressure > 200 && Coolant < 20។
មើល៖ នៅពេលខ្ញុំអូសសម្ពាធដល់ 250 PSI តើសំឡេងរោទិ៍អាសន្នបន្លឺឡើងទេ?
អត់ទេ! មើលកាតនេះ៖ វានៅតែបង្ហាញពណ៌ខៀវធម្មតា!
ហេតុអ្វី? ពីព្រោះទឹកត្រជាក់នៅមាន 80%! សម្រាប់ច្រក AND ការមាន True តែមួយ គឺមិនគ្រប់គ្រាន់ទេ!
ឥឡូវមើល៖ ខ្ញុំអូសទឹកត្រជាក់ចុះមក 15%...
ភ្លាមនោះ! លក្ខខណ្ឌទាំងពីរចេញ TRUE!
កាតប្រែជាពណ៌ក្រហមភ្លឺចែងចាំងជាមួយសំឡេងរោទិ៍អាសន្ន!
មើលប៊ូតុងខាងក្រោម៖ ទាមទារឱ្យមានឈ្មោះបុគ្គលិក និងគ្មានគ្រោះថ្នាក់។
វាយឈ្មោះចូល៖ ប៊ូតុងប្រែជាពណ៌បៃតង និងដោះសោភ្លាម!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge blue-badge">ការពិសោធន៍អន្តរកម្ម</span>
          <h2 class="slide-title">ការបង្ហាញរបស់អ្នកបណ្តុះបណ្តាល៖ Multi-Gate Decision Workbench</h2>
          <p class="slide-lead">កែប្រែឧបករណ៍បញ្ជាម៉ាស៊ីនផ្ទាល់នៅខាងឆ្វេង ដើម្បីមើលរបៀបដែល <code>&amp;&amp;</code>, <code>||</code>, និង <code>!</code> បញ្ចូលវិធានការជាច្រើនដោយស្វ័យប្រវត្តិ។</p>
        </div>

        <div class="workbench-grid">
          <div class="workbench-inputs">
            <h4>ឧបករណ៍បញ្ជាម៉ាស៊ីនរំលាយប្លាស្ទិកលេខ ៤៖</h4>
            <div class="input-control-row">
              <label>សម្ពាធធារាសាស្ត្រ៖ <strong id="wb-pressure-val">150</strong> PSI</label>
              <input type="range" id="wb-pressure-slider" min="50" max="300" step="10" value="150" class="fluent-slider">
            </div>
            <div class="input-control-row">
              <label>កម្រិតទឹកត្រជាក់បម្រុង៖ <strong id="wb-coolant-val">80</strong>%</label>
              <input type="range" id="wb-coolant-slider" min="5" max="100" step="5" value="80" class="fluent-slider">
            </div>
            <div class="input-control-row">
              <label>ឈ្មោះលើកាតបុគ្គលិកបញ្ជា៖</label>
              <input type="text" id="wb-op-input" value="" class="fluent-text-input" placeholder="វាយឈ្មោះបុគ្គលិក...">
            </div>
            <div class="input-control-row">
              <label>ស្ថានភាពគ្រោះថ្នាក់សកម្ម?</label>
              <button type="button" id="wb-hazard-btn" class="workbench-toggle-btn">
                <span class="toggle-indicator off"></span> គ្រោះថ្នាក់៖ ទេ (false)
              </button>
            </div>
          </div>

          <div class="workbench-evaluations">
            <h4>ការវាយតម្លៃច្រកទ្វារជាក់ស្តែង៖ <code>Pressure &gt; 200 &amp;&amp; Coolant &lt; 20</code></h4>
            
            <div class="decision-result-card" id="card-alert-branch">
              <span class="branch-label" id="branch-indicator">ផ្លូវ FALSE សកម្ម៖ ប្រតិបត្តិការធម្មតា</span>
              <h4 id="branch-title" style="color: #38bdf8;">&#128227; ដំណើរការក្នុងកម្រិតសុវត្ថិភាព</h4>
              <p id="branch-desc">លក្ខខណ្ឌទាំងពីរត្រូវតែ True ទើបបិទម៉ាស៊ីន។ ស្ថានភាពសុវត្ថិភាពត្រូវបានរក្សា។</p>
            </div>

            <div class="submit-state-demo">
              <label>DisplayMode របស់ប៊ូតុង៖ <code>If(!IsBlank(Name) &amp;&amp; !Hazard, Edit, Disabled)</code></label>
              <button id="demo-submit-btn" class="nav-btn" disabled style="width: 100%; justify-content: center; opacity: 0.4;">
                &#128274; ចាប់ផ្តើមដំណើរការចាក់ពុម្ព (ចាក់សោ៖ ត្រូវការកាតសម្គាល់)
              </button>
            </div>
          </div>
        </div>
      `
    },

    'slide-13': {
      title: 'ការផ្ទៀងផ្ទាត់ពាក់កណ្តាលមេរៀន & ផឹកទឹក',
      segment: 'ផ្នែកទី ៤៖ ការបង្ហាញផ្ទាល់របស់អ្នកបណ្តុះបណ្តាល (៤៥:០០ - ៦០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"យើងបានមកដល់ចំណុច ៤៥ នាទីហើយ! ពាក់កណ្តាលនៃថ្ងៃទី ៦!
សូមផ្អាកដកដង្ហើមវែងៗ សម្រួលឥរិយាបថ និងពិសារទឹកមួយកែវ។
សូមលើកមេដៃបញ្ជាក់ទាំងអស់គ្នា៖
លើកមេដៃឡើងលើ (Thumbs UP) ប្រសិនបើអ្នកយល់ច្បាស់ពីភាពខុសគ្នា៖ AND ទាមទារពិតទាំងអស់; OR ត្រូវការយ៉ាងហោចពិតមួយ!
លើកមេដៃផ្អៀង (Thumbs SIDEWAYS) ប្រសិនបើអ្នកចង់ឃើញរបៀបប្រើវង់ក្រចកនៅពេលលាយ AND និង OR ចូលគ្នា។
សូមចាំវិធានមាសរបស់យើង៖
នៅពេលលាយ AND និង OR បញ្ចូលគ្នា ត្រូវដាក់វង់ក្រចកជុំវិញសំណួររងរបស់អ្នកជានិច្ច!"`,
      html: `
        <div class="slide-content">
          <div class="checkpoint-card">
            <div class="checkpoint-icon">&#9749;</div>
            <h2 class="checkpoint-title">ការផ្ទៀងផ្ទាត់ពាក់កណ្តាលមេរៀន (កន្លងផុត ៤៥:០០)</h2>
            <p class="checkpoint-subtitle">ដកដង្ហើមវែងៗ ពិសារទឹក និងផ្ទៀងផ្ទាត់គ្រឹះផ្នត់គំនិតរបស់អ្នក មុនពេលយើងអនុវត្តសរសេរតក្កវិជ្ជាចម្រុះ។</p>

            <div class="checkpoint-grid">
              <div class="check-item">
                <div class="check-icon">&#128077;</div>
                <h4>មេដៃឡើងលើ៖ យល់ច្បាស់</h4>
                <p>ខ្ញុំដឹងពីភាពខុសគ្នា៖ <code>&amp;&amp;</code> ទាមទារឱ្យលក្ខខណ្ឌទាំងអស់ពិត; <code>||</code> ទាមទារឱ្យមានយ៉ាងហោចណាស់លក្ខខណ្ឌមួយពិត។</p>
              </div>
              <div class="check-item">
                <div class="check-icon">&#9995;</div>
                <h4>មេដៃផ្អៀង៖ មិនទាន់ច្បាស់</h4>
                <p>ខ្ញុំយល់ពីឧទាហរណ៍សោរពីរ ប៉ុន្តែខ្ញុំចង់អនុវត្តជាក់ស្តែងក្នុងការសរសេររូបមន្ត Power Fx បន្ថែម។</p>
              </div>
              <div class="check-item">
                <div class="check-icon">&#128161;</div>
                <h4>វិធានមាសដែលត្រូវចងចាំ</h4>
                <p><em>"AND គឺតឹងរ៉ឹង (សោរទាំងពីរ); OR គឺបត់បែន (ឧបសគ្គណាមួយ); NOT បញ្ច្រាសការពិត។"</em></p>
              </div>
            </div>
          </div>
        </div>
      `
    },

    'slide-14': {
      title: 'ករណីសិក្សា៖ ម៉ាទ្រីសសុវត្ថិភាព',
      segment: 'ផ្នែកទី ៥៖ ការអនុវត្តដឹកនាំដោយគ្រូ (៦០:០០ - ៧៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"ឥឡូវនេះ សូមពិនិត្យមើលម៉ាទ្រីសសុវត្ថិភាពជាក់ស្តែងសម្រាប់ម៉ាស៊ីនចាក់ពុម្ពលេខ ៤!
មើលរបៀបដែលវិធានការសុវត្ថិភាពរោងចក្រស្មុគស្មាញ បំប្លែងទៅជារូបមន្តចម្រុះយ៉ាងស្អាត៖
វិធាន ១៖ ការចាក់សោដំណាក់កាលចាក់ពុម្ព៖
សម្ពាធ >= 180 AND របាំងពន្លឺសុវត្ថិភាពគ្មានឧបសគ្គ AND មិនមែនកំពុងបិទជួសជុល (NOT Lockout)។
វិធាន ២៖ ម៉ាស៊ីនជំនួយទឹកត្រជាក់បន្ទាន់៖
កម្តៅប្រេង > 85 OR កម្តៅបន្ទប់ > 40។
វិធាន ៣៖ ការចុះឈ្មោះបុគ្គលិកបញ្ជា៖
ឈ្មោះមិននៅទទេ (NOT Blank) AND បានធីកថាជាបុគ្គលិកមានវិញ្ញាបនបត្រ។"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge teal-badge">ស្ថាបត្យកម្ម DX កន្លែងធ្វើការ</span>
          <h2 class="slide-title">Apex Plastics៖ ម៉ាទ្រីសសុវត្ថិភាពពហុច្រកទ្វារនៃខ្សែសង្វាក់លេខ ៤</h2>
          <p class="slide-lead">ការបកប្រែបទប្បញ្ញត្តិសុវត្ថិភាពឧស្សាហកម្មពហុឧបករណ៍ចាប់សញ្ញា ទៅជារូបមន្ត Power Fx ចម្រុះដ៏ស្អាតស្អំ។</p>
        </div>

        <div class="form-blueprint-grid">
          <div class="form-preview-card">
            <div class="form-title-bar">ប្លង់សុវត្ថិភាពម៉ាស៊ីនចាក់ពុម្ពលេខ ៤</div>
            <div class="form-field-row">
              <label>វិធាន ១៖ សុវត្ថិភាពដំណាក់កាលចាក់ពុម្ព</label>
              <div class="mock-input"><code>Pressure &gt;= 180 &amp;&amp; CurtainClear &amp;&amp; !Lockout</code></div>
            </div>
            <div class="form-field-row">
              <label>វិធាន ២៖ ម៉ាស៊ីនជំនួយទឹកត្រជាក់</label>
              <div class="mock-input"><code>OilTemp &gt; 85 || AmbientTemp &gt; 40</code></div>
            </div>
            <div class="form-field-row">
              <label>វិធាន ៣៖ ការចូលប្រើប្រាស់របស់បុគ្គលិក</label>
              <div class="mock-input"><code>!IsBlank(txtName.Text) &amp;&amp; chkCertified.Value</code></div>
            </div>
            <div class="form-field-row">
              <label>វិធាន ៤៖ ការបង្ហូរជ័រខូចដោយស្វ័យប្រវត្តិ</label>
              <div class="mock-input"><code>ScrapWeight &gt; 50 || PurgeValveOpen = true</code></div>
            </div>
          </div>

          <div class="schema-mapping-card">
            <h4 style="margin-top:0; color:#38bdf8;">ការបំបែកតក្កវិជ្ជាចម្រុះ៖</h4>
            <div class="mapping-row">
              <span class="field-name">សុវត្ថិភាពចាក់ពុម្ព</span>
              <span class="type-pill pill-bool">ច្រកទ្វារ AND ៣ ជាន់</span>
              <span class="ui-ctrl">Pressure &amp;&amp; Curtain &amp;&amp; !Lockout</span>
            </div>
            <div class="mapping-row">
              <span class="field-name">ម៉ាស៊ីនទឹកត្រជាក់</span>
              <span class="type-pill pill-text">ច្រកទ្វារ OR ២ ជាន់</span>
              <span class="ui-ctrl">OilTemp || RoomTemp</span>
            </div>
            <div class="mapping-row">
              <span class="field-name">សោរប៊ូតុង</span>
              <span class="type-pill pill-date">មិនទទេ &amp;&amp; ពិត</span>
              <span class="ui-ctrl">!IsBlank &amp;&amp; Certified</span>
            </div>
            <div class="mapping-row">
              <span class="field-name">បង្ហូរជ័រខូច</span>
              <span class="type-pill pill-num">ច្រកទ្វារ OR ២ ជាន់</span>
              <span class="ui-ctrl">Scrap &gt; 50 || Valve</span>
            </div>
          </div>
        </div>
      `
    },

    'slide-15': {
      title: 'វេយ្យាករណ៍វាក្យសម្ព័ន្ធ Power Fx',
      segment: 'ផ្នែកទី ៥៖ ការអនុវត្តដឹកនាំដោយគ្រូ (៦០:០០ - ៧៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"តើយើងសរសេររូបមន្តចម្រុះក្នុង Power Fx យ៉ាងដូចម្តេច?
សូមមើលនៅលើអេក្រង់៖
ឧទាហរណ៍ ១៖ ការប្រើ && ក្នុង If() លើ OnSelect នៃប៊ូតុង៖
If(Value(txtPressure.Text) > 200 && chkValve.Value, Notify('គ្រោះថ្នាក់', Error), Notify('សុវត្ថិភាព', Success))!
ឧទាហរណ៍ ២៖ ការប្រើ || លើ Color នៃស្លាកអក្សរ៖
lblWarning.Color = If(chkSmoke.Value || chkGas.Value, Color.Red, Color.Green)!
ឧទាហរណ៍ ៣៖ ការប្រើ ! សម្រាប់បដិសេធ៖
btnStart.DisplayMode = If(!IsBlank(txtName.Text) && chkSafe.Value, DisplayMode.Edit, DisplayMode.Disabled)!
ទាំងទម្រង់សញ្ញា (&&, ||, !) និងទម្រង់ពាក្យ (And, Or, Not) ដំណើរការដូចគ្នាទាំងស្រុងក្នុង Power Apps。"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge purple-badge">ការតភ្ជាប់ Power Fx</span>
          <h2 class="slide-title">របៀបដែល Power Fx បង្កើតសេចក្តីសម្រេចចិត្តចម្រុះ</h2>
          <p class="slide-lead">ការតភ្ជាប់តក្កវិជ្ជាអាជីវកម្មពហុកត្តា ទៅកាន់ការសរសេរកូដ Power Fx <code>&amp;&amp;</code>, <code>||</code>, និង <code>!</code> ជាក់ស្តែង។</p>
        </div>

        <div class="grid-2-col">
          <div class="code-card">
            <div class="code-header">សកម្មភាពចម្រុះ (OnSelect)</div>
            <pre class="powerfx-code">
<span class="comment">// ១. ទាមទារឱ្យលក្ខខណ្ឌទាំងពីរពិត (AND)</span>
<span class="keyword">If</span>(
    <span class="func">Value</span>(txtPSI.<span class="prop">Text</span>) &gt; 200 &amp;&amp; chkValveOpen.<span class="prop">Value</span>,
    <span class="func">Notify</span>("CRITICAL DANGER: DEPRESSURIZE NOW!", NotificationType.<span class="prop">Error</span>),
    <span class="func">Notify</span>("Pressure normal.", NotificationType.<span class="prop">Success</span>)
);
            </pre>
          </div>

          <div class="code-card">
            <div class="code-header">ការបង្ហាញ UI &amp; សិទ្ធិប្រើប្រាស់</div>
            <pre class="powerfx-code">
<span class="comment">// ២. លក្ខខណ្ឌណាមួយក៏បង្កការព្រមានបានដែរ (OR)</span>
lblWarning.<span class="prop">Visible</span> = chkGasLeak.<span class="prop">Value</span> || chkOverheat.<span class="prop">Value</span>;

<span class="comment">// ៣. ដោះសោប៊ូតុងលុះត្រាតែមិនទទេ AND មានវិញ្ញាបនបត្រ</span>
btnSubmit.<span class="prop">DisplayMode</span> = <span class="keyword">If</span>(
    !<span class="func">IsBlank</span>(txtOperator.<span class="prop">Text</span>) &amp;&amp; chkCertified.<span class="prop">Value</span>,
    DisplayMode.<span class="prop">Edit</span>,
    DisplayMode.<span class="prop">Disabled</span>
);
            </pre>
          </div>
        </div>
      `
    },

    'slide-16': {
      title: 'លំដាប់អាទិភាព & ការវាយតម្លៃរហ័ស',
      segment: 'ផ្នែកទី ៥៖ ការអនុវត្តដឹកនាំដោយគ្រូ (៦០:០០ - ៧៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"សូមពិនិត្យមើលគោលគំនិតវិស្វកម្មដ៏សំខាន់ពីរ៖
១. លំដាប់អាទិភាពនៃសញ្ញា (Operator Precedence)៖
ដូចគ្នានឹងគណិតវិទ្យាដែលគុណត្រូវធ្វើមុនបូកដែរ នៅក្នុងតក្កវិជ្ជាកុំព្យូទ័រ AND (&&) ត្រូវបានគណនាមុន OR (||)!
ប្រសិនបើអ្នកសរសេរ៖ A || B && C កម្មវិធីនឹងគណនា B && C មុន!
បើអ្នកចង់បាន (A || B) && C អ្នកត្រូវតែដាក់វង់ក្រចកជុំវិញ (A || B)!
២. ការកាត់ផ្តាច់វាយតម្លៃរហ័ស (Short-Circuit Evaluation)៖
Power Apps គណនាពីឆ្វេងទៅស្តាំ។
ប្រសិនបើសំណួរដំបូងក្នុង AND គឺ FALSE វានឹងឈប់ភ្លាម ហើយមិនដែលទៅគណនាសំណួរទីពីរឡើយ!
សូមមើលទម្រង់ការពារនេះ៖
!IsBlank(txt.Text) && Value(txt.Text) > 10។
បើប្រអប់នៅទទេ !IsBlank គឺ False។ Power Apps ឈប់ភ្លាម! វានឹងមិនដែលព្យាយាមដំណើរការ Value() លើអត្ថបទទទេឡើយ ដែលការពារកុំឱ្យកម្មវិធីគាំង!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge blue-badge">យន្តការតក្កវិជ្ជា</span>
          <h2 class="slide-title">លំដាប់អាទិភាព, វង់ក្រចក &amp; ការកាត់ផ្តាច់វាយតម្លៃរហ័ស</h2>
          <p class="slide-lead">ការស្ទាត់ជំនាញវិធានការដាក់វង់ក្រចក និងការយល់ដឹងពីរបៀបដែល Short-Circuit ការពារកម្មវិធីពីការគាំង។</p>
        </div>

        <div class="conversion-bridge-grid">
          <div class="bridge-card bridge-to-num">
            <div class="bridge-direction">
              <span class="type-pill pill-bool">វិធានអាទិភាព</span>
              <span class="bridge-arrow">&#10142;</span>
              <span class="type-pill pill-text">ការដាក់វង់ក្រចក</span>
            </div>
            <h3>AND ត្រូវបានគណនាមុន OR</h3>
            <p>បើគ្មានវង់ក្រចកទេ <code>A || B &amp;&amp; C</code> ត្រូវបានគណនាជា <code>A || (B &amp;&amp; C)</code>។ ត្រូវប្រើវង់ក្រចកជានិច្ចដើម្បីដាក់ក្រុមវិធានការអាជីវកម្មដែលអ្នកចង់បាន!</p>
            <div class="code-box">
              <code>(chkSigned.Value || chkEscort.Value) &amp;&amp; chkUnlocked.Value</code>
            </div>
            <div class="bridge-note">&#10004; ការប្រើវង់ក្រចកច្បាស់លាស់ ការពារកំហុសអាជីវកម្មស្ងាត់ៗដ៏គ្រោះថ្នាក់។</div>
          </div>

          <div class="bridge-card bridge-to-text">
            <div class="bridge-direction">
              <span class="type-pill pill-num">ខែល Short-Circuit</span>
              <span class="bridge-arrow">&#10142;</span>
              <span class="type-pill pill-date">ការការពារកុំឱ្យគាំង</span>
            </div>
            <h3>ការវាយតម្លៃឈប់មុនកាលកំណត់</h3>
            <p>ប្រសិនបើសំណួរដំបូងនៃច្រក <code>&amp;&amp;</code> គឺ False នោះ Power Apps នឹងឈប់ភ្លាមៗ ហើយមិនដែលទៅគណនាសំណួរទីពីរឡើយ។</p>
            <div class="code-box">
              <code>!IsBlank(txtHours.Text) &amp;&amp; Value(txtHours.Text) &gt; 4.0</code>
            </div>
            <div class="bridge-note">&#9888; ការពារកំហុសនៅពេលបំប្លែងអត្ថបទដែលនៅទទេទៅជាតួលេខ!</div>
          </div>
        </div>
      `
    },

    'slide-17': {
      title: 'សេចក្តីសង្ខេបការអនុវត្ត',
      segment: 'ផ្នែកទី ៥៖ ការអនុវត្តដឹកនាំដោយគ្រូ (៦០:០០ - ៧៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"ឥឡូវនេះដល់ពេលសម្រាប់ការអនុវត្តផ្ទាល់របស់អ្នកហើយ!
អ្នកគឺជាស្ថាបត្យករស្វ័យប្រវត្តិកម្មដែលទទួលខុសត្រូវលើខ្សែសង្វាក់ផលិតកម្មលេខ ៤។
អ្នកគ្រប់គ្រងរោងចក្របានប្រគល់សេណារីយ៉ូចម្រុះចំនួន ៦ ដល់អ្នក៖
១. សម្ពាធ > 200 AND វ៉ានបិទជិត។
២. កម្តៅ > 90 OR ទឹកត្រជាក់ < 15%។
៣. កាតសម្គាល់មិនទទេ AND ជាវេនព្រឹក។
៤. វត្ថុធាតុឆេះ OR រកឃើញផ្កាភ្លើង។
៥. ជ័រខូច > 50 kg AND លេខកូដកំហុសមិនមែន 0។
៦. ធុងកម្រិត >= 95% AND មិនមែនកំពុងបង្ហូរចេញ។
នៅស្លាយបន្ទាប់ ចូរតាមដានសេណារីយ៉ូនីមួយៗឆ្លងកាត់ច្រកតក្កវិជ្ជារបស់វា!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge teal-badge">សេចក្តីសង្ខេបបញ្ហាប្រឈម</span>
          <h2 class="slide-title">ការអនុវត្តផ្ទាល់៖ បន្ទះពហុច្រកទ្វារនៃខ្សែសង្វាក់លេខ ៤</h2>
          <p class="slide-lead">វិភាគសេណារីយ៉ូចម្រុះនៃប្រតិបត្តិការទាំង ៦ ខាងក្រោម មុនពេលវាយតម្លៃផ្លូវតក្កវិជ្ជារួមរបស់ពួកវា។</p>
        </div>

        <div class="parts-brief-grid">
          <div class="brief-item">
            <span class="brief-num">1</span>
            <div>
              <strong>សម្ពាធលើស &amp; វ៉ានបិទ</strong>
              <p>វិធាន៖ <code>Pressure &gt; 200 &amp;&amp; ValveClosed = true</code> &bull; ជាក់ស្តែង៖ 240 PSI, វ៉ាន៖ បិទ។</p>
            </div>
          </div>
          <div class="brief-item">
            <span class="brief-num">2</span>
            <div>
              <strong>កម្តៅខ្ពស់ OR ទឹកត្រជាក់ទាប</strong>
              <p>វិធាន៖ <code>Temp &gt; 90 || Coolant &lt; 15</code> &bull; ជាក់ស្តែង៖ Temp = 82°C, ទឹកត្រជាក់ = 8%។</p>
            </div>
          </div>
          <div class="brief-item">
            <span class="brief-num">3</span>
            <div>
              <strong>បានវាយកាត &amp; វេនព្រឹក</strong>
              <p>វិធាន៖ <code>!IsBlank(Badge) &amp;&amp; Shift = "Morning"</code> &bull; ជាក់ស្តែង៖ Badge = "", វេន៖ Morning។</p>
            </div>
          </div>
          <div class="brief-item">
            <span class="brief-num">4</span>
            <div>
              <strong>ឆេះ OR រកឃើញផ្កាភ្លើង</strong>
              <p>វិធាន៖ <code>IsFlammable || SparksDetected</code> &bull; ជាក់ស្តែង៖ ឆេះ៖ false, ផ្កាភ្លើង៖ false។</p>
            </div>
          </div>
          <div class="brief-item">
            <span class="brief-num">5</span>
            <div>
              <strong>ជ័រខូចលើស AND មានលេខកូដកំហុស</strong>
              <p>វិធាន៖ <code>ScrapKg &gt; 50 &amp;&amp; ErrorCode &lt;&gt; 0</code> &bull; ជាក់ស្តែង៖ ជ័រខូច = 65 kg, កំហុស៖ 0។</p>
            </div>
          </div>
          <div class="brief-item">
            <span class="brief-num">6</span>
            <div>
              <strong>ធុងពេញ AND មិនមែនកំពុងបង្ហូរ</strong>
              <p>វិធាន៖ <code>Level &gt;= 95 &amp;&amp; !DrainOpen</code> &bull; ជាក់ស្តែង៖ កម្រិត = 98%, DrainOpen: false។</p>
            </div>
          </div>
        </div>
      `
    },

    'slide-18': {
      title: 'កម្មវិធីត្រាប់តាមតក្កវិជ្ជាចម្រុះ',
      segment: 'ផ្នែកទី ៥៖ ការអនុវត្តដឹកនាំដោយគ្រូ (៦០:០០ - ៧៥:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"នេះជាកម្មវិធីត្រាប់តាមតក្កវិជ្ជាចម្រុះ Compound Logic Simulator របស់អ្នក!
សម្រាប់សេណារីយ៉ូនីមួយៗក្នុងចំណោម ៦ សូមអានវិធានការ និងទិន្នន័យជាក់ស្តែង រួចចុចជ្រើសរើសថាតើសកម្មភាពណាដែលនឹងដំណើរការ៖ ផ្លូវ A (True) ឬ ផ្លូវ B (False)!
សូមកត់សម្គាល់៖
ក្នុងសេណារីយ៉ូ ១៖ 240 > 200 គឺ True ហើយ ValveClosed គឺ True ➔ ផ្លូវ A ដំណើរការ!
ក្នុងសេណារីយ៉ូ ២៖ Temp គឺ 82 (False) ប៉ុន្តែទឹកត្រជាក់គឺ 8% (True)! ដោយសារវាជាច្រក OR ➔ ផ្លូវ A ដំណើរការ!
ក្នុងសេណារីយ៉ូ ៣៖ កាតនៅទទេ! ដោយសារវាជាច្រក AND ➔ ផ្លូវ B ដំណើរការ!
តោះមើលថាតើអ្នកអាចទទួលបានពិន្ទុពេញ ៦ លើ ៦ ដែរឬទេ!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge green-badge">ការអនុវត្តជាក់ស្តែង</span>
          <h2 class="slide-title">កម្មវិធីត្រាប់តាមអន្តរកម្ម៖ តក្កវិជ្ជាចម្រុះ ៦ សេណារីយ៉ូ</h2>
          <p class="slide-lead">តាមដានសេណារីយ៉ូនីមួយៗខាងក្រោម។ ជ្រើសរើសផ្លូវដែលដំណើរការដោយផ្អែកលើលទ្ធផលពិតនៃច្រកទ្វារ។</p>
        </div>

        <div class="evaluator-grid-container" id="compound-simulator-widget">
          <div class="evaluator-card" data-scenario="s1" data-correct="path-a">
            <div class="cond-title">1. សម្ពាធលើស៖ <code>240 &gt; 200 &amp;&amp; Closed</code></div>
            <div class="cond-btn-pair">
              <button class="cond-btn" data-choice="path-a">ផ្លូវ A៖ បញ្ចេញសម្ពាធអាសន្ន</button>
              <button class="cond-btn" data-choice="path-b">ផ្លូវ B៖ បន្តដំណើរការធម្មតា</button>
            </div>
            <div class="cond-status-text">ជ្រើសរើសផ្លូវ A ឬ ផ្លូវ B</div>
          </div>

          <div class="evaluator-card" data-scenario="s2" data-correct="path-a">
            <div class="cond-title">2. ទឹកត្រជាក់៖ <code>82 &gt; 90 || 8 &lt; 15</code></div>
            <div class="cond-btn-pair">
              <button class="cond-btn" data-choice="path-a">ផ្លូវ A៖ បើកម៉ាស៊ីនបូមជំនួយ</button>
              <button class="cond-btn" data-choice="path-b">ផ្លូវ B៖ កង្ហារធម្មតា</button>
            </div>
            <div class="cond-status-text">ជ្រើសរើសផ្លូវ A ឬ ផ្លូវ B</div>
          </div>

          <div class="evaluator-card" data-scenario="s3" data-correct="path-b">
            <div class="cond-title">3. ការចូលប្រើ៖ <code>!Blank("") &amp;&amp; Morning</code></div>
            <div class="cond-btn-pair">
              <button class="cond-btn" data-choice="path-a">ផ្លូវ A៖ ដោះសោស្ថានីយ</button>
              <button class="cond-btn" data-choice="path-b">ផ្លូវ B៖ ចាក់សោការចូល</button>
            </div>
            <div class="cond-status-text">ជ្រើសរើសផ្លូវ A ឬ ផ្លូវ B</div>
          </div>

          <div class="evaluator-card" data-scenario="s4" data-correct="path-b">
            <div class="cond-title">4. គ្រោះថ្នាក់៖ <code>false || false</code></div>
            <div class="cond-btn-pair">
              <button class="cond-btn" data-choice="path-a">ផ្លូវ A៖ ជម្លៀសមនុស្សចេញ</button>
              <button class="cond-btn" data-choice="path-b">ផ្លូវ B៖ ខ្យល់អាកាសធម្មតា</button>
            </div>
            <div class="cond-status-text">ជ្រើសរើសផ្លូវ A ឬ ផ្លូវ B</div>
          </div>

          <div class="evaluator-card" data-scenario="s5" data-correct="path-b">
            <div class="cond-title">5. ជ័រខូច៖ <code>65 &gt; 50 &amp;&amp; 0 &lt;&gt; 0</code></div>
            <div class="cond-btn-pair">
              <button class="cond-btn" data-choice="path-a">ផ្លូវ A៖ បន្លឺសំឡេងរោទិ៍</button>
              <button class="cond-btn" data-choice="path-b">ផ្លូវ B៖ កត់ត្រាវេនធម្មតា</button>
            </div>
            <div class="cond-status-text">ជ្រើសរើសផ្លូវ A ឬ ផ្លូវ B</div>
          </div>

          <div class="evaluator-card" data-scenario="s6" data-correct="path-a">
            <div class="cond-title">6. បិទធុង៖ <code>98 &gt;= 95 &amp;&amp; !false</code></div>
            <div class="cond-btn-pair">
              <button class="cond-btn" data-choice="path-a">ផ្លូវ A៖ កាត់ផ្តាច់លំហូរចូល</button>
              <button class="cond-btn" data-choice="path-b">ផ្លូវ B៖ បន្តបញ្ចូលទឹក</button>
            </div>
            <div class="cond-status-text">ជ្រើសរើសផ្លូវ A ឬ ផ្លូវ B</div>
          </div>
        </div>

        <div class="evaluator-footer-bar">
          <span>ពិន្ទុ៖ <strong id="sim-score">0</strong> / 6 ត្រឹមត្រូវ</span>
          <span id="sim-feedback">ជ្រើសរើសផ្លូវសកម្មភាពសម្រាប់សេណារីយ៉ូទាំង ៦ ខាងលើ។</span>
        </div>
      `
    },

    'slide-19': {
      title: 'ការយល់ខុសទូទៅរបស់អ្នកទើបចាប់ផ្តើម',
      segment: 'ផ្នែកទី ៦៖ ការវាយតម្លៃ & ស្ពានទៅមុខ (៧៥:០០ - ៩០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"សូមក្រឡេកមើលការយល់ខុសទូទៅទាំង ៤ ដែលអ្នកទើបចាប់ផ្តើមតែងតែជួបប្រទះ៖
កំហុស ១៖ ការកាត់បន្ថយតាមការនិយាយ៖
មនុស្សជាច្រើនសរសេរ៖ Status = 'Approved' || 'Pending'។
ការកែតម្រូវ៖ ខុសវាក្យសម្ព័ន្ធ! || ត្រូវតែនៅចន្លោះសំណួរពេញលេញពីរ! ត្រូវសរសេរ៖ Status = 'Approved' || Status = 'Pending'!
កំហុស ២៖ ការច្រឡំរវាងពាក្យ 'និង' ក្នុងការនិយាយ ជាមួយ AND ក្នុងកុំព្យូទ័រ៖
'បង្ហាញម៉ាស៊ីននៅខ្សែសង្វាក់ ១ និងខ្សែសង្វាក់ ២' ➔ ក្នុងតក្កវិជ្ជា ម៉ាស៊ីនតែមួយមិនអាចនៅខ្សែសង្វាក់ទាំងពីរក្នុងពេលតែមួយបានទេ! អ្នកត្រូវតែប្រើ OR (Line = 1 || Line = 2)!
កំហុស ៣៖ ការប្រើបដិសេធខុសច្បាប់ De Morgan៖
ដើម្បីឱ្យប្រាកដថាប្រអប់ទាំងពីរមិនទទេ ការសរសេរ !IsBlank(A) || !IsBlank(B) នឹងបរាជ័យបើមានមួយទទេ! អ្នកត្រូវតែប្រើ &&៖ !IsBlank(A) && !IsBlank(B)!
កំហុស ៤៖ ការសរសេរ = true លើសកម្រិត៖
chkHazard.Value = true && chkSafe.Value = true គឺវែងអន្លាយពេក។ របៀបសរសេរអាជីពគឺ៖ chkHazard.Value && chkSafe.Value!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge red-badge">ការកែតម្រូវផ្នត់គំនិត</span>
          <h2 class="slide-title">ការយល់ខុសទូទៅទាំង ៤ របស់អ្នកទើបចាប់ផ្តើម &amp; វិធីកែតម្រូវ</h2>
          <p class="slide-lead">កែតម្រូវផ្នត់គំនិតដែលមើលទៅហាក់ដូចជាត្រូវ ប៉ុន្តែបង្កគ្រោះថ្នាក់ មុនពេលវាក្លាយជាទម្លាប់មិនល្អ។</p>
        </div>

        <div class="grid-2-col">
          <div class="misconception-card">
            <div class="misc-bad">&#10060; ផ្នត់គំនិតខុស #១</div>
            <h4>"ខ្ញុំអាចសរសេរ៖ Status = 'Approved' || 'Pending'"</h4>
            <p class="misc-fix"><strong>ការកែតម្រូវ៖</strong> <code>||</code> អាចភ្ជាប់បានតែសំណួរប្រៀបធៀបពេញលេញប៉ុណ្ណោះ។ អ្នកត្រូវតែសរសេរ៖ <code>Status = "Approved" || Status = "Pending"</code>។</p>
          </div>

          <div class="misconception-card">
            <div class="misc-bad">&#10060; ផ្នត់គំនិតខុស #២</div>
            <h4>"ពាក្យ 'និង' ក្នុងការនិយាយ មានន័យស្មើ AND (&&)"</h4>
            <p class="misc-fix"><strong>ការកែតម្រូវ៖</strong> ក្នុងការនិយាយ យើងនិយាយថា 'បង្ហាញខ្សែសង្វាក់ ១ និង ២'។ ប៉ុន្តែក្នុងតក្កវិជ្ជា ទំនិញមួយមិនអាចនៅខ្សែសង្វាក់ពីរក្នុងពេលតែមួយបានទេ។ អ្នកត្រូវតែប្រើ <code>Line = 1 || Line = 2</code>!</p>
          </div>

          <div class="misconception-card">
            <div class="misc-bad">&#10060; ផ្នត់គំនិតខុស #៣</div>
            <h4>"ដើម្បីទាមទារមិនទទេទាំងពីរ ត្រូវប្រើ !IsBlank(A) || !IsBlank(B)"</h4>
            <p class="misc-fix"><strong>ការកែតម្រូវ៖</strong> បើ A មានទិន្នន័យ <code>||</code> នឹងចេញ True ទោះបីជា B នៅទទេក៏ដោយ! ដើម្បីទាមទារឱ្យប្រអប់ទាំងពីរមានទិន្នន័យ អ្នកត្រូវតែប្រើ <code>!IsBlank(A) &amp;&amp; !IsBlank(B)</code>។</p>
          </div>

          <div class="misconception-card">
            <div class="misc-bad">&#10060; ផ្នត់គំនិតខុស #៤</div>
            <h4>"ខ្ញុំត្រូវតែសរសេរ \`chkHazard.Value = true\` ជានិច្ច"</h4>
            <p class="misc-fix"><strong>ការកែតម្រូវ៖</strong> ប្រអប់ធីកបញ្ចេញតម្លៃ Boolean រួចជាស្រេច។ ការសរសេរ <code>= true</code> គឺដូចជាសួរថា 'តើវាពិតទេដែលវាពិត?'។ ចូរសរសេរកូដអាជីពស្អាត៖ <code>chkHazard.Value</code>។</p>
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
          <h2 class="slide-title">ការផ្ទៀងផ្ទាត់ចំណេះដឹងវាយតម្លៃនៃថ្ងៃទី ៦</h2>
          <p class="slide-lead">ឆ្លើយសំណួរទាំង ៥ ដើម្បីផ្ទៀងផ្ទាត់ភាពស្ទាត់ជំនាញរបស់អ្នកលើ AND, OR, NOT, លំដាប់អាទិភាព និង Short-Circuit។</p>
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
      title: 'បញ្ហាប្រឈមចុងក្រោយ៖ ការបញ្ជូនសារធាតុគីមី',
      segment: 'ផ្នែកទី ៦៖ ការវាយតម្លៃ & ស្ពានទៅមុខ (៧៥:០០ - ៩០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"នេះជាបញ្ហាប្រឈមចុងក្រោយ Capstone Challenge នៃថ្ងៃទី ៦ របស់យើង៖
រោងចក្រ Apex Plastics កំពុងដាក់ដំណើរការកន្លែងបញ្ជូនសំណល់សារធាតុគីមីគ្រោះថ្នាក់។
អ្នកត្រូវតែសរសេរវិធានការ Power Fx ចម្រុះទាំង ៨៖
១. ទម្ងន់លើស ១០០០ AND ជាសារធាតុគីមី ➔ បញ្ជូនរថយន្តការពារធុនធ្ងន់។
២. ធ្លាយឧស្ម័ន OR សំឡេងរោទិ៍ភ្លើង ➔ បន្លឺស៊ីរ៉ែនរោងចក្រ។
៣. កាតមិនទទេ AND មានវិញ្ញាបនបត្រ ➔ បើកប៊ូតុងបញ្ជូន។
៤. ថ្ងៃអាទិត្យ OR ម៉ោង >= 22 ➔ ពិធីការវេនយប់។
៥. PSI > 250 AND កម្តៅ > 100 ➔ ស្លាកពណ៌ក្រហម។
៦. កម្រិតធុង >= 95% AND មិនមែនកំពុងបង្ហូរ ➔ បិទវ៉ានលំហូរចូល។
៧. ឈ្មោះអ្នកបើកបរមិនទទេ AND បានចុះហត្ថលេខា ➔ អនុម័តឯកសារ។
៨. ស្តុក < 10 OR ការកុម្ម៉ង់បន្ទាន់ ➔ បញ្ជាទិញបន្ថែមបន្ទាន់។"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge purple-badge">បញ្ហាប្រឈមឯករាជ្យ</span>
          <h2 class="slide-title">បញ្ហាប្រឈមចុងក្រោយ៖ ប្រព័ន្ធសុវត្ថិភាពបញ្ជូនសារធាតុគីមី Hazmat</h2>
          <p class="slide-lead">សរសេររូបមន្ត <code>If()</code> ចម្រុះពេញលេញទាំង ៨ ដើម្បីគ្រប់គ្រងការស្តុកទុកសារធាតុគីមី និងការអនុញ្ញាតទ្វារចេញចូល។</p>
        </div>

        <div class="challenge-table-wrapper">
          <table class="challenge-table">
            <thead>
              <tr>
                <th>#</th>
                <th>វិធានការអាជីវកម្មប្រតិបត្តិការ</th>
                <th>ច្រកទ្វារលក្ខខណ្ឌចម្រុះ</th>
                <th>សកម្មភាពបើ TRUE (Then)</th>
                <th>សកម្មភាពបើ FALSE (Else)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>រថយន្តការពារសារធាតុធ្ងន់</td><td><code>Weight &gt; 1000 &amp;&amp; IsHazmat</code></td><td>បញ្ជូនរថយន្តការពារ</td><td>ឆ្លងកាត់ផែធម្មតា</td></tr>
              <tr><td>2</td><td>សំឡេងស៊ីរ៉ែនអាសន្ន</td><td><code>GasLeak || FireAlarm</code></td><td>បន្លឺស៊ីរ៉ែនជម្លៀសខ្លួន</td><td>ភ្លើងបៃតងសុវត្ថិភាព</td></tr>
              <tr><td>3</td><td>ពិនិត្យកាត &amp; វិញ្ញាបនបត្រ</td><td><code>!IsBlank(Badge) &amp;&amp; Certified</code></td><td>Button.Edit (ដោះសោ)</td><td>Button.Disabled</td></tr>
              <tr><td>4</td><td>ផ្លូវវេនយប់ / ចុងសប្តាហ៍</td><td><code>Day = "Sunday" || Hour &gt;= 22</code></td><td>អនុវត្តពិធីការវេនយប់</td><td>អនុវត្តពិធីការវេនថ្ងៃ</td></tr>
              <tr><td>5</td><td>គ្រោះថ្នាក់កម្រិតទ្វេ</td><td><code>PSI &gt; 250 &amp;&amp; Temp &gt; 100</code></td><td>ពណ៌ស្លាក = ក្រហម</td><td>ពណ៌ស្លាក = ខៀវ</td></tr>
              <tr><td>6</td><td>បិទការហៀរធុង</td><td><code>Level &gt;= 95 &amp;&amp; !DrainOpen</code></td><td>បិទវ៉ានលំហូរចូល</td><td>បើកវ៉ានលំហូរចូល</td></tr>
              <tr><td>7</td><td>ការផ្ទៀងផ្ទាត់ឯកសារបញ្ជូន</td><td><code>!IsBlank(Driver) &amp;&amp; Signed</code></td><td>អនុម័តឯកសារ</td><td>ផ្អាកឯកសារទុក</td></tr>
              <tr><td>8</td><td>ច្រកទ្វារបញ្ជាទិញស្តុក</td><td><code>Stock &lt; 10 || IsUrgent</code></td><td>បញ្ជាទិញពីអ្នកផ្គត់ផ្គង់</td><td>រក្សាស្តុកដដែល</td></tr>
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
ចុចលើប៊ូតុង 'បង្ហាញចម្លើយ' ដើម្បីពិនិត្យមើលរូបមន្តជាក់ស្តែង។
សូមកត់សម្គាល់ថារូបមន្តនីមួយៗមានភាពស្អាតស្អំយ៉ាងណា៖
If(ConditionA && ConditionB, ActionTrue, ActionFalse)។
សូមប្រៀបធៀបរូបមន្តរបស់អ្នកជាមួយរូបប្រឡងវាយតម្លៃកម្រិតទាំង ៤ របស់យើង៖
កម្រិត ៤ (Mastery) មានន័យថារូបមន្តទាំង ៨ សុទ្ធតែត្រឹមត្រូវឥតខ្ចោះ ទាំងសញ្ញាតក្កវិជ្ជា និងការបំប្លែង Value()!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge green-badge">គំរូ &amp; រូបប្រឡង</span>
          <h2 class="slide-title">ដំណោះស្រាយបញ្ហាប្រឈម &amp; រូបប្រឡងវាយតម្លៃ ៤ កម្រិត</h2>
          <p class="slide-lead">ប្រៀបធៀបរូបមន្តចម្រុះរបស់អ្នកជាមួយស្តង់ដារផលិតកម្ម និងវាយតម្លៃសមត្ថភាពផ្ទាល់ខ្លួនរបស់អ្នក។</p>
        </div>

        <div class="grid-2-col">
          <div class="solution-card">
            <div class="solution-header">
              <h4>រូបមន្តគំរូ Power Fx ចម្រុះ</h4>
              <button class="btn-reveal" id="btn-reveal-solution">បង្ហាញចម្លើយ</button>
            </div>
            <div class="solution-body collapsed" id="solution-content">
              <ul class="solution-list">
                <li><strong>1. Escort:</strong> <code>If(Value(txtWeight.Text) &gt; 1000 &amp;&amp; chkHazmat.Value, "DISPATCH ESCORT", "STANDARD DOCK")</code></li>
                <li><strong>2. Siren:</strong> <code>If(chkGasLeak.Value || chkFireAlarm.Value, SoundAlarm(), GreenLight())</code></li>
                <li><strong>3. Access:</strong> <code>If(!IsBlank(txtBadge.Text) &amp;&amp; chkCertified.Value, DisplayMode.Edit, DisplayMode.Disabled)</code></li>
                <li><strong>4. Shift:</strong> <code>If(txtDay.Text = "Sunday" || Hour(Now()) &gt;= 22, "NIGHT_PROTOCOL", "DAY_PROTOCOL")</code></li>
                <li><strong>5. Danger:</strong> <code>If(Value(txtPSI.Text) &gt; 250 &amp;&amp; Value(txtTemp.Text) &gt; 100, Color.Red, Color.Blue)</code></li>
                <li><strong>6. Cutoff:</strong> <code>If(Value(txtLevel.Text) &gt;= 95 &amp;&amp; !chkDrainOpen.Value, CloseValve(), OpenValve())</code></li>
                <li><strong>7. Sign-in:</strong> <code>If(!IsBlank(txtDriver.Text) &amp;&amp; chkSigned.Value, true, false)</code></li>
                <li><strong>8. Reorder:</strong> <code>If(Value(txtStock.Text) &lt; 10 || chkUrgentOrder.Value, ReorderParts(), InStock())</code></li>
              </ul>
            </div>
          </div>

          <div class="rubric-card">
            <h4>រូបប្រឡងវាយតម្លៃ (៤ កម្រិតសមត្ថភាព)</h4>
            <div class="rubric-levels">
              <div class="level-item level-4">
                <span class="lvl-title">កម្រិត ៤៖ ស្ទាត់ជំនាញ (១០០%)</span>
                <p>រូបមន្តទាំង ៨ ត្រឹមត្រូវឥតខ្ចោះ; ប្រើប្រាស់ &amp;&amp;, ||, ! បានត្រឹមត្រូវ; រុំ Value() បានត្រឹមត្រូវ។</p>
              </div>
              <div class="level-item level-3">
                <span class="lvl-title">កម្រិត ៣៖ កម្រិតខ្ពស់ (៧៥-៩៩%)</span>
                <p>រូបមន្ត ៦-៧ ត្រឹមត្រូវ; យល់ច្បាស់ពី AND និង OR; មានកំហុសអក្ខរាវិរុទ្ធឈ្មោះ property បន្តិចបន្តួច។</p>
              </div>
              <div class="level-item level-2">
                <span class="lvl-title">កម្រិត ២៖ កំពុងអភិវឌ្ឍ (៥០-៧៤%)</span>
                <p>ច្រឡំ &amp;&amp; ជាមួយ ||; ភ្លេចប្រើ Value(); ពិបាកយល់ពីសញ្ញាបដិសេធ (!)。</p>
              </div>
              <div class="level-item level-1">
                <span class="lvl-title">កម្រិត ១៖ អ្នកចាប់ផ្តើម (&lt;៥០%)</span>
                <p>ប្រើការកាត់បន្ថយតាមការនិយាយ (A = 1 || 2); មិនទាន់អាចបង្កើតច្រកតក្កវិជ្ជាត្រឹមត្រូវ។</p>
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
"សូមមើលផែនទីតភ្ជាប់ ៣ ថ្ងៃរបស់យើង។
កាលពីម្សិលមិញនៅថ្ងៃទី ៥៖ យើងបានរៀនការសម្រេចចិត្ត IF លក្ខខណ្ឌទោល (គន្លឹះផ្លូវដែកទោល)។
ថ្ងៃនេះនៅថ្ងៃទី ៦៖ យើងបានរួមបញ្ចូលលក្ខខណ្ឌជាច្រើនដោយប្រើ AND, OR, និង NOT (សោរពីរបើកទូដែក)។
ថ្ងៃស្អែកនៅថ្ងៃទី ៧៖ ឥឡូវនេះនៅពេលយើងចេះទិន្នន័យ លក្ខខណ្ឌ និងការសម្រេចចិត្តហើយ យើងនឹងឈានចូលដំណាក់កាលទី ៣៖ ការគិតបែបអាជីវកម្ម (Business Thinking)!
ថ្ងៃស្អែក យើងនឹងរៀបចំការសម្រេចចិត្ត និងសកម្មភាពទាំងនេះ ឱ្យទៅជាលំហូរដំណើរការអាជីវកម្ម និងគំនូសព្រាងផ្ទាំងកម្មវិធីពេញលេញ!
អ្វីៗទាំងអស់សុទ្ធតែតភ្ជាប់គ្នា ជំនាញមួយបើកផ្លូវឱ្យជំនាញបន្ទាប់!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge purple-badge">ស្ពានកម្មវិធីសិក្សា</span>
          <h2 class="slide-title">ផែនទីតភ្ជាប់កម្មវិធីសិក្សាបីថ្ងៃជាប់គ្នា</h2>
          <p class="slide-lead">របៀបដែល IF ទោលម្សិលមិញ ច្រកទ្វារចម្រុះថ្ងៃនេះ និងលំហូរដំណើរការអាជីវកម្មថ្ងៃស្អែក បង្កើតបានជាការវិវឌ្ឍជាបន្តបន្ទាប់។</p>
        </div>

        <div class="bridge-three-col">
          <div class="bridge-col before-col">
            <span class="bridge-time-tag">ម្សិលមិញ (ថ្ងៃ ៥)</span>
            <h3>ការសម្រេចចិត្ត IF ទោល</h3>
            <div class="bridge-summary">
              <code>If()</code> ទទួលយកការវិនិច្ឆ័យ True/False តែមួយ ហើយជ្រើសរើសរវាងសកម្មភាព A និង B (គន្លឹះផ្លូវដែកទោល)។
            </div>
            <div class="bridge-flow-arrow">&#10142; ពង្រីកបន្ថែមដោយ...</div>
          </div>

          <div class="bridge-col today-col">
            <span class="bridge-time-tag">ថ្ងៃនេះ (ថ្ងៃ ៦)</span>
            <h3>ការរួមបញ្ចូលលក្ខខណ្ឌ (AND / OR / NOT)</h3>
            <div class="bridge-summary">
              លក្ខខណ្ឌជាច្រើនត្រូវបានរួមបញ្ចូលទៅជាការវិនិច្ឆ័យតែមួយតាមរយៈ <code>&amp;&amp;</code>, <code>||</code>, និង <code>!</code> (សោរពីរបើកទូដែក)។
            </div>
            <div class="bridge-flow-arrow">&#10142; រៀបចំចូលទៅក្នុង...</div>
          </div>

          <div class="bridge-col next-col">
            <span class="bridge-time-tag">ថ្ងៃស្អែក (ថ្ងៃ ៧)</span>
            <h3>ដំណើរការអាជីវកម្ម &amp; គំនូសព្រាង</h3>
            <div class="bridge-summary">
              ការរៀបចំទិន្នន័យចូល ច្រកទ្វារតក្កវិជ្ជា និងសកម្មភាព ឱ្យទៅជាលំហូរការងារអាជីវកម្មពេញលេញ និងគំនូសព្រាងផ្ទាំងកម្មវិធី។
            </div>
          </div>
        </div>
      `
    },

    'slide-24': {
      title: 'កិច្ចការផ្ទះ & បញ្ជីពាក្យបច្ចេកទេស',
      segment: 'ផ្នែកទី ៦៖ ការវាយតម្លៃ & ស្ពានទៅមុខ (៧៥:០០ - ៩០:០០)',
      notes: `កំណត់ចំណាំរបស់អ្នកបណ្តុះបណ្តាល (TRAINER SCRIPT):
"សូមអបអរសាទរចំពោះការបញ្ចប់ថ្ងៃទី ៦! ឥឡូវនេះអ្នកមានសមត្ថភាពបង្កើតវិធានការអាជីវកម្មពហុកត្តាក្នុងពិភពពិតហើយ!
នេះជាកិច្ចការផ្ទះរំលឹកចំណេះដឹង ១៥ នាទី៖ 'The Double-Lock Tracker'។
ស្វែងរកការសម្រេចចិត្តចម្រុះចំនួន ៣ ក្នុងជីវិតប្រចាំថ្ងៃរបស់អ្នក៖
១. មួយដែលប្រើ AND (ឧ. ម៉ោងរោទិ៍ AND ម៉ោង >= 06:00)។
២. មួយដែលប្រើ OR (ឧ. ភ្លៀង OR កម្តៅ < 15°C)។
៣. មួយដែលប្រើ NOT (ឧ. ទូទឹកកកមិនទទេ)។
ពិនិត្យមើលបញ្ជីពាក្យបច្ចេកទេសទ្វេភាសាខាងក្រោម។
សូមអរគុណសម្រាប់ការយកចិត្តទុកដាក់ដ៏អស្ចារ្យ។ ជួបគ្នានៅថ្ងៃស្អែកក្នុងដំណាក់កាលទី ៣៖ Business Process & Wireframing!"`,
      html: `
        <div class="slide-header">
          <span class="slide-badge blue-badge">ការបញ្ចប់មេរៀន</span>
          <h2 class="slide-title">កិច្ចការផ្ទះ ១៥ នាទី &amp; បញ្ជីពាក្យបច្ចេកទេសទ្វេភាសា</h2>
          <p class="slide-lead">ពង្រឹងតក្កវិជ្ជាចម្រុះក្នុងបរិយាកាសប្រចាំថ្ងៃរបស់អ្នក និងស្ទាត់ជំនាញវាក្យសព្ទបច្ចេកទេសពហុច្រកទ្វារ។</p>
        </div>

        <div class="grid-2-col">
          <div class="homework-card">
            <div class="hw-icon">&#128269;</div>
            <div class="hw-content">
              <h4>កិច្ចការផ្ទះ៖ "The Double-Lock Tracker" (&le; ១៥ នាទី)</h4>
              <p>១. កំណត់ <strong>ការសម្រេចចិត្តចម្រុះ ៣ ក្នុងជីវិតពិត</strong> ដែលអ្នកធ្វើរាល់ថ្ងៃ (មួយ AND, មួយ OR, មួយ NOT)។</p>
              <p>២. សរសេរនីមួយៗជាទម្រង់ស្តង់ដារ៖ <code>If ( ConditionA &amp;&amp; ConditionB , TrueAction , FalseAction )</code>។</p>
              <p>៣. កត់ត្រាថាតើសកម្មភាពណាដែលអ្នកបានអនុវត្តជាក់ស្តែងនៅថ្ងៃនេះ!</p>
              <div class="hw-outcome">លទ្ធផលរំពឹងទុក៖ រូបមន្តចម្រុះចំនួន ៣ ដែលបានសរសេររួចរាល់សម្រាប់ចែករំលែកថ្ងៃស្អែក!</div>
            </div>
          </div>

          <div class="glossary-card">
            <h4>បញ្ជីពាក្យបច្ចេកទេសទ្វេភាសា (ថ្ងៃទី ៦)</h4>
            <div class="glossary-list">
              <div class="gloss-item">
                <span class="en-term">Compound Condition</span>
                <span class="kh-term">លក្ខខណ្ឌចម្រុះ / ច្រកទ្វាររួម</span>
              </div>
              <div class="gloss-item">
                <span class="en-term">AND Gate (&&)</span>
                <span class="kh-term">ច្រក AND (និង - ត្រូវតែពិតទាំងអស់)</span>
              </div>
              <div class="gloss-item">
                <span class="en-term">OR Gate (||)</span>
                <span class="kh-term">ច្រក OR (ឬ - យ៉ាងហោចពិតមួយ)</span>
              </div>
              <div class="gloss-item">
                <span class="en-term">NOT Gate (!)</span>
                <span class="kh-term">ច្រក NOT (មិន - បញ្ច្រាសការពិត)</span>
              </div>
              <div class="gloss-item">
                <span class="en-term">Operator Precedence</span>
                <span class="kh-term">លំដាប់អាទិភាពនៃសញ្ញាគណនា</span>
              </div>
              <div class="gloss-item">
                <span class="en-term">Short-Circuit Evaluation</span>
                <span class="kh-term">ការកាត់ផ្តាច់វាយតម្លៃរហ័សការពារកំហុស</span>
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
  // 7. INTERACTIVE WIDGET: MULTI-GATE DECISION WORKBENCH (Slide 12)
  // --------------------------------------------------------------------------
  let isWorkbenchHazardActive = false;

  function initWorkbench() {
    const pressureSlider = document.getElementById('wb-pressure-slider');
    const coolantSlider = document.getElementById('wb-coolant-slider');
    const opInput = document.getElementById('wb-op-input');
    const hazardBtn = document.getElementById('wb-hazard-btn');

    if (!pressureSlider || !coolantSlider) return;

    pressureSlider.addEventListener('input', () => {
      const valEl = document.getElementById('wb-pressure-val');
      if (valEl) valEl.textContent = pressureSlider.value;
      updateWorkbenchEvaluation();
    });

    coolantSlider.addEventListener('input', () => {
      const valEl = document.getElementById('wb-coolant-val');
      if (valEl) valEl.textContent = coolantSlider.value;
      updateWorkbenchEvaluation();
    });

    if (opInput) {
      opInput.addEventListener('input', () => {
        updateWorkbenchEvaluation();
      });
    }

    if (hazardBtn) {
      hazardBtn.onclick = () => {
        isWorkbenchHazardActive = !isWorkbenchHazardActive;
        const ind = hazardBtn.querySelector('.toggle-indicator');
        if (ind) {
          ind.className = `toggle-indicator ${isWorkbenchHazardActive ? 'on' : 'off'}`;
        }
        hazardBtn.innerHTML = isWorkbenchHazardActive
          ? '<span class="toggle-indicator on"></span> 🚨 Hazard: YES (true)'
          : '<span class="toggle-indicator off"></span> Hazard: NO (false)';
        updateWorkbenchEvaluation();
      };
    }

    updateWorkbenchEvaluation();
  }

  function updateWorkbenchEvaluation() {
    const pressureSlider = document.getElementById('wb-pressure-slider');
    const coolantSlider = document.getElementById('wb-coolant-slider');
    const opInput = document.getElementById('wb-op-input');
    const resultCard = document.getElementById('card-alert-branch');
    const branchIndicator = document.getElementById('branch-indicator');
    const branchTitle = document.getElementById('branch-title');
    const branchDesc = document.getElementById('branch-desc');
    const submitBtn = document.getElementById('demo-submit-btn');

    if (!pressureSlider || !coolantSlider || !resultCard) return;

    const pressure = parseInt(pressureSlider.value, 10);
    const coolant = parseInt(coolantSlider.value, 10);
    const operatorName = opInput ? opInput.value.trim() : '';

    // Rule: Pressure > 200 && Coolant < 20
    const isCritical = pressure > 200 && coolant < 20;

    if (isCritical) {
      resultCard.className = 'decision-result-card status-critical';
      if (branchIndicator) branchIndicator.textContent = isKhmerActive ? 'ផ្លូវ TRUE សកម្ម៖ ការបិទម៉ាស៊ីនបន្ទាន់' : 'TRUE PATH ACTIVE: Critical Shutdown';
      if (branchTitle) {
        branchTitle.textContent = isKhmerActive ? '🚨 គ្រោះថ្នាក់៖ កាត់ផ្តាច់ភ្លើងកម្តៅ & បញ្ចេញសម្ពាធជាបន្ទាន់!' : '🚨 EMERGENCY: CUT HEATERS & DEPRESSURIZE!';
        branchTitle.style.color = '#fb7185';
      }
      if (branchDesc) {
        branchDesc.textContent = isKhmerActive
          ? `រកឃើញទាំងសម្ពាធខ្ពស់ (${pressure} > 200 PSI) និងទឹកត្រជាក់ទាប (${coolant} < 20%)! ប្រព័ន្ធសុវត្ថិភាពកាត់ផ្តាច់ដើម្បីការពារការខ្លោចជ័រ។`
          : `Both high pressure (${pressure} > 200 PSI) AND low coolant (${coolant} < 20%) detected! Automatic interlock triggered to prevent resin scorching.`;
      }
    } else {
      resultCard.className = 'decision-result-card status-routine';
      if (branchIndicator) branchIndicator.textContent = isKhmerActive ? 'ផ្លូវ FALSE សកម្ម៖ ប្រតិបត្តិការធម្មតា' : 'FALSE PATH ACTIVE: Normal Operation';
      if (branchTitle) {
        branchTitle.textContent = isKhmerActive ? '📢 ដំណើរការក្នុងកម្រិតសុវត្ថិភាព' : '📢 Operating Within Safe Envelope';
        branchTitle.style.color = '#38bdf8';
      }
      if (branchDesc) {
        branchDesc.textContent = isKhmerActive
          ? `លក្ខខណ្ឌទាំងពីរត្រូវតែ True ទើបបិទម៉ាស៊ីន (បច្ចុប្បន្ន៖ សម្ពាធ ${pressure} PSI, ទឹកត្រជាក់ ${coolant}%)។ ស្ថានភាពសុវត្ថិភាពត្រូវបានរក្សា។`
          : `Both conditions must be True for shutdown (Current: Pressure ${pressure} PSI, Coolant ${coolant}%). Safe operational status maintained.`;
      }
    }

    // Button Rule: !IsBlank(Name) && !Hazard
    const canSubmit = operatorName.length > 0 && !isWorkbenchHazardActive;
    if (submitBtn) {
      submitBtn.disabled = !canSubmit;
      if (canSubmit) {
        submitBtn.style.opacity = '1.0';
        submitBtn.style.background = 'var(--fluent-green)';
        submitBtn.innerHTML = isKhmerActive ? '&#10004; ចាប់ផ្តើមដំណើរការចាក់ពុម្ព (អនុញ្ញាត)' : '&#10004; Start Injection Stroke (Authorized)';
      } else {
        submitBtn.style.opacity = '0.4';
        submitBtn.style.background = 'rgba(30, 38, 58, 0.85)';
        const reason = operatorName.length === 0
          ? (isKhmerActive ? 'ត្រូវការកាតសម្គាល់' : 'Badge Required')
          : (isKhmerActive ? 'មានគ្រោះថ្នាក់សកម្ម' : 'Hazard Active');
        submitBtn.innerHTML = `&#128274; ${isKhmerActive ? 'ចាប់ផ្តើមដំណើរការចាក់ពុម្ព (ចាក់សោ៖ ' + reason + ')' : 'Start Injection Stroke (Locked: ' + reason + ')'}`;
      }
    }
  }

  // --------------------------------------------------------------------------
  // 8. INTERACTIVE WIDGET: 6-SCENARIO COMPOUND SIMULATOR (Slide 18)
  // --------------------------------------------------------------------------
  const userSimChoices = {};

  function initSimulator() {
    const cards = document.querySelectorAll('.evaluator-card');
    cards.forEach(card => {
      const scenarioId = card.getAttribute('data-scenario');
      const correctChoice = card.getAttribute('data-correct');
      const btns = card.querySelectorAll('.cond-btn');

      btns.forEach(btn => {
        btn.onclick = () => {
          const choice = btn.getAttribute('data-choice');
          userSimChoices[scenarioId] = choice;

          // Clear previous highlights in this card
          btns.forEach(b => b.classList.remove('selected-true', 'selected-false'));

          const isCorrect = choice === correctChoice;
          btn.classList.add(isCorrect ? 'selected-true' : 'selected-false');

          const statusText = card.querySelector('.cond-status-text');
          if (statusText) {
            statusText.textContent = isCorrect
              ? (isKhmerActive ? '✓ ត្រឹមត្រូវណាស់! ផ្លូវនេះត្រូវបានដំណើរការ។' : '✓ Correct! This branch executes.')
              : (isKhmerActive ? '✗ មិនត្រឹមត្រូវទេ។ សូមពិនិត្យលក្ខខណ្ឌឡើងវិញ។' : '✗ Incorrect. Re-check the logic gate.');
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
      if (userSimChoices[scenarioId] === correctChoice) {
        correctCount++;
      }
    });

    const scoreEl = document.getElementById('sim-score');
    const feedbackEl = document.getElementById('sim-feedback');

    if (scoreEl) scoreEl.textContent = correctCount;
    if (feedbackEl) {
      if (correctCount === 6) {
        feedbackEl.textContent = isKhmerActive
          ? '🌟 អស្ចារ្យណាស់! អ្នកបានឆ្លើយត្រូវទាំង ៦ សេណារីយ៉ូ!'
          : '🌟 Perfect! You mastered all 6 compound logic scenarios!';
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
    initWorkbench();
    initSimulator();
    initQuiz();
    initSolutionToggle();
  }

  // --------------------------------------------------------------------------
  // 12. GLOBAL EVENT LISTENERS & KEYBOARD CONTROLS
  // --------------------------------------------------------------------------
  function initKeyboardControls() {
    document.addEventListener('keydown', (e) => {
      // Ignore keystrokes when typing into text inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
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
