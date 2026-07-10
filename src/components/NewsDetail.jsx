import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, X, ExternalLink } from 'lucide-react';

function NewsDetail({ slug, navigateTo }) {
  const [item, setItem] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    fetch('./data/news.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((d) => d.slug === slug);
        if (found) {
          setItem(found);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true));
  }, [slug]);

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback(
    (e) => {
      if (lightboxIndex === null || !item?.images) return;
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % item.images.length);
      if (e.key === 'ArrowLeft')  setLightboxIndex((i) => (i - 1 + item.images.length) % item.images.length);
      if (e.key === 'Escape')     setLightboxIndex(null);
    },
    [lightboxIndex, item]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const isGallery = item && Array.isArray(item.images) && item.images.length > 0;

  // ── Loading ──────────────────────────────────────────────────────────────
  if (!item && !notFound) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading…</p>
      </div>
    );
  }

  // ── 404 ──────────────────────────────────────────────────────────────────
  if (notFound) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <h2 style={{ color: 'var(--primary)' }}>Item not found</h2>
        <button className="btn btn-outline" onClick={() => navigateTo('news')}>
          <ArrowLeft size={16} style={{ marginRight: '6px' }} /> Back to News &amp; Gallery
        </button>
      </div>
    );
  }

  return (
    <div className="news-page">
      {/* Hero header */}
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
            {item.title}
          </h1>
          {item.date && (
            <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '1rem' }}>{item.date}</p>
          )}
        </div>
      </section>

      {/* Detail body */}
      <section className="page-section">
        <div className="container" style={{ maxWidth: '860px' }}>
          {/* Back button */}
          <button
            onClick={() => navigateTo('news')}
            className="btn btn-outline"
            style={{ marginBottom: '36px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <ArrowLeft size={16} /> Back to News &amp; Gallery
          </button>

          {/* Cover image (news article) */}
          {item.image && (
            <div style={{ marginBottom: '32px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: '100%', maxHeight: '480px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          )}

          {/* Article text */}
          {item.text && (
            <div
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.85,
                color: 'var(--text-body)',
                marginBottom: '32px',
                whiteSpace: 'pre-wrap',
              }}
            >
              {item.text}
            </div>
          )}

          {/* External link (if any) */}
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '40px' }}
            >
              Read Full Article <ExternalLink size={15} />
            </a>
          )}

          {/* Photo grid (gallery albums or mixed items) */}
          {isGallery && (
            <>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--primary)', marginBottom: '20px', fontSize: '1.4rem' }}>
                Photos
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: '14px',
                  marginBottom: '40px',
                }}
              >
                {item.images.map((src, idx) => (
                  <div
                    key={idx}
                    onClick={() => setLightboxIndex(idx)}
                    style={{
                      cursor: 'pointer',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      aspectRatio: '4/3',
                      background: '#0a1628',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.14)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.03)';
                      e.currentTarget.style.boxShadow = '0 8px 28px rgba(197,160,89,0.25)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.14)';
                    }}
                  >
                    <img
                      src={src}
                      alt={`Photo ${idx + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && isGallery && (
        <div
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.95)',
            zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
            style={{
              position: 'absolute', top: '20px', right: '24px',
              background: 'transparent', border: 'none', color: '#fff',
              cursor: 'pointer', lineHeight: 1,
            }}
          >
            <X size={32} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i - 1 + item.images.length) % item.images.length);
            }}
            style={{
              position: 'absolute', left: '16px',
              background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff',
              borderRadius: '50%', width: '48px', height: '48px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <ChevronLeft size={26} />
          </button>
          <img
            src={item.images[lightboxIndex]}
            alt={`Photo ${lightboxIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw', maxHeight: '88vh',
              objectFit: 'contain', borderRadius: '8px',
              boxShadow: '0 16px 60px rgba(0,0,0,0.6)',
            }}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i + 1) % item.images.length);
            }}
            style={{
              position: 'absolute', right: '16px',
              background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff',
              borderRadius: '50%', width: '48px', height: '48px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <ChevronRight size={26} />
          </button>
          <span style={{
            position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem',
          }}>
            {lightboxIndex + 1} / {item.images.length}
          </span>
        </div>
      )}
    </div>
  );
}

export default NewsDetail;
