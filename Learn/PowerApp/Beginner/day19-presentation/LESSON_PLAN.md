# Microsoft Power Apps Professional Foundation &bull; Day 19 Trainer Manual
## Topic: SharePoint List: Persistent Business Data
**Phase:** Phase 7: SharePoint Data Integration  
**Pedagogical Blueprint:** Spiral Learning Pattern (Zero-to-Hero Architecture)  
**Central Mental Model:** `REAL PROBLEM -> PROCESS -> DATA -> UI/SCREEN -> LOGIC/DECISION -> ACTION -> STORAGE [ACTIVE] -> FEEDBACK -> TEST`  
**Today's Connection Chain:** `app data fields -> SharePoint columns -> records/items`  

---

## 1. Executive Summary & Core Transformation

| Dimension | Previous State (Day 18 Variables / RAM) | Target State (Day 19 SharePoint List / Cloud Vault) |
| :--- | :--- | :--- |
| **Storage Medium** | Volatile Device RAM Chip | Microsoft 365 Cloud Data Center |
| **Lifespan** | Temporary (Erased on app close or phone reboot) | Permanent (Preserved for years/decades) |
| **User Scope** | Isolated (Only visible to the single active user) | Shared (Multi-user synchronized across the enterprise) |
| **Audit Trail** | None (Zero timestamps, zero creator history) | Automated (Created By, Created Date, Version History) |
| **Workplace Analogy**| Yellow Sticky Note on a computer monitor | Fireproof Master Guest Ledger in a hotel steel vault |

---

## 2. Measurable Learning Objectives (4 Milestones)

1. **Distinguish Volatile RAM from Enterprise Cloud Persistence:** The student can articulate in plain language why company data cannot live in variables and must be committed to permanent storage.
2. **Translate UI Form Inputs into SharePoint Column Data Types:** The student correctly matches text boxes, date pickers, and choice dropdowns to `Single line of text`, `Date and Time`, and `Choice` columns.
3. **Enforce Data Governance through Controlled Vocabularies:** The student explains how `Choice` columns eliminate spelling mismatches ("Molding" vs. "moulding" vs. "moldng") and protect monthly KPI reporting.
4. **Construct the Production Maintenance Request List:** The student independently navigates to SharePoint Online, creates `Apex_Maintenance_Requests`, renames the sacred `Title` column to `Ticket ID`, and configures 6 production-grade columns.

---

## 3. The 90-Minute Timed Spiral Agenda

```
[00:00 - 00:15] Part 1: Recall, Contrast & The Workplace Crisis (15 min)
                - 5-min Spiral Concept Map & Retrieval Flip Cards
                - The $42,000 "Vanishing Reports" disaster at Apex Plastics
                - Mental model shift: Sticky notes vs. The hotel steel ledger

[00:15 - 00:35] Part 2: Concepts, Column Anatomy & Data Types (20 min)
                - Plain-language to SharePoint translation ladder (5 rungs)
                - Column Anatomy 1: The Sacred "Title" Column (Why we never delete it)
                - Column Anatomy 2: Choice columns & Controlled Vocabularies
                - Column Anatomy 3: Date/Time, Numbers, and the Rich Text Trap

[00:35 - 00:55] Part 3: Trainer Live Demonstration & Matrix Mapping (20 min)
                - Click-by-click demonstration in SharePoint Online
                - Interactive Field-to-Column Mapping Matrix Inspector (Slide 13)
                - Revealing internal names vs. display names

[00:55 - 01:15] Part 4: Guided Hands-On Practice & Live Vault Simulator (20 min)
                - Students build [Initials]_Maintenance_Requests step-by-step
                - Verification Gate: Creating the first test ticket
                - Live SharePoint Data Vault Simulator: Testing persistence through app reboots (Slide 16)

[01:15 - 01:30] Part 5: Common Traps, Checks & Forward Bridge (15 min)
                - 5 Dangerous Misconceptions vs. Production Reality (Slide 17)
                - 5 Formative Knowledge Checks (Slides 18-22)
                - Independent Capstone: Equipment Preventive Maintenance Log (Slide 23)
                - Forward bridge to Day 20: Connecting Power Apps UI to SharePoint
```

---

## 4. Prerequisite Retrieval & Concept Map

### Concept Map Links
* **Day 11 (Data Design & Types):** Introduced tables, rows, columns, and why computers require strict types (Text vs Number vs Date).
* **Day 18 (Variables: Temporary RAM):** Introduced `Set(varTicket, ...)` to remember state across screens. Proved that variables disappear when the app session ends.
* **Day 19 (TODAY):** Solves the amnesia problem. Connects Day 11 table architecture with permanent Microsoft 365 cloud hosting.
* **Day 20 (TOMORROW):** Adds the SharePoint Data Connector into Power Apps Studio, wiring the UI directly to this list.

### 4 Retrieval Questions & Answers
1. *What happens to data stored in a variable when the user refreshes their browser?*  
   **Answer:** It is immediately wiped clean because variables reside only in volatile device RAM.
2. *In database terminology, what is the difference between a Column and a Record?*  
   **Answer:** A Column defines a property and its data type; a Record (Row) is one complete business transaction containing values for each column.
3. *Why should we avoid letting users type department names as free text?*  
   **Answer:** Free text causes spelling variations and typos that ruin grouping, filtering, and reporting.
4. *Can two workers on different tablets view the same variable?*  
   **Answer:** No. Variables are strictly local to one device. A shared cloud data source like SharePoint is required for multi-user synchronization.

