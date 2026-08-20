import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, signOut } = useAuth();

  const publicLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "How It Works",
      path: "/how-it-works",
    },
    {
      name: "Features",
      path: "/features",
    },
    {
      name: "FAQ",
      path: "/faq",
    },
  ];

  const protectedLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Analyzer",
      path: "/analyzer",
    },
    {
      name: "History",
      path: "/history",
    },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      alert(error.message || "Unable to sign out.");
    }
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo">AI</div>

          <div>
            <div className="navbar-title">ResumeAI</div>

            <div className="navbar-subtitle">
              ATS Resume Analyzer
            </div>
          </div>
        </Link>

        <div className="navbar-links">
          {publicLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar-link ${
                isActive(link.path) ? "navbar-link-active" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}

          {user &&
            protectedLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar-link ${
                  isActive(link.path) ? "navbar-link-active" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
        </div>

        <div className="navbar-actions">
          {user ? (
            <>
              <span className="navbar-user">
                {user.email}
              </span>

              <button
                onClick={handleSignOut}
                className="navbar-signout"
              >
                Sign Out
              </button>

              <Link
                to="/analyzer"
                className="navbar-cta"
              >
                Analyze Resume
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="navbar-login"
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                className="navbar-cta"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;