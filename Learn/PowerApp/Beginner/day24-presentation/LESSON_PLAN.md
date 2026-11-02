# DAY 24 TRAINER MANUAL: READ & UPDATE — COMPLETE THE RECORD LIFECYCLE
**Phase:** CRUD Operations (Part 2: The "R" & "U" — Read and Update)  
**Central Mental Model:** `REAL PROBLEM -> PROCESS -> DATA -> UI/SCREEN -> LOGIC/DECISION -> ACTION -> STORAGE -> FEEDBACK -> TEST`  
**Today's Connection Chain:** `Gallery (galRequests) -> Selected Record (galRequests.Selected) -> View (ViewForm) -> Edit (EditForm) -> Save (SubmitForm) -> Refreshed Result (Gallery Refresh)`  
**Duration:** Exactly 90 Minutes (Spiral-Learning Pattern)

---

## 1. 3-5 MEASURABLE LEARNING OBJECTIVES
By the end of this 90-minute lesson, an absolute zero beginner student will be able to:
1. **Explain the Complete CRUD Lifecycle:** Articulate verbally and diagrammatically how **C**reate (Day 23), **R**ead (Day 21), **U**pdate (Today), and **D**elete form a continuous business data lifecycle in SharePoint.
2. **Execute the Read-to-Edit Transition:** Correctly configure an Edit Icon inside a gallery to execute `EditForm(frmRequest); Navigate(scrForm, ScreenTransition.Fade)` so that existing field values populate the DataCards automatically.
3. **Master `Form.Item = galRequests.Selected`:** Explain why `Item` tells the form *which* row to modify, and how `SubmitForm()` automatically issues an HTTP PATCH update instead of creating duplicate records.
4. **Implement the Discard Pattern via `ResetForm()`:** Configure a "Cancel / Discard Changes" button using `ResetForm(frmRequest); Back()` to prevent accidental or partial edits from polluting the database.
5. **Diagnose and Resolve the "Duplicate Row" Bug:** Explain the exact operational difference between `NewForm()` and `EditForm()`, and how misconfiguring form modes causes duplicate entries when editing existing tickets.

---

## 2. 5-MINUTE CONCEPT-MAP RECAP (CONNECTING PRIOR LESSONS)
```
[Day 19: SharePoint Lists]           [Day 21: Gallery (Read Many)]        [Day 22: Forms & DataCards]
Persistent Storage Columns       ──>  galRequests.Items = Maintenance ──>  frmRequest.Item = Selected
                                                 │                                   │
                                                 ▼                                   ▼
[Day 23: Create Records]         ───> [TODAY - DAY 24: READ & UPDATE] ───> [Day 25: Full System Architecture]
NewForm() -> SubmitForm()             EditForm() -> Item = Selected        Complete Multi-Screen Apps
(The "C" in CRUD)                     SubmitForm() Updates Same Row         (End-to-End Enterprise DX)
```
- **Trainer Script (Recap):**
  > "Welcome back, team! Let's trace our path on the wall.
  > On **Day 19**, we created our SharePoint database.
  > On **Day 21**, we learned how to **Read** many records using a Gallery.
  > On **Day 22**, we learned how to inspect **one record** using a Form.
  > And yesterday on **Day 23**, we mastered **Create**—we pressed `NewForm()`, typed a new machine breakdown, pressed `SubmitForm()`, and watched SharePoint mint a brand-new row.
  > 
  > But what happens the next morning?
  > The maintenance technician arrives. The machine motor is fixed! The technician needs to open that exact ticket, add notes on what was repaired, and change the status from 'New' to 'Completed'.
  > If they click `NewForm()`, they create a duplicate ticket!
  > Today on **Day 24**, we conquer **Read and Update**—the 'R' and 'U' in CRUD. We learn how to modify history without creating duplicates!"

---

## 3. PREREQUISITE RETRIEVAL QUESTIONS & DIAGNOSTIC HOOKS
1. **Question:** In Day 23, what does `NewForm(frmRequest)` do to the form's `Item` property and internal mode?
   - *Answer:* It switches the mode to `FormMode.New`, ignores `Item`, and blanks out all DataCards to prepare a brand-new record.
