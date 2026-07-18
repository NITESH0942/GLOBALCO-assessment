import './Footer.css';
import { TfiLinkedin } from "react-icons/tfi";

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">
              <TfiLinkedin />
              
              <span className="logo-text">LinkIn</span>
            </span>
            <p className="footer-tagline">Find your dream job or hire top talent</p>
          </div>
          <div className="footer-links">
            <div className="footer-section">
              <h4>For Job Seekers</h4>
              <a href="/">Browse Jobs</a>
              <a href="/">Career Resources</a>
            </div>
            <div className="footer-section">
              <h4>For Employers</h4>
              <a href="/jobs/new">Post a Job</a>
              <a href="/">Pricing</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} LinkIn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
