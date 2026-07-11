import React from 'react';
import { Mail, MapPin, Facebook, Linkedin, Youtube } from 'lucide-react';

function Contact() {
  return (
    <div className="contact-page">
      <section className="page-hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">
            We'd love to hear from you. Please reach out to us with any inquiries, suggestions, or ideas.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="contact-container">
            <div className="contact-card">
              <h3>Contact Info</h3>
              <div className="contact-method-list">
                <div className="contact-method-item">
                  <div className="contact-icon-box">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="contact-label">Email to</div>
                    <div className="contact-value">
                      <a href="mailto:eisenhowerfoundationsl@gmail.com">
                        eisenhowerfoundationsl@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="contact-method-item">
                  <div className="contact-icon-box">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="contact-label">Address</div>
                    <div className="contact-value">
                      Colombo, Sri Lanka
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-card">
              <h3>Connect With Us</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                Follow our official social media channels to stay updated on upcoming events, projects, and fellowship calls.
              </p>
              <div className="contact-social-row">
                <a
                  href="https://www.linkedin.com/company/eisenhower-fellowship-association-of-sri-lanka/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a
                  href="https://www.facebook.com/eflka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
                >
                  <Facebook size={16} /> Facebook
                </a>
                <a
                  href="https://www.youtube.com/@eisenhowerfellowships-sril6738"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
                >
                  <Youtube size={16} /> YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
