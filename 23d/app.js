import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

/**
 * PlanCraft 3D Studio - Universal Converter, Editor & Animator
 */

// Initialize PDF.js worker
if (window.pdfjsLib) {
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = './node_modules/pdfjs-dist/build/pdf.worker.min.js';
}

// --- App State ---
const state = {
  scale: 45, // pixels per meter
  panOffset: { x: 300, y: 250 },
  isPanning: false,
  startPan: { x: 0, y: 0 },
  activeTool: 'select',
  selectedFurnitureType: 'sofa',
  wallHeight: 2.8,
  wallThickness: 0.2,
  showRoof: false,
  isNight: false,
  floorType: 'wood',
  cameraMode: 'orbit',

  // Blueprint background
  blueprintImg: null,
  blueprintOpacity: 0.45,
  blueprintName: '',

  // Entities
  walls: [],
  doors: [],
  windows: [],
  furniture: [],
  rooms: [],
  imported3DModels: [],

  // Interaction
  wallStartPoint: null,
  mousePosMeters: { x: 0, y: 0 },
  selectedElement: null,
  draggingPoint: null, // { wall, pointKey: 'p1' | 'p2' }
  calibratingScale: false,
  calibPoints: [],

  // History (Undo / Redo)
  undoStack: [],
  redoStack: [],

  // Animations
  activeAnimation: null, // 'turntable', 'sun', 'rise', 'tour'
  animTime: 0,
  interactiveDoors: [] // 3D door objects for click-to-open
};

// --- Presets ---
const PRESETS = {
  apartment: {
    walls: [
      { id: 'w1', p1: { x: -6, y: -4 }, p2: { x: 6, y: -4 }, height: 2.8, thickness: 0.2 },
      { id: 'w2', p1: { x: 6, y: -4 }, p2: { x: 6, y: 4.5 }, height: 2.8, thickness: 0.2 },
      { id: 'w3', p1: { x: 6, y: 4.5 }, p2: { x: -6, y: 4.5 }, height: 2.8, thickness: 0.2 },
      { id: 'w4', p1: { x: -6, y: 4.5 }, p2: { x: -6, y: -4 }, height: 2.8, thickness: 0.2 },
      { id: 'w5', p1: { x: 0, y: -4 }, p2: { x: 0, y: 1.5 }, height: 2.8, thickness: 0.15 },
      { id: 'w6', p1: { x: 0, y: 1.5 }, p2: { x: -6, y: 1.5 }, height: 2.8, thickness: 0.15 },
      { id: 'w7', p1: { x: 1.8, y: -4 }, p2: { x: 1.8, y: -1 }, height: 2.8, thickness: 0.15 },
      { id: 'w8', p1: { x: 0, y: -1 }, p2: { x: 1.8, y: -1 }, height: 2.8, thickness: 0.15 },
      { id: 'w9', p1: { x: 2.2, y: 1.5 }, p2: { x: 6, y: 1.5 }, height: 2.8, thickness: 0.15 }
    ],
    doors: [
      { id: 'd1', wallId: 'w4', offset: 4.5, width: 0.9, height: 2.1, isOpen: false },
      { id: 'd2', wallId: 'w6', offset: 4.2, width: 0.85, height: 2.1, isOpen: false },
      { id: 'd3', wallId: 'w8', offset: 0.9, width: 0.75, height: 2.1, isOpen: false },
      { id: 'd4', wallId: 'w9', offset: 1.8, width: 0.85, height: 2.1, isOpen: false }
    ],
    windows: [
      { id: 'win1', wallId: 'w1', offset: 4.0, width: 2.0, height: 1.4, elevation: 0.9 },
      { id: 'win2', wallId: 'w2', offset: 4.2, width: 2.5, height: 1.8, elevation: 0.5 },
      { id: 'win3', wallId: 'w3', offset: 3.0, width: 1.8, height: 1.4, elevation: 0.9 },
      { id: 'win4', wallId: 'w3', offset: 9.0, width: 1.8, height: 1.4, elevation: 0.9 }
    ],
    furniture: [
      { id: 'f1', type: 'bed', x: 3.8, y: -2.4, rot: 0 },
      { id: 'f2', type: 'sofa', x: -3.2, y: -2.0, rot: Math.PI / 2 },
      { id: 'f3', type: 'table', x: -2.8, y: 3.0, rot: 0 },
      { id: 'f4', type: 'tv', x: -5.6, y: -2.0, rot: Math.PI / 2 },
      { id: 'f5', type: 'plant', x: -5.4, y: 0.8, rot: 0 },
      { id: 'f6', type: 'plant', x: 5.4, y: 4.0, rot: 0 },
      { id: 'f7', type: 'bed', x: 4.0, y: 3.0, rot: Math.PI }
    ],
    rooms: [
      { name: 'Living Room', x: -3.0, y: -1.2 },
      { name: 'Dining & Kitchen', x: -3.0, y: 3.0 },
      { name: 'Master Bedroom', x: 3.8, y: -2.6 },
      { name: 'En-Suite Bath', x: 0.9, y: -2.5 },
      { name: 'Guest Bedroom', x: 4.1, y: 3.0 }
    ]
  },
  studio: {
    walls: [
      { id: 'w1', p1: { x: -4.5, y: -3.5 }, p2: { x: 4.5, y: -3.5 }, height: 2.8, thickness: 0.2 },
      { id: 'w2', p1: { x: 4.5, y: -3.5 }, p2: { x: 4.5, y: 3.5 }, height: 2.8, thickness: 0.2 },
      { id: 'w3', p1: { x: 4.5, y: 3.5 }, p2: { x: -4.5, y: 3.5 }, height: 2.8, thickness: 0.2 },
      { id: 'w4', p1: { x: -4.5, y: 3.5 }, p2: { x: -4.5, y: -3.5 }, height: 2.8, thickness: 0.2 },
      { id: 'w5', p1: { x: 1.5, y: 0.5 }, p2: { x: 4.5, y: 0.5 }, height: 2.8, thickness: 0.15 },
      { id: 'w6', p1: { x: 1.5, y: 0.5 }, p2: { x: 1.5, y: 3.5 }, height: 2.8, thickness: 0.15 }
    ],
    doors: [
      { id: 'd1', wallId: 'w4', offset: 3.5, width: 0.9, height: 2.1, isOpen: false },
      { id: 'd2', wallId: 'w5', offset: 1.5, width: 0.8, height: 2.1, isOpen: false }
    ],
    windows: [
      { id: 'win1', wallId: 'w1', offset: 4.5, width: 3.2, height: 1.8, elevation: 0.5 },
      { id: 'win2', wallId: 'w2', offset: 2.0, width: 1.8, height: 1.4, elevation: 0.9 }
    ],
    furniture: [
      { id: 'f1', type: 'bed', x: -2.8, y: 2.0, rot: 0 },
      { id: 'f2', type: 'sofa', x: -1.5, y: -1.5, rot: 0 },
      { id: 'f3', type: 'table', x: 2.5, y: -2.0, rot: 0 },
      { id: 'f4', type: 'plant', x: -4.0, y: -3.0, rot: 0 }
    ],
    rooms: [
      { name: 'Loft Studio', x: -1.0, y: 0.5 },
      { name: 'Bathroom', x: 3.0, y: 2.0 }
    ]
  },
  villa: {
    walls: [
      { id: 'w1', p1: { x: -7, y: -5 }, p2: { x: 7, y: -5 }, height: 3.0, thickness: 0.25 },
      { id: 'w2', p1: { x: 7, y: -5 }, p2: { x: 7, y: 5 }, height: 3.0, thickness: 0.25 },
      { id: 'w3', p1: { x: 7, y: 5 }, p2: { x: -7, y: 5 }, height: 3.0, thickness: 0.25 },
      { id: 'w4', p1: { x: -7, y: 5 }, p2: { x: -7, y: -5 }, height: 3.0, thickness: 0.25 },
      { id: 'w5', p1: { x: -1, y: -5 }, p2: { x: -1, y: 5 }, height: 3.0, thickness: 0.18 },
      { id: 'w6', p1: { x: -7, y: 0 }, p2: { x: -1, y: 0 }, height: 3.0, thickness: 0.18 },
      { id: 'w7', p1: { x: -1, y: 0 }, p2: { x: 3, y: 0 }, height: 3.0, thickness: 0.18 }
    ],
    doors: [
      { id: 'd1', wallId: 'w4', offset: 2.5, width: 1.0, height: 2.2, isOpen: false },
      { id: 'd2', wallId: 'w6', offset: 3.0, width: 0.85, height: 2.1, isOpen: false },
      { id: 'd3', wallId: 'w5', offset: 2.5, width: 0.85, height: 2.1, isOpen: false }
    ],
    windows: [
      { id: 'win1', wallId: 'w1', offset: 3.5, width: 2.5, height: 1.6, elevation: 0.8 },
      { id: 'win2', wallId: 'w2', offset: 5.0, width: 3.5, height: 2.0, elevation: 0.4 },
      { id: 'win3', wallId: 'w3', offset: 3.5, width: 2.5, height: 1.6, elevation: 0.8 }
    ],
    furniture: [
      { id: 'f1', type: 'sofa', x: 3.0, y: 2.5, rot: 0 },
      { id: 'f2', type: 'table', x: 3.0, y: -2.5, rot: 0 },
      { id: 'f3', type: 'bed', x: -4.0, y: 2.5, rot: 0 },
      { id: 'f4', type: 'bed', x: -4.0, y: -2.5, rot: 0 },
      { id: 'f5', type: 'plant', x: 6.2, y: 4.2, rot: 0 }
    ],
    rooms: [
      { name: 'Grand Living Room', x: 3.0, y: 2.5 },
      { name: 'Dining Hall', x: 3.0, y: -2.5 },
      { name: 'Master Suite', x: -4.0, y: 2.5 },
      { name: 'Guest Suite', x: -4.0, y: -2.5 }
    ]
  },
  empty: {
    walls: [],
    doors: [],
    windows: [],
    furniture: [],
    rooms: []
  }
};

// --- Math & Geometry Utilities ---
function snapToGrid(val, step = 0.25) {
  return Math.round(val / step) * step;
}

function dist(p1, p2) {
  return Math.hypot(p2.x - p1.x, p2.y - p1.y);
}

