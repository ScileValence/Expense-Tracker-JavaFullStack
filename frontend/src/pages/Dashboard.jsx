import React, { useEffect, useState } from 'react';
import api from '../api'; // unified Axios instance
import { Link, useNavigate } from 'react-router-dom';

// Decode JWT payload to extract username and expiry
function decodeToken(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch {
    return null;
  }
}

function percentColor(p) {
  if (p < 70) return '#5cb85c'; // green
  if (p < 90) return '#f0ad4e'; // orange
  return '#d9534f'; // red
}

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [budgetData, setBudgetData] = useState({ month: '', limit: 0, spent: 0 });
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check JWT token
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const decoded = decodeToken(token);
    if (!decoded) {
      localStorage.removeItem('token');
      navigate('/login');
      return;
    }

    const expiry = decoded.exp * 1000;
    if (Date.now() > expiry) {
      alert('Session expired. Please login again.');
      localStorage.removeItem('token');
      navigate('/login');
      return;
    }

    setUsername(decoded.sub || 'User');
    fetchAll();
    fetchBudget();
  }, [navigate]);

  function fetchAll() {
    api
      .get('/expenses')
      .then((res) => setExpenses(res.data))
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 401) {
          alert('Session expired. Please log in again.');
          localStorage.removeItem('token');
          navigate('/login');
        }
      });
  }

  function fetchBudget() {
    api
      .get('/budget')
      .then((res) => setBudgetData(res.data))
      .catch((err) => console.error(err));
  }

  const total = expenses.reduce((s, e) => s + (e.amount || 0), 0);
  const limit = budgetData.limit || 0;
  const pct = limit > 0 ? Math.round((total / limit) * 100) : 0;
  const color = percentColor(pct);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="card">
        <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Expense Tracker — Dashboard</h2>
          <div className="nav" style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <span className="small">👋 Hello, {username}</span>
            <Link to="/add">Add</Link>
            <Link to="/list">All</Link>
            <Link to="/budget">Budget</Link>
            <button onClick={logout} style={{
              marginLeft: 10,
              background: '#d9534f',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: 5,
              cursor: 'pointer'
            }}>
              Logout
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ flex: 1 }} className="card small">
            <div><strong>Spent this month</strong></div>
            <div style={{ fontSize: '1.6rem', marginTop: 8 }}>₹{total.toFixed(2)}</div>
            <div className="small">Month: {budgetData.month || '—'}</div>
          </div>

          <div style={{ flex: 1 }} className="card small">
            <div><strong>Budget</strong></div>
            <div style={{ fontSize: '1.6rem', marginTop: 8 }}>₹{limit.toFixed(2)}</div>
            <div className="small">Remaining: ₹{(limit - total).toFixed(2)}</div>
          </div>
        </div>

        <div style={{ marginTop: 16 }} className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div><strong>Budget usage</strong></div>
            <div className="small">{pct}%</div>
          </div>
          <div style={{ marginTop: 8 }} className="progress">
            <div style={{ width: `${Math.min(pct, 100)}%`, background: color, height: '8px', borderRadius: '4px' }}></div>
          </div>
        </div>

        <div style={{ marginTop: 16 }} className="card">
          <h3>Recent expenses</h3>
          <table className="table">
            <thead>
              <tr><th>ID</th><th>Amount</th><th>Category</th><th>Date</th><th>Description</th></tr>
            </thead>
            <tbody>
              {expenses.slice(0, 10).map((e) => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>₹{e.amount}</td>
                  <td>{e.category ? e.category.name : 'N/A'}</td>
                  <td>{e.date}</td>
                  <td>{e.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
