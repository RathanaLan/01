# DAY 16 LESSON PLAN: Properties & Formulas — How Controls Behave

**Program**: Microsoft Power Apps Beginner to Pro (27-Day Connected Curriculum)  
**Target Audience**: Absolute Zero Beginners (No coding, no database, no Boolean logic background)  
**Phase**: Phase 6 — Power Fx Fundamentals  
**Duration**: 90 Minutes (Strictly timed)  
**Central Mental Model**:  
`REAL PROBLEM -> PROCESS -> DATA -> UI/SCREEN -> LOGIC/DECISION -> ACTION -> STORAGE -> FEEDBACK -> TEST`  
**Today's Connection Chain**:  
`control -> property -> formula -> resulting behavior/value`  
**Core Meaning**: A formula calculates what a property should be or what an action should do.  
**Prior Connection**: Days 14–15 (Controls & Navigation Actions)  
**Forward Bridge**: Day 17 (Conditional Logic: True/False & IF Statements in Power Fx)

---

## 1. Measurable Objectives (3–5 Measurable Outcomes)
By the end of this 90-minute session, the learner will be able to:
1. **Explain the Control-Property-Formula Relationship**: Define in plain language what a control, a property, and a formula are, using the physical thermostat and Excel spreadsheet analogies, without technical jargon.
2. **Apply the Dot (`.`) Operator Correctly**: Read and write the dot notation syntax (`ControlName.PropertyName`) to extract a live value from an input control (e.g., `txtIssueTitle.Text`).
3. **Construct Text Concatenation Formulas**: Combine static strings and dynamic control values using the ampersand (`&`) operator (e.g., `"Ticket: " & txtMachineID.Text`).
4. **Build a Dynamic Calculation Formula**: Create a live character counter formula using the `Len()` function to calculate remaining characters in real time (`100 - Len(txtDescription.Text)`).
5. **Differentiate Static Values from Dynamic Formulas**: Explain why Power Fx formulas recalculate automatically like a spreadsheet rather than requiring manual button-click triggers or update loops.

---

## 2. Timed 90-Minute Lesson Agenda

| Time Window | Duration | Agenda Phase | Pedagogical Focus & Activity |
| :---: | :---: | :--- | :--- |
| **00:00 – 00:10** | 10 Min | **Orientation & Recap** | Welcome, 4 measurable outcomes, 5-minute concept map spiral recap connecting Days 1–15 to Day 16. |
| **00:10 – 00:20** | 10 Min | **Retrieval & Workplace Crisis** | 4-card retrieval quiz; The Apex Plastics "Dumb Form" crisis ($18,000 scrap incident from frozen controls). |
| **00:20 – 00:35** | 15 Min | **Concept Discovery** | The Property & Formula mental model; Excel spreadsheet analogy; Dot (`.`) operator; Ampersand (`&`) concatenation. |
| **00:35 – 00:50** | 15 Min | **Demonstration & Causality** | Visual cause-and-effect flow; Trainer live build of Live Character Counter and Dynamic Ticket Header. |
| **00:50 – 01:05** | 15 Min | **Guided Practice** | Step-by-step learner exercise in Power Apps Studio: building the Apex Plastics dynamic feedback card. |
| **01:05 – 01:18** | 13 Min | **Independent Mini-Task** | Student builds the "Equipment Tag Generator" with live text concatenation and length tracking. |
| **01:18 – 01:26** | 8 Min | **Misconceptions & Check** | Deconstructing 5 common beginner traps; 5-question bilingual knowledge-check quiz. |
| **01:26 – 01:30** | 4 Min | **Challenge & Forward Bridge** | Final Capstone Challenge; 4-tier evaluation rubric; Bridge to Day 17 (Conditional True/False & IF). |

---

## 3. 5-Minute Concept-Map Recap (Spiral Learning Connection)

```
[Day 1-8: Foundation]
Problem -> Process Steps -> Data Architecture (Lists, Columns, Types)
        |
[Day 9-11: Data Design]
SharePoint Lists as Storage -> Columns as Data Fields (Text, Number, Choice)
        |
[Day 12: Wireframing]
Screens mapped to User Process (Home -> New Request -> Confirmation)
        |
[Day 13-14: Studio Controls]
Controls placed on Canvas: Label (Output), TextInput (Input), Button (Action)
        |
[Day 15: Navigation Flow]
OnSelect -> Navigate() / Back() moves between screens
        |
[TODAY: DAY 16] ===> Properties & Formulas: How Controls Behave!
                     Controls have Properties; Formulas calculate their values dynamically!
        |
[NEXT: DAY 17]  ===> Conditional Logic: True/False questions & IF() statements in Power Fx!
```

