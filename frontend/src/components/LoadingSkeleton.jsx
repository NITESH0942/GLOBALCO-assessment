import './LoadingSkeleton.css';

function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-header">
            <div className="skeleton-avatar skeleton-pulse"></div>
            <div className="skeleton-time skeleton-pulse"></div>
          </div>
          <div className="skeleton-body">
            <div className="skeleton-title skeleton-pulse"></div>
            <div className="skeleton-company skeleton-pulse"></div>
            <div className="skeleton-location skeleton-pulse"></div>
          </div>
          <div className="skeleton-tags">
            <div className="skeleton-tag skeleton-pulse"></div>
            <div className="skeleton-tag skeleton-pulse"></div>
            <div className="skeleton-tag skeleton-pulse"></div>
          </div>
          <div className="skeleton-footer">
            <div className="skeleton-count skeleton-pulse"></div>
            <div className="skeleton-link skeleton-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;
