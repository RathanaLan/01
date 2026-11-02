/**
 * PowerSupport Hub - Application JavaScript
 * Power Apps & Power Automate Architecture Simulator
 * 
 * Demonstrates:
 * - LocalStorage state persistence (simulating SharePoint Lists)
 * - Multi-stage approval workflow (simulating Power Automate)
 * - Dynamic Bootstrap 5 UI generation (simulating Power Apps Canvas UI)
 * - Complete audit history tracking
 */

// ============================================================================
// 1. CONSTANTS & INITIAL SAMPLE DATA
// ============================================================================

const STORAGE_KEY = 'power_app_support_requests';

// Active User Persona (Allows switching roles for easy demonstration)
let currentUser = {
  name: 'Alex Wilber',
  role: 'Requester',
  department: 'Operations',
  email: 'alex.wilber@contoso.com'
};

// Target Request ID currently being processed in the rejection modal
let pendingRejectionId = null;

// Initial realistic sample data (seeded automatically if localStorage is empty)
const INITIAL_SAMPLE_REQUESTS = [
  {
    id: 'REQ-1001',
    requesterName: 'Alex Wilber',
    department: 'Operations',
    email: 'alex.wilber@contoso.com',
    requestDate: '2026-10-24',
    category: 'Hardware',
    priority: 'Urgent',
    subject: 'Laptop battery swelling and overheating',
    description: 'The battery in my ThinkPad X1 has started swelling visibly under the trackpad and heats up significantly during normal video calls. Need a battery or device replacement as soon as possible.',
    attachmentName: 'battery_photo.jpg',
    status: 'Pending',
    approver: 'Adele Vance',
    approverComment: '',
    history: [
      {
        timestamp: '2026-10-24 09:15:32',
        action: 'Request Created',
        user: 'Alex Wilber',
        comment: 'Initial support request submitted with attachment.'
      },
      {
        timestamp: '2026-10-24 09:15:33',
        action: 'Submitted for Approval',
        user: 'System Workflow',
        comment: 'Approval task routed automatically to Adele Vance (IT Management).'
      }
    ]
  },
  {
    id: 'REQ-1002',
    requesterName: 'Megan Bowen',
    department: 'Finance & Accounting',
    email: 'megan.bowen@contoso.com',
    requestDate: '2026-10-22',
    category: 'Software Access',
    priority: 'Medium',
    subject: 'Power BI Pro license allocation for Q4 reporting',
    description: 'Require a Power BI Pro user license to build and publish the Q4 corporate cash flow and revenue dashboards to the Executive workspace.',
    attachmentName: 'finance_business_case.pdf',
    status: 'Approved',
    approver: 'Adele Vance',
    approverComment: 'Approved. License budget available under Finance IT cost center.',
    history: [
      {
        timestamp: '2026-10-22 14:02:10',
        action: 'Request Created',
        user: 'Megan Bowen',
        comment: 'Request logged for Power BI Pro license.'
      },
      {
        timestamp: '2026-10-22 14:02:11',
        action: 'Submitted for Approval',
        user: 'System Workflow',
        comment: 'Routed to departmental supervisor for budget verification.'
      },
      {
        timestamp: '2026-10-23 10:18:45',
        action: 'Approved by Supervisor',
        user: 'Adele Vance',
        comment: 'Approved. License budget available under Finance IT cost center.'
      }
    ]
  },
  {
    id: 'REQ-1003',
    requesterName: 'Diego Siciliani',
    department: 'Marketing & Sales',
    email: 'diego.siciliani@contoso.com',
    requestDate: '2026-10-21',
    category: 'Access Permissions',
    priority: 'High',
    subject: 'Production ERP direct database read-only access',
    description: 'Requesting read access to the production ERP SQL replica for customer lifetime value data extraction and campaign matching.',
    attachmentName: null,
    status: 'Rejected',
    approver: 'Adele Vance',
    approverComment: 'Direct database access violates data privacy policies. Please use the Power BI Data Mart or request an anonymized warehouse export.',
    history: [
      {
        timestamp: '2026-10-21 11:20:05',
        action: 'Request Created',
        user: 'Diego Siciliani',
        comment: 'Request submitted for production database credentials.'
      },
      {
        timestamp: '2026-10-21 11:20:06',
        action: 'Submitted for Approval',
        user: 'System Workflow',
        comment: 'Security policy review triggered.'
      },
      {
        timestamp: '2026-10-21 16:45:12',
        action: 'Rejected by Supervisor',
        user: 'Adele Vance',
        comment: 'Direct database access violates data privacy policies. Please use the Power BI Data Mart or request an anonymized warehouse export.'
      }
    ]
  },
  {
    id: 'REQ-1004',
    requesterName: 'Joni Sherman',
    department: 'Human Resources',
    email: 'joni.sherman@contoso.com',
    requestDate: '2026-10-18',
    category: 'Network / VPN',
    priority: 'Low',
    subject: 'Remote worker VPN certificate renewal',
    description: 'My corporate VPN certificate expires in 7 days. Need the certificate reissued and pushed to my laptop profile.',
    attachmentName: 'vpn_expiry_warning.png',
    status: 'Completed',
    approver: 'Adele Vance',
    approverComment: 'Approved and standard profile renewed.',
    history: [
      {
        timestamp: '2026-10-18 08:30:00',
        action: 'Request Created',
        user: 'Joni Sherman',
        comment: 'Ticket opened for VPN certificate renewal.'
      },
      {
        timestamp: '2026-10-18 08:30:01',
        action: 'Submitted for Approval',
        user: 'System Workflow',
        comment: 'Approval step bypassed or auto-authorized for standard IT maintenance.'
      },
      {
        timestamp: '2026-10-18 10:15:20',
        action: 'Approved by Supervisor',
        user: 'Adele Vance',
        comment: 'Approved and standard profile renewed.'
      },
      {
        timestamp: '2026-10-19 09:00:15',
        action: 'Marked Completed',
        user: 'IT Service Desk',
        comment: 'New digital certificate provisioned and verified active.'
      }
    ]
  },
  {
    id: 'REQ-1005',
    requesterName: 'Grady Archie',
    department: 'Information Technology',
    email: 'grady.archie@contoso.com',
    requestDate: '2026-10-25',
    category: 'Office Facilities',
    priority: 'Medium',
    subject: 'Ergonomic dual-monitor mounting arm installation',
    description: 'Requesting installation of dual-arm desk mounts for standard 27-inch monitors in Desk Pod 4 to improve ergonomics.',
    attachmentName: null,
    status: 'Pending',
    approver: 'Adele Vance',
    approverComment: '',
    history: [
      {
        timestamp: '2026-10-25 13:40:00',
        action: 'Request Created',
        user: 'Grady Archie',
        comment: 'Facilities support ticket submitted.'
      },
      {
        timestamp: '2026-10-25 13:40:01',
        action: 'Submitted for Approval',
        user: 'System Workflow',
        comment: 'Approval task dispatched to Facilities Supervisor.'
      }
    ]
  }
];

