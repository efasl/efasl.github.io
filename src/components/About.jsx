import React, { useState, useEffect } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';

function About() {
  const [expandedCommittee, setExpandedCommittee] = useState('2025-26');
  const [committees, setCommittees] = useState([]);

  useEffect(() => {
    fetch('./data/committees.json')
      .then((res) => res.json())
      .then((data) => setCommittees(data))
      .catch((err) => console.error('Error fetching committees:', err));
  }, []);

  const toggleCommittee = (id) => {
    setExpandedCommittee(expandedCommittee === id ? null : id);
  };

  const constitutionItems = [
    {
      num: '1',
      title: 'Name',
      text: 'The name of the association is “Eisenhower Fellowships Association of Sri Lanka” (EFASL).'
    },
    {
      num: '2',
      title: 'Objects',
      text: 'The objects for which the Association is established are:',
      subitems: [
        { letter: 'a', content: 'To establish an Association of Sri Lankan Eisenhower Fellows to engage in developing and supporting all activities connected to Eisenhower Fellowship Inc. Philadelphia.' },
        { letter: 'b', content: 'To provide support, information and counseling to persons involved in the Eisenhower Fellowships.' },
        { letter: 'c', content: 'To encourage networking with International and Regional Eisenhower Fellows.' },
        { letter: 'd', content: 'To achieve the goals of the Eisenhower Fellowship.' }
      ]
    },
    {
      num: '3',
      title: 'Powers',
      text: 'The Association has powers:',
      subitems: [
        { letter: 'a', content: 'To establish an office and employ, appoint, engage, remunerate and dismiss such persons and staff as may be necessary in order to achieve the aforesaid objectives.' },
        { letter: 'b', content: 'To receive fees, grants and payments for the furtherance of its objectives.' },
        { letter: 'c', content: 'To engage in all activities that are necessary in the opinion of the governing council (or any other equivalent body) to achieve the objectives, but shall not engage in any partisan political activities.' },
        { letter: 'd', content: 'To institute, conduct, defend, intervene in or compromise legal proceedings by and against the Association or its officers.' }
      ]
    },
    {
      num: '4',
      title: 'Governing Council',
      text: 'Governance and operations of the council are governed by:',
      subitems: [
        { letter: 'a', content: 'The Governing Council shall consist of Chairman, Secretary, Treasurer and three Council Members/general office bearers annually elected by membership. All office bearers shall be eligible for re-election for the same post or any other.' },
        { letter: 'b', content: 'The Governing Council shall be entitled to temporarily appoint other member for any post in the event of an elected office bearer being unable to discharge his or her functions for a prescribed period.' },
        { letter: 'c', content: 'Secretary shall convene all meetings of the Council or members.' },
        { letter: 'd', content: 'The quorum of the Council is three and the general meeting one third of the paid members.' },
        { letter: 'e', content: 'The Council may invite the attendance of any Eisenhower Fellow, Trustees of the Fellowship, Staff of the Eisenhower fellowship or any outsiders for any meeting of the Council or General Meeting.' }
      ]
    },
    {
      num: '5',
      title: 'General Membership',
      text: 'Rules and regulations for members:',
      subitems: [
        { letter: 'a', content: 'Annual membership of a member is Rupees Five thousand unless otherwise determined by the general membership.' },
        { letter: 'b', content: 'All General Meetings are open for members as well as the Spouses and if so permitted by Council any family members of a Member.' },
        { letter: 'c', content: 'General Meeting is the highest body of the Association.' },
        { letter: 'd', content: 'The Secretary with the agenda and accounts first being communicated to all members shall convene Annual General meeting.' },
        { letter: 'e', content: 'Any member of the association may be expelled for his or her misconduct seriously affecting the good name of the association but expulsion shall be consequent to an inquiry conducted by an officer appointed by the Council.' },
        { letter: 'f', content: 'Resignation of any member or office bearer shall be effective upon its acceptance. However, if no acceptance or refusal is forthcoming for two weeks, the resignation is deemed to have been accepted.' }
      ]
    },
    {
      num: '6',
      title: 'Amendment of the Constitution',
      text: 'Procedures for constitutional changes:',
      subitems: [
        { letter: 'a', content: 'This Constitution may, from time to time, be amended by two thirds of the General Membership on a proposal submitted by the Council. Any draft Amendment shall be circulated to members at least two weeks prior to the General Meeting.' }
      ]
    },
    {
      num: '7',
      title: 'Notice',
      text: 'Communication and notification guidelines:',
      subitems: [
        { letter: 'a', content: 'All notices required to be given to the members may be communicated electronically or any other form to an address or electronic address indicated by Members to the Secretary.' }
      ]
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Header */}
      <section className="page-section" style={{ backgroundColor: 'var(--primary)', color: 'var(--text-light)', padding: '80px 0 60px 0', borderBottom: '4px solid var(--accent)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="page-title" style={{ color: 'var(--text-light)', marginBottom: '16px' }}>About Us</h1>
          <p className="page-subtitle" style={{ color: 'rgba(255, 255, 255, 0.8)', maxWidth: '700px' }}>
            The Eisenhower Fellowships Association of Sri Lanka (EFASL) represents national links of leadership, exchange, and community development.
          </p>
        </div>
      </section>

      {/* Main content - Overview */}
      <section className="page-section">
        <div className="container">
          <div className="about-history-section">
            <div className="about-history-content">
              <h2>Who We Are</h2>
              <div className="title-separator" style={{ margin: '12px 0 24px 0' }}></div>
              <p>
                The Eisenhower Fellowships Association of Sri Lanka (EFASL) was formally set up in August 2004 in order to continue to retain vital national links amongst the existing fellows who want to share their wealth of experience with other fellow Sri Lankans.
              </p>
              <p>
                Several programs and meetings are held annually in Sri Lanka which aim to promote various ideas and discuss key topics such as Corporate Governance, Role of Civil Society, International Relations, Transparency and many others in relation to Sri Lanka and the rest of the world.
              </p>
              <p>
                Furthermore, it aims to promote new initiatives brought about by the global HQ of the Eisenhower Fellowships based in Philadelphia, U.S.A. such as the South Asia Single Regional Programs, which selected Fellows from Sri Lanka, India, and Pakistan.
              </p>
            </div>
            <div className="about-history-image">
              <div className="about-card-info">
                <h2>Eisenhower Fellowships (EF) Global Overview</h2>
                <div className="title-separator" style={{ margin: '12px 0 24px 0' }}></div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Founded in 1953 as a tribute to Dwight D. Eisenhower from his friends as he assumed the presidency. Its design reflects his conviction that greater understanding among individuals fosters greater understanding among nations.
                </p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
                  Every year, Eisenhower Fellowships brings emerging leaders from around the world to the United States for seven weeks of professional enrichment, creating a connected global network of leaders.
                </p>
                <a
                  href="https://www.efworld.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Visit EF Global <ExternalLink size={15} />
                </a>
              </div>
            </div>
          </div>

          {/* Committee Section */}
          <div style={{ marginTop: '80px' }}>
            <div className="page-title-block">
              <h2 className="page-title">Governing Committees</h2>
              <p className="page-subtitle">Timeline of steering committees representing the association over the years.</p>
              <div className="title-separator"></div>
            </div>

            <div className="committee-timeline">
              {committees.map((committee) => (
                <div 
                  className={`committee-card ${expandedCommittee === committee.id ? 'expanded' : ''}`}
                  key={committee.id}
                >
                  <div className="committee-header" onClick={() => toggleCommittee(committee.id)}>
                    <div className="committee-title-group">
                      <h3>{committee.title}</h3>
                      <p>{committee.subtitle}</p>
                    </div>
                    <div className="committee-icon">
                      <ChevronDown size={20} />
                    </div>
                  </div>

                  <div className="committee-body">
                    <ul className="committee-grid">
                      {committee.members.map((member, idx) => (
                        <li className="member-item" key={idx}>
                          <span className="member-bullet">&#9675;</span>
                          <div>
                            <span className="member-name">{member.name}</span>
                            <span className="member-role"> &ndash; {member.role}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Constitution Section */}
          <div className="constitution-section">
            <div className="page-title-block">
              <h2 className="page-title">Association Constitution</h2>
              <p className="page-subtitle">The constitutional rules governing the affairs of the Eisenhower Fellowships Association of Sri Lanka.</p>
              <div className="title-separator"></div>
            </div>

            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '700px', margin: '-20px auto 40px auto' }}>
              Adopted on December 07, 2004 by the Sri Lankan Eisenhower Fellows at Queens Court, TransAsia Hotel, Colombo.
            </p>

            <div className="constitution-list">
              {constitutionItems.map((item) => (
                <div className="constitution-item" key={item.num}>
                  <div className="constitution-num">{item.num}.</div>
                  <div className="constitution-item-content">
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                    
                    {item.subitems && (
                      <ul className="constitution-sublist">
                        {item.subitems.map((sub, idx) => (
                          <li className="constitution-subitem" key={idx}>
                            <span className="constitution-subletter">{sub.letter})</span>
                            <span>{sub.content}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default About;
