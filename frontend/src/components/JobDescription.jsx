import React from "react";

function JobDescription({ value, onChange, disabled = false }) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontWeight: "700",
          marginBottom: "10px",
          fontSize: "15px",
        }}
      >
        Job Description
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description here..."
        rows={12}
        disabled={disabled}
        style={{
          width: "100%",
          boxSizing: "border-box",
          resize: "vertical",
          padding: "16px",
          borderRadius: "14px",
          border: "1px solid #cbd5e1",
          outline: "none",
          fontSize: "14px",
          lineHeight: "1.6",
          fontFamily: "inherit",
          background: disabled ? "#f8fafc" : "white",
          opacity: disabled ? 0.8 : 1,
          cursor: disabled ? "not-allowed" : "text",
        }}
      />

      <div
        style={{
          marginTop: "7px",
          fontSize: "12px",
          color: "#64748b",
          textAlign: "right",
        }}
      >
        {value.length} characters
      </div>
    </div>
  );
}

export default JobDescription;