function pointToSegmentDistance(p, a, b) {
  const l2 = (b.x - a.x) ** 2 + (b.y - a.y) ** 2;
  if (l2 === 0) return { distance: dist(p, a), t: 0 };
  let t = ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  const proj = { x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) };
  return { distance: dist(p, proj), t: t * Math.sqrt(l2), proj };
}

// History snapshots
function pushHistory() {
  state.undoStack.push(JSON.stringify({
    walls: state.walls,
    doors: state.doors,
    windows: state.windows,
    furniture: state.furniture,
    rooms: state.rooms
  }));
  if (state.undoStack.length > 30) state.undoStack.shift();
  state.redoStack = [];
}

function undo() {
  if (state.undoStack.length === 0) return;
  const current = JSON.stringify({
    walls: state.walls,
    doors: state.doors,
    windows: state.windows,
    furniture: state.furniture,
    rooms: state.rooms
  });
  state.redoStack.push(current);
  const prev = JSON.parse(state.undoStack.pop());
  state.walls = prev.walls;
  state.doors = prev.doors;
  state.windows = prev.windows;
  state.furniture = prev.furniture;
  state.rooms = prev.rooms;
  rebuild3DScene();
  if (canvas2D) canvas2D.render();
  updateInspector();
}

function redo() {
  if (state.redoStack.length === 0) return;
  const current = JSON.stringify({
    walls: state.walls,
    doors: state.doors,
    windows: state.windows,
    furniture: state.furniture,
    rooms: state.rooms
  });
  state.undoStack.push(current);
  const next = JSON.parse(state.redoStack.pop());
  state.walls = next.walls;
  state.doors = next.doors;
  state.windows = next.windows;
  state.furniture = next.furniture;
  state.rooms = next.rooms;
  rebuild3DScene();
  if (canvas2D) canvas2D.render();
  updateInspector();
}

// ==========================================
// 2D CANVAS CONTROLLER & VECTOR EDITOR
// ==========================================
let canvas2D = null;

class Canvas2D {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.setupListeners();
    this.resize();
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
    this.render();
  }

  screenToWorld(sx, sy) {
    return {
      x: (sx - state.panOffset.x) / state.scale,
      y: (sy - state.panOffset.y) / state.scale
    };
  }

  worldToScreen(wx, wy) {
    return {
      x: wx * state.scale + state.panOffset.x,
      y: wy * state.scale + state.panOffset.y
    };
  }

  setupListeners() {
    window.addEventListener('resize', () => this.resize());

    this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
    this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
    this.canvas.addEventListener('mouseup', (e) => this.onMouseUp(e));
    this.canvas.addEventListener('wheel', (e) => this.onWheel(e), { passive: false });
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  onMouseDown(e) {
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      state.isPanning = true;
      state.startPan = { x: e.clientX - state.panOffset.x, y: e.clientY - state.panOffset.y };
      return;
    }

    const mouseWorld = this.screenToWorld(e.offsetX, e.offsetY);
    const snappedWorld = {
      x: snapToGrid(mouseWorld.x),
      y: snapToGrid(mouseWorld.y)
    };

    // Calibration Mode
    if (state.calibratingScale) {
      state.calibPoints.push({ ...mouseWorld });
      if (state.calibPoints.length === 2) {
        document.getElementById('scale-modal').classList.remove('hidden');
        state.calibratingScale = false;
      }
      this.render();
      return;
    }

    // Select Tool
    if (state.activeTool === 'select') {
      // Check endpoint drag handles
      for (const wall of state.walls) {
        if (dist(mouseWorld, wall.p1) < 0.4) {
          pushHistory();
          state.draggingPoint = { wall, pointKey: 'p1' };
          state.selectedElement = { type: 'wall', item: wall };
          updateInspector();
          this.render();
          return;
        }
        if (dist(mouseWorld, wall.p2) < 0.4) {
          pushHistory();
          state.draggingPoint = { wall, pointKey: 'p2' };
          state.selectedElement = { type: 'wall', item: wall };
          updateInspector();
          this.render();
          return;
        }
      }

      // Check wall selection
      const nearest = this.getNearestWall(mouseWorld);
      if (nearest && nearest.distance < 0.4) {
        state.selectedElement = { type: 'wall', item: nearest.wall };
        updateInspector();
        this.render();
        return;
      }

      // Check furniture selection
      for (const f of state.furniture) {
        if (dist(mouseWorld, { x: f.x, y: f.y }) < 1.0) {
          state.selectedElement = { type: 'furniture', item: f };
          updateInspector();
          this.render();
          return;
        }
      }

      // Deselect
      state.selectedElement = null;
      updateInspector();
      this.render();
      return;
    }

    // Wall Tool
    if (state.activeTool === 'wall') {
      if (!state.wallStartPoint) {
        state.wallStartPoint = snappedWorld;
      } else {
        const d = dist(state.wallStartPoint, snappedWorld);
        if (d > 0.4) {
          pushHistory();
          const newWall = {
            id: 'w_' + Date.now(),
            p1: { ...state.wallStartPoint },
            p2: { ...snappedWorld },
            height: state.wallHeight,
            thickness: state.wallThickness
          };
          state.walls.push(newWall);
          rebuild3DScene();
        }
        state.wallStartPoint = snappedWorld;
      }
      this.render();
    }

    // Door & Window Tool
    if (state.activeTool === 'door' || state.activeTool === 'window') {
      const nearest = this.getNearestWall(mouseWorld);
      if (nearest && nearest.distance < 0.6) {
        pushHistory();
        if (state.activeTool === 'door') {
          state.doors.push({
            id: 'd_' + Date.now(),
            wallId: nearest.wall.id,
            offset: nearest.t,
            width: 0.9,
            height: 2.1,
            isOpen: false
          });
        } else {
          state.windows.push({
            id: 'win_' + Date.now(),
            wallId: nearest.wall.id,
            offset: nearest.t,
            width: 1.8,
            height: 1.4,
            elevation: 0.9
          });
        }
        rebuild3DScene();
        this.render();
      }
    }

    // Furniture Tool
    if (state.activeTool === 'furniture') {
      pushHistory();
      state.furniture.push({
        id: 'f_' + Date.now(),
        type: state.selectedFurnitureType,
        x: snappedWorld.x,
        y: snappedWorld.y,
        rot: 0
      });
      rebuild3DScene();
      this.render();
    }
  }

  onMouseMove(e) {
    if (state.isPanning) {
      state.panOffset.x = e.clientX - state.startPan.x;
      state.panOffset.y = e.clientY - state.startPan.y;
      this.render();
      return;
    }

    const mouseWorld = this.screenToWorld(e.offsetX, e.offsetY);
    state.mousePosMeters = {
      x: snapToGrid(mouseWorld.x),
      y: snapToGrid(mouseWorld.y)
    };

    if (state.draggingPoint) {
      state.draggingPoint.wall[state.draggingPoint.pointKey] = { ...state.mousePosMeters };
      rebuild3DScene();
    }

    this.render();
  }

  onMouseUp(e) {
    state.isPanning = false;
    if (state.draggingPoint) {
      state.draggingPoint = null;
      rebuild3DScene();
      updateInspector();
    }
  }

  onWheel(e) {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.12 : 0.88;
    const oldScale = state.scale;
    const newScale = Math.max(8, Math.min(180, oldScale * zoomFactor));

    const mouseX = e.offsetX;
    const mouseY = e.offsetY;
    state.panOffset.x = mouseX - (mouseX - state.panOffset.x) * (newScale / oldScale);
    state.panOffset.y = mouseY - (mouseY - state.panOffset.y) * (newScale / oldScale);
    state.scale = newScale;
    this.render();
  }

  getNearestWall(p) {
    let nearest = null;
    let minD = Infinity;
    for (const w of state.walls) {
      const res = pointToSegmentDistance(p, w.p1, w.p2);
      if (res.distance < minD) {
        minD = res.distance;
        nearest = { wall: w, distance: res.distance, t: res.t, proj: res.proj };
      }
    }
    return nearest;
  }

  render() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Grid
    this.drawGrid(ctx, w, h);

    // Background Blueprint Image (from PDF, PPTX, or Image upload)
    if (state.blueprintImg) {
      ctx.save();
      ctx.globalAlpha = state.blueprintOpacity;
      const origin = this.worldToScreen(-12, -9);
      const imgW = 24 * state.scale;
      const imgH = (24 * state.scale) * (state.blueprintImg.height / state.blueprintImg.width);
      ctx.drawImage(state.blueprintImg, origin.x, origin.y, imgW, imgH);
      ctx.restore();
    }

    // Room Labels
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#64748b';
    for (const r of state.rooms) {
      const p = this.worldToScreen(r.x, r.y);
      ctx.fillText(r.name.toUpperCase(), p.x, p.y);
    }

    // Walls
    for (const wall of state.walls) {
      const p1 = this.worldToScreen(wall.p1.x, wall.p1.y);
      const p2 = this.worldToScreen(wall.p2.x, wall.p2.y);
      const wallPx = Math.max(4, (wall.thickness || state.wallThickness) * state.scale);

      const isSelected = state.selectedElement && state.selectedElement.item === wall;

      // Solid Wall
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = isSelected ? '#38bdf8' : '#f1f5f9';
      ctx.lineWidth = wallPx;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Centerline
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = isSelected ? '#0284c7' : '#94a3b8';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Dimension Label
      const wallLen = dist(wall.p1, wall.p2);
      const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
      ctx.fillStyle = isSelected ? '#38bdf8' : '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText(`${wallLen.toFixed(2)}m`, mid.x, mid.y - 10);

      // Endpoint drag handles if selected
      if (isSelected || state.activeTool === 'select') {
        [p1, p2].forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#38bdf8';
          ctx.fill();
          ctx.strokeStyle = '#082f49';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        });
      }
    }

    // Doors & Windows
    for (const d of state.doors) {
      const wall = state.walls.find(w => w.id === d.wallId);
      if (!wall) continue;
      const angle = Math.atan2(wall.p2.y - wall.p1.y, wall.p2.x - wall.p1.x);
      const wallLen = dist(wall.p1, wall.p2);
      const ratio = Math.min(1, Math.max(0, d.offset / wallLen));
      const pos = {
        x: wall.p1.x + (wall.p2.x - wall.p1.x) * ratio,
        y: wall.p1.y + (wall.p2.y - wall.p1.y) * ratio
      };
      const sp = this.worldToScreen(pos.x, pos.y);

      ctx.save();
      ctx.translate(sp.x, sp.y);
      ctx.rotate(angle);
      const dwPx = d.width * state.scale;
      ctx.beginPath();
      ctx.arc(-dwPx / 2, 0, dwPx, 0, Math.PI / 2);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-dwPx / 2, 0);
      ctx.lineTo(-dwPx / 2, dwPx);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.restore();
    }

    for (const win of state.windows) {
      const wall = state.walls.find(w => w.id === win.wallId);
      if (!wall) continue;
      const angle = Math.atan2(wall.p2.y - wall.p1.y, wall.p2.x - wall.p1.x);
      const wallLen = dist(wall.p1, wall.p2);
      const ratio = Math.min(1, Math.max(0, win.offset / wallLen));
      const pos = {
        x: wall.p1.x + (wall.p2.x - wall.p1.x) * ratio,
        y: wall.p1.y + (wall.p2.y - wall.p1.y) * ratio
      };
      const sp = this.worldToScreen(pos.x, pos.y);

      ctx.save();
      ctx.translate(sp.x, sp.y);
      ctx.rotate(angle);
      const wwPx = win.width * state.scale;
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(-wwPx / 2, -4, wwPx, 8);
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-wwPx / 2, -4, wwPx, 8);
      ctx.restore();
    }

    // Furniture
    for (const f of state.furniture) {
      const sp = this.worldToScreen(f.x, f.y);
      const isSelected = state.selectedElement && state.selectedElement.item === f;

      ctx.save();
      ctx.translate(sp.x, sp.y);
      ctx.rotate(f.rot);

      if (f.type === 'bed') {
        const bw = 1.8 * state.scale;
        const bh = 2.0 * state.scale;
        ctx.fillStyle = isSelected ? '#38bdf8' : '#334155';
        ctx.fillRect(-bw / 2, -bh / 2, bw, bh);
        ctx.strokeStyle = isSelected ? '#f8fafc' : '#64748b';
        ctx.strokeRect(-bw / 2, -bh / 2, bw, bh);
        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(-bw / 2 + 4, -bh / 2 + 4, bw / 2 - 8, bh * 0.22);
        ctx.fillRect(4, -bh / 2 + 4, bw / 2 - 8, bh * 0.22);
      } else if (f.type === 'sofa') {
        const sw = 2.2 * state.scale;
        const sh = 1.0 * state.scale;
        ctx.fillStyle = isSelected ? '#38bdf8' : '#1e3a8a';
        ctx.fillRect(-sw / 2, -sh / 2, sw, sh);
        ctx.strokeStyle = '#60a5fa';
        ctx.strokeRect(-sw / 2, -sh / 2, sw, sh);
      } else if (f.type === 'table') {
        const tw = 1.6 * state.scale;
        const th = 0.9 * state.scale;
        ctx.fillStyle = '#78350f';
        ctx.fillRect(-tw / 2, -th / 2, tw, th);
        ctx.strokeStyle = '#d97706';
        ctx.strokeRect(-tw / 2, -th / 2, tw, th);
      } else if (f.type === 'plant') {
        ctx.beginPath();
        ctx.arc(0, 0, 0.35 * state.scale, 0, Math.PI * 2);
        ctx.fillStyle = '#15803d';
        ctx.fill();
        ctx.strokeStyle = '#22c55e';
        ctx.stroke();
      } else if (f.type === 'tv') {
        const tw = 1.4 * state.scale;
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(-tw / 2, -4, tw, 8);
        ctx.strokeStyle = '#94a3b8';
        ctx.strokeRect(-tw / 2, -4, tw, 8);
      } else if (f.type === 'bath') {
        const bw = 1.5 * state.scale;
        const bh = 0.8 * state.scale;
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(-bw / 2, -bh / 2, bw, bh);
      } else if (f.type === 'kitchen') {
        const kw = 2.4 * state.scale;
        const kh = 0.8 * state.scale;
        ctx.fillStyle = '#475569';
        ctx.fillRect(-kw / 2, -kh / 2, kw, kh);
        ctx.strokeStyle = '#94a3b8';
        ctx.strokeRect(-kw / 2, -kh / 2, kw, kh);
      }
      ctx.restore();
    }

    // Active tool drawing preview
    if (state.activeTool === 'wall' && state.wallStartPoint) {
      const p1 = this.worldToScreen(state.wallStartPoint.x, state.wallStartPoint.y);
      const p2 = this.worldToScreen(state.mousePosMeters.x, state.mousePosMeters.y);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = Math.max(3, state.wallThickness * state.scale);
      ctx.setLineDash([6, 6]);
      ctx.stroke();
      ctx.setLineDash([]);
      const curLen = dist(state.wallStartPoint, state.mousePosMeters);
      ctx.fillStyle = '#38bdf8';
      ctx.font = '11px sans-serif';
      ctx.fillText(`${curLen.toFixed(2)}m`, p2.x + 10, p2.y - 10);
    }

    // Calibration points preview
    if (state.calibratingScale && state.calibPoints.length === 1) {
      const p1 = this.worldToScreen(state.calibPoints[0].x, state.calibPoints[0].y);
      const p2 = this.worldToScreen(state.mousePosMeters.x, state.mousePosMeters.y);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  drawGrid(ctx, w, h) {
    const gridMeter = 1.0;
    const gridPx = gridMeter * state.scale;
    const startX = state.panOffset.x % gridPx;
    const startY = state.panOffset.y % gridPx;

    ctx.strokeStyle = 'rgba(35, 51, 84, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = startX; x < w; x += gridPx) {
      ctx.moveTo(x, 0); ctx.lineTo(x, h);
    }
    for (let y = startY; y < h; y += gridPx) {
      ctx.moveTo(0, y); ctx.lineTo(w, y);
    }
    ctx.stroke();

    const origin = this.worldToScreen(0, 0);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(origin.x - 15, origin.y); ctx.lineTo(origin.x + 15, origin.y);
    ctx.moveTo(origin.x, origin.y - 15); ctx.lineTo(origin.x, origin.y + 15);
    ctx.stroke();
  }
}

