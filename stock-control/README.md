# 📦 StockFlow Pro — Modern Stock Control & Management Suite

A full-stack, enterprise-grade Inventory & Stock Control Management System built with React 19, TypeScript, Vite, Material UI v9, Express, Prisma ORM, and SQLite.

![Live Dashboard](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-19.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Prisma](https://img.shields.io/badge/Prisma-SQLite-informational)

---

## ⚡ Highlights & Key Features

* **📊 Executive Dashboard:** Real-time KPI telemetry (Inventory Valuation, Sales Revenue, Catalog Count, Low Stock Alerts), interactive 7-day revenue trend chart, and volume distribution progress bars.
* **📦 Inventory Catalog:** Search by SKU or product name, filter by stock health (All, Low Stock $\le 10$, Out of Stock), full CRUD modals, and quick stock adjustment (+ / -) with physical audit notes.
* **🚚 Supplier Management:** Vendor contact profiles, purchase order tracking, and warehouse dispatch addresses.
* **📋 Procurement & Purchase Orders:** Multi-line order builder, subtotal calculation, status flow (`PENDING` $\to$ `RECEIVED`), and automatic inventory replenishment upon delivery.
* **🛒 Point of Sale & Customer Orders:** Multi-item cart checkout with live stock validation (prevents overselling) and automatic inventory deductions.
* **🔍 Stock Audit Log:** Immutable traceability ledger recording every inbound arrival, outbound dispatch, and adjustment with timestamps and SKU tracking.
* **📑 One-Click CSV Reports:** Export catalog data, sales history, purchase orders, and audit trails to spreadsheet-compatible CSV files.
* **🌐 Dual-Engine Architecture:**
  * **Server Mode:** Runs with Express, Prisma, and SQLite for production/local workflows.
  * **In-Browser Demo Mode:** If deployed to GitHub Pages or static hosting without a running backend, it automatically activates an in-browser storage engine so any visitor can play and test the full application immediately!

---

## 🚀 How to Run Locally (Windows)

### Quick 1-Click Launch:
Simply double-click:
```powershell
run_stock_control.bat
```
This batch script will automatically:
1. Initialize `.env` configuration.
2. Apply SQLite database migrations.
3. Start the Backend API on `http://localhost:4000`.
4. Start the Frontend UI on `http://localhost:5173`.

---

## 💻 Manual Setup

### 1. Backend Setup:
```powershell
cd backend
npm install
npx prisma migrate dev --name init
npx ts-node src/index.ts
```
The API server will listen on `http://localhost:4000`.

### 2. Frontend Setup:
```powershell
# In the project root (stock-control)
npm install
npm run dev
```
Open your browser at [http://localhost:5173](http://localhost:5173).

---

## 🌍 Pushing to GitHub & Online Demo

### Can users play if you push this to GitHub?
**YES!** 

Thanks to the built-in **Dual-Engine Architecture**:
1. **GitHub Pages / Vercel Static Deploy:**
   * When visitors open the web link, the system detects that no local backend server is running and seamlessly activates the **Client-Side Demo Engine**.
   * Visitors can create products, adjust inventory, record sales, receive purchase orders, and view live graphs. All actions persist in their browser!
2. **Cloning the Repo:**
   * Anyone who clones your GitHub repository can run `.\run_stock_control.bat` to run the full stack with the SQLite database.

---

## 🛠 Tech Stack

* **Frontend:** React 19, TypeScript, Vite, Material UI (MUI v9), Emotion, Axios, React Router v7.
* **Backend:** Node.js, Express, TypeScript, Prisma ORM, SQLite (`dev.db`), bcrypt, jsonwebtoken.
* **Storage:** SQLite (Server Mode) / LocalStorage & State (Browser Demo Mode).
