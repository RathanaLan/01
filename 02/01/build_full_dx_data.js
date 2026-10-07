// DENSO DX DNA - Master Data Seed Generator
const fs = require('fs');
const path = require('path');

const dxCategories = [
  {
    "id": "cat-a",
    "code": "CAT-A",
    "name": "Digital Mindset & Problem Solving",
    "icon": "fa-brain",
    "color": "#3b82f6",
    "description": "Foundational mindsets, Genba observation, Kaizen methodologies, root-cause 5-Why analysis, and autonomous problem-solving.",
    "topicsCount": 17,
    "knowledgeCount": 1,
    "experienceCount": 0,
    "coverage": "88%"
  },
  {
    "id": "cat-b",
    "code": "CAT-B",
    "name": "Power Platform",
    "icon": "fa-bolt",
    "color": "#8b5cf6",
    "description": "Citizen development with Microsoft Power Apps, Power Automate flows, Power Pages, Dataverse, responsive containers, and error handling.",
    "topicsCount": 25,
    "knowledgeCount": 3,
    "experienceCount": 1,
    "coverage": "92%"
  },
  {
    "id": "cat-c",
    "code": "CAT-C",
    "name": "SharePoint & Microsoft 365",
    "icon": "fa-cubes",
    "color": "#06b6d4",
    "description": "Enterprise lists, document libraries, permission security, site architecture, metadata governance, Teams integration, and Copilot agents.",
    "topicsCount": 18,
    "knowledgeCount": 2,
    "experienceCount": 1,
    "coverage": "85%"
  },
  {
    "id": "cat-d",
    "code": "CAT-D",
    "name": "Data & Analytics",
    "icon": "fa-chart-pie",
    "color": "#10b981",
    "description": "Data collection, cleaning, modeling, KPI metrics, Power BI dashboards, DAX formulas, SQL databases, and data governance.",
    "topicsCount": 23,
    "knowledgeCount": 2,
    "experienceCount": 1,
    "coverage": "82%"
  },
  {
    "id": "cat-e",
    "code": "CAT-E",
    "name": "AI & Copilot",
    "icon": "fa-wand-magic-sparkles",
    "color": "#f59e0b",
    "description": "Generative AI fundamentals, prompt engineering, Copilot Studio custom agents, SharePoint grounding, manufacturing use cases, and responsible AI.",
    "topicsCount": 18,
    "knowledgeCount": 1,
    "experienceCount": 0,
    "coverage": "75%"
  },
  {
    "id": "cat-f",
    "code": "CAT-F",
    "name": "Integration & Development",
    "icon": "fa-code-merge",
    "color": "#ec4899",
    "description": "REST APIs, Microsoft Graph, JSON schemas, web development (HTML/CSS/JS/TS), Python scripting, Git version control, and automated testing.",
    "topicsCount": 20,
    "knowledgeCount": 1,
    "experienceCount": 0,
    "coverage": "78%"
  },
  {
    "id": "cat-g",
    "code": "CAT-G",
    "name": "IoT & Smart Factory",
    "icon": "fa-industry",
    "color": "#0ea5e9",
    "description": "Shopfloor sensors, IoT gateways, MQTT, OPC UA, machine-data telemetry, PLC integration, digital twin concepts, and predictive maintenance.",
    "topicsCount": 18,
    "knowledgeCount": 1,
    "experienceCount": 1,
    "coverage": "70%"
  },
  {
    "id": "cat-h",
    "code": "CAT-H",
    "name": "Delivery, Governance & Leadership",
    "icon": "fa-shield-halved",
    "color": "#e60012",
    "description": "DX project scoping, change management, manhour savings calculation, Citizen Developer governance, ALM, and Smart Factory roadmap alignment.",
    "topicsCount": 24,
    "knowledgeCount": 1,
    "experienceCount": 0,
    "coverage": "90%"
  }
];

const dxCapabilityLevels = [
  {
    "level": 0,
    "name": "Not Started",
    "badge": "L0: Not Started",
    "color": "#64748b",
    "definition": "No demonstrated knowledge or evidence for this capability.",
    "behaviors": "Has not engaged with the topic or attended relevant introductory sessions.",
    "requiredEvidence": "None required. Recommended: attend introductory briefing or complete foundation self-study.",
    "suggestedLearning": "Foundation self-study modules and overview videos.",
    "exampleActions": "Enroll in DX Foundation Track in Learning Hub."
  },
  {
    "level": 1,
    "name": "Aware",
    "badge": "L1: Aware",
    "color": "#3b82f6",
    "definition": "Understands basic terminology, purpose, and concepts. Cannot yet perform independently.",
    "behaviors": "Can explain core principles, identify where the technology fits, and discuss requirements with developers.",
    "requiredEvidence": "Training completion badge, online quiz score >= 80%, or session attendance record.",
    "suggestedLearning": "Complete Level 1 beginner modules and watch walkthrough videos.",
    "exampleActions": "Completed Introduction to Power Platform & SharePoint lists training."
  },
  {
    "level": 2,
    "name": "Practitioner",
    "badge": "L2: Practitioner",
    "color": "#06b6d4",
    "definition": "Can complete guided exercises and perform small tasks with peer or mentor support.",
    "behaviors": "Can build simple applications, write basic formulas/queries, and follow standard templates.",
    "requiredEvidence": "Hands-on lab exercise submission, sandbox demonstration, or prototype repository link.",
    "suggestedLearning": "Intermediate hands-on labs, template modification exercises.",
    "exampleActions": "Created a working prototype canvas app with 1 gallery and 1 form."
  },
  {
    "level": 3,
    "name": "Applied",
    "badge": "L3: Applied",
    "color": "#10b981",
    "definition": "Has applied the capability to solve a real Genba or administrative work problem.",
    "behaviors": "Works independently on routine tasks, can troubleshoot standard bugs, and explains implementation decisions.",
    "requiredEvidence": "Active production or pilot use case, user sign-off, or registered catalog solution.",
    "suggestedLearning": "Advanced architecture patterns, performance optimization, delegation guidelines.",
    "exampleActions": "Deployed production Power Automate approval flow saving 4 hours weekly in WH."
  },
  {
    "level": 4,
    "name": "Delivered",
    "badge": "L4: Delivered",
    "color": "#f59e0b",
    "definition": "Has implemented a robust production solution or led a meaningful workstream with documented controls.",
    "behaviors": "Applies error handling, ALM, security controls, backup plans, and handles production edge-cases.",
    "requiredEvidence": "Production deployment record, SOP/work instruction, verified manhour savings, architecture review.",
    "suggestedLearning": "Enterprise governance, solution packaging, mentorship skills.",
    "exampleActions": "Delivered multi-department E-Scrap ticketing system with QR scanning."
  },
  {
    "level": 5,
    "name": "Share & Sustain",
    "badge": "L5: Share & Sustain",
    "color": "#e60012",
    "definition": "Can create standards, reusable assets, templates, mentor others, review evidence, and sustain capability.",
    "behaviors": "Authors organizational SOPs, mentors junior developers, conducts architecture reviews, sustains systems.",
    "requiredEvidence": "Published reusable component, approved corporate standard/SOP, verified mentoring logs, peer review.",
    "suggestedLearning": "Community leadership, DX governance committee participation.",
    "exampleActions": "Authored DNKH Power Apps Responsive Layout Standard and mentored 5 citizen developers."
  }
];

const dxTopics = [
  {
    "id": "top-kaizen",
    "categoryId": "cat-a",
    "name": "Kaizen & Genba Problem Identification",
    "difficulty": "Beginner",
    "technologies": [
      "Genba Walk",
      "Muda Elimination",
      "Standard Work"
    ],
    "description": "Techniques for identifying shopfloor waste, observing manual pinch points, and formulating digital Kaizen targets."
  },
  {
    "id": "top-root-cause",
    "categoryId": "cat-a",
    "name": "Root-Cause Analysis (5-Why, Fishbone, 5M1E)",
    "difficulty": "Intermediate",
    "technologies": [
      "5-Why",
      "Ishikawa Diagram",
      "FTA",
      "5M1E"
    ],
    "description": "Systematic deduction to uncover genuine systemic failure modes rather than superficial operational symptoms."
  },
  {
    "id": "top-data-decision",
    "categoryId": "cat-a",
    "name": "Data-Driven Decision Making",
    "difficulty": "Intermediate",
    "technologies": [
      "Genbutsu Data",
      "Statistical Process",
      "Pareto"
    ],
    "description": "Transitioning from intuitive guesswork to verifiable empirical metrics and statistical process control."
  },
  {
    "id": "top-req-analysis",
    "categoryId": "cat-a",
    "name": "User Consultation & Requirement Scoping",
    "difficulty": "Intermediate",
    "technologies": [
      "User Interview",
      "Process Flowchart",
      "Voice of Customer"
    ],
    "description": "Facilitating structured interviews with line foremen and operators to isolate genuine user requirements."
  },
  {
    "id": "top-indep-problem",
    "categoryId": "cat-a",
    "name": "Independent Problem-Solving & Continuous Learning",
    "difficulty": "Advanced",
    "technologies": [
      "Self-Diagnosis",
      "Autonomous PDCA"
    ],
    "description": "Fostering autonomy in technical troubleshooting, testing hypotheses, and standardizing permanent countermeasures."
  },
  {
    "id": "top-pa-canvas",
    "categoryId": "cat-b",
    "name": "Canvas App Responsive Container Architecture",
    "difficulty": "Intermediate",
    "technologies": [
      "Power Apps",
      "Fluent UI",
      "Layout Containers"
    ],
    "description": "Building auto-resizing canvas screens using horizontal/vertical containers without hardcoded coordinates."
  },
  {
    "id": "top-pa-fx",
    "categoryId": "cat-b",
    "name": "Power Fx & Delegation Optimization",
    "difficulty": "Advanced",
    "technologies": [
      "Power Fx",
      "Delegation",
      "Collections"
    ],
    "description": "Writing efficient expressions, handling >2000 record limits, client collections, and index-friendly filters."
  },
  {
    "id": "top-pauto-flows",
    "categoryId": "cat-b",
    "name": "Power Automate Multi-Stage Approval Flows",
    "difficulty": "Intermediate",
    "technologies": [
      "Power Automate",
      "Approvals",
      "Adaptive Cards"
    ],
    "description": "Constructing robust serial and parallel approval trees with timeout handling and mobile notifications."
  },
  {
    "id": "top-pauto-error",
    "categoryId": "cat-b",
    "name": "Flow Error Handling, Retries & Child Flows",
    "difficulty": "Advanced",
    "technologies": [
      "Scope Blocks",
      "Run After",
      "Child Flows"
    ],
    "description": "Implementing try-catch pattern with Scope actions, exponential backoff retries, and reusable child flow calls."
  },
  {
    "id": "top-dataverse",
    "categoryId": "cat-b",
    "name": "Dataverse Fundamentals & Relational Modeling",
    "difficulty": "Intermediate",
    "technologies": [
      "Dataverse",
      "Role-Based Security",
      "Lookups"
    ],
    "description": "Architecting secure relational tables, choice columns, many-to-one lookups, and business rules in Dataverse."
  },
  {
    "id": "top-pa-alm",
    "categoryId": "cat-b",
    "name": "Power Platform ALM, Solutions & Environments",
    "difficulty": "Advanced",
    "technologies": [
      "Solutions",
      "Environment Variables",
      "Pipelines"
    ],
    "description": "Packaging components into managed solutions across Dev, Test, and Prod environments."
  },
  {
    "id": "top-sp-lists",
    "categoryId": "cat-c",
    "name": "SharePoint Lists & Metadata Architecture",
    "difficulty": "Beginner",
    "technologies": [
      "SharePoint Online",
      "Indexed Columns",
      "Views"
    ],
    "description": "Designing structured tables, configuring indexing to avoid 5000 item view thresholds, and calculated columns."
  },
  {
    "id": "top-sp-security",
    "categoryId": "cat-c",
    "name": "SharePoint Permissions & Role-Based Access Control",
    "difficulty": "Intermediate",
    "technologies": [
      "Permission Inheritance",
      "M365 Groups",
      "Item-Level Security"
    ],
    "description": "Managing broken inheritance, visitor/member/owner groups, and securing confidential engineering repositories."
  },
  {
    "id": "top-sp-teams",
    "categoryId": "cat-c",
    "name": "Microsoft Teams & SharePoint Deep Integration",
    "difficulty": "Beginner",
    "technologies": [
      "MS Teams",
      "Channels",
      "Tabs",
      "Shared Libraries"
    ],
    "description": "Embedding lists, live dashboards, and automated notifications into operational departmental Teams channels."
  },
  {
    "id": "top-sp-doc-gov",
    "categoryId": "cat-c",
    "name": "Document Governance, Versioning & Retention",
    "difficulty": "Intermediate",
    "technologies": [
      "Version History",
      "Content Types",
      "Audit Logs"
    ],
    "description": "Standardizing technical drawing releases, major/minor version check-ins, and compliance retention periods."
  },
  {
    "id": "top-sp-copilot",
    "categoryId": "cat-c",
    "name": "SharePoint Copilot Agents & Grounding Governance",
    "difficulty": "Advanced",
    "technologies": [
      "Copilot Studio",
      "Document Grounding",
      "Metadata Filters"
    ],
    "description": "Creating conversational agents grounded strictly in approved departmental SOP libraries."
  },
  {
    "id": "top-pbi-modeling",
    "categoryId": "cat-d",
    "name": "Power BI Star Schema & Data Modeling",
    "difficulty": "Intermediate",
    "technologies": [
      "Power BI",
      "Star Schema",
      "Relationship Cardinality"
    ],
    "description": "Structuring clean dimensional models with separate fact and dimension tables for optimal engine performance."
  },
  {
    "id": "top-pbi-dax",
    "categoryId": "cat-d",
    "name": "DAX Fundamentals & Time Intelligence Measures",
    "difficulty": "Advanced",
    "technologies": [
      "DAX",
      "CALCULATE",
      "YTD",
      "DIVIDE"
    ],
    "description": "Authoring robust measures for scrap rates, line OEE, manhour savings, and moving average trends."
  },
  {
    "id": "top-data-cleaning",
    "categoryId": "cat-d",
    "name": "Power Query & Automated Data Cleansing",
    "difficulty": "Intermediate",
    "technologies": [
      "Power Query",
      "M Language",
      "Transformation Steps"
    ],
    "description": "Automating Excel/CSV raw export cleaning, unpivoting shifts, and resolving data type mismatches."
  },
  {
    "id": "top-sql-basics",
    "categoryId": "cat-d",
    "name": "SQL Querying & Manufacturing Database Fundamentals",
    "difficulty": "Intermediate",
    "technologies": [
      "SQL",
      "JOINs",
      "Aggregations",
      "Indexes"
    ],
    "description": "Extracting production logs, downtime timestamps, and machine part numbers from relational SQL databases."
  },
  {
    "id": "top-data-governance",
    "categoryId": "cat-d",
    "name": "Data Ownership, Lineage & Quality Validation",
    "difficulty": "Advanced",
    "technologies": [
      "Data Dictionary",
      "Lineage Tracking",
      "Validation Rules"
    ],
    "description": "Establishing formal departmental data owners, validation rules before ingestion, and tracking provenance."
  },
  {
    "id": "top-prompt-design",
    "categoryId": "cat-e",
    "name": "Industrial Prompt Design & Engineering Standards",
    "difficulty": "Beginner",
    "technologies": [
      "Few-Shot Prompting",
      "Persona Definition",
      "Context Window"
    ],
    "description": "Structuring high-precision prompts with clear role, context, constraints, and structured output formatting."
  },
  {
    "id": "top-copilot-studio",
    "categoryId": "cat-e",
    "name": "Copilot Studio Custom Agent Architecture",
    "difficulty": "Advanced",
    "technologies": [
      "Copilot Studio",
      "Generative Answers",
      "Topic Nodes"
    ],
    "description": "Building domain-specific chatbots equipped with custom triggers, fallback topics, and Power Automate actions."
  },
  {
    "id": "top-ai-grounding",
    "categoryId": "cat-e",
    "name": "Knowledge-Source Quality & Grounding Verification",
    "difficulty": "Advanced",
    "technologies": [
      "RAG Grounding",
      "Source Attribution",
      "Hallucination Checks"
    ],
    "description": "Ensuring AI outputs are 100% cited against approved internal standards and preventing hallucinated directives."
  },
  {
    "id": "top-ai-ethics",
    "categoryId": "cat-e",
    "name": "Responsible AI & Confidential Data Handling",
    "difficulty": "Intermediate",
    "technologies": [
      "Data Loss Prevention",
      "Sensitive Info Masking",
      "AI Policy"
    ],
    "description": "Enforcing protocols to prevent confidential blueprints or trade-secret formulas from public model exposure."
  },
  {
    "id": "top-rest-apis",
    "categoryId": "cat-f",
    "name": "REST API, JSON & Microsoft Graph Integration",
    "difficulty": "Advanced",
    "technologies": [
      "REST API",
      "JSON",
      "OAuth2",
      "MS Graph"
    ],
    "description": "Connecting cloud workflows with enterprise systems using HTTP GET/POST, bearer token auth, and schema parsing."
  },
  {
    "id": "top-python-auto",
    "categoryId": "cat-f",
    "name": "Python for Genba Data Automation & Scripting",
    "difficulty": "Intermediate",
    "technologies": [
      "Python",
      "Pandas",
      "OpenPyXL",
      "Requests"
    ],
    "description": "Automating multi-file Excel consolidation, batch file renaming, and triggering API webhooks."
  },
  {
    "id": "top-web-dev",
    "categoryId": "cat-f",
    "name": "Modern Web Front-End Architecture (HTML/CSS/JS)",
    "difficulty": "Intermediate",
    "technologies": [
      "JavaScript",
      "HTML5",
      "CSS Grid",
      "DOM API"
    ],
    "description": "Developing lightweight responsive portals, Genba dashboard widgets, and client-side web tools."
  },
  {
    "id": "top-git-version",
    "categoryId": "cat-f",
    "name": "Git Version Control & Technical Documentation",
    "difficulty": "Intermediate",
    "technologies": [
      "Git",
      "Branching",
      "Markdown",
      "Changelogs"
    ],
    "description": "Maintaining code repositories, tracking revision histories, and writing maintainable engineering READMEs."
  },
  {
    "id": "top-iot-mqtt",
    "categoryId": "cat-g",
    "name": "IoT Gateways, MQTT & OPC UA Protocols",
    "difficulty": "Advanced",
    "technologies": [
      "MQTT",
      "OPC UA",
      "Edge Gateway",
      "Telemetry"
    ],
    "description": "Connecting shopfloor PLC controllers and edge sensors into cloud brokers via industrial communication protocols."
  },
  {
    "id": "top-machine-data",
    "categoryId": "cat-g",
    "name": "Real-Time Machine Data Collection & Telemetry",
    "difficulty": "Intermediate",
    "technologies": [
      "Analog Sensors",
      "Digital I/O",
      "Cycle Time Counters"
    ],
    "description": "Tapping into press strokes, temperature sensors, and leak test transducers for live dashboarding."
  },
  {
    "id": "top-digital-twin",
    "categoryId": "cat-g",
    "name": "Digital Twin Concepts & Line Simulation",
    "difficulty": "Advanced",
    "technologies": [
      "3D Modeling",
      "Telemetry Binding",
      "Simulation"
    ],
    "description": "Connecting virtual plant equipment models with live telemetry to visualize Genba bottleneck states."
  },
  {
    "id": "top-predictive-maint",
    "categoryId": "cat-g",
    "name": "Predictive Maintenance & Vibration Monitoring",
    "difficulty": "Advanced",
    "technologies": [
      "FFT Analysis",
      "Vibration Sensors",
      "Threshold Alerting"
    ],
    "description": "Detecting bearing wear and motor anomalies through trend deviation prior to catastrophic downtime."
  },
  {
    "id": "top-project-scope",
    "categoryId": "cat-h",
    "name": "DX Project Scoping, Current-State & ROI Analysis",
    "difficulty": "Intermediate",
    "technologies": [
      "Value Stream Map",
      "Business Case",
      "Manhour ROI"
    ],
    "description": "Calculating before-and-after manhour savings, scoping MVP deliverables, and drafting project charters."
  },
  {
    "id": "top-citizen-gov",
    "categoryId": "cat-h",
    "name": "Citizen Developer Governance & Application Ownership",
    "difficulty": "Advanced",
    "technologies": [
      "App Registry",
      "Ownership SLA",
      "Backup Person"
    ],
    "description": "Implementing governance controls, ensuring every app has a primary and backup owner, and maintenance SLAs."
  },
  {
    "id": "top-change-mgmt",
    "categoryId": "cat-h",
    "name": "Change Management, Genba Training & User Adoption",
    "difficulty": "Intermediate",
    "technologies": [
      "User Feedback",
      "Genba Coaching",
      "Quick Reference Guide"
    ],
    "description": "Securing operator buy-in, conducting hands-on station coaching, and preventing reversion to manual paper."
  },
  {
    "id": "top-knowledge-transfer",
    "categoryId": "cat-h",
    "name": "Standardization, SOP Creation & Succession Planning",
    "difficulty": "Advanced",
    "technologies": [
      "Standard Work (SOS)",
      "Video SOP",
      "Mentoring Logs"
    ],
    "description": "Transforming tacit project learnings into codified corporate assets to prevent brain-drain upon job rotations."
  }
];

