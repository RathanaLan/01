const fs = require('fs');

let css = fs.readFileSync('dnkh-platform.css', 'utf8');

const additionalCss = `
/* ========================================================
   DNKH KNOWLEDGE GRAPH VISUALIZER & RELATIONSHIP ENGINE
   ======================================================== */
.dnkh-knowledge-graph-wrap {
  position: relative;
  width: 100%;
  height: 520px;
  background: var(--dn-bg);
  border: 1px solid var(--dn-border);
  border-radius: var(--dn-radius-md);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.graph-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: var(--dn-surface);
  border-bottom: 1px solid var(--dn-border);
  flex-wrap: wrap;
  gap: 0.5rem;
}
.graph-filter-chips {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}
.graph-filter-chip {
  padding: 0.25rem 0.65rem;
  border-radius: var(--dn-radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid var(--dn-border);
  background: var(--dn-surface-card);
  color: var(--dn-text-secondary);
  transition: var(--dn-transition);
}
.graph-filter-chip.active {
  background: var(--dn-red-light);
  border-color: var(--dn-red);
  color: var(--dn-red);
}
.graph-canvas-stage {
  flex: 1;
  position: relative;
  overflow: hidden;
}
.graph-info-overlay {
  position: absolute;
  bottom: 0.75rem;
  left: 0.75rem;
  right: 0.75rem;
  background: rgba(15, 23, 42, 0.92);
  backdrop-filter: blur(8px);
  border: 1px solid var(--dn-border);
  border-radius: var(--dn-radius-sm);
  padding: 0.75rem 1rem;
  font-size: 0.8rem;
  color: var(--dn-text);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 6-Step Wizard */
.wizard-progress-bar-wrap {
  width: 100%;
  height: 6px;
  background: var(--dn-surface);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 1rem;
}
.wizard-progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--dn-red), var(--dn-cyan));
  transition: width 0.3s ease;
}
.wizard-steps-nav {
  display: flex;
  gap: 0.4rem;
  overflow-x: auto;
  padding-bottom: 0.4rem;
  margin-bottom: 1.25rem;
}
.wizard-step-pill {
  padding: 0.35rem 0.65rem;
  border-radius: var(--dn-radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  background: var(--dn-surface);
  color: var(--dn-text-muted);
  border: 1px solid var(--dn-border);
  cursor: pointer;
  transition: var(--dn-transition);
}
.wizard-step-pill.active {
  background: var(--dn-red-light);
  border-color: var(--dn-red);
  color: var(--dn-red);
}
.wizard-step-pill.completed {
  background: rgba(16, 185, 129, 0.12);
  border-color: var(--dn-green);
  color: var(--dn-green);
}

/* Fishbone & 5-Why */
.fishbone-matrix-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 0.85rem;
  margin: 1rem 0;
}
.fishbone-category-box {
  background: var(--dn-surface);
  border: 1px solid var(--dn-border);
  border-radius: var(--dn-radius-sm);
  padding: 0.75rem;
}
.fishbone-category-header {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--dn-cyan);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.fishbone-item {
  font-size: 0.76rem;
  padding: 0.3rem 0.5rem;
  background: var(--dn-surface-card);
  border-radius: 4px;
  margin-bottom: 0.3rem;
  border-left: 2px solid var(--dn-cyan);
}
.five-why-chain-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin: 1rem 0;
}
.five-why-card {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  background: var(--dn-surface);
  border: 1px solid var(--dn-border);
  border-radius: var(--dn-radius-sm);
  padding: 0.75rem;
}
.five-why-card.root-cause {
  border-color: var(--dn-red);
  background: var(--dn-red-light);
}
.five-why-num-badge {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--dn-surface-hover);
  color: var(--dn-text);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.72rem;
  flex-shrink: 0;
}
.five-why-card.root-cause .five-why-num-badge {
  background: var(--dn-red);
  color: #fff;
}

/* Capability Views */
.capability-views-selector {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
  background: var(--dn-surface);
  padding: 0.35rem;
  border-radius: var(--dn-radius-md);
  border: 1px solid var(--dn-border);
}
.capability-view-btn {
  padding: 0.35rem 0.75rem;
  border-radius: var(--dn-radius-sm);
  font-size: 0.78rem;
  font-weight: 600;
  border: none;
  background: transparent;
  color: var(--dn-text-secondary);
  cursor: pointer;
  transition: var(--dn-transition);
}
.capability-view-btn:hover {
  color: var(--dn-text);
}
.capability-view-btn.active {
  background: var(--dn-surface-card);
  color: var(--dn-cyan);
  box-shadow: var(--dn-shadow-sm);
}
.heatmap-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78rem;
}
.heatmap-table th, .heatmap-table td {
  padding: 0.55rem 0.7rem;
  border: 1px solid var(--dn-border);
  text-align: center;
}
.heatmap-table th {
  background: var(--dn-surface);
  color: var(--dn-text-secondary);
  font-weight: 600;
}
.heatmap-cell-l0 { background: rgba(100, 116, 139, 0.15); color: #94a3b8; }
.heatmap-cell-l1 { background: rgba(59, 130, 246, 0.2); color: #60a5fa; font-weight: 700; }
.heatmap-cell-l2 { background: rgba(6, 182, 212, 0.2); color: #22d3ee; font-weight: 700; }
.heatmap-cell-l3 { background: rgba(16, 185, 129, 0.2); color: #34d399; font-weight: 700; }
.heatmap-cell-l4 { background: rgba(245, 158, 11, 0.2); color: #fbbf24; font-weight: 700; }

/* Admin Subnavigation */
.admin-subnav {
  display: flex;
  gap: 0.5rem;
  border-bottom: 1px solid var(--dn-border);
  margin-bottom: 1.5rem;
  overflow-x: auto;
}
.admin-subnav-btn {
  padding: 0.55rem 0.9rem;
  font-size: 0.8rem;
  font-weight: 600;
  border: none;
  background: transparent;
  color: var(--dn-text-secondary);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: var(--dn-transition);
  white-space: nowrap;
}
.admin-subnav-btn.active {
  color: var(--dn-red);
  border-bottom-color: var(--dn-red);
}
.admin-subnav-btn:hover {
  color: var(--dn-text);
}
`;

fs.writeFileSync('dnkh-platform.css', css + additionalCss, 'utf8');
console.log('Appended additional CSS styles successfully!');
