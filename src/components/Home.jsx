import React, { useState, useEffect } from 'react';
import { ArrowRight, Award, Users, BookOpen } from 'lucide-react';

function Home({ navigateTo }) {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [recentFellows, setRecentFellows] = useState([]);

  useEffect(() => {
    fetch('./data/fellows.json')
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort((a, b) => (b.year || 0) - (a.year || 0));
        setRecentFellows(sorted.slice(0, 8));
      })
      .catch((err) => console.error('Error fetching fellows:', err));
  }, []);

  useEffect(() => {
    fetch('./data/news.json')
      .then((res) => res.json())
      .then((data) => {
        // Sort by date descending, no-date items last
        const sorted = [...data].sort((a, b) => {
          if (!a.date && !b.date) return 0;
          if (!a.date) return 1;
          if (!b.date) return -1;
          return new Date(b.date) - new Date(a.date);
        });
        setFeaturedNews(sorted.slice(0, 3));
      })
      .catch((err) => console.error('Error fetching news:', err));
  }, []);

  return (
    <div className="home-page">
      {/* Hero Banner Section */}
      <section 
        className="hero" 
        style={{ backgroundImage: `url('./img/home-hero1.jpg')` }}
      >
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <span className="hero-tagline">Eisenhower Fellowships Sri Lanka</span>
            <h1 className="hero-title">Empowering Leaders. Building Understanding.</h1>
            <p className="hero-desc">
              EF identifies, empowers and links outstanding leaders from around the world. We help them challenge themselves, envision their potential, and collaborate to build a more peaceful, prosperous and just world.
            </p>
            <div className="hero-actions">
              <a href="#/fellowship" className="btn btn-primary" onClick={() => navigateTo('fellowship')}>
                Explore Fellowships <ArrowRight size={16} />
              </a>
              <a href="#/about" className="btn btn-secondary" onClick={() => navigateTo('about')}>
                About Association
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Block Section */}
      <section className="page-section" style={{ paddingTop: '0' }}>
        <div className="container">
          <div className="welcome-block">
            <div className="welcome-grid">
              <div className="welcome-main">
                <h2 className="welcome-title">AYUBOWAN! Vanakkam! Welcome!</h2>
                <p className="welcome-text">
                  The Eisenhower Fellowships Association of Sri Lanka (EFASL) is a national chapter of global fellows who share their wealth of experience with other fellow Sri Lankans. 
                </p>
                <p className="welcome-text">
                  Formally set up in August 2004, the association hosts programs and meetings to discuss critical topics such as Corporate Governance, Civil Society, International Relations, and Transparency. Through a network of sharing ideas and vision, we aim to build a better future.
                </p>
                <a href="#/about" className="btn btn-primary" style={{ marginTop: '12px' }} onClick={() => navigateTo('about')}>
                  Read Our Story
                </a>
              </div>
              <div className="welcome-side">
                <div className="quote-box">
                  <p className="quote-text">
                    "Exchanges bring truth and understanding to people: and understanding means peace."
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
                    <img src="./img/favicon.ico" alt="Dwight D. Eisenhower" style={{ width: '48px', height: '48px', objectFit: 'cover', flexShrink: 0 }} />
                    <p className="quote-author">Dwight D. Eisenhower</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Focus / Features Section */}
      <section className="page-section" style={{ backgroundColor: '#f1f5f9' }}>
        <div className="container">
          <div className="page-title-block">
            <h2 className="page-title">What We Do</h2>
            <p className="page-subtitle">Advancing the mission of global leadership and leadership development in Sri Lanka.</p>
            <div className="title-separator"></div>
          </div>

          <div className="features-grid">
            <div className="feature-card" style={{ cursor: 'pointer' }} onClick={() => navigateTo('fellows')}>
              <div className="feature-icon-wrapper">
                <Users size={24} />
              </div>
              <h3 className="feature-title">Fellowship Network</h3>
              <p className="feature-desc">
                Fostering vital national and regional links among Eisenhower Fellows, sharing resources and experience to enrich professional developments.
              </p>
              <span className="feature-link">Meet the Fellows <ArrowRight size={14} /></span>
            </div>

            <div className="feature-card" style={{ cursor: 'pointer' }} onClick={() => navigateTo('news')}>
              <div className="feature-icon-wrapper">
                <BookOpen size={24} />
              </div>
              <h3 className="feature-title">Experience Sharing</h3>
              <p className="feature-desc">
                Organizing annual seminars, lectures, and panel discussions on governance, societal challenges, and global leadership ideas.
              </p>
              <span className="feature-link">News &amp; Updates <ArrowRight size={14} /></span>
            </div>

            <div className="feature-card" style={{ cursor: 'pointer' }} onClick={() => { window.location.hash = '#/fellowship'; setTimeout(() => { document.getElementById('efasl-youth-leadership')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }}>
              <div className="feature-icon-wrapper">
                <Award size={24} />
              </div>
              <h3 className="feature-title">Empowering Youth Leaders</h3>
              <p className="feature-desc">
                Developing the next generation of purpose-driven Sri Lankan leaders through the Youth Leadership Program; mentorship, peer learning, and a commitment to lasting impact.
              </p>
              <span className="feature-link">Youth Leadership Program <ArrowRight size={14} /></span>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Fellows Section */}
      <section className="page-section">
        <div className="container">
          <div className="page-title-block">
            <h2 className="page-title">Recent Fellows</h2>
            <p className="page-subtitle">Meet some of Sri Lanka's outstanding Eisenhower Fellows.</p>
            <div className="title-separator"></div>
          </div>

          <div className="recent-fellows-grid">
            {recentFellows.map((fellow, idx) => {
              const initials = fellow.name
                .split(' ')
                .slice(0, 2)
                .map((n) => n[0])
                .join('');
              return (
                <div className="home-fellow-card" key={idx}>
                  <div className="home-fellow-avatar">{initials}</div>
                  <div className="home-fellow-info">
                    <span className="home-fellow-name">{fellow.name}</span>
                    <span className="home-fellow-year">{fellow.year}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <a href="#/fellows" className="btn btn-primary" onClick={() => navigateTo('fellows')}>
              View All Fellows <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Featured News Section */}
      <section className="page-section">
        <div className="container">
          <div className="page-title-block">
            <h2 className="page-title">Latest Updates</h2>
            <p className="page-subtitle">Stay informed about our fellows' achievements and upcoming events.</p>
            <div className="title-separator"></div>
          </div>

          <div className="news-grid">
            {featuredNews.map((article, idx) => {
              const isGallery = Array.isArray(article.images);
              const cover = isGallery ? article.images[0] : article.image;
              const hasSlug = !!article.slug;

              const cardContent = (
                <>
                  <div className="news-img-wrapper">
                    {cover
                      ? <img src={cover} alt={article.title} className="news-img" />
                      : <div className="news-img-placeholder"><span>{article.title}</span></div>
                    }
                  </div>
                  <div className="news-content">
                    {article.date && <span className="news-date">{article.date}</span>}
                    <h3 className="news-title">{article.title}</h3>
                    {article.text ? (
                      <p className="news-desc">
                        {article.text.length > 100 ? article.text.slice(0, 100) + '…' : article.text}
                      </p>
                    ) : (
                      <p className="news-desc">
                        {isGallery ? 'Browse photos from this event.' : 'Read this news highlight from the Eisenhower Fellowships Association of Sri Lanka.'}
                      </p>
                    )}
                    <span className="news-readmore">
                      {isGallery ? 'View Album' : 'Read More'} <ArrowRight size={14} />
                    </span>
                  </div>
                </>
              );

              if (hasSlug) {
                return (
                  <div
                    className="news-card"
                    key={idx}
                    style={{ cursor: 'pointer' }}
                    onClick={() => { window.location.hash = `#/news/${article.slug}`; }}
                  >
                    {cardContent}
                  </div>
                );
              }
              if (article.link) {
                return (
                  <a
                    className="news-card"
                    key={idx}
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                  >
                    {cardContent}
                  </a>
                );
              }
              return <div className="news-card" key={idx}>{cardContent}</div>;
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <a href="#/news" className="btn btn-primary" onClick={() => navigateTo('news')}>
              View All News & Announcements
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
