import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./AuthPages.css";

export default function LoginPage() {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      // Redirect admin to admin panel, users to home
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <div className="auth-logo">🧁</div>
        <h2>Welcome Back!</h2>
        <p className="auth-sub">Login to your Blissful Bites account</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login 🚀"}
          </button>
        </form>

<div className="or-divider">
  <span>OR</span>
</div>

<button
  type="button"
  className="google-btn"
  onClick={async () => {
    try {
      await googleLogin();
      navigate("/");
    } catch (err) {
      setError("Google login failed. Try again.");
    }
  }}
>
  <img
    src="https://www.google.com/favicon.ico"
    alt="Google"
    width="18"
    height="18"
  />
  Continue with Google
</button>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}