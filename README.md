# 💜 Phainance — Smart Expense Tracker  

![Version](https://img.shields.io/badge/version-1.6.0-blue.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-lightgrey.svg)
![Frontend](https://img.shields.io/badge/frontend-React%20%2B%20Vite-61DBFB.svg)
![Backend](https://img.shields.io/badge/backend-Spring%20Boot-6DB33F.svg)
![Database](https://img.shields.io/badge/database-MySQL-4479A1.svg)

> **Phainance** is a full-stack personal finance web app designed to help users manage expenses, budgets, and insights — built with  
> **React (Vite)** + **Spring Boot** + **MySQL**, secured via **JWT authentication**, and enhanced with **Recharts** and **Toast notifications**.

---

## 🌟 Features Overview  

### 🔐 Authentication  
- Secure **JWT-based login/signup**  
- Stateless sessions using **Spring Security**  
- Passwords encrypted via **BCrypt**  
- Auto-logout on token expiry  

### 💸 Expense Management  
- Add, edit, and delete expenses seamlessly on the same page  
- Inline editable expense table  
- Category selection with dynamic updates  
- Month-wise expense filtering  

### 🎯 Budget Management  
- Set and modify **monthly budgets**  
- Auto-track spending and remaining balance  
- Persistent month storage via localStorage  
- Clean budget overview with visual highlights  

### 📊 Analytics Dashboard  
- **Pie Chart:** Category-wise spending  
- **Line Chart:** Daily spending trends  
- Smooth responsive layout with consistent theming  
- Toggle analytics visibility  

### 🔔 UI / UX Enhancements  
- Elegant **lavender-white gradient** interface  
- Rounded **Toast notifications** with smooth fade  
- **Soft entrance animations** for all cards  
- Dune-inspired background for **login/signup**  
- Responsive and centered layouts for all pages  

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

cd backend

# Update credentials in application.properties
spring.datasource.username=root
spring.datasource.password=root

# Run backend
mvn spring-boot:run
Backend URL: 👉 http://localhost:8080

💻 Frontend (React + Vite)
bash
Copy code
cd frontend
npm install
npm run dev
Frontend URL: 👉 http://localhost:5173

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
/api/auth/register	POST	Register a new user
/api/auth/login	POST	Authenticate user & return JWT
/api/expenses	GET / POST / PUT / DELETE	Manage expenses
/api/categories	GET	Fetch all categories
/api/budget	GET / POST / PUT	Manage monthly budget
/api/analytics/*	GET	Retrieve analytics data

📊 Dashboard Overview
Section	Description
Overview Cards	Show total spent, budget, and remaining
Progress Bar	Visualize budget usage
Analytics Charts	Pie + Line charts powered by Recharts
Expense Table	Editable month-filtered table
Global Month Selector	Syncs data across dashboard and budget

✨ Notable Highlights
🔄 Global month synchronization via localStorage

🔔 Rounded Toast notifications for all actions

🌗 Light/Dark theme toggle with smooth transitions

🧠 JWT validation and auto-logout

💡 Unified animations and typography

🎨 Refined modern layout and colors

🧾 Changelog
See CHANGELOG.md for version history.
Current Version: v1.6.0
Release Date: November 10, 2025

🧠 Future Enhancements
📤 Export reports (CSV / PDF)

💰 Category-based budget limits

🧮 AI-driven spending insights

📬 Email alerts for overspending

📱 Optimized mobile UI

📸 Screenshots
<table align="center"> <tr> <td align="center"> <img src="https://github.com/user-attachments/assets/89de6b80-ae86-4987-bf95-99828e35318b" alt="Dashboard" width="320"/> <br/><b>Dashboard</b> </td> <td align="center"> <img src="https://github.com/user-attachments/assets/a8d57ca2-0c78-41c9-9dd0-ed257c298e22" alt="Add Expense" width="320"/> <br/><b>Add Expense</b> </td> <td align="center"> <img src="https://github.com/user-attachments/assets/27a55afe-9eb8-4135-9070-be640eb56de0" alt="Analytics" width="320"/> <br/><b>Analytics</b> </td> </tr> <tr> <td align="center"> <img src="https://github.com/user-attachments/assets/a8d13d48-e4b0-4018-95df-d535ad2ee5e7" alt="Budget Tracker" width="320"/> <br/><b>Budget Tracker</b> </td> <td align="center"> <img src="https://github.com/user-attachments/assets/a598fabe-28a7-436a-aad3-7b7355ad9537" alt="Login" width="320"/> <br/><b>Login</b> </td> <td align="center"> <img src="https://github.com/user-attachments/assets/6b06afd0-be56-4e85-b650-cf745d0ccdf8" alt="Signup" width="320"/> <br/><b>Signup</b> </td> </tr> </table>
👨‍💻 Author
Aashirwad Pradhan
🎓 MCA Student — Sapthagiri NPS University
💼 Full-Stack Developer | React + Spring Boot + MySQL
📅 Last Updated: November 10, 2025

🪪 License
Licensed under the MIT License — you’re free to use, modify, and distribute it with attribution.

💜 Phainance — Because managing your money should feel effortless.
