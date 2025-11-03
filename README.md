# 💰 Expense Tracker  

![Version](https://img.shields.io/badge/version-1.3.0-blue.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-lightgrey.svg)
![Frontend](https://img.shields.io/badge/frontend-React%20%2B%20Vite-61DBFB.svg)
![Backend](https://img.shields.io/badge/backend-Spring%20Boot-6DB33F.svg)
![Database](https://img.shields.io/badge/database-MySQL-4479A1.svg)

> A full-stack personal finance management web app — track expenses, manage monthly budgets, and gain visual spending insights.  
> Built with **React (Vite)** + **Spring Boot** + **MySQL**, featuring secure JWT authentication.

---

## 🌟 Features Overview

### 🔐 User & Authentication
- Secure **JWT-based login/signup**
- Stateless sessions via Spring Security
- Passwords hashed with **BCrypt**
- User data is **completely isolated**

### 💸 Expense Management
- Add, edit, delete, and view expenses
- Category-based expense classification
- **Month-wise filtering**
- Fully responsive data table view

### 🎯 Budget Management
- Set **monthly budgets**
- Auto-calculates spent, remaining, and usage %
- Visual progress tracking
- No data overlap between months

### 📊 Analytics Dashboard
- Integrated directly into the main dashboard
- Charts powered by **Recharts**
  - 🥧 Category-wise Spending (Pie Chart)
  - 📅 Daily Spending (Line Chart)
  - 📈 Monthly Summary (Bar Chart)
- Global month selector — updates analytics and expense lists instantly
- Fully responsive, adaptive for **light/dark themes**

### 🎨 UI/UX
- Modern, minimal dashboard layout  
- Adaptive **light/dark mode toggle**
- Smooth transitions and collapsible sections
- Optimized for mobile and desktop screens

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | ![React](https://img.shields.io/badge/-React-61DBFB?logo=react&logoColor=white) ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white) ![Recharts](https://img.shields.io/badge/-Recharts-FF6384?logo=recharts&logoColor=white) |
| **Backend** | ![Spring Boot](https://img.shields.io/badge/-Spring%20Boot-6DB33F?logo=springboot&logoColor=white) ![Spring Security](https://img.shields.io/badge/-Spring%20Security-4DB33D?logo=springsecurity&logoColor=white) |
| **Database** | ![MySQL](https://img.shields.io/badge/-MySQL-4479A1?logo=mysql&logoColor=white) |
| **Auth** | ![JWT](https://img.shields.io/badge/-JWT-black?logo=jsonwebtokens&logoColor=white) ![BCrypt](https://img.shields.io/badge/-BCrypt-lightgrey.svg) |
| **Build Tools** | Maven, Node.js |

## ⚙️ Installation Guide

### 🧩 Backend (Spring Boot)
```bash
# Navigate to backend directory
cd backend

# Update credentials in application.properties
spring.datasource.username=root
spring.datasource.password=root

# Run Spring Boot
mvn spring-boot:run
Backend URL:
👉 http://localhost:8080

💻 Frontend (React + Vite)
bash
Copy code
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start Vite server
npm run dev
Frontend URL:
👉 http://localhost:5173

🔑 Backend Configuration (application.properties)
properties
Copy code
spring.datasource.url=jdbc:mysql://localhost:3306/expense_tracker
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080

jwt.secret=U3VwZXJTZWNyZXRLZXlTdHJpbmctMzJCeXRlcwAAAAAAAAAA
jwt.expiration=86400000
🧠 API Summary
Endpoint	Method	Description
/api/auth/register	POST	Register user
/api/auth/login	POST	Authenticate user & return JWT
/api/expenses	GET / POST / PUT / DELETE	Manage expenses
/api/categories	GET	Fetch all categories
/api/budget	GET / POST / PUT	Get or update monthly budget
/api/analytics/*	GET	Spending analytics & chart data

📊 Dashboard Overview
Section	Description
Overview Cards	Displays total spent, budget, and usage %
Progress Bar	Visual indicator of monthly budget utilization
Analytics Charts	Recharts-powered insights (category, daily, monthly)
Expense Table	Filtered by selected month for quick review

🧩 Notable Highlights
🔄 Real-time global month sync via localStorage and browser events

🧠 Intelligent JWT validation (auto-logout on expiry)

💡 Dynamic theming across all components

📈 Data-driven visual analytics

🧹 Automatic duplicate cleanup for budgets/categories

🧾 Changelog
See CHANGELOG.md for detailed version updates.
Current Version: v1.3.0 (November 2025)

🧠 Future Enhancements
Expense editing & deletion UI

Report export (CSV / PDF)

Category-based budget limits

AI-powered spending predictions

Email notifications on overspending

👨‍💻 Author
Aashirwad Pradhan
🎓 MCA Student, Sapthagiri NPS University
💼 Full-stack Developer | React + Spring Boot + MySQL
📅 Last Updated: November 3, 2025

🪪 License
This project is licensed under the MIT License.
You’re free to use, modify, and distribute this software as long as proper credit is given.
