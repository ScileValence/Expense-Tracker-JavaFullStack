import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import BudgetForm from "./components/BudgetForm";

import "./styles.css";

// 🌙 Load saved or system theme
const savedTheme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
document.body.setAttribute("data-theme", savedTheme);

ReactDOM.createRoot(document.getElementById("root")).render(
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
  </BrowserRouter>
);
