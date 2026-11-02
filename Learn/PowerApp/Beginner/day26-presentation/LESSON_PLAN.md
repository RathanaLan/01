# DAY 26 TRAINER MANUAL: BUILD THE COMPLETE CONNECTED APP
**Phase:** Project / Synthesis & Assembly  
**Central Mental Model:** `REAL PROBLEM -> PROCESS -> DATA -> UI/SCREEN -> LOGIC/DECISION -> ACTION -> STORAGE -> FEEDBACK -> TEST`  
**Today's Connection Chain:** `Home -> New -> Validation -> Save -> List -> Details -> Edit -> Filter/Search`  
**Automation Extension Model:** `USER -> POWER APPS -> SHAREPOINT -> POWER AUTOMATE -> NOTIFICATION -> PERSON`  
**Core Meaning:** Integrate concepts as one living, unified system rather than isolated technical features. Build the end-to-end 3-screen maintenance app designed on Day 25, then wake up a 2-step Power Automate flow to notify maintenance supervisors when high-priority tickets are logged.  
**Prior Connection:** Day 25 (Project Architecture & 7-Layer Blueprint) and Days 1–24 (all individual UI, logic, SharePoint, and CRUD building blocks).  
**Forward Bridge:** Day 27: Independent Transfer & Capstone (proving true mastery by designing and building a new domain app independently).  
**Duration:** Exactly 90 Minutes (Spiral-Learning Pattern: Recall ➔ Connect ➔ Discover ➔ Demonstrate ➔ Guided Practice ➔ Independent Practice ➔ Check ➔ Bridge Forward).

---

## 1. 3–5 MEASURABLE LEARNING OBJECTIVES
By the end of this 90-minute lesson, an absolute zero beginner student will be able to:
1. **Wire the End-to-End 3-Screen Application Chain:** Connect `scr_Home` (Browse gallery + fast stats), `scr_New` (NewForm intake), and `scr_DetailEdit` (EditForm workbench bound to `galWorkOrders.Selected`) into a seamless operational flow with forward and back navigation.
2. **Implement Production-Grade Safety Logic:** Configure `btnSubmit.DisplayMode` using `If(IsBlank(...))` validation, execute `SubmitForm()`, and route feedback through `Form.OnSuccess` (`Notify()` + `Navigate()`) and `Form.OnFailure`.
3. **Configure Multi-Criteria Gallery Search & Filtering:** Write a delegable Power Fx expression combining `Search()` and `Filter()` to filter active tickets by machine dropdown and search query simultaneously.
4. **Explain and Build a 2-Step Automated Cloud Flow:** In child-simple language, define **Trigger** ("what starts the flow") and **Action** ("what the flow does next"), and configure a flow starting with SharePoint "When an item is created" and concluding with "Send an email (V2)".
5. **Diagnose the 3 Failure Points in the App-to-Flow Chain:** Accurately distinguish between (A) Power Apps failed to save the record, (B) SharePoint saved the record but Flow did not trigger, and (C) Flow triggered but the notification action failed.

---

## 2. 5-MINUTE CONCEPT-MAP RECAP (CONNECTING DAYS 1–25)

```
[Days 1-5: UI & Variables]
   Buttons, TextInputs, Labels -> Temporary RAM Memory (Set, UpdateContext)
                                 ↓
[Days 6-10: Conditions & Collections]
   If Logic, IsBlank Validation, Multi-Row Cache (ClearCollect)
                                 ↓
[Days 11-16: Screens & Navigation]
   Multi-Screen Flow (Navigate, Back) -> Container Layouts -> UX Feedback (Notify)
                                 ↓
[Days 17-20: SharePoint Cloud Database]
   Persistent Cloud Storage -> Typed Columns (Choice, Number, Person) -> No Duplicates
                                 ↓
[Days 21-24: The Complete CRUD Lifecycle]
   Browse (Gallery.Items) -> Select (gal.Selected) -> Create (NewForm) -> Edit (EditForm) -> Save (SubmitForm)
                                 ↓
[Day 25: Architectural Blueprints]
   7-Layer Synthesis: Problem -> Process -> Data -> UI -> Logic -> Storage -> Test
                                 ↓
═══════════════════════════════════════════════════════════════════════════════════════════════════
[DAY 26: THE LIVING SYSTEM + POWER AUTOMATE EXTENSION]
   Assembly: Home ➔ New ➔ Validate ➔ Save ➔ Cloud Storage ➔ Flow Trigger ➔ Email Alert ➔ Edit
═══════════════════════════════════════════════════════════════════════════════════════════════════
                                 ↓
[Day 27: Capstone Certification & Independent Transfer]
   Build an Entire Enterprise Solution Completely from Scratch Without Trainer Scaffolding
```

