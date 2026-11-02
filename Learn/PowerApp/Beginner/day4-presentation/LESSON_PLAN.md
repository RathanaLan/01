# 🎓 Day 4 Instructional Master Plan: Questions, Conditions, True & False
## 📚 Phase 2: Logic & Decisions • Microsoft Power Apps for Absolute Zero Beginners
> **Instructional Architect:** Microsoft Power Apps Master Trainer & Curriculum Architect  
> **Course Architecture:** Connected 27-Day Curriculum  
> **Central Mental Model:** `REAL PROBLEM ➔ PROCESS ➔ DATA ➔ UI/SCREEN ➔ LOGIC/DECISION ➔ ACTION ➔ STORAGE ➔ FEEDBACK ➔ TEST`  
> **Day 4 Connection Chain:** `Data ➔ Comparison/Question ➔ Condition ➔ True/False`  
> **Core Meaning:** True/False is not the whole logic; it is the binary verdict produced when a condition asks a question about data.  
> **Session Duration:** Exactly 90 Minutes (00:00 – 90:00)  
> **Target Audience:** Absolute zero beginners (factory operators, line technicians, quality inspectors, admin coordinators). No prior coding, Boolean logic, or database knowledge.

---

## 🗺️ Master Curriculum Arc & Connection Map

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        27-DAY MASTER MENTAL MODEL FOR CITIZEN DEVELOPERS               │
│                                                                                        │
│  [1. REAL PROBLEM]  ➔  [2. PROCESS / SEQUENCE]  ➔  [3. DATA & TYPES]  ➔  [4. UI]      │
│                                                            │                           │
│                                                            ▼                           │
│                                                [5. LOGIC & CONDITIONS]                 │
│                                                            ▲                           │
│                                                      (Today: Day 4)                    │
│                                                            ▼                           │
│  [6. ACTION / IF]  ➔  [7. STORAGE]  ➔  [8. FEEDBACK]  ➔  [9. TEST]                     │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

* **Prior Connection (Day 3):** On Day 3, we mastered Data containers: Text, Number, Date/Time, and Boolean. But holding data is passive! Today, we teach the app to **inspect and compare** that data.
* **Today's Anchor (Day 4):** `Data ➔ Comparison/Question ➔ Condition ➔ True/False`. A condition asks a question about data; that question evaluates to strictly **True** or **False**.
* **Forward Bridge (Day 5):** Tomorrow on Day 5, our apps learn how to make decisions (`If/Else`). An app uses the **True/False answer** produced today to choose which branch of action to execute.

---

## ⏱️ Exact 90-Minute Timed Agenda

| Segment | Minute Range | Duration | Pedagogical Phase | Focus & Hands-on Activity |
| :--- | :---: | :---: | :---: | :--- |
| **Part 1** | **00:00 – 10:00** | 10 min | **RECALL & CONNECT** | Welcome, Master Curriculum anchor, active retrieval of Days 1–3, 4 measurable objectives. |
| **Part 2** | **10:00 – 25:00** | 15 min | **DISCOVER (WHY)** | The Apex Plastics $42,000 Mold Burst ("The Unasked Question"), plain concept of a Condition, Rollercoaster Height Stick analogy. |
| **Part 3** | **25:00 – 45:00** | 20 min | **DEEP DIVE THEORY** | The 6 Comparison Questions (`=`, `<>`, `>`, `<`, `>=`, `<=`), comparing text vs numbers vs dates, and the Anatomy of a Condition. |
| **Part 4** | **45:00 – 60:00** | 15 min | **DEMONSTRATE & LAB** | Mid-session pulse check (45:00), Trainer live demo of the interactive Condition Workbench, real-time True/False evaluation. |
| **Part 5** | **60:00 – 75:00** | 15 min | **GUIDED PRACTICE** | Deconstructing Apex Support Form validation rules, Power Fx connections (`IsBlank()`, `Value()`), 6-Condition Truth Evaluator board. |
| **Part 6** | **75:00 – 90:00** | 15 min | **ASSESS & BRIDGE** | 4 common beginner misconceptions, 5-question knowledge check, 8-condition Quality Inspection Gate challenge, rubric, homework & Day 5 bridge. |

---

