# 🎓 Day 6 Instructional Master Plan: Combining Conditions: AND / OR / NOT
## 📚 Phase 2: Logic & Decisions • Microsoft Power Apps for Absolute Zero Beginners

> **Instructional Architect:** Microsoft Power Apps Master Trainer & Curriculum Architect  
> **Course Architecture:** Connected 27-Day Curriculum (From Zero to Citizen Developer)  
> **Central Mental Model:** `REAL PROBLEM ➔ PROCESS ➔ DATA ➔ UI/SCREEN ➔ LOGIC/DECISION ➔ ACTION ➔ STORAGE ➔ FEEDBACK ➔ TEST`  
> **Day 6 Connection Chain:** `Multiple Conditions ➔ AND / OR / NOT ➔ Single Consolidated Verdict ➔ IF Decision ➔ Action`  
> **Core Meaning:** Combine several True/False conditions into a single consolidated gate to model real-world business and safety rules.  
> **Session Duration:** Exactly 90 Minutes (00:00 – 90:00)  
> **Target Audience:** Absolute zero beginners (factory line operators, maintenance technicians, inventory clerks, shift leads). Zero prior coding, Boolean logic, or database experience.

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
│                                                                          (TODAY: Day 6)                │
│                                                                               │                        │
│                                                                               ▼                        │
│  [7. BUSINESS PROCESS]  ➔  [8. APP WIREFRAMING]  ➔  [9. STORAGE]  ➔  [10. FEEDBACK]  ➔  [11. TEST]    │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

* **Prior Connection (Day 5):** Yesterday on Day 5, we learned how `If()` acts as a railway switch, taking a single True/False verdict from a condition and choosing between Action A and Action B.
* **Today's Anchor (Day 6):** `Multiple Conditions ➔ AND / OR / NOT ➔ Single Verdict ➔ IF Decision`. Real-world rules rarely depend on one number. A boiler requires water pressure **AND** active flame. An emergency alarm sounds if toxic gas **OR** extreme heat is detected. Today we learn how `AND` (`&&`), `OR` (`||`), and `NOT` (`!`) compress multiple questions into a single True/False answer that `If()` can act upon!
* **Forward Bridge (Day 7):** Tomorrow on Day 7, we take our data, conditions, and compound decisions, and organize them into an end-to-end **Business Process & Application Workflow** before building UI screens!

---

## ⏱️ Exact 90-Minute Timed Agenda

| Segment | Minute Range | Duration | Pedagogical Phase | Focus & Hands-on Activity |
| :---: | :---: | :---: | :---: | :--- |
| **Part 1** | **00:00 – 10:00** | 10 min | **RECALL & CONNECT** | Welcome, 27-day mental model anchor, active retrieval of Days 1–5, 4 measurable learning objectives. |
| **Part 2** | **10:00 – 25:00** | 15 min | **DISCOVER (WHY)** | The Apex Plastics $24,000 Resin Scorch Disaster, plain concept of Compound Gates, Two-Key Vault (`AND`), Multi-Sensor Alarm (`OR`), Inverter (`NOT`). |
| **Part 3** | **25:00 – 45:00** | 20 min | **DEEP DIVE THEORY** | Logic Gate Diagram, Formal Truth Tables, Power Fx Syntax (`&&`, `||`, `!`, `And()`, `Or()`, `Not()`), Precedence & Short-Circuit Evaluation. |
| **Part 4** | **45:00 – 60:00** | 15 min | **DEMONSTRATE & LAB** | **Minute 45:00:** Mid-session pulse check & hydration reset. Trainer live demo of the Multi-Gate Workbench with live pressure/coolant sliders & interlocks. |
| **Part 5** | **60:00 – 75:00** | 15 min | **PRACTICE (GUIDED)** | Deconstructing Apex Extruder Line #4 Safety Matrix, hands-on 6-Scenario Simulator, 4 common beginner misconceptions (human speech vs logic). |
| **Part 6** | **75:00 – 90:00** | 15 min | **ASSESS & BRIDGE** | 5-question knowledge check quiz, Hazmat Dispatch Capstone Challenge, solution reveal, 4-level rubric, homework & bridge to Day 7. |

---

## 🎯 1. Measurable Learning Objectives