const dxKnowledge = [
  {
    "id": "kno-pa-responsive",
    "title": "Power Apps Responsive Container Architecture Guide",
    "categoryId": "cat-b",
    "topicId": "top-pa-canvas",
    "knowledgeType": "Architecture Pattern",
    "difficulty": "Intermediate",
    "maturityLevel": "Share & Sustain",
    "technologies": [
      "Power Apps",
      "Fluent UI",
      "Layout Containers"
    ],
    "department": "TIE & DX",
    "owner": "Ananya Kasem (DX Specialist)",
    "createdDate": "2025-08-12",
    "updatedDate": "2026-02-14",
    "reviewDate": "2026-03-01",
    "verified": true,
    "verificationStatus": "Verified Level 5",
    "usageCount": 428,
    "bookmarksCount": 46,
    "relatedProjectIds": [
      "prj-leave-app",
      "prj-escrap-ticket",
      "prj-daily-report"
    ],
    "relatedExpertIds": [
      "exp-ananya",
      "exp-somchai"
    ],
    "shortDescription": "Standardized design pattern for building responsive Canvas Apps that adapt dynamically across mobile rugged tablets and wide desktop Genba displays.",
    "businessContext": "DNKH plant staff use diverse devices: handheld barcode scanners (720p), rugged Genba line tablets (1080p), and office multi-monitors (1440p). Fixed-coordinate apps create severe clipping and horizontal scrolling.",
    "problemAddressed": "Buttons falling off mobile screens, unreadable text on shopfloor terminals, and duplicate app creation for phone vs tablet form factors.",
    "explanation": "Utilizes Auto-Layout Horizontal and Vertical Containers with AlignItems = Stretch, FlexibleWidth = true, and zero X/Y hardcoding. Layout reflows smoothly without screen refresh lag.",
    "whenToUse": "Mandatory for all Citizen Developer and enterprise applications deployed across multiple screen form factors.",
    "whenNotToUse": "Fixed single-station kiosk screens running on dedicated, locked industrial monitors with unchanging resolution.",
    "preconditions": "Canvas App Studio version 3.2305 or higher. \"Scale to fit\" must be turned OFF in App Settings.",
    "stepByStepGuidance": [
      "1. Open App Settings > Display > Turn OFF \"Scale to fit\" and \"Lock aspect ratio\".",
      "2. Insert a top-level Vertical Container (Parent_Vertical) set to X=0, Y=0, Width=Parent.Width, Height=Parent.Height.",
      "3. Insert Header Container (Height=64, FlexibleHeight=false) with DENSO red branding and user profile badge.",
      "4. Insert Body Container (FlexibleHeight=true) containing responsive navigation and data gallery.",
      "5. Wrap galleries inside scrollable containers with MinWidth=320px for mobile auto-wrapping."
    ],
    "technicalDetails": "Key Container Properties: FillPortions = 1; LayoutMinHeight = 480; LayoutMinWidth = 320; Wrap = true. Use Parent.Width / Parent.Height exclusively inside inner components.",
    "screenshotsMeta": "container_tree_hierarchy.png, mobile_vs_desktop_layout.png",
    "filesMeta": "DNKH_Responsive_Container_Template.msapp (2.1 MB)",
    "sourceLinks": "https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/create-responsive-layout",
    "relatedStandards": "DNKH-DX-STD-004: Mobile & Tablet UI/UX Design Guideline",
    "lessonsLearned": "Never nest more than 4 container levels deep to avoid layout rendering calculation stutter on older Zebra mobile terminals.",
    "risks": "Misconfigured FlexibleWidth can cause input text fields to collapse to 0 width on small viewports.",
    "securityNotes": "Responsive containers do not bypass data security. Data sources must maintain underlying row-level security.",
    "versionHistory": "v1.0 (Aug 2025) Initial release; v1.2 (Feb 2026) Added wrap container mobile fallback rules.",
    "reviewHistory": "Reviewed by Somchai Prasert (TIE & DX Manager) on 2026-03-01. Approved as Corporate Standard."
  },
  {
    "id": "kno-flow-error-handling",
    "title": "Power Automate Scope-Based Error Handling & Retry SOP",
    "categoryId": "cat-b",
    "topicId": "top-pauto-error",
    "knowledgeType": "SOP",
    "difficulty": "Advanced",
    "maturityLevel": "Share & Sustain",
    "technologies": [
      "Power Automate",
      "Scope Blocks",
      "Try-Catch",
      "Adaptive Cards"
    ],
    "department": "TIE & DX",
    "owner": "Somchai Prasert (Lead Solution Architect)",
    "createdDate": "2025-06-20",
    "updatedDate": "2026-01-10",
    "reviewDate": "2026-02-15",
    "verified": true,
    "verificationStatus": "Verified Level 5",
    "usageCount": 382,
    "bookmarksCount": 39,
    "relatedProjectIds": [
      "prj-leave-app",
      "prj-manhour-gen",
      "prj-escrap-ticket"
    ],
    "relatedExpertIds": [
      "exp-somchai"
    ],
    "shortDescription": "Standard Operating Procedure for implementing enterprise Try-Catch-Finally exception handling, exponential retry loops, and Teams failure telemetry in cloud flows.",
    "businessContext": "Automated approval and inventory workflows frequently encounter intermittent network glitches, API throttling, or locked Excel sheets, leading to silent flow failures.",
    "problemAddressed": "Unmonitored workflow failures where operators assume a request is progressing, but the flow aborted silently without notifying support.",
    "explanation": "Flows are structured into three discrete Scope actions: Scope_Try (main execution logic), Scope_Catch (runs only if Scope_Try has Failed, TimedOut, or is Skipped), and Scope_Finally (always executes audit logging).",
    "whenToUse": "Mandatory for all Tier 2 and Tier 3 production workflows touching transactional manufacturing or human resource records.",
    "whenNotToUse": "Simple personal reminder flows with no downstream database side-effects.",
    "preconditions": "Power Automate Premium or Standard license with SharePoint List or SQL connector permissions.",
    "stepByStepGuidance": [
      "1. Add \"Scope\" action and rename to \"Scope_Try\". Move all business actions inside.",
      "2. Add second \"Scope\" action immediately below and rename to \"Scope_Catch\".",
      "3. Click three dots on Scope_Catch > \"Configure Run After\" > Uncheck \"is successful\", check \"has failed\", \"has timed out\", \"is skipped\".",
      "4. Inside Scope_Catch, call \"result('Scope_Try')\" in a Filter Array to extract error message, status, and failing step name.",
      "5. Dispatch urgent Adaptive Card alert to IT Support Teams channel with direct link to Flow Run URL."
    ],
    "technicalDetails": "Filter Expression: @equals(item()?['status'], 'Failed'). Extract error message with: @first(body('Filter_Failed_Actions'))?['error']?['message'].",
    "screenshotsMeta": "flow_scope_try_catch_setup.png, teams_error_alert_card.png",
    "filesMeta": "TryCatch_Template_Flow.zip (180 KB)",
    "sourceLinks": "https://learn.microsoft.com/en-us/power-automate/error-handling",
    "relatedStandards": "DNKH-DX-STD-008: Enterprise Workflow Resiliency Standard",
    "lessonsLearned": "Always configure exponential retry policy on individual HTTP and SharePoint connectors (Count: 4, Interval: PT20S).",
    "risks": "Failing to include Scope_Catch will leave records in \"Processing\" limbo indefinitely if a downstream step crashes.",
    "securityNotes": "Do not print full unmasked SQL connection strings or user passwords into the Teams error card.",
    "versionHistory": "v1.0 (Jun 2025) First release; v2.0 (Jan 2026) Upgraded with Adaptive Card JSON v1.5 payload.",
    "reviewHistory": "Verified by Kenji Nomura (QA/PE Master) on 2026-02-15."
  },
  {
    "id": "kno-sp-indexing-gov",
    "title": "SharePoint 5000-Item View Threshold Prevention & Indexing Standard",
    "categoryId": "cat-c",
    "topicId": "top-sp-lists",
    "knowledgeType": "Standard",
    "difficulty": "Intermediate",
    "maturityLevel": "Delivered",
    "technologies": [
      "SharePoint Lists",
      "Column Indexing",
      "CAML Query"
    ],
    "department": "TIE & DX",
    "owner": "Thanawat Rung (SharePoint Admin)",
    "createdDate": "2025-05-18",
    "updatedDate": "2026-01-22",
    "reviewDate": "2026-02-10",
    "verified": true,
    "verificationStatus": "Verified Level 4",
    "usageCount": 295,
    "bookmarksCount": 31,
    "relatedProjectIds": [
      "prj-fifo-digital",
      "prj-escrap-ticket",
      "prj-daily-report"
    ],
    "relatedExpertIds": [
      "exp-thanawat"
    ],
    "shortDescription": "Technical guidelines for configuring indexed columns, archive partitioned views, and Power Apps delegation when lists grow past 5,000 items.",
    "businessContext": "High-frequency Genba operational logs (such as scrap tickets and FIFO transactions) exceed 5,000 items within 3-6 months, causing standard list views to freeze.",
    "problemAddressed": "Errors: \"The attempted operation is prohibited because it exceeds the list view threshold enforced by the administrator\" in Power Apps galleries and browser views.",
    "explanation": "Lists can store up to 30 million items, but queries must filter on an Indexed Column as the first predicate. Up to 20 columns can be indexed per list.",
    "whenToUse": "Required during initial schema design for any list expected to accumulate >1,000 items annually.",
    "whenNotToUse": "Static reference lists with fewer than 100 fixed department entries.",
    "preconditions": "SharePoint List Owner / Full Control permission to configure List Settings.",
    "stepByStepGuidance": [
      "1. Open List Settings > Columns section > Click \"Indexed Columns\".",
      "2. Create primary index on high-cardinality search fields: Created, PartNumber, Status, Department.",
      "3. In Power Apps, always write Filter expressions where the first condition uses an Indexed column: Filter(List, Status = \"Active\" And ...).",
      "4. Implement automated annual archiving flow to move historical records > 12 months to an Archive Library."
    ],
    "technicalDetails": "Supported indexed column types: Single line of text, Choice (single value), Number, Date and Time, Person or Group (single value), Lookup (single value). Calculated and multi-choice columns CANNOT be indexed.",
    "screenshotsMeta": "sp_indexed_column_screen.png",
    "filesMeta": "SharePoint_Large_List_Archiving_Flow.zip (145 KB)",
    "sourceLinks": "https://learn.microsoft.com/en-us/sharepoint/manage-large-lists-and-libraries",
    "relatedStandards": "DNKH-IT-DAT-002: Plant Data Storage & Capacity Guidelines",
    "lessonsLearned": "Create indexed columns BEFORE the list reaches 5,000 items; creating indexes on lists already exceeding 5,000 items can time out in the admin portal.",
    "risks": "Querying without indexed filters will fail silently in Power Automate pagination.",
    "securityNotes": "Indexed columns do not affect item-level security permissions.",
    "versionHistory": "v1.1 (Jan 2026) Added Power Apps Delegation Filter matrix.",
    "reviewHistory": "Verified by Somchai Prasert on 2026-02-10."
  },
  {
    "id": "kno-copilot-prompt-standard",
    "title": "Industrial Prompt Design & Grounding Verification Standard",
    "categoryId": "cat-e",
    "topicId": "top-prompt-design",
    "knowledgeType": "Standard",
    "difficulty": "Intermediate",
    "maturityLevel": "Delivered",
    "technologies": [
      "Microsoft 365 Copilot",
      "Prompt Engineering",
      "RAG Grounding"
    ],
    "department": "TIE & DX",
    "owner": "Pitchaya S. (AI Engineer)",
    "createdDate": "2025-09-05",
    "updatedDate": "2026-03-02",
    "reviewDate": "2026-03-15",
    "verified": true,
    "verificationStatus": "Verified Level 4",
    "usageCount": 310,
    "bookmarksCount": 42,
    "relatedProjectIds": [
      "prj-dna-matrix"
    ],
    "relatedExpertIds": [
      "exp-pitchaya",
      "exp-somchai"
    ],
    "shortDescription": "Enterprise prompt engineering framework for querying technical troubleshooting databases, extracting failure modes, and guaranteeing 100% cited answers.",
    "businessContext": "Engineers querying Copilot for machine repair procedures require exact, hallucination-free answers grounded in official DENSO standards (SOS/JES/DPS).",
    "problemAddressed": "Vague prompts yielding generic internet answers that violate DENSO safety and torque specifications.",
    "explanation": "Structured \"C-R-E-A-T-E\" prompt syntax: Context, Role, Explicit Task, Audience, Tone, and Evidence Requirements. Mandates explicit grounding to specific internal document IDs.",
    "whenToUse": "Whenever drafting prompts for technical troubleshooting, SOP drafting, or configuring Copilot Studio custom agents.",
    "whenNotToUse": "Casual personal grammar checks or generic email drafting.",
    "preconditions": "Microsoft 365 Copilot or Copilot Studio license with access to approved SharePoint document repositories.",
    "stepByStepGuidance": [
      "1. Define Role: \"Act as a Senior DENSO Radiator Assembly PE Specialist\".",
      "2. Specify Context: \"Refer exclusively to attached procedure MMS-PC-2025-01 and QA-RAD-2025-089\".",
      "3. Declare Negative Constraints: \"Do not invent torque values. If the specification is not in the text, state 'Specification not found'\".",
      "4. Mandate Output Format: \"Output response as: 1. Root Cause, 2. Immediate Action, 3. Standard SOS reference\".",
      "5. Verify Attribution: Human engineer must verify the cited document section before line implementation."
    ],
    "technicalDetails": "Prompt Template Structure: [Role] + [Context & Grounding Source] + [Objective] + [Constraints / Negative Directives] + [Output Format] + [Attribution Requirement].",
    "screenshotsMeta": "copilot_studio_system_prompt_editor.png",
    "filesMeta": "DENSO_Copilot_Prompt_Library_v2.docx (850 KB)",
    "sourceLinks": "https://learn.microsoft.com/en-us/microsoft-cloud/dev/copilot/prompt-engineering",
    "relatedStandards": "DNKH-AI-GOV-001: Responsible AI & Intellectual Property Policy",
    "lessonsLearned": "Negative constraints (\"Never assume values\") decrease model hallucination rate by 84% on technical assembly instructions.",
    "risks": "Relying on unverified AI output for electrical wiring or hydraulic pressure settings without Genba validation.",
    "securityNotes": "Never include customer vehicle serial numbers or classified OEM drawings in public web prompts.",
    "versionHistory": "v2.0 (Mar 2026) Enhanced with Genba safety disclaimers.",
    "reviewHistory": "Approved by Kenji Nomura and Somchai Prasert on 2026-03-15."
  },
  {
    "id": "kno-pbi-star-schema",
    "title": "Power BI Star Schema & High-Performance DAX Architecture",
    "categoryId": "cat-d",
    "topicId": "top-pbi-modeling",
    "knowledgeType": "Best Practice",
    "difficulty": "Advanced",
    "maturityLevel": "Delivered",
    "technologies": [
      "Power BI",
      "DAX",
      "Star Schema",
      "VertiPaq"
    ],
    "department": "PE",
    "owner": "Chaiwat P. (Data Engineer)",
    "createdDate": "2025-07-14",
    "updatedDate": "2026-01-18",
    "reviewDate": "2026-02-20",
    "verified": true,
    "verificationStatus": "Verified Level 4",
    "usageCount": 265,
    "bookmarksCount": 28,
    "relatedProjectIds": [
      "prj-manhour-gen",
      "prj-daily-report"
    ],
    "relatedExpertIds": [
      "exp-chaiwat"
    ],
    "shortDescription": "Guidelines for dimensional modeling, eliminating bidirectional relationships, and writing memory-efficient DAX measures for manufacturing telemetries.",
    "businessContext": "Plant management dashboards combining machine output, scrap count, and operator manhours suffer from slow refresh times (>45 mins) when models use snowflake or flat tables.",
    "problemAddressed": "Slow report rendering, circular dependency errors, and inaccurate totals when slicing by date or shift.",
    "explanation": "Separates data into Central Fact Tables (e.g., Fact_ProductionLogs, Fact_ScrapTickets) linked via 1-to-Many single-direction relationships to Dimension Tables (Dim_Date, Dim_Product, Dim_Shift, Dim_Line).",
    "whenToUse": "Mandatory for all Power BI reporting models published to plant workspace gateways.",
    "whenNotToUse": "Single-table quick ad-hoc exports with fewer than 500 rows.",
    "preconditions": "Power BI Desktop latest release, understanding of dimensional data modeling concepts.",
    "stepByStepGuidance": [
      "1. In Power Query, transform source tables into distinct Dimension tables with unique Primary Keys.",
      "2. Remove unused high-cardinality columns (e.g. random GUIDs, timestamp seconds) to compress VertiPaq engine memory.",
      "3. Establish 1-to-Many relationships pointing from Dimensions down to Facts. Never enable Bi-Directional filtering unless strictly necessary.",
      "4. Write measures using explicit DIVIDE(Numerator, Denominator, 0) instead of forward-slash to eliminate divide-by-zero crashes.",
      "5. Wrap complex filter logic in CALCULATE with KEEPFILTERS to maintain filter context."
    ],
    "technicalDetails": "DAX Template: ScrapRate_Pct = DIVIDE(SUM(Fact_Scrap[Quantity]), SUM(Fact_Production[TotalProduced]), 0). Date Table must be marked as official \"Date Table\".",
    "screenshotsMeta": "star_schema_relationship_diagram.png",
    "filesMeta": "Template_Plant_StarSchema.pbit (1.2 MB)",
    "sourceLinks": "https://learn.microsoft.com/en-us/power-bi/guidance/star-schema",
    "relatedStandards": "DNKH-IT-DAT-003: Enterprise Reporting & BI Data Model Standards",
    "lessonsLearned": "Removing millisecond timestamps from IoT telemetry rows reduced PBIX memory footprint from 680 MB to 42 MB.",
    "risks": "Bi-directional filtering creates ambiguity and unexpected results in multi-fact tables.",
    "securityNotes": "Implement Row-Level Security (RLS) on Dim_Department for cross-plant reporting privacy.",
    "versionHistory": "v1.2 (Jan 2026) Added manufacturing shift calendar DAX rules.",
    "reviewHistory": "Verified by Somchai Prasert on 2026-02-20."
  },
  {
    "id": "kno-5why-mastery",
    "title": "Genba 5-Why Analysis & Systematic Countermeasure Standard",
    "categoryId": "cat-a",
    "topicId": "top-root-cause",
    "knowledgeType": "Standard",
    "difficulty": "Beginner",
    "maturityLevel": "Share & Sustain",
    "technologies": [
      "5-Why",
      "Genba Genbutsu",
      "Poka-Yoke",
      "SOS/JES"
    ],
    "department": "QA & QC",
    "owner": "Kenji Nomura (QA Senior Specialist)",
    "createdDate": "2025-04-10",
    "updatedDate": "2026-02-28",
    "reviewDate": "2026-03-10",
    "verified": true,
    "verificationStatus": "Verified Level 5",
    "usageCount": 512,
    "bookmarksCount": 68,
    "relatedProjectIds": [
      "prj-escrap-ticket",
      "prj-dna-matrix"
    ],
    "relatedExpertIds": [
      "exp-nomura"
    ],
    "shortDescription": "Official DENSO quality standard for conducting 5-Why root-cause investigation without jumping to human error or blaming operators.",
    "businessContext": "True Monozukuri excellence requires solving the fundamental mechanism of failure so defects never recur across any global DENSO facility.",
    "problemAddressed": "Superficial root cause conclusions such as \"Operator was careless\" or \"Re-train worker\", which fail to prevent recurrence.",
    "explanation": "Requires analyzing both the Occurrence Root Cause (Why did the physical defect happen?) and the Flow-Out Root Cause (Why did our quality gates fail to detect it?). Both chains must reach system-level poka-yoke countermeasures.",
    "whenToUse": "Mandatory for all Customer Claims, Warranty Claims, Scrap spikes, and Internal Defect investigations.",
    "whenNotToUse": "Routine minor tool replacements covered by preventative maintenance schedules.",
    "preconditions": "Physical inspection of defective parts (GENBUTSU) at the actual workstation (GENBA).",
    "stepByStepGuidance": [
      "1. Observe Genbutsu part under magnification and record exact quantitative deviance from LSL/USL.",
      "2. Formulate Why 1 strictly based on physics/mechanics (e.g., \"Crimp tab height exceeded spec by 0.12mm\").",
      "3. Progress Why 2 through 4 investigating tooling wear, thermal expansion, or sensor detection thresholds.",
      "4. Conclude at Root Cause: \"Lack of automatic detection or mechanical poka-yoke interlock\".",
      "5. Mandate hardware/software poka-yoke countermeasure that halts machine automatically before defective part leaves station."
    ],
    "technicalDetails": "Validation test: Apply the \"Therefore\" reverse test. Read backwards from Root Cause to Occurrence; each link must remain logically airtight.",
    "screenshotsMeta": "denso_official_5why_worksheet.png",
    "filesMeta": "Q-TroubleShooting_5Why_Official_Format.xlsx (420 KB)",
    "sourceLinks": "https://denso.sharepoint.com/qa/standards/5why-genba",
    "relatedStandards": "DNKH-QA-STD-001: Global Kakotora Recurrence Prevention Manual",
    "lessonsLearned": "Never accept \"Retrained operator\" as a root cause countermeasure. If a human can make a mistake, the system design is flawed.",
    "risks": "Skipping Genbutsu observation leads to theoretical debates that miss the true physical anomaly.",
    "securityNotes": "Maintain strict part confidentiality when sharing cross-plant Kakotora alerts.",
    "versionHistory": "v3.0 (Feb 2026) Fully harmonized with IATF 16949 Clause 10.2.",
    "reviewHistory": "Verified by Kenji Nomura and QA Division Director on 2026-03-10."
  },
  {
    "id": "kno-iot-opcua-mqtt",
    "title": "Shopfloor OPC UA to MQTT Edge Gateway Architecture",
    "categoryId": "cat-g",
    "topicId": "top-iot-mqtt",
    "knowledgeType": "Architecture Pattern",
    "difficulty": "Advanced",
    "maturityLevel": "Delivered",
    "technologies": [
      "OPC UA",
      "MQTT",
      "Edge Computing",
      "PLC"
    ],
    "department": "PE",
    "owner": "Nattapong T. (Smart Factory Engineer)",
    "createdDate": "2025-08-30",
    "updatedDate": "2026-01-15",
    "reviewDate": "2026-02-18",
    "verified": true,
    "verificationStatus": "Verified Level 4",
    "usageCount": 220,
    "bookmarksCount": 24,
    "relatedProjectIds": [
      "prj-fifo-digital",
      "prj-daily-report"
    ],
    "relatedExpertIds": [
      "exp-nattapong"
    ],
    "shortDescription": "Industrial edge computing architecture for translating machine PLC registers into lightweight MQTT telemetry packets for cloud dashboards.",
    "businessContext": "Legacy plant production lines utilize Omron, Mitsubishi, and Siemens PLCs with disparate proprietary protocols, hindering centralized OEE analytics.",
    "problemAddressed": "Direct polling of shopfloor PLCs from cloud systems causes network contention and plant network security vulnerabilities.",
    "explanation": "Deploys hardened industrial edge gateways on the OT line network. Gateways read PLC tags via OPC UA at 100ms intervals, package deltas into JSON payloads, and publish via TLS-encrypted MQTT to the IT broker.",
    "whenToUse": "Connecting manufacturing lines, crimping presses, brazing furnaces, and test benches to digital dashboards.",
    "whenNotToUse": "Critical closed-loop machine safety interlocks (must remain hardwired in safety PLCs).",
    "preconditions": "Industrial edge PC (Ubuntu Core / Debian), isolated OT network VLAN, PLC Ethernet communication card.",
    "stepByStepGuidance": [
      "1. Connect Edge Gateway dual NICs: Port 1 to OT Line VLAN (static IP), Port 2 to IT Factory Network (DHCP).",
      "2. Configure OPC UA server node IDs on the PLC for: CycleTime, PartCounter, AlarmCode, ForceTransducer.",
      "3. Deploy lightweight Python daemon reading tags on change (deadband = 0.5%).",
      "4. Package telemetry into standard JSON schema: { plant: \"DNKH\", line: \"RAD-02\", station: \"CRIMP\", ts: 1770000, metrics: {...} }.",
      "5. Publish with MQTT QoS 1 to enterprise broker with auto-reconnect and local flash buffering."
    ],
    "technicalDetails": "MQTT Topic Hierarchy: dnkh/thermal/line2/station1/telemetry. Keep-alive: 30s. Offline buffer capacity: 72 hours local SQLite storage.",
    "screenshotsMeta": "iot_edge_gateway_topology.png",
    "filesMeta": "Edge_OPCUA_MQTT_Bridge.py (24 KB)",
    "sourceLinks": "https://opcfoundation.org/about/opc-technologies/opc-ua/",
    "relatedStandards": "DNKH-IT-SEC-005: Operational Technology (OT) Network Isolation Guidelines",
    "lessonsLearned": "Always implement deadband filtering at the edge; publishing continuous unvarying 0.00 values floods network bandwidth unnecessarily.",
    "risks": "Misconfigured gateway bridging IT and OT networks without firewall rules exposes shopfloor PLCs to IT broadcast storms.",
    "securityNotes": "Gateways must enforce certificate-based TLS 1.3 and disable inbound SSH on OT interfaces.",
    "versionHistory": "v1.1 (Jan 2026) Added SQLite store-and-forward buffer logic.",
    "reviewHistory": "Verified by Somchai Prasert on 2026-02-18."
  },
  {
    "id": "kno-citizen-alm-gov",
    "title": "Citizen Developer Application Lifecycle & Ownership Standard",
    "categoryId": "cat-h",
    "topicId": "top-citizen-gov",
    "knowledgeType": "Governance Rule",
    "difficulty": "Intermediate",
    "maturityLevel": "Share & Sustain",
    "technologies": [
      "ALM",
      "Ownership SLA",
      "Citizen Development",
      "App Registry"
    ],
    "department": "TIE & DX",
    "owner": "Somchai Prasert (Lead Solution Architect)",
    "createdDate": "2025-05-10",
    "updatedDate": "2026-02-05",
    "reviewDate": "2026-02-25",
    "verified": true,
    "verificationStatus": "Verified Level 5",
    "usageCount": 340,
    "bookmarksCount": 38,
    "relatedProjectIds": [
      "prj-leave-app",
      "prj-manhour-gen",
      "prj-one-store",
      "prj-escrap-ticket",
      "prj-fifo-digital",
      "prj-daily-report",
      "prj-dna-matrix"
    ],
    "relatedExpertIds": [
      "exp-somchai"
    ],
    "shortDescription": "Organizational governance framework categorizing Power Apps into 3 risk tiers, enforcing dual ownership, and mandating handover documentation.",
    "businessContext": "Citizen developers frequently build high-value apps, but when the employee transfers departments or resigns, orphaned apps break without maintenance.",
    "problemAddressed": "Unmonitored \"shadow IT\" applications lacking documentation, running on personal accounts, and causing line stoppages upon staff departures.",
    "explanation": "Classifies all apps into Tier 1 (Personal Productivity), Tier 2 (Departmental Process), and Tier 3 (Plant-Critical). Tier 2 & 3 apps must register in DX One Store, have a Primary & Secondary Owner, and undergo quarterly architecture reviews.",
    "whenToUse": "Applies to every application, flow, and dashboard built by any DNKH employee on corporate Microsoft 365 tenants.",
    "whenNotToUse": "Temporary sandbox experiments deleted within 14 days.",
    "preconditions": "Registration in DNA Matrix / DX One Store catalog.",
    "stepByStepGuidance": [
      "1. Complete App Registration form in DX Governance module before production launch.",
      "2. Assign Primary Owner (Creator) and Designated Backup Owner (Department peer).",
      "3. Publish User Guide and Admin SOP in SharePoint Documentation Library.",
      "4. Transfer flow and app ownership to Service Account or shared M365 Security Group.",
      "5. Conduct 6-month capability health check to verify continuous alignment with business process."
    ],
    "technicalDetails": "Mandatory Governance Fields: App ID, Tier, Business Process, Primary Owner, Backup Owner, Data Source, Maintenance Cadence, BCP Rollback Plan.",
    "screenshotsMeta": "citizen_developer_governance_tier_matrix.png",
    "filesMeta": "DNKH_Citizen_Dev_Handover_Template.docx (320 KB)",
    "sourceLinks": "https://learn.microsoft.com/en-us/power-platform/guidance/coe/starter-kit",
    "relatedStandards": "DNKH-DX-GOV-001: Citizen Development Governance Charter",
    "lessonsLearned": "Mandating a Backup Owner during initial registration eliminated 100% of orphaned app crashes over the last 12 months.",
    "risks": "Apps developed on personal accounts stop working immediately when employee M365 account is deactivated during role transfers.",
    "securityNotes": "Service Accounts must have MFA exceptions strictly restricted to conditional access IP ranges.",
    "versionHistory": "v2.1 (Feb 2026) Integrated automated quarterly owner re-certification.",
    "reviewHistory": "Approved by Plant Management Committee on 2026-02-25."
  },
  {
    "id": "kno-pa-delegation",
    "title": "Power Apps Delegation Optimization & 2,000 Row Limit Mitigation",
    "categoryId": "cat-b",
    "topicId": "top-pa-fx",
    "knowledgeType": "Architecture Pattern",
    "difficulty": "Advanced",
    "maturityLevel": "Share & Sustain",
    "technologies": [
      "Power Apps",
      "Power Fx",
      "Delegation",
      "Collections",
      "SharePoint Indexed Columns"
    ],
    "department": "TIE & DX",
    "owner": "Ananya Kasem (DX Specialist)",
    "createdDate": "2025-09-18",
    "updatedDate": "2026-02-10",
    "reviewDate": "2026-02-28",
    "verified": true,
    "verificationStatus": "Verified Level 5",
    "usageCount": 312,
    "bookmarksCount": 41,
    "relatedProjectIds": [
      "prj-leave-app",
      "prj-escrap-ticket",
      "prj-fifo-digital"
    ],
    "relatedExpertIds": [
      "exp-ananya",
      "exp-somchai"
    ],
    "shortDescription": "Comprehensive delegation architectural patterns for querying SharePoint lists and Dataverse tables with >2,000 rows without hitting non-delegable limits.",
    "businessContext": "DNKH production scrap logs and part tracking tables quickly exceed 10,000 records. Non-delegable queries cause incomplete search results on Genba tablets.",
    "problemAddressed": "Power Apps yellow warning triangle, inaccurate record counts, and search results failing to find existing historical records beyond the 2,000 row client cache.",
    "explanation": "Offload filtering, sorting, and search operations to server-side delegable functions (Filter with exact equals, StartsWith, Date comparisons). For complex client-side calculations, chunk-load into local collections asynchronously.",
    "whenToUse": "Any Power Apps canvas screen querying lists or tables expected to grow beyond 500 records.",
    "whenNotToUse": "Small static reference tables (<100 items) like shift codes or defect reason lookups.",
    "preconditions": "Indexed columns configured on target SharePoint list or Dataverse entity.",
    "stepByStepGuidance": [
      "1. Verify indexed columns on all filter keys (e.g., CreatedDate, PartNumber, DepartmentCode) in SharePoint List Settings.",
      "2. Replace non-delegable operators (in, Search on non-Dataverse) with delegable alternatives (StartsWith, exact Filter).",
      "3. For multi-field filtering, nest delegable Filter() statements rather than using Search().",
      "4. If aggregation over large datasets is required, use Power Automate flow or SQL stored procedure rather than client-side CountRows().",
      "5. Monitor App Checker Delegation tab during every build iteration."
    ],
    "technicalDetails": "Delegable operators in SharePoint: =, <>, <, <=, >, >=, StartsWith(). Non-delegable: In, Search(), Lower(), Upper(), Text(). Max client limit is 2,000 (set via App Settings > Data row limit).",
    "screenshotsMeta": "delegation_warning_remediation.png, indexed_column_setup.png",
    "filesMeta": "PowerApps_Delegation_CheatSheet_v2.pdf (850 KB)",
    "sourceLinks": "https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/delegation-overview",
    "relatedStandards": "DNKH-DX-STD-005: Power Platform Data Query & Delegation Architecture",
    "lessonsLearned": "Always test app queries with mock datasets of 5,000+ records during development to catch delegation warnings early.",
    "risks": "Ignoring delegation warnings leads to silent data omission where users believe records do not exist.",
    "securityNotes": "Server-side delegation respects row-level read permissions configured at the data source.",
    "versionHistory": "v2.0 (Feb 2026) Added chunked collection loading pattern for offline Genba inspections.",
    "reviewHistory": "Approved by Somchai Prasert on 2026-02-28."
  },
  {
    "id": "kno-sp-schema-gov",
    "title": "SharePoint Large-Scale List Architecture & Indexing Standards",
    "categoryId": "cat-c",
    "topicId": "top-sp-lists",
    "knowledgeType": "Architecture Pattern",
    "difficulty": "Intermediate",
    "maturityLevel": "Share & Sustain",
    "technologies": [
      "SharePoint Online",
      "Indexed Columns",
      "List Views",
      "Performance Tuning"
    ],
    "department": "TIE & DX",
    "owner": "Somchai Prasert (Lead Solution Architect)",
    "createdDate": "2025-06-22",
    "updatedDate": "2026-01-19",
    "reviewDate": "2026-02-15",
    "verified": true,
    "verificationStatus": "Verified Level 5",
    "usageCount": 285,
    "bookmarksCount": 33,
    "relatedProjectIds": [
      "prj-leave-app",
      "prj-one-store",
      "prj-fifo-digital"
    ],
    "relatedExpertIds": [
      "exp-somchai"
    ],
    "shortDescription": "Engineering standards for designing SharePoint lists that support 100,000+ items without hitting the 5,000-item List View Threshold lock.",
    "businessContext": "Plant tracking lists accumulate thousands of records monthly. Without indexing, standard browser views fail with threshold errors.",
    "problemAddressed": "List View Threshold (LVT) exceeded errors, blocked bulk updates, and sluggish loading times in manufacturing dashboards.",
    "explanation": "Configure up to 20 indexed columns per list on all query filter columns. Structure default views with strict date ranges (e.g. [Today]-30) and indexed status filters.",
    "whenToUse": "Mandatory for all production SharePoint lists intended to serve as application backends.",
    "whenNotToUse": "Simple static reference lookups with <200 records.",
    "preconditions": "SharePoint Site Owner or Administrator permissions to configure indexes.",
    "stepByStepGuidance": [
      "1. In List Settings > Indexed columns, create single-column indexes on key query targets (Status, CreatedDate, Department, LineCode).",
      "2. Ensure default view filters by an indexed column with high selectivity (e.g. Status = \"Active\").",
      "3. Set view item limit to 100 with pagination enabled.",
      "4. Never filter or sort by multi-value lookup or person fields in views returning >5,000 total items.",
      "5. Implement quarterly archiving flow to move completed transactions older than 18 months to cold storage libraries."
    ],
    "technicalDetails": "SharePoint Online supports up to 30 million items per list, but queries returning unindexed scans >5,000 items are throttled. Index creation must occur before list exceeds 20,000 items.",
    "screenshotsMeta": "sp_indexed_columns_console.png, list_view_threshold_bypass.png",
    "filesMeta": "SharePoint_List_Scalability_Architecture_DNKH.pdf (1.1 MB)",
    "sourceLinks": "https://learn.microsoft.com/en-us/sharepoint/manage-large-lists-and-libraries",
    "relatedStandards": "DNKH-DX-STD-008: Enterprise SharePoint Data Architecture Standard",
    "lessonsLearned": "Create indexed columns immediately upon list creation before the record count reaches 5,000 items.",
    "risks": "Trying to add indexes after a list exceeds 20,000 items can fail in web UI and requires PowerShell script execution.",
    "securityNotes": "Indexes do not alter list item permissions; existing ACLs remain strictly enforced.",
    "versionHistory": "v1.4 (Jan 2026) Added automated PowerShell indexing script for new site provisioning.",
    "reviewHistory": "Approved by Somchai Prasert on 2026-02-15."
  },
  {
    "id": "kno-pbi-dax-oee",
    "title": "Power BI DAX Manufacturing OEE & Time Intelligence Formulation Guide",
    "categoryId": "cat-d",
    "topicId": "top-pbi-dax",
    "knowledgeType": "Standard Formulation",
    "difficulty": "Advanced",
    "maturityLevel": "Delivered",
    "technologies": [
      "Power BI",
      "DAX",
      "OEE Formulation",
      "Time Intelligence",
      "Manufacturing KPIs"
    ],
    "department": "QA",
    "owner": "Pitchaya S. (Senior Quality Engineer)",
    "createdDate": "2025-10-05",
    "updatedDate": "2026-02-20",
    "reviewDate": "2026-03-02",
    "verified": true,
    "verificationStatus": "Verified Level 4",
    "usageCount": 245,
    "bookmarksCount": 29,
    "relatedProjectIds": [
      "prj-fifo-digital",
      "prj-daily-report"
    ],
    "relatedExpertIds": [
      "exp-pitchaya",
      "exp-somchai"
    ],
    "shortDescription": "Standardized DAX calculations for Overall Equipment Effectiveness (Availability × Performance × Quality) aligned with DENSO Global Production Standards.",
    "businessContext": "Different production lines calculated scrap and availability using inconsistent formulas, resulting in conflicting management reports.",
    "problemAddressed": "Discrepancies in plant KPI reporting, division-by-zero errors in DAX measures, and slow visual rendering on plantwide dashboards.",
    "explanation": "Defines formal DAX measures for Planned Production Time, Operating Time, Ideal Cycle Time, Good Count, and Total Count using safe DIVIDE() and CALCULATE() filters.",
    "whenToUse": "All operational and executive Power BI dashboards displaying plant equipment performance and line OEE.",
    "whenNotToUse": "Simple tally counters or non-manufacturing administrative dashboards.",
    "preconditions": "Clean star schema with connected Date dimension and Shift dimension.",
    "stepByStepGuidance": [
      "1. Import standard Date Dimension table with contiguous calendar dates.",
      "2. Define Base Measures: Total_Parts = SUM(Fact_Production[Part_Count]), Scrap_Parts = SUM(Fact_Scrap[Scrap_Count]).",
      "3. Formulate Quality Rate: Quality_Rate = DIVIDE(Total_Parts - Scrap_Parts, Total_Parts, 0).",
      "4. Formulate Availability: Availability = DIVIDE(Operating_Minutes, Planned_Minutes, 0).",
      "5. Formulate Performance: Performance = DIVIDE(Actual_Output * Ideal_Cycle_Seconds, Operating_Minutes * 60, 0).",
      "6. Formulate OEE: OEE = [Availability] * [Performance] * [Quality_Rate]."
    ],
    "technicalDetails": "Use DIVIDE(numerator, denominator, 0) instead of / operator to prevent NaN/Infinity. Use VAR for intermediate calculations to improve VertiPaq engine cache efficiency.",
    "screenshotsMeta": "dax_oee_formula_matrix.png, plant_oee_dashboard_view.png",
    "filesMeta": "DENSO_Standard_OEE_Template.pbit (3.4 MB)",
    "sourceLinks": "https://learn.microsoft.com/en-us/dax/best-practices/dax-divide-function",
    "relatedStandards": "DNKH-QA-STD-012: Equipment OEE & Scrap Rate Calculation Standard",
    "lessonsLearned": "Always calculate OEE at the lowest line/shift granularity before aggregating to plant summary to avoid weighted average errors.",
    "risks": "Unfiltered date contexts can calculate OEE over non-working holidays, artificially deflating availability.",
    "securityNotes": "Data source uses Row-Level Security (RLS) mapped to Plant Area Manager M365 security groups.",
    "versionHistory": "v2.0 (Feb 2026) Standardized across all 4 DNKH manufacturing plants.",
    "reviewHistory": "Approved by Kenji Nomura and Somchai Prasert on 2026-03-02."
  },
  {
    "id": "kno-rest-api-graph",
    "title": "Microsoft Graph & Enterprise REST API Integration Architecture",
    "categoryId": "cat-f",
    "topicId": "top-rest-apis",
    "knowledgeType": "Technical Architecture",
    "difficulty": "Advanced",
    "maturityLevel": "Delivered",
    "technologies": [
      "REST API",
      "Microsoft Graph",
      "OAuth 2.0",
      "JSON",
      "Power Automate Custom Connectors"
    ],
    "department": "TIE & DX",
    "owner": "Thanawat Rung (Process Automation Engineer)",
    "createdDate": "2025-11-12",
    "updatedDate": "2026-02-18",
    "reviewDate": "2026-03-01",
    "verified": true,
    "verificationStatus": "Verified Level 4",
    "usageCount": 198,
    "bookmarksCount": 24,
    "relatedProjectIds": [
      "prj-leave-app",
      "prj-one-store",
      "prj-daily-report"
    ],
    "relatedExpertIds": [
      "exp-thanawat",
      "exp-somchai"
    ],
    "shortDescription": "Enterprise architecture for connecting low-code solutions to Microsoft Graph API and factory SQL REST endpoints with OAuth2 bearer token handling.",
    "businessContext": "Standard low-code connectors cannot perform advanced operations like querying user manager hierarchies, reading group memberships, or syncing ERP inventory.",
    "problemAddressed": "Connector limitations, rate limiting (HTTP 429), and insecure credential handling in custom API integrations.",
    "explanation": "Utilizes Azure AD App Registrations with least-privilege delegated and application permissions, Azure Key Vault for client secret storage, and exponential retry logic for HTTP 429 throttling.",
    "whenToUse": "When extending Power Platform or web applications beyond out-of-the-box connector capabilities.",
    "whenNotToUse": "When standard native connectors (SharePoint, Outlook, Approvals) fulfill requirements completely.",
    "preconditions": "Azure AD App Registration with approved API permissions and client secret.",
    "stepByStepGuidance": [
      "1. Register application in Azure AD with specific least-privilege scopes (e.g. User.Read.All).",
      "2. Store Client ID and Secret in Azure Key Vault or Power Platform Environment Variables.",
      "3. Create Custom Connector in Power Platform with OAuth 2.0 Authentication Type.",
      "4. Implement HTTP action with Retry Policy set to Exponential (count: 5, interval: PT10S).",
      "5. Parse JSON responses with strict schema validation to catch unexpected API contract changes."
    ],
    "technicalDetails": "Headers: Authorization: Bearer {token}, Content-Type: application/json. Handle HTTP 429 by inspecting Retry-After header. Use $select and $filter query parameters to minimize response payloads.",
    "screenshotsMeta": "graph_api_connector_setup.png, postman_graph_test.png",
    "filesMeta": "DNKH_Graph_API_Custom_Connector_Swagger.json (48 KB)",
    "sourceLinks": "https://learn.microsoft.com/en-us/graph/use-the-api",
    "relatedStandards": "DNKH-IT-SEC-009: API Integration & OAuth Security Standard",
    "lessonsLearned": "Always request token refreshes before expiration (default token lifetime 60 minutes) to avoid mid-batch authentication failures.",
    "risks": "Over-granting permissions (e.g. Directory.ReadWrite.All) creates severe tenant security exposure.",
    "securityNotes": "Client secrets must rotate every 180 days with automated alerts 30 days prior to expiry.",
    "versionHistory": "v1.2 (Feb 2026) Updated with Microsoft Graph v1.0 endpoints and secret rotation guide.",
    "reviewHistory": "Approved by Somchai Prasert on 2026-03-01."
  }
];

