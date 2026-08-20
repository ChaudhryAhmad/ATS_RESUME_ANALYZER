import logging
import os
from typing import Optional

import jwt
from jwt import PyJWKClient
from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

logger = logging.getLogger(__name__)

security = HTTPBearer(auto_error=False)

# Use a single, backend-specific env var name (avoid the VITE_ prefix,
# which is meant for values exposed to frontend client code).
SUPABASE_URL = os.getenv("SUPABASE_URL")
JWKS_URL = f"{SUPABASE_URL}/auth/v1/.well-known/jwks.json" if SUPABASE_URL else None

_jwk_client = PyJWKClient(JWKS_URL) if JWKS_URL else None


def get_current_user_id(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security),
) -> str:
    if credentials is None:
        raise HTTPException(
            status_code=401,
            detail="Authentication required. Please sign in.",
        )

    if _jwk_client is None:
        raise HTTPException(
            status_code=500,
            detail="SUPABASE_URL is not configured on the server.",
        )

    try:
        signing_key = _jwk_client.get_signing_key_from_jwt(credentials.credentials)
        payload = jwt.decode(
            credentials.credentials,
            signing_key.key,
            algorithms=["ES256"],
            audience="authenticated",
            issuer=f"{SUPABASE_URL}/auth/v1",
        )
    except jwt.PyJWTError as exc:
        logger.warning(f"JWT verification failed: {type(exc).__name__}: {exc}")
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired session. Please sign in again.",
        ) from exc

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token payload.")

    return user_id