---

## 5. Everyday Analogy & The Workplace Crisis

### Everyday Analogy
* **The Yellow Sticky Note (Variable):** An operator scribbles a note and sticks it to the monitor. Wind blows it into the trash, water dissolves the ink, and the night shift cannot see it.
* **The Hotel Master Guest Ledger (SharePoint List):** A heavy leather-bound book locked in a fireproof steel safe at reception. Every guest check-in is logged on a numbered line with a timestamp. Both shifts use the same ledger, and auditors can inspect records 5 years later.

### The Workplace Crisis: The "Vanishing Reports" at Apex Plastics
* **Setting:** Friday, 4:45 PM.
* **The Incident:** Operator Sarah noticed severe vibration and a burning odor on Extruder Line 3. She opened her new Power App, filled in the maintenance request, and tapped Submit.
* **The Flaw:** The app developer saved the ticket into a Day 18 variable (`Set(varLastTicket, ...)`). At 5:00 PM, Sarah closed her tablet and went home.
* **The Disaster:** On Monday morning, maintenance arrived with an empty schedule. The extruder motor seized at 6:15 AM, destroying the gearbox. 14 hours of production were lost. Total cost: **\$42,000**.
* **The Lesson:** Variables are scratchpads, not company databases. Business processes require persistent cloud storage.

---

## 6. Data Schema Blueprint: `Apex_Maintenance_Requests`

| Display Name | Internal Column Name | SharePoint Type | Required? | Options / Default | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Ticket ID** | `Title` | Single line of text | **Yes** | Built-in (Renamed) | Primary business key (e.g. `TKT-1001`) |
| **Department** | `Department` | Choice | **Yes** | Molding, Extrusion, Packaging, Quality, Maintenance | Responsible plant area |
| **Shift** | `Shift` | Choice | **Yes** | Shift A (Morning), Shift B (Evening), Weekend | Operating shift |
| **Urgency** | `Urgency` | Choice | **Yes** | Low, Medium, High, Critical | Triage priority |
| **Problem Description** | `ProblemDescription` | Multiple lines of text | **Yes** | **Plain Text Only** | Operator breakdown observation |
| **Reported Date** | `ReportedDate` | Date and Time | **Default**| Date Only; Default: `Today` | Time of discovery |
| **Status** | `Status` | Choice | **Default**| New, In Progress, Resolved; Default: `New` | Ticket lifecycle |

---

## 7. The 5 Dangerous Traps & How to Avoid Them

1. **The Title Column Panic:** Beginners try to delete `Title` because they want a column called `Ticket ID`. SharePoint refuses to delete `Title`.  
   *Fix:* **Rename** the display name of `Title` to `Ticket ID`.
2. **The Rich Text Trap:** Selecting "Enhanced rich text" for the description column injects ugly HTML tags (`<div>`, `<p>`, `<strong>`) into Power Apps text boxes.  
   *Fix:* **Always select Plain Text** for multi-line text columns.
3. **The Excel File Fallacy:** Beginners treat SharePoint like an Excel workbook. Excel locks files when multiple users edit, causing synchronization errors.  
   *Fix:* SharePoint Lists are transactional databases with row-level locking and cloud APIs.
4. **Spaces in Column Names:** Naming a column with spaces (e.g. `Ticket Number`) causes SharePoint to generate internal names with ugly `%20` hex codes (`Ticket_x0020_Number`).  
   *Fix:* Create the column without spaces first (`TicketNumber`), then edit its display label to `Ticket Number`.
5. **Forgotten List Permissions:** Sharing the Power App with 100 users does not automatically grant them access to the SharePoint List.  
   *Fix:* Go to List Settings &rarr; Permissions and ensure the team's Microsoft 365 group has `Contribute` or `Edit` rights.

---

## 8. Formative Assessments & Rubrics

### 5 Check-for-Understanding Questions
* **Q1 (Core Difference):** Variables live in temporary device RAM; SharePoint permanently stores multi-user data in the cloud.
* **Q2 (The Title Rule):** Title cannot be deleted because it is an essential system anchor for SharePoint indexing, search, and system views.
* **Q3 (Controlled Vocabulary):** Choice columns prevent spelling mistakes and ensure clean Power BI analytics.
* **Q4 (Rich Text Trap):** Plain text avoids injecting raw HTML code into Power Apps text input controls.
* **Q5 (Persistence Under Disaster):** A destroyed tablet does not lose data because the record was already committed to Microsoft's cloud servers.

### 100-Point Independent Capstone Challenge
* **Task:** Create `Apex_Equipment_Registry` to catalog machinery.
* **Rubric:**
  - [20 pts] Renamed default `Title` to `Equipment Tag` (e.g., `EXT-03`).
  - [20 pts] Created `Machine Category` Choice column (Injection Molder, Extruder, Chiller, Compressor).
  - [20 pts] Created `Installation Date` configured as Date Only.
  - [20 pts] Created `Operating Voltage` configured as Number.
  - [20 pts] Successfully inserted two test machine records.

---

## 9. Forward Bridge to Day 20

> *"Right now, our Power App lives in Power Apps Studio, and our data lives in SharePoint. They have never spoken to each other! Tomorrow on Day 20, all the puzzle pieces come together: we will add the SharePoint Data Connector, generate an automatic Edit Form with 1 click, and write `SubmitForm(frmMaintenance)` to wire our buttons directly to the cloud!"*
