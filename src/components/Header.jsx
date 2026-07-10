import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

function Header({ activeTab, navigateTo }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [fellowshipDropdownOpen, setFellowshipDropdownOpen] = useState(false);

  const handleNavClick = (tab) => {
    navigateTo(tab);
    setIsMobileMenuOpen(false);
    setFellowshipDropdownOpen(false);
  };

  const handleFellowshipSubClick = (anchor) => {
    navigateTo('fellowship');
    setIsMobileMenuOpen(false);
    setFellowshipDropdownOpen(false);
    // Wait for page to render then scroll
    setTimeout(() => {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const fellowshipSubLinks = [
    { anchor: 'ef-global-program', label: 'EF Global Program' },
    { anchor: 'ef-innovative-entrepreneurs', label: 'EF Innovative Entrepreneurs Program' },
    { anchor: 'efasl-youth-leadership', label: 'EFASL Youth Leadership Program' },
  ];

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'fellowship', label: 'Fellowship Programs' },
    { id: 'fellows', label: 'Meet the Fellows' },
    { id: 'news', label: 'News & Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="site-header">
      {/* Logo sits on the header root so it can float across both bars without clipping */}
      <div className="container header-logo-slot">
        <a href="#/home" className="logo-link" onClick={() => handleNavClick('home')}>
          <img src="./img/logo.png" alt="Eisenhower Fellowships Sri Lanka" className="logo-img" />
        </a>
      </div>

      {/* Orange utility bar */}
      <div className="header-topbar">
        <div className="container">
          <a href="https://www.efworld.org/" target="_blank" rel="noopener noreferrer" className="topbar-link">EF Global</a>
          <a href="https://www.efworld.org/apply-now/" target="_blank" rel="noopener noreferrer" className="topbar-link">Apply Now</a>
          <a href="https://efworld.my.site.com/s/login/" target="_blank" rel="noopener noreferrer" className="topbar-link">Login</a>
        </div>
      </div>

      {/* Blue nav bar */}
      <div className="header-main">
        <div className="container header-container">
          <nav className="desktop-nav">
            {navLinks.map((link) =>
              link.id === 'fellowship' ? (
                <div
                  key={link.id}
                  className="nav-dropdown-wrapper"
                  onMouseEnter={() => setFellowshipDropdownOpen(true)}
                  onMouseLeave={() => setFellowshipDropdownOpen(false)}
                >
                  <a
                    href="#/fellowship"
                    className={`nav-link nav-link--dropdown ${activeTab === 'fellowship' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); handleNavClick('fellowship'); }}
                  >
                    {link.label} <ChevronDown size={14} className={`dropdown-chevron ${fellowshipDropdownOpen ? 'open' : ''}`} />
                  </a>
                  {fellowshipDropdownOpen && (
                    <div className="nav-dropdown-menu">
                      <div className="nav-dropdown-menu-inner">
                        {fellowshipSubLinks.map((sub) => (
                          <button
                            key={sub.anchor}
                            className="nav-dropdown-item"
                            onClick={() => handleFellowshipSubClick(sub.anchor)}
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={link.id}
                  href={`#/${link.id}`}
                  className={`nav-link ${activeTab === link.id ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.id); }}
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          <button
            className="menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <nav className={`mobile-nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <React.Fragment key={link.id}>
            <a
              href={`#/${link.id}`}
              className={`mobile-nav-link ${activeTab === link.id ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.id); }}
            >
              {link.label}
            </a>
            {link.id === 'fellowship' && fellowshipSubLinks.map((sub) => (
              <button
                key={sub.anchor}
                className="mobile-nav-sublink"
                onClick={() => handleFellowshipSubClick(sub.anchor)}
              >
                {sub.label}
              </button>
            ))}
          </React.Fragment>
        ))}
        <a
          href="https://www.efworld.org/apply"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ marginTop: '14px', textAlign: 'center' }}
        >
          Apply Now
        </a>
      </nav>
    </header>
  );
}

export default Header;
