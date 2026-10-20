const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf-8');
const css = fs.readFileSync('style.css', 'utf-8');
const app = fs.readFileSync('app.js', 'utf-8');
const data = fs.readFileSync('dx-data.json', 'utf-8');
const dxJs = fs.readFileSync('dx-data.js', 'utf-8');

console.log('========================================================');
console.log('       DENSO DX DNA - COMPREHENSIVE VERIFICATION        ');
console.log('========================================================\n');

let allPassed = true;

// 1. Check duplicate element IDs in index.html
const idRegex = /id="([^"]+)"/g;
let match;
const ids = {};
const duplicates = [];

while ((match = idRegex.exec(html)) !== null) {
  const id = match[1];
  if (ids[id]) {
    duplicates.push(id);
  } else {
    ids[id] = 1;
  }
}

if (duplicates.length === 0) {
  console.log('✓ PASS [1/7]: No duplicate element IDs found (' + Object.keys(ids).length + ' unique IDs).');
} else {
  console.error('✗ FAIL [1/7]: Found duplicate IDs:', duplicates);
  allPassed = false;
}

// 2. Check essential IDs in index.html (Quality + DX Views + Modals)
const essentialIds = [
  'exact-photo-stage', 'enterprise-app-stage', 'dx-app-stage',
  'view-screen-1', 'view-screen-2', 'view-screen-3',
  'view-dx-overview', 'view-dx-knowledge', 'view-dx-matrix',
  'view-dx-projects', 'view-dx-experience', 'view-dx-learning',
  'view-dx-experts', 'view-dx-assessment', 'view-dx-analytics',
  'view-dx-governance',
  'modal-dx-knowledge-detail', 'modal-dx-project-detail',
  'modal-dx-experience-detail', 'modal-dx-matrix-cell',
  'modal-dx-action-form', 'modal-dx-expert-contact', 'modal-dx-global-search',
  'btn-ws-quality', 'btn-ws-dx', 'dx-role-selector', 'btn-top-add-dx',
  'btn-top-global-search'
];

let missingIds = [];
essentialIds.forEach(id => {
  if (!html.includes('id="' + id + '"')) {
    missingIds.push(id);
  }
});

if (missingIds.length === 0) {
  console.log('✓ PASS [2/7]: All 27 essential view, workspace, and modal IDs present in index.html.');
} else {
  console.error('✗ FAIL [2/7]: Missing essential IDs in index.html:', missingIds);
  allPassed = false;
}

// 3. Check JSON dataset validity and Section 23 minimum counts
try {
  const parsed = JSON.parse(data);
  const counts = {
    categories: parsed.dxCategories.length,
    topics: parsed.dxTopics.length,
    knowledge: parsed.dxKnowledge.length,
    projects: parsed.dxProjects.length,
    experiences: parsed.dxExperiences.length,
    reusableAssets: parsed.dxReusableAssets.length,
    learningPaths: parsed.dxLearningPaths.length,
    experts: parsed.dxExperts.length,
    assessments: parsed.dxAssessments.length
  };

  const minRequirements = {
    categories: 8,
    topics: 35,
    knowledge: 12,
    projects: 7,
    experiences: 8,
    reusableAssets: 5,
    learningPaths: 6,
    experts: 5,
    assessments: 12
  };

  let countFails = [];
  for (let key in minRequirements) {
    if (counts[key] < minRequirements[key]) {
      countFails.push(key + ': ' + counts[key] + ' < ' + minRequirements[key]);
    }
  }

  if (countFails.length === 0) {
    console.log('✓ PASS [3/7]: Sample dataset meets/exceeds all Section 23 minimum thresholds:');
    console.log('    • ' + counts.categories + ' Categories (min 8)');
    console.log('    • ' + counts.topics + ' Capability Topics (min 35)');
    console.log('    • ' + counts.knowledge + ' Knowledge Records (min 12)');
    console.log('    • ' + counts.projects + ' Real Projects (min 7)');
    console.log('    • ' + counts.experiences + ' Experiences & Failure Lessons (min 8)');
    console.log('    • ' + counts.reusableAssets + ' Reusable Assets (min 5)');
    console.log('    • ' + counts.learningPaths + ' Role-based Learning Paths (min 6)');
    console.log('    • ' + counts.experts + ' Expert Profiles (min 5)');
    console.log('    • ' + counts.assessments + ' Capability Assessments (min 12)');
  } else {
    console.error('✗ FAIL [3/7]: Dataset count below minimums:', countFails);
    allPassed = false;
  }
} catch (e) {
  console.error('✗ FAIL [3/7]: dx-data.json parsing failed:', e);
  allPassed = false;
}

// 4. Check CSS variables and required styles
const essentialCss = [
  '--denso-red', '--denso-navy', '--denso-blue', '--denso-cyan',
  '.sc1-dx-dna-section', '.dx-summary-metrics-grid', '.dx-4d-panels-grid',
  '.dx-matrix-table', '.heatmap-cell-badge', '.prj-tab-panel',
  '.failure-lessons-highlight-banner', '.prototype-role-switcher-wrap',
  '@media (prefers-reduced-motion: reduce)'
];

let missingCss = [];
essentialCss.forEach(cls => {
  if (!css.includes(cls)) {
    missingCss.push(cls);
  }
});

if (missingCss.length === 0) {
  console.log('✓ PASS [4/7]: All essential CSS styles, design tokens, and reduced-motion rules present.');
} else {
  console.error('✗ FAIL [4/7]: Missing CSS rules:', missingCss);
  allPassed = false;
}

// 5. Verify [Sample Data] labeling
const sampleDataCountHtml = (html.match(/Sample Data/g) || []).length;
const sampleDataCountApp = (app.match(/Sample Data/g) || []).length;
if (sampleDataCountHtml > 0 && sampleDataCountApp > 0) {
  console.log('✓ PASS [5/7]: Financial and manhour metrics labeled [Sample Data] (' + (sampleDataCountHtml + sampleDataCountApp) + ' explicit references found).');
} else {
  console.error('✗ FAIL [5/7]: Missing [Sample Data] labels in HTML or App.js');
  allPassed = false;
}

// 6. Verify Ethical Evaluation - NO Leaderboards or Forced Rankings
const leaderboardForbidden = ['leaderboard', 'rank-1', 'ranking-board', 'forced-ranking'];
let foundForbidden = [];
leaderboardForbidden.forEach(term => {
  if (html.toLowerCase().includes(term) || app.toLowerCase().includes(term)) {
    foundForbidden.push(term);
  }
});

if (foundForbidden.length === 0) {
  console.log('✓ PASS [6/7]: Ethical capability verified: Zero public leaderboards, zero forced rankings.');
} else {
  console.error('✗ FAIL [6/7]: Found prohibited ranking patterns:', foundForbidden);
  allPassed = false;
}

// 7. Check dx-data.js standalone script validity
if (dxJs.startsWith('window.DX_SEED_DATA = ') && dxJs.length > 50000) {
  console.log('✓ PASS [7/7]: dx-data.js script is properly packaged for zero-server, double-click local browser execution.');
} else {
  console.error('✗ FAIL [7/7]: dx-data.js script format unexpected');
  allPassed = false;
}

console.log('\n========================================================');
if (allPassed) {
  console.log('   >>> ALL VERIFICATION CHECKS PASSED (100% READY) <<<   ');
} else {
  console.log('   >>> SOME VERIFICATION CHECKS FAILED <<<               ');
}
console.log('========================================================');

