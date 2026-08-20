import React from "react";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <main>
      <section className="info-hero">
        <div className="info-hero-inner analyzer-fade-in">
          <div className="section-label">
            Contact
          </div>

          <h1 className="page-heading">
            Need help?
          </h1>

          <p className="page-description">
            Have a question about ResumeAI or run into
            an issue? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="info-content">
        <div className="contact-box">
          <div className="feature-icon">
            ✉️
          </div>

          <h2
            style={{
              margin: "0 0 10px",
              fontSize: "26px",
            }}
          >
            Get in touch
          </h2>

          <p
            style={{
              color: "#64748b",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            For questions, feedback, or problems with
            your analysis, contact us through email.
          </p>

          <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=chahmadmubashir0@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
  className="contact-email"
>
  chahmadmubashir0@gmail.com
</a>

          <div
            style={{
              marginTop: "30px",
            }}
          >
            <Link
              to="/faq"
              className="secondary-button"
            >
              Visit FAQ →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;