By the end of this 90-minute session, without consulting notes, the learner will be able to:
1. **Differentiate AND vs OR:** Predict with 100% accuracy whether a compound expression evaluates to True or False using the strict Two-Key Vault rule (`AND`) and the permissive Multi-Sensor rule (`OR`).
2. **Apply Operator Precedence with Parentheses:** Correctly group mixed compound conditions `(A || B) && C` to prevent silent logic errors in business workflows.
3. **Prevent the 4 Critical Beginner Traps:** Rectify human speech syntax errors (`Status = "A" || "B"`), inverted De Morgan negative conditions, redundant `= true` checks, and short-circuit type crashes.
4. **Author Production-Ready Compound Power Fx Formulas:** Construct syntactically flawless Power Fx expressions combining at least two conditions to control button behavior, dynamic visibility, and validation interlocks.

---

## 🧠 2. 5-Minute Master Concept Map (Spiral Anchor)

* **The Storyline:** Apex Plastics High-Tonnage Extruder & Chemical Molding Facility.
* **Spiral Connection Journey:**
  * **Day 1 (Problem):** High-tonnage machinery failures cost $6,000/hour in downtime.
  * **Day 2 (Sequence):** Chained operational steps: `Validate() ; SubmitForm() ; Notify()`.
  * **Day 3 (Data & Types):** Stored values in typed containers (`txtPressure.Text`, `txtTemp.Text`, `chkGate.Value`).
  * **Day 4 (Conditions):** Formulated closed questions producing True or False (`Value(txtPressure.Text) > 200`).
  * **Day 5 (Decisions: IF):** Routed execution to Action A (True) or Action B (False) using single `If()`.
  * **Day 6 (Today):** What if safety requires **BOTH** Pressure > 200 **AND** Gate is Open? Or what if an alert fires if Smoke **OR** Gas is detected? Today we master `AND`, `OR`, and `NOT`!
* **Previewing Day 7:** Tomorrow we transition from logic gates to **Business Process Workflows & Wireframing**.

---

## 🔍 3. Prerequisite Retrieval Questions (Active Recall)

The trainer conducts a 4-minute rapid-fire oral review:
* **Question 1 (Day 5 Core Meaning):** *"What are the three essential parts of an IF statement, and what do the commas mean?"*
  * **Expected Answer:** `If(Condition, ActionIfTrue, ActionIfFalse)`. The first comma means **THEN**; the second comma means **ELSE**!
* **Question 2 (Day 4 Condition Verdict):** *"What is the only type of value that a condition can ever produce?"*
  * **Expected Answer:** Strictly **True** or **False** (a Boolean value)!
* **Question 3 (Day 3 Type Discipline):** *"If an operator types '185' into txtPressure, why can't we directly write `txtPressure.Text > 200`?"*
  * **Expected Answer:** Because `txtPressure.Text` is **Text**! It must be wrapped in `Value(txtPressure.Text)` to be compared mathematically!

---

## ⚠️ 4. The "WHY THIS EXISTS" Problem (Workplace Pain)

### The $24,000 Resin Scorch Disaster at Apex Plastics:
* **The Incident:** Extruder Line #4 melts plastic resin pellets at 220°C. Two safety systems protect the barrel:
  1. Barrel Temperature Sensor (`Temp > 240°C`).
  2. Auxiliary Water Coolant Pump Status (`CoolantActive = true`).
* **The Single-IF Bug:**
  * The junior citizen developer wrote a single-condition IF statement on the operator tablet:
    ```powerfx
    If(Value(txtTemp.Text) > 240, ShutdownHeaters(), MaintainHeat())
    ```
  * At 02:00 AM, the temperature was 235°C (under the 240°C threshold, so condition evaluated to **FALSE**).
  * However, a water pipe burst, and the coolant pump failed (`CoolantActive = false`)!
  * Because the app **only checked temperature** and ignored the coolant status, the app executed `MaintainHeat()`!
  * Within 15 minutes, the barrel overheated without cooling. 600 kg of resin scorched and carbonized inside the screw barrel.
  * **The Consequence:**
    * Line shut down for 6 hours for manual chiseling and barrel overhaul.
    * 600 kg of automotive-grade resin ruined: $9,000.
    * 6 hours of line downtime: $15,000.
    * **Total Loss: $24,000!**
  * **The Root Cause:** The app evaluated only ONE condition. Real industrial safety requires combining conditions:  
    `If(Temp > 240 || CoolantActive = false, ShutdownHeaters(), MaintainHeat())`!

