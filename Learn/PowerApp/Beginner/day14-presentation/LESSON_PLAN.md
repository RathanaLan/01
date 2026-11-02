# Day 14: Controls: Input, Action, Output
**Phase 5: Canvas Studio Implementation**  
**Estimated Time:** Exactly 90 Minutes  
**Central Mental Model:** `REAL PROBLEM -> PROCESS -> DATA -> UI/SCREEN -> LOGIC/DECISION -> ACTION -> STORAGE -> FEEDBACK -> TEST`  
**Today's Connection Chain:** `label = information (output) ; input = collect data ; button = action ; dropdown = choice`  
**Core Meaning:** Each control has a distinct, irreplaceable job in the Input-Process-Output model. Choosing the wrong control corrupts data, stops workflows, or confuses users.  
**Prior Connection:** Day 13 (Power Apps Studio canvas, Tree View, Hungarian notation) + Day 1 (Input-Process-Output foundation).  
**Forward Bridge:** Day 15 (Connect screens into a complete multi-screen user journey with `Navigate()`).

---

## 1. Measurable Objectives (3–5 Outcomes)
By the end of this 90-minute lesson, the absolute zero beginner will be able to:
1. **Classify 4 Core Controls by Functional Role:** State whether a `Label`, `Text Input`, `Dropdown`, or `Button` belongs to Information/Output, Data Collection/Input, Finite Choice/Input, or Event/Action.
2. **Apply the Data Integrity Rule to Control Selection:** Determine when a user input requires a `Dropdown` (restricted discrete options) versus a `Text Input` (unrestricted freeform text) to prevent database pollution.
3. **Configure Core Behavioral Properties in Power Apps Studio:** Successfully locate and set `Text`, `Default`, `HintText`, `Items`, `OnSelect`, and `DisplayMode` using the Formula Bar and Properties Panel.
4. **Diagnose and Fix "Wrong Control for the Job" Bugs:** Explain what operational disasters occur when a control is miscast (e.g., trying to collect user data in a `Label`, or relying on free text for machine codes).

---

## 2. 5-Minute Concept-Map Recap (The Connected Journey)

| Phase & Day | Concept Mastered | Connection to Today (Day 14) |
| :--- | :--- | :--- |
| **Day 1: Problem & System** | Input $\rightarrow$ Process $\rightarrow$ Output | Every digital application is a machine that ingests **Inputs**, executes a **Process**, and displays an **Output**. Today, we see how Studio controls embody these exact three roles. |
| **Day 9–11: Data Design** | Schema, Fields, Data Types, Status, ID | We designed columns in SharePoint: `MachineID` (Choice), `IncidentDescription` (Text), `IncidentDate` (Date), `Urgency` (Choice), `TicketID` (Read-only Text). |
| **Day 12: Screen Architecture** | Wireframing user tasks into screens | We planned `scrNewRequest` on paper: header banner, form body with 4 questions, and a submit footer. |
| **Day 13: Studio Mapping** | Tree View, controls, Hungarian notation | We placed blank shapes on the canvas and named them `lblTitle`, `drpMachine`, `txtNotes`, `btnSubmit`. |
| **TODAY (Day 14)** | **Controls: Input, Action, Output** | **We give purpose to these controls: Labels broadcast information, Inputs harvest data, Dropdowns enforce clean choices, and Buttons trigger action.** |
| **Day 15 (Next)** | Multi-Screen User Journeys | Connect screens using `Navigate(scrSuccess, ScreenTransition.Fade)` so submitting transitions the operator to feedback. |

---

## 3. Prerequisite Retrieval Practice (Warm-Up Questions)

1. **Question:** In Day 13, why did we forbid names like `TextInput1` and insist on Hungarian notation like `txtMachineNotes`?  
   *Answer:* Default names make formulas unreadable and cause developers to store data into the wrong columns. `txtMachineNotes` clearly tells any developer that it is a Text Input holding machine notes.
