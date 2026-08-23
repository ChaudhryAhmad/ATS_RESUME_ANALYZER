import logging

from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_community.document_loaders import PyPDFLoader
from dotenv import load_dotenv
from pathlib import Path
import tempfile
import os

from app.routes.health import router as health_router
from app.services.ats_analyzer import analyze_resume_ats
from app.auth import get_current_user_id

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env", override=True)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# TODO: replace "https://your-app.vercel.app" with your real Vercel domain
# once it's deployed. Keep localhost entries for local dev.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://ats-resume-analyzer-five-delta.vercel.app/",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="/api")

MAX_UPLOAD_SIZE = 5 * 1024 * 1024  # 5MB


# Data that frontend will send for analysis
class ResumeData(BaseModel):
    resume: str
    job_description: str


# Test endpoint
@app.get("/")
def home():
    return {
        "message": "ATS Resume Analyzer API is running!"
    }


# PDF upload endpoint
@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    logger.info(f"Received resume upload: {file.filename}")

    # Check if file is PDF
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Please upload a PDF file."
        )

    # Read file into memory once, enforce size limit before writing to disk
    contents = await file.read()
    if len(contents) > MAX_UPLOAD_SIZE:
        raise HTTPException(
            status_code=413,
            detail="File too large. Max size is 5MB."
        )

    # Save PDF temporarily
    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pdf"
    ) as temp:

        temp.write(contents)
        file_path = temp.name

    try:
        # Load PDF
        loader = PyPDFLoader(file_path)

        # Extract text
        documents = loader.load()

        # Combine text from all pages
        resume_text = "\n".join(
            doc.page_content for doc in documents
        )

        return {
            "message": "Resume uploaded successfully",
            "filename": file.filename,
            "resume": resume_text
        }

    finally:
        # Delete temporary PDF
        os.remove(file_path)


# Resume analysis endpoint
@app.post("/analyze")
def analyze_resume(
    data: ResumeData,
    user_id: str = Depends(get_current_user_id),
):
    try:
        result = analyze_resume_ats(data.resume, data.job_description)
        return {**result, "user_id": user_id}
    except ValueError as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"AI analysis failed: {exc}",
        ) from exc