## 🎯 1. Measurable Learning Objectives
By the end of this 90-minute session, without consulting notes, the learner will be able to:
1. **Define a Condition as a Question:** Explain that a condition is not an action or decision; it is a comparison question comparing data against a benchmark that produces strictly **True** or **False**.
2. **Apply the 6 Comparison Operators:** Use the 6 relational operators (`=`, `<>`, `>`, `<`, `>=`, `<=`) across numbers, text strings, and dates to formulate unambiguous business rules.
3. **Diagnose the "Unasked Question" Hazard:** Explain how passive data displays without active threshold conditions lead to unmonitored hazards and expensive equipment failures.
4. **Author Power Fx Validation Conditions:** Formulate syntactically correct Power Fx comparison formulas (`IsBlank(txtOperator.Text)`, `txtPressure.Text > 200`, `dpDate.SelectedDate <= Today()`).

---

## 🧠 2. 5-Minute Master Concept Map (Spiral Anchor)
* **The Continuous 27-Day Storyline:** We continue expanding the **Apex Plastics Maintenance & Support Request System**.
* **Spiral Connection:**
  * **Day 1:** Identified the real business problem (broken molding press leaking oil).
  * **Day 2:** Sequenced the steps to handle the problem (`SubmitForm() ; Notify() ; Navigate()`).
  * **Day 3:** Structured the data fields (`Text`, `Number`, `Date/Time`, `Boolean`).
  * **Day 4 (Today):** How does the app test whether data is valid and safe?
    * *Is operator name blank?* `IsBlank(txtOperator.Text) ➔ TRUE / FALSE`
    * *Is downtime excessive?* `Value(txtDowntime.Text) > 4.0 ➔ TRUE / FALSE`
    * *Is pressure critical?* `Value(txtPSI.Text) > 200 ➔ TRUE / FALSE`
* **Previewing Day 5:** Tomorrow, the app will make automatic routing decisions based on these True/False answers:
  * `If(Value(txtDowntime.Text) > 4.0, AlertPlantManager(), NotifyShiftLead())`

---

## 🔍 3. Prerequisite Retrieval Questions (Active Recall)
The trainer conducts a 3-minute rapid retrieval check:

* **Question 1 (Day 3 Pillars):** *"What are the 4 fundamental data types of business software?"*
  * **Expected Answer:** **Text** (words/characters), **Number** (quantities/counts), **Date/Time** (calendar moments), and **Yes/No** (Boolean binary states).
* **Question 2 (Day 3 Golden Rule):** *"Why is an employee badge ID like '00482' stored as Text instead of a Number?"*
  * **Expected Answer:** Because of the Golden Test: *"Will you ever calculate with it?"* Storing it as a number drops the leading zeros (`482`), breaking barcode scanners!
* **Question 3 (Day 2 Sequence):** *"In Power Fx, what symbol connects multiple actions in chronological sequence?"*
  * **Expected Answer:** The **semicolon (`;`)**, representing the human instruction *"do this first; then do that next"*.

---

## ⚠️ 4. The "WHY THIS EXISTS" Problem (Workplace Pain)
### The $42,000 "Unasked Question" Disaster at Apex Plastics:
* **The Context:** Plant #3 injection molding shop runs 24/7. Press #4 was equipped with a new digital IoT tablet displaying live sensor readings.
* **The Incident:** At 02:00 AM on the night shift, hydraulic cylinder pressure began creeping upward:
  * 02:05 AM: `160 PSI` (Normal operating range)
  * 02:15 AM: `210 PSI` (Warning threshold)
  * 02:22 AM: `245 PSI` (Critical safety limit)
* **What the App Did:** The tablet faithfully displayed the digits `"245 PSI"` on the glass screen.
* **What the App FAILED to Do:**
  * The app creator displayed the number, but **NEVER WROTE A CONDITION**!
  * The app never asked: `Pressure > 200`.
  * Because the question was never asked, the boolean answer **TRUE** was never produced!
  * Because **TRUE** was never produced, no alarm sounded, no siren flashed, and the automated relief valve was never triggered!
* **The Catastrophic Outcome:**
  * At 02:24 AM, the main hydraulic ram cylinder ruptured with a thunderous blast, spraying atomized oil across the heaters and fracturing the $42,000 hardened P20 tool steel mold.
* **The Core Truth:** Data sitting passively on a screen saves no one. An app must constantly **ask questions** about its data!

---

