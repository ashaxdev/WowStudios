'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const projects = [
  { id: '1', image: 'service/2.jpg', large: true },
  { id: '2', image: 'service/1.jpg' },
  { id: '3', image: 'service/9.jpg' },
  { id: '4', image: 'service/bride sow.jpg' },
  { id: '5', image: 'service/chri.jpg' },
  { id: '6', image: 'service/closwe.jpg' },
  { id: '7', image: 'service/Copy of charu.jpg' },
  { id: '8', image: 'service/Copy of DSC01197.jpg' },
  { id: '9', image: 'service/divya.jpg' },
  { id: '10', image: 'service/DSC01121.jpg' },
  { id: '11', image: 'service/indoor.jpg' },
  { id: '12', image: 'service/jeg.jpg' },
  { id: '13', image: 'service/kovil.jpg' },
  { id: '14', image: 'service/m6.jpg' },
  { id: '15', image: 'service/mermaid outfit.jpg' },
  { id: '16', image: 'service/moon.jpg' },
  { id: '17', image: 'service/NEW.jpg' },
  { id: '18', image: 'service/pa.jpg' },
  { id: '19', image: 'service/ps img 1.jpg' },
  { id: '20', image: 'service/roui.jpg' },
  { id: '21', image: 'service/sai.jpg' },
  { id: '22', image: 'service/sun flower.jpg' },
  { id: '23', image: 'service/vs.jpg' },
  
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
              <img src={p.image}
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
