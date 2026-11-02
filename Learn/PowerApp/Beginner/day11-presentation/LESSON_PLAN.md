# Power Apps Foundation — Day 11: Design Data from the Process
**Phase:** Phase 4: Data Architecture  
**Connection Chain:** Process Questions ➔ Required Fields ➔ Data Types ➔ Status Field ➔ Unique ID  
**Core Meaning:** Data design must strictly originate from what the process needs to execute and decide, never from random or speculative columns.  
**Prior Connection:** Day 9 (End-to-End Workflow & 6 Universal Stages) + Day 10 (Tables & Records: Storing Many Cases).  
**Forward Bridge:** Day 12 (Turn Process and Data into Screens & UI Wireframes).  
**Target Audience:** Absolute Zero Beginners (Citizen Developers, Plant Technicians, Supervisors, Administrative DX Champions).

---

## 1. Measurable Learning Objectives (Bloom's Taxonomy L2–L5)

By the end of this 90-minute session, the learner will be able to:
1. **Explain (L2 - Understand)** why designing fields from process questions prevents "data bloat" and system paralysis, contrasting a structured intake form against an unconstrained spreadsheet.
2. **Classify (L3 - Apply)** process questions into their exact Power Apps / Dataverse data types (Single Line Text, Multiple Lines Text, Whole Number, Decimal/Currency, Date & Time, Choice/OptionSet, Yes/No Boolean, and Auto-Number ID).
3. **Analyze (L4 - Analyze)** an operational workflow (e.g., Apex Plastics Tooling Request) to extract:
   - Mandatory gating fields vs. optional audit fields.
   - The master `Status` state machine fields.
   - The immutability requirements of the Unique Identifier (`ID`).
4. **Evaluate & Formulate (L5 - Evaluate/Create)** a production-grade Data Schema Specification Table and translate validation business rules into functional Power Fx gating conditions (`DisplayMode`, `IsBlank`, and `Value`).

---

## 2. Timed 90-Minute Agenda

| Time | Duration | Segment | Core Activities |
| :--- | :---: | :--- | :--- |
| **00:00 – 10:00** | 10 min | **Part 1: Recall & Connect** | • Welcome, 27-day spiral map check-in.<br>• 5-min concept map reconnecting Day 9 (Workflow) and Day 10 (Tables/Records).<br>• Prerequisite retrieval check (3 questions with interactive reveal). |
| **10:00 – 25:00** | 15 min | **Part 2: Discover (The Why)** | • The $42,000 "47-Column Excel Monster & Missing Priority Crisis" at Apex Plastics.<br>• Plain-language concept: "Questions Before Columns".<br>• Everyday Analogy: The Doctor's Medical Triage Chart vs. Blank Notebook. |
| **25:00 – 45:00** | 20 min | **Part 3: Deep Dive Theory** | • The 5-Step Process-to-Data Pipeline.<br>• Core Data Types: Why choosing the wrong type breaks Power Fx logic.<br>• The Master `Status` Field: The engine of workflow routing.<br>• Unique Record Identifier (`ID`): The unchanging birthmark of a case. |
| **45:00 – 60:00** | 15 min | **Part 4: Demonstrate & Lab** | • Energy rest & mental stretch (45:00).<br>• Interactive Widget 1: Process-to-Schema Architect & Field Type Workbench.<br>• Trainer Live Demo: Designing a clean 8-field schema from a 4-step maintenance flow. |
| **60:00 – 75:00** | 15 min | **Part 5: Guided Practice** | • Auditing a broken warehouse scrap schema (identifying 4 fatal data design flaws).<br>• Interactive Widget 2: 6-Scenario Schema & Data Type Practice Simulator.<br>• 4 Dangerous Mental Misconceptions & Trainer Corrections. |
| **75:00 – 90:00** | 15 min | **Part 6: Assess & Bridge** | • Interactive Widget 3: 5-Question Knowledge Check Quiz with rationale.<br>• Capstone Independent Challenge: Apex Plastics Tooling Request Schema.<br>• Benchmark Solution Reveal & 4-Level Evaluation Rubric.<br>• 15-Minute Homework & 3-Day Bridge Map to Day 12. |

