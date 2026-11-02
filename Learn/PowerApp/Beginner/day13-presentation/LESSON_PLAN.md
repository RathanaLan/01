# Power Apps Foundation: Day 13 Complete Lesson Plan
## Topic: Power Apps Studio: Map Design to Controls
**Phase:** Phase 5 — Power Apps Canvas Implementation  
**Target Learner:** Absolute Zero Beginner (No prior coding, logic, database, or UI design knowledge)  
**Total Duration:** Exactly 90 Minutes  
**Central Mental Model:** `REAL PROBLEM -> PROCESS -> DATA -> UI/SCREEN -> LOGIC/DECISION -> ACTION -> STORAGE -> FEEDBACK -> TEST`  
**Today's Connection Chain:** `Paper Screen -> Canvas Screen -> Studio Controls -> Control Properties`

---

## 1. Measurable Learning Objectives (Bloom's Taxonomy L2–L5)
By the end of this 90-minute session, the absolute-zero learner will be able to:
1. **Explain the 4 Core Zones of Power Apps Studio (L2: Understand)**: Deconstruct the Power Apps Canvas interface into the Command Ribbon, Tree View, Canvas Stage, and Properties Inspector, explaining how the Tree View acts as the architectural building blueprint.
2. **Classify and Map Paper Elements to Studio Controls (L3: Apply)**: Take any sketched UI element from yesterday's Day 12 paper wireframe and select the exact corresponding Power Apps Studio control family (e.g., text prompt $\rightarrow$ `Label`, user input $\rightarrow$ `TextInput` or `Dropdown`, user submission $\rightarrow$ `Button`).
3. **Formulate Professional Control Naming Conventions (L4: Analyze)**: Implement industry-standard Hungarian notation prefixes (`scr`, `lbl`, `txt`, `drp`, `btn`, `gal`, `frm`) across all screen objects, explaining why default names like `TextInput1` cause catastrophic failures when formulas are written on Days 15–20.
4. **Configure Critical Control Properties & Formulate Initial State Logic (L5: Create)**: Construct a pristine single-screen intake workstation (`scrNewRequest`) with configured properties (`Text`, `Default`, `Items`, `Visible`, `DisplayMode`, `OnSelect`), adhering to visual hierarchy and contrast standards.

---

## 2. 5-Minute Concept-Map Recap (Days 9–12 Spiral Connection)
* **Day 9 (The Human Workflow)**: We learned that work moves sequentially across time and roles (Operator $\rightarrow$ Supervisor $\rightarrow$ Technician $\rightarrow$ Auditor). No single person owns the entire workflow simultaneously.
* **Day 10 (Records & Tables)**: We discovered that repeated business cases require structured storage. One incident = one Record (Row); shared attributes = Columns; the entire collection = Table.
* **Day 11 (Deriving Data from Process)**: We extracted 8 essential columns strictly from workflow questions, choosing unbreakable data types (`Choice`, `Date`, `Single Text`) to prevent database corruption.
* **Day 12 (From Process + Data to App Screens)**: We segregated human tasks into dedicated rooms (Browse, New, Details, Action), categorized the 3 control families (Input, Display, Action), and drew low-fidelity paper wireframes.
* **TODAY (Day 13)**: We take the paper blueprint from Day 12 and step inside **Microsoft Power Apps Canvas Studio** for the very first time! We do not guess or randomly click; we systematically translate paper rectangles into digital Studio Controls and configure their properties.

---

## 3. Prerequisite Retrieval Questions (Active Recall)
### Question 1:
*"On Day 12, why did we decide NOT to put all 8 data columns and 4 user roles onto a single screen?"*
* **Correct Beginner Concept**: Cramming everything into one screen overwhelms users (cognitive overload), causes accidental edits of other people's data, and creates confusion. Work happens sequentially, so each human role needs a dedicated, focused workstation.

### Question 2:
*"What are the 3 functional control families we established yesterday, and what is their sole purpose?"*
* **Correct Beginner Concept**:
  1. **Input Controls**: Let humans write data into the app (`TextInput`, `Dropdown`, `DatePicker`).
  2. **Display Controls**: Read-only controls that show facts safely (`Label`, `Image`, `Gallery`).
  3. **Action Controls**: Buttons and icons that trigger actions or navigate rooms (`Button`, `Icon`).

