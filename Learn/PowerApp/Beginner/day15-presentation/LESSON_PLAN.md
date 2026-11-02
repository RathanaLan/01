# Day 15: Navigation: Connect Screens into a Flow
**Phase 5: Canvas Studio Implementation**  
**Estimated Time:** Exactly 90 Minutes  
**Central Mental Model:** `REAL PROBLEM -> PROCESS -> DATA -> UI/SCREEN -> LOGIC/DECISION -> ACTION -> STORAGE -> FEEDBACK -> TEST`  
**Today's Connection Chain:** `user action -> OnSelect -> Navigate() / Back() -> next screen`  
**Core Meaning:** Navigation turns isolated screens into the coherent business journey designed on paper. Without navigation, users get trapped, submit duplicate tickets, or panic without confirmation.  
**Prior Connection:** Day 14 (Controls: Input, Action, Output) + Day 12 (Screen Architecture & Wireframes).  
**Forward Bridge:** Day 16 (Dynamic Behavior: Making controls react dynamically using Power Fx properties and conditions).

---

## 1. Measurable Objectives (3–5 Outcomes)
By the end of this 90-minute lesson, the absolute zero beginner will be able to:
1. **Explain the Functional Role of Navigation in App Architecture:** Articulate why isolated screens must be stitched together with explicit transition logic to complete the business process.
2. **Author and Explain the `Navigate()` Function in Power Fx:** Construct valid `Navigate(TargetScreen, TransitionEffect)` formulas, explaining what each argument instructs the engine to do.
3. **Differentiate Between `Back()` and Forward Navigation:** Explain the concept of the screen history stack and choose accurately between returning the user backwards (`Back()`) versus routing them forward (`Navigate()`).
4. **Design and Implement Essential Safety Routes:** Add intuitive Cancel, Back, and Success Confirmation pathways to prevent "trapped operator" panics and duplicate submissions.

---

## 2. 5-Minute Concept-Map Recap (The Connected Journey)

| Phase & Day | Concept Mastered | Connection to Today (Day 15) |
| :--- | :--- | :--- |
| **Day 1: System Foundation** | Input $\rightarrow$ Process $\rightarrow$ Output | An app is a machine. A multi-screen app moves the user through these phases across distinct physical views. |
| **Day 12: Screen Architecture** | Wireframing user tasks into screens | We planned 3 distinct screens on paper: `scrHome` (Dashboard), `scrNewRequest` (Form), and `scrSuccess` (Confirmation). |
| **Day 13: Studio Mapping** | Tree View and Hungarian naming | We created blank screens in Studio and named them with the `scr` prefix (`scrHome`, `scrNewRequest`). |
| **Day 14: Controls & Properties** | Input, Action, Output | We configured `btnSubmitTicket` and learned that buttons are mechanical switches waiting for an `OnSelect` formula. |
| **TODAY (Day 15)** | **Navigation & Screen Flows** | **We connect those buttons to navigation formulas (`Navigate`, `Back`), transforming static pages into a fluid, end-to-end user journey.** |
| **Day 16 (Next)** | Dynamic Properties & Formulas | We will make controls react to user data—locking buttons, hiding fields, and showing warnings dynamically. |

---

## 3. Prerequisite Retrieval Practice (Warm-Up Questions)

1. **Question:** In Day 13, what Hungarian prefix did we establish for Screen controls in the Tree View?  
   *Answer:* The `scr` prefix (e.g., `scrHome`, `scrNewRequest`, `scrSuccessConfirmation`).
2. **Question:** In Day 14, which property on a Button control determines what action happens when an operator taps it?  
   *Answer:* The `OnSelect` property.
3. **Question:** If a button has `DisplayMode = DisplayMode.Disabled`, what happens when the user clicks it?  
   *Answer:* Nothing happens; the button is grayed out and its `OnSelect` formula is ignored.
4. **Question:** In Day 12, what was the primary purpose of the Confirmation Screen (`scrSuccess`)?  
   *Answer:* To provide immediate, unambiguous feedback to the user that their data was successfully received, showing their generated Ticket ID and relieving their anxiety.

---

## 4. Today's "WHY THIS EXISTS" Problem (The Workplace Crisis)

