import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';
import { TfiLinkedin } from "react-icons/tfi";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const closeMenu = () => setMenuOpen(false);
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon"><TfiLinkedin /></span>
          <span className="logo-text">LinkIn</span>
        </Link>
        
        {/* Desktop links */}
        <div className="navbar-links desktop-nav">
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
        
        {/* Mobile menu toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
        </button>
      </div>
      
      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-container">
            <Link to="/" className="mobile-nav-link" onClick={closeMenu}>Browse Jobs</Link>
            {isAuthenticated ? (
              <>
                <Link to="/jobs/new" className="mobile-nav-link mobile-nav-primary" onClick={closeMenu}>Post a Job</Link>
                <Link to="/my-applications" className="mobile-nav-link" onClick={closeMenu}>My Applications</Link>
                <div className="mobile-user-info">
                  <span className="mobile-user-name">{user?.name}</span>
                  <button onClick={() => { logout(); closeMenu(); }} className="mobile-nav-link mobile-nav-logout">Logout</button>
                </div>
              </>
            ) : (
              <Link to="/login" className="mobile-nav-link mobile-nav-primary" onClick={closeMenu}>Sign In</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
