import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { resetPassword } from "../API/api";
import "react-toastify/dist/ReactToastify.css";
import "./ResetPassword.css";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    } else {
      toast.error("Invalid or expired reset link");
    }
  }, [searchParams]);

  const validatePassword = (password) => {
    if (password.length < 8)
      return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(password))
      return "Must contain at least one uppercase letter";
    if (!/[a-z]/.test(password))
      return "Must contain at least one lowercase letter";
    if (!/[0-9]/.test(password))
      return "Must contain at least one number";
    if (!/[@$!%*?&]/.test(password))
      return "Must contain at least one special character";
    return "";
  };

  const handleResetPassword = async () => {
    const error = validatePassword(newPassword);
    if (error) {
      toast.warning(error);
      return;
    }

    try {
      setLoading(true);

   await resetPassword(email, newPassword);

      toast.success("Password reset successful!", {
        autoClose: 2500,
        onClose: () => navigate("/login"),
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to reset password",
        { autoClose: 3000 }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />

      <div className="reset-password-wrapper">
        <div className="reset-password-card">
          <h2 className="reset-password-title">
            Reset Your <span>ThrillYatra</span> Password
          </h2>

          <p className="reset-password-description">
            Choose a strong password to continue your adventures 🌄
          </p>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              readOnly
              className="input-field input-readonly"
            />
          </div>

          <div className="input-group">
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input-field"
            />
          </div>

          <button
            className="submit-button"
            onClick={handleResetPassword}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