### Question 3:
*"Why did we insist on drawing our screens on paper on Day 12 before opening Power Apps Studio today?"*
* **Correct Beginner Concept**: Paper costs zero dollars and takes two minutes to erase. If you start building directly in Power Apps Studio without a plan, you get overwhelmed by buttons, build cluttered screens, and waste dozens of hours redesigning.

---

## 4. Today's "Why This Exists" Problem: The $22,000 Studio Panic at Apex Plastics
At Apex Plastics, junior maintenance clerk Visal was tasked with digitizing the injection mold breakdown reporting form. 
Excited by his new Power Apps license, Visal skipped wireframing and immediately clicked *"Create blank canvas app"*. 
Confronted by the blank white canvas and over 150 toolbar options, Visal panicked. He dragged random text boxes onto the canvas, left them named `TextInput1`, `TextInput2`, and `TextInput3_1`, and placed labels directly on top of input fields without alignment. 

When operators tested the app on shop-floor tablets:
* Labels overlapped with text boxes on mobile screens.
* Nobody knew what `TextInput2` was supposed to capture because there were no field labels or hints.
* When Visal tried to write a submission formula, he couldn't tell whether `TextInput1` was the Machine Name or the Operator's Notes, causing reports to save with swapped fields.
* Operators abandoned the tablet app and returned to paper, costing the plant **$22,000 in delayed machine maintenance** over 6 weeks.

**The Golden Lesson**: Power Apps Studio is NOT a graphic drawing tool like MS Paint or PowerPoint. It is an **industrial assembly factory**. Every screen is a clean room, every control is a physical machine with an exact part number, and every property is an operational setting dial.

---

## 5. Plain-Language Concept Before Technical Vocabulary
* **The Canvas Screen**: An empty, clean room in your digital building.
* **Controls**: The specialized furniture, appliances, and tools you place inside that room so a human can do their job.
  * A `Label` is a sign taped to the wall that explains instructions.
  * A `TextInput` is an empty clipboard where a worker writes notes.
  * A `Dropdown` is a vending machine menu where a worker picks only approved items.
  * A `Button` is an electric switch on the wall that rings an alarm or sends a signal.
* **Properties**: The knobs, dials, and settings on that appliance (e.g., color, size, text displayed, whether the switch is enabled or disabled).
* **Tree View**: The architectural x-ray list that shows every piece of furniture inside the room and what order they sit in.

---

## 6. Everyday Analogy: Furnishing an Empty Office Room
Imagine you just rented an empty commercial office suite:
1. **The Floorplan (Screen)**: You have an empty room designated as the *"Customer Intake Office"* (`scrNewRequest`).
2. **The Furniture Catalog (Insert Controls)**: You open a catalog and order:
   * A wooden desk with an incoming tray (`TextInput`).
   * A wall clock and direction signs (`Label`).
   * A wall switch to summon the manager (`Button`).
3. **The Inventory Clipboard (Tree View)**: You don't just dump furniture in a heap; you maintain an inventory list showing that the Desk sits on the Floor, and the Clipboard sits on the Desk.
4. **The Settings & Paint (Properties)**: You specify that the sign says *"Welcome"* (`Text = "Welcome"`), the wall switch is painted Blue (`Fill = RGBA(0, 120, 212, 1)`), and the emergency bell only rings when the form is signed (`DisplayMode = DisplayMode.Edit`).

---

## 7. Manufacturing/DX Workplace Example: The Injection Molding Intake Station
At Apex Plastics, Press #4 operates at 400°F. When a hydraulic line leaks, operator Bopha has 60 seconds to report the issue before the mold freezes.
Inside Power Apps Studio, we build her workstation screen:
* **Screen Name**: `scrNewRequest` (Clear, unambiguous purpose).
* **Header Bar**: A dark blue banner container (`conHeader`) with a title label (`lblHeaderTitle`) displaying *"Apex Plastics — Log Incident"*.
* **Control 1 (Machine Dropdown)**: `drpMachine` $\rightarrow$ Lists only authorized machines (`Press-01`, `Press-02`, `Press-03`, `Press-04`). Prevents Bopha from typing typos.
* **Control 2 (Severity Choice)**: `drpUrgency` $\rightarrow$ Shows `Low`, `Medium`, `High`, `Critical`.
* **Control 3 (Issue Description)**: `txtDescription` $\rightarrow$ Multi-line input with hint text: *"Describe unusual sounds, pressure drops, or leaks..."*.
* **Control 4 (Submit Action)**: `btnSubmit` $\rightarrow$ Large high-contrast primary button.