2. **Question:** In Day 22, if a form's `Item` property is set to `galRequests.Selected`, what record does the form display?
   - *Answer:* It displays the exact single record that the operator clicked on in the gallery.
3. **Question:** In Day 22, what is the difference between `FormMode.View` and `FormMode.Edit`?
   - *Answer:* `View` renders fields as read-only labels that cannot be clicked or edited. `Edit` renders fields as interactive text boxes and dropdowns ready to accept changes.
4. **Question:** In Day 23, where must we place `Notify()` to ensure it only runs when data is safely stored in SharePoint?
   - *Answer:* Inside the form's `OnSuccess` property hook, never directly on the submit button!

---

## 4. TODAY'S "WHY THIS EXISTS" WORKPLACE CRISIS
### The Ghost Duplicate Nightmare at Apex Plastics ($18,000 Wasted Overtime)
- **The Workplace Scene:**
  Yesterday, Operator Somnang logged Ticket #1043: *"Extruder Motor High Vibration"*.
  At 8:00 AM the next day, Senior Mechanic Bopha replaced the worn motor bearings and balanced the rotor. The extruder was purring smoothly at 100% capacity.
- **The Failure:**
  Bopha opened the tablet to close the ticket. Because the app developer only knew yesterday's lesson (Day 23 - Create), the only button on the screen was **"+ New Ticket"**.
  Bopha clicked "+ New Ticket" and typed: *"Motor bearings replaced on Extruder - ALL FIXED"*.
  Now SharePoint had **two different tickets** for the same motor:
  - Ticket #1043: Status = "New" (High Priority)
  - Ticket #1044: Status = "New" (High Priority - "All Fixed")
- **The Operational Disaster:**
  At 2:00 PM, the second-shift maintenance supervisor saw Ticket #1043 still sitting in "New / High Priority". Believing the extruder was about to fail, he halted Production Line 4 for 4 hours, called in 3 off-duty contractors at weekend overtime rates, and tore down the extruder again—only to find brand-new bearings already installed!
- **The Financial Impact:**
  \$18,000 in lost production output and emergency contractor overtime.
- **The Lesson:**
  In enterprise software, creating records is only 25% of the story. You must provide an **Update Path** (`EditForm` + `Item = galRequests.Selected`) so technicians can update the status of existing records rather than cluttering databases with duplicate rows!

---

## 5. PLAIN-LANGUAGE CONCEPT BEFORE TECHNICAL VOCABULARY
- **Plain English Concept:**
  When you move to a new apartment, you don't throw away your passport and apply for citizenship as a brand-new human being. You take your **existing passport** to the government office, the clerk flips to your address page, updates your address with an official stamp, and hands your passport back to you. Your passport number stays identical!
