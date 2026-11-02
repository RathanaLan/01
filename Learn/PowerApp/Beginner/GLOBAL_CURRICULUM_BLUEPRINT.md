# 🌐 Global Curriculum Architecture & Engineering Blueprint
## Microsoft Power Apps for Absolute Zero Beginners • Connected 27-Day Master Program

> **Document Classification:** Master Curriculum Standard & Global Configuration Guide  
> **Target Audience:** Absolute zero beginners (factory operators, warehouse dispatchers, QC inspectors, administrative personnel, shift supervisors). Assume zero prior programming, Boolean logic, database, or Power Apps experience.  
> **Applicability:** Universal architectural standard for all 27 course modules (Day 1 through Day 27).  
> **Master Directive:** Every lesson authored in this curriculum must strictly conform to the pedagogical, engineering, bilingual, and technical specifications outlined in this global document.

---

## 🗺️ 1. The Central Mental Model & Curriculum Creed

### 1.1 The Central Mental Model Chain
The entire 27-day program is **NOT** a collection of isolated features, formulas, or screens. It is a single, continuous, unified problem-solving journey:

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 THE 9-STAGE CONNECTED CURRICULUM CHAIN                                 │
│                                                                                                        │
│  [1. REAL PROBLEM] ➔ [2. PROCESS] ➔ [3. DATA] ➔ [4. UI / SCREEN] ➔ [5. LOGIC / DECISION]             │
│                                                                               │                        │
│  [9. TEST & VERIFY]  [8. FEEDBACK]  [7. STORAGE]  [6. ACTION / ROUTING] ◄──┘                        │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 The Three Immutable Instructional Laws
1. **Never Teach an Isolated Definition:**  
   Never teach a technical concept (e.g., *Boolean True/False*, *DisplayMode*, *Variables*, *Formulas*) as an abstract term.  
   *Incorrect:* "True and False are boolean logic values in Power Apps."  
   *Correct:* "DATA can be compared; a CONDITION asks a question; that question evaluates to TRUE or FALSE; IF uses that verdict to choose an ACTION; later that exact same chain is implemented in Power Fx validation, Visible properties, DisplayMode interlocks, and SharePoint filters."
2. **The 3-Day Pedagogical Anchor (Mandatory in Every Lesson):**  
   Every lesson must explicitly document:
   * **Prior Connection:** Exactly how today builds upon the data, concepts, or steps learned yesterday.
   * **Today's Anchor Chain:** Today's specific sequence (e.g., `condition ➔ True/False ➔ IF ➔ action A / action B`).
   * **Forward Bridge:** Why today's concept is insufficient on its own and why the next concept is required (e.g., *"Today we mastered single IF decisions; tomorrow real-world decisions demand multi-condition gates with AND / OR"*).
3. **The Dual Case Anchor (Everyday + Industrial DX):**  
   Every single lesson must feature:
   * **An Everyday Tangible Metaphor:** (e.g., Railway Switch Track, Kitchen Pantry Jars, Bank Security Vault).
   * **A Realistic Workplace DX Failure / Pain Case:** Grounded in a manufacturing facility (e.g., *Apex Plastics injection molding line*), quantifying real operational downtime, scrap waste, or financial loss caused by lacking this concept.

---

## ⏱️ 2. The 90-Minute Spiral Learning Architecture

Every session is designed for exactly **90 minutes** (00:00 to 90:00). The progression follows an 8-step spiral learning pattern across 6 disciplined segments:

```
RECALL ➔ CONNECT ➔ DISCOVER ➔ DEMONSTRATE ➔ GUIDED PRACTICE ➔ INDEPENDENT PRACTICE ➔ CHECK ➔ BRIDGE FORWARD
```

### 2.1 The Master 90-Minute Agenda Timetable