---

## 8. Visual Cause-and-Effect Diagram: The 4-Layer Translation Pipeline
```
+-----------------------------------------------------------------------------------+
| LAYER 1: BUSINESS TASK (The Real Human Job)                                        |
| Operator Bopha needs to report a hydraulic leak on Injection Press #4 in 60s.    |
+-----------------------------------------------------------------------------------+
                                       |
                                       v
+-----------------------------------------------------------------------------------+
| LAYER 2: PAPER WIREFRAME (Day 12 Architectural Sketch)                             |
| [Box 1: Header] -> [Box 2: Machine Menu] -> [Box 3: Notes Box] -> [Box 4: Submit] |
+-----------------------------------------------------------------------------------+
                                       |
                                       v
+-----------------------------------------------------------------------------------+
| LAYER 3: STUDIO CONTROLS (Insert & Tree View Hierarchy)                           |
| Screen: scrNewRequest                                                             |
|   +-- conHeader                                                                   |
|   |     +-- lblAppTitle, icnAppLogo                                               |
|   +-- drpMachine, drpUrgency, txtDescription                                      |
|   +-- btnSubmit, btnCancel                                                        |
+-----------------------------------------------------------------------------------+
                                       |
                                       v
+-----------------------------------------------------------------------------------+
| LAYER 4: PROPERTIES & INITIAL STATE (Operational Dials)                            |
| drpMachine.Items = ["Press-01", "Press-02", "Press-03", "Press-04"]               |
| txtDescription.HintText = "Describe hydraulic leak or symptoms..."               |
| btnSubmit.DisplayMode = If(IsBlank(txtDescription.Text), Disabled, Edit)          |
+-----------------------------------------------------------------------------------+
```

---

## 9. 90-Minute Timed Agenda Blueprint

| Time Window | Duration | Phase | Pedagogical Goal & Spiral Focus |
| :--- | :--- | :--- | :--- |
| **00:00 – 10:00** | 10 Min | **Part 1: Recall & Connect** | Connect Days 9–12 to Studio. Prerequisite retrieval quiz on paper wireframes & 3 control families. |
| **10:00 – 25:00** | 15 Min | **Part 2: Discover (The Why)** | The $22,000 Studio Panic at Apex Plastics. Tour of Studio's 4 Zones (Ribbon, Tree View, Canvas, Properties). |
| **25:00 – 45:00** | 20 Min | **Part 3: Deep Dive Theory** | Control-Property Mental Model (Noun, Adjective, Verb). Hungarian Notation naming standards (`scr`, `txt`, `btn`). |
| **45:00 – 60:00** | 15 Min | **Part 4: Demonstrate & Lab** | Live Trainer Walkthrough: Translating the Paper Wireframe into Studio. Hands-on exploration with Widget 1. |
| **60:00 – 75:00** | 15 Min | **Part 5: Guided Practice** | Audit a disorganized Canvas screen (identifying 4 fatal flaws). Interactive Diagnostic Simulator (Widget 2). |
| **75:00 – 90:00** | 15 Min | **Part 6: Assess & Bridge** | 5-Question Evaluative Knowledge Check (Widget 3), Capstone Challenge & Rubric (Widget 4), Bridge to Day 14. |

---

## 10. Trainer Live Demonstration Protocol (Step-by-Step)
1. **Step 1: Open Studio & Rename Screen**:
   * *Action*: Show default `Screen1`. Press <kbd>F2</kbd> in Tree View. Rename immediately to `scrNewRequest`.
   * *Script*: *"Notice we rename before doing anything else. If you build first and rename later, existing formulas can lose reference links."*
2. **Step 2: Establish the Header Bar**:
   * *Action*: Insert a horizontal container (`conHeader`). Set `Height = 60`, `Fill = RGBA(9, 13, 22, 1)`. Insert `lblAppTitle`. Set `Text = "Apex Plastics — Maintenance Incident Intake"`.
