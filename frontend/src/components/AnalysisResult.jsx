import React from "react";

function AnalysisResult({
  strengths = "",
  improvements = "",
  recommendation = "",
}) {
  return (
    <div
      className="analyzer-fade-in"
      style={{
        background: "white",
        border: "1px solid #e2e8f0",
        borderRadius: "18px",
        padding: "25px",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: "20px",
          fontSize: "20px",
        }}
      >
        AI Analysis
      </h2>

      <div
        style={{
          display: "grid",
          gap: "15px",
        }}
      >
        <div
          style={{
            padding: "18px",
            borderRadius: "12px",
            background: "#f8fafc",
          }}
        >
          <h4 style={{ margin: "0 0 8px" }}>Resume Strengths</h4>

          <p
            style={{
              margin: 0,
              color: "#475569",
              lineHeight: "1.6",
              fontSize: "14px",
            }}
          >
            {strengths}
          </p>
        </div>

        <div
          style={{
            padding: "18px",
            borderRadius: "12px",
            background: "#fff7ed",
          }}
        >
          <h4 style={{ margin: "0 0 8px" }}>Areas to Improve</h4>

          <p
            style={{
              margin: 0,
              color: "#475569",
              lineHeight: "1.6",
              fontSize: "14px",
            }}
          >
            {improvements}
          </p>
        </div>

        <div
          style={{
            padding: "18px",
            borderRadius: "12px",
            background: "#eff6ff",
          }}
        >
          <h4 style={{ margin: "0 0 8px" }}>ATS Recommendation</h4>

          <p
            style={{
              margin: 0,
              color: "#475569",
              lineHeight: "1.6",
              fontSize: "14px",
            }}
          >
            {recommendation}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AnalysisResult;
