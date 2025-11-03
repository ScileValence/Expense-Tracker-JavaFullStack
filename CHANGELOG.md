# 📘 Expense Tracker — Changelog

All notable changes to this project will be documented in this file.  
This project follows **semantic versioning**: `MAJOR.MINOR.PATCH`.

---

## [v1.3.0] — 2025-11-03
### ✨ Added
- Introduced **month-wise analytics dashboard**:
  - Category-wise spending (Pie Chart)
  - Monthly summary (Bar Chart)
  - Daily spending trend (Line Chart)
- Implemented **month selector** synced across dashboard, expense list, and budget pages.
- Added **global month persistence** via `localStorage` (`selectedMonth`).
- Introduced **dynamic filters** — analytics, budget, and expense lists now react to month changes instantly.
- Enhanced UI with **collapsible Analytics section** (auto-expanded by default).
- Dark/light theme is now **fully adaptive** across dashboard components.

### 🧠 Improved
- `Dashboard.jsx` now integrates analytics and monthly budget tracking in one view.
- All chart visualizations updated to use **Recharts** with responsive design.
- **BudgetForm** now saves and updates budgets **month-wise** instead of globally.
- Added real-time sync between dashboard and budget pages using `window.storage` events.
- Expense list now dynamically filters **by selected month**.

### 🐞 Fixed
- Blank charts issue when switching months.
- JWT 403 forbidden errors when fetching analytics.
- Global budget override bug (each month now stores its own budget).
- Data sync bug when changing months across multiple tabs.
- Category duplication and orphaned data edge cases in the database.

---

## [v1.2.0] — 2025-10-29
### ✨ Added
- **JWT authentication & authorization** layer (Spring Security).
- Backend routes now protected under `/api/**`.
- Implemented **User isolation** — all expenses and budgets are user-specific.
- Added `User`, `Expense`, `Budget`, and `Category` models with JPA mappings.
- Created **BudgetController**, **ExpenseController**, and **AnalyticsController**.
- Automatic default category loader (`DataLoader.java`).

### 🧠 Improved
- SecurityConfig updated to allow `/api/auth/**` public routes.
- Password encryption using **BCrypt**.
- JWT verification via `JwtAuthFilter`.
- API refactored for consistent JSON responses and debugging logs.

### 🐞 Fixed
- Duplicate budget and category entries on restart.
- Cross-origin (CORS) issue between frontend (Vite) and backend (Spring Boot).
- Token expiry and invalid token handling.

---

## [v1.1.0] — 2025-10-15
### ✨ Added
- Complete **React frontend** (Vite + Axios).
- Pages: Login, Signup, Dashboard, AddExpense, ExpenseList, and BudgetForm.
- Implemented **light/dark theme toggle**.
- Added **responsive layout** for mobile and desktop.

### 🧠 Improved
- Dashboard design modernized with cards, metrics, and minimal UI.
- Better routing and protected page logic.

---

## [v1.0.0] — 2025-09-28
### 🎉 Initial Release
- Core **Expense Tracker backend** setup with Spring Boot + MySQL.
- CRUD APIs for `Expense`, `Category`, and `Budget`.
- Basic React frontend integration.
- DataLoader creates default categories (`Food`, `Rent`, `Utilities`, etc.)
- Deployed basic working prototype with REST API connectivity.

---

### 🧩 Contributors
- **Aashirwad Pradhan** — Full-stack development, analytics integration, and design optimization.

---

📅 *Last updated: November 3, 2025*
