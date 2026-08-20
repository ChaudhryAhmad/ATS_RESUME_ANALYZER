import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { fetchAnalysisStats } from "../services/analyses";

function formatRelativeDate(value) {
  const date = new Date(value);
  const now = new Date();

  const diffMs = now - date;

  const diffDays = Math.floor(
    diffMs / (1000 * 60 * 60 * 24)
  );

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString();
}

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    averageScore: 0,
    bestScore: 0,
    totalMissingSkills: 0,
    recent: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnalysisStats()
      .then(setStats)
      .catch((err) =>
        setError(
          err.message ||
            "Failed to load dashboard."
        )
      )
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    {
      title: "Resumes Analyzed",
      value: String(stats.total),
      icon: "📄",
    },
    {
      title: "Average Score",
      value: stats.total
        ? `${stats.averageScore}%`
        : "—",
      icon: "🎯",
    },
    {
      title: "Best Match",
      value: stats.total
        ? `${stats.bestScore}%`
        : "—",
      icon: "🏆",
    },
    {
      title: "Missing Skills",
      value: String(
        stats.totalMissingSkills
      ),
      icon: "🔍",
    },
  ];

  return (
    <main className="page-container">
      <div className="dashboard-header analyzer-fade-in">
        <div>
          <div className="section-label">
            Overview
          </div>

          <h1 className="page-heading">
            Dashboard
          </h1>

          <p className="page-description">
            Track your resume analysis and ATS
            performance.
          </p>
        </div>

        <Link
          to="/analyzer"
          className="primary-button"
        >
          + New Analysis
        </Link>
      </div>

      {error && (
        <div
          className="error-box"
          style={{ marginBottom: "20px" }}
        >
          {error}
        </div>
      )}

      <div className="stats-grid">
        {cards.map((stat) => (
          <div
            key={stat.title}
            className="stat-card analyzer-card"
          >
            <div className="stat-icon">
              {stat.icon}
            </div>

            <div className="stat-title">
              {stat.title}
            </div>

            <div className="stat-value">
              {loading ? "..." : stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="recent-card">
        <div className="recent-header">
          <h2>Recent Analyses</h2>

          <Link
            to="/history"
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: "700",
            }}
          >
            View all →
          </Link>
        </div>

        {loading && (
          <p className="muted">
            Loading recent analyses...
          </p>
        )}

        {!loading &&
          stats.recent.length === 0 && (
            <p className="muted">
              No analyses yet.{" "}
              <Link
                to="/analyzer"
                style={{
                  color: "#2563eb",
                  fontWeight: "700",
                }}
              >
                Analyze a resume
              </Link>
            </p>
          )}

        {!loading &&
          stats.recent.map((item) => (
            <div
              key={item.id}
              className="recent-item"
            >
              <div>
                <div className="recent-job">
                  {item.job_title ||
                    "Job Analysis"}
                </div>

                <div className="recent-date">
                  {formatRelativeDate(
                    item.created_at
                  )}
                </div>
              </div>

              <div
                className="score-pill"
                style={{
                  background:
                    item.score >= 85
                      ? "#dcfce7"
                      : item.score >= 70
                        ? "#dbeafe"
                        : "#fee2e2",

                  color:
                    item.score >= 85
                      ? "#166534"
                      : item.score >= 70
                        ? "#1d4ed8"
                        : "#991b1b",
                }}
              >
                {item.score}% Match
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}

export default Dashboard;