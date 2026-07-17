import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';
import { TfiLinkedin } from "react-icons/tfi";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">Link</span>
          <span className="logo-icon"><TfiLinkedin /></span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Browse Jobs</Link>
          {isAuthenticated ? (
            <>
              <Link to="/jobs/new" className="nav-link nav-link-primary">Post a Job</Link>
              <Link to="/my-applications" className="nav-link">My Applications</Link>
              <div className="nav-user">
                <span className="nav-user-name">{user?.name}</span>
                <button onClick={logout} className="nav-link nav-logout">Logout</button>
              </div>
            </>
          ) : (
            <Link to="/login" className="nav-link nav-link-primary">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
