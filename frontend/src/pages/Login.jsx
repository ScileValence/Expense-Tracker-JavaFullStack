import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";
import dunesImg from "../assets/dunes.jpg"; // ✅ use the generated image

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/auth/login", { username, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard", { replace: true });
      })
      .catch(() => setError("Invalid username or password"));
  };

  return (
    <div className="auth-layout">
      <div className="auth-image">
        <img src={dunesImg} alt="Background dunes" />
        <div className="overlay-text">
          <h1>Phainance</h1>
          <p>Track. Save. Grow.</p>
        </div>
      </div>

      <div className="auth-form-card">
        <h2>Welcome Back</h2>
        <p className="small-text">Login to continue managing your expenses</p>
        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="primary-btn">Sign In</button>
        </form>

        <p className="auth-footer">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