// ==========================================
// 3D THREE.JS WEBGL RENDERER & ANIMATOR
// ==========================================
let scene, camera, renderer, orbitControls, pointerControls, raycaster, mouse2D;
let wallsGroup, doorsGroup, windowsGroup, furnitureGroup, floorMesh, roofGroup, importedModelsGroup;
let sunLight, ambientLight, interiorSpotlights = [];

function init3D() {
  const container = document.getElementById('webgl-container');
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x060b18);

  camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 14, 15);

  renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  container.appendChild(renderer.domElement);

  orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.enableDamping = true;
  orbitControls.dampingFactor = 0.05;
  orbitControls.maxPolarAngle = Math.PI / 2 - 0.02;

  pointerControls = new PointerLockControls(camera, renderer.domElement);

  raycaster = new THREE.Raycaster();
  mouse2D = new THREE.Vector2();

  wallsGroup = new THREE.Group();
  doorsGroup = new THREE.Group();
  windowsGroup = new THREE.Group();
  furnitureGroup = new THREE.Group();
  roofGroup = new THREE.Group();
  importedModelsGroup = new THREE.Group();
  scene.add(wallsGroup, doorsGroup, windowsGroup, furnitureGroup, roofGroup, importedModelsGroup);

  setupLighting();
  createFloorMesh();

  // 3D Door click interaction for animation
  renderer.domElement.addEventListener('click', (e) => {
    if (state.cameraMode === 'walk' && !pointerControls.isLocked) return;
    const rect = renderer.domElement.getBoundingClientRect();
    mouse2D.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse2D.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse2D, camera);
    const intersects = raycaster.intersectObjects(state.interactiveDoors, true);

    if (intersects.length > 0) {
      // Find door parent
      let obj = intersects[0].object;
      while (obj && !obj.userData.doorData) {
        obj = obj.parent;
      }
      if (obj && obj.userData.doorData) {
        toggleDoorAnimation(obj);
      }
    }
  });

  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  animate();
}

function setupLighting() {
  ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  sunLight = new THREE.DirectionalLight(0xfff7ed, 1.8);
  sunLight.position.set(12, 20, 10);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;
  const d = 16;
  sunLight.shadow.camera.left = -d;
  sunLight.shadow.camera.right = d;
  sunLight.shadow.camera.top = d;
  sunLight.shadow.camera.bottom = -d;
  sunLight.shadow.bias = -0.0005;
  scene.add(sunLight);

  const hemiLight = new THREE.HemisphereLight(0xbae6fd, 0x1e293b, 0.4);
  scene.add(hemiLight);
}

function createProceduralTexture(type) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (type === 'wood') {
    ctx.fillStyle = '#c29b68';
    ctx.fillRect(0, 0, 512, 512);
    ctx.fillStyle = '#b08855';
    for (let y = 0; y < 512; y += 64) {
      for (let x = 0; x < 512; x += 128) {
        const offset = (y / 64) % 2 === 0 ? 0 : 64;
        ctx.strokeStyle = '#855d2f';
        ctx.lineWidth = 2;
        ctx.strokeRect(x + offset, y, 128, 64);
        ctx.fillStyle = (x + y) % 3 === 0 ? '#b8905e' : '#c29b68';
        ctx.fillRect(x + offset + 2, y + 2, 124, 60);
      }
    }
  } else if (type === 'tile') {
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, 512, 512);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 4;
    for (let i = 0; i <= 512; i += 128) {
      ctx.moveTo(i, 0); ctx.lineTo(i, 512);
      ctx.moveTo(0, i); ctx.lineTo(512, i);
    }
    ctx.stroke();
  } else if (type === 'concrete') {
    ctx.fillStyle = '#64748b';
    ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 4000; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? '#475569' : '#94a3b8';
      ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
    }
  } else {
    ctx.fillStyle = '#334155';
    ctx.fillRect(0, 0, 512, 512);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  return tex;
}

function createFloorMesh() {
  if (floorMesh) scene.remove(floorMesh);
  const slabGeo = new THREE.BoxGeometry(32, 0.2, 32);
  const floorMat = new THREE.MeshStandardMaterial({
    map: createProceduralTexture(state.floorType),
    roughness: 0.4,
    metalness: 0.1
  });
  floorMesh = new THREE.Mesh(slabGeo, floorMat);
  floorMesh.position.y = -0.1;
  floorMesh.receiveShadow = true;
  scene.add(floorMesh);
}

