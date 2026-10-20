const fs = require('fs');

// Read existing data to preserve and enhance existing high-quality records
let existing = {};
try {
  existing = JSON.parse(fs.readFileSync('dnkh-data.json', 'utf8'));
} catch (e) {
  console.log('Error reading existing dnkh-data.json:', e);
}

const base = JSON.parse(fs.readFileSync('dnkh-base.json', 'utf8'));

// 1. Sections: use the comprehensive 19 sections from base
const sections = base.dnkhSections;

// 2. Record Types & Capability Levels
const recordTypes = base.dnkhRecordTypes;
const capabilityLevels = base.dnkhCapabilityLevels;

// 3. Existing Records + New Demonstration Records for QA1, QA2, GA, MGMT, and other sections
let records = existing.dnkhRecords || [];

// Ensure all 15 required demonstration datasets from Prompt Requirement 26 are present and properly labeled
// Let's add QA1, QA2, GA, and MGMT records if not already present
const newRecords = [
  {
    id: "REC-QA1-001",
    recordType: "rt-standard",
    title: "Electric Power Steering Motor Stator Helium Leak Detection & Micro-Pinhole Prevention Standard",
    ownerSectionId: "sec-qa1",
    relatedSectionIds: ["sec-qa", "sec-pd", "sec-pe"],
    functionName: "Powertrain Assembly Verification",
    processName: "Stator Shell Vacuum Impregnation & Seal Inspection",
    categoryName: "Helium Leak Testing",
    topicName: "Helium Leak Detection",
    productModel: "EPS-Gen5 Power Steering Motor",
    equipmentJig: "Pfeiffer Vacuum Chamber & Sniffer Probe #HE-03",
    knowledgeOwner: "Kittisak Prasert (QA1 Senior Lead)",
    contributor: "Sample Contributor QA1",
    reviewer: "Sample Reviewer QA1 (Wanida Sornchai)",
    approver: "Sample Approver QA1 (Kenji Nomura)",
    confidentiality: "Internal - DNKH Only",
    keywords: ["helium leak", "vacuum chamber", "pinhole", "eps motor", "ip67 waterproof", "sniffer probe"],
    tags: ["Demonstration Data", "Waterproof Assurance", "High Voltage", "Helium Test", "Critical Quality"],
    createdDate: "2026-01-20",
    updatedDate: "2026-02-25",
    reviewDate: "2026-02-25",
    nextReviewDate: "2027-02-25",
    version: "2.1",
    status: "Published",
    helpfulCount: 76,
    summary: "[Demonstration Data] Comprehensive helium vacuum leak testing procedure ensuring IP67 water-tightness on electric power steering motor housings under 5.0 bar differential pressure.",
    detailedContent: `### Background & Scope
Ensures zero moisture ingress for Electric Power Steering (EPS) motors mounted in chassis splash zones. Any leak exceeding 1.0 x 10^-6 mbar·l/s leads to internal coil corrosion.

### Standard Testing Protocol
1. Evacuate motor cavity to < 0.5 mbar within 3.5 seconds.
2. Backfill with 10% Helium / 90% N2 tracer gas at 5.0 bar gauge.
3. Mass spectrometer sniffer probe scan around seal perimeter at 5 mm/sec.
4. Auto-rejection threshold: >= 1.0 x 10^-5 mbar·l/s triggers Red Card line hold.`,
    applicationNotes: "Applies to all chassis-mounted waterproof motor assemblies in AP Plant.",
    experienceNotes: "Replacing elastomer seals with double-lipped fluoro-silicone gaskets eliminated false leak alarms caused by solvent outgassing.",
    universalDNA: {
      knowledge: "Understands vacuum decay principles, helium molecular permeability, and IP67 waterproof standards.",
      skill: "Can calibrate Pfeiffer mass spectrometer with calibrated leak standard (1.0x10^-6) and execute sniffer test.",
      experience: "Successfully resolved 12 seasonal false-positive leak spikes and tuned vacuum cycle times.",
      knowledgeSharing: "Authored controlled standard SOS-QA1-EPS-019 and trained 14 inspection operators."
    },
    evidenceFiles: [{ name: "SOS-QA1-EPS-019_Helium_Leak_Standard.pdf", size: "3.1 MB", type: "PDF" }],
    evidenceLinks: [{ title: "e-SMART ISO Standard SOS-QA1-EPS-019", url: "https://esmart.dnkh.internal/doc/SOS-QA1-EPS-019", status: "Valid", system: "e-SMART ISO" }]
  },
  {
    id: "REC-QA2-001",
    recordType: "rt-standard",
    title: "Inverter PCBA High-Voltage Solder Void Rate Reduction & AOI Metrology Standard",
    ownerSectionId: "sec-qa2",
    relatedSectionIds: ["sec-qa", "sec-qc", "sec-pe"],
    functionName: "Electronics Buy-off",
    processName: "SMT Nitrogen Reflow & 3D X-Ray Inspection Gate",
    categoryName: "SMT & PCBA Quality",
    topicName: "PCBA Soldering Standards",
    productModel: "INV-400V Dual-Core Inverter",
    equipmentJig: "Nordson Dage Quadra 3D X-Ray & Koh Young 3D AOI",
    knowledgeOwner: "Viroj Tantrakul (QA2 Technical Lead)",
    contributor: "Sample Contributor QA2",
    reviewer: "Sample Reviewer QA2 (Thaksin Chai)",
    approver: "Sample Approver QA2 (Kenji Nomura)",
    confidentiality: "Internal - DNKH Only",
    keywords: ["solder void", "x-ray inspection", "qfn", "bga", "nitrogen reflow", "thermal dissipation"],
    tags: ["Demonstration Data", "SMT Quality", "X-Ray Metrology", "Thermal Conductivity", "EV Component"],
    createdDate: "2026-01-18",
    updatedDate: "2026-03-02",
    reviewDate: "2026-03-02",
    nextReviewDate: "2027-03-02",
    version: "3.0",
    status: "Published",
    helpfulCount: 89,
    summary: "[Demonstration Data] 3D X-Ray defect limit standard maintaining solder void area < 15% under QFN power MOSFET thermal pads to prevent thermal runaway.",
    detailedContent: `### Purpose & Metrology Rule
Under automotive 400V DC switching loads, MOSFET solder voids > 25% cause thermal hotspots up to 145°C. This standard establishes mandatory 100% 3D AXI sampling rules.

### Process Specifications
- Maximum individual void: < 10% of pad area.
- Total cumulative voiding: < 15% (DENSO Standard MS-QA2-108).
- Reflow atmosphere: Nitrogen vacuum reflow with O2 < 50 ppm.`,
    applicationNotes: "Mandatory for all electric vehicle inverter power modules.",
    experienceNotes: "Vacuum vapor-phase soldering reduced void rates from 22.4% to 4.8% on bottom-terminated components.",
    universalDNA: {
      knowledge: "Understands metallurgical solder wetting, intermetallic compound (IMC) formation, and IPC-A-610 Class 3.",
      skill: "Can set up 3D AXI gray-scale void calculation algorithms and analyze solder fillet cross-sections.",
      experience: "Eliminated inverter field thermal claims across 180,000 delivered units in 2025.",
      knowledgeSharing: "Standardized MS-QA2-108 across both DNKH and brother plants in Thailand and Japan."
    },
    evidenceFiles: [{ name: "AXI_Void_Calculation_Standard_MS108.pdf", size: "4.5 MB", type: "PDF" }],
    evidenceLinks: [{ title: "DocSavvy Controlled Standard MS-QA2-108", url: "https://docsavvy.dnkh.internal/spec/MS-QA2-108", status: "Valid", system: "DocSavvy" }]
  },
  {
    id: "REC-GA-001",
    recordType: "rt-standard",
    title: "Plantwide Hazardous Chemical Manifest, Spill Containment & Emergency Evacuation Plan",
    ownerSectionId: "sec-ga",
    relatedSectionIds: ["sec-safety", "sec-facility"],
    functionName: "Physical Plant Security",
    processName: "Chemical Storage & Emergency Disaster Readiness",
    categoryName: "Statutory Permits & Licensing",
    topicName: "Emergency Crisis Planning",
    productModel: "All DNKH Manufacturing Facilities",
    equipmentJig: "Secondary Containment Bunds & Spill Response Carts",
    knowledgeOwner: "Somkiat Boonserm (General Affairs Manager)",
    contributor: "Sample Contributor GA",
    reviewer: "Sample Reviewer GA (Jiraporn S.)",
    approver: "Sample Approver GA (Hiroshi Tanaka)",
    confidentiality: "Public - All Associates",
    keywords: ["chemical spill", "secondary containment", "emergency evacuation", "sds", "fire drill"],
    tags: ["Demonstration Data", "Plant Safety", "Environmental Compliance", "BCP", "General Affairs"],
    createdDate: "2025-05-12",
    updatedDate: "2026-01-15",
    reviewDate: "2026-01-15",
    nextReviewDate: "2027-01-15",
    version: "4.0",
    status: "Published",
    helpfulCount: 61,
    summary: "[Demonstration Data] Regulatory protocol for hazardous chemicals management, 110% secondary containment bund verification, and plantwide crisis response.",
    detailedContent: `### Chemical Storage & Spill Control
1. All liquid solvent and acid containers must sit inside dedicated bunded trays with minimum 110% storage volume capacity.
2. Safety Data Sheets (SDS) in English, Thai, and Khmer must be mounted within 3 meters of each storage zone.
3. Spill response carts must contain neutralizing absorbent pads, chemical-resistant gloves, and non-sparking recovery shovels.`,
    applicationNotes: "Audited monthly across all plant chemical storage sheds and maintenance oil lockers.",
    experienceNotes: "Color-coded emergency zones reduced associate evacuation muster time from 6m 12s to 3m 45s during annual simulation.",
    universalDNA: {
      knowledge: "Understands industrial hazardous waste statutory laws, SDS classifications, and disaster management.",
      skill: "Can deploy hazmat spill booms, conduct atmospheric monitoring, and coordinate fire brigade interfaces.",
      experience: "Managed 8 plant evacuation drills with zero recorded safety incidents over 5 years.",
      knowledgeSharing: "Created multilingual plant emergency guidebooks in Thai, Khmer, Japanese, and English."
    },
    evidenceFiles: [{ name: "Plantwide_Emergency_Evacuation_Manual.pdf", size: "5.2 MB", type: "PDF" }],
    evidenceLinks: [{ title: "e-SMART ISO Standard GA-BCP-001", url: "https://esmart.dnkh.internal/bcp/001", status: "Valid", system: "e-SMART ISO" }]
  },
  {
    id: "REC-MGMT-001",
    recordType: "rt-best-practice",
    title: "DNKH Monozukuri Hoshin Kanri Policy Deployment & Annual Operational Quality Target Cascade",
    ownerSectionId: "sec-mgmt",
    relatedSectionIds: ["sec-qa", "sec-pd", "sec-pc", "sec-pe", "sec-dx"],
    functionName: "Strategic Annual Target Deployment",
    processName: "Executive Hoshin Kanri Cascade & Monthly Gemba Walk",
    categoryName: "Hoshin Kanri Strategic Policy",
    topicName: "Hoshin Kanri Policy",
    productModel: "All DNKH Product Streams",
    equipmentJig: "Executive Operations Dashboard & Monthly Gemba Review Board",
    knowledgeOwner: "Narongkorn Chaisiri (Plant Operations GM)",
    contributor: "Sample Contributor Management",
    reviewer: "Sample Reviewer Management (Kenji Nomura)",
    approver: "Sample Approver Management (Hiroshi Tanaka)",
    confidentiality: "Internal - DNKH Only",
    keywords: ["hoshin kanri", "policy deployment", "kpi cascade", "gemba walk", "monozukuri", "yokoten"],
    tags: ["Demonstration Data", "Executive Governance", "Hoshin Kanri", "Operational Excellence", "Zero Defects"],
    createdDate: "2026-01-05",
    updatedDate: "2026-02-28",
    reviewDate: "2026-02-28",
    nextReviewDate: "2027-02-28",
    version: "5.0",
    status: "Published",
    helpfulCount: 142,
    summary: "[Demonstration Data] Plantwide management framework cascading annual DENSO corporate policy down to section targets, monthly Gemba check-ins, and horizontal Yokoten deployment.",
    detailedContent: `### Hoshin Kanri Strategic Pillars
1. Zero Safety Incidents: Strict adherence to Life-Saving Rule #1.
2. Zero Customer Claims: 100% root-cause closure within 14 days and horizontal replication across brother lines.
3. Productivity & Smart Factory: Citizen development automation saving > 10,000 associate hours annually.
4. Capability Development: Systematic transition from Level 1 Knowledge to Level 4 Knowledge Sharing mentors.`,
    applicationNotes: "Governs annual planning for all 19 section heads and team leaders.",
    experienceNotes: "Linking monthly Gemba walks directly to DNA Matrix Yokoten cases increased cross-plant solution replication by 46%.",
    universalDNA: {
      knowledge: "Understands Toyota/DENSO Monozukuri principles, strategic policy deployment, and cross-functional governance.",
      skill: "Can facilitate X-Matrix target alignment and evaluate operational sustainability metrics.",
      experience: "Successfully led DNKH through 5 consecutive years of top-tier OEM supplier quality excellence awards.",
      knowledgeSharing: "Mentors section heads and hosts monthly executive knowledge transfer sessions."
    },
    evidenceFiles: [{ name: "DNKH_Hoshin_Kanri_Policy_2026.pdf", size: "2.8 MB", type: "PDF" }],
    evidenceLinks: [{ title: "Executive Management Portal", url: "https://mgmt.dnkh.internal/hoshin", status: "Valid", system: "DocSavvy" }]
  }
];

