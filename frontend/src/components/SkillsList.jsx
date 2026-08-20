import React from "react";

function SkillsList({
  matchedSkills = [],
  missingSkills = [],
}) {
  return (
    <div
      className="analyzer-fade-in"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "22px",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: "16px",
            fontSize: "17px",
          }}
        >
          ✓ Matching Skills
        </h3>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {matchedSkills.length > 0 ? (
            matchedSkills.map((skill) => (
              <span
                key={skill}
                style={{
                  background: "#dcfce7",
                  color: "#166534",
                  padding: "7px 11px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                {skill}
              </span>
            ))
          ) : (
            <span style={{ color: "#64748b", fontSize: "14px" }}>
              No matching skills found yet.
            </span>
          )}
        </div>
      </div>

      <div
        style={{
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "22px",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: "16px",
            fontSize: "17px",
          }}
        >
          ⚠ Missing Skills
        </h3>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {missingSkills.length > 0 ? (
            missingSkills.map((skill) => (
              <span
                key={skill}
                style={{
                  background: "#fee2e2",
                  color: "#991b1b",
                  padding: "7px 11px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                {skill}
              </span>
            ))
          ) : (
            <span style={{ color: "#64748b", fontSize: "14px" }}>
              No major skill gaps detected.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default SkillsList;