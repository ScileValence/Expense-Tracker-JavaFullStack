import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

export default function ExpenseList(){
  const [expenses, setExpenses] = useState([])
  const navigate = useNavigate()

  useEffect(()=> fetchAll(),[])

  function fetchAll(){ api.get('/expenses').then(res=> setExpenses(res.data)).catch(err=> console.error(err)) }

  function onEdit(id){ navigate(`/add?id=${id}`) }
  function onDelete(id){
    if(!confirm('Delete this expense?')) return;
    api.delete(`/expenses/${id}`).then(()=> fetchAll()).catch(err=> console.error(err))
  }

  return (
    <div className="container">
      <div className="card">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h2>All Expenses</h2>
        </div>
        <table className="table">
          <thead><tr><th>ID</th><th>Amount</th><th>Category</th><th>Date</th><th>Description</th><th>Actions</th></tr></thead>
          <tbody>
            {expenses.map(e=>(
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>₹{e.amount}</td>
                <td>{e.category?e.category.name:'N/A'}</td>
                <td>{e.date}</td>
                <td>{e.description}</td>
                <td>
                  <button onClick={()=> onEdit(e.id)}>Edit</button>
                  <button style={{marginLeft:8}} onClick={()=> onDelete(e.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
