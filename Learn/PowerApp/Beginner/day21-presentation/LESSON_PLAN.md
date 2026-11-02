# Microsoft Power Apps Professional Foundation &bull; Day 21 Trainer Manual
## Topic: Gallery: Read and Select Records
**Phase:** Phase 7: Power Apps Data Integration  
**Pedagogical Blueprint:** Spiral Learning Pattern (Zero-to-Hero Architecture)  
**Central Mental Model:** `REAL PROBLEM -> PROCESS -> DATA -> UI/SCREEN [GALLERY: REPEATED RECORDS & SELECTION] -> LOGIC/DECISION -> ACTION -> STORAGE [CONNECTED] -> FEEDBACK -> TEST`  
**Today's Connection Chain:** `data source -> Items -> repeated records -> ThisItem -> selection`  
**Core Meaning:** A gallery translates an entire table of cloud records into a browsable, interactive app user interface.  
**Prior Connection:** Day 20 SharePoint Connection (`Apex_Maintenance_Requests`) + Day 10 Table/Record Theory.  
**Forward Bridge:** Day 21 Gallery Selection (`Gallery.Selected`) &rarr; Day 22 Forms (View and Edit that specific record).  

---

## 1. Executive Summary & The Core Transformation

| Dimension | Previous State (Day 20: Pipe Opened) | Target State (Day 21: Gallery Mastered) |
| :--- | :--- | :--- |
| **Data Visibility** | 150 rows sit in cloud storage; app can only reference 1 value | All 150 rows are rendered cleanly in a scrollable, repeating UI |
| **Control Paradigm** | Developer manually creates 1 Label per field (does not scale) | Developer builds **one single template cell**; Power Apps duplicates it for all rows |
| **Power Fx Property** | Static properties (`Label.Text = "Hello"`) | Dynamic bindings (`Gallery.Items = Apex_Maintenance_Requests`, `Label.Text = ThisItem.Title`) |
| **Interactive State** | Disconnected controls with no contextual row awareness | The gallery tracks active user choice via `Gallery.Selected` |
| **Mental Model Analogy** | Looking at a closed municipal water pipe | Turning on the showerhead nozzle: the water divides into hundreds of neat, organized streams |

---

## 2. Measurable Learning Objectives (4 Milestones)

By the end of this 90-minute session, the absolute-zero beginner will be able to:

1. **Explain the Repeating Template Concept:** State in plain English why a Gallery only requires designing the first cell, and explain how Power Apps stamps that blueprint across every row in the dataset.
2. **Bind a Data Source to `Gallery.Items`:** Insert a Vertical Gallery onto the canvas and set its `Items` property to `Apex_Maintenance_Requests` without errors.
3. **Write `ThisItem` Formulas for Multi-Type Fields:** Accurately bind Text, Number, and Choice columns inside the template using `ThisItem.Title`, `ThisItem.MachineID`, and `ThisItem.Priority.Value`.
4. **Harness `Gallery.Selected` for User Interaction:** Connect an external summary label or inspector to read whichever row the user clicks using `galRequests.Selected.Title`.

---

## 3. Timed 90-Minute Spiral Agenda

| Time Window | Duration | Spiral Phase | Learning Activity & Method |
| :--- | :---: | :--- | :--- |
| **00:00 - 00:10** | 10 min | **RECALL & CONNECT** | Prerequisite retrieval (Days 10, 14, 16, 20) & The "Single-Record Dilemma" crisis at Apex Plastics. |
| **00:10 - 00:25** | 15 min | **DISCOVER** | Plain-language concept before tech jargon: The Rubber Stamp and Photo Album analogy. Anatomy of a Gallery. |
| **00:25 - 00:40** | 15 min | **DEMONSTRATE** | Live Trainer Demo: Inserting Vertical Gallery, binding `Items`, template editing, and `ThisItem` syntax. |
| **00:40 - 00:60** | 20 min | **GUIDED PRACTICE** | Student Hands-On Lab: Building the Apex Maintenance Dispatch Gallery step-by-step with trainer milestones. |
| **00:60 - 00:72** | 12 min | **INDEPENDENT TASK** | Solo Challenge: Adding Priority color-coded badges (`If(ThisItem.Priority.Value = "High", Red, Green)`). |
| **00:72 - 00:82** | 10 min | **CHECK & DEBUNK** | 5 Misconceptions vs. Cloud Reality & 5 Knowledge Checks (including 2 'Why' & 'What Happens If' questions). |
| **00:82 - 00:90** | 8 min | **BRIDGE FORWARD** | Capstone evaluation rubric, preview of Day 22 Edit Forms (`Gallery.Selected`), and homework. |

