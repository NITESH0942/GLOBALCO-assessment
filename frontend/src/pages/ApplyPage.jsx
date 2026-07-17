import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchJobById } from '../api/jobsApi';
import { submitApplication } from '../api/applicationsApi';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from '../hooks/usePageTitle';
import './ApplyPage.css';

function ApplyPage({ showToast }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobError, setJobError] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resumeLink: '',
    coverNote: '',
  });
  
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  usePageTitle(job ? `Apply for ${job.title} | JobBoard` : 'Apply | JobBoard');
  
  useEffect(() => {
    if (!isAuthenticated) {
      showToast('Please sign in to apply for jobs', 'info');
      navigate('/login');
      return;
    }
    const loadJob = async () => {
      try {
        const data = await fetchJobById(id);
        setJob(data);
      } catch (err) {
        setJobError(true);
      } finally {
        setLoading(false);
      }
    };
    
    loadJob();
  }, [id]);
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+]?[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number (10-15 digits)';
    }
    
    if (formData.resumeLink && formData.resumeLink.length > 500) {
      newErrors.resumeLink = 'Resume link must be less than 500 characters';
    }
    
    if (formData.coverNote && formData.coverNote.length > 1000) {
      newErrors.coverNote = 'Cover note must be less than 1000 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    
    try {
      await submitApplication({
        ...formData,
        jobId: parseInt(id),
      });
      
      setSubmitted(true);
      showToast('Application submitted successfully!', 'success');
    } catch (err) {
      console.error('Apply error:', err);
      if (err.fieldErrors) {
        setErrors(prev => ({ ...prev, ...err.fieldErrors }));
        showToast('Please fix the errors below', 'error');
      } else if (err.message) {
        showToast(err.message, 'error');
      } else {
        showToast('Failed to submit application. Please try again.', 'error');
      }
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="apply-page">
        <div className="apply-container">
          <div className="loading-state">Loading...</div>
        </div>
      </div>
    );
  }
  
  if (jobError) {
    return (
      <div className="apply-page">
        <div className="apply-container">
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h1>Job Not Found</h1>
            <p>The job you're trying to apply for doesn't exist.</p>
            <Link to="/" className="back-link">← Back to All Jobs</Link>
          </div>
        </div>
      </div>
    );
  }
  
  if (submitted) {
    return (
      <div className="apply-page">
        <div className="apply-container">
          <div className="success-state">
            <div className="success-icon">🎉</div>
            <h1>Application Submitted!</h1>
            <p>
              Thank you for applying to <strong>{job.title}</strong> at <strong>{job.company}</strong>.
              The hiring team will review your application and get back to you soon.
            </p>
            <div className="success-actions">
              <Link to={`/jobs/${job.id}`} className="back-to-job">
                ← Back to Job
              </Link>
              <Link to="/" className="browse-more">
                Browse More Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="apply-page">
      <div className="apply-container">
        <Link to={`/jobs/${id}`} className="back-link">
          ← Back to Job
        </Link>
        
        <div className="apply-content">
          <div className="apply-header">
            <h1>Apply for Position</h1>
            <div className="apply-job-info">
              <h2>{job.title}</h2>
              <p>{job.company} • {job.location}</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="apply-form" noValidate>
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'form-input error' : 'form-input'}
                placeholder="John Doe"
                disabled={submitting}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'form-input error' : 'form-input'}
                  placeholder="john@example.com"
                  disabled={submitting}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'form-input error' : 'form-input'}
                  placeholder="+91 9876543210"
                  disabled={submitting}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="resumeLink">Resume Link (Optional)</label>
              <input
                type="url"
                id="resumeLink"
                name="resumeLink"
                value={formData.resumeLink}
                onChange={handleChange}
                className={errors.resumeLink ? 'form-input error' : 'form-input'}
                placeholder="https://drive.google.com/your-resume"
                disabled={submitting}
              />
              {errors.resumeLink && <span className="error-message">{errors.resumeLink}</span>}
              <span className="form-hint">Link to your resume on Google Drive, Dropbox, or similar</span>
            </div>
            
            <div className="form-group">
              <label htmlFor="coverNote">Cover Note (Optional)</label>
              <textarea
                id="coverNote"
                name="coverNote"
                value={formData.coverNote}
                onChange={handleChange}
                className={errors.coverNote ? 'form-textarea error' : 'form-textarea'}
                placeholder="Tell us why you're a great fit for this role..."
                rows={5}
                disabled={submitting}
              />
              <div className="char-count">{formData.coverNote.length} / 1000 characters</div>
              {errors.coverNote && <span className="error-message">{errors.coverNote}</span>}
            </div>
            
            <div className="form-actions">
              <button
                type="submit"
                className="submit-button"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ApplyPage;
