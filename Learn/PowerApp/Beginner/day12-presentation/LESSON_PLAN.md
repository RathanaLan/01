# Power Apps Foundation — Day 12: From Process + Data to App Screens
**Phase:** Phase 5: App Design & User Interface  
**Connection Chain:** User Task ➔ Screen Purpose ➔ Controls (Input / Display / Action) ➔ Data Binding ➔ User Feedback  
**Core Meaning:** Screens are the user-facing steps of the business process. A screen is not a decorative art canvas; it is a dedicated workstation that exposes only the exact data and actions required for one specific human task.  
**Prior Connection:** Days 9–11 (Day 9: 6-stage workflow; Day 10: Table and Record data models; Day 11: 8-field schema, data types, status, and unique ID).  
**Forward Bridge:** Day 13 (Implement the Paper Design in Power Apps Canvas Studio).  
**Target Audience:** Absolute Zero Beginners (Citizen Developers, Plant Technicians, Shift Supervisors, Administrative DX Champions).

---

## 1. Measurable Learning Objectives (Bloom's Taxonomy L2–L5)

By the end of this 90-minute session, the learner will be able to:
1. **Explain (L2 - Understand)** the "Screen as a Workstation" principle, articulating why multi-stage business workflows fail when crammed into a single monolithic screen.
2. **Classify (L3 - Apply)** UI elements into their three functional control families:
   - **Input Controls** (Text input, Dropdown/Combo box, Date picker, Toggle/Checkbox).
   - **Display Controls** (Labels, View cards, HTML/Badges, Images).
   - **Action Controls** (Buttons, Icons, Navigation arrows).
3. **Analyze (L4 - Analyze)** an operational workflow to segment human tasks into the Standard 4-Screen Enterprise Pattern:
   - Browse / Gallery Screen (`scrBrowse`)
   - New Request Intake Screen (`scrNewRequest`)
   - Detail / Inspection Screen (`scrDetail`)
   - Approval / Action Screen (`scrApproval`)
4. **Design & Evaluate (L5 - Create/Evaluate)** a low-fidelity UI wireframe specification matrix and translate user actions into foundational Power Fx screen navigation and feedback formulas (`Navigate`, `Back`, `Notify`, and `ResetForm`).

---

## 2. Timed 90-Minute Agenda

| Time | Duration | Segment | Core Activities |
| :--- | :---: | :--- | :--- |
| **00:00 – 10:00** | 10 min | **Part 1: Recall & Connect** | • Welcome, 27-day spiral map check-in (Phase 5 kickoff).<br>• 5-min concept map reconnecting Day 9 (Process) &amp; Day 11 (Data Schema).<br>• Prerequisite retrieval check (3 questions with interactive reveal). |
| **10:00 – 25:00** | 15 min | **Part 2: Discover (The Why)** | • The $38,000 "1-Screen Dashboard Nightmare" at Apex Plastics.<br>• Plain-language concept: "Screens as Dedicated Workstations".<br>• Everyday Analogy: The Airport Terminal Journey &amp; ATM Cash Machine. |
| **25:00 – 45:00** | 20 min | **Part 3: Deep Dive Theory** | • The 5-Step Task-to-Screen Pipeline (`Task ➔ Screen ➔ Controls ➔ Data ➔ Feedback`).<br>• The 3 Control Families: Input vs. Display vs. Action.<br>• User Feedback &amp; System State (`Notify`, Visual Interlocks).<br>• The Standard 4-Screen Enterprise Pattern. |
| **45:00 – 60:00** | 15 min | **Part 4: Demonstrate & Lab** | • Energy rest & mental stretch (45:00).<br>• Interactive Widget 1: Task-to-Screen Architect &amp; Control Mapper.<br>• Trainer Live Demo: Sketching a clean 3-screen maintenance app live. |
| **60:00 – 75:00** | 15 min | **Part 5: Guided Practice** | • Auditing a broken single-screen warehouse app (finding 4 fatal UX traps).<br>• Interactive Widget 2: 6-Scenario Screen Architecture Simulator.<br>• 4 Dangerous Mental Misconceptions &amp; Trainer Corrections. |
| **75:00 – 90:00** | 15 min | **Part 6: Assess & Bridge** | • Interactive Widget 3: 5-Question Knowledge Check Quiz with rationale.<br>• Capstone Challenge: Wireframing the Apex Plastics Tooling Replacement App.<br>• Benchmark Solution Reveal &amp; 4-Level Evaluation Rubric.<br>• 15-Minute Homework &amp; 3-Day Bridge Map to Day 13. |

---

## 3. Prerequisite Retrieval Practice (Checking Days 9, 10, & 11)

Before translating data to screens, verify that learners possess firm mental anchors:

