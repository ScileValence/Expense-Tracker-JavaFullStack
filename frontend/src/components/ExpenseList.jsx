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

export default function ExpenseList() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    amount: "",
    description: "",
    date: "",
    categoryId: "",
  });
  const [month, setMonth] = useState(
    localStorage.getItem("selectedMonth") || new Date().toISOString().slice(0, 7)
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !decodeToken(token)) {
      navigate("/login");
      return;
    }
    fetchExpenses();
    fetchCategories();
  }, [month, navigate]);

  const fetchExpenses = () => {
    api
      .get(`/expenses?month=${month}`)
      .then((res) => setExpenses(res.data || []))
      .catch(() => toast.error("Failed to load expenses."));
  };

  const fetchCategories = () => {
    api
      .get("/categories")
      .then((res) => setCategories(res.data || []))
      .catch(() => toast.error("Failed to load categories."));
  };

  const handleEditClick = (expense) => {
    setEditId(expense.id);
    setEditForm({
      amount: expense.amount,
      description: expense.description,
      date: expense.date,
      categoryId: expense.category?.id || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = (id) => {
    api
      .put(`/expenses/${id}`, {
        amount: parseFloat(editForm.amount),
        description: editForm.description,
        date: editForm.date,
        categoryId: editForm.categoryId ? parseInt(editForm.categoryId) : null,
      })
      .then(() => {
        toast.success("Expense updated successfully!");
        setEditId(null);
        fetchExpenses();
      })
      .catch(() => toast.error("Failed to update expense."));
  };

  const deleteExpense = (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    api
      .delete(`/expenses/${id}`)
      .then(() => {
        toast.info("Expense deleted successfully!");
        fetchExpenses();
      })
      .catch(() => toast.error("Error deleting expense."));
  };

  const formattedMonth = new Date(`${month}-01`).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content fade-in">
        {/* Header */}
        <div className="dash-header fade-in">
          <div>
            <h2>Expense List</h2>
            <p className="small">📅 Showing expenses for {formattedMonth}</p>
          </div>
          <div className="dash-controls">
            <input
              type="month"
              value={month}
              onChange={(e) => {
                const selected = e.target.value;
                setMonth(selected);
                localStorage.setItem("selectedMonth", selected);
              }}
              className="month-selector"
            />
            <button
              className="theme-btn small-btn"
              onClick={() => navigate("/add")}
            >
              ➕ Add Expense
            </button>
          </div>
        </div>

        {/* Expense Table */}
        <div className="analytics-card fade-in">
          {expenses.length === 0 ? (
            <p className="small" style={{ textAlign: "center", marginTop: "1rem" }}>
              No expenses found for this month.
            </p>
          ) : (
            <table className="table fade-in">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Amount (₹)</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="fade-in"
                    style={{ transition: "all 0.3s ease" }}
                  >
                    <td>{expense.id}</td>
                    <td>
                      {editId === expense.id ? (
                        <input
                          type="number"
                          name="amount"
                          value={editForm.amount}
                          onChange={handleEditChange}
                          className="edit-input"
                        />
                      ) : (
                        `₹${expense.amount}`
                      )}
                    </td>

                    <td>
                      {editId === expense.id ? (
                        <select
                          name="categoryId"
                          value={editForm.categoryId}
                          onChange={handleEditChange}
                          className="edit-select"
                        >
                          <option value="">-- Select --</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        expense.category?.name || "N/A"
                      )}
                    </td>

                    <td>
                      {editId === expense.id ? (
                        <input
                          type="date"
                          name="date"
                          value={editForm.date}
                          onChange={handleEditChange}
                          className="edit-input"
                        />
                      ) : (
                        expense.date
                      )}
                    </td>

                    <td>
                      {editId === expense.id ? (
                        <input
                          type="text"
                          name="description"
                          value={editForm.description}
                          onChange={handleEditChange}
                          className="edit-input"
                        />
                      ) : (
                        expense.description
                      )}
                    </td>

                    <td>
                      <div className="action-buttons">
                        {editId === expense.id ? (
                          <>
                            <button
                              onClick={() => saveEdit(expense.id)}
                              className="theme-btn small-btn"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditId(null)}
                              className="cancel-btn small-btn"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEditClick(expense)}
                              className="theme-btn small-btn"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteExpense(expense.id)}
                              className="delete-btn small-btn"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
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
