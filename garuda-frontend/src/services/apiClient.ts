import { getCookie } from '../components/ui/utils';

const API_URL = "http://localhost:8000/api"; // Adjust if needed

// Fetch CSRF cookie from Laravel Sanctum
export async function fetchCsrfCookie() {
  await fetch("http://localhost:8000/sanctum/csrf-cookie", {
    credentials: 'include',
  });
}

function buildHeaders(base: Record<string, string>): Record<string, string> {
  const xsrfToken = getCookie('XSRF-TOKEN');
  const headers = { ...base, 'Accept': 'application/json' }; // <-- Always add Accept
  if (xsrfToken) {
    headers['X-XSRF-TOKEN'] = xsrfToken;
  }
  return headers;
}

export async function login(email: string, password: string) {
  await fetchCsrfCookie();
  const headers = buildHeaders({ "Content-Type": "application/json" });
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers,
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }
  return response.json();
}

export async function register(full_name: string, email: string, password: string, password_confirmation: string, roles: string[]) {
  await fetchCsrfCookie();
  const headers = buildHeaders({ "Content-Type": "application/json" });
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers,
    credentials: 'include',
    body: JSON.stringify({ full_name, email, password, password_confirmation, roles }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Registration failed");
  }
  return response.json();
}

export async function fetchProfile() {
  const token = localStorage.getItem("token");
  const headers = buildHeaders({ "Content-Type": "application/json", "Authorization": `Bearer ${token}` });
  const response = await fetch(`${API_URL}/profile`, {
    method: "GET",
    headers,
    credentials: 'include',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch profile");
  }
  return response.json();
}

export async function updateProfile(profile: any) {
  const token = localStorage.getItem("token");
  const headers = buildHeaders({ "Content-Type": "application/json", "Authorization": `Bearer ${token}` });
  const response = await fetch(`${API_URL}/profile`, {
    method: "PUT",
    headers,
    credentials: 'include',
    body: JSON.stringify(profile),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update profile");
  }
  return response.json();
} 