// Combine unique records
newRecords.forEach(nr => {
  if (!records.find(r => r.id === nr.id)) {
    records.push(nr);
  }
});

// Ensure every record has tags containing "Demonstration Data"
records.forEach(r => {
  if (!r.tags) r.tags = [];
  if (!r.tags.includes("Demonstration Data")) {
    r.tags.unshift("Demonstration Data");
  }
});

// 4. Troubleshooting Cases: 5 rich cases
const cases = [
  ...existing.dnkhTroubleshootingCases || [],
  {
    id: "CASE-8D-2026-004",
    caseTitle: "Alternator Stator Coil Insulation Resistance Drop During Rainy Season High Humidity",
    sectionId: "sec-qa1",
    responsibleSectionId: "sec-pd",
    process: "Stator Varnish Impregnation & Curing Line #02",
    product: "DN-ALT-90A Gen-4 Alternator",
    part: "Stator Core Assembly (Copper Magnet Wire & Core)",
    machine: "Automated Varnish Dipping Tank & Curing Oven #01",
    defectCategory: "Electrical Insulation Resistance < 20 MΩ at 500V DC",
    severity: "High - Critical High-Voltage Quality Risk",
    occurrenceDateTime: "2026-01-12 14:20",
    detectionDateTime: "2026-01-12 14:45",
    detectionLocation: "Final Electrical Inspection Megger Station #02",
    occurrenceLocation: "Pre-heat Tunnel Conveyor Entrance",
    flowOutDestination: "Line 2 Intermediate Staging Buffer",
    affectedQuantity: 240,
    suspectedStock: 480,
    rescreenedStock: 480,
    okQuantity: 468,
    ngQuantity: 12,
    pic: "Pitchaya Siriporn (Senior Quality Engineer)",
    status: "Countermeasure Verified (Closed)",
    closureDate: "2026-01-28",
    problemWhat: "4 units failed final insulation resistance testing with readings between 8.5 MΩ and 14.2 MΩ (DENSO standard is >= 20.0 MΩ at 500V DC).",
    problemWhere: "Stator Assembly Line 2, AP Plant.",
    problemWhen: "Second shift during heavy tropical rainstorm (ambient shopfloor humidity reached 88% RH).",
    problemWho: "Detected by QC Final Tester Somjit Promma.",
    expectedCondition: "Insulation resistance >= 20.0 MΩ at 500V DC under any ambient condition.",
    actualCondition: "12 units total had insulation resistance between 8.5 MΩ and 16.0 MΩ.",
    fiveWhy: [
      { why: "Why 1: Why did insulation resistance drop below 20 MΩ?", answer: "Moisture micro-droplets condensed inside core slot insulation papers prior to varnish dipping." },
      { why: "Why 2: Why did moisture condense inside the stator slots?", answer: "Stator core temperature was lower than the ambient dew point when exiting pre-heat." },
      { why: "Why 3: Why was stator core temperature lower than dew point?", answer: "Pre-heat oven entrance curtain was torn, allowing ambient high-humidity air to chill incoming cold cores." },
      { why: "Why 4: Why was the entrance curtain torn?", answer: "Pallet conveyor sensor misaligned, allowing high-profile pallet to snag against curtain edge." },
      { why: "Why 5: Why was conveyor sensor misaligned? (Root Cause)", answer: "Preventive maintenance checklist did not include monthly optical sensor alignment check." }
    ],
    fishbone: {
      man: ["Operator did not notice torn heat curtain during shift start", "Training lacked dew-point condensation awareness"],
      machine: ["Pre-heat infrared heating element #3 was running at 65% power", "Entrance curtain torn on lower 150mm"],
      material: ["Nomex insulation paper absorbs ambient moisture when relative humidity exceeds 80%", "Varnish viscosity was normal"],
      method: ["No continuous dew-point logging inside pre-heat chamber", "No interlock preventing varnish dip if core temp < 65°C"],
      measurement: ["Megohmmeter calibration was valid (calibrated Dec 2025)", "Dual-probe test fixture functioning correctly"],
      environment: ["Tropical rainstorm elevated ambient humidity to 88% RH", "Pre-heat entrance was directly aligned with external roller shutter door"]
    },
    temporaryAction: "Quarantined all 480 WIP stators. Performed 100% insulation re-testing after 2-hour 110°C vacuum bake. Scrapped 12 units with permanent varnish voids. Replaced torn oven curtain with heat-resistant silicone flap.",
    temporaryEffectiveness: "100% containment achieved; zero defective stators proceeded to motor assembly.",
    rootCauseOccurrence: "Chilled core entered humid dipping zone below dew point, causing micro-moisture condensation that prevented varnish penetration.",
    rootCauseFlowOut: "First 240 units completed curing cycle before 2-hourly sampling Megger test detected the drop.",
    rootCauseSystemic: "Standard Operating Sheet lacked automated temperature interlock before varnish immersion.",
    permanentCountermeasure: "Installed contactless infrared pyrometer at dipping entrance interlocked to PLC: conveyor halts if stator core temperature is < 68°C. Enclosed pre-heat entrance vestibule with positive pressure dehumidified air (RH < 50%).",
    verificationMethod: "Logged core temperatures and insulation resistance across 6,500 stators during consecutive high-humidity shifts; average insulation resistance rose to 85.4 MΩ with zero readings < 40 MΩ (Cpk = 2.14).",
    horizontalDeployment: "Replicated infrared pyrometer interlock on Stator Lines 1 and 3 in AP Plant and shared 8D report with sister plant in Rayong.",
    lessonsLearned: "In tropical climates, never allow electrical coil pre-heat processes to interface directly with exterior shopfloor drafts during rainy seasons."
  },
  {
    id: "CASE-8D-2026-005",
    caseTitle: "400-Ton Transfer Stamping Press Upper Die Vibration & Stripper Guide Bushing Micro-Cracking",
    sectionId: "sec-pe",
    responsibleSectionId: "sec-jmd",
    process: "High-Speed Stamping Line #01 (400-Ton Transfer Press)",
    product: "Starter Motor Magnetic Switch Outer Case",
    part: "SPCE Deep-Drawing Stamping Shell",
    machine: "Komatsu 400T Transfer Press Machine & Progressive Die #PS-04",
    defectCategory: "Stripper Guide Bushing Fatigue Crack & Tonnage Imbalance",
    severity: "High - Catastrophic Die Breakdown Risk",
    occurrenceDateTime: "2026-02-04 10:15",
    detectionDateTime: "2026-02-04 10:30",
    detectionLocation: "Die Maintenance Pit & Press Acoustic Sensor #A-02",
    occurrenceLocation: "Upper Stripper Plate Guide Post #3 (Right Rear)",
    flowOutDestination: "Contained at Press Line (Die pulled for inspection)",
    affectedQuantity: 0,
    suspectedStock: 1200,
    rescreenedStock: 1200,
    okQuantity: 1200,
    ngQuantity: 0,
    pic: "Nutthapol Varin (Tooling & Machine Specialist)",
    status: "Countermeasure Verified (Closed)",
    closureDate: "2026-02-22",
    problemWhat: "Acoustic vibration telemetry flagged unusual 4.2 kHz harmonics on upper die during return stroke at 110 SPM.",
    problemWhere: "Press Shop Cell 1, 400T Komatsu Line.",
    problemWhen: "Running automotive starter motor casing lot following weekend die changeover.",
    problemWho: "Detected by automated TPM vibration monitoring and confirmed by Toolmaker Mongkol Boonmee.",
    expectedCondition: "Die vibration amplitude < 1.5 mm/s RMS; uniform nitrogen gas pressure across all 8 cylinders.",
    actualCondition: "Right rear nitrogen gas cylinder lost 18% charge, creating 14-ton eccentric tipping during stripper return stroke.",
    fiveWhy: [
      { why: "Why 1: Why did guide bushing develop micro-cracks?", answer: "Cyclic side-thrust bending moment exceeded fatigue endurance limit." },
      { why: "Why 2: Why was there high side-thrust bending moment?", answer: "Stripper plate tilted 0.12mm during high-speed return stroke." },
      { why: "Why 3: Why did the stripper plate tilt?", answer: "Nitrogen gas spring #4 pressure was 22 bar lower than spring #1 on opposite side." },
      { why: "Why 4: Why was nitrogen pressure uneven?", answer: "Individual gas cylinders were charged independently without a common balancing manifold." },
      { why: "Why 5: Why was no balancing manifold used? (Root Cause)", answer: "Original die design specification allowed standalone nitrogen springs without manifold coupling." }
    ],
    fishbone: {
      man: ["Die setter charged gas cylinders individually using portable hose", "Pre-flight pressure check did not record individual cylinder psi"],
      machine: ["Press ram parallelism was within 0.03mm", "Tonnage monitor did not display corner-by-corner dynamic tipping moment"],
      material: ["SKD11 tool steel bushing had correct hardness HRC 60-62", "Nitrogen purity was 99.9%"],
      method: ["Die design allowed standalone gas springs", "Maintenance interval set at 100,000 strokes instead of 50,000 strokes"],
      measurement: ["Dial indicator confirmed 0.12mm dynamic tipping", "Acoustic sensor detected anomaly before catastrophic guide pin fracture"],
      environment: ["Ambient shopfloor temperature 32°C", "Lubrication oil mist delivery was normal"]
    },
    temporaryAction: "Halted press immediately. Replaced guide posts and bushings on PS-04. Charged all gas springs to equal 150 bar. Inspected 1,200 stamped parts for wall thickness eccentricity (all 1,200 parts were within drawing tolerance).",
    temporaryEffectiveness: "Prevented catastrophic $45,000 die smash; zero NG parts produced.",
    rootCauseOccurrence: "Differential nitrogen gas pressure between left and right gas cylinders created eccentric tipping moments at high stroke rates.",
    rootCauseFlowOut: "Defect was detected before flow-out through proactive acoustic vibration monitoring.",
    rootCauseSystemic: "Tooling design standard lacked mandatory common manifold rule for nitrogen systems > 200 tons.",
    permanentCountermeasure: "Retrofit central equalizing manifold connecting all 8 nitrogen cylinders into a single closed circuit with digital pressure telemetry. Updated DENSO Tooling Standard JMD-STD-402 making balancing manifolds mandatory for all progressive dies > 200T.",
    verificationMethod: "Monitored die vibration across 450,000 strokes; dynamic tipping reduced from 0.12mm to < 0.015mm, vibration amplitude stabilized at 0.8 mm/s.",
    horizontalDeployment: "Audited all 14 progressive dies in plant; fitted equalizing manifolds on 5 identified dies lacking central circuits.",
    lessonsLearned: "Never use standalone un-manifolded nitrogen gas springs in high-speed transfer or progressive stamping dies where eccentric moments cause fatigue fractures."
  }
];

