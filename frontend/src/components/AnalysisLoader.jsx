import React, { useEffect, useState } from "react";

const STEPS = [
  "Reading your resume...",
  "Scanning job requirements...",
  "Matching skills and keywords...",
  "Generating AI insights...",
];

function AnalysisLoader() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((current) => (current + 1) % STEPS.length);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="analyzer-fade-in"
      style={{
        marginTop: "10px",
        marginBottom: "40px",
        background: "linear-gradient(135deg, #eff6ff 0%, #ffffff 55%, #eef2ff 100%)",
        border: "1px solid #bfdbfe",
        borderRadius: "20px",
        padding: "42px 28px",
        textAlign: "center",
        boxShadow: "0 12px 35px rgba(37, 99, 235, 0.08)",
      }}
    >
      <div
        style={{
          width: "72px",
          height: "72px",
          margin: "0 auto 22px",
          borderRadius: "50%",
          border: "4px solid #dbeafe",
          borderTopColor: "#2563eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="analyzer-spinner"
      />

      <h2
        style={{
          margin: "0 0 8px",
          fontSize: "24px",
          color: "#0f172a",
        }}
      >
        Analyzing your resume
      </h2>

      <p
        className="analyzer-pulse"
        style={{
          margin: "0 0 24px",
          color: "#2563eb",
          fontSize: "15px",
          fontWeight: "600",
          minHeight: "22px",
        }}
      >
        {STEPS[stepIndex]}
      </p>

      <div
        style={{
          maxWidth: "420px",
          margin: "0 auto",
          height: "8px",
          background: "#dbeafe",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <div
          className="analyzer-progress-bar"
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #3b82f6, #6366f1)",
            borderRadius: "999px",
          }}
        />
      </div>

      <p
        style={{
          margin: "18px 0 0",
          color: "#64748b",
          fontSize: "13px",
        }}
      >
        This usually takes 5–15 seconds
      </p>
    </section>
  );
}

export default AnalysisLoader;
