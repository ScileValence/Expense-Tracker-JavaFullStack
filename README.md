# 💜 Phainance — Smart Expense Tracker  

![Version](https://img.shields.io/badge/version-1.6.0-blue.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-lightgrey.svg)
![Frontend](https://img.shields.io/badge/frontend-React%20%2B%20Vite-61DBFB.svg)
![Backend](https://img.shields.io/badge/backend-Spring%20Boot-6DB33F.svg)
![Database](https://img.shields.io/badge/database-MySQL-4479A1.svg)

> **Phainance** is a full-stack personal finance web application designed to help users manage their expenses, budgets, and savings more effectively — all within a clean, elegant, and responsive interface.  
> Built using **React (Vite)** + **Spring Boot** + **MySQL**, secured with **JWT authentication**, and powered by **Recharts analytics** and **Toast notifications**.

---

## 🌟 Feature Overview  

### 🔐 Authentication  
- Secure **JWT-based login/signup**  
- Stateless sessions with **Spring Security**  
- Passwords encrypted via **BCrypt**  
- Token validation & auto-logout on expiry  

### 💸 Expense Management  
- Add, edit, and delete expenses directly on the same page  
- Inline editable table rows  
- Categorize expenses with real-time category updates  
- Smooth animations and responsive UI  

### 🎯 Budget Management  
- Set and manage **monthly budgets**  
- Automatic spent/remaining calculations  
- Real-time progress display with visual bar  
- Persistent month tracking via localStorage  

### 📊 Analytics Dashboard  
- **Category-wise breakdown (Pie Chart)**  
- **Daily spending trend (Line Chart)**  
- Fully responsive Recharts visualizations  
- Optimized chart resizing to prevent cutoff issues  
- Toggleable analytics visibility  

### 🔔 UI & UX Enhancements  
- Clean, modern **lavender-white gradient** interface  
- **Rounded toast notifications** for actions (add, edit, delete, save)  
- Smooth entrance animations for all cards & forms  
- Refined layout spacing for improved readability  
- **Dune-inspired background** for authentication pages  
- Centered “Add Expense” and “Budget” layouts for professional alignment  

---

## 🛠️ Tech Stack  

| Layer | Technologies |
|-------|---------------|
| **Frontend** | React (Vite), CSS3, Recharts, React Toastify |
| **Backend** | Spring Boot, Spring Security, REST API |
| **Database** | MySQL |
| **Authentication** | JWT, BCrypt |
| **Build Tools** | Maven, Node.js |

---

## ⚙️ Installation Guide  

### 🧩 Backend (Spring Boot)
```bash
# Navigate to backend directory
cd backend

# Update credentials in application.properties
spring.datasource.username=root
spring.datasource.password=root

# Run Spring Boot server
mvn spring-boot:run
Backend URL:
👉 http://localhost:8080

💻 Frontend (React + Vite)
bash
Copy code
# Navigate to frontend directory
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
spring.datasource.url=jdbc:mysql://localhost:3306/phainance
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080

jwt.secret=U3VwZXJTZWNyZXRLZXlTdHJpbmctMzJCeXRlcwAAAAAAAAAA
jwt.expiration=86400000
🧠 API Summary
Endpoint	Method	Description
/api/auth/register	POST	Register new user
/api/auth/login	POST	Authenticate user & return JWT
/api/expenses	GET / POST / PUT / DELETE	Manage expenses
/api/categories	GET	Fetch all categories
/api/budget	GET / POST / PUT	Get or update monthly budget
/api/analytics/*	GET	Fetch analytics data

📊 Dashboard Overview
Section	Description
Overview Cards	Displays total spent, budget, and remaining
Progress Bar	Visual representation of budget usage
Analytics Charts	Dynamic category & daily spending data
Expense Table	Filtered by selected month
Global Month Selector	Syncs across dashboard & budget pages

✨ Notable Highlights
🔄 Global month synchronization via localStorage & browser events

🔔 Rounded toast notifications for all key actions

💡 Dynamic theming (Dark/Light) with smooth transitions

🧠 Intelligent JWT validation for secure sessions

🧹 Duplicate prevention in budgets and categories

🧾 Soft animations for card entrances and page loads

🧾 Changelog
Version	Date	Highlights
v1.6.0	Nov 2025	Added notifications, unified animations, dune background UI
v1.5.0	Oct 2025	Added analytics dashboard, budget tracking
v1.3.0	Sept 2025	JWT auth + MySQL integration
v1.0.0	Aug 2025	Initial release with expense tracking

🧠 Future Enhancements
CSV / PDF report export

Category-based budget limits

Multi-user shared analytics

Spending insights using ML

Email alerts for overspending

👨‍💻 Author
Aashirwad Pradhan
🎓 MCA Student — Sapthagiri NPS University
💼 Full-Stack Developer | React + Spring Boot + MySQL
📅 Last Updated: November 10, 2025

🪪 License
This project is licensed under the MIT License.
You’re free to use, modify, and distribute this software with attribution.

💜 Phainance — Because managing your money should feel effortless.