1. **Question 1 (Day 11 - Process to Data):**
   * *Trainer Prompt:* "How did we decide which columns to create in our database on Day 11?"
   * *Target Beginner Answer:* "We didn't guess! We looked at each step in the business process, found the exact questions people ask, and turned those questions into data fields."

2. **Question 2 (Day 11 - Data Types):**
   * *Trainer Prompt:* "Why did we make `UrgencyLevel` a Choice column instead of a free-text box?"
   * *Target Beginner Answer:* "To prevent typos and inconsistent words ('urgent' vs 'High'). Choice columns restrict users to approved values, allowing Power Apps to sort, filter, and send automated notifications without failing."

3. **Question 3 (Day 9 - Workflow Ownership):**
   * *Trainer Prompt:* "In a 4-step workflow (Report ➔ Review ➔ Work ➔ Complete), do all four people need to do their jobs at the exact same moment on the same screen?"
   * *Target Beginner Answer:* "No! Work happens sequentially. The operator reports first, then the supervisor reviews later, then the technician works. Each person needs to see only what belongs to their step."

---

## 4. The "Why This Exists" Workplace Crisis: Apex Plastics

### The $38,000 "1-Screen Dashboard Nightmare & The Shattered Mold"
* **The Background:** At Apex Plastics, an eager citizen developer wanted to build a "modern Power App" for factory work orders.
* **The Fatal Mistake:** The developer fell victim to the **"One-Screen Fallacy"**:
  - He created a single giant screen and crammed **all 8 fields, 6 dropdowns, 4 text boxes, and 8 action buttons** onto it.
  - Operators, supervisors, maintenance technicians, and QA auditors all shared the exact same cluttered screen.
  - Right next to the blue **"Submit New Issue"** button, the developer placed the green **"Supervisor Final Sign-Off & Release to Production"** button to "save screen space".