// ------------------------------------------
// REBUILD 3D ARCHITECTURE
// ------------------------------------------
function rebuild3DScene() {
  while (wallsGroup.children.length) wallsGroup.remove(wallsGroup.children[0]);
  while (doorsGroup.children.length) doorsGroup.remove(doorsGroup.children[0]);
  while (windowsGroup.children.length) windowsGroup.remove(windowsGroup.children[0]);
  while (furnitureGroup.children.length) furnitureGroup.remove(furnitureGroup.children[0]);
  while (roofGroup.children.length) roofGroup.remove(roofGroup.children[0]);
  state.interactiveDoors = [];

  const wallMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.85,
    metalness: 0.05
  });

  const wallHeight = state.wallHeight;

  // Extrude walls with opening cutouts
  for (const wall of state.walls) {
    const p1 = wall.p1;
    const p2 = wall.p2;
    const wallLen = dist(p1, p2);
    if (wallLen < 0.1) continue;

    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    const wallThick = wall.thickness || state.wallThickness;
    const thisWallHeight = wall.height || wallHeight;

    const wallDoors = state.doors.filter(d => d.wallId === wall.id);
    const wallWindows = state.windows.filter(w => w.id === wall.id);

    const cuts = [];
    for (const d of wallDoors) {
      const s = Math.max(0, d.offset - d.width / 2);
      const e = Math.min(wallLen, d.offset + d.width / 2);
      cuts.push({ start: s, end: e, type: 'door', data: d });
    }
    for (const win of wallWindows) {
      const s = Math.max(0, win.offset - win.width / 2);
      const e = Math.min(wallLen, win.offset + win.width / 2);
      cuts.push({ start: s, end: e, type: 'window', data: win });
    }
    cuts.sort((a, b) => a.start - b.start);

    const wallAnchor = new THREE.Group();
    wallAnchor.position.set(p1.x, 0, p1.y);
    wallAnchor.rotation.y = -angle;

    if (cuts.length === 0) {
      const geo = new THREE.BoxGeometry(wallLen, thisWallHeight, wallThick);
      const mesh = new THREE.Mesh(geo, wallMat);
      mesh.position.set(wallLen / 2, thisWallHeight / 2, 0);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      wallAnchor.add(mesh);
    } else {
      let cursor = 0;
      for (const cut of cuts) {
        if (cut.start > cursor) {
          const segLen = cut.start - cursor;
          const segGeo = new THREE.BoxGeometry(segLen, thisWallHeight, wallThick);
          const segMesh = new THREE.Mesh(segGeo, wallMat);
          segMesh.position.set(cursor + segLen / 2, thisWallHeight / 2, 0);
          segMesh.castShadow = true;
          segMesh.receiveShadow = true;
          wallAnchor.add(segMesh);
        }

        const openingLen = cut.end - cut.start;
        const openingMid = cut.start + openingLen / 2;

        if (cut.type === 'door') {
          const doorH = cut.data.height;
          const lintelH = thisWallHeight - doorH;
          if (lintelH > 0) {
            const lintelGeo = new THREE.BoxGeometry(openingLen, lintelH, wallThick);
            const lintelMesh = new THREE.Mesh(lintelGeo, wallMat);
            lintelMesh.position.set(openingMid, doorH + lintelH / 2, 0);
            lintelMesh.castShadow = true;
            lintelMesh.receiveShadow = true;
            wallAnchor.add(lintelMesh);
          }

          // Interactive Animated Door
          const doorHinge = new THREE.Group();
          doorHinge.position.set(cut.start, 0, 0);

          const leafMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.3 });
          const leaf = new THREE.Mesh(new THREE.BoxGeometry(openingLen, doorH, 0.04), leafMat);
          leaf.position.set(openingLen / 2, doorH / 2, 0);
          leaf.castShadow = true;
          doorHinge.add(leaf);

          doorHinge.userData = {
            doorData: cut.data,
            targetAngle: cut.data.isOpen ? Math.PI / 2.2 : 0,
            currentAngle: cut.data.isOpen ? Math.PI / 2.2 : 0
          };
          doorHinge.rotation.y = doorHinge.userData.currentAngle;

          state.interactiveDoors.push(leaf);
          wallAnchor.add(doorHinge);

        } else if (cut.type === 'window') {
          const sillH = cut.data.elevation;
          if (sillH > 0) {
            const sillGeo = new THREE.BoxGeometry(openingLen, sillH, wallThick);
            const sillMesh = new THREE.Mesh(sillGeo, wallMat);
            sillMesh.position.set(openingMid, sillH / 2, 0);
            sillMesh.castShadow = true;
            wallAnchor.add(sillMesh);
          }

          const winTop = cut.data.elevation + cut.data.height;
          const lintelH = thisWallHeight - winTop;
          if (lintelH > 0) {
            const lintelGeo = new THREE.BoxGeometry(openingLen, lintelH, wallThick);
            const lintelMesh = new THREE.Mesh(lintelGeo, wallMat);
            lintelMesh.position.set(openingMid, winTop + lintelH / 2, 0);
            lintelMesh.castShadow = true;
            wallAnchor.add(lintelMesh);
          }

          const glassMat = new THREE.MeshPhysicalMaterial({
            color: 0xbae6fd,
            transmission: 0.9,
            opacity: 0.4,
            transparent: true,
            roughness: 0.1
          });
          const glass = new THREE.Mesh(new THREE.BoxGeometry(openingLen - 0.05, cut.data.height - 0.05, 0.02), glassMat);
          glass.position.set(openingMid, cut.data.elevation + cut.data.height / 2, 0);
          wallAnchor.add(glass);
        }

        cursor = cut.end;
      }

      if (cursor < wallLen) {
        const segLen = wallLen - cursor;
        const segGeo = new THREE.BoxGeometry(segLen, thisWallHeight, wallThick);
        const segMesh = new THREE.Mesh(segGeo, wallMat);
        segMesh.position.set(cursor + segLen / 2, thisWallHeight / 2, 0);
        segMesh.castShadow = true;
        wallAnchor.add(segMesh);
      }
    }

    wallsGroup.add(wallAnchor);
  }

  // Build Furniture
  for (const f of state.furniture) {
    const fMesh = create3DFurniture(f);
    furnitureGroup.add(fMesh);
  }

  // Roof
  if (state.showRoof) {
    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(24, 0.2, 22),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 })
    );
    roof.position.set(0, wallHeight + 0.1, 0);
    roof.castShadow = true;
    roofGroup.add(roof);
  }
}

// ------------------------------------------
// 3D FURNITURE BUILDER
// ------------------------------------------
function create3DFurniture(f) {
  const group = new THREE.Group();
  group.position.set(f.x, 0, f.y);
  group.rotation.y = -f.rot;

  if (f.type === 'bed') {
    const frame = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.35, 2.0), new THREE.MeshStandardMaterial({ color: 0x1e293b }));
    frame.position.y = 0.175; frame.castShadow = true; group.add(frame);

    const mattress = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.25, 1.9), new THREE.MeshStandardMaterial({ color: 0xf8fafc }));
    mattress.position.y = 0.45; mattress.castShadow = true; group.add(mattress);

    const headboard = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.9, 0.12), new THREE.MeshStandardMaterial({ color: 0x1e293b }));
    headboard.position.set(0, 0.45, -0.95); headboard.castShadow = true; group.add(headboard);
  } else if (f.type === 'sofa') {
    const mat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.85 });
    const base = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.4, 0.9), mat);
    base.position.y = 0.2; base.castShadow = true; group.add(base);

    const back = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.5, 0.25), mat);
    back.position.set(0, 0.55, -0.32); back.castShadow = true; group.add(back);

    const arm1 = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.35, 0.9), mat);
    arm1.position.set(-1.0, 0.45, 0);
    const arm2 = arm1.clone();
    arm2.position.set(1.0, 0.45, 0);
    group.add(arm1, arm2);
  } else if (f.type === 'table') {
    const top = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.06, 0.9), new THREE.MeshStandardMaterial({ color: 0x78350f }));
    top.position.y = 0.74; top.castShadow = true; group.add(top);

    const legGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.74);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8 });
    [[-0.7, -0.35], [0.7, -0.35], [-0.7, 0.35], [0.7, 0.35]].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(lx, 0.37, lz);
      group.add(leg);
    });
  } else if (f.type === 'plant') {
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.18, 0.5, 16), new THREE.MeshStandardMaterial({ color: 0xf8fafc }));
    pot.position.y = 0.25; pot.castShadow = true; group.add(pot);

    const plant = new THREE.Mesh(new THREE.DodecahedronGeometry(0.45, 1), new THREE.MeshStandardMaterial({ color: 0x16a34a }));
    plant.position.y = 0.75; plant.castShadow = true; group.add(plant);
  } else if (f.type === 'tv') {
    const stand = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.45, 0.4), new THREE.MeshStandardMaterial({ color: 0x1e293b }));
    stand.position.y = 0.225; group.add(stand);

    const tv = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.75, 0.05), new THREE.MeshStandardMaterial({ color: 0x020617 }));
    tv.position.set(0, 0.9, 0); tv.castShadow = true; group.add(tv);
  } else if (f.type === 'desk') {
    const deskTop = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.05, 0.7), new THREE.MeshStandardMaterial({ color: 0x334155 }));
    deskTop.position.y = 0.72; group.add(deskTop);
  } else if (f.type === 'bath') {
    const vanity = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 0.6), new THREE.MeshStandardMaterial({ color: 0x0284c7 }));
    vanity.position.y = 0.4; group.add(vanity);
  } else if (f.type === 'kitchen') {
    const island = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.88, 0.9), new THREE.MeshStandardMaterial({ color: 0x475569 }));
    island.position.y = 0.44; group.add(island);
  }

  return group;
}

// ------------------------------------------
// ANIMATION SYSTEMS
// ------------------------------------------
function toggleDoorAnimation(doorLeafMesh) {
  const hinge = doorLeafMesh.parent;
  if (!hinge || !hinge.userData) return;
  const d = hinge.userData.doorData;
  d.isOpen = !d.isOpen;
  hinge.userData.targetAngle = d.isOpen ? Math.PI / 2.2 : 0;
}

