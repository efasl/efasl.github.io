import React, { useState, useEffect } from 'react';
import { Award, Globe, Users, Target, ShieldCheck, ArrowRight } from 'lucide-react';

function Fellowship({ navigateTo }) {
  const [ylpCohorts, setYlpCohorts] = useState([]);

  useEffect(() => {
    fetch('./data/ylp.json')
      .then(r => r.json())
      .then(data => setYlpCohorts(data))
      .catch(() => {});
  }, []);
  const criteriaList = [
    {
      title: 'Mid-Career Leadership',
      desc: 'Applicants are typically between 32 and 45 years of age, with a proven record of leadership and significant professional accomplishment.',
      icon: <Target size={22} />
    },
    {
      title: 'A Clear Impact Project',
      desc: 'Candidates should present a well-defined project or strategic objective they intend to develop through the fellowship and continue implementing after returning home.',
      icon: <Award size={22} />
    },
    {
      title: 'Demonstrated Achievement',
      desc: 'Applicants should have established leadership within their profession, organization, or community, with evidence of innovation, influence, and measurable impact.',
      icon: <Users size={22} />
    },
    {
      title: 'Commitment to Collaboration',
      desc: 'Eisenhower Fellows become lifelong members of a global network and are expected to contribute actively through knowledge sharing, mentorship, and international collaboration.',
      icon: <Globe size={22} />
    }
  ];

  return (
    <div className="fellowship-page">
      {/* Hero Header */}
      <section className="page-section" style={{ backgroundColor: 'var(--primary)', color: 'var(--text-light)', padding: '80px 0 60px 0', borderBottom: '4px solid var(--accent)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="page-title" style={{ color: 'var(--text-light)', marginBottom: '16px' }}>Eisenhower Fellowship Programs</h1>
          <p className="page-subtitle" style={{ color: 'rgba(255, 255, 255, 0.8)', maxWidth: '700px' }}>
            Identifying, empowering, and connecting outstanding mid-career leaders from around the world to build a more peaceful, prosperous and just future.
          </p>
        </div>
      </section>

      {/* Current Programs */}
      <section className="page-section">
        <div className="container">
          <div className="page-title-block">
            <h2 className="page-title">Current International Programs</h2>
            <p className="page-subtitle">
              Eisenhower Fellowships currently offers two international fellowship programs for leaders outside the United States. Both programs bring together exceptional mid-career leaders to develop global networks, exchange ideas, and advance projects that create lasting impact in their communities.
            </p>
            <div className="title-separator"></div>
          </div>

          <div className="fellowship-grid">
            <div className="fellowship-card" id="ef-global-program">
              <h3>Global Program</h3>
              <div className="title-separator" style={{ margin: '12px 0 20px 0' }}></div>
              <p>
                The Global Program is Eisenhower Fellowships' flagship international fellowship, held annually. Each spring, a diverse cohort of outstanding leaders from around the world travels to the United States for a customized professional program.
              </p>
              <p>
                Rather than following a fixed curriculum, each Fellow undertakes an individualized itinerary tailored to their leadership goals and project. Through meetings with experts, institutions, businesses, and policymakers, Fellows build the knowledge, partnerships, and perspectives needed to accelerate their impact.
              </p>
              <p>
                Sri Lankan Fellows have participated in the Global Program since 1958, representing sectors including technology, entrepreneurship, public service, education, healthcare, civil society, and the arts.
              </p>
            </div>

            <div className="fellowship-card" id="ef-innovative-entrepreneurs">
              <h3>Innovative Entrepreneurs Program</h3>
              <div className="title-separator" style={{ margin: '12px 0 20px 0' }}></div>
              <p>
                The Innovative Entrepreneurs Program is a thematic international fellowship for founders and business leaders whose ventures create measurable social impact.
              </p>
              <p>
                Participants join a global cohort of entrepreneurs to explore innovation, leadership, investment, and business growth while building international partnerships. Like the Global Program, each Fellow follows a personalized professional itinerary designed around their venture and long-term vision.
              </p>
            </div>
          </div>

          {/* Criteria Section */}
          <div className="criteria-card">
            <h3>Who Makes an Eisenhower Fellow?</h3>
            <p>
              Eisenhower Fellowships seeks outstanding leaders who have demonstrated exceptional achievement and are ready to expand their impact nationally and globally.
            </p>

            <div className="criteria-grid">
              {criteriaList.map((item, idx) => (
                <div className="criteria-item" key={idx}>
                  <div className="criteria-icon-box">
                    {item.icon}
                  </div>
                  <div className="criteria-item-content">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '40px', display: 'flex', gap: '12px', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: 'var(--radius-md)' }}>
              <ShieldCheck size={32} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <div style={{ fontSize: '0.9rem', opacity: '0.9' }}>
                <strong>Applying for a Fellowship:</strong> Applications are coordinated through the Sri Lankan nominating committee in partnership with Eisenhower Fellowships Global. Selection is highly competitive and based on leadership potential, professional achievement, and the proposed impact project.
              </div>
            </div>
          </div>

          {/* Apply CTA */}
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '16px' }}>Ready to Apply?</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px auto' }}>
              Visit the global Eisenhower Fellowships website to learn about current application cycles, eligibility requirements, and deadlines.
            </p>
            <a
              href="https://www.efworld.org/apply-now/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Apply on EF Global Website <Globe size={16} />
            </a>
          </div>

          {/* Legacy Programs */}
          <div style={{ marginTop: '80px' }}>
            <div className="page-title-block">
              <h2 className="page-title">Legacy International Programs</h2>
              <p className="page-subtitle">
                These programs formed part of the historical structure of Eisenhower Fellowships and are no longer offered under their original names.
              </p>
              <div className="title-separator"></div>
            </div>

            <div className="fellowship-grid">
              <div className="fellowship-card" style={{ opacity: 0.85 }}>
                <h3>Multi Nation Program (MNP)</h3>
                <div className="title-separator" style={{ margin: '12px 0 20px 0' }}></div>
                <p>
                  For many decades, the Multi Nation Program was Eisenhower Fellowships' flagship international program, bringing leaders from multiple countries to the United States for individualized professional exchanges. Numerous distinguished Sri Lankan Fellows participated in the MNP, beginning with Chitra Fernando in 1958 and continuing across generations of leaders in government, business, academia, and civil society.
                </p>
              </div>

              <div className="fellowship-card" style={{ opacity: 0.85 }}>
                <h3>Single Region Program (SRP)</h3>
                <div className="title-separator" style={{ margin: '12px 0 20px 0' }}></div>
                <p>
                  The Single Region Program focused on strengthening collaboration among leaders from a specific geographic region. Sri Lanka participated in the historic South Asia Single Region Program in 2004, bringing together Fellows from Sri Lanka, India, and Pakistan to foster regional dialogue and long-term cooperation.
                </p>
              </div>
            </div>
          </div>

          {/* EF Sri Lanka Programs */}
          <div style={{ marginTop: '80px' }}>
            <div className="page-title-block">
              <h2 className="page-title">EF Sri Lanka Programs</h2>
              <p className="page-subtitle">
                Homegrown initiatives by the Eisenhower Fellowships Association of Sri Lanka, designed to extend the fellowship's values of leadership, collaboration, and impact to the next generation.
              </p>
              <div className="title-separator"></div>
            </div>

            <div className="fellowship-grid" style={{ gridTemplateColumns: '1fr' }}>
              <div className="fellowship-card" id="efasl-youth-leadership">
                <h3>Youth Leadership Program (YLP)</h3>
                <div className="title-separator" style={{ margin: '12px 0 20px 0' }}></div>
                <p>
                  The Youth Leadership Program is EFASL's flagship local initiative, conceptualized by Eran Wickramaratne (EF 2004) and inaugurated under the leadership of Heminda Jayaweera (EF 2021). It is designed to identify and develop the next generation of purpose-driven leaders across Sri Lanka, bringing together exceptional young leaders from diverse backgrounds, regions, and communities, united by a shared commitment to creating meaningful impact.
                </p>
                <p>
                  Through mentorship from Senior Eisenhower Fellows, immersive workshops, and peer learning, participants develop the leadership skills, networks, and vision needed to drive positive change in their communities and beyond.
                </p>

                {ylpCohorts.length > 0 && (
                  <div style={{ marginTop: '32px' }}>
                    <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, color: 'var(--accent)', marginBottom: '16px' }}>
                      Cohorts
                    </p>
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
                          <div className="ylp-cohort-card-label">Youth Leadership Program</div>
                          <div className="ylp-cohort-card-year">{c.cohort}</div>
                          <div className="ylp-cohort-card-count">
                            <Users size={14} />
                            {c.members.length} participants
                            <ArrowRight size={14} style={{ marginLeft: 'auto', color: 'var(--accent)' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Fellowship;