2. **Question:** Where in Power Apps Studio do you see the parent-child relationship of your screens and controls?  
   *Answer:* The **Tree View** panel on the left navigation bar.
3. **Question:** If a button has its property `Visible` set to `false`, what happens when the operator runs the app?  
   *Answer:* The button completely disappears from the screen; the operator cannot see it or tap it.
4. **Question:** In Day 1, we learned that a broken machine sensor feeding bad numbers into an Excel sheet creates bad reports. How does that connect to app controls today?  
   *Answer:* If the app user enters garbage into an input control, garbage gets saved into SharePoint. The control is the gateway of all business data.

---

## 4. Today's "WHY THIS EXISTS" Problem (The Workplace Crisis)

### The "Chaotic Control Catastrophe" at Apex Plastics
At Apex Plastics, maintenance technician Somnang decided to build a "Quick Breakdown Ticket" app during his night shift. He had never learned the functional roles of controls.
1. **The Ghost Input:** Somnang wanted operators to enter their employee ID. He dragged a **Label** onto the screen, typed `"Enter Employee ID here"` into its `Text` property, and told operators to type their ID there. Operators tapped their tablets furiously, but nothing happened—because a Label is an **Output** control and cannot receive keystrokes!
2. **The 14 Variations of Press-01:** For selecting the broken machine, Somnang inserted a standard **Text Input**. Within 48 hours, operators typed: `"press 1"`, `"P-01"`, `"Press #1"`, `"machine one"`, `"M/C 1"`, and `"PRESS01"`. When the automated inventory system tried to match the maintenance report to spare parts, the database query crashed! No replacement hydraulic valves were ordered.
3. **The Dead Button:** Somnang placed an **Image icon** of a green checkmark to represent "Submit". Operators tapped it and walked away. But because an Image has no automatic action and its `OnSelect` was untouched, zero records were created in SharePoint.
4. **The Disaster:** Over two days, 17 breakdown reports vanished into thin air. Machine Press-02 overheated without maintenance noticing, melting $34,000 worth of resin inside the barrel and halting Production Line B for 36 hours.

**Trainer Core Message:**  
*"Power Apps controls are not visual decorations like PowerPoint shapes. Each control is a precision industrial valve. If you install an exhaust pipe where an intake valve belongs, the engine explodes."*

---

## 5. Plain-Language Concept (Before Technical Vocabulary)

Think of a control as a **worker stationed at a physical counter**:
- **The Information Broadcaster (Output / Label):** This worker holds up a printed sign. You can read the sign from across the room, but you cannot hand your paper to the sign, and you cannot ask the sign to run an errand.
- **The Form Collector (Input / Text Input):** This worker hands you a blank sheet of paper and a pen. You can write whatever words, sentences, or paragraphs you want.
- **The Multiple-Choice Selector (Input / Dropdown):** This worker holds a tray with 4 specific colored badges. You are not allowed to invent a 5th color; you must pick exactly one of the items provided.
- **The Action Lever (Action / Button):** This is a heavy red mechanical lever. It does not store anything and does not display anything other than its own name. When you pull it down, it rings an alarm, starts a conveyor belt, or stamps a document.

---

## 6. Everyday Analogy: The Automated Beverage Kiosk

Imagine walking up to a modern touchscreen coffee kiosk:
1. **The Digital Status Display (Label):** Shows `"Price: $3.50"` and `"Water Temp: 92°C"`. You cannot type your phone number onto the temperature display. It is pure **Output / Information**.
2. **The Cup Size Selector (Dropdown):** Gives you three discrete choices: `["Small (8oz)", "Medium (12oz)", "Large (16oz)"]`. The machine does not let you type "Super Biggie", because the cup dispenser only holds three physical cup sizes. It is a **Controlled Input**.
3. **The Custom Name Field (Text Input):** A blank box where you type your nickname `"Sopheap"`. The machine has no predefined list of all names in Cambodia; it must accept open text. It is an **Unrestricted Input**.
4. **The "Brew Coffee" Pedal (Button):** A prominent button labeled `"Start Brewing"`. Tapping it triggers the pump, grinder, and heater. It is an **Action Trigger**.