3. **Step 3: Insert the Input Controls (Matching Day 11 Data Types)**:
   * *Action*: Insert `drpMachine` (Dropdown). Set `Items = ["Press 01", "Press 02", "Press 03", "Press 04"]`.
   * *Action*: Insert `txtProblemDetails` (TextInput). Set `Mode = TextMode.MultiLine`, `Height = 110`, `HintText = "Provide exact symptoms, temperature readings, or noise descriptions..."`.
4. **Step 4: Configure the Primary Action Control**:
   * *Action*: Insert `btnSubmit` (Button). Set `Text = "Submit Ticket"`, `Fill = RGBA(0, 120, 212, 1)`.
   * *Script*: *"Look at the right panel. Every button has over 40 properties. We don't touch 40; we focus strictly on the 4 that control human interaction: Text, Fill, DisplayMode, and OnSelect."*

---

## 11. Guided Learner Practice: Auditing a Disorganized Screen
The learner inspects an unorganized screen screenshot showing:
1. **Flaw 1**: Control named `TextInput1_2` used for Operator Badge ID $\rightarrow$ *Fix: Rename to `txtOperatorID`.*
2. **Flaw 2**: Free text input used for Machine selection $\rightarrow$ *Fix: Replace with `drpMachine` choice dropdown to eliminate typos.*
3. **Flaw 3**: Submit button styled in light gray on white background $\rightarrow$ *Fix: Increase contrast ratio to $\ge 4.5:1$ using Fluent Blue.*
4. **Flaw 4**: No escape hatch or Cancel button $\rightarrow$ *Fix: Insert `btnCancel` with formula `Back()` so users never get trapped.*

---

## 12. Independent Mini-Task (3-Minute Architecture Challenge)
* **Task Scenario**: The Apex Plastics Quality Assurance manager needs a screen for logging scrapped plastic parts (`scrScrapLog`).
* **Requirement**: The learner must write down on paper or notepad:
  1. The exact Canvas Screen name with standard prefix.
  2. The exact Studio control to insert for: Part Serial Number, Defect Category (Cracked, Discolored, Warped), Scrap Quantity, and Confirm Submission.
  3. The Hungarian prefix name for each control.
* **Expected Solution**:
  * Screen: `scrScrapLog`
  * Part Serial: `txtPartSerial` (`TextInput`)
  * Defect Category: `drpDefectCategory` (`Dropdown`)
  * Scrap Quantity: `txtQuantity` (`TextInput` with `Format = Number`)
  * Confirm Button: `btnConfirmScrap` (`Button`)

---

## 13. Common Misconceptions & Trainer Corrections
1. **Misconception**: *"Power Apps is just drag-and-drop PowerPoint drawing; alignment and names don't matter."*
   * *Trainer Correction*: In PowerPoint, a text box is passive ink. In Power Apps, a text box is a **live data gateway**. Other formulas read its `.Text` property. If you name it poorly, your code becomes unmaintainable within 48 hours.
2. **Misconception**: *"I should configure colors and fancy graphics first before adding fields."*
   * *Trainer Correction*: Structure comes before styling! Build your Tree View skeleton, insert all necessary inputs according to the business process, verify functional tab order, and only then polish margins and colors.
3. **Misconception**: *"Properties are only static values like width and height."*
   * *Trainer Correction*: Properties are dynamic calculation channels! A button's `DisplayMode` property can evaluate a formula: `If(IsBlank(txtNotes.Text), DisplayMode.Disabled, DisplayMode.Edit)`. It thinks and adapts!
4. **Misconception**: *"I can just delete and recreate controls if I make a mistake."*
   * *Trainer Correction*: Deleting a control that is already referenced by other formulas causes `#NAME?` cascade errors across your app. Rename and re-point properties methodically instead of randomly deleting.

---

## 14. 5 Evaluative Knowledge-Check Questions
1. **Question 1 (Recall)**: *What are the 4 primary visual zones of Power Apps Studio, and which one shows the architectural parent-child hierarchy of your app?*
   * *Answer*: Command Ribbon (Top), Tree View (Left), Canvas Stage (Center), and Properties Inspector (Right). The **Tree View** shows the parent-child hierarchy.
