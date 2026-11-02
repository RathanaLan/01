# 🎓 Day 9 Instructional Master Plan: Model a Complete Business Flow
## 📚 Phase 3: Business Thinking • Microsoft Power Apps for Absolute Zero Beginners

> **Instructional Architect:** Microsoft Power Apps Master Trainer & Curriculum Architect  
> **Course Architecture:** Connected 27-Day Curriculum (From Zero to Citizen Developer)  
> **Central Mental Model:** `REAL PROBLEM ➔ PROCESS ➔ DATA ➔ UI/SCREEN ➔ LOGIC/DECISION ➔ ACTION ➔ STORAGE ➔ FEEDBACK ➔ TEST`  
> **Day 9 Connection Chain:** `Problem ➔ Request ➔ Review ➔ Decision ➔ Work ➔ Complete`  
> **Core Meaning:** Connect process steps, statuses, decisions, and owners into one cohesive flow.  
> **Prior Connection:** Day 8 deconstructed workflow parts (Trigger, Steps, Status, Decision, Finish).  
> **Forward Bridge:** Next (Day 10): Identify what data must be captured and stored at each step of the flow.  
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
│  [7. REAL PROBLEM ➔ APP OPPORTUNITY] ➔ [8. WORKFLOW & STATUS] ➔ [9. COMPLETE BUSINESS FLOW] (TODAY!)  │
│                                                                               │                        │
│                                                                               ▼                        │
│  [10. DATA STORAGE AT EACH STEP] ➔ [11. FEEDBACK & ALERTS] ➔ [12. TESTING & AUDIT] ➔ [Days 13–27]     │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 1. Four Measurable Learning Objectives (Bloom's Taxonomy)

By the end of this 90-minute session, the absolute beginner learner will independently demonstrate:

1. **Objective 1 (Flow Deconstruction - Bloom Level 4):**  
   Map an unstructured workplace operation into the **6 Universal Stages of a Complete Business Flow**: `Problem` ➔ `Request` ➔ `Review` ➔ `Decision` ➔ `Work` ➔ `Complete`.
2. **Objective 2 (Swimlane & Ownership Mapping - Bloom Level 3):**  
   Assign clear, non-overlapping **Actors/Owners** (Requestor, Supervisor, Technician, QC Inspector) to each stage to prevent "dropped batons" in operational handoffs.
3. **Objective 3 (Branching & Loop Modeling - Bloom Level 4):**  
   Incorporate both the **Happy Path** and **Alternate Paths** (Rejection, More Info Needed, QC Rework Loop, Emergency Escalation) with explicit entry conditions.
4. **Objective 4 (Power Fx UI Governance Formulation - Bloom Level 5):**  
   Formulate plain-English rules and beginner-friendly Power Fx expressions that lock, hide, or reveal user interface elements based on the request's current stage and the logged-in user's role.

---

## ⏱️ 2. The 90-Minute Spiral Learning Agenda

| Segment | Timestamp | Duration | Pedagogical Phase | Key Activities & Milestones |
| :---: | :---: | :---: | :--- | :--- |
| **Part 1** | **00:00 – 10:00** | 10 min | **RECALL & CONNECT** | • Day 9 welcome, orientation, and 27-day curriculum alignment.<br>• 5-min concept map recap reconnecting Days 1–8 to Day 9.<br>• 3 prerequisite retrieval questions with oral answers.<br>• Announcement of today's 4 Bloom learning objectives. |
| **Part 2** | **10:00 – 25:00** | 15 min | **DISCOVER (THE WHY)** | • The $72,000 "Dropped Baton" Hand-off Disaster at Apex Plastics.<br>• Plain-language concept bridge: What is an end-to-end business flow?<br>• Everyday physical analogy: The Hospital Emergency Room Patient Journey. |
| **Part 3** | **25:00 – 45:00** | 20 min | **DEEP DIVE THEORY** | • The 6 Universal Stages: Problem ➔ Request ➔ Review ➔ Decision ➔ Work ➔ Complete.<br>• Swimlanes & Ownership: Who holds the baton at every millisecond?<br>• Branching Paths: Happy path, Rejection exit, and the QC Rework Loop.<br>• Power Fx UI Governance: Connecting stages to `DisplayMode` and `Visible`. |
| **Part 4** | **45:00 – 60:00** | 15 min | **DEMONSTRATE & LAB** | • **Minute 45:00:** Mid-session pulse check, posture reset & hydration.<br>• Trainer live demonstration of the Interactive End-to-End Flow Orchestrator.<br>• Stepping a work order through 6 stages, 4 swimlanes, and conditional forks. |
| **Part 5** | **60:00 – 75:00** | 15 min | **GUIDED PRACTICE** | • 6-Scenario Flow Diagnostics Simulator.<br>• Class guided analysis: Identifying where the process breaks or stalls.<br>• 4 critical beginner misconceptions & trainer corrections. |
| **Part 6** | **75:00 – 90:00** | 15 min | **ASSESS & BRIDGE** | • 5-Question Evaluative Knowledge Check quiz with instant explanations.<br>• Capstone Independent Challenge: Tooling Die Complete Flow Blueprint.<br>• Collapsible benchmark solution reveal & 4-level rubric.<br>• Forward bridge to Day 10 (Data Storage at Each Step) & 15-min homework. |

---

## 🧠 3. Prerequisite Retrieval & Concept Map Recap (00:00 – 10:00)

### 3.1 The 5-Minute Spiral Concept Map
* **Day 1 (The Goal):** Every app begins with a real human problem and a desired outcome.
* **Day 2 (The Order):** Instructions and steps must follow a strict sequential order.
* **Day 3 (The Memory):** Apps store data in specific types (Text, Number, Date, Choice).
* **Day 4 (The Question):** Conditions compare data values to produce `True` or `False`.
* **Day 5 (The Fork):** `If()` evaluates that `True`/`False` result to choose Action A or Action B.
* **Day 6 (The Guard):** `And()`, `Or()`, `Not()` combine conditions into robust business rules.
* **Day 7 (The Diagnosis):** The 5-Part Opportunity Framework (`Problem ➔ Result ➔ People ➔ Information ➔ Rules`) framed what needs to be built.
* **Day 8 (The Parts):** We learned the 5 building blocks of a workflow: `Trigger`, `Steps`, `Status`, `Decision`, `Finish`.
* **TODAY (Day 9):** Yesterday we saw the pieces. Today we string them together into a **COMPLETE, LIVING BUSINESS FLOW**! We map the entire journey from the moment an issue occurs on the factory floor, through review, decision, execution, quality check, to final closure—ensuring **every handoff has an owner and every decision has a clear path**!

### 3.2 Three Prerequisite Retrieval Questions
1. **Question 1 (from Day 8):** *What is the difference between a simple to-do list and a business workflow?*  
   * **Answer:** A to-do list is an unstructured list of tasks for one person. A **workflow** connects sequential steps, distinct status states, conditional decisions, and role-based handoffs across multiple people from trigger to finish.
2. **Question 2 (from Day 8):** *Why must a workflow's Status be mutually exclusive (meaning only ONE status can be active at a time)?*  
   * **Answer:** Because an app cannot decide what screen to display, what buttons to enable, or who is currently responsible if a record claims to be both "Submitted" and "In Progress" at the same time. One truth at a time prevents chaotic race conditions.
3. **Question 3 (from Day 5 & 6):** *When a business flow reaches a decision diamond, what decides which path the request takes?*  
   * **Answer:** A **Condition Gate**. It tests data values against business logic rules (e.g., `EstCost > 1000` or `Priority = "Urgent"`). If `True`, it routes to one branch; if `False`, it routes to the alternate branch.

---

## 💥 4. Today's "Why This Exists" Problem (10:00 – 25:00)

### 4.1 The $72,000 "Dropped Baton" Hand-off Disaster at Apex Plastics
* **The Facility:** Apex Plastics Automotive Trim Line (Injection Press #6).
* **The Incident:** On a Thursday morning, the robotic demolding arm on Press #6 began jittering due to a faulty servo motor bearing.
* **The Breakdown of Isolated Steps Without an End-to-End Flow:**
  1. **Step 1 (Operator Request):** Operator Bopha filled out a paper "Maintenance Work Request" at 8:15 AM and dropped it in the Maintenance In-box.
  2. **Step 2 (Supervisor Review):** Shift Supervisor Visal saw it at 9:00 AM, signed his initial on the paper, and placed it on the "Approved" clip tray.
  3. **Step 3 (The Dropped Baton):** Visal assumed Maintenance would check the tray. Maintenance assumed Visal would notify the lead engineer. The lead engineer assumed purchasing was ordering the servo motor.
  4. **The Void:** For **48 hours**, the paper sat quietly between the trays. Nobody knew whose turn it was to act because the process was a collection of disconnected tasks rather than a connected flow with clear baton handoffs.
  5. **The Catastrophe:** Over the weekend, the jittering arm seized completely mid-stroke. The tooling mold cracked ($38,000 replacement), automotive bumper deliveries were delayed, incurring customer contract penalty fees of $34,000. Total avoidable loss: **$72,000**!
* **The Trainer's Diagnostic:**
  > *"Notice what happened here: each person did their small task correctly, but the overall flow failed! Why? Because there was no **connected flow**, no **active status**, and no **visible owner of the baton** at the moment of handoff. When no one knows who owns the next step, work dies in the silence between people."*

---

## 🗣️ 5. Plain-Language Concept Before Technical Vocabulary

* **What is a "Business Flow"?**
  A business flow is like a **baton pass in a 4x100 meter relay race**.
  * Runner 1 (Operator) starts with the baton.
  * She runs her leg (creates the request) and passes the baton into the hand of Runner 2 (Supervisor).
  * At any given second of the race, **exactly one person has the baton**!
  * If Runner 1 lets go before Runner 2 grabs it, the baton drops to the ground and the race is lost.
  * In an app, a **Business Flow** guarantees that every work item has an active owner, a clear status, and automated rules that pass the baton immediately to the next person!

---

## 🏥 6. Everyday Physical Analogy: The Emergency Room Patient Journey

To make this crystal clear for absolute beginners, think of visiting a hospital emergency room:

1. **Problem:** You trip and hurt your wrist. It is swollen and painful.
2. **Request (Reception / Triage):** You walk in and speak to the triage nurse. She takes your temperature, records your symptoms, and prints a triage wristband.
3. **Review & Decision Gate:** The triage nurse evaluates your vital signs.
   * *If life-threatening:* Fast-track immediately into Trauma Room A.
   * *If non-critical:* Move to Waiting Area B for standard medical examination.
4. **Work (Doctor & X-Ray):** The doctor examines your wrist and orders an X-ray. The technician takes the scan. The radiologist reviews the image.
5. **Quality Gate (Diagnosis):** Is the bone fractured?
   * *If Fractured = True:* Doctor applies a plaster cast.
   * *If Fractured = False:* Apply elastic bandage and ice.
6. **Complete (Discharge & Prescription):** Pharmacist dispenses pain medicine, receptionist closes your hospital visit record, and you are discharged.

> **Key Pedagogical Takeaway:**  
> A hospital never treats patient care as random isolated events. The patient moves through a **structured, continuous flow** where each department hands off responsibility with zero ambiguity!

---

## 🏭 7. Manufacturing / DX Workplace Example: Equipment Repair Flow

In modern digital manufacturing (Industry 4.0), every maintenance event follows this exact 6-stage lifecycle:

```
[1. PROBLEM]      Equipment vibration anomaly detected by sensor or line operator.
      │
      ▼
[2. REQUEST]      Operator submits digital ticket with Machine ID, Severity, Defect Photo.
      │
      ▼
[3. REVIEW]       Supervisor triages urgency, production schedule impact, and estimated cost.
      │
      ▼
[4. DECISION]     Decision Diamond:
                  ├─ If Cost > $2,000 ➔ Route to Plant Manager for capital sign-off.
                  ├─ If Invalid / Duplicate ➔ Reject with mandatory explanation.
                  └─ If Valid & In Budget ➔ Approve and assign to Mechanical Technician.
      │
      ▼
[5. WORK]         Technician inspects, replaces faulty part, logs hours and part numbers.
      │
      ▼
[6. COMPLETE]     QC Inspector tests machine tolerance:
                  ├─ If Tolerance Pass = False ➔ Rework Loop back to Technician.
                  └─ If Tolerance Pass = True ➔ Lock record as "Closed", update audit log.
```

---

## 📊 8. Visual Cause-and-Effect Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 THE 6 UNIVERSAL STAGES OF A COMPLETE BUSINESS FLOW                                     │
├─────────────────┬─────────────────┬───────────────────┬───────────────────┬──────────────────┬─────────────────────────┤
│   STAGE 1       │   STAGE 2       │    STAGE 3        │    STAGE 4        │    STAGE 5       │    STAGE 6              │
│   PROBLEM       │   REQUEST       │    REVIEW         │    DECISION       │    WORK          │    COMPLETE             │
├─────────────────┼─────────────────┼───────────────────┼───────────────────┼──────────────────┼─────────────────────────┤
│ Machine sparks  │ Operator clicks │ Supervisor opens  │ Logic tests cost, │ Technician logs  │ QC tests tolerance;     │
│ or bearing jams │ "New Request";  │ pending list;     │ risk, and parts;  │ parts and labor; │ Supervisor signs off;   │
│ on Line 4.      │ uploads photo.  │ checks schedule.  │ chooses branch.   │ executes repair. │ record is locked.       │
├─────────────────┼─────────────────┼───────────────────┼───────────────────┼──────────────────┼─────────────────────────┤
│ OWNER:          │ OWNER:          │ OWNER:            │ OWNER:            │ OWNER:           │ OWNER:                  │
│ Line Operator   │ Line Operator   │ Shift Supervisor  │ Logic / Manager   │ Assigned Tech    │ QC & Compliance         │
├─────────────────┼─────────────────┼───────────────────┼───────────────────┼──────────────────┼─────────────────────────┤
│ STATUS:         │ STATUS:         │ STATUS:           │ STATUS:           │ STATUS:          │ STATUS:                 │
│ "Draft"         │ "Submitted"     │ "Under Review"    │ "Approved" /      │ "In Repair"      │ "Closed"                │
│                 │                 │                   │ "Rejected"        │                  │                         │
└─────────────────┴─────────────────┴───────────────────┴───────────────────┴──────────────────┴─────────────────────────┘
```

---

## 💻 9. Power Fx Governance: Enforcing the Flow in Power Apps

In a real Power App, a business flow is not just a drawing on a whiteboard; it is **actively enforced by Power Fx logic formulas**.

### Rule 1: Hiding Actions That Belong to Other Stages
* **Business Requirement:** The "Start Repair" button should only be visible when the request is officially approved AND the user looking at the screen is the assigned technician.
* **Plain-English Rule:** If Status equals "Approved" AND Current User Email equals Assigned Tech Email, show the button; otherwise hide it.
* **Power Fx Code:**
  ```powerfx
  btnStartRepair.Visible = (Status = "Approved") && (AssignedTech = User().Email)
  ```
* **Explanation:**
  * `Status = "Approved"` asks: Is the work order in the approved stage? Returns `True` or `False`.
  * `AssignedTech = User().Email` asks: Is the currently logged-in user the assigned technician? Returns `True` or `False`.
  * `&&` requires **BOTH** conditions to be `True` before the button appears.

### Rule 2: Locking Forms to Prevent Tampering
* **Business Requirement:** When a request is completed and closed, all input fields must become read-only so nobody can alter historical records.
* **Plain-English Rule:** If Status equals "Closed", set the form display mode to View; otherwise allow editing.
* **Power Fx Code:**
  ```powerfx
  frmWorkOrder.DisplayMode = If(Status = "Closed", DisplayMode.View, DisplayMode.Edit)
  ```
* **Explanation:**
  * `Status = "Closed"` evaluates the condition.
  * If `True`, `DisplayMode.View` locks the form (grayed out, uneditable).
  * If `False`, `DisplayMode.Edit` allows users to fill in data.

---

## 🛠️ 10. Trainer Demonstration Protocol (45:00 – 60:00)

* **Minute 45:00:** Mid-session physical reset. Ask all learners to stand up, roll their shoulders, and take a sip of water.
* **Demonstration Setup:** The trainer projects the **Slide 12: Interactive Decision Workbench**.
* **Step 1 (The Initiation):** Trainer enters `"Press 6 Motor Jitter"` and clicks `Submit Request`.
  * *Observe:* Status jumps from `Draft` to `Submitted`. The Requestor screen locks. The Supervisor pending badge turns flashing amber.
* **Step 2 (The Conditional Decision Gate):**
  * Case A: Set Cost Slider to `$750`. Click `Approve`. Workflow routes directly to `Assigned: Dave`.
  * Case B: Set Cost Slider to `$3,500`. Click `Approve`. Notice the workflow routes to an additional approval stage: `Awaiting Plant Manager Sign-off`!
* **Step 3 (The Rework Loop):**
  * Advance to Execution (`In Repair`). Technician clicks `Complete`.
  * The QC Inspector tests tolerance. Click `Fail Tolerance Test`.
  * *Observe:* Status does **not** close! It loops back to `In Repair` with a red alert banner: `Rework Required: Tolerance Out of Spec`.
* **Step 4 (Terminal Closure):**
  * Technician re-calibrates. QC clicks `Pass Tolerance Test`.
  * Status transitions to `Closed`. All buttons lock. Form shifts to `DisplayMode.View`.

---

## 👥 11. Guided Learner Practice (60:00 – 75:00)

Trainer guides the class through the **Slide 18: Multi-Scenario Flow Simulator** covering 6 realistic operational events:

1. **Scenario 1 (Safety Emergency):** Hydraulic fluid leak near an electrical panel.
   * *Question:* Should this ticket follow the standard 3-day supervisor review flow?
   * *Class Answer:* No! A condition gate `If(Priority = "Critical Safety", BypassReview, NormalReview)` routes immediately to Emergency Maintenance.
2. **Scenario 2 (Budget Threshold Gate):** Tooling replacement quote is $4,800.
   * *Question:* Who must approve this request?
   * *Class Answer:* Condition gate `If(Cost > 2000, "Plant Manager", "Shift Supervisor")`.
3. **Scenario 3 (The Incomplete Request):** Operator forgot to enter the Machine Serial Number.
   * *Question:* What status does the supervisor assign?
   * *Class Answer:* `Needs More Info` (returns baton to Operator without killing the ticket).
4. **Scenario 4 (Technician Re-assignment):** Dave called in sick with the flu mid-repair.
   * *Question:* Can any operator edit the ticket?
   * *Class Answer:* No; only the Maintenance Lead has permission to change `AssignedTech` from Dave to Sarah.
5. **Scenario 5 (QC Rejection):** Machined die tolerance is 0.08mm (threshold is 0.02mm).
   * *Question:* Does the flow terminate as "Rejected"?
   * *Class Answer:* No; it enters a **Rework Loop** (`Status = "Rework Needed"`), keeping the same ticket number for traceability.
6. **Scenario 6 (Customer Delivery Sign-off):** Replacement mold die installed and test-stamped 100 perfect parts.
   * *Question:* What is the final terminal status?
   * *Class Answer:* `Status = "Closed"`.

---

## ⚠️ 12. Four Critical Beginner Misconceptions & Corrections

### Misconception 1: "A business flow only has one straight path from start to finish."
* **Wrong Mental Model:** The learner draws a straight arrow from Operator to Done, ignoring rejections, budget caps, or quality failures.
* **Why it Breaks Apps:** In reality, 30% of requests are rejected, missing info, or fail quality checks. If an app lacks alternate branches, users get stuck and revert to paper or WhatsApp.
* **Trainer Correction:** Every realistic flow has at least **3 paths**: The Happy Path (Approved), The Alternate Path (Needs Info / Rejected), and The Loop (Rework).

### Misconception 2: "Everyone in the company should be able to see every button."
* **Wrong Mental Model:** The learner puts `Submit`, `Approve`, `Start Repair`, and `Close` buttons on one screen with no permissions.
* **Why it Breaks Apps:** An operator might accidentally click "Approve", or a technician might click "Close" before QC inspects the machine.
* **Trainer Correction:** Buttons must be **governed by Role and Status**: `btnApprove.Visible = (UserRole = "Supervisor") && (Status = "Submitted")`.

### Misconception 3: "Status is just a text label that people type in."
* **Wrong Mental Model:** The learner creates a text box where users can type anything like "almost done" or "waiting for boss".
* **Why it Breaks Apps:** Power Fx logic formulas cannot trigger if someone types "almst dun" with a typo.
* **Trainer Correction:** Status is an **engine state** controlled by Choice columns and automated button clicks—never free-form text.

### Misconception 4: "A business flow is the same thing as a company organizational chart."
* **Wrong Mental Model:** The learner thinks a flow diagram shows who reports to whom (CEO ➔ VP ➔ Director).
* **Why it Breaks Apps:** An org chart shows power hierarchy; a **business flow shows the journey of a specific piece of work over time**.
* **Trainer Correction:** A CEO might be the requester for new office equipment, and a purchasing clerk reviews it. The flow tracks the work, not executive titles.

---

## 📝 13. Five-Question Evaluative Knowledge Check (75:00 – 82:00)

1. **Question 1 (Core Concept):** *What are the 6 universal stages of every complete business flow?*  
   * **Answer:** `Problem` ➔ `Request` ➔ `Review` ➔ `Decision` ➔ `Work` ➔ `Complete`.
2. **Question 2 (Why Question):** *WHY does every stage in a business flow require exactly ONE designated owner at any given moment?*  
   * **Answer:** To prevent the "dropped baton" disaster. If multiple people or nobody owns the current stage, each person assumes someone else is acting, causing the request to stall indefinitely.
3. **Question 3 (What Happens If Question):** *WHAT HAPPENS IF a QC inspector rejects a repaired tooling mold, but the developer forgot to build a Rework Loop into the app?*  
   * **Answer:** The request either terminates prematurely as "Rejected" (forcing someone to create a duplicate ticket from scratch and losing all repair history) or it gets marked "Closed" despite being broken, shipping defective parts to customers.
4. **Question 4 (Power Fx Governance):** *Which Power Fx formula ensures that the 'Approve' button is only shown to Supervisors when a ticket is awaiting review?*  
   * **Answer:** `btnApprove.Visible = (UserRole = "Supervisor") && (Status = "Submitted")`.
5. **Question 5 (State Governance):** *Why should an app automatically lock a work order into `DisplayMode.View` once it reaches the "Closed" status?*  
   * **Answer:** To ensure immutability and data integrity. Once work is finalized and signed off, altering costs, hours, or serial numbers violates accounting rules and quality audit standards.

---

## 🏆 14. Capstone Independent Challenge: Tooling Die Maintenance Flow Blueprint (82:00 – 88:00)

### Challenge Specification
Learners must complete the **6-Stage Business Flow Architecture Matrix** for Apex Plastics Tooling Die #4:

| Stage # | Stage Name | Actor / Role | Action / Activity | Status Assigned | Condition / Decision Gate | Power Fx UI Rule |
| :-: | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **Problem** | Line Operator | Spot sensor alert or defect | `Draft` | Machine vibration > 4.5 mm/s | `btnReport.Visible = True` |
| **2** | **Request** | Line Operator | Submit digital repair ticket | `Submitted` | None (Direct submit) | `frmTicket.DisplayMode = Edit` |
| **3** | **Review** | Shift Supervisor | Verify priority & safety | `Under Review` | None | `btnReview.Visible = (Role = "Supervisor")` |
| **4** | **Decision** | Supervisor / Mgr | Evaluate estimated repair cost | `Approved` OR `Rejected` | `If(EstCost > $2000, PlantMgr, Supervisor)` | `btnApprove.DisplayMode = If(IsBlank(Cost), Disabled, Edit)` |
| **5** | **Work** | Tooling Tech | Disassemble, machine, weld | `In Repair` | Tech clicks "Begin Work" | `btnStart.Visible = (Status = "Approved")` |
| **6** | **Complete** | QC Inspector | Stamp test part; audit sign-off | `Closed` OR `Rework Needed` | `If(QC_Pass = True, "Closed", "In Repair")` | `frmTicket.DisplayMode = If(Status = "Closed", View, Edit)` |

### 4-Level Evaluation Rubric

| Level | Performance Benchmark | Description |
| :---: | :--- | :--- |
| **Mastery (Level 4)** | Production Ready | Maps all 6 stages flawlessly; clearly assigns 4 distinct roles; includes both Happy Path and QC Rework loop; writes syntactically valid Power Fx UI interlocks. |
| **Proficient (Level 3)** | Solid Grasp | Maps all 6 stages; correctly identifies actors and status states; minor omission in the alternate rework path or Power Fx argument. |
| **Developing (Level 2)** | Partial Understanding | Treats the flow as an isolated 2-step task; confuses roles; missing decision gates or allows unapproved jumps. |
| **Novice (Level 1)** | Unstructured | Cannot deconstruct an operation into sequential stages; treats status as casual text; no understanding of handoffs or logic governance. |

---

## 🌉 15. The 3-Day Connection Map & Forward Bridge (88:00 – 90:00)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    THE 3-DAY CONNECTION MAP                                     │
│                                                                                                 │
│  YESTERDAY (DAY 8)                  TODAY (DAY 9)                      TOMORROW (DAY 10)        │
│  The 5 Workflow Parts               Model a Complete Business Flow     Data Storage at Each Step│
│  • Trigger (Start)                  • Problem ➔ Request ➔ Review       • Dataverse Tables       │
│  • Steps (Actions)                  • Decision ➔ Work ➔ Complete       • Stage-by-Stage Fields  │
│  • Status States                    • Swimlanes & Ownership            • Required vs Optional   │
│  • Decision Gates                   • Happy Path & Rework Loops        • Audit Logs & Timestamps│
│  • Finish (Terminal)                • Power Fx Role/Status Interlocks  • Relational Data Models │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 15-Minute Homework Assignment
1. Identify **ONE operational flow** in your current workplace (e.g., Tool Calibration, Scrap Sign-off, Forklift Daily Inspection, Material Reorder).
2. On 1 sheet of paper, sketch the **6 Stages**:
   * What is the **Problem**?
   * Who submits the **Request**?
   * Who performs the **Review**?
   * What is the **Decision Gate** (what condition decides yes/no)?
   * Who performs the physical **Work**?
   * Who conducts the **Completion Sign-off**?
3. Bring this sheet to Day 10, where we will determine the exact **Data Fields and Storage Tables** needed to power your flow!

---
*End of Day 9 Instructional Master Plan • Microsoft Power Apps Citizen Developer Series*

