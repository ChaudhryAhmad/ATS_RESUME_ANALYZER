import React from "react";

function ScoreCard({ score = 78 }) {
  let status = "Good Match";
  let ringColor = "#dbeafe";
  let scoreColor = "#2563eb";
  let statusColor = "#1d4ed8";

  if (score >= 85) {
    status = "Excellent Match";
    ringColor = "#bbf7d0";
    scoreColor = "#16a34a";
    statusColor = "#15803d";
  } else if (score < 60) {
    status = "Needs Improvement";
    ringColor = "#fecaca";
    scoreColor = "#dc2626";
    statusColor = "#b91c1c";
  }

  const description =
    score >= 85
      ? "Strong alignment with this role's requirements."
      : score >= 60
        ? "Solid match — a few gaps to address."
        : "Consider tailoring your resume for this role.";

  return (
    <div
      className="analyzer-fade-in"
      style={{
        background: "white",
        border: "1px solid #e2e8f0",
        borderRadius: "18px",
        padding: "28px",
        textAlign: "center",
        boxShadow: "0 8px 25px rgba(15, 23, 42, 0.05)",
      }}
    >
      <div
        style={{
          fontSize: "13px",
          fontWeight: "700",
          color: "#64748b",
          marginBottom: "15px",
          letterSpacing: "0.06em",
        }}
      >
        ATS MATCH SCORE
      </div>

      <div
        style={{
          width: "145px",
          height: "145px",
          margin: "0 auto",
          borderRadius: "50%",
          border: `12px solid ${ringColor}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transition: "border-color 0.3s ease",
        }}
      >
        <div
          style={{
            fontSize: "42px",
            fontWeight: "800",
            color: scoreColor,
            lineHeight: 1,
          }}
        >
          {score}%
        </div>

        <div
          style={{
            fontSize: "12px",
            color: "#64748b",
            marginTop: "4px",
          }}
        >
          Match
        </div>
      </div>

      <h3
        style={{
          margin: "18px 0 5px",
          color: statusColor,
        }}
      >
        {status}
      </h3>

      <p
        style={{
          color: "#64748b",
          fontSize: "13px",
          margin: 0,
          lineHeight: "1.5",
        }}
      >
        {description}
      </p>
    </div>
  );
}

export default ScoreCard;
