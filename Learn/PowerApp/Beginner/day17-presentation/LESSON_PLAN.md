# DAY 17 LESSON PLAN: Conditions + IF in Power Fx — Form Validation

**Program**: Microsoft Power Apps Beginner to Pro (27-Day Connected Curriculum)  
**Target Audience**: Absolute Zero Beginners (No coding, no database, no Boolean logic background)  
**Phase**: Phase 6 — Power Fx Fundamentals  
**Duration**: 90 Minutes (Strictly timed)  
**Central Mental Model**:  
`REAL PROBLEM -> PROCESS -> DATA -> UI/SCREEN -> LOGIC/DECISION -> ACTION -> STORAGE -> FEEDBACK -> TEST`  
**Today's Connection Chain**:  
`User Input -> Validation Condition (IsBlank) -> Logic Gate (If) -> Action (Notify / Submit) -> Screen Feedback`  
**Core Meaning**: A condition asks a closed question (True/False); `If()` routes the app down different action branches based on the result.  
**Prior Connection**: Day 16 (Properties & Formulas — How Controls Behave)  
**Forward Bridge**: Day 18 (Variables: Giving Your App Temporary Memory)

---

## 1. Measurable Objectives (3–5 Measurable Outcomes)
By the end of this 90-minute session, the learner will be able to:
1. **Explain the Validation Gate Concept**: Define in plain language why apps must validate data before submitting, using the ATM pin and security guard analogies.
2. **Configure `IsBlank()` to Detect Empty Inputs**: Write `IsBlank(txtOperatorName.Text)` to produce `true` when a required text input contains no user data.
3. **Construct 3-Part `If()` Decision Formulas**: Write valid Power Fx formulas using `If(Condition, TrueAction, FalseAction)` on a button's `OnSelect` property.
4. **Deploy User Feedback with `Notify()`**: Trigger visual toast banners (`NotificationType.Error` and `NotificationType.Success`) to inform users why an action succeeded or was blocked.
5. **Combine Multiple Requirements with `||` (OR)**: Protect a submission form by ensuring both machine title and operator name are present before saving.

---

## 2. Timed 90-Minute Lesson Agenda
| Time Window | Duration | Segment | Core Activity |
|---|---|---|---|
| **00:00 - 10:00** | 10 Min | Orientation & Retrieval | Spiral Concept Map recap & 4-question memory retrieval |
| **10:00 - 25:00** | 15 Min | The Crisis & Analogy | The \$22,000 Ghost Ticket Crisis at Apex Plastics & Security Guard Analogy |
| **25:00 - 45:00** | 20 Min | Core Mental Model | Formula anatomy: `IsBlank()`, `If()`, and `Notify()` visual flowcharts |
| **45:00 - 65:00** | 20 Min | Trainer Demo & Guided Build | Building the validation shield on `btnSubmit.OnSelect` step-by-step |
| **65:00 - 78:00** | 13 Min | Interactive Lab & Misconceptions | Form Validation Workbench testing & busting 5 dangerous validation myths |
| **78:00 - 85:00** | 7 Min | 5-Question Mastery Quiz | Timed knowledge-check questions with instant feedback |
| **85:00 - 90:00** | 5 Min | Final Challenge & Bridge | Independent defect validation challenge & Bridge to Day 18 (Variables) |

---

## 3. 5-Minute Concept-Map Recap (Spiral Learning Connection)
Every lesson in our 27-day journey connects backwards and forwards:
- **Yesterday (Day 16)**: We learned that **Controls** have **Properties**, and **Formulas** dynamically calculate those properties. When an operator types in `txtTitle.Text`, the live text is extracted via the dot (`.`) operator.
- **Today (Day 17)**: We introduce **Conditions & Decision Logic**. What happens when the operator leaves `txtTitle.Text` completely blank and clicks Submit? Without validation, blank garbage enters your database!
- **Tomorrow (Day 18)**: Once data is validated, how does the app remember who is logged in or which shift is selected across multiple screens? We give the app memory using **Variables**.

---

## 4. Prerequisite Retrieval Questions & Answers
1. **Question**: What operator do we use to extract a property value from a control?
   - **Answer**: The dot (`.`) operator (e.g., `txtOperator.Text`).
2. **Question**: What data type does a comparison question like `Value(txtCost.Text) > 500` return?
   - **Answer**: A Boolean value — strictly `true` or `false`.
3. **Question**: Does an input box remember its value when you navigate away to another screen without saving?
   - **Answer**: By default, screen controls can reset; apps need persistent storage or variables to retain values.
4. **Question**: What property triggers an action when an operator taps a button?
   - **Answer**: The `OnSelect` property.

---