// In-memory cache of requests
let requestsData = [];

// ============================================================================
// 2. INITIALIZATION & DATA REPOSITORY
// ============================================================================

/**
 * Initializes the entire application on DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
  initStorage();
  initNewRequestFormDefaults();
  updateDashboard();
  renderMyRequestsTable(requestsData);
  renderApprovalQueue();
  renderGlobalHistory();
});

/**
 * Ensures localStorage has data; seeds initial 5 records if empty
 */
function initStorage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    requestsData = JSON.parse(JSON.stringify(INITIAL_SAMPLE_REQUESTS));
    saveToStorage();
  } else {
    try {
      requestsData = JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse localStorage data, re-seeding:', e);
      requestsData = JSON.parse(JSON.stringify(INITIAL_SAMPLE_REQUESTS));
      saveToStorage();
    }
  }
}

/**
 * Persists current in-memory requests array to localStorage
 */
function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requestsData));
}

/**
 * Formats current date and time in readable format: YYYY-MM-DD HH:MM:SS
 */
function getCurrentFormattedDateTime() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const yyyy = now.getFullYear();
  const mm = pad(now.getMonth() + 1);
  const dd = pad(now.getDate());
  const hh = pad(now.getHours());
  const min = pad(now.getMinutes());
  const ss = pad(now.getSeconds());
  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

/**
 * Calculates the next sequential Request ID (e.g., REQ-1006)
 */
function getNextRequestId() {
  if (!requestsData || requestsData.length === 0) {
    return 'REQ-1001';
  }
  let maxNum = 1000;
  requestsData.forEach(r => {
    const numPart = parseInt(r.id.replace('REQ-', ''), 10);
    if (!isNaN(numPart) && numPart > maxNum) {
      maxNum = numPart;
    }
  });
  return `REQ-${maxNum + 1}`;
}

// ============================================================================
// 3. NAVIGATION & VIEW SWITCHING
// ============================================================================

/**
 * Switches the active view/screen in the single-page application
 * @param {string} viewId - Name of view: 'dashboard', 'new-request', 'my-requests', 'approval', 'history'
 */
