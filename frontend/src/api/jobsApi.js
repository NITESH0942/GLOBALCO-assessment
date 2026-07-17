const API_BASE = '/api';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

async function handleResponse(response) {
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

export async function fetchJobs(params = {}) {
  const searchParams = new URLSearchParams();
  
  if (params.search) searchParams.set('search', params.search);
  if (params.location) searchParams.set('location', params.location);
  if (params.workType) searchParams.set('workType', params.workType);
  if (params.roleType) searchParams.set('roleType', params.roleType);
  if (params.experienceLevel) searchParams.set('experienceLevel', params.experienceLevel);
  if (params.page !== undefined) searchParams.set('page', params.page);
  if (params.size) searchParams.set('size', params.size);
  
  const url = `${API_BASE}/jobs?${searchParams.toString()}`;
  const response = await fetch(url);
  return handleResponse(response);
}

export async function fetchJobById(id) {
  const response = await fetch(`${API_BASE}/jobs/${id}`);
  
  if (response.status === 404) {
    throw new Error('JOB_NOT_FOUND');
  }
  
  return handleResponse(response);
}

export async function createJob(jobData) {
  const response = await fetch(`${API_BASE}/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(jobData),
  });
  
  return handleResponse(response);
}
