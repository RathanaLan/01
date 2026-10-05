const project = {
      name: "Daily Job Management Application",
      category: "Manufacturing Operations · Digital Transformation",
      year: "2026",
      status: "Production",
      owner: {
        name: "Rathana Lan",
        title: "Digital Transformation Supervisor",
        company: "DENSO Cambodia",
        role: "Solution Owner"
      },
      images: {
        dashboard: "839aeded49.png",
        approval: "a60da40e94.png",
        analytics: "9f59f2dae3.png",
        ecosystem: "937ae6c081.png"
      },
      problem: "Manual paper and disconnected spreadsheet workflows produced communication delays, clerical repetition, slow approval turnaround, and poor operational visibility across manufacturing shifts.",
      objective: "Eliminate administrative waste and transform daily manufacturing job execution into a connected, automated, and decision-ready digital ecosystem using Microsoft Power Platform.",
      beforeProcess: [
        { title: "Manual Capture", desc: "Operators filled paper clipboards and handwritten checksheets at line stations." },
        { title: "Slow Approval", desc: "Physical sign-off requests sat in physical in-trays or waited for supervisor presence." },
        { title: "Scattered Data", desc: "Records isolated in local Excel workbooks with no relational integrity or sync." },
        { title: "Delayed Visibility", desc: "Management only saw yesterday's issues after shift wrap-up and data collation." },
        { title: "Reactive Control", desc: "Issues addressed only after line stoppages or quality anomalies escalated." }
      ],
      afterProcess: [
        { title: "Digital Capture", desc: "Operators log validated jobs via responsive, ergonomic Power Apps interfaces." },
        { title: "Automated Approval", desc: "Instant Power Automate push routing and escalation directly to supervisors." },
        { title: "Controlled Data", desc: "Single source of truth in secure SharePoint architecture with strict schema." },
        { title: "Real-time Visibility", desc: "Live Power BI dashboards and line-side telemetry accessible anywhere, instantly." },
        { title: "Proactive Control", desc: "Automated alerts and exception tracking enable early intervention before disruption." }
      ],
      features: [
        {
          title: "Command Center",
          imgKey: "dashboard",
          subtitle: "Role-Based Daily Operation Overview",
          badge: "Shopfloor Operations",
          description: "Empowers supervisors and line operators with a unified overview of shift assignments, priority workloads, line statuses, and pending actions in a single pane of glass.",
          points: [
            "Role-tailored views for operators, team leaders, and engineers",
            "Live status badges and priority queue sorting",
            "Visual indicators for line abnormalities and urgent escalations",
            "Integrated genba action log with real-time sync"
          ]
        },
        {
          title: "Digital Approval Center",
          imgKey: "approval",
          subtitle: "Guided Submission & Multi-Tier Routing",
          badge: "Workflow Automation",
          description: "Replaces lost paper routing slips with an automated, auditable approval pipeline that guides users step-by-step through verified data submission.",
          points: [
            "Validated inputs eliminating missing fields and syntax errors",
            "QR-assisted station and machine identification",
            "Automated multi-stage approval routing via Power Automate",
            "Complete audit trail with timestamps, comments, and decision history"
          ]
        },
        {
          title: "Executive Manufacturing Analytics",
          imgKey: "analytics",
          subtitle: "Decision-Ready Operational Insights",
          badge: "Executive Intelligence",
          description: "Transforms captured operational transactions into high-density management intelligence, surfacing productivity trends, line bottlenecks, and Kaizen opportunities.",
          points: [
            "Automated calculation of man-hour savings and cycle efficiencies",
            "Granular trend analysis across shifts, lines, and part families",
            "Bottleneck discovery pinpointing idle waiting and clerical lag",
            "Instant exportable reports for plant executive reviews"
          ]
        }
      ],
      benefits: [
        { title: "Elimination of Redundant Work", desc: "Captured once at the source; zero manual re-entry into secondary spreadsheets." },
        { title: "Auditable Governance", desc: "100% digital trace of who submitted, approved, and modified every job." },
        { title: "Faster Shift Handovers", desc: "Incoming shift leaders review live status in seconds rather than verbal briefings." },
        { title: "Kaizen Foundation", desc: "Standardized operational data provides ground truth for continuous productivity gains." }
      ],
      kpis: [
        { id: "efficiency", value: 83, suffix: "%", label: "Faster Processing Time", sub: "From 30 mins to 5 mins per cycle", highlight: true },
        { id: "users", value: 120, suffix: "+", label: "Active Factory Users", sub: "Operators, leaders & engineers across shifts" },
        { id: "transactions", value: 8500, suffix: "+", label: "Digital Transactions", sub: "Processed through system pipelines" },
        { id: "hours", value: 1250, suffix: "+", label: "Man-Hours Saved", sub: "Cumulative administrative time returned to genba" },
        { id: "forms", value: 6200, suffix: "+", label: "Forms Submitted", sub: "Zero lost sheets or illegible handwriting" },
        { id: "approvals", value: 3100, suffix: "+", label: "Approval Requests", sub: "Automated routing with zero physical in-tray lag" }
      ],
      technologies: [
        { name: "Factory Users", role: "Shopfloor Frontline", purpose: "Execute daily manufacturing jobs, report shift events, and submit work requests with zero paper friction." },
        { name: "Power Apps", role: "Ergonomic UI Layer", purpose: "Provide fast, responsive, error-proofed mobile and desktop interfaces tailored for manufacturing genba conditions." },
        { name: "SharePoint", role: "Structured Cloud Store", purpose: "Serve as the reliable, auditable cloud repository maintaining relational integrity, access rules, and versioning." },
        { name: "Power Automate", role: "Event-Driven Orchestrator", purpose: "Trigger instant approval workflows, multi-tier escalations, reminders, and cross-system notifications." },
        { name: "Power BI", role: "Analytics Engine", purpose: "Aggregate live transaction logs into interactive executive charts, trend models, and shift performance dashboards." },
        { name: "Management Insight", role: "Strategic Decision Layer", purpose: "Equip Factory Managers and Directors with live operational facts to guide labor balancing and root-cause decisions." },
        { name: "Email & Notifications", role: "Closed-Loop Communications", purpose: "Deliver contextual alerts via Microsoft Teams and Outlook to ensure zero request stalling or missed deadlines." }
      ],
      responsibilities: [
        { title: "Requirement Analysis", desc: "Conducted deep genba observations to uncover frontline operator friction and administrative bottlenecks." },
        { title: "Process Mapping", desc: "Designed standardized value stream maps to eliminate redundant sign-offs and paper handoffs." },
        { title: "UX Design", desc: "Engineered intuitive, high-contrast, touch-optimized user interfaces tailored for factory floor lighting and glove use." },
        { title: "Data Model Design", desc: "Structured normalized relational lists with strict validation rules, indices, and audit logging." },
        { title: "Power Platform Development", desc: "Programmed robust canvas app components, complex Power Fx logic, and state management." },
        { title: "Workflow Automation", desc: "Constructed multi-stage cloud flows with conditional branching, parallel approvals, and auto-reminders." },
        { title: "Testing & QA", desc: "Executed rigorous shift simulation tests, edge-case validation, and performance stress checks." },
        { title: "Deployment", desc: "Managed phased production rollouts across manufacturing lines with minimal shift disruption." },
        { title: "User Training", desc: "Authored bilingual visual standard operating procedures (SOPs) and conducted interactive training clinics." },
        { title: "User Support", desc: "Provided dedicated on-site support and established rapid feedback channels for operators." },
        { title: "Change Management", desc: "Cultivated a culture of digital trust, turning skeptical operators into enthusiastic digital champions." },
        { title: "Continuous Kaizen", desc: "Analyzed operational usage patterns to deliver incremental monthly enhancements and optimizations." }
      ],
      developmentJourney: [
        { phase: "01", name: "Idea", desc: "Identified severe administrative latency during daily shift handovers." },
        { phase: "02", name: "Requirement Gathering", desc: "Interviewed shopfloor operators, line supervisors, and section managers." },
        { phase: "03", name: "Process Analysis", desc: "Mapped end-to-end task flows, identifying 25 minutes of pure waiting waste." },
        { phase: "04", name: "UX & Solution Design", desc: "Prototyped high-contrast UI screens and validated them directly with operators." },
        { phase: "05", name: "Development", desc: "Engineered full Power Apps interface, SharePoint schemas, and Automate pipelines." },
        { phase: "06", name: "Testing", desc: "Ran dual-run trials on pilot lines to verify data accuracy and response speed." },
        { phase: "07", name: "Deployment", desc: "Rolled out to active production with role-based security configurations." },
        { phase: "08", name: "User Training", desc: "Delivered genba coaching sessions and quick-reference visual guides." },
        { phase: "09", name: "Support", desc: "Maintained sub-15-minute response times for frontline questions." },
        { phase: "10", name: "Continuous Improvement", desc: "Iterated monthly updates based on user feedback and changing line demands." }
      ],
      managementValue: [
        { level: "Operator", focus: "Frontline Simplicity", benefit: "Intuitive touch inputs, zero paper handwriting, error prevention, and immediate task status clarity." },
        { level: "Team Leader", focus: "Shift Control", benefit: "Real-time task visibility, automated queue prioritization, and instant notification of line abnormalities." },
        { level: "Engineer", focus: "Technical Integrity", benefit: "Structured, analysis-ready historical datasets, eliminating manual logging and enabling root-cause diagnostics." },
        { level: "Manager", focus: "Operational Velocity", benefit: "Live dashboard overview across all lines, early escalation of bottlenecks, and elimination of retrospective reporting." },
        { level: "Plant Director", focus: "Strategic Scalability", benefit: "Proven ROI with 83% speed enhancement, robust governance, cultural digital adoption, and Smart Factory readiness." }
      ],
      roadmap: [
        { phase: "Now", title: "Connected Workflow", status: "Completed Capability", desc: "Standardized digital job forms, automated multi-tier approval routing, single source of truth database, and real-time Power BI reporting.", tags: ["Power Apps", "Power Automate", "SharePoint", "Production Live"] },
        { phase: "Next", title: "Optimization & Governance", status: "Current Optimization", desc: "Cross-line process standardization, automated anomaly escalation rules, telemetry auditing, and system performance fine-tuning.", tags: ["Governance", "SOP Scaling", "Audit Logging"] },
        { phase: "Future", title: "AI Assistance", status: "Planned Capability", desc: "Machine-learning assisted defect and job classification, predictive cycle time estimations, and automated natural language summary reports.", tags: ["AI Builder", "Predictive Genba", "NLP Summaries"] },
        { phase: "Vision", title: "Smart Factory Integration", status: "Long-Term Vision", desc: "Direct IoT machine controller connectivity, closed-loop MES/ERP synchronization, and self-optimizing manufacturing line orchestration.", tags: ["IoT Sensors", "MES Sync", "Smart Factory"] }
      ]
    };

    function initDynamicContent() {
      const beforeList = document.getElementById("beforeProcessList");
      if (beforeList) {
        beforeList.innerHTML = project.beforeProcess.map(item => `
          <li class="compare-item">
            <div class="compare-icon icon-fail" aria-hidden="true">✕</div>
            <div class="compare-text">
              <strong>${item.title}</strong>
              <span>${item.desc}</span>
            </div>
          </li>
        `).join("");
      }

      const afterList = document.getElementById("afterProcessList");
      if (afterList) {
        afterList.innerHTML = project.afterProcess.map(item => `
          <li class="compare-item">
            <div class="compare-icon icon-pass" aria-hidden="true">✓</div>
            <div class="compare-text">
              <strong>${item.title}</strong>
              <span>${item.desc}</span>
            </div>
          </li>
        `).join("");
      }

      const showcaseContainer = document.getElementById("productShowcaseContainer");
      if (showcaseContainer) {
        showcaseContainer.innerHTML = project.features.map((feat, idx) => {
          const isRev = idx % 2 === 1 ? "reversed" : "";
          const imgSrc = project.images[feat.imgKey] || "";
          return `
            <article class="product-scene ${isRev} reveal" id="product-${idx}">
              <div class="product-visual-frame" onclick="openImageModal('${imgSrc}', '${feat.title}', '${feat.subtitle}')" tabindex="0" role="button" aria-label="Expand ${feat.title} screenshot">
                <div class="device-titlebar">
                  <span class="window-dot dot-r"></span>
                  <span class="window-dot dot-y"></span>
                  <span class="window-dot dot-g"></span>
                  <span style="font-size:11px;color:var(--text-muted);margin-left:6px;">Daily Job Management · ${feat.badge}</span>
                </div>
                <img 
                  src="${imgSrc}" 
                  alt="${feat.title} - ${feat.subtitle}" 
                  class="product-img" 
                  loading="lazy" 
                  decoding="async"
                  onerror="handleImageFallback(this, '${feat.title}', '${feat.badge}')"
                />
              </div>

              <div class="product-info-panel">
                <span class="eyebrow eyebrow-mint">${feat.badge}</span>
                <h3>${feat.title}</h3>
                <div class="product-tagline">${feat.subtitle}</div>
                <p class="product-desc">${feat.description}</p>
                <ul class="feature-points">
                  ${feat.points.map(pt => `
                    <li class="feature-point">
                      <span class="feature-bullet" aria-hidden="true"></span>
                      <span>${pt}</span>
                    </li>
                  `).join("")}
                </ul>
              </div>
            </article>
          `;
        }).join("");
      }

      const kpiSecGrid = document.getElementById("kpiSecondaryGrid");
      if (kpiSecGrid) {
        const secondaries = project.kpis.filter(k => k.id !== "efficiency");
        kpiSecGrid.innerHTML = secondaries.map(k => `
          <div class="kpi-mini-card">
            <span class="kpi-num" data-target="${k.value}" data-suffix="${k.suffix}">${k.value.toLocaleString()}${k.suffix}</span>
            <span class="kpi-lbl">${k.label}</span>
            <span class="kpi-sub">${k.sub}</span>
          </div>
        `).join("");
      }

      const valueChainTrack = document.getElementById("valueChainTrack");
      if (valueChainTrack) {
        valueChainTrack.innerHTML = project.managementValue.map((item, idx) => `
          <div class="chain-card">
            <div>
              <div class="chain-level">
                <span>Tier 0${idx + 1}</span>
                <span>·</span>
                <span>${item.level}</span>
              </div>
              <h4>${item.focus}</h4>
              <p>${item.benefit}</p>
            </div>
            <div class="chain-footer">Target Impact Verified</div>
          </div>
        `).join("");
      }

      const respGrid = document.getElementById("respGrid");
      if (respGrid) {
        respGrid.innerHTML = project.responsibilities.map((r, idx) => `
          <div class="resp-card">
            <span class="resp-num">0${idx + 1 < 10 ? "0" + (idx + 1) : idx + 1}</span>
            <div class="resp-title">${r.title}</div>
            <div class="resp-desc">${r.desc}</div>
          </div>
        `).join("");
      }

      const projectTimeline = document.getElementById("projectTimeline");
      if (projectTimeline) {
        projectTimeline.innerHTML = project.developmentJourney.map(step => `
          <div class="timeline-step">
            <div class="timeline-node">${step.phase}</div>
            <div class="timeline-body">
              <h4>${step.name}</h4>
              <p>${step.desc}</p>
            </div>
          </div>
        `).join("");
      }

      const roadmapGrid = document.getElementById("roadmapGrid");
      if (roadmapGrid) {
        roadmapGrid.innerHTML = project.roadmap.map(rm => `
          <div class="roadmap-card phase-${rm.phase.toLowerCase()}">
            <div class="roadmap-phase-header">
              <span class="phase-badge">${rm.phase} · ${rm.status}</span>
              <h4>${rm.title}</h4>
            </div>
            <p>${rm.desc}</p>
            <div class="phase-tech-tags">
              ${rm.tags.map(t => `<span class="phase-tag">${t}</span>`).join("")}
            </div>
          </div>
        `).join("");
      }

      const ecoImg = document.getElementById("ecosystemImage");
      if (ecoImg) {
        ecoImg.onerror = function() {
          handleImageFallback(this, "Connected Ecosystem Architecture", "Smart Factory Framework");
        };
      }
    }

    function handleImageFallback(imgEl, title, badge) {
      const svgFallback = document.createElement("div");
      svgFallback.className = "image-fallback-svg-wrapper";
      svgFallback.innerHTML = `
        <svg viewBox="0 0 800 480" width="100%" height="100%" style="background:#07111B;border-radius:12px;display:block;" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bgGrad_${badge.replace(/\s+/g, '_')}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#07111B"/>
              <stop offset="100%" stop-color="#0A1826"/>
            </linearGradient>
            <linearGradient id="glowG_${badge.replace(/\s+/g, '_')}" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#63E8FF"/>
              <stop offset="100%" stop-color="#64F4BD"/>
            </linearGradient>
          </defs>
          <rect width="800" height="480" fill="url(#bgGrad_${badge.replace(/\s+/g, '_')})"/>
          <rect x="40" y="40" width="720" height="400" rx="10" fill="#0C1826" stroke="rgba(158, 205, 255, 0.2)" stroke-width="1.5"/>
          <line x1="40" y1="90" x2="760" y2="90" stroke="rgba(158, 205, 255, 0.15)" stroke-width="1"/>
          <rect x="65" y="60" width="140" height="18" rx="9" fill="rgba(99, 232, 255, 0.15)" stroke="#63E8FF" stroke-width="1"/>
          <text x="135" y="73" text-anchor="middle" font-size="11" fill="#63E8FF" font-family="sans-serif" font-weight="700">${badge}</text>
          <rect x="220" y="60" width="100" height="18" rx="9" fill="rgba(100, 244, 189, 0.15)"/>
          <text x="270" y="73" text-anchor="middle" font-size="11" fill="#64F4BD" font-family="sans-serif">Live in Production</text>
          
          <rect x="65" y="115" width="220" height="140" rx="8" fill="rgba(7, 17, 27, 0.7)" stroke="rgba(158, 205, 255, 0.1)"/>
          <line x1="85" y1="145" x2="265" y2="145" stroke="rgba(255, 255, 255, 0.1)"/>
          <line x1="85" y1="175" x2="265" y2="175" stroke="rgba(255, 255, 255, 0.1)"/>
          <line x1="85" y1="205" x2="265" y2="205" stroke="rgba(255, 255, 255, 0.1)"/>
          <text x="85" y="135" font-size="12" fill="#FFE28A" font-family="sans-serif" font-weight="700">Metric Telemetry</text>

          <rect x="310" y="115" width="425" height="140" rx="8" fill="rgba(7, 17, 27, 0.7)" stroke="rgba(158, 205, 255, 0.1)"/>
          <path d="M 330 220 Q 420 130 520 180 T 710 140" fill="none" stroke="url(#glowG_${badge.replace(/\s+/g, '_')})" stroke-width="3"/>
          <text x="330" y="135" font-size="12" fill="#63E8FF" font-family="sans-serif" font-weight="700">Cycle Time Velocity (30m → 5m)</text>

          <rect x="65" y="275" width="320" height="140" rx="8" fill="rgba(7, 17, 27, 0.7)" stroke="rgba(158, 205, 255, 0.1)"/>
          <text x="85" y="300" font-size="12" fill="#64F4BD" font-family="sans-serif" font-weight="700">Workflow Automation Engine</text>
          <rect x="85" y="320" width="180" height="12" rx="6" fill="rgba(100, 244, 189, 0.25)"/>
          <rect x="85" y="342" width="240" height="10" rx="5" fill="rgba(255, 255, 255, 0.1)"/>
          <rect x="85" y="362" width="200" height="10" rx="5" fill="rgba(255, 255, 255, 0.1)"/>

          <rect x="410" y="275" width="325" height="140" rx="8" fill="rgba(7, 17, 27, 0.7)" stroke="rgba(158, 205, 255, 0.1)"/>
          <text x="430" y="300" font-size="12" fill="#63E8FF" font-family="sans-serif" font-weight="700">Central SharePoint Store</text>
          <rect x="430" y="320" width="200" height="12" rx="6" fill="rgba(99, 232, 255, 0.25)"/>
          <rect x="430" y="342" width="260" height="10" rx="5" fill="rgba(255, 255, 255, 0.1)"/>
          <rect x="430" y="362" width="220" height="10" rx="5" fill="rgba(255, 255, 255, 0.1)"/>

          <text x="400" y="465" text-anchor="middle" font-size="14" fill="#F8FBFF" font-family="sans-serif" font-weight="800">${title}</text>
        </svg>
      `;
      imgEl.replaceWith(svgFallback);
    }

    function setupScrollProgress() {
      const progressBar = document.getElementById("progressBar");
      window.addEventListener("scroll", () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / docHeight) * 100;
        if (progressBar) {
          progressBar.style.width = Math.min(Math.max(scrolled, 0), 100) + "%";
        }
        const topBtn = document.getElementById("scrollTopBtn");
        if (topBtn) {
          if (window.scrollY > 400) {
            topBtn.classList.add("visible");
          } else {
            topBtn.classList.remove("visible");
          }
        }
      }, { passive: true });

      const topBtn = document.getElementById("scrollTopBtn");
      if (topBtn) {
        topBtn.addEventListener("click", () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      }
    }

    function setupNavigation() {
      const navLinks = document.querySelectorAll(".nav-link");
      const sections = document.querySelectorAll("section[id]");

      window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
          const sectionTop = section.offsetTop - 140;
          if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
          }
        });

        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
          }
        });
      }, { passive: true });

      const menuBtn = document.getElementById("mobileMenuBtn");
      const drawer = document.getElementById("mobileDrawer");
      if (menuBtn && drawer) {
        menuBtn.addEventListener("click", () => {
          const isOpen = drawer.classList.toggle("open");
          menuBtn.classList.toggle("active", isOpen);
          menuBtn.setAttribute("aria-expanded", isOpen);
          menuBtn.innerHTML = isOpen
            ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>`
            : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>`;
        });

        document.querySelectorAll(".mobile-link").forEach(link => {
          link.addEventListener("click", () => {
            drawer.classList.remove("open");
            menuBtn.classList.remove("active");
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>`;
          });
        });
      }
    }

    function setupIntersectionObserver() {
      const isReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isReduced) return;

      const revealElements = document.querySelectorAll(".reveal");
      if ("IntersectionObserver" in window) {
        document.body.classList.add("has-scroll-anim");
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.05, rootMargin: "0px 0px 50px 0px" });

        revealElements.forEach(el => observer.observe(el));
      }
    }

    function setupAnimatedCounters() {
      const counters = document.querySelectorAll("[data-target]");
      let animated = false;

      function startCounters() {
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute("data-target"), 10);
          const suffix = counter.getAttribute("data-suffix") || "";
          const duration = 1800;
          const start = performance.now();

          function updateNumber(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(ease * target);
            counter.textContent = currentVal.toLocaleString() + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateNumber);
            } else {
              counter.textContent = target.toLocaleString() + suffix;
            }
          }
          requestAnimationFrame(updateNumber);
        });
      }

      if ("IntersectionObserver" in window) {
        const kpiSection = document.getElementById("business-impact");
        if (kpiSection) {
          const observer = new IntersectionObserver((entries, obs) => {
            if (entries[0].isIntersecting && !animated) {
              animated = true;
              startCounters();
              obs.disconnect();
            }
          }, { threshold: 0.2 });
          observer.observe(kpiSection);
        }
      } else {
        startCounters();
      }
    }

    function setupTransformationToggle() {
      const btnAll = document.getElementById("btnShowAll");
      const btnAfter = document.getElementById("btnShowAfterOnly");
      const sideBefore = document.getElementById("sideBefore");
      const compareGrid = document.getElementById("compareGrid");

      if (btnAll && btnAfter && sideBefore && compareGrid) {
        btnAll.addEventListener("click", () => {
          btnAll.classList.add("active");
          btnAfter.classList.remove("active");
          sideBefore.style.display = "block";
          compareGrid.style.gridTemplateColumns = "1fr 1fr";
        });

        btnAfter.addEventListener("click", () => {
          btnAfter.classList.add("active");
          btnAll.classList.remove("active");
          sideBefore.style.display = "none";
          compareGrid.style.gridTemplateColumns = "1fr";
        });
      }
    }

    function setupArchitectureInspector() {
      const nodes = document.querySelectorAll(".arch-node");
      const nameEl = document.getElementById("inspectTechName");
      const roleEl = document.getElementById("inspectTechRole");
      const purposeEl = document.getElementById("inspectTechPurpose");

      nodes.forEach(node => {
        function activateNode() {
          const idx = parseInt(node.getAttribute("data-node"), 10);
          const tech = project.technologies[idx];
          if (tech) {
            if (nameEl) nameEl.textContent = tech.name;
            if (roleEl) roleEl.textContent = tech.role;
            if (purposeEl) purposeEl.textContent = tech.purpose;

            nodes.forEach(n => {
              const c = n.querySelector("circle");
              if (c) c.setAttribute("stroke-width", "2");
            });
            const activeCircle = node.querySelector("circle");
            if (activeCircle) activeCircle.setAttribute("stroke-width", "4");
          }
        }

        node.addEventListener("mouseenter", activateNode);
        node.addEventListener("click", activateNode);
        node.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            activateNode();
          }
        });
      });
    }

    function openImageModal(src, title, subtitle) {
      const modal = document.getElementById("imageModal");
      const img = document.getElementById("modalImg");
      const titleEl = document.getElementById("modalTitle");
      const subEl = document.getElementById("modalSub");

      if (modal && img) {
        img.src = src;
        img.alt = title;
        if (titleEl) titleEl.textContent = title;
        if (subEl) subEl.textContent = subtitle;
        modal.classList.add("open");
        document.body.style.overflow = "hidden";
      }
    }

    function closeImageModal() {
      const modal = document.getElementById("imageModal");
      if (modal) {
        modal.classList.remove("open");
        document.body.style.overflow = "";
      }
    }

    function setupImageModalEvents() {
      const modal = document.getElementById("imageModal");
      const closeBtn = document.getElementById("modalCloseBtn");
      if (closeBtn) closeBtn.addEventListener("click", closeImageModal);
      if (modal) {
        modal.addEventListener("click", (e) => {
          if (e.target === modal) closeImageModal();
        });
      }
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeImageModal();
      });
    }

    document.addEventListener("DOMContentLoaded", () => {
      initDynamicContent();
      setupScrollProgress();
      setupNavigation();
      setupIntersectionObserver();
      setupAnimatedCounters();
      setupTransformationToggle();
      setupArchitectureInspector();
      setupImageModalEvents();
    });
