# Microsoft Power Apps Professional Foundation &bull; Day 20 Trainer Manual
## Topic: Connect Power Apps to SharePoint
**Phase:** Phase 7: SharePoint Data Integration  
**Pedagogical Blueprint:** Spiral Learning Pattern (Zero-to-Hero Architecture)  
**Central Mental Model:** `REAL PROBLEM -> PROCESS -> DATA -> UI/SCREEN -> LOGIC/DECISION -> ACTION -> STORAGE [CONNECTED] -> FEEDBACK -> TEST`  
**Today's Connection Chain:** `Power Apps controls -> data source -> records -> app display/update`  
**Core Meaning:** This creates the bridge between the front-end user interface and stored persistent business data.  

---

## 1. Executive Summary & Core Transformation

| Dimension | Previous State (Day 19: Isolated Storage) | Target State (Day 20: Connected Data Bridge) |
| :--- | :--- | :--- |
| **App State** | Front-end UI exists in isolation; unaware of cloud data | Front-end UI is actively wired to the cloud list schema |
| **SharePoint State** | Secure vault exists in Microsoft 365; waiting for callers | Linked data source recognized by Power Apps Studio |
| **Power Fx Awareness** | Typing `Apex_Maintenance_Requests` yields red syntax errors | Formula bar autocompletes list name and all 6 column names |
| **Data Pipeline** | Dead wire; zero network pathways | Live authenticated REST/Graph API pipeline established |
| **Analogy** | A brand new sink faucet and a municipal water reservoir with no pipe | The copper plumbing pipe is installed, pressurized, and ready |

---

## 2. Measurable Learning Objectives (4 Milestones)

1. **Articulate the Role of a Data Source Bridge:** The student can explain in plain language why front-end controls cannot talk to SharePoint without an active Data Source connector, using the plumbing pipe analogy.
2. **Execute the Studio Connection Sequence:** The student independently locates the Data cylinder icon on the left navigation bar, launches the `Add data` flyout, selects the SharePoint connector, enters the team site URL, and selects the target list `Apex_Maintenance_Requests`.
3. **Verify Connection Health & Autocomplete:** The student proves the connection succeeded by verifying that the list appears in the Studio Data Pane and typing the list name into the Power Fx formula bar to observe blue autocomplete recognition.
4. **Enforce Two-Door Security Governance:** The student explains why sharing a Power App does NOT automatically share the underlying SharePoint list, and can describe the role of Single Sign-On (SSO) and Microsoft 365 security groups.

---

## 3. The 90-Minute Timed Spiral Agenda

```
[00:00 - 00:12] Part 1: Recall, Contrast & The "Two Strangers" Crisis (12 min)
                - 5-min Spiral Concept Map & Retrieval Flip Cards
                - The "Two Strangers in the Factory" workplace problem at Apex Plastics
                - Everyday analogy: The sink faucet, the water reservoir, and the missing pipe

[00:12 - 00:30] Part 2: Plain-Language Concepts, Connectors & SSO (18 min)
                - Plain-language: The secure telephone line between two departments
                - What is a Connector? (Zero-code Microsoft Graph API wrapper)
                - Single Sign-On (SSO): Why users never enter database passwords in the app
                - Visual Cause-and-Effect Diagram: UI -> Data Source -> Connector -> Cloud List

[00:30 - 00:48] Part 3: Trainer Live Demonstration & Anatomy of Studio Connection (18 min)
                - Trainer demo: Navigating to Studio Left Rail -> Data Pane (Cylinder)
                - Adding the SharePoint connector and choosing the site
                - Selecting Apex_Maintenance_Requests
                - Demonstrating formula bar autocomplete recognition

[00:48 - 01:10] Part 4: Guided Hands-On Practice & Live Connection Simulator (22 min)
                - Interactive Widget 1: The Studio Data Bridge Simulator (Slide 13)
                - Students connect their own [Initials]_Maintenance_Requests list
                - Verification Gate: Typing list name in a test label to confirm blue syntax
                - Interactive Widget 2: Live Connection Diagnostics & Ping Tester (Slide 16)

[01:10 - 01:30] Part 5: Traps, Checks, Multi-Source Capstone & Bridge Forward (20 min)
                - 5 Dangerous Misconceptions vs. Cloud Reality (Slide 17)
                - 5 Formative Knowledge Checks (Slides 18-22)
                - Independent Capstone: Connecting Apex_Equipment_Registry (Slide 23)
                - Connection Map: BEFORE -> TODAY -> NEXT (Slide 24)
```

---

## 4. Prerequisite Retrieval & Spiral Concept Map

