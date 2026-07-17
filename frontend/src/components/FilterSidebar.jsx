import './FilterSidebar.css';

const WORK_TYPES = ['REMOTE', 'ONSITE', 'HYBRID'];
const ROLE_TYPES = ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP'];
const EXPERIENCE_LEVELS = ['ENTRY', 'MID', 'SENIOR', 'LEAD'];

function FilterSidebar({ filters, onFilterChange, onClearAll, isMobileOpen, onCloseMobile }) {
  const formatLabel = (str) => {
    return str.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  };
  
  // Toggle: clicking an already-selected option deselects it, otherwise selects it (single-select)
  const handleRadioChange = (filterType, value) => {
    const currentValue = filters[filterType];
    onFilterChange(filterType, currentValue === value ? '' : value);
  };
  
  const content = (
    <div className="filter-sidebar-content">
      <div className="filter-header">
        <h3>Filters</h3>
        <button className="filter-clear-all" onClick={onClearAll}>
          Clear all
        </button>
      </div>
      
      <div className="filter-section">
        <h4>Location</h4>
        <input
          type="text"
          className="filter-input"
          placeholder="e.g. Bangalore, Remote"
          value={filters.location || ''}
          onChange={(e) => onFilterChange('location', e.target.value)}
        />
      </div>
      
      <div className="filter-section">
        <h4>Work Type</h4>
        <div className="filter-options">
          {WORK_TYPES.map(type => (
            <label key={type} className={`filter-radio ${filters.workType === type ? 'active' : ''}`}>
              <input
                type="radio"
                name="workType"
                checked={filters.workType === type}
                onChange={() => handleRadioChange('workType', type)}
              />
              <span>{formatLabel(type)}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="filter-section">
        <h4>Role Type</h4>
        <div className="filter-options">
          {ROLE_TYPES.map(type => (
            <label key={type} className={`filter-radio ${filters.roleType === type ? 'active' : ''}`}>
              <input
                type="radio"
                name="roleType"
                checked={filters.roleType === type}
                onChange={() => handleRadioChange('roleType', type)}
              />
              <span>{formatLabel(type)}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="filter-section">
        <h4>Experience Level</h4>
        <div className="filter-options">
          {EXPERIENCE_LEVELS.map(level => (
            <label key={level} className={`filter-radio ${filters.experienceLevel === level ? 'active' : ''}`}>
              <input
                type="radio"
                name="experienceLevel"
                checked={filters.experienceLevel === level}
                onChange={() => handleRadioChange('experienceLevel', level)}
              />
              <span>{formatLabel(level)}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
  
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="filter-sidebar desktop-only">
        {content}
      </aside>
      
      {/* Mobile drawer */}
      {isMobileOpen && (
        <div className="filter-overlay" onClick={onCloseMobile}>
          <aside className="filter-drawer" onClick={e => e.stopPropagation()}>
            <div className="filter-drawer-header">
              <h3>Filters</h3>
              <button className="filter-close" onClick={onCloseMobile} aria-label="Close filters">
                ✕
              </button>
            </div>
            {content}
          </aside>
        </div>
      )}
    </>
  );
}

export default FilterSidebar;