## 💡 5. Plain-Language Concept Before Technical Vocabulary
* **The 1-Sentence Definition:** A **Condition** is a closed question comparing data against a benchmark that can only produce one of two answers: **True** or **False**.
* **Open Questions vs. Conditions:**
  * *Open Question (Not a condition):* "How does the machine sound?" (Infinite subjective answers).
  * *Condition (Computer logic):* "Is Machine Noise > 85 Decibels?" (Strictly **True** or **False**).
* **The True/False Rule:**
  * In computer software, `True` and `False` are not philosophical concepts; they are the definitive boolean outputs of comparison questions.

---

## 🎢 6. Everyday Analogy: The Rollercoaster Height Stick
To make conditions unforgettable for zero beginners, the trainer introduces the theme park height check:

1. **The Data (The Visitor):** A 7-year-old child approaches the ride gate. Their physical height is **50 inches**.
2. **The Benchmark (The Red Line):** The wooden safety post has a painted red line at **48 inches**.
3. **The Condition (The Question):** The ride attendant visually asks:
   $$\text{Child Height} \ge 48\text{ inches}$$
   $$\text{50} \ge \text{48} \implies \mathbf{TRUE}$$
4. **The Action (Tomorrow's IF):** Because the condition evaluated to **True**, the gate opens and the child boards the ride!
5. **The Rejection:** A toddler who is 40 inches tall approaches.
   $$\text{40} \ge \text{48} \implies \mathbf{FALSE}$$
   Because the verdict is **False**, the attendant steps in and says: *"Sorry, not today."*
* **The Pedagogical Insight:** The height stick does not push the child onto the ride. The height stick only asks the question!

---

## 🏭 7. Manufacturing Workplace Example: The Extruder Line 4 Quality Gate
At Apex Plastics, every molded automotive connector passes through a 3-point digital safety check:
1. **Temperature Question:** `MeltTemp >= 210` (Is the plastic liquid enough to fill the cavity?)
2. **Pressure Question:** `InjectionPressure <= 200` (Is pressure safe to prevent flashing?)
3. **Clamp Question:** `SafetyGateClosed = true` (Is the operator shielded from pinch hazards?)
* If all three conditions evaluate to **True**, the press cycles. If any condition evaluates to **False**, the cycle aborts immediately.

---

## 📊 8. Visual Cause-and-Effect Flow Diagram: Anatomy of a Condition

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        THE 3-PART ANATOMY OF A LOGICAL CONDITION                       │
│                                                                                        │
│   [PART 1: THE DATA]          [PART 2: THE OPERATOR]       [PART 3: THE BENCHMARK]     │
│   (Live Variable Value)       (The Comparison Question)     (The Standard / Threshold) │
│                                                                                        │
│     txtDowntime.Text                    >                             4.0              │
│       ("5.5 Hours")             ("Greater Than?")               ("4.0 Hours")          │
│             │                                                         │                │
│             └───────────────────────────┬─────────────────────────────┘                │
│                                         ▼                                              │
│                            [THE VERDICT: BOOLEAN VALUE]                                │
│                                        TRUE                                            │
│                                         │                                              │
│                                         ▼                                              │
│                        [TOMORROW: DAY 5 IF() TAKES ACTION]                             │
│                           AlertSupervisor("Downtime Alert")                            │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🏆 The 6 Fundamental Comparison Questions
Every condition in Power Apps, Excel, and computer science is built from these 6 relational operators:

| Symbol | Plain-English Question | Workplace Example | Sample Data | Truth Verdict |
| :-: | :--- | :--- | :--- | :-: |
| **`=`** | Is it exactly **equal to**? | `txtDept.Text = "Molding"` | `"Molding" = "Molding"` | **TRUE** |
| **`<>`** | Is it **not equal to** (different)? | `txtStatus.Text <> "Closed"` | `"In Progress" <> "Closed"` | **TRUE** |
| **`>`** | Is it strictly **greater than**? | `Value(txtPSI.Text) > 200` | `245 > 200` | **TRUE** |
| **`<`** | Is it strictly **less than**? | `Value(txtStock.Text) < 10` | `25 < 10` | **FALSE** |
| **`>=`** | Is it **greater than or equal to**? | `Value(txtTemp.Text) >= 100` | `100 >= 100` | **TRUE** |
| **`<=`** | Is it **less than or equal to**? | `Value(txtHours.Text) <= 0.5` | `2.5 <= 0.5` | **FALSE** |

---

## 🖥️ 9. Trainer Demonstration Steps (The Condition Workbench)
The trainer conducts a 15-minute live demonstration using Slide 12's interactive workbench:
1. **Demonstrate Dynamic Numeric Comparison:** Drag the Pressure Slider between 50 and 300 PSI. Show that at 195 PSI, the condition `Pressure > 200` evaluates to **FALSE**. Drag past 200 to 215 PSI; highlight the badge instantly transforming into radiant emerald **TRUE**.
2. **Demonstrate Text Field Validation:** Point to the Operator Name input. Type `"Sophea Chem"`. Show `IsBlank(OperatorName)` evaluates to **FALSE**. Clear the text box; show `IsBlank()` instantly flip to **TRUE**.
3. **Demonstrate Hardware Toggle:** Click the Emergency Switch. Show binary boolean evaluation (`true = true` ➔ **TRUE**).

---

## 👥 10. Guided Learner Practice (The 6-Condition Truth Evaluator)
**Workplace Scenario:** Apex Plastics Extruder Line 4 Safety Audit.
Learners test 6 live condition statements on Slide 18's interactive evaluator:

| # | Condition Expression | Sensor Reading | Mental Calculation | Expected Truth |
| :-: | :--- | :--- | :--- | :-: |
| **1** | `BarrelTemp > 230` | `245°C` | Is 245 > 230? | **TRUE** |
| **2** | `SafetyGate = true` | `true` | Is true equal to true? | **TRUE** |
| **3** | `PelletStock < 10` | `8%` | Is 8 < 10? | **TRUE** |
| **4** | `Pressure <= 180` | `195 PSI` | Is 195 <= 180? | **FALSE** |
| **5** | `TechAssigned <> ""` | `"Sophea"` | Is "Sophea" different from empty? | **TRUE** |
| **6** | `CalibDate >= Today()` | `"2026-10-15"` | Is Oct 15 >= Oct 29? | **FALSE** |

---

## ✍️ 11. Independent Mini-Task: The Personal Speedometer Audit (3 Minutes)
Learners spend 3 minutes with pen and paper mapping a highway speed limit:
* **The Data:** Car speed reading = `72 MPH`.
* **The Benchmark:** Highway speed limit sign = `65 MPH`.
* **The Condition:** `CarSpeed > SpeedLimit` (`72 > 65`).
* **The Boolean Verdict:** **TRUE** (Vehicle is speeding).
* **The Real-World Action:** Driver takes foot off gas pedal.

---

## ⚡ Power Fx Syntax Bridge: Questions & Conditions
The trainer demonstrates the required 5-step instructional pattern:

### 1. Checking Numeric Thresholds
* **Business Requirement:** Alert maintenance when downtime exceeds 4 hours.
* **Plain-English Rule:** Is the downtime hours number greater than 4?
* **Power Fx Condition:**
  ```powerfx
  Value(txtDowntime.Text) > 4.0
  ```
* **Resulting Verdict:** Evaluates to `true` or `false`.

### 2. Checking Text Equality
* **Business Requirement:** Restrict equipment recalibration to the Molding Department.
* **Plain-English Rule:** Is the department text exactly equal to "Molding"?
* **Power Fx Condition:**
  ```powerfx
  txtDepartment.Text = "Molding"
  ```
* **Resulting Verdict:** Evaluates to `true` or `false` (case-insensitive in Power Apps).

### 3. Validating Empty Fields: `IsBlank()`
* **Business Requirement:** Ensure an operator cannot submit an issue without an asset ID.
* **Plain-English Rule:** Is the asset ID text input blank?
* **Power Fx Condition:**
  ```powerfx
  IsBlank(txtAssetID.Text)
  ```
* **Resulting Verdict:** Returns `true` if empty, `false` if text is present.

---

## ⚠️ 12. Common Beginner Misconceptions & Trainer Corrections

| # | Plausible Wrong Mental Model | Why the Beginner Thinks This | Trainer Correction & Real-World Truth |
| :-: | :--- | :--- | :--- |
| **1** | **"True/False is the decision."** | In conversation, people say "The computer said yes." | **Trainer Correction:** True and False are merely the **answers** to a question. Tomorrow on Day 5, the `If()` function is what actually makes the decision and chooses an action. |
| **2** | **"Writing = means set this value."** | In algebra, $x = 5$ assigns 5 to $x$. | **Trainer Correction:** In Power Fx conditions, `=` is an inquiry: *"Is Left equal to Right?"*. It never changes data. Changing data uses functions like `Set()`. |
| **3** | **"I need to put quotes around 'true'."** | Beginners confuse words with keywords. | **Trainer Correction:** Writing `"true"` creates a text string. Pure Boolean logic uses bare keywords: `true` and `false` without quotes. |
| **4** | **"A condition can do an action by itself."** | Beginners expect `Pressure > 200` to sound an alarm. | **Trainer Correction:** A condition is completely passive. It evaluates truth, but it cannot send emails or navigate screens without an enclosing `If()` action wrapper. |

---

## ❓ 13. 5-Question Evaluative Knowledge Check

### Q1: What is the fundamental purpose of a Condition in software logic?
* **A)** To execute an action like sending an email immediately.
* **B) (Correct)** To ask a comparison question about data that produces strictly True or False.
* **C)** To create a new table inside SharePoint.
* **D)** To change the font color on the mobile screen.
* *Pedagogical Rationale:* Reinforces that conditions evaluate truth rather than executing actions.