## 5. Today's "WHY THIS EXISTS" Workplace Problem
### The \$22,000 Ghost Ticket Disaster at Apex Plastics
At Apex Plastics Line 3, the factory deployed a basic maintenance request app. However, the developer put only `SubmitForm(frmIncident)` on the Submit button, with zero validation.
- An operator accidentally brushed against the Submit button while the iPad screen was resting on a cart.
- A completely blank "Ghost Record" was created in SharePoint: Title was blank, Machine was blank, Urgency was blank.
- Because Urgency was blank, the maintenance triage system flagged it as "Critical Priority: Undefined Hazard".
- A certified hydraulic technician was dispatched via helicopter-tier overtime ($150/hr), and the entire Line 3 was halted for 4 hours while engineers searched for a non-existent rupture.
- **Total Loss**: \$22,000 in lost production output and wasted engineering manpower.
- **Root Cause**: The app allowed empty garbage to enter the database without a validation gate!

---

## 6. Plain-Language Concept Before Technical Vocabulary
- **Everyday English**: Before you let anyone into an office building, the security guard asks: *"Do you have an ID badge?"* If YES, the gate opens. If NO, the guard stops them and says: *"Please show your ID badge!"*
- **Power Apps Concept**:
  - Guard's Question = **Condition** (`IsBlank(txtOperatorName.Text)`)
  - Gate Opening / Stopping = **Decision Function** (`If()`)
  - Guard's Spoken Warning = **Notification Toast** (`Notify("Please enter operator name", NotificationType.Error)`)

---

## 7. Everyday Analogy: The Bank ATM Machine
When you walk up to an ATM and press "Withdraw Cash":
1. Does the ATM immediately dispense cash without checking your card or PIN? **Never!**
2. The ATM first runs a **Validation Check**:
   - Is PIN entered? If No ➔ Show message: *"Please enter PIN"*.
   - Is amount requested greater than account balance? If Yes ➔ Show error: *"Insufficient funds"*.
3. Only when all validation checks evaluate to `true` does the ATM execute the dispense action.
4. In Power Apps, your Submit button must act like the ATM gate!

---

## 8. Manufacturing / DX Workplace Example: Apex Plastics Incident Screen
On `scrIncidentReport`:
- Control 1: `txtMachineID` (TextInput for Machine Tag, e.g., "INJ-04")
- Control 2: `txtDowntime` (TextInput for Hours Lost, e.g., "2.5")
- Control 3: `btnSubmit` (Button)

```powerfx
// Formula on btnSubmit.OnSelect:
If(
    IsBlank(txtMachineID.Text),
    Notify("⚠️ Machine ID is required! Please enter the machine number.", NotificationType.Error),
    SubmitForm(frmMaintenance);
    Notify("✅ Maintenance ticket successfully logged!", NotificationType.Success);
    Navigate(scrSuccess)
)
```

---

## 9. Visual Cause-and-Effect Architecture
```
Operator Clicks Submit Button (OnSelect Triggered)
                      │
                      ▼
            IsBlank(txtMachineID.Text)
             /                     \
       TRUE (Field is Empty)        FALSE (Field has text)
            │                                 │
            ▼                                 ▼
Notify("Error: Missing Machine ID",      SubmitForm(frmMaintenance)
       NotificationType.Error)                │
            │                                 ▼
   App halts submission!               Notify("Success!", Success)
Database stays clean!                         │
                                              ▼
                                       Navigate(scrSuccess)
```

---

## 10. Trainer Demonstration (Step-by-Step Script)
1. **Open Studio**: Add a TextInput named `txtOperatorName` and a Button named `btnSave`.
2. **Demonstrate Failure**: With `btnSave.OnSelect = Notify("Saved!", NotificationType.Success)`, leave `txtOperatorName` empty and click the button. Show students that the app happily reports success on blank data.
3. **Add Validation Function**: Introduce `IsBlank()`:
   - In a temporary Label, set `Text = IsBlank(txtOperatorName.Text)`.
   - Type letters ➔ Label displays `false`. Delete letters ➔ Label displays `true`.
4. **Build the `If()` Structure**:
   ```powerfx
   If(
       IsBlank(txtOperatorName.Text),
       Notify("Operator name cannot be blank!", NotificationType.Error),
       Notify("Operator verified. Saving record...", NotificationType.Success)
   )
   ```
5. **Test Both Branches**: Show the red error banner when blank, and green banner when filled.

---

## 11. Guided Learner Practice (Hands-on in Studio)
**Task**: Build a 2-field validation shield:
1. Insert two TextInputs: `txtMachine` and `txtDefect`.
2. Insert a Button: `btnSubmitReport`.
3. In `btnSubmitReport.OnSelect`, use the OR operator (`||`) to check both fields:
   ```powerfx
   If(
       IsBlank(txtMachine.Text) || IsBlank(txtDefect.Text),
       Notify("Please fill in both Machine and Defect description!", NotificationType.Warning),
       Notify("All fields valid. Proceeding to save...", NotificationType.Success)
   )
   ```
