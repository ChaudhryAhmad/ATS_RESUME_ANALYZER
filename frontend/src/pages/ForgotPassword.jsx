import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function ForgotPassword() {
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      setError(err.message || "Unable to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card analyzer-fade-in">
        <div className="auth-logo">AI</div>

        <h1>Reset your password</h1>

        <p>
          Enter your email and we&apos;ll send you a link to reset your
          password.
        </p>

        {sent ? (
          <div className="success-box">
            Check your inbox (and spam folder) for a password reset link.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email</label>

              <input
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            {error && <div className="error-box">{error}</div>}

            <button type="submit" disabled={loading} className="auth-submit">
              {loading ? "Sending..." : "Send Reset Link →"}
            </button>
          </form>
        )}

        <p className="auth-footer">
          Remembered your password? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </main>
  );
}

export default ForgotPassword;