### The "Trapped Operator Panic" at Apex Plastics
At Apex Plastics, technician Somnang proudly built three screens in Studio for the incident reporting system:
- `scrHome` (The dashboard listing recent machine repairs)
- `scrNewRequest` (The 4-question breakdown form)
- `scrSuccess` (The confirmation card with a green checkmark)

However, Somnang treated them as three separate islands. He never connected them with navigation formulas.
1. **The Trapped Operator:** Operator Dara opened the app on his tablet and tapped a link that placed him directly into `scrNewRequest`. He realized he tapped it by accident—he just wanted to check production numbers. But there was **no Back button, no Cancel button, and no Home button** anywhere on the screen!
2. **The Forced Garbage Submission:** Dara felt completely trapped. Believing the only way out was to submit something, he typed `"test asdf"` into the notes and tapped Submit.
3. **The Silent Failure:** When Dara tapped Submit, **nothing moved**. The screen didn't change, no message appeared, and the form remained sitting there. Dara assumed the tablet didn't register his finger tap. He tapped Submit **8 more times** in rapid succession!
4. **The Disaster:** Dara created **9 duplicate breakdown tickets** for Press #3. Maintenance dispatchers received 9 high-priority alarms, panicked, and sent three senior hydraulic engineers running across the factory floor to a machine that was running perfectly! Meanwhile, a real bearing failure on Press #1 was ignored for 2 hours, resulting in a burned gearbox.

**Trainer Core Message:**  
*"An app without navigation is a hotel where every room has a lock on the outside and no doors between them. If you do not provide clear pathways forward and backward, your users will panic, break your workflow, and corrupt your database."*

---

## 5. Plain-Language Concept (Before Technical Vocabulary)

Think of screens as **physical rooms in an industrial building**:
- **The Room (Screen / `scr`):** Each room is built for one specific activity. The Reception lobby is for greeting; the Medical office is for checkups; the Loading dock is for shipping. You do not do surgery in the reception lobby.
- **The Doorway (Button / `btn`):** To get from the Reception lobby into the Doctor's office, you walk up to a physical door and turn the handle.
- **The Navigation Instruction (`Navigate`):** The sign on the door says: *"Walk forward into Room B."*
- **The Return Route (`Back`):** When your appointment is finished, you do not jump out the window; you step backwards through the doorway you entered.
- **The Visual Door Swing (Screen Transition):** Does the door slide open smoothly, fade like a curtain, or pop instantly?

---

## 6. Everyday Analogy: The Bank ATM Cash Withdrawal

When you withdraw cash from an automated bank machine:
1. **Screen 1 (Welcome Screen):** Displays *"Please insert card"*. You insert your card $\rightarrow$ ATM automatically **Navigates** to Screen 2.
2. **Screen 2 (PIN Entry Screen):** Asks for your 4-digit code. Notice the big button on the side: **"Cancel / Return Card"**. That is your escape route (`Back()`). If you change your mind, you are not trapped!
3. **Screen 3 (Account Choice):** You pick *"Checking Account"* $\rightarrow$ ATM **Navigates** to Screen 4.
4. **Screen 4 (Amount Selection):** You tap *"$100"* $\rightarrow$ ATM processes transaction $\rightarrow$ **Navigates** to Screen 5.
5. **Screen 5 (Dispense & Receipt Confirmation):** Displays *"Please collect your cash and receipt"*. You take the cash $\rightarrow$ Screen automatically returns to Screen 1.

**Imagine if the ATM gave you the cash, but remained frozen on Screen 4 showing the "$100" button!**  
You would immediately tap it again, panic, call the bank manager, and wonder if your account was drained twice. That is the exact panic an operator feels when an app lacks a Confirmation Screen!

---

## 7. Manufacturing/DX Workplace Architecture (Apex Plastics)

Our complete multi-screen incident reporting journey connects three specialized screens:

```
+------------------+          btnNewIncident          +---------------------+
|     scrHome      | -------------------------------> |    scrNewRequest    |
| (Plant Overview) |                                  | (Data Entry Form)   |
+------------------+ <------------------------------- +---------------------+
         ^                         btnCancel / icnBack           |
         |                              (Back())                 | btnSubmitTicket
         |                                                       | (Navigate to scrSuccess)
         |                                                       v
         |                   btnReturnHome            +---------------------+
         +------------------------------------------- | scrSuccessConfirm   |
                                (Navigate to scrHome) | (Ticket # & Status) |
                                                      +---------------------+
```