### Q2 (What Happens If): Why did the hydraulic cylinder burst at Apex Plastics even though the pressure gauge showed 245 PSI?
* **A)** Because the sensor battery was dead.
* **B)** Because the tablet was stolen by an operator.
* **C) (Correct)** Because the app passively displayed the number without ever asking the condition `Pressure > 200` to trigger an alarm.
* **D)** Because 245 is less than 200.
* *Pedagogical Rationale:* Directly assesses comprehension of the "unasked question" hazard and the necessity of threshold conditions.

### Q3: What does the Power Fx expression 'Value(txtDowntime.Text) > 4.0' evaluate to when txtDowntime contains '2.5'?
* **A)** TRUE
* **B) (Correct)** FALSE
* **C)** Error: Numbers cannot be compared.
* **D)** "2.54.0"
* *Pedagogical Rationale:* Evaluates numeric relational math ($2.5 > 4.0 \implies \text{FALSE}$).

### Q4 (Why): What happens if a citizen developer writes 'IsBlank(txtOperator.Text)' in an app?
* **A)** It deletes the operator's name from memory.
* **B) (Correct)** It asks whether the text box is empty, returning TRUE if empty and FALSE if text was entered.
* **C)** It converts the operator's name into a number.
* **D)** It opens a blank new screen.
* *Pedagogical Rationale:* Verifies command of Power Fx validation helpers.

