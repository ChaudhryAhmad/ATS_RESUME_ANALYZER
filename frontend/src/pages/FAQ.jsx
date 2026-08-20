import React from "react";

function FAQ() {
  const questions = [
    {
      question: "What is an ATS?",
      answer:
        "ATS stands for Applicant Tracking System. Companies often use ATS software to organize applications and identify resumes that match job requirements.",
    },
    {
      question: "What does the match score mean?",
      answer:
        "The match score represents how closely the information in your resume matches the job description according to the analysis performed by your application.",
    },
    {
      question: "What should I upload?",
      answer:
        "Upload your resume as a PDF. The application extracts the text from the document before sending it for analysis.",
    },
    {
      question: "Do I need a job description?",
      answer:
        "Yes. The analyzer needs a target job description so it can compare the requirements against your resume.",
    },
    {
      question: "Can I see my previous analyses?",
      answer:
        "Yes. Once an analysis is saved successfully, you can view your previous analyses from the History page.",
    },
    {
      question: "Why are some skills marked as missing?",
      answer:
        "Missing skills are skills or keywords identified from the job description that were not found in the analyzed resume content.",
    },
    {
      question: "Does a high score guarantee an interview?",
      answer:
        "No. A match score is only an analysis signal. Hiring decisions depend on many other factors, including experience, qualifications, interview performance, and the employer.",
    },
    {
      question: "Can I analyze multiple resumes?",
      answer:
        "Yes. You can perform multiple analyses and your saved results can be viewed through your analysis history.",
    },
  ];

  return (
    <main>
      <section className="info-hero">
        <div className="info-hero-inner analyzer-fade-in">
          <div className="section-label">
            Help Center
          </div>

          <h1 className="page-heading">
            Frequently asked questions
          </h1>

          <p className="page-description">
            Everything you need to know about using
            ResumeAI.
          </p>
        </div>
      </section>

      <section className="info-content">
        <div className="faq-list">
          {questions.map((item) => (
            <div
              key={item.question}
              className="faq-item analyzer-card"
            >
              <h3>
                {item.question}
              </h3>

              <p>
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default FAQ;