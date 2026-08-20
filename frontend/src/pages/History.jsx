import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { fetchAnalyses } from "../services/analyses";

function formatDate(value) {
  return new Date(value).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
}

function History() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnalyses()
      .then(setAnalyses)
      .catch((err) =>
        setError(
          err.message ||
            "Failed to load history."
        )
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="page-container">
      <div className="dashboard-header analyzer-fade-in">
        <div>
          <div className="section-label">
            Your Activity
          </div>

          <h1 className="page-heading">
            Analysis History
          </h1>

          <p className="page-description">
            View your previous resume analyses saved
            in Supabase.
          </p>
        </div>

        <Link
          to="/analyzer"
          className="primary-button"
        >
          New Analysis →
        </Link>
      </div>

      <div className="history-card">
        <div className="history-header">
          <div>JOB ROLE</div>
          <div>SCORE</div>
          <div>SKILLS</div>
          <div>DATE</div>
        </div>

        {loading && (
          <div
            style={{
              padding: "45px 22px",
              color: "#64748b",
            }}
          >
            Loading your analyses...
          </div>
        )}

        {error && (
          <div
            className="error-box"
            style={{
              borderRadius: 0,
              border: "none",
            }}
          >
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          analyses.length === 0 && (
            <div
              style={{
                padding: "45px 22px",
                color: "#64748b",
              }}
            >
              No analyses yet.{" "}
              <Link
                to="/analyzer"
                style={{
                  color: "#2563eb",
                  fontWeight: "700",
                }}
              >
                Run your first analysis
              </Link>
            </div>
          )}

        {!loading &&
          !error &&
          analyses.map((analysis) => (
            <div
              key={analysis.id}
              className="history-row"
            >
              <div className="history-role">
                {analysis.job_title ||
                  "Job Analysis"}
              </div>

              <div>
                <span
                  className="score-pill"
                  style={{
                    background:
                      analysis.score >= 85
                        ? "#dcfce7"
                        : analysis.score >= 70
                          ? "#dbeafe"
                          : "#fee2e2",

                    color:
                      analysis.score >= 85
                        ? "#166534"
                        : analysis.score >= 70
                          ? "#1d4ed8"
                          : "#991b1b",
                  }}
                >
                  {analysis.score}%
                </span>
              </div>

              <div className="history-skills">
                {analysis.matched_skills
                  ?.length ?? 0}{" "}
                matched
              </div>

              <div className="history-date">
                {formatDate(
                  analysis.created_at
                )}
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}

export default History;