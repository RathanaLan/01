const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Upgrade wizard steps in modal-create-record
const oldWizardNav = `<div class="wizard-steps-nav">
        <div class="wizard-step-pill active" data-step="1">1. Classification</div>
        <div class="wizard-step-pill" data-step="2">2. Details & Method</div>
        <div class="wizard-step-pill" data-step="3">3. Review & Submit</div>
      </div>`;

const newWizardNav = `<div class="wizard-progress-bar-wrap">
        <div class="wizard-progress-bar-fill" id="wizard-progress-bar-fill" style="width: 16.6%;"></div>
      </div>
      <div class="wizard-steps-nav" id="wizard-steps-nav">
        <div class="wizard-step-pill active" data-step="1" onclick="window.DNKH_APP.goToWizardStep(1)">1. Classification</div>
        <div class="wizard-step-pill" data-step="2" onclick="window.DNKH_APP.goToWizardStep(2)">2. Knowledge Details</div>
        <div class="wizard-step-pill" data-step="3" onclick="window.DNKH_APP.goToWizardStep(3)">3. Practical Application</div>
        <div class="wizard-step-pill" data-step="4" onclick="window.DNKH_APP.goToWizardStep(4)">4. Experience</div>
        <div class="wizard-step-pill" data-step="5" onclick="window.DNKH_APP.goToWizardStep(5)">5. Evidence</div>
        <div class="wizard-step-pill" data-step="6" onclick="window.DNKH_APP.goToWizardStep(6)">6. Ownership & Review</div>
      </div>`;

if (html.includes(oldWizardNav)) {
  html = html.replace(oldWizardNav, newWizardNav);
}

// 2. Upgrade modal-create-record footer buttons
const oldWizardFooter = `<div class="dnkh-modal-footer">
        <button type="button" class="btn-dnkh secondary" onclick="window.DNKH_APP.prevWizardStep()">Back</button>
        <button type="button" class="btn-dnkh primary" onclick="window.DNKH_APP.nextWizardStep()">Continue</button>
      </div>`;

const newWizardFooter = `<div class="dnkh-modal-footer">
        <button type="button" class="btn-dnkh secondary" id="btn-wz-back" onclick="window.DNKH_APP.prevWizardStep()">Back</button>
        <button type="button" class="btn-dnkh secondary" id="btn-wz-draft" onclick="window.DNKH_APP.saveWizardDraft()"><i class="fa-solid fa-floppy-disk"></i> Save Draft</button>
        <button type="button" class="btn-dnkh secondary" id="btn-wz-preview" onclick="window.DNKH_APP.previewWizardDraft()"><i class="fa-solid fa-eye"></i> Preview</button>
        <button type="button" class="btn-dnkh primary" id="btn-wz-next" onclick="window.DNKH_APP.nextWizardStep()">Continue</button>
      </div>`;

if (html.includes(oldWizardFooter)) {
  html = html.replace(oldWizardFooter, newWizardFooter);
}