const dxProjects = [
  {
    "id": "prj-leave-app",
    "name": "AP Leave Request System",
    "department": "PC",
    "process": "Plant Administration & Shift Attendance",
    "plantArea": "AP Plant / All Production Lines",
    "product": "Global / All",
    "owner": "Thanawat Rung (Citizen Developer)",
    "members": [
      "Ananya Kasem",
      "Chaiwat P."
    ],
    "sponsor": "Vichai S. (HR & Admin General Manager)",
    "startDate": "2025-03-01",
    "deploymentDate": "2025-06-15",
    "status": "Production",
    "confidentiality": "Internal",
    "summary": "Automated mobile & web leave request system replacing paper routing with multi-level Power Automate approval flows and shift coverage tracking.",
    "businessBackground": "DENSO AP Plant employs over 1,200 shift operators across Radiator, Magneto, and Cooler lines requiring daily attendance balancing.",
    "currentSituation": "Operators filled out paper carbon-copy leave slips, personally walked them to Line Foremen, who walked them to Section Managers, then delivered to HR.",
    "businessProblem": "Lost paper slips, delayed approvals leading to Furikae rotation confusion on line starts, and 3-day approval lead times.",
    "painPoints": [
      "Manual paper routing took 15 mins per request",
      "Line supervisors lacked real-time visibility of who would be absent next shift",
      "HR spent 12 hours monthly re-keying paper data into payroll SAP"
    ],
    "userGroups": [
      "Line Operators (1,200+)",
      "Shift Leaders (45)",
      "Department Managers (12)",
      "HR Admin (4)"
    ],
    "currentProcess": "Paper carbon slip -> Supervisor physical stamp -> Manager physical stamp -> Inter-office mail -> HR manual SAP entry.",
    "currentManhours": 140,
    "riskIfNotImproved": "High risk of unstaffed assembly stations causing line stoppages due to uncoordinated operator leaves during peak seasonal volumes.",
    "projectObjective": "Digitize 100% of leave requests, reduce approval turnaround from 72 hours to under 2 hours, and integrate live shift attendance.",
    "projectScope": "Power Apps canvas interface, Power Automate approval engine, SharePoint List database, Teams mobile notifications.",
    "outOfScope": "Direct SAP payroll automatic paycheck deductions (handled via verified CSV batch export).",
    "genbaObservations": "Supervisors spent up to 45 minutes every morning checking physical paper piles instead of conducting Genba safety walks.",
    "rootCause": "Lack of centralized digital intake combined with legacy requirement for physical red ink stamps.",
    "requirementAnalysis": "System must work seamlessly on mobile phones in Thai language with one-click approval buttons embedded directly in MS Teams notifications.",
    "processMap": "Employee submits in Mobile App -> Push notification to Line Leader -> Auto-checks shift minimum headcount -> Supervisor approves in Teams -> HR auto-notified.",
    "decisionCriteria": "Zero license cost increase (leveraging existing Microsoft 365 E3), mobile responsiveness, and offline request queuing.",
    "techSelectionReason": "Power Apps + Power Automate natively integrates with corporate Azure AD and requires no external server hosting.",
    "alternativesConsidered": [
      "Commercial HR SaaS package (Rejected due to high recurring per-user license cost of $4.50/user/mo)",
      "Custom Python Django app (Rejected due to high ongoing IT maintenance overhead)"
    ],
    "risks": "Operators forgetting passwords or lacking corporate email accounts on personal mobile devices.",
    "assumptions": "All production operators have access to company shared tablet kiosks or personal smartphones with M365 mobile authentication.",
    "dependencies": "Azure Active Directory organizational manager hierarchy must be accurately maintained by HR.",
    "solutionSummary": "Responsive Power Apps Canvas application integrated with 3-tier Power Automate approval workflow and SharePoint list storage with item-level security.",
    "futureProcess": "Operator opens app on smartphone/kiosk -> Selects date & reason -> Submits -> Leader receives Teams Adaptive Card -> One-click approval -> Calendar updated.",
    "architecture": "Client: Power Apps Canvas Mobile UI; Logic: Power Automate Cloud Flows; Storage: SharePoint Lists (LeaveRequests, ShiftQuotas); Notifications: Microsoft Teams Adaptive Cards.",
    "techUsed": [
      "Power Apps",
      "Power Automate",
      "SharePoint Online",
      "Teams Adaptive Cards",
      "Power Fx"
    ],
    "dataSources": [
      "SharePoint List: AP_Leave_Requests",
      "SharePoint List: AP_Shift_Quotas",
      "Office 365 Users Connector"
    ],
    "dataOwners": "HR Administration Department (Vichai S.)",
    "integrations": [
      "Azure Active Directory Manager Lookup",
      "Microsoft Teams Bot Webhook",
      "Outlook Shared Shift Calendar"
    ],
    "permissionModel": "Item-Level Security: Users can only read and edit their own requests; Supervisors read department submissions; HR reads all.",
    "validationLogic": "Prevents submission if department leave quota for selected shift is already exceeded (>10% of line headcount).",
    "notificationLogic": "Instant Teams ping with 24-hour escalation reminder to Section Manager if Supervisor has not reviewed.",
    "approvalLogic": "Sequential: Line Foreman (Check line balance) -> Section Manager (Formal approval) -> System auto-confirmation.",
    "errorHandling": "Try-catch scope block with error logging to SP Audit list and email to IT Helpdesk upon flow failure.",
    "deploymentApproach": "Phased rollout: Pilot on Radiator Line 1 (2 weeks) -> Thermal Division (1 month) -> AP Plant wide deployment.",
    "beforeState": "100% paper slips, 72-hour average approval turnaround, 140 monthly manhours consumed across plant.",
    "afterState": "100% paperless digital flow, 1.4-hour average approval turnaround, 18 monthly manhours consumed.",
    "hoursBefore": 140,
    "hoursAfter": 18,
    "hoursSaved": 122,
    "costSaving": "Sample: ~$3,660 / month in recovered supervisor and administrative manhours",
    "qualityImpact": "Zero lost leave slips; 100% audit compliance for IATF 16949 human resources documentation.",
    "productivityImpact": "Shift leaders save 35 minutes daily, directly redirecting time to quality verification and Genba coaching.",
    "leadTimeImpact": "Approval turnaround reduced by 98% (from 3 days to under 2 hours).",
    "userAdoption": "99.4% active adoption across 1,240 plant employees within 60 days of launch.",
    "evidenceSource": "Production Power BI telemetry report and HR department sign-off memo (Ref: AP-HR-2025-08).",
    "verificationStatus": "Verified Production Solution [Sample Data]",
    "appOwner": "Thanawat Rung (Primary)",
    "dataOwner": "Vichai S. (HR General Manager)",
    "supportOwner": "TIE & DX Helpdesk (Tier 1 Support)",
    "backupOwner": "Ananya Kasem (Secondary Developer)",
    "maintenanceFrequency": "Quarterly permission and quota review",
    "lastReview": "2026-01-20",
    "knownIssues": "Minor: Users with multiple concurrent supervisors occasionally experience routing delays if AAD org chart is outdated.",
    "enhancementBacklog": "Integrate automated medical certificate OCR scanning via AI Builder.",
    "docCompleteness": "100% (User Guide, Admin SOP, Architecture Diagram stored in DX Knowledge Library).",
    "trainingCompleteness": "100% (All 45 shift leaders trained in hands-on workshops).",
    "bcpNotes": "If Power Platform experiences global outage, emergency paper forms remain stationed at Genba security post.",
    "lessonsLearned": "Involving shift leaders in screen mockups during Week 1 eliminated UI resistance and ensured buttons were sized for work gloves.",
    "whatWorked": "Teams Adaptive Cards with instant Approve/Reject buttons inside chat drastically reduced approval lag.",
    "whatDidNotWork": "Initial version sent email notifications; operators rarely checked email. Switching to Teams push notifications solved responsiveness.",
    "reusableComponents": [
      "Denso Fluent Header Component",
      "Teams Adaptive Card Approval Template",
      "Shift Quota Checker Power Fx Formula"
    ],
    "reusableFormulas": "Filter(AP_Leave_Requests, Author.Email = User().Email && Status = \"Approved\")",
    "reusableFlows": "Standard 2-Stage Hierarchical Approval Flow with Auto-Escalation",
    "reusablePrompts": "N/A",
    "relatedSOP": "SOP-HR-DIG-002: Digital Leave Request Submission & Review Protocol",
    "relatedTraining": "Module PA-101: Citizen Developer Canvas App Essentials",
    "relatedExperts": [
      "exp-thanawat",
      "exp-ananya"
    ]
  },
  {
    "id": "prj-manhour-gen",
    "name": "AP Manhour Generator & Line Balancing Engine",
    "department": "PE",
    "process": "Industrial Engineering & Line Cycle Balancing",
    "plantArea": "Radiator & Cooler Assembly Lines",
    "product": "Radiator",
    "owner": "Chaiwat P. (Data Engineer)",
    "members": [
      "Kenji Nomura",
      "Somchai Prasert"
    ],
    "sponsor": "Prasert M. (Production Engineering Director)",
    "startDate": "2025-04-15",
    "deploymentDate": "2025-08-30",
    "status": "Production",
    "confidentiality": "Internal",
    "summary": "Automated production manhour calculation and dynamic line balancing system integrating machine cycle logs with operator standard work.",
    "beforeState": "Industrial engineers manually exported CSV logs from 18 PLC stations into Excel, spending 4 hours daily building pivot tables.",
    "afterState": "Automated daily data pipeline refreshing in Power BI every morning at 06:00, saving 3.5 hours daily per line.",
    "hoursBefore": 90,
    "hoursAfter": 12,
    "hoursSaved": 78,
    "costSaving": "Sample: ~$2,340 / month in engineering calculation time",
    "techUsed": [
      "Power BI",
      "SQL Server",
      "Power Query",
      "DAX",
      "Python"
    ],
    "verificationStatus": "Verified Production Solution [Sample Data]",
    "docCompleteness": "95%",
    "appOwner": "Chaiwat P.",
    "backupOwner": "Somchai Prasert",
    "relatedExperts": [
      "exp-chaiwat",
      "exp-somchai"
    ],
    "reusableComponents": [
      "Manufacturing Shift DAX Calendar Template",
      "PLC Cycle Time Outlier Filter"
    ]
  },
  {
    "id": "prj-one-store",
    "name": "DX One Store (Tooling & Spare Parts Catalog)",
    "department": "TIE & DX",
    "process": "Plant Maintenance & Tooling Supply Requisition",
    "plantArea": "Central Tooling Crib & Plant Warehouse",
    "product": "Global / All",
    "owner": "Ananya Kasem (DX Specialist)",
    "members": [
      "Thanawat Rung",
      "Nattapong T."
    ],
    "sponsor": "Katsuhiko T. (Monozukuri Innovation VP)",
    "startDate": "2025-06-01",
    "deploymentDate": "2025-10-20",
    "status": "Production",
    "confidentiality": "Internal",
    "summary": "E-commerce style digital catalog for plant maintenance engineers to search, reserve, and track specialized fabrication tooling, punches, and sensors.",
    "beforeState": "Technicians walked across plant to tool crib, searched manual physical logbooks, frequently discovering required punch was out of stock.",
    "afterState": "Live inventory catalog searchable by part number or machine line, 1-click reservation, and auto-restock triggers.",
    "hoursBefore": 110,
    "hoursAfter": 25,
    "hoursSaved": 85,
    "costSaving": "Sample: ~$2,550 / month + prevented 14 hours of line stoppage",
    "techUsed": [
      "Power Apps",
      "Dataverse",
      "Power Automate",
      "SharePoint Online"
    ],
    "verificationStatus": "Verified Production Solution [Sample Data]",
    "docCompleteness": "100%",
    "appOwner": "Ananya Kasem",
    "backupOwner": "Thanawat Rung",
    "relatedExperts": [
      "exp-ananya",
      "exp-somchai"
    ],
    "reusableComponents": [
      "Catalog Gallery Search & Filter Component",
      "Shopping Cart State Manager Collection"
    ]
  },
  {
    "id": "prj-escrap-ticket",
    "name": "E-Scrap Ticket System with QR Traceability",
    "department": "QA & QC",
    "process": "Quality Assurance & Defect Outflow Interlock",
    "plantArea": "Radiator Header Crimp & Brazing Stations",
    "product": "Radiator",
    "owner": "Kenji Nomura (QA Senior Specialist)",
    "members": [
      "Ananya Kasem",
      "Somchai Prasert"
    ],
    "sponsor": "Hiroshi T. (Quality Assurance Director)",
    "startDate": "2025-07-10",
    "deploymentDate": "2025-11-15",
    "status": "Production",
    "confidentiality": "Internal",
    "summary": "Real-time electronic scrap reporting with QR code tagging, instant defect photo capture, automated 5-Why root-cause routing, and scrap bin interlocks.",
    "beforeState": "Paper scrap tickets hand-written in grease pencil, consolidated weekly in Excel; root-cause analysis delayed by 5 to 7 days.",
    "afterState": "Instant tablet QR ticket generation, real-time defect telemetry alert to PE/QA within 60 seconds of scrap threshold trigger.",
    "hoursBefore": 160,
    "hoursAfter": 30,
    "hoursSaved": 130,
    "costSaving": "Sample: ~$3,900 / month + zero mixed defect scrap recurrence",
    "techUsed": [
      "Power Apps Barcode Scanner",
      "Power Automate",
      "SharePoint Lists",
      "Power BI"
    ],
    "verificationStatus": "Verified Production Solution [Sample Data]",
    "docCompleteness": "100%",
    "appOwner": "Kenji Nomura",
    "backupOwner": "Ananya Kasem",
    "relatedExperts": [
      "exp-nomura",
      "exp-ananya"
    ],
    "reusableComponents": [
      "Camera Photo Compression Component",
      "Scrap Reason Multi-Select Taxonomy"
    ]
  },
  {
    "id": "prj-fifo-digital",
    "name": "NB FIFO Digitalization & Aging Telemetry",
    "department": "WH",
    "process": "Warehouse Material Staging & FIFO Enforcement",
    "plantArea": "North Bay (NB) Raw Material & Tube Warehouse",
    "product": "Sus Oil / Tube I.C",
    "owner": "Nattapong T. (Smart Factory Engineer)",
    "members": [
      "Chaiwat P.",
      "Thanawat R."
    ],
    "sponsor": "Boonchai K. (Logistics General Manager)",
    "startDate": "2025-08-01",
    "deploymentDate": "2025-12-10",
    "status": "Production",
    "confidentiality": "Internal",
    "summary": "Barcode-scanned First-In-First-Out digital pallet tracking preventing material expiration, cold solder brazing flux aging, and staging bottlenecks.",
    "beforeState": "Forklift operators manually searched paper blackboard dates on racks; older aluminum coils occasionally bypassed FIFO causing brazing defects.",
    "afterState": "Zebra mobile scanner app enforcing strict oldest-pallet pickup lockout; audio buzzer warns forklift if newer pallet is scanned first.",
    "hoursBefore": 120,
    "hoursAfter": 20,
    "hoursSaved": 100,
    "costSaving": "Sample: ~$3,000 / month + eliminated aluminum coil obsolescence",
    "techUsed": [
      "Power Apps Mobile",
      "SharePoint Lists",
      "Barcode Scanning",
      "Power BI"
    ],
    "verificationStatus": "Verified Production Solution [Sample Data]",
    "docCompleteness": "92%",
    "appOwner": "Nattapong T.",
    "backupOwner": "Thanawat R.",
    "relatedExperts": [
      "exp-nattapong",
      "exp-chaiwat"
    ],
    "reusableComponents": [
      "Zebra Barcode Continuous Scan Listener",
      "Pallet Aging Color Heatmap Indicator"
    ]
  },
  {
    "id": "prj-daily-report",
    "name": "Daily Shift Handover & Downtime Reporting System",
    "department": "PD",
    "process": "Shopfloor Shift Transition & Incident Logging",
    "plantArea": "Plant 1 & 2 Assembly Operations",
    "product": "Global / All",
    "owner": "Thanawat Rung (Citizen Developer)",
    "members": [
      "Kenji Nomura",
      "Chaiwat P."
    ],
    "sponsor": "Somkiat L. (Production Operations Director)",
    "startDate": "2025-09-01",
    "deploymentDate": "2026-01-15",
    "status": "Production",
    "confidentiality": "Internal",
    "summary": "Digital shift handover log capturing hourly output counts, maintenance downtime stops, safety near-misses, and 4M changes on line tablets.",
    "beforeState": "Shift leaders wrote notes in physical paper logbooks; next shift spent 20 minutes deciphering handwriting and missed critical machine quirks.",
    "afterState": "Standardized digital shift summary submitted 10 mins before buzzer; incoming supervisor receives executive mobile briefing on phone.",
    "hoursBefore": 85,
    "hoursAfter": 15,
    "hoursSaved": 70,
    "costSaving": "Sample: ~$2,100 / month + improved shift handover clarity",
    "techUsed": [
      "Power Apps",
      "SharePoint Online",
      "Teams Adaptive Cards",
      "Power BI"
    ],
    "verificationStatus": "Verified Production Solution [Sample Data]",
    "docCompleteness": "96%",
    "appOwner": "Thanawat Rung",
    "backupOwner": "Chaiwat P.",
    "relatedExperts": [
      "exp-thanawat",
      "exp-nomura"
    ],
    "reusableComponents": [
      "4M Change Notification Card",
      "Hourly Production Pacing Visual Grid"
    ]
  },
  {
    "id": "prj-dna-matrix",
    "name": "DNA Matrix Knowledge & Capability Platform",
    "department": "TIE & DX",
    "process": "Organizational Capability & Quality Knowledge Management",
    "plantArea": "Company-Wide / All Plants",
    "product": "Global / All",
    "owner": "Somchai Prasert (Lead Solution Architect)",
    "members": [
      "Kenji Nomura",
      "Ananya Kasem",
      "Pitchaya S.",
      "Chaiwat P."
    ],
    "sponsor": "Katsuhiko T. (Monozukuri Innovation VP)",
    "startDate": "2025-10-01",
    "deploymentDate": "2026-03-01",
    "status": "Production",
    "confidentiality": "Internal",
    "summary": "Next-generation Monozukuri & Digital Transformation capability platform connecting problem solving, engineering standards, project DNA, and evidence-based self-development.",
    "beforeState": "Knowledge isolated in individual departmental binders, personal laptops, or lost upon senior engineer transfers and retirements.",
    "afterState": "Unified enterprise platform linking Quality DNA with DX DNA, role-based learning tracks, interactive capability matrix, and searchable failure lessons.",
    "hoursBefore": 250,
    "hoursAfter": 45,
    "hoursSaved": 205,
    "costSaving": "Sample: ~$6,150 / month + institutional knowledge preservation",
    "techUsed": [
      "Native Web Platform",
      "Chart.js",
      "Power Platform Integration Architecture",
      "Copilot Grounding"
    ],
    "verificationStatus": "Verified Production Solution [Sample Data]",
    "docCompleteness": "100%",
    "appOwner": "Somchai Prasert",
    "backupOwner": "Ananya Kasem",
    "relatedExperts": [
      "exp-somchai",
      "exp-nomura",
      "exp-ananya",
      "exp-pitchaya"
    ],
    "reusableComponents": [
      "DNA Matrix 4-Dimension Capability Model",
      "Interactive Heatmap Matrix Engine",
      "Unified Multi-Entity Search Engine"
    ]
  }
];