### Trainer Dialogue & Opening Script (5 minutes)
> *"Welcome to Day 26! Look at how far we have traveled. On Day 1, you didn't know what a button was. On Day 10, you made your app think with conditions. On Day 20, you connected your app to cloud databases in SharePoint. Yesterday, on Day 25, we became software architects and drew a complete 7-layer blueprint on paper without writing a single line of messy code.  
> Today is the day we breathe life into that blueprint! Today, we don't build isolated buttons or lonely galleries. We build the **Complete Connected System**: an operator submits a machine breakdown on their phone, the data lands safely in SharePoint, an automated cloud flow wakes up instantly to email the maintenance supervisor, and the lead technician opens their tablet to update the work order until the machine is safe.  
> Welcome to real-world software engineering!"*

---

## 3. PREREQUISITE ACTIVATION QUESTIONS (RETRIEVAL PRACTICE)

### Question 1:
- **Trainer Ask:** *"Yesterday on Day 25, why did we decide that `btnSubmit.DisplayMode` must be controlled by an `If(IsBlank(...))` formula rather than letting the user click it freely?"*
- **Expected Student Response:** *"To protect the company database! If we don't disable the button when required fields are empty, users will submit blank records that cause errors, break reports, and waste technicians' time."*
- **Trainer Cue:** Reconnect condition ➔ question ➔ True/False ➔ action.

### Question 2:
- **Trainer Ask:** *"What is the exact formula that glues our Browse gallery (`galWorkOrders`) to our Detail/Edit form (`frmEditOrder`), and where is it written?"*
- **Expected Student Response:** *"It is written in the Form's `Item` property: `Item = galWorkOrders.Selected`. This tells the form to display the exact record the user clicked in the gallery."*

### Question 3:
- **Trainer Ask:** *"Why must we put our `Notify()` success message in `frmOrder.OnSuccess` instead of the button's `OnSelect`?"*
- **Expected Student Response:** *"Because `OnSuccess` runs ONLY after SharePoint sends back confirmation that the record was saved in the cloud. If we put it in the button's `OnSelect`, the app might lie and say 'Saved!' even if the WiFi was disconnected and data was lost!"*

---

## 4. TODAY'S 'WHY THIS EXISTS' PROBLEM: THE ISOLATED FEATURE ISLAND

### The Workplace Scenario: Apex Precision Engineering ($32,000 Communication Gap)
After yesterday's lesson on architecture, Apex Precision Engineering was ready to replace their chaotic paper tickets. However, a developer built three separate screens that were never connected:
1. **Screen 1** had a gallery, but clicking a row did nothing—it didn't navigate to the details!
2. **Screen 2** had a form that saved records to SharePoint, but after clicking Save, the screen stayed frozen on the old data, leaving the operator wondering: *"Did it work? Should I click it again?"* (They clicked it 5 times, creating 5 duplicate tickets!).
3. **The Communication Gap:** Even though the ticket landed in SharePoint, the maintenance supervisor sat in his office 200 meters away and had no idea Line 2 was halted. He only found out 3 hours later when the plant manager yelled at him!

### The Consequence:
A $32,000 delay in turbine blade shipments because nobody received an alert when the ticket was created, and operators didn't know whether their tickets were saved.

### The Architectural Antidote:
A system is not a collection of screens. A system is an **unbroken chain of human-to-computer hand-offs**:
1. User submits with visual confirmation (`Notify()`).
2. App navigates back to the refreshed gallery (`Navigate(scr_Home)`).
3. Cloud database wakes up an automated notification (`Power Automate`).
4. Supervisor receives an email with a direct link to the ticket.

---

## 5. PLAIN-LANGUAGE CONCEPT BEFORE TECHNICAL VOCABULARY

| Plain-Language Concept | Technical Term | What It Means in Plain English |
| :--- | :--- | :--- |
| **The Connected Chain** | `End-to-End Application` | All screens, buttons, databases, and alerts talk to each other without dead ends. |
| **Automatic Alarm** | `Cloud Flow (Power Automate)` | An automated digital assistant in the cloud that runs tasks in the background without needing the app open. |
| **The Spark / What Starts It** | `Flow Trigger` | The specific event that wakes up the automation (e.g., "A new row was added to SharePoint"). |
| **The Chore / What Happens** | `Flow Action` | The work the automation performs after being triggered (e.g., "Send an email alert to the boss"). |
| **The Live Connection** | `Gallery Selection Binding` | `Item = galWorkOrders.Selected`—the Form displays whatever the user touched. |
| **The Traffic Gate** | `DisplayMode Validation` | Locking buttons in gray until the human enters valid facts. |

