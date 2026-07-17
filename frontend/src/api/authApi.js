const API_BASE = '/api';

export async function registerUser(data) {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  const body = await response.json();
  if (!response.ok) throw body;
  return body;
}

export async function loginUser(data) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  const body = await response.json();
  if (!response.ok) throw body;
  return body;
}

export async function fetchMyApplications(token) {
  const response = await fetch(`${API_BASE}/applications/me`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  
  if (!response.ok) throw new Error('Failed to fetch applications');
  return response.json();
}
