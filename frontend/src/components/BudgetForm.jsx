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

export default function BudgetForm() {
  const [limit, setLimit] = useState("");
  const [info, setInfo] = useState({ month: "", limit: 0, spent: 0 });
  const [month, setMonth] = useState(
    localStorage.getItem("selectedMonth") || new Date().toISOString().slice(0, 7)
  );
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !decodeToken(token)) {
      navigate("/login");
      return;
    }
    fetchBudget();
  }, [month, navigate]);

  const fetchBudget = () => {
    api
      .get(`/budget?month=${month}`)
      .then((res) => {
        setInfo(res.data || { month, limit: 0, spent: 0 });
        setLimit(res.data?.limit ?? "");
      })
      .catch(() => toast.error("Failed to fetch budget data"));
  };

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      limitAmount: parseFloat(limit) || 0,
      month: month,
    };

    api
      .post(`/budget`, payload)
      .then(() => {
        toast.success("Budget saved successfully");
        fetchBudget();
      })
      .catch(() => toast.error("Error saving budget"));
  };

  const formattedMonth = new Date(`${month}-01`).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

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
          <h2>Set Monthly Budget</h2>
          <p className="small">Manage your spending goals for {formattedMonth}</p>
        </div>

        <div className="analytics-card add-expense-card" style={{ maxWidth: 720 }}>
          <h3 className="form-title">Budget Details</h3>

          <form onSubmit={submit} className="add-expense-form">
            <div className="form-group">
              <label>Select Month</label>
              <input
                type="month"
                value={month}
                onChange={(e) => {
                  const selected = e.target.value;
                  setMonth(selected);
                  localStorage.setItem("selectedMonth", selected);
                }}
                required
              />
              <div className="small" style={{ marginTop: "6px" }}>
                Selected month: <strong>{formattedMonth}</strong>
              </div>
            </div>

            <div className="form-group">
              <label>Budget Limit (₹)</label>
              <input
                type="number"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                placeholder={info.limit ? `Current: ₹${info.limit}` : "Enter budget limit"}
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="theme-btn small-btn">
                Save Budget
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="cancel-btn small-btn"
              >
                Cancel
              </button>
            </div>
          </form>

          {info.limit > 0 && (
            <div className="budget-summary-card" style={{ marginTop: 18 }}>
              <h4>Current Budget Overview</h4>
              <div className="small" style={{ marginTop: 6 }}>
                Limit: ₹{info.limit} • Spent: ₹{info.spent} • Remaining: ₹{(info.limit - info.spent).toFixed(2)}
              </div>

              <div className="progress-bar" style={{ marginTop: 12 }}>
                <div
                  className="progress-fill"
                  style={{
                    width: `${Math.min((info.spent / info.limit) * 100, 100)}%`,
                    background:
                      info.spent / info.limit > 0.9
                        ? "#d9534f"
                        : info.spent / info.limit > 0.7
                        ? "#f0ad4e"
                        : "#28a745",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
