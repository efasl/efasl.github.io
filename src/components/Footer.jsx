import React from 'react';
import { Mail, Facebook, Linkedin, MapPin, Globe } from 'lucide-react';

function Footer({ navigateTo }) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (tab, e) => {
    e.preventDefault();
    navigateTo(tab);
  };

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        {/* About Column */}
        <div className="footer-about">
          <h4>
            <img src="./img/logo_whit.png" alt="EF Sri Lanka Logo" className="footer-logo-img" />
            <span>EF Sri Lanka</span>
          </h4>
          <p className="footer-about-text">
            Connecting emerging leaders from Sri Lanka with a global network to foster international understanding, collaboration, and positive societal change.
          </p>
          <div className="footer-socials">
            <a href="https://www.facebook.com/eflka" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="https://www.linkedin.com/company/eisenhower-fellowship-association-of-sri-lanka/" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Useful Links Column 1 */}
        <div className="footer-col">
          <h4>Explore</h4>
          <ul className="footer-links">
            <li><a href="#/home" onClick={(e) => handleLinkClick('home', e)}>Home</a></li>
            <li><a href="#/about" onClick={(e) => handleLinkClick('about', e)}>About Us</a></li>
            <li><a href="#/fellowship" onClick={(e) => handleLinkClick('fellowship', e)}>Fellowship Info</a></li>
            <li><a href="#/fellows" onClick={(e) => handleLinkClick('fellows', e)}>Fellows Directory</a></li>
          </ul>
        </div>

        {/* Useful Links Column 2 */}
        <div className="footer-col">
          <h4>Resources</h4>
          <ul className="footer-links">
            <li><a href="#/news" onClick={(e) => handleLinkClick('news', e)}>News & Gallery</a></li>
            <li><a href="#/contact" onClick={(e) => handleLinkClick('contact', e)}>Contact Us</a></li>
            <li><a href="https://www.efworld.org/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Globe size={14} /> EF Global</a></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="footer-col">
          <h4>Contact Details</h4>
          <address className="footer-address">
            <div className="footer-address-item">
              <MapPin size={18} className="footer-address-icon" />
              <span>Colombo, Sri Lanka</span>
            </div>
            <div className="footer-address-item" style={{ marginTop: '8px' }}>
              <Mail size={18} className="footer-address-icon" />
              <a href="mailto:eisenhowerfoundationsl@gmail.com" style={{ wordBreak: 'break-all' }}>eisenhowerfoundationsl@gmail.com</a>
            </div>
          </address>
        </div>
      </div>

      <div className="container footer-bottom">
        <span className="copyright-text">
          &copy; 2004-{currentYear} Eisenhower Fellowships Association of Sri Lanka. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
