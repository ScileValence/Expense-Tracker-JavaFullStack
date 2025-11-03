# 📘 Expense Tracker — Changelog

All notable changes to this project are documented here.  
This project follows **semantic versioning** (`MAJOR.MINOR.PATCH`).

---

## [v1.5.0] — 2025-11-03
### ✨ Added
- **Month-wise expense filtering everywhere**
  - The **Dashboard**, **Expense List**, and **Budget pages** now sync via one global `selectedMonth` state.
  - Changing the month updates charts, expense list, and budget data instantly.
- Introduced **global month selector** (always visible at the top of Dashboard).
- Implemented **real-time month sync** across multiple tabs using `window.storage` events.
- Added **month parameter support** for all backend endpoints:
  - `/api/budget?month=YYYY-MM`
  - `/api/analytics/*?month=YYYY-MM`
- Recharts-based analytics dynamically adapt to the selected month.

### 🧠 Improved
- **Budget is now fully month-specific**, preventing global overwrites.
- Dashboard analytics section made **collapsible but expanded by default**.
- Enhanced data consistency between frontend and backend.
- Backend controllers (`BudgetController`, `AnalyticsController`) updated for cleaner and safer query handling.
- Modernized UI layout for better spacing and readability.
- Improved backend logging for debugging (Budget, Analytics).

### 🐞 Fixed
- Fixed a bug where setting a new budget overwrote previous months.
- Fixed analytics charts not updating on month change.
- Fixed blank chart rendering when switching months.
- Fixed 403 JWT forbidden issue for analytics endpoints.
- Fixed global state not updating between pages.

---

## [v1.4.0] — 2025-10-30
### ✨ Added
- Introduced **collapsible analytics panel** with:
  - Category-wise spending pie chart.
  - Monthly spending summary bar chart.
  - Daily spending trend line chart.
- Added **light/dark adaptive theme**.
- Enhanced card styling and transitions.

### 🧠 Improved
- Dashboard now loads analytics on expand, improving performance.
- Added smooth animation and grid layout refinements.

### 🐞 Fixed
- Minor UI color consistency fixes.
- Expense table alignment corrected.

---

## [v1.3.0] — 2025-10-29
### ✨ Added
- New **Analytics Dashboard** with spending visualizations.
- Implemented **Budget vs Spent** trend comparison.
- Added global month persistence via `localStorage`.
- Theme toggle added for dark/light switching.

### 🧠 Improved
- Backend analytics optimized for grouped data.
- Smoother chart rendering and adaptive layouts.

### 🐞 Fixed
- JWT 403 error in analytics endpoints.
- Global budget duplication issue.

---

## [v1.2.0] — 2025-10-20
### ✨ Added
- JWT-based authentication.
- Protected backend routes (`/api/**`).
- Added user isolation for all data.
- `DataLoader` automatically seeds categories.

### 🧠 Improved
- Password encryption using BCrypt.
- SecurityConfig for stateless sessions.

### 🐞 Fixed
- CORS issues between frontend (5173) and backend (8080).

---

## [v1.0.0] — 2025-09-28
🎉 **Initial release**
- CRUD for expenses, categories, and budgets.
- React frontend and Spring Boot backend integration.
- Default category seeding and responsive dashboard.

---

### 👨‍💻 Author
**Aashirwad Pradhan**  
MCA Student, Sapthagiri NPS University  
*Full-stack Developer — React + Spring Boot + MySQL*

📅 *Last updated: November 3, 2025*
