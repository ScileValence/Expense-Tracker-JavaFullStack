import React, { useEffect, useState } from 'react'
import api from '../api/axios'

export default function ExpenseList(){
  const [expenses, setExpenses] = useState([])
  useEffect(()=>{
    api.get('/expenses').then(res=> setExpenses(res.data)).catch(err => console.error(err))
  },[])

  return (
    <div style={{ maxWidth:800, margin:'20px auto', padding:20 }}>
      <h2>All Expenses</h2>
      <table style={{ width:'100%', borderCollapse:'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom:'1px solid #ccc' }}>ID</th>
            <th style={{ borderBottom:'1px solid #ccc' }}>Amount</th>
            <th style={{ borderBottom:'1px solid #ccc' }}>Category</th>
            <th style={{ borderBottom:'1px solid #ccc' }}>Date</th>
            <th style={{ borderBottom:'1px solid #ccc' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(e=> (
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