---

## 3. Prerequisite Retrieval Practice (Checking Days 9 & 10)

Before designing fields, verify that learners possess firm mental anchors:

1. **Question 1 (Day 10 - Table vs. Variable):**
   * *Trainer Prompt:* "Why can't an enterprise support request system store tickets in simple global variables like `varMachine` and `varIssue`?"
   * *Target Beginner Answer:* "A variable is a single box that can only hold one case at a time. The moment a second employee submits a ticket, it completely overwrites the first ticket! We need a **Table** to hold many independent **Records**."

2. **Question 2 (Day 9 - The Role of Status):**
   * *Trainer Prompt:* "What is a 'Status' in a business flow, and why does Power Fx care about it?"
   * *Target Beginner Answer:* "Status is not decorative text; it is the traffic cop or switch. Power Fx checks the status (e.g., `Status = "Submitted"`) to decide which buttons appear, who owns the work, and whether inputs are editable or locked."

3. **Question 3 (Day 4 & 5 - Conditions):**
   * *Trainer Prompt:* "If we store a cost as plain text like `\"$450\"`, what happens when Power Fx asks `If(Cost > 1000, ...)`?"
   * *Target Beginner Answer:* "Power Fx will throw an error or fail to evaluate! Computers cannot perform mathematical comparisons (`>`, `<`) on text characters. Cost must be stored as a **Number / Currency** data type."

---

## 4. The "Why This Exists" Workplace Crisis: Apex Plastics

### The $42,000 "47-Column Excel Monster & The Toxic Leak"
* **The Background:** At Apex Plastics, the plant manager asked a junior citizen developer to build an app for machinery repairs. The developer asked every department head: "What columns do you want to see?"
* **The Fatal Mistake:** Without looking at the actual process steps, the developer created **47 random fields**, nearly all configured as free-text:
  - `Priority` was a free text box.
  - `Machine` was a free text box.
  - `Cost` allowed free text.
  - There was no auto-generated ticket ID; operators manually typed "Ticket #1", "Ticket #2".
* **The Incident (Wednesday, 14:10):**
  - Chemical Line 4 developed a hazardous solvent seal breach.
  - Operator Sothea typed: `Machine: "Line 4 Main Pump"`, `Priority: "EMERGENCY ASAP!!!"`, `Cost: "high"`.
  - At the same time, Operator Narith on Line 1 reported a squeaky chair: `Machine: "Office Chair"`, `Priority: "urgent"`.
* **The Disaster:**
  - The maintenance supervisor opened the list. He tried to sort by Priority, but alphabetical sorting put `"EMERGENCY ASAP!!!"` *after* `"Critical"`, `"high"`, and `"urgent"`.
  - He saw two tickets marked "Ticket #12" because operators duplicated numbers.
  - Maintenance dispatched a technician to fix the squeaky chair, assuming the other ticket was a duplicate pump inspection.
  - **4 Hours Later:** The unaddressed solvent leak breached containment, triggering environmental safety alarms, evacuating 200 workers, and incurring **$42,000 in cleanup fines and lost batch production!**
* **The Core Lesson:**
  > *"When you create fields randomly without tying them to process questions, you don't build a database—you build a toxic digital landfill. Every field must exist for one reason only: to enable a specific human decision or automated action in the process."*

---

## 5. Plain-Language Concept Before Technical Vocabulary