### Q5: Why is True/False NOT the complete decision in Power Apps?
* **A)** Because True and False are only used in math class.
* **B) (Correct)** Because True/False is merely the answer to a question; tomorrow's IF() function is what actually chooses which action to run.
* **C)** Because Power Apps does not allow decisions.
* **D)** Because True and False expire after 24 hours.
* *Pedagogical Rationale:* Bridges directly to Day 5 by positioning Boolean truth as the prerequisite fuel for `If()`.

---

## 🏆 14. 10-Minute Capstone Challenge: Quality Inspection Gate (8 Rules)
### Challenge Scenario:
Apex Plastics needs a digital Quality Gate screen to verify whether manufactured automotive parts pass inspection before packing onto shipping pallets.

### Task:
Formulate each condition expression and determine its Boolean verdict for **Sample Part #882**:

| # | Quality Inspection Standard | Sample Part #882 Data | Target Condition Expression | Evaluates To |
| :-: | :--- | :--- | :--- | :-: |
| **1** | Part Weight $\ge$ 48.0g | `49.5g` | `Value(txtWeight.Text) >= 48.0` | **TRUE** |
| **2** | Defect Count $= 0$ | `0` | `Value(txtDefects.Text) = 0` | **TRUE** |
| **3** | Cavity ID $<>$ "C-99" | `"C-04"` | `txtCavity.Text <> "C-99"` | **TRUE** |
| **4** | Melt Temp $\ge$ 210°C | `218°C` | `Value(txtTemp.Text) >= 210` | **TRUE** |
| **5** | Inspector Name Not Empty | `"Dara Chem"` | `IsBlank(txtInspector.Text) = false` | **TRUE** |
| **6** | Inspection Date $\le$ Today() | `Today()` | `dpDate.SelectedDate <= Today()` | **TRUE** |
| **7** | Wall Thickness $\ge$ 2.5mm | `2.1mm` | `Value(txtThick.Text) >= 2.5` | **FALSE** |
| **8** | Visual QC Passed $= true$ | `true` | `chkVisual.Value = true` | **TRUE** |

### Evaluation Rubric:

