const API_BASE = '/api';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

export async function submitApplication(applicationData) {
  const response = await fetch(`${API_BASE}/applications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(applicationData),
  });
  
  if (response.ok) {
    return response.json();
  }
  
  let errorData;
  try {
    errorData = await response.json();
  } catch {
    throw { message: `Request failed with status ${response.status}` };
  }
  
  throw errorData;
}
