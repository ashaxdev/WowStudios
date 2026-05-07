'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutTeaser() {
  return (
    <section className="section" style={{ background: 'var(--white)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
          {/* Image collage */}
          <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
            style={{ position: 'relative', aspectRatio: '4/5', maxHeight: 540 }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '70%', height: '76%', overflow: 'hidden', borderRadius: 2, boxShadow: 'var(--shadow-med)' }}>
              <img src="https://images.unsplash.com/photo-1512070679279-8988d32161be?w=600&q=80" alt="Studio team" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '56%', height: '56%', overflow: 'hidden', borderRadius: 2, boxShadow: 'var(--shadow-strong)', border: '4px solid var(--white)' }}>
              <img src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&q=80" alt="Studio" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'absolute', bottom: '9%', left: '-3%', padding: '1.1rem 1.5rem', background: 'linear-gradient(135deg,var(--gold-light),var(--gold))', boxShadow: 'var(--shadow-med)' }}>
              <p style={{ fontSize: '0.52rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', marginBottom: 1 }}>Est.</p>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 400, color: 'white', lineHeight: 1 }}>2015</p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15 }}>
            <p className="eyebrow">Our Story</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem,4.5vw,3.5rem)', fontWeight: 300, color: 'var(--charcoal)', lineHeight: 1.15, marginBottom: '1.75rem' }}>
              A decade of<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>cherished memories</em>
            </h2>
            <p style={{ color: 'var(--mist)', fontSize: '0.88rem', lineHeight: 1.95, marginBottom: '1.25rem' }}>
              Founded in Tirunelveli with a singular passion: every family deserves portraits that become heirlooms. We bring warmth, artistry, and meticulous attention to every session.
            </p>
            <p style={{ color: 'var(--mist)', fontSize: '0.85rem', lineHeight: 1.95, marginBottom: '2.5rem', opacity: 0.8 }}>
              Our team of dedicated photographers specialises in creating a comfortable, joyful experience — so your genuine emotions shine through every frame.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
              {[['4.9★','Google Rating'],['88+','Happy Reviews'],['2K+','Sessions Done'],['9+','Years Active']].map(([n,l]) => (
                <div key={l} style={{ padding: '1.1rem', background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 2, textAlign: 'center' }}>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>{n}</p>
                  <p style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mist)', marginTop: 4 }}>{l}</p>
                </div>
              ))}
            </div>
            <Link href="/about" className="btn-gold">Meet Our Team</Link>
          </motion.div>
        </div>
      </div>
      <style>{`@media(max-width:768px){ [style*="grid-template-columns: 1fr 1fr"][style*="5rem"] { grid-template-columns: 1fr !important; } [style*="aspectRatio: '4/5'"] { display: none !important; } }`}</style>
    </section>
  );
}
