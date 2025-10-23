# 🧾 Expense Tracker — Version 1.0 (Initial Release)

### 📅 Release Date  
**October 2025**

---

## 🚀 Overview  
**Expense Tracker v1.0** is a full-stack web application built using **React (Vite)** for the frontend, **Spring Boot** for the backend, and **MySQL** for data persistence.  
It enables users to **track daily expenses**, **categorize spending**, and **set budgets**, all through a clean and responsive interface.

---

## 🧩 Tech Stack
| Layer | Technology | Description |
|--------|-------------|-------------|
| **Frontend** | React + Vite | Modern, fast, and modular user interface |
| **Backend** | Spring Boot (Maven) | RESTful API to handle CRUD operations |
| **Database** | MySQL | Persistent storage for expenses and categories |
| **HTTP Client** | Axios | For API communication between frontend and backend |
| **Styling** | CSS + React Components | Clean, minimal, and responsive design |

---

## 🎯 Key Features (v1.0)
✅ **Add Expenses** — Users can input amount, category, and description  
✅ **View Expense List** — Displays all recorded expenses with timestamps  
✅ **Category Management** — Predefined categories (Food, Rent, Travel, etc.)  
✅ **Expense Dashboard** — Summarized monthly spending view  
✅ **Real-Time Updates** — Instant UI updates after CRUD operations  
✅ **REST API** — Fully functional `/api/expenses` and `/api/categories` endpoints  
✅ **Cross-Origin Enabled** — Smooth communication between frontend and backend  

---

## 🗂️ Folder Structure
```
expense-tracker-full/
 ├── backend/
 │    ├── controller/
 │    ├── model/
 │    ├── repository/
 │    ├── service/
 │    ├── config/
 │    └── pom.xml
 │
 ├── frontend/
 │    ├── src/
 │    │    ├── pages/
 │    │    ├── components/
 │    │    ├── api/
 │    │    └── App.jsx
 │    └── package.json
 │
 └── database/
      └── expense_tracker.sql
```

---

## ⚙️ Installation Guide

### 1️⃣ Setup Database
```sql
CREATE DATABASE expense_tracker_db;
```
Then import `database/expense_tracker.sql`.

---

### 2️⃣ Run Backend
```bash
cd backend
mvn spring-boot:run
```
➡ Backend runs at `http://localhost:8080`

---

### 3️⃣ Run Frontend
```bash
cd frontend
npm install
npm run dev
```
➡ Frontend runs at `http://localhost:5173`

---

## 🧠 Future Enhancements (Planned for v2.0)
- 🔐 User Authentication (JWT-based Login/Signup)  
- 📊 Interactive Charts for spending insights  
- 💰 Budget Goal Tracking  
- 🌙 Dark/Light Mode Toggle  
- 📅 Date Range Filters for Reports  
- 📱 Fully Responsive Mobile UI  