### Concept Map Continuity
* **Days 14–15 (UI Controls):** Built the physical form controls (`TextInput`, `Dropdown`, `DatePicker`, `Button`).
* **Days 16–17 (Logic & Validation):** Guarded the controls with `If()` and `IsBlank()` to prevent bad data from submitting.
* **Day 18 (Variables / RAM):** Discovered that local memory forgets everything on restart.
* **Day 19 (SharePoint List Vault):** Built the persistent cloud database table `Apex_Maintenance_Requests` with 6 structured columns.
* **Day 20 (TODAY):** Sits directly between Day 14 UI and Day 19 Storage. Installs the **live data pipe** so the UI can communicate with the vault.
* **Day 21 (TOMORROW):** Reuses this live data pipe to display all saved records to operators using **Galleries**.

### 4 Prerequisite Retrieval Questions & Answers
1. *What did we build on Day 19, and where does it live?*  
   **Answer:** We built a SharePoint List named `Apex_Maintenance_Requests` with columns for Ticket ID, Department, Shift, Urgency, Problem Description, and Reported Date. It lives permanently on Microsoft 365 cloud servers.
2. *Can a Power App control directly read from a SharePoint list without a Data Source?*  
   **Answer:** No! A Power App control only knows what is on its own screen. It requires an added Data Source connector to bridge the gap.
3. *Why did we rename the default Title column instead of deleting it?*  
   **Answer:** Title is a foundational database anchor required by SharePoint for indexing, search, and system operations; it cannot be deleted, so we rename its display label to `Ticket ID`.
4. *What happens to data in a SharePoint List when a tablet runs out of battery?*  
   **Answer:** Nothing is lost! The data is safely committed to Microsoft cloud servers across multi-region availability zones.

---

## 5. Everyday Analogy & The Workplace Crisis

### Everyday Analogy: The Water Pipe Between Sink & Reservoir
* **The Sink & Faucet (Power Apps UI):** Beautiful chrome handles, polished basin, clean drain. You can turn the handle back and forth, but without pipes attached, no water comes out.
* **The Underground Water Reservoir (SharePoint List):** Millions of gallons of clean, filtered water stored safely in an underground municipal concrete vault.
* **The Copper Pipe (Data Source Connector):** The pipe running beneath the street connecting the reservoir to the sink. Once connected, turning the faucet handle immediately draws pressurized water from the reservoir!
* **Key Lesson:** The sink is useless without the pipe; the reservoir is inaccessible without the pipe. Day 20 is the plumbing day!

### The Workplace Crisis: The "Two Strangers" at Apex Plastics
* **Setting:** Line 2 Molding Department, Monday 8:00 AM.
* **The Incident:** Junior developer Alex spent 3 days designing a gorgeous Power Apps form with neon buttons, validation rules, and success banners. On Day 19, Alex also configured the SharePoint list `Apex_Maintenance_Requests`.
* **The Mistake:** Alex assumed that because both Power Apps and SharePoint are part of Microsoft 365, they would "automatically know about each other." Alex told the plant supervisor: *"The app is done!"*
* **The Embarrassment:** Operator David tested the app: filled out ticket `TKT-1050`, tapped "Submit Request", saw a toast banner... but when the supervisor opened the SharePoint list, it was completely empty!
* **The Cause:** The app and the list were **two strangers living in the same building**. They had never been introduced! Alex never added the SharePoint Data Source in Studio.
* **The Fix:** Adding the SharePoint connector took exactly 45 seconds. Immediately, the app recognized the list schema and tickets started streaming in!

---

## 6. Visual Cause-and-Effect Architecture

```
[ USER INTERFACE (Canvas App) ]
  txtTicketID.Text  |  ddDept.Selected  |  txtDesc.Text
          │
          ▼
[ POWER FX FORMULA LAYER ]
  References: "Apex_Maintenance_Requests" (Data Source Identifier)
          │
          ▼
[ DATA CONNECTOR (The Bridge) ]
  Microsoft 365 Single Sign-On (Entra ID OAuth Token)
  Translates Power Fx into REST / Graph API Requests
          │
          ▼
[ MICROSOFT CLOUD NETWORK ]
  HTTPS Secure Encrypted Tunnel (TLS 1.3)
          │
          ▼
[ SHAREPOINT LIST STORAGE ]
  Apex_Maintenance_Requests Table & Columns
  (Title, Department, Shift, Urgency, ProblemDescription)
```

---

## 7. Step-by-Step Trainer Demonstration Script