- **Mapping to Power Apps:**
  - *Your Existing Passport* = SharePoint Record with unique `ID` (e.g. Ticket #1043)
  - *Finding your passport in the drawer* = Gallery selection (`galRequests.Selected`)
  - *Flipping open to inspect details* = View mode (`ViewForm(frmRequest)`)
  - *Unlocking the page to write changes* = Edit mode (`EditForm(frmRequest)`)
  - *Stamping the official change* = Save execution (`SubmitForm(frmRequest)`)
  - *Passport returned with updated address* = Gallery refresh displaying updated status

---

## 6. EVERYDAY ANALOGY: EDITING A SMARTPHONE CONTACT
1. **Open the Phone Contacts List (Read Many):**
   You scroll through 200 names. You find "Mom". That is the **Gallery** (`Items = Contacts`).
2. **Tap "Mom" to View Profile (Read One):**
   Her name, phone number, and photo appear on screen. You cannot accidentally delete or edit text because you are just looking. That is **`ViewForm()`**.
3. **Tap the Pencil / "Edit" Button in Top-Right:**
   The static text transforms into editable text boxes with cursor prompts. Her current number is already filled in! That is **`EditForm()`** with `Item = galRequests.Selected`.
4. **Change the Last 4 Digits & Tap "Done":**
   You update her number and tap "Done". Your phone does not create a second "Mom" in your address book. It updates her existing contact record! That is **`SubmitForm()`** in Edit mode.
5. **What if you made a typo and want to cancel?**
   You tap "Cancel". The phone discards what you typed and reverts to her original number. That is **`ResetForm()`**.

---

## 7. MANUFACTURING / DX WORKPLACE ARCHITECTURE
```
[Line Operator / Technician in Factory]
            │
            ▼ 1. Browses Gallery on scrDashboard
   galRequests.Items = MaintenanceRequests
            │
            ▼ 2. Taps row #1043 ("Motor Vibration")
   galRequests.Selected is now Row #1043
            │
            ▼ 3. Taps 'Edit Work Order' Icon inside row or on detail screen
   OnSelect = EditForm(frmRequest); Navigate(scrEdit, ScreenTransition.Fade)
            │
            ▼ 4. Power Apps Studio prepares Form
   frmRequest.Mode = FormMode.Edit
   frmRequest.Item = galRequests.Selected  <-- Loads Row #1043 values into DataCards!
            │
            ▼ 5. Technician updates Status & Notes
   drpStatus.Selected = "Completed"
   txtTechnicianNotes = "Replaced bearings & balanced rotor"
            │
            ▼ 6. Technician taps 'Save Updates' Button
   OnSelect = SubmitForm(frmRequest)
            │
            ▼ 7. Power Apps Network Dispatch
   Recognizes FormMode.Edit -> Sends HTTP PATCH targeting SharePoint Row ID #1043
            │
            ▼ 8. SharePoint List Engine
   Updates fields on Row #1043 -> Modified = Now() -> Does NOT create new row!
            │
            ▼ 9. Confirmation Event Fires in App
   frmRequest.OnSuccess = Notify("Work Order #1043 Updated!", NotificationType.Success); 
                          Navigate(scrDashboard, ScreenTransition.Cover)
```

---

## 8. VISUAL CAUSE-AND-EFFECT PIPELINE
| User Action / Event | Power Fx Code Executed | Internal Form State | SharePoint Backend State | Resulting UI Feedback |
| :--- | :--- | :--- | :--- | :--- |
| **Tap Gallery Row** | *Row Click* | `galRequests.Selected` points to row memory | No network call | Row highlights blue |
| **Tap 'Edit' Icon** | `EditForm(frmRequest); Navigate(scrEdit)` | Mode switches to `Edit`; pre-populates DataCards with `Selected` | No network call | Screen transitions to editable form |
| **Change Status to 'Done'** | *Dropdown Selection* | Memory buffer updates `DataCardValue` | No network call | Dropdown shows "Completed" |
| **Tap 'Cancel' Button** | `ResetForm(frmRequest); Back()` | Reverts DataCards back to originally saved values | No network call | Discards typing, returns to previous screen |
| **Tap 'Save Updates'** | `SubmitForm(frmRequest)` | Validates cards; issues HTTP PATCH with `ID = 1043` | SharePoint updates existing row #1043 | Loading spinner appears |
| **SharePoint Confirms** | `frmRequest.OnSuccess` | Fires OnSuccess formula | Row committed with new timestamp | Green banner: "Ticket Updated!", gallery shows "Completed" pill |

---

## 9. TRAINER DEMONSTRATION SCRIPT
- **Setting the Stage (Trainer Persona):**
  > *"Look at my screen. We have our gallery with Ticket #1043 that we created yesterday. Notice its status pill is yellow: 'New'.*
  > *Now, watch what happens if an untrained developer tries to build an edit button."*

- **The Amateur Mistake Demonstration:**
  > *"If I create a button that says 'Update' and I write `NewForm(frmRequest)`, watch what happens when I tap it...*
  > *All the text boxes wipe blank! The technician has no idea what the original problem was, and if they save, SharePoint creates Ticket #1044! That is the \$18,000 Apex Plastics mistake."*

- **The Master Pattern Demonstration:**
  > *"Now, let's build the true enterprise Update flow:*
  > *Step 1: Select the Edit Form `frmRequest`.*
  > *Look at its `Item` property in the formula bar. We set:*
  > `Item = galRequests.Selected`
  > *Step 2: Inside our gallery row, we insert an Edit pencil icon `icnEdit`.*
  > *In its `OnSelect` property, we write:*
  > `EditForm(frmRequest); Navigate(scrEdit, ScreenTransition.Fade)`
  > *Notice: We tell Power Apps: 'Put the form in Edit mode, load the selected row, and take me to that screen!'*
  > *Step 3: On `scrEdit`, our Save button has:*
  > `SubmitForm(frmRequest)`
  > *Notice that the code on the Save button is identical to Day 23!*
  > *Why? Because `SubmitForm()` is smart! If the form is in New mode, it creates. If the form is in Edit mode, it updates! The form's mode tells `SubmitForm` what SQL operation to perform!"*

---

## 10. HANDS-ON GUIDED LEARNER PRACTICE (STEP-BY-STEP)
1. **Activity 24.1: Configure the Gallery Edit Icon**
   - In `scrGallery`, select the first template row inside `galRequests`.
   - Insert an `Edit` pencil icon (`icnEdit`) on the right side of the row.
   - Set `icnEdit.OnSelect = EditForm(frmRequest); Navigate(scrForm, ScreenTransition.Fade)`.
2. **Activity 24.2: Bind the Form's Item Property**
   - Click the pencil icon while holding <kbd>Alt</kbd> to jump to `scrForm`.
   - Select `frmRequest` in the Tree View.
   - Set `frmRequest.DataSource = MaintenanceRequests`.
   - Set `frmRequest.Item = galRequests.Selected`.
   - Observe that the DataCards are instantly populated with the clicked ticket's title, priority, and department!
3. **Activity 24.3: Configure the Discard / Cancel Button**
   - Next to the Save button, insert a secondary Button named `btnCancel`.
   - Set `btnCancel.Text = "Cancel"`.
   - Set `btnCancel.Fill = Color.Transparent` and `BorderColor = ColorValue("#94a3b8")`.
   - Set `btnCancel.OnSelect = ResetForm(frmRequest); Back()`.
4. **Activity 24.4: Configure Dynamic OnSuccess Feedback**
   - Select `frmRequest` in the Tree View.
   - Set `frmRequest.OnSuccess = Notify("Work Order #" & frmRequest.LastSubmit.ID & " updated successfully!", NotificationType.Success); Navigate(scrGallery, ScreenTransition.Cover)`.
5. **Activity 24.5: Full End-to-End Test**
   - Press <kbd>F5</kbd>.
   - Click the pencil icon on Ticket #1043.
   - Change Priority from "Medium" to "High".
   - Tap "Submit Updates".
   - Verify that the green confirmation banner appears, the app returns to the gallery, and Ticket #1043 now displays a red "High" pill without creating any duplicate rows!

---

## 11. INDEPENDENT PRACTICE TASK (THE STATUS WORKFLOW SYSTEM)
- **Scenario:**
  The maintenance supervisor needs a 3-way status progression button directly on the detail screen:
- **Task Requirements:**
  1. Ensure `frmRequest` has the `Status` DataCard visible (Choices: "New", "In Progress", "Completed").
  2. Add a quick-action button on `scrDetail` labeled `"Mark as Completed"`.
  3. When clicked, it must:
     - Change the status dropdown or update the form to "Completed".
     - Execute `SubmitForm(frmRequest)`.
  4. Ensure that after saving, `galRequests` reflects "Completed" with a green badge.
- **Success Criteria:**
  - Editing Ticket #1043 updates the existing record in SharePoint.
  - SharePoint List row count does not increase.
  - Clicking "Cancel" reverts any unsaved changes and returns to the gallery safely.

---

## 12. 3-5 COMMON MISCONCEPTIONS & HOW TO FIX THEM
### Misconception 1: "SubmitForm() always inserts a brand-new row into SharePoint."
- *Plausible Wrong Mental Model:* Student thinks `SubmitForm()` is hardcoded to do SQL `INSERT`. They assume you need another function like `UpdateForm()` or `Patch()` to edit.
- *Why It Breaks:* There is no `UpdateForm()` function in Power Apps! `SubmitForm()` inspects `Form.Mode`. If `Mode == FormMode.New`, it inserts. If `Mode == FormMode.Edit`, it updates the row identified by `Form.Item`.
- *Trainer Correction:*
  > "`SubmitForm()` is like a smart postal worker. If the envelope says 'New Contract', she files it into a new folder. If the envelope has an existing ID badge, she updates the existing folder. The command is the same; the form mode dictates the behavior!"

### Misconception 2: "If I don't set Form.Item, Power Apps will edit whichever row I last clicked."
- *Plausible Wrong Mental Model:* Student assumes Power Apps magically links the form to the gallery without setting `Item`.
- *Why It Breaks:* If `Item` is blank in `FormMode.Edit`, the form displays *"No item to display"* and locks all fields. You must explicitly tell the form: `Item = galRequests.Selected`.
- *Trainer Correction:*
  > "A form cannot read your mind. You must give it the address of the record: `Item = galRequests.Selected`."

### Misconception 3: "Closing the browser is the best way to cancel an edit."
- *Plausible Wrong Mental Model:* Student thinks an app doesn't need a Cancel button because users can just tap the back button.
- *Why It Breaks:* If the user taps Back without `ResetForm()`, their half-typed text remains cached in the form buffer. If they click a different ticket later, the cached text might pollute the next record!
- *Trainer Correction:*
  > "Always provide an escape hatch! `ResetForm(frmRequest)` wipes unsaved typing and reloads the saved truth from SharePoint."

---

## 13. 5 KNOWLEDGE-CHECK QUESTIONS (WITH ARCHITECTURAL RATIONALES)

### Question 1: How does `SubmitForm(frmRequest)` decide whether to create a new row or update an existing row in SharePoint?
- A. By checking the color of the submit button.
- B. By inspecting the form's `Mode`: `FormMode.New` inserts a new row, while `FormMode.Edit` updates the row matching `Item`. **(Correct)**
- C. By counting the number of characters typed in the Title field.
- D. By asking the operator with a pop-up confirmation dialog.
- *Architectural Rationale:* The form mode acts as a state switch. In Edit mode, Power Apps includes the row's primary key (`ID`) in the network payload, directing SharePoint to execute an HTTP PATCH update.

### Question 2: Why must `ResetForm(frmRequest)` be called when an operator clicks "Cancel"? *(The "Why" Question)*
- A. Because Power Apps Studio will lock the computer if unsaved edits exist.
- B. Because without ResetForm, unsubmitted text remains cached in memory and can leak into the next record viewed. **(Correct)**
- C. Because ResetForm deletes the record from SharePoint to keep the database small.
- D. Because SharePoint lists require a Reset token every 24 hours.
- *Architectural Rationale:* Form controls maintain internal state. `ResetForm()` clears the dirty buffer and resets all card values back to the default values of `Form.Item`.

### Question 3: What happens if a developer sets a form to `FormMode.Edit`, but leaves the `Item` property completely blank? *(The "What Happens If" Question)*
- A. The form edits the very first row in the SharePoint list automatically.
- B. The form crashes and logs the user out.
- C. The form displays "No item to display" and all DataCards become disabled. **(Correct)**
- D. SharePoint creates an empty record called "Ghost Ticket".
- *Architectural Rationale:* An EditForm cannot enter edit mode without a target record reference. If `Item` is null or blank, the form renders its default empty state.

### Question 4: Which formula correctly transitions a user from a gallery row to the editing screen?
- A. `NewForm(frmRequest); Navigate(scrEdit)`
- B. `EditForm(frmRequest); Navigate(scrEdit, ScreenTransition.Fade)` **(Correct)**
- C. `ResetForm(frmRequest); SubmitForm(frmRequest)`
- D. `ViewForm(frmRequest); Exit()`
- *Architectural Rationale:* You must transition the form into `FormMode.Edit` before navigating, ensuring the DataCards render with active input controls populated by `galRequests.Selected`.

### Question 5: What does the acronym CRUD represent in enterprise software engineering?
- A. Compile, Run, Undo, Debug
- B. Create, Read, Update, Delete **(Correct)**
- C. Column, Row, User, Database
- D. Calculate, Route, Upload, Download
- *Architectural Rationale:* CRUD defines the four foundational data operations supported by every transactional database and enterprise software platform globally.

---

## 14. FINAL CHALLENGE & RUBRIC
### The Factory Work Order Lifecycle Challenge
- **Prompt:**
  Build a seamless, multi-screen work order lifecycle:
  1. `scrGallery`: Shows all maintenance requests with a status badge. Each row contains an Edit pencil icon and a View eye icon.
  2. `scrView`: Contains `frmView` (`FormMode.View`, `Item = galRequests.Selected`) allowing read-only inspection.
  3. `scrEdit`: Contains `frmEdit` (`FormMode.Edit`, `Item = galRequests.Selected`) allowing status and notes updates.
  4. Include a working "Cancel" button that calls `ResetForm(frmEdit); Back()`.
  5. Include a "Save Updates" button that updates the existing row and displays: `"Work Order #" & frmEdit.LastSubmit.ID & " updated successfully!"`.

### Evaluation Rubric:
| Criterion | Level 1: Novice (0-1 pts) | Level 2: Capable (2-3 pts) | Level 3: Master (4-5 pts) |
| :--- | :--- | :--- | :--- |
| **Edit Navigation** | Navigates without `EditForm`; cards stay in View or New mode. | Calls `EditForm` but omits transition animations. | Seamlessly combines `EditForm` and `Navigate` with zero visual flicker. |
| **Item Binding** | `Item` left blank, resulting in "No item to display". | Sets `Item = galRequests.Selected`, but mixes up form names. | Flawless binding of `Item = galRequests.Selected` across View and Edit forms. |
| **Duplicate Prevention** | Submitting creates a duplicate ticket in SharePoint. | Updates row, but doesn't handle validation. | Confirmed zero duplicate rows; existing row updated via HTTP PATCH. |
| **Cancel Architecture** | No Cancel button; user forced to reload app. | Cancel button navigates back without `ResetForm`. | Implements `ResetForm(frmEdit); Back()`, cleanly discarding unsaved memory cache. |

---

## 15. OPTIONAL REVIEW / HOMEWORK (< 15 MINUTES)
1. **The State Machine Reflection:**
   On a sheet of paper, draw a diagram of the three Form Modes:
   - `FormMode.New` (Blank Canvas &bull; HTTP POST)
   - `FormMode.Edit` (Pre-populated Canvas &bull; HTTP PATCH)
   - `FormMode.View` (Read-only Canvas &bull; Zero Network Transmission)
   Write down which Power Fx function transitions the form into each mode.
2. **Explore `galRequests.Selected.Modified`:**
   In your Power Apps Studio, add a sub-label in your gallery row displaying:
   `"Last modified: " & Text(ThisItem.Modified, DateTimeFormat.ShortDateTime24)`
   Observe how saving edits updates this timestamp automatically in SharePoint!

---

## 16. CONNECTION MAP: BEFORE -> TODAY -> NEXT
```
┌────────────────────────────────────────────────────────────────────────┐
│ BEFORE (Days 21, 22, 23)                                               │
│ • Day 21: Gallery (Reading many records with Items and ThisItem)       │
│ • Day 22: Form Architecture (DataCards, Form Modes, Item binding)      │
│ • Day 23: Create Records (NewForm, SubmitForm, OnSuccess, Storage)     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ TODAY (Day 24) - READ & UPDATE (The "R" and "U" in CRUD)               │
│ • EditForm(frmRequest) switches form into interactive Update mode      │
│ • Item = galRequests.Selected pre-populates existing column values     │
│ • SubmitForm() intelligently updates existing row instead of duplicate │
│ • ResetForm() provides safety escape hatch to discard unsaved typing   │
│ • Complete CRUD lifecycle: Create -> Read -> Update -> Storage         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ NEXT (Day 25) - COMPLETE SYSTEM ARCHITECTURE                           │
│ • Planning an entire multi-screen application from scratch             │
│ • Connecting Home -> Gallery -> View -> Edit -> Create -> Feedback     │
│ • Unified Navigation, Variable State, and Role-Based User Experience   │
└────────────────────────────────────────────────────────────────────────┘
```
