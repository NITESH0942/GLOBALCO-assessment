import './SearchBar.css';

function SearchBar({ value, onChange, placeholder = 'Search jobs...' }) {
  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        className="search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search jobs by title or company"
      />
      {value && (
        <button 
          className="search-clear" 
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