---

## 4. Prerequisite Retrieval Questions & Answers

1. **Question**: What is the primary operational difference between a **Label** and a **Text Input** control?
   * *Answer*: A Label is an **Output** control designed to display text to the user (read-only); a Text Input is an **Input** control that accepts typing from the user.
2. **Question**: What property of a Button control determines what happens when a user clicks or taps it?
   * *Answer*: The `OnSelect` property.
3. **Question**: When writing a screen navigation formula, why do we write `Navigate(scrNewRequest)` without quotation marks?
   * *Answer*: Because `scrNewRequest` is a live screen object inside Power Apps, not a plain text string. Quotation marks are reserved for literal text.
4. **Question**: In Microsoft Excel, if cell `B1` contains `=A1 * 2`, what happens in `B1` the exact instant you change `A1` from 5 to 10?
   * *Answer*: Cell `B1` recalculates instantly to 20 without pressing Enter or clicking any button.

---

## 5. Today's "WHY THIS EXISTS" Workplace Problem

### The Incident at Apex Plastics (Line B Night Shift)
At 2:15 AM, operator Dara submitted an emergency maintenance ticket on his tablet using the newly created incident screen. The form was built with static controls:
- Dara typed a 3-character issue title: *"bad"*.
- The system accepted the submission because the submit button had no formula checking title length.
- The maintenance technician received a ticket saying *"bad"* with no machine ID and no line reference.
- By the time maintenance located the source of the problem at Injection Press #4, the hydraulic clamp had overheated, resulting in **$18,000 worth of ruined molds and 3 hours of line stoppage**.

### The Core Root Cause
The controls were **"dumb" and disconnected**. The submit button didn't know what was inside the text box, the character counter was frozen at the static text `"0 / 100"`, and the screen couldn't react to user input.  
**Formulas exist because business applications must react dynamically to data.** Without formulas, an app is just an inanimate drawing. With formulas, controls talk to each other, calculate values, enforce rules, and guide the user in real time.

---

## 6. Plain-Language Concept Before Technical Vocabulary

| Plain-Language Concept | Technical Power Apps Term | What it Means in Plain English |
| :--- | :--- | :--- |
| **The Thing on Screen** | **Control** | A visual widget (button, box, label, dropdown) placed on the canvas. |
| **A Characteristic / Knob** | **Property** | A specific setting of the control (its text, color, width, font size, or click action). |
| **The Calculation / Rule** | **Formula (Power Fx)** | An expression that calculates what a property's value should be at any given moment. |
| **Looking Inside a Box** | **Dot (`.`) Operator** | A punctuation mark that reaches into a control to read a specific property (e.g., `txtTitle.Text`). |
| **Text Glue** | **Concatenation (`&`)** | Joining two pieces of text together into a single sentence. |
| **Live Recalculation** | **Declarative Binding** | The formula runs continuously; whenever the source changes, the target updates automatically. |

---

## 7. Everyday Analogy: The Smart Digital Thermostat

Think of a modern digital smart thermostat mounted on the wall:
1. **The Control**: The thermostat display unit (`lblThermostat`).
2. **The Properties**:
   - `Text`: The number showing current room temperature (e.g., `"24°C"`).
   - `Color`: The glow color of the screen.
3. **The Static Approach (Broken)**: The manufacturer paints the number `"22°C"` permanently on the plastic. When the room heats up to 35°C, the display still says 22°C!
4. **The Formula Approach (Power Fx)**: The display's `Text` property is bound to a live formula connected to the temperature probe:
   ```powerfx
   "Room Temp: " & SensorRoomA.Temperature & "°C"
   ```
   When the room temperature rises, the display recalculates instantly. The user does not press a "Refresh" button. The formula maintains continuous truth!

---

## 8. Manufacturing / DX Workplace Example: Apex Plastics Incident Screen

In the Apex Plastics Incident Reporting App:
- Control 1: `txtIssueTitle` (Text Input where operator types the defect name).
- Control 2: `lblCharCount` (Label underneath showing remaining characters).
- Control 3: `lblCardPreview` (Label in the summary header showing live ticket preview).

### The Power Fx Formulas:
1. **Live Character Counter (`lblCharCount.Text`)**:
   ```powerfx
   "Remaining: " & (100 - Len(txtIssueTitle.Text)) & " characters"
   ```
2. **Live Header Preview (`lblCardPreview.Text`)**:
   ```powerfx
   "NEW INCIDENT: " & Upper(txtIssueTitle.Text)
   ```

