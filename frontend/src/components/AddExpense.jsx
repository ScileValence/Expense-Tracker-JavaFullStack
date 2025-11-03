import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate, useSearchParams } from "react-router-dom";

function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export default function AddExpense() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const editId = searchParams.get("id");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !decodeToken(token)) {
      navigate("/login");
      return;
    }

    api.get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));

    if (editId) {
      api.get("/expenses")
        .then((res) => {
          const found = res.data.find((x) => String(x.id) === String(editId));
          if (found) {
            setAmount(found.amount || "");
            setDescription(found.description || "");
            setCategoryId(found.category ? found.category.id : "");
          }
        })
        .catch((err) => console.error(err));
    }
  }, [editId, navigate]);

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      amount: parseFloat(amount),
      description,
      categoryId: categoryId ? parseInt(categoryId) : null,
    };

    const request = editId
      ? api.put(`/expenses/${editId}`, payload)
      : api.post("/expenses", payload);

    request.then(() => navigate("/dashboard")).catch((err) => console.error(err));
  };

  return (
    <div className="container fade-in">
      <div className="card" style={{ animation: "fadeIn 0.4s ease-in" }}>
        {/* Header */}
        <div className="header" style={{ marginBottom: "1rem" }}>
          <h2 style={{ color: "var(--text-color)" }}>
            {editId ? "Edit Expense" : "Add New Expense"}
          </h2>
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
            <label style={{ display: "block", fontWeight: 600 }}>Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter expense amount"
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

          <div>
            <label style={{ display: "block", fontWeight: 600 }}>Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                background: "var(--card-bg)",
                color: "var(--text-color)",
              }}
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontWeight: 600 }}>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                background: "var(--card-bg)",
                color: "var(--text-color)",
              }}
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
              {editId ? "Update Expense" : "Add Expense"}
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
      </div>
    </div>
  );
}
