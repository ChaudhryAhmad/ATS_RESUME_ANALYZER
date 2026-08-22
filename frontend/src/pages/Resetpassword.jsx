import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { supabase } from "../services/supabase";

function ResetPassword() {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Password requirements (same rules as Signup)
  const passwordRequirements = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const passwordIsValid =
    passwordRequirements.length &&
    passwordRequirements.lowercase &&
    passwordRequirements.uppercase &&
    passwordRequirements.number &&
    passwordRequirements.special;

  const requirementStyle = (valid) => ({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: valid ? "#15803d" : "#64748b",
    transition: "color 0.2s ease",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!passwordIsValid) {
      setError("Please meet all password requirements.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await updatePassword(password);

      // Sign out of the temporary recovery session so the user
      // logs back in fresh with their new password.
      if (supabase) {
        await supabase.auth.signOut();
      }

      setSuccess(true);

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
    } catch (err) {
      setError(err.message || "Unable to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-background-glow auth-glow-one" />
      <div className="auth-background-glow auth-glow-two" />

      <div className="auth-card analyzer-fade-in">
        {/* Header */}
        <div className="auth-header">
          <div className="auth-icon">✦</div>

          <div>
            <div className="auth-brand">ResumeAI</div>
            <div className="auth-brand-subtitle">
              ATS Resume Analyzer
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="auth-heading">
          <h1>Set a new password</h1>
          <p>Choose a strong new password for your account.</p>
        </div>

        {success ? (
          <div className="auth-message auth-success">
            <span>✓</span>
            Password updated! Redirecting you to sign in...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            {/* New Password */}
            <div className="auth-field">
              <div className="password-label-row">
                <label htmlFor="reset-password">New Password</label>
              </div>

              <div className="auth-input-wrapper">
                <span className="auth-input-icon">🔒</span>

                <input
                  id="reset-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Create a strong password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="auth-field">
              <div className="password-label-row">
                <label htmlFor="reset-confirm-password">
                  Confirm New Password
                </label>
              </div>

              <div className="auth-input-wrapper">
                <span className="auth-input-icon">🔒</span>

                <input
                  id="reset-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Confirm your password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Password requirements */}
            <div className="password-requirements">
              <div className="requirements-title">
                Password requirements
              </div>

              <div className="requirements-grid">
                <div style={requirementStyle(passwordRequirements.length)}>
                  <span
                    className={`requirement-icon ${
                      passwordRequirements.length ? "requirement-valid" : ""
                    }`}
                  >
                    {passwordRequirements.length ? "✓" : "○"}
                  </span>
                  At least 8 characters
                </div>

                <div
                  style={requirementStyle(passwordRequirements.lowercase)}
                >
                  <span
                    className={`requirement-icon ${
                      passwordRequirements.lowercase
                        ? "requirement-valid"
                        : ""
                    }`}
                  >
                    {passwordRequirements.lowercase ? "✓" : "○"}
                  </span>
                  One lowercase letter
                </div>

                <div
                  style={requirementStyle(passwordRequirements.uppercase)}
                >
                  <span
                    className={`requirement-icon ${
                      passwordRequirements.uppercase
                        ? "requirement-valid"
                        : ""
                    }`}
                  >
                    {passwordRequirements.uppercase ? "✓" : "○"}
                  </span>
                  One uppercase letter
                </div>

                <div style={requirementStyle(passwordRequirements.number)}>
                  <span
                    className={`requirement-icon ${
                      passwordRequirements.number ? "requirement-valid" : ""
                    }`}
                  >
                    {passwordRequirements.number ? "✓" : "○"}
                  </span>
                  One number
                </div>

                <div
                  style={requirementStyle(passwordRequirements.special)}
                >
                  <span
                    className={`requirement-icon ${
                      passwordRequirements.special
                        ? "requirement-valid"
                        : ""
                    }`}
                  >
                    {passwordRequirements.special ? "✓" : "○"}
                  </span>
                  One special character
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="auth-message auth-error">
                <span>!</span>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !passwordIsValid}
              className={`auth-submit ${
                loading || !passwordIsValid ? "auth-submit-disabled" : ""
              }`}
            >
              {loading ? (
                <>
                  <span className="auth-spinner" />
                  Updating...
                </>
              ) : (
                <>
                  Update Password
                  <span>→</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Security */}
        <div className="auth-security">
          <span>🔒</span>
          Your account information is securely handled.
        </div>
      </div>
    </main>
  );
}

export default ResetPassword;