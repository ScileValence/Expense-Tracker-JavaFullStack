import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddExpense from './components/AddExpense';
import ExpenseList from './components/ExpenseList';
import BudgetForm from './components/BudgetForm';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Wrapper to protect private pages
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Private Routes */}
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/add" element={<ProtectedRoute><AddExpense /></ProtectedRoute>} />
      <Route path="/list" element={<ProtectedRoute><ExpenseList /></ProtectedRoute>} />
      <Route path="/budget" element={<ProtectedRoute><BudgetForm /></ProtectedRoute>} />

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