---

## 8. Visual Cause-and-Effect Architecture

```
USER INTENTION           POWER FX FORMULA                                   ENGINE CONSEQUENCE
Operator taps "+ New" -> Navigate(scrNewRequest, ScreenTransition.Cover) -> Smoothly slides Form over Home
Operator taps Cancel  -> Back(ScreenTransition.UnCover)                  -> Reverses history; pops back to Home
Operator taps Submit  -> Navigate(scrSuccess, ScreenTransition.Fade)     -> Transitions to Confirmation view
Operator taps Finish  -> Navigate(scrHome, ScreenTransition.Fade)        -> Returns clean slate to Dashboard
```

---

## 9. Trainer Demonstration Script (Step-by-Step in Studio)

### Step 1: Inspecting the Tree View
1. In Power Apps Studio, observe the Tree View. Point out `scrHome` and `scrNewRequest`.
2. Click `+ New screen` $\rightarrow$ select `Blank`.
3. In Tree View, immediately rename `Screen1` to `scrSuccessConfirmation`.
4. Add a header Label: `"Ticket Logged Successfully!"` and a confirmation text: `"Maintenance Team dispatched."`.

### Step 2: Wiring Forward Navigation from Home to Form
1. Click `scrHome` in the Tree View.
2. Select `btnNewTicket` on the canvas.
3. In the Property dropdown (top left of formula bar), ensure `OnSelect` is selected.
4. Type the formula:
   ```powerfx
   Navigate(scrNewRequest, ScreenTransition.Cover)
   ```
5. Explain every part to the learner:
   - `Navigate`: The command to change screens.
   - `scrNewRequest`: The exact name of the destination screen in Tree View.
   - `ScreenTransition.Cover`: The visual animation that slides the new screen smoothly from the right over the old screen.

### Step 3: Wiring the Escape Route (Cancel / Back)
1. Navigate to `scrNewRequest`.
2. Insert an icon or button at the top left named `icnBack` or `btnCancel`.
3. Set its `OnSelect` property to:
   ```powerfx
   Back()
   ```
4. Explain: *Why `Back()` instead of `Navigate(scrHome)`? Because `Back()` remembers where the operator came from. If they came from a Search screen, `Back()` returns them to Search; if from Home, it returns them to Home.*

### Step 4: Wiring the Submission & Confirmation Flow
1. On `scrNewRequest`, select `btnSubmitTicket`.
2. In `OnSelect`, enter:
   ```powerfx
   Navigate(scrSuccessConfirmation, ScreenTransition.Fade)
   ```
3. On `scrSuccessConfirmation`, select `btnReturnHome`.
4. In `OnSelect`, enter:
   ```powerfx
   Navigate(scrHome, ScreenTransition.Fade)
   ```

### Step 5: Testing the Journey in Studio Preview
1. Press <kbd>F5</kbd> (or hold <kbd>Alt</kbd>).
2. Click through the complete circuit: Home $\rightarrow$ New Ticket $\rightarrow$ Test Cancel $\rightarrow$ New Ticket $\rightarrow$ Submit $\rightarrow$ Success $\rightarrow$ Return Home.

---

## 10. Guided Learner Practice (10 Minutes)

### Scenario: The Shift Handover 3-Screen Journey
The learner follows along to wire up navigation for a shift supervisor:
- **Task A (Forward):** On `scrShiftDashboard`, configure `btnStartHandover.OnSelect` to navigate to `scrHandoverForm` using `ScreenTransition.Cover`.
- **Task B (Safety Escape):** On `scrHandoverForm`, configure `btnCancelHandover.OnSelect` to return the supervisor safely using `Back()`.
- **Task C (Completion):** On `scrHandoverForm`, configure `btnConfirmHandover.OnSelect` to navigate to `scrHandoverSuccess` using `ScreenTransition.Fade`.

*Trainer Coaching Prompt:*  
"If the supervisor taps Cancel on the form, why do we use `Back()` instead of forcing them back to the Home screen?"  
*Learner Target Response:* "Because `Back()` respects the user's history and uncovers the previous screen naturally!"

---