function startAnimation(type) {
  state.activeAnimation = type;
  state.animTime = 0;
  const banner = document.getElementById('anim-banner');
  const bannerText = document.getElementById('anim-banner-text');
  banner.classList.remove('hidden');

  if (type === 'rise') {
    bannerText.textContent = '🏗️ Construction Assembly Animation...';
  } else if (type === 'turntable') {
    bannerText.textContent = '🚁 360° Cinematic Drone Tour...';
  } else if (type === 'sun') {
    bannerText.textContent = '☀️ 24-Hour Sun & Moving Shadows...';
  } else if (type === 'tour') {
    bannerText.textContent = '🚶 Room-to-Room Camera Tour...';
  }
}

function stopAnimation() {
  state.activeAnimation = null;
  document.getElementById('anim-banner').classList.add('hidden');
  document.querySelectorAll('.studio-btn').forEach(b => b.classList.remove('active'));
  orbitControls.enabled = true;
}

// Main Render Loop
const keys = {};
window.addEventListener('keydown', (e) => {
  keys[e.code] = true;
  if (e.code === 'KeyZ' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    undo();
  }
  if (e.code === 'KeyY' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    redo();
  }
});
window.addEventListener('keyup', (e) => { keys[e.code] = false; });

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();

  // Smoothly interpolate interactive door hinges
  wallsGroup.traverse(child => {
    if (child.userData && child.userData.doorData) {
      const diff = child.userData.targetAngle - child.userData.currentAngle;
      if (Math.abs(diff) > 0.01) {
        child.userData.currentAngle += diff * 8 * delta;
        child.rotation.y = child.userData.currentAngle;
      }
    }
  });

  // Handle Active Studio Animations
  if (state.activeAnimation) {
    state.animTime += delta;

    if (state.activeAnimation === 'turntable') {
      const radius = 20;
      const speed = 0.4;
      camera.position.x = Math.sin(state.animTime * speed) * radius;
      camera.position.z = Math.cos(state.animTime * speed) * radius;
      camera.position.y = 10 + Math.sin(state.animTime * 0.2) * 3;
      camera.lookAt(0, 1.5, 0);
    } else if (state.activeAnimation === 'sun') {
      const sunCycle = (state.animTime * 0.2) % (Math.PI * 2);
      const sunDist = 25;
      sunLight.position.x = Math.cos(sunCycle) * sunDist;
      sunLight.position.y = Math.max(1, Math.sin(sunCycle) * sunDist);
      sunLight.position.z = Math.sin(sunCycle * 0.5) * 12;

      // Color temperature shifting
      if (sunLight.position.y < 5) {
        sunLight.color.set(0xf97316); // sunset orange
        sunLight.intensity = 0.8;
      } else {
        sunLight.color.set(0xfff7ed);
        sunLight.intensity = 1.8;
      }
    } else if (state.activeAnimation === 'rise') {
      const progress = Math.min(1, state.animTime / 3.0);
      wallsGroup.position.y = (progress - 1) * state.wallHeight;
      wallsGroup.scale.y = Math.max(0.01, progress);
      furnitureGroup.position.y = Math.max(0, Math.sin(progress * Math.PI) * 0.5);

      if (progress >= 1) {
        stopAnimation();
      }
    } else if (state.activeAnimation === 'tour') {
      const rooms = state.rooms.length > 0 ? state.rooms : [{ x: 0, y: 0 }];
      const roomIdx = Math.floor((state.animTime * 0.3) % rooms.length);
      const targetRoom = rooms[roomIdx];
      camera.position.lerp(new THREE.Vector3(targetRoom.x, 1.65, targetRoom.y), delta * 2.0);
      camera.lookAt(targetRoom.x + Math.sin(state.animTime), 1.65, targetRoom.y + Math.cos(state.animTime));
    }
  }

  // Walkthrough Mode
  if (state.cameraMode === 'walk' && pointerControls.isLocked) {
    const moveSpeed = 4.0 * delta;
    if (keys['KeyW'] || keys['ArrowUp']) pointerControls.moveForward(moveSpeed);
    if (keys['KeyS'] || keys['ArrowDown']) pointerControls.moveForward(-moveSpeed);
    if (keys['KeyA'] || keys['ArrowLeft']) pointerControls.moveRight(-moveSpeed);
    if (keys['KeyD'] || keys['ArrowRight']) pointerControls.moveRight(moveSpeed);
    camera.position.y = 1.65;
  } else if (state.cameraMode === 'orbit' && !state.activeAnimation) {
    orbitControls.update();
  }

  renderer.render(scene, camera);
}

// ==========================================
// UNIVERSAL FILE IMPORT ENGINE
// Handles: PDF, PPTX, SKP, OBJ, GLTF, DXF, SVG, Images
// ==========================================
async function handleUniversalFile(file) {
  const fileName = file.name.toLowerCase();
  state.blueprintName = file.name;
  document.getElementById('blueprint-filename').textContent = file.name;

  // 1. PDF Blueprint (.pdf)
  if (fileName.endsWith('.pdf')) {
    const arrayBuffer = await file.arrayBuffer();
    loadPDFBlueprint(arrayBuffer);
    return;
  }

  // 2. PowerPoint Presentation (.pptx)
  if (fileName.endsWith('.pptx')) {
    const arrayBuffer = await file.arrayBuffer();
    loadPPTXBlueprint(arrayBuffer);
    return;
  }

  // 3. Trimble SketchUp (.skp)
  if (fileName.endsWith('.skp')) {
    document.getElementById('skp-modal').classList.remove('hidden');
    return;
  }

  // 4. AutoCAD 2D (.dxf)
  if (fileName.endsWith('.dxf')) {
    const text = await file.text();
    parseDXFToWalls(text);
    return;
  }

  // 5. Vector (.svg)
  if (fileName.endsWith('.svg')) {
    const text = await file.text();
    parseSVGToWalls(text);
    return;
  }

  // 6. 3D Model Formats (.obj, .gltf, .glb, .stl)
  if (fileName.endsWith('.obj')) {
    const text = await file.text();
    const objLoader = new OBJLoader();
    const obj = objLoader.parse(text);
    importedModelsGroup.add(obj);
    return;
  }

  if (fileName.endsWith('.gltf') || fileName.endsWith('.glb')) {
    const arrayBuffer = await file.arrayBuffer();
    const gltfLoader = new GLTFLoader();
    gltfLoader.parse(arrayBuffer, '', (gltf) => {
      importedModelsGroup.add(gltf.scene);
    });
    return;
  }

  if (fileName.endsWith('.stl')) {
    const arrayBuffer = await file.arrayBuffer();
    const stlLoader = new STLLoader();
    const geom = stlLoader.parse(arrayBuffer);
    const mesh = new THREE.Mesh(geom, new THREE.MeshStandardMaterial({ color: 0x94a3b8 }));
    mesh.rotation.x = -Math.PI / 2;
    importedModelsGroup.add(mesh);
    return;
  }

  // 7. Project JSON
  if (fileName.endsWith('.json')) {
    const text = await file.text();
    const project = JSON.parse(text);
    state.walls = project.walls || [];
    state.doors = project.doors || [];
    state.windows = project.windows || [];
    state.furniture = project.furniture || [];
    state.rooms = project.rooms || [];
    rebuild3DScene();
    if (canvas2D) canvas2D.render();
    return;
  }

  // 8. Raster Blueprint Images (PNG, JPG, WEBP)
  if (file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        state.blueprintImg = img;
        document.getElementById('blueprint-controls').classList.remove('hidden');
        canvas2D.render();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

// PDF Loader with multi-page support
async function loadPDFBlueprint(arrayBuffer) {
  if (!window.pdfjsLib) return;
  const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  if (pdf.numPages === 1) {
    renderPDFPage(pdf, 1);
  } else {
    // Show page selector modal
    const modal = document.getElementById('selection-modal');
    const grid = document.getElementById('modal-grid');
    grid.className = 'modal-grid-pages';
    grid.innerHTML = '';
    document.getElementById('modal-title').textContent = `Select Blueprint Page (Total: ${pdf.numPages})`;

    for (let i = 1; i <= pdf.numPages; i++) {
      const card = document.createElement('div');
      card.className = 'page-thumb-card';
      const c = document.createElement('canvas');
      card.appendChild(c);
      const span = document.createElement('span');
      span.textContent = `Page ${i}`;
      card.appendChild(span);

      // Render thumbnail
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 0.3 });
      c.width = viewport.width;
      c.height = viewport.height;
      await page.render({ canvasContext: c.getContext('2d'), viewport }).promise;

      card.addEventListener('click', () => {
        modal.classList.add('hidden');
        renderPDFPage(pdf, i);
      });
      grid.appendChild(card);
    }
    modal.classList.remove('hidden');
  }
}

async function renderPDFPage(pdf, pageNum) {
  const page = await pdf.getPage(pageNum);
  const viewport = page.getViewport({ scale: 2.0 }); // High-res
  const canvas = document.createElement('canvas');
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;

  const img = new Image();
  img.onload = () => {
    state.blueprintImg = img;
    document.getElementById('blueprint-controls').classList.remove('hidden');
    canvas2D.render();
  };
  img.src = canvas.toDataURL();
}

// PPTX Unzipper & Slide/Image Extractor
async function loadPPTXBlueprint(arrayBuffer) {
  if (!window.JSZip) return;
  const zip = await window.JSZip.loadAsync(arrayBuffer);
  const images = [];

  // Scan media folder
  zip.folder('ppt/media')?.forEach((path, entry) => {
    if (/\.(png|jpe?g|svg)$/i.test(entry.name)) {
      images.push(entry);
    }
  });

  if (images.length === 0) {
    alert('No blueprint images found in this PowerPoint presentation.');
    return;
  }

  // Show image thumbnail selector
  const modal = document.getElementById('selection-modal');
  const grid = document.getElementById('modal-grid');
  grid.className = 'modal-grid-pages';
  grid.innerHTML = '';
  document.getElementById('modal-title').textContent = `Select Diagram/Slide from PowerPoint`;

  for (let i = 0; i < images.length; i++) {
    const entry = images[i];
    const blob = await entry.async('blob');
    const url = URL.createObjectURL(blob);

    const card = document.createElement('div');
    card.className = 'page-thumb-card';
    const imgEl = document.createElement('img');
    imgEl.src = url;
    imgEl.style.width = '100%';
    card.appendChild(imgEl);

    const span = document.createElement('span');
    span.textContent = entry.name.split('/').pop();
    card.appendChild(span);

    card.addEventListener('click', () => {
      modal.classList.add('hidden');
      const img = new Image();
      img.onload = () => {
        state.blueprintImg = img;
        document.getElementById('blueprint-controls').classList.remove('hidden');
        canvas2D.render();
      };
      img.src = url;
    });
    grid.appendChild(card);
  }
  modal.classList.remove('hidden');
}

