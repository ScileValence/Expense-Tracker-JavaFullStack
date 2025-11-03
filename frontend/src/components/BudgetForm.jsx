import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

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
      .catch((err) => console.error("❌ Error fetching budget:", err));
  };

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      limitAmount: parseFloat(limit) || 0,
      month: month, // ✅ Pass selected month in request body
    };

    api
      .post(`/budget`, payload)
      .then(() => {
        alert(`✅ Budget for ${formattedMonth} saved successfully!`);
        fetchBudget();
      })
      .catch((err) => console.error("❌ Error saving budget:", err));
  };

  const formattedMonth = new Date(`${month}-01`).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="container fade-in">
      <div className="card" style={{ animation: "fadeIn 0.4s ease-in" }}>
        {/* Header */}
        <div className="header" style={{ marginBottom: "1rem" }}>
          <h2 style={{ color: "var(--text-color)" }}>Set Monthly Budget</h2>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              style={{
                background: "var(--card-bg)",
                color: "var(--text-color)",
                border: "1px solid var(--border-color)",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              ← Back
            </button>
          </div>
        </div>

        {/* Month Selector */}
        <div style={{ marginBottom: "1rem" }}>
          <label className="small" style={{ display: "block", marginBottom: 6 }}>
            Select Month
          </label>
          <input
            type="month"
            value={month}
            onChange={(e) => {
              const selected = e.target.value;
              setMonth(selected);
              localStorage.setItem("selectedMonth", selected);
            }}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid var(--border-color)",
              background: "var(--card-bg)",
              color: "var(--text-color)",
            }}
          />
          <div className="small" style={{ marginTop: "6px" }}>
            📅 Selected month: <strong>{formattedMonth}</strong>
          </div>
        </div>

        {/* Form Section */}
        <form
          onSubmit={submit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "0.5rem",
          }}
        >
          <div>
            <label style={{ display: "block", fontWeight: 600 }}>
              Budget Limit (₹)
            </label>
            <input
              type="number"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              placeholder={
                info.limit ? `Current: ₹${info.limit}` : "Enter budget limit"
              }
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                background: "var(--card-bg)",
                color: "var(--text-color)",
                transition: "border-color 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border-color)")}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "10px",
              justifyContent: "flex-end",
            }}
          >
            <button
              type="submit"
              style={{
                background: "var(--accent)",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#3b3eff")}
              onMouseLeave={(e) => (e.target.style.background = "var(--accent)")}
            >
              Save Budget
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              style={{
                background: "var(--border-color)",
                color: "var(--text-color)",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Budget Overview Card */}
        {info.limit > 0 && (
          <div
            style={{
              marginTop: "2rem",
              background: "var(--bg-color)",
              padding: "1rem",
              borderRadius: "10px",
              border: "1px solid var(--border-color)",
            }}
          >
            <div
              style={{
                fontWeight: 600,
                marginBottom: "0.5rem",
                color: "var(--text-color)",
              }}
            >
              Current Budget Overview
            </div>
            <div className="small">
              💰 Limit: ₹{info.limit}
              <br />
              💸 Spent: ₹{info.spent}
              <br />
              🟢 Remaining: ₹{(info.limit - info.spent).toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
