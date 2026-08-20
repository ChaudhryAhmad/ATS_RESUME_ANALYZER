import os
import json
from pathlib import Path

from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field


# --------------------------------------------------
# Load environment variables
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent.parent
load_dotenv(BASE_DIR / ".env", override=True)


# --------------------------------------------------
# Result model
# --------------------------------------------------

class ATSAnalysisResult(BaseModel):
    score: int = Field(ge=0, le=100)
    matched_skills: list[str] = Field(default_factory=list)
    missing_skills: list[str] = Field(default_factory=list)
    strengths: str = ""
    improvements: str = ""
    recommendation: str = ""


# --------------------------------------------------
# Prompt
# --------------------------------------------------

ATS_PROMPT = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """
You are an expert ATS resume analyzer.

Compare the resume with the job description.

You MUST return ONLY valid JSON.

The JSON must have exactly these fields:

{
  "score": 0,
  "matched_skills": [],
  "missing_skills": [],
  "strengths": "",
  "improvements": "",
  "recommendation": ""
}

Rules:

- score must be an integer between 0 and 100.
- matched_skills must be an array of strings.
- missing_skills must be an array of strings.
- strengths must be a string containing 2-3 sentences.
- improvements must be a string containing 2-3 sentences.
- recommendation must be a string containing 2-3 sentences.
- Do not use markdown.
- Do not use ```json.
- Do not add explanations outside the JSON.
- Do not invent experience or skills.
- matched_skills should contain skills clearly found in the resume.
- missing_skills should contain important job requirements not found in the resume.
""",
        ),
        (
            "human",
            """
JOB DESCRIPTION:

{job_description}

RESUME:

{resume}
""",
        ),
    ]
)


# --------------------------------------------------
# Analyze resume
# --------------------------------------------------

def analyze_resume_ats(
    resume: str,
    job_description: str,
) -> dict:

    # Check API key
    api_key = os.getenv("OPENAI_API_KEY")

    if not api_key:
        raise ValueError(
            "OPENAI_API_KEY is not set. Add it to backend/.env"
        )

    # Check input
    if not resume.strip():
        raise ValueError("Resume text is empty.")

    if not job_description.strip():
        raise ValueError("Job description is empty.")

    # Model
    model = os.getenv(
        "OPENAI_MODEL",
        "gpt-4o-mini",
    )

    # Create LLM
    llm = ChatOpenAI(
        model=model,
        temperature=0,
        api_key=api_key,
        model_kwargs={
            "response_format": {
                "type": "json_object"
            }
        },
    )

    # Create prompt
    prompt = ATS_PROMPT.format_messages(
        resume=resume[:12000],
        job_description=job_description[:8000],
    )

    try:
        response = llm.invoke(prompt)

        print("================================")
        print("RAW AI RESPONSE:")
        print(response.content)
        print("================================")

    except Exception as exc:
        print("OPENAI ERROR:")
        print(exc)

        raise ValueError(
            f"OpenAI request failed: {exc}"
        ) from exc

    # Check response
    if not response or not response.content:
        raise ValueError(
            "AI returned an empty response."
        )

    raw_content = response.content.strip()

    # Remove accidental markdown if model adds it
    if raw_content.startswith("```json"):
        raw_content = raw_content[7:]

    elif raw_content.startswith("```"):
        raw_content = raw_content[3:]

    if raw_content.endswith("```"):
        raw_content = raw_content[:-3]

    raw_content = raw_content.strip()

    # Parse JSON
    try:
        data = json.loads(raw_content)

    except json.JSONDecodeError as exc:

        print("================================")
        print("INVALID JSON FROM AI:")
        print(raw_content)
        print("================================")

        raise ValueError(
            f"AI returned invalid JSON: {exc}"
        ) from exc

    # Validate structure
    try:
        result = ATSAnalysisResult.model_validate(data)

    except Exception as exc:

        print("================================")
        print("INVALID ATS STRUCTURE:")
        print(data)
        print("================================")

        raise ValueError(
            f"AI response has invalid structure: {exc}"
        ) from exc

    return result.model_dump()