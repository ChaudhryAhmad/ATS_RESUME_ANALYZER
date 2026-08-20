from fastapi import APIRouter

# A router is a mini-app that groups related endpoints.
# This one only has one endpoint for now, but later you might add
# routes/resume.py, routes/auth.py, etc., each with its own router.
router = APIRouter()


@router.get("/health")
def health_check():
    """Simple endpoint the frontend calls to confirm the backend is running."""
    return {"status": "ok"}
