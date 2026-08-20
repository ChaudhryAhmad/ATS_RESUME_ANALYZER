# ATS Resume Analyzer

Portfolio project scaffold. Current stage: **frontend + backend skeleton with a health check**.
Not yet implemented: OpenAI API, RAG, LangGraph/agents, Supabase (Auth, Postgres, Storage).

## Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Python + FastAPI

## Project structure
```
ats-resume-analyzer/
├── frontend/        React app (Vite + Tailwind)
├── backend/          FastAPI app
├── README.md
└── .gitignore
```

## 1. Run the backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

Backend will be running at: http://localhost:8000
Check it directly: http://localhost:8000/api/health → `{"status": "ok"}`

## 2. Run the frontend

Open a **second terminal** (leave the backend running):

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend will be running at: http://localhost:5173

Open that URL in your browser — you should see "Backend connected" if both servers are running.

## How it works
- The React app (`frontend`) calls `GET /api/health` on the FastAPI backend when the Home page loads.
- FastAPI (`backend`) is configured with CORS to explicitly allow requests from `http://localhost:5173`.
- If the backend isn't running, the frontend will show "Backend not reachable" instead of crashing.

## Next steps (not built yet, on purpose)
- Resume upload endpoint + file parsing
- OpenAI API integration for resume analysis
- RAG pipeline for job-description matching
- LangGraph agent orchestration
- Supabase for Auth, Postgres, and Storage