---

## 💡 5. Plain Language Concepts Before Technical Syntax

* **What is a Compound Condition?**  
  A compound condition is simply **two or more questions joined together** so they produce **one single final True/False verdict**.
* `If()` does not need to learn anything new! `If()` still expects one True or False answer. `AND` and `OR` are the gatekeepers that combine multiple questions into that single answer before handing it to `If()`.

---

## 🚆 6. Everyday Physical Analogies

1. **The `AND` Gate (`&&`): The Two-Key High-Security Vault**
   * Two bank officers stand before a vault. Officer A must turn Key A **AND** Officer B must turn Key B.
   * If Officer A turns their key (True) but Officer B is on lunch break (False), does the door open? **NO!**
   * **Rule:** `AND` is strict. It only gives a TRUE if **EVERY SINGLE CONDITION IS TRUE**.
2. **The `OR` Gate (`||`): The Multi-Sensor Airport Security Check**
   * To pass through boarding, you may present a **Passport** OR a **National Identity Card**.
   * If you have either one, you are allowed through!
   * **Rule:** `OR` is permissive. It gives a TRUE if **AT LEAST ONE CONDITION IS TRUE**.
3. **The `NOT` Gate (`!`): The Reversible Raincoat / Light Inverter**
   * If the raincoat is right-side out (True), flipping it makes it inside-out (False).
   * In Power Apps, `!` or `Not()` flips True to False, and False to True.
   * `!IsBlank(txtName.Text)` means: *"Is it NOT blank?"* (i.e. does it contain data?).

---

## 🏭 7. Manufacturing / DX Workplace Scenario

### Apex Plastics Molding Press #4 Dual-Safety Interlock:
To safely inject molten plastic into a 20-ton mold clamp:
1. Hydraulic Clamp Pressure must be $\ge 180\text{ bar}$.
2. Operator Safety Light Curtain must NOT be breached (`CurtainClear = true`).
3. Maintenance Lockout Tag must NOT be active (`LockoutActive = false`).

**The Business Rule:**  
*"Allow injection stroke ONLY IF Clamp Pressure $\ge 180$ AND Curtain is Clear AND Lockout is NOT active."*

**The Power Fx Implementation:**
```powerfx
If(
    Value(txtPressure.Text) >= 180 && chkCurtainClear.Value && !chkLockout.Value,
    // TRUE BRANCH:
    RunInjectionCycle(),
    // FALSE BRANCH:
    Notify("SAFETY INTERLOCK ENGAGED: Check pressure, light curtain, or lockout tag!", NotificationType.Error)
)
```

---

## 📊 8. Formal Truth Tables (The Mathematical Foundation)

### 8.1 The AND (`&&`) Truth Table (Strict Conjunction)

| Condition A | Condition B | `A && B` | Explanation |
| :---: | :---: | :---: | :--- |
| **FALSE** | **FALSE** | **FALSE** | Neither condition met. |
| **FALSE** | **TRUE** | **FALSE** | First condition failed; vault stays locked. |
| **TRUE** | **FALSE** | **FALSE** | Second condition failed; vault stays locked. |
| **TRUE** | **TRUE** | **TRUE** | **Both conditions met; vault unlocks!** |

### 8.2 The OR (`||`) Truth Table (Permissive Disjunction)

| Condition A | Condition B | `A \|\| B` | Explanation |
| :---: | :---: | :---: | :--- |
| **FALSE** | **FALSE** | **FALSE** | Neither trigger active; safe to continue. |
| **FALSE** | **TRUE** | **TRUE** | **Condition B triggered; alarm sounds!** |
| **TRUE** | **FALSE** | **TRUE** | **Condition A triggered; alarm sounds!** |
| **TRUE** | **TRUE** | **TRUE** | **Both triggered; alarm sounds!** |

### 8.3 The NOT (`!`) Truth Table (Inversion)

| Input Condition | `!Input` | Explanation |
| :---: | :---: | :--- |
| **TRUE** | **FALSE** | Inverts True into False. |
| **FALSE** | **TRUE** | Inverts False into True. |

---

## ⚙️ 9. Power Fx Syntax Grammar & Execution Mechanics

