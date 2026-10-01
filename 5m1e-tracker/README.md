# 5M1E Production Quality & Change-Point Tracker

An industrial-grade, single-page web application designed for manufacturing floor supervisors, quality engineers, and plant operators to record, audit, and analyze **5M1E** (Man, Machine, Material, Method, Measurement, Environment) production data and change points.

Equipped with **Genuine Microsoft 365 (Entra ID / Azure AD) Single Sign-On (SSO)** with Microsoft Graph API profile resolution and browser authentication persistence!

---

## 🔐 Real Microsoft 365 Authentication Architecture

This application uses the official **Microsoft Authentication Library (`@azure/msal-browser`)** to implement standard OAuth 2.0 & OpenID Connect with Microsoft 365.

### How Real Sign-In Works:
1. **Unauthenticated State**:
   - The user starts as **unauthenticated** (no fake preloaded sample users).
   - Read-only viewing of previous shift logs and Ishikawa diagrams is permitted, but logging new 5M1E events requires a verified Microsoft 365 sign-in.
2. **Official Microsoft OAuth 2.0 Popup Flow**:
   - Clicking **"Sign in with Microsoft"** triggers MSAL's `loginPopup()`.
   - The official Microsoft sign-in window opens (`https://login.microsoftonline.com/...`).
   - The user authenticates with their real work/school account (e.g. `user@yourcompany.com`) or personal Microsoft account.
3. **Microsoft Graph API Integration (`https://graph.microsoft.com/v1.0/me`)**:
   - Upon receiving the verified access token, the app queries the **Microsoft Graph API**:
     - `displayName` (Real name)
     - `mail` / `userPrincipalName` (Real email)
     - `jobTitle`
     - `department`
     - Profile Photo (`/me/photo/$value`)
4. **Persistent Local Authentication Storage**:
   - Real user credentials, profile attributes, tenant ID, and tokens are saved in `localStorage` under `m365_user_auth`.
   - User identity remains active across browser tab reloads and refreshes.
5. **Electronic Signature & Audit Attribution**:
   - Every submitted 5M1E record is permanently stamped with `recordedBy: user.email` and `recordedByName: user.displayName`.
   - Displays a verified Microsoft 365 badge in the shift audit table for ISO/IATF 16949 compliance.

---

## ⚙️ Connecting Your Microsoft 365 / Azure Entra Tenant

To connect your organization's Microsoft 365 tenant, you register an Application ID in Azure (takes ~30 seconds):

1. Go to [Azure Portal: App Registrations](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps).
2. Click **New registration**:
   - **Name**: `5M1E Production Tracker`
   - **Supported account types**: Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant) and personal Microsoft accounts, OR your single organization tenant.
   - **Redirect URI**: Select **Single-page application (SPA)** and enter: `http://localhost:8080`.
3. Copy the **Application (client) ID**.
4. In the 5M1E web app, click **Sign in with Microsoft 365** and paste the Application ID. It will be remembered automatically in `localStorage`.

---

## 🏃 Quick Start

### 1. Launch with Python Server (Recommended for OAuth)
```powershell
cd C:\Users\kn2170\Desktop\Self-Learning\5m1e-tracker
python -m http.server 8080
```
Open **[http://localhost:8080](http://localhost:8080)** in Google Chrome or Microsoft Edge.

### 2. Double-Click Launcher
Double-click [`open_tracker.bat`](file:///c:/Users/kn2170/Desktop/Self-Learning/5m1e-tracker/open_tracker.bat) or [`index.html`](file:///c:/Users/kn2170/Desktop/Self-Learning/5m1e-tracker/index.html).
