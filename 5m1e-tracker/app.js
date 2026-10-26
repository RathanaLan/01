const { useState, useEffect, useRef } = React;

// -------------------------------------------------------------
// Sample Initial Data for Production Lines
// -------------------------------------------------------------
const INITIAL_RECORDS = [
  {
    id: "LOG-2026-001",
    timestamp: "2026-10-01 06:30",
    line: "LINE-01",
    shift: "SHIFT-A",
    workOrder: "WO-98442",
    partNumber: "PCB-MAIN-V4",
    eventType: "Change Point",
    severity: "Warning",
    primaryDimension: "Man",
    summary: "Operator rotation at SMT solder paste inspection station",
    man: {
      operator: "John Doe (EMP-4102)",
      skillLevel: "Tier 2",
      certified: true,
      notes: "First time operating Station #2 this week; supervisor shadowed for 30 mins."
    },
    machine: {
      stationId: "SMT-PRINT-01",
      status: "Running",
      temperature: 24.5,
      pressure: 0.52,
      rpm: 0,
      toolLife: 1420
    },
    material: {
      partNumber: "PASTE-SAC305",
      lotNumber: "LOT-20260928-A",
      supplier: "Alpha Solder Tech",
      coaVerified: true,
      notes: "Paste jar warmed to room temperature for 4 hrs before unsealing."
    },
    method: {
      sopNumber: "SOP-SMT-004 Rev 3",
      recipeId: "RECIPE_FINE_PITCH_02",
      stdCycleTime: 35,
      actCycleTime: 38,
      notes: "Squeegee speed adjusted from 45mm/s to 40mm/s for better aperture filling."
    },
    measurement: {
      toolId: "SPI-CYBEROPTICS-01",
      calibrationDue: "2026-12-15",
      feature: "Solder Height (um)",
      nominal: 130,
      lsl: 100,
      usl: 160,
      measured: 142,
      inSpec: true
    },
    environment: {
      temp: 23.2,
      humidity: 48,
      esdGrounding: "Pass",
      cleanroomClass: "ISO 7"
    }
  },
  {
    id: "LOG-2026-002",
    timestamp: "2026-10-01 07:15",
    line: "LINE-02",
    shift: "SHIFT-A",
    workOrder: "WO-98450",
    partNumber: "HOUSING-ALUM-88",
    eventType: "Abnormality",
    severity: "Critical",
    primaryDimension: "Machine",
    summary: "CNC spindle bearing temperature spike & chattering vibration",
    man: {
      operator: "Sarah Connor (EMP-1088)",
      skillLevel: "Tier 4 (Master)",
      certified: true,
      notes: "Immediately engaged e-stop when acoustic chattering occurred."
    },
    machine: {
      stationId: "CNC-MILL-04",
      status: "Interlock Trip",
      temperature: 78.4,
      pressure: 6.8,
      rpm: 12000,
      toolLife: 8900
    },
    material: {
      partNumber: "BILLET-6061-T6",
      lotNumber: "LOT-AL-5502",
      supplier: "Kaiser Alloys",
      coaVerified: true,
      notes: "Hardness test in-spec (95 HB)."
    },
    method: {
      sopNumber: "SOP-CNC-ROUGH-01",
      recipeId: "PROG_O0881_CAM",
      stdCycleTime: 120,
      actCycleTime: 145,
      notes: "Feed rate overridden at 110% before trip occurred."
    },
    measurement: {
      toolId: "CMM-ZEISS-02",
      calibrationDue: "2026-11-01",
      feature: "Pocket Depth (mm)",
      nominal: 15.00,
      lsl: 14.95,
      usl: 15.05,
      measured: 15.18,
      inSpec: false
    },
    environment: {
      temp: 26.8,
      humidity: 55,
      esdGrounding: "N/A",
      cleanroomClass: "General Shop Floor"
    }
  },
  {
    id: "LOG-2026-003",
    timestamp: "2026-10-01 07:45",
    line: "LINE-03",
    shift: "SHIFT-A",
    workOrder: "WO-98455",
    partNumber: "OPTIC-LENS-M3",
    eventType: "Change Point",
    severity: "Warning",
    primaryDimension: "Environment",
    summary: "Cleanroom humidity dropped below ESD control threshold",
    man: {
      operator: "David Kim (EMP-3120)",
      skillLevel: "Tier 3",
      certified: true,
      notes: "Checked wrist-strap monitors; audible alert sounded."
    },
    machine: {
      stationId: "CLEANROOM-AHU-02",
      status: "Running",
      temperature: 21.0,
      pressure: 25.0,
      rpm: 1800,
      toolLife: 0
    },
    material: {
      partNumber: "LENS-SAPPHIRE-B",
      lotNumber: "LOT-SAP-9011",
      supplier: "Apex Optical",
      coaVerified: true,
      notes: "Sensitive to electrostatic particulate attraction."
    },
    method: {
      sopNumber: "SOP-CLEAN-001",
      recipeId: "STANDARD_FLOW",
      stdCycleTime: 60,
      actCycleTime: 60,
      notes: "HVAC humidifier steam valve stuck at 15% open."
    },
    measurement: {
      toolId: "VAISALA-HUM-SENSOR",
      calibrationDue: "2027-01-10",
      feature: "Relative Humidity (%RH)",
      nominal: 45,
      lsl: 40,
      usl: 60,
      measured: 32,
      inSpec: false
    },
    environment: {
      temp: 21.2,
      humidity: 32,
      esdGrounding: "Warning",
      cleanroomClass: "ISO 5"
    }
  },
  {
    id: "LOG-2026-004",
    timestamp: "2026-10-01 08:00",
    line: "LINE-01",
    shift: "SHIFT-A",
    workOrder: "WO-98460",
    partNumber: "SENSOR-MODULE-X",
    eventType: "Routine Check",
    severity: "Normal",
    primaryDimension: "Measurement",
    summary: "Hourly standard inspection all CTQ specs verified nominal",
    man: {
      operator: "Elena Rostova (EMP-2291)",
      skillLevel: "Tier 3",
      certified: true,
      notes: "Full line run at nominal cadence."
    },
    machine: {
      stationId: "SMT-LINE-ALL",
      status: "Running",
      temperature: 23.0,
      pressure: 0.6,
      rpm: 0,
      toolLife: 2300
    },
    material: {
      partNumber: "PASSIVES-0402",
      lotNumber: "LOT-MURATA-998",
      supplier: "Murata Mfg",
      coaVerified: true,
      notes: "Reels spliced without feeder jams."
    },
    method: {
      sopNumber: "SOP-ASSY-009",
      recipeId: "STD_PROD_RUN",
      stdCycleTime: 42,
      actCycleTime: 41,
      notes: "All checkpoints passed."
    },
    measurement: {
      toolId: "AOI-KOH-YOUNG",
      calibrationDue: "2026-10-25",
      feature: "Component Coplanarity",
      nominal: 0.05,
      lsl: 0.00,
      usl: 0.10,
      measured: 0.04,
      inSpec: true
    },
    environment: {
      temp: 22.8,
      humidity: 50,
      esdGrounding: "Pass",
      cleanroomClass: "ISO 7"
    }
  }
];

