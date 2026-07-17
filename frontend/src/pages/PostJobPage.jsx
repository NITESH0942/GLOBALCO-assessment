import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../api/jobsApi';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from '../hooks/usePageTitle';
import './PostJobPage.css';

const WORK_TYPES = ['REMOTE', 'ONSITE', 'HYBRID'];
const ROLE_TYPES = ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP'];
const EXPERIENCE_LEVELS = ['ENTRY', 'MID', 'SENIOR', 'LEAD'];

function PostJobPage({ showToast }) {
  usePageTitle('Post a Job | JobBoard');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    if (!isAuthenticated) {
      showToast('Please sign in to post a job', 'info');
      navigate('/login');
    }
  }, [isAuthenticated]);
  
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    workType: '',
    roleType: '',
    experienceLevel: '',
    salaryRange: '',
    description: '',
    requirements: [''],
  });
  
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  
  const formatLabel = (str) => {
    return str.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    } else if (formData.company.length < 2) {
      newErrors.company = 'Company name must be at least 2 characters';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.workType) {
      newErrors.workType = 'Work type is required';
    }
    
    if (!formData.roleType) {
      newErrors.roleType = 'Role type is required';
    }
    
    if (!formData.experienceLevel) {
      newErrors.experienceLevel = 'Experience level is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
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
  
  const handleRequirementChange = (index, value) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData(prev => ({ ...prev, requirements: newRequirements }));
  };
  
  const addRequirement = () => {
    setFormData(prev => ({ ...prev, requirements: [...prev.requirements, ''] }));
  };
  
  const removeRequirement = (index) => {
    if (formData.requirements.length > 1) {
      const newRequirements = formData.requirements.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, requirements: newRequirements }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    
    try {
      const jobData = {
        ...formData,
        requirements: formData.requirements.filter(r => r.trim() !== ''),
      };
      
      const created = await createJob(jobData);
      showToast('Job posted successfully!', 'success');
      navigate(`/jobs/${created.id}`);
    } catch (err) {
      console.error('Post job error:', err);
      if (err.fieldErrors) {
        // Server validation errors - map to form fields
        setErrors(prev => ({ ...prev, ...err.fieldErrors }));
        showToast('Please fix the errors below', 'error');
      } else if (err.message) {
        showToast(err.message, 'error');
      } else {
        showToast('Failed to post job. Please try again.', 'error');
      }
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div className="post-job-page">
      <div className="post-container">
        <h1>Post a New Job</h1>
        <p className="post-subtitle">Fill in the details to create your job posting</p>
        
        <form onSubmit={handleSubmit} className="post-job-form" noValidate>
          <div className="form-group">
            <label htmlFor="title">Job Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? 'form-input error' : 'form-input'}
              placeholder="e.g. Senior Frontend Engineer"
              disabled={submitting}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="company">Company Name *</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={errors.company ? 'form-input error' : 'form-input'}
                placeholder="e.g. TechCorp Solutions"
                disabled={submitting}
              />
              {errors.company && <span className="error-message">{errors.company}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={errors.location ? 'form-input error' : 'form-input'}
                placeholder="e.g. Bangalore, Remote"
                disabled={submitting}
              />
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>
          </div>
          
          <div className="form-row form-row-3">
            <div className="form-group">
              <label htmlFor="workType">Work Type *</label>
              <select
                id="workType"
                name="workType"
                value={formData.workType}
                onChange={handleChange}
                className={errors.workType ? 'form-select error' : 'form-select'}
                disabled={submitting}
              >
                <option value="">Select...</option>
                {WORK_TYPES.map(type => (
                  <option key={type} value={type}>{formatLabel(type)}</option>
                ))}
              </select>
              {errors.workType && <span className="error-message">{errors.workType}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="roleType">Role Type *</label>
              <select
                id="roleType"
                name="roleType"
                value={formData.roleType}
                onChange={handleChange}
                className={errors.roleType ? 'form-select error' : 'form-select'}
                disabled={submitting}
              >
                <option value="">Select...</option>
                {ROLE_TYPES.map(type => (
                  <option key={type} value={type}>{formatLabel(type)}</option>
                ))}
              </select>
              {errors.roleType && <span className="error-message">{errors.roleType}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="experienceLevel">Experience Level *</label>
              <select
                id="experienceLevel"
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className={errors.experienceLevel ? 'form-select error' : 'form-select'}
                disabled={submitting}
              >
                <option value="">Select...</option>
                {EXPERIENCE_LEVELS.map(level => (
                  <option key={level} value={level}>{formatLabel(level)}</option>
                ))}
              </select>
              {errors.experienceLevel && <span className="error-message">{errors.experienceLevel}</span>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="salaryRange">Salary Range (Optional)</label>
            <input
              type="text"
              id="salaryRange"
              name="salaryRange"
              value={formData.salaryRange}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. ₹15L - ₹25L or Not disclosed"
              disabled={submitting}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Job Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={errors.description ? 'form-textarea error' : 'form-textarea'}
              placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
              rows={6}
              disabled={submitting}
            />
            <div className="char-count">{formData.description.length} / 50 min characters</div>
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>
          
          <div className="form-group">
            <label>Requirements (Optional)</label>
            <div className="requirements-inputs">
              {formData.requirements.map((req, index) => (
                <div key={index} className="requirement-row">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                    className="form-input"
                    placeholder={`Requirement ${index + 1}`}
                    disabled={submitting}
                  />
                  {formData.requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="remove-requirement"
                      disabled={submitting}
                      aria-label="Remove requirement"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addRequirement}
              className="add-requirement"
              disabled={submitting}
            >
              + Add Requirement
            </button>
          </div>
          
          <div className="form-actions">
            <button
              type="submit"
              className="submit-button"
              disabled={submitting}
            >
              {submitting ? 'Posting...' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostJobPage;