---

## 6. EVERYDAY ANALOGIES

### Analogy 1: The Modern Pizza Tracker App
1. **Intake:** You order a large pepperoni pizza on the phone app.
2. **Validation:** The app checks that you entered a valid address and payment card.
3. **Storage:** The order is stored in the restaurant's central database.
4. **Trigger:** The oven kitchen screen bleeps automatically as soon as the order arrives.
5. **Action:** When the chef slides the pizza into the delivery box, an automated SMS is sent to your phone: *"Your pizza is out for delivery with driver Carlos!"*
6. **Update:** Carlos updates his mobile app to "Delivered", which marks the order complete in the database.

> **Key Rule for Students:** You didn't have to call Carlos. The kitchen didn't have to email the manager. The system handled the hand-off automatically through triggers and actions!

---

## 7. MANUFACTURING & DX WORKPLACE APPLICATION: LINE 2 BREAKDOWN APP

### The 8-Step System Lifecycle:
```
[Step 1: Floor Operator]
   Notices CNC Spindle overheating (85°C)
   Opens Power Apps on rugged tablet -> Clicks "+ Report Issue"
                                ↓
[Step 2: New Ticket Screen]
   Selects Machine "CNC-02", Priority "Critical", Issue "Coolant Pump Motor Jammed"
   DisplayMode unlocks from Disabled to Edit
                                ↓
[Step 3: Save & Cloud Write]
   Clicks "Submit Work Order" -> SubmitForm(frmNewOrder)
   SharePoint creates new row with ID #WO-1045
                                ↓
[Step 4: Immediate Feedback]
   OnSuccess triggers: Green banner appears -> Navigates back to Browse Screen
   Gallery instantly displays new WO-1045 at top of list in bright red
                                ↓
[Step 5: Cloud Automation Trigger]
   Power Automate detects: "When an item is created in WorkOrders"
   Flow wakes up in Microsoft Cloud (independent of tablet!)
                                ↓
[Step 6: Supervisor Notification Action]
   Flow sends email to LeadTech@apex.com:
   Subject: "🚨 CRITICAL: New Work Order WO-1045 for CNC-02"
   Body contains: Machine, Operator Name, Issue Description, and Link
                                ↓
[Step 7: Lead Technician Workbench]
   Lead Tech clicks ticket in Gallery -> scr_DetailEdit opens in EditMode
   Assigns Technician "Dara", updates Status to "In Repair"
                                ↓
[Step 8: Resolution & Verification]
   Tech flushes pump, logs $120 gasket cost -> Submits edit
   Status changes to "Resolved" -> Gallery card turns green
```

---

## 8. POWER FX CAUSE-AND-EFFECT IMPLEMENTATION SPECIFICATIONS

### 1. Button DisplayMode Validation:
- **Business Requirement:** Operators must never submit a work order without selecting a machine and typing an issue description.
- **Plain-English Rule:** If either the machine dropdown is unselected OR the issue text is blank, keep the button disabled; otherwise make it editable.
- **Condition / Question:** `IsBlank(cmbMachine.Selected) Or IsBlank(txtDescription.Text)`
- **Result:** `True` ➔ Disabled (`DisplayMode.Disabled`); `False` ➔ Editable (`DisplayMode.Edit`)
- **Power Fx:**
  ```powerfx
  // Property: btnSubmitOrder.DisplayMode
  If(
      IsBlank(cmbMachine.Selected) Or IsBlank(txtDescription.Text),
      DisplayMode.Disabled,
      DisplayMode.Edit
  )
  ```

### 2. Form Submission & OnSuccess Hook:
- **Business Requirement:** When the operator taps Submit, save the record. If successful, alert the operator with a green banner and return to the main browse screen.
- **Power Fx on Button:**
  ```powerfx
  // Property: btnSubmitOrder.OnSelect
  SubmitForm(frmNewWorkOrder)
  ```
- **Power Fx on Form:**
  ```powerfx
  // Property: frmNewWorkOrder.OnSuccess
  Notify("Work order successfully saved to cloud!", NotificationType.Success);
  Navigate(scr_Home, ScreenTransition.Cover)
  
  // Property: frmNewWorkOrder.OnFailure
  Notify("Error saving to database: " & frmNewWorkOrder.Error, NotificationType.Error)
  ```