function App() {
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem("5m1e_records");
    return saved ? JSON.parse(saved) : INITIAL_RECORDS;
  });

  const [activeTab, setActiveTab] = useState("dashboard"); // 'dashboard' | 'new-entry' | 'fishbone' | 'analytics'
  const [selectedLine, setSelectedLine] = useState("ALL");
  const [selectedShift, setSelectedShift] = useState("ALL");
  const [selectedDimension, setSelectedDimension] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFishboneRecord, setActiveFishboneRecord] = useState(null);

  // Form State
  const [formStep, setFormStep] = useState("man");
  const [formData, setFormData] = useState({
    line: "LINE-01",
    shift: "SHIFT-A",
    workOrder: "",
    partNumber: "",
    eventType: "Change Point",
    severity: "Warning",
    primaryDimension: "Man",
    summary: "",
    // Man
    operator: "",
    skillLevel: "Tier 2",
    certified: true,
    manNotes: "",
    // Machine
    stationId: "",
    machineStatus: "Running",
    temperature: 24.0,
    pressure: 0.5,
    rpm: 0,
    toolLife: 0,
    // Material
    materialPart: "",
    lotNumber: "",
    supplier: "",
    coaVerified: true,
    materialNotes: "",
    // Method
    sopNumber: "",
    recipeId: "",
    stdCycleTime: 30,
    actCycleTime: 30,
    methodNotes: "",
    // Measurement
    toolId: "",
    calibrationDue: "",
    feature: "",
    nominal: 10.0,
    lsl: 9.8,
    usl: 10.2,
    measured: 10.0,
    // Environment
    envTemp: 22.5,
    envHumidity: 50,
    esdGrounding: "Pass",
    cleanroomClass: "ISO 7"
  });

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem("5m1e_records", JSON.stringify(records));
  }, [records]);

  // Set default fishbone record to first abnormality or first record
  useEffect(() => {
    if (!activeFishboneRecord && records.length > 0) {
      const abnormal = records.find(r => r.eventType === "Abnormality") || records[0];
      setActiveFishboneRecord(abnormal);
    }
  }, [records, activeFishboneRecord]);

  // Filtering
  const filteredRecords = records.filter(r => {
    if (selectedLine !== "ALL" && r.line !== selectedLine) return false;
    if (selectedShift !== "ALL" && r.shift !== selectedShift) return false;
    if (selectedDimension !== "ALL" && r.primaryDimension.toUpperCase() !== selectedDimension) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const match =
        r.id.toLowerCase().includes(q) ||
        r.workOrder.toLowerCase().includes(q) ||
        r.partNumber.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        r.man.operator.toLowerCase().includes(q) ||
        r.machine.stationId.toLowerCase().includes(q) ||
        r.material.lotNumber.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // KPI Calculations
  const totalLogs = records.length;
  const changePoints = records.filter(r => r.eventType === "Change Point").length;
  const abnormalities = records.filter(r => r.eventType === "Abnormality").length;
  const criticals = records.filter(r => r.severity === "Critical").length;
  const outOfSpec = records.filter(r => !r.measurement.inSpec).length;

  // Handle Form Change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Handle Form Submit
  const handleSaveRecord = (e) => {
    e.preventDefault();
    if (!formData.workOrder || !formData.summary) {
      alert("Please fill in the Work Order and Event Summary.");
      return;
    }

    const measuredVal = parseFloat(formData.measured) || 0;
    const uslVal = parseFloat(formData.usl) || 0;
    const lslVal = parseFloat(formData.lsl) || 0;
    const inSpec = measuredVal >= lslVal && measuredVal <= uslVal;

    const newRecord = {
      id: `LOG-${new Date().getFullYear()}-${String(records.length + 1).padStart(3, "0")}`,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
      line: formData.line,
      shift: formData.shift,
      workOrder: formData.workOrder,
      partNumber: formData.partNumber || "N/A",
      eventType: formData.eventType,
      severity: formData.severity,
      primaryDimension: formData.primaryDimension,
      summary: formData.summary,
      man: {
        operator: formData.operator || "Not Assigned",
        skillLevel: formData.skillLevel,
        certified: formData.certified,
        notes: formData.manNotes
      },
      machine: {
        stationId: formData.stationId || "STATION-GEN",
        status: formData.machineStatus,
        temperature: parseFloat(formData.temperature) || 0,
        pressure: parseFloat(formData.pressure) || 0,
        rpm: parseFloat(formData.rpm) || 0,
        toolLife: parseInt(formData.toolLife) || 0
      },
      material: {
        partNumber: formData.materialPart || "N/A",
        lotNumber: formData.lotNumber || "N/A",
        supplier: formData.supplier || "N/A",
        coaVerified: formData.coaVerified,
        notes: formData.materialNotes
      },
      method: {
        sopNumber: formData.sopNumber || "SOP-STD-001",
        recipeId: formData.recipeId || "DEFAULT",
        stdCycleTime: parseFloat(formData.stdCycleTime) || 0,
        actCycleTime: parseFloat(formData.actCycleTime) || 0,
        notes: formData.methodNotes
      },
      measurement: {
        toolId: formData.toolId || "GAUGE-01",
        calibrationDue: formData.calibrationDue || "2026-12-31",
        feature: formData.feature || "General",
        nominal: parseFloat(formData.nominal) || 0,
        lsl: lslVal,
        usl: uslVal,
        measured: measuredVal,
        inSpec: inSpec
      },
      environment: {
        temp: parseFloat(formData.envTemp) || 0,
        humidity: parseFloat(formData.envHumidity) || 0,
        esdGrounding: formData.esdGrounding,
        cleanroomClass: formData.cleanroomClass
      }
    };

    const updated = [newRecord, ...records];
    setRecords(updated);
    setActiveFishboneRecord(newRecord);
    setActiveTab("dashboard");
  };

  // Export Data to CSV
  const exportToCSV = () => {
    const headers = [
      "ID", "Timestamp", "Line", "Shift", "WorkOrder", "PartNumber", "EventType", "Severity", 
      "PrimaryDimension", "Summary", "Operator", "StationId", "LotNumber", "SOP", "Measured", "InSpec", "TempC", "HumidityRH"
    ];
    const rows = records.map(r => [
      r.id,
      r.timestamp,
      r.line,
      r.shift,
      r.workOrder,
      r.partNumber,
      r.eventType,
      r.severity,
      r.primaryDimension,
      `"${r.summary.replace(/"/g, '""')}"`,
      `"${r.man.operator}"`,
      r.machine.stationId,
      r.material.lotNumber,
      r.method.sopNumber,
      r.measurement.measured,
      r.measurement.inSpec,
      r.environment.temp,
      r.environment.humidity
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `5M1E_Production_Report_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getDimensionBadgeClass = (dim) => {
    switch (dim.toLowerCase()) {
      case "man": return "badge-man";
      case "machine": return "badge-machine";
      case "material": return "badge-material";
      case "method": return "badge-method";
      case "measurement": return "badge-measurement";
      case "environment": return "badge-environment";
      default: return "bg-secondary";
    }
  };

  const getSeverityBadge = (sev) => {
    if (sev === "Critical") return <span className="badge bg-danger text-white"><i className="bi bi-exclamation-triangle-fill me-1"></i>Critical</span>;
    if (sev === "Warning") return <span className="badge bg-warning text-dark"><i className="bi bi-exclamation-circle-fill me-1"></i>Warning</span>;
    return <span className="badge bg-success text-white"><i className="bi bi-check-circle-fill me-1"></i>Normal</span>;
  };

  return (
    <div>
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center gap-3">
            <span className="brand-badge fw-bold">5M1E INDUSTRIAL OPS</span>
            <span className="navbar-brand text-white fw-bold mb-0 fs-5">Production Quality & Change Tracker</span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button 
              className={`btn btn-sm ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <i className="bi bi-speedometer2 me-1"></i> Dashboard & Logs
            </button>
            <button 
              className={`btn btn-sm ${activeTab === 'new-entry' ? 'btn-primary' : 'btn-success'}`}
              onClick={() => setActiveTab('new-entry')}
            >
              <i className="bi bi-plus-circle me-1"></i> Record 5M1E Event
            </button>
            <button 
              className={`btn btn-sm ${activeTab === 'fishbone' ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => setActiveTab('fishbone')}
            >
              <i className="bi bi-diagram-3 me-1"></i> Ishikawa Fishbone
            </button>
            <button 
              className={`btn btn-sm ${activeTab === 'analytics' ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => setActiveTab('analytics')}
            >
              <i className="bi bi-graph-up me-1"></i> Radar Analytics
            </button>
            <button className="btn btn-sm btn-outline-info" onClick={exportToCSV} title="Export CSV">
              <i className="bi bi-download me-1"></i> Export
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="container-fluid px-4 py-4">

        {/* Global KPI Strip */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="kpi-card">
              <div className="d-flex justify-content-between align-items-center text-muted mb-2">
                <span className="text-uppercase small fw-bold">Total Shift Logs</span>
                <i className="bi bi-card-checklist fs-5 text-primary"></i>
              </div>
              <div className="kpi-value text-white">{totalLogs}</div>
              <div className="small text-muted mt-1">Logged across all active work cells</div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="kpi-card">
              <div className="d-flex justify-content-between align-items-center text-muted mb-2">
                <span className="text-uppercase small fw-bold">Change Points (4M/5M1E)</span>
                <i className="bi bi-arrow-repeat fs-5 text-warning"></i>
              </div>
              <div className="kpi-value text-warning">{changePoints}</div>
              <div className="small text-muted mt-1">Man/Machine/Material/Method transitions</div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="kpi-card">
              <div className="d-flex justify-content-between align-items-center text-muted mb-2">
                <span className="text-uppercase small fw-bold">Active Abnormalities</span>
                <i className="bi bi-exclamation-diamond fs-5 text-danger"></i>
              </div>
              <div className="kpi-value text-danger">{abnormalities}</div>
              <div className="small text-muted mt-1">{criticals} Critical severity events</div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="kpi-card">
              <div className="d-flex justify-content-between align-items-center text-muted mb-2">
                <span className="text-uppercase small fw-bold">Measurement Pass Rate</span>
                <i className="bi bi-rulers fs-5 text-info"></i>
              </div>
              <div className="kpi-value text-info">
                {totalLogs > 0 ? (((totalLogs - outOfSpec) / totalLogs) * 100).toFixed(1) : 100}%
              </div>
              <div className="small text-muted mt-1">{outOfSpec} Out-of-spec dimensions flagged</div>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------
            VIEW 1: DASHBOARD & PRODUCTION LOG AUDIT TABLE
        ------------------------------------------------------------- */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Filter and Control Bar */}
            <div className="surface-card p-3 mb-4">
              <div className="row g-2 align-items-center">
                <div className="col-12 col-md-3">
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-secondary text-muted">
                      <i className="bi bi-search"></i>
                    </span>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Search WO#, lot, station, operator..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-6 col-md-2">
                  <select 
                    className="form-select" 
                    value={selectedLine} 
                    onChange={(e) => setSelectedLine(e.target.value)}
                  >
                    <option value="ALL">All Lines</option>
                    <option value="LINE-01">Line 1: SMT Solder</option>
                    <option value="LINE-02">Line 2: Stamping CNC</option>
                    <option value="LINE-03">Line 3: Cleanroom Assembly</option>
                  </select>
                </div>

                <div className="col-6 col-md-2">
                  <select 
                    className="form-select" 
                    value={selectedShift} 
                    onChange={(e) => setSelectedShift(e.target.value)}
                  >
                    <option value="ALL">All Shifts</option>
                    <option value="SHIFT-A">Shift A (Morning)</option>
                    <option value="SHIFT-B">Shift B (Evening)</option>
                    <option value="SHIFT-C">Shift C (Night)</option>
                  </select>
                </div>

                <div className="col-6 col-md-2">
                  <select 
                    className="form-select" 
                    value={selectedDimension} 
                    onChange={(e) => setSelectedDimension(e.target.value)}
                  >
                    <option value="ALL">All 5M1E Categories</option>
                    <option value="MAN">1. Man (Operator)</option>
                    <option value="MACHINE">2. Machine (Tool)</option>
                    <option value="MATERIAL">3. Material (Lot)</option>
                    <option value="METHOD">4. Method (SOP)</option>
                    <option value="MEASUREMENT">5. Measurement (QC)</option>
                    <option value="ENVIRONMENT">6. Environment</option>
                  </select>
                </div>

                <div className="col-6 col-md-3 text-end">
                  <button 
                    className="btn btn-outline-secondary btn-sm me-2"
                    onClick={() => {
                      setSelectedLine("ALL");
                      setSelectedShift("ALL");
                      setSelectedDimension("ALL");
                      setSearchQuery("");
                    }}
                  >
                    <i className="bi bi-arrow-counterclockwise me-1"></i> Reset Filters
                  </button>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => setActiveTab('new-entry')}
                  >
                    <i className="bi bi-plus-lg me-1"></i> New Log
                  </button>
                </div>
              </div>
            </div>

            {/* Table of Records */}
            <div className="surface-card">
              <div className="table-responsive">
                <table className="table table-custom mb-0">
                  <thead>
                    <tr>
                      <th>Event ID & Time</th>
                      <th>Line / Shift</th>
                      <th>Work Order / Part</th>
                      <th>Classification</th>
                      <th>Primary 5M1E</th>
                      <th>Event Details & Parameters</th>
                      <th>QC Spec</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center py-5 text-muted">
                          <i className="bi bi-inbox fs-2 d-block mb-2"></i>
                          No 5M1E records match the selected filters.
                        </td>
                      </tr>
                    ) : (
                      filteredRecords.map(record => (
                        <tr key={record.id} className="table-row-hover">
                          <td>
                            <div className="font-mono fw-bold text-white">{record.id}</div>
                            <div className="small text-muted">{record.timestamp}</div>
                          </td>
                          <td>
                            <span className="badge bg-secondary me-1">{record.line}</span>
                            <span className="badge bg-dark border border-secondary">{record.shift}</span>
                          </td>
                          <td>
                            <div className="font-mono small text-info">{record.workOrder}</div>
                            <div className="small text-muted">{record.partNumber}</div>
                          </td>
                          <td>
                            <div className="mb-1">{getSeverityBadge(record.severity)}</div>
                            <span className="small text-muted">{record.eventType}</span>
                          </td>
                          <td>
                            <span className={`badge ${getDimensionBadgeClass(record.primaryDimension)}`}>
                              {record.primaryDimension}
                            </span>
                          </td>
                          <td style={{ maxWidth: '320px' }}>
                            <div className="fw-semibold text-white text-truncate">{record.summary}</div>
                            <div className="small text-muted">
                              <span className="me-2"><i className="bi bi-person me-1"></i>{record.man.operator.split(' ')[0]}</span>
                              <span className="me-2"><i className="bi bi-gear me-1"></i>{record.machine.stationId}</span>
                              <span><i className="bi bi-box-seam me-1"></i>{record.material.lotNumber}</span>
                            </div>
                          </td>
                          <td>
                            {record.measurement.inSpec ? (
                              <span className="badge bg-success-subtle text-success border border-success-subtle">
                                <i className="bi bi-check me-1"></i>In-Spec ({record.measurement.measured})
                              </span>
                            ) : (
                              <span className="badge bg-danger-subtle text-danger border border-danger-subtle">
                                <i className="bi bi-x me-1"></i>OOS ({record.measurement.measured})
                              </span>
                            )}
                          </td>
                          <td className="text-end">
                            <button 
                              className="btn btn-sm btn-outline-primary"
                              title="Generate Ishikawa Fishbone Diagram"
                              onClick={() => {
                                setActiveFishboneRecord(record);
                                setActiveTab('fishbone');
                              }}
                            >
                              <i className="bi bi-diagram-3 me-1"></i> Fishbone
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            VIEW 2: NEW 5M1E RECORDING FORM
        ------------------------------------------------------------- */}
        {activeTab === 'new-entry' && (
          <div className="surface-card p-4">
            <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-secondary">
              <div>
                <h4 className="fw-bold text-white mb-1">
                  <i className="bi bi-clipboard2-plus text-primary me-2"></i>
                  Record 5M1E Production Event / Change Point
                </h4>
                <p className="text-muted small mb-0">
                  Document Man, Machine, Material, Method, Measurement, and Environment parameters for full traceability.
                </p>
              </div>
              <button className="btn btn-outline-secondary btn-sm" onClick={() => setActiveTab('dashboard')}>
                <i className="bi bi-x-lg me-1"></i> Cancel
              </button>
            </div>

            <form onSubmit={handleSaveRecord}>
              {/* Header Context Fields */}
              <div className="row g-3 mb-4 p-3 rounded" style={{ background: '#0b0f19' }}>
                <div className="col-12 col-md-3">
                  <label className="form-label small text-muted">Production Line</label>
                  <select className="form-select" name="line" value={formData.line} onChange={handleInputChange}>
                    <option value="LINE-01">Line 1: SMT Solder</option>
                    <option value="LINE-02">Line 2: Stamping CNC</option>
                    <option value="LINE-03">Line 3: Cleanroom Assembly</option>
                  </select>
                </div>
                <div className="col-12 col-md-2">
                  <label className="form-label small text-muted">Shift</label>
                  <select className="form-select" name="shift" value={formData.shift} onChange={handleInputChange}>
                    <option value="SHIFT-A">Shift A (06:00 - 14:00)</option>
                    <option value="SHIFT-B">Shift B (14:00 - 22:00)</option>
                    <option value="SHIFT-C">Shift C (22:00 - 06:00)</option>
                  </select>
                </div>
                <div className="col-12 col-md-2">
                  <label className="form-label small text-muted">Work Order #</label>
                  <input 
                    type="text" 
                    className="form-control font-mono" 
                    name="workOrder" 
                    placeholder="e.g. WO-9901" 
                    value={formData.workOrder} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                <div className="col-12 col-md-2">
                  <label className="form-label small text-muted">Part / SKU Number</label>
                  <input 
                    type="text" 
                    className="form-control font-mono" 
                    name="partNumber" 
                    placeholder="e.g. PCB-V4" 
                    value={formData.partNumber} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="col-12 col-md-3">
                  <label className="form-label small text-muted">Event Type</label>
                  <select className="form-select" name="eventType" value={formData.eventType} onChange={handleInputChange}>
                    <option value="Routine Check">Routine Shift Check</option>
                    <option value="Change Point">4M/5M1E Change Point</option>
                    <option value="Abnormality">Line Stop / Abnormality</option>
                    <option value="Defect Investigation">Quality Defect Investigation</option>
                  </select>
                </div>
                <div className="col-12 col-md-3">
                  <label className="form-label small text-muted">Severity</label>
                  <select className="form-select" name="severity" value={formData.severity} onChange={handleInputChange}>
                    <option value="Normal">Normal / Routine</option>
                    <option value="Warning">Warning (Change Point)</option>
                    <option value="Critical">Critical (Stop / Out of Spec)</option>
                  </select>
                </div>
                <div className="col-12 col-md-3">
                  <label className="form-label small text-muted">Primary 5M1E Dimension</label>
                  <select className="form-select" name="primaryDimension" value={formData.primaryDimension} onChange={handleInputChange}>
                    <option value="Man">1. Man (Operator)</option>
                    <option value="Machine">2. Machine (Tool)</option>
                    <option value="Material">3. Material (Lot)</option>
                    <option value="Method">4. Method (SOP)</option>
                    <option value="Measurement">5. Measurement (QC)</option>
                    <option value="Environment">6. Environment</option>
                  </select>
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label small text-muted">Event Summary / Trigger Description</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="summary" 
                    placeholder="Brief description of change point or anomaly..." 
                    value={formData.summary} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
              </div>

              {/* 5M1E Dimensional Stepper Navigation */}
              <div className="d-flex flex-wrap gap-2 mb-4 pb-2 border-bottom border-secondary">
                <button 
                  type="button" 
                  className={`dimension-tab-btn ${formStep === 'man' ? 'active' : ''}`}
                  onClick={() => setFormStep('man')}
                >
                  <i className="bi bi-person text-info"></i> 1. Man
                </button>
                <button 
                  type="button" 
                  className={`dimension-tab-btn ${formStep === 'machine' ? 'active' : ''}`}
                  onClick={() => setFormStep('machine')}
                >
                  <i className="bi bi-cpu text-warning"></i> 2. Machine
                </button>
                <button 
                  type="button" 
                  className={`dimension-tab-btn ${formStep === 'material' ? 'active' : ''}`}
                  onClick={() => setFormStep('material')}
                >
                  <i className="bi bi-box-seam text-success"></i> 3. Material
                </button>
                <button 
                  type="button" 
                  className={`dimension-tab-btn ${formStep === 'method' ? 'active' : ''}`}
                  onClick={() => setFormStep('method')}
                >
                  <i className="bi bi-journal-code text-purple" style={{ color: '#a78bfa' }}></i> 4. Method
                </button>
                <button 
                  type="button" 
                  className={`dimension-tab-btn ${formStep === 'measurement' ? 'active' : ''}`}
                  onClick={() => setFormStep('measurement')}
                >
                  <i className="bi bi-rulers text-danger"></i> 5. Measurement
                </button>
                <button 
                  type="button" 
                  className={`dimension-tab-btn ${formStep === 'environment' ? 'active' : ''}`}
                  onClick={() => setFormStep('environment')}
                >
                  <i className="bi bi-cloud-sun text-teal" style={{ color: '#2dd4bf' }}></i> 6. Environment
                </button>
              </div>

              {/* Dimension Form Panels */}
              <div className="p-3 rounded border border-secondary mb-4" style={{ background: '#111827' }}>
                
                {/* 1. MAN */}
                {formStep === 'man' && (
                  <div className="row g-3">
                    <h5 className="text-info fw-bold mb-3"><i className="bi bi-person me-2"></i>Man (Personnel & Skills)</h5>
                    <div className="col-12 col-md-4">
                      <label className="form-label small text-muted">Operator Name & Badge ID</label>
                      <input type="text" className="form-control" name="operator" placeholder="e.g. Alex Wong (EMP-504)" value={formData.operator} onChange={handleInputChange} />
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="form-label small text-muted">Operator Skill Level</label>
                      <select className="form-select" name="skillLevel" value={formData.skillLevel} onChange={handleInputChange}>
                        <option value="Tier 1">Tier 1 - Trainee (Shadow required)</option>
                        <option value="Tier 2">Tier 2 - Certified Operator</option>
                        <option value="Tier 3">Tier 3 - Senior Specialist</option>
                        <option value="Tier 4">Tier 4 - Master / Line Leader</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-4 d-flex align-items-center mt-4">
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="certSwitch" name="certified" checked={formData.certified} onChange={handleInputChange} />
                        <label className="form-check-label text-white" htmlFor="certSwitch">Process Certification Validated</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <label className="form-label small text-muted">Operator Shift Notes & Handover Status</label>
                      <textarea className="form-control" rows="2" name="manNotes" placeholder="Special training notes, operator fatigue status, shift handover comments..." value={formData.manNotes} onChange={handleInputChange}></textarea>
                    </div>
                  </div>
                )}

                {/* 2. MACHINE */}
                {formStep === 'machine' && (
                  <div className="row g-3">
                    <h5 className="text-warning fw-bold mb-3"><i className="bi bi-cpu me-2"></i>Machine (Tooling & Equipment)</h5>
                    <div className="col-12 col-md-4">
                      <label className="form-label small text-muted">Equipment / Station Tag</label>
                      <input type="text" className="form-control font-mono" name="stationId" placeholder="e.g. SMT-PICK-02" value={formData.stationId} onChange={handleInputChange} />
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="form-label small text-muted">Machine State</label>
                      <select className="form-select" name="machineStatus" value={formData.machineStatus} onChange={handleInputChange}>
                        <option value="Running">Running / Operational</option>
                        <option value="Idle">Idle / Changeover</option>
                        <option value="Under PM">Under Maintenance / PM</option>
                        <option value="Interlock Trip">Interlock / Error Stop</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="form-label small text-muted">Operating Temperature (°C)</label>
                      <input type="number" step="0.1" className="form-control font-mono" name="temperature" value={formData.temperature} onChange={handleInputChange} />
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="form-label small text-muted">Air / Hydraulic Pressure (Bar)</label>
                      <input type="number" step="0.01" className="form-control font-mono" name="pressure" value={formData.pressure} onChange={handleInputChange} />
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="form-label small text-muted">Spindle / Motor Speed (RPM)</label>
                      <input type="number" className="form-control font-mono" name="rpm" value={formData.rpm} onChange={handleInputChange} />
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="form-label small text-muted">Tool Stroke / Life Count</label>
                      <input type="number" className="form-control font-mono" name="toolLife" value={formData.toolLife} onChange={handleInputChange} />
                    </div>
                  </div>
                )}

                {/* 3. MATERIAL */}
                {formStep === 'material' && (
                  <div className="row g-3">
                    <h5 className="text-success fw-bold mb-3"><i className="bi bi-box-seam me-2"></i>Material (Raw Materials & Components)</h5>
                    <div className="col-12 col-md-4">
                      <label className="form-label small text-muted">Component / Material Code</label>
                      <input type="text" className="form-control font-mono" name="materialPart" placeholder="e.g. SOLDER-SAC-305" value={formData.materialPart} onChange={handleInputChange} />
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="form-label small text-muted">Lot / Batch Number</label>
                      <input type="text" className="form-control font-mono" name="lotNumber" placeholder="e.g. LOT-202610-09" value={formData.lotNumber} onChange={handleInputChange} />
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="form-label small text-muted">Supplier / Vendor</label>
                      <input type="text" className="form-control" name="supplier" placeholder="e.g. Nippon Precision" value={formData.supplier} onChange={handleInputChange} />
                    </div>
                    <div className="col-12 col-md-6 d-flex align-items-center mt-3">
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="coaSwitch" name="coaVerified" checked={formData.coaVerified} onChange={handleInputChange} />
                        <label className="form-check-label text-white" htmlFor="coaSwitch">Certificate of Analysis (CoA) Verified</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <label className="form-label small text-muted">Material Verification Notes</label>
                      <textarea className="form-control" rows="2" name="materialNotes" placeholder="Packaging condition, moisture indicator, expiration check..." value={formData.materialNotes} onChange={handleInputChange}></textarea>
                    </div>
                  </div>
                )}

                {/* 4. METHOD */}
                {formStep === 'method' && (
                  <div className="row g-3">
                    <h5 className="fw-bold mb-3" style={{ color: '#a78bfa' }}><i className="bi bi-journal-code me-2"></i>Method (Process & SOP)</h5>
                    <div className="col-12 col-md-4">
                      <label className="form-label small text-muted">SOP / Work Instruction #</label>
                      <input type="text" className="form-control font-mono" name="sopNumber" placeholder="e.g. SOP-SMT-004 Rev 3" value={formData.sopNumber} onChange={handleInputChange} />
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="form-label small text-muted">Program / Recipe ID</label>
                      <input type="text" className="form-control font-mono" name="recipeId" placeholder="e.g. RECIPE_X4" value={formData.recipeId} onChange={handleInputChange} />
                    </div>
                    <div className="col-12 col-md-2">
                      <label className="form-label small text-muted">Std Cycle Time (s)</label>
                      <input type="number" className="form-control font-mono" name="stdCycleTime" value={formData.stdCycleTime} onChange={handleInputChange} />
                    </div>
                    <div className="col-12 col-md-2">
                      <label className="form-label small text-muted">Actual Cycle Time (s)</label>
                      <input type="number" className="form-control font-mono" name="actCycleTime" value={formData.actCycleTime} onChange={handleInputChange} />
                    </div>
                    <div className="col-12">
                      <label className="form-label small text-muted">Method Deviation / Speed Override Notes</label>
                      <textarea className="form-control" rows="2" name="methodNotes" placeholder="Process adjustments, sequence deviations, special inspection instructions..." value={formData.methodNotes} onChange={handleInputChange}></textarea>
                    </div>
                  </div>
                )}

                {/* 5. MEASUREMENT */}
                {formStep === 'measurement' && (
                  <div className="row g-3">
                    <h5 className="text-danger fw-bold mb-3"><i className="bi bi-rulers me-2"></i>Measurement (Inspection & Gauging)</h5>
                    <div className="col-12 col-md-4">
                      <label className="form-label small text-muted">Inspection Tool / Gauge ID</label>
                      <input type="text" className="form-control font-mono" name="toolId" placeholder="e.g. CALIPER-MITUTOYO-04" value={formData.toolId} onChange={handleInputChange} />
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="form-label small text-muted">Calibration Expiration Date</label>
                      <input type="date" className="form-control" name="calibrationDue" value={formData.calibrationDue} onChange={handleInputChange} />
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="form-label small text-muted">Critical Feature Measured</label>
                      <input type="text" className="form-control" name="feature" placeholder="e.g. Total Thickness (mm)" value={formData.feature} onChange={handleInputChange} />
                    </div>
                    <div className="col-12 col-md-3">
                      <label className="form-label small text-muted">Nominal Target</label>
                      <input type="number" step="0.001" className="form-control font-mono" name="nominal" value={formData.nominal} onChange={handleInputChange} />
                    </div>
                    <div className="col-12 col-md-3">
                      <label className="form-label small text-muted">Lower Spec Limit (LSL)</label>
                      <input type="number" step="0.001" className="form-control font-mono" name="lsl" value={formData.lsl} onChange={handleInputChange} />
                    </div>
                    <div className="col-12 col-md-3">
                      <label className="form-label small text-muted">Upper Spec Limit (USL)</label>
                      <input type="number" step="0.001" className="form-control font-mono" name="usl" value={formData.usl} onChange={handleInputChange} />
                    </div>
                    <div className="col-12 col-md-3">
                      <label className="form-label small text-muted">Measured Value</label>
                      <input type="number" step="0.001" className="form-control font-mono" name="measured" value={formData.measured} onChange={handleInputChange} />
                    </div>
                  </div>
                )}

                {/* 6. ENVIRONMENT */}
                {formStep === 'environment' && (
                  <div className="row g-3">
                    <h5 className="fw-bold mb-3" style={{ color: '#2dd4bf' }}><i className="bi bi-cloud-sun me-2"></i>Environment (Ambient Conditions)</h5>
                    <div className="col-12 col-md-3">
                      <label className="form-label small text-muted">Room Temp (°C)</label>
                      <input type="number" step="0.1" className="form-control font-mono" name="envTemp" value={formData.envTemp} onChange={handleInputChange} />
                    </div>
                    <div className="col-12 col-md-3">
                      <label className="form-label small text-muted">Relative Humidity (% RH)</label>
                      <input type="number" step="1" className="form-control font-mono" name="envHumidity" value={formData.envHumidity} onChange={handleInputChange} />
                    </div>
                    <div className="col-12 col-md-3">
                      <label className="form-label small text-muted">ESD Grounding Status</label>
                      <select className="form-select" name="esdGrounding" value={formData.esdGrounding} onChange={handleInputChange}>
                        <option value="Pass">Pass (All Mats & Straps &lt; 10MΩ)</option>
                        <option value="Warning">Warning (Intermittent Ground)</option>
                        <option value="Fail">Fail (Ground Broken)</option>
                        <option value="N/A">Not Applicable</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-3">
                      <label className="form-label small text-muted">Cleanroom Class / Cleanliness</label>
                      <input type="text" className="form-control" name="cleanroomClass" placeholder="e.g. ISO Class 7" value={formData.cleanroomClass} onChange={handleInputChange} />
                    </div>
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="d-flex justify-content-between">
                <div>
                  {formStep !== 'man' && (
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary me-2"
                      onClick={() => {
                        const steps = ['man', 'machine', 'material', 'method', 'measurement', 'environment'];
                        const idx = steps.indexOf(formStep);
                        if (idx > 0) setFormStep(steps[idx - 1]);
                      }}
                    >
                      <i className="bi bi-chevron-left me-1"></i> Previous Dimension
                    </button>
                  )}
                  {formStep !== 'environment' && (
                    <button 
                      type="button" 
                      className="btn btn-outline-primary"
                      onClick={() => {
                        const steps = ['man', 'machine', 'material', 'method', 'measurement', 'environment'];
                        const idx = steps.indexOf(formStep);
                        if (idx < steps.length - 1) setFormStep(steps[idx + 1]);
                      }}
                    >
                      Next Dimension <i className="bi bi-chevron-right ms-1"></i>
                    </button>
                  )}
                </div>

                <button type="submit" className="btn btn-success px-4 fw-bold">
                  <i className="bi bi-check2-circle me-2"></i> Save & Log 5M1E Record
                </button>
              </div>
            </form>
          </div>
        )}

        {/* -------------------------------------------------------------
            VIEW 3: ISHIKAWA (FISHBONE) DIAGRAM GENERATOR
        ------------------------------------------------------------- */}
        {activeTab === 'fishbone' && (
          <div>
            <div className="surface-card p-3 mb-3 d-flex justify-content-between align-items-center">
              <div>
                <h5 className="text-white fw-bold mb-1">
                  <i className="bi bi-diagram-3 text-primary me-2"></i>
                  Dynamic 5M1E Ishikawa (Fishbone) Root Cause Diagram
                </h5>
                <span className="text-muted small">
                  Visualizing root causes mapped across the 6 manufacturing bones.
                </span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="small text-muted">Select Event:</span>
                <select 
                  className="form-select form-select-sm"
                  style={{ width: '280px' }}
                  value={activeFishboneRecord ? activeFishboneRecord.id : ''}
                  onChange={(e) => {
                    const rec = records.find(r => r.id === e.target.value);
                    if (rec) setActiveFishboneRecord(rec);
                  }}
                >
                  {records.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.id} - {r.eventType} ({r.primaryDimension})
                    </option>
                  ))}
                </select>
                <button className="btn btn-sm btn-outline-light" onClick={() => window.print()}>
                  <i className="bi bi-printer me-1"></i> Print / PDF
                </button>
              </div>
            </div>

            {activeFishboneRecord && (
              <div className="fishbone-wrapper">
                <svg className="fishbone-svg" viewBox="0 0 1000 520">
                  {/* Spine (Central Horizontal Backbone) */}
                  <line x1="60" y1="260" x2="820" y2="260" className="fishbone-spine" />
                  
                  {/* Fish Head (Effect / Problem Statement Box) */}
                  <polygon points="820,260 840,240 840,280" fill="#475569" />
                  <rect x="840" y="210" width="150" height="100" rx="10" ry="10" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                  <text x="915" y="240" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">QUALITY EFFECT</text>
                  <text x="915" y="265" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    {activeFishboneRecord.eventType.toUpperCase()}
                  </text>
                  <text x="915" y="285" fill="#94a3b8" fontSize="10" textAnchor="middle">
                    {activeFishboneRecord.workOrder}
                  </text>

                  {/* ================= TOP BONES ================= */}
                  {/* Bone 1: MAN */}
                  <line x1="200" y1="260" x2="140" y2="80" stroke="#38bdf8" strokeWidth="2.5" />
                  <rect x="70" y="30" width="140" height="46" rx="6" fill="#161e31" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="140" y="50" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">1. MAN (PERSONNEL)</text>
                  <text x="140" y="66" fill="#f8fafc" fontSize="10" textAnchor="middle">{activeFishboneRecord.man.operator}</text>
                  
                  {/* Sub-branch for Man */}
                  <line x1="165" y1="150" x2="280" y2="150" stroke="#334155" strokeWidth="1.5" strokeDasharray="3,3" />
                  <text x="175" y="142" fill="#94a3b8" fontSize="10">Skill: {activeFishboneRecord.man.skillLevel}</text>
                  <text x="175" y="165" fill={activeFishboneRecord.man.certified ? "#34d399" : "#f43f5e"} fontSize="10">
                    Cert: {activeFishboneRecord.man.certified ? "Validated" : "Missing"}
                  </text>

                  {/* Bone 2: MACHINE */}
                  <line x1="420" y1="260" x2="360" y2="80" stroke="#fb923c" strokeWidth="2.5" />
                  <rect x="290" y="30" width="140" height="46" rx="6" fill="#161e31" stroke="#fb923c" strokeWidth="1.5" />
                  <text x="360" y="50" fill="#fb923c" fontSize="12" fontWeight="bold" textAnchor="middle">2. MACHINE (TOOL)</text>
                  <text x="360" y="66" fill="#f8fafc" fontSize="10" textAnchor="middle">{activeFishboneRecord.machine.stationId}</text>

                  {/* Sub-branch for Machine */}
                  <line x1="385" y1="150" x2="500" y2="150" stroke="#334155" strokeWidth="1.5" strokeDasharray="3,3" />
                  <text x="395" y="142" fill="#94a3b8" fontSize="10">Status: {activeFishboneRecord.machine.status}</text>
                  <text x="395" y="165" fill="#f8fafc" fontSize="10">Temp: {activeFishboneRecord.machine.temperature}°C / {activeFishboneRecord.machine.pressure} bar</text>

                  {/* Bone 3: MATERIAL */}
                  <line x1="640" y1="260" x2="580" y2="80" stroke="#34d399" strokeWidth="2.5" />
                  <rect x="510" y="30" width="140" height="46" rx="6" fill="#161e31" stroke="#34d399" strokeWidth="1.5" />
                  <text x="580" y="50" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">3. MATERIAL (PARTS)</text>
                  <text x="580" y="66" fill="#f8fafc" fontSize="10" textAnchor="middle">{activeFishboneRecord.material.lotNumber}</text>

                  {/* Sub-branch for Material */}
                  <line x1="605" y1="150" x2="720" y2="150" stroke="#334155" strokeWidth="1.5" strokeDasharray="3,3" />
                  <text x="615" y="142" fill="#94a3b8" fontSize="10">Vendor: {activeFishboneRecord.material.supplier}</text>
                  <text x="615" y="165" fill={activeFishboneRecord.material.coaVerified ? "#34d399" : "#f43f5e"} fontSize="10">
                    CoA: {activeFishboneRecord.material.coaVerified ? "Approved" : "Pending"}
                  </text>

                  {/* ================= BOTTOM BONES ================= */}
                  {/* Bone 4: METHOD */}
                  <line x1="200" y1="260" x2="140" y2="440" stroke="#a78bfa" strokeWidth="2.5" />
                  <rect x="70" y="445" width="140" height="46" rx="6" fill="#161e31" stroke="#a78bfa" strokeWidth="1.5" />
                  <text x="140" y="465" fill="#a78bfa" fontSize="12" fontWeight="bold" textAnchor="middle">4. METHOD (SOP)</text>
                  <text x="140" y="482" fill="#f8fafc" fontSize="10" textAnchor="middle">{activeFishboneRecord.method.recipeId}</text>

                  {/* Sub-branch for Method */}
                  <line x1="165" y1="360" x2="280" y2="360" stroke="#334155" strokeWidth="1.5" strokeDasharray="3,3" />
                  <text x="175" y="352" fill="#94a3b8" fontSize="10">SOP: {activeFishboneRecord.method.sopNumber}</text>
                  <text x="175" y="375" fill="#f8fafc" fontSize="10">Cycle: {activeFishboneRecord.method.actCycleTime}s (Std {activeFishboneRecord.method.stdCycleTime}s)</text>

                  {/* Bone 5: MEASUREMENT */}
                  <line x1="420" y1="260" x2="360" y2="440" stroke="#f43f5e" strokeWidth="2.5" />
                  <rect x="290" y="445" width="140" height="46" rx="6" fill="#161e31" stroke="#f43f5e" strokeWidth="1.5" />
                  <text x="360" y="465" fill="#f43f5e" fontSize="12" fontWeight="bold" textAnchor="middle">5. MEASUREMENT</text>
                  <text x="360" y="482" fill="#f8fafc" fontSize="10" textAnchor="middle">
                    {activeFishboneRecord.measurement.inSpec ? "PASS" : "OUT OF SPEC"}
                  </text>

                  {/* Sub-branch for Measurement */}
                  <line x1="385" y1="360" x2="500" y2="360" stroke="#334155" strokeWidth="1.5" strokeDasharray="3,3" />
                  <text x="395" y="352" fill="#94a3b8" fontSize="10">Tool: {activeFishboneRecord.measurement.toolId}</text>
                  <text x="395" y="375" fill="#f8fafc" fontSize="10">Val: {activeFishboneRecord.measurement.measured} (LSL {activeFishboneRecord.measurement.lsl} / USL {activeFishboneRecord.measurement.usl})</text>

                  {/* Bone 6: ENVIRONMENT */}
                  <line x1="640" y1="260" x2="580" y2="440" stroke="#2dd4bf" strokeWidth="2.5" />
                  <rect x="510" y="445" width="140" height="46" rx="6" fill="#161e31" stroke="#2dd4bf" strokeWidth="1.5" />
                  <text x="580" y="465" fill="#2dd4bf" fontSize="12" fontWeight="bold" textAnchor="middle">6. ENVIRONMENT</text>
                  <text x="580" y="482" fill="#f8fafc" fontSize="10" textAnchor="middle">{activeFishboneRecord.environment.cleanroomClass}</text>

                  {/* Sub-branch for Environment */}
                  <line x1="605" y1="360" x2="720" y2="360" stroke="#334155" strokeWidth="1.5" strokeDasharray="3,3" />
                  <text x="615" y="352" fill="#94a3b8" fontSize="10">Temp: {activeFishboneRecord.environment.temp}°C</text>
                  <text x="615" y="375" fill="#f8fafc" fontSize="10">RH: {activeFishboneRecord.environment.humidity}% | ESD: {activeFishboneRecord.environment.esdGrounding}</text>
                </svg>

                {/* Event Summary Details Footer */}
                <div className="mt-3 p-3 bg-dark border border-secondary rounded">
                  <div className="row g-2 align-items-center">
                    <div className="col-12 col-md-8">
                      <span className="badge bg-primary me-2">{activeFishboneRecord.id}</span>
                      <strong className="text-white">{activeFishboneRecord.summary}</strong>
                    </div>
                    <div className="col-12 col-md-4 text-md-end text-muted small">
                      Logged at {activeFishboneRecord.timestamp} on {activeFishboneRecord.line}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* -------------------------------------------------------------
            VIEW 4: 5M1E RADAR & FREQUENCY ANALYTICS
        ------------------------------------------------------------- */}
        {activeTab === 'analytics' && (
          <div className="row g-4">
            <div className="col-12 col-lg-6">
              <div className="surface-card p-4 h-100">
                <h5 className="fw-bold text-white mb-3">
                  <i className="bi bi-pie-chart text-info me-2"></i>
                  5M1E Anomaly & Change Distribution
                </h5>
                <RadarChartComponent records={records} />
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="surface-card p-4 h-100">
                <h5 className="fw-bold text-white mb-3">
                  <i className="bi bi-shield-check text-success me-2"></i>
                  Manufacturing 5M1E Standard Compliance
                </h5>
                <div className="list-group list-group-flush bg-transparent">
                  <div className="list-group-item bg-transparent text-white border-secondary d-flex justify-content-between align-items-center">
                    <div>
                      <strong className="text-info">1. Man (Operator Verification)</strong>
                      <div className="small text-muted">Certification checking & shift handover compliance</div>
                    </div>
                    <span className="badge bg-success">100% Verified</span>
                  </div>
                  <div className="list-group-item bg-transparent text-white border-secondary d-flex justify-content-between align-items-center">
                    <div>
                      <strong className="text-warning">2. Machine (Predictive Health)</strong>
                      <div className="small text-muted">Vibration chattering on CNC-MILL-04 flagged</div>
                    </div>
                    <span className="badge bg-danger">1 Alert</span>
                  </div>
                  <div className="list-group-item bg-transparent text-white border-secondary d-flex justify-content-between align-items-center">
                    <div>
                      <strong className="text-success">3. Material (Traceability)</strong>
                      <div className="small text-muted">100% of lots linked to vendor Certificate of Analysis</div>
                    </div>
                    <span className="badge bg-success">100% CoA</span>
                  </div>
                  <div className="list-group-item bg-transparent text-white border-secondary d-flex justify-content-between align-items-center">
                    <div>
                      <strong style={{ color: '#a78bfa' }}>4. Method (Standard Work)</strong>
                      <div className="small text-muted">Cycle time within +/- 10% of standard work definition</div>
                    </div>
                    <span className="badge bg-success">Nominal</span>
                  </div>
                  <div className="list-group-item bg-transparent text-white border-secondary d-flex justify-content-between align-items-center">
                    <div>
                      <strong className="text-danger">5. Measurement (Calibration & Gage R&R)</strong>
                      <div className="small text-muted">All active micrometers and SPI sensors calibrated</div>
                    </div>
                    <span className="badge bg-success">Valid</span>
                  </div>
                  <div className="list-group-item bg-transparent text-white border-secondary d-flex justify-content-between align-items-center">
                    <div>
                      <strong style={{ color: '#2dd4bf' }}>6. Environment (ESD & Cleanliness)</strong>
                      <div className="small text-muted">Humidity dipped to 32% in Cleanroom 2 (Warning)</div>
                    </div>
                    <span className="badge bg-warning text-dark">Warning</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Radar Chart Component using Chart.js
// -------------------------------------------------------------
function RadarChartComponent({ records }) {
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Count occurrences per 5M1E dimension
    const counts = {
      Man: 0,
      Machine: 0,
      Material: 0,
      Method: 0,
      Measurement: 0,
      Environment: 0
    };

    records.forEach(r => {
      const dim = r.primaryDimension;
      if (counts[dim] !== undefined) counts[dim]++;
    });

    const ctx = canvasRef.current.getContext('2d');
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Man', 'Machine', 'Material', 'Method', 'Measurement', 'Environment'],
        datasets: [{
          label: 'Events & Change Points Recorded',
          data: [
            counts.Man,
            counts.Machine,
            counts.Material,
            counts.Method,
            counts.Measurement,
            counts.Environment
          ],
          backgroundColor: 'rgba(56, 189, 248, 0.25)',
          borderColor: '#38bdf8',
          borderWidth: 2,
          pointBackgroundColor: '#38bdf8',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#38bdf8'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: { color: '#334155' },
            grid: { color: '#1e293b' },
            pointLabels: {
              color: '#f8fafc',
              font: { size: 12, weight: 'bold' }
            },
            ticks: {
              color: '#94a3b8',
              backdropColor: 'transparent',
              stepSize: 1
            }
          }
        },
        plugins: {
          legend: {
            labels: { color: '#f8fafc' }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [records]);

  return (
    <div style={{ height: '340px', position: 'relative' }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

// Render the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
