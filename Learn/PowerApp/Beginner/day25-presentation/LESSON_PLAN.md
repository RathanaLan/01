# DAY 25 TRAINER MANUAL: ARCHITECTURE — PROBLEM -> PROCESS -> DATA -> UI -> LOGIC
**Phase:** Project / Synthesis  
**Central Mental Model:** `REAL PROBLEM -> PROCESS -> DATA -> UI/SCREEN -> LOGIC/DECISION -> ACTION -> STORAGE -> FEEDBACK -> TEST`  
**Today's Connection Chain:** `Real Problem -> Business Process -> Data Schema -> Screen UI -> Power Fx Logic -> Cloud Storage -> Feedback Loop -> User Test`  
**Core Meaning:** Synthesize all 24 prior concepts before building. Every single button, field, variable, formula, and column must trace directly back to an authentic business requirement.  
**Prior Connection:** Days 1–24 (The entire foundation: controls, data types, logic, collections, SharePoint lists, galleries, forms, and CRUD operations).  
**Forward Bridge:** Day 26: Implement the Architecture End-to-End (Building the complete multi-screen application from today's architectural blueprint).  
**Duration:** Exactly 90 Minutes (Spiral-Learning Pattern)

---

## 1. 3–5 MEASURABLE LEARNING OBJECTIVES
By the end of this 90-minute lesson, an absolute zero beginner student will be able to:
1. **Trace the 7-Layer Architectural Chain:** Accurately trace any UI control, formula, or database column from a business user's pain point down through Process, Data, Screen, Logic, Storage, Feedback, and Test without skipping layers.
2. **Deconstruct a Raw Business Problem into a Process Map:** Translate an unorganized workplace complaint (e.g., "Defective machine parts are piling up on Line 2!") into a sequence of human steps, decision points, and roles before opening Power Apps Studio.
3. **Draft a Normalized Data Specification from Process Requirements:** Define the required SharePoint columns, data types (Single line of text, Choice, Number, Date and Time, Person), and validation constraints required to support each process step.
4. **Map UI Screens and Power Fx Rules to Process Stages:** Determine the minimum number of screens (Browse, Detail, Form), gallery layouts, FormModes (`FormMode.New` vs `FormMode.Edit`), and conditional formulas (`SubmitForm`, `ResetForm`, `Notify`, `DisplayMode`, `Visible`) needed to execute the process.
5. **Detect and Prevent "Blank-Canvas Syndrome":** Critique an unstructured app development proposal, identifying common architectural risks (such as creating columns on the fly, mixing business logic with button triggers, and designing screens before understanding the data schema).

---

## 2. 5-MINUTE CONCEPT-MAP RECAP (CONNECTING DAYS 1–24)

```
[Day 1-5: The Foundation]
   UI Controls (Buttons, Labels, TextInputs) -> Variables (UpdateContext, Set)
                           ↓
[Day 6-10: Logic & Collections]
   Conditions (If, IsBlank, And/Or) -> Collections (ClearCollect, Tabular Data)
                           ↓
[Day 11-16: Advanced UI & Navigation]
   Multi-Screen Flow -> Components -> Responsive Containers -> UX Feedback (Notify)
                           ↓
[Day 17-20: Business Rules & Persistent Storage]
   Validation Logic -> SharePoint Lists (Columns, Types, Records) -> Data Source Connectors
                           ↓
[Day 21-24: The CRUD Operations Lifecycle]
   Galleries (Read/Select) -> Forms (DataCards, Modes) -> Create (NewForm) -> Update (EditForm)
                           ↓
═══════════════════════════════════════════════════════════════════════════════════
[DAY 25: THE ARCHITECTURAL SYNTHESIS]
   Assemble every single tool from Days 1-24 into a coherent Engineering Blueprint:
   REAL PROBLEM ➔ PROCESS ➔ DATA ➔ UI/SCREEN ➔ LOGIC ➔ STORAGE ➔ FEEDBACK ➔ TEST
═══════════════════════════════════════════════════════════════════════════════════
                           ↓
[Day 26-27: Capstone Implementation & Production Deployment]
   Build the Master Blueprint -> Test Edge Cases -> User Acceptance
```

### Trainer Dialogue & Recap Script (5 minutes)
> *"Welcome to Day 25! Take a deep breath. Over the last 24 days, you have learned dozens of individual skills: buttons, labels, text inputs, variables, If statements, collections, SharePoint lists, galleries, forms, NewForm, EditForm, and SubmitForm.  
> If we compare learning Power Apps to learning carpentry, for the last 24 days you have been learning how to use the hammer, the saw, the tape measure, the screws, and the sandpaper.  
> But if someone dumps a pile of lumber and nails in your yard and says: 'Build me a 3-bedroom house,' what happens if you pick up the hammer immediately and start nailing boards together? The walls fall down, the plumbing ends up in the living room, and the roof caves in!  
> Professional app builders never open Power Apps Studio on day one. Before touching a single button, we build the **Architecture**. Today is our architectural masterclass: we learn how to translate a messy human problem into an unbreakable 7-layer blueprint!"*

---

## 3. PREREQUISITE ACTIVATION QUESTIONS (RETRIEVAL PRACTICE)

### Question 1:
- **Trainer Ask:** *"When a user fills out a support ticket on screen and clicks 'Submit', what must happen to the data, and which tool from Day 19 permanently stores it?"*
- **Expected Student Response:** *"The data must be validated so there are no blanks, and then `SubmitForm()` pushes the record into a SharePoint list where it stays permanently even if the app or computer is turned off."*
- **Correction if student hesitates:** Remind the student of the difference between temporary RAM variables (Day 18) and cloud storage tables in SharePoint (Day 19).

### Question 2:
- **Trainer Ask:** *"If we want to show a manager a list of 50 active requests, and then let her click one request to see all its details in a form, what two controls from Days 21 and 22 work together, and what is the magic glue formula?"*
- **Expected Student Response:** *"A Gallery shows the list of 50 rows. A Form displays the fields of the selected row. The magic glue formula is setting the Form's `Item` property to `galRequests.Selected` (or `galWorkOrders.Selected` in today's maintenance system)."*
- **Correction if student hesitates:** Emphasize the distinction between `Items` (plural, Gallery table) and `Item` (singular, Form record).

### Question 3:
- **Trainer Ask:** *"Why did we spend so much time on Day 17 learning `IsBlank()` and `Notify()` before saving records?"*
- **Expected Student Response:** *"Because if we allow empty or invalid data into our database, our reports break, technicians get dispatched with missing information, and the whole company loses trust in the system."*

---

## 4. TODAY'S 'WHY THIS EXISTS' PROBLEM: THE BLANK-CANVAS CATASTROPHE

### The Workplace Scenario: Apex Precision Engineering ($45,000 Wasted)
Apex Precision Engineering manufactures CNC turbine blades. Operators on the factory floor reported that coolant pumps were overheating, causing micro-fractures in blades ($8,000 per blade).  
A junior citizen developer was asked to "build a quick Power App for machine breakdowns."  

**What the developer did (The Blank-Canvas Trap):**
1. Opened Power Apps Studio on Monday morning with zero planning.
2. Put a bright red button on Screen 1 saying "REPORT BREAKDOWN".
3. Added 12 text input boxes without labels.
4. Created a SharePoint list called "AppStuff" with columns named `Col1`, `Data2`, `Text_A`.
5. Connected the button with complicated patchwork variables.

**The Catastrophic Failure on Friday:**
- When operators typed machine numbers, some typed `CNC-04`, others typed `Unit 4`, others typed `machine four`. Reports couldn't group the data!
- When technicians fixed a pump, there was no screen to update status from "Broken" to "Fixed", so technicians had to create a *new* ticket. Within 2 weeks, there were 400 tickets for 18 machines, and nobody knew which machines were safe to run!
- One machine ran with low coolant for 3 days because its ticket was marked "Closed" in an unlinked variable. A $45,000 spindle burned out, halting the production line for 48 hours.

**The Lesson:**  
Software development is not about dragging colorful rectangles across a canvas. Software development is about **clarifying human processes and capturing structured business truth**.

---

## 5. PLAIN-LANGUAGE CONCEPT BEFORE TECHNICAL VOCABULARY

| Plain-Language Concept | Technical Term | What It Actually Means in Plain English |
| :--- | :--- | :--- |
| **The Real Pain** | Business Requirement / Problem Statement | The specific operational headache that wastes money, creates safety risks, or delays customers. |
| **The Hand-off Steps** | Business Process Map / Workflow | The sequence of who does what, when they do it, and what decision must be made next. |
| **The Memory Buckets** | Data Schema / Table Structure | The exact named containers (columns) and types of information we must remember forever. |
| **The Windows & Doors** | UI / Screen Architecture | The user interfaces where people view records, enter new requests, or approve tasks. |
| **The Traffic Rules** | Business Logic / Power Fx Rules | The conditions and formulas that prevent mistakes, calculate values, and steer users safely. |
| **The Filing Cabinet** | Persistent Data Source (SharePoint) | The secure cloud database where records live permanently across all users and devices. |
| **The Fire Drill** | User Acceptance Testing (UAT) | Testing the app with real operators using unexpected edge cases before trusting it in production. |

---

## 6. TWO REAL-WORLD ANALOGIES

### Analogy 1: The Custom Commercial Kitchen Renovation
Imagine an architect designing a kitchen for a five-star restaurant:
1. **Real Problem:** Customers wait 45 minutes for entrees because cooks bump into each other.
2. **Process:** Raw food enters through loading dock ➔ Prep station washes vegetables ➔ Sauté chef cooks meat ➔ Plating station checks quality ➔ Waiter serves guest.
3. **Data/Inventory:** Refrigerator bins labeled: Poultry (raw), Vegetables (prepped), Finished Sauces (holding temp 65°C).
4. **UI/Workstations:** Stainless steel counters positioned in a logical U-shape so nobody walks backward.
5. **Logic/Safety Rules:** If the meat thermometer reads below 74°C, the chef *cannot* hand the plate to the waiter (Validation!).
6. **Storage:** Walk-in cooler with digital temperature logging.
7. **Testing:** A private mock dinner with 50 guests to see where bottlenecks happen before opening night.

> *If the architect installed the stove before asking the chef what menu was being cooked, the restaurant would go bankrupt in a week!*

### Analogy 2: The Hospital Emergency Triage System
When a patient arrives at an Emergency Room:
1. **Problem:** Critical cardiac patients must be treated in 8 minutes; minor sprains can wait 60 minutes.
2. **Process:** Check-in desk ➔ Triage nurse assessment ➔ Triage color assigned (Red, Yellow, Green) ➔ Doctor examination ➔ Discharge or Admission.
3. **Data:** Patient ID, Blood Pressure, Heart Rate, Pain Level (1-10), Assigned Room.
4. **Screens:** Triage Tablet (Fast input) ➔ Nurse Station Dashboard (Red alerts prioritized at top) ➔ Bedside Monitor (Full medical history).
5. **Logic:** `If(HeartRate > 140 Or BloodPressure < 90, Color = Red, Color = Yellow)`.
6. **Storage:** Central Hospital Electronic Health Records (EHR).
7. **Test:** Simulation drills with dummy patients and stopwatch timings.

---

## 7. MANUFACTURING / DX WORKPLACE EXAMPLE: THE APEX PUMP MAINTENANCE SYSTEM

Let us reconstruct the failed Apex Precision Engineering system using our **7-Layer Architectural Blueprint**:

```
[LAYER 1: REAL PROBLEM]
CNC Coolant Pumps overheat without warning, causing $8,000 blade defects and emergency line shutdowns.

[LAYER 2: PROCESS]
Operator spots amber warning light ➔ Operator logs breakdown ➔ Maintenance Lead receives urgent push ➔
Technician fixes pump & logs replacement parts ➔ Supervisor inspects & signs off ➔ Machine resumes production.

[LAYER 3: DATA SCHEMA (SharePoint List: 'EquipmentWorkOrders')]
- Title (Single line of text) : Unique Ticket Code (e.g., WO-2026-1045)
- MachineID (Choice)          : [CNC-01, CNC-02, CNC-03, CNC-04, Lathe-01, Press-01]
- IssueDescription (Multi-line): Detailed explanation of failure
- Priority (Choice)           : [Critical, High, Medium, Low]
- Status (Choice)             : [New, Dispatched, In Repair, Resolved, Closed]
- ReportedBy (Person)         : Current User
- AssignedTechnician (Person) : Maintenance Staff
- RepairCost (Number)         : Cost of spare parts
- RepairDate (Date & Time)    : Timestamp of fix

[LAYER 4: SCREEN ARCHITECTURE (3-Screen Standard)]
- Screen 1: scr_BrowseWorkOrders (Gallery with search, priority color tags, and status filter)
- Screen 2: scr_CreateWorkOrder  (Clean form with required dropdowns and camera capture)
- Screen 3: scr_EditWorkOrder    (Technician update form with parts list and supervisor approval button)

[LAYER 5: BUSINESS LOGIC (Power Fx)]
- Validation: If(IsBlank(txtIssue.Text) Or IsBlank(cmbMachine.Selected), DisplayMode.Disabled, DisplayMode.Edit)
- Auto-Routing: If(cmbPriority.Selected.Value = "Critical", Notify("CRITICAL ALERT DISPATCHED!", NotificationType.Error))
- Resolution Gate: If(Status = "Resolved" And IsBlank(txtRepairCost.Text), Error: "Cost is mandatory before closing!")

[LAYER 6: STORAGE & ACTIONS]
- New: SubmitForm(frmNewWorkOrder)
- Update: SubmitForm(frmEditWorkOrder)
- Reset: ResetForm(frmNewWorkOrder)

[LAYER 7: FEEDBACK & TESTING]
- Operator sees green banner: "Work Order #1045 submitted. Technician Dara notified."
- Technician updates machine status and sees dashboard update in real time.
```

---

## 8. VISUAL CAUSE-AND-EFFECT ARCHITECTURE DIAGRAM

```
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                    LAYER 1: THE BUSINESS PROBLEM                            │
  │  "Pumps burn out, ruining $8k blades. Response time is too slow."           │
  └──────────────────────────────────────┬──────────────────────────────────────┘
                                         │ drives
                                         ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                    LAYER 2: THE BUSINESS PROCESS                            │
  │  Log Incident  ──►  Dispatch Tech  ──►  Repair & Cost  ──►  Sign-off & Close │
  └──────────────────────────────────────┬──────────────────────────────────────┘
                                         │ dictates
                                         ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                    LAYER 3: THE DATA SCHEMA                                 │
  │  SharePoint List: WorkOrders [MachineID, Priority, Status, Tech, Cost, Date]│
  └──────────────────────────────────────┬──────────────────────────────────────┘
                                         │ informs
                                         ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                    LAYER 4: UI / SCREEN ARCHITECTURE                        │
  │  scr_Browse (Gallery)  ──►  scr_Create (NewForm)  ──►  scr_Detail (EditForm)│
  └──────────────────────────────────────┬──────────────────────────────────────┘
                                         │ governed by
                                         ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                    LAYER 5: LOGIC & DECISION RULES                          │
  │  If(IsBlank(Machine), Disabled) | If(Priority="Critical", Red, Cyan)        │
  └──────────────────────────────────────┬──────────────────────────────────────┘
                                         │ executes
                                         ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                    LAYER 6: ACTIONS & CLOUD STORAGE                         │
  │  SubmitForm() writes back to SharePoint; ID generated; Item updated         │
  └──────────────────────────────────────┬──────────────────────────────────────┘
                                         │ confirms via
                                         ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                    LAYER 7: FEEDBACK & AUDIT TESTING                        │
  │  Notify("Ticket Saved"); Form resets; Gallery refreshes; Line stays active  │
  └─────────────────────────────────────────────────────────────────────────────┘
```

---

## 9. STEP-BY-STEP TRAINER LIVE DEMONSTRATION SCRIPT (15 MINUTES)

### Setup & Philosophy:
The trainer sits with a whiteboard (or digital whiteboard tool) and a blank document. Power Apps Studio is explicitly **closed**.

### Step 1: Writing the 1-Page Architecture Blueprint (5 min)
- **Trainer Speech:**  
  *"Watch what I do first. I do not open Power Apps. I open my notebook. I write down four headings:  
  1. What hurts the business?  
  2. Who touches the process?  
  3. What facts must we remember?  
  4. What screens make those facts visible?"*
- **Trainer writes on board:**
  - *Problem:* Machine downtime costs $150/minute.
  - *Actors:* Operator (Reporter), Maintenance Lead (Dispatcher), Technician (Fixer).
  - *Decisions:* Is this machine safe to run or locked out?

### Step 2: Deriving the Data Schema from the Human Steps (5 min)
- **Trainer Speech:**  
  *"Now we look at the actors. What does the Operator need to tell us? The machine name. Can we let them type free text? NO! If they type 'cnc4' and another types 'Machine #4', we cannot filter. So MachineName must be a **Choice column** with a strict list.  
  Next: What does the Technician need to record? The parts cost. Is parts cost text? NO! It is a **Number column**, so we can calculate sums and averages at the end of the month."*

### Step 3: Determining Screen Count and Control Hierarchy (5 min)
- **Trainer Speech:**  
  *"How many screens do we need? Beginners always create 12 screens with 3 buttons each. That makes users dizzy!  
  The industry gold standard for business CRUD apps is the **3-Screen Architecture Pattern**:  
  - Screen 1: **BrowseScreen** (Gallery of cards, search box, filter dropdown).  
  - Screen 2: **CreateScreen** (NewForm in `FormMode.New` with blank fields and validation).  
  - Screen 3: **DetailEditScreen** (EditForm in `FormMode.Edit` linked to `Gallery.Selected` with repair and closure fields).  
  With just 3 screens, you can run an entire multi-million-dollar factory department!"*

---

## 10. HANDS-ON GUIDED LEARNER PRACTICE (15 MINUTES)

### Scenario: The Warehouse Forklift Safety Inspection App
The trainer guides the student step-by-step through architecting a safety inspection checklist for 12 warehouse forklifts.

#### Step 1: Identify the Business Problem
- **Prompt to student:** *"What bad thing happens if a forklift has worn brakes and nobody reports it?"*
- **Learner Answer:** *"An accident occurs, someone gets hurt, or pallets crash."*
- **Architectural Requirement:** Daily pre-shift inspection must be logged before the forklift key is released.

#### Step 2: Map the Process
- **Trainer Guide:** Draw a 3-box process:
  1. Driver logs Forklift #, Battery %, Brake Test (Pass/Fail).
  2. If Brake Test = Fail, forklift is flagged "LOCKED OUT".
  3. Safety Lead receives instant alert to inspect vehicle.

#### Step 3: Define the Data Schema
Have the student fill in the blank table:
- `ForkliftID` ➔ Choice `[FL-01 through FL-12]`
- `InspectionDate` ➔ Date & Time (Default: `Now()`)
- `InspectorName` ➔ Person (Current user: `User().FullName`)
- `BrakesPassed` ➔ Yes/No (Boolean)
- `Status` ➔ Choice `[Safe to Operate, Grounded / Lockout]`

#### Step 4: Map the UI & Logic
- **Formulas to connect:**
  - `btnSubmit.DisplayMode`:  
    `If(IsBlank(cmbForklift.Selected) Or IsBlank(radioBrakes.Selected), DisplayMode.Disabled, DisplayMode.Edit)`
  - Status Calculation:  
    `If(radioBrakes.Selected.Value = "Fail", "Grounded / Lockout", "Safe to Operate")`
  - Feedback:  
    `If(radioBrakes.Selected.Value = "Fail", Notify("VEHICLE GROUNDED! Do not operate.", NotificationType.Error), Notify("Inspection logged. Safe shift!", NotificationType.Success))`

---

## 11. INDEPENDENT PRACTICE CHALLENGE (10 MINUTES)

### The Challenge: The Raw Material Rejection System
Apex Precision receives shipments of aluminum alloy bars. Sometimes bars arrive with rust, dents, or incorrect diameter.  
**Student Task:** On paper or in a text document, produce the 5-Layer Architectural Specification for a **Material Quarantine App**:
1. **Business Problem (1 sentence):** Why does this app exist?
2. **Process (3 bullet points):** What are the 3 workflow milestones?
3. **Data Schema (4 columns minimum):** List Column Name, SharePoint Data Type, and Purpose.
4. **Screens (2 screens minimum):** Name each screen and list primary controls.
5. **Logic Rule (1 formula in plain English + Power Fx):** Define one validation or safety rule.

### Expected Student Output (Trainer Answer Key):
1. **Problem:** Defective raw aluminum gets machined into parts before inspection, wasting $12,000 in machining labor on bad metal.
2. **Process:**  
   - Receiving clerk inspects incoming shipment.  
   - If flawed, clerk logs quarantine ticket and takes photo.  
   - Quality Manager reviews quarantine log and approves supplier return or scrap.
3. **Data Schema:**  
   - `LotNumber` (Single line of text)  
   - `SupplierName` (Choice: Alcoa, RioTinto, Kaiser)  
   - `DefectType` (Choice: Surface Rust, Bent Bar, Dimension Error)  
   - `QuarantineStatus` (Choice: Quarantined, Released, Scrapped)  
   - `InspectedBy` (Person)
4. **Screens:**  
   - `scr_QuarantineDashboard` (Gallery of quarantined lots, filter by Supplier)  
   - `scr_LogRejection` (NewForm with LotNumber, SupplierName, DefectType, and camera control)
5. **Logic Rule:**  
   - Plain English: If Lot Number is empty, the Submit button is grayed out and cannot be clicked.  
   - Power Fx: `btnSubmit.DisplayMode = If(IsBlank(txtLotNumber.Text), DisplayMode.Disabled, DisplayMode.Edit)`

---

## 12. COMMON MISCONCEPTIONS & PITFALL WARNINGS

### Misconception 1: "I should start building screens in Power Apps to see what looks good."
- **Wrong Mental Model:** The developer believes UI drives the software.
- **The Reality:** UI is just a temporary visual mask over the data schema. If your data schema is flawed, your UI will have to be completely deleted and rebuilt 5 times.
- **Trainer Fix:** Enforce the rule: *No Power Apps Studio until the SharePoint columns and data types are signed off in writing!*

### Misconception 2: "I will just use Single Line of Text for everything because it's easier."
- **Wrong Mental Model:** The developer thinks text fields give users maximum freedom.
- **The Reality:** Free-form text fields destroy data integrity. If users can type "High", "high", "HIGH", "URGENT", and "urgent!", formulas like `Filter(WorkOrders, Priority = "High")` will fail to return half the records.
- **Trainer Fix:** Teach: *Text is for human narrative (descriptions). Choices and Lookups are for system decisions.*

### Misconception 3: "Every new button or feature needs its own screen."
- **Wrong Mental Model:** Student thinks a 20-screen app is more impressive than a 3-screen app.
- **The Reality:** Multi-screen bloat causes memory lag, navigation bugs, and user confusion. Modern enterprise apps use 3 screens with dynamic containers and conditional visibility.
- **Trainer Fix:** Teach the *3-Screen Master Pattern*: Browse ➔ Create ➔ Detail/Edit.

---

## 13. 5 FORMATIVE ASSESSMENT QUESTIONS (WITH REASONING)

### Question 1:
- **Question:** *"Why must we define the business problem before we design the SharePoint columns?"*
- **Answer:** Because the problem defines what decisions humans must make. What decisions humans make determines what data facts we must record. If we don't know the problem, we will either record useless columns or miss critical ones.

### Question 2:
- **Question:** *"What happens if a developer creates a SharePoint column called 'Cost' as 'Single line of text' instead of 'Number'?"*
- **Answer:** The app will treat dollar values as alphabetical characters. You will not be able to use `Sum()`, `Average()`, or greater-than comparisons (`Cost > 500`). Sorting will also fail (e.g., "$100" will sort before "$20" alphabetically!).

### Question 3:
- **Question:** *"Why do professional architects separate 'Create' flow from 'Edit' flow using FormModes (`FormMode.New` vs `FormMode.Edit`) instead of making duplicate forms?"*
- **Answer:** Because one single form control can handle both creation and editing simply by changing its mode. Using one form cuts maintenance in half: if a new column is added to SharePoint, you only add it to one form instead of maintaining two identical twins.

### Question 4:
- **Question:** *"What happens if an app has beautiful UI and working Submit buttons, but zero data validation on required fields?"*
- **Answer:** Users will accidentally submit half-empty records. Technicians will receive blank tickets with no machine ID or location, resulting in delayed repairs and broken reports.

### Question 5:
- **Question:** *"In our 7-layer mental model, where does Power Fx live, and what is its sole job?"*
- **Answer:** Power Fx lives in **Layer 5 (Logic & Decision Rules)**. Its job is to act as the traffic controller: asking questions about data, validating inputs, controlling visibility, and executing actions like `SubmitForm()` and `Notify()`.

---

## 14. FINAL CHALLENGE WITH EXPECTED RESULT AND RUBRIC

### The Final Challenge: The Complete Architecture Blueprint for "Apex Tooling Tracker"
CNC milling tools wear down after 50 hours of cutting titanium. If a worn cutting tool isn't replaced, it shatters inside the turbine blade ($25,000 spindle replacement).  
The learner must produce a written **1-Page Architectural Specification** for the "Apex Tooling Tracker App".

### Evaluation Rubric (3 Mastery Levels):

| Assessment Dimension | Level 1: Novice (Needs Guidance) | Level 2: Competent (Meets Standard) | Level 3: Master Architect (Exceeds Standard) |
| :--- | :--- | :--- | :--- |
| **Problem & Process Alignment** | Vaguely states "Track tools". Process misses who replaces the tool. | Clearly states the financial risk ($25k damage). Outlines 3 distinct process steps: Check hours ➔ Flag tool ➔ Replace tool. | Quantifies cost impact. Details hand-off gates, operator roles, and safety sign-off procedures. |
| **Data Schema Normalization** | Uses text fields for everything. Misses tool wear hours or status. | Defines correct SharePoint columns: ToolID (Choice), HoursUsed (Number), Status (Choice), ReplacedDate (Date). | Includes normalized columns, calculated alerts (`HoursRemaining`), technician audit trail (`ReplacedBy`), and choice values. |
| **Screen & UI Flow Architecture** | Proposes 6+ disorganized screens with redundant buttons. | Adheres to 3-Screen standard: Browse (Gallery with color-coded hours), New Tool form, Replace Tool form. | Masterfully specifies responsive containers, search bars, status tabs, and clear visual hierarchy for shop-floor tablets. |
| **Power Fx Logic Traceability** | Writes syntax with errors or cannot explain how validation works. | Correctly specifies validation: `If(HoursUsed > 50, DisplayMode.Disabled)` and `Notify()` alerts. | Writes complete, readable formulas for `DisplayMode`, `Color` conditional formatting, `OnSuccess` routing, and filter queries. |

---

## 15. OPTIONAL REVIEW / HOMEWORK TASK (<= 15 MINUTES)
**The "Pen & Paper Blueprint" Exercise:**
Before tomorrow's class (Day 26), take one real process from your actual workplace (e.g., requesting office supplies, booking a conference room, reporting a safety hazard, or logging vehicle mileage):
1. Write the **1-Sentence Business Problem** (What headache does this solve?).
2. Write the **3-Box Process Flow** (Who starts it? Who acts? Who closes it?).
3. List the **5 Critical SharePoint Columns** with their exact data types.
4. Bring this blueprint to Day 26. Tomorrow, we will turn blueprints into living, breathing Power Apps!

---

## 16. CONNECTION MAP: BEFORE -> TODAY -> NEXT

```
┌────────────────────────────────────────────────────────────────────────┐
│                       BEFORE (DAYS 1 TO 24)                            │
│  - Individual building blocks learned in isolation                     │
│  - UI Controls: Buttons, Labels, Inputs (Days 1-5)                     │
│  - Logic: Variables, Conditions, Collections (Days 6-10)               │
│  - Storage: SharePoint Lists & Columns (Days 19-20)                    │
│  - CRUD: Galleries, Forms, NewForm, EditForm, SubmitForm (Days 21-24)  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        TODAY (DAY 25)                                  │
│  - THE ARCHITECTURAL SYNTHESIS                                         │
│  - 7-Layer Engineering Blueprint:                                      │
│    Problem ➔ Process ➔ Data ➔ UI ➔ Logic ➔ Storage ➔ Test              │
│  - Every screen, card, and formula traces back to business pain         │
│  - Zero "Blank Canvas" coding; structure precedes software             │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        NEXT (DAY 26)                                   │
│  - CAPSTONE PROJECT PART 1: END-TO-END IMPLEMENTATION                  │
│  - Taking today's architectural blueprint into Power Apps Studio       │
│  - Building the SharePoint list schema live                            │
│  - Constructing the 3-screen responsive application from scratch       │
└────────────────────────────────────────────────────────────────────────┘
```
