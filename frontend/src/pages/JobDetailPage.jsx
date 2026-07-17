import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchJobById } from '../api/jobsApi';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { usePageTitle } from '../hooks/usePageTitle';
import './JobDetailPage.css';

function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  usePageTitle(job ? `${job.title} at ${job.company} | JobBoard` : 'Job Details | JobBoard');
  
  useEffect(() => {
    const loadJob = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchJobById(id);
        setJob(data);
      } catch (err) {
        if (err.message === 'JOB_NOT_FOUND') {
          setError('NOT_FOUND');
        } else {
          setError('GENERIC');
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadJob();
  }, [id]);
  
  const formatEnum = (str) => {
    if (!str) return '';
    return str.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  };
  
  const getDaysAgo = (postedAt) => {
    const daysAgo = Math.floor((Date.now() - new Date(postedAt).getTime()) / (1000 * 60 * 60 * 24));
    if (daysAgo === 0) return 'Today';
    if (daysAgo === 1) return '1 day ago';
    return `${daysAgo} days ago`;
  };
  
  if (loading) {
    return (
      <div className="job-detail-page">
        <div className="detail-container">
          <LoadingSkeleton count={1} />
        </div>
      </div>
    );
  }
  
  if (error === 'NOT_FOUND') {
    return (
      <div className="job-detail-page">
        <div className="detail-container">
          <div className="not-found-state">
            <div className="not-found-icon">😕</div>
            <h1>Job Not Found</h1>
            <p>The job you're looking for doesn't exist or has been removed.</p>
            <Link to="/" className="back-link">
              ← Back to All Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  if (error === 'GENERIC') {
    return (
      <div className="job-detail-page">
        <div className="detail-container">
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h1>Failed to Load Job</h1>
            <p>Something went wrong. Please try again later.</p>
            <Link to="/" className="back-link">
              ← Back to All Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  if (!job) return null;
  
  return (
    <div className="job-detail-page">
      <div className="detail-container">
        <Link to="/" className="back-to-jobs">
          ← Back to All Jobs
        </Link>
        
        <div className="job-detail-content">
          {/* Header */}
          <div className="job-detail-header">
            <div className="job-company-avatar-large">
              {job.company.charAt(0).toUpperCase()}
            </div>
            <div className="job-detail-header-info">
              <h1 className="job-detail-title">{job.title}</h1>
              <p className="job-detail-company">{job.company}</p>
              <div className="job-detail-meta">
                <span>📍 {job.location}</span>
                <span>🕐 Posted {getDaysAgo(job.postedAt)}</span>
                <span>👥 {job.applicationsCount} {job.applicationsCount === 1 ? 'applicant' : 'applicants'}</span>
              </div>
            </div>
          </div>
          
          {/* Tags */}
          <div className="job-detail-tags">
            <span className="tag tag-work-type">{formatEnum(job.workType)}</span>
            <span className="tag tag-role-type">{formatEnum(job.roleType)}</span>
            <span className="tag tag-experience">{formatEnum(job.experienceLevel)}</span>
          </div>
          
          {/* Salary */}
          {job.salaryRange && (
            <div className="job-detail-salary">
              <span className="salary-label">💰 Salary Range:</span>
              <span className="salary-value">{job.salaryRange}</span>
            </div>
          )}
          
          {/* Description */}
          <div className="job-detail-section">
            <h2>About This Role</h2>
            <p className="job-description">{job.description}</p>
          </div>
          
          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <div className="job-detail-section">
              <h2>Requirements</h2>
              <ul className="requirements-list">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Apply Button */}
          <div className="job-detail-apply">
            <Link to={`/jobs/${job.id}/apply`} className="apply-button">
              Apply Now →
            </Link>
          </div>
        </div>
        
        {/* Mobile Sticky Apply */}
        <div className="mobile-apply-bar">
          <Link to={`/jobs/${job.id}/apply`} className="apply-button-mobile">
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default JobDetailPage;
