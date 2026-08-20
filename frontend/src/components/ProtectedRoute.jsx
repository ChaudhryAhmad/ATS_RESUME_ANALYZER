import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading, isConfigured } = useAuth();
  const location = useLocation();

  if (!isConfigured) {
    return (
      <main
        style={{
          maxWidth: "720px",
          margin: "80px auto",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "12px" }}>Supabase not configured</h1>
        <p style={{ color: "#64748b", lineHeight: 1.6 }}>
          Add <code>VITE_SUPABASE_URL</code> and{" "}
          <code>VITE_SUPABASE_ANON_KEY</code> to <code>frontend/.env</code>,
          then restart the frontend dev server.
        </p>
      </main>
    );
  }

  if (loading) {
    return (
      <main
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
          color: "#64748b",
        }}
      >
        <span
          className="analyzer-spinner"
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            border: "3px solid #dbeafe",
            borderTopColor: "#2563eb",
            marginRight: "12px",
          }}
        />
        Checking authentication...
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default ProtectedRoute;