// AutoCAD DXF Parser
function parseDXFToWalls(dxfText) {
  pushHistory();
  const lines = dxfText.split(/\r?\n/);
  let inEntities = false;
  let curEntity = null;
  const walls = [];

  let x1 = 0, y1 = 0, x2 = 0, y2 = 0;

  for (let i = 0; i < lines.length; i++) {
    const code = lines[i].trim();
    const val = (lines[i + 1] || '').trim();

    if (code === '2' && val === 'ENTITIES') inEntities = true;
    if (code === '0' && val === 'ENDSEC') inEntities = false;

    if (inEntities) {
      if (code === '0') {
        if (curEntity === 'LINE') {
          walls.push({
            id: 'dxf_' + walls.length,
            p1: { x: snapToGrid(x1 * 0.05), y: snapToGrid(y1 * 0.05) },
            p2: { x: snapToGrid(x2 * 0.05), y: snapToGrid(y2 * 0.05) },
            height: state.wallHeight,
            thickness: state.wallThickness
          });
        }
        curEntity = val;
      }
      if (curEntity === 'LINE') {
        if (code === '10') x1 = parseFloat(val);
        if (code === '20') y1 = parseFloat(val);
        if (code === '11') x2 = parseFloat(val);
        if (code === '21') y2 = parseFloat(val);
      }
    }
  }

  if (walls.length > 0) {
    state.walls = walls;
    rebuild3DScene();
    if (canvas2D) canvas2D.render();
  }
}

// SVG Vector Parser
function parseSVGToWalls(svgText) {
  pushHistory();
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, 'image/svg+xml');
  const svgLines = doc.querySelectorAll('line, rect');
  const walls = [];

  svgLines.forEach((el, idx) => {
    if (el.tagName === 'line') {
      const x1 = (parseFloat(el.getAttribute('x1')) - 200) * 0.04;
      const y1 = (parseFloat(el.getAttribute('y1')) - 200) * 0.04;
      const x2 = (parseFloat(el.getAttribute('x2')) - 200) * 0.04;
      const y2 = (parseFloat(el.getAttribute('y2')) - 200) * 0.04;
      walls.push({
        id: 'svg_' + idx,
        p1: { x: snapToGrid(x1), y: snapToGrid(y1) },
        p2: { x: snapToGrid(x2), y: snapToGrid(y2) },
        height: state.wallHeight,
        thickness: state.wallThickness
      });
    }
  });

  if (walls.length > 0) {
    state.walls = walls;
    rebuild3DScene();
    if (canvas2D) canvas2D.render();
  }
}

// ==========================================
// COMPUTER VISION WALL DETECTOR (REAL CV ENGINE)
// ==========================================
let tempDetectedWalls = [];
let cvDebounceTimer = null;

function openAutoDetectModal() {
  if (!state.blueprintImg) {
    alert('Please import a floor plan image, PDF blueprint, or PPTX presentation first before running auto-detection.');
    return;
  }

  const modal = document.getElementById('autodetect-modal');
  modal.classList.remove('hidden');

  // Auto-detect if image is white-on-dark (dark blueprint) or black-on-white
  checkBlueprintInversion();

  runWallDetection();
}

function checkBlueprintInversion() {
  if (!state.blueprintImg) return;
  const testCanvas = document.createElement('canvas');
  testCanvas.width = 40;
  testCanvas.height = 40;
  const ctx = testCanvas.getContext('2d');
  ctx.drawImage(state.blueprintImg, 0, 0, 40, 40);
  const data = ctx.getImageData(0, 0, 40, 40).data;
  let totalLuma = 0;
  for (let i = 0; i < data.length; i += 4) {
    totalLuma += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  }
  const avgLuma = totalLuma / (data.length / 4);
  const invertCheckbox = document.getElementById('ad-invert');
  invertCheckbox.checked = avgLuma < 120; // If dark, invert
}

function runWallDetection() {
  if (!state.blueprintImg) return;

  const thresholdVal = parseInt(document.getElementById('ad-thresh').value, 10);
  const minLenMeters = parseFloat(document.getElementById('ad-minlen').value);
  const snapOrtho = document.getElementById('ad-ortho').checked;
  const invertColors = document.getElementById('ad-invert').checked;

  document.getElementById('ad-minlen-val').textContent = minLenMeters.toFixed(1) + 'm';

  // Processing resolution (normalized for performance & accuracy)
  const maxDim = 800;
  const imgW = state.blueprintImg.width;
  const imgH = state.blueprintImg.height;
  const scaleRatio = Math.min(1, maxDim / Math.max(imgW, imgH));
  const procW = Math.max(200, Math.round(imgW * scaleRatio));
  const procH = Math.max(200, Math.round(imgH * scaleRatio));

  const offCanvas = document.createElement('canvas');
  offCanvas.width = procW;
  offCanvas.height = procH;
  const ctx = offCanvas.getContext('2d');
  ctx.drawImage(state.blueprintImg, 0, 0, procW, procH);

  const imgData = ctx.getImageData(0, 0, procW, procH);
  const pixels = imgData.data;

  // Binarize
  const binary = new Uint8Array(procW * procH);
  for (let i = 0; i < procW * procH; i++) {
    const r = pixels[i * 4];
    const g = pixels[i * 4 + 1];
    const b = pixels[i * 4 + 2];
    let luma = 0.299 * r + 0.587 * g + 0.114 * b;
    if (invertColors) luma = 255 - luma;
    binary[i] = luma < thresholdVal ? 1 : 0; // 1 = dark ink (wall)
  }

  // Scale constants
  const worldW = 24; // standard world extent in meters
  const worldH = 24 * (imgH / imgW);
  const pixelsPerMeter = procW / worldW;
  const minPixels = Math.max(8, Math.round(minLenMeters * pixelsPerMeter));
  const maxThicknessPx = Math.max(3, Math.round(pixelsPerMeter * 0.45)); // up to 45cm wall thickness

  // 1. Extract Horizontal Continuous Segments
  const rawH = [];
  for (let y = 1; y < procH - 1; y++) {
    let startX = -1;
    for (let x = 0; x < procW; x++) {
      if (binary[y * procW + x] === 1) {
        if (startX === -1) startX = x;
      } else {
        if (startX !== -1) {
          const len = x - startX;
          if (len >= minPixels) {
            // Confirm segment has wall thickness (not single-pixel dimension line)
            let thickScore = 0;
            const step = Math.max(2, Math.floor(len / 10));
            for (let cx = startX; cx < x; cx += step) {
              if (binary[(y - 1) * procW + cx] === 1) thickScore++;
              if (binary[(y + 1) * procW + cx] === 1) thickScore++;
            }
            if (thickScore >= (len / step) * 0.4) {
              rawH.push({ y, x1: startX, x2: x });
            }
          }
          startX = -1;
        }
      }
    }
  }

  // 2. Extract Vertical Continuous Segments
  const rawV = [];
  for (let x = 1; x < procW - 1; x++) {
    let startY = -1;
    for (let y = 0; y < procH; y++) {
      if (binary[y * procW + x] === 1) {
        if (startY === -1) startY = y;
      } else {
        if (startY !== -1) {
          const len = y - startY;
          if (len >= minPixels) {
            let thickScore = 0;
            const step = Math.max(2, Math.floor(len / 10));
            for (let cy = startY; cy < y; cy += step) {
              if (binary[cy * procW + (x - 1)] === 1) thickScore++;
              if (binary[cy * procW + (x + 1)] === 1) thickScore++;
            }
            if (thickScore >= (len / step) * 0.4) {
              rawV.push({ x, y1: startY, y2: y });
            }
          }
          startY = -1;
        }
      }
    }
  }

  // 3. Cluster & Merge Parallel Lines to single wall centerlines
  const mergedH = [];
  rawH.sort((a, b) => a.y - b.y);
  const usedH = new Set();
  for (let i = 0; i < rawH.length; i++) {
    if (usedH.has(i)) continue;
    const cluster = [rawH[i]];
    usedH.add(i);
    for (let j = i + 1; j < rawH.length; j++) {
      if (usedH.has(j)) continue;
      if (rawH[j].y - rawH[i].y > maxThicknessPx) break;
      const overlap = Math.min(rawH[i].x2, rawH[j].x2) - Math.max(rawH[i].x1, rawH[j].x1);
      if (overlap > -maxThicknessPx) {
        cluster.push(rawH[j]);
        usedH.add(j);
      }
    }
    const avgY = cluster.reduce((sum, c) => sum + c.y, 0) / cluster.length;
    const minX = Math.min(...cluster.map(c => c.x1));
    const maxX = Math.max(...cluster.map(c => c.x2));
    if (maxX - minX >= minPixels) {
      mergedH.push({ y: avgY, x1: minX, x2: maxX });
    }
  }

  // Bridge collinear horizontal gaps (doors / breaks)
  const finalH = [];
  mergedH.sort((a, b) => a.y - b.y || a.x1 - b.x1);
  const gapPx = Math.max(12, Math.round(pixelsPerMeter * 1.1)); // up to 1.1m door gap
  for (const line of mergedH) {
    const existing = finalH.find(f => Math.abs(f.y - line.y) < maxThicknessPx && Math.abs(f.x2 - line.x1) < gapPx);
    if (existing) {
      existing.x2 = Math.max(existing.x2, line.x2);
      existing.y = (existing.y + line.y) / 2;
    } else {
      finalH.push({ ...line });
    }
  }

  // Cluster & Merge Parallel Vertical Lines
  const mergedV = [];
  rawV.sort((a, b) => a.x - b.x);
  const usedV = new Set();
  for (let i = 0; i < rawV.length; i++) {
    if (usedV.has(i)) continue;
    const cluster = [rawV[i]];
    usedV.add(i);
    for (let j = i + 1; j < rawV.length; j++) {
      if (usedV.has(j)) continue;
      if (rawV[j].x - rawV[i].x > maxThicknessPx) break;
      const overlap = Math.min(rawV[i].y2, rawV[j].y2) - Math.max(rawV[i].y1, rawV[j].y1);
      if (overlap > -maxThicknessPx) {
        cluster.push(rawV[j]);
        usedV.add(j);
      }
    }
    const avgX = cluster.reduce((sum, c) => sum + c.x, 0) / cluster.length;
    const minY = Math.min(...cluster.map(c => c.y1));
    const maxY = Math.max(...cluster.map(c => c.y2));
    if (maxY - minY >= minPixels) {
      mergedV.push({ x: avgX, y1: minY, y2: maxY });
    }
  }

  // Bridge collinear vertical gaps
  const finalV = [];
  mergedV.sort((a, b) => a.x - b.x || a.y1 - b.y1);
  for (const line of mergedV) {
    const existing = finalV.find(f => Math.abs(f.x - line.x) < maxThicknessPx && Math.abs(f.y2 - line.y1) < gapPx);
    if (existing) {
      existing.y2 = Math.max(existing.y2, line.y2);
      existing.x = (existing.x + line.x) / 2;
    } else {
      finalV.push({ ...line });
    }
  }

  // 4. Snap Corner Junctions (T & L junctions)
  const snapDist = Math.max(8, Math.round(pixelsPerMeter * 0.4));
  for (const hLine of finalH) {
    for (const vLine of finalV) {
      if (Math.abs(vLine.x - hLine.x1) < snapDist && hLine.y >= vLine.y1 - snapDist && hLine.y <= vLine.y2 + snapDist) {
        hLine.x1 = vLine.x;
      }
      if (Math.abs(vLine.x - hLine.x2) < snapDist && hLine.y >= vLine.y1 - snapDist && hLine.y <= vLine.y2 + snapDist) {
        hLine.x2 = vLine.x;
      }
      if (Math.abs(hLine.y - vLine.y1) < snapDist && vLine.x >= hLine.x1 - snapDist && vLine.x <= hLine.x2 + snapDist) {
        vLine.y1 = hLine.y;
      }
      if (Math.abs(hLine.y - vLine.y2) < snapDist && vLine.x >= hLine.x1 - snapDist && vLine.x <= hLine.x2 + snapDist) {
        vLine.y2 = hLine.y;
      }
    }
  }

  // 5. Convert Pixel Lines to World Coordinates (in meters)
  const worldOriginX = -12;
  const worldOriginY = -9;
  const toWorldX = (px) => worldOriginX + (px / procW) * worldW;
  const toWorldY = (py) => worldOriginY + (py / procH) * worldH;

  tempDetectedWalls = [];
  let count = 1;

  for (const h of finalH) {
    let p1 = { x: snapToGrid(toWorldX(h.x1)), y: snapToGrid(toWorldY(h.y)) };
    let p2 = { x: snapToGrid(toWorldX(h.x2)), y: snapToGrid(toWorldY(h.y)) };
    if (snapOrtho) p2.y = p1.y; // perfect horizontal
    if (dist(p1, p2) >= minLenMeters * 0.8) {
      tempDetectedWalls.push({
        id: 'cv_w_' + (count++),
        p1, p2,
        height: state.wallHeight,
        thickness: state.wallThickness
      });
    }
  }

  for (const v of finalV) {
    let p1 = { x: snapToGrid(toWorldX(v.x)), y: snapToGrid(toWorldY(v.y1)) };
    let p2 = { x: snapToGrid(toWorldX(v.x)), y: snapToGrid(toWorldY(v.y2)) };
    if (snapOrtho) p2.x = p1.x; // perfect vertical
    if (dist(p1, p2) >= minLenMeters * 0.8) {
      tempDetectedWalls.push({
        id: 'cv_w_' + (count++),
        p1, p2,
        height: state.wallHeight,
        thickness: state.wallThickness
      });
    }
  }

  // Update UI count badge
  document.getElementById('ad-count-badge').textContent = `${tempDetectedWalls.length} walls detected`;

  // 6. Draw Binary Mask + Overlaid Detected Lines on Preview Canvas
  const prevCanvas = document.getElementById('autodetect-preview-canvas');
  prevCanvas.width = procW;
  prevCanvas.height = procH;
  const pctx = prevCanvas.getContext('2d');

  // Render binary mask as grayscale
  const previewImgData = pctx.createImageData(procW, procH);
  for (let i = 0; i < procW * procH; i++) {
    const val = binary[i] === 1 ? 255 : 20; // 255 = ink white, 20 = dark bg
    previewImgData.data[i * 4] = val;
    previewImgData.data[i * 4 + 1] = val;
    previewImgData.data[i * 4 + 2] = val;
    previewImgData.data[i * 4 + 3] = 255;
  }
  pctx.putImageData(previewImgData, 0, 0);

  // Overlay detected green vector lines
  pctx.lineWidth = 3;
  pctx.strokeStyle = '#10b981'; // vibrant green
  for (const h of finalH) {
    pctx.beginPath();
    pctx.moveTo(h.x1, h.y);
    pctx.lineTo(h.x2, h.y);
    pctx.stroke();
  }
  for (const v of finalV) {
    pctx.beginPath();
    pctx.moveTo(v.x, v.y1);
    pctx.lineTo(v.x, v.y2);
    pctx.stroke();
  }
}

