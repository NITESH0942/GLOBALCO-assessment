import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchJobs } from '../api/jobsApi';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import FilterChips from '../components/FilterChips';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import { usePageTitle } from '../hooks/usePageTitle';
import './JobListingPage.css';

function JobListingPage() {
  usePageTitle('Browse Jobs | JobBoard');
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 0, totalPages: 0, totalElements: 0 });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Initialize filters from URL params
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    location: searchParams.get('location') || '',
    workType: searchParams.get('workType') || '',
    roleType: searchParams.get('roleType') || '',
    experienceLevel: searchParams.get('experienceLevel') || '',
  });
  
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);
  
  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [filters.search]);
  
  // Sync filters to URL
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '') {
        params.set(key, value);
      }
    });
    if (pagination.page > 0) {
      params.set('page', pagination.page);
    }
    setSearchParams(params, { replace: true });
  }, [filters, pagination.page, setSearchParams]);
  
  // Fetch jobs when filters change
  const loadJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchJobs({
        search: debouncedSearch || undefined,
        location: filters.location || undefined,
        workType: filters.workType || undefined,
        roleType: filters.roleType || undefined,
        experienceLevel: filters.experienceLevel || undefined,
        page: pagination.page,
        size: 12,
      });
      
      setJobs(data.content);
      setPagination(prev => ({
        ...prev,
        totalPages: data.totalPages,
        totalElements: data.totalElements,
      }));
    } catch (err) {
      setError(err.message);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, filters.location, filters.workType, filters.roleType, filters.experienceLevel, pagination.page]);
  
  useEffect(() => {
    loadJobs();
  }, [loadJobs]);
  
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 0 })); // Reset to first page on filter change
  };
  
  const handleRemoveFilter = (key) => {
    setFilters(prev => ({ ...prev, [key]: '' }));
    setPagination(prev => ({ ...prev, page: 0 }));
  };
  
  const handleClearAll = () => {
    setFilters({
      search: '',
      location: '',
      workType: '',
      roleType: '',
      experienceLevel: '',
    });
    setPagination(prev => ({ ...prev, page: 0 }));
  };
  
  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const hasActiveFilters = Object.values(filters).some(v => v && v !== '');
  
  return (
    <div className="job-listing-page">
      <div className="listing-container">
        {/* Header */}
        <div className="listing-header">
          <div className="listing-title-row">
            <h1>Find Your Next Job</h1>
            <button 
              className="mobile-filter-toggle"
              onClick={() => setIsMobileFilterOpen(true)}
              aria-label="Open filters"
            >
              <span>Filters</span>
              {hasActiveFilters && <span className="filter-badge">!</span>}
            </button>
          </div>
          <SearchBar 
            value={filters.search}
            onChange={(value) => handleFilterChange('search', value)}
            placeholder="Search by job title or company..."
          />
        </div>
        
        {/* Filter Chips */}
        <FilterChips 
          filters={filters}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleClearAll}
        />
        
        {/* Main content area */}
        <div className="listing-content">
          {/* Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAll}
            isMobileOpen={isMobileFilterOpen}
            onCloseMobile={() => setIsMobileFilterOpen(false)}
          />
          
          {/* Job Grid */}
          <div className="jobs-section">
            {error ? (
              <div className="error-state">
                <div className="error-icon">⚠️</div>
                <h2>Failed to load jobs</h2>
                <p>{error}</p>
                <button className="retry-button" onClick={loadJobs}>
                  Try Again
                </button>
              </div>
            ) : loading ? (
              <LoadingSkeleton count={6} />
            ) : jobs.length === 0 ? (
              <EmptyState
                title="No jobs found"
                message={
                  hasActiveFilters 
                    ? "Try adjusting your filters or search terms to find more opportunities."
                    : "Check back soon for new job postings!"
                }
                actionLabel={hasActiveFilters ? "Clear Filters" : undefined}
                onAction={hasActiveFilters ? handleClearAll : undefined}
              />
            ) : (
              <>
                <div className="jobs-count">
                  Showing {jobs.length} of {pagination.totalElements} jobs
                </div>
                <div className="jobs-grid">
                  {jobs.map(job => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
                
                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="pagination">
                    <button
                      className="pagination-btn"
                      disabled={pagination.page === 0}
                      onClick={() => handlePageChange(pagination.page - 1)}
                    >
                      ← Previous
                    </button>
                    <span className="pagination-info">
                      Page {pagination.page + 1} of {pagination.totalPages}
                    </span>
                    <button
                      className="pagination-btn"
                      disabled={pagination.page >= pagination.totalPages - 1}
                      onClick={() => handlePageChange(pagination.page + 1)}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobListingPage;
