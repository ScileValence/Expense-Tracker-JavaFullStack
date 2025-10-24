import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AddExpense from './components/AddExpense'
import ExpenseList from './components/ExpenseList'
import BudgetForm from './components/BudgetForm'

export default function App(){
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/add' element={<AddExpense />} />
        <Route path='/list' element={<ExpenseList />} />
        <Route path='/budget' element={<BudgetForm />} />
      </Routes>
    </Router>
  )
}