// 5. Rich Experiences & Lessons Learned: 8 records
const experiences = existing.dnkhExperiences || [];

// 6. Controlled Documents & Standards: 10 documents
const documents = [
  ...existing.dnkhDocuments || [],
  {
    docNo: "DNKH-QA1-STD-019",
    title: "Helium Vacuum Leak Detection & Sniffer Verification Standard",
    sectionId: "sec-qa1",
    revision: "Rev 2.1",
    effectiveDate: "2026-01-10",
    nextCheckDate: "2027-01-10",
    owner: "Kittisak Prasert",
    sourceSystem: "e-SMART ISO",
    confidentiality: "Internal - DNKH Only",
    fileType: "PDF",
    size: "3.1 MB",
    status: "Valid",
    linkUrl: "https://esmart.dnkh.internal/doc/QA1-019"
  },
  {
    docNo: "DNKH-QA2-STD-108",
    title: "Inverter PCBA High-Voltage Solder Void Rate Reduction & AOI Metrology Standard",
    sectionId: "sec-qa2",
    revision: "Rev 3.0",
    effectiveDate: "2025-11-20",
    nextCheckDate: "2026-11-20",
    owner: "Viroj Tantrakul",
    sourceSystem: "DocSavvy",
    confidentiality: "Internal - DNKH Only",
    fileType: "PDF",
    size: "4.5 MB",
    status: "Valid",
    linkUrl: "https://docsavvy.dnkh.internal/spec/QA2-108"
  },
  {
    docNo: "DNKH-GA-BCP-001",
    title: "Plantwide Hazardous Chemical Manifest, Spill Containment & Evacuation Protocol",
    sectionId: "sec-ga",
    revision: "Rev 4.0",
    effectiveDate: "2025-05-15",
    nextCheckDate: "2026-05-15",
    owner: "Somkiat Boonserm",
    sourceSystem: "e-SMART ISO",
    confidentiality: "Public - All Associates",
    fileType: "PDF",
    size: "5.2 MB",
    status: "Valid",
    linkUrl: "https://esmart.dnkh.internal/bcp/001"
  },
  {
    docNo: "DNKH-MGMT-POL-001",
    title: "Monozukuri Hoshin Kanri Strategic Policy Deployment & Annual KPI Cascade",
    sectionId: "sec-mgmt",
    revision: "Rev 5.0",
    effectiveDate: "2026-01-01",
    nextCheckDate: "2027-01-01",
    owner: "Narongkorn Chaisiri",
    sourceSystem: "DocSavvy",
    confidentiality: "Internal - DNKH Only",
    fileType: "PDF",
    size: "2.8 MB",
    status: "Valid",
    linkUrl: "https://docsavvy.dnkh.internal/hoshin/001"
  }
];

