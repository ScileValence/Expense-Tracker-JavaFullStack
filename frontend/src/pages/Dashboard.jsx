import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import { Link } from 'react-router-dom'

export default function Dashboard(){
  const [expenses, setExpenses] = useState([])
  useEffect(()=>{
    api.get('/expenses').then(res => setExpenses(res.data)).catch(err => console.error(err))
  },[])

  const total = expenses.reduce((s,e)=> s + (e.amount||0), 0)

  return (
    <div style={{ maxWidth:800, margin:'20px auto', padding:20 }}>
      <h1>Expense Tracker</h1>
      <div style={{ marginBottom:10 }}>
        <Link to="/add">Add Expense</Link> | <Link to="/list">All Expenses</Link>
      </div>
      <div style={{ marginBottom:20 }}>
        <strong>Total:</strong> ₹{total.toFixed(2)}
      </div>
      <table style={{ width:'100%', borderCollapse:'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom:'1px solid #ccc', textAlign:'left' }}>ID</th>
            <th style={{ borderBottom:'1px solid #ccc', textAlign:'left' }}>Amount</th>
            <th style={{ borderBottom:'1px solid #ccc', textAlign:'left' }}>Category</th>
            <th style={{ borderBottom:'1px solid #ccc', textAlign:'left' }}>Date</th>
            <th style={{ borderBottom:'1px solid #ccc', textAlign:'left' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(e=>(
            <tr key={e.id}>
              <td style={{ padding:'8px 0' }}>{e.id}</td>
              <td>{e.amount}</td>
              <td>{e.category ? e.category.name : 'N/A'}</td>
              <td>{e.date}</td>
              <td>{e.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
