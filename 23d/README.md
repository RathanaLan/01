# PlanCraft 3D Studio - Universal 2D/File to 3D Converter & Animator

Convert architectural floor plans from **PDF, PowerPoint (PPTX), SketchUp (SKP/3D), AutoCAD (DXF), SVG, Images, and JSON** into fully editable interactive 3D WebGL models with real-time editing and cinematic animations.

---

## 🚀 Key Features

### 1. Multi-Format Universal Conversion
- **PDF Blueprints (`.pdf`)**:
  - Uses PDF.js to load multi-page architectural blueprints.
  - Interactive multi-page selector dialog.
  - High-resolution rendering to canvas with opacity slider and real-world scale calibration.
  - **Auto-Detect Walls**: 1-click automatic boundary and wall generation!
- **PowerPoint Presentations (`.pptx`)**:
  - Extracts embedded floor plan diagrams, slide visuals, and blueprints using `JSZip`.
  - Thumbnail picker to select any slide/diagram to convert into a 3D floor plan.
- **SketchUp (`.skp`) & 3D CAD (`.gltf`, `.glb`, `.obj`, `.stl`, `.dxf`, `.svg`)**:
  - Direct drag & drop for `.obj`, `.gltf`, `.glb`, `.stl`, `.dxf`, and `.svg`.
  - Built-in SketchUp guide for 1-click model export into the 3D studio.
  - **AutoCAD DXF parser**: Automatically converts 2D CAD line entities into 3D walls!
  - **SVG Vector parser**: Converts vector line paths into 3D walls!
- **Global Drag & Drop**: Drop any supported file anywhere on the browser window to convert it instantly.

---

### 2. Full Interactive Editing Suite
- **Endpoint Dragging**: Click and drag wall endpoints in 2D to reshape rooms, angles, and floor plans.
- **Element Inspector**:
  - Click any wall to edit its **Height (m)**, **Thickness (m)**, or delete it.
  - Click any furniture item to **rotate**, reposition, or delete.
- **Scale Calibration Tool**:
  - Click two points on any blueprint and enter the known real-world distance (in meters) to calibrate 1:1 real scale.
- **Furniture Catalog**:
  - Modern Sofa, Queen Bed, Dining Table & Chairs, TV Stand, Work Desk, Potted Plants, Bathroom Vanity, and Kitchen Island.
- **Undo / Redo**:
  - Full history stack with <kbd>Ctrl+Z</kbd> (Undo) and <kbd>Ctrl+Y</kbd> (Redo).
- **Customizable Materials**:
  - Flooring: Warm Parquet Wood, Marble Tiles, Polished Concrete, Soft Carpet.
  - Cutaway ceiling vs full enclosure toggle.
  - Day & Night sunlight toggle.

---

### 3. Studio Animations
- **Interactive Door Clicking**: Click any door in the 3D scene to smoothly animate it swinging open (90°) or shut!
- **🏗️ Construction Rise Assembly**: Walls rise from foundation, floor slides into place, and furniture drops in with a subtle bounce.
- **🚁 360° Drone Tour**: Cinematic rotating architectural aerial flyaround.
- **☀️ 24-Hour Sun & Moving Shadows**: Watch the sun traverse the sky with realistic moving shadows, transitioning from morning dawn to golden hour, evening dusk, and night ambiance.
- **🚶 Room-to-Room Camera Tour**: Smooth glide through each designated room in the building.
- **First-Person Walkthrough**: Walk inside rooms at eye height (1.65m) using <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> and mouse look!

---

### 4. Export & Save
- **Export 3D (`.GLB` / `glTF`)**: Standard binary 3D format for Blender, Unity, Unreal Engine, Web, and AR/VR.
- **Export 3D (`.OBJ` mesh)**: Universal Wavefront 3D mesh.
- **Export 2D Blueprint (`.PNG`)**: High-resolution 2D floor plan drawing.
- **Save Project (`.JSON`)**: Save the editable project state to resume work anytime.

---

## 🏃 Quick Start

### 1-Click Launch (Windows):
Double-click `start.bat` in this folder. It will start the server and open your browser automatically.

### Terminal Launch:
```bash
python -m http.server 3000
```
Then open `http://localhost:3000` in your web browser.