// 7. Experts: Comprehensive Evidence-Based Directory across all sections (Zero rankings)
const experts = [
  ...existing.dnkhExperts || [],
  {
    id: "exp-kittisak",
    name: "Kittisak Prasert",
    sectionId: "sec-qa1",
    role: "QA1 Senior Lead / Helium Leak & Waterproof Assurance Specialist",
    avatarInitials: "KP",
    expertiseArea: "Helium Leak Detection & Chassis Reliability",
    skills: ["Helium Mass Spectrometry", "Chassis Weld Assurance", "IP67 Waterproof Standards", "IATF 16949 Auditing"],
    mentoringAvailable: true,
    email: "kittisak.prasert@dnkh.denso.com",
    yearsExperience: 19,
    verifiedRecordsCount: 16,
    validationStatus: "Verified",
    validatedBy: "Kenji Nomura (QA Senior Director)",
    validationDate: "2026-01-15",
    nextReviewDate: "2027-01-15",
    languages: ["English", "Thai", "Japanese"],
    knowledgeEvidence: "Holds Level 4 Certified Helium Metrology Auditor certification.",
    skillEvidence: "Demonstrated zero-error calibration on Pfeiffer sniffer systems across 8 lines.",
    experienceEvidence: "Resolved 14 chassis water intrusion field risks without customer claims.",
    standardsCreated: ["SOS-QA1-EPS-019", "STD-QA1-WELD-004"],
    trainingDelivered: "42 hours of high-voltage waterproof testing training."
  },
  {
    id: "exp-viroj",
    name: "Viroj Tantrakul",
    sectionId: "sec-qa2",
    role: "QA2 Technical Lead / High-Voltage PCBA Soldering SME",
    avatarInitials: "VT",
    expertiseArea: "High-Voltage PCBA Reliability & 3D X-Ray Inspection",
    skills: ["3D AXI / AOI Metrology", "Nitrogen Reflow Optimization", "Solder Void Mitigation", "IPC-A-610 Class 3"],
    mentoringAvailable: true,
    email: "viroj.tantrakul@dnkh.denso.com",
    yearsExperience: 22,
    verifiedRecordsCount: 21,
    validationStatus: "Verified",
    validatedBy: "Kenji Nomura (QA Senior Director)",
    validationDate: "2026-02-01",
    nextReviewDate: "2027-02-01",
    languages: ["English", "Thai", "Japanese"],
    knowledgeEvidence: "Published DENSO Global Technical Note on QFN void elimination.",
    skillEvidence: "Tuned nitrogen vacuum reflow parameters achieving < 5% void rates on 400V modules.",
    experienceEvidence: "Delivered 180,000 automotive inverter assemblies with zero thermal field issues.",
    standardsCreated: ["MS-QA2-108", "SOP-QA2-AOI-02"],
    trainingDelivered: "58 hours of SMT thermal profiling and solder inspection courses."
  },
  {
    id: "exp-somkiat",
    name: "Somkiat Boonserm",
    sectionId: "sec-ga",
    role: "General Affairs Manager / Crisis BCP & Statutory Compliance Lead",
    avatarInitials: "SB",
    expertiseArea: "Plant Disaster BCP & Hazardous Materials Governance",
    skills: ["Hazardous Waste Manifests", "Crisis Emergency Evacuation", "Industrial Facility Licensing", "Security Management"],
    mentoringAvailable: true,
    email: "somkiat.boonserm@dnkh.denso.com",
    yearsExperience: 25,
    verifiedRecordsCount: 14,
    validationStatus: "Verified",
    validatedBy: "Hiroshi Tanaka (Managing Director)",
    validationDate: "2026-01-10",
    nextReviewDate: "2027-01-10",
    languages: ["English", "Thai"],
    knowledgeEvidence: "Certified Industrial Safety and Hazardous Waste Management Director.",
    skillEvidence: "Led rapid containment drill mitigating simulated 1,000-liter chemical tank rupture.",
    experienceEvidence: "Maintained 100% compliance across 48 local municipal statutory audits.",
    standardsCreated: ["GA-BCP-001", "SOP-GA-SEC-05"],
    trainingDelivered: "35 hours of emergency crisis leadership for supervisors."
  },
  {
    id: "exp-narongkorn",
    name: "Narongkorn Chaisiri",
    sectionId: "sec-mgmt",
    role: "Plant Operations GM / Hoshin Kanri & Monozukuri Governance Lead",
    avatarInitials: "NC",
    expertiseArea: "Monozukuri Hoshin Kanri & Cross-Sectional Kaizen",
    skills: ["Hoshin Kanri X-Matrix", "Cross-Sectional Yokoten", "Operational Risk Management", "TPS / Monozukuri"],
    mentoringAvailable: true,
    email: "narongkorn.chaisiri@dnkh.denso.com",
    yearsExperience: 30,
    verifiedRecordsCount: 29,
    validationStatus: "Verified",
    validatedBy: "Hiroshi Tanaka (Managing Director)",
    validationDate: "2026-01-05",
    nextReviewDate: "2027-01-05",
    languages: ["English", "Thai", "Japanese"],
    knowledgeEvidence: "Senior DENSO Monozukuri Master Instructor certified at DENSO Global Headquarters.",
    skillEvidence: "Facilitates plantwide Hoshin Kanri cascade across all 19 organizational sections.",
    experienceEvidence: "Supervised plant operations achieving top plant status across ASEAN affiliate network.",
    standardsCreated: ["MGMT-POL-001", "YOKOTEN-GOV-001"],
    trainingDelivered: "120 hours of senior management coaching and Monozukuri leadership."
  }
];

