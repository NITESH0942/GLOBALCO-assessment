import './FilterChips.css';

function FilterChips({ filters, onRemoveFilter, onClearAll }) {
  const formatLabel = (key, value) => {
    const formattedValue = value.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
    const formattedKey = key.replace(/([A-Z])/g, ' $1').toLowerCase().replace(/^\w/, c => c.toUpperCase());
    return `${formattedKey}: ${formattedValue}`;
  };
  
  const activeFilters = Object.entries(filters).filter(([_, value]) => value && value !== '');
  
  if (activeFilters.length === 0) return null;
  
  return (
    <div className="filter-chips">
      <div className="chips-list">
        {activeFilters.map(([key, value]) => (
          <span key={key} className="chip">
            <span className="chip-label">{formatLabel(key, value)}</span>
            <button 
              className="chip-remove" 
              onClick={() => onRemoveFilter(key)}
              aria-label={`Remove ${key} filter`}
            >
              ✕
            </button>
          </span>
        ))}
      </div>
      {activeFilters.length > 1 && (
        <button className="chips-clear-all" onClick={onClearAll}>
          Clear all
        </button>
      )}
    </div>
  );
}

export default FilterChips;
