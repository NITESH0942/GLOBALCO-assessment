import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchMyApplications } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from '../hooks/usePageTitle';
import './MyApplicationsPage.css';

function MyApplicationsPage({ showToast }) {
  usePageTitle('My Applications | JobBoard');
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    loadApplications();
  }, [isAuthenticated, token]);
  
  const loadApplications = async () => {
    try {
      setLoading(true);
      const data = await fetchMyApplications(token);
      setApplications(data);
    } catch (err) {
      setError(err.message || 'Failed to load applications');
      showToast('Failed to load applications', 'error');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="my-applications-page">
        <div className="applications-container">
          <h1>My Applications</h1>
          <div className="loading-skeleton">
            {[1, 2, 3].map(i => <div key={i} className="skeleton-card" />)}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="my-applications-page">
      <div className="applications-container">
        <h1>My Applications</h1>
        
        {applications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h2>No applications yet</h2>
            <p>You haven't applied to any jobs yet. Start browsing and submit your first application!</p>
            <Link to="/" className="browse-btn">Browse Jobs</Link>
          </div>
        ) : (
          <div className="applications-list">
            {applications.map(app => (
              <div key={app.id} className="application-card">
                <div className="application-info">
                  <Link to={`/jobs/${app.jobId}`} className="job-title">{app.jobTitle}</Link>
                  <p className="job-company">{app.jobCompany} — {app.jobLocation}</p>
                </div>
                <div className="application-meta">
                  <span className="applicant-name">{app.name}</span>
                  <span className="applied-date">
                    Applied {new Date(app.appliedAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyApplicationsPage;
