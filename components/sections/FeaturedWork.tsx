'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const projects = [
  { id: '1', image: 'service/2.jpg'},
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
        {/* Header */}
        <div style={{ marginBottom: '2.75rem' }}>
          <p className="eyebrow">Selected Work</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: 300, color: 'var(--charcoal)', lineHeight: 1.1 }}>
            Crafted with<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>heart & precision</em>
          </h2>
        </div>

        {/* Masonry Grid */}
        <div className="fw-masonry">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              className="fw-item"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.7 }}
            >
              <div className="fw-img-wrap">
                <img
                  src={p.image}
                  alt=""
                  className="fw-img"
                />
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
        /* ── Masonry via CSS columns ── */
        .fw-masonry {
          columns: 3;
          column-gap: 1rem;
        }

        .fw-item {
          break-inside: avoid;          /* never split an image across columns */
          margin-bottom: 1rem;
          overflow: hidden;
          border-radius: 2px;
          background: var(--linen);
          cursor: pointer;
        }

        .fw-img-wrap {
          overflow: hidden;
          border-radius: 2px;
        }

        .fw-img {
          width: 100%;
          height: auto;          /* natural aspect ratio — no cropping */
          display: block;
          transition: transform 0.6s ease;
        }

        .fw-item:hover .fw-img {
          transform: scale(1.05);
        }

        /* ── Mobile: 2 columns ── */
        @media (max-width: 640px) {
          .fw-masonry {
            columns: 2;
          }
        }
      `}</style>
    </section>
  );
}