// Ensure all existing experts have validation status and evidence fields
experts.forEach(exp => {
  if (!exp.validationStatus) exp.validationStatus = "Verified";
  if (!exp.validatedBy) exp.validatedBy = "Section Technical Reviewer Committee";
  if (!exp.validationDate) exp.validationDate = "2026-01-20";
  if (!exp.nextReviewDate) exp.nextReviewDate = "2027-01-20";
  if (!exp.languages) exp.languages = ["English", "Thai"];
  if (!exp.expertiseArea) exp.expertiseArea = exp.skills ? exp.skills[0] : "Manufacturing Engineering";
});

// 8. Assessments: 12 assessments
const assessments = [
  ...existing.dnkhAssessments || [],
  {
    id: "ASM-009",
    employeeName: "Chatchai Promsak",
    sectionId: "sec-qa1",
    topicName: "Helium Leak Detection",
    level: 3,
    levelTitle: "L3: Experience",
    evidenceSummary: "Independently operated and calibrated Pfeiffer vacuum leak detector during 12 pilot vehicle trials.",
    reviewerName: "Kittisak Prasert (QA1 Senior Lead)",
    reviewStatus: "Verified",
    lastReviewDate: "2026-02-15",
    developmentAction: "Prepare Level 4 qualification by authoring operator quick-troubleshooting card."
  },
  {
    id: "ASM-010",
    employeeName: "Wanida Sornchai",
    sectionId: "sec-qa2",
    topicName: "PCBA Soldering Standards",
    level: 2,
    levelTitle: "L2: Skill",
    evidenceSummary: "Completed guided 3D X-Ray void calculation training; passed IPC-A-610 Class 3 practical test.",
    reviewerName: "Viroj Tantrakul (QA2 Technical Lead)",
    reviewStatus: "Verified",
    lastReviewDate: "2026-02-20",
    developmentAction: "Execute independent void audits on 400V inverter pilot line to achieve Level 3."
  },
  {
    id: "ASM-011",
    employeeName: "Jiraporn S.",
    sectionId: "sec-ga",
    topicName: "Emergency Crisis Planning",
    level: 4,
    levelTitle: "L4: Knowledge Sharing",
    evidenceSummary: "Revised GA-BCP-001; conducted plantwide evacuation simulation for 1,400 associates with 0 findings.",
    reviewerName: "Somkiat Boonserm (GA Manager)",
    reviewStatus: "Verified",
    lastReviewDate: "2026-01-28",
    developmentAction: "Train newly appointed building marshals across Night Shift operations."
  },
  {
    id: "ASM-012",
    employeeName: "Ananya Kasem",
    sectionId: "sec-dx",
    topicName: "Power Apps",
    level: 4,
    levelTitle: "L4: Knowledge Sharing",
    evidenceSummary: "Designed enterprise responsive container boilerplate; mentored 32 citizen developers across 11 sections.",
    reviewerName: "Somchai Prasert (Lead Solution Architect)",
    reviewStatus: "Verified",
    lastReviewDate: "2026-02-10",
    developmentAction: "Host monthly Power Platform hackathon and govern tenant component library."
  }
];

