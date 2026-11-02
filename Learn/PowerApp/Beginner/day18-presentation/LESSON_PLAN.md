# DAY 18 LESSON PLAN: Variables — Giving Your App Temporary Memory

**Program**: Microsoft Power Apps Beginner to Pro (27-Day Connected Curriculum)  
**Target Audience**: Absolute Zero Beginners (No coding, no database, no Boolean logic background)  
**Phase**: Phase 6 — Power Fx Fundamentals  
**Duration**: 90 Minutes (Strictly timed)  
**Central Mental Model**:  
`REAL PROBLEM -> PROCESS -> DATA -> UI/SCREEN -> LOGIC/DECISION -> ACTION -> STORAGE -> FEEDBACK -> TEST`  
**Today's Connection Chain**:  
`User Selection -> Formula Sets Variable (Set / UpdateContext) -> In-Memory Storage (RAM) -> Display / Logic on Other Screens`  
**Core Meaning**: A variable is a named storage container in the device's temporary memory (RAM) that holds a piece of information while the app is running.  
**Prior Connection**: Day 17 (Conditions + IF in Power Fx: Form Validation)  
**Forward Bridge**: Day 19 (Collections: In-Memory Multi-Item Tables)

---

## 1. Measurable Objectives (3–5 Measurable Outcomes)
By the end of this 90-minute session, the learner will be able to:
1. **Explain the Concept of App Memory (RAM)**: Define in plain language what a variable is using the waiter's notepad and sticky note analogies.
2. **Distinguish Between Global (`Set`) and Context (`UpdateContext`) Variables**: Explain when to use app-wide memory (`Set`) versus single-screen memory (`UpdateContext`).
3. **Apply the Naming Standard `var` Prefix**: Write professionally structured variable names (e.g., `varCurrentShift`, `varSelectedMachine`, `locIsEditing`).
4. **Pass Values Across Screens Using Variables**: Store a user's department selection on Screen 1 and display it in a banner on Screen 2.
5. **Increment and Toggle Variables**: Construct formulas to increase counters (`Set(varCounter, varCounter + 1)`) and toggle booleans (`UpdateContext({locShowHelp: !locShowHelp})`).

---

## 2. Timed 90-Minute Lesson Agenda
| Time Window | Duration | Segment | Core Activity |
|---|---|---|---|
| **00:00 - 10:00** | 10 Min | Orientation & Retrieval | Spiral Concept Map recap & 4-question memory retrieval |
| **10:00 - 25:00** | 15 Min | The Crisis & Analogy | The \$34,000 Amnesia Crisis at Apex Plastics & Waiter's Notepad Analogy |
| **25:00 - 45:00** | 20 Min | Core Mental Model | Anatomy of `Set(varName, Value)` & Global vs Context memory scope |
| **45:00 - 65:00** | 20 Min | Trainer Demo & Guided Build | Building multi-screen department tracking using `Set(varSelectedDept, ...)` |
| **65:00 - 78:00** | 13 Min | Interactive Lab & Misconceptions | RAM Memory Bank Workbench testing & busting 5 dangerous variable myths |
| **78:00 - 85:00** | 7 Min | 5-Question Mastery Quiz | Timed knowledge-check questions with instant feedback |
| **85:00 - 90:00** | 5 Min | Final Challenge & Bridge | Multi-screen shift badge challenge & Bridge to Day 19 (Collections) |

---

## 3. 5-Minute Concept-Map Recap (Spiral Learning Connection)
Every lesson in our 27-day journey connects backwards and forwards:
- **Yesterday (Day 17)**: We learned how to build validation gates using `If()` and `IsBlank()`. The app can now evaluate True/False and block invalid user actions.
- **Today (Day 18)**: But what happens when an operator selects their shift on `scrWelcome`, taps "Next", and lands on `scrInspection`? Screen 2 has no idea what happened on Screen 1! Today, we give the app short-term memory using **Variables**.
- **Tomorrow (Day 19)**: A variable holds one single value (a number, a word, or a true/false). Tomorrow, we learn about **Collections** — which hold an entire table of rows in memory (like a shopping cart or multi-item defect list)!

---

## 4. Prerequisite Retrieval Questions & Answers
1. **Question**: What function evaluates a condition and performs different actions based on True or False?
   - **Answer**: The `If()` function.
2. **Question**: If an operator enters text into `txtOperator.Text` on Screen 1, can a label on Screen 2 directly read `txtOperator.Text`?
   - **Answer**: No! Controls on other screens are not guaranteed to be loaded in memory; referencing controls across screens causes performance bugs and broken dependencies.
3. **Question**: What happens to temporary screen values when the user closes their web browser?
   - **Answer**: Temporary memory (RAM) is cleared; data is reset unless saved to persistent cloud storage (SharePoint).
4. **Question**: What property runs code when a screen first opens?
   - **Answer**: The `OnVisible` property of the Screen.

---

