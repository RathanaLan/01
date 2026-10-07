/**
 * DNA MATRIX PLATFORM - PURE HTML APPLICATION CONTROLLER
 * 100% Native Elements - Zero Base Photo Dependencies
 * Features:
 * 1. Full CRUD: Add New Record & Edit Record with File Attachment or Link
 * 2. Pure HTML/CSS Screen 1 (Home), Screen 2 (Troubleshooting), Screen 3 (Knowledge)
 * 3. Interactive Modals: 3-Page Q-Trouble Sheet, MMS, e-SMART ISO, DxEEP, DocSavvy, Dept Profile
 * 4. LocalStorage persistence across page refreshes
 * 5. Full responsiveness and real-time live search
 */

(function () {
  'use strict';

  // Local Storage Keys
  const LS_KEY_DEFECTS = 'dna_matrix_defects_v4';
  const LS_KEY_KNOWLEDGE = 'dna_matrix_knowledge_v3';

  // Seed Defect Records matching Photo 2 + Multi-product extension
  const INITIAL_DEFECT_RECORDS = [
    {
      id: 'crimp',
      code: 'QA-RAD-2025-089',
      title: 'Radiator Crimp End Plate NG',
      product: 'Radiator',
      category: 'Cust. Claim',
      severity: 'Critical',
      author: 'Tanaka Hiroshi (QA Senior Specialist)',
      date: '2025-10-14',
      attachType: 'file',
      fileName: 'Radiator_Crimp_End_Plate_Report.pdf',
      fileSize: '2.4 MB',
      linkUrl: '',
      occurrence: 'Part N: 426A111-3560. Seepage observed at lower header crimp tab. 1 pcs defect reported from vehicle assembly line test.',
      genbutsuNG: 'Crimping height offset +0.12mm outside Lower Spec Limit. Visual gap between crimp tab and tank lip under 10x magnification.',
      genbutsuOK: 'Uniform crimp tab profile with 0.05mm tolerance band. Zero bubble leakage under 250 kPa underwater immersion test.',
      scopeProcess: 'Line 2 Header Crimp Unit punch tool wear occurred after 52,000 cycles without thermal compensation recalibration.',
      flowOut: 'Pneumatic leak tester calibration drift allowed micro-defect to pass final inspection station.',
      whys: [
        { level: 'Why 1', text: 'Why did crimp leak? → Crimp height exceeded LSL by 0.12mm.' },
        { level: 'Why 2', text: 'Why did it exceed LSL? → Forming punch exhibited localized fatigue wear.' },
        { level: 'Why 3', text: 'Why was wear unnoticed? → Maintenance stroke counter check was set to 50k instead of 30k cycles.' },
        { level: 'Why 4', text: 'Why was threshold 50k? → Maintenance guideline lacked material hardness variation coefficient.' },
        { level: 'Root Cause', text: 'Lack of confirm the risk point & motion to cover all punch wear variation.' }
      ],
      countermeasure: 'Installed automatic laser displacement gauge with direct PLC interlock to stop line upon +/-0.05mm crimp height deviance. Updated Furikae shift checksheet.'
    },
    {
      id: 'netsuke',
      code: 'QA-RAD-2025-042',
      title: '27D HP Netsuke Leak',
      product: 'Radiator',
      category: 'Cust. Claim',
      severity: 'Critical',
      author: 'Kenji Nomura (QA/PE)',
      date: '2025-09-18',
      attachType: 'file',
      fileName: '27D_HP_Netsuke_Joint_Analysis.pdf',
      fileSize: '3.1 MB',
      linkUrl: '',
      occurrence: 'Helium sniffer test detected 1.2 x 10^-5 Pa m3/s micro-leak at Netsuke joint after pressure thermal cycle test.',
      genbutsuNG: 'Incomplete fillet formation at tube-to-header corner radius. Voids visible in Nocolok brazing flux boundary.',
      genbutsuOK: 'Smooth, unbroken 360-degree brazed fillet with 100% capillary penetration across all tube joints.',
      scopeProcess: 'CAB brazing furnace zone 3 flux spray nozzle clogged at 45-degree corner angle.',
      flowOut: 'Standard water dunk test bubbles were absorbed by bracket shadow.',
      whys: [
        { level: 'Why 1', text: 'Why was joint unsealed? → Flux density below 5 g/m2 at corner.' },
        { level: 'Why 2', text: 'Why was flux density low? → Spray nozzle orifice partially fouled.' },
        { level: 'Why 3', text: 'Why fouled? → Slurry recirculation filter mesh torn.' },
        { level: 'Root Cause', text: 'Lack of automatic differential pressure sensor across flux filter.' }
      ],
      countermeasure: 'Added dual differential pressure transmitters on flux line and automated vision flux inspection.'
    },
    {
      id: 'fin',
      code: 'QA-RAD-2025-033',
      title: 'Fin No Brazing',
      product: 'Radiator',
      category: 'Cust. Claim',
      severity: 'Major',
      author: 'Sato Daisuke (Brazing Master)',
      date: '2025-08-22',
      attachType: 'file',
      fileName: 'CAB_Fin_Brazing_Thermal_Log.pdf',
      fileSize: '1.8 MB',
      linkUrl: '',
      occurrence: 'Cold bond of corrugated aluminum fins on core tubes across 4 channels in batch #408.',
      genbutsuNG: 'Fins peeling off tubes without metallurgical alloy bond.',
      genbutsuOK: 'Strong metallurgical bonding with zero fin detachment at 15 N peel force.',
      scopeProcess: 'CAB brazing furnace nitrogen atmosphere oxygen spike (>30 ppm).',
      flowOut: 'Automated thermal camera threshold bypassed during furnace restart.',
      whys: [
        { level: 'Why 1', text: 'Why no brazing? → Heavy oxide layer prevented filler metal melt.' },
        { level: 'Why 2', text: 'Why oxide layer? → Atmospheric oxygen entered through degraded nitrogen curtain.' },
        { level: 'Root Cause', text: 'Curtain nitrogen diffuser baffle warped from thermal expansion.' }
      ],
      countermeasure: 'Redesigned nitrogen curtain diffusers with dual-stage laminar flow and continuous O2 telemetry.'
    },
    {
      id: 'slip',
      code: 'QA-RAD-2025-021',
      title: 'Radiator Packing Slip',
      product: 'Radiator',
      category: 'Internal Defect',
      severity: 'Major',
      author: 'Yuki Takahashi (Line 1 Leader)',
      date: '2025-07-30',
      attachType: 'file',
      fileName: 'EPDM_Gasket_Seating_Investigation.pdf',
      fileSize: '1.5 MB',
      linkUrl: '',
      occurrence: 'EPDM packing seal pinched between tank and header during automatic assembly insertion.',
      genbutsuNG: 'O-ring gasket extruded 1.5mm outside groove lip.',
      genbutsuOK: 'Gasket 100% seated within recessed groove with silicone grease coating.',
      scopeProcess: 'Tank seating robot gripper angle tilt under winter low air pressure.',
      flowOut: 'Discovered at in-line helium chamber before packaging.',
      whys: [
        { level: 'Why 1', text: 'Why slipped? → Gasket dragged during tank downward insertion.' },
        { level: 'Why 2', text: 'Why dragged? → Silicone lube viscosity too high at 14°C ambient.' },
        { level: 'Root Cause', text: 'Absence of temperature-controlled lubricant reservoir.' }
      ],
      countermeasure: 'Added heated lube dispensing unit and 360-degree vision camera before crimping.'
    },
    {
      id: 'imv',
      code: 'QA-RAD-2025-015',
      title: 'NG Installation Point of IMV Radiator',
      product: 'Radiator',
      category: 'Cust. Claim',
      severity: 'Major',
      author: 'Kenji Nomura (QA)',
      date: '2025-06-15',
      attachType: 'file',
      fileName: 'IMV_Bracket_Orientation_PokaYoke.pdf',
      fileSize: '2.1 MB',
      linkUrl: '',
      occurrence: 'Bracket mounting weld nut orientation inverted by 180 degrees on assembly chassis.',
      genbutsuNG: 'M8 nut welded on reverse face, chassis bolt cannot engage threads.',
      genbutsuOK: 'Nut centered on outer face with correct thread pitch orientation.',
      scopeProcess: 'Manual welding fixture loading by new operator during Furikae rotation.',
      flowOut: 'Bracket jig lacked asymmetric poka-yoke pin.',
      whys: [
        { level: 'Why 1', text: 'Why inverted? → Operator loaded bracket upside down.' },
        { level: 'Why 2', text: 'Why possible to load? → Bracket outline was symmetrical.' },
        { level: 'Root Cause', text: 'Fixturing lacked mechanical poka-yoke lockout.' }
      ],
      countermeasure: 'Added asymmetric locating pin and electrical continuity sensing on welding jig.'
    },
    {
      id: 'rad-warranty-tank',
      code: 'QA-RAD-2025-064',
      title: 'Radiator Lower Header Tank Micro-Leak (Field Warranty Claim)',
      product: 'Radiator',
      category: 'Warranty Claim',
      severity: 'Critical',
      author: 'Tanaka Hiroshi (QA Senior Specialist)',
      date: '2025-08-11',
      attachType: 'file',
      fileName: 'Radiator_Field_Warranty_Claim_RCA.pdf',
      fileSize: '2.8 MB',
      linkUrl: '',
      occurrence: 'Field warranty claim at 22,000 km: coolant seepage observed at lower nylon tank weld seam under vehicle cyclic thermal fatigue.',
      genbutsuNG: 'Micro-fissure at PA66-GF30 tank ultrasonic weld rib boundary caused by localized weld energy deficit.',
      genbutsuOK: 'Continuous fused melt layer with >1.2mm weld collapse depth and zero micro-voids across entire perimeter.',
      scopeProcess: 'Ultrasonic welder horn vibration amplitude drop during line voltage fluctuation.',
      flowOut: 'Factory pressure burst test detected only gross leaks; micro-joint weakness passed initial QC.',
      whys: [
        { level: 'Why 1', text: 'Why did seam leak? → Weld rib experienced fatigue crack under engine heat cycles.' },
        { level: 'Why 2', text: 'Why fatigue crack? → Weld collapse depth was only 0.7mm instead of 1.2mm spec.' },
        { level: 'Why 3', text: 'Why low collapse? → Ultrasonic generator output dipped during facility power surge.' },
        { level: 'Root Cause', text: 'Welder lacked constant-energy closed loop feedback control.' }
      ],
      countermeasure: 'Upgraded to servo-driven ultrasonic welding machines with 100% real-time energy & collapse monitoring interlock.'
    },
    {
      id: 'mag-insul',
      code: 'QA-MAG-2025-011',
      title: 'Magneto Flywheel Stator Coil Insulation Breakdown',
      product: 'Magneto',
      category: 'Warranty Claim',
      severity: 'Critical',
      author: 'H. Mori (Electrical QA Master)',
      date: '2025-09-04',
      attachType: 'file',
      fileName: 'Magneto_Coil_Dielectric_Failure_RCA.pdf',
      fileSize: '3.4 MB',
      linkUrl: '',
      occurrence: 'Engine stall in field warranty claim: stator high-voltage generation coil suffered micro-arcing breakdown at 85°C.',
      genbutsuNG: 'Pinhole dielectric puncture in copper magnet wire enamel layer at sharp winding bend.',
      genbutsuOK: 'Double-insulated polyamide-imide enamel layer with >4.5kV dielectric withstand margin.',
      scopeProcess: 'Automatic stator coil winder guide needle tension peak exceeded 18N during corner indexing.',
      flowOut: 'Cold dielectric bench test voltage threshold (1.5kV) was inadequate to catch hot insulation pinholes.',
      whys: [
        { level: 'Why 1', text: 'Why did coil short? → Insulation enamel cracked at tooth corner.' },
        { level: 'Why 2', text: 'Why cracked? → Wire tension exceeded 18N during high-speed flyer indexing.' },
        { level: 'Why 3', text: 'Why exceeded? → Winder servo tension compensator response lag.' },
        { level: 'Root Cause', text: 'Lack of real-time closed-loop piezo tension control on winding arm.' }
      ],
      countermeasure: 'Installed high-speed piezo dynamic tension control and introduced 3.5kV hot surge testing at end-of-line.'
    },
    {
      id: 'mag-gap',
      code: 'QA-MAG-2025-028',
      title: 'Magneto Rotor-Stator Air Gap Drift & Rubbing',
      product: 'Magneto',
      category: 'OGC & TH',
      severity: 'Major',
      author: 'Tanaka Hiroshi (PE)',
      date: '2025-08-11',
      attachType: 'file',
      fileName: 'Magneto_Air_Gap_Interference_Report.pdf',
      fileSize: '2.8 MB',
      linkUrl: '',
      occurrence: 'Abnormal high-pitch humming noise at 6,500 RPM on Thailand engine assembly test stand.',
      genbutsuNG: 'Air gap narrowed to 0.12mm (Spec: 0.35 ± 0.08mm). Friction burnish marks on pole shoe tips.',
      genbutsuOK: 'Concentric 0.35mm uniform clearance with total rotor runout within 0.03mm.',
      scopeProcess: 'Rotor hub shrink-fit hydraulic press fixture had thermal expansion offset during afternoon shift.',
      flowOut: 'Feeler gauge manual inspection was sampled at only 1 radial position.',
      whys: [
        { level: 'Why 1', text: 'Why did rotor rub? → Radial clearance decreased below 0.15mm.' },
        { level: 'Why 2', text: 'Why clearance low? → Rotor hub pressed with 0.05mm angular tilt.' },
        { level: 'Why 3', text: 'Why tilted? → Press upper ram guide bushing had uneven thermal drift.' },
        { level: 'Root Cause', text: 'Press tool tooling lacked water-cooled stabilization jacket.' }
      ],
      countermeasure: 'Fitted press fixture with recirculating chiller jacket and 4-channel Eddy current radial displacement sensors.'
    },
    {
      id: 'mag-pin',
      code: 'QA-MAG-2025-004',
      title: 'Magneto Waterproof Connector Pin Push-Back',
      product: 'Magneto',
      category: 'Internal Defect',
      severity: 'Minor',
      author: 'Yuki Takahashi (QA)',
      date: '2025-07-19',
      attachType: 'link',
      fileName: '',
      fileSize: '',
      linkUrl: 'https://dxeep.denso.com/quality/mag-connector-pin',
      occurrence: 'Intermittent signal continuity on charging coil output during inline bench testing.',
      genbutsuNG: 'Terminal pin pushed back 3.2mm into housing; plastic locking lance failed to engage.',
      genbutsuOK: 'Terminal lance audibly locked with >55N terminal retention force.',
      scopeProcess: 'Manual terminal crimp harness insertion station by trainee operator.',
      flowOut: 'Discovered at electrical continuity test jig before packing.',
      whys: [
        { level: 'Why 1', text: 'Why pin pushed back? → Terminal not inserted to full shoulder depth.' },
        { level: 'Why 2', text: 'Why not full depth? → Rubber seal drag resistance mistaken for lance lock.' },
        { level: 'Root Cause', text: 'Terminal insertion tool lacked electronic tactile force-displacement verification.' }
      ],
      countermeasure: 'Equipped all harness assembly benches with pneumatic pull-to-seat sensors and acoustic click monitors.'
    },
    {
      id: 'lev-reed',
      code: 'QA-LS-2025-019',
      title: 'Level Switch Magnetic Reed Contact Sticking',
      product: 'Level Switch',
      category: 'Cust. Claim',
      severity: 'Critical',
      author: 'Kenji Nomura (QA Lead)',
      date: '2025-09-29',
      attachType: 'file',
      fileName: 'Level_Switch_Reed_Contact_Welding_Study.pdf',
      fileSize: '3.2 MB',
      linkUrl: '',
      occurrence: 'Low brake fluid warning light remained OFF when fluid level dropped below warning mark in vehicle trial.',
      genbutsuNG: 'Rhodium reed switch blades welded together by micro-spark inrush arc; switch permanently closed.',
      genbutsuOK: 'Clean, polished reed blades with 0.15mm open contact gap and zero micro-welding.',
      scopeProcess: 'Capacitive discharge from long test wiring harness created 2.8A peak inrush spike.',
      flowOut: 'Final electrical test used pure resistive load which did not recreate vehicle capacitive harness inrush.',
      whys: [
        { level: 'Why 1', text: 'Why switch stuck? → Reed contacts micro-welded upon closure.' },
        { level: 'Why 2', text: 'Why micro-welded? → 2.8A inrush current exceeded 0.5A contact rating.' },
        { level: 'Why 3', text: 'Why inrush current high? → Vehicle ECU input pin capacitance lacked series damping.' },
        { level: 'Root Cause', text: 'Sensor PCB lacked onboard series surge limiting resistor.' }
      ],
      countermeasure: 'Integrated 100Ω surface-mount MELF surge-limiting resistor and TVS diode onto sensor internal circuit board.'
    },
    {
      id: 'lev-slosh',
      code: 'QA-LS-2025-032',
      title: 'Ultrasonic Level Sensor Slosh & Micro-Bubble False Alarm',
      product: 'Level Switch',
      category: 'OGC & TH',
      severity: 'Major',
      author: 'Dr. Aoi Yamamoto (DX/QA)',
      date: '2025-08-05',
      attachType: 'link',
      fileName: '',
      fileSize: '',
      linkUrl: 'https://dxeep.denso.com/level-switch/ultrasonic-slosh',
      occurrence: 'False low coolant warning triggered during slalom test track maneuvers in Thailand test facility.',
      genbutsuNG: 'Ultrasonic echo waveform attenuated below trigger threshold by aerated coolant froth.',
      genbutsuOK: 'Consistent acoustic echo waveform above 75% SNR across all slosh and bubble dynamics.',
      scopeProcess: 'Sensor acoustic horn geometry allowed micro-bubble accumulation on transducer face.',
      flowOut: 'Static water level tank testing did not reproduce dynamic vehicle slosh froth.',
      whys: [
        { level: 'Why 1', text: 'Why false alarm? → Sensor reported zero liquid echo.' },
        { level: 'Why 2', text: 'Why zero echo? → Bubble froth on face scattered ultrasonic beam.' },
        { level: 'Root Cause', text: 'Acoustic horn design had horizontal entrapment pocket without bubble bleed orifices.' }
      ],
      countermeasure: 'Redesigned transducer horn with 30° cone shed angle and implemented DSP moving-average echo validation algorithm.'
    },
    {
      id: 'lev-pot',
      code: 'QA-LS-2025-007',
      title: 'Level Switch Polyurethane Potting Resin Moisture Ingress',
      product: 'Level Switch',
      category: 'Warranty Claim',
      severity: 'Major',
      author: 'Sato Daisuke (PE)',
      date: '2025-06-28',
      attachType: 'file',
      fileName: 'Potting_Delamination_Environmental_Report.pdf',
      fileSize: '2.9 MB',
      linkUrl: '',
      occurrence: 'Field warranty claim in high-humidity coastal region: internal PCB trace corrosion after 14 months operation.',
      genbutsuNG: 'Delamination gap between polyurethane resin and glass-filled nylon housing wall; water ingress path.',
      genbutsuOK: '100% void-free cross-linked adhesion with zero moisture transmission after 1,000h 85°C/85% RH exposure.',
      scopeProcess: 'Housing mold release wax residue was not completely removed before potting dispensing.',
      flowOut: 'Helium pressure leak test could not detect interfacial moisture capillary creep.',
      whys: [
        { level: 'Why 1', text: 'Why did moisture enter? → Interfacial seal failed between resin and plastic.' },
        { level: 'Why 2', text: 'Why seal failed? → Mold release agent prevented chemical bonding.' },
        { level: 'Root Cause', text: 'Cleaning process was dry air blow without atmospheric plasma surface treatment.' }
      ],
      countermeasure: 'Added inline atmospheric plasma surface activation station before potting dispensing (dyne level > 52 dyn/cm).'
    },
    {
      id: 'sus-braze',
      code: 'QA-SUS-2025-055',
      title: 'Stainless Steel Oil Cooler Plate Vacuum Brazing Void Leak',
      product: 'Sus Oil / Tube I.C',
      category: 'Cust. Claim',
      severity: 'Critical',
      author: 'Tanaka Hiroshi (Brazing Master)',
      date: '2025-10-02',
      attachType: 'file',
      fileName: 'Sus_Oil_Cooler_Braze_Void_Analysis.pdf',
      fileSize: '4.1 MB',
      linkUrl: '',
      occurrence: 'Oil entered engine cooling jacket on customer heavy-duty diesel test engine at 180 operating hours.',
      genbutsuNG: '0.4mm unbonded braze void along dimple plate boundary; nickel filler alloy failed to bridge gap.',
      genbutsuOK: 'Continuous 100% metallurgical nickel-chromium braze joint across 12-layer plate stack.',
      scopeProcess: 'Vacuum furnace heating ramp rate too rapid (15°C/min); center core had 45°C thermal lag.',
      flowOut: 'Standard helium test pressure (300 kPa) was below hydraulic surge pressure (1,200 kPa).',
      whys: [
        { level: 'Why 1', text: 'Why did oil cooler leak? → Void in nickel braze foil at plate dimple.' },
        { level: 'Why 2', text: 'Why braze void? → Core core interior had not reached braze liquidus temperature.' },
        { level: 'Why 3', text: 'Why thermal lag? → Temperature ramp rate was set too fast for heavy plate pack.' },
        { level: 'Root Cause', text: 'Furnace temperature profile was calibrated on light-duty heat exchangers without core pack thermocouples.' }
      ],
      countermeasure: 'Programmed two-stage vacuum equalization soak at 980°C and embedded trailing core thermocouples on every furnace load.'
    },
    {
      id: 'tube-burst',
      code: 'QA-IC-2025-037',
      title: 'Tube Intercooler Bellows Burst Under Turbo Boost Surge',
      product: 'Sus Oil / Tube I.C',
      category: 'OGC & TH',
      severity: 'Critical',
      author: 'Kenji Nomura (QA Lead)',
      date: '2025-08-30',
      attachType: 'file',
      fileName: 'Intercooler_Bellows_Fatigue_Burst_RCA.pdf',
      fileSize: '3.7 MB',
      linkUrl: '',
      occurrence: 'Rapid loss of turbo boost pressure during high-torque hill climb test in Thailand proving grounds.',
      genbutsuNG: 'Longitudinal split fracture along bellows convolution root in 3003 aluminum alloy tube.',
      genbutsuOK: 'Smooth convolution profile with uniform wall thickness (0.65 ± 0.03mm) and 450 kPa burst margin.',
      scopeProcess: 'Hydroforming expansion die corner radius worn from continuous production cycle.',
      flowOut: 'Pneumatic leak check conducted at 200 kPa proof; surge burst occurred at 320 kPa pulse.',
      whys: [
        { level: 'Why 1', text: 'Why did tube burst? → Wall thickness thinned to 0.38mm at convolution root.' },
        { level: 'Why 2', text: 'Why thinned? → Material localized necking during hydroforming.' },
        { level: 'Why 3', text: 'Why localized necking? → Hydroforming hydraulic expansion pressure peak was unthrottled.' },
        { level: 'Root Cause', text: 'Hydroforming PLC pressure curve lacked proportional servo valve ramping.' }
      ],
      countermeasure: 'Upgraded hydroforming unit with multi-stage closed-loop servo valve and continuous laser ultrasonic wall thickness monitoring.'
    },
    {
      id: 'sus-warp',
      code: 'QA-SUS-2025-018',
      title: 'Sus Oil Cooler Mounting Flange Planarity Warp',
      product: 'Sus Oil / Tube I.C',
      category: 'Internal Defect',
      severity: 'Major',
      author: 'Sato Daisuke (PE)',
      date: '2025-07-14',
      attachType: 'link',
      fileName: '',
      fileSize: '',
      linkUrl: 'https://docsavvy.denso.com/spec/sus-flange-warp',
      occurrence: 'Engine block mounting oil leak at assembly plant line cold run test.',
      genbutsuNG: 'Flange mating surface flatness deviation 0.28mm (Spec: ≤ 0.08mm). Corner bolt boss lifted.',
      genbutsuOK: 'Precision CNC fly-cut mounting surface with flatness within 0.04mm and Ra 1.6μm finish.',
      scopeProcess: 'Thermal contraction after vacuum brazing furnace cool-down caused asymmetric plate warp.',
      flowOut: 'Coordinate measuring machine (CMM) was sampled at 1 per 50 pcs.',
      whys: [
        { level: 'Why 1', text: 'Why did flange leak? → Flange flatness out of spec by 0.20mm.' },
        { level: 'Why 2', text: 'Why out of spec? → Thermal stress during 1,100°C vacuum cool cycle.' },
        { level: 'Root Cause', text: 'Brazing fixture lacked clamping counter-deflection pre-load.' }
      ],
      countermeasure: 'Introduced pre-stressed brazing fixture with counter-camber offset and 100% automated inline optical flatness scanner.'
    },
    {
      id: 'sus-warranty-weld',
      code: 'QA-SUS-2025-061',
      title: 'SUS Oil Cooler Header Flange Weld Fatigue (Field Warranty Claim)',
      product: 'Sus Oil / Tube I.C',
      category: 'Warranty Claim',
      severity: 'Critical',
      author: 'Kenji Nomura (QA Lead)',
      date: '2025-09-12',
      attachType: 'file',
      fileName: 'SUS_Oil_Cooler_Warranty_Claim_Fatigue.pdf',
      fileSize: '3.2 MB',
      linkUrl: '',
      occurrence: 'Market field warranty claim at 35,000 km: oil-to-water cross-leak caused by weld toe fatigue cracking under cyclic pressure pulsation.',
      genbutsuNG: 'Circumferential fatigue crack initiated at TIG weld underbead stress concentration notch.',
      genbutsuOK: 'Full penetration weld with smooth toe blend radius (>0.8mm) and >250% fatigue cycle margin.',
      scopeProcess: 'Automatic TIG welding torch angle deflection 1.8mm from joint seam center.',
      flowOut: 'Helium pressure proof test did not simulate high-temperature cyclic fatigue pulsation.',
      whys: [
        { level: 'Why 1', text: 'Why did weld crack in field? → Cyclic pressure pulsation caused fatigue failure at notch.' },
        { level: 'Why 2', text: 'Why notch? → TIG weld underbead lacked smooth blend radius.' },
        { level: 'Why 3', text: 'Why no smooth blend? → Torch tracking seam guide had mechanical play.' },
        { level: 'Root Cause', text: 'Lack of automated optical seam tracking on rotary welding station.' }
      ],
      countermeasure: 'Installed high-speed laser seam tracker with dynamic torch steering and added 100,000-cycle pulsation validation.'
    }
  ];

  // Seed Knowledge Records matching Photo 3 + Enterprise Library
  const INITIAL_KNOWLEDGE_RECORDS = [
    {
      id: 'mms',
      num: 1,
      title: '1. MMS Procedure',
      category: 'Procedure',
      product: 'Global / All',
      dept: 'Production Control',
      type: 'Knowledge',
      author: 'Production Control Div.',
      date: '2025-10-01',
      views: 1420,
      attachType: 'file',
      fileName: 'MMS_SelfCheck_Diagnosis_FY2025.pdf',
      fileSize: '4.2 MB',
      linkUrl: '',
      desc: 'Manufacturing Structure Strengthening Self-Check Diagnosis for DENSO Group Companies Version FY2025.'
    },
    {
      id: 'furikae-manual',
      num: 2,
      title: '2. Furikae implement Manual',
      category: 'Manual',
      product: 'Radiator',
      dept: 'Production Department',
      type: 'Experience',
      author: 'Yuki Takahashi',
      date: '2025-09-15',
      views: 980,
      attachType: 'file',
      fileName: 'Furikae_Rotation_Competency_Manual.pdf',
      fileSize: '3.6 MB',
      linkUrl: '',
      desc: 'Standardized operator shift rotation and competence verification protocol to prevent line defects and human error.'
    },
    {
      id: 'esmart',
      num: 3,
      title: '3. Furikae implement procedure',
      category: 'Procedure',
      product: 'QA / ISO',
      dept: 'QA & QC',
      type: 'Best Practice',
      author: 'ISO Certification Center',
      date: '2025-08-20',
      views: 1150,
      attachType: 'link',
      fileName: '',
      fileSize: '',
      linkUrl: 'https://esmart-iso.denso.com/route/job-wfh',
      desc: 'e-SMART ISO Cloud System: Standard Route for Registering Job-WFH and ISO Process Approvals (by Document Owner).'
    },
    {
      id: 'dxeep',
      num: 4,
      title: '4. QA Network',
      category: 'Network',
      product: 'TIE & DX',
      dept: 'TIE & DX',
      type: 'Knowledge',
      author: 'Digital Transformation Team',
      date: '2025-09-10',
      views: 890,
      attachType: 'link',
      fileName: '',
      fileSize: '',
      linkUrl: 'https://dxeep.denso.com/qa-network',
      desc: 'DxEEP Digital Transformative Enterprise Engineering Platform: QA Telemetry, IoT Sensor Streams & Digital Twin.'
    },
    {
      id: 'docsavvy',
      num: 5,
      title: '5. Drawing, DIS, DPS',
      category: 'Drawing',
      product: 'Production Engineering',
      dept: 'Production Engineering',
      type: 'Best Practice',
      author: 'Engineering Standards Bureau',
      date: '2025-07-25',
      views: 1670,
      attachType: 'link',
      fileName: '',
      fileSize: '',
      linkUrl: 'https://docsavvy.denso.com/engineering-search',
      desc: 'DocSavvy Document System: Full-Text Engineering Specifications Search (DDS, DPS, DIS, DAS, DMS Standards).'
    },
    {
      id: 'cab-brazing',
      num: 6,
      title: '6. Controlled Atmosphere Brazing (CAB) SOP',
      category: 'Standard',
      product: 'Radiator',
      dept: 'Production Engineering',
      type: 'Best Practice',
      author: 'Tanaka Hiroshi (Brazing Master)',
      date: '2025-08-14',
      views: 740,
      attachType: 'file',
      fileName: 'CAB_Brazing_Atmosphere_Control_SOP.pdf',
      fileSize: '5.1 MB',
      linkUrl: '',
      desc: 'Atmospheric oxygen control, nitrogen curtain balance, and thermal curve profiles for zero-void aluminum brazing.'
    },
    {
      id: 'poka-tooling',
      num: 7,
      title: '7. Mechanical Poka-Yoke Tooling Design Guideline',
      category: 'Standard',
      product: 'Global / All',
      dept: 'Facility & Safety',
      type: 'Lessons Learned',
      author: 'Kenji Nomura (QA Lead)',
      date: '2025-06-30',
      views: 820,
      attachType: 'file',
      fileName: 'Poka_Yoke_Tooling_Design_Standard.pdf',
      fileSize: '3.2 MB',
      linkUrl: '',
      desc: 'Fail-safe mechanical fixture design, asymmetric lockout pins, and electrical interlock standards to prevent misassembly.'
    },
    {
      id: 'heijunka-kanban',
      num: 8,
      title: '8. Heijunka Leveling & Kanban Synchronization Manual',
      category: 'Manual',
      product: 'Production Control',
      dept: 'Production Control',
      type: 'Experience',
      author: 'Yuki Takahashi',
      date: '2025-09-01',
      views: 650,
      attachType: 'file',
      fileName: 'Heijunka_Kanban_Synchronization_Manual.pdf',
      fileSize: '2.7 MB',
      linkUrl: '',
      desc: 'Production leveling heuristics, electronic Kanban loop synchronization, and Just-In-Time replenishment rules.'
    }
  ];

  // Active App State
  const AppState = {
    mode: 'exact', // 'exact' (pure HTML screens) | 'enterprise'
    currentScreen: 'screen-1', // 'screen-1' | 'screen-2' | 'screen-3'
    activeEntView: 'ent-home',
    activeDefectType: 'Cust. Claim',
    activeProduct: 'Radiator',
    selectedRecordId: 'crimp',
    modalCurrentPage: 1,
    chartsInitialized: false,
    defects: loadData(LS_KEY_DEFECTS, INITIAL_DEFECT_RECORDS),
    knowledge: loadData(LS_KEY_KNOWLEDGE, INITIAL_KNOWLEDGE_RECORDS)
  };

  // Helper: LocalStorage Loader
  function loadData(key, fallback) {
    try {
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
      // Migration from previous v3 storage if available
      if (key === LS_KEY_DEFECTS) {
        const v3 = localStorage.getItem('dna_matrix_defects_v3');
        if (v3) {
          try {
            const parsed = JSON.parse(v3);
            const existingIds = new Set(parsed.map(x => x.id));
            fallback.forEach(item => {
              if (!existingIds.has(item.id)) {
                parsed.push(item);
              }
            });
            parsed.forEach(item => {
              if (item.id === 'mag-insul' || item.id === 'lev-pot') {
                item.category = 'Warranty Claim';
              }
            });
            localStorage.setItem(key, JSON.stringify(parsed));
            return parsed;
          } catch (errMigrate) {
            console.warn('Migration error', errMigrate);
          }
        }
      }
    } catch (e) {
      console.warn('LocalStorage load error', e);
    }
    return JSON.parse(JSON.stringify(fallback));
  }

  // Helper: LocalStorage Saver
  function saveData(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }

  // Department Knowledge Profiles
  const DEPT_METADATA = {
    'PC': {
      name: 'Production Control (PC)',
      icon: 'fa-clipboard-list',
      topics: 180,
      experts: 14,
      desc: 'Master scheduling, line leveling (Heijunka), supply synchronization, and Just-In-Time replenishment.',
      items: [
        'MMS Self-Check Procedure (PC-SOP-01)',
        'Heijunka Box Kanban Scheduling Standard',
        'Emergency Expedite Line Balancing Protocol'
      ]
    },
    'TIE & DX': {
      name: 'TIE & Digital Transformation (TIE & DX)',
      icon: 'fa-gears',
      topics: 240,
      experts: 22,
      desc: 'Toyota Industrial Engineering, Motion Economy, IoT Genba Automation, Digital Twin, and Low-Code Apps.',
      items: [
        'Genba Digital Twin Telemetry Setup',
        'Standard Time & Motion Study Template',
        'Power Apps Genba Inspection Framework'
      ]
    },
    'TPM & JMD': {
      name: 'TPM & JMD (Maintenance & Jishuken)',
      icon: 'fa-wrench',
      topics: 115,
      experts: 11,
      desc: 'Total Productive Maintenance Level 4, Autonomous Maintenance, and Jishuken Monozukuri Do activities.',
      items: [
        'Autonomous Maintenance Checksheet (Step 1-4)',
        'Hydraulic Pressure Transducer Maintenance',
        'Jishuken Kaizen Problem Solving Workbook'
      ]
    },
    'PD': {
      name: 'Production Department (PD)',
      icon: 'fa-industry',
      topics: 310,
      experts: 28,
      desc: 'Assembly operations, SOS / JES adherence, Furikae shift rotation, and zero-defect Genba execution.',
      items: [
        'Furikae Operator Rotation Matrix (SOS-PD-04)',
        'Standard Work Combination Sheet (SWCS)',
        'Line Leader Daily Confirmation Routine'
      ]
    },
    'QA & QC': {
      name: 'Quality Assurance & Control (QA & QC)',
      icon: 'fa-circle-check',
      topics: 420,
      experts: 35,
      desc: 'IATF 16949 / ISO 9001 compliance, Q-Trouble Shooting Sheet, 5-Why root cause verification, and Kakotora.',
      items: [
        'Q-Trouble Shooting Format Standard',
        'e-SMART ISO Job-WFH Route Guide',
        'Kakotora Recurrence Prevention Database'
      ]
    },
    'WH': {
      name: 'Warehouse & Logistics (WH)',
      icon: 'fa-truck-ramp-box',
      topics: 94,
      experts: 8,
      desc: 'Incoming parts storage, FIFO inventory discipline, AGV automated material handling, and shipping dock safety.',
      items: [
        'First-In-First-Out (FIFO) Visual Standard',
        'AGV Route Layout & Collision Prevention',
        'Forklift Safety Pre-Shift Inspection'
      ]
    },
    'PE': {
      name: 'Production Engineering (PE)',
      icon: 'fa-helmet-safety',
      topics: 215,
      experts: 19,
      desc: 'Tooling design, Poka-Yoke fixture fabrication, CAB brazing furnace tuning, and machine commissioning.',
      items: [
        'Crimp End Plate Die Design Tolerances (DDS-0419)',
        'CAB Brazing Temperature Curve Standard (DPS-1102)',
        'Poka-Yoke Mechanical Lockout Standard'
      ]
    },
    'Fac. & Safety': {
      name: 'Facility & Safety Management',
      icon: 'fa-shield-halved',
      topics: 126,
      experts: 12,
      desc: 'Kyotens safety standards, zero-accident culture, high-voltage safety, and environmental ISO 14001.',
      items: [
        'Kiken Yochi (KYT) Hazard Prediction Sheet',
        'Lockout/Tagout (LOTO) Energy Isolation Spec',
        'Chilled Water Loop & Nitrogen Gas Supply SOP'
      ]
    }
  };

  // DocSavvy Specifications Data
  const DOCSAVVY_SPECS = [
    { id: 'DDS-0419', cat: 'DDS', title: 'Radiator Tank Crimp Dimension & Tolerance Spec', rev: 'Rev 4.2' },
    { id: 'DPS-1102', cat: 'DPS', title: 'Controlled Atmosphere Brazing (CAB) Process Standard', rev: 'Rev 6.0' },
    { id: 'DIS-8821', cat: 'DIS', title: 'Inline Laser Displacement Inspection Standard for Crimping', rev: 'Rev 2.1' },
    { id: 'DAS-3012', cat: 'DAS', title: 'Automated Header Tank Assembly Robot Sequencing', rev: 'Rev 3.5' },
    { id: 'DMS-5040', cat: 'DMS', title: 'Aluminum Alloy Cladding Material Standard for Radiator Tubes', rev: 'Rev 5.1' },
    { id: 'DFS-1004', cat: 'DFS', title: 'CAB Brazing Nocolok Flux Solution Ratio & Density Spec', rev: 'Rev 3.0' },
    { id: 'REG-9001', cat: 'Regulation', title: 'IATF 16949 / ISO 9001 Automotive Quality Management System', rev: '2025 Ed.' }
  ];

  // ========================================================
  // DOM READY INITIALIZATION
  // ========================================================
  document.addEventListener('DOMContentLoaded', () => {
    initScreenNavigation();
    initScreen1Interactions();
    initScreen2Interactions();
    initScreen3Interactions();
    initRecordFormModal();
    initDocSavvy();
    initSearchInputs();
    initModeSwitcher();
    initModals();
    initEnterpriseUI();

    // Render lists dynamically
    renderScreen2DefectList();
    renderScreen3KnowledgeList();
  });

  // ========================================================
  // 1. SCREEN SWITCHER (SCREEN 1, 2, 3)
  // ========================================================
  function initScreenNavigation() {
    const pills = document.querySelectorAll('.btn-screen-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        const targetScreen = pill.dataset.target;
        switchScreen(targetScreen);
      });
    });

    // In-canvas navigation links (data-nav-to="screen-2" etc)
    document.querySelectorAll('[data-nav-to]').forEach(el => {
      el.addEventListener('click', () => {
        const target = el.dataset.navTo;
        switchScreen(target);
      });
    });

    const homeLogo = document.getElementById('logo-home-trigger');
    if (homeLogo) {
      homeLogo.addEventListener('click', () => {
        if (AppState.mode === 'enterprise') {
          switchEntView('ent-home');
        } else {
          switchScreen('screen-1');
        }
      });
    }
  }

  function switchScreen(screenId) {
    if (AppState.mode === 'enterprise') {
      toggleAppMode('exact');
    }

    AppState.currentScreen = screenId;

    document.querySelectorAll('.btn-screen-pill').forEach(pill => {
      const isMatch = pill.dataset.target === screenId;
      pill.classList.toggle('active', isMatch);
      pill.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    document.querySelectorAll('.native-screen-wrapper').forEach(wrapper => {
      wrapper.classList.remove('active');
    });

    const activeView = document.getElementById(`view-${screenId}`);
    if (activeView) {
      activeView.classList.add('active');
    }

    const titles = {
      'screen-1': 'Screen 1: Home Page',
      'screen-2': 'Screen 2: Quality Trouble Shooting',
      'screen-3': 'Screen 3: Quality Knowledge'
    };
    showToast(`Switched to ${titles[screenId] || screenId}`, 'info');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ========================================================
  // 2. SCREEN 1: HOME PAGE INTERACTIONS
  // ========================================================
  function initScreen1Interactions() {
    // 5 Automotive Products on Workbench -> Switches to Screen 2 with product filtered
    document.querySelectorAll('.product-item-card').forEach(card => {
      card.addEventListener('click', () => {
        const prod = card.dataset.product;
        AppState.activeProduct = prod;
        showToast(`Opening Quality Trouble Shooting for ${prod}`, 'info');
        switchScreen('screen-2');
        updateScreen2ProductFilter(prod);
      });
    });

    // Capability Pillars 1, 2, 3
    const p1 = document.getElementById('pillar-card-1');
    const p2 = document.getElementById('pillar-card-2');
    const p3 = document.getElementById('pillar-card-3');

    if (p1) p1.addEventListener('click', () => showToast('Pillar 1: Build Organizational Capability across 10 divisions', 'info'));
    if (p2) p2.addEventListener('click', () => showToast('Pillar 2: Knowledge Transfer From Superior To Subordinate', 'info'));
    if (p3) p3.addEventListener('click', () => showToast('Pillar 3: Develop Independent Problem-Solving (5-Why Mastery)', 'info'));

    // Hexagon Nodes -> Opens Department Profile
    document.querySelectorAll('.hex-node-item[data-dept]').forEach(hex => {
      hex.addEventListener('click', () => {
        const deptKey = hex.dataset.dept;
        openDeptModal(deptKey);
      });
    });

    // Bottom Badges
    const btnViewed = document.getElementById('btn-pill-viewed');
    const btnAdded = document.getElementById('btn-pill-added');
    if (btnViewed) btnViewed.addEventListener('click', () => showToast('Exploring 856 Most Viewed Manufacturing Solutions', 'info'));
    if (btnAdded) btnAdded.addEventListener('click', () => showToast('Exploring 63 Recently Added Knowledge Records', 'info'));
  }

  // ========================================================
  // 3. SCREEN 2: QUALITY TROUBLE SHOOTING (PURE HTML)
  // ========================================================
  function initScreen2Interactions() {
    // Defect Type buttons
    document.querySelectorAll('.type-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.type-opt-btn').forEach(b => {
          b.classList.remove('active');
          const hand = b.querySelector('.type-click-hand');
          if (hand) hand.remove();
        });
        btn.classList.add('active');
        if (!btn.querySelector('.type-click-hand')) {
          btn.insertAdjacentHTML('beforeend', `
            <div class="type-click-hand">
              <span>👆</span>
              <small>Click</small>
            </div>
          `);
        }
        AppState.activeDefectType = btn.dataset.tsType;
        renderScreen2DefectList();
        showToast(`Filtered Defect Type: ${AppState.activeDefectType}`, 'info');
      });
    });

    // Products buttons
    document.querySelectorAll('.prod-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.prod-opt-btn').forEach(b => {
          b.classList.remove('active');
          const burst = b.querySelector('.prod-click-burst');
          if (burst) burst.remove();
        });
        btn.classList.add('active');
        if (!btn.querySelector('.prod-click-burst')) {
          btn.insertAdjacentHTML('beforeend', `
            <div class="prod-click-burst">
              <span>💥</span>
              <small>Click</small>
            </div>
          `);
        }
        AppState.activeProduct = btn.dataset.tsProd;
        renderScreen2DefectList();
        showToast(`Filtered Product: ${AppState.activeProduct}`, 'info');
      });
    });

    // Launch Fullscreen PDF from 3-page staggered preview
    const stack = document.getElementById('btn-launch-pdf-modal-ts');
    if (stack) {
      stack.addEventListener('click', () => {
        openPdfModal(AppState.selectedRecordId);
      });
    }

    const fmtLink = document.getElementById('btn-format-template-link');
    if (fmtLink) {
      fmtLink.addEventListener('click', (e) => {
        e.preventDefault();
        openPdfModal(AppState.selectedRecordId);
      });
    }

    const pptIcon = document.getElementById('btn-ppt-format-icon');
    if (pptIcon) {
      pptIcon.addEventListener('click', () => {
        showToast('Downloading Official Q-Trouble Shooting Template (.pptx)...', 'success');
      });
    }

    // Add Record Button on Screen 2
    const btnAddTS = document.getElementById('btn-add-rec-ts');
    if (btnAddTS) {
      btnAddTS.addEventListener('click', () => {
        openRecordForm('defect', null);
      });
    }
  }

  function updateScreen2ProductFilter(prod) {
    document.querySelectorAll('.prod-opt-btn').forEach(b => {
      const match = b.dataset.tsProd.toLowerCase().includes(prod.toLowerCase()) || prod.toLowerCase().includes(b.dataset.tsProd.toLowerCase());
      b.classList.toggle('active', match);
    });
    AppState.activeProduct = prod;
    renderScreen2DefectList();
  }

  // Render Screen 2 Defect List (Pure HTML)
  function renderScreen2DefectList() {
    const container = document.getElementById('sc2-records-card-list');
    if (!container) return;

    let items = AppState.defects;

    // Filter by active product
    if (AppState.activeProduct) {
      const matchProd = items.filter(d => {
        const dp = (d.product || '').toLowerCase();
        const ap = AppState.activeProduct.toLowerCase();
        return dp.includes(ap) || ap.includes(dp);
      });
      if (matchProd.length > 0) items = matchProd;
    }

    // Filter by active defect category
    if (AppState.activeDefectType) {
      const matchCat = items.filter(d => {
        const dc = (d.category || '').toLowerCase();
        const ac = AppState.activeDefectType.toLowerCase();
        if (ac === 'warranty claim') {
          return dc === 'warranty claim' || dc === 'warranty' || (d.occurrence && d.occurrence.toLowerCase().includes('warranty claim'));
        }
        if (ac === 'warranty') {
          return dc.includes('warranty') || dc.includes('kakotora');
        }
        return dc.includes(ac) || ac.includes(dc);
      });
      if (matchCat.length > 0) items = matchCat;
    }

    // Filter by search input in Screen 2
    const searchInput = document.getElementById('search-input-ts');
    if (searchInput && searchInput.value.trim()) {
      const q = searchInput.value.toLowerCase().trim();
      items = items.filter(d => {
        return (d.title && d.title.toLowerCase().includes(q)) ||
               (d.code && d.code.toLowerCase().includes(q)) ||
               (d.product && d.product.toLowerCase().includes(q)) ||
               (d.category && d.category.toLowerCase().includes(q)) ||
               (d.occurrence && d.occurrence.toLowerCase().includes(q)) ||
               (d.countermeasure && d.countermeasure.toLowerCase().includes(q));
      });
    }

    if (items.length === 0) {
      container.innerHTML = `<div style="text-align: center; color: #64748b; padding: 1.5rem; background: #fff; border: 2px solid #000; border-radius: 6px;">No defect records found matching active filters. Click "Add New Record" to register one.</div>`;
      return;
    }

    // Ensure selected record exists
    let selectedItem = items.find(d => d.id === AppState.selectedRecordId);
    if (!selectedItem) {
      selectedItem = items[0];
      AppState.selectedRecordId = selectedItem.id;
    }
    updateStaggeredPreview(selectedItem);

    container.innerHTML = items.map(rec => {
      const isSelected = rec.id === AppState.selectedRecordId;
      const isFile = rec.attachType === 'file';
      const attachLabel = isFile ? (rec.fileName || 'File') : 'Link';
      const attachIcon = isFile ? 'fa-file-lines' : 'fa-link';

      return `
        <div class="defect-record-row-card ${isSelected ? 'active' : ''}" data-defect-id="${rec.id}">
          <div class="rec-title-block" onclick="selectDefectRecord('${rec.id}')">
            <h5>${rec.title}</h5>
            <span class="rec-meta-tag">${rec.product} · ${rec.category} · ${rec.author}</span>
          </div>

          <div class="rec-actions-block">
            <!-- File or Link Button -->
            <button type="button" class="${isFile ? 'btn-rec-file' : 'btn-rec-link'}" onclick="handleAttachmentClick('defect', '${rec.id}')" title="${isFile ? `Open Attachment: ${rec.fileName}` : `Open Link: ${rec.linkUrl}`}">
              <i class="fa-solid ${attachIcon}"></i>
              <span>${isFile ? 'File' : 'Link'}</span>
            </button>

            <!-- Edit Button -->
            <button type="button" class="btn-rec-edit" onclick="openRecordForm('defect', '${rec.id}')" title="Edit this record">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>

            <!-- Delete Button -->
            <button type="button" class="btn-rec-delete" onclick="deleteRecord('defect', '${rec.id}')" title="Delete record">
              <i class="fa-solid fa-trash-can"></i>
            </button>

            ${isSelected ? `
              <div class="rec-click-hand" style="position: absolute; right: -20px; animation: bounceHand 1.6s infinite ease-in-out;">
                <span style="font-size: 1.2rem;">👆</span>
                <small style="font-size: 0.6rem; font-weight: 800; background: #fff; border: 1px solid #000; padding: 1px 3px; border-radius: 3px;">Click</small>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  function selectDefectRecord(recId) {
    AppState.selectedRecordId = recId;
    renderScreen2DefectList();
    const item = AppState.defects.find(d => d.id === recId);
    if (item) {
      showToast(`Selected: ${item.title}`, 'info');
      // Update Page 1 in staggered cards preview
      updateStaggeredPreview(item);
      // Sync with enterprise detail view as well
      renderEnterpriseDefectDetail(recId);
    }
  }

  function updateStaggeredPreview(item) {
    if (!item) return;
    const titleEl = document.querySelector('.card-page-1 .m-title');
    if (titleEl) titleEl.textContent = item.title.substring(0, 24);

    const rootEl = document.querySelector('.card-page-3 .w-row.text-red');
    if (rootEl && item.whys) {
      const rootWhy = item.whys.find(w => w.level && w.level.toLowerCase().includes('root'));
      if (rootWhy) rootEl.textContent = rootWhy.text.substring(0, 28) + '...';
    }
  }

  // ========================================================
  // 4. SCREEN 3: QUALITY KNOWLEDGE (PURE HTML)
  // ========================================================
  function initScreen3Interactions() {
    // Add New Record on Screen 3
    const btnAddQK = document.getElementById('btn-add-rec-qk');
    if (btnAddQK) {
      btnAddQK.addEventListener('click', () => {
        openRecordForm('knowledge', null);
      });
    }

    // Previews 1, 2, 3, 4 Click Triggers
    const p1 = document.getElementById('btn-open-mms-prev');
    const p2 = document.getElementById('btn-open-esmart-prev');
    const p3 = document.getElementById('btn-open-dxeep-prev');
    const p4 = document.getElementById('btn-open-docsavvy-prev');

    if (p1) p1.addEventListener('click', openMmsModal);
    if (p2) p2.addEventListener('click', openEsmartModal);
    if (p3) p3.addEventListener('click', openDxeepModal);
    if (p4) p4.addEventListener('click', openDocSavvyModal);
  }

  // Render Screen 3 Knowledge List (Pure HTML)
  function renderScreen3KnowledgeList() {
    const container = document.getElementById('sc3-knowledge-list');
    if (!container) return;

    const items = AppState.knowledge;

    if (items.length === 0) {
      container.innerHTML = `<div style="text-align: center; color: #64748b; padding: 1.5rem; background: #fff; border: 2px solid #000; border-radius: 6px;">No knowledge standards registered yet. Click "Add New Record" below.</div>`;
      return;
    }

    container.innerHTML = items.map((rec, idx) => {
      const isFile = rec.attachType === 'file';
      const attachIcon = isFile ? 'fa-file-lines' : 'fa-link';
      const hasHandPointer = rec.id === 'esmart';

      return `
        <div class="knowledge-record-row-card" data-knowledge-id="${rec.id}">
          <div class="rec-title-block" onclick="handleKnowledgeItemClick('${rec.id}')">
            <h5>${rec.title || `${idx + 1}. ${rec.title}`}</h5>
            <span class="rec-meta-tag">${rec.category} · ${rec.author || 'DENSO'}</span>
          </div>

          <div class="rec-actions-block">
            <!-- File or Link Button -->
            <button type="button" class="${isFile ? 'btn-rec-file' : 'btn-rec-link'}" onclick="handleAttachmentClick('knowledge', '${rec.id}')" title="${isFile ? `Open Attachment: ${rec.fileName}` : `Open Link: ${rec.linkUrl}`}">
              <i class="fa-solid ${attachIcon}"></i>
              <span>${isFile ? 'File' : 'Link'}</span>
            </button>

            <!-- Edit Button -->
            <button type="button" class="btn-rec-edit" onclick="openRecordForm('knowledge', '${rec.id}')" title="Edit this record">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>

            <!-- Delete Button -->
            <button type="button" class="btn-rec-delete" onclick="deleteRecord('knowledge', '${rec.id}')" title="Delete record">
              <i class="fa-solid fa-trash-can"></i>
            </button>

            ${hasHandPointer ? `
              <div class="rec-click-hand" style="position: absolute; right: -22px; animation: bounceHand 1.6s infinite ease-in-out;">
                <span style="font-size: 1.2rem;">👆</span>
                <small style="font-size: 0.6rem; font-weight: 800; background: #fff; border: 1px solid #000; padding: 1px 3px; border-radius: 3px;">Click</small>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  function handleKnowledgeItemClick(recId) {
    if (recId === 'mms') openMmsModal();
    else if (recId === 'furikae-manual') openMmsModal();
    else if (recId === 'esmart') openEsmartModal();
    else if (recId === 'dxeep') openDxeepModal();
    else if (recId === 'docsavvy') openDocSavvyModal();
    else {
      const item = AppState.knowledge.find(k => k.id === recId);
      if (item) {
        if (item.attachType === 'file') openMmsModal();
        else openEsmartModal();
      }
    }
  }

  // Handle Attachment Click (File vs Link)
  function handleAttachmentClick(type, id) {
    const list = type === 'defect' ? AppState.defects : AppState.knowledge;
    const item = list.find(x => x.id === id);
    if (!item) return;

    if (item.attachType === 'file') {
      if (type === 'defect') {
        openPdfModal(id);
      } else {
        openMmsModal();
      }
      showToast(`Opening attached document: ${item.fileName || 'Report.pdf'}`, 'success');
    } else {
      if (item.linkUrl && item.linkUrl.startsWith('http')) {
        showToast(`Opening connected system: ${item.linkUrl}`, 'info');
        window.open(item.linkUrl, '_blank');
      } else {
        if (id === 'esmart') openEsmartModal();
        else if (id === 'dxeep') openDxeepModal();
        else if (id === 'docsavvy') openDocSavvyModal();
        else openEsmartModal();
      }
    }
  }

  // ========================================================
  // 5. UNIFIED RECORD FORM: ADD & EDIT (FILE OR LINK)
  // ========================================================
  function initRecordFormModal() {
    const modal = document.getElementById('modal-record-form');
    const form = document.getElementById('record-management-form');
    const closeBtn = document.getElementById('btn-close-record-modal');
    const cancelBtn = document.getElementById('btn-cancel-record-modal');
    const radioFile = document.getElementById('radio-attach-file');
    const radioLink = document.getElementById('radio-attach-link');
    const fileWrap = document.getElementById('attach-file-wrapper');
    const linkWrap = document.getElementById('attach-link-wrapper');
    const fileInput = document.getElementById('inp-file-upload');
    const fileChosenText = document.getElementById('file-chosen-preview');
    const storedFileName = document.getElementById('inp-stored-file-name');

    // Global Add Button in Top Bar
    const globalAddBtn = document.getElementById('btn-top-add-modal');
    if (globalAddBtn) {
      globalAddBtn.addEventListener('click', () => {
        const mode = AppState.currentScreen === 'screen-3' ? 'knowledge' : 'defect';
        openRecordForm(mode, null);
      });
    }

    // Attachment Radio Toggle
    if (radioFile && radioLink) {
      radioFile.addEventListener('change', () => {
        fileWrap.style.display = 'flex';
        linkWrap.style.display = 'none';
      });
      radioLink.addEventListener('change', () => {
        fileWrap.style.display = 'none';
        linkWrap.style.display = 'flex';
      });
    }

    // File Input change listener
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          storedFileName.value = file.name;
          fileChosenText.textContent = `Attached: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
          showToast(`File "${file.name}" ready to attach!`, 'info');
        }
      });
    }

    if (closeBtn) closeBtn.addEventListener('click', () => modal.hidden = true);
    if (cancelBtn) cancelBtn.addEventListener('click', () => modal.hidden = true);

    // Form Submission: Handles Both Add and Edit
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveRecordFormData();
      });
    }
  }

  // Open Form in "Add" or "Edit" Mode
  function openRecordForm(mode = 'defect', recordId = null) {
    const modal = document.getElementById('modal-record-form');
    const form = document.getElementById('record-management-form');
    const heading = document.getElementById('modal-form-heading');
    const icon = document.getElementById('modal-form-icon');
    const editIdInput = document.getElementById('form-edit-id');
    const recordModeInput = document.getElementById('form-record-mode');
    const submitBtn = document.getElementById('btn-save-record');

    if (!modal || !form) return;

    recordModeInput.value = mode;
    editIdInput.value = recordId || '';

    const isEdit = Boolean(recordId);
    heading.textContent = isEdit ? 'Edit Record & Attachments' : 'Add New Record';
    icon.className = isEdit ? 'fa-solid fa-pen-to-square text-cyan fa-lg' : 'fa-solid fa-circle-plus text-blue fa-lg';
    submitBtn.innerHTML = isEdit ? '<i class="fa-solid fa-floppy-disk"></i> Save Changes' : '<i class="fa-solid fa-floppy-disk"></i> Register Record';

    const radioFile = document.getElementById('radio-attach-file');
    const radioLink = document.getElementById('radio-attach-link');
    const fileWrap = document.getElementById('attach-file-wrapper');
    const linkWrap = document.getElementById('attach-link-wrapper');
    const fileChosenText = document.getElementById('file-chosen-preview');

    if (isEdit) {
      // Find record to populate
      const list = mode === 'defect' ? AppState.defects : AppState.knowledge;
      const rec = list.find(x => x.id === recordId);

      if (rec) {
        document.getElementById('inp-title').value = rec.title || '';
        document.getElementById('inp-product').value = rec.product || 'Radiator';
        document.getElementById('inp-category').value = rec.category || 'Cust. Claim';
        document.getElementById('inp-author').value = rec.author || '';
        document.getElementById('inp-occurrence').value = rec.occurrence || rec.desc || '';
        document.getElementById('inp-countermeasure').value = rec.countermeasure || '';
        document.getElementById('inp-stored-file-name').value = rec.fileName || 'Q-Trouble_Sheet.pdf';
        document.getElementById('inp-link-url').value = rec.linkUrl || '';

        // Format Whys
        if (rec.whys && Array.isArray(rec.whys)) {
          document.getElementById('inp-whys').value = rec.whys.map(w => `${w.level}: ${w.text}`).join('\n');
        } else {
          document.getElementById('inp-whys').value = '';
        }

        if (rec.attachType === 'link') {
          radioLink.checked = true;
          fileWrap.style.display = 'none';
          linkWrap.style.display = 'flex';
          fileChosenText.textContent = '';
        } else {
          radioFile.checked = true;
          fileWrap.style.display = 'flex';
          linkWrap.style.display = 'none';
          fileChosenText.textContent = rec.fileName ? `Current Attachment: ${rec.fileName}` : '';
        }
      }
    } else {
      // Clear form for Add
      form.reset();
      radioFile.checked = true;
      fileWrap.style.display = 'flex';
      linkWrap.style.display = 'none';
      fileChosenText.textContent = '';
      document.getElementById('inp-stored-file-name').value = 'Q-Trouble_Report.pdf';
      document.getElementById('inp-author').value = 'Kenji Nomura (QA/PE)';
    }

    modal.hidden = false;
  }

  // Save Record Form Data (Add or Edit)
  function saveRecordFormData() {
    const mode = document.getElementById('form-record-mode').value;
    const editId = document.getElementById('form-edit-id').value;
    const title = document.getElementById('inp-title').value.trim();
    const product = document.getElementById('inp-product').value;
    const category = document.getElementById('inp-category').value;
    const author = document.getElementById('inp-author').value.trim();
    const isFile = document.getElementById('radio-attach-file').checked;
    const fileName = document.getElementById('inp-stored-file-name').value;
    const linkUrl = document.getElementById('inp-link-url').value.trim();
    const occurrence = document.getElementById('inp-occurrence').value.trim();
    const countermeasure = document.getElementById('inp-countermeasure').value.trim();
    const whysRaw = document.getElementById('inp-whys').value.trim();

    // Parse whys
    const whys = [];
    if (whysRaw) {
      const lines = whysRaw.split('\n').filter(l => l.trim().length > 0);
      lines.forEach((line, i) => {
        const parts = line.split(':');
        if (parts.length > 1) {
          whys.push({ level: parts[0].trim(), text: parts.slice(1).join(':').trim() });
        } else {
          whys.push({ level: i === lines.length - 1 ? 'Root Cause' : `Why ${i + 1}`, text: line.trim() });
        }
      });
    } else {
      whys.push({ level: 'Why 1', text: 'Dimension outside LSL tolerance limit.' });
      whys.push({ level: 'Root Cause', text: 'Preventive tooling wear calibration interval insufficient.' });
    }

    if (mode === 'defect') {
      if (editId) {
        // Update existing defect record
        const index = AppState.defects.findIndex(d => d.id === editId);
        if (index !== -1) {
          AppState.defects[index] = {
            ...AppState.defects[index],
            title,
            product,
            category,
            author,
            attachType: isFile ? 'file' : 'link',
            fileName: isFile ? (fileName || 'Report.pdf') : '',
            linkUrl: isFile ? '' : linkUrl,
            occurrence,
            countermeasure: countermeasure || 'Installed automated sensor interlock and updated SOS checksheet.',
            whys
          };
          saveData(LS_KEY_DEFECTS, AppState.defects);
          showToast(`Record "${title}" updated successfully!`, 'success');
        }
      } else {
        // Add new defect record
        const newId = 'def_' + Date.now();
        const newRecord = {
          id: newId,
          code: `QA-REC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
          title,
          product,
          category,
          author,
          date: new Date().toISOString().split('T')[0],
          attachType: isFile ? 'file' : 'link',
          fileName: isFile ? (fileName || 'Inspection_Report.pdf') : '',
          fileSize: '1.9 MB',
          linkUrl: isFile ? '' : (linkUrl || 'https://esmart-iso.denso.com/case'),
          occurrence: occurrence || 'Defect detected during Genba testing.',
          genbutsuNG: 'Dimension out of spec during sampling.',
          genbutsuOK: '100% adherence to standard tolerance band.',
          scopeProcess: 'Station assembly line operation.',
          flowOut: 'Detected before final packaging.',
          whys,
          countermeasure: countermeasure || 'Applied standardized poka-yoke lockout.'
        };
        AppState.defects.unshift(newRecord);
        AppState.selectedRecordId = newId;
        saveData(LS_KEY_DEFECTS, AppState.defects);
        showToast(`New record "${title}" successfully registered!`, 'success');
      }
      renderScreen2DefectList();
      renderEnterpriseTroubleshooting();
      renderEnterpriseSearch();
    } else {
      // Knowledge Mode
      if (editId) {
        // Update existing knowledge record
        const index = AppState.knowledge.findIndex(k => k.id === editId);
        if (index !== -1) {
          AppState.knowledge[index] = {
            ...AppState.knowledge[index],
            title,
            product,
            category,
            author,
            attachType: isFile ? 'file' : 'link',
            fileName: isFile ? (fileName || 'Standard_Doc.pdf') : '',
            linkUrl: isFile ? '' : linkUrl,
            desc: occurrence
          };
          saveData(LS_KEY_KNOWLEDGE, AppState.knowledge);
          showToast(`Knowledge Standard "${title}" updated!`, 'success');
        }
      } else {
        // Add new knowledge record
        const newId = 'know_' + Date.now();
        const newKnowledge = {
          id: newId,
          num: AppState.knowledge.length + 1,
          title,
          product,
          category,
          author,
          attachType: isFile ? 'file' : 'link',
          fileName: isFile ? (fileName || 'Standard_Operating_Procedure.pdf') : '',
          fileSize: '2.5 MB',
          linkUrl: isFile ? '' : (linkUrl || 'https://docsavvy.denso.com/spec'),
          desc: occurrence || 'Verified Monozukuri engineering standard.'
        };
        AppState.knowledge.push(newKnowledge);
        saveData(LS_KEY_KNOWLEDGE, AppState.knowledge);
        showToast(`Knowledge "${title}" registered!`, 'success');
      }
      renderScreen3KnowledgeList();
      renderEnterpriseTroubleshooting();
      renderEnterpriseSearch();
    }

    // Close Modal
    document.getElementById('modal-record-form').hidden = true;
  }

  // Delete Record Functionality
  function deleteRecord(mode, id) {
    const list = mode === 'defect' ? AppState.defects : AppState.knowledge;
    const item = list.find(x => x.id === id);
    if (!item) return;

    if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
      if (mode === 'defect') {
        AppState.defects = AppState.defects.filter(x => x.id !== id);
        if (AppState.selectedRecordId === id && AppState.defects.length > 0) {
          AppState.selectedRecordId = AppState.defects[0].id;
        }
        saveData(LS_KEY_DEFECTS, AppState.defects);
        renderScreen2DefectList();
      } else {
        AppState.knowledge = AppState.knowledge.filter(x => x.id !== id);
        saveData(LS_KEY_KNOWLEDGE, AppState.knowledge);
        renderScreen3KnowledgeList();
      }
      renderEnterpriseTroubleshooting();
      renderEnterpriseSearch();
      showToast(`Record "${item.title}" deleted.`, 'info');
    }
  }

  // Expose CRUD and Modal Handlers Globally
  window.openRecordForm = openRecordForm;
  window.deleteRecord = deleteRecord;
  window.selectDefectRecord = selectDefectRecord;
  window.selectEnterpriseDefect = selectEnterpriseDefect;
  window.resetTroubleFilters = resetTroubleFilters;
  window.handleKnowledgeItemClick = handleKnowledgeItemClick;
  window.handleAttachmentClick = handleAttachmentClick;
  window.openPdfModal = openPdfModal;
  window.openDeptModal = openDeptModal;
  window.toggleBookmark = toggleBookmark;
  window.consultExpert = consultExpert;

  // ========================================================
  // 6. ALL 6 DOCUMENT & PLATFORM MODALS
  // ========================================================
  function initModals() {
    // PDF Report Modal
    const pdfModal = document.getElementById('modal-pdf-view');
    const btnClosePdf = document.getElementById('btn-close-pdf-modal');
    const pageTabs = document.querySelectorAll('.btn-page-tab');
    const editReportBtn = document.getElementById('btn-edit-current-report');

    if (btnClosePdf) btnClosePdf.addEventListener('click', () => pdfModal.hidden = true);

    if (editReportBtn) {
      editReportBtn.addEventListener('click', () => {
        pdfModal.hidden = true;
        openRecordForm('defect', AppState.selectedRecordId);
      });
    }

    pageTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        pageTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        AppState.modalCurrentPage = parseInt(tab.dataset.page, 10);
        renderModalPaper(AppState.modalCurrentPage, AppState.selectedRecordId);
      });
    });

    const printBtn = document.getElementById('btn-print-action');
    const dlBtn = document.getElementById('btn-download-action');
    if (printBtn) printBtn.addEventListener('click', () => window.print());
    if (dlBtn) dlBtn.addEventListener('click', () => showToast('Official Q-Trouble Shooting PDF downloaded', 'success'));

    // Other View Modals
    const mmsModal = document.getElementById('modal-mms-view');
    const btnCloseMms = document.getElementById('btn-close-mms-modal');
    if (btnCloseMms) btnCloseMms.addEventListener('click', () => mmsModal.hidden = true);

    const esmartModal = document.getElementById('modal-esmart-view');
    const btnCloseEsmart = document.getElementById('btn-close-esmart-modal');
    if (btnCloseEsmart) btnCloseEsmart.addEventListener('click', () => esmartModal.hidden = true);

    const dxeepModal = document.getElementById('modal-dxeep-view');
    const btnCloseDxeep = document.getElementById('btn-close-dxeep-modal');
    if (btnCloseDxeep) btnCloseDxeep.addEventListener('click', () => dxeepModal.hidden = true);

    const docModal = document.getElementById('modal-docsavvy-view');
    const btnCloseDoc = document.getElementById('btn-close-docsavvy-modal');
    if (btnCloseDoc) btnCloseDoc.addEventListener('click', () => docModal.hidden = true);

    const deptModal = document.getElementById('modal-dept-view');
    const btnCloseDept = document.getElementById('btn-close-dept-modal');
    if (btnCloseDept) btnCloseDept.addEventListener('click', () => deptModal.hidden = true);
  }

  function openPdfModal(recKey = 'crimp') {
    const modal = document.getElementById('modal-pdf-view');
    if (!modal) return;

    AppState.modalCurrentPage = 1;
    document.querySelectorAll('.btn-page-tab').forEach((t, i) => t.classList.toggle('active', i === 0));

    const item = AppState.defects.find(d => d.id === recKey) || AppState.defects[0];
    const titleEl = document.getElementById('modal-doc-title');
    if (titleEl && item) {
      titleEl.textContent = `Q-Trouble Shooting Report: ${item.title}`;
    }

    renderModalPaper(1, item.id);
    modal.hidden = false;
  }

  function renderModalPaper(page = 1, recKey = 'crimp') {
    const stage = document.getElementById('modal-paper-content');
    if (!stage) return;

    const data = AppState.defects.find(d => d.id === recKey) || AppState.defects[0];
    if (!data) return;

    if (page === 1) {
      stage.innerHTML = `
        <div class="denso-report-paper">
          <div class="paper-header-strip">
            <div>
              <span class="brand-stamp">DENSO</span>
              <strong class="paper-sheet-title">品質トラブルシューティングシート · QUALITY TROUBLE SHOOTING SHEET</strong>
            </div>
            <span class="badge-page-indicator">PAGE 1 / 3</span>
          </div>

          <div class="report-section-box">
            <h4><i class="fa-solid fa-circle-exclamation text-blue"></i> 1. Occurrence Situation</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.6rem; margin-top: 0.4rem;">
              <p><strong>Problem Name:</strong> ${data.title}</p>
              <p><strong>Doc ID:</strong> ${data.code || data.id}</p>
              <p><strong>Product Line:</strong> ${data.product}</p>
              <p><strong>Classification:</strong> ${data.category}</p>
              <p><strong>Date Logged:</strong> ${data.date}</p>
              <p><strong>Reporting Engineer:</strong> ${data.author}</p>
            </div>
            <p style="margin-top: 0.75rem; line-height: 1.5; border-top: 1px solid #cbd5e1; padding-top: 0.5rem;">
              <strong>Occurrence Description:</strong> ${data.occurrence}
            </p>
          </div>

          <div class="report-section-box">
            <h4><i class="fa-solid fa-microscope text-blue"></i> 2. Defect GENBUTSU Condition ( 現物観察 )</h4>
            <div class="genbutsu-grid-2">
              <div class="genbutsu-card ng-box">
                <strong style="color: #ef4444;"><i class="fa-solid fa-xmark"></i> NG Condition (Defect Observed)</strong>
                <p style="font-size: 0.82rem; margin-top: 0.4rem; line-height: 1.4;">${data.genbutsuNG || 'Crimp height deviation outside lower specification limit.'}</p>
                <div class="genbutsu-visual-mock">
                  <i class="fa-solid fa-triangle-exclamation"></i>&nbsp; NG: Crimp Height Outside Tolerance (+0.12mm)
                </div>
              </div>
              <div class="genbutsu-card ok-box">
                <strong style="color: #16a34a;"><i class="fa-solid fa-check"></i> OK Standard Condition (Approved)</strong>
                <p style="font-size: 0.82rem; margin-top: 0.4rem; line-height: 1.4;">${data.genbutsuOK || 'Uniform crimp compression with zero bubble leakage.'}</p>
                <div class="genbutsu-visual-mock">
                  <i class="fa-solid fa-shield-check"></i>&nbsp; OK: Uniform Compression Band (&lt;0.05mm)
                </div>
              </div>
            </div>
          </div>

          <div class="report-section-box">
            <h4><i class="fa-solid fa-shield text-blue"></i> 3. Temporary Containment Countermeasure</h4>
            <p style="font-size: 0.84rem; line-height: 1.5;">
              100% sorting of warehouse inventory. In-line helium sniffer threshold sensitivity doubled. Shift rotation audit enforced under QA supervision.
            </p>
          </div>
        </div>
      `;
    } else if (page === 2) {
      stage.innerHTML = `
        <div class="denso-report-paper">
          <div class="paper-header-strip">
            <div>
              <span class="brand-stamp">DENSO</span>
              <strong class="paper-sheet-title">PROCESS SCOPE & FLOW-OUT REVIEW · 工程範囲及び流出防止</strong>
            </div>
            <span class="badge-page-indicator">PAGE 2 / 3</span>
          </div>

          <div class="report-section-box">
            <h4><i class="fa-solid fa-diagram-project text-blue"></i> 4. Scope of Process Creating Defect</h4>
            <p style="font-size: 0.86rem; line-height: 1.5;">${data.scopeProcess || 'Header crimp machine punch tool wear occurred after high cycle count.'}</p>
          </div>

          <div class="report-section-box">
            <h4><i class="fa-solid fa-filter text-blue"></i> 5. PTR Occurrence & Tracking Review</h4>
            <table class="whys-analysis-table">
              <thead>
                <tr><th>Station</th><th>Machine</th><th>Inspection Method</th><th>Outcome</th></tr>
              </thead>
              <tbody>
                <tr><td>St. 10: Seating</td><td>Robot #1</td><td>Optical Proximity Sensor</td><td>Normal Seating Detected</td></tr>
                <tr><td>St. 20: Crimp Unit</td><td>Hydraulic Press</td><td>Stroke Limit Switch</td><td>Stroke Completed (Wear Masked)</td></tr>
                <tr><td>St. 30: Leak Testing</td><td>Helium Sniffer</td><td>Threshold 1.0 x 10^-4</td><td>Passed (Transient Seal)</td></tr>
              </tbody>
            </table>
          </div>

          <div class="report-section-box">
            <h4><i class="fa-solid fa-arrow-right-from-bracket text-blue"></i> 6. Flow-Out Review (Why did it reach downstream?)</h4>
            <p style="font-size: 0.86rem; line-height: 1.5;">${data.flowOut || 'Pneumatic calibration drift allowed transient seal to pass helium chamber.'}</p>
          </div>
        </div>
      `;
    } else {
      stage.innerHTML = `
        <div class="denso-report-paper">
          <div class="paper-header-strip">
            <div>
              <span class="brand-stamp">DENSO</span>
              <strong class="paper-sheet-title">7. 5-WHY ANALYSIS & COUNTERMEASURE · なぜなぜ分析と対策</strong>
            </div>
            <span class="badge-page-indicator">PAGE 3 / 3</span>
          </div>

          <table class="whys-analysis-table">
            <thead>
              <tr><th style="width: 130px;">Step</th><th>5-Why Analytical Deduction</th></tr>
            </thead>
            <tbody>
              ${data.whys.map(w => `
                <tr class="${w.level === 'Root Cause' ? 'root-cause-row' : ''}">
                  <td>${w.level}</td>
                  <td>${w.text}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="countermeasure-highlight-box">
            <h4><i class="fa-solid fa-shield-check"></i> Standardized Permanent Countermeasure ( 恒久対策 )</h4>
            <p style="font-size: 0.86rem; color: #14532d; line-height: 1.5;">${data.countermeasure}</p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1.25rem; font-size: 0.78rem;">
            <div style="border: 1px solid #cbd5e1; padding: 0.5rem; text-align: center; border-radius: 4px;">
              <strong>Division QA Sign-off</strong><br><span class="text-green">APPROVED (${data.author.split(' ')[0]})</span>
            </div>
            <div style="border: 1px solid #cbd5e1; padding: 0.5rem; text-align: center; border-radius: 4px;">
              <strong>Cross-Deployment</strong><br>Magneto & Oil Cooler Lines
            </div>
            <div style="border: 1px solid #cbd5e1; padding: 0.5rem; text-align: center; border-radius: 4px;">
              <strong>Kakotora Status</strong><br>Registered in Global DNA
            </div>
          </div>
        </div>
      `;
    }
  }

  // Modals Open Helpers
  function openMmsModal() {
    const modal = document.getElementById('modal-mms-view');
    if (modal) modal.hidden = false;
  }

  function openEsmartModal() {
    const modal = document.getElementById('modal-esmart-view');
    if (modal) modal.hidden = false;
  }

  function openDxeepModal() {
    const modal = document.getElementById('modal-dxeep-view');
    if (modal) modal.hidden = false;
  }

  function openDocSavvyModal() {
    const modal = document.getElementById('modal-docsavvy-view');
    if (modal) modal.hidden = false;
  }

  function openDeptModal(deptKey) {
    const modal = document.getElementById('modal-dept-view');
    const titleEl = document.getElementById('modal-dept-title');
    const subEl = document.getElementById('modal-dept-sub');
    const contentEl = document.getElementById('modal-dept-content');

    if (!modal || !contentEl) return;

    const data = DEPT_METADATA[deptKey] || DEPT_METADATA['QA & QC'];

    if (titleEl) titleEl.textContent = data.name;
    if (subEl) subEl.textContent = `Capability Network · ${data.topics} Topics · ${data.experts} Master Engineers`;

    contentEl.innerHTML = `
      <div class="dept-header-badge-row">
        <div class="dept-big-icon-wrap"><i class="fa-solid ${data.icon}"></i></div>
        <div class="dept-title-meta">
          <h2>${data.name}</h2>
          <div class="dept-meta-pills">
            <span class="meta-chip">${data.topics} SOPs & Standards</span>
            <span class="meta-chip">${data.experts} Certified Mentors</span>
          </div>
        </div>
      </div>
      <p style="font-size: 0.88rem; line-height: 1.5; color: #334155; margin-bottom: 1rem;">${data.desc}</p>
      <div class="dept-records-mini-list">
        <h4>Key Controlled Documents & Kakotora:</h4>
        <ul>
          ${data.items.map(item => `<li><i class="fa-solid fa-file-check text-blue"></i> ${item}</li>`).join('')}
        </ul>
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1rem;">
        <button type="button" class="btn-form-cancel" onclick="document.getElementById('modal-dept-view').hidden = true;">Close</button>
        <button type="button" class="btn-form-submit" onclick="showToast('Loading full ${deptKey} repository...', 'info'); document.getElementById('modal-dept-view').hidden = true; switchScreen('screen-2');">View Related Cases</button>
      </div>
    `;

    modal.hidden = false;
  }

  // ========================================================
  // 7. DOCSAVVY SEARCH SYSTEM
  // ========================================================
  function initDocSavvy() {
    const input = document.getElementById('docsavvy-query-input');
    const execBtn = document.getElementById('btn-docsavvy-exec');
    const resetBtn = document.getElementById('btn-docsavvy-reset');
    const cbs = document.querySelectorAll('.cb-doc');

    function filterDocSavvy() {
      const q = (input ? input.value : '').toLowerCase().trim();
      const activeCats = Array.from(cbs).filter(cb => cb.checked).map(cb => cb.value);

      const filtered = DOCSAVVY_SPECS.filter(doc => {
        const matchesCat = activeCats.includes(doc.cat);
        const matchesQuery = !q || doc.id.toLowerCase().includes(q) || doc.title.toLowerCase().includes(q);
        return matchesCat && matchesQuery;
      });

      renderDocSavvyTable(filtered);
    }

    if (execBtn) execBtn.addEventListener('click', filterDocSavvy);
    if (input) input.addEventListener('input', filterDocSavvy);
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (input) input.value = '';
        cbs.forEach(cb => cb.checked = true);
        filterDocSavvy();
      });
    }

    cbs.forEach(cb => cb.addEventListener('change', filterDocSavvy));
    filterDocSavvy();
  }

  function renderDocSavvyTable(specs) {
    const tbody = document.getElementById('docsavvy-results-tbody');
    if (!tbody) return;

    if (specs.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #64748b; padding: 1.5rem;">No technical specifications match your criteria.</td></tr>`;
      return;
    }

    tbody.innerHTML = specs.map(doc => `
      <tr>
        <td><strong>${doc.id}</strong></td>
        <td><span class="meta-chip">${doc.cat}</span></td>
        <td>${doc.title}</td>
        <td><span class="badge-smart" style="font-size: 0.7rem; padding: 0.1rem 0.4rem;">${doc.rev}</span></td>
        <td>
          <button type="button" class="btn-modal-tool" style="padding: 0.2rem 0.55rem; font-size: 0.75rem;" onclick="showToast('Opening blueprint: ${doc.id}', 'info')">
            <i class="fa-solid fa-eye"></i> View
          </button>
        </td>
      </tr>
    `).join('');
  }

  // ========================================================
  // 8. SEARCH INPUTS & KEYSTROKES
  // ========================================================
  function initSearchInputs() {
    const s1 = document.getElementById('search-input-h1');
    const s2 = document.getElementById('search-input-ts');
    const s3 = document.getElementById('search-input-qk');

    // Live search in Screen 2
    if (s2) {
      s2.addEventListener('input', () => {
        const query = s2.value.toLowerCase().trim();
        const rows = document.querySelectorAll('.defect-record-row-card');
        rows.forEach(row => {
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(query) ? 'flex' : 'none';
        });
      });
    }

    // Live search in Screen 3
    if (s3) {
      s3.addEventListener('input', () => {
        const query = s3.value.toLowerCase().trim();
        const rows = document.querySelectorAll('.knowledge-record-row-card');
        rows.forEach(row => {
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(query) ? 'flex' : 'none';
        });
      });
    }

    // Enter key in Header Search (Screen 1)
    if (s1) {
      s1.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const q = s1.value.trim();
          if (q) {
            showToast(`Searching for "${q}" across manufacturing records...`, 'info');
            switchScreen('screen-2');
            if (s2) {
              s2.value = q;
              s2.dispatchEvent(new Event('input'));
            }
          }
        }
      });
    }
  }

  // ========================================================
  // 9. MODE SWITCHER: PURE HTML SCREENS VS 2030 PLATFORM
  // ========================================================
  function initModeSwitcher() {
    const btn = document.getElementById('btn-toggle-mode');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const nextMode = AppState.mode === 'exact' ? 'enterprise' : 'exact';
      toggleAppMode(nextMode);
    });
  }

  function toggleAppMode(mode) {
    AppState.mode = mode;
    const exactStage = document.getElementById('exact-photo-stage');
    const entStage = document.getElementById('enterprise-app-stage');
    const screenTabs = document.getElementById('screen-tabs-nav');
    const entNav = document.getElementById('enterprise-nav');
    const modeLabel = document.getElementById('mode-label-text');

    if (mode === 'enterprise') {
      if (exactStage) exactStage.style.display = 'none';
      if (entStage) entStage.style.display = 'block';
      if (screenTabs) screenTabs.style.display = 'none';
      if (entNav) entNav.style.display = 'flex';
      if (modeLabel) modeLabel.textContent = 'HTML Screen View';

      showToast('Switched to 2030 Enterprise Knowledge Platform Mode', 'info');

      if (!AppState.chartsInitialized) {
        initDnaCanvas();
        initChartJs();
        initEnterpriseUI();
        AppState.chartsInitialized = true;
      }
    } else {
      if (exactStage) exactStage.style.display = 'flex';
      if (entStage) entStage.style.display = 'none';
      if (screenTabs) screenTabs.style.display = 'flex';
      if (entNav) entNav.style.display = 'none';
      if (modeLabel) modeLabel.textContent = '2030 Platform View';

      showToast('Switched to Pure HTML Screen View', 'info');
    }
  }

  function initEnterpriseUI() {
    const navTabs = document.querySelectorAll('.btn-ent-tab');
    navTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        navTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        switchEntView(tab.dataset.entView);
      });
    });

    // Populate department cards in ent-home
    const container = document.getElementById('ent-hex-container');
    if (container) {
      container.innerHTML = Object.entries(DEPT_METADATA).map(([key, dept]) => `
        <div class="ent-dept-card" onclick="openDeptModal('${key}')">
          <div class="dept-hex-icon"><i class="fa-solid ${dept.icon}"></i></div>
          <h4>${key}</h4>
          <p>${dept.topics} Topics · ${dept.experts} Experts</p>
        </div>
      `).join('');
    }

    // Initialize all Enterprise sections
    initEnterpriseTroubleshooting();
    initEnterpriseSearch();
    renderEnterpriseLibrary();
    renderEnterpriseExperts();
  }

  function switchEntView(viewId) {
    document.querySelectorAll('.ent-section').forEach(sec => sec.classList.remove('active'));
    const activeSec = document.getElementById(viewId);
    if (activeSec) activeSec.classList.add('active');
    document.querySelectorAll('.btn-ent-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.entView === viewId);
    });
    AppState.activeEntView = viewId;

    if (viewId === 'ent-trouble') {
      renderEnterpriseTroubleshooting();
    } else if (viewId === 'ent-search') {
      renderEnterpriseSearch();
    } else if (viewId === 'ent-library') {
      renderEnterpriseLibrary();
    } else if (viewId === 'ent-experts') {
      renderEnterpriseExperts();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ========================================================
  // ENTERPRISE TROUBLESHOOTING CONTROLLER
  // ========================================================
  function initEnterpriseTroubleshooting() {
    // 1. Defect Category Chip Listeners
    const catChips = document.querySelectorAll('#ent-defect-cat-list .btn-cat-chip');
    catChips.forEach(chip => {
      chip.addEventListener('click', () => {
        catChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const cat = chip.dataset.cat;
        AppState.activeDefectType = (cat === 'ALL') ? '' : cat;
        renderEnterpriseTroubleshooting();
        showToast(cat === 'ALL' ? 'Showing All Defect Categories' : `Filtered Category: ${cat}`, 'info');
      });
    });

    // 2. Product Line Chip Listeners
    const prodChips = document.querySelectorAll('#ent-prod-list .btn-prod-chip');
    prodChips.forEach(chip => {
      chip.addEventListener('click', () => {
        prodChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const prod = chip.dataset.prod;
        AppState.activeProduct = (prod === 'ALL') ? '' : prod;
        renderEnterpriseTroubleshooting();
        showToast(prod === 'ALL' ? 'Showing All Products' : `Filtered Product: ${prod}`, 'info');
      });
    });

    // 3. Quick filter text input inside troubleshooting
    const troubleFilterInput = document.getElementById('ent-trouble-quick-filter');
    if (troubleFilterInput) {
      troubleFilterInput.addEventListener('input', () => {
        renderEnterpriseTroubleshooting();
      });
    }

    renderEnterpriseTroubleshooting();
  }

  function renderEnterpriseTroubleshooting() {
    const listContainer = document.getElementById('ent-defect-record-list');
    if (!listContainer) return;

    let items = AppState.defects;

    // Filter by active category
    if (AppState.activeDefectType) {
      items = items.filter(d => {
        const dCat = (d.category || '').toLowerCase();
        const aCat = AppState.activeDefectType.toLowerCase();
        if (aCat === 'warranty claim') {
          return dCat === 'warranty claim' || dCat === 'warranty' || (d.occurrence && d.occurrence.toLowerCase().includes('warranty claim'));
        }
        if (aCat === 'warranty') {
          return dCat.includes('warranty') || dCat.includes('kakotora');
        }
        return dCat.includes(aCat) || aCat.includes(dCat);
      });
    }

    // Filter by active product
    if (AppState.activeProduct) {
      items = items.filter(d => {
        const dProd = (d.product || '').toLowerCase();
        const aProd = AppState.activeProduct.toLowerCase();
        return dProd.includes(aProd) || aProd.includes(dProd);
      });
    }

    // Filter by quick filter input
    const quickInput = document.getElementById('ent-trouble-quick-filter');
    if (quickInput && quickInput.value.trim()) {
      const q = quickInput.value.toLowerCase().trim();
      items = items.filter(d => {
        return (d.title && d.title.toLowerCase().includes(q)) ||
               (d.code && d.code.toLowerCase().includes(q)) ||
               (d.author && d.author.toLowerCase().includes(q)) ||
               (d.occurrence && d.occurrence.toLowerCase().includes(q)) ||
               (d.countermeasure && d.countermeasure.toLowerCase().includes(q));
      });
    }

    if (items.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align: center; color: #94a3b8; padding: 2.5rem 1rem; background: rgba(8, 20, 48, 0.6); border: 1px dashed rgba(10, 132, 255, 0.3); border-radius: 10px;">
          <i class="fa-solid fa-clipboard-question" style="font-size: 2.2rem; color: #70baff; margin-bottom: 0.65rem; display: block;"></i>
          <p style="font-weight: 700; color: #ffffff; margin-bottom: 0.35rem;">No matching defect records found</p>
          <span style="font-size: 0.8rem;">Category: <strong>${AppState.activeDefectType || 'All'}</strong> · Product: <strong>${AppState.activeProduct || 'All'}</strong></span><br>
          <button type="button" class="btn-open-full-pdf" style="margin-top: 1rem; font-size: 0.78rem; display: inline-flex;" onclick="resetTroubleFilters()">
            <i class="fa-solid fa-rotate-left"></i> Reset Trouble Filters
          </button>
        </div>
      `;
      const detailContainer = document.getElementById('ent-defect-detail-panel');
      if (detailContainer) {
        detailContainer.innerHTML = `
          <div style="text-align: center; color: #94a3b8; padding: 3rem 1.5rem;">
            <i class="fa-solid fa-magnifying-glass" style="font-size: 2rem; color: #0a84ff; margin-bottom: 0.8rem; display: block;"></i>
            Please select or register a defect record to inspect Genbutsu, 5-Why Analysis, and Root Cause Countermeasures.
          </div>
        `;
      }
      return;
    }

    // Check if active selected record is in filtered list, else pick first
    let activeRec = items.find(d => d.id === AppState.selectedRecordId);
    if (!activeRec) {
      activeRec = items[0];
      AppState.selectedRecordId = activeRec.id;
    }

    listContainer.innerHTML = items.map(rec => {
      const isSelected = rec.id === AppState.selectedRecordId;
      const isFile = rec.attachType === 'file';
      const attachIcon = isFile ? 'fa-file-pdf' : 'fa-link';
      const sevClass = rec.severity === 'Critical' ? 'severity-critical' : (rec.severity === 'Major' ? 'severity-major' : 'severity-minor');

      return `
        <div class="ent-defect-card ${isSelected ? 'active' : ''}" data-rec-id="${rec.id}" onclick="selectEnterpriseDefect('${rec.id}')">
          <div class="ent-defect-card-header">
            <span class="ent-defect-code">${rec.code || 'QA-RECORD'}</span>
            <span class="ent-severity-badge ${sevClass}">${rec.severity || 'Major'}</span>
          </div>
          <h4 class="ent-defect-title">${rec.title}</h4>
          <div class="ent-defect-meta">
            <span><i class="fa-solid fa-microchip text-cyan"></i> ${rec.product}</span>
            <span>·</span>
            <span><i class="fa-solid fa-tag"></i> ${rec.category}</span>
            <span>·</span>
            <span><i class="fa-solid fa-user-pen"></i> ${rec.author ? rec.author.split('(')[0].trim() : 'QA Eng.'}</span>
          </div>
          <div class="ent-defect-actions-bar">
            <button type="button" class="${isFile ? 'ent-btn-file' : 'ent-btn-link'}" onclick="event.stopPropagation(); handleAttachmentClick('defect', '${rec.id}')" title="${isFile ? `Open Attachment: ${rec.fileName}` : `Open Link: ${rec.linkUrl}`}">
              <i class="fa-solid ${attachIcon}"></i>
              <span>${isFile ? 'PDF File' : 'Link'}</span>
            </button>
            <div class="ent-card-tools">
              <button type="button" class="ent-btn-tool" onclick="event.stopPropagation(); openRecordForm('defect', '${rec.id}')" title="Edit Record">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button type="button" class="ent-btn-tool del" onclick="event.stopPropagation(); deleteRecord('defect', '${rec.id}')" title="Delete Record">
                <i class="fa-solid fa-trash-can"></i>
              </button>
              <button type="button" class="ent-btn-tool" onclick="event.stopPropagation(); openPdfModal('${rec.id}')" title="View Full 3-Page Sheet">
                <i class="fa-solid fa-expand"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    renderEnterpriseDefectDetail(activeRec.id);
  }

  function selectEnterpriseDefect(id) {
    AppState.selectedRecordId = id;
    document.querySelectorAll('.ent-defect-card').forEach(card => {
      card.classList.toggle('active', card.dataset.recId === id);
    });
    renderEnterpriseDefectDetail(id);
    // Also sync with Screen 2 preview if user toggles mode
    const item = AppState.defects.find(d => d.id === id);
    if (item) updateStaggeredPreview(item);
  }

  function resetTroubleFilters() {
    AppState.activeDefectType = '';
    AppState.activeProduct = '';
    const quickInput = document.getElementById('ent-trouble-quick-filter');
    if (quickInput) quickInput.value = '';

    document.querySelectorAll('#ent-defect-cat-list .btn-cat-chip').forEach(c => {
      c.classList.toggle('active', c.dataset.cat === 'ALL');
    });
    document.querySelectorAll('#ent-prod-list .btn-prod-chip').forEach(c => {
      c.classList.toggle('active', c.dataset.prod === 'ALL');
    });

    renderEnterpriseTroubleshooting();
    showToast('All Troubleshooting filters reset', 'info');
  }

  function renderEnterpriseDefectDetail(recordId) {
    const detailContainer = document.getElementById('ent-defect-detail-panel');
    if (!detailContainer) return;

    const rec = AppState.defects.find(d => d.id === recordId) || AppState.defects[0];
    if (!rec) {
      detailContainer.innerHTML = `<div style="text-align: center; color: #94a3b8; padding: 2rem;">No defect record selected.</div>`;
      return;
    }

    const isFile = rec.attachType === 'file';
    const attachIcon = isFile ? 'fa-file-pdf' : 'fa-arrow-up-right-from-square';
    const sevClass = rec.severity === 'Critical' ? 'severity-critical' : (rec.severity === 'Major' ? 'severity-major' : 'severity-minor');

    detailContainer.innerHTML = `
      <div class="ent-defect-detail-card">
        <div class="detail-top-title-row">
          <div class="detail-title-group">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
              <span class="ent-defect-code">${rec.code || 'QA-RECORD'}</span>
              <span class="ent-severity-badge ${sevClass}">${rec.severity || 'Major'}</span>
              <span style="font-size: 0.75rem; color: #70baff; font-weight: 700;">${rec.product} · ${rec.category}</span>
            </div>
            <h2>${rec.title}</h2>
            <div class="detail-meta-line">
              <i class="fa-solid fa-user-check text-cyan"></i> Reported by <strong>${rec.author || 'QA Engineering'}</strong> · ${rec.date || '2025'}
            </div>
          </div>
          <button type="button" class="btn-open-full-pdf" onclick="openPdfModal('${rec.id}')" title="View Fullscreen 3-Page Report">
            <i class="fa-solid fa-file-pdf"></i> Full 3-Page Sheet
          </button>
        </div>

        <div class="ent-detail-sec-block">
          <h4><i class="fa-solid fa-triangle-exclamation text-amber"></i> 1. Occurrence Situation</h4>
          <p>${rec.occurrence || 'Occurrence situation recorded during production line operations.'}</p>
        </div>

        <div class="genbutsu-comparison-grid">
          <div class="genbutsu-box box-ng">
            <div class="g-tag"><i class="fa-solid fa-circle-xmark"></i> Defect GENBUTSU (NG)</div>
            <p>${rec.genbutsuNG || 'NG condition observed under inspection magnification outside allowable tolerance band.'}</p>
          </div>
          <div class="genbutsu-box box-ok">
            <div class="g-tag"><i class="fa-solid fa-circle-check"></i> Standard GENBUTSU (OK)</div>
            <p>${rec.genbutsuOK || 'Standard Monozukuri condition satisfying all technical specifications with zero leakage.'}</p>
          </div>
        </div>

        <div class="ent-detail-sec-block">
          <h4><i class="fa-solid fa-diagram-project text-cyan"></i> 2. Scope Process & Flow-Out Review</h4>
          <p><strong>Occurrence Point:</strong> ${rec.scopeProcess || 'Manufacturing assembly line operation.'}</p>
          <p style="margin-top: 0.35rem;"><strong>Flow-Out Reason:</strong> ${rec.flowOut || 'Standard leak testing sensitivity deviation or inspection escape.'}</p>
        </div>

        <div class="ent-detail-sec-block">
          <h4><i class="fa-solid fa-list-check text-green"></i> 3. 5-Why Root Cause Analysis</h4>
          <div class="why-stepper-list">
            ${(rec.whys && rec.whys.length > 0 ? rec.whys : [
              { level: 'Why 1', text: 'Dimension outside LSL tolerance limit.' },
              { level: 'Root Cause', text: 'Preventive tooling calibration interval insufficient to catch fatigue wear.' }
            ]).map((w) => {
              const isRoot = w.level && w.level.toLowerCase().includes('root');
              return `
                <div class="why-step-row ${isRoot ? 'is-root' : ''}">
                  <strong>${w.level}:</strong>
                  <span>${w.text}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="ent-detail-sec-block" style="border-left: 3px solid #10b981;">
          <h4 style="color: #34d399;"><i class="fa-solid fa-shield-halved"></i> 4. Countermeasure & Recurrence Prevention</h4>
          <p>${rec.countermeasure || 'Permanent countermeasure deployed across production tooling and operator standard work.'}</p>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 0.75rem; margin-top: 0.25rem;">
          <button type="button" class="${isFile ? 'ent-btn-file' : 'ent-btn-link'}" onclick="handleAttachmentClick('defect', '${rec.id}')">
            <i class="fa-solid ${attachIcon}"></i>
            <span>${isFile ? `Download Attachment (${rec.fileName || 'Report.pdf'} · ${rec.fileSize || '2.4 MB'})` : `Open Link: ${rec.linkUrl}`}</span>
          </button>
          <div style="display: flex; gap: 0.5rem;">
            <button type="button" class="btn-rec-edit" onclick="openRecordForm('defect', '${rec.id}')" title="Edit Record"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
            <button type="button" class="btn-rec-delete" onclick="deleteRecord('defect', '${rec.id}')" title="Delete Record"><i class="fa-solid fa-trash-can"></i> Delete</button>
          </div>
        </div>
      </div>
    `;
  }

  // ========================================================
  // ENTERPRISE SEARCH CONTROLLER
  // ========================================================
  function initEnterpriseSearch() {
    const liveInput = document.getElementById('live-search-filter-input');
    const heroInput = document.getElementById('ent-global-search-input');
    const deptSelect = document.getElementById('filter-dept-select');
    const prodSelect = document.getElementById('filter-prod-select');
    const typeCheckboxes = document.querySelectorAll('.f-type-cb');
    const btnReset = document.getElementById('btn-reset-search-filters');

    if (liveInput) {
      liveInput.addEventListener('input', () => {
        renderEnterpriseSearch();
      });
    }

    if (heroInput) {
      heroInput.addEventListener('input', () => {
        if (liveInput) liveInput.value = heroInput.value;
        renderEnterpriseSearch();
      });
      heroInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          switchEntView('ent-search');
          if (liveInput) liveInput.value = heroInput.value;
          renderEnterpriseSearch();
        }
      });
    }

    if (deptSelect) {
      deptSelect.addEventListener('change', () => {
        renderEnterpriseSearch();
      });
    }

    if (prodSelect) {
      prodSelect.addEventListener('change', () => {
        renderEnterpriseSearch();
      });
    }

    typeCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        renderEnterpriseSearch();
      });
    });

    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (liveInput) liveInput.value = '';
        if (heroInput) heroInput.value = '';
        if (deptSelect) deptSelect.value = 'ALL';
        if (prodSelect) prodSelect.value = 'ALL';
        typeCheckboxes.forEach(cb => cb.checked = true);
        renderEnterpriseSearch();
        showToast('All Search filters reset to defaults', 'info');
      });
    }

    // Quick suggestion tags in Hero
    document.querySelectorAll('.tag-chip').forEach(tag => {
      tag.addEventListener('click', () => {
        const val = tag.dataset.searchTag || tag.textContent.trim();
        switchEntView('ent-search');
        if (liveInput) liveInput.value = val;
        if (heroInput) heroInput.value = val;
        renderEnterpriseSearch();
        showToast(`Searching for: "${val}"`, 'info');
      });
    });

    renderEnterpriseSearch();
  }

  function renderEnterpriseSearch() {
    const listContainer = document.getElementById('search-results-list');
    const countText = document.getElementById('results-count-text');
    if (!listContainer) return;

    const liveInput = document.getElementById('live-search-filter-input');
    const query = (liveInput ? liveInput.value : '').toLowerCase().trim();
    const deptSelect = document.getElementById('filter-dept-select');
    const selDept = deptSelect ? deptSelect.value : 'ALL';
    const prodSelect = document.getElementById('filter-prod-select');
    const selProd = prodSelect ? prodSelect.value : 'ALL';

    const checkedTypes = Array.from(document.querySelectorAll('.f-type-cb:checked')).map(cb => cb.value);

    // Build unified list of records
    const unified = [];

    // Defect records mapped to Lessons Learned
    AppState.defects.forEach(d => {
      unified.push({
        id: d.id,
        mode: 'defect',
        title: d.title,
        type: 'Lessons Learned',
        category: d.category,
        product: d.product,
        dept: 'QA & QC',
        author: d.author,
        date: d.date,
        views: 890 + Math.floor(d.id.length * 37),
        attachType: d.attachType,
        fileName: d.fileName,
        fileSize: d.fileSize,
        linkUrl: d.linkUrl,
        desc: d.occurrence || 'Quality trouble shooting record with 5-Why analysis and permanent countermeasure.',
        code: d.code
      });
    });

    // Knowledge records
    AppState.knowledge.forEach(k => {
      unified.push({
        id: k.id,
        mode: 'knowledge',
        title: k.title,
        type: k.type || (k.category === 'Procedure' ? 'Knowledge' : (k.category === 'Manual' ? 'Experience' : 'Best Practice')),
        category: k.category,
        product: k.product,
        dept: k.dept || 'Production Engineering',
        author: k.author,
        date: k.date || '2025-09-01',
        views: k.views || 620,
        attachType: k.attachType,
        fileName: k.fileName,
        fileSize: k.fileSize,
        linkUrl: k.linkUrl,
        desc: k.desc || 'Standardized Monozukuri operational procedure.',
        code: `KNOW-${k.id}`
      });
    });

    // Filter by checked types
    let filtered = unified.filter(item => checkedTypes.includes(item.type));

    // Filter by department
    if (selDept !== 'ALL') {
      filtered = filtered.filter(item => {
        return (item.dept && item.dept.toLowerCase().includes(selDept.toLowerCase())) ||
               (selDept.toLowerCase().includes(item.dept.toLowerCase()));
      });
    }

    // Filter by product line
    if (selProd !== 'ALL') {
      filtered = filtered.filter(item => {
        return (item.product && item.product.toLowerCase().includes(selProd.toLowerCase())) ||
               (selProd.toLowerCase().includes(item.product.toLowerCase())) ||
               item.product === 'Global / All';
      });
    }

    // Filter by search query
    if (query) {
      filtered = filtered.filter(item => {
        return (item.title && item.title.toLowerCase().includes(query)) ||
               (item.desc && item.desc.toLowerCase().includes(query)) ||
               (item.author && item.author.toLowerCase().includes(query)) ||
               (item.category && item.category.toLowerCase().includes(query)) ||
               (item.product && item.product.toLowerCase().includes(query)) ||
               (item.dept && item.dept.toLowerCase().includes(query)) ||
               (item.code && item.code.toLowerCase().includes(query));
      });
    }

    if (countText) {
      countText.textContent = `Showing ${filtered.length} verified knowledge record${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      listContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; color: #94a3b8; padding: 3.5rem 1.5rem; background: rgba(13, 30, 68, 0.6); border: 1px dashed rgba(10, 132, 255, 0.3); border-radius: 12px;">
          <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; color: #0a84ff; margin-bottom: 0.8rem; display: block;"></i>
          <h3 style="color: #ffffff; margin-bottom: 0.4rem;">No matching records found</h3>
          <p style="font-size: 0.88rem; margin-bottom: 1.25rem;">Try adjusting your query, unchecking department filters, or resetting search options.</p>
          <button type="button" class="btn-open-full-pdf" style="display: inline-flex;" onclick="document.getElementById('btn-reset-search-filters').click()">
            <i class="fa-solid fa-arrows-rotate"></i> Clear Filters
          </button>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = filtered.map(item => {
      const isFile = item.attachType === 'file';
      const attachIcon = isFile ? 'fa-file-pdf' : 'fa-link';
      let badgeClass = 'badge-type-knowledge';
      if (item.type === 'Experience') badgeClass = 'badge-type-experience';
      if (item.type === 'Lessons Learned') badgeClass = 'badge-type-lessons';
      if (item.type === 'Best Practice') badgeClass = 'badge-type-best';

      return `
        <div class="result-record-card">
          <div class="res-card-top">
            <span class="res-type-badge ${badgeClass}">${item.type}</span>
            <span style="font-size: 0.72rem; color: #70baff; font-weight: 700;">${item.dept} · ${item.product}</span>
          </div>

          <h3 class="res-card-title">${item.title}</h3>
          <p class="res-card-desc">${item.desc}</p>

          <div class="res-card-meta">
            <span><i class="fa-solid fa-user-pen text-cyan"></i> ${item.author ? item.author.split('(')[0].trim() : 'Engineer'}</span>
            <span><i class="fa-regular fa-clock"></i> ${item.date}</span>
            <span><i class="fa-regular fa-eye"></i> ${item.views}</span>
            <button type="button" class="ent-btn-tool" onclick="toggleBookmark('${item.id}', this)" title="Bookmark Topic">
              <i class="fa-regular fa-star"></i>
            </button>
          </div>

          <div class="res-card-actions">
            <button type="button" class="${isFile ? 'ent-btn-file' : 'ent-btn-link'}" onclick="handleAttachmentClick('${item.mode}', '${item.id}')" title="${isFile ? item.fileName : item.linkUrl}">
              <i class="fa-solid ${attachIcon}"></i>
              <span>${isFile ? (item.fileName || 'Download PDF') : 'Cloud Link'}</span>
            </button>
            <button type="button" class="ent-btn-tool" onclick="openRecordForm('${item.mode}', '${item.id}')" title="Edit this record">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button type="button" class="ent-btn-tool del" onclick="deleteRecord('${item.mode}', '${item.id}')" title="Delete record">
              <i class="fa-solid fa-trash-can"></i>
            </button>
            ${item.mode === 'defect' ? `
              <button type="button" class="ent-btn-tool" onclick="openPdfModal('${item.id}')" title="Open Full 3-Page Sheet">
                <i class="fa-solid fa-expand"></i>
              </button>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  // ========================================================
  // ENTERPRISE LIBRARY & EXPERTS CONTROLLER
  // ========================================================
  function renderEnterpriseLibrary() {
    const container = document.getElementById('library-cards-container');
    if (!container) return;

    const docs = [
      {
        title: 'MMS Self-Check Diagnosis Procedure FY2025',
        cat: 'Procedure',
        dept: 'Production Control',
        icon: 'fa-file-shield',
        desc: 'Manufacturing Structure Strengthening Self-Check standard framework for DENSO worldwide operations.',
        file: 'MMS_SelfCheck_Diagnosis_FY2025.pdf',
        size: '4.2 MB'
      },
      {
        title: 'Furikae Operator Rotation & Competency Manual',
        cat: 'Manual',
        dept: 'Production Department',
        icon: 'fa-book-bookmark',
        desc: 'Standardized operator cross-training matrix, competency sign-offs, and multi-skill rotation rules.',
        file: 'Furikae_Rotation_Competency_Manual.pdf',
        size: '3.6 MB'
      },
      {
        title: 'e-SMART ISO Cloud Job-WFH Certification System',
        cat: 'Technical Standard',
        dept: 'QA & QC',
        icon: 'fa-cloud-arrow-up',
        desc: 'Cloud routing protocols, electronic signatures, and remote engineering change request approvals.',
        file: 'e_SMART_ISO_Specification.pdf',
        size: '2.1 MB'
      },
      {
        title: 'DxEEP Smart Factory Telemetry Architecture',
        cat: 'System Knowledge',
        dept: 'TIE & DX',
        icon: 'fa-network-wired',
        desc: 'Edge gateway integration, PLC OPC-UA tags standard, and real-time scrap reduction telemetry.',
        file: 'DxEEP_Architecture_Whitepaper.pdf',
        size: '5.8 MB'
      },
      {
        title: 'DocSavvy Engineering Drawings & Specs Framework',
        cat: 'Best Practice',
        dept: 'Production Engineering',
        icon: 'fa-compass-drafting',
        desc: 'Centralized indexing for DDS, DPS, DIS, and DAS specifications with CAD model linking.',
        file: 'DocSavvy_Standard_Guide.pdf',
        size: '3.1 MB'
      },
      {
        title: 'Controlled Atmosphere Brazing (CAB) Gas Atmosphere',
        cat: 'Work Instruction',
        dept: 'Thermal Systems / PE',
        icon: 'fa-fire-burner',
        desc: 'Nitrogen gas purity thresholds, oxygen ppm interlocks, and thermal profile calibration for radiators.',
        file: 'CAB_Brazing_Thermal_SOP.pdf',
        size: '4.7 MB'
      },
      {
        title: 'Mechanical Poka-Yoke Tooling Design Standard',
        cat: 'Technical Standard',
        dept: 'Facility & Safety',
        icon: 'fa-shield-halved',
        desc: 'Fail-safe jig mechanical lockouts, sensor integration, and error-proofing verification guidelines.',
        file: 'Poka_Yoke_Design_Standard.pdf',
        size: '3.4 MB'
      },
      {
        title: 'Heijunka Box Kanban Scheduling Work Instruction',
        cat: 'Work Instruction',
        dept: 'Supply Chain / PC',
        icon: 'fa-boxes-packing',
        desc: 'Mixed-model sequence leveling, pitch interval calculations, and warehouse pull synchronization.',
        file: 'Heijunka_Kanban_Guide.pdf',
        size: '2.9 MB'
      }
    ];

    container.innerHTML = docs.map((doc, idx) => `
      <div class="lib-doc-card">
        <div class="lib-card-icon"><i class="fa-solid ${doc.icon}"></i></div>
        <span class="res-type-badge badge-type-knowledge" style="width: fit-content; margin-bottom: 0.4rem;">${doc.cat}</span>
        <h4 class="lib-card-title">${doc.title}</h4>
        <div class="lib-card-dept">${doc.dept}</div>
        <p class="lib-card-desc">${doc.desc}</p>
        <div class="lib-card-footer">
          <span style="font-size: 0.72rem; color: #94a3b8;"><i class="fa-solid fa-file-pdf text-red"></i> ${doc.file} (${doc.size})</span>
          <div style="display: flex; gap: 0.35rem;">
            <button type="button" class="ent-btn-file" onclick="showToast('Opening ${doc.title}...', 'info')"><i class="fa-solid fa-eye"></i> Preview</button>
            <button type="button" class="ent-btn-tool" onclick="showToast('Downloading ${doc.file}...', 'success')" title="Download Document"><i class="fa-solid fa-download"></i></button>
            <button type="button" class="ent-btn-tool" onclick="toggleBookmark('lib_${idx}', this)" title="Bookmark"><i class="fa-regular fa-star"></i></button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderEnterpriseExperts() {
    const container = document.getElementById('expert-directory-list');
    if (!container) return;

    const experts = [
      {
        name: 'Kenji Nomura',
        role: 'Senior QA Technical Specialist',
        dept: 'Quality Assurance & Control',
        initials: 'KN',
        projects: 42,
        skills: ['5-Why Analysis', 'Helium Leak Detection', 'IATF 16949', 'Kakotora Database', 'Radiator Q-Gate']
      },
      {
        name: 'Tanaka Hiroshi',
        role: 'Master Craftsman & PE Principal',
        dept: 'Production Engineering (PE)',
        initials: 'TH',
        projects: 58,
        skills: ['CAB Brazing', 'Crimping Die Design', 'Thermal Modeling', 'Vacuum Metallurgy', 'Tooling Wear']
      },
      {
        name: 'Yuki Takahashi',
        role: 'Production Control & Heijunka Leader',
        dept: 'Production Control (PC)',
        initials: 'YT',
        projects: 34,
        skills: ['MMS Audit', 'Heijunka Leveling', 'Furikae Rotation', 'Toyota Production System', 'Kanban']
      },
      {
        name: 'Dr. Aoi Yamamoto',
        role: 'Chief IoT & DX Architect',
        dept: 'TIE & Digital Transformation',
        initials: 'AY',
        projects: 29,
        skills: ['DxEEP Platform', 'AI Vision Inspection', 'Digital Twin', 'PLC Telemetry', 'Power Apps']
      },
      {
        name: 'Sato Daisuke',
        role: 'Thermal Systems Principal Engineer',
        dept: 'Heat Exchanger Division',
        initials: 'SD',
        projects: 39,
        skills: ['Sus Oil Cooler', 'Intercooler Bellows', 'Hydroforming', 'Capillary Flow', 'Finite Element FEA']
      },
      {
        name: 'Hiroshi Mori',
        role: 'Senior Maintenance & Jishuken Master',
        dept: 'TPM & JMD Maintenance',
        initials: 'HM',
        projects: 47,
        skills: ['Autonomous Maintenance', 'Magneto Stators', 'Piezo Tension', 'Poka-Yoke Lockout', 'Zero Breakdowns']
      }
    ];

    container.innerHTML = experts.map(exp => `
      <div class="expert-profile-card">
        <div class="expert-header-row">
          <div class="expert-avatar-wrap">${exp.initials}</div>
          <div>
            <h4 class="expert-name">${exp.name}</h4>
            <div class="expert-role">${exp.role}</div>
            <div class="expert-dept-tag"><i class="fa-solid fa-building text-cyan"></i> ${exp.dept}</div>
          </div>
        </div>
        <div class="expert-skills-list">
          ${exp.skills.map(s => `<span class="skill-badge">${s}</span>`).join('')}
        </div>
        <div class="expert-footer-row">
          <span style="font-size: 0.75rem; color: #94a3b8;"><i class="fa-solid fa-diagram-project text-green"></i> <strong>${exp.projects}</strong> Kaizen Projects</span>
          <button type="button" class="btn-open-full-pdf" style="font-size: 0.72rem; padding: 0.4rem 0.75rem;" onclick="consultExpert('${exp.name}')">
            <i class="fa-solid fa-comments"></i> Consult Expert
          </button>
        </div>
      </div>
    `).join('');
  }

  function toggleBookmark(id, btn) {
    const icon = btn.querySelector('i');
    if (icon) {
      if (icon.classList.contains('fa-regular')) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid', 'text-amber');
        showToast('Topic added to bookmarks', 'success');
      } else {
        icon.classList.remove('fa-solid', 'text-amber');
        icon.classList.add('fa-regular');
        showToast('Topic removed from bookmarks', 'info');
      }
    }
  }

  function consultExpert(name) {
    showToast(`Initiating capability transfer request with ${name}...`, 'success');
  }

  // ========================================================
  // 10. CHART.JS & CANVAS INITIALIZATION
  // ========================================================
  function initChartJs() {
    if (typeof Chart === 'undefined') return;

    const ctxDept = document.getElementById('chart-dept');
    if (ctxDept) {
      new Chart(ctxDept, {
        type: 'bar',
        data: {
          labels: ['QA/QC', 'TIE/DX', 'PE', 'PC', 'Safety', 'TPM', 'WH', 'PD'],
          datasets: [{
            data: [420, 240, 215, 180, 126, 115, 94, 310],
            backgroundColor: 'rgba(10, 132, 255, 0.75)',
            borderColor: '#00f2fe',
            borderWidth: 1.5,
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#94a3b8' } },
            y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#94a3b8' } }
          }
        }
      });
    }

    const ctxGrowth = document.getElementById('chart-growth');
    if (ctxGrowth) {
      new Chart(ctxGrowth, {
        type: 'line',
        data: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q1-26', 'Q2-26'],
          datasets: [{
            data: [720, 910, 1120, 1280, 1390, 1480],
            borderColor: '#00f2fe',
            backgroundColor: 'rgba(0, 242, 254, 0.15)',
            fill: true,
            tension: 0.35,
            pointBackgroundColor: '#0a84ff',
            pointRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#94a3b8' } },
            y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#94a3b8' } }
          }
        }
      });
    }

    const ctxViews = document.getElementById('chart-views');
    if (ctxViews) {
      new Chart(ctxViews, {
        type: 'doughnut',
        data: {
          labels: ['Crimp End Plate', 'Furikae Rotation', 'CAB Brazing O2', 'MMS Diagnosis', 'Netsuke Joint'],
          datasets: [{
            data: [856, 612, 480, 395, 310],
            backgroundColor: ['#00f2fe', '#0a84ff', '#003ea8', '#a855f7', '#f59e0b'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'right', labels: { color: '#cbd5e1', font: { size: 10 } } } }
        }
      });
    }

    const ctxGap = document.getElementById('chart-gap');
    if (ctxGap) {
      new Chart(ctxGap, {
        type: 'radar',
        data: {
          labels: ['5-Why Mastery', 'Standard Work', 'Poka-Yoke Tooling', 'TPM Autonomous', 'Digital Twin'],
          datasets: [
            { label: 'Target', data: [95, 95, 90, 85, 80], borderColor: '#00f2fe', backgroundColor: 'rgba(0, 242, 254, 0.2)' },
            { label: 'Current', data: [92, 94, 86, 81, 74], borderColor: '#f59e0b', backgroundColor: 'rgba(245, 158, 11, 0.2)' }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: { color: 'rgba(255,255,255,0.1)' },
              grid: { color: 'rgba(255,255,255,0.1)' },
              pointLabels: { color: '#94a3b8', font: { size: 9 } },
              ticks: { display: false }
            }
          },
          plugins: { legend: { position: 'bottom', labels: { color: '#cbd5e1', font: { size: 10 } } } }
        }
      });
    }
  }

  function initDnaCanvas() {
    const canvas = document.getElementById('dna-particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = 40;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(10, 132, 255, ${0.15 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 242, 254, 0.4)';
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }

  // ========================================================
  // 11. TOAST NOTIFICATION UTILITY
  // ========================================================
  function showToast(msg, type = 'info') {
    const wrap = document.getElementById('exact-toast-container');
    if (!wrap) return;

    const el = document.createElement('div');
    el.className = 'toast-msg';

    let icon = 'fa-circle-info text-cyan';
    if (type === 'success') icon = 'fa-circle-check text-green';
    if (type === 'error') icon = 'fa-triangle-exclamation text-red';

    el.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${msg}</span>`;
    wrap.appendChild(el);

    setTimeout(() => {
      el.remove();
    }, 2800);
  }

  // ========================================================
  // DIGITAL TRANSFORMATION (DX) DNA MODULE CONTROLLER
  // ========================================================
  
  // DX State Management
  const DX_SCHEMA_VERSION = '1.0.0';
  const LS_KEY_DX_STATE = 'dna_matrix_dx_state_v1';
  const LS_KEY_DX_ROLE = 'dna_matrix_dx_role_v1';
  const LS_KEY_DX_BOOKMARKS = 'dna_matrix_dx_bookmarks_v1';

  let DXState = {
    currentRole: 'Contributor', // Viewer, Contributor, Reviewer, Admin
    activeView: 'dx-overview',
    currentDimensionFilter: 'ALL',
    bookmarks: new Set(),
    data: null,
    charts: {}
  };

  function initDXModule() {
    loadDXState();
    initDXNavigation();
    initDXRoleSwitcher();
    initDXGlobalSearch();
    initDXActionForm();
    initDXProjectModalTabs();

    // Render Home Page Screen 1 DX section stats
    updateScreen1DXStats();
  }

  function loadDXState() {
    try {
      const savedRole = localStorage.getItem(LS_KEY_DX_ROLE);
      if (savedRole) DXState.currentRole = savedRole;

      const roleSelector = document.getElementById('dx-role-selector');
      if (roleSelector) roleSelector.value = DXState.currentRole;

      const savedBookmarks = localStorage.getItem(LS_KEY_DX_BOOKMARKS);
      if (savedBookmarks) {
        DXState.bookmarks = new Set(JSON.parse(savedBookmarks));
      }

      const savedData = localStorage.getItem(LS_KEY_DX_STATE);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (window.DX_SEED_DATA && parsed.dxKnowledge && parsed.dxKnowledge.length < window.DX_SEED_DATA.dxKnowledge.length) {
          DXState.data = JSON.parse(JSON.stringify(window.DX_SEED_DATA));
          saveDXState();
        } else {
          DXState.data = parsed;
        }
      } else if (window.DX_SEED_DATA) {
        DXState.data = JSON.parse(JSON.stringify(window.DX_SEED_DATA));
        saveDXState();
      }
    } catch (e) {
      console.warn('Failed to load DX state from localStorage, falling back to seed data:', e);
      if (window.DX_SEED_DATA) {
        DXState.data = JSON.parse(JSON.stringify(window.DX_SEED_DATA));
      }
    }
  }

  function saveDXState() {
    try {
      if (DXState.data) {
        localStorage.setItem(LS_KEY_DX_STATE, JSON.stringify(DXState.data));
      }
      localStorage.setItem(LS_KEY_DX_ROLE, DXState.currentRole);
      localStorage.setItem(LS_KEY_DX_BOOKMARKS, JSON.stringify(Array.from(DXState.bookmarks)));
    } catch (e) {
      console.warn('Failed to save DX state:', e);
    }
  }

  function resetDemoData() {
    if (confirm('Are you sure you want to reset all DX demonstration data back to default factory state?')) {
      if (window.DX_SEED_DATA) {
        DXState.data = JSON.parse(JSON.stringify(window.DX_SEED_DATA));
        DXState.bookmarks.clear();
        saveDXState();
        showToast('DX demonstration data reset to original factory state.', 'success');
        switchDXView(DXState.activeView);
        updateScreen1DXStats();
      }
    }
  }

  function updateScreen1DXStats() {
    if (!DXState.data) return;
    const knoEl = document.getElementById('sc1-stat-kno');
    const prjEl = document.getElementById('sc1-stat-prj');
    const astEl = document.getElementById('sc1-stat-ast');
    const lpEl = document.getElementById('sc1-stat-lp');
    const topEl = document.getElementById('sc1-stat-top');
    const eviEl = document.getElementById('sc1-stat-evi');

    if (knoEl) knoEl.textContent = (DXState.data.dxKnowledge || []).length;
    if (prjEl) prjEl.textContent = (DXState.data.dxProjects || []).length;
    if (astEl) astEl.textContent = (DXState.data.dxReusableAssets || []).length;
    if (lpEl) lpEl.textContent = (DXState.data.dxLearningPaths || []).length;
    if (topEl) topEl.textContent = (DXState.data.dxTopics || []).length;
    if (eviEl) eviEl.textContent = (DXState.data.dxAssessments || []).filter(a => a.reviewStatus === 'Verified').length * 2 + 16;
  }

  // ========================================================
  // DX WORKSPACE NAVIGATION
  // ========================================================
  function initDXNavigation() {
    // Workspace switcher buttons (Quality DNA vs DX DNA)
    const btnWsQuality = document.getElementById('btn-ws-quality');
    const btnWsDx = document.getElementById('btn-ws-dx');

    if (btnWsQuality) {
      btnWsQuality.addEventListener('click', () => {
        switchToWorkspace('quality');
      });
    }

    if (btnWsDx) {
      btnWsDx.addEventListener('click', () => {
        switchToWorkspace('dx');
      });
    }

    // Launch DX from Screen 1
    const btnLaunchSc1 = document.getElementById('btn-sc1-launch-dx');
    if (btnLaunchSc1) {
      btnLaunchSc1.addEventListener('click', () => {
        switchToWorkspace('dx');
        switchDXView('dx-overview');
      });
    }

    // 4-Dimension Panels on Screen 1
    document.querySelectorAll('.dx-4d-panel[data-jump-dim]').forEach(panel => {
      panel.addEventListener('click', () => {
        const dim = panel.dataset.jumpDim;
        switchToWorkspace('dx');
        if (dim === 'knowledge') switchDXView('dx-knowledge');
        else if (dim === 'skill') switchDXView('dx-learning');
        else if (dim === 'experience') switchDXView('dx-experience');
        else if (dim === 'sharing') switchDXView('dx-governance');
      });
    });

    // DX Sub-View Navigation Tabs
    const dxTabs = document.querySelectorAll('.btn-dx-tab');
    dxTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const viewId = tab.dataset.dxView;
        switchDXView(viewId);
      });
    });

    // Reset demo data button in Governance view
    const btnResetData = document.getElementById('btn-reset-demo-data');
    if (btnResetData) {
      btnResetData.addEventListener('click', resetDemoData);
    }

    // Export full JSON in Governance view
    const btnExportJson = document.getElementById('btn-export-full-dx-json');
    if (btnExportJson) {
      btnExportJson.addEventListener('click', () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(DXState.data, null, 2));
        const dlAnchor = document.createElement('a');
        dlAnchor.setAttribute("href", dataStr);
        dlAnchor.setAttribute("download", "dnkh_dx_dna_backup_" + new Date().toISOString().slice(0,10) + ".json");
        document.body.appendChild(dlAnchor);
        dlAnchor.click();
        dlAnchor.remove();
        showToast('DX data exported successfully as JSON', 'success');
      });
    }

    // Export CSV from Capability Matrix
    const btnExportCsv = document.getElementById('btn-export-matrix-csv');
    if (btnExportCsv) {
      btnExportCsv.addEventListener('click', exportMatrixToCSV);
    }
  }

  function switchToWorkspace(ws) {
    const btnWsQuality = document.getElementById('btn-ws-quality');
    const btnWsDx = document.getElementById('btn-ws-dx');
    const exactStage = document.getElementById('exact-photo-stage');
    const entStage = document.getElementById('enterprise-app-stage');
    const dxStage = document.getElementById('dx-app-stage');
    const screenTabs = document.getElementById('screen-tabs-nav');
    const entNav = document.getElementById('enterprise-nav');
    const dxNav = document.getElementById('dx-nav-bar');

    if (ws === 'dx') {
      if (btnWsQuality) btnWsQuality.classList.remove('active');
      if (btnWsDx) btnWsDx.classList.add('active');

      if (exactStage) exactStage.style.display = 'none';
      if (entStage) entStage.style.display = 'none';
      if (dxStage) dxStage.style.display = 'block';

      if (screenTabs) screenTabs.style.display = 'none';
      if (entNav) entNav.style.display = 'none';
      if (dxNav) dxNav.style.display = 'flex';

      showToast('Switched to Digital Transformation (DX) DNA Workspace', 'info');
      switchDXView(DXState.activeView || 'dx-overview');
    } else {
      if (btnWsQuality) btnWsQuality.classList.add('active');
      if (btnWsDx) btnWsDx.classList.remove('active');

      if (dxStage) dxStage.style.display = 'none';
      if (dxNav) dxNav.style.display = 'none';

      if (AppState.mode === 'enterprise') {
        if (entStage) entStage.style.display = 'block';
        if (entNav) entNav.style.display = 'flex';
      } else {
        if (exactStage) exactStage.style.display = 'flex';
        if (screenTabs) screenTabs.style.display = 'flex';
      }

      showToast('Switched to Quality DNA Workspace', 'info');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function switchDXView(viewId) {
    DXState.activeView = viewId;

    // Update active nav tab
    document.querySelectorAll('.btn-dx-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.dxView === viewId);
    });

    // Update active section
    document.querySelectorAll('.dx-section-view').forEach(sec => {
      sec.classList.remove('active');
    });

    const activeSec = document.getElementById('view-' + viewId);
    if (activeSec) {
      activeSec.classList.add('active');
    }

    // Trigger render function for specific view
    if (viewId === 'dx-overview') renderDXOverview();
    else if (viewId === 'dx-knowledge') renderDXKnowledge();
    else if (viewId === 'dx-matrix') renderDXMatrix();
    else if (viewId === 'dx-projects') renderDXProjects();
    else if (viewId === 'dx-experience') renderDXExperience();
    else if (viewId === 'dx-learning') renderDXLearning();
    else if (viewId === 'dx-experts') renderDXExperts();
    else if (viewId === 'dx-assessment') renderDXAssessment();
    else if (viewId === 'dx-analytics') renderDXAnalytics();
    else if (viewId === 'dx-governance') renderDXGovernance();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ========================================================
  // PROTOTYPE ROLE SWITCHER & PERMISSION ENFORCEMENT
  // ========================================================
  function initDXRoleSwitcher() {
    const selector = document.getElementById('dx-role-selector');
    if (!selector) return;

    selector.addEventListener('change', () => {
      DXState.currentRole = selector.value;
      saveDXState();
      showToast('Simulation role changed to: ' + DXState.currentRole + ' (Prototype Simulation)', 'info');
      // Refresh current view to update permissions
      switchDXView(DXState.activeView);
    });
  }

  function hasDXPermission(action) {
    const role = DXState.currentRole;
    if (role === 'Admin') return true;
    if (role === 'Reviewer') {
      return ['READ', 'BOOKMARK', 'ADD_RECORD', 'SUBMIT_EVIDENCE', 'VERIFY_EVIDENCE', 'REVIEW'].includes(action);
    }
    if (role === 'Contributor') {
      return ['READ', 'BOOKMARK', 'ADD_RECORD', 'SUBMIT_EVIDENCE'].includes(action);
    }
    // Viewer
    return ['READ', 'BOOKMARK'].includes(action);
  }

  // ========================================================
  // RENDER: DX OVERVIEW
  // ========================================================
  function renderDXOverview() {
    if (!DXState.data) return;

    // 1. Render Summary KPIs
    const kpiWrap = document.getElementById('dx-overview-kpis');
    if (kpiWrap) {
      const knoCount = (DXState.data.dxKnowledge || []).length;
      const prjCount = (DXState.data.dxProjects || []).length;
      const astCount = (DXState.data.dxReusableAssets || []).length;
      const lpCount = (DXState.data.dxLearningPaths || []).length;
      const topCount = (DXState.data.dxTopics || []).length;
      const pendingEvi = (DXState.data.dxAssessments || []).filter(a => a.reviewStatus !== 'Verified').length;

      kpiWrap.innerHTML = `
        <div class="dx-metric-tile">
          <div class="metric-tile-header"><span>Total Knowledge</span><i class="fa-solid fa-book-bookmark"></i></div>
          <div class="metric-tile-value">${knoCount}</div>
          <div class="metric-tile-sub">SOPs, Standards & Patterns</div>
        </div>
        <div class="dx-metric-tile">
          <div class="metric-tile-header"><span>Total Projects</span><i class="fa-solid fa-diagram-project"></i></div>
          <div class="metric-tile-value">${prjCount}</div>
          <div class="metric-tile-sub">Production Plant Automations</div>
        </div>
        <div class="dx-metric-tile">
          <div class="metric-tile-header"><span>Reusable Assets</span><i class="fa-solid fa-cubes"></i></div>
          <div class="metric-tile-value">${astCount}</div>
          <div class="metric-tile-sub">Components, Flows & Prompts</div>
        </div>
        <div class="dx-metric-tile">
          <div class="metric-tile-header"><span>Learning Assets</span><i class="fa-solid fa-graduation-cap"></i></div>
          <div class="metric-tile-value">${lpCount}</div>
          <div class="metric-tile-sub">Across 6 Persona Tracks</div>
        </div>
        <div class="dx-metric-tile">
          <div class="metric-tile-header"><span>Capability Topics</span><i class="fa-solid fa-list-check"></i></div>
          <div class="metric-tile-value">${topCount}</div>
          <div class="metric-tile-sub">Across 8 DX Categories</div>
        </div>
        <div class="dx-metric-tile">
          <div class="metric-tile-header"><span>Pending Review</span><i class="fa-solid fa-clock"></i></div>
          <div class="metric-tile-value text-amber">${pendingEvi}</div>
          <div class="metric-tile-sub">Evidence Items Awaiting Audit</div>
        </div>
      `;
    }

    // 2. Render 4D Interactive Panels
    const panelsWrap = document.getElementById('dx-overview-4d-panels');
    if (panelsWrap) {
      panelsWrap.innerHTML = `
        <div class="dx-4d-panel ${DXState.currentDimensionFilter === 'Knowledge' ? 'active' : ''}" onclick="filterDXOverviewByDim('Knowledge')">
          <div class="dx-4d-badge-row"><span class="dx-4d-num-badge">DIMENSION 1</span><i class="fa-solid fa-brain text-cyan"></i></div>
          <h4>1. KNOWLEDGE</h4>
          <span class="dx-4d-meaning">What you understand</span>
          <p class="dx-4d-desc">Understanding principles, architectural boundaries, and standard operating procedures.</p>
          <div class="dx-4d-footer-stat"><span>18 Verified Standards</span><i class="fa-solid fa-arrow-right"></i></div>
        </div>
        <div class="dx-4d-panel ${DXState.currentDimensionFilter === 'Skill' ? 'active' : ''}" onclick="filterDXOverviewByDim('Skill')">
          <div class="dx-4d-badge-row"><span class="dx-4d-num-badge">DIMENSION 2</span><i class="fa-solid fa-code text-blue"></i></div>
          <h4>2. SKILL</h4>
          <span class="dx-4d-meaning">What you can perform hands-on</span>
          <p class="dx-4d-desc">Configuring canvas containers, writing DAX expressions, and connecting IoT gateways.</p>
          <div class="dx-4d-footer-stat"><span>24 Practical Exercises</span><i class="fa-solid fa-arrow-right"></i></div>
        </div>
        <div class="dx-4d-panel ${DXState.currentDimensionFilter === 'Experience' ? 'active' : ''}" onclick="filterDXOverviewByDim('Experience')">
          <div class="dx-4d-badge-row"><span class="dx-4d-num-badge">DIMENSION 3</span><i class="fa-solid fa-briefcase text-green"></i></div>
          <h4>3. EXPERIENCE</h4>
          <span class="dx-4d-meaning">What you applied & delivered</span>
          <p class="dx-4d-desc">Delivering real Genba solutions, managing production cutovers, and solving shopfloor bugs.</p>
          <div class="dx-4d-footer-stat"><span>14 Production Case Studies</span><i class="fa-solid fa-arrow-right"></i></div>
        </div>
        <div class="dx-4d-panel ${DXState.currentDimensionFilter === 'Sharing' ? 'active' : ''}" onclick="filterDXOverviewByDim('Sharing')">
          <div class="dx-4d-badge-row"><span class="dx-4d-num-badge">DIMENSION 4</span><i class="fa-solid fa-people-arrows text-coral"></i></div>
          <h4>4. KNOWLEDGE SHARING</h4>
          <span class="dx-4d-meaning">What you standardize & mentor</span>
          <p class="dx-4d-desc">Authoring SOPs, mentoring junior citizen developers, and conducting architecture reviews.</p>
          <div class="dx-4d-footer-stat"><span>9 Corporate Standards</span><i class="fa-solid fa-arrow-right"></i></div>
        </div>
      `;
    }

    // 3. Render 8 Category Cards
    const catsWrap = document.getElementById('dx-categories-grid');
    if (catsWrap && DXState.data.dxCategories) {
      catsWrap.innerHTML = DXState.data.dxCategories.map(cat => `
        <div class="dx-category-card" onclick="filterDXKnowledgeByCategory('${cat.id}')">
          <div class="cat-card-header">
            <div class="cat-card-icon" style="background: ${cat.color};">
              <i class="fa-solid ${cat.icon}"></i>
            </div>
            <div class="cat-card-title">
              <span class="cat-card-code">${cat.code}</span>
              <h3>${cat.name}</h3>
            </div>
          </div>
          <p class="cat-card-desc">${cat.description}</p>
          <div class="cat-card-stats-row">
            <span>${cat.topicsCount} Topics · ${cat.knowledgeCount} Standards</span>
            <span class="coverage-pill">${cat.coverage} Coverage</span>
          </div>
        </div>
      `).join('');
    }

    // 4. Render Live Activity Stream
    const actWrap = document.getElementById('dx-activity-stream');
    if (actWrap && DXState.data.dxAuditLog) {
      actWrap.innerHTML = DXState.data.dxAuditLog.slice(0, 5).map(act => `
        <div class="activity-item-row">
          <span class="act-type-badge act-type-${act.entity.toLowerCase().slice(0,3)}">${act.entity}</span>
          <div class="act-text">
            <strong>${act.user}:</strong> ${act.details}
          </div>
          <span class="act-time">${act.timestamp}</span>
        </div>
      `).join('');
    }
  }

  function filterDXOverviewByDim(dim) {
    DXState.currentDimensionFilter = dim;
    showToast('Filtered view by Dimension: ' + dim, 'info');
    if (dim === 'Knowledge') switchDXView('dx-knowledge');
    else if (dim === 'Skill') switchDXView('dx-learning');
    else if (dim === 'Experience') switchDXView('dx-experience');
    else if (dim === 'Sharing') switchDXView('dx-governance');
  }

  function filterDXKnowledgeByCategory(catId) {
    switchDXView('dx-knowledge');
    const select = document.getElementById('dx-kno-filter-cat');
    if (select) {
      select.value = catId;
      renderDXKnowledge();
    }
  }

  // ========================================================
  // RENDER: DX KNOWLEDGE LIBRARY
  // ========================================================
  function renderDXKnowledge() {
    if (!DXState.data) return;

    // Populate category dropdown
    const catSelect = document.getElementById('dx-kno-filter-cat');
    if (catSelect && catSelect.options.length <= 1) {
      (DXState.data.dxCategories || []).forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat.id;
        opt.textContent = `${cat.code}: ${cat.name}`;
        catSelect.appendChild(opt);
      });
      catSelect.addEventListener('change', renderDXKnowledgeCards);
    }

    // Populate type dropdown
    const typeSelect = document.getElementById('dx-kno-filter-type');
    if (typeSelect && typeSelect.options.length <= 1) {
      const types = ['Concept', 'Best Practice', 'SOP', 'Work Instruction', 'Standard', 'Checklist', 'Architecture Pattern', 'Coding Guideline', 'Reusable Component', 'Formula', 'Prompt', 'Training Material', 'Governance Rule'];
      types.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t;
        opt.textContent = t;
        typeSelect.appendChild(opt);
      });
      typeSelect.addEventListener('change', renderDXKnowledgeCards);
    }

    // Populate maturity dropdown
    const matSelect = document.getElementById('dx-kno-filter-maturity');
    if (matSelect && matSelect.options.length <= 1) {
      const levels = ['Aware', 'Practitioner', 'Applied', 'Delivered', 'Share & Sustain'];
      levels.forEach(lvl => {
        const opt = document.createElement('option');
        opt.value = lvl;
        opt.textContent = lvl;
        matSelect.appendChild(opt);
      });
      matSelect.addEventListener('change', renderDXKnowledgeCards);
    }

    // Populate dept dropdown
    const deptSelect = document.getElementById('dx-kno-filter-dept');
    if (deptSelect && deptSelect.options.length <= 1) {
      ['TIE & DX', 'QA & QC', 'PE', 'PC', 'PD', 'WH'].forEach(d => {
        const opt = document.createElement('option');
        opt.value = d;
        opt.textContent = d;
        deptSelect.appendChild(opt);
      });
      deptSelect.addEventListener('change', renderDXKnowledgeCards);
    }

    const searchInput = document.getElementById('dx-kno-search-input');
    if (searchInput && !searchInput.dataset.bound) {
      searchInput.dataset.bound = 'true';
      searchInput.addEventListener('input', debounce(renderDXKnowledgeCards, 200));
    }

    const resetBtn = document.getElementById('btn-reset-kno-filters');
    if (resetBtn && !resetBtn.dataset.bound) {
      resetBtn.dataset.bound = 'true';
      resetBtn.addEventListener('click', () => {
        if (catSelect) catSelect.value = 'ALL';
        if (typeSelect) typeSelect.value = 'ALL';
        if (matSelect) matSelect.value = 'ALL';
        if (deptSelect) deptSelect.value = 'ALL';
        if (searchInput) searchInput.value = '';
        renderDXKnowledgeCards();
      });
    }

    renderDXKnowledgeCards();
  }

  function renderDXKnowledgeCards() {
    const container = document.getElementById('dx-knowledge-cards-container');
    if (!container || !DXState.data) return;

    const query = (document.getElementById('dx-kno-search-input')?.value || '').toLowerCase().trim();
    const catVal = document.getElementById('dx-kno-filter-cat')?.value || 'ALL';
    const typeVal = document.getElementById('dx-kno-filter-type')?.value || 'ALL';
    const matVal = document.getElementById('dx-kno-filter-maturity')?.value || 'ALL';
    const deptVal = document.getElementById('dx-kno-filter-dept')?.value || 'ALL';

    const records = (DXState.data.dxKnowledge || []).filter(k => {
      if (catVal !== 'ALL' && k.categoryId !== catVal) return false;
      if (typeVal !== 'ALL' && k.knowledgeType !== typeVal) return false;
      if (matVal !== 'ALL' && k.maturityLevel !== matVal) return false;
      if (deptVal !== 'ALL' && k.department !== deptVal) return false;
      if (query) {
        const matchText = (k.title + ' ' + k.shortDescription + ' ' + (k.technologies || []).join(' ')).toLowerCase();
        if (!matchText.includes(query)) return false;
      }
      return true;
    });

    if (records.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: rgba(13, 30, 68, 0.5); border-radius: 12px; border: 1px dashed rgba(255,255,255,0.15);">
          <i class="fa-solid fa-folder-open fa-3x" style="color: #64748b; margin-bottom: 1rem;"></i>
          <h4 style="color: #ffffff; margin-bottom: 0.5rem;">No DX Knowledge Records Found</h4>
          <p style="color: #94a3b8; font-size: 0.85rem;">Try adjusting your search criteria or resetting filters.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = records.map(item => {
      const isBookmarked = DXState.bookmarks.has(item.id);
      return `
        <div class="dx-kno-card" id="kno-card-${item.id}">
          <div class="kno-card-top-badges">
            <span class="kno-type-badge">${item.knowledgeType}</span>
            <span class="kno-maturity-badge">${item.maturityLevel}</span>
          </div>
          <h3 class="kno-card-title">${item.title}</h3>
          <p class="kno-card-desc">${item.shortDescription}</p>
          <div class="kno-tech-tags-list">
            ${(item.technologies || []).map(t => `<span class="tech-tag-chip">${t}</span>`).join('')}
          </div>
          <div class="kno-card-footer">
            <div>
              <span style="color: #f1f5f9; font-weight: 700;">${item.owner}</span><br>
              <small style="color: #64748b;">${item.department} · Rev: ${item.updatedDate}</small>
            </div>
            <div class="kno-card-actions">
              <button type="button" class="btn-card-icon ${isBookmarked ? 'bookmarked' : ''}" onclick="toggleDXBookmark('${item.id}')" title="Save Bookmark">
                <i class="fa-solid fa-bookmark"></i>
              </button>
              <button type="button" class="btn-dx-action" onclick="openDXKnowledgeDetailModal('${item.id}')" style="padding: 0.35rem 0.7rem; font-size: 0.75rem;">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> Open
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function toggleDXBookmark(id) {
    if (DXState.bookmarks.has(id)) {
      DXState.bookmarks.delete(id);
      showToast('Bookmark removed', 'info');
    } else {
      DXState.bookmarks.add(id);
      showToast('Record bookmarked successfully', 'success');
    }
    saveDXState();
    renderDXKnowledgeCards();
  }

  function openDXKnowledgeDetailModal(id) {
    const item = (DXState.data.dxKnowledge || []).find(k => k.id === id);
    if (!item) return;

    const modal = document.getElementById('modal-dx-knowledge-detail');
    const titleEl = document.getElementById('dx-kno-modal-title');
    const subEl = document.getElementById('dx-kno-modal-sub');
    const bodyEl = document.getElementById('dx-kno-modal-body');

    if (titleEl) titleEl.textContent = item.title;
    if (subEl) subEl.textContent = `${item.knowledgeType} · ${item.department} · Owner: ${item.owner} · Last Review: ${item.reviewDate}`;

    if (bodyEl) {
      bodyEl.innerHTML = `
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.25rem;">
          <span class="sample-data-badge">${item.verificationStatus}</span>
          <span class="kno-type-badge">${item.knowledgeType}</span>
          <span class="kno-maturity-badge">${item.maturityLevel}</span>
          <span class="coverage-pill">Confidentiality: ${item.confidentiality || 'Internal'}</span>
        </div>

        <div class="detail-section-block">
          <h4><i class="fa-solid fa-briefcase text-cyan"></i> 1. Business Context & Problem Addressed</h4>
          <p><strong>Context:</strong> ${item.businessContext || 'N/A'}</p>
          <p><strong>Problem Addressed:</strong> ${item.problemAddressed || 'N/A'}</p>
        </div>

        <div class="detail-section-block">
          <h4><i class="fa-solid fa-circle-info text-blue"></i> 2. Core Knowledge & Principles</h4>
          <p>${item.explanation || item.shortDescription}</p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 0.75rem;">
            <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); padding: 0.75rem; border-radius: 8px;">
              <strong style="color: #34d399;">✓ When To Use:</strong>
              <p style="margin: 0.25rem 0 0 0; font-size: 0.8rem;">${item.whenToUse || 'Standard production applications.'}</p>
            </div>
            <div style="background: rgba(230, 0, 18, 0.1); border: 1px solid rgba(230, 0, 18, 0.3); padding: 0.75rem; border-radius: 8px;">
              <strong style="color: #ff6b6b;">✗ When NOT To Use:</strong>
              <p style="margin: 0.25rem 0 0 0; font-size: 0.8rem;">${item.whenNotToUse || 'Unapproved rogue environments.'}</p>
            </div>
          </div>
        </div>

        <div class="detail-section-block">
          <h4><i class="fa-solid fa-list-ol text-green"></i> 3. Step-by-Step Implementation Guidance</h4>
          <ol style="margin-left: 1.25rem; line-height: 1.6;">
            ${(item.stepStepGuidance || item.stepByStepGuidance || []).map(step => `<li>${step}</li>`).join('')}
          </ol>
        </div>

        <div class="detail-section-block">
          <h4><i class="fa-solid fa-code text-purple"></i> 4. Technical Details & Reusable Snippets</h4>
          <pre style="background: #080f1e; border: 1px solid rgba(255,255,255,0.1); padding: 0.85rem; border-radius: 8px; color: #00f2fe; font-family: monospace; font-size: 0.78rem; overflow-x: auto;"><code>${item.technicalDetails || '// No code snippet attached'}</code></pre>
        </div>

        <div class="detail-section-block">
          <h4><i class="fa-solid fa-triangle-exclamation text-amber"></i> 5. Lessons Learned & Operational Risks</h4>
          <p><strong>Lessons Learned:</strong> ${item.lessonsLearned || 'N/A'}</p>
          <p><strong>Operational Risks:</strong> ${item.risks || 'N/A'}</p>
          <p><strong>Security & Confidentiality:</strong> ${item.securityNotes || 'N/A'}</p>
        </div>

        <div class="detail-section-block">
          <h4><i class="fa-solid fa-paperclip text-cyan"></i> 6. Associated Files, Projects & Standards</h4>
          <p><strong>Related Standards:</strong> ${item.relatedStandards || 'DNKH Corporate Standard'}</p>
          <p><strong>Related Files:</strong> ${item.filesMeta || 'Technical documentation on SharePoint'}</p>
          <p><strong>Version History:</strong> ${item.versionHistory || 'v1.0'}</p>
        </div>
      `;
    }

    if (modal) {
      modal.hidden = false;
      const closeBtn = document.getElementById('btn-close-dx-kno-modal');
      if (closeBtn) closeBtn.onclick = () => modal.hidden = true;
    }
  }

  // ========================================================
  // RENDER: DX CAPABILITY MATRIX (HEATMAP)
  // ========================================================
  function renderDXMatrix() {
    const tbody = document.getElementById('dx-matrix-tbody');
    if (!tbody || !DXState.data) return;

    const viewSelect = document.getElementById('dx-matrix-filter-view');
    const empSelect = document.getElementById('dx-matrix-filter-emp');
    const catSelect = document.getElementById('dx-matrix-filter-cat');
    const deptSelect = document.getElementById('dx-matrix-filter-dept');

    if (catSelect && catSelect.options.length <= 1) {
      (DXState.data.dxCategories || []).forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat.id;
        opt.textContent = `${cat.code}: ${cat.name}`;
        catSelect.appendChild(opt);
      });
      catSelect.addEventListener('change', renderDXMatrix);
      if (viewSelect) viewSelect.addEventListener('change', renderDXMatrix);
      if (empSelect) empSelect.addEventListener('change', renderDXMatrix);
      if (deptSelect) deptSelect.addEventListener('change', renderDXMatrix);
    }

    const catVal = catSelect?.value || 'ALL';
    const isDeptView = viewSelect?.value === 'department';
    const empVal = empSelect?.value || 'EMP-4821';

    let topics = DXState.data.dxTopics || [];
    if (catVal !== 'ALL') {
      topics = topics.filter(t => t.categoryId === catVal);
    }

    tbody.innerHTML = topics.map(topic => {
      // Find matching assessment if any
      const asm = (DXState.data.dxAssessments || []).find(a => a.topicId === topic.id);
      
      const kLvl = asm ? asm.knowledgeLevel : (isDeptView ? 3 : 1);
      const sLvl = asm ? asm.skillLevel : (isDeptView ? 2 : 1);
      const eLvl = asm ? asm.experienceLevel : (isDeptView ? 3 : 0);
      const shLvl = asm ? asm.sharingLevel : (isDeptView ? 2 : 0);
      const targetLvl = asm ? asm.targetLevel : 4;
      const gap = Math.max(0, targetLvl - Math.round((kLvl + sLvl + eLvl + shLvl) / 4));

      return `
        <tr>
          <td>
            <div class="matrix-topic-cell">
              <i class="fa-solid fa-microchip text-cyan"></i>
              <div>
                <strong>${topic.name}</strong><br>
                <small style="color: #64748b;">${topic.difficulty} · ${(topic.technologies || []).slice(0, 2).join(', ')}</small>
              </div>
            </div>
          </td>
          <td>
            <button type="button" class="heatmap-cell-badge lvl-${kLvl}" onclick="openDXMatrixCellModal('${topic.id}', 'Knowledge', ${kLvl})" title="Level ${kLvl}">
              <span>L${kLvl}: ${getLvlName(kLvl)}</span>
            </button>
          </td>
          <td>
            <button type="button" class="heatmap-cell-badge lvl-${sLvl}" onclick="openDXMatrixCellModal('${topic.id}', 'Skill', ${sLvl})" title="Level ${sLvl}">
              <span>L${sLvl}: ${getLvlName(sLvl)}</span>
            </button>
          </td>
          <td>
            <button type="button" class="heatmap-cell-badge lvl-${eLvl}" onclick="openDXMatrixCellModal('${topic.id}', 'Experience', ${eLvl})" title="Level ${eLvl}">
              <span>L${eLvl}: ${getLvlName(eLvl)}</span>
            </button>
          </td>
          <td>
            <button type="button" class="heatmap-cell-badge lvl-${shLvl}" onclick="openDXMatrixCellModal('${topic.id}', 'Sharing', ${shLvl})" title="Level ${shLvl}">
              <span>L${shLvl}: ${getLvlName(shLvl)}</span>
            </button>
          </td>
          <td style="text-align: center;">
            <span style="font-weight: 800; color: ${gap === 0 ? '#34d399' : '#fbbf24'};">
              Target: L${targetLvl} (${gap === 0 ? '✓ Met' : '-' + gap + ' Gap'})
            </span>
          </td>
        </tr>
      `;
    }).join('');
  }

  function getLvlName(lvl) {
    const names = ['Not Started', 'Aware', 'Practitioner', 'Applied', 'Delivered', 'Share & Sustain'];
    return names[lvl] || 'L' + lvl;
  }

  function openDXMatrixCellModal(topicId, dimension, level) {
    const topic = (DXState.data.dxTopics || []).find(t => t.id === topicId);
    if (!topic) return;

    const modal = document.getElementById('modal-dx-matrix-cell');
    const titleEl = document.getElementById('dx-cell-modal-title');
    const subEl = document.getElementById('dx-cell-modal-sub');
    const bodyEl = document.getElementById('dx-cell-modal-body');

    if (titleEl) titleEl.textContent = `${topic.name} — ${dimension} Dimension`;
    if (subEl) subEl.textContent = `Current Evaluation: Level ${level} (${getLvlName(level)})`;

    const lvlObj = (DXState.data.dxCapabilityLevels || []).find(l => l.level === level) || {};

    if (bodyEl) {
      bodyEl.innerHTML = `
        <div style="margin-bottom: 1rem;">
          <span class="heatmap-cell-badge lvl-${level}" style="display: inline-flex; width: auto;">
            Level ${level}: ${lvlObj.name || getLvlName(level)}
          </span>
        </div>

        <div class="detail-section-block">
          <h4><i class="fa-solid fa-bullseye text-cyan"></i> Behavioral Definition</h4>
          <p><strong>Definition:</strong> ${lvlObj.definition || 'Demonstrated understanding of concepts.'}</p>
          <p><strong>Expected Behaviors:</strong> ${lvlObj.behaviors || 'Performs guided tasks.'}</p>
        </div>

        <div class="detail-section-block">
          <h4><i class="fa-solid fa-certificate text-green"></i> Required Verification Evidence</h4>
          <p>${lvlObj.requiredEvidence || 'Practical project demonstration or peer reviewed code.'}</p>
          <p><strong>Example Action:</strong> ${lvlObj.exampleActions || 'Complete training challenge.'}</p>
        </div>

        <div class="detail-section-block">
          <h4><i class="fa-solid fa-graduation-cap text-blue"></i> Suggested Next Development Action</h4>
          <p>${lvlObj.suggestedLearning || 'Advance to next hands-on lab in DX Learning Hub.'}</p>
          <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
            <button type="button" class="btn-dx-action primary" onclick="modal.hidden = true; switchDXView('dx-learning');">
              <i class="fa-solid fa-graduation-cap"></i> Open Learning Path
            </button>
            <button type="button" class="btn-dx-action" onclick="modal.hidden = true; openDXActionModal('assessment');">
              <i class="fa-solid fa-upload"></i> Submit New Evidence
            </button>
          </div>
        </div>
      `;
    }

    if (modal) {
      modal.hidden = false;
      const closeBtn = document.getElementById('btn-close-dx-cell-modal');
      if (closeBtn) closeBtn.onclick = () => modal.hidden = true;
    }
  }

  function exportMatrixToCSV() {
    if (!DXState.data || !DXState.data.dxTopics) return;
    let csv = "Topic ID,Topic Name,Category,Difficulty,Knowledge Level,Skill Level,Experience Level,Sharing Level,Target Level\n";
    
    DXState.data.dxTopics.forEach(t => {
      const asm = (DXState.data.dxAssessments || []).find(a => a.topicId === t.id);
      const k = asm ? asm.knowledgeLevel : 1;
      const s = asm ? asm.skillLevel : 1;
      const e = asm ? asm.experienceLevel : 0;
      const sh = asm ? asm.sharingLevel : 0;
      const tgt = asm ? asm.targetLevel : 4;
      csv += `"${t.id}","${t.name.replace(/"/g, '""')}","${t.categoryId}","${t.difficulty}",${k},${s},${e},${sh},${tgt}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "dx_capability_matrix_" + new Date().toISOString().slice(0,10) + ".csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Capability Matrix downloaded as CSV file', 'success');
  }

  // ========================================================
  // RENDER: DX PROJECTS (PROJECT DNA)
  // ========================================================
  function renderDXProjects() {
    const container = document.getElementById('dx-projects-cards-container');
    if (!container || !DXState.data) return;

    const deptVal = document.getElementById('dx-prj-filter-dept')?.value || 'ALL';
    const statusVal = document.getElementById('dx-prj-filter-status')?.value || 'ALL';

    const projects = (DXState.data.dxProjects || []).filter(p => {
      if (deptVal !== 'ALL' && p.department !== deptVal) return false;
      if (statusVal !== 'ALL' && p.status !== statusVal) return false;
      return true;
    });

    container.innerHTML = projects.map(prj => `
      <div class="dx-prj-card" id="prj-card-${prj.id}">
        <div class="prj-card-header">
          <div>
            <span class="sample-data-badge">[Sample Data]</span>
            <h3 class="prj-card-title">${prj.name}</h3>
          </div>
          <span class="prj-status-pill prj-status-${prj.status === 'Production' ? 'prod' : 'prog'}">${prj.status}</span>
        </div>
        <div class="prj-dept-tag"><i class="fa-solid fa-building"></i> ${prj.department} · Plant Area: ${prj.plantArea || 'AP Plant'}</div>
        <p class="prj-card-summary">${prj.summary}</p>
        
        <div class="prj-impact-box">
          <div>
            <span style="color: #94a3b8;">Hours Saved:</span>
            <strong class="impact-hours-saved"> ${prj.hoursSaved || 0} hrs/mo</strong>
          </div>
          <div>
            <span style="color: #94a3b8;">Doc Completeness:</span>
            <strong style="color: #00f2fe;"> ${prj.docCompleteness || '100%'}</strong>
          </div>
        </div>

        <div class="kno-tech-tags-list">
          ${(prj.techUsed || []).map(t => `<span class="tech-tag-chip">${t}</span>`).join('')}
        </div>

        <div class="kno-card-footer">
          <div>
            <span style="color: #ffffff; font-weight: 700;">Owner: ${prj.owner}</span><br>
            <small style="color: #64748b;">Deployed: ${prj.deploymentDate || 'Active'}</small>
          </div>
          <button type="button" class="btn-dx-action" onclick="openDXProjectDetailModal('${prj.id}')" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;">
            <i class="fa-solid fa-folder-open"></i> Full Story
          </button>
        </div>
      </div>
    `).join('');
  }

  function initDXProjectModalTabs() {
    const tabs = document.querySelectorAll('.btn-prj-modal-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const tabId = tab.dataset.tab;
        document.querySelectorAll('.prj-tab-panel').forEach(p => p.classList.remove('active'));
        const panel = document.getElementById(tabId);
        if (panel) panel.classList.add('active');
      });
    });
  }

  function openDXProjectDetailModal(id) {
    const prj = (DXState.data.dxProjects || []).find(p => p.id === id);
    if (!prj) return;

    const modal = document.getElementById('modal-dx-project-detail');
    const titleEl = document.getElementById('dx-prj-modal-title');
    const subEl = document.getElementById('dx-prj-modal-sub');
    const bodyEl = document.getElementById('dx-prj-modal-body');

    if (titleEl) titleEl.textContent = prj.name;
    if (subEl) subEl.textContent = `${prj.department} · Status: ${prj.status} · Owner: ${prj.owner} · Deployed: ${prj.deploymentDate || '2025'}`;

    if (bodyEl) {
      bodyEl.innerHTML = `
        <!-- Tab 1: Overview -->
        <div id="tab-overview" class="prj-tab-panel active">
          <div class="detail-section-block">
            <h4><i class="fa-solid fa-id-card text-cyan"></i> Project Identity & Stakeholders</h4>
            <p><strong>Project ID:</strong> ${prj.id}</p>
            <p><strong>Process Area:</strong> ${prj.process || 'Plant Assembly'}</p>
            <p><strong>Plant Area:</strong> ${prj.plantArea || 'AP Plant'}</p>
            <p><strong>Project Owner:</strong> ${prj.owner}</p>
            <p><strong>Executive Sponsor:</strong> ${prj.sponsor || 'Plant Director'}</p>
            <p><strong>Project Members:</strong> ${(prj.members || []).join(', ') || 'Cross-functional team'}</p>
            <p><strong>Timeline:</strong> Started ${prj.startDate || '2025-01-01'} · Deployed ${prj.deploymentDate || '2025-06-01'}</p>
          </div>
          <div class="detail-section-block">
            <h4><i class="fa-solid fa-bullseye text-blue"></i> Executive Summary</h4>
            <p>${prj.summary}</p>
          </div>
        </div>

        <!-- Tab 2: Current Problem -->
        <div id="tab-problem" class="prj-tab-panel">
          <div class="detail-section-block">
            <h4><i class="fa-solid fa-triangle-exclamation text-amber"></i> Genba Situation & Pain Points</h4>
            <p><strong>Current Situation:</strong> ${prj.currentSituation || prj.beforeState}</p>
            <p><strong>Business Problem:</strong> ${prj.businessProblem || 'Manual operational latency.'}</p>
            <p><strong>Risk if Not Improved:</strong> ${prj.riskIfNotImproved || 'Operational bottleneck.'}</p>
            <p><strong>Manhours Consumed Before:</strong> ${prj.hoursBefore || 0} hrs / month [Sample Data]</p>
          </div>
        </div>

        <!-- Tab 3: Analysis -->
        <div id="tab-analysis" class="prj-tab-panel">
          <div class="detail-section-block">
            <h4><i class="fa-solid fa-magnifying-glass-chart text-green"></i> Genba Observations & Root Cause</h4>
            <p><strong>Observations:</strong> ${prj.genbaObservations || 'Manual paperwork inspection observed at line.'}</p>
            <p><strong>Root Cause Analysis:</strong> ${prj.rootCause || 'Absence of centralized digital intake.'}</p>
            <p><strong>Technology Selection Rationale:</strong> ${prj.techSelectionReason || 'Zero incremental license cost with existing M365.'}</p>
          </div>
        </div>

        <!-- Tab 4: Solution -->
        <div id="tab-solution" class="prj-tab-panel">
          <div class="detail-section-block">
            <h4><i class="fa-solid fa-lightbulb text-purple"></i> Solution Design & Future Process</h4>
            <p><strong>Solution Summary:</strong> ${prj.solutionSummary || prj.afterState}</p>
            <p><strong>Future Process Flow:</strong> ${prj.futureProcess || 'Operator inputs on mobile -> Automated flow -> Instant dashboard.'}</p>
            <p><strong>Validation Logic:</strong> ${prj.validationLogic || 'Prevents quota over-allocation.'}</p>
          </div>
        </div>

        <!-- Tab 5: Architecture -->
        <div id="tab-architecture" class="prj-tab-panel">
          <div class="detail-section-block">
            <h4><i class="fa-solid fa-network-wired text-cyan"></i> System Architecture & Integrations</h4>
            <p><strong>Architecture Topology:</strong> ${prj.architecture || 'Power Apps Mobile UI -> Power Automate -> SharePoint Lists'}</p>
            <p><strong>Data Sources:</strong> ${(prj.dataSources || []).join(', ') || 'SharePoint Online Lists'}</p>
            <p><strong>Permission Model:</strong> ${prj.permissionModel || 'Item-Level Security via M365 Groups'}</p>
            <p><strong>Error Handling:</strong> ${prj.errorHandling || 'Scope Try-Catch with Teams alert'}</p>
          </div>
        </div>

        <!-- Tab 6: Results -->
        <div id="tab-results" class="prj-tab-panel">
          <div class="detail-section-block">
            <h4><i class="fa-solid fa-chart-line text-green"></i> Operational & Quality Impact [Sample Data]</h4>
            <p><strong>Before State:</strong> ${prj.beforeState}</p>
            <p><strong>After State:</strong> ${prj.afterState}</p>
            <p><strong>Hours Saved:</strong> <strong style="color: #34d399;">${prj.hoursSaved || 0} manhours/month</strong></p>
            <p><strong>Cost Saving:</strong> ${prj.costSaving || 'Sample: ~$3,000/mo'}</p>
            <p><strong>Adoption Rate:</strong> ${prj.userAdoption || '99.4% active user adoption'}</p>
          </div>
        </div>

        <!-- Tab 7: Lessons -->
        <div id="tab-lessons" class="prj-tab-panel">
          <div class="detail-section-block">
            <h4><i class="fa-solid fa-book-open text-gold"></i> Lessons Learned & Failure Prevention</h4>
            <p><strong>What Worked:</strong> ${prj.whatWorked || 'Early operator involvement in mockup design.'}</p>
            <p><strong>What Did Not Work:</strong> ${prj.whatDidNotWork || 'Email notifications (operators preferred Teams).'}</p>
            <p><strong>Key Organizational Learning:</strong> ${prj.lessonsLearned || 'Standardize container layouts early.'}</p>
          </div>
        </div>

        <!-- Tab 8: Assets -->
        <div id="tab-assets" class="prj-tab-panel">
          <div class="detail-section-block">
            <h4><i class="fa-solid fa-cubes text-purple"></i> Reusable Components & Formulas</h4>
            <p><strong>Components:</strong> ${(prj.reusableComponents || []).join(', ') || 'Fluent Header Component'}</p>
            <p><strong>Formulas:</strong> ${prj.reusableFormulas || 'Filter expressions'}</p>
            <p><strong>Related SOP:</strong> ${prj.relatedSOP || 'DNKH Standard'}</p>
          </div>
        </div>

        <!-- Tab 9: Governance -->
        <div id="tab-governance" class="prj-tab-panel">
          <div class="detail-section-block">
            <h4><i class="fa-solid fa-shield-halved text-coral"></i> Ownership & Sustainment SLA</h4>
            <p><strong>Primary App Owner:</strong> ${prj.appOwner || prj.owner}</p>
            <p><strong>Secondary Backup Owner:</strong> ${prj.backupOwner || 'Assigned peer'}</p>
            <p><strong>Maintenance Cadence:</strong> ${prj.maintenanceFrequency || 'Quarterly review'}</p>
            <p><strong>BCP Rollback Plan:</strong> ${prj.bcpNotes || 'Emergency paper forms at Genba post'}</p>
          </div>
        </div>

        <!-- Tab 10: Timeline -->
        <div id="tab-timeline" class="prj-tab-panel">
          <div class="detail-section-block">
            <h4><i class="fa-solid fa-clock-rotate-left text-blue"></i> Project Milestones</h4>
            <p><strong>Kickoff & Requirement Scoping:</strong> ${prj.startDate || '2025-01-01'}</p>
            <p><strong>Genba Pilot & User Testing:</strong> 4 weeks post-kickoff</p>
            <p><strong>Production Launch:</strong> ${prj.deploymentDate || '2025-06-01'}</p>
            <p><strong>Latest Health Check:</strong> ${prj.lastReview || '2026-01-15'}</p>
          </div>
        </div>
      `;

      // Reset to first tab
      const firstTab = document.querySelector('.btn-prj-modal-tab[data-tab="tab-overview"]');
      if (firstTab) {
        document.querySelectorAll('.btn-prj-modal-tab').forEach(t => t.classList.remove('active'));
        firstTab.classList.add('active');
      }
    }

    if (modal) {
      modal.hidden = false;
      const closeBtn = document.getElementById('btn-close-dx-prj-modal');
      if (closeBtn) closeBtn.onclick = () => modal.hidden = true;
    }
  }

  // ========================================================
  // RENDER: DX EXPERIENCE & FAILURE LESSONS
  // ========================================================
  function renderDXExperience() {
    const container = document.getElementById('dx-experience-cards-container');
    if (!container || !DXState.data) return;

    const filterBar = document.getElementById('dx-exp-type-filter-bar');
    if (filterBar && !filterBar.dataset.bound) {
      filterBar.dataset.bound = 'true';
      filterBar.querySelectorAll('.btn-learning-role').forEach(btn => {
        btn.addEventListener('click', () => {
          filterBar.querySelectorAll('.btn-learning-role').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          renderDXExperienceCards(btn.dataset.expType);
        });
      });
    }

    renderDXExperienceCards('ALL');
  }

  function renderDXExperienceCards(filterType = 'ALL') {
    const container = document.getElementById('dx-experience-cards-container');
    if (!container || !DXState.data) return;

    const experiences = (DXState.data.dxExperiences || []).filter(e => {
      if (filterType !== 'ALL' && e.experienceType !== filterType) return false;
      return true;
    });

    container.innerHTML = experiences.map(exp => {
      const isFailure = exp.experienceType === 'Failure Lesson';
      return `
        <div class="dx-exp-card ${isFailure ? 'is-failure' : ''}" id="exp-card-${exp.id}">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
            <span class="sample-data-badge" style="background: ${isFailure ? 'rgba(230,0,18,0.2)' : 'rgba(10,132,255,0.2)'}; color: ${isFailure ? '#ff6b6b' : '#38bdf8'};">
              ${exp.experienceType}
            </span>
            <span style="font-size: 0.72rem; color: #64748b;">${exp.date}</span>
          </div>
          <h3 style="font-size: 1.05rem; font-weight: 800; color: #ffffff; margin-bottom: 0.45rem;">${exp.title}</h3>
          <p style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.45; margin-bottom: 0.75rem; flex: 1;">
            <strong>Situation:</strong> ${exp.situation}
          </p>
          <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; padding: 0.6rem; font-size: 0.75rem; color: #94a3b8; margin-bottom: 0.85rem;">
            <strong style="color: ${isFailure ? '#fbbf24' : '#34d399'};">Learning:</strong> ${exp.learning}
          </div>
          <div class="kno-card-footer">
            <div>
              <span style="color: #ffffff; font-weight: 700;">${exp.contributor}</span><br>
              <small style="color: #64748b;">${exp.department} · Project: ${exp.project}</small>
            </div>
            <button type="button" class="btn-dx-action" onclick="openDXExperienceDetailModal('${exp.id}')" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;">
              <i class="fa-solid fa-expand"></i> Details
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  function openDXExperienceDetailModal(id) {
    const exp = (DXState.data.dxExperiences || []).find(e => e.id === id);
    if (!exp) return;

    const modal = document.getElementById('modal-dx-experience-detail');
    const titleEl = document.getElementById('dx-exp-modal-title');
    const bodyEl = document.getElementById('dx-exp-modal-body');

    if (titleEl) titleEl.textContent = exp.title;

    if (bodyEl) {
      const isFailure = exp.experienceType === 'Failure Lesson';
      bodyEl.innerHTML = `
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
          <span class="sample-data-badge">${exp.experienceType}</span>
          <span class="coverage-pill">Contributor: ${exp.contributor} (${exp.department})</span>
          <span class="coverage-pill">Project: ${exp.project}</span>
        </div>

        <div class="detail-section-block">
          <h4><i class="fa-solid fa-circle-question text-cyan"></i> Situation & Challenge</h4>
          <p><strong>Situation:</strong> ${exp.situation}</p>
          <p><strong>Challenge:</strong> ${exp.challenge}</p>
        </div>

        <div class="detail-section-block">
          <h4><i class="fa-solid fa-wrench text-blue"></i> Action Taken & Result</h4>
          <p><strong>Action:</strong> ${exp.action}</p>
          <p><strong>Result:</strong> ${exp.result}</p>
        </div>

        ${isFailure ? `
        <div class="detail-section-block" style="background: rgba(230, 0, 18, 0.08); border: 1px solid rgba(230, 0, 18, 0.3); padding: 1rem; border-radius: 8px;">
          <h4 style="color: #ff6b6b;"><i class="fa-solid fa-triangle-exclamation"></i> Failure Lesson Breakdown (Blameless Kaizen)</h4>
          <p><strong>Original Assumption:</strong> ${exp.originalAssumption || 'N/A'}</p>
          <p><strong>What Was Attempted:</strong> ${exp.whatWasAttempted || 'N/A'}</p>
          <p><strong>What Failed & Symptoms:</strong> ${exp.whatFailed || 'N/A'} - ${exp.symptoms || ''}</p>
          <p><strong>Root Cause:</strong> ${exp.rootCause || 'N/A'}</p>
          <p><strong>Business Impact:</strong> ${exp.businessImpact || 'N/A'}</p>
          <p><strong>Permanent Prevention Poka-Yoke:</strong> ${exp.permanentPrevention || 'N/A'}</p>
        </div>
        ` : ''}

        <div class="detail-section-block">
          <h4><i class="fa-solid fa-graduation-cap text-green"></i> Key Learnings & Recommendations</h4>
          <p><strong>Organizational Learning:</strong> ${exp.learning}</p>
          <p><strong>What Should Be Repeated:</strong> ${exp.whatShouldBeRepeated || 'N/A'}</p>
          <p><strong>What Should Be Avoided:</strong> ${exp.whatShouldBeAvoided || 'N/A'}</p>
        </div>
      `;
    }

    if (modal) {
      modal.hidden = false;
      const closeBtn = document.getElementById('btn-close-dx-exp-modal');
      if (closeBtn) closeBtn.onclick = () => modal.hidden = true;
    }
  }

  // ========================================================
  // RENDER: DX LEARNING HUB
  // ========================================================
  function renderDXLearning() {
    const container = document.getElementById('dx-learning-cards-container');
    if (!container || !DXState.data) return;

    const roleBar = document.getElementById('dx-lp-role-bar');
    if (roleBar && !roleBar.dataset.bound) {
      roleBar.dataset.bound = 'true';
      roleBar.querySelectorAll('.btn-learning-role').forEach(btn => {
        btn.addEventListener('click', () => {
          roleBar.querySelectorAll('.btn-learning-role').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          renderDXLearningCards(btn.dataset.roleFilter);
        });
      });
    }

    renderDXLearningCards('ALL');
  }

  function renderDXLearningCards(roleFilter = 'ALL') {
    const container = document.getElementById('dx-learning-cards-container');
    if (!container || !DXState.data) return;

    const paths = (DXState.data.dxLearningPaths || []).filter(lp => {
      if (roleFilter !== 'ALL' && lp.role !== roleFilter) return false;
      return true;
    });

    container.innerHTML = paths.map(lp => `
      <div class="dx-lp-card" id="lp-card-${lp.id}">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
          <span class="sample-data-badge">${lp.role}</span>
          <span style="font-size: 0.75rem; color: #38bdf8; font-weight: 700;">Est: ${lp.estimatedHours} Hours</span>
        </div>
        <h3 style="font-size: 1.15rem; font-weight: 800; color: #ffffff; margin-bottom: 0.35rem;">${lp.title}</h3>
        <p style="font-size: 0.8rem; color: #cbd5e1; margin-bottom: 0.75rem;">${lp.description}</p>
        
        <div class="lp-stages-timeline">
          ${(lp.stages || []).map(st => `
            <div class="lp-stage-node">
              <strong style="color: #00f2fe;">Level ${st.level}: ${st.stageName}</strong>
              <div style="font-size: 0.75rem; color: #94a3b8; margin-top: 0.25rem;">
                ${(st.modules || []).map(m => `• ${m.code}: ${m.title}`).join('<br>')}
              </div>
            </div>
          `).join('')}
        </div>

        <div class="kno-card-footer">
          <small style="color: #34d399; font-weight: 700;"><i class="fa-solid fa-award"></i> ${lp.badgeAwarded}</small>
          <button type="button" class="btn-dx-action primary" onclick="enrollLearningPath('${lp.id}')" style="padding: 0.35rem 0.8rem; font-size: 0.75rem;">
            <i class="fa-solid fa-play"></i> Enroll Track
          </button>
        </div>
      </div>
    `).join('');
  }

  function enrollLearningPath(id) {
    showToast('Enrolled in learning track. Modules added to your personal development plan.', 'success');
  }

  // ========================================================
  // RENDER: DX EXPERT FINDER
  // ========================================================
  function renderDXExperts() {
    const container = document.getElementById('dx-experts-cards-container');
    if (!container || !DXState.data) return;

    document.querySelectorAll('.btn-expert-chip').forEach(chip => {
      if (!chip.dataset.bound) {
        chip.dataset.bound = 'true';
        chip.addEventListener('click', () => {
          const query = chip.dataset.searchExp.toLowerCase();
          filterExpertsByQuery(query);
        });
      }
    });

    renderDXExpertCards((DXState.data.dxExperts || []));
  }

  function filterExpertsByQuery(query) {
    if (!DXState.data) return;
    const filtered = (DXState.data.dxExperts || []).filter(exp => {
      const text = (exp.name + ' ' + exp.role + ' ' + (exp.verifiedCapabilityTopics || []).join(' ')).toLowerCase();
      return text.includes(query);
    });
    renderDXExpertCards(filtered);
    showToast(`Found ${filtered.length} experts matching "${query}"`, 'info');
  }

  function renderDXExpertCards(experts) {
    const container = document.getElementById('dx-experts-cards-container');
    if (!container) return;

    container.innerHTML = experts.map(exp => `
      <div class="expert-profile-card" id="exp-card-${exp.id}">
        <div class="expert-header-row">
          <div class="expert-avatar-wrap">${exp.avatarInitials || exp.name.slice(0, 2)}</div>
          <div>
            <div class="expert-name">${exp.name}</div>
            <div class="expert-role">${exp.role}</div>
            <div class="expert-dept-tag">${exp.department} · ${(exp.languages || []).join(', ')}</div>
          </div>
        </div>
        <p style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.45; margin-bottom: 0.85rem;">${exp.bio || ''}</p>
        
        <div style="font-size: 0.75rem; color: #94a3b8; font-weight: 700; margin-bottom: 0.4rem;">Verified Capabilities:</div>
        <div class="expert-skills-list">
          ${(exp.verifiedCapabilityTopics || []).map(t => `<span class="skill-badge">${t}</span>`).join('')}
        </div>

        <div class="expert-footer-row">
          <span style="font-size: 0.75rem; color: ${exp.availabilityStatus.includes('Available') ? '#34d399' : '#fbbf24'}; font-weight: 700;">
            ● ${exp.availabilityStatus}
          </span>
          <button type="button" class="btn-dx-action primary" onclick="openDXExpertContactModal('${exp.id}')" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;">
            <i class="fa-solid fa-handshake"></i> Consult
          </button>
        </div>
      </div>
    `).join('');
  }

  function openDXExpertContactModal(id) {
    const exp = (DXState.data.dxExperts || []).find(e => e.id === id);
    if (!exp) return;

    const modal = document.getElementById('modal-dx-expert-contact');
    const nameEl = document.getElementById('dx-expert-contact-name');
    if (nameEl) nameEl.textContent = `Consult with ${exp.name} (${exp.role})`;

    if (modal) {
      modal.hidden = false;
      const closeBtn = document.getElementById('btn-close-dx-expert-contact');
      if (closeBtn) closeBtn.onclick = () => modal.hidden = true;
      const cancelBtn = document.getElementById('btn-cancel-dx-expert-req');
      if (cancelBtn) cancelBtn.onclick = () => modal.hidden = true;
    }
  }

  function submitExpertRequest() {
    const modal = document.getElementById('modal-dx-expert-contact');
    if (modal) modal.hidden = true;
    showToast('Consultation request dispatched to expert. You will receive an MS Teams notification.', 'success');
  }
  window.submitExpertRequest = submitExpertRequest;

  // ========================================================
  // RENDER: DX ASSESSMENT & EVIDENCE WORKFLOW
  // ========================================================
  function renderDXAssessment() {
    const container = document.getElementById('dx-assessments-table-container');
    if (!container || !DXState.data) return;

    const assessments = DXState.data.dxAssessments || [];

    container.innerHTML = `
      <div class="dx-matrix-table-wrap">
        <table class="dx-matrix-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Capability Topic</th>
              <th style="text-align: center;">K-S-E-KS</th>
              <th style="text-align: center;">Current / Target</th>
              <th>Evidence Summary</th>
              <th style="text-align: center;">Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${assessments.map(asm => `
              <tr>
                <td><strong>${asm.employeeName}</strong><br><small style="color: #64748b;">${asm.department} · ${asm.role}</small></td>
                <td><strong>${asm.topicName}</strong></td>
                <td style="text-align: center;">${asm.knowledgeLevel}-${asm.skillLevel}-${asm.experienceLevel}-${asm.sharingLevel}</td>
                <td style="text-align: center;">
                  <span class="heatmap-cell-badge lvl-${asm.currentOverallLevel}">L${asm.currentOverallLevel}</span> ➔ 
                  <strong style="color: #00f2fe;">L${asm.targetLevel}</strong>
                </td>
                <td style="font-size: 0.78rem; max-width: 240px;">${asm.evidenceDescription}</td>
                <td style="text-align: center;">
                  <span class="sample-data-badge" style="background: ${asm.reviewStatus === 'Verified' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}; color: ${asm.reviewStatus === 'Verified' ? '#34d399' : '#fbbf24'};">
                    ${asm.reviewStatus}
                  </span>
                </td>
                <td>
                  ${hasDXPermission('VERIFY_EVIDENCE') && asm.reviewStatus !== 'Verified' ? `
                    <button type="button" class="btn-dx-action primary" onclick="verifyDXEvidence('${asm.id}')" style="padding: 0.25rem 0.55rem; font-size: 0.72rem;">
                      <i class="fa-solid fa-check-double"></i> Verify
                    </button>
                  ` : `
                    <span style="font-size: 0.72rem; color: #94a3b8;">${asm.reviewStatus === 'Verified' ? 'Verified by ' + asm.reviewerName : 'Awaiting Reviewer'}</span>
                  `}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function verifyDXEvidence(asmId) {
    const asm = (DXState.data.dxAssessments || []).find(a => a.id === asmId);
    if (!asm) return;

    asm.reviewStatus = 'Verified';
    asm.reviewerName = DXState.currentRole === 'Admin' ? 'DX Administrator' : 'Somchai Prasert (Reviewer)';
    asm.lastReviewDate = new Date().toISOString().slice(0, 10);

    // Record in audit log
    if (DXState.data.dxAuditLog) {
      DXState.data.dxAuditLog.unshift({
        id: 'aud-' + Date.now(),
        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
        user: asm.reviewerName,
        action: 'VERIFY_EVIDENCE',
        entity: 'Assessment',
        targetId: asmId,
        details: `Verified evidence for ${asm.employeeName} on ${asm.topicName}`
      });
    }

    saveDXState();
    showToast(`Assessment for ${asm.employeeName} verified successfully!`, 'success');
    renderDXAssessment();
    updateScreen1DXStats();
  }

  // ========================================================
  // RENDER: DX ANALYTICS
  // ========================================================
  function renderDXAnalytics() {
    if (typeof Chart === 'undefined') return;

    // Destroy existing DX charts to prevent duplicates
    if (DXState.charts.dept) DXState.charts.dept.destroy();
    if (DXState.charts.tech) DXState.charts.tech.destroy();
    if (DXState.charts.radar) DXState.charts.radar.destroy();
    if (DXState.charts.trend) DXState.charts.trend.destroy();

    const ctxDept = document.getElementById('chart-dx-dept');
    if (ctxDept) {
      DXState.charts.dept = new Chart(ctxDept, {
        type: 'bar',
        data: {
          labels: ['PC', 'PE', 'TIE/DX', 'QA/QC', 'WH', 'PD', 'Safety'],
          datasets: [{
            label: 'Projects',
            data: [2, 1, 2, 1, 1, 1, 0],
            backgroundColor: 'rgba(230, 0, 18, 0.75)',
            borderColor: '#ff4d4d',
            borderWidth: 1.5,
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#94a3b8' } },
            y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#94a3b8', stepSize: 1 } }
          }
        }
      });
    }

    const ctxTech = document.getElementById('chart-dx-tech');
    if (ctxTech) {
      DXState.charts.tech = new Chart(ctxTech, {
        type: 'doughnut',
        data: {
          labels: ['Power Apps', 'Power Automate', 'SharePoint', 'Power BI', 'IoT & Edge', 'Copilot AI'],
          datasets: [{
            data: [7, 6, 6, 4, 2, 2],
            backgroundColor: ['#e60012', '#0a84ff', '#00f2fe', '#10b981', '#f59e0b', '#8b5cf6'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'right', labels: { color: '#cbd5e1', font: { size: 10 } } } }
        }
      });
    }

    const ctxRadar = document.getElementById('chart-dx-radar');
    if (ctxRadar) {
      DXState.charts.radar = new Chart(ctxRadar, {
        type: 'radar',
        data: {
          labels: ['1. Knowledge', '2. Hands-on Skill', '3. Real Delivery', '4. Knowledge Sharing'],
          datasets: [
            { label: 'Plant Target', data: [90, 85, 80, 75], borderColor: '#00f2fe', backgroundColor: 'rgba(0, 242, 254, 0.2)' },
            { label: 'Current Verified', data: [82, 78, 72, 64], borderColor: '#e60012', backgroundColor: 'rgba(230, 0, 18, 0.2)' }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: { color: 'rgba(255,255,255,0.1)' },
              grid: { color: 'rgba(255,255,255,0.1)' },
              pointLabels: { color: '#94a3b8', font: { size: 9 } },
              ticks: { display: false }
            }
          },
          plugins: { legend: { position: 'bottom', labels: { color: '#cbd5e1', font: { size: 10 } } } }
        }
      });
    }

    const ctxTrend = document.getElementById('chart-dx-trend');
    if (ctxTrend) {
      DXState.charts.trend = new Chart(ctxTrend, {
        type: 'line',
        data: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q1-26', 'Q2-26'],
          datasets: [{
            data: [4, 7, 11, 14, 16, 18],
            borderColor: '#34d399',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            fill: true,
            tension: 0.35,
            pointBackgroundColor: '#10b981',
            pointRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#94a3b8' } },
            y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#94a3b8' } }
          }
        }
      });
    }
  }

  // ========================================================
  // RENDER: DX GOVERNANCE & FUTURE DATA ARCHITECTURE
  // ========================================================
  function renderDXGovernance() {
    if (!DXState.data) return;

    // Render future entities
    const entWrap = document.getElementById('dx-future-entities-grid');
    if (entWrap && DXState.data.dxFutureEntities) {
      entWrap.innerHTML = DXState.data.dxFutureEntities.map(ent => `
        <div class="dx-category-card">
          <div class="cat-card-header">
            <div class="cat-card-icon" style="background: #003ea8;"><i class="fa-solid fa-table"></i></div>
            <div class="cat-card-title">
              <span class="cat-card-code">FUTURE ENTITY</span>
              <h3>${ent.entityName}</h3>
            </div>
          </div>
          <p class="cat-card-desc">
            <strong>SharePoint:</strong> ${ent.sharePointType}<br>
            <strong>Dataverse:</strong> ${ent.dataverseType}<br>
            <strong>Primary Key:</strong> ${ent.primaryKey}
          </p>
          <div style="font-size: 0.75rem; color: #cbd5e1; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.65rem;">
            <strong>Permissions:</strong> ${ent.permissionConsiderations}
          </div>
        </div>
      `).join('');
    }

    // Render audit log
    const auditTbody = document.getElementById('dx-audit-log-tbody');
    if (auditTbody && DXState.data.dxAuditLog) {
      auditTbody.innerHTML = DXState.data.dxAuditLog.map(log => `
        <tr>
          <td style="font-family: monospace; color: #00f2fe;">${log.timestamp}</td>
          <td><strong>${log.user}</strong></td>
          <td><span class="sample-data-badge">${log.action}</span></td>
          <td>${log.entity}</td>
          <td>${log.details}</td>
        </tr>
      `).join('');
    }
  }

  // ========================================================
  // UNIFIED CREATE & EDIT FORM MODAL
  // ========================================================
  let currentActionType = 'knowledge';

  function openDXActionModal(actionType = 'knowledge') {
    if (!hasDXPermission('ADD_RECORD')) {
      showToast('Viewer role cannot create records. Please switch to Contributor or Reviewer role.', 'error');
      return;
    }

    currentActionType = actionType;
    const modal = document.getElementById('modal-dx-action-form');
    const heading = document.getElementById('dx-form-heading');
    const fieldsWrap = document.getElementById('dx-form-dynamic-fields');

    const titles = {
      'knowledge': 'Add DX Knowledge Record',
      'project': 'Register DX Project',
      'experience': 'Add Project Experience',
      'failure': 'Record Failure Lesson (Blameless Kaizen)',
      'assessment': 'Start Capability Self-Assessment',
      'plan': 'Create Learning Plan'
    };

    if (heading) heading.textContent = titles[actionType] || 'Create DX Record';

    if (fieldsWrap) {
      if (actionType === 'knowledge') {
        fieldsWrap.innerHTML = `
          <div class="form-grid-2">
            <div class="f-group">
              <label>Knowledge Title *</label>
              <input type="text" id="inp-dx-title" required placeholder="e.g. Power Apps Responsive Container Standard" />
            </div>
            <div class="f-group">
              <label>Category *</label>
              <select id="inp-dx-cat" required>
                ${(DXState.data.dxCategories || []).map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="form-grid-2">
            <div class="f-group">
              <label>Knowledge Type *</label>
              <select id="inp-dx-type">
                <option value="SOP">SOP</option>
                <option value="Architecture Pattern">Architecture Pattern</option>
                <option value="Best Practice">Best Practice</option>
                <option value="Standard">Standard</option>
                <option value="Coding Guideline">Coding Guideline</option>
                <option value="Prompt">Prompt</option>
              </select>
            </div>
            <div class="f-group">
              <label>Maturity Level *</label>
              <select id="inp-dx-maturity">
                <option value="Aware">Aware</option>
                <option value="Practitioner">Practitioner</option>
                <option value="Applied">Applied</option>
                <option value="Delivered">Delivered</option>
                <option value="Share & Sustain" selected>Share & Sustain</option>
              </select>
            </div>
          </div>
          <div class="f-group">
            <label>Short Description *</label>
            <textarea id="inp-dx-desc" rows="2" required placeholder="Provide clear summary of this knowledge asset..."></textarea>
          </div>
          <div class="f-group">
            <label>Technical Guidance / Code Snippet</label>
            <textarea id="inp-dx-tech" rows="3" placeholder="Step-by-step instructions or formula syntax..."></textarea>
          </div>
        `;
      } else if (actionType === 'project') {
        fieldsWrap.innerHTML = `
          <div class="form-grid-2">
            <div class="f-group">
              <label>Project Name *</label>
              <input type="text" id="inp-dx-title" required placeholder="e.g. Radiator Line 2 QR Tracking" />
            </div>
            <div class="f-group">
              <label>Department *</label>
              <select id="inp-dx-dept">
                <option value="PC">Production Control (PC)</option>
                <option value="PE">Production Engineering (PE)</option>
                <option value="TIE & DX">TIE & DX</option>
                <option value="QA & QC">QA & QC</option>
                <option value="WH">Warehouse (WH)</option>
                <option value="PD">Production (PD)</option>
              </select>
            </div>
          </div>
          <div class="f-group">
            <label>Project Summary & Business Background *</label>
            <textarea id="inp-dx-desc" rows="2" required placeholder="Describe pain points, manual manhours, and digital solution..."></textarea>
          </div>
          <div class="form-grid-2">
            <div class="f-group">
              <label>Estimated Hours Saved / Month [Sample Data]</label>
              <input type="number" id="inp-dx-hours" value="45" />
            </div>
            <div class="f-group">
              <label>Status *</label>
              <select id="inp-dx-status">
                <option value="In Progress">In Progress</option>
                <option value="Production" selected>Production</option>
              </select>
            </div>
          </div>
        `;
      } else if (actionType === 'experience' || actionType === 'failure') {
        fieldsWrap.innerHTML = `
          <div class="form-grid-2">
            <div class="f-group">
              <label>Title *</label>
              <input type="text" id="inp-dx-title" required placeholder="e.g. Resolving Flow Delegation Glitch" />
            </div>
            <div class="f-group">
              <label>Experience Type *</label>
              <select id="inp-dx-exp-type">
                <option value="Problem-Solving Experience" ${actionType === 'experience' ? 'selected' : ''}>Problem-Solving</option>
                <option value="Failure Lesson" ${actionType === 'failure' ? 'selected' : ''}>Failure Lesson (Blameless Kaizen)</option>
                <option value="Implementation Experience">Implementation</option>
                <option value="Integration Experience">Integration</option>
              </select>
            </div>
          </div>
          <div class="f-group">
            <label>Situation & What Was Attempted *</label>
            <textarea id="inp-dx-desc" rows="2" required placeholder="Describe what you were trying to accomplish..."></textarea>
          </div>
          <div class="f-group">
            <label>Root Cause & Permanent Prevention Lesson *</label>
            <textarea id="inp-dx-tech" rows="2" required placeholder="What was the underlying systemic issue and what should be standardized?"></textarea>
          </div>
        `;
      } else if (actionType === 'assessment') {
        fieldsWrap.innerHTML = `
          <div class="form-grid-2">
            <div class="f-group">
              <label>Your Name & Department *</label>
              <input type="text" id="inp-dx-user" required value="Ananya Kasem (TIE & DX)" />
            </div>
            <div class="f-group">
              <label>Select Capability Topic *</label>
              <select id="inp-dx-topic">
                ${(DXState.data.dxTopics || []).map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
              </select>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin-bottom: 1rem;">
            <div><label style="font-size: 0.72rem;">1. Knowledge</label><input type="number" id="inp-lvl-k" min="0" max="5" value="3" class="dx-select-control" style="width: 100%;" /></div>
            <div><label style="font-size: 0.72rem;">2. Skill</label><input type="number" id="inp-lvl-s" min="0" max="5" value="3" class="dx-select-control" style="width: 100%;" /></div>
            <div><label style="font-size: 0.72rem;">3. Experience</label><input type="number" id="inp-lvl-e" min="0" max="5" value="2" class="dx-select-control" style="width: 100%;" /></div>
            <div><label style="font-size: 0.72rem;">4. Sharing</label><input type="number" id="inp-lvl-sh" min="0" max="5" value="2" class="dx-select-control" style="width: 100%;" /></div>
          </div>
          <div class="f-group">
            <label>Attached Evidence Summary & Project Artifact *</label>
            <textarea id="inp-dx-desc" rows="2" required placeholder="Reference production solution, training completion, or SOP link..."></textarea>
          </div>
        `;
      } else {
        fieldsWrap.innerHTML = `
          <div class="f-group">
            <label>Plan Title *</label>
            <input type="text" id="inp-dx-title" required placeholder="e.g. Citizen Developer Level 4 Development Plan" />
          </div>
          <div class="f-group">
            <label>Target Capability Goals *</label>
            <textarea id="inp-dx-desc" rows="3" required placeholder="Outline target learning modules and real-work challenge..."></textarea>
          </div>
        `;
      }
    }

    if (modal) {
      modal.hidden = false;
      const closeBtn = document.getElementById('btn-close-dx-action-form');
      if (closeBtn) closeBtn.onclick = () => modal.hidden = true;
      const cancelBtn = document.getElementById('btn-cancel-dx-form');
      if (cancelBtn) cancelBtn.onclick = () => modal.hidden = true;
    }
  }
  window.openDXActionModal = openDXActionModal;

  function initDXActionForm() {
    const form = document.getElementById('dx-record-management-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      saveDXFormData();
    });

    const topAddBtn = document.getElementById('btn-top-add-dx');
    if (topAddBtn) {
      topAddBtn.addEventListener('click', () => {
        openDXActionModal('knowledge');
      });
    }
  }

  function saveDXFormData() {
    const modal = document.getElementById('modal-dx-action-form');
    const title = document.getElementById('inp-dx-title')?.value || 'New Submission';
    const desc = document.getElementById('inp-dx-desc')?.value || '';
    const tech = document.getElementById('inp-dx-tech')?.value || '';

    const newId = 'rec-' + Date.now();
    const today = new Date().toISOString().slice(0, 10);

    if (currentActionType === 'knowledge') {
      const cat = document.getElementById('inp-dx-cat')?.value || 'cat-b';
      const type = document.getElementById('inp-dx-type')?.value || 'SOP';
      const maturity = document.getElementById('inp-dx-maturity')?.value || 'Applied';

      DXState.data.dxKnowledge.unshift({
        id: newId,
        title,
        categoryId: cat,
        knowledgeType: type,
        maturityLevel: maturity,
        shortDescription: desc,
        explanation: desc,
        technicalDetails: tech,
        owner: 'Current User',
        department: 'TIE & DX',
        updatedDate: today,
        verified: true,
        verificationStatus: 'Submitted Draft',
        technologies: ['Power Platform', 'Citizen Development']
      });

      showToast(`Knowledge "${title}" registered successfully!`, 'success');
      switchDXView('dx-knowledge');
    } else if (currentActionType === 'project') {
      const dept = document.getElementById('inp-dx-dept')?.value || 'PE';
      const hours = parseInt(document.getElementById('inp-dx-hours')?.value || '40', 10);

      DXState.data.dxProjects.unshift({
        id: newId,
        name: title,
        department: dept,
        summary: desc,
        hoursSaved: hours,
        status: 'Production',
        owner: 'Current User',
        deploymentDate: today,
        docCompleteness: '90%',
        techUsed: ['Power Apps', 'Power Automate']
      });

      showToast(`Project "${title}" registered successfully!`, 'success');
      switchDXView('dx-projects');
    } else if (currentActionType === 'experience' || currentActionType === 'failure') {
      const expType = document.getElementById('inp-dx-exp-type')?.value || 'Problem-Solving Experience';

      DXState.data.dxExperiences.unshift({
        id: newId,
        title,
        experienceType: expType,
        situation: desc,
        learning: tech,
        contributor: 'Current User',
        department: 'TIE & DX',
        project: 'Genba Kaizen',
        date: today
      });

      showToast(`Experience "${title}" added successfully!`, 'success');
      switchDXView('dx-experience');
    } else if (currentActionType === 'assessment') {
      const topicId = document.getElementById('inp-dx-topic')?.value || 'top-pa-canvas';
      const topic = (DXState.data.dxTopics || []).find(t => t.id === topicId);
      const k = parseInt(document.getElementById('inp-lvl-k')?.value || '3', 10);
      const s = parseInt(document.getElementById('inp-lvl-s')?.value || '3', 10);
      const e = parseInt(document.getElementById('inp-lvl-e')?.value || '2', 10);
      const sh = parseInt(document.getElementById('inp-lvl-sh')?.value || '2', 10);

      DXState.data.dxAssessments.unshift({
        id: 'asm-' + Date.now(),
        employeeId: 'EMP-CURRENT',
        employeeName: 'Current User',
        role: 'Citizen Developer',
        department: 'TIE & DX',
        topicId: topicId,
        topicName: topic ? topic.name : 'Capability Topic',
        knowledgeLevel: k,
        skillLevel: s,
        experienceLevel: e,
        sharingLevel: sh,
        currentOverallLevel: Math.round((k + s + e + sh) / 4),
        targetLevel: 4,
        evidenceDescription: desc,
        reviewStatus: 'Submitted',
        reviewerName: 'Pending Review'
      });

      showToast('Capability assessment submitted for review!', 'success');
      switchDXView('dx-assessment');
    }

    // Record audit log
    if (DXState.data.dxAuditLog) {
      DXState.data.dxAuditLog.unshift({
        id: 'aud-' + Date.now(),
        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
        user: 'Current User',
        action: 'CREATE_RECORD',
        entity: currentActionType.toUpperCase(),
        targetId: newId,
        details: `Created ${currentActionType}: ${title}`
      });
    }

    saveDXState();
    updateScreen1DXStats();
    if (modal) modal.hidden = true;
  }

  // ========================================================
  // UNIFIED GLOBAL SEARCH
  // ========================================================
  function initDXGlobalSearch() {
    const topBtn = document.getElementById('btn-top-global-search');
    const modal = document.getElementById('modal-dx-global-search');
    const input = document.getElementById('dx-global-search-input');
    const closeBtn = document.getElementById('btn-close-dx-search-modal');

    if (topBtn && modal) {
      topBtn.addEventListener('click', () => {
        modal.hidden = false;
        if (input) {
          input.value = '';
          input.focus();
        }
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => modal.hidden = true);
    }

    if (input) {
      input.addEventListener('input', debounce(performGlobalUnifiedSearch, 200));
    }
  }

  function performGlobalUnifiedSearch() {
    const input = document.getElementById('dx-global-search-input');
    const panel = document.getElementById('dx-global-search-results-panel');
    if (!input || !panel) return;

    const q = input.value.toLowerCase().trim();
    if (!q || q.length < 2) {
      panel.innerHTML = '<p style="color: #94a3b8; font-size: 0.85rem; text-align: center;">Type at least 2 characters to search across Quality and DX repositories...</p>';
      return;
    }

    // 1. Search Quality Defects
    const defects = (AppState.defects || []).filter(d => 
      (d.title + ' ' + d.product + ' ' + d.occurrence + ' ' + (d.countermeasure || '')).toLowerCase().includes(q)
    );

    // 2. Search Quality Knowledge
    const qKnowledge = (AppState.knowledge || []).filter(k => 
      (k.title + ' ' + k.category + ' ' + k.desc).toLowerCase().includes(q)
    );

    // 3. Search DX Knowledge
    const dxKno = (DXState.data?.dxKnowledge || []).filter(k => 
      (k.title + ' ' + k.shortDescription + ' ' + (k.technologies || []).join(' ')).toLowerCase().includes(q)
    );

    // 4. Search DX Projects
    const dxPrj = (DXState.data?.dxProjects || []).filter(p => 
      (p.name + ' ' + p.summary + ' ' + p.department).toLowerCase().includes(q)
    );

    // 5. Search DX Experiences
    const dxExp = (DXState.data?.dxExperiences || []).filter(e => 
      (e.title + ' ' + e.situation + ' ' + e.learning).toLowerCase().includes(q)
    );

    // 6. Search DX Experts
    const dxExpList = (DXState.data?.dxExperts || []).filter(e => 
      (e.name + ' ' + e.role + ' ' + (e.verifiedCapabilityTopics || []).join(' ')).toLowerCase().includes(q)
    );

    const totalMatches = defects.length + qKnowledge.length + dxKno.length + dxPrj.length + dxExp.length + dxExpList.length;

    if (totalMatches === 0) {
      panel.innerHTML = `<p style="color: #94a3b8; font-size: 0.85rem; text-align: center;">No matching records found for "<strong style="color: #ffffff;">${q}</strong>". Try a broader keyword.</p>`;
      return;
    }

    let out = `<p style="color: #38bdf8; font-size: 0.78rem; font-weight: 700; margin-bottom: 0.75rem;">Found ${totalMatches} result(s) across corporate repositories:</p>`;

    // Group 1: DX Knowledge
    if (dxKno.length > 0) {
      out += '<div class="search-results-group-title"><i class="fa-solid fa-book-bookmark"></i> DX Knowledge Standards (' + dxKno.length + ')</div>';
      dxKno.forEach(k => {
        out += `
          <div class="activity-item-row" style="cursor: pointer; margin-bottom: 0.4rem;" onclick="document.getElementById('modal-dx-global-search').hidden=true; switchToWorkspace('dx'); openDXKnowledgeDetailModal('${k.id}');">
            <span class="act-type-badge act-type-kno">${k.knowledgeType}</span>
            <div class="act-text">
              <strong style="color: #ffffff;">${highlightMatch(k.title, q)}</strong><br>
              <small style="color: #94a3b8;">${highlightMatch(k.shortDescription.slice(0, 100), q)}...</small>
            </div>
            <i class="fa-solid fa-arrow-right text-cyan"></i>
          </div>
        `;
      });
    }

    // Group 2: DX Projects
    if (dxPrj.length > 0) {
      out += '<div class="search-results-group-title"><i class="fa-solid fa-diagram-project"></i> Production Projects (' + dxPrj.length + ')</div>';
      dxPrj.forEach(p => {
        out += `
          <div class="activity-item-row" style="cursor: pointer; margin-bottom: 0.4rem;" onclick="document.getElementById('modal-dx-global-search').hidden=true; switchToWorkspace('dx'); openDXProjectDetailModal('${p.id}');">
            <span class="act-type-badge act-type-prj">${p.department}</span>
            <div class="act-text">
              <strong style="color: #ffffff;">${highlightMatch(p.name, q)}</strong><br>
              <small style="color: #94a3b8;">${highlightMatch(p.summary.slice(0, 100), q)}...</small>
            </div>
            <i class="fa-solid fa-arrow-right text-red"></i>
          </div>
        `;
      });
    }

    // Group 3: Quality Defect Cases
    if (defects.length > 0) {
      out += '<div class="search-results-group-title"><i class="fa-solid fa-screwdriver-wrench"></i> Quality Troubleshooting Cases (' + defects.length + ')</div>';
      defects.forEach(d => {
        out += `
          <div class="activity-item-row" style="cursor: pointer; margin-bottom: 0.4rem;" onclick="document.getElementById('modal-dx-global-search').hidden=true; switchToWorkspace('quality'); switchScreen('screen-2'); openPdfModal('${d.id}');">
            <span class="act-type-badge act-type-prj">${d.product}</span>
            <div class="act-text">
              <strong style="color: #ffffff;">${highlightMatch(d.title, q)}</strong><br>
              <small style="color: #94a3b8;">${highlightMatch((d.occurrence || '').slice(0, 100), q)}...</small>
            </div>
            <i class="fa-solid fa-file-pdf text-red"></i>
          </div>
        `;
      });
    }

    // Group 4: Experts
    if (dxExpList.length > 0) {
      out += '<div class="search-results-group-title"><i class="fa-solid fa-user-tie"></i> Domain Experts (' + dxExpList.length + ')</div>';
      dxExpList.forEach(e => {
        out += `
          <div class="activity-item-row" style="cursor: pointer; margin-bottom: 0.4rem;" onclick="document.getElementById('modal-dx-global-search').hidden=true; switchToWorkspace('dx'); switchDXView('dx-experts');">
            <span class="act-type-badge act-type-asm">${e.department}</span>
            <div class="act-text">
              <strong style="color: #ffffff;">${highlightMatch(e.name, q)}</strong> — ${e.role}
            </div>
            <i class="fa-solid fa-handshake text-blue"></i>
          </div>
        `;
      });
    }

    panel.innerHTML = out;
  }

  function highlightMatch(text, query) {
    if (!text) return '';
    const idx = text.toLowerCase().indexOf(query);
    if (idx === -1) return text;
    return text.substring(0, idx) + '<span class="search-match-highlight">' + text.substring(idx, idx + query.length) + '</span>' + text.substring(idx + query.length);
  }

  function debounce(fn, wait) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  // Bind to DOM ready
  const existingDomReady = document.readyState;
  if (existingDomReady === 'complete' || existingDomReady === 'interactive') {
    initDXModule();
  } else {
    document.addEventListener('DOMContentLoaded', initDXModule);
  }

  // Global Exports
  window.switchToWorkspace = switchToWorkspace;
  window.switchDXView = switchDXView;
  window.filterDXOverviewByDim = filterDXOverviewByDim;
  window.filterDXKnowledgeByCategory = filterDXKnowledgeByCategory;
  window.openDXKnowledgeDetailModal = openDXKnowledgeDetailModal;
  window.openDXProjectDetailModal = openDXProjectDetailModal;
  window.openDXExperienceDetailModal = openDXExperienceDetailModal;
  window.openDXMatrixCellModal = openDXMatrixCellModal;
  window.openDXExpertContactModal = openDXExpertContactModal;
  window.verifyDXEvidence = verifyDXEvidence;
  window.toggleDXBookmark = toggleDXBookmark;
  window.enrollLearningPath = enrollLearningPath;
  window.resetDemoData = resetDemoData;
  window.exportMatrixToCSV = exportMatrixToCSV;


  window.showToast = showToast;

})();
