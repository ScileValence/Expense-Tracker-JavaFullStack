import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

export default function AddExpense(){
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    api.get('/categories').then(res=> setCategories(res.data)).catch(err => console.error(err))
  },[])

  const submit = (e)=>{
    e.preventDefault()
    api.post('/expenses', { amount: parseFloat(amount), description, categoryId: categoryId ? parseInt(categoryId) : null })
      .then(()=> navigate('/'))
      .catch(err => console.error(err))
  }

  return (
    <div style={{ maxWidth:500, margin:'20px auto', padding:20 }}>
      <h2>Add Expense</h2>
      <form onSubmit={submit}>
        <div style={{ marginBottom:10 }}>
          <label>Amount</label><br/>
          <input type="number" value={amount} onChange={e=> setAmount(e.target.value)} required/>
        </div>
        <div style={{ marginBottom:10 }}>
          <label>Category</label><br/>
          <select value={categoryId} onChange={e=> setCategoryId(e.target.value)} required>
            <option value="">Select</option>
            {categories.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div style={{ marginBottom:10 }}>
          <label>Description</label><br/>
          <input value={description} onChange={e=> setDescription(e.target.value)}/>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
