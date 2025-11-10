import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import BudgetForm from "./components/BudgetForm";

import { AppProvider } from "./context/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

// 🌙 Load saved or system theme
const savedTheme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
document.body.setAttribute("data-theme", savedTheme);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<AddExpense />} />
          <Route path="/list" element={<ExpenseList />} />
          <Route path="/budget" element={<BudgetForm />} />
        </Routes>

        {/* ✅ Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={savedTheme === "dark" ? "dark" : "light"}
          style={{ fontFamily: "Poppins, Inter, sans-serif" }}
        />
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);