| Technical Term | Plain-Language Definition | Physical Everyday Analogy |
| :--- | :--- | :--- |
| **Field / Column** | A labeled blank line on a form that answers exactly **one specific question**. | The "Allergies:" line on a medical clipboard. |
| **Data Type** | The strict rule governing **what shape of answer** is allowed into that blank line. | A coin slot: only quarters fit; dollar bills are rejected. |
| **Required Field (Mandatory)** | A question so vital that the process cannot move to the next person if it is left empty. | The boarding gate: you cannot board the plane without a Passport Number. |
| **Status Field** | The master progress indicator showing **whose turn it is to act**. | The order buzzer at a restaurant (Buzzer Red = Cooking; Buzzer Green = Ready). |
| **Unique Identifier (ID)** | An unchanging, unrepeatable number permanently stamped onto the ticket at birth. | A baby's birth certificate number or an automobile's VIN number. |

---

## 6. The 5-Step Process-to-Data Pipeline

To design data like a professional architect, never open Power Apps or Dataverse first. Follow this 5-step derivation formula:

```
[PROCESS STEP] ➔ [PROCESS QUESTION] ➔ [FIELD NAME] ➔ [DATA TYPE] ➔ [GATING RULE]
```

### The 4 Universal Process Steps & Their Data Requirements:

#### Step 1: Report / Request (Operator Bopha)
* *Process Question:* "Which exact machine is broken, what happened, and how dangerous is it?"
* *Field 1:* `MachineID` ➔ **Choice / Lookup** (Restricted list of plant assets: "Press #1", "Press #2", "Chiller A"). *Why not text?* Prevents typos like "pres 1" vs "Press#1".
* *Field 2:* `IssueDescription` ➔ **Multiple Lines of Text** (Unconstrained explanation of the noise/leak).
* *Field 3:* `UrgencyLevel` ➔ **Choice** (`Low`, `Medium`, `High`, `Critical`). *Why?* Allows instant filtering and automated escalation.
* *Field 4:* `DateReported` ➔ **Date and Time** (System stamped via `Now()`).

#### Step 2: Review & Financial Gate (Supervisor Visal)
* *Process Question:* "Do I approve this repair, what will it cost, and who will do the work?"
* *Field 5:* `IsApproved` ➔ **Yes/No (Boolean)**. True = advance to Maintenance; False = return for rework.
* *Field 6:* `EstimatedCost` ➔ **Currency / Decimal Number**. *Why?* Needed for comparison logic: `If(EstimatedCost > 1000, RouteToPlantManager, RouteToShop)`.
* *Field 7:* `AssignedTechnician` ➔ **Person / User**.

#### Step 3: Execution / Repair (Technician Dara)
* *Process Question:* "What parts were replaced, how long did it take, and what was the root cause?"
* *Field 8:* `LaborHours` ➔ **Decimal Number** (e.g., 2.5 hours).
* *Field 9:* `PartsUsed` ➔ **Multiple Lines of Text** (e.g., "O-ring 42mm, hydraulic valve B").
* *Field 10:* `CompletionDate` ➔ **Date and Time**.

#### Step 4: Verification & Closure (Quality Inspector Vanna)
* *Process Question:* "Is the machine safe to restart, and what is the final ticket lifecycle state?"
* *Field 11:* `QASignoff` ➔ **Yes/No (Boolean)**.
* *Field 12:* `Status` ➔ **Choice / State Machine** (`Draft` ➔ `Submitted` ➔ `Under Review` ➔ `In Progress` ➔ `Resolved` ➔ `Closed`).
* *Field 13:* `RequestID` ➔ **Auto-Number / Unique ID** (e.g., `REQ-2026-0089`).

---

## 7. Power Fx Grammar: The Cause-and-Effect Chain

Always teach Power Fx as the direct realization of the business requirement:

```
BUSINESS REQUIREMENT ➔ PLAIN-ENGLISH RULE ➔ QUESTION (CONDITION) ➔ TRUE/FALSE ➔ ACTION ➔ POWER FX
```