2. **Question 2 (Why)**: *Why must we rename a control from `TextInput1` to `txtDescription` immediately upon inserting it into the canvas?*
   * *Answer*: Because when you write Power Fx formulas later (e.g., `SubmitForm` or validation checks), descriptive names make formulas instantly readable and prevent writing to the wrong column.
3. **Question 3 (What happens if)**: *What happens if a citizen developer uses a `TextInput` control for Machine Selection instead of a `Dropdown` control?*
   * *Answer*: Users will introduce spelling typos (e.g., "press1", "Press 01", "P-1"), making automated filtering, email routing, and database reporting fail.
4. **Question 4 (Property Role)**: *In the mental formula "Control = Noun, Property = Adjective, Formula = Verb", which property controls whether a button is clickable or grayed out?*
   * *Answer*: The `DisplayMode` property (values: `DisplayMode.Edit`, `DisplayMode.Disabled`, `DisplayMode.View`).
5. **Question 5 (Troubleshooting)**: *If a button on the canvas cannot be clicked during app preview (Play Mode), what are the two most likely properties causing the issue?*
   * *Answer*: `DisplayMode` (set to `Disabled` or `View`) or `Visible` (set to `false` or covered by a transparent container with higher z-index).

---

## 15. Capstone Challenge & Rubric
* **Mission**: Translate the Day 12 Apex Plastics Maintenance Request Wireframe into a complete Studio specification matrix for `scrNewRequest`.
* **Deliverable**: Draft the complete Tree View object tree, assigning Hungarian names, control types, default values, and operational properties for:
  1. Header with logo and back arrow
  2. Machine Selector
  3. Urgency Dropdown
  4. Failure Description Box
  5. Photo Upload Indicator
  6. Submit & Cancel Action Buttons

### Capstone Evaluation Rubric (4-Tier Industrial Standard)

| Criteria | 1: Novice (Needs Revision) | 2: Developing (Fair) | 3: Proficient (Industry Ready) | 4: Exemplary (Enterprise Architect) |
| :--- | :--- | :--- | :--- | :--- |
| **Naming Conventions** | Keeps default names (`Button1`, `Label2`). | Names some controls; inconsistent prefixes. | 100% of controls follow standard Hungarian prefixes (`scr`, `txt`, `btn`). | Prefixes applied flawlessly with semantic sub-role groupings. |
| **Control Selection** | Uses free-text inputs for restricted choice fields. | Uses correct controls but misses hint text or multi-line settings. | Correctly maps Day 11 data types to `Dropdown`, `DatePicker`, `TextInput`. | Perfect selection with responsive container wrapping and accessibility labels. |
| **Property Formulation** | Properties left at random defaults; zero state logic. | Configures basic text/fill; forgets `DisplayMode` or `Reset`. | Configures `Text`, `Items`, `HintText`, and basic `DisplayMode` rules. | Implements adaptive properties (`DisplayMode` dependent on field completion). |
| **Structural Hierarchy** | Flat, chaotic tree view with overlapping coordinates. | Grouped randomly without semantic containers. | Clean Tree View with dedicated Header, Form, and Action containers. | Pixel-perfect responsive alignment with auto-layout containers. |

---

## 16. 15-Minute Review & Homework Challenge
* **Exercise**: Open any web app you use daily (e.g., Microsoft Outlook Web or Teams):
  1. Identify 3 distinct controls and classify them into Input, Display, or Action.
  2. Write down what property changes when you hover over a button vs when you click it.
  3. Predict what the Hungarian Notation name would be if you were building that screen in Power Apps Studio tomorrow!

---

## 17. The 3-Day Bridge Map
* **Yesterday (Day 12)**: *From Process + Data to App Screens* $\rightarrow$ We mapped human tasks into dedicated screen wireframes on paper.
* **Today (Day 13)**: *Power Apps Studio: Map Design to Controls* $\rightarrow$ We opened Studio and translated paper wireframes into real Canvas controls with structured properties.
* **Tomorrow (Day 14)**: *Controls Collect & Display Data* $\rightarrow$ We connect these controls to live data collections and bind inputs to database columns!