### 3. Gallery Filtering and Search:
- **Business Requirement:** Technicians must be able to search work orders by Title/Description and filter by Machine simultaneously.
- **Power Fx:**
  ```powerfx
  // Property: galWorkOrders.Items
  Search(
      Filter(
          WorkOrders,
          IsBlank(cmbFilterMachine.Selected.Value) Or MachineID.Value = cmbFilterMachine.Selected.Value
      ),
      txtSearch.Text,
      "Title",
      "Description"
  )
  ```

---

## 9. POWER AUTOMATE BEGINNER EXTENSION: ARCHITECTURE & TROUBLESHOOTING

### What is Power Automate?
> *"Think of Power Automate as an invisible assistant sitting in the cloud 24 hours a day. It never sleeps, never takes lunch, and never forgets. It watches your SharePoint list. The second a new record lands, it springs into action."*

### The 2 Core Terms:
1. **Trigger ("The Alarm"):** What wakes the flow up.
   - Example: SharePoint connector ➔ *"When an item is created"*.
2. **Action ("The Task"):** What the flow does once awake.
   - Example: Office 365 Outlook connector ➔ *"Send an email (V2)"*.

### The 3-Tier Troubleshooting Framework:
When a supervisor complains: *"I didn't receive an email when machine CNC-02 broke!"*, where did the chain fail?

```
[Tier A: Power Apps Layer]
   Did the record actually save to SharePoint?
   Check: Open SharePoint list in browser.
   - If row is MISSING: Failure occurred in Power Apps! Check Form.Error, OnFailure, and validation rules.
   - If row is PRESENT: Move to Tier B.
               ↓
[Tier B: Flow Trigger Layer]
   Did Power Automate detect the new SharePoint row?
   Check: Open Power Automate portal -> Run History.
   - If Run History has NO RUNS: The trigger failed! Check if Flow is turned "On", or if connector credentials expired.
   - If Run History shows a run: Move to Tier C.
               ↓
[Tier C: Notification Action Layer]
   Did the email send action succeed?
   Check: Click the run in history -> Inspect "Send an email (V2)".
   - If Red X: Recipient email address was invalid or mailbox was full.
   - If Green Checkmark: Email sent successfully! Check recipient's Outlook Junk/Spam folder.
```

---

## 10. TIMED 90-MINUTE AGENDA BREAKDOWN

| Time | Phase | Focus / Activity |
| :---: | :--- | :--- |
| **00–10 min** | **Recall & Connect** | Review Day 25 Blueprint; 3 retrieval check questions; Concept Map recap. |
| **10–20 min** | **Discover & Real Pain** | The "Isolated Feature Island" crisis ($32,000 failure); Pizza Tracker analogy. |
| **20–35 min** | **Demonstrate (Part 1: App)** | Trainer live demonstration: Assembling 3 screens, wiring gal.Selected, and setting validation. |
| **35–45 min** | **Demonstrate (Part 2: Flow)**| Trainer live demonstration: Creating the 2-step automated cloud flow in 5 minutes. |
| **45–60 min** | **Guided Practice** | Learner pairs with trainer to wire Home ➔ New ➔ Detail/Edit with OnSuccess hooks. |
| **60–72 min** | **Independent Mini-Task** | Student builds the Power Automate flow, tests with a live submission, and verifies email delivery. |
| **72–82 min** | **Check & Demolish Myths** | Dual-state 5-question formative assessment quiz; 3-tier troubleshooting audit. |
| **82–90 min** | **Bridge Forward & Homework** | Review Rubric; assign Day 26 homework; bridge to Day 27 Independent Capstone. |

---

## 11. 5 COMMON BEGINNER MISCONCEPTIONS DEMOLISHED

### Misconception 1: "Power Automate replaces Power Apps."
- **Wrong Mental Model:** Thinking Power Automate is just an upgraded version of Power Apps.
- **Trainer Correction:** *"Power Apps is the FACE (screens, buttons, forms that humans touch). Power Automate is the NERVOUS SYSTEM (invisible messages moving between computers behind the scenes). They work as partners: Apps collect data, SharePoint stores data, Automate alerts people."*

### Misconception 2: "If SharePoint gets a record, the email sends immediately in the same millisecond."
- **Wrong Mental Model:** Expecting instantaneous execution.
- **Trainer Correction:** *"Cloud flows poll or receive webhooks from SharePoint. An automated flow typically triggers within 15 to 90 seconds. Explain this delay to operators so they don't panic."*

### Misconception 3: "You can put SendEmail() directly in Power Apps so you don't need Power Automate."
- **Wrong Mental Model:** Trying to cram all notification code into the button's `OnSelect`.
- **Trainer Correction:** *"If the user closes their tablet immediately after tapping submit, an in-app email can fail. Power Automate runs safely in the cloud independent of the user's battery, device, or connection!"*

