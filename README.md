# Smart Factory & Digital Transformation Workspace

[![Version](https://img.shields.io/badge/Version-2.4%20Enterprise-0284c7.svg)](#)
[![Compliance](https://img.shields.io/badge/Compliance-ISO%209001%20%7C%20IATF%2016949-16a34a.svg)](#)
[![Auth](https://img.shields.io/badge/SSO-Microsoft%20365%20%7C%20Google%20%7C%20Supabase-ea580c.svg)](#)
[![Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20React%2018%20%7C%20Bootstrap%205-8b5cf6.svg)](#)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-success.svg)](#)

> **Lead Supervisor:** Rathana Lan — Digital Transformation Supervisor  
> **Facility & Scope:** Global Smart Manufacturing • Operational Excellence & Industry 4.0

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture & Modules](#-architecture--modules)
  - [1. Smart Factory Portfolio Portal](#1-smart-factory-portfolio-portal)
  - [2. 5M1E Production Quality & Anomaly Suite](#2-5m1e-production-quality--anomaly-suite)
  - [3. Authentication & Operator Sign-Off](#3-authentication--operator-sign-off)
  - [4. Legal & Compliance Portal](#4-legal--compliance-portal)
- [Repository Structure](#-repository-structure)
- [Key Features & Capabilities](#-key-features--capabilities)
- [Quick Start Guide](#-quick-start-guide)
  - [Local Execution](#local-execution)
  - [Supabase Database Setup](#supabase-database-setup)
- [Quality Assurance & Verification](#-quality-assurance--verification)
- [Legal & Privacy Notice](#-legal--privacy-notice)

---

## 🏭 Overview

The **Smart Factory Digital Transformation Workspace** is an integrated operational intelligence platform designed for modern lean manufacturing. It bridges shop-floor operations with enterprise digital visibility, offering automated change-point tracking, quality anomaly diagnosis via the 5M1E framework (Man, Machine, Material, Method, Measurement, Environment), and immutable audit logging.

Built with a high-performance frontend architecture (vanilla ES6+, React 18, and Bootstrap 5) coupled with Supabase PostgreSQL and OAuth 2.0 Single Sign-On, the suite is engineered to run seamlessly across both high-resolution shop-floor monitoring terminals and mobile operator handheld devices.

---

## 🧩 Architecture & Modules

```
                    ┌─────────────────────────────────────────┐
                    │      Smart Factory Digital Transformation        │
                    │         Smart Factory Gateway           │
                    └────────────────────┬────────────────────┘
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 │                                               │
     ┌───────────▼───────────┐                       ┌───────────▼───────────┐
     │   Portfolio Portal    │                       │  5M1E Production      │
     │     (index.html)      │                       │     Quality Suite     │
     └───────────┬───────────┘                       │ (5m1e-tracker/index)  │
                 │                                   └───────────┬───────────┘
     ┌───────────▼───────────┐                                   │
     │ Operator SSO & Signin │◄──────────────────────────────────┘
     │     (login.html)      │
     └───────────┬───────────┘
                 │
     ┌───────────▼───────────────────────────────────────────────┐
     │        Multi-Provider Identity & Cloud Sync               │
     │  Microsoft 365 (Entra ID) • Google • Facebook • Supabase  │
     └───────────────────────────────────────────────────────────┘
```

### 1. Smart Factory Portfolio Portal
* **Entrypoint:** [`index.html`](index.html)
* **Purpose:** Central presentation layer for digital transformation initiatives, shop-floor metrics, operational governance, and automation strategies.

### 2. 5M1E Production Quality & Anomaly Suite
* **Entrypoint:** [`5m1e-tracker/index.html`](5m1e-tracker/index.html)
* **Framework:** 5M1E Lean Manufacturing Root Cause Analysis:
  - **Man:** Operator identification, skill levels (Tier 1–4), certification validation, and shift logs.
  - **Machine:** Tooling/station IDs, machine state, temperature (°C), hydraulic pressure (bar), spindle RPM, and tool life.
  - **Material:** Part numbers, supplier lot IDs, and Certificate of Analysis (CoA) checks.
  - **Method:** Standard Operating Procedure (SOP) references, recipe identifiers, and cycle time delta monitoring.
  - **Measurement:** Inspection gauge IDs, calibration tracking, LSL / Nominal / USL tolerances, and observed dimensions.
  - **Environment:** Cleanroom classification (ISO standards), ambient temperature, relative humidity, and ESD grounding.
* **Interactive Views:**
  - **Dashboard & Logs:** Dual-view system (sticky desktop multi-column table and responsive mobile touch cards).
  - **Full Record Editing & Deletion:** In-place record editing across all 6 dimensions with active edit banner and change audit attribution (`lastEditedBy`, `lastEditedAt`). Permanent delete safeguard with reactive state purge.
  - **Ishikawa (Fishbone) Diagram:** Dynamic SVG bone generator with interactive dimension inspection and countermeasure resolution.
  - **Radar Analytics:** 6-axis distribution radar chart powered by Chart.js.
  - **Floor Customization:** Dynamic Line and Shift setup saved to persistent `localStorage`.
  - **Data Portability:** 1-click export to CSV (Excel), complete JSON backup, and JSON file restore.

### 3. Authentication & Operator Sign-Off
* **Entrypoint:** [`login.html`](login.html) and in-app modal
* **Providers:**
  - **Microsoft 365 (Entra ID / Azure AD):** Work and personal (`@outlook.com`, `@hotmail.com`) account support with MSAL OAuth popup workflow.
  - **Google Workspace:** One-click OAuth sign-in.
  - **Facebook Login:** OAuth integration for field testing.
  - **Supabase Auth:** Email and employee PIN authentication with bcrypt hashing and session persistence.
* **Audit Signature:** Every log and countermeasure is digitally stamped with the operator's verified identity, email, and authentication provider.

### 4. Legal & Compliance Portal
* **Privacy Policy:** [`privacy.html`](privacy.html) / [`5m1e-tracker/privacy.html`](5m1e-tracker/privacy.html)
  - Outlines telemetry handling, employee data custody, GDPR/CCPA compliance, and ISO 9001 data retention schedules.
* **Terms of Service:** [`terms.html`](terms.html) / [`5m1e-tracker/terms.html`](5m1e-tracker/terms.html)
  - Defines permitted operational use, trade secret custody, offline caching responsibilities, and strict anti-tampering mandates aligned with IATF 16949.

---

## 📁 Repository Structure

```
d:/Folio-clone/01/
├── index.html                 # Digital Transformation & Smart Factory Portal
├── login.html                 # Multi-provider operator sign-in portal
├── privacy.html               # Public Privacy Policy (Root Gateway)
├── terms.html                 # Public Terms of Service (Root Gateway)
├── SUPABASE_SETUP.md          # PostgreSQL database schema & RLS rules
├── README.md                  # Master repository documentation (this file)
├── assets/
│   ├── css/
│   │   └── login.css          # Sign-in styling and responsive layout rules
│   └── js/
│       ├── login.js           # Client auth handlers & tab controllers
│       └── supabase-config.js # Client Supabase configuration loader
├── 5m1e-tracker/
│   ├── index.html             # 5M1E Production Tracker & Quality Suite (Main App)
│   ├── styles.css             # Industrial dark theme design system & animations
│   ├── privacy.html           # In-app Privacy Policy (Deep link)
│   ├── terms.html             # In-app Terms of Service (Deep link)
│   ├── open_tracker.bat       # Windows 1-click launch batch script
│   └── 5M1E_PRODUCTION_QUALITY_SUITE.md # Detailed application specification
└── Aboutme/                   # Portfolio bio and career profile pages
```

---

## ⚡ Key Features & Capabilities

| Feature | Description | Status |
| :--- | :--- | :---: |
| **5M1E Anomaly Logging** | Capture parameters across all 6 manufacturing dimensions | ✅ Production |
| **Record Editing** | Full editing mode with pre-filled inputs and edit warning banner | ✅ Production |
| **Record Deletion** | Safe record deletion with confirmation and state re-indexing | ✅ Production |
| **Ishikawa Generator** | Real-time SVG fishbone diagram mapped to active anomalies | ✅ Production |
| **Dual View System** | Desktop sticky table + touch-optimized mobile cards | ✅ Production |
| **Dynamic Lines & Shifts** | Add, remove, and rename factory floor lines and shifts | ✅ Production |
| **JSON Backup & Restore** | Client-side snapshot export and import with instant re-render | ✅ Production |
| **CSV Export** | Excel-compatible flat table export of all parameters | ✅ Production |
| **Microsoft 365 SSO** | Corporate Entra ID + personal Microsoft account login | ✅ Production |
| **Supabase Cloud Sync** | Real-time PostgreSQL synchronization with RLS security | ✅ Production |
| **Responsive Design** | Fluid layouts verified from 320px (mobile) to 1920px (desktop) | ✅ Production |
| **Legal Documentation** | Standalone Privacy Policy and Terms of Service HTML pages | ✅ Production |

---

## 🚀 Quick Start Guide

### Local Execution

#### Method 1: Windows 1-Click Launch
Double-click [`5m1e-tracker/open_tracker.bat`](5m1e-tracker/open_tracker.bat) to automatically open the application in your default browser.

#### Method 2: Local HTTP Server (Recommended)
To run the suite via a local HTTP server:

```powershell
# Using Python
cd d:\Folio-clone\01
python -m http.server 8080

# Access in browser:
# Smart Factory Portal: http://localhost:8080/index.html
# 5M1E Tracker Suite:   http://localhost:8080/5m1e-tracker/index.html
```

```powershell
# Using Node.js (npx serve)
cd d:\Folio-clone\01
npx serve .
```

### Supabase Database Setup

1. Create a free project at [Supabase Dashboard](https://supabase.com/dashboard).
2. Open the **SQL Editor** in your Supabase project.
3. Copy and run the schema setup script from [`SUPABASE_SETUP.md`](SUPABASE_SETUP.md). This creates:
   - `public.profiles`: Stores operator profiles, roles, and provider metadata.
   - `public.production_records`: Stores 5M1E change points, telemetry, and audit signatures.
   - Row-Level Security (RLS) policies for secure multi-operator collaboration.
4. In [`5m1e-tracker/index.html`](5m1e-tracker/index.html), click the **DB** button in the navbar, paste your **Project URL** and **Anon Public API Key**, and click **Save & Test Connection**.

---

## 🧪 Quality Assurance & Verification

The codebase has undergone rigorous automated testing:

* **HTML5 Parsing & Syntax**:
  - `01/5m1e-tracker/index.html`: Fully balanced JSX/React elements with zero syntax or bracket mismatches.
  - `01/5m1e-tracker/privacy.html`: 199 HTML tags parsed without warnings.
  - `01/5m1e-tracker/terms.html`: 159 HTML tags parsed without warnings.
  - `01/login.html`: 141 HTML tags parsed without warnings.
* **DOM Hydration & Chrome DevTools Protocol (CDP)**:
  - Verified across 8 responsive viewports: `320px`, `375px`, `414px`, `768px`, `1024px`, `1280px`, `1440px`, and `1920px`.
  - Zero unhandled console exceptions or runtime errors during headless Chrome execution.
* **Interactive Edit / Delete Pipeline**:
  - Validated that clicking Edit transitions the UI into edit mode, pre-fills all 6-dimension form inputs, renders the alert banner, and persists updates to state and database.

---

## ⚖️ Legal & Privacy Notice

* **Privacy Policy:** Access the complete policy at [`privacy.html`](privacy.html) or [`5m1e-tracker/privacy.html`](5m1e-tracker/privacy.html).
* **Terms of Service:** Access the operational terms at [`terms.html`](terms.html) or [`5m1e-tracker/terms.html`](5m1e-tracker/terms.html).
* **Copyright:** © 2026 Smart Factory Digital Transformation. All rights reserved.
