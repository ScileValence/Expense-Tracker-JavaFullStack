import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

// Utility for token validation
function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || !decodeToken(token)) {
      navigate('/login');
      return;
    }
    fetchAll();
  }, [navigate]);

  const fetchAll = () => {
    api.get('/expenses')
      .then(res => setExpenses(res.data))
      .catch(err => console.error(err));
  };

  const onEdit = (id) => navigate(`/add?id=${id}`);

  const onDelete = (id) => {
    if (!window.confirm('Delete this expense?')) return;
    api.delete(`/expenses/${id}`)
      .then(() => fetchAll())
      .catch(err => console.error(err));
  };

  return (
    <div className="container">
      <div className="card">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2>All Expenses</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              onClick={() => navigate('/add')}
              style={{
                background: '#3b82f6',
                color: '#fff',
                border: 'none',
                padding: '8px 14px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              + Add New
            </button>

            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              style={{
                background: '#e5e7eb',
                color: '#111',
                border: 'none',
                padding: '8px 14px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              ← Back
            </button>
          </div>
        </div>

        {/* Expense Table */}
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Description</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map(e => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>₹{e.amount}</td>
                  <td>{e.category ? e.category.name : 'N/A'}</td>
                  <td>{e.date}</td>
                  <td>{e.description}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      onClick={() => onEdit(e.id)}
                      style={{
                        background: '#3b82f6',
                        color: '#fff',
                        border: 'none',
                        padding: '6px 10px',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(e.id)}
                      style={{
                        marginLeft: 8,
                        background: '#ef4444',
                        color: '#fff',
                        border: 'none',
                        padding: '6px 10px',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                  No expenses recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