// 3. Add additional modals before the closing </main> or after modal-admin-section
const additionalModals = `
  <!-- Knowledge Relationship Graph Modal -->
  <div class="dnkh-modal-backdrop" id="modal-knowledge-graph" role="dialog" aria-modal="true">
    <div class="dnkh-modal-container" style="max-width: 1020px; width: 95vw;">
      <div class="dnkh-modal-header">
        <h3 class="dnkh-modal-title"><i class="fa-solid fa-diagram-project text-cyan"></i> DNKH Knowledge Relationship Graph</h3>
        <button type="button" class="btn-modal-close" onclick="window.DNKH_APP.closeModal('modal-knowledge-graph')"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="dnkh-modal-body" style="padding: 0;">
        <div class="dnkh-knowledge-graph-wrap">
          <div class="graph-toolbar">
            <div class="graph-filter-chips" id="graph-filter-chips">
              <span class="graph-filter-chip active" data-type="all">All Connected Entities</span>
              <span class="graph-filter-chip" data-type="section">Sections</span>
              <span class="graph-filter-chip" data-type="topic">DNA Topics</span>
              <span class="graph-filter-chip" data-type="record">Knowledge Records</span>
              <span class="graph-filter-chip" data-type="case">8D Cases</span>
              <span class="graph-filter-chip" data-type="expert">Experts (SMEs)</span>
              <span class="graph-filter-chip" data-type="standard">Standards</span>
            </div>
            <div style="display: flex; gap: 0.35rem;">
              <button type="button" class="btn-dnkh secondary" style="padding: 0.25rem 0.6rem; font-size: 0.75rem;" onclick="window.DNKH_APP.zoomGraph(1.1)"><i class="fa-solid fa-magnifying-glass-plus"></i></button>
              <button type="button" class="btn-dnkh secondary" style="padding: 0.25rem 0.6rem; font-size: 0.75rem;" onclick="window.DNKH_APP.zoomGraph(0.9)"><i class="fa-solid fa-magnifying-glass-minus"></i></button>
              <button type="button" class="btn-dnkh secondary" style="padding: 0.25rem 0.6rem; font-size: 0.75rem;" onclick="window.DNKH_APP.resetGraph()"><i class="fa-solid fa-arrows-rotate"></i> Reset</button>
            </div>
          </div>
          <div class="graph-canvas-stage" id="graph-canvas-stage">
            <svg id="dnkh-graph-svg" width="100%" height="100%" style="display: block;"></svg>
          </div>
          <div class="graph-info-overlay" id="graph-info-overlay">
            <div>
              <strong id="graph-info-title">Interactive Relationship Engine</strong>
              <div id="graph-info-desc" style="font-size: 0.75rem; color: var(--dn-text-secondary); margin-top: 2px;">Click any node to inspect interconnections across sections, topics, cases, and standards.</div>
            </div>
            <button type="button" class="btn-dnkh primary" id="btn-graph-open-node" style="display: none; padding: 0.25rem 0.75rem; font-size: 0.75rem;">Open Details</button>
          </div>
        </div>
      </div>
      <div class="dnkh-modal-footer">
        <button type="button" class="btn-dnkh secondary" onclick="window.DNKH_APP.closeModal('modal-knowledge-graph')">Close Graph</button>
      </div>
    </div>
  </div>

  <!-- Evidence-Based Expert Profile Modal -->
  <div class="dnkh-modal-backdrop" id="modal-expert-profile" role="dialog" aria-modal="true">
    <div class="dnkh-modal-container" style="max-width: 860px;">
      <div class="dnkh-modal-header">
        <h3 class="dnkh-modal-title"><i class="fa-solid fa-id-badge text-cyan"></i> Verified Subject-Matter Expert Profile</h3>
        <button type="button" class="btn-modal-close" onclick="window.DNKH_APP.closeModal('modal-expert-profile')"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="dnkh-modal-body" id="expert-profile-modal-body"></div>
      <div class="dnkh-modal-footer">
        <button type="button" class="btn-dnkh secondary" onclick="window.DNKH_APP.closeModal('modal-expert-profile')">Close</button>
        <button type="button" class="btn-dnkh primary" id="btn-modal-req-consultation" onclick="window.DNKH_APP.openRequestConsultationModal()"><i class="fa-solid fa-comments"></i> Request Technical Consultation</button>
      </div>
    </div>
  </div>

  <!-- Request Consultation Modal -->
  <div class="dnkh-modal-backdrop" id="modal-request-consultation" role="dialog" aria-modal="true">
    <div class="dnkh-modal-container">
      <div class="dnkh-modal-header">
        <h3 class="dnkh-modal-title"><i class="fa-solid fa-handshake-angle text-red"></i> Request Technical Consultation</h3>
        <button type="button" class="btn-modal-close" onclick="window.DNKH_APP.closeModal('modal-request-consultation')"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="dnkh-modal-body">
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Consulting Expert</label>
          <input type="text" id="consult-expert-name" class="dnkh-form-input" readonly>
        </div>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Consultation Topic / Problem Category *</label>
          <input type="text" id="consult-topic" class="dnkh-form-input" placeholder="e.g., Stator coil insulation resistance abnormality in humid weather">
        </div>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Urgency & Production Impact</label>
          <select id="consult-urgency" class="dnkh-form-select">
            <option value="Normal">Normal - Capability Development / Standard Review</option>
            <option value="High">High - Impending Trial / Tooling Buy-off</option>
            <option value="Critical">Critical - Active Genba Abnormality / Customer Risk</option>
          </select>
        </div>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Problem Description & Genba Context *</label>
          <textarea id="consult-description" class="dnkh-form-textarea" rows="4" placeholder="Briefly describe what happened, process station, part number, and what advice you are requesting."></textarea>
        </div>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Target Completion Date</label>
          <input type="date" id="consult-date" class="dnkh-form-input">
        </div>
      </div>
      <div class="dnkh-modal-footer">
        <button type="button" class="btn-dnkh secondary" onclick="window.DNKH_APP.closeModal('modal-request-consultation')">Cancel</button>
        <button type="button" class="btn-dnkh primary" onclick="window.DNKH_APP.submitConsultationRequest()"><i class="fa-solid fa-paper-plane"></i> Send Consultation Request</button>
      </div>
    </div>
  </div>

  <!-- Verify Expertise Modal -->
  <div class="dnkh-modal-backdrop" id="modal-verify-expertise" role="dialog" aria-modal="true">
    <div class="dnkh-modal-container">
      <div class="dnkh-modal-header">
        <h3 class="dnkh-modal-title"><i class="fa-solid fa-stamp text-green"></i> Technical Reviewer - Verify SME Evidence</h3>
        <button type="button" class="btn-modal-close" onclick="window.DNKH_APP.closeModal('modal-verify-expertise')"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="dnkh-modal-body">
        <div style="background: var(--dn-surface); border: 1px solid var(--dn-border); border-radius: 6px; padding: 1rem; margin-bottom: 1rem; font-size: 0.82rem;">
          <p style="margin: 0 0 0.25rem 0;"><strong>Candidate:</strong> <span id="verify-expert-name"></span></p>
          <p style="margin: 0 0 0.25rem 0;"><strong>Discipline:</strong> <span id="verify-expert-area"></span></p>
          <p style="margin: 0;"><strong>Submitted Evidence:</strong> <span id="verify-expert-evidence"></span></p>
        </div>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Reviewer Verification Action *</label>
          <select id="verify-action" class="dnkh-form-select">
            <option value="Verified">Confirm Verification (Evidence Confirmed in Genba)</option>
            <option value="Revision Required">Request Additional Real Evidence (Practical Application Incomplete)</option>
            <option value="Expired">Mark as Expired (Re-certification Needed)</option>
          </select>
        </div>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Reviewer Technical Evaluation & Notes *</label>
          <textarea id="verify-notes" class="dnkh-form-textarea" rows="3" placeholder="Confirm real application, standards created, or reasons for requesting revision."></textarea>
        </div>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Next Revalidation Date</label>
          <input type="date" id="verify-next-date" class="dnkh-form-input">
        </div>
      </div>
      <div class="dnkh-modal-footer">
        <button type="button" class="btn-dnkh secondary" onclick="window.DNKH_APP.closeModal('modal-verify-expertise')">Cancel</button>
        <button type="button" class="btn-dnkh primary" onclick="window.DNKH_APP.submitExpertiseVerification()"><i class="fa-solid fa-check-double"></i> Save Verification Result</button>
      </div>
    </div>
  </div>

  <!-- Capability Self-Assessment & Review Modal -->
  <div class="dnkh-modal-backdrop" id="modal-capability-assessment" role="dialog" aria-modal="true">
    <div class="dnkh-modal-container">
      <div class="dnkh-modal-header">
        <h3 class="dnkh-modal-title"><i class="fa-solid fa-chart-line text-cyan"></i> Evidence-Based Capability Assessment</h3>
        <button type="button" class="btn-modal-close" onclick="window.DNKH_APP.closeModal('modal-capability-assessment')"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="dnkh-modal-body">
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Associate Name *</label>
          <input type="text" id="asm-emp-name" class="dnkh-form-input" value="Associate (Contributor)">
        </div>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Section & Topic *</label>
          <select id="asm-topic-select" class="dnkh-form-select"></select>
        </div>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Target Capability Level *</label>
          <select id="asm-level-select" class="dnkh-form-select">
            <option value="1">Level 1: Knowledge (Understands concept, terminology, purpose)</option>
            <option value="2">Level 2: Skill (Can execute under guidance or standard work)</option>
            <option value="3">Level 3: Experience (Applied in real operational project or case)</option>
            <option value="4">Level 4: Knowledge Sharing (Can standardize, mentor and teach)</option>
          </select>
        </div>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Observable Evidence Summary *</label>
          <textarea id="asm-evidence-text" class="dnkh-form-textarea" rows="3" placeholder="Cite specific deployed output, 8D case ID, training log, or standard authored. (Observable evidence required)"></textarea>
        </div>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Development Action Goal</label>
          <input type="text" id="asm-dev-action" class="dnkh-form-input" placeholder="e.g., Coach newly appointed team leaders on 4M change control">
        </div>
      </div>
      <div class="dnkh-modal-footer">
        <button type="button" class="btn-dnkh secondary" onclick="window.DNKH_APP.closeModal('modal-capability-assessment')">Cancel</button>
        <button type="button" class="btn-dnkh primary" onclick="window.DNKH_APP.submitCapabilityAssessment()"><i class="fa-solid fa-check"></i> Submit Assessment</button>
      </div>
    </div>
  </div>

  <!-- Live Record Draft Preview Modal -->
  <div class="dnkh-modal-backdrop" id="modal-preview-record" role="dialog" aria-modal="true">
    <div class="dnkh-modal-container">
      <div class="dnkh-modal-header">
        <h3 class="dnkh-modal-title"><i class="fa-solid fa-eye text-cyan"></i> Draft Knowledge Record Preview</h3>
        <button type="button" class="btn-modal-close" onclick="window.DNKH_APP.closeModal('modal-preview-record')"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="dnkh-modal-body" id="preview-record-modal-body"></div>
      <div class="dnkh-modal-footer">
        <button type="button" class="btn-dnkh secondary" onclick="window.DNKH_APP.closeModal('modal-preview-record')">Close Preview</button>
      </div>
    </div>
  </div>

  <!-- Review Center Action Modal -->
  <div class="dnkh-modal-backdrop" id="modal-review-action" role="dialog" aria-modal="true">
    <div class="dnkh-modal-container">
      <div class="dnkh-modal-header">
        <h3 class="dnkh-modal-title"><i class="fa-solid fa-clipboard-check text-green"></i> Review & Approval Decision</h3>
        <button type="button" class="btn-modal-close" onclick="window.DNKH_APP.closeModal('modal-review-action')"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="dnkh-modal-body">
        <div style="background: var(--dn-surface); border: 1px solid var(--dn-border); border-radius: 6px; padding: 1rem; margin-bottom: 1rem; font-size: 0.82rem;">
          <p style="margin: 0 0 0.25rem 0;"><strong>Record:</strong> <span id="rev-modal-record-title"></span></p>
          <p style="margin: 0 0 0.25rem 0;"><strong>Current Stage:</strong> <span id="rev-modal-record-step"></span></p>
          <p style="margin: 0;"><strong>Submitted By:</strong> <span id="rev-modal-record-author"></span></p>
        </div>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Decision Action *</label>
          <select id="rev-modal-decision-select" class="dnkh-form-select">
            <option value="Initial Check Pass">Pass Initial Check (Completeness Verified)</option>
            <option value="Technical Review Pass">Pass Technical Review (Technical Accuracy & Evidence Verified)</option>
            <option value="Revision Required">Request Revision (Feedback Required)</option>
            <option value="Final Approved">Final Head Section Approval & Authorize Publication</option>
            <option value="Rejected">Reject Record</option>
          </select>
        </div>
        <div class="dnkh-form-group">
          <label class="dnkh-form-label">Reviewer / Approver Comments *</label>
          <textarea id="rev-modal-comments" class="dnkh-form-textarea" rows="3" placeholder="Enter technical feedback, evidence verification remarks, or required corrections."></textarea>
        </div>
      </div>
      <div class="dnkh-modal-footer">
        <button type="button" class="btn-dnkh secondary" onclick="window.DNKH_APP.closeModal('modal-review-action')">Cancel</button>
        <button type="button" class="btn-dnkh primary" onclick="window.DNKH_APP.confirmReviewDecision()"><i class="fa-solid fa-check"></i> Submit Decision</button>
      </div>
    </div>
  </div>
`;

// Insert additionalModals before the guided-tour modal if not already present
if (!html.includes('id="modal-knowledge-graph"')) {
  html = html.replace('<!-- Interactive Guided Tour Modal -->', additionalModals + '\n  <!-- Interactive Guided Tour Modal -->');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated index.html!');
