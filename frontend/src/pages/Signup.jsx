import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Signup() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Password requirements
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent submission if password requirements aren't met
    if (!passwordIsValid) {
      setError("Please meet all password requirements.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const data = await signUp(email, password);

      if (data.session) {
        navigate("/analyzer", { replace: true });
        return;
      }

      setMessage(
        "Account created. Check your email to confirm, then sign in."
      );
    } catch (err) {
      setError(err.message || "Unable to create account.");
    } finally {
      setLoading(false);
    }
  };

  // Scroll down when password field is focused
  const handlePasswordFocus = (e) => {
    setTimeout(() => {
      e.target.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 150);
  };

  const requirementStyle = (valid) => ({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: valid ? "#15803d" : "#64748b",
    transition: "color 0.2s ease",
  });

  return (
    <main className="auth-page">
      <div className="auth-background-glow auth-glow-one" />
      <div className="auth-background-glow auth-glow-two" />

      <div className="auth-card analyzer-fade-in">

        {/* Header */}
        <div className="auth-header">
          <div className="auth-icon">
            ✦
          </div>

          <div>
            <div className="auth-brand">
              ResumeAI
            </div>

            <div className="auth-brand-subtitle">
              ATS Resume Analyzer
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="auth-heading">
          <h1>Create your account</h1>

          <p>
            Start analyzing your resumes and improve your chances of
            getting shortlisted.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >

          {/* Email */}
          <div className="auth-field">
            <label htmlFor="signup-email">
              Email address
            </label>

            <div className="auth-input-wrapper">
              <span className="auth-input-icon">
                @
              </span>

              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="auth-field">
            <div className="password-label-row">
              <label htmlFor="signup-password">
                Password
              </label>
            </div>

            <div className="auth-input-wrapper">
              <span className="auth-input-icon">
                🔒
              </span>

              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                onFocus={handlePasswordFocus}
                placeholder="Create a strong password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Password requirements */}
          <div className="password-requirements">
            <div className="requirements-title">
              Password requirements
            </div>

            <div className="requirements-grid">

              {/* 8 Characters */}
              <div
                style={requirementStyle(
                  passwordRequirements.length
                )}
              >
                <span
                  className={`requirement-icon ${
                    passwordRequirements.length
                      ? "requirement-valid"
                      : ""
                  }`}
                >
                  {passwordRequirements.length ? "✓" : "○"}
                </span>

                At least 8 characters
              </div>

              {/* Lowercase */}
              <div
                style={requirementStyle(
                  passwordRequirements.lowercase
                )}
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

              {/* Uppercase */}
              <div
                style={requirementStyle(
                  passwordRequirements.uppercase
                )}
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

              {/* Number */}
              <div
                style={requirementStyle(
                  passwordRequirements.number
                )}
              >
                <span
                  className={`requirement-icon ${
                    passwordRequirements.number
                      ? "requirement-valid"
                      : ""
                  }`}
                >
                  {passwordRequirements.number ? "✓" : "○"}
                </span>

                One number
              </div>

              {/* Special Character */}
              <div
                style={requirementStyle(
                  passwordRequirements.special
                )}
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

          {/* Success */}
          {message && (
            <div className="auth-message auth-success">
              <span>✓</span>
              {message}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !passwordIsValid}
            className={`auth-submit ${
              loading || !passwordIsValid
                ? "auth-submit-disabled"
                : ""
            }`}
          >
            {loading ? (
              <>
                <span className="auth-spinner" />
                Creating account...
              </>
            ) : (
              <>
                Create Account
                <span>→</span>
              </>
            )}
          </button>
        </form>

        {/* Login link */}
        <div className="auth-footer">
          <span>Already have an account?</span>{" "}
          <Link to="/login">
            Sign in
          </Link>
        </div>

        {/* Security */}
        <div className="auth-security">
          <span>🔒</span>
          Your account information is securely handled.
        </div>

      </div>
    </main>
  );
}

export default Signup;