4. Test:
   - Case A: Both empty ➔ Warning banner appears.
   - Case B: Machine filled, Defect empty ➔ Warning banner appears.
   - Case C: Both filled ➔ Success banner appears.

---

## 12. Independent Mini-Task
- **Scenario**: At the packing station, an operator enters the quantity of boxes produced into `txtQty`.
- **Requirement**: If `Value(txtQty.Text) <= 0`, notify the operator with an error: *"Quantity must be greater than zero!"*. Otherwise, notify success: *"Quantity accepted!"*.
- **Hint**: Use `Value(txtQty.Text) <= 0` as your condition.

---

## 13. Common Misconceptions & Trainer Corrections
1. **Misconception**: *"IsBlank() checks if text is equal to the word 'blank'".*
   - **Correction**: `IsBlank()` checks if the string contains zero characters or null. It returns a Boolean (`true`/`false`).
2. **Misconception**: *"Notify() saves data to SharePoint automatically."*
   - **Correction**: `Notify()` only displays a temporary colored banner at the top of the user's screen. It has zero effect on the database.
3. **Misconception**: *"An If() function must always have 3 parts."*
   - **Correction**: In Power Fx behavioral formulas (like `OnSelect`), the 3rd part (False action) is optional. If omitted and the condition is False, the app simply does nothing.
4. **Misconception**: *"I can use AND/OR instead of &&/|| in Power Fx."*
   - **Correction**: Power Fx supports `And(cond1, cond2)` or `cond1 && cond2`. Using the symbol `||` for OR and `&&` for AND is standard practice.
5. **Misconception**: *"Validation on the button prevents malicious hackers from bypassing the form."*
   - **Correction**: Client-side validation is for user guidance; enterprise security requires SharePoint/Dataverse permissions and Cloud Flow enforcement.

---

## 14. 5 Knowledge-Check Questions with Explanations
1. **What value does `IsBlank("")` return?**
   - *Answer*: `true` — because an empty text string has no characters.
2. **What are the 3 arguments in an `If()` function?**
   - *Answer*: `If(Condition, ActionIfTrue, ActionIfFalse)`.
3. **Which NotificationType produces a red error banner across the top of the app?**
   - *Answer*: `NotificationType.Error`.
4. **What does the formula `If(Value(txtPieces.Text) < 10, Notify("Low Stock", NotificationType.Warning))` do when `txtPieces.Text` is 15?**
   - *Answer*: Nothing happens, because the condition evaluates to `false` and no 3rd argument was provided.
5. **How do you check if EITHER `txtTitle` is blank OR `txtOwner` is blank?**
   - *Answer*: `IsBlank(txtTitle.Text) || IsBlank(txtOwner.Text)`.

---

## 15. Final Challenge with Expected Result & Rubric
### Challenge: Apex Plastics Hydraulic Pressure Gate
- **Context**: On Injection Molding Line 2, technicians log oil temperature before starting a shift.
- **Requirement**: Build a Submit button formula that checks:
  1. `txtTechName` is NOT blank.
  2. `Value(txtTemp.Text)` is between 40 and 85 degrees Celsius.
  3. If invalid, display an appropriate `NotificationType.Error`.
  4. If valid, display `NotificationType.Success` and navigate to `scrShiftDashboard`.

### Scoring Rubric (10 Points Total):
- **4 Points**: Correctly detects empty `txtTechName` using `IsBlank()`.
- **3 Points**: Correctly validates temperature range using numeric comparison.
- **2 Points**: Dispatches appropriate `Notify()` banner with correct `NotificationType`.
- **1 Point**: Clean formula formatting and syntax.

---

## 16. Optional Homework / 15-Minute Review Exercise
Open your personal practice app:
1. Add a feedback form with a Rating control (`ratQuality`) and a Comments text box (`txtComments`).
2. Add a Submit button that validates: If rating is less than 3 stars, comments CANNOT be blank!
3. Write down your formula and test it in Power Apps Studio Preview mode (`F5`).

---

## 17. Connection Map: Before -> Today -> Next
- **Previous Lesson (Day 16)**: Controls & Properties — Understanding how controls hold data (`txtInput.Text`).
- **Today's Lesson (Day 17)**: Conditions & IF — Validating user data and preventing ghost records with `IsBlank()` and `Notify()`.
- **Next Lesson (Day 18)**: Variables — Giving the app short-term memory to store validated data across screens (`Set` & `UpdateContext`).