### 9.1 Modern Syntax vs Function Call Syntax

| Operator | Modern Standard (C-Style) | Legacy Function Call | Trainer Recommendation |
| :--- | :--- | :--- | :--- |
| **AND** | `CondA && CondB` | `And(CondA, CondB)` | Use `&&` for clean inline readability. |
| **OR** | `CondA \|\| CondB` | `Or(CondA, CondB)` | Use `\|\|` for clean inline readability. |
| **NOT** | `!CondA` | `Not(CondA)` | Use `!` for quick boolean negation. |

### 9.2 Operator Precedence and Parentheses Grouping
* **Precedence Order:** `NOT (!)` evaluates first, followed by `AND (&&)`, followed by `OR (||)`.
* **The Danger of Missing Parentheses:**
  * Formula: `A || B && C` is evaluated by the computer as `A || (B && C)`!
  * If the citizen developer meant `(A || B) && C`, the app will execute the wrong branch!
  * **Trainer Rule:** *"Always wrap grouped sub-conditions in explicit parentheses `(...)`!"*

### 9.3 Short-Circuit Evaluation: Safety & Performance
* In `CondA && CondB`: If `CondA` is **FALSE**, Power Apps **stops evaluating immediately** and skips `CondB`.
* In `CondA || CondB`: If `CondA` is **TRUE**, Power Apps **stops evaluating immediately** and skips `CondB`.
* **Pro Defensive Pattern:**
  ```powerfx
  // Safe from runtime type crashes:
  !IsBlank(txtDowntime.Text) && Value(txtDowntime.Text) > 4.0
  ```
  If `txtDowntime.Text` is Blank, the first condition is False. The app never runs `Value()` on an empty string!

---

## 🧪 10. Trainer Demonstration: Multi-Gate Decision Workbench

During Part 4 (45:00 – 60:00), the trainer demonstrates Slide 12:
1. **Interactive Inputs:**
   * Pressure Slider (0 to 300 PSI, default 150 PSI).
   * Coolant Level Slider (0 to 100%, default 80%).
   * Safety Hazard Checkbox Toggle (true/false).
2. **Live Logic Trace:**
   * Formula: `Pressure > 200 && Coolant < 20` (Critical Overheat & Low Coolant).
   * Drag Pressure to 250 PSI: Notice the alert stays cool blue because Coolant is 80% (False)!
   * Drag Coolant to 15%: **BOOM!** Both conditions evaluate to True. The card bursts into radiant red!
3. **Safety Interlock Button:**
   * `DisplayMode = If(!IsBlank(Name) && !chkHazard.Value, DisplayMode.Edit, DisplayMode.Disabled)`.
   * Show that if Name is filled but Hazard is active, the submit button remains locked!

---

## 🛠️ 11. Guided Practice: Apex Extruder Line #4 Safety Matrix

During Part 5 (60:00 – 75:00), learners trace these 6 compound operational scenarios on Slide 18:

| # | Operational Requirement | Condition Formula | Live Test Values | Expected Verdict | Action Executed |
| :-: | :--- | :--- | :--- | :---: | :--- |
| **1** | Overpressure & Valve Stuck | `Pressure > 200 && ValveClosed = true` | Pressure = 240, ValveClosed = true | **TRUE** | Path A: Emergency Depressurize |
| **2** | High Temp OR Low Coolant | `Temp > 90 \|\| Coolant < 15` | Temp = 82, Coolant = 8% | **TRUE** | Path A: Auxiliary Chiller Pump |
| **3** | Valid Shift & Signed In | `!IsBlank(Badge) && Shift = "Morning"` | Badge = "", Shift = "Morning" | **FALSE** | Path B: Lock Station Access |
| **4** | Flammable Material OR Sparks | `IsFlammable \|\| SparksDetected` | Flammable = false, Sparks = false | **FALSE** | Path B: Normal Ventilation |
| **5** | High Scrap AND Machine Fault | `ScrapKg > 50 && ErrorCode <> 0` | ScrapKg = 65, ErrorCode = 0 | **FALSE** | Path B: Standard Shift Log |
| **6** | Tank Full AND NOT Drain Open | `TankLevel >= 95 && !DrainOpen` | TankLevel = 98, DrainOpen = false | **TRUE** | Path A: Automatic Inflow Cutoff |

---