---

## 4. Prerequisite Retrieval (Memory Activation)

Before introducing the Gallery, activate these 4 foundations:

* **Q1 (Day 10 Data): What is the difference between a Table and a Record?**  
  *Answer:* A Table is the entire collection (all rows); a Record is one single horizontal row (one specific maintenance ticket).
* **Q2 (Day 14 Controls): Can a standard Label control hold multiple database rows simultaneously?**  
  *Answer:* No. A Label has a single `Text` property that holds exactly one text string at a time.
* **Q3 (Day 16 Formulas): How does a control know what to show?**  
  *Answer:* Through its properties! A formula calculates what that property should evaluate to in real-time.
* **Q4 (Day 20 Connection): Once we connected `Apex_Maintenance_Requests`, how does Power Fx view it?**  
  *Answer:* As a recognized table symbol that autocompletes in blue inside any formula bar.

---

## 5. The Workplace Problem: "The Single-Record Dilemma at Apex Plastics"

### The Manufacturing Scenario:
It is 07:00 AM on Monday morning at Apex Plastics. Shift Supervisor Davi opens his tablet. Over the weekend, 18 maintenance issues were logged into SharePoint:
* Machine M-04: Hydraulic seal rupture (High)
* Conveyor C-02: Motor bearing screech (Medium)
* Extruder E-01: Temperature sensor drift (Low)
* ...and 15 more!

### The Crisis:
A junior developer attempted to build the supervisor screen using standard Labels. To show 18 tickets, the developer dragged **54 separate Labels** onto the screen (Title 1, Title 2, Title 3... Priority 1, Priority 2, Priority 3...).  
When ticket #19 was logged, **it didn't appear** because there was no Label 19! When ticket #2 was resolved and deleted, a giant blank gap appeared in the middle of the screen.

### The Plain-Language Insight:
Human beings do not build physical clipboards by gluing 18 separate pieces of paper to a wall every morning. They use a **repeating list form** where each row follows the exact same format.  
In Power Apps, that repeating list engine is called a **Gallery**.

---

## 6. The Everyday Analogy: The Rubber Stamp & The Photo Album

### 1. The Rubber Stamp Analogy:
Imagine you have an ink rubber stamp carved with three empty slots: `[Photo] [Machine Name] [Priority]`.  
You take a long scroll of paper. You stamp once: row 1. You stamp again: row 2. You stamp 100 times: 100 rows.  
* You only designed the rubber stamp **ONCE**.
* But it stamped 100 beautiful, identical rows.
* If you decide to change the font or make the text bold on the rubber stamp, **all 100 stamped rows update instantly!**
* **The Template Cell** in Power Apps is that rubber stamp.

### 2. The Photo Album Analogy:
A photo album page has 4 plastic sleeves of the exact same size. Sleeve 1 holds Davi's photo; Sleeve 2 holds Bopha's photo; Sleeve 3 holds SOP documentation. The sleeve layout never changes; only the contents inside (`ThisItem`) change from sleeve to sleeve.

---

## 7. Plain-Language Concept Before Technical Vocabulary

| Plain-Language Concept | Technical Term | Power Fx Expression | Role in the System |
| :--- | :--- | :--- | :--- |
| **"Feed the machine the whole table"** | `Items` Property | `galRequests.Items = Apex_Maintenance_Requests` | Tells the gallery which database table to read. |
| **"The rubber stamp master design"** | `Template Cell` | First item in gallery (with orange outline) | Editing this cell automatically formats every row. |
| **"The current row being stamped"** | `ThisItem` Operator | `ThisItem.Title`, `ThisItem.Priority.Value` | Contextual keyword: means "give me the data for THIS specific row". |
| **"The row the user clicked"** | `Selected` Property | `galRequests.Selected.Title` | Stores the active record chosen by the user's fingertip. |