// 9. Review Queue: Expanded to cover all 8 sub-queues
const reviewQueue = [
  {
    id: "REV-001",
    recordId: "REC-QA-001",
    recordTitle: "Alternator Stator Coil Insulation Resistance Drop During High Humidity",
    sectionId: "sec-qa",
    step: "Pending Approval",
    assignedTo: "Kenji Nomura (Head QA)",
    submittedBy: "Pitchaya Siriporn",
    submittedDate: "2026-02-26",
    status: "Pending Approval",
    priority: "High"
  },
  {
    id: "REV-002",
    recordId: "REC-TIE-001",
    recordTitle: "Karakuri Gravity Chute & Line Balancing Kaizen Reducing 14% Operator Walking Fatigue",
    sectionId: "sec-tie",
    step: "Technical Review",
    assignedTo: "Siriporn Lertchai (Technical Reviewer)",
    submittedBy: "Teerapat S.",
    submittedDate: "2026-03-01",
    status: "Technical Review",
    priority: "Normal"
  },
  {
    id: "REV-003",
    recordId: "REC-TPM-001",
    recordTitle: "CNC Spindle Vibration FFT Analysis & Predictive Bearing Replacement Standard",
    sectionId: "sec-tpm",
    step: "Revision Required",
    assignedTo: "Preecha Kaewkla",
    submittedBy: "Tawan Phromdee",
    submittedDate: "2026-02-18",
    status: "Revision Required",
    priority: "Normal",
    comments: "Please attach raw accelerometer spectral graphs comparing healthy vs spalled bearing frequencies."
  },
  {
    id: "REV-004",
    recordId: "REC-DX-001",
    recordTitle: "Citizen Developer Application Governance, Tier Classification & Handover Standard",
    sectionId: "sec-dx",
    step: "Review Expired",
    assignedTo: "Somchai Prasert",
    submittedBy: "Ananya Kasem",
    submittedDate: "2025-05-10",
    status: "Review Expired",
    priority: "Urgent",
    comments: "Scheduled annual governance review is due. Please review recent tenant security policy updates."
  },
  {
    id: "REV-005",
    recordId: "REC-QA1-001",
    recordTitle: "Electric Power Steering Motor Stator Helium Leak Detection & Micro-Pinhole Prevention Standard",
    sectionId: "sec-qa1",
    step: "Initial Check",
    assignedTo: "Chatchai Promsak (Window Person QA1)",
    submittedBy: "Sample Contributor QA1",
    submittedDate: "2026-03-04",
    status: "Initial Check",
    priority: "High"
  },
  {
    id: "REV-006",
    recordId: "REC-QA2-001",
    recordTitle: "Inverter PCBA High-Voltage Solder Void Rate Reduction & AOI Metrology Standard",
    sectionId: "sec-qa2",
    step: "Overdue",
    assignedTo: "Viroj Tantrakul",
    submittedBy: "Thaksin Chai",
    submittedDate: "2026-02-05",
    status: "Overdue",
    priority: "Urgent",
    comments: "SLA exceeded: Technical review pending over 21 days."
  },
  {
    id: "REV-007",
    recordId: "REC-QC-001",
    recordTitle: "Genba Defect Standard & OK/NG Judgement Boundary Catalog for Fuel Injector Nozzle Holes",
    sectionId: "sec-qc",
    step: "Recently Completed",
    assignedTo: "Wichai Thongchai",
    submittedBy: "Kittipong Sakul",
    submittedDate: "2026-02-12",
    status: "Approved",
    priority: "Normal",
    comments: "Approved and published version 3.1 with optical boundary limits."
  }
];