const dxExperiences = [
  {
    "id": "exp-01-crimp-delegation",
    "title": "Resolving 2000-Record Delegation Freeze in Power Apps Defect Gallery",
    "contributor": "Ananya Kasem",
    "department": "TIE & DX",
    "project": "E-Scrap Ticket System",
    "capabilityTopic": "Canvas App Responsive Container Architecture",
    "experienceType": "Problem-Solving Experience",
    "date": "2025-11-20",
    "reviewStatus": "Verified",
    "situation": "During month 3 of the E-Scrap rollout, the scrap history gallery in Power Apps froze and displayed an exclamation delegation warning as records exceeded 2,000.",
    "challenge": "Operators searching for historical defects from prior months received incomplete lists because non-delegable functions (Search(), ClearCollect()) only queried the first 2,000 records from SharePoint.",
    "action": "Refactored the query to use delegable Filter() with indexed Choice and Date columns; partitioned historical queries by year using StartDate and EndDate parameters.",
    "result": "Gallery loads within 0.4 seconds across 18,500 total historical records with zero delegation warning symbols.",
    "learning": "Always design SharePoint List schemas with Indexed Columns from Day 1 and avoid mixing Search() with complex non-delegable logical operators.",
    "recommendation": "Use Startswith() instead of In or Search() for text matching in large SharePoint lists to preserve full server-side delegation.",
    "whatShouldBeRepeated": "Benchmarking gallery query response times with artificial test datasets populated to 10,000 rows prior to production launch.",
    "whatShouldBeAvoided": "Relying on ClearCollect(FullList) on App.OnStart which inflates mobile app load time by over 12 seconds.",
    "evidence": "Code snippet repository and Power Apps Monitor performance trace log.",
    "relatedFiles": "Delegation_Fix_Benchmark.pdf (1.1 MB)",
    "relatedKnowledge": "kno-sp-indexing-gov"
  },
  {
    "id": "exp-02-failure-excel-lock",
    "title": "Failure Lesson: Concurrent Access Lock When Using Excel Online as Backend",
    "contributor": "Thanawat Rung",
    "department": "PC",
    "project": "AP Leave Request System",
    "capabilityTopic": "Power Platform ALM, Solutions & Environments",
    "experienceType": "Failure Lesson",
    "date": "2025-04-05",
    "reviewStatus": "Verified",
    "situation": "Initial prototype of AP Leave Request used a shared OneDrive Excel workbook as the database because the creator was comfortable with Excel tables.",
    "challenge": "When 25 operators submitted requests simultaneously at the end of the shift, Power Automate failed with error 423 \"The file is locked by another user\".",
    "action": "Immediately migrated all tables from Excel Online to a structured SharePoint List with identical column names and updated connection references in Power Apps.",
    "result": "Zero lock contention errors; system successfully handled 300+ concurrent requests during plant-wide pilot.",
    "learning": "Excel Online is designed as a personal spreadsheet, NOT a multi-user transactional relational database. Never use Excel as a backend for production citizen developer applications.",
    "recommendation": "Use SharePoint Lists for solutions with up to 100,000 items, and Microsoft Dataverse for high-volume relational enterprise systems.",
    "whatShouldBeRepeated": "Rapid rollback and transparent communication with line supervisors during pilot incidents.",
    "whatShouldBeAvoided": "Using Excel Online workbooks as databases for any application with more than 1 concurrent user.",
    "originalAssumption": "Assumed Excel Online auto-save feature could support simultaneous API writes from cloud flows.",
    "whatWasAttempted": "Built Power Apps form writing directly to Excel table via Power Automate \"Add a row into a table\" action.",
    "whatFailed": "Power Automate received 423 File Locked exception on 38% of submissions during shift change peak.",
    "symptoms": "Spinning loader in app, submissions lost, duplicate approval emails triggered on automatic retries.",
    "rootCause": "Excel file locking mechanism locks the entire workbook during write operations rather than row-level locking.",
    "businessImpact": "25 operators had to re-submit leave requests on paper; 2 hours of administrative confusion.",
    "recoveryAction": "Switched backend to SharePoint List within 24 hours and re-tested with load simulation script.",
    "permanentPrevention": "Enforced governance rule: DX Governance Committee rejects any application architecture proposing Excel as a production database.",
    "reusableLesson": "Excel is a viewer and analysis tool; SharePoint Lists or Dataverse are databases.",
    "sensitiveInfo": false,
    "evidence": "Post-mortem incident review document (Ref: INC-DX-2025-02)."
  },
  {
    "id": "exp-03-flow-timeout",
    "title": "Overcoming 30-Day Power Automate Approval Timeout in Annual Budget Flow",
    "contributor": "Somchai Prasert",
    "department": "TIE & DX",
    "project": "DX One Store",
    "capabilityTopic": "Flow Error Handling, Retries & Child Flows",
    "experienceType": "Implementation Experience",
    "date": "2025-10-15",
    "reviewStatus": "Verified",
    "situation": "Capital equipment tooling requests exceeding $5,000 require cross-department director approval which sometimes takes over 30 days due to overseas business trips.",
    "challenge": "Power Automate has a hard 30-day run duration limit; workflows waiting on approvals timed out and aborted, canceling the entire requisition.",
    "action": "Architected a decoupled polling state-machine: Approvals create a dedicated tracking item in SharePoint; a scheduled daily cloud flow checks pending approval IDs and sends escalations without keeping a single flow execution thread open indefinitely.",
    "result": "Tooling requisitions can remain active indefinitely with complete audit trails, regardless of approval duration.",
    "learning": "Do not rely on long-running synchronous \"Start and wait for an approval\" actions for business processes that may exceed 20 days.",
    "recommendation": "Use asynchronous state-machine pattern with scheduled watchdog flows for long-running human workflows.",
    "whatShouldBeRepeated": "Documenting timeout limitations during initial requirement scoping sessions.",
    "whatShouldBeAvoided": "Single-thread monolithic flows waiting weeks for human actions.",
    "evidence": "Flow diagram and state-machine architecture design document.",
    "relatedFiles": "State_Machine_Approval_Flow_Guide.pdf (850 KB)",
    "relatedKnowledge": "kno-flow-error-handling"
  },
  {
    "id": "exp-04-sensor-vibration",
    "title": "Edge Gateway Telemetry Noise Filtering on Radiator Crimp Station",
    "contributor": "Nattapong T.",
    "department": "PE",
    "project": "NB FIFO Digitalization",
    "capabilityTopic": "IoT Gateways, MQTT & OPC UA Protocols",
    "experienceType": "Integration Experience",
    "date": "2026-01-12",
    "reviewStatus": "Verified",
    "situation": "Installed vibration and pressure transducers on Radiator Line 2 crimp press to monitor tool fatigue in real time.",
    "challenge": "High-frequency electrical noise from neighboring welding robots caused spurious spike alerts, generating false alarm SMS messages to maintenance at 2 AM.",
    "action": "Implemented edge rolling-average digital filter (Moving Average Window = 5 samples) and deadband threshold in Python gateway before publishing MQTT packets.",
    "result": "Eliminated 100% of false electrical noise spikes while maintaining 99.2% accuracy in detecting actual punch mechanical fatigue.",
    "learning": "Shopfloor electrical noise is inevitable in heavy automotive manufacturing; never forward raw analog sensor voltage directly to cloud without edge low-pass filtering.",
    "recommendation": "Apply edge moving-average or Butterworth digital filter algorithms on all analog sensor streams.",
    "whatShouldBeRepeated": "Recording 24 hours of baseline raw machine telemetry before establishing automated alarm trigger limits.",
    "whatShouldBeAvoided": "Direct threshold alerting on single-sample voltage readings.",
    "evidence": "Python edge filter script and before/after FFT spectrum analysis graph.",
    "relatedFiles": "Edge_Noise_Filter_Benchmarking.pdf (1.4 MB)",
    "relatedKnowledge": "kno-iot-opcua-mqtt"
  },
  {
    "id": "exp-05-failure-hardcoded-id",
    "title": "Failure Lesson: Hardcoded SharePoint List GUIDs Broken During Environment Move",
    "contributor": "Chaiwat P.",
    "department": "PE",
    "project": "AP Manhour Generator",
    "capabilityTopic": "Power Platform ALM, Solutions & Environments",
    "experienceType": "Failure Lesson",
    "date": "2025-07-28",
    "reviewStatus": "Verified",
    "situation": "Developed AP Manhour calculation flow in Dev environment using direct SharePoint List connection references.",
    "challenge": "Upon exporting and importing the solution to Production, all flow actions broke with \"List does not exist\" errors because SharePoint generates unique GUIDs per site.",
    "action": "Rebuilt connection references using Environment Variables for Site URL and List Name, allowing dynamic binding across Dev, Test, and Prod sites.",
    "result": "Subsequent deployments executed in under 2 minutes with zero broken action connections.",
    "learning": "Never hardcode SharePoint site URLs or list GUIDs into Power Automate actions. Always utilize Environment Variables within Solutions.",
    "recommendation": "Configure Environment Variables as standard practice from the first minute of solution creation.",
    "whatShouldBeRepeated": "Testing solution export/import on isolated staging sandbox before touching production.",
    "whatShouldBeAvoided": "Direct hardcoded dropdown selection of site URLs in production-bound flows.",
    "originalAssumption": "Assumed Power Platform Solution import would automatically translate SharePoint list names to destination site.",
    "whatWasAttempted": "Exported unmanaged solution from Dev and imported into Production environment.",
    "whatFailed": "All 14 SharePoint actions failed because they pointed to Dev site GUIDs.",
    "symptoms": "Flow failed immediately on trigger; production manhour calculations delayed by 1 day.",
    "rootCause": "SharePoint List IDs are immutable globally unique identifiers specific to the physical site collection.",
    "businessImpact": "Engineering team had to spend weekend manually reconnecting 45 flow actions.",
    "recoveryAction": "Re-authored solution using Environment Variables and created automated deployment checklist.",
    "permanentPrevention": "DX ALM Standard mandates all solutions must use Environment Variables for external connections.",
    "reusableLesson": "Environment Variables are mandatory for all multi-environment Power Platform projects.",
    "sensitiveInfo": false,
    "evidence": "ALM Remediation Guide and Environment Variable Configuration Checklist."
  },
  {
    "id": "exp-06-failure-flow-infinite-loop",
    "title": "Failure Lesson: Automated Flow Infinite Update Trigger Loop Crashing Department Mailbox",
    "contributor": "Thanawat Rung",
    "department": "PC",
    "project": "AP Leave Request System",
    "capabilityTopic": "Flow Error Handling, Retries & Child Flows",
    "experienceType": "Failure Lesson",
    "date": "2025-08-14",
    "reviewStatus": "Verified",
    "situation": "Configured automated Power Automate flow triggered on SharePoint list \"When an item is created or modified\" to calculate employee remaining leave and write back the computed balance.",
    "challenge": "Writing back the computed balance modified the SharePoint list item, which immediately re-triggered the same flow in an endless recursive loop. Within 30 minutes, the flow ran 4,800 times, exhausting tenant API action quotas and flooding the HR inbox with notification emails.",
    "action": "Immediately turned off the flow via Power Automate admin console, deleted pending email queues, and applied SharePoint Trigger Conditions (@not(equals(triggerOutputs()?[\\'body/Status/Value\\'], \\'Processed\\'))) and added a dedicated semaphore boolean flag IsSystemUpdated.",
    "result": "Completely eliminated recursive trigger calls; flow now runs strictly once per user submission, maintaining 100% data integrity.",
    "learning": "Any flow that modifies the same data source that triggers it MUST have explicit Trigger Conditions or semaphore lock flags to avoid catastrophic infinite loops.",
    "recommendation": "Configure Trigger Conditions under Flow Settings > Trigger before publishing any update-triggered flow to production.",
    "whatShouldBeRepeated": "Monitoring the Run History tab for the first 1 hour after deploying any new automated flow.",
    "whatShouldBeAvoided": "Deploying flows that update their own trigger record without trigger conditions.",
    "originalAssumption": "Assumed Power Automate would automatically detect self-updates and suppress recursive execution.",
    "whatWasAttempted": "Flow updated the triggering SharePoint list item directly without any status guard condition.",
    "whatFailed": "Flow triggered recursively 4,800 times in 30 minutes until tenant API throttling halted all department flows.",
    "symptoms": "HR department received thousands of duplicate emails; flow run history showed 100+ concurrent runs per minute.",
    "rootCause": "SharePoint \"When an item is created or modified\" trigger fires on all updates, including updates authored by the flow service account itself.",
    "businessImpact": "Production leave approvals stalled for 2 hours; HR inbox required automated cleanup script.",
    "recoveryAction": "Terminated all running flow instances, added trigger condition filter, and tested with isolated test account.",
    "permanentPrevention": "Enforced Trigger Conditions and Service Account exclusion rules in DNKH Flow Authoring SOP.",
    "reusableLesson": "Always specify Trigger Conditions when updating the triggering record.",
    "sensitiveInfo": false,
    "evidence": "Incident Post-Mortem Report & Trigger Condition Configuration SOP."
  },
  {
    "id": "exp-07-powerbi-gateway-bottleneck",
    "title": "Implementation Experience: On-Premises Data Gateway Refresh Bottleneck on 5M Genba Records",
    "contributor": "Pitchaya S.",
    "department": "QA",
    "project": "NB FIFO Digitalization",
    "capabilityTopic": "Power BI Star Schema & Data Modeling",
    "experienceType": "Project Delivery",
    "date": "2025-11-20",
    "reviewStatus": "Verified",
    "situation": "Deployed plantwide Power BI dashboard pulling 5 million inspection records from on-premises SQL server via the corporate Data Gateway.",
    "challenge": "Scheduled morning refresh took 52 minutes, often timing out during peak shift changes and causing stale reports for the 8:00 AM production briefing.",
    "action": "Implemented Incremental Refresh policy in Power BI Desktop (keeping 3 years of historical cold data, refreshing only the last 3 days of active records), moved complex transformations from Power Query to SQL database views, and created proper star schema dimension surrogate keys.",
    "result": "Gateway refresh duration plummeted from 52 minutes to 1 minute 15 seconds (97.6% time reduction); zero timeouts observed over 4 months of continuous operation.",
    "learning": "Never force Power BI Gateway to re-import massive historical datasets daily. Utilize incremental refresh and let the SQL database perform heavy transformations.",
    "recommendation": "Mandate Incremental Refresh on any dataset exceeding 500,000 rows connecting via On-Premises Gateway.",
    "whatShouldBeRepeated": "Pushing filter and aggregation logic into SQL database views before Power Query ingestion.",
    "whatShouldBeAvoided": "Performing complex multi-table joins inside Power Query against on-premise relational sources.",
    "evidence": "Gateway Refresh Duration Benchmark Report & Incremental Refresh Architecture Diagram.",
    "relatedFiles": "PowerBI_Gateway_Optimization_CaseStudy.pdf (1.2 MB)",
    "relatedKnowledge": "kno-pbi-star-schema"
  },
  {
    "id": "exp-08-failure-teams-webhook-deprecation",
    "title": "Failure Lesson: Deprecated Incoming Webhooks Causing Silent Alert Stoppage on Assembly Line 3",
    "contributor": "Chaiwat P.",
    "department": "PE",
    "project": "Daily Report System",
    "capabilityTopic": "Microsoft Teams & SharePoint Deep Integration",
    "experienceType": "Failure Lesson",
    "date": "2025-12-05",
    "reviewStatus": "Verified",
    "situation": "Automated shopfloor line stoppage alerts were sent to Maintenance Teams channel using legacy Office 365 Incoming Webhook connectors.",
    "challenge": "Microsoft announced deprecation and disabled legacy webhook URLs, causing automated emergency alerts to fail silently without notification to the maintenance on-call technician.",
    "action": "Discovered outage during evening shift when line downtime exceeded 45 minutes without response. Replaced legacy connectors with Power Automate \"Workflows\" app webhook triggers posting interactive Adaptive Cards.",
    "result": "Restored real-time alerting with added interactive buttons (\"Acknowledge\", \"Dispatch Technician\") directly inside the Teams message.",
    "learning": "Relying on deprecated third-party connector hooks introduces single-point-of-failure risks. Cloud service deprecation notices must be tracked actively.",
    "recommendation": "Use Power Automate Workflows app for all Teams integrations and subscribe to M365 Message Center notifications.",
    "whatShouldBeRepeated": "Adding health-check heartbeat pings to verify alerting pipeline functionality every morning.",
    "whatShouldBeAvoided": "Using deprecated O365 Connectors for critical manufacturing line emergency alerting.",
    "originalAssumption": "Assumed legacy Incoming Webhook URLs would remain active indefinitely without maintenance.",
    "whatWasAttempted": "Sent JSON payloads directly to legacy outlook.office.com webhook URLs.",
    "whatFailed": "HTTP POST requests failed with 410 Gone / 404 Not Found after Microsoft tenant connector retirement.",
    "symptoms": "Maintenance team received zero alerts when Line 3 press stopped for 45 minutes.",
    "rootCause": "Microsoft retired Office 365 connectors in favor of Power Automate Workflows webhooks.",
    "businessImpact": "Unplanned downtime extended by 35 minutes on Assembly Line 3.",
    "recoveryAction": "Rebuilt alert sender using Power Automate Teams Workflows webhook within 2 hours.",
    "permanentPrevention": "IT & DX conducts quarterly M365 roadmap reviews to identify API retirements 6 months in advance.",
    "reusableLesson": "Always build automated heartbeat checks for production-critical notification channels.",
    "sensitiveInfo": false,
    "evidence": "Teams Webhook Migration SOP & Post-Incident Report."
  }
];

