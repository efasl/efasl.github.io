import React, { useState, useEffect } from 'react';
import { ArrowLeft, Linkedin, Users, CalendarDays, ExternalLink } from 'lucide-react';

function YLPCohort({ cohort, navigateTo }) {
  const [data, setData] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const cohortYear = parseInt(cohort, 10);
    const programSlug = `efasl-ylp-${cohort}`;

    Promise.all([
      fetch('./data/ylp.json').then(r => r.json()),
      fetch('./data/news.json').then(r => r.json()),
    ])
      .then(([ylpData, newsData]) => {
        const found = ylpData.find(c => c.cohort === cohortYear);
        if (!found) { setNotFound(true); return; }

        const sorted = [...found.members].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setData({ ...found, members: sorted });

        const news = newsData
          .filter(n => n.program === programSlug)
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        setRelatedNews(news);
      })
      .catch(() => setNotFound(true));
  }, [cohort]);

  if (!data && !notFound) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading…</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Cohort not found.</p>
        <button className="btn btn-primary" onClick={() => navigateTo('fellowship')}>
          <ArrowLeft size={16} /> Back to Fellowship
        </button>
      </div>
    );
  }

  return (
    <div className="ylp-cohort-page">
      {/* Hero */}
      <section className="page-section" style={{ backgroundColor: 'var(--primary)', color: 'var(--text-light)', padding: '80px 0 60px', borderBottom: '4px solid var(--accent)' }}>
        <div className="container">
          <button
            onClick={() => navigateTo('fellowship')}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', marginBottom: '28px', padding: 0 }}
          >
            <ArrowLeft size={16} /> Fellowship Programs
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
            <span style={{ background: 'var(--accent)', color: '#fff', fontWeight: 700, fontSize: '0.8rem', padding: '4px 12px', borderRadius: 'var(--radius-full)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              EFASL YLP
            </span>
          </div>
          <h1 className="page-title" style={{ color: 'var(--text-light)', marginBottom: '12px' }}>
            Youth Leadership Program {data.cohort}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users size={15} /> {data.members.length} participants
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CalendarDays size={15} /> {data.cohort} Cohort
            </span>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">

          {/* About this cohort */}
          <div className="page-title-block">
            <h2 className="page-title">About This Cohort</h2>
            <p className="page-subtitle">
              {data.cohort === 2025
                ? 'The inaugural cohort of the EFASL Youth Leadership Program — eight exceptional young leaders who completed a transformative journey, marking the beginning of a new generation of purpose-driven changemakers in Sri Lanka.'
                : `The ${data.cohort} cohort of the EFASL Youth Leadership Program brings together ${data.members.length} exceptional young leaders from diverse backgrounds, regions, and communities across Sri Lanka, united by a shared commitment to driving positive change.`}
            </p>
            <div className="title-separator"></div>
          </div>

          {/* Members */}
          <div style={{ marginBottom: '72px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '24px' }}>
              Youth Leaders
            </h3>
            <div className="ylp-members-grid">
              {data.members.map((m, i) => (
                <div key={i} className="ylp-member-card">
                  <div className="ylp-member-avatar">
                    {m.name.split(' ').filter(w => /^[A-Z]/.test(w)).slice(0, 2).map(w => w[0]).join('')}
                  </div>
                  <div className="ylp-member-info">
                    <span className="ylp-member-name">{m.name}</span>
                  </div>
                  {m.linkedin ? (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ylp-linkedin-btn"
                      title={`${m.name} on LinkedIn`}
                    >
                      <Linkedin size={15} />
                    </a>
                  ) : (
                    <span className="ylp-linkedin-btn" style={{ opacity: 0.15, cursor: 'default', pointerEvents: 'none' }}>
                      <Linkedin size={15} />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Related News */}
          {relatedNews.length > 0 && (
            <div>
              <div className="page-title-block">
                <h2 className="page-title">Program Updates</h2>
                <div className="title-separator"></div>
              </div>
              <div className="ylp-news-list">
                {relatedNews.map((item, i) => (
                  <div
                    key={i}
                    className="ylp-news-item"
                    style={item.slug ? { cursor: 'pointer' } : {}}
                    onClick={item.slug ? () => navigateTo(`news/${item.slug}`) : undefined}
                  >
                    {item.image && (
                      <img src={item.image} alt={item.title} className="ylp-news-img" />
                    )}
                    <div className="ylp-news-body">
                      {item.date && (
                        <span className="news-date">{new Date(item.date).toLocaleDateString('en-LK', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      )}
                      <h4 className="ylp-news-title">{item.title}</h4>
                      {item.text && (
                        <p className="ylp-news-text">{item.text.slice(0, 200)}{item.text.length > 200 ? '…' : ''}</p>
                      )}
                    </div>
                    {item.slug && (
                      <div className="ylp-news-arrow">
                        <ExternalLink size={16} style={{ color: 'var(--accent)' }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}

export default YLPCohort;