---

## 8. Visual Cause-and-Effect Architecture Pipeline

```
[ SharePoint Cloud List: 150 Rows ]
               │
               ▼
   [ Gallery.Items = Apex_Maintenance_Requests ]
               │
   ┌───────────┴──────────────────────────────┐
   ▼                                          ▼
[ Row 1 Memory Context ]                   [ Row 2 Memory Context ]
   │                                          │
   ▼                                          ▼
ThisItem.Title = "M-04 Overheat"          ThisItem.Title = "C-02 Motor Screech"
ThisItem.Priority.Value = "High"           ThisItem.Priority.Value = "Medium"
   │                                          │
   └──────────────────────┬───────────────────┘
                          ▼
            [ User Taps Row 1 on Screen ]
                          ▼
             galRequests.Selected = Row 1
                          ▼
          [ Forward to Day 22: Edit Form ]
```

---

## 9. Trainer Demonstration Script (Click-by-Click)

### Step 1: Insert the Gallery (00:25 - 00:29)
* **Action:** Click **+ Insert** &rarr; expand **Layout** &rarr; select **Vertical gallery**.
* **Vocal Script:** *"Watch what happens. Power Apps drops a tall container with sample dummy data. Notice how every row looks identical? That's the rubber stamp at work."*

### Step 2: Wire the Data Source (00:29 - 00:32)
* **Action:** In the Data Source flyout (or Properties pane `Items`), select `Apex_Maintenance_Requests`.
* **Vocal Script:** *"Look at that! In one second, all the sample lorem ipsum text vanished, and our actual factory maintenance records from SharePoint appeared!"*

### Step 3: Identify the Master Template Cell (00:32 - 00:36)
* **Action:** Click on the top row of the gallery. Point to the small pencil icon (Edit gallery) and the selection border.
* **Vocal Script:** *"See this first box? This is the Master Template Cell. If I move this title label down by 10 pixels, watch all 18 rows below it... they ALL move down by 10 pixels in unison!"*

### Step 4: Master `ThisItem` Syntax (00:36 - 00:40)
* **Action:** Select the subtitle label. Change its `Text` property from `ThisItem.Subtitle` to `ThisItem.MachineID`. Select a third label and write `ThisItem.Priority.Value`.
* **Vocal Script:** *"Notice the word `ThisItem`. It doesn't say `AllItems`. It says `ThisItem`. In row 1, `ThisItem` is Machine M-04. In row 2, `ThisItem` is Conveyor C-02. The same formula dynamically reads the correct row!"*

---

## 10. Guided Learner Practice (Step-by-Step Lab)

Have students complete these 4 milestones on their own machines:

* **Milestone A: Gallery Placement:** Drag a Vertical Gallery to the left half of Screen 1. Name it `galMaintenance`.
* **Milestone B: Data Binding:** Set `galMaintenance.Items = Apex_Maintenance_Requests`.
* **Milestone C: Field Configuration:** Set the primary title label to `ThisItem.Title`, the secondary label to `ThisItem.MachineID`, and the date label to `Text(ThisItem.LoggedDate, "dd-mmm-yyyy")`.
* **Milestone D: Selection Test:** Drop a standalone Label on the right side of the screen. Set its `Text` to: `"Selected Incident: " & galMaintenance.Selected.Title & " (" & galMaintenance.Selected.Priority.Value & ")"`. Test clicking different rows in Alt-mode!

---

## 11. Independent Mini-Task: Dynamic Priority Badges

**Challenge:** Add a visual badge that changes color based on Urgency!  
* **Requirement:** In the template cell, insert a small rectangle or circle badge.
* **Formula:**
  ```powerfx
  // Set Badge.Fill property:
  If(
      ThisItem.Priority.Value = "High",
      RGBA(239, 68, 68, 0.25),   // Rose Red for Urgent
      If(
          ThisItem.Priority.Value = "Medium",
          RGBA(245, 158, 11, 0.25), // Amber Yellow
          RGBA(16, 185, 129, 0.25)  // Emerald Green for Low
      )
  )
  ```
