import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";
import dunesImg from "../assets/dunes.jpg"; // ✅ use same image

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/auth/register", { username, email, password });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setSuccess("Account created successfully!");
        setTimeout(() => navigate("/dashboard", { replace: true }), 1000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-image">
        <img src={dunesImg} alt="Background dunes" />
        <div className="overlay-text">
          <h1>Phainance</h1>
          <p>Smart way to manage your finances</p>
        </div>
      </div>

      <div className="auth-form-card">
        <h2>Create Account</h2>
        <p className="small-text">Join us to start tracking your expenses</p>

        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="primary-btn">Sign Up</button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