function applyDetectedWalls() {
  if (tempDetectedWalls.length === 0) {
    alert('No walls detected. Try adjusting the Sensitivity slider or Invert checkbox.');
    return;
  }
  pushHistory();
  state.walls = tempDetectedWalls;
  rebuild3DScene();
  if (canvas2D) canvas2D.render();

  document.getElementById('autodetect-modal').classList.add('hidden');
}

// ==========================================
// ELEMENT INSPECTOR (LIVE EDITING)
// ==========================================
function updateInspector() {
  const panel = document.getElementById('inspector-panel');
  const title = document.getElementById('inspector-title');
  const content = document.getElementById('inspector-content');

  if (!state.selectedElement) {
    panel.classList.add('hidden');
    return;
  }

  panel.classList.remove('hidden');
  const { type, item } = state.selectedElement;

  if (type === 'wall') {
    title.textContent = 'Edit Wall';
    const len = dist(item.p1, item.p2);
    content.innerHTML = `
      <div class="inspector-row">
        <label>Length:</label>
        <span>${len.toFixed(2)}m</span>
      </div>
      <div class="inspector-row">
        <label>Height (m):</label>
        <input type="number" id="insp-wall-h" step="0.1" value="${(item.height || state.wallHeight).toFixed(1)}">
      </div>
      <div class="inspector-row">
        <label>Thickness (m):</label>
        <input type="number" id="insp-wall-t" step="0.05" value="${(item.thickness || state.wallThickness).toFixed(2)}">
      </div>
      <button id="insp-delete-btn" class="btn-danger">Delete Wall</button>
    `;

    document.getElementById('insp-wall-h').addEventListener('change', (e) => {
      item.height = parseFloat(e.target.value);
      rebuild3DScene();
    });
    document.getElementById('insp-wall-t').addEventListener('change', (e) => {
      item.thickness = parseFloat(e.target.value);
      rebuild3DScene();
      canvas2D.render();
    });
  } else if (type === 'furniture') {
    title.textContent = 'Edit Furniture';
    content.innerHTML = `
      <div class="inspector-row">
        <label>Type:</label>
        <span>${item.type.toUpperCase()}</span>
      </div>
      <div class="inspector-row">
        <label>Rotate (°):</label>
        <input type="number" id="insp-furn-rot" step="15" value="${Math.round((item.rot * 180) / Math.PI)}">
      </div>
      <button id="insp-delete-btn" class="btn-danger">Delete Item</button>
    `;

    document.getElementById('insp-furn-rot').addEventListener('change', (e) => {
      item.rot = (parseFloat(e.target.value) * Math.PI) / 180;
      rebuild3DScene();
      canvas2D.render();
    });
  }

  document.getElementById('insp-delete-btn').addEventListener('click', () => {
    pushHistory();
    if (type === 'wall') {
      state.walls = state.walls.filter(w => w.id !== item.id);
      state.doors = state.doors.filter(d => d.wallId !== item.id);
      state.windows = state.windows.filter(win => win.wallId !== item.id);
    } else if (type === 'furniture') {
      state.furniture = state.furniture.filter(f => f.id !== item.id);
    }
    state.selectedElement = null;
    rebuild3DScene();
    canvas2D.render();
    updateInspector();
  });
}