When the operator types *"Hydraulic oil leak"*, `Len(txtIssueTitle.Text)` returns 19.  
`lblCharCount.Text` immediately displays `"Remaining: 81 characters"`.  
`lblCardPreview.Text` immediately displays `"NEW INCIDENT: HYDRAULIC OIL LEAK"`.

---

## 9. Visual Cause-and-Effect Architecture

```
[ User Action ]
  Operator types "Hydraulic leak" into TextInput (txtIssueTitle)
       |
       v
[ State Change ]
  txtIssueTitle.Text property becomes "Hydraulic leak"
       |
       v
[ Engine Recalculation (Power Fx) ]
  1. Len(txtIssueTitle.Text)  --> calculates 14
  2. 100 - 14                 --> calculates 86
  3. "Remaining: " & 86 & " characters"
       |
       v
[ Automatic UI Update ]
  lblCharCount.Text immediately renders: "Remaining: 86 characters"
  (Zero click events required. Zero refresh scripts required.)
```

---

## 10. Trainer Demonstration (Step-by-Step Script)

### Step 1: Explain the Formula Bar and Property Dropdown
1. Select the label `lblCharCount` on the canvas.
2. Direct the learner's attention to the top-left dropdown in Power Apps Studio: **The Property Selector**.
3. Select the `Text` property.
4. Point to the wide white formula bar: *"This is where we tell Power Apps how this property must behave."*

### Step 2: Demonstrate Static vs Dynamic
1. Type a static string into the formula bar: `"Character count: 0"`.
   * *Trainer Explanation*: *"Notice this is frozen. If I type in the box above, nothing happens. This is a static value."*
2. Now replace it with dynamic reference:
   ```powerfx
   "Characters typed: " & Len(txtIssueTitle.Text)
   ```
3. Test in Studio (holding <kbd>Alt</kbd> key or clicking Play <kbd>F5</kbd>).
4. Type in `txtIssueTitle`. Show how every keystroke instantly increments the number!

### Step 3: Explain the Function and Each Argument
- `Len()`: Short for **Length**. It counts the total number of characters (letters, numbers, spaces, punctuation) inside text.
- `txtIssueTitle.Text`: Reaches into the control named `txtIssueTitle` and extracts its `Text` property.
- `&`: The ampersand operator glues the text string on the left to the calculated number on the right.

---

## 11. Guided Learner Practice (Hands-on in Studio)

**Scenario**: The learner creates a live Ticket Preview Header for the Apex Plastics app.
- **Task**: Combine the user's name, the machine dropdown selection, and the issue title into a single live summary label.
- **Step 1**: Place a Label named `lblLiveSummary` at the top of `scrNewRequest`.
- **Step 2**: Select its `Text` property in the Property Selector.
- **Step 3**: Enter the formula:
  ```powerfx
  "TICKET: " & ddMachine.Selected.Value & " | " & txtIssueTitle.Text
  ```
- **Step 4**: Press <kbd>Alt</kbd> and test changing the machine in `ddMachine` from "Injection Press #1" to "Extruder #3", then type "Bearing noise" in the text box.
- **Verification**: The summary label updates in real time to `"TICKET: Extruder #3 | Bearing noise"`.

---

## 12. Independent Mini-Task

**Objective**: Build a Character Remaining Warning label with a countdown from 50 characters.
- **Requirement**:
  1. Add a Text Input named `txtShortCode`.
  2. Add a Label named `lblCountdown`.
  3. Set `lblCountdown.Text` to show: `"Remaining: X / 50"` where X is $50 - \text{characters typed}$.
- **Expected Formula**:
  ```powerfx
  "Remaining: " & (50 - Len(txtShortCode.Text)) & " / 50"
  ```
- **Success Criteria**:
  - Empty box shows: `"Remaining: 50 / 50"`
  - Typing "P-04" shows: `"Remaining: 46 / 50"`

---

## 13. Common Misconceptions & Trainer Corrections

| # | Plausible Wrong Mental Model | Why the Beginner Believes It | How the Trainer Corrects It |
| :-: | :--- | :--- | :--- |
| **1** | *"I need to create a Button and write code in OnSelect to update the label."* | Beginners coming from web forms expect procedural submit/refresh scripts. | Show Excel: *"Does cell B1 need a button to update when A1 changes? No! Power Fx is reactive like a spreadsheet."* |
| **2** | Writing `"txtIssueTitle".Text` with quotes around the control name. | Beginners think all names inside formulas require quotation marks. | Teach: *"Quotation marks turn words into dumb static text. Unquoted names refer to live living objects on the canvas."* |
| **3** | Writing `txtIssueTitle` without the `.Text` property. | Beginners think the control and its contents are the exact same thing. | Box Analogy: *"A cardboard box is not the shoes inside it. `txtIssueTitle` is the box; `.Text` is the shoes inside."* |
| **4** | Writing `txtIssueTitle.Text = "Hello"` in the formula bar. | Beginners confuse mathematical equality or procedural variable assignment. | Teach: *"You never use `=` to assign a property in Power Apps. You choose the property in the dropdown, and the formula IS the assignment."* |
| **5** | Using `+` instead of `&` to join text together: `"Hello " + txtName.Text`. | Beginners used to basic calculators assume plus joins words. | Teach: `+` is strictly for mathematical addition (`5 + 5 = 10`). For gluing words together, always use the ampersand `&`. |

