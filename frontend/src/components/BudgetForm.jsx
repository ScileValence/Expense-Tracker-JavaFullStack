import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

// Utility: decode JWT payload
function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export default function BudgetForm() {
  const [limit, setLimit] = useState('');
  const [info, setInfo] = useState({ month: '', limit: 0, spent: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || !decodeToken(token)) {
      navigate('/login');
      return;
    }
    fetchBudget();
  }, [navigate]);

  const fetchBudget = () => {
    api
      .get('/budget')
      .then(res => setInfo(res.data))
      .catch(err => console.error(err));
  };

  const submit = (e) => {
    e.preventDefault();
    const payload = { limitAmount: parseFloat(limit) };
    const request = info.limit && info.limit > 0
      ? api.put('/budget', payload)
      : api.post('/budget', payload);

    request
      .then(() => navigate('/dashboard'))
      .catch(err => console.error(err));
  };

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Set Monthly Budget</h2>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            style={{
              background: '#e5e7eb',
              color: '#111',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            ← Back
          </button>
        </div>

        <div className="small" style={{ marginBottom: 16 }}>
          Current month: <strong>{info.month || '—'}</strong>
        </div>

        <form onSubmit={submit} style={{ marginTop: 8 }}>
          <div className="form-row">
            <label>Limit amount (₹)</label>
            <input
              type="number"
              value={limit}
              onChange={e => setLimit(e.target.value)}
              placeholder={info.limit ? `Current: ₹${info.limit}` : 'Enter budget limit'}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 15 }}>
            <button
              type="submit"
              style={{
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Save Budget
            </button>

            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              style={{
                background: '#d1d5db',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </form>

        {info.limit > 0 && (
          <div style={{ marginTop: 20 }}>
            <div style={{ fontWeight: 500, marginBottom: 6 }}>Current Budget Overview:</div>
            <div className="card small" style={{ background: '#f9fafb' }}>
              <div>💰 Limit: ₹{info.limit}</div>
              <div>💸 Spent: ₹{info.spent}</div>
              <div>🟢 Remaining: ₹{(info.limit - info.spent).toFixed(2)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