const dxReusableAssets = [
  {
    "id": "ast-header-comp",
    "title": "DENSO Fluent UI Header & Navigation Component",
    "categoryId": "cat-b",
    "categoryName": "Power Platform",
    "assetType": "Power Apps Component",
    "technology": "Power Apps Component Library",
    "version": "v2.1",
    "author": "Ananya Kasem",
    "department": "TIE & DX",
    "lastUpdated": "2026-02-10",
    "downloadsCount": 142,
    "rating": 4.9,
    "description": "Pre-built responsive top header component featuring DENSO red branding, active user avatar, responsive hamburger menu, and breadcrumb path navigation.",
    "previewSnippet": "// Component Input Properties:\n// ThemeColor: RGBA(230, 0, 18, 1)\n// AppTitle: \"E-Scrap Ticket System\"\n// UserRole: \"Shift Supervisor\"",
    "usageInstructions": "Import from DNKH Corporate Component Library. Set AppTitle property and bind OnMenuClick to App Navigation Container."
  },
  {
    "id": "ast-trycatch-flow",
    "title": "Power Automate Resilient Try-Catch-Finally Scope Template",
    "categoryId": "cat-b",
    "categoryName": "Power Platform",
    "assetType": "Power Automate Template",
    "technology": "Power Automate Cloud Flow",
    "version": "v1.4",
    "author": "Somchai Prasert",
    "department": "TIE & DX",
    "lastUpdated": "2026-01-18",
    "downloadsCount": 118,
    "rating": 5,
    "description": "Turnkey flow scaffold equipped with pre-configured Scope_Try, Scope_Catch, and Scope_Finally blocks, automatic error parsing, and Teams notification card.",
    "previewSnippet": "Scope_Catch -> Configure Run After -> has failed, has timed out, is skipped\nFilter Array: @equals(item()?['status'], 'Failed')",
    "usageInstructions": "Import ZIP package into Power Automate. Place your custom business logic inside Scope_Try and configure Teams channel ID in Scope_Catch."
  },
  {
    "id": "ast-pbi-calendar",
    "title": "Manufacturing Shift & Fiscal Calendar DAX Generator",
    "categoryId": "cat-d",
    "categoryName": "Data & Analytics",
    "assetType": "DAX Formula Template",
    "technology": "Power BI / DAX",
    "version": "v3.0",
    "author": "Chaiwat P.",
    "department": "PE",
    "lastUpdated": "2026-02-05",
    "downloadsCount": 96,
    "rating": 4.8,
    "description": "Comprehensive DAX calculated table generating manufacturing shift calendars, DENSO fiscal years (April-March), factory shutdown holidays, and 4M quarters.",
    "previewSnippet": "Dim_Date = \nADDCOLUMNS(\n  CALENDAR(DATE(2024,1,1), DATE(2027,12,31)),\n  \"FiscalYear\", IF(MONTH([Date])>=4, YEAR([Date]), YEAR([Date])-1),\n  \"FiscalQuarter\", \"FQ\" & ROUNDUP(IF(MONTH([Date])>=4, MONTH([Date])-3, MONTH([Date])+9)/3, 0)\n)",
    "usageInstructions": "Paste formula into New Table in Power BI Desktop. Mark as official Date Table and link to Fact tables via Date column."
  },
  {
    "id": "ast-copilot-genba-prompts",
    "title": "DENSO Genba Quality & 5-Why Copilot Prompt Library",
    "categoryId": "cat-e",
    "categoryName": "AI & Copilot",
    "assetType": "Prompt Template Library",
    "technology": "Microsoft 365 Copilot / Copilot Studio",
    "version": "v2.0",
    "author": "Pitchaya S.",
    "department": "TIE & DX",
    "lastUpdated": "2026-03-01",
    "downloadsCount": 165,
    "rating": 4.9,
    "description": "Curated library of 15 industrial prompts designed to analyze defect logs, generate 5-Why drafts, extract root causes, and draft SOP work instructions.",
    "previewSnippet": "Act as a DENSO Quality Engineer. Review defect description: {DEFECT_TEXT}. \nGenerate 5-Why analysis following standard DENSO format. \nRule: Never blame human error. Focus on tooling, maintenance, and lack of poka-yoke detection.",
    "usageInstructions": "Copy prompt into Microsoft 365 Copilot chat or configure as system instructions inside Copilot Studio generative answers topic."
  },
  {
    "id": "ast-sp-archiving-script",
    "title": "SharePoint Large List Automated Archiving Flow",
    "categoryId": "cat-c",
    "categoryName": "SharePoint & Microsoft 365",
    "assetType": "Power Automate Flow",
    "technology": "SharePoint / Power Automate",
    "version": "v1.1",
    "author": "Thanawat Rung",
    "department": "PC",
    "lastUpdated": "2026-01-25",
    "downloadsCount": 78,
    "rating": 4.7,
    "description": "Automated scheduled flow that queries items older than 12 months in transactional lists, copies them to an Archive library, and deletes them to prevent 5000-item threshold issues.",
    "previewSnippet": "Filter Query: Created lt '@{addDays(utcNow(), -365)}'\nBatch size: 50 items per iteration with delay to avoid throttling.",
    "usageInstructions": "Deploy flow, set source list and destination archive list, schedule for monthly Sunday execution."
  }
];

