import React, { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import {
  PieChart, Pie, Cell, Tooltip as ReTooltip, Legend as ReLegend,
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  BarChart, Bar
} from "recharts";

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
  const [monthlyData, setMonthlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [showAnalytics, setShowAnalytics] = useState(true);

  const COLORS = ["#007bff", "#28a745", "#f0ad4e", "#d9534f", "#6f42c1", "#00bcd4", "#ff7f50"];

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
  const fetchExpenses = useCallback(async (forMonth) => {
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
  }, [navigate]);

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
      const [catRes, monthRes, dailyRes] = await Promise.all([
        api.get(`/analytics/category?month=${forMonth}`),
        api.get(`/analytics/monthly?month=${forMonth}`),
        api.get(`/analytics/daily?month=${forMonth}`)
      ]);

      setCategoryData(catRes.data || []);
      setMonthlyData(monthRes.data || []);
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

  useEffect(() => {
    const onFocus = () => {
      const stored = localStorage.getItem("selectedMonth") || new Date().toISOString().slice(0, 7);
      if (stored !== month) setMonth(stored);
      fetchExpenses(stored);
      fetchBudget(stored);
      fetchAnalytics(stored);
    };
    const onStorage = (e) => {
      if (e.key === "selectedMonth" && e.newValue) setMonth(e.newValue);
    };
    window.addEventListener("focus", onFocus);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("storage", onStorage);
    };
  }, [month, fetchExpenses, fetchBudget, fetchAnalytics]);

  // Derived
  const totalSpent = expenses.reduce((s, e) => s + (e.amount || 0), 0);
  const limit = budgetData.limit || 0;
  const remaining = limit - totalSpent;
  const pct = limit > 0 ? Math.round((totalSpent / limit) * 100) : 0;
  const color = percentColor(pct);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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
    <div className="container">
      <div className="card">
        {/* Header */}
        <div className="header" style={{ alignItems: "center" }}>
          <h2>Expense Tracker — Dashboard</h2>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span className="small">👋 Hello, {username}</span>

            <label className="small" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <span style={{ fontSize: 12 }}>Selected month</span>
              <input
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                style={{
                  padding: "6px 8px",
                  borderRadius: 6,
                  border: "1px solid var(--border-color)",
                  background: "var(--card-bg)",
                  color: "var(--text-color)"
                }}
              />
            </label>

            <Link to="/add">Add</Link>
            <Link to="/list">All</Link>
            <Link to="/budget">Budget</Link>
            <button onClick={toggleTheme}>🌓</button>
            <button onClick={logout} style={{ background: "#d9534f", color: "white", border: "none", padding: "6px 12px", borderRadius: 5 }}>Logout</button>
          </div>
        </div>

        {/* Overview Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginBottom: "1rem", marginTop: "0.75rem" }}>
          <div className="card small" style={{ borderTop: "4px solid #007bff" }}>
            <strong>Spent ({monthLabel})</strong>
            <div style={{ fontSize: "1.6rem", marginTop: 8 }}>₹{totalSpent.toFixed(2)}</div>
          </div>
          <div className="card small" style={{ borderTop: "4px solid #28a745" }}>
            <strong>Budget</strong>
            <div style={{ fontSize: "1.6rem", marginTop: 8 }}>₹{limit.toFixed(2)}</div>
            <div className="small">Remaining: ₹{remaining.toFixed(2)}</div>
          </div>
          <div className="card small" style={{ borderTop: `4px solid ${color}` }}>
            <strong>Usage</strong>
            <div style={{ fontSize: "1.6rem", marginTop: 8 }}>{pct}%</div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="card" style={{ marginBottom: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
            onClick={() => setShowAnalytics(!showAnalytics)}>
            <h3 style={{ margin: 0 }}>📊 Analytics — {monthLabel}</h3>
            <div className="small">{showAnalytics ? "▲" : "▼"}</div>
          </div>

          {showAnalytics && (
            <div style={{ marginTop: 12 }}>
              <div style={{ height: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={110} label>
                      {categoryData.map((entry, idx) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <ReTooltip />
                    <ReLegend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div style={{ height: 300, marginTop: 20 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ReTooltip />
                    <Line type="monotone" dataKey="amount" stroke="#28a745" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {/* Recent Expenses */}
        <div className="card">
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
