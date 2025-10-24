import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function AddExpense(){
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useState([])
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const editId = searchParams.get('id')

  useEffect(()=>{
    api.get('/categories').then(res=> setCategories(res.data)).catch(err => console.error(err))
    if(editId){
      api.get('/expenses').then(res=>{
        const found = res.data.find(x=> String(x.id) === String(editId))
        if(found){
          setAmount(found.amount || '')
          setDescription(found.description || '')
          setCategoryId(found.category ? found.category.id : '')
        }
      })
    }
  },[editId])

  const submit = (e)=>{
    e.preventDefault()
    const payload = { amount: parseFloat(amount), description, categoryId: categoryId ? parseInt(categoryId) : null }
    if(editId){
      api.put(`/expenses/${editId}`, payload).then(()=> navigate('/')).catch(err=> console.error(err))
    } else {
      api.post('/expenses', payload).then(()=> navigate('/')).catch(err=> console.error(err))
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>{editId ? 'Edit Expense' : 'Add Expense'}</h2>
        <form onSubmit={submit}>
          <div className="form-row">
            <label>Amount</label><br/>
            <input type="number" value={amount} onChange={e=> setAmount(e.target.value)} required />
          </div>
          <div className="form-row">
            <label>Category</label><br/>
            <select value={categoryId} onChange={e=> setCategoryId(e.target.value)} required>
              <option value="">Select</option>
              {categories.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="form-row">
            <label>Description</label><br/>
            <input value={description} onChange={e=> setDescription(e.target.value)} />
          </div>
          <div style={{display:'flex', gap:8}}>
            <button type="submit">{editId ? 'Update' : 'Add'}</button>
            <button type="button" onClick={()=> navigate('/')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
