import React from "react";
import { Link } from "react-router-dom";

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Upload your resume",
      text: "Upload your resume as a PDF. ResumeAI extracts the content so it can be analyzed.",
    },
    {
      number: "02",
      title: "Add the job description",
      text: "Paste the job description for the position you want to apply for.",
    },
    {
      number: "03",
      title: "AI analyzes the match",
      text: "The system compares your resume with the job requirements and identifies important matches and gaps.",
    },
    {
      number: "04",
      title: "Improve your resume",
      text: "Review your score, missing skills, strengths, improvements, and AI recommendation.",
    },
  ];

  return (
    <main>
      <section className="info-hero">
        <div className="info-hero-inner analyzer-fade-in">
          <div className="section-label">
            Simple process
          </div>

          <h1 className="page-heading">
            How ResumeAI works
          </h1>

          <p className="page-description">
            Go from resume to actionable ATS insights
            in just a few simple steps.
          </p>
        </div>
      </section>

      <section className="info-content">
        <div className="step-list">
          {steps.map((step) => (
            <div
              key={step.number}
              className="step-card analyzer-card"
            >
              <div className="step-number">
                {step.number}
              </div>

              <div>
                <h3
                  style={{
                    margin: "0 0 8px",
                    fontSize: "18px",
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                    lineHeight: 1.7,
                  }}
                >
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "45px",
          }}
        >
          <Link
            to="/analyzer"
            className="primary-button"
          >
            Try ResumeAI →
          </Link>
        </div>
      </section>
    </main>
  );
}

export default HowItWorks;