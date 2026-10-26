# 5M1E Production Quality & Change-Point Tracker

An industrial-grade, single-page web application designed for manufacturing floor supervisors, quality engineers, and plant operators to record, audit, and analyze **5M1E** (Man, Machine, Material, Method, Measurement, Environment) production data and change points.

Equipped with **Real Multi-Provider OAuth 2.0 & Supabase PostgreSQL Database Integration**:
- 🌐 **Real Google Account Sign-In**: Official OAuth 2.0 via Supabase Auth (`@gmail.com` and Google Workspace).
- 👥 **Real Facebook Account Sign-In**: Official OAuth 2.0 via Supabase Auth.
- 🪟 **Real Microsoft Account Sign-In**: Personal accounts (`@outlook.com`, `@hotmail.com`, `@live.com`) & Corporate Microsoft 365 (Entra ID / Azure AD) via Supabase OAuth or MSAL popup.
- ✉️ **Email & Password / PIN Auth**: Secure Supabase authentication with user registration and credential hashing.
- ⚡ **Supabase PostgreSQL Cloud Database**: Stores authenticated user profiles (`public.profiles`) and all 5M1E production logs and electronic signatures (`public.production_records`) with live synchronization.

---

## ⚡ Supabase Cloud Database & Real OAuth Setup

### 1. Create your Free Supabase Project
1. Go to [supabase.com](https://supabase.com) and create or open a project.
2. In the Supabase Dashboard, navigate to **Project Settings > API**:
   - Copy the **Project URL** (e.g. `https://xyzcompany.supabase.co`).
   - Copy the **`anon` `public` API Key**.
3. In the 5M1E Tracker app, click **⚡ Supabase DB** tab in the top navigation or modal, paste these two values, and click **Save & Test Connection**.

### 2. Run Database Setup SQL Script (1-Click)
In the 5M1E Tracker app's **⚡ Supabase DB** tab, click **Copy Supabase SQL Setup Script to Clipboard**.
Then open **Supabase Dashboard > SQL Editor > New Query**, paste the script, and click **Run**.

This automatically creates:
1. `public.profiles`: Stores real authenticated user profiles from Google, Facebook, Microsoft, and Email (ID, name, email, role, department, avatar, provider).
2. `public.production_records`: Stores all 5M1E change points, abnormalities, parameter logs (Man, Machine, Material, Method, Measurement, Environment), and electronic signature stamps.
3. Row-Level Security (RLS) policies configured for secure read, insert, and update operations.

### 3. Enabling OAuth Providers in Supabase

#### A. Google OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Create an **OAuth 2.0 Client ID** (Web application).
3. Set Authorized Redirect URI to: `https://<YOUR-PROJECT-ID>.supabase.co/auth/v1/callback`.
4. Copy the Client ID and Client Secret into **Supabase Dashboard > Authentication > Providers > Google** and toggle **Enabled**.

#### B. Facebook OAuth:
1. Go to [Meta for Developers](https://developers.facebook.com/).
2. Create an App, set up **Facebook Login for Web**.
3. Add Valid OAuth Redirect URI: `https://<YOUR-PROJECT-ID>.supabase.co/auth/v1/callback`.
4. Copy the App ID and App Secret into **Supabase Dashboard > Authentication > Providers > Facebook** and toggle **Enabled**.

#### C. Microsoft (Azure Entra ID) OAuth:
1. Go to [Azure Portal (App registrations)](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps).
2. Register a new app with Supported Account Types: **"Accounts in any organizational directory and personal Microsoft accounts (e.g. Skype, Xbox, Outlook.com)"**.
3. Add Web Redirect URI: `https://<YOUR-PROJECT-ID>.supabase.co/auth/v1/callback`.
4. Create a Client Secret and copy Application ID and Secret into **Supabase Dashboard > Authentication > Providers > Azure** and toggle **Enabled**.

---

## 🏃 Running the Application

### Option 1: Local HTTP Server (Recommended for OAuth Redirects)
Due to OAuth security standards, real OAuth callbacks require an `http://` or `https://` origin:
```powershell
python -m http.server 8080
```
Open **[http://localhost:8080](http://localhost:8080)** in Google Chrome or Microsoft Edge.

### Option 2: Direct File Launch
Double-click [`open_tracker.bat`](file:///d:/New%20folder/01/5m1e-tracker/open_tracker.bat) or open [`index.html`](file:///d:/New%20folder/01/5m1e-tracker/index.html) directly in any modern browser for immediate offline floor testing and direct sign-ins.
