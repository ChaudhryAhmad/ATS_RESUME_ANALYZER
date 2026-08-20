import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>ResumeAI</h3>

            <p>
              AI-powered resume analysis that helps you
              understand your ATS match, discover missing
              skills, and improve your chances of getting
              shortlisted.
            </p>
          </div>

          <div className="footer-column">
            <h4>Product</h4>

            <Link to="/analyzer">
              Resume Analyzer
            </Link>

            <Link to="/dashboard">
              Dashboard
            </Link>

            <Link to="/history">
              Analysis History
            </Link>
          </div>

          <div className="footer-column">
            <h4>Resources</h4>

            <Link to="/how-it-works">
              How It Works
            </Link>

            <Link to="/features">
              Features
            </Link>

            <Link to="/faq">
              FAQ
            </Link>
          </div>

          <div className="footer-column">
            <h4>Company</h4>

            <Link to="/contact">
              Contact
            </Link>

            <Link to="/">
              About
            </Link>

            <Link to="/faq">
              Help Center
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © 2026 ResumeAI. All rights reserved.
          </span>

          <span>
            Built with AI
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;