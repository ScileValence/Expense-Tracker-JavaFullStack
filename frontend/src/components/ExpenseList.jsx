import React, { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function ListExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [month, setMonth] = useState(
    localStorage.getItem("selectedMonth") || new Date().toISOString().slice(0, 7)
  );
  const navigate = useNavigate();

  // ✅ Fetch expenses filtered by month
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

  useEffect(() => {
    fetchExpenses(month);
  }, [month, fetchExpenses]);

  // Sync with global month (if changed in other tab or dashboard)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "selectedMonth" && e.newValue) setMonth(e.newValue);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleMonthChange = (e) => {
    const newMonth = e.target.value;
    setMonth(newMonth);
    localStorage.setItem("selectedMonth", newMonth);
    fetchExpenses(newMonth);
  };

  const deleteExpense = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    try {
      await api.delete(`/expenses/${id}`);
      fetchExpenses(month);
    } catch (err) {
      console.error("❌ Error deleting expense:", err);
    }
  };

  const formattedMonth = new Date(`${month}-01`).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="container fade-in">
      <div className="card">
        {/* Header */}
        <div className="header" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <h2>Expenses — {formattedMonth}</h2>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <label className="small">
              Select Month:{" "}
              <input
                type="month"
                value={month}
                onChange={handleMonthChange}
                style={{
                  padding: "6px",
                  borderRadius: "6px",
                  border: "1px solid var(--border-color)",
                  background: "var(--card-bg)",
                  color: "var(--text-color)",
                }}
              />
            </label>
            <Link to="/add" className="btn btn-primary">
              + Add
            </Link>
            <button
              onClick={() => navigate("/dashboard")}
              style={{
                background: "var(--border-color)",
                color: "var(--text-color)",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              ← Back
            </button>
          </div>
        </div>

        {/* Table */}
        {expenses.length === 0 ? (
          <p className="small" style={{ marginTop: 12 }}>
            No expenses recorded for this month.
          </p>
        ) : (
          <table className="table" style={{ marginTop: "1rem" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount (₹)</th>
                <th>Category</th>
                <th>Date</th>
                <th>Description</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((e) => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>₹{e.amount}</td>
                  <td>{e.category ? e.category.name : "N/A"}</td>
                  <td>{e.date}</td>
                  <td>{e.description}</td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      onClick={() => navigate(`/edit/${e.id}`)}
                      style={{
                        marginRight: "8px",
                        background: "var(--accent)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        padding: "4px 10px",
                        cursor: "pointer",
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => deleteExpense(e.id)}
                      style={{
                        background: "#d9534f",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        padding: "4px 10px",
                        cursor: "pointer",
                      }}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
