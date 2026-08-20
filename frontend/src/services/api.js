import { getAccessToken } from "./supabase";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

async function buildHeaders(includeJson = false) {
  const headers = {};

  if (includeJson) {
    headers["Content-Type"] = "application/json";
  }

  const token = await getAccessToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data.detail || `Request failed: ${response.status}`;
    throw new Error(
      typeof message === "string" ? message : JSON.stringify(message)
    );
  }

  return data;
}

export async function checkBackendHealth() {
  const response = await fetch(`${API_BASE_URL}/api/health`);
  return handleResponse(response);
}

export async function uploadResume(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/upload-resume`, {
    method: "POST",
    headers: await buildHeaders(),
    body: formData,
  });

  return handleResponse(response);
}

export async function analyzeResume(resume, jobDescription) {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: "POST",
    headers: await buildHeaders(true),
    body: JSON.stringify({
      resume,
      job_description: jobDescription,
    }),
  });

  return handleResponse(response);
}