### Pattern 1: Mandatory Field Gating (Safety Interlock)
* **Business Requirement:** An operator cannot submit a maintenance ticket without entering an issue description.
* **Plain-English Rule:** If the issue description box is empty, disable the Submit button; otherwise, enable it.
* **Question / Condition:** `IsBlank(txtDescription.Text)`
* **Resulting Boolean:** `True` (Empty) / `False` (Filled)
* **Decision / Action:** When True, `DisplayMode.Disabled`; when False, `DisplayMode.Edit`.
* **Power Fx Code:**
  ```powerfx
  btnSubmit.DisplayMode = If(
      IsBlank(txtDescription.Text),
      DisplayMode.Disabled,
      DisplayMode.Edit
  )
  ```

### Pattern 2: Financial Threshold Routing
* **Business Requirement:** If the estimated repair exceeds $1,000, the supervisor's direct approval button is hidden and replaced by an "Escalate to Plant Manager" button.
* **Plain-English Rule:** Ask if EstimatedCost is greater than 1000.
* **Condition:** `Value(txtEstimatedCost.Text) > 1000`
* **Resulting Boolean:** `True` / `False`
* **Power Fx Code:**
  ```powerfx
  btnApproveDirect.Visible = Value(txtEstimatedCost.Text) <= 1000
  btnEscalateManager.Visible = Value(txtEstimatedCost.Text) > 1000
  ```

---

## 8. Common Misconceptions & Trainer Corrections

### Misconception 1: "I should make all fields Text so the user has the freedom to type anything."
* *Plausible Wrong Mental Model:* "Text is flexible. If I use Text, the user can type `$500` or `Free` or `Call Bob`."
* *The Fatal Consequence:* You can never sort by price, you can never calculate total department spending with `Sum()`, and Power Fx cannot ask `If(Cost > 1000)` without crashing.
* *Trainer Correction:* *"Freedom for the user is chaos for the system. A database is not a diary; it is a calculation engine. Restricting input via strict data types protects the user from making expensive mistakes."*

### Misconception 2: "Status is just a text label that the technician updates when they feel like it."
* *Plausible Wrong Mental Model:* "I'll put a text box on the screen where the technician types 'Done' or 'Doing it now'."
* *The Fatal Consequence:* One technician types "Done", another types "Finished", another types "closed". Power Fx filters like `Filter(Tickets, Status = "Done")` miss 70% of completed tickets!
* *Trainer Correction:* *"Status must ALWAYS be a controlled Choice column. Status is the steering wheel of the application—if the spelling varies by a single letter, the entire workflow derails."*

### Misconception 3: "We don't need an ID column; we can just search by Machine Name or Date."
* *Plausible Wrong Mental Model:* "Every ticket has a machine name and a date, so that's enough to find it."
* *The Fatal Consequence:* Machine #6 breaks three times on Tuesday. Which ticket is which? When purchasing orders parts, how do they link invoice #901 to the specific incident?
* *Trainer Correction:* *"Every business case must have an unchanging, unique birthmark—an ID like `REQ-10042`. It eliminates ambiguity across humans, databases, and accounting systems."*

---

## 9. 5 Evaluative Knowledge-Check Questions (With Trainer Rationale)

1. **Question 1 (Core Purpose):** Why must a citizen developer design fields starting from the **process questions** rather than starting with a blank table?
   * *Answer:* Because every field requires maintenance, storage, validation, and UI space. Deriving fields from process steps guarantees that every piece of data captured directly answers a question needed to make a decision or execute work.
2. **Question 2 (What Happens If):** What happens if you store an `UrgencyLevel` as free text instead of a Choice/OptionSet column?
   * *Answer:* Users will enter inconsistent values (`"High"`, `"urgent"`, `"ASAP"`, `"critical"`). Power Fx automated routing rules and sorting algorithms will fail to group or escalate emergencies reliably.
