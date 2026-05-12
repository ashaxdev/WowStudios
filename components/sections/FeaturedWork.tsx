'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const projects = [
  { id: '1', title: 'Romantic Pre-Wedding Collection', category: 'Pre-Wedding', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80', large: true },
  { id: '2', title: 'Radiant Maternity Portraits', category: 'Maternity', image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&q=80' },
  { id: '3', title: 'Precious Newborn Moments', category: 'Newborn', image: 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=600&q=80' },
  { id: '4', title: 'Milestone Birthday Shoot', category: 'Birthday', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80' },
];

export default function FeaturedWork() {
  return (
    <section className="section" style={{ background: 'var(--ivory)' }}>
      <div className="container">
        {/* Header — no button here anymore */}
        <div style={{ marginBottom: '2.75rem' }}>
          <p className="eyebrow">Selected Work</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: 300, color: 'var(--charcoal)', lineHeight: 1.1 }}>
            Crafted with<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>heart & precision</em>
          </h2>
        </div>

        {/* Grid */}
        <div className="fw-grid">
          {projects.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7 }}
              className={`fw-card${p.large ? ' fw-card--large' : ''}`}
              whileHover={{ scale: 1.01 }}
            >
              <img src={p.image} alt={p.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', display: 'block' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = 'scale(1.05)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = 'scale(1)')} />
              <div className={`fw-overlay${p.large ? ' fw-overlay--visible' : ''}`}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = p.large ? '1' : '0')}>
                <span style={{ fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold-light)', marginBottom: '0.35rem' }}>{p.category}</span>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1rem,2.5vw,1.6rem)', color: 'white', fontWeight: 400 }}>{p.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Button below grid */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
          <Link href="/portfolio" className="btn-outline">View Portfolio</Link>
        </div>
      </div>

      <style>{`
        /* ── Desktop grid ── */
        .fw-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        .fw-card {
          position: relative;
          overflow: hidden;
          border-radius: 2px;
          background: var(--linen);
          cursor: pointer;
          aspect-ratio: 4/3;
          grid-column: span 1;
        }
        .fw-card--large {
          grid-column: span 2;
          aspect-ratio: 16/9;
        }
        .fw-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(44,36,22,0.88) 0%, transparent 55%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.5rem;
          opacity: 0;
          transition: opacity 0.4s;
        }
        .fw-overlay--visible {
          opacity: 1;
        }

        /* ── Mobile grid: first card full-width, rest 2-column ── */
        @media (max-width: 640px) {
          .fw-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .fw-card--large {
            grid-column: span 2;
            aspect-ratio: 4/3;
          }
          .fw-card {
            aspect-ratio: 1/1;
          }
          /* Always show overlay text on mobile (no hover) */
          .fw-overlay {
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