const dxLearningPaths = [
  {
    "id": "lp-citizen-dev",
    "role": "Citizen Developer",
    "roleCode": "CITIZEN_DEV",
    "title": "Citizen Developer Master Track",
    "targetAudience": "Line Foremen, Quality Technicians, Production Engineers, Department Clerks",
    "description": "End-to-end curriculum to build robust, responsive Power Apps and automated Power Automate workflows that solve real Genba problems.",
    "totalStages": 5,
    "totalModules": 14,
    "estimatedHours": 32,
    "badgeAwarded": "Certified DNKH Citizen Developer Level 3",
    "stages": [
      {
        "stageName": "Foundation (Aware)",
        "level": 1,
        "modules": [
          {
            "code": "CD-101",
            "title": "Digital Mindset & Genba Problem Identification",
            "hours": 2,
            "requiredKnowledge": "Understanding Kaizen waste and digital opportunities."
          },
          {
            "code": "CD-102",
            "title": "Power Platform Overview & Citizen Governance Charter",
            "hours": 2,
            "requiredKnowledge": "App risk tiers and ownership obligations."
          }
        ]
      },
      {
        "stageName": "Beginner (Practitioner)",
        "level": 2,
        "modules": [
          {
            "code": "CD-201",
            "title": "SharePoint Lists as Structured Database",
            "hours": 4,
            "practiceActivity": "Create indexed list with validation columns."
          },
          {
            "code": "CD-202",
            "title": "Canvas Apps Fundamentals: Galleries, Forms & Formulas",
            "hours": 6,
            "practiceActivity": "Build functional inventory lookup tool."
          }
        ]
      },
      {
        "stageName": "Intermediate (Applied)",
        "level": 3,
        "modules": [
          {
            "code": "CD-301",
            "title": "Responsive Container Architecture & Mobile UX",
            "hours": 6,
            "realWorkChallenge": "Refactor prototype to adapt to mobile tablet without fixed X/Y."
          },
          {
            "code": "CD-302",
            "title": "Power Automate Multi-Stage Approvals & Teams Alerts",
            "hours": 6,
            "realWorkChallenge": "Deploy working approval flow for real team process."
          }
        ]
      },
      {
        "stageName": "Advanced (Delivered)",
        "level": 4,
        "modules": [
          {
            "code": "CD-401",
            "title": "Delegation Mastery & Large List Performance",
            "hours": 4,
            "evidenceRequirement": "Production deployment with documented user sign-off."
          },
          {
            "code": "CD-402",
            "title": "Try-Catch Error Handling & Resilient Child Flows",
            "hours": 4,
            "evidenceRequirement": "Integrate automated Teams error notification."
          }
        ]
      },
      {
        "stageName": "Share & Sustain (Mentor)",
        "level": 5,
        "modules": [
          {
            "code": "CD-501",
            "title": "Creating Reusable Components & Mentoring Peers",
            "hours": 4,
            "evidenceRequirement": "Contribute component to DX One Store and coach 1 junior peer."
          }
        ]
      }
    ]
  },
  {
    "id": "lp-data-champion",
    "role": "DX Champion",
    "roleCode": "DX_CHAMPION",
    "title": "Manufacturing Data Analytics & Power BI Track",
    "targetAudience": "Industrial Engineers, Quality Analysts, Section Managers",
    "description": "Learn to extract, clean, model, and visualize shopfloor production metrics and quality scrap data using Power BI and DAX.",
    "totalStages": 5,
    "totalModules": 12,
    "estimatedHours": 28,
    "badgeAwarded": "Certified DNKH Power BI Data Champion",
    "stages": [
      {
        "stageName": "Foundation (Aware)",
        "level": 1,
        "modules": [
          {
            "code": "DA-101",
            "title": "Data-Driven Decision Making & KPI Definition",
            "hours": 2,
            "requiredKnowledge": "OEE, Scrap Rate, and Cycle Time metrics."
          }
        ]
      },
      {
        "stageName": "Beginner (Practitioner)",
        "level": 2,
        "modules": [
          {
            "code": "DA-201",
            "title": "Power Query Automated Ingestion & Cleaning",
            "hours": 4,
            "practiceActivity": "Clean messy shopfloor shift Excel logs."
          }
        ]
      },
      {
        "stageName": "Intermediate (Applied)",
        "level": 3,
        "modules": [
          {
            "code": "DA-301",
            "title": "Star Schema Dimensional Modeling",
            "hours": 6,
            "realWorkChallenge": "Build 1-to-Many model connecting 3 production lines."
          },
          {
            "code": "DA-302",
            "title": "DAX Time Intelligence & Manufacturing Formulas",
            "hours": 6,
            "realWorkChallenge": "Create scrap rate comparison against monthly target."
          }
        ]
      },
      {
        "stageName": "Advanced (Delivered)",
        "level": 4,
        "modules": [
          {
            "code": "DA-401",
            "title": "Executive Management Dashboards & Mobile Layout",
            "hours": 6,
            "evidenceRequirement": "Production dashboard refreshed on plant gateway."
          }
        ]
      },
      {
        "stageName": "Share & Sustain (Mentor)",
        "level": 5,
        "modules": [
          {
            "code": "DA-501",
            "title": "Standardizing Plant BI Templates & RLS Security",
            "hours": 4,
            "evidenceRequirement": "Author departmental Power BI modeling template."
          }
        ]
      }
    ]
  },
  {
    "id": "lp-ai-specialist",
    "role": "DX Specialist",
    "roleCode": "DX_SPECIALIST",
    "title": "AI, Copilot Studio & Smart Factory Integration Track",
    "targetAudience": "Advanced Software Engineers, Automation Specialists, IT Developers",
    "description": "Master custom Copilot Studio agent grounding, REST API integration, edge IoT telemetry, and enterprise architecture.",
    "totalStages": 5,
    "totalModules": 15,
    "estimatedHours": 36,
    "badgeAwarded": "Certified DNKH AI & Integration Specialist",
    "stages": [
      {
        "stageName": "Foundation (Aware)",
        "level": 1,
        "modules": [
          {
            "code": "AI-101",
            "title": "Generative AI Principles & Responsible AI Policy",
            "hours": 3,
            "requiredKnowledge": "Intellectual property and data masking standards."
          }
        ]
      },
      {
        "stageName": "Beginner (Practitioner)",
        "level": 2,
        "modules": [
          {
            "code": "AI-201",
            "title": "Industrial Prompt Engineering & C-R-E-A-T-E Framework",
            "hours": 4,
            "practiceActivity": "Draft 5-Why analysis prompt with zero hallucination."
          }
        ]
      },
      {
        "stageName": "Intermediate (Applied)",
        "level": 3,
        "modules": [
          {
            "code": "AI-301",
            "title": "Copilot Studio Agent Creation Grounded in SharePoint",
            "hours": 8,
            "realWorkChallenge": "Build conversational bot answering questions on QA SOPs."
          }
        ]
      },
      {
        "stageName": "Advanced (Delivered)",
        "level": 4,
        "modules": [
          {
            "code": "AI-401",
            "title": "REST API, Microsoft Graph & Custom Connectors",
            "hours": 8,
            "evidenceRequirement": "Connect custom Copilot agent to live SQL database."
          },
          {
            "code": "AI-402",
            "title": "OPC UA to MQTT Industrial Edge Gateway Integration",
            "hours": 8,
            "evidenceRequirement": "Deploy edge script capturing live machine stroke count."
          }
        ]
      },
      {
        "stageName": "Share & Sustain (Mentor)",
        "level": 5,
        "modules": [
          {
            "code": "AI-501",
            "title": "Enterprise AI Governance & Architecture Review",
            "hours": 5,
            "evidenceRequirement": "Conduct security and architecture audit for plant AI deployment."
          }
        ]
      }
    ]
  },
  {
    "id": "lp-project-leader",
    "title": "DX Project Leader & Agile Kaizen Delivery Path",
    "badge": "LEADER TRACK",
    "duration": "32 Hours",
    "level": "Advanced",
    "targetAudience": "Production Engineers, Section Heads, Kaizen Leaders & DX Champions",
    "description": "Equips technical leaders with end-to-end capabilities to identify high-value Genba digital opportunities, calculate manhour savings, lead agile cross-functional delivery, and ensure long-term user adoption.",
    "stages": [
      {
        "stageName": "Learn (Awareness)",
        "level": 1,
        "modules": [
          {
            "code": "PL-101",
            "title": "DX Strategy & DNKH Smart Factory Vision 2030",
            "hours": 4,
            "evidenceRequirement": "Complete strategic alignment quiz."
          },
          {
            "code": "PL-102",
            "title": "Value Stream Mapping & Digital Waste Identification",
            "hours": 4,
            "evidenceRequirement": "Identify 3 digital waste bottlenecks in home department."
          }
        ]
      },
      {
        "stageName": "Practice (Scoping)",
        "level": 2,
        "modules": [
          {
            "code": "PL-201",
            "title": "DX Project Scoping & Business Case Formulation",
            "hours": 6,
            "evidenceRequirement": "Submit DX Project Charter with before/after process flow."
          },
          {
            "code": "PL-202",
            "title": "Manhour Saving & ROI Calculation Standards",
            "hours": 4,
            "evidenceRequirement": "Draft verified ROI calculation using DNKH standard formula."
          }
        ]
      },
      {
        "stageName": "Apply (Agile Delivery)",
        "level": 3,
        "modules": [
          {
            "code": "PL-301",
            "title": "Agile MVP Prototyping & Genba Co-Design",
            "hours": 6,
            "evidenceRequirement": "Run co-design session with Genba operators and document user feedback."
          }
        ]
      },
      {
        "stageName": "Deliver (Production Launch)",
        "level": 4,
        "modules": [
          {
            "code": "PL-401",
            "title": "Change Management, User Training & Go-Live Governance",
            "hours": 4,
            "evidenceRequirement": "Deploy production solution with sign-off from Section Manager."
          }
        ]
      },
      {
        "stageName": "Share & Sustain (Mentoring)",
        "level": 5,
        "modules": [
          {
            "code": "PL-501",
            "title": "Standardization, Post-Mortem Sharing & Mentoring",
            "hours": 4,
            "evidenceRequirement": "Author project case study and mentor a junior DX project leader."
          }
        ]
      }
    ]
  },
  {
    "id": "lp-governance-owner",
    "title": "Citizen Developer Governance & Solution Custodian Path",
    "badge": "GOVERNANCE TRACK",
    "duration": "24 Hours",
    "level": "Intermediate",
    "targetAudience": "Department App Owners, IT Coordinators & Quality Custodians",
    "description": "Prepares departmental custodians to manage low-code application lifecycles, enforce security boundaries, maintain backup ownership SLAs, and ensure compliance with DNKH Citizen Development Governance Charter.",
    "stages": [
      {
        "stageName": "Learn (Governance Principles)",
        "level": 1,
        "modules": [
          {
            "code": "GV-101",
            "title": "DNKH Citizen Development Governance Charter & Tier Matrix",
            "hours": 4,
            "evidenceRequirement": "Pass Governance Charter certification."
          }
        ]
      },
      {
        "stageName": "Practice (Security & ALM)",
        "level": 2,
        "modules": [
          {
            "code": "GV-201",
            "title": "M365 Role-Based Access Control & Sensitive Data Protection",
            "hours": 4,
            "evidenceRequirement": "Audit permissions of 2 departmental SharePoint lists."
          },
          {
            "code": "GV-202",
            "title": "Application Lifecycle Management & Solution Packaging",
            "hours": 4,
            "evidenceRequirement": "Export and deploy a solution using Environment Variables."
          }
        ]
      },
      {
        "stageName": "Apply (Ownership Custodianship)",
        "level": 3,
        "modules": [
          {
            "code": "GV-301",
            "title": "Primary/Backup Ownership SLA & Handover Protocol",
            "hours": 4,
            "evidenceRequirement": "Complete official App Handover package for an operational tool."
          }
        ]
      },
      {
        "stageName": "Deliver (Audit & Compliance)",
        "level": 4,
        "modules": [
          {
            "code": "GV-401",
            "title": "Quarterly Application Health Check & Security Audit",
            "hours": 4,
            "evidenceRequirement": "Conduct quarterly health audit on 3 department production apps."
          }
        ]
      },
      {
        "stageName": "Share & Sustain (Plant Custodian)",
        "level": 5,
        "modules": [
          {
            "code": "GV-501",
            "title": "Cross-Department Governance Review & Policy Refinement",
            "hours": 4,
            "evidenceRequirement": "Lead plantwide governance review session with IT Management."
          }
        ]
      }
    ]
  },
  {
    "id": "lp-digital-user",
    "title": "Digital Genba User & Everyday M365 Productivity Path",
    "badge": "FOUNDATION TRACK",
    "duration": "16 Hours",
    "level": "Beginner",
    "targetAudience": "Shopfloor Team Leaders, Line Operators & Department Coordinators",
    "description": "Builds foundational digital confidence for frontline manufacturing associates to use digital tablets, submit digital leave/scrap tickets, navigate Teams channels, and participate in Kaizen problem-solving.",
    "stages": [
      {
        "stageName": "Learn (Digital Mindset)",
        "level": 1,
        "modules": [
          {
            "code": "DU-101",
            "title": "Genba Digitalization Mindset & Paperless Kaizen",
            "hours": 3,
            "evidenceRequirement": "Demonstrate paperless shift handover concept."
          }
        ]
      },
      {
        "stageName": "Practice (Everyday Tools)",
        "level": 2,
        "modules": [
          {
            "code": "DU-201",
            "title": "Microsoft Teams for Shopfloor Communication & Shift Chats",
            "hours": 3,
            "evidenceRequirement": "Post shift report in Teams with tagged equipment photo."
          },
          {
            "code": "DU-202",
            "title": "Genba Tablet Navigation & Barcode Scanning Apps",
            "hours": 3,
            "evidenceRequirement": "Successfully record 5 parts using plant tablet scanner."
          }
        ]
      },
      {
        "stageName": "Apply (Self-Service Workflow)",
        "level": 3,
        "modules": [
          {
            "code": "DU-301",
            "title": "Submitting Digital Leave & E-Scrap Tickets",
            "hours": 3,
            "evidenceRequirement": "Submit actual leave request and scrap ticket independently."
          }
        ]
      },
      {
        "stageName": "Deliver (Process Mastery)",
        "level": 4,
        "modules": [
          {
            "code": "DU-401",
            "title": "Reviewing Power BI Line OEE & Defect Trends",
            "hours": 2,
            "evidenceRequirement": "Explain line scrap trend during morning 5-minute meeting."
          }
        ]
      },
      {
        "stageName": "Share & Sustain (Peer Coaching)",
        "level": 5,
        "modules": [
          {
            "code": "DU-501",
            "title": "Coaching New Operators on Digital Genba Tools",
            "hours": 2,
            "evidenceRequirement": "Train 2 new line associates on tablet application workflow."
          }
        ]
      }
    ]
  }
];