## ❌ 12. Four Common Beginner Misconceptions & Corrections

### Misconception 1: The Human Speech Shortcut Trap
* **Wrong Mental Model:** In conversation, we say: *"Check if the priority is Urgent or Critical."* Beginners type:
  ```powerfx
  // ❌ SYNTAX ERROR:
  If(txtPriority.Text = "Urgent" || "Critical", ...)
  ```
* **Trainer Fix:** Explain that `||` must sit between two **complete questions**. `"Critical"` is a word, not a question!
  ```powerfx
  // ✔️ CORRECT:
  If(txtPriority.Text = "Urgent" || txtPriority.Text = "Critical", ...)
  ```

### Misconception 2: Confusing English "And" with Logical "Or"
* **Wrong Mental Model:** *"I want to filter machines that are on Line 1 and Line 2."* Beginners write:
  ```powerfx
  // ❌ ALWAYS FALSE:
  machineLine = 1 && machineLine = 2
  ```
* **Trainer Fix:** A single machine cannot be in two physical places simultaneously! In software logic, you want:
  ```powerfx
  // ✔️ CORRECT:
  machineLine = 1 || machineLine = 2
  ```

### Misconception 3: Inverting Logic with NOT (De Morgan's Laws)
* **Wrong Mental Model:** To ensure neither Name nor Badge is blank, a beginner writes:
  `!IsBlank(Name) || !IsBlank(Badge)`
* **Trainer Fix:** If Name is filled, `!IsBlank(Name)` is True, so `||` returns True even if Badge is completely empty! To require both, you must use `&&`:  
  `!IsBlank(Name) && !IsBlank(Badge)`.

### Misconception 4: Redundant `= true` Comparisons
* **Wrong Mental Model:** `If(chkHazmat.Value = true && chkSigned.Value = true, ...)`
* **Trainer Fix:** `chkHazmat.Value` already contains the boolean value `true` or `false`. Writing `= true` is asking *"Is it true that it is true?"*. Teach the clean citizen developer idiom: `If(chkHazmat.Value && chkSigned.Value, ...)`.

---

## ❓ 13. Five Knowledge-Check Questions with Detailed Rationales

1. **Question 1:** What is the difference between `&&` and `||` in Power Apps?
   * **Answer:** `&&` (AND) requires **all** conditions to be True; `||` (OR) requires **at least one** condition to be True.
2. **Question 2 (Why question):** *Why* does the expression `Value(txtHours.Text) > 4 && chkHazard.Value` evaluate to FALSE when hours is 6.5 and hazard is unchecked?
   * **Answer:** Because `&&` requires *both* conditions to be True. 6.5 > 4 is True, but `chkHazard.Value` is False. A single False causes an `AND` gate to output False!
3. **Question 3 (What happens if question):** *What happens if* you write `If(Status = "Draft" || Status = "Review" && IsUrgent, ActionA, ActionB)` without parentheses?
   * **Answer:** Power Apps evaluates `&&` before `||`. It interprets the formula as `Status = "Draft" || (Status = "Review" && IsUrgent)`. Any "Draft" will execute ActionA regardless of whether it is urgent or not!
4. **Question 4 (What happens if question):** *What happens if* `txtDowntime.Text` is completely empty, and the formula evaluates `!IsBlank(txtDowntime.Text) && Value(txtDowntime.Text) > 4`?
   * **Answer:** Thanks to short-circuit evaluation, Power Apps evaluates `!IsBlank()` as False and stops immediately. It never executes `Value()` on the empty string, preventing errors!
5. **Question 5:** What is the clean Power Fx idiom to check if a checkbox called `chkSafetyPassed` is NOT checked?
   * **Answer:** `!chkSafetyPassed.Value` (or `chkSafetyPassed.Value = false`).

---

## 🏆 14. Capstone Independent Practice Challenge: Apex Hazmat Dispatch Interlock

### Challenge Scenario:
Apex Plastics is commissioning their hazardous chemical waste dispatch gate. Author the 8 compound Power Fx rules for the dispatch kiosk:

