import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

function percentColor(p) {
  if (p < 70) return "#5cb85c"; // green
  if (p < 90) return "#f0ad4e"; // orange
  return "#d9534f"; // red
}

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [budgetData, setBudgetData] = useState({ month: "", limit: 0, spent: 0 });
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const decoded = decodeToken(token);
    if (!decoded) {
      localStorage.removeItem("token");
      navigate("/login");
      return;
    }

    const expiry = decoded.exp * 1000;
    if (Date.now() > expiry) {
      localStorage.removeItem("token");
      navigate("/login");
      return;
    }

    setUsername(decoded.sub || "User");
    fetchAll();
    fetchBudget();
  }, [navigate]);

  const fetchAll = async () => {
    try {
      const res = await api.get("/expenses");
      setExpenses(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  const fetchBudget = async () => {
    try {
      const res = await api.get("/budget");
      setBudgetData(res.data);
    } catch (err) {
      console.error("Error fetching budget:", err);
    }
  };

  const total = expenses.reduce((s, e) => s + (e.amount || 0), 0);
  const limit = budgetData.limit || 0;
  const remaining = limit - total;
  const pct = limit > 0 ? Math.round((total / limit) * 100) : 0;
  const color = percentColor(pct);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleTheme = () => {
    const current = document.body.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h2>Expense Tracker — Dashboard</h2>
          <div className="nav" style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span className="small">👋 Hello, {username}</span>
            <Link to="/add">Add</Link>
            <Link to="/list">All</Link>
            <Link to="/budget">Budget</Link>
            <button onClick={toggleTheme} className="theme-toggle">
              🌓 Theme
            </button>
            <button
              onClick={logout}
              style={{
                marginLeft: 10,
                background: "#d9534f",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: 5,
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Overview cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <div className="card small" style={{ borderTop: "4px solid #007bff" }}>
            <strong>Spent this month</strong>
            <div style={{ fontSize: "1.8rem", marginTop: 8 }}>₹{total.toFixed(2)}</div>
            <div className="small">Month: {budgetData.month || "—"}</div>
          </div>

          <div className="card small" style={{ borderTop: "4px solid #28a745" }}>
            <strong>Budget</strong>
            <div style={{ fontSize: "1.8rem", marginTop: 8 }}>₹{limit.toFixed(2)}</div>
            <div className="small">Remaining: ₹{remaining.toFixed(2)}</div>
          </div>

          <div className="card small" style={{ borderTop: `4px solid ${color}` }}>
            <strong>Usage</strong>
            <div style={{ fontSize: "1.8rem", marginTop: 8 }}>{pct}%</div>
            <div className="small">Budget utilization</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="card">
          <strong>Budget Progress</strong>
          <div
            style={{
              marginTop: 8,
              background: "#ddd",
              borderRadius: "6px",
              overflow: "hidden",
              height: "10px",
            }}
          >
            <div
              style={{
                width: `${Math.min(pct, 100)}%`,
                background: color,
                height: "100%",
              }}
            ></div>
          </div>
        </div>

        {/* Recent Expenses */}
        <div className="card" style={{ marginTop: 16 }}>
          <h3>Recent expenses</h3>
          {expenses.length === 0 ? (
            <p className="small" style={{ marginTop: 10 }}>
              No expenses recorded yet.
            </p>
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
                {expenses.slice(0, 10).map((e) => (
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
