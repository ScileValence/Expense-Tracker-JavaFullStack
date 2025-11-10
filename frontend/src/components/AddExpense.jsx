import React, { useEffect, useState } from "react";
import api from "../api";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/dashboard.css";

function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export default function AddExpense() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    categoryId: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !decodeToken(token)) {
      navigate("/login");
      return;
    }
    fetchCategories();
  }, [navigate]);

  const fetchCategories = () => {
    api
      .get("/categories")
      .then((res) => setCategories(res.data || []))
      .catch(() => toast.error("Failed to load categories."));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitExpense = (e) => {
    e.preventDefault();
    const payload = {
      amount: parseFloat(form.amount) || 0,
      description: form.description.trim(),
      date: form.date,
      categoryId: form.categoryId ? parseInt(form.categoryId) : null,
    };

    api
      .post("/expenses", payload)
      .then(() => {
        toast.success("Expense added successfully");
        navigate("/list");
      })
      .catch(() => toast.error("Failed to add expense"));
  };

  const formattedMonth = new Date(`${(localStorage.getItem("selectedMonth") || new Date().toISOString().slice(0,7))}-01`)
    .toLocaleString("default", { month: "long", year: "numeric" });

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content add-expense-container fade-in">
        <div className="back-btn-container">
          <button
            onClick={() => navigate("/dashboard")}
            className="theme-btn small-btn"
          >
            ← Back
          </button>
        </div>

        <div className="add-expense-header">
          <h2>Add New Expense</h2>
          <p className="small">Track your spending for {formattedMonth}</p>
        </div>

        <div className="analytics-card add-expense-card">
          <h3 className="form-title">Expense Details</h3>

          <form onSubmit={submitExpense} className="add-expense-form">
            <div className="form-group">
              <label>Amount (₹)</label>
              <input
                type="number"
                step="0.01"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                required
                placeholder="Enter expense amount"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                placeholder="E.g., Grocery shopping"
              />
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="theme-btn small-btn">
                Add Expense
              </button>
              <button
                type="button"
                onClick={() => navigate("/list")}
                className="cancel-btn small-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
