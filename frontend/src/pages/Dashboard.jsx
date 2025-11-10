import React, { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  Legend as ReLegend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "../styles/dashboard.css";

function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

function percentColor(p) {
  if (p < 70) return "#5cb85c";
  if (p < 90) return "#f0ad4e";
  return "#d9534f";
}

export default function Dashboard() {
  const navigate = useNavigate();

  const initialMonth =
    localStorage.getItem("selectedMonth") ||
    new Date().toISOString().slice(0, 7);
  const [month, setMonth] = useState(initialMonth);
  const [username, setUsername] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [budgetData, setBudgetData] = useState({ month: "", limit: 0, spent: 0 });
  const [categoryData, setCategoryData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [showAnalytics, setShowAnalytics] = useState(true);

  const COLORS = [
    "#007bff",
    "#28a745",
    "#f0ad4e",
    "#d9534f",
    "#6f42c1",
    "#00bcd4",
    "#ff7f50",
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    const decoded = decodeToken(token);
    if (!decoded) {
      localStorage.removeItem("token");
      return navigate("/login");
    }
    if (Date.now() > decoded.exp * 1000) {
      localStorage.removeItem("token");
      return navigate("/login");
    }
    setUsername(decoded.sub || "User");
  }, [navigate]);

  // ✅ Fetch Expenses (filtered by month)
  const fetchExpenses = useCallback(
    async (forMonth) => {
      try {
        const res = await api.get(`/expenses?month=${forMonth}`);
        setExpenses(res.data || []);
      } catch (err) {
        console.error("❌ Error fetching expenses:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    },
    [navigate]
  );

  // ✅ Fetch Budget
  const fetchBudget = useCallback(async (forMonth) => {
    try {
      const res = await api.get(`/budget?month=${forMonth}`);
      setBudgetData(res.data || { month: forMonth, limit: 0, spent: 0 });
    } catch (err) {
      console.error("❌ Error fetching budget:", err);
    }
  }, []);

  // ✅ Fetch Analytics
  const fetchAnalytics = useCallback(async (forMonth) => {
    try {
      const [catRes, , dailyRes] = await Promise.all([
        api.get(`/analytics/category?month=${forMonth}`),
        api.get(`/analytics/monthly?month=${forMonth}`),
        api.get(`/analytics/daily?month=${forMonth}`),
      ]);
      setCategoryData(catRes.data || []);
      setDailyData(dailyRes.data || []);
    } catch (err) {
      console.error("❌ Analytics fetch failed:", err);
    }
  }, []);

  useEffect(() => {
    if (!month) return;
    localStorage.setItem("selectedMonth", month);
    fetchExpenses(month);
    fetchBudget(month);
    fetchAnalytics(month);
  }, [month, fetchExpenses, fetchBudget, fetchAnalytics]);

  const totalSpent = expenses.reduce((s, e) => s + (e.amount || 0), 0);
  const limit = budgetData.limit || 0;
  const remaining = limit - totalSpent;
  const pct = limit > 0 ? Math.round((totalSpent / limit) * 100) : 0;
  const color = percentColor(pct);

  const toggleTheme = () => {
    const next =
      document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  const monthLabel = new Date(`${month}-01`).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        {/* Header */}
        <div className="dash-header">
          <div>
            <h2>Dashboard Overview</h2>
            <p className="small">👋 Welcome back, {username}</p>
          </div>

          <div
            className="dash-controls"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="month-selector"
            />

            {/* Smaller Add Expense Button */}
            <button
              className="theme-btn small-btn"
              onClick={() => navigate("/add")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.9rem",
                padding: "8px 14px",
              }}
            >
              ➕ Add Expense
            </button>

            {/* Theme Toggle (Text Only) */}
            <button
              onClick={toggleTheme}
              className="cancel-btn"
              style={{
                padding: "8px 14px",
                fontSize: "0.9rem",
                fontWeight: "500",
              }}
            >
              Toggle Theme
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="summary-grid">
          <div className="summary-card blue">
            <h4>Spent ({monthLabel})</h4>
            <p>₹{totalSpent.toFixed(2)}</p>
          </div>
          <div className="summary-card green">
            <h4>Budget</h4>
            <p>₹{limit.toFixed(2)}</p>
            <span className="small">Remaining: ₹{remaining.toFixed(2)}</span>
          </div>
          <div
            className="summary-card"
            style={{ borderTop: `4px solid ${color}` }}
          >
            <h4>Usage</h4>
            <p>{pct}%</p>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="analytics-card">
          <div
            className="analytics-header"
            onClick={() => setShowAnalytics(!showAnalytics)}
          >
            <h3>📊 Analytics — {monthLabel}</h3>
            <span>{showAnalytics ? "▲" : "▼"}</span>
          </div>

          {showAnalytics && (
            <div className="analytics-charts">
              <div className="chart-block">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={110}
                      label
                    >
                      {categoryData.map((entry, idx) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <ReTooltip />
                    <ReLegend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-block">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ReTooltip />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#28a745"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {/* Recent Expenses */}
        <div className="analytics-card">
          <h3>Recent Expenses — {monthLabel}</h3>
          {expenses.length === 0 ? (
            <p className="small">No expenses for this month.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {expenses.slice(0, 20).map((e) => (
                  <tr key={e.id}>
                    <td>{e.id}</td>
                    <td>₹{e.amount}</td>
                    <td>{e.category ? e.category.name : "N/A"}</td>
                    <td>{e.date}</td>
                    <td>{e.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