3. **Question 3 (Why - Financial Logic):** Why does Power Apps require the `Value()` function when evaluating `txtCost.Text > 1000`?
   * *Answer:* Because text input controls on screens produce text strings (`"1000"`), even if the user typed numbers. The `Value()` function converts the text string into a mathematical number so comparison operators (`>`, `<`) can execute.
4. **Question 4 (Process Gating):** An operator clicks Submit, but the app blocks them because `MachineID` is empty. Why is this called a **Safety Interlock**?
   * *Answer:* In manufacturing and enterprise processes, submitting a maintenance request without identifying the machine creates a ghost ticket that cannot be serviced, wasting technician hours and risking equipment failure.
5. **Question 5 (ID Immutability):** Why must a Ticket ID (e.g., `REQ-2026-0042`) be **immutable** (never editable by users)?
   * *Answer:* If an ID could be edited, audit trails, purchase orders, email notifications, and historical compliance records would break, destroying the integrity of the database.

---

## 10. Capstone Independent Challenge & 4-Level Evaluation Rubric

### The Challenge: "The Apex Plastics Tooling Request Schema"
Design a complete 8-field data schema for a newly proposed injection mold tooling replacement process.

#### The 4-Step Process:
1. **Operator Request:** Operator notices worn tooling die on Press #3.
2. **Supervisor Financial Review:** Supervisor assesses replacement quote and selects budget category.
3. **Purchasing PO Issuance:** Purchasing enters purchase order number and supplier name.
4. **Toolroom Installation & Sign-off:** Toolroom technician logs installation date and confirms calibration.

#### Required Deliverable Matrix:
Fill in the 8-row schema table: Field Name | Data Type | Required? (Yes/No) | Process Step | Why This Data Type?

---

### Standard 4-Level Evaluation Rubric

| Level | Criteria | Characteristics |
| :---: | :--- | :--- |
| **Level 4: Mastery (100%)** | Flawless Architecture | • All 8 fields correctly mapped to specific process steps.<br>• 100% correct Data Types (Choice for tool types, Currency for quote, Date for install, Auto-Number for ID).<br>• Clear operational justification for required vs. optional fields.<br>• Flawless Power Fx validation condition drafted. |
| **Level 3: Proficient (75–99%)** | Solid Understanding | • 7-8 fields correct; 1 minor data type mismatch (e.g., using Text for Currency).<br>• Correct process step attribution.<br>• Minor syntax typo in Power Fx validation rule. |
| **Level 2: Developing (50–74%)** | Partial Understanding | • 2-3 data type errors (e.g., using Free Text for Status or Priority).<br>• Missed the Unique ID requirement.<br>• Confused condition question with action. |
| **Level 1: Novice (<50%)** | Needs Spiral Re-teaching | • Created random spreadsheet columns unrelated to the process steps.<br>• Made all fields Text.<br>• Unable to formulate a Power Fx validation expression. |

---

## 11. Optional 15-Minute Review & Homework Assignment

* **Home Activity (15 min):** Look at your own department's daily paperwork (e.g., a leave request, overtime sheet, or travel reimbursement form).
  1. Identify the **4 core process steps** that paper travels through.
  2. Write down the **exact question** asked at each step.
  3. List the **Field Name** and **Data Type** for each question.
  4. Circle the **Master Status** values.

---

## 12. Forward Connection Map: The 3-Day Bridge

```
┌──────────────────────────────────────┐
│  YESTERDAY (DAY 10)                  │
│  Records and Tables: Many Cases      │
│  Core: Rows = cases; Columns = slots │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│  TODAY (DAY 11)                      │
│  Design Data from the Process        │
│  Core: Process Questions ➔ Fields    │
│  Types, Status & Unique ID           │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│  TOMORROW (DAY 12)                   │
│  Turn Process & Data into Screens    │
│  Core: Fields become UI Controls     │
│  Cards, Inputs, Displays & Layouts   │
└──────────────────────────────────────┘
```

*End of Lesson Plan • Power Apps Foundation Day 11*

