import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import { Link } from 'react-router-dom'

function percentColor(p){
  if(p < 70) return '#5cb85c'; // green
  if(p < 90) return '#f0ad4e'; // orange
  return '#d9534f'; // red
}

export default function Dashboard(){
  const [expenses, setExpenses] = useState([])
  const [budgetData, setBudgetData] = useState({month:'', limit:0, spent:0})

  useEffect(()=>{
    fetchAll()
    fetchBudget()
  },[])

  function fetchAll(){
    api.get('/expenses').then(res=> setExpenses(res.data)).catch(err=> console.error(err))
  }

  function fetchBudget(){
    api.get('/budget').then(res=> setBudgetData(res.data)).catch(err=> console.error(err))
  }

  const total = expenses.reduce((s,e)=> s + (e.amount||0), 0)
  const limit = budgetData.limit || 0
  const pct = limit > 0 ? Math.round((total / limit) * 100) : 0
  const color = percentColor(pct)

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h2>Expense Tracker — Dashboard</h2>
          <div className="nav">
            <Link to="/add">Add</Link>
            <Link to="/list">All</Link>
            <Link to="/budget">Budget</Link>
          </div>
        </div>

        <div style={{display:'flex', gap:16, alignItems:'center'}}>
          <div style={{flex:1}} className="card small">
            <div><strong>Spent this month</strong></div>
            <div style={{fontSize: '1.6rem', marginTop:8}}>₹{total.toFixed(2)}</div>
            <div className="small">Month: {budgetData.month || '—'}</div>
          </div>

          <div style={{flex:1}} className="card small">
            <div><strong>Budget</strong></div>
            <div style={{fontSize: '1.6rem', marginTop:8}}>₹{limit.toFixed(2)}</div>
            <div className="small">Remaining: ₹{(limit - total).toFixed(2)}</div>
          </div>
        </div>

        <div style={{marginTop:16}} className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div><strong>Budget usage</strong></div>
            <div className="small">{pct}%</div>
          </div>
          <div style={{marginTop:8}} className="progress">
            <div style={{width: `${Math.min(pct,100)}%`, background: color}}></div>
          </div>
        </div>

        <div style={{marginTop:16}} className="card">
          <h3>Recent expenses</h3>
          <table className="table">
            <thead>
              <tr><th>ID</th><th>Amount</th><th>Category</th><th>Date</th><th>Description</th></tr>
            </thead>
            <tbody>
              {expenses.slice(0,10).map(e=>(
                <tr key={e.id}><td>{e.id}</td><td>₹{e.amount}</td><td>{e.category?e.category.name:'N/A'}</td><td>{e.date}</td><td>{e.description}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
