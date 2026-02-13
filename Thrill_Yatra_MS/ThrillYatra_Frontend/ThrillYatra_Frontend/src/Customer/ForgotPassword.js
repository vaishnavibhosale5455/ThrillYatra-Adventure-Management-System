import React, { useState } from "react";
import { forgotPassword } from "../API/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.warning("Please enter your registered email");
      return;
    }

    try {
      setLoading(true);
      await forgotPassword(email);

      toast.success(
        "Reset link sent! Check your inbox.",
        { autoClose: 3000 }
      );

      setEmail("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Email not found",
        { autoClose: 3000 }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />

      <div className="forgot-wrapper">
        <div className="forgot-card">
          <h2 className="forgot-title">
            Reset Your <span>ThrillYatra</span> Password
          </h2>

          <p className="forgot-subtitle">
            Enter your email and we’ll help you get back
            to your adventures 🌄
          </p>

          <form onSubmit={handleSubmit} className="forgot-form">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