// 10. Audit Log
const auditLog = [
  ...existing.dnkhAuditLog || [],
  {
    id: "AUD-006",
    timestamp: "2026-03-02 11:20:14",
    user: "Viroj Tantrakul (QA2 Lead)",
    role: "Technical Reviewer",
    action: "APPROVE_RECORD",
    target: "REC-QA2-001 (Inverter Solder Void)",
    details: "Validated 3D AXI void calculation algorithm and recommended final publication.",
    previousStatus: "Technical Review",
    newStatus: "Pending Approval"
  },
  {
    id: "AUD-007",
    timestamp: "2026-03-03 14:45:00",
    user: "Kenji Nomura (Head QA)",
    role: "Head Section / Approver",
    action: "PUBLISH_RECORD",
    target: "REC-QA1-001 (Helium Leak Standard)",
    details: "Authorized publication of version 2.1 across DNKH Quality network.",
    previousStatus: "Pending Approval",
    newStatus: "Published"
  }
];

// 11. Controlled System Quick Links
const quickLinks = existing.dnkhQuickLinks || [
  { id: "sys-esmart", name: "e-SMART ISO", desc: "DNKH Controlled Quality & Environmental Procedures", url: "https://esmart.dnkh.internal", icon: "fa-shield-halved", color: "#e60012" },
  { id: "sys-mms", name: "MMS", desc: "Maintenance Management & Predictive Vibration Telemetry", url: "https://mms.dnkh.internal", icon: "fa-wrench", color: "#f59e0b" },
  { id: "sys-dis", name: "DIS", desc: "DENSO Inspection System & Optical Measurement Gates", url: "https://dis.dnkh.internal", icon: "fa-microscope", color: "#0284c7" },
  { id: "sys-dps", name: "DPS", desc: "Digital Production System & Hourly Line Output Tracking", url: "https://dps.dnkh.internal", icon: "fa-industry", color: "#10b981" },
  { id: "sys-das", name: "DAS", desc: "DENSO Abnormality & Incident Escalation Tracking", url: "https://das.dnkh.internal", icon: "fa-triangle-exclamation", color: "#ef4444" },
  { id: "sys-dms", name: "DMS", desc: "Die & Mold Life History Management Database", url: "https://dms.dnkh.internal", icon: "fa-screwdriver-wrench", color: "#ec4899" },
  { id: "sys-dxeep", name: "DxEEP", desc: "Digital Experience & Employee Enablement Portal", url: "https://dxeep.dnkh.internal", icon: "fa-lightbulb", color: "#8b5cf6" },
  { id: "sys-docsavvy", name: "DocSavvy", desc: "Controlled Engineering Drawings & Technical Standards", url: "https://docsavvy.dnkh.internal", icon: "fa-file-shield", color: "#06b6d4" },
  { id: "sys-qanet", name: "QA Network", desc: "Global DENSO Customer Claim & Yokoten Database", url: "https://qanet.denso.global", icon: "fa-globe", color: "#dc2626" }
];