## 5. Today's "WHY THIS EXISTS" Workplace Problem
### The \$34,000 App Amnesia Crisis at Apex Plastics
Apex Plastics built a 4-screen quality inspection app for the extrusion facility:
- Screen 1: Welcome & Shift Selection (Morning, Evening, Night).
- Screen 2: Machine Selection (Extruder 1 through 8).
- Screen 3: Defect Checklist.
- Screen 4: Final Confirmation & Sign-off.

Because the junior developer did not know how to use variables:
- The developer forced operators to re-type their Operator Name, Shift, and Machine ID on EVERY SINGLE SCREEN!
- Operators spent 4 extra minutes per inspection typing repetitive data on dirty touchscreen tablets.
- Out of frustration, night-shift operators began typing `"X"` and `"A"` into the required fields just to hurry past the screens.
- When an extrusion gear cracked, the investigation team discovered 48 records attributed to operator `"X"` on machine `"A"`. The maintenance team could not locate the failing extruder in time, resulting in a complete gearbox seizure.
- **Total Loss**: \$34,000 in replacement equipment and unrecorded scrap material.
- **Root Cause**: The app had amnesia! It could not remember data from one screen to the next.

---

## 6. Plain-Language Concept Before Technical Vocabulary
- **Everyday English**: When you are assembling furniture, you write a measurement on a small **sticky note** and stick it to your shirt. As you walk from the living room to the garage to cut the wood, you look down at the sticky note to remember the measurement.
- **Power Apps Concept**:
  - Sticky Note = **Variable**
  - Name on the note header = **Variable Name** (`varCutLength`)
  - Writing the number on the note = **`Set()` function**
  - Reading the note later = **Variable Reference** in a formula or label

---

## 7. Everyday Analogy: The Restaurant Waiter's Notepad
When a waiter takes your dinner order at Table 4:
1. The waiter writes: *"Table 4: 2 Steaks, 1 Salmon"* in their pocket notepad.
2. The waiter walks across the dining room to the kitchen.
3. Does the waiter have to bring you to the kitchen so the chef can ask you again what you want to eat? **Never!**
4. The waiter's notepad travels across rooms.
5. In Power Apps, a **Global Variable (`Set`)** is like the waiter's notepad — accessible anywhere in the entire restaurant (app)!

---

## 8. Manufacturing / DX Workplace Example: Apex Plastics Shift Tracking
On `scrShiftSelect`:
- Button 1: Morning Shift (`btnMorning`)
- Button 2: Night Shift (`btnNight`)

```powerfx
// Formula on btnMorning.OnSelect:
Set(varCurrentShift, "Morning");
Set(varShiftLeader, "Sokha Heng");
Navigate(scrMachineSelect)
```

On `scrMachineSelect`, `scrInspection`, and `scrSummary`:
- A top header label has:
```powerfx
// Formula on lblShiftBanner.Text:
"Active Shift: " & varCurrentShift & " | Leader: " & varShiftLeader
```
No re-typing! The app carries the memory seamlessly across all 4 screens!

---

## 9. Visual Cause-and-Effect Architecture
```
[Screen 1: scrWelcome]
Operator clicks "Line 2 - Molding"
           │
           ▼
Formula Executes: Set(varSelectedDept, "Injection Molding")
           │
           ▼
[Device Memory / RAM]
┌──────────────────────────────────────────────┐
│  Variable Name    │  Current Stored Value   │
│  varSelectedDept  │  "Injection Molding"    │
└──────────────────────────────────────────────┘
           │
           ▼
Navigate(scrChecklist)
           │
           ▼
[Screen 2: scrChecklist]
Label: "Active Department: " & varSelectedDept
Output: "Active Department: Injection Molding"  (Instantly displayed!)
```

---

## 10. Trainer Demonstration (Step-by-Step Script)
1. **Show the Problem**: Create Screen 1 with a TextInput `txtWorkerName`. Create Screen 2 with a Label. Show that trying to type `txtWorkerName.Text` into Screen 2 is bad practice and creates cross-screen control dependencies.
2. **Introduce `Set()`**:
   - On Screen 1, add a button named `btnSaveWorker`.
   - Set `OnSelect`: `Set(varWorker, txtWorkerName.Text); Navigate(Screen2)`.
3. **Display the Variable**:
   - Navigate to Screen 2.
   - Insert a Label and set its `Text` property to `varWorker`.
   - Run the app: Type *"Chanthy"* on Screen 1, click button ➔ Screen 2 displays *"Chanthy"*!
4. **Demonstrate Variable Increment**:
   - Add a button `btnAddDefect` with `OnSelect`: `Set(varDefectCount, varDefectCount + 1)`.
   - Show how the number increases by 1 with every tap.
5. **Inspect Power Apps Variables Panel**:
   - Open App Authoring Menu ➔ **Variables** panel.
   - Show students the live value of `varWorker` and `varDefectCount` inside Studio tools.

---