// ==========================================
// EXPORTING ENGINE
// ==========================================
function exportGLB() {
  const exporter = new GLTFExporter();
  exporter.parse(scene, (glb) => {
    const blob = new Blob([glb], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'floorplan_3d.glb';
    link.click();
  }, (err) => console.error(err), { binary: true });
}

function exportOBJ() {
  let output = '# PlanCraft 3D Model Export\no Architecture\n\n';
  let vertexOffset = 1;
  scene.updateMatrixWorld(true);

  const meshes = [];
  wallsGroup.traverse(child => { if (child.isMesh) meshes.push(child); });
  furnitureGroup.traverse(child => { if (child.isMesh) meshes.push(child); });
  if (floorMesh) meshes.push(floorMesh);

  for (const mesh of meshes) {
    const geom = mesh.geometry.clone();
    geom.applyMatrix4(mesh.matrixWorld);
    const pos = geom.attributes.position;
    if (!pos) continue;

    for (let i = 0; i < pos.count; i++) {
      output += `v ${pos.getX(i).toFixed(4)} ${pos.getY(i).toFixed(4)} ${pos.getZ(i).toFixed(4)}\n`;
    }

    const index = geom.index;
    if (index) {
      for (let i = 0; i < index.count; i += 3) {
        output += `f ${index.getX(i) + vertexOffset} ${index.getX(i + 1) + vertexOffset} ${index.getX(i + 2) + vertexOffset}\n`;
      }
      vertexOffset += pos.count;
    } else {
      for (let i = 0; i < pos.count; i += 3) {
        output += `f ${i + vertexOffset} ${i + 1 + vertexOffset} ${i + 2 + vertexOffset}\n`;
      }
      vertexOffset += pos.count;
    }
  }

  const blob = new Blob([output], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'floorplan_3d.obj';
  link.click();
}

function exportPNGBlueprint() {
  const canvas = document.getElementById('canvas-2d');
  const url = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = url;
  link.download = 'floorplan_blueprint.png';
  link.click();
}

function saveProjectJSON() {
  const data = JSON.stringify({
    walls: state.walls,
    doors: state.doors,
    windows: state.windows,
    furniture: state.furniture,
    rooms: state.rooms,
    wallHeight: state.wallHeight,
    floorType: state.floorType
  }, null, 2);

  const blob = new Blob([data], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'plancraft_project.json';
  link.click();
}

// ==========================================
// UI WIRING & DRAG & DROP
// ==========================================
function setupUI() {
  const canvasElement = document.getElementById('canvas-2d');
  canvas2D = new Canvas2D(canvasElement);

  loadPreset('apartment');

  // Preset Selector
  document.getElementById('plan-select').addEventListener('change', (e) => {
    loadPreset(e.target.value);
  });

  // View Modes
  const workspace = document.getElementById('workspace');
  document.getElementById('view-split-btn').addEventListener('click', (e) => {
    setActiveViewBtn(e.target);
    workspace.className = 'workspace split-mode';
    canvas2D.resize();
  });
  document.getElementById('view-2d-btn').addEventListener('click', (e) => {
    setActiveViewBtn(e.target);
    workspace.className = 'workspace mode-2d';
    canvas2D.resize();
  });
  document.getElementById('view-3d-btn').addEventListener('click', (e) => {
    setActiveViewBtn(e.target);
    workspace.className = 'workspace mode-3d';
    window.dispatchEvent(new Event('resize'));
  });

  function setActiveViewBtn(btn) {
    document.querySelectorAll('.nav-view-mode .toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  // 2D Tools
  document.querySelectorAll('.tool-btn[data-tool]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tool-btn[data-tool]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeTool = btn.dataset.tool;
      state.wallStartPoint = null;

      // Toggle Furniture Palette
      const furnPalette = document.getElementById('furniture-palette');
      if (state.activeTool === 'furniture') {
        furnPalette.classList.remove('hidden');
      } else {
        furnPalette.classList.add('hidden');
      }

      canvas2D.render();
    });
  });

  // Furniture items selection
  document.querySelectorAll('.furn-item').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.furn-item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.selectedFurnitureType = btn.dataset.type;
    });
  });

  // Scale Calibration Button
  document.getElementById('calibrate-scale-btn').addEventListener('click', () => {
    state.calibratingScale = true;
    state.calibPoints = [];
    alert('Scale Calibration Mode:\nClick TWO points on your floor plan/blueprint with a known distance (e.g. wall or room width).');
  });

  document.getElementById('apply-scale-btn').addEventListener('click', () => {
    const realLen = parseFloat(document.getElementById('scale-real-length').value);
    if (realLen > 0 && state.calibPoints.length === 2) {
      const p1 = state.calibPoints[0];
      const p2 = state.calibPoints[1];
      const pixelDist = Math.hypot((p2.x - p1.x) * state.scale, (p2.y - p1.y) * state.scale);
      state.scale = pixelDist / realLen;
      document.getElementById('scale-modal').classList.add('hidden');
      canvas2D.render();
    }
  });

  // Clear Canvas
  document.getElementById('clear-canvas-btn').addEventListener('click', () => {
    if (confirm('Clear everything and start fresh?')) {
      pushHistory();
      state.walls = [];
      state.doors = [];
      state.windows = [];
      state.furniture = [];
      state.rooms = [];
      rebuild3DScene();
      canvas2D.render();
    }
  });

  // Blueprint Controls
  document.getElementById('blueprint-opacity').addEventListener('input', (e) => {
    state.blueprintOpacity = parseFloat(e.target.value);
    canvas2D.render();
  });

  document.getElementById('blueprint-auto-walls-btn').addEventListener('click', openAutoDetectModal);

  // Auto-Detect Modal Controls & Live Tuners
  ['ad-thresh', 'ad-minlen'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => {
      clearTimeout(cvDebounceTimer);
      cvDebounceTimer = setTimeout(runWallDetection, 120);
    });
  });

  ['ad-ortho', 'ad-invert'].forEach(id => {
    document.getElementById(id).addEventListener('change', runWallDetection);
  });

  document.getElementById('ad-apply-btn').addEventListener('click', applyDetectedWalls);
  document.getElementById('autodetect-modal-close').addEventListener('click', () => {
    document.getElementById('autodetect-modal').classList.add('hidden');
  });

  document.getElementById('blueprint-remove-btn').addEventListener('click', () => {
    state.blueprintImg = null;
    document.getElementById('blueprint-controls').classList.add('hidden');
    canvas2D.render();
  });

  // Inspector Close
  document.getElementById('inspector-close-btn').addEventListener('click', () => {
    state.selectedElement = null;
    updateInspector();
    canvas2D.render();
  });

  // Undo / Redo
  document.getElementById('undo-btn').addEventListener('click', undo);
  document.getElementById('redo-btn').addEventListener('click', redo);

  // Export Menu
  const exportBtn = document.getElementById('export-menu-btn');
  const exportMenu = document.getElementById('export-dropdown');
  exportBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    exportMenu.classList.toggle('hidden');
  });
  window.addEventListener('click', () => exportMenu.classList.add('hidden'));

  document.getElementById('export-glb-btn').addEventListener('click', exportGLB);
  document.getElementById('export-obj-btn').addEventListener('click', exportOBJ);
  document.getElementById('export-png-btn').addEventListener('click', exportPNGBlueprint);
  document.getElementById('save-json-btn').addEventListener('click', saveProjectJSON);

  // Universal File Upload Input
  const fileInput = document.getElementById('universal-file-input');
  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleUniversalFile(e.target.files[0]);
    }
  });

  // Global Drag & Drop Files
  const dropOverlay = document.getElementById('drop-overlay');
  window.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropOverlay.classList.remove('hidden');
  });
  window.addEventListener('dragleave', (e) => {
    if (e.relatedTarget === null) dropOverlay.classList.add('hidden');
  });
  window.addEventListener('drop', (e) => {
    e.preventDefault();
    dropOverlay.classList.add('hidden');
    if (e.dataTransfer.files.length > 0) {
      handleUniversalFile(e.dataTransfer.files[0]);
    }
  });

  // Animations Bar
  document.getElementById('anim-rise-btn').addEventListener('click', () => startAnimation('rise'));
  document.getElementById('anim-turntable-btn').addEventListener('click', () => startAnimation('turntable'));
  document.getElementById('anim-sun-btn').addEventListener('click', () => startAnimation('sun'));
  document.getElementById('anim-tour-btn').addEventListener('click', () => startAnimation('tour'));
  document.getElementById('stop-anim-btn').addEventListener('click', stopAnimation);

  // Camera Controls
  document.getElementById('cam-orbit').addEventListener('click', (e) => {
    setCamBtn(e.target);
    state.cameraMode = 'orbit';
    orbitControls.enabled = true;
    camera.position.set(0, 14, 15);
    orbitControls.target.set(0, 0, 0);
    document.getElementById('walkthrough-overlay').classList.add('hidden');
  });
  document.getElementById('cam-top').addEventListener('click', (e) => {
    setCamBtn(e.target);
    state.cameraMode = 'orbit';
    orbitControls.enabled = true;
    camera.position.set(0, 24, 0.001);
    orbitControls.target.set(0, 0, 0);
    document.getElementById('walkthrough-overlay').classList.add('hidden');
  });
  document.getElementById('cam-walk').addEventListener('click', (e) => {
    setCamBtn(e.target);
    state.cameraMode = 'walk';
    orbitControls.enabled = false;
    camera.position.set(0, 1.65, 0);
    document.getElementById('walkthrough-overlay').classList.remove('hidden');
  });

  document.getElementById('start-walk-btn').addEventListener('click', () => pointerControls.lock());
  pointerControls.addEventListener('unlock', () => {
    if (state.cameraMode === 'walk') document.getElementById('walkthrough-overlay').classList.remove('hidden');
  });
  pointerControls.addEventListener('lock', () => document.getElementById('walkthrough-overlay').classList.add('hidden'));

  function setCamBtn(btn) {
    document.querySelectorAll('.camera-controls .ctrl-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  // 3D Adjustments Dock
  const heightSlider = document.getElementById('wall-height-slider');
  const heightVal = document.getElementById('wall-height-val');
  heightSlider.addEventListener('input', (e) => {
    state.wallHeight = parseFloat(e.target.value);
    heightVal.textContent = state.wallHeight.toFixed(1) + 'm';
    rebuild3DScene();
  });

  document.getElementById('floor-texture-select').addEventListener('change', (e) => {
    state.floorType = e.target.value;
    createFloorMesh();
  });

  document.getElementById('toggle-sun-btn').addEventListener('click', (e) => {
    state.isNight = !state.isNight;
    e.target.textContent = state.isNight ? '🌙 Night' : '☀️ Day';
    scene.background.set(state.isNight ? 0x020617 : 0x060b18);
    sunLight.intensity = state.isNight ? 0.2 : 1.8;
  });

  document.getElementById('toggle-roof-btn').addEventListener('click', (e) => {
    state.showRoof = !state.showRoof;
    e.target.textContent = state.showRoof ? '🏠 Closed' : '🏠 Cutaway';
    rebuild3DScene();
  });

  // Close modals
  document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.add('hidden'));
    });
  });
}

function loadPreset(key) {
  const p = PRESETS[key];
  if (!p) return;
  pushHistory();
  state.walls = JSON.parse(JSON.stringify(p.walls));
  state.doors = JSON.parse(JSON.stringify(p.doors));
  state.windows = JSON.parse(JSON.stringify(p.windows));
  state.furniture = JSON.parse(JSON.stringify(p.furniture));
  state.rooms = JSON.parse(JSON.stringify(p.rooms));
  state.selectedElement = null;
  rebuild3DScene();
  if (canvas2D) canvas2D.render();
  updateInspector();
}

window.addEventListener('DOMContentLoaded', () => {
  init3D();
  setupUI();
});
