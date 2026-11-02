# 🎓 Day 10 Instructional Master Plan: Records and Tables — Storing Many Cases
## 📚 Phase 4: Data • Microsoft Power Apps for Absolute Zero Beginners

> **Instructional Architect:** Microsoft Power Apps Master Trainer & Curriculum Architect  
> **Course Architecture:** Connected 27-Day Curriculum (From Zero to Citizen Developer)  
> **Central Mental Model:** `REAL PROBLEM ➔ PROCESS ➔ DATA ➔ UI/SCREEN ➔ LOGIC/DECISION ➔ ACTION ➔ STORAGE ➔ FEEDBACK ➔ TEST`  
> **Day 10 Connection Chain:** `One Business Case = One Record ➔ Shared Fields = Columns ➔ Many Records = Table`  
> **Core Meaning:** Tables organize repeated business cases (such as many maintenance requests) into structured, queryable storage.  
> **Prior Connection:** Days 3 (values & data types) and 9 (the data required across an end-to-end business flow).  
> **Forward Bridge:** Next (Day 11): Designing specific field types and data schemas that power each stage of the flow.  
> **Session Duration:** Exactly 90 Minutes (00:00 – 90:00)  
> **Target Audience:** Absolute zero beginners (factory line operators, maintenance technicians, inventory clerks, shift supervisors). Zero prior programming, database, or UI design experience.

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
│                                                                               │                        │
│                                                                               ▼                        │
│  [7. REAL PROBLEM ➔ APP OPPORTUNITY] ➔ [8. WORKFLOW & STATUS] ➔ [9. COMPLETE BUSINESS FLOW]           │
│                                                                               │                        │
│                                                                               ▼                        │
│  [10. RECORDS & TABLES: STORING MANY CASES] (TODAY!) ➔ [11. SCHEMA & FIELD TYPES] ➔ [Days 12–27]       │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 1. Four Measurable Learning Objectives (Bloom's Taxonomy)

By the end of this 90-minute session, the absolute beginner learner will independently demonstrate:

1. **Objective 1 (Structural Distinction - Bloom Level 4):**  
   Differentiate with 100% accuracy between a **Single Value** (e.g., `"Press #6"`), a **Record** (one complete business case with all its attributes), and a **Table** (a collection of many records sharing the same columns).
2. **Objective 2 (Case-to-Record Translation - Bloom Level 3):**  
   Translate any physical workplace form (such as a paper maintenance slip, purchase requisition, or visitor badge) into a structured **Record** with explicit column names and data types.
3. **Objective 3 (Power Fx Record & Table Syntax Formulation - Bloom Level 3):**  
   Read and write beginner-level Power Fx expressions using curly braces `{}` for records, square brackets `[]` for tables, and the dot operator `.` for column access (e.g., `ThisItem.Status`).
4. **Objective 4 (Multi-Case Storage Schema Architecture - Bloom Level 5):**  
   Author a 5-column **Work Orders Dataverse Table Blueprint** for Apex Plastics that can store hundreds of concurrent machine repair cases without data loss or memory overwrites.

---

## ⏱️ 2. The 90-Minute Spiral Learning Agenda

| Segment | Timestamp | Duration | Pedagogical Phase | Key Activities & Milestones |
| :---: | :---: | :---: | :--- | :--- |
| **Part 1** | **00:00 – 10:00** | 10 min | **RECALL & CONNECT** | • Day 10 orientation & curriculum alignment.<br>• 5-min concept map recap reconnecting Days 1–9 to Day 10.<br>• 3 prerequisite retrieval questions with oral answers.<br>• Announcement of today's 4 Bloom learning objectives. |
| **Part 2** | **10:00 – 25:00** | 15 min | **DISCOVER (THE WHY)** | • The $64,000 "Overwritten Work Order" Catastrophe at Apex Plastics.<br>• Plain-language concept bridge: What is a Record? What is a Table?<br>• Everyday physical analogy: The Restaurant Ticket Rail & Patient Chart. |
| **Part 3** | **25:00 – 45:00** | 20 min | **DEEP DIVE THEORY** | • The Anatomy of Data: Cell (Value) ➔ Row (Record) ➔ Column (Field) ➔ Sheet (Table).<br>• The Power Fx Syntax Grammar: `{}` for Records, `[]` for Tables, `.` for Field Access.<br>• Why apps cannot rely on single variables when managing multiple cases. |
| **Part 4** | **45:00 – 60:00** | 15 min | **DEMONSTRATE & LAB** | • **Minute 45:00:** Mid-session pulse check, posture reset & hydration.<br>• Trainer live demo of the Interactive Records & Tables Constructor.<br>• Stacking 4 individual case records into a live queryable table with filters. |
| **Part 5** | **60:00 – 75:00** | 15 min | **GUIDED PRACTICE** | • 6-Scenario Data Structure Diagnostics Simulator.<br>• Class guided analysis: Identifying whether a business need is a Value, Record, or Table.<br>• 4 critical beginner misconceptions & trainer corrections. |
| **Part 6** | **75:00 – 90:00** | 15 min | **ASSESS & BRIDGE** | • 5-Question Evaluative Knowledge Check quiz with instant explanations.<br>• Capstone Independent Challenge: Apex Plastics Multi-Case Table Schema.<br>• Collapsible benchmark solution reveal & 4-level rubric.<br>• Forward bridge to Day 11 (Designing Field Types) & 15-min homework. |

---

## 🧠 3. Prerequisite Retrieval & Concept Map Recap (00:00 – 10:00)

### 3.1 The 5-Minute Spiral Concept Map
* **Day 1 (The Goal):** Every app starts with a real problem and desired business outcome.
* **Day 2 (The Order):** Execution follows an exact sequence of steps.
* **Day 3 (The Memory):** Apps store typed values: Text (`"Press 6"`), Number (`42`), Date (`2026-10-30`), Yes/No (`True`), and Choice (`Submitted`).
* **Days 4, 5, 6 (The Logic):** Conditions ask questions (`>`), `If()` branches into actions, and `&&`/`||` guard complex safety rules.
* **Day 7 (The Diagnosis):** The 5-Part Opportunity Framework (`Problem ➔ Result ➔ People ➔ Information ➔ Rules`).
* **Days 8 & 9 (The Flow):** We built an unbroken 6-stage lifecycle: `Problem ➔ Request ➔ Review ➔ Decision ➔ Work ➔ Complete`.
* **TODAY (Day 10):** Yesterday we traced **ONE** machine repair from start to finish. But a real factory doesn't have just one ticket! There are 50 machines running simultaneously. **Where do we store hundreds of simultaneous cases without overwriting each other? IN TABLES!**

### 3.2 Three Prerequisite Retrieval Questions
1. **Question 1 (from Day 3):** *What is a single piece of typed data, and what are its standard types?*  
   * **Answer:** A value. It can be Text, Number, Date/Time, Boolean (Yes/No), or Choice.
2. **Question 2 (from Day 9):** *In yesterday's flow, what information did an operator capture when submitting a request?*  
   * **Answer:** Machine ID, Problem Description, Defect Photo, Priority Level, and Initial Status (`Submitted`).
3. **Question 3 (from Day 9):** *If an app only stores `txtMachine.Text` in a single global variable like `varMachine`, what happens when a second operator submits a different repair ticket?*  
   * **Answer:** The second ticket **overwrites** the first! The first operator's machine name is wiped from memory and permanently lost.

---

## 💥 4. Today's "Why This Exists" Problem (10:00 – 25:00)

### 4.1 The $64,000 "Overwritten Work Order" Catastrophe at Apex Plastics
* **The Facility:** Apex Plastics Molding Hall A (16 high-tonnage injection presses).
* **The Flawed Amateur App:** Junior developer Ken built an internal phone app. To keep it "simple", Ken created a single form bound to a set of global variables: `varToolID`, `varIssue`, `varCost`.
* **What Happened on Monday Morning:**
  1. **08:15 AM (The Critical Alarm):** Line 1 Operator Sothea spotted coolant spraying from the main chilling tower supplying Hall A. She opened the app, entered `ToolID: "Cooling Tower Alpha"`, `Issue: "Chiller pump cavitation - urgent"`, and clicked `Submit`. The app saved these into `varToolID` and `varIssue`.
  2. **08:25 AM (The Trivial Request):** Ten minutes later, Operator Chan on Line 14 had a burnt-out indicator bulb over his workstation. He opened the app, typed `ToolID: "Station 14"`, `Issue: "Replace 12V LED bulb"`, and clicked `Submit`.
  3. **The Data Disaster:** Because the app stored tickets in single variable slots rather than a **Table of Records**, Chan's $5 lightbulb ticket **completely overwrote** Sothea's critical cooling tower alert!
  4. **The Silence:** Maintenance supervisor Dave saw `varToolID = "Station 14"` in his pending view. He marked it low priority and scheduled the bulb replacement for 4:00 PM. Nobody saw the cooling tower request because it had ceased to exist.
  5. **The Catastrophe:** At 11:30 AM, the uncooled chiller overheated, seized, and cracked its primary impeller housing. Hall A suffered emergency thermal shutdown. Total repair cost: $28,000. Lost automotive delivery penalty: $36,000. Total avoidable loss: **$64,000**!
* **The Trainer's Diagnostic:**
  > *"Notice the catastrophic design flaw: An app that stores single variables can only remember **ONE CASE AT A TIME**. In business, we never have just one case. We have repeated cases over time! To manage multiple cases, we need a structure where each case has its own private row: **A TABLE OF RECORDS**!"*

---

## 🗣️ 5. Plain-Language Concept Before Technical Vocabulary

* **What is a "Record"?**
  Think of an **Index Card** or an individual **Driver's License**.
  * The license belongs to exactly **one person**.
  * It contains multiple pieces of information about that person: Name, Date of Birth, Eye Color, License Number.
  * In Power Apps, **one business case is one Record**. A record bundles all the facts about one specific repair, one vacation request, or one customer.

* **What is a "Column" (Field)?**
  A column is a **labeled category or slot** printed on the card.
  * Every driver's license has a slot labeled `"Date of Birth"`.
  * Every repair ticket has a slot labeled `"Estimated Cost"`.
  * The column defines the **question** and the **data type**; the record provides the specific **answer**.

* **What is a "Table"?**
  A table is a **Card File Box (Rolodex) or Binder** holding hundreds of those index cards!
  * Every card inside the box has the exact same printed categories (columns).
  * But each card represents a different, independent case (record).
  * You can sort them, count them, or filter for all cards where `Status = "Submitted"`.

---

## 🍽️ 6. Everyday Physical Analogy: The Restaurant Order Ticket Rail

To make this unforgettable for absolute beginners, think of a busy diner kitchen:

1. **One Paper Ticket (The Record):**
   * A waiter takes an order for Table 4: `Burger`, `Medium-Rare`, `No Onions`, `$14.50`.
   * This paper slip is a **Record**. It represents exactly one customer transaction.
2. **The Printed Boxes on the Slip (Columns / Fields):**
   * Every slip has pre-printed sections: `Table #`, `Server Name`, `Items`, `Special Notes`, `Price`.
   * These are **Columns**.
3. **The Metal Ticket Rail (The Table):**
   * The chef hangs 25 paper slips side-by-side along the stainless-steel rail over the grill.
   * This rail is the **Table**!
   * The chef can glance across the rail and count: *"I have 25 total tickets (CountRows). 8 tickets are for burgers (Filter). 3 tickets are urgent VIP orders!"*

> **Key Pedagogical Takeaway:**  
> If the kitchen only had one magnetic clipboard that got erased every time a new order was placed, the diner would collapse in 10 minutes. The metal ticket rail allows **many independent records to coexist in structured storage**!

---

## 🏭 7. Manufacturing / DX Workplace Example: Apex Plastics Maintenance

In an injection molding plant, work orders are collected across 16 machines:

| TicketID (Text) | Machine (Text) | DefectType (Choice) | EstCost (Number) | Priority (Choice) | Status (Choice) |
| :---: | :--- | :--- | :---: | :--- | :--- |
| **WO-101** | Press #6 | Servo Motor Jitter | $850 | High | `Under Review` |
| **WO-102** | Press #2 | Hydraulic Fluid Leak | $2,400 | Critical Safety | `Approved` |
| **WO-103** | Press #4 | Cracked Mold Die Cavity | $4,800 | High | `In Repair` |
| **WO-104** | Cooling Tower Alpha | Chiller Pump Cavitation | $12,000 | Critical Safety | `Submitted` |
| **WO-105** | Station 14 | Burnt Indicator LED | $15 | Low | `Closed` |

* **Row 4** is the Cooling Tower record that was tragically lost in our case study!
* In this table, WO-104 and WO-105 live peacefully side-by-side. Chan's $15 lightbulb never overwrites Sothea's $12,000 cooling pump.

---

## 📊 8. Visual Cause-and-Effect Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                           FROM SINGLE VALUE TO COMPLETE ENTERPRISE TABLE                                │
├─────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                         │
│   1. THE CELL (SINGLE VALUE)             "Press #6"   (Just raw data; no context)                       │
│              │                                                                                          │
│              ▼                                                                                          │
│   2. THE FIELD (COLUMN)                  MachineName: Text   (Defines category and type)                │
│              │                                                                                          │
│              ▼                                                                                          │
│   3. THE RECORD (ONE CASE / ROW)         { ID: 101, Machine: "Press #6", Status: "Submitted" }        │
│              │                           (A complete bundle of facts about ONE specific incident)       │
│              │                                                                                          │
│              ▼                                                                                          │
│   4. THE TABLE (COLLECTION / GRID)       ┌────────┬────────────┬───────────┬───────────┐                │
│                                          │ ID     │ Machine    │ Cost      │ Status    │                │
│                                          ├────────┼────────────┼───────────┼───────────┤                │
│                                          │ WO-101 │ Press #6   │ $850      │ Submitted │  Row 1 (Case 1)│
│                                          │ WO-102 │ Press #2   │ $2,400    │ Approved  │  Row 2 (Case 2)│
│                                          │ WO-103 │ Press #4   │ $4,800    │ In Repair │  Row 3 (Case 3)│
│                                          └────────┴────────────┴───────────┴───────────┘                │
│                                          (Stores hundreds of cases; queryable with Filter & CountRows)  │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 💻 9. Power Fx Grammar: Records, Tables, and Dot Notation

Power Fx has a crystal-clear, elegant mathematical syntax for distinguishing values, records, and tables.

### 1. The Record Syntax: Curly Braces `{ }`
* **Plain-English Rule:** Curly braces group multiple named fields into **ONE record**.
* **Power Fx Code:**
  ```powerfx
  { TicketID: "WO-101", Machine: "Press #6", Cost: 850, Status: "Submitted" }
  ```
* **Explanation:**
  * `{ }` means: "Here is one bundle of data representing one case."
  * `Cost: 850` assigns the number `850` to the column named `Cost`.

### 2. The Field Access Syntax: The Dot Operator `.`
* **Plain-English Rule:** The dot `.` means **"reach inside this record and extract one specific column value"**.
* **Power Fx Code:**
  ```powerfx
  ThisItem.Status
  ```
* **Explanation:**
  * `ThisItem` refers to the active record currently displayed in a gallery row or form.
  * `.Status` extracts just the text string `"Submitted"`.

### 3. The Table Syntax: Square Brackets `[ ]` or Named Tables
* **Plain-English Rule:** A table is a collection of records.
* **Power Fx Code:**
  ```powerfx
  Filter(WorkOrders, Status = "Submitted")
  ```
* **Explanation:**
  * `WorkOrders` is the Dataverse Table holding all cases.
  * `Filter()` scans the table row-by-row and returns **only the records** where `Status` evaluates to `"Submitted"`.

---

## 🛠️ 10. Trainer Demonstration Protocol (45:00 – 60:00)

* **Minute 45:00:** Mid-session physical reset. Ask all learners to stand up, roll their shoulders, and take a sip of water.
* **Demonstration Setup:** The trainer projects **Slide 12: Interactive Records & Tables Constructor**.
* **Step 1 (The Single Record):** Show an individual ticket card on screen.
  * Enter: `ID: WO-101`, `Machine: Press #6`, `Cost: $850`, `Status: Submitted`.
  * Explain: *"Notice this is ONE case. In Power Fx, it looks like `{ ID: "WO-101", Machine: "Press #6" }`."*
* **Step 2 (The Table Stacking):** Click `Add Record to Table`.
  * Watch the record morph from a floating card into **Row 1** of the live table.
  * Add a second case: `WO-102`, `Press #2`, `$2,400`, `Approved`.
  * Add a third case: `WO-103`, `Cooling Tower`, `$12,000`, `Submitted`.
* **Step 3 (The Table Operations):**
  * Click `Filter: Status = Submitted`. Show how only Rows 1 and 3 remain visible, while Row 2 is hidden.
  * Click `Calculate Total Cost`. Show the Power Fx formula: `Sum(WorkOrders, Cost) = $15,250`.
  * Emphasize: *"Can a single variable do this? Never! Only a Table lets you sum, filter, and count across multiple cases!"*

---

## 👥 11. Guided Learner Practice (60:00 – 75:00)

Trainer guides the class through the **Slide 18: Multi-Scenario Data Structure Simulator** covering 6 operational requests:

1. **Scenario 1 (Current User's Name):** Where do we store the name of the person currently logged in?
   * *Class Answer:* A **Single Value** (`User().FullName`). It represents one text string.
2. **Scenario 2 (Tooling Die #4 Repair Form):** When a technician opens Ticket WO-103 to inspect its parts, hours, and photos, what is the screen displaying?
   * *Class Answer:* A **Single Record** (`ThisItem`). All fields belong to that one die repair.
3. **Scenario 3 (Supervisor Morning Pending Queue):** The supervisor opens an iPad to see all 14 broken machines waiting for triage today. What is the screen displaying?
   * *Class Answer:* A **Table** (`WorkOrders`). It holds 14 rows, each representing a distinct case.
4. **Scenario 4 (Calculating Shift Labor Hours):** The plant manager wants to know total technician hours logged across all repairs this week.
   * *Class Answer:* A **Table Aggregate Function** (`Sum(WorkOrders, LaborHours)`).
5. **Scenario 5 (Customer Order History):** A customer calls asking to view all 50 plastic trim shipments sent to them over the past 6 months.
   * *Class Answer:* A **Table** (`Shipments`) filtered by `CustomerID`.
6. **Scenario 6 (A Single Machine Serial Number):** Reading the metal barcode stamped on Press #6 (`"SN-88421"`).
   * *Class Answer:* A **Single Value** (Text).

---

## ⚠️ 12. Four Critical Beginner Misconceptions & Corrections

### Misconception 1: "A Table is just a fancy Microsoft Excel spreadsheet."
* **Wrong Mental Model:** The learner thinks a table can have random notes, merged cells, or colored highlights anywhere.
* **Why it Breaks Apps:** Apps require **strict schema typing**. If Column 3 is Number, every single row must contain a valid number—never a word like "pending" or a merged banner.
* **Trainer Correction:** A database table is an **engine specification**. Every row has the exact same columns; every column has an unchangeable data type.

### Misconception 2: "One variable can store multiple work orders if we use commas."
* **Wrong Mental Model:** The learner tries to store `varTickets = "WO-101, WO-102, WO-103"`.
* **Why it Breaks Apps:** You cannot filter, sort, edit, or calculate costs on a string of comma-separated words. Power Fx cannot calculate `Sum()` on a sentence.
* **Trainer Correction:** Use a **Table**. Each work order is an independent record object with structured columns.

### Misconception 3: "A Record and a Column are the same thing."
* **Wrong Mental Model:** The learner confuses horizontal rows with vertical columns.
* **Why it Breaks Apps:** When writing Power Fx, they write `WorkOrders.Status` when they mean `ThisItem.Status`, causing "expected record, got table" syntax errors.
* **Trainer Correction:** A **Column** is the vertical category (e.g., `Status`). A **Record** is the horizontal case (Row 2).

### Misconception 4: "We don't need a table; we can just email a PDF for each request."
* **Wrong Mental Model:** The learner assumes storing files in Outlook is the same as storing records in an app.
* **Why it Breaks Apps:** You cannot query 500 emails to find out which machines broke most frequently or how much money was spent on spare parts.
* **Trainer Correction:** An app stores data in **Tables** so business intelligence, reports, and search queries work instantly.

---

## 📝 13. Five-Question Evaluative Knowledge Check (75:00 – 82:00)

1. **Question 1 (Core Concept):** *What is the relationship between a Record, a Column, and a Table?*  
   * **Answer:** A **Column** is a category (Field); a **Record** is one complete case (Row); and a **Table** is a collection of many records sharing the same columns.
2. **Question 2 (Why Question):** *WHY did Apex Plastics lose $64,000 when they tried to manage factory work orders using single variables instead of a table?*  
   * **Answer:** Because single variables can only hold one value at a time. When Operator Chan submitted a minor lightbulb ticket, it completely overwrote the critical cooling tower pump failure that was waiting in memory.
3. **Question 3 (What Happens If Question):** *WHAT HAPPENS IF you write `WorkOrders.Status` instead of `ThisItem.Status` in a gallery row label?*  
   * **Answer:** Power Apps displays an error because `WorkOrders.Status` refers to an entire column of many values (a Table), whereas the label on a single card only expects **one specific text value** from the active record (`ThisItem.Status`).
4. **Question 4 (Power Fx Syntax):** *Which punctuation mark wraps a single Record in Power Fx?*  
   * **Answer:** Curly braces `{}` (e.g., `{ ID: "WO-101", Cost: 850 }`).
5. **Question 5 (Table Operation):** *What Power Fx formula returns only the work orders that currently need supervisor attention?*  
   * **Answer:** `Filter(WorkOrders, Status = "Submitted")`.

---

## 🏆 14. Capstone Independent Challenge: Apex Plastics Multi-Case Table Schema (82:00 – 88:00)

### Challenge Specification
Learners must define the **5 Core Columns** for the new Apex Plastics `MaintenanceWorkOrders` table to safely store hundreds of simultaneous factory repair tickets:

| Column # | Column Name | Data Type | Required? | Purpose in the Business Flow | Example Value |
| :-: | :--- | :--- | :-: | :--- | :--- |
| **1** | `WorkOrderID` | Text (Unique Key) | Yes | Uniquely identifies each independent case | `"WO-1004"` |
| **2** | `MachineName` | Choice / Text | Yes | Specifies which machine triggered the problem | `"Press #6"` |
| **3** | `EstimatedCost`| Currency / Number | Yes | Evaluates the $2,000 budget escalation gate | `850.00` |
| **4** | `Priority` | Choice | Yes | Routes safety emergencies immediately | `"High"` |
| **5** | `Status` | Choice | Yes | Drives the active state across the 6 stages | `"Submitted"` |

### 4-Level Evaluation Rubric

| Level | Performance Benchmark | Description |
| :---: | :--- | :--- |
| **Mastery (Level 4)** | Enterprise Ready | Correctly identifies all 5 columns with proper types; distinguishes Primary ID from descriptive attributes; formulates exact Power Fx `Filter()` and `ThisItem.` expressions. |
| **Proficient (Level 3)** | Solid Grasp | Identifies 5 columns and types; minor ambiguity in Choice vs Text; understands why tables prevent data overwriting. |
| **Developing (Level 2)** | Partial Understanding | Treats columns as informal labels; confuses records with tables; proposes comma-separated text strings for multiple items. |
| **Novice (Level 1)** | Unstructured | Cannot distinguish a single value from a table; believes global variables are sufficient for multi-case tracking. |

---

## 🌉 15. The 3-Day Connection Map & Forward Bridge (88:00 – 90:00)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    THE 3-DAY CONNECTION MAP                                     │
│                                                                                                 │
│  YESTERDAY (DAY 9)                  TODAY (DAY 10)                     TOMORROW (DAY 11)        │
│  Model a Complete Flow              Records & Tables: Storing Cases    Designing Fields & Schema│
│  • 6 Universal Stages               • Case = Record                    • Choice vs Text Sets    │
│  • Swimlanes & Owners               • Columns = Fields                 • Numbers vs Currency    │
│  • Happy Path & Rework Loops        • Collection = Table               • Date Only vs DateTime  │
│  • Role-Based Interlocks            • Power Fx: `{}` and `ThisItem.`   • Relational Lookups     │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 15-Minute Homework Assignment
1. Think about **ONE list or paper log** in your current workplace that holds multiple cases (e.g., Visitor Logbook, Spare Parts Catalog, Employee Vacation Requests).
2. On 1 sheet of paper:
   * Write down the **Table Name** (e.g., `VisitorLog`).
   * List the **4 Columns** that appear across every page.
   * Write out **2 sample Records** using Power Fx curly brace syntax:
     `{ Name: "John Doe", Company: "Contoso", BadgeNo: 42, InTime: Time(8,30,0) }`
3. Bring this sheet to Day 11, where we will configure the exact **Dataverse Field Types & Constraints** to make your table production-ready!

---
*End of Day 10 Instructional Master Plan • Microsoft Power Apps Citizen Developer Series*

