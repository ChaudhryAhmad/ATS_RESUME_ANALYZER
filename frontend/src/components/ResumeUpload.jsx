import React, { useRef, useState } from "react";

function ResumeUpload({
  onFileSelect,
  uploading = false,
  uploadMessage = "",
  uploadError = "",
}) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = async (selectedFile) => {
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    setFile(selectedFile);

    if (onFileSelect) {
      await onFileSelect(selectedFile);
    }
  };

  const handleInputChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  return (
    <div>
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          border: dragging
            ? "2px dashed #2563eb"
            : "2px dashed #cbd5e1",
          borderRadius: "16px",
          padding: "45px 25px",
          textAlign: "center",
          cursor: uploading ? "not-allowed" : "pointer",
          background: dragging ? "#eff6ff" : "#f8fafc",
          transition: "0.2s",
          opacity: uploading ? 0.7 : 1,
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          onChange={handleInputChange}
          style={{ display: "none" }}
          disabled={uploading}
        />

        <div
          style={{
            width: "60px",
            height: "60px",
            margin: "0 auto 18px",
            borderRadius: "50%",
            background: "#dbeafe",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
          }}
        >
          📄
        </div>

        <h3
          style={{
            margin: "0 0 8px",
            fontSize: "18px",
          }}
        >
          {file ? file.name : "Upload your resume"}
        </h3>

        <p
          style={{
            margin: "0",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          {file
            ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
            : "Drag & drop your PDF here or click to browse"}
        </p>

        {!file && (
          <div
            style={{
              marginTop: "15px",
              color: "#2563eb",
              fontWeight: "700",
              fontSize: "14px",
            }}
          >
            Choose PDF
          </div>
        )}
      </div>

      {uploading && (
        <div
          style={{
            marginTop: "12px",
            padding: "12px 15px",
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: "10px",
            color: "#1d4ed8",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            className="analyzer-spinner"
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              border: "2px solid #bfdbfe",
              borderTopColor: "#2563eb",
              flexShrink: 0,
            }}
          />
          Uploading resume...
        </div>
      )}

      {!uploading && uploadMessage && (
        <div
          style={{
            marginTop: "12px",
            padding: "12px 15px",
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "10px",
            color: "#166534",
            fontSize: "14px",
          }}
        >
          ✓ {uploadMessage}
        </div>
      )}

      {!uploading && uploadError && (
        <div
          style={{
            marginTop: "12px",
            padding: "12px 15px",
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "10px",
            color: "#b91c1c",
            fontSize: "14px",
          }}
        >
          {uploadError}
        </div>
      )}
    </div>
  );
}

export default ResumeUpload;