---

## 7. Manufacturing/DX Workplace Architecture (Apex Plastics)

In our Apex Plastics Maintenance Application (`scrNewRequest`), each element maps directly to an operational role:

```
+-------------------------------------------------------------------------+
| [OUTPUT] lblHeader: "Apex Plastics - Machine Incident Report"          |
| [OUTPUT] lblMachineStatus: "Operating Status: NORMAL (38°C)"           |
+-------------------------------------------------------------------------+
| [INPUT: CHOICE] drpMachineID: ["Press-01", "Press-02", "Press-03"]     |
|   -> Prevents typos; enforces exact foreign keys for SharePoint list    |
+-------------------------------------------------------------------------+
| [INPUT: CHOICE] drpUrgency: ["Low", "Medium", "High", "Critical"]       |
|   -> Standardizes SLA priority for maintenance queue                   |
+-------------------------------------------------------------------------+
| [INPUT: TEXT] txtIncidentDescription: "Oil leaking near piston #2"      |
|   -> Captures rich qualitative field observations                      |
+-------------------------------------------------------------------------+
| [ACTION] btnSubmitTicket: [OnSelect: Save & Notify Supervisor]         |
|   -> Executes database write and triggers automated Teams alert         |
+-------------------------------------------------------------------------+
```

---

## 8. Visual Cause-and-Effect Architecture

```
USER ACTION            CONTROL TYPE        PRIMARY PROPERTY     SYSTEM CONSEQUENCE
Operator reads info -> Label (lbl)      -> Text               -> Zero data collected; visual awareness
Operator chooses    -> Dropdown (drp)   -> Items              -> Clean, uniform, schema-compliant data
Operator types text -> TextInput (txt)  -> Default / HintText -> Open qualitative data harvested
Operator presses    -> Button (btn)     -> OnSelect           -> Logic runs; database record created
```

---

## 9. Trainer Demonstration Script (Step-by-Step in Studio)

### Step 1: Inserting and Configuring a Label (Output)
1. In Power Apps Studio, click `+ Insert` on the left rail $\rightarrow$ select `Text label`.
2. In Tree View, rename `Label1` to `lblIncidentDate`.
3. In the Formula Bar, select the `Text` property.
4. Set formula: `"Reported On: " & Text(Today(), "dd-mmm-yyyy")`.
5. Point out to learner: *Can we click this in Preview to change the date? No. A label displays facts computed by the system.*

### Step 2: Inserting and Configuring a Dropdown (Controlled Choice Input)
1. Click `+ Insert` $\rightarrow$ select `Drop down`.
2. Rename `Dropdown1` to `drpMachineSelect`.
3. In the Formula Bar, select the `Items` property.
4. Replace default values with: `["Injection Press 01", "Injection Press 02", "Injection Press 03", "Extruder Line 01"]`.
5. Explain: *Why square brackets? In Day 10, we learned that square brackets `[...]` define a Single-Column Table of choices.*

### Step 3: Inserting and Configuring a Text Input (Freeform Input)
1. Click `+ Insert` $\rightarrow$ select `Text input`.
2. Rename `TextInput1` to `txtOperatorNotes`.
3. In Properties panel, clear the `Default` property so it is blank `""`.
4. Set `HintText` property to `"Describe abnormal sound, smell, or hydraulic leak..."`.
5. Set `Mode` property to `TextMode.MultiLine`.
6. Explain: *Notice the subtle gray hint. As soon as the operator types, the hint vanishes.*

### Step 4: Inserting and Configuring a Button (Action)
1. Click `+ Insert` $\rightarrow$ select `Button`.
2. Rename `Button1` to `btnSubmitIncident`.
3. Set `Text` property to `"SUBMIT TICKET"`.
4. Inspect `OnSelect` property. Currently it is `false` (does nothing).
5. Inspect `DisplayMode` property. Show difference between `DisplayMode.Edit` (active/clickable) and `DisplayMode.Disabled` (grayed out).

