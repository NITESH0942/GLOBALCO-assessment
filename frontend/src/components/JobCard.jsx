import { Link } from 'react-router-dom';
import './JobCard.css';

function JobCard({ job }) {
  const daysAgo = Math.floor((Date.now() - new Date(job.postedAt).getTime()) / (1000 * 60 * 60 * 24));
  
  const formatEnum = (str) => {
    if (!str) return '';
    return str.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  };
  
  const getTimeAgo = () => {
    if (daysAgo === 0) return 'Today';
    if (daysAgo === 1) return '1 day ago';
    return `${daysAgo} days ago`;
  };
  
  return (
    <Link to={`/jobs/${job.id}`} className="job-card">
      <div className="job-card-header">
        <div className="job-company-avatar">
          {job.company.charAt(0).toUpperCase()}
        </div>
        <span className="job-time-ago">{getTimeAgo()}</span>
      </div>
      
      <div className="job-card-body">
        <h3 className="job-title">{job.title}</h3>
        <p className="job-company">{job.company}</p>
        <p className="job-location">📍 {job.location}</p>
      </div>
      
      <div className="job-tags">
        <span className="tag tag-work-type">{formatEnum(job.workType)}</span>
        <span className="tag tag-role-type">{formatEnum(job.roleType)}</span>
        <span className="tag tag-experience">{formatEnum(job.experienceLevel)}</span>
      </div>
      
      {job.salaryRange && (
        <div className="job-salary">💰 {job.salaryRange}</div>
      )}
      
      <div className="job-card-footer">
        <span className="job-applications">
          {job.applicationsCount} {job.applicationsCount === 1 ? 'applicant' : 'applicants'}
        </span>
        <span className="job-view-link">View Details →</span>
      </div>
    </Link>
  );
}

export default JobCard;
