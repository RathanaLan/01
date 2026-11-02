# 🎓 Day 3 Instructional Master Plan: Data — What an App Knows and Remembers
## 📚 Phase 1: Foundation • Microsoft Power Apps for Absolute Zero Beginners
> **Instructional Architect:** Microsoft Power Apps Master Trainer & Curriculum Architect  
> **Course Architecture:** Connected 27-Day Curriculum  
> **Central Mental Model:** `REAL PROBLEM ➔ PROCESS ➔ DATA ➔ UI/SCREEN ➔ LOGIC/DECISION ➔ ACTION ➔ STORAGE ➔ FEEDBACK ➔ TEST`  
> **Day 3 Connection Chain:** `Information ➔ Value ➔ Type ➔ Stored Data`  
> **Core Meaning:** App steps operate on values such as names, numbers, dates, and yes/no flags; container types determine what operations are physically and mathematically legal.  
> **Session Duration:** Exactly 90 Minutes (00:00 – 90:00)  
> **Target Audience:** Absolute zero beginners (factory operators, line technicians, warehouse inventory clerks, admin coordinators). No prior coding, Boolean logic, or database knowledge.

---

## 🗺️ Master Curriculum Arc & Connection Map

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        27-DAY MASTER MENTAL MODEL FOR CITIZEN DEVELOPERS               │
│                                                                                        │
│  [1. REAL PROBLEM]  ➔  [2. PROCESS / SEQUENCE]  ➔  [3. DATA & TYPES]  ➔  [4. UI]      │
│                                                            ▲                           │
│                                                      (Today: Day 3)                    │
│                                                            ▼                           │
│  [5. LOGIC / DECISION]  ➔  [6. ACTION]  ➔  [7. STORAGE]  ➔  [8. FEEDBACK]  ➔  [9. TEST]│
└────────────────────────────────────────────────────────────────────────────────────────┘
```

* **Prior Connection (Day 2):** On Day 2, we learned that instructions follow an ordered sequence: `Step 1 ; Step 2 ; Step 3`. But what do those steps process? **Information!** A calculation step cannot run without numbers; a notification step cannot send without names and emails.
* **Today's Anchor (Day 3):** `Information ➔ Value ➔ Type ➔ Stored Data`. Every piece of business information is stored in a typed digital container (Text, Number, Date/Time, Yes/No).
* **Forward Bridge (Day 4):** Tomorrow on Day 4, our apps learn how to make decisions (`Logic & Decisions: If/Else`). An app makes a decision by **inspecting Data** (`If(DowntimeHours > 2, NotifySupervisor(), AutoApprove())`). Without typed data today, conditional logic tomorrow is impossible.

---

## ⏱️ Exact 90-Minute Timed Agenda

| Segment | Minute Range | Duration | Pedagogical Phase | Focus & Hands-on Activity |
| :--- | :---: | :---: | :---: | :--- |
| **Part 1** | **00:00 – 10:00** | 10 min | **RECALL & CONNECT** | Welcome, Master Curriculum anchor, active retrieval of Day 1 (IPO) and Day 2 (Sequence), 4 measurable objectives. |
| **Part 2** | **10:00 – 25:00** | 15 min | **DISCOVER (WHY)** | The Apex Plastics $24,000 Inventory Crash (`"10" + "20" = "1020"`), Data vs. Information, and the Kitchen Pantry Jar analogy. |
| **Part 3** | **25:00 – 45:00** | 20 min | **DEEP DIVE THEORY** | The 4 Fundamental Types (Text, Number, Date/Time, Boolean), the Phone Number & ZIP Code Rule, and visual Type Collision diagram. |
| **Part 4** | **45:00 – 60:00** | 15 min | **DEMONSTRATE & LAB** | Mid-session pulse check (45:00), Trainer live demo of the interactive Data Inspector Lab, legal vs. illegal operations. |
| **Part 5** | **60:00 – 75:00** | 15 min | **GUIDED PRACTICE** | Support form blueprint deconstruction, Power Fx connections (`Value()`, `Text()`, `IsBlank()`), 6-field interactive classifier board. |
| **Part 6** | **75:00 – 90:00** | 15 min | **ASSESS & BRIDGE** | 4 common beginner misconceptions, 5-question knowledge check, 8-field Maintenance Log capstone challenge, rubric, homework & Day 4 bridge. |

---

## 🎯 1. Measurable Learning Objectives
By the end of this 90-minute session, without consulting reference notes, the learner will be able to:
1. **Comprehend Data vs. Information:** Explain the distinction between raw data (unlabeled facts) and actionable information (structured data with business context) using simple everyday metaphors.
2. **Classify the 4 Fundamental Types:** Categorize workplace values into **Text (String)**, **Number**, **Date/Time**, and **Yes/No (Boolean)** with 100% precision, correctly applying the Golden Rule to phone numbers, employee badge IDs, and postal codes.
3. **Diagnose and Prevent Type Collisions:** Predict what happens when operations mismatch containers (such as text concatenation `"10" & "20" = "1020"`) and explain why computers never "guess" intent.
4. **Map Fields to Power Apps Controls & Power Fx:** Match each data type to its corresponding Power Apps screen control (TextInput, DatePicker, Toggle) and apply foundational Power Fx functions (`Value()`, `Text()`, `IsBlank()`, `Today()`).

---

## 🧠 2. 5-Minute Master Concept Map (Spiral Anchor)
* **The Continuous 27-Day Storyline:** We continue expanding the **Apex Plastics Maintenance & Support Request System**.
* **Spiral Connection:**
  * **Day 1:** Identified the real business problem (broken molding machine leaking oil).
  * **Day 2:** Sequenced the steps to handle the problem (`SaveRecord() ; NotifyMechanic() ; PrintTag()`).
  * **Day 3 (Today):** What information is held in each step?
    * Operator Name: `Text`
    * Machine Identifier: `Text`
    * Downtime Hours: `Number`
    * Timestamp: `Date/Time`
    * Safety Hazard Present?: `Yes/No`
* **Previewing Day 4:** Tomorrow, the app will make automatic routing decisions based on these values:
  * `If(SafetyHazard = true, SoundAlarm(), LogNormal())`
  * `If(DowntimeHours > 4, AlertPlantManager(), NotifyShiftLead())`

---

## 🔍 3. Prerequisite Retrieval Questions (Active Recall)
The trainer conducts a 3-minute rapid retrieval check with the whole room:

* **Question 1 (Day 1 Foundation):** *"What are the three core stages of any digital software application?"*
  * **Expected Answer:** **Input ➔ Process ➔ Output.** Real human problems are solved when input data is processed into useful output.
* **Question 2 (Day 2 Sequence):** *"What happens if all individual instructions in an app are correct, but their order is swapped?"*
  * **Expected Answer:** The app produces a wrong result or catastrophe (e.g., sending an alert email before saving the record).
* **Question 3 (Day 2 Syntax):** *"In Power Fx, what punctuation mark links multiple instructions together in chronological sequence?"*
  * **Expected Answer:** The **semicolon (`;`)**, representing the human instruction *"do this first; then do that next"*.

---

## ⚠️ 4. The "WHY THIS EXISTS" Problem (Workplace Pain)
### The $24,000 Inventory Catastrophe at Apex Plastics:
* **The Context:** Plant #3 injection molding shop runs 24/7 producing automotive plastic connectors from raw polymer pellets.
* **The Action:** The intake supervisor created a simple digital tablet app so line leads could request extra resin pellets from the central warehouse.
  * Shift 1 supervisor entered: `10` (meaning 10 pallets).
  * Shift 2 supervisor entered: `20` (meaning 20 pallets).
* **The Intended Business Math:** $10 + 20 = 30$ pallets ($6,000 value).
* **What the Computer Actually Executed:**
  * The app creator left the input fields as generic `Text (String)` containers.
  * To a computer chip, when you use the addition/join operator on text, it **concatenates** (glues letters together): `"10"` + `"20"` = `"1020"`!
* **The Catastrophic Outcome:**
  * At 06:00 AM the following morning, four 18-wheel tractor-trailers arrived at Dock B delivering **1,020 pallets of resin ($204,000)**.
  * The loading dock was completely blocked, incoming shipments were diverted, emergency storage tents had to be rented, and freight return penalties totaled **$24,000**!
* **The Lesson:** Data types are not computer science theory; they are the fundamental **safety rails** of business automation.

---

## 💡 5. Plain-Language Concept Before Technical Vocabulary
* **The Raw Ingredient vs. Finished Meal Rule:**
  * **Data:** Raw, unorganized, isolated facts with no context:
    * `"45"` (Is it 45 dollars? 45 seconds? 45 degrees Celsius?)
    * `"John"` (Is he a technician, a vendor, or a visitor?)
    * `true` (Is the motor on? Is the safety gate closed?)
  * **Information:** Data that has been organized, labeled, typed, and presented with business context:
    * *"Downtime Duration: 45 Minutes on Press #4."*
    * *"Logged Operator: John Doe (Shift Lead)."*
    * *"Emergency Stop Activated: TRUE (Immediate Maintenance Required)."*
* **The Universal Rule:** An app exists to capture **Raw Data**, store it in the correct **Container Type**, and transform it into **Actionable Information** so humans can make informed business decisions.

---

## 🍯 6. Everyday Analogy: The Labeled Kitchen Pantry Jars
To make data types unforgettable for zero beginners, the trainer introduces the Kitchen Pantry Metaphor:

1. **The Cookie Tin (Text / String):**
   * Can hold any shape: animal crackers, round cookies, pretzel sticks, or letters.
   * Very flexible, but you **cannot perform arithmetic** on cookies!
2. **The Calibrated Measuring Cup (Number):**
   * Marked with precise milliliter and ounce lines.
   * Designed strictly for measuring quantities. Ready for addition, subtraction, and averaging.
3. **The Freshness Clock / Calendar (Date/Time):**
   * Tells you when food was cooked and when it expires.
   * Understands calendar days, months, leap years, and elapsed hours.
4. **The Pantry Light Switch (Yes/No / Boolean):**
   * Has exactly TWO physical positions: **ON** or **OFF**.
   * There is no middle option. Zero ambiguity.
* **The Disaster Metaphor:** What happens if you try to pour 1 liter of fresh cow's milk into a cardboard egg carton? It leaks all over the pantry floor! In an app, pouring text into a numeric container or performing math on letters creates an identical digital mess.

---

## 🏭 7. Manufacturing / DX Workplace Scenario
* **Company:** Apex Plastics Manufacturing • Injection Molding Facility (Plant #3).
* **System Under Construction:** Equipment Maintenance & Incident Logging App.
* **The 5 Core Screen Fields:**
  1. `txtOperator`: Operator Full Name (`"Sophea Chem"`) ➔ **Text**
  2. `txtDept`: Department Code (`"DEPT-PLAST-04"`) ➔ **Text**
  3. `txtDowntime`: Machine Lost Hours (`2.5`) ➔ **Number**
  4. `dpIncidentDate`: Incident Date (`2026-10-29`) ➔ **Date/Time**
  5. `chkHazard`: Safety Hazard Present? (`true`) ➔ **Yes/No (Boolean)**

---

## 📊 8. Visual Cause-and-Effect Flow Diagram: Type Collisions

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        DATA TYPE COLLISION CAUSE-AND-EFFECT FLOW                       │
│                                                                                        │
│  [Human Input: "50" & "10"]                                                            │
│          │                                                                             │
│          ├───────────────────────────────┬───────────────────────────────┐             │
│          ▼                                                               ▼             │
│   Treated as TEXT (String)                                       Treated as NUMBER     │
│   Container: Cookie Tin                                          Container: Cup        │
│   Operation: Text Concatenation (&)                              Operation: Math (+)   │
│          │                                                               │             │
│          ▼                                                               ▼             │
│   Result: "5010" (Pallets Ordered!)                              Result: 60 (Pallets)  │
│   ❌ $24,000 WAREHOUSE CRISIS                                    ✅ ACCURATE DELIVERY  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🏆 The Golden Rule: When is a Number NOT a Number?
The trainer teaches the **Golden Diagnostic Question**:
> *"Will you EVER perform a mathematical calculation (add, subtract, multiply, average) on this value?"*

* If the answer is **NO**, the value belongs in a **Text** container!
* **Proof Points:**
  * **Phone Numbers (`"+855-23-888-999"`):** Contain plus signs and hyphens. You never add two phone numbers together.
  * **ZIP / Postal Codes (`"02138"`):** If stored as a number, computer chips strip leading zeros, turning Boston ZIP `02138` into `2138`, breaking postal routing!
  * **Employee Badge Numbers (`"00482"`):** Dropping leading zeros breaks ID verification scanners.

---

## 🖥️ 9. Trainer Demonstration Steps (The Data Inspector Lab)
The trainer conducts a 15-minute live demonstration using the interactive Data Inspector (Slide 12):
1. **Demonstrate Text:** Click `"Injection Press #2"`. Show detected type `Text (String)`. Explain permitted operations (Concatenate `&`, Search, Upper, Lower) and prohibited operations (Math `+`, Sum).
2. **Demonstrate Number:** Click `485.50`. Show bare digits without quotes. Highlight permitted operations (`+`, `-`, `*`, `/`, Average).
3. **Demonstrate Phone Number:** Click `"+855-23-999-111"`. Demonstrate why the inspector classifies it as Text and how numeric conversion would crash due to hyphens.
4. **Demonstrate Date/Time:** Click `Today()`. Show temporal operations (`DateAdd`, `DateDiff`).
5. **Demonstrate Boolean:** Click `true`. Explain the binary states of computer memory (Bit: 1 or 0).

---

## 👥 10. Guided Learner Practice (The 6-Field Classifier)
**Workplace Scenario:** Apex Plastics Spare Parts Crib.
Learners categorize 6 physical inventory fields using Slide 18's interactive classification board:

| # | Field Name | Sample Data | Correct Type | Container Bin | Business Rationale |
| :-: | :--- | :--- | :---: | :---: | :--- |
| **1** | Part Serial Number | `"SN-8841-A"` | **Text** | Text Container | Alphanumeric string with letters and hyphens. |
| **2** | Quantity in Stock | `25` | **Number** | Number Container | Physical inventory count that decrements on usage. |
| **3** | Unit Replacement Cost | `$120.50` | **Number** | Number Container | Dollar value used to calculate total inventory value. |
| **4** | Last Inspection Date | `2026-10-15` | **Date/Time** | Date Container | Calendar timestamp used to track maintenance due dates. |
| **5** | Needs Immediate Reorder? | `true` | **Yes/No** | Boolean Container | Binary flag that triggers supplier purchase orders. |
| **6** | Warehouse Bay Location | `"BAY-04-NORTH"` | **Text** | Text Container | Physical coordinate code in Building C. |

---

## ✍️ 11. Independent Mini-Task: The Personal Wallet Audit (3 Minutes)
Learners spend 3 minutes auditing their physical wallet or workspace:
* **Item 1:** Cash bill value (`$20.00`) ➔ **Number** (Math: can be added to calculate total cash).
* **Item 2:** Driver's License Number (`"D-109-842"`) ➔ **Text** (Golden rule: no math; contains hyphens).
* **Item 3:** Card Expiration Date (`"11/28"`) ➔ **Date/Time** (Temporal: compared against today's date).
* **Item 4:** Organ Donor Registered? (`true`) ➔ **Yes/No (Boolean)** (Binary status flag).

---

## ⚡ Power Fx Syntax Bridge: Reading & Converting Data
The trainer introduces Power Fx formulas using the required 5-step instructional pattern:

### 1. Converting Text Digits to Numbers: `Value()`
* **Business Requirement:** An operator types `"45.5"` into a text box, and the app must add it to existing stock.
* **Plain-English Rule:** Take the text characters in the box and convert them into a real math number.
* **Power Fx Implementation:**
  ```powerfx
  // Converts string "45.5" to numeric 45.5
  Value(txtDowntime.Text) + 10
  ```
* **Explanation:** `Value()` extracts numeric digits from a string container so mathematical operations (`+`, `-`, `*`) are legal.

### 2. Formatting Numbers and Dates as Text: `Text()`
* **Business Requirement:** Display a clean currency label on screen for an executive report.
* **Plain-English Rule:** Format the raw number 5420 into a formatted currency string.
* **Power Fx Implementation:**
  ```powerfx
  // Formats numeric 5420 into "$5,420.00"
  Text(5420, "$#,###.00")
  
  // Formats system date into "29-Oct-2026"
  Text(Today(), "dd-mmm-yyyy")
  ```

### 3. Validating Empty Fields: `IsBlank()`
* **Business Requirement:** Prevent an operator from submitting a maintenance ticket if the name field is empty.
* **Condition / Question:** Is the text input completely empty?
* **Resulting Boolean:** Evaluates to `true` or `false`.
* **Power Fx Implementation:**
  ```powerfx
  // Returns true if operator name is empty
  IsBlank(txtOperator.Text)
  ```

---

## ⚠️ 12. Common Beginner Misconceptions & Trainer Corrections

| # | Plausible Wrong Mental Model | Why the Beginner Thinks This | Trainer Correction & Real-World Truth |
| :-: | :--- | :--- | :--- |
| **1** | **"If it has digits, it must be a Number."** | Humans see digits `0–9` and instinctively call them numbers. | **Trainer Correction:** Phone numbers, badge IDs, and postal codes are **Text**. True numbers are reserved exclusively for values used in calculations. Numbers strip leading zeros (`02138` ➔ `2138`) and crash on symbols like `+` or `-`. |
| **2** | **"Yes/No is just typing the words 'Yes' or 'No'."** | People talk in conversational English words. | **Trainer Correction:** In computer memory, Yes/No is a binary **Boolean** state (`true` or `false`). Storing it as text wastes storage and breaks conditional branching in `If()` statements. |
| **3** | **"The app will automatically guess and do math."** | Modern consumer apps hide technical seams. | **Trainer Correction:** Computers never guess. A TextInput control always emits `Text`. Adding two text inputs glues them together (`"10" & "20" = "1020"`). You must explicitly use `Value()` or set the control mode to Numeric. |
| **4** | **"Dates are just simple text words like 'October 29'."** | Humans write dates casually on paper. | **Trainer Correction:** Storing a date as text prevents the app from calculating days elapsed (`DateDiff`), evaluating past-due status, or sorting records chronologically. |

---

## ❓ 13. 5-Question Evaluative Knowledge Check

### Q1: Why is an employee phone number like "+855-12-345-678" stored as Text instead of a Number?
* **A)** Because it has more than 8 digits.
* **B) (Correct)** Because you will never perform mathematical calculations on it, and numeric containers drop plus signs and leading zeros.
* **C)** Because Power Apps does not support numbers larger than 100.
* **D)** Because phone numbers change frequently.
* *Pedagogical Rationale:* Reinforces the Golden Test (*"Will you ever calculate with it?"*) and the preservation of leading formatting.

### Q2 (What Happens If): What happens if an app treats two pallet quantity inputs ("10" and "20") as Text instead of Numbers?
* **A)** The computer crashes immediately with a blue screen.
* **B)** It adds them mathematically to 30.
* **C) (Correct)** It concatenates the text strings into "1020", potentially ordering 1,020 pallets!
* **D)** It converts them to Yes/No booleans.
* *Pedagogical Rationale:* Directly assesses comprehension of the Apex Plastics $24,000 case study and the difference between string concatenation and math.

### Q3: Which Power Fx function safely converts the text string "45.5" into a mathematical number?
* **A)** `Text("45.5")`
* **B) (Correct)** `Value("45.5")`
* **C)** `IsBlank("45.5")`
* **D)** `Today("45.5")`
* *Pedagogical Rationale:* Verifies command of foundational Power Fx data conversion bridges.

### Q4 (Why): Why is storing dates in a dedicated Date/Time container better than storing "29-Oct-2026" as plain text?
* **A)** Date containers use less colorful fonts on screen.
* **B) (Correct)** Date containers allow the app to calculate elapsed days, check expiration, and sort chronologically.
* **C)** Date containers prevent anyone from changing the machine language.
* **D)** There is no difference; both behave identically.
* *Pedagogical Rationale:* Assesses understanding of container capabilities beyond basic visual display.

### Q5: A factory toggle switch for "Emergency Stop Activated" holds what fundamental data type?
* **A)** Number (either 0 or 100)
* **B)** Text ("YES" or "NO")
* **C) (Correct)** Yes/No (Boolean true or false)
* **D)** Date/Time
* *Pedagogical Rationale:* Validates binary state recognition, linking hardware sensors directly to Boolean logic.

---

## 🏆 14. 10-Minute Capstone Challenge: Equipment Maintenance Log (8 Fields)
### Challenge Scenario:
Apex Plastics Plant #3 needs an Equipment Maintenance Log screen to replace paper clipboards across 12 injection molding presses.

### Task:
Classify all 8 fields below, identify their Power Apps UI control, and justify your classification:

| # | Field Name | Sample Data Value | Target Data Type | Recommended Power Apps Control | Technical Justification |
| :-: | :--- | :--- | :---: | :--- | :--- |
| **1** | Equipment Asset ID | `"P-402-EXTRUDER"` | **Text** | TextInput (Single Line) | Contains letters and hyphens; unique alphanumeric identifier. |
| **2** | Technician Phone | `"+855-12-345-678"` | **Text** | TextInput (Mode: Phone) | Golden Rule: Never calculated; contains plus sign and leading zero. |
| **3** | Hydraulic Pressure | `185.4` (PSI) | **Number** | TextInput (Format: Number) | Continuous numeric value used to compute pressure averages and thresholds. |
| **4** | Service Date | `Today()` | **Date/Time** | DatePicker | Calendar date used for preventive maintenance interval tracking. |
| **5** | Safe to Operate? | `true` | **Yes/No** | Toggle / Checkbox | Binary condition flag: either the machine is safe or unsafe. |
| **6** | Parts Replaced Count | `3` | **Number** | TextInput (Format: Number) | Integer count used to sum total spare parts consumed. |
| **7** | Total Repair Cost | `450.00` ($) | **Number** | TextInput (Format: Number) | Financial value summed for departmental budget tracking. |
| **8** | Technician Notes | `"Replaced worn seal"` | **Text** | TextInput (Mode: Multiline) | Free-form narrative sentences describing maintenance work. |

### Evaluation Rubric:

| Performance Level | Criteria & Observable Competency |
| :---: | :--- |
| **Level 4: Mastery (100%)** | All 8 fields correctly typed and matched to Power Apps UI controls. Correctly identifies Phone and Asset ID as Text with complete justification. Explains why Pressure and Cost must be Numbers. |
| **Level 3: Proficient (75–99%)** | 6–7 fields correctly typed. Understands Text vs. Number distinction. Minor mismatch in UI control (e.g., used Text box instead of DatePicker). |
| **Level 2: Developing (50–74%)** | 4–5 fields correctly typed. Mistook Phone Number or Asset ID as Number. Confused Boolean with text string `"Yes"`. |
| **Level 1: Novice (<50%)** | Treats all fields as generic text strings. Unable to explain why treating numbers as text causes mathematical errors. |

---

## 🎒 15. 15-Minute Daily Homework: "The Workplace Data Detective"
* **Duration:** $\le$ 15 Minutes before tomorrow's class.
* **Task Steps:**
  1. Open any existing Excel sheet, paper clipboard, or ERP screen at your workplace.
  2. Select **5 columns or fields**.
  3. Classify each into **Text**, **Number**, **Date/Time**, or **Yes/No**.
  4. Identify at least ONE tricky field containing digits that is actually **Text** (e.g., Badge #, Serial #, Phone, Postal Code).
* **Deliverable:** Bring your 5 classified fields to tomorrow's Day 4 opening circle!

---

## 🌐 16. Bilingual Technical Glossary (English & ភាសាខ្មែរ)

| English Term | ភាសាខ្មែរ (Khmer) | Plain-Language Definition | Workplace Context |
| :--- | :--- | :--- | :--- |
| **Data / Value** | ទិន្នន័យ / តម្លៃ | Raw, unorganized facts or characters held in memory. | The raw characters `"45"` or `"John"`. |
| **Information** | ព័ត៌មានជាក់ស្តែង | Data organized with context and labels so humans can act. | `"Downtime: 45 Minutes on Press #4"`. |
| **Data Type** | ប្រភេទនៃទិន្នន័យ | The physical shape of a digital container defining allowed operations. | Text container, Number container, Date container. |
| **Text (String)** | អត្ថបទ / ខ្សែអក្សរ | Letters, symbols, words, or uncalculated digits in quotes. | `"Press Machine 04"` or `"+855-23-888"`. |
| **Number** | លេខ / តម្លៃលេខ | Mathematical digits ready for addition, subtraction, and sums. | `450.75` kg or `$24.00` hourly rate. |
| **Date/Time** | កាលបរិច្ឆេទ និង ពេលវេលា | Calendar day and clock ticks tracking temporal points. | `Today()` or `2026-10-29 08:30`. |
| **Boolean (Yes/No)** | តក្កវិទ្យា (ពិត / មិនពិត) | Pure binary two-state condition flag: either true or false. | `true` (Emergency Stop triggered). |
| **Concatenation** | ការតភ្ជាប់ខ្សែអក្សរ | Gluing words or characters together using the `&` operator. | `"10"` & `"20"` = `"1020"`. |
| **Type Conversion** | ការបម្លែងប្រភេទ | Safely transforming data between container shapes. | `Value("50")` ➔ `50` or `Text(50)` ➔ `"50"`. |

---

## 🚀 17. Connection Map (Curriculum Forward Bridge)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              THE THREE-DAY CURRICULUM BRIDGE                           │
│                                                                                        │
│   YESTERDAY (Day 2)                TODAY (Day 3)                   TOMORROW (Day 4)    │
│  ┌──────────────────┐             ┌──────────────────┐            ┌──────────────────┐ │
│  │ Instructions &   │    ──➔      │ Data & Container │    ──➔     │  Conditions &    │ │
│  │ Ordered Sequence │  Operates   │ Types (Pillars)  │  Inspected │  Decisions       │ │
│  │  Step1 ; Step2   │     on      │ Text, Num, Date  │     by     │ If(Cost > 500)   │ │
│  └──────────────────┘             └──────────────────┘            └──────────────────┘ │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

* **What We Mastered Yesterday (Day 2):** Instructions follow an ordered sequence (`Start ➔ Sequence ➔ Finish`). The semicolon (`;`) chains actions step by step.
* **What We Mastered Today (Day 3):** Instructions require typed data containers (**Text**, **Number**, **Date/Time**, **Yes/No**). Container shapes dictate what operations are legal and prevent disasters like the Apex $24,000 inventory crash.
* **What We Master Tomorrow (Day 4):** **Conditions & Decisions** (`If/Else`). How does an app make a business decision? By **inspecting today's data**!
  * `If(RepairCost > 500, RequireApproval(), AutoApprove())`
  * Without today's data types, tomorrow's decisions would be blind!

