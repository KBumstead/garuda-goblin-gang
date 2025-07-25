import { getCookie } from "../components/ui/utils";

const API_URL = "http://localhost:8000/api"; // Adjust if needed

// Fetch CSRF cookie from Laravel Sanctum
export async function fetchCsrfCookie() {
  await fetch("http://localhost:8000/sanctum/csrf-cookie", {
    credentials: "include",
  });
}

function buildHeaders(base: Record<string, string>): Record<string, string> {
  const xsrfToken = getCookie("XSRF-TOKEN");
  const headers: Record<string, string> = {
    ...base,
    Accept: "application/json",
  };
  if (xsrfToken) {
    headers["X-XSRF-TOKEN"] = xsrfToken;
  }
  return headers;
}

export async function login(email: string, password: string) {
  await fetchCsrfCookie();
  const headers = buildHeaders({ "Content-Type": "application/json" });
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers,
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }
  return response.json();
}

export async function register(
  full_name: string,
  email: string,
  password: string,
  password_confirmation: string,
  roles: string[]
) {
  await fetchCsrfCookie();
  const headers = buildHeaders({ "Content-Type": "application/json" });
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers,
    credentials: "include",
    body: JSON.stringify({
      full_name,
      email,
      password,
      password_confirmation,
      roles,
    }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Registration failed");
  }
  return response.json();
}

export async function fetchProfile() {
  const token = localStorage.getItem("token");
  const headers = buildHeaders({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });
  const response = await fetch(`${API_URL}/profile`, {
    method: "GET",
    headers,
    credentials: "include",
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch profile");
  }
  return response.json();
}

export async function updateProfile(profile: any) {
  const token = localStorage.getItem("token");
  const headers = buildHeaders({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });
  const response = await fetch(`${API_URL}/profile`, {
    method: "PUT",
    headers,
    credentials: "include",
    body: JSON.stringify(profile),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update profile");
  }
  return response.json();
}

export async function switchUserRole(newRole: "user" | "scout" | "trainer") {
  const token = localStorage.getItem("token");
  const headers = buildHeaders({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });
  const response = await fetch(`${API_URL}/profile`, {
    method: "PATCH",
    headers,
    credentials: "include",
    body: JSON.stringify({ user_type: newRole }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to switch user role");
  }
  return response.json();
}

// Fetch all training programs
export async function fetchTrainingPrograms() {
  const response = await fetch("http://localhost:8000/api/training-programs", {
    method: "GET",
    headers: { Accept: "application/json" },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch training programs");
  }
  const data = await response.json();
  // If paginated, return data.data, else return data
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.data)) return data.data;
  return [];
}

// Add a new training program
export async function addTrainingProgram(program: any) {
  await fetchCsrfCookie(); // Ensure CSRF cookie is set before POST
  const token = localStorage.getItem("token");
  const headers = buildHeaders({
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  });
  const response = await fetch("http://localhost:8000/api/training-programs", {
    method: "POST",
    headers,
    credentials: "include",
    body: JSON.stringify(program),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to add training program");
  }
  return response.json();
}

// Fetch all clubs
export async function fetchClubs() {
  const response = await fetch("http://localhost:8000/api/clubs", {
    method: "GET",
    headers: { Accept: "application/json" },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch clubs");
  }
  const data = await response.json();
  // If paginated, return data.data, else return data
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.data)) return data.data;
  return [];
}

//fetch matches
export async function fetchMatches() {
  const response = await fetch(
    "http://localhost:8000/api/matches/upcoming?page=1",
    {
      method: "GET",
      headers: { Accept: "application/json" },
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch matches");
  }
  const data = await response.json();
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.data)) return data.data;
  return [];
}

// Add a match review
export async function addMatchReview({
  match_id,
  player_id,
  comment,
}: {
  match_id: string;
  player_id: string;
  comment: string;
}) {
  await fetchCsrfCookie(); // Ensure CSRF cookie is set before POST
  const token = localStorage.getItem("token");
  const headers = buildHeaders({
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  });
  const response = await fetch(
    "http://localhost:8000/api/player-match-reviews",
    {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify({ match_id, player_id, comment }),
    }
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to add match review");
  }
  return response.json();
}

// Get player match reviews (optionally filter by match_id and/or player_id)
export async function getMatchReviews({
  match_id,
  player_id,
}: { match_id?: string; player_id?: string } = {}) {
  const params = new URLSearchParams();
  if (match_id) params.append("match_id", match_id);
  if (player_id) params.append("player_id", player_id);
  const url = `http://localhost:8000/api/player-match-reviews${
    params.toString() ? `?${params.toString()}` : ""
  }`;
  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch match reviews");
  }
  const data = await response.json();
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.data)) return data.data;
  return [];
}

// Get all player stats for a match (to get players for a match)
export async function getPlayersForMatch(match_id: string) {
  const url = `http://localhost:8000/api/players?match_id=${encodeURIComponent(
    match_id
  )}`;
  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch players for match");
  }
  const data = await response.json();
  // If paginated, return data.data, else return data
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.data)) return data.data;
  return [];
}
