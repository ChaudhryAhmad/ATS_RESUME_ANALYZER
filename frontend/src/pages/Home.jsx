import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const features = [
    {
      icon: "📄",
      title: "Resume Analysis",
      text: "Upload your resume and let AI analyze your skills, experience, and content.",
    },
    {
      icon: "🎯",
      title: "ATS Match Score",
      text: "Understand how closely your resume matches the target job description.",
    },
    {
      icon: "🔍",
      title: "Missing Keywords",
      text: "Discover important skills and keywords that your resume is missing.",
    },
    {
      icon: "💡",
      title: "AI Recommendations",
      text: "Get practical suggestions for improving your resume before applying.",
    },
  ];

  return (
    <main>
      <section className="home-hero">
        <div className="home-hero-inner analyzer-fade-in">
          <div className="hero-badge">
            ✨ AI-Powered Resume Analysis
          </div>

          <h1 className="hero-title">
            Make your resume
            <span> ATS-ready.</span>
          </h1>

          <p className="hero-description">
            Compare your resume with any job description,
            discover missing skills, and get AI-powered
            recommendations to improve your chances of
            getting shortlisted.
          </p>

          <div className="hero-actions">
            <Link
              to="/analyzer"
              className="primary-button"
            >
              Analyze My Resume →
            </Link>

            <Link
              to="/how-it-works"
              className="secondary-button"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="center-heading">
          <div className="section-label">
            Powerful tools
          </div>

          <h2 className="section-heading">
            Everything you need to improve your resume
          </h2>

          <p className="page-description">
            Turn your resume into a stronger application
            with AI-powered insights.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="feature-card analyzer-card"
            >
              <div className="feature-icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-cta">
        <div className="home-cta-inner">
          <div className="section-label">
            Ready to improve?
          </div>

          <h2>
            Give your resume a competitive edge.
          </h2>

          <p>
            Analyze your resume against your target job
            and find out exactly what needs improvement.
          </p>

          <Link
            to="/analyzer"
            className="secondary-button"
          >
            Start Your Analysis →
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;