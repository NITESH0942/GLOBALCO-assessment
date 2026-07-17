import './EmptyState.css';

function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">🔍</div>
      <h2 className="empty-title">{title}</h2>
      <p className="empty-message">{message}</p>
      {actionLabel && onAction && (
        <button className="empty-action" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