---

## 10. Guided Learner Practice (10 Minutes)

### Scenario: The Shift Handover Control Kit
The learner builds a quick 3-control kit for the shift supervisor:
- **Task A (Output):** Insert a Label named `lblShiftBanner` displaying `"Current Shift: Shift A (Morning)"`.
- **Task B (Input Choice):** Insert a Dropdown named `drpLineStatus` with choices `["Running at 100%", "Degraded Speed", "Full Line Stoppage"]`.
- **Task C (Action):** Insert a Button named `btnConfirmHandover` with text `"Acknowledge Handover"`.

*Trainer Prompt:*  
"If the supervisor wants to type why the line stopped, which control should we add next? Label or Text Input?"  
*Learner Response:* "Text Input, because they need to write words into the system!"

---

## 11. Independent Mini-Task (10 Minutes)

### The Tool Crib Checkout Widget
Assign the learner to map the following 4 requirements to the correct control:
1. Show the worker which tool cabinet they are currently standing at (`"Cabinet #4: Hydraulic Spares"`).
2. Allow the worker to pick the spare part from a verified inventory list (`O-Ring 50mm`, `Piston Seal`, `Hydraulic Fluid 5L`).
3. Allow the worker to type the quantity taken (`2`).
4. Allow the worker to finalize the checkout transaction.

**Learner Deliverable Table:**
| Requirement | Control Type | Recommended Name | Critical Property |
| :--- | :--- | :--- | :--- |
| Cabinet Name Display | Label | `lblCabinetLocation` | `Text` |
| Spare Part Selector | Dropdown | `drpPartSelect` | `Items` |
| Quantity Entry | Text Input | `txtQuantity` | `Default` / `Format` |
| Finalize Transaction | Button | `btnConfirmCheckout` | `OnSelect` |

---

## 12. Common Misconceptions & Corrections

| Plausible Wrong Mental Model | Why the Beginner Thinks This | Trainer Correction & Demonstration |
| :--- | :--- | :--- |
| **"A Label can collect text if I type into it."** | On paper or in Word, text looks like text; beginners think you can click and type anywhere. | Press <kbd>Alt</kbd> or click Preview. Click the label: cursor never appears. A Label is a one-way mirror: information only travels from app to human. |
| **"Text Input is better than Dropdown because it's more flexible."** | Beginners value freedom of typing and think dropdowns restrict the user too much. | Show the database disaster: when 10 workers type "Press-01" in 10 different ways, reporting fails completely. Dropdowns protect data integrity. |
| **"A Button automatically saves data to the server when clicked."** | Beginners are used to website forms where pressing "Submit" automagically does everything. | A button is a dumb physical switch. If its `OnSelect` formula is empty, clicking it is like flipping a disconnected light switch on a wall. |
| **"HintText and Default are the exact same thing."** | Both show text inside the text input box when empty. | `Default` is real data that will be saved to SharePoint if untouched; `HintText` is a ghost placeholder that disappears upon typing and is never saved. |

---

## 13. Knowledge Check (5 Questions)

1. **Question:** Why should the machine identifier in our Apex Plastics incident form be a Dropdown control rather than a Text Input control?  
   *Answer:* A Dropdown forces the operator to pick from verified machine IDs already registered in the plant database, preventing spelling errors, capitalization discrepancies, and invalid machine numbers.
2. **Question (What happens if):** What happens if a developer creates a Button, changes its label to `"SUBMIT"`, but leaves its `OnSelect` property completely blank?  
   *Answer:* When users click the button, it provides visual click feedback (button depresses), but nothing happens: no data is saved, no screen changes, and no notifications are sent.
3. **Question:** You need to show the logged-in operator's full name at the top of the screen. Which control type must you use: Label, Text Input, Dropdown, or Button? Why?  
   *Answer:* A `Label` control, because the operator's name is read-only information (Output) computed by the system, not data being entered or an action being triggered.