| Segment | Time Range | Duration | Pedagogical Phase | Required Lesson Content & Activities |
| :---: | :---: | :---: | :--- | :--- |
| **Part 1** | **00:00 – 10:00** | 10 min | **RECALL & CONNECT** | • Course tag & lesson branding.<br>• 5-min concept map recap reconnecting past lessons.<br>• 3 prerequisite retrieval questions with oral answers.<br>• 3–4 measurable learning objectives (Bloom's Taxonomy). |
| **Part 2** | **10:00 – 25:00** | 15 min | **DISCOVER (THE WHY)** | • Today's workplace catastrophe / financial pain case.<br>• Plain-language concept bridge before technical syntax.<br>• Tangible everyday physical analogy. |
| **Part 3** | **25:00 – 45:00** | 20 min | **DEEP DIVE THEORY** | • Visual cause-and-effect flowchart / diagram.<br>• Universal 3-part syntax grammar anatomy.<br>• Application pattern matrix (Behavioral vs Visual vs Permissions). |
| **Part 4** | **45:00 – 60:00** | 15 min | **DEMONSTRATE & LAB** | • **Minute 45:00:** Mid-session pulse check, posture reset & hydration.<br>• Trainer live demo of the interactive Workbench.<br>• Real-time reactive slider/toggle condition testing. |
| **Part 5** | **60:00 – 75:00** | 15 min | **GUIDED PRACTICE** | • Workplace form blueprint analysis & schema mapping.<br>• Hands-on 6-Scenario Simulator widget with score counter.<br>• 4 common beginner misconceptions & trainer corrections. |
| **Part 6** | **75:00 – 90:00** | 15 min | **ASSESS & BRIDGE** | • 5-Question Knowledge Check quiz with rationale cards.<br>• Capstone Independent Practice Challenge table.<br>• Collapsible benchmark solution reveal & 4-level rubric.<br>• 3-day Connection Map & 15-minute daily homework. |

---

## 🎨 3. Presentation Stage & CSS Architecture (Fluent 2 Dark)

All lesson decks are engineered as **standalone, zero-external-dependency HTML5/CSS3/ES6 applications** that run offline in Microsoft Edge and modern browsers.

### 3.1 16:9 Viewport Stage Geometry
* **Stage Canvas:** Constrained 16:9 aspect ratio presentation container (`width: 100vw; height: 100vh; overflow: hidden;`).
* **Content Container:** `.slide-content` is the **permanent layout master**:
  ```css
  .slide-content {
    width: 100%;
    max-width: 1220px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  ```
* **Slide Transitions:** Morphing opacity and scale (`transition: opacity 0.28s ease, transform 0.28s ease;`).
* **Trainer Notes Isolation:** Presenter notes are embedded in `<aside class="trainer-notes">` on each slide for DOM extraction into the Notes Drawer, but **must be strictly hidden on the visual presentation stage**:
  ```css
  .slide aside.trainer-notes,
  aside.trainer-notes,
  .trainer-notes {
    display: none !important;
  }
  ```
* **Responsive Fluid Typography:** Scaled systematically using `rem` units for ultra-crisp legibility from a classroom projector to a 14-inch laptop.
* **Atmospheric Aurora & Tech Dot Matrix Background:** Rather than a flat, dull dark screen, the stage container must use multi-stop atmospheric radial auroras, floating luminous glow orbs (`::before` / `::after`), and an architectural tech dot-matrix pattern:
  ```css
  .presentation-container {
    background-color: #060911;
    background-image: 
      radial-gradient(rgba(255, 255, 255, 0.08) 1.2px, transparent 1.2px),
      radial-gradient(ellipse 65% 50% at 20% 12%, rgba(147, 51, 234, 0.26) 0%, transparent 65%),
      radial-gradient(ellipse 60% 45% at 85% 18%, rgba(14, 116, 204, 0.22) 0%, transparent 60%),
      radial-gradient(ellipse 55% 40% at 50% 95%, rgba(16, 124, 65, 0.16) 0%, transparent 65%),
      linear-gradient(180deg, #090d18 0%, #05070d 100%);
    background-size: 32px 32px, 100% 100%, 100% 100%, 100% 100%, 100% 100%;
  }
  ```
* **Universal Glassmorphism for Cards:** All cards must feature `backdrop-filter: blur(16px);` with subtle top-highlight specular border (`inset 0 1px 0 rgba(255, 255, 255, 0.1)`).

### 3.2 Microsoft Fluent 2 Dark Design Tokens
Every lesson stylesheet (`styles.css`) must utilize these standard CSS variables:

```css
:root {
  /* Surfaces & Canvas */
  --bg-canvas: #060911;
  --bg-stage: rgba(13, 18, 30, 0.85);
  --bg-surface: rgba(17, 24, 42, 0.78);
  --bg-card: rgba(21, 29, 52, 0.72);
  --bg-card-hover: rgba(31, 42, 74, 0.88);
  
  --border-subtle: rgba(255, 255, 255, 0.1);
  --border-strong: rgba(255, 255, 255, 0.22);
  --border-glow: rgba(192, 132, 252, 0.5);

  /* Fluent 2 Brand & Accent Palette */
  --fluent-blue: #0078d4;
  --fluent-blue-light: #38bdf8;
  --fluent-teal: #008272;
  --fluent-teal-light: #2dd4bf;
  --fluent-purple: #742774;
  --fluent-purple-light: #c084fc;
  --fluent-green: #107c10;
  --fluent-green-light: #4ade80;
  --fluent-yellow: #f59e0b;
  --fluent-yellow-light: #fde047;
  --fluent-red: #ef4444;
  --fluent-red-light: #fb7185;

  /* High-Contrast Pedagogical Palette */
  --text-pure: #ffffff;
  --text-primary: #f8fafc;          /* High-luminance ice white */
  --text-secondary: #e2e8f0;        /* Clear reading body */
  --text-muted: #94a3b8;            /* Descriptive metadata */
  --text-dim: #64748b;

  --color-problem: #fb7185;         /* Coral rose for pain & errors */
  --color-input: #38bdf8;           /* Sky blue for data & user actions */
  --color-process: #fde047;         /* Warm amber for logic & formulas */
  --color-output: #4ade80;          /* Emerald mint for success & actions */
  --color-lilac-accent: #c084fc;    /* Lilac for architecture & concepts */
  
  /* Logic Branch Colors */
  --branch-true: #4ade80;           /* Emerald True branch */
  --branch-false: #fb7185;          /* Coral False branch */
}
```

### 3.3 Semantic Class Parity & Fallback Protection
* **100% Class Name Parity:** Class names in `index.html` must match `styles.css` and `script.js` exactly.
* **Structural Fallback Protection:** Every stylesheet must include fallback aliases (e.g., mapping `.spiral-journey-map`, `.journey-nodes`, `.retrieval-grid`, etc. to standard grid tokens) so that no element can ever render without CSS styling.

### 3.4 Presenter Focus Laser Pointer & Click Wave Ripple
Every presentation deck must include an interactive Presenter Focus Laser Pointer to keep students actively engaged and focused during live instruction:
1. **Luminous Optical Laser Follower:** A high-visibility coral/neon laser dot (`#ff2a6d`) with a breathing focus halo that smoothly tracks mouse coordinates using 60fps `requestAnimationFrame` lerp physics.
2. **Expanding Click Shockwave Ripple:** Whenever the instructor clicks on any card, code formula, or table cell, an expanding animated ripple radiates outward from the exact click coordinate to instantly anchor student gaze.
3. **Ergonomic Toggle Controls:** Can be toggled on/off instantly via keyboard shortcut **`P`** or by clicking the laser target icon (`#laser-toggle-btn`) in the header toolbar.

---

## 🇰🇭 4. Bilingual Engine & Khmer Typography Standards

To serve bilingual learners, every presentation must support instantaneous, zero-latency toggling between **English** and **Khmer (ភាសាខ្មែរ)**.

### 4.1 Non-Destructive In-DOM Translation Engine
* **The Cardinal Rule:** **NEVER replace `slide.innerHTML`.**  
  Replacing `slide.innerHTML` destroys the parent `<div class="slide-content">` wrapper, blowing away flex geometries, padding, and layout bounds.
* **The Correct Swapping Pattern:**
  ```javascript
  // Swapping to Khmer:
  const contentEl = slide.querySelector('.slide-content');
  if (contentEl && khData.content) {
    contentEl.innerHTML = khData.content;
  }

  // Swapping back to English:
  if (contentEl && enData.content) {
    contentEl.innerHTML = enData.content;
  }
  ```

### 4.2 Exact 1-to-1 DOM Hierarchy Mirroring
* Every slide entry in `KHMER_SLIDES` must mirror the **exact same HTML tags, grid classes, and element hierarchy** as `index.html`.
* When toggling language, **zero elements change position, zero layouts shift, and zero buttons move**. Only the text content translates gracefully into natural, idiomatic Khmer.

### 4.3 Khmer Typography & Legibility Standards (Famous, Loved & Highly Readable Fonts)
1. **Curated Household Khmer Font Stacks:**
   * **Prestigious Formal Titles & Hero Banners:**
     ```css
     --font-khmer-title: 'Moul', 'Khmer OS Muol Light', 'Khmer OS Muol', 'Siemreap', serif;
     ```
     *`Moul` (Khmer OS Muol) provides the classic, traditional, authentic Cambodian header look used on national announcements, certificates, and books.*
   * **Slide Headings & Section Dividers:**
     ```css
     --font-khmer-heading: 'Siemreap', 'Khmer OS Siemreap', 'Battambang', 'Khmer OS Battambang', sans-serif;
     ```
     *Bold `Siemreap` / `Battambang` provides immediate recognition, authority, and comfortable reading without jarring modern distortions.*
   * **Body Copy, Lists, Explanations & UI Elements:**
     ```css
     --font-khmer-body: 'Siemreap', 'Khmer OS Siemreap', 'Battambang', 'Khmer OS Battambang', 'Noto Sans Khmer', sans-serif;
     ```
     *`Siemreap` is the #1 household reading font in Cambodia. Its authentic, well-proportioned traditional round loops (ក្បាលអក្សរ) completely eliminate letter confusion (e.g., between ឃ and យ, or ដ and ត) and prevent eye strain.*
2. **Khmer Glyphic Sizing & Breathing Line-Height:**
   * Because Khmer script features sub-consonants (ជើង) and stacked upper/lower vowel marks (e.g., ើ, ឺ, ំ, ្ក), base font size in `body.khmer-mode` is scaled up to `16px` (from English 15px).
   * **Hero Titles (`h1`, `.hero-title`):** `font-family: var(--font-khmer-title); line-height: 1.65; font-size: 2.15rem;`.
   * **Headings (`h2`, `.slide-header h2`):** `font-family: var(--font-khmer-heading); font-weight: 700; line-height: 1.6; font-size: 1.65rem;`.
   * **Body copy (`p`, `li`, `td`, `th`):** `font-family: var(--font-khmer-body); line-height: 1.88; font-weight: 400; font-size: 1.02rem; color: #f8fafc;`.
   * **UI Badges, Buttons, Tags:** `font-family: var(--font-khmer-body); line-height: 1.6; font-weight: 600; font-size: 0.96rem;`.
   * **Quiz Options:** `padding: 12px 18px; font-size: 1.02rem; line-height: 1.78;`.
3. **Crucial Monospace Safeguard:**
   * Code blocks, formulas, numbers, timers, and formula displays must preserve monospace:
     ```css
     body.khmer-mode code,
     body.khmer-mode pre,
     body.khmer-mode .powerfx-live-inspector code,
     body.khmer-mode .code-box code,
     body.khmer-mode .fx-large-display,
     body.khmer-mode .timer-display,
     body.khmer-mode .time-stamp,
     body.khmer-mode .slide-counter-badge,
     body.khmer-mode .stat-number {
       font-family: 'Consolas', 'Cascadia Code', 'Fira Code', monospace !important;
       line-height: 1.5;
     }
     ```

---

## 🎮 5. Standard Interactive Widgets Specification

Every 90-minute deck must contain 4 standardized interactive pedagogical widgets:

### 5.1 Slide 12: Interactive Decision Workbench
* **Objective:** Give learners a physical, sensory understanding of how input changes dynamically alter application state.
* **Required Controls:**
  * Live numerical slider or stepped input (e.g., `#wb-hours-slider`).
  * Real-time text input (e.g., `#wb-op-input`) demonstrating validation.
  * Interactive toggle pill button (e.g., `#wb-hazard-btn`).
* **Reactive Outputs:**
  * Mutually exclusive visual result card (`.decision-result-card`) switching between cool blue/green (Routine/False) and flashing radiant red (Critical/True).
  * Safety interlock demonstration (`btnSubmit.DisplayMode = If(IsBlank(Name), Disabled, Edit)`).

### 5.2 Slide 18: Multi-Scenario Practice Simulator
* **Objective:** Fast-paced guided practice testing immediate logical execution paths.
* **Specification:**
  * Grid of 6 realistic factory operational scenarios (`.evaluator-grid-container`).
  * Each card has live condition text, live data value, and two choice buttons (`data-choice="path-a"` vs `data-choice="path-b"`).
  * Real-time visual feedback (green for correct, red for incorrect with pedagogical explanation).
  * Live score counter (`#sim-score`) tracking progress up to 6 / 6.

### 5.3 Slide 20: 5-Question Evaluative Knowledge Check (Quiz)
* **Objective:** Active retrieval and formative assessment testing deep conceptual understanding.
* **Specification:**
  * Interactive card with Question Counter (`#quiz-question-counter`) and Live Score (`#quiz-score-display`).
  * 4 options per question with single-select locking.
  * Immediate feedback card explaining *why* the chosen option is correct or incorrect.
  * Next / Previous question navigation buttons.

### 5.4 Slides 21–22: Capstone Challenge & 4-Level Evaluation Rubric
* **Objective:** Independent synthesis translating real workplace rules into production Power Fx code.
* **Specification:**
  * Structured challenge specification table (8 operational rules).
  * Collapsible Solution Drawer (`#btn-reveal-solution` toggles `#solution-content.collapsed`).
  * **Standard 4-Level Evaluation Rubric:**
    * **Level 4: Mastery (100%):** Flawless syntax, exact arguments, perfect punctuation.
    * **Level 3: Proficient (75–99%):** Core logic correct; minor property name typo.
    * **Level 2: Developing (50–74%):** Missing fallback branch; confused condition with action.
    * **Level 1: Novice (<50%):** Unable to construct required syntax; treated logic as linear commands.

---

## 🌉 6. Forward Bridge & Next-Lesson Knowledge Architecture Protocol

To maintain the connected integrity of the 27-day course, **every single lesson plan (`LESSON_PLAN.md`) must conclude with a deep, exhaustive knowledge architecture section preparing for the next lesson.**

### 6.1 The Next-Lesson Knowledge Blueprint Requirements
When authoring the forward bridge for *any* upcoming lesson (such as Day 6: `AND` / `OR` Gates, Day 7: Business Wireframing, etc.), the lesson plan must include:
1. **The Mental Model Progression Diagram:** Visually contrasting today's model against the new capability required tomorrow.
2. **Technical Grammar & Formal Truth Tables:** Exhaustive reference tables showing every combination of inputs and outputs.
3. **Power Fx Syntax Specification:** Showing modern standard syntax, legacy alternatives, and best-practice formatting.
4. **Short-Circuit / Execution Mechanics:** Explaining the underlying engine behavior (e.g., short-circuit evaluation, delegation limits, variable scoping).
5. **The 3 Critical Beginner Pitfalls to Preemptively Anticipate:** Identifying exact syntax errors, human-language misinterpretations, and bad mental models.
6. **Trainer Readiness Checklist & Diagnostic Starter:** Exact questions and physical classroom props for the trainer to use when opening the next morning's lesson.

---

## ✅ 7. Pre-Flight Quality Assurance Audit Checklist

Before any lesson presentation deck (`index.html`, `styles.css`, `script.js`) or curriculum guide (`LESSON_PLAN.md`) is approved for production delivery, it must pass this 12-point audit:

| # | Audit Item | Verification Criteria |
| :-: | :--- | :--- |
| 1 | **Total Duration Check** | Timed agenda totals exactly **90 minutes** (00:00 – 90:00). |
| 2 | **Connection Chain Verified** | Prior lesson, today's anchor, and forward bridge explicitly documented. |
| 3 | **Measurable Objectives** | 3 to 4 objectives written with actionable Bloom's Taxonomy verbs. |
| 4 | **Dual-Case Anchors Present** | Everyday physical analogy + realistic manufacturing failure case included. |
| 5 | **16:9 Viewport Stage** | Zero horizontal scrollbars; layout constrained within 16:9 geometry. |
| 6 | **CSS Class Parity** | 100% of HTML classes exist in `styles.css` with zero unstyled tags. |
| 7 | **Bilingual Non-Destruction** | Language switcher updates `.slide-content` only; `.slide-content` wrapper preserved. |
| 8 | **1:1 Khmer Mirroring** | Khmer slide templates match English DOM tags and classes 1:1; zero layout shift. |
| 9 | **Khmer Typography Quality** | Kantumruy Pro rendered cleanly; line-heights balanced; code monospace protected. |
| 10 | **Interactive Widgets Bound** | Workbench slider, 6-scenario simulator, 5-question quiz, and solution toggle work. |
| 11 | **Zero Console Errors** | JavaScript executes cleanly in Microsoft Edge / Chrome with zero uncaught errors. |
| 12 | **Next-Lesson Knowledge Section** | `LESSON_PLAN.md` contains comprehensive deep-dive architecture for the next day. |

---

## 📂 8. Standard Directory & File Organization

For every module in the 27-day series, the repository maintains this uniform structure:

```
PowerApp Beginner/
│
├── GLOBAL_CURRICULUM_BLUEPRINT.md    <-- THIS MASTER SPECIFICATION FILE
├── LESSON_PLAN.md                    <-- Master high-level curriculum outline
│
├── day1-presentation/                <-- Day 1: Computer & Application Basics
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── day2-presentation/                <-- Day 2: Instructions & Sequence
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── day3-presentation/                <-- Day 3: Data & Storage Types
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── day4-presentation/                <-- Day 4: Questions, Conditions, True/False
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── LESSON_PLAN.md
│
├── day5-presentation/                <-- Day 5: Decisions: IF / THEN / ELSE
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── LESSON_PLAN.md
│
└── day6-presentation/                <-- Day 6: Multi-Condition Gates: AND / OR (Next)
    ├── index.html
    ├── styles.css
    ├── script.js
    └── LESSON_PLAN.md
```

---
*End of Global Curriculum Blueprint • Microsoft Power Apps Beginner Program*

