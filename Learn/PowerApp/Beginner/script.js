/**
 * ============================================================================
 * MICROSOFT POWER APPS MASTER CURRICULUM PORTAL
 * Days 1–27 Complete Connected Curriculum Controller
 * Zero CDN / Vanilla JavaScript / Edge & Chrome Compatible
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. ALL 27 CONNECTED LESSONS METADATA (Bilingual English & Khmer)
  // --------------------------------------------------------------------------
  const LESSONS_DATA = [
    // PHASE 1: FOUNDATIONS OF LOGIC & PROBLEM SOLVING (Days 1–6)
    {
      day: 1,
      phase: 1,
      phaseName: "Phase 1: Foundations of Logic & Problem Solving",
      phaseNameKh: "ដំណាក់កាលទី ១ ៖ មូលដ្ឋានគ្រឹះនៃតក្កវិជ្ជានិងការដោះស្រាយបញ្ហា",
      phaseColor: "var(--phase-1)",
      title: "How Apps Solve Problems",
      titleKh: "របៀបដែលកម្មវិធីដោះស្រាយបញ្ហាជាក់ស្តែង",
      mentalModel: "Real Problem ➔ Input ➔ Process ➔ Output",
      mentalModelKh: "បញ្ហាជាក់ស្តែង ➔ បញ្ចូលទិន្នន័យ ➔ ដំណើរការ ➔ បង្ហាញលទ្ធផល",
      stageKey: "PROBLEM",
      stageName: "1. REAL PROBLEM",
      stageNameKh: "១. បញ្ហាជាក់ស្តែង",
      summary: "Discover why software exists: replacing manual paper logs and human error with automated digital workflows.",
      summaryKh: "ស្វែងយល់ពីមូលហេតុដែលកម្មវិធីកុំព្យូទ័រត្រូវបានបង្កើតឡើង ៖ ការជំនួសក្រដាសកត់ត្រា និងកំហុសមនុស្សដោយប្រព័ន្ធឌីជីថលស្វ័យប្រវត្តិ។",
      tools: ["Input / Output", "Process Flow", "Digital Transformation"],
      storyline: "Apex Plastics shift paper handoffs causing injection molding downtime.",
      storylineKh: "ក្រដាសកត់ត្រាប្តូរវេននៅរោងចក្របណ្តាលឱ្យម៉ាស៊ីនចាក់ជ័រគាំងដំណើរការ។"
    },
    {
      day: 2,
      phase: 1,
      phaseName: "Phase 1: Foundations of Logic & Problem Solving",
      phaseNameKh: "ដំណាក់កាលទី ១ ៖ មូលដ្ឋានគ្រឹះនៃតក្កវិជ្ជានិងការដោះស្រាយបញ្ហា",
      phaseColor: "var(--phase-1)",
      title: "Instructions & Sequence",
      titleKh: "ការណែនាំ និងលំដាប់លំដោយនៃការប្រតិបត្តិ",
      mentalModel: "Process ➔ Sequence ➔ Step-by-Step Logic",
      mentalModelKh: "ដំណើរការ ➔ លំដាប់លំដោយ ➔ តក្កវិជ្ជាជាជំហានៗ",
      stageKey: "PROCESS",
      stageName: "2. PROCESS",
      stageNameKh: "២. ដំណើរការ",
      summary: "Understand that computers execute commands sequentially. Why order of operations determines software success or failure.",
      summaryKh: "យល់ដឹងថាកុំព្យូទ័រដំណើរការតាមលំដាប់លំដោយ។ មូលហេតុដែលលំដាប់នៃជំហានកំណត់ភាពជោគជ័យឬបរាជ័យនៃកម្មវិធី។",
      tools: ["Sequential Execution", "Algorithms", "Order of Operations"],
      storyline: "Machine startup sequence: safety check must happen BEFORE motor starts.",
      storylineKh: "លំដាប់បញ្ឆេះម៉ាស៊ីន ៖ ការត្រួតពិនិត្យសុវត្ថិភាពត្រូវធ្វើមុនពេលម៉ូទ័រចាប់ផ្តើម។"
    },
    {
      day: 3,
      phase: 1,
      phaseName: "Phase 1: Foundations of Logic & Problem Solving",
      phaseNameKh: "ដំណាក់កាលទី ១ ៖ មូលដ្ឋានគ្រឹះនៃតក្កវិជ្ជានិងការដោះស្រាយបញ្ហា",
      phaseColor: "var(--phase-1)",
      title: "Data: What an App Knows & Remembers",
      titleKh: "ទិន្នន័យ ៖ អ្វីដែលកម្មវិធីដឹង និងចងចាំ",
      mentalModel: "Data Types ➔ Text, Number, Boolean, Date",
      mentalModelKh: "ប្រភេទទិន្នន័យ ➔ អក្សរ, លេខ, ប៊ូលីន, កាលបរិច្ឆេទ",
      stageKey: "DATA",
      stageName: "3. DATA",
      stageNameKh: "៣. ទិន្នន័យ",
      summary: "Master data types: text labels vs numbers vs dates vs true/false. Why typing data correctly is the foundation of logic.",
      summaryKh: "យល់ច្បាស់ពីប្រភេទទិន្នន័យ ៖ អក្សរ (Text) ទល់នឹង លេខ (Number) ទល់នឹង True/False។ មូលហេតុដែលប្រភេទទិន្នន័យជាគ្រឹះនៃតក្កវិជ្ជា។",
      tools: ["Text", "Number", "Date", "Boolean"],
      storyline: "Logging mold temperature (Number) vs Operator Name (Text) vs Safety Pass (Boolean).",
      storylineKh: "កត់ត្រាកម្តៅពុម្ព (លេខ) ឈ្មោះប្រតិបត្តិករ (អក្សរ) និងសុវត្ថិភាពជាប់ (ប៊ូលីន)។"
    },
    {
      day: 4,
      phase: 1,
      phaseName: "Phase 1: Foundations of Logic & Problem Solving",
      phaseNameKh: "ដំណាក់កាលទី ១ ៖ មូលដ្ឋានគ្រឹះនៃតក្កវិជ្ជានិងការដោះស្រាយបញ្ហា",
      phaseColor: "var(--phase-1)",
      title: "Questions, Conditions, True & False",
      titleKh: "សំណួរ លក្ខខណ្ឌ និងតម្លៃពិត/មិនពិត (True & False)",
      mentalModel: "Data ➔ Question ➔ Comparison ➔ True / False",
      mentalModelKh: "ទិន្នន័យ ➔ សំណួរ ➔ ការប្រៀបធៀប ➔ ពិត / មិនពិត",
      stageKey: "LOGIC",
      stageName: "5. LOGIC / DECISION",
      stageNameKh: "៥. តក្កវិជ្ជា / សេចក្តីសម្រេច",
      summary: "Learn how apps ask questions: comparing data using =, >, <, <>. A condition always evaluates to a single True or False answer.",
      summaryKh: "របៀបដែលកម្មវិធីសួរសំណួរ ៖ ប្រៀបធៀបទិន្នន័យដោយប្រើ =, >, <។ លក្ខខណ្ឌតែងតែផ្តល់ចម្លើយតែមួយគត់គឺ True ឬ False។",
      tools: ["Comparison Operators", "=", ">", "<", "<>", "Conditions"],
      storyline: "Is temperature > 220°C? True triggers cooling; False keeps heating.",
      storylineKh: "តើសីតុណ្ហភាព > 220°C មែនទេ? បើពិតដំណើរការម៉ាស៊ីនត្រជាក់; បើមិនពិតបន្តកម្តៅ។"
    },
    {
      day: 5,
      phase: 1,
      phaseName: "Phase 1: Foundations of Logic & Problem Solving",
      phaseNameKh: "ដំណាក់កាលទី ១ ៖ មូលដ្ឋានគ្រឹះនៃតក្កវិជ្ជានិងការដោះស្រាយបញ្ហា",
      phaseColor: "var(--phase-1)",
      title: "Decisions (IF / THEN / ELSE)",
      titleKh: "ការធ្វើសេចក្តីសម្រេច (IF / THEN / ELSE)",
      mentalModel: "Condition ➔ True/False ➔ IF ➔ Action A / Action B",
      mentalModelKh: "លក្ខខណ្ឌ ➔ True/False ➔ IF ➔ សកម្មភាព ក / សកម្មភាព ខ",
      stageKey: "LOGIC",
      stageName: "5. LOGIC / DECISION",
      stageNameKh: "៥. តក្កវិជ្ជា / សេចក្តីសម្រេច",
      summary: "Branching execution: if the condition is True, do Action A; otherwise do Action B. The universal brain of software.",
      summaryKh: "ការបំបែកផ្លូវសម្រេចចិត្ត ៖ ប្រសិនបើលក្ខខណ្ឌពិត (True) ធ្វើសកម្មភាព ក; បើមិនពិត (False) ធ្វើសកម្មភាព ខ។",
      tools: ["If()", "Branching", "True Path", "False Path"],
      storyline: "If machine status is 'Fault', halt conveyor; Else allow next production cycle.",
      storylineKh: "បើស្ថានភាពម៉ាស៊ីនគឺ 'Fault' ផ្អាកខ្សែក្រវាត់; បើមិនមែនទេអនុញ្ញាតឱ្យផលិតបន្ត។"
    },
    {
      day: 6,
      phase: 1,
      phaseName: "Phase 1: Foundations of Logic & Problem Solving",
      phaseNameKh: "ដំណាក់កាលទី ១ ៖ មូលដ្ឋានគ្រឹះនៃតក្កវិជ្ជានិងការដោះស្រាយបញ្ហា",
      phaseColor: "var(--phase-1)",
      title: "Combining Conditions (AND / OR / NOT)",
      titleKh: "ការរួមបញ្ចូលគ្នានៃលក្ខខណ្ឌ (AND / OR / NOT)",
      mentalModel: "Multi-Conditions ➔ && (AND) ➔ || (OR) ➔ ! (NOT)",
      mentalModelKh: "ពហុលក្ខខណ្ឌ ➔ && (AND) ➔ || (OR) ➔ ! (NOT)",
      stageKey: "LOGIC",
      stageName: "5. LOGIC / DECISION",
      stageNameKh: "៥. តក្កវិជ្ជា / សេចក្តីសម្រេច",
      summary: "Master complex real-world logic gates: both conditions must be true (AND), or either can be true (OR).",
      summaryKh: "ជំនាញច្រកទ្វារតក្កវិជ្ជាជាក់ស្តែង ៖ លក្ខខណ្ឌទាំងពីរត្រូវតែពិត (AND) ឬមួយណាក៏បានពិត (OR)។",
      tools: ["And() / &&", "Or() / ||", "Not() / !", "Logic Gates"],
      storyline: "Both Operator Badge valid AND Safety Shield closed before press cycle starts.",
      storylineKh: "ទាំងកាតសម្គាល់ត្រឹមត្រូវ និងរបាំងសុវត្ថិភាពបិទជិត មុនពេលម៉ាស៊ីនសង្កត់ចាប់ផ្តើម។"
    },

    // PHASE 2: BUSINESS PROCESS MODELING (Days 7–9)
    {
      day: 7,
      phase: 2,
      phaseName: "Phase 2: Business Process & Wireframing",
      phaseNameKh: "ដំណាក់កាលទី ២ ៖ ដំណើរការអាជីវកម្ម និងប្លង់គំរូអេក្រង់",
      phaseColor: "var(--phase-2)",
      title: "From Real Problem to App Opportunity",
      titleKh: "ពីបញ្ហាជាក់ស្តែង ទៅជាឱកាសបង្កើតកម្មវិធី",
      mentalModel: "Pain Point ➔ Value Proposition ➔ Digital Solution",
      mentalModelKh: "បញ្ហាឈឺចាប់ ➔ តម្លៃអាជីវកម្ម ➔ ដំណោះស្រាយឌីជីថល",
      stageKey: "PROBLEM",
      stageName: "1. REAL PROBLEM",
      stageNameKh: "១. បញ្ហាជាក់ស្តែង",
      summary: "Analyze messy workplace workflows. Translate human complaints, delays, and wasted scrap into concrete app requirements.",
      summaryKh: "វិភាគលំហូរការងាររញ៉េរញ៉ៃក្នុងរោងចក្រ។ បម្លែងការត្អូញត្អែរ ការយឺតយ៉ាវ និងការខាតបង់ ឱ្យទៅជាតម្រូវការកម្មវិធី។",
      tools: ["Problem Scoping", "User Stories", "DX ROI Analysis"],
      storyline: "Apex Maintenance crew losing 14 hours/week looking for paper clipboards.",
      storylineKh: "ក្រុមជាងជួសជុលខាតពេល ១៤ ម៉ោងក្នុងមួយសប្តាហ៍ដើររកក្តារកត់ត្រាក្រដាស។"
    },
    {
      day: 8,
      phase: 2,
      phaseName: "Phase 2: Business Process & Wireframing",
      phaseNameKh: "ដំណាក់កាលទី ២ ៖ ដំណើរការអាជីវកម្ម និងប្លង់គំរូអេក្រង់",
      phaseColor: "var(--phase-2)",
      title: "Process, Workflow, Status & Decision",
      titleKh: "ដំណើរការ លំហូរការងារ ស្ថានភាព និងការសម្រេចចិត្ត",
      mentalModel: "Status Lifecycle: New ➔ In Progress ➔ Approved ➔ Closed",
      mentalModelKh: "វដ្តជីវិតស្ថានភាព ៖ ថ្មី ➔ កំពុងដំណើរការ ➔ អនុម័ត ➔ បញ្ចប់",
      stageKey: "PROCESS",
      stageName: "2. PROCESS",
      stageNameKh: "២. ដំណើរការ",
      summary: "Map the lifecycle of a work order through clear status states. Understand who changes status and when.",
      summaryKh: "គូសប្លង់វដ្តជីវិតនៃសំណើសុំតាមរយៈស្ថានភាពច្បាស់លាស់។ យល់ដឹងថាអ្នកណាជាអ្នកផ្លាស់ប្តូរស្ថានភាព និងពេលណា។",
      tools: ["Status State Machine", "Workflow Transitions", "Role Responsibilities"],
      storyline: "Support request transitions from Submitted ➔ Assigned ➔ Parts Ordered ➔ Resolved.",
      storylineKh: "សំណើជួសជុលឆ្លងកាត់ពី ៖ បានដាក់ស្នើ ➔ បានចាត់តាំង ➔ កុម្ម៉ង់គ្រឿងបន្លាស់ ➔ ដោះស្រាយរួចរាល់។"
    },
    {
      day: 9,
      phase: 2,
      phaseName: "Phase 2: Business Process & Wireframing",
      phaseNameKh: "ដំណាក់កាលទី ២ ៖ ដំណើរការអាជីវកម្ម និងប្លង់គំរូអេក្រង់",
      phaseColor: "var(--phase-2)",
      title: "Model a Complete Business Flow",
      titleKh: "ការបង្កើតគំរូលំហូរការងារអាជីវកម្មពេញលេញ",
      mentalModel: "Swimlane Mapping ➔ Operator ➔ Supervisor ➔ Technician",
      mentalModelKh: "ដ្យាក្រាមលំហូរការងារតាមតួនាទី (Swimlane Flow) ➔ ប្រតិបត្តិករ ➔ ប្រធានផ្នែក ➔ ជាងបច្ចេកទេស",
      stageKey: "PROCESS",
      stageName: "2. PROCESS",
      stageNameKh: "២. ដំណើរការ",
      summary: "Build cross-functional swimlane diagrams. Track handoffs, decision checkpoints, bottlenecks, and automated triggers.",
      summaryKh: "បង្កើតដ្យាក្រាម Swimlane តភ្ជាប់គ្រប់តួអង្គ។ តាមដានការផ្ទេរការងារ ចំណុចសម្រេចចិត្ត និងស្ទះការងារ។",
      tools: ["Swimlane Flowcharts", "Hand-off Protocols", "Bottleneck Elimination"],
      storyline: "CNC technician triage workflow across Day Shift, Night Shift, and Warehouse Parts Room.",
      storylineKh: "លំហូរជួសជុលម៉ាស៊ីន CNC តភ្ជាប់វេនថ្ងៃ វេនយប់ និងឃ្លាំងគ្រឿងបន្លាស់។"
    },

    // PHASE 3: DATA ARCHITECTURE & TABLES (Days 10–12)
    {
      day: 10,
      phase: 3,
      phaseName: "Phase 3: Data Architecture & Tables",
      phaseNameKh: "ដំណាក់កាលទី ៣ ៖ ស្ថាបត្យកម្មទិន្នន័យ និងតារាងផ្ទុក",
      phaseColor: "var(--phase-3)",
      title: "Records and Tables: Storing Many Cases",
      titleKh: "កំណត់ត្រា និងតារាង ៖ ការផ្ទុកទិន្នន័យច្រើនករណី",
      mentalModel: "Table = Collection of Rows | Row = Single Record | Column = Field",
      mentalModelKh: "តារាង = បណ្តុំជួរដេក | ជួរដេក = កំណត់ត្រាមួយ | ជួរឈរ = ព័ត៌មានលម្អិត",
      stageKey: "DATA",
      stageName: "3. DATA",
      stageNameKh: "៣. ទិន្នន័យ",
      summary: "Shift from single values to structured tables: columns represent fields; rows represent individual real-world incidents.",
      summaryKh: "ផ្លាស់ប្តូរពីតម្លៃទោល ទៅជាតារាងមានរចនាសម្ព័ន្ធ ៖ ជួរឈរជាព័ត៌មានលម្អិត; ជួរដេកជាករណីនីមួយៗក្នុងពិភពពិត។",
      tools: ["Tables", "Records / Rows", "Columns / Fields", "Primary Keys"],
      storyline: "Creating the MaintenanceLog table: ID, EquipmentID, ReportedDate, IssueDescription.",
      storylineKh: "បង្កើតតារាង MaintenanceLog ៖ លេខកូដ, លេខម៉ាស៊ីន, កាលបរិច្ឆេទ, និងការពណ៌នាបញ្ហា។"
    },
    {
      day: 11,
      phase: 3,
      phaseName: "Phase 3: Data Architecture & Tables",
      phaseNameKh: "ដំណាក់កាលទី ៣ ៖ ស្ថាបត្យកម្មទិន្នន័យ និងតារាងផ្ទុក",
      phaseColor: "var(--phase-3)",
      title: "Design Data from the Process",
      titleKh: "ការរចនាទម្រង់ទិន្នន័យចេញពីដំណើរការអាជីវកម្ម",
      mentalModel: "Process Step ➔ Required Data Field ➔ Column Type",
      mentalModelKh: "ជំហានការងារ ➔ ព័ត៌មានដែលត្រូវការ ➔ ប្រភេទជួរឈរ",
      stageKey: "DATA",
      stageName: "3. DATA",
      stageNameKh: "៣. ទិន្នន័យ",
      summary: "Derive your data dictionary directly from the workflow steps. Prevent missing fields before drawing a single screen.",
      summaryKh: "ទាញយកវចនានុក្រមទិន្នន័យដោយផ្ទាល់ពីជំហានការងារ។ ការពារកុំឱ្យខ្វះទិន្នន័យ មុននឹងចាប់ផ្តើមគូសអេក្រង់។",
      tools: ["Data Dictionary", "Choice Columns", "Required Fields", "Schema Normalization"],
      storyline: "Adding Urgency (Choice: Low/Medium/High/Critical) and DowntimeHours (Number).",
      storylineKh: "បន្ថែមជួរឈរកម្រិតបន្ទាន់ (Choice) និងម៉ោងម៉ាស៊ីនគាំង (Number)។"
    },
    {
      day: 12,
      phase: 3,
      phaseName: "Phase 3: Data Architecture & Tables",
      phaseNameKh: "ដំណាក់កាលទី ៣ ៖ ស្ថាបត្យកម្មទិន្នន័យ និងតារាងផ្ទុក",
      phaseColor: "var(--phase-3)",
      title: "From Process + Data to App Screens",
      titleKh: "ពីដំណើរការ + ទិន្នន័យ ទៅជាអេក្រង់កម្មវិធី",
      mentalModel: "Process + Data Schema ➔ Screen Wireframes (List, Form, Details)",
      mentalModelKh: "ដំណើរការ + ទម្រង់ទិន្នន័យ ➔ ប្លង់អេក្រង់ (បញ្ជី, ទម្រង់, លម្អិត)",
      stageKey: "UI",
      stageName: "4. UI / SCREEN",
      stageNameKh: "៤. អេក្រង់ UI",
      summary: "Bridge data schema into user interface screens: browse screen (Gallery), new entry screen (Form), and details screen.",
      summaryKh: "ផ្សារភ្ជាប់ទម្រង់ទិន្នន័យទៅជាអេក្រង់អ្នកប្រើប្រាស់ ៖ អេក្រង់មើលបញ្ជី (Gallery) អេក្រង់បញ្ចូលទិន្នន័យ (Form) និងអេក្រង់លម្អិត។",
      tools: ["Screen Architecture", "Low-Fidelity Wireframing", "UI Hierarchy"],
      storyline: "Wireframing the 3 primary screens for factory floor mobile tablets.",
      storylineKh: "គូសប្លង់មេអេក្រង់ទាំង ៣ សម្រាប់ថេប្លេតក្នុងរោងជាងផលិតកម្ម (Shop Floor)។"
    },

    // PHASE 4: POWER APPS STUDIO & CONTROLS (Days 13–15)
    {
      day: 13,
      phase: 4,
      phaseName: "Phase 4: Power Apps Studio & UI Architecture",
      phaseNameKh: "ដំណាក់កាលទី ៤ ៖ Power Apps Studio និងការរៀបចំ UI",
      phaseColor: "var(--phase-4)",
      title: "Power Apps Studio: Map Design to Controls",
      titleKh: "Power Apps Studio ៖ បម្លែងប្លង់រចនាទៅជាឧបករណ៍បញ្ជា (Controls)",
      mentalModel: "Studio Canvas ➔ Tree View ➔ Properties ➔ Formula Bar",
      mentalModelKh: "ផ្ទៃរចនា Canvas ➔ មែកធាងគ្រប់គ្រង (Tree View) ➔ បន្ទះលក្ខណៈ ➔ របាររូបមន្ត",
      stageKey: "UI",
      stageName: "4. UI / SCREEN",
      stageNameKh: "៤. អេក្រង់ UI",
      summary: "Master the Power Apps Studio environment. Understand the Tree View hierarchy, naming conventions, and layout positioning.",
      summaryKh: "ស្ទាត់ជំនាញក្នុងកម្មវិធី Power Apps Studio។ យល់ដឹងពីមែកធាង Tree View ការដាក់ឈ្មោះត្រឹមត្រូវ និងការតម្រៀបប្លង់។",
      tools: ["Tree View", "Formula Bar", "Properties Panel", "Naming Standards"],
      storyline: "Standardizing control names: btnSubmit, txtEquipmentID, lblErrorMsg.",
      storylineKh: "ការដាក់ឈ្មោះឧបករណ៍ឱ្យមានស្តង់ដារ ៖ btnSubmit, txtEquipmentID, lblErrorMsg។"
    },
    {
      day: 14,
      phase: 4,
      phaseName: "Phase 4: Power Apps Studio & UI Architecture",
      phaseNameKh: "ដំណាក់កាលទី ៤ ៖ Power Apps Studio និងការរៀបចំ UI",
      phaseColor: "var(--phase-4)",
      title: "Controls: Input, Action, Output",
      titleKh: "ឧបករណ៍បញ្ជា ៖ ការបញ្ចូល សកម្មភាព និងការបង្ហាញលទ្ធផល",
      mentalModel: "Input (Text/Dropdown) ➔ Action (Button) ➔ Output (Label/Gallery)",
      mentalModelKh: "ការបញ្ចូល (Text/Dropdown) ➔ សកម្មភាព (ប៊ូតុង) ➔ ការបង្ហាញ (Label/Gallery)",
      stageKey: "UI",
      stageName: "4. UI / SCREEN",
      stageNameKh: "៤. អេក្រង់ UI",
      summary: "Work with core interactive controls: TextInput for user typing, Dropdown for validated choices, Button for triggering logic.",
      summaryKh: "ប្រើប្រាស់ឧបករណ៍បញ្ជាស្នូល ៖ TextInput សម្រាប់វាយបញ្ចូល, Dropdown សម្រាប់ជ្រើសរើសជម្រើស, Button សម្រាប់ដំណើរការតក្កវិជ្ជា។",
      tools: ["TextInput", "Dropdown", "Button", "Label", "Icons"],
      storyline: "Configuring touch-friendly 60px buttons for factory operators wearing gloves.",
      storylineKh: "រចនាប៊ូតុងទំហំធំ 60px សម្រាប់ប្រតិបត្តិករពាក់ស្រោមដៃកៅស៊ូអាចចុចបានងាយស្រួល។"
    },
    {
      day: 15,
      phase: 4,
      phaseName: "Phase 4: Power Apps Studio & UI Architecture",
      phaseNameKh: "ដំណាក់កាលទី ៤ ៖ Power Apps Studio និងការរៀបចំ UI",
      phaseColor: "var(--phase-4)",
      title: "Navigation: Connect Screens into a Flow",
      titleKh: "ការប្តូរអេក្រង់ (Navigation) ៖ ការតភ្ជាប់អេក្រង់ទាំងអស់ទៅជាលំហូរតែមួយ",
      mentalModel: "Screen A ➔ Navigate(ScreenB, ScreenTransition) ➔ Back()",
      mentalModelKh: "អេក្រង់ ក ➔ Navigate(អេក្រង់ ខ) ➔ Back() ថយក្រោយ",
      stageKey: "ACTION",
      stageName: "6. ACTION / ROUTING",
      stageNameKh: "៦. សកម្មភាព / ការបញ្ជូនផ្លូវ",
      summary: "Connect isolated screens into a coherent user journey. Use Navigate() with transitions and Back() to return.",
      summaryKh: "តភ្ជាប់អេក្រង់ដាច់ដោយឡែកឱ្យក្លាយជាលំហូរការងាររលូន។ ប្រើប្រាស់រូបមន្ត Navigate() និង Back() ត្រឡប់ក្រោយ។",
      tools: ["Navigate()", "Back()", "ScreenTransition.Fade", "Header Components"],
      storyline: "Navigating between scr_Home, scr_NewOrder, and scr_OrderHistory.",
      storylineKh: "ការធ្វើដំណើរប្តូររវាងអេក្រង់ដើម, អេក្រង់បង្កើតសំណើថ្មី, និងអេក្រង់ប្រវត្តិការងារ។"
    },

    // PHASE 5: POWER FX LOGIC & STATE (Days 16–18)
    {
      day: 16,
      phase: 5,
      phaseName: "Phase 5: Power Fx Logic & Variables",
      phaseNameKh: "ដំណាក់កាលទី ៥ ៖ តក្កវិជ្ជា Power Fx និងអថេរចងចាំ",
      phaseColor: "var(--phase-5)",
      title: "Properties & Formulas: How Controls Behave",
      titleKh: "លក្ខណៈសម្បត្តិ និងរូបមន្ត ៖ របៀបដែលឧបករណ៍បញ្ជាឆ្លើយតប",
      mentalModel: "Control.Property = Power Fx Formula (Dynamic Behavior)",
      mentalModelKh: "ឧបករណ៍.លក្ខណៈសម្បត្តិ = រូបមន្ត Power Fx (ការផ្លាស់ប្តូរតាមស្ថានភាព)",
      stageKey: "LOGIC",
      stageName: "5. LOGIC / DECISION",
      stageNameKh: "៥. តក្កវិជ្ជា / សេចក្តីសម្រេច",
      summary: "Turn static mockups into living software. Control Color, Visible, DisplayMode, and Text using real-time formulas.",
      summaryKh: "ប្រែក្លាយផ្ទាំងរូបភាពស្ងៀមស្ងាត់ ឱ្យទៅជាសូហ្វវែរមានជីវិត។ គ្រប់គ្រងពណ៌ ភាពមើលឃើញ និងអត្ថបទដោយរូបមន្តពេលវេលាពិត។",
      tools: ["Dot Notation", "Visible", "DisplayMode", "Color / Fill", "Text"],
      storyline: "Making urgent tickets glow Red (Color.Red) automatically when severity is Critical.",
      storylineKh: "ធ្វើឱ្យសំបុត្របន្ទាន់ភ្លឺពណ៌ក្រហម (Color.Red) ដោយស្វ័យប្រវត្តិកាលណាជាករណីធ្ងន់ធ្ងរ។"
    },
    {
      day: 17,
      phase: 5,
      phaseName: "Phase 5: Power Fx Logic & Variables",
      phaseNameKh: "ដំណាក់កាលទី ៥ ៖ តក្កវិជ្ជា Power Fx និងអថេរចងចាំ",
      phaseColor: "var(--phase-5)",
      title: "Conditions + IF in Power Fx: Validation",
      titleKh: "លក្ខខណ្ឌ + IF ក្នុង Power Fx ៖ ការផ្ទៀងផ្ទាត់ទិន្នន័យ (Validation)",
      mentalModel: "If(IsBlank(txtInput.Text), DisplayMode.Disabled, DisplayMode.Edit)",
      mentalModelKh: "If(IsBlank(txtInput.Text), DisplayMode.Disabled, DisplayMode.Edit)",
      stageKey: "LOGIC",
      stageName: "5. LOGIC / DECISION",
      stageNameKh: "៥. តក្កវិជ្ជា / សេចក្តីសម្រេច",
      summary: "Build bulletproof input validation gates. Prevent submission of incomplete tickets by disabling the submit button.",
      summaryKh: "បង្កើតច្រកទ្វារការពារទិន្នន័យខុស។ បិទមិនឱ្យចុចប៊ូតុង Submit (Disabled) ដរាបណាព័ត៌មានចាំបាច់មិនទាន់បំពេញគ្រប់។",
      tools: ["If()", "IsBlank()", "DisplayMode.Disabled", "Validation Gates"],
      storyline: "Stopping operators from submitting maintenance tickets with empty Machine ID.",
      storylineKh: "ទប់ស្កាត់មិនឱ្យប្រតិបត្តិករដាក់សំណើដែលគ្មានលេខសម្គាល់ម៉ាស៊ីន។"
    },
    {
      day: 18,
      phase: 5,
      phaseName: "Phase 5: Power Fx Logic & Variables",
      phaseNameKh: "ដំណាក់កាលទី ៥ ៖ តក្កវិជ្ជា Power Fx និងអថេរចងចាំ",
      phaseColor: "var(--phase-5)",
      title: "Variables: Let the App Remember",
      titleKh: "អថេរ (Variables) ៖ ឱ្យកម្មវិធីចងចាំទិន្នន័យក្នុងពេលប្រើប្រាស់",
      mentalModel: "Set(gblUser, User().FullName) | UpdateContext({locStep: 2})",
      mentalModelKh: "Set(gblUser, User().FullName) | UpdateContext({locStep: 2})",
      stageKey: "DATA",
      stageName: "3. DATA",
      stageNameKh: "៣. ទិន្នន័យ",
      summary: "Teach the app short-term memory. Use Set() for global state across screens and UpdateContext() for single-screen wizard dialogs.",
      summaryKh: "បង្រៀនកម្មវិធីឱ្យចេះចងចាំព័ត៌មានបណ្តោះអាសន្ន។ ប្រើ Set() សម្រាប់ទូទាំងកម្មវិធី និង UpdateContext() សម្រាប់តែមួយអេក្រង់។",
      tools: ["Set() (Global)", "UpdateContext() (Context)", "User()", "App State"],
      storyline: "Remembering logged-in operator credentials and multi-step modal dialogs.",
      storylineKh: "ចងចាំឈ្មោះអ្នកចូលប្រើប្រាស់ និងជំហាននៃផ្ទាំងបញ្ជាក់ព័ត៌មាន។"
    },

    // PHASE 6: ENTERPRISE STORAGE & SHAREPOINT CRUD (Days 19–24)
    {
      day: 19,
      phase: 6,
      phaseName: "Phase 6: Enterprise Storage & SharePoint CRUD",
      phaseNameKh: "ដំណាក់កាលទី ៦ ៖ មូលដ្ឋានទិន្នន័យ SharePoint និង CRUD",
      phaseColor: "var(--phase-6)",
      title: "SharePoint List: Persistent Business Data",
      titleKh: "បញ្ជី SharePoint ៖ ការផ្ទុកទិន្នន័យអាជីវកម្មអចិន្ត្រៃយ៍លើ Cloud",
      mentalModel: "Cloud Database ➔ Permanent Rows ➔ Audit History ➔ Multi-User",
      mentalModelKh: "មូលដ្ឋានទិន្នន័យ Cloud ➔ ជួរដេកអចិន្ត្រៃយ៍ ➔ កំណត់ត្រាប្រវត្តិ ➔ អ្នកប្រើច្រើននាក់",
      stageKey: "STORAGE",
      stageName: "7. STORAGE",
      stageNameKh: "៧. ធុងផ្ទុកទិន្នន័យ",
      summary: "Why Excel fails for apps: file locks, corruption, and sync lag. Configure SharePoint lists with enterprise cloud integrity.",
      summaryKh: "មូលហេតុដែល Excel បរាជ័យក្នុងកម្មវិធីធំៗ ៖ ការចាក់សោឯកសារ និងបាត់ទិន្នន័យ។ បង្កើតបញ្ជី SharePoint លើ Cloud យ៉ាងត្រឹមត្រូវ។",
      tools: ["SharePoint Lists", "Cloud Tables", "Concurrency", "Data Integrity"],
      storyline: "Creating the MaintenanceRequests list in SharePoint to replace shared Excel workbook.",
      storylineKh: "បង្កើតបញ្ជី MaintenanceRequests ក្នុង SharePoint ជំនួសសន្លឹកកិច្ចការ Excel ចាស់។"
    },
    {
      day: 20,
      phase: 6,
      phaseName: "Phase 6: Enterprise Storage & SharePoint CRUD",
      phaseNameKh: "ដំណាក់កាលទី ៦ ៖ មូលដ្ឋានទិន្នន័យ SharePoint និង CRUD",
      phaseColor: "var(--phase-6)",
      title: "Connect Power Apps to SharePoint",
      titleKh: "ការតភ្ជាប់ Power Apps ទៅកាន់បញ្ជី SharePoint",
      mentalModel: "Power Apps Canvas ➔ Cloud Connector ➔ SharePoint Data Source",
      mentalModelKh: "ផ្ទាំង Power Apps ➔ ឧបករណ៍តភ្ជាប់ Cloud ➔ ប្រភពទិន្នន័យ SharePoint",
      stageKey: "STORAGE",
      stageName: "7. STORAGE",
      stageNameKh: "៧. ធុងផ្ទុកទិន្នន័យ",
      summary: "Bridge your frontend app to cloud storage. Add connectors, authenticate data sources, and understand delegation fundamentals.",
      summaryKh: "ភ្ជាប់ផ្ទាំងបញ្ជាខាងមុខ ទៅកាន់ធុងផ្ទុកទិន្នន័យខាងក្រោយ។ បន្ថែម Connector និងស្វែងយល់ពីមូលដ្ឋានគ្រឹះនៃ Delegation។",
      tools: ["Data Connectors", "SharePoint Connection", "Delegation Basics", "Authentication"],
      storyline: "Connecting tablet app to the live SharePoint site with zero code.",
      storylineKh: "តភ្ជាប់កម្មវិធីថេបប្លេត ទៅកាន់គេហទំព័រ SharePoint ផ្ទាល់ដោយមិនចាំបាច់សរសេរកូដស្មុគស្មាញ។"
    },
    {
      day: 21,
      phase: 6,
      phaseName: "Phase 6: Enterprise Storage & SharePoint CRUD",
      phaseNameKh: "ដំណាក់កាលទី ៦ ៖ មូលដ្ឋានទិន្នន័យ SharePoint និង CRUD",
      phaseColor: "var(--phase-6)",
      title: "Gallery: Read and Select Records",
      titleKh: "ផ្ទាំង Gallery ៖ ការអាន និងជ្រើសរើសកំណត់ត្រាទិន្នន័យ",
      mentalModel: "Gallery.Items = Table ➔ Template Item (ThisItem) ➔ gal.Selected",
      mentalModelKh: "Gallery.Items = តារាង ➔ គំរូជួរដេក (ThisItem) ➔ gal.Selected",
      stageKey: "UI",
      stageName: "4. UI / SCREEN",
      stageNameKh: "៤. អេក្រង់ UI",
      summary: "Display repeated rows dynamically. Use ThisItem to bind record columns and gal.Selected to hand data to detail screens.",
      summaryKh: "បង្ហាញជួរដេកទិន្នន័យជាច្រើនដោយស្វ័យប្រវត្តិ។ ប្រើ ThisItem ដើម្បីទាញព័ត៌មាន និង gal.Selected ដើម្បីបញ្ជូនទិន្នន័យទៅអេក្រង់បន្ទាប់។",
      tools: ["Gallery Control", "Items Property", "ThisItem", "gal.Selected"],
      storyline: "Building the live work order dashboard for shift supervisors to monitor open repairs.",
      storylineKh: "កសាងផ្ទាំងគ្រប់គ្រងសំណើជួសជុលផ្ទាល់ ដើម្បីឱ្យមេការតាមដានការជួសជុលដែលមិនទាន់រួច។"
    },
    {
      day: 22,
      phase: 6,
      phaseName: "Phase 6: Enterprise Storage & SharePoint CRUD",
      phaseNameKh: "ដំណាក់កាលទី ៦ ៖ មូលដ្ឋានទិន្នន័យ SharePoint និង CRUD",
      phaseColor: "var(--phase-6)",
      title: "Forms: One Record, Many Fields",
      titleKh: "ទម្រង់បែបបទ Form ៖ កំណត់ត្រាមួយ ផ្ទុកព័ត៌មានច្រើនប្រអប់ (DataCards)",
      mentalModel: "Form.DataSource = Table | Form.Item = gal.Selected | DataCard",
      mentalModelKh: "Form.DataSource = តារាង | Form.Item = gal.Selected | DataCard",
      stageKey: "UI",
      stageName: "4. UI / SCREEN",
      stageNameKh: "៤. អេក្រង់ UI",
      summary: "Render structured cards for every column. Master EditForm vs ViewForm and bind Form.Item to the selected gallery record.",
      summaryKh: "បង្ហាញកាតទិន្នន័យតាមជួរឈរនីមួយៗ។ យល់ច្បាស់ពី EditForm ទល់នឹង ViewForm និងភ្ជាប់ Form.Item ជាមួយកំណត់ត្រាដែលបានជ្រើស។",
      tools: ["EditForm", "ViewForm", "DataCard", "Form.Item", "DataSource"],
      storyline: "Detailed inspection form showing Machine Name, Technician notes, and Status.",
      storylineKh: "ទម្រង់ត្រួតពិនិត្យលម្អិត បង្ហាញឈ្មោះម៉ាស៊ីន កំណត់ចំណាំជាង និងស្ថានភាពការងារ។"
    },
    {
      day: 23,
      phase: 6,
      phaseName: "Phase 6: Enterprise Storage & SharePoint CRUD",
      phaseNameKh: "ដំណាក់កាលទី ៦ ៖ មូលដ្ឋានទិន្នន័យ SharePoint និង CRUD",
      phaseColor: "var(--phase-6)",
      title: "Create Records: From Input to Saved Data",
      titleKh: "ការបង្កើតកំណត់ត្រាថ្មី ៖ ពីការវាយបញ្ចូល រហូតដល់រក្សាទុកលើ Cloud",
      mentalModel: "NewForm(frm) ➔ User Fills Fields ➔ SubmitForm(frm) ➔ OnSuccess",
      mentalModelKh: "NewForm(frm) ➔ បំពេញទិន្នន័យ ➔ SubmitForm(frm) ➔ OnSuccess",
      stageKey: "ACTION",
      stageName: "6. ACTION / ROUTING",
      stageNameKh: "៦. សកម្មភាព / ការបញ្ជូនផ្លូវ",
      summary: "Write new business transactions to the cloud. Reset form state with NewForm(), commit with SubmitForm(), and handle OnSuccess feedback.",
      summaryKh: "កត់ត្រាប្រតិបត្តិការអាជីវកម្មថ្មីចូលទៅក្នុង Cloud។ បើកទម្រង់ទទេដោយ NewForm(), រក្សាទុកដោយ SubmitForm(), និងជូនដំណឹង OnSuccess។",
      tools: ["NewForm()", "SubmitForm()", "OnSuccess", "Notify()", "ResetForm()"],
      storyline: "Operator logs a broken conveyor belt; record committed to SharePoint in 300ms.",
      storylineKh: "ប្រតិបត្តិករកត់ត្រាខ្សែក្រវាត់ខូច; ទិន្នន័យត្រូវបានរក្សាទុកចូល SharePoint ក្នុងពេល 300ms។"
    },
    {
      day: 24,
      phase: 6,
      phaseName: "Phase 6: Enterprise Storage & SharePoint CRUD",
      phaseNameKh: "ដំណាក់កាលទី ៦ ៖ មូលដ្ឋានទិន្នន័យ SharePoint និង CRUD",
      phaseColor: "var(--phase-6)",
      title: "Read & Update: Complete Record Lifecycle",
      titleKh: "ការអាន និងកែប្រែទិន្នន័យ ៖ បំពេញវដ្តជីវិតទិន្នន័យទាំងស្រុង",
      mentalModel: "gal.Selected ➔ EditForm(frm) ➔ SubmitForm(frm) ➔ Updated Record",
      mentalModelKh: "gal.Selected ➔ EditForm(frm) ➔ SubmitForm(frm) ➔ ទិន្នន័យកែប្រែថ្មី",
      stageKey: "STORAGE",
      stageName: "7. STORAGE",
      stageNameKh: "៧. ធុងផ្ទុកទិន្នន័យ",
      summary: "Close the loop on data: switch existing records into edit mode, update statuses, patch fields, and handle server confirmation.",
      summaryKh: "បំពេញវដ្តជីវិតទិន្នន័យ ៖ បើកកំណត់ត្រាចាស់មកកែប្រែ (EditForm), ផ្លាស់ប្តូរស្ថានភាពការងារ, និងរក្សាទុកការកែប្រែដោយជោគជ័យ។",
      tools: ["EditForm()", "ViewForm()", "Record Lifecycle", "Update Confirmation"],
      storyline: "Technician opens open repair order, marks parts replaced, and updates status to Closed.",
      storylineKh: "ជាងបច្ចេកទេសបើកសំណើជួសជុលចាស់ ដាក់សញ្ញាថាដូរគ្រឿងបន្លាស់រួច និងប្តូរស្ថានភាពជា 'Closed'។"
    },

    // PHASE 7: SYSTEM INTEGRATION & AUTOMATION (Days 25–26)
    {
      day: 25,
      phase: 7,
      phaseName: "Phase 7: End-to-End System Integration & Cloud Flows",
      phaseNameKh: "ដំណាក់កាលទី ៧ ៖ ការតភ្ជាប់ប្រព័ន្ធពេញលេញ និងស្វ័យប្រវត្តិកម្ម Cloud (Power Automate)",
      phaseColor: "var(--phase-7)",
      title: "Architecture: Problem ➔ Process ➔ Data ➔ UI ➔ Logic",
      titleKh: "ស្ថាបត្យកម្មប្រព័ន្ធ ៖ បញ្ហា ➔ ដំណើរការ ➔ ទិន្នន័យ ➔ អេក្រង់ ➔ តក្កវិជ្ជា",
      mentalModel: "Complete 3-Tier Multi-Screen Architecture Blueprint",
      mentalModelKh: "ប្លង់មេស្ថាបត្យកម្មប្រព័ន្ធ ៣ កម្រិត និងពហុអេក្រង់ពេញលេញ",
      stageKey: "ARCHITECTURE",
      stageName: "ARCHITECT",
      stageNameKh: "ស្ថាបត្យករ",
      summary: "Step back and see the entire machine: integrate all technical components into a unified, maintainable production architecture.",
      summaryKh: "ឈានទៅមើលរូបភាពធំនៃប្រព័ន្ធទាំងមូល ៖ រួមបញ្ចូលគ្រប់សមាសធាតុបច្ចេកវិទ្យា ឱ្យទៅជាស្ថាបត្យកម្មសូហ្វវែររឹងមាំសម្រាប់សហគ្រាស។",
      tools: ["Full System Architecture", "Data Flow Blueprint", "Production Hardening"],
      storyline: "Architecting the unified Plant Maintenance Portal connecting 4 shop floor screens.",
      storylineKh: "រៀបចំស្ថាបត្យកម្មប្រព័ន្ធជួសជុលរោងចក្ររួមមួយ ដែលតភ្ជាប់អេក្រង់ទាំង ៤ ក្នុងរោងជាងផលិតកម្ម (Shop Floor)។"
    },
    {
      day: 26,
      phase: 7,
      phaseName: "Phase 7: End-to-End System Integration & Cloud Flows",
      phaseNameKh: "ដំណាក់កាលទី ៧ ៖ ការតភ្ជាប់ប្រព័ន្ធពេញលេញ និងស្វ័យប្រវត្តិកម្ម Cloud (Power Automate)",
      phaseColor: "var(--phase-7)",
      title: "Build the Complete Connected App + Power Automate",
      titleKh: "ការកសាងកម្មវិធីតភ្ជាប់ពេញលេញ + ស្វ័យប្រវត្តិកម្ម Power Automate",
      mentalModel: "App ➔ SharePoint ➔ When an item is created ➔ Send an email (V2)",
      mentalModelKh: "កម្មវិធី ➔ SharePoint ➔ ពេលមានធាតុថ្មី ➔ ផ្ញើអ៊ីមែលជូនដំណឹង (V2)",
      stageKey: "FLOW",
      stageName: "8. CLOUD FLOW",
      stageNameKh: "៨. ស្វ័យប្រវត្តិកម្ម FLOW",
      summary: "Integrate Power Apps with Power Automate. Trigger automated cloud notifications to supervisors the instant a record is saved.",
      summaryKh: "តភ្ជាប់ Power Apps ជាមួយ Power Automate។ ដំណើរការការជូនដំណឹងតាមអ៊ីមែលលើ Cloud ដោយស្វ័យប្រវត្តិ ភ្លាមៗពេលមានទិន្នន័យរក្សាទុក។",
      tools: ["Power Automate", "When an item is created", "Send an email (V2)", "Cloud Triggers"],
      storyline: "Automatic email notification with work order details dispatched to maintenance lead.",
      storylineKh: "ការផ្ញើអ៊ីមែលជូនដំណឹងស្វ័យប្រវត្តិជាមួយព័ត៌មានលម្អិតនៃការជួសជុលទៅកាន់ប្រធានផ្នែក។"
    },

    // PHASE 8: CAPSTONE TRANSFER & GRADUATION (Day 27)
    {
      day: 27,
      phase: 8,
      phaseName: "Phase 8: Capstone Transfer & Graduation",
      phaseNameKh: "ដំណាក់កាលទី ៨ ៖ ការវាយតម្លៃបញ្ចប់ការសិក្សា (Capstone)",
      phaseColor: "var(--phase-8)",
      title: "Final Transfer Challenge: Explain Why It Works",
      titleKh: "ការប្រឡងផ្ទេរចំណេះដឹងបញ្ចប់ ៖ ពន្យល់ពីមូលហេតុដែលប្រព័ន្ធដំណើរការ",
      mentalModel: "New Problem ➔ Independently Model ➔ Build ➔ Test ➔ Explain Why",
      mentalModelKh: "បញ្ហាថ្មី ➔ បង្កើតគំរូដោយខ្លួនឯង ➔ កសាង ➔ តេស្ត ➔ ពន្យល់ហេតុផល",
      stageKey: "CAPSTONE",
      stageName: "9. GRADUATION",
      stageNameKh: "៩. បញ្ចប់ការសិក្សា 🎓",
      summary: "The graduation test: independently architect a Plant Safety Hazard Tracker from scratch. Defend decisions and master 3-Tier troubleshooting.",
      summaryKh: "ការប្រឡងបញ្ចប់ការសិក្សា ៖ កសាងប្រព័ន្ធតាមដានគ្រោះថ្នាក់ការងារពីបាតដៃទទេ។ ពន្យល់ពីស្ថាបត្យកម្ម និងជំនាញដោះស្រាយបញ្ហា ៣ កម្រិត។",
      tools: ["First Principles", "3-Tier Troubleshooting", "Architectural Defense", "Graduation"],
      storyline: "Plant Safety & Near-Miss Hazard Tracker with instant emergency alerts.",
      storylineKh: "ប្រព័ន្ធកត់ត្រាហានិភ័យសុវត្ថិភាពការងារ និងការផ្ញើសារអាសន្នភ្លាមៗទៅកាន់មេការ។"
    }
  ];

  // --------------------------------------------------------------------------
  // 2. CURRICULUM PHASES REFERENCE
  // --------------------------------------------------------------------------
  const PHASES_METADATA = [
    { id: 1, name: "Phase 1: Logic & Problem Solving", nameKh: "ដំណាក់កាលទី ១ ៖ តក្កវិជ្ជា & ដោះស្រាយបញ្ហា", icon: "🎯", subtitle: "Core Logic • Input ➔ Process ➔ Output", subtitleKh: "តក្កវិជ្ជាមូលដ្ឋាន • ធាតុបញ្ចូល ➔ ដំណើរការ ➔ លទ្ធផល", days: [1, 2, 3, 4, 5, 6], color: "var(--phase-1)" },
    { id: 2, name: "Phase 2: Business Process & Wireframes", nameKh: "ដំណាក់កាលទី ២ ៖ ដំណើរការអាជីវកម្ម & ប្លង់គំនូស", icon: "📋", subtitle: "Swimlanes • States • UI Wireframes", subtitleKh: "គំនូសលំហូរការងារ • ស្ថានភាព • ប្លង់អេក្រង់", days: [7, 8, 9], color: "var(--phase-2)" },
    { id: 3, name: "Phase 3: Data Architecture & Tables", nameKh: "ដំណាក់កាលទី ៣ ៖ ស្ថាបត្យកម្មទិន្នន័យ & តារាង", icon: "🗄️", subtitle: "Data Types • SharePoint Lists • Relationships", subtitleKh: "ប្រភេទទិន្នន័យ • តារាង SharePoint • ទំនាក់ទំនង", days: [10, 11, 12], color: "var(--phase-3)" },
    { id: 4, name: "Phase 4: Studio Controls & Navigation", nameKh: "ដំណាក់កាលទី ៤ ៖ ឧបករណ៍បញ្ជា & ការរុករក", icon: "📱", subtitle: "Canvas Studio • Galleries • Forms • Navigate", subtitleKh: "ស្ទូឌីយោ Canvas • វិចិត្រសាល • ទម្រង់បែបបទ • ការរុករក", days: [13, 14, 15], color: "var(--phase-4)" },
    { id: 5, name: "Phase 5: Power Fx Logic & Variables", nameKh: "ដំណាក់កាលទី ៥ ៖ រូបមន្ត Power Fx & អថេរ", icon: "⚡", subtitle: "Formulas • Global & Context Variables • Filters", subtitleKh: "រូបមន្តតក្កវិជ្ជា • អថេរទូទៅ & អថេរអេក្រង់ • តម្រងទិន្នន័យ", days: [16, 17, 18], color: "var(--phase-5)" },
    { id: 6, name: "Phase 6: Enterprise SharePoint CRUD", nameKh: "ដំណាក់កាលទី ៦ ៖ ប្រព័ន្ធ SharePoint CRUD", icon: "☁️", subtitle: "Create • Read • Update • Delete • Patch", subtitleKh: "បង្កើត • អាន • កែប្រែ • លុប • រូបមន្ត Patch", days: [19, 20, 21, 22, 23, 24], color: "var(--phase-6)" },
    { id: 7, name: "Phase 7: Full App & Cloud Flow", nameKh: "ដំណាក់កាលទី ៧ ៖ កម្មវិធីពេញលេញ & លំហូរ Cloud", icon: "🤖", subtitle: "Power Automate • Email Alerts • Approvals", subtitleKh: "ស្វ័យប្រវត្តិកម្ម Cloud • សេចក្តីជូនដំណឹង • ការអនុម័ត", days: [25, 26], color: "var(--phase-7)" },
    { id: 8, name: "Phase 8: Capstone Transfer & Graduation", nameKh: "ដំណាក់កាលទី ៨ ៖ គម្រោងបញ្ចប់ & បញ្ចប់ការសិក្សា", icon: "🏆", subtitle: "Architecture Defense • 3-Tier Audit • Deployment", subtitleKh: "ការការពារគម្រោង • សវនកម្មប្រព័ន្ធ • ការដាក់ឱ្យប្រើប្រាស់", days: [27], color: "var(--phase-8)" }
  ];

  // --------------------------------------------------------------------------
  // 3. PERSISTENT STATE MANAGEMENT (LocalStorage)
  // --------------------------------------------------------------------------
  const STORAGE_KEY = 'powerapps_master_curriculum_state_v1';

  let state = {
    completedDays: [],
    inProgressDays: [1],
    lastVisitedDay: 1,
    isKhmer: false,
    isTrainerMode: false,
    activePhaseFilter: 'all',
    activeStageFilter: 'all',
    activeStatusFilter: 'all',
    searchQuery: '',
    activeTheaterDay: 1
  };

  function loadSavedState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        state.completedDays = Array.isArray(parsed.completedDays) ? parsed.completedDays : [];
        state.inProgressDays = Array.isArray(parsed.inProgressDays) ? parsed.inProgressDays : [1];
        state.lastVisitedDay = typeof parsed.lastVisitedDay === 'number' ? parsed.lastVisitedDay : 1;
        state.isKhmer = !!parsed.isKhmer;
      }
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
    }
  }

  function saveCurrentState() {
    try {
      const payload = {
        completedDays: state.completedDays,
        inProgressDays: state.inProgressDays,
        lastVisitedDay: state.lastVisitedDay,
        isKhmer: state.isKhmer
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }

  // --------------------------------------------------------------------------
  // 4. RENDERING & UI UPDATES
  // --------------------------------------------------------------------------
  function renderAll() {
    updateLanguageClasses();
    renderHeroMetrics();
    renderPhaseSummaryCards();
    renderLessonCards();
  }

  function updateLanguageClasses() {
    const body = document.body;
    const btnLangLabel = document.getElementById('btn-lang-label');
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-desc');
    const searchInput = document.getElementById('search-input');
    const resumeBtnText = document.getElementById('resume-btn-text');
    const cheatsheetEl = document.getElementById('cheatsheet-drawer');
    const ribbonTitle = document.querySelector('.model-ribbon-title span');
    const ribbonNodes = document.querySelectorAll('.ribbon-node');

    const ribbonLabelsKh = {
      'PROBLEM': '១. បញ្ហាជាក់ស្តែង',
      'PROCESS': '២. ដំណើរការការងារ',
      'DATA': '៣. ទិន្នន័យ (Data)',
      'UI': '៤. អេក្រង់ UI / Form',
      'LOGIC': '៥. តក្កវិជ្ជា & សេចក្តីសម្រេច',
      'ACTION': '៦. សកម្មភាព (Action)',
      'STORAGE': '៧. ផ្ទុកទិន្នន័យ (Storage)',
      'FLOW': '៨. លំហូរស្វ័យប្រវត្តិ (Flow)',
      'CAPSTONE': '៩. តេស្ត & បញ្ចប់ 🎓'
    };
    const ribbonLabelsEn = {
      'PROBLEM': '1. Real Problem',
      'PROCESS': '2. Process',
      'DATA': '3. Data Schema',
      'UI': '4. UI / Screen',
      'LOGIC': '5. Logic / Decision',
      'ACTION': '6. Action / Routing',
      'STORAGE': '7. Storage',
      'FLOW': '8. Cloud Flow',
      'CAPSTONE': '9. Test & Explain 🎓'
    };

    if (state.isKhmer) {
      body.classList.add('khmer-mode');
      if (btnLangLabel) btnLangLabel.textContent = 'EN';
      if (heroTitle) heroTitle.textContent = 'ពីចំណុចសូន្យ រហូតដល់អ្នកជំនាញបង្កើតកម្មវិធី Power Platform';
      if (heroDesc) heroDesc.textContent = 'រៀនសូត្រតាមលំដាប់លំដោយតភ្ជាប់គ្នារយៈពេល ២៧ ថ្ងៃ ៖ ចាប់ផ្តើមពីបញ្ហាជាក់ស្តែង ➔ ដំណើរការការងារ ➔ រចនាសម្ព័ន្ធទិន្នន័យ ➔ អេក្រង់កម្មវិធី (UI) ➔ តក្កវិជ្ជា & ការសម្រេចចិត្ត ➔ សកម្មភាព & ការបញ្ជូនផ្លូវ ➔ ការផ្ទុកលើ Cloud (SharePoint) ➔ លំហូរស្វ័យប្រវត្តិ (Power Automate) ➔ ការឆ្លើយតប & ផ្ទៀងផ្ទាត់ប្រព័ន្ធទាំងមូល (Test & Verify)។';
      if (searchInput) searchInput.placeholder = 'ស្វែងរកមេរៀន, ប្រធានបទ, រូបមន្ត Power Fx (ឧ. SharePoint, If, Gallery)...';
      if (resumeBtnText) resumeBtnText.textContent = 'បន្តការសិក្សាថ្ងៃទី ' + getNextRecommendedDay();
      if (ribbonTitle) ribbonTitle.innerHTML = '🧠 ស្ថាបត្យកម្មគំរូផ្នត់គំនិតមេ &bull; ចុចលើដំណាក់កាលណាមួយដើម្បីចម្រាញ់មេរៀន ៖';
      ribbonNodes.forEach(node => {
        const stage = node.getAttribute('data-stage');
        const span = node.querySelector('span');
        if (span && ribbonLabelsKh[stage]) span.textContent = ribbonLabelsKh[stage];
      });

      if (cheatsheetEl) {
        cheatsheetEl.innerHTML = `
          <div class="drawer-header">
            <h3><span>📖 មគ្គុទ្ទេសក៍យោងរហ័ស (Quick Reference)</span></h3>
            <button class="drawer-close" onclick="toggleCheatsheet()">&times;</button>
          </div>
          <div class="cheat-card">
            <h4>🧠 ខ្សែសង្វាក់តក្កវិជ្ជា ៩ ដំណាក់កាល</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.6;">
              គ្រប់មុខងារទាំងអស់ក្នុង Power Apps តែងតែតភ្ជាប់ទៅកាន់ខ្សែសង្វាក់ហេតុនិងផល ៩ ដំណាក់កាលនេះជានិច្ច៖
            </p>
            <div style="font-family: var(--font-code); font-size: 0.74rem; color: var(--accent-gold-light); background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px; line-height: 1.7; margin-top: 0.25rem;">
              ១. បញ្ហាជាក់ស្តែង (REAL PROBLEM)<br>
              ២. ដំណើរការការងារ (BUSINESS PROCESS)<br>
              ៣. រចនាសម្ព័ន្ធទិន្នន័យ (DATA SCHEMA - SharePoint)<br>
              ៤. អេក្រង់កម្មវិធី (UI / SCREENS - Gallery &amp; Form)<br>
              ៥. តក្កវិជ្ជា &amp; ការសម្រេចចិត្ត (LOGIC / DECISION - If &amp; Validation)<br>
              ៦. សកម្មភាព &amp; ការបញ្ជូនផ្លូវ (ACTION / ROUTING - Navigate &amp; Submit)<br>
              ៧. ការរក្សាទុកលើ Cloud (STORAGE - Cloud Database Rows)<br>
              ៨. លំហូរស្វ័យប្រវត្តិ (CLOUD FLOW - Power Automate Alerts)<br>
              ៩. ធ្វើតេស្ត &amp; ដោះស្រាយបញ្ហា (TEST &amp; TROUBLESHOOT - 3-Tier Audit)
            </div>
          </div>
          <div class="cheat-card">
            <h4>⚡ រូបមន្តគ្រឹះ Power Fx សំខាន់ៗ</h4>
            <div style="display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.78rem;">
              <div><code>If(Condition, ActionA, ActionB)</code> &bull; ជ្រើសរើសផ្លូវសម្រេចចិត្ត</div>
              <div><code>IsBlank(txtField.Text)</code> &bull; ពិនិត្យមើលថាតើប្រអប់ទិន្នន័យនៅទទេឬអត់</div>
              <div><code>DisplayMode.Disabled</code> &bull; ចាក់សោប៊ូតុងមិនឱ្យចុច</div>
              <div><code>Navigate(scrDetails, Fade)</code> &bull; ប្តូរទៅកាន់អេក្រង់បន្ទាប់</div>
              <div><code>SubmitForm(frmOrder)</code> &bull; រក្សាទុកទិន្នន័យចូលក្នុង Cloud (SharePoint)</div>
              <div><code>galOrders.Selected</code> &bull; ជួរទិន្នន័យដែលបានរើសក្នុង Gallery</div>
              <div><code>Set(gblUser, User().FullName)</code> &bull; ចងចាំឈ្មោះអ្នកប្រើប្រាស់ទូទាំងកម្មវិធី</div>
            </div>
          </div>
          <div class="cheat-card">
            <h4>🛠️ វិធីសាស្ត្រត្រួតពិនិត្យដោះស្រាយបញ្ហា ៣ កម្រិត (3-Tier Audit)</h4>
            <div style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.6;">
              <div><strong style="color: #86efac;">កម្រិតទី ១ (កម្មវិធី Power Apps) ៖</strong> ចូលមើលក្នុង SharePoint ថាតើមានទិន្នន័យថ្មីត្រូវបានរក្សាទុកឬនៅ? ប្រសិនបើមានទិន្នន័យកើតឡើង កម្មវិធី Power Apps ដំណើរការបានត្រឹមត្រូវ ១០០%!</div>
              <div style="margin-top: 0.4rem;"><strong style="color: #fcd34d;">កម្រិតទី ២ (ចំណុចចាប់ផ្តើម Flow Trigger) ៖</strong> ចូលមើលប្រវត្តិដំណើរការ Run History រយៈពេល ២៨ ថ្ងៃក្នុង Power Automate។ ប្រសិនបើឃើញ ០ ដង សូមពិនិត្យគណនីភ្ជាប់ ឬឈ្មោះតារាង។</div>
              <div style="margin-top: 0.4rem;"><strong style="color: #67e8f9;">កម្រិតទី ៣ (ការផ្ញើសារ Email) ៖</strong> ចុចមើលកាត Send an email ក្នុងប្រវត្តិ។ ប្រសិនបើឃើញសញ្ញាខ្វែងក្រហម ✕ បញ្ជាក់ថាខុសអាសយដ្ឋានអ៊ីមែល; ប្រសិនបើឃើញសញ្ញាគ្រីកបៃតង ✓ សូមឆែកមើលក្នុងប្រអប់ Spam/Junk។</div>
            </div>
          </div>
          <div class="cheat-card">
            <h4>🎯 ស្តង់ដារបញ្ចប់ការសិក្សា (Graduation Standard)</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.6;">
              អ្នកបញ្ចប់ការសិក្សាដោយជោគជ័យ មិនមែនដោយសារការទន្ទេញចាំមាត់នូវការចុចប៊ូតុងនោះទេ ប៉ុន្តែនៅពេលដែលជួបប្រទះបញ្ហាអាជីវកម្មថ្មី អ្នកអាចបង្កើតទម្រង់ទិន្នន័យ កសាងកម្មវិធី ៣ អេក្រង់ ភ្ជាប់លំហូរស្វ័យប្រវត្តិ និងពន្យល់ពីមូលហេតុដែលប្រព័ន្ធដំណើរការបានយ៉ាងច្បាស់លាស់!
            </p>
          </div>
        `;
      }
    } else {
      body.classList.remove('khmer-mode');
      if (btnLangLabel) btnLangLabel.textContent = 'KH';
      if (heroTitle) heroTitle.textContent = 'From Absolute Zero to Power Platform Architect';
      if (heroDesc) heroDesc.textContent = 'Master the complete 27-day connected engineering journey: Real Problem ➔ Business Process ➔ Data Schema ➔ UI & Screens ➔ Logic & Decision ➔ Action & Routing ➔ Cloud Storage (SharePoint) ➔ Cloud Automation (Power Automate) ➔ Feedback & System Testing (Test & Verify).';
      if (searchInput) searchInput.placeholder = 'Search lessons, topics, Power Fx formulas, or keywords (e.g. SharePoint, If, Gallery)...';
      if (resumeBtnText) resumeBtnText.textContent = 'Resume Day ' + getNextRecommendedDay();
      if (ribbonTitle) ribbonTitle.innerHTML = '🧠 The Central Mental Model Architecture &bull; Click any stage to filter lessons:';
      ribbonNodes.forEach(node => {
        const stage = node.getAttribute('data-stage');
        const span = node.querySelector('span');
        if (span && ribbonLabelsEn[stage]) span.textContent = ribbonLabelsEn[stage];
      });

      if (cheatsheetEl) {
        cheatsheetEl.innerHTML = `
          <div class="drawer-header">
            <h3><span>📖 Curriculum Quick Reference</span></h3>
            <button class="drawer-close" onclick="toggleCheatsheet()">&times;</button>
          </div>
          <div class="cheat-card">
            <h4>🧠 The 9-Stage Connected Chain</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.6;">
              Every single feature in Power Apps maps directly to this 9-stage causality chain:
            </p>
            <div style="font-family: var(--font-code); font-size: 0.74rem; color: var(--accent-gold-light); background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px; line-height: 1.7; margin-top: 0.25rem;">
              1. REAL PROBLEM<br>
              2. BUSINESS PROCESS<br>
              3. DATA SCHEMA (SharePoint)<br>
              4. UI / SCREENS (Gallery &amp; Form)<br>
              5. LOGIC / DECISION (If &amp; Validation)<br>
              6. ACTION / ROUTING (Navigate &amp; Submit)<br>
              7. STORAGE (Cloud Database Rows)<br>
              8. CLOUD FLOW (Power Automate Alerts)<br>
              9. TEST &amp; TROUBLESHOOT (3-Tier Audit)
            </div>
          </div>
          <div class="cheat-card">
            <h4>⚡ Core Power Fx Formula Reference</h4>
            <div style="display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.78rem;">
              <div><code>If(Condition, ActionA, ActionB)</code> &bull; Decision gate</div>
              <div><code>IsBlank(txtField.Text)</code> &bull; Empty check</div>
              <div><code>DisplayMode.Disabled</code> &bull; Button interlock</div>
              <div><code>Navigate(scrDetails, Fade)</code> &bull; Screen flow</div>
              <div><code>SubmitForm(frmOrder)</code> &bull; Cloud commit</div>
              <div><code>galOrders.Selected</code> &bull; Active record</div>
              <div><code>Set(gblUser, User().FullName)</code> &bull; Global state</div>
            </div>
          </div>
          <div class="cheat-card">
            <h4>🛠️ 3-Tier Troubleshooting Audit</h4>
            <div style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.5;">
              <div><strong style="color: #86efac;">Tier A (App):</strong> Check if row exists in SharePoint. If yes, Power Apps is 100% innocent!</div>
              <div style="margin-top: 0.4rem;"><strong style="color: #fcd34d;">Tier B (Flow Trigger):</strong> Check Power Automate 28-day Run History. If 0 runs, check credentials or list name.</div>
              <div style="margin-top: 0.4rem;"><strong style="color: #67e8f9;">Tier C (Action Delivery):</strong> Inspect the run's email card. If red ✕, bad address; if green ✓, check Spam.</div>
            </div>
          </div>
          <div class="cheat-card">
            <h4>🎯 Graduation Standard</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5;">
              You graduate not when you memorize clicks, but when given an unfamiliar problem, you can independently design the schema, build the 3-screen app, automate alerts, and explain why it works!
            </p>
          </div>
        `;
      }
    }
  }

  function getNextRecommendedDay() {
    for (let d = 1; d <= 27; d++) {
      if (!state.completedDays.includes(d)) {
        return d;
      }
    }
    return 27;
  }

  function renderHeroMetrics() {
    const completedCount = state.completedDays.length;
    const percent = Math.round((completedCount / 27) * 100);

    const statCountEl = document.getElementById('hero-stat-count');
    const statPercentEl = document.getElementById('hero-stat-percent');
    const statProgressFillEl = document.getElementById('hero-progress-fill');
    const statMetaHoursEl = document.getElementById('hero-stat-hours');
    const statMetaRemainingEl = document.getElementById('hero-stat-remaining');
    const headerProgressPill = document.getElementById('header-progress-pill');

    if (statCountEl) statCountEl.textContent = completedCount + ' / 27';
    if (statPercentEl) statPercentEl.textContent = percent + '%';
    if (statProgressFillEl) statProgressFillEl.style.width = percent + '%';

    const hoursLogged = (completedCount * 1.5).toFixed(1);
    if (statMetaHoursEl) {
      statMetaHoursEl.textContent = state.isKhmer ? hoursLogged + ' ម៉ោង / ៤០.៥ ម៉ោង' : hoursLogged + ' hrs / 40.5 hrs';
    }
    if (statMetaRemainingEl) {
      const rem = 27 - completedCount;
      statMetaRemainingEl.textContent = state.isKhmer ? 'នៅសល់ ' + rem + ' ថ្ងៃ' : rem + ' days left';
    }
    if (headerProgressPill) {
      headerProgressPill.textContent = completedCount + '/27 (' + percent + '%)';
    }
  }

  function renderPhaseSummaryCards() {
    const container = document.getElementById('phase-summary-grid');
    if (!container) return;

    container.innerHTML = '';
    PHASES_METADATA.forEach(p => {
      const totalDays = p.days.length;
      const doneDays = p.days.filter(d => state.completedDays.includes(d)).length;
      const phasePercent = Math.round((doneDays / totalDays) * 100);
      const isSelected = (state.activePhaseFilter === p.id);

      const card = document.createElement('div');
      card.className = 'phase-summary-card' + (isSelected ? ' active' : '');
      card.style.setProperty('--card-phase-accent', p.color);
      card.onclick = () => {
        setPhaseFilter(state.activePhaseFilter === p.id ? 'all' : p.id);
      };

      card.innerHTML = `
        <div class="phase-card-top">
          <div class="phase-icon-wrap" style="background: ${p.color}15; color: ${p.color}; border: 1px solid ${p.color}35;">
            ${p.icon}
          </div>
          <span class="phase-tag" style="background: ${p.color}20; color: ${p.color}; border: 1px solid ${p.color}40;">
            PHASE ${p.id}
          </span>
          <span class="phase-days-pill">
            ${p.days.length} ${state.isKhmer ? 'ថ្ងៃ' : 'Days'}
          </span>
        </div>

        <div class="phase-name">${state.isKhmer ? p.nameKh : p.name}</div>
        <div class="phase-subtext">${state.isKhmer ? p.subtitleKh : p.subtitle}</div>

        <div class="phase-progress-footer">
          <div class="phase-meta">
            <span>${doneDays}/${totalDays} ${state.isKhmer ? 'បានបញ្ចប់' : 'Completed'}</span>
            <span style="font-weight: 700; color: ${phasePercent === 100 ? '#4ade80' : 'var(--text-main)'};">${phasePercent}%</span>
          </div>
          <div class="phase-mini-track">
            <div class="phase-mini-fill" style="width: ${phasePercent}%; background: ${p.color};"></div>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  function renderLessonCards() {
    const container = document.getElementById('curriculum-grid');
    const emptyState = document.getElementById('empty-search-state');
    const resultsCountEl = document.getElementById('results-count-badge');
    if (!container) return;

    const query = state.searchQuery.trim().toLowerCase();
    const filtered = LESSONS_DATA.filter(l => {
      // Phase Filter
      if (state.activePhaseFilter !== 'all' && l.phase !== state.activePhaseFilter) {
        return false;
      }
      // Stage Filter
      if (state.activeStageFilter !== 'all' && l.stageKey !== state.activeStageFilter) {
        return false;
      }
      // Status Filter
      const isCompleted = state.completedDays.includes(l.day);
      if (state.activeStatusFilter === 'completed' && !isCompleted) return false;
      if (state.activeStatusFilter === 'incomplete' && isCompleted) return false;
      if (state.activeStatusFilter === 'in-progress' && (!state.inProgressDays.includes(l.day) || isCompleted)) return false;

      // Text Query Search
      if (query) {
        const textToSearch = [
          'day ' + l.day,
          l.title,
          l.titleKh,
          l.summary,
          l.summaryKh,
          l.mentalModel,
          l.tools.join(' '),
          l.storyline,
          l.storylineKh
        ].join(' ').toLowerCase();
        if (!textToSearch.includes(query)) return false;
      }
      return true;
    });

    if (resultsCountEl) {
      if (state.isKhmer) {
        resultsCountEl.textContent = `បង្ហាញ ${filtered.length} នៃ ២៧ មេរៀន`;
      } else {
        resultsCountEl.textContent = `Showing ${filtered.length} of 27 Lessons`;
      }
    }

    container.innerHTML = '';
    if (filtered.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
      return;
    } else {
      if (emptyState) emptyState.style.display = 'none';
    }

    filtered.forEach(lesson => {
      const isDone = state.completedDays.includes(lesson.day);
      const isLast = (state.lastVisitedDay === lesson.day);

      const card = document.createElement('article');
      card.className = 'lesson-card' + (isDone ? ' completed' : '') + (isLast ? ' last-visited' : '');
      card.style.setProperty('--card-accent', lesson.phaseColor);

      const title = state.isKhmer ? lesson.titleKh : lesson.title;
      const summary = state.isKhmer ? lesson.summaryKh : lesson.summary;
      const stage = state.isKhmer ? lesson.stageNameKh : lesson.stageName;
      const storyline = state.isKhmer ? lesson.storylineKh : lesson.storyline;

      let toolTagsHtml = '';
      lesson.tools.forEach(t => {
        toolTagsHtml += `<span class="tool-tag">${t}</span>`;
      });

      const statusText = isDone
        ? (state.isKhmer ? 'បានបញ្ចប់' : 'Completed')
        : (state.inProgressDays.includes(lesson.day) ? (state.isKhmer ? 'កំពុងរៀន' : 'In Progress') : (state.isKhmer ? 'ត្រៀមខ្លួន' : 'Ready'));

      card.innerHTML = `
        <div class="card-phase-stripe" style="background: ${lesson.phaseColor};"></div>
        
        <div class="card-header">
          <div class="header-left-meta">
            <span class="day-badge" style="background: ${lesson.phaseColor}18; color: ${lesson.phaseColor};">DAY ${String(lesson.day).padStart(2, '0')}</span>
            <span class="stage-pill">${stage}</span>
            <span class="duration-pill">⏱️ 90m</span>
            ${isLast ? `<span class="active-resume-pill">● ${state.isKhmer ? 'បន្តរៀន' : 'Resume'}</span>` : ''}
          </div>
          <div class="completion-toggle" onclick="window.toggleLessonComplete(${lesson.day}, event)" title="${isDone ? (state.isKhmer ? 'ដកការសម្គាល់រួចរាល់' : 'Mark as Incomplete') : (state.isKhmer ? 'សម្គាល់ថារួចរាល់' : 'Mark as Completed')}">
            <div class="checkbox-custom">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span class="completion-label">${isDone ? (state.isKhmer ? 'រួចរាល់' : 'Done') : (state.isKhmer ? 'មិនទាន់' : 'Track')}</span>
          </div>
        </div>

        <div class="card-body">
          <h3 class="lesson-title">${title}</h3>
          
          <div class="storyline-badge" title="${state.isKhmer ? 'ករណីសិក្សាជាក់ស្តែងក្នុងរោងចក្រ / អាជីវកម្ម' : 'Real-World Workplace Scenario'}">
            <span class="storyline-icon">🏭</span>
            <span class="storyline-text">${storyline}</span>
          </div>

          <p class="lesson-summary">${summary}</p>
          <div class="tool-tags">${toolTagsHtml}</div>
        </div>

        ${state.isTrainerMode ? `
        <div class="trainer-card-cue">
          <span>👨‍🏫 <strong>${state.isKhmer ? 'កំណត់ចំណាំគ្រូ' : 'Trainer Script'}:</strong> ${state.isKhmer ? 'មានកំណត់ចំណាំពេញលេញក្នុងស្លាយនីមួយៗ' : 'Full speaker notes & step demonstrations included in deck.'}</span>
        </div>
        ` : ''}

        <div class="card-footer">
          <div class="status-indicator">
            <span class="status-dot"></span>
            <span>${statusText}</span>
          </div>
          <div class="card-action-group">
            <button class="btn-launch" onclick="window.launchLessonTheater(${lesson.day})">
              <span>▶</span>
              <span>${state.isKhmer ? 'បើកមេរៀន' : 'Launch Lesson'}</span>
            </button>
            <a href="day${lesson.day}-presentation/index.html" target="_blank" class="btn-popout" title="${state.isKhmer ? 'បើកក្នុងផ្ទាំងថ្មី (សម្រាប់ម៉ាស៊ីនបញ្ចាំង ឬអេក្រង់ទី ២)' : 'Open in New Window / Projector Presentation Mode'}">
              ↗
            </a>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  }

  // --------------------------------------------------------------------------
  // 5. INTERACTION HANDLERS & FILTERS
  // --------------------------------------------------------------------------
  window.setPhaseFilter = function (phaseId) {
    state.activePhaseFilter = phaseId;

    // Update filter pills UI
    const pills = document.querySelectorAll('.filter-pill');
    pills.forEach(p => {
      const pPhase = p.getAttribute('data-phase');
      if (pPhase === String(phaseId)) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });

    renderPhaseSummaryCards();
    renderLessonCards();
  };

  window.setStageFilter = function (stageKey) {
    state.activeStageFilter = (state.activeStageFilter === stageKey) ? 'all' : stageKey;

    const nodes = document.querySelectorAll('.ribbon-node');
    nodes.forEach(n => {
      if (n.getAttribute('data-stage') === state.activeStageFilter) {
        n.classList.add('active');
      } else {
        n.classList.remove('active');
      }
    });

    renderLessonCards();
  };

  window.handleSearchInput = function (event) {
    state.searchQuery = event.target.value;
    renderLessonCards();
  };

  window.handleStatusFilterChange = function (event) {
    state.activeStatusFilter = event.target.value;
    renderLessonCards();
  };

  window.toggleLanguage = function () {
    state.isKhmer = !state.isKhmer;
    saveCurrentState();
    renderAll();
    // Update theater if open
    if (state.activeTheaterDay) {
      updateTheaterHeader(state.activeTheaterDay);
    }
  };

  window.toggleLessonComplete = function (dayNum, event) {
    if (event) event.stopPropagation();

    const idx = state.completedDays.indexOf(dayNum);
    if (idx > -1) {
      state.completedDays.splice(idx, 1);
    } else {
      state.completedDays.push(dayNum);
      state.completedDays.sort((a, b) => a - b);
    }

    saveCurrentState();
    renderHeroMetrics();
    renderPhaseSummaryCards();
    renderLessonCards();

    // Sync with theater player button if open
    if (state.activeTheaterDay === dayNum) {
      updateTheaterHeader(dayNum);
    }
  };

  window.resumeNextLesson = function () {
    const nextDay = getNextRecommendedDay();
    window.launchLessonTheater(nextDay);
  };

  // --------------------------------------------------------------------------
  // 6. INTEGRATED THEATER VIEWER (MODAL PLAYER)
  // --------------------------------------------------------------------------
  const theaterOverlay = document.getElementById('theater-overlay');
  const theaterIframe = document.getElementById('theater-iframe');

  window.launchLessonTheater = function (dayNum) {
    if (dayNum < 1) dayNum = 1;
    if (dayNum > 27) dayNum = 27;

    state.activeTheaterDay = dayNum;
    state.lastVisitedDay = dayNum;

    if (!state.inProgressDays.includes(dayNum)) {
      state.inProgressDays.push(dayNum);
    }
    saveCurrentState();

    updateTheaterHeader(dayNum);

    const targetUrl = `day${dayNum}-presentation/index.html`;
    if (theaterIframe) {
      theaterIframe.src = targetUrl;
    }

    if (theaterOverlay) {
      theaterOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    renderHeroMetrics();
    renderLessonCards();
  };

  function updateTheaterHeader(dayNum) {
    const lesson = LESSONS_DATA.find(l => l.day === dayNum);
    if (!lesson) return;

    const dayLabelEl = document.getElementById('theater-day-label');
    const btnPrev = document.getElementById('theater-btn-prev');
    const btnNext = document.getElementById('theater-btn-next');
    const btnComplete = document.getElementById('theater-btn-complete');
    const btnPopout = document.getElementById('theater-btn-popout');

    if (dayLabelEl) {
      dayLabelEl.textContent = state.isKhmer ? `ថ្ងៃទី ${lesson.day}` : `Day ${lesson.day}`;
    }
    if (btnPrev) {
      btnPrev.disabled = (dayNum <= 1);
    }
    if (btnNext) {
      btnNext.disabled = (dayNum >= 27);
    }
    if (btnPopout) {
      btnPopout.href = `day${dayNum}-presentation/index.html`;
    }

    if (btnComplete) {
      const isDone = state.completedDays.includes(dayNum);
      if (isDone) {
        btnComplete.classList.add('is-done');
        btnComplete.innerHTML = `✓ ${state.isKhmer ? 'រួចរាល់' : 'Done'}`;
      } else {
        btnComplete.classList.remove('is-done');
        btnComplete.innerHTML = `○ ${state.isKhmer ? 'មិនទាន់' : 'Done'}`;
      }
    }
  }

  window.closeTheater = function () {
    if (theaterOverlay) {
      theaterOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
    if (theaterIframe) {
      theaterIframe.src = 'about:blank';
    }
    renderAll();
  };

  window.stepTheater = function (delta) {
    const nextDay = state.activeTheaterDay + delta;
    if (nextDay >= 1 && nextDay <= 27) {
      window.launchLessonTheater(nextDay);
    }
  };

  window.toggleTheaterComplete = function () {
    if (!state.activeTheaterDay) return;
    window.toggleLessonComplete(state.activeTheaterDay);
    updateTheaterHeader(state.activeTheaterDay);
  };

  // --------------------------------------------------------------------------
  // 7. RESET PROGRESS & BATCH ACTIONS
  // --------------------------------------------------------------------------
  const resetModal = document.getElementById('reset-modal');

  window.openResetModal = function () {
    if (resetModal) resetModal.classList.add('active');
  };

  window.closeResetModal = function () {
    if (resetModal) resetModal.classList.remove('active');
  };

  window.confirmReset = function () {
    state.completedDays = [];
    state.inProgressDays = [1];
    state.lastVisitedDay = 1;
    saveCurrentState();
    window.closeResetModal();
    renderAll();
  };

  window.markAllComplete = function () {
    state.completedDays = Array.from({ length: 27 }, (_, i) => i + 1);
    saveCurrentState();
    renderAll();
  };

  // --------------------------------------------------------------------------
  // 8. CHEATSHEET DRAWER
  // --------------------------------------------------------------------------
  const cheatsheetDrawer = document.getElementById('cheatsheet-drawer');

  window.toggleCheatsheet = function () {
    if (cheatsheetDrawer) {
      cheatsheetDrawer.classList.toggle('active');
    }
  };

  // --------------------------------------------------------------------------
  // 9. KEYBOARD SHORTCUTS
  // --------------------------------------------------------------------------
  window.addEventListener('keydown', function (e) {
    // Focus Search
    if ((e.key === '/' || e.key === 's') && document.activeElement.tagName !== 'INPUT') {
      e.preventDefault();
      const searchInput = document.getElementById('search-input');
      if (searchInput) searchInput.focus();
    }
    // Escape closes modals or theater
    else if (e.key === 'Escape') {
      if (theaterOverlay && theaterOverlay.classList.contains('active')) {
        window.closeTheater();
      } else if (resetModal && resetModal.classList.contains('active')) {
        window.closeResetModal();
      } else if (cheatsheetDrawer && cheatsheetDrawer.classList.contains('active')) {
        window.toggleCheatsheet();
      }
    }
    // L for Language
    else if ((e.key === 'l' || e.key === 'L') && document.activeElement.tagName !== 'INPUT') {
      window.toggleLanguage();
    }
    // R for Resume
    else if ((e.key === 'r' || e.key === 'R') && document.activeElement.tagName !== 'INPUT') {
      window.resumeNextLesson();
    }
  });

  // --------------------------------------------------------------------------
  // 10. INITIALIZATION
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    loadSavedState();
    renderAll();
  });

})();


  window.toggleTrainerMode = function() {
    state.isTrainerMode = !state.isTrainerMode;
    const btn = document.getElementById('btn-mode-toggle');
    const label = document.getElementById('btn-mode-text');
    const icon = document.getElementById('btn-mode-icon');
    const banner = document.getElementById('trainer-banner');

    if (state.isTrainerMode) {
      if (btn) btn.classList.add('trainer-active');
      if (label) label.textContent = state.isKhmer ? 'របៀបគ្រូបង្រៀន' : 'Trainer Mode';
      if (icon) icon.textContent = '👨‍🏫';
      if (banner) banner.style.display = 'flex';
    } else {
      if (btn) btn.classList.remove('trainer-active');
      if (label) label.textContent = state.isKhmer ? 'របៀបសិស្ស' : 'Student Mode';
      if (icon) icon.textContent = '🎓';
      if (banner) banner.style.display = 'none';
    }
    renderLessonCards();
  };

  window.toggleMentalModelRibbon = function () {
    const ribbon = document.getElementById('model-ribbon-wrapper');
    const arrow = document.getElementById('ribbon-arrow-icon');
    if (!ribbon) return;
    if (ribbon.style.display === 'none' || !ribbon.style.display) {
      ribbon.style.display = 'block';
      if (arrow) arrow.innerHTML = '&#9652;';
    } else {
      ribbon.style.display = 'none';
      if (arrow) arrow.innerHTML = '&#9662;';
    }
  };