const fullData = {
  dnkhSections: sections,
  dnkhRecordTypes: recordTypes,
  dnkhCapabilityLevels: capabilityLevels,
  dnkhRecords: records,
  dnkhTroubleshootingCases: cases,
  dnkhExperiences: experiences,
  dnkhProjects: existing.dnkhProjects || [],
  dnkhReusableAssets: existing.dnkhReusableAssets || [],
  dnkhLearningPaths: existing.dnkhLearningPaths || [],
  dnkhDocuments: documents,
  dnkhExperts: experts,
  dnkhAssessments: assessments,
  dnkhReviewQueue: reviewQueue,
  dnkhAuditLog: auditLog,
  dnkhQuickLinks: quickLinks
};

console.log('Final data summary:');
console.log('Sections:', fullData.dnkhSections.length);
console.log('Record Types:', fullData.dnkhRecordTypes.length);
console.log('Capability Levels:', fullData.dnkhCapabilityLevels.length);
console.log('Records:', fullData.dnkhRecords.length);
console.log('Troubleshooting Cases:', fullData.dnkhTroubleshootingCases.length);
console.log('Experiences:', fullData.dnkhExperiences.length);
console.log('Documents:', fullData.dnkhDocuments.length);
console.log('Experts:', fullData.dnkhExperts.length);
console.log('Assessments:', fullData.dnkhAssessments.length);

// Write to dnkh-data.json
fs.writeFileSync('dnkh-data.json', JSON.stringify(fullData, null, 2), 'utf8');

// Write to dnkh-data.js
const jsContent = 'window.DNKH_MASTER_DATA = ' + JSON.stringify(fullData) + ';\n';
fs.writeFileSync('dnkh-data.js', jsContent, 'utf8');

console.log('Successfully wrote dnkh-data.json and dnkh-data.js!');