### Click-by-Click Instructions (Studio Left Navigation Rail)
1. **Open Studio:** Open your Canvas app in Power Apps Studio.
2. **Locate Data Cylinder:** Direct student eyes to the left navigation bar. Point to the icon shaped like a cylinder (a stacked database disk icon).
3. **Open Data Flyout:** Click the **Data** icon. The Data flyout panel slides open.
4. **Click + Add data:** Click the prominent purple/white `+ Add data` button at the top of the panel.
5. **Search Connectors:** In the search box, type `SharePoint`. Click the green **SharePoint** connector.
6. **Select Connection:** Click your corporate account (Single Sign-On).
7. **Select Site:** Under "Recent sites", select your team site (or paste the site URL).
8. **Select List:** In the list checklist, check the box next to `Apex_Maintenance_Requests`.
9. **Click Connect:** Click the **Connect** button at the bottom right.
10. **The Moment of Verification:** Watch the Data pane! `Apex_Maintenance_Requests` appears with a green checkmark.
11. **Demonstrate Autocomplete:** Insert a temporary Label. In the formula bar, type `CountRows(Apex_` &rarr; Power Apps immediately autocompletes `Apex_Maintenance_Requests` in bright blue!

---

## 8. Guided Learner Practice & Verification Gates

### Practice Milestones for Students
* **Task 1:** Open their existing Canvas lab app from Days 14–18.
* **Task 2:** Click the Data cylinder icon on the left rail.
* **Task 3:** Click `+ Add data` &rarr; choose `SharePoint`.
* **Task 4:** Select their lab SharePoint site.
* **Task 5:** Check `[Initials]_Maintenance_Requests` and click **Connect**.
* **Verification Gate:** In the Data pane, click the three dots (`...`) next to their list and select **Edit data**. A browser tab opens showing their live SharePoint list!

---

## 9. Common Misconceptions & Pedagogical Corrections

1. **Misconception: "Connecting downloads all 10,000 records onto the user's tablet."**  
   *Correction:* A Data Source is an active query pipeline, not an offline copy. It queries records on demand over the network using delegation. Your phone's memory is never overwhelmed.
2. **Misconception: "Sharing the Power App automatically lets everyone access the SharePoint list."**  
   *Correction:* Power Apps and SharePoint use the **Two-Door Security Model**. Door 1 is the App license; Door 2 is the SharePoint list permissions. Users must have at least *Contribute* or *Edit* rights on the SharePoint list, or they will see permission errors!
3. **Misconception: "If I rename a column in SharePoint, the app updates automatically."**  
   *Correction:* SharePoint does not push notifications to open apps. If schema changes occur in SharePoint, the developer must click `...` next to the data source in Power Apps and click **Refresh**!
4. **Misconception: "We need an SQL connection string or server IP address."**  
   *Correction:* Microsoft 365 uses cloud-native connectors. Identity is handled seamlessly via Entra ID Single Sign-On (SSO); no IP addresses, ports, or database passwords are ever exposed.

---

## 10. Formative Knowledge Checks (5 Questions)

1. *What is the primary function of a Data Source in Power Apps?*  
   **Answer:** It acts as the secure communications bridge between UI controls and the external storage system.
2. *(Why Question) Why does Power Apps require users to have permissions on BOTH the app and the SharePoint list?*  
   **Answer:** Power Apps executes queries on behalf of the logged-in user using their personal identity (delegated permissions). If the user does not have permission on the list, SharePoint denies the request for security.
3. *Where in Power Apps Studio do you add a connection to a SharePoint list?*  
   **Answer:** In the left navigation rail, click the **Data** icon (cylinder/disk icon), then click `+ Add data`.
4. *(What Happens If Question) What happens if you add a new column in SharePoint while Power Apps Studio is open, but do not click "Refresh"?*  
   **Answer:** Power Apps will not recognize the new column in the formula bar and will mark it with a red squiggly error until the data source is refreshed.
5. *How does Single Sign-On (SSO) benefit operators using the app on the factory floor?*  
   **Answer:** Operators log into the tablet once with their corporate Microsoft 365 credentials. Power Apps automatically authenticates with SharePoint without prompting for additional passwords.

---

## 11. Final Capstone Challenge & Evaluation Rubric

### Mission: Multi-Source Data Architecture
Connect BOTH business lists to the production app:
1. Primary List: `Apex_Maintenance_Requests` (Ticket transactions)
2. Secondary List: `Apex_Equipment_Registry` (Machine catalog created in Day 19 capstone)

### 100-Point Scoring Rubric
* **Data Source Presence (30 pts):** Both lists appear cleanly in the Studio Data Pane with zero red warning badges.
* **Schema Verification (30 pts):** Typing both list names into the Power Fx formula bar triggers instant blue autocomplete without syntax errors.
* **Refresh Mastery (20 pts):** Student can demonstrate clicking `...` and selecting `Refresh` on command.
* **Security Explanation (20 pts):** Student clearly explains to the trainer why team members need list permissions before the app is published.

---

## 12. Forward Bridge to Day 21
* **Today (Day 20):** We installed the live water pipe between Power Apps and SharePoint.
* **Tomorrow (Day 21):** Now that the pipe is connected, we turn on the faucet! We will introduce **Galleries (`Gallery` control)** to show operators a live scrolling feed of all active maintenance tickets currently sitting in the SharePoint vault!