## 11. Guided Learner Practice (Hands-on in Studio)
**Task**: Build a Shift Switcher with Counter:
1. Insert two buttons: `btnMorning` and `btnNight`.
2. Configure `btnMorning.OnSelect`:
   ```powerfx
   Set(varShift, "Day Shift (07:00 - 15:00)");
   Set(varHourlyTarget, 500)
   ```
3. Configure `btnNight.OnSelect`:
   ```powerfx
   Set(varShift, "Night Shift (15:00 - 23:00)");
   Set(varHourlyTarget, 350)
   ```
4. Insert a card with two Labels:
   - Label 1: `varShift`
   - Label 2: `"Target per Hour: " & varHourlyTarget & " units"`
5. Test: Click both buttons and observe the live values change instantly!

---

## 12. Independent Mini-Task
- **Scenario**: At Line 4, operators toggle an inspection guide on and off.
- **Requirement**: Create a button `btnToggleHelp`. When tapped, toggle a local variable named `locShowGuide` between `true` and `false`.
- **Formula**: `UpdateContext({locShowGuide: !locShowGuide})`
- **Hint**: Set the `Visible` property of a help rectangle to `locShowGuide`.

---

## 13. Common Misconceptions & Trainer Corrections
1. **Misconception**: *"Variables are saved permanently to SharePoint."*
   - **Correction**: Variables exist ONLY in device RAM. When the app is closed or reloaded, all variables vanish! To keep data forever, use `Patch()` or `SubmitForm()`.
2. **Misconception**: *"I can name a variable anything, like 'x' or 'data'."*
   - **Correction**: In professional development, always use standard naming prefixes: `var` for Global variables (`varCurrentShift`) and `loc` for Context variables (`locIsLoading`).
3. **Misconception**: *"Set() and UpdateContext() do the exact same thing."*
   - **Correction**: `Set()` creates a **Global variable** available across all screens. `UpdateContext()` creates a **Context variable** available ONLY on the current screen.
4. **Misconception**: *"A variable can hold multiple rows of spreadsheet data."*
   - **Correction**: Standard variables hold a single value or single record. For multi-row tables, Power Apps uses **Collections** (`Collect()`), which we learn in Day 19.
5. **Misconception**: *"Variables make apps faster no matter how many you use."*
   - **Correction**: Storing hundreds of massive text blocks in global memory causes tablet slowdowns. Keep variables lean and clean up temporary state when no longer needed.

---

## 14. 5 Knowledge-Check Questions with Explanations
1. **What is the primary purpose of a variable in Power Apps?**
   - *Answer*: To store temporary data in device memory (RAM) while the app is running.
2. **Which function creates an app-wide (Global) variable accessible across all screens?**
   - *Answer*: `Set(VariableName, Value)`.
3. **What naming prefix is standard industry practice for global variables?**
   - *Answer*: `var` (e.g., `varUserRole`, `varSelectedPlant`).
4. **What happens to the value of `varCurrentShift` when an operator closes their web browser?**
   - *Answer*: The memory is wiped and the value is lost (resets to blank upon next launch).
5. **Which formula correctly increments an existing number variable by 1?**
   - *Answer*: `Set(varCount, varCount + 1)`.

---

## 15. Final Challenge with Expected Result & Rubric
### Challenge: Apex Plastics Cross-Screen Defect Tally
- **Context**: Quality inspectors inspect 5 parts per batch across Screen 1 (Visual Check) and Screen 2 (Weight Check).
- **Requirement**:
  1. Initialize `varBatchID` with `"BATCH-" & Year(Today()) & "-001"` on `App.OnStart`.
  2. On Screen 1, clicking "Defect Found" increments `varDefectTotal` by 1 and navigates to Screen 2.
  3. On Screen 2, display `varBatchID` in the header and `varDefectTotal` in a warning badge.
  4. If `varDefectTotal > 0`, color the badge red (`Color.Red`); otherwise green (`Color.Green`).

### Scoring Rubric (10 Points Total):
- **3 Points**: Correctly sets global variable using `Set()` with appropriate naming prefix.
- **3 Points**: Correctly increments counter variable with `Set(varDefectTotal, varDefectTotal + 1)`.
- **2 Points**: Cleanly accesses and displays variable values across different screens.
- **2 Points**: Dynamically binds control color using conditional variable check.

---

## 16. Optional Homework / 15-Minute Review Exercise
1. In your personal practice app, create a "Theme Switcher":
   - Add a Toggle control or button.
   - Set a variable: `Set(varIsDarkMode, !varIsDarkMode)`.
   - Bind the screen's `Fill` property to: `If(varIsDarkMode, Color.Black, Color.White)`.
2. Observe how one single variable instantly changes the visual state of the entire screen!

---

## 17. Connection Map: Before -> Today -> Next
- **Previous Lesson (Day 17)**: Conditions & IF — Validating user inputs before taking action.
- **Today's Lesson (Day 18)**: Variables — Storing temporary data in device memory across screens (`Set` & `UpdateContext`).
- **Next Lesson (Day 19)**: Collections — Storing multi-row tables in temporary memory (`Collect` & `ClearCollect`).

