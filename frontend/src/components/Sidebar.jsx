import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  List,
  PlusCircle,
  PiggyBank,
  LogOut,
} from "lucide-react";
import "../styles/sidebar.css";

// Decode JWT to extract username
function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("User");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeToken(token);
      if (decoded?.sub) setUsername(decoded.sub);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      {/* User Profile */}
      <div className="profile">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            username
          )}&background=6366f1&color=fff`}
          alt="User"
        />
        <h3>{username}</h3>
      </div>

      {/* Menu Items */}
      <div className="menu">
        <button
          className={`menu-item ${isActive("/dashboard") ? "active" : ""}`}
          onClick={() => navigate("/dashboard")}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </button>

        <button
          className={`menu-item ${isActive("/list") ? "active" : ""}`}
          onClick={() => navigate("/list")}
        >
          <List size={18} />
          <span>Expenses</span>
        </button>

        <button
          className={`menu-item ${isActive("/add") ? "active" : ""}`}
          onClick={() => navigate("/add")}
        >
          <PlusCircle size={18} />
          <span>Add Expense</span>
        </button>

        <button
          className={`menu-item ${isActive("/budget") ? "active" : ""}`}
          onClick={() => navigate("/budget")}
        >
          <PiggyBank size={18} />
          <span>Budget</span>
        </button>
      </div>

      {/* Logout */}
      <div className="logout">
        <button className="logout-btn" onClick={logout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