---

## 14. 5 Knowledge-Check Questions with Explanations

1. **Question**: What is the purpose of the dot (`.`) in the expression `txtMachineID.Text`?
   * *Answer*: It accesses a specific property (`Text`) of the specified control (`txtMachineID`).
2. **Question**: If `txtTitle.Text` currently contains `"Conveyor Stop"`, what does `Len(txtTitle.Text)` evaluate to?
   * *Answer*: `13` (8 letters in Conveyor + 1 space + 4 letters in Stop = 13 characters).
3. **Question (What happens if)**: What happens if an operator deletes all text from `txtIssueTitle` when a label has the formula `"Count: " & Len(txtIssueTitle.Text)`?
   * *Answer*: `Len("")` evaluates to `0`, and the label instantly updates to display `"Count: 0"`.
4. **Question (Why)**: Why does Power Apps use the ampersand (`&`) instead of plus (`+`) to combine text strings?
   * *Answer*: Because `+` represents arithmetic addition. Using `&` explicitly tells the engine to concatenate text strings without ambiguity.
5. **Question**: In Power Apps, where do you select which property of a control you are currently writing a formula for?
   * *Answer*: In the Property Dropdown located on the top-left above the formula bar in Power Apps Studio.

---

## 15. Final Challenge with Expected Result & Rubric

### The Challenge: Apex Plastics Live Equipment ID Badge
Create a dynamic badge on `scrNewRequest` that formats an equipment maintenance code:
- Control 1: `txtMachinePrefix` (Text Input, e.g., `"MCH"`)
- Control 2: `txtLineNumber` (Text Input, e.g., `"02"`)
- Control 3: `lblFormattedBadge` (Label)
- **Requirement**: `lblFormattedBadge.Text` must combine both inputs in uppercase with a hyphen separator and show the total code character count in parentheses:
  `"MCH-02 (6 chars)"`

### Expected Formula:
```powerfx
Upper(txtMachinePrefix.Text) & "-" & Upper(txtLineNumber.Text) & " (" & Len(txtMachinePrefix.Text & "-" & txtLineNumber.Text) & " chars)"
```

### 4-Tier Assessment Rubric:
- **Exemplary (4/4)**: Correctly uses `&` concatenation, dot notation (`.Text`), `Upper()`, and `Len()`; dynamically recalculates as either input changes; zero syntax errors.
- **Proficient (3/4)**: Successfully concatenates prefix and line number with hyphen; minor error in length calculation (e.g., missed the hyphen in length).
- **Developing (2/4)**: Understands dot notation and `&`, but put quotation marks around control names or omitted `.Text`.
- **Beginning (1/4)**: Stuck trying to use an `OnSelect` button event to update the label; needs guidance on declarative spreadsheet concept.

---

## 16. Optional Homework / 15-Minute Review Exercise
1. **Mental Drill**: Look at 3 mobile apps on your phone (e.g., messaging, banking, shopping). For each app, identify one control whose property changes dynamically when you type (e.g., search suggestions, character counter, send button color).
2. **Formula Translation Drill**: Write down what formula would create this text output:
   `"Welcome back, Alex! You have 3 pending tasks."`
   using `txtUserName.Text` and `lblCount.Text`.
   *Answer*: `"Welcome back, " & txtUserName.Text & "! You have " & lblCount.Text & " pending tasks."`

---

## 17. Connection Map: Before -> Today -> Next

```
BEFORE (Days 14–15)
• Controls placed on Canvas (Label, Input, Button)
• Navigation between screens with Navigate() and Back()
• Controls were STATIC and UNCONNECTED

TODAY (Day 16)
• Controls have PROPERTIES (attributes & settings)
• FORMULAS dynamically calculate property values
• Dot notation (Control.Property) and Concatenation (&)
• Automatic live recalculation (The Spreadsheet Magic)

NEXT (Day 17)
• Conditional Logic: True / False in Power Fx
• The IF() Function: If(Condition, TrueValue, FalseValue)
• Dynamic Behavior: Disabling buttons, changing colors, and hiding controls!
```

