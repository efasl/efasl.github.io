import React, { useState, useEffect, useRef } from 'react';
import { Search, X, User, ArrowRight, ChevronDown } from 'lucide-react';

function FellowsDirectory() {
  const [fellows, setFellows] = useState([]);
  const [filteredFellows, setFilteredFellows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');
  const [sortOrder, setSortOrder] = useState('year-desc');
  const [selectedFellow, setSelectedFellow] = useState(null);
  const [yearsList, setYearsList] = useState([]);
  const [allInterests, setAllInterests] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [interestsOpen, setInterestsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetch('./data/fellows.json')
      .then((res) => res.json())
      .then((data) => {
        setFellows(data);

        const years = [...new Set(data.map(f => f.year).filter(Boolean))];
        years.sort((a, b) => b - a);
        setYearsList(years);

        // Collect all unique interests across all fellows
        const interests = new Set();
        data.forEach(f => {
          if (Array.isArray(f.interests)) f.interests.forEach(i => interests.add(i.trim()));
        });
        setAllInterests([...interests].sort());
      })
      .catch((err) => console.error('Error fetching fellows:', err));
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setInterestsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    let result = [...fellows];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        f =>
          f.name.toLowerCase().includes(term) ||
          (f.title && f.title.toLowerCase().includes(term)) ||
          (f.organization && f.organization.toLowerCase().includes(term))
      );
    }

    if (selectedYear !== 'All') {
      result = result.filter(f => f.year === parseInt(selectedYear));
    }

    if (selectedInterests.length > 0) {
      result = result.filter(f =>
        Array.isArray(f.interests) &&
        selectedInterests.some(i => f.interests.includes(i))
      );
    }

    if (sortOrder === 'year-desc') {
      result.sort((a, b) => {
        if (b.year !== a.year) return (b.year || 0) - (a.year || 0);
        return a.name.localeCompare(b.name);
      });
    } else if (sortOrder === 'year-asc') {
      result.sort((a, b) => {
        if (a.year !== b.year) return (a.year || 0) - (b.year || 0);
        return a.name.localeCompare(b.name);
      });
    } else if (sortOrder === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredFellows(result);
  }, [fellows, searchTerm, selectedYear, sortOrder, selectedInterests]);

  const getInitials = (name) => {
    if (!name) return 'EF';
    let cleaned = name.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Dr)\s+/i, '');
    const parts = cleaned.split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return cleaned.slice(0, 2).toUpperCase();
  };

  const toggleInterest = (interest) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleCardClick = (fellow) => setSelectedFellow(fellow);
  const handleCloseDrawer = () => setSelectedFellow(null);

  return (
    <div className="fellows-page">
      {/* Hero Header */}
      <section className="page-section" style={{ backgroundColor: 'var(--primary)', color: 'var(--text-light)', padding: '80px 0 60px 0', borderBottom: '4px solid var(--accent)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="page-title" style={{ color: 'var(--text-light)', marginBottom: '16px' }}>Fellows Directory</h1>
          <p className="page-subtitle" style={{ color: 'rgba(255, 255, 255, 0.8)', maxWidth: '700px' }}>
            Meet the {fellows.length} distinguished leaders and professionals from Sri Lanka who have participated in the Eisenhower Fellowships.
          </p>
        </div>
      </section>

      {/* Directory Grid with Search Filters */}
      <section className="page-section">
        <div className="container">

          <div className="directory-controls">
            <div className="search-wrapper">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                placeholder="Search by name, title, or organization..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-group">
              {/* Areas of Interest multi-select dropdown */}
              <div className="interests-dropdown" ref={dropdownRef}>
                <button
                  className={`filter-select interests-toggle ${selectedInterests.length > 0 ? 'active' : ''}`}
                  onClick={() => setInterestsOpen(o => !o)}
                  aria-haspopup="listbox"
                  aria-expanded={interestsOpen}
                >
                  <span>
                    {selectedInterests.length === 0
                      ? 'Areas of Interest'
                      : `${selectedInterests.length} selected`}
                  </span>
                  <ChevronDown size={14} className={`interests-chevron ${interestsOpen ? 'open' : ''}`} />
                </button>

                {interestsOpen && (
                  <div className="interests-menu" role="listbox" aria-multiselectable="true">
                    {selectedInterests.length > 0 && (
                      <button
                        className="interests-clear"
                        onClick={() => setSelectedInterests([])}
                      >
                        Clear all
                      </button>
                    )}
                    {allInterests.map(interest => (
                      <label key={interest} className="interests-option">
                        <input
                          type="checkbox"
                          checked={selectedInterests.includes(interest)}
                          onChange={() => toggleInterest(interest)}
                        />
                        <span>{interest}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="filter-select"
                aria-label="Filter by Fellowship Year"
              >
                <option value="All">All Years</option>
                {yearsList.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="filter-select"
                aria-label="Sort Fellows list"
              >
                <option value="year-desc">Newest First</option>
                <option value="year-asc">Oldest First</option>
                <option value="name-asc">Name (A - Z)</option>
                <option value="name-desc">Name (Z - A)</option>
              </select>
            </div>
          </div>

          <div className="fellows-grid">
            {filteredFellows.length > 0 ? (
              filteredFellows.map((fellow, idx) => (
                <div
                  className="fellow-card"
                  key={idx}
                  onClick={() => handleCardClick(fellow)}
                >
                  {fellow.year && <span className="fellow-year-badge">{fellow.year}</span>}

                  <div className="fellow-avatar">
                    <span>{getInitials(fellow.name)}</span>
                  </div>

                  <h3 className={`fellow-name ${fellow.deceased ? 'deceased' : ''}`}>
                    {fellow.name}
                  </h3>

                  {fellow.title && <p className="fellow-title">{fellow.title}</p>}
                  {fellow.organization && <p className="fellow-org">{fellow.organization}</p>}

                  <div className="fellow-card-footer">
                    <span>View Profile</span> <ArrowRight size={14} />
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <User size={48} className="no-results-icon" />
                <h3>No Fellows Found</h3>
                <p>Try refining your search terms or selecting another year.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Side-out Drawer Panel for Bio Details */}
      <div
        className={`drawer-backdrop ${selectedFellow ? 'open' : ''}`}
        onClick={handleCloseDrawer}
      ></div>

      <div className="drawer-panel">
        {selectedFellow && (
          <>
            <div className="drawer-header">
              <span className="drawer-title">Fellow Profile</span>
              <button className="drawer-close-btn" onClick={handleCloseDrawer} aria-label="Close profile drawer">
                <X size={20} />
              </button>
            </div>

            <div className="drawer-body">
              <div className="drawer-profile">
                <div className="drawer-avatar">
                  <span>{getInitials(selectedFellow.name)}</span>
                </div>
                <div>
                  <h3 className={`drawer-name ${selectedFellow.deceased ? 'deceased' : ''}`}>
                    {selectedFellow.name}
                  </h3>
                  {selectedFellow.year && (
                    <span className="drawer-badge">
                      Fellowship Year: {selectedFellow.year}
                    </span>
                  )}
                </div>
              </div>

              <div className="drawer-meta-list">
                {selectedFellow.title && (
                  <div className="drawer-meta-item">
                    <div className="drawer-meta-label">Title / Role</div>
                    <div className="drawer-meta-value">{selectedFellow.title}</div>
                  </div>
                )}
                {selectedFellow.organization && (
                  <div className="drawer-meta-item">
                    <div className="drawer-meta-label">Primary Affiliation</div>
                    <div className="drawer-meta-value">{selectedFellow.organization}</div>
                  </div>
                )}
              </div>

              {selectedFellow.interests && selectedFellow.interests.length > 0 && (
                <div className="drawer-interests-section">
                  <h4>Areas of Interest</h4>
                  <div className="drawer-interests-tags">
                    {selectedFellow.interests.map((interest, i) => (
                      <span key={i} className="interest-tag">{interest}</span>
                    ))}
                  </div>
                </div>
              )}

              {selectedFellow.bio ? (
                <div className="drawer-bio-section">
                  <h4>Biography & Program Overview</h4>
                  <p className="drawer-bio-text">{selectedFellow.bio}</p>
                </div>
              ) : (
                <div className="drawer-bio-section">
                  <h4>Biography</h4>
                  <p className="drawer-bio-text" style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
                    No biographical profile is currently available for this fellow.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FellowsDirectory;
