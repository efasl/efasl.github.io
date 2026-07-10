import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, BookOpen, Images } from 'lucide-react';

function NewsList({ navigateTo }) {
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('./data/news.json')
      .then((res) => res.json())
      .then((data) => setAllItems(data))
      .catch((err) => console.error('Error fetching news:', err));
  }, []);

  // Derive type, sort by date (most recent first, no-date items last)
  useEffect(() => {
    let items = allItems.map((item) => ({
      ...item,
      _type: Array.isArray(item.images) ? 'gallery' : 'news',
    }));

    items.sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date) - new Date(a.date);
    });

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      items = items.filter((item) => item.title.toLowerCase().includes(term));
    }

    setFilteredItems(items);
  }, [allItems, searchTerm]);

  const handleItemClick = (item) => {
    if (item.slug) {
      window.location.hash = `#/news/${item.slug}`;
    } else if (item.link) {
      window.open(item.link, '_blank', 'noopener,noreferrer');
    }
  };

  // ── Main list view (news + gallery albums) ─────────────────────────────
  return (
    <div className="news-page">
      {/* Hero Header */}
      <section
        className="page-section"
        style={{
          backgroundColor: 'var(--primary)',
          color: 'var(--text-light)',
          padding: '80px 0 60px 0',
          borderBottom: '4px solid var(--accent)',
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="page-title" style={{ color: 'var(--text-light)', marginBottom: '16px' }}>
            News &amp; Gallery
          </h1>
          <p className="page-subtitle" style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '700px' }}>
            Latest announcements, articles, and photo albums from the Eisenhower Fellowships Association of Sri Lanka.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="page-section">
        <div className="container">
          <div className="directory-controls">
            <div className="search-wrapper" style={{ minWidth: '100%' }}>
              <Search className="search-icon" size={18} />
              <input
                type="text"
                placeholder="Search news or gallery albums..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="news-grid">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, idx) => {
                if (item._type === 'gallery') {
                  // Gallery album card
                  const cover = item.images && item.images[0];
                  return (
                    <div
                      className="news-card"
                      key={`gallery-${idx}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="news-img-wrapper" style={{ position: 'relative' }}>
                        {cover ? (
                          <img src={cover} alt={item.title} className="news-img" />
                        ) : (
                          <div
                            style={{
                              width: '100%', height: '100%', background: 'var(--primary)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}
                          >
                            <Images size={48} color="var(--accent)" />
                          </div>
                        )}
                        {/* Gallery badge */}
                        <span
                          style={{
                            position: 'absolute', top: '10px', left: '10px',
                            background: 'var(--accent)', color: '#fff',
                            fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.07em',
                            borderRadius: '4px', padding: '3px 8px', textTransform: 'uppercase',
                          }}
                        >
                          Gallery
                        </span>
                        {item.images && (
                          <span
                            style={{
                              position: 'absolute', top: '10px', right: '10px',
                              background: 'rgba(0,0,0,0.55)', color: '#fff',
                              fontSize: '0.75rem', borderRadius: '4px', padding: '3px 8px',
                              display: 'flex', alignItems: 'center', gap: '4px',
                            }}
                          >
                            <Images size={12} /> {item.images.length} photos
                          </span>
                        )}
                      </div>
                      <div className="news-content">
                        {item.date && <span className="news-date">{item.date}</span>}
                        <h3 className="news-title">{item.title}</h3>
                        <p className="news-desc">
                          Browse the photo album from this event.
                        </p>
                        <span className="news-readmore">
                          View Album <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  );
                }

                // Regular news article card
                return (
                  <div
                    className="news-card"
                    key={`news-${idx}`}
                    style={item.slug ? { cursor: 'pointer' } : {}}
                    onClick={item.slug ? () => handleItemClick(item) : undefined}
                  >
                    <div className="news-img-wrapper">
                      {item.image
                        ? <img src={item.image} alt={item.title} className="news-img" />
                        : <div className="news-img-placeholder"><span>{item.title}</span></div>
                      }
                    </div>
                    <div className="news-content">
                      {item.date && <span className="news-date">{item.date}</span>}
                      <h3 className="news-title">{item.title}</h3>
                      {item.text && (
                        <p className="news-desc">
                          {item.text.length > 120 ? item.text.slice(0, 120) + '…' : item.text}
                        </p>
                      )}
                      {item.slug ? (
                        <span className="news-readmore">
                          Read More <ArrowRight size={14} />
                        </span>
                      ) : item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="news-readmore"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Read Full Article <ArrowRight size={14} />
                        </a>
                      ) : null}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-results" style={{ width: '100%', gridColumn: '1 / -1' }}>
                <BookOpen size={48} className="no-results-icon" />
                <h3>No Items Found</h3>
                <p>Try refining your search keyword.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default NewsList;