const dxExperts = [
  {
    "id": "exp-somchai",
    "name": "Somchai Prasert",
    "department": "TIE & DX",
    "role": "Lead Solution Architect & DX Consultant",
    "avatarInitials": "SP",
    "verifiedCapabilityTopics": [
      "Canvas App Responsive Container Architecture",
      "Flow Error Handling, Retries & Child Flows",
      "Power Platform ALM, Solutions & Environments",
      "Citizen Developer Governance & Application Ownership",
      "Root-Cause Analysis (5-Why, Fishbone, 5M1E)"
    ],
    "verifiedEvidenceCount": 8,
    "implementedProjects": [
      "DNA Matrix",
      "DX One Store",
      "AP Leave Request System"
    ],
    "knowledgeContributions": 4,
    "reusableAssetsCount": 3,
    "languages": [
      "Thai",
      "English",
      "Japanese (Conversational)"
    ],
    "availabilityStatus": "Available for Mentoring",
    "mentoringInterest": "Power Platform Enterprise Architecture, ALM, Citizen Developer Governance",
    "bio": "14 years at DENSO spanning Industrial Engineering and Digital Transformation. Specializes in scalable Power Platform architecture, solution governance, and cross-plant knowledge systems."
  },
  {
    "id": "exp-nomura",
    "name": "Kenji Nomura",
    "department": "QA & QC",
    "role": "QA Senior Specialist & Monozukuri Master",
    "avatarInitials": "KN",
    "verifiedCapabilityTopics": [
      "Kaizen & Genba Problem Identification",
      "Root-Cause Analysis (5-Why, Fishbone, 5M1E)",
      "Independent Problem-Solving & Continuous Learning",
      "Standardization, SOP Creation & Succession Planning"
    ],
    "verifiedEvidenceCount": 12,
    "implementedProjects": [
      "DNA Matrix",
      "E-Scrap Ticket System",
      "Daily Shift Handover System"
    ],
    "knowledgeContributions": 5,
    "reusableAssetsCount": 2,
    "languages": [
      "Japanese",
      "English",
      "Thai (Working)"
    ],
    "availabilityStatus": "Project Review Only",
    "mentoringInterest": "5-Why Root Cause Deductions, Genba Observation, Kakotora Recurrence Prevention",
    "bio": "22 years at DENSO specializing in automotive radiator manufacturing quality, IATF 16949 audit compliance, and Monozukuri human development (Hitozukuri)."
  },
  {
    "id": "exp-ananya",
    "name": "Ananya Kasem",
    "department": "TIE & DX",
    "role": "DX Specialist & Senior Citizen Developer",
    "avatarInitials": "AK",
    "verifiedCapabilityTopics": [
      "Canvas App Responsive Container Architecture",
      "Power Fx & Delegation Optimization",
      "Power Automate Multi-Stage Approval Flows",
      "SharePoint Permissions & Role-Based Access Control"
    ],
    "verifiedEvidenceCount": 9,
    "implementedProjects": [
      "DX One Store",
      "E-Scrap Ticket System",
      "AP Leave Request System"
    ],
    "knowledgeContributions": 3,
    "reusableAssetsCount": 3,
    "languages": [
      "Thai",
      "English"
    ],
    "availabilityStatus": "Available for Mentoring",
    "mentoringInterest": "Power Apps UI/UX Design, Responsive Container Layouts, Mobile Kiosk Solutions",
    "bio": "Certified Microsoft Power Platform App Maker. Led the UX overhaul of shopfloor mobile applications across AP plant, achieving 99% user adoption."
  },
  {
    "id": "exp-chaiwat",
    "name": "Chaiwat P.",
    "department": "PE",
    "role": "Data Engineer & Industrial Analyst",
    "avatarInitials": "CP",
    "verifiedCapabilityTopics": [
      "Power BI Star Schema & Data Modeling",
      "DAX Fundamentals & Time Intelligence Measures",
      "Power Query & Automated Data Cleansing",
      "SQL Querying & Manufacturing Database Fundamentals"
    ],
    "verifiedEvidenceCount": 7,
    "implementedProjects": [
      "AP Manhour Generator",
      "Daily Shift Handover System"
    ],
    "knowledgeContributions": 2,
    "reusableAssetsCount": 2,
    "languages": [
      "Thai",
      "English"
    ],
    "availabilityStatus": "Available for Mentoring",
    "mentoringInterest": "Power BI Performance Tuning, Advanced DAX, Industrial Time Intelligence",
    "bio": "Specialist in shopfloor PLC data pipeline integration and production line balancing analytics. Reduced daily engineering reporting lead time by 85%."
  },
  {
    "id": "exp-thanawat",
    "name": "Thanawat Rung",
    "department": "PC",
    "role": "SharePoint Administrator & Citizen Developer",
    "avatarInitials": "TR",
    "verifiedCapabilityTopics": [
      "SharePoint Lists & Metadata Architecture",
      "SharePoint Permissions & Role-Based Access Control",
      "SharePoint 5000-Item View Threshold Prevention & Indexing",
      "User Consultation & Requirement Scoping"
    ],
    "verifiedEvidenceCount": 6,
    "implementedProjects": [
      "AP Leave Request System",
      "Daily Shift Handover System"
    ],
    "knowledgeContributions": 2,
    "reusableAssetsCount": 1,
    "languages": [
      "Thai",
      "English"
    ],
    "availabilityStatus": "Consultation by Appointment",
    "mentoringInterest": "SharePoint List Schema Design, Permission Models, Teams Integration",
    "bio": "Production Control specialist who automated departmental leave, overtime, and shift log workflows utilizing zero-code Microsoft 365 services."
  },
  {
    "id": "exp-pitchaya",
    "name": "Pitchaya S.",
    "department": "TIE & DX",
    "role": "AI Engineer & Copilot Specialist",
    "avatarInitials": "PS",
    "verifiedCapabilityTopics": [
      "Industrial Prompt Design & Engineering Standards",
      "Copilot Studio Custom Agent Architecture",
      "Knowledge-Source Quality & Grounding Verification",
      "Responsible AI & Confidential Data Handling"
    ],
    "verifiedEvidenceCount": 5,
    "implementedProjects": [
      "DNA Matrix"
    ],
    "knowledgeContributions": 2,
    "reusableAssetsCount": 1,
    "languages": [
      "Thai",
      "English"
    ],
    "availabilityStatus": "Available for Mentoring",
    "mentoringInterest": "Copilot Studio Agent Development, Retrieval-Augmented Generation (RAG), Prompt Engineering",
    "bio": "AI researcher and developer focused on industrial application of generative AI, technical document grounding, and hallucination elimination."
  }
];

