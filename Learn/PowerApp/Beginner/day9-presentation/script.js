/**
 * ============================================================================
 * POWER APPS FOUNDATION: DAY 9 PRESENTATION JAVASCRIPT ENGINE
 * Topic: Model a Complete Business Flow
 * Phase: Phase 3: Business Thinking
 * Architecture: Zero-Dependency Pure Vanilla JS (16:9 PowerPoint-Style Stage)
 * Features: Non-Destructive Bilingual Swapping, 90-Min Timer, 4 Live Widgets
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. DATA STRUCTURES: QUIZ & SIMULATOR
  // --------------------------------------------------------------------------
  const QUIZ_QUESTIONS = [
    {
      qEn: "1. What are the 6 universal stages of every complete business flow?",
      qKh: "១. តើ ៦ ដំណាក់កាលជាសកលនៃគ្រប់ដំណើរការអាជីវកម្មពេញលេញមានអ្វីខ្លះ?",
      optionsEn: [
        "A) Problem ➔ Request ➔ Review ➔ Decision ➔ Work ➔ Complete",
        "B) Start ➔ Code ➔ Test ➔ Deploy ➔ Delete ➔ Exit",
        "C) Email ➔ Phone Call ➔ Excel ➔ Meeting ➔ Sign-off ➔ Archive",
        "D) Input ➔ Output ➔ Storage ➔ Logic ➔ Print ➔ Finish"
      ],
      optionsKh: [
        "A) បញ្ហា ➔ ស្នើសុំ ➔ ពិនិត្យ ➔ សម្រេចចិត្ត ➔ អនុវត្ត ➔ បញ្ចប់ (Problem ➔ Request ➔ Review ➔ Decision ➔ Work ➔ Complete)",
        "B) ចាប់ផ្តើម ➔ សរសេរកូដ ➔ តេស្ត ➔ ដាក់ឱ្យប្រើ ➔ លុប ➔ ចេញ",
        "C) អ៊ីមែល ➔ ទូរស័ព្ទ ➔ Excel ➔ ប្រជុំ ➔ ចុះហត្ថលេខា ➔ បណ្ណសារ",
        "D) បញ្ចូល ➔ បញ្ចេញ ➔ ផ្ទុក ➔ តក្កវិជ្ជា ➔ បោះពុម្ព ➔ បញ្ចប់"
      ],
      correctIndex: 0,
      explanationEn: "Correct! Every operational workflow deconstructs into these 6 stages: Problem, Request, Review, Decision, Work, and Complete.",
      explanationKh: "ត្រឹមត្រូវ! រាល់ដំណើរការប្រតិបត្តិការតែងតែបំបែកចេញជា ៦ ដំណាក់កាលនេះ៖ បញ្ហា, ស្នើសុំ, ពិនិត្យ, សម្រេចចិត្ត, អនុវត្ត និង បញ្ចប់។"
    },
    {
      qEn: "2. WHY does every stage in a business flow require exactly ONE designated owner at any given moment?",
      qKh: "២. ហេតុអ្វីបានជារាល់ដំណាក់កាលក្នុងដំណើរការអាជីវកម្ម ទាមទារឱ្យមានម្ចាស់ទទួលខុសត្រូវតែម្នាក់គត់នៅពេលណាមួយ?",
      optionsEn: [
        "A) To save memory on mobile phones",
        "B) To prevent the 'dropped baton' disaster where everyone assumes someone else is handling the next step",
        "C) Because Microsoft Power Apps can only store one username in a database",
        "D) To prevent operators from taking lunch breaks"
      ],
      optionsKh: [
        "A) ដើម្បីសន្សំទំហំមេម៉ូរីនៅលើទូរស័ព្ទដៃ",
        "B) ដើម្បីការពារគ្រោះមហន្តរាយ 'ធ្លាក់ឈើបញ្ជូនបន្ត' (Dropped Baton) ដែលមនុស្សគ្រប់គ្នាច្រឡំគិតថាអ្នកផ្សេងកំពុងធ្វើជំហានបន្ទាប់",
        "C) ពីព្រោះ Microsoft Power Apps អាចផ្ទុកឈ្មោះអ្នកប្រើប្រាស់បានតែម្នាក់គត់ក្នុងទិន្នន័យ",
        "D) ដើម្បីការពារកុំឱ្យបុគ្គលិកសម្រាកបាយថ្ងៃត្រង់"
      ],
      correctIndex: 1,
      explanationEn: "Correct! When ownership is ambiguous, work dies in the silence between people. A single clear owner guarantees accountability at every handoff.",
      explanationKh: "ត្រឹមត្រូវ! នៅពេលភាពជាម្ចាស់មិនច្បាស់លាស់ ការងារនឹងត្រូវជាប់គាំងនៅចន្លោះមនុស្ស។ ម្ចាស់ច្បាស់លាស់តែម្នាក់ធានាបាននូវការទទួលខុសត្រូវនៅគ្រប់ការផ្ទេរការងារ។"
    },
    {
      qEn: "3. WHAT HAPPENS IF a QC inspector rejects a repaired tooling die, but the developer forgot to build a Rework Loop into the app?",
      qKh: "៣. តើមានអ្វីកើតឡើង ប្រសិនបើអ្នកត្រួតពិនិត្យគុណភាពបដិសេធពុម្ពដែលជួសជុលរួច ប៉ុន្តែអ្នកបង្កើតកម្មវិធីភ្លេចបង្កើត 'រង្វិលជុំកែតម្រូវ' (Rework Loop)?",
      optionsEn: [
        "A) The app automatically repairs the tooling die using artificial intelligence",
        "B) The ticket either terminates prematurely (losing repair history) or gets closed despite being broken, shipping defective parts to customers",
        "C) The computer screen turns completely green",
        "D) The operator's salary is automatically refunded"
      ],
      optionsKh: [
        "A) កម្មវិធីនឹងជួសជុលពុម្ពនោះដោយស្វ័យប្រវត្តិតាមរយៈបញ្ញាសិប្បនិម្មិត (AI)",
        "B) សំណើនឹងត្រូវកាត់ផ្តាច់មុនកំណត់ (បាត់បង់ប្រវត្តិជួសជុល) ឬត្រូវបិទទាំងខូច ដែលនាំឱ្យដឹកជញ្ជូនទំនិញខូចទៅអតិថិជន",
        "C) អេក្រង់កុំព្យូទ័រនឹងប្រែទៅជាពណ៌បៃតងទាំងស្រុង",
        "D) ប្រាក់ខែរបស់អ្នកបញ្ជាម៉ាស៊ីននឹងត្រូវសងត្រឡប់មកវិញដោយស្វ័យប្រវត្តិ"
      ],
      correctIndex: 1,
      explanationEn: "Correct! Without a Rework Loop, the app cannot route failed parts back to the technician while preserving the original work order history.",
      explanationKh: "ត្រឹមត្រូវ! ប្រសិនបើគ្មាន Rework Loop កម្មវិធីមិនអាចបញ្ជូនសម្ភារៈមិនគ្រប់ស្តង់ដារត្រឡប់ទៅជាងវិញដោយរក្សាប្រវត្តិការងារដើមបានឡើយ។"
    },
    {
      qEn: "4. Which Power Fx formula ensures that the 'Approve' button is only visible to Supervisors when a ticket is awaiting review?",
      qKh: "៤. តើរូបមន្ត Power Fx មួយណាដែលធានាថាប៊ូតុង 'Approve' បង្ហាញសម្រាប់តែ Supervisor ហើយលុះត្រាតែសំណើនោះស្ថិតក្នុងស្ថានភាព 'Submitted'?",
      optionsEn: [
        "A) btnApprove.Visible = (UserRole = 'Supervisor') && (Status = 'Submitted')",
        "B) btnApprove.Visible = If(UserRole = 'Operator', True, False)",
        "C) btnApprove.Color = Color.Blue",
        "D) btnApprove.Visible = Status = 'Closed'"
      ],
      optionsKh: [
        "A) btnApprove.Visible = (UserRole = 'Supervisor') && (Status = 'Submitted')",
        "B) btnApprove.Visible = If(UserRole = 'Operator', True, False)",
        "C) btnApprove.Color = Color.Blue",
        "D) btnApprove.Visible = Status = 'Closed'"
      ],
      correctIndex: 0,
      explanationEn: "Correct! The && (AND) operator requires BOTH conditions to be True: the user must be a Supervisor AND the ticket must be in Submitted status.",
      explanationKh: "ត្រឹមត្រូវ! សញ្ញា && (AND) តម្រូវឱ្យលក្ខខណ្ឌទាំងពីរចេញ True ព្រមគ្នា៖ អ្នកប្រើត្រូវតែជា Supervisor ហើយសំណើត្រូវតែស្ថិតក្នុងស្ថានភាព Submitted។"
    },
    {
      qEn: "5. WHY should an app automatically lock a work order into DisplayMode.View once it reaches the 'Closed' status?",
      qKh: "៥. ហេតុអ្វីបានជាកម្មវិធីគួរចាក់សោទម្រង់ការងារឱ្យទៅជា DisplayMode.View ដោយស្វ័យប្រវត្តិ នៅពេលវាដល់ស្ថានភាព 'Closed'?",
      optionsEn: [
        "A) To save electricity in the factory server room",
        "B) To guarantee historical immutability, preventing accidental or illegal tampering after quality audit sign-off",
        "C) Because Power Apps stops running when a ticket is completed",
        "D) Because closed work orders must be sent by fax"
      ],
      optionsKh: [
        "A) ដើម្បីសន្សំសំចៃអគ្គិសនីនៅក្នុងបន្ទប់ម៉ាស៊ីនមេនៃរោងចក្រ",
        "B) ដើម្បីធានានូវភាពមិនអាចកែប្រែបាននៃទិន្នន័យប្រវត្តិសាស្ត្រ ការពារការកែប្រែដោយអចេតនា ឬខុសច្បាប់ក្រោយសវនកម្មគុណភាព",
        "C) ពីព្រោះ Power Apps ឈប់ដំណើរការនៅពេលការងារត្រូវបានបញ្ចប់",
        "D) ពីព្រោះសំណើដែលបិទរួចត្រូវតែផ្ញើចេញតាមរយៈម៉ាស៊ីនទូរសារ (Fax)"
      ],
      correctIndex: 1,
      explanationEn: "Correct! Immutability after completion protects accounting records, legal compliance, and ISO quality auditing standards.",
      explanationKh: "ត្រឹមត្រូវ! ការមិនអនុញ្ញាតឱ្យកែប្រែក្រោយពេលបញ្ចប់ ជួយការពារសុពលភាពគណនេយ្យ សវនកម្មផ្លូវច្បាប់ និងស្តង់ដារគុណភាព ISO។"
    }
  ];

  const SIMULATOR_SCENARIOS = [
    {
      id: 1,
      num: "Scenario 1",
      titleEn: "Safety Emergency: Hydraulic Leak",
      titleKh: "អាសន្នសុវត្ថិភាព៖ លេចធ្លាយប្រេងធារាសាស្ត្រ",
      descEn: "Press #2 is spraying hydraulic fluid near a high-voltage panel. Should this ticket wait for standard 3-day supervisor review?",
      descKh: "ម៉ាស៊ីនលេខ ២ កំពុងបាញ់ប្រេងក្បែរទូភ្លើងតង់ស្យុងខ្ពស់។ តើសំណើនេះគួររង់ចាំការពិនិត្យ ៣ ថ្ងៃតាមធម្មតាដែរឬទេ?",
      choiceA_En: "Bypass to Emergency Maintenance",
      choiceA_Kh: "វាងកាត់ទៅក្រុមជួសជុលបន្ទាន់ភ្លាមៗ",
      choiceB_En: "Wait for Weekly Supervisor Review",
      choiceB_Kh: "រង់ចាំការពិនិត្យប្រចាំសប្តាហ៍",
      correct: "A",
      feedbackEn: "Correct! Safety emergencies bypass standard review gates via: If(Priority = 'Emergency', RouteToEmergency, StandardRoute).",
      feedbackKh: "ត្រឹមត្រូវ! ករណីអាសន្នសុវត្ថិភាព ត្រូវវាងកាត់ការពិនិត្យធម្មតាតាមរយៈ៖ If(Priority = 'Emergency', RouteToEmergency, StandardRoute)។"
    },
    {
      id: 2,
      num: "Scenario 2",
      titleEn: "Budget Threshold: $4,800 Tooling",
      titleKh: "កម្រិតថវិកា៖ គ្រឿងបន្លាស់ $4,800",
      descEn: "CNC machining replacement die quote is $4,800. Shift supervisor budget cap is $2,000. Who must approve?",
      descKh: "តម្លៃគ្រឿងបន្លាស់ម៉ាស៊ីន CNC គឺ $4,800។ កម្រិតសិទ្ធិរបស់ Supervisor គឺត្រឹម $2,000។ តើអ្នកណាត្រូវអនុម័ត?",
      choiceA_En: "Supervisor Self-Approves",
      choiceA_Kh: "Supervisor អនុម័តដោយខ្លួនឯង",
      choiceB_En: "Escalate to Plant Manager",
      choiceB_Kh: "បញ្ជូនបន្តទៅប្រធានរោងចក្រ (Plant Manager)",
      correct: "B",
      feedbackEn: "Correct! Financial governance requires: If(Cost > 2000, 'Plant Manager', 'Shift Supervisor').",
      feedbackKh: "ត្រឹមត្រូវ! ការគ្រប់គ្រងហិរញ្ញវត្ថុតម្រូវឱ្យមានក្បួន៖ If(Cost > 2000, 'Plant Manager', 'Shift Supervisor')។"
    },
    {
      id: 3,
      num: "Scenario 3",
      titleEn: "Incomplete Request: Missing Machine ID",
      titleKh: "សំណើមិនពេញលេញ៖ ខ្វះលេខសម្គាល់ម៉ាស៊ីន",
      descEn: "Operator logged 'Machine broken' without serial number or photo. How should supervisor respond in the flow?",
      descKh: "បុគ្គលិកបានសរសេរថា 'ម៉ាស៊ីនខូច' ដោយគ្មានលេខកូដ ឬរូបថត។ តើ Supervisor គួរឆ្លើយតបយ៉ាងណាក្នុងលំហូរ?",
      choiceA_En: "Set Status to 'Needs More Info'",
      choiceA_Kh: "ដាក់ស្ថានភាព 'Needs More Info'",
      choiceB_En: "Permanently Delete the Record",
      choiceB_Kh: "លុបទិន្នន័យចោលជាអចិន្ត្រៃយ៍",
      correct: "A",
      feedbackEn: "Correct! 'Needs More Info' passes the baton back to the operator to correct data without destroying ticket history.",
      feedbackKh: "ត្រឹមត្រូវ! ស្ថានភាព 'Needs More Info' បញ្ជូនឈើត្រឡប់ទៅបុគ្គលិកវិញដើម្បីបំពេញបន្ថែម ដោយមិនបាត់បង់ប្រវត្តិការងារឡើយ។"
    },
    {
      id: 4,
      num: "Scenario 4",
      titleEn: "Technician Illness Mid-Repair",
      titleKh: "ជាងជួសជុលឈឺពេលកំពុងធ្វើការ",
      descEn: "Dave called in sick with the flu mid-repair on Press #6. How does the flow handle re-assignment?",
      descKh: "ជាង Dave បានសុំច្បាប់ឈឺពេលកំពុងជួសជុលម៉ាស៊ីនលេខ ៦។ តើលំហូរការងារដោះស្រាយការចាត់តាំងថ្មីយ៉ាងដូចម្តេច?",
      choiceA_En: "Lead Reassigns AssignedTech to Sarah",
      choiceA_Kh: "ប្រធានជាងប្តូរ AssignedTech ទៅឱ្យ Sarah",
      choiceB_En: "Any Operator Can Take Over",
      choiceB_Kh: "បុគ្គលិកណាក៏អាចចូលធ្វើបានដែរ",
      correct: "A",
      feedbackEn: "Correct! Role governance ensures only the Maintenance Lead can re-assign the owner while keeping status 'In Repair'.",
      feedbackKh: "ត្រឹមត្រូវ! ការគ្រប់គ្រងតួនាទីធានាថាមានតែប្រធានជាងប៉ុណ្ណោះដែលអាចប្តូរឈ្មោះជាងទទួលខុសត្រូវ ដោយរក្សាស្ថានភាព 'In Repair' ដដែល។"
    },
    {
      id: 5,
      num: "Scenario 5",
      titleEn: "QC Tolerance Failure",
      titleKh: "ការត្រួតពិនិត្យគុណភាពមិនជាប់ស្តង់ដារ",
      descEn: "Machined tooling die tolerance is 0.08mm (threshold is 0.02mm). What is the architectural next step?",
      descKh: "ពុម្ពដែកដែលកែច្នៃរួចមានគម្លាត 0.08mm (ស្តង់ដារអនុញ្ញាតត្រឹម 0.02mm)។ តើជំហានស្ថាបត្យកម្មបន្ទាប់គឺអ្វី?",
      choiceA_En: "Trigger Rework Loop (In Repair)",
      choiceA_Kh: "ដំណើរការរង្វិលជុំកែតម្រូវ (Rework Loop)",
      choiceB_En: "Close and Ship to Customer",
      choiceB_Kh: "បិទបញ្ចប់ ហើយដឹកជូនអតិថិជន",
      correct: "A",
      feedbackEn: "Correct! A Rework Loop preserves the ticket ID, logs rework labor, and returns the baton to the technician.",
      feedbackKh: "ត្រឹមត្រូវ! Rework Loop រក្សាទុកលេខកូដសំបុត្រការងារដើម កត់ត្រាម៉ោងការងារបន្ថែម និងបញ្ជូនបន្តទៅឱ្យជាងវិញ។"
    },
    {
      id: 6,
      num: "Scenario 6",
      titleEn: "Post-Repair Quality Sign-off",
      titleKh: "ការចុះហត្ថលេខាទទួលស្គាល់គុណភាព",
      descEn: "Tooling mold test-stamped 100 perfect automotive trim parts with zero defects. What happens to the ticket?",
      descKh: "ពុម្ពដែកបានវាយតេស្តគ្រឿងបន្លាស់ ១០០ ដុំបានយ៉ាងល្អឥតខ្ចោះ។ តើមានអ្វីកើតឡើងចំពោះសំបុត្រការងារ?",
      choiceA_En: "Mark 'Closed' & Lock Form to View",
      choiceA_Kh: "ដាក់ 'Closed' & ចាក់សោទម្រង់ត្រឹម View",
      choiceB_En: "Keep in Draft Mode Indefinitely",
      choiceB_Kh: "ទុកក្នុងស្ថានភាព Draft រហូត",
      correct: "A",
      feedbackEn: "Correct! Terminal closure locks the record into DisplayMode.View for audit compliance and historical integrity.",
      feedbackKh: "ត្រឹមត្រូវ! ដំណាក់កាលបញ្ចប់ត្រូវចាក់សោទិន្នន័យឱ្យទៅជា DisplayMode.View ដើម្បីអនុលោមតាមសវនកម្មគុណភាព។"
    }
  ];

  // --------------------------------------------------------------------------
  // 2. KHMER SLIDES DICTIONARY (EXACT 1-TO-1 DOM MIRRORING)
  // --------------------------------------------------------------------------
  const KHMER_SLIDES = [
    // Slide 1: Welcome
    {
      title: "ស្វាគមន៍ & ចំណងជើងមេរៀន",
      content: `
        <div class="hero-badge-row">
          <span class="pill pill-phase">ដំណាក់កាលទី ៣៖ ការគិតបែបអាជីវកម្ម</span>
          <span class="pill pill-accent">ថ្ងៃទី ៩ នៃ ២៧</span>
          <span class="pill pill-time">៩០ នាទី</span>
        </div>
        <h1 class="hero-title">បង្កើតគំរូលំហូរអាជីវកម្មពេញលេញ</h1>
        <p class="hero-subtitle">តភ្ជាប់បញ្ហា, ការស្នើសុំ, ការពិនិត្យ, ការសម្រេចចិត្ត, ការអនុវត្ត និងការចុះហត្ថលេខាបញ្ចប់ ទៅជាលំហូរប្រតិបត្តិការតែមួយ ដោយគ្មានការធ្លាក់ឈើបញ្ជូនបន្ត។</p>
        <div class="hero-connection-card">
          <div class="chain-label">ខ្សែសង្វាក់តភ្ជាប់ថ្ងៃនេះ (CONNECTION CHAIN):</div>
          <div class="chain-nodes">
            <span class="chain-node active">បញ្ហា</span>
            <span class="chain-arrow">➔</span>
            <span class="chain-node active">ស្នើសុំ</span>
            <span class="chain-arrow">➔</span>
            <span class="chain-node active">ពិនិត្យ</span>
            <span class="chain-arrow">➔</span>
            <span class="chain-node active">សម្រេច</span>
            <span class="chain-arrow">➔</span>
            <span class="chain-node active">អនុវត្ត</span>
            <span class="chain-arrow">➔</span>
            <span class="chain-node active">បញ្ចប់</span>
          </div>
        </div>
        <div class="hero-action-row">
          <button class="fluent-btn-primary" id="hero-start-btn">ចាប់ផ្តើមមេរៀន ៩០ នាទី (Space / ➔)</button>
          <span class="hero-shortcut-hint">ផ្លូវកាត់៖ [Space] បន្ទាប់ • [N] កំណត់សម្គាល់ • [L] ប្តូរភាសា • [O] ប្លង់រួម</span>
        </div>
      `
    },
    // Slide 2: 27-Day Curriculum Arc
    {
      title: "គំនូរបំព្រួញកម្មវិធីសិក្សា ២៧ ថ្ងៃ",
      content: `
        <div class="slide-header">
          <span class="section-tag">ស្ថាបត្យកម្មកម្មវិធីសិក្សា</span>
          <h2>គំរូផ្នត់គំនិតមេសម្រាប់ Citizen Developers</h2>
          <p class="subtitle">ការអភិវឌ្ឍ Power Apps មិនមែនជាប្រធានបទដាច់ដោយឡែកទាំង ២៧ នោះទេ។ វាជាប្រព័ន្ធមានជីវិតតែមួយដែលរីកចម្រើនជាលំដាប់។</p>
        </div>
        <div class="curriculum-flow-grid">
          <div class="curr-card passed">
            <span class="card-step">០១</span>
            <span class="card-title">បញ្ហាពិត</span>
            <span class="card-phase">វគ្គ ១៖ គោលដៅ</span>
          </div>
          <div class="curr-card passed">
            <span class="card-step">០២</span>
            <span class="card-title">លំដាប់លំដោយ</span>
            <span class="card-phase">វគ្គ ១៖ លំដាប់</span>
          </div>
          <div class="curr-card passed">
            <span class="card-step">០៣</span>
            <span class="card-title">ទិន្នន័យ &amp; ប្រភេទ</span>
            <span class="card-phase">វគ្គ ១៖ ការចងចាំ</span>
          </div>
          <div class="curr-card passed">
            <span class="card-step">០៤</span>
            <span class="card-title">លក្ខខណ្ឌ</span>
            <span class="card-phase">វគ្គ ២៖ True/False</span>
          </div>
          <div class="curr-card passed">
            <span class="card-step">០៥</span>
            <span class="card-title">ការសម្រេចចិត្ត (IF)</span>
            <span class="card-phase">វគ្គ ២៖ សកម្មភាព</span>
          </div>
          <div class="curr-card passed">
            <span class="card-step">០៦</span>
            <span class="card-title">AND / OR</span>
            <span class="card-phase">វគ្គ ២៖ ក្បួនច្បាប់</span>
          </div>
          <div class="curr-card passed">
            <span class="card-step">០៧</span>
            <span class="card-title">ឱកាសកម្មវិធី</span>
            <span class="card-phase">វគ្គ ៣៖ វិសាលភាព</span>
          </div>
          <div class="curr-card passed">
            <span class="card-step">០៨</span>
            <span class="card-title">លំហូរការងារ &amp; ស្ថានភាព</span>
            <span class="card-phase">វគ្គ ៣៖ ផ្នែកនានា</span>
          </div>
          <div class="curr-card current-spot">
            <div class="curr-pulse"></div>
            <span class="card-step">០៩</span>
            <span class="card-title">លំហូរអាជីវកម្ម</span>
            <span class="card-phase">វគ្គ ៣៖ ថ្ងៃនេះ!</span>
          </div>
          <div class="curr-card upcoming">
            <span class="card-step">១០</span>
            <span class="card-title">ការផ្ទុកទិន្នន័យ</span>
            <span class="card-phase">វគ្គ ៤៖ តារាងទិន្នន័យ</span>
          </div>
        </div>
        <div class="today-focus-banner">
          <span class="focus-icon">🎯</span>
          <span class="focus-text"><strong>ចំណុចសំខាន់ថ្ងៃនេះ៖</strong> កាលពីម្សិលមិញយើងបានរៀនអំពីផ្នែកនៃលំហូរការងារ និងអត្ថន័យស្ថានភាព។ ថ្ងៃនេះ យើងផ្គុំដំណើរការរោងចក្រទាំងមូល៖ <em>បញ្ហា ➔ ស្នើសុំ ➔ ពិនិត្យ ➔ សម្រេច ➔ អនុវត្ត ➔ បញ្ចប់</em>។</span>
        </div>
      `
    },
    // Slide 3: Objectives
    {
      title: "គោលបំណងសិក្សា ៤ យ៉ាង",
      content: `
        <div class="slide-header">
          <span class="section-tag">ចំណាត់ថ្នាក់ពុទ្ធិវិស័យ (BLOOM'S TAXONOMY)</span>
          <h2>ជំនាញជាក់ស្តែងទាំង ៤ ដែលអ្នកនឹងទទួលបានថ្ងៃនេះ</h2>
          <p class="subtitle">នៅត្រឹមនាទីទី ៩០:០០ អ្នកនឹងអាចរៀបចំផែនការ និងគ្រប់គ្រងដំណើរការការងារណាមួយដោយឯករាជ្យ។</p>
        </div>
        <div class="objectives-grid">
          <div class="obj-card">
            <div class="obj-num">១</div>
            <div class="obj-body">
              <span class="obj-badge">ការបំបែកធាតុ (Bloom Level 4)</span>
              <h3>គូសផែនទី ៦ ដំណាក់កាលជាសកល</h3>
              <p>បំបែកប្រតិបត្តិការដោយដៃដ៏រញ៉េរញ៉ៃឱ្យទៅជា៖ បញ្ហា ➔ ស្នើសុំ ➔ ពិនិត្យ ➔ សម្រេច ➔ អនុវត្ត ➔ បញ្ចប់។</p>
            </div>
          </div>
          <div class="obj-card">
            <div class="obj-num">២</div>
            <div class="obj-body">
              <span class="obj-badge">ការកំណត់តួនាទី (Bloom Level 3)</span>
              <h3>ចាត់តាំងដ្យាក្រាមតាមតួនាទី (Swimlane) (Swimlanes) &amp; ភាពជាម្ចាស់</h3>
              <p>កំណត់តួនាទីទទួលខុសត្រូវតែមួយគត់នៅគ្រប់ដំណាក់កាល ដើម្បីលុបបំបាត់ការជាប់គាំងក្នុងការផ្ទេរការងារ។</p>
            </div>
          </div>
          <div class="obj-card">
            <div class="obj-num">៣</div>
            <div class="obj-body">
              <span class="obj-badge">តក្កវិជ្ជានៃលំហូរ (Bloom Level 4)</span>
              <h3>បង្កើតច្រកសម្រេចចិត្ត &amp; រង្វិលជុំកែតម្រូវ</h3>
              <p>រៀបចំផ្លូវរលូន (Happy Path), ផ្លូវបដិសេធ និងរង្វិលជុំកែតម្រូវគុណភាព (QC Rework) ឱ្យត្រូវតាមការពិត។</p>
            </div>
          </div>
          <div class="obj-card">
            <div class="obj-num">៤</div>
            <div class="obj-body">
              <span class="obj-badge">ការគ្រប់គ្រងតាម Power Fx (Bloom Level 5)</span>
              <h3>អនុវត្តក្បួនចាក់សោផ្ទៃផ្ទាំង UI</h3>
              <p>សរសេររូបមន្តបញ្ជាលើ <code>Visible</code> និង <code>DisplayMode</code> ផ្អែកលើដំណាក់កាលបច្ចុប្បន្ន និងតួនាទីអ្នកប្រើប្រាស់។</p>
            </div>
          </div>
        </div>
      `
    },
    // Slide 4: Agenda
    {
      title: "កាលវិភាគ ៩០ នាទី",
      content: `
        <div class="slide-header">
          <span class="section-tag">ពេលវេលាសិក្សា</span>
          <h2>ប្លង់មេរៀន ៩០ នាទីបែបវង់គូទខ្យង (Spiral Learning)</h2>
          <p class="subtitle">រៀបចំជា ៦ វគ្គគរុកោសល្យប្រកបដោយតុល្យភាព ដើម្បីការចងចាំបានយូរ និងការអនុវត្តជាក់ស្តែង។</p>
        </div>
        <div class="agenda-timeline-grid">
          <div class="time-block">
            <div class="time-stamp">00:00 – 10:00</div>
            <div class="time-content">
              <span class="time-badge">វគ្គ ១ (១០ នាទី)</span>
              <h4>រំលឹក &amp; តភ្ជាប់</h4>
              <p>ខ្សែសង្វាក់កម្មវិធីសិក្សា, សំណួររំលឹក ៣ និងគោលបំណងពុទ្ធិវិស័យ។</p>
            </div>
          </div>
          <div class="time-block">
            <div class="time-stamp">10:00 – 25:00</div>
            <div class="time-content">
              <span class="time-badge">វគ្គ ២ (១៥ នាទី)</span>
              <h4>ស្វែងយល់៖ មូលហេតុ</h4>
              <p>មហន្តរាយ $72,000 នៅ Apex Plastics &amp; ឧទាហរណ៍បន្ទប់សង្គ្រោះបន្ទាន់មន្ទីរពេទ្យ។</p>
            </div>
          </div>
          <div class="time-block">
            <div class="time-stamp">25:00 – 45:00</div>
            <div class="time-content">
              <span class="time-badge">វគ្គ ៣ (២០ នាទី)</span>
              <h4>ទ្រឹស្តីស៊ីជម្រៅ</h4>
              <p>៦ ដំណាក់កាល, គន្លងតួនាទី, ច្រកសម្រេច, រង្វិលជុំកែតម្រូវ &amp; ក្បួន Power Fx។</p>
            </div>
          </div>
          <div class="time-block highlight-block">
            <div class="time-stamp">45:00 – 60:00</div>
            <div class="time-content">
              <span class="time-badge">វគ្គ ៤ (១៥ នាទី)</span>
              <h4>ក្តារពិសោធន៍អន្តរកម្ម</h4>
              <p>សម្រាកកាយ (45:00) &amp; បង្ហាញការពិសោធន៍លំហូរការងារជាក់ស្តែង។</p>
            </div>
          </div>
          <div class="time-block">
            <div class="time-stamp">60:00 – 75:00</div>
            <div class="time-content">
              <span class="time-badge">វគ្គ ៥ (១៥ នាទី)</span>
              <h4>ការអនុវត្តជាមួយគ្រូ</h4>
              <p>ការធ្វើរោគវិនិច្ឆ័យ ៦ ស្ថានភាពជាក់ស្តែង &amp; ៤ ការយល់ច្រឡំគ្រោះថ្នាក់។</p>
            </div>
          </div>
          <div class="time-block">
            <div class="time-stamp">75:00 – 90:00</div>
            <div class="time-content">
              <span class="time-badge">វគ្គ ៦ (១៥ នាទី)</span>
              <h4>វាយតម្លៃ &amp; ស្ពានបន្ត</h4>
              <p>តេស្ត ៥ សំណួរ, លំហាត់ Capstone, តារាងវាយតម្លៃ និងស្ពានទៅថ្ងៃទី ១០។</p>
            </div>
          </div>
        </div>
      `
    },
    // Slide 5: Prerequisite Retrieval
    {
      title: "ការរំលឹកចំណេះដឹងមុន",
      content: `
        <div class="slide-header">
          <span class="section-tag">ការរំលឹកចំណេះដឹងសកម្ម</span>
          <h2>ផ្ទៀងផ្ទាត់ចំណេះដឹងមូលដ្ឋានពីថ្ងៃមុន</h2>
          <p class="subtitle">មុននឹងឈានដល់ការបង្កើតលំហូរពេញលេញ ចូរយើងពិនិត្យឡើងវិញនូវចំណុចសំខាន់ពីថ្ងៃទី ៥, ៧ និង ៨។</p>
        </div>
        <div class="retrieval-grid-3">
          <div class="retrieval-card">
            <div class="ret-q-header">
              <span class="ret-badge">គោលគំនិតថ្ងៃទី ៨</span>
              <h4>១. លំហូរការងារ vs បញ្ជីការងារ</h4>
            </div>
            <p class="ret-prompt">"តើអ្វីជាភាពខុសគ្នាជាមូលដ្ឋានរវាងបញ្ជីការងារធម្មតា (To-do list) និងលំហូរការងារ (Workflow)?"</p>
            <div class="ret-answer-box">
              <span class="answer-label">ចម្លើយត្រឹមត្រូវ៖</span>
              <p>បញ្ជីការងារ គឺជាបញ្ជីដាច់ដោយឡែកសម្រាប់មនុស្សម្នាក់។ ចំណែក <strong>លំហូរការងារ</strong> ភ្ជាប់ជំហានបន្តបន្ទាប់, ស្ថានភាពជាក់លាក់, ការសម្រេចចិត្ត និងការផ្ទេរការងាររវាងមនុស្សច្រើននាក់។</p>
            </div>
          </div>
          <div class="retrieval-card">
            <div class="ret-q-header">
              <span class="ret-badge">គោលគំនិតថ្ងៃទី ៨</span>
              <h4>២. ភាពផ្តាច់មុខនៃស្ថានភាព</h4>
            </div>
            <p class="ret-prompt">"ហេតុអ្វីបានជាស្ថានភាពក្នុងលំហូរការងារ ត្រូវតែមានតម្លៃសកម្មតែមួយគត់នៅពេលណាមួយ?"</p>
            <div class="ret-answer-box">
              <span class="answer-label">ចម្លើយត្រឹមត្រូវ៖</span>
              <p>ពីព្រោះតក្កវិជ្ជារបស់កម្មវិធីមិនអាចគ្រប់គ្រងសិទ្ធិ ឬផ្ទាំងអេក្រង់បានទេ ប្រសិនបើសំណើមួយអះអាងថាទាំង 'Submitted' និង 'In Progress' ក្នុងពេលតែមួយ។ ភាពពិតតែមួយការពារភាពរញ៉េរញ៉ៃ។</p>
            </div>
          </div>
          <div class="retrieval-card">
            <div class="ret-q-header">
              <span class="ret-badge">តក្កវិជ្ជាថ្ងៃទី ៥ &amp; ៦</span>
              <h4>៣. សញ្ញាពេជ្រសម្រេចចិត្ត</h4>
            </div>
            <p class="ret-prompt">"តើអ្វីជាអ្នកសម្រេចថា តើលំហូរការងារនឹងត្រូវបែកទៅទិសណា នៅពេលវាជួបផ្លូវបំបែក?"</p>
            <div class="ret-answer-box">
              <span class="answer-label">ចម្លើយត្រឹមត្រូវ៖</span>
              <p>គឺជា <strong>ច្រកលក្ខខណ្ឌ (Condition Gate)</strong>។ វាតេស្តទិន្នន័យធៀបនឹងក្បួនអាជីវកម្ម (ឧ. <code>EstCost &gt; 1000</code>)។ បើ True វាទៅផ្លូវមួយ; បើ False វាទៅផ្លូវមួយទៀត។</p>
            </div>
          </div>
        </div>
      `
    },
    // Slide 6: Case Study
    {
      title: "ករណីសិក្សារោងចក្រ៖ Apex Plastics",
      content: `
        <div class="slide-header">
          <span class="section-tag section-tag-danger">ករណីសិក្សាជាក់ស្តែងក្នុងរោងចក្រ</span>
          <h2>មហន្តរាយ $72,000 ដោយសារ "ការធ្លាក់ឈើបញ្ជូនបន្ត" នៅ Apex Plastics</h2>
          <p class="subtitle">នៅពេលបុគ្គលិកម្នាក់ៗធ្វើការងាររបស់ខ្លួនបានល្អ ប៉ុន្តែលំហូរទាំងមូលត្រូវបរាជ័យក្នុងភាពស្ងៀមស្ងាត់រវាងមនុស្ស។</p>
        </div>
        <div class="crisis-two-col">
          <div class="crisis-timeline-card">
            <div class="incident-badge">ព្រហស្បតិ៍ ០៨:១៥ ព្រឹក — ម៉ាស៊ីនចាក់ពុម្ពលេខ ៦ (PRESS #6)</div>
            <div class="event-step">
              <span class="step-time">08:15 AM</span>
              <p><strong>បុគ្គលិក Bopha</strong> បំពេញក្រដាសស្នើសុំជួសជុលដៃយន្តយន្តដែលរំញ័រខុសប្រក្រតី រួចដាក់ចូលកន្ត្រករបស់ប្រធាន។</p>
            </div>
            <div class="event-step">
              <span class="step-time">09:00 AM</span>
              <p><strong>ប្រធាន Visal</strong> ពិនិត្យក្រដាស ចុះហត្ថលេខា រួចដាក់ក្នុងថាស "Approved"។ គាត់គិតថាខាងជាងនឹងមកយក។</p>
            </div>
            <div class="event-step danger-event">
              <span class="step-time">ចន្លោះ ៤៨ ម៉ោង</span>
              <p><strong>ចន្លោះស្ងាត់ស្ងៀម៖</strong> ខាងជាងគិតថាខាងទិញសម្ភារៈកំពុងកម្ម៉ង់។ ខាងទិញសម្ភារៈគិតថាខាងវិស្វករមិនទាន់អនុម័ត។ ក្រដាសដេកស្ងៀមចន្លោះថាស។</p>
            </div>
            <div class="event-step catastrophe-event">
              <span class="step-time">ចុងសប្តាហ៍</span>
              <p><strong>មហន្តរាយ៖</strong> ដៃយន្តដែលមិនបានជួសជុលបានគាំងទាំងកណ្តាលទី បណ្តាលឱ្យបែកពុម្ពដែក។ ខាតបង់ពុម្ព និងការផាកពិន័យសរុប៖ <strong>$72,000</strong>!</p>
            </div>
          </div>
          <div class="crisis-lesson-card">
            <div class="lesson-header">
              <span class="loss-badge">ខាតបង់ $72,000</span>
              <h3>ឫសគល់នៃបញ្ហា៖ ការធ្លាក់ឈើបញ្ជូនបន្ត</h3>
            </div>
            <p>មនុស្សគ្រប់គ្នាបានបំពេញកិច្ចការតូចៗរៀងខ្លួនយ៉ាងត្រឹមត្រូវ ប៉ុន្តែហេតុអ្វីក្រុមហ៊ុននៅតែជួបគ្រោះមហន្តរាយ?</p>
            <ul class="root-cause-list">
              <li>❌ <strong>គ្មានលំហូរតភ្ជាប់៖</strong> ជំហាននីមួយៗនៅដាច់ដោយឡែកពីគ្នា មិនមែនជាខ្សែសង្វាក់បន្ត។</li>
              <li>❌ <strong>គ្មានម្ចាស់ច្បាស់លាស់៖</strong> គ្មានអ្នកណាដឹងថាដល់វេនអ្នកណាកំពុងកាន់ឈើបញ្ជូនបន្តនោះទេ។</li>
              <li>❌ <strong>គ្មានប្រព័ន្ធស្ថានភាព៖</strong> សំណើដេកស្ងៀមលើតុដោយគ្មានការជូនដំណឹងស្វ័យប្រវត្តិ។</li>
            </ul>
            <div class="resolution-quote">
              "នៅពេលគ្មានអ្នកណាដឹងច្បាស់ថាអ្នកណាជាម្ចាស់ជំហានបន្ទាប់ ការងារនឹងស្លាប់នៅក្នុងភាពស្ងៀមស្ងាត់រវាងមនុស្ស។"
            </div>
          </div>
        </div>
      `
    },
    // Slide 7: Plain-Language Concept
    {
      title: "គោលគំនិតជាភាសាសាមញ្ញ",
      content: `
        <div class="slide-header">
          <span class="section-tag">ភាសាសាមញ្ញមុនពាក្យបច្ចេកទេស</span>
          <h2>តើអ្វីជា "លំហូរអាជីវកម្មពីដើមដល់ចប់" (End-to-End Business Flow)?</h2>
          <p class="subtitle">ចូរគិតអំពីការរត់ប្រណាំងបញ្ជូនឈើ ៤x១០០ ម៉ែត្រ៖ អ្នករត់ម្នាក់, ឈើមួុយ, និងការផ្ទេរដ៏រលូន។</p>
        </div>
        <div class="relay-analogy-container">
          <div class="relay-card">
            <div class="relay-runner-badge">អ្នករត់ ១៖ បុគ្គលិក</div>
            <div class="relay-icon">🏃‍♀️</div>
            <h4>ដំណាក់កាល ១៖ ស្នើសុំ</h4>
            <p>ឃើញបញ្ហា ហើយកត់ត្រាព័ត៌មានលម្អិត។ កាន់ឈើជាប់រហូតដល់ចុចផ្ញើ។</p>
            <span class="status-pill status-draft">Draft</span>
          </div>
          <div class="relay-handoff">
            <span class="handoff-arrow">➔</span>
            <span class="handoff-label">ការផ្ទេរ ១</span>
          </div>
          <div class="relay-card">
            <div class="relay-runner-badge">អ្នករត់ ២៖ ប្រធាន</div>
            <div class="relay-icon">🏃‍♂️</div>
            <h4>ដំណាក់កាល ២៖ ពិនិត្យ</h4>
            <p>ទទួលឈើបន្ត វាយតម្លៃថ្លៃដើម និងសុវត្ថិភាព រួចធ្វើការសម្រេចចិត្ត។</p>
            <span class="status-pill status-submitted">Under Review</span>
          </div>
          <div class="relay-handoff">
            <span class="handoff-arrow">➔</span>
            <span class="handoff-label">ការផ្ទេរ ២</span>
          </div>
          <div class="relay-card">
            <div class="relay-runner-badge">អ្នករត់ ៣៖ ជាងបច្ចេកទេស</div>
            <div class="relay-icon">🔧</div>
            <h4>ដំណាក់កាល ៣៖ អនុវត្ត</h4>
            <p>ទទួលការងារដែលបានអនុម័ត ដោះគ្រឿងបន្លាស់ ធ្វើការជួសជុល។</p>
            <span class="status-pill status-approved">In Repair</span>
          </div>
          <div class="relay-handoff">
            <span class="handoff-arrow">➔</span>
            <span class="handoff-label">ការផ្ទេរ ៣</span>
          </div>
          <div class="relay-card">
            <div class="relay-runner-badge">អ្នករត់ ៤៖ អធិការគុណភាព</div>
            <div class="relay-icon">🏁</div>
            <h4>ដំណាក់កាល ៤៖ បញ្ចប់</h4>
            <p>ធ្វើតេស្តស្តង់ដារគុណភាព ចុះហត្ថលេខាទទួលស្គាល់ រត់កាត់ខ្សែព្រាត់។</p>
            <span class="status-pill status-closed">Closed</span>
          </div>
        </div>
        <div class="golden-rule-banner">
          <span class="rule-icon">💡</span>
          <span class="rule-text"><strong>ក្បួនមាសនៃលំហូរអាជីវកម្ម៖</strong> នៅគ្រប់វិនាទីនៃដំណើរការ <em>ត្រូវតែមានមនុស្ស ឬតួនាទីតែម្នាក់គត់កាន់ឈើបញ្ជូនបន្ត</em>។ បើឈើនៅចន្លោះដៃ កម្មវិធីត្រូវបង្ហាញឱ្យឃើញច្បាស់ថាអ្នកណាជាអ្នកបន្ទាប់!</span>
        </div>
      `
    },
    // Slide 8: Everyday Analogy
    {
      title: "ការប្រៀបធៀបក្នុងជីវិតប្រចាំថ្ងៃ៖ មន្ទីរពេទ្យ",
      content: `
        <div class="slide-header">
          <span class="section-tag">ការប្រៀបធៀបរូបវន្តក្នុងជីវិតប្រចាំថ្ងៃ</span>
          <h2>ដំណើររបស់អ្នកជំងឺនៅបន្ទប់សង្គ្រោះបន្ទាន់ (ER)</h2>
          <p class="subtitle">មន្ទីរពេទ្យមិនដែលទុកការព្យាបាលជាព្រឹត្តិការណ៍ចៃដន្យឡើយ។ អ្នកជំងឺធ្វើដំណើរតាមលំហូរច្បាស់លាស់។</p>
        </div>
        <div class="hospital-journey-grid">
          <div class="hosp-node">
            <div class="hosp-badge">១. បញ្ហា</div>
            <div class="hosp-icon">🤕</div>
            <h4>របួសកដៃ</h4>
            <p>អ្នកជំពប់ជើងដួល មានការឈឺចាប់ និងហើមកដៃខ្លាំង។</p>
          </div>
          <div class="hosp-arrow">➔</div>
          <div class="hosp-node">
            <div class="hosp-badge">២. ស្នើសុំ / ទទួលភ្ញៀវ</div>
            <div class="hosp-icon">📋</div>
            <h4>គិលានុបដ្ឋាយិកា</h4>
            <p>វាស់សីតុណ្ហភាព កត់ត្រារោគសញ្ញា បោះពុម្ពខ្សែដៃសម្គាល់។</p>
          </div>
          <div class="hosp-arrow">➔</div>
          <div class="hosp-node hosp-diamond-node">
            <div class="hosp-badge">៣. ច្រកសម្រេចចិត្ត</div>
            <div class="hosp-icon">⚖️</div>
            <h4>កម្រិតគ្រោះថ្នាក់</h4>
            <p><em>គ្រោះថ្នាក់ដល់ជីវិត?</em> បន្ទប់សង្គ្រោះ A។<br><em>មិនធ្ងន់ធ្ងរ?</em> ទៅថតកាំរស្មីអ៊ិច X-Ray។</p>
          </div>
          <div class="hosp-arrow">➔</div>
          <div class="hosp-node">
            <div class="hosp-badge">៤. អនុវត្ត</div>
            <div class="hosp-icon">🩻</div>
            <h4>វេជ្ជបណ្ឌិត &amp; ថត</h4>
            <p>ជាងថតកាំរស្មី; គ្រូពេទ្យតម្រង់ឆ្អឹង ដាក់បង់រុំ ឬបិតម្នាងសិលា។</p>
          </div>
          <div class="hosp-arrow">➔</div>
          <div class="hosp-node">
            <div class="hosp-badge">៥. បញ្ចប់</div>
            <div class="hosp-icon">💊</div>
            <h4>ឱសថស្ថាន &amp; ចេញ</h4>
            <p>បើកថ្នាំបំបាត់ការឈឺចាប់; ចាក់សោសំណុំរឿង; អនុញ្ញាតឱ្យចេញ។</p>
          </div>
        </div>
        <div class="analogy-takeaway-card">
          <h4>ហេតុអ្វីចំណុចនេះសំខាន់ក្នុង Power Apps៖</h4>
          <p>សាកស្រមៃមើល ប្រសិនបើគ្រូពេទ្យរង់ចាំក្នុងបន្ទប់ទទេដោយមិនដឹងថាអ្នកបានមកដល់កន្លែងទទួលភ្ញៀវ! បន្ទប់សង្គ្រោះបន្ទាន់ជោគជ័យបាន ដោយសារគ្រប់ផ្នែកមានជួររង់ចាំអេឡិចត្រូនិក, ស្ថានភាពច្បាស់លាស់ និងការជូនដំណឹងភ្លាមៗ។ កម្មវិធីរោងចក្ររបស់អ្នកក៏ដំណើរការដូចគ្នា។</p>
        </div>
      `
    },
    // Slide 9: 6 Universal Stages
    {
      title: "៦ ដំណាក់កាលជាសកល",
      content: `
        <div class="slide-header">
          <span class="section-tag">ស្ថាបត្យកម្មស្នូល</span>
          <h2>៦ ដំណាក់កាលជាសកលនៃគ្រប់លំហូរអាជីវកម្ម</h2>
          <p class="subtitle">ចាប់ពីសំបុត្រជួសជុលរោងចក្រ រហូតដល់របាយការណ៍ចំណាយ គ្រប់ដំណើរការឌីជីថលជោគជ័យសុទ្ធតែដើរតាមខ្សែសង្វាក់នេះ។</p>
        </div>
        <div class="six-stages-container">
          <div class="stage-card">
            <span class="stage-num">០១</span>
            <h4>បញ្ហា (Problem)</h4>
            <span class="stage-sub">កត្តាជំរុញពិត</span>
            <p>ម៉ាស៊ីនឡើងកម្តៅខ្លាំង, ពុម្ពដែកប្រេះ ឬគ្រឿងបន្លាស់អស់ពីស្តុក។</p>
            <div class="stage-footer">ស្ថានភាព៖ <code>Draft</code></div>
          </div>
          <div class="stage-card">
            <span class="stage-num">០២</span>
            <h4>ស្នើសុំ (Request)</h4>
            <span class="stage-sub">ការផ្ញើឌីជីថល</span>
            <p>បុគ្គលិកបញ្ចូលលេខកូដម៉ាស៊ីន រូបថតខូចខាត និងកម្រិតបន្ទាន់។</p>
            <div class="stage-footer">ស្ថានភាព៖ <code>Submitted</code></div>
          </div>
          <div class="stage-card">
            <span class="stage-num">០៣</span>
            <h4>ពិនិត្យ (Review)</h4>
            <span class="stage-sub">ការតម្រៀបអាទិភាព</span>
            <p>ប្រធានផ្ទៀងផ្ទាត់ផលប៉ះពាល់លើការផលិត និងគ្រឿងបន្លាស់។</p>
            <div class="stage-footer">ស្ថានភាព៖ <code>Under Review</code></div>
          </div>
          <div class="stage-card">
            <span class="stage-num">០៤</span>
            <h4>សម្រេច (Decision)</h4>
            <span class="stage-sub">ច្រកលក្ខខណ្ឌ</span>
            <p>តក្កវិជ្ជាតេស្តកម្រិតថវិកា៖ អនុម័ត, បដិសេធ ឬបញ្ជូនឡើងលើ។</p>
            <div class="stage-footer">ស្ថានភាព៖ <code>Approved</code></div>
          </div>
          <div class="stage-card">
            <span class="stage-num">០៥</span>
            <h4>អនុវត្ត (Work)</h4>
            <span class="stage-sub">សកម្មភាពជាក់ស្តែង</span>
            <p>ជាងប្តូរដុំទ្រនាប់ម៉ាស៊ីន កត់ត្រាម៉ោងការងារ និងគ្រឿងបន្លាស់ប្រើប្រាស់។</p>
            <div class="stage-footer">ស្ថានភាព៖ <code>In Repair</code></div>
          </div>
          <div class="stage-card">
            <span class="stage-num">០៦</span>
            <h4>បញ្ចប់ (Complete)</h4>
            <span class="stage-sub">ចុះហត្ថលេខា &amp; ចាក់សោ</span>
            <p>អធិការ QC ពិនិត្យស្តង់ដារលម្អិត; សំណើត្រូវបានចាក់សោសម្រាប់សវនកម្ម។</p>
            <div class="stage-footer">ស្ថានភាព៖ <code>Closed</code></div>
          </div>
        </div>
      `
    },
    // Slide 10: Swimlanes
    {
      title: "គន្លងតួនាទី & ភាពជាម្ចាស់",
      content: `
        <div class="slide-header">
          <span class="section-tag">អភិបាលកិច្ចដំណើរការ</span>
          <h2>គន្លងតួនាទី (Swimlanes)៖ តើអ្នកណាកាន់ឈើនៅដំណាក់កាលនីមួយៗ?</h2>
          <p class="subtitle">ការបែងចែកតួនាទីច្បាស់លាស់ ការពារអន្ទាក់ "ចាំមើលមានអ្នកផ្សេងធ្វើ" ដែលធ្វើឱ្យ Apex Plastics ខាតបង់ $72,000។</p>
        </div>
        <div class="swimlanes-visual-board">
          <div class="swimlane-row">
            <div class="lane-role lane-operator">
              <span class="role-icon">👷</span>
              <span class="role-name">បុគ្គលិកផលិត</span>
            </div>
            <div class="lane-track">
              <div class="lane-task active-task">១. ឃើញបញ្ហា &amp; ផ្ញើសំណើ</div>
              <div class="lane-line"></div>
              <div class="lane-task idle-task">រង់ចាំការជួសជុល</div>
            </div>
          </div>
          <div class="swimlane-row">
            <div class="lane-role lane-supervisor">
              <span class="role-icon">👔</span>
              <span class="role-name">ប្រធានវេន</span>
            </div>
            <div class="lane-track">
              <div class="lane-line"></div>
              <div class="lane-task active-task">២. ពិនិត្យ &amp; អនុម័ត</div>
              <div class="lane-line"></div>
            </div>
          </div>
          <div class="swimlane-row">
            <div class="lane-role lane-tech">
              <span class="role-icon">🔧</span>
              <span class="role-name">ជាងដែលចាត់តាំង</span>
            </div>
            <div class="lane-track">
              <div class="lane-line"></div>
              <div class="lane-task active-task">៣. ចុះជួសជុលផ្ទាល់</div>
              <div class="lane-line"></div>
            </div>
          </div>
          <div class="swimlane-row">
            <div class="lane-role lane-qc">
              <span class="role-icon">🔍</span>
              <span class="role-name">អធិការ QC</span>
            </div>
            <div class="lane-track">
              <div class="lane-line"></div>
              <div class="lane-task active-task">៤. ពិនិត្យស្តង់ដារ &amp; បិទបញ្ចប់</div>
            </div>
          </div>
        </div>
        <div class="swimlane-insight">
          <strong>ចំណុចយល់ដឹងសំខាន់៖</strong> ចូរសង្កេតមើលពីរបៀបដែលសកម្មភាពហូរចុះក្រោម និងទៅមុខឆ្លងកាត់តួនាទីនានា។ គ្មានចំណុចណាមួយដែលការងារអណ្តែតចោលដោយគ្មានម្ចាស់ទទួលខុសត្រូវឡើយ!
        </div>
      `
    },
    // Slide 11: Branching & Loops
    {
      title: "ផ្លូវបែកខ្នែង & រង្វិលជុំកែតម្រូវ",
      content: `
        <div class="slide-header">
          <span class="section-tag">ស្ថាបត្យកម្មលំហូរមិនត្រង់ជួរ</span>
          <h2>ផ្លូវបែកខ្នែង៖ ផ្លូវរលូន, ផ្លូវចេញ និងរង្វិលជុំកែតម្រូវ (Rework Loop)</h2>
          <p class="subtitle">រោងចក្រពិតតែងមានរឿងមិនរំពឹងទុក។ ប្រសិនបើកម្មវិធីរបស់អ្នកដោះស្រាយបានតែផ្លូវរលូន វានឹងគាំងក្នុងការប្រើប្រាស់ជាក់ស្តែង។</p>
        </div>
        <div class="branching-diagram-grid">
          <div class="branch-card branch-happy">
            <div class="branch-tag">ផ្លូវទី ១៖ ផ្លូវរលូន (Happy Path)</div>
            <h4>ដំណើរការត្រង់តាមធម្មតា</h4>
            <p>សំណើត្រឹមត្រូវ ➔ ប្រធានអនុម័ត ➔ ជាងជួសជុល ➔ QC ជាប់ស្តង់ដារ ➔ បិទបញ្ចប់។</p>
            <span class="branch-outcome outcome-success">លទ្ធផល៖ Closed (ជោគជ័យ)</span>
          </div>
          <div class="branch-card branch-exit">
            <div class="branch-tag">ផ្លូវទី ២៖ ផ្លូវបដិសេធ (Rejection Exit)</div>
            <h4>សំណើស្ទួន ឬមិនត្រឹមត្រូវ</h4>
            <p>ប្រធានពិនិត្យឃើញថាជារបាយការណ៍ស្ទួន ឬច្រឡំ។ បញ្ចូលមូលហេតុបដិសេធចាំបាច់។</p>
            <span class="branch-outcome outcome-danger">លទ្ធផល៖ Rejected (បញ្ចប់ការងារ)</span>
          </div>
          <div class="branch-card branch-loop">
            <div class="branch-tag">ផ្លូវទី ៣៖ រង្វិលជុំកែតម្រូវ (QC Rework Loop)</div>
            <h4>គម្លាតខ្នាតមិនគ្រប់ស្តង់ដារ</h4>
            <p>ពុម្ពដែកដែលជួសជុលរួចមិនជាប់តេស្ត (Tolerance &gt; 0.02mm)។ បញ្ជូនត្រឡប់ទៅជាងវិញ!</p>
            <span class="branch-outcome outcome-warning">រង្វិលជុំ៖ In Repair (កែតម្រូវ)</span>
          </div>
        </div>
        <div class="loop-architecture-box">
          <h4>💡 ហេតុអ្វីបានជារង្វិលជុំកែតម្រូវ (Rework Loop) មានសារៈសំខាន់ខ្លាំង៖</h4>
          <p>ប្រសិនបើ QC បដិសេធការជួសជុល ហើយកម្មវិធីគ្រាន់តែកត់សម្គាល់ថា "Rejected" នោះជាងមិនអាចកត់ត្រាម៉ោងការងារបន្ថែមបានទេ ហើយបុគ្គលិកត្រូវចំណាយពេលវាយសំបុត្រថ្មីពីដើម។ <strong>Rework Loop</strong> រក្សាទុកលេខកូដសំបុត្រការងារដើមដដែល ដើម្បីរក្សាប្រវត្តិជួសជុលទាំងមូលឱ្យនៅគង់វង្ស!</p>
        </div>
      `
    },
    // Slide 12: Interactive Workbench
    {
      title: "ក្តារពិសោធន៍លំហូរអន្តរកម្ម",
      content: `
        <div class="slide-header">
          <span class="section-tag section-tag-accent">មន្ទីរពិសោធន៍អន្តរកម្ម • សម្រាកកាយនាទី ៤៥:០០</span>
          <h2>ឧបករណ៍បញ្ជាលំហូរអាជីវកម្មពីដើមដល់ចប់ (Interactive Orchestrator)</h2>
          <p class="subtitle">ដំណើរការសំបុត្រការងារឆ្លងកាត់ទាំង ៦ ដំណាក់កាល។ តេស្តកម្រិតថវិកា, ការអនុម័ត និងរង្វិលជុំកែតម្រូវ QC។</p>
        </div>
        <div class="flow-workbench-container">
          <div class="flow-controls-panel">
            <div class="wb-input-group">
              <label>១. ពិពណ៌នាអំពីសំណើ៖</label>
              <input type="text" id="wb-ticket-desc" class="wb-input" value="ដៃយន្តម៉ាស៊ីនលេខ ៦ រំញ័រខុសប្រក្រតី" />
            </div>
            <div class="wb-input-group">
              <label>២. ការប៉ាន់ស្មានតម្លៃជួសជុល៖ <span id="wb-cost-display" class="highlight-val">$850</span></label>
              <input type="range" id="wb-cost-slider" min="200" max="5000" step="100" value="850" class="wb-slider" />
              <span class="slider-hint">កម្រិតកំណត់៖ លើសពី $2,000 ត្រូវមានការចុះហត្ថលេខាពីប្រធានរោងចក្រ</span>
            </div>
            <div class="wb-action-buttons">
              <button id="wb-btn-step-next" class="fluent-btn-primary">បោះជំហានទៅមុខ ➔</button>
              <button id="wb-btn-qc-fail" class="fluent-btn-danger" style="display: none;">ដំណើរការរង្វិលជុំ QC Rework ↺</button>
              <button id="wb-btn-reset-flow" class="fluent-btn-secondary">កំណត់លំហូរឡើងវិញ</button>
            </div>
            <div class="wb-inspector-card">
              <span class="inspector-label">ក្បួនអភិបាលកិច្ច POWER FX ផ្ទាល់៖</span>
              <code id="wb-powerfx-inspector">frmRequest.DisplayMode = DisplayMode.Edit</code>
            </div>
          </div>
          <div class="flow-visual-tracker">
            <div class="tracker-stage-node" id="node-stage-1" data-stage="1">
              <div class="node-icon">១</div>
              <div class="node-info">
                <span class="node-name">បញ្ហា</span>
                <span class="node-role">បុគ្គលិកផលិត</span>
                <span class="node-status badge-draft">Draft</span>
              </div>
            </div>
            <div class="tracker-connector"></div>
            <div class="tracker-stage-node" id="node-stage-2" data-stage="2">
              <div class="node-icon">២</div>
              <div class="node-info">
                <span class="node-name">ស្នើសុំ</span>
                <span class="node-role">បុគ្គលិកផលិត</span>
                <span class="node-status badge-submitted">Submitted</span>
              </div>
            </div>
            <div class="tracker-connector"></div>
            <div class="tracker-stage-node" id="node-stage-3" data-stage="3">
              <div class="node-icon">៣</div>
              <div class="node-info">
                <span class="node-name">ពិនិត្យ</span>
                <span class="node-role">ប្រធានវេន</span>
                <span class="node-status badge-review">Under Review</span>
              </div>
            </div>
            <div class="tracker-connector"></div>
            <div class="tracker-stage-node" id="node-stage-4" data-stage="4">
              <div class="node-icon">៤</div>
              <div class="node-info">
                <span class="node-name">សម្រេច</span>
                <span class="node-role" id="wb-decision-role">ប្រធានវេន</span>
                <span class="node-status badge-approved">Approved</span>
              </div>
            </div>
            <div class="tracker-connector"></div>
            <div class="tracker-stage-node" id="node-stage-5" data-stage="5">
              <div class="node-icon">៥</div>
              <div class="node-info">
                <span class="node-name">អនុវត្ត</span>
                <span class="node-role">ជាងដែលចាត់តាំង</span>
                <span class="node-status badge-inprogress">In Repair</span>
              </div>
            </div>
            <div class="tracker-connector"></div>
            <div class="tracker-stage-node" id="node-stage-6" data-stage="6">
              <div class="node-icon">៦</div>
              <div class="node-info">
                <span class="node-name">បញ្ចប់</span>
                <span class="node-role">អធិការ QC</span>
                <span class="node-status badge-closed">Closed</span>
              </div>
            </div>
          </div>
        </div>
      `
    },
    // Slide 13: Screens Mapping
    {
      title: "ការបម្លែងលំហូរទៅជាអេក្រង់កម្មវិធី",
      content: `
        <div class="slide-header">
          <span class="section-tag">ស្ថាបត្យកម្មផ្ទៃផ្ទាំង (UI)</span>
          <h2>របៀបដែលលំហូរអាជីវកម្មមួយ បម្លែងទៅជាអេក្រង់កម្មវិធីជាច្រើន</h2>
          <p class="subtitle">តួនាទីផ្សេងគ្នាឃើញអេក្រង់ខុសៗគ្នា ប៉ុន្តែពួកគេទាំងអស់គ្នាកំពុងមើលលើលំហូរតែមួយដូចគ្នា។</p>
        </div>
        <div class="screens-mapping-grid">
          <div class="screen-card">
            <div class="screen-device">
              <div class="screen-header-bar">អេក្រង់ទូរស័ព្ទរបស់បុគ្គលិក</div>
              <div class="screen-mockup-body">
                <div class="mock-field">ម៉ាស៊ីន៖ Press #6</div>
                <div class="mock-field">បញ្ហា៖ ដៃយន្តរំញ័រ</div>
                <div class="mock-btn primary">ផ្ញើសំណើ (Submit)</div>
              </div>
            </div>
            <h4>អេក្រង់ ១៖ ផ្ទាំងស្នើសុំ</h4>
            <p>ទម្រង់ទូរស័ព្ទសាមញ្ញ រៀបចំឡើងសម្រាប់ការថតរូបភាព និងការផ្ញើរហ័សគ្មានកំហុសនៅរោងចក្រផ្ទាល់។</p>
          </div>
          <div class="screen-card">
            <div class="screen-device">
              <div class="screen-header-bar">ផ្ទាំងថេប្លេតរបស់ប្រធាន</div>
              <div class="screen-mockup-body">
                <div class="mock-badge pending">រង់ចាំការអនុម័ត</div>
                <div class="mock-field">តម្លៃ៖ $850 (ធម្មតា)</div>
                <div class="mock-btn-row">
                  <span class="mock-btn success">អនុម័ត</span>
                  <span class="mock-btn danger">បដិសេធ</span>
                </div>
              </div>
            </div>
            <h4>អេក្រង់ ២៖ ផ្ទាំងពិនិត្យសម្រេច</h4>
            <p>បង្ហាញជួររង់ចាំនៃសំណើដែលបានផ្ញើ ជាមួយប៊ូតុងអនុម័ត ជម្រើសកម្រិតបន្ទាន់ និងការចាត់តាំងជាង។</p>
          </div>
          <div class="screen-card">
            <div class="screen-device">
              <div class="screen-header-bar">តុការងាររបស់ជាងបច្ចេកទេស</div>
              <div class="screen-mockup-body">
                <div class="mock-badge active">ស្ថានភាព៖ កំពុងជួសជុល</div>
                <div class="mock-field">គ្រឿងបន្លាស់៖ Bearing #421</div>
                <div class="mock-btn accent">បញ្ចប់ការងារជួសជុល</div>
              </div>
            </div>
            <h4>អេក្រង់ ៣៖ ផ្ទាំងអនុវត្តការងារ</h4>
            <p>ជាងកត់ត្រាលេខសម្គាល់គ្រឿងបន្លាស់ដែលបានប្តូរ ចំនួនម៉ោងធ្វើការ និងស្នើសុំការត្រួតពិនិត្យ QC ចុងក្រោយ។</p>
          </div>
        </div>
      `
    },
    // Slide 14: Power Fx Governance
    {
      title: "ក្បួនច្បាប់អភិបាលកិច្ច Power Fx",
      content: `
        <div class="slide-header">
          <span class="section-tag">ការតភ្ជាប់តក្កវិជ្ជា POWER FX</span>
          <h2>ការអនុវត្តក្បួនច្បាប់លំហូរនៅក្នុងកូដ Power Apps</h2>
          <p class="subtitle">កម្មវិធីពិតមិនពឹងផ្អែកលើអាកប្បកិរិយាល្អរបស់អ្នកប្រើប្រាស់ឡើយ។ ក្បួន Power Fx ការពារការរំលងជំហានខុសច្បាប់។</p>
        </div>
        <div class="powerfx-rules-grid">
          <div class="fx-rule-card">
            <div class="rule-title-row">
              <span class="fx-rule-tag">ក្បួន ១៖ ការអនុម័តតាមតួនាទី</span>
            </div>
            <p class="fx-scenario"><strong>តម្រូវការ៖</strong> មានតែ Supervisor ប៉ុណ្ណោះដែលអាចឃើញប៊ូតុង 'Approve' ហើយលុះត្រាតែសំបុត្រនោះស្ថិតក្នុងស្ថានភាព 'Submitted'។</p>
            <div class="fx-code-box">
              <code>btnApprove.Visible = (UserRole = "Supervisor") &amp;&amp; (Status = "Submitted")</code>
            </div>
            <p class="fx-expl">ប្រើប្រាស់ <code>&amp;&amp;</code> (AND) ដូច្នេះបុគ្គលិកមិនអាចអនុម័តសំណើខ្លួនឯងបានទេ ហើយក៏មិនអាចអនុម័តក្រោយការងារបិទរួចដែរ។</p>
          </div>
          <div class="fx-rule-card">
            <div class="rule-title-row">
              <span class="fx-rule-tag">ក្បួន ២៖ ការបញ្ជូនបន្តតាមលក្ខខណ្ឌ</span>
            </div>
            <p class="fx-scenario"><strong>តម្រូវការ៖</strong> ប្រសិនបើតម្លៃប៉ាន់ស្មានលើសពី $2,000 ត្រូវបញ្ជូនទៅ Plant Manager; បើមិនលើសទេ បញ្ជូនទៅប្រធានជាង។</p>
            <div class="fx-code-box">
              <code>NextApprover = If(EstCost &gt; 2000, "Plant Manager", "Maintenance Lead")</code>
            </div>
            <p class="fx-expl">វាយតម្លៃលើលក្ខខណ្ឌលេខ ដើម្បីជ្រើសរើសម្ចាស់គន្លងការងារបន្ទាប់ដោយស្វ័យប្រវត្តិ។</p>
          </div>
          <div class="fx-rule-card">
            <div class="rule-title-row">
              <span class="fx-rule-tag">ក្បួន ៣៖ ភាពមិនអាចកែប្រែពេលបញ្ចប់</span>
            </div>
            <p class="fx-scenario"><strong>តម្រូវការ៖</strong> នៅពេលអធិការ QC ចុះហត្ថលេខា ហើយដាក់សំបុត្រជា 'Closed' ត្រូវចាក់សោប្រអប់បញ្ចូលទាំងអស់ដើម្បីកុំឱ្យកែប្រែប្រវត្តិ។</p>
            <div class="fx-code-box">
              <code>frmTicket.DisplayMode = If(Status = "Closed", DisplayMode.View, DisplayMode.Edit)</code>
            </div>
            <p class="fx-expl">ប្តូរទម្រង់ទាំងមូលឱ្យទៅជាអានតែប៉ុណ្ណោះ <code>DisplayMode.View</code> ដើម្បីការពារការអនុលោមតាមសវនកម្ម ISO។</p>
          </div>
        </div>
      `
    },
    // Slide 15: Specification Matrix
    {
      title: "តារាងស្ថាបត្យកម្មលំហូរអាជីវកម្ម",
      content: `
        <div class="slide-header">
          <span class="section-tag">តារាងលម្អិតបច្ចេកទេស</span>
          <h2>តារាងស្ថាបត្យកម្មលំហូរអាជីវកម្មពេញលេញ</h2>
          <p class="subtitle">ឧបករណ៍ឯកសារវិជ្ជាជីវៈដែលស្ថាបត្យករប្រព័ន្ធប្រើប្រាស់ មុនពេលចាប់ផ្តើមបង្កើតអេក្រង់ណាមួយ។</p>
        </div>
        <div class="table-container">
          <table class="capstone-table">
            <thead>
              <tr>
                <th>ដំណាក់កាល #</th>
                <th>ឈ្មោះដំណាក់កាល</th>
                <th>តួអង្គ / ម្ចាស់ការងារ</th>
                <th>សកម្មភាពស្នូល</th>
                <th>ស្ថានភាពបន្ទាប់</th>
                <th>ក្បួនសម្រេចចិត្ត / ការពារ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>១</strong></td>
                <td><strong>បញ្ហា (Problem)</strong></td>
                <td>បុគ្គលិកផលិត</td>
                <td>ឃើញភាពមិនប្រក្រតី / រំញ័រ</td>
                <td><code>Draft</code></td>
                <td>គ្មាន (ការបង្កើតផ្ទាល់)</td>
              </tr>
              <tr>
                <td><strong>២</strong></td>
                <td><strong>ស្នើសុំ (Request)</strong></td>
                <td>បុគ្គលិកផលិត</td>
                <td>ផ្ញើសំបុត្រជាមួយរូបថត &amp; លេខកូដ</td>
                <td><code>Submitted</code></td>
                <td>ទាមទារលេខកូដ និងរូបថត</td>
              </tr>
              <tr>
                <td><strong>៣</strong></td>
                <td><strong>ពិនិត្យ (Review)</strong></td>
                <td>ប្រធានវេន</td>
                <td>ពិនិត្យអាទិភាព សុវត្ថិភាព គ្រឿងបន្លាស់</td>
                <td><code>Under Review</code></td>
                <td>បង្ហាញតែសម្រាប់តួនាទី Supervisor</td>
              </tr>
              <tr>
                <td><strong>៤</strong></td>
                <td><strong>សម្រេច (Decision)</strong></td>
                <td>Supervisor / Plant Mgr</td>
                <td>វាយតម្លៃកម្រិតថ្លៃដើម ($2,000)</td>
                <td><code>Approved</code> ឬ <code>Rejected</code></td>
                <td><code>If(Cost &gt; 2000, PlantMgr, Supervisor)</code></td>
              </tr>
              <tr>
                <td><strong>៥</strong></td>
                <td><strong>អនុវត្ត (Work)</strong></td>
                <td>ជាងដែលចាត់តាំង</td>
                <td>ចុះជួសជុលផ្ទាល់; កត់ត្រាម៉ោង</td>
                <td><code>In Repair</code></td>
                <td>មានតែជាងដែលចាត់តាំងទើបចុចបាន</td>
              </tr>
              <tr>
                <td><strong>៦</strong></td>
                <td><strong>បញ្ចប់ (Complete)</strong></td>
                <td>អធិការ QC</td>
                <td>តេស្តខ្នាតគុណភាព &amp; ចុះហត្ថលេខា</td>
                <td><code>Closed</code> ឬ <code>Rework</code></td>
                <td><code>If(TolerancePass = True, Closed, In Repair)</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },
    // Slide 16: Trainer Demo
    {
      title: "ការបង្ហាញផ្ទាល់របស់គ្រូ",
      content: `
        <div class="slide-header">
          <span class="section-tag section-tag-accent">ពិធីការបង្ហាញគំរូផ្ទាល់</span>
          <h2>ការបង្ហាញផ្ទាល់៖ ការបម្លែងក្រដាសទៅជាលំហូរឌីជីថល</h2>
          <p class="subtitle">ទស្សនាពីរបៀបដែលក្តារកៀបក្រដាសជួសជុលរញ៉េរញ៉ៃ ត្រូវបានផ្លាស់ប្តូរទៅជាខ្សែសង្វាក់ស្វ័យប្រវត្តិកម្រិតខ្ពស់។</p>
        </div>
        <div class="demo-protocol-steps">
          <div class="proto-step">
            <div class="proto-step-num">ជំហាន ១</div>
            <h4>កំណត់ព្រំដែន ៦ ដំណាក់កាល</h4>
            <p>ស្វែងរកកន្លែងដែលបញ្ហាចាប់ផ្តើម, កន្លែងកត់ត្រា, អ្នកណាពិនិត្យ, អ្នកណាអនុម័ត, អ្នកណាជួសជុល និងអ្នកណាបញ្ចប់។</p>
          </div>
          <div class="proto-step">
            <div class="proto-step-num">ជំហាន ២</div>
            <h4>កំណត់តម្លៃស្ថានភាពជាក់លាក់</h4>
            <p>ជំនួសក្រដាសកត់ត្រាដោយស្ថានភាព ៥ ច្បាស់លាស់៖ <code>Submitted</code>, <code>Under Review</code>, <code>Approved</code>, <code>In Repair</code>, <code>Closed</code>។</p>
          </div>
          <div class="proto-step">
            <div class="proto-step-num">ជំហាន ៣</div>
            <h4>បង្កើតក្បួនផ្ទេរឈើបញ្ជូនបន្ត</h4>
            <p>តភ្ជាប់ការចុចប៊ូតុងទៅនឹងការផ្លាស់ប្តូរស្ថានភាពស្វ័យប្រវត្តិ ដែលបញ្ជូនការងារទៅជួររបស់អ្នកបន្ទាប់ភ្លាមៗ។</p>
          </div>
          <div class="proto-step">
            <div class="proto-step-num">ជំហាន ៤</div>
            <h4>បន្ថែមការការពារសុវត្ថិភាព</h4>
            <p>សរសេររូបមន្ត Power Fx ចាក់សោសំណើដែលបិទរួច និងលាក់ប៊ូតុងអនុម័តពីបុគ្គលិកដែលគ្មានសិទ្ធិ។</p>
          </div>
        </div>
      `
    },
    // Slide 17: Guided Practice
    {
      title: "ការអនុវត្តជាមួយគ្រូ៖ រកចំណុចខូចនៃលំហូរ",
      content: `
        <div class="slide-header">
          <span class="section-tag">មន្ទីរពិសោធន៍ក្នុងថ្នាក់រៀន</span>
          <h2>ការអនុវត្តជាមួយគ្រូ៖ រកមើលចំណុចដែលលំហូរការងារខូច!</h2>
          <p class="subtitle">ពិនិត្យមើល ៣ ស្ថានភាពគាំងដំណើរការទូទៅខាងក្រោម។ រកមើលកន្លែងដែលលំហូរដាច់ និងរបៀបកែតម្រូវវា។</p>
        </div>
        <div class="breakdown-grid">
          <div class="breakdown-card">
            <div class="breakdown-tag">ចំណុចខូច A៖ ការគាំងស្ងាត់ស្ងៀម</div>
            <h4>សំបុត្រការងារគាំងត្រឹម 'Approved'</h4>
            <p><strong>រោគសញ្ញា៖</strong> ប្រធានបានអនុម័តតាំងពីថ្ងៃច័ន្ទ ប៉ុន្តែដល់ថ្ងៃសុក្រម៉ាស៊ីននៅតែខូចដដែល។</p>
            <div class="diagnostic-box">
              <span class="diag-label">កំហុសលំហូរ៖</span>
              <p>ការអនុម័តមិនបានចាត់តាំងជាងជាក់លាក់ណាម្នាក់ទេ! ស្ថានភាពគឺ Approved ប៉ុន្តែឈើបញ្ជូនបន្តមិននៅលើដៃអ្នកណាឡើយ។</p>
            </div>
            <div class="fix-box">
              <span class="fix-label">ដំណោះស្រាយ POWER FX៖</span>
              <code>btnApprove.DisplayMode = If(IsBlank(ddTechnician.Selected), Disabled, Edit)</code>
            </div>
          </div>
          <div class="breakdown-card">
            <div class="breakdown-tag">ចំណុចខូច B៖ ការបដិសេធបែបខ្មោចលង</div>
            <h4>QC បដិសេធពុម្ពដែក សំបុត្របាត់ស្រមោល</h4>
            <p><strong>រោគសញ្ញា៖</strong> ពុម្ពដែកមិនជាប់ស្តង់ដារ។ QC ចុច Reject។ សំបុត្របិទបញ្ចប់ ប្រវត្តិការងារបាត់អស់។</p>
            <div class="diagnostic-box">
              <span class="diag-label">កំហុសលំហូរ៖</span>
              <p>អ្នកបង្កើតកម្មវិធីបានចាត់ទុកការធ្លាក់ QC ជាការបញ្ចប់ ជាជាងបង្កើត <strong>Rework Loop</strong> ត្រឡប់ទៅឱ្យជាងវិញ។</p>
            </div>
            <div class="fix-box">
              <span class="fix-label">ដំណោះស្រាយ POWER FX៖</span>
              <code>Status = If(TolerancePass = True, "Closed", "In Repair")</code>
            </div>
          </div>
          <div class="breakdown-card">
            <div class="breakdown-tag">ចំណុចខូច C៖ ការអនុម័តដោយខ្លួនឯង</div>
            <h4>បុគ្គលិកអនុម័តសំណើ $5,000 របស់ខ្លួនឯង</h4>
            <p><strong>រោគសញ្ញា៖</strong> បុគ្គលិកបានចុចប៊ូតុង Approve ដោយសារប៊ូតុងនោះបើកបង្ហាញឱ្យមនុស្សគ្រប់គ្នាឃើញ។</p>
            <div class="diagnostic-box">
              <span class="diag-label">កំហុសលំហូរ៖</span>
              <p>ប៊ូតុងខ្វះការគ្រប់គ្រងតួនាទី។ នរណាក៏អាចចុចបានដោយមិនខ្វល់ពីសិទ្ធិ។</p>
            </div>
            <div class="fix-box">
              <span class="fix-label">ដំណោះស្រាយ POWER FX៖</span>
              <code>btnApprove.Visible = (UserRole = "Supervisor")</code>
            </div>
          </div>
        </div>
      `
    },
    // Slide 18: Simulator
    {
      title: "ឧបករណ៍ពិសោធន៍លំហូរ ៦ ស្ថានភាព",
      content: `
        <div class="slide-header">
          <span class="section-tag section-tag-accent">មន្ទីរពិសោធន៍ជំនាញអន្តរកម្ម</span>
          <h2>ឧបករណ៍ធ្វើរោគវិនិច្ឆ័យលំហូរការងារ ៦ ស្ថានភាពជាក់ស្តែង</h2>
          <p class="subtitle">វាយតម្លៃលើ ៦ ការសម្រេចចិត្តក្នុងដំណើរការរោងចក្រពិត។ ជ្រើសរើសដំណោះស្រាយស្ថាបត្យកម្មដែលត្រឹមត្រូវ។</p>
          <div class="sim-score-bar">
            <span>ពិន្ទុ៖ <strong id="sim-score">0</strong> / ៦ ដោះស្រាយបាន</span>
          </div>
        </div>
        <div class="evaluator-grid-container" id="sim-cards-container">
          <!-- 6 Scenario Cards Injected by JS -->
        </div>
      `
    },
    // Slide 19: Misconceptions
    {
      title: "ការយល់ច្រឡំគ្រោះថ្នាក់ ៤ យ៉ាង",
      content: `
        <div class="slide-header">
          <span class="section-tag section-tag-danger">អន្ទាក់ដែលត្រូវជៀសវាង</span>
          <h2>ការយល់ច្រឡំគ្រោះថ្នាក់ទាំង ៤ សម្រាប់អ្នកចាប់ផ្តើមដំបូង</h2>
          <p class="subtitle">ស្វែងយល់ពីផ្នត់គំនិតខុសឆ្គងទាំងនេះ មុនពេលវាបណ្តាលឱ្យកម្មវិធីពិតរបស់អ្នកដួលរលំ។</p>
        </div>
        <div class="misconceptions-grid">
          <div class="misconception-card">
            <div class="misc-badge">ផ្នត់គំនិតខុសទី ១</div>
            <h4>"ផ្លូវរលូន គឺជាផ្លូវតែមួយគត់។"</h4>
            <p class="misconception-wrong">❌ "អ្វីៗទាំងអស់នឹងត្រូវអនុម័តដោយរលូន ហើយជាប់ការត្រួតពិនិត្យលើកទីមួយជានិច្ច។"</p>
            <p class="misconception-right">✔️ <strong>ការពិត៖</strong> ៣០% នៃសំណើត្រូវបដិសេធ ខ្វះព័ត៌មាន ឬធ្លាក់ QC។ បើកម្មវិធីគ្មានផ្លូវបែកខ្នែង មនុស្សនឹងឈប់ប្រើកម្មវិធី។</p>
          </div>
          <div class="misconception-card">
            <div class="misc-badge">ផ្នត់គំនិតខុសទី ២</div>
            <h4>"មនុស្សគ្រប់គ្នាគួរតែឃើញគ្រប់ប៊ូតុង។"</h4>
            <p class="misconception-wrong">❌ "ខ្ញុំដាក់ប៊ូតុង Submit, Approve និង Close លើអេក្រង់តែមួយដើម្បីឱ្យអ្នកណាក៏ជួយចុចបាន។"</p>
            <p class="misconception-right">✔️ <strong>ការពិត៖</strong> ប៊ូតុងត្រូវគ្រប់គ្រងដោយ <strong>តួនាទី និងស្ថានភាព</strong>។ បុគ្គលិកមិនត្រូវឃើញប៊ូតុង Approve ឡើយ; ជាងមិនត្រូវរំលង QC ឡើយ។</p>
          </div>
          <div class="misconception-card">
            <div class="misc-badge">ផ្នត់គំនិតខុសទី ៣</div>
            <h4>"ស្ថានភាព គ្រាន់តែជាអក្សរវាយតាមចិត្ត។"</h4>
            <p class="misconception-wrong">❌ "ខ្ញុំដាក់ប្រអប់អក្សរឱ្យអ្នកប្រើប្រាស់វាយពាក្យ 'ជិតរួចហើយ' ឬ 'ចាំមេ' តាមចិត្ត។"</p>
            <p class="misconception-right">✔️ <strong>ការពិត៖</strong> រូបមន្ត Power Fx មិនអាចវាយតម្លៃលើពាក្យខុសអក្ខរាវិរុទ្ធបានទេ។ ស្ថានភាពគឺជា <strong>ម៉ាស៊ីនដំណើរការ (Engine State)</strong> គ្រប់គ្រងដោយ Choice។</p>
          </div>
          <div class="misconception-card">
            <div class="misc-badge">ផ្នត់គំនិតខុសទី ៤</div>
            <h4>"លំហូរអាជីវកម្ម គឺដូចគ្នានឹងតារាងរចនាសម្ព័ន្ធស្ថាប័ន (Org Chart)។"</h4>
            <p class="misconception-wrong">❌ "គំនូសតាងរបស់ខ្ញុំបង្ហាញពី CEO ➔ អ្នកចាត់ការ ➔ ប្រធាន ➔ កម្មករ។"</p>
            <p class="misconception-right">✔️ <strong>ការពិត៖</strong> តារាងរចនាសម្ព័ន្ធបង្ហាញពីអំណាច; ចំណែក <strong>លំហូរអាជីវកម្មបង្ហាញពីដំណើរនៃការងារជាក់លាក់មួយតាមពេលវេលា</strong>។</p>
          </div>
        </div>
      `
    },
    // Slide 20: Quiz
    {
      title: "តេស្តវាយតម្លៃចំណេះដឹង",
      content: `
        <div class="slide-header">
          <span class="section-tag section-tag-accent">ការវាយតម្លៃពុទ្ធិ</span>
          <h2>តេស្តវាយតម្លៃចំណេះដឹង៖ វាស់ស្ទង់ការយល់ដឹងលើលំហូរអាជីវកម្ម</h2>
          <p class="subtitle">ឆ្លើយ ៥ សំណួរគោលគំនិត ដើម្បីផ្ទៀងផ្ទាត់ការយល់ដឹងស៊ីជម្រៅលើស្ថាបត្យកម្មលំហូរការងារ។</p>
        </div>
        <div class="quiz-container-card">
          <div class="quiz-status-header">
            <span id="quiz-question-counter" class="quiz-counter-badge">សំណួរទី ១ នៃ ៥</span>
            <span id="quiz-score-display" class="quiz-score-badge">ពិន្ទុ៖ ០ / ៥</span>
          </div>
          <h3 id="quiz-question-text" class="quiz-question-title">កំពុងដំណើរការសំណួរ...</h3>
          <div id="quiz-options-container" class="quiz-options-list">
            <!-- Options Injected by JS -->
          </div>
          <div id="quiz-feedback-box" class="quiz-feedback-box" style="display: none;"></div>
          <div class="quiz-nav-row">
            <button id="quiz-prev-btn" class="fluent-btn-secondary" disabled>សំណួរមុន</button>
            <button id="quiz-next-btn" class="fluent-btn-primary" disabled>សំណួរបន្ទាប់ ➔</button>
          </div>
        </div>
      `
    },
    // Slide 21: Capstone Challenge
    {
      title: "លំហាត់ប្រឡងបញ្ចប់មេរៀន (Capstone)",
      content: `
        <div class="slide-header">
          <span class="section-tag section-tag-accent">លំហាត់ប្រឡងបញ្ចប់មេរៀនឯករាជ្យ</span>
          <h2>លំហាត់ Capstone៖ ប្លង់លំហូរជួសជុលពុម្ពដែកនៅ Apex Plastics</h2>
          <p class="subtitle">សំយោគចំណេះដឹងទាំង ៩ ថ្ងៃ ដើម្បីបង្កើតប្លង់លំហូរប្រតិបត្តិការ ៦ ដំណាក់កាលកម្រិតសហគ្រាស។</p>
        </div>
        <div class="challenge-spec-box">
          <div class="spec-badge">ស្ថានភាពប្រតិបត្តិការជាក់ស្តែង</div>
          <h3>ពុម្ពដែកលេខ ៤ (Tooling Die #4) ប្រេះសរសៃ ០.៥ មីលីម៉ែត្រ</h3>
          <p>ពុម្ពដែកលេខ ៤ នៅខ្សែសង្វាក់ទី ២ មានស្នាមប្រេះសរសៃ ០.៥ មីលីម៉ែត្រ។ ភារកិច្ចរបស់អ្នក គឺកំណត់លក្ខណៈបច្ចេកទេសនៃលំហូរឌីជីថលទាំង ៦ ដំណាក់កាល ដើម្បីកុំឱ្យមានការធ្លាក់ឈើបញ្ជូនបន្តរវាងបុគ្គលិកផលិត, ប្រធានវេន, ជាងម៉ាស៊ីន និងអធិការសវនកម្មគុណភាព។</p>
        </div>
        <div class="challenge-requirements-grid">
          <div class="req-card">
            <h4>តម្រូវការ ១៖ ៦ ដំណាក់កាលច្បាស់លាស់</h4>
            <p>គូសផែនទី បញ្ហា, ស្នើសុំ, ពិនិត្យ, សម្រេច, អនុវត្ត និង បញ្ចប់ ដោយគ្មានភាពស្រពិចស្រពិល។</p>
          </div>
          <div class="req-card">
            <h4>តម្រូវការ ២៖ តួនាទីដ្យាក្រាមតាមតួនាទី (Swimlane)តឹងរ៉ឹង</h4>
            <p>ចាត់តាំងតួនាទីទទួលខុសត្រូវតែមួយគត់ក្នុងមួយដំណាក់កាល៖ Operator, Supervisor, Tech, QC Auditor។</p>
          </div>
          <div class="req-card">
            <h4>តម្រូវការ ៣៖ ច្រកសម្រេច &amp; រង្វិលជុំ Rework</h4>
            <p>បញ្ចូលក្បួនកម្រិតថវិកា $2,000 និងរង្វិលជុំ QC Tolerance Rework Loop (គម្លាត &gt; 0.02mm)។</p>
          </div>
          <div class="req-card">
            <h4>តម្រូវការ ៤៖ ក្បួនការពារ Power Fx</h4>
            <p>សរសេររូបមន្តចាក់សោទម្រង់នៅពេលបញ្ចប់ និងលាក់ប៊ូតុងអនុម័តពីបុគ្គលិកដែលគ្មានសិទ្ធិ។</p>
          </div>
        </div>
      `
    },
    // Slide 22: Benchmark Solution & Rubric
    {
      title: "ចម្លើយគំរូ & តារាងវាយតម្លៃ ៤ កម្រិត",
      content: `
        <div class="slide-header">
          <span class="section-tag">ការវាយតម្លៃ &amp; ចម្លើយគំរូ</span>
          <h2>ចម្លើយគំរូបច្ចេកទេស &amp; តារាងវាយតម្លៃ ៤ កម្រិត</h2>
          <p class="subtitle">ប្រៀបធៀបស្ថាបត្យកម្មដែលអ្នកបានគិត ធៀបនឹងស្តង់ដារផលិតកម្មកម្រិតសហគ្រាស។</p>
        </div>
        <div class="solution-reveal-container">
          <button id="btn-reveal-solution" class="fluent-btn-primary">👁️ ចុចដើម្បីបង្ហាញចម្លើយគំរូ &amp; តារាងវាយតម្លៃ</button>
          <div id="solution-drawer" class="solution-drawer collapsed">
            <div class="solution-content-wrapper">
              <h4>ប្លង់ស្ថាបត្យកម្មមេ (Master Blueprint)៖</h4>
              <table class="capstone-table">
                <thead>
                  <tr>
                    <th>ដំណាក់កាល #</th>
                    <th>ដំណាក់កាល</th>
                    <th>ម្ចាស់ការងារ</th>
                    <th>ស្ថានភាពកំណត់</th>
                    <th>ក្បួនអភិបាលកិច្ច UI តាម Power Fx</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>១</td>
                    <td>បញ្ហា</td>
                    <td>បុគ្គលិក</td>
                    <td><code>Draft</code></td>
                    <td><code>btnReport.Visible = True</code></td>
                  </tr>
                  <tr>
                    <td>២</td>
                    <td>ស្នើសុំ</td>
                    <td>បុគ្គលិក</td>
                    <td><code>Submitted</code></td>
                    <td><code>frmTicket.DisplayMode = DisplayMode.Edit</code></td>
                  </tr>
                  <tr>
                    <td>៣</td>
                    <td>ពិនិត្យ</td>
                    <td>ប្រធាន</td>
                    <td><code>Under Review</code></td>
                    <td><code>btnReview.Visible = (UserRole = "Supervisor")</code></td>
                  </tr>
                  <tr>
                    <td>៤</td>
                    <td>សម្រេច</td>
                    <td>Plant Mgr</td>
                    <td><code>Approved / Rejected</code></td>
                    <td><code>btnApprove.DisplayMode = If(IsBlank(EstCost), Disabled, Edit)</code></td>
                  </tr>
                  <tr>
                    <td>៥</td>
                    <td>អនុវត្ត</td>
                    <td>ជាងដែក</td>
                    <td><code>In Repair</code></td>
                    <td><code>btnStart.Visible = (Status = "Approved") &amp;&amp; (Tech = User().Email)</code></td>
                  </tr>
                  <tr>
                    <td>៦</td>
                    <td>បញ្ចប់</td>
                    <td>អធិការ QC</td>
                    <td><code>Closed / Rework</code></td>
                    <td><code>frmTicket.DisplayMode = If(Status = "Closed", View, Edit)</code></td>
                  </tr>
                </tbody>
              </table>
              <h4 style="margin-top: 18px;">តារាងវាយតម្លៃសមត្ថភាព ៤ កម្រិត (Rubric)៖</h4>
              <div class="rubric-grid">
                <div class="rubric-card rubric-l4">
                  <span class="rubric-badge">កម្រិត ៤៖ ស្ទាត់ជំនាញ (១០០%)</span>
                  <p>គូសផែនទី ៦ ដំណាក់កាលឥតខ្ចោះ; ៤ តួនាទីច្បាស់លាស់; មានទាំងក្បួនថវិកា និងរង្វិលជុំ QC Rework; រូបមន្ត Power Fx ត្រឹមត្រូវ។</p>
                </div>
                <div class="rubric-card rubric-l3">
                  <span class="rubric-badge">កម្រិត ៣៖ កម្រិតល្អ (៧៥–៩៩%)</span>
                  <p>គូសផែនទីបានទាំង ៦ ដំណាក់កាល; តួនាទីច្បាស់; ខ្វះចន្លោះបន្តិចបន្តួចត្រង់រង្វិលជុំ rework ឬកំហុសអក្ខរាវិរុទ្ធ Power Fx បន្តិច។</p>
                </div>
                <div class="rubric-card rubric-l2">
                  <span class="rubric-badge">កម្រិត ២៖ កំពុងអភិវឌ្ឍ (៥០–៧៤%)</span>
                  <p>ចាត់ទុកដំណើរការត្រឹមជំហាន ២ ដាច់ដោយឡែក; អនុញ្ញាតឱ្យរំលងជំហាន ឬប្រើប្រាស់អក្សរវាយដៃសម្រាប់ស្ថានភាព។</p>
                </div>
                <div class="rubric-card rubric-l1">
                  <span class="rubric-badge">កម្រិត ១៖ ទើបចាប់ផ្តើម (&lt;៥០%)</span>
                  <p>មិនអាចញែកលំហូរការងារចេញពីរចនាសម្ព័ន្ធស្ថាប័ន ឬបញ្ជីការងារបាន; ខ្វះការផ្ទេរការងារ, ខ្វះម្ចាស់ និងគ្មានក្បួនច្បាប់។</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
    },
    // Slide 23: Homework
    {
      title: "កិច្ចការផ្ទះ ១៥ នាទី & ការត្រួតពិនិត្យខ្លួនឯង",
      content: `
        <div class="slide-header">
          <span class="section-tag">ការអនុវត្តក្នុងពិភពពិត</span>
          <h2>កិច្ចការផ្ទះអនុវត្តជាក់ស្តែង ១៥ នាទី &amp; តារាងផ្ទៀងផ្ទាត់</h2>
          <p class="subtitle">យកផ្នត់គំនិតថ្ងៃនេះ ទៅអនុវត្តលើដំណើរការប្រតិបត្តិការជាក់ស្តែងនៅក្នុងផ្នែកការងារផ្ទាល់របស់អ្នក។</p>
        </div>
        <div class="homework-container">
          <div class="homework-card">
            <div class="hw-badge">កិច្ចការអនុវត្តជាក់ស្តែង</div>
            <h3>គូសព្រាងលំហូរការងារមួយនៅលើក្រដាស</h3>
            <p>ជ្រើសរើសដំណើរការការងារពិតប្រាកដមួយក្នុងរោងចក្រ ឬការិយាល័យរបស់អ្នក (ឧ. ការក្រិតម៉ាស៊ីន, ការសុំសម្ភារៈអេតចាយ, ការត្រួតពិនិត្យរថយន្តលើក Forklift, ការកម្ម៉ង់គ្រឿងបន្លាស់)។</p>
            <ul class="hw-checklist">
              <li>✔️ <strong>១. បញ្ហា (Problem)៖</strong> តើព្រឹត្តិការណ៍រូបវន្តអ្វីដែលចាប់ផ្តើមលំហូរនេះ?</li>
              <li>✔️ <strong>២. ស្នើសុំ (Request)៖</strong> តើអ្នកណាជាអ្នកផ្ញើទម្រង់ឌីជីថលដំបូង?</li>
              <li>✔️ <strong>៣. ពិនិត្យ (Review)៖</strong> តើអ្នកណាជាអ្នកវាយតម្លៃសុវត្ថិភាព កាលវិភាគ ឬថ្លៃដើម?</li>
              <li>✔️ <strong>៤. សម្រេច (Decision)៖</strong> តើអ្វីជាច្រកលក្ខខណ្ឌ (តើមានសំណួរអ្វីដែលត្រូវសួរ)?</li>
              <li>✔️ <strong>៥. អនុវត្ត (Work)៖</strong> តើអ្នកណាជាអ្នកចុះធ្វើការងារផ្ទាល់?</li>
              <li>✔️ <strong>៦. បញ្ចប់ (Complete)៖</strong> តើអ្នកណាជាអ្នកត្រួតពិនិត្យចុងក្រោយ និងចុះហត្ថលេខា?</li>
            </ul>
            <div class="hw-reminder-pill">សូមយកគំនូសព្រាង ៦ ដំណាក់កាលនេះមកកាន់ថ្ងៃទី ១០!</div>
          </div>
          <div class="homework-self-audit">
            <h4>បញ្ជីផ្ទៀងផ្ទាត់ខ្លួនឯងមុនថ្ងៃស្អែក៖</h4>
            <ul class="audit-list">
              <li><span class="check-box">☑</span> តើគ្រប់ដំណាក់កាលទាំងអស់មានម្ចាស់ច្បាស់លាស់តែម្នាក់ដែរឬទេ?</li>
              <li><span class="check-box">☑</span> តើអ្នកបានកំណត់ផ្លូវបែកខ្នែងយ៉ាងហោចណាស់មួយ (ការបដិសេធ ឬរង្វិលជុំ rework) ដែរឬទេ?</li>
              <li><span class="check-box">☑</span> តើតម្លៃស្ថានភាពរបស់អ្នកជាតម្លៃផ្តាច់មុខ (សកម្មតែមួយក្នុងពេលតែមួយ) ដែរឬទេ?</li>
              <li><span class="check-box">☑</span> តើអ្នកបានកំណត់លក្ខខណ្ឌចាក់សោទិន្នន័យឱ្យទៅជាអានតែប៉ុណ្ណោះដែរឬទេ?</li>
            </ul>
          </div>
        </div>
      `
    },
    // Slide 24: 3-Day Bridge
    {
      title: "ផែនទីតភ្ជាប់ ៣ ថ្ងៃ & ស្ពានទៅថ្ងៃទី ១០",
      content: `
        <div class="slide-header">
          <span class="section-tag section-tag-accent">ស្ពានឆ្ពោះទៅមុខ</span>
          <h2>កន្លែងដែលយើងបានឆ្លងកាត់ &amp; អ្វីដែលនឹងមកដល់នៅថ្ងៃទី ១០</h2>
          <p class="subtitle">ថ្ងៃស្អែក យើងនឹងយកលំហូរ ៦ ដំណាក់កាលនេះ មកស្វែងរកថា តើត្រូវផ្ទុកទិន្នន័យអ្វីខ្លះនៅគ្រប់ជំហាន!</p>
        </div>
        <div class="three-day-bridge-grid">
          <div class="bridge-card bridge-yesterday">
            <span class="bridge-day">ម្សិលមិញ (ថ្ងៃទី ៨)</span>
            <h4>ផ្នែកនៃលំហូរ &amp; ស្ថានភាព</h4>
            <p>បំបែកធាតុផ្សំទាំង ៥៖ កត្តាជំរុញ, ជំហាន, ស្ថានភាព, ការសម្រេច, ការបញ្ចប់។ រៀនពីរបៀបដែលស្ថានភាពបញ្ជាតក្កវិជ្ជា។</p>
            <div class="bridge-footer">គោលគំនិត៖ រចនាសម្ព័ន្ធនៃលំហូរការងារ (Workflow Structure)</div>
          </div>
          <div class="bridge-card bridge-today">
            <span class="bridge-day active-day">ថ្ងៃនេះ (ថ្ងៃទី ៩)</span>
            <h4>លំហូរអាជីវកម្មពេញលេញ</h4>
            <p>ផ្គុំ ៦ ដំណាក់កាលជាសកល, គន្លងតួនាទី, ការផ្ទេរឈើបញ្ជូនបន្ត និងរង្វិលជុំ QC rework ទៅជាលំហូរមានជីវិតតែមួយ។</p>
            <div class="bridge-footer">គោលគំនិត៖ អភិបាលកិច្ចពីដើមដល់ចប់</div>
          </div>
          <div class="bridge-card bridge-tomorrow">
            <span class="bridge-day">ថ្ងៃស្អែក (ថ្ងៃទី ១០)</span>
            <h4>ការផ្ទុកទិន្នន័យនៅគ្រប់ជំហាន</h4>
            <p>ឥឡូវនេះយើងមានលំហូរ ៦ ដំណាក់កាលហើយ៖ <strong>តើទិន្នន័យជាក់លាក់អ្វីខ្លះដែលត្រូវកត់ត្រា និងរក្សាទុកនៅជំហាននីមួយៗ?</strong></p>
            <div class="bridge-footer">បន្ទាប់៖ តារាង &amp; ជួរឈរ Dataverse</div>
          </div>
        </div>
        <div class="closing-summary-banner">
          <span class="banner-sparkle">🚀</span>
          <span class="banner-text"><strong>សារបិទបញ្ចប់របស់គ្រូបង្វឹក៖</strong> "កម្មវិធីដ៏អស្ចារ្យមិនចាប់ផ្តើមពីកូដ ឬពណ៌នោះទេ។ វាចាប់ផ្តើមពីលំហូរការងារដែលមិនដាច់សង្វាក់ ដែលមនុស្សគ្រប់គ្នាស្គាល់តួនាទីរបស់ខ្លួន ហើយរាល់ការផ្ទេរការងារសុទ្ធតែមានម្ចាស់ច្បាស់លាស់។ សូមអបអរសាទរចំពោះការបញ្ចប់ថ្ងៃទី ៩!"</span>
        </div>
      `
    }
  ];

  // --------------------------------------------------------------------------
  // 3. ENGINE STATE & INITIALIZATION
  // --------------------------------------------------------------------------
  let currentSlideIndex = 0;
  const slides = Array.from(document.querySelectorAll('.slide'));
  const totalSlides = slides.length;
  let isKhmerActive = false;

  // Cache original English DOM content for non-destructive toggle
  const slideOriginals = slides.map(slide => {
    const content = slide.querySelector('.slide-content');
    return {
      title: slide.getAttribute('data-title') || '',
      content: content ? content.innerHTML : ''
    };
  });

  // 90-Minute Lesson Activity Timer State
  let elapsedSeconds = 0;
  let timerInterval = null;
  let isTimerRunning = false;

  // Simulator & Quiz State
  let simSolvedCount = 0;
  const userSimSelections = {};
  let currentQuizIndex = 0;
  let quizScore = 0;
  const userQuizAnswers = {};

  // Interactive Workbench State (Slide 12)
  let wbCurrentStage = 1;

  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initKeyboardShortcuts();
    initTimer();
    initLanguageSwitcher();
    initNotesDrawer();
    initOverviewGrid();
    initPresenterPointer();
    initWorkbench();
    initSimulator();
    initQuiz();
    initSolutionReveal();
    goToSlide(0);
  });

  // --------------------------------------------------------------------------
  // 4. NAVIGATION SYSTEM
  // --------------------------------------------------------------------------
  function initNavigation() {
    const nextBtn = document.getElementById('btn-next');
    const prevBtn = document.getElementById('btn-prev');
    const restartBtn = document.getElementById('btn-restart');
    const heroStartBtn = document.getElementById('hero-start-btn');

    if (nextBtn) {
      nextBtn.onclick = nextSlide;
      nextBtn.addEventListener('click', nextSlide);
    }
    if (prevBtn) {
      prevBtn.onclick = prevSlide;
      prevBtn.addEventListener('click', prevSlide);
    }
    if (restartBtn) restartBtn.addEventListener('click', () => goToSlide(0));
    if (heroStartBtn) heroStartBtn.addEventListener('click', nextSlide);
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

  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;

    slides.forEach((slide, idx) => {
      slide.classList.remove('active', 'prev');
      if (idx === index) {
        slide.classList.add('active');
      } else if (idx < index) {
        slide.classList.add('prev');
      }
    });

    currentSlideIndex = index;
    updateHeaderFooter();
    updateNotesContent();
    updateOverviewActiveState();
  }

  function updateHeaderFooter() {
    const currentSlide = slides[currentSlideIndex];
    const titleEl = document.getElementById('current-slide-title');
    const counterEl = document.getElementById('slide-counter');
    const progressEl = document.getElementById('progress-bar');
    const segmentEl = document.getElementById('current-segment-name');

    const titleEn = currentSlide.getAttribute('data-title') || 'Slide';
    const titleKh = KHMER_SLIDES[currentSlideIndex] ? KHMER_SLIDES[currentSlideIndex].title : titleEn;
    
    if (titleEl) {
      titleEl.textContent = isKhmerActive ? titleKh : titleEn;
    }

    const curNumEl = document.getElementById('slide-current-num') || document.getElementById('current-slide-num');
    const totalEl = document.getElementById('slide-total-count') || document.getElementById('total-slides-num');
    if (curNumEl) curNumEl.textContent = String(currentSlideIndex + 1);
    if (totalEl) totalEl.textContent = String(totalSlides);

    if (counterEl) {
      counterEl.innerHTML = isKhmerActive 
        ? `ស្លាយទី <span id="slide-current-num">${currentSlideIndex + 1}</span> / <span id="slide-total-count">${totalSlides}</span>`
        : `Slide <span id="slide-current-num">${currentSlideIndex + 1}</span> / <span id="slide-total-count">${totalSlides}</span>`;
    }

    const progressFill = document.getElementById('progress-bar') || document.getElementById('progress-fill') || document.getElementById('progress-bar-fill');
    if (progressFill) {
      const percentage = ((currentSlideIndex + 1) / totalSlides) * 100;
      progressFill.style.width = `${percentage}%`;
    }

    if (segmentEl && !isTimerRunning) {
      const segText = currentSlide.getAttribute('data-segment') || 'Part 1: Welcome & Spiral Recall';
      segmentEl.textContent = segText;
    }
  }

  // --------------------------------------------------------------------------
  // 5. KEYBOARD SHORTCUTS
  // --------------------------------------------------------------------------
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ignore if user is typing in input
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
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

        case 'n':
        case 'N':
          e.preventDefault();
          toggleNotes();
          break;

        case 'o':
        case 'O':
        case 'g':
        case 'G':
          e.preventDefault();
          toggleOverview();
          break;

        case 'l':
        case 'L':
          e.preventDefault();
          toggleLanguage();
          break;

        case 'p':
        case 'P':
          e.preventDefault();
          toggleLaserPointer();
          break;

        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;

        case 'Escape':
          e.preventDefault();
          closeAllDrawers();
          break;
      }
    });
  }

  // --------------------------------------------------------------------------
  // 6. 90-MINUTE ACTIVITY TIMER
  // --------------------------------------------------------------------------
  function initTimer() {
    const toggleBtn = document.getElementById('timer-toggle-btn');
    const resetBtn = document.getElementById('timer-reset-btn');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleTimer);
    }
    if (resetBtn) {
      resetBtn.addEventListener('click', resetTimer);
    }
  }

  function toggleTimer() {
    if (isTimerRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  }

  function startTimer() {
    if (isTimerRunning) return;
    isTimerRunning = true;
    updateTimerIcon(true);

    timerInterval = setInterval(() => {
      elapsedSeconds++;
      renderTimer();
      updateSegmentByTimer();
    }, 1000);
  }

  function pauseTimer() {
    isTimerRunning = false;
    clearInterval(timerInterval);
    updateTimerIcon(false);
  }

  function resetTimer() {
    pauseTimer();
    elapsedSeconds = 0;
    renderTimer();
    updateSegmentByTimer();
  }

  function renderTimer() {
    const timerDisplay = document.getElementById('session-timer');
    if (!timerDisplay) return;

    const mins = Math.floor(elapsedSeconds / 60);
    const secs = elapsedSeconds % 60;
    const padM = String(mins).padStart(2, '0');
    const padS = String(secs).padStart(2, '0');
    timerDisplay.textContent = `${padM}:${padS}`;
  }

  function updateTimerIcon(running) {
    const icon = document.getElementById('timer-icon');
    if (!icon) return;

    if (running) {
      // Pause icon
      icon.innerHTML = '<path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>';
    } else {
      // Play icon
      icon.innerHTML = '<path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>';
    }
  }

  function updateSegmentByTimer() {
    const segEl = document.getElementById('current-segment-name');
    if (!segEl) return;

    const mins = Math.floor(elapsedSeconds / 60);
    let segText = '';

    if (mins < 10) {
      segText = isKhmerActive ? 'វគ្គ ១៖ រំលឹក & តភ្ជាប់ (10 នាទី)' : 'Part 1: Welcome & Spiral Recall';
    } else if (mins < 25) {
      segText = isKhmerActive ? 'វគ្គ ២៖ ស្វែងយល់ពីមូលហេតុ (15 នាទី)' : 'Part 2: Discover (The Why)';
    } else if (mins < 45) {
      segText = isKhmerActive ? 'វគ្គ ៣៖ ទ្រឹស្តីស៊ីជម្រៅ (20 នាទី)' : 'Part 3: Deep Dive Theory';
    } else if (mins < 60) {
      segText = isKhmerActive ? 'វគ្គ ៤៖ ក្តារពិសោធន៍អន្តរកម្ម (15 នាទី)' : 'Part 4: Demonstrate & Lab';
    } else if (mins < 75) {
      segText = isKhmerActive ? 'វគ្គ ៥៖ ការអនុវត្តជាមួយគ្រូ (15 នាទី)' : 'Part 5: Guided Practice';
    } else {
      segText = isKhmerActive ? 'វគ្គ ៦៖ វាយតម្លៃ & ស្ពានបន្ត (15 នាទី)' : 'Part 6: Assess & Bridge';
    }

    segEl.textContent = segText;
  }

  // --------------------------------------------------------------------------
  // 7. PRESENTER NOTES & OVERVIEW GRID
  // --------------------------------------------------------------------------
  function initNotesDrawer() {
    const notesBtn = document.getElementById('notes-toggle-btn');
    const closeBtn = document.getElementById('notes-close-btn');

    if (notesBtn) notesBtn.addEventListener('click', toggleNotes);
    if (closeBtn) closeBtn.addEventListener('click', closeNotes);
  }

  function toggleNotes() {
    const drawer = document.getElementById('notes-drawer');
    if (drawer) drawer.classList.toggle('open');
  }

  function closeNotes() {
    const drawer = document.getElementById('notes-drawer');
    if (drawer) drawer.classList.remove('open');
  }

  function updateNotesContent() {
    const contentEl = document.getElementById('notes-content');
    if (!contentEl) return;

    const currentSlide = slides[currentSlideIndex];
    const notesAside = currentSlide.querySelector('.trainer-notes');

    if (notesAside) {
      contentEl.innerHTML = notesAside.innerHTML;
    } else {
      contentEl.innerHTML = '<p><em>No trainer script recorded for this slide.</em></p>';
    }
  }

  function initOverviewGrid() {
    const overviewBtn = document.getElementById('overview-toggle-btn');
    const closeBtn = document.getElementById('overview-close-btn');
    const gridContainer = document.getElementById('overview-grid');

    if (overviewBtn) overviewBtn.addEventListener('click', toggleOverview);
    if (closeBtn) closeBtn.addEventListener('click', closeOverview);

    if (gridContainer) {
      gridContainer.innerHTML = '';
      slides.forEach((slide, idx) => {
        const card = document.createElement('div');
        card.className = 'overview-card';
        card.dataset.index = idx;

        const title = slide.getAttribute('data-title') || `Slide ${idx + 1}`;
        card.innerHTML = `
          <span class="overview-card-num">${String(idx + 1).padStart(2, '0')}</span>
          <span class="overview-card-title">${title}</span>
        `;

        card.addEventListener('click', () => {
          goToSlide(idx);
          closeOverview();
        });

        gridContainer.appendChild(card);
      });
    }
  }

  function toggleOverview() {
    const modal = document.getElementById('overview-modal');
    if (modal) {
      modal.classList.toggle('open');
      updateOverviewActiveState();
    }
  }

  function closeOverview() {
    const modal = document.getElementById('overview-modal');
    if (modal) modal.classList.remove('open');
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

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
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
  // 9. SLIDE 12: INTERACTIVE DECISION WORKBENCH (WIDGET 1)
  // --------------------------------------------------------------------------
  function initWorkbench() {
    const costSlider = document.getElementById('wb-cost-slider');
    const costDisplay = document.getElementById('wb-cost-display');
    const decisionRole = document.getElementById('wb-decision-role');
    const nextBtn = document.getElementById('wb-btn-step-next');
    const qcFailBtn = document.getElementById('wb-btn-qc-fail');
    const resetBtn = document.getElementById('wb-btn-reset-flow');

    if (costSlider && costDisplay) {
      costSlider.addEventListener('input', () => {
        const val = parseInt(costSlider.value, 10);
        costDisplay.textContent = `$${val}`;

        if (decisionRole) {
          if (val > 2000) {
            decisionRole.textContent = isKhmerActive ? 'ប្រធានរោងចក្រ (Plant Mgr)' : 'Plant Manager';
            decisionRole.style.color = '#fde047';
          } else {
            decisionRole.textContent = isKhmerActive ? 'ប្រធានវេន (Supervisor)' : 'Supervisor';
            decisionRole.style.color = '#38bdf8';
          }
        }
      });
    }

    if (nextBtn) {
      nextBtn.onclick = () => {
        if (wbCurrentStage < 6) {
          wbCurrentStage++;
          renderWorkbenchStage();
        }
      };
    }

    if (qcFailBtn) {
      qcFailBtn.onclick = () => {
        // Trigger QC Rework Loop back to stage 5 (Work / In Repair)
        wbCurrentStage = 5;
        renderWorkbenchStage(true); // pass rework flag
      };
    }

    if (resetBtn) {
      resetBtn.onclick = () => {
        wbCurrentStage = 1;
        renderWorkbenchStage();
      };
    }

    renderWorkbenchStage();
  }

  function renderWorkbenchStage(isRework = false) {
    const inspector = document.getElementById('wb-powerfx-inspector');
    const qcFailBtn = document.getElementById('wb-btn-qc-fail');
    const nextBtn = document.getElementById('wb-btn-step-next');
    const ticketDesc = document.getElementById('wb-ticket-desc');
    const costSlider = document.getElementById('wb-cost-slider');

    // Update active highlight on 6 tracker nodes
    for (let i = 1; i <= 6; i++) {
      const node = document.getElementById(`node-stage-${i}`);
      if (node) {
        if (i === wbCurrentStage) {
          node.classList.add('current-active-node');
          node.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          node.classList.remove('current-active-node');
        }
      }
    }

    // Toggle QC Fail button visibility
    if (qcFailBtn) {
      qcFailBtn.style.display = (wbCurrentStage === 5) ? 'inline-block' : 'none';
    }

    // Update Power Fx Code Inspector text based on stage
    if (inspector) {
      inspector.classList.remove('wb-code-flash');
      void inspector.offsetWidth; // Force DOM reflow
      inspector.classList.add('wb-code-flash');

      switch (wbCurrentStage) {
        case 1: // Problem
          inspector.textContent = 'frmRequest.DisplayMode = DisplayMode.Edit';
          if (ticketDesc) ticketDesc.disabled = false;
          if (costSlider) costSlider.disabled = false;
          if (nextBtn) nextBtn.disabled = false;
          break;

        case 2: // Request
          inspector.textContent = 'btnSubmit.Visible = !IsBlank(txtDescription.Text) && (Status = "Draft")';
          if (ticketDesc) ticketDesc.disabled = true;
          break;

        case 3: // Review
          inspector.textContent = 'btnReview.Visible = (UserRole = "Supervisor") && (Status = "Submitted")';
          break;

        case 4: // Decision
          inspector.textContent = 'btnApprove.DisplayMode = If(EstCost > 2000, RequirePlantMgrSignoff, AllowSupervisorSignoff)';
          break;

        case 5: // Work
          if (isRework) {
            inspector.textContent = 'Status = "In Repair"; lblAlert.Text = "REWORK LOOP: QC Tolerance Out of Spec (> 0.02mm)"';
          } else {
            inspector.textContent = 'btnStartRepair.Visible = (Status = "Approved") && (AssignedTech = User().Email)';
          }
          break;

        case 6: // Complete
          inspector.textContent = 'frmTicket.DisplayMode = If(Status = "Closed", DisplayMode.View, DisplayMode.Edit)';
          if (nextBtn) nextBtn.disabled = true;
          break;
      }
    }
  }

  // --------------------------------------------------------------------------
  // 10. SLIDE 18: MULTI-SCENARIO PRACTICE SIMULATOR (WIDGET 2)
  // --------------------------------------------------------------------------
  function initSimulator() {
    const container = document.getElementById('sim-cards-container');
    if (!container) return;

    container.innerHTML = '';
    simSolvedCount = 0;
    updateSimScore();

    SIMULATOR_SCENARIOS.forEach(sc => {
      const card = document.createElement('div');
      card.className = 'eval-card';
      card.id = `sim-card-${sc.id}`;

      const title = isKhmerActive ? sc.titleKh : sc.titleEn;
      const desc = isKhmerActive ? sc.descKh : sc.descEn;
      const choiceA = isKhmerActive ? sc.choiceA_Kh : sc.choiceA_En;
      const choiceB = isKhmerActive ? sc.choiceB_Kh : sc.choiceB_En;

      card.innerHTML = `
        <span class="eval-num">${sc.num}</span>
        <h4>${title}</h4>
        <p class="eval-desc">${desc}</p>
        <div class="eval-btn-group">
          <button class="sim-btn" data-choice="A">${choiceA}</button>
          <button class="sim-btn" data-choice="B">${choiceB}</button>
        </div>
        <div class="sim-feedback" id="sim-feedback-${sc.id}"></div>
      `;

      const btnA = card.querySelector('[data-choice="A"]');
      const btnB = card.querySelector('[data-choice="B"]');

      btnA.addEventListener('click', () => handleSimChoice(sc, 'A', btnA, btnB));
      btnB.addEventListener('click', () => handleSimChoice(sc, 'B', btnB, btnA));

      // Restore if already selected
      if (userSimSelections[sc.id]) {
        const prev = userSimSelections[sc.id];
        const chosenBtn = (prev.choice === 'A') ? btnA : btnB;
        const otherBtn = (prev.choice === 'A') ? btnB : btnA;
        handleSimChoice(sc, prev.choice, chosenBtn, otherBtn, true);
      }

      container.appendChild(card);
    });
  }

  function handleSimChoice(sc, choice, chosenBtn, otherBtn, isRestore = false) {
    const feedbackBox = document.getElementById(`sim-feedback-${sc.id}`);
    if (!feedbackBox) return;

    chosenBtn.disabled = true;
    otherBtn.disabled = true;

    const isCorrect = (choice === sc.correct);
    if (!isRestore) {
      userSimSelections[sc.id] = { choice, isCorrect };
      if (isCorrect) simSolvedCount++;
      updateSimScore();
    }

    if (isCorrect) {
      chosenBtn.classList.add('btn-correct');
      feedbackBox.className = 'sim-feedback correct';
      feedbackBox.textContent = isKhmerActive ? sc.feedbackKh : sc.feedbackEn;
    } else {
      chosenBtn.classList.add('btn-wrong');
      otherBtn.classList.add('btn-correct');
      feedbackBox.className = 'sim-feedback wrong';
      feedbackBox.textContent = isKhmerActive 
        ? `មិនត្រឹមត្រូវទេ។ ${sc.feedbackKh}` 
        : `Incorrect. ${sc.feedbackEn}`;
    }
  }

  function updateSimScore() {
    const scoreEl = document.getElementById('sim-score');
    if (scoreEl) {
      scoreEl.textContent = simSolvedCount;
    }
  }

  // --------------------------------------------------------------------------
  // 11. SLIDE 20: 5-QUESTION EVALUATIVE KNOWLEDGE CHECK (WIDGET 3)
  // --------------------------------------------------------------------------
  function initQuiz() {
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
  // 12. SLIDE 22: CAPSTONE SOLUTION REVEAL DRAWER (WIDGET 4)
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
  // 13. PRESENTER FOCUS LASER POINTER & CLICK RIPPLE ENGINE
  // --------------------------------------------------------------------------
  let isLaserActive = true; // active by default for immediate instructional focus!
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
    const laserBtn = document.getElementById('laser-toggle-btn');

    if (laserBtn) {
      laserBtn.addEventListener('click', toggleLaserPointer);
      if (isLaserActive) laserBtn.classList.add('active');
    }

    if (isLaserActive) {
      document.body.classList.add('laser-mode');
    }

    // High performance mouse tracking with requestAnimationFrame
    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isPointerMoving && isLaserActive) {
        isPointerMoving = true;
        requestAnimationFrame(renderPointerLoop);
      }
    }, { passive: true });

    // Focus Click Ripple: radiates expanding attention wave on teacher click!
    window.addEventListener('click', (e) => {
      if (!isLaserActive || !rippleEl) return;
      
      // Position ripple at exact click coordinates
      rippleEl.style.left = `${e.clientX}px`;
      rippleEl.style.top = `${e.clientY}px`;
      
      // Trigger CSS animation reflow
      rippleEl.classList.remove('rippling');
      void rippleEl.offsetWidth; // Force DOM reflow
      rippleEl.classList.add('rippling');
    });
  }

  function renderPointerLoop() {
    if (!pointerEl || !isLaserActive) {
      isPointerMoving = false;
      return;
    }

    // Smooth lerp (linear interpolation) for buttery-smooth follower physics
    currentX += (targetX - currentX) * 0.45;
    currentY += (targetY - currentY) * 0.45;

    pointerEl.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

    // Continue loop if still moving
    if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
      requestAnimationFrame(renderPointerLoop);
    } else {
      isPointerMoving = false;
    }
  }

  function toggleLaserPointer() {
    isLaserActive = !isLaserActive;
    const laserBtn = document.getElementById('laser-toggle-btn');

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
