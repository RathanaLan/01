# 🎓 Day 8 Instructional Master Plan: Process, Workflow, Status & Decision
## 📚 Phase 3: Business Thinking • Microsoft Power Apps for Absolute Zero Beginners

> **Instructional Architect:** Microsoft Power Apps Master Trainer & Curriculum Architect  
> **Course Architecture:** Connected 27-Day Curriculum (From Zero to Citizen Developer)  
> **Central Mental Model:** `REAL PROBLEM ➔ PROCESS ➔ DATA ➔ UI/SCREEN ➔ LOGIC/DECISION ➔ ACTION ➔ STORAGE ➔ FEEDBACK ➔ TEST`  
> **Day 8 Connection Chain:** `Start ➔ Steps ➔ Status ➔ Decision ➔ Finish`  
> **Core Meaning:** A workflow connects actions and decisions across people and states.  
> **Prior Connection:** Day 7 diagnosed the real problem, desired result, people, information, and rules.  
> **Forward Bridge:** Next (Day 9): Arranging the workflow into relational data storage tables and screens.  
> **Session Duration:** Exactly 90 Minutes (00:00 – 90:00)  
> **Target Audience:** Absolute zero beginners (factory line operators, maintenance technicians, inventory clerks, shift supervisors). Zero prior programming, database, or UI design experience.

---