const dxAssessments = [
  {
    "id": "asm-001",
    "employeeId": "EMP-4821",
    "employeeName": "Ananya Kasem",
    "role": "DX Specialist",
    "department": "TIE & DX",
    "categoryId": "cat-b",
    "topicId": "top-pa-canvas",
    "topicName": "Canvas App Responsive Container Architecture",
    "knowledgeLevel": 5,
    "skillLevel": 5,
    "experienceLevel": 4,
    "sharingLevel": 5,
    "currentOverallLevel": 5,
    "targetLevel": 5,
    "gap": 0,
    "evidenceType": "SOP & Reusable Component",
    "evidenceDescription": "Authored DNKH Power Apps Responsive Layout Standard and created reusable header component with 140+ downloads.",
    "evidenceLink": "kno-pa-responsive",
    "developmentAction": "Continue mentoring citizen developers across Plant 2 assembly divisions.",
    "supportRequired": "Quarterly workshop room reservation.",
    "targetDate": "2026-06-30",
    "reviewStatus": "Verified",
    "reviewerName": "Somchai Prasert",
    "reviewerComments": "Outstanding contribution. Code adheres to enterprise standard and verified in production.",
    "lastReviewDate": "2026-02-15"
  },
  {
    "id": "asm-002",
    "employeeId": "EMP-3912",
    "employeeName": "Thanawat Rung",
    "role": "Citizen Developer",
    "department": "PC",
    "categoryId": "cat-b",
    "topicId": "top-pauto-flows",
    "topicName": "Power Automate Multi-Stage Approval Flows",
    "knowledgeLevel": 4,
    "skillLevel": 3,
    "experienceLevel": 4,
    "sharingLevel": 2,
    "currentOverallLevel": 3,
    "targetLevel": 4,
    "gap": 1,
    "evidenceType": "Production Solution",
    "evidenceDescription": "Implemented AP Leave Request 3-stage approval flow used by 1,200 employees.",
    "evidenceLink": "prj-leave-app",
    "developmentAction": "Implement try-catch scope blocks and author SOP to advance from Level 3 to Level 4.",
    "supportRequired": "Technical architecture review with Somchai Prasert.",
    "targetDate": "2026-04-30",
    "reviewStatus": "Verified",
    "reviewerName": "Somchai Prasert",
    "reviewerComments": "Solid execution on Leave Request. Need to upgrade error handling with Scope blocks for Level 4.",
    "lastReviewDate": "2026-01-25"
  },
  {
    "id": "asm-003",
    "employeeId": "EMP-5210",
    "employeeName": "Chaiwat P.",
    "role": "DX Champion",
    "department": "PE",
    "categoryId": "cat-d",
    "topicId": "top-pbi-dax",
    "topicName": "DAX Fundamentals & Time Intelligence Measures",
    "knowledgeLevel": 4,
    "skillLevel": 4,
    "experienceLevel": 4,
    "sharingLevel": 3,
    "currentOverallLevel": 4,
    "targetLevel": 5,
    "gap": 1,
    "evidenceType": "Production Solution & DAX Template",
    "evidenceDescription": "Authored manufacturing shift calendar DAX template in AP Manhour Generator.",
    "evidenceLink": "ast-pbi-calendar",
    "developmentAction": "Host department lunch-and-learn session on advanced DAX filter context.",
    "supportRequired": "Coaching on presentation slides from DX Champion lead.",
    "targetDate": "2026-05-15",
    "reviewStatus": "Verified",
    "reviewerName": "Somchai Prasert",
    "reviewerComments": "Verified DAX measures optimize VertiPaq engine effectively.",
    "lastReviewDate": "2026-02-18"
  },
  {
    "id": "asm-004",
    "employeeId": "EMP-2104",
    "employeeName": "Kenji Nomura",
    "role": "Monozukuri Master",
    "department": "QA & QC",
    "categoryId": "cat-a",
    "topicId": "top-root-cause",
    "topicName": "Root-Cause Analysis (5-Why, Fishbone, 5M1E)",
    "knowledgeLevel": 5,
    "skillLevel": 5,
    "experienceLevel": 5,
    "sharingLevel": 5,
    "currentOverallLevel": 5,
    "targetLevel": 5,
    "gap": 0,
    "evidenceType": "Corporate Standard & Master Coaching",
    "evidenceDescription": "Authored Global Kakotora Recurrence Prevention Manual and mentored 40+ QA engineers in 5-Why Genba deductions.",
    "evidenceLink": "kno-5why-mastery",
    "developmentAction": "Lead cross-plant Monozukuri benchmarking and digitize 5-Why validation logic in DNA Matrix.",
    "supportRequired": "Support from AI team on automated grounding verification.",
    "targetDate": "2026-09-30",
    "reviewStatus": "Verified",
    "reviewerName": "Plant Management Committee",
    "reviewerComments": "Master-level capability recognized across global DENSO group.",
    "lastReviewDate": "2026-03-01"
  },
  {
    "id": "asm-005",
    "employeeId": "EMP-6042",
    "employeeName": "Somkiat L.",
    "role": "Digital User",
    "department": "PD",
    "categoryId": "cat-b",
    "topicId": "top-pa-canvas",
    "topicName": "Canvas App Responsive Container Architecture",
    "knowledgeLevel": 1,
    "skillLevel": 1,
    "experienceLevel": 0,
    "sharingLevel": 0,
    "currentOverallLevel": 1,
    "targetLevel": 2,
    "gap": 1,
    "evidenceType": "Training Completion",
    "evidenceDescription": "Completed Level 1 Power Platform Awareness online module.",
    "evidenceLink": "lp-citizen-dev",
    "developmentAction": "Enroll in Citizen Developer Beginner Lab and build a 1-screen inventory mockup.",
    "supportRequired": "Peer pairing with Ananya Kasem.",
    "targetDate": "2026-05-30",
    "reviewStatus": "Self-Assessed",
    "reviewerName": "Pending Review",
    "reviewerComments": "Self-assessment submitted. Awaiting hands-on lab demonstration.",
    "lastReviewDate": "2026-03-05"
  },
  {
    "id": "asm-006",
    "employeeName": "Chaiwat P.",
    "role": "Production Engineer",
    "department": "PE",
    "categoryId": "cat-b",
    "topicId": "top-pa-alm",
    "topicName": "Power Platform ALM, Solutions & Environments",
    "knowledgeLevel": 4,
    "skillLevel": 4,
    "experienceLevel": 4,
    "sharingLevel": 3,
    "currentOverallLevel": 4,
    "targetLevel": 5,
    "gap": 1,
    "evidenceType": "Production Solution & Failure Post-Mortem",
    "evidenceDescription": "Architected managed solution for AP Manhour Generator with environment variables across Dev/Prod; published ALM Failure Lesson exp-05.",
    "evidenceLink": "exp-05-failure-hardcoded-id",
    "developmentAction": "Standardize ALM deployment checklist and mentor 2 citizen developers on solution export/import.",
    "supportRequired": "Coaching on CI/CD Azure DevOps pipelines by Somchai Prasert.",
    "targetDate": "2026-06-15",
    "reviewStatus": "Verified",
    "reviewerName": "Somchai Prasert (Reviewer)",
    "reviewerComments": "Verified. Excellent recovery from early environment issues and strong documentation contributions.",
    "lastReviewDate": "2026-03-01"
  },
  {
    "id": "asm-007",
    "employeeName": "Kenji Nomura",
    "role": "Executive Advisor / Manufacturing Quality",
    "department": "Executive",
    "categoryId": "cat-a",
    "topicId": "top-root-cause",
    "topicName": "Root-Cause Analysis (5-Why, Fishbone, 5M1E)",
    "knowledgeLevel": 5,
    "skillLevel": 5,
    "experienceLevel": 5,
    "sharingLevel": 5,
    "currentOverallLevel": 5,
    "targetLevel": 5,
    "gap": 0,
    "evidenceType": "Corporate Standard & Masterclass",
    "evidenceDescription": "Authored DNKH-QA-STD-001; delivered 12 masterclass workshops across 4 manufacturing plants; mentored 35 quality engineers.",
    "evidenceLink": "kno-5why-mastery",
    "developmentAction": "Sustain corporate standard through annual case study updates and executive quality coaching.",
    "supportRequired": "None.",
    "targetDate": "2026-12-31",
    "reviewStatus": "Verified",
    "reviewerName": "Plant Management Committee",
    "reviewerComments": "Verified Level 5 Master Mentor. Core contributor to DENSO quality culture.",
    "lastReviewDate": "2026-02-15"
  },
  {
    "id": "asm-008",
    "employeeName": "Pitchaya S.",
    "role": "Senior Quality Engineer",
    "department": "QA",
    "categoryId": "cat-e",
    "topicId": "top-prompt-design",
    "topicName": "Industrial Prompt Design & Engineering Standards",
    "knowledgeLevel": 4,
    "skillLevel": 4,
    "experienceLevel": 4,
    "sharingLevel": 4,
    "currentOverallLevel": 4,
    "targetLevel": 5,
    "gap": 1,
    "evidenceType": "Published Standard & Custom Agent",
    "evidenceDescription": "Published Industrial Prompt Standard knno-copilot-prompt-standard; built Quality Copilot Assistant grounded in 1,400 defect standards.",
    "evidenceLink": "kno-copilot-prompt-standard",
    "developmentAction": "Author advanced course on Multi-Turn Copilot Agent Topic branching and evaluate LLM hallucination scoring.",
    "supportRequired": "Azure OpenAI token budget approval.",
    "targetDate": "2026-07-30",
    "reviewStatus": "Verified",
    "reviewerName": "Somchai Prasert (Reviewer)",
    "reviewerComments": "High-impact AI contribution. Grounding methodology prevents hallucinations reliably.",
    "lastReviewDate": "2026-03-02"
  },
  {
    "id": "asm-009",
    "employeeName": "Nattapong V.",
    "role": "Smart Factory & IoT Systems Lead",
    "department": "IT",
    "categoryId": "cat-g",
    "topicId": "top-iot-mqtt",
    "topicName": "IoT Gateways, MQTT & OPC UA Protocols",
    "knowledgeLevel": 4,
    "skillLevel": 4,
    "experienceLevel": 4,
    "sharingLevel": 3,
    "currentOverallLevel": 4,
    "targetLevel": 5,
    "gap": 1,
    "evidenceType": "Shopfloor Hardware Deployment",
    "evidenceDescription": "Configured Moxa edge gateways and Node-RED pipelines streaming telemetry across 24 CNC machines.",
    "evidenceLink": "kno-iot-opcua-mqtt",
    "developmentAction": "Create hands-on OPC UA hardware test rig for junior engineer training.",
    "supportRequired": "Hardware budget for demonstration PLC bench.",
    "targetDate": "2026-08-15",
    "reviewStatus": "Verified",
    "reviewerName": "Somchai Prasert (Reviewer)",
    "reviewerComments": "Technical implementation verified in Assembly Plant 2. Excellent edge telemetry stability.",
    "lastReviewDate": "2026-02-20"
  },
  {
    "id": "asm-010",
    "employeeName": "Kanchana D.",
    "role": "Production Control Officer",
    "department": "PC",
    "categoryId": "cat-c",
    "topicId": "top-sp-lists",
    "topicName": "SharePoint Lists & Metadata Architecture",
    "knowledgeLevel": 3,
    "skillLevel": 3,
    "experienceLevel": 3,
    "sharingLevel": 2,
    "currentOverallLevel": 3,
    "targetLevel": 4,
    "gap": 1,
    "evidenceType": "Operational Department List Architecture",
    "evidenceDescription": "Re-architected PC Department inventory tracking list with indexed columns and custom views for 8,500 monthly transactions.",
    "evidenceLink": "kno-sp-schema-gov",
    "developmentAction": "Implement automated monthly archiving flow to maintain list performance below 10,000 active records.",
    "supportRequired": "Assistance from Thanawat Rung on flow archiving logic.",
    "targetDate": "2026-06-30",
    "reviewStatus": "Self-Assessed",
    "reviewerName": "Pending Review",
    "reviewerComments": "Self-assessment submitted with list URL and performance benchmarks. Awaiting manager review.",
    "lastReviewDate": "2026-03-04"
  },
  {
    "id": "asm-011",
    "employeeName": "Kittipong S.",
    "role": "Quality Control Technician",
    "department": "QC",
    "categoryId": "cat-d",
    "topicId": "top-pbi-dax",
    "topicName": "DAX Fundamentals & Time Intelligence Measures",
    "knowledgeLevel": 2,
    "skillLevel": 2,
    "experienceLevel": 2,
    "sharingLevel": 1,
    "currentOverallLevel": 2,
    "targetLevel": 3,
    "gap": 1,
    "evidenceType": "Practice Dashboard & Training Lab",
    "evidenceDescription": "Completed Level 2 Power BI Lab; authored basic measures for daily line defect count and scrap percentage.",
    "evidenceLink": "lp-data-champion",
    "developmentAction": "Apply time intelligence DAX (CALCULATE with SAMEPERIODLASTYEAR) to monthly scrap report.",
    "supportRequired": "Mentoring session with Pitchaya S.",
    "targetDate": "2026-05-15",
    "reviewStatus": "Self-Assessed",
    "reviewerName": "Pending Review",
    "reviewerComments": "Lab exercises verified. Ready for real production dataset assignment.",
    "lastReviewDate": "2026-03-03"
  },
  {
    "id": "asm-012",
    "employeeName": "Supaporn T.",
    "role": "HR & Training Coordinator",
    "department": "HR",
    "categoryId": "cat-h",
    "topicId": "top-project-scope",
    "topicName": "DX Project Scoping, Current-State & ROI Analysis",
    "knowledgeLevel": 3,
    "skillLevel": 3,
    "experienceLevel": 3,
    "sharingLevel": 2,
    "currentOverallLevel": 3,
    "targetLevel": 4,
    "gap": 1,
    "evidenceType": "Departmental Process Transformation",
    "evidenceDescription": "Mapped current-state onboarding paperwork process, calculated 340 manhour savings/year, and scoped digital onboarding portal.",
    "evidenceLink": "lp-project-leader",
    "developmentAction": "Complete citizen developer prototype of onboarding intake form and present business case.",
    "supportRequired": "UX co-design support from Ananya Kasem.",
    "targetDate": "2026-07-15",
    "reviewStatus": "Verified",
    "reviewerName": "Somchai Prasert (Reviewer)",
    "reviewerComments": "Verified. Exceptional process observation and rigorous manhour savings calculations.",
    "lastReviewDate": "2026-02-28"
  }
];

const dxAuditLog = [
  {
    "id": "aud-001",
    "timestamp": "2026-03-05 09:30",
    "user": "Somchai Prasert",
    "action": "VERIFY_EVIDENCE",
    "entity": "Assessment",
    "targetId": "asm-001",
    "details": "Verified Level 5 Share & Sustain for Ananya Kasem on Responsive Container Architecture"
  },
  {
    "id": "aud-002",
    "timestamp": "2026-03-04 14:15",
    "user": "Thanawat Rung",
    "action": "SUBMIT_EVIDENCE",
    "entity": "Assessment",
    "targetId": "asm-002",
    "details": "Submitted production evidence for Power Automate Multi-Stage Approval Flows"
  },
  {
    "id": "aud-003",
    "timestamp": "2026-03-02 11:00",
    "user": "Kenji Nomura",
    "action": "UPDATE_STANDARD",
    "entity": "Knowledge",
    "targetId": "kno-5why-mastery",
    "details": "Published revision v3.0 of 5-Why Genba Analysis Standard"
  },
  {
    "id": "aud-004",
    "timestamp": "2026-03-01 16:45",
    "user": "Pitchaya S.",
    "action": "CREATE_KNOWLEDGE",
    "entity": "Knowledge",
    "targetId": "kno-copilot-prompt-standard",
    "details": "Published Industrial Prompt Design & Grounding Verification Standard"
  },
  {
    "id": "aud-005",
    "timestamp": "2026-02-28 10:20",
    "user": "Somchai Prasert",
    "action": "UPDATE_PROJECT",
    "entity": "Project",
    "targetId": "prj-dna-matrix",
    "details": "Completed Sprint 4 milestone deployment of DNA Matrix Platform"
  }
];

const dxFutureEntities = [
  {
    "entityName": "DX_Categories",
    "sharePointType": "Custom List",
    "dataverseType": "Standard Table (cr_dx_category)",
    "primaryKey": "ID / cr_categoryid (GUID)",
    "requiredFields": [
      "Title (Code: CAT-A)",
      "CategoryName (Single Line of Text)",
      "IconClass (Single Line of Text)",
      "DisplayOrder (Number)"
    ],
    "optionalFields": [
      "Description (Multiple Lines of Text)",
      "ColorHex (Single Line of Text)",
      "IsActive (Yes/No)"
    ],
    "lookupRelationships": "1-to-Many with DX_Topics",
    "choiceColumns": "Status (Active, Inactive, Deprecated)",
    "personColumns": "CategoryOwner (Person or Group)",
    "dateColumns": "Created, Modified",
    "attachmentStrategy": "Category cover vector icon or badge graphic",
    "permissionConsiderations": "Read-only for all plant associates; Edit restricted to DX Steering Committee & Administrators."
  },
  {
    "entityName": "DX_Topics",
    "sharePointType": "Custom List",
    "dataverseType": "Standard Table (cr_dx_topic)",
    "primaryKey": "ID / cr_topicid (GUID)",
    "requiredFields": [
      "Title (Topic Name)",
      "CategoryID (Lookup to DX_Categories)",
      "Difficulty (Choice)"
    ],
    "optionalFields": [
      "Description (Multiple Lines of Text)",
      "TechnologiesTags (Multi-Choice)",
      "SortOrder (Number)"
    ],
    "lookupRelationships": "Many-to-1 with DX_Categories; 1-to-Many with DX_Knowledge and DX_Assessments",
    "choiceColumns": "Difficulty (Beginner, Intermediate, Advanced)",
    "personColumns": "TopicLead (Person or Group)",
    "dateColumns": "Created, Modified",
    "attachmentStrategy": "None; metadata only",
    "permissionConsiderations": "Read-only for all associates; Manageable by DX Administrators."
  },
  {
    "entityName": "DX_Knowledge",
    "sharePointType": "Custom List + Document Library",
    "dataverseType": "Standard Table (cr_dx_knowledge)",
    "primaryKey": "ID / cr_knowledgeid (GUID)",
    "requiredFields": [
      "Title",
      "CategoryID (Lookup)",
      "TopicID (Lookup)",
      "KnowledgeType (Choice)",
      "MaturityLevel (Choice)",
      "Author (Person)"
    ],
    "optionalFields": [
      "BusinessContext",
      "ProblemAddressed",
      "StepGuidance",
      "TechnicalDetails",
      "RelatedProjectIDs (Multi-Lookup)"
    ],
    "lookupRelationships": "Many-to-1 with DX_Topics; Many-to-Many with DX_Projects",
    "choiceColumns": "KnowledgeType (18 Types), MaturityLevel (Level 0-5), VerificationStatus, Confidentiality",
    "personColumns": "Author, Reviewer, LastModifiedBy",
    "dateColumns": "Created, LastReviewDate, NextReviewDate",
    "attachmentStrategy": "SharePoint Document Library folder tied to Knowledge ID (supports PDFs, MSAPP files, PBIX templates)",
    "permissionConsiderations": "Contribute for Citizen Developers; Approval required before moving from Draft to Approved."
  },
  {
    "entityName": "DX_Projects",
    "sharePointType": "Custom List + Folders",
    "dataverseType": "Standard Table (cr_dx_project)",
    "primaryKey": "ID / cr_projectid (GUID)",
    "requiredFields": [
      "ProjectName",
      "Department (Choice)",
      "ProjectOwner (Person)",
      "Status (Choice)",
      "StartDate (Date)"
    ],
    "optionalFields": [
      "Background",
      "Analysis",
      "Solution",
      "Architecture",
      "HoursSaved (Number)",
      "CostSaving (Currency)"
    ],
    "lookupRelationships": "1-to-Many with DX_Experiences; Many-to-Many with DX_Knowledge",
    "choiceColumns": "Department (10 Depts), Status (Draft, In Progress, Production, Scaling), Confidentiality",
    "personColumns": "ProjectOwner, BackupOwner, ExecutiveSponsor, ProjectMembers (Multi-Person)",
    "dateColumns": "StartDate, DeploymentDate, LastMaintenanceReviewDate",
    "attachmentStrategy": "Document Library Folder for System Architecture, User Guides, and Signed Handover Documents",
    "permissionConsiderations": "Item-level write permissions for Project Owner; Read access for all internal associates."
  },
  {
    "entityName": "DX_Assessments",
    "sharePointType": "Custom List",
    "dataverseType": "Standard Table (cr_dx_assessment)",
    "primaryKey": "ID / cr_assessmentid (GUID)",
    "requiredFields": [
      "Employee (Person)",
      "TopicID (Lookup to DX_Topics)",
      "KnowledgeLevel (0-5)",
      "SkillLevel (0-5)",
      "ExperienceLevel (0-5)",
      "SharingLevel (0-5)"
    ],
    "optionalFields": [
      "EvidenceDescription",
      "TargetLevel (0-5)",
      "DevelopmentAction",
      "ReviewerComments"
    ],
    "lookupRelationships": "Many-to-1 with DX_Topics; Many-to-1 with User Profiles",
    "choiceColumns": "Levels (0 to 5), VerificationStatus (Draft, Self-Assessed, Submitted, Verified, Returned)",
    "personColumns": "Employee, VerifiedBy",
    "dateColumns": "AssessmentDate, TargetCompletionDate, VerifiedDate",
    "attachmentStrategy": "Evidence attachments (Certificates, project links, code repositories)",
    "permissionConsiderations": "Strict Confidentiality: Employee and their direct Supervisor and DX Reviewers only. Never public."
  }
];

const fullPayload = {
  dxCategories,
  dxCapabilityLevels,
  dxTopics,
  dxKnowledge,
  dxProjects,
  dxExperiences,
  dxReusableAssets,
  dxLearningPaths,
  dxExperts,
  dxAssessments,
  dxAuditLog,
  dxFutureEntities
};

fs.writeFileSync(path.join(__dirname, 'dx-data.json'), JSON.stringify(fullPayload, null, 2), 'utf8');
fs.writeFileSync(path.join(__dirname, 'dx-data.js'), 'window.DX_SEED_DATA = ' + JSON.stringify(fullPayload) + ';\n', 'utf8');
console.log('dx-data.json and dx-data.js regenerated successfully!');
