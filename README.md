# 💜 Phainance — Smart Expense Tracker  

![Version](https://img.shields.io/badge/version-1.6.0-blue.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-lightgrey.svg)
![Frontend](https://img.shields.io/badge/frontend-React%20%2B%20Vite-61DBFB.svg)
![Backend](https://img.shields.io/badge/backend-Spring%20Boot-6DB33F.svg)
![Database](https://img.shields.io/badge/database-MySQL-4479A1.svg)

> **Phainance** is a full-stack personal finance web application designed to help users manage their expenses, budgets, and savings effectively — all within a clean, elegant, and responsive interface.  
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
- Categorize expenses with real-time updates  
- Smooth animations and responsive layout  

### 🎯 Budget Management  
- Set and manage **monthly budgets**  
- Auto-calculate spent, remaining, and usage %  
- Persistent month tracking via localStorage  
- Visual progress indicators  

### 📊 Analytics Dashboard  
- Category-wise breakdown (**Pie Chart**)  
- Daily spending trend (**Line Chart**)  
- Fully responsive Recharts visualization  
- Optimized layout to prevent chart clipping  
- Toggle analytics visibility on demand  

### 🔔 UI & UX Enhancements  
- Modern **lavender-white gradient** design  
- **Rounded toast notifications** with gradient backgrounds  
- Soft fade and card entrance animations  
- Centered, clean layout for Add Expense and Budget pages  
- New **dune-inspired background** for login/signup  

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
/api/budget	GET / POST / PUT	Get or update monthly budget
/api/analytics/*	GET	Retrieve analytics data

📊 Dashboard Overview
Section	Description
Overview Cards	Shows total spent, budget, and remaining
Progress Bar	Visual indicator of monthly usage
Analytics Charts	Dynamic data visualization (Pie + Line)
Expense Table	Month-filtered editable list
Global Month Selector	Syncs data across dashboard and budget

✨ Notable Highlights
🔄 Global month synchronization via localStorage

🔔 Rounded Toast Notifications for all user actions

🌗 Light/Dark Theme Toggle with smooth transitions

🧠 Intelligent JWT handling for session management

💡 Unified animations and consistent typography

🧾 Refined spacing, color palette, and modern layout

🧾 Changelog
See full details in CHANGELOG.md

Current Version: v1.6.0
Release Date: November 10, 2025

🧠 Future Enhancements
📤 Export reports to CSV / PDF

💰 Category-based budget limits

🧠 AI-driven spending insights

📬 Email notifications for overspending

📱 Enhanced mobile UI

📸 Screenshots
Below are sample previews. Replace with your own screenshots when deploying.
<img width="2774" height="1482" alt="image_2025-11-10_143629676" src="https://github.com/user-attachments/assets/0848c92f-d494-4830-8908-4c03f9c26464" />
<img width="2780" height="1477" alt="image_2025-11-10_144050361" src="https://github.com/user-attachments/assets/5590e000-c96b-4101-a5b0-3c6bfe560efe" />
<img width="2788" height="1490" alt="login" src="https://github.com/user-attachments/assets/85573156-6139-4cb4-b5e2-a649deaa1d39" />
<img width="2780" height="1484" alt="signup" src="https://github.com/user-attachments/assets/ee9e2a93-94f1-4390-93a7-f13fb7b0bcde" />
![dashboard](https://github.com/user-attachments/assets/48a92308-dbe6-4393-97b4-3f04b1b8b37a)
<img width="2770" height="1460" alt="all" src="https://github.com/user-attachments/assets/06382216-0348-4b08-88ea-6b3e9e74d2ca" />
<img width="2720" height="1456" alt="add" src="https://github.com/user-attachments/assets/d596e1b6-e0e7-4192-bca3-e5e9fce5cbb5" />
<img width="2712" height="1442" alt="budget" src="https://github.com/user-attachments/assets/9868b44d-9e81-4ae7-a502-d54b9093b7ae" />

Dashboard	Add Expense	Analytics

Expense List	Budget Tracker	Login / Signup

👨‍💻 Author
Aashirwad Pradhan
🎓 MCA Student — Sapthagiri NPS University
💼 Full-Stack Developer | React + Spring Boot + MySQL
📅 Last Updated: November 10, 2025

🪪 License
This project is licensed under the MIT License.
You’re free to use, modify, and distribute it with proper attribution.

💜 Phainance — Because managing your money should feel effortless.