## 11. Independent Mini-Task (10 Minutes)

### The Tool Crib 3-Screen Flow
Assign the learner to map and write the exact Power Fx formulas for 4 navigation touchpoints in a Tool Crib kiosk app:
1. **Touchpoint 1:** On `scrKioskWelcome`, the worker taps `btnCheckoutTool` to go to `scrPartPicker` with a sliding cover animation.
2. **Touchpoint 2:** On `scrPartPicker`, the worker realizes they have the wrong badge and taps `btnAbort` to return to the welcome screen.
3. **Touchpoint 3:** On `scrPartPicker`, after picking a 50mm O-Ring, the worker taps `btnConfirmCart` to go to `scrReceiptSummary` with a fade transition.
4. **Touchpoint 4:** On `scrReceiptSummary`, after printing their receipt, the worker taps `btnDone` to reset back to `scrKioskWelcome`.

**Learner Deliverable Table:**
| Touchpoint | Control Name | Property | Power Fx Formula | Transition Type |
| :--- | :--- | :--- | :--- | :--- |
| 1. Enter Crib | `btnCheckoutTool` | `OnSelect` | `Navigate(scrPartPicker, ScreenTransition.Cover)` | Cover |
| 2. Abort Picker | `btnAbort` | `OnSelect` | `Back(ScreenTransition.UnCover)` | UnCover |
| 3. View Summary | `btnConfirmCart` | `OnSelect` | `Navigate(scrReceiptSummary, ScreenTransition.Fade)` | Fade |
| 4. Finish Session | `btnDone` | `OnSelect` | `Navigate(scrKioskWelcome, ScreenTransition.Fade)` | Fade |

---

## 12. Common Misconceptions & Corrections

| Plausible Wrong Mental Model | Why the Beginner Thinks This | Trainer Correction & Demonstration |
| :--- | :--- | :--- |
| **"Screens automatically advance when you finish filling a form."** | Beginners are used to commercial consumer apps like Instagram or TikTok that auto-swipe. | In business apps, the system NEVER guesses user intent. You must explicitly write a `Navigate()` formula in a button's `OnSelect` property. |
| **"`Navigate()` saves my data to SharePoint."** | Beginners see the screen change and assume the data was stored at the same time. | `Navigate()` ONLY changes the camera view. It transports the user's eyeballs. Data saving is a separate function (`SubmitForm` or `Patch`). Later we combine them! |
| **"`Back()` and `Navigate(scrHome)` are the exact same thing."** | Both often take the user to the starting page in simple 2-screen tests. | `Back()` pops the navigation history stack. If a user arrived from a deep search or filter screen, `Back()` returns them to their exact search results, while `Navigate(scrHome)` destroys their context and forces them to start over. |
| **"Transitions are just decorative toys that slow down phones."** | Beginners think animations are frivolous design elements. | Transitions provide spatial orientation. A `Cover` transition tells the human brain: *"I am drilling deeper into a task."* A `Fade` transition tells the brain: *"A major state change has concluded."* |

---

## 13. Knowledge Check (5 Questions)

1. **Question (Why):** Why is the `Back()` function architecturally superior to hardcoding `Navigate(scrHome)` on a cancel button?  
   *Answer:* `Back()` reads the internal screen history stack, returning the user to whichever screen they arrived from (whether from Home, Search, or an Approval queue). Hardcoding `Navigate(scrHome)` breaks user context and discards previous filter states.
2. **Question (What happens if):** What happens if an operator fills out an incident report, taps Submit, but the developer forgot to add a `Navigate()` formula to `btnSubmit.OnSelect`?  
   *Answer:* The data might save, but the screen will not move. The operator will assume the submission failed, become anxious, and tap the Submit button multiple times, generating duplicate records in the database.
3. **Question:** In the formula `Navigate(scrSuccessConfirmation, ScreenTransition.Fade)`, what is the purpose of the second argument (`ScreenTransition.Fade`)?  
   *Answer:* It defines the visual animation applied during the screen change, providing a smooth cross-fade that visually signals to the operator that the submission phase has completed.
4. **Question (Why):** Why must every data entry screen have a visible Cancel or Back button?  
   *Answer:* To provide an escape route. Without a cancel route, users who enter the screen by mistake feel trapped and are forced to submit fake/test data just to exit the form.