### Misconception 4: "Forms on different screens cannot talk to the same SharePoint list."
- **Wrong Mental Model:** Creating two duplicate SharePoint lists for New and Edit.
- **Trainer Correction:** *"Both `frmNewOrder` and `frmEditOrder` point to the EXACT same data source: `WorkOrders`. The only difference is `FormMode.New` creates a new row, while `FormMode.Edit` updates the selected row."*

### Misconception 5: "If the email didn't arrive, the Power App must be broken."
- **Wrong Mental Model:** Randomly deleting controls in Power Apps without checking SharePoint or Flow.
- **Trainer Correction:** *"Always use the 3-Tier Troubleshooting sequence: Check SharePoint first! If the row exists, Power Apps did its job 100% perfectly. Do not touch your app code!"*

---

## 12. FORMATIVE ASSESSMENT: 5 KNOWLEDGE-CHECK QUESTIONS WITH ANSWERS

1. **Question:** Why do we set `frmNewWorkOrder.DataSource = WorkOrders` and `frmEditWorkOrder.DataSource = WorkOrders` to the exact same list?
   - **Answer:** Because they represent two stages of the same record's lifecycle. `FormMode.New` inserts a new row, while `FormMode.Edit` updates an existing row without duplicating data.
2. **Question (What happens if):** What happens if an operator submits a Critical work order while the mobile internet drops for 10 seconds?
   - **Answer:** `SubmitForm()` fails. If `Notify()` is correctly located in `OnSuccess`, the app will NOT falsely report success. Instead, `OnFailure` triggers, notifying the operator that the network failed so they can retry.
3. **Question (Why):** Why is an automated cloud flow better for supervisor alerts than having the user's tablet send an email directly?
   - **Answer:** Because cloud flows run on Microsoft cloud servers. Once the row is in SharePoint, the email will send reliably even if the operator immediately turns off their tablet or walks into a basement elevator with no reception.
4. **Question:** In Power Automate, what is the exact difference between a Trigger and an Action?
   - **Answer:** A Trigger is the starting event ("When an item is created"). An Action is the resulting operation performed by the flow ("Send an email (V2)").
5. **Question (Troubleshooting):** An operator logged ticket WO-1049. You open SharePoint and see WO-1049. But the supervisor says she never got an email. Where should you look first, and what should you NOT touch?
   - **Answer:** You should open Power Automate and check the Run History. You should NOT touch or change the Power Apps code, because the record is safely in SharePoint, proving Power Apps worked flawlessly.

---

## 13. FINAL CHALLENGE & RUBRIC

### The Challenge: "The Flawless Shop-Floor Hand-off"
The learner must demonstrate an end-to-end working system:
1. Open `scr_Home` ➔ Click `+ New Work Order`.
2. Try submitting with empty fields ➔ Verify button stays disabled in gray.
3. Select Machine "Lathe-01", Priority "High", and enter description ➔ Button unlocks.
4. Tap Submit ➔ Verify green success banner appears ➔ Screen navigates back to Home.
5. Verify new ticket is visible in Gallery.
6. Open Outlook ➔ Verify automated notification email arrived within 2 minutes containing ticket details.
7. Click ticket in gallery ➔ Verify `scr_DetailEdit` opens with Lathe-01 details loaded.
8. Change status to "In Repair" and save ➔ Verify gallery updates without duplicate row.

### 3-Level Evaluation Rubric:
- **Level 1 (Novice):** App has working screens but buttons are not validated; navigation is manual or dead-ends; flow is not triggered or hardcoded.
- **Level 2 (Competent):** App has working 3-screen flow with `galWorkOrders.Selected`; `btnSubmit` has `IsBlank()` validation; Flow triggers on SharePoint item creation and sends email alert with dynamic data.
- **Level 3 (Master Engineer):** Complete system harmony. All `OnSuccess` / `OnFailure` hooks properly configured; search and dropdown filter work seamlessly; flow includes dynamic fields (ID, Machine, Priority); student accurately explains the 3-Tier troubleshooting model.

---

## 14. OPTIONAL 15-MINUTE HOMEWORK REVIEW
1. **Flow Audit:** In your personal developer environment, open the Power Automate portal, inspect the Run History of your flow, and screenshot the input/output tokens of "When an item is created".
2. **Dynamic Priority Tag:** Add a rule in Power Automate or Power Apps that formats Critical work order emails with high importance.
3. **Self-Reflection:** Write 3 sentences explaining why software architects treat Power Apps, SharePoint, and Power Automate as one unified triangle rather than three separate tools.
