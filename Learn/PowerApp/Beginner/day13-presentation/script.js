/* ============================================================================
   POWER APPS FOUNDATION: DAY 13 PRESENTATION ENGINE
   Topic: Power Apps Studio: Map Design to Controls
   Phase: Phase 5: Canvas Studio Implementation
   Bilingual: English + Khmer (100% Exact 1-to-1 DOM Class Matching)
   ============================================================================ */

(function () {
  'use strict';

  // Global State
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
  // 1. WIDGET 1 DATA: WIREFRAME TO STUDIO CONTROL MAPPER
  // --------------------------------------------------------------------------
  const MAPPER_DATA = {
    app_header: {
      controlTypeEn: "Horizontal Container + Label + Icon",
      controlTypeKh: "Horizontal Container + Label + Icon",
      controlName: "conHeader / lblHeaderTitle / icnAppLogo",
      familyEn: "Display & Structural Container",
      familyKh: "កុងតឺន័ររចនាសម្ព័ន្ធ & បង្ហាញព័ត៌មាន",
      parentContainer: "scrNewRequest",
      descEn: "Top dark navigation banner establishing branding and screen context.",
      descKh: "របារពណ៌ងងឹតខាងលើសម្រាប់កំណត់ស្លាកសញ្ញារោងចក្រ និងបរិបទនៃអេក្រង់។",
      propertiesEn: `conHeader.Height = 60
conHeader.Fill = RGBA(9, 13, 22, 1)
lblHeaderTitle.Text = "Apex Plastics — Incident Intake"
lblHeaderTitle.Color = RGBA(255, 255, 255, 1)
lblHeaderTitle.Size = 16`,
      propertiesKh: `conHeader.Height = 60
conHeader.Fill = RGBA(9, 13, 22, 1)
lblHeaderTitle.Text = "Apex Plastics — កត់ត្រាសំណើជួសជុល"
lblHeaderTitle.Color = RGBA(255, 255, 255, 1)
lblHeaderTitle.Size = 16`
    },
    machine_picker: {
      controlTypeEn: "Dropdown Control (`drp`)",
      controlTypeKh: "Dropdown Control (`drp`)",
      controlName: "drpMachineSelect",
      familyEn: "Input Control (Restricts User to Approved Choices)",
      familyKh: "Input Control (កំណត់ឱ្យរើសតែជម្រើសដែលបានអនុម័ត)",
      parentContainer: "conFormBody",
      descEn: "Restricted choice menu allowing operators to pick exactly one molding machine.",
      descKh: "ម៉ឺនុយជម្រើសមានកំណត់ដែលអនុញ្ញាតឱ្យកម្មករជ្រើសរើសម៉ាស៊ីនចាក់ពុម្ពតែមួយគត់។",
      propertiesEn: `drpMachineSelect.Items = ["Press-01", "Press-02", "Press-03", "Press-04"]
drpMachineSelect.Default = "Press-01"
drpMachineSelect.Visible = true
drpMachineSelect.DisplayMode = DisplayMode.Edit`,
      propertiesKh: `drpMachineSelect.Items = ["Press-01", "Press-02", "Press-03", "Press-04"]
drpMachineSelect.Default = "Press-01"
drpMachineSelect.Visible = true
drpMachineSelect.DisplayMode = DisplayMode.Edit`
    },
    urgency_level: {
      controlTypeEn: "Dropdown / Radio Control (`drp` / `rad`)",
      controlTypeKh: "Dropdown / Radio Control (`drp` / `rad`)",
      controlName: "drpUrgencyLevel",
      familyEn: "Input Control (Severity Classifier)",
      familyKh: "Input Control (ចាត់ថ្នាក់កម្រិតបន្ទាន់)",
      parentContainer: "conFormBody",
      descEn: "Standardized severity levels determining technician dispatch priority.",
      descKh: "កម្រិតបន្ទាន់ស្តង់ដារសម្រាប់កំណត់អាទិភាពបញ្ជូនជាងបច្ចេកទេសទៅជួសជុល។",
      propertiesEn: `drpUrgencyLevel.Items = ["Low", "Medium", "High", "Critical"]
drpUrgencyLevel.Default = "Medium"
drpUrgencyLevel.AllowEmptySelection = false`,
      propertiesKh: `drpUrgencyLevel.Items = ["ទាប (Low)", "មធ្យម (Medium)", "ខ្ពស់ (High)", "បន្ទាន់បំផុត (Critical)"]
drpUrgencyLevel.Default = "មធ្យម (Medium)"
drpUrgencyLevel.AllowEmptySelection = false`
    },
    incident_desc: {
      controlTypeEn: "Text Input Control (`txt`)",
      controlTypeKh: "Text Input Control (`txt`)",
      controlName: "txtIncidentDescription",
      familyEn: "Input Control (Multi-Line User Notes)",
      familyKh: "Input Control (កត់ត្រាអត្ថបទច្រើនបន្ទាត់)",
      parentContainer: "conFormBody",
      descEn: "Expandable text field for operators to describe noises, pressure drops, or leaks.",
      descKh: "ប្រអប់អត្ថបទពង្រីកបានសម្រាប់កម្មករពិពណ៌នាពីសូរសំឡេង ការធ្លាក់សម្ពាធ ឬការលេចធ្លាយ។",
      propertiesEn: `txtIncidentDescription.Mode = TextMode.MultiLine
txtIncidentDescription.Height = 120
txtIncidentDescription.HintText = "Describe unusual sounds, pressure drops, or leaks..."
txtIncidentDescription.ClearButton = true`,
      propertiesKh: `txtIncidentDescription.Mode = TextMode.MultiLine
txtIncidentDescription.Height = 120
txtIncidentDescription.HintText = "រៀបរាប់ពីសូរសំឡេងចម្លែក ការធ្លាក់សម្ពាធ ឬការលេចធ្លាយប្រេង..."
txtIncidentDescription.ClearButton = true`
    },
    report_date: {
      controlTypeEn: "Date Picker Control (`dtp`)",
      controlTypeKh: "Date Picker Control (`dtp`)",
      controlName: "dtpIncidentDate",
      familyEn: "Input Control (Calendar / Timestamp)",
      familyKh: "Input Control (ប្រតិទិន / កាលបរិច្ឆេទ)",
      parentContainer: "conFormBody",
      descEn: "Auto-populating date selector anchored to current shift date.",
      descKh: "ប្រអប់ជ្រើសរើសកាលបរិច្ឆេទដោយស្វ័យប្រវត្តដែលភ្ជាប់ទៅកាន់វេនការងារបច្ចុប្បន្ន។",
      propertiesEn: `dtpIncidentDate.DefaultDate = Today()
dtpIncidentDate.Format = DateTimeFormat.ShortDate
dtpIncidentDate.DisplayMode = DisplayMode.View // Locked to today`,
      propertiesKh: `dtpIncidentDate.DefaultDate = Today()
dtpIncidentDate.Format = DateTimeFormat.ShortDate
dtpIncidentDate.DisplayMode = DisplayMode.View // ចាក់សោត្រឹមកាលបរិច្ឆេទថ្ងៃនេះ`
    },
    submit_action: {
      controlTypeEn: "Button Control (`btn`)",
      controlTypeKh: "Button Control (`btn`)",
      controlName: "btnSubmitTicket",
      familyEn: "Action Control (Submits Record & Triggers Feedback)",
      familyKh: "Action Control (រក្សាទុកទិន្នន័យ & ផ្តល់ដំណឹង)",
      parentContainer: "conActions",
      descEn: "Primary high-contrast button that saves data and returns user to Home.",
      descKh: "ប៊ូតុងបញ្ជាចម្បងពណ៌ច្បាស់សម្រាប់រក្សាទុកទិន្នន័យ និងនាំអ្នកប្រើប្រាស់ទៅកាន់ទំព័រដើម។",
      propertiesEn: `btnSubmitTicket.Text = "Submit Maintenance Ticket"
btnSubmitTicket.Fill = RGBA(16, 124, 65, 1) // Fluent Green
btnSubmitTicket.DisplayMode = If(IsBlank(txtIncidentDescription.Text), DisplayMode.Disabled, DisplayMode.Edit)
btnSubmitTicket.OnSelect = SubmitForm(frmNewRequest); Notify("Ticket Created!", Success); Navigate(scrHome)`,
      propertiesKh: `btnSubmitTicket.Text = "បញ្ជូនប័ណ្ណជួសជុល"
btnSubmitTicket.Fill = RGBA(16, 124, 65, 1) // ពណ៌បៃតង Fluent
btnSubmitTicket.DisplayMode = If(IsBlank(txtIncidentDescription.Text), DisplayMode.Disabled, DisplayMode.Edit)
btnSubmitTicket.OnSelect = SubmitForm(frmNewRequest); Notify("បង្កើតប័ណ្ណជោគជ័យ!", Success); Navigate(scrHome)`
    },
    cancel_action: {
      controlTypeEn: "Button / Icon Control (`btn` / `icn`)",
      controlTypeKh: "Button / Icon Control (`btn` / `icn`)",
      controlName: "btnCancel",
      familyEn: "Action Control (Safe Escape Hatch)",
      familyKh: "Action Control (ផ្លូវចាកចេញដោយសុវត្ថិភាព)",
      parentContainer: "conActions",
      descEn: "Secondary action allowing user to safely discard changes without saving.",
      descKh: "សកម្មភាពបន្ទាប់បន្សំដែលអនុញ្ញាតឱ្យអ្នកប្រើប្រាស់បោះបង់ការផ្លាស់ប្តូរដោយមិនរក្សាទុក។",
      propertiesEn: `btnCancel.Text = "Cancel"
btnCancel.Fill = Transparent
btnCancel.BorderColor = RGBA(255, 255, 255, 0.3)
btnCancel.OnSelect = ResetForm(frmNewRequest); Back(ScreenTransition.Fade)`,
      propertiesKh: `btnCancel.Text = "បោះបង់"
btnCancel.Fill = Transparent
btnCancel.BorderColor = RGBA(255, 255, 255, 0.3)
btnCancel.OnSelect = ResetForm(frmNewRequest); Back(ScreenTransition.Fade)`
    }
  };

  // --------------------------------------------------------------------------
  // 2. WIDGET 2 DATA: STUDIO PROPERTY DIAGNOSTIC SIMULATOR (6 SCENARIOS)
  // --------------------------------------------------------------------------
  let currentSimIndex = 0;
  let simScore = 0;
  const simAnswered = [false, false, false, false, false, false];

  const SIMULATOR_SCENARIOS = [
    {
      num: "Scenario 1 of 6",
      titleEn: "1. The Grayed-Out Submit Button",
      titleKh: "១. បញ្ហាប៊ូតុង Submit ពណ៌ប្រផេះមិនអាចចុចបាន",
      descEn: "Operator Bopha filled in all fields, but `btnSubmit` remains grayed out and cannot be tapped. Which property controls whether a button is active or disabled?",
      descKh: "បុគ្គលិកបុប្ផាបានបំពេញគ្រប់ប្រអប់ ប៉ុន្តែប៊ូតុង `btnSubmit` នៅតែមានពណ៌ប្រផេះ និងចុចមិនកើត។ តើ Property មួយណាជាអ្នកគ្រប់គ្រងថាប៊ូតុងអាចចុចបាន ឬមិនបាន?",
      correctChoice: "DisplayMode",
      feedbackEn: "DisplayMode controls whether a control is in Edit (clickable), Disabled (grayed out), or View (read-only) mode!",
      feedbackKh: "ត្រឹមត្រូវ! DisplayMode ជាអ្នកកំណត់ថាតើ Control ស្ថិតក្នុងស្ថានភាព Edit (ចុចបាន), Disabled (បិទ/ប្រផេះ), ឬ View (សម្រាប់តែមើល)!"
    },
    {
      num: "Scenario 2 of 6",
      titleEn: "2. The Invisible Field on Mobile",
      titleKh: "២. ប្រអប់ទិន្នន័យបាត់ស្រមោលលើទូរស័ព្ទ",
      descEn: "A supervisor needs an 'Approval Code' input that should only appear if Urgency is Critical. Which property hides or reveals an entire control?",
      descKh: "ប្រធានផ្នែកត្រូវការប្រអប់ 'កូដអនុម័ត' ដែលគួរតែបង្ហាញឡើងតែពេលកម្រិតបន្ទាន់ជា Critical ប៉ុណ្ណោះ។ តើ Property មួយណាសម្រាប់លាក់ ឬបង្ហាញ Control ទាំងមូល?",
      correctChoice: "Visible",
      feedbackEn: "Visible accepts a true or false boolean value to show or hide the control entirely from the canvas!",
      feedbackKh: "ត្រឹមត្រូវ! Visible ទទួលតម្លៃ Boolean (true ឬ false) ដើម្បីបង្ហាញ ឬលាក់ Control ទាំងស្រុងចេញពីផ្ទាំង Canvas!"
    },
    {
      num: "Scenario 3 of 6",
      titleEn: "3. The Empty Machine Dropdown",
      titleKh: "៣. ប្រអប់ Dropdown ម៉ាស៊ីននៅទទេស្អាត",
      descEn: "The citizen developer inserted `drpMachineSelect`, but clicking it shows a blank list with no options. Which property feeds data choices into a Dropdown?",
      descKh: "អ្នកអភិវឌ្ឍន៍បានដាក់បញ្ចូល `drpMachineSelect` ប៉ុន្តែពេលចុចលើវា បែរជាគ្មានជម្រើសអ្វីសោះ។ តើ Property មួយណាជាអ្នកផ្តល់ទិន្នន័យជម្រើសទៅកាន់ Dropdown?",
      correctChoice: "Items",
      feedbackEn: "The Items property holds the table, collection, or array of options that populate the dropdown list!",
      feedbackKh: "ត្រឹមត្រូវ! Items ជា Property ដែលផ្ទុកតារាង Collection ឬ Array នៃជម្រើសទាំងអស់សម្រាប់បង្ហាញក្នុង Dropdown!"
    },
    {
      num: "Scenario 4 of 6",
      titleEn: "4. The Missing Description Placeholder",
      titleKh: "៤. ការបាត់អក្សរណែនាំក្នុងប្រអប់កំណត់ចំណាំ",
      descEn: "Operators don't know what to write in the description box. You want light gray guidance text that vanishes when they start typing. Which property is this?",
      descKh: "កម្មករមិនដឹងថាត្រូវសរសេរអ្វីក្នុងប្រអប់ពណ៌នាឡើយ។ អ្នកចង់ដាក់អក្សរណែនាំពណ៌ប្រផេះដែលនឹងបាត់ទៅវិញពេលពួកគេចាប់ផ្តើមវាយអក្សរ។ តើជា Property មួយណា?",
      correctChoice: "HintText",
      feedbackEn: "HintText provides non-destructive placeholder instructions inside text inputs without creating fake data!",
      feedbackKh: "ត្រឹមត្រូវ! HintText ផ្តល់នូវអត្ថបទណែនាំបណ្តោះអាសន្នក្នុងប្រអប់បញ្ចូល ដោយមិនបង្កើតជាទិន្នន័យក្លែងក្លាយឡើយ!"
    },
    {
      num: "Scenario 5 of 6",
      titleEn: "5. The Single-Line Description Bug",
      titleKh: "៥. កំហុសអត្ថបទវែងកាត់ដាច់ត្រឹមមួយជួរ",
      descEn: "When an operator writes a 3-sentence incident report, pressing Enter submits the form and cuts off the text. Which property expands input to multiple lines?",
      descKh: "នៅពេលកម្មករបញ្ចូលកំណត់ចំណាំ ៣ បន្ទាត់ ការចុច Enter បែរជាបញ្ជូន Form ហើយកាត់ដាច់អត្ថបទ។ តើ Property មួយណាសម្រាប់ពង្រីកប្រអប់ឱ្យសរសេរបានច្រើនបន្ទាត់?",
      correctChoice: "Mode",
      feedbackEn: "Setting Mode = TextMode.MultiLine allows free-form paragraphs and multiline return keys!",
      feedbackKh: "ត្រឹមត្រូវ! ការកំណត់ Mode = TextMode.MultiLine អនុញ្ញាតឱ្យសរសេរកថាខណ្ឌ និងចុះបន្ទាត់បានយ៉ាងទូលាយ!"
    },
    {
      num: "Scenario 6 of 6",
      titleEn: "6. The Trapped User on Cancel",
      titleKh: "៦. អ្នកប្រើប្រាស់ជាប់គាំងពេលចុច Cancel",
      descEn: "An operator opened the incident screen by mistake and clicked 'Cancel', but nothing happened. Which property holds the formula executed when clicking?",
      descKh: "កម្មករបានច្រឡំចូលកាន់អេក្រង់ ហើយចុច 'Cancel' តែគ្មានអ្វីកើតឡើងសោះ។ តើ Property មួយណាជាអ្នកផ្ទុករូបមន្តដែលត្រូវដំណើរការពេលមានការចុច Click?",
      correctChoice: "OnSelect",
      feedbackEn: "OnSelect is the primary action trigger property that executes Power Fx formulas like Back() or SubmitForm()!",
      feedbackKh: "ត្រឹមត្រូវ! OnSelect គឺជា Property ស្នូលសម្រាប់ដំណើរការរូបមន្ត Power Fx ដូចជា Back() ឬ SubmitForm() នៅពេលមានការចុច!"
    }
  ];

  // --------------------------------------------------------------------------
  // 3. WIDGET 3 DATA: 5-QUESTION EVALUATIVE KNOWLEDGE CHECK QUIZ
  // --------------------------------------------------------------------------
  let currentQuizIndex = 0;
  let quizScore = 0;
  const quizAnswered = [false, false, false, false, false];

  const QUIZ_QUESTIONS = [
    {
      titleEn: "1. Which visual zone in Power Apps Studio shows the true architectural parent-child hierarchy and layer order of all screen controls?",
      titleKh: "១. តើតំបន់មួយណាក្នុង Power Apps Studio ដែលបង្ហាញពីស្ថាបត្យកម្មលំដាប់ថ្នាក់មេ-កូន និងលំដាប់ជាន់ពិតប្រាកដនៃ Controls ទាំងអស់?",
      optionsEn: [
        "A) The Properties Inspector on the right panel",
        "B) The Tree View on the left panel",
        "C) The Command Ribbon at the top",
        "D) The Canvas Stage in the center"
      ],
      optionsKh: [
        "A) ផ្ទាំង Properties Inspector នៅបន្ទះខាងស្តាំ",
        "B) ផ្ទាំង Tree View នៅបន្ទះខាងឆ្វេង",
        "C) របារ Command Ribbon នៅខាងលើ",
        "D) ផ្ទាំង Canvas Stage នៅចំកណ្តាល"
      ],
      correctIndex: 1,
      explanationEn: "The Tree View on the left panel is your architectural x-ray blueprint showing exactly which containers hold which controls in strict hierarchy.",
      explanationKh: "ផ្ទាំង Tree View នៅបន្ទះខាងឆ្វេង គឺជាប្លង់កាំរស្មីអ៊ិចដែលបង្ហាញយ៉ាងច្បាស់ថាតើ Container ណាផ្ទុក Control ណាខ្លះក្នុងលំដាប់ថ្នាក់ពិតប្រាកដ។"
    },
    {
      titleEn: "2. Why must a developer rename a control to Hungarian Notation (e.g., 'txtIncidentNotes') immediately upon inserting it?",
      titleKh: "២. ហេតុអ្វីបានជា Developer ត្រូវតែប្តូរឈ្មោះ Control តាមស្តង់ដារ Hungarian (ឧ. 'txtIncidentNotes') ភ្លាមៗពេលទើបដាក់បញ្ចូល?",
      optionsEn: [
        "A) Because Power Apps will delete any control named 'TextInput1' after 24 hours",
        "B) Because Hungarian names make future formulas readable and prevent saving data into the wrong column",
        "C) Because it makes the app load 50% faster on mobile devices",
        "D) Because Microsoft requires it to obtain a citizen developer license"
      ],
      optionsKh: [
        "A) ពីព្រោះ Power Apps នឹងលុប Control ណាដែលមានឈ្មោះ 'TextInput1' ចោលក្រោយ ២៤ ម៉ោង",
        "B) ពីព្រោះឈ្មោះ Hungarian ជួយឱ្យរូបមន្តងាយអាន និងការពារកុំឱ្យរក្សាទុកទិន្នន័យខុសជួរឈរ",
        "C) ពីព្រោះវាជួយឱ្យ App ដំណើរការលឿនជាងមុន ៥០% លើទូរស័ព្ទដៃ",
        "D) ពីព្រោះ Microsoft តម្រូវឱ្យធ្វើបែបនេះទើបទទួលបាន License"
      ],
      correctIndex: 1,
      explanationEn: "Descriptive names act as clear variable identifiers in your formulas. Leaving default names leads to saving data into wrong database columns.",
      explanationKh: "ឈ្មោះច្បាស់លាស់ដើរតួជាអថេរក្នុងរូបមន្តរបស់អ្នក។ ការទុកឈ្មោះលំនាំដើមអាចបណ្តាលឱ្យរូបមន្តរក្សាទុកទិន្នន័យខុសជួរឈរក្នុង Database។"
    },
    {
      titleEn: "3. What happens if a citizen developer uses a free 'TextInput' control for Machine Selection instead of a 'Dropdown' control?",
      titleKh: "៣. តើមានអ្វីកើតឡើង ប្រសិនបើ Developer ប្រើប្រអប់សរសេរអក្សរ TextInput សម្រាប់រើសម៉ាស៊ីន ជំនួសឱ្យការប្រើ Dropdown?",
      optionsEn: [
        "A) The app will automatically crash and close on shop-floor tablets",
        "B) Users will introduce spelling typos (e.g., 'press 1' vs 'Press-01'), causing automated filters and reports to fail",
        "C) The database will refuse to save any text longer than 5 letters",
        "D) The screen will turn completely black during app preview"
      ],
      optionsKh: [
        "A) កម្មវិធី App នឹងគាំងហើយបិទខ្លួនឯងភ្លាមៗលើ Tablet រោងចក្រ",
        "B) អ្នកប្រើប្រាស់នឹងវាយអក្សរខុស (ឧ. 'press 1' vs 'Press-01') ធ្វើឱ្យការច្រោះទិន្នន័យ Filter និងរបាយការណ៍បរាជ័យ",
        "C) Database នឹងបដិសេធមិនរក្សាទុកអត្ថបទណាដែលវែងជាង ៥ អក្សរឡើយ",
        "D) អេក្រង់នឹងប្រែជាខ្មៅងងឹតទាំងស្រុងនៅពេលបើកសាកល្បង Play Mode"
      ],
      correctIndex: 1,
      explanationEn: "Choice data types must be enforced with Dropdown controls to prevent typographical errors that break automated filters and email notifications.",
      explanationKh: "ប្រភេទជម្រើស Choice ត្រូវតែអនុវត្តជាមួយ Dropdown ដើម្បីលុបបំបាត់កំហុសអក្ខរាវិរុទ្ធដែលធ្វើឱ្យខូច Filter និងការផ្ញើដំណឹងស្វ័យប្រវត្ត។"
    },
    {
      titleEn: "4. In the mental grammar model 'Control = Noun, Property = Adjective, Formula = Verb', what is the role of a Property?",
      titleKh: "៤. នៅក្នុងគំរូវេយ្យាករណ៍ផ្នត់គំនិត 'Control = នាម, Property = គុណនាម, Formula = កិរិយាស័ព្ទ' តើ Property មានតួនាទីអ្វី?",
      optionsEn: [
        "A) It is the database table where records are permanently archived",
        "B) It is a dynamic dial or characteristic that dictates how the control looks, behaves, or calculates its state",
        "C) It is the physical mouse used by the operator on the plant floor",
        "D) It is an advanced developer tool used only for cloud migrations"
      ],
      optionsKh: [
        "A) វាគឺជាតារាង Database ដែលកំណត់ត្រាត្រូវបានរក្សាទុកជាអចិន្ត្រៃយ៍",
        "B) វាជាកុងតាក់ ឬលក្ខណៈបត់បែនដែលកំណត់ថាតើ Control មើលទៅបែបណា មានឥរិយាបថបែបណា ឬគណនាស្ថានភាពបែបណា",
        "C) វាគឺជា Mouse រូបវន្តដែលកម្មកររោងចក្រកាន់ប្រើប្រាស់",
        "D) វាជាឧបករណ៍កម្រិតខ្ពស់សម្រាប់តែការផ្ទេរទិន្នន័យ Cloud ប៉ុណ្ណោះ"
      ],
      correctIndex: 1,
      explanationEn: "Properties are the dynamic adjectives describing an object's state (e.g., btnSubmit.DisplayMode, lblTitle.Text, drpMachine.Items).",
      explanationKh: "Properties គឺជាគុណនាមដែលពិពណ៌នាពីស្ថានភាពនៃវត្ថុ (ឧ. btnSubmit.DisplayMode, lblTitle.Text, drpMachine.Items)។"
    },
    {
      titleEn: "5. An operator presses the Submit button, but nothing happens. You inspect the Studio properties panel. Which property holds the formula executed on tap?",
      titleKh: "៥. កម្មករចុចលើប៊ូតុង Submit តែគ្មានអ្វីកើតឡើងសោះ។ អ្នកបើកផ្ទាំង Properties ក្នុង Studio ពិនិត្យមើល។ តើ Property មួយណាដែលផ្ទុករូបមន្តសម្រាប់ដំណើរការពេលចុច?",
      optionsEn: [
        "A) The 'Tooltip' property",
        "B) The 'OnSelect' property",
        "C) The 'FontWeight' property",
        "D) The 'DisplayMode' property"
      ],
      optionsKh: [
        "A) Property ឈ្មោះ 'Tooltip'",
        "B) Property ឈ្មោះ 'OnSelect'",
        "C) Property ឈ្មោះ 'FontWeight'",
        "D) Property ឈ្មោះ 'DisplayMode'"
      ],
      correctIndex: 1,
      explanationEn: "OnSelect is the primary event property that triggers Power Fx action formulas like SubmitForm(), Navigate(), or Notify() when clicked.",
      explanationKh: "OnSelect គឺជា Event Property ចម្បងដែលដំណើរការរូបមន្តសកម្មភាព Power Fx ដូចជា SubmitForm(), Navigate() ឬ Notify() នៅពេលមានការចុច។"
    }
  ];

  // --------------------------------------------------------------------------
  // 4. KHMER TRANSLATIONS (24 SLIDES)
  // --------------------------------------------------------------------------
  const KHMER_SLIDES = [
  {
    "title": "ចំណងជើង៖ Power Apps Studio៖ បំប្លែងប្លង់ក្រដាសទៅជា Controls",
    "segment": "វគ្គទី ១៖ ការតម្រង់ទិស & រំលឹកចំណេះដឹង",
    "content": "<div class=\"hero-badge-row\">\n            <span class=\"pill pill-phase\">ដំណាក់កាលទី ៥៖ ការសាងសង់ជាក់ស្តែងក្នុង Canvas Studio</span>\n            <span class=\"pill pill-accent\">ថ្ងៃទី ១៣ នៃ ២៧ ថ្ងៃ</span>\n            <span class=\"pill pill-time\">វគ្គសិក្សាជាក់ស្តែង ៩០ នាទី</span>\n          </div>\n          <h1 class=\"hero-title\">Power Apps Studio៖ ការបំប្លែងប្លង់ក្រដាសទៅជា Canvas Controls</h1>\n          <p class=\"hero-subtitle\">បោះជំហានពីគំនូសព្រាងលើក្រដាសទៅកាន់កម្មវិធីពិតប្រាកដ៖ បំប្លែងប្រអប់គូរទៅជា Controls បង្វិលកុងតាក់ទៅជា Properties និងរៀបចំ Tree View ទៅជាកន្លែងការងារស្តង់ដារ។</p>\n\n          <div class=\"hero-connection-card\">\n            <span class=\"chain-label\">ខ្សែសង្វាក់តភ្ជាប់ថ្ងៃនេះ៖</span>\n            <div class=\"hero-chain-steps\">\n              <span class=\"step-pill\">ប្លង់ព្រាងលើក្រដាស</span>\n              <span class=\"arrow\">&rarr;</span>\n              <span class=\"step-pill\">អេក្រង់ Canvas</span>\n              <span class=\"arrow\">&rarr;</span>\n              <span class=\"step-pill active-pill\">ដាក់បញ្ចូល Controls</span>\n              <span class=\"arrow\">&rarr;</span>\n              <span class=\"step-pill\">កំណត់លក្ខណៈ Properties</span>\n            </div>\n            <span class=\"chain-caption\">មេរៀនមុន៖ គំនូសព្រាងអេក្រង់ថ្ងៃទី ១២ &bull; ថ្ងៃនេះ៖ ការបំប្លែងក្នុង Studio &bull; ស្ពានទៅមុខ៖ ភ្ជាប់ទិន្នន័យថ្ងៃទី ១៤</span>\n          </div>\n\n          <div class=\"hero-actions\">\n            <button class=\"fluent-btn-primary\" id=\"hero-start-btn\">\n              <span>ចាប់ផ្តើមដំណើររៀនសូត្រថ្ងៃទី ១៣ (Space / &rarr;)</span>\n              <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"currentColor\">\n                <path d=\"M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z\"/>\n              </svg>\n            </button>\n          </div>"
  },
  {
    "title": "ផែនទីកម្មវិធីសិក្សា ២៧ ថ្ងៃ",
    "segment": "វគ្គទី ១៖ ការតម្រង់ទិស & រំលឹកចំណេះដឹង",
    "content": "<div class=\"slide-header\">\n            <span class=\"section-tag\">ស្ថាបត្យកម្មកម្មវិធីសិក្សា</span>\n            <h2>ទីតាំងនៃមេរៀនថ្ងៃនេះក្នុងដំណើរ ២៧ ថ្ងៃ</h2>\n            <p class=\"subtitle\">ដំណើរវិវឌ្ឍផ្នែកវិស្វកម្មជាបន្តបន្ទាប់៖ យើងបានដោះស្រាយបញ្ហា រៀបចំលំហូរការងារ ចាត់ចែងទិន្នន័យ និងគូរប្លង់អេក្រង់។ ថ្ងៃនេះយើងសាងសង់ផ្ទាល់ក្នុង Studio។</p>\n          </div>\n\n          <div class=\"curr-map-grid\">\n            <div class=\"curr-card passed\">\n              <span class=\"card-phase\">ដំណាក់កាលទី ១៖ គ្រឹះអាជីវកម្ម</span>\n              <span class=\"card-days\">ថ្ងៃទី ១–៣</span>\n              <h4 class=\"card-title\">បញ្ហាពិត &amp; ដំណើរការ</h4>\n              <p>ហេតុអ្វីត្រូវមាន App, ឧបសគ្គការងារ និងការគូសផែនទីដំណើរការ។</p>\n            </div>\n            <div class=\"curr-card passed\">\n              <span class=\"card-phase\">ដំណាក់កាលទី ២៖ គ្រឹះនៃ Logic</span>\n              <span class=\"card-days\">ថ្ងៃទី ៤–៦</span>\n              <h4 class=\"card-title\">លក្ខខណ្ឌ &amp; ការសម្រេចចិត្ត</h4>\n              <p>ការប្រៀបធៀបអង្គហេតុ សំណួរ បាទ/ទេ និងសកម្មភាព IF។</p>\n            </div>\n            <div class=\"curr-card passed\">\n              <span class=\"card-phase\">ដំណាក់កាលទី ៣៖ រចនាសម្ព័ន្ធទិន្នន័យ</span>\n              <span class=\"card-days\">ថ្ងៃទី ៧–១០</span>\n              <h4 class=\"card-title\">កំណត់ត្រា &amp; តារាង</h4>\n              <p>ការរៀបចំប័ណ្ណសំណើជាតារាង ជួរដេក (Records) និងជួរឈរ (Columns)។</p>\n            </div>\n            <div class=\"curr-card passed\">\n              <span class=\"card-phase\">ដំណាក់កាលទី ៤៖ រចនាចេញពីទិន្នន័យ</span>\n              <span class=\"card-days\">ថ្ងៃទី ១១–១២</span>\n              <h4 class=\"card-title\">ពីជួរឈរទៅជាប្លង់អេក្រង់</h4>\n              <p>ទាញជួរឈរពីដំណើរការ និងព្រាងគំរូសហគ្រាស ៤ អេក្រង់លើក្រដាស។</p>\n            </div>\n            <div class=\"curr-card active-card\">\n              <span class=\"card-phase\">ដំណាក់កាលទី ៥៖ សាងសង់លើ Canvas</span>\n              <span class=\"card-days\">ថ្ងៃនេះ៖ ថ្ងៃទី ១៣</span>\n              <h4 class=\"card-title\">Power Apps Studio៖ បំប្លែងទៅជា Controls</h4>\n              <p>បំប្លែងប្លង់ក្រដាសទៅជាអេក្រង់ Canvas, Tree View, Controls និងកំណត់ Properties។</p>\n            </div>\n            <div class=\"curr-card future\">\n              <span class=\"card-phase\">ដំណាក់កាលទី ៦៖ ភ្ជាប់ទិន្នន័យ &amp; រូបមន្ត</span>\n              <span class=\"card-days\">ថ្ងៃទី ១៤–២៧</span>\n              <h4 class=\"card-title\">រូបមន្ត ការផ្ទុក &amp; ដាក់ឱ្យប្រើ</h4>\n              <p>ភ្ជាប់ Controls ទៅកាន់ SharePoint/Dataverse ការផ្ទៀងផ្ទាត់ និងដាក់ឱ្យប្រើ។</p>\n            </div>\n          </div>"
  },
  {
    "title": "គោលបំណងរៀនសូត្រទាំង ៤",
    "segment": "វគ្គទី ១៖ ការតម្រង់ទិស & រំលឹកចំណេះដឹង",
    "content": "<div class=\"slide-header\">\n            <span class=\"section-tag\">លទ្ធផលរំពឹងទុក</span>\n            <h2>អ្វីដែលអ្នកនឹងទទួលបានក្នុងការរៀន ៩០ នាទីថ្ងៃនេះ</h2>\n            <p class=\"subtitle\">សមត្ថភាពវាស់វែងបានជាក់ស្តែងចំនួន ៤ ស្របតាមស្តង់ដារ UI/UX របស់ Citizen Developer ក្នុងវិស័យឧស្សាហកម្ម។</p>\n          </div>\n\n          <div class=\"objectives-grid\">\n            <div class=\"obj-card\">\n              <div class=\"obj-header\">\n                <span class=\"obj-badge bloom-l2\">L2: យល់ដឹង</span>\n                <span class=\"obj-num\">01</span>\n              </div>\n              <h3>ស្គាល់តំបន់ស្នូលទាំង ៤ នៃ Studio</h3>\n              <p>បែងចែកចំណុចប្រទាក់ Studio ទៅជា Ribbon, Tree View, Canvas និង Properties ដោយពន្យល់ពីសារៈសំខាន់នៃ Tree View ជាប្លង់ស្ថាបត្យកម្មមេ។</p>\n            </div>\n\n            <div class=\"obj-card\">\n              <div class=\"obj-header\">\n                <span class=\"obj-badge bloom-l3\">L3: អនុវត្ត</span>\n                <span class=\"obj-num\">02</span>\n              </div>\n              <h3>បំប្លែងធាតុលើក្រដាសទៅជា Studio Controls</h3>\n              <p>ជ្រើសរើស Controls ត្រឹមត្រូវក្នុង Studio (Label, TextInput, Dropdown, Button, DatePicker) ឱ្យត្រូវគ្នានឹងគ្រប់ធាតុដែលបានគូរលើក្រដាសពីម្សិលមិញ។</p>\n            </div>\n\n            <div class=\"obj-card\">\n              <div class=\"obj-header\">\n                <span class=\"obj-badge bloom-l4\">L4: វិភាគ</span>\n                <span class=\"obj-num\">03</span>\n              </div>\n              <h3>អនុវត្តក្បួនដាក់ឈ្មោះ Hungarian Notation</h3>\n              <p>ប្រើប្រាស់បុព្វបទស្តង់ដារអាជីព (<code>scr</code>, <code>lbl</code>, <code>txt</code>, <code>drp</code>, <code>btn</code>) និងយល់ច្បាស់ពីមូលហេតុដែលឈ្មោះលំនាំដើមដូចជា <code>TextInput1</code> អាចបំផ្លាញរូបមន្ត Power Fx។</p>\n            </div>\n\n            <div class=\"obj-card\">\n              <div class=\"obj-header\">\n                <span class=\"obj-badge bloom-l5\">L5: បង្កើត</span>\n                <span class=\"obj-num\">04</span>\n              </div>\n              <h3>កំណត់ Properties &amp; បង្កើតស្ថានភាព Control</h3>\n              <p>សាងសង់អេក្រង់កត់ត្រាសំណើពេញលេញ (<code>scrNewRequest</code>) ដោយកំណត់លក្ខណៈសំខាន់ៗ (<code>Text</code>, <code>Default</code>, <code>Items</code>, <code>Visible</code>, <code>DisplayMode</code>, <code>OnSelect</code>) ប្រកបដោយកម្រិតកុងត្រាសត្រឹមត្រូវ។</p>\n            </div>\n          </div>"
  },
  {
    "title": "កាលវិភាគលម្អិត ៩០ នាទី",
    "segment": "វគ្គទី ១៖ ការតម្រង់ទិស & រំលឹកចំណេះដឹង",
    "content": "<div class=\"slide-header\">\n            <span class=\"section-tag\">កាលវិភាគលម្អិត</span>\n            <h2>កាលវិភាគសិក្សា ៩០ នាទី (Spiral Learning Schedule)</h2>\n            <p class=\"subtitle\">រាល់នាទីត្រូវបានរៀបចំឡើងសម្រាប់ការចូលរួមយ៉ាងសកម្ម ការប្រៀបធៀបរូបវន្ត ការបង្ហាញផ្ទាល់ និងការធ្វើលំហាត់អនុវត្តជាក់ស្តែង។</p>\n          </div>\n\n          <div class=\"agenda-timeline\">\n            <div class=\"time-block\">\n              <span class=\"time-stamp\">00:00 – 10:00 (១០ នាទី)</span>\n              <span class=\"time-badge\">វគ្គទី ១៖ រំលឹក &amp; ផ្សារភ្ជាប់</span>\n              <p class=\"time-content\">រំលឹកចំណេះដឹងពីថ្ងៃទី ១១ &amp; ១២ សំណួរសាកល្បងការចងចាំលើប្លង់ក្រដាស និងទិសដៅសាងសង់ក្នុង Studio។</p>\n            </div>\n\n            <div class=\"time-block\">\n              <span class=\"time-stamp\">10:00 – 25:00 (១៥ នាទី)</span>\n              <span class=\"time-badge\">វគ្គទី ២៖ ស្វែងយល់ពីមូលហេតុ (The Why)</span>\n              <p class=\"time-content\">មេរៀនខាតបង់ $22,000 \"Studio Panic\" នៅ Apex Plastics និងស្គាល់តំបន់ស្នូលទាំង ៤ ក្នុង Studio។</p>\n            </div>\n\n            <div class=\"time-block\">\n              <span class=\"time-stamp\">25:00 – 45:00 (២០ នាទី)</span>\n              <span class=\"time-badge\">វគ្គទី ៣៖ ទ្រឹស្តីស៊ីជម្រៅ</span>\n              <p class=\"time-content\">គំរូ Control-Property (នាម, គុណនាម, កិរិយាស័ព្ទ) និងវិធានដាក់ឈ្មោះតាមស្តង់ដារ Hungarian Notation។</p>\n            </div>\n\n            <div class=\"time-block highlight-block\">\n              <span class=\"time-stamp\">45:00 – 60:00 (១៥ នាទី)</span>\n              <span class=\"time-badge\">វគ្គទី ៤៖ បង្ហាញផ្ទាល់ &amp; កម្មវិធីសាកល្បង</span>\n              <p class=\"time-content\">សម្រាកពត់ខ្លួន (នាទីទី ៤៥) គ្រូបង្ហាញការសាងសង់ផ្ទាល់ក្នុង Studio និងអនុវត្តលើ Widget 1 (Control Mapper)។</p>\n            </div>\n\n            <div class=\"time-block\">\n              <span class=\"time-stamp\">60:00 – 75:00 (១៥ នាទី)</span>\n              <span class=\"time-badge\">វគ្គទី ៥៖ អនុវត្តក្រោមការណែនាំ</span>\n              <p class=\"time-content\">សវនកម្មកែកំហុសអេក្រង់រញ៉េរញ៉ៃ កម្មវិធីពិសោធន៍រោគវិនិច្ឆ័យ Property ៦ ស្ថានភាព (Widget 2) និង ៤ អន្ទាក់គំនិត។</p>\n            </div>\n\n            <div class=\"time-block\">\n              <span class=\"time-stamp\">75:00 – 90:00 (១៥ នាទី)</span>\n              <span class=\"time-badge\">វគ្គទី ៦៖ វាយតម្លៃ &amp; ស្ពានទៅមុខ</span>\n              <p class=\"time-content\">តេស្តវាស់ស្ទង់ ៥ សំណួរ (Widget 3) បេសកកម្ម Capstone Challenge បង្ហាញដំណោះស្រាយគំរូ និងត្រៀមសម្រាប់ថ្ងៃទី ១៤។</p>\n            </div>\n          </div>"
  },
  {
    "title": "ការរំលឹកចំណេះដឹងមុន",
    "segment": "វគ្គទី ១៖ ការតម្រង់ទិស & រំលឹកចំណេះដឹង",
    "content": "<div class=\"slide-header\">\n            <span class=\"section-tag\">រំលឹកចំណេះដឹងសកម្ម</span>\n            <h2>ការរំលឹកចំណេះដឹងមុន៖ ភ្ជាប់គ្រឹះដែលបានរៀនឱ្យរឹងមាំ</h2>\n            <p class=\"subtitle\">ចុចលើកាតនីមួយៗដើម្បីផ្ទៀងផ្ទាត់គោលគំនិតគ្រឹះដែលបានរៀននៅថ្ងៃទី ១១ និង ១២ មុនពេលប៉ះពាល់ Studio។</p>\n          </div>\n\n          <div class=\"retrieval-deck\">\n            <div class=\"retrieval-card\" id=\"ret-card-1\">\n              <div class=\"retrieval-q-badge\">ពីថ្ងៃទី ១២៖ គោលបំណងនៃការគូរប្លង់ក្រដាស</div>\n              <div class=\"card-prompt\">\n                <h3>\"ហេតុអ្វីបានជាយើងចំណាយពេលម្សិលមិញគូរប្លង់លើក្រដាស ជំនួសឱ្យការចូលទៅបង្កើតផ្ទាល់ក្នុង Power Apps?\"</h3>\n              </div>\n              <button class=\"fluent-btn-secondary ret-reveal-btn\" data-target=\"ret-ans-1\">បង្ហាញចម្លើយ</button>\n              <div class=\"retrieval-answer\" id=\"ret-ans-1\">\n                <strong>គោលគំនិតត្រឹមត្រូវ៖</strong> ក្រដាសមិនអស់លុយ និងលុបកែសម្រួលបានក្នុងរយៈពេលប៉ុន្មានវិនាទី! ការគូរលើក្រដាសបង្ខំឱ្យយើងផ្តោតលើភារកិច្ចរបស់អ្នកប្រើប្រាស់ ជាជាងការវង្វេងក្នុងប៊ូតុង ពណ៌ និង Properties ក្នុង Studio!\n              </div>\n            </div>\n\n            <div class=\"retrieval-card\" id=\"ret-card-2\">\n              <div class=\"retrieval-q-badge\">ពីថ្ងៃទី ១២៖ ក្រុម Control ស្នូលទាំង ៣</div>\n              <div class=\"card-prompt\">\n                <h3>\"តើក្រុម Control មុខងារទាំង ៣ មានអ្វីខ្លះ ហើយក្រុមនីមួយៗមានតួនាទីអ្វី?\"</h3>\n              </div>\n              <button class=\"fluent-btn-secondary ret-reveal-btn\" data-target=\"ret-ans-2\">បង្ហាញចម្លើយ</button>\n              <div class=\"retrieval-answer\" id=\"ret-ans-2\">\n                <strong>គោលគំនិតត្រឹមត្រូវ៖</strong> ១. Input Controls (សម្រាប់មនុស្សកត់ត្រាទិន្នន័យចូល), ២. Display Controls (សម្រាប់បង្ហាញទិន្នន័យដោយសុវត្ថិភាព), និង ៣. Action Controls (សម្រាប់បញ្ជាការងារ បញ្ជូនទិន្នន័យ ឬប្តូរអេក្រង់)។\n              </div>\n            </div>\n\n            <div class=\"retrieval-card\" id=\"ret-card-3\">\n              <div class=\"retrieval-q-badge\">ពីថ្ងៃទី ១១៖ ប្រភេទនៃទិន្នន័យ (Data Types)</div>\n              <div class=\"card-prompt\">\n                <h3>\"ហេតុអ្វីបានជាប្រអប់ជ្រើសរើសម៉ាស៊ីនត្រូវតែប្រើ Data Type ប្រភេទ Choice ជំនួសឱ្យប្រអប់សរសេរអក្សរធម្មតា?\"</h3>\n              </div>\n              <button class=\"fluent-btn-secondary ret-reveal-btn\" data-target=\"ret-ans-3\">បង្ហាញចម្លើយ</button>\n              <div class=\"retrieval-answer\" id=\"ret-ans-3\">\n                <strong>គោលគំនិតត្រឹមត្រូវ៖</strong> ដើម្បីលុបបំបាត់កំហុសអក្ខរាវិរុទ្ធ (Typo)! ក្នុង Power Apps Studio ជួរឈរ Choice នឹងត្រូវបំប្លែងទៅជា Dropdown Control ដោយកំណត់ឱ្យអ្នកប្រើប្រាស់រើសតែតម្លៃដែលបានអនុម័តប៉ុណ្ណោះ។\n              </div>\n            </div>\n          </div>"
  },
  {
    "title": "ករណីសិក្សាវិបត្តិការងារ៖ ការខាតបង់ $22,000",
    "segment": "វគ្គទី ២៖ ស្វែងយល់ពីមូលហេតុ (The Why)",
    "content": "<div class=\"slide-header\">\n            <span class=\"section-tag section-tag-danger\">ករណីសិក្សាវិបត្តិជាក់ស្តែង</span>\n            <h2>មេរៀនខាតបង់ $22,000 \"Studio Panic\" នៅ Apex Plastics</h2>\n            <p class=\"subtitle\">អ្វីដែលកើតឡើងនៅពេលអ្នកចាប់ផ្តើមថ្មីបើកដំណើរការ Canvas Studio ដោយគ្មានផែនការបំប្លែងតាមរចនាសម្ព័ន្ធ។</p>\n          </div>\n\n          <div class=\"crisis-story-grid\">\n            <div class=\"crisis-card story-narrative\">\n              <div class=\"crisis-icon\">⚠️</div>\n              <h3>អន្ទាក់នៃផ្ទាំងអេក្រង់ទទេ (Blank Canvas Trap)</h3>\n              <p>បុគ្គលិកផ្នែកថែទាំឈ្មោះ វិសាល បានទទួល License ប្រើប្រាស់ Power Apps នៅព្រឹកថ្ងៃច័ន្ទ។ ដោយចង់បង្កើត App ឱ្យបានលឿន គាត់បានបើក Studio ឃើញផ្ទាំងពណ៌សទទេរស្អាត ហើយក៏ចាប់ផ្តើមស្លន់ស្លោ។</p>\n              <p>គាត់បានអូសប្រអប់ Text Input ចំនួន ៨ ដាក់លើអេក្រង់ដោយគ្មានគិតទុកជាមុន ទុកឈ្មោះលំនាំដើមដូចជា <code>TextInput1</code>, <code>TextInput2</code>, និង <code>TextInput3_1</code> ហើយដាក់ Label នៅរាយប៉ាយគ្មានតម្រឹម។</p>\n              <div class=\"quote-pill\">\"ខ្ញុំគិតថា Power Apps ដូចជា PowerPoint ដែរ គឺគ្រាន់តែអូសទម្លាក់រូបរាងឱ្យស្អាតទៅបានហើយ!\"</div>\n            </div>\n\n            <div class=\"crisis-card consequence-panel\">\n              <h3>ផលវិបាកក្នុងប្រតិបត្តិការរោងចក្រ</h3>\n              <div class=\"consequence-item\">\n                <span class=\"consequence-num\">1</span>\n                <div>\n                  <strong>ទិន្នន័យខូចខាត (Data Corruption)៖</strong>\n                  <p>ដោយសារប្រអប់មានឈ្មោះ <code>TextInput1</code> និង <code>TextInput2</code> រូបមន្ត Submit របស់វិសាលបានរក្សាទុកឈ្មោះម៉ាស៊ីនចូលទៅក្នុងជួរឈរកំណត់ចំណាំជួសជុល!</p>\n                </div>\n              </div>\n              <div class=\"consequence-item\">\n                <span class=\"consequence-num\">2</span>\n                <div>\n                  <strong>កម្មករឈប់ប្រើលើ Tablet៖</strong>\n                  <p>នៅលើអេក្រង់ Tablet រោងចក្រ ប្រអប់អក្សរជាន់លើគ្នា ហើយ Label ដាច់បាត់។ កម្មករឈប់ប្រើ App ហើយត្រឡប់ទៅសរសេរលើក្រដាសវិញ។</p>\n                </div>\n              </div>\n              <div class=\"consequence-item\">\n                <span class=\"consequence-num\">3</span>\n                <div>\n                  <strong>ការខាតបង់ទឹកប្រាក់ $22,000៖</strong>\n                  <p>ការពន្យារពេលរាយការណ៍ជួសជុលរយៈពេល ៦ សប្តាហ៍ បានបណ្តាលឱ្យប្រព័ន្ធធារាសាស្ត្រលើម៉ាស៊ីន Press #4 គាំងខូចទាំងស្រុង។</p>\n                </div>\n              </div>\n            </div>\n          </div>"
  },
  {
    "title": "គោលគំនិតងាយយល់៖ ការរៀបចំគ្រឿងសង្ហារិមក្នុងបន្ទប់",
    "segment": "វគ្គទី ២៖ ស្វែងយល់ពីមូលហេតុ (The Why)",
    "content": "<div class=\"slide-header\">\n            <span class=\"section-tag\">គំរូផ្នត់គំនិត</span>\n            <h2>ការប្រៀបធៀបក្នុងជីវិតរស់នៅ៖ ការរៀបចំបន្ទប់ការិយាល័យទទេ</h2>\n            <p class=\"subtitle\">Power Apps Studio មិនមែនជាក្តារគំនូរទេ។ វាជាកាតាឡុកបញ្ជាទិញ និងដំឡើងបរិក្ខារសម្រាប់បន្ទប់ឌីជីថលរបស់អ្នក។</p>\n          </div>\n\n          <div class=\"analogy-dual-grid\">\n            <div class=\"analogy-card physical-world\">\n              <div class=\"analogy-header\">\n                <span class=\"analogy-icon\">🏢</span>\n                <h3>បន្ទប់ការិយាល័យរូបវន្ត</h3>\n              </div>\n              <div class=\"analogy-step\">\n                <span class=\"step-badge\">បន្ទប់</span>\n                <p>បន្ទប់បេតុងទទេដែលមានជញ្ជាំង និងទ្វារ (បន្ទប់ទទួលភ្ញៀវ/សំណើ)។</p>\n              </div>\n              <div class=\"analogy-step\">\n                <span class=\"step-badge\">គ្រឿងសង្ហារិម</span>\n                <p>តុឈើដែលមានថាសដាក់ឯកសារ (<code>TextInput</code>), នាឡិកាជញ្ជាំង (<code>Label</code>), និងប៊ូតុងរោទ៍សង្គ្រោះបន្ទាន់ (<code>Button</code>)។</p>\n              </div>\n              <div class=\"analogy-step\">\n                <span class=\"step-badge\">ការកំណត់</span>\n                <p>ស្លាកសញ្ញាលាបពណ៌ខៀវ (<code>Color</code>), ថាសតុមានកម្ពស់ ៣ ហ្វីត (<code>Height</code>), និងប៊ូតុងបើកដំណើរការ (<code>Enabled</code>)។</p>\n              </div>\n              <div class=\"analogy-step\">\n                <span class=\"step-badge\">បញ្ជីសារពើភណ្ឌ</span>\n                <p>ក្តារកត់ត្រារបស់អ្នកគ្រប់គ្រងអគារដែលរាយឈ្មោះគ្រឿងសង្ហារិមទាំងអស់តាមលេខ Barcode។</p>\n              </div>\n            </div>\n\n            <div class=\"analogy-card digital-studio\">\n              <div class=\"analogy-header\">\n                <span class=\"analogy-icon\">💻</span>\n                <h3>Power Apps Canvas Studio</h3>\n              </div>\n              <div class=\"analogy-step\">\n                <span class=\"step-badge step-blue\">Screen</span>\n                <p>អេក្រង់ផ្ទាំងទទេដែលកំណត់សម្រាប់តួនាទីមនុស្សម្នាក់ (<code>scrNewRequest</code>)។</p>\n              </div>\n              <div class=\"analogy-step\">\n                <span class=\"step-badge step-blue\">Controls</span>\n                <p>វត្ថុអន្តរកម្មដែលដាក់បញ្ចូលពីកាតាឡុក (<code>TextInput</code>, <code>Label</code>, <code>Button</code>, <code>Dropdown</code>)។</p>\n              </div>\n              <div class=\"analogy-step\">\n                <span class=\"step-badge step-blue\">Properties</span>\n                <p>កុងតាក់កំណត់នៅក្នុងផ្ទាំងខាងស្តាំ (<code>Text</code>, <code>Fill</code>, <code>DisplayMode</code>, <code>Visible</code>, <code>OnSelect</code>)។</p>\n              </div>\n              <div class=\"analogy-step\">\n                <span class=\"step-badge step-blue\">Tree View</span>\n                <p>បញ្ជីកាំរស្មីអ៊ិចនៅខាងឆ្វេងដែលបង្ហាញគ្រប់ Controls និង Containers តាមលំដាប់ថ្នាក់យ៉ាងច្បាស់។</p>\n              </div>\n            </div>\n          </div>"
  },
  {
    "title": "បំពង់បំប្លែង ៤ ស្រទាប់ (4-Layer Pipeline)",
    "segment": "វគ្គទី ៣៖ ទ្រឹស្តីស្ថាបត្យកម្មស៊ីជម្រៅ",
    "content": "<div class=\"slide-header\">\n            <span class=\"section-tag\">ស្ថាបត្យកម្មប្រព័ន្ធ</span>\n            <h2>បំពង់បំប្លែងស្ថាបត្យកម្ម ៤ ស្រទាប់ក្នុង Studio</h2>\n            <p class=\"subtitle\">របៀបដែលតម្រូវការអាជីវកម្មរបស់មនុស្សផ្លាស់ប្តូរមួយជំហានម្តងៗទៅជា Controls នៃកម្មវិធីដែលអាចដំណើរការបាន។</p>\n          </div>\n\n          <div class=\"pipeline-container\">\n            <div class=\"pipeline-step-card\">\n              <span class=\"pipe-num\">1</span>\n              <h4>ភារកិច្ចមនុស្ស</h4>\n              <p>បុគ្គលិកបុប្ផាត្រូវរាយការណ៍ពីការលេចធ្លាយប្រេងធារាសាស្ត្រក្នុងរយៈពេលក្រោម ៦០ វិនាទី។</p>\n              <div class=\"pipe-tag\">បញ្ហាពិត</div>\n            </div>\n            <div class=\"pipeline-arrow\">&rarr;</div>\n\n            <div class=\"pipeline-step-card\">\n              <span class=\"pipe-num\">2</span>\n              <h4>ប្លង់ព្រាងលើក្រដាស</h4>\n              <p>គំនូសព្រាងថ្ងៃទី ១២៖ របារចំណងជើង, ប្រអប់រើសម៉ាស៊ីន, ប្រអប់កំណត់ចំណាំ, និងប៊ូតុង Submit។</p>\n              <div class=\"pipe-tag\">ស្ថាបត្យកម្ម</div>\n            </div>\n            <div class=\"pipeline-arrow\">&rarr;</div>\n\n            <div class=\"pipeline-step-card active-pipe\">\n              <span class=\"pipe-num\">3</span>\n              <h4>Studio Controls</h4>\n              <p>ដាក់បញ្ចូលក្នុង Tree View៖ <code>scrNewRequest</code>, <code>drpMachine</code>, <code>txtNotes</code>, <code>btnSubmit</code>។</p>\n              <div class=\"pipe-tag\">វត្ថុក្នុង Studio</div>\n            </div>\n            <div class=\"pipeline-arrow\">&rarr;</div>\n\n            <div class=\"pipeline-step-card\">\n              <span class=\"pipe-num\">4</span>\n              <h4>Control Properties</h4>\n              <p>កំណត់កុងតាក់៖ <code>Items = Machines</code>, <code>Mode = MultiLine</code>, <code>DisplayMode = Edit</code>។</p>\n              <div class=\"pipe-tag\">Logic ប្រតិបត្តិការ</div>\n            </div>\n          </div>\n\n          <div class=\"pipeline-takeaway-banner\">\n            <strong>គោលការណ៍ស្ថាបត្យកម្មសំខាន់៖</strong> អ្នកមិនត្រូវចាប់ផ្តើមនៅស្រទាប់ទី ៤ ឡើយ! អ្នកអាចប៉ះពាល់ Properties បានលុះត្រាតែស្រទាប់ទី ១, ២ និង ៣ ត្រូវបានកំណត់ច្បាស់លាស់។\n          </div>"
  },
  {
    "title": "ទស្សនកិច្ច Power Apps Studio៖ តំបន់សំខាន់ទាំង ៤",
    "segment": "វគ្គទី ៣៖ ទ្រឹស្តីស្ថាបត្យកម្មស៊ីជម្រៅ",
    "content": "<div class=\"slide-header\">\n            <span class=\"section-tag\">ការរុករកផ្ទាំងឧបករណ៍ក្នុង Studio</span>\n            <h2>ទស្សនកិច្ច Power Apps Studio៖ តំបន់ស្នូលទាំង ៤</h2>\n            <p class=\"subtitle\">ស្គាល់ចំណុចប្រទាក់ច្បាស់លាស់៖ អ្នកមិនចាំបាច់ទន្ទេញប៊ូតុង ១៥០ ទេ—មានតែ ៤ តំបន់ប៉ុណ្ណោះដែលសំខាន់។</p>\n          </div>\n\n          <div class=\"studio-tour-grid\">\n            <div class=\"studio-zone-card zone-ribbon\">\n              <div class=\"zone-badge\">តំបន់ ១ &bull; ខាងលើ</div>\n              <h4>Command Ribbon &amp; របាររូបមន្ត</h4>\n              <p>កន្លែងប្តូរឧបករណ៍ បើកដំណើរការតេស្ត App (<kbd>F5</kbd>) និងជ្រើសរើស Property សម្រាប់សរសេររូបមន្ត Power Fx។</p>\n              <span class=\"zone-action\">គោលបំណង៖ បញ្ជាការងារ &amp; សរសេរកូដ</span>\n            </div>\n\n            <div class=\"studio-zone-card zone-treeview active-zone\">\n              <div class=\"zone-badge\">តំបន់ ២ &bull; បន្ទះខាងឆ្វេង</div>\n              <h4>Tree View (ប្លង់មេស្ថាបត្យកម្ម)</h4>\n              <p>បញ្ជីលំដាប់ថ្នាក់នៃគ្រប់ Screens, Containers និង Controls ទាំងអស់។ បង្ហាញទំនាក់ទំនងមេ-កូន និងលំដាប់ជាន់ (z-order)។</p>\n              <span class=\"zone-action\">គោលបំណង៖ រុករកវត្ថុ &amp; ប្តូរឈ្មោះ</span>\n            </div>\n\n            <div class=\"studio-zone-card zone-canvas\">\n              <div class=\"zone-badge\">តំបន់ ៣ &bull; ចំកណ្តាល</div>\n              <h4>ផ្ទាំងអេក្រង់ Canvas Stage</h4>\n              <p>កន្លែងមើលឃើញផ្ទាល់តំណាងឱ្យអេក្រង់ Tablet ឬទូរស័ព្ទដៃ។ បង្ហាញរូបរាងពិតប្រាកដដែលអ្នកប្រើប្រាស់នឹងឃើញ។</p>\n              <span class=\"zone-action\">គោលបំណង៖ រៀបចំទីតាំង &amp; ទំហំ</span>\n            </div>\n\n            <div class=\"studio-zone-card zone-properties\">\n              <div class=\"zone-badge\">តំបន់ ៤ &bull; បន្ទះខាងស្តាំ</div>\n              <h4>Properties Inspector (ផ្ទាំងកំណត់លក្ខណៈ)</h4>\n              <p>កុងតាក់កំណត់លក្ខណៈនៃ Control ដែលបានរើស៖ Text, Font, Size, Color, DisplayMode, Position និង Advanced Properties។</p>\n              <span class=\"zone-action\">គោលបំណង៖ កំណត់លក្ខណៈ &amp; ទម្រង់</span>\n            </div>\n          </div>"
  },
  {
    "title": "គំរូនាម គុណនាម និងកិរិយាស័ព្ទ (Control-Property Model)",
    "segment": "វគ្គទី ៣៖ ទ្រឹស្តីស្ថាបត្យកម្មស៊ីជម្រៅ",
    "content": "<div class=\"slide-header\">\n            <span class=\"section-tag\">វេយ្យាករណ៍ផ្នត់គំនិត</span>\n            <h2>នាម, គុណនាម, និងកិរិយាស័ព្ទ៖ វេយ្យាករណ៍នៃ Studio</h2>\n            <p class=\"subtitle\">យល់ដឹងពីរបៀបដែលសមាសភាគសូហ្វវែរទាក់ទងគ្នា ដោយប្រើគោលគំនិតភាសាមនុស្សដែលយើងធ្លាប់ស្គាល់។</p>\n          </div>\n\n          <div class=\"grammar-trio-grid\">\n            <div class=\"grammar-card noun-card\">\n              <span class=\"grammar-tag\">នាម (វត្ថុជាក់ស្តែង)</span>\n              <h3>The Control</h3>\n              <p class=\"grammar-desc\">វត្ថុរូបវន្តដែលស្ថិតនៅក្នុងបន្ទប់អេក្រង់។</p>\n              <div class=\"grammar-example\">\n                <code>btnSubmit</code><br>\n                <code>txtProblemDescription</code><br>\n                <code>drpMachineList</code>\n              </div>\n              <span class=\"grammar-rule\">ឆ្លើយសំណួរ៖ \"តើនេះជាវត្ថុអ្វី?\"</span>\n            </div>\n\n            <div class=\"grammar-card adj-card\">\n              <span class=\"grammar-tag\">គុណនាម (ស្ថានភាព/លក្ខណៈ)</span>\n              <h3>The Property</h3>\n              <p class=\"grammar-desc\">លក្ខណៈ រូបរាង ឬកុងតាក់ឥរិយាបថនៅលើវត្ថុនោះ។</p>\n              <div class=\"grammar-example\">\n                <code>.Text</code> &bull; <code>.Fill</code><br>\n                <code>.DisplayMode</code><br>\n                <code>.Visible</code> &bull; <code>.Items</code>\n              </div>\n              <span class=\"grammar-rule\">ឆ្លើយសំណួរ៖ \"តើវាមើលទៅបែបណា ឬធ្វើសកម្មភាពបែបណា?\"</span>\n            </div>\n\n            <div class=\"grammar-card verb-card\">\n              <span class=\"grammar-tag\">កិរិយាស័ព្ទ (សកម្មភាព)</span>\n              <h3>The Formula (Power Fx)</h3>\n              <p class=\"grammar-desc\">Logic ដែលគណនាលទ្ធផល ឬបញ្ជាឱ្យដំណើរការនៅពេលមានព្រឹត្តិការណ៍កើតឡើង។</p>\n              <div class=\"grammar-example\">\n                <code>SubmitForm(frmNewRequest)</code><br>\n                <code>If(IsBlank(txtNotes), Disabled, Edit)</code>\n              </div>\n              <span class=\"grammar-rule\">ឆ្លើយសំណួរ៖ \"តើសកម្មភាព ឬការគណនាអ្វីខ្លះកើតឡើង?\"</span>\n            </div>\n          </div>"
  },
  {
    "title": "ស្តង់ដារដាក់ឈ្មោះ៖ Hungarian Notation",
    "segment": "វគ្គទី ៣៖ ទ្រឹស្តីស្ថាបត្យកម្មស៊ីជម្រៅ",
    "content": "<div class=\"slide-header\">\n            <span class=\"section-tag\">ស្តង់ដារកម្រិតសហគ្រាស</span>\n            <h2>ស្តង់ដារដាក់ឈ្មោះអាជីព៖ Hungarian Notation</h2>\n            <p class=\"subtitle\">មូលហេតុដែល Developer អាជីពមិនដែលទុកឈ្មោះលំនាំដើមដូចជា <code>TextInput1</code> ឬ <code>Button3</code> ឡើយ។</p>\n          </div>\n\n          <div class=\"naming-table-container\">\n            <table class=\"naming-table\">\n              <thead>\n                <tr>\n                  <th>ប្រភេទ Control</th>\n                  <th>បុព្វបទ ៣ អក្សរ</th>\n                  <th>ឈ្មោះខុសដែលមិនគួរប្រើ ❌</th>\n                  <th>ឈ្មោះអាជីពត្រឹមត្រូវ ✅</th>\n                  <th>ហេតុអ្វីបានជាមានសារៈសំខាន់ក្នុងរូបមន្ត</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <td>Screen</td>\n                  <td><code>scr</code></td>\n                  <td>Screen1</td>\n                  <td><code>scrNewRequest</code></td>\n                  <td><code>Navigate(scrNewRequest, Fade)</code> គឺងាយយល់ភ្លាមៗ។</td>\n                </tr>\n                <tr>\n                  <td>Text Input</td>\n                  <td><code>txt</code></td>\n                  <td>TextInput1</td>\n                  <td><code>txtIncidentNotes</code></td>\n                  <td>អ្នកដឹងភ្លាមថាវាជាប្រអប់បញ្ចូលអត្ថបទ មិនមែនជា Label ទេ។</td>\n                </tr>\n                <tr>\n                  <td>Dropdown / Combo</td>\n                  <td><code>drp</code> / <code>cmb</code></td>\n                  <td>Dropdown1</td>\n                  <td><code>drpMachineSelect</code></td>\n                  <td>យោងតាម <code>drpMachineSelect.Selected.Value</code> ដោយមិនច្រឡំ។</td>\n                </tr>\n                <tr>\n                  <td>Label</td>\n                  <td><code>lbl</code></td>\n                  <td>Label1</td>\n                  <td><code>lblHeaderTitle</code></td>\n                  <td>បែងចែកអក្សរសម្រាប់តែអានឱ្យដាច់ពីប្រអប់បញ្ចូលអត្ថបទ។</td>\n                </tr>\n                <tr>\n                  <td>Button</td>\n                  <td><code>btn</code></td>\n                  <td>Button1</td>\n                  <td><code>btnSubmitRequest</code></td>\n                  <td><code>btnSubmitRequest.OnSelect</code> បញ្ជាក់ពីគោលបំណងច្បាស់។</td>\n                </tr>\n                <tr>\n                  <td>Gallery</td>\n                  <td><code>gal</code></td>\n                  <td>Gallery1</td>\n                  <td><code>galIncidentHistory</code></td>\n                  <td><code>galIncidentHistory.Selected</code> សំដៅលើជួរដេកដែលបានជ្រើសរើស។</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>"
  },
  {
    "title": "កម្មវិធីផ្គូផ្គងធាតុក្រដាសទៅ Controls (Widget 1)",
    "segment": "វគ្គទី ៤៖ ការបង្ហាញ & បន្ទប់ពិសោធន៍",
    "content": "<div class=\"slide-header\">\n            <span class=\"section-tag section-tag-accent\">ឧបករណ៍អនុវត្តជាក់ស្តែង</span>\n            <h2>Widget 1: កម្មវិធីបំប្លែងប្លង់ក្រដាសទៅជា Studio Control</h2>\n            <p class=\"subtitle\">ជ្រើសរើសធាតុដែលបានគូរលើក្រដាសពីម្សិលមិញ ដើម្បីមើលឃើញ Control ក្នុង Studio ឈ្មោះ Tree View និង Properties សំខាន់ៗ។</p>\n          </div>\n\n          <div class=\"studio-mapper-layout\">\n            <!-- Left Panel: Wireframe Element Selection -->\n            <div class=\"mapper-left-panel\">\n              <div class=\"panel-header\">\n                <span class=\"panel-icon\">📐</span>\n                <h3>ជំហានទី ១៖ ជ្រើសរើសធាតុគំនូសព្រាង</h3>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"mapper-element-select\">ធាតុគំនូសព្រាងថ្ងៃទី ១២៖</label>\n                <select id=\"mapper-element-select\" class=\"fluent-select\">\n                  <option value=\"app_header\">1. របារចំណងជើងខាងលើ (\"Incident Intake\")</option>\n                  <option value=\"machine_picker\">2. ប្រអប់រើសម៉ាស៊ីន (Press 01–04)</option>\n                  <option value=\"urgency_level\">3. កម្រិតបន្ទាន់ (Low / High / Critical)</option>\n                  <option value=\"incident_desc\">4. ប្រអប់ពណ៌នាការខូចខាត (អត្ថបទវែង)</option>\n                  <option value=\"report_date\">5. កាលបរិច្ឆេទកើតហេតុ / Date Picker</option>\n                  <option value=\"submit_action\">6. ប៊ូតុង \"Submit Maintenance Ticket\" ពណ៌បៃតង</option>\n                  <option value=\"cancel_action\">7. ប៊ូតុង \"Cancel &amp; Return Home\"</option>\n                </select>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"mapper-target-screen\">អេក្រង់គោលដៅក្នុង Studio (<code>scr</code>)៖</label>\n                <input type=\"text\" id=\"mapper-target-screen\" class=\"fluent-input\" value=\"scrNewRequest\" readonly>\n              </div>\n\n              <div class=\"element-preview-card\" id=\"mapper-element-description\">\n                <!-- Dynamically populated by script.js -->\n              </div>\n            </div>\n\n            <!-- Right Panel: Studio Architecture & Properties Output -->\n            <div class=\"mapper-right-panel\">\n              <div class=\"panel-header\">\n                <span class=\"panel-icon\">💻</span>\n                <h3>ជំហានទី ២៖ រចនាសម្ព័ន្ធ Studio ដែលបានបង្កើត</h3>\n              </div>\n\n              <div class=\"spec-inspector-card\">\n                <div class=\"spec-row\">\n                  <span class=\"spec-label\">Control ត្រូវដាក់បញ្ចូល៖</span>\n                  <span class=\"spec-val\" id=\"map-control-type\">Dropdown Control (`drp`)</span>\n                </div>\n                <div class=\"spec-row\">\n                  <span class=\"spec-label\">ឈ្មោះស្តង់ដារក្នុង Tree View៖</span>\n                  <span class=\"spec-val code-val\" id=\"map-control-name\">drpMachineSelect</span>\n                </div>\n                <div class=\"spec-row\">\n                  <span class=\"spec-label\">ក្រុមមុខងារ Control៖</span>\n                  <span class=\"spec-val\" id=\"map-control-family\">Input Control (បញ្ចូលទិន្នន័យ)</span>\n                </div>\n                <div class=\"spec-row\">\n                  <span class=\"spec-label\">Container មេ៖</span>\n                  <span class=\"spec-val\" id=\"map-control-parent\">conFormBody</span>\n                </div>\n              </div>\n\n              <div class=\"property-formula-box\">\n                <span class=\"code-title\">Properties សំខាន់ៗដែលត្រូវកំណត់៖</span>\n                <pre><code id=\"map-control-properties\">// កំពុងចាប់ផ្តើម Properties...</code></pre>\n              </div>\n            </div>\n          </div>"
  },
  {
    "title": "ប្លង់មេអនុវត្តនៅ Apex Plastics",
    "segment": "វគ្គទី ៤៖ ការបង្ហាញ & បន្ទប់ពិសោធន៍",
    "content": "<div class=\"slide-header\">\n            <span class=\"section-tag\">ម៉ាទ្រីសបំប្លែងស្ថាបត្យកម្ម</span>\n            <h2>Apex Plastics៖ ម៉ាទ្រីសពេញលេញពីប្លង់ក្រដាសទៅ Studio</h2>\n            <p class=\"subtitle\">ការបញ្ជាក់លម្អិតបំប្លែងប្លង់កត់ត្រាការខូចខាតរបស់បុប្ផាទៅជាវត្ថុពិតប្រាកដក្នុង Studio។</p>\n          </div>\n\n          <div class=\"blueprint-table-container\">\n            <table class=\"blueprint-matrix-table\">\n              <thead>\n                <tr>\n                  <th>ធាតុលើក្រដាស</th>\n                  <th>Control ក្នុង Studio</th>\n                  <th>ឈ្មោះ Control</th>\n                  <th>Properties សំខាន់ៗ</th>\n                  <th>តម្លៃដែលបានកំណត់ / រូបមន្ត</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <td>ផ្ទាំងអេក្រង់ធំ</td>\n                  <td>Screen</td>\n                  <td><code>scrNewRequest</code></td>\n                  <td>Fill, LoadingScreen</td>\n                  <td><code>RGBA(6, 9, 17, 1)</code></td>\n                </tr>\n                <tr>\n                  <td>របារក្បាលខាងលើ</td>\n                  <td>Horizontal Container</td>\n                  <td><code>conHeader</code></td>\n                  <td>Height, Fill, DropShadow</td>\n                  <td><code>Height = 60, Fill = RGBA(9, 13, 22, 1)</code></td>\n                </tr>\n                <tr>\n                  <td>ចំណងជើង App</td>\n                  <td>Label</td>\n                  <td><code>lblHeaderTitle</code></td>\n                  <td>Text, Font, Size, Color</td>\n                  <td><code>\"Apex Plastics — Incident Intake\"</code></td>\n                </tr>\n                <tr>\n                  <td>ប្រអប់រើសម៉ាស៊ីន</td>\n                  <td>Dropdown</td>\n                  <td><code>drpMachine</code></td>\n                  <td>Items, Default</td>\n                  <td><code>[\"Press-01\", \"Press-02\", \"Press-03\", \"Press-04\"]</code></td>\n                </tr>\n                <tr>\n                  <td>កម្រិតបន្ទាន់</td>\n                  <td>Dropdown</td>\n                  <td><code>drpUrgency</code></td>\n                  <td>Items, Default</td>\n                  <td><code>[\"Low\", \"Medium\", \"High\", \"Critical\"]</code></td>\n                </tr>\n                <tr>\n                  <td>ពណ៌នាការខូចខាត</td>\n                  <td>TextInput</td>\n                  <td><code>txtDescription</code></td>\n                  <td>Mode, HintText, Height</td>\n                  <td><code>Mode = MultiLine, Height = 120</code></td>\n                </tr>\n                <tr>\n                  <td>ប៊ូតុងបញ្ជូន</td>\n                  <td>Button</td>\n                  <td><code>btnSubmitTicket</code></td>\n                  <td>Text, Fill, DisplayMode</td>\n                  <td><code>DisplayMode = If(IsBlank(txtDescription), Disabled, Edit)</code></td>\n                </tr>\n                <tr>\n                  <td>ប៊ូតុងបោះបង់</td>\n                  <td>Button / Icon</td>\n                  <td><code>btnCancel</code></td>\n                  <td>Text, OnSelect</td>\n                  <td><code>Back(ScreenTransition.Fade)</code></td>\n                </tr>\n              </tbody>\n            </table>\n          </div>"
  },
  {
    "title": "អន្ទាក់ Studio គ្រោះថ្នាក់ទាំង ៤ សម្រាប់អ្នកទើបចាប់ផ្តើម",
    "segment": "វគ្គទី ៤៖ ការបង្ហាញ & បន្ទប់ពិសោធន៍",
    "content": "<div class=\"slide-header\">\n            <span class=\"section-tag section-tag-danger\">ការការពារកំហុសជាមុន</span>\n            <h2>អន្ទាក់គ្រោះថ្នាក់ទាំង ៤ ក្នុង Studio (និងវិធីបង្ការ)</h2>\n            <p class=\"subtitle\">ជៀសវាងកំហុសឆ្គងដែលធ្វើឱ្យកម្មវិធីសាមញ្ញប្រែទៅជាសុបិន្តអាក្រក់ដែលមិនអាចកែប្រែបាន។</p>\n          </div>\n\n          <div class=\"traps-grid-4\">\n            <div class=\"trap-card\">\n              <div class=\"trap-header\">\n                <span class=\"trap-badge\">អន្ទាក់ទី ០១</span>\n                <h4>ប្តូរឈ្មោះយឺតពេល</h4>\n              </div>\n              <p class=\"trap-problem\">សាងសង់ដល់ទៅ ១០ អេក្រង់ដោយទុកឈ្មោះលំនាំដើម (<code>TextInput1</code>, <code>Button4</code>) ហើយព្យាយាមប្តូរឈ្មោះតាមក្រោយ។</p>\n              <div class=\"trap-solution\">\n                <strong>វិធីដោះស្រាយ៖</strong> ប្តូរឈ្មោះភ្លាមៗពេលទើបដាក់បញ្ចូលតាមរយៈ <kbd>F2</kbd>។ កុំទុកឈ្មោះលំនាំដើមឱ្យលើសពី ៥ វិនាទី!\n              </div>\n            </div>\n\n            <div class=\"trap-card\">\n              <div class=\"trap-header\">\n                <span class=\"trap-badge\">អន្ទាក់ទី ០២</span>\n                <h4>សរសេរជម្រើសរឹង (Hardcoding)</h4>\n              </div>\n              <p class=\"trap-problem\">វាយបញ្ចូលឈ្មោះម៉ាស៊ីនដោយផ្ទាល់លើ Text Label ឬប៊ូតុង ជំនួសឱ្យការប្រើប្រាស់តារាង Items តែមួយគត់។</p>\n              <div class=\"trap-solution\">\n                <strong>វិធីដោះស្រាយ៖</strong> ភ្ជាប់ Dropdowns ទៅកាន់ Array Table (<code>[\"Press-01\", \"Press-02\"]</code>) ដើម្បីងាយស្រួលកែប្រែតែម្តង។\n              </div>\n            </div>\n\n            <div class=\"trap-card\">\n              <div class=\"trap-header\">\n                <span class=\"trap-badge\">អន្ទាក់ទី ០៣</span>\n                <h4>មិនប្រើប្រាស់ Container</h4>\n              </div>\n              <p class=\"trap-problem\">ទម្លាក់ Controls ផ្ទាល់លើ Canvas ដោយគ្មាន Container ធ្វើឱ្យប៊ូតុង និងប្រអប់រត់ជាន់គ្នាលើអេក្រង់ Tablet។</p>\n              <div class=\"trap-solution\">\n                <strong>វិធីដោះស្រាយ៖</strong> ត្រូវដាក់ Controls ទាំងអស់នៅក្នុង Vertical ឬ Horizontal Containers (<code>conHeader</code>, <code>conFormBody</code>)។\n              </div>\n            </div>\n\n            <div class=\"trap-card\">\n              <div class=\"trap-header\">\n                <span class=\"trap-badge\">អន្ទាក់ទី ០៤</span>\n                <h4>ភ្លេចផ្លូវចាកចេញ (Escape Hatch)</h4>\n              </div>\n              <p class=\"trap-problem\">បង្កើតអេក្រង់ដែលមានតែប៊ូតុង Submit តែគ្មានប៊ូតុង Cancel ឬ Back ធ្វើឱ្យអ្នកប្រើប្រាស់ជាប់គាំង។</p>\n              <div class=\"trap-solution\">\n                <strong>វិធីដោះស្រាយ៖</strong> គ្រប់អេក្រង់ត្រូវតែមាន <code>btnCancel</code> ឬ <code>icnBack</code> ជាមួយរូបមន្ត <code>Back(ScreenTransition.Fade)</code>។\n              </div>\n            </div>\n          </div>"
  },
  {
    "title": "ពិធីសារបង្ហាញការសាងសង់ផ្ទាល់របស់គ្រូ",
    "segment": "វគ្គទី ៤៖ ការបង្ហាញ & បន្ទប់ពិសោធន៍",
    "content": "<div class=\"slide-header\">\n            <span class=\"section-tag section-tag-accent\">ពិធីសារបង្ហាញផ្ទាល់</span>\n            <h2>ការបង្ហាញផ្ទាល់របស់គ្រូ៖ ៤ ជំហានពីក្រដាសទៅ Studio</h2>\n            <p class=\"subtitle\">ទស្សនាគ្រូសាងសង់អេក្រង់កត់ត្រាសំណើរបស់ Apex Plastics ផ្ទាល់ក្នុង Power Apps Studio។</p>\n          </div>\n\n          <div class=\"demo-protocol-steps\">\n            <div class=\"demo-step-card\">\n              <span class=\"demo-step-num\">ជំហានទី ១</span>\n              <h4>ប្តូរឈ្មោះ &amp; រៀបចំអេក្រង់ Canvas</h4>\n              <p>បង្កើត Canvas App ថ្មី។ ជ្រើសរើស <code>Screen1</code> ក្នុង Tree View ចុច <kbd>F2</kbd> ហើយប្តូរឈ្មោះទៅជា <code>scrNewRequest</code>។ កំណត់ពណ៌ផ្ទៃងងឹត។</p>\n              <div class=\"demo-code\">scrNewRequest.Fill = RGBA(6, 9, 17, 1)</div>\n            </div>\n\n            <div class=\"demo-step-card\">\n              <span class=\"demo-step-num\">ជំហានទី ២</span>\n              <h4>ដាក់បញ្ចូល Header &amp; ស្លាកសញ្ញា</h4>\n              <p>ដាក់បញ្ចូល Horizontal Container (<code>conHeader</code>)។ នៅខាងក្នុង ដាក់បញ្ចូល <code>lblHeaderTitle</code> និង <code>icnBack</code>។ តម្រឹមកណ្តាល។</p>\n              <div class=\"demo-code\">lblHeaderTitle.Text = \"Apex Plastics — Incident Intake\"</div>\n            </div>\n\n            <div class=\"demo-step-card\">\n              <span class=\"demo-step-num\">ជំហានទី ៣</span>\n              <h4>ដាក់បញ្ចូល Input Fields ពី Schema ថ្ងៃទី ១១</h4>\n              <p>ដាក់បញ្ចូល Dropdown <code>drpMachine</code> និង <code>drpUrgency</code>។ ដាក់បញ្ចូល <code>txtDescription</code> ជាអក្សរច្រើនបន្ទាត់ជាមួយ HintText ច្បាស់លាស់។</p>\n              <div class=\"demo-code\">txtDescription.Mode = TextMode.MultiLine</div>\n            </div>\n\n            <div class=\"demo-step-card\">\n              <span class=\"demo-step-num\">ជំហានទី ៤</span>\n              <h4>កំណត់ Action Buttons &amp; Logic នៃស្ថានភាព</h4>\n              <p>ដាក់បញ្ចូល <code>btnSubmitTicket</code> និង <code>btnCancel</code>។ កំណត់ DisplayMode នៃប៊ូតុង Submit ឱ្យបិទ (Disabled) ពេលប្រអប់ពណ៌នានៅទំនេរ។</p>\n              <div class=\"demo-code\">DisplayMode = If(IsBlank(txtDescription.Text), Disabled, Edit)</div>\n            </div>\n          </div>"
  },
  {
    "title": "ការអនុវត្តរួមគ្នា៖ សវនកម្មកែកំហុសអេក្រង់រញ៉េរញ៉ៃ",
    "segment": "វគ្គទី ៥៖ ការអនុវត្តជាមួយគ្រូ & ពិសោធន៍",
    "content": "<div class=\"slide-header\">\n            <span class=\"section-tag\">ការត្រួតពិនិត្យរួមគ្នា</span>\n            <h2>ការអនុវត្តរួមគ្នា៖ សវនកម្មកែកំហុសអេក្រង់រញ៉េរញ៉ៃក្នុង Studio</h2>\n            <p class=\"subtitle\">រួមគ្នាជាមួយគ្រូ កំណត់កំហុសធ្ងន់ធ្ងរទាំង ៤ លើអេក្រង់នេះ ហើយកំណត់ដំណោះស្រាយ និង Property ជាក់លាក់។</p>\n          </div>\n\n          <div class=\"audit-workspace-container\">\n            <div class=\"audit-table-wrapper\">\n              <table class=\"audit-matrix-table\">\n                <thead>\n                  <tr>\n                    <th>កំហុសដែលបានរកឃើញ</th>\n                    <th>ទីតាំងដែលលេចឡើង</th>\n                    <th>មូលហេតុដែលវាខូចក្នុងប្រតិបត្តិការ</th>\n                    <th>ដំណោះស្រាយ &amp; Property ត្រូវកែ</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td><span class=\"flaw-pill pill-danger\">កំហុស ១</span> ឈ្មោះខុសស្តង់ដារ</td>\n                    <td>Control មានឈ្មោះ <code>TextInput1_2</code></td>\n                    <td>រូបមន្តមិនអាចដឹងថាតើប្រអប់នេះផ្ទុកទិន្នន័យអ្វីឡើយ។</td>\n                    <td>ប្តូរឈ្មោះទៅជា <code>txtOperatorBadgeID</code> តាម <kbd>F2</kbd>។</td>\n                  </tr>\n                  <tr>\n                    <td><span class=\"flaw-pill pill-danger\">កំហុស ២</span> ប្រើ Control ខុស</td>\n                    <td>ប្រអប់សរសេរអក្សរសម្រាប់រើសម៉ាស៊ីន</td>\n                    <td>កម្មករវាយអក្សរខុស ('press 1' vs 'Press-01') ធ្វើឱ្យខូច Filter។</td>\n                    <td>ប្តូរទៅប្រើ <code>drpMachineSelect</code> (Dropdown)។</td>\n                  </tr>\n                  <tr>\n                    <td><span class=\"flaw-pill pill-danger\">កំហុស ៣</span> កុងត្រាសមើលមិនឃើញ</td>\n                    <td>អក្សរពណ៌ប្រផេះខ្ចីលើប៊ូតុងពណ៌ស</td>\n                    <td>មិនស្របតាមស្តង់ដារ WCAG; កម្មករមើលមិនច្បាស់ក្នុងរោងចក្រភ្លឺ។</td>\n                    <td>កំណត់ <code>Fill = RGBA(0, 120, 212, 1)</code> និង <code>Color = White</code>។</td>\n                  </tr>\n                  <tr>\n                    <td><span class=\"flaw-pill pill-danger\">កំហុស ៤</span> គ្មានផ្លូវចាកចេញ</td>\n                    <td>គ្មានប៊ូតុង Cancel ឬ Back ឡើយ</td>\n                    <td>អ្នកប្រើប្រាស់ដែលច្រឡំចូលនឹងជាប់គាំង ហើយចុច Submit ចោល។</td>\n                    <td>ដាក់បញ្ចូល <code>btnCancel</code> ជាមួយរូបមន្ត <code>Back()</code>។</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n\n            <div class=\"audit-trainer-takeaway\">\n              <strong>វិធានរបស់គ្រូ៖</strong> Developer អាជីពចំណាយពេល ៨០% ក្នុងការទប់ស្កាត់កំហុសស្ថាបត្យកម្ម មុនពេលពួកគេសរសេររូបមន្ត Power Fx សូម្បីតែមួយជួរ!\n            </div>\n          </div>"
  },
  {
    "title": "លំហាត់អនុវត្តផ្ទាល់ខ្លួន៖ QA Scrap Log",
    "segment": "វគ្គទី ៥៖ ការអនុវត្តជាមួយគ្រូ & ពិសោធន៍",
    "content": "<div class=\"slide-header\">\n            <span class=\"section-tag\">ការអនុវត្តផ្ទាល់ខ្លួនសកម្ម</span>\n            <h2>លំហាត់រហ័ស ៣ នាទី៖ កំណត់រចនាសម្ព័ន្ធអេក្រង់ QA Scrap Log</h2>\n            <p class=\"subtitle\">អនុវត្តវិធានបំប្លែងថ្ងៃនេះទៅកាន់ស្ថានភាពជាក់ស្តែងក្នុងរោងចក្រនៅលើសៀវភៅកត់ត្រារបស់អ្នក។</p>\n          </div>\n\n          <div class=\"mini-task-grid\">\n            <div class=\"mini-task-brief-card\">\n              <span class=\"mini-badge\">សេចក្តីសង្ខេបស្ថានភាព</span>\n              <h3>អេក្រង់កត់ត្រាអេតចាយរបស់មន្ត្រី QA</h3>\n              <p>មន្ត្រីត្រួតពិនិត្យគុណភាពឈ្មោះ វណ្ណា ត្រូវការអេក្រង់សម្រាប់កត់ត្រាបំណែកប្លាស្ទិកខូចដែលត្រូវបោះចោលក្នុងធុងអេតចាយពេលផ្លាស់ប្តូរវេន។</p>\n              <div class=\"mini-requirements\">\n                <strong>ធាតុដែលត្រូវការលើប្លង់ក្រដាសរបស់គាត់៖</strong>\n                <ul>\n                  <li>1. លេខសម្គាល់គ្រឿងបន្លាស់ (Part Serial Number - Barcode)</li>\n                  <li>2. ប្រភេទនៃការខូចខាត (Cracked, Warped, Bubble, Short Shot)</li>\n                  <li>3. ចំនួនបំណែកដែលត្រូវបោះចោល (Scrap Quantity - ចំនួនគត់)</li>\n                  <li>4. សកម្មភាពបញ្ជាក់ការកត់ត្រា (Confirm Scrap Submission)</li>\n                </ul>\n              </div>\n            </div>\n\n            <div class=\"mini-task-worksheet-card\">\n              <span class=\"mini-badge badge-accent\">ការប្រកួតប្រជែង ៣ នាទីរបស់អ្នក</span>\n              <h3>ចូរសរសេររចនាសម្ព័ន្ធ Studio របស់អ្នក៖</h3>\n              <div class=\"worksheet-field\">\n                <label>1. ឈ្មោះអេក្រង់ (<code>scr</code>)៖</label>\n                <div class=\"empty-input-line\">_______________________________</div>\n              </div>\n              <div class=\"worksheet-field\">\n                <label>2. Control សម្រាប់ Serial &amp; ឈ្មោះ Hungarian៖</label>\n                <div class=\"empty-input-line\">_______________________________</div>\n              </div>\n              <div class=\"worksheet-field\">\n                <label>3. Control សម្រាប់ប្រភេទខូច &amp; ឈ្មោះ Hungarian៖</label>\n                <div class=\"empty-input-line\">_______________________________</div>\n              </div>\n              <div class=\"worksheet-field\">\n                <label>4. Control សម្រាប់ចំនួន &amp; ឈ្មោះ Hungarian៖</label>\n                <div class=\"empty-input-line\">_______________________________</div>\n              </div>\n              <div class=\"worksheet-field\">\n                <label>5. ឈ្មោះប៊ូតុងបញ្ជាក់ (Confirm Button)៖</label>\n                <div class=\"empty-input-line\">_______________________________</div>\n              </div>\n            </div>\n          </div>"
  },
  {
    "title": "កម្មវិធីពិសោធន៍រោគវិនិច្ឆ័យ Property (Widget 2)",
    "segment": "វគ្គទី ៥៖ ការអនុវត្តជាមួយគ្រូ & ពិសោធន៍",
    "content": "<div class=\"slide-header\">\n            <span class=\"section-tag section-tag-accent\">បន្ទប់ពិសោធន៍រោគវិនិច្ឆ័យ</span>\n            <h2>Widget 2: កម្មវិធីពិសោធន៍រោគវិនិច្ឆ័យ Property ក្នុង Studio</h2>\n            <p class=\"subtitle\">សាកល្បងសមត្ថភាពដោះស្រាយបញ្ហារបស់អ្នកឆ្លងកាត់ ៦ ស្ថានភាពជាក់ស្តែង។ តើ Property មួយណាត្រូវតែកែសម្រួល?</p>\n          </div>\n\n          <div class=\"sim-workbench-container\">\n            <!-- Scenario Card -->\n            <div class=\"sim-scenario-card\">\n              <div class=\"sim-card-header\">\n                <span class=\"sim-badge\" id=\"sim-scenario-num\">ស្ថានភាពទី ១ នៃ ៦</span>\n                <span class=\"sim-score-pill\">ពិន្ទុ៖ <strong id=\"sim-score\">0</strong> / 6</span>\n              </div>\n              <h3 id=\"sim-scenario-title\">1. បញ្ហាប៊ូតុង Submit មិនដំណើរការ (Disabled)</h3>\n              <p id=\"sim-scenario-desc\">បុគ្គលិកបុប្ផាបានបំពេញគ្រប់ប្រអប់ចាំបាច់ទាំងអស់ ប៉ុន្តែប៊ូតុង Submit នៅតែមានពណ៌ប្រផេះ ហើយមិនអាចចុចបាន។ តើ Property មួយណាលើ `btnSubmit` ជាអ្នកគ្រប់គ្រងថាប៊ូតុងអាចចុចបាន ឬមិនបាន?</p>\n\n              <div class=\"sim-options-grid\">\n                <button class=\"sim-choice-btn\" data-choice=\"DisplayMode\">\n                  <span class=\"choice-icon\">🔘</span>\n                  <span><code>DisplayMode</code> (Edit vs Disabled vs View)</span>\n                </button>\n                <button class=\"sim-choice-btn\" data-choice=\"Visible\">\n                  <span class=\"choice-icon\">👁️</span>\n                  <span><code>Visible</code> (true vs false)</span>\n                </button>\n                <button class=\"sim-choice-btn\" data-choice=\"Text\">\n                  <span class=\"choice-icon\">🔤</span>\n                  <span><code>Text</code> (\"Submit\")</span>\n                </button>\n              </div>\n\n              <div class=\"sim-feedback-box\" id=\"sim-feedback\" style=\"display: none;\"></div>\n\n              <div class=\"sim-nav-row\">\n                <button class=\"fluent-btn-secondary\" id=\"sim-prev-btn\" disabled>&larr; ស្ថានភាពមុន</button>\n                <span class=\"sim-progress-indicator\" id=\"sim-progress-text\">ស្ថានភាពទី ១ នៃ ៦</span>\n                <button class=\"fluent-btn-primary\" id=\"sim-next-btn\">ស្ថានភាពបន្ទាប់ &rarr;</button>\n              </div>\n            </div>\n          </div>"
  },
  {
    "title": "ការយល់ច្រឡំគ្រោះថ្នាក់ទាំង ៤ ក្នុង Studio",
    "segment": "វគ្គទី ៥៖ ការអនុវត្តជាមួយគ្រូ & ពិសោធន៍",
    "content": "<div class=\"slide-header\">\n            <span class=\"section-tag section-tag-danger\">របាំងការពារផ្នត់គំនិត</span>\n            <h2>ការយល់ច្រឡំគ្រោះថ្នាក់ទាំង ៤ អំពី Power Apps Studio</h2>\n            <p class=\"subtitle\">ពិនិត្យមើលគំរូយល់ខុសដែលអ្នកចាប់ផ្តើមតែងតែជួបប្រទះ និងទទួលយកគំរូផ្នត់គំនិតត្រឹមត្រូវរបស់អាជីព។</p>\n          </div>\n\n          <div class=\"misconceptions-grid\">\n            <div class=\"misconception-card\">\n              <div class=\"mis-wrong\">\n                <span class=\"mis-badge badge-wrong\">គំរូយល់ខុសដែលអាចកើតមាន ❌</span>\n                <h4>\"Power Apps គឺគ្រាន់តែជាការអូសទម្លាក់ដូចគូរលើ PowerPoint។\"</h4>\n                <p>ជឿជាក់ថា Controls គឺជារូបភាពស្ងៀមស្ងាត់ដែលដាក់តាមភ្នែកមើលឃើញថាស្អាត។</p>\n              </div>\n              <div class=\"mis-right\">\n                <span class=\"mis-badge badge-right\">ការកែតម្រូវរបស់គ្រូ ✅</span>\n                <h4>Power Apps គឺជាម៉ាស៊ីនដំណើរការស្ថានភាព (State Machine)។</h4>\n                <p>គ្រប់ Control គឺជាច្រកទិន្នន័យរស់រវើកដែលមានជាង ៤០ Properties ដែលគណនារូបមន្ត ស្តាប់ព្រឹត្តិការណ៍ និងភ្ជាប់ទៅកាន់ទិន្នន័យ Database។</p>\n              </div>\n            </div>\n\n            <div class=\"misconception-card\">\n              <div class=\"mis-wrong\">\n                <span class=\"mis-badge badge-wrong\">គំរូយល់ខុសដែលអាចកើតមាន ❌</span>\n                <h4>\"ឈ្មោះលំនាំដើមដូចជា `TextInput1` មិនសំខាន់ទេ។\"</h4>\n                <p>ជឿជាក់ថាអាចសាងសង់ App ទាំងមូលសិន ហើយចាំប្តូរឈ្មោះ Controls តាមក្រោយ។</p>\n              </div>\n              <div class=\"mis-right\">\n                <span class=\"mis-badge badge-right\">ការកែតម្រូវរបស់គ្រូ ✅</span>\n                <h4>ឈ្មោះគឺជាអថេរ (Variables) ក្នុងកូដរបស់អ្នក។</h4>\n                <p>រូបមន្តនៅថ្ងៃទី ១៥–២០ នឹងយោងតាមឈ្មោះ Controls ផ្ទាល់។ បើអ្នកទុកឈ្មោះលំនាំដើម រូបមន្តរបស់អ្នកនឹងមិនអាចអានបាន ហើយងាយបង្កកំហុសធ្ងន់ធ្ងរ។</p>\n              </div>\n            </div>\n\n            <div class=\"misconception-card\">\n              <div class=\"mis-wrong\">\n                <span class=\"mis-badge badge-wrong\">គំរូយល់ខុសដែលអាចកើតមាន ❌</span>\n                <h4>\"Properties គឺគ្រាន់តែជាការកំណត់ពណ៌ និងម៉ូដប៉ុណ្ណោះ។\"</h4>\n                <p>ជឿជាក់ថា Properties ទុកសម្រាប់តែកំណត់ពណ៌ គម្លាត និងទំហំអក្សរ។</p>\n              </div>\n              <div class=\"mis-right\">\n                <span class=\"mis-badge badge-right\">ការកែតម្រូវរបស់គ្រូ ✅</span>\n                <h4>Properties គឺជាការគណនាបត់បែនក្នុងពេលជាក់ស្តែង។</h4>\n                <p>Property អាចផ្ទុក Logic ស្មុគស្មាញ៖ <code>btnSubmit.DisplayMode = If(IsBlank(txtNotes), Disabled, Edit)</code>។ វាគណនាដោយស្វ័យប្រវត្ត!</p>\n              </div>\n            </div>\n\n            <div class=\"misconception-card\">\n              <div class=\"mis-wrong\">\n                <span class=\"mis-badge badge-wrong\">គំរូយល់ខុសដែលអាចកើតមាន ❌</span>\n                <h4>\"បើ Control ខូច គ្រាន់តែលុបចោលហើយដាក់ថ្មីទៅបានហើយ។\"</h4>\n                <p>លុប Controls ចោលរាល់ពេលដែលឃើញរូបមន្តបង្ហាញបន្ទាត់ក្រហម Error។</p>\n              </div>\n              <div class=\"mis-right\">\n                <span class=\"mis-badge badge-right\">ការកែតម្រូវរបស់គ្រូ ✅</span>\n                <h4>ការលុបបណ្តាលឱ្យខូចខ្សែសង្វាក់យោង (Cascade Errors)។</h4>\n                <p>ការលុបវត្ថុមួយនឹងធ្វើឱ្យគ្រប់រូបមន្តដែលចង្អុលទៅវារលាយបាត់។ ចូរស្វែងរក Property ជាក់លាក់ដើម្បីដោះស្រាយ ជាជាងការលុបវត្ថុចោល។</p>\n              </div>\n            </div>\n          </div>"
  },
  {
    "title": "តេស្តវាស់ស្ទង់សមត្ថភាព ៥ សំណួរ (Widget 3)",
    "segment": "វគ្គទី ៦៖ វាយតម្លៃ & ស្ពានទៅមុខ",
    "content": "<div class=\"slide-header\">\n            <span class=\"section-tag section-tag-accent\">ការវាយតម្លៃផ្លូវការ</span>\n            <h2>តេស្តវាស់ស្ទង់៖ សំណួរវាយតម្លៃភាពស្ទាត់ជំនាញចំនួន ៥</h2>\n            <p class=\"subtitle\">រួមបញ្ចូលទាំងការចងចាំគោលគំនិត ការគិតតាមស្ថាបត្យកម្ម និងការវិភាគកំហុសក្នុងពិភពពិត។</p>\n          </div>\n\n          <div class=\"quiz-container\" id=\"quiz-widget\">\n            <div class=\"quiz-card\">\n              <div class=\"quiz-header\">\n                <span class=\"quiz-q-counter\" id=\"quiz-question-counter\">សំណួរទី ១ នៃ ៥</span>\n                <span class=\"quiz-score-pill\">ពិន្ទុស្ទាត់ជំនាញ៖ <strong id=\"quiz-score-display\">0</strong> / 5</span>\n              </div>\n\n              <h3 class=\"quiz-title\" id=\"quiz-title\">កំពុងទាញយកសំណួរ...</h3>\n              <div class=\"quiz-options-grid\" id=\"quiz-options\">\n                <!-- Injected dynamically by script.js -->\n              </div>\n\n              <div class=\"quiz-feedback-box\" id=\"quiz-feedback\" style=\"display: none;\"></div>\n\n              <div class=\"quiz-nav-row\">\n                <button class=\"fluent-btn-secondary\" id=\"quiz-prev-btn\" disabled>&larr; សំណួរមុន</button>\n                <button class=\"fluent-btn-primary\" id=\"quiz-next-btn\">សំណួរបន្ទាប់ &rarr;</button>\n              </div>\n            </div>\n          </div>"
  },
  {
    "title": "បេសកកម្ម Capstone Challenge",
    "segment": "វគ្គទី ៦៖ វាយតម្លៃ & ស្ពានទៅមុខ",
    "content": "<div class=\"slide-header\">\n            <span class=\"section-tag section-tag-accent\">គម្រោងអនុវត្តចុងក្រោយ</span>\n            <h2>បេសកកម្ម Capstone ថ្ងៃទី ១៣៖ សាងសង់អេក្រង់កត់ត្រាសំណើ</h2>\n            <p class=\"subtitle\">បំប្លែងប្លង់ក្រដាសថ្ងៃទី ១២ ទៅជារចនាសម្ព័ន្ធស្ថាបត្យកម្មក្នុង Studio និងលំដាប់ថ្នាក់ក្នុង Tree View។</p>\n          </div>\n\n          <div class=\"capstone-brief-grid\">\n            <div class=\"capstone-brief-card\">\n              <span class=\"capstone-badge\">បេសកកម្មគម្រោង</span>\n              <h3>អេក្រង់កត់ត្រាការខូចខាតម៉ាស៊ីននៅ Apex Plastics (`scrNewRequest`)</h3>\n              <p>អ្នកត្រូវបានតែងតាំងជា Citizen Developer ផ្លូវការសម្រាប់រោងចក្រ Apex Plastics។ អ្នកត្រូវបំប្លែងគំនូសព្រាងលើក្រដាសសម្រាប់ការខូចខាតម៉ាស៊ីនចាក់ពុម្ព ទៅជាលក្ខណៈបច្ចេកទេសក្នុង Canvas Studio។</p>\n              <div class=\"capstone-deliverables-list\">\n                <strong>លទ្ធផលស្នូលទាំង ៤ របស់អ្នក៖</strong>\n                <ol>\n                  <li><strong>ស្ថាបត្យកម្ម Tree View៖</strong> រៀបចំវត្ថុចូលទៅក្នុង <code>conHeader</code>, <code>conFormBody</code>, និង <code>conActions</code>។</li>\n                  <li><strong>ការដាក់ឈ្មោះ Hungarian៖</strong> អនុវត្តបុព្វបទត្រឹមត្រូវ ១០០% (<code>scr</code>, <code>lbl</code>, <code>drp</code>, <code>txt</code>, <code>btn</code>)។</li>\n                  <li><strong>ការផ្គូផ្គង Controls៖</strong> ផ្គូផ្គងឈ្មោះម៉ាស៊ីន និងកម្រិតបន្ទាន់ទៅ Dropdowns; ផ្គូផ្គងសេចក្តីលម្អិតទៅ MultiLine TextInput។</li>\n                  <li><strong>ការបង្កើត Property៖</strong> បង្កើតវិធាន <code>DisplayMode</code> ដើម្បីបិទការ Submit ពេលដែលប្រអប់ពណ៌នានៅទំនេរ។</li>\n                </ol>\n              </div>\n            </div>\n\n            <div class=\"capstone-standards-card\">\n              <span class=\"capstone-badge badge-accent\">បញ្ជីត្រួតពិនិត្យស្តង់ដារឧស្សាហកម្ម</span>\n              <div class=\"checklist-items\">\n                <div class=\"check-item\">\n                  <span class=\"check-box\">&check;</span>\n                  <span>គ្មានឈ្មោះលំនាំដើមសូម្បីតែមួយ (គ្មាន <code>Button1</code>, <code>TextInput1</code>)។</span>\n                </div>\n                <div class=\"check-item\">\n                  <span class=\"check-box\">&check;</span>\n                  <span>កម្រិតកុងត្រាសពណ៌ &ge; 4.5:1 លើគ្រប់អក្សរ និងប៊ូតុងទាំងអស់។</span>\n                </div>\n                <div class=\"check-item\">\n                  <span class=\"check-box\">&check;</span>\n                  <span>មាន HintText ណែនាំច្បាស់លាស់លើគ្រប់ប្រអប់បញ្ចូលអត្ថបទវែង។</span>\n                </div>\n                <div class=\"check-item\">\n                  <span class=\"check-box\">&check;</span>\n                  <span>មានផ្លូវចាកចេញច្បាស់លាស់ (<code>btnCancel</code> ជាមួយការបញ្ជូន <code>Back()</code>)។</span>\n                </div>\n              </div>\n            </div>\n          </div>"
  },
  {
    "title": "ដំណោះស្រាយគំរូ & តារាងវាយតម្លៃ Rubric (Widget 4)",
    "segment": "វគ្គទី ៦៖ វាយតម្លៃ & ស្ពានទៅមុខ",
    "content": "<div class=\"slide-header\">\n            <span class=\"section-tag section-tag-accent\">ការវាយតម្លៃ &amp; Rubric</span>\n            <h2>Widget 4: ដំណោះស្រាយគំរូក្នុង Studio &amp; តារាងវាយតម្លៃ ៤ កម្រិត</h2>\n            <p class=\"subtitle\">បង្ហាញលក្ខណៈបច្ចេកទេសរបស់ស្ថាបត្យករសហគ្រាស និងវាយតម្លៃការងាររបស់អ្នកធៀបនឹងស្តង់ដារ Citizen Developer ឧស្សាហកម្ម។</p>\n          </div>\n\n          <div class=\"solution-rubric-container\">\n            <!-- Reveal Button -->\n            <div class=\"solution-toggle-bar\">\n              <button class=\"fluent-btn-primary\" id=\"btn-reveal-solution\">\n                <span id=\"solution-btn-icon\">👁️</span>\n                <span id=\"solution-btn-text\">បង្ហាញគំរូ Tree View &amp; Properties ក្នុង Studio</span>\n              </button>\n            </div>\n\n            <!-- Benchmark Solution Drawer (Collapsed by default) -->\n            <div class=\"solution-content-drawer collapsed\" id=\"solution-content\">\n              <div class=\"benchmark-treeview-box\">\n                <h4>ស្ថាបត្យកម្ម Tree View គំរូស្តង់ដារ (`scrNewRequest`)៖</h4>\n                <pre><code>scrNewRequest\n  ├── conHeader (Horizontal Container, Height: 60)\n  │     ├── icnAppLogo (Icon, 32x32)\n  │     └── lblHeaderTitle (Label, Text: \"Apex Plastics — Incident Intake\")\n  ├── conFormBody (Vertical Container, Align: Stretch)\n  │     ├── lblMachineSelect (Label, Text: \"Select Machine:\")\n  │     ├── drpMachine (Dropdown, Items: [\"Press-01\", \"Press-02\", \"Press-03\", \"Press-04\"])\n  │     ├── lblUrgency (Label, Text: \"Urgency Level:\")\n  │     ├── drpUrgency (Dropdown, Items: [\"Low\", \"Medium\", \"High\", \"Critical\"])\n  │     ├── lblDescription (Label, Text: \"Incident Symptoms / Observations:\")\n  │     └── txtDescription (TextInput, Mode: MultiLine, Height: 120, HintText: \"Enter noise, pressure...\")\n  └── conActions (Horizontal Container, Justify: End)\n        ├── btnCancel (Button, Text: \"Cancel\", OnSelect: Back(ScreenTransition.Fade))\n        └── btnSubmitTicket (Button, Text: \"Submit Ticket\", DisplayMode: If(IsBlank(txtDescription.Text), Disabled, Edit))</code></pre>\n              </div>\n\n              <!-- 4-Tier Rubric Grid -->\n              <div class=\"rubric-matrix-grid\">\n                <div class=\"rubric-card tier-1\">\n                  <span class=\"tier-badge\">កម្រិត ១៖ ចាប់ផ្តើមដំបូង</span>\n                  <p>ទុកឈ្មោះលំនាំដើម (<code>TextInput1</code>); ដាក់ Controls រាយប៉ាយគ្មាន Container; គ្មានការកំណត់ <code>DisplayMode</code>។</p>\n                </div>\n                <div class=\"rubric-card tier-2\">\n                  <span class=\"tier-badge\">កម្រិត ២៖ កំពុងអភិវឌ្ឍ</span>\n                  <p>ដាក់ឈ្មោះបានខ្លះ; ប្រើប្រអប់សរសេរអក្សរសម្រាប់រើសម៉ាស៊ីន; គ្មាន HintText លើប្រអប់ពណ៌នា។</p>\n                </div>\n                <div class=\"rubric-card tier-3\">\n                  <span class=\"tier-badge\">កម្រិត ៣៖ ស្ទាត់ជំនាញ</span>\n                  <p>ប្រើឈ្មោះ Hungarian ១០០%; ប្រើ Dropdown សម្រាប់ជម្រើស; កំណត់ MultiLine; មានប៊ូតុង Cancel ត្រឹមត្រូវ។</p>\n                </div>\n                <div class=\"rubric-card tier-4 active-tier\">\n                  <span class=\"tier-badge\">កម្រិត ៤៖ ស្ថាបត្យករសហគ្រាស</span>\n                  <p>រៀបចំលំដាប់ថ្នាក់ ៣ Containers យ៉ាងឥតខ្ចោះ (<code>conHeader</code>, <code>conFormBody</code>, <code>conActions</code>); មានលក្ខខណ្ឌ <code>DisplayMode</code> ត្រឹមត្រូវ; កុងត្រាស &ge; 4.5:1។</p>\n                </div>\n              </div>\n            </div>\n          </div>"
  },
  {
    "title": "ការរំលឹកឡើងវិញ & កិច្ចការផ្ទះ",
    "segment": "វគ្គទី ៦៖ វាយតម្លៃ & ស្ពានទៅមុខ",
    "content": "<div class=\"slide-header\">\n            <span class=\"section-tag\">ការអនុវត្តពង្រឹងចំណេះដឹង</span>\n            <h2>ការរំលឹកឡើងវិញ ១៥ នាទី &amp; កិច្ចការផ្ទះ</h2>\n            <p class=\"subtitle\">ពង្រឹងគំរូផ្នត់គំនិត Studio ថ្ងៃនេះឱ្យកាន់តែរឹងមាំ មុនពេលយើងឈានដល់ការភ្ជាប់ទិន្នន័យផ្ទាល់នៅថ្ងៃស្អែក។</p>\n          </div>\n\n          <div class=\"homework-container\">\n            <div class=\"homework-card\">\n              <div class=\"hw-icon\">📱</div>\n              <h3>លំហាត់ពិនិត្យ Properties លើកម្មវិធី Web App</h3>\n              <p>បើក Microsoft Outlook Web, Teams ឬ Web App ណាមួយដែលអ្នកប្រើប្រាស់ជាប្រចាំនៅកន្លែងធ្វើការ៖</p>\n              <div class=\"hw-steps\">\n                <div class=\"hw-step-item\">\n                  <span class=\"hw-bullet\">1</span>\n                  <span>ស្វែងរក <strong>Input Control</strong> មួយ (ដូចជាប្រអប់ Search ឬប្រអប់សរសេរ Email)។ តើឈ្មោះ Hungarian របស់វាជាអ្វី? (ឧ. <code>txtSearchBar</code>)។</span>\n                </div>\n                <div class=\"hw-step-item\">\n                  <span class=\"hw-bullet\">2</span>\n                  <span>សង្កេតមើលថាតើ Property មួយណាប្រែប្រួលលើប៊ូតុង \"Send\" នៅពេលប្រអប់ Email នៅទំនេរ ធៀបនឹងពេលដែលអ្នកវាយអត្ថបទរួច។</span>\n                </div>\n                <div class=\"hw-step-item\">\n                  <span class=\"hw-bullet\">3</span>\n                  <span>កំណត់ <strong>រចនាសម្ព័ន្ធ Tree View</strong> នៃបញ្ជី Email៖ Container &rarr; Row &rarr; Sender Label + Subject Label + Date Label។</span>\n                </div>\n                <div class=\"hw-step-item\">\n                  <span class=\"hw-bullet\">4</span>\n                  <span>គូសព្រាងអេក្រង់សន្មតមួយសម្រាប់កក់បន្ទប់ប្រជុំ និងរាយបញ្ជី Controls និង Properties ទាំងអស់។</span>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"trainer-quote-card\">\n              <span class=\"quote-sparkle\">✨</span>\n              <p class=\"quote-text\">\"ស្ថាបត្យករ App ដ៏ឆ្នើមមិនដែលមើលឃើញប៊ូតុង និងប្រអប់អត្ថបទជាការតុបតែងលម្អនោះឡើយ។ ពួកគេមើលឃើញក្រុមតន្ត្រីនៃនាម និងគុណនាមដែលកំពុងរង់ចាំដំបងបញ្ជាចង្វាក់របស់មេដឹកនាំ។\"</p>\n              <span class=\"quote-author\">— កំណត់ចំណាំពីគ្រូបណ្តុះបណ្តាល Power Apps Foundation</span>\n            </div>\n          </div>"
  },
  {
    "title": "ស្ពានតភ្ជាប់ទៅថ្ងៃទី ១៤",
    "segment": "វគ្គទី ៦៖ វាយតម្លៃ & ស្ពានទៅមុខ",
    "content": "<div class=\"slide-header\">\n            <span class=\"section-tag section-tag-accent\">ស្ពានតភ្ជាប់ទៅមុខ</span>\n            <h2>កន្លែងដែលយើងបានឆ្លងកាត់ &amp; កន្លែងដែលយើងនឹងទៅដល់នៅថ្ងៃស្អែក</h2>\n            <p class=\"subtitle\">ថ្ងៃស្អែកក្នុងថ្ងៃទី ១៤ យើងនឹងបញ្ចូលជីវិតទិន្នន័យទៅកាន់ Controls របស់យើង៖ Controls ប្រមូល &amp; បង្ហាញទិន្នន័យ!</p>\n          </div>\n\n          <div class=\"three-day-bridge-grid\">\n            <div class=\"bridge-card bridge-yesterday\">\n              <span class=\"bridge-day\">ម្សិលមិញ (ថ្ងៃទី ១២)</span>\n              <h4>ពីដំណើរការ + ទិន្នន័យ ទៅជាអេក្រង់</h4>\n              <p>បំបែកភារកិច្ចមនុស្សទៅតាមអេក្រង់ជាក់លាក់លើក្រដាស បង្កើតទម្រង់សហគ្រាស ៤ អេក្រង់ និងកំណត់ផ្លូវ Feedback។</p>\n              <div class=\"bridge-footer\">គោលគំនិត៖ Task &rarr; Paper Wireframes</div>\n            </div>\n\n            <div class=\"bridge-card bridge-today\">\n              <span class=\"bridge-day active-day\">ថ្ងៃនេះ (ថ្ងៃទី ១៣)</span>\n              <h4>Power Apps Studio៖ បំប្លែងទៅជា Controls</h4>\n              <p>ស្គាល់តំបន់ទាំង ៤ ក្នុង Studio អនុវត្តឈ្មោះ Hungarian (<code>scr</code>, <code>txt</code>, <code>btn</code>) បំប្លែងគំនូសព្រាងទៅ Controls និងកំណត់ Properties។</p>\n              <div class=\"bridge-footer\">គោលគំនិត៖ Paper &rarr; Studio Controls &amp; Properties</div>\n            </div>\n\n            <div class=\"bridge-card bridge-tomorrow\">\n              <span class=\"bridge-day\">ថ្ងៃស្អែក (ថ្ងៃទី ១៤)</span>\n              <h4>Controls ប្រមូល &amp; បង្ហាញទិន្នន័យ</h4>\n              <p>យើងនឹងភ្ជាប់ Controls ទាំងនេះទៅកាន់ប្រភពទិន្នន័យពិតប្រាកដ! អ្នកនឹងរៀនពីរបៀបដែល Galleries បង្ហាញ Records និងរបៀបដែល Forms រក្សាទុកទិន្នន័យ!</p>\n              <div class=\"bridge-footer\">គោលគំនិត៖ Studio Controls &rarr; Live Data Binding</div>\n            </div>\n          </div>\n\n          <div class=\"bridge-conclusion-banner\">\n            <strong>សូមអបអរសាទរចំពោះការបញ្ចប់ថ្ងៃទី ១៣ ដោយជោគជ័យ!</strong>\n            <span>គ្រឹះ Canvas Studio របស់អ្នកត្រូវបានបង្កើតឡើងយ៉ាងរឹងមាំហើយ។ ថ្ងៃស្អែក យើងនឹងភ្ជាប់ Controls ទាំងនេះទៅកាន់ប្រភពទិន្នន័យក្នុងថ្ងៃទី ១៤!</span>\n          </div>"
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

    // Init interactive widgets
    initRetrievalCards();
    initStudioMapper();
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

    // Stage click advances slide, ignoring interactive components
    const stage = document.getElementById('presentation-stage');
    if (stage) {
      stage.addEventListener('click', (e) => {
        if (e.target.closest('button, select, input, textarea, a, .retrieval-card, .overview-card, .quiz-opt-btn, .sim-choice-btn, .notes-drawer, .overview-modal, .mapper-left-panel, .mapper-right-panel, .studio-mapper-layout, .trainer-notes-panel')) {
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

    const titleEn = currentSlide.getAttribute('data-title') || 'Day 13: Power Apps Studio';
    const segmentEn = currentSlide.getAttribute('data-segment') || 'Part 1: Orientation';

    const titleKh = KHMER_SLIDES[currentSlideIndex] ? KHMER_SLIDES[currentSlideIndex].title : titleEn;
    const segmentKh = KHMER_SLIDES[currentSlideIndex] ? KHMER_SLIDES[currentSlideIndex].segment : segmentEn;

    if (titleEl) {
      titleEl.textContent = isKhmerActive ? titleKh : titleEn;
    }

    if (segmentEl) {
      segmentEl.textContent = isKhmerActive ? segmentKh : segmentEn;
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
      const pct = ((currentSlideIndex + 1) / totalSlides) * 100;
      progressFill.style.width = `${pct}%`;
    }
  }

  // --------------------------------------------------------------------------
  // 6. BILINGUAL LANGUAGE ENGINE (ENGLISH / KHMER)
  // --------------------------------------------------------------------------
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
    const heroBtn = document.getElementById('hero-start-btn');
    if (heroBtn) {
      heroBtn.addEventListener('click', () => goToSlide(1));
    }

    initRetrievalCards();
    initStudioMapper();
    initSimulator();
    initQuiz();
    initCapstoneSolution();
  }

  // --------------------------------------------------------------------------
  // 7. KEYBOARD SHORTCUTS
  // --------------------------------------------------------------------------
  function initKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Don't intercept when user is typing in form inputs
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        return;
      }

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

        case 'KeyL':
          e.preventDefault();
          toggleLanguage();
          break;

        case 'KeyN':
          e.preventDefault();
          toggleNotes();
          break;

        case 'KeyP':
          e.preventDefault();
          toggleLaserPointer();
          break;

        case 'KeyO':
        case 'KeyG':
          e.preventDefault();
          toggleOverview();
          break;

        case 'KeyF':
          e.preventDefault();
          toggleFullscreen();
          break;

        case 'Escape':
          closeOverview();
          closeNotes();
          break;
      }
    });
  }

  // --------------------------------------------------------------------------
  // 8. HEADER CONTROLS (FULLSCREEN, LASER, NOTES, OVERVIEW)
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
  // 9. 90-MINUTE LIVE SESSION TIMER
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
    const segmentBadge = document.getElementById('current-segment-name');
    if (!segmentBadge) return;

    const mins = Math.floor(elapsedSeconds / 60);
    let segTextEn = 'Part 1: Orientation & Connected Spiral (00:00 - 10:00)';
    let segTextKh = 'វគ្គទី ១៖ ការតម្រង់ទិស & រំលឹកចំណេះដឹង (០០:០០ - ១០:០០)';

    if (mins >= 75) {
      segTextEn = 'Part 6: Assess & Bridge (75:00 - 90:00)';
      segTextKh = 'វគ្គទី ៦៖ វាយតម្លៃ & ស្ពានទៅមុខ (៧៥:០០ - ៩០:០០)';
    } else if (mins >= 60) {
      segTextEn = 'Part 5: Guided Practice (60:00 - 75:00)';
      segTextKh = 'វគ្គទី ៥៖ ការអនុវត្តជាមួយគ្រូ & ពិសោធន៍ (៦០:០០ - ៧៥:០០)';
    } else if (mins >= 45) {
      segTextEn = 'Part 4: Demonstrate & Lab (45:00 - 60:00)';
      segTextKh = 'វគ្គទី ៤៖ បង្ហាញផ្ទាល់ & កម្មវិធីសាកល្បង (៤៥:០០ - ៦០:០០)';
    } else if (mins >= 25) {
      segTextEn = 'Part 3: Deep Dive Theory (25:00 - 45:00)';
      segTextKh = 'វគ្គទី ៣៖ ទ្រឹស្តីស្ថាបត្យកម្មស៊ីជម្រៅ (២៥:០០ - ៤៥:០០)';
    } else if (mins >= 10) {
      segTextEn = 'Part 2: Discover (The Why) (10:00 - 25:00)';
      segTextKh = 'វគ្គទី ២៖ ស្វែងយល់ពីមូលហេតុ (១០:០០ - ២៥:០០)';
    }

    segmentBadge.textContent = isKhmerActive ? segTextKh : segTextEn;
  }

  // --------------------------------------------------------------------------
  // 10. TRAINER NOTES DRAWER
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
  // 11. SLIDE OVERVIEW GRID NAVIGATOR (24 CARDS)
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
  // 12. PRESENTER FOCUS LASER POINTER & MOUSE SPOTLIGHT ENGINE
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
      laserBtn.style.color = isLaserActive ? '#ff4d4d' : 'var(--text-muted)';
      laserBtn.classList.toggle('active-tool', isLaserActive);
    }
  }

  // --------------------------------------------------------------------------
  // 13. RETRIEVAL CARDS HANDLER (SLIDE 5)
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

  // --------------------------------------------------------------------------
  // 14. INTERACTIVE WIDGET 1: WIREFRAME TO STUDIO CONTROL MAPPER
  // --------------------------------------------------------------------------
  function initStudioMapper() {
    const selectEl = document.getElementById('mapper-element-select');
    if (!selectEl) return;

    const newSelect = selectEl.cloneNode(true);
    selectEl.parentNode.replaceChild(newSelect, selectEl);

    newSelect.addEventListener('change', () => {
      updateStudioMapper(newSelect.value);
    });

    updateStudioMapper(newSelect.value);
  }

  function updateStudioMapper(elementKey) {
    const data = MAPPER_DATA[elementKey] || MAPPER_DATA.machine_picker;

    const descEl = document.getElementById('mapper-element-description');
    const typeEl = document.getElementById('map-control-type');
    const nameEl = document.getElementById('map-control-name');
    const familyEl = document.getElementById('map-control-family');
    const parentEl = document.getElementById('map-control-parent');
    const propsEl = document.getElementById('map-control-properties');

    if (descEl) descEl.textContent = isKhmerActive ? data.descKh : data.descEn;
    if (typeEl) typeEl.textContent = isKhmerActive ? data.controlTypeKh : data.controlTypeEn;
    if (nameEl) nameEl.textContent = data.controlName;
    if (familyEl) familyEl.textContent = isKhmerActive ? data.familyKh : data.familyEn;
    if (parentEl) parentEl.textContent = data.parentContainer;
    if (propsEl) propsEl.textContent = isKhmerActive ? data.propertiesKh : data.propertiesEn;
  }

  // --------------------------------------------------------------------------
  // 15. INTERACTIVE WIDGET 2: STUDIO PROPERTY DIAGNOSTIC SIMULATOR
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

    if (scoreEl) scoreEl.textContent = String(simScore);
    if (badgeEl) badgeEl.textContent = isKhmerActive ? `ស្ថានភាពទី ${currentSimIndex + 1}` : sc.num;
    if (titleEl) titleEl.textContent = isKhmerActive ? sc.titleKh : sc.titleEn;
    if (descEl) descEl.textContent = isKhmerActive ? sc.descKh : sc.descEn;

    if (feedbackEl) {
      feedbackEl.style.display = 'none';
      feedbackEl.className = 'sim-feedback-box';
      feedbackEl.innerHTML = '';
    }

    if (prevBtn) prevBtn.disabled = currentSimIndex === 0;
    if (nextBtn) nextBtn.disabled = currentSimIndex === SIMULATOR_SCENARIOS.length - 1;

    const choiceButtons = document.querySelectorAll('.sim-choice-btn');
    choiceButtons.forEach((btn) => btn.classList.remove('selected', 'correct', 'incorrect'));
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
        feedbackEl.innerHTML = `<strong>${isKhmerActive ? 'មិនទាន់ត្រឹមត្រូវ!' : 'Incorrect Property!'}</strong> ${isKhmerActive ? 'ចូរពិចារណាលើគោលបំណងរបស់ Property នេះឡើងវិញ។ តើវាគ្រប់គ្រងការបង្ហាញ ការគណនា ឬការបញ្ជា?' : 'Consider the exact operational dial needed for this behavior. Try choosing another property.'}`;
      }
    }
  }

  // --------------------------------------------------------------------------
  // 16. INTERACTIVE WIDGET 3: 5-QUESTION KNOWLEDGE CHECK QUIZ
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

    if (scoreEl) scoreEl.textContent = String(quizScore);
    if (titleEl) titleEl.textContent = isKhmerActive ? q.titleKh : q.titleEn;

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

    const optButtons = document.querySelectorAll('.quiz-opt-btn');
    optButtons.forEach((btn) => btn.disabled = true);

    if (selectedIdx === q.correctIndex) {
      clickedBtn.classList.add('correct');
      if (!quizAnswered[currentQuizIndex]) {
        quizAnswered[currentQuizIndex] = true;
        quizScore++;
        if (scoreEl) scoreEl.textContent = String(quizScore);
      }

      if (feedbackEl) {
        feedbackEl.style.display = 'block';
        feedbackEl.className = 'quiz-feedback-box success-feedback';
        feedbackEl.innerHTML = `<strong>${isKhmerActive ? 'ត្រឹមត្រូវ!' : 'Correct!'}</strong> ${isKhmerActive ? q.explanationKh : q.explanationEn}`;
      }
    } else {
      clickedBtn.classList.add('incorrect');
      if (optButtons[q.correctIndex]) {
        optButtons[q.correctIndex].classList.add('correct');
      }

      if (feedbackEl) {
        feedbackEl.style.display = 'block';
        feedbackEl.className = 'quiz-feedback-box error-feedback';
        feedbackEl.innerHTML = `<strong>${isKhmerActive ? 'មិនទាន់ត្រឹមត្រូវ!' : 'Incorrect Answer.'}</strong> ${isKhmerActive ? q.explanationKh : q.explanationEn}`;
      }
    }
  }

  // --------------------------------------------------------------------------
  // 17. INTERACTIVE WIDGET 4: CAPSTONE BENCHMARK SOLUTION & RUBRIC MATRIX
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
        if (updatedText) updatedText.textContent = isKhmerActive ? 'លាក់គំរូ Tree View & Properties' : 'Hide Benchmark Tree View & Properties';
      } else {
        if (updatedIcon) updatedIcon.textContent = '👁️';
        if (updatedText) updatedText.textContent = isKhmerActive ? 'បង្ហាញគំរូ Tree View & Properties ក្នុង Studio' : 'Reveal Benchmark Studio Tree View & Properties';
      }
    });
  }

  // --------------------------------------------------------------------------
  // 18. BOOTSTRAP WHEN DOM READY
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