5. **Question:** Does the formula `Navigate(scrConfirmation)` automatically save the operator's input to SharePoint? Explain why or why not.  
   *Answer:* No. `Navigate()` is strictly a visual camera transport command. It changes what screen the user sees, but has zero ability to write or commit data to a database.

---

## 14. Final Challenge & Rubric

### The Challenge: "Apex Plastics Quality Inspection 3-Screen Journey"
**Context:** Quality Inspector Bopha needs a complete 3-screen workflow for logging hourly mold inspections on her mobile scanner.  
**Requirements:**
1. **Screen 1 (`scrQualityDashboard`):** Contains a prominent button `btnNewInspection` that navigates to `scrInspectionForm` using `ScreenTransition.Cover`.
2. **Screen 2 (`scrInspectionForm`):**
   - Contains a top icon `icnCancel` that executes `Back(ScreenTransition.UnCover)` so Bopha can safely abort.
   - Contains a button `btnLogVerdict` that navigates to `scrInspectionSuccess` using `ScreenTransition.Fade`.
3. **Screen 3 (`scrInspectionSuccess`):**
   - Displays a success badge and summary.
   - Contains a button `btnLogAnother` that navigates back to `scrInspectionForm` for the next batch.
   - Contains a secondary button `btnBackToDashboard` that navigates back to `scrQualityDashboard`.

### 4-Tier Assessment Rubric
| Criteria | Beginning (1 pt) | Developing (2 pts) | Proficient (3 pts) | Exemplary (4 pts) |
| :--- | :--- | :--- | :--- | :--- |
| **Navigation Formula Syntax** | Syntax errors; misses closing parentheses or commas. | Uses `Navigate` but omits transition effects. | Accurate `Navigate(Target, Transition)` syntax. | Explains the stack mechanics of each transition cleanly. |
| **History Stack vs Forward Routing** | Uses forward navigation for cancel buttons. | Inconsistently mixes `Back()` and `Navigate()`. | Uses `Back()` for all return paths and `Navigate()` for forward paths. | Articulates user context preservation and stack management. |
| **Dead-End Elimination** | Leaves screens with no exit; trapped user. | Has forward path only; missing cancel routes. | Zero dead ends; all screens have clear escape and forward routes. | Incorporates multi-tier return paths (Log Another vs Back to Home). |
| **Visual State Signaling** | Uses `ScreenTransition.None` everywhere. | Inconsistent transitions that confuse spatial depth. | Uses `Cover` for drill-down and `Fade` for status changes. | Flawlessly matches transition physics to real-world user mental models. |

---

## 15. Optional Review / Homework (<= 15 Minutes)

### "Audit the Broken Navigation Map" Exercise
Examine this flawed mobile app flow diagram from a logistics warehouse:
1. `scrWelcome` $\rightarrow$ Taps "Scan Package" $\rightarrow$ `Navigate(scrScanner)`
2. `scrScanner` $\rightarrow$ Has NO back button! Only has "Finish".
3. `scrScanner` $\rightarrow$ Taps "Finish" $\rightarrow$ `Navigate(scrWelcome)` (No success confirmation screen!)
4. `scrScanner` $\rightarrow$ Taps "Troubleshoot" $\rightarrow$ `Navigate(scrHelp)`
5. `scrHelp` $\rightarrow$ Taps "Done" $\rightarrow$ `Navigate(scrWelcome)` (Traps the user; fails to return them to their scan!)

**Student Assignment:**
Rewrite this flow in your journal:
- Identify the 3 critical UX/safety defects in this navigation architecture.
- Redraw the flow diagram with the missing confirmation screen and proper `Back()` routes.
- Write the corrected Power Fx formulas for each button.

---

## 16. Connection Map (Curriculum Continuity)

```
BEFORE (Day 14)                 TODAY (Day 15)                 NEXT (Day 16)
[Individual Controls]    --->   [Navigation & Flow]     --->   [Dynamic Behaviors]
- Label = Information           - Navigate(TargetScreen)       - Conditional Visibility
- TextInput = Data              - Back() History Stack         - Validation Rules
- Dropdown = Choice             - Screen Transitions           - Disabled Buttons
- Button = Action               - Closed User Loops            - Dynamic Feedback
```

