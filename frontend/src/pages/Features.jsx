import React from "react";
import { Link } from "react-router-dom";

function Features() {
  const features = [
    {
      icon: "📄",
      title: "PDF Resume Upload",
      text: "Upload your resume and automatically extract the content for analysis.",
    },
    {
      icon: "🎯",
      title: "ATS Match Score",
      text: "Get a percentage score showing how closely your resume matches the job.",
    },
    {
      icon: "✅",
      title: "Matched Skills",
      text: "See which skills and keywords from the job description are already present.",
    },
    {
      icon: "🔍",
      title: "Missing Skills",
      text: "Identify important skills and keywords that may be missing from your resume.",
    },
    {
      icon: "💡",
      title: "AI Recommendations",
      text: "Receive recommendations that help you understand what should be improved.",
    },
    {
      icon: "📊",
      title: "Analysis Dashboard",
      text: "Track your analysis statistics, average score, best score, and missing skills.",
    },
    {
      icon: "🕘",
      title: "Analysis History",
      text: "Keep track of previous resume analyses so you can measure improvement.",
    },
    {
      icon: "🔐",
      title: "Personal Account",
      text: "Your analysis data is associated with your authenticated account.",
    },
    {
      icon: "⚡",
      title: "Fast Workflow",
      text: "Upload, compare, analyze, and receive results without unnecessary steps.",
    },
  ];

  return (
    <main>
      <section className="info-hero">
        <div className="info-hero-inner analyzer-fade-in">
          <div className="section-label">
            Features
          </div>

          <h1 className="page-heading">
            Everything you need to improve your resume
          </h1>

          <p className="page-description">
            ResumeAI combines resume analysis, job
            matching, skill detection, and AI
            recommendations into one workflow.
          </p>
        </div>
      </section>

      <section className="info-content">
        <div className="info-grid">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="info-card analyzer-card"
            >
              <div
                className="feature-icon"
                style={{
                  marginBottom: "18px",
                }}
              >
                {feature.icon}
              </div>

              <h3>
                {feature.title}
              </h3>

              <p>
                {feature.text}
              </p>
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
            Analyze My Resume →
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Features;