## 🗺️ Master Curriculum Arc & Connection Map

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                        27-DAY MASTER MENTAL MODEL FOR CITIZEN DEVELOPERS                               │
│                                                                                                        │
│  [1. REAL PROBLEM]  ➔  [2. PROCESS / SEQUENCE]  ➔  [3. DATA & TYPES]  ➔  [4. CONDITIONS (T/F)]         │
│                                                                               │                        │
│                                                                               ▼                        │
│                                                                    [5. DECISIONS: SINGLE IF]           │
│                                                                               │                        │
│                                                                               ▼                        │
│                                                                    [6. COMBINED GATES: AND/OR/NOT]     │
│                                                                               │                        │
│                                                                               ▼                        │
│  [7. REAL PROBLEM ➔ APP OPPORTUNITY] ➔ [8. PROCESS, WORKFLOW, STATUS & DECISION] (TODAY!)              │
│                                                                               │                        │
│                                                                               ▼                        │
│  [9. DATA STORAGE & TABLES] ➔ [10. FEEDBACK & ALERTS] ➔ [11. TESTING & DEPLOYMENT] ➔ [Days 12–27]     │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 1. Four Measurable Learning Objectives (Bloom's Taxonomy)

By the end of this 90-minute session, the absolute beginner learner will independently demonstrate:

1. **Objective 1 (Workflow Deconstruction - Bloom Level 4):**  
   Break down an unstructured workplace task into the 5 universal building blocks of every workflow: **Trigger (Start)**, **Sequential Steps (Actions)**, **Current State (Status)**, **Decision Gate (Condition)**, and **Terminal State (Finish)**.
2. **Objective 2 (State Machine & Transition Modeling - Bloom Level 3):**  
   Define discrete, mutually exclusive **Status Values** (e.g., `Submitted`, `Under Review`, `Approved`, `In Repair`, `Closed`, `Rejected`) and establish the exact human actions or conditions required to transition between them.
3. **Objective 3 (Logic Gate & UI Interlock Integration - Bloom Level 3):**  
   Formulate plain-English rules and beginner-friendly Power Fx expressions connecting the current **Status** to user permissions and button behaviors (e.g., locking an edit form when status is `Closed`, or revealing an approval button only when status is `Submitted`).
4. **Objective 4 (End-to-End Process Blueprint Formulation - Bloom Level 5):**  
   Author a complete 1-page *Workplace Process & State Transition Matrix* for the Apex Plastics Tooling Die Maintenance workflow, specifying actors, actions, inputs, outputs, and status updates at every stage.

---

## ⏱️ 2. The 90-Minute Spiral Learning Agenda

| Segment | Timestamp | Duration | Pedagogical Phase | Key Activities & Milestones |
| :---: | :---: | :---: | :--- | :--- |
| **Part 1** | **00:00 – 10:00** | 10 min | **RECALL & CONNECT** | • Course branding & Day 8 orientation.<br>• 5-min concept map recap reconnecting Days 1–7 to Day 8.<br>• 3 prerequisite retrieval questions with oral answers.<br>• Announcement of today's 4 Bloom learning objectives. |
| **Part 2** | **10:00 – 25:00** | 15 min | **DISCOVER (THE WHY)** | • The $45,000 "Ghost Work Order" Catastrophe at Apex Plastics.<br>• Plain-language concept bridge: What is a workflow? What is a status?<br>• Everyday physical analogy: The Food Delivery Order Tracker. |
| **Part 3** | **25:00 – 45:00** | 20 min | **DEEP DIVE THEORY** | • Visual cause-and-effect workflow diagram (Start ➔ Steps ➔ Status ➔ Decision ➔ Finish).<br>• The State Machine concept: Why status cannot jump backward or skip steps.<br>• Power Fx Interlock Grammar: Connecting Status to `Visible` and `DisplayMode`. |
| **Part 4** | **45:00 – 60:00** | 15 min | **DEMONSTRATE & LAB** | • **Minute 45:00:** Mid-session pulse check, posture reset & hydration.<br>• Trainer live demonstration of the Interactive Process Workbench.<br>• Stepping through 5 live workflow states with dynamic UI reaction. |
| **Part 5** | **60:00 – 75:00** | 15 min | **GUIDED PRACTICE** | • 6-Scenario Workflow & Status Transition Simulator.<br>• Class guided analysis: Identifying valid vs illegal state jumps.<br>• 4 critical beginner misconceptions & trainer corrections. |
| **Part 6** | **75:00 – 90:00** | 15 min | **ASSESS & BRIDGE** | • 5-Question Evaluative Knowledge Check quiz with instant explanations.<br>• Capstone Independent Challenge: Tooling Die Maintenance Matrix.<br>• Collapsible benchmark solution reveal & 4-level rubric.<br>• Forward bridge to Day 9 (Relational Data & Tables) & 15-min homework. |

---

## 🧠 3. Prerequisite Retrieval & Concept Map Recap (00:00 – 10:00)

### 3.1 The 5-Minute Spiral Concept Map
* **Day 1 (The Goal):** Apps exist to solve real problems and deliver specific outcomes.
* **Day 2 (The Order):** Instructions must execute in a precise sequence to avoid chaos.
* **Day 3 (The Memory):** Apps store typed values (Text, Numbers, Dates, Yes/No, Choices).
* **Day 4 (The Question):** Conditions compare data values to produce `True` or `False`.
* **Day 5 (The Fork):** `If()` evaluates that `True`/`False` result to choose Action A or Action B.
* **Day 6 (The Guard):** `And()`, `Or()`, `Not()` combine multiple conditions into realistic business safety gates.
* **Day 7 (The Diagnosis):** The 5-Part Opportunity Framework (`Problem ➔ Result ➔ People ➔ Information ➔ Rules`) diagnosed what needs to change.
* **TODAY (Day 8):** How do all these pieces move over time? **A WORKFLOW.** We connect the people, data, decisions, and actions into a structured journey where the app tracks the **CURRENT STATUS** from start to finish!

### 3.2 Three Prerequisite Retrieval Questions
1. **Question 1 (from Day 7):** *What are the five pillars of an App Opportunity?*  
   * **Answer:** Current Problem, Desired Result, People (Roles), Information (Data Fields), and Rules (Logic Decisions).
2. **Question 2 (from Days 5 & 6):** *What decides which path a business process follows at a fork in the road?*  
   * **Answer:** A **Condition Gate**. It tests stored data against a business rule (e.g., `RepairCost > 1000`) and yields `True` or `False`, directing the workflow down the approval path or the fast-track path.
3. **Question 3 (from Day 3):** *What kind of data type should a field like "Status" be in an app, and why?*  
   * **Answer:** A **Choice** (or fixed Text set). It cannot be free-form typing because the app's logic rules need exact, predictable words (like `"New"`, `"In Progress"`, `"Closed"`) to know what screen to show and which buttons to unlock.

---

## 💥 4. Today's "Why This Exists" Problem (10:00 – 25:00)

### 4.1 The $45,000 "Ghost Work Order" Catastrophe at Apex Plastics
* **The Facility:** Apex Plastics Injection Molding Plant (Line 4).
* **The Incident:** On Tuesday afternoon, Mold Die #2 suffered a micro-fracture during a high-speed production run.
* **What Happened Without a Workflow System:**
  1. Operator Sothea wrote "Die #2 cracked" on a physical slip of paper and left it on the maintenance bench at 2:15 PM.
  2. Day-shift technician Dave walked past at 2:45 PM, picked up the die, and took it to the CNC machine shop to weld and re-polish it. He did not tell anyone because he was "just doing the job."
  3. At 3:30 PM, the night-shift supervisor, Mara, arrived. Line 4 was halted. She searched the mold rack—Die #2 was missing. She checked the maintenance clipboard—there was no update. She called Dave, but his phone was off.
  4. Believing the mold was cracked beyond repair and lost, Mara invoked the emergency downtime protocol: she expedited an emergency replacement tooling mold from Stuttgart, Germany for **$45,000**, with $6,000 priority air freight, and shut down Line 4 for 24 hours ($18,000 in lost automotive parts delivery).
  5. The next morning at 7:00 AM, Dave proudly walked out of the machine shop with Die #2 perfectly repaired!
* **The Root Cause:**  
  The work was being done, but **the state of the work was invisible**. The process had no **Status**, no **Handoff Tracking**, and no **Single Source of Truth**. Two people took contradictory actions because neither knew what state the request was in.

### 4.2 Everyday Physical Analogy: The Food Delivery Order Tracker
When you order food on an app (like Grab, DoorDash, or Uber Eats), why does the screen have a step-by-step progress tracker?
* `Order Placed ➔ Restaurant Preparing ➔ Driver Picked Up ➔ Out for Delivery ➔ Delivered`
* **Why this matters to a beginner:**
  1. **Visibility:** You never have to call the restaurant to ask, "Did you see my order?" The status tells you who has the ball.
  2. **Rule Enforcement:** You cannot click "Cancel Order" after the status becomes `Out for Delivery`—the app changes what you are allowed to do based on the status!
  3. **Handoffs:** The restaurant prepares the food; only when they hit `Ready` does the driver get the dispatch alert. One person's finish is the next person's start.

---

## 🔬 5. Deep-Dive Theory: The 5 Elements of Every Workflow (25:00 – 45:00)

### 5.1 The 5-Element Workflow Anatomy

$$\text{Trigger (Start)} \longrightarrow \text{Steps (Actions)} \longrightarrow \text{Status (State)} \longrightarrow \text{Decision Gate} \longrightarrow \text{Terminal State (Finish)}$$

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ 1. TRIGGER   │ ──> │ 2. ACTION    │ ──> │ 3. STATUS    │ ──> │ 4. DECISION  │ ──> [5. FINISH]
│ Operator     │     │ Submit Form  │     │ Changes to   │     │ Cost > $1000?│     Closed &
│ Sees Defect  │     │ with Details │     │ "Submitted"  │     │ Diamond Fork │     Archived
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

1. **Trigger (Start):** The real-world event that kicks off the process (e.g., machine breaks, inventory drops below minimum, employee requests leave).
2. **Sequential Steps (Actions):** Concrete tasks performed by specific people (e.g., Operator logs ticket, Supervisor reviews, Technician repairs, QC tests).
3. **Current State (Status):** The single label that describes where the request is right now in its lifecycle (e.g., `Draft`, `Submitted`, `Approved`, `In Progress`, `Under Inspection`, `Closed`).
4. **Decision Gate (Fork):** A question evaluated by business rules (`If`) that splits the process path (e.g., Is cost > $1,000? Is it a safety hazard? Did the QC test pass?).
5. **Terminal State (Finish):** The final resting state of the workflow where no further work occurs (e.g., `Completed`, `Rejected`, `Cancelled`).

### 5.2 The Concept of a State Machine (Why Status Cannot "Jump")
A workflow is not a random pinball machine. It is a **State Machine**:
* A record can only be in **one status at a time**.
* Transitions between statuses require a **valid trigger** and **authorized role**:
  * `Submitted ➔ Approved` (Requires: Supervisor click on Approve button).
  * `Approved ➔ In Progress` (Requires: Assigned Technician click on Start Repair).
  * `In Progress ➔ Under Inspection` (Requires: Technician marks work done).
  * `Under Inspection ➔ Closed` (Requires: QC Inspector passes the test).
* **Illegal Jumps:** An operator cannot jump a ticket from `Submitted ➔ Closed`. A technician cannot jump from `Submitted ➔ In Progress` without supervisor approval!

### 5.3 Connecting Status to Power Apps UI & Logic (Power Fx Interlocks)

In Power Apps, the **Status** field is the master key that controls the user interface:

#### Pattern 1: Form Editing Interlock (DisplayMode)
* **Business Requirement:** Once a maintenance ticket is `Closed`, nobody should be able to alter the problem description or repair notes.
* **Plain-English Rule:** If the current record's Status is "Closed", lock the form to View-only; otherwise allow Editing.
* **Power Fx:**
  ```powerfx
  frmMaintenance.DisplayMode = If(Status = "Closed", DisplayMode.View, DisplayMode.Edit)
  ```

#### Pattern 2: Role & Status Button Visibility (Visible)
* **Business Requirement:** Only show the "Approve Request" button to Supervisors, and only when the request is waiting in "Submitted" status.
* **Plain-English Rule:** Show the button only if Status equals "Submitted" AND the user role equals "Supervisor".
* **Power Fx:**
  ```powerfx
  btnApprove.Visible = (Status = "Submitted") && (UserRole = "Supervisor")
  ```

#### Pattern 3: Visual State Badging (Fill / Color)
* **Business Requirement:** Display a bright color badge reflecting the urgency and stage of work.
* **Power Fx:**
  ```powerfx
  lblStatusBadge.Fill = Switch(
      Status,
      "Submitted", Color.Orange,
      "In Progress", Color.DodgerBlue,
      "Closed", Color.Green,
      "Rejected", Color.Crimson,
      Color.Gray
  )
  ```

---

## 🛠️ 6. Trainer Demonstration & Guided Practice (45:00 – 75:00)

### 6.1 Minute 45:00 Mid-Session Pulse Check
* Stand up, stretch shoulders and wrists.
* Hydration check.
* Trainer check-in: *"Who can tell me the single biggest danger of not having a visible status on work in progress?"* (Target: Duplicated work, lost time, no accountability).

### 6.2 Trainer Live Demonstration (The Process Navigator)
The trainer opens the interactive **Slide 12: Process Status Navigator**:
1. Demonstrates clicking through the 5 lifecycle states of Apex Tooling Die #2:
   * State 1: `Draft` (Operator editing)
   * State 2: `Submitted` (Awaiting Supervisor triage)
   * State 3: `Approved / Assigned` (Assigned to Dave)
   * State 4: `In Progress` (Dave repairing in CNC shop)
   * State 5: `Closed` (QC tested and returned to rack)
2. Shows what happens to the on-screen buttons at each stage:
   * On `Draft`: Submit is active; Approve is hidden.
   * On `Submitted`: Approve and Reject buttons appear for Supervisor.
   * On `Closed`: All edit inputs lock into read-only mode; status badge turns radiant green.

### 6.3 Slide 18: 6-Scenario Workflow Simulator
Learners analyze 6 real-world scenarios and determine whether a proposed status transition is **VALID** or **ILLEGAL**:
1. *Scenario 1:* Operator creates new ticket and clicks "Mark Closed". ➔ **ILLEGAL** (Must be approved and repaired first).
2. *Scenario 2:* Supervisor reviews "Submitted" ticket and clicks "Approve". ➔ **VALID** (Authorized role and proper sequence).
3. *Scenario 3:* Technician starts repair on a ticket with status "Rejected". ➔ **ILLEGAL** (Cannot work on rejected requests).
4. *Scenario 4:* Technician finishes welding and updates status from "In Progress" to "Under Inspection". ➔ **VALID** (Proper handoff to QC).
5. *Scenario 5:* QC inspector finds fault and transitions ticket from "Under Inspection" back to "In Progress" with defect notes. ➔ **VALID** (Rework loop).
6. *Scenario 6:* Night-shift supervisor bypasses "In Progress" and sets status to "Closed" while machine is still dismantled. ➔ **ILLEGAL** (Violates safety interlock).

---

## ⚠️ 7. Four Critical Beginner Misconceptions & Corrections

| # | Plausible Wrong Mental Model | Why It Fails in Power Apps | Trainer Correction & Real Mental Model |
| :-: | :--- | :--- | :--- |
| **1** | *"A workflow is just an artistic flowchart you draw in Visio that doesn't affect the code."* | The app doesn't know what you drew on paper unless you build states into your data tables. | Every box in your workflow becomes a **Screen** or a **Status Value**; every arrow becomes a **Button with Power Fx logic**! |
| **2** | *"Users should be able to type whatever status they want into a text box, like 'Done' or 'Fixed'."* | Text inputs allow typos ("don", "DONE", "finished"). Power Fx formulas comparing `Status = "Closed"` will evaluate to `False` and fail to trigger! | Status must **NEVER** be open text. It must be a controlled **Choice Column** or automated state updated only by app buttons. |
| **3** | *"An approval is just sending an email to a manager."* | An email leaves the data in the database unchanged. If the manager replies by email, the app still thinks the ticket is pending! | An approval is an **App Decision Gate**: clicking "Approve" writes `Status = "Approved"` to the database, unlocking downstream technician screens. |
| **4** | *"Once a workflow reaches the end, all past data should be deleted to save space."* | Factory audits, compliance, and preventive maintenance require full historical traceability. | Completed workflows transition to a **Terminal State** (`Closed` or `Archived`). The record stays in storage permanently with `DisplayMode.View`. |

---

## 📝 8. Knowledge-Check Questions & Rationale Cards (75:00 – 82:00)

1. **Question 1 (Core Purpose):** *What is the primary function of a "Status" field in a business app?*  
   * **Correct Answer:** It acts as the single source of truth describing where the record is in its lifecycle, controlling who can see it and what actions can be taken next.
   * *Rationale:* Without a status, an app cannot enforce sequence, handoffs, or permissions.
2. **Question 2 (Why / What Happens If):** *What happens if an app allows an operator to change a work order directly from "Submitted" to "Closed" without technician or supervisor involvement?*  
   * **Correct Answer:** The business process breaks down: work is marked complete without being verified or physically performed, creating safety hazards and inventory discrepancies.
   * *Rationale:* Workflows exist precisely to enforce accountability between handoffs.
3. **Question 3 (Decision Mechanics):** *In a visual workflow diagram, what does a diamond symbol represent?*  
   * **Correct Answer:** A **Decision Gate** where a condition tests data (e.g. `Cost > $1,000`) and splits the flow into two or more distinct paths based on `True` or `False`.
   * *Rationale:* The diamond is where business rules evaluate stored data to route work.
4. **Question 4 (Why / What Happens If):** *Why should the "Edit" capability of a form be locked (`DisplayMode.View`) when a record reaches the "Closed" status?*  
   * **Correct Answer:** To prevent historical records from being tampered with or accidentally modified after quality verification and sign-off.
   * *Rationale:* Immutability after completion protects regulatory compliance and audit trails.
5. **Question 5 (Power Fx Connection):** *A button has the formula: `btnStartWork.Visible = (Status = "Approved") && (AssignedTech = User().Email)`. When will this button appear on screen?*  
   * **Correct Answer:** Only when the request has been approved AND the person currently looking at the screen is the specific technician assigned to the job.
   * *Rationale:* This combines Day 4 conditions, Day 6 `AND` gates, and Day 8 status-driven UI interlocks.

---

## 🏆 9. Capstone Independent Challenge & 4-Level Evaluation Rubric (82:00 – 88:00)

### The Challenge: Apex Plastics Tooling Die Maintenance Workflow Matrix
Learners must complete the 5-stage workflow specification for the repair of cracked Tooling Die #2:

| Stage # | Stage Name | Actor (Who) | Action / Task | Data Input / Output | Next Status Value | Condition / Decision Gate |
| :-: | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **Initiation** | Machine Operator | Report cracked mold | Machine #, Die #, Defect Photo | `Submitted` | None (Direct submission) |
| **2** | **Triage & Review** | Shift Supervisor | Review safety & cost | Priority, Estimated Downtime | `Approved` OR `Rejected` | `If(EstCost > $2,000 ➔ Plant Mgr, Supervisor)` |
| **3** | **Assignment** | Maintenance Lead | Assign specialist tech | Tech Name, Scheduled Start | `Assigned` | None |
| **4** | **Execution** | Die Technician | CNC machining / welding | Hours Spent, Parts Used, Notes | `Under Inspection` | Technician clicks "Complete Repair" |
| **5** | **Quality Sign-off** | QC Inspector | Mold dimensional test | Tolerance Test (Pass/Fail) | `Closed` OR `Rework Needed` | `If(TolerancePass = True ➔ "Closed", "In Progress")` |

### 4-Level Evaluation Rubric

| Level | Criteria | Observable Performance |
| :---: | :--- | :--- |
| **Mastery (Level 4)** | Flawless Architecture | All 5 stages identified with mutually exclusive statuses; clear decision diamonds; correct roles mapped; explicit Power Fx interlocks formulated. |
| **Proficient (Level 3)** | Solid Understanding | 5 stages mapped; status values clear; minor ambiguity in role assignment or decision conditions. |
| **Developing (Level 2)** | Basic Grasp | Identifies steps but treats status as informal text; allows illegal skips or lacks decision gates. |
| **Novice (Level 1)** | Unstructured | Cannot distinguish a sequential workflow from a static task list; missing roles, status states, and decision rules. |

---

## 🌉 10. Connection Map & 15-Minute Homework (88:00 – 90:00)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 THE 3-DAY CONNECTION MAP                               │
│                                                                                        │
│  YESTERDAY (DAY 7)                TODAY (DAY 8)                     TOMORROW (DAY 9)   │
│  Diagnosed the App Opportunity    Modeled the Workflow & Status     Relational Storage │
│  • Current Problem                • Start ➔ Steps ➔ Finish          • Dataverse Tables │
│  • Desired Result                 • Status States & Jumps           • Foreign Keys     │
│  • People (Roles)                 • Decision Gates (Diamonds)       • Lookup Columns   │
│  • Information (Fields)           • UI Interlocks (`DisplayMode`)   • 1-to-Many Links  │
│  • Rules (Logic)                  • Hand-offs Across Roles          • Master-Detail    │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 15-Minute Homework Assignment
* **Task:** Think of one approval process in your current workplace (e.g., Vacation request, PPE replacement, Scrap part sign-off, Overtime authorization).
* **Write down on 1 sheet of paper:**
  1. What is the **Trigger** (Start)?
  2. What are the 4 or 5 **Status values** from beginning to end?
  3. What is one **Decision Gate** where the path splits based on a condition?
  4. What condition locks the request into **View-only mode**?

---
*End of Day 8 Instructional Master Plan • Microsoft Power Apps Citizen Developer Series*

