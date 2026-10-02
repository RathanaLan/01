# Microsoft PowerPoint Web Clone (SlideCraft)

A 100% authentic, PowerPoint-inspired slide presentation web application built with **Flask**, **SQLite**, and vanilla **HTML5 / CSS3 / JavaScript**.

---

## What Makes It 100% Like PowerPoint?

### 1. Iconic PowerPoint Header & Fluent Ribbon
- **PowerPoint Red/Orange Title Bar** (`#c43e1c`) with the signature white "P" app tile icon.
- **Quick Access Toolbar**: Save (floppy disk), Undo (`Ctrl+Z`), Redo (`Ctrl+Y`), and Slide Show from Beginning (`F5`).
- **Office Fluent Ribbon Tabs**:
  - **File**: Solid dark-red tab opening the full-screen **PowerPoint Backstage** view (Info, New templates, Save As, Export PDF/JSON).
  - **Home**: Clipboard (Paste, Cut, Copy, Duplicate), Slides (New Slide layout picker, Duplicate, Delete), Font formatting (Calibri, Arial, Segoe UI, Size, B, I, U, Strike, Color, Highlight), Paragraph alignment (Left, Center, Right, Justify, Bullets, Numbers), Drawing & Arrange.
  - **Insert**: Text Box, WordArt, Picture from device, Online Pictures, Shapes gallery, Tables.
  - **Draw**: Freehand drawing tools with Black Pen, Highlighter, and Clear Inks.
  - **Design**: Slide Themes (Office, Midnight Obsidian, Indigo, Emerald, Sunset), Slide Size (16:9 vs 4:3), and Background format.
  - **Transitions**: Slide transitions (None, Fade, Push, Wipe, Zoom) with preview and "Apply to All".
  - **Animations**: Element animations (Appear, Fade In, Fly In, Zoom).
  - **Slide Show**: Start from Beginning (`F5`), From Current Slide (`Shift+F5`).
  - **View**: Normal View, Slide Sorter View, Notes Pane toggle, and Gridlines.

### 2. PowerPoint Slide Layouts Picker
Clicking **New Slide ▾** presents the standard Office layout templates:
1. **Title Slide**: Large centered title + Subtitle placeholder.
2. **Title and Content**: Header line + bulleted content text box.
3. **Section Header**: Bold section break layout.
4. **Two Content**: Header + side-by-side comparison boxes.
5. **Title Only**: Header only.
6. **Blank Slide**: Completely clean canvas.

### 3. Canvas & Rotating Lollipop Handle
- **16:9 Canvas** (`960 x 540` coordinate space) with authentic slide drop-shadow on deep slate background.
- **Dashed Placeholders**: "Click to add title", "Click to add text".
- **8-Point Resize Handles**: Resize along any corner or edge.
- **Circular Rotation Handle (Lollipop Stem)**: Rotates text, shapes, and images to any angle (`0° - 360°`).

### 4. Speaker Notes Pane
- Collapsible bottom drawer: *"Click to add speaker notes for this slide..."*.
- Notes are saved per-slide in the presentation data.

### 5. Office Status Bar
- Bottom gray bar with:
  - `Slide X of Y` • `English (United States)`
  - Notes button (toggles Speaker Notes drawer)
  - View switchers: Normal, Slide Sorter, Slide Show
  - Interactive Zoom Slider with `-` and `+` steppers, zoom percentage, and **Fit to Window** (`⛶`).

### 6. Fullscreen Slide Show Mode with Presenter Tools
- Seamless fullscreen slideshow with slide transitions.
- **Presenter HUD (bottom-left corner)**:
  - Previous / Next slide buttons
  - **Laser Pointer**: Red glowing laser dot following mouse movement (`Ctrl+L`).
  - **Black Screen Toggle**: Press `B` to blank the screen during a presentation.
  - End Show button (`Esc`).

---

## Folder Structure

```text
web-ppt-clone/
├── app.py                # Flask backend & SQLite database operations
├── database.db           # SQLite database (auto-initialized)
├── requirements.txt      # Python dependencies
├── README.md             # Documentation & setup guide
├── static/
│   ├── css/
│   │   ├── style.css     # Global styles, auth, and dashboard UI
│   │   └── editor.css    # 100% PowerPoint Fluent Ribbon, canvas, status bar, and slideshow
│   ├── js/
│   │   └── editor.js     # PowerPoint core engine (layouts, rotate, draw, presenter HUD, autosave)
│   ├── images/           # Static logos and assets
│   └── uploads/          # User-uploaded slide image storage
└── templates/
    ├── base.html         # Base HTML layout
    ├── login.html        # User login
    ├── register.html     # User registration
    ├── dashboard.html    # Deck management dashboard
    └── editor.html       # Full PowerPoint interface with Ribbon, Notes, and Backstage
```

---

## How to Run Locally

```bash
cd web-ppt-clone
pip install -r requirements.txt
python app.py
```
Open **`http://127.0.0.1:5000`** in any browser.
