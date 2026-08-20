import React, { useState } from "react";

import ResumeUpload from "../components/ResumeUpload";
import JobDescription from "../components/JobDescription";
import ScoreCard from "../components/ScoreCard";
import SkillsList from "../components/SkillsList";
import AnalysisResult from "../components/AnalysisResult";
import AnalysisLoader from "../components/AnalysisLoader";

import { uploadResume, analyzeResume } from "../services/api";
import { saveAnalysis } from "../services/analyses";

function Analyzer() {
  const [resumeText, setResumeText] = useState("");
  const [resumeFilename, setResumeFilename] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadError, setUploadError] = useState("");

  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const [error, setError] = useState("");

  const isBusy = loading || uploading;

  const canAnalyze =
    Boolean(resumeText) &&
    Boolean(jobDescription.trim()) &&
    !isBusy;

  const handleFileSelect = async (file) => {
    setUploading(true);

    setUploadMessage("");
    setUploadError("");

    setResumeText("");
    setResumeFilename("");

    setAnalyzed(false);
    setAnalysisResult(null);
    setError("");

    try {
      const uploadData = await uploadResume(file);

      setResumeText(uploadData.resume);

      setResumeFilename(
        uploadData.filename || file.name
      );

      setUploadMessage(
        `Ready: ${uploadData.filename || file.name}`
      );
    } catch (err) {
      setUploadError(
        err.message ||
          "Upload failed. Is the FastAPI server running?"
      );
    } finally {
      setUploading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeText) {
      alert(
        "Please upload your resume first and wait for it to finish uploading."
      );
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please enter the job description.");
      return;
    }

    setLoading(true);
    setError("");
    setAnalyzed(false);
    setAnalysisResult(null);

    try {
      const result = await analyzeResume(
        resumeText,
        jobDescription
      );

      await saveAnalysis({
        jobDescription,
        resumeFilename,
        result,
      });

      setAnalysisResult(result);
      setAnalyzed(true);
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-container">
      <div className="analyzer-header analyzer-fade-in">
        <div className="section-label">
          Resume Analyzer
        </div>

        <h1>
          Analyze your resume
        </h1>

        <p className="page-description">
          Upload your resume and compare it with your
          target job using AI.
        </p>
      </div>

      <div className="analyzer-input-grid">
        <div
          className="analyzer-card analyzer-input-card"
          style={{
            opacity: loading ? 0.65 : 1,
          }}
        >
          <div className="analyzer-step">
            <div className="analyzer-step-number">
              1
            </div>

            <h2>
              Upload Resume
            </h2>
          </div>

          <ResumeUpload
            onFileSelect={handleFileSelect}
            uploading={uploading}
            uploadMessage={uploadMessage}
            uploadError={uploadError}
          />
        </div>

        <div
          className="analyzer-card analyzer-input-card"
          style={{
            opacity: loading ? 0.65 : 1,
          }}
        >
          <div className="analyzer-step">
            <div className="analyzer-step-number">
              2
            </div>

            <h2>
              Job Description
            </h2>
          </div>

          <JobDescription
            value={jobDescription}
            onChange={setJobDescription}
            disabled={loading}
          />
        </div>
      </div>

      <div className="analyzer-action-area">
        <button
          onClick={handleAnalyze}
          disabled={!canAnalyze}
          className="analyze-button"
        >
          {loading && (
            <span
              className="analyzer-spinner"
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                border:
                  "2px solid rgba(255,255,255,0.35)",
                borderTopColor: "#ffffff",
                display: "inline-block",
              }}
            />
          )}

          {loading
            ? "Analyzing with AI..."
            : "Analyze Resume →"}
        </button>

        {!resumeText && !uploading && (
          <div className="analyzer-help">
            Upload a resume to enable analysis
          </div>
        )}

        {error && (
          <div
            className="error-box"
            style={{
              maxWidth: "600px",
              margin: "16px auto 0",
              textAlign: "left",
            }}
          >
            {error}
          </div>
        )}
      </div>

      {loading && <AnalysisLoader />}

      {analyzed &&
        analysisResult &&
        !loading && (
          <section className="analyzer-fade-in">
            <div className="results-header">
              <div>
                <div className="section-label">
                  Your Results
                </div>

                <h2
                  className="section-heading"
                  style={{ marginTop: "7px" }}
                >
                  Analysis Results
                </h2>

                <p className="page-description">
                  Here&apos;s how your resume matches
                  the job description.
                </p>
              </div>
            </div>

            <div className="results-grid">
              <ScoreCard
                score={analysisResult.score}
              />

              <SkillsList
                matchedSkills={
                  analysisResult.matched_skills
                }
                missingSkills={
                  analysisResult.missing_skills
                }
              />
            </div>

            <AnalysisResult
              strengths={analysisResult.strengths}
              improvements={
                analysisResult.improvements
              }
              recommendation={
                analysisResult.recommendation
              }
            />
          </section>
        )}
    </main>
  );
}

export default Analyzer;