* **The Incident (Tuesday, 10:15 AM):**
  - Line 2 Operator Sothea had grease on her safety gloves. She wanted to submit a ticket for a misaligned clamping plate on Press #2.
  - Her finger slipped on the touch screen. Instead of tapping "Submit", she accidentally tapped **"Supervisor Final Sign-Off & Release to Production"** on a completely different open ticket (Press #7)!
  - At the same time, the screen refreshed. Technician Dara entered the workshop. He saw the screen saying "Approved & Released: Die 44B Ready for Press #2".
* **The Catastrophe:**
  - Technician Dara loaded a high-precision $38,000 automotive bumper mold die onto Press #2 (which was actually misaligned).
  - On the first stroke, the misaligned hydraulic ram struck the carbide guide pins at 400 tons of pressure, **completely shattering the $38,000 custom mold die!**
* **The Core Lesson:**
  > *"When you cram every user role and every process step into one screen, you create an operational minefield. A screen is not a junk drawer. If a human does not need to see a button or a field to perform their specific task right now, that button or field must not exist on their screen."*

---

## 5. Plain-Language Concept Before Technical Vocabulary

| Technical Term | Plain-Language Definition | Everyday Physical Analogy |
| :--- | :--- | :--- |
| **Screen (`scr`)** | A dedicated visual room or workstation designed for **one human task**. | The Airport Check-in Kiosk vs. The Security Checkpoint. |
| **Control** | A visual tool on the screen that lets a person **see, give, or trigger** information. | The speedometer, steering wheel, and gas pedal in a car. |
| **Input Control** | A slot where the human **hands data over** to the application. | A coin slot on a vending machine or a pen filling in a blank line. |
| **Display Control** | A sign or meter where the human **reads data** from the application. | The departure board at a train station or a digital clock. |
| **Action Control** | A physical trigger that causes the app to **do work or change rooms**. | The elevator button: press "Floor 3" and the doors close. |
| **User Feedback** | The app speaking back to the human: *"I received your work; here is what happened."* | The green light and "Beep!" when you tap your transit card. |

---

## 6. The 5-Step Task-to-Screen Pipeline

How a professional citizen developer turns an abstract process into physical screens:

```
[USER TASK] ➔ [DEDICATED SCREEN] ➔ [CONTROLS] ➔ [DATA BINDING] ➔ [USER FEEDBACK]
```

### The 4 Universal Screens of Enterprise Apps:

#### Screen 1: The Browse / Dashboard Screen (`scrHome` / `scrBrowse`)
* **User Task:** "I want to see what tickets exist, check their status, and find my work."
* **Screen Purpose:** Read-only overview and navigation portal.
* **Controls Used:**
  - *Display:* Gallery / Card List (`galTickets`), Status Badges (`lblStatus`).
  - *Input:* Search box (`txtSearch`), Status Filter dropdown (`cmbFilterStatus`).
  - *Action:* "New Request" button (`btnNew`), Item Selection Arrow (`icoChevron`).
* **Power Fx Navigation:** `Navigate(scrNewRequest, ScreenTransition.Fade)`

#### Screen 2: The New Request Intake Screen (`scrNewRequest`)
* **User Task:** "I am an operator standing in front of a broken machine; I need to report it quickly."
* **Screen Purpose:** Data entry workstation restricted to Step 1 fields.
* **Controls Used:**
  - *Input:* `cmbMachine` (Dropdown), `txtDescription` (Multi-text), `radUrgency` (Radio buttons).
  - *Display:* Screen title, Field labels.
  - *Action:* `btnSubmit` (Submit), `btnCancel` (Cancel).
* **Power Fx Gating & Feedback:**
  ```powerfx
  btnSubmit.DisplayMode = If(IsBlank(txtDescription.Text), DisplayMode.Disabled, DisplayMode.Edit);
  btnSubmit.OnSelect = SubmitForm(frmRequest); Notify("Ticket submitted successfully!", NotificationType.Success); Navigate(scrHome, ScreenTransition.Fade);
  ```

#### Screen 3: The Supervisor Review & Approval Screen (`scrApproval`)
* **User Task:** "I am the supervisor; I need to review the operator's report, check the cost, and make an approval decision."
* **Screen Purpose:** Decision workstation with read-only incident facts + decision controls.
* **Controls Used:**
  - *Display:* Read-only inspection cards showing Machine, Issue, and Urgency.
  - *Input:* `txtEstimatedCost` (Currency), `txtSupervisorNotes` (Text).
  - *Action:* `btnApprove` (Green), `btnReject` (Red).

#### Screen 4: The Work Order Execution & Closure Screen (`scrWorkOrder`)
* **User Task:** "I am the technician; I fixed the machine and need to log hours and certify safety."
* **Screen Purpose:** Completion and compliance workstation.
* **Controls Used:**
  - *Input:* `txtLaborHours` (Decimal), `chkSafetyRun` (Checkbox/Toggle).
  - *Action:* `btnComplete` (Active only when `chkSafetyRun.Value = True`).

---

## 7. Power Fx Grammar: Navigation, Submission & Feedback

```
USER ACTION ➔ PLAIN-ENGLISH RULE ➔ POWER FX FORMULA ➔ SYSTEM RESULT
```

### Pattern 1: Safe Navigation with Visual Transition
* **Business Requirement:** Clicking the "+ New Ticket" button takes the user to the Intake Screen with a smooth fade.
* **Power Fx:**
  ```powerfx
  btnNewTicket.OnSelect = NewForm(frmNewRequest); Navigate(scrNewRequest, ScreenTransition.Fade)
  ```

### Pattern 2: Return Navigation (The "Cancel" or "Back" Button)
* **Business Requirement:** If the user changes their mind, return to the previous screen without saving changes.
* **Power Fx:**
  ```powerfx
  btnCancel.OnSelect = ResetForm(frmNewRequest); Back(ScreenTransition.Fade)
  ```

### Pattern 3: Submission with Human Feedback
* **Business Requirement:** When an operator submits a ticket, confirm the data was saved with a green banner, then return home.
* **Power Fx:**
  ```powerfx
  btnSubmit.OnSelect = 
      SubmitForm(frmNewRequest);
      Notify("Maintenance ticket created successfully!", NotificationType.Success);
      Navigate(scrHome, ScreenTransition.Fade)
  ```

---

## 8. Common Misconceptions & Trainer Corrections

### Misconception 1: "A Power App is just one webpage; everything should be on one screen."
* *Plausible Wrong Mental Model:* "If I put everything on one screen, users don't have to click between pages."
* *The Fatal Consequence:* Extreme cognitive overload, accidental button clicks, slow loading performance, and broken business security (operators seeing supervisor approval buttons).
* *Trainer Correction:* *"Think of your app like a physical factory building. You don't put the cafeteria, the welding furnace, and the accounting office in the exact same room. Screens are rooms. Separate rooms keep people safe and focused."*

### Misconception 2: "I should make all labels and buttons bright colors so the app looks creative."
* *Plausible Wrong Mental Model:* "Color is just decoration. Purple, orange, and neon green make the app look fun."
* *The Fatal Consequence:* In manufacturing and enterprise apps, color is semantic communication:
  - **Red** = Danger / Emergency / Critical Stop.
  - **Green** = Success / Approved / Safe.
  - **Yellow/Amber** = In Progress / Caution.
  - **Blue/Neutral** = Primary action.
* *Trainer Correction:* *"If your whole app is colorful, nothing stands out. In a plant, bright colors are alarm signals. Use color strictly to convey meaning, not for decoration."*

### Misconception 3: "Users don't need feedback messages; they will know it worked when the screen changes."
* *Plausible Wrong Mental Model:* "If they click submit and the screen goes home, they know it worked."
* *The Fatal Consequence:* The operator wonders: *'Did it actually save, or did it just crash and close?'* They submit the ticket three more times, creating duplicate requests!
* *Trainer Correction:* *"Always give explicit feedback using `Notify()`. A simple 3-second green confirmation banner gives humans psychological safety."*

---

## 9. 5 Evaluative Knowledge-Check Questions (With Trainer Rationale)

1. **Question 1 (Core Architecture):** Why is a mobile or desktop app screen described as a **"dedicated workstation"**?
   * *Answer:* Because like a physical workbench, a screen should contain only the specific tools, inputs, and information required for the human to complete their single immediate task, preventing cognitive overload and mistakes.
2. **Question 2 (What Happens If):** What happens if an app designer puts the "Submit Incident" and "Supervisor Approve" buttons on the exact same screen without role restrictions?
   * *Answer:* Operators can accidentally or maliciously approve their own requests, bypassing financial governance and causing safety catastrophes (like the $38,000 shattered mold at Apex Plastics).
3. **Question 3 (Control Families):** What is the fundamental difference between an **Input Control** and a **Display Control**?
   * *Answer:* An Input Control allows the user to write/give data to the application (e.g. Text box, Dropdown), while a Display Control is read-only, allowing the user to view data emitted by the application (e.g. Label, Badge).
4. **Question 4 (User Psychology):** Why must every primary data submission formula conclude with a `Notify()` function?
   * *Answer:* Without explicit confirmation feedback, users experience uncertainty, leading to anxiety, mistrust in the software, and duplicate submissions.
5. **Question 5 (Navigation):** Why should a "Cancel" button execute `ResetForm()` before calling `Back()`?
   * *Answer:* To clear out any partial, invalid, or temporary text typed by the user, ensuring the form returns to a clean pristine state when opened again.

---

## 10. Capstone Independent Challenge & 4-Level Evaluation Rubric

### The Challenge: "Wireframe the Apex Plastics Tooling Replacement App"
Translate the 4-step tooling replacement workflow (from Day 11) into a professional 3-screen mobile/tablet app architecture.

#### Required Deliverable Matrix:
Design 3 screens:
1. `scrToolingList` (Browse Gallery Screen)
2. `scrToolingRequest` (Technician Intake Screen)
3. `scrToolingApproval` (Supervisor Review Screen)

For each screen, specify: Screen Name | Intended User | Screen Purpose | Input Controls Needed | Display Controls Needed | Primary Action Button.

---

### Standard 4-Level Evaluation Rubric

| Level | Criteria | Characteristics |
| :---: | :--- | :--- |
| **Level 4: Mastery (100%)** | Flawless UX Architecture | • Complete 3-screen separation matching exact human tasks.<br>• 100% correct classification of Input vs. Display vs. Action controls.<br>• Clear feedback and navigation formulas specified (`Notify`, `Navigate`).<br>• Gating safety rules documented for each screen. |
| **Level 3: Proficient (75–99%)** | Solid Understanding | • 3 screens designed; minor control misclassification (e.g. using an Input control for read-only data).<br>• Correct navigation flow.<br>• Minor syntax omission in the feedback notification formula. |
| **Level 2: Developing (50–74%)** | Partial Understanding | • Crammed steps into 2 screens; left supervisor approval on the intake form.<br>• Confused Display controls with Input controls.<br>• Omitted user feedback mechanisms. |
| **Level 1: Novice (<50%)** | Needs Spiral Re-teaching | • Built a single monolithic screen containing all fields.<br>• Unable to categorize controls into Input, Display, or Action.<br>• No understanding of screen navigation. |

---

## 11. Optional 15-Minute Review & Homework Assignment

* **Home Reflection (15 min):** Look at your smartphone. Open two apps: your favorite banking app and a food delivery app.
  1. Count how many **different screens** you pass through to complete one simple order or transfer.
  2. Notice how each screen asks only **one or two questions** at a time.
  3. Identify one **Input Control**, one **Display Control**, and one **Action Control** on each screen.

---

## 12. Forward Connection Map: The 3-Day Bridge

```
┌──────────────────────────────────────┐
│  YESTERDAY (DAY 11)                  │
│  Design Data from the Process        │
│  Core: Process Questions ➔ Fields    │
│  Types, Status & Unique ID           │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│  TODAY (DAY 12)                      │
│  From Process + Data to App Screens  │
│  Core: Tasks ➔ Screens ➔ Controls    │
│  Input, Display, Action & Feedback   │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│  TOMORROW (DAY 13)                   │
│  Implement Paper Design in Studio    │
│  Core: Canvas Studio, Containers,    │
│  Controls, Properties & Themes       │
└──────────────────────────────────────┘
```

*End of Lesson Plan • Power Apps Foundation Day 12*

