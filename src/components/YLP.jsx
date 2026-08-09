import React, { useState, useEffect } from 'react';
import { Users, ArrowRight } from 'lucide-react';

function YLP({ navigateTo }) {
  const [ylpCohorts, setYlpCohorts] = useState([]);

  useEffect(() => {
    fetch('./data/ylp.json')
      .then(r => r.json())
      .then(data => setYlpCohorts(data))
      .catch(() => { });
  }, []);

  return (
    <div className="ylp-page">
      {/* Hero Header */}
      <section className="page-section" style={{ backgroundColor: 'var(--primary)', color: 'var(--text-light)', padding: '80px 0 60px 0', borderBottom: '4px solid var(--accent)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span style={{ background: 'var(--accent)', color: '#fff', fontWeight: 700, fontSize: '0.8rem', padding: '4px 12px', borderRadius: 'var(--radius-full)', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '12px' }}>
            EFASL Programs
          </span>
          <h1 className="page-title" style={{ color: 'var(--text-light)', marginBottom: '16px' }}>
            Youth Leadership Program (YLP)
          </h1>
          <p className="page-subtitle" style={{ color: 'rgba(255, 255, 255, 0.8)', maxWidth: '700px', margin: '0 auto' }}>
            Identifying, empowering, and connecting the next generation of purpose-driven leaders across Sri Lanka.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="page-section">
        <div className="container">
          <div className="fellowship-card" style={{ padding: '40px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', boxShadow: '0 8px 32px rgba(0,0,0,0.05)' }}>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '20px' }}>
              The Youth Leadership Program is EFASL's flagship local initiative, conceptualized by Eran Wickramaratne (EF 2004) and inaugurated under the leadership of Heminda Jayaweera (EF 2021). It is designed to identify and develop the next generation of purpose-driven leaders across Sri Lanka, bringing together exceptional young leaders from diverse backgrounds, regions, and communities, united by a shared commitment to creating meaningful impact.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '32px' }}>
              Through mentorship from Senior Eisenhower Fellows, immersive workshops, and peer learning, participants develop the leadership skills, networks, and vision needed to drive positive change in their communities and beyond.
            </p>

            {/* Embedded Video */}
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', margin: '32px 0' }}>
              <iframe
                src="https://www.youtube.com/embed/KPRgA5_w9EM?si=k3id5jpYrCKhT4g7"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              />
            </div>

            {/* Cohorts */}
            {ylpCohorts.length > 0 && (
              <div style={{ marginTop: '48px' }}>
                <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', color: 'var(--primary)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Explore YLP Cohorts
                </h3>
                <div className="ylp-cohort-cards">
                  {ylpCohorts.map(c => (
                    <div
                      key={c.cohort}
                      className="ylp-cohort-card"
                      onClick={() => navigateTo(`ylp/${c.cohort}`)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => e.key === 'Enter' && navigateTo(`ylp/${c.cohort}`)}
                    >
                      {c.image && (
                        <div className="ylp-cohort-card-img-wrapper">
                          <img src={c.image} alt={`YLP Cohort ${c.cohort}`} className="ylp-cohort-card-img" />
                        </div>
                      )}
                      <div className="ylp-cohort-card-content">
                        <div className="ylp-cohort-card-label">Youth Leadership Program</div>
                        <div className="ylp-cohort-card-year">{c.cohort}</div>
                        <div className="ylp-cohort-card-count">
                          <Users size={14} />
                          {c.members.length} participants
                          <ArrowRight size={14} style={{ marginLeft: 'auto', color: 'var(--accent)' }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default YLP;
