/**
 * ============================================================================
 * POWER APPS FOUNDATION: DAY 12 PRESENTATION JAVASCRIPT ENGINE
 * Topic: From Process + Data to App Screens
 * Phase: Phase 5: App Design & User Interface
 * Architecture: Zero-Dependency Pure Vanilla JS (16:9 Viewport Stage)
 * Features: Non-Destructive Bilingual Swapping, 90-Min Timer, 4 Interactive Widgets,
 *           Presenter Laser Pointer with Ripple Shockwave, Presenter Notes Drawer
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------------------------------------
  let currentSlideIndex = 0;
  const totalSlides = 24;
  let isKhmerActive = false;
  let isLaserActive = true;
  let isTimerRunning = false;
  let elapsedSeconds = 0;
  let timerInterval = null;

  // Cache original English slide contents on boot
  const slideOriginals = [];
  let slides = [];

  // --------------------------------------------------------------------------
  // 1. WIDGET 1 DATA: TASK-TO-SCREEN ARCHITECT MATRIX
  // --------------------------------------------------------------------------
  const WORKBENCH_DATA = {
    operator: {
      tasks: [
        {
          id: "log_breakdown",
          titleEn: "1. Log Machine Breakdown (Urgent Maintenance Request)",
          titleKh: "១. កត់ត្រាម៉ាស៊ីនខូច (សំណើជួសជុលបន្ទាន់)",
          screenName: "scrNewBreakdown",
          archetypeEn: "Intake Form Station",
          archetypeKh: "ស្ថានីយទម្រង់ស្នើសុំ (Intake Form Station)",
          inputsEn: "cmbPressMachine (Dropdown), txtSymptom (Multiline Text), rdoUrgency (Radio Buttons)",
          inputsKh: "cmbPressMachine (ទម្លាក់ចុះ), txtSymptom (អត្ថបទច្រើនបន្ទាត់), rdoUrgency (ប៊ូតុងជ្រើសរើស)",
          displaysEn: "lblHeaderTitle, imgMachineDiagram, lblOperatorName (Auto-filled)",
          displaysKh: "lblHeaderTitle, imgMachineDiagram, lblOperatorName (បំពេញស្វ័យប្រវត្តិ)",
          actionsEn: "btnSubmitBreakdown, btnCancelIntake",
          actionsKh: "btnSubmitBreakdown, btnCancelIntake",
          powerFx: `SubmitForm(frmBreakdown);\nNotify("Machine breakdown logged! Maintenance dispatched.", NotificationType.Success);\nNavigate(scrHomeGallery, ScreenTransition.Cover)`
        },
        {
          id: "request_die",
          titleEn: "2. Request Tooling Mold Die Change (Scheduled Changeover)",
          titleKh: "២. ស្នើសុំប្តូរពុម្ពដែក (ការប្តូរតាមកាលវិភាគ)",
          screenName: "scrToolingIntake",
          archetypeEn: "Intake Form Station",
          archetypeKh: "ស្ថានីយទម្រង់ស្នើសុំ (Intake Form Station)",
          inputsEn: "cmbPressMachine, txtDiePartNum, numTargetCycles",
          inputsKh: "cmbPressMachine, txtDiePartNum, numTargetCycles",
          displaysEn: "lblHeaderTitle, lblMaxCyclesWarning, lblShiftBadge",
          displaysKh: "lblHeaderTitle, lblMaxCyclesWarning, lblShiftBadge",
          actionsEn: "btnRequestDie, btnBackToHome",
          actionsKh: "btnRequestDie, btnBackToHome",
          powerFx: `SubmitForm(frmTooling);\nNotify("Tooling mold request forwarded to Toolroom supervisor.", NotificationType.Information);\nNavigate(scrHomeGallery, ScreenTransition.Fade)`
        }
      ]
    },
    supervisor: {
      tasks: [
        {
          id: "approve_repair",
          titleEn: "1. Review & Authorize Repair Quote ($2,500+ Financial Gate)",
          titleKh: "១. ពិនិត្យ & អនុម័តតម្លៃជួសជុល ($2,500+ ច្រកហិរញ្ញវត្ថុ)",
          screenName: "scrApprovalDecision",
          archetypeEn: "Decision & Sign-Off Station",
          archetypeKh: "ស្ថានីយសម្រេចចិត្ត & ចុះហត្ថលេខា (Decision Station)",
          inputsEn: "txtSupervisorNotes (Multiline), numAuthorizedBudget (Currency)",
          inputsKh: "txtSupervisorNotes (អត្ថបទពិពណ៌នា), numAuthorizedBudget (បញ្ចូលថវិកា)",
          displaysEn: "lblMachineID, lblEstimatedCost, lblBreakdownHistory, lblTechnicianQuote",
          displaysKh: "lblMachineID, lblEstimatedCost, lblBreakdownHistory, lblTechnicianQuote",
          actionsEn: "btnApproveQuote, btnRejectQuote, btnBackToQueue",
          actionsKh: "btnApproveQuote, btnRejectQuote, btnBackToQueue",
          powerFx: `Patch(ServiceRequests, CurrentItem, {\n  Status: "Approved",\n  ApprovedBy: User().Email,\n  Budget: numAuthorizedBudget.Text\n});\nNotify("Repair quote authorized. Maintenance work order created.", NotificationType.Success);\nNavigate(scrHomeGallery, ScreenTransition.UnCover)`
        },
        {
          id: "assign_tech",
          titleEn: "2. Assign Work Order to Maintenance Technician",
          titleKh: "២. ចាត់តាំងសំបុត្រការងារទៅឱ្យជាងបច្ចេកទេស",
          screenName: "scrAssignTechnician",
          archetypeEn: "Assignment & Dispatch Station",
          archetypeKh: "ស្ថានីយចាត់តាំងការងារ (Assignment & Dispatch)",
          inputsEn: "cmbTechnician (Dropdown), dtTargetCompletion (DatePicker)",
          inputsKh: "cmbTechnician (បញ្ជីឈ្មោះជាង), dtTargetCompletion (កាលបរិច្ឆេទកំណត់)",
          displaysEn: "lblUrgencyTag, lblMachineIssueSummary, lblAvailableTechs",
          displaysKh: "lblUrgencyTag, lblMachineIssueSummary, lblAvailableTechs",
          actionsEn: "btnDispatchWork, btnCancelDispatch",
          actionsKh: "btnDispatchWork, btnCancelDispatch",
          powerFx: `Patch(ServiceRequests, CurrentItem, {\n  Status: "Dispatched",\n  AssignedTo: cmbTechnician.Selected.Email\n});\nNotify("Work order dispatched to " & cmbTechnician.Selected.DisplayName, NotificationType.Success);\nNavigate(scrHomeGallery, ScreenTransition.None)`
        }
      ]
    },
    technician: {
      tasks: [
        {
          id: "repair_execution",
          titleEn: "1. Execute Hydraulic & Mechanical Repair (On-the-Floor Action)",
          titleKh: "១. អនុវត្តការជួសជុលប្រព័ន្ធធារាសាស្ត្រ & គ្រឿងយន្ត",
          screenName: "scrWorkExecution",
          archetypeEn: "Action & Checklist Station",
          archetypeKh: "ស្ថានីយអនុវត្ត & បញ្ជីត្រួតពិនិត្យ (Action Checklist)",
          inputsEn: "chkLeakInspection (Checkbox), chkPressureCalibrated, txtPartReplaced",
          inputsKh: "chkLeakInspection (ប្រអប់ធីក), chkPressureCalibrated, txtPartReplaced",
          displaysEn: "lblSafetyWarning, lblMachineSpecs, timElapsedTime, lblSchematicDiagram",
          displaysKh: "lblSafetyWarning, lblMachineSpecs, timElapsedTime, lblSchematicDiagram",
          actionsEn: "btnMarkRepaired, btnOrderSpareParts",
          actionsKh: "btnMarkRepaired, btnOrderSpareParts",
          powerFx: `Patch(ServiceRequests, CurrentItem, {\n  Status: "Repaired",\n  RepairNotes: txtPartReplaced.Text\n});\nNotify("Repair marked complete. Routed to Quality Inspector for sign-off.", NotificationType.Success);\nNavigate(scrHomeGallery, ScreenTransition.Cover)`
        },
        {
          id: "parts_requisition",
          titleEn: "2. Requisition Replacement Part from Warehouse",
          titleKh: "២. ស្នើសុំដកគ្រឿងបន្លាស់ពីឃ្លាំង",
          screenName: "scrPartsRequisition",
          archetypeEn: "Inventory Intake Station",
          archetypeKh: "ស្ថានីយដកសម្ភារៈពីឃ្លាំង (Inventory Intake)",
          inputsEn: "cmbSparePart (Searchable Dropdown), numQuantity (NumberInput)",
          inputsKh: "cmbSparePart (ស្វែងរកគ្រឿងបន្លាស់), numQuantity (ចំនួនដក)",
          displaysEn: "lblStockRemaining, lblWarehouseBinLocation, lblPartCost",
          displaysKh: "lblStockRemaining, lblWarehouseBinLocation, lblPartCost",
          actionsEn: "btnIssuePart, btnBackToWork",
          actionsKh: "btnIssuePart, btnBackToWork",
          powerFx: `Patch(Inventory, cmbSparePart.Selected, {\n  StockQty: cmbSparePart.Selected.StockQty - Value(numQuantity.Text)\n});\nNotify("Spare parts requisition logged.", NotificationType.Success);\nBack()`
        }
      ]
    },
    qa: {
      tasks: [
        {
          id: "quality_signoff",
          titleEn: "1. Final Safety Inspection & Line Release (QC Sign-Off)",
          titleKh: "១. ការត្រួតពិនិត្យសុវត្ថិភាពចុងក្រោយ & បញ្ចេញម៉ាស៊ីនឱ្យដំណើរការ",
          screenName: "scrQualitySignOff",
          archetypeEn: "Audit Sign-Off Station",
          archetypeKh: "ស្ថានីយវាយតម្លៃគុណភាព & ចុះហត្ថលេខា (Audit Station)",
          inputsEn: "rdoSafetyCheck (Pass/Fail Radio), txtInspectorNotes (Multiline)",
          inputsKh: "rdoSafetyCheck (Pass/Fail Radio), txtInspectorNotes (កំណត់ចំណាំ)",
          displaysEn: "lblAuditChecklist, lblTechnicianSignature, lblMachineReadings",
          displaysKh: "lblAuditChecklist, lblTechnicianSignature, lblMachineReadings",
          actionsEn: "btnPassAndRelease, btnFailAndRework",
          actionsKh: "btnPassAndRelease, btnFailAndRework",
          powerFx: `If(rdoSafetyCheck.Selected.Value = "Pass",\n  Patch(ServiceRequests, CurrentItem, { Status: "Closed", ReleasedAt: Now() });\n  Notify("Press Machine released for production!", NotificationType.Success);\n  Navigate(scrHomeGallery, ScreenTransition.Cover),\n  Patch(ServiceRequests, CurrentItem, { Status: "ReworkRequired" });\n  Notify("Defect flagged! Work order returned to technician.", NotificationType.Warning);\n  Navigate(scrHomeGallery, ScreenTransition.Fade)\n)`
        }
      ]
    }
  };

  // --------------------------------------------------------------------------
  // 2. WIDGET 2 DATA: 6-SCENARIO SCREEN ARCHITECTURE SIMULATOR
  // --------------------------------------------------------------------------
  let currentSimIndex = 0;
  let simScore = 0;
  const simAnswered = [false, false, false, false, false, false];

  const SIMULATOR_SCENARIOS = [
    {
      num: "SCENARIO 1",
      titleEn: "The Plant Manager's Morning Inspection",
      titleKh: "ការត្រួតពិនិត្យពេលព្រឹករបស់ប្រធានរោងចក្រ",
      descEn: "The plant manager wants to open the app on an iPad to see an overview of all 18 injection molding machines, filter active breakdowns by urgency, and monitor total estimated downtime costs.",
      descKh: "ប្រធានរោងចក្រចង់បើកកម្មវិធីលើ iPad ដើម្បីមើលទិដ្ឋភាពទូទៅនៃម៉ាស៊ីនទាំង ១៨ ក្នុងរោងចក្រ ត្រងមើលការខូចខាតតាមកម្រិតបន្ទាន់ និងតាមដានថ្លៃខាតបង់សរុប។",
      correctChoice: "browse",
      feedbackEn: "✅ Correct! This is purely a Browse/Analytical task. A Gallery or Dashboard Screen (`scrHome`) with search and filter controls is ideal. Putting input forms here would create unnecessary clutter.",
      feedbackKh: "✅ ត្រឹមត្រូវណាស់! នេះជាកិច្ចការពិនិត្យមើលទិន្នន័យ (Browse/Analytical)។ អេក្រង់ Gallery ឬ Dashboard (`scrHome`) ដែលមានកន្លែងស្វែងរកនិងតម្រង គឺជាជម្រើសដ៏ល្អឥតខ្ចោះ។"
    },
    {
      num: "SCENARIO 2",
      titleEn: "Operator Reports a Hydraulic Oil Leak",
      titleKh: "បុគ្គលិកបញ្ជាម៉ាស៊ីនរាយការណ៍អំពីការលេចធ្លាយប្រេងធារាសាស្ត្រ",
      descEn: "Operator Sothea notices oil dripping from Press #4. She needs to quickly select the machine number, choose 'Hydraulic Leak', take a camera photo of the leak, and send it to Maintenance.",
      descKh: "បុគ្គលិក Bopha ឃើញប្រេងស្រក់ចេញពីម៉ាស៊ីនចាក់ពុម្ពលេខ ៤។ គាត់ត្រូវជ្រើសរើសលេខម៉ាស៊ីនយ៉ាងរហ័ស ជ្រើសរើសប្រភេទ 'លេចធ្លាយប្រេង' ថតរូបភាព និងចុចផ្ញើទៅកាន់ផ្នែកជួសជុល។",
      correctChoice: "intake",
      feedbackEn: "✅ Correct! This is a dedicated data creation task. An Intake Form Screen (`scrNewBreakdown`) containing only the machine dropdown, symptom text, camera control, and a Submit button ensures zero distractions.",
      feedbackKh: "✅ ត្រឹមត្រូវណាស់! នេះជាកិច្ចការបង្កើតទិន្នន័យថ្មី។ អេក្រង់ទម្រង់ស្នើសុំ (`scrNewBreakdown`) ដែលមានតែបញ្ជីរើសម៉ាស៊ីន, ប្រអប់អត្ថបទ, កាមេរ៉ា និងប៊ូតុង Submit ធានាថាមិនមានការរំខានឡើយ។"
    },
    {
      num: "SCENARIO 3",
      titleEn: "Supervisor Approves $4,200 Servo Motor Quote",
      titleKh: "ប្រធានពិនិត្យអនុម័តតម្លៃម៉ូទ័រជួសជុល $4,200",
      descEn: "Supervisor Visal receives an urgent notification. A repair requires buying a new $4,200 servo motor. He must review the technician's notes, inspect the quote, and decide: Approve or Reject.",
      descKh: "ប្រធាន Visal ទទួលបានការជូនដំណឹងបន្ទាន់។ ការជួសជុលតម្រូវឱ្យទិញម៉ូទ័រថ្មីតម្លៃ $4,200។ គាត់ត្រូវពិនិត្យកំណត់ចំណាំរបស់ជាង មើលសម្រង់តម្លៃ និងសម្រេចចិត្ត៖ អនុម័ត ឬ បដិសេធ។",
      correctChoice: "intake",
      feedbackEn: "✅ Correct! This is a Decision Station Screen (`scrApproval`). It presents read-only details of the ticket and highlights two clear decision buttons: Approve and Reject.",
      feedbackKh: "✅ ត្រឹមត្រូវណាស់! នេះជាស្ថានីយសម្រេចចិត្ត (`scrApproval`)។ វាបង្ហាញព័ត៌មានលម្អិតសម្រាប់តែអាន និងផ្តល់ប៊ូតុងសម្រេចចិត្តច្បាស់លាស់ពីរគឺ៖ Approve និង Reject។"
    },
    {
      num: "SCENARIO 4",
      titleEn: "Technician Standing on a 4-Meter Scissor Lift",
      titleKh: "ជាងកំពុងឈរលើជណ្តើរយន្តកម្ពស់ ៤ ម៉ែត្រ",
      descEn: "Technician Dara is wearing safety harness and gloves 4 meters in the air. He needs to check off 3 safety calibration tests and record the replaced bearing serial number on his phone.",
      descKh: "ជាង Dara ពាក់ខ្សែក្រវ៉ាត់សុវត្ថិភាព និងស្រោមដៃកំពុងឈរលើជណ្តើរកម្ពស់ ៤ ម៉ែត្រ។ គាត់ត្រូវគូសធីកតេស្តសុវត្ថិភាព ៣ ចំណុច និងកត់ត្រាលេខកូដប៊ូដង់ដែលបានប្តូររួច។",
      correctChoice: "work",
      feedbackEn: "✅ Correct! This requires an Action/Checklist Screen (`scrWorkExecution`) designed with large, fat-finger-friendly checkboxes, high contrast, and a single 'Complete Repair' action button.",
      feedbackKh: "✅ ត្រឹមត្រូវណាស់! នេះទាមទារអេក្រង់អនុវត្តការងារ (`scrWorkExecution`) ដែលមានប្រអប់ធីកធំៗងាយស្រួលចុចពេលពាក់ស្រោមដៃ និងប៊ូតុង 'Complete Repair' ធំៗច្បាស់លាស់។"
    },
    {
      num: "SCENARIO 5",
      titleEn: "Warehouse Receiving 200 Replacement O-Rings",
      titleKh: "ឃ្លាំងទទួលកងជ័រ O-Ring ចំនួន ២០០ គ្រាប់",
      descEn: "The warehouse clerk unboxes an urgent delivery of hydraulic seals. He needs to scan the box barcode and increment the current inventory stock level.",
      descKh: "បុគ្គលិកឃ្លាំងបើកកេសទំនិញដែលបានដឹកមកដល់។ គាត់ត្រូវស្កេនបាកូដប្រអប់ និងបន្ថែមចំនួនទំនិញទៅក្នុងស្តុកបច្ចុប្បន្ន។",
      correctChoice: "intake",
      feedbackEn: "✅ Correct! This is an Inventory Intake Screen with a Barcode Scanner input control and a Quantity number input, immediately writing changes to the storage table.",
      feedbackKh: "✅ ត្រឹមត្រូវណាស់! នេះជាអេក្រង់ទម្រង់ដក/បញ្ចូលស្តុក ដែលមានកន្លែងស្កេន Barcode និងប្រអប់បញ្ចូលចំនួន ដើម្បីកត់ត្រាការផ្លាស់ប្តូរទៅក្នុងតារាងទិន្នន័យ។"
    },
    {
      num: "SCENARIO 6",
      titleEn: "External ISO Safety Auditor Reviews 2025 History",
      titleKh: "សវនករសុវត្ថិភាព ISO ពិនិត្យប្រវត្តិការងារឆ្នាំ ២០២៥",
      descEn: "An ISO safety auditor visits the plant and requests full records of all closed breakdown tickets from Q1. She must verify dates, technician notes, and supervisor sign-offs without being able to edit anything.",
      descKh: "សវនករ ISO មកដល់រោងចក្រ ហើយទាមទារមើលកំណត់ត្រានៃសំណើជួសជុលទាំងអស់ក្នុងត្រីមាសទី ១។ គាត់ត្រូវផ្ទៀងផ្ទាត់កាលបរិច្ឆេទ កំណត់ចំណាំ និងហត្ថលេខា ដោយមិនអនុញ្ញាតឱ្យកែប្រែអ្វីឡើយ។",
      correctChoice: "browse",
      feedbackEn: "✅ Correct! This requires a Read-Only History Screen using Display Controls (Labels, Read-only Forms, Gallery) with all input controls strictly locked (`DisplayMode.View`).",
      feedbackKh: "✅ ត្រឹមត្រូវណាស់! នេះទាមទារអេក្រង់ប្រវត្តិសម្រាប់តែអាន (Read-Only) ដោយប្រើប្រាស់ Label និង Gallery ហើយចាក់សោរាល់ប្រអប់បញ្ចូលទាំងអស់ (`DisplayMode.View`)។"
    }
  ];

  // --------------------------------------------------------------------------
  // 3. WIDGET 3 DATA: 5-QUESTION EVALUATIVE ASSESSMENT QUIZ
  // --------------------------------------------------------------------------
  let currentQuizIndex = 0;
  let quizScore = 0;
  const quizAnswered = [false, false, false, false, false];

  const QUIZ_QUESTIONS = [
    {
      titleEn: "1. Why does enterprise UX require separating user tasks into dedicated screens rather than putting all fields onto one screen?",
      titleKh: "១. ហេតុអ្វីបានជាស្ថាបត្យកម្ម UX សហគ្រាស ទាមទារឱ្យបំបែកកិច្ចការអ្នកប្រើទៅតាមអេក្រង់ផ្សេងៗគ្នា ជាជាងដាក់វាទាំងអស់លើអេក្រង់តែមួយ?",
      optionsEn: [
        "A) Because Power Apps can only hold 5 controls per screen",
        "B) To enforce cognitive focus, eliminate accidental clicks on high-stakes buttons, and show users only the data relevant to their task",
        "C) To make the mobile phone battery last longer during factory shifts",
        "D) Because Microsoft charges a licensing fee for every button on a screen"
      ],
      optionsKh: [
        "A) ពីព្រោះ Power Apps អាចផ្ទុក Control បានត្រឹមតែ ៥ ប៉ុណ្ណោះក្នុងមួយអេក្រង់",
        "B) ដើម្បីរក្សាការផ្តោតអារម្មណ៍, ការពារការចុចច្រឡំលើប៊ូតុងសំខាន់ៗ និងបង្ហាញទិន្នន័យតែណាដែលពាក់ព័ន្ធនឹងកិច្ចការរបស់ពួកគេ",
        "C) ដើម្បីធ្វើឱ្យថ្មទូរស័ព្ទកាន់បានយូរក្នុងអំឡុងពេលធ្វើការ",
        "D) ពីព្រោះក្រុមហ៊ុន Microsoft គិតថ្លៃអាជ្ញាប័ណ្ណលើរាល់ប៊ូតុងដែលមាននៅលើអេក្រង់"
      ],
      correctIndex: 1,
      explanationEn: "Correct! The 'Workstation Principle' dictates that a screen should represent exactly ONE human job. Cramming multiple roles creates cognitive overload and leads to catastrophic accidents like Apex Plastics.",
      explanationKh: "ត្រឹមត្រូវ! 'គោលការណ៍កន្លែងធ្វើការ' ចែងថា អេក្រង់មួយត្រូវតំណាងឱ្យការងាររបស់មនុស្សម្នាក់គត់។ ការញាត់បញ្ចូលតួនាទីច្រើនលើអេក្រង់តែមួយ បង្កើតឱ្យមានការភាន់ច្រឡំ និងគ្រោះថ្នាក់ដូចនៅ Apex Plastics។"
    },
    {
      titleEn: "2. WHAT HAPPENS IF you place a high-stakes 'Supervisor Final Sign-Off' button right next to a routine 'Submit Request' button on the same screen?",
      titleKh: "២. តើមានអ្វីកើតឡើង ប្រសិនបើអ្នកដាក់ប៊ូតុងសំខាន់ 'Supervisor Sign-Off' នៅក្បែរប៊ូតុងធម្មតា 'Submit Request' លើអេក្រង់តែមួយ?",
      optionsEn: [
        "A) The app automatically displays an artificial intelligence warning",
        "B) It creates an operational minefield where users wearing gloves or rushing can accidentally sign off incomplete or dangerous tickets",
        "C) The button colors will automatically blend into black and white",
        "D) The SharePoint database table will automatically delete itself"
      ],
      optionsKh: [
        "A) កម្មវិធីនឹងបង្ហាញសារព្រមានដោយស្វ័យប្រវត្តិតាមរយៈ AI",
        "B) វាបង្កើតជាតំបន់គ្រោះថ្នាក់ ដែលបុគ្គលិកពាក់ស្រោមដៃ ឬប្រញាប់ អាចចុចច្រឡំអនុម័តសំបុត្រការងារដែលមិនទាន់រួចរាល់ ឬមានគ្រោះថ្នាក់",
        "C) ពណ៌របស់ប៊ូតុងនឹងប្រែទៅជាសខ្មៅដោយស្វ័យប្រវត្តិ",
        "D) តារាងទិន្នន័យ SharePoint នឹងលុបខ្លួនឯងដោយស្វ័យប្រវត្តិ"
      ],
      correctIndex: 1,
      explanationEn: "Correct! High-stakes decision buttons must NEVER coexist with intake buttons on the same surface. They must be isolated to an approval station accessible only by authorized roles.",
      explanationKh: "ត្រឹមត្រូវ! ប៊ូតុងសម្រេចចិត្តសំខាន់ៗដាច់ខាតមិនត្រូវដាក់រួមជាមួយប៊ូតុងស្នើសុំធម្មតាឡើយ។ វាត្រូវតែដាក់ដាច់ដោយឡែកនៅលើស្ថានីយអនុម័តដែលមានសិទ្ធិត្រឹមត្រូវ។"
    },
    {
      titleEn: "3. Which Power Fx formula pattern safely submits a form, informs the user with an in-app banner, and smoothly navigates back to the gallery?",
      titleKh: "៣. តើទម្រង់រូបមន្ត Power Fx មួយណាដែលបញ្ជូនទម្រង់ទិន្នន័យ, ផ្តល់ដំណឹងដល់អ្នកប្រើប្រាស់ និងបញ្ជូនត្រឡប់ទៅផ្ទាំងទិដ្ឋភាពទូទៅដោយសុវត្ថិភាព?",
      optionsEn: [
        "A) SubmitForm(frmNew); Notify('Request Logged!', NotificationType.Success); Navigate(scrHome, ScreenTransition.Cover)",
        "B) Back(); Clear(frmNew); Delete(ServiceRequests)",
        "C) Exit(); Set(User, 'Admin'); ResetForm(frmNew)",
        "D) Navigate(scrHome); SubmitForm(frmNew); DisplayMode.Edit"
      ],
      optionsKh: [
        "A) SubmitForm(frmNew); Notify('Request Logged!', NotificationType.Success); Navigate(scrHome, ScreenTransition.Cover)",
        "B) Back(); Clear(frmNew); Delete(ServiceRequests)",
        "C) Exit(); Set(User, 'Admin'); ResetForm(frmNew)",
        "D) Navigate(scrHome); SubmitForm(frmNew); DisplayMode.Edit"
      ],
      correctIndex: 0,
      explanationEn: "Correct! The chain of execution is: 1) Save to storage (`SubmitForm`), 2) Confirm to the human (`Notify`), 3) Transition the view (`Navigate`).",
      explanationKh: "ត្រឹមត្រូវ! ខ្សែសង្វាក់នៃការប្រតិបត្តិគឺ៖ ១) រក្សាទុកទិន្នន័យ (`SubmitForm`), ២) ផ្តល់ដំណឹងដល់មនុស្ស (`Notify`), ៣) ផ្លាស់ប្តូរអេក្រង់ (`Navigate`)។"
    },
    {
      titleEn: "4. WHY must historical detail screens use Display Controls (Labels) rather than editable Input Controls (Text Inputs)?",
      titleKh: "៤. ហេតុអ្វីបានជាអេក្រង់ពិនិត្យប្រវត្តិការងារ ត្រូវប្រើ Display Controls (Labels) ជាជាង Input Controls (Text Inputs) ដែលអាចកែបាន?",
      optionsEn: [
        "A) Because Labels use less storage space in SharePoint lists",
        "B) Because editable text inputs allow accidental taps on mobile touchscreens to silently overwrite audited historical data",
        "C) Because Power Apps crashes if you have more than 3 text input boxes",
        "D) Because Labels automatically translate English into Khmer"
      ],
      optionsKh: [
        "A) ពីព្រោះ Labels ប្រើប្រាស់ទំហំផ្ទុកតិចជាងនៅក្នុង SharePoint",
        "B) ពីព្រោះប្រអប់ Text Input ដែលកែបាន អាចបណ្តាលឱ្យដៃប៉ះច្រឡំលើទូរស័ព្ទដៃ ហើយលុបឬកែប្រែទិន្នន័យប្រវត្តិសវនកម្មដោយមិនដឹងខ្លួន",
        "C) ពីព្រោះ Power Apps នឹងគាំងប្រសិនបើមានប្រអប់ Text Input លើសពី ៣",
        "D) ពីព្រោះ Labels អាចបកប្រែភាសាអង់គ្លេសទៅខ្មែរដោយស្វ័យប្រវត្តិ"
      ],
      correctIndex: 1,
      explanationEn: "Correct! If a screen is designed for viewing history or auditing past maintenance, every data element must be a non-editable Display Control or set to `DisplayMode.View`.",
      explanationKh: "ត្រឹមត្រូវ! ប្រសិនបើអេក្រង់ត្រូវបានរចនាឡើងសម្រាប់មើលប្រវត្តិ ឬធ្វើសវនកម្ម រាល់ធាតុទិន្នន័យទាំងអស់ត្រូវតែជា Display Control ឬកំណត់ជា `DisplayMode.View`។"
    },
    {
      titleEn: "5. WHAT HAPPENS IF an app saves a record to SharePoint, but the developer forgot to add a Notify() or confirmation banner?",
      titleKh: "៥. តើមានអ្វីកើតឡើង ប្រសិនបើកម្មវិធីបានរក្សាទុកទិន្នន័យទៅ SharePoint រួចហើយ ប៉ុន្តែអ្នកបង្កើតភ្លេចដាក់សារ Notify() ឬផ្ទាំងបញ្ជាក់?",
      optionsEn: [
        "A) The database rejects the data and throws an error",
        "B) The user experiences anxiety, assumes the tap failed or the app froze, and repeatedly taps Submit, creating duplicate records",
        "C) The user's smartphone will sound an alarm",
        "D) Nothing, users always instinctively know when an app is working"
      ],
      optionsKh: [
        "A) មូលដ្ឋានទិន្នន័យនឹងបដិសេធទិន្នន័យ ហើយបង្ហាញ Error",
        "B) អ្នកប្រើនឹងមានអារម្មណ៍បារម្ភ គិតថាកម្មវិធីគាំង ហើយចុចប៊ូតុង Submit ផ្ទួនៗ ដែលបង្កើតជាទិន្នន័យស្ទួនជាច្រើន",
        "C) ទូរស័ព្ទដៃរបស់អ្នកប្រើនឹងរោទ៍អាសន្ន",
        "D) គ្មានអ្វីកើតឡើងទេ អ្នកប្រើតែងតែដឹងដោយស្វ័យប្រវត្តិថាកម្មវិធីកំពុងដំណើរការ"
      ],
      correctIndex: 1,
      explanationEn: "Correct! In user experience, silence breeds panic. Immediate feedback (`Notify(..., NotificationType.Success)`) gives the user peace of mind that their work was saved.",
      explanationKh: "ត្រឹមត្រូវ! នៅក្នុងបទពិសោធន៍អ្នកប្រើប្រាស់ (UX) ភាពស្ងៀមស្ងាត់បង្កើតការភ័យព្រួយ។ ការផ្តល់ដំណឹងភ្លាមៗ (`Notify`) ផ្តល់ទំនុកចិត្តដល់អ្នកប្រើថាការងាររបស់ពួកគេត្រូវបានរក្សាទុកដោយជោគជ័យ។"
    }
  ];

  // --------------------------------------------------------------------------
  // 4. KHMER SLIDES DATA (100% COMPLETE 1-TO-1 DOM REPLACEMENT FOR 24 SLIDES)
  // --------------------------------------------------------------------------
  const KHMER_SLIDES = [
  // Slide 1: ចំណងជើង៖ ពីដំណើរការ + ទិន្នន័យ ទៅជាអេក្រង់
  {
    title: "ចំណងជើង៖ ពីដំណើរការ + ទិន្នន័យ ទៅជាអេក្រង់",
    segment: "វគ្គ ១៖ ការស្វាគមន៍ & រំលឹកចំណេះដឹង",
    content: "<div class=\"hero-badge-row\">\n            <span class=\"pill pill-phase\">ដំណាក់កាលទី ៥៖ ការរចនា App &amp; UI</span>\n            <span class=\"pill pill-accent\">ថ្ងៃទី ១២ នៃ ២៧ ថ្ងៃ</span>\n            <span class=\"pill pill-time\">វគ្គសិក្សាជាក់ស្តែង ៩០ នាទី</span>\n          </div>\n          <h1 class=\"hero-title\">ពីដំណើរការការងារ + ទិន្នន័យ ទៅជាអេក្រង់កម្មវិធី</h1>\n          <p class=\"hero-subtitle\">អេក្រង់ គឺជាជំហានជាក់ស្តែងនៃដំណើរការអាជីវកម្មដែលមនុស្សមើលឃើញ និងប៉ះផ្ទាល់។ អេក្រង់មួយ គឺជាកន្លែងបំពេញការងារជាក់លាក់មួយ ដែលផ្ទុកតែទិន្នន័យ និងប៊ូតុងសកម្មភាពចាំបាច់សម្រាប់កិច្ចការមនុស្សម្នាក់ប៉ុណ្ណោះ។</p>\n          \n          <div class=\"hero-connection-card\">\n            <span class=\"chain-label\">ខ្សែសង្វាក់តភ្ជាប់គោលគំនិតថ្ងៃនេះ</span>\n            <div class=\"chain-nodes\">\n              <span class=\"chain-node\">កិច្ចការអ្នកប្រើ</span>\n              <span class=\"chain-arrow\">➔</span>\n              <span class=\"chain-node\">អេក្រង់ជាក់លាក់</span>\n              <span class=\"chain-arrow\">➔</span>\n              <span class=\"chain-node\">បញ្ចូល / សកម្មភាព</span>\n              <span class=\"chain-arrow\">➔</span>\n              <span class=\"chain-node\">ភ្ជាប់ទិន្នន័យ</span>\n              <span class=\"chain-arrow\">➔</span>\n              <span class=\"chain-node active\">មតិឆ្លើយតបអ្នកប្រើ</span>\n            </div>\n          </div>\n\n          <div class=\"hero-action-row\">\n            <button class=\"fluent-btn-primary\" id=\"hero-start-btn\">\n              <span>ចាប់ផ្តើមមេរៀន (Space / ➔)</span>\n              <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"currentColor\">\n                <path d=\"M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z\"/>\n              </svg>\n            </button>\n            <span class=\"hero-hint\">រចនាបទ Microsoft Fluent Dark • ដំណើរការលើ Microsoft Edge • ពីរភាសាពេញលេញ</span>\n          </div>"
  },
  // Slide 2: ប្លង់មេនៃកម្មវិធីសិក្សា៖ ថ្ងៃទី ១២
  {
    title: "ប្លង់មេនៃកម្មវិធីសិក្សា៖ ថ្ងៃទី ១២",
    segment: "វគ្គ ១៖ ការស្វាគមន៍ & រំលឹកចំណេះដឹង",
    content: "<div class=\"slide-header\">\n            <span class=\"section-tag\">កម្មវិធីសិក្សាតភ្ជាប់គ្នាជាវង់ (Spiral Learning)</span>\n            <h2>ទីតាំងរបស់យើងនៅក្នុងដំណើរ ២៧ ថ្ងៃ</h2>\n            <p class=\"subtitle\">គំរូផ្នត់គំនិតស្នូល៖ បញ្ហាពិត ➔ ដំណើរការ ➔ ទិន្នន័យ ➔ អេក្រង់ (UI) ➔ តក្កវិជ្ជា ➔ សកម្មភាព ➔ ផ្ទុកទិន្នន័យ ➔ ផ្តល់ដំណឹង ➔ តេស្ត</p>\n          </div>\n\n          <div class=\"curr-map-grid\">\n            <div class=\"curr-card passed\">\n              <span class=\"card-phase\">វគ្គ ១–២៖ មូលដ្ឋានឌីជីថល &amp; តក្កវិជ្ជា</span>\n              <span class=\"card-days\">ថ្ងៃទី ១ – ៦ (បានបញ្ចប់)</span>\n              <h3 class=\"card-title\">ការណែនាំ, លក្ខខណ្ឌ &amp; ក្បួនប៊ូលីន</h3>\n              <p>ឧបករណ៍កុំព្យូទ័រ, អថេរ (Variables), ច្រកសំណួរ (True/False), ការសម្រេចចិត្ត IF/THEN និងក្បួន AND/OR។</p>\n              <span class=\"card-status\">✓ ស្ទាត់ជំនាញរួចរាល់</span>\n            </div>\n\n            <div class=\"curr-card passed\">\n              <span class=\"card-phase\">វគ្គ ៣–៤៖ ដំណើរការអាជីវកម្ម &amp; ទិន្នន័យ</span>\n              <span class=\"card-days\">ថ្ងៃទី ៧ – ១១ (បានបញ្ចប់)</span>\n              <h3 class=\"card-title\">លំហូរ ៦ ដំណាក់កាល, កំណត់ត្រា, តារាង &amp; គំរូទិន្នន័យ</h3>\n              <p>រចនាសម្ព័ន្ធ (Structure)លំហូរ, គំរូទិន្នន័យថែទាំ ៨ វាល, ប្រភេទ Data Types, ម៉ាស៊ីនស្ថានភាពមេ និងលេខកូដសម្គាល់។</p>\n              <span class=\"card-status\">✓ ស្ទាត់ជំនាញរួចរាល់</span>\n            </div>\n\n            <div class=\"curr-card active-card\">\n              <span class=\"card-phase\">វគ្គ ៥៖ ការរចនា App &amp; UI (ថ្ងៃនេះ)</span>\n              <span class=\"card-days\">ថ្ងៃទី ១២ (កំពុងសិក្សា)</span>\n              <h3 class=\"card-title\">ពីដំណើរការ + ទិន្នន័យ ទៅជាអេក្រង់កម្មវិធី</h3>\n              <p>ផ្គូផ្គងកិច្ចការទៅអេក្រង់, គ្រួសារ Control ទាំង ៣ (Input, Display, Action), លំហូរបញ្ជូនទិស និងមតិឆ្លើយតប។</p>\n              <span class=\"card-status\">★ កំពុងបន្តសកម្ម</span>\n            </div>\n\n            <div class=\"curr-card future\">\n              <span class=\"card-phase\">វគ្គ ៥៖ ការរចនា App &amp; UI (ថ្ងៃស្អែក)</span>\n              <span class=\"card-days\">ថ្ងៃទី ១៣ – ១៤ (ថ្ងៃបន្ទាប់)</span>\n              <h3 class=\"card-title\">Canvas Studio &amp; ផ្ទាំង UI Controls</h3>\n              <p>យកប្លង់ Wireframe ទៅបង្កើតក្នុង Power Apps Studio៖ Galleries, Forms, Containers និងរចនាបទឆ្លើយតប។</p>\n              <span class=\"card-status\">⏳ ជំហានបន្ទាប់</span>\n            </div>\n\n            <div class=\"curr-card future\">\n              <span class=\"card-phase\">វគ្គ ៦៖ Power Fx &amp; ស្វ័យប្រវត្តិកម្ម</span>\n              <span class=\"card-days\">ថ្ងៃទី ១៥ – ២១ (ខាងមុខ)</span>\n              <h3 class=\"card-title\">រូបមន្តអន្តរកម្ម &amp; សកម្មភាពលើ Cloud</h3>\n              <p>Patch, Collect, LookUp, Filter, ច្រកផ្ទៀងផ្ទាត់, ការជូនដំណឹងស្វ័យប្រវត្តិ និង Power Automate Flows។</p>\n              <span class=\"card-status\">⏳ វគ្គខាងមុខ</span>\n            </div>\n\n            <div class=\"curr-card future\">\n              <span class=\"card-phase\">វគ្គ ៧៖ ការធ្វើតេស្តសហគ្រាស &amp; ដាក់ឱ្យប្រើ</span>\n              <span class=\"card-days\">ថ្ងៃទី ២២ – ២៧ (ដំណាក់កាលចុងក្រោយ)</span>\n              <h3 class=\"card-title\">ការកែសម្រួលកម្រិតផលិតកម្ម &amp; គម្រោង Capstone</h3>\n              <p>សិទ្ធិសុវត្ថិភាព, ការចាប់កំហុស, តេស្តលើថេប្លេតក្នុងរោងចក្រ, ដំណើរការ Offline និងគម្រោង DX បញ្ចប់ការសិក្សា។</p>\n              <span class=\"card-status\">⏳ គម្រោង Capstone</span>\n            </div>\n          </div>"
  },
  // Slide 3: គោលបំណងរៀនសូត្រទាំង ៤
  {
    title: "គោលបំណងរៀនសូត្រទាំង ៤",
    segment: "វគ្គ ១៖ ការស្វាគមន៍ & រំលឹកចំណេះដឹង",
    content: "<div class=\"slide-header\">\n            <span class=\"section-tag\">លទ្ធផលរំពឹងទុក</span>\n            <h2>អ្វីដែលអ្នកនឹងទទួលបានក្នុងការរៀន ៩០ នាទីថ្ងៃនេះ</h2>\n            <p class=\"subtitle\">សមត្ថភាពវាស់វែងបានជាក់ស្តែងចំនួន ៤ ស្របតាមស្តង់ដារ UI/UX របស់ Citizen Developer ក្នុងវិស័យឧស្សាហកម្ម។</p>\n          </div>\n\n          <div class=\"objectives-grid\">\n            <div class=\"obj-card\">\n              <div class=\"obj-header\">\n                <span class=\"obj-badge bloom-l2\">L2: យល់ដឹង</span>\n                <span class=\"obj-num\">01</span>\n              </div>\n              <h3>ពន្យល់ពីគោលការណ៍ \"Screen ជាកន្លែងបំពេញការងារ\"</h3>\n              <p>យល់ច្បាស់ពីមូលហេតុដែលដំណើរការការងារមានមនុស្សច្រើនតួនាទីតែងតែបរាជ័យពេលញាត់ចូលលើអេក្រង់តែមួយ និងរៀនបែងចែកអេក្រង់តាមភារកិច្ចជាក់លាក់។</p>\n            </div>\n\n            <div class=\"obj-card\">\n              <div class=\"obj-header\">\n                <span class=\"obj-badge bloom-l3\">L3: អនុវត្ត</span>\n                <span class=\"obj-num\">02</span>\n              </div>\n              <h3>ចាត់ថ្នាក់ក្រុម Control ស្នូលទាំង ៣ លើ UI</h3>\n              <p>ចាត់ថ្នាក់គ្រប់ធាតុទាំងអស់លើអេក្រង់ទៅតាមតួនាទីមុខងាររបស់វា៖ Input Controls (បញ្ចូលទិន្នន័យ), Display Controls (បង្ហាញទិន្នន័យ), និង Action Controls (បញ្ជាដំណើរការ)។</p>\n            </div>\n\n            <div class=\"obj-card\">\n              <div class=\"obj-header\">\n                <span class=\"obj-badge bloom-l4\">L4: វិភាគ</span>\n                <span class=\"obj-num\">03</span>\n              </div>\n              <h3>បំបែកលំហូរការងារទៅជាទម្រង់សហគ្រាស ៤ អេក្រង់ (4-Screen Pattern)</h3>\n              <p>វិភាគលំហូរថែទាំម៉ាស៊ីនរោងចក្រដើម្បីបែងចែកជួរឈរ និងភារកិច្ចឱ្យបានស្អាតរវាង៖ អេក្រង់រុករក (<code>scrHome</code>), បញ្ចូលសំណើ (<code>scrNew</code>), មើលលម្អិត (<code>scrView</code>), និងអនុម័ត (<code>scrApprove</code>)។</p>\n            </div>\n\n            <div class=\"obj-card\">\n              <div class=\"obj-header\">\n                <span class=\"obj-badge bloom-l5\">L5: បង្កើត</span>\n                <span class=\"obj-num\">04</span>\n              </div>\n              <h3>គូរគំរូ Wireframe &amp; បង្កើត Logic សម្រាប់ Navigation</h3>\n              <p>ព្រាងម៉ាទ្រីសរចនាសម្ព័ន្ធអេក្រង់ពេញលេញ និងបង្កើតរូបមន្ត Power Fx ស្នូលសម្រាប់ផ្លាស់ប្តូរអេក្រង់ និងផ្តល់ដំណឹងឆ្លើយតប (<code>Navigate</code>, <code>Back</code>, <code>Notify</code>)។</p>\n            </div>\n          </div>"
  },
  // Slide 4: កាលវិភាគលម្អិត ៩០ នាទី
  {
    title: "កាលវិភាគលម្អិត ៩០ នាទី",
    segment: "វគ្គ ១៖ ការស្វាគមន៍ & រំលឹកចំណេះដឹង",
    content: "<div class=\"slide-header\">\n            <span class=\"section-tag\">កាលវិភាគលម្អិត</span>\n            <h2>កាលវិភាគសិក្សា ៩០ នាទី (Spiral Learning Schedule)</h2>\n            <p class=\"subtitle\">រាល់នាទីត្រូវបានរៀបចំឡើងសម្រាប់ការចូលរួមយ៉ាងសកម្ម ការប្រៀបធៀបរូបវន្ត ការបង្ហាញផ្ទាល់ និងការធ្វើលំហាត់អនុវត្តជាក់ស្តែង។</p>\n          </div>\n\n          <div class=\"agenda-timeline\">\n            <div class=\"time-block\">\n              <span class=\"time-stamp\">00:00 – 10:00 (១០ នាទី)</span>\n              <span class=\"time-badge\">វគ្គទី ១៖ រំលឹក &amp; ផ្សារភ្ជាប់</span>\n              <p class=\"time-content\">រំលឹកចំណេះដឹងពីថ្ងៃទី ៩–១១ សំណួរសាកល្បងការចងចាំ និងកំណត់ទិសដៅរចនាសម្ព័ន្ធអេក្រង់ UI ថ្ងៃនេះ។</p>\n            </div>\n\n            <div class=\"time-block\">\n              <span class=\"time-stamp\">10:00 – 25:00 (១៥ នាទី)</span>\n              <span class=\"time-badge\">វគ្គទី ២៖ ស្វែងយល់ពីមូលហេតុ (The Why)</span>\n              <p class=\"time-content\">មេរៀនបាត់បង់ $38,000 ដោយសារ \"ផ្ទាំងព័ត៌មានអេក្រង់តែមួយ\" នៅ Apex Plastics និងឧទាហរណ៍ជាក់ស្តែងនៃព្រលានយន្តហោះ និងទូ ATM។</p>\n            </div>\n\n            <div class=\"time-block\">\n              <span class=\"time-stamp\">25:00 – 45:00 (២០ នាទី)</span>\n              <span class=\"time-badge\">វគ្គទី ៣៖ ទ្រឹស្តីស៊ីជម្រៅ</span>\n              <p class=\"time-content\">ដំណើរការ ៥ ជំហាន Task-to-Screen Pipeline, ក្រុម Controls ទាំង ៣, ទម្រង់សហគ្រាស ៤ អេក្រង់, និងរង្វិលជុំផ្តល់ដំណឹង (Feedback Loop)។</p>\n            </div>\n\n            <div class=\"time-block highlight-block\">\n              <span class=\"time-stamp\">45:00 – 60:00 (១៥ នាទី)</span>\n              <span class=\"time-badge\">វគ្គទី ៤៖ បង្ហាញផ្ទាល់ &amp; កម្មវិធីសាកល្បង</span>\n              <p class=\"time-content\">សម្រាកពត់ខ្លួន (នាទីទី ៤៥) កម្មវិធីអនុវត្ត Interactive Screen Architect (Widget 1) និងគ្រូបង្ហាញការគូរ Wireframe ផ្ទាល់។</p>\n            </div>\n\n            <div class=\"time-block\">\n              <span class=\"time-stamp\">60:00 – 75:00 (១៥ នាទី)</span>\n              <span class=\"time-badge\">វគ្គទី ៥៖ អនុវត្តក្រោមការណែនាំ</span>\n              <p class=\"time-content\">វាយតម្លៃកែកំហុស App ឃ្លាំងដែលមានអេក្រង់តែមួយ កម្មវិធី Simulator ៦ ស្ថានភាព (Widget 2) និងអន្ទាក់គំនិត UI គ្រោះថ្នាក់ទាំង ៤។</p>\n            </div>\n\n            <div class=\"time-block\">\n              <span class=\"time-stamp\">75:00 – 90:00 (១៥ នាទី)</span>\n              <span class=\"time-badge\">វគ្គទី ៦៖ វាយតម្លៃ &amp; ស្ពានទៅមុខ</span>\n              <p class=\"time-content\">តេស្តវាស់ស្ទង់ ៥ សំណួរ (Widget 3) បេសកកម្ម Capstone Challenge បង្ហាញដំណោះស្រាយគំរូ និងត្រៀមខ្លួនសម្រាប់ថ្ងៃទី ១៣។</p>\n            </div>\n          </div>"
  },
  // Slide 5: ការរំលឹកចំណេះដឹងមុន
  {
    title: "ការរំលឹកចំណេះដឹងមុន",
    segment: "វគ្គ ១៖ ការស្វាគមន៍ & រំលឹកចំណេះដឹង",
    content: "<div class=\"slide-header\">\n            <span class=\"section-tag\">រំលឹកចំណេះដឹងសកម្ម</span>\n            <h2>ការរំលឹកចំណេះដឹងមុន៖ ភ្ជាប់គ្រឹះដែលបានរៀនឱ្យរឹងមាំ</h2>\n            <p class=\"subtitle\">ចុចលើកាតនីមួយៗដើម្បីផ្ទៀងផ្ទាត់គោលគំនិតគ្រឹះដែលបានរៀននៅថ្ងៃទី ៩, ១០ និង ១១។</p>\n          </div>\n\n          <div class=\"retrieval-deck\">\n            <div class=\"retrieval-card\" id=\"ret-card-1\">\n              <div class=\"retrieval-q-badge\">ពីថ្ងៃទី ១១៖ ការទាញទិន្នន័យពីដំណើរការ</div>\n              <div class=\"card-prompt\">\n                <h3>\"តើយើងកំណត់បង្កើតជួរឈរ (Columns) ក្នុង Database ដោយរបៀបណានៅថ្ងៃទី ១១?\"</h3>\n              </div>\n              <button class=\"fluent-btn-secondary ret-reveal-btn\" data-target=\"ret-ans-1\">បង្ហាញចម្លើយ</button>\n              <div class=\"retrieval-answer\" id=\"ret-ans-1\">\n                <strong>គោលគំនិតត្រឹមត្រូវ៖</strong> យើងមិនទាយដោយចៃដន្យទេ! យើងពិនិត្យមើលជំហាននីមួយៗក្នុងដំណើរការអាជីវកម្ម កំណត់សំណួរជាក់លាក់ដែលមនុស្សសួរ រួចបំប្លែងសំណួរទាំងនោះទៅជាជួរឈរទិន្នន័យដែលមានរចនាសម្ព័ន្ធច្បាស់លាស់។\n              </div>\n            </div>\n\n            <div class=\"retrieval-card\" id=\"ret-card-2\">\n              <div class=\"retrieval-q-badge\">ពីថ្ងៃទី ១១៖ ប្រភេទនៃទិន្នន័យ (Data Types)</div>\n              <div class=\"card-prompt\">\n                <h3>\"ហេតុអ្វីបានជាយើងកំណត់ UrgencyLevel ជាជួរឈរប្រភេទ Choice ជំនួសឱ្យប្រអប់សរសេរអក្សរធម្មតា (Text Box)?\"</h3>\n              </div>\n              <button class=\"fluent-btn-secondary ret-reveal-btn\" data-target=\"ret-ans-2\">បង្ហាញចម្លើយ</button>\n              <div class=\"retrieval-answer\" id=\"ret-ans-2\">\n                <strong>គោលគំនិតត្រឹមត្រូវ៖</strong> ដើម្បីការពារកំហុសអក្ខរាវិរុទ្ធ (ឧ. 'urgent' vs 'High')។ ជួរឈរប្រភេទ Choice កំណត់ឱ្យអ្នកប្រើប្រាស់ជ្រើសរើសតែតម្លៃដែលបានអនុម័ត ជួយឱ្យ Power Apps អាចតម្រៀប ច្រោះ (Filter) និងផ្ញើដំណឹងស្វ័យប្រវត្តដោយគ្មានបញ្ហា។\n              </div>\n            </div>\n\n            <div class=\"retrieval-card\" id=\"ret-card-3\">\n              <div class=\"retrieval-q-badge\">ពីថ្ងៃទី ៩៖ ភាពជាម្ចាស់លើលំហូរការងារ (Workflow Ownership)</div>\n              <div class=\"card-prompt\">\n                <h3>\"ក្នុងលំហូរការងារ ៤ ជំហាន (រាយការណ៍ ➔ ត្រួតពិនិត្យ ➔ ជួសជុល ➔ បញ្ចប់) តើមនុស្សទាំង ៤ នាក់ធ្វើការក្នុងពេលតែមួយលើអេក្រង់តែមួយឬទេ?\"</h3>\n              </div>\n              <button class=\"fluent-btn-secondary ret-reveal-btn\" data-target=\"ret-ans-3\">បង្ហាញចម្លើយ</button>\n              <div class=\"retrieval-answer\" id=\"ret-ans-3\">\n                <strong>គោលគំនិតត្រឹមត្រូវ៖</strong> ទេ! ការងារកើតឡើងតាមលំដាប់លំដោយតាមពេលវេលា និងតួនាទី។ ប្រតិបត្តិកររាយការណ៍មុន ប្រធានផ្នែកត្រួតពិនិត្យតាមក្រោយ ហើយជាងបច្ចេកទេសធ្វើការជួសជុល។ តួនាទីនីមួយៗត្រូវការអេក្រង់ផ្តោតតែលើជំហានរបស់ខ្លួនប៉ុណ្ណោះ!\n              </div>\n            </div>\n          </div>"
  },
  // Slide 6: ករណីសិក្សាគ្រោះមហន្តរាយ $38,000 នៅ Apex Plastics
  {
    title: "ករណីសិក្សាគ្រោះមហន្តរាយ $38,000 នៅ Apex Plastics",
    segment: "វគ្គ ២៖ ស្វែងយល់ពីមូលហេតុ (The Why)",
    content: "<div class=\"slide-header\">\n            <span class=\"section-tag section-tag-danger\">ករណីសិក្សាជាក់ស្តែងក្នុងរោងចក្រ</span>\n            <h2>មហន្តរាយ $38,000 ដោយសារ \"អេក្រង់ច្របូកច្របល់តែមួយ\" &amp; ពុម្ពដែកបែកខ្ទេច</h2>\n            <p class=\"subtitle\">អ្វីដែលកើតឡើងនៅពេលអ្នកញាត់បញ្ចូលលំហូរការងាររបស់មនុស្សច្រើននាក់លើអេក្រង់តែមួយ។</p>\n          </div>\n\n          <div class=\"crisis-story-grid\">\n            <div class=\"crisis-timeline-card\">\n              <div class=\"crisis-event\">\n                <span class=\"event-time\">ខែទី ១</span>\n                <div class=\"event-desc\">\n                  <strong>អេក្រង់ \"All-In-One\"៖</strong> អ្នកបង្កើតកម្មវិធីថ្មីថ្មោងបានដាក់ <strong>៨ វាលទិន្នន័យ, ៦ Dropdowns, និង ៨ ប៊ូតុង</strong> លើអេក្រង់តែមួយ ដើម្បីកុំឱ្យអ្នកប្រើពិបាកប្តូរទំព័រ!\n                </div>\n              </div>\n              <div class=\"crisis-event\">\n                <span class=\"event-time\">10:15 AM</span>\n                <div class=\"event-desc\">\n                  <strong>ម្រាមដៃប្រឡាក់ប្រេង៖</strong> បុគ្គលិក Sothea ពាក់ស្រោមដៃប្រឡាក់ប្រេង ចង់រាយការណ៍អំពីដង្កៀបរំញ័រលើម៉ាស៊ីនលេខ ២។ គាត់ចុចក្បែរប៊ូតុង \"Submit\" ពណ៌ខៀវ។\n                </div>\n              </div>\n              <div class=\"crisis-event fatal\">\n                <span class=\"event-time\">10:16 AM</span>\n                <div class=\"event-desc\">\n                  <strong>ការចុចច្រឡំជាមហន្តរាយ៖</strong> នៅកៀកនឹង \"Submit\" អ្នកបង្កើតបានដាក់ប៊ូតុងពណ៌បៃតង <strong>\"Supervisor Final Sign-Off\"</strong>! ស្រោមដៃប្រឡាក់ប្រេងបានប៉ះចំវា ធ្វើឱ្យសំបុត្រម៉ាស៊ីនលេខ ៧ ដែលមិនទាន់ជួសជុល ប្រែជា 'Approved'!\n                </div>\n              </div>\n              <div class=\"crisis-event fatal\">\n                <span class=\"event-time\">11:00 AM</span>\n                <div class=\"event-desc\">\n                  <strong>មហន្តរាយបែកពុម្ពដែក៖</strong> ជាង Dara ឃើញប្រព័ន្ធបង្ហាញថា 'Approved' គាត់ក៏លើកពុម្ពដែកតម្លៃ $38,000 ដាក់ចូលម៉ាស៊ីនលេខ ២។ ពេលម៉ាស៊ីនសង្កត់កម្លាំង ៤០០ តោន ដង្កៀបរំញ័របាន <strong>បោកបែកពុម្ពដែកខ្ទេចគ្មានសល់!</strong>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"crisis-lesson-card\">\n              <div class=\"loss-badge\">ខាតបង់ $38,000</div>\n              <h3>ឫសគល់នៃកំហុសស្ថាបត្យកម្ម UI</h3>\n              <p>អ្នកបង្កើតគិតថា៖ <em>\"ដាក់លើអេក្រង់តែមួយស្រួល មិនបាច់ចុចប្តូរទំព័រច្រើន។\"</em></p>\n              <div class=\"flaw-box\">\n                <span class=\"flaw-icon\">⚠️</span>\n                <span>ការញាត់បញ្ចូលតួនាទីច្រើនលើអេក្រង់តែមួយ បង្កើតជា <strong>តំបន់គ្រោះថ្នាក់</strong> ដែលប៊ូតុងអនុម័តសំខាន់ៗ ស្ថិតនៅកៀកនឹងប្រអប់បញ្ចូលទិន្នន័យធម្មតា!</span>\n              </div>\n              <div class=\"solution-preview\">\n                <strong>ដំណោះស្រាយស្ថាបត្យកម្ម៖</strong>\n                <p>កុំបង្កើតអេក្រង់ច្របូកច្របល់តែមួយ។ អនុវត្តតាម <strong>\"គោលការណ៍កន្លែងធ្វើការ\"</strong>៖ បុគ្គលិកមានអេក្រង់ស្នើសុំ, ប្រធានមានអេក្រង់អនុម័ត, ជាងមានអេក្រង់ជួសជុល។ បើអ្នកមិនត្រូវការប៊ូតុងនោះដើម្បីបំពេញកិច្ចការរបស់អ្នកនៅពេលនេះទេ ប៊ូតុងនោះដាច់ខាតមិនត្រូវមានវត្តមានលើអេក្រង់ឡើយ!</p>\n              </div>\n            </div>\n          </div>"
  },
  // Slide 7: គោលគំនិតជាភាសាសាមញ្ញ
  {
    title: "គោលគំនិតជាភាសាសាមញ្ញ",
    segment: "វគ្គ ២៖ ស្វែងយល់ពីមូលហេតុ (The Why)",
    content: "<div class=\"slide-header\">\n            <span class=\"section-tag\">គំរូផ្នត់គំនិតជាភាសាសាមញ្ញ</span>\n            <h2>\"អេក្រង់ជាកន្លែងបំពេញការងារជាក់លាក់\"៖ ឧទាហរណ៍ព្រលានយន្តហោះ &amp; ទូ ATM</h2>\n            <p class=\"subtitle\">មុននឹងមើល Power Apps ចូរស្វែងយល់ពីរបៀបដែលស្ថាបត្យកម្មរូបវន្តរៀបចំដំណើររបស់មនុស្ស។</p>\n          </div>\n\n          <div class=\"analogy-cards-trio\">\n            <div class=\"concept-trio-card\">\n              <div class=\"trio-badge\">ព្រលានយន្តហោះ</div>\n              <div class=\"trio-icon\">🛫</div>\n              <h3>ស្ថានីយរូបវន្តតាមលំដាប់</h3>\n              <p class=\"trio-def\">ព្រលានយន្តហោះមិនដាក់កន្លែង Check-in, ឆែកឆេរសន្តិសុខ និងច្រកឡើងយន្តហោះក្នុងបន្ទប់តែមួយទេ។</p>\n              <ul class=\"trio-points\">\n                <li><strong>ស្ថានីយ ១ (Check-in Kiosk)៖</strong> កិច្ចការ៖ បោះពុម្ពសំបុត្រឡើងយន្តហោះ។ ឃើញតែប្រអប់លិខិតឆ្លងដែន។</li>\n                <li><strong>ស្ថានីយ ២ (Security Gate)៖</strong> កិច្ចការ៖ ស្កេនវ៉ាលី។ ឃើញតែសកម្មភាពស្កេន។</li>\n                <li><strong>ស្ថានីយ ៣ (Boarding Gate)៖</strong> កិច្ចការ៖ ឡើងយន្តហោះ។ ឃើញតែលេខកៅអី និងទ្វារឡើង។</li>\n              </ul>\n            </div>\n\n            <div class=\"concept-trio-card active-trio\">\n              <div class=\"trio-badge highlight\">ទូដកប្រាក់ ATM</div>\n              <div class=\"trio-icon\">🏧</div>\n              <h3>អេក្រង់ផ្តោតលើកិច្ចការតែមួយ</h3>\n              <p class=\"trio-def\">ទូ ATM ណែនាំអ្នកតាមជំហានដាច់ដោយឡែក និងច្បាស់លាស់។</p>\n              <ul class=\"trio-points\">\n                <li><strong>អេក្រង់ ១៖</strong> បញ្ចូលលេខសម្ងាត់ PIN ៤ ខ្ទង់ (គ្មានអ្វីផ្សេងទៀតទេ)។</li>\n                <li><strong>អេក្រង់ ២៖</strong> ជ្រើសរើសប្រតិបត្តិការ (ដកប្រាក់, ពិនិត្យសមតុល្យ)។</li>\n                <li><strong>អេក្រង់ ៣៖</strong> ជ្រើសរើសចំនួនទឹកប្រាក់ ($20, $50, $100)។</li>\n                <li><strong>អេក្រង់ ៤៖</strong> យកកាត &amp; ក្រដាសប្រាក់ (សារបញ្ជាក់ដំណឹងជោគជ័យ)។</li>\n              </ul>\n            </div>\n\n            <div class=\"concept-trio-card\">\n              <div class=\"trio-badge\">ច្បាប់មាសស្នូល</div>\n              <div class=\"trio-icon\">🎯</div>\n              <h3>ច្បាប់មាសនៃការរចនា UI</h3>\n              <p class=\"trio-def\">អេក្រង់មួយ = កិច្ចការមនុស្សម្នាក់។</p>\n              <ul class=\"trio-points\">\n                <li>អេក្រង់មិនមែនជាផ្ទាំងគំនូរស្អាតទេ វាជាកន្លែងបំពេញការងារជាក់ស្តែង។</li>\n                <li>បង្ហាញតែទិន្នន័យណាដែលចាំបាច់សម្រាប់ <em>កិច្ចការជាក់លាក់នេះ</em> ប៉ុណ្ណោះ។</li>\n                <li>រក្សាប៊ូតុងសកម្មភាពឱ្យត្រូវតាមតួនាទីរបស់អ្នកប្រើប្រាស់សកម្ម។</li>\n              </ul>\n            </div>\n          </div>"
  },
  // Slide 8: បំពង់ ៥ ជំហាន៖ ពីកិច្ចការទៅអេក្រង់
  {
    title: "បំពង់ ៥ ជំហាន៖ ពីកិច្ចការទៅអេក្រង់",
    segment: "វគ្គ ៣៖ ទ្រឹស្តីស្ថាបត្យកម្មស៊ីជម្រៅ",
    content: "<div class=\"slide-header\">\n            <span class=\"section-tag\">វិធីសាស្ត្រវិស្វកម្មជាប្រព័ន្ធ</span>\n            <h2>បំពង់ ៥ ជំហាន៖ ពីកិច្ចការអាជីវកម្មទៅអេក្រង់កម្មវិធី</h2>\n            <p class=\"subtitle\">របៀបដែលអ្នកអភិវឌ្ឍន៍ជំនាញបំប្លែងដំណើរការអាជីវកម្មទៅជាកម្មវិធីដែលមានអេក្រង់ច្រើនយ៉ាងស្អាត និងមានសុវត្ថិភាព។</p>\n          </div>\n\n          <div class=\"pipeline-container\">\n            <div class=\"pipeline-step\">\n              <div class=\"pipe-num\">1</div>\n              <h4>កំណត់កិច្ចការអ្នកប្រើ</h4>\n              <p>\"តើនរណាជាអ្នកប្រើ ហើយគាត់ចង់សម្រេចកិច្ចការអ្វីនៅត្រង់នេះ?\"</p>\n              <span class=\"pipe-tag\">រឿងរ៉ាវអ្នកប្រើ</span>\n            </div>\n\n            <div class=\"pipeline-arrow\">➔</div>\n\n            <div class=\"pipeline-step\">\n              <div class=\"pipe-num\">2</div>\n              <h4>កំណត់គោលបំណងអេក្រង់</h4>\n              <p>តើអេក្រង់នេះសម្រាប់ពិនិត្យមើល, ស្នើសុំថ្មី, ត្រួតពិនិត្យ ឬអនុម័ត?</p>\n              <span class=\"pipe-tag\">ឈ្មោះអេក្រង់ (<code>scr</code>)</span>\n            </div>\n\n            <div class=\"pipeline-arrow\">➔</div>\n\n            <div class=\"pipeline-step\">\n              <div class=\"pipe-num\">3</div>\n              <h4>ជ្រើសរើស Controls</h4>\n              <p>តើ Controls ប្រភេទ Input, Display និង Action ណាខ្លះដែលត្រូវការ?</p>\n              <span class=\"pipe-tag\">ផ្ទាំង UI Controls</span>\n            </div>\n\n            <div class=\"pipeline-arrow\">➔</div>\n\n            <div class=\"pipeline-step\">\n              <div class=\"pipe-num\">4</div>\n              <h4>ភ្ជាប់ទិន្នន័យតារាង</h4>\n              <p>ភ្ជាប់ Controls ទៅកាន់វាលទិន្នន័យពីថ្ងៃទី ១១៖ <code>MachineID</code>, <code>Status</code>។</p>\n              <span class=\"pipe-tag\">ការភ្ជាប់ទិន្នន័យ</span>\n            </div>\n\n            <div class=\"pipeline-arrow\">➔</div>\n\n            <div class=\"pipeline-step highlight-pipe\">\n              <div class=\"pipe-num\">5</div>\n              <h4>ផ្តល់មតិឆ្លើយតបអ្នកប្រើ</h4>\n              <p>ផ្តល់ដំណឹងត្រឡប់ទៅមនុស្ស៖ ផ្ទាំងជោគជ័យ (<code>Notify</code>) និងការប្តូរអេក្រង់រលូន។</p>\n              <span class=\"pipe-tag\">រង្វិលជុំមតិឆ្លើយតប</span>\n            </div>\n          </div>\n\n          <div class=\"pipeline-summary-box\">\n            <span class=\"box-icon\">💡</span>\n            <span class=\"box-text\"><strong>ច្បាប់ស្នូល៖</strong> អេក្រង់មិនមែនចាប់ផ្តើមពីពណ៌ ឬប៊ូតុងស្អាតទេ — វាចាប់ផ្តើមពី <strong>កិច្ចការមនុស្ស</strong> ដែលត្រូវបំពេញ!</span>\n          </div>"
  },
  // Slide 9: ក្រុម Control ស្នូលទាំង ៣
  {
    title: "ក្រុម Control ស្នូលទាំង ៣",
    segment: "វគ្គ ៣៖ ទ្រឹស្តីស្ថាបត្យកម្មស៊ីជម្រៅ",
    content: "<div class=\"slide-header\">\n            <span class=\"section-tag\">ការបែងចែកក្រុមធាតុ UI</span>\n            <h2>ក្រុម Control ស្នូលទាំង ៣៖ Input, Display និង Action</h2>\n            <p class=\"subtitle\">រាល់ Control ទាំងអស់ក្នុង Power Apps ស្ថិតនៅក្នុងក្រុមមុខងារណាមួយក្នុងចំណោមក្រុមទាំងបីនេះ។ កុំច្រឡំតួនាទីរបស់វាឱ្យសោះ។</p>\n          </div>\n\n          <div class=\"datatypes-grid\">\n            <div class=\"dt-card\">\n              <div class=\"dt-badge dt-text\">ក្រុមទី ១៖ Input Controls</div>\n              <h4>ការកត់ត្រាទិន្នន័យចូល App</h4>\n              <p class=\"dt-desc\">Controls ដែលអនុញ្ញាតឱ្យមនុស្សបញ្ចូលព័ត៌មានទៅក្នុងប្រព័ន្ធ។ ត្រូវតែត្រូវគ្នានឹង Data Types នៃថ្ងៃទី ១១។</p>\n              <ul class=\"control-family-list\">\n                <li><code>TextInput</code> ➔ ការពិពណ៌នាអត្ថបទខ្លី ឬវែង</li>\n                <li><code>Dropdown / ComboBox</code> ➔ ជួរឈរ Choice (បញ្ជីម៉ាស៊ីន)</li>\n                <li><code>DatePicker</code> ➔ កាលបរិច្ឆេទកំណត់ថែទាំ</li>\n                <li><code>Toggle / Checkbox</code> ➔ ស្ថានភាព បាទ/ទេ (Boolean)</li>\n              </ul>\n              <div class=\"dt-example\">គោលបំណង៖ ប្រមូលទិន្នន័យពីមនុស្សឱ្យបានត្រឹមត្រូវ</div>\n            </div>\n\n            <div class=\"dt-card\">\n              <div class=\"dt-badge dt-multitext\">ក្រុមទី ២៖ Display Controls</div>\n              <h4>ការអានទិន្នន័យពី App</h4>\n              <p class=\"dt-desc\">Controls សម្រាប់តែអានប៉ុណ្ណោះ។ វាបង្ហាញទិន្នន័យដោយមិនអនុញ្ញាតឱ្យមានការកែប្រែដោយចៃដន្យឡើយ។</p>\n              <ul class=\"control-family-list\">\n                <li><code>Label</code> ➔ ចំណងជើង ការណែនាំ ឈ្មោះជួរឈរ</li>\n                <li><code>HTML Text / Badge</code> ➔ ស្លាកពណ៌បង្ហាញស្ថានភាព</li>\n                <li><code>Gallery (`gal`)</code> ➔ បញ្ជីរមូរនៃកាត/កំណត់ត្រា</li>\n                <li><code>Image</code> ➔ គំនូរប្លង់ម៉ាស៊ីន រូបថតឧបករណ៍</li>\n              </ul>\n              <div class=\"dt-example\">គោលបំណង៖ បង្ហាញព័ត៌មានពិតឱ្យច្បាស់លាស់ និងមានសុវត្ថិភាព</div>\n            </div>\n\n            <div class=\"dt-card\">\n              <div class=\"dt-badge dt-bool\">ក្រុមទី ៣៖ Action Controls</div>\n              <h4>ការបញ្ជាឱ្យដំណើរការការងារ</h4>\n              <p class=\"dt-desc\">Controls ដែលដំណើរការ Logic របស់ Power Fx បញ្ជូន Form ឬផ្លាស់ប្តូរទៅកាន់បន្ទប់អេក្រង់ផ្សេងទៀត។</p>\n              <ul class=\"control-family-list\">\n                <li><code>Button</code> ➔ ប៊ូតុងបញ្ជាចម្បង (\"Submit\", \"Approve\")</li>\n                <li><code>Icon</code> ➔ ព្រួញត្រឡប់ក្រោយ កែវពង្រីកស្វែងរក Refresh</li>\n                <li><code>Timer</code> ➔ កំណត់ពេលទាញទិន្នន័យថ្មី នាឡិការាប់ថយក្រោយ</li>\n              </ul>\n              <div class=\"dt-example\">គោលបំណង៖ បង្កើតសកម្មភាព និងផ្លាស់ប្តូរស្ថានភាព</div>\n            </div>\n          </div>"
  },
  // Slide 10: ការប្តូរអេក្រង់ & ការឆ្លើយតប (Navigation & Feedback)
  {
    title: "ការប្តូរអេក្រង់ & ការឆ្លើយតប (Navigation & Feedback)",
    segment: "វគ្គ ៣៖ ទ្រឹស្តីស្ថាបត្យកម្មស៊ីជម្រៅ",
    content: "<div class=\"slide-header\">\n            <span class=\"section-tag\">ចិត្តវិទ្យាមនុស្ស &amp; រង្វិលជុំឆ្លើយតប</span>\n            <h2>ការរុករក &amp; ការឆ្លើយតប៖ ផ្តល់ដំណឹង និងសុវត្ថិភាពដល់អ្នកប្រើប្រាស់</h2>\n            <p class=\"subtitle\">បើគ្មានផ្លូវរុករក អ្នកប្រើប្រាស់នឹងជាប់គាំងក្នុងបន្ទប់។ បើគ្មានការឆ្លើយតប (Feedback) ពួកគេនឹងបារម្ភ ហើយចុចបញ្ជូនសំណើស្ទួនពីរដង។</p>\n          </div>\n\n          <div class=\"status-architecture-layout\">\n            <div class=\"status-flow-diagram\">\n              <div class=\"status-node node-draft\">\n                <span class=\"node-num\">1</span>\n                <h4>ចូលកាន់អេក្រង់</h4>\n                <p>អ្នកប្រើប្រាស់មកដល់បន្ទប់</p>\n                <span class=\"node-rule\">NewForm(frmRequest)</span>\n              </div>\n              <div class=\"status-link\">➔</div>\n\n              <div class=\"status-node node-submitted\">\n                <span class=\"node-num\">2</span>\n                <h4>ការបំពេញទិន្នន័យ</h4>\n                <p>បំពេញប្រអប់ចាំបាច់ទាំងអស់</p>\n                <span class=\"node-rule\">btnSubmit.DisplayMode</span>\n              </div>\n              <div class=\"status-link\">➔</div>\n\n              <div class=\"status-node node-progress\">\n                <span class=\"node-num\">3</span>\n                <h4>ការបញ្ជូនទិន្នន័យ</h4>\n                <p>ទិន្នន័យរក្សាទុកក្នុង Dataverse/SP</p>\n                <span class=\"node-rule\">SubmitForm(frmRequest)</span>\n              </div>\n              <div class=\"status-link\">➔</div>\n\n              <div class=\"status-node node-closed\">\n                <span class=\"node-num\">4</span>\n                <h4>ការឆ្លើយតបច្បាស់លាស់</h4>\n                <p>ផ្ទាំងបៃតងជោគជ័យ &amp; ត្រឡប់ក្រោយ</p>\n                <span class=\"node-rule\">Notify() + Navigate()</span>\n              </div>\n            </div>\n\n            <div class=\"status-powerfx-box\">\n              <div class=\"box-title\">ខ្សែសង្វាក់រូបមន្តស្តង់ដារសម្រាប់ Submit &amp; Feedback៖</div>\n              <div class=\"code-snippet\">\n                <span class=\"code-comment\">// ១. រក្សាទុកទិន្នន័យ បង្ហាញផ្ទាំងជោគជ័យ និងត្រឡប់ទៅអេក្រង់ដើមដោយចលនា Fade</span><br>\n                <code>btnSubmit.OnSelect = <br>\n                &nbsp;&nbsp;SubmitForm(frmNewRequest);<br>\n                &nbsp;&nbsp;Notify(\"សំណើជួសជុលត្រូវបានបង្កើតដោយជោគជ័យ!\", NotificationType.Success);<br>\n                &nbsp;&nbsp;Navigate(scrHome, ScreenTransition.Fade)</code><br><br>\n                <span class=\"code-comment\">// ២. ប៊ូតុងបោះបង់ (Cancel)៖ បោះចោលការផ្លាស់ប្តូរដោយសុវត្ថិភាពដោយមិនរក្សាទុក</span><br>\n                <code>btnCancel.OnSelect = ResetForm(frmNewRequest); Back(ScreenTransition.Fade)</code>\n              </div>\n              <div class=\"box-note\">\n                <strong>វិធាន UX ដ៏សំខាន់៖</strong> ត្រូវតែផ្តល់ផ្លូវចាកចេញ (Escape Hatch) ជានិច្ច! គ្រប់អេក្រង់ទាំងអស់ត្រូវតែមានប៊ូតុង \"Cancel\" ឬ \"Back\" យ៉ាងច្បាស់លាស់ ដើម្បីកុំឱ្យអ្នកប្រើប្រាស់មានអារម្មណ៍ថាជាប់គាំង។\n              </div>\n            </div>\n          </div>"
  },
  // Slide 11: គំរូអេក្រង់ ៤ កម្រិតសហគ្រាស
  {
    title: "គំរូអេក្រង់ ៤ កម្រិតសហគ្រាស",
    segment: "វគ្គ ៣៖ ទ្រឹស្តីស្ថាបត្យកម្មស៊ីជម្រៅ",
    content: "<div class=\"slide-header\">\n            <span class=\"section-tag\">គំរូស្ថាបត្យកម្មសហគ្រាស</span>\n            <h2>គំរូអេក្រង់ ៤ កម្រិតសហគ្រាស (The Standard 4-Screen Pattern)</h2>\n            <p class=\"subtitle\">កម្មវិធីអាជីវកម្មជោគជ័យ ៩០% ក្នុងពិភពលោក ត្រូវបានកសាងឡើងដោយផ្អែកលើទម្រង់អេក្រង់ទាំង ៤ នេះ។</p>\n          </div>\n\n          <div class=\"four-screens-grid\">\n            <div class=\"screen-card\">\n              <div class=\"screen-header\">\n                <span class=\"screen-badge\">អេក្រង់ ១</span>\n                <h4><code>scrBrowse</code> (ផ្ទាំងទិដ្ឋភាពទូទៅ)</h4>\n              </div>\n              <p class=\"screen-desc\">កាត Gallery បញ្ជីសំបុត្រការងារសកម្មទាំងអស់ ជាមួយកន្លែងស្វែងរក និងតម្រងស្ថានភាព។</p>\n              <div class=\"screen-controls-list\">\n                <span>• Controls: Gallery, Search Box, New Button</span>\n                <span>• កិច្ចការអ្នកប្រើ៖ ស្វែងរកសំបុត្រ និងពិនិត្យស្ថានភាព</span>\n              </div>\n            </div>\n\n            <div class=\"screen-card\">\n              <div class=\"screen-header\">\n                <span class=\"screen-badge\">អេក្រង់ ២</span>\n                <h4><code>scrNewRequest</code> (ផ្ទាំងស្នើសុំថ្មី)</h4>\n              </div>\n              <p class=\"screen-desc\">ទម្រង់បញ្ចូលទិន្នន័យស្អាតបាត ជាមួយការផ្ទៀងផ្ទាត់វាលចាំបាច់។ ប្រើប្រាស់ដោយបុគ្គលិកក្នុងរោងចក្រ។</p>\n              <div class=\"screen-controls-list\">\n                <span>• Controls: Dropdowns, Text Inputs, Submit Button</span>\n                <span>• កិច្ចការអ្នកប្រើ៖ រាយការណ៍ម៉ាស៊ីនខូច</span>\n              </div>\n            </div>\n\n            <div class=\"screen-card\">\n              <div class=\"screen-header\">\n                <span class=\"screen-badge\">អេក្រង់ ៣</span>\n                <h4><code>scrDetail</code> (ផ្ទាំងពិនិត្យប្រវត្តិ)</h4>\n              </div>\n              <p class=\"screen-desc\">ទិដ្ឋភាពសម្រាប់តែអាន (Read-Only) បង្ហាញប្រវត្តិកើតហេតុពេញលេញ កាលបរិច្ឆេទ និងកំណត់ចំណាំជួសជុល។</p>\n              <div class=\"screen-controls-list\">\n                <span>• Controls: Labels, Status Badges, Back Arrow</span>\n                <span>• កិច្ចការអ្នកប្រើ៖ ពិនិត្យព័ត៌មានពិតជាប្រវត្តិសាស្ត្រដោយសុវត្ថិភាព</span>\n              </div>\n            </div>\n\n            <div class=\"screen-card\">\n              <div class=\"screen-header\">\n                <span class=\"screen-badge\">អេក្រង់ ៤</span>\n                <h4><code>scrApproval</code> (ច្រកសម្រេចចិត្ត)</h4>\n              </div>\n              <p class=\"screen-desc\">អេក្រង់សម្រេចចិត្តជាមួយសេចក្តីសង្ខេបតម្លៃប៉ាន់ស្មាន និងប៊ូតុង Approve/Reject ធំៗសម្រាប់អ្នកគ្រប់គ្រង។</p>\n              <div class=\"screen-controls-list\">\n                <span>• Controls: Cost Input, Approve/Reject Buttons</span>\n                <span>• កិច្ចការអ្នកប្រើ៖ ធ្វើការសម្រេចចិត្តអនុម័ត</span>\n              </div>\n            </div>\n          </div>"
  },
  // Slide 12: កម្មវិធីរចនាអេក្រង់អន្តរកម្ម (Widget 1)
  {
    title: "កម្មវិធីរចនាអេក្រង់អន្តរកម្ម (Widget 1)",
    segment: "វគ្គ ៤៖ ការបង្ហាញ & បន្ទប់ពិសោធន៍",
    content: "<div class=\"slide-header\">\n            <span class=\"section-tag section-tag-accent\">ឧបករណ៍អនុវត្តជាក់ស្តែង</span>\n            <h2>Widget 1: កម្មវិធីរចនា Task-to-Screen &amp; កំណត់ Controls</h2>\n            <p class=\"subtitle\">ជ្រើសរើសភារកិច្ចរបស់អ្នកប្រើប្រាស់ ដើម្បីបង្កើតគោលបំណងអេក្រង់ ទម្រង់ប្លង់ Controls ចាំបាច់ និងរូបមន្ត Navigation ដោយស្វ័យប្រវត្ត។</p>\n          </div>\n\n          <div class=\"schema-workbench-layout\">\n            <!-- Left Panel: Task Selection & Screen Builder -->\n            <div class=\"workbench-form-panel\">\n              <div class=\"panel-header\">\n                <span class=\"panel-icon\">📐</span>\n                <h3>ជំហានទី ១ &amp; ២៖ តួនាទីអ្នកប្រើប្រាស់ &amp; ភារកិច្ចអេក្រង់</h3>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"wb-user-role\">តួនាទីអ្នកប្រើប្រាស់បច្ចុប្បន្ន៖</label>\n                <select id=\"wb-user-role\" class=\"fluent-select\">\n                  <option value=\"operator\">1. បុគ្គលិកប្រតិបត្តិការរោងចក្រ (បុប្ផា)</option>\n                  <option value=\"supervisor\">2. ប្រធានវេន (វិសាល)</option>\n                  <option value=\"technician\">3. ជាងបច្ចេកទេសជួសជុល (តារា)</option>\n                  <option value=\"qa\">4. មន្ត្រីត្រួតពិនិត្យគុណភាព (វណ្ណា)</option>\n                </select>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"wb-human-task\">ភារកិច្ចដែលត្រូវបំពេញ៖</label>\n                <select id=\"wb-human-task\" class=\"fluent-select\">\n                  <!-- បង្កើតឡើងដោយស្វ័យប្រវត្តតាម script.js -->\n                </select>\n              </div>\n\n              <div class=\"form-row-dual\">\n                <div class=\"form-group\">\n                  <label for=\"wb-screen-name\">ឈ្មោះអេក្រង់ (`scr`)៖</label>\n                  <input type=\"text\" id=\"wb-screen-name\" class=\"fluent-input\" readonly>\n                </div>\n                <div class=\"form-group\">\n                  <label for=\"wb-layout-type\">ទម្រង់អេក្រង់ (Archetype)៖</label>\n                  <input type=\"text\" id=\"wb-layout-type\" class=\"fluent-input\" readonly>\n                </div>\n              </div>\n            </div>\n\n            <!-- Right Panel: Visual Wireframe Preview & Controls Specification -->\n            <div class=\"workbench-output-panel\">\n              <div class=\"panel-header\">\n                <span class=\"panel-icon\">📱</span>\n                <h3>ប្លង់ Wireframe នៃអេក្រង់ដែលបានបង្កើត</h3>\n              </div>\n\n              <div class=\"schema-inspector-card\">\n                <div class=\"spec-row\">\n                  <span class=\"spec-label\">Input Controls:</span>\n                  <span class=\"spec-val\" id=\"wb-input-controls\">Dropdown, Text Input, Radio</span>\n                </div>\n                <div class=\"spec-row\">\n                  <span class=\"spec-label\">Display Controls:</span>\n                  <span class=\"spec-val\" id=\"wb-display-controls\">Title Label, Header Icon</span>\n                </div>\n                <div class=\"spec-row\">\n                  <span class=\"spec-label\">Action Triggers:</span>\n                  <span class=\"spec-val\" id=\"wb-action-controls\">Submit Button, Cancel Button</span>\n                </div>\n              </div>\n\n              <div class=\"powerfx-preview-box\">\n                <span class=\"code-title\">រូបមន្ត Navigation &amp; Feedback ដែលបានបង្កើត៖</span>\n                <pre><code id=\"wb-screen-powerfx\">// បង្កើតឡើងដោយស្វ័យប្រវត្តតាមជម្រើសរបស់អ្នក</code></pre>\n              </div>\n            </div>\n          </div>"
  },
  // Slide 13: ប្លង់មេអេក្រង់ Apex Plastics
  {
    title: "ប្លង់មេអេក្រង់ Apex Plastics",
    segment: "វគ្គ ៤៖ ការបង្ហាញ & បន្ទប់ពិសោធន៍",
    content: "<div class=\"slide-header\">\n            <span class=\"section-tag\">ប្លង់មេស្ថាបត្យកម្មផលិតកម្ម</span>\n            <h2>ប្លង់មេកម្មវិធី ៤ អេក្រង់ពេញលេញរបស់រោងចក្រ Apex Plastics</h2>\n            <p class=\"subtitle\">របៀបដែលវាលទិន្នន័យ ៨ ត្រូវបានបែងចែកយ៉ាងស្អាត និងមានសុវត្ថិភាពលើអេក្រង់ ៤ ដាច់ដោយឡែកពីគ្នា។</p>\n          </div>\n\n          <div class=\"schema-table-container\">\n            <table class=\"capstone-table\">\n              <thead>\n                <tr>\n                  <th>ឈ្មោះអេក្រង់</th>\n                  <th>តួនាទីអ្នកប្រើចម្បង</th>\n                  <th>កិច្ចការស្នូល</th>\n                  <th>វាលទិន្នន័យដែលបង្ហាញ</th>\n                  <th>សកម្មភាពចម្បង &amp; Power Fx</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <td><code>scrHome</code></td>\n                  <td>គ្រប់តួនាទីក្នុងរោងចក្រ</td>\n                  <td>ពិនិត្យបញ្ជីសំបុត្រសកម្ម &amp; ប្រើតម្រង</td>\n                  <td><code>RequestID</code>, <code>MachineID</code>, <code>Status</code>, <code>Date</code></td>\n                  <td><code>Navigate(scrNewRequest)</code></td>\n                </tr>\n                <tr>\n                  <td><code>scrNewRequest</code></td>\n                  <td>បុគ្គលិកបញ្ជាម៉ាស៊ីន</td>\n                  <td>កត់ត្រាការកើតហេតុ &amp; រោគសញ្ញាខូច</td>\n                  <td><code>MachineID</code>, <code>IssueDescription</code>, <code>Urgency</code></td>\n                  <td><code>SubmitForm(); Notify(); Navigate()</code></td>\n                </tr>\n                <tr>\n                  <td><code>scrApproval</code></td>\n                  <td>ប្រធានផ្នែក</td>\n                  <td>ពិនិត្យសម្រង់តម្លៃ &amp; អនុញ្ញាតការងារ</td>\n                  <td>ព័ត៌មានកើតហេតុ + <code>EstimatedCost</code></td>\n                  <td><code>Patch(Status: \"Approved\"); Notify()</code></td>\n                </tr>\n                <tr>\n                  <td><code>scrWorkOrder</code></td>\n                  <td>ជាងជួសជុល &amp; QA</td>\n                  <td>កត់ត្រាម៉ោងការងារ &amp; បញ្ជាក់សុវត្ថិភាព</td>\n                  <td><code>LaborHours</code>, <code>SafetyRunPassed</code></td>\n                  <td><code>Patch(Status: \"Closed\"); Notify()</code></td>\n                </tr>\n              </tbody>\n            </table>\n          </div>"
  },
  // Slide 14: អន្ទាក់នៃការរចនាអេក្រង់
  {
    title: "អន្ទាក់នៃការរចនាអេក្រង់",
    segment: "វគ្គ ៤៖ ការបង្ហាញ & បន្ទប់ពិសោធន៍",
    content: "<div class=\"slide-header\">\n            <span class=\"section-tag section-tag-danger\">ការវិភាគមូលហេតុ &amp; ផលប៉ះពាល់</span>\n            <h2>តើមានអ្វីកើតឡើងនៅពេលអ្នកបំពានវិន័យនៃការរចនាអេក្រង់?</h2>\n            <p class=\"subtitle\">ការបរាជ័យក្នុងប្រតិបត្តិការជាក់ស្តែងដែលកើតឡើងក្នុងរោងចក្រ នៅពេលអ្នកអភិវឌ្ឍន៍រចនាផ្ទាំង UI មិនត្រឹមត្រូវ។</p>\n          </div>\n\n          <div class=\"failure-analysis-grid\">\n            <div class=\"failure-card\">\n              <div class=\"fail-header\">\n                <span class=\"fail-badge\">អន្ទាក់ទី ១៖ អន្ទាក់អេក្រង់ច្របូកច្របល់តែមួយ</span>\n                <h4>ការដាក់មនុស្សគ្រប់គ្នាលើអេក្រង់តែមួយ</h4>\n              </div>\n              <p>បុគ្គលិក, ប្រធាន និងជាងជួសជុល ប្រើប្រាស់អេក្រង់យក្សតែមួយដែលមាន ២៥ ប្រអប់អត្ថបទ និង ៦ ប៊ូតុង។</p>\n              <div class=\"fail-visual\">\n                <div class=\"fail-box-bad\">\n                  <span>ផលវិបាក៖</span>\n                  <strong>ការភាន់ច្រឡំ &amp; ការចុចខុស៖</strong> បុគ្គលិកចុចច្រឡំលើប៊ូតុងអនុម័តរបស់ប្រធាន បញ្ចេញម៉ាស៊ីនដែលមិនទាន់ជួសជុលឱ្យដំណើរការផលិតកម្ម។\n                </div>\n              </div>\n              <div class=\"fail-impact\">មហន្តរាយ៖ បាត់បង់ការគ្រប់គ្រង, រំលងការត្រួតពិនិត្យ, ខូចខាតគ្រឿងចក្រ!</div>\n            </div>\n\n            <div class=\"failure-card\">\n              <div class=\"fail-header\">\n                <span class=\"fail-badge\">អន្ទាក់ទី ២៖ អន្ទាក់ការបញ្ជូនទិន្នន័យស្ងាត់ស្ងៀម</span>\n                <h4>ការខកខានមិនបានដាក់មតិឆ្លើយតប (<code>Notify</code>)</h4>\n              </div>\n              <p>អ្នកប្រើប្រាស់ចុច \"Submit\" ប៊ូតុងភ្លឹបភ្លែត ប៉ុន្តែគ្មានសារបញ្ជាក់ណាមួយបង្ហាញលើអេក្រង់ឡើយ។</p>\n              <div class=\"fail-visual\">\n                <div class=\"fail-box-bad\">\n                  <span>ផលវិបាក៖</span>\n                  <strong>ភាពមិនច្បាស់លាស់ &amp; ការបង្កើតទិន្នន័យស្ទួន៖</strong> បុគ្គលិកគិតថាកម្មវិធីគាំង។ គាត់ចុច \"Submit\" ៤ ដងទៀត បង្កើតជាសំបុត្រជួសជុលស្ទួនចំនួន ៤ ច្បាប់។\n                </div>\n              </div>\n              <div class=\"fail-impact\">មហន្តរាយ៖ សំបុត្រការងារស្ទួន, ជាងជួសជុលច្របូកច្របល់, តារាងទិន្នន័យកើនឡើងឥតប្រយោជន៍!</div>\n            </div>\n          </div>"
  },
  // Slide 15: ការបង្ហាញផ្ទាល់របស់គ្រូ
  {
    title: "ការបង្ហាញផ្ទាល់របស់គ្រូ",
    segment: "វគ្គ ៥៖ ការអនុវត្តជាមួយគ្រូ & ពិសោធន៍",
    content: "<div class=\"slide-header\">\n            <span class=\"section-tag\">ពិធីការនៃការបង្ហាញផ្ទាល់</span>\n            <h2>ការបង្ហាញផ្ទាល់របស់គ្រូ៖ គូរប្លង់ Wireframe អេក្រង់ស្នើសុំលើក្រដាស</h2>\n            <p class=\"subtitle\">សង្កេតមើលគ្រូគូរប្លង់អេក្រង់ស្នើសុំចល័តកម្រិតផលិតកម្ម ដោយប្រើរូបមន្ត UI ៤ តំបន់។</p>\n          </div>\n\n          <div class=\"demo-protocol-steps\">\n            <div class=\"proto-step\">\n              <span class=\"step-num\">01</span>\n              <h4>តំបន់ ១៖ របារក្បាល &amp; បរិបទ</h4>\n              <p>ដាក់របារចំណងជើងខាងលើជាមួយសញ្ញាព្រួញ Back (<code>&lt;</code>) និងចំណងជើងអេក្រង់៖ <code>\"កត់ត្រាម៉ាស៊ីនខូច\"</code>។</p>\n            </div>\n\n            <div class=\"proto-step\">\n              <span class=\"step-num\">02</span>\n              <h4>តំបន់ ២៖ ប្រអប់បញ្ចូលចម្បង</h4>\n              <p>ដាក់ <code>cmbMachine</code> (Dropdown) និង <code>txtDescription</code> (Multiline Text) ជាមួយស្លាកអក្សរច្បាស់ៗ។</p>\n            </div>\n\n            <div class=\"proto-step\">\n              <span class=\"step-num\">03</span>\n              <h4>តំបន់ ៣៖ ប្រអប់រើសកម្រិតបន្ទាន់</h4>\n              <p>ដាក់ប៊ូតុងជ្រើសរើសស្អាតបាតសម្រាប់កម្រិតបន្ទាន់៖ <code>[ទាប] [មធ្យម] [បន្ទាន់ខ្លាំង]</code>។</p>\n            </div>\n\n            <div class=\"proto-step\">\n              <span class=\"step-num\">04</span>\n              <h4>តំបន់ ៤៖ របារសកម្មភាពខាងក្រោម</h4>\n              <p>ដាក់ប៊ូតុងធំៗងាយស្រួលចុច <code>btnSubmit</code> ដែលចាក់សោតាមរយៈរូបមន្ត <code>DisplayMode = If(IsBlank(Desc), Disabled, Edit)</code>។</p>\n            </div>\n          </div>"
  },
  // Slide 16: ការធ្វើសវនកម្ម UI ជាមួយគ្រូ
  {
    title: "ការធ្វើសវនកម្ម UI ជាមួយគ្រូ",
    segment: "វគ្គ ៥៖ ការអនុវត្តជាមួយគ្រូ & ពិសោធន៍",
    content: "<div class=\"slide-header\">\n            <span class=\"section-tag\">ការអនុវត្តមានការណែនាំ</span>\n            <h2>ស្វែងរកកំហុស UI ធ្ងន់ធ្ងរទាំង ៤ នៅក្នុងកម្មវិធីឃ្លាំងអេក្រង់តែមួយនេះ</h2>\n            <p class=\"subtitle\">ពិនិត្យមើលប្លង់អេក្រង់ដែលស្នើឡើងដោយអ្នកបង្កើតដែលមិនទាន់បានបណ្តុះបណ្តាល។ តើអ្នកអាចរកឃើញកំហុស UX ទាំង ៤ ដែរឬទេ?</p>\n          </div>\n\n          <div class=\"audit-grid\">\n            <div class=\"audit-schema-table\">\n              <table>\n                <thead>\n                  <tr>\n                    <th>ធាតុអេក្រង់</th>\n                    <th>ការអនុវត្តដែលបានស្នើ</th>\n                    <th>ស្ថានភាពបច្ចុប្បន្ន</th>\n                    <th>កំហុសកំបាំងធ្ងន់ធ្ងរ</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr class=\"flaw-row\">\n                    <td>ប៊ូតុងលុប</td>\n                    <td>ប៊ូតុងក្រហមយក្ស \"Delete All\" នៅក្បែរ Save</td>\n                    <td>សកម្មជានិច្ច</td>\n                    <td>❌ កំហុស ១៖ គ្មានប្រអប់បញ្ជាក់; គ្រោះថ្នាក់បាត់បង់ទិន្នន័យធ្ងន់ធ្ងរ!</td>\n                  </tr>\n                  <tr class=\"flaw-row\">\n                    <td>វាលតម្លៃ</td>\n                    <td>ប្រអប់អត្ថបទកែបាននៅលើអេក្រង់ Browse</td>\n                    <td>កែបានដោយគ្រប់គ្នា</td>\n                    <td>❌ កំហុស ២៖ នរណាក៏អាចកែប្រែថវិកាដោយចៃដន្យពេលរំកិលអេក្រង់!</td>\n                  </tr>\n                  <tr class=\"flaw-row\">\n                    <td>ប៊ូតុងបោះបង់</td>\n                    <td>បាត់បង់ទាំងស្រុង</td>\n                    <td>គ្មានសញ្ញាព្រួញ Back</td>\n                    <td>❌ កំហុស ៣៖ អ្នកប្រើប្រាស់ត្រូវជាប់គាំង គ្មានផ្លូវត្រឡប់ក្រោយ!</td>\n                  </tr>\n                  <tr class=\"flaw-row\">\n                    <td>សកម្មភាព Submit</td>\n                    <td>រក្សាទុកទិន្នន័យដោយគ្មានសារ Popup ឬ Banner</td>\n                    <td>បញ្ជូនស្ងាត់ស្ងៀម</td>\n                    <td>❌ កំហុស ៤៖ អ្នកប្រើគិតថាគាំង ហើយចុច ៥ ដង (ទិន្នន័យស្ទួន)!</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n\n            <div class=\"audit-takeaway-card\">\n              <h3>ការកែតម្រូវ UI កម្រិតវិជ្ជាជីវៈទាំង ៤៖</h3>\n              <ul class=\"correction-list\">\n                <li><strong>១. បំបែកសកម្មភាពបំផ្លិចបំផ្លាញ៖</strong> ផ្លាស់ប្តូរ Delete ទៅក្នុងផ្ទាំងបញ្ជាក់ដែលត្រូវការសិទ្ធិ Admin។</li>\n                <li><strong>២. ប្រើ Display Controls សម្រាប់ Browse៖</strong> អេក្រង់ Browse ត្រូវប្រើ Labels សម្រាប់តែអាន។</li>\n                <li><strong>៣. ផ្តល់ច្រកចេញជាសកល៖</strong> គ្រប់អេក្រង់ត្រូវតែមានសញ្ញាព្រួញ Back ដំណើរការរូបមន្ត <code>Back()</code>។</li>\n                <li><strong>៤. មតិឆ្លើយតបជាកាតព្វកិច្ច៖</strong> តែងតែហៅប្រើ <code>Notify(\"Success\", NotificationType.Success)</code>។</li>\n              </ul>\n            </div>\n          </div>"
  },
  // Slide 17: លំហាត់អនុវត្តផ្ទាល់ខ្លួន ៣ នាទី
  {
    title: "លំហាត់អនុវត្តផ្ទាល់ខ្លួន ៣ នាទី",
    segment: "វគ្គ ៥៖ ការអនុវត្តជាមួយគ្រូ & ពិសោធន៍",
    content: "<div class=\"slide-header\">\n            <span class=\"section-tag\">ការអនុវត្តលឿន ៣ នាទី</span>\n            <h2>លំហាត់អនុវត្តផ្ទាល់ខ្លួន៖ គូរប្លង់អេក្រង់ប្រគល់សម្ភារៈខូចក្នុងឃ្លាំង</h2>\n            <p class=\"subtitle\">ក្នុងរយៈពេល ៣ នាទី ចូរគូរប្លង់ Controls សំខាន់ៗចំនួន ៣ ដែលបុគ្គលិកឃ្លាំងត្រូវការដើម្បីកត់ត្រាសម្ភារៈខូច។</p>\n          </div>\n\n          <div class=\"mini-task-grid\">\n            <div class=\"task-card\">\n              <div class=\"task-num\">Control ១៖ ការបញ្ចូល (Input)</div>\n              <h3>លេខកូដសម្ភារៈ &amp; មូលហេតុខូច</h3>\n              <div class=\"task-form-box\">\n                <div class=\"task-item\">\n                  <span class=\"task-q\">ប្រភេទ Control៖</span>\n                  <span class=\"task-ans\"><code>Dropdown / ComboBox</code></span>\n                </div>\n                <div class=\"task-item\">\n                  <span class=\"task-q\">ភ្ជាប់វាលទិន្នន័យ៖</span>\n                  <span class=\"task-ans\"><code>ScrapReason</code> (ជម្រើស Choice ថ្ងៃទី ១១)</span>\n                </div>\n                <div class=\"task-item\">\n                  <span class=\"task-q\">ហេតុអ្វី?</span>\n                  <span class=\"task-ans\">ការពារកំហុសវាយអក្សរ; បង្ខំឱ្យរើសកូដសម្ភារៈខូចដែលបានអនុម័ត។</span>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"task-card\">\n              <div class=\"task-num\">Control ២៖ សកម្មភាព &amp; មតិឆ្លើយតប</div>\n              <h3>ប៊ូតុងបញ្ជូនសំបុត្រសម្ភារៈខូច</h3>\n              <div class=\"task-form-box\">\n                <div class=\"task-item\">\n                  <span class=\"task-q\">ប្រភេទ Control៖</span>\n                  <span class=\"task-ans\"><code>Button (Fluent Primary)</code></span>\n                </div>\n                <div class=\"task-item\">\n                  <span class=\"task-q\">រូបមន្ត Power Fx៖</span>\n                  <span class=\"task-ans\"><code>SubmitForm(); Notify(\"Scrap logged!\");</code></span>\n                </div>\n                <div class=\"task-item\">\n                  <span class=\"task-q\">ការចាក់សោ៖</span>\n                  <span class=\"task-ans\">បិទមិនឱ្យចុចរហូតដល់ចំនួន &gt; 0</span>\n                </div>\n              </div>\n            </div>\n          </div>"
  },
  // Slide 18: ឧបករណ៍ទី ២៖ ក្តារពិសោធន៍ ៦ ស្ថានភាព
  {
    title: "ឧបករណ៍ទី ២៖ ក្តារពិសោធន៍ ៦ ស្ថានភាព",
    segment: "វគ្គ ៥៖ ការអនុវត្តជាមួយគ្រូ & ពិសោធន៍",
    content: "<div class=\"slide-header\">\n            <span class=\"section-tag section-tag-accent\">ក្តារពិសោធន៍អន្តរកម្ម</span>\n            <h2>ឧបករណ៍ទី ២៖ ក្តារពិសោធន៍ស្ថាបត្យកម្មអេក្រង់ ៦ ស្ថានភាព</h2>\n            <p class=\"subtitle\">វាយតម្លៃកិច្ចការជាក់ស្តែងទាំង ៦ ក្នុងរោងចក្រ។ ជ្រើសរើសប្រភេទអេក្រង់ដែលសមស្របបំផុតសម្រាប់កិច្ចការនីមួយៗ។</p>\n          </div>\n\n          <div class=\"sim-workbench-container\">\n            <div class=\"sim-header-row\">\n              <span class=\"sim-progress-indicator\" id=\"sim-progress-text\">ស្ថានភាពទី ១ នៃ ៦</span>\n              <span class=\"sim-score-counter\">ពិន្ទុ៖ <span id=\"sim-score\">0</span> / 6 បានដោះស្រាយ</span>\n            </div>\n\n            <div class=\"sim-card-body\" id=\"sim-card-body\">\n              <div class=\"sim-scenario-badge\" id=\"sim-scenario-num\">ស្ថានភាពទី ១</div>\n              <h3 class=\"sim-title\" id=\"sim-scenario-title\">ការត្រួតពិនិត្យពេលព្រឹករបស់ប្រធានរោងចក្រ</h3>\n              <p class=\"sim-desc\" id=\"sim-scenario-desc\">ប្រធានរោងចក្រចង់បើកកម្មវិធីលើ iPad ដើម្បីមើលទិដ្ឋភាពទូទៅនៃម៉ាស៊ីនទាំង ១៨ ក្នុងរោងចក្រ ត្រងមើលការខូចខាតតាមកម្រិតបន្ទាន់ និងតាមដានថ្លៃខាតបង់សរុប។</p>\n              \n              <div class=\"sim-choices-row\">\n                <button class=\"sim-choice-btn\" data-choice=\"browse\">\n                  <span class=\"choice-icon\">📊</span>\n                  <span>អេក្រង់ពិនិត្យទិន្នន័យ / Gallery (<code>scrHome</code>)</span>\n                </button>\n                <button class=\"sim-choice-btn\" data-choice=\"intake\">\n                  <span class=\"choice-icon\">📝</span>\n                  <span>អេក្រង់ទម្រង់ស្នើសុំថ្មី (<code>scrNew</code>)</span>\n                </button>\n                <button class=\"sim-choice-btn\" data-choice=\"work\">\n                  <span class=\"choice-icon\">🔧</span>\n                  <span>អេក្រង់អនុវត្តការងាររបស់ជាង (<code>scrWork</code>)</span>\n                </button>\n              </div>\n\n              <div class=\"sim-feedback-box\" id=\"sim-feedback\" style=\"display: none;\"></div>\n            </div>\n\n            <div class=\"sim-nav-row\">\n              <button class=\"fluent-btn-secondary\" id=\"sim-prev-btn\" disabled>ស្ថានភាពមុន</button>\n              <button class=\"fluent-btn-primary\" id=\"sim-next-btn\">ស្ថានភាពបន្ទាប់ ➔</button>\n            </div>\n          </div>"
  },
  // Slide 19: ៤ ការយល់ច្រឡំគ្រោះថ្នាក់
  {
    title: "៤ ការយល់ច្រឡំគ្រោះថ្នាក់",
    segment: "វគ្គ ៥៖ ការអនុវត្តជាមួយគ្រូ & ពិសោធន៍",
    content: "<div class=\"slide-header\">\n            <span class=\"section-tag section-tag-danger\">អន្ទាក់ដែលត្រូវចៀសវាង</span>\n            <h2>៤ ការយល់ច្រឡំគ្រោះថ្នាក់បំផុតក្នុងការរចនាអេក្រង់</h2>\n            <p class=\"subtitle\">ការទប់ស្កាត់កំហុស UI/UX ដែលកើតឡើងញឹកញាប់បំផុតដោយអ្នកបង្កើតកម្មវិធីថ្មីថ្មោង។</p>\n          </div>\n\n          <div class=\"misconceptions-grid\">\n            <div class=\"misconception-card\">\n              <div class=\"misconception-wrong\">\n                <span class=\"wrong-badge\">ផ្នត់គំនិតខុស ១</span>\n                <h4>\"Power App គ្រាន់តែជាទំព័រវេបសាយមួយធំ ដាក់អ្វីៗលើអេក្រង់តែមួយចំណេញការចុច។\"</h4>\n              </div>\n              <div class=\"misconception-right\">\n                <span class=\"right-badge\">ការពន្យល់របស់គ្រូ</span>\n                <p>អេក្រង់តែមួយបង្កើតឱ្យមាន <strong>ការស្ទាក់ស្ទើរ &amp; ភាន់ច្រឡំ</strong> និងហានិភ័យសុវត្ថិភាព។ ការបំបែកអេក្រង់ប្រៀបដូចជាបន្ទប់ដាច់ដោយឡែក ដែលជួយឱ្យមនុស្សម្នាក់ៗផ្តោតលើកិច្ចការរបស់ខ្លួន។</p>\n              </div>\n            </div>\n\n            <div class=\"misconception-card\">\n              <div class=\"misconception-wrong\">\n                <span class=\"wrong-badge\">ផ្នត់គំនិតខុស ២</span>\n                <h4>\"ពណ៌គ្រាន់តែជាការតុបតែងស្អាត ចង់ប្រើពណ៌ឥន្ទធនូប៉ុន្មានក៏បានលើប៊ូតុង។\"</h4>\n              </div>\n              <div class=\"misconception-right\">\n                <span class=\"right-badge\">ការពន្យល់របស់គ្រូ</span>\n                <p>ក្នុងកម្មវិធីឧស្សាហកម្ម ពណ៌គឺជា <strong>ភាសាទំនាក់ទំនងសុវត្ថិភាព</strong>។ ក្រហម = គ្រោះថ្នាក់/ឈប់, បៃតង = ជោគជ័យ/សុវត្ថិភាព, លឿង = ប្រុងប្រយ័ត្ន។ ពណ៌រញ៉េរញ៉ៃធ្វើឱ្យមើលមិនឃើញសញ្ញាអាសន្ន!</p>\n              </div>\n            </div>\n\n            <div class=\"misconception-card\">\n              <div class=\"misconception-wrong\">\n                <span class=\"wrong-badge\">ផ្នត់គំនិតខុស ៣</span>\n                <h4>\"មិនបាច់ដាក់សារ Notify() ទេ អ្នកប្រើប្រាកដជាដឹងថាជោគជ័យពេលអេក្រង់ផ្លាស់ប្តូរ។\"</h4>\n              </div>\n              <div class=\"misconception-right\">\n                <span class=\"right-badge\">ការពន្យល់របស់គ្រូ</span>\n                <p>ភាពស្ងៀមស្ងាត់បង្កើតការភ័យខ្លាច។ បើគ្មានសារ Notify ពណ៌បៃតងទេ អ្នកប្រើនឹងគិតថាកម្មវិធីគាំង ហើយចុចប៊ូតុង Submit ផ្ទួនៗ ដែលបង្កើតជាទិន្នន័យស្ទួនរាប់សិបជួរ!</p>\n              </div>\n            </div>\n\n            <div class=\"misconception-card\">\n              <div class=\"misconception-wrong\">\n                <span class=\"wrong-badge\">ផ្នត់គំនិតខុស ៤</span>\n                <h4>\"ដាក់ប្រអប់ Text Input ទាំងអស់លើអេក្រង់ពិនិត្យប្រវត្តិ ដើម្បីឱ្យស្រួលកែពេលខុស។\"</h4>\n              </div>\n              <div class=\"misconception-right\">\n                <span class=\"right-badge\">ការពន្យល់របស់គ្រូ</span>\n                <p>អេក្រង់ពិនិត្យប្រវត្តិត្រូវតែជា <strong>Display Controls (Labels)</strong> សម្រាប់តែអាន! ប្រអប់ Text Input នឹងបណ្តាលឱ្យដៃប៉ះច្រឡំលើទូរស័ព្ទដៃ ហើយលុបប្រវត្តិសវនកម្មដោយមិនដឹងខ្លួន។</p>\n              </div>\n            </div>\n          </div>"
  },
  // Slide 20: ឧបករណ៍ទី ៣៖ តេស្តស្ទង់ការយល់ដឹង
  {
    title: "ឧបករណ៍ទី ៣៖ តេស្តស្ទង់ការយល់ដឹង",
    segment: "វគ្គ ៦៖ វាយតម្លៃ & ស្ពានទៅថ្ងៃទី ១៣",
    content: "<div class=\"slide-header\">\n            <span class=\"section-tag section-tag-accent\">ការវាយតម្លៃការយល់ដឹង</span>\n            <h2>ឧបករណ៍ទី ៣៖ តេស្តស្ទង់ការយល់ដឹងស៊ីជម្រៅ ៥ សំណួរ</h2>\n            <p class=\"subtitle\">ផ្ទៀងផ្ទាត់ការយល់ដឹងរបស់អ្នកលើស្ថាបត្យកម្មអេក្រង់, គ្រួសារ Control, តក្កវិជ្ជាបញ្ជូនទិស, និងមតិឆ្លើយតប។</p>\n          </div>\n\n          <div class=\"quiz-container\">\n            <div class=\"quiz-header-row\">\n              <span class=\"quiz-q-counter\" id=\"quiz-question-counter\">សំណួរទី ១ នៃ ៥</span>\n              <span class=\"quiz-score-badge\">ពិន្ទុ៖ <span id=\"quiz-score-display\">0</span> / 5</span>\n            </div>\n\n            <div class=\"quiz-question-box\">\n              <h3 class=\"quiz-question-title\" id=\"quiz-title\">កំពុងដំណើរការសំណួរ...</h3>\n              <div class=\"quiz-options-grid\" id=\"quiz-options\">\n                <!-- Dynamically populated by script.js -->\n              </div>\n              <div class=\"quiz-feedback-box\" id=\"quiz-feedback\" style=\"display: none;\"></div>\n            </div>\n\n            <div class=\"quiz-footer-row\">\n              <button class=\"fluent-btn-secondary\" id=\"quiz-prev-btn\" disabled>សំណួរមុន</button>\n              <button class=\"fluent-btn-primary\" id=\"quiz-next-btn\">សំណួរបន្ទាប់ ➔</button>\n            </div>\n          </div>"
  },
  // Slide 21: លំហាត់ប្រឈម Capstone
  {
    title: "លំហាត់ប្រឈម Capstone",
    segment: "វគ្គ ៦៖ វាយតម្លៃ & ស្ពានទៅថ្ងៃទី ១៣",
    content: "<div class=\"slide-header\">\n            <span class=\"section-tag\">លំហាត់អនុវត្តសរុប</span>\n            <h2>លំហាត់ប្រឈម Capstone៖ រចនាប្លង់កម្មវិធីប្តូរពុម្ពដែក (Tooling App)</h2>\n            <p class=\"subtitle\">បំប្លែងលំហូរការងារប្តូរពុម្ពដែក ៤ ជំហាន (ពីថ្ងៃទី ១១) ទៅជាស្ថាបត្យកម្មអេក្រង់អាជីវកម្មចំនួន ៣។</p>\n          </div>\n\n          <div class=\"capstone-brief-grid\">\n            <div class=\"capstone-req-card\">\n              <div class=\"req-header\">\n                <span class=\"req-badge\">កិច្ចការមនុស្ស ៣ ដំណាក់កាល</span>\n                <h3>ដំណើរការអាជីវកម្មជាក់ស្តែង៖</h3>\n              </div>\n              <p>ពុម្ពដែកចាក់ជ័រត្រូវសឹករិចរិលក្រោយពេលចាក់បាន ៥០,០០០ ដង។ ចូររចនាអេក្រង់ចំនួន ៣៖</p>\n              <ol class=\"req-steps-list\">\n                <li><strong>អេក្រង់ ១ (<code>scrToolingList</code>)៖</strong> បង្ហាញបញ្ជីពុម្ពដែកដែលត្រូវប្តូរ ត្រងតាមលេខម៉ាស៊ីន។</li>\n                <li><strong>អេក្រង់ ២ (<code>scrToolingRequest</code>)៖</strong> ជាងបច្ចេកទេសរាយការណ៍ពុម្ពសឹក រើសលេខម៉ាស៊ីន និងលេខកូដពុម្ព។</li>\n                <li><strong>អេក្រង់ ៣ (<code>scrToolingApproval</code>)៖</strong> ប្រធានពិនិត្យសម្រង់តម្លៃពុម្ពថ្មី ($2,500+) រួចចុច Approve ឬ Reject។</li>\n              </ol>\n            </div>\n\n            <div class=\"capstone-tasks-card\">\n              <div class=\"req-header\">\n                <span class=\"req-badge\">តារាងលទ្ធផលដែលត្រូវគូរ</span>\n                <h3>តារាងកំណត់លក្ខណៈបច្ចេកទេស៖</h3>\n              </div>\n              <p>គូរតារាងស្ថាបត្យកម្ម ៣ ជួរលើក្រដាសរបស់អ្នក៖</p>\n              <ul class=\"deliverable-list\">\n                <li>• <strong>ឈ្មោះអេក្រង់៖</strong> <code>scrToolingList</code>, <code>scrToolingRequest</code>, <code>scrToolingApproval</code></li>\n                <li>• <strong>អ្នកប្រើប្រាស់៖</strong> Technician, Supervisor, ឬ All</li>\n                <li>• <strong>Input Controls៖</strong> Dropdown, Text Box, Number Input</li>\n                <li>• <strong>Display Controls៖</strong> Gallery, Labels, Status Badges</li>\n                <li>• <strong>Action &amp; Power Fx៖</strong> រូបមន្ត Navigate និង Notify</li>\n              </ul>\n            </div>\n          </div>"
  },
  // Slide 22: ឧបករណ៍ទី ៤៖ ដំណោះស្រាយគំរូ & តារាងវាយតម្លៃ
  {
    title: "ឧបករណ៍ទី ៤៖ ដំណោះស្រាយគំរូ & តារាងវាយតម្លៃ",
    segment: "វគ្គ ៦៖ វាយតម្លៃ & ស្ពានទៅថ្ងៃទី ១៣",
    content: "<div class=\"slide-header\">\n            <span class=\"section-tag section-tag-accent\">ការវាយតម្លៃលទ្ធផល</span>\n            <h2>ឧបករណ៍ទី ៤៖ បង្ហាញដំណោះស្រាយគំរូ Capstone &amp; តារាងវាយតម្លៃ ៤ កម្រិត</h2>\n            <p class=\"subtitle\">ផ្ទៀងផ្ទាត់គំនូរប្លង់របស់អ្នកធៀបនឹងដំណោះស្រាយស្តង់ដារសហគ្រាស និងវាយតម្លៃសមត្ថភាពផ្ទាល់ខ្លួន។</p>\n          </div>\n\n          <div class=\"solution-rubric-container\">\n            <div class=\"solution-toggle-bar\">\n              <button class=\"fluent-btn-primary\" id=\"btn-reveal-solution\">\n                <span id=\"solution-btn-icon\">👁️</span>\n                <span id=\"solution-btn-text\">បង្ហាញម៉ាទ្រីសដំណោះស្រាយគំរូ</span>\n              </button>\n              <span class=\"rubric-hint\">ចុចដើម្បីពិនិត្យស្ថាបត្យកម្មអេក្រង់ស្តង់ដារផលិតកម្ម</span>\n            </div>\n\n            <!-- Collapsible Solution Drawer -->\n            <div class=\"solution-content-drawer collapsed\" id=\"solution-content\">\n              <table class=\"capstone-table solution-table\">\n                <thead>\n                  <tr>\n                    <th>ឈ្មោះអេក្រង់</th>\n                    <th>តួនាទីអ្នកប្រើ</th>\n                    <th>គោលបំណង</th>\n                    <th>Input Controls</th>\n                    <th>Display Controls</th>\n                    <th>សកម្មភាពចម្បង &amp; Power Fx</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td><code>scrToolingList</code></td>\n                    <td>គ្រប់តួនាទីក្នុងរោងចក្រ</td>\n                    <td>ពិនិត្យបញ្ជីពុម្ពដែកសកម្ម</td>\n                    <td>Search Box (<code>txtSearch</code>)</td>\n                    <td>Gallery (<code>galTooling</code>), Status Badges</td>\n                    <td><code>Navigate(scrToolingRequest)</code></td>\n                  </tr>\n                  <tr>\n                    <td><code>scrToolingRequest</code></td>\n                    <td>ជាងបច្ចេកទេស</td>\n                    <td>ស្នើសុំប្តូរពុម្ពដែកសឹក</td>\n                    <td><code>cmbPress</code>, <code>txtDieSerial</code></td>\n                    <td>Header Labels, Form Title</td>\n                    <td><code>SubmitForm(); Notify(); Navigate()</code></td>\n                  </tr>\n                  <tr>\n                    <td><code>scrToolingApproval</code></td>\n                    <td>ប្រធានផ្នែក</td>\n                    <td>ពិនិត្យ &amp; អនុម័តតម្លៃពុម្ព</td>\n                    <td><code>txtQuoteCost</code> (រូបិយវត្ថុ)</td>\n                    <td>ព័ត៌មានពុម្ព (Read-Only)</td>\n                    <td><code>Patch(Status: \"Approved\"); Notify()</code></td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n\n            <!-- 4-Level Evaluation Rubric -->\n            <div class=\"rubric-matrix-grid\">\n              <div class=\"rubric-level-card level-4\">\n                <div class=\"rubric-badge\">កម្រិត ៤៖ ស្ទាត់ជំនាញ (100%)</div>\n                <h4>ស្ថាបត្យកម្ម UX ឥតខ្ចោះ</h4>\n                <p>បំបែកអេក្រង់ទាំង ៣ ត្រូវតាមកិច្ចការមនុស្ស ១០០%; ចាត់ថ្នាក់ Input vs Display Controls បានត្រឹមត្រូវឥតខ្ចោះ; មានរូបមន្ត Notify &amp; Navigate ច្បាស់លាស់។</p>\n              </div>\n\n              <div class=\"rubric-level-card level-3\">\n                <div class=\"rubric-badge\">កម្រិត ៣៖ កម្រិតល្អ (75–99%)</div>\n                <h4>យល់ដឹងរឹងមាំ</h4>\n                <p>រចនាអេក្រង់ ៣ បានល្អ; មានច្រឡំតិចតួចរវាង Input និង Display Controls; លំហូរបញ្ជូនទិសត្រឹមត្រូវ; មានចន្លោះប្រហោងតិចតួចក្នុង Notify។</p>\n              </div>\n\n              <div class=\"rubric-level-card level-2\">\n                <div class=\"rubric-badge\">កម្រិត ២៖ កំពុងអភិវឌ្ឍ (50–74%)</div>\n                <h4>យល់ដឹងមួយផ្នែក</h4>\n                <p>ញាត់បញ្ចូលការងារលើ ២ អេក្រង់; ទុកប៊ូតុងអនុម័តរបស់ប្រធានលើទម្រង់ស្នើសុំ; ច្រឡំ Display ជាមួយ Input; ភ្លេចដាក់សារផ្តល់ដំណឹង។</p>\n              </div>\n\n              <div class=\"rubric-level-card level-1\">\n                <div class=\"rubric-badge\">កម្រិត ១៖ អ្នកចាប់ផ្តើម (&lt;50%)</div>\n                <h4>ត្រូវការរំលឹកឡើងវិញ</h4>\n                <p>បង្កើតអេក្រង់តែមួយញាត់បញ្ចូលគ្រប់យ៉ាង; មិនអាចបែងចែកគ្រួសារ Control ទាំង ៣; មិនទាន់យល់ពីការបញ្ជូនទិសដៅរវាងអេក្រង់។</p>\n              </div>\n            </div>\n          </div>"
  },
  // Slide 23: ការរំលឹកឡើងវិញ & កិច្ចការផ្ទះ
  {
    title: "ការរំលឹកឡើងវិញ & កិច្ចការផ្ទះ",
    segment: "វគ្គ ៦៖ វាយតម្លៃ & ស្ពានទៅមុខ",
    content: "<div class=\"slide-header\">\n            <span class=\"section-tag\">ការអនុវត្តពង្រឹងចំណេះដឹង</span>\n            <h2>ការរំលឹកឡើងវិញ ១៥ នាទី &amp; កិច្ចការផ្ទះ</h2>\n            <p class=\"subtitle\">ពិនិត្យមើល App លើទូរស័ព្ទរបស់អ្នក មុនពេលយើងចូលរួមអនុវត្តបង្កើតក្នុង Power Apps Studio ផ្ទាល់នៅថ្ងៃស្អែក។</p>\n          </div>\n\n          <div class=\"homework-container\">\n            <div class=\"homework-card\">\n              <div class=\"hw-icon\">📱</div>\n              <h3>លំហាត់ពិនិត្យអេក្រង់ App លើទូរស័ព្ទដៃ</h3>\n              <p>បើក App ធនាគារ (Mobile Banking) ឬ App កុម្ម៉ង់ម្ហូបដែលអ្នកចូលចិត្តលើទូរស័ព្ទដៃ៖</p>\n              <div class=\"hw-steps\">\n                <div class=\"hw-step-item\">\n                  <span class=\"hw-bullet\">1</span>\n                  <span>រាប់មើលថាតើអ្នកត្រូវឆ្លងកាត់ <strong>អេក្រង់ខុសៗគ្នាចំនួនប៉ុន្មាន</strong> ដើម្បីកុម្ម៉ង់ម្ហូបមួយពេល ឬផ្ទេរប្រាក់មួយដង។</span>\n                </div>\n                <div class=\"hw-step-item\">\n                  <span class=\"hw-bullet\">2</span>\n                  <span>សង្កេតមើលថាតើអេក្រង់នីមួយៗសួរតែ <strong>សំណួរមួយ ឬពីរ</strong> ប៉ុណ្ណោះក្នុងពេលតែមួយយ៉ាងដូចម្តេច។</span>\n                </div>\n                <div class=\"hw-step-item\">\n                  <span class=\"hw-bullet\">3</span>\n                  <span>កំណត់ឱ្យបានយ៉ាងហោចណាស់ <strong>Input Control</strong> មួយ, <strong>Display Control</strong> មួយ, និង <strong>Action Control</strong> មួយលើអេក្រង់នីមួយៗ។</span>\n                </div>\n                <div class=\"hw-step-item\">\n                  <span class=\"hw-bullet\">4</span>\n                  <span>សង្កេតមើលថាតើ App នោះផ្តល់ <strong>ដំណឹងឆ្លើយតប (Feedback)</strong> បែបណា នៅពេលការកុម្ម៉ង់ ឬផ្ទេរប្រាក់របស់អ្នកទទួលបានជោគជ័យ។</span>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"trainer-quote-card\">\n              <span class=\"quote-sparkle\">✨</span>\n              <p class=\"quote-text\">\"អាថ៌កំបាំងនៃការបង្កើតកម្មវិធីដ៏អស្ចារ្យមិនមែនជាទេពកោសល្យនៃការសរសេរកូដនោះទេ។ វាគឺជាការយល់ចិត្តអ្នកប្រើប្រាស់។ នៅពេលអ្នកផ្តល់ឱ្យភារកិច្ចរបស់មនុស្សម្នាក់ៗនូវបន្ទប់ផ្ទាល់ខ្លួនដ៏ស្អាតបាត កម្មវិធីរបស់អ្នកនឹងក្លាយជាកម្មវិធីដែលងាយស្រួលប្រើប្រាស់បំផុត។\"</p>\n              <span class=\"quote-author\">— កំណត់ចំណាំពីគ្រូបណ្តុះបណ្តាល Power Apps Foundation</span>\n            </div>\n          </div>"
  },
  // Slide 24: ស្ពានតភ្ជាប់ទៅថ្ងៃទី ១៣
  {
    title: "ស្ពានតភ្ជាប់ទៅថ្ងៃទី ១៣",
    segment: "វគ្គ ៦៖ វាយតម្លៃ & ស្ពានទៅមុខ",
    content: "<div class=\"slide-header\">\n            <span class=\"section-tag section-tag-accent\">ស្ពានតភ្ជាប់ទៅមុខ</span>\n            <h2>កន្លែងដែលយើងបានឆ្លងកាត់ &amp; កន្លែងដែលយើងនឹងទៅដល់នៅថ្ងៃស្អែក</h2>\n            <p class=\"subtitle\">ថ្ងៃស្អែកក្នុងថ្ងៃទី ១៣ យើងនឹងបើកដំណើរការ Power Apps Studio ជាលើកដំបូង៖ ការអនុវត្តគំនូសព្រាងលើក្រដាសទៅក្នុង Canvas Studio ផ្ទាល់!</p>\n          </div>\n\n          <div class=\"three-day-bridge-grid\">\n            <div class=\"bridge-card bridge-yesterday\">\n              <span class=\"bridge-day\">ម្សិលមិញ (ថ្ងៃទី ១១)</span>\n              <h4>រចនាទិន្នន័យចេញពីដំណើរការ</h4>\n              <p>ទាញយក ៨ ជួរឈរពីសំណួរលំហូរការងារ ជ្រើសរើស Data Types ដែលមិនងាយខូច កំណត់ Master Status និងបង្កើតលេខកូដសម្គាល់ ID តែមួយគត់។</p>\n              <div class=\"bridge-footer\">គោលគំនិត៖ Process ➔ Data Schema</div>\n            </div>\n\n            <div class=\"bridge-card bridge-today\">\n              <span class=\"bridge-day active-day\">ថ្ងៃនេះ (ថ្ងៃទី ១២)</span>\n              <h4>ពីដំណើរការ + ទិន្នន័យ ទៅជាអេក្រង់</h4>\n              <p>បំបែកភារកិច្ចមនុស្សទៅតាមអេក្រង់ជាក់លាក់ ចាត់ថ្នាក់ Input/Display/Action controls និងកំណត់ផ្លូវរុករកជាមួយការឆ្លើយតប Feedback។</p>\n              <div class=\"bridge-footer\">គោលគំនិត៖ Task ➔ Screens Wireframe</div>\n            </div>\n\n            <div class=\"bridge-card bridge-tomorrow\">\n              <span class=\"bridge-day\">ថ្ងៃស្អែក (ថ្ងៃទី ១៣)</span>\n              <h4>អនុវត្តគំនូសព្រាងចូលក្នុង Studio</h4>\n              <p>យើងនឹងបើក Microsoft Power Apps Canvas Studio! អ្នកនឹងដាក់បញ្ចូល Galleries, Forms, Cards, និង Containers ដើម្បីឱ្យប្លង់ថ្ងៃនេះមានជីវិត!</p>\n              <div class=\"bridge-footer\">គោលគំនិត៖ Studio Construction</div>\n            </div>\n          </div>\n\n          <div class=\"bridge-conclusion-banner\">\n            <strong>សូមអបអរសាទរចំពោះការបញ្ចប់ថ្ងៃទី ១២ ដោយជោគជ័យ!</strong>\n            <span>ប្លង់ Wireframe របស់អ្នកត្រូវបានរៀបចំរួចរាល់ហើយ។ ថ្ងៃស្អែក យើងនឹងសាងសង់កម្មវិធីពិតប្រាកដក្នុង Power Apps Studio!</span>\n          </div>"
  }
];

  // --------------------------------------------------------------------------
  // 5. CORE PRESENTATION ENGINE
  // --------------------------------------------------------------------------
  function initPresentation() {
    slides = Array.from(document.querySelectorAll('.slide'));
    
    // Cache original English slide innerHTML
    slides.forEach((slide) => {
      const contentEl = slide.querySelector('.slide-content');
      slideOriginals.push(contentEl ? contentEl.innerHTML : '');
    });

    initNavigationButtons();
    initKeyboardShortcuts();
    initHeaderControls();
    initTimer();
    initNotesDrawer();
    initOverviewGrid();
    initLaserPointer();
    initRetrievalCards();

    // Init interactive widgets
    initWorkbench();
    initSimulator();
    initQuiz();
    initCapstoneSolution();

    // Show initial slide
    goToSlide(0);
  }

  function initNavigationButtons() {
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const btnRestart = document.getElementById('btn-restart');
    const heroStartBtn = document.getElementById('hero-start-btn');

    if (btnPrev) {
      btnPrev.onclick = prevSlide;
      btnPrev.addEventListener('click', prevSlide);
    }
    if (btnNext) {
      btnNext.onclick = nextSlide;
      btnNext.addEventListener('click', nextSlide);
    }
    if (btnRestart) btnRestart.addEventListener('click', () => goToSlide(0));
    if (heroStartBtn) heroStartBtn.addEventListener('click', () => goToSlide(1));

    // Click anywhere on presentation stage to advance slide (PowerPoint-style)
    const stage = document.getElementById('presentation-stage');
    if (stage) {
      stage.addEventListener('click', (e) => {
        // Do not advance if user clicked inside interactive elements
        if (e.target.closest('button, select, input, textarea, a, .retrieval-card, .overview-card, .quiz-opt-btn, .sim-choice-btn, .notes-drawer, .overview-modal, .workbench-form-panel, .workbench-output-panel, .schema-workbench-layout, .trainer-notes-panel')) {
          return;
        }
        nextSlide();
      });
    }
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
    updateOverviewActiveCard();
  }

  function updateHeaderFooter() {
    const currentSlide = slides[currentSlideIndex];
    const titleEl = document.getElementById('current-slide-title');
    const curNum = document.getElementById('slide-current-num') || document.getElementById('current-slide-num');
    const totNum = document.getElementById('slide-total-count') || document.getElementById('total-slides-num');
    const counterEl = document.getElementById('slide-counter');
    const progressFill = document.getElementById('progress-bar') || document.getElementById('progress-fill') || document.getElementById('progress-bar-fill');
    const segmentEl = document.getElementById('current-segment-name');

    const titleEn = currentSlide.getAttribute('data-title') || 'From Process + Data to App Screens';
    const titleKh = KHMER_SLIDES[currentSlideIndex] ? KHMER_SLIDES[currentSlideIndex].title : titleEn;
    const segmentEn = currentSlide.getAttribute('data-segment') || 'Part 1: Recall & Connect';
    const segmentKh = KHMER_SLIDES[currentSlideIndex] ? KHMER_SLIDES[currentSlideIndex].segment : segmentEn;

    if (titleEl) {
      titleEl.textContent = isKhmerActive ? titleKh : titleEn;
    }

    if (curNum) {
      curNum.textContent = String(currentSlideIndex + 1);
    }
    if (totNum) {
      totNum.textContent = String(totalSlides);
    }
    if (counterEl) {
      counterEl.innerHTML = isKhmerActive 
        ? `ស្លាយទី <span id="slide-current-num">${currentSlideIndex + 1}</span> / <span id="slide-total-count">${totalSlides}</span>`
        : `Slide <span id="slide-current-num">${currentSlideIndex + 1}</span> / <span id="slide-total-count">${totalSlides}</span>`;
    }

    if (progressFill) {
      const percentage = ((currentSlideIndex + 1) / totalSlides) * 100;
      progressFill.style.width = `${percentage}%`;
    }

    if (segmentEl && !isTimerRunning) {
      segmentEl.textContent = isKhmerActive ? segmentKh : segmentEn;
    }
  }

  // --------------------------------------------------------------------------
  // 6. BILINGUAL LANGUAGE TOGGLE (NON-DESTRUCTIVE DOM SWAPPING)
  // --------------------------------------------------------------------------
  function initHeaderControls() {
    const langBtn = document.getElementById('lang-switch-btn') || document.getElementById('btn-language');
    const notesBtn = document.getElementById('notes-toggle-btn') || document.getElementById('btn-notes');
    const laserBtn = document.getElementById('laser-toggle-btn') || document.getElementById('btn-laser');
    const fullscreenBtn = document.getElementById('fullscreen-toggle-btn') || document.getElementById('btn-fullscreen');
    const overviewBtn = document.getElementById('overview-toggle-btn') || document.getElementById('btn-overview');

    if (langBtn) langBtn.addEventListener('click', toggleLanguage);
    if (notesBtn) notesBtn.addEventListener('click', toggleNotes);
    if (laserBtn) laserBtn.addEventListener('click', toggleLaserPointer);
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);
    if (overviewBtn) overviewBtn.addEventListener('click', toggleOverview);
  }

  function toggleLanguage() {
    try { localStorage.setItem('powerapps_presentation_lang', !isKhmerActive ? 'km' : 'en'); } catch(e){}
    isKhmerActive = !isKhmerActive;
    document.body.classList.toggle('khmer-mode', isKhmerActive);

    const langText = document.getElementById('lang-label') || document.getElementById('lang-text');
    if (langText) {
      langText.textContent = isKhmerActive ? 'ភាសាខ្មែរ (Khmer)' : 'English (អង់គ្លេស)';
    }

    // Apply language to all slides
    slides.forEach((slide, idx) => {
      const contentEl = slide.querySelector('.slide-content');
      if (!contentEl) return;

      if (isKhmerActive && KHMER_SLIDES[idx]) {
        contentEl.innerHTML = KHMER_SLIDES[idx].content;
      } else {
        contentEl.innerHTML = slideOriginals[idx];
      }
    });

    updateHeaderFooter();
    updateNotesContent();
    renderOverviewCards();

    // Re-bind interactive widget listeners after DOM swap
    rebindInteractiveWidgets();
  }

  function rebindInteractiveWidgets() {
    // Re-bind hero start button if on slide 1
    const heroBtn = document.getElementById('hero-start-btn');
    if (heroBtn) {
      heroBtn.addEventListener('click', () => goToSlide(1));
    }

    // Re-bind Retrieval cards
    initRetrievalCards();

    // Re-bind Widget 1
    initWorkbench();

    // Re-bind Widget 2
    initSimulator();

    // Re-bind Widget 3
    initQuiz();

    // Re-bind Widget 4
    initCapstoneSolution();
  }

  // --------------------------------------------------------------------------
  // 7. KEYBOARD SHORTCUTS
  // --------------------------------------------------------------------------
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Don't intercept if user is typing in form control
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

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
          closeAllModals();
          break;
      }
    });
  }

  function closeAllModals() {
    closeNotes();
    closeOverview();
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  // --------------------------------------------------------------------------
  // 8. 90-MINUTE AGENDA LIVE ACTIVITY TIMER
  // --------------------------------------------------------------------------
  function initTimer() {
    const toggleBtn = document.getElementById('timer-toggle-btn');
    const resetBtn = document.getElementById('timer-reset-btn');

    if (toggleBtn) toggleBtn.addEventListener('click', toggleTimer);
    if (resetBtn) resetBtn.addEventListener('click', resetTimer);
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
    timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function updateTimerIcon(running) {
    const iconSvg = document.getElementById('timer-icon');
    if (!iconSvg) return;

    if (running) {
      iconSvg.innerHTML = `<rect x="3" y="3" width="4" height="10" rx="1"/><rect x="9" y="3" width="4" height="10" rx="1"/>`;
    } else {
      iconSvg.innerHTML = `<path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>`;
    }
  }

  function updateSegmentByTimer() {
    const segmentEl = document.getElementById('current-segment-name');
    if (!segmentEl) return;

    const mins = Math.floor(elapsedSeconds / 60);
    let segText = '';

    if (mins < 10) {
      segText = isKhmerActive ? 'វគ្គ ១៖ ការស្វាគមន៍ & រំលឹកចំណេះដឹង (10 នាទី)' : 'Part 1: Recall & Connect (10m)';
    } else if (mins < 25) {
      segText = isKhmerActive ? 'វគ្គ ២៖ ស្វែងយល់ពីមូលហេតុ (15 នាទី)' : 'Part 2: Discover (The Why) (15m)';
    } else if (mins < 45) {
      segText = isKhmerActive ? 'វគ្គ ៣៖ ស្ថាបត្យកម្មអេក្រង់ (20 នាទី)' : 'Part 3: Guided Architecture (20m)';
    } else if (mins < 65) {
      segText = isKhmerActive ? 'វគ្គ ៤៖ បន្ទប់ពិសោធន៍អន្តរកម្ម (20 នាទី)' : 'Part 4: Interactive Lab (20m)';
    } else if (mins < 80) {
      segText = isKhmerActive ? 'វគ្គ ៥៖ ការអនុវត្តជាមួយគ្រូ (15 នាទី)' : 'Part 5: Guided Practice (15m)';
    } else {
      segText = isKhmerActive ? 'វគ្គ ៦៖ វាយតម្លៃ & ស្ពានបន្ត (10 នាទី)' : 'Part 6: Assess & Bridge (10m)';
    }

    segmentEl.textContent = segText;
  }

  // --------------------------------------------------------------------------
  // 9. PRESENTER NOTES DRAWER
  // --------------------------------------------------------------------------
  function initNotesDrawer() {
    const closeBtn = document.getElementById('notes-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeNotes);
  }

  function toggleNotes() {
    const drawer = document.getElementById('notes-drawer');
    if (drawer) {
      drawer.classList.toggle('open');
      if (drawer.classList.contains('open')) {
        updateNotesContent();
      }
    }
  }

  function closeNotes() {
    const drawer = document.getElementById('notes-drawer');
    if (drawer) drawer.classList.remove('open');
  }

  function updateNotesContent() {
    const contentEl = document.getElementById('notes-content');
    if (!contentEl) return;

    const currentSlide = slides[currentSlideIndex];
    if (!currentSlide) return;

    const asideEl = currentSlide.querySelector('aside.trainer-notes');
    if (asideEl) {
      contentEl.innerHTML = asideEl.innerHTML;
    } else {
      contentEl.innerHTML = `<p><em>No presenter notes recorded for Slide ${currentSlideIndex + 1}.</em></p>`;
    }
  }

  // --------------------------------------------------------------------------
  // 10. SLIDE OVERVIEW GRID NAVIGATOR (24 CARDS)
  // --------------------------------------------------------------------------
  function initOverviewGrid() {
    const closeBtn = document.getElementById('overview-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeOverview);
    renderOverviewCards();
  }

  function toggleOverview() {
    const modal = document.getElementById('overview-modal');
    if (modal) {
      modal.classList.toggle('open');
      if (modal.classList.contains('open')) {
        updateOverviewActiveCard();
      }
    }
  }

  function closeOverview() {
    const modal = document.getElementById('overview-modal');
    if (modal) modal.classList.remove('open');
  }

  function renderOverviewCards() {
    const grid = document.getElementById('overview-grid');
    if (!grid) return;

    grid.innerHTML = '';
    slides.forEach((slide, idx) => {
      const card = document.createElement('div');
      card.className = `overview-card ${idx === currentSlideIndex ? 'active' : ''}`;
      card.dataset.index = idx;

      const titleEn = slide.getAttribute('data-title') || `Slide ${idx + 1}`;
      const titleKh = KHMER_SLIDES[idx] ? KHMER_SLIDES[idx].title : titleEn;
      const displayTitle = isKhmerActive ? titleKh : titleEn;

      card.innerHTML = `
        <span class="overview-card-num">${String(idx + 1).padStart(2, '0')}</span>
        <span class="overview-card-title">${displayTitle}</span>
      `;

      card.addEventListener('click', () => {
        goToSlide(idx);
        closeOverview();
      });

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
  // 11. PRESENTER LASER POINTER & CLICK RIPPLE ENGINE
  // --------------------------------------------------------------------------
  function initLaserPointer() {
    const pointerDot = document.getElementById('presenter-pointer');
    const rippleEl = document.getElementById('pointer-click-ripple');

    document.body.classList.toggle('laser-mode', isLaserActive);
    const laserBtn = document.getElementById('laser-toggle-btn') || document.getElementById('btn-laser');
    if (laserBtn) {
      laserBtn.style.color = isLaserActive ? '#ff4d4d' : 'var(--text-muted)';
      laserBtn.classList.toggle('active-tool', isLaserActive);
    }

    // Dynamic mouse tracking for both the Teacher Laser & Stage Ambient Spotlight
    window.addEventListener('mousemove', (e) => {
      // Update ambient spotlight CSS variables on root
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

  function toggleLaserPointer() {
    isLaserActive = !isLaserActive;
    document.body.classList.toggle('laser-mode', isLaserActive);

    const laserBtn = document.getElementById('laser-toggle-btn') || document.getElementById('btn-laser');
    if (laserBtn) {
      laserBtn.style.color = isLaserActive ? '#ff3b30' : 'var(--text-muted)';
    }
  }

  // --------------------------------------------------------------------------
  // 12. INTERACTIVE WIDGET 1: TASK-TO-SCREEN ARCHITECT
  // --------------------------------------------------------------------------
  
  // --------------------------------------------------------------------------
  // RETRIEVAL CARDS HANDLER (Slide 5)
  // --------------------------------------------------------------------------
  function initRetrievalCards() {
    const revealBtns = document.querySelectorAll('.ret-reveal-btn');
    revealBtns.forEach((btn) => {
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);

      newBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetId = newBtn.getAttribute('data-target');
        const ansEl = document.getElementById(targetId);
        if (!ansEl) return;

        const isRevealed = ansEl.classList.contains('revealed');
        ansEl.classList.toggle('revealed');

        if (isRevealed) {
          newBtn.textContent = isKhmerActive ? 'បង្ហាញចម្លើយ' : 'Reveal Answer';
        } else {
          newBtn.textContent = isKhmerActive ? 'លាក់ចម្លើយ' : 'Hide Answer';
        }
      });
    });

    const cards = document.querySelectorAll('.retrieval-card');
    cards.forEach((card) => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('button')) return;
        const btn = card.querySelector('.ret-reveal-btn');
        if (btn) btn.click();
      });
    });
  }

  function initWorkbench() {
    const roleSelect = document.getElementById('wb-user-role') || document.getElementById('wb-role-selector');
    const taskSelect = document.getElementById('wb-human-task');

    if (!roleSelect || !taskSelect) return;

    // Remove existing event listeners by replacing with clones
    const newRoleSelect = roleSelect.cloneNode(true);
    roleSelect.parentNode.replaceChild(newRoleSelect, roleSelect);

    const newTaskSelect = taskSelect.cloneNode(true);
    taskSelect.parentNode.replaceChild(newTaskSelect, taskSelect);

    newRoleSelect.addEventListener('change', () => {
      populateTasksForRole(newRoleSelect.value);
      updateWorkbenchBlueprint();
    });

    newTaskSelect.addEventListener('change', () => {
      updateWorkbenchBlueprint();
    });

    // Initial population
    populateTasksForRole(newRoleSelect.value);
    updateWorkbenchBlueprint();
  }

  function populateTasksForRole(roleKey) {
    const taskSelect = document.getElementById('wb-human-task');
    if (!taskSelect) return;

    taskSelect.innerHTML = '';
    const roleObj = WORKBENCH_DATA[roleKey] || WORKBENCH_DATA.operator;

    roleObj.tasks.forEach((t) => {
      const opt = document.createElement('option');
      opt.value = t.id;
      opt.textContent = isKhmerActive ? t.titleKh : t.titleEn;
      taskSelect.appendChild(opt);
    });
  }

  function updateWorkbenchBlueprint() {
    const roleSelect = document.getElementById('wb-user-role') || document.getElementById('wb-role-selector');
    const taskSelect = document.getElementById('wb-human-task');
    const scrNameEl = document.getElementById('wb-screen-name');
    const layoutEl = document.getElementById('wb-layout-type');
    const inputsEl = document.getElementById('wb-input-controls');
    const displaysEl = document.getElementById('wb-display-controls');
    const actionsEl = document.getElementById('wb-action-controls');
    const powerFxEl = document.getElementById('wb-screen-powerfx');

    if (!roleSelect || !taskSelect || !scrNameEl) return;

    const roleKey = roleSelect.value;
    const taskId = taskSelect.value;
    const roleObj = WORKBENCH_DATA[roleKey] || WORKBENCH_DATA.operator;
    const taskObj = roleObj.tasks.find((t) => t.id === taskId) || roleObj.tasks[0];

    scrNameEl.value = taskObj.screenName;
    layoutEl.value = isKhmerActive ? taskObj.archetypeKh : taskObj.archetypeEn;
    inputsEl.textContent = isKhmerActive ? taskObj.inputsKh : taskObj.inputsEn;
    displaysEl.textContent = isKhmerActive ? taskObj.displaysKh : taskObj.displaysEn;
    actionsEl.textContent = isKhmerActive ? taskObj.actionsKh : taskObj.actionsEn;
    powerFxEl.textContent = taskObj.powerFx;
  }

  // --------------------------------------------------------------------------
  // 13. INTERACTIVE WIDGET 2: 6-SCENARIO SIMULATOR
  // --------------------------------------------------------------------------
  function initSimulator() {
    renderSimulatorScenario();

    const prevBtn = document.getElementById('sim-prev-btn');
    const nextBtn = document.getElementById('sim-next-btn');

    if (prevBtn) {
      const newPrev = prevBtn.cloneNode(true);
      prevBtn.parentNode.replaceChild(newPrev, prevBtn);
      newPrev.addEventListener('click', () => {
        if (currentSimIndex > 0) {
          currentSimIndex--;
          renderSimulatorScenario();
        }
      });
    }

    if (nextBtn) {
      const newNext = nextBtn.cloneNode(true);
      nextBtn.parentNode.replaceChild(newNext, nextBtn);
      newNext.addEventListener('click', () => {
        if (currentSimIndex < SIMULATOR_SCENARIOS.length - 1) {
          currentSimIndex++;
          renderSimulatorScenario();
        }
      });
    }

    bindSimulatorChoiceButtons();
  }

  function bindSimulatorChoiceButtons() {
    const choiceButtons = document.querySelectorAll('.sim-choice-btn');
    choiceButtons.forEach((btn) => {
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);

      newBtn.addEventListener('click', () => {
        const choice = newBtn.getAttribute('data-choice');
        handleSimulatorAnswer(choice, newBtn);
      });
    });
  }

  function renderSimulatorScenario() {
    const progressEl = document.getElementById('sim-progress-text');
    const scoreEl = document.getElementById('sim-score');
    const badgeEl = document.getElementById('sim-scenario-num');
    const titleEl = document.getElementById('sim-scenario-title');
    const descEl = document.getElementById('sim-scenario-desc');
    const feedbackEl = document.getElementById('sim-feedback');
    const prevBtn = document.getElementById('sim-prev-btn');
    const nextBtn = document.getElementById('sim-next-btn');

    const sc = SIMULATOR_SCENARIOS[currentSimIndex];
    if (!sc) return;

    if (progressEl) {
      progressEl.textContent = isKhmerActive
        ? `ស្ថានភាពទី ${currentSimIndex + 1} នៃ ${SIMULATOR_SCENARIOS.length}`
        : `Scenario ${currentSimIndex + 1} of ${SIMULATOR_SCENARIOS.length}`;
    }

    if (scoreEl) {
      scoreEl.textContent = String(simScore);
    }

    if (badgeEl) {
      badgeEl.textContent = isKhmerActive ? `ស្ថានភាពទី ${currentSimIndex + 1}` : sc.num;
    }

    if (titleEl) {
      titleEl.textContent = isKhmerActive ? sc.titleKh : sc.titleEn;
    }

    if (descEl) {
      descEl.textContent = isKhmerActive ? sc.descKh : sc.descEn;
    }

    if (feedbackEl) {
      feedbackEl.style.display = 'none';
      feedbackEl.className = 'sim-feedback-box';
      feedbackEl.innerHTML = '';
    }

    if (prevBtn) {
      prevBtn.disabled = currentSimIndex === 0;
    }

    if (nextBtn) {
      nextBtn.disabled = currentSimIndex === SIMULATOR_SCENARIOS.length - 1;
    }

    // Reset button states
    const choiceButtons = document.querySelectorAll('.sim-choice-btn');
    choiceButtons.forEach((btn) => {
      btn.classList.remove('selected', 'correct', 'incorrect');
    });
  }

  function handleSimulatorAnswer(choice, clickedBtn) {
    const sc = SIMULATOR_SCENARIOS[currentSimIndex];
    const feedbackEl = document.getElementById('sim-feedback');
    const scoreEl = document.getElementById('sim-score');

    const choiceButtons = document.querySelectorAll('.sim-choice-btn');
    choiceButtons.forEach((btn) => btn.classList.remove('selected', 'correct', 'incorrect'));

    clickedBtn.classList.add('selected');

    if (choice === sc.correctChoice) {
      clickedBtn.classList.add('correct');
      if (!simAnswered[currentSimIndex]) {
        simAnswered[currentSimIndex] = true;
        simScore++;
        if (scoreEl) scoreEl.textContent = String(simScore);
      }

      if (feedbackEl) {
        feedbackEl.style.display = 'block';
        feedbackEl.className = 'sim-feedback-box success-feedback';
        feedbackEl.innerHTML = `<strong>${isKhmerActive ? 'ត្រឹមត្រូវ!' : 'Correct!'}</strong> ${isKhmerActive ? sc.feedbackKh : sc.feedbackEn}`;
      }
    } else {
      clickedBtn.classList.add('incorrect');
      if (feedbackEl) {
        feedbackEl.style.display = 'block';
        feedbackEl.className = 'sim-feedback-box error-feedback';
        feedbackEl.innerHTML = `<strong>${isKhmerActive ? 'មិនទាន់ត្រឹមត្រូវ!' : 'Incorrect Archetype!'}</strong> ${isKhmerActive ? 'ចូរពិចារណាលើតម្រូវការចម្បងរបស់អ្នកប្រើប្រាស់ឡើងវិញ។ តើគាត់ត្រូវការបញ្ជាម៉ាស៊ីន, ពិនិត្យមើលបញ្ជី, ឬកត់ត្រាជួសជុល?' : 'Consider what the user primarily needs to do in this task. Try choosing another archetype.'}`;
      }
    }
  }

  // --------------------------------------------------------------------------
  // 14. INTERACTIVE WIDGET 3: 5-QUESTION KNOWLEDGE CHECK QUIZ
  // --------------------------------------------------------------------------
  function initQuiz() {
    renderQuizQuestion();

    const prevBtn = document.getElementById('quiz-prev-btn');
    const nextBtn = document.getElementById('quiz-next-btn');

    if (prevBtn) {
      const newPrev = prevBtn.cloneNode(true);
      prevBtn.parentNode.replaceChild(newPrev, prevBtn);
      newPrev.addEventListener('click', () => {
        if (currentQuizIndex > 0) {
          currentQuizIndex--;
          renderQuizQuestion();
        }
      });
    }

    if (nextBtn) {
      const newNext = nextBtn.cloneNode(true);
      nextBtn.parentNode.replaceChild(newNext, nextBtn);
      newNext.addEventListener('click', () => {
        if (currentQuizIndex < QUIZ_QUESTIONS.length - 1) {
          currentQuizIndex++;
          renderQuizQuestion();
        }
      });
    }
  }

  function renderQuizQuestion() {
    const counterEl = document.getElementById('quiz-question-counter');
    const scoreEl = document.getElementById('quiz-score-display');
    const titleEl = document.getElementById('quiz-title');
    const optionsGrid = document.getElementById('quiz-options');
    const feedbackEl = document.getElementById('quiz-feedback');
    const prevBtn = document.getElementById('quiz-prev-btn');
    const nextBtn = document.getElementById('quiz-next-btn');

    const q = QUIZ_QUESTIONS[currentQuizIndex];
    if (!q || !optionsGrid) return;

    if (counterEl) {
      counterEl.textContent = isKhmerActive
        ? `សំណួរទី ${currentQuizIndex + 1} នៃ ${QUIZ_QUESTIONS.length}`
        : `Question ${currentQuizIndex + 1} of ${QUIZ_QUESTIONS.length}`;
    }

    if (scoreEl) {
      scoreEl.textContent = String(quizScore);
    }

    if (titleEl) {
      titleEl.textContent = isKhmerActive ? q.titleKh : q.titleEn;
    }

    if (feedbackEl) {
      feedbackEl.style.display = 'none';
      feedbackEl.className = 'quiz-feedback-box';
      feedbackEl.innerHTML = '';
    }

    if (prevBtn) prevBtn.disabled = currentQuizIndex === 0;
    if (nextBtn) nextBtn.disabled = currentQuizIndex === QUIZ_QUESTIONS.length - 1;

    optionsGrid.innerHTML = '';
    const options = isKhmerActive ? q.optionsKh : q.optionsEn;

    options.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.textContent = optText;

      btn.addEventListener('click', () => {
        handleQuizAnswer(optIdx, btn);
      });

      optionsGrid.appendChild(btn);
    });
  }

  function handleQuizAnswer(selectedIdx, clickedBtn) {
    const q = QUIZ_QUESTIONS[currentQuizIndex];
    const feedbackEl = document.getElementById('quiz-feedback');
    const scoreEl = document.getElementById('quiz-score-display');
    const allButtons = document.querySelectorAll('.quiz-opt-btn');

    allButtons.forEach((b) => b.disabled = true);

    if (selectedIdx === q.correctIndex) {
      clickedBtn.classList.add('correct');
      if (!quizAnswered[currentQuizIndex]) {
        quizAnswered[currentQuizIndex] = true;
        quizScore++;
        if (scoreEl) scoreEl.textContent = String(quizScore);
      }

      if (feedbackEl) {
        feedbackEl.style.display = 'block';
        feedbackEl.className = 'quiz-feedback-box correct';
        feedbackEl.innerHTML = `<strong>${isKhmerActive ? 'ត្រឹមត្រូវ!' : 'Correct!'}</strong> ${isKhmerActive ? q.explanationKh : q.explanationEn}`;
      }
    } else {
      clickedBtn.classList.add('incorrect');
      if (allButtons[q.correctIndex]) {
        allButtons[q.correctIndex].classList.add('correct');
      }

      if (feedbackEl) {
        feedbackEl.style.display = 'block';
        feedbackEl.className = 'quiz-feedback-box incorrect';
        feedbackEl.innerHTML = `<strong>${isKhmerActive ? 'មិនត្រឹមត្រូវ!' : 'Incorrect!'}</strong> ${isKhmerActive ? q.explanationKh : q.explanationEn}`;
      }
    }
  }

  // --------------------------------------------------------------------------
  // 15. INTERACTIVE WIDGET 4: CAPSTONE BENCHMARK SOLUTION & RUBRIC
  // --------------------------------------------------------------------------
  function initCapstoneSolution() {
    const revealBtn = document.getElementById('btn-reveal-solution');
    const drawer = document.getElementById('solution-content');
    const btnText = document.getElementById('solution-btn-text');
    const btnIcon = document.getElementById('solution-btn-icon');

    if (!revealBtn || !drawer) return;

    const newBtn = revealBtn.cloneNode(true);
    revealBtn.parentNode.replaceChild(newBtn, revealBtn);

    newBtn.addEventListener('click', () => {
      const isCollapsed = drawer.classList.contains('collapsed');
      drawer.classList.toggle('collapsed');

      const updatedText = document.getElementById('solution-btn-text');
      const updatedIcon = document.getElementById('solution-btn-icon');

      if (isCollapsed) {
        if (updatedIcon) updatedIcon.textContent = '🔒';
        if (updatedText) updatedText.textContent = isKhmerActive ? 'លាក់ម៉ាទ្រីសដំណោះស្រាយគំរូ' : 'Hide Benchmark Wireframe Matrix';
      } else {
        if (updatedIcon) updatedIcon.textContent = '👁️';
        if (updatedText) updatedText.textContent = isKhmerActive ? 'បង្ហាញម៉ាទ្រីសដំណោះស្រាយគំរូ' : 'Reveal Benchmark Wireframe Matrix';
      }
    });
  }

  // --------------------------------------------------------------------------
  // 16. BOOTSTRAP WHEN DOM READY
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
  window.toggleLaser = toggleLaserPointer;

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