| Rule # | Requirement Description | Required Compound Power Fx Formula | Expected Output |
| :-: | :--- | :--- | :--- |
| **1** | Heavy Hazmat Escort | `If(Value(txtWeight.Text) > 1000 && chkHazmat.Value, "DISPATCH ESCORT", "STANDARD DOCK")` | Requires escort only if both heavy AND hazardous. |
| **2** | Emergency Siren Trigger | `If(chkGasLeak.Value || chkFireAlarm.Value, SoundEvacuationSiren(), GreenLight())` | Siren sounds if gas OR fire alarm active. |
| **3** | Badge & Certification Check | `If(!IsBlank(txtBadge.Text) && chkCertified.Value, DisplayMode.Edit, DisplayMode.Disabled)` | Unlocks dispatch button if badge entered AND certified. |
| **4** | Weekend OR Night Shift | `If(txtDay.Text = "Sunday" || Hour(Now()) >= 22, "NIGHT_PROTOCOL", "DAY_PROTOCOL")` | Night protocol on Sunday OR after 22:00. |
| **5** | Overpressure & High Heat | `If(Value(txtPSI.Text) > 250 && Value(txtTemp.Text) > 100, Color.Red, Color.Blue)` | Label color turns Red if both thresholds exceeded. |
| **6** | Tank Overflow Cutoff | `If(Value(txtLevel.Text) >= 95 && !chkDrainOpen.Value, CloseValve(), OpenValve())` | Close valve if tank $\ge 95\%$ AND drain is NOT open. |
| **7** | Driver Valid AND Signed | `If(!IsBlank(txtDriver.Text) && chkSigned.Value, true, false)` | Validates manifest completion. |
| **8** | Low Stock OR High Demand | `If(Value(txtStock.Text) < 10 || chkUrgentOrder.Value, ReorderParts(), InStock())` | Reorders if inventory $< 10$ OR order is urgent. |

### 100-Point Evaluation Rubric:
* **Level 4: Mastery (100 pts):** All 8 formulas syntactically flawless; correct usage of `&&`, `||`, `!`; proper parentheses grouping; accurate `Value()` wrapping.
* **Level 3: Proficient (75–99 pts):** 6–7 formulas correct; minor typo in property names; understands logic gates clearly.
* **Level 2: Developing (50–74 pts):** Confused `&&` with `||`; omitted parentheses in mixed expressions; syntax assistance required.
* **Level 1: Novice (<50 pts):** Used human language shortcuts (`Status = "A" || "B"`); unable to combine conditions.

---

## 🎒 15. 15-Minute Daily Homework: "The Double-Lock Tracker"

* **Time Required:** $\le 15\text{ minutes}$.
* **Materials Needed:** Paper, pen, or smartphone notepad.
* **Instructions:**
  1. Identify **3 real-life compound decisions** you make every day:
     * One that requires **AND** (two things must both happen).  
       *Example:* `If(AlarmRings && WakeUpTime >= 06:00, GetOutOfBed(), StayInBed())`.
     * One that requires **OR** (either of two things is enough).  
       *Example:* `If(IsRaining || Temperature < 15, WearJacket(), WearTShirt())`.
     * One that uses **NOT** (something is NOT true).  
       *Example:* `If(!FridgeEmpty, CookDinner(), OrderTakeout())`.
  2. Write down your 3 rules in standard Power Fx format: `If(ConditionA && ConditionB, ActionTrue, ActionFalse)`.
  3. Bring your 3 formulas to class tomorrow for the Day 7 morning icebreaker!

---

## 🌉 16. Connection Map (BEFORE ➔ TODAY ➔ NEXT)

```
┌─────────────────────────┐       ┌─────────────────────────┐       ┌─────────────────────────┐
│   YESTERDAY (Day 5)     │       │     TODAY (Day 6)       │       │    TOMORROW (Day 7)     │
│   Single IF Decisions   │ ────► │  AND / OR / NOT Gates   │ ────► │  Business Process Flow  │
│                         │       │                         │       │                         │
│ Condition ➔ True/False  │       │ Multiple Conditions     │       │ Sequence decisions and  │
│ ➔ IF ➔ Action A/B       │       │ ➔ && / || / !           │       │ actions into an end-to- │
│ (Single Railway Switch) │       │ ➔ Consolidated Verdict  │       │ end business process!   │
│                         │       │ (Two-Key Security Gate) │       │                         │
└─────────────────────────┘       └─────────────────────────┘       └─────────────────────────┘
```

---
*End of Day 6 Instructional Plan • Microsoft Power Apps Beginner Program*