| Performance Level | Criteria & Observable Competency |
| :---: | :--- |
| **Level 4: Mastery (100%)** | All 8 conditions syntactically correct; uses `Value()` for numeric strings; correctly identifies that Part #882 **FAILS** quality inspection because Rule 7 evaluates to **FALSE**. |
| **Level 3: Proficient (75–99%)** | 6–7 conditions correct; accurately uses comparison symbols; minor syntax omission. |
| **Level 2: Developing (50–74%)** | 4–5 conditions correct; confused `<>` with `=`; forgot quotes on text strings; evaluated Rule 7 incorrectly. |
| **Level 1: Novice (<50%)** | Treats conditions as actions; confuses True/False with text words "Yes"/"No". |

---

## 🎒 15. 15-Minute Daily Homework: "The Real-Life Condition Scout"
* **Duration:** $\le$ 15 Minutes at home.
* **Task Steps:**
  1. Identify **3 real-life conditions** you evaluate every day (e.g., alarm time, car gas gauge, refrigerator milk expiration).
  2. Write each on paper in the 3-part anatomy: `[Left Data] + [Operator] + [Right Benchmark]`.
     * Example: `CarFuelLevel < 15%`
     * Example: `CurrentTime >= 06:30`
  3. Note whether the condition evaluated to **True** or **False** today.
* **Deliverable:** Bring your 3 conditions to share in tomorrow morning's Day 5 opening circle!

---

## 🌐 16. Bilingual Technical Glossary (English & ភាសាខ្មែរ)

| English Term | ភាសាខ្មែរ (Khmer) | Plain-Language Definition | Workplace Context |
| :--- | :--- | :--- | :--- |
| **Condition** | លក្ខខណ្ឌ (សំណួរប្រៀបធៀប) | A comparison question that evaluates data to produce True or False. | `txtPressure.Text > 200`. |
| **Comparison Operator** | សញ្ញាប្រមាណវិធីប្រៀបធៀប | The relational symbols (`=`, `<>`, `>`, `<`, `>=`, `<=`) that ask questions. | Checking if stock `< 10`. |
| **True / False** | ពិត / មិនពិត (ចម្លើយតក្កវិទ្យា) | The two definitive boolean outputs of every condition in computer memory. | `245 > 200 ➔ TRUE`. |
| **Equal / Not Equal** | ស្មើ (=) / មិនស្មើ (<>) | Asking if two values match exactly or are different. | `txtStatus.Text <> "Closed"`. |
| **Greater / Less Than** | ធំជាង (>) / តូចជាង (<) | Comparing mathematical quantities against a threshold. | `Value(txtDowntime.Text) > 4`. |
| **IsBlank Function** | អនុគមន៍ពិនិត្យប្រអប់ទទេ | Power Fx helper that returns True if a text field has zero characters. | `IsBlank(txtOperator.Text)`. |

---

## 🚀 17. Connection Map (Curriculum Forward Bridge)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              THE THREE-DAY CURRICULUM BRIDGE                           │
│                                                                                        │
│   YESTERDAY (Day 3)                TODAY (Day 4)                   TOMORROW (Day 5)    │
│  ┌──────────────────┐             ┌──────────────────┐            ┌──────────────────┐ │
│  │ Data & Container │    ──➔      │ Questions &      │    ──➔     │  IF / Decisions  │ │
│  │ Types (Pillars)  │  Compared   │ Conditions       │  Decides   │  & Actions       │ │
│  │ Text, Num, Date  │     by      │ Yields T / F     │   Action   │ If(Condition,    │ │
│  │                  │             │                  │            │    ActionTrue,   │ │
│  │                  │             │                  │            │    ActionFalse)  │ │
│  └──────────────────┘             └──────────────────┘            └──────────────────┘ │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

* **What We Mastered Yesterday (Day 3):** Instructions require typed data containers (**Text**, **Number**, **Date/Time**, **Yes/No**). Container shapes dictate what operations are legal.
* **What We Mastered Today (Day 4):** Data is actively compared using **Conditions** and relational operators (`=`, `<>`, `>`, `<`, `>=`, `<=`). A condition produces strictly **True** or **False**.
* **What We Master Tomorrow (Day 5):** **IF & Decisions** (`If/Else`). How does an app make a business decision?
  * `If(Condition, ActionIfTrue, ActionIfFalse)`
  * `If()` takes today's True/False verdict and chooses which action to execute!

