import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import axios from "axios";
import "./AuthPages.css";

export default function OTPPage() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6 digit OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
       "https://sweet-bliss-ja4h.onrender.com/api/auth/verify-otp",
        { email, otp }
      );
      const userData = response.data;

      // Save user to context
      localStorage.setItem("blissfulUser", JSON.stringify(userData));
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <div className="auth-logo">📧</div>
        <h2>Verify Email</h2>
        <p className="auth-sub">
          We sent a 6 digit OTP to<br />
          <b>{email}</b>
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleVerify}>
          <div className="auth-field">
            <label>Enter OTP</label>
            <input
              type="text"
              placeholder="Enter 6 digit OTP"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setError("");
              }}
              maxLength={6}
              style={{ textAlign: "center", fontSize: "24px", letterSpacing: "8px" }}
            />
          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP ✅"}
          </button>
        </form>

        <p className="auth-switch">
          Didn't receive OTP?{" "}
          <span
            style={{ color: "#e94e77", cursor: "pointer", fontWeight: 600 }}
            onClick={() => navigate("/signup")}
          >
            Try again
          </span>
        </p>
      </div>
    </div>
  );
}