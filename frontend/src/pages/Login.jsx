import React, { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Login() {
  const { signIn } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo =
    location.state?.from || "/analyzer";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await signIn(email, password);

      navigate(redirectTo, {
        replace: true,
      });
    } catch (err) {
      setError(
        err.message ||
          "Unable to sign in."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card analyzer-fade-in">
        <div className="auth-logo">
          AI
        </div>

        <h1>
          Welcome back
        </h1>

        <p>
          Sign in to analyze resumes, track your
          ATS scores, and view your analysis history.
        </p>

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >
          <div className="form-group">
            <label>
              Email
            </label>

            <input
              className="form-input"
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <div className="password-label-row">
              <label>Password</label>
              <Link
                to="/forgot-password"
                style={{
                  fontSize: "13px",
                  color: "#2563eb",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Forgot password?
              </Link>
            </div>

            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Your password"
              required
              minLength={6}
            />
          </div>

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="auth-submit"
          >
            {loading
              ? "Signing in..."
              : "Sign In →"}
          </button>
        </form>

        <p className="auth-footer">
          Don&apos;t have an account?{" "}
          <Link to="/signup">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;