function navigateTo(viewId) {
  // Hide all view sections
  const sections = document.querySelectorAll('.view-section');
  sections.forEach(section => section.classList.add('d-none'));

  // Remove active class from all sidebar nav links
  const navLinks = document.querySelectorAll('.sidebar .nav-link');
  navLinks.forEach(link => link.classList.remove('active'));

  // Show selected section
  const targetSection = document.getElementById(`view-${viewId}`);
  if (targetSection) {
    targetSection.classList.remove('d-none');
  }

  // Highlight corresponding sidebar link
  const targetNavLink = document.getElementById(`nav-${viewId}`);
  if (targetNavLink) {
    targetNavLink.classList.add('active');
  }

  // Perform view-specific refresh actions
  if (viewId === 'dashboard') {
    updateDashboard();
  } else if (viewId === 'new-request') {
    initNewRequestFormDefaults();
  } else if (viewId === 'my-requests') {
    applyFilters();
  } else if (viewId === 'approval') {
    renderApprovalQueue();
  } else if (viewId === 'history') {
    renderGlobalHistory();
  }

  // Smooth scroll to top of page
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Changes active persona (Requester vs Supervisor) to test both user perspectives
 */
function switchPersona(name, role, department) {
  currentUser.name = name;
  currentUser.role = role;
  currentUser.department = department;
  currentUser.email = `${name.toLowerCase().replace(' ', '.')}@contoso.com`;

  document.getElementById('currentUserName').textContent = name;
  const roleBadge = document.getElementById('currentUserRole');
  roleBadge.textContent = role;

  if (role.includes('Supervisor') || role.includes('Approver')) {
    roleBadge.className = 'badge bg-success text-white';
  } else {
    roleBadge.className = 'badge bg-light text-primary';
  }

  // Pre-fill form if on new request view
  initNewRequestFormDefaults();

  showToast(`Switched active user to ${name} (${role})`, 'info');
}

// ============================================================================
// 4. DASHBOARD & KPI CALCULATIONS
// ============================================================================

/**
 * Calculates metrics and updates Dashboard KPI cards & recent requests
 */
function updateDashboard() {
  const total = requestsData.length;
  const pending = requestsData.filter(r => r.status === 'Pending').length;
  const approved = requestsData.filter(r => r.status === 'Approved').length;
  const rejected = requestsData.filter(r => r.status === 'Rejected').length;
  const completed = requestsData.filter(r => r.status === 'Completed').length;

  // Update KPI counters
  document.getElementById('kpiTotal').textContent = total;
  document.getElementById('kpiPending').textContent = pending;
  document.getElementById('kpiApproved').textContent = approved;
  document.getElementById('kpiRejected').textContent = rejected;
  document.getElementById('kpiCompleted').textContent = completed;

  // Update nav badge and quick button
  document.getElementById('pendingApprovalBadge').textContent = pending;
  document.getElementById('dashPendingBtnCount').textContent = pending;
  document.getElementById('approvalQueueCount').textContent = pending;

  // Render recent requests (most recent 5)
  renderRecentRequests();
}

/**
 * Renders the top 5 newest requests on the Dashboard table
 */
function renderRecentRequests() {
  const tbody = document.getElementById('recentRequestsTableBody');
  if (!tbody) return;

  // Clone and sort descending by ID
  const sorted = [...requestsData].reverse().slice(0, 5);

  if (sorted.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center py-4 text-muted">No support requests created yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = sorted.map(req => {
    return `
      <tr>
        <td class="fw-bold text-primary">${req.id}</td>
        <td>${req.requestDate}</td>
        <td>${escapeHtml(req.requesterName)}</td>
        <td><span class="badge bg-light text-dark border">${req.category}</span></td>
        <td class="text-truncate" style="max-width: 200px;" title="${escapeHtml(req.subject)}">${escapeHtml(req.subject)}</td>
        <td>${getPriorityBadgeHtml(req.priority)}</td>
        <td>${getStatusBadgeHtml(req.status)}</td>
        <td class="text-end">
          <button class="btn btn-outline-secondary btn-sm" onclick="openRequestDetails('${req.id}')" title="View Details">
            <i class="bi bi-eye"></i> Details
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

/**
 * Quick filter shortcut from KPI card click
 */
function filterAndNavigate(status) {
  navigateTo('my-requests');
  const statusSelect = document.getElementById('filterStatus');
  if (statusSelect) {
    statusSelect.value = status;
    applyFilters();
  }
}

// ============================================================================
// 5. NEW REQUEST FORM MANAGEMENT
// ============================================================================

/**
 * Pre-populates the New Request form with default values and auto-generated ID
 */
function initNewRequestFormDefaults() {
  const idField = document.getElementById('formRequestId');
  const dateField = document.getElementById('formRequestDate');
  const nameField = document.getElementById('formRequesterName');
  const deptField = document.getElementById('formDepartment');
  const emailField = document.getElementById('formEmail');

  if (idField) idField.value = getNextRequestId();

  if (dateField) {
    const today = new Date().toISOString().split('T')[0];
    dateField.value = today;
  }

  if (nameField && (!nameField.value || nameField.value === 'Alex Wilber' || nameField.value === 'Adele Vance')) {
    nameField.value = currentUser.name;
  }

  if (deptField && !deptField.value) {
    deptField.value = currentUser.department;
  }

  if (emailField && (!emailField.value || emailField.value.includes('@contoso.com'))) {
    emailField.value = currentUser.email;
  }
}

// Attached file name cache for simulator
let uploadedFileName = null;

function handleFilePlaceholder(event) {
  const fileInput = event.target;
  if (fileInput.files && fileInput.files[0]) {
    uploadedFileName = fileInput.files[0].name;
    document.getElementById('attachmentFileNameDisplay').innerHTML = `
      <span class="badge bg-success-subtle text-success">
        <i class="bi bi-paperclip"></i> Ready: ${escapeHtml(uploadedFileName)}
      </span>
    `;
  }
}

function clearAttachment() {
  const fileInput = document.getElementById('formAttachment');
  if (fileInput) fileInput.value = '';
  uploadedFileName = null;
  document.getElementById('attachmentFileNameDisplay').textContent =
    'Accepts simulated local file names (e.g. specs.pdf, error.png) to demonstrate SharePoint attachment storage.';
}

/**
 * Resets the new request form
 */
function resetRequestForm() {
  const form = document.getElementById('newRequestForm');
  form.reset();
  form.classList.remove('was-validated');
  clearAttachment();
  initNewRequestFormDefaults();
  showToast('Form reset to default values', 'info');
}

/**
 * Handles form validation and submission
 */
function handleFormSubmit(event) {
  event.preventDefault();
  const form = document.getElementById('newRequestForm');

  // Trigger Bootstrap validation UI
  if (!form.checkValidity()) {
    event.stopPropagation();
    form.classList.add('was-validated');
    showToast('Please complete all required fields correctly before submitting.', 'danger');
    return;
  }

  // Gather values
  const requestId = document.getElementById('formRequestId').value;
  const requestDate = document.getElementById('formRequestDate').value;
  const category = document.getElementById('formCategory').value;
  const requesterName = document.getElementById('formRequesterName').value.trim();
  const department = document.getElementById('formDepartment').value;
  const email = document.getElementById('formEmail').value.trim();
  const subject = document.getElementById('formSubject').value.trim();
  const description = document.getElementById('formDescription').value.trim();

  // Get selected priority radio value
  const priorityRadio = document.querySelector('input[name="formPriority"]:checked');
  const priority = priorityRadio ? priorityRadio.value : 'Medium';

  const nowTimestamp = getCurrentFormattedDateTime();

  // Construct new request object
  const newRequest = {
    id: requestId,
    requesterName: requesterName,
    department: department,
    email: email,
    requestDate: requestDate,
    category: category,
    priority: priority,
    subject: subject,
    description: description,
    attachmentName: uploadedFileName || null,
    status: 'Pending',
    approver: 'Adele Vance (Assigned)',
    approverComment: '',
    history: [
      {
        timestamp: nowTimestamp,
        action: 'Request Created',
        user: requesterName,
        comment: `Request created with ${priority} priority in category "${category}".`
      },
      {
        timestamp: nowTimestamp,
        action: 'Submitted for Approval',
        user: 'Power Automate Flow Simulator',
        comment: 'Approval step dispatched to supervisor queue.'
      }
    ]
  };

  // Add to storage
  requestsData.push(newRequest);
  saveToStorage();

  // Reset form
  form.reset();
  form.classList.remove('was-validated');
  clearAttachment();
  initNewRequestFormDefaults();

  // Update views
  updateDashboard();
  renderMyRequestsTable(requestsData);
  renderApprovalQueue();
  renderGlobalHistory();

  // Notify and navigate
  showToast(`Request ${requestId} submitted successfully! It is now pending approval.`, 'success');
  navigateTo('my-requests');
}

// ============================================================================
// 6. MY REQUESTS TABLE, SEARCH & FILTERS
// ============================================================================

/**
 * Applies search text and dropdown filters to My Requests table
 */
function applyFilters() {
  const searchTerm = (document.getElementById('filterSearch').value || '').toLowerCase().trim();
  const statusFilter = document.getElementById('filterStatus').value;
  const priorityFilter = document.getElementById('filterPriority').value;
  const categoryFilter = document.getElementById('filterCategory').value;

  const filtered = requestsData.filter(req => {
    // Search match across multiple fields
    const matchesSearch = !searchTerm ||
      req.id.toLowerCase().includes(searchTerm) ||
      req.subject.toLowerCase().includes(searchTerm) ||
      req.requesterName.toLowerCase().includes(searchTerm) ||
      req.category.toLowerCase().includes(searchTerm) ||
      req.description.toLowerCase().includes(searchTerm);

    // Status filter
    const matchesStatus = (statusFilter === 'ALL') || (req.status === statusFilter);

    // Priority filter
    const matchesPriority = (priorityFilter === 'ALL') || (req.priority === priorityFilter);

    // Category filter
    const matchesCategory = (categoryFilter === 'ALL') || (req.category === categoryFilter);

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  renderMyRequestsTable(filtered);
}

/**
 * Resets all table filters to default
 */
function clearFilters() {
  document.getElementById('filterSearch').value = '';
  document.getElementById('filterStatus').value = 'ALL';
  document.getElementById('filterPriority').value = 'ALL';
  document.getElementById('filterCategory').value = 'ALL';
  applyFilters();
}

/**
 * Renders requests inside the My Requests table
 * @param {Array} list - Array of request objects to display
 */
function renderMyRequestsTable(list) {
  const tbody = document.getElementById('myRequestsTableBody');
  const noDataAlert = document.getElementById('noRequestsFoundAlert');
  const countLabel = document.getElementById('requestsCountLabel');

  if (!tbody) return;

  countLabel.textContent = `Showing ${list.length} of ${requestsData.length} requests`;

  if (list.length === 0) {
    tbody.innerHTML = '';
    noDataAlert.classList.remove('d-none');
    return;
  }

  noDataAlert.classList.add('d-none');

  // Render rows
  tbody.innerHTML = list.map(req => {
    const approverDisplay = req.approver || '<span class="text-muted">Unassigned</span>';

    // Contextual action button
    let actionExtraButton = '';
    if (req.status === 'Approved') {
      actionExtraButton = `
        <button class="btn btn-outline-info btn-sm ms-1" onclick="markAsCompleted('${req.id}')" title="Mark as Completed">
          <i class="bi bi-check-all"></i> Complete
        </button>
      `;
    }

    return `
      <tr>
        <td class="fw-bold text-primary">${req.id}</td>
        <td><small class="text-secondary">${req.requestDate}</small></td>
        <td>
          <div class="fw-semibold text-dark">${escapeHtml(req.requesterName)}</div>
          <small class="text-muted">${escapeHtml(req.department)}</small>
        </td>
        <td><span class="badge bg-light text-dark border">${req.category}</span></td>
        <td>
          <div class="fw-semibold text-dark text-truncate" style="max-width: 220px;" title="${escapeHtml(req.subject)}">
            ${escapeHtml(req.subject)}
          </div>
          ${req.attachmentName ? `<small class="text-muted"><i class="bi bi-paperclip"></i> ${escapeHtml(req.attachmentName)}</small>` : ''}
        </td>
        <td>${getPriorityBadgeHtml(req.priority)}</td>
        <td>${getStatusBadgeHtml(req.status)}</td>
        <td><small class="text-secondary">${escapeHtml(approverDisplay)}</small></td>
        <td class="text-end">
          <div class="btn-group btn-group-sm">
            <button class="btn btn-outline-primary" onclick="openRequestDetails('${req.id}')" title="Inspect Request">
              <i class="bi bi-eye"></i> Details
            </button>
            ${actionExtraButton}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// ============================================================================
// 7. APPROVAL WORKFLOW ENGINE (SIMULATES POWER AUTOMATE)
// ============================================================================

/**
 * Renders all requests with status 'Pending' on the Approval page
 */
function renderApprovalQueue() {
  const container = document.getElementById('approvalListContainer');
  const emptyState = document.getElementById('approvalAllCaughtUp');
  const countBadge = document.getElementById('approvalQueueCount');

  if (!container) return;

  const pendingList = requestsData.filter(r => r.status === 'Pending');
  countBadge.textContent = pendingList.length;

  if (pendingList.length === 0) {
    container.innerHTML = '';
    emptyState.classList.remove('d-none');
    return;
  }

  emptyState.classList.add('d-none');

  container.innerHTML = pendingList.map(req => {
    return `
      <div class="card shadow-sm border-0 mb-3" id="approval-card-${req.id}">
        <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-warning text-dark px-2 py-1"><i class="bi bi-hourglass-split me-1"></i> Pending Approval</span>
            <h5 class="mb-0 fw-bold text-dark">${req.id}</h5>
            <span class="badge bg-light text-dark border">${req.category}</span>
          </div>
          <div class="d-flex align-items-center gap-2">
            ${getPriorityBadgeHtml(req.priority)}
            <small class="text-muted"><i class="bi bi-calendar3 me-1"></i> Submitted: ${req.requestDate}</small>
          </div>
        </div>

        <div class="card-body p-4">
          <!-- Requester metadata -->
          <div class="row g-2 mb-3 p-3 bg-light rounded">
            <div class="col-sm-4">
              <small class="text-muted d-block">Requester</small>
              <strong class="text-dark">${escapeHtml(req.requesterName)}</strong>
            </div>
            <div class="col-sm-4">
              <small class="text-muted d-block">Department</small>
              <span class="text-dark">${escapeHtml(req.department)}</span>
            </div>
            <div class="col-sm-4">
              <small class="text-muted d-block">Contact Email</small>
              <span class="text-dark">${escapeHtml(req.email)}</span>
            </div>
          </div>

          <!-- Subject and Description -->
          <h5 class="fw-bold text-dark mb-2">${escapeHtml(req.subject)}</h5>
          <p class="text-secondary mb-3" style="white-space: pre-wrap;">${escapeHtml(req.description)}</p>

          ${req.attachmentName ? `
            <div class="p-2 border rounded bg-white mb-3 d-inline-flex align-items-center gap-2">
              <i class="bi bi-paperclip text-primary fs-5"></i>
              <span class="small fw-semibold text-secondary">${escapeHtml(req.attachmentName)}</span>
            </div>
          ` : ''}

          <!-- Approver Comments Input Area -->
          <div class="mb-3">
            <label for="approvalComment-${req.id}" class="form-label fw-semibold small text-dark">
              Approver Notes / Comments:
            </label>
            <textarea class="form-control" id="approvalComment-${req.id}" rows="2" placeholder="Add decision comments, conditions, or budget allocation notes..."></textarea>
          </div>

          <!-- Action Buttons -->
          <div class="d-flex justify-content-end gap-2 pt-2 border-top">
            <button class="btn btn-outline-secondary btn-sm" onclick="openRequestDetails('${req.id}')">
              <i class="bi bi-journal-text me-1"></i> View Full Details
            </button>
            <button class="btn btn-outline-danger btn-sm" onclick="promptRejection('${req.id}')">
              <i class="bi bi-x-circle me-1"></i> Reject
            </button>
            <button class="btn btn-success btn-sm px-3 fw-semibold" onclick="approveRequest('${req.id}')">
              <i class="bi bi-check2-circle me-1"></i> Approve
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Handles Approver clicking "Approve"
 * Updates status to Approved, appends to history log, updates localStorage
 */
function approveRequest(requestId) {
  const req = requestsData.find(r => r.id === requestId);
  if (!req) return;

  const commentInput = document.getElementById(`approvalComment-${requestId}`);
  const approverComment = commentInput && commentInput.value.trim() ? commentInput.value.trim() : 'Approved by supervisor.';

  const approverName = currentUser.name.includes('Adele') ? currentUser.name : 'Adele Vance (Supervisor)';
  const nowTimestamp = getCurrentFormattedDateTime();

  // Update status & metadata
  req.status = 'Approved';
  req.approver = approverName;
  req.approverComment = approverComment;

  // Append immutable history record
  req.history.push({
    timestamp: nowTimestamp,
    action: 'Approved by Supervisor',
    user: approverName,
    comment: approverComment
  });

  saveToStorage();
  updateDashboard();
  renderApprovalQueue();
  renderMyRequestsTable(requestsData);
  renderGlobalHistory();

  showToast(`Request ${requestId} was successfully APPROVED!`, 'success');
}

/**
 * Opens rejection modal and requires the supervisor to enter a reason
 */
function promptRejection(requestId) {
  pendingRejectionId = requestId;
  document.getElementById('rejectTargetRequestId').textContent = requestId;
  const reasonTextarea = document.getElementById('rejectReasonTextarea');
  reasonTextarea.value = '';
  document.getElementById('rejectReasonFeedback').classList.add('d-none');

  const rejectionModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('rejectionModal'));
  rejectionModal.show();
}

/**
 * Validates and confirms rejection
 */
function confirmRejectionSubmission() {
  const reason = document.getElementById('rejectReasonTextarea').value.trim();
  const feedback = document.getElementById('rejectReasonFeedback');

  if (!reason) {
    feedback.classList.remove('d-none');
    return;
  }

  feedback.classList.add('d-none');

  const req = requestsData.find(r => r.id === pendingRejectionId);
  if (!req) return;

  const approverName = currentUser.name.includes('Adele') ? currentUser.name : 'Adele Vance (Supervisor)';
  const nowTimestamp = getCurrentFormattedDateTime();

  // Update status & metadata
  req.status = 'Rejected';
  req.approver = approverName;
  req.approverComment = reason;

  // Append history entry
  req.history.push({
    timestamp: nowTimestamp,
    action: 'Rejected by Supervisor',
    user: approverName,
    comment: reason
  });

  saveToStorage();

  // Close modal
  const modalEl = document.getElementById('rejectionModal');
  const modalInstance = bootstrap.Modal.getInstance(modalEl);
  if (modalInstance) {
    modalInstance.hide();
  }

  updateDashboard();
  renderApprovalQueue();
  renderMyRequestsTable(requestsData);
  renderGlobalHistory();

  showToast(`Request ${pendingRejectionId} has been REJECTED. Reason logged in audit trail.`, 'danger');
  pendingRejectionId = null;
}

/**
 * Marks an Approved request as "Completed"
 */
function markAsCompleted(requestId) {
  const req = requestsData.find(r => r.id === requestId);
  if (!req) return;

  const nowTimestamp = getCurrentFormattedDateTime();
  req.status = 'Completed';

  req.history.push({
    timestamp: nowTimestamp,
    action: 'Marked Completed',
    user: currentUser.name,
    comment: 'All fulfillment actions and provisioning have been completed.'
  });

  saveToStorage();
  updateDashboard();
  renderMyRequestsTable(requestsData);
  renderGlobalHistory();

  // If detail modal is open, refresh it
  const modalEl = document.getElementById('requestDetailModal');
  if (modalEl.classList.contains('show')) {
    openRequestDetails(requestId);
  }

  showToast(`Request ${requestId} has been marked as COMPLETED!`, 'info');
}

// ============================================================================
// 8. REQUEST DETAILS MODAL & LIFECYCLE TIMELINE
// ============================================================================

/**
 * Opens detailed modal with dynamic visual timeline stepper and audit history accordion
 */
function openRequestDetails(requestId) {
  const req = requestsData.find(r => r.id === requestId);
  if (!req) return;

  // Header badges
  document.getElementById('modalRequestIdBadge').textContent = req.id;
  document.getElementById('modalRequesterName').textContent = req.requesterName;
  document.getElementById('modalDepartment').textContent = req.department;
  document.getElementById('modalEmail').textContent = req.email;
  document.getElementById('modalDate').textContent = req.requestDate;
  document.getElementById('modalCategory').textContent = req.category;
  document.getElementById('modalPriorityBadge').outerHTML = getPriorityBadgeHtml(req.priority, 'modalPriorityBadge');
  document.getElementById('modalStatusBadge').outerHTML = getStatusBadgeHtml(req.status, 'modalStatusBadge');
  document.getElementById('modalApprover').textContent = req.approver || 'Unassigned';

  // Subject and description
  document.getElementById('modalSubject').textContent = req.subject;
  document.getElementById('modalDescription').textContent = req.description;

  // Attachment display
  const attachText = document.getElementById('modalAttachmentText');
  if (req.attachmentName) {
    attachText.innerHTML = `<strong>${escapeHtml(req.attachmentName)}</strong> <span class="text-muted">(Stored attachment placeholder)</span>`;
  } else {
    attachText.textContent = 'No file attached with this request.';
  }

  // Render Visual Timeline Stepper
  renderTimelineStepper(req);

  // Render History in Accordion
  renderModalHistory(req);

  // Modal context actions (e.g. Mark Completed button if Approved)
  const contextActions = document.getElementById('modalContextActions');
  if (req.status === 'Approved') {
    contextActions.innerHTML = `
      <button class="btn btn-info text-white" onclick="markAsCompleted('${req.id}')">
        <i class="bi bi-patch-check me-1"></i> Complete Fulfillment
      </button>
    `;
  } else if (req.status === 'Pending') {
    contextActions.innerHTML = `
      <button class="btn btn-outline-success btn-sm me-1" onclick="approveRequest('${req.id}'); openRequestDetails('${req.id}');">
        <i class="bi bi-check-circle me-1"></i> Quick Approve
      </button>
      <button class="btn btn-outline-danger btn-sm" onclick="promptRejection('${req.id}')">
        <i class="bi bi-x-circle me-1"></i> Quick Reject
      </button>
    `;
  } else {
    contextActions.innerHTML = '';
  }

  // Show Modal using Bootstrap getOrCreateInstance
  const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('requestDetailModal'));
  modal.show();
}

/**
 * Builds the visual 4-step progress stepper:
 * Submitted -> Pending Approval -> Approved/Rejected -> Completed
 */
function renderTimelineStepper(req) {
  const stepperContainer = document.getElementById('modalTimelineStepper');
  if (!stepperContainer) return;

  const status = req.status;

  // Step 1: Submitted (always completed)
  let step1Class = 'completed';
  let step1Icon = '<i class="bi bi-check-lg"></i>';

  // Step 2: Pending Approval
  let step2Class = 'completed';
  let step2Icon = '<i class="bi bi-check-lg"></i>';

  // Step 3: Approved / Rejected
  let step3Class = '';
  let step3Icon = '3';
  let step3Label = 'Approved / Rejected';

  // Step 4: Completed
  let step4Class = '';
  let step4Icon = '4';

  if (status === 'Pending') {
    step2Class = 'active';
    step2Icon = '<i class="bi bi-hourglass-split"></i>';
    step3Icon = '3';
    step4Icon = '4';
  } else if (status === 'Approved') {
    step3Class = 'completed';
    step3Icon = '<i class="bi bi-check-lg"></i>';
    step3Label = 'Approved';
    step4Class = 'active';
  } else if (status === 'Rejected') {
    step3Class = 'rejected';
    step3Icon = '<i class="bi bi-x-lg"></i>';
    step3Label = 'Rejected';
    step4Class = 'text-muted';
  } else if (status === 'Completed') {
    step3Class = 'completed';
    step3Icon = '<i class="bi bi-check-lg"></i>';
    step3Label = 'Approved';
    step4Class = 'completed';
    step4Icon = '<i class="bi bi-patch-check-fill"></i>';
  }

  stepperContainer.innerHTML = `
    <!-- Step 1 -->
    <div class="timeline-step ${step1Class}">
      <div class="timeline-step-circle">${step1Icon}</div>
      <span class="timeline-step-label">Submitted</span>
      <span class="timeline-step-date">${req.requestDate}</span>
    </div>

    <!-- Step 2 -->
    <div class="timeline-step ${step2Class}">
      <div class="timeline-step-circle">${step2Icon}</div>
      <span class="timeline-step-label">Pending Approval</span>
      <span class="timeline-step-date">${status === 'Pending' ? 'In Review' : 'Verified'}</span>
    </div>

    <!-- Step 3 -->
    <div class="timeline-step ${step3Class}">
      <div class="timeline-step-circle">${step3Icon}</div>
      <span class="timeline-step-label">${step3Label}</span>
      <span class="timeline-step-date">${req.approverComment ? 'Decided' : 'Waiting'}</span>
    </div>

    <!-- Step 4 -->
    <div class="timeline-step ${step4Class}">
      <div class="timeline-step-circle">${step4Icon}</div>
      <span class="timeline-step-label">Completed</span>
      <span class="timeline-step-date">${status === 'Completed' ? 'Closed' : 'Pending'}</span>
    </div>
  `;
}

/**
 * Populates the history list inside the modal accordion
 */
function renderModalHistory(req) {
  const historyList = document.getElementById('modalHistoryList');
  const countSpan = document.getElementById('modalHistoryCount');
  if (!historyList) return;

  const history = req.history || [];
  countSpan.textContent = history.length;

  historyList.innerHTML = history.map((item, index) => {
    let iconClass = 'bi-circle-fill text-secondary';
    if (item.action.includes('Created')) iconClass = 'bi-plus-circle-fill text-primary';
    if (item.action.includes('Submitted')) iconClass = 'bi-send-fill text-warning';
    if (item.action.includes('Approved')) iconClass = 'bi-check-circle-fill text-success';
    if (item.action.includes('Rejected')) iconClass = 'bi-x-circle-fill text-danger';
    if (item.action.includes('Completed')) iconClass = 'bi-patch-check-fill text-info';

    return `
      <li class="list-group-item px-3 py-3">
        <div class="d-flex justify-content-between align-items-center mb-1">
          <div class="d-flex align-items-center gap-2">
            <i class="bi ${iconClass}"></i>
            <strong class="text-dark">${escapeHtml(item.action)}</strong>
          </div>
          <small class="text-muted"><i class="bi bi-clock me-1"></i>${item.timestamp}</small>
        </div>
        <div class="small text-secondary ps-4 mb-1">
          <strong>Actor:</strong> ${escapeHtml(item.user)}
        </div>
        <div class="small text-muted ps-4 fst-italic">
          "${escapeHtml(item.comment || 'No comment provided')}"
        </div>
      </li>
    `;
  }).join('');
}

// ============================================================================
// 9. GLOBAL AUDIT HISTORY VIEW
// ============================================================================

/**
 * Gathers history logs across all requests and presents them in chronological order
 */
function renderGlobalHistory() {
  const tbody = document.getElementById('globalHistoryTableBody');
  if (!tbody) return;

  // Flatten history with parent request info
  const allEvents = [];
  requestsData.forEach(req => {
    (req.history || []).forEach(evt => {
      allEvents.push({
        requestId: req.id,
        timestamp: evt.timestamp,
        action: evt.action,
        user: evt.user,
        comment: evt.comment
      });
    });
  });

  // Sort descending by timestamp
  allEvents.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  if (allEvents.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">No historical events logged yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = allEvents.map(evt => {
    let badgeClass = 'bg-secondary';
    if (evt.action.includes('Created')) badgeClass = 'bg-primary';
    if (evt.action.includes('Submitted')) badgeClass = 'bg-warning text-dark';
    if (evt.action.includes('Approved')) badgeClass = 'bg-success';
    if (evt.action.includes('Rejected')) badgeClass = 'bg-danger';
    if (evt.action.includes('Completed')) badgeClass = 'bg-info text-dark';

    return `
      <tr>
        <td><small class="text-secondary fw-semibold">${evt.timestamp}</small></td>
        <td><span class="badge bg-light text-primary border">${evt.requestId}</span></td>
        <td><span class="badge ${badgeClass}">${evt.action}</span></td>
        <td><span class="fw-semibold text-dark">${escapeHtml(evt.user)}</span></td>
        <td class="text-secondary small">${escapeHtml(evt.comment || '-')}</td>
        <td class="text-end">
          <button class="btn btn-link btn-sm p-0 text-decoration-none" onclick="openRequestDetails('${evt.requestId}')">
            View <i class="bi bi-chevron-right"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// ============================================================================
// 10. UI HELPERS, BADGES & NOTIFICATIONS
// ============================================================================

/**
 * Returns HTML badge for status
 */
function getStatusBadgeHtml(status, elementId = '') {
  const idAttr = elementId ? `id="${elementId}"` : '';
  switch (status) {
    case 'Pending':
      return `<span ${idAttr} class="badge bg-warning text-dark badge-status"><i class="bi bi-hourglass-split me-1"></i>Pending</span>`;
    case 'Approved':
      return `<span ${idAttr} class="badge bg-success badge-status"><i class="bi bi-check-circle me-1"></i>Approved</span>`;
    case 'Rejected':
      return `<span ${idAttr} class="badge bg-danger badge-status"><i class="bi bi-x-circle me-1"></i>Rejected</span>`;
    case 'Completed':
      return `<span ${idAttr} class="badge bg-info text-dark badge-status"><i class="bi bi-patch-check me-1"></i>Completed</span>`;
    default:
      return `<span ${idAttr} class="badge bg-secondary badge-status">${escapeHtml(status)}</span>`;
  }
}

/**
 * Returns HTML badge for priority
 */
function getPriorityBadgeHtml(priority, elementId = '') {
  const idAttr = elementId ? `id="${elementId}"` : '';
  switch (priority) {
    case 'Low':
      return `<span ${idAttr} class="badge bg-secondary">Low</span>`;
    case 'Medium':
      return `<span ${idAttr} class="badge bg-info text-dark">Medium</span>`;
    case 'High':
      return `<span ${idAttr} class="badge bg-warning text-dark">High</span>`;
    case 'Urgent':
      return `<span ${idAttr} class="badge bg-danger">Urgent</span>`;
    default:
      return `<span ${idAttr} class="badge bg-light text-dark">${escapeHtml(priority)}</span>`;
  }
}

/**
 * Displays Bootstrap Toast notification
 * @param {string} message - Notification text
 * @param {string} type - 'success' | 'danger' | 'warning' | 'info'
 */
function showToast(message, type = 'info') {
  const toastEl = document.getElementById('appToast');
  const toastMsg = document.getElementById('toastMessage');
  const toastIcon = document.getElementById('toastIcon');

  if (!toastEl) return;

  toastMsg.textContent = message;

  // Set colors and icons
  toastEl.className = 'toast align-items-center text-white border-0 shadow';
  if (type === 'success') {
    toastEl.classList.add('bg-success');
    toastIcon.className = 'bi bi-check-circle-fill fs-5';
  } else if (type === 'danger') {
    toastEl.classList.add('bg-danger');
    toastIcon.className = 'bi bi-x-circle-fill fs-5';
  } else if (type === 'warning') {
    toastEl.classList.add('bg-warning', 'text-dark');
    toastIcon.className = 'bi bi-exclamation-triangle-fill fs-5 text-dark';
  } else {
    toastEl.classList.add('bg-primary');
    toastIcon.className = 'bi bi-info-circle-fill fs-5';
  }

  const toast = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 4000 });
  toast.show();
}

/**
 * Resets demo data to initial 5 sample records
 */
function resetDemoDataPrompt() {
  const confirmModalEl = document.getElementById('confirmationModal');
  const modalBody = document.getElementById('confirmationModalBody');
  const confirmBtn = document.getElementById('confirmationModalConfirmBtn');

  modalBody.innerHTML = `
    <p>Are you sure you want to reset all data back to the default sample requests?</p>
    <p class="text-danger small mb-0"><i class="bi bi-exclamation-triangle-fill me-1"></i> Any newly created or modified requests will be replaced.</p>
  `;

  const modal = bootstrap.Modal.getOrCreateInstance(confirmModalEl);

  // Assign one-time click handler
  confirmBtn.onclick = function() {
    localStorage.removeItem(STORAGE_KEY);
    initStorage();
    initNewRequestFormDefaults();
    updateDashboard();
    renderMyRequestsTable(requestsData);
    renderApprovalQueue();
    renderGlobalHistory();
    modal.hide();
    showToast('Demo data reset to original 5 sample requests!', 'info');
  };

  modal.show();
}

/**
 * Escapes HTML to protect against XSS when rendering user input strings
 */
function escapeHtml(text) {
  if (text === null || text === undefined) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
