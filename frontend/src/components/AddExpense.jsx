import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Utility: check JWT and decode username
function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export default function AddExpense() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const editId = searchParams.get('id');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || !decodeToken(token)) {
      navigate('/login');
      return;
    }

    api.get('/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));

    if (editId) {
      api.get('/expenses')
        .then(res => {
          const found = res.data.find(x => String(x.id) === String(editId));
          if (found) {
            setAmount(found.amount || '');
            setDescription(found.description || '');
            setCategoryId(found.category ? found.category.id : '');
          }
        })
        .catch(err => console.error(err));
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
      : api.post('/expenses', payload);

    request
      .then(() => navigate('/dashboard'))
      .catch(err => console.error(err));
  };

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>{editId ? 'Edit Expense' : 'Add Expense'}</h2>
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

        <form onSubmit={submit} style={{ marginTop: '20px' }}>
          <div className="form-row">
            <label>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>

          <div className="form-row">
            <label>Category</label>
            <select
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select category</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Optional description"
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
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
              {editId ? 'Update Expense' : 'Add Expense'}
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
      </div>
    </div>
  );
}