* **Success Criteria:** High priority rows glow red; Low priority rows glow green automatically!

---

## 12. 5 Common Beginner Misconceptions

| Misconception | Plausible Wrong Mental Model | The Cloud Reality & Trainer Correction |
| :--- | :--- | :--- |
| **1. "I have to write code for every row in the table."** | "If there are 50 rows, I have to write 50 formulas." | **False.** You write code ONCE in the Template Cell. Power Apps repeats it for 1, 10, or 10,000 rows automatically. |
| **2. "Editing Row 3 changes only Row 3's design."** | "I will click Row 3 and make its text blue." | **False.** You cannot edit Row 3 directly. Any layout or color change made in the Template Cell applies to all rows. |
| **3. "A Gallery copies records into tablet storage."** | "The gallery is a database inside my phone." | **False.** The gallery is only a viewfinder (lens) displaying records fetched from the SharePoint cloud via the connector. |
| **4. "Writing `Apex_Maintenance_Requests.Title` works inside the gallery."** | "I should reference the whole list name." | **False.** Referencing the table name returns a column array. Inside a row, you MUST use `ThisItem.Title` to specify the current row. |
| **5. "`ThisItem.Priority` shows text on screen."** | "Priority is text because it says 'High'." | **False.** Priority is a Choice column! It returns a record object. You must write `ThisItem.Priority.Value` to get the string. |

---

## 13. 5 Knowledge Checks (with 'Why' & 'What If')

1. **Question 1 (Core Concept):** What happens to the other rows in a gallery when you resize a label inside the first (top) template cell?  
   *Answer:* All other rows automatically mirror the exact same size and position instantaneously.
2. **Question 2 ('Why' Architecture):** Why does Power Fx use the keyword `ThisItem` instead of the table name inside a gallery label?  
   *Answer:* Because the table name refers to the entire 150-row dataset, whereas `ThisItem` scopes the formula to the single record currently being rendered in that specific row.
3. **Question 3 ('What Happens If'):** What happens if a factory technician resolves and deletes Ticket #4 in SharePoint while Davi is looking at the gallery?  
   *Answer:* When the gallery refreshes, Row 4 disappears cleanly, and the rows below it slide up seamlessly without leaving any empty gaps.
4. **Question 4 (Data Types):** Why does writing `ThisItem.Priority` cause a red syntax error when Priority is a SharePoint Choice column?  
   *Answer:* Because SharePoint Choice fields return a record object; you must write `ThisItem.Priority.Value` to extract the text string.
5. **Question 5 (Selection State):** How does another control on the screen know which row in the gallery the user tapped?  
   *Answer:* By reading the `Gallery.Selected` property (e.g., `galMaintenance.Selected.MachineID`).

---

## 14. Final Capstone Challenge: Maintenance Triage Console

**Scenario:** Build the complete triage console for Apex Plastics:
* Left side: Vertical Gallery showing `Apex_Maintenance_Requests` with Title, MachineID, and color-coded Priority pill.
* Right side: Detailed Inspection Card reading `galMaintenance.Selected` displaying Incident Details, Technician Name, and Date Logged.

### 100-Point Evaluation Rubric:
* **25 Pts:** Gallery inserted and cleanly bound to `Apex_Maintenance_Requests` with zero syntax errors.
* **25 Pts:** Template cell properly formatted with Title and MachineID without text overlapping.
* **25 Pts:** Choice field correctly addressed via `ThisItem.Priority.Value` with color coding.
* **25 Pts:** External detail panel dynamically updates when user selects different rows via `galMaintenance.Selected`.

---

## 15. Forward Bridge & Curriculum Connection Map

```
  [ Day 20: Connect to SharePoint ]
                │
                ▼ (The live cloud pipe is open)
  [ Day 21: TODAY - Gallery: Read & Select Records ]
    • Items = Apex_Maintenance_Requests
    • ThisItem.Field extracts row values
    • Gallery.Selected tracks user's tap
                │
                ▼ (User tapped a specific row)
  [ Day 22: TOMORROW - Forms: View & Edit One Record ]
    • Form.Item = galMaintenance.Selected
    • SubmitForm() writes updates back to SharePoint!
```