4. **Question (Why):** Why does Power Apps provide a `HintText` property on Text Inputs instead of developers having to put a Label next to every single input?  
   *Answer:* `HintText` conserves valuable mobile screen space by placing instructional cues (e.g., `"Enter 6-digit badge #"`) directly inside the box, which automatically vanishes when the user begins typing.
5. **Question:** If you set a Button's `DisplayMode` property to `DisplayMode.Disabled`, how does the button look, and how does it respond to user taps?  
   *Answer:* The button renders in a muted gray color and is completely unresponsive to taps or clicks, signaling to the user that prerequisites (such as filling required fields) have not yet been met.

---

## 14. Final Challenge & Rubric

### The Challenge: "Apex Plastics Quality Inspection Quick-Logger"
**Context:** Quality Inspector Bopha inspects molded plastic parts every hour. She needs a single mobile screen control kit to log inspection passes/fails.  
**Requirements:**
1. Display the current inspection timestamp and inspector name at the top.
2. Allow Bopha to select the Mold Cavity number (`Cavity-A`, `Cavity-B`, `Cavity-C`, `Cavity-D`).
3. Allow Bopha to select the Quality Verdict (`PASS`, `FAIL - Burr`, `FAIL - Bubble`, `FAIL - Warpage`).
4. Allow Bopha to type any defect notes if a defect is found.
5. Provide a clear button to record the verdict into the inspection log.

### 4-Tier Assessment Rubric
| Criteria | Beginning (1 pt) | Developing (2 pts) | Proficient (3 pts) | Exemplary (4 pts) |
| :--- | :--- | :--- | :--- | :--- |
| **Control Role Selection** | Uses wrong controls (e.g. labels for inputs). | Uses text inputs for all choices. | Uses correct controls (Label, Dropdown, TextInput, Button). | Explains exact data integrity benefit of each choice. |
| **Naming Conventions** | Leaves default names (`TextInput1`, `Button1`). | Uses inconsistent names (`InputA`, `btn1`). | Uses standard Hungarian notation (`lblHeader`, `drpVerdict`, `btnLog`). | Consistently names all controls and containers cleanly. |
| **Property Configuration** | Leaves properties default. | Configures `Text` only. | Configures `Text`, `Items`, and `HintText` accurately. | Configures `Items` tables and notes `DisplayMode` rules. |
| **Input vs Action Clarity** | Confuses buttons and inputs. | Understands buttons click, but not properties. | Clearly separates data collection from action triggers. | Articulates complete Input $\rightarrow$ Action $\rightarrow$ Storage lifecycle. |

---

## 15. Optional Review / Homework (<= 15 Minutes)

### "Audit the Broken Form" Exercise
Examine this flawed mobile form snippet from a warehouse receiving dock:
1. `txtDeliveryDate`: Text Input where workers type `"Oct 30 2026"`.
2. `lblVendorName`: Label displaying `"Type Vendor Name Here"`.
3. `txtCondition`: Text Input where workers type `"Good"`, `"Damaged"`, or `"Box crushed"`.
4. `imgSubmit`: An image of a green truck icon with no click action.

**Student Assignment:**
Rewrite this form structure into a clean 4-item specification table containing:
- New Corrected Control Type
- Standard Hungarian Name
- Target Property to configure
- 1-sentence business justification for the change

---

## 16. Connection Map (Curriculum Continuity)

```
BEFORE (Day 13)                 TODAY (Day 14)                 NEXT (Day 15)
[Studio Architecture]    --->   [Control Roles]         --->   [Multi-Screen Journeys]
- Blank Canvas                  - Label = Output               - Navigate(scrSuccess)
- Tree View Hierarchy           - Text Input = Harvest Data    - Back() Navigation
- Hungarian Naming              - Dropdown = Enforce Choices   - Screen Transitions
                                - Button = Trigger Actions     